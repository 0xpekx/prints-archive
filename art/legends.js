// Drop 02 (PFP.1)'s legendaries, worked out from a print's hash alone (the founder, 2026-10-19: "You should be able to
// pulp pfps immediately"). Each piece rolls its Legendary from a random stream of its own on the hash and names it with
// c.trait('Legendary', type) while it draws (app/art/pfp1/NNN.js); here is only that roll: each piece's own stream,
// seeding, warm-up and draw order up to its legendary, copied from its code exactly, with no canvas. The rules (core.js
// legendRoll) put it on a print the moment it's minted, on the server and on the browser-only copy alike.
//
// Proved against the pieces' own code in headless Chrome (plans/legend-roll.md): 40,000 random hashes a piece, every
// Drop 02 print that exists and every known legendary, with no difference in whether a print is legendary or in its type.
// A change to a piece's roll (never its drawing) must change it here too, and be proved again the same way.
//
// PrintsLegends.pfp1[num](hash) -> the legendary's type ("Crystal Skull"), or null
(function (root) {
  'use strict';
  const pfp1 = {
    // Sheet Spirits: a one-at-a-time hash of the hash text, salt 0x6c65
    1(h) {
      const oat = salt => {
        let x = salt >>> 0;
        for (let i = 2; i < h.length; i++) { x = (x + h.charCodeAt(i)) >>> 0; x = (x + (x << 10)) >>> 0; x ^= x >>> 6; }
        x = (x + (x << 3)) >>> 0; x ^= x >>> 11; x = (x + (x << 15)) >>> 0;
        return x / 4294967296;
      };
      const lr = oat(0x6c65);
      return lr < 0.00075 ? 'Stained Glass' : lr < 0.0015 ? 'Paper Lantern' : lr < 0.0021 ? 'Two Under One' : null;
    },
    // Pond Pocket: xoshiro128** on hash words 1, 3, 5, 7, past 8 warm-up draws
    2(h) {
      const w = i => parseInt(h.substr(2 + i * 8, 8), 16) >>> 0;
      let k0 = (w(1) ^ 0xa3c59ac3) >>> 0, k1 = (w(3) ^ 0x1b873593) >>> 0, k2 = (w(5) ^ 0xcc9e2d51) >>> 0, k3 = (w(7) ^ 0x85ebca6b | 1) >>> 0;
      const rotl = (x, r) => (x << r) | (x >>> (32 - r));
      const xo = () => {
        const r = Math.imul(rotl(Math.imul(k1, 5), 7), 9) >>> 0, t = k1 << 9;
        k2 ^= k0; k3 ^= k1; k1 ^= k2; k0 ^= k3; k2 ^= t; k3 = rotl(k3, 11);
        return r / 4294967296;
      };
      for (let i = 0; i < 8; i++) xo();
      const lg = xo();
      return lg < 0.00083 ? 'Full Colour' : lg < 0.00166 ? 'Axolotl' : lg < 0.00233 ? 'Stone Idol' : null;
    },
    // Sea Rogues: taus88 on three hash words, past 6
    3(h) {
      let u1 = (parseInt(h.slice(2, 10), 16) | 2) >>> 0, u2 = (parseInt(h.slice(26, 34), 16) | 8) >>> 0, u3 = (parseInt(h.slice(50, 58), 16) | 16) >>> 0;
      const taus = () => {
        let b = ((u1 << 13) ^ u1) >>> 19; u1 = (((u1 & 0xfffffffe) << 12) ^ b) >>> 0;
        b = ((u2 << 2) ^ u2) >>> 25; u2 = (((u2 & 0xfffffff8) << 4) ^ b) >>> 0;
        b = ((u3 << 3) ^ u3) >>> 11; u3 = (((u3 & 0xfffffff0) << 17) ^ b) >>> 0;
        return ((u1 ^ u2 ^ u3) >>> 0) / 4294967296;
      };
      for (let i = 0; i < 6; i++) taus();
      const lroll = taus();
      return lroll < 0.0008 ? 'Cursed Gold' : lroll < 0.0016 ? 'Merfolk' : lroll < 0.0022 ? 'Pirate King' : null;
    },
    // Hedge Wizards: xorwow on five hash slices, past 10
    4(h) {
      const slice = (a, k) => (parseInt(h.slice(a, a + 8), 16) ^ k) >>> 0 || k;
      const xw = [slice(2, 0x2545f491), slice(14, 0x9e3779b9), slice(30, 0x7f4a7c15), slice(42, 0x6a09e667), slice(58, 0xbb67ae85)];
      let wd = 6615241;
      const xorwow = () => {
        let q = xw[4];
        const s0 = xw[0];
        xw[4] = xw[3]; xw[3] = xw[2]; xw[2] = xw[1]; xw[1] = s0;
        q ^= q >>> 2; q ^= q << 1; q ^= s0 ^ (s0 << 4);
        xw[0] = q >>> 0; wd = (wd + 362437) >>> 0;
        return ((xw[0] + wd) >>> 0) / 4294967296;
      };
      for (let i = 0; i < 10; i++) xorwow();
      const lroll = xorwow();
      return lroll < 0.0008 ? 'Starweave' : lroll < 0.0016 ? 'Hedge Born' : lroll < 0.0022 ? 'Living Flame' : lroll < 0.003 ? 'Swapped' : null;
    },
    // Cubelings: a murmur-style hash of the hash's eight words, salt 0x4c47
    5(h) {
      const mm = salt => {
        let q = 0x1b873593 ^ salt;
        for (let i = 2; i < 66; i += 8) {
          let w = Math.imul(parseInt(h.slice(i, i + 8), 16) | 0, 0xcc9e2d51);
          w = Math.imul((w << 15) | (w >>> 17), 0x1b873593);
          q ^= w; q = (q << 13) | (q >>> 19); q = (Math.imul(q, 5) + 0xe6546b64) | 0;
        }
        q ^= q >>> 16; q = Math.imul(q, 0x85ebca6b); q ^= q >>> 13; q = Math.imul(q, 0xc2b2ae35); q ^= q >>> 16;
        return (q >>> 0) / 4294967296;
      };
      const lr = mm(0x4c47);
      return lr < 0.0008 ? 'Aquarium' : lr < 0.0016 ? 'Mimic' : lr < 0.0022 ? 'Hologram' : null;
    },
    // Hood Cats: xorshift32 on hash slice 18-26, past 6
    7(h) {
      let xs32 = (parseInt(h.slice(18, 26), 16) ^ 0x2f6b9d43) >>> 0 || 0x51ed270b;
      const xsr = () => { xs32 ^= xs32 << 13; xs32 >>>= 0; xs32 ^= xs32 >>> 17; xs32 ^= xs32 << 5; xs32 >>>= 0; return xs32 / 4294967296; };
      for (let i = 0; i < 6; i++) xsr();
      const lroll = xsr();
      return lroll < 0.0011 ? 'Porcelain' : lroll < 0.002 ? 'Clockwork' : null;
    },
    // Signal Aliens: a PCG-style stream on hash slice 34-42, past 4
    8(h) {
      let pcs = (parseInt(h.slice(34, 42), 16) ^ 0x3c6ef372) >>> 0;
      const pcg = () => {
        pcs = (Math.imul(pcs, 747796405) + 2891336453) >>> 0;
        const wv = Math.imul((pcs >>> ((pcs >>> 28) + 4)) ^ pcs, 277803737) >>> 0;
        return (((wv >>> 22) ^ wv) >>> 0) / 4294967296;
      };
      for (let i = 0; i < 4; i++) pcg();
      const lroll = pcg();
      return lroll < 0.0012 ? 'Hive' : lroll < 0.002 ? 'The Envoy' : null;
    },
    // Spore Kin: FNV-1a of the hash text with a counter, its first draw
    9(h) {
      let hh = (0x811c9dc5 ^ Math.imul(1, 0x9e3779b1)) >>> 0;
      for (let i = 2; i < h.length; i++) { hh ^= h.charCodeAt(i); hh = Math.imul(hh, 16777619); }
      hh ^= hh >>> 15; hh = Math.imul(hh, 0x2c1b3c6d); hh ^= hh >>> 12; hh = Math.imul(hh, 0x297a2d39); hh ^= hh >>> 15;
      const lroll = (hh >>> 0) / 4294967296;
      return lroll < 0.0011 ? 'Crystal' : lroll < 0.002 ? 'The Elder' : null;
    },
    // Gremlin Works: a Weyl sequence through murmur's finaliser on hash slice 26-34, past 2; the type a second draw
    36(h) {
      let wy = parseInt(h.slice(26, 34), 16) >>> 0;
      const weyl = () => { wy = (wy + 0x9E3779B9) >>> 0; let z = wy ^ (wy >>> 16); z = Math.imul(z, 0x85ebca6b); z ^= z >>> 13; z = Math.imul(z, 0xc2b2ae35); z ^= z >>> 16; return (z >>> 0) / 4294967296; };
      weyl(); weyl();
      const lr = weyl(), lk = weyl();
      return lr < 1 / 420 ? (lk < 0.36 ? 'Clockwork' : lk < 0.7 ? 'Phantom' : 'Scrap King') : null;
    },
    // One Line: an LCG on the hash's seventh word, past 2
    41(h) {
      const hx = h.slice(2);
      let lg = (parseInt(hx.slice(48, 56), 16) ^ 0x9e3779b9) >>> 0;
      const lcg = () => { lg = (Math.imul(lg, 1664525) + 1013904223) >>> 0; let z = lg ^ (lg >>> 16); z = Math.imul(z, 0x45d9f3b) >>> 0; z ^= z >>> 16; return (z >>> 0) / 4294967296; };
      lcg(); lcg();
      const lroll = lcg();
      return lroll < 0.00077 ? 'Gold Leaf' : lroll < 0.00154 ? 'Cyanotype' : lroll < 0.0023 ? 'Marble' : null;
    },
    // Two Sides: a multiply-rotate hash over the hash's 16-bit words, salt 0x2b1d
    44(h) {
      const rare = salt => {
        let x = salt | 0;
        for (let i = 2; i < 66; i += 4) { x = Math.imul(x ^ parseInt(h.substr(i, 4), 16), 0x2c1b3c6d); x = (x << 13) | (x >>> 19); }
        x = Math.imul(x ^ (x >>> 15), 0x297a2d39); x ^= x >>> 12;
        return (x >>> 0) * 2.3283064365386963e-10;
      };
      const lv = rare(0x2b1d);
      return lv < 0.001 ? 'Plaster' : lv < 0.002 ? 'Shattered' : lv < 0.003 ? 'The Instrument' : null;
    },
    // Wobble Folk: mulberry32 on hash slice 50-58, past 1
    47(h) {
      let mb = (parseInt(h.slice(50, 58), 16) ^ 0x6c8e9cf5) >>> 0;
      const mul = () => { mb = (mb + 0x6d2b79f5) >>> 0; let z = mb; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
      mul();
      const lr = mul();
      return lr < 0.0008 ? 'Neon' : lr < 0.0016 ? 'Holo Sticker' : lr < 0.0024 ? 'Flipbook' : null;
    },
    // Primer: FNV-1a of the hash text, salt 0x51a7, then an avalanche
    51(h) {
      let x = (0x811c9dc5 ^ 0x51a7) >>> 0;
      for (let i = 2; i < h.length; i++) { x ^= h.charCodeAt(i); x = Math.imul(x, 0x01000193); }
      x ^= x >>> 16; x = Math.imul(x, 0x7feb352d); x ^= x >>> 15; x = Math.imul(x, 0x846ca68b); x ^= x >>> 16;
      const lr = (x >>> 0) / 0x100000000;
      return lr < 0.0009 ? 'Gold Foil' : lr < 0.0018 ? 'Unprinted' : lr < 0.0026 ? 'Sun' : null;
    },
    // One Mark: splitmix32 over the hash's seventh word, its first draw
    56(h) {
      let xs = (parseInt(h.slice(50, 58), 16) ^ 0x2545f491) >>> 0;
      xs = (xs + 0x9e3779b9) >>> 0;
      let z = xs; z = Math.imul(z ^ (z >>> 16), 0x21f0aaad); z = Math.imul(z ^ (z >>> 15), 0x735a2d97); z ^= z >>> 15;
      const legRoll = (z >>> 0) / 4294967296;
      return legRoll < 0.0009 ? 'Gilded' : legRoll < 0.0017 ? 'Night Sky' : legRoll < 0.0025 ? 'Static' : null;
    },
    // Glyphs: Park-Miller over words 2 and 6, past 8
    57(h) {
      const word = i => parseInt(h.substr(2 + i * 8, 8), 16) >>> 0;
      let lm = ((word(2) ^ Math.imul(word(6), 0x9e3779b1)) >>> 0) % 2147483646 + 1;
      const lehmer = () => { lm = Number((BigInt(lm) * 48271n) % 2147483647n); return (lm - 1) / 2147483646; };
      for (let i = 0; i < 8; i++) lehmer();
      const legRoll = lehmer();
      return legRoll < 0.0008 ? 'Gold Leaf' : legRoll < 0.0017 ? 'Ransom Note' : legRoll < 0.0025 ? 'Dot Matrix' : null;
    },
    // Buzz Heads: FNV-1a of the hash, then xorshift32, past 6; the type a second draw
    58(h) {
      let lz = 0x811c9dc5;
      for (let i = 2; i < h.length; i++) lz = Math.imul(lz ^ h.charCodeAt(i), 0x01000193);
      lz = (lz ^ 0x5eed058) | 1;
      const lx = () => { lz ^= lz << 13; lz ^= lz >>> 17; lz ^= lz << 5; return (lz >>> 0) / 4294967296; };
      for (let i = 0; i < 6; i++) lx();
      const legendR = lx(), legendK = lx();
      return legendR < 1 / 450 ? (legendK < 0.4 ? 'Gold' : legendK < 0.72 ? 'Cosmos' : 'X-Ray') : null;
    },
    // Clay Folk: a tempered LCG on hash slice 42-50, past 2; the type a second draw
    61(h) {
      let mb = (parseInt(h.slice(42, 50), 16) ^ 0x5bd1e995) >>> 0;
      const rare = () => {
        mb = (Math.imul(mb, 1664525) + 1013904223) >>> 0;
        let tq = mb ^ (mb >>> 11);
        tq ^= (tq << 7) & 0x9d2c5680; tq ^= (tq << 15) & 0xefc60000;
        return ((tq ^ (tq >>> 18)) >>> 0) * 2.3283064365386963e-10;
      };
      rare(); rare();
      const legRoll = rare(), legPick = rare();
      return legRoll < 0.0025 ? (legPick < 0.36 ? 'Bronze' : legPick < 0.7 ? 'Mid-Shot' : 'Scrap Clay') : null;
    },
    // Peg Folk: Lehmer on hash slice 26-34, past 3; the type a second draw
    69(h) {
      let lehmer = (parseInt(h.slice(26, 34), 16) % 2147483646) + 1;
      const rarely = () => (lehmer = (lehmer * 48271) % 2147483647) / 2147483647;
      for (let w = 0; w < 3; w++) rarely();
      const legRoll = rarely(), legPick = rarely();
      return legRoll < 0.0025 ? (legPick < 0.4 ? 'Water Gilt' : legPick < 0.75 ? 'Nesting Doll' : 'Glow Paint') : null;
    },
    // Skipping Stones: Park-Miller on hash slice 50-58, past 3
    82(h) {
      let pmk = parseInt(h.slice(50, 58), 16) % 2147483646 + 1;
      const pmR = () => (pmk = pmk * 16807 % 2147483647) / 2147483647;
      for (let i = 0; i < 3; i++) pmR();
      const lroll = pmR();
      return lroll < 0.0011 ? 'Geode' : lroll < 0.002 ? 'Turtle Egg' : null;
    },
    // Sill Folk: FNV of the hash text, then a Weyl step through murmur's finaliser, its first draw
    83(h) {
      let fv = 0x811c9dc5;
      for (let i = 2; i < h.length; i++) { fv ^= h.charCodeAt(i); fv = Math.imul(fv, 0x01000193) >>> 0; }
      fv = (fv + 0x9e3779b9) >>> 0;
      let z = fv; z = Math.imul(z ^ (z >>> 16), 0x85ebca6b) >>> 0; z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35) >>> 0;
      const lr = ((z ^ (z >>> 16)) >>> 0) / 4294967296;
      return lr < 1 / 1100 ? 'Gilded' : lr < 2 / 1100 ? 'Cosmos' : lr < 3 / 1100 ? 'Up and About' : null;
    },
    // Little Steamers: xorshift128 on hash slices 42-50 and 58-66, past 8
    85(h) {
      let xa = parseInt(h.slice(42, 50), 16) | 1, xb = (parseInt(h.slice(58, 66), 16) ^ 0x6b43a9b5) | 0, xc = 0x1f123bb5, xd = 0x5491333;
      const x128 = () => { const tt = xa ^ (xa << 11); xa = xb; xb = xc; xc = xd; xd = (xd ^ (xd >>> 19)) ^ (tt ^ (tt >>> 8)); return (xd >>> 0) / 4294967296; };
      for (let i = 0; i < 8; i++) x128();
      const lroll = x128();
      return lroll < 0.0011 ? 'Koi Bun' : lroll < 0.002 ? 'Steam Spirit' : null;
    },
    // Rattle Crew: an FNV-1a fold of the hash text stepped by its own mixer; the type a second draw
    101(h) {
      let lv = 0x811c9dc5 ^ 0x52617474;
      for (let i = 2; i < h.length; i++) lv = Math.imul(lv ^ h.charCodeAt(i), 0x01000193) >>> 0;
      const lgr = () => { lv = (lv + 0xa0761d65) >>> 0; let z = Math.imul(lv ^ (lv >>> 15), 0xe7037ed1) >>> 0; z = Math.imul(z ^ (z >>> 13), 0x8ebc6af1) >>> 0; return ((z ^ (z >>> 16)) >>> 0) / 4294967296; };
      const lu = lgr(), lp = lgr();
      return lu < 0.0022 ? (lp < 0.42 ? 'Crystal Skull' : lp < 0.76 ? 'Dragon Skull' : 'The Reaper') : null;
    },
    // Night Panel: xoroshiro64* seeded by a djb2 fold of the hash read backwards, past 4; the type a second draw
    102(h) {
      let k0 = 5381, k1 = 0x6c656d75;
      for (let i = h.length - 1; i >= 2; i--) { k0 = (Math.imul(k0, 33) ^ h.charCodeAt(i)) >>> 0; k1 = (Math.imul(k1 ^ k0, 0x2545f491) + i) >>> 0; }
      k0 = k0 || 1;
      const lr = () => {
        const r = Math.imul(k0, 0x9e3779bb) >>> 0;
        k1 = (k1 ^ k0) >>> 0; k0 = (((k0 << 26) | (k0 >>> 6)) ^ k1 ^ (k1 << 9)) >>> 0; k1 = ((k1 << 13) | (k1 >>> 19)) >>> 0;
        return r / 4294967296;
      };
      for (let i = 0; i < 4; i++) lr();
      const lu = lr(), lp = lr();
      return lu < 0.0022 ? (lp < 0.4 ? 'Dead Pixel' : lp < 0.73 ? 'Test Card' : 'Inverted') : null;
    },
    // Rooftop Clan: a Weyl counter through a murmur finaliser, keyed by a rotate-multiply fold; the type a second draw
    103(h) {
      let lkey = 0x6b79;
      for (let i = 2; i < h.length; i++) lkey = Math.imul(((lkey ^ h.charCodeAt(i)) << 5) | ((lkey ^ h.charCodeAt(i)) >>> 27), 0x27d4eb2d) >>> 0;
      let weyl = lkey;
      const lgd = () => { weyl = (weyl + 0x61c88647) >>> 0; let z = weyl ^ lkey; z = Math.imul(z ^ (z >>> 16), 0x85ebca6b); z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35); return ((z ^ (z >>> 16)) >>> 0) / 4294967296; };
      const lu = lgd(), lp = lgd();
      return lu < 0.0022 ? (lp < 0.4 ? 'Mecha' : lp < 0.72 ? 'Ghost' : 'Ink Scroll') : null;
    },
    // Item Shop: Lehmer keyed by an sdbm fold of the hash, past 3; the type a second draw
    105(h) {
      let sd = 0;
      for (let i = 2; i < h.length; i++) sd = (h.charCodeAt(i) + (sd << 6) + (sd << 16) - sd) >>> 0;
      let leh = (sd % 2147483646) + 1;
      const lx = () => { leh = Number((BigInt(leh) * 16807n) % 2147483647n); return (leh - 1) / 2147483646; };
      for (let i = 0; i < 3; i++) lx();
      const lu = lx(), lp = lx();
      return lu < 0.0022 ? (lp < 0.38 ? 'Dragon' : lp < 0.7 ? 'Slime King' : 'Starfolk') : null;
    },
    // Ice Bits: a middle-square Weyl stream keyed by an Adler fold, past 6; the type a second draw
    107(h) {
      let ad1 = 1, ad2 = 0;
      for (let i = 2; i < h.length; i++) { ad1 = (ad1 + h.charCodeAt(i) * 7) % 65521; ad2 = (ad2 + ad1) % 65521; }
      let msx = ((ad2 << 16) | ad1) >>> 0, msw = 0;
      const msr = () => { msw = (msw + 0xb5ad4ece) >>> 0; msx = (Math.imul(msx, msx) + msw) >>> 0; msx = ((msx >>> 16) | (msx << 16)) >>> 0; return msx / 4294967296; };
      for (let i = 0; i < 6; i++) msr();
      const lu = msr(), lp = msr();
      return lu < 0.0022 ? (lp < 0.36 ? 'Yeti' : lp < 0.7 ? 'Fire' : 'Diamond') : null;
    },
    // Page Parrots: splitmix keyed by a one-at-a-time hash of the text; the type a second draw
    110(h) {
      let oat = 0;
      for (let i = 2; i < h.length; i++) { oat = (oat + h.charCodeAt(i)) >>> 0; oat = (oat + (oat << 10)) >>> 0; oat ^= oat >>> 6; }
      oat = (oat + (oat << 3)) >>> 0; oat ^= oat >>> 11; oat = (oat + (oat << 15)) >>> 0;
      const smx = () => { oat = (oat + 0x9e3779b9) >>> 0; let z = oat; z = Math.imul(z ^ (z >>> 16), 0x21f0aaad); z = Math.imul(z ^ (z >>> 15), 0x735a2d97); return ((z ^ (z >>> 15)) >>> 0) / 4294967296; };
      const lu = smx(), lp = smx();
      return lu < 0.0022 ? (lp < 0.4 ? 'Phoenix' : lp < 0.7 ? 'Dodo' : 'Clockwork') : null;
    },
    // Clash Beetles: xorshift32 seeded from the odd words, past 6
    201(h) {
      const w = i => parseInt(h.slice(2 + i * 8, 10 + i * 8), 16) >>> 0;
      let lx = (w(1) ^ Math.imul(w(3), 0x9e3779b1) ^ Math.imul(w(5) ^ (w(7) >>> 7), 0x85ebca6b) ^ 0x51ed270b) >>> 0 || 0x2545f491;
      const lr = () => { lx ^= lx << 13; lx >>>= 0; lx ^= lx >>> 17; lx ^= lx << 5; lx >>>= 0; return lx / 4294967296; };
      for (let i = 0; i < 6; i++) lr();
      const lu = lr();
      return lu < 0.0008 ? 'Lantern' : lu < 0.0017 ? 'Sun Scarab' : lu < 0.0027 ? 'Clockwork' : null;
    },
    // Flood Fill: Park-Miller on hash slices 10-18 and 50-58, past 4
    204(h) {
      let pm = ((parseInt(h.slice(10, 18), 16) ^ parseInt(h.slice(50, 58), 16) ^ 0x6c8e9cf5) >>> 0) % 2147483646 + 1;
      const PM = () => { pm = Number(BigInt(pm) * 48271n % 2147483647n); return (pm - 1) / 2147483646; };
      for (let i = 0; i < 4; i++) PM();
      const lu = PM();
      return lu < 0.0009 ? 'Transparent' : lu < 0.0018 ? 'Phoenix' : lu < 0.0027 ? 'Mandarin' : null;
    },
    // Soft Steps: a middle-square Weyl stream on hash words 2, 4 and 7, past 9
    205(h) {
      const words = []; for (let i = 0; i < 8; i++) words.push(parseInt(h.slice(2 + i * 8, 10 + i * 8), 16) >>> 0);
      let msx = (words[2] ^ 0x3c6ef372) >>> 0, msw = 0;
      const mss = ((words[7] ^ Math.imul(words[4], 0x9e3779b1)) | 1) >>> 0;
      const ms = () => { msw = (msw + mss) >>> 0; msx = (Math.imul(msx, msx) + msw) >>> 0; msx = ((msx >>> 16) | (msx << 16)) >>> 0; let z = Math.imul(msx ^ (msx >>> 15), 0x2c1b3c6d); z ^= z >>> 12; return (z >>> 0) / 4294967296; };
      for (let i = 0; i < 9; i++) ms();
      const lu = ms();
      return lu < 0.0013 ? 'Ice Sculpture' : lu < 0.0026 ? 'The Unicorn' : null;
    },
    // Stomp Frames: a one-at-a-time hash of the hash text, salt 0x7f4a7c15
    206(h) {
      let x = 0x7f4a7c15 | 0;
      for (let i = 2; i < h.length; i++) { x = (x + h.charCodeAt(i)) | 0; x = (x + (x << 10)) | 0; x ^= x >>> 6; }
      x = (x + (x << 3)) | 0; x ^= x >>> 11; x = (x + (x << 15)) | 0;
      const lu = (x >>> 0) / 4294967296;
      return lu < 0.0009 ? 'Unseen' : lu < 0.0018 ? 'Golden Idol' : lu < 0.0027 ? 'Final Boss' : null;
    },
    // Pattern Plates: xoshiro128** on hash words 0, 2, 4, 6, past 8
    208(h) {
      let xa = parseInt(h.slice(2, 10), 16) >>> 0, xb = parseInt(h.slice(18, 26), 16) >>> 0, xc = parseInt(h.slice(34, 42), 16) >>> 0, xd = (parseInt(h.slice(50, 58), 16) ^ 0x9e3779b9) >>> 0;
      const xo = () => {
        const r = Math.imul(((Math.imul(xb, 5) << 7) | (Math.imul(xb, 5) >>> 25)), 9) >>> 0, t2 = xb << 9;
        xc ^= xa; xd ^= xb; xb ^= xc; xa ^= xd; xc ^= t2; xd = (xd << 11) | (xd >>> 21);
        return r / 4294967296;
      };
      for (let i = 0; i < 8; i++) xo();
      const lu = xo();
      return lu < 0.0013 ? 'Glyptodon' : lu < 0.0026 ? 'Engraving' : null;
    },
  };
  // what a legendary does when you play with it, shown under the large view in place of the piece's own line (each
  // legendary has a toy of its own: the founder, 2026-10-20). Only words: nothing here touches the rolls
  const hints = {
    1: {"Paper Lantern":"Grab the lantern and swing its shadow on the cord (fling it and its eye spins dizzy); hold a finger near its mouth and its long red tongue curls out to lick it. The red eye follows you round the screen.","Stained Glass":"Touch the petals of the rose window to light a flame behind each one; light all eight and the window blazes gold and the spirit flies out of its heart in a loop round the frame. The sun follows your finger round the rim.","Two Under One":"Move the spotlight: the pair shuffle after it and droop when they are left in the dark. Tap to throw roses onto the stage; the third brings the curtain down and up again for a bow."},
    2: {"Axolotl":"Tap the water to drop in a worm: it swims over, mouth first, and gulps it. Feed it three and it goes pink-cheeked and wiggly with hearts.","Full Colour":"You are the fly: hover near the frog and its eyes follow you, linger in front of its face and the tongue snaps out (dodge it, or get gulped and counted in the corner). Tap the water for ripples that rock the lily pad.","Stone Idol":"Press and hold on the idol: the glyph on its belly kindles cell by cell, the torches climb and the screen trembles; hold to the end and it wakes: eye beams, the jaw grinding open, gold pouring down the steps into a pile. It stays awake as long as you hold."},
    3: {"Cursed Gold":"Drag a coin off his hoard: his eye-fire follows it and turns red the further you take it; take it too far and a bony gold hand lunges out of the hoard and snatches it back, and he laughs at you.","Merfolk":"Drag through the water to stir a current: the motes stream, the hair, kelp and fish swing with it, and the fish dart away from your finger. Touch the trident and the whole school comes, gold, circling in front of her. Touch a bubble to pop it.","Pirate King":"Tap the kraken arms rising over the rail: the King swings his cutlass in a white arc, the ink splashes green, the tip flies off and the arm flinches; five cuts and the kraken sinks through a whirlpool for about 8 s (\"BEGONE!\"). Tap the parrot to make it squawk."},
    4: {"Hedge Born":"Tap to poke a fingerprint dent into the clay (it keeps it a while). Drag to pull a finger through it: a groove follows you, and the animator smooths it away a frame at a time when you let go; he screws his eyes shut while you do it. A tap on the orb makes it flare.","Living Flame":"Move your pointer over the fire and the flames lean and gutter away from it; press and hold to pump the bellows until it roars white-hot, and let go for a burst of sparks.","Starweave":"Drag across the robe to set new stars and join them into a constellation of your own; let go and it shines, then the stars fly off as shooting stars. Tap the evening outside for a shooting star.","Swapped":"Drag the hat off the familiar (it gapes after it) and drop it on the tiny wizard: it lands on him in a shower of sparkles, and after a moment it puffs back to the familiar. Drop it anywhere else and it floats home."},
    5: {"Aquarium":"Tap the water to drop food and the goldfish swims up to eat it (every fifth flake it turns a golden somersault); knock on the glass and it darts away; press and drag along the glass and it follows your finger.","Mimic":"Leave your finger over its mouth and it bites (hold on and it chews, let go and it spits a coin); tap its planks and it coughs up a coin; grab a coin, flick it back into its open mouth and it catches it with heart eyes.","Hologram":"Grab it and drag sideways to spin it; let go and it keeps turning, then comes back round to face you; spin it hard and it overloads and rebuilds; tap it to change the colour it is projected in."},
    7: {"Porcelain":"Pull its raised paw down and let go: it springs back beckoning and a coin flies in to its stack (nine coins and its luck bursts in gold); stroke its head and it shuts its eyes and purrs; tap its bell to ring it.","Clockwork":"Draw circles round it to wind it (the big gauge on the left fills), then let go: the whole toy shakes its way across the card, its belly clock races, its key spins, its music box plays and big notes float up; each time the big hand passes twelve a bird pops out of the hatch in its head. A short, still tap gives it a little wind."},
    8: {"Hive":"Draw a path across the cells and let go: the signal runs it and each drone sings its own note in turn, so every path is a tune; tap the queen in the middle and the whole hive sings at once.","The Envoy":"Hold and drag round its head to turn its script halo a click at a time; let go and it spins on and settles on a click, and if its jewel lands near the arrow at the art box’s edge (it burns white when the jewel is in reach) it ticks home and the card wakes: the foil blazes, beams burst from its eyes, its crown flares out of the box and its words scroll along the foot. A short, still tap and it blinks and says a word."},
    9: {"Crystal":"Your pointer is the light: the gem in its forehead splits it into a five-band rainbow that turns with it and runs to the geode wall; tap near the wall to grow crystals that flash and ring when the rainbow crosses them; tap the cap and a sparkle runs up each crystal point.","The Elder":"Hover and the fireflies gather to your finger; press and sweep through them to catch them (they glow on your finger), carry them into its halo or to the lantern it holds and let go (each one lights a bead on its halo); fill it with all seven and the elder wakes: its dark eyes open wide under raised brows and a bold gold ring runs out from the lantern to the frame. A short, still tap and it hums and its beard wags."},
    36: {"Phantom":"Your pointer is a lantern: the night goes truly dark outside its pool and only the ghost's eyes glow; chase it (it slides away from the beam), hold it in the light until it freezes white and trembling, and it bursts into wisps and fades back in on the other side.","Clockwork":"Circle your finger round its head to wind it: the spring and key heat up to white-hot and the reading climbs; let go and it runs wild, the heat flooding out through its body while it jolts, sparks fly from the spring, and about once a second its head spins round (the face squeezes to its edge, the plain back of the head comes round, and the face swings back).","Scrap King":"Tap anywhere on the page to flick a gold coin: a spinning gold disc arcs onto his hoard with a trail of glints, and the hoard rises a row of coins for every two; every tenth coin crowns him again with a burst of gold rays, adds a jewel to his crown and gilds one of the marginal gremlins."},
    41: {"Cyanotype":"Draw a stroke on it and a fern prints along your line, white, then the blue develops back over it.","Gold Leaf":"Drag to sprinkle gold powder: it falls behind the face and the gold line (no speck ever crosses the face) and settles on the robe and the ground at the panel’s foot, glitters, then sinks into the lacquer; a short tap sends a band of iridescent colour rippling through the mother-of-pearl.","Marble":"Tap the bust to chisel it: a chip flies off, dust sinks, a wide crack grows and branches from the nick; the seventh blow wakes it with coloured irises that follow you in a cold glow, then the cracks draw back and close, shimmering."},
    44: {"The Instrument":"Drag across its strings to pluck them (higher up, higher notes); each note flies onto the sheet music and is written there; tap the sheet music to hear your tune.","Plaster":"Move the lamp (it follows your pointer, drawn as a little brass lamp): the ivory cast is lit from that side and throws a long shadow on the wall, longer the lower the lamp; tap the cast to turn it about.","Shattered":"Tap the glass to strike it again: a flash and a new crack web grows from the blow (up to five); hold a finger on it for a second to mend the mirror."},
    47: {"Holo Sticker":"Press on the sticker (off its face) and drag to peel it up: the flap folds back showing its white backing; let go and it slaps back down.","Flipbook":"The drum turns slowly by itself and all three frames tumble in turn, each a frame on from the last (stand, crouch, leap, tuck, somersault, open out, land, rise, ta-da, bow); drag sideways to turn it under your finger, tap to give it a push, or fling it hard and it spins fast, slows and stops on the punchline: the acrobat big in a ta-da pose with a TA-DA! caption card and a burst of gold stars, held for over a second.","Neon":"Tap a tube to switch it off or back on (it stutters as it strikes); the tube under your finger runs white-hot; hold anywhere for a second to cycle the power."},
    51: {"Gold Foil":"Grab the medal and swing it on its ribbon; fling it hard and it spins over to show its back (a Bauhaus emblem in relief); tap it to turn it over.","Sun":"Drag the sun anywhere: high up it is noon (wide awake), near the sea a purple dusk, under the sea it is night, with stars and a moon; tap the sun and it flares and pulls a face.","Unprinted":"The brayer follows your finger. Drag it across the proof to roll ink: the ink runs out over every part of the poster printed in that colour; let go to load the next ink (tap to pick one). Put all the inks down and the proof is pulled: a shine, the corner lifts, a red tick by the 1/1. Hold still to wash it clean."},
    56: {"Gilded":"Move the pointer over it to tilt the box (the paper layers slide against each other); a short tap sets the paper stars swinging (a tap on the figure also makes it hop); hold to turn the light inside from day to night, let go for day.","Night Sky":"Hold still and the shutter stays open: the stars wheel into trails round the pole; tap a star of the figure and it goes nova; tap the sky and a star falls from there.","Static":"Drag to drive the discharge harder (longer, brighter streamers, the faster the harder); a short tap throws a spark that arcs to the figure; hold and the whole body goes into full corona."},
    57: {"Dot Matrix":"Its eyes follow the pointer. A short tap moves the cursor and the next fighter slides in; drag along the roster to move the cursor, let go to pick that fighter; hold to lock in (READY, an aura of fire), let go for FIGHT!","Gold Leaf":"Rub the gold to burnish it; tap the blue to set a gold rosette in it, and its mirror twin, so a pattern builds; tap the gold to letter a new face, scribed in row by row.","Ransom Note":"Drag the scraps around the page; put them all back where they belong (they snap home) and the note gets stamped PAID. Tap a scrap to swap it for another cutting, the scissors to re-cut them all, bare paper (a tap, not a drag) for a new face."},
    58: {"Cosmos":"Drag to fly: the astronaut leans into it and the stars stream past; tap to fire the pack’s thrusters (two jets of flame that kick the view); hold still for warp (streaks across the visor too), let go to jump: a white flash and a new field of stars round a different planet.","Gold":"The spotlight (a pool on the curtain and on the boards) follows the pointer; hold for a drumroll (the house goes dark, the light closes in, the statuette shimmers), let go for three bursts of confetti cannon from each wing; a short tap is a camera flash.","X-Ray":"The pointer is a scanner that shows the figure in colour; tap to rattle the bones; hold on the thing it swallowed to pull it out, drag it away and let go."},
    61: {"Bronze":"Press and rub it for luck: every rub wears the dull green patina to bright gold with a sparkle and a rising note, coins stack up on the plinth, and after about three seconds of rubbing it winks at you and a gleam runs over the gold. A quick, still tap takes a flash photo: a polaroid slides out to the side and develops.","Mid-Shot":"You are the animator: drag to pose it (the head turns a long way and every pose gets the next replacement mouth), let go to shoot the frame (the shutter flashes, the shot lands in the strip along the foot of the frame, and stays as an onion skin). Tap the red light top left: the clapper snaps and your shots play back at eight a second with a film gate’s flicker."},
    69: {"Water Gilt":"Move over it to carry a candle across the gold (every flame catches in the gilt); tap to leave a votive burning there, up to five.","Nesting Doll":"Tap to pack the smallest doll into the next one up, one at a time, until only the big one stands; tap again and they all pop back out.","Glow Paint":"Move over it: your UV torch makes the inks flare and finds big secret ink (hearts, spirals, eyes) on the velvet. A quick, still tap switches the room light on (the tube flickers, the inks go pale, the velvet grey) and off again; a drag spins the doll."},
    82: {"Geode":"Move over the window to carry the light behind the glass: the panes near it jump two shades to blazing and its four shafts of colour slide across the sill. Run a finger round the crystals to play them like a harp: each flashes white with a star of light and rings its own note, the face shuts its eyes, its pane blazes and a note floats up; a quick tap rings one crystal or sends the light there.","Turtle Egg":"Drag (or tap the sand) to lead the hatchling past the crab (bump into it and it tumbles back) and into the sea: it dives, surfaces in the column of moonlight in rings of light while a big four-point star bursts and stays in the sky for it, then the next one hatches. An arrow over it shows the way until you first touch it."},
    83: {"Gilded":"Drag over anything to turn it to gold: the gold fills that whole thing first (a curtain, the plinth, the cushion, the wall) and then creeps across to the next, until the room is gold in about six seconds; then it melts, running down the room in drips into a molten pool that drains away. Tap the pot for a shower of coins.","Cosmos":"Press, pull back and let go to fling a moon: a rubber band and its path show while you aim, and the fling is helped into an orbit; up to three go round at once with long tails of light. Three laps and the pot beams and its ring glows gold; come too close and it crashes in a burst of rays that knocks the pot.","Up and About":"Tap to make it leap what lies on its walk (boulders, stacked logs, a cat asleep sitting up; puddles splash). It leaps them itself until you tap; then it is up to you, and a TAP bubble shows over the next one when you leave it be. Mistime it and it tumbles onto its side, legs kicking, dizzy, and the sign flashes red. Hold to run. The sign keeps the run and your best."},
    85: {"Koi Bun":"Tap the well and a cobalt pellet drops in; the koi turns, swims to it and gulps it with a ring. Tap the koi to startle it into a dash. Drag through the water to leave crisp cobalt rings.","Steam Spirit":"Grab the spirit and drag: it stretches after your finger like warm taffy and snaps back with a wobble when you let go; tap its lid and it flips up into the air and clatters back down onto its head."},
    101: {"Crystal Skull":"Move the light round it (hover or drag) and the rainbow swings across the vault on the far side; tap its facets and each rings its own glass note and lights up in the colours it splits; tap beside it for a chord and a ring of split light.","Dragon Skull":"Hold still anywhere to stoke it: smoke puffs from its nostril, the jaw creaks open and the eye flares; let go and it breathes a roaring flash-style flame to where you let go. Tap it to make it snap out a short burst; tap the gold to flick a coin.","The Reaper":"Souls rise slowly from the graves at either side, little glowing wisps with faces: tap one and the Reaper swings, a white slash follows the blade, the soul streaks into it and the night flashes, and a tally is cut into the ground for every soul taken, in fives."},
    102: {"Dead Pixel":"Tap any tube or letter to switch it off or on (it sputters as it goes); drag across the sign to sweep its colour through red, green and blue; switch every tube off and after a beat the sign relights itself tube by tube.","Test Card":"Drag across the picture to tune it: off station it tears, rolls, drains of colour and fills with snow; find its station and it locks clean with a beep, the lamp turns green and the sitter's eyes glint; tap a locked card for the line-up tone and a roll.","Inverted":"Drag the scanner across it to see the bones under the fur (left alone it sweeps by itself); tap its heart to make it race; press to send thin rainbow rings running out from your finger; tap elsewhere to flash the tube and see the whole skeleton at once."},
    103: {"Mecha":"Point to aim (a reticle and the visor follow you) and tap to fire the visor beam at that spot; hold to charge the reactor (sparks, steam, a flickering visor) and let go for a full-power beam; every hit leaves a scorch on the backdrop that smoulders out.","Ghost":"Grab a flame and fling it (whoosh lines trail it; it pops back into its circle). Tap the ghost and it lunges out of the panel: the balloon becomes a yellow starburst shouting BOO!, action lines burst behind it, the frame shakes, its mask is gone and its mouth hangs open.","Ink Scroll":"Tap anywhere and the ninja leaps there the way neon does, lit pose by lit pose along an arc, the pose it left going dark; every third leap the whole sign surges and the sun bursts in a shower of sparks. Drag across the tubes and they spit sparks and stutter where you touch."},
    105: {"Slime King":"Grab the jelly and pull: a long gooey arm stretches out of it after your finger, its eyes go wide and its mouth makes an O. Let go and the arm snaps back, the whole king squashes and wobbles, drops of jelly fly, and a big stretch shakes the gold coin out of its crown to bounce along the counter.","Starfolk":"Drag across the sky: each stretch leaves a star and a line between them, a constellation. Let go and the stars fly into the galaxy in its chest, which grows bigger and brighter with each one. Tap the figure for a shooting star.","Dragon":"Press on the gold to pick up a coin and drag it off the edge of the picture, slowly. Move fast or near its head and it wakes, its eyes find your hand and it breathes fire at it; the coin drops back. Stolen coins pile up in the corner. Poke its nose and it snorts."},
    107: {"Fire":"Move the pointer and the flames lean away from it like wind. Hold it down and the fire roars up white-hot, blowing the hat off the top; let go and it dies down, the hat drops back on and a ring of steam bursts off the snow.","Yeti":"Tap quickly to throw a snowball at it: it throws one straight back at where you tapped, growing from one cell to a big ball as it flies at the glass, then a ring of frost that slowly melts; every third hit it roars, mouth wide, eyes red, the whole frame shaking. Press and hold for the blizzard: the sky goes pale and snow streaks across the whole frame while its fur thrashes.","Diamond":"Point at the night: a one-cell beam runs to the gem and a six-cell rainbow lands on the ice on the far side, its colours spilling into the ice below. Drag across the gem to turn it: a band of light slides round its facets and the rainbow swings a cell. With your light on it, when the band comes round to the middle the gem blazes: prismatic fire bursts out of it with a chord."},
    110: {"Clockwork":"Circle your finger round the drawing to wind it: the two gears of FIG. 2 spin and mesh, the mainspring coils tighter and a bold dimension arc fills round it (a quick tap winds one notch). Let go and the bird sings a music-box tune, snapping between three poses on every note (beak shut, half open, wide open; wing down, half up, raised), big notes floating up through FIG. 1, while the gears run down.","Phoenix":"Hold it: the fire grows, the copper bars turn red and the bird burns white; keep holding and it burns away from the feet up into a great flame, falls to ash, and a chick rises out of the ash and grows back into the phoenix with a ring of light.","Dodo":"Tap the sky or the island to drop it fruit (up to three): the fruit bounces on the sand, the dodo turns, waddles over, grabs it, a lump slides down its neck, a heart floats up and it burps. Tap the dodo itself and it jumps."},
    201: {"Lantern":"Press and drag to lift it off its twig and carry the flame through the dark: what its light passes over stays lit for a moment as it fades, so you can find the moth on its leaf, the mushrooms and the web. Let go and it flies back to the twig.","Sun Scarab":"Press near the sun and turn your finger round it like a dial: the whole sunburst turns with you, clicking ray by ray, and coasts on when you let go. Tap quickly and the scarab beats its wings, folding them in and spreading them again, with gold sparks flying off the sun and a chime.","Clockwork":"Circle your finger to wind its key (the lamps along the foot fill): its clockwork then works the flippers, and it scoots round the table, bounced by the bumpers and slings (light all three lamps for a jackpot) until the spring runs down and it settles between the flippers. A quick tap flips both flippers yourself."},
    204: {"Transparent":"Move the pointer over the duck: the scanner is a lens, inside it the bones blaze white and the organs show, outside only faint. Tap for an exposure (a white flash held a moment, then every bone and organ glowing); hold and its heart beats with a trace along the film.","Phoenix":"Hold the card: the fire climbs it from its foot and the border scorches from the bottom up; let go after a long hold and it burns away, the ash crumbles and falls, and the card is reborn inside a ring of light, the phoenix rising into place. A quick tap turns the card right over to its designed back and back again.","Mandarin":"Tap the water: gold rings spread and the drake paddles over, a wake fanning behind it (drag along the water to lead it). Tap the plum blossom and its petals fall onto the water, ringing it; tap the drake and it opens its bill and calls."},
    205: {"Ice Sculpture":"Your pointer is a lamp: the beam and the facets of the carving follow it. Hold to warm the ice: the tusk melts back, drips fall and a pool spreads round the hole; let go and it freezes with a crackle of frost. A quick tap sends a prism through it in three stepped colours.","The Unicorn":"Drag over the page's gold (the arch, the stars, the dots, the crown) to lay leaf and burnish it; gild enough and the initial in the corner lights up. Tap and the old bull sings: neumes rise, the waves lift, the stars flash."},
    206: {"Unseen":"It walks the frame and slips away from your reticle. Hold to put the camera down and look with your own eyes: nothing there. Tap to take its photo: a polaroid drops in, and the shape on it is a blur with two lit eyes.","Golden Idol":"Press on the idol and carry it off its altar: the temple shakes harder the further you take it, dust pours from the roof. Let go and it flies home. Tap the treasure for coins.","Final Boss":"Move along the floor to dodge the fist it has marked with a neon ring; tap to strike, tap fast for a combo. Empty its bar for a K.O. (it glitches apart); lose your three hearts and it is GAME OVER."},
    208: {"Glyptodon":"Your pointer is the torch: move it over the wall and the painting brightens under it. Hold it still (pressed, or just resting a second) and the hunt plays: the hunters light up and a spear arcs over and strikes the beast. Tap to blow a big hand stencil onto the rock.","Engraving":"Move the light (the pointer) and the engraved lines glint line by line, the silver-inlaid bands of the shell catching it most. Drag to cut lines of your own with the burin (they stay bright a while); cut enough and laurel sprigs engrave themselves round the name. Tap to buff the plate."},
  };
  // a print's legendary from its hash, for a piece of a runtime (rt: the catalogue's, 'pfp1'), or undefined when that
  // piece has no roll here (then only its art can say)
  const roll = (rt, num, hash) => { const R = rt === 'pfp1' ? pfp1 : null, f = R && Object.hasOwn(R, num) ? R[num] : null; return f ? f(String(hash)) : undefined; };
  const has = (rt, num) => rt === 'pfp1' && Object.hasOwn(pfp1, num);
  const hint = (num, type) => (hints[num] && Object.hasOwn(hints[num], type) ? hints[num][type] : '');
  root.PrintsLegends = { pfp1, roll, has, hint };
})(typeof window !== 'undefined' ? window : globalThis);
