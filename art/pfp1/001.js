// Sheet Spirits: from D:/code/synaesthesia/public/drop03/pieces/001.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Sheet Spirits: one-bit ghosts. Every pixel is either paper or ink, on a 24 x 24 grid.
Proto.add({
  num: 1,
  name: 'Sheet Spirits',
  seed: 1169,
  fam: 'Pixel Portraits',
  recipe: 'A one-bit ghost in a two-colour world, drawn on a 24-cell grid. The duotone, sheet shape and print, eyes, mouth, cheeks, hat, the thing it carries, the little companion that haunts with it, the night behind it and how it haunts the frame all vary; a few are inverted, a rare few are so faint only their face still glows, about 1 in 500 is a legendary (a stained-glass window, a paper lantern spirit, two spirits under one sheet) and 1 in 200 carries the only red thing in its world, a red balloon.',
  interactive: 'Tap the ghost to make it boo, tap the night to light a star. Hold to make it fade.',
  music: true,
  make(c) {
    const S = c.size, N = 24;
    // mulberry32, seeded by folding the whole hash
    let seed = 0x9e3779b9;
    for (let i = 2; i < c.hash.length; i += 8) seed = Math.imul(seed ^ parseInt(c.hash.slice(i, i + 8), 16), 0x85ebca6b) >>> 0;
    const rand = () => {
      seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    const choose = opts => {
      let total = 0;
      for (const o of opts) total += o[1];
      let r = rand() * total;
      for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; }
      return opts[opts.length - 1][0];
    };

    // the first rolls, kept exactly as they were so the first spirits keep their looks
    const DUOS = [
      [['Bone', '#ece6d6', '#17161d'], 22], [['Moss', '#cfeeb0', '#18291f'], 16], [['Rose', '#ffd9dc', '#33142c'], 14],
      [['Frost', '#d9f2ff', '#0f1d3d'], 16], [['Ember', '#ffcf73', '#2b1206'], 12], [['Lilac', '#e8d8ff', '#22163f'], 12],
      [['Gilt', '#ffd84a', '#000000'], 4], [['Blood Moon', '#ff5a4a', '#120406'], 4],
    ];
    let duo = choose(DUOS);
    let shape = choose([['Classic', 30], ['Plump', 20], ['Tall', 20], ['Tattered', 18], ['Wisp', 12]]);
    let eyes = choose([['Holes', 26], ['Round', 22], ['Sleepy', 14], ['Crossed', 10], ['Shades', 10], ['Hearts', 6], ['Cyclops', 5]]);
    let mouth = choose([['None', 24], ['Oh', 26], ['Grin', 20], ['Wobble', 16], ['Tongue', 14]]);
    let hat = choose([['None', 34], ['Top Hat', 14], ['Witch Hat', 14], ['Bow', 12], ['Propeller', 10], ['Crown', 9], ['Halo', 7]]);
    let held = choose([['Nothing', 40], ['Lantern', 18], ['Candle', 18], ['Balloon', 16], ['Little One', 8]]);
    let night = choose([['Stars', 28], ['Dither', 20], ['Rain', 16], ['Moon', 16], ['Bricks', 12], ['Void', 8]]);
    const patch = rand() < 0.12;
    const inverted = rand() < 0.05;
    // fixed draws for jitter and stars, always taken so the count never changes
    const hem = [];
    for (let i = 0; i < N; i++) hem.push(rand());
    const stars = [];
    for (let i = 0; i < 22; i++) stars.push([Math.floor(rand() * 28) - 2, Math.floor(rand() * 28) - 2, rand()]);
    const blinkEvery = 3 + rand() * 3, blinkPhase = rand() * 5, bobPhase = rand() * 2;
    let moonLeft = rand() < 0.5;
    // how the ghost sits in the frame: rolled from its own LCG on the hash's tail
    let ps = parseInt(c.hash.slice(-11, -3), 16) >>> 0;
    const lcg = () => { ps = (Math.imul(ps, 1664525) + 1013904223) >>> 0; return ps / 4294967296; };
    lcg();
    const pr = lcg() * 100;
    let pose = pr < 58 ? 'Floating' : pr < 72 ? 'Sunk Low' : pr < 84.5 ? 'Peeking Left' : pr < 97 ? 'Peeking Right' : 'Upside Down';

    // the second wave of variety: every draw is a fresh FNV hash of the hash text and a counter,
    // so nothing above moves; about half the spirits trade a trait for one of the many new ones
    let nth = 0;
    const fresh = () => {
      let f = 0x811c9dc5 ^ Math.imul(++nth, 0x27d4eb2f);
      for (let i = 2; i < c.hash.length; i++) f = Math.imul(f ^ c.hash.charCodeAt(i), 0x01000193);
      f ^= f >>> 15; f = Math.imul(f, 0x2c1b3c6d); f ^= f >>> 12; f = Math.imul(f, 0x297a2d39); f ^= f >>> 15;
      return (f >>> 0) / 4294967296;
    };
    const among = opts => {
      let sum = 0;
      for (const o of opts) sum += o[1];
      let r = fresh() * sum;
      for (const o of opts) if ((r -= o[1]) < 0) return o[0];
      return opts[0][0];
    };
    const swap = (was, p, opts) => fresh() < p ? among(opts) : was;
    duo = swap(duo, 0.55, DUOS.map(([d, w]) => [d, w * 0.6]).concat([
      [['Mint', '#c8f7e1', '#0e2b26'], 14], [['Sepia', '#f1dfbf', '#3b2615'], 14], [['Slate', '#d3dae3', '#1e2633'], 14],
      [['Tangerine', '#ffb27a', '#24101a'], 12], [['Pea', '#c9d49a', '#26331b'], 12], [['Bubblegum', '#ffc2e6', '#3a0f3f'], 12],
      [['Cyan', '#9ff4ff', '#0a2238'], 12], [['Pumpkin', '#ff9b3d', '#160a03'], 10], [['Blueprint', '#eaf4ff', '#1f4fbf'], 8],
      [['Ectoplasm', '#a8ff60', '#071206'], 3], [['Ultraviolet', '#d2b0ff', '#0b0222'], 3],
    ]));
    shape = swap(shape, 0.6, [['Classic', 14], ['Plump', 10], ['Tall', 10], ['Tattered', 9], ['Wisp', 6], ['Droplet', 16], ['Pillowcase', 12], ['Flared', 14], ['Melting', 12]]);
    eyes = swap(eyes, 0.65, [['Holes', 12], ['Round', 10], ['Sleepy', 7], ['Crossed', 5], ['Shades', 5], ['Hearts', 3], ['Cyclops', 3],
      ['Happy', 14], ['Wink', 10], ['Ring', 10], ['Starry', 9], ['Teary', 8], ['Angry', 9], ['Dizzy', 6], ['Spectacles', 8], ['Lashes', 10], ['Uneven', 8], ['Monocle', 3]]);
    mouth = swap(mouth, 0.6, [['None', 10], ['Oh', 12], ['Grin', 10], ['Wobble', 8], ['Tongue', 7],
      ['Fangs', 12], ['Smile', 18], ['Kiss', 8], ['Stitched', 8], ['Gasp', 10], ['Toothy', 10], ['Tiny', 10]]);
    hat = swap(hat, 0.65, [['None', 16], ['Top Hat', 7], ['Witch Hat', 7], ['Bow', 6], ['Propeller', 5], ['Crown', 4], ['Halo', 4],
      ['Party Hat', 10], ['Beanie', 12], ['Pumpkin', 8], ['Flower', 10], ['Chef Hat', 6], ['Bunny Ears', 8], ['Sprout', 10], ['Leaf', 8], ['Candle', 6], ['Bucket', 6], ['Tiny Ghost', 2]]);
    held = swap(held, 0.6, [['Nothing', 20], ['Lantern', 9], ['Candle', 9], ['Balloon', 8], ['Little One', 4],
      ['Flower', 12], ['Lollipop', 10], ['Wand', 10], ['Teacup', 8], ['Key', 8], ['Bell', 7], ['Umbrella', 6], ['Ball and Chain', 3]]);
    night = swap(night, 0.65, [['Stars', 14], ['Dither', 10], ['Rain', 8], ['Moon', 8], ['Bricks', 6], ['Void', 4],
      ['Snow', 14], ['Graveyard', 12], ['Window', 12], ['Fireflies', 12], ['Clouds', 12], ['Wallpaper', 10], ['Cobwebs', 10], ['Checker Floor', 10], ['Planets', 4]]);
    const cheeks = among([['None', 58], ['Blush', 20], ['Freckles', 12], ['Whiskers', 10]]);
    const print = patch ? 'Patched' : among([['Plain', 56], ['Polka Dots', 11], ['Stripes', 10], ['Stars', 7], ['Gingham', 7], ['Hearts', 6], ['Lace Hem', 3]]);
    let pal = among([['None', 50], ['Bat', 11], ['Spider', 9], ['Cat', 8], ['Crow', 7], ["Jack-o'-Lantern", 7], ['Mouse', 5], ["Will-o'-Wisp", 3]]);
    const faint = fresh() < 0.025;
    const GROUNDED = { Cat: 1, Crow: 1, "Jack-o'-Lantern": 1, Mouse: 1 };
    if (held === 'Little One' && GROUNDED[pal]) pal = 'Bat';
    if (pal !== 'None' && !GROUNDED[pal] && pose !== 'Peeking Left') moonLeft = false;
    const flakes = [];
    for (let i = 0; i < 18; i++) flakes.push([Math.floor(fresh() * 30) - 3, Math.floor(fresh() * 30), 0.45 + fresh() * 0.5]);
    const flies = [];
    for (let i = 0; i < 9; i++) flies.push([Math.floor(fresh() * 26) - 1, Math.floor(fresh() * 20) + 1, fresh() * 6.28]);

    // the legendaries, rolled from a stream of their own (a one-at-a-time hash of the hash text, salted
    // per draw) so every roll above stays put and every ordinary spirit keeps its look
    const oat = salt => {
      let h = salt >>> 0;
      for (let i = 2; i < c.hash.length; i++) { h = (h + c.hash.charCodeAt(i)) >>> 0; h = (h + (h << 10)) >>> 0; h ^= h >>> 6; }
      h = (h + (h << 3)) >>> 0; h ^= h >>> 11; h = (h + (h << 15)) >>> 0;
      return h / 4294967296;
    };
    const lr = oat(0x6c65);
    const legend = lr < 0.00075 ? 'Stained Glass' : lr < 0.0015 ? 'Paper Lantern' : lr < 0.0021 ? 'Two Under One' : 'None';
    const form = legend === 'Paper Lantern' ? 'Lantern' : legend === 'Two Under One' ? 'Twin' : shape;
    // the coveted thing: the only red in a two-colour world
    const redBalloon = legend === 'None' && oat(0x7262) < 0.005;
    if (redBalloon) held = 'Red Balloon';
    if (legend === 'Paper Lantern') { hat = 'None'; held = 'Nothing'; if (pose === 'Upside Down') pose = 'Floating'; }
    if (legend === 'Two Under One') {
      hat = 'Top Hat and Crown'; held = 'Nothing'; pal = 'None'; eyes = 'Two Pairs'; mouth = 'Grin and Oh';
      if (pose === 'Peeking Left' || pose === 'Peeking Right') pose = 'Floating';
    }
    const neg = inverted && (legend === 'None' || legend === 'Two Under One');
    const faint2 = faint && (legend === 'None' || legend === 'Two Under One');
    const pane = [];
    for (let i = 0; i < 9; i++) pane.push([oat(0x700 + i * 2), oat(0x701 + i * 2)]);

    c.trait('Duotone', legend === 'Stained Glass' ? 'Cathedral' : legend === 'Paper Lantern' ? 'Lantern Light' : duo[0]);
    c.trait('Sheet', legend === 'Two Under One' ? 'Double' : legend === 'Paper Lantern' ? 'Lantern' : shape);
    c.trait('Print', print);
    c.trait('Eyes', eyes);
    c.trait('Mouth', mouth);
    c.trait('Cheeks', cheeks);
    c.trait('Hat', hat);
    c.trait('Carrying', held);
    c.trait('Companion', pal);
    c.trait('Night', night);
    c.trait('Pose', pose);
    if (neg) c.trait('Negative', 'Yes');
    if (faint2) c.trait('Opacity', 'Faint');
    if (legend !== 'None') c.trait('Legendary', legend);
    // the legendaries drawn as 1/1 pictures of their own (legendSpirit, below); every other spirit is drawn as before.
    // A type left out of this list falls back to the older drawing further down.
    const ONE_OF_ONE = ['Stained Glass', 'Paper Lantern', 'Two Under One'];
    if (legend === 'Paper Lantern') return lanternShadow();
    if (ONE_OF_ONE.includes(legend)) return legendSpirit();

    // ---------- the Paper Lantern, redrawn as kage-e, a shadow play: the chochin-obake is a hard black silhouette
    // thrown on a glowing amber shoji screen by the candle behind it, its great eye and its tongue cut out of the black
    // so the light shows through; the eye's pupil is the only red there is. On a 48-cell grid, twice the spirits'.
    // Every trait shows in the shadows: the night as a shadow on the screen, the pose where it hangs, the print as the
    // holes cut in its paper, the eyes, mouth and cheeks as its cut-outs, the companion a shadow puppet on its rod. ----------
    function lanternShadow() {
      const M = 48, cel = Math.max(1, Math.floor(S / M)), of = Math.floor((S - cel * M) / 2);
      const g = c.ctx;
      const can = document.createElement('canvas');
      can.width = can.height = M;
      const cx2 = can.getContext('2d'), img = cx2.createImageData(M, M), D = img.data;
      const RGB = {};
      const rgb = h => RGB[h] || (RGB[h] = [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
      const put = (x, y, h) => { x = Math.round(x); y = Math.round(y); if (x < 0 || y < 0 || x >= M || y >= M) return; const k = (y * M + x) * 4, v = rgb(h); D[k] = v[0]; D[k + 1] = v[1]; D[k + 2] = v[2]; D[k + 3] = 255; };
      const v = k => oat(0x5c00 + k);
      const root = 55 + parseInt(c.hash.slice(-2), 16) % 8, PEN = [0, 3, 5, 7, 10];
      const note = k => root + 12 * Math.floor(k / 5) + PEN[((k % 5) + 5) % 5];
      const ptr = () => { const i = c.input; return { x: (i.x * S - of) / cel, y: (i.y * S - of) / cel, in: i.inside, down: i.inside && i.down }; };
      const tapsNow = () => c.input.taps().map(p => [(p.x * S - of) / cel, (p.y * S - of) / cel]);
      // the screen's light, from the hot middle out to the dark edge, in hard steps; the black of the shadows
      const GLOW = ['#4a4c54', '#7a7c84', '#a8a8ac', '#d0cec8', '#e8e6de', '#f8f6f0'], HOT = '#ffffff', SH = '#0c0c10', WOOD = '#2a2a30', RED = '#e8241c';
      const PX = pose === 'Peeking Left' ? -11 : pose === 'Peeking Right' ? 11 : 0, PY = pose === 'Sunk Low' ? 6 : 0;
      const PIV = [24 + PX, -6], LEN = 29 + PY;
      let th0 = 0, om = 0, grabbed = false, dizzyUntil = -1, lastT = 0, lick = 0, aimX = 0, slurpAt = -9;
      const offs = () => [Math.round(LEN * Math.sin(th0)), Math.round(LEN * Math.cos(th0) - LEN)];
      const half = Y => { const ky = (Y - 23) / 14.5; return Math.abs(ky) > 1 ? -1 : 3.4 + 10.2 * Math.sqrt(1 - ky * ky); };
      const lantern = (x, y, dx, dy) => {
        const X = x + 0.5 - 24 - PX - dx, Y = y - dy - PY;
        if (Y >= 9 && Y <= 37) return Math.abs(X) <= half(Y + 0.5) ? 1 : 0;
        if (Y >= 5 && Y <= 8) return Math.abs(X) <= (Y < 7 ? 5 : 7) ? 2 : 0;
        if (Y >= 38 && Y <= 41) return Math.abs(X) <= (Y > 39 ? 5 : 7) ? 2 : 0;
        return 0;
      };
      const flick = [0, 0.5, 0.2, 1, 0.4, 0.8, 0.1, 0.6];
      let last = '';
      const frame = t => {
        const key = String(Math.floor(t * 10));
        if (key === last) return;
        last = key;
        draw(t);
        cx2.putImageData(img, 0, 0);
        g.imageSmoothingEnabled = false;
        g.fillStyle = GLOW[0]; g.fillRect(0, 0, S, S);
        g.drawImage(can, 0, 0, M, M, of, of, M * cel, M * cel);
      };
      const feel = t => {
        const dt = Math.max(0, Math.min(0.05, t - lastT)); lastT = t;
        const p = ptr(), [dx, dy] = offs();
        for (const [x, y] of tapsNow()) if (lantern(Math.floor(x), Math.floor(y), dx, dy)) { grabbed = true; c.sound.hit('blip', 0.12, { freq: 300 }); }
        if (grabbed && !p.down) {
          grabbed = false;
          if (Math.abs(om) > 1.8) { dizzyUntil = t + 2.4; [12, 10, 8, 6, 4].forEach((k, i) => c.sound.note(note(k), { dur: 0.12, vel: 0.12, wave: 'triangle', cutoff: 1500, at: i * 0.1 })); }
        }
        if (grabbed) {
          const want = Math.max(-0.62, Math.min(0.62, Math.atan2(p.x - PIV[0], Math.max(1, p.y - PIV[1]))));
          const nw = th0 + (want - th0) * Math.min(1, dt * 14);
          om = dt > 0 ? Math.max(-4, Math.min(4, (nw - th0) / dt)) : 0; th0 = nw;
        } else if (dt > 0) {
          om += (-3.2 * Math.sin(th0) - 0.9 * om + 0.25 * Math.sin(t * 1.25)) * dt; th0 += om * dt;
          if (Math.abs(th0) > 0.62) { th0 = Math.sign(th0) * 0.62; om *= -0.45; }
        }
        const mx = 24 + PX + dx, my = 28 + dy + PY;
        const near = p.in && !grabbed && Math.abs(p.x - mx) < 9 && p.y > my - 2 && p.y < my + 18;
        lick += ((near ? 1 : 0) - lick) * Math.min(1, dt * 6);
        aimX = near ? Math.max(-6, Math.min(6, p.x - mx)) : aimX * 0.9;
        if (near && lick > 0.8 && t - slurpAt > 0.7) { slurpAt = t; c.sound.note(note(2) - 12, { dur: 0.25, vel: 0.12, wave: 'triangle', cutoff: 800 }); }
      };
      // a black shape on the screen; a hole cut in the black shows the light
      const sh = (x, y) => put(x, y, SH), hole = (x, y, lit) => put(x, y, lit || HOT);
      function draw(t) {
        const [dx, dy] = offs(), st = Math.floor(t * 10), dizzy = t < dizzyUntil, fl = flick[st % 8];
        const LX = 24 + PX + dx, LY = PY + dy;
        // the shoji screen: the candle's light hottest behind the lantern, falling off in steps to the corners
        const cx = 24 + PX * 0.5 + dx * 0.4, cy = 23 + PY;
        for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) {
          const d = Math.hypot((x + 0.5 - cx) * 0.9, (y + 0.5 - cy) * 0.8) - fl * 0.8;
          put(x, y, GLOW[d < 12 ? 5 : d < 17 ? 4 : d < 22 ? 3 : d < 27 ? 2 : d < 31 ? 1 : 0]);
        }
        // the night, as a shadow thrown on the screen from outside
        if (night === 'Moon' || night === 'Planets') for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) { const ex = x + 0.5 - (PX > 0 ? 9 : 39), ey = y + 0.5 - 9, d = Math.hypot(ex, ey); if (d < 5.5) put(x, y, night === 'Moon' && Math.hypot(ex + 2.5, ey - 1) < 4.5 ? GLOW[3] : HOT); if (night === 'Planets' && Math.abs(ey + ex * -0.25) < 0.7 && Math.abs(ex) < 9 && d > 5.5) put(x, y, SH); }
        if (night === 'Stars' || night === 'Fireflies') for (let k = 0; k < 12; k++) { const sx = Math.floor(v(10 + k) * 44) + 2, sy = Math.floor(v(30 + k) * (night === 'Fireflies' ? 44 : 20)) + 2; if (night === 'Fireflies' && Math.sin(t * 2 + k * 3) < 0) continue; put(sx, sy, HOT); if (night === 'Stars') { put(sx - 1, sy, GLOW[5]); put(sx + 1, sy, GLOW[5]); } }
        if (night === 'Rain') for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) if ((x * 2 + y + st * 3) % 19 === 0 && y % 6 < 4) put(x, y, GLOW[1]);
        if (night === 'Snow') for (let k = 0; k < 14; k++) put(Math.floor(v(50 + k) * 46) + 1, Math.floor((v(70 + k) * 48 + t * 5 * (0.5 + v(90 + k))) % 48), HOT);
        if (night === 'Clouds') for (const [ccx, ccy] of [[10, 6], [38, 13]]) for (let y = ccy; y < ccy + 3; y++) for (let x = ccx - 7 + (y - ccy); x < ccx + 7 - (y - ccy); x++) put((x + Math.floor(t * 2)) % 48, y, GLOW[2]);
        if (night === 'Bricks') for (let y = 40; y < M; y++) for (let x = 0; x < M; x++) if (x % 5 !== 0 || y === 40) sh(x, y);
        if (night === 'Graveyard') for (const [gx, w, h] of [[3, 5, 9], [40, 5, 7], [34, 4, 5]]) for (let y = M - h; y < M; y++) for (let x = gx; x < gx + w; x++) if (!(y === M - h && (x === gx || x === gx + w - 1))) sh(x, y);
        if (night === 'Cobwebs') for (let k = 0; k < 16; k++) { sh(k, k); sh(k, Math.floor(k / 2)); sh(Math.floor(k / 2), k); }
        if (night === 'Checker Floor') for (let y = 41; y < M; y++) for (let x = 0; x < M; x++) if (((x >> 2) + (y >> 2)) % 2) sh(x, y);
        if (night === 'Wallpaper') for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) if ((x + y) % 8 === 0 && (x - y + 64) % 8 === 0) put(x, y, GLOW[2]);
        // the screen's wooden lattice (a window night makes it a heavier one)
        const KUMI = night === 'Window' ? 12 : 16;
        for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) if ((x % KUMI === 0 && x > 0 && x < M - 2) || (y % KUMI === 0 && y > 0 && y < M - 2)) put(x, y, WOOD);
        // the cord, and the lantern's black silhouette with its paper's print cut out of it
        for (let k = 0; k <= 16; k++) { const f = k / 16, y = Math.round(PIV[1] + (5 + LY - PIV[1]) * f); if (y >= 0 && y < 5 + LY) sh(Math.round(PIV[0] + dx * f), y); }
        for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) {
          const k = lantern(x, y, dx, dy);
          if (!k) continue;
          sh(x, y);
          if (k !== 1) continue;
          const Y = y - dy - PY, X = x + 0.5 - 24 - PX - dx, w = half(Y + 0.5);
          if (Math.abs(X) > w - 1.5) continue;
          // the paper's print, as holes: dots, stripes, stars, checks, hearts, a lace hem
          const xi = Math.round(X);
          if (print === 'Polka Dots' && (xi + 40) % 5 === 0 && Y % 5 === 2 && (Y < 12 || Y > 32)) hole(x, y, GLOW[4]);
          if (print === 'Stripes' && (Y === 11 || Y === 34)) hole(x, y, GLOW[4]);
          if (print === 'Gingham' && (Y === 11 || Y === 34) && (xi + 40) % 2 === 0) hole(x, y, GLOW[4]);
          if (print === 'Stars' && Y === 34 && (xi + 40) % 6 === 0) { hole(x, y, GLOW[4]); }
          if (print === 'Hearts' && Y === 11 && (xi + 40) % 6 === 0) { hole(x, y, GLOW[4]); hole(x - 1, y - 1, GLOW[4]); hole(x + 1, y - 1, GLOW[4]); }
          if (print === 'Lace Hem' && Y === 36 && (xi + 40) % 3 === 0) hole(x, y, GLOW[4]);
        }
        if (print === 'Patched') for (let y = 31; y < 35; y++) for (let x = -9; x < -5; x++) if (y === 31 || y === 34 || x === -9 || x === -6) put(LX + x, LY + y, GLOW[2]);
        // the great eye, cut out: the light shows through it, the pupil red, looking hard at you (or spinning)
        const p = ptr();
        const lookX = p.in ? Math.max(-1, Math.min(1, (p.x - LX) / 10)) : Math.sin(t * 0.7) * 0.6, lookY = p.in ? Math.max(-1, Math.min(1, (p.y - LY - 15) / 12)) : 0;
        const ex = LX - 1, ey = LY + 15, RW = 9, RH = 6;
        const blink = ((t + 2) % 4.3) < 0.15 && !dizzy;
        const eyeHole = (x0, y0, rw, rh) => { for (let y = -rh; y <= rh; y++) for (let x = -rw; x <= rw; x++) if ((x / (rw + 0.4)) ** 2 + (y / (rh + 0.4)) ** 2 <= 1) hole(x0 + x, y0 + y); };
        const pupil = (x0, y0, r) => { r += 1; for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + r * 0.6) put(x0 + x, y0 + y, RED); for (let y = -1; y <= 0; y++) for (let x = -1; x <= 0; x++) sh(x0 + x + 1, y0 + y + 1); put(x0 - 1, y0 - 1, HOT); };
        if (blink || eyes === 'Wink' || eyes === 'Happy') { for (let x = -RW; x <= RW; x++) hole(ex + x, ey + (eyes === 'Happy' ? Math.round(Math.abs(x) * 0.35) - 2 : Math.abs(x) > 6 ? 0 : 1)); }
        else if (eyes === 'Crossed') { for (let k = -5; k <= 5; k++) { hole(ex + k, ey + k); hole(ex + k, ey - k); hole(ex + k + 1, ey + k); hole(ex + k + 1, ey - k); } }
        else if (eyes === 'Shades') { for (let y = -2; y <= 2; y++) for (let x = -RW; x <= RW; x++) if (Math.abs(y) < 2 || Math.abs(x) < RW - 1) put(ex + x, ey + y, '#2a1810'); put(ex - 4, ey - 1, RED); put(ex - 3, ey - 1, RED); }
        else if (eyes === 'Sleepy') { eyeHole(ex, ey + 2, RW, 3); for (let x = -RW; x <= RW; x++) sh(ex + x, ey); pupil(ex + Math.round(lookX * 4), ey + 3, 2); }
        else if (eyes === 'Hearts') { eyeHole(ex, ey, RW, RH); const hx = ex - 2 + Math.round(lookX * 3); [[0, 0], [1, 0], [3, 0], [4, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3]].forEach(([a, b]) => put(hx + a, ey - 1 + b, RED)); }
        else if (eyes === 'Starry') { eyeHole(ex, ey, RW, RH); const hx = ex + Math.round(lookX * 3); [[0, -3], [0, -2], [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [0, 2], [0, 3], [-1, -1], [1, 1], [1, -1], [-1, 1]].forEach(([a, b]) => put(hx + a, ey + b, RED)); }
        else if (eyes === 'Ring') { eyeHole(ex, ey, RW, RH); for (let k = 0; k < 16; k++) put(ex + Math.round(lookX * 3 + Math.cos(k * 0.39) * 3), ey + Math.round(lookY * 2 + Math.sin(k * 0.39) * 3), RED); }
        else if (eyes === 'Holes') { eyeHole(ex, ey, RW - 2, RH - 1); pupil(ex + Math.round(lookX * 4), ey + Math.round(lookY * 2), 2); }
        else {
          eyeHole(ex, ey, RW, RH);
          if (dizzy || eyes === 'Dizzy') { const sp = Math.floor(t * 10) % 4; for (let k = 0; k < 18; k++) { const a = k * 0.6 + sp, r = k * 0.28; if ((k + sp) % 4 < 3) put(ex + Math.round(Math.cos(a) * r), ey + Math.round(Math.sin(a) * r * 0.8), RED); } }
          else pupil(ex + Math.round(lookX * 5), ey + Math.round(lookY * 2.5), eyes === 'Cyclops' || eyes === 'Round' ? 3 : 2);
          if (eyes === 'Teary') for (let k = 0; k < 3; k++) hole(ex - RW + 1, ey + RH + 2 + k + (st % 6));
          if (eyes === 'Lashes') for (const a of [-6, -3, 0, 3, 6]) { sh(ex + a, ey - RH - 1); sh(ex + a, ey - RH - 2); }
          if (eyes === 'Uneven') eyeHole(ex + RW + 4, ey + 4, 2, 2);
          if (eyes === 'Spectacles' || eyes === 'Monocle') { for (let k = 0; k < 28; k++) sh(ex + Math.round(Math.cos(k * 0.224) * (RW + 2)), ey + Math.round(Math.sin(k * 0.224) * (RH + 2))); if (eyes === 'Monocle') for (let k = 0; k < 8; k++) sh(ex + RW + 2 + (k >> 1), ey + RH + 2 + k); }
        }
        // the brow over it, a black ridge (a frown for an angry one); it lifts when you grab the lantern
        if (eyes === 'Angry') for (let x = -RW; x <= RW; x++) for (let k = 0; k < 2; k++) sh(ex + x, ey - RH + Math.round((x + RW) * 0.25) - 1 + k);
        else for (let x = -RW - 1; x <= RW + 1; x++) sh(ex + x, ey - RH - 1 - (grabbed ? 1 : 0));
        // cheeks, cut out
        if (cheeks === 'Blush') for (const cx3 of [LX - 12, LX + 9]) for (let x = 0; x < 3; x++) hole(cx3 + x, ey + 7, GLOW[4]);
        if (cheeks === 'Freckles') for (const [a, b] of [[-11, 7], [-9, 8], [-10, 9], [9, 7], [11, 8], [10, 9]]) hole(LX + a, ey + b, GLOW[4]);
        if (cheeks === 'Whiskers') for (const sd of [-1, 1]) for (let k = 0; k < 5; k++) { sh(LX + sd * (12 + k), ey + 6 - (k >> 1)); sh(LX + sd * (12 + k), ey + 9 + (k >> 1)); }
        // the mouth, cut out as its trait gives it; the tongue a black shadow lolling out, a slit of light down it
        const my = LY + 27;
        if (mouth === 'None' || mouth === 'Stitched') { for (let x = -8; x <= 8; x++) { hole(LX + x, my + (x % 2 ? 1 : 0), GLOW[3]); if (mouth === 'Stitched' && x % 3 === 0) { sh(LX + x, my); sh(LX + x, my + 1); } } }
        else if (mouth === 'Oh' || mouth === 'Gasp' || mouth === 'Kiss' || mouth === 'Tiny') { const rw = mouth === 'Tiny' ? 2 : 4, rh = mouth === 'Tiny' ? 1 : 3; for (let y = -rh; y <= rh; y++) for (let x = -rw; x <= rw; x++) if ((x / (rw + 0.4)) ** 2 + (y / (rh + 0.4)) ** 2 <= 1) hole(LX + x, my + 1 + y, GLOW[4]); }
        else {
          const up = mouth === 'Smile' ? 1 : 0;
          for (let x = -10; x <= 10; x++) {
            const top = my + (Math.abs(x) % 3 === 1 ? 1 : 0) - (up && Math.abs(x) > 7 ? 2 : 0), bot = my + 4 - Math.round(Math.abs(x) * 0.25) - (up ? Math.round(Math.abs(x) * 0.25) : 0);
            for (let y = top + 1; y < bot; y++) hole(LX + x, y, GLOW[4]);
          }
          const TEETH = mouth === 'Fangs' ? [-6, 5] : mouth === 'Smile' || mouth === 'Wobble' ? [] : mouth === 'Toothy' ? [-8, -6, -4, -2, 0, 2, 4, 6, 8] : [-7, -4, 3, 6];
          for (const q of TEETH) { sh(LX + q, my + 2); if (mouth === 'Fangs' || mouth === 'Toothy') sh(LX + q, my + 3); }
          if (mouth === 'Wobble') for (let x = -9; x <= 9; x++) sh(LX + x, my + 2 + (x % 2));
        }
        const tongueOut = !(mouth === 'None' || mouth === 'Stitched' || mouth === 'Tiny' || mouth === 'Kiss' || mouth === 'Wobble' || mouth === 'Oh' || mouth === 'Gasp') || lick > 0.2;
        if (tongueOut) {
          // a long red tongue: it lolls and curls, and when your finger is near it reaches out and licks at it
          const wag = Math.sin(t * (lick > 0.6 ? 14 : 1.6) + 1) * (lick > 0.6 ? 1.5 : 1) - om * 1.2;
          const sx = LX - 1, sy = my + 3, L = 13 + lick * 6;
          const ix = sx + 4 + wag * 2, iy = sy + L;
          const tx = lick > 0.05 ? ix + (Math.max(sx - 12, Math.min(sx + 12, p.x)) - ix) * lick : ix, ty = lick > 0.05 ? iy + (Math.max(sy + 4, Math.min(sy + 22, p.y)) - iy) * lick : iy;
          const cxq = sx + (tx - sx) * 0.2, cyq = sy + (ty - sy) * 0.8;
          for (let k = 0; k <= 30; k++) {
            const u = k / 30, x = (1 - u) * (1 - u) * sx + 2 * (1 - u) * u * cxq + u * u * tx, y = (1 - u) * (1 - u) * sy + 2 * (1 - u) * u * cyq + u * u * ty, r = 2.7 - u * 1.2;
            for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) { const d = Math.hypot(xx + 0.5 - x, yy + 0.5 - y); if (d <= r) put(xx, yy, d > r - 0.6 ? '#7a0c0c' : d < 0.8 && u > 0.15 && u < 0.85 ? '#ff6a5a' : RED); }
          }
          // its tip curls over
          const cs = wag >= 0 ? 1 : -1;
          for (const [a, b] of [[0, 1], [cs, 2], [cs * 2, 1], [cs * 2, 0]]) put(tx + a, ty + b, '#7a0c0c');
        }
        // the companion: a shadow puppet held up on its rod
        const cpx = PX > 0 ? 7 : 40, cy0 = pal === 'Bat' || pal === 'Spider' || pal === "Will-o'-Wisp" ? 10 : 38, bob = Math.round(Math.sin(t * 2.2) * 1.4);
        const PUP = {
          Bat: ['#.......#', '##.#.#.##', '#########', '.#######.', '...#.#...'], Spider: ['#.#.#.#', '.#####.', '#######', '.#####.', '#.#.#.#'], Cat: ['#...#', '##.##', '#####', '#.#.#', '#####', '.####.#', '.#####.'],
          Crow: ['..##...', '.####..', '######.', '.#####.', '..#.#..'], "Jack-o'-Lantern": ['..#..', '#####', '#.#.#', '#####', '#...#', '.###.'], Mouse: ['#.#....', '###....', '.#####.', '.######', '......#'], "Will-o'-Wisp": ['..#..', '.##..', '.###.', '#####', '#####', '.###.'],
        }[pal];
        if (PUP) {
          PUP.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] === '#') sh(cpx - (row.length >> 1) + i, cy0 + j + bob); else if (pal === "Jack-o'-Lantern" && row[i] === '.' && j > 1 && j < 5 && i > 0 && i < 4) hole(cpx - 2 + i, cy0 + j + bob, GLOW[4]); });
          if (pal === 'Bat' || pal === 'Spider') { const wing = st % 4 < 2; if (wing) { sh(cpx - 5, cy0 + bob - 1); sh(cpx + 5, cy0 + bob - 1); } }
          for (let y = cy0 + PUP.length + bob; y < M; y++) sh(cpx, y); // its rod
        }
        // the showman's vermilion seal in a corner
        { const sxp = PX > 0 ? 40 : 3; for (let y = 41; y < 46; y++) for (let x = sxp; x < sxp + 5; x++) put(x, y, (x === sxp + 2 && y > 41 && y < 45) || (y === 43 && x > sxp && x < sxp + 4) ? GLOW[5] : '#d8301c'); }
        // the frame of the screen: dark wood all round
        for (let k = 0; k < M; k++) for (const [a, b] of [[k, 0], [k, M - 1], [0, k], [M - 1, k], [k, 1], [k, M - 2], [1, k], [M - 2, k]]) put(a, b, WOOD);
      }
      frame(0);
      return t => { feel(t); frame(t); };
    }

    // ---------- the legendaries: each its own full-colour 1/1 on the same 24-cell grid ----------
    function legendSpirit() {
      const cel = Math.max(1, Math.floor(S / N)), of = Math.floor((S - cel * N) / 2), sp = Math.ceil(of / cel) + 1, W = N + 2 * sp;
      const g = c.ctx;
      g.imageSmoothingEnabled = false;
      const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      const th = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
      const buf = new Array(W * W).fill('#000');
      const put = (x, y, col) => { const X = x + sp, Y = y + sp; if (X >= 0 && Y >= 0 && X < W && Y < W) buf[Y * W + X] = col; };
      // only the cells that changed since the last frame are painted again, in runs of one colour
      const shown = new Array(W * W).fill('');
      const paint = () => {
        for (let Y = 0; Y < W; Y++) for (let X = 0; X < W;) {
          const i = Y * W + X, col = buf[i];
          if (shown[i] === col) { X++; continue; }
          let e = X + 1;
          while (e < W && buf[Y * W + e] === col && shown[Y * W + e] !== col) e++;
          for (let k = X; k < e; k++) shown[Y * W + k] = col;
          g.fillStyle = col; g.fillRect(of + (X - sp) * cel, of + (Y - sp) * cel, (e - X) * cel, cel);
          X = e;
        }
      };
      // every cell of the extended grid (the margins too), row by row
      const each = f => { for (let y = -sp; y < N + sp; y++) for (let x = -sp; x < N + sp; x++) f(x, y); };
      const v = k => oat(0x4c00 + k);
      const hv = (x, y, k) => { let h = Math.imul(x + 97, 0x9e3779b1) ^ Math.imul(y + 61, 0x85ebca6b) ^ Math.imul(k + 7, 0xc2b2ae35); h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 13; return (h >>> 0) / 4294967296; };
      const root = 55 + parseInt(c.hash.slice(-2), 16) % 8, PEN = [0, 3, 5, 7, 10];
      const note = k => root + 12 * Math.floor(k / 5) + PEN[((k % 5) + 5) % 5];
      const tapsNow = () => c.input.taps().map(p => [Math.floor((p.x * S - of) / cel), Math.floor((p.y * S - of) / cel)]);
      // the pointer in grid cells (only the large view has one; tiles get a still one that is never inside)
      const ptr = () => { const i = c.input; return { x: (i.x * S - of) / cel, y: (i.y * S - of) / cel, in: i.inside, down: i.inside && i.down }; };
      // a tap that is only a tap: the gallery sends one on every press, so for the toys that also hold or drag, a tap
      // counts on a short, still release (or a press and release inside one frame)
      let pressT = -1, pressP = null, pressMoved = 0;
      const pressNow = t => {
        const p = ptr(), click = [], down = tapsNow();
        if (down.length) { if (p.down) { pressT = t; pressP = down[down.length - 1]; pressMoved = 0; } else click.push(...down); }
        if (pressT >= 0) {
          if (p.down) pressMoved = Math.max(pressMoved, Math.hypot(p.x - pressP[0] - 0.5, p.y - pressP[1] - 0.5));
          else { if (t - pressT < 0.35 && pressMoved < 1.6) click.push(pressP); pressT = -1; }
        }
        return { down, click };
      };
      const scene = legend === 'Stained Glass' ? glassScene() : stageScene();
      let last = '';
      const frame = t => {
        const key = scene.key(t);
        if (key === last) return;
        last = key;
        scene.draw(t);
        paint();
      };
      frame(0);
      return t => { scene.feel(t); frame(t); };

      // ----- Stained Glass: a cathedral's rose window of eight round petals, the spirit floating in its heart. Touch a
      // petal and a flame kindles behind it; light all eight and the window blazes and the spirit flies free -----
      function glassScene() {
        const HUES = [
          ['#0a1440', '#163a8c', '#2a5cc8', '#8cc0ff'], ['#3a0612', '#8a1430', '#cc2a40', '#ff9a8e'],
          ['#05301c', '#127044', '#20a05a', '#a4f0b0'], ['#1e0a40', '#4a1e8a', '#7c40d2', '#dcb4ff'],
        ];
        const fi = Math.floor(v(1) * 4), ai = (fi + 1 + Math.floor(v(2) * 3)) % 4;
        const FIELD = HUES[fi], ACC = HUES[ai];
        const GOLD = v(3) < 0.75 ? ['#5e3204', '#c87e10', '#ffc23a', '#fff0a0'] : ['#4a4a5a', '#a8a8c0', '#e4e4f4', '#ffffff'];
        const PEARL = v(4) < 0.6 ? ['#4c5688', '#9aa8d8', '#e4eafc', '#ffffff'] : v(4) < 0.85 ? ['#4a6650', '#9cc8a4', '#e0f6e4', '#ffffff'] : ['#6a4a70', '#c8a4d0', '#f6e4fa', '#ffffff'];
        // a lit petal: a candle flame behind the glass, warm from its core out
        const FLAME = ['#4a1404', '#b84808', '#ff9020', '#ffd070', '#fffbe0'];
        const LEAD = '#0a0810', STONE = ['#3a3448', '#5a5270', '#857c9c', '#bcb4cc'];
        const WALL = ['#141019', '#221c2a'];
        const C = 11.5, spin = v(6) < 0.5 ? 1 : -1;
        const PC = [0, 1, 2, 3, 4, 5, 6, 7].map(s => { const a = (s + 0.5) * Math.PI / 4 - Math.PI; return [C + Math.cos(a) * 6.9, C + Math.sin(a) * 6.9]; });
        const petalOf = (x, y) => Math.floor((Math.atan2(y + 0.5 - C, x + 0.5 - C) + Math.PI) / (2 * Math.PI) * 8) % 8;
        // what each cell is, worked out once: 0 wall, 1 stone ring, 2 lead, 3 outer band, 4 petal, 5 the heart
        const KIND = new Int8Array(W * W), SEG = new Int8Array(W * W), RAD = new Float32Array(W * W), ANG = new Float32Array(W * W), PD = new Float32Array(W * W);
        const at = (x, y) => (y + sp) * W + x + sp;
        each((x, y) => {
          const dx = x + 0.5 - C, dy = y + 0.5 - C, r = Math.hypot(dx, dy), i = at(x, y), s = petalOf(x, y);
          RAD[i] = r; ANG[i] = Math.atan2(dy, dx); SEG[i] = s;
          let k = 0;
          if (r >= 11.9) k = 0;
          else if (r >= 10.9) k = 1;
          else if (r >= 10.3) k = 2;
          else if (r >= 8.9) k = 3;
          else if (r >= 5.0) {
            // round petals, each parted from the next by lead
            const d = Math.hypot(x + 0.5 - PC[s][0], y + 0.5 - PC[s][1]);
            PD[i] = d;
            k = d <= 2.45 && r >= 5.6 ? 4 : 2;
          } else k = 5;
          KIND[i] = k;
        });
        // the outer band is parted by lead in line with the petals
        each((x, y) => {
          const i = at(x, y);
          if (KIND[i] === 3 && ((x + 1 < N + sp && KIND[at(x + 1, y)] === 3 && SEG[at(x + 1, y)] !== SEG[i]) || (y + 1 < N + sp && KIND[at(x, y + 1)] === 3 && SEG[at(x, y + 1)] !== SEG[i]))) KIND[i] = 2;
        });
        const K = (x, y) => x >= -sp && y >= -sp && x < N + sp && y < N + sp ? KIND[at(x, y)] : 0;
        const GH = ['...###...', '.#######.', '#########', '#########', '#########', '#########', '#########', '#.##.##.#'];
        const lit = [0, 0, 0, 0, 0, 0, 0, 0];
        let freeAt = -9, booUntil = -1, sunA = 0, lastT = 0;
        const blinkEvery = 3.5 + v(5) * 2;
        const FREE = 3.4;
        return {
          key: t => String(Math.floor(t * 10)) + ':' + lit.join(''),
          feel: t => {
            const dt = Math.max(0, Math.min(0.1, t - lastT)); lastT = t;
            const p = ptr();
            // the sun: it wheels round slowly, or follows the pointer round the rim
            const want = p.in ? Math.atan2(p.y - C, p.x - C) : sunA + dt * 0.55 * spin;
            const d = ((want - sunA) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
            sunA += p.in ? d * Math.min(1, dt * 8) : d;
            for (const [x, y] of tapsNow()) {
              if (t - freeAt < FREE) continue;
              const k = K(x, y), r = Math.hypot(x + 0.5 - C, y + 0.5 - C);
              if (k === 5) {
                booUntil = t + 0.6;
                c.sound.note(note(7), { dur: 0.22, vel: 0.2, wave: 'triangle', cutoff: 1400 });
                c.sound.note(note(5), { dur: 0.5, vel: 0.18, wave: 'triangle', cutoff: 900, at: 0.14 });
              } else if (r >= 4.5 && r < 10.4) {
                // a petal kindles, its note ringing; the eighth sets the spirit free
                const s = petalOf(x, y);
                if (lit[s]) continue;
                lit[s] = 1;
                c.sound.note(note(10 + s), { dur: 1.6, vel: 0.09, wave: 'sine', pan: x / N - 0.5 });
                if (lit.every(Boolean)) {
                  freeAt = t;
                  [0, 2, 4, 5, 7, 9, 10, 12].forEach((q, i2) => c.sound.note(note(10 + q), { dur: 1.8, vel: 0.07, wave: 'sine', at: 0.1 + i2 * 0.09 }));
                }
              }
            }
            if (freeAt > 0 && t - freeAt > FREE) { lit.fill(0); freeAt = -9; }
          },
          draw: t => {
            const blink = ((t + 2) % blinkEvery) < 0.18, free = t - freeAt < FREE ? (t - freeAt) / FREE : -1;
            const blaze = free >= 0 ? Math.sin(Math.min(1, free * 1.2) * Math.PI) : 0;
            const flick = Math.floor(t * 10);
            each((x, y) => {
              const i = at(x, y), k = KIND[i], r = RAD[i], s = SEG[i];
              const da = Math.abs(((ANG[i] - sunA) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
              const sunlit = da < 0.4 ? 1 : 0;
              let col;
              if (k === 0) {
                // a calm stone wall; the corner nearest a lit petal takes its colour
                const row = Math.floor((y + 64) / 3), sh = (row % 2) * 2;
                const mortar = (y + 64) % 3 === 0 || (x + 64 + sh) % 4 === 0;
                col = mortar ? '#0c0a10' : WALL[(Math.floor((x + 64 + sh) / 4) + row) % 2];
                if (!mortar && (lit[s] || blaze > 0.3) && r < 15) col = blaze > 0.3 ? GOLD[1] : FLAME[0];
              } else if (k === 1) {
                const lx = (x + 0.5 - C) + (y + 0.5 - C);
                col = r < 11.3 ? STONE[lx < 0 ? 3 : 2] : STONE[lx < -4 ? 2 : lx > 4 ? 0 : 1];
              } else if (k === 2) col = blaze > 0.6 ? GOLD[0] : LEAD;
              else if (k === 3) col = (s % 2 ? GOLD : ACC)[Math.min(3, 1 + sunlit + (blaze > 0.3 ? 1 : 0))];
              else if (k === 4) {
                const d = PD[i];
                if (lit[s] || blaze > 0.3) {
                  // a flame behind the glass, flickering, with a white-hot core
                  const fl = (flick + s * 3 + Math.floor(d * 2)) % 4 === 0 ? 1 : 0;
                  col = FLAME[d < 0.9 ? 4 - fl : d < 1.7 ? 3 - fl : 2 - fl];
                } else {
                  // unlit: the jewel, a highlight on the side the light comes from
                  const J = s % 2 ? ACC : FIELD, hl = (x + 0.5 - PC[s][0]) + (y + 0.5 - PC[s][1]) < -0.8;
                  col = J[d > 1.9 ? 0 : hl ? 2 + sunlit : 1 + sunlit];
                }
              } else col = blaze > 0.2 ? (th(x, y) < blaze ? GOLD[3] : GOLD[2]) : (x * 5 + y * 3) % 7 === 0 ? FIELD[2] : FIELD[0];
              put(x, y, col);
            });
            // the spirit: in its heart, or out flying a loop round the window while it blazes
            let gx = 7, gy = 8, wide = t < booUntil;
            if (free < 0) gy += Math.floor(t * 0.9) % 2;
            else {
              const u = free, a = u * Math.PI * 2;
              gx = Math.round(7 + Math.sin(a) * 9 * Math.sin(u * Math.PI));
              gy = Math.round(8 - Math.sin(a * 2) * 4 * Math.sin(u * Math.PI) - Math.sin(u * Math.PI) * 3);
              wide = true;
            }
            const inS = (rr, qq) => rr >= 0 && rr < GH.length && qq >= 0 && qq < GH[0].length && GH[rr][qq] === '#';
            GH.forEach((row, r) => { for (let q = -1; q <= row.length; q++) { if (inS(r, q)) put(gx + q, gy + r, r < 2 || q < 2 ? PEARL[3] : q > 6 || r > 6 ? PEARL[1] : PEARL[2]); else if (free >= 0 && (inS(r, q - 1) || inS(r, q + 1) || inS(r - 1, q) || inS(r + 1, q))) put(gx + q, gy + r, LEAD); } });
            if (wide) { for (const ex of [2, 5]) { put(gx + ex, gy + 3, LEAD); put(gx + ex + 1, gy + 3, LEAD); put(gx + ex, gy + 2, LEAD); } put(gx + 4, gy + 5, LEAD); put(gx + 4, gy + 6, LEAD); }
            else {
              if (!blink) { put(gx + 2, gy + 3, LEAD); put(gx + 6, gy + 3, LEAD); put(gx + 2, gy + 4, LEAD); put(gx + 6, gy + 4, LEAD); } else { put(gx + 2, gy + 4, PEARL[0]); put(gx + 6, gy + 4, PEARL[0]); }
              put(gx + 4, gy + 5, mouth === 'None' ? PEARL[1] : LEAD);
            }
            if (cheeks !== 'None' || lit.some(Boolean)) { put(gx + 1, gy + 5, '#ff9aa8'); put(gx + 7, gy + 5, '#ff9aa8'); }
            // the sun on the rim: a bright 2x2 of gold with a glint trailing behind it
            const sxy = a => [Math.round(C - 1 + Math.cos(a) * 9.6), Math.round(C - 1 + Math.sin(a) * 9.6)];
            const [t1x, t1y] = sxy(sunA - 0.42 * spin), [t2x, t2y] = sxy(sunA - 0.8 * spin);
            put(t2x + 1, t2y + 1, GOLD[2]); put(t1x, t1y + 1, GOLD[3]); put(t1x + 1, t1y + 1, GOLD[3]);
            const [sx, sy] = sxy(sunA);
            put(sx, sy, '#ffffff'); put(sx + 1, sy, '#fff8c0'); put(sx, sy + 1, '#fff8c0'); put(sx + 1, sy + 1, GOLD[3]);
          },
        };
      }

      // ----- Two Under One: the pair on a little stage, one sheet over both. They dance where the spotlight is and
      // chase it when you move it; throw them roses, and three bring the curtain down for a bow -----
      function stageScene() {
        const CURT = ['#3a0610', '#6e0e1e', '#a01c2e', '#d0384a'], GOLD = ['#7a4a10', '#d09a28', '#ffe080'];
        const SHEET = neg ? ['#0c0a14', '#1a1626', '#2a2438', '#3c3450'] : ['#6c6890', '#a8a4c8', '#e4e2f4', '#ffffff'];
        const FACE = neg ? '#fff8e0' : '#141018';
        let spotX = 12.5, pairX = 0, lastStep = 0, lastT = 0, callAt = -9;
        const roses = [], flying = [];
        const beat = t => Math.floor(t * 2.2);
        const sheet = (x, y, ox, oy) => {
          const px = x + 0.5 - ox, py = y + 0.5 - oy;
          if (((px - 9.5) / 4.1) ** 2 + ((py - 11.5) / 4.1) ** 2 <= 1) return true;
          if (((px - 16.5) / 3.2) ** 2 + ((py - 13.5) / 3.3) ** 2 <= 1) return true;
          if (py < 12.5 || py > 20) return false;
          if (px < 5.5 - (py - 12.5) * 0.2 || px > 19.6 + (py - 12.5) * 0.15) return false;
          return !(y - oy === 19 && (((x - ox) + 1) % 3 === 0));
        };
        // the curtain call: closing, closed (the roses are gathered), opening on a bow
        const callPhase = t => { const u = t - callAt; return u < 0 || u > 2.4 ? -1 : u; };
        return {
          key: t => Math.round(spotX * 2) + ':' + pairX + ':' + beat(t) + ':' + Math.floor(t * 6) + ':' + roses.length + ':' + flying.length + ':' + (callPhase(t) >= 0 ? Math.floor(t * 12) : ''),
          feel: t => {
            const dt = Math.max(0, Math.min(0.1, t - lastT)); lastT = t;
            const p = ptr();
            // the spotlight follows the pointer, or drifts by itself
            const want = p.in ? Math.max(3, Math.min(21, p.x)) : 12.5 + Math.sin(t * 0.35) * 2.5;
            spotX += (want - spotX) * Math.min(1, dt * 5);
            // the pair shuffle after it, a cell at a time
            const target = Math.round(spotX - 12.5);
            if (t - lastStep > 0.2 && target !== pairX && callPhase(t) < 0) { pairX += Math.sign(target - pairX); pairX = Math.max(-6, Math.min(3, pairX)); lastStep = t; }
            for (const [x, y] of pressNow(t).click) {
              if (x < 0 || y < 0 || x >= N || y >= N || callPhase(t) >= 0 || flying.length > 3) continue;
              // a rose thrown up from the audience onto the boards
              flying.push({ x: Math.max(2, Math.min(21, x)), t0: t });
              c.sound.note(note(12), { dur: 0.12, vel: 0.1, wave: 'sine' }); c.sound.note(note(14), { dur: 0.2, vel: 0.08, wave: 'sine', at: 0.08 });
            }
            for (let i = flying.length - 1; i >= 0; i--) if (t - flying[i].t0 > 0.7) {
              roses.push(flying[i].x); flying.splice(i, 1);
              c.sound.hit('click', 0.15);
              if (roses.length >= 3 && callPhase(t) < 0) {
                callAt = t;
                for (let k = 0; k < 10; k++) c.sound.hit('noise', 0.05 + (k % 3) * 0.02, { cutoff: 2400, dur: 0.08, at: 0.3 + k * 0.13 });
                for (let k = 0; k < 6; k++) c.sound.note(note(k % 2 ? 9 + (k >> 1) : 7 + (k >> 1)), { dur: 0.1, vel: 0.14, wave: 'triangle', cutoff: 1800, at: 1.5 + k * 0.11 });
              }
            }
            if (callPhase(t) > 1.1 && roses.length) roses.length = 0;
          },
          draw: t => {
            const cp = callPhase(t), lit = Math.abs(pairX + 12.5 - spotX) < 4.5;
            const bow = cp > 1.3 && cp < 2.2 ? 1 : 0, ox = pairX, oy = bow ? 1 : (lit && beat(t) % 2 === 0 ? -1 : 0);
            const fr = Math.floor(t * 6), blink = ((t + 2) % 3.7) < 0.16;
            // the curtains close and open again for the call
            const close = cp < 0 ? 0 : cp < 0.6 ? cp / 0.6 : cp < 1.3 ? 1 : cp < 1.9 ? 1 - (cp - 1.3) / 0.6 : 0;
            each((x, y) => {
              let col;
              // the spotlight: a beam from the flies down to a pool on the boards
              const bx = 12.5 + (spotX - 12.5) * Math.max(0, y + 2) / 22, beam = Math.abs(x + 0.5 - bx) < 1.6 + Math.max(0, y + 2) * 0.27;
              if (y >= 20) {
                const pool = ((x + 0.5 - spotX) / 6.5) ** 2 + ((y + 0.5 - 21) / 1.8) ** 2 <= 1;
                col = y === 23 ? (x % 3 === 1 ? (fr % 2 || x % 6 !== 1 ? '#ffe9a0' : '#d0a040') : '#24120a') : y === 20 ? (pool ? '#c89050' : '#8a5a2c') : pool ? ((x + y * 3) % 6 ? '#f0c888' : '#c89858') : ((x + y * 3) % 6 ? '#6a4020' : '#4a2a14');
              } else col = beam ? (th(x, y) < 0.5 ? '#4a3c74' : '#3a2e60') : (x * 7 + y * 13) % 29 === 0 && y < 15 ? '#3a3058' : '#140e24';
              // the curtains: velvet folds, tied back with gold cord, closing for the call
              const tie = 12, cw = (y < 2 ? 0 : y <= tie ? 3.6 - (y - 2) * 0.16 : 2 + (y - tie) * 0.26) + close * 10.5;
              const lx = x + 0.5, rx = 24 - lx;
              if (y < 20 && (lx < cw || rx < cw)) {
                const f = lx < cw ? x : 23 - x;
                col = CURT[[1, 2, 3, 2, 1, 0, 1][f % 7]];
                if (Math.abs(y - tie) < 0.6 && close < 0.2) col = GOLD[(x + fr) % 3 ? 1 : 2];
              }
              if (y < 2 || (y === 2 && (x + 1) % 4 !== 0)) col = y === 2 ? GOLD[1] : CURT[(x % 4 === 0) ? 1 : 2];
              if (y === 20 && x >= 6 + ox && x <= 19 + ox && close < 1) col = '#3a2210';
              const hidden = close > 0 && (lx < cw || rx < cw);
              if (!hidden && sheet(x, y, ox, oy)) {
                const px = x + 0.5 - ox, py = y + 0.5 - oy;
                let s = lit ? 2 : 1;
                if (py > 17.5 || px > 18.8) s = Math.max(0, s - 1);
                if (py < 10.5 && px < 9.5) s = Math.min(3, s + 1);
                if (py > 15.5 && px > 13.5 && px < 15) s = Math.max(0, s - 1);
                if (!(faint2 && s < 3 && (x + y) % 2)) col = SHEET[s];
              } else if (!hidden && y < 20 && (sheet(x - 1, y, ox, oy) || sheet(x + 1, y, ox, oy) || sheet(x, y - 1, ox, oy) || sheet(x, y + 1, ox, oy))) col = neg ? '#5a5070' : '#0c0814';
              put(x, y, col);
            });
            // the roses on the boards, and the ones in the air
            for (const rx of roses) { put(rx, 21, '#e0203a'); put(rx + 1, 21, '#2a8a3a'); }
            for (const f of flying) { const u = (t - f.t0) / 0.7, y = Math.round(24 - u * 9 + u * u * 6); put(f.x, y, '#ff3a50'); put(f.x + (u < 0.5 ? 1 : -1), y + 1, '#2a8a3a'); }
            if (close >= 1) return;
            // the faces: happy in the light, sad out of it, eyes shut and smiling for the bow
            const X = ox, Y = oy, P = (x, y, col) => { if (!(close > 0 && (x + X + 0.5 < (3.6 + close * 10.5) || 24 - (x + X + 0.5) < (3.6 + close * 10.5)))) put(x + X, y + Y, col); };
            if (bow || (lit && beat(t) % 4 === 3)) {
              for (const ex of [6, 10]) { P(ex, 11, FACE); P(ex + 1, 10, FACE); P(ex + 2, 11, FACE); }
              P(15, 14, FACE); P(18, 14, FACE);
            } else if (!lit) {
              for (const ex of [7, 10]) { P(ex, 11, FACE); P(ex + 1, 11, FACE); }
              P(6, 10, FACE); P(12, 10, FACE); P(15, 14, FACE); P(18, 14, FACE);
            } else if (blink) {
              for (const ex of [7, 10]) { P(ex, 11, FACE); P(ex + 1, 11, FACE); }
              P(15, 14, FACE); P(18, 14, FACE);
            } else {
              for (const ex of [7, 10]) { P(ex, 10, FACE); P(ex + 1, 10, FACE); P(ex, 11, FACE); P(ex + 1, 11, FACE); }
              P(15, 13, FACE); P(15, 14, FACE); P(18, 13, FACE); P(18, 14, FACE);
            }
            // a grin (a wobbly line when they're out of the light), an "oh" on the little one
            if (lit) { P(7, 13, FACE); P(11, 13, FACE); for (let q = 8; q <= 10; q++) P(q, 14, FACE); }
            else { P(7, 14, FACE); P(8, 13, FACE); P(9, 14, FACE); P(10, 13, FACE); P(11, 14, FACE); }
            P(16, 16, FACE); P(17, 16, FACE); if (bow) { P(16, 15, FACE); P(17, 15, FACE); }
            if (cheeks !== 'None' || bow) { P(6, 13, '#ff8aa0'); P(12, 13, '#ff8aa0'); P(14, 15, '#ff8aa0'); P(19, 15, '#ff8aa0'); }
            // the hats doff for the bow
            const tip = bow ? -2 : 0;
            const HAT = ['..####..', '..####..', '..####..', '..rrrr..', '########'];
            HAT.forEach((row, r) => { for (let q = 0; q < row.length; q++) if (row[q] !== '.') P(6 + q + (bow ? -1 : 0), 3 + r + tip, row[q] === 'r' ? '#c41f3c' : r === 0 || q === 2 ? '#5a5070' : q === 3 && r < 3 ? '#2a2438' : '#100c16'); });
            const CROWN = ['g..g', 'gggg', 'gRBg'];
            CROWN.forEach((row, r) => { for (let q = 0; q < row.length; q++) if (row[q] !== '.') P(15 + q, 8 + r + tip, row[q] === 'R' ? '#e02040' : row[q] === 'B' ? '#3060ff' : (q + r + fr) % 5 ? GOLD[1] : GOLD[2]); });
          },
        };
      }
    }


    // the glass and the lantern glow in their own dark world; everything else keeps its duotone
    const WORLD = { 'Stained Glass': ['#7d7499', '#0c0a14'], 'Paper Lantern': ['#5e3b4c', '#130a12'] }[legend];
    const PAPER = WORLD ? WORLD[0] : neg ? duo[2] : duo[1], INK = WORLD ? WORLD[1] : neg ? duo[1] : duo[2];
    const DROP = { None: 0, Bow: 0, Flower: 0, Halo: 1, Beanie: 1, Leaf: 1, 'Party Hat': 3 };
    const drop = form === 'Twin' ? 1 : hat in DROP ? DROP[hat] : 2;
    const hy = 11 + drop; // head centre row
    const cx = 12;
    const dims = {
      Classic: [6.6, 7.6, 21, 0.16], Plump: [8.2, 8.4, 21, 0.08], Tall: [5.6, 8.6, 22, 0.2], Tattered: [6.8, 7.6, 21, 0.2], Wisp: [6.4, 7.8, 22, 0],
      Droplet: [6.9, 8.8, 21, 0.14], Pillowcase: [7.1, 7.4, 21, 0], Flared: [6.2, 7.4, 21, 0.42], Melting: [6.9, 7.6, 20, 0.1],
      Lantern: [7.9, 6.6, 21, 0], Twin: [10.2, 6.0, 21, 0.1],
    }[form];
    const [rx, ry, bot] = [dims[0], dims[1], dims[2] + drop];
    // the lantern's body: a paper barrel between two lacquered caps
    const lanternW = py => {
      const ky = (py - hy - 2.2) / 8.8;
      if (ky < -1 || ky > 1) return -1;
      return Math.abs(ky) > 0.86 ? 3.6 : 7.9 * Math.sqrt(1 - ky * ky * 0.8);
    };

    function sheetAt(x, y) {
      const px = x + 0.5 - cx, py = y + 0.5;
      if (form === 'Lantern') return Math.abs(px) <= lanternW(py);
      if (form === 'Twin') {
        // two heads under one sheet: a big one, and a little one tucked in lower beside it
        if (((px + 4.5) / 5.6) ** 2 + ((py - hy) / 6.0) ** 2 <= 1 || ((px - 6) / 4.2) ** 2 + ((py - hy - 2.5) / 4.6) ** 2 <= 1) return true;
        if (py <= hy + 2.5) return false;
        if (Math.abs(px) > rx + (py - hy - 2.5) * dims[3]) return false;
        return y <= bot - (Math.abs(Math.sin(Math.PI * (x + 0.5) / 3.6)) < 0.5 ? 1 : 0);
      }
      if (shape === 'Pillowcase') {
        // a pillowcase thrown over: square, with a tuft at each corner
        const ax = Math.abs(px), t0 = hy - ry + 1;
        if (ax > rx || py < t0 - 1 || y > bot + 1) return false;
        if (py < t0 || y > bot) return ax > rx - 1.1;
        return true;
      }
      if (py <= hy) {
        if (shape === 'Droplet') {
          // an onion-dome head whose tip curls over to one side
          const k = (hy - py) / ry;
          if (k > 1) return false;
          return Math.abs(px - 1.7 * k ** 4) <= rx * Math.pow(1 - k, 0.5) + 0.15;
        }
        return (px * px) / (rx * rx) + ((py - hy) * (py - hy)) / (ry * ry) <= 1;
      }
      const k = (py - hy) / (bot - hy);
      if (k > 1.4) return false;
      if (shape === 'Wisp') {
        const half = rx * Math.pow(Math.max(0, 1 - k), 0.65);
        const sway = 3.2 * k * k;
        return Math.abs(px - sway) <= half + 0.2;
      }
      const half = rx + (py - hy) * dims[3];
      if (Math.abs(px) > half) return false;
      let bottom = bot;
      if (shape === 'Tattered') bottom = bot - Math.floor(hem[x] * 3);
      else if (shape === 'Melting') bottom = bot + (hem[x] > 0.72 ? 1 + Math.floor((hem[x] - 0.72) * 11) : 0);
      else {
        const left = cx - half, period = shape === 'Plump' ? 4.2 : shape === 'Flared' ? 4.6 : 3.4;
        bottom = bot - (Math.abs(Math.sin(Math.PI * (x + 0.5 - left) / period)) < 0.5 ? 1 : 0);
      }
      return y <= bottom;
    }

    // the night: a function of the cell, defined beyond the grid so the margins match
    const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    const CLOUD = ['...###....', '.##...##..', '#.......##', '#.........#', '.#########.'];
    const STONES = [[-2, 4, 5], [2, 3, 3], [19, 4, 4], [24, 3, 6]];
    // a corner web: three spokes from the corner and three sagging rings, walked out cell by cell
    const WEB = new Set();
    for (const [a, b, p, q] of [[0, 0, 8, 4], [0, 0, 6, 6], [0, 0, 4, 8], [6, 0, 5, 3], [5, 3, 4, 4], [4, 4, 3, 5], [3, 5, 0, 6], [9, 0, 8, 4], [8, 4, 6, 6], [6, 6, 4, 8], [4, 8, 0, 9]]) {
      const n = Math.max(Math.abs(p - a), Math.abs(q - b));
      for (let k = 0; k <= n; k++) WEB.add(Math.round(a + (p - a) * k / n) * 16 + Math.round(b + (q - b) * k / n));
    }
    function nightAt(x, y, tw) {
      const mx = ((x % 4) + 4) % 4, my = ((y % 4) + 4) % 4;
      if (night === 'Dither') return bayer[my * 4 + mx] < Math.max(0, (y - 6) / 18) * 7;
      if (night === 'Rain') return ((x * 2 + y * 3 + 400) % 11 === 0) && ((y + 400) % 4 !== 0);
      if (night === 'Bricks') {
        const row = Math.floor((y + 40) / 4);
        if ((y + 40) % 4 === 0) return (x + 40) % 2 === 0;
        return (y + 40) % 4 === 2 && ((x + 40 + (row % 2) * 4) % 8 === 0);
      }
      if (night === 'Moon' || night === 'Planets') {
        const mx0 = moonLeft ? 3.5 : 20.5, dx = x + 0.5 - mx0, dy = y + 0.5 - 4, dd = dx * dx + dy * dy;
        if (night === 'Moon') {
          const ex = dx + (moonLeft ? 2.2 : -2.2), ed = ex * ex + (dy + 1.2) * (dy + 1.2);
          if (dd <= 15) return ed > 11;
        } else {
          // a ringed planet: the ring passes in front below and behind above
          const ring = (dx / 6.2) ** 2 + (dy / 1.5) ** 2;
          const onRing = ring > 0.62 && ring < 1.05 && (dy > 0 || dd > 8.5);
          if (onRing) return true;
          if (dd <= 8.5) return !(Math.abs(dy) < 0.6 && dd > 2) && !(ring > 0.45 && ring <= 0.62 && dy > 0);
          const px2 = x + 0.5 - (moonLeft ? 19 : 5), py2 = y + 0.5 - 9;
          if (px2 * px2 + py2 * py2 <= 1.6) return true;
        }
      }
      if (night === 'Stars' || night === 'Moon' || night === 'Planets') {
        const n = night === 'Stars' ? stars.length : 9;
        for (let i = 0; i < n; i++) {
          const s = stars[i];
          if (s[0] === x && s[1] === y) return true;
          if (s[2] > 0.8 && ((tw + i) % 3 === 0) && Math.abs(s[0] - x) + Math.abs(s[1] - y) === 1) return true;
        }
        return false;
      }
      if (night === 'Snow') {
        for (const f of flakes) {
          const fy = ((f[1] + Math.floor(tw * f[2])) % 30) - 3;
          if (fy === y && f[0] + (Math.floor((tw * f[2] + f[1]) / 3) % 2) === x) return true;
        }
        return y === N + 1 || (y === N && (x * 5 + 1) % 7 !== 0);
      }
      if (night === 'Graveyard') {
        if (y >= N - 1) return y === N - 1 || (x * 3) % 5 === 0;
        for (const [sx, w, h] of STONES) {
          if (x < sx || x >= sx + w || y < N - 1 - h) continue;
          const tx = x - sx, ty = y - (N - 1 - h);
          if (ty === 0 && (tx === 0 || tx === w - 1)) return false;
          // a cross carved into the bigger stones
          if (w > 3 && h > 3 && ((tx === 1 || tx === 2) && ty === 2 || (tx === 1 + (sx & 1)) && ty > 0 && ty < 4)) return false;
          return true;
        }
        return y === N - 2 && (x * 7) % 9 === 2;
      }
      if (night === 'Window') {
        // a tall sash window behind, a sliver of moon in one pane
        if (y === 17) return x >= -1 && x <= 24;
        if (y === 18) return x >= 0 && x <= 23 && (x & 1) === 0;
        if (y < 1 || y > 16 || x < 1 || x > 22) return false;
        if (x === 1 || x === 22 || y === 1 || y === 16 || y === 8 || x === 11 || x === 12) return true;
        const dx = x + 0.5 - 5.5, dy = y + 0.5 - 4.5;
        return dx * dx + dy * dy <= 4.2 && (dx + 1.1) * (dx + 1.1) + (dy - 0.8) * (dy - 0.8) > 3.2;
      }
      if (night === 'Fireflies') {
        for (let i = 0; i < flies.length; i++) {
          const f = flies[i];
          if ((tw + i * 2) % 7 > 4) continue;
          const fx = f[0] + Math.round(Math.sin(tw * 0.35 + f[2]) * 1.4), fy = f[1] + Math.round(Math.cos(tw * 0.27 + f[2]));
          if (fx === x && fy === y) return true;
          if ((tw + i * 2) % 7 === 2 && Math.abs(fx - x) + Math.abs(fy - y) === 1) return true;
        }
        return false;
      }
      if (night === 'Clouds') {
        const drift = Math.floor(tw / 4);
        for (const [ox, oy, sp] of [[-2, 1, 1], [13, 6, 2], [4, 13, 1]]) {
          const lx = ((x - ox - Math.floor(drift / sp)) % 34 + 34) % 34, ly = y - oy;
          if (ly >= 0 && ly < CLOUD.length && lx < CLOUD[ly].length && CLOUD[ly][lx] === '#') return true;
        }
        return false;
      }
      if (night === 'Wallpaper') {
        // a faded damask: a dotted diamond trellis with a seed in each diamond
        const a = (x + y + 64) % 8, b = (x - y + 64) % 8;
        if ((a === 0 || b === 0) && (x + y) % 2 === 0 && (x + 64) % 4 !== 1) return true;
        return a === 4 && b === 4;
      }
      if (night === 'Cobwebs') return y >= 0 && y < 12 && WEB.has((moonLeft ? N - 1 - x : x) * 16 + y);
      if (night === 'Checker Floor') {
        if (y === 16) return true;
        if (y > 16) return ((x >> 1) + (y >> 1)) % 2 === 0 && (x + y) % 2 === 0;
        return (x === 4 && y === 3) || (x === 19 && y === 5) || (x === 10 && y === 1);
      }
      return false;
    }

    // offscreen grid: 0 empty, 1 paper, 2 ink, 3 the face's ink (eyes, mouth, cheeks)
    const grid = new Uint8Array(N * N);
    const put = (x, y, v) => { if (x >= 0 && y >= 0 && x < N && y < N) grid[y * N + x] = v; };
    const rect = (x0, y0, w, h, v) => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) put(x, y, v); };
    const onSheet = (x, y) => x >= 0 && y >= 0 && x < N && y < N && grid[y * N + x] === 1;
    const mark = (x, y) => { if (onSheet(x, y)) grid[y * N + x] = 3; };
    // stamp a shape (list of rows) with an ink ring around it
    function stamp(rows, x0, y0) {
      for (let r = 0; r < rows.length; r++) for (let q = 0; q < rows[r].length; q++) if (rows[r][q] !== '.') {
        for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
          const gx = x0 + q + b, gy = y0 + r + a;
          if (gx >= 0 && gy >= 0 && gx < N && gy < N && grid[gy * N + gx] === 1) {
            const rr = r + a, qq = q + b;
            const inside = rr >= 0 && rr < rows.length && qq >= 0 && qq < rows[rr].length && rows[rr][qq] !== '.';
            if (!inside) grid[gy * N + gx] = 2;
          }
        }
      }
      for (let r = 0; r < rows.length; r++) for (let q = 0; q < rows[r].length; q++) {
        const ch = rows[r][q];
        if (ch === '#') put(x0 + q, y0 + r, 1);
        else if (ch === 'o') put(x0 + q, y0 + r, 2);
      }
    }

    // an ink shape with a paper ring, for hats that sit on the head
    function stampInk(rows, x0, y0) {
      for (let r = -1; r <= rows.length; r++) for (let q = -1; q <= rows[0].length; q++) {
        const at = (rr, qq) => rr >= 0 && rr < rows.length && qq >= 0 && qq < rows[rr].length && rows[rr][qq] !== '.';
        if (at(r, q)) continue;
        let near = false;
        for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) if (at(r + a, q + b)) near = true;
        const gx = x0 + q, gy = y0 + r;
        if (near && gx >= 0 && gy >= 0 && gx < N && gy < N && grid[gy * N + gx] === 0) grid[gy * N + gx] = 1;
      }
      for (let r = 0; r < rows.length; r++) for (let q = 0; q < rows[r].length; q++) {
        const ch = rows[r][q];
        if (ch === '#') put(x0 + q, y0 + r, 2);
        else if (ch === 'o') put(x0 + q, y0 + r, 1);
      }
    }

    // the legendaries' moving parts: where the pair look, the lantern's tongue, the red balloon's tug and lift
    let look = 0, lick = 0, wag = 0, balTug = 0, balLift = 0, balBox = null;
    function build(bob, blink, flick, spin, boo) {
      grid.fill(0);
      const oy = bob;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (sheetAt(x, y - oy)) grid[y * N + x] = 1;
      const H = hy + oy, top = Math.round(hy - ry) + oy;
      // the print on the lower sheet, kept off the edges so the silhouette stays clean
      if (print !== 'Plain' && print !== 'Patched') {
        const inner = (x, y) => onSheet(x, y) && onSheet(x - 1, y) && onSheet(x + 1, y) && onSheet(x, y - 1) && onSheet(x, y + 1);
        for (let y = H + 6; y < N; y++) for (let x = 1; x < N - 1; x++) {
          if (!inner(x, y)) continue;
          let on = false;
          if (print === 'Polka Dots') on = y % 3 === 0 && (x + (y % 6 ? 0 : 2)) % 4 === 1;
          else if (print === 'Stripes') on = (y - H) % 3 === 0;
          else if (print === 'Gingham') on = (x + y) % 2 === 0 && ((x >> 1) + (y >> 1)) % 2 === 0;
          else if (print === 'Lace Hem') on = !onSheet(x, y + 2) && x % 2 === 0;
          if (on) put(x, y, 2);
        }
        if (print === 'Stars' || print === 'Hearts') {
          const motif = print === 'Stars' ? [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]] : [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1], [1, 2]];
          for (const [mx, my] of [[6, H + 6], [14, H + 7], [10, H + 9]]) if (motif.every(([a, b]) => inner(mx + a, my + b))) for (const [a, b] of motif) put(mx + a, my + b, 2);
        }
      }
      if (form === 'Twin') { twin(H, top, blink, boo); return; }
      // little arms
      const armY = H + 5;
      const armL = Math.floor(cx - rx - (shape === 'Wisp' ? 0 : 5 * dims[3])), armR = Math.min(21, 23 - armL);
      if (held !== 'Nothing' && held !== 'Little One') { put(armR, armY, 1); put(armR + 1, armY - 1, 1); }
      // eyes
      const L = 8, R = 14, F = 3;
      if (boo) {
        // startled: tall wide eyes with a glint
        for (const ex of [L - 1, R]) { rect(ex, H - 2, 3, 4, F); put(ex + 1, H - 1, 1); }
      } else if (blink && eyes !== 'Shades' && eyes !== 'Cyclops') {
        const wide = eyes === 'Round' || eyes === 'Spectacles' || eyes === 'Dizzy';
        rect(L - (wide ? 2 : 0), H + 1, wide ? 4 : 2, 1, F);
        rect(R, H + 1, wide ? 4 : 2, 1, F);
        if (eyes === 'Spectacles') for (const ex of [L - 2, R]) { rect(ex, H - 2, 4, 1, F); rect(ex, H + 1, 4, 1, F); put(ex, H - 1, F); put(ex, H, F); put(ex + 3, H - 1, F); put(ex + 3, H, F); }
        if (eyes === 'Monocle') { rect(R - 1, H - 2, 4, 1, F); rect(R - 1, H + 1, 4, 1, F); put(R - 1, H - 1, F); put(R - 1, H, F); put(R + 2, H - 1, F); put(R + 2, H, F); }
      } else if (eyes === 'Holes') { rect(L, H - 1, 2, 3, F); rect(R, H - 1, 2, 3, F); }
      else if (eyes === 'Round') {
        for (const ex of [L - 2, R]) {
          rect(ex + 1, H - 2, 2, 1, F); rect(ex, H - 1, 4, 2, F); rect(ex + 1, H + 1, 2, 1, F);
          put(ex + 1, H - 1, 1);
        }
      } else if (eyes === 'Sleepy') { rect(L - 1, H, 3, 1, F); rect(R, H, 3, 1, F); put(L - 1, H + 1, F); put(R + 2, H + 1, F); }
      else if (eyes === 'Crossed') {
        for (const ex of [L - 1, R]) { put(ex, H - 1, F); put(ex + 2, H - 1, F); put(ex + 1, H, F); put(ex, H + 1, F); put(ex + 2, H + 1, F); }
      } else if (eyes === 'Shades') { rect(L - 1, H - 1, 3, 2, F); rect(R, H - 1, 3, 2, F); rect(L + 2, H - 1, 4, 1, F); put(L, H - 1, 1); put(R + 1, H - 1, 1); }
      else if (eyes === 'Hearts') {
        for (const ex of [L - 1, R]) { put(ex, H - 1, F); put(ex + 2, H - 1, F); rect(ex, H, 3, 1, F); put(ex + 1, H + 1, F); }
      } else if (eyes === 'Cyclops') {
        rect(10, H - 2, 4, 4, F); put(10, H - 2, 1); put(13, H - 2, 1); put(10, H + 1, 1); put(13, H + 1, 1);
        if (blink) { rect(10, H - 2, 4, 3, 1); put(10, H - 2, 1); } else { put(11, H - 1, 1); }
      } else if (eyes === 'Happy' || eyes === 'Wink') {
        // happy eyes are two little arches; a wink keeps one eye open
        for (const ex of [L - 1, R]) {
          if (eyes === 'Wink' && ex < R) { rect(L, H - 1, 2, 3, F); continue; }
          put(ex, H + 1, F); put(ex + 1, H, F); put(ex + 2, H + 1, F);
        }
      } else if (eyes === 'Ring') {
        for (const ex of [L - 1, R]) { rect(ex, H - 1, 3, 3, F); put(ex + 1, H, 1); }
      } else if (eyes === 'Starry') {
        for (const ex of [L - 1, R]) { put(ex + 1, H - 1, F); rect(ex, H, 3, 1, F); put(ex + 1, H + 1, F); if (spin % 2) { put(ex + 1, H - 2, F); put(ex + 1, H + 2, F); } }
      } else if (eyes === 'Teary') {
        rect(L, H - 1, 2, 3, F); rect(R, H - 1, 2, 3, F);
        const drip = H + 3 + (spin >> 1);
        mark(L - 1, drip); mark(R + 2, drip);
      } else if (eyes === 'Angry') {
        rect(L, H, 2, 2, F); rect(R, H, 2, 2, F);
        put(L - 1, H - 2, F); put(L, H - 2, F); put(L + 1, H - 1, F);
        put(R + 2, H - 2, F); put(R + 1, H - 2, F); put(R, H - 1, F);
      } else if (eyes === 'Dizzy') {
        const sp = ['####', '...#', '.#.#', '.###'];
        for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) if (sp[r][q] === '#') { put(L - 2 + q, H - 2 + r, F); put(R + 3 - q, H - 2 + r, F); }
      } else if (eyes === 'Spectacles') {
        for (const ex of [L - 2, R]) { rect(ex, H - 2, 4, 4, F); rect(ex + 1, H - 1, 2, 2, 1); put(ex + (ex < R ? 2 : 1), H, F); }
        rect(L + 2, H - 1, 4, 1, F);
      } else if (eyes === 'Lashes') {
        rect(L, H - 1, 2, 3, F); rect(R, H - 1, 2, 3, F);
        put(L - 1, H - 2, F); put(L - 1, H - 1, F); put(R + 2, H - 2, F); put(R + 2, H - 1, F);
      } else if (eyes === 'Uneven') {
        rect(L - 1, H - 2, 3, 1, F); rect(L - 2, H - 1, 4, 2, F); rect(L - 1, H + 1, 3, 1, F); put(L - 1, H - 1, 1);
        rect(R + 1, H, 2, 2, F);
      } else if (eyes === 'Monocle') {
        rect(L, H - 1, 2, 3, F);
        rect(R - 1, H - 2, 4, 4, F); rect(R, H - 1, 2, 2, 1); put(R, H, F);
        for (let k = 1; k < 7; k += 2) mark(R + 2 + (k > 3 ? 1 : 0), H + 1 + k);
      }
      if (patch) { const px = 5, py = H + 6; rect(px, py, 4, 1, 2); rect(px, py + 3, 4, 1, 2); put(px, py + 1, 2); put(px, py + 2, 2); put(px + 3, py + 1, 2); put(px + 3, py + 2, 2); put(px + 1, py + 1, 2); put(px + 2, py + 2, 2); }
      // cheeks
      const M = H + 4;
      if (cheeks === 'Blush') { mark(5, H + 3); mark(6, H + 2); mark(7, H + 3); mark(16, H + 3); mark(17, H + 2); mark(18, H + 3); }
      else if (cheeks === 'Freckles') { mark(6, H + 2); mark(5, H + 3); mark(7, H + 3); mark(17, H + 2); mark(16, H + 3); mark(18, H + 3); }
      else if (cheeks === 'Whiskers') for (const k of [0, 1, 2]) { mark(5 + k, M - 1); mark(18 - k, M - 1); mark(5 + k, M + 1); mark(18 - k, M + 1); }
      // mouth
      if (boo) { rect(10, M - 1, 4, 3, F); put(10, M - 1, 1); put(13, M - 1, 1); put(10, M + 1, 1); put(13, M + 1, 1); }
      else if (mouth === 'Oh') { rect(11, M - 1, 2, 2, F); }
      else if (mouth === 'Grin') { rect(10, M - 1, 4, 1, F); put(9, M - 2, F); put(14, M - 2, F); }
      else if (mouth === 'Wobble') { for (let x = 9; x <= 14; x++) put(x, M - 1 + (x % 2), F); }
      else if (mouth === 'Tongue') { rect(10, M - 1, 4, 1, F); put(10, M, F); put(13, M, F); put(11, M + 1, F); put(12, M + 1, F); }
      else if (mouth === 'Fangs') { rect(9, M - 1, 6, 1, F); put(8, M - 2, F); put(15, M - 2, F); put(10, M, F); put(13, M, F); }
      else if (mouth === 'Smile') { put(8, M - 2, F); put(9, M - 1, F); rect(10, M, 4, 1, F); put(14, M - 1, F); put(15, M - 2, F); }
      else if (mouth === 'Kiss') { put(12, M - 1, F); put(11, M, F); put(12, M + 1, F); put(13, M - 2, spin === 1 ? F : 1); }
      else if (mouth === 'Stitched') { rect(9, M, 6, 1, F); for (const x of [10, 13]) { put(x, M - 1, F); put(x, M + 1, F); } }
      else if (mouth === 'Gasp') { rect(11, M - 1, 2, 1, F); put(10, M, F); put(13, M, F); rect(11, M + 1, 2, 1, F); }
      else if (mouth === 'Toothy') { rect(9, M - 1, 6, 2, F); put(10, M - 1, 1); put(13, M - 1, 1); }
      else if (mouth === 'Tiny') { rect(11, M, 2, 1, F); }
      // hat
      if (hat === 'Top Hat') stampInk(['..######..', '..######..', '..######..', '..oooooo..', '##########'], 7, top - 2);
      else if (hat === 'Witch Hat') {
        const tip = spin % 2;
        stampInk([tip ? '.........##.' : '........##..', '.......###..', '......####..', '.....#####..', '....######..', '....oooooo..', '############'], 6, top - 4);
      } else if (hat === 'Crown') stampInk(['#..##..#', '#.####.#', '########', '###oo###', '########'], 8, top - 2);
      else if (hat === 'Bow') stamp(['##...##', '###.###', '##ooo##', '###.###', '##...##'], 13, top - 1);
      else if (hat === 'Propeller') {
        stamp(spin ? ['..######..'] : ['....##....'], 7, top - 4);
        stampInk(['##', '##'], 11, top - 2);
        stampInk(['..####..', '.######.', '##oo####'], 8, top);
      } else if (hat === 'Halo') {
        const hb = Math.floor(spin / 2) % 2;
        stamp(['.######.', '#......#', '.######.'], 8, top - 4 - hb);
      } else if (hat === 'Party Hat') stamp(['...##...', '...oo...', '...##...', '..##o#..', '..#o##..', '.##o##o.', '.#o##o##'], 8, top - 6);
      else if (hat === 'Beanie') stampInk(['....##....', '..######..', '.########.', '##########', '#o#o##o#o#'], 7, top - 3);
      else if (hat === 'Pumpkin') stamp(['....#...', '.######.', '##o##o##', '##o##o##', '.######.'], 8, top - 4);
      else if (hat === 'Flower') stamp(['..#..', '.#o#.', '#ooo#', '.#o#.', '..#..'], 14, top - 2);
      else if (hat === 'Chef Hat') stamp(['.##..##.', '########', '########', '.######.', '.oooooo.', '.######.'], 8, top - 5);
      else if (hat === 'Bunny Ears') {
        // ears grown out of the sheet itself, an ink crease down each; the right one twitches
        const EAR = [[-5, '.##.'], [-4, '####'], [-3, '#o##'], [-2, '#o##'], [-1, '####'], [0, '.###']];
        for (const [dy, row] of EAR) for (let q = 0; q < row.length; q++) if (row[q] !== '.') {
          const v = row[q] === '#' ? 1 : 2, tw = spin === 3 && dy < -3 ? 1 : 0;
          put(7 + q, top + dy, v); put(23 - 7 - q + tw, top + dy, v);
        }
      }
      else if (hat === 'Sprout') { const sw = spin < 2 ? 0 : 1; stamp(['##..##', '.#..#.', '..##..', '..#...', '..#...'], 9 + sw, top - 5); }
      else if (hat === 'Leaf') stamp(spin === 2 ? ['...##', '..###', '.#o#.', '#o#..', '#....'] : ['..##.', '.###.', '.o##.', 'o##..', '#....'], 12, top - 4);
      else if (hat === 'Candle') { stamp(['##', '##', '##'], 11, top - 3); put(11 + flick, top - 5, 1); put(11, top - 4, 1); put(12, top - 4, 1); }
      else if (hat === 'Bucket') stampInk(['..####..', '.######.', '.oooooo.', '.######.', '########'], 8, top - 3);
      else if (hat === 'Tiny Ghost') stamp(['.###.', '#####', spin === 2 ? '#####' : '#o#o#', '#####', '#.#.#'], 9, top - 4);
      // carried thing
      const ix = Math.min(armR + 1, 19), iy = armY - 7;
      if (held === 'Lantern') {
        stamp(['.##.', '#..#', '####', '#oo#', '#oo#', '#oo#', '####'], ix - 1, iy);
        put(ix + (flick ? 1 : 0), iy + 4, 1); put(ix + (flick ? 1 : 0), iy + 3 + (flick ? 0 : 1), 1);
      } else if (held === 'Candle') {
        stamp(['##', '##', '##', '##', '##'], ix, iy + 2);
        put(ix + flick, iy, 1); put(ix, iy + 1, 1); put(ix + 1, iy + 1, 1);
      } else if (held === 'Balloon') {
        const bx = ix - 1, by = 1 + oy;
        stamp(['.###.', '#####', '##o##', '#####', '.###.', '..#..'], bx, by);
        put(bx + 3, by + 1, 2);
        for (let y = by + 6; y < armY - 1; y++) if (y % 2 === 0) put(bx + 2 + (y > armY - 4 ? 1 : 0), y, 1);
        put(bx + 3, armY - 1, 1);
      } else if (held === 'Little One') {
        const lx = 1, ly = 16 - (bob ? 0 : 1);
        stamp(['.###.', '#####', '#o#o#', '#####', '#.#.#'], lx, ly);
      } else if (held === 'Flower') {
        stamp(['.#.', '#o#', '.#.', '.#.', '.##', '.#.', '.#.'], ix - 1, iy + 1 - (spin === 1 ? 1 : 0));
      } else if (held === 'Lollipop') {
        stamp(['.##.', '#oo#', '#o##', '.##.', '..#.', '..#.', '..#.'], ix - 2, iy + 1);
      } else if (held === 'Wand') {
        stamp(flick ? ['#.#..', '.#...', '#.#..'] : ['.#...', '###..', '.#...'], ix - 1, iy + 1);
        for (let y = iy + 4; y < armY - 1; y++) put(ix + 1, y, 1);
      } else if (held === 'Teacup') {
        put(ix + (spin & 1), armY - 6, 1); put(ix + 1 - (spin & 1), armY - 5, 1);
        stamp(['####.', '#####', '###.#', '####.', '.##..'], ix - 1, armY - 4);
      } else if (held === 'Key') {
        stamp(['.##.', '#oo#', '.##.', '..#.', '..##', '..#.', '..##'], ix - 2, iy + 1);
      } else if (held === 'Bell') {
        const sw = spin % 2;
        stamp(['..#..', '.###.', '.###.', '#####', sw ? '...#.' : '.#...'], ix - 2, armY - 6);
      } else if (held === 'Umbrella') {
        stamp(['..#####..', '.#######.', '#########', '#.o.#.o.#'], ix - 6, iy - 4);
        for (let y = iy; y < armY - 1; y++) put(ix - 2, y, 1);
        put(ix - 1, armY - 1, 1);
      } else if (held === 'Ball and Chain') {
        for (let k = 1; k < 4; k++) put(armR + (k & 1), armY + k, 1);
        stamp(['.##.', '#o##', '####', '.##.'], Math.min(20, armR - 1), Math.min(N - 4, armY + 4));
      } else if (held === 'Red Balloon') {
        // drawn as paper here; glaze() paints it the one red in the world
        const bx = ix - 1 + balTug, by = 1 + oy - balLift;
        stamp(['.###.', '#####', '#####', '#####', '.###.', '..#..'], bx, by);
        balBox = [bx, by];
        for (let y = by + 6; y < armY - 1; y++) if (y % 2 === 0) put(bx + 2 - balTug + (y > armY - 4 ? 1 : 0), y, 1);
        put(bx + 3 - balTug, armY - 1, 1);
      }
      if (form === 'Lantern') {
        // hung from a cord, its long tongue lolling out under the mouth
        const capTop = Math.ceil(hy + 2.2 - 8.8 - 0.5) + oy;
        for (let y = 0; y < capTop - 1; y++) put(12, y, 1);
        put(11, capTop - 1, 1); put(12, capTop - 1, 1);
        const M = H + 4, len = 2 + lick;
        for (let k = 0; k < len; k++) { const w = k === len - 1 ? wag : 0; put(11 + w, M + 1 + k, 4); put(12 + w, M + 1 + k, 4); }
      }
    }

    // the legendary pair: two spirits sharing one sheet, each with its own face and hat (a top hat, a little crown)
    function twin(H, top, blink, gig) {
      // the big one (centre x 7.5) has round eyes and a grin; the little one (centre x 18) dot eyes and an "oh"
      const Hs = H + 2, k = look, M = H + 4, Ms = Hs + 2;
      if (gig) {
        for (const ex of [3, 8]) { put(ex + k, H + 1, 3); put(ex + 1 + k, H, 3); put(ex + 2 + k, H, 3); put(ex + 3 + k, H + 1, 3); }
        rect(15 + k, Hs, 2, 1, 3); rect(19 + k, Hs, 2, 1, 3);
        rect(6, M - 1, 3, 2, 3); put(5, M - 2, 3); put(9, M - 2, 3);
        rect(16, Ms, 4, 2, 3); put(16, Ms + 1, 1); put(19, Ms + 1, 1);
      } else {
        if (blink) { rect(4 + k, H + 1, 2, 1, 3); rect(9 + k, H + 1, 2, 1, 3); }
        else for (const ex of [4, 9]) rect(ex + k, H - 1, 2, 3, 3);
        if (blink) { put(16 + k, Hs, 3); put(19 + k, Hs, 3); } else for (const ex of [16, 19]) rect(ex + k, Hs - 1, 1, 2, 3);
        rect(6, M - 1, 3, 1, 3); put(5, M - 2, 3); put(9, M - 2, 3);
        rect(17, Ms, 2, 2, 3);
      }
      if (cheeks !== 'None') { mark(3, H + 2); mark(12, H + 2); mark(15, Hs + 2); mark(20, Hs + 2); }
      stampInk(['.#####.', '.#####.', '.#####.', '.ooooo.', '#######'], 4, top - 3);
      stamp(['#.#.#', '#####', '#o#o#'], 16, top + 2);
    }

    const cell = Math.max(1, Math.floor(S / N)), off = Math.floor((S - cell * N) / 2);
    const ctx = c.ctx;
    ctx.imageSmoothingEnabled = false; // hard square cells
    // the companion lives in screen space, on whichever side the ghost leaves open
    const PX = pose === 'Peeking Left' ? -4 : pose === 'Peeking Right' ? 4 : 0, PY = pose === 'Sunk Low' ? 4 : 0, FLIP = pose === 'Upside Down';
    const mirror = pose === 'Peeking Left';
    const screen = new Uint8Array(N * N);
    let palBox = null;
    const ghostOnly = new Uint8Array(N * N);
    const nearGhost = (x, y) => {
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
        const X = x + b, Y = y + a;
        if (X >= 0 && Y >= 0 && X < N && Y < N && ghostOnly[Y * N + X]) return true;
      }
      return false;
    };
    function friend(rows, x0, y0) {
      let x1 = 99, y1 = 99, x2 = -99, y2 = -99;
      for (let r = 0; r < rows.length; r++) for (let q = 0; q < rows[r].length; q++) {
        const ch = rows[r][q];
        if (ch === '.') continue;
        const gx = mirror ? N - 1 - (x0 + q) : x0 + q, gy = y0 + r;
        if (gx < 0 || gy < 0 || gx >= N || gy >= N || screen[gy * N + gx] || nearGhost(gx, gy)) continue;
        screen[gy * N + gx] = ch === '#' ? 1 : 2;
        x1 = Math.min(x1, gx); x2 = Math.max(x2, gx); y1 = Math.min(y1, gy); y2 = Math.max(y2, gy);
      }
      if (x2 >= x1) palBox = palBox ? [Math.min(palBox[0], x1), Math.min(palBox[1], y1), Math.max(palBox[2], x2), Math.max(palBox[3], y2)] : [x1, y1, x2, y2];
    }
    function compose(spin, flick, t, stir) {
      for (let i = 0; i < N * N; i++) {
        const x = i % N, y = Math.floor(i / N);
        const sx = x - PX - wob, sy = FLIP ? N - 1 - y : y - PY;
        screen[y * N + x] = sx >= 0 && sy >= 0 && sx < N && sy < N ? grid[sy * N + sx] : 0;
      }
      palBox = null;
      ghostOnly.set(screen);
      if (pal === 'None') return;
      const s = stir ? 1 : 0;
      if (pal === 'Bat') {
        const up = (spin + s) % 2 === 0, by = 2 + (spin === 1 ? 1 : 0) - s * 2;
        friend(up ? ['#.......#', '##.#.#.##', '.#######.', '...###...', '....#....'] : ['...#.#...', '..#####..', '.#######.', '##.....##', '#.......#'], 0, by);
      } else if (pal === 'Spider') {
        const len = stir ? 1 : 4 + Math.round(Math.sin(t * 0.7) * 1.6);
        for (let y = 0; y < len; y++) friend(['#'], 3, y);
        friend(spin % 2 ? ['#...#', '.###.', '#.#.#'] : ['.#.#.', '#####', '#.#.#'], 1, len);
      } else if (pal === 'Cat') {
        const tail = (spin >> 1) + s;
        friend(['#...#', '##.##', '#####', flick && !stir ? '#####' : '#o#o#', '#####', '.####', '.#####' + (tail % 2 ? '#' : '.'), tail % 2 ? '.......' : '......#'], 0, N - 8 - s);
      } else if (pal === 'Crow') {
        friend(['...##.', '..#o' + (stir ? '###' : '##'), '.####.', '#####.', '.#.#..'], 0, N - 5 - s);
      } else if (pal === "Jack-o'-Lantern") {
        friend(['...#..', '.####.', '#o##o#', stir ? '#oooo#' : '##oo##', '.####.'], 0, N - 5);
      } else if (pal === 'Mouse') {
        friend(['#.#...', '###...', '#o###.', '.#####', stir ? '.....#' : '......#'], 0, N - 5 - s);
      } else if (pal === "Will-o'-Wisp") {
        const f = (spin + s * 2) % 2;
        friend(stir ? ['.#.', '###', '###', '#o#', '###', '.#.'] : f ? ['.#.', '##.', '###', '#o#', '.#.'] : ['.#.', '.##', '###', '#o#', '.#.'], 2, 2 + (spin === 2 ? 1 : 0) - s);
      }
    }
    // the viewer's stars (taps on the night) and how far the ghost has faded (holding down)
    const lit = [];
    const G = (x, y) => x >= 0 && y >= 0 && x < N && y < N ? screen[y * N + x] : 0;
    let young = 0; // stars still sparkling (a plus) before they settle into a dot
    const litAt = (x, y) => {
      for (let i = 0; i < lit.length; i++) {
        const s = lit[i], d = Math.abs(s[0] - x) + Math.abs(s[1] - y);
        if (d === 0 || (d === 1 && i >= lit.length - young)) return true;
      }
      return false;
    };
    function paint(tw, fade) {
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, S, S);
      ctx.fillStyle = PAPER;
      const span = Math.ceil(off / cell) + 1;
      for (let y = -span; y < N + span; y++) for (let x = -span; x < N + span; x++) {
        const inGrid = x >= 0 && y >= 0 && x < N && y < N;
        let v = 0;
        if (inGrid) {
          v = G(x, y);
          // a faint spirit: the sheet is a see-through half-tone, only its face still glows
          if (faint2 && v) {
            const inner = G(x - 1, y) && G(x + 1, y) && G(x, y - 1) && G(x, y + 1);
            const byFace = G(x - 1, y) === 3 || G(x + 1, y) === 3 || G(x, y - 1) === 3 || G(x, y + 1) === 3;
            if (v === 3) v = 1;
            else if (v === 1 && inner && (byFace || (x & 1) || (y & 1))) v = 2;
          }
          // fading: the sheet dissolves into the night in an ordered dither
          if (v !== 0 && fade > 0 && bayer[(y % 4) * 4 + (x % 4)] < fade * 16) v = 0;
          vis[y * N + x] = v;
          if (v === 0 && fade > 0 && G(x, y) !== 0) { if (nightAt(x, y, tw) || litAt(x, y)) v = 1; }
          else if (v === 0) {
            // keep an ink gap around the character so the night never touches it
            let near = false;
            for (let a = -1; a <= 1 && !near; a++) for (let b = -1; b <= 1; b++) {
              const gx = x + b, gy = y + a;
              if (gx >= 0 && gy >= 0 && gx < N && gy < N && G(gx, gy) !== 0) { near = true; break; }
            }
            if (!near && (nightAt(x, y, tw) || (lit.length && litAt(x, y)))) v = 1;
            vis[y * N + x] = G(x, y) ? 0 : v;
          }
        } else if (nightAt(x, y, tw) || (lit.length && litAt(x, y))) v = 1;
        if (v === 1) ctx.fillRect(off + x * cell, off + y * cell, cell, cell);
      }
    }

    // ---------- colour, only for the legendaries and the red balloon, laid cell by cell over the two inks ----------
    const vis = new Uint8Array(N * N);
    let bobNow = 0, wob = 0, hoverPane = -1, ripple = null, flare = 0, flick2 = 0, core = 0, glintStep = 0;
    const toGrid = (x, y) => [x - PX - wob, FLIP ? N - 1 - y : y - PY];
    // six jewels, each a hard three-step ramp: shadow, body, the light coming through
    const JEWEL = [['#4a0a1e', '#c41f3c', '#ff8f8a'], ['#0b2260', '#2a62dc', '#94ccff'], ['#08402a', '#1f9e55', '#a4eea0'],
      ['#5e3204', '#e89a18', '#ffe39a'], ['#300c58', '#8236d4', '#dcb0ff'], ['#06424a', '#17aaa4', '#a2fff0'], ['#9a8a6a', '#efe4c8', '#fffbee']];
    const PM = new Int8Array(N * (N + 8)), tint = [], seeds = [];
    if (legend === 'Stained Glass') {
      // a window's design cut into the sheet: a pale face roundel, rays of two jewels around it like a
      // rose window, and tall lancets of three jewels down the body (anything above the head is gold)
      const a = Math.floor(pane[0][0] * 6), b = (a + 1 + Math.floor(pane[0][1] * 5)) % 6, d3 = [0, 1, 2, 3, 4, 5].filter(k => k !== a && k !== b);
      const third = d3[Math.floor(pane[1][0] * 4)], shift = Math.floor(pane[1][1] * 3);
      const sums = [];
      for (let y = -4; y < N + 4; y++) for (let x = 0; x < N; x++) {
        const dx = x + 0.5 - 12, dy = y + 0.5 - hy;
        let p;
        if ((dx / 5.4) ** 2 + (dy / 4.4) ** 2 <= 1) p = 0;
        else if (dy < -ry - 0.5) p = 1;
        else if (dy <= 2.5) p = 2 + Math.floor((Math.atan2(dy, dx) + Math.PI) / (2 * Math.PI) * 10) % 10;
        else p = 12 + Math.floor((x + shift) / 4) + 9 * Math.floor((dy - 2.5) / 5);
        PM[(y + 4) * N + x] = p;
        if (!sums[p]) sums[p] = [0, 0, 0];
        sums[p][0] += x + 0.5; sums[p][1] += y + 0.5; sums[p][2]++;
      }
      sums.forEach((s, p) => {
        if (!s) return;
        seeds[p] = [s[0] / s[2], s[1] / s[2]];
        const col = (p - 12) % 9, row = Math.floor((p - 12) / 9);
        tint[p] = p === 0 ? 6 : p === 1 ? 3 : p < 12 ? (p % 2 ? a : b) : [a, b, third][(col + row) % 3];
      });
    }
    const paneOf = (x, y) => {
      const [gx, gy0] = toGrid(x, y), gy = gy0 - bobNow;
      return gx < 0 || gx >= N || gy < -4 || gy >= N + 4 ? -1 : PM[(gy + 4) * N + gx];
    };
    const BAL = ['.###.', '#####', '#####', '#####', '.###.', '..#..'];
    const LIT = ['#5a1e10', '#a8401a', '#e2702a', '#ffaa44', '#ffd884', '#fff4cc'];
    function glaze(t) {
      if (legend === 'None' && !redBalloon) return;
      const fill = (x, y, col) => { ctx.fillStyle = col; ctx.fillRect(off + x * cell, off + y * cell, cell, cell); };
      const dith = (x, y) => (bayer[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
      if (redBalloon && balBox) for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        if (ghostOnly[y * N + x] !== 1 || !vis[y * N + x]) continue;
        const [gx, gy] = toGrid(x, y), lx = gx - balBox[0], ly = gy - balBox[1];
        if (lx < 0 || lx > 4 || ly < 0 || ly > 5 || BAL[ly][lx] !== '#') continue;
        fill(x, y, ly === 5 || lx === 4 || ly === 4 || (lx === 3 && ly === 3) ? '#8e1026' : (lx === 1 && ly < 3 && ly > 0) || (lx === 2 && ly === 1) ? '#ff9c9c' : '#e3263c');
      }
      if (legend === 'Stained Glass') {
        const P = new Int8Array(N * N).fill(-1), cells = [];
        for (let i = 0; i < N * N; i++) if (ghostOnly[i] === 1 && screen[i] === 1 && vis[i]) { P[i] = paneOf(i % N, Math.floor(i / N)); cells.push(i); }
        const glass = (x, y) => x >= 0 && y >= 0 && x < N && y < N && P[y * N + x] >= 0;
        // cames only where they read at this size: round the face roundel and between the lancets' columns
        const cut = (p, q) => p !== q && ((p === 0) !== (q === 0) || (p >= 12 && q >= 12 && (p - 12) % 9 !== (q - 12) % 9));
        const lead = (x, y) => glass(x, y) && ((glass(x + 1, y) && cut(P[y * N + x], P[y * N + x + 1])) || (glass(x, y + 1) && cut(P[y * N + x], P[(y + 1) * N + x])));
        const same = (x, y, p) => glass(x, y) && P[y * N + x] === p && !lead(x, y);
        const glint = cells.length ? cells[(glintStep * 7919) % cells.length] : -1;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { // cell by cell
          const i = y * N + x, g = ghostOnly[i];
          if (g && vis[i]) {
            // the face is leaded in near-black, inked hats and prints are smoky glass, the cames between panes grey
            if (g === 3) { fill(x, y, '#141018'); continue; }
            if (g === 2) { const q = paneOf(x, y); fill(x, y, q >= 0 ? JEWEL[tint[q]][0] : '#3b344a'); continue; }
            if (P[i] < 0 || lead(x, y)) { fill(x, y, '#3d364c'); continue; }
            const p = P[i], J = JEWEL[tint[p]];
            let s = !same(x, y - 1, p) ? 2 : !same(x, y + 1, p) ? 0 : 1;
            if (p === hoverPane && s < 2) s = (x + y) % 3 ? 2 : 1;
            if (ripple) { const u = t - ripple[2] - Math.hypot(seeds[p][0] - ripple[0], seeds[p][1] - ripple[1]) * 0.06; if (u > 0 && u < 0.3) s = 2; }
            fill(x, y, i === glint ? '#ffffff' : J[s]);
          } else if (!g && !screen[i] && !vis[i]) {
            // the halo: each pane's colour spilling a dither onto the dark beside it
            for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (glass(x + a, y + b)) {
              const p = P[(y + b) * N + x + a];
              if ((x + y) % 2 === 0 || p === hoverPane) fill(x, y, JEWEL[tint[p]][p === hoverPane ? 1 : 0]);
              break;
            }
          }
        }
      }
      if (legend === 'Paper Lantern') {
        const cxs = 12 + PX + wob, cys = hy + 2.2 + bobNow + PY;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { // cell by cell
          const i = y * N + x, g = ghostOnly[i];
          if (g && vis[i]) {
            const [gx, gy0] = toGrid(x, y), gy = gy0 - bobNow, py = gy + 0.5, w = lanternW(py), px = gx + 0.5 - 12;
            if (g === 3) { fill(x, y, '#3e0e08'); continue; }
            if (g === 4) { fill(x, y, gx === 11 + (gy > hy + 5 + lick ? wag : 0) ? '#ff8a96' : '#d82c44'); continue; }
            if (w < 0 || Math.abs(px) > w) { fill(x, y, '#a07858'); continue; }
            const ky = (py - hy - 2.2) / 8.8;
            if (Math.abs(ky) > 0.86) {
              // lacquered caps with a gold rim where they meet the paper
              const rim = lanternW(py + (ky < 0 ? 1 : -1)) > 4;
              fill(x, y, rim ? (gx % 2 ? '#e8b048' : '#a87020') : px < -1.5 ? '#4e3438' : '#26161c');
              continue;
            }
            if (g === 2) { fill(x, y, '#8a3416'); continue; }
            const r = (px - core) / w;
            let v = (1 - r * r * 0.95 - ky * ky * 0.6) * 5.2 + flare * 1.3 + flick2 * 0.5;
            if (((gy - Math.round(hy + 2)) % 3 + 3) % 3 === 0) v -= 1.8;
            const lv = Math.floor(v) + (v - Math.floor(v) > dith(x, y) ? 1 : 0);
            fill(x, y, LIT[Math.max(0, Math.min(5, lv))]);
          } else if (!g && !screen[i]) {
            // warm light thrown on the dark around it, stepping down in an ordered dither
            const d = Math.hypot(x + 0.5 - cxs, (y + 0.5 - cys) * 0.8), gl = 1 - (d - 6.5) / (5.5 + flare * 4 + flick2 * 0.6);
            const th = dith(x, y);
            if (gl > th) fill(x, y, vis[i] ? '#f0b080' : gl > th + 0.55 ? '#62301a' : '#3a1910');
          }
        }
      }
    }

    // sound: a minor pentatonic rooted from the end of the hash (its own draw, apart from the look)
    const root = 55 + parseInt(c.hash.slice(-2), 16) % 8, PENTA = [0, 3, 5, 7, 10];
    const pitch = k => root + 12 * Math.floor(k / 5) + PENTA[((k % 5) + 5) % 5];
    let booUntil = -1, stirUntil = -1, fade = 0, holding = false, lastT = 0, liftUntil = -1, lickUntil = -1;
    // each companion has its own little voice
    function chirp() {
      const v = {
        Bat: [[14, 0.05, 'sine'], [16, 0.05, 'sine'], [14, 0.05, 'sine']], Spider: [[9, 0.12, 'sine'], [7, 0.12, 'sine'], [5, 0.3, 'sine']],
        Cat: [[8, 0.12, 'triangle'], [10, 0.32, 'triangle']], Crow: [[3, 0.09, 'square'], [3, 0.12, 'square']], "Jack-o'-Lantern": [[2, 0.2, 'triangle'], [0, 0.5, 'triangle']],
        Mouse: [[17, 0.04, 'sine'], [18, 0.05, 'sine']], "Will-o'-Wisp": [[10, 0.4, 'sine'], [12, 0.4, 'sine'], [15, 0.7, 'sine']],
      }[pal];
      v.forEach(([k, d, w], i) => c.sound.note(pitch(k), { dur: d + 0.05, vel: w === 'square' ? 0.12 : 0.2, wave: w, cutoff: w === 'square' ? 900 : 3000, at: i * (d + 0.03), pan: mirror ? 0.5 : -0.5 }));
    }
    function feel(t) {
      const inp = c.input, dt = Math.max(0, Math.min(0.1, t - lastT));
      lastT = t;
      // hovering: the glass pane under the pointer lights up and rings, the lantern flares,
      // the pair look over, the red balloon tugs towards the pointer
      const hx = Math.floor((inp.x * S - off) / cell), hy2 = Math.floor((inp.y * S - off) / cell);
      if (legend === 'Stained Glass') {
        const ok = inp.inside && hx >= 0 && hy2 >= 0 && hx < N && hy2 < N && ghostOnly[hy2 * N + hx] === 1 && fade < 0.5;
        const p = ok ? paneOf(hx, hy2) : -1;
        if (p >= 0 && p !== hoverPane) c.sound.note(pitch(10 + tint[p]), { dur: 1.4, vel: 0.07, wave: 'sine', pan: inp.x - 0.5 });
        hoverPane = p;
      } else if (legend === 'Paper Lantern') {
        const want = inp.inside && Math.hypot(hx + 0.5 - 12 - PX, (hy2 + 0.5 - hy - 2.2 - PY) * 0.8) < 10 ? 1 : 0;
        if (want && flare < 0.05) c.sound.note(pitch(0) - 12, { dur: 1.3, vel: 0.11, wave: 'sine', attack: 0.3 });
        flare += (want - flare) * Math.min(1, dt * 3);
        if (flare < 0.01) flare = 0;
      } else if (legend === 'Two Under One') {
        const was = look;
        look = inp.inside ? (inp.x < 0.38 ? -1 : inp.x > 0.62 ? 1 : 0) : 0;
        if (look !== was) c.sound.note(pitch(look < 0 ? 7 : look > 0 ? 9 : 8), { dur: 0.09, vel: 0.08, wave: 'triangle', pan: look * 0.5 });
      }
      if (redBalloon && balBox) {
        const mid = balBox[0] - balTug + 2 + PX;
        balTug = inp.inside && Math.abs(hx - mid) < 6 && Math.abs(hx - mid) > 0 ? Math.sign(hx - mid) : 0;
      }
      for (const p of inp.taps()) {
        const gx = Math.floor((p.x * S - off) / cell), gy = Math.floor((p.y * S - off) / cell);
        if (redBalloon && balBox) {
          const bx0 = balBox[0] + PX + wob, by0 = FLIP ? N - 6 - balBox[1] : balBox[1] + PY;
          if (gx >= bx0 - 1 && gx <= bx0 + 5 && gy >= by0 - 1 && gy <= by0 + 6) {
            // a rubbery squeak as it bobs up on its string
            if (t > liftUntil - 0.4) [15, 17, 16].forEach((k, i) => c.sound.note(pitch(k), { dur: 0.07, vel: 0.12, wave: 'sine', at: i * 0.06 }));
            liftUntil = t + 0.9;
            continue;
          }
        }
        const onPal = palBox && gx >= palBox[0] - 1 && gx <= palBox[2] + 1 && gy >= palBox[1] - 1 && gy <= palBox[3] + 1;
        const onGhost = !onPal && gx >= 0 && gy >= 0 && gx < N && gy < N && G(gx, gy) !== 0 && fade < 0.5;
        if (onPal) {
          if (t > stirUntil - 0.5) chirp();
          stirUntil = t + 0.9;
        } else if (onGhost && legend === 'Stained Glass') {
          // a ripple of light runs out through the panes from the tap, each pane ringing as it lights
          booUntil = t + 0.7;
          const [a, b] = toGrid(gx, gy);
          ripple = [a + 0.5, b - bobNow + 0.5, t];
          seeds.forEach((s, i) => i < 12 && i % 2 === 0 && c.sound.note(pitch(10 + tint[i]) + (i % 3 === 1 ? 5 : 0), { dur: 1.6, vel: 0.07, wave: 'sine', at: Math.hypot(s[0] - ripple[0], s[1] - ripple[1]) * 0.06, pan: s[0] / N - 0.5 }));
        } else if (onGhost && legend === 'Two Under One') {
          // the pair dissolve into giggles, one voice each side
          booUntil = t + 0.9;
          for (let k = 0; k < 6; k++) c.sound.note(pitch(k % 2 ? 9 + (k >> 1) : 7 + (k >> 1)), { dur: 0.1, vel: 0.16, wave: 'triangle', cutoff: 1800, at: k * 0.11, pan: k % 2 ? 0.6 : -0.6 });
        } else if (onGhost && legend === 'Paper Lantern') {
          // the lantern licks its lips: the tongue rolls out and wags, over a low wooden bell
          booUntil = t + 0.7; lickUntil = t + 1.4;
          c.sound.note(pitch(0) - 12, { dur: 1.6, vel: 0.22, wave: 'triangle', cutoff: 700 });
          c.sound.note(pitch(2) - 12, { dur: 1.2, vel: 0.1, wave: 'sine', at: 0.02 });
          c.sound.hit('blip', 0.16, { freq: 260, at: 0.25 });
        } else if (onGhost) {
          booUntil = t + 0.7;
          c.sound.note(pitch(7), { dur: 0.22, vel: 0.3, wave: 'triangle', cutoff: 1400 });
          c.sound.note(pitch(6), { dur: 0.22, vel: 0.28, wave: 'triangle', cutoff: 1200, at: 0.14 });
          c.sound.note(pitch(5), { dur: 0.7, vel: 0.26, wave: 'triangle', cutoff: 900, at: 0.28 });
        } else if (gx >= -2 && gy >= -2 && gx < N + 2 && gy < N + 2) {
          if (lit.length >= 14) lit.shift();
          lit.push([gx, gy, t]);
          c.sound.note(pitch(12 - Math.round(gy / 3)), { dur: 0.9, vel: 0.18, wave: 'sine', pan: p.x * 1.6 - 0.8 });
        }
      }
      const hold = inp.inside && inp.down;
      if (hold && !holding) c.sound.note(pitch(10), { dur: 1.1, vel: 0.12, wave: 'sine', attack: 0.25 });
      if (!hold && holding && fade > 0.3) c.sound.note(pitch(5), { dur: 0.5, vel: 0.14, wave: 'sine', attack: 0.06 });
      holding = hold;
      // it never quite leaves: a see-through remnant stays at the deepest fade
      fade = hold ? Math.min(0.8, fade + dt * 1.2) : Math.max(0, fade - dt * 2.2);
      young = 0;
      for (let i = lit.length - 1; i >= 0 && t - lit[i][2] < 1.2; i--) young++;
    }

    let last = '';
    function show(t) {
      const bob = Math.floor((t * 0.7 + bobPhase) % 2) === 1 ? 1 : 0;
      const blink = ((t + blinkPhase) % blinkEvery) < 0.16 ? 1 : 0;
      const flick = Math.floor(t * 5 + blinkPhase * 3) % 3 === 0 ? 1 : 0;
      const spin = Math.floor(t * 6) % 4;
      const tw = Math.floor(t * 1.5);
      const slow = pal === 'Spider' ? Math.round(Math.sin(t * 0.7) * 1.6) : 0;
      const boo = t < booUntil ? 1 : 0, fl = Math.round(fade * 16), stir = t < stirUntil ? 1 : 0;
      // the legendaries' own motion
      let extra = '';
      if (legend === 'Two Under One') { wob = boo ? Math.floor(t * 10) % 2 : 0; extra = look + ':' + wob; }
      if (legend === 'Stained Glass') {
        if (ripple && t - ripple[2] > 2) ripple = null;
        glintStep = Math.floor(t * 3);
        extra = hoverPane + ':' + glintStep + ':' + (ripple ? Math.floor(t * 20) : '');
      }
      if (legend === 'Paper Lantern') {
        const st = Math.floor(t * 7);
        flick2 = [0, 0.6, 0.2, 1, 0.4, 0.8, 0.1, 0.5, 0.3][(st * 5) % 9];
        core = (flick2 - 0.5) * 0.9;
        lick = t < lickUntil ? 2 + Math.floor(t * 6) % 2 : 0;
        wag = t < lickUntil ? Math.round(Math.sin(t * 11)) : Math.round(Math.sin(t * 1.3) * 0.7);
        extra = st + ':' + Math.round(flare * 8) + ':' + lick + ':' + wag;
      }
      if (redBalloon) { balLift = t < liftUntil ? (t > liftUntil - 0.55 ? 2 : 1) : 0; extra += ':' + balTug + ':' + balLift; }
      const key = bob + ':' + blink + ':' + flick + ':' + spin + ':' + tw + ':' + slow + ':' + stir + ':' + extra + (boo || fl || lit.length ? ':' + boo + ':' + fl + ':' + lit.length + ':' + young : '');
      if (key === last) return;
      last = key;
      bobNow = boo ? 0 : bob;
      build(bobNow, blink, flick, spin, boo);
      compose(spin, flick, t, stir);
      paint(tw, fl / 16);
      glaze(t);
    }
    show(0);
    return t => { feel(t); show(t); };
  },
});

})(window.Proto);
