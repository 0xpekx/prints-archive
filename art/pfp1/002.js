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
    // the legendaries drawn as 1/1 pictures of their own (legendPond, below); every other frog is drawn as before.
    // A type left out of this list falls back to the older drawing further down.
    const ONE_OF_ONE = ['Full Colour', 'Axolotl', 'Stone Idol'];
    if (ONE_OF_ONE.includes(leg)) return legendPond();

    // ---------- the legendaries: each its own full-colour 1/1 on the same 32-dot screen ----------
    function legendPond() {
      const cel = Math.max(1, Math.floor(S / G)), of = Math.floor((S - cel * G) / 2);
      const gp = cel >= 6 ? Math.max(1, Math.round(cel / 14)) : 0;
      const g = c.ctx;
      const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      const th = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
      const hv = (x, y, k) => { let h = Math.imul(x + 97, 0x9e3779b1) ^ Math.imul(y + 61, 0x85ebca6b) ^ Math.imul(k + 7, 0xc2b2ae35); h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 13; return (h >>> 0) / 4294967296; };
      // a few draws of its own for the small things that vary, from the legendary stream
      const lv = [];
      for (let i = 0; i < 24; i++) lv.push(xo());
      const buf = new Array(G * G).fill('#000'), shownL = new Array(G * G).fill('');
      const put = (x, y, col) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < G && y < G) buf[y * G + x] = col; };
      const at = (x, y) => (x >= 0 && y >= 0 && x < G && y < G) ? buf[y * G + x] : null;
      const inE = (x, y, cx, cy, rx, ry) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
      const GAP = leg === 'Stone Idol' ? '#0c0a08' : '#06080c';
      let shake = 0, lastShake = 0, fresh = true;
      g.fillStyle = GAP; g.fillRect(0, 0, S, S);
      const paintL = () => {
        if (shake !== lastShake) { fresh = true; lastShake = shake; g.fillStyle = GAP; g.fillRect(0, 0, S, S); }
        for (let i = 0; i < G * G; i++) {
          if (!fresh && shownL[i] === buf[i]) continue;
          shownL[i] = buf[i];
          g.fillStyle = buf[i];
          g.fillRect(of + shake * cel + (i % G) * cel + gp, of + Math.floor(i / G) * cel + gp, cel - gp, cel - gp);
        }
        fresh = false;
      };
      const tapsNow = () => c.input.taps().map(p => [Math.floor((p.x * S - of) / cel), Math.floor((p.y * S - of) / cel)]);
      // the pointer in dots (only the large view has one; tiles get a still one that is never inside)
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
      let croakAt = -3; // the first croak comes a moment in
      const scene = leg === 'Full Colour' ? colourScene() : leg === 'Axolotl' ? axolotlScene() : idolScene();
      const frameL = t => { scene.feel(t); scene.draw(t); paintL(); };
      frameL(0);
      return frameL;

      // ----- Full Colour: the one screen in colour, and it shows off: a jewel of a frog on a lily pad at sunset.
      // In the large view the pointer is a fly: buzz too close and the tongue comes for you -----
      function colourScene() {
        // the frog's kind follows its skin
        const KINDS = {
          'Dart Frog': { body: ['#06103a', '#1446b8', '#2f8cff', '#9ad8ff'], legs: null, belly: '#2f8cff', mark: 'spots', markCol: '#05060e', eye: 'black' },
          Striped: { body: ['#3a2a04', '#e0a810', '#ffd830', '#fff4a0'], legs: null, belly: '#ffd830', mark: 'bands', markCol: '#0a0806', eye: 'black' },
          Banded: { body: ['#3a2a04', '#e0a810', '#ffd830', '#fff4a0'], legs: null, belly: '#ffd830', mark: 'bands', markCol: '#0a0806', eye: 'black' },
          Spotted: { body: ['#3a0606', '#c01818', '#ff3a2a', '#ffa08a'], legs: ['#081a4a', '#1a48b0', '#3a7aff', '#a0c8ff'], belly: '#ff5a3a', mark: 'freckles', markCol: '#1a0404', eye: 'black' },
          Freckled: { body: ['#3a0606', '#c01818', '#ff3a2a', '#ffa08a'], legs: ['#081a4a', '#1a48b0', '#3a7aff', '#a0c8ff'], belly: '#ff5a3a', mark: 'freckles', markCol: '#1a0404', eye: 'black' },
          'Two-Tone': { body: ['#04281a', '#10a060', '#3ae890', '#b0ffd8'], legs: null, belly: '#3ae890', mark: 'marble', markCol: '#020806', eye: 'black' },
          'Glass Frog': { body: ['#1a3a10', '#70c030', '#b0f060', '#eaffc0'], legs: null, belly: '#e8ffe0', mark: 'heart', markCol: '#e0304a', eye: 'gold' },
          Pale: { body: ['#5a3a48', '#e0b0c0', '#ffd8e4', '#fff6fa'], legs: null, belly: '#fff6fa', mark: 'none', markCol: '#000', eye: 'black' },
        };
        const K = KINDS[skin] || { body: ['#0a3010', '#28a030', '#5ae040', '#c0ff90'], legs: null, belly: '#f0f8d0', mark: 'sides', markCol: '#2a6aff', eye: 'red' };
        const LEGS = K.legs || K.body;
        const OUT = '#08040c';
        const SKY = ['#1e0c40', '#3a1458', '#6a2068', '#b03a62', '#ff7a40', '#ffc060'];
        const sunX = lv[0] < 0.5 ? 26 : 5, sunY = 5;
        // the frog's shape: 1 head, 2 body, 3 legs, 4 eye bulge, 5 belly
        const frog = (x, y) => {
          if (inE(x, y, 11.2, 11.6, 2.8, 2.8) || inE(x, y, 20.8, 11.6, 2.8, 2.8)) return 4;
          if (inE(x, y, 16, 15.6, 7.8, 4.4)) return 1;
          if (inE(x, y, 16, 22.2, 3.6, 3)) return 5;
          if (inE(x, y, 16, 21, 6.6, 4.6)) return 2;
          if (inE(x, y, 9.6, 22.6, 3.4, 3) || inE(x, y, 22.4, 22.6, 3.4, 3)) return 3;
          if ((x === 11 || x === 12 || x === 19 || x === 20) && y >= 19 && y <= 25) return 3;
          if (y === 26 && (x === 10 || x === 12 || x === 13 || x === 18 || x === 19 || x === 21)) return 3;
          if (y === 25 && ((x >= 4 && x <= 8) || (x >= 23 && x <= 27))) return 3;
          if (y === 24 && (x === 4 || x === 27)) return 3;
          return 0;
        };
        const FROG = new Uint8Array(G * G);
        for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) FROG[y * G + x] = frog(x, y);
        const spots = [];
        // a few big marks, placed once, well apart
        const BIG = [[9, 18], [21, 19], [14, 14], [18, 13], [12, 21], [19, 22], [16, 19]];
        for (let i = 0; i < 9; i++) spots.push([7 + Math.floor(hv(i, 1, 3) * 18), 13 + Math.floor(hv(i, 2, 3) * 10)]);
        let tongue = null, nextSnap = 5 + lv[1] * 3, flyGone = -1, aim = 0, lastT = 0, gulps = 0, gulpUntil = -1, sulkUntil = -1;
        const ripples = [], trail = [];
        let lastTrail = -1, plusAt = -9;
        // where the fly is: the pointer, when there is one, or a fly of its own circling
        const flyAt = t => { const p = ptr(); return p.in ? [Math.floor(p.x), Math.floor(p.y), true] : [22 + Math.round(Math.cos(t * 2.1) * 5), 6 + Math.round(Math.sin(t * 3.3) * 2), false]; };
        return {
          feel: t => {
            const dt = Math.max(0, Math.min(0.1, t - lastT)); lastT = t;
            const [fx, fy, you] = flyAt(t);
            for (const [x, y] of pressNow(t).click) {
              if (x < 0 || y < 0 || x >= G || y >= G || FROG[y * G + x] || y < 15) continue;
              // a plink on the pond: rings spread and rock the pad
              if (ripples.length < 4) ripples.push({ x, y, t0: t });
              c.sound.note(pnote(10 + (x % 5)), { dur: 0.3, vel: 0.12, wave: 'sine' });
            }
            // a fly hanging about in front of its face: it fixes on it, and the tongue comes
            const d = Math.hypot(fx - 16, fy - 17);
            if (you && t > flyGone && !tongue && d < 12 && t > gulpUntil) {
              aim += dt;
              if (aim > 0.45) { tongue = { x: fx, y: fy, t0: t, you: true }; aim = 0; c.sound.hit('click', 0.3); }
            } else aim = Math.max(0, aim - dt);
            if (!you && !tongue && t > nextSnap) { tongue = { x: fx, y: fy, t0: t }; nextSnap = t + 7 + lv[3] * 4; }
            if (tongue && tongue.you && !tongue.done && t - tongue.t0 > 0.22) {
              tongue.done = true;
              // did it get you?
              if (Math.hypot(fx - tongue.x, fy - tongue.y) < 2.2) {
                gulps = Math.min(6, gulps + 1); gulpUntil = t + 1.1; flyGone = t + 1.4; croakAt = t + 0.5; plusAt = t;
                c.sound.note(pnote(0), { dur: 0.1, vel: 0.3, wave: 'square', cutoff: 700, at: 0.15 }); c.sound.note(pnote(-3), { dur: 0.25, vel: 0.26, wave: 'square', cutoff: 600, at: 0.3 });
              } else { sulkUntil = t + 1; c.sound.note(pnote(2), { dur: 0.08, vel: 0.14, wave: 'square', cutoff: 700, at: 0.2 }); }
            }
            if (tongue && !tongue.you && t - tongue.t0 > 0.22 && !tongue.done) { tongue.done = true; flyGone = t + 2; }
            if (tongue && t - tongue.t0 > 0.45) tongue = null;
            for (let i = ripples.length - 1; i >= 0; i--) if (t - ripples[i].t0 > 1.6) ripples.splice(i, 1);
            if (t - lastTrail > 0.07) { lastTrail = t; trail.unshift([fx, fy]); trail.length = Math.min(trail.length, 3); }
          },
          draw: t => {
            const st = Math.floor(t * 4), p = ptr();
            // the sky and its sun, low jungle at the sides, the water with a broken road of sunlight across it
            for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
              let col;
              if (y < 15) {
                const k = Math.min(5, Math.max(0, Math.floor(y / 2.7 + th(x, y) * 0.7 - 0.2)));
                col = SKY[k];
                if (inE(x, y, sunX + 0.5, sunY + 0.5, 3.2, 3.2)) col = inE(x, y, sunX, sunY, 2.2, 2.2) ? '#fff6c0' : '#ffd070';
                const edge = Math.min(x, 31 - x), h = 14 - Math.max(0, Math.round(5 - edge * 0.7 + Math.sin(x * 1.7 + lv[2] * 6) * 0.9));
                if (y >= h) col = y === h ? '#2a1438' : '#180a26';
              } else {
                col = y < 18 ? '#34184a' : y < 22 ? '#1e1a44' : '#121436';
                const road = Math.abs(x + 0.5 - sunX - 0.5 - Math.sin(y * 1.3 + t * 3) * 0.8) < 1.8 - (y - 15) * 0.05;
                if (road && (x + y + st) % 4 === 0) col = y < 20 ? '#ffd060' : '#ff8a3a';
                for (const r of ripples) { const rr = (t - r.t0) * 7, dd = Math.hypot(x + 0.5 - r.x - 0.5, (y + 0.5 - r.y - 0.5) * 2.2); if (Math.abs(dd - rr) < 0.6 && rr < 11) col = rr < 6 ? '#c8a8f0' : '#6a5a9a'; }
              }
              put(x, y, col);
            }
            // a lily pad under the frog with its notch, rocked by the ripples; a small one with a lotus on it
            const rock = ripples.some(r => { const rr = (t - r.t0) * 7; return Math.abs(Math.hypot(16 - r.x, (27 - r.y) * 2.2) - rr) < 4; }) ? 1 : 0;
            for (let y = 23; y < G; y++) for (let x = 0; x < G; x++) {
              const Y = y - rock;
              if (inE(x, Y, 16, 27.6, 13.6, 3.8) && !(Math.abs(x + 0.5 - 16) < (Y - 27) * 1.2 && Y > 27)) put(x, y, Y === 24 || !inE(x, Y - 1, 16, 27.6, 13.6, 3.8) ? '#7ad850' : Y > 29 ? '#1e5a1e' : (x + Y) % 5 === 0 ? '#58b840' : '#3a9a32');
            }
            for (let y = 18; y < 24; y++) for (let x = 0; x < 8; x++) if (inE(x, y, 3, 21.5, 3.4, 1.5)) put(x, y, y === 20 ? '#7ad850' : '#3a9a32');
            [[2, 17, '#ffc0dc'], [3, 16, '#ffc0dc'], [1, 18, '#ff7ab0'], [2, 18, '#ffe070'], [3, 18, '#ffe070'], [4, 18, '#ff7ab0'], [3, 17, '#ff9ac4'], [4, 17, '#ffc0dc'], [1, 19, '#e0508a'], [2, 19, '#ff7ab0'], [3, 19, '#ff7ab0'], [4, 19, '#e0508a'], [5, 19, '#ff9ac4'], [0, 19, '#ff9ac4']].forEach(([x, y, col]) => put(x, y, col));
            // the frog, riding the pad
            const blink = ((t + 1.7) % 3.9) < 0.14 || t < gulpUntil, sulk = t < sulkUntil;
            const cph = ((t - croakAt) % 4.6 + 4.6) % 4.6, croak = cph < 1.1 ? Math.sin(cph / 1.1 * Math.PI) : 0;
            const F = (x, y) => (x >= 0 && y >= 0 && x < G && y < G) ? FROG[y * G + x] : 0;
            for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
              const Y = y - rock, k = F(x, Y);
              if (!k) {
                if (F(x - 1, Y) || F(x + 1, Y) || F(x, Y - 1) || F(x, Y + 1)) put(x, y, OUT);
                continue;
              }
              const R = k === 3 ? LEGS : K.body;
              // flat: a highlight along its top edge, its body colour, a shadow along the bottom and the far side
              let s = 2;
              if (!F(x, Y - 1) || (k === 1 && Y < 13 && Math.abs(x - 16) < 5)) s = 3;
              if (!F(x, Y + 1) || (k !== 4 && !F(x + (sunX > 16 ? -1 : 1), Y))) s = 1;
              let col = R[s];
              if (k === 5) col = K.belly;
              if (K.mark === 'spots' && k !== 4 && k !== 5 && BIG.some(([a, b]) => (x === a || x === a + 1) && (Y === b || Y === b + 1))) col = K.markCol;
              if (K.mark === 'bands' && k !== 4 && k !== 5 && (Y === 14 || Y === 19 || Y === 23) && s > 1) col = K.markCol;
              if (K.mark === 'freckles' && k !== 3 && k !== 4 && k !== 5 && BIG.some(([a, b]) => x === a && Y === b)) col = K.markCol;
              if (K.mark === 'marble' && k !== 4 && k !== 5 && BIG.slice(0, 3).some(([a, b]) => Math.abs(x - a) + Math.abs(Y - b) < 2)) col = K.markCol;
              if (K.mark === 'sides' && k === 2 && (x < 11 || x > 20) && Y % 2) col = Y % 4 === 1 ? K.markCol : '#ffe040';
              if (K.mark === 'sides' && k === 3 && Y >= 24) col = '#ff7a20';
              put(x, y, col);
            }
            if (K.mark === 'heart') { put(16, 22 + rock, K.markCol); put(15, 21 + rock, '#ff8aa0'); }
            // the eyes follow the fly; shut tight and happy after a catch, narrowed after a miss
            const [fx, fy, you] = flyAt(t);
            const lx = Math.max(-1, Math.min(1, Math.round((fx - 16) / 6))), ly = fy < 9 ? -1 : fy > 16 ? 1 : 0;
            for (const ex of [11, 20]) {
              const R0 = rock;
              if (blink) { put(ex - 1, 12 + R0, OUT); put(ex, 11 + R0, OUT); put(ex + 1, 11 + R0, OUT); put(ex + 2, 12 + R0, OUT); continue; }
              const WH = K.eye === 'red' ? '#ff3a1a' : K.eye === 'gold' ? '#ffd040' : '#ffffff';
              for (let yy = 9; yy <= 13; yy++) for (let xx = ex - 1; xx <= ex + 2; xx++) if (!((yy === 9 || yy === 13) && (xx === ex - 1 || xx === ex + 2))) put(xx, yy + R0, WH);
              // the pupil, looking towards the fly
              const px = ex + (lx < 0 ? -1 : lx > 0 ? 1 : 0), py = ly > 0 ? 11 : ly < 0 ? 9 : 10;
              for (const [a, b] of [[0, 0], [1, 0], [0, 1], [1, 1]]) put(px + a, py + b + R0, '#050308');
              put(px + (lx > 0 ? 0 : 1), py + R0, '#ffffff');
              if (sulk) for (let q = -1; q <= 2; q++) { put(ex + q, 9 + R0, K.body[1]); put(ex + q, 10 + R0, K.body[1]); }
            }
            // its wide smile, cheeks full after a gulp, and the throat sac swelling under it
            if (tongue) { for (let y = 16; y <= 19; y++) for (let x = 11; x <= 20; x++) if (!(y === 19 && (x < 13 || x > 18))) put(x, y + rock, y === 16 ? OUT : '#5a0a1a'); }
            else for (let x = 10; x <= 21; x++) put(x, (x === 10 || x === 21 ? 16 : 17) + rock, OUT);
            if (t < gulpUntil) for (const cx of [9, 22]) { put(cx, 15 + rock, K.body[3]); put(cx, 16 + rock, K.body[3]); }
            if (croak > 0.05) for (let y = 17; y < 23; y++) for (let x = 10; x < 22; x++) if (inE(x, y - rock, 16, 19.2, 2 + croak * 3, 1 + croak * 1.8) && y - rock > 17) put(x, y, y - rock < 19 ? '#fff4f0' : '#f0d8e0');
            // the tongue
            if (tongue) {
              const u = (t - tongue.t0) / 0.45, r = u < 0.5 ? u * 2 : (1 - u) * 2, sx = 15.5, sy = 17 + rock;
              const ex2 = sx + (tongue.x - sx) * r, ey2 = sy + (tongue.y - sy) * r, n = Math.max(2, Math.ceil(Math.hypot(ex2 - sx, ey2 - sy) * 2));
              for (const [w, col] of [[1, '#5a0a2a'], [0, '#ffb0c8']]) for (let k = 0; k <= n; k++) {
                const x = sx + (ex2 - sx) * k / n, y = sy + (ey2 - sy) * k / n;
                for (const [a, b] of w ? [[-1, 0], [2, 0], [0, -1], [1, -1], [0, 2], [1, 2]] : [[0, 0], [1, 0], [0, 1], [1, 1]]) put(x + a, y + b, col);
              }
              put(ex2, ey2, '#ff6a90'); put(ex2 + 1, ey2, '#ff6a90'); put(ex2, ey2 + 1, '#ff6a90'); put(ex2 + 1, ey2 + 1, '#ff6a90');
            }
            // the fly: you, buzzing, or its own; gone for a moment once eaten
            if (t > flyGone && !(tongue && tongue.done && !you)) {
              // a buzz trail behind you
              if (you) trail.forEach(([a, b], i) => { if (i && (a !== fx || b !== fy)) put(a, b, i === 1 ? '#8a90b0' : '#4a4a6a'); });
              put(fx, fy, '#0a0a0e'); put(fx, fy + 1, '#2a2a30');
              if (st % 2 || you) { put(fx - 1, fy - 1 + (Math.floor(t * 20) % 2), '#d0e8ff'); put(fx + 1, fy - 1 + (Math.floor(t * 20) % 2), '#d0e8ff'); }
            }
            if (you && aim > 0.15 && t > flyGone) { put(fx, fy - 3, '#ff4040'); put(fx, fy - 2, '#ff4040'); }
            // a +1 rising from its mouth for a catch
            if (t - plusAt < 0.9) { const py = Math.round(13 - (t - plusAt) * 6), PL = ['.#..#', '###.#', '.#..#']; PL.forEach((row, r) => { for (let q = 0; q < 5; q++) if (row[q] === '#') put(14 + q, py + r, '#ffffff'); }); }
            // the flies it has caught, kept in a row in the corner
            for (let i = 0; i < gulps; i++) { const cx = sunX > 16 ? 1 + i * 4 : 28 - i * 4; put(cx, 1, '#d0e8ff'); put(cx + 2, 1, '#d0e8ff'); put(cx + 1, 2, '#0a0a0e'); put(cx + 1, 1, '#0a0a0e'); }
            // a dragonfly hovering over the water, wings flickering
            const dx = (sunX > 16 ? 5 : 20) + (Math.floor(t * 0.5) % 3), dyy = 4 + (Math.floor(t * 0.7) % 2);
            for (let q = 0; q < 5; q++) put(dx + q, dyy, q === 0 ? '#2ad0ff' : q < 2 ? '#1a7ad0' : '#2a50a0');
            if (st % 2) { put(dx + 1, dyy - 1, '#c8f0ff'); put(dx + 2, dyy - 1, '#c8f0ff'); put(dx + 1, dyy + 1, '#a0d0f0'); put(dx + 2, dyy + 1, '#a0d0f0'); }
            else { put(dx, dyy - 1, '#c8f0ff'); put(dx + 1, dyy - 2, '#c8f0ff'); put(dx, dyy + 1, '#a0d0f0'); put(dx + 1, dyy + 2, '#a0d0f0'); }
          },
        };
      }

      // ----- Axolotl: an axolotl smiling in its tank, gills waving, light rippling down through the water.
      // Tap the water to drop in a worm: it swims over and gulps it; feed it three and it's in love -----
      function axolotlScene() {
        const wild = skin === 'Wild';
        const SKIN = wild ? ['#1a2410', '#3e5424', '#6a8236', '#a8b860'] : ['#a04a6a', '#f08aa8', '#ffc0d4', '#fff0f4'];
        const GILL = wild ? ['#2a0a2a', '#7a2a6a', '#c060a8'] : ['#8a0a3a', '#e0306a', '#ff7aa0'];
        const OUT = wild ? '#100c08' : '#3a0a24';
        const WATER = ['#0a3a4a', '#0e5060', '#147080', '#2a98a0'];
        const bubbles = [];
        for (let i = 0; i < 7; i++) bubbles.push([2 + Math.floor(hv(i, 4, 1) * 28), hv(i, 5, 1) * 40, 0.6 + hv(i, 6, 1)]);
        const plants = [[2, 18, 0], [5, 23, 1.3], [27, 17, 2.1], [30, 21, 0.7]];
        let fluff = 0, ox = 0, oy = 0, lastT = 0, eaten = 0, gulpAt = -9, loveAt = -9;
        const worms = [];
        // the body: 1 head, 2 body and tail, 3 legs
        const body = (x, y) => {
          if (inE(x, y, 16, 15.2, 8.6, 5.6)) return 1;
          if (inE(x, y, 16, 21.5, 5.4, 4.2)) return 2;
          if (y >= 23 && y <= 27 && x >= 18 && x <= 28 && Math.abs(y - (25 - (x - 18) * 0.25 + Math.sin(x * 0.7) * 0.6)) < 1.3 - (x - 18) * 0.07) return 2;
          if ((inE(x, y, 9.6, 21.6, 1.6, 2.6) || inE(x, y, 22.4, 21.6, 1.6, 2.6))) return 3;
          if (y === 24 && (x === 8 || x === 10 || x === 21 || x === 23)) return 3;
          return 0;
        };
        return {
          feel: t => {
            const dt = Math.max(0, Math.min(0.1, t - lastT)); lastT = t;
            const p = ptr(), over = p.in && Math.abs(p.x - 16 - ox) < 11 && p.y > 6 && p.y < 26;
            if (over && fluff < 0.1) c.sound.note(pnote(7), { dur: 0.3, vel: 0.1, wave: 'sine', attack: 0.04 });
            fluff += ((over ? 1 : 0) - fluff) * 0.15;
            for (const [x, y] of tapsNow()) {
              if (x < 0 || y < 0 || x >= G || y >= 27 || worms.length > 3) continue;
              // a bloodworm plops in and wriggles down
              worms.push({ x: Math.max(10, Math.min(22, x)), y: Math.min(y, 4), t0: t });
              c.sound.note(pnote(10), { dur: 0.08, vel: 0.12, wave: 'sine' }); c.sound.note(pnote(5), { dur: 0.2, vel: 0.1, wave: 'sine', at: 0.06 });
            }
            for (const w of worms) w.y = Math.min(25, w.y + dt * 3.2);
            // it swims after the first worm, mouth first
            const w0 = worms[0];
            const tx = w0 ? Math.max(-6, Math.min(6, w0.x - 16)) : Math.sin(t * 0.4) * 1.5, ty = w0 ? Math.max(-6, Math.min(4, w0.y - 17)) : 0;
            ox += (tx - ox) * Math.min(1, dt * 2.6); oy += (ty - oy) * Math.min(1, dt * 2.2);
            if (w0 && Math.abs(w0.x - 16 - ox) < 2 && Math.abs(w0.y - 17 - oy) < 2) {
              worms.shift(); gulpAt = t; eaten++;
              c.sound.note(pnote(5), { dur: 0.1, vel: 0.2, wave: 'sine' }); c.sound.note(pnote(9), { dur: 0.16, vel: 0.16, wave: 'sine', at: 0.08 });
              if (eaten >= 3) { eaten = 0; loveAt = t; [0, 4, 7, 12].forEach((k, i) => c.sound.note(pnote(k + 5), { dur: 0.4, vel: 0.1, wave: 'sine', at: 0.2 + i * 0.12 })); }
            }
          },
          draw: t => {
            const love = t - loveAt < 2.6, gulp = t - gulpAt < 0.5;
            const bob = love ? (Math.floor(t * 8) % 2) : Math.round(Math.sin(t * 1.1)) > 0 ? 1 : 0;
            const X = Math.round(ox), Y = Math.round(oy) + bob;
            // the tank: deep water, light rays shifting down from the surface, sand and pebbles
            for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
              let k = y < 6 ? 3 : y < 14 ? 2 : y < 22 ? 1 : 0;
              if (th(x, y) < ((y % 8) / 8) * 0.9 && k > 0 && y < 24) k--;
              const ray = Math.sin((x + y * 0.45) * 0.55 - t * 0.8) + Math.sin((x - y * 0.2) * 0.31 + t * 0.5);
              if (ray > 1.45 && y < 26) k = Math.min(3, k + 1);
              let col = WATER[k];
              if (y === 0 && (x + Math.floor(t * 4)) % 4 < 2) col = '#a0e8e8';
              if (y >= 28 || (y === 27 && (x * 7) % 5 < 3)) col = (x * 3 + y * 5) % 7 === 0 ? '#b89060' : (x + y) % 3 ? '#e0c890' : '#c8a870';
              put(x, y, col);
            }
            [[4, 27, '#6a7a8a'], [5, 27, '#8a9aa8'], [25, 27, '#7a6a5a'], [12, 28, '#5a6a7a'], [26, 27, '#5a4a3a']].forEach(([x, y, col]) => put(x, y, col));
            for (const [px0, top, ph] of plants) for (let y = top; y < 28; y++) {
              const sw = Math.round(Math.sin(t * 1.2 + ph + y * 0.35) * (28 - y) * 0.09);
              put(px0 + sw, y, y % 3 ? '#2a9a4a' : '#5ad070');
              if (y % 3 === 1) put(px0 + sw + (y % 6 === 1 ? 1 : -1), y, '#1e7a3a');
            }
            // the worms wriggling down
            for (const w of worms) { const wy = Math.round(w.y), wg = Math.floor(t * 6 + w.x) % 2; put(w.x, wy, '#c0182a'); put(w.x + (wg ? 1 : -1), wy - 1, '#e03040'); put(w.x + (wg ? -1 : 1), wy + 1, '#8a0a1a'); }
            // the axolotl
            const B = (x, y) => body(x - X, y - Y);
            for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
              const k = B(x, y);
              if (!k) { if (B(x - 1, y) || B(x + 1, y) || B(x, y - 1) || B(x, y + 1)) put(x, y, OUT); continue; }
              const yy = y - Y, xx = x - X;
              let s = yy < 13 ? 3 : yy < 17 ? 2 : 1;
              if (k === 1 && yy > 18.5) s = 1;
              if (k === 2 && inE(xx, yy, 16, 22.2, 3, 2.4)) s = 3;
              if (k === 3) s = 2;
              let col = SKIN[s];
              if (wild && hv(xx, yy, 2) < 0.2) col = hv(xx, yy, 3) < 0.45 ? '#f0d860' : '#0e1408';
              put(x, y, col);
            }
            // gills: three feathery stalks a side, thick at the root, waving (flared right out when it's happy)
            const fl2 = love ? 1.4 : fluff, wave = Math.sin(t * (love ? 6 : 2.4)) * (0.6 + fl2 * 0.6);
            for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) {
              const ang = (-0.55 + k * 0.55) + wave * 0.12 * (k - 1 || 1), len = 5.4 + fl2 * 1.3 - Math.abs(k - 1) * 0.6;
              const bx = 16 + X + sd * 7.4, by = 11.6 + k * 2.2 + Y;
              for (let s = 0; s < len; s += 0.5) {
                const xx = bx + sd * Math.cos(ang) * s, yy = by + Math.sin(ang) * s - s * 0.35;
                put(xx, yy, GILL[0]);
                if (s < len * 0.5) put(xx, yy + 1, GILL[0]);
                if (Math.round(s * 2) % 2 === 0 && s > 1) { put(xx + sd * 0.4, yy - 1, GILL[(Math.floor(s + t * 3) % 2) + 1]); put(xx - sd * 0.2, yy + 1.4, GILL[2]); }
              }
            }
            // the face: beady eyes, a long smile (an O when it gulps), cheeks
            const blink = ((t + 1.2) % 5.1) < 0.12;
            for (const ex of [10, 20]) {
              if (blink || love) { put(ex + X, 14 + Y, OUT); put(ex + 1 + X, 14 + Y, OUT); if (love) { put(ex + X, 13 + Y, OUT); } continue; }
              const lk = worms.length && worms[0].x > 16 + ox ? 1 : 0;
              put(ex + X + lk, 13 + Y, '#ffffff'); put(ex + 1 + X - lk, 13 + Y, '#0a0408'); put(ex + X, 14 + Y, '#0a0408'); put(ex + 1 + X, 14 + Y, '#0a0408');
            }
            if (gulp) { for (const [a, b] of [[15, 16], [16, 16], [14, 17], [17, 17], [15, 18], [16, 18]]) put(a + X, b + Y, OUT); put(15 + X, 17 + Y, '#6a0a2a'); put(16 + X, 17 + Y, '#6a0a2a'); }
            else for (let x = 11; x <= 20; x++) put(x + X, (x === 11 || x === 20 ? 16 : 17) + Y, OUT);
            if (!wild || love || gulp) { put(9 + X, 17 + Y, '#ff7a9a'); put(22 + X, 17 + Y, '#ff7a9a'); if (gulp) { put(8 + X, 17 + Y, '#ff9ab0'); put(23 + X, 17 + Y, '#ff9ab0'); } }
            // bubbles rising, and hearts when it's been fed enough
            for (const b of bubbles) {
              const yy = Math.floor(G + 2 - ((b[1] + t * b[2] * 3) % (G + 6))), xx = b[0] + Math.round(Math.sin(t * 1.4 + b[1]) * 0.6);
              put(xx, yy, '#c8fff8');
            }
            if (love) for (let i = 0; i < 4; i++) {
              const u = (t - loveAt) * 0.6 + i * 0.25, hx = 16 + X + Math.round(Math.sin(i * 2.1 + t * 2) * 6), hy = Math.round(10 + Y - u * 12);
              for (const [a, b] of [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1], [1, 2]]) put(hx + a - 1, hy + b, i % 2 ? '#ff4a7a' : '#ff8aa8');
            }
          },
        };
      }

      // ----- Stone Idol: a frog god carved in stone on its temple steps, gem eyes burning, torches either side.
      // Press and hold on it: the glyph on its belly kindles cell by cell, and when it is full the idol wakes -----
      function idolScene() {
        const GEMS = [['#20ff9a', '#0a8a50', '#c0ffe0'], ['#ff3a4a', '#9a0a1a', '#ffc0c0'], ['#3a8aff', '#0a3aa0', '#c0e0ff'], ['#ffc020', '#a06008', '#fff0b0']];
        const GEM = GEMS[Math.floor(lv[4] * 4)];
        // carved from sandstone, or jade, or dark basalt veined with gold
        const STONE = [['#1c120c', '#3e2a1c', '#6a4a30', '#9a7046', '#c89a62', '#f0c88a'], ['#06140e', '#0e3424', '#1a5a3a', '#2e8a56', '#56b878', '#9ae8a8'],
          ['#0c0c12', '#26262f', '#3e3e4c', '#5c5c6c', '#888698', '#b8b6c6']][lv[5] < 0.5 ? 0 : lv[5] < 0.8 ? 1 : 2];
        const INLAY = lv[5] >= 0.8 ? '#e8c060' : null; // the basalt idol's carving is inlaid with gold
        const WALL = ['#07060a', '#110e14', '#1a161e', '#262028', '#3a2e2a'];
        const MOSS = ['#2a4a1a', '#4a7a2a', '#7aaa3a'];
        const motes = [];
        for (let i = 0; i < 6; i++) motes.push([hv(i, 1, 9), hv(i, 2, 9)]);
        const dust = [];
        let rumbleUntil = -1, gaze = 0, charge = 0, awakeAt = -9, lastT = 0, awake = false, sleepAt = -9;
        // awake for at least AWAKE seconds, and for as long as you keep holding; then it settles back slowly
        const AWAKE = 3.6, SETTLE = 1.4;
        const level = t => !awake ? 0 : sleepAt > 0 ? Math.max(0, 1 - (t - sleepAt) / SETTLE) : Math.min(1, (t - awakeAt) * 3);
        // the belly glyph, lit cell by cell from the centre outwards as it charges
        const GLYPH = [[16, 19], [16, 20], [15, 21], [14, 21], [13, 20], [13, 19], [14, 18], [15, 18], [16, 18], [17, 18], [18, 19], [18, 20], [17, 21], [16, 21]];
        // the idol, carved from rounded masses: haunches, body, front legs, head, the two great eye domes;
        // each lit from the upper left as a rounded solid, with a carved groove wherever one mass meets another
        const PARTS = [[9, 19.6, 4.6, 4], [23, 19.6, 4.6, 4], [16, 18.6, 7.2, 5], [11.4, 20.6, 2.2, 3.2], [20.6, 20.6, 2.2, 3.2], [16, 12.6, 9.6, 5], [10.5, 8.2, 3.4, 3.3], [21.5, 8.2, 3.4, 3.3]];
        const L = [-0.36, -0.66, 0.66];
        const PART = new Int8Array(G * G), SH = new Int8Array(G * G), TOP = new Uint8Array(G * G);
        for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
          const i = y * G + x;
          if (y >= 23) {
            // the plinth: three steps, lit on each tread
            const px = Math.abs(x + 0.5 - 16), half = y >= 28 ? 14.6 : y >= 25 ? 12.4 : 10.2;
            if (px < half) { PART[i] = 9; SH[i] = y === 23 || y === 25 || y === 28 ? 4 : px > half - 1 ? 1 : 2; }
            continue;
          }
          PARTS.forEach(([cx, cy, rx, ry], k) => {
            const nx = (x + 0.5 - cx) / rx, ny = (y + 0.5 - cy) / ry, d = nx * nx + ny * ny;
            if (d > 1) return;
            const nz = Math.sqrt(1 - d), b = nx * L[0] + ny * L[1] + nz * L[2];
            PART[i] = k + 1; SH[i] = Math.max(1, Math.min(5, Math.round(2.3 + b * 3))); TOP[i] = ny < -0.55 ? 1 : 0;
          });
          if (y === 22 && [9, 11, 13, 18, 20, 22].includes(x)) { PART[i] = 4; SH[i] = 2; } // the toes
        }
        const P = (x, y) => (x >= 0 && y >= 0 && x < G && y < G) ? PART[y * G + x] : 0;
        const torches = [[3, 12], [28, 12]];
        // each dot's distance to the nearer torch, worked out once
        const TD = new Float32Array(G * G);
        for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) TD[y * G + x] = Math.min(Math.hypot(x - 3, (y - 12) * 0.8), Math.hypot(x - 28, (y - 12) * 0.8));
        return {
          feel: t => {
            const dt = Math.max(0, Math.min(0.1, t - lastT)); lastT = t;
            const p = ptr(), near = p.in && p.y < 14 && Math.abs(p.x - 16) < 10;
            if (near && gaze < 0.1) { c.sound.note(pnote(0) - 12, { dur: 1.4, vel: 0.12, wave: 'triangle', attack: 0.3, cutoff: 600 }); c.sound.note(pnote(4), { dur: 1.2, vel: 0.05, wave: 'sine', attack: 0.4 }); }
            gaze += ((near ? 1 : 0) - gaze) * 0.2;
            for (const [x, y] of pressNow(t).click) {
              if (x < 0 || y < 0 || x >= G || y >= G || t < rumbleUntil - 0.2 || awake) continue;
              // a touch: the idol stirs, dust sifts down, a deep stone note
              rumbleUntil = t + 0.4;
              for (let k = 0; k < 6; k++) dust.push({ x: Math.floor(hv(k, Math.floor(t * 10), 4) * G), t0: t + hv(k, 3, 4) * 0.4, sp: 0.6 + hv(k, 5, 4) * 0.8 });
              c.sound.note(pnote(0) - 12, { dur: 1.2, vel: 0.24, wave: 'triangle', cutoff: 500 });
            }
            // held down on the idol, the glyph charges; let go and it fades back
            const holding = p.down && !awake && P(Math.floor(p.x), Math.floor(p.y));
            const was = charge;
            charge = Math.max(0, Math.min(1, charge + (holding ? dt / 2.4 : -dt * 0.7)));
            if (holding && Math.floor(charge * GLYPH.length) > Math.floor(was * GLYPH.length)) c.sound.note(pnote(Math.floor(charge * GLYPH.length)), { dur: 0.5, vel: 0.08, wave: 'sine' });
            if (awake && sleepAt < 0 && !p.down && t - awakeAt > AWAKE) sleepAt = t;
            if (awake && sleepAt > 0 && t - sleepAt > SETTLE) { awake = false; sleepAt = -9; }
            if (charge >= 1) {
              // it wakes: a roar of stone, the eyes blaze, the mouth opens, gold pours down the steps
              charge = 0; awakeAt = t; awake = true; sleepAt = -9; rumbleUntil = t + 0.9;
              for (let k = 0; k < 14; k++) dust.push({ x: Math.floor(hv(k, Math.floor(t * 10), 6) * G), t0: t + hv(k, 3, 6) * 0.5, sp: 0.6 + hv(k, 5, 6) * 0.8 });
              c.sound.note(pnote(0) - 24, { dur: 2, vel: 0.35, wave: 'triangle', cutoff: 420 });
              c.sound.hit('noise', 0.2, { cutoff: 380, dur: 1.2 });
              [0, 4, 7, 11, 14].forEach((k, i) => c.sound.note(pnote(k + 5), { dur: 0.9, vel: 0.07, wave: 'sine', at: 0.5 + i * 0.12 }));
            }
          },
          draw: t => {
            const lvl = level(t), aw = lvl > 0 ? 1 : -1;
            shake = t < rumbleUntil || (charge > 0.6 && Math.floor(t * 12) % 3 === 0) ? (Math.floor(t * 24) % 2 ? 1 : -1) : 0;
            const fl = [0.2, 0.9, 0.5, 1, 0.3, 0.7, 0.1, 0.8][Math.floor(t * 9) % 8];
            const glow = 0.5 + 0.5 * Math.sin(t * 1.6) + gaze + (t < rumbleUntil ? 1 : 0) + charge * 1.5 + lvl * 2;
            // the temple wall: big carved blocks, a glyph on every other one, warmed near the torches
            for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
              const row = y >> 2, bx = (x + (row % 2) * 4) >> 3;
              const mortar = y % 4 === 3 || (x + (row % 2) * 4) % 8 === 7;
              let s = mortar ? 0 : 1 + (hv(bx, row, 1) < 0.5 ? 1 : 0);
              const lx = (x + (row % 2) * 4) % 8, ly = y % 4;
              if (!mortar && (bx + row) % 3 === 0 && ly === 1 && lx >= 2 && lx <= 4 && (lx !== 3 || hv(bx, row, 2) < 0.5)) s = 0;
              const warm = TD[y * G + x] < 5 + fl * 1.5 - th(x, y) * 2;
              if (warm && s) s = Math.min(4, s + 2);
              put(x, y, WALL[s]);
            }
            // a shaft of daylight slanting in from above, dust turning in it
            for (let y = 0; y < 22; y++) for (let x = 0; x < G; x++) {
              const d = x - 6 - y * 0.55;
              if (d > 0 && d < 5 && th(x, y) < 0.22) put(x, y, '#3a3440');
            }
            for (const m of motes) {
              const mx = Math.floor(8 + m[0] * 6 + ((t * 0.4 + m[1] * 20) % 12) * 0.55), my = Math.floor((t * 0.4 + m[1] * 20) % 12) + 4;
              put(mx, my, '#fff0c0');
            }
            // the torches in their brackets
            for (const [a, b] of torches) {
              put(a, b + 1, '#4a3420'); put(a, b + 2, '#4a3420'); put(a - 1, b + 2, '#2a1e12'); put(a + 1, b + 2, '#2a1e12');
              // the flames climb as the idol charges, and burn its gem colour once it wakes
              const h = 1 + (fl > 0.6 ? 1 : 0) + Math.round(charge * 3) + (aw >= 0 ? 3 : 0), FL = aw >= 0 ? [GEM[2], GEM[0], GEM[1]] : ['#ffd040', '#ff8020', '#e04010'];
              put(a, b, FL[0]); put(a, b - 1, FL[1]);
              for (let k = 0; k < h; k++) put(a + ((k + Math.floor(t * 9)) % 3 === 0 ? (fl > 0.4 ? 1 : -1) : 0), b - 2 - k, k < h - 1 ? FL[1] : FL[2]);
            }
            // the idol, carved and mossy, warmer on the side a torch flares
            for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
              const i = y * G + x, k = PART[i];
              if (!k) { if (y < 23 && (P(x - 1, y) || P(x + 1, y) || P(x, y - 1) || P(x, y + 1))) put(x, y, STONE[0]); continue; }
              let s = SH[i];
              // a groove wherever one carved mass meets another in front of it
              if (k !== 9 && ((P(x + 1, y) && P(x + 1, y) !== k && P(x + 1, y) > k) || (P(x, y + 1) && P(x, y + 1) !== k && P(x, y + 1) > k) || (P(x - 1, y) > k && P(x - 1, y) !== 9) || (P(x, y - 1) > k && P(x, y - 1) !== 9))) s = 0;
              if (fl > 0.6 && (x < 9 || x > 22) && s > 0 && s < 5) s++;
              if (k !== 9 && s > 0 && s < 5 && (!P(x - 1, y) || !P(x, y - 1))) s++; // a rim of torchlight on its upper edges
              let col = STONE[s];
              if (k !== 9 && s > 0 && TOP[i] && hv(x, y, 7) < 0.45) col = MOSS[hv(x, y, 8) < 0.5 ? 1 : 2];
              if (k === 9 && y === 23 && hv(x, y, 7) < 0.3) col = MOSS[1];
              if (k === 9 && (y === 26 || y === 30) && x % 3 === 1 && s > 1) col = STONE[1];
              put(x, y, col);
            }
            // the carving: a wide grooved mouth, nostrils, a spiral glyph on the belly
            for (let x = 9; x <= 22; x++) put(x, x === 9 || x === 22 ? 14 : 15, INLAY || STONE[0]);
            put(14, 12, STONE[0]); put(17, 12, STONE[0]);
            GLYPH.forEach(([a, b], i) => put(a, b, aw >= 0 ? ((i + Math.floor(t * 12)) % 4 ? GEM[0] : GEM[2]) : i < charge * GLYPH.length ? (i === Math.floor(charge * GLYPH.length) - 1 ? GEM[2] : GEM[0]) : INLAY || STONE[1]));
            if (lvl > 0) {
              // the jaw grinds open in three steps onto a glow inside
              const h2 = lvl < 0.34 ? 1 : lvl < 0.67 ? 2 : 3;
              for (let y = 15; y < 15 + h2 + 1; y++) for (let x = 10; x <= 21; x++) put(x, y, y === 15 + h2 ? STONE[1] : y === 15 ? STONE[0] : (x + y + Math.floor(t * 10)) % 3 ? GEM[1] : GEM[0]);
              for (let x = 10; x <= 21; x += 2) put(x, 15 + h2, STONE[3]);
              // gold pouring out of it in a stream, step by step down the plinth, piling at the foot
              const pour = Math.min(1, lvl * 1.5);
              for (let k = 0; k < 22; k++) {
                const u = (t * 0.8 + k / 22) % 1;
                if (u > pour) continue;
                const y = Math.round(17 + u * 14), st = y >= 28 ? 3 : y >= 25 ? 2 : y >= 22 ? 1 : 0;
                const x = Math.round(15.5 + (k % 2 ? 1 : -1) * (st * 1.6 + (k % 3)));
                put(x, y, (k + Math.floor(t * 10)) % 4 ? '#ffd040' : '#fff4b0'); if (k % 3 === 0) put(x + 1, y, '#c88a10');
              }
              const pile = Math.min(3, Math.floor((t - awakeAt) * 1.1)) * lvl;
              for (let y = 31; y > 31 - pile; y--) for (let x = 0; x < G; x++) if (Math.abs(x + 0.5 - 16) < 4 + (31 - y) * -1 + pile * 2.5) put(x, y, (x * 3 + y + Math.floor(t * 6)) % 7 ? '#e8b030' : '#fff4b0');
              // two straight beams from the eyes, widening as they go, a white core
              for (const [ex, dir] of [[10.5, -1], [21.5, 1]]) {
                const dx = dir * 0.88, dy = -0.48;
                for (let k = 1.5; k < 17 * Math.min(1, lvl * 2); k += 0.5) {
                  const cx = ex + dx * k, cy = 7.5 + dy * k, w = 0.6 + k * 0.13;
                  for (let o = -w; o <= w; o += 0.5) {
                    const x = cx - dy * o, y = cy + dx * o * dir * dir, a = Math.abs(o);
                    put(Math.floor(x), Math.floor(y), a < 0.5 ? '#ffffff' : a < w * 0.6 ? GEM[2] : GEM[0]);
                  }
                }
              }
            }
            // gem eyes set in the domes, burning
            for (const ex of [10, 21]) {
              for (const [a, b] of [[-1, 0], [0, -1], [1, -1], [2, 0], [-1, 1], [2, 1], [0, 2], [1, 2]]) put(ex + a, 7 + b, STONE[0]);
              const hot = glow > 1.2;
              put(ex, 7, hot ? GEM[2] : GEM[0]); put(ex + 1, 7, GEM[0]); put(ex, 8, GEM[1]); put(ex + 1, 8, hot ? GEM[0] : GEM[1]);
              if (glow > 0.8) for (const [a, b] of [[-2, 7], [3, 7], [0, 5], [1, 10]]) if (th(ex + a, b) < glow - 0.8) put(ex + a, b, GEM[1]);
            }
            // offerings: a bowl of fire on the steps, flowers either side
            put(15, 27, '#3a2a18'); put(16, 27, '#3a2a18'); put(14, 26, '#5a4228'); put(17, 26, '#5a4228');
            put(15, 26, fl > 0.5 ? '#ffd040' : '#ff8020'); put(16, 26, fl > 0.5 ? '#ff8020' : '#ffd040'); put(15 + (fl > 0.3 ? 1 : 0), 25, '#e04010'); if (fl > 0.6) put(16, 24, '#ff8020');
            put(7, 24, '#ff5a8a'); put(8, 24, '#ffd040'); put(23, 24, '#ff5a8a'); put(24, 24, '#ffffff');
            // vines hanging over the top
            for (const [vx, len, ph] of [[1, 9, 0], [5, 5, 1.7], [26, 6, 3.1], [30, 11, 0.6]]) for (let y = 0; y < len; y++) {
              const sx = vx + (y > len - 4 && Math.sin(t * 0.9 + ph) > 0.4 ? 1 : 0);
              put(sx, y, MOSS[0]);
              if (y % 3 === 1) put(sx + (y % 6 === 1 ? 1 : -1), y, MOSS[2]);
            }
            // a butterfly or a dragonfly visiting, if one rolled
            if (visitor !== 'None') {
              const vx = 22 + Math.round(Math.sin(t * 0.8) * 3), vy = 4 + Math.round(Math.cos(t * 1.1) * 1.5), up = Math.floor(t * 6) % 2;
              const VC = visitor === 'Dragonfly' ? '#3ad0ff' : visitor === 'Moth' ? '#d8c8a0' : '#ff9a2a';
              put(vx, vy, '#1a1008'); put(vx - 1, vy - up, VC); put(vx + 1, vy - up, VC); if (!up) { put(vx - 1, vy + 1, VC); put(vx + 1, vy + 1, VC); }
            }
            for (let i = dust.length - 1; i >= 0; i--) {
              const d = dust[i], y = (t - d.t0) * d.sp * 9;
              if (y > G) { dust.splice(i, 1); continue; }
              if (y >= 0) put(d.x + Math.round(Math.sin(y * 0.5 + d.x)), y, '#d8c8a0');
            }
          },
        };
      }
    }

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
