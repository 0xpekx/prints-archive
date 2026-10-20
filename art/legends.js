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
  // a print's legendary from its hash, for a piece of a runtime (rt: the catalogue's, 'pfp1'), or undefined when that
  // piece has no roll here (then only its art can say)
  const roll = (rt, num, hash) => { const R = rt === 'pfp1' ? pfp1 : null, f = R && Object.hasOwn(R, num) ? R[num] : null; return f ? f(String(hash)) : undefined; };
  const has = (rt, num) => rt === 'pfp1' && Object.hasOwn(pfp1, num);
  root.PrintsLegends = { pfp1, roll, has };
})(typeof window !== 'undefined' ? window : globalThis);
