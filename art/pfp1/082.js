// Skipping Stones: from D:/code/synaesthesia/public/drop03/pieces/082.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// 082 Skipping Stones: beach pebbles with faces, printed like a two-drum risograph.
Proto.add({
  num: 82,
  name: 'Skipping Stones',
  fam: 'Things with Faces',
  recipe: 'Beach pebbles with faces, printed in two spot inks on coloured stock with grain, halftone shading and a little misregistration. The stone, its markings, the inks, the face and whoever is riding along vary; a message in a bottle is coveted, and once in a long while the stone is a cracked-open geode or a sea turtle egg.',
  interactive: 'Tap anywhere to skip a pebble. Tap the stone to make it blink.',
  music: true,
  fps: 24,
  seed: 14,
  make(c) {
    const S = c.size, u = S / 1000;
    // sfc32 from four words of the hash
    const w = i => parseInt(c.hash.slice(2 + i * 8, 10 + i * 8), 16) >>> 0;
    let a = w(0) ^ w(4), b = w(1) ^ w(5), d = w(2) ^ w(6), e = w(3) ^ w(7) | 1;
    const R = () => {
      a >>>= 0; b >>>= 0; d >>>= 0; e >>>= 0;
      const t = (a + b | 0) + e | 0;
      e = e + 1 | 0;
      a = b ^ b >>> 9;
      b = d + (d << 3) | 0;
      d = (d << 21 | d >>> 11);
      d = d + t | 0;
      return (t >>> 0) / 4294967296;
    };
    for (let i = 0; i < 12; i++) R();
    const lot = list => {
      let s = 0; list.forEach(x => s += x.w);
      let r = R() * s;
      for (const x of list) if ((r -= x.w) < 0) return x;
      return list[0];
    };

    let paper = lot([
      { n: 'Cream', w: 30, c: '#f5eddc' }, { n: 'Bright White', w: 22, c: '#fbfaf4' }, { n: 'Shell Pink', w: 18, c: '#fbe0dc' },
      { n: 'Sky Stock', w: 18, c: '#dcebf2' }, { n: 'Kraft', w: 8, c: '#d9bd93' }, { n: 'Butter Stock', w: 4, c: '#fbeeb0' },
    ]);
    let inks = lot([
      { n: 'Pink & Teal', w: 20, A: '#ff4fae', B: '#00808a' }, { n: 'Sunflower & Blue', w: 20, A: '#ffcf33', B: '#1666b5' },
      { n: 'Orange & Navy', w: 17, A: '#ff7a3d', B: '#33457e' }, { n: 'Mint & Violet', w: 16, A: '#7fd6c9', B: '#6c4da3' },
      { n: 'Lemon & Scarlet', w: 15, A: '#ffe62e', B: '#e8414f' }, { n: 'Coral & Green', w: 9, A: '#ff8f84', B: '#1f7a4d' },
      { n: 'Gold & Midnight', w: 3, A: '#e5b544', B: '#1d1d3f' },
    ]);
    let stone = lot([
      { n: 'Round', w: 28, ax: 1.0, ay: 0.9, wob: 0.035 }, { n: 'Egg', w: 22, ax: 0.88, ay: 1.0, wob: 0.03 },
      { n: 'Long', w: 20, ax: 1.18, ay: 0.78, wob: 0.04 }, { n: 'Skipper', w: 16, ax: 1.26, ay: 0.64, wob: 0.03 },
      { n: 'Lumpy', w: 10, ax: 1.04, ay: 0.88, wob: 0.08 }, { n: 'Heart', w: 4, ax: 1, ay: 0.95, wob: 0.01 },
    ]);
    let mark = lot([{ n: 'Plain', w: 30 }, { n: 'Speckled', w: 24 }, { n: 'Quartz Band', w: 20 }, { n: 'Veined', w: 16 }, { n: 'Ammonite', w: 5 }, { n: 'Holey', w: 5 }]);
    let eyes = lot([{ n: 'Beady', w: 26 }, { n: 'Big Shiny', w: 22 }, { n: 'Content', w: 18 }, { n: 'Side-Eye', w: 14 }, { n: 'Droopy', w: 12 }, { n: 'Starry', w: 4 }, { n: 'Cyclops', w: 4 }]);
    let mouth = lot([{ n: 'Smile', w: 26 }, { n: 'Open', w: 18 }, { n: 'Pout', w: 14 }, { n: 'Cat', w: 14 }, { n: 'Gap Tooth', w: 12 }, { n: 'Flat', w: 10 }, { n: 'Whistle', w: 6 }]);
    let rider = lot([
      { n: 'None', w: 28 }, { n: 'Moss Tuft', w: 16 }, { n: 'Little Pebble', w: 14 }, { n: 'Snail', w: 12 }, { n: 'Ladybird', w: 12 },
      { n: 'Seaweed', w: 10 }, { n: 'Starfish', w: 5 }, { n: 'Hermit Crab', w: 3 },
    ]);
    let scene = lot([{ n: 'Sun Disc', w: 30 }, { n: 'Waves', w: 24 }, { n: 'Stripes', w: 18 }, { n: 'Polka', w: 16 }, { n: 'Moon', w: 8 }, { n: 'Rainbow', w: 4 }]);
    // ---------- added since: a second stream (a Wang-style integer hash on a counter), so the
    // stones that were already there keep their looks unless a new value is swapped in ----------
    let tide = (parseInt(c.hash.slice(20, 28), 16) ^ parseInt(c.hash.slice(44, 52), 16) ^ 0x68e31da4) >>> 0;
    const W2 = () => {
      tide = (tide + 0x6d2b79f5) >>> 0;
      let x = (tide ^ 61) ^ (tide >>> 16);
      x = (x + (x << 3)) >>> 0; x ^= x >>> 4; x = Math.imul(x, 0x27d4eb2d); x ^= x >>> 15;
      return (x >>> 0) * 2.3283064365386963e-10; // tide's next roll
    };
    const lot2 = list => { let tot = 0; for (const x of list) tot += x.w; let r2 = W2() * tot; for (const x of list) if ((r2 -= x.w) < 0) return x; return list[0]; };
    const swapIn = (chance, list, keep) => { const roll = W2(), alt = lot2(list); return roll < chance ? alt : keep; };
    paper = swapIn(0.22, [{ n: 'Newsprint', w: 10, c: '#e4e2dc' }, { n: 'Mint Stock', w: 8, c: '#d8efe4' }, { n: 'Lilac Stock', w: 7, c: '#e6def2' }], paper);
    inks = swapIn(0.35, [{ n: 'Teal & Orange', w: 10, A: '#ff8a3d', B: '#0f7a80' }, { n: 'Yellow & Purple', w: 10, A: '#ffd23a', B: '#5a3a9a' }, { n: 'Sky & Red', w: 9, A: '#7cc6f0', B: '#d8343e' }, { n: 'Fluoro Pink & Black', w: 2.5, A: '#ff3ea5', B: '#1a1a1a' }], inks);
    stone = swapIn(0.25, [{ n: 'Flat', w: 10, ax: 1.3, ay: 0.56, wob: 0.025 }, { n: 'Bean', w: 9, ax: 1.12, ay: 0.82, wob: 0.03 }, { n: 'Triangle', w: 7, ax: 1.02, ay: 0.92, wob: 0.02 }], stone);
    mark = swapIn(0.3, [{ n: 'Lichen', w: 10 }, { n: 'Banded', w: 10 }, { n: 'Fossil Shell', w: 4 }], mark);
    eyes = swapIn(0.25, [{ n: 'Wide Awake', w: 10 }, { n: 'Teary', w: 6 }, { n: 'Lashes', w: 8 }], eyes);
    mouth = swapIn(0.25, [{ n: 'Tongue', w: 10 }, { n: 'Grin', w: 9 }, { n: 'Zigzag', w: 6 }], mouth);
    rider = swapIn(0.3, [{ n: 'Flower', w: 10 }, { n: 'Sun Hat', w: 9 }, { n: 'Bee', w: 8 }], rider);
    scene = swapIn(0.3, [{ n: 'Gingham', w: 10 }, { n: 'Ripples', w: 10 }, { n: 'Big Dots', w: 8 }], scene);
    let setting = lot2([{ n: 'Solo', w: 55 }, { n: 'Cairn', w: 18 }, { n: 'Pair', w: 15 }, { n: 'Wading', w: 12 }]).n;
    const brows = eyes.n === 'Side-Eye' ? (W2(), 'None') : lot2([{ n: 'None', w: 50 }, { n: 'Worried', w: 15 }, { n: 'Cheeky', w: 15 }, { n: 'Heavy', w: 20 }]).n;
    let sky = lot2([{ n: 'None', w: 50 }, { n: 'Gulls', w: 16 }, { n: 'Clouds', w: 16 }, { n: 'Sparkles', w: 12 }, { n: 'Rain', w: 6 }]).n;
    const glanceX = (W2() - 0.5) * 0.5;
    // legendaries and the coveted bottle roll from their own Park-Miller stream on another slice of
    // the hash, after every other draw, so ordinary stones (and the opening one) keep their looks
    let pmk = parseInt(c.hash.slice(50, 58), 16) % 2147483646 + 1;
    const pmR = () => (pmk = pmk * 16807 % 2147483647) / 2147483647;
    for (let i = 0; i < 3; i++) pmR();
    const lroll = pmR(), groll = pmR();
    const legend = lroll < 0.0011 ? 'Geode' : lroll < 0.002 ? 'Turtle Egg' : '';
    if (!legend && groll < 0.005) rider = { n: 'Message in a Bottle' };
    if (legend === 'Geode') { mark = { n: 'Agate Bands' }; rider = { n: 'None' }; if (setting === 'Pair' || setting === 'Cairn') setting = 'Solo'; }
    if (legend === 'Turtle Egg') { stone = { n: 'Turtle Egg', ax: 0.9, ay: 0.96, wob: 0.012 }; mark = { n: 'Leathery' }; rider = { n: 'None' }; scene = { n: 'Moon' }; if (sky === 'None') sky = 'Sparkles'; setting = 'Solo'; eyes = { n: 'Hatchling' }; mouth = { n: 'Hatchling' }; }
    const egg = legend === 'Turtle Egg';
    if (legend) c.trait('Legendary', legend);
    for (const [label, val] of [['Paper', paper.n], ['Inks', inks.n], ['Stone', stone.n], ['Markings', mark.n], ['Eyes', eyes.n], ['Brows', egg ? 'None' : brows], ['Mouth', mouth.n],
      ['Riding Along', rider.n], ['Print', scene.n], ['Sky', sky], ['Setting', setting]]) c.trait(label, val);

    const harm = [];
    for (let i = 0; i < 5; i++) harm.push([R() * 6.283, R()]);
    const tilt = (R() - 0.5) * 0.18;
    const offA = [(R() - 0.5) * 10, (R() - 0.5) * 10], offB = [(R() - 0.5) * 6, (R() - 0.5) * 6];
    const dots = [];
    for (let i = 0; i < 70; i++) dots.push([R(), R(), R()]);
    const blinkOff = R() * 3;
    const flip = R() < 0.5 ? -1 : 1;
    const grainSeed = (w(3) ^ 0x5bd1e995) >>> 0;

    // ---------- the stone outline ----------
    // the geode is split in two: the stone with its face on one side, the cut half lying open beside it
    const geode = legend === 'Geode', HRX = 218, HRY = 190;
    const shrink = geode ? 0.66 : setting === 'Pair' ? 0.8 : setting === 'Cairn' ? 0.86 : 1;
    const cx = geode ? 500 - flip * (12 + HRX) : setting === 'Pair' ? 500 - flip * 95 : 500, cy = geode ? 610 : setting === 'Cairn' ? 515 : setting === 'Wading' ? 600 : 590;
    const RX = 285 * stone.ax * shrink, RY = 285 * stone.ay * shrink;
    const pts = [];
    for (let i = 0; i < 160; i++) {
      const th = i / 160 * Math.PI * 2;
      let r = 1;
      for (let h = 0; h < 5; h++) r += Math.sin(th * (h + 2) + harm[h][0]) * stone.wob * harm[h][1] / (1 + h * 0.4);
      let x, y;
      if (stone.n === 'Heart') {
        const t = th;
        x = 16 * Math.pow(Math.sin(t), 3) / 16;
        y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
        x *= 1.05; y = y * 1.05 + 0.06;
      } else {
        x = Math.cos(th); y = Math.sin(th);
        // flatter bottom, like it is resting
        if (y > 0) y *= 0.86;
        if (stone.n === 'Egg' && y < 0) x *= 1 + y * 0.18;
        if (stone.n === 'Turtle Egg' && y < 0) x *= 1 + y * 0.06;
        if (stone.n === 'Bean' && y < 0) y *= 1 - 0.3 * Math.exp(-(x - 0.1 * flip) * (x - 0.1 * flip) / 0.06);
        if (stone.n === 'Triangle') r *= 1 + 0.11 * Math.sin(3 * th);
      }
      const ca = Math.cos(tilt), sa = Math.sin(tilt);
      const px = x * RX * r, py = y * RY * r;
      pts.push([cx + px * ca - py * sa, cy + px * sa + py * ca]);
    }
    const topY = Math.min(...pts.map(p => p[1]));
    const hcx = cx + flip * (RX + 24 + HRX), hcy = cy + 20, hpts = [];
    for (let i = 0; i < 160; i++) { const th = i / 160 * Math.PI * 2, r = 1 + 0.04 * Math.sin(th * 3 + harm[0][0]) + 0.025 * Math.sin(th * 5 + harm[1][0]); hpts.push([hcx + Math.cos(th) * HRX * r, hcy + Math.sin(th) * HRY * r * (Math.sin(th) > 0 ? 0.92 : 1)]); }
    const stoneBox = [Math.min(...pts.map(p => p[0])), topY, Math.max(...pts.map(p => p[0])), Math.max(...pts.map(p => p[1]))];
    // the turtle egg's hole: a jagged break across the top of the shell
    const holeX = cx + flip * RX * 0.06, holeY = topY + RY * 0.34, holeRX = RX * 0.6, holeRY = RY * 0.36;
    const holePath = g => { g.beginPath(); for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2, r = i % 2 ? 0.78 : 1 + (i % 4 ? 0.04 : -0.03); const x = holeX + Math.cos(a) * holeRX * r, y = holeY + Math.sin(a) * holeRY * r; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.closePath(); };
    const stonePath = g => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); };
    const topAt = x => { // the stone's top edge at x
      let best = cy;
      for (const p of pts) if (Math.abs(p[0] - x) < 12 && p[1] < best) best = p[1];
      return best;
    };

    // ---------- layers ----------
    const layer = () => { const cv = document.createElement('canvas'); cv.width = cv.height = S; const g = cv.getContext('2d'); g.setTransform(u, 0, 0, u, 0, 0); g.lineCap = 'round'; g.lineJoin = 'round'; return [cv, g]; };
    const [cvA, A] = layer();
    const [cvB, B] = layer();
    const K = '#000';
    A.fillStyle = K; A.strokeStyle = K; B.fillStyle = K; B.strokeStyle = K;

    // dots on a fixed rotated grid, inside a clip; an optional box [x0, y0, x1, y1] skips the grid
    // points that could never show, and all the dots go into one path with a single fill
    const halftone = (g, clip, shade, step, maxR, ang, box, reach = 50) => {
      g.save(); clip(); g.clip();
      const ca = Math.cos(ang), sa = Math.sin(ang);
      const bx0 = box ? box[0] - maxR : -20, by0 = box ? box[1] - maxR : -20, bx1 = box ? box[2] + maxR : 1020, by1 = box ? box[3] + maxR : 1020;
      g.beginPath();
      for (let i = -reach; i <= reach; i++) for (let j = -reach; j <= reach; j++) {
        const lx = i * step, ly = j * step;
        const x = 500 + lx * ca - ly * sa, y = 500 + lx * sa + ly * ca;
        if (x < -20 || x > 1020 || y < -20 || y > 1020 || x < bx0 || x > bx1 || y < by0 || y > by1) continue;
        const v = shade(x, y);
        if (v <= 0.03) continue;
        const r = maxR * Math.sqrt(Math.min(1, v));
        g.moveTo(x + r, y); g.arc(x, y, r, 0, 7);
      }
      g.fill();
      g.restore();
    };

    // background print
    const full = () => { A.beginPath(); A.rect(0, 0, 1000, 1000); };
    if (scene.n === 'Sun Disc' || scene.n === 'Moon') {
      A.beginPath(); A.arc(500, 420, 330, 0, 7); A.fill();
      if (scene.n === 'Moon') { A.save(); A.globalCompositeOperation = 'destination-out'; A.beginPath(); A.arc(640, 330, 290, 0, 7); A.fill(); A.restore();
        for (let i = 0; i < 14; i++) { const p = dots[i]; B.beginPath(); B.arc(80 + p[0] * 840, 60 + p[1] * 360, 4 + p[2] * 5, 0, 7); B.fill(); } }
    } else if (scene.n === 'Waves') {
      A.lineWidth = 14;
      for (let r = 0; r < 7; r++) { // seven calm swells
        A.beginPath();
        for (let x = -20; x <= 1020; x += 10) { const y = 90 + r * 122 + Math.sin(x * 0.016 + r) * 16; x < 0 ? A.moveTo(x, y) : A.lineTo(x, y); }
        A.stroke();
      }
    } else if (scene.n === 'Stripes') {
      for (let i = -10; i < 20; i++) { A.save(); A.translate(i * 110, 0); A.rotate(0.5); A.fillRect(0, -200, 50, 1600); A.restore(); }
    } else if (scene.n === 'Polka') {
      halftone(A, full, () => 1, 70, 20, 0.785);
    } else if (scene.n === 'Gingham') {
      for (let i = 0; i < 1000; i += 100) { A.fillRect(i, 0, 50, 1000); B.save(); B.globalAlpha = 0.55; B.fillRect(0, i, 1000, 50); B.restore(); }
    } else if (scene.n === 'Ripples') {
      A.lineWidth = 12;
      for (let r = RX + 50; r < 1300; r += 64) { A.beginPath(); A.ellipse(cx, cy + RY * 0.3, r, r * 0.62, 0, 0, 7); A.stroke(); }
    } else if (scene.n === 'Big Dots') {
      halftone(A, full, () => 1, 170, 54, 0.4);
    } else if (scene.n === 'Rainbow') {
      for (let i = 0; i < 4; i++) {
        const g = i % 2 ? B : A;
        g.lineWidth = 46; g.beginPath(); g.arc(500, 760, 420 - i * 58, Math.PI, 0); g.stroke();
      }
    }
    // the sky over the print, in ink B
    B.lineWidth = 9;
    if (sky === 'Gulls') for (let i = 0; i < 3; i++) { const gx = 120 + dots[i + 20][0] * 760, gy = 70 + dots[i + 20][1] * 170, s = 18 + dots[i + 20][2] * 14; B.beginPath(); B.moveTo(gx - s, gy); B.quadraticCurveTo(gx - s * 0.5, gy - s * 0.7, gx, gy); B.quadraticCurveTo(gx + s * 0.5, gy - s * 0.7, gx + s, gy); B.stroke(); }
    else if (sky === 'Clouds') for (const [qx, qy, qs] of [[180 + dots[30][0] * 120, 120, 1], [700 + dots[31][0] * 120, 90 + dots[31][1] * 60, 0.8]]) {
      const puff = g => { g.beginPath(); for (const [ox, oy, r] of [[-60, 10, 40], [-15, -12, 52], [40, 0, 44], [80, 16, 30]]) { g.moveTo(qx + ox * qs + r * qs, qy + oy * qs); g.arc(qx + ox * qs, qy + oy * qs, r * qs, 0, 7); } };
      A.save(); A.globalCompositeOperation = 'destination-out'; puff(A); A.fill(); A.restore();
      B.lineWidth = 12; puff(B); B.stroke();
      B.save(); B.globalCompositeOperation = 'destination-out'; puff(B); B.fill(); B.restore();
      halftone(B, () => puff(B), () => 0.35, 10, 4.5, 0.2);
    } else if (sky === 'Sparkles') for (let i = 0; i < 7; i++) { const sx2 = 70 + dots[i + 40][0] * 860, sy2 = 60 + dots[i + 40][1] * 260, r = 12 + dots[i + 40][2] * 16; B.beginPath(); for (let j = 0; j < 8; j++) { const an = j * Math.PI / 4, rr = j % 2 ? r * 0.28 : r; B.lineTo(sx2 + Math.cos(an) * rr, sy2 + Math.sin(an) * rr); } B.closePath(); B.fill(); }
    else if (sky === 'Rain') { B.lineWidth = 6; for (let i = 0; i < 46; i++) { const d0 = dots[i % 70], x = d0[0] * 1080 - 40, y = d0[1] * 520 + (i % 3) * 20; B.beginPath(); B.moveTo(x, y); B.lineTo(x - 14, y + 34); B.stroke(); } }
    // ground: a band of halftone sand, and a halftone shadow thrown away from the light
    const baseTop = cy + RY * 0.84 - 6, groundY = setting === 'Cairn' ? baseTop + 120 : cy + RY * 0.55;
    halftone(B, () => { B.beginPath(); B.rect(0, groundY, 1000, 600); }, (x, y) => 0.12 + (y - groundY + RY * 0.25) / 900, 16, 6, 0.3);
    B.globalAlpha = 1;
    const shadowY = setting === 'Cairn' ? baseTop + 132 : cy + RY * 0.84;
    halftone(B, () => { B.beginPath(); B.ellipse(cx + RX * 0.24, shadowY, RX * (setting === 'Cairn' ? 1.12 : 0.86), 34, 0, 0, 7); }, () => 0.8, 9, 5.2, 0.6, [cx + RX * 0.24 - RX * 1.12, shadowY - 34, cx + RX * 0.24 + RX * 1.12, shadowY + 34]);
    if (setting === 'Cairn') {
      // the stone it is balanced on: a thick slab of a stone, tipped a little, with a flat top it sits on
      // and a rounded side falling into shade
      const bx0 = cx - flip * 10, brx = RX * 1.12, bym = baseTop + 56, bryy = 66, btilt = 0.045 * flip;
      const bpts = [];
      for (let i = 0; i < 96; i++) {
        const th = i / 96 * Math.PI * 2, s = Math.sin(th), cth = Math.cos(th);
        const r = 1 + 0.025 * Math.sin(th * 3 + harm[2][0]) + 0.015 * Math.sin(th * 5 + harm[3][0]);
        const x = Math.sign(cth) * Math.pow(Math.abs(cth), 0.8) * brx * r, y = Math.sign(s) * Math.pow(Math.abs(s), 0.65) * bryy * r;
        bpts.push([bx0 + x * Math.cos(btilt) - y * Math.sin(btilt), bym + x * Math.sin(btilt) + y * Math.cos(btilt)]);
      }
      const basePath = g => { g.beginPath(); bpts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); };
      const topFace = g => { g.beginPath(); g.ellipse(bx0, baseTop + 8, brx * 0.9, 30, btilt, 0, 7); };
      const bbox = [bx0 - brx - 20, bym - bryy - 30, bx0 + brx + 20, bym + bryy + 30];
      for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; basePath(g); g.lineWidth = 24; g.fill(); g.stroke(); g.restore(); }
      A.save(); basePath(A); A.clip(); A.fillRect(0, 0, 1000, 1000); A.restore();
      // the side: dark ink halftone, heavier toward the bottom and away from the light
      halftone(B, () => basePath(B), (x, y) => (y - (baseTop + 20)) / 85 + (x - bx0) / (brx * 2.4) + 0.12, 12, 6.5, 0.26, bbox);
      // the flat top: lit, a light halftone, with the upper stone's shadow thrown across it
      for (const g of [A, B]) { g.save(); basePath(g); g.clip(); g.globalCompositeOperation = 'destination-out'; topFace(g); g.fill(); g.restore(); }
      halftone(A, () => { basePath(A); A.clip(); topFace(A); }, () => 0.6, 10, 5.5, 0.785, bbox);
      halftone(B, () => { basePath(B); B.clip(); topFace(B); B.clip(); B.beginPath(); B.ellipse(cx + RX * 0.42, baseTop + 14, RX * 0.72, 22, 0, 0, 7); }, () => 0.7, 9, 5, 0.6, bbox);
      // the edge where the top turns down into the side
      B.lineWidth = 7; B.save(); basePath(B); B.clip(); B.beginPath(); B.ellipse(bx0, baseTop + 8, brx * 0.9, 30, btilt, 0.05, Math.PI - 0.05); B.stroke(); B.restore();
      B.lineWidth = 13; basePath(B); B.stroke();
    }
    // knock the stone out of the backdrop so it stays clean
    for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; stonePath(g); g.lineWidth = 30; g.fill(); g.stroke(); g.restore(); }

    // the stone body in ink A, shaded with ink B halftone
    A.save(); stonePath(A); A.clip(); A.fillRect(0, 0, 1000, 1000); A.restore();
    const lx = -0.6, ly = -0.8;
    halftone(B, () => stonePath(B), (x, y) => {
      const nx = (x - cx) / RX, ny = (y - cy) / RY;
      return (nx * -lx + ny * -ly) * 0.9 + 0.05;
    }, 15, 7.5, 0.26, stoneBox);
    // a shine knocked out of both
    for (const g of [A, B]) {
      g.save(); g.globalCompositeOperation = 'destination-out';
      g.beginPath(); g.ellipse(cx - RX * 0.5, cy - RY * 0.52, RX * 0.16, RY * 0.07, -0.6 + tilt, 0, 7); g.fill();
      g.beginPath(); g.arc(cx - RX * 0.28, cy - RY * 0.68, 9, 0, 7); g.fill();
      g.restore();
    }

    // markings
    if (mark.n === 'Speckled') {
      B.save(); stonePath(B); B.clip();
      for (const p of dots) { B.beginPath(); B.arc(cx + (p[0] - 0.5) * RX * 2, cy + (p[1] - 0.5) * RY * 2, 3 + p[2] * 6, 0, 7); B.fill(); }
      B.restore();
    } else if (mark.n === 'Quartz Band') {
      for (const g of [A, B]) {
        g.save(); stonePath(g); g.clip(); g.globalCompositeOperation = 'destination-out'; g.lineWidth = 26;
        g.beginPath();
        for (let i = 0; i <= 30; i++) { const x = cx - RX * 1.1 + i * RX * 2.2 / 30, y = cy + RY * 0.66 - (x - cx) * 0.22 * flip + Math.sin(i * 0.9) * 6; i ? g.lineTo(x, y) : g.moveTo(x, y); }
        g.stroke(); g.restore();
      }
    } else if (mark.n === 'Veined') {
      for (const g of [A, B]) {
        g.save(); stonePath(g); g.clip(); g.globalCompositeOperation = 'destination-out'; g.lineWidth = 7;
        for (let v = 0; v < 3; v++) {
          g.beginPath();
          let x = cx - RX * 1.1, y = cy + RY * (0.05 + v * 0.25);
          g.moveTo(x, y);
          for (let i = 0; i < 12; i++) { x += RX * 0.2; y += (dots[v * 12 + i][0] - 0.5) * 34; g.quadraticCurveTo(x - RX * 0.1, y - 14, x, y); }
          g.stroke();
          g.lineWidth = 4;
        }
        g.restore();
      }
    } else if (mark.n === 'Ammonite') {
      const ox = cx + RX * 0.5 * flip, oy = cy + RY * 0.48;
      B.lineWidth = 6; B.beginPath();
      for (let t = 0; t < 18; t += 0.1) { const r = 3 * Math.exp(t * 0.16); B.lineTo(ox + Math.cos(t) * r, oy + Math.sin(t) * r * 0.8); }
      B.stroke();
      for (let t = 4; t < 18; t += 0.7) { const r = 3 * Math.exp(t * 0.16); B.beginPath(); B.moveTo(ox + Math.cos(t) * r, oy + Math.sin(t) * r * 0.8); B.lineTo(ox + Math.cos(t) * r * 0.75, oy + Math.sin(t) * r * 0.6); B.stroke(); }
    } else if (mark.n === 'Holey') {
      for (const g of [A, B]) {
        g.save(); g.globalCompositeOperation = 'destination-out';
        g.beginPath(); g.ellipse(cx + RX * 0.55 * flip, cy + RY * 0.45, 30, 22, 0.3, 0, 7); g.fill(); g.restore();
      }
      B.lineWidth = 7; B.beginPath(); B.ellipse(cx + RX * 0.55 * flip, cy + RY * 0.45, 30, 22, 0.3, 0, 7); B.stroke();
    }
    else if (mark.n === 'Lichen') {
      B.save(); stonePath(B); B.clip(); B.lineWidth = 5;
      for (let i = 0; i < 7; i++) { // lichen rosettes
        const d0 = dots[i + 8], lx3 = cx + (d0[0] - 0.5) * RX * 1.7, ly3 = cy + RY * (0.4 + d0[1] * 0.45), r = 12 + d0[2] * 22;
        B.beginPath(); B.arc(lx3, ly3, r, 0, 7); B.stroke();
        halftone(B, () => { B.beginPath(); B.arc(lx3, ly3, r * 0.7, 0, 7); }, () => 0.5, 7, 3.5, 0.5, [lx3 - r, ly3 - r, lx3 + r, ly3 + r]);
      }
      B.restore();
    } else if (mark.n === 'Banded') {
      for (const g of [A, B]) {
        g.save(); stonePath(g); g.clip(); g.globalCompositeOperation = 'destination-out';
        for (let k = 0; k < 3; k++) { g.lineWidth = 9 - k * 2; g.beginPath(); g.ellipse(cx, cy + RY * (0.1 + k * 0.16), RX * 1.15, RY * 0.6, 0.06 * flip, 0.25, Math.PI - 0.25); g.stroke(); }
        g.restore();
      }
    } else if (mark.n === 'Agate Bands') {
      // the outside of the stone: a rough rind, pitted
      B.save(); stonePath(B); B.clip();
      for (const p of dots) { B.beginPath(); B.arc(cx + (p[0] - 0.5) * RX * 2, cy + (p[1] - 0.5) * RY * 2, 2 + p[2] * 4, 0, 7); B.fill(); }
      B.restore();
      // and its other half, split open beside it: rind, agate bands in both inks, a cavity lined with crystal
      const hp = (g, sc) => { g.beginPath(); hpts.forEach((p, i) => { const th = i / 160 * Math.PI * 2, f = sc * (1 + (sc < 0.99 ? 0.03 * Math.sin(th * 3 + sc * 9) + 0.02 * Math.sin(th * 5 + sc * 4) : 0)); const x = hcx + (p[0] - hcx) * f, y = hcy + (p[1] - hcy) * f; i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); };
      const hbox = [hcx - HRX - 20, hcy - HRY - 20, hcx + HRX + 20, hcy + HRY + 20];
      halftone(B, () => { B.beginPath(); B.ellipse(hcx + HRX * 0.18, hcy + HRY * 0.86, HRX * 1.05, 30, 0, 0, 7); }, () => 0.8, 9, 5.2, 0.6, [hcx - HRX * 1.1, hcy + HRY * 0.86 - 32, hcx + HRX * 1.3, hcy + HRY * 0.86 + 32]);
      for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; hp(g, 1); g.lineWidth = 30; g.fill(); g.stroke(); g.restore(); }
      const clearIn = sc => { for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; hp(g, sc); g.fill(); g.restore(); } };
      hp(A, 1); A.fill(); halftone(B, () => hp(B, 1), (x, y) => ((x - hcx) / HRX + (y - hcy) / HRY) * 0.45 + 0.35, 11, 5.5, 0.26, hbox);
      clearIn(0.86); B.lineWidth = 5; hp(B, 0.86); B.stroke();
      hp(A, 0.81); A.fill(); clearIn(0.74); B.lineWidth = 6; hp(B, 0.71); B.stroke();
      halftone(A, () => hp(A, 0.68), () => 0.45, 9, 4.5, 0.785, hbox); clearIn(0.63); hp(B, 0.63); B.lineWidth = 9; B.stroke();
      // the hollow: a pale wash of ink A, darkening to a deep pocket in the middle
      halftone(A, () => hp(A, 0.6), () => 0.3, 8, 4, 0.785, hbox);
      halftone(B, () => hp(B, 0.6), (x, y) => 1.25 - Math.hypot((x - hcx) / HRX, (y - hcy) / HRY) * 2.6, 7, 4.4, 0.4, hbox);
      B.save(); B.translate(hcx, hcy); B.scale(1.08, 1); B.translate(-hcx, -hcy); hp(B, 0.2); B.fill(); B.restore();
      // clusters of sharp crystal points standing on the hollow's wall, all facing in: each a narrow
      // triangle in ink B, its shaded face filled and its lit face left pale
      const wallAt = (k, f) => { k = ((k % 160) + 160) % 160; const k0 = Math.floor(k), k1 = (k0 + 1) % 160, fr = k - k0, th = k / 160 * Math.PI * 2;
        const w2 = f * (1 + 0.03 * Math.sin(th * 3 + 0.63 * 9) + 0.02 * Math.sin(th * 5 + 0.63 * 4));
        const px = hpts[k0][0] + (hpts[k1][0] - hpts[k0][0]) * fr, py = hpts[k0][1] + (hpts[k1][1] - hpts[k0][1]) * fr;
        return [hcx + (px - hcx) * w2, hcy + (py - hcy) * w2]; };
      const crystal = (k, half, len, lean) => {
        const a0 = wallAt(k - half, 0.6), a2 = wallAt(k + half, 0.6), mid = wallAt(k, 0.6), tip = wallAt(k + lean, 0.6 - len);
        const tri = g => { g.beginPath(); g.moveTo(a0[0], a0[1]); g.lineTo(tip[0], tip[1]); g.lineTo(a2[0], a2[1]); g.closePath(); };
        for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; tri(g); g.fill(); g.restore(); }
        A.save(); A.globalAlpha = 0.35; tri(A); A.fill(); A.restore();
        B.save(); B.globalAlpha = 0.85; B.beginPath(); B.moveTo(a0[0], a0[1]); B.lineTo(tip[0], tip[1]); B.lineTo(mid[0], mid[1]); B.closePath(); B.fill(); B.restore();
        B.lineWidth = 3; B.lineJoin = 'miter'; tri(B); B.stroke(); B.lineJoin = 'round';
      };
      for (let cl = 0; cl < 7; cl++) {
        const base = cl / 7 * 160 + dots[cl + 56][0] * 5, big = 0.22 + dots[cl + 56][1] * 0.1;
        for (const o of [-9.5, 10]) crystal(base + o + dots[cl + 60][2] * 2, 2.2, 0.06 + dots[cl * 3 % 70][2] * 0.05, 0.6); // small ones in the gaps
        // a cluster: one tall point and two shorter ones fanned out beside it
        crystal(base - 4.6, 2.8, big * 0.62, -2.2);
        crystal(base + 4.6, 2.8, big * 0.7, 2.2);
        crystal(base, 3.4, big, 0);
      }
      // the misregistered sparkle: ink A and ink B a little apart, as if the drums slipped
      for (const [sx, sy, r] of [[hcx + HRX * 0.22, hcy - HRY * 0.24, 84], [hcx - HRX * 0.3, hcy + HRY * 0.14, 34]]) {
        const st = (g, x, y) => { g.beginPath(); for (let j = 0; j < 8; j++) { const an = j * Math.PI / 4, rr = j % 2 ? r * 0.18 : r; g.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } g.closePath(); };
        for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; st(g, sx, sy); g.fill(); g.restore(); }
        st(A, sx + 14, sy - 9); A.fill(); B.lineWidth = 4; st(B, sx, sy); B.stroke();
      }
      B.lineWidth = 14; hp(B, 1); B.stroke();
    } else if (mark.n === 'Leathery') {
      // a sea turtle's egg: soft white shell (bare paper with a pale tint), a few freckles
      A.save(); A.globalCompositeOperation = 'destination-out'; stonePath(A); A.fill(); A.restore();
      halftone(A, () => stonePath(A), (x, y) => 0.14 + ((x - cx) / RX + (y - cy) / RY) * 0.06, 8, 3.4, 0.785, stoneBox);
      B.save(); stonePath(B); B.clip();
      for (let i = 0; i < 12; i++) { const p = dots[i + 50]; B.beginPath(); B.arc(cx + (p[0] - 0.5) * RX * 1.5, cy + (p[1] - 0.6) * RY * 1.3, 2 + p[2] * 3, 0, 7); B.fill(); }
      B.restore();
    } else if (mark.n === 'Fossil Shell') {
      const ox = cx + RX * 0.5 * flip, oy = cy + RY * 0.5;
      B.lineWidth = 5;
      B.beginPath(); B.moveTo(ox - 44, oy + 6); B.quadraticCurveTo(ox, oy - 62, ox + 44, oy + 6); B.lineTo(ox + 10, oy + 30); B.lineTo(ox - 10, oy + 30); B.closePath(); B.stroke();
      for (let i = -3; i <= 3; i++) { B.beginPath(); B.moveTo(ox + i * 2, oy + 28); B.lineTo(ox + i * 13, oy - 22 + Math.abs(i) * 7); B.stroke(); }
    }
    // outline
    B.lineWidth = 15; stonePath(B); B.stroke();
    if (legend === 'Turtle Egg') {
      // half buried in a mound of sand
      const sandY = x => cy + RY * 0.5 + Math.max(0, Math.abs(x - cx) - RX * 0.55) * 0.32 + Math.sin(x * 0.03) * 6;
      const sand = g => { g.beginPath(); g.moveTo(-20, 1020); for (let x = -20; x <= 1020; x += 20) g.lineTo(x, sandY(x)); g.lineTo(1020, 1020); g.closePath(); };
      for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; sand(g); g.fill(); g.restore(); }
      halftone(A, () => sand(A), (x, y) => 0.42 + (y - sandY(x)) / 700, 12, 6, 0.4, [-20, cy, 1020, 1020], 62);
      B.save(); sand(B); B.clip(); for (let i = 0; i < 70; i++) { const p = dots[i]; B.beginPath(); B.arc(p[0] * 1000, sandY(p[0] * 1000) + 18 + p[1] * 380, 2 + p[2] * 2.5, 0, 7); B.fill(); } B.restore();
      B.lineWidth = 10; B.beginPath(); for (let x = -20; x <= 1020; x += 20) x < 0 ? B.moveTo(x, sandY(x)) : B.lineTo(x, sandY(x)); B.stroke();
      // already hatching: a jagged hole broken in the top of the shell, the hatchling's head and eyes peeking
      // out of the dark inside, a flipper over the rim, and two bits of shell lying on the sand
      const eggBig = g => { g.beginPath(); pts.forEach((p, i) => { const x = cx + (p[0] - cx) * 1.05, y = cy + (p[1] - cy) * 1.05; i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); };
      const both2 = fn => { fn(A); fn(B); };
      both2(g => { g.save(); eggBig(g); g.clip(); g.globalCompositeOperation = 'destination-out'; holePath(g); g.fill(); g.restore(); });
      halftone(B, () => { eggBig(B); B.clip(); holePath(B); }, (x, y) => 0.5 + (y - holeY) / (holeRY * 3), 8, 4.6, 0.5, [holeX - holeRX, holeY - holeRY, holeX + holeRX, holeY + holeRY]);
      const head = g => { g.beginPath(); g.ellipse(holeX - flip * 8, holeY + holeRY * 0.4, holeRX * 0.64, holeRY * 0.95, 0, 0, 7); };
      for (const g of [A, B]) { g.save(); eggBig(g); g.clip(); holePath(g); g.clip(); g.globalCompositeOperation = 'destination-out'; head(g); g.fill(); g.restore(); }
      A.save(); eggBig(A); A.clip(); holePath(A); A.clip(); head(A); A.fill(); A.restore();
      halftone(B, () => { eggBig(B); B.clip(); holePath(B); B.clip(); head(B); }, (x, y) => ((x - holeX) / holeRX * flip + (y - holeY) / holeRY) * 0.35 + 0.05, 10, 4.5, 0.26, [holeX - holeRX, holeY - holeRY, holeX + holeRX, holeY + holeRY]);
      B.save(); eggBig(B); B.clip(); holePath(B); B.clip(); B.lineWidth = 8; head(B); B.stroke(); B.restore();
      B.lineWidth = 7; B.beginPath(); B.arc(holeX + flip * holeRX * 0.12, holeY + holeRY * 0.72, 16, 0.4, Math.PI - 0.4); B.stroke();
      const flipper = g => { g.save(); g.translate(holeX - flip * holeRX * 0.62, holeY + holeRY * 0.5); g.rotate(flip * 0.55); g.beginPath(); g.ellipse(-flip * 6, 0, 54, 19, 0, 0, 7); g.restore(); };
      for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; flipper(g); g.fill(); g.restore(); }
      flipper(A); A.fill(); B.lineWidth = 6; flipper(B); B.stroke();
      B.save(); eggBig(B); B.clip(); B.lineWidth = 9; holePath(B); B.stroke();
      B.lineWidth = 6;
      for (const [a, L] of [[0.75, 70], [1.6, 52], [2.35, 64], [0.2, 40]]) { let x = holeX + Math.cos(a) * holeRX * 0.95, y = holeY + Math.sin(a) * holeRY * 0.95; B.beginPath(); B.moveTo(x, y); for (let k = 1; k <= 4; k++) { x += Math.cos(a) * L / 4 + (k % 2 ? 9 : -9); y += Math.sin(a) * L / 4 + 6; B.lineTo(x, y); } B.stroke(); }
      B.restore();
      for (const [sx, sc, an] of [[cx + flip * (RX + 70), 1, 0.4], [cx - flip * (RX + 40), 0.7, -0.9]]) {
        const sy = sandY(sx) + 34;
        const shard = g => { g.save(); g.translate(sx, sy); g.rotate(an); g.scale(sc, sc); g.beginPath(); g.moveTo(-40, 6); g.lineTo(-26, -14); g.lineTo(-8, -4); g.lineTo(8, -20); g.lineTo(26, -8); g.lineTo(42, 4); g.quadraticCurveTo(0, 22, -40, 6); g.closePath(); g.restore(); };
        for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; shard(g); g.lineWidth = 10; g.fill(); g.stroke(); g.restore(); }
        B.lineWidth = 6; shard(B); B.stroke();
      }
    }
    if (setting === 'Wading') {
      // standing in the shallows: everything under the waterline is water
      const wl = cy + RY * 0.42;
      const waterPath = g => { g.beginPath(); g.moveTo(-20, wl); for (let x = -20; x <= 1020; x += 20) g.lineTo(x, wl + Math.sin(x * 0.03) * 7); g.lineTo(1020, 1020); g.lineTo(-20, 1020); g.closePath(); };
      for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; waterPath(g); g.fill(); g.restore(); }
      halftone(A, () => waterPath(A), (x, y) => 0.22 + (y - wl) / 1300, 14, 5.5, 0.9);
      B.lineWidth = 7;
      for (let r = 0; r < 6; r++) { B.beginPath(); for (let x = -20; x <= 1020; x += 15) { const y = wl + 26 + r * 48 + Math.sin(x * 0.02 + r * 1.7) * 7; if (x < 0) B.moveTo(x, y); else B.lineTo(x, y); } B.stroke(); }
      B.lineWidth = 9; B.beginPath(); B.ellipse(cx, wl + 4, RX * 1.06, 20, 0, 0, 7); B.stroke();
    }

    // ---------- face (static parts) ----------
    const fs = Math.min(RX, RY) / 215;
    const fx = cx + flip * 8 + glanceX * RX * 0.3, ey = cy - RY * 0.18, my = cy + RY * 0.2, gap = 92 * fs;
    // cheeks: knocked out of ink A and refilled with a fine A halftone
    if (!egg) for (const s of [-1, 1]) {
      const bx = fx + s * (gap + 48 * fs), by = my - 10 * fs;
      A.save(); A.globalCompositeOperation = 'destination-out'; A.beginPath(); A.ellipse(bx, by, 40 * fs, 26 * fs, 0, 0, 7); A.fill(); A.restore();
      halftone(A, () => { A.beginPath(); A.ellipse(bx, by, 40 * fs, 26 * fs, 0, 0, 7); }, () => 0.55, 9, 4, 0.785, [bx - 40 * fs, by - 26 * fs, bx + 40 * fs, by + 26 * fs]);
      B.save(); B.globalAlpha = 1; halftone(B, () => { B.beginPath(); B.ellipse(bx, by, 40 * fs, 26 * fs, 0, 0, 7); }, () => 0.45, 9, 4, 0.1, [bx - 40 * fs, by - 26 * fs, bx + 40 * fs, by + 26 * fs]); B.restore();
    }
    B.save(); B.translate(fx, my); B.scale(fs, fs);
    B.lineWidth = 13;
    const M = egg ? '' : mouth.n;
    if (M === 'Smile') { B.beginPath(); B.arc(0, -26, 40, 0.4, Math.PI - 0.4); B.stroke(); }
    else if (M === 'Open') {
      B.beginPath(); B.moveTo(-42, -4); B.quadraticCurveTo(0, 6, 42, -4); B.quadraticCurveTo(30, 60, 0, 60); B.quadraticCurveTo(-30, 60, -42, -4); B.fill();
      A.save(); A.translate(fx, my); A.scale(fs, fs); A.globalCompositeOperation = 'destination-out'; A.beginPath(); A.moveTo(-42, -4); A.quadraticCurveTo(0, 6, 42, -4); A.quadraticCurveTo(30, 60, 0, 60); A.quadraticCurveTo(-30, 60, -42, -4); A.fill(); A.restore();
      B.save(); B.globalCompositeOperation = 'destination-out'; B.beginPath(); B.ellipse(0, 40, 20, 12, 0, 0, 7); B.fill(); B.restore();
    } else if (M === 'Pout') {
      B.beginPath(); B.arc(-10, 4, 14, -1.2, 1.4); B.stroke(); B.beginPath(); B.arc(-10, 30, 14, -1.4, 1.2); B.stroke();
    } else if (M === 'Cat') {
      B.beginPath(); B.arc(-20, 0, 20, 0.1, Math.PI - 0.1); B.stroke(); B.beginPath(); B.arc(20, 0, 20, 0.1, Math.PI - 0.1); B.stroke();
    } else if (M === 'Gap Tooth') {
      B.beginPath(); B.moveTo(-50, -8); B.quadraticCurveTo(0, 90, 50, -8); B.closePath(); B.fill();
      for (const g of [A, B]) { g.save(); if (g === A) { g.translate(fx, my); g.scale(fs, fs); } g.globalCompositeOperation = 'destination-out'; g.fillRect(-25, -8, 21, 17); g.fillRect(4, -8, 21, 17); g.restore(); }
    } else if (M === 'Flat') { B.beginPath(); B.moveTo(-32, 6); B.lineTo(32, 2); B.stroke(); }
    else if (M === 'Tongue' || M === 'Grin') {
      if (M === 'Tongue') {
        B.beginPath(); B.arc(0, -26, 40, 0.4, Math.PI - 0.4); B.stroke();
        A.save(); A.translate(fx, my); A.scale(fs, fs); A.beginPath(); A.moveTo(2, 6); A.lineTo(34, 6); A.arc(18, 18, 16, 0, Math.PI); A.closePath(); A.fill(); A.restore();
        B.lineWidth = 8; B.beginPath(); B.moveTo(2, 6); B.lineTo(34, 6); B.arc(18, 18, 16, 0, Math.PI); B.closePath(); B.stroke();
      } else {
        B.beginPath(); B.moveTo(-56, -10); B.quadraticCurveTo(0, 0, 56, -10); B.quadraticCurveTo(40, 52, 0, 54); B.quadraticCurveTo(-40, 52, -56, -10); B.fill();
        B.save(); B.globalCompositeOperation = 'destination-out'; B.beginPath(); B.moveTo(-46, -6); B.quadraticCurveTo(0, 4, 46, -6); B.lineTo(40, 10); B.quadraticCurveTo(0, 18, -40, 10); B.closePath(); B.fill(); B.restore();
      }
    } else if (M === 'Zigzag') { B.lineWidth = 10; B.beginPath(); for (let i = 0; i <= 6; i++) B.lineTo(-36 + i * 12, i % 2 ? 10 : -4); B.stroke(); }
    else if (M === 'Whistle') { B.lineWidth = 10; B.beginPath(); B.arc(0, 8, 13, 0, 7); B.stroke(); B.lineWidth = 6; for (let i = 0; i < 3; i++) { B.beginPath(); B.arc(80, -30 + i * 6, 12 + i * 12, -0.6, 0.4); B.stroke(); } }
    B.restore();

    if (brows !== 'None' && !egg) {
      B.save(); B.translate(fx, ey); B.scale(fs, fs); B.lineWidth = brows === 'Heavy' ? 17 : 10;
      for (const ox of eyes.n === 'Cyclops' ? [0] : [-gap / fs, gap / fs]) {
        const s = ox < 0 ? -1 : 1, lift = eyes.n === 'Cyclops' ? -30 : 0;
        B.beginPath();
        if (brows === 'Worried') { B.moveTo(ox - 30 * s, -48 + lift); B.lineTo(ox + 26 * s, -64 + lift); }
        else if (brows === 'Cheeky') { if (s > 0) B.arc(ox, -36 + lift, 30, -Math.PI + 0.6, -0.6); else { B.moveTo(ox - 28, -54 + lift); B.lineTo(ox + 28, -54 + lift); } }
        else { B.moveTo(ox - 26, -56 + lift); B.lineTo(ox + 26, -54 + lift); }
        B.stroke();
      }
      B.restore();
    }

    // ---------- riders ----------
    const rx = cx - flip * RX * 0.18, ry = topAt(cx - flip * RX * 0.18);
    const both = (fn) => { fn(A, 'a'); fn(B, 'b'); };
    if (rider.n === 'Moss Tuft') {
      halftone(B, () => { B.beginPath(); B.ellipse(rx, ry + 12, 118, 40, 0, Math.PI, 0); }, (x, y) => 0.5 + (ry + 12 - y) / 70, 9, 5, 0.6, [rx - 118, ry - 30, rx + 118, ry + 12]);
      for (let i = 0; i < 38; i++) {
        const d0 = dots[(i * 3) % 70], u = (i + d0[0] * 0.9) / 38, xb = rx - 112 + u * 224;
        const h = (16 + d0[1] * 50) * Math.sin(Math.PI * u) + 8, lean = (d0[2] - 0.5) * 0.9 + (u - 0.5) * 0.7;
        B.lineWidth = 3 + d0[2] * 4;
        B.beginPath(); B.moveTo(xb, ry + 12); B.quadraticCurveTo(xb + lean * h * 0.25, ry + 12 - h * 0.6, xb + lean * h, ry + 12 - h); B.stroke();
        if (i % 5 === 0) { B.beginPath(); B.arc(xb + lean * h, ry + 12 - h, 4, 0, 7); B.fill(); }
      }
    } else if (rider.n === 'Little Pebble') {
      const px = rx, py = ry - 70;
      A.beginPath(); A.ellipse(px, py, 105, 72, 0.08 * flip, 0, 7); A.fill();
      halftone(B, () => { B.beginPath(); B.ellipse(px, py, 105, 72, 0.08 * flip, 0, 7); }, (x, y) => ((x - px) / 105 + (y - py) / 72) * 0.6, 13, 6, 0.26, [px - 112, py - 80, px + 112, py + 80]);
      B.lineWidth = 12; B.beginPath(); B.ellipse(px, py, 105, 72, 0.08 * flip, 0, 7); B.stroke();
      B.lineWidth = 8;
      B.beginPath(); B.arc(px - 30, py - 4, 14, 0.2, Math.PI - 0.2); B.stroke();
      B.beginPath(); B.arc(px + 30, py - 4, 14, 0.2, Math.PI - 0.2); B.stroke();
      B.beginPath(); B.arc(px, py + 22, 10, 0, 7); B.stroke();
    } else if (rider.n === 'Snail') {
      const sx = rx, sy = ry - 6;
      A.beginPath(); A.moveTo(sx - 90, sy + 4); A.quadraticCurveTo(sx - 120, sy - 30, sx - 100, sy - 60); A.lineTo(sx - 80, sy - 40); A.lineTo(sx + 70, sy - 10); A.lineTo(sx + 70, sy + 4); A.closePath(); A.fill();
      B.lineWidth = 8; B.stroke();
      B.beginPath(); B.moveTo(sx - 104, sy - 58); B.lineTo(sx - 120, sy - 96); B.moveTo(sx - 96, sy - 56); B.lineTo(sx - 92, sy - 98); B.stroke();
      B.beginPath(); B.arc(sx - 120, sy - 98, 7, 0, 7); B.arc(sx - 92, sy - 100, 7, 0, 7); B.fill();
      B.beginPath(); B.arc(sx, sy - 58, 62, 0, 7); B.fill();
      B.save(); B.globalCompositeOperation = 'destination-out'; B.lineWidth = 10; B.beginPath();
      for (let t = 0; t < 14; t += 0.1) { const r = 4 + t * 3.6; B.lineTo(sx + Math.cos(t) * r, sy - 58 + Math.sin(t) * r); }
      B.stroke(); B.restore();
    } else if (rider.n === 'Ladybird') {
      const lx2 = rx, ly2 = ry - 26;
      A.beginPath(); A.ellipse(lx2, ly2, 54, 42, 0, 0, 7); A.fill();
      B.beginPath(); B.ellipse(lx2 + 50, ly2 + 4, 24, 20, 0, 0, 7); B.fill();
      B.lineWidth = 8; B.beginPath(); B.ellipse(lx2, ly2, 54, 42, 0, 0, 7); B.stroke(); B.beginPath(); B.moveTo(lx2, ly2 - 42); B.lineTo(lx2, ly2 + 42); B.stroke();
      for (const p of [[-28, -12], [-22, 18], [26, -14], [20, 16]]) { B.beginPath(); B.arc(lx2 + p[0], ly2 + p[1], 9, 0, 7); B.fill(); }
      B.beginPath(); B.moveTo(lx2 + 64, ly2 - 10); B.quadraticCurveTo(lx2 + 80, ly2 - 40, lx2 + 92, ly2 - 38); B.stroke();
    } else if (rider.n === 'Seaweed') {
      both((g, which) => {
        g.lineWidth = which === 'a' ? 30 : 7;
        g.beginPath(); g.moveTo(cx - RX * 0.95, cy - RY * 0.05);
        g.bezierCurveTo(cx - RX * 0.5, cy - RY * 0.95, cx + RX * 0.1, cy - RY * 1.15, cx + RX * 0.35, cy - RY * 0.86);
        g.bezierCurveTo(cx + RX * 0.55, cy - RY * 0.7, cx + RX * 0.7, cy - RY * 1.0, cx + RX * 0.92, cy - RY * 0.72);
        g.stroke();
      });
      B.lineWidth = 5;
      for (let i = 0; i < 6; i++) { const x = cx - RX * 0.7 + i * RX * 0.28; B.beginPath(); B.arc(x, cy - RY * 0.85 - Math.sin(i) * 16, 9, 0, 7); B.stroke(); }
    } else if (rider.n === 'Starfish') {
      const sx = rx, sy = ry - 54;
      const star = (g) => { g.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 30 : 76, an = -Math.PI / 2 + i * Math.PI / 5 + 0.15; g.lineTo(sx + Math.cos(an) * r, sy + Math.sin(an) * r); } g.closePath(); };
      star(A); A.fill(); B.lineWidth = 9; star(B); B.stroke();
      for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * Math.PI * 0.4 + 0.15; for (let j = 1; j < 4; j++) { B.beginPath(); B.arc(sx + Math.cos(an) * j * 16, sy + Math.sin(an) * j * 16, 4, 0, 7); B.fill(); } }
    } else if (rider.n === 'Flower') {
      const fx2 = rx, fy2 = ry - 92;
      B.lineWidth = 7; B.beginPath(); B.moveTo(rx, ry + 4); B.quadraticCurveTo(rx + 14 * flip, ry - 40, fx2, fy2); B.stroke();
      B.beginPath(); B.ellipse(rx + 18 * flip, ry - 30, 20, 8, -0.6 * flip, 0, 7); B.fill();
      for (let i = 0; i < 7; i++) { // seven petals
        const an = i / 7 * Math.PI * 2, px2 = fx2 + Math.cos(an) * 30, py2 = fy2 + Math.sin(an) * 30;
        for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.ellipse(px2, py2, 22, 12, an, 0, 7); g.fill(); g.restore(); }
        B.lineWidth = 5; B.beginPath(); B.ellipse(px2, py2, 22, 12, an, 0, 7); B.stroke();
      }
      A.beginPath(); A.arc(fx2, fy2, 16, 0, 7); A.fill(); B.lineWidth = 6; B.beginPath(); B.arc(fx2, fy2, 16, 0, 7); B.stroke();
    } else if (rider.n === 'Sun Hat') {
      const hx2 = cx + flip * RX * 0.05, hy2 = topAt(cx + flip * RX * 0.05) + 26;
      const brim = g => { g.beginPath(); g.ellipse(hx2, hy2, Math.min(RX * 0.78, 240), 34, -0.05 * flip, 0, 7); };
      const crown = g => { g.beginPath(); g.ellipse(hx2, hy2 - 12, 92, 66, 0, Math.PI, 0); g.closePath(); };
      for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; brim(g); g.fill(); crown(g); g.fill(); g.restore(); }
      halftone(B, () => brim(B), () => 0.42, 9, 4.5, 0.4); halftone(B, () => crown(B), () => 0.5, 9, 4.5, 0.4);
      A.save(); crown(A); A.clip(); A.fillRect(hx2 - 100, hy2 - 40, 200, 22); A.restore();
      B.lineWidth = 9; brim(B); B.stroke(); crown(B); B.stroke();
    } else if (rider.n === 'Bee') {
      const bx2 = cx + flip * RX * 0.62, by2 = topAt(cx + flip * RX * 0.4) - 110;
      B.lineWidth = 5; B.setLineDash([10, 12]); B.beginPath(); B.moveTo(bx2 - flip * 160, by2 + 90); B.bezierCurveTo(bx2 - flip * 60, by2 + 140, bx2 - flip * 140, by2 - 20, bx2 - flip * 30, by2 + 10); B.stroke(); B.setLineDash([]);
      for (const s of [-1, 1]) { for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.ellipse(bx2 + s * 14, by2 - 30, 18, 28, s * 0.4, 0, 7); g.fill(); g.restore(); } B.lineWidth = 5; B.beginPath(); B.ellipse(bx2 + s * 14, by2 - 30, 18, 28, s * 0.4, 0, 7); B.stroke(); }
      A.beginPath(); A.ellipse(bx2, by2, 36, 24, 0, 0, 7); A.fill();
      B.save(); B.beginPath(); B.ellipse(bx2, by2, 36, 24, 0, 0, 7); B.clip(); for (const ox of [-12, 8]) B.fillRect(bx2 + ox, by2 - 30, 10, 60); B.restore();
      B.lineWidth = 6; B.beginPath(); B.ellipse(bx2, by2, 36, 24, 0, 0, 7); B.stroke();
      B.beginPath(); B.arc(bx2 + flip * 24, by2 - 6, 4, 0, 7); B.fill();
    } else if (rider.n === 'Message in a Bottle') {
      // washed up beside it: a corked bottle with a rolled letter inside
      const bang = -0.12 * flip, bcx = cx - flip * RX * 0.42, bcy = cy + RY * 0.8;
      const inB = (g, fn) => { g.save(); g.translate(bcx, bcy); g.rotate(bang); g.scale(1.35, 1.35); fn(g); g.restore(); };
      const glass = g => { g.beginPath(); g.moveTo(-120, -30); g.quadraticCurveTo(-130, 0, -120, 30); g.lineTo(40, 30); g.quadraticCurveTo(70, 26, 82, 13); g.lineTo(122, 12); g.lineTo(122, -12); g.lineTo(82, -13); g.quadraticCurveTo(70, -26, 40, -30); g.closePath(); };
      for (const g of [A, B]) inB(g, h => { h.globalCompositeOperation = 'destination-out'; glass(h); h.lineWidth = 22; h.fill(); h.stroke(); });
      inB(A, h => { glass(h); h.clip(); h.globalAlpha = 0.32; h.fillRect(-140, -40, 280, 80); h.globalAlpha = 1; h.globalCompositeOperation = 'destination-out'; h.fillRect(-82, -16, 96, 32); h.beginPath(); h.ellipse(-30, -19, 70, 5, 0, 0, 7); h.fill(); });
      inB(B, h => { h.lineWidth = 4; for (let k = 0; k < 3; k++) { h.beginPath(); h.moveTo(-70, -8 + k * 8); h.lineTo(0, -8 + k * 8); h.stroke(); } h.lineWidth = 6; h.strokeRect(-82, -16, 96, 32); h.beginPath(); h.moveTo(-40, -16); h.lineTo(-40, 16); h.stroke(); });
      inB(A, h => { h.fillRect(118, -14, 30, 28); });
      inB(B, h => { h.lineWidth = 9; glass(h); h.stroke(); h.lineWidth = 6; h.strokeRect(118, -14, 30, 28); });
    } else if (rider.n === 'Hermit Crab') {
      const hx = cx + flip * RX * 0.72, hy = topAt(cx + flip * RX * 0.72) + 10;
      A.beginPath(); A.arc(hx, hy - 60, 66, 0, 7); A.fill();
      B.lineWidth = 9; B.beginPath(); for (let t = 0; t < 12; t += 0.1) { const r = 6 + t * 4.6; B.lineTo(hx + Math.cos(t) * r, hy - 60 + Math.sin(t) * r); } B.stroke();
      B.beginPath(); B.ellipse(hx - flip * 70, hy - 20, 26, 20, 0, 0, 7); B.fill();
      B.beginPath(); B.moveTo(hx - flip * 60, hy - 34); B.lineTo(hx - flip * 56, hy - 70); B.moveTo(hx - flip * 80, hy - 34); B.lineTo(hx - flip * 86, hy - 68); B.stroke();
      B.beginPath(); B.arc(hx - flip * 56, hy - 74, 8, 0, 7); B.arc(hx - flip * 86, hy - 72, 8, 0, 7); B.fill();
    }

    if (setting === 'Pair') {
      // a little sibling pebble alongside, printed the same way
      const sx3 = cx + flip * (RX + 112), sy3 = cy + RY * 0.58, srx = 100, sry = 74;
      const sib = g => { g.beginPath(); g.ellipse(sx3, sy3, srx, sry, 0.1 * flip, 0, 7); };
      halftone(B, () => { B.beginPath(); B.ellipse(sx3 + 26, sy3 + sry * 0.85, srx * 0.85, 22, 0, 0, 7); }, () => 0.8, 9, 5.2, 0.6);
      for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; sib(g); g.lineWidth = 24; g.fill(); g.stroke(); g.restore(); }
      sib(A); A.fill();
      halftone(B, () => sib(B), (x, y) => ((x - sx3) / srx + (y - sy3) / sry) * 0.55 + 0.05, 13, 6, 0.26, [sx3 - srx - 12, sy3 - sry - 12, sx3 + srx + 12, sy3 + sry + 12]);
      B.lineWidth = 12; sib(B); B.stroke();
      B.lineWidth = 8;
      for (const s2 of [-1, 1]) { B.beginPath(); B.arc(sx3 + s2 * 30 - flip * 8, sy3 - 10, 9, 0, 7); B.fill(); }
      B.beginPath(); B.arc(sx3 - flip * 8, sy3 + 8, 16, 0.4, Math.PI - 0.4); B.stroke();
      for (const g of [A, B]) { g.save(); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.ellipse(sx3 - srx * 0.45, sy3 - sry * 0.5, 16, 7, -0.6, 0, 7); g.fill(); g.restore(); }
    }

    // ---------- eyes: one ink-B layer for open, one for shut ----------
    const eyeLayer = (open) => {
      const [cv, g] = layer();
      g.drawImage(cvB, 0, 0, 1000, 1000);
      g.fillStyle = K; g.strokeStyle = K; g.lineWidth = 13;
      if (egg) {
        // the hatchling's two eyes in the hole, the far one smaller as it turns to look out
        for (const [ex, ey2, r] of [[holeX + flip * holeRX * 0.22, holeY + holeRY * 0.22, 1], [holeX - flip * holeRX * 0.2, holeY + holeRY * 0.18, 0.8]]) {
          g.beginPath();
          if (open) { g.ellipse(ex, ey2, 14 * r, 18 * r, 0, 0, 7); g.fill(); g.save(); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.arc(ex + 4 * r, ey2 - 7 * r, 5 * r, 0, 7); g.fill(); g.restore(); }
          else { g.lineWidth = 7; g.arc(ex, ey2 - 6, 14 * r, 0.4, Math.PI - 0.4); g.stroke(); }
        }
        return cv;
      }
      g.save(); g.translate(fx, ey); g.scale(fs, fs);
      const E = eyes.n;
      const pts2 = E === 'Cyclops' ? [0] : [-gap / fs, gap / fs];
      for (const ox of pts2) {
        g.save(); g.translate(ox, 0);
        const look = glanceX * 40;
        if (open && E === 'Wide Awake') { g.lineWidth = 8; g.beginPath(); g.arc(0, 0, 30, 0, 7); g.stroke(); g.beginPath(); g.arc(look * 0.5, 2, 12, 0, 7); g.fill(); g.restore(); continue; }
        if (E === 'Lashes') { g.beginPath(); g.arc(0, -8, 26, 0.3, Math.PI - 0.3); g.stroke(); g.lineWidth = 7; for (const a of [0.9, 1.57, 2.25]) { g.beginPath(); g.moveTo(Math.cos(a) * 26, -8 + Math.sin(a) * 26); g.lineTo(Math.cos(a) * 40, -8 + Math.sin(a) * 40); g.stroke(); } g.restore(); continue; }
        if (open && E === 'Teary') {
          g.beginPath(); g.ellipse(0, 0, 30, 36, 0, 0, 7); g.fill();
          g.save(); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.arc(10, -14, 11, 0, 7); g.fill(); g.beginPath(); g.arc(-9, 13, 6, 0, 7); g.fill(); g.restore();
          if (ox > 0) { g.lineWidth = 6; g.beginPath(); g.moveTo(20, 34); g.quadraticCurveTo(34, 58, 24, 66); g.quadraticCurveTo(12, 60, 20, 34); g.stroke(); }
          g.restore(); continue;
        }
        if (!open && E !== 'Content') { g.beginPath(); g.arc(0, -8, 26, 0.3, Math.PI - 0.3); g.stroke(); g.restore(); continue; }
        if (E === 'Beady') { g.beginPath(); g.ellipse(0, 0, 17, 22, 0, 0, 7); g.fill(); }
        else if (E === 'Big Shiny' || E === 'Cyclops') {
          const s = E === 'Cyclops' ? 1.6 : 1;
          g.beginPath(); g.ellipse(0, 0, 32 * s, 38 * s, 0, 0, 7); g.fill();
          g.save(); g.globalCompositeOperation = 'destination-out';
          g.beginPath(); g.arc(10 * s, -14 * s, 11 * s, 0, 7); g.fill(); g.beginPath(); g.arc(-10 * s, 14 * s, 5 * s, 0, 7); g.fill();
          g.restore();
        } else if (E === 'Content') { g.beginPath(); g.arc(0, 12, 26, Math.PI + 0.35, -0.35); g.stroke(); }
        else if (E === 'Side-Eye') {
          g.lineWidth = 9; g.beginPath(); g.ellipse(0, 0, 34, 26, 0, 0, 7); g.stroke();
          g.beginPath(); g.arc(flip * 16, 4, 14, 0, 7); g.fill();
          g.lineWidth = 11; g.beginPath(); g.moveTo(-36, -30); g.lineTo(36, -26); g.stroke();
        } else if (E === 'Droopy') {
          g.beginPath(); g.ellipse(0, 4, 24, 26, 0, 0, 7); g.fill();
          g.save(); g.globalCompositeOperation = 'destination-out'; g.fillRect(-40, -40, 80, 34); g.restore();
          g.lineWidth = 9; g.beginPath(); g.moveTo(-30, -6); g.lineTo(30, -6); g.stroke();
        } else if (E === 'Starry') {
          g.beginPath();
          for (let i = 0; i < 10; i++) { const r = i % 2 ? 13 : 34, an = -Math.PI / 2 + i * Math.PI / 5; g.lineTo(Math.cos(an) * r, Math.sin(an) * r); }
          g.closePath(); g.fill();
        }
        g.restore();
      }
      g.restore();
      return cv;
    };

    // ---------- grain and compositing ----------
    const grain = document.createElement('canvas'); grain.width = grain.height = S;
    const gg = grain.getContext('2d'), id = gg.createImageData(S, S), px = id.data;
    for (let y = 0, i = 3; y < S; y++) for (let x = 0; x < S; x++, i += 4) {
      let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + grainSeed | 0;
      h = Math.imul(h ^ h >>> 13, 1274126177); h ^= h >>> 16;
      const v = h & 255;
      px[i] = v < 34 ? 150 + (v & 63) : (v & 31) + 10;
    }
    gg.putImageData(id, 0, 0);
    const inked = (src, col) => {
      const cv = document.createElement('canvas'); cv.width = cv.height = S;
      const g = cv.getContext('2d');
      g.drawImage(src, 0, 0);
      g.globalCompositeOperation = 'source-in'; g.fillStyle = col; g.fillRect(0, 0, S, S);
      g.globalCompositeOperation = 'destination-out'; g.drawImage(grain, 0, 0);
      return cv;
    };
    const inkA = inked(cvA, inks.A);
    const compose = (bLayer) => {
      const cv = document.createElement('canvas'); cv.width = cv.height = S;
      const g = cv.getContext('2d');
      g.fillStyle = paper.c; g.fillRect(0, 0, S, S);
      g.globalCompositeOperation = 'multiply';
      g.drawImage(inkA, offA[0] * u, offA[1] * u);
      g.drawImage(inked(bLayer, inks.B), offB[0] * u, offB[1] * u);
      // paper tooth
      g.globalCompositeOperation = 'source-over'; g.globalAlpha = 0.05; g.drawImage(grain, 0, 0); g.globalAlpha = 1;
      return cv;
    };
    const open = compose(eyeLayer(true)), shut = compose(eyeLayer(false));

    const ctx = c.ctx;
    let shown = null;
    const show = t => {
      const p = (t + blinkOff) % 4.6;
      const img = p > 4.45 ? shut : open;
      if (img !== shown) { ctx.drawImage(img, 0, 0); shown = img; }
    };
    ctx.drawImage(shut, 0, 0); // touch the closed-eye print once so the first blink or tap doesn't stall
    show(0);

    // ---------- the viewer skips pebbles over the print ----------
    // a separate xorshift on the last hash word keeps the stone's own draws as they were
    let xs = (parseInt(c.hash.slice(58, 66), 16) ^ 0x2545f491) >>> 0 || 3;
    const xr = () => { xs ^= xs << 13; xs >>>= 0; xs ^= xs >>> 17; xs ^= xs << 5; xs >>>= 0; return xs * 2.3283064365386963e-10; };
    const tonic = 67 + Math.floor(xr() * 6), mode = xr() < 0.6 ? [0, 2, 4, 7, 9, 12, 14] : [0, 3, 5, 7, 10, 12, 15];
    const skips = [], wakes = [];
    let flinch = 0, busy = false, tStone = 0;
    const onStone = (x, y) => Math.hypot((x - cx) / RX, (y - cy) / RY) < 0.95 || (geode && Math.hypot((x - hcx) / HRX, (y - hcy) / HRY) < 0.95);
    // skips run along the water or the shore band under the stone, never up in the sky: a tap anywhere
    // picks a lane in that band (higher taps skip further back, nearer the horizon line)
    const laneTop = Math.min(940, (setting === 'Wading' ? cy + RY * 0.42 : groundY) + 40), laneBot = 962;
    const throwFrom = (x, y0) => {
      const y = y0 >= laneTop ? Math.min(laneBot, y0) : laneTop + (laneBot - laneTop) * 0.45 * Math.max(0, y0) / laneTop;
      if (onStone(x, y)) x = cx + (x < cx ? -1 : 1) * RX * 1.02; // start off the stone's edge
      const dir = x < cx ? -1 : 1, hops = [];   // skip away from the stone, out over the paper
      let px = x, len = 120 + xr() * 50;
      for (let i = 0; i < 4; i++) { hops.push([px, px + dir * len, 0.34 - i * 0.05, 60 / (i + 1)]); px += dir * len; len *= 0.68; }
      skips.push({ y, hops, age: 0, hop: 0 });
    };
    const inkStroke = (x, y, rx, ry, a) => {
      ctx.globalAlpha = a;
      ctx.strokeStyle = inks.B; ctx.lineWidth = 9 * u;
      ctx.setLineDash([2 * u, 13 * u]); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.ellipse((x + offB[0]) * u, (y + offB[1]) * u, rx * u, ry * u, 0, 0, 7); ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = inks.A; ctx.lineWidth = 6 * u;
      ctx.beginPath(); ctx.ellipse((x + offA[0]) * u, (y + offA[1]) * u, rx * 0.8 * u, ry * 0.8 * u, 0, 0, 7); ctx.stroke();
    };
    const overlay = dt => {
      ctx.save();
      ctx.globalCompositeOperation = 'multiply'; // inks overprint like a riso drum
      for (let i = wakes.length - 1; i >= 0; i--) {
        const r = wakes[i]; r.age += dt;
        const k2 = r.age / 1.4;
        if (k2 >= 1) { wakes.splice(i, 1); continue; }
        inkStroke(r.x, r.y, 24 + k2 * 150 * r.s, (24 + k2 * 150 * r.s) * 0.34, (1 - k2) * 0.95);
      }
      for (let i = skips.length - 1; i >= 0; i--) {
        const sk = skips[i]; sk.age += dt;
        let tt = sk.age, h = 0;
        while (h < sk.hops.length && tt > sk.hops[h][2]) { tt -= sk.hops[h][2]; h++; }
        if (h > sk.hop) {   // a landing: a ring and a plip, each higher and softer
          const land = sk.hops[sk.hop];
          wakes.push({ x: land[1], y: sk.y, age: 0, s: 1 - sk.hop * 0.18 });
          c.sound.note(tonic + mode[Math.min(mode.length - 1, sk.hop + 1)], { dur: 0.14, vel: 0.34 - sk.hop * 0.06, wave: 'sine', pan: (land[1] - 500) / 700 });
          sk.hop = h;
        }
        if (h >= sk.hops.length) { skips.splice(i, 1); continue; }
        const [x0, x1, d, ht] = sk.hops[h], f = tt / d;
        const x = x0 + (x1 - x0) * f, y = sk.y - Math.sin(f * Math.PI) * ht;
        ctx.globalAlpha = 1;
        ctx.fillStyle = inks.A;
        ctx.beginPath(); ctx.ellipse((x + offA[0]) * u, (y + offA[1]) * u, 20 * u, 13 * u, 0.2, 0, 7); ctx.fill();
        ctx.strokeStyle = inks.B; ctx.lineWidth = 6 * u;
        ctx.beginPath(); ctx.ellipse((x + offB[0]) * u, (y + offB[1]) * u, 20 * u, 13 * u, 0.2, 0, 7); ctx.stroke();
      }
      ctx.restore();
    };
    // ---------- the legendaries, drawn over the print each frame ----------
    // the turtle egg cracks a little more with each tap and hatches on the third; the geode glints
    let crack = 0, hatchAt = -9, chirpAt = -9, knockAt = -9, knocks = [], glintAt = -9, nextGlint = 0, ringAt = -9, hov = false, hx = 0, hy = 0;
    const crackPts = [];
    for (let i = 0; i <= 8; i++) { const x = cx - RX * 0.5 + i * RX / 8; crackPts.push([x, topAt(x) + RY * 0.76 + (i % 2 ? -RY * 0.07 : RY * 0.05)]); }
    const crackY = crackPts[4][1];
    const rim = i => { const P = geode ? hpts : pts, ox = geode ? hcx : cx, oy = geode ? hcy : cy, p = P[((i % 160) + 160) % 160]; return [ox + (p[0] - ox) * (geode ? 0.6 : 0.53), oy + (p[1] - oy) * (geode ? 0.6 : 0.53)]; };
    const star = (x, y, r) => { ctx.beginPath(); for (let j = 0; j < 8; j++) { const an = j * Math.PI / 4, rr = j % 2 ? r * 0.22 : r; ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); };
    const legendOverlay = t => {
      ctx.save(); ctx.scale(u, u); ctx.globalCompositeOperation = 'multiply'; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      if (legend === 'Geode') {
        const show2 = [];
        if (hov && t - glintAt < 0.7) { const k = Math.round((geode ? Math.atan2((hy - hcy) / HRY, (hx - hcx) / HRX) : Math.atan2((hy - cy) / RY, (hx - cx) / RX)) / (Math.PI * 2) * 160); for (const d2 of [0, -9, 9]) show2.push([rim(k + d2), 1 - (t - glintAt) / 0.7, d2 ? 0.6 : 1]); }
        if (t - ringAt < 1.4) for (let j = 0; j < 12; j++) { const f = (t - ringAt) * 9 - j * 0.6; if (f > 0 && f < 3) show2.push([rim(j * 13 + 5), 1 - f / 3, 0.8]); }
        for (const [[x, y], a, s] of show2) {
          const r = 50 * s * (0.5 + 0.5 * Math.sin(Math.min(1, a) * Math.PI));
          ctx.globalAlpha = Math.min(1, a * 1.4);
          ctx.fillStyle = inks.A; star(x + offA[0], y + offA[1], r); ctx.fill();
          ctx.strokeStyle = inks.B; ctx.lineWidth = 3.5; star(x + offB[0], y + offB[1], r); ctx.stroke();
        }
      }
      if (legend === 'Turtle Egg') {
        for (const k of knocks) { const a = 1 - (t - k[2]) / 0.6; if (a <= 0) continue; ctx.globalAlpha = a; ctx.strokeStyle = inks.B; ctx.lineWidth = 5; ctx.beginPath(); for (let j = 0; j < 4; j++) { const an = j * 1.57 + k[3]; ctx.moveTo(k[0] + offB[0], k[1] + offB[1]); ctx.lineTo(k[0] + offB[0] + Math.cos(an) * 16, k[1] + offB[1] + Math.sin(an) * 16); } ctx.stroke(); }
        ctx.globalAlpha = 1;
        if (crack > 0 && crack < 3) {
          const n = crack === 1 ? 4 : 7;
          ctx.strokeStyle = inks.B; ctx.lineWidth = 7; ctx.beginPath();
          for (let i = 0; i <= n; i++) { const p = crackPts[i + (crack === 1 ? 2 : 1)]; i ? ctx.lineTo(p[0] + offB[0], p[1] + offB[1]) : ctx.moveTo(p[0] + offB[0], p[1] + offB[1]); }
          ctx.stroke();
        }
        if (crack >= 3) {
          const age = t - hatchAt, pop = Math.min(1, age / 0.5), flap = Math.sin(t * (hov || t - chirpAt < 1 ? 14 : 3)) * 0.35;
          // where the shell came away: bare paper, and the dark inside
          ctx.save(); stonePath(ctx); ctx.clip();
          ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = paper.c; ctx.beginPath();
          crackPts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.lineTo(crackPts[8][0], topY - 60); ctx.lineTo(crackPts[0][0], topY - 60); ctx.closePath(); ctx.fill();
          ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = inks.B; ctx.globalAlpha = 0.35;
          ctx.beginPath(); ctx.ellipse(cx, crackY, RX * 0.46, RY * 0.12, 0, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
          ctx.restore();
          ctx.strokeStyle = inks.B; ctx.lineWidth = 9; ctx.beginPath();
          crackPts.forEach((p, i) => i ? ctx.lineTo(p[0] + offB[0], p[1] + offB[1]) : ctx.moveTo(p[0] + offB[0], p[1] + offB[1])); ctx.stroke();
          // the hatchling: a little head and two flippers up out of the shell
          const hy0 = crackY - 30 - pop * 50;
          for (const s of [-1, 1]) {
            ctx.save(); ctx.translate(cx + s * 78, crackY - 18 - pop * 16); ctx.rotate(s * (0.5 + flap));
            ctx.fillStyle = inks.A; ctx.beginPath(); ctx.ellipse(s * 30, 0, 40, 15, 0, 0, 7); ctx.fill();
            ctx.strokeStyle = inks.B; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(s * 30 + offB[0] * 0.5, offB[1] * 0.5, 40, 15, 0, 0, 7); ctx.stroke();
            ctx.restore();
          }
          ctx.fillStyle = inks.A; ctx.beginPath(); ctx.ellipse(cx, hy0, 88, 70, 0, 0, 7); ctx.fill();
          ctx.strokeStyle = inks.B; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(cx + offB[0], hy0 + offB[1], 88, 70, 0, 0, 7); ctx.stroke();
          ctx.fillStyle = inks.B;
          const blinkE = (t + 1.3) % 3.1 < 0.15;
          for (const s of [-1, 1]) { ctx.beginPath(); if (blinkE) ctx.ellipse(cx + s * 32, hy0 - 6, 12, 3.5, 0, 0, 7); else ctx.ellipse(cx + s * 32, hy0 - 8, 11, 15, 0, 0, 7); ctx.fill(); }
          ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(cx, hy0 + 10, 22, 0.35, Math.PI - 0.35); ctx.stroke();
          // the lid of shell sits on its head like a cap
          ctx.save(); ctx.translate(cx, hy0 - 52); ctx.rotate(-0.22 * flip);
          ctx.beginPath(); crackPts.forEach((p, i) => { const x = (p[0] - cx) * 0.8, y = (p[1] - crackY) * 0.8; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.quadraticCurveTo(0, -RY * 0.36, (crackPts[0][0] - cx) * 0.8, (crackPts[0][1] - crackY) * 0.8); ctx.closePath();
          ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = paper.c; ctx.fill();
          ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = inks.A; ctx.globalAlpha = 0.18; ctx.fill(); ctx.globalAlpha = 1;
          ctx.strokeStyle = inks.B; ctx.lineWidth = 7; ctx.stroke();
          ctx.restore();
        }
      }
      ctx.restore();
    };
    const legendTap = (x, y, t) => {
      if (legend === 'Geode') {
        if (t - ringAt < 0.6) return;
        ringAt = t;
        [12, 16, 19, 24].forEach((n, i) => c.sound.note(tonic + n - 12, { dur: 1.3 - i * 0.2, vel: 0.12, wave: 'sine', at: i * 0.06 }));
      } else {
        if (t - chirpAt < 0.35) return;
        chirpAt = t;
        if (crack < 3) {
          crack++;
          c.sound.hit('noise', 0.12, { cutoff: 3200, dur: 0.07 });
          c.sound.note(tonic - 12 + crack * 2, { dur: 0.12, vel: 0.2, wave: 'triangle', cutoff: 1200 });
          if (crack === 3) { hatchAt = t; mode.slice(0, 5).forEach((n, i) => c.sound.note(tonic + 12 + n, { dur: 0.1, vel: 0.12, wave: 'sine', at: 0.25 + i * 0.08 })); }
        } else [0, 2, 4, 2].forEach((m, i) => c.sound.note(tonic + 12 + mode[m], { dur: 0.08, vel: 0.11, wave: 'sine', at: i * 0.07 }));
      }
    };
    const legendHover = t => {
      const inp = c.input;
      hov = inp.inside && onStone(inp.x * 1000, inp.y * 1000);
      hx = inp.x * 1000; hy = inp.y * 1000;
      if (legend === 'Geode' && hov && t >= nextGlint) { nextGlint = t + 0.75; glintAt = t; c.sound.note(tonic + 24 + mode[Math.floor(xr() * 4)], { dur: 0.25, vel: 0.04, wave: 'sine' }); }
      if (legend === 'Turtle Egg' && hov && crack < 3 && t - knockAt > 1.3) {
        // something inside knocks back
        knockAt = t;
        const an = xr() * Math.PI;
        knocks.push([cx + Math.cos(an) * RX * 0.4 * (xr() < 0.5 ? -1 : 1), cy - RY * (0.3 + xr() * 0.35), t, xr()]);
        if (knocks.length > 3) knocks.shift();
        c.sound.hit('click', 0.1); c.sound.hit('click', 0.07, { at: 0.13 });
      }
    };
    const onBottle = (x, y) => rider.n === 'Message in a Bottle' && Math.hypot(x - (cx - flip * RX * 0.42), (y - (cy + RY * 0.8)) * 2.4) < 150;
    return t => {
      const dt = Math.max(0, Math.min(0.1, t - tStone)); tStone = t;
      if (legend) legendHover(t);
      for (const flick of c.input.taps()) {
        const x = flick.x * 1000, y = flick.y * 1000;
        if (legend && onStone(x, y)) { legendTap(x, y, t); continue; }
        if (onBottle(x, y)) {
          // the cork pops and the glass rings
          c.sound.hit('blip', 0.16, { freq: 900 });
          c.sound.note(tonic + 12 + mode[2], { dur: 0.6, vel: 0.1, wave: 'sine', at: 0.1 });
          c.sound.note(tonic + 12 + mode[4], { dur: 0.8, vel: 0.08, wave: 'sine', at: 0.22 });
          wakes.push({ x: cx - flip * RX * 0.42, y: cy + RY * 0.8, age: 0, s: 0.8 });
          continue;
        }
        if (onStone(x, y)) {
          flinch = 0.32;
          c.sound.note(tonic - 12, { dur: 0.18, vel: 0.3, wave: 'triangle', cutoff: 900 });
          c.sound.hit('click', 0.25);
        } else if (skips.length < 4) {
          throwFrom(x, y);
          c.sound.hit('click', 0.18);
        }
      }
      flinch = Math.max(0, flinch - dt);
      const legLive = legend === 'Geode' ? hov || t - ringAt < 1.5 || t - glintAt < 0.8 : legend === 'Turtle Egg' ? hov || crack > 0 || t - knockAt < 0.7 : false;
      const live = skips.length || wakes.length || flinch > 0 || legLive;
      if (!live && !busy) return show(t);
      const img = flinch > 0 ? shut : (t + blinkOff) % 4.6 > 4.45 ? shut : open;
      ctx.drawImage(img, 0, 0); shown = img;
      if (legend) legendOverlay(t);
      if (skips.length || wakes.length) overlay(dt);
      busy = live;
      if (!live) shown = null;
    };
  },
});

})(window.Proto);
