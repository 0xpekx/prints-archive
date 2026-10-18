// The stamp album's season (the founder's yes, 2026-10-17: Season 1, "First Post"). Plain data, hand-edited: the rules
// are in core.js (stamps), the pixel art in art/stamps-s1.js (made by server/tools/import-stamps.mjs).
//
// Inert until `start` is set: with start null nothing gives stamps, the Album stays hidden and nothing is stored, so
// this can be merged and deployed before the season begins (the way a drop's launch waits for its date).
//   start     day 1 of the season, 'YYYY-MM-DD' (a UTC day: days end at the shared midnight, as daily quests do)
//   days      how long it runs; at the end of the last day stamps stop moving and every album is postmarked
//   goldPost  the season days each Gold Post starts on (golds move only then, gold for gold): days 20-21 and 34-35 (the
//             founder: both Saturday-Sunday with a Monday start), and the Last Post on day 42, the final Sunday (the
//             founder, 2026-10-17). All three are announced on day 1. Any number of windows works (two or three).
//   goldLen   each window's length in days, in the same order (2 = 48 hours, 1 = 24 hours; missing: 2). A window
//             that ends on the season's last day is named the Last Post.
//   misprint  the season days of the Misprint weekend: envelopes earned on them (whenever they're opened), and pack
//             stamps and the Counter on them, have secrets at 5% of the high slot instead of 1% (uncommon 58% instead
//             of 62%; rare and gold unchanged). [] or missing: none. Announced on day 1 too.
// A test date can be set without editing this file: the server's config "stampsStart", or ?stamps=YYYY-MM-DD on the
// browser-only copy (?stamps=off clears it).
// pages: A to H, each a Drop 02 flavour (app.css .fl-a to .fl-h: c is its two anchors, frame the stamps' frame colour)
// and a Drop 03 (Amusements) set's theme.
window.PrintsSeason = {
  id: 1,
  name: 'First Post',
  start: '2026-10-19',
  days: 42,
  goldPost: [20, 34, 42],   // the founder, 2026-10-17: days 20-21 and 34-35 (Saturday-Sunday with a Monday start), and the Last Post on day 42
  goldLen: [2, 2, 1],       // 48 hours, 48 hours, and the Last Post's 24 hours (the founder, 2026-10-17)
  misprint: [27, 28],       // the Misprint weekend: the middle Saturday and Sunday
  pages: [
    { id: 'A', theme: 'Fairground', fl: 'a', c: ['#ff5f6d', '#ffc371'], frame: '#ff5f6d' },
    { id: 'B', theme: 'Rooftops', fl: 'b', c: ['#36d1dc', '#5b86e5'], frame: '#36d1dc' },
    { id: 'C', theme: 'Caravans', fl: 'c', c: ['#a8e063', '#56ab2f'], frame: '#56ab2f' },
    { id: 'D', theme: 'Backstage', fl: 'd', c: ['#c471f5', '#fa71cd'], frame: '#c471f5' },
    { id: 'E', theme: 'Outposts', fl: 'e', c: ['#f7971e', '#ffd200'], frame: '#f7971e' },
    { id: 'F', theme: 'Winter', fl: 'f', c: ['#43cea2', '#185a9d'], frame: '#43cea2' },
    { id: 'G', theme: 'Sprite Stacks', fl: 'g', c: ['#ff9a9e', '#a18cd1'], frame: '#a18cd1' },
    { id: 'H', theme: 'Lit Relief', fl: 'h', c: ['#f953c6', '#3a1c71'], frame: '#f953c6' },
  ],
};
