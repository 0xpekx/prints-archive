// Rooftop Clan: from D:/code/synaesthesia/public/drop03/pieces/103.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Rooftop Clan: ninja portraits under old home-console limits (three colours per sprite tile).
Proto.add({
  num: 103,
  name: 'Rooftop Clan',
  fam: 'Pixel Portraits II',
  seed: 2,
  recipe: 'A masked ninja at night, 32 dots across, drawn under old home-console limits: every 8 x 8 sprite tile may hold only three colours, and the backdrop is painted in 16 x 16 blocks of three colours over one shared sky. Garb, skin, hood, mask, eyes, face paint, one odd face detail, headband, clan crest, build, jacket, pose, gear, backdrop, weather and a familiar vary, and a rare few cartridges play in handheld green or sepia; band tails flutter and the eyes blink.',
  interactive: 'Tap to make it vanish in smoke. Hold to raise a wind.',
  music: true,
  make(c) {
    const S = c.size, g = c.ctx;
    // sfc32 seeded with four words of the hash
    const hw = i => parseInt(c.hash.substr(2 + i * 8, 8), 16) >>> 0; // the hash's eight words
    let A = hw(0) ^ hw(4), B = hw(1) ^ hw(5), C = hw(2) ^ hw(6), D = hw(3) ^ hw(7) | 1; // folded in pairs
    function rnd() {
      A >>>= 0; B >>>= 0; C >>>= 0; D >>>= 0; // keep the four words unsigned
      const t = (A + B | 0) + D | 0; // sfc32 step
      D = D + 1 | 0;
      A = B ^ B >>> 9;
      B = C + (C << 3) | 0;
      C = C << 21 | C >>> 11;
      C = C + t | 0;
      return (t >>> 0) * 2.3283064365386963e-10; // to 0..1
    }
    for (let warm = 0; warm < 14; warm++) rnd();
    const roll = (o) => {
      const keys = Object.keys(o);
      let sum = 0;
      for (const k of keys) sum += o[k];
      let r = rnd() * sum;
      for (const k of keys) { r -= o[k]; if (r < 0) return k; } // walk the weights
      return keys[0];
    };

    let garb = roll({ Charcoal: 30, Indigo: 24, Crimson: 14, Moss: 14, Plum: 10, 'Snow White': 5, Gold: 3 });
    const skin = roll({ Fair: 16, Light: 18, Medium: 18, Tan: 18, Brown: 16, Deep: 14 });
    let mask = roll({ 'Full Wrap': 36, 'Half Mask': 24, 'Open Hood': 22, 'Iron Jaw': 11, 'Demon Mask': 7 });
    let eyes = roll({ Steady: 32, Narrow: 26, Wide: 18, Scarred: 12, Glowing: 7, 'Shut Calm': 5 });
    let band = roll({ None: 30, 'Red Band': 30, 'Plate Band': 24, 'Long Tails': 10, 'Gold Plate': 6 });
    let gear = roll({ Katana: 30, 'Twin Hilts': 16, Shuriken: 20, Kunai: 18, Scroll: 9, 'Smoke Bomb': 7 });
    let back = roll({ 'Moon Roofs': 30, Bamboo: 20, 'Castle Wall': 18, Dusk: 16, 'Blossom Night': 9, Lanterns: 7 });

    // the newer traits: xoshiro128** on four other slices of the hash, so every roll above keeps its value
    const hq = i => parseInt(c.hash.substr(6 + i * 13, 8), 16) >>> 0;
    let q0 = hq(0) | 1, q1 = hq(1), q2 = hq(2), q3 = hq(3) ^ 0x9e3779b9;
    const rotl = (v, k) => (v << k) | (v >>> (32 - k)); // 32-bit rotate
    function xo() {
      const r = Math.imul(rotl(Math.imul(q1, 5), 7), 9) >>> 0, tt = q1 << 9;
      q2 ^= q0; q3 ^= q1; q1 ^= q2; q0 ^= q3; q2 ^= tt; q3 = rotl(q3, 11);
      return r / 4294967296;
    }
    for (let i = 0; i < 5; i++) xo();
    const pickX = list => { let sum = 0; for (let i = 1; i < list.length; i += 2) sum += list[i]; let r = xo() * sum; for (let i = 0; i < list.length; i += 2) { r -= list[i + 1]; if (r < 0) return list[i]; } return list[0]; };
    // a chance to trade an old value for a newer one: always two draws, so the stream never shifts
    const swapIn = (cur, p, list) => { const a = xo(), b = pickX(list); return a < p ? b : cur; };
    const hood = pickX(['Round Hood', 36, 'Peaked Hood', 22, 'Knotted Hood', 18, 'Straw Kasa', 14, 'Wide Brim', 6, 'Horned Helm', 4]);
    let pose = pickX(['Ready', 42, 'Hand Seal', 22, 'Arms Crossed', 20, 'Blade Raised', 16]);
    const crest = pickX(['None', 34, 'Ring', 14, 'Diamond', 13, 'Crescent', 12, 'Three Dots', 11, 'Wave', 9, 'Cross Bars', 7]);
    const weather = pickX(['Clear', 46, 'Snow', 14, 'Rain', 13, 'Falling Leaves', 13, 'Fireflies', 10, 'Shooting Stars', 4]);
    let paint = pickX(['None', 56, 'Red Liner', 14, 'Eye Black', 11, 'Cheek Bars', 10, 'Ash Smudge', 6, 'Gold Leaf', 3]);
    const cart = pickX(['Standard', 93, 'Handheld Green', 4, 'Sepia', 3]);
    garb = swapIn(garb, 0.24, ['Teal', 34, 'Rust', 30, 'Sakura', 22, 'Shadow', 14]);
    mask = swapIn(mask, 0.2, ['Fox Mask', 40, 'Cloth Veil', 34, 'Crow Mask', 26]);
    eyes = swapIn(eyes, 0.16, ['Crimson', 50, 'Odd Glow', 50]);
    band = swapIn(band, 0.2, ['Blue Band', 40, 'Twin Tails', 34, 'Bandage Wrap', 26]);
    gear = swapIn(gear, 0.32, ['Bo Staff', 30, 'War Fan', 28, 'Kusarigama', 24, 'Paper Lantern', 18]);
    back = swapIn(back, 0.3, ['Waterfall', 30, 'Pagoda', 28, 'Red Gate', 26, 'Snow Pines', 16]);
    if (mask === 'Demon Mask' || mask === 'Fox Mask' || mask === 'Crow Mask' || hood === 'Horned Helm') band = 'None';
    // the face: a taus88 stream on three more slices of the hash (expression, and newer eyes and paint)
    let ta = (parseInt(c.hash.substr(10, 8), 16) | 0x80) >>> 0, tb = (parseInt(c.hash.substr(34, 8), 16) | 0x800) >>> 0, tc = (parseInt(c.hash.substr(50, 8), 16) | 0x8000) >>> 0;
    const taus = () => {
      ta = (((ta & 0xfffffffe) << 12) ^ (((ta << 13) ^ ta) >>> 19)) >>> 0;
      tb = (((tb & 0xfffffff8) << 4) ^ (((tb << 2) ^ tb) >>> 25)) >>> 0;
      tc = (((tc & 0xfffffff0) << 17) ^ (((tc << 3) ^ tc) >>> 11)) >>> 0;
      return ((ta ^ tb ^ tc) >>> 0) / 4294967296;
    };
    const tpick = list => { let sum = 0; for (let i = 1; i < list.length; i += 2) sum += list[i]; let r = taus() * sum; for (let i = 0; i < list.length; i += 2) { r -= list[i + 1]; if (r < 0) return list[i]; } return list[0]; };
    const tswap = (cur, pr, list) => { const a = taus(), b = tpick(list); return a < pr ? b : cur; };
    let expression = tpick(['Glare', 28, 'Focused', 24, 'Furious', 16, 'Smirk', 17, 'Calm', 15]);
    eyes = tswap(eyes, 0.26, ['Gold Eyes', 28, 'Ice Eyes', 26, 'Jade Eyes', 22, 'Blind Eye', 24]);
    paint = tswap(paint, 0.24, ['Kabuki Red', 28, 'War Stripes', 28, 'Tear Mark', 22, 'Ink Brow', 22]);
    if (eyes === 'Shut Calm') expression = 'Calm';
    if (pose === 'Blade Raised' && !(gear === 'Katana' || gear === 'Twin Hilts' || gear === 'Kunai')) pose = 'Ready';
    // the build (the outline of the shoulders): its own murmur-mixed draw on a middle slice of the hash, so nothing above moves
    let bq = (parseInt(c.hash.substr(18, 8), 16) ^ 0x3c6ef372) >>> 0;
    bq = Math.imul(bq ^ (bq >>> 16), 0x85ebca6b) >>> 0; bq = Math.imul(bq ^ (bq >>> 13), 0xc2b2ae35) >>> 0; bq = (bq ^ (bq >>> 16)) >>> 0;
    const build = (() => { let r = bq / 4294967296 * 100; for (const [v, w] of [['Standard', 30], ['Broad', 24], ['Lean', 26], ['Armoured', 20]]) { r -= w; if (r < 0) return v; } return 'Standard'; })();
    // the face's one odd detail, the cut of the jacket and the hand on the hilt: a splitmix stream on a later slice of the hash, so nothing above moves
    let nq = (parseInt(c.hash.substr(42, 8), 16) ^ 0x51ed270b) >>> 0;
    const nr = () => { nq = (nq + 0x9e3779b9) >>> 0; let z = nq; z = Math.imul(z ^ (z >>> 16), 0x21f0aaad); z = Math.imul(z ^ (z >>> 15), 0x735a2d97); return ((z ^ (z >>> 15)) >>> 0) / 4294967296; };
    const npick = list => { let sum = 0; for (let i = 1; i < list.length; i += 2) sum += list[i]; let r = nr() * sum; for (let i = 0; i < list.length; i += 2) { r -= list[i + 1]; if (r < 0) return list[i]; } return list[0]; };
    const detail = npick(['Hair Strand', 28, 'Heavy Lid', 26, 'Brow Nick', 24, 'Cheek Scar', 22]);
    const jacket = npick(['Crossed Wrap', 28, 'Sash', 28, 'Belted', 26, 'Sleeveless', 18]);
    const hilt = nr();
    if (pose === 'Ready' && hilt < 0.42) pose = 'Hand on Hilt';
    const bareFace = !(mask === 'Demon Mask' || mask === 'Fox Mask' || mask === 'Crow Mask');
    // ---------- legendaries: a Weyl counter through a murmur finaliser, keyed by a rotate-multiply fold of the hash ----------
    let lkey = 0x6b79;
    for (let i = 2; i < c.hash.length; i++) lkey = Math.imul(((lkey ^ c.hash.charCodeAt(i)) << 5) | ((lkey ^ c.hash.charCodeAt(i)) >>> 27), 0x27d4eb2d) >>> 0;
    let weyl = lkey;
    const lgd = () => { weyl = (weyl + 0x61c88647) >>> 0; let z = weyl ^ lkey; z = Math.imul(z ^ (z >>> 16), 0x85ebca6b); z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35); return ((z ^ (z >>> 16)) >>> 0) / 4294967296; };
    const lu = lgd(), lp = lgd(), lcv = lgd();
    const legend = lu < 0.0022 ? (lp < 0.4 ? 'Mecha' : lp < 0.72 ? 'Ghost' : 'Ink Scroll') : 'None';
    const spatter = []; for (let i = 0; i < 14; i++) spatter.push([lgd(), lgd(), lgd()]);
    // each legendary still varies, from the same stream: plating and visor, the spirit's colour, the scroll's sun, band and scenery
    const lv = [lgd(), lgd(), lgd(), lgd()];
    const antenna = ['Single Antenna', 'Twin Horns', 'Crest Fin', 'Ear Dishes'][Math.floor(lv[3] * 4)], wisps = 2 + Math.floor(lv[2] * 3);
    const plating = ['Gunmetal', 'Crimson', 'Gold', 'Ivory'][Math.floor(lv[0] * 4)], visor = ['Red', 'Green', 'Blue', 'Amber'][Math.floor(lv[1] * 4)];
    const spirit = ['Blue', 'Green', 'Violet', 'Pale'][Math.floor(lv[0] * 4)];
    const inkSun = ['Red Sun', 'Gold Sun', 'Pale Moon'][Math.floor(lv[0] * 3)], inkBand = ['White Band', 'Grey Band', 'No Band'][Math.floor(lv[1] * 3)], inkScene = ['Mountains', 'Waves', 'Bamboo'][Math.floor(lv[2] * 3)];
    if (legend !== 'None') {
      c.trait('Legendary', legend);
      if (legend === 'Mecha') { c.trait('Plating', plating); c.trait('Visor', visor); c.trait('Antenna', antenna); }
      if (legend === 'Ghost') { c.trait('Spirit', spirit); c.trait('Spirit Flames', String(wisps)); }
      if (legend === 'Ink Scroll') { c.trait('Sun', inkSun); c.trait('Band', inkBand); c.trait('Scenery', inkScene); }
      else { c.trait('Backdrop', back); c.trait('Weather', weather); }
    }
    else {
    c.trait('Garb', garb); c.trait('Skin', skin); c.trait('Hood', hood); c.trait('Mask', mask); c.trait('Eyes', eyes); c.trait('Expression', expression); c.trait('Face Paint', paint);
    if (bareFace) c.trait('Face Detail', detail);
    c.trait('Headband', band); c.trait('Crest', crest); c.trait('Build', build); c.trait('Jacket', jacket); c.trait('Pose', pose); c.trait('Gear', gear); c.trait('Backdrop', back); c.trait('Weather', weather);
    }

    // colour table (index -> rgb); the console's fixed palette, picked by hand
    const COL = [];
    const col = (r, gg, b) => { COL.push([r, gg, b]); return COL.length - 1; };
    const K = col(10, 8, 22);
    const WH = col(248, 248, 240);
    const GARB = {
      Charcoal: [[60, 60, 72], [120, 120, 136]], Indigo: [[32, 40, 130], [84, 100, 220]], Crimson: [[150, 20, 40], [228, 72, 72]],
      Moss: [[30, 88, 40], [96, 164, 72]], Plum: [[90, 30, 110], [168, 84, 196]], 'Snow White': [[164, 172, 196], [240, 244, 252]], Gold: [[164, 108, 8], [252, 200, 60]],
      Teal: [[16, 96, 100], [64, 176, 168]], Rust: [[128, 52, 24], [208, 108, 52]], Sakura: [[188, 84, 120], [248, 168, 196]], Shadow: [[24, 24, 34], [54, 54, 76]],
    }[garb];
    const C1 = col(...GARB[0]), C2 = col(...GARB[1]);
    const SK = { Fair: [252, 216, 188], Light: [236, 188, 140], Medium: [212, 150, 92], Tan: [176, 112, 64], Brown: [128, 76, 44], Deep: [86, 50, 32] }[skin];
    const SKN = col(...SK);
    const darkSkin = skin === 'Brown' || skin === 'Deep';
    const RED = col(220, 36, 44), MET = col(188, 192, 204), GLD = col(252, 196, 40), YEL = col(252, 236, 120), PNK = col(252, 168, 196), SMK = col(196, 196, 204);
    const HILT = col(70, 40, 30);
    const FLM = col(150, 210, 255), SNK = col(90, 170, 80);
    const STRAW = col(214, 178, 104), STRAWD = col(146, 106, 48), BLU = col(60, 110, 230), ASH = col(118, 116, 128), WOOD = col(150, 96, 52);
    const LEAF = col(236, 124, 40), RAIN = col(150, 186, 236);
    // a familiar: its own stream (a multiply-xorshift on a middle slice of the hash) so the rolls above keep their values
    let fq = (parseInt(c.hash.substr(26, 8), 16) ^ 0x7ed55d16) >>> 0 || 13;
    const fr = () => { fq = Math.imul(fq ^ (fq >>> 15), 0x2c1b3c6d) >>> 0; fq ^= fq >>> 12; fq = (fq + 0x6b43a9b5) >>> 0; return fq / 4294967296; };
    const famRoll = fr() * 100;
    let familiar = famRoll < 58 ? 'None' : famRoll < 76 ? 'Raven' : famRoll < 88 ? 'Spirit Flame' : famRoll < 97 ? 'Snake' : 'Golden Crane';
    familiar = swapIn(familiar, 0.22, ['Hawk', 36, 'Spirit Koi', 34, 'Paper Bird', 30]);
    if (legend === 'None' && lcv < 0.005) familiar = 'Storm Dragon';
    if (legend === 'None') {
    c.trait('Familiar', familiar); // the creature at its side
    c.trait('Cartridge', cart);
    }

    const BG = {
      'Moon Roofs': [[16, 20, 60], [252, 236, 176], [204, 184, 120], [44, 44, 80], [90, 90, 130]],
      Bamboo: [[8, 30, 20], [60, 150, 60], [28, 90, 40], [140, 210, 100], [20, 60, 30]],
      'Castle Wall': [[20, 24, 70], [220, 220, 210], [96, 100, 120], [60, 62, 84], [150, 150, 170]],
      Dusk: [[200, 70, 50], [252, 180, 80], [80, 20, 40], [130, 40, 60], [252, 120, 70]],
      'Blossom Night': [[24, 16, 50], [252, 180, 210], [200, 100, 150], [60, 30, 70], [110, 60, 110]],
      Lanterns: [[30, 12, 30], [240, 64, 40], [252, 200, 90], [70, 30, 50], [120, 50, 60]],
      Waterfall: [[12, 26, 44], [222, 240, 255], [86, 146, 208], [36, 46, 58], [64, 84, 96]],
      Pagoda: [[52, 24, 70], [252, 196, 110], [40, 18, 44], [18, 8, 26], [132, 62, 96]],
      'Red Gate': [[16, 22, 54], [226, 60, 48], [140, 28, 30], [36, 38, 66], [236, 226, 196]],
      'Snow Pines': [[22, 34, 66], [236, 242, 255], [34, 76, 70], [16, 44, 42], [150, 170, 200]],
    }[back];
    const U = col(...BG[0]), B1 = col(...BG[1]), B2 = col(...BG[2]), B3 = col(...BG[3]), B4 = col(...BG[4]);
    // colours only the legendaries and the storm dragon use (added last, so nothing above moves)
    const SKD = col(Math.round(SK[0] * 0.7), Math.round(SK[1] * 0.66), Math.round(SK[2] * 0.66)), ICE = col(120, 200, 255), JADE = col(70, 210, 130);
    const STEEL = col(...{ Gunmetal: [84, 92, 116], Crimson: [138, 34, 44], Gold: [168, 124, 34], Ivory: [178, 174, 160] }[plating]), SPB = col(...{ Blue: [52, 86, 172], Green: [34, 128, 96], Violet: [104, 58, 168], Pale: [104, 118, 146] }[spirit]), PAPER = col(238, 228, 202), FIBRE = col(212, 198, 166), INK = col(30, 26, 32), WASH = col(136, 130, 126), SEAL = col(198, 34, 38), STORM = col(64, 126, 222);
    // a light line for the features on the deepest skins (a lower lip and a nose-bridge catchlight)
    const SKL = col(Math.round(SK[0] * 0.55 + 115), Math.round(SK[1] * 0.55 + 96), Math.round(SK[2] * 0.55 + 76));
    // the jacket's middle tone (a step lighter than the hood), and the sash or belt in a second colour
    const CM = col(Math.round(GARB[0][0] * 0.55 + GARB[1][0] * 0.45), Math.round(GARB[0][1] * 0.55 + GARB[1][1] * 0.45), Math.round(GARB[0][2] * 0.55 + GARB[1][2] * 0.45));
    const sashRGB = garb === 'Crimson' || garb === 'Rust' || garb === 'Sakura' ? [232, 184, 72] : garb === 'Gold' ? [40, 36, 60] : [206, 40, 48];
    const SASH = col(...sashRGB), SASHD = col(...sashRGB.map(v => Math.round(v * 0.62)));
    // an old scar: a pink-brown line on the fairest skins, a pale one on the rest
    const SCR = col(...(skin === 'Fair' || skin === 'Light' ? [Math.round(SK[0] * 0.8), Math.round(SK[1] * 0.58), Math.round(SK[2] * 0.62)] : [Math.round(SK[0] * 0.5 + 124), Math.round(SK[1] * 0.5 + 110), Math.round(SK[2] * 0.5 + 92)]));

    const N = 32;
    const stars = [];
    for (let i = 0; i < 16; i++) stars.push([Math.floor(rnd() * N), Math.floor(rnd() * 14), rnd() * 6.28]);
    const petals = [];
    for (let i = 0; i < 9; i++) petals.push([rnd() * N, rnd() * N, 0.6 + rnd() * 0.8, rnd() * 6.28]);
    const stalks = [];
    for (let i = 0; i < 6; i++) stalks.push([Math.floor(rnd() * 30), 3 + Math.floor(rnd() * 5)]);
    const moonX = rnd() < 0.5 ? 6 : 25;
    const blinkGap = 3.2 + rnd() * 2.6, blinkOff = rnd() * 4, windPh = rnd() * 6.28;
    // weather sprites: a fixed handful of one-dot sprites
    const motes = [];
    for (let i = 0; i < 18; i++) motes.push([xo() * N, xo() * N, 0.6 + xo() * 0.9, xo() * 6.28]);

    // the vanishing trick: its own xorshift32 from the hash tail, so every draw above stays put
    let xq = (parseInt(c.hash.substr(54, 8), 16) ^ 0xa5a5a5a5) >>> 0 || 7;
    const xr = () => { xq = (xq ^ (xq << 13)) >>> 0; xq = (xq ^ (xq >>> 17)) >>> 0; xq = (xq ^ (xq << 5)) >>> 0; return xq / 2 ** 32; };
    const tune = [[0, 1, 5, 7, 8], [0, 2, 3, 7, 8], [0, 1, 5, 7, 10]][Math.floor(xr() * 3)], tonic = 64 + Math.floor(xr() * 5);
    const puffs = [];
    for (let i = 0; i < 9; i++) puffs.push([16 + (xr() - 0.5) * 16, 15 + (xr() - 0.5) * 18, 2.5 + xr() * 3, xr() * 6.28]);
    let sizing = false, sizedAt = -9;
    let poofAt = -9, wind = 0, clock = 0, ptr = null, legAt = -9, inkAt = -9, wasIn = false;
    const POOF = 1.5;

    const bg = new Int16Array(N * N), sp = new Int16Array(N * N), fx = new Int16Array(N * N), ez = new Int16Array(N * N);
    // the face's own sprite layers: skin and masks (fc), mouth, paint and scars (pt); the eyes stay on ez
    const fc = new Int16Array(N * N), pt = new Int16Array(N * N);
    // and two for the body: the jacket's sash, belt, bare arms and crest (jk), and the bare hands (hd)
    const jk = new Int16Array(N * N), hd = new Int16Array(N * N);
    const P = (L, x, y, v) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < N && y < N) L[y * N + x] = v; };
    const fillEl = (L, cx, cy, rx, ry, v) => {
      for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) { // the ellipse's box
        const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
        if (dx * dx + dy * dy <= 1) P(L, x, y, typeof v === 'function' ? v(x, y) : v);
      }
    };
    const rect = (L, x0, y0, x1, y1, v) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) P(L, x, y, v); };

    // keep at most `keep` colours in each tile; the rest snap to the nearest kept colour
    function limit(L, tile, keep, skip, favour) {
      const cnt = new Map();
      for (let ty = 0; ty < N; ty += tile) for (let tx = 0; tx < N; tx += tile) {
        cnt.clear();
        for (let y = ty; y < ty + tile; y++) for (let x = tx; x < tx + tile; x++) {
          const v = L[y * N + x];
          if (v !== skip && v >= 0) cnt.set(v, (cnt.get(v) || 0) + (v === favour ? 1000 : 1));
        }
        if (cnt.size <= keep) continue;
        const kept = [...cnt.entries()].sort((p, q) => q[1] - p[1]).slice(0, keep).map(e => e[0]);
        for (let y = ty; y < ty + tile; y++) for (let x = tx; x < tx + tile; x++) {
          const i = y * N + x, v = L[i];
          if (v === skip || v < 0 || kept.includes(v)) continue;
          let best = kept[0], bd = 1e9;
          for (const k of kept) {
            const a = COL[v], b = COL[k], d = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 * 1.4 + (a[2] - b[2]) ** 2;
            if (d < bd) { bd = d; best = k; }
          }
          L[i] = best;
        }
      }
    }

    function backdrop(t) {
      bg.fill(U);
      if (back === 'Moon Roofs') {
        for (const s of stars) if (Math.sin(t * 1.1 + s[2]) > -0.4) P(bg, s[0], s[1], s[2] > 4 ? B2 : B1);
        fillEl(bg, moonX, 6, 4.6, 4.6, (x, y) => ((x * 3 + y * 5) % 7 === 0 || (x - moonX) + (y - 6) > 3) ? B2 : B1);
        for (let x = 0; x < N; x++) {
          const ridge = 22 + Math.round(Math.abs(((x + 4) % 16) - 8) * 0.35);
          for (let y = ridge; y < N; y++) P(bg, x, y, (y - ridge) % 3 === 0 ? B4 : B3);
        }
      } else if (back === 'Bamboo') {
        for (const s of stalks) for (let y = 0; y < N; y++) {
          const node = (y + s[1] * 3) % 9 === 0;
          for (let k = 0; k < 2; k++) P(bg, s[0] + k, y, node ? B3 : k ? B2 : B1);
          if (node) { P(bg, s[0] + 2, y - 1, B1); P(bg, s[0] + 3, y - 2, B1); }
        }
        for (let x = 0; x < N; x++) for (let y = 29; y < N; y++) P(bg, x, y, B4);
      } else if (back === 'Castle Wall') {
        for (const s of stars) if (s[1] < 9 && Math.sin(t + s[2]) > 0) P(bg, s[0], s[1], B1);
        for (let x = 0; x < N; x++) for (let y = 12; y < N; y++) {
          let v = y < 15 ? B1 : B3;
          if (y === 15) v = B2;
          if (y > 15 && ((y - 16) % 4 === 3 || (x + ((y - 16) >> 2) % 2 * 3) % 6 === 0)) v = B2;
          if (y > 15 && (x * 5 + y * 3) % 23 === 0) v = B4;
          P(bg, x, y, v);
        }
        for (let x = 0; x < N; x += 4) { P(bg, x, 11, B2); P(bg, x + 1, 11, B2); }
      } else if (back === 'Dusk') {
        for (let y = 8; y < 15; y++) for (let x = 0; x < N; x++) if ((x + y) % 2 === 0 || y > 11) P(bg, x, y, B4);
        fillEl(bg, moonX, 13, 4, 4, B1);
        for (let x = 0; x < N; x++) {
          const h = 17 + ((x * 13) % 5 === 0 ? -3 : 0) + (x > 22 && x < 28 ? -4 : 0);
          for (let y = h; y < N; y++) P(bg, x, y, y > 25 ? B2 : B3);
        }
      } else if (back === 'Blossom Night') {
        for (let x = 0; x < N; x++) for (let y = 0; y < 7; y++) if (Math.sin(x * 0.7) * 2 + 4 > y) P(bg, x, y, (x + y) % 3 ? B2 : B1);
        for (let y = 0; y < N; y++) { P(bg, 1, y, B3); P(bg, 2, y, B4); }
        for (const p of petals) {
          const y = (p[1] + t * p[2] * 2.2) % N, x = (p[0] + Math.sin(t * 0.8 + p[3]) * 2 + N) % N;
          P(bg, x, y, B1);
        }
      } else if (back === 'Lanterns') {
        for (let x = 0; x < N; x++) P(bg, x, 3, B3);
        for (const lx of [4, 27]) {
          const sw = Math.round(Math.sin(t * 1.2 + lx) * 0.6);
          for (let y = 4; y < 6; y++) P(bg, lx + sw, y, B3);
          fillEl(bg, lx + 0.5 + sw, 9, 2.6, 3.2, (x, y) => y % 2 ? B2 : B1);
        }
        for (let x = 0; x < N; x++) for (let y = 26; y < N; y++) P(bg, x, y, (x + y * 2) % 7 ? B3 : B4);
      } else if (back === 'Waterfall') { // water down the left side
        // a fall of water down the left, white where it breaks, over dark rock
        for (let y = 0; y < N; y++) for (let x = 0; x < 9; x++) {
          const fall = (y * 2 - Math.floor(t * 14) + x * 5) % 7;
          P(bg, x, y, x === 0 || x === 8 ? B3 : fall < 2 ? B1 : B2);
        }
        for (let x = 0; x < N; x++) for (let y = 27; y < N; y++) P(bg, x, y, x < 11 && (x + y + Math.floor(t * 6)) % 3 === 0 ? B1 : y === 27 ? B4 : B3);
        for (const s of stars) if (s[0] > 12 && Math.sin(t * 1.3 + s[2]) > 0) P(bg, s[0], s[1], B4);
      } else if (back === 'Pagoda') {
        // a tiered tower against a violet sky, its windows lit
        fillEl(bg, moonX, 5, 3.4, 3.4, B1);
        for (let tier = 0; tier < 4; tier++) {
          const y = 8 + tier * 6, w = 4 + tier * 1.3;
          for (let x = Math.round(25 - w - 2); x <= Math.round(25 + w + 2); x++) P(bg, x, y, B3);
          for (let x = Math.round(25 - w - 3); x <= Math.round(25 + w + 3); x += 1) if (x < 25 - w - 1 || x > 25 + w + 1) P(bg, x, y - 1, B3);
          for (let yy = y + 1; yy < y + 6; yy++) for (let x = Math.round(25 - w); x <= Math.round(25 + w); x++) P(bg, x, yy, (x === 25 || x === 24) && yy === y + 3 ? B1 : B2);
        }
        P(bg, 25, 5, B3); P(bg, 25, 6, B3); P(bg, 25, 7, B3);
      } else if (back === 'Red Gate') {
        // a great gate behind its shoulder, painted in two reds
        for (let x = 0; x < N; x++) { P(bg, x, 5, B1); P(bg, x, 6, B2); P(bg, x, 9, B1); }
        for (const px of [5, 26]) for (let y = 6; y < N; y++) { P(bg, px, y, B1); P(bg, px + 1, y, B2); }
        P(bg, 0, 4, B1); P(bg, 31, 4, B1);
        for (let x = 0; x < N; x++) for (let y = 28; y < N; y++) P(bg, x, y, (x * 3 + y) % 5 ? B3 : B4);
        for (const s of stars) if (s[1] < 4 && Math.sin(t * 1.1 + s[2]) > -0.2) P(bg, s[0], s[1], B4);
      } else {
        // snow on dark pines, flakes drifting down
        for (let k = 0; k < 4; k++) {
          const px = [3, 11, 22, 29][k], top = [10, 14, 9, 13][k];
          for (let y = top; y < N; y++) { const w = Math.min(4, (y - top) * 0.5 + 0.5); for (let x = Math.round(px - w); x <= Math.round(px + w); x++) P(bg, x, y, (y - top) % 3 === 0 && x < px ? B1 : B2); }
        }
        for (let x = 0; x < N; x++) for (let y = 28; y < N; y++) P(bg, x, y, B1);
        for (const s of stars) P(bg, s[0], (s[1] + t * 1.5 + s[2] * 3) % 28, B4);
      }
      limit(bg, 16, 3, U, -1);
    }

    // the hood's half-width on each row from 10 above the head's middle to 8 below, drawn rather than a circle
    const HOODW = {
      round: [0, 3.6, 5.6, 6.8, 7.6, 8.2, 8.6, 8.7, 8.7, 8.7, 8.7, 8.7, 8.7, 8.5, 8.1, 7.6, 7.1, 6.6, 6.1],
      peaked: [1, 2.2, 3.6, 5, 6.4, 7.6, 8.4, 8.7, 8.7, 8.7, 8.7, 8.7, 8.7, 8.5, 8.1, 7.6, 7.1, 6.6, 6.1],
    };
    const hoodRows = hood === 'Peaked Hood' ? HOODW.peaked : HOODW.round;
    // the open face, x 10 to 21 from three rows over the eyes down to the chin: s skin, d shade (lit from the left,
    // the hood pulled low so the brow is in its shadow and the far cheek falls into shade)
    const OPEN_FACE = [
      '............',
      '..dddddddd..',
      '.dssssssssdd',
      'sssssssssddd',
      'ssssssdsdddd',
      '.ssssdddsddd',
      '.sssssssddd.',
      '.ssssssssdd.',
      '..sssssssd..',
      '..ssssssdd..',
      '....dddd....',
    ];
    const CREST = {
      Ring: ['.X.', 'X.X', '.X.'], Diamond: ['.X.', 'XXX', '.X.'], Crescent: ['XX.', 'X..', 'XX.'], 'Three Dots': ['X.X', '...', '.X.'], Wave: ['X..', '.X.', '..X'].map((r, i) => i === 1 ? 'XXX' : r), 'Cross Bars': ['XXX', '.X.', 'XXX'],
    }[crest];
    const crestC = garb === 'Gold' || garb === 'Sakura' ? WH : garb === 'Crimson' || garb === 'Rust' ? GLD : garb === 'Snow White' ? RED : WH;

    function figure(t) {
      if (legend !== 'None') { legendFigure(t); if (!(newLeg && legend === 'Ink Scroll')) vanish(t); return; }
      sp.fill(-1);
      fx.fill(-1); jk.fill(-1); hd.fill(-1);
      const u0 = t - poofAt, sealing = u0 >= POOF && u0 < POOF + 1.4;
      const ps = sealing ? 'Hand Seal' : pose;
      const bob = Math.sin(t * 1.4 + windPh) > 0.7 ? 1 : 0;
      const hy = 12 + bob;
      // shoulders and torso: a sloped shoulder line into a broad chest, sleeves seamed off at the sides
      // the build sets the outline: square high shoulders (Broad), a narrow frame with the night either side (Lean),
      // or lacquered shoulder plates standing out past the shoulders (Armoured)
      for (let y = build === 'Broad' ? 18 : 20; y < N; y++) {
        const half = build === 'Broad' ? (y < 21 ? 9.5 + (y - 18) * 2.4 : Math.min(15.5, 15 + (y - 21) * 0.3))
          : build === 'Lean' ? (y < 23 ? 6 + (y - 20) * 1.4 : Math.min(11, 9.5 + (y - 23) * 0.3))
          : y < 23 ? 7.4 + (y - 20) * 2.2 : Math.min(15.5, 14 + (y - 23) * 0.35);
        // the jacket a step lighter than the hood, so head and body read apart: lit down the left, shaded down the right
        for (let x = Math.round(16 - half); x < Math.round(16 + half); x++) {
          const lit = x < 16 - half + 3 && y > 21, shade = x > 16 + half - 3 && y > 21;
          P(sp, x, y, lit ? C2 : shade ? C1 : CM);
        }
      }
      if (build === 'Armoured') for (const sd of [-1, 1]) {
        // sode: a laced plate hanging off each shoulder, wider than the shoulder, laced across in black
        const ws = [4, 6, 7, 8, 8, 8, 7, 6];
        ws.forEach((w, k) => { for (let j = 0; j < w; j++) { const x = sd < 0 ? 9 - j : 22 + j, y = 18 + k; P(sp, x, y, k === ws.length - 1 ? K : (k === 2 || k === 5) && j % 2 === 0 ? K : j === w - 1 ? C1 : C2); } });
      }
      const armX = build === 'Lean' ? 8 : build === 'Broad' ? 5 : 6;
      const armC = jacket === 'Sleeveless' ? SKN : C2, armD = jacket === 'Sleeveless' ? SKD : C1;
      if (jacket === 'Sleeveless') {
        // bare arms down the sides, the jacket cut away at the shoulder
        const top = build === 'Armoured' ? 26 : 23;
        for (let y = top; y < N; y++) for (let x = 0; x < N; x++) {
          if (sp[y * N + x] < 0 || (x > armX && x < 31 - armX)) continue;
          P(jk, x, y, x === armX || x === 31 - armX ? K : (x < 16 ? x === armX - 1 : x === 32 - armX) ? SKD : SKN);
        }
      }
      if (ps === 'Ready' || ps === 'Hand on Hilt') for (let y = 25; y < N; y++) { P(sp, armX, y, K); if (ps === 'Ready') P(sp, 31 - armX, y, K); }
      // crossed lapels
      for (let k = 0; k < 7; k++) { P(sp, 16 - k * 0.6, 23 + k, K); P(sp, 15 + k * 0.6, 23 + k, C1); }
      if (jacket === 'Sash') for (let x = 8; x <= 25; x++) {
        // a sash over the left shoulder down to the right hip
        const y = Math.round(20 + (x - 8) * 0.68);
        if (sp[y * N + x] >= 0) { P(jk, x, y, SASH); P(jk, x, y + 1, SASHD); }
      } else if (jacket === 'Belted') {
        // an obi wrapped round the waist, knotted at the side with the ends hanging
        for (let x = 0; x < N; x++) if (sp[28 * N + x] >= 0) { P(jk, x, 28, SASH); P(jk, x, 29, SASHD); }
        P(jk, 12, 27, SASH); P(jk, 13, 27, SASH); P(jk, 12, 30, SASH); P(jk, 11, 31, SASH); P(jk, 13, 30, SASHD); P(jk, 13, 31, SASHD);
      }
      // the clan crest on the left breast
      if (CREST) CREST.forEach((r, j) => { for (let i = 0; i < 3; i++) if (r[i] === 'X') P(jk, 19 + i, 24 + j, crestC); });
      // a sword on the back: a wrapped hilt over the shoulder, a guard, and the scabbard tip below the other arm
      if (gear === 'Katana' || gear === 'Twin Hilts') {
        const sides = gear === 'Twin Hilts' ? [1, -1] : [1];
        for (const s of sides) {
          for (let k = 0; k < 7; k++) {
            const hx = 16 + s * (10.5 + k * 0.75), hyy = 18 - k;
            P(sp, hx, hyy, HILT); P(sp, hx + s, hyy, k % 2 ? WH : HILT);
          }
          P(sp, 16 + s * 16, 11, K); P(sp, 16 + s * 17, 11, K);
          for (const [dx, dy] of [[9, 19], [10, 19], [11, 18], [10, 20]]) P(sp, 16 + s * dx, dy, GLD);
          if (s === 1) for (let k = 0; k < 3; k++) P(sp, 3 + k, 29 + k, K);
        }
      }
      // hood, with a dark rim where it meets the shoulders
      const hoodC = (x, y) => (y - hy < -3 && x < 16 - (hoodRows[y - hy + 10] || 0) + 3) || (y - hy >= -8 && y - hy <= -6 && x >= 11 && x <= 13) ? C2 : C1;
      for (let r = -10; r <= 8; r++) {
        const w = hoodRows[r + 10];
        if (!w) continue;
        for (let x = Math.round(16 - w); x < Math.round(16 + w); x++) P(sp, x, hy + r, hoodC(x, hy + r));
      }
      for (let x = 10; x <= 21; x++) P(sp, x, hy + 9, K);
      if (hood === 'Knotted Hood') for (const s of [-1, 1]) { P(sp, 16 + s * 5, hy - 10, C1); P(sp, 16 + s * 6, hy - 11, C2); P(sp, 16 + s * 5, hy - 11, C1); P(sp, 16 + s * 6, hy - 10, K); }
      // ---------- the face, on sprite layers of its own (skin and masks; mouth, paint and scars; the eyes), so gear and familiars never recolour it ----------
      fc.fill(-1); pt.fill(-1); ez.fill(-1);
      const eyeY = hy + 1, look = mask === 'Open Hood' ? 'open' : mask === 'Half Mask' ? 'half' : bareFace ? 'band' : 'masked';
      if (look === 'open') {
        // a hard face: the hood's shadow over the brow, the nose and the cheekbone cut in on the far side, a square jaw
        OPEN_FACE.forEach((row, j) => { for (let i = 0; i < 12; i++) if (row[i] !== '.') P(fc, 10 + i, eyeY - 3 + j, row[i] === 's' ? SKN : SKD); });
        // the mouth, by mood: a straight line, a clench or a smirk up one side (never a little round o)
        const my = eyeY + 4;
        if (expression === 'Furious') { rect(pt, 13, my, 18, my, K); if (!darkSkin) { P(pt, 14, my, WH); P(pt, 15, my, WH); P(pt, 17, my, WH); } P(pt, 13, my + 1, K); P(pt, 18, my + 1, K); }
        else if (expression === 'Smirk') { rect(pt, 14, my, 17, my, K); P(pt, 18, my - 1, K); }
        else if (expression === 'Calm') rect(pt, 14, my, 16, my, K);
        else if (expression === 'Glare') { rect(pt, 13, my, 17, my, K); P(pt, 18, my + 1, K); }
        else rect(pt, 14, my, 17, my, K);
        // on the deepest skins the mouth keeps its own light line under it, so it reads at any size
        if (darkSkin) { if (expression === 'Calm') rect(fc, 14, my + 1, 16, my + 1, SKL); else rect(fc, 14, my + 1, 17, my + 1, SKL); }
      } else if (look === 'half') {
        rect(fc, 10, hy - 3, 21, eyeY + 1, SKN);
        for (const [x, y] of [[10, hy - 3], [21, hy - 3], [10, eyeY + 1], [21, eyeY + 1]]) P(fc, x, y, -1);
        rect(fc, 11, hy - 3, 20, hy - 3, SKD); // the hood's shadow on the brow
        P(fc, 21, eyeY - 1, SKD); P(fc, 21, eyeY, SKD); P(fc, 20, eyeY + 1, SKD); P(fc, 11, eyeY + 1, SKD);
      } else if (look === 'band') {
        // an almond slit in the wrap: the cloth's edge black above it, and its shadow across the top of the eyes
        rect(fc, 10, eyeY - 1, 21, eyeY + 1, SKN);
        for (const [x, y] of [[10, -1], [21, -1], [10, 1], [21, 1]]) P(fc, x, eyeY + y, -1);
        rect(fc, 11, eyeY - 2, 20, eyeY - 2, K);
        rect(fc, 11, eyeY - 1, 20, eyeY - 1, SKD);
        P(fc, 11, eyeY + 1, SKD); P(fc, 20, eyeY + 1, SKD); P(fc, 21, eyeY, SKD);
      }
      if (mask === 'Cloth Veil') {
        // a cloth hanging from the bridge of the nose, swaying a little
        const sw = Math.round(Math.sin(t * 1.3 + windPh) * 0.6 + wind);
        for (let y = eyeY + 2; y <= hy + 9; y++) for (let x = 10 + (y > hy + 6 ? 1 : 0); x <= 21 - (y > hy + 6 ? 1 : 0); x++) P(pt, x + (y > hy + 5 ? sw : 0), y, (x + y) % 4 === 0 ? C2 : C1);
      }
      if (mask === 'Iron Jaw') {
        rect(pt, 10, eyeY + 2, 21, hy + 7, MET);
        for (const x of [12, 14, 16, 18]) P(pt, x, hy + 5, K);
        rect(pt, 11, hy + 7, 20, hy + 7, K);
      }
      if (mask === 'Demon Mask') {
        // a lacquered demon face: horned brow, scowl and fangs
        for (let y = eyeY - 3; y <= hy + 7; y++) {
          const inset = y === eyeY - 3 || y === hy + 7 ? 2 : y === hy + 6 ? 1 : 0;
          rect(fc, 9 + inset, y, 22 - inset, y, RED);
        }
        for (const [x0, d] of [[10, 1], [21, -1]]) { P(fc, x0, eyeY - 4, WH); P(fc, x0 - d, eyeY - 5, WH); P(fc, x0 - d, eyeY - 6, WH); }
        rect(fc, 11, eyeY - 2, 14, eyeY - 2, K); rect(fc, 17, eyeY - 2, 20, eyeY - 2, K); P(fc, 14, eyeY - 1, K); P(fc, 17, eyeY - 1, K);
        rect(fc, 12, hy + 5, 19, hy + 5, K); P(fc, 11, hy + 4, K); P(fc, 20, hy + 4, K);
        for (const x of [12, 19]) { P(fc, x, hy + 6, WH); P(fc, x, hy + 4, WH); }
        P(fc, 15, hy + 3, K); P(fc, 16, hy + 3, K);
      }
      if (mask === 'Fox Mask') {
        // a white festival fox face: pointed ears, red brush marks, a narrow snout
        for (let y = eyeY - 3; y <= hy + 7; y++) { const inset = y > hy + 3 ? (y - hy - 3) * 1.4 : 0; rect(fc, Math.round(10 + inset), y, Math.round(21 - inset), y, WH); }
        for (const sd of [-1, 1]) { P(fc, 16 + sd * 4.5, eyeY - 4, WH); P(fc, 16 + sd * 5, eyeY - 5, WH); P(fc, 16 + sd * 5.5, eyeY - 6, RED); }
        rect(fc, 11, eyeY - 2, 13, eyeY - 2, RED); rect(fc, 18, eyeY - 2, 20, eyeY - 2, RED);
        P(fc, 15, hy + 6, K); P(fc, 16, hy + 6, K); P(fc, 12, hy + 3, RED); P(fc, 19, hy + 3, RED);
      }
      if (mask === 'Crow Mask') {
        // a black beaked mask, the beak jutting down to one side
        rect(fc, 10, eyeY - 3, 21, hy + 5, K);
        for (let k = 0; k < 5; k++) rect(fc, 14 + Math.round(k * 0.4), hy + 3 + k, 17 + Math.round(k * 0.6) - (k > 2 ? 1 : 0), hy + 3 + k, k === 4 ? K : YEL);
      }
      // face paint on the skin that shows (under the eyes, so the eyes stay sharp)
      const bare = look !== 'masked';
      if (bare && paint !== 'None') {
        if (paint === 'Red Liner') { P(pt, 10, eyeY, RED); P(pt, 11, eyeY, RED); P(pt, 20, eyeY, RED); P(pt, 21, eyeY, RED); P(pt, 11, eyeY - 1, RED); P(pt, 20, eyeY - 1, RED); }
        else if (paint === 'Eye Black') { rect(pt, 12, eyeY + 1, 14, eyeY + 1, K); rect(pt, 17, eyeY + 1, 19, eyeY + 1, K); }
        else if (paint === 'Cheek Bars') {
          // warpaint: a short level bar on each cheekbone, a cell below and outside the eye, in red
          const wc = RED, cy = look === 'open' ? eyeY + 2 : eyeY + 1;
          if (look === 'open') { P(pt, 11, cy, wc); P(pt, 12, cy, wc); P(pt, 19, cy, wc); P(pt, 20, cy, wc); }
          else { P(pt, 10, cy, wc); P(pt, 11, cy, wc); P(pt, 20, cy, wc); P(pt, 21, cy, wc); }
        }
        else if (paint === 'Ash Smudge') { P(pt, 15, eyeY - 1, ASH); P(pt, 16, eyeY - 1, ASH); P(pt, 16, eyeY, ASH); }
        else if (paint === 'Gold Leaf') { P(pt, 15, eyeY - 1, GLD); P(pt, 16, eyeY - 1, GLD); P(pt, 15, eyeY, GLD); P(pt, 16, eyeY, GLD); }
        else if (paint === 'Kabuki Red') { for (const x of [11, 12, 13, 14, 17, 18, 19, 20]) P(pt, x, eyeY + 1, RED); P(pt, 11, eyeY, RED); P(pt, 20, eyeY, RED); }
        else if (paint === 'War Stripes') { for (const [x, y] of [[10, 0], [11, 1], [21, 0], [20, 1], [15, -1], [16, 0]]) P(pt, x, eyeY + y, RED); if (look === 'open') { P(pt, 12, eyeY + 2, RED); P(pt, 19, eyeY + 2, RED); } }
        else if (paint === 'Tear Mark') { P(pt, 13, eyeY + 1, BLU); if (look === 'open') P(pt, 13, eyeY + 2, BLU); }
        else if (paint === 'Ink Brow') rect(pt, 11, eyeY - 1, 20, eyeY - 1, K);
      }
      // the eyes: narrow slits, one bright cell in each and a glint at the outer corner, under brows that slant down to the nose;
      // under the pointer it narrows them at you
      const blink = ((t + blinkOff) % blinkGap) < 0.15 || eyes === 'Shut Calm' || sealing;
      const IRIS = { 'Gold Eyes': GLD, 'Ice Eyes': ICE, 'Jade Eyes': JADE, Crimson: RED }[eyes] || K;
      const glow = eyes === 'Glowing', mood = sizing ? 'Glare' : expression;
      const tall = look === 'open' || look === 'half'; // room above the slit for brows of their own
      if ((glow || eyes === 'Odd Glow') && (look === 'band' || look === 'half')) { rect(fc, 10, eyeY - 1, 21, eyeY + 1, K); P(fc, 10, eyeY + 1, -1); P(fc, 21, eyeY + 1, -1); }
      for (const sd of [-1, 1]) {
        const X = j => sd < 0 ? 11 + j : 20 - j; // 0 the outer corner .. 3 the inner one, by the nose
        if (look === 'masked') {
          // eyeholes in the mask: a dark hole with a hard glint
          const ec = glow ? (mask === 'Fox Mask' ? K : YEL) : eyes === 'Odd Glow' && sd > 0 ? FLM : IRIS === K ? WH : IRIS;
          if (blink) { for (let j = 1; j < 4; j++) P(ez, X(j), eyeY, K); continue; }
          P(ez, X(1), eyeY, K); P(ez, X(2), eyeY, ec); P(ez, X(3), eyeY, K); P(ez, X(2), eyeY - 1, K);
          continue;
        }
        const B = (j, y) => P(ez, X(j), eyeY + y, K);
        // brows: slanting down to the nose, steeper in a fury, one cocked up in a smirk, level and low when calm
        if (!(glow && !tall)) {
          if (mood === 'Furious') { if (tall) B(0, -3); B(1, -2); B(2, -1); B(3, -1); B(3, 0); }
          else if (mood === 'Smirk' && sd > 0) { if (tall) { B(0, -3); B(1, -3); B(2, -3); B(3, -2); } }
          else if (mood === 'Calm') { B(0, -2); B(1, -2); B(2, -2); B(3, -2); }
          else if (mood === 'Focused' || mood === 'Smirk') { B(0, -2); B(1, -2); B(2, -2); B(3, -1); }
          else { B(0, -2); B(1, -2); B(2, -1); B(3, -1); }
        }
        if (detail === 'Brow Nick' && sd > 0) {
          // a notch cut clean through the brow
          for (const y of [-3, -2]) P(ez, X(1), eyeY + y, -1);
          if (look === 'band') P(fc, X(1), eyeY - 2, SKN);
        }
        if (blink) { B(1, 0); B(2, 0); B(3, 0); continue; }
        const odd = eyes === 'Odd Glow' && sd > 0, blind = eyes === 'Blind Eye' && sd < 0, furious = mood === 'Furious';
        if (glow || odd) { const gc = odd ? FLM : YEL; P(ez, X(1), eyeY, gc); P(ez, X(2), eyeY, WH); if (!furious) P(ez, X(3), eyeY, gc); continue; }
        if (blind) { for (let j = 1; j < 4; j++) P(ez, X(j), eyeY, WH); for (const y of [-2, -1, 1, 2]) if (tall || (y > -2 && y < 2)) P(pt, X(2), eyeY + y, RED); continue; }
        // a heavy upper lid (calm, narrowed, the cocked side of a smirk, or the one heavy eye) drawn as a line that runs out past the corner
        const lid = mood === 'Calm' || (mood === 'Smirk' && sd > 0) || (detail === 'Heavy Lid' && sd < 0) || eyes === 'Narrow' || sizing;
        if (lid) for (let j = 1; j < 4; j++) { if (look === 'band') B(j, -1); else P(fc, X(j), eyeY - 1, SKD); }
        const bright = IRIS === K ? WH : IRIS;
        if (eyes === 'Wide') {
          // a taller eye: the iris two cells deep, white only on the outer side
          P(ez, X(1), eyeY, WH); P(ez, X(2), eyeY, IRIS); P(ez, X(2), eyeY + 1, IRIS); if (!furious) B(3, 0);
          if (IRIS === K) P(ez, X(2), eyeY, WH); else if (!lid) P(ez, X(1), eyeY - 1, WH);
          continue;
        }
        // a slit: dark lids either side of one bright cell, and a glint at the top outer corner
        B(1, 0); if (!furious) B(3, 0);
        P(ez, X(2), eyeY, bright);
        if (!lid && IRIS !== K) P(ez, X(1), eyeY - 1, WH);
      }
      if (bare) {
        // the one odd detail every face carries
        if (detail === 'Hair Strand') for (const [x, y] of tall ? [[12, -3], [12, -2], [11, -1], [11, 0], [11, 1]] : [[12, -1], [11, 0], [11, 1]]) P(ez, x, eyeY + y, K);
        else if (detail === 'Cheek Scar') for (const [x, y] of look === 'open' ? [[13, -2], [12, 1], [12, 2], [13, 3]] : look === 'half' ? [[13, -3], [13, -2], [12, 1]] : [[13, -1], [12, 1]]) P(pt, x, eyeY + y, SCR);
      }
      if (eyes === 'Scarred' && bare) {
        // an old blade scar down through the right brow and cheek
        for (const [x, y] of [[20, -2], [19, -1], [19, 1], [18, 2]]) if (look !== 'band' || y > -2 && y < 2 || y === -2) P(pt, x, eyeY + y, RED);
      }
      // headband with tails that ride the wind
      if (band !== 'None') {
        const bc = band === 'Red Band' || band === 'Long Tails' || band === 'Twin Tails' ? RED : band === 'Blue Band' ? BLU : band === 'Bandage Wrap' ? WH : C2;
        rect(fx, 8, hy - 4, 24, hy - 3, bc);
        if (band === 'Bandage Wrap') for (let x = 8; x <= 24; x += 3) P(fx, x, hy - 3 - (x % 2), SMK);
        if (band === 'Plate Band' || band === 'Gold Plate') {
          const pc = band === 'Gold Plate' ? GLD : MET;
          rect(fx, 13, hy - 4, 18, hy - 3, pc);
          if (CREST) { P(fx, 15, hy - 4, K); P(fx, 16, hy - 3, K); } else { P(fx, 14, hy - 4, K); P(fx, 17, hy - 3, K); }
        }
        const len = band === 'Long Tails' ? 9 : band === 'Bandage Wrap' ? 4 : 6;
        for (const lane of band === 'Twin Tails' ? [0, 2] : [0]) for (let k = 0; k < len; k++) {
          const w = Math.round(Math.sin(t * (5 + wind * 6) + k * 0.8 + windPh + lane) * (k / len) * (1.6 + wind * 1.4) - wind * k * 0.35);
          P(fx, 25 + k, hy - 3 + k * 0.45 + w + lane, bc);
          if (!lane) P(fx, 25 + k, hy - 2 + k * 0.7 + w, bc);
        }
      }
      // a hat over the hood
      if (hood === 'Straw Kasa' || hood === 'Wide Brim') {
        const wide = hood === 'Wide Brim' ? 15 : 12.5;
        for (let r = 0; r < 6; r++) { const w = r === 5 ? wide : 1.5 + r * (wide - 3) / 5; for (let x = Math.round(16 - w); x <= Math.round(16 + w); x++) P(fx, x, hy - 9 + r, r === 5 ? STRAWD : (x + r) % 3 === 0 ? STRAWD : STRAW); }
        if (hood === 'Wide Brim') for (let x = 2; x < 30; x++) P(fx, x, hy - 3, x % 4 ? STRAWD : K);
        P(fx, 16, hy - 10, STRAWD);
      } else if (hood === 'Horned Helm') {
        for (let r = -10; r <= -4; r++) { const w = hoodRows[r + 10]; for (let x = Math.round(16 - w); x < Math.round(16 + w); x++) P(fx, x, hy + r, r === -4 ? GLD : x < 14 ? WH : MET); }
        // a crescent crest standing up off the brow
        for (const [x, y] of [[11, -11], [10, -12], [10, -13], [11, -14], [21, -11], [22, -12], [22, -13], [21, -14], [12, -10], [20, -10], [16, -10], [16, -11]]) P(fx, x, hy + y, GLD);
      }
      // arms and hands for the pose; held gear hangs off a real arm
      const hand = (x, y) => { rect(sp, x, y, x + 2, y + 2, armC); P(sp, x + 1, y + 1, K); P(sp, x, y + 2, armD); };
      const armTo = (x, y) => { for (let k = 0; k <= 4; k++) { const ax = 7 + (x + 1 - 7) * k / 4, ay = 22 + (y + 2 - 22) * k / 4; P(sp, ax, ay, armD); P(sp, ax + 1, ay, armC); } };
      if (ps === 'Hand Seal') {
        // two hands pressed together before the chest, index fingers up
        for (let k = 0; k <= 5; k++) { // forearm steps
          const y = Math.round(29 - k * 0.6);
          for (const x of [8 + k, 23 - k]) { P(fx, x, y - 1, armC); P(fx, x, y, armC); P(fx, x, y + 1, armD); P(fx, x, y + 2, K); }
        }
        rect(hd, 14, 23, 17, 26, SKN); P(hd, 15, 21, SKN); P(hd, 16, 21, SKN); P(hd, 15, 22, SKN); P(hd, 16, 22, SKN);
        for (let y = 21; y <= 26; y++) P(hd, y < 23 ? 15 : 16, y, y < 23 ? SKN : K);
        P(hd, 16, 21, K); P(hd, 16, 22, K);
      } else if (ps === 'Arms Crossed') {
        // two forearms crossing on a slight diagonal before the chest, each rising from its own elbow with a dark edge
        // above and below (so sleeve or bare arm stays apart from the jacket), ending in a fist tucked at the far elbow
        const e = armX + 1, f = 30 - armX;
        for (let y = 22; y <= 29; y++) { P(sp, armX, y, K); P(sp, 31 - armX, y, K); } // the upper arms' seams down the sides
        const fore = (xa, ya, xb, yb) => {
          const n = Math.abs(xb - xa), d = Math.sign(xb - xa);
          for (let k = 0; k <= n; k++) { const x = xa + d * k, y = Math.round(ya + (yb - ya) * k / n); P(fx, x, y - 1, K); P(fx, x, y, armC); P(fx, x, y + 1, armD); P(fx, x, y + 2, K); }
        };
        fore(e, 28, f - 3, 24); // the left forearm, underneath
        fore(f, 28, e + 3, 24); // the right forearm, over it
        // the fists: 2 x 2, knuckles lit, boxed in black against the sleeve and the jacket
        for (const x0 of [f - 1, e]) { rect(hd, x0 - 1, 23, x0 + 2, 26, K); rect(hd, x0, 24, x0 + 1, 25, SKN); P(hd, x0 + (x0 > 16 ? 1 : 0), 25, SKD); }
      } else if (ps === 'Hand on Hilt') {
        if (gear === 'Katana' || gear === 'Twin Hilts') {
          // reaching up over the right shoulder for the sword on its back
          for (let k = 0; k <= 6; k++) { const x = Math.round(22 + k * 0.7), y = Math.round(25 - k * 1.3); P(fx, x, y, armC); P(fx, x + 1, y, armD); P(fx, x - 1, y, K); }
          rect(hd, 26, 14, 28, 16, SKN); P(hd, 27, 15, K); P(hd, 28, 16, SKD);
        } else {
          // a hand closed on the short sword at its right hip
          for (let k = 0; k < 7; k++) { P(fx, 22 + k, 28 - k * 0.5, k % 2 ? WH : HILT); P(fx, 22 + k, 29 - k * 0.5, HILT); }
          P(fx, 21, 27, GLD); P(fx, 21, 28, GLD); P(fx, 21, 29, GLD); P(fx, 21, 30, GLD);
          rect(hd, 24, 25, 26, 27, SKN); P(hd, 25, 26, K); P(hd, 26, 27, SKD); P(hd, 24, 24, SKN); P(hd, 25, 24, SKN); P(hd, 23, 26, K);
        }
      } else if (ps === 'Blade Raised') {
        // the blade held upright in front of one eye
        const bladeLen = gear === 'Kunai' ? 6 : 15;
        for (let k = 0; k < bladeLen; k++) { P(fx, 7, 22 - k, k > bladeLen - 3 ? WH : MET); P(fx, 8, 22 - k, k % 4 === 1 ? WH : MET); }
        P(fx, 7, 23, GLD); P(fx, 8, 23, GLD); P(fx, 6, 23, GLD); P(fx, 9, 23, GLD);
        rect(hd, 6, 24, 9, 26, SKN); P(fx, 7, 27, HILT); P(fx, 8, 27, HILT);
      }
      if (ps !== 'Blade Raised' && ps !== 'Hand Seal') {
        if (gear === 'Shuriken') {
          const sx = 4, sy = 14, f = Math.floor(t * 5) % 2;
          if (f) { for (let k = 1; k < 3; k++) { P(sp, sx - k, sy - k, MET); P(sp, sx + k, sy + k, MET); P(sp, sx + k, sy - k, MET); P(sp, sx - k, sy + k, MET); } }
          else { for (let k = 1; k < 3; k++) { P(sp, sx, sy - k, MET); P(sp, sx, sy + k, MET); P(sp, sx - k, sy, MET); P(sp, sx + k, sy, MET); } }
          P(sp, sx, sy, K);
          armTo(sx - 1, sy + 3); hand(sx - 1, sy + 3);
        } else if (gear === 'Kunai') {
          for (let k = 0; k < 7; k++) P(sp, 4, 9 + k, k < 4 ? MET : k === 4 ? K : HILT);
          P(sp, 3, 11, MET); P(sp, 5, 11, MET); P(sp, 4, 8, WH);
          armTo(3, 16); hand(3, 16);
        } else if (gear === 'Scroll') {
          rect(sp, 3, 10, 5, 18, WH);
          rect(sp, 2, 9, 6, 9, RED); rect(sp, 2, 19, 6, 19, RED);
          P(sp, 4, 12, K); P(sp, 4, 14, K); P(sp, 4, 15, K);
          armTo(3, 17); hand(3, 17);
        } else if (gear === 'Smoke Bomb') {
          fillEl(sp, 4.5, 16.5, 1.8, 1.8, K);
          P(sp, 4, 15, MET);
          const puff = (t * 0.7) % 3;
          for (let k = 0; k < 3; k++) {
            const yy = 12 - k * 2.6 - puff * 1.2, xx = 4.5 + Math.sin(k * 1.7 + t) * 1.1;
            if (yy > 1) fillEl(sp, xx, yy, 1.3 + k * 0.3, 1.2, SMK);
          }
          P(sp, 5, 14, YEL);
          armTo(3, 18); hand(3, 18);
        }
      }
      if (gear === 'Bo Staff') { for (let y = 1; y < N; y++) { P(sp, 4, y, y < 3 || y > 28 ? MET : WOOD); P(sp, 5, y, y % 6 === 0 ? K : WOOD); } if (ps === 'Ready' || ps === 'Arms Crossed' || ps === 'Hand on Hilt') { armTo(3, 17); hand(3, 17); } }
      else if (gear === 'War Fan') {
        // an iron fan opened behind its shoulder, ribs fanning out
        for (let k = 0; k < 7; k++) { const a = -2.6 + k * 0.32; for (let r = 2; r < 8; r++) P(sp, 25 + Math.cos(a) * r, 18 + Math.sin(a) * r, r === 7 ? RED : k % 2 ? MET : WH); }
        P(sp, 25, 18, K);
      } else if (gear === 'Kusarigama') {
        for (let k = 0; k < 9; k++) P(sp, 3 + Math.round(Math.sin(k * 0.7 + t * 1.5) * 1.2), 22 - k * 1.4, k % 2 ? MET : ASH);
        rect(sp, 2, 7, 5, 7, MET); P(sp, 2, 8, MET); P(sp, 5, 6, WH); rect(sp, 6, 7, 6, 9, HILT);
      } else if (gear === 'Paper Lantern') {
        const sw = Math.round(Math.sin(t * 1.1 + windPh) * 0.7);
        for (let y = 9; y < 14; y++) P(sp, 4, y, K);
        fillEl(sp, 4.5 + sw, 16, 2.2, 2.8, (x, y) => y % 2 ? GLD : YEL); P(sp, 4 + sw, 13, RED); P(sp, 4 + sw, 19, RED);
        if (ps === 'Ready' || ps === 'Arms Crossed' || ps === 'Hand on Hilt') { armTo(3, 7); hand(3, 7); }
      }
      // the familiar
      if (familiar === 'Storm Dragon') {
        // a storm dragon draped over the shoulders like a stole, head up on the right; it writhes faster near the pointer
        const quick = ptr ? 2.2 : 1, yAt = x => 21.5 + Math.abs(x - 16) * 0.14 + Math.sin(x * 0.6 - t * 2 * quick) * 0.8;
        for (let k = 0; k < 4; k++) { P(fx, 2, 23 + k, STORM); if (k === 3) P(fx, 1, 27, GLD); }
        for (let x = 2; x <= 25; x++) { const y = yAt(x); P(fx, x, y, x % 3 === 0 ? GLD : STORM); P(fx, x, y + 1, STORM); }
        const hd = 13 + (Math.sin(t * 1.1) > 0.6 ? 1 : 0) + (ptr && ptr[1] < 12 ? -1 : 0);
        for (let y = hd + 5; y <= Math.round(yAt(25)); y++) { P(fx, 25 + (y > hd + 6 ? 0 : 1), y, STORM); P(fx, 26 + (y > hd + 6 ? 0 : 1), y, y % 2 ? GLD : STORM); }
        ['.G..G.', '.SSSS.', 'SSKSSS', 'SSSSSSG', '..SS..G'].forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] !== '.') P(fx, 25 + i, hd + j, row[i] === 'S' ? STORM : row[i] === 'K' ? K : GLD); });
        if (t - poofAt < 0.45) { P(fx, 31, hd + 2, WH); P(fx, 31, hd + 3, YEL); }
      } else if (familiar === 'Raven') {
        // a pale raven on the right shoulder, drawn over the weapon so it always reads
        const hop = Math.sin(t * 0.9 + windPh) > 0.85 ? 1 : 0, y0 = 16 - hop;
        const rows = ['...MM.', '..MMKG', 'MMKMM.', '.MMKM.', '..G.G.'];
        rows.forEach((r, j) => { for (let i = 0; i < 6; i++) { const ch = r[i]; if (ch !== '.') P(fx, 22 + i, y0 + j, ch === 'M' ? MET : ch === 'K' ? K : GLD); } });
        P(fx, 21, y0 + 3, MET); P(fx, 20, y0 + 4, MET);
      } else if (familiar === 'Hawk') {
        const hop = Math.sin(t * 0.8 + windPh) > 0.9 ? 1 : 0, y0 = 15 - hop;
        const rows = ['..WW..', '.WWKY.', 'LLWWL.', 'LLLLL.', '..Y.Y.'];
        rows.forEach((r, j) => { for (let i = 0; i < 6; i++) { const ch = r[i]; if (ch !== '.') P(fx, 22 + i, y0 + j, ch === 'W' ? WH : ch === 'K' ? K : ch === 'Y' ? GLD : WOOD); } });
      } else if (familiar === 'Spirit Flame') {
        const fl = Math.floor(t * 4) % 2, fxx = 4 + Math.round(Math.sin(t * 0.7) * 1), fyy = 4 + Math.round(Math.sin(t * 1.1) * 1);
        P(sp, fxx, fyy - 1 - fl, FLM); P(sp, fxx, fyy, FLM);
        rect(sp, fxx - 1, fyy + 1, fxx + 1, fyy + 2, FLM); P(sp, fxx, fyy + 1, WH); P(sp, fxx, fyy + 2, WH);
        P(sp, fxx + 1 - fl * 2, fyy + 3, FLM);
      } else if (familiar === 'Spirit Koi') {
        // a pale koi swimming slow circles in the air
        const a = t * 0.6 + windPh, kx = 25 + Math.cos(a) * 3, ky = 5 + Math.sin(a) * 2, dir = -Math.sin(a) >= 0 ? 1 : -1, tail = Math.floor(t * 4) % 2;
        P(sp, kx, ky, WH); P(sp, kx + dir, ky, WH); P(sp, kx - dir, ky, LEAF); P(sp, kx + dir * 2, ky, K);
        P(sp, kx - dir * 2, ky - tail, LEAF); P(sp, kx - dir * 2, ky + 1 - tail, WH);
      } else if (familiar === 'Paper Bird') {
        const up = Math.floor(t * 2) % 2, bx = 4 + Math.round(Math.sin(t * 0.5) * 1.5), by = 5 + up;
        P(sp, bx, by, WH); P(sp, bx + 1, by, WH); P(sp, bx + 2, by - 1, WH); P(sp, bx - 1, by - (up ? 0 : 1), SMK); P(sp, bx - 2, by - (up ? 0 : 2), SMK); P(sp, bx + 1, by + 1, RED);
      } else if (familiar === 'Snake') {
        const tg = Math.floor(t * 3) % 3 === 0;
        for (const [x, y] of [[9, 22], [10, 21], [11, 21], [12, 22], [13, 22], [14, 21], [15, 21]]) P(fx, x, y, SNK);
        rect(fx, 6, 19, 8, 21, SNK); P(fx, 7, 19, YEL);
        if (tg) P(fx, 6, 21, RED);
      } else if (familiar === 'Golden Crane') {
        const up = Math.floor(t * 2.5) % 2, cx0 = 22 + Math.round(Math.sin(t * 0.4) * 2), cy0 = 4;
        rect(sp, cx0, cy0, cx0 + 4, cy0, WH); P(sp, cx0 + 5, cy0 - 1, WH); P(sp, cx0 + 6, cy0 - 1, RED); P(sp, cx0 + 7, cy0 - 1, GLD);
        P(sp, cx0 - 1, cy0 + 1, K);
        for (let k = 0; k < 4; k++) P(sp, cx0 + 1 + k, cy0 + (up ? -1 - (k < 2 ? k : 3 - k) : 1 + (k < 2 ? k : 3 - k)), GLD);
      }
      // two sprite layers, each held to three colours per tile, the overlay on top
      limit(sp, 8, 3, -1, K);
      limit(fx, 8, 3, -1, K);
      for (const L of [jk, fc, pt, hd, ez]) limit(L, 8, 3, -1, K);
      for (let i = 0; i < N * N; i++) { if (jk[i] >= 0) sp[i] = jk[i]; if (fc[i] >= 0) sp[i] = fc[i]; if (pt[i] >= 0) sp[i] = pt[i]; if (fx[i] >= 0) sp[i] = fx[i]; if (hd[i] >= 0) sp[i] = hd[i]; if (ez[i] >= 0) sp[i] = ez[i]; }
      vanish(t);
    }
    function vanish(t) {
      // the vanishing trick: a cloud billows up, a log stands where it was, then it lands back in the smoke
      const u = t - poofAt;
      if (u >= 0 && u < POOF) {
        if (u > 0.18 && u < 1.05) sp.fill(-1);
        if (u > 0.38 && u < 0.92) {
          // the stand-in: a short log, bark and a pale cut face
          fx.fill(-1);
          for (let y = 15; y < 30; y++) for (let x = 12; x < 20; x++) P(fx, x, y, (x === 12 || x === 19) ? K : (x + y * 2) % 5 === 0 ? HILT : WOOD);
          fillEl(fx, 15.5, 15, 3.9, 1.6, (x, y) => (x + y) % 3 ? STRAW : STRAWD);
          P(fx, 15, 15, K); P(fx, 16, 15, K);
          limit(fx, 8, 3, -1, K);
          for (let i = 0; i < N * N; i++) if (fx[i] >= 0) sp[i] = fx[i];
        }
        const grow = u < 0.18 ? u / 0.18 : u < 0.36 ? 1 : u < 0.44 ? 1 - (u - 0.36) / 0.08 * 0.7 : u < 0.9 ? 0.3 : u < 1.05 ? 1 : 1 - (u - 1.05) / (POOF - 1.05);
        fx.fill(-1);
        for (const p of puffs) {
          const r = p[2] * (0.4 + grow * 0.8), cy = p[1] - (u % 0.9) * 3;
          if (r > 0.6) fillEl(fx, p[0] + Math.sin(u * 4 + p[3]) * 0.8, cy, r, r * 0.85, (x, y) => (x + y) % 5 === 0 || y > cy + r * 0.4 ? SMK : WH);
        }
        for (let i = 0; i < N * N; i++) if (fx[i] >= 0) sp[i] = fx[i];
      }
    }

    // ---------- the legendaries as 1/1s (2026-10-19) ----------
    // An ordinary cartridge keeps to three colours a tile. A legendary is the one that ran on the next console: drawn
    // free of the tile rule, with full ramps of shade, a picture of its own. Mecha: a samurai mecha bust with a scanning
    // visor and a reactor in its chest. Ghost: a yurei of the clan, hands limp, its robe trailing into a tail of mist.
    // Ink Scroll: the ninja painted on a hanging scroll in an alcove. Their traits (plating, visor, antenna; spirit and
    // flames; sun, band, scenery; backdrop and weather) all still show. A type set to false here falls back to its
    // earlier look (legendFigure and inkPaper below).
    const NEW_LEGEND = { 'Mecha': true, 'Ghost': true, 'Ink Scroll': true };
    const newLeg = legend !== 'None' && !!NEW_LEGEND[legend];
    const ramp = (rgb, n) => { const out = []; for (let k = 0; k < n; k++) { const u = k / (n - 1); out.push(col(...rgb.map(v => Math.max(0, Math.min(255, Math.round(u < 0.5 ? v * (0.32 + u * 1.36) : v + (255 - v) * (u - 0.5) * 1.3)))))); } return out; };
    const mirrorRows = rows => rows.map(r => r + r.split('').reverse().join(''));
    let LGC = null;
    if (newLeg) {
      if (legend === 'Mecha') {
        const base = { Gunmetal: [96, 106, 134], Crimson: [168, 40, 52], Gold: [200, 148, 40], Ivory: [196, 192, 176] }[plating];
        const vis = { Red: [[150, 20, 30], [255, 60, 60], [255, 190, 180]], Green: [[20, 110, 60], [60, 230, 120], [210, 255, 220]], Blue: [[30, 70, 160], [80, 170, 255], [215, 240, 255]], Amber: [[150, 90, 10], [255, 180, 40], [255, 240, 180]] }[visor];
        LGC = { pl: ramp(base, 5), vs: vis.map(v => col(...v)), gold: col(252, 196, 40), goldD: col(168, 112, 20), wrap: col(40, 30, 46), steam: col(226, 230, 240), steamD: col(160, 166, 184), scarfD: col(132, 18, 30) };
      } else if (legend === 'Ghost') {
        const base = { Blue: [70, 110, 210], Green: [50, 170, 130], Violet: [130, 80, 210], Pale: [130, 146, 180] }[spirit];
        LGC = { sp: ramp(base, 5), face: col(226, 236, 248), faceD: col(170, 186, 212), glow: col(...base.map(v => Math.min(255, v + 130))), core: col(250, 252, 255) };
      } else {
        const sunC = { 'Red Sun': [214, 46, 38], 'Gold Sun': [226, 170, 50], 'Pale Moon': [150, 150, 140] }[inkSun];
        LGC = { wall: col(200, 190, 162), wallD: col(176, 164, 136), post: col(112, 74, 44), postD: col(74, 46, 26), mat: col(186, 176, 112), matD: col(140, 128, 70),
          rod: col(66, 38, 22), rodL: col(120, 78, 44), knob: col(232, 222, 192), silk: col(176, 136, 58), silkD: col(116, 84, 36), silkL: col(222, 186, 96),
          paper: col(240, 232, 206), fibre: col(222, 212, 182), ink: col(26, 22, 28), wash: col(118, 112, 112), washL: col(176, 170, 162), sun: col(...sunC), seal: col(198, 40, 36), cord: col(150, 40, 40), inkHi: col(96, 104, 132) };
      }
    }

    // ===== Mecha =====
    const MECHA = mirrorRows([
      '................', '................', '...........bbbbb', '.........bbccddd', '........bccdddde', '.......bccddddee',
      '.......bcdddddee', '......bccdddddde', '...ggggbbccccccd', '..gaaaaabbbbbbbb', '......aKKKKKKKKK', '......aKvvvvvvvv',
      '......aKvvvvvvvv', '......aKKKKKKKKK', '......abcccddddK', '......abcxcxcxcK', '.......abccccccK', '........abbbbbbb',
      '.........aaaaaaa', '..aabbbbbaKgggKK', '.abccdddbaKbccdd', 'abcddeedbaKbcddd', 'abcdeeedbaKbcdde', 'abcddddcbaKbcrrr',
      '.abcccccbaKbcrRR', '..aabbbaaaKbcrrr', '...abbbbaaKbbccc', '...abccbaaKbcccc', '...abccbaaKbcccc', '...abccbaaKbbbbb',
      '...abccba.Kbcccc', '...abccba.Kbcccc',
    ]);
    let pdown = false, lastLT = 0, mcCharge = 0, mcWas = false, lgDown = null;
    const mcBeams = [], mcScorch = [];
    function mechaFigure(t) {
      const dt = Math.max(0, Math.min(0.1, t - lastLT)); lastLT = t;
      // ---- its toy: point to aim, tap to fire its visor beam where you point; hold to charge the reactor and let go for
      // a full-power beam; every hit leaves a scorch on the backdrop that smoulders out ----
      if (pdown && ptr) { if (mcCharge === 0) c.sound.note(tonic - 12 + tune[0], { dur: 0.6, vel: 0.08, wave: 'square', cutoff: 800 }); mcCharge = Math.min(1.5, mcCharge + dt); }
      if (mcWas && !pdown) {
        const power = mcCharge < 0.35 ? 0 : Math.min(1, (mcCharge - 0.35) / 1);
        const tx = ptr ? ptr[0] : 16, ty = ptr ? ptr[1] : 26;
        mcBeams.push({ t0: t, tx, ty, power }); if (mcBeams.length > 4) mcBeams.shift();
        mcScorch.push({ x: tx, y: ty, t0: t, power }); if (mcScorch.length > 8) mcScorch.shift();
        for (let k = 0; k < 3 + Math.round(power * 3); k++) c.sound.note(tonic + 24 + tune[(4 - k + 5) % 5] - k * 2, { at: k * 0.03, dur: 0.06, vel: 0.12 + power * 0.06, wave: 'square', cutoff: 3200 });
        if (power > 0.3) c.sound.hit('noise', 0.2 + power * 0.25, { cutoff: 900, dur: 0.5 + power * 0.4 });
        mcCharge = 0;
      }
      mcWas = pdown;
      const charging = mcCharge > 0.35;
      // the scorches it has left on the backdrop, smouldering out
      for (const sc2 of mcScorch) {
        const a = t - sc2.t0; if (a > 7) continue;
        const r = 1 + sc2.power * 1.6;
        for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const d = Math.hypot(dx, dy); if (d > r) continue; const ember = (dx * 3 + dy * 5 + Math.floor(t * 4)) % 4 === 0 && a < 4; P(bg, sc2.x + dx, sc2.y + dy, ember ? LGC.vs[1] : a < 5 || (dx + dy) % 2 ? K : bg[0]); }
      }
      const u0 = t - poofAt, sealing = charging, bob = Math.sin(t * 1.4 + windPh) > 0.7 ? 1 : 0;
      const tone = { a: 0, b: 1, c: 2, d: 3, e: 4 };
      // the katana's hilt over its left shoulder, behind it
      for (let k = 0; k < 9; k++) { const x = 3 + Math.round(k * 0.55), y = 19 - k; P(sp, x, y + bob, k > 6 ? LGC.goldD : (k % 2 ? LGC.wrap : LGC.gold)); P(sp, x + 1, y + bob, LGC.wrap); }
      for (let r = 0; r < N; r++) for (let x = 0; x < N; x++) {
        const ch = MECHA[r][x]; if (ch === '.') continue;
        const y = r + (r < 19 ? bob : 0);
        let v;
        if (ch in tone) v = LGC.pl[Math.max(0, tone[ch] - (x > 15 ? 1 : 0))];
        else if (ch === 'K' || ch === 'x') v = K;
        else if (ch === 'g') v = x > 15 ? LGC.goldD : LGC.gold;
        else if (ch === 'v') v = LGC.vs[0];
        else if (ch === 'r' || ch === 'R') { const pulse = Math.sin(t * (charging ? 14 : 2.4)) > 0.2; v = ch === 'R' ? LGC.vs[2] : charging ? (pulse ? LGC.vs[2] : LGC.vs[1]) : pulse ? LGC.vs[1] : LGC.vs[0]; }
        P(sp, x, y, v);
      }
      // the visor: a glowing bar with a bright spot scanning along it (or following the pointer)
      const ex = ptr ? Math.max(8, Math.min(22, Math.round(ptr[0] - 0.5))) : 8 + Math.round((Math.sin(t * 1.1) + 1) * 7);
      for (let x = 8; x <= 23; x++) { P(sp, x, 11 + bob, Math.abs(x - ex) < 2 ? LGC.vs[2] : LGC.vs[1]); P(sp, x, 12 + bob, Math.abs(x - ex) < 1 ? LGC.vs[2] : LGC.vs[0]); }
      if (sealing) for (let x = 8; x <= 23; x++) P(sp, x, 11 + bob, LGC.vs[2]);
      // what it wears on its helmet, as its Antenna says
      if (antenna === 'Twin Horns') for (const sd of [-1, 1]) for (let k = 0; k < 9; k++) { const x = 16 + sd * (1.5 + k * 1.15 + k * k * 0.04) - (sd < 0 ? 1 : 0), y = 8 - k * 1.05; P(sp, x, y + bob, sd < 0 ? LGC.gold : LGC.goldD); P(sp, x - sd, y + bob + 1, LGC.goldD); }
      else if (antenna === 'Single Antenna') { for (let k = 0; k < 6; k++) P(sp, 22 + (k > 3 ? 1 : 0), 4 - k + bob, LGC.pl[1]); P(sp, 23, -2 + bob, Math.floor(t * 1.5) % 2 ? RED : WH); P(sp, 23, -1 + bob, LGC.pl[3]); }
      else if (antenna === 'Crest Fin') for (let k = 0; k < 4; k++) { P(sp, 15, 1 - k + bob + 1, LGC.pl[4]); P(sp, 16, 1 - k + bob + 1, k % 2 ? RED : LGC.pl[2]); }
      else for (const sd of [-1, 1]) { fillEl(sp, 16 + sd * 11.5, 11.5 + bob, 1.8, 2.6, LGC.pl[sd < 0 ? 3 : 2]); P(sp, 16 + sd * 11.5 - (sd < 0 ? 1 : 0), 11 + bob, K); P(sp, 16 + sd * 12.5 - (sd < 0 ? 1 : 0), 11 + bob, LGC.vs[1]); }
      // the clan's mark on its brow plate, and the red scarf of a ninja streaming from its neck in the wind
      P(sp, 15, 5 + bob, LGC.gold); P(sp, 16, 5 + bob, LGC.goldD); P(sp, 15, 6 + bob, LGC.goldD); P(sp, 16, 6 + bob, LGC.gold);
      for (let k = 0; k < 11; k++) { const x = 20 + k, y = 18 + Math.round(Math.sin(t * (5 + wind * 6) - k * 0.7) * (k / 11) * 2 + k * 0.25); P(sp, x, y, k % 3 === 2 ? LGC.scarfD : RED); if (k < 8) P(sp, x, y + 1, LGC.scarfD); }
      for (let x = 10; x <= 21; x++) P(sp, x, 18, x % 4 === 0 ? LGC.scarfD : RED);
      // charging: sparks round the reactor, the visor flickering
      if (charging) for (let k = 0; k < 6; k++) { const a = t * 9 + k * 1.05, r = 4 + (k % 2); P(sp, 16 + Math.cos(a) * r, 24 + Math.sin(a) * r * 0.7, k % 2 ? WH : LGC.vs[2]); }
      // the reticle where it's aiming
      if (ptr) { const ax = Math.round(ptr[0] - 0.5), ay = Math.round(ptr[1] - 0.5), g2 = charging ? 2 + Math.floor(t * 8) % 2 : 2; for (const [dx, dy] of [[-g2, 0], [g2, 0], [0, -g2], [0, g2], [-g2 - 1, 0], [g2 + 1, 0], [0, -g2 - 1], [0, g2 + 1]]) P(sp, ax + dx, ay + dy, LGC.vs[charging ? 2 : 1]); }
      // the beams: from the visor to the mark, white-hot in the middle
      for (const bm of mcBeams) {
        const a = t - bm.t0, life = 0.22 + bm.power * 0.35; if (a > life) continue;
        const x0 = 16, y0 = 11.5 + bob, len = Math.hypot(bm.tx - x0, bm.ty - y0), w = bm.power > 0.3 ? 1 : 0;
        for (let k = 0; k <= len * 1.5; k++) { const u = k / (len * 1.5), x = x0 + (bm.tx - x0) * u, y = y0 + (bm.ty - y0) * u; for (let o = -w; o <= w; o++) P(sp, x + (Math.abs(bm.ty - y0) > Math.abs(bm.tx - x0) ? o : 0), y + (Math.abs(bm.ty - y0) > Math.abs(bm.tx - x0) ? 0 : o), o ? LGC.vs[1] : WH); }
        const r = 1.5 + bm.power * 2.5 + a * 6; fillEl(sp, bm.tx, bm.ty, r, r, (x, y) => (x + y + Math.floor(t * 20)) % 3 ? LGC.vs[2] : WH);
      }
      // steam venting from its jaw now and then (all the time while it charges)
      const sv = charging ? (t * 2.4) % 1.2 : (t * 0.7) % 3;
      if (sv < 1.2) for (let k = 0; k < 5; k++) { const u = sv / 1.2, x = Math.round(7 - u * 5 - k * 0.6), y = Math.round(15 + bob - u * 4 - k * 0.5); if (x >= 0 && (k + Math.floor(t * 6)) % 3) { P(sp, x, y, k < 2 ? LGC.steam : LGC.steamD); P(sp, 31 - x, y, k < 2 ? LGC.steam : LGC.steamD); } }
    }

    // ===== Ghost =====
    // ===== Ghost (redesign 2, 2026-10-20): a comic-book panel. A thick black panel border on a white page, the ghost inked in
    // bold black line and flat colour, its shading and the scene behind it printed in Ben-Day dots, and a speech balloon.
    // The yurei of the clan: black hair with a blue shine, a pale face with hollow eyes and the forehead's white triangle,
    // the clan's mask, a robe crossed left over right that frays into mist; its Spirit is the colour of its fire and the
    // dots of its shading; its Spirit Flames circle it; its Backdrop is the scene, in dots, and its Weather falls across the
    // panel. Grab a flame and fling it (whoosh lines; it pops back into its circle); tap the ghost and it lunges out of the
    // panel with a shout of BOO! in a starburst, action lines and a shaken frame. =====
    let ghGrab = -1, ghLast = 0;
    const ghOff = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], ghVel = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], ghPos = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
    const ghBack = [0, 0, 0, 0, 0], ghPops = [];
    const GO = 64, gcan = document.createElement('canvas'); gcan.width = gcan.height = GO;
    const gctx2 = gcan.getContext('2d'), gimg = gctx2.createImageData(GO, GO), PIX32 = new Uint32Array(gimg.data.buffer), GB = new Uint32Array(GO * GO), GK = new Uint8Array(GO * GO);
    const c32 = (r, g2, b) => (255 << 24 | Math.max(0, Math.min(255, b | 0)) << 16 | Math.max(0, Math.min(255, g2 | 0)) << 8 | Math.max(0, Math.min(255, r | 0))) >>> 0;
    const SPC = { Blue: [50, 130, 255], Green: [40, 210, 110], Violet: [160, 80, 250], Pale: [120, 190, 230] }[spirit] || [50, 130, 255];
    const KINK = c32(18, 16, 26), KPAGE = c32(250, 248, 240), KFACE = c32(250, 250, 244), KPALE = c32(SPC[0] * 0.12 + 226, SPC[1] * 0.12 + 226, SPC[2] * 0.12 + 226), KSPOT = c32(...SPC), KSHINE = c32(70, 96, 170);
    const KYEL = c32(255, 226, 40), KRED = c32(226, 34, 40), KFL = c32(SPC[0] * 0.5 + 128, SPC[1] * 0.5 + 128, SPC[2] * 0.5 + 128);
    // the figure, cut once on the 64 grid: 1 = hair, 2 = pale, 3 = black inside the pale, 4 = pale in shade, 5 = the forehead's triangle
    const FIG = new Uint8Array(GO * 72), FH = 72;
    {
      const at = (x, y, v) => { if (x >= 0 && y >= 0 && x < GO && y < FH) FIG[y * GO + x] = v; };
      for (let y = 38; y < FH; y++) { const half = y < 44 ? 8 + (y - 38) * 2.2 : Math.min(24, 21.2 + (y - 44) * 0.25); for (let x = Math.round(32 - half); x < Math.round(32 + half); x++) at(x, y, x > 32 + half * 0.45 ? 4 : 2); }
      for (let k = 0; k < 13; k++) { at(Math.round(26 + k * 0.62), 38 + k, 3); at(Math.round(39 - k * 0.38), 38 + k, 3); }
      for (let y = 6; y < 62; y++) for (let x = 12; x < 52; x++) {
        const cap = ((x + 0.5 - 32) / 12.5) ** 2 + ((y + 0.5 - 21) / 15) ** 2 < 1;
        const dx = Math.abs(x + 0.5 - 32), end = 57 - Math.abs(dx - 10.5) * 1.3;
        const curtain = y >= 18 && y < end && dx > 6.5 - (y > 34 ? 2 : 0) && dx < 12.5 + (y - 18) * 0.12;
        if (cap || curtain) at(x, y, 1);
      }
      for (let y = 15; y < 38; y++) for (let x = 22; x < 42; x++) { const d = ((x + 0.5 - 32) / 7) ** 2 + ((y + 0.5 - 26) / 10.5) ** 2; if (d < 1) at(x, y, y >= 30 ? 3 : x >= 37 ? 4 : 2); }
      for (let x = 25; x < 39; x++) at(x, 30, 2);
      for (const sd of [-1, 1]) for (let y = 24; y < 28; y++) for (let x = 32 + sd * 3.5 - 2; x < 32 + sd * 3.5 + 2; x++) if (!(y === 24 && sd * (x + 0.5 - 32) < 2.5) && !(y === 27 && (x < 32 + sd * 3.5 - 1 || x >= 32 + sd * 3.5 + 1))) at(Math.floor(x), y, 3);
      for (let y = 15; y < 20; y++) for (let x = 32 - (20 - y); x < 32 + (20 - y); x++) at(x, y, y === 15 || Math.abs(x + 0.5 - 32) > 19 - y ? 3 : 5);
    }
    // the panel's ground: a pale tint of the backdrop's bright colour, dotted in its sky's colour; its bright shapes stay solid
    const GTINT = c32(BG[1][0] * 0.3 + 176, BG[1][1] * 0.3 + 170, BG[1][2] * 0.3 + 160), GDOT = c32(BG[0][0] * 1.4 + 30, BG[0][1] * 1.4 + 30, BG[0][2] * 1.4 + 40);
    const GF = { B: ['110', '101', '110', '101', '110'], O: ['010', '101', '101', '101', '010'], '!': ['1', '1', '1', '0', '1'] };
    function ghostScreen(t) {
      const dt = Math.max(0, Math.min(0.1, t - ghLast)); ghLast = t;
      backdrop(t);
      const bob = Math.sin(t * 1.3 + windPh) * 4.5, sc = t - legAt, burst = sc < 1.2 ? Math.sin(sc / 1.2 * Math.PI) * 6 : 0;
      if (ghGrab >= 0 && !pdown) { ghBack[ghGrab] = 1; ghGrab = -1; c.sound.note(tonic + 12 + tune[2], { dur: 0.5, vel: 0.07, wave: 'sine' }); }
      for (let k = 0; k < wisps; k++) {
        const a = t * 0.9 + k * 6.283 / wisps, ox = 16 + Math.cos(a) * (12 + burst), oy = 14 + bob / 4 + Math.sin(a) * (5 + burst * 0.6);
        if (k === ghGrab && ptr) { ghOff[k] = [ptr[0] - ox, ptr[1] - oy]; ghVel[k] = [0, 0]; }
        else for (const q of [0, 1]) { ghVel[k][q] += (-ghOff[k][q] * 70 - ghVel[k][q] * 5) * dt; ghOff[k][q] += ghVel[k][q] * dt; }
        ghPos[k] = [ox + ghOff[k][0], oy + ghOff[k][1]];
        if (ghBack[k] && Math.hypot(ghOff[k][0], ghOff[k][1]) < 0.8) { ghBack[k] = 0; ghPops.push([ghPos[k][0] * 2, ghPos[k][1] * 2, t]); c.sound.note(tonic + 24 + tune[k % 5], { dur: 0.3, vel: 0.08, wave: 'square', cutoff: 2600 }); }
      }
      const scared = sc >= 0 && sc < 0.9, zoom = !scared ? 1 : 1 + 0.55 * (sc < 0.1 ? sc / 0.1 : sc < 0.5 ? 1 : Math.max(0, 1 - (sc - 0.5) / 0.4));
      // ---- the scene behind, printed in Ben-Day dots: each colour of the backdrop as a pale tint with a grid of its own dots ----
      for (let y = 0, i = 0; y < GO; y++) for (let x = 0; x < GO; x++, i++) {
        const cc = COL[bg[(y >> 1) * N + (x >> 1)]], dot = (y % 3 === 1) && ((x + (((y / 3) | 0) & 1) * 1.5) % 3 < 1.2);
        const lum = (cc[0] * 0.3 + cc[1] * 0.55 + cc[2] * 0.15) / 255;
        GB[i] = lum < 0.32 ? (dot ? GDOT : GTINT) : c32(cc[0] * 1.1 + 12, cc[1] * 1.1 + 12, cc[2] * 1.1 + 12); GK[i] = 0;
      }
      // action lines, radiating from behind the ghost in the scare
      if (scared && sc < 0.7) for (let k = 0; k < 24; k++) { const a = k * 0.2618 + 0.1, r0 = 14 + (k % 3) * 3; for (let r = r0; r < 46; r++) { const x = Math.round(32 + Math.cos(a) * r), y = Math.round(28 + Math.sin(a) * r); if (x >= 0 && y >= 0 && x < GO && y < GO) GB[y * GO + x] = KINK; } }
      const by = Math.round(bob / 2), sway = t * 1.5;
      // a flame: a teardrop of the Spirit's fire with a white heart and a black line round it
      const flame = (k, front) => {
        const a = t * 0.9 + k * 6.283 / wisps; if ((Math.sin(a) > 0 || k === ghGrab) !== front) return;
        const fx = ghPos[k][0] * 2, fy = ghPos[k][1] * 2, fl = Math.sin(t * 9 + k) * 0.8, sp = Math.hypot(ghVel[k][0], ghVel[k][1]);
        // whoosh: three short ink lines behind a flame on the move
        if (sp > 8) { const ux = ghVel[k][0] / sp, uy = ghVel[k][1] / sp; for (let m = -1; m <= 1; m++) for (let r = 6; r < 12; r++) { const x = Math.round(fx - ux * r - uy * m * 2.5), y = Math.round(fy - uy * r + ux * m * 2.5); if (x >= 0 && y >= 0 && x < GO && y < GO && GK[y * GO + x] === 0) GB[y * GO + x] = KINK; } }
        for (let y = Math.floor(fy - 10); y <= fy + 6; y++) for (let x = Math.floor(fx - 6); x <= fx + 6; x++) {
          if (x < 0 || y < 0 || x >= GO || y >= GO) continue;
          const dx = x + 0.5 - fx - (y < fy ? fl * (fy - y) / 6 : 0), dy = y + 0.5 - fy, d = Math.hypot(dx, dy > 0 ? dy : dy * 0.42), i = y * GO + x;
          if (d < 1.5) { GB[i] = KFACE; GK[i] = 6; } else if (d < 3) { GB[i] = KFL; GK[i] = 6; } else if (d < 4.4) { GB[i] = KSPOT; GK[i] = 6; } else if (d < 5.4) { GB[i] = KINK; GK[i] = 6; }
        }
      };
      for (let k = 0; k < wisps; k++) flame(k, false);
      // the ghost, inked: hair black with a shine, the pale in flat tint, its shade in the Spirit's dots, black line round it all
      const look = ghGrab >= 0 ? ghPos[ghGrab] : ptr, lx = look ? Math.max(-1, Math.min(1, Math.round((look[0] - 16) / 5))) : 0, ly = look ? (look[1] > 15 ? 1 : 0) : 0;
      const blink = ((t + blinkOff) % blinkGap) < 0.15;
      for (let y = 0; y < GO; y++) {
        const fy = zoom === 1 ? y - by : Math.round((y - by - 26) / zoom + 26); if (fy < 0 || fy >= FH) continue;
        const drift = fy > 52 ? Math.round(Math.sin(sway - fy * 0.3) * (fy - 52) * 0.12) : 0;
        for (let x = 0; x < GO; x++) {
          const fx = (zoom === 1 ? x : Math.round((x - 32) / zoom + 32)) - drift; if (fx < 0 || fx >= GO) continue;
          let v = FIG[fy * GO + fx]; if (!v) continue;
          if (fy > 58 && (fx + fy * 2 + Math.floor(t * 4)) % 5 < fy - 58) continue;   // the robe frays into mist at the foot
          if (scared && sc < 0.75 && v === 3 && fy >= 30 && fy < 38) v = ((fx + 0.5 - 32) / 3.2) ** 2 + ((fy + 0.5 - 33.5) / 3.4) ** 2 < 1 ? 3 : 2;
          const i = y * GO + x;
          GK[i] = v === 1 ? 1 : 2;
          GB[i] = v === 1 ? (fy > 10 && fy < 44 && Math.abs(Math.abs(fx + 0.5 - 32) - 9.5 - Math.sin(fy * 0.25) * 0.8) < 0.6 ? KSHINE : KINK)
            : v === 3 ? KINK : v === 5 ? KFACE : v === 4 ? ((fx % 2 === 0 && fy % 2 === 0) ? KSPOT : KPALE) : (fy < 38 ? KFACE : KPALE);
        }
      }
      if (!blink && !scared) for (const sd of [-1, 1]) { const x = Math.round(32 + sd * 3.5 - 0.5 + lx * 0.5 + (lx > 0 ? 0.5 : 0)), y = 25 + ly + by; if (y >= 0 && y < GO) GB[y * GO + x] = KFACE; }
      // the ink line round the figure
      for (let y = 1; y < GO - 1; y++) for (let x = 1; x < GO - 1; x++) { const i = y * GO + x; if (GK[i] === 0 && (GK[i - 1] === 2 || GK[i + 1] === 2 || GK[i - GO] === 2 || GK[i + GO] === 2)) { GB[i] = KINK; GK[i] = 7; } }
      for (let k = 0; k < wisps; k++) flame(k, true);
      // pops where a flung flame comes home: a little star of ink lines
      for (let j = ghPops.length - 1; j >= 0; j--) { const [px2, py2, p0] = ghPops[j], a = t - p0; if (a > 0.35 || a < 0) { if (a > 0.35) ghPops.splice(j, 1); continue; } for (let k = 0; k < 8; k++) { const an = k * 0.785; for (let r = 5 + a * 14; r < 8 + a * 14; r++) { const x = Math.round(px2 + Math.cos(an) * r), y = Math.round(py2 + Math.sin(an) * r); if (x >= 0 && y >= 0 && x < GO && y < GO) GB[y * GO + x] = KINK; } } }
      // its Weather across the panel
      if (weather !== 'Clear') motes.forEach((m, j) => {
        let x, y;
        if (weather === 'Snow') { y = (m[1] + t * m[2] * 2.2) % N; x = (m[0] + Math.sin(t * 0.9 + m[3]) * 1.5 + wind * t * 3 + N) % N; }
        else if (weather === 'Rain') { y = (m[1] + t * (14 + m[2] * 6)) % N; x = (m[0] - y * 0.3 - wind * 3 + N * 2) % N; }
        else if (weather === 'Falling Leaves') { if (j > 9) return; y = (m[1] + t * m[2] * 1.6) % N; x = (m[0] + Math.sin(t * 1.3 + m[3]) * 2.5 + wind * 4 + N) % N; }
        else if (weather === 'Fireflies') { if (j > 8 || Math.sin(t * 1.4 + m[3] * 3) < 0.2) return; x = (m[0] + Math.sin(t * 0.5 + m[3]) * 2 + N) % N; y = 14 + (m[1] % 16) + Math.sin(t * 0.7 + m[3] * 2) * 1.5; }
        else { if (j > 2) return; const ph = (t * 0.4 + m[3]) % 4; if (ph > 0.5) return; x = m[0] + ph * 14; y = m[1] * 0.4 + ph * 6; }
        const X = Math.floor(x * 2), Y = Math.floor(y * 2), colr = weather === 'Snow' ? KFACE : weather === 'Falling Leaves' ? c32(240, 120, 30) : weather === 'Fireflies' ? KYEL : weather === 'Rain' ? c32(40, 70, 160) : KFACE;
        for (const [a, b] of weather === 'Rain' ? [[0, 0], [-1, 1], [-1, 2]] : weather === 'Shooting Stars' ? [[0, 0], [-1, -1], [-2, -1], [-3, -2]] : [[0, 0], [1, 0], [0, 1], [1, 1]]) { const xx = X + a, yy = Y + b; if (xx >= 0 && yy >= 0 && xx < GO && yy < GO && GK[yy * GO + xx] === 0) GB[yy * GO + xx] = colr; }
      });
      // the speech balloon: a quiet "..." most of the time; in the scare a yellow starburst shouting BOO!
      const glyphs = (str, x0, y0, s2, colr) => { let x = x0; for (const ch of str) { const gl = GF[ch]; gl.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] === '1') for (let b = 0; b < s2; b++) for (let a = 0; a < s2; a++) { const X = x + i * s2 + a, Y = y0 + j * s2 + b; if (X >= 0 && Y >= 0 && X < GO && Y < GO) GB[Y * GO + X] = colr; } }); x += (gl[0].length + 1) * s2; } };
      if (scared && sc < 0.85) {
        const cx = 32, cy = 12, rx = 22, ry = 9;
        for (let y = 0; y < 26; y++) for (let x = 4; x < 61; x++) { const a = Math.atan2((y + 0.5 - cy) / ry, (x + 0.5 - cx) / rx), r = Math.hypot((x + 0.5 - cx) / rx, (y + 0.5 - cy) / ry), edge = 1 + (Math.floor((a + 3.1416) / 6.283 * 18) % 2) * 0.22; if (r < edge) GB[y * GO + x] = r > edge - 0.12 ? KINK : KYEL; }
        glyphs('BOO!', 15, 7, 2, KRED);
      } else {
        const cx = 13, cy = 9, rx = 8, ry = 4.6;
        for (let y = 3; y < 18; y++) for (let x = 3; x < 24; x++) { const r = Math.hypot((x + 0.5 - cx) / rx, (y + 0.5 - cy) / ry), tail = y >= 12 && y < 17 && Math.abs(x + 0.5 - (15 + (y - 12) * 1.3)) < (17 - y) * 0.35; if (r < 1 || tail) GB[y * GO + x] = r > 0.86 && !(tail && r > 1) || (tail && r >= 1 && Math.abs(x + 0.5 - (15 + (y - 12) * 1.3)) > (17 - y) * 0.35 - 1) ? KINK : KFACE; }
        for (const dx of [-3, 0, 3]) GB[9 * GO + cx + dx] = KINK;
      }
      // the panel: shaken in the scare, inside a thick black border on the white page
      const shk = scared && sc < 0.4 ? Math.round(Math.sin(sc * 70) * 2) : 0;
      for (let y = 0, i = 0; y < GO; y++) for (let x = 0; x < GO; x++, i++) {
        if (x < 2 || y < 2 || x > 61 || y > 61) { PIX32[i] = KPAGE; continue; }
        if (x < 4 || y < 4 || x > 59 || y > 59) { PIX32[i] = KINK; continue; }
        const sx = Math.max(0, Math.min(GO - 1, x - shk)), sy = Math.max(0, Math.min(GO - 1, y + (shk >> 1)));
        PIX32[i] = GB[sy * GO + sx];
      }
      gctx2.putImageData(gimg, 0, 0);
      g.setTransform(1, 0, 0, 1, 0, 0); g.imageSmoothingEnabled = false;
      g.drawImage(gcan, 0, 0, S, S);
    }
    function ghostFigure() {}

    function legendTap(x, y, t, phase) {
      if (legend === 'Ghost') {
        let best = -1, bd = 3.6;
        for (let k = 0; k < wisps; k++) { const d = Math.hypot(ghPos[k][0] - x, ghPos[k][1] - y); if (d < bd) { bd = d; best = k; } }
        if (phase === 'down') { if (best >= 0) { ghGrab = best; c.sound.note(tonic + 24 + tune[best % 5], { dur: 0.3, vel: 0.07, wave: 'sine' }); } }
        else if (best < 0 && ghGrab < 0 && Math.abs(x - 16) < 8 && y > 3 && t - legAt > 1.2) { legAt = t; for (let k = 0; k < 3; k++) c.sound.note(tonic + 12 + tune[4 - k * 2], { at: k * 0.28, dur: 0.6, vel: 0.08, wave: 'sine' }); }
      }
    }

    // ===== Ink Scroll (redesign 2, 2026-10-20): a neon sign on a brick wall at night. Bent-glass tubes on a 64-cell grid,
    // each with a hot white core, its colour round it and a stepped halo thrown on the bricks; unlit glass shows grey. The
    // ninja is a pink tube leaping, blade raised, its Band a ribbon tube that flaps in two lit frames; its Sun is a red or
    // gold neon sun with rays, or a pale crescent moon; its Scenery is a peak, waves or bamboo in a tube of its own, and
    // NINJA buzzes underneath with one letter on the blink. Tap anywhere and the ninja leaps there as neon does, lit pose by
    // lit pose along an arc (every third leap the whole sign surges and the sun bursts in sparks); drag across the tubes
    // and they spit sparks and stutter where you touch. =====
    const NS = 64, nsc = document.createElement('canvas'); nsc.width = nsc.height = NS;
    const nsx = nsc.getContext('2d'), nsi = nsx.createImageData(NS, NS), NP32 = new Uint32Array(nsi.data.buffer);
    const NT = new Uint8Array(NS * NS), NH1 = new Uint8Array(NS * NS), NH2 = new Uint8Array(NS * NS), NWALL = new Uint32Array(NS * NS);
    const rgb32 = (r, g2, b) => (255 << 24 | Math.max(0, Math.min(255, b | 0)) << 16 | Math.max(0, Math.min(255, g2 | 0)) << 8 | Math.max(0, Math.min(255, r | 0))) >>> 0;
    // the tubes' colours (index 1..): ninja pink, the sun's, the scenery's, the band's, the sign's yellow, the blade's ice, the glass when it's off
    const TUBE = [null, [255, 60, 200], inkSun === 'Gold Sun' ? [255, 176, 30] : inkSun === 'Pale Moon' ? [170, 210, 255] : [255, 50, 40],
      inkScene === 'Mountains' ? [40, 240, 210] : inkScene === 'Waves' ? [60, 140, 255] : [70, 255, 110], inkBand === 'Grey Band' ? [170, 160, 210] : [240, 244, 255], [255, 230, 60], [170, 240, 255]];
    const WALLC = [[64, 26, 26], [74, 30, 28], [56, 22, 24], [36, 20, 24]];
    // the brick wall, laid once: courses of 8 x 4 bricks, offset every other course, each brick its own shade; mortar between
    for (let y = 0; y < NS; y++) for (let x = 0; x < NS; x++) {
      const row = y >> 2, bx = x + (row & 1) * 4, mortar = (y & 3) === 3 || (bx & 7) === 7, sh = ((row * 7 + (bx >> 3) * 13) % 3);
      const cc = mortar ? WALLC[3] : WALLC[sh], dk = 0.72 + 0.28 * Math.min(1, (64 - Math.hypot(x - 32, y - 28)) / 44);   // a little darker toward the corners
      NWALL[y * NS + x] = rgb32(cc[0] * dk, cc[1] * dk, cc[2] * dk);
    }
    // the ninja's silhouette (24 x 16, leaping right): the tube runs round its edge; w is the eye slit, h the hand
    const NJW = ['..............kkkk......', '.............kkkkkk.....', '.............kkkkkk.....', '.............kwwwwk.....', '..............kkkk......',
      '...........kkkkkkkk.....', '.........kkkkkkkkkkkh...', '.......kkkkkkkkkkk......', '.....kkkkkkkkkkk........', '...kkkkkkkkkkk..........',
      '.kkkkk...kkkkkk.........', 'kkk.......kkkkk.........', 'kk.........kkkk.........', '............kkk.........', '............kkkk........', '.............kkk........'];
    const NJE = [], NJI = [];   // the edge cells, and the eye slit
    for (let j = 0; j < 16; j++) for (let i = 0; i < 24; i++) {
      const ink = q => q[0] >= 0 && q[1] >= 0 && q[1] < 16 && q[0] < 24 && NJW[q[1]][q[0]] !== '.';
      if (NJW[j][i] === 'w') NJI.push([i, j]);
      else if (ink([i, j]) && (!ink([i - 1, j]) || !ink([i + 1, j]) || !ink([i, j - 1]) || !ink([i, j + 1]))) NJE.push([i, j]);
    }
    const FONT = { N: ['1001', '1101', '1011', '1001', '1001'], I: ['1', '1', '1', '1', '1'], J: ['0011', '0001', '0001', '1001', '0110'], A: ['0110', '1001', '1111', '1001', '1001'] };
    let nsAt = [5, 16], nsFrom = null, nsT = -9, nsFace = 1, nsLeaps = 0, nsSurge = -9, nsDown = null, nsMoved = 0, nsLast = 0, nsLastP = null, nsBuzz = -9;
    const nsSparks = [], nsStutter = new Float32Array(8).fill(-9);
    function woodblock(t) {
      const dt = Math.max(0, Math.min(0.1, t - nsLast)); nsLast = t;
      const q = ptr ? [ptr[0] * 2, ptr[1] * 2] : null;
      // ---- the touch: a short, still tap sends the ninja leaping there; a drag over the tubes makes them spark and stutter ----
      if (pdown && q) {
        if (!nsDown) { nsDown = [q[0], q[1], t]; nsMoved = 0; nsLastP = q; }
        nsMoved = Math.max(nsMoved, Math.hypot(q[0] - nsDown[0], q[1] - nsDown[1]));
        if (nsMoved > 2.5) {
          const xi = Math.round(q[0]), yi = Math.round(q[1]);
          let hit = 0; for (let dy = -1; dy <= 1 && !hit; dy++) for (let dx = -1; dx <= 1 && !hit; dx++) { const x = xi + dx, y = yi + dy; if (x >= 0 && y >= 0 && x < NS && y < NS && NT[y * NS + x]) hit = NT[y * NS + x]; }
          if (hit) { nsStutter[hit] = t; if (t - nsBuzz > 0.12) { nsBuzz = t; c.sound.hit('noise', 0.08, { cutoff: 5200, dur: 0.08 }); c.sound.note(tonic + 24 + tune[hit % 5], { dur: 0.05, vel: 0.04, wave: 'square', cutoff: 2400 }); } for (let k = 0; k < 3; k++) nsSparks.push({ x: q[0], y: q[1], vx: Math.sin(t * 37 + k * 2.1) * 18, vy: -10 - ((k * 7 + Math.floor(t * 53)) % 9) * 2, t0: t }); }
          if (nsSparks.length > 120) nsSparks.splice(0, nsSparks.length - 120);
        }
        nsLastP = q;
      } else if (nsDown) {
        if (nsMoved <= 2.5 && t - nsDown[2] < 0.3) {
          const to = [Math.max(1, Math.min(39, Math.round(nsDown[0] - 12))), Math.max(2, Math.min(32, Math.round(nsDown[1] - 8)))];
          if (to[0] !== nsAt[0]) nsFace = to[0] > nsAt[0] ? 1 : -1;
          nsFrom = nsAt.slice(); nsAt = to; nsT = t; nsLeaps++;
          if (nsLeaps % 3 === 0) nsSurge = t + 0.55;
          for (let k = 0; k < 4; k++) c.sound.hit('click', 0.12, { at: k * 0.14 });
          c.sound.note(tonic + 12 + tune[1], { at: 0.42, dur: 0.25, vel: 0.08, wave: 'square', cutoff: 1800 });
          if (nsLeaps % 3 === 0) { c.sound.hit('noise', 0.3, { at: 0.55, cutoff: 7000, dur: 0.5 }); for (let k = 0; k < 4; k++) c.sound.note(tonic + 12 + tune[k % 5] + (k > 2 ? 12 : 0), { at: 0.6 + k * 0.07, dur: 0.3, vel: 0.08, wave: 'square', cutoff: 3000 }); }
        }
        nsDown = null;
      }
      // ---- bend the glass: every tube's cells, with its colour, and whether it is lit ----
      NT.fill(0);
      const lit = new Uint8Array(8).fill(1);
      const surge = t - nsSurge;
      for (let k = 1; k < 8; k++) if (t - nsStutter[k] < 0.35 && Math.floor(t * 30 + k) % 3 === 0) lit[k] = 0;
      if (surge >= 0 && surge < 0.5 && Math.floor(surge * 16) % 2 === 1) lit.fill(0);
      const put = (x, y, id) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < NS && y < NS) NT[y * NS + x] = id; };
      const lineT = (x0, y0, x1, y1, id) => { const n = Math.max(1, Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)))); for (let k = 0; k <= n; k++) put(x0 + (x1 - x0) * k / n, y0 + (y1 - y0) * k / n, id); };
      const arc = (cx, cy, r, a0, a1, id) => { const n = Math.ceil(Math.abs(a1 - a0) * r * 1.4) + 2; for (let k = 0; k <= n; k++) { const a = a0 + (a1 - a0) * k / n; put(cx + Math.cos(a) * r, cy + Math.sin(a) * r, id); } };
      // the sun (or the moon), high on the right
      const SX = 48, SY = 13;
      if (inkSun === 'Pale Moon') { arc(SX, SY, 9, -2.2, 2.2, 2); arc(SX - 4.5, SY - 1, 7.2, -1.15, 1.25, 2); }
      else { arc(SX, SY, 7.5, 0, 6.283, 2); for (let k = 0; k < 8; k++) { const a = k * 0.785 + 0.39; lineT(SX + Math.cos(a) * 10, SY + Math.sin(a) * 10, SX + Math.cos(a) * 12.5, SY + Math.sin(a) * 12.5, 2); } }
      // the scenery, low on the sign
      if (inkScene === 'Mountains') { lineT(4, 48, 20, 36, 3); lineT(20, 36, 30, 43, 3); lineT(30, 43, 42, 31, 3); lineT(42, 31, 60, 48, 3); lineT(38, 35, 42, 38, 3); lineT(42, 38, 46, 35, 3); lineT(16, 39, 20, 41, 3); lineT(20, 41, 23, 39, 3); }
      else if (inkScene === 'Waves') { for (let w = 0; w < 5; w++) { const x0 = 4 + w * 11; arc(x0 + 4, 43, 4, 3.3, 6.3, 3); arc(x0 + 5.5, 42.5, 1.6, 0, 3.3, 3); } lineT(4, 48, 60, 48, 3); }
      else { for (const [bx, top] of [[52, 27], [58, 31]]) { lineT(bx, top, bx, 47, 3); for (let y = top + 5; y < 47; y += 6) { put(bx - 1, y, 3); put(bx + 1, y, 3); } lineT(bx, top + 4, bx - 5, top + 1, 3); lineT(bx, top + 10, bx + 4, top + 7, 3); } }
      // NINJA, buzzing underneath, its J on the blink
      let lx = 21;
      for (const ch of 'NINJA') { const gl = FONT[ch]; const id = ch === 'J' && (Math.floor(t * 2.3) % 7 === 0 || Math.floor(t * 9) % 13 === 0) ? 7 : 5; gl.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] === '1') put(lx + i, 54 + j, id); }); lx += gl[0].length + 2; }
      // the ninja: lit pose by lit pose along the arc while it leaps, then where it landed; its blade, its eye, its band
      const pu = t - nsT, poses = [];
      if (nsFrom && pu >= 0 && pu < 0.56) { const step = Math.min(3, Math.floor(pu / 0.14)); if (step < 3) { const u = step / 3; poses.push([nsFrom[0] + (nsAt[0] - nsFrom[0]) * u, nsFrom[1] + (nsAt[1] - nsFrom[1]) * u - Math.sin(u * Math.PI) * 10, step === 0 ? 7 : 1]); } else poses.push([nsAt[0], nsAt[1], 1]); }
      else poses.push([nsAt[0], nsAt[1], 1]);
      if (nsFrom && pu >= 0 && pu < 0.42) poses.push([nsFrom[0], nsFrom[1], 7]);   // the pose it left, dark glass
      const flap = Math.floor(t * 3.2) % 2;
      for (const [px0, py0, id] of poses.reverse()) {
        const X = i => px0 + (nsFace > 0 ? i : 23 - i);
        for (const [i, j] of NJE) put(X(i), py0 + j, id);
        for (const [i, j] of NJI) put(X(i), py0 + j, id === 7 ? 7 : 4);
        for (let k = 1; k < 9; k++) put(X(20 + k * 0.6), py0 + 6 - k, id === 7 ? 7 : 6);
        if (inkBand !== 'No Band') for (let k = 1; k < 9; k++) put(X(13 - k), py0 + 2 + Math.round((flap ? 1 : -1) * Math.sin(k * 0.9) * k * 0.18) + (k > 5 ? 1 : 0), id === 7 ? 7 : 4);
      }
      // ---- light it: the bricks, two steps of halo round lit glass, the tubes' colour and their white-hot cores ----
      for (let i = 0; i < NS * NS; i++) { NH1[i] = 0; NH2[i] = 0; }
      for (let y = 0; y < NS; y++) for (let x = 0; x < NS; x++) {
        const id = NT[y * NS + x]; if (!id || id === 7 || !lit[id]) continue;
        for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
          const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= NS || Y >= NS) continue;
          const j = Y * NS + X, d = Math.max(Math.abs(dx), Math.abs(dy));
          if (d === 1 && Math.abs(dx) + Math.abs(dy) < 2) NH1[j] = id; else if (!NH2[j] && Math.abs(dx) + Math.abs(dy) < 4) NH2[j] = id;
        }
      }
      const hum = 0.92 + (Math.floor(t * 11) % 5 === 0 ? 0.08 : 0);
      for (let i = 0; i < NS * NS; i++) {
        const id = NT[i], w = NWALL[i], wr = w & 255, wg = (w >> 8) & 255, wb = (w >> 16) & 255;
        if (id) {
          if (id === 7 || !lit[id]) { NP32[i] = rgb32(92, 84, 96); continue; }
          const tc = TUBE[id], bright = surge >= 0.5 && surge < 1.1 ? 1 : hum;
          NP32[i] = rgb32((tc[0] * 0.45 + 255 * 0.55) * bright, (tc[1] * 0.45 + 255 * 0.55) * bright, (tc[2] * 0.45 + 255 * 0.55) * bright);
        } else if (NH1[i]) { const tc = TUBE[NH1[i]]; NP32[i] = rgb32(tc[0] * 0.8 + wr * 0.2, tc[1] * 0.8 + wg * 0.2, tc[2] * 0.8 + wb * 0.2); }
        else if (NH2[i]) { const tc = TUBE[NH2[i]]; NP32[i] = rgb32(tc[0] * 0.26 + wr * 0.74, tc[1] * 0.26 + wg * 0.74, tc[2] * 0.26 + wb * 0.74); }
        else NP32[i] = w;
      }
      // the surge: the sun bursts in a shower of sparks
      if (surge >= 0 && surge < 0.05 && nsSparks.length < 200) for (let k = 0; k < 40; k++) { const a = k * 2.399; nsSparks.push({ x: SX + Math.cos(a) * 8, y: SY + Math.sin(a) * 8, vx: Math.cos(a) * (14 + (k % 5) * 6), vy: Math.sin(a) * (14 + (k % 5) * 6) - 8, t0: t }); }
      // sparks: white-hot, cooling to yellow and orange as they fall
      for (let k = nsSparks.length - 1; k >= 0; k--) {
        const s2 = nsSparks[k], a = t - s2.t0; if (a > 0.9) { nsSparks.splice(k, 1); continue; }
        s2.vy += 60 * dt; s2.x += s2.vx * dt; s2.y += s2.vy * dt;
        const x = Math.round(s2.x), y = Math.round(s2.y); if (x < 0 || y < 0 || x >= NS || y >= NS) continue;
        const sc2 = a < 0.25 ? rgb32(255, 255, 230) : a < 0.55 ? rgb32(255, 220, 80) : rgb32(255, 120, 40), x2 = Math.round(s2.x - s2.vx * 0.03), y2 = Math.round(s2.y - s2.vy * 0.03);
        NP32[y * NS + x] = sc2; if (x2 >= 0 && y2 >= 0 && x2 < NS && y2 < NS) NP32[y2 * NS + x2] = sc2;
      }
      nsx.putImageData(nsi, 0, 0);
      g.setTransform(1, 0, 0, 1, 0, 0); g.imageSmoothingEnabled = false;
      g.drawImage(nsc, 0, 0, S, S);
    }

    // ---------- the legendaries, under the same three-colours-a-tile rule ----------
    function inkPaper(t) {
      // rice paper, a red sun, a wash of far mountains and the artist's seal
      bg.fill(PAPER);
      for (let i = 0; i < N * N; i++) { const x = i % N, y = (i / N) | 0; if ((x * 13 + y * 7) % 23 === 0) bg[i] = FIBRE; }
      if (inkSun === 'Pale Moon') { fillEl(bg, 16, 10, 12.5, 12.5, WASH); fillEl(bg, 19, 8, 10.5, 10.5, PAPER); }
      else fillEl(bg, 16, 10, 12.5, 12.5, inkSun === 'Gold Sun' ? GLD : SEAL);
      if (inkScene === 'Mountains') for (let x = 0; x < N; x++) {
        const far = 21 - Math.abs(((x + 3) % 22) - 11) * 0.7, near = 26 - Math.abs(((x + 14) % 18) - 9) * 0.8;
        for (let y = Math.ceil(far); y < N; y++) bg[y * N + x] = y >= near ? ((x + 2 * y) % 5 ? WASH : FIBRE) : (x * 3 + y) % 7 === 0 ? WASH : FIBRE;
      } else if (inkScene === 'Waves') for (let x = 0; x < N; x++) for (let y = 22; y < N; y++) {
        // curling waves in a few brush strokes, rolling slowly
        const ph = (x + Math.floor(t * 2) + (y % 4) * 3) % 8;
        bg[y * N + x] = y % 4 === 2 && ph < 5 ? WASH : y % 4 === 1 && ph === 4 ? WASH : FIBRE;
      } else for (const bx of [3, 7, 26, 29]) for (let y = 0; y < N; y++) {
        // bamboo canes up the sides, jointed, with a leaf or two
        bg[y * N + bx] = (y + bx) % 7 === 0 ? INK : WASH;
        if ((y * 3 + bx) % 11 === 0 && bx + 1 < N) { bg[y * N + bx + 1] = WASH; if (bx + 2 < N) bg[(y + 1) * N + bx + 2] = WASH; }
      }
      // the artist's seal: a square red chop with a cut glyph in it (no digit)
      ['SSSSSS', 'S.SS.S', 'SS..SS', 'S.SS.S', 'S.S..S', 'SSSSSS'].forEach((r, j) => { for (let i = 0; i < 6; i++) P(bg, 1 + i, 1 + j, r[i] === 'S' ? SEAL : PAPER); });
      limit(bg, 16, 3, PAPER, -1);
      // the splash of ink thrown off by a tap, drying from black to grey
      const u = t - inkAt;
      if (u < 4) for (const [a, b, r] of spatter) {
        const x = Math.round(16 + (a - 0.5) * 30 * Math.min(1, u * 5)), y = Math.round(14 + (b - 0.5) * 26 * Math.min(1, u * 5));
        if (x >= 0 && y >= 0 && x < N && y < N) { bg[y * N + x] = u < 2.5 ? INK : WASH; if (r > 0.6 && x + 1 < N) bg[y * N + x + 1] = u < 2.5 ? INK : WASH; }
      }
    }
    function legendFigure(t) {
      sp.fill(-1);
      fx.fill(-1); ez.fill(-1);
      if (newLeg) { if (legend === 'Mecha') mechaFigure(t); else if (legend === 'Ghost') ghostFigure(t); return; }
      const blinkG = tt => ((tt + blinkOff) % blinkGap) < 0.15;
      const u0 = t - poofAt, sealing = u0 >= POOF && u0 < POOF + 1.4;
      const bob = Math.sin(t * 1.4 + windPh) > 0.7 ? 1 : 0, hy = 12 + bob, eyeY = hy + 1;
      const torso = (L, colAt, from) => { for (let y = from || 20; y < N; y++) { const half = y < 23 ? 7.4 + (y - 20) * 2.2 : Math.min(15.5, 14 + (y - 23) * 0.35); for (let x = Math.round(16 - half); x < Math.round(16 + half); x++) P(L, x, y, colAt(x, y, half)); } };
      const head = (L, rows, colAt) => { for (let r = -10; r <= 8; r++) { const w = rows[r + 10]; if (!w) continue; for (let x = Math.round(16 - w); x < Math.round(16 + w); x++) P(L, x, hy + r, colAt(x, hy + r, w)); } };
      if (legend === 'Mecha') {
        // plated shoulders, a reactor in the chest, a helmet with a visor whose red eye scans (or follows you)
        torso(sp, (x, y, half) => x < 16 - half + 3 && y > 21 ? MET : (x === 15 || x === 16) && y > 24 ? K : (y - 20) % 4 === 3 ? K : STEEL);
        for (const sd of [-1, 1]) fillEl(fx, 16 + sd * 10.5, 22.5, 4.6, 3.2, (x, y) => y === 23 ? K : sd < 0 && x < 8 ? MET : STEEL);
        const flare = sealing || (ptr && Math.hypot(ptr[0] - 16, ptr[1] - 27.5) < 6), pulse = Math.sin(t * 2.4) > 0.2;
        fillEl(fx, 16, 27.5, 2.7, 2.7, K); fillEl(fx, 16, 27.5, 1.9, 1.9, flare || pulse ? FLM : SPB); P(fx, 16, 27, WH); if (flare) { P(fx, 15, 27, WH); P(fx, 16, 28, WH); }
        // a robot's head: a squared helmet with chamfered corners, a seam down the brow plate, and a jaw
        const MW = [4.5, 6.5, 7.5, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7.5, 6.5, 5.5];
        MW.forEach((w, r) => { const y = hy - 8 + r; for (let x = Math.round(16 - w); x < Math.round(16 + w); x++) P(sp, x, y, x < 16 - w + 2 ? MET : (r === 4 && x > 9 && x < 22) || (r < 4 && x === 16) ? K : STEEL); });
        if (antenna === 'Single Antenna') { for (let k = 0; k < 3; k++) P(sp, 20, hy - 8 - k, MET); P(sp, 20, hy - 11, Math.floor(t * 1.5) % 2 ? RED : WH); }
        else if (antenna === 'Twin Horns') for (const sd of [-1, 1]) for (let k = 0; k < 4; k++) P(sp, 16 + sd * (4 + k * 0.8) - (sd < 0 ? 1 : 0), hy - 7 - k, k > 2 ? WH : MET);
        else if (antenna === 'Crest Fin') for (let k = 0; k < 4; k++) { P(sp, 15, hy - 9 - k, MET); P(sp, 16, hy - 9 - k, k % 2 ? RED : MET); }
        const dish = antenna === 'Ear Dishes' ? 1.6 : 1;
        for (const ex of [7, 24]) { fillEl(sp, ex + 0.5, hy + 1.5, 1.6 * dish, 2.2 * dish, MET); P(sp, ex, hy + 1, K); if (dish > 1) P(sp, ex + (ex < 16 ? -1 : 1), hy + 1, WH); }
        // the faceplate: a plate under the visor, split down the middle, vents for a mouth and a bolt in each cheek
        for (let y = eyeY + 2; y <= hy + 6; y++) { const inset = y === hy + 6 ? 2 : 1; for (let x = 9 + inset; x <= 22 - inset; x++) P(sp, x, y, x === 15 || x === 16 ? K : x < 12 ? MET : STEEL); }
        for (const x of [12, 13, 18, 19]) P(sp, x, hy + 5, K);
        P(sp, 11, eyeY + 2, WH); P(sp, 20, eyeY + 2, WH);
        // a glowing visor bar right across, framed in black, a bright spot scanning along it (or following you)
        const vc = { Red: RED, Green: JADE, Blue: ICE, Amber: YEL }[visor];
        rect(fx, 9, eyeY - 2, 22, eyeY - 2, K); rect(fx, 9, eyeY + 1, 22, eyeY + 1, K); P(fx, 9, eyeY - 1, K); P(fx, 9, eyeY, K); P(fx, 22, eyeY - 1, K); P(fx, 22, eyeY, K);
        rect(fx, 10, eyeY - 1, 21, eyeY, vc);
        const ex = ptr ? Math.max(10, Math.min(20, Math.round(ptr[0] - 0.5))) : 10 + Math.round((Math.sin(t * 1.1) + 1) * 5);
        if (sealing) rect(fx, 10, eyeY - 1, 21, eyeY - 1, WH);
        else { rect(fx, ex, eyeY - 1, ex + 1, eyeY - 1, WH); P(fx, ex, eyeY, WH); }
      } else if (legend === 'Ghost') {
        // a spirit in an empty hood: the body frays into flame-tongues, and blue fire circles it (behind, then in front)
        const flames = (L, front) => {
          const burst = t - legAt < 1.2 ? Math.sin((t - legAt) / 1.2 * Math.PI) * 6 : 0;
          for (let k = 0; k < wisps; k++) {
            const a = t * 0.9 + k * 6.283 / wisps;
            if ((Math.sin(a) > 0) !== !!front) continue;
            const x = Math.round(16 + Math.cos(a) * (12.5 + burst)), y = Math.round(11 + Math.sin(a) * (6 + burst * 0.6)), up = Math.floor(t * 4 + k) % 2;
            P(L, x, y - 2 - up, FLM); rect(L, x - 1, y - 1, x + 1, y + 1, FLM); P(L, x, y, WH); P(L, x, y - 1, WH); P(L, x, y + 2, FLM);
          }
        };
        flames(sp, 0);
        torso(sp, (x, y, half) => {
          if (y < 24) return x < 16 - half + 3 ? FLM : SPB;
          for (const [bx, k] of [[5, 0], [10, 1], [16, 2], [22, 3], [27, 4]]) if (Math.abs(x + 0.5 - (bx + Math.sin(t * 2 + k * 1.3 + y * 0.45) * 1.3)) < (32 - y) * 0.36 + 0.4) return y > 28 ? FLM : SPB;
          return -1;
        });
        head(sp, HOODW.round, (x, y, w) => x < 16 - w + 2.5 ? FLM : SPB);
        // a pale face hanging in the dark of the hood: slanted black eyes with a cold fire in them, a thin mouth
        fillEl(fx, 16, hy + 1.6, 5.8, 5.6, K);
        fillEl(fx, 16, hy + 1.8, 4.6, 4.8, (x, y) => x < 14 && y < eyeY ? FLM : SMK);
        const stare = ptr && Math.hypot(ptr[0] - 16, ptr[1] - eyeY) < 9;
        for (const sd of [-1, 1]) {
          const X = j => sd < 0 ? 12 + j : 19 - j;
          P(fx, X(0), eyeY - 1, K); P(fx, X(2), eyeY, K); if (stare) P(fx, X(1), eyeY - 1, K);
          P(fx, X(0), eyeY, K); P(fx, X(1), eyeY, blinkG(t) ? K : FLM); if (stare) P(fx, X(1), eyeY + 1, K);
        }
        rect(fx, 15, hy + 5, 16, hy + 5, K); if (stare) { P(fx, 15, hy + 6, K); P(fx, 16, hy + 6, K); }
        flames(ez, 1);
      } else {
        // the ninja as a few strokes of ink: a black silhouette with dry-brush edges and a red band
        torso(sp, (x, y, half) => x < 16 - half + 1.5 && y % 3 ? WASH : INK);
        head(sp, HOODW.round, (x, y, w) => x < 16 - w + 1.5 && y % 2 ? WASH : INK);
        for (let k = 0; k < 7; k++) { P(sp, 26.5 + k * 0.75, 18 - k, INK); P(sp, 27.5 + k * 0.75, 18 - k, k % 2 ? INK : WASH); }
        // the brush: ragged dry edges where the stroke ran out, dribbles hanging off the shoulders, streaks of bare paper inside
        const nz = (x, y) => (Math.imul(x * 374761 + y * 668265 ^ lkey, 0x27d4eb2d) >>> 0) / 4294967296;
        const was = sp.slice();
        for (let i = 0; i < N * N; i++) {
          if (was[i] < 0) continue;
          const x = i % N, y = (i / N) | 0, edge = (x > 0 && was[i - 1] < 0) || (x < N - 1 && was[i + 1] < 0) || (y > 0 && was[i - N] < 0);
          if (edge && nz(x, y) < 0.3) sp[i] = -2;
          else if (!edge && y > 20 && (x * 2 + y) % 13 < 2 && nz(Math.floor((x * 2 + y) / 13), Math.floor(y / 5)) < 0.55) sp[i] = x < 12 || x > 21 ? PAPER : WASH;
        }
        for (let x = 0; x < N; x++) for (let y = 19; y < 26; y++) {
          const i = y * N + x;
          if (was[i] >= 0 || y === 0 || was[i - N] < 0 || nz(x + 40, y) > 0.35) continue;
          // a dribble: the ink running down off the edge of the stroke
          const len = 1 + Math.floor(nz(x, y + 50) * 3);
          for (let k = 0; k < len && y + k < N; k++) if (was[(y + k) * N + x] < 0) sp[(y + k) * N + x] = INK;
        }
        rect(fx, 10, eyeY - 1, 21, eyeY, PAPER);
        const look = ptr ? (ptr[0] < 13 ? -1 : ptr[0] > 19 ? 1 : 0) : 0;
        for (const ex0 of [12, 19]) { P(fx, ex0 + look, eyeY, INK); P(fx, ex0 + 1 + look, eyeY, INK); }
        if (inkBand !== 'No Band') {
          const bc = inkBand === 'White Band' ? PAPER : WASH;
          rect(fx, 8, hy - 4, 24, hy - 3, bc);
          for (let k = 0; k < 8; k++) {
            const w = Math.round(Math.sin(t * (4 + wind * 6) + k * 0.8 + windPh) * (k / 8) * (1.5 + wind * 1.4) - wind * k * 0.35);
            P(fx, 25 + k, hy - 3 + k * 0.5 + w, bc); if (k < 6) P(fx, 25 + k, hy - 2 + k * 0.7 + w, bc);
          }
        }
      }
      limit(sp, 8, 3, -1, K);
      limit(fx, 8, 3, -1, K);
      for (let i = 0; i < N * N; i++) if (fx[i] >= 0) sp[i] = fx[i];
      if (legend === 'Ghost') {
        // see-through: the night shows through the whole body in a fine checker (more of it lower down, where it thins),
        // and it fades away wherever the pointer touches; the face stays solid
        const step = Math.floor(t * 3);
        for (let i = 0; i < N * N; i++) { // a dot of the spirit
          const v = sp[i];
          if (v !== SPB && v !== FLM) continue;
          const x = i % N, y = (i / N) | 0, d = ptr ? Math.hypot(x + 0.5 - ptr[0], y + 0.5 - ptr[1]) : 99;
          if ((x + y) % 2 === 0 || (y > 25 && (x + y + step) % 4 === 1) || d < 3.5) sp[i] = -2;
        }
        for (let i = 0; i < N * N; i++) if (ez[i] >= 0) sp[i] = ez[i];
      }
    }

    // a cartridge played on other hardware maps every colour to its own few shades
    const SHADES = legend !== 'None' ? null : cart === 'Handheld Green' ? [[16, 44, 16], [52, 98, 40], [130, 164, 30], [196, 214, 120]] : cart === 'Sepia' ? [[26, 15, 8], [102, 62, 34], [192, 142, 88], [252, 236, 196]] : null;
    // on sepia the face is kept apart from the hood: the garb all on the second shade, skin on the third,
    // and the eyes (their whites, glints and irises) the only things on the brightest
    const SEPIA_AT = cart === 'Sepia' ? new Map([[K, 0], [C1, 1], [CM, 1], [C2, 1], [SKN, 2], [SKL, 3], [SCR, 3], [SKD, 1], [WH, 3], [GLD, 3], [ICE, 3], [JADE, 3], [YEL, 3], [FLM, 3], [RED, 2], [SASH, 2], [SASHD, 1]]) : null;
    const shown = COL.map((cc, i) => {
      if (!SHADES) return cc;
      if (SEPIA_AT && SEPIA_AT.has(i)) return SHADES[SEPIA_AT.get(i)];
      const l = (cc[0] * 0.3 + cc[1] * 0.55 + cc[2] * 0.15) / 255;
      return SHADES[Math.min(SEPIA_AT ? 2 : 3, Math.floor(l * 4.2))];
    });

    const screen = document.createElement('canvas');
    screen.width = N; screen.height = N;
    const sg = screen.getContext('2d');
    const im = sg.createImageData(N, N); // the 32 x 32 frame
    const k = Math.ceil(S / N), off = Math.floor((S - k * N) / 2);

    function frame(t) {
      if (newLeg && legend === 'Ghost') return ghostScreen(t);
      if (newLeg && legend === 'Ink Scroll') return woodblock(t);
      if (legend === 'Ink Scroll') inkPaper(t); else backdrop(t);
      if (familiar === 'Storm Dragon' && t - poofAt < 0.45) {
        // the dragon's lightning, down the right side of the sky
        let x = 29;
        for (let y = 9; y < 26; y++) { x += ((y * 7) % 3) - 1; if (x >= 0 && x < N) { bg[y * N + x] = (y & 1) ? WH : YEL; if (x + 1 < N && y % 4 === 0) bg[y * N + x + 1] = YEL; } }
      }
      figure(t);
      const d = im.data;
      for (let i = 0; i < N * N; i++) { // every dot of the frame
        let v = sp[i];
        if (v < 0) {
          const x = i % N, y = (i / N) | 0; // the dot's column and row
          const near = (x > 0 && sp[i - 1] >= 0) || (x < N - 1 && sp[i + 1] >= 0) || (y > 0 && sp[i - N] >= 0) || (y < N - 1 && sp[i + N] >= 0);
          v = near && v !== -2 && legend !== 'Ink Scroll' ? K : bg[i];
          if (legend === 'Ink Scroll' && ptr && v === bg[i] && Math.hypot(x - ptr[0], y - ptr[1]) < 6 && (x + y) % 2 === 0) {
            // ink bleeding out into the paper around the figure, where the pointer is
            let close = false;
            for (let dy = -2; dy <= 2 && !close; dy++) for (let dx = -2; dx <= 2; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < N && yy < N && sp[yy * N + xx] >= 0) { close = true; break; } }
            if (close) v = WASH;
          }
        }
        const cc = shown[v];
        d[i * 4] = cc[0]; d[i * 4 + 1] = cc[1]; d[i * 4 + 2] = cc[2]; d[i * 4 + 3] = 255;
      }
      // weather: one-dot sprites over everything
      if (weather !== 'Clear' && legend !== 'Ink Scroll') {
        const wc = shown[weather === 'Snow' ? WH : weather === 'Rain' ? RAIN : weather === 'Falling Leaves' ? LEAF : weather === 'Fireflies' ? YEL : WH];
        motes.forEach((m, j) => {
          let x, y, on = true;
          if (weather === 'Snow') { y = (m[1] + t * m[2] * 2.2) % N; x = (m[0] + Math.sin(t * 0.9 + m[3]) * 1.5 + wind * t * 3 + N) % N; }
          else if (weather === 'Rain') { y = (m[1] + t * (14 + m[2] * 6)) % N; x = (m[0] - y * 0.3 - wind * 3 + N * 2) % N; }
          else if (weather === 'Falling Leaves') { if (j > 9) return; y = (m[1] + t * m[2] * 1.6) % N; x = (m[0] + Math.sin(t * 1.3 + m[3]) * 2.5 + wind * 4 + N) % N; }
          else if (weather === 'Fireflies') { if (j > 8) return; x = (m[0] + Math.sin(t * 0.5 + m[3]) * 2 + N) % N; y = 14 + (m[1] % 16) + Math.sin(t * 0.7 + m[3] * 2) * 1.5; on = Math.sin(t * 1.4 + m[3] * 3) > 0.2; }
          else { if (j > 2) return; const ph = (t * 0.4 + m[3]) % 4; if (ph > 0.5) return; x = m[0] + ph * 14; y = m[1] * 0.4 + ph * 6; }
          x = Math.floor(x); y = Math.floor(y);
          if (!on || x < 0 || y < 0 || x >= N || y >= N) return;
          const i = y * N + x;
          if ((weather !== 'Falling Leaves' || j % 3) && sp[i] >= 0) return;
          d[i * 4] = wc[0]; d[i * 4 + 1] = wc[1]; d[i * 4 + 2] = wc[2];
          if (weather === 'Rain' && y + 1 < N && sp[i + N] < 0) { d[i * 4 + N * 4] = wc[0]; d[i * 4 + N * 4 + 1] = wc[1]; d[i * 4 + N * 4 + 2] = wc[2]; }
          if (weather === 'Shooting Stars') for (let q = 1; q < 3; q++) { const xx = x - q * 2, yy = y - q; if (xx >= 0 && yy >= 0 && sp[yy * N + xx] < 0) { const ii = (yy * N + xx) * 4; d[ii] = wc[0] * 0.6; d[ii + 1] = wc[1] * 0.6; d[ii + 2] = wc[2] * 0.7; } }
        });
      }
      sg.putImageData(im, 0, 0);
      g.imageSmoothingEnabled = false; // console pixels, hard edged
      g.drawImage(screen, off, off, k * N, k * N);
    }
    frame(0);
    return (t, dt) => {
      clock = t;
      const inp = c.input;
      ptr = inp.inside ? [inp.x * N, inp.y * N] : null;
      if (ptr && !wasIn && legend === 'Mecha') { c.sound.note(tonic + tune[1], { dur: 0.05, vel: 0.08, wave: 'square', cutoff: 1400 }); c.sound.note(tonic + tune[3], { at: 0.06, dur: 0.07, vel: 0.08, wave: 'square', cutoff: 1400 }); }
      wasIn = !!ptr;
      // bring the pointer close to its face and it narrows its eyes at you, with a quiet blade-whisper
      const close = !!ptr && Math.hypot(ptr[0] - 16, ptr[1] - 14) < 7;
      if (close && !sizing && t - sizedAt > 1.2 && legend === 'None') { sizedAt = t; c.sound.hit('noise', 0.07, { cutoff: 6500, dur: 0.25 }); c.sound.note(tonic + 24 + tune[4], { at: 0.05, dur: 0.4, vel: 0.05, wave: 'sine' }); }
      sizing = close;
      pdown = inp.inside && inp.down;
      // a legendary hears a press as it lands (to grab), and a tap only on a short, still release
      const legTaps = [];
      for (const poke of inp.taps()) { // each tap
        if (newLeg) { const q = [poke.x * N, poke.y * N]; legendTap(q[0], q[1], t, 'down'); if (!inp.down) legTaps.push(q); else lgDown = [q[0], q[1], t, 0]; continue; }
        if (t - poofAt < POOF + 1.4) continue;
        const pan = (poke.x - 0.5) * 0.5;
        legAt = t;
        if (legend === 'Mecha') {
          // servos as it goes, then a power-up climb as it lands back with its visor blazing
          for (let k = 0; k < 6; k++) c.sound.note(tonic + 12 + tune[k % 5] + (k > 4 ? 12 : 0), { at: POOF + k * 0.07, dur: 0.07, vel: 0.14, wave: 'square', cutoff: 3000, pan });
        } else if (legend === 'Ghost') {
          // a long, falling wail
          for (let k = 0; k < 3; k++) c.sound.note(tonic + 12 + tune[4 - k * 2], { at: k * 0.28, dur: 0.6, vel: 0.08, wave: 'sine', pan });
        } else if (legend === 'Ink Scroll') {
          // a brush flick, the seal pressed down, and a plucked string
          inkAt = t;
          c.sound.note(tonic - 24 + tune[0], { dur: 0.12, vel: 0.2, wave: 'triangle', cutoff: 600 });
          for (let k = 0; k < 3; k++) c.sound.note(tonic + tune[(4 - k) % 5], { at: 0.15 + k * 0.16, dur: 0.5, vel: 0.12, wave: 'triangle', pan });
        } else if (familiar === 'Storm Dragon') {
          // thunder from the dragon as it strikes
          c.sound.hit('noise', 0.32, { cutoff: 380, dur: 1.1, pan: 0.6 });
          c.sound.note(tonic - 24 + tune[1], { at: 0.05, dur: 0.4, vel: 0.12, wave: 'sawtooth', cutoff: 500 });
        }
        poofAt = t;
        c.sound.hit('noise', 0.45, { cutoff: 900, dur: 0.35, pan: (poke.x - 0.5) * 0.5 });
        // a falling figure as it goes, a knock of wood for the log, a rising one as it lands
        for (let k = 0; k < 3; k++) c.sound.note(tonic + 12 + tune[4 - k * 2], { at: k * 0.05, dur: 0.05, vel: 0.2, wave: 'square', cutoff: 2600 });
        c.sound.hit('click', 0.35, { at: 0.42 });
        c.sound.note(tonic - 12 + tune[2], { at: 0.42, dur: 0.12, vel: 0.16, wave: 'triangle', cutoff: 900 });
        for (let k = 0; k < 4; k++) c.sound.note(tonic + tune[(k + Math.floor(xr() * 2)) % 5] + (k === 3 ? 12 : 0), { at: 1.05 + k * 0.06, dur: k === 3 ? 0.2 : 0.05, vel: 0.22, wave: 'square', cutoff: 2600 });
      }
      if (lgDown) {
        if (inp.down) lgDown[3] = Math.max(lgDown[3], Math.hypot(inp.x * N - lgDown[0], inp.y * N - lgDown[1]));
        else { if (t - lgDown[2] < 0.25 && lgDown[3] < 1) legTaps.push([lgDown[0], lgDown[1]]); lgDown = null; }
      }
      for (const [x, y] of legTaps) legendTap(x, y, t, 'tap');
      wind += ((inp.inside && inp.down ? 1 : 0) - wind) * Math.min(1, (dt || 0.033) * 4);
      if (!inp.inside && !inp.down && wind < 0.001) wind = 0;
      frame(t);
    };
  },
});

})(window.Proto);
