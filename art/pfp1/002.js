// Pond Pocket: from D:/code/synaesthesia/public/drop03/pieces/002.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Pond Pocket: frogs on a four-shade handheld screen, 32 x 32 dots with the LCD grid showing.
Proto.add({
  num: 2,
  name: 'Pond Pocket',
  seed: 1160,
  fam: 'Pixel Portraits',
  recipe: 'A frog on a four-shade pocket screen, 32 dots across, with the faint grid of the LCD between them. The screen tint, the frog\'s build, skin, eyes, mouth, face, hat, neckwear, the pond behind it, a visitor and how deep in the water it sits vary; a rare few are glass frogs, pale frogs or wear a tiny frog for a hat, and some screens are backlit. About 1 in 430 is a legendary (the one full-colour screen, an axolotl with feathery gills, a stone idol in a ruined temple) and 1 in 200 holds a tiny umbrella.',
  interactive: 'Tap the pond to feed the frog a fly. Tap the frog to make it croak.',
  music: true,
  make(c) {
    const S = c.size, G = 32;
    // sfc32 seeded from four words of the hash
    const w = i => parseInt(c.hash.substr(2 + i * 8, 8), 16) >>> 0;
    let a = w(0) ^ w(4), b = w(1) ^ w(5), d = w(2) ^ w(6), e = w(3) ^ w(7) | 1;
    function sfc() {
      a >>>= 0; b >>>= 0; d >>>= 0; e >>>= 0;
      let t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (d + (d << 3)) | 0;
      d = (d << 21) | (d >>> 11);
      e = (e + 1) | 0;
      t = (t + e) | 0;
      d = (d + t) | 0;
      return (t >>> 0) * 2.3283064365386963e-10;
    }
    for (let i = 0; i < 12; i++) sfc();
    function roll(table) {
      let sum = 0;
      for (const k in table) sum += table[k];
      let x = sfc() * sum;
      for (const k in table) { x -= table[k]; if (x < 0) return k; }
      return Object.keys(table)[0];
    }

    const screens = {
      Pea: ['#d3dc9c', '#8ea65b', '#46683a', '#18281b'],
      Slate: ['#e2e2da', '#a0a5a2', '#5b6068', '#202229'],
      Berry: ['#fbe2ea', '#d27c9f', '#7b3561', '#2a0e25'],
      Tide: ['#dbf4ef', '#6db6bf', '#2d5d80', '#0f1b33'],
      Amber: ['#fff1c4', '#e1a143', '#8b4a19', '#2a1407'],
      Ultraviolet: ['#f1dcff', '#a473e3', '#4a2a91', '#140827'],
      Coral: ['#ffe6dc', '#f08c70', '#9a3a3e', '#2b0f14'],
      Mint: ['#e6fff2', '#80d8a8', '#2e7a60', '#0c2922'],
      Lavender: ['#f1ecff', '#aa9ce0', '#594a9a', '#1a1433'],
      Cocoa: ['#f4e4ce', '#b68a64', '#6a4630', '#24150c'],
      Lemon: ['#fffbd8', '#e4d866', '#8c8628', '#2a2808'],
      Ice: ['#f2fbff', '#a6c8e8', '#4f6f9e', '#151d33'],
      Gold: ['#fff6cf', '#efc65a', '#9a6b16', '#2e1d04'],
      Neon: ['#eaffe2', '#58f08c', '#e8409c', '#1a0630'],
    };
    let screen = roll({ Pea: 30, Slate: 18, Berry: 16, Tide: 16, Amber: 14, Ultraviolet: 6 });
    let skin = roll({ Plain: 30, Spotted: 26, Striped: 16, Warty: 18, 'Dart Frog': 10 });
    let eyes = roll({ Round: 30, Slit: 20, Sleepy: 16, Tiny: 14, Happy: 12, Starry: 8 });
    let mouth = roll({ Smile: 32, Flat: 20, Pout: 16, Tongue: 22, 'Fly Snack': 10 });
    let hat = roll({ None: 30, 'Lily Pad': 16, Mushroom: 14, Beanie: 16, Crown: 8, Flower: 16 });
    let neck = roll({ None: 34, Bandana: 18, Bowtie: 18, Scarf: 16, Pearls: 14 });
    let pond = roll({ Ripples: 26, Reeds: 22, Rain: 18, Checks: 14, Plain: 12, Fireflies: 8 });
    const spots = [];
    for (let i = 0; i < 9; i++) spots.push([sfc() * 22 - 11, sfc() * 10 - 5, sfc()]);
    const rip = [4 + sfc() * 24, 4 + sfc() * 8];
    const blinkGap = 2.5 + sfc() * 3, blinkOff = sfc() * 4, puffGap = 4 + sfc() * 3;
    const flies = [];
    for (let i = 0; i < 6; i++) flies.push([sfc() * 32, sfc() * 14 + 1, sfc() * 6.28]);
    const tilt = sfc() < 0.5 ? -1 : 1;

    // later additions, drawn from their own xorshift on the last word of the hash so every
    // draw above stays as it was
    let q = (parseInt(c.hash.slice(-8), 16) ^ 0x5bd1e995) >>> 0 || 1;
    const xs = () => { q ^= q << 13; q >>>= 0; q ^= q >>> 17; q ^= q << 5; q >>>= 0; return q / 4294967296; };
    xs(); xs();
    const vr = xs();
    let visitor = vr < 0.02 ? 'Ladybird' : vr < 0.08 ? 'Snail' : 'None';
    // the croak's key: a major-ish pond scale
    const croakRoot = 40 + Math.floor(xs() * 7), POND = [0, 2, 4, 7, 9];
    const pnote = k => croakRoot + 12 * Math.floor(k / 5) + POND[((k % 5) + 5) % 5];
    const wr = xs();
    let water = wr < 0.6 ? 'Dry' : wr < 0.86 ? 'Waist Deep' : 'Peeking';
    let backlit = xs() < 0.025;
    // the big widening: about half of the frogs trade a trait for one of the new ones
    const pickX = table => {
      let sum = 0;
      for (const k in table) sum += table[k];
      let x = xs() * sum;
      for (const k in table) if ((x -= table[k]) < 0) return k;
      return Object.keys(table)[0];
    };
    const widen = (was, p, table) => xs() < p ? pickX(table) : was;
    screen = widen(screen, 0.55, { Pea: 12, Slate: 8, Berry: 8, Tide: 8, Amber: 7, Ultraviolet: 4, Coral: 12, Mint: 12, Lavender: 12, Cocoa: 10, Lemon: 10, Ice: 10, Gold: 2.5, Neon: 2 });
    skin = widen(skin, 0.55, { Plain: 12, Spotted: 12, Striped: 8, Warty: 8, 'Dart Frog': 6, Freckled: 14, Banded: 12, 'Two-Tone': 14, 'Glass Frog': 3, Pale: 3 });
    eyes = widen(eyes, 0.6, { Round: 12, Slit: 8, Sleepy: 8, Tiny: 6, Happy: 6, Starry: 4, Heart: 8, Wink: 10, Dizzy: 6, Sparkle: 12, 'Side-Eye': 10, Teary: 7, Googly: 6 });
    mouth = widen(mouth, 0.55, { Smile: 14, Flat: 8, Pout: 8, Tongue: 10, 'Fly Snack': 5, Whistle: 10, Blep: 12, 'Bubble Gum': 8, Grin: 12, Gulp: 9 });
    hat = widen(hat, 0.6, { None: 14, 'Lily Pad': 8, Mushroom: 7, Beanie: 8, Crown: 4, Flower: 8, 'Straw Hat': 12, 'Party Hat': 10, 'Bucket Hat': 10, 'Acorn Cap': 10, Sprout: 9, Halo: 3, 'Tiny Frog': 2 });
    neck = widen(neck, 0.55, { None: 16, Bandana: 9, Bowtie: 9, Scarf: 8, Pearls: 7, Bell: 12, Lei: 10, Medal: 8, Necktie: 10, 'Daisy Chain': 10 });
    pond = widen(pond, 0.6, { Ripples: 12, Reeds: 10, Rain: 8, Checks: 6, Plain: 6, Fireflies: 6, 'Lily Pads': 14, Moon: 12, Cattails: 12, Bubbles: 12, Stars: 10, Sunset: 10, Rainbow: 3 });
    let build = pickX({ Classic: 40, Bullfrog: 20, 'Tree Frog': 22, Froglet: 14 });
    let face = pickX({ None: 54, Glasses: 10, Shades: 8, Blush: 12, 'Band-Aid': 7, 'Flower Clip': 6, Monocle: 3 });
    if (visitor === 'None' && xs() < 0.36) visitor = pickX({ Dragonfly: 34, Butterfly: 34, Tadpoles: 24, Moth: 8 });
    if (visitor === 'Tadpoles' && water === 'Dry') visitor = 'Butterfly';
    if ((visitor === 'Snail' || visitor === 'Ladybird') && water !== 'Dry') visitor = 'Dragonfly';
    const bubbles = [];
    for (let i = 0; i < 9; i++) bubbles.push([xs() * 32, xs() * 40, 0.8 + xs() * 1.4]);

    // the legendaries and the coveted umbrella: a xoshiro128** stream of their own on four of the hash's
    // words, so every draw above (and every ordinary frog) keeps its look
    let k0 = (w(1) ^ 0xa3c59ac3) >>> 0, k1 = (w(3) ^ 0x1b873593) >>> 0, k2 = (w(5) ^ 0xcc9e2d51) >>> 0, k3 = (w(7) ^ 0x85ebca6b | 1) >>> 0;
    const rotl = (x, r) => (x << r) | (x >>> (32 - r));
    const xo = () => {
      const r = Math.imul(rotl(Math.imul(k1, 5), 7), 9) >>> 0, t = k1 << 9;
      k2 ^= k0; k3 ^= k1; k1 ^= k2; k0 ^= k3; k2 ^= t; k3 = rotl(k3, 11);
      return r / 4294967296;
    };
    for (let i = 0; i < 8; i++) xo();
    const lg = xo(), brollyRoll = xo(), morphRoll = xo();
    const leg = lg < 0.00083 ? 'Full Colour' : lg < 0.00166 ? 'Axolotl' : lg < 0.00233 ? 'Stone Idol' : 'None';
    const brolly = leg === 'None' && brollyRoll < 0.005;
    // axolotl skin: pale pink (leucistic) or wild speckled; the dark morph read as a blob, so it's gone
    const morph = morphRoll < 0.6 ? 0 : 1;
    // poses and three more builds: a stream of their own on two more of the hash's words, so the draws
    // above keep every frog's screen, skin, eyes, gear and pond
    let pq = (w(2) ^ w(5) ^ 0x2c1b3c6d) >>> 0 || 7;
    const ps = () => { pq ^= pq << 13; pq >>>= 0; pq ^= pq >>> 17; pq ^= pq << 5; pq >>>= 0; return pq / 4294967296; };
    ps(); ps(); ps();
    const pickP = table => {
      let sum = 0;
      for (const k in table) sum += table[k];
      let x = ps() * sum;
      for (const k in table) if ((x -= table[k]) < 0) return k;
      return Object.keys(table)[0];
    };
    let pose = pickP({ Sitting: 30, Croaking: 18, 'Chin on Hands': 16, 'On a Rock': 18, 'Tongue Out': 18 });
    const newBuild = pickP({ 'Horned Frog': 1, 'Rain Frog': 1, 'Reed Frog': 1 });
    if (build === 'Classic' && ps() < 0.42) build = newBuild;
    if (leg !== 'None') backlit = false;
    if (leg === 'Full Colour') screen = 'Full Colour';
    if (leg === 'Axolotl') { build = 'Axolotl'; eyes = 'Beady'; skin = ['Leucistic', 'Wild'][morph]; face = 'None'; neck = 'None'; if (visitor === 'Tadpoles') visitor = 'None'; }
    if (leg === 'Axolotl' || leg === 'Stone Idol') pose = 'Sitting';
    // a pose that needs the frog's body shows it: the pond comes no higher than the waist, and the
    // mouths that hang down give way to a smile where a throat sac or a long tongue takes the space
    if (pose !== 'Sitting' && water === 'Peeking') water = 'Waist Deep';
    if ((pose === 'Croaking' || pose === 'Tongue Out') && /Tongue|Fly Snack|Blep|Bubble Gum|Whistle|Pout|Gulp/.test(mouth)) mouth = 'Smile';
    if (pose === 'Chin on Hands') neck = 'None';
    if (leg === 'Stone Idol') {
      hat = 'None'; neck = 'None'; face = 'None'; mouth = 'Flat'; eyes = 'Gemstones'; skin = 'Carved Stone'; pond = 'Temple Ruins'; water = 'Dry';
      if (visitor === 'Tadpoles') visitor = 'Butterfly';
    }

    c.trait('Screen', screen);
    c.trait('Build', build);
    if (leg !== 'Axolotl' && leg !== 'Stone Idol') c.trait('Pose', pose);
    c.trait('Skin', skin);
    c.trait('Eyes', eyes);
    c.trait('Mouth', mouth);
    c.trait('Face', face);
    c.trait('Hat', hat);
    c.trait('Neck', neck);
    c.trait('Pond', pond);
    c.trait('Visitor', visitor);
    c.trait('Water', water);
    if (backlit) c.trait('Screen Light', 'Backlit');
    if (brolly) c.trait('Holding', 'Tiny Umbrella');
    if (leg !== 'None') c.trait('Legendary', leg);

    const pal = screens[screens[screen] ? screen : 'Pea'].map(h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
    const px = new Uint8Array(G * G);
    // what each dot belongs to (sky, skin, eyes, gear, water, critters, mouth): only the colour screen uses it
    const zone = new Uint8Array(G * G);
    let Z = 0;
    const set = (x, y, v) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < G && y < G) { px[y * G + x] = v; zone[y * G + x] = Z; } };
    const get = (x, y) => (x >= 0 && y >= 0 && x < G && y < G) ? px[y * G + x] : 0;
    const mask = new Uint8Array(G * G);
    const inE = (x, y, cx, cy, rx, ry) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
    // a sprite as rows of shade digits ('.' is see-through)
    const sprite = (rows, x0, y0) => rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') set(x0 + i, y0 + j, +ch); }));

    // the frog's build: head size, where the eye bulges sit, and how low the head rides
    const B = {
      Classic: { rx: 11.6, ry: 7.2, ex: 6, ey: 11.5, er: 4.4, hy: 18 },
      Bullfrog: { rx: 13.3, ry: 7.6, ex: 7.2, ey: 12.4, er: 3.8, hy: 18.6 },
      'Tree Frog': { rx: 10.2, ry: 6.6, ex: 6.4, ey: 10.6, er: 5.0, hy: 17.6 },
      Froglet: { rx: 9.4, ry: 5.8, ex: 5.1, ey: 14.6, er: 3.9, hy: 20.4 },
      Axolotl: { rx: 11.4, ry: 6.6, ex: 5.6, ey: 15.6, er: 1.2, hy: 18.6 },
      // a wide flat horned frog, a round little rain frog with its eyes sunk in, a reed frog with a long snout
      'Horned Frog': { rx: 14.2, ry: 6.0, ex: 7.8, ey: 13.2, er: 3.7, hy: 19.2, body: 1.6 },
      'Rain Frog': { rx: 11.2, ry: 8.8, ex: 4.9, ey: 13.6, er: 3.7, hy: 18.6, body: 3.4 },
      'Reed Frog': { rx: 8.6, ry: 8.4, ex: 6.2, ey: 11.0, er: 3.9, hy: 18.0, body: 0.4, snout: 1 },
    }[build];
    const axo = leg === 'Axolotl', idol = leg === 'Stone Idol', colour = leg === 'Full Colour';
    const hx = 16, hy = B.hy, dy = Math.round(hy - 18), EX = [hx - B.ex, hx + B.ex], EY = B.ey, ER = B.er;
    const eyeR = ER * 0.66, my = 20 + dy, hatY = axo ? Math.round(hy - B.ry - 6.4) : Math.round(EY - ER - 7.1);
    const wide = Math.round(B.rx - 3.6);

    // the viewer's fly and the frog's tongue (large view only)
    let fly = null, tongue = null, gulpUntil = -1, blinkUntil = -1, lastCroak = -9;
    // the legendaries' and the umbrella's state: gill fluff, the idol's gaze and rumble, the colour
    // screen's glare and palette cycle, the umbrella's twirl and its little rain shower
    let fluff = 0, gaze = 0, rumbleUntil = -1, cycleUntil = -1, glare = null, twirlUntil = -1, rainOn = false, lastPlink = -9;
    const blows = [], dust = [];
    const drops = [];
    // the poses' helpers: a copy of the bare pond, buffers for the leaning frog, and thick strokes with an outline
    const bgPx = new Uint8Array(G * G), bgZ = new Uint8Array(G * G), tmpPx = new Uint8Array(G * G), tmpZ = new Uint8Array(G * G), tmpM = new Uint8Array(G * G);
    const side = brolly ? -1 : tilt;
    const stroke = (cells, x0, y0, x1, y1, r) => {
      const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 3) + 1;
      for (let k = 0; k <= n; k++) {
        const x = x0 + (x1 - x0) * k / n, y = y0 + (y1 - y0) * k / n;
        for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) if (xx >= 0 && yy >= 0 && xx < G && yy < G && Math.hypot(xx + 0.5 - x, yy + 0.5 - y) <= r) cells.add(yy * G + xx);
      }
    };
    const solid = (cells, fill) => {
      for (const i of cells) for (const [ddx, ddy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const X = i % G + ddx, Y = Math.floor(i / G) + ddy;
        if (X >= 0 && Y >= 0 && X < G && Y < G && !cells.has(Y * G + X)) set(X, Y, 3);
      }
      for (const i of cells) set(i % G, Math.floor(i / G), fill);
    };
    function background(t) {
      const ring = Math.floor(t * 2) % 6;
      Z = 0;
      zone.fill(0);
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        let v = 0;
        if (pond === 'Temple Ruins') {
          // an old wall of offset stone blocks, lit from the upper left, mortar dark between them
          const row = y >> 2, bx = (x + (row % 2) * 3) % 6;
          v = y % 4 === 3 || bx === 5 ? 1 : 0;
          if (y > 26) v = (x + y) % 2 ? 1 : 2;
        } else if (pond === 'Ripples') { const r = Math.hypot(x - rip[0], (y - rip[1]) * 1.6); v = (Math.floor(r) - ring + 60) % 6 === 0 ? 1 : 0; }
        else if (pond === 'Reeds') { const h = (x * 7) % 5; v = (x % 4 === 1 && y > 8 + h) ? (x % 8 === 1 ? 2 : 1) : 0; if (x % 8 === 5 && y === 7 + h) v = 2; }
        else if (pond === 'Rain') v = ((x + y * 2 + ring * 2) % 9 === 0 && y % 3 !== 0) ? 1 : 0;
        else if (pond === 'Checks') v = ((x >> 2) + (y >> 2)) % 2 ? 1 : 0;
        else if (pond === 'Fireflies' || pond === 'Stars' || pond === 'Moon') v = 3;
        else if (pond === 'Sunset') v = y < 9 ? 0 : y < 14 ? ((x + y) % 2 ? 0 : 1) : y < 20 ? 1 : y < 25 ? ((x + y) % 2 ? 1 : 2) : 2;
        else if (pond === 'Rainbow') { const r = Math.hypot(x + 0.5 - 16, y + 0.5 - 36); v = r > 27 && r < 29 ? 3 : r > 25 && r < 27 ? 2 : r > 23 && r < 25 ? 1 : 0; }
        else if (pond === 'Lily Pads') {
          for (const [lx, ly, lr] of [[4, 5, 3.4], [27, 3, 2.8], [3, 24, 3], [29, 21, 3.2], [16, 2, 2.2]]) {
            if (inE(x, y, lx, ly, lr, lr * 0.55) && !(x + 0.5 > lx && Math.abs(y + 0.5 - ly) < 0.6)) v = inE(x, y, lx, ly, lr - 1, lr * 0.55 - 0.7) ? 1 : 2;
          }
        } else if (pond === 'Cattails') {
          const sway = Math.sin(t * 0.9 + x * 0.4) > 0.3 ? 1 : 0;
          for (const [cx2, top] of [[2, 6], [5, 10], [27, 7], [30, 11], [24, 13]]) {
            const sx = cx2 + (y < top + 4 ? sway : 0);
            if (x === sx && y >= top + 3) v = 2;
            if (y >= top && y < top + 3 && (x === sx || x === sx + 1)) v = 3;
            if (x === sx && y === top - 1) v = 2;
          }
        }
        px[y * G + x] = v;
      }
      if (pond === 'Fireflies') for (const f of flies) set(f[0] + Math.sin(t * 0.7 + f[2]) * 1.2, f[1] + Math.cos(t * 0.5 + f[2]), Math.sin(t * 2 + f[2]) > -0.3 ? 0 : 2);
      if (pond === 'Stars' || pond === 'Moon') for (let i = 0; i < 12; i++) {
        const sx = Math.floor(rip[0] * 7 + i * 11) % 32, sy = (i * 7 + Math.floor(rip[1] * 3)) % 15;
        set(sx, sy, Math.sin(t * 1.3 + i * 2.1) > 0.5 ? 0 : 1);
      }
      if (pond === 'Moon') for (let y = 1; y < 10; y++) for (let x = 21; x < 31; x++) if (inE(x, y, 26, 5, 3.6, 3.6)) set(x, y, (x === 25 && y === 4) || (x === 27 && y === 6) ? 1 : 0);
      if (pond === 'Bubbles') for (const bb of bubbles) {
        const by = 33 - ((bb[1] + t * bb[2] * 2) % 40), bx = bb[0] + Math.sin(t * 1.5 + bb[1]) * 0.8;
        if (bb[2] > 1.6) { set(bx, by - 1, 1); set(bx - 1, by, 1); set(bx + 1, by, 1); set(bx, by + 1, 1); set(bx, by, 0); }
        else set(bx, by, 1);
      }
      if (pond !== 'Plain' && pond !== 'Checks' && pond !== 'Sunset' && pond !== 'Rainbow') for (let x = 0; x < G; x++) if (get(x, 31) === 0) set(x, 31, 1);
      if (pond === 'Temple Ruins') {
        // vines hanging over the wall, leaves on alternate sides, swaying a dot now and then
        for (const [vx, len, ph] of [[2, 15, 0], [5, 8, 1.7], [26, 11, 3.1], [29, 18, 0.6]]) for (let y = 0; y < len; y++) {
          const sx = vx + (y > len - 5 && Math.sin(t * 0.9 + ph) > 0.4 ? 1 : 0);
          set(sx, y, 3);
          if (y % 3 === 1) { set(sx + (y % 6 === 1 ? 1 : -1), y, 2); set(sx + (y % 6 === 1 ? 1 : -1), y + 1, 2); }
        }
      }
      // raindrops the viewer taps out of the sky
      Z = 4;
      for (let i = drops.length - 1; i >= 0; i--) {
        const dr = drops[i], u = t - dr.t0;
        if (u > 1.6) { drops.splice(i, 1); continue; }
        if (u < 0.6) { set(dr.x, dr.y + u * 18, 1); set(dr.x, dr.y + u * 18 - 1, 1); }
        else { const r = (u - 0.6) * 3; for (const s of [-1, 1]) set(dr.x + s * r, Math.min(31, dr.y + 11), 0); }
      }
    }

    function draw(t) {
      const blink = ((t + blinkOff) % blinkGap) < 0.15 || t < blinkUntil;
      const puff = ((t + 1.3) % puffGap) < 0.6 || t < gulpUntil ? 1 : 0;
      background(t);
      bgPx.set(px); bgZ.set(zone);

      // the frog: head, eye bulges, shoulders
      mask.fill(0);
      const bodyRx = B.rx + 1.9 + (B.body || 0), waist = B.rx * 0.8;
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        let m = 0;
        if (inE(x, y, hx, hy, B.rx, B.ry) && !(B.snout && y + 0.5 > hy && Math.abs(x + 0.5 - hx) > B.rx * Math.sqrt(Math.max(0, 1 - ((y + 0.5 - hy) / B.ry) ** 2)) * (1 - 0.4 * (y + 0.5 - hy) / B.ry))) m = 1;
        if (inE(x, y, EX[0], EY, ER, ER * 0.95) || inE(x, y, EX[1], EY, ER, ER * 0.95)) m = 1;
        if (idol) { if ((y >= 25 && x >= 5 && x <= 26) || (y >= 28 && x >= 2 && x <= 29)) m = 2; }
        // lying on its belly: a low body spreading out under the head down to the lily pad
        else if (pose === 'Chin on Hands') { if (y + 0.5 > hy && inE(x, y, hx, 29.5 + dy * 0.6, bodyRx - 1, 6.5)) m = 2; }
        else if (pose === 'On a Rock' ? y < 28 && inE(x, y, hx, 29 + dy * 0.6, bodyRx - 3.5, 7) : inE(x, y, hx, 33 + dy * 0.6, bodyRx, 10)) m = 2;
        // the shoulders start right under the chin: no waist the sky can show through
        else if (!m && y + 0.5 > hy && Math.abs(x + 0.5 - hx) <= waist) m = 2;
        mask[y * G + x] = m;
      }
      // the axolotl's feathery gills, three fronds a side, drawn behind the head
      if (axo) {
        // the gills are the one thing on this screen in real pink (zone 7 paints from a pink ramp)
        Z = 7;
        for (const s of [-1, 1]) for (let k = 0; k < 3; k++) {
          const a = -1.05 + k * 0.62 + Math.sin(t * (1.4 + fluff * 3) + k * 1.3 + s) * (0.1 + fluff * 0.12);
          const bx = hx + s * (B.rx - 2.6), by = hy - 4.2 + k * 2.4, len = 5.4 + (k === 1 ? 1.2 : 0) + fluff * 1.8;
          for (let i = 1; i <= len; i++) {
            const fx = bx + s * Math.cos(a) * i, fy = by + Math.sin(a) * i;
            const X = Math.round(fx), Y = Math.round(fy);
            if (X < 0 || Y < 0 || X >= G || Y >= G || mask[Y * G + X]) continue;
            set(X, Y, i > len - 1.2 ? 3 : 2);
            if (i < len - 1.5 && Y + 1 < G && !mask[(Y + 1) * G + X]) set(X, Y + 1, 2);
            // the feathery filaments along each frond
            if (i > 1.5 && Math.round(i) % 2 === 0) { const ox = Math.round(fx - Math.sin(a) * s), oy = Math.round(fy + Math.cos(a) * 0.9); if (ox >= 0 && oy >= 0 && ox < G && oy < G && !mask[oy * G + ox] && zone[oy * G + ox] !== 7) set(ox, oy, 1); }
          }
        }
      }
      const pale = skin === 'Pale';
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const m = mask[y * G + x];
        if (!m) continue;
        const edge = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([ddx, ddy]) => { const X = x + ddx, Y = y + ddy; return X >= 0 && Y >= 0 && X < G && Y < G && !mask[Y * G + X]; });
        // the chin line between head and shoulders
        const chin = m === 2 && y > 0 && mask[(y - 1) * G + x] === 1 && !inE(x, y, hx, hy, B.rx, B.ry);
        // axolotl skins: pale (a dither of the two lightest), wild (speckled), dark
        let v = pale || (axo && morph === 0) ? ((x + y) % 2 ? 0 : 1) : axo ? morph : 1;
        const lx = (x + 0.5 - hx) / B.rx, ly = (y + 0.5 - hy) / B.ry;
        if (m === 1 && lx * 0.45 + ly * 0.9 > 0.62 && v < 2 && !idol) v++;
        if (idol && m === 1) v = lx * 0.6 + ly * 0.8 < -0.5 || (x * 3 + y * 5) % 13 === 0 ? 1 : 2;
        if (m === 2 && (x + 0.5 - hx) > 7) v++;
        // lying down, the body sits in the head's shadow so the lit forearms stand out in front of it
        if (m === 2 && pose === 'Chin on Hands') v = pale ? 1 : 2;
        if (skin === 'Two-Tone' && m === 1 && ly < -0.15) v = 2;
        if (skin === 'Banded' && m === 1 && (y - Math.round(hy) + 40) % 4 === 0 && ly < 0.5) v = 2;
        // the wild morph: a light sprinkle of dark freckles, kept off the face so its eyes and smile show
        if (axo && morph === 1 && (x * 5 + y * 3) % 9 === 0 && !(m === 1 && Math.abs(y + 0.5 - EY) < 3)) v = 2;
        if (axo && m === 1 && inE(x, y, hx, hy + 4.2, 6, 2.2)) v = morph === 2 ? 1 : 0;
        if (idol && m === 2) {
          // the plinth: two stepped tiers, a zigzag carved round the upper one, moss creeping up the base
          v = y === 25 || (y === 28 && x < 6) || (y === 28 && x > 25) ? 1 : 2;
          if (y === 26 && ((x >> 1) % 2 ? x % 2 === 0 : x % 2 === 1)) v = 3;
          if (y >= 29 && (x * 5 + y * 3) % 7 < 2) v = 1;
        }
        px[y * G + x] = Math.min(3, edge || chin ? 3 : v);
        zone[y * G + x] = 1;
      }
      // pale throat (puffs now and then); stone and axolotls don't croak
      if (!axo && !idol) for (let y = 21 + dy; y < 26 + dy + puff; y++) for (let x = 10; x < 22; x++) {
        if (inE(x, y, hx, 23 + dy + puff * 0.5, 5.2 + puff, 2.6 + puff * 0.6) && px[y * G + x] !== 3 && mask[y * G + x] && !(pose === 'Chin on Hands' && mask[y * G + x] === 2)) px[y * G + x] = pale ? 1 : 0;
      }
      if (axo) for (const s of [-1, 1]) { set(hx - 0.5 + s * 6.5, my - 2, 2); set(hx - 0.5 + s * 7.5, my - 2, 2); }
      if (idol) {
        // a third gem set in the brow, and two carved nostrils
        Z = 1;
        const lit3 = gaze > 0.5;
        sprite(lit3 ? ['.3.', '303', '.3.'] : ['.3.', '313', '.3.'], 14.5, 12 + dy);
        sprite(['3', '.', '3'], 15, 15 + dy); sprite(['3', '.', '3'], 16, 15 + dy);
      }
      // skin pattern
      Z = 1;
      if (skin === 'Spotted' || skin === 'Dart Frog') for (const s of spots) {
        const sx = hx + s[0], sy = hy - 1 + s[1];
        if (px[Math.round(sy) * G + Math.round(sx)] !== 3 && mask[Math.round(sy) * G + Math.round(sx)]) {
          set(sx, sy, skin === 'Dart Frog' ? 3 : 2);
          if (s[2] > 0.5) set(sx + 1, sy, skin === 'Dart Frog' ? 3 : 2);
          if (skin === 'Dart Frog') { set(sx + 1, sy, 3); set(sx, sy + 1, 3); set(sx + 1, sy + 1, 3); if (s[2] > 0.4) { set(sx + 2, sy, 3); set(sx - 1, sy + 1, 3); } }
        }
      }
      if (skin === 'Striped') for (let y = 12; y < 32; y++) for (let x = 0; x < G; x++) {
        const v = px[y * G + x];
        // a bullfrog's stripes are fewer and softer: one thin band in nine, only on the lit skin
        if ((build === 'Bullfrog' ? v === 1 && (x - y + 64) % 9 === 0 : (v === 1 || v === 2) && (x - y + 64) % 6 < 2) && mask[y * G + x] &&!(y > 19 + dy && y < 27 + dy && x > 8 && x < 23)) px[y * G + x] = 2;
      }
      if (skin === 'Warty') for (const s of spots) {
        const sx = Math.round(hx + s[0]), sy = Math.round(hy + s[1]);
        if (px[sy * G + sx] === 1) { set(sx, sy, 0); set(sx + 1, sy + 1, 2); }
      }
      if (skin === 'Freckled') for (let y = 6; y < 32; y++) for (let x = 0; x < G; x++) if (px[y * G + x] === 1 && (x * 7 + y * 3) % 11 === 0) px[y * G + x] = 2;
      if (skin === 'Glass Frog') {
        // a see-through belly with the little heart beating inside
        for (let y = 26 + dy; y < 32; y++) for (let x = 11; x < 21; x++) if (mask[y * G + x] === 2 && inE(x, y, 16, 31 + dy, 5, 5) && px[y * G + x] !== 3) px[y * G + x] = 0;
        const beat = (t * 1.3) % 1 < 0.18 ? 1 : 0;
        sprite(beat ? ['3.3', '333', '.3.'] : ['2.2', '222', '.2.'], 15, 28 + dy);
      }
      if (build === 'Bullfrog' && !idol) for (const s of [-1, 1]) {
        // the round eardrum behind each eye
        const cx2 = hx + s * (B.ex + 3.2), cy2 = EY + 3.6;
        for (let y = Math.floor(cy2 - 2); y <= cy2 + 2; y++) for (let x = Math.floor(cx2 - 2); x <= cx2 + 2; x++) {
          const r = Math.hypot(x + 0.5 - cx2, y + 0.5 - cy2);
          if (r < 1.9 && mask[y * G + x] && px[y * G + x] !== 3) px[y * G + x] = r > 1.1 ? 3 : 2;
        }
      }
      // the horned frog's pointed lids, a little horn over each eye
      if (build === 'Horned Frog' && !idol) for (const s of [-1, 1]) {
        const ex = Math.round(hx - 0.5 + s * B.ex), top = Math.round(EY - ER);
        sprite(s < 0 ? ['3...', '33..', '323.', '3223'] : ['...3', '..33', '.323', '3223'], s < 0 ? ex - 2 : ex - 1, top - 3);
      }
      // the stone idol's carved crown, its three gems glowing faintly and blazing when it's watched
      if (idol) {
        Z = 3;
        const glow = gaze > 0.5 || Math.sin(t * 1.7) > -0.6 ? 0 : 2, cy = Math.max(1, Math.round(EY - ER) - 4);
        sprite(['3....33....3', '30..3003..03', '313.3113.313', '311331133113', '311111111113', '31g11gg11g13', '322222222223', '333333333333'].map(r => r.replace(/g/g, glow)), 10, cy);
        // watched, the crown blazes: light flickers off its points
        if (gaze > 0.5) for (const [gx, gy] of [[10, 0], [21, 0], [14, -1], [17, -1]]) if (Math.floor(t * 6 + gx) % 2) set(gx, cy + gy, 0);
      }
      // hats
      Z = 3;
      const H0 = hatY;
      if (hat === 'Lily Pad') {
        for (let y = 2; y <= 7; y++) for (let x = 6; x <= 25; x++) {
          if (inE(x, y, 16, 5.5, 8.5, 2.6)) {
            const notch = x >= 16 && x <= 17 && y >= 5;
            if (!notch) set(x, y + H0, inE(x, y, 16, 5.5, 7.5, 1.7) ? ((x + y) % 5 === 0 ? 1 : 2) : 3);
          }
        }
      } else if (hat === 'Mushroom') {
        for (let y = 0; y <= 7; y++) for (let x = 8; x <= 23; x++) {
          if (y <= 6 && inE(x, y, 16, 6.5, 7.5, 6)) set(x, y + H0, inE(x, y, 16, 6.5, 6.6, 5.1) ? (((x - 12) ** 2 + (y - 3) ** 2 < 2.2) || ((x - 19) ** 2 + (y - 4) ** 2 < 1.6) || ((x - 15) ** 2 + (y - 1) ** 2 < 1) ? 0 : 2) : 3);
        }
        for (let x = 9; x <= 22; x++) set(x, 7 + H0, 3);
      } else if (hat === 'Beanie') {
        for (let y = 2; y <= 8; y++) for (let x = 8; x <= 23; x++) {
          if (inE(x, y, 16, 9, 7.6, 7) && y <= 8) set(x, y + H0, inE(x, y, 16, 9, 6.6, 6) ? (y >= 7 ? ((x % 2) ? 1 : 0) : (y % 2 ? 2 : 1)) : 3);
        }
        for (let x = 8; x <= 23; x++) set(x, 9 + H0, 3);
        for (let y = 0; y <= 3; y++) for (let x = 14; x <= 17; x++) if ((x - 16) ** 2 + (y - 1.5) ** 2 < 3.6) set(x, y + H0, ((x - 16) ** 2 + (y - 1.5) ** 2 < 1.4) ? 0 : 3);
      } else if (hat === 'Crown') sprite(['.3..3..3.', '303303303', '300000003', '302030203', '300000003', '333333333'], 11, 2 + H0);
      else if (hat === 'Flower') {
        const fx = tilt > 0 ? EX[1] + 2 : EX[0] - 3, fy = 5 + H0;
        for (const [ddx, ddy] of [[0, -2], [-2, 0], [2, 0], [0, 2], [-1, -1], [1, -1], [-1, 1], [1, 1]]) set(fx + ddx, fy + ddy, ddx && ddy ? 3 : 0);
        set(fx + 0, fy - 1, 0); set(fx - 1, fy, 0); set(fx + 1, fy, 0); set(fx, fy + 1, 0);
        set(fx, fy, 2);
      } else if (hat === 'Straw Hat') sprite(['......33333333......', '.....3011111103.....', '.....3222222223.....', '.333311111111113333.', '31111111111111111113', '.333333333333333333.'], 6, 1 + H0);
      else if (hat === 'Party Hat') sprite(['...00...', '...33...', '..3113..', '..3223..', '.311113.', '.322223.', '33333333'], 12, H0);
      else if (hat === 'Bucket Hat') sprite(['....33333333....', '...3111111113...', '...3111111113...', '..322222222223..', '.31111111111113.', '3333333333333333'], 8, 2 + H0);
      else if (hat === 'Acorn Cap') sprite(['....33....', '...3223...', '.32121213.', '3212121213', '3333333333'], 11, 3 + H0);
      else if (hat === 'Halo') { const hb = Math.sin(t * 1.6) > 0 ? 1 : 0; sprite(['..111111..', '.1......1.', '..111111..'], 11, H0 + 1 - hb); }
      else if (hat === 'Tiny Frog') {
        const hop = (t % 3.1) < 0.25 ? 1 : 0;
        sprite(['.333..333.', '.303..303.', '3111111113', '3133333313', '.31111113.', '..333333..'], 11, 1 + H0 - hop);
        if ((t + 0.7) % 2.7 < 0.15) { set(13, 2 + H0 - hop, 3); set(18, 2 + H0 - hop, 3); }
      } else if (hat === 'Sprout') {
        const sway = Math.sin(t * 1.1) > 0.4 ? 1 : 0;
        sprite(sway ? ['.22..22', '..2..2.', '...33..', '...3...'] : ['22..22', '.2..2.', '..33..', '..3...'], 13, 4 + H0);
        sprite(['3', '3', '3'], 15, 8 + H0);
      }
      // eyes
      const look = eyes === 'Googly' ? Math.round(Math.sin(t * 2.3)) : eyes === 'Side-Eye' ? tilt : 0;
      Z = 2;
      // the axolotl's little beady eyes, wide apart on the head
      if (axo) for (const ex of EX) {
        const l = Math.round(ex - 1.5);
        if (blink) { set(l, EY, 3); set(l + 1, EY, 3); set(l + 2, EY, 3); } else { sprite(['333', '333', '333'], l, EY - 1); set(l, EY - 1, 0); }
      }
      // the idol's cut gemstones: they never blink, and they kindle when watched
      if (idol) for (const ex of EX) {
        // a cut gem set in a dark socket: a bright diamond, its lower facet in shadow
        const lit = gaze > 0.5 || Math.sin(t * 0.8 + ex) > 0.97, R = ER - 1.3;
        for (let y = Math.floor(EY - ER); y <= EY + ER; y++) for (let x = Math.floor(ex - ER); x <= ex + ER; x++) {
          const ddx = x + 0.5 - ex, ddy = y + 0.5 - EY;
          if (ddx * ddx + ddy * ddy > (ER - 0.6) ** 2) continue;
          if (Math.abs(ddx) + Math.abs(ddy) > R) { set(x, y, 3); continue; }
          set(x, y, lit || !(ddx > 0.4 && ddy > 0.4) ? 0 : 1);
        }
        if (lit) { const r = Math.round(ER) + (Math.floor(t * 4) % 2); set(ex, EY - r, 0); set(ex, EY + r, 0); set(ex - r, EY, 0); set(ex + r, EY, 0); }
      }
      if (!axo && !idol) for (const ex of EX) {
        const ey = EY, isL = ex < hx;
        for (let y = Math.floor(ey - eyeR - 1); y <= ey + eyeR + 1; y++) for (let x = Math.floor(ex - eyeR - 1); x <= ex + eyeR + 1; x++) {
          if (Math.hypot(x + 0.5 - ex, y + 0.5 - ey) < eyeR) set(x, y, 0);
        }
        const l = Math.floor(ex - 0.5), top = Math.round(ey - 2.5);
        const shut = blink || (eyes === 'Wink' && !isL);
        if (shut && eyes !== 'Happy') {
          for (let x = l - 2; x <= l + 3; x++) for (let y = top - 1; y <= top + 4; y++) if (get(x, y) === 0) set(x, y, y === top + 2 ? 3 : 1);
        } else if (eyes === 'Round' || eyes === 'Wink') { for (let y = top + 1; y < top + 4; y++) for (let x = l; x < l + 2; x++) set(x, y, 3); set(l + 1, top + 1, 0); }
        else if (eyes === 'Slit') { for (let x = l - 1; x <= l + 2; x++) { set(x, top + 2, 3); set(x, top + 3, 3); } }
        else if (eyes === 'Sleepy') {
          for (let x = l - 2; x <= l + 3; x++) for (let y = top - 1; y <= top + 1; y++) if (get(x, y) === 0) set(x, y, 1);
          for (let x = l - 1; x <= l + 2; x++) set(x, top + 2, 3);
          set(l, top + 3, 3); set(l + 1, top + 3, 3);
        } else if (eyes === 'Tiny') { set(l, top + 2, 3); set(l + 1, top + 2, 3); }
        else if (eyes === 'Happy') {
          for (let x = l - 2; x <= l + 3; x++) for (let y = top - 1; y <= top + 4; y++) if (get(x, y) === 0) set(x, y, 1);
          set(l - 1, top + 2, 3); set(l, top + 1, 3); set(l + 1, top + 1, 3); set(l + 2, top + 2, 3);
        } else if (eyes === 'Starry') {
          set(l, top + 1, 3); set(l + 1, top + 1, 3); set(l - 1, top + 2, 3); set(l + 2, top + 2, 3); set(l, top + 3, 3); set(l + 1, top + 3, 3);
          set(l, top + 2, 2); set(l + 1, top + 2, 2);
        } else if (eyes === 'Heart') sprite(['33.33', '33333', '.333.', '..3..'], l - 1, top + 1);
        else if (eyes === 'Dizzy') sprite(Math.floor(t * 2) % 2 ? ['333', '3.3', '..3'] : ['3..', '3.3', '333'], l - 1 + (isL ? 0 : 1), top + 1);
        else if (eyes === 'Sparkle') { sprite(['.33.', '3333', '3333', '.33.'], l - 1, top); set(l - 1 + 1, top + 1, 0); set(l + 1, top + 2, 0); }
        else if (eyes === 'Side-Eye' || eyes === 'Googly') {
          const o = look * (eyes === 'Googly' ? 1 : 1.5);
          for (let y = top + 1; y < top + 4; y++) for (let x = l; x < l + 2; x++) set(x + o, y + (eyes === 'Googly' ? Math.round(Math.cos(t * 2.3 + (isL ? 0 : 1))) * 0.5 : 0), 3);
          if (eyes === 'Side-Eye') for (let x = l - 2; x <= l + 3; x++) if (get(x, top - 1) === 0) set(x, top - 1, 1);
        } else if (eyes === 'Teary') {
          for (let y = top + 1; y < top + 4; y++) for (let x = l; x < l + 2; x++) set(x, y, 3);
          set(l + 1, top + 1, 0);
          const k = (t * 0.8 + (isL ? 0 : 0.5)) % 1.4;
          if (k < 1) set(isL ? l - 2 : l + 3, top + 4 + Math.floor(k * 4), 0);
        }
      }
      // nostrils and mouth
      if (!axo) { set(13, 17 + dy, 3); set(18, 17 + dy, 3); }
      Z = 6;
      const mL = 16 - wide, mR = 15 + wide;
      if (mouth === 'Smile' || mouth === 'Tongue' || mouth === 'Fly Snack' || mouth === 'Blep' || mouth === 'Grin') {
        for (let x = mL; x <= mR; x++) set(x, my, 3);
        set(mL - 1, my - 1, 3); set(mR + 1, my - 1, 3);
        if (mouth === 'Grin') { set(mL - 1, my - 2, 3); set(mR + 1, my - 2, 3); for (let x = mL + 2; x <= mR - 2; x++) set(x, my + 1, 3); for (let x = mL + 1; x <= mR - 1; x++) if (get(x, my + 1) !== 3) set(x, my + 1, 0); }
      } else if (mouth === 'Flat') for (let x = mL + 1; x <= mR - 1; x++) set(x, my, 3);
      else if (mouth === 'Pout') { set(15, my, 3); set(16, my, 3); set(14, my + 1, 3); set(17, my + 1, 3); set(15, my + 2, 3); set(16, my + 2, 3); set(15, my + 1, 2); set(16, my + 1, 2); }
      else if (mouth === 'Whistle') sprite(['.33.', '3003', '.33.'], 14, my - 1);
      else if (mouth === 'Gulp') { for (let x = 14; x <= 17; x++) set(x, my, 3); for (const s of [-1, 1]) sprite(['00', '00'], 15.5 + s * (wide - 1) - 0.5, my - 2); }
      else if (mouth === 'Bubble Gum') {
        for (let x = 13; x <= 18; x++) set(x, my, 3);
        const g = (t * 0.5) % 2;
        if (g < 1.6) { const r = 0.8 + g * 1.6; for (let y = Math.floor(my + 1 - r); y <= my + 1 + r; y++) for (let x = Math.floor(16 - r); x <= 16 + r; x++) { const dd = Math.hypot(x + 0.5 - 16, y + 0.5 - (my + 1.5)); if (dd < r) set(x, y, dd > r - 1 ? 2 : 0); } }
      }
      if (idol) {
        // a carved mouth slot that glows with the gems
        const lit = gaze > 0.5;
        for (let x = 11; x <= 20; x++) set(x, my, 3);
        for (let x = 12; x <= 19; x++) set(x, my + 1, 3);
        if (lit) { for (let x = 12; x <= 19; x++) set(x, my, 0); for (let x = 13; x <= 18; x++) set(x, my + 1, 1); }
      }
      if (mouth === 'Tongue') {
        for (let y = my + 1; y <= my + 3; y++) for (let x = 14; x <= 17; x++) set(x, y, (x === 14 || x === 17 || y === my + 3) ? 3 : 2);
        set(14, my + 3, 1); set(17, my + 3, 1);
        set(15, my + 1, 1);
      }
      if (mouth === 'Blep') { const bx = tilt > 0 ? 18 : 12; sprite(['22', '32'], bx, my + 1); }
      if (mouth === 'Fly Snack') {
        const reach = 4 + Math.round(Math.sin(t * 1.3) * 0.6);
        const sx = tilt > 0 ? mR + 1 : mL - 1;
        for (let i = 1; i <= reach; i++) { set(sx + tilt * i, my - 1 - Math.floor(i / 2), 2); }
        const fx = sx + tilt * (reach + 1), fy = my - 2 - Math.floor(reach / 2);
        set(fx, fy, 3); set(fx + tilt, fy, 3); set(fx, fy - 1, 0); set(fx + tilt, fy - 1, 0); set(fx - tilt, fy - 2, 3);
      }
      // face things
      Z = 3;
      const eyeTop = Math.round(EY - 2.5);
      if (face === 'Glasses' || face === 'Monocle') {
        for (const ex of face === 'Glasses' ? EX : [EX[1]]) for (let y = Math.floor(EY - eyeR - 2); y <= EY + eyeR + 2; y++) for (let x = Math.floor(ex - eyeR - 2); x <= ex + eyeR + 2; x++) {
          const r = Math.hypot(x + 0.5 - ex, y + 0.5 - EY);
          if (r >= eyeR && r < eyeR + 1) set(x, y, 3);
        }
        if (face === 'Glasses') for (let x = Math.ceil(EX[0] + eyeR); x < EX[1] - eyeR; x++) set(x, Math.round(EY), 3);
        else for (let k = 0; k < 6; k++) set(EX[1] + eyeR + (k > 2 ? 1 : 0), EY + eyeR + k, k % 2 ? 2 : 3);
      } else if (face === 'Shades') {
        for (const ex of EX) for (let y = eyeTop; y <= eyeTop + 3; y++) for (let x = Math.floor(ex - eyeR); x <= ex + eyeR; x++) if (Math.hypot(x + 0.5 - ex, y + 0.5 - EY) < eyeR + 0.6) set(x, y, 3);
        for (let x = Math.ceil(EX[0] + eyeR); x < EX[1] - eyeR; x++) set(x, eyeTop + 1, 3);
        for (const ex of EX) { set(ex - 2, eyeTop + 1, 1); set(ex - 1, eyeTop + 1, 0); }
      } else if (face === 'Blush') for (const s of [-1, 1]) { set(hx - 0.5 + s * (wide - 0.5), my - 1, 2); set(hx - 0.5 + s * (wide + 0.5), my - 2, 2); set(hx - 0.5 + s * (wide - 1.5), my - 2, 2); }
      else if (face === 'Band-Aid') sprite(['3003', '0220', '3003'], 14, eyeTop + 2);
      else if (face === 'Flower Clip') sprite(['.0.', '020', '.0.'], EX[0] - eyeR - 1.5, EY + eyeR - 1);
      // mid-croak: the throat sac blown up into a big round bubble under the chin
      if (pose === 'Croaking') {
        Z = 1;
        const cx2 = hx, cy2 = my + 4.6 + puff * 0.4, rx2 = 6.4 + puff * 0.8, ry2 = 4.2 + puff * 0.4;
        for (let y = Math.floor(cy2 - ry2 - 1); y <= cy2 + ry2 + 1; y++) for (let x = Math.floor(cx2 - rx2 - 1); x <= cx2 + rx2 + 1; x++) {
          if (!inE(x, y, cx2, cy2, rx2, ry2)) continue;
          const inner = inE(x, y, cx2, cy2, rx2 - 1, ry2 - 1);
          const shine = inE(x, y, cx2 - 2.4, cy2 - 1.4, 1.6, 1);
          set(x, y, !inner ? 3 : shine ? 0 : (y + 0.5 > cy2 + ry2 * 0.45 ? 1 : pale ? 1 : 0));
        }
      }
      // neckwear
      const ny = 26 + dy + (pose === 'Croaking' ? 2 : 0);
      if (neck === 'Bandana') {
        for (let y = ny; y < 32; y++) for (let x = 8; x < 24; x++) {
          const k = y - ny;
          if (Math.abs(x + 0.5 - 16) <= 7.5 - k * 1.4) set(x, y, Math.abs(x + 0.5 - 16) > 6.5 - k * 1.4 || y === ny ? 3 : ((x + y) % 4 === 0 ? 0 : 2));
        }
      } else if (neck === 'Bowtie') {
        const rows = ['##....##', '###..###', '###oo###', '###..###', '##....##'];
        rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '#') set(12 + i, ny + j, (i === 0 || i === 7 || j === 0 || j === 4) ? 3 : 2); else if (ch === 'o') set(12 + i, ny + j, 3); }));
      } else if (neck === 'Scarf') {
        for (let y = ny - 1; y <= ny + 2; y++) for (let x = 4; x <= 27; x++) if (mask[y * G + x]) set(x, y, y === ny - 1 || y === ny + 2 ? 3 : (Math.floor(x / 3) % 2 ? 2 : 0));
        for (let y = ny + 2; y < 32; y++) { set(20, y, 3); set(21, y, 2); set(22, y, 2); set(23, y, 3); }
      } else if (neck === 'Pearls') {
        for (let x = 8; x <= 23; x += 2) { const y = ny + Math.round(2.2 * Math.sin(Math.PI * (x - 8) / 15)); set(x, y, 0); set(x + 1, y, 3); }
      } else if (neck === 'Bell') {
        for (let x = 9; x <= 22; x++) set(x, ny + Math.round(1.2 * Math.sin(Math.PI * (x - 9) / 13)), 3);
        const sw = Math.sin(t * 2.2) > 0.6 ? 1 : 0;
        sprite(['.33.', '3003', '3003', '3333', '.3' + (sw ? '.' : '3') + '.'], 14 + sw * 0, ny + 2);
      } else if (neck === 'Lei') {
        for (let x = 7; x <= 24; x += 3) { const y = ny + Math.round(2.4 * Math.sin(Math.PI * (x - 7) / 17)); sprite((x / 3) % 2 ? ['00', '02'] : ['22', '20'], x, y); }
      } else if (neck === 'Medal') {
        for (let k = 0; k < 3; k++) { set(13 + k, ny + k, 2); set(18 - k, ny + k, 2); }
        sprite(['.33.', '3003', '3003', '.33.'], 14, ny + 3);
        if ((t * 0.6) % 1 < 0.12) set(15, ny + 4, 1);
      } else if (neck === 'Necktie') {
        sprite(['3333', '3223', '.33.', '.32.', '3223', '3123', '3223', '.33.'], 14, ny);
      } else if (neck === 'Daisy Chain') {
        for (let x = 8; x <= 23; x += 4) { const y = ny + Math.round(2.2 * Math.sin(Math.PI * (x - 8) / 15)); sprite(['.0.', '020', '.0.'], x - 1, y - 1); }
      }
      // tongue out: the frog leans away from the fly, giving its tongue the room to reach it
      if (pose === 'Tongue Out') {
        const dxl = -3 * side;
        tmpPx.set(px); tmpZ.set(zone); tmpM.set(mask);
        for (let i = 0; i < G * G; i++) { const z = tmpZ[i]; if (z && z !== 4 && z !== 5) { px[i] = bgPx[i]; zone[i] = bgZ[i]; } mask[i] = 0; }
        for (let i = 0; i < G * G; i++) {
          const X = i % G + dxl, z = tmpZ[i];
          if (X < 0 || X >= G) continue;
          if (z && z !== 4 && z !== 5) { px[i + dxl] = tmpPx[i]; zone[i + dxl] = z; }
          if (tmpM[i]) mask[i + dxl] = tmpM[i];
        }
      }
      // sitting on a rock: a dark boulder, lit along its top, the front feet planted on it, the front feet planted on it
      if (pose === 'On a Rock') {
        Z = 0;
        for (let y = 22; y < G; y++) for (let x = 0; x < G; x++) {
          const bump = Math.sin(x * 0.9 + 1.3) * 0.4 + Math.sin(x * 0.5) * 0.4;
          if (!inE(x, y - bump, 16, 32.6, 12.6, 7.6)) continue;
          const inner = inE(x, y - bump - 1, 16, 32.6, 12.6, 7.6) && inE(x, y - bump, 16, 32.6, 11.6, 7.6);
          const top = !inE(x, y - bump - 2.2, 16, 32.6, 12.6, 7.6);
          const crack = (x === 9 && y > 28) || (x === 10 && y === 28) || (x === 22 && y > 29) || (x === 21 && y === 29);
          set(x, y, !inner ? 3 : top ? ((x + 0.5 - 16) < 4 ? 1 : 2) : crack ? 2 : (x * 3 + y * 5) % 11 === 0 ? 2 : 3);
        }
        Z = 1;
        for (const s of [-1, 1]) sprite(s < 0 ? ['.33..', '3113.', '31113', '3.3.3'] : ['..33.', '.3113', '31113', '3.3.3'], hx + s * 5 - (s < 0 ? 3 : 2), 23);
      }
      // the pond comes up over the frog: a waterline that laps, ripples below it
      if (water !== 'Dry') {
        const wl = water === 'Peeking' ? 16 + dy : pose === 'On a Rock' ? 29 : pose === 'Chin on Hands' ? 26 : 25;
        for (let x = 0; x < G; x++) {
          const top = wl + Math.round(Math.sin(x * 0.55 + t * 1.6) * 0.6);
          for (let y = top; y < G; y++) {
            // darker than any skin, with calm dashes of light drifting along each third row
            let v = 2;
            if (y === top) v = 0;
            else if (y === top + 1) v = 3;
            else if ((y - top) % 3 === 0 && ((x + y * 5 + Math.floor(t * (1 + (y % 2)))) % 9) < 2) v = 1;
            px[y * G + x] = v;
            zone[y * G + x] = 4;
          }
        }
        // the ring of ripple round the body at the waterline
        const ring = Math.floor(t * 1.5) % 3;
        Z = 4;
        for (let x = 0; x < G; x++) { const ddx = Math.abs(x + 0.5 - 16); if (ddx > 9 + ring * 2 && ddx < 10.5 + ring * 2) set(x, wl - 1 + (water === 'Peeking' ? 0 : 1), 0); }
        Z = 5;
        if (visitor === 'Tadpoles') for (let k = 0; k < 3; k++) {
          const tx = ((t * (1.2 + k * 0.4) * (k % 2 ? 1 : -1) + k * 11) % 36 + 36) % 36 - 2, ty = Math.min(31, wl + 3 + k * 2);
          const dir = k % 2 ? 1 : -1, wag = Math.floor(t * 6 + k) % 2;
          set(tx, ty, 3); set(tx + dir, ty, 3); set(tx - dir, ty, 1); set(tx - 2 * dir, ty + (wag ? -1 : 0), 1);
        }
      }
      // chin on hands: lying on a lily pad, elbows down on it, both hands propping up the chin
      if (pose === 'Chin on Hands') {
        Z = 1;
        for (let y = 25; y < G; y++) for (let x = 0; x < G; x++) {
          if (!inE(x, y, 16, 31.4, 16.4, 4.6)) continue;
          const inner = inE(x, y, 16, 31.6, 15.4, 3.6);
          const vein = Math.abs((x + 0.5 - 16) * 0.42 - (y + 0.5 - 31)) < 0.5 || Math.abs((x + 0.5 - 16) * -0.42 - (y + 0.5 - 31)) < 0.5;
          set(x, y, !inner ? 3 : vein ? 2 : 1);
        }
        Z = 1;
        // two short thick forearms in the frog's own skin, elbows on the pad, hands cupped under the chin
        const jaw = hy + B.ry;
        for (const s of [-1, 1]) {
          // the forearm first, then the hand over it, so its outline draws the wrist
          const arm = new Set(), hand = new Set();
          stroke(arm, hx + s * 5.6, 28.6, hx + s * 5, jaw, 1.3);
          stroke(hand, hx + s * 6.2, jaw - 1.2, hx + s * 3.2, jaw - 1.2, 1.1);
          let top = G;
          for (const cells of [arm, hand]) {
            solid(cells, 1);
            for (const i of cells) { const x = i % G, y = Math.floor(i / G); set(x, y, pale ? ((x + y) % 2 ? 0 : 1) : 1); }
          }
          for (const i of hand) top = Math.min(top, Math.floor(i / G));
          // the fingers: two ink creases into the top of each hand
          for (const k of [0, 1]) set(hx - 0.5 + s * (3.5 + k * 2), top, 3);
        }
      }
      // tongue out after a fly: a long tongue curling out past the cheek to a fly up in the corner
      if (pose === 'Tongue Out') {
        Z = 6;
        const wob = Math.sin(t * 1.4) * 0.8;
        const ox = (side > 0 ? mR : mL) - 3 * side, oy = my, tx = side > 0 ? 28.5 : 2.5, ty = 8 + wob, cx2 = side > 0 ? 31 : 0, cy2 = my + 3;
        for (let k = 0; k <= 40; k++) {
          const u = k / 40, x = (1 - u) ** 2 * ox + 2 * u * (1 - u) * cx2 + u * u * tx, y = (1 - u) ** 2 * oy + 2 * u * (1 - u) * cy2 + u * u * ty;
          set(x - 0.5, y - 0.5, 3);
          if (u > 0.15 && u < 0.85) set(x - 0.5 - side, y - 0.5, 2);
        }
        sprite(['.22.', '2222', '.22.'], Math.round(tx - 2), Math.round(ty - 1.5));
        // the fly, stuck to the tip, buzzing its wings
        const fx = Math.round(tx - 0.5), fy = Math.round(ty - 0.5), flap = Math.floor(t * 12) % 2;
        set(fx, fy - 1, 3); set(fx + 1, fy - 1, 3); set(fx, fy - 2, 3);
        set(fx - 1, fy - 2 - flap, 0); set(fx + 2, fy - 2 - flap, 0); set(fx - 1, fy - 3 + flap, 3); set(fx + 2, fy - 3 + flap, 3);
      }
      // a small visitor resting on the far shoulder, or flying about
      Z = 5;
      if ((visitor === 'Snail' || visitor === 'Ladybird') && water === 'Dry') {
        const rows = visitor === 'Snail'
          ? ['..333..3.', '.30003.3.', '3002203..', '3020203.0', '333333333']
          : ['.3...3.', '..333..', '.30303.', '3333333', '.30303.', '..333..'];
        const vx = 5, vy = visitor === 'Snail' ? 27 : 26;
        rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') set(vx + i, vy + j, +ch); }));
      } else if (visitor === 'Dragonfly' || visitor === 'Butterfly' || visitor === 'Moth') {
        const vx = (tilt > 0 ? 3 : 25) + Math.round(Math.sin(t * 0.45) * 2.5), vy = 3 + Math.round(Math.sin(t * 0.8) * 1.5) + (hat === 'None' ? 0 : 0);
        const flap = Math.floor(t * (visitor === 'Dragonfly' ? 12 : 5)) % 2;
        if (visitor === 'Dragonfly') {
          // two pairs of wings in a mid shade with an ink edge, a long tail and a 2-cell head facing the frog,
          // the wings beating up and down; on a night sky the ink turns pale so it still shows
          const ink = pond === 'Stars' || pond === 'Moon' || pond === 'Fireflies' ? '0' : '3';
          let rows = flap ? ['.33.33..', '3113113.', '33333333', '......3.'] : ['......3.', '33333333', '3113113.', '.33.33..'];
          rows = rows.map(r => (tilt > 0 ? r : [...r].reverse().join('')).replace(/3/g, ink));
          sprite(rows, Math.max(0, Math.min(G - 8, vx - 3)), vy - (flap ? 2 : 1));
        }
        else if (visitor === 'Butterfly') sprite(flap ? ['22.22', '20302', '.2.2.'] : ['.2.2.', '.232.', '..3..'], vx - 2, vy);
        else sprite(flap ? ['11.11', '.131.', '.1.1.'] : ['.1.1.', '.131.', '..3..'], vx - 2, vy);
      }
      extras(t);
      // the fly the viewer brings, and the tongue that catches it
      Z = 6;
      if (tongue) {
        const u = (t - tongue.t0) / 0.42;
        if (u >= 1) tongue = null;
        else {
          const reach = Math.sin(Math.PI * Math.min(1, u));
          const ox = tongue.x < 16 ? mL + 1 : mR - 1, oy = my;
          const ex = ox + (tongue.x - ox) * reach, ey = oy + (tongue.y - oy) * reach;
          const n = Math.ceil(Math.hypot(ex - ox, ey - oy)) + 1;
          for (let i = 0; i <= n; i++) set(ox + (ex - ox) * i / n, oy + (ey - oy) * i / n, 0);
          set(ex, ey, 3); set(ex + 1, ey, 3); set(ex, ey + 1, 3); set(ex + 1, ey + 1, 3);
          if (u > 0.5 && !tongue.caught) {
            tongue.caught = true; gulpUntil = t + 0.7;
            c.sound.hit('blip', 0.35, { freq: 520 });
            c.sound.note(pnote(7), { dur: 0.12, vel: 0.22, wave: 'triangle', at: 0.09 });
          }
        }
      }
      Z = 5;
      if (fly && !(tongue && tongue.caught) && t > gulpUntil - 0.2) {
        const flap = Math.floor(t * 14) % 2, bx = fly.x + Math.sin(t * 9) * 0.6, by = fly.y + Math.cos(t * 7) * 0.5;
        set(bx, by, 3); set(bx + 1, by, 3);
        set(bx - (flap ? 1 : 0), by - 1, 0); set(bx + (flap ? 2 : 1), by - 1, 0);
      }
    }

    function extras(t) {
      if (brolly) {
        // the coveted tiny umbrella, held up from the far shoulder; its ribs turn when it twirls
        Z = 3;
        const ux = 24, top = 1, ph = t < twirlUntil ? Math.floor(t * 10) % 3 : 0;
        if (rainOn) {
          // a little shower, only around the umbrella, dripping off its rim
          Z = 4;
          for (let x = 14; x < G; x++) if (x % 3 === 1 && (x < 17 || x > 31)) for (let k = 0; k < 2; k++) { const y = Math.floor((t * 14 + x * 5 + k * 7) % 14); if (zone[y * G + x] === 0) set(x, y, 1); }
          for (const dx of [-6, 6]) set(ux + dx, top + 6 + Math.floor((t * 6 + dx) % 4), 1);
          Z = 3;
        }
        for (let y = top + 5; y < 28; y++) set(ux, y, 3);
        set(ux - 1, 28, 3); set(ux - 2, 27, 3);
        sprite(['......3......', '....33333....', '..332222233..', '.32222222223.', '3222222222223', '3333333333333'], ux - 6, top);
        for (let r = 2; r <= 4; r++) for (const rx of [-6, -3, 0, 3, 6]) {
          const x = Math.round(ux + (rx + ph - 1) * (r - 0.5) / 4.5);
          if (get(x, top + r) === 2) set(x, top + r, 1);
        }
        set(ux - 3, top + 2, 0); set(ux - 4, top + 3, 0);
      }
      // bubbles the axolotl blows when tapped
      Z = 5;
      for (let i = blows.length - 1; i >= 0; i--) {
        const u = t - blows[i].t0, by = my - 1 - u * 7, bx = hx + Math.sin(u * 5 + i) * 1.2;
        if (by < -2) { blows.splice(i, 1); continue; }
        const r = u < 0.3 ? 0 : 1;
        if (r) { set(bx, by - 1, 1); set(bx - 1, by, 1); set(bx + 1, by, 1); set(bx, by + 1, 1); set(bx - 1, by - 1, 0); }
        else set(bx, by, 1);
      }
      // dust shaken off the idol's wall when it rumbles
      Z = 0;
      for (let i = dust.length - 1; i >= 0; i--) {
        const d = dust[i], y = (t - d.t0) * d.sp * 9;
        if (y > G) { dust.splice(i, 1); continue; }
        set(d.x + Math.round(Math.sin(y * 0.5 + d.x)), y, y % 3 < 1.5 ? 0 : 1);
      }
    }

    // paint: every dot a little square, with the LCD's pale grid between them
    const cell = Math.max(1, Math.floor(S / G)), off = Math.floor((S - cell * G) / 2);
    const gap = cell >= 6 ? Math.max(1, Math.round(cell / 14)) : 0;
    const ctx = c.ctx;
    // a backlit screen glows: its four shades run from a deep glass to bright light
    if (backlit) { const lit = [[18, 34, 52], [40, 120, 150], [120, 220, 230], [235, 255, 250]]; for (let i = 0; i < 4; i++) pal[i] = lit[i]; }
    const css = pal.map(p => `rgb(${p[0]},${p[1]},${p[2]})`);
    const grid = pal[0].map(v => Math.round(v * (backlit ? 0.7 : 0.93)));
    const gridCss = `rgb(${grid[0]},${grid[1]},${grid[2]})`;
    const shown = new Uint16Array(G * G).fill(65535);
    // the axolotl's gills and cheeks: a pink ramp in place of the screen's shades
    const PINK = ['#ffe6ef', '#ffa6c6', '#f2628f', '#a32a5c'];
    let fresh = true, lastShake = 0;
    // the legendary colour screen: every part of the picture gets its own four-colour ramp
    const rgbOf = list => list.map(h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
    const SKINS = [
      skin === 'Dart Frog' ? ['#e0f4ff', '#3aa0ff', '#1a50c0', '#08122a'] : skin === 'Glass Frog' ? ['#eaffe0', '#a8f070', '#5ab040', '#143018'] : skin === 'Pale' ? ['#fff4f0', '#ffc8d0', '#d08a9a', '#3a1a24'] : ['#f2ffd0', '#7ad85a', '#2e8a3e', '#0e2a1a'],
      ['#fff8d0', '#ffd040', '#d08010', '#3a2004'], ['#e0f4ff', '#3aa0ff', '#1a50c0', '#08122a'], ['#ffe8e0', '#ff6a50', '#b02a2a', '#300808'], ['#f8e8ff', '#c08aff', '#7040c0', '#1c0a38'],
    ].map(rgbOf);
    const NIGHT = { Stars: 1, Moon: 1, Fireflies: 1 }, WARM = { Sunset: 1, Rainbow: 1 };
    const ZONES = [
      NIGHT[pond] ? ['#fff6c0', '#6a7ad8', '#2a2e78', '#0c0e2a'] : WARM[pond] ? ['#fff0b0', '#ffa060', '#d0506a', '#3a1a48'] : ['#f4fbe8', '#9ee0d0', '#3a9a7a', '#16384a'],
      null, null, ['#fffaf0', '#ffd040', '#e8403a', '#2a1018'], ['#e8fbff', '#7ad0f0', '#2a6ab0', '#0e2050'], ['#ffffff', '#ffb0d0', '#ff5a3a', '#141018'], ['#ffffff', '#ffb0c0', '#ff5a7a', '#2a0a14'],
    ].map(z => z && rgbOf(z));
    function colourOf(i, cyc) {
      const z = zone[i], v = px[i], sk = SKINS[cyc];
      const c3 = z === 1 ? sk[v] : z === 2 ? (v === 1 ? sk[1] : v === 2 ? [232, 160, 32] : v === 0 ? [255, 255, 255] : [16, 16, 24]) : ZONES[z][v];
      let k = 0;
      if (glare) { const d = Math.abs((i % G) + 0.5 - glare[0] + Math.floor(i / G) + 0.5 - glare[1]); k = d < 1.6 ? 0.45 : d < 3.2 ? 0.2 : 0; }
      return k ? [c3[0] + (255 - c3[0]) * k, c3[1] + (255 - c3[1]) * k, c3[2] + (255 - c3[2]) * k] : c3;
    }
    function paint(t) {
      const shake = t < rumbleUntil ? (Math.floor(t * 24) % 2 ? cell : -cell) : 0;
      if (shake !== lastShake) { fresh = true; lastShake = shake; }
      const cyc = colour && t < cycleUntil ? 1 + Math.floor((cycleUntil - t) * 7) % 4 : 0;
      if (fresh) { ctx.fillStyle = colour ? '#0a0c10' : gridCss; ctx.fillRect(0, 0, S, S); }
      for (let i = 0; i < G * G; i++) {
        let code = px[i];
        if (colour) {
          let gl = 0;
          if (glare) { const d = Math.abs((i % G) + 0.5 - glare[0] + Math.floor(i / G) + 0.5 - glare[1]); gl = d < 1.6 ? 2 : d < 3.2 ? 1 : 0; }
          code = px[i] + zone[i] * 4 + gl * 32 + cyc * 128;
        } else if (zone[i] === 7) code += 8;
        if (!fresh && shown[i] === code) continue;
        shown[i] = code;
        if (colour) { const q = colourOf(i, cyc); ctx.fillStyle = `rgb(${q[0] | 0},${q[1] | 0},${q[2] | 0})`; } else ctx.fillStyle = code >= 8 ? PINK[px[i]] : css[px[i]];
        ctx.fillRect(off + shake + (i % G) * cell + gap, off + Math.floor(i / G) * cell + gap, cell - gap, cell - gap);
      }
      fresh = false;
    }
    function feel(t) {
      const inp = c.input;
      fly = inp.inside ? { x: inp.x * G - 0.5, y: inp.y * G - 0.5 } : null;
      // hovering: the axolotl fluffs its gills, the idol's gems kindle, the colour screen catches a glare,
      // and over the umbrella a little rain starts to patter
      const hgx = Math.floor(inp.x * G), hgy = Math.floor(inp.y * G);
      const over = inp.inside && hgx >= 0 && hgy >= 0 && hgx < G && hgy < G && mask[hgy * G + hgx] !== 0;
      if (axo) {
        if (over && fluff < 0.1) c.sound.note(pnote(7), { dur: 0.3, vel: 0.1, wave: 'sine', attack: 0.04 });
        fluff += ((over ? 1 : 0) - fluff) * 0.15;
      }
      if (idol) {
        const near = inp.inside && Math.min(Math.hypot(inp.x * G - EX[0], inp.y * G - EY), Math.hypot(inp.x * G - EX[1], inp.y * G - EY)) < 7;
        if (near && gaze < 0.1) { c.sound.note(pnote(0) - 12, { dur: 1.4, vel: 0.12, wave: 'triangle', attack: 0.3, cutoff: 600 }); c.sound.note(pnote(4), { dur: 1.2, vel: 0.05, wave: 'sine', attack: 0.4 }); }
        gaze += ((near ? 1 : 0) - gaze) * 0.2;
      }
      if (colour) glare = inp.inside ? [inp.x * G, inp.y * G] : null;
      if (brolly) {
        rainOn = inp.inside && inp.x > 0.45 && inp.y < 0.5;
        if (rainOn && t - lastPlink > 0.32) { lastPlink = t; c.sound.note(pnote(10 + Math.floor(t * 7) % 5), { dur: 0.15, vel: 0.06, wave: 'sine', pan: 0.4 }); }
      }
      for (const p of inp.taps()) {
        const gx = Math.floor(p.x * G), gy = Math.floor(p.y * G);
        const onFrog = gx >= 0 && gy >= 0 && gx < G && gy < G && mask[gy * G + gx] !== 0;
        if (brolly && gx >= 17 && gx <= 31 && gy >= 0 && gy <= 7) {
          // a twirl of the umbrella, a little run of notes
          if (t > twirlUntil - 0.3) [5, 7, 9, 12].forEach((k, i) => c.sound.note(pnote(k), { dur: 0.12, vel: 0.12, wave: 'triangle', at: i * 0.07 }));
          twirlUntil = t + 1;
          continue;
        }
        if (idol && gy >= 10) {
          // the idol stirs: the screen shakes, dust sifts down, a deep stone note
          if (t < rumbleUntil - 0.2) continue;
          rumbleUntil = t + 0.6;
          for (let k = 0; k < 10; k++) dust.push({ x: Math.floor(xo() * G), t0: t + xo() * 0.4, sp: 0.6 + xo() * 0.8 });
          c.sound.note(pnote(0) - 12, { dur: 1.2, vel: 0.3, wave: 'triangle', cutoff: 500 });
          c.sound.note(pnote(-3) - 12, { dur: 1.4, vel: 0.18, wave: 'triangle', cutoff: 400, at: 0.18 });
          c.sound.hit('noise', 0.12, { cutoff: 380, dur: 0.6 });
          continue;
        }
        if (axo && onFrog) {
          // a bubble, and a bloop that rises with it
          if (t - lastCroak < 0.25) continue;
          lastCroak = t; blinkUntil = t + 0.18;
          blows.push({ t0: t });
          c.sound.note(pnote(5), { dur: 0.1, vel: 0.2, wave: 'sine' });
          c.sound.note(pnote(9), { dur: 0.16, vel: 0.16, wave: 'sine', at: 0.08 });
          c.sound.note(pnote(12), { dur: 0.22, vel: 0.1, wave: 'sine', at: 0.5 });
          continue;
        }
        if (colour && onFrog && t > cycleUntil) {
          // the colour screen shows off: the frog runs through its palettes to a power-on chime
          cycleUntil = t + 1.25;
          [0, 4, 7, 12, 16].forEach((k, i) => c.sound.note(pnote(0) + 12 + k, { dur: 0.12, vel: 0.1, wave: 'square', cutoff: 2200, at: 0.25 + i * 0.08 }));
        }
        if (onFrog || tongue) {
          if (t - lastCroak < 0.25) continue;
          lastCroak = t; blinkUntil = t + 0.18; gulpUntil = t + 0.5;
          // rib-bit: two soft reedy notes
          const k = Math.floor(xs() * 3);
          c.sound.note(pnote(k), { dur: 0.08, vel: 0.32, wave: 'square', cutoff: 700 });
          c.sound.note(pnote(k + 2), { dur: 0.14, vel: 0.3, wave: 'square', cutoff: 800, at: 0.13 });
        } else if (gy < 10 && drops.length < 6) {
          // a raindrop out of the sky: a high plink, and a lower one where it lands
          drops.push({ x: gx, y: gy, t0: t });
          c.sound.note(pnote(10 + (gx % 5)), { dur: 0.25, vel: 0.14, wave: 'sine' });
          c.sound.note(pnote(5 + (gx % 5)), { dur: 0.35, vel: 0.12, wave: 'sine', at: 0.6 });
        } else {
          tongue = { x: p.x * G - 0.5, y: p.y * G - 0.5, t0: t, caught: false };
          c.sound.hit('click', 0.3);
        }
      }
    }
    function frame(t) {
      feel(t);
      draw(t);
      paint(t);
    }
    frame(0);
    return t => frame(t);
  },
});

})(window.Proto);
