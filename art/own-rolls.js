// A piece's own counted traits, worked out from a print's hash alone, for a drop whose own traits multiply into its
// "1 in N" (the catalogue's drop ownProduct: core.js ownRolled). The piece picks them from a random stream on the hash
// before it draws anything; here is only that pick: the stream, its seeding and warm-up, and every draw up to the last
// counted trait, copied from the piece's code exactly, with no canvas. The rules (core.js ownProd) use it for a print's
// 1 in N on the server, the PC and the page alike, every time (nothing kept on the print), with each value's chance from
// the drop's odds file (art/<drop>/odds.js, window.PrintsTraitOdds).
//
// drop07, the Humwhere launch print (humwhere-launch-print's piece/humwhere.js make(): the place pick, the time and the
// weather, then the moment; the rule agreed by humwhere-launch-print and prints-economy, 25 Nov: Place x Moment x the
// four global traits). Proved against the piece's own code in headless Chrome (server/tools/own-roll-check.mjs): every
// hash's Place and Moment the same as the art's. A change to the piece's places or to its draws before the moment must
// change it here too, and be proved again the same way; core.js catalogueOf fingerprints what this rolls.
//
// PrintsOwnRolls[<runtime dir>][num](hash) -> [[trait, value], ...], the counted traits in the piece's order
(function (root) {
  'use strict';
  const M = Math;
  // the piece's dice (humwhere.js rngFrom): four words of the hash, fifteen draws thrown away
  function rngFrom(hash) {
    const h = (hash || '0x').replace(/^0x/, '').padEnd(64, '0');
    let a = parseInt(h.slice(0, 8), 16) >>> 0, b = parseInt(h.slice(8, 16), 16) >>> 0, c = parseInt(h.slice(16, 24), 16) >>> 0, d = parseInt(h.slice(24, 32), 16) >>> 0;
    const f = () => { a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 15; i++) f();
    return f;
  }
  // the places, in the piece's order (HUM_ASSETS.plates): name, w, the area they count with (interiors with the area they
  // sit in: grp), outdoor
  const PLATES = [
    ['Humdrum Square · the fountain', 2, 'hub', 1], ['Humdrum Square · the bandstand', 1.5, 'hub', 1], ['Humdrum Square · Town Hall', 1.5, 'hub', 1],
    ['Humdrum Square · the Dial', 1.5, 'hub', 1], ['Humdrum Square · Coin-Op Cosmos', 1.5, 'hub', 1], ['Humdrum Square · the duck pond', 1.5, 'hub', 1],
    ['Humdrum Square · the gym', 1.5, 'hub', 1], ["Humdrum Square · Griddle's Diner", 1.5, 'hub', 1], ['Pillowfort Lane · the lemonade stand', 2, 'suburb', 1],
    ["Pillowfort Lane · the Mow-narch's kingdom", 1.4, 'suburb', 1], ['Pillowfort Lane · Quilt Court', 1.4, 'suburb', 1], ['Fizzle Pier · the Ferris wheel', 2, 'pier', 1],
    ['Fizzle Pier · Ring Toss', 1.3, 'pier', 1], ['Fizzle Pier · the taffy stand', 1.3, 'pier', 1], ['Fizzle Pier · the lighthouse', 1.3, 'pier', 1],
    ['Fizzle Pier · the helter-skelter', 1.3, 'pier', 1], ['Route 88 · the Starlite Diner', 1.5, 'route88', 1], ['Route 88 · Last Gas', 1.2, 'route88', 1],
    ['Route 88 · Dino-Rama', 1.2, 'route88', 1], ['Route 88 · the Ball of Lint', 1.2, 'route88', 1], ['Murmur Woods · the campfire', 1.5, 'woods', 1],
    ['Murmur Woods · the mushroom ring', 1, 'woods', 1], ['Murmur Woods · the Clock Shop', 1, 'woods', 1], ['Murmur Woods · the dump', 1, 'woods', 1],
    ['The Flicker Drive-In · the front row', 1, 'drivein', 1], ['The Flicker Drive-In · the Popcorn Tub', 1, 'drivein', 1], ['Antenna Hill · WHUM 88.8', 1, 'antenna', 1],
    ['Humdrum Junction · the platform', 1, 'junction', 1], ['Humdrum Junction · the station garden', 1, 'junction', 1], ['Lake Ditto · Camp Whatsit', 1, 'lake', 1],
    ['Wobbly Links · the windmill', 1, 'links', 1], ['Wobbly Links · the forecourt', 1, 'links', 1], ['Old Tater Farm · the farmyard', 1, 'farm', 1],
    ['Old Tater Farm · the show table', 1, 'farm', 1], ['The Deep End · the Snack Kiosk', 1.5, 'pool', 1], ['Second Chances · the television mountain', 1, 'scrap', 1],
    ['The Underhum · the Humdinger', 0.6, 'underhum', 0], ['The Quiet', 0.6, 'quiet', 0], ['School Gym · the lockers', 1.5, 'hub', 0],
    ['The Humdrum Galleria · the fountain', 1.1, 'mall', 0], ["Griddle's Diner", 1.1, 'hub', 0], ['Coin-Op Cosmos', 1.1, 'hub', 0],
    ['Starlite Diner', 1.1, 'route88', 0], ['Spin Again', 1, 'mall', 0], ['WHUM 88.8', 1, 'antenna', 0],
  ];
  const areaN = {};
  for (const p of PLATES) areaN[p[2]] = (areaN[p[2]] || 0) + 1;
  // (each plate's weight as the piece works it out, the same operations in the same order)
  const PLACE = PLATES.map(p => [p, M.sqrt(p[1]) * M.pow(areaN[p[2]], -0.25)]);
  const humwhere = hash => {
    const R = rngFrom(hash);
    const pick = (opts) => { let tot = 0; for (const o of opts) tot += o[1]; let r = R() * tot; for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; } return opts[0][0]; };
    const plate = pick(PLACE), outdoor = !!plate[3];
    // the time and the weather: one draw each outdoors (whatever the weights), none indoors
    const time = outdoor ? pick([['Morning', 22], ['Afternoon', 26], ['Golden hour', 22], ['Dusk', 17], ['Night', 13]]) : 'Lights on';
    if (outdoor) R();
    const dark = time === 'Dusk' || time === 'Night';
    const moment = pick([['None', 930], ['Photobomb', 55], ['Everyone waving', 30], ['Thumb', 18], ['Double exposure', 14], ['Starfall', outdoor && dark ? 16 : 0], ['Back to normal', 3]]);
    return [['Place', plate[0]], ['Moment', moment]];
  };
  root.PrintsOwnRolls = Object.freeze({ drop07: Object.freeze({ 1: humwhere }) });
})(typeof window !== 'undefined' ? window : globalThis);
