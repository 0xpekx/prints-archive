// One Line: from D:/code/synaesthesia/public/drop03/pieces/041.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// 041 One Line: a continuous-line portrait over loose flat washes of colour, set
// as pixel art on a 64 x 64 grid. The jaw, temple, brow and nose are one unbroken
// one-cell pixel line; the washes sit a little off it as flat cells with a pooled
// rim (or a dithered bleed), and the eyes are placed cell by cell.
// The first rolls keep their sfc32 draws; the later variety (pen, face build,
// features, more hair, accents and grounds) comes from a separate splitmix-style
// stream on the hash's middle words, so earlier sitters keep their look.
Proto.add({
  num: 41,
  name: 'One Line',
  fam: 'Faces & People',
  recipe: 'Each hash is a new person drawn in one pixel line over offset washes of flat colour, on a 64-cell grid. The pen (one cell, two, swelling or thick-and-thin), face shape, nose, lips, brows, eyes, facial hair, head tilt, hair, neckline, accent, skin wash, wash style, ink and ground all vary. About one in 200 keeps a golden brush behind the ear; about one in 450 is legendary: gilded on lacquer, printed as a cyanotype, or carved in marble.',
  interactive: 'Tap to drop watercolour; the sitter watches your pointer.',
  music: true,
  seed: 0,
  make(c) {
    const S = c.size, ctx = c.ctx, hx = c.hash.slice(2);

    // sfc32, seeded from four words of the hash
    let A = parseInt(hx.slice(0, 8), 16) >>> 0, B = parseInt(hx.slice(8, 16), 16) >>> 0;
    let C = parseInt(hx.slice(16, 24), 16) >>> 0, D = parseInt(hx.slice(24, 32), 16) >>> 0;
    const rnd = () => {
      A >>>= 0; B >>>= 0; C >>>= 0; D >>>= 0; let t = (A + B) | 0;
      A = B ^ (B >>> 9);
      B = (C + (C << 3)) | 0;
      C = (C << 21) | (C >>> 11);
      D = (D + 1) | 0;
      t = (t + D) | 0;
      C = (C + t) | 0;
      return (t >>> 0) / 4294967296; }; for (let warm = 15; warm > 0; warm--) rnd();
    const span = (lo, hi) => lo + (hi - lo) * rnd(); const weighted = (opts, from) => {
      const r0 = from || rnd;
      let sum = 0; for (const o of opts) sum += o[1];
      let r = r0() * sum;
      for (const o of opts) { r -= o[1]; if (r <= 0) return o[0]; } return opts[opts.length - 1][0];
    };

    // ---------- the original rolls, in their original order ----------
    const grounds = {
      Bone: '#f1ebdf', Blush: '#f3dcd3', Sage: '#dde5d2', Sky: '#d8e5ee', Butter: '#f4e8bd', Lilac: '#e6ddf0', Night: '#1d2232',
      Terracotta: '#e9c4ad', Mint: '#d6eee4', Newsprint: '#e9e6dc', Kraft: '#d8c2a0', Graph: '#f4f6f2',
    };
    let ground = weighted([['Bone', 22], ['Blush', 16], ['Sage', 16], ['Sky', 16], ['Butter', 13], ['Lilac', 12], ['Night', 5]]);
    const inks = { Ink: '#1c1a19', Indigo: '#24306c', Rust: '#8a3820', Gold: '#b88a24', Graphite: '#4a4a50', Forest: '#24523c' };
    let ink = weighted([['Ink', 55], ['Indigo', 22], ['Rust', 15], ['Gold', 8]]);
    const skins = [['Fair', '#f2d4be'], ['Light', '#e9bb98'], ['Medium', '#d39b6c'], ['Tan', '#b67a4f'], ['Brown', '#8a5638'], ['Deep', '#5c3826']];
    const skin = skins[Math.floor(rnd() * skins.length)]; let hair = weighted([['Bun', 14], ['Bob', 14], ['Waves', 14], ['Cloud', 14], ['Crop', 14], ['Braids', 12], ['Ponytail', 12], ['Bare', 6]]);
    let gaze = weighted([['Open', 52], ['Dreaming', 24], ['Sidelong', 14], ['Wink', 10]]);
    const neck = weighted([['Crew', 26], ['V-neck', 22], ['Turtleneck', 18], ['Collar', 18], ['Bare shoulders', 16]]);
    let accent = weighted([['None', 36], ['Hoop', 18], ['Flower', 16], ['Glasses', 16], ['Beauty mark', 9], ['Butterfly', 5]]);
    const washes = ['#e4775f', '#e8b04a', '#4f7fc4', '#6fb39a', '#a585c9', '#e690a8', '#2f3a63', '#c45a3b'];
    const hairWash = washes[Math.floor(rnd() * washes.length)];
    let clothWash = washes[Math.floor(rnd() * washes.length)];
    if (clothWash === hairWash) clothWash = washes[(washes.indexOf(hairWash) + 3) % washes.length];
    const facing = rnd() < 0.5 ? 1 : -1;

    // ---------- the new variety: a splitmix-style stream from the hash's middle ----------
    let sp = (parseInt(hx.slice(32, 40), 16) ^ Math.imul(parseInt(hx.slice(40, 48), 16), 0x632be5ab)) >>> 0;
    const nxt = () => {
      sp = (sp + 0x7f4a7c15) >>> 0;
      let z = sp ^ (sp >>> 15); z = Math.imul(z, 0x2c1b3c6d) >>> 0; z ^= z >>> 12; z = Math.imul(z, 0x297a2d39) >>> 0; z ^= z >>> 15;
      return (z >>> 0) / 4294967296; };
    for (let warm2 = 0; warm2 < 10; warm2++) nxt();
    const maybe = (p, opts) => { const a = nxt(), b = weighted(opts, nxt); return a < p ? b : null; };
    ground = maybe(0.3, [['Terracotta', 26], ['Mint', 26], ['Newsprint', 22], ['Kraft', 20], ['Graph', 6]]) || ground;
    ink = maybe(0.18, [['Forest', 60], ['Graphite', 40]]) || ink;
    hair = maybe(0.42, [['Afro Puffs', 12], ['Long Straight', 14], ['Side Part', 14], ['Top Knot', 10], ['Locs', 12], ['Headwrap', 12], ['Undercut', 12], ['Beanie', 8], ['Shaved', 6]]) || hair;
    gaze = maybe(0.3, [['Lashes', 30], ['Laughing', 26], ['Looking Up', 22], ['Downcast', 22]]) || gaze;
    accent = maybe(0.36, [['Pearl Earring', 20], ['Nose Ring', 16], ['Freckles', 20], ['Headphones', 14], ['Pencil', 16], ['Bird', 6], ['Moon Earring', 8]]) || accent;
    const pen = weighted([['Fineliner', 44], ['Brush Pen', 26], ['Dip Pen', 18], ['Marker', 12]], nxt);
    const faceShape = weighted([['Oval', 30], ['Round', 18], ['Long', 16], ['Square', 18], ['Heart', 18]], nxt);
    const noseK = weighted([['Straight', 34], ['Button', 22], ['Roman', 22], ['Snub', 22]], nxt);
    const lipK = weighted([['Soft', 34], ['Full', 22], ['Thin', 16], ['Smile', 16], ['Pout', 12]], nxt);
    const browK = weighted([['Arched', 36], ['Straight', 26], ['Bold', 22], ['Raised', 16]], nxt);
    const facialHair = weighted([['None', 66], ['Stubble', 10], ['Moustache', 9], ['Full Beard', 9], ['Goatee', 6]], nxt);
    const tiltK = weighted([['Upright', 50], ['Tilted', 30], ['Chin Up', 20]], nxt);
    const washStyle = weighted([['Loose', 46], ['Bold Blocks', 20], ['Wet Bleed', 20], ['One Colour', 10], ['Gold Flecks', 4]], nxt);
    const extra = []; for (let k = 0; k < 24; k++) extra.push([nxt(), nxt()]);
    const night = ground === 'Night';
    const lineCol = night ? (ink === 'Gold' ? '#e2b84a' : '#f3ece0') : inks[ink];
    if (night && ink !== 'Gold') ink = 'Chalk';

    // ---------- the legendaries and the coveted brush: their own LCG on the hash's seventh word ----------
    // (rolled apart from everything above, so ordinary sitters and the opening one keep their look)
    let lg = (parseInt(hx.slice(48, 56), 16) ^ 0x9e3779b9) >>> 0;
    const lcg = () => { lg = (Math.imul(lg, 1664525) + 1013904223) >>> 0; let z = lg ^ (lg >>> 16); z = Math.imul(z, 0x45d9f3b) >>> 0; z ^= z >>> 16; return (z >>> 0) / 4294967296; };
    lcg(); lcg();
    const lroll = lcg(), legend = lroll < 0.00077 ? 'Gold Leaf' : lroll < 0.00154 ? 'Cyanotype' : lroll < 0.0023 ? 'Marble' : null;
    const brushOwned = lcg() < 0.005;
    if (brushOwned && (accent === 'Pencil' || accent === 'Headphones')) accent = 'None';   // the brush takes that ear

    c.trait('Ground', legend === 'Gold Leaf' ? 'Lacquer' : legend === 'Cyanotype' ? 'Sunprint' : legend === 'Marble' ? 'Gallery' : ground);
    c.trait('Skin wash', legend ? legend : skin[0]); c.trait('Wash style', washStyle);
    c.trait('Pen', pen); c.trait('Ink', legend === 'Gold Leaf' ? 'Gold' : legend === 'Cyanotype' ? 'Bleach' : legend === 'Marble' ? 'Chisel' : ink);
    c.trait('Face', faceShape); c.trait('Tilt', tiltK);
    c.trait('Hair', hair); c.trait('Brows', browK); c.trait('Gaze', gaze); c.trait('Nose', noseK); c.trait('Lips', lipK);
    c.trait('Facial hair', facialHair); c.trait('Neckline', neck); c.trait('Accent', accent);
    if (brushOwned) c.trait('Coveted', 'Golden Brush');
    if (legend) c.trait('Legendary', legend);

    // ---------- face shape ----------
    const jaw = span(0.88, 1.1), chin = span(0.9, 1.12), nose = span(0.85, 1.2), lips = span(0.85, 1.2);
    const eyeW = span(0.85, 1.15), browLift = span(-10, 10);
    const jit = () => span(-5, 5);
    const P = (x, y) => [x + jit() * 0.4, y + jit() * 0.4];

    const contour = [
      P(-150 * jaw, -10), P(-146 * jaw, 60), P(-120 * jaw, 130 * chin), P(-62 * jaw, 186 * chin), P(4, 206 * chin),
      P(70 * jaw, 176 * chin), P(122 * jaw, 112), P(148 * jaw, 30), P(156, -46), P(150, -88), P(128, -108 + browLift),
      P(98, -96 + browLift), P(66, -84 + browLift), P(44, -42), P(52 * nose, 8 * nose), P(84 * nose, 50 * nose),
      P(62 * nose, 66 * nose), P(34, 58 * nose),
    ];
    const brow = [P(-125, -84 + browLift), P(-80, -102 + browLift), P(-26, -90 + browLift)];
    const ear = [P(-150, -52), P(-184, -60), P(-192, -4), P(-170, 38), P(-148, 34)];
    const my = 118 * chin;
    const lipTop = [P(-28 * lips, my), P(-2, my - 9), P(14, my - 3), P(30, my - 10), P(58 * lips, my - 2)];
    const lipLow = [P(-12 * lips, my + 16), P(20, my + 30 * lips), P(48 * lips, my + 14)];
    const neckL = [P(-84 * jaw, 165 * chin), P(-92, 250), P(-96, 330)];
    const neckR = [P(78 * jaw, 150 * chin), P(84, 240), P(86, 320)];
    const shoulderL = [P(-96, 318), P(-260, 360), P(-410, 430), P(-500, 560)];
    const shoulderR = [P(86, 310), P(250, 352), P(400, 420), P(500, 560)];

    // the new face build, applied to the rolled outline
    const FS = { Oval: [1, 1], Round: [1.07, 0.92], Long: [0.94, 1.12], Square: [1.09, 0.97], Heart: [0.93, 1.05] }[faceShape];
    for (let i = 0; i <= 7; i++) { contour[i][0] *= FS[0]; if (i >= 1) contour[i][1] = contour[i][1] > 0 ? contour[i][1] * FS[1] : contour[i][1]; }
    if (faceShape === 'Square') { contour[2][0] *= 1.08; contour[6][0] *= 1.06; contour[3][1] += 8; contour[5][1] += 10; }
    if (faceShape === 'Heart') { contour[3][0] *= 0.86; contour[5][0] *= 0.86; contour[4][1] += 10; contour[7][0] *= 1.05; }
    const chinY = contour[4][1];
    if (noseK === 'Roman') { contour[13][0] += 12; contour[14][0] += 14; contour[14][1] -= 6; }
    else if (noseK === 'Button') { for (const i of [14, 15, 16]) { contour[i][0] = 44 + (contour[i][0] - 44) * 0.78; contour[i][1] = -10 + (contour[i][1] + 10) * 0.82; } }
    else if (noseK === 'Snub') { contour[15][1] -= 16; contour[15][0] -= 4; contour[16][1] -= 6; }
    const mshift = chinY / (206 * chin) * 118 * chin - my;
    for (const q of lipTop.concat(lipLow)) q[1] += mshift;
    if (lipK === 'Full') { for (const q of lipLow) q[1] += (q[1] - (my + mshift)) * 0.5; lipTop[1][1] -= 4; lipTop[3][1] -= 4; }
    else if (lipK === 'Thin') { for (const q of lipLow) q[1] -= (q[1] - (my + mshift)) * 0.45; }
    else if (lipK === 'Smile') { lipTop[0][1] -= 12; lipTop[4][1] -= 14; lipLow[0][1] -= 8; lipLow[2][1] -= 10; }
    else if (lipK === 'Pout') { for (const q of lipTop.concat(lipLow)) q[0] = 15 + (q[0] - 15) * 0.7; lipLow[1][1] += 6; }
    if (browK === 'Arched') brow[1][1] -= 10;
    else if (browK === 'Straight') brow[1][1] = (brow[0][1] + brow[2][1]) / 2;
    else if (browK === 'Raised') { for (const q of brow) q[1] -= 14; brow[1][1] -= 8; }
    neckL[1][0] += 6; neckR[1][0] -= 6;   // a slight waist to the neck
    const shoulderY = chinY + 50 + (tiltK === 'Tilted' ? 10 : tiltK === 'Chin Up' ? 26 : 0) + (faceShape === 'Long' ? 8 : 0), bodyDY = shoulderY - 318;
    for (const q of shoulderL.concat(shoulderR)) q[1] += bodyDY;
    for (const nk of [neckL, neckR]) { nk[2][1] += bodyDY; nk[1][1] = nk[0][1] + (nk[2][1] - nk[0][1]) * 0.55; }

    // hair strokes (each a list of points), drawn as part of the line
    const hairStrokes = [];
    const skull = [P(-152, -60), P(-172, -160), P(-110, -246), P(0, -272), P(112, -246), P(162, -150), P(156, -96)];
    let hairBlob = null; // centre + radii for the hair wash
    if (hair === 'Bun') {
      hairStrokes.push(skull);
      const bx = span(-30, 50), by = -300, br = span(55, 75), spiral = [];
      for (let i = 0; i <= 26; i++) { const a = i / 26 * Math.PI * 4.2, r = br * (1 - i / 34); spiral.push([bx + Math.cos(a) * r, by + Math.sin(a) * r * 0.85]); }
      hairStrokes.push(spiral);
      hairStrokes.push([P(140, -120), P(70, -190), P(-20, -210), P(-120, -170)]);
      hairBlob = [bx, -240, 210, 140];
    } else if (hair === 'Bob') {
      const len = span(90, 170);
      hairStrokes.push([P(-176, len), P(-198, 20), P(-186, -160), P(-96, -266), P(26, -284), P(140, -238), P(190, -130), P(198, 10), P(184, len - 10)]);
      hairStrokes.push([P(-176, len), P(-138, len + 6)]);
      hairStrokes.push([P(184, len - 10), P(158, len - 6)]);
      hairStrokes.push([P(-150, -118), P(-50, -150), P(60, -142), P(156, -112)]);
      hairBlob = [0, -80, 230, 230];
    } else if (hair === 'Waves') {
      for (let k = 0; k < 3; k++) {
        const off = k * 26, pts = [];
        for (let i = 0; i <= 10; i++) { const y = -250 + i * 72; pts.push([-170 - off - Math.sin(i * 1.3 + k) * 22 - i * 8, y]); }
        hairStrokes.push(pts);
      }
      hairStrokes.push([P(-170, -250), P(-60, -290), P(70, -275), P(160, -190), P(178, -60), P(196, 60), P(176, 170)]);
      hairStrokes.push([P(-130, -120), P(-30, -200), P(110, -200)]);
      hairBlob = [-110, 40, 170, 360];
    } else if (hair === 'Cloud') {
      const pts = [], rx = span(265, 300), ry = span(228, 252), bumps = 11;
      for (let i = 0; i <= 64; i++) { const a = Math.PI * 0.96 + i / 64 * Math.PI * 1.08;
        const r = 1 + 0.06 * Math.abs(Math.sin(i / 64 * bumps * Math.PI));
        pts.push([Math.cos(a) * rx * r, -90 + Math.sin(a) * ry * r]);
      }
      hairStrokes.push(pts);
      hairStrokes.push([P(-150, -100), P(-60, -150), P(60, -150), P(150, -100)]);
      hairBlob = [0, -110, 270, 235];
    } else if (hair === 'Crop') {
      hairStrokes.push([P(-158, -40), P(-178, -150), P(-110, -240), P(0, -262), P(110, -238), P(166, -150), P(160, -100)]);
      hairStrokes.push([P(-150, -60), P(-130, -150), P(-40, -184), P(70, -176), P(150, -128)]);
      for (let i = 0; i < 9; i++) {
        const a = Math.PI * 1.1 + i / 8 * Math.PI * 0.8, x = Math.cos(a) * 140, y = -150 + Math.sin(a) * 85;
        hairStrokes.push([[x, y], [x * 1.08, y - 16]]);
      }
      hairBlob = [0, -190, 180, 90];
    } else if (hair === 'Braids') {
      hairStrokes.push(skull);
      hairStrokes.push([P(10, -270), P(-20, -200), P(-60, -150)]);
      for (const side of [-1, 1]) {
        const x0 = side < 0 ? -178 : 168;
        for (let i = 0; i < 9; i++) {
          const y = -30 + i * 44, x = x0 + side * i * 5, w = 22 - i * 0.8, loop = [];
          for (let k = 0; k <= 12; k++) { const a = k / 12 * Math.PI * 2; loop.push([x + Math.cos(a) * w, y + Math.sin(a) * 24]); }
          hairStrokes.push(loop);
        }
      }
      hairBlob = [0, -140, 210, 150];
    } else if (hair === 'Ponytail') { hairStrokes.push(skull);
      hairStrokes.push([P(146, -120), P(40, -200), P(-100, -230), P(-170, -190)]);
      hairStrokes.push([P(-170, -190), P(-250, -160), P(-280, -40), P(-250, 90), P(-290, 200)]);
      hairStrokes.push([P(-180, -170), P(-220, -60), P(-205, 60)]);
      hairBlob = [-200, -60, 110, 220];
    } else if (hair === 'Bare') {
      hairStrokes.push(skull);
    } else {
      // the newer styles roll from their own stream, so the portrait's draws stay put
      const e = k => extra[k % 24];
      if (hair === 'Afro Puffs') {
        hairStrokes.push(skull);
        for (const [cx, cy] of [[-150, -250], [150, -250]]) {
          const pts = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2, r = 95 * (1 + 0.07 * Math.abs(Math.sin(i * 1.4))); pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.9]); }
          hairStrokes.push(pts);
        }
        hairStrokes.push([[-60, -258], [0, -275], [60, -258]]);
        hairBlob = [0, -250, 260, 120];
      } else if (hair === 'Long Straight') {
        hairStrokes.push([[-160, -40], [-178, -170], [-110, -258], [0, -282], [116, -252], [170, -150], [176, -20], [182, 140], [200, 300]]);
        hairStrokes.push([[-160, -40], [-196, 120], [-214, 300]]);
        hairStrokes.push([[-150, 40], [-162, 170], [-178, 290]]); hairStrokes.push([[150, 10], [160, 150], [172, 270]]);
        hairStrokes.push([[-130, -150], [-30, -210], [100, -200]]);
        hairBlob = [-20, 20, 230, 320];
      } else if (hair === 'Side Part') { hairStrokes.push([[-158, -30], [-182, -150], [-120, -250], [-10, -280], [110, -258], [176, -170], [168, -60]]);
        hairStrokes.push([[-70, -270], [-40, -180], [40, -150], [150, -120]]);
        hairStrokes.push([[-60, -230], [-120, -150], [-150, -90]]);
        hairBlob = [0, -180, 200, 120];
      } else if (hair === 'Top Knot') {
        hairStrokes.push(skull);
        const kx = 20 + (e(0)[0] - 0.5) * 60;
        hairStrokes.push([[kx - 50, -300], [kx - 60, -350], [kx, -385], [kx + 60, -350], [kx + 50, -300], [kx, -285], [kx - 50, -300]]);
        hairStrokes.push([[kx - 30, -290], [kx, -270]]);
        hairStrokes.push([[-120, -230], [-20, -270]]); hairStrokes.push([[120, -230], [40, -270]]);
        hairBlob = [kx, -270, 170, 120];
      } else if (hair === 'Locs') {
        hairStrokes.push(skull);
        for (let k = 0; k < 8; k++) {
          const side = k < 4 ? -1 : 1, i = k % 4, x0 = side * (130 + i * 20), pts = [];
          for (let j = 0; j <= 6; j++) pts.push([x0 + side * j * 7 + Math.sin(j * 1.2 + k) * 6, -200 + i * 20 + j * 62]);
          hairStrokes.push(pts);
        }
        hairBlob = [0, -40, 260, 300];
      } else if (hair === 'Headwrap') { hairStrokes.push([[-160, -40], [-190, -170], [-120, -270], [0, -310], [120, -280], [180, -170], [168, -60]]);
        hairStrokes.push([[-160, -60], [-60, -120], [80, -130], [168, -80]]);
        hairStrokes.push([[-140, -200], [0, -150], [150, -200]]);
        hairStrokes.push([[0, -300], [-40, -360], [30, -380], [60, -330], [0, -300]]);
        hairStrokes.push([[10, -300], [70, -390], [120, -350], [60, -300]]);
        hairBlob = [0, -200, 220, 150];
      } else if (hair === 'Undercut') { hairStrokes.push([[-150, -70], [-160, -150], [-100, -200]]);
        hairStrokes.push([[-130, -180], [-60, -290], [80, -300], [180, -220], [190, -120], [160, -80]]);
        hairStrokes.push([[-100, -200], [20, -230], [150, -170]]);
        for (let k = 0; k < 7; k++) hairStrokes.push([[-152 + k * 3, -80 - k * 16], [-150 + k * 3, -86 - k * 16]]);
        hairBlob = [40, -230, 180, 90];
      } else if (hair === 'Beanie') { hairStrokes.push([[-170, -100], [-185, -200], [-110, -300], [10, -320], [130, -290], [185, -190], [172, -100]]);
        hairStrokes.push([[-176, -100], [0, -140], [176, -100]]);
        hairStrokes.push([[-172, -70], [0, -112], [172, -72]]);
        for (let k = 0; k < 9; k++) hairStrokes.push([[-150 + k * 38, -132 + Math.abs(k - 4) * 4], [-150 + k * 38, -86 + Math.abs(k - 4) * 4]]);
        const pom = []; for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI * 2; pom.push([10 + Math.cos(a) * 44, -350 + Math.sin(a) * 40]); }
        hairStrokes.push(pom);
        hairBlob = [0, -220, 210, 130];
      } else {
        // shaved: the skull line and a fine stipple of regrowth
        hairStrokes.push(skull);
        for (let k = 0; k < 22; k++) { const an = Math.PI * (1.08 + (k / 21) * 0.84), r = 150 + (k % 3) * 22, x = Math.cos(an) * r, y = -120 + Math.sin(an) * (r * 0.85); hairStrokes.push([[x, y], [x * 1.02, y - 6]]); }
        hairBlob = [0, -190, 170, 80];
      }
    }

    // blob shapes for the washes: a loose closed curve around a centre, offset from the line
    const blob = (cx, cy, rx, ry, wob) => {
      const pts = [], k = 9, ph = rnd() * 6.28;
      for (let i = 0; i < k; i++) {
        const a = i / k * Math.PI * 2, r = 1 + wob * Math.sin(a * 2 + ph) + span(-wob, wob) * 0.6;
        pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]); }
      return pts;
    };
    const dx = span(-55, 55), dy = span(-40, 40);
    const faceBlob = blob(dx, -10 + dy, 175, 220, 0.08);
    const hairB = hairBlob ? blob(hairBlob[0] + span(-40, 40), hairBlob[1] + span(-30, 30), hairBlob[2], hairBlob[3], 0.12) : null;
    const clothB = blob(span(-60, 60), 470 + bodyDY, 470, 160, 0.1);
    const sun = rnd() < 0.35 ? [span(-330, 330), span(-330, -230), span(60, 110)] : null;
    const flowerAt = [P(-190, -150), span(0, 6.28)];
    const flyAt = [span(200, 330), span(320, 400)];
    const oneCol = washStyle === 'One Colour' ? hairWash : null;

    // ================= the pixel picture =================
    // Everything lands on a fixed 64 x 64 grid of hard square cells, written into
    // ImageData and scaled up unsmoothed. The pen line is a clean one-cell pixel
    // line (a second cell only where the pen swells), the washes are flat cells
    // with a darker rim where the pigment pooled, and the eyes are set cell by cell.
    const N = 64, NN = N * N, CU = N / 1000, UNIT = 1000 / N / 1.12;   // UNIT: one cell in the sitter's own units
    const tiltA = tiltK === 'Tilted' ? -0.09 : 0, chinUp = tiltK === 'Chin Up' ? -0.06 : 0, aH = tiltA + chinUp;
    const turn = (q, a) => { const yy = q[1] - 170; return [q[0] * Math.cos(a) - yy * Math.sin(a), 170 + q[0] * Math.sin(a) + yy * Math.cos(a)]; };
    const cellAt = (q, head) => { const r = head && aH ? turn(q, aH) : q; return [(500 + facing * 1.12 * r[0]) * CU, (455 + 1.12 * r[1]) * CU]; };
    // Catmull-Rom through the rolled points, sampled finely (open or closed)
    const curve = (pts, closed) => {
      const n = pts.length, out = [];
      if (n < 3 && !closed) return pts.slice();
      const at = i => closed ? pts[((i % n) + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
      for (let i = 0, segs = closed ? n : n - 1; i < segs; i++) {
        const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
        const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6, c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
        const m = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 5));
        for (let k = i ? 1 : 0; k <= m; k++) {
          const t = k / m, u = 1 - t;
          out.push([u * u * u * p1[0] + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * p2[0], u * u * u * p1[1] + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * p2[1]]);
        }
      }
      return out;
    };
    const ell = (cx, cy, rx, ry, n, a0, a1) => { const o = []; const f = a0 || 0, e = a1 == null ? Math.PI * 2 : a1; for (let i = 0; i <= n; i++) { const a = f + (e - f) * i / n; o.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); } return o; };

    // ---------- the palette ----------
    const rgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const mixc = (a, b, k) => [0, 1, 2].map(i => Math.round(a[i] + (b[i] - a[i]) * k));
    const word = c3 => ((255 << 24) | (c3[2] << 16) | (c3[1] << 8) | c3[0]) >>> 0;
    const LEG = legend ? {
      'Gold Leaf': { ground: '#2b1619', line: '#ecc25a', face: '#c4923a', rim: '#8c5f1e', hair: '#e0b04c', cloth: '#a2722a', seam: '#9c6c24', glint: '#fff1b8', tooth: '#3a1e22', blooms: ['#e8b850', '#f4d27a', '#c08a30'] },
      Cyanotype: { ground: '#1d4a8c', line: '#f2f6ff', face: '#6f9cd4', rim: '#a9c8ec', hair: '#3c6eb4', cloth: '#2c5c9f', seam: '#5a88c6', glint: '#d7e6fa', tooth: '#24529a', blooms: ['#8fb6e6', '#4a7cc0', '#c0d8f4'] },
      Marble: { ground: '#2c3740', line: '#6c6660', face: '#ece6db', rim: '#cec6b8', hair: '#ddd5c7', cloth: '#d4ccbd', seam: '#bfb6a6', glint: '#fdfaf3', tooth: '#344049', blooms: ['#e9c9c0', '#cfd9d6', '#efe2c4'] },
    }[legend] : null;
    const g0 = rgb(LEG ? LEG.ground : grounds[ground]);
    const INK = word(rgb(LEG ? LEG.line : lineCol));
    const pig = h => oneCol && h !== skin[1] ? oneCol : h;
    const toward = (h, a) => mixc(g0, rgb(h), a);
    const pooled = (h, k) => mixc(rgb(h), [34, 24, 30], k);
    const W = LEG ? {
      hair: word(rgb(LEG.hair)), hairRim: word(rgb(LEG.rim)), face: word(rgb(LEG.face)), faceRim: word(rgb(LEG.rim)), cloth: word(rgb(LEG.cloth)), clothRim: word(rgb(LEG.rim)),
    } : {
      hair: word(toward(pig(hairWash), night ? 0.75 : 0.6)), hairRim: word(pooled(pig(hairWash), 0.1)),
      face: word(toward(skin[1], night ? 0.95 : 0.9)), faceRim: word(pooled(skin[1], 0.2)),
      cloth: word(toward(pig(clothWash), night ? 0.75 : 0.62)), clothRim: word(pooled(pig(clothWash), 0.1)),
    };
    // On a deep skin wash a dark ink sinks into the face, so wherever the line (eyes, brows, lips, nose, jaw) crosses the
    // face wash it is drawn in a light ink instead, a pale tint of the skin, whenever that reads better than the dark one.
    const lum = q => { const f = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(q[0]) + 0.7152 * f(q[1]) + 0.0722 * f(q[2]); };
    const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const faceRGB = toward(skin[1], night ? 0.95 : 0.9), liteRGB = mixc(rgb(skin[1]), [255, 246, 232], 0.78);
    const LITE = !LEG && !night && contrast(liteRGB, faceRGB) > contrast(rgb(lineCol), faceRGB) ? word(liteRGB) : 0;
    const STUB = word(mixc(rgb(LEG ? LEG.line : lineCol), rgb(LEG ? LEG.face : skin[1]), 0.45));
    const FRECK = legend === 'Marble' ? word([150, 142, 132]) : word(mixc(rgb(skin[1]), [120, 50, 30], 0.45));

    // ---------- the layers: ground, cloth, head washes, body lines, head lines (0 = clear) ----------
    const L0 = new Uint32Array(NN), LC = new Uint32Array(NN), LW = new Uint32Array(NN), LB = new Uint32Array(NN), LH = new Uint32Array(NN);
    const put = (b, x, y, v) => { if (x >= 0 && y >= 0 && x < N && y < N) b[y * N + x] = v; };
    // which cells a closed outline covers, by cell centre
    const fillPoly = (poly, set) => {
      let y0 = 1e9, y1 = -1e9; for (const p of poly) { if (p[1] < y0) y0 = p[1]; if (p[1] > y1) y1 = p[1]; }
      for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(N - 1, Math.ceil(y1)); y++) {
        const cy = y + 0.5, xs = [];
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j]; if ((a[1] > cy) !== (b[1] > cy)) xs.push(a[0] + (cy - a[1]) * (b[0] - a[0]) / (b[1] - a[1])); }
        xs.sort((p, q) => p - q);
        for (let k = 0; k + 1 < xs.length; k += 2) for (let x = Math.max(0, Math.ceil(xs[k] - 0.5)); x <= Math.min(N - 1, Math.floor(xs[k + 1] - 0.5)); x++) set(y * N + x, x, y);
      }
    };
    const cover = polys => { const m = new Uint8Array(NN); for (const p of polys) fillPoly(p, i => { m[i] = 1; }); return m; };
    const blobCells = (pts, head) => curve(pts, true).map(q => cellAt(q, head));
    const bleed = washStyle === 'Wet Bleed';
    // a wash: flat cells, a darker rim where the pigment pooled, or a dithered fringe where it bled
    const lay = (b, m, flat, rim, soft) => {
      for (let y = 0, x; y < N; y++) for (x = 0; x < N; x++) {
        const i = y * N + x;
        if (m[i]) { const edge = rim && !soft && ((x > 0 && !m[i - 1]) || (x < N - 1 && !m[i + 1]) || (y > 0 && !m[i - N]) || (y < N - 1 && !m[i + N])); b[i] = edge ? rim : flat; }
        else if (soft && ((x + y) & 1) === 0) {
          let near = 0; for (let v = -1; v <= 1 && !near; v++) for (let u = -1; u <= 1; u++) { const xx = x + u, yy = y + v; if (xx >= 0 && yy >= 0 && xx < N && yy < N && m[yy * N + xx]) { near = 1; break; } }
          if (near) b[i] = flat;
        }
      }
    };

    // ground: flat paper, a sparse tooth, and the paper's own pattern
    {
      const G = word(g0), T = word(LEG ? rgb(LEG.tooth) : mixc(g0, night ? [255, 255, 255] : [90, 70, 40], night ? 0.07 : 0.08)), seedT = parseInt(hx.slice(4, 8), 16);
      for (let y = 0, x; y < N; y++) for (x = 0; x < N; x++) {
        let q = Math.imul(x * 374761393 + y * 668265263 ^ seedT, 1274126177); q ^= q >>> 15; q = Math.imul(q, 0x2c1b3c6d); q ^= q >>> 12;
        L0[y * N + x] = ((q >>> 0) & 255) > 249 ? T : G;
      }
      if (!LEG && ground === 'Newsprint') { const D = word(mixc(g0, [60, 60, 60], 0.16)); for (let y = 3; y < N - 2; y += 3) { let x = 2, k2 = 0; while (x < N - 2) { const w = 2 + Math.floor(extra[(k2 + y) % 24][0] * 7); for (let i = 0; i < w && x + i < N - 2; i++) put(L0, x + i, y, D); x += w + 1; k2++; } } }
      if (!LEG && ground === 'Graph') { const D = word(mixc(g0, [80, 140, 170], 0.25)); for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (x % 4 === 1 || y % 4 === 1) L0[y * N + x] = D; }
      if (!LEG && ground === 'Kraft') { const D = word(mixc(g0, [110, 80, 40], 0.22)); for (let k = 0; k < 70; k++) { const [a, b] = extra[k % 24], x = Math.floor(((a + k * 0.137) % 1) * N), y = Math.floor(((b + k * 0.071) % 1) * N); put(L0, x, y, D); put(L0, x + 1, y, D); } }
      if (washStyle === 'Gold Flecks') { const G1 = word([214, 172, 72]), G2 = word([252, 228, 146]); for (let k = 0; k < 46; k++) { const [a, b] = extra[k % 24], x = Math.floor(((a + k * 0.311) % 1) * N), y = Math.floor(((b + k * 0.173) % 1) * N); if (k % 4 === 0) { put(L0, x, y, G2); put(L0, x - 1, y, G1); put(L0, x + 1, y, G1); put(L0, x, y - 1, G1); put(L0, x, y + 1, G1); } else { put(L0, x, y, G1); put(L0, x + 1, y, G1); } } }
    }

    // the washes, in their old order (the beard tint and the sun keep their rolls)
    const onFace = new Uint8Array(NN);
    if (washStyle === 'Bold Blocks') {
      const circ = ell(dx * 1.5 - 60, -150 + dy, 230, 230, 40).map(q => cellAt(q, false));
      const rect = [[40 + dx, -330], [300 + dx, -330], [300 + dx, -30], [40 + dx, -30]].map(q => cellAt(q, false));
      const pa = LEG ? null : [word(toward(oneCol || hairWash, night ? 0.8 : 0.72)), word(toward(oneCol || clothWash, night ? 0.8 : 0.72))];
      lay(LW, cover([circ]), pa ? pa[0] : W.hair, 0, false);
      lay(LW, cover([rect]), pa ? pa[1] : W.cloth, 0, false);
      lay(LW, cover([curve(faceBlob.map(q => [q[0] * 0.92, q[1] * 0.95]), true).map(q => cellAt(q, true))]), W.face, 0, false);
      for (let i = 0; i < NN; i++) onFace[i] = LW[i] === W.face ? 1 : 0;
    } else {
      if (hairB) lay(LW, cover([blobCells(hairB, true)]), W.hair, W.hairRim, bleed);
      lay(LW, cover([blobCells(faceBlob, true)]), W.face, W.faceRim, bleed);
      for (let i = 0; i < NN; i++) onFace[i] = LW[i] === W.face || LW[i] === W.faceRim ? 1 : 0;
      if (facialHair === 'Full Beard' || facialHair === 'Goatee') {
        const goat = facialHair === 'Goatee', bb = blob(goat ? 18 : 12, chinY - (goat ? 34 : 58), goat ? 42 : 112, goat ? 30 : 58, 0.08);
        const pale = word(mixc(LEG ? rgb(LEG.hair) : rgb(pig(hairWash)), [255, 255, 255], 0.35));
        const m = cover([blobCells(bb, true)]); for (let i = 0; i < NN; i++) if (m[i] && LW[i] && ((i + Math.floor(i / N)) & 1) === 0) LW[i] = pale;
      }
    }
    // a marble sitter is a carved bust: bare shoulders cut off in a curve, stood on a plinth
    const bustPoly = [[-96, shoulderY - 6], [-200, shoulderY + 26], [-300, shoulderY + 70], [-330, shoulderY + 118], [-250, shoulderY + 140], [-130, shoulderY + 128], [0, shoulderY + 146], [130, shoulderY + 126], [250, shoulderY + 140], [330, shoulderY + 116], [300, shoulderY + 68], [200, shoulderY + 24], [90, shoulderY - 8]];
    const plinthY = shoulderY + 150;
    if (legend === 'Marble') {
      lay(LC, cover([bustPoly.map(q => cellAt(q, false))]), W.face, W.faceRim, false);
      const pl = cover([[[-250, plinthY], [250, plinthY], [250, 1200], [-250, 1200]].map(q => cellAt(q, false))]), PL = word([184, 176, 162]), PLHI = word([214, 206, 192]);
      for (let i = 0; i < NN; i++) if (pl[i]) LC[i] = (i >= N && !pl[i - N]) ? PLHI : PL;
    } else lay(LC, cover([blobCells(clothB, false)]), W.cloth, W.clothRim, bleed);
    const sunB = sun && washStyle !== 'Bold Blocks' ? blob(sun[0], sun[1], sun[2], sun[2], 0.03) : null;
    if (sunB) { const sc = LEG ? rgb(LEG.glint) : rgb(night ? '#e8c76a' : '#f6c5a0'); lay(L0, cover([blobCells(sunB, false)]), word(LEG ? mixc(g0, sc, 0.35) : mixc(g0, sc, night ? 0.8 : 0.9)), word(LEG ? mixc(g0, sc, 0.55) : mixc(sc, [150, 80, 40], 0.12)), bleed); }

    // the legendary surfaces: gold leaf laid in square sheets, sunprint and marble veins
    const leaf = new Uint8Array(NN);
    if (LEG) {
      const SEAM = word(rgb(LEG.seam)), sx = lcg() * 6 | 0, sy = lcg() * 6 | 0;
      for (const b of [LW, LC]) for (let y = 0, x; y < N; y++) for (x = 0; x < N; x++) {
        const i = y * N + x; if (!b[i]) continue; leaf[i] = 1;
        if (legend === 'Gold Leaf' && b[i] !== W.hairRim && ((x + sx) % 7 === 0 || (y + sy) % 7 === 0)) b[i] = SEAM;
        if (legend === 'Cyanotype' && b[i] === W.cloth && ((x + y * 2) % 5 === 0)) b[i] = SEAM;
      }
      // four grey veins wander down through the stone, across the face, hair and bust
      if (legend === 'Marble') for (let k = 0; k < 4; k++) {
        const VEIN = word(k === 3 ? [176, 168, 156] : [150, 142, 132]);
        let x = N * 0.28 + lcg() * N * 0.44, y = N * 0.1 + lcg() * N * 0.3, a = 0.5 + lcg() * 2.1;
        for (let s = 0; s < 110; s++) {
          a += (lcg() - 0.5) * 0.5; a = Math.max(0.25, Math.min(2.9, a)); x += Math.cos(a) * 0.8; y += Math.sin(a) * 0.8;
          if (x < 0 || y < 0 || x >= N || y >= N) break;
          const i = (y | 0) * N + (x | 0);
          for (const b of [LW, LC]) if (b[i] && b[i] !== W.faceRim && b[i] !== W.hairRim && b[i] !== W.clothRim) b[i] = VEIN;
        }
      }
    }

    // ---------- the line ----------
    // Bresenham through the cells the curve visits, then drop the L-shaped elbows
    // so every step is a clean one-cell pixel step.
    const walk = pts => {
      const out = [];
      for (const p of pts) {
        const tx = Math.floor(p[0]), ty = Math.floor(p[1]);
        if (!out.length) { out.push([tx, ty]); continue; }
        let [x, y] = out[out.length - 1];
        const ax = Math.abs(tx - x), ay = -Math.abs(ty - y), sx = x < tx ? 1 : -1, sy = y < ty ? 1 : -1;
        let err = ax + ay;
        while (x !== tx || y !== ty) { const e2 = 2 * err; if (e2 >= ay) { err += ay; x += sx; } if (e2 <= ax) { err += ax; y += sy; } out.push([x, y]); }
      }
      const keep = [];
      for (const q of out) {
        keep.push(q);
        const n = keep.length;
        if (n >= 3) { const a = keep[n - 3]; if (Math.abs(a[0] - q[0]) === 1 && Math.abs(a[1] - q[1]) === 1) keep.splice(n - 2, 1); }
      }
      return keep;
    };
    // the pen: every line is one clean cell wide (no doubled corners); only the jaw takes the pen's weight,
    // on its outer side: a marker is two cells all round it, a brush pen swells through the middle of it,
    // a dip pen doubles where the jaw runs downward, and a fineliner stays one cell
    let faceMid = null;
    const inkPath = (b, path, col, thin, jaw) => {
      const n = path.length;
      for (let i = 0; i < n; i++) put(b, path[i][0], path[i][1], col);
      if (thin || !jaw || pen === 'Fineliner' || n < 5) return;
      for (let i = 1; i < n - 1; i++) {
        const [x, y] = path[i], a = path[Math.max(0, i - 2)], q = path[Math.min(n - 1, i + 2)], ddx = Math.abs(q[0] - a[0]), ddy = Math.abs(q[1] - a[1]);
        let fat = pen === 'Marker';
        if (pen === 'Brush Pen') { const u = i / (n - 1); fat = u > 0.2 && u < 0.8; }
        if (pen === 'Dip Pen') fat = ddy > ddx * 1.4;
        if (!fat) continue;
        // the extra cell always goes on the outside of the face, straight across the run
        if (ddx >= ddy) put(b, x, y + (y + 0.5 >= faceMid[1] ? 1 : -1), col); else put(b, x + (x + 0.5 >= faceMid[0] ? 1 : -1), y, col);
      }
    };
    const line = (b, pts, head, col, thin, jaw) => inkPath(b, walk(curve(pts, false).map(q => cellAt(q, head))), col || INK, thin, jaw);
    const ring = (b, pts, head, col, thin) => inkPath(b, walk(pts.map(q => cellAt(q, head))), col || INK, thin);
    // small sprites, '#' in ink; flipped for the sitter's facing
    const stamp = (b, rows, cx, cy, flip, cmap, ax, ay) => {
      const w = rows[0].length, ox = cx - (ax == null ? w >> 1 : ax), oy = cy - (ay == null ? rows.length >> 1 : ay);
      rows.forEach((r, j) => { for (let i = 0; i < w; i++) { const ch = r[i]; if (ch === '.') continue; put(b, ox + (flip ? w - 1 - i : i), oy + j, (cmap && cmap[ch]) || STAMPCOL[ch] || INK); } });
    };
    const STAMPCOL = { w: word([251, 248, 240]), s: word([214, 208, 196]), g: word([226, 182, 74]), G: word([255, 232, 150]), r: word([212, 62, 52]), k: word([120, 76, 40]) };
    // a filled shape with a one-cell ink edge
    const shape = (b, polys, fill, edge) => {
      const m = cover(polys);
      for (let y = 0, x; y < N; y++) for (x = 0; x < N; x++) { const i = y * N + x; if (!m[i]) continue; const e = (x > 0 && !m[i - 1]) || (x < N - 1 && !m[i + 1]) || (y > 0 && !m[i - N]) || (y < N - 1 && !m[i + N]); b[i] = e ? edge : fill; }
      return m;
    };
    const cellsOf = (q, head) => { const c2 = cellAt(q, head); return [Math.floor(c2[0]), Math.floor(c2[1])]; };

    // the body (it breathes, a cell at a time)
    if (legend === 'Marble') { line(LB, bustPoly.slice(0, 7), false); line(LB, bustPoly.slice(6), false); line(LB, [[-260, plinthY], [260, plinthY]], false); line(LB, [[-250, plinthY], [-250, 700]], false); line(LB, [[250, plinthY], [250, 700]], false); }
    else { line(LB, shoulderL, false); line(LB, shoulderR, false); }
    const bd = q => q.map(p => [p[0], p[1] + bodyDY]);
    if (legend === 'Marble') { /* a bust wears nothing: no neckline */ }
    else if (neck === 'Crew') { line(LB, bd([[-150, 345], [0, 395], [150, 340]]), false); line(LB, bd([[-110, 381], [0, 430], [110, 376]]), false, null, true); }
    else if (neck === 'V-neck') { line(LB, bd([[-170, 340], [-5, 470], [160, 335]]), false); line(LB, bd([[-58, 352], [-104, 362]]), false, null, true); line(LB, bd([[48, 350], [96, 358]]), false, null, true); }
    else if (neck === 'Turtleneck') { line(LB, [[-110, chinY + 18], [0, chinY + 36], [100, chinY + 10]], false); line(LB, bd([[-118, 300], [-10, 322], [110, 292]]), false); }
    else if (neck === 'Collar') { line(LB, bd([[-150, 340], [-40, 420], [-10, 370]]), false); line(LB, bd([[150, 334], [30, 418], [0, 370]]), false); line(LB, bd([[-10, 370], [0, 520]]), false); }
    else { line(LB, bd([[-300, 470], [-120, 430], [0, 450], [130, 428], [300, 466]]), false); line(LB, bd([[-150, 372], [-60, 392], [-20, 382]]), false, null, true); line(LB, bd([[40, 380], [90, 388], [150, 368]]), false, null, true); }

    // the head's line, inked once
    {
      const nl0 = turn(neckL[0], aH), nr0 = turn(neckR[0], aH);
      if (neck !== 'Turtleneck') { line(LH, [nl0, neckL[1], neckL[2]], false); line(LH, [nr0, neckR[1], neckR[2]], false); } else { line(LH, [nl0, [-92, chinY + 18]], false); line(LH, [nr0, [84, chinY + 10]], false); }
      hairStrokes.forEach((s, k) => { if (!(hair === 'Braids' && k > 1)) line(LH, s, true, null, s.length < 3); });
      // braids as a chain of links, two cells apart, filled with the hair's own pigment
      if (hair === 'Braids') { const BR = { p: LEG ? W.hair : word(pooled(pig(hairWash), 0)) }; for (const side of [-1, 1]) for (let i = 0; i < 9; i++) { const [x, y] = cellsOf([(side < 0 ? -178 : 168) + side * i * 5, -30 + i * 44], true); stamp(LH, i === 8 ? ['.##.', '#pp#', '.##.', '.#..', '#.#.'] : ['.##.', '#pp#', '.##.'], x, y, side * facing < 0, BR, 2, 1); } }
      if (!['Bob', 'Cloud', 'Long Straight', 'Headwrap', 'Beanie'].includes(hair)) line(LH, ear, true);
      faceMid = cellAt([0, 40], true);
      line(LH, contour.slice(0, 8), true, null, false, true); line(LH, contour.slice(7), true);
      line(LH, brow, true, null, true);
      if (browK === 'Bold') line(LH, brow.map(q => [q[0] + 3, q[1] - UNIT]), true, null, true);
      line(LH, lipTop, true, null, true); line(LH, lipLow, true, null, true);
      // stubble: a staggered stipple of cells along the jaw, below the mouth
      if (facialHair === 'Stubble') {
        const jawP = contour.slice(1, 8).map(q => cellAt(q, true)), mY = cellAt([15, lipTop[2][1]], true)[1];
        fillPoly(jawP, (i, x, y) => { if (y > mY && ((x + y) & 1) === 0 && (y & 1) === 0 && !LH[i]) LH[i] = STUB; });
      } else if (facialHair === 'Moustache') line(LH, [[lipTop[0][0] - 8, lipTop[0][1] - 2], [lipTop[1][0] - 6, lipTop[1][1] - 18], [16, lipTop[2][1] - 16], [lipTop[3][0] + 6, lipTop[3][1] - 18], [lipTop[4][0] + 10, lipTop[4][1]]], true);
      else if (facialHair === 'Full Beard') { line(LH, [contour[0], [contour[1][0] + 10, contour[1][1] + 20], [contour[2][0] + 6, contour[2][1] + 34], [contour[3][0], contour[3][1] + 44], [contour[4][0], contour[4][1] + 48], [contour[5][0], contour[5][1] + 38], [contour[6][0] + 4, contour[6][1] + 30], contour[7]], true); line(LH, [[lipTop[0][0] - 10, lipTop[0][1] - 4], [16, lipTop[2][1] - 18], [lipTop[4][0] + 12, lipTop[4][1] - 2]], true); }
      else if (facialHair === 'Goatee') line(LH, [[lipLow[0][0], lipLow[0][1] + 12], [contour[3][0] + 34, chinY + 8], [contour[4][0], chinY + 18], [contour[5][0] - 24, chinY + 6], [lipLow[2][0], lipLow[2][1] + 12]], true);
      // what's worn on the head, placed cell by cell
      const HOOP = ['.##.', '#..#', '#..#', '.##.'];
      if (accent === 'Hoop') { const [x, y] = cellsOf(hair === 'Bob' ? [-182, 168] : [-168, 72], true); stamp(LH, HOOP, x, y, false); }
      if (accent === 'Flower') {
        // a four-petal flower, set by hand: petals in pink (or yellow on pink hair), a gold heart
        const [x, y] = cellsOf(flowerAt[0], true), pet = word(rgb(LEG ? LEG.glint : pig(hairWash) === '#e690a8' ? '#e8b04a' : '#ef8fae'));
        stamp(LH, flowerAt[1] > 3.14 ? ['.##.##.', '#pp#pp#', '.#pyp#.', '#pp#pp#', '.##.##.'] : ['..###..', '.#ppp#.', '#p#y#p#', '#ppppp#', '.#p#p#.', '..#.#..'], x, y, false, { p: pet, y: word([240, 196, 70]) });
      }
      if (accent === 'Glasses') {
        ring(LH, ell(-58, -34, 58, 46, 28), true, null, true); ring(LH, ell(100, -34, 40, 44, 24), true, null, true);
        line(LH, [[-2, -46], [24, -56], [58, -46]], true, null, true); line(LH, [[-116, -40], [-160, -50]], true, null, true);
      }
      if (accent === 'Beauty mark') { const [x, y] = cellsOf([70, 92], true); put(LH, x, y, INK); }
      if (accent === 'Pearl Earring' || accent === 'Moon Earring') {
        line(LH, [[-168, 40], [-168, 62]], true, null, true);
        const [x, y] = cellsOf([-168, 84], true);
        stamp(LH, accent === 'Pearl Earring' ? ['.##.', '#ww#', '#ws#', '.##.'] : ['.##.', '#gg.', '#g..', '#gg.', '.##.'], x, y + 1, facing < 0, accent === 'Pearl Earring' ? null : null);
      }
      if (accent === 'Nose Ring') { const [x, y] = cellsOf([contour[15][0] - 8, contour[15][1] + 14], true); stamp(LH, ['#.#', '.#.'], x, y, false); }
      if (accent === 'Freckles') for (let k = 0; k < 12; k++) { const [u, v] = extra[k]; const [x, y] = cellsOf([-110 + u * 230 + (u > 0.45 ? 30 : 0), 14 + v * 34], true); if (!LH[y * N + x]) put(LH, x, y, FRECK); }
      if (accent === 'Headphones') {
        line(LH, [[-196, -10], [-200, -200], [-100, -320], [40, -335], [160, -270], [196, -140], [190, -30]], true);
        const cup = []; for (let i = 0; i <= 20; i++) { const a = i / 20 * Math.PI * 2; cup.push([-196 + Math.cos(a) * 34, Math.sin(a) * 64]); }
        shape(LH, [cup.map(q => cellAt(q, true))], word(rgb(LEG ? LEG.cloth : pig(clothWash))), INK);
      }
      if (accent === 'Pencil') {
        // a green pencil tucked over the ear, set cell by cell: pink eraser, metal ferrule, green body, bare wood and a lead point
        const [x, y] = cellsOf([-172, -120], true);
        stamp(LH, ['.##......', '#ee#.....', '#emm#....', '.#mmy#...', '..#yyy#..', '...#yyy#.', '....#yyw#', '.....#ww#', '......##.'], x, y, facing < 0, { e: word([236, 140, 150]), m: word([196, 198, 206]), y: word([84, 160, 98]), w: word([238, 206, 160]) });
      }
    }
    // the coveted brush, tucked behind the ear: gold handle, ferrule, a vermilion tip
    let brushCell = null, brushDrip = null;
    if (brushOwned) {
      const GOLD = word([226, 182, 74]), DEEP = word([150, 104, 34]);
      ring(LH, [[-128, -18], [-214, -150]], true, GOLD); ring(LH, [[-128 - UNIT, -18], [-214 - UNIT, -150]].map(q => [q[0], q[1]]), true, DEEP);
      ring(LH, [[-214, -150], [-232, -178]], true, word([240, 222, 160])); ring(LH, [[-214 - UNIT, -150], [-232 - UNIT, -178]], true, word([200, 190, 150]));
      // the head: a fat round tuft of bristle soaked in vermilion, pointed at the tip
      const ax = -232, ay = -178, tx = -306, ty = -300, L2 = Math.hypot(tx - ax, ty - ay), ux = (tx - ax) / L2, uy = (ty - ay) / L2, head = [];
      for (let i = 0; i <= 24; i++) { const u = i / 24, w = u < 0.35 ? 20 + 20 * Math.sin(u / 0.35 * Math.PI / 2) : 40 * Math.pow((1 - u) / 0.65, 0.85); head.push([ax + ux * L2 * u - uy * w, ay + uy * L2 * u + ux * w]); }
      for (let i = 24; i >= 0; i--) { const u = i / 24, w = u < 0.35 ? 20 + 20 * Math.sin(u / 0.35 * Math.PI / 2) : 40 * Math.pow((1 - u) / 0.65, 0.85); head.push([ax + ux * L2 * u + uy * w, ay + uy * L2 * u - ux * w]); }
      const hm = shape(LH, [head.map(q => cellAt(q, true))], word([226, 70, 48]), word([140, 30, 28]));
      // a wet highlight down one side
      for (let i = 0; i < 4; i++) { const u = 0.3 + i * 0.12, [hx2, hy2] = cellsOf([ax + ux * L2 * u + uy * 22, ay + uy * L2 * u - ux * 22], true); if (hm[hy2 * N + hx2]) put(LH, hx2, hy2, word([255, 150, 120])); }
      brushCell = cellsOf([ax + ux * L2 * 0.45, ay + uy * L2 * 0.45], true);
      // where the drip falls from: the lowest point of the head's belly
      for (const q of head.filter((p, i) => (i >= 8 && i <= 15) || (i >= 34 && i <= 41))) { const c2 = cellsOf(q, true); if (!brushDrip || c2[1] > brushDrip[1]) brushDrip = c2; }
    }

    // ---------- the viewer's drops of watercolour ----------
    // their own little xorshift stream (from the far end of the hash)
    let xs = (parseInt(hx.slice(56, 64), 16) ^ 0x5bd1e995) >>> 0 || 1;
    const drip = () => { xs ^= xs << 13; xs >>>= 0; xs ^= xs >>> 17; xs ^= xs << 5; xs >>>= 0; return xs / 4294967296; };
    const root = [57, 59, 60, 62, 64][Math.floor(drip() * 5)], penta = [0, 2, 4, 7, 9, 12, 14, 16];
    const blooms = [], splats = [], rings = [];
    let look = 0, lookY = 0, lookAmt = 0, lastT = 0, wakeAt = -9, chimeAt = -9, chimeX = 0;
    const toLocal = (u, v) => [facing * (u * 1000 - 500) / 1.12, (v * 1000 - 455) / 1.12];
    const dropBead = (u, v, t) => {
      const [lx, ly] = toLocal(u, v), pts = [], ph = drip() * 6.28, R = 70 + drip() * 70;
      for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; pts.push([Math.cos(a) * (1 + 0.14 * Math.sin(a * 2 + ph) + (drip() - 0.5) * 0.16), Math.sin(a) * (1 + 0.12 * Math.cos(a * 3 + ph) + (drip() - 0.5) * 0.16)]); }
      const pal = LEG ? LEG.blooms : washes, col = rgb(pal[Math.floor(drip() * pal.length)]);
      // a bead never sits on the eyes or the mouth: a tap on one lands just beside it, and a bead near one stays small
      let bx = lx, by = ly, Rb = R, cx = (500 + facing * 1.12 * lx) * CU, cy = (455 + 1.12 * ly) * CU;
      const at = (x, y) => x >= 0 && y >= 0 && x < N && y < N && SPARE[Math.floor(y) * N + Math.floor(x)];
      if (at(cx, cy)) {
        let fc = SPAREC[0]; for (const q of SPAREC) if (Math.hypot(q[0] - cx, q[1] - cy) < Math.hypot(fc[0] - cx, fc[1] - cy)) fc = q;
        let ux = cx - fc[0], uy = cy - fc[1]; const l = Math.hypot(ux, uy) || 1; ux = l > 0.01 ? ux / l : 0; uy = l > 0.01 ? uy / l : 1;
        for (let k = 0; k < 20 && at(cx, cy); k++) { cx += ux; cy += uy; }
        cx += ux * 2; cy += uy * 2; bx = facing * (cx / CU - 500) / 1.12; by = (cy / CU - 455) / 1.12;
      }
      let dmin = 99; for (let k = 0; k < NN; k++) if (SPARE[k]) dmin = Math.min(dmin, Math.hypot((k % N) + 0.5 - cx, Math.floor(k / N) + 0.5 - cy));
      Rb = Math.min(R, Math.max(26, (dmin - 1.8) / (1.12 * CU) / 1.25));
      blooms.push({ x: bx, y: by, R: Rb, pts, flat: word(mixc(g0, col, night ? 0.7 : 0.62)), rim: word(mixc(col, [30, 24, 30], 0.12)), born: t });
      if (blooms.length > 9) blooms.shift();
      look = Math.max(-1, Math.min(1, lx / 260)); lookY = Math.max(-1, Math.min(1, (ly + 36) / 260)); lookAmt = 1;
      const step = penta[Math.max(0, Math.min(penta.length - 1, Math.floor((1 - v) * penta.length)))];
      c.sound.note(root + step, { dur: 0.9, vel: 0.32, wave: 'sine', pan: (u - 0.5) * 1.2 });
      c.sound.note(root + step + 12, { dur: 0.35, vel: 0.12, wave: 'triangle', pan: (u - 0.5) * 1.2, at: 0.05, cutoff: 2400 });
    };
    const onTap = (u, v, t) => {
      const cx = Math.floor(u * N), cy = Math.floor(v * N);
      if (brushCell && Math.abs(cx - brushCell[0]) <= 4 && Math.abs(cy - brushCell[1]) <= 4) {
        // the golden brush flicks a spatter of vermilion and gold across the paper
        for (let k = 0; k < 10; k++) { const a = drip() * 6.28, d = 6 + drip() * 22; splats.push([Math.floor(brushCell[0] + Math.cos(a) * d), Math.floor(brushCell[1] + Math.sin(a) * d * 0.8), k % 3 ? word([212, 62, 52]) : word([236, 196, 90]), k % 4 === 0]); }
        while (splats.length > 60) splats.shift();
        c.sound.hit('blip', 0.14); c.sound.note(root + 19, { dur: 0.25, vel: 0.16, wave: 'triangle', cutoff: 3000 }); c.sound.note(root + 24, { dur: 0.4, vel: 0.12, wave: 'sine', at: 0.08 });
        return;
      }
      dropBead(u, v, t);
      if (legend === 'Gold Leaf') { chimeAt = t; chimeX = cx + cy; [24, 28, 31].forEach((s, k) => c.sound.note(root + s, { dur: 1.2, vel: 0.1, wave: 'sine', at: 0.06 * k })); }
      if (legend === 'Cyanotype') { rings.push([cx, cy, t]); if (rings.length > 5) rings.shift(); c.sound.note(root - 12, { dur: 1.6, vel: 0.2, wave: 'sine', pan: (u - 0.5) }); c.sound.note(root - 5, { dur: 1.2, vel: 0.1, wave: 'sine', at: 0.12 }); }
      if (legend === 'Marble') { wakeAt = t; c.sound.note(root - 24, { dur: 2.4, vel: 0.24, wave: 'sine' }); c.sound.note(root - 17, { dur: 2, vel: 0.12, wave: 'sine', at: 0.02 }); c.sound.note(root + 12, { dur: 1.4, vel: 0.05, wave: 'triangle', at: 0.04, cutoff: 1800 }); }
    };

    // ---------- the eyes, set cell by cell ----------
    // [rows, pupil x, pupil y, corner row]; the outer corner is drawn on the left
    const NEAR = {
      open: [['.#####.', '#.....#', '...###.'], 2, 1, 1], lashes: [['#.#....', '.#####.', '#.....#', '...###.'], 2, 2, 2],
      up: [['.#####.', '#.....#', '.......', '...###.'], 2, 1, 1], down: [['.......', '#######', '.......'], 2, 2, 1],
      shut: [['#.....#', '.#####.'], 0, 0, 0], dream: [['#.....#', '.#####.', '.#.#.#.'], 0, 0, 0], laugh: [['..###..', '.#...#.', '#.....#'], 0, 0, 2],
    };
    const FAR = {
      open: [['.###.', '#...#', '..##.'], 1, 1, 1], lashes: [['#.#..', '.###.', '#...#', '..##.'], 1, 2, 2],
      up: [['.###.', '#...#', '.....', '..##.'], 1, 1, 1], down: [['.....', '#####', '.....'], 1, 2, 1],
      shut: [['#...#', '.###.'], 0, 0, 0], dream: [['#...#', '.###.', '.#.#.'], 0, 0, 0], laugh: [['.###.', '#...#'], 0, 0, 1],
    };
    const nearAt = cellsOf([-58, -36], true), farAt = cellsOf([98, -36], true);
    // the cells a bead of watercolour leaves alone: round the eyes and the mouth
    const SPARE = new Uint8Array(NN), SPAREC = [];
    for (const [cx, cy, rx, ry] of [[nearAt[0], nearAt[1], 5, 3], [farAt[0], farAt[1], 4, 3], [...cellsOf([15, (lipTop[2][1] + lipLow[1][1]) / 2], true), 5, 2.8]])
      { SPAREC.push([cx + 0.5, cy + 0.5]); for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(N - 1, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(N - 1, cx + rx); x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) SPARE[y * N + x] = 1; }
    const eyes = (t, blinkOn) => {
      const blink = t > 0.2 && blinkOn;
      const lookX = Math.round(Math.max(-1, Math.min(1, facing * ((lookAmt ? look * lookAmt * 1.6 : 0) + (gaze === 'Sidelong' ? 0.8 : 0)))));
      const one = (set, at, far, wink) => {
        let k = gaze === 'Lashes' ? 'lashes' : gaze === 'Looking Up' ? 'up' : gaze === 'Downcast' ? 'down' : 'open';
        if (gaze === 'Laughing') k = 'laugh';
        if (gaze === 'Dreaming') k = 'dream';
        if (blink || wink) k = 'shut';
        if (legend === 'Marble') k = t - wakeAt < 2.6 || !blink ? 'open' : 'shut';   // a statue's blank stare, until a tap wakes it
        const [rows, px0, py0, ay] = set[k], flip = far ? facing > 0 : facing < 0, w = rows[0].length;
        stamp(F, rows, at[0], at[1], flip, null, w >> 1, ay);
        const open = k === 'open' || k === 'lashes' || k === 'up' || k === 'down';
        if (open && (legend !== 'Marble' || t - wakeAt < 2.6)) {
          const ox = at[0] - (w >> 1), oy = at[1] - ay, pw = 2, sx0 = flip ? w - px0 - pw : px0;
          for (let i = 0; i < pw; i++) put(F, ox + sx0 + lookX + i, oy + py0 + (lookAmt && lookY > 0.5 && k === 'open' ? 0 : 0), legend === 'Marble' ? word([70, 64, 60]) : INK);
        }
      };
      one(NEAR, nearAt, false, gaze === 'Wink');
      one(FAR, farAt, true, false);
    };

    // ---------- the frame ----------
    const off = document.createElement('canvas'); off.width = off.height = N;
    const octx = off.getContext('2d'), img = octx.createImageData(N, N), F = new Uint32Array(img.data.buffer);
    // gold leaf: the line is gold on the lacquer and turns dark where it crosses the leaf
    const LACQ = word([58, 26, 18]), swap = legend === 'Gold Leaf';
    const lay2 = (src, dy, inked) => {
      for (let y = N - 1; y >= dy; y--) { const o = y * N, s = (y - dy) * N; for (let x = 0; x < N; x++) { const v = src[s + x]; if (v) F[o + x] = inked && swap && v === INK && F[o + x] !== L0[o + x] ? LACQ : v; } }
    };
    const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    const tmp = new Uint8Array(NN);
    const blinkP = 3.6 + (A % 1000) / 600;
    const flyCol = word(rgb(LEG ? LEG.glint : washes[(washes.indexOf(clothWash) + 4) % washes.length]));
    const GLINT = LEG ? word(rgb(LEG.glint)) : 0, EXPO = word([18, 52, 104]), LIT = word(mixc(g0, [255, 246, 222], 0.3));
    const expo = legend === 'Cyanotype' ? new Float32Array(NN) : null;

    return (t) => {
      const inp = c.input;
      for (const tp of inp.taps()) onTap(tp.x, tp.y, t);
      const dtt = Math.max(0, t - lastT);
      if (inp.inside && !lookAmt) { const [lx, ly] = toLocal(inp.x, inp.y); look += (Math.max(-1, Math.min(1, lx / 300)) - look) * Math.min(1, dtt * 4); lookY += (Math.max(-1, Math.min(1, (ly + 36) / 300)) - lookY) * Math.min(1, dtt * 4); }
      const watch = inp.inside ? 0.8 : 0;
      if (lookAmt > watch) lookAmt = Math.max(watch, lookAmt - dtt / 2.4); else lookAmt += (watch - lookAmt) * Math.min(1, dtt * 3);
      if (lookAmt < 1e-3) lookAmt = 0;
      lastT = t;
      const pcx = Math.floor(inp.x * N), pcy = Math.floor(inp.y * N);

      F.set(L0);
      // the legendary ground under the pointer: a gallery spotlight, or sunprint exposing where you linger
      if (legend === 'Marble' && inp.inside) for (let y = Math.max(0, pcy - 9); y < Math.min(N, pcy + 10); y++) for (let x = Math.max(0, pcx - 9); x < Math.min(N, pcx + 10); x++) { const d = Math.hypot(x - pcx, y - pcy); if (BAYER[(y & 3) * 4 + (x & 3)] < 17 * (1 - d / 9.5)) F[y * N + x] = LIT; }
      if (expo) {
        for (let i = 0; i < NN; i++) if (expo[i] > 0) { expo[i] = Math.max(0, expo[i] - dtt * 0.25); if (expo[i] > BAYER[(Math.floor(i / N) & 3) * 4 + (i & 3)] / 16) F[i] = EXPO; }
        if (inp.inside) for (let y = Math.max(0, pcy - 3); y <= Math.min(N - 1, pcy + 3); y++) for (let x = Math.max(0, pcx - 3); x <= Math.min(N - 1, pcx + 3); x++) if (Math.hypot(x - pcx, y - pcy) < 3.2) expo[y * N + x] = Math.min(1, expo[y * N + x] + dtt * 1.6);
      }
      for (const [x, y, col, big] of splats) { put(F, x, y, col); if (big) put(F, x + 1, y, col); }
      const dy = Math.sin(t * 1.3) > 0.2 ? 1 : 0;   // a breath: the shoulders drop one cell and come back
      lay2(LC, dy);
      lay2(LW, 0);
      // gold leaf catches a band of light: it drifts by itself, follows the pointer, and runs from a tap
      if (legend === 'Gold Leaf') {
        const band = inp.inside ? pcx + pcy : ((t * 9) % (N * 3)) - N * 0.5, run = t - chimeAt < 1.2 ? chimeX + (t - chimeAt) * 90 : -99;
        for (let i = 0; i < NN; i++) if (leaf[i] && F[i] !== W.faceRim) { const s = (i % N) + Math.floor(i / N); if (Math.abs(s - band) < 1.5 || Math.abs(s - run) < 1.5) F[i] = GLINT; }
      }
      // the viewer's beads, as pixel watercolour: a flat pool, a darker rim one cell wide where the pigment
      // gathered, one dithered ring of bleed outside it; it dries by shrinking a cell at a time, and never
      // covers the eyes or the mouth
      for (let i = blooms.length - 1; i >= 0; i--) {
        const b = blooms[i], age = t - b.born, life = 7;
        if (age > life) { blooms.splice(i, 1); continue; }
        const grow = 1 - Math.pow(1 - Math.min(1, age / 0.9), 3), fade = 1 - Math.max(0, (age - 2) / (life - 2)), r = b.R * (0.25 + 0.75 * grow) * Math.max(0, fade);
        if (r < UNIT * 0.8) continue;
        tmp.fill(0);
        fillPoly(curve(b.pts.map(p => [b.x + p[0] * r, b.y + p[1] * r]), true).map(q => cellAt(q, false)), k => { tmp[k] = 1; });
        for (let k = 0; k < NN; k++) {
          if (SPARE[k]) continue;
          const x = k % N, y = (k - x) / N;
          const out = (x > 0 && !tmp[k - 1]) || (x < N - 1 && !tmp[k + 1]) || (y > 0 && !tmp[k - N]) || (y < N - 1 && !tmp[k + N]);
          if (tmp[k]) F[k] = out ? b.rim : b.flat;
          else if (((x + y) & 1) === 0 && ((x > 0 && tmp[k - 1]) || (x < N - 1 && tmp[k + 1]) || (y > 0 && tmp[k - N]) || (y < N - 1 && tmp[k + N]))) F[k] = b.flat;
        }
      }
      // sunprint: a tap sends out a ring of light
      for (let i = rings.length - 1; i >= 0; i--) {
        const [rx, ry, born] = rings[i], age = t - born, rr = age * 22;
        if (age > 1.8) { rings.splice(i, 1); continue; }
        for (let k = 0; k < 64; k++) { const a = k / 64 * Math.PI * 2; for (const d of [rr, rr - 2.5]) if (d > 0 && (d === rr || age < 1.2)) put(F, Math.floor(rx + Math.cos(a) * d), Math.floor(ry + Math.sin(a) * d), GLINT); }
      }
      lay2(LB, dy, true);
      // the butterfly (two-frame flap) and the bird (its head bobs a cell)
      if (accent === 'Butterfly') {
        const [fx, fy0] = flyAt, fy = fy0 + dy * UNIT, flap = Math.cos(t * 3.1) > 0 ? 1 : 0.5, wings = [];
        for (const s of [-1, 1]) wings.push([[fx, fy - 4], [fx + s * 44 * flap, fy - 44], [fx + s * 56 * flap, fy - 4], [fx + s * 30 * flap, fy + 22], [fx, fy + 6]].map(q => cellAt(q, false)));
        tmp.fill(0); for (const w of wings) fillPoly(w, k => { tmp[k] = 1; });
        for (let k = 0; k < NN; k++) if (tmp[k]) { const x = k % N, y = (k - x) / N, e = (x > 0 && !tmp[k - 1]) || (x < N - 1 && !tmp[k + 1]) || (y > 0 && !tmp[k - N]) || (y < N - 1 && !tmp[k + N]); F[k] = e ? INK : flyCol; }
        ring(F, [[fx, fy - 26], [fx, fy + 22]], false, null, true);
      }
      if (accent === 'Bird') {
        const bx = 300, by = 400 + bodyDY + dy * UNIT, bob = Math.sin(t * 1.7) > 0.4 ? UNIT : 0;
        line(F, [[bx - 50, by], [bx - 10, by - 30], [bx + 30, by - 28], [bx + 40, by - 8], [bx, by + 6], [bx - 50, by]], false, null, true);
        line(F, [[bx + 22, by - 28 - bob], [bx + 40, by - 52 - bob], [bx + 62, by - 44 - bob], [bx + 40, by - 30]], false, null, true);
        ring(F, [[bx + 62, by - 44 - bob], [bx + 80, by - 40 - bob]], false, null, true);
        ring(F, [[bx - 50, by], [bx - 84, by - 6]], false, null, true);
        const [ex2, ey2] = cellsOf([bx + 48, by - 46 - bob], false); put(F, ex2, ey2, INK);
      }
      lay2(LH, 0, true);
      eyes(t, (t % blinkP) < 0.14);
      if (LITE) for (let i = 0; i < NN; i++) if (onFace[i] && F[i] === INK) F[i] = LITE;
      // the brush's bead glints when the pointer comes near
      // a vermilion bead swells under the brush, drips and falls, again and again
      if (brushDrip) {
        const ph = (t * 0.4 + 0.75) % 1, [bx, by] = brushDrip, VER = word([226, 70, 48]), VHI = word([255, 150, 120]);
        if (ph < 0.55) { put(F, bx, by + 1, VER); if (ph > 0.3) put(F, bx, by + 2, VER); }
        else { const fy = by + 2 + Math.floor(Math.pow((ph - 0.55) / 0.45, 2) * 14); put(F, bx, fy, VER); put(F, bx + 1, fy, VER); put(F, bx, fy + 1, VER); put(F, bx + 1, fy + 1, VER); put(F, bx, fy, VHI); if (fy > by + 3) put(F, bx, fy - 1, word([200, 60, 44])); }
      }
      if (brushCell && inp.inside && Math.abs(pcx - brushCell[0]) <= 6 && Math.abs(pcy - brushCell[1]) <= 6 && Math.floor(t * 3) % 2 === 0) { const [x, y] = brushCell; put(F, x, y - 1, word([255, 240, 200])); put(F, x - 1, y - 2, word([255, 250, 230])); put(F, x + 1, y - 2, word([255, 250, 230])); put(F, x, y - 3, word([255, 240, 200])); }

      octx.putImageData(img, 0, 0);
      ctx.setTransform(1, 0, 0, 1, 0, 0);   // the whole canvas, cells scaled up
      ctx.imageSmoothingEnabled = false;   // the cells stay hard
      ctx.drawImage(off, 0, 0, N, N, 0, 0, S, S);
    };
  },
});

})(window.Proto);
