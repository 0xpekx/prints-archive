// Set 2 · Textile: cloth, bead and tile crafts, which were pixel art long
// before screens: every stitch, knot or bead is one cell.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const CLOTH = [['Madder', ['#9b2226', '#ae2012', '#ca6702', '#ee9b00', '#e9d8a6', '#001219']], ['Indigo', ['#03045e', '#023e8a', '#0077b6', '#90e0ef', '#f1faee', '#e63946']], ['Earth', ['#3d2b1f', '#7f5539', '#b08968', '#ddb892', '#ede0d4', '#386641']], ['Kente', ['#f4c430', '#008000', '#c1121f', '#000000', '#fdf0d5', '#003049']]].map(([n, c]) => ({ name: n, cols: c.map(s => U.pk(U.hex(s))) }));
  // cloth colours: a traditional dye set, or one of the collection palettes
  const inkName = cols => { const p = U.PALETTES.find(pl => cols.every(c => pl.cols.some(q => U.pk(q) === c))); return p ? p.name : 'Spectrum'; };
  // for traits: the dye set a list of cloth colours came from
  const dyeName = cols => { const c = CLOTH.find(cl => cols.every(v => cl.cols.includes(v))); return c ? c.name : inkName(cols); };
  const once = (g, name, v) => { if (!g.traits.some(t => t[0] === name)) g.trait(name, v); };
  const dyes = (R, k = 6) => (R.bool(0.55) ? R.pick(CLOTH).cols.slice(0, k) : X.inks(R, k, 0.3));

  // A sampler's small stitched alphabet, three stitches wide and five tall (rows, bit 4 = left),
  // for words too long for the big letters, and for the year at the foot.
  const TINY = { A: [2, 5, 7, 5, 5], B: [6, 5, 6, 5, 6], C: [3, 4, 4, 4, 3], E: [7, 4, 6, 4, 7], H: [5, 5, 7, 5, 5], J: [1, 1, 1, 5, 2], L: [4, 4, 4, 4, 7], M: [5, 7, 7, 5, 5], N: [6, 5, 5, 5, 5], O: [2, 5, 5, 5, 2], P: [6, 5, 6, 4, 4], R: [6, 5, 6, 5, 5], S: [3, 4, 2, 1, 6], T: [7, 2, 2, 2, 2], U: [5, 5, 5, 5, 7], V: [5, 5, 5, 5, 2], Y: [5, 5, 2, 2, 2], 0: [7, 5, 5, 5, 7], 1: [2, 6, 2, 2, 7], 2: [6, 1, 2, 4, 7], 3: [6, 1, 2, 1, 6], 4: [5, 5, 7, 1, 1], 5: [7, 4, 6, 1, 6], 6: [3, 4, 6, 5, 2], 7: [7, 1, 2, 2, 2], 8: [2, 5, 2, 5, 2], 9: [2, 5, 3, 1, 6] };
  function tinyText(view, str, x, y, c) {
    for (let k = 0; k < str.length; k++) { const rows = TINY[str[k]]; if (!rows) continue; for (let r = 0; r < 5; r++) for (let b = 0; b < 3; b++) if (rows[r] >> (2 - b) & 1) { const xx = x + k * 4 + b, yy = y + r; if (xx >= 0 && yy >= 0 && xx < view.n && yy < view.n) view.d[yy * view.n + xx] = c; } }
  }
  // the sampler's lettering: the big alphabet when the word fits inside the border, the small
  // one when it does not, then the motifs, then the year it was finished
  function samplerLayout(R, alt, view, M, word, cols) {
    const wc = R.pick(cols);
    if (X.textWidth(word) <= M - 8) X.text(view, word, Math.round((M - X.textWidth(word)) / 2), 4, wc);
    else tinyText(view, word, Math.round((M - (word.length * 4 - 1)) / 2), 5, wc);
    return 11;
  }

  P.addPixel({
    name: 'Sampler', seed: 1, fam: 'Textile', sizes: [100], fps: 12,
    recipe: 'A cross-stitch sampler worked stitch by stitch on even-weave cloth: a border, a row of mirrored motifs, a word in a stitched alphabet, and the year it was finished.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, C = 4, M = n / C, cloth = R.pick([0xffd8ecf2, 0xffc8dce8, 0xffe8f0f4, 0xffb8d0dc]), hole = X.shade(cloth, 0.82), cols = dyes(R, 6).filter(c => X.lum(c) < 0.8);
      let stitches, k, done;
      const plan = () => {
        stitches = []; k = 0; done = 0;
        const add = (x, y, c) => { if (x >= 0 && y >= 0 && x < M && y < M) stitches.push([x, y, c]); };
        const bc = R.pick(cols);
        for (let i = 1; i < M - 1; i++) { const z = i % 4 < 2; add(i, 1 + (z ? 0 : 1), bc); add(i, M - 2 - (z ? 0 : 1), bc); add(1 + (z ? 0 : 1), i, bc); add(M - 2 - (z ? 0 : 1), i, bc); }
        const view = { n: M, d: new Uint32Array(M * M) }, word = R.pick(['LOVE', 'HOME', 'JOY', 'HOPE', 'ART', 'SEEN', 'HUE']);
        const my = samplerLayout(R, g.alt, view, M, word, cols);
        once(g, 'Word', word); once(g, 'Cloth', ['Ice', 'Mist', 'Linen', 'Slate'][[0xffd8ecf2, 0xffc8dce8, 0xffe8f0f4, 0xffb8d0dc].indexOf(cloth)]); once(g, 'Threads', dyeName(cols)); once(g, 'Lettering', X.textWidth(word) <= M - 8 ? 'Large' : 'Small');
        for (let j = 0; j < 2; j++) { const spr = X.mirrorSprite(R, 5, 5, 0.6, 0.2), c1 = R.pick(cols), c2 = R.pick(cols), x0 = j ? M - 9 : 4; for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) if (spr[y][x]) view.d[(my + y) * M + x0 + x] = spr[y][x] === 2 ? c2 : c1; }
        { const spr = X.mirrorSprite(R, 7, 5, 0.55, 0.15), c1 = R.pick(cols); for (let y = 0; y < 5; y++) for (let x = 0; x < 7; x++) if (spr[y][x]) view.d[(my + y) * M + 9 + x] = c1; }
        tinyText(view, String(1780 + Math.floor(g.alt() * 120)), Math.round((M - 15) / 2), my + 6, g.alt.pick(cols));
        for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) if (view.d[y * M + x]) add(x, y, view.d[y * M + x]);
      };
      plan();
      k = Math.floor(stitches.length * 0.45);   // open part-way through, with the border and lettering under way
      return () => {
        if (k >= stitches.length) { if (++done > 110) plan(); } else k = Math.min(stitches.length, k + 6);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = x % C === 0 && y % C === 0 ? hole : cloth;
        for (let s = 0; s < k; s++) {
          const [sx, sy, c] = stitches[s], x0 = sx * C, y0 = sy * C, dark = X.shade(c, 0.7);
          for (let q = 0; q < C; q++) { X.put(g, x0 + q, y0 + q, c); X.put(g, x0 + C - 1 - q, y0 + q, q < C / 2 ? c : dark); }
        }
        if (k < stitches.length) { const [sx, sy] = stitches[k]; X.line(g, sx * C + 2, sy * C + 2, sx * C + 8, sy * C - 6, 0xffc0c0c0); }
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, C = 4, M = n / C, cloth = R.pick([0xffd8ecf2, 0xffc8dce8, 0xffe8f0f4, 0xffb8d0dc]), hole = X.shade(cloth, 0.82), cols = dyes(R, 6).filter(c => X.lum(c) < 0.8);
      let stitches, k, done;
      const plan = () => {
        stitches = []; k = 0; done = 0;
        const add = (x, y, c) => { if (x >= 0 && y >= 0 && x < M && y < M) stitches.push([x, y, c]); };
        const bc = R.pick(cols);
        for (let i = 1; i < M - 1; i++) { const z = i % 4 < 2; add(i, 1 + (z ? 0 : 1), bc); add(i, M - 2 - (z ? 0 : 1), bc); add(1 + (z ? 0 : 1), i, bc); add(M - 2 - (z ? 0 : 1), i, bc); }
        k = stitches.length;   // the border is already worked
        const view = { n: M, d: new Uint32Array(M * M) }, word = R.pick(['LOVE', 'HOME', 'JOY', 'HOPE', 'ART', 'SEEN', 'HUE', 'SENSE', 'PEACE', 'TONE', 'ECHO', 'BLOOM']);
        const my = samplerLayout(R, g.alt, view, M, word, cols);
        once(g, 'Word', word); once(g, 'Cloth', ['Ice', 'Mist', 'Linen', 'Slate'][[0xffd8ecf2, 0xffc8dce8, 0xffe8f0f4, 0xffb8d0dc].indexOf(cloth)]); once(g, 'Threads', dyeName(cols)); once(g, 'Lettering', X.textWidth(word) <= M - 8 ? 'Large' : 'Small');
        for (let j = 0; j < 2; j++) { const spr = X.mirrorSprite(R, 5, 5, 0.6, 0.2), c1 = R.pick(cols), c2 = R.pick(cols), x0 = j ? M - 9 : 4; for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) if (spr[y][x]) view.d[(my + y) * M + x0 + x] = spr[y][x] === 2 ? c2 : c1; }
        { const spr = X.mirrorSprite(R, 7, 5, 0.55, 0.15), c1 = R.pick(cols); for (let y = 0; y < 5; y++) for (let x = 0; x < 7; x++) if (spr[y][x]) view.d[(my + y) * M + 9 + x] = c1; }
        tinyText(view, String(1780 + Math.floor(g.alt() * 120)), Math.round((M - 15) / 2), my + 6, g.alt.pick(cols));
        for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) if (view.d[y * M + x]) add(x, y, view.d[y * M + x]);
      };
      plan();
      return () => {
        if (k >= stitches.length) { if (++done > 110) plan(); } else k = Math.min(stitches.length, k + 12);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = x % C === 0 && y % C === 0 ? hole : cloth;
        for (let s = 0; s < k; s++) {
          const [sx, sy, c] = stitches[s], x0 = sx * C, y0 = sy * C, dark = X.shade(c, 0.7);
          for (let q = 0; q < C; q++) { X.put(g, x0 + q, y0 + q, c); X.put(g, x0 + C - 1 - q, y0 + q, q < C / 2 ? c : dark); }
        }
        if (k < stitches.length) { const [sx, sy] = stitches[k]; X.line(g, sx * C + 2, sy * C + 2, sx * C + 8, sy * C - 6, 0xffc0c0c0); }
      };
      }

    },
  });

  P.addPixel({
    name: 'Kilim', fam: 'Textile', sizes: [80, 100], fps: 12,
    recipe: 'A flat-woven rug built up row by row on the loom: stepped diamonds nested in bands of colour, with hooked borders, symmetric in both directions as kilim weavers work them.',
    make(R, U, g) {
      const { n, d } = g, cols = dyes(R, 6);
      let rug, row, hold;
      const design = () => {
        rug = new Uint32Array(n * n); row = 0; hold = 0;
        const B = Math.round(n * 0.1), field = R.pick(cols), k = R.int(3, 5), bands = R.shuffle(cols.slice()).slice(0, k), hook = R.int(2, 4), stack = R.int(1, 3);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const fx = Math.abs(x - n / 2 + 0.5), fy = Math.abs(y - n / 2 + 0.5);
          let c;
          if (fx > n / 2 - B || fy > n / 2 - B) {
            const bx = Math.min(n / 2 - fx, n / 2 - fy), along = Math.max(fx, fy);
            c = bx < 2 ? cols[0] : ((Math.floor(along / 4) + Math.floor(bx / 3)) & 1) ? cols[1] : cols[2];
            if (bx > 3 && bx < B - 2 && (Math.abs((along % 8) - 4) + Math.abs(bx - B / 2)) < 3) c = cols[3];
          } else {
            const cyc = (n - 2 * B) / stack, ly = Math.abs(((y - B) % cyc) - cyc / 2), dist = fx + ly * 1.15, ring = Math.floor(dist / hook);
            c = ring < k * 2 ? bands[ring % k] : field;
            if (ring >= k * 2 && ((fx + fy) % 6 < 1)) c = X.shade(field, 0.8);
          }
          rug[y * n + x] = c;
        }
      };
      design();
      return () => {
        if (row < n) row = Math.min(n, row + 1); else if (++hold > 50) design();
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const yy = n - 1 - y, i = yy * n + x;
          d[i] = y < row ? (x % 2 === yy % 2 ? rug[i] : X.shade(rug[i], 0.9)) : (x % 3 === 0 ? 0xffc8d0d8 : 0xff1a1a1a);
        }
        if (row < n) X.rect(g, 0, n - 1 - row, n, 1, 0xffe0e0e0);
      };
    },
  });

  P.addPixel({
    name: 'Fair Isle', seed: 1, fam: 'Textile', sizes: [80, 100], fps: 12,
    recipe: 'Knitting that grows as you watch: bands of small and large motifs, never more than two colours in a row, each stitch drawn as the little V a knitted stitch makes.',
    make(R, U, g) {
      const { n, d } = g, S = g.home ? 4 : g.alt.pick([4, 4, 5]), M = n / S, cols = dyes(R, 6), rows = [];
      g.trait('Dyes', dyeName(cols)); g.trait('Colours', new Set(cols).size); g.trait('Stitch', S === 5 ? 'Chunky' : 'Fine'); g.trait('Grid', n);
      const band = () => {
        const h = R.pick([3, 5, 7, 9, 11]), w = R.pick([4, 6, 8, 10, 12]), bg = R.pick(cols), fg = R.pick(cols.filter(c => c !== bg)), out = [];
        const motif = Array.from({ length: h }, () => new Uint8Array(w));
        for (let y = 0; y < (h + 1) >> 1; y++) for (let x = 0; x < (w + 1) >> 1; x++) {
          const on = R() < 0.45 || Math.abs(x - (w >> 1) + 0.5) + Math.abs(y - (h >> 1)) === (h >> 1) - 0;
          motif[y][x] = motif[y][w - 1 - x] = motif[h - 1 - y][x] = motif[h - 1 - y][w - 1 - x] = on ? 1 : 0;
        }
        for (let y = 0; y < h; y++) out.push(Array.from({ length: M }, (_, x) => (motif[y][x % w] ? fg : bg)));
        out.push(Array.from({ length: M }, () => bg));
        return out;
      };
      while (rows.length < M + 2) rows.push(...band());
      let off = 0;
      return () => {
        off++;
        if (off >= S) { off = 0; rows.shift(); while (rows.length < M + 2) rows.push(...band()); }
        for (let y = 0; y < n; y++) {
          const ry = Math.floor((y + off) / S), sy = (y + off) % S, row = rows[ry];
          // each stitch is the little V a knitted stitch makes: two legs leaning in to meet at the
          // bottom, the left leg catching the light, darker yarn showing between them
          const v = S - 1 - sy;
          for (let x = 0; x < n; x++) {
            const sx = x % S, c = row[Math.floor(x / S)];
            const leg = v === 0 ? (sx === 0 ? 1 : sx === S - 1 ? 2 : 0) : v === 1 ? (sx < 2 ? 1 : 2) : (sx === 1 ? 1 : sx === 2 ? 2 : 0);
            d[(n - 1 - y) * n + x] = leg === 1 ? X.mixPk(c, WHITE, 0.14) : leg === 2 ? c : X.shade(c, 0.68);
          }
        }
      };
    },
  });

  P.addPixel({
    name: 'Peyote', fam: 'Textile', sizes: [80, 100], fps: 12,
    recipe: 'Beads stitched in the peyote pattern, every other column dropped half a bead, picking up a design of chevrons and diamonds one bead at a time.',
    make(R, U, g) {
      const { n, d } = g, BW = 4, BH = 5, cols = dyes(R, 6), C = Math.floor(n / BW), Rw = Math.floor(n / BH) + 1;
      g.trait('Dyes', dyeName(cols)); g.trait('Grid', n);
      let beads, k, hold;
      const design = () => {
        k = 0; hold = 0;
        let kind = R.int(0, 2); const f1 = R.range(0.5, 1.2), cyc = R.int(5, 9);
        if (!g.home && g.alt() < 0.25) kind = 3;   // rarely, rings from the centre (second stream)
        once(g, 'Pattern', ['Chevrons', 'Waves', 'Diamonds', 'Rings'][kind]); once(g, 'Repeat', cyc);
        beads = [];
        for (let r = 0; r < Rw; r++) for (let c = 0; c < C; c++) {
          const x = Math.abs(c - C / 2 + 0.5), y = r + (c & 1) * 0.5;
          const v = kind === 3 ? Math.floor(Math.hypot(x, (y - Rw / 2) * 0.9) / 1.6) : kind === 0 ? Math.floor((x + y) / 2) : kind === 1 ? Math.floor((Math.abs(((y * f1) % (cyc * 2)) - cyc) + x) / 2) : Math.floor(Math.max(x, Math.abs((y % (cyc * 2)) - cyc)) / 1.5);
          beads.push([c, r, cols[v % cols.length]]);
        }
        beads.sort((a, b) => a[1] - b[1] || (a[1] & 1 ? b[0] - a[0] : a[0] - b[0]));
      };
      design();
      k = Math.floor(beads.length * 0.6);   // open with the work well under way
      return () => {
        if (k < beads.length) k = Math.min(beads.length, k + 8); else if (++hold > 90) design();
        d.fill(0xff181818);
        for (let s = 0; s < k; s++) {
          const [c, r, col] = beads[s], x0 = c * BW, y0 = n - (r + 1) * BH - (c & 1 ? (BH >> 1) : 0);
          X.rect(g, x0, y0 + 1, BW - 1, BH - 2, col); X.rect(g, x0 + 1, y0, BW - 3, BH, col);
          X.put(g, x0 + 1, y0 + 1, X.mixPk(col, WHITE, 0.6)); X.put(g, x0 + BW - 2, y0 + BH - 2, X.shade(col, 0.6));
        }
      };
    },
  });

  P.addPixel({
    name: 'Ikat', fam: 'Textile', sizes: [80, 100, 200], fps: 12,
    recipe: 'Cloth whose threads were tie-dyed before weaving: every thread carries the pattern a little out of step with its neighbour, so each edge is feathered, and the cloth slowly rolls past.',
    make(R, U, g) {
      const { n, d } = g, cols = dyes(R, 5), ground = cols[0], k = R.int(2, 4), slip = new Int16Array(n), period = Math.round(n * R.range(0.5, 0.8)), width = R.range(0.25, 0.4);
      for (let x = 0; x < n; x++) slip[x] = Math.round(R.gauss() * 2.2 + Math.sin(x * 0.15) * 1.5);
      const motif = (x, y) => {
        const u = (x / n) * k % 1 - 0.5, v = ((y % period) + period) % period / period - 0.5, dia = Math.abs(u) / width + Math.abs(v) * 2;
        if (dia < 0.5) return cols[3 % cols.length];
        if (dia < 0.8) return cols[2 % cols.length];
        if (dia < 1 && Math.abs(v) < 0.4) return cols[1];
        return Math.abs(u) > 0.46 ? cols[4 % cols.length] : ground;
      };
      return t => {
        const off = Math.floor(t * 4);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const c = motif(x, y + off + slip[x]); d[y * n + x] = (y & 1) ? X.shade(c, 0.88) : c; }
      };
    },
  });

  P.addPixel({
    name: 'Quilt', fam: 'Textile', sizes: [80, 100, 200], fps: 12,
    recipe: 'A patchwork quilt pieced block by block from a few printed fabrics: half-square triangles, flying geese and four-patches, turned so the blocks join up into larger figures.',
    make(R, U, g) {
      const { n, d } = g, cols = dyes(R, 6), B = n >= 200 ? 25 : n === 100 ? 20 : 16, M = n / B;
      g.trait('Fabrics', dyeName(cols)); g.trait('Blocks', M + 'x' + M);
      const fabric = (c, kind) => (x, y) => (kind === 0 ? c : kind === 1 ? ((x + y) % 4 === 0 ? X.mixPk(c, WHITE, 0.35) : c) : kind === 2 ? (y % 3 === 0 ? X.shade(c, 0.8) : c) : ((x % 4 === 1 && y % 4 === 1) ? X.shade(c, 0.6) : c));
      const fabrics = cols.map((c, i) => fabric(c, i % 4));
      let blocks, k, hold, old = null;
      const plan = () => {
        k = 0; hold = 0;
        if (blocks) old = blocks;   // the finished quilt stays under the new one until it is covered
        const kind = R.int(0, 2), a = R.int(0, 5), b = (a + R.int(1, 5)) % 6, c = (a + R.int(1, 5)) % 6, rot = R.int(0, 3);
        once(g, 'Block', ['Half squares', 'Flying geese', 'Four-patch'][kind]); once(g, 'Turn', ['North', 'East', 'South', 'West'][rot]);
        blocks = [];
        for (let j = 0; j < M; j++) for (let i = 0; i < M; i++) blocks.push({ i, j, kind, a, b, c, r: (rot + (kind === 0 ? (i + j) % 4 : (i % 2) * 2 + (j % 2))) % 4 });
        R.shuffle(blocks);
      };
      plan();
      k = Math.floor(blocks.length * 0.6);   // open with most of the quilt pieced
      const shapeAt = (bl, u, v) => {
        for (let q = 0; q < bl.r; q++) [u, v] = [v, 1 - u];
        if (bl.kind === 0) return u + v < 1 ? bl.a : bl.b;
        if (bl.kind === 1) return v < 0.5 ? (Math.abs(u - 0.5) < v ? bl.a : bl.b) : (Math.abs(u - 0.5) < v - 0.5 ? bl.c : bl.b);
        return (u < 0.5) === (v < 0.5) ? bl.a : (u - 0.25) ** 2 + (v - 0.75) ** 2 < 0.03 || (u - 0.75) ** 2 + (v - 0.25) ** 2 < 0.03 ? bl.c : bl.b;
      };
      // seams sunk a shade into the cloth, with a running stitch of light thread along them
      const piece = bl => {
        for (let y = 0; y < B; y++) for (let x = 0; x < B; x++) {
          const px = bl.i * B + x, py = bl.j * B + y, seam = x === 0 || y === 0, c = fabrics[shapeAt(bl, (x + 0.5) / B, (y + 0.5) / B) % fabrics.length](px, py);
          d[py * n + px] = seam ? ((px + py) % 3 === 0 ? 0xffd8e0e8 : X.shade(c, 0.66)) : c;
        }
      };
      return () => {
        if (k < blocks.length) k++; else if (++hold > 50) plan();
        d.fill(0xff2a2a2a);
        if (old) for (const bl of old) piece(bl);
        for (let s = 0; s < k; s++) piece(blocks[s]);
      };
    },
  });

  P.addPixel({
    name: 'Mola', fam: 'Textile', sizes: [80, 100], fps: 10,
    recipe: 'Reverse appliqué: layers of bright cloth cut through so every shape is ringed by narrow channels of the colours beneath, and the dye layers slowly trade places.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, cols = X.inks(R, 5, 0.25), lines = BLACK, shape = new Uint8Array(N);
      const spr = X.mirrorSprite(R, 9, 9, 0.6, 0), sc = Math.floor(n * 0.62 / 9), ox = (n - 9 * sc) >> 1;
      for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) if (spr[y][x]) for (let v = 0; v < sc; v++) for (let u = 0; u < sc; u++) shape[(ox + y * sc + v) * n + ox + x * sc + u] = 1;
      for (let k = 0; k < 6; k++) { const cx = R.int(0, n - 1), cy = R.int(0, n - 1), r = R.range(3, 7) * n / 100; for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y < r * r && cx + x >= 0 && cx + x < n && cy + y >= 0 && cy + y < n && !shape[(cy + y) * n + cx + x]) shape[(cy + y) * n + cx + x] = 2; }
      // distance to the nearest edge between regions, by breadth-first passes
      const dist = new Uint16Array(N).fill(999), q = [];
      for (let i = 0; i < N; i++) { const x = i % n; if ([i - 1, i + 1, i - n, i + n].some(j => j >= 0 && j < N && Math.abs((j % n) - x) <= 1 && shape[j] !== shape[i])) { dist[i] = 0; q.push(i); } }
      for (let h = 0; h < q.length; h++) { const i = q[h], x = i % n; for (const j of [i - 1, i + 1, i - n, i + n]) if (j >= 0 && j < N && Math.abs((j % n) - x) <= 1 && dist[j] > dist[i] + 1) { dist[j] = dist[i] + 1; q.push(j); } }
      const w = R.pick([2, 3]);
      return t => {
        const sh = Math.floor(t * 0.6);
        for (let i = 0; i < N; i++) {
          const dd = dist[i], band = Math.floor(dd / w);
          d[i] = dd % w === 0 && band < 6 ? lines : band >= 6 ? cols[(shape[i] * 2 + sh) % cols.length] : cols[(band + shape[i] + sh) % cols.length];
        }
      };
    },
  });

  P.addPixel({
    name: 'Kente', fam: 'Textile', sizes: [80, 100, 200], fps: 12,
    recipe: 'Narrow woven strips sewn edge to edge, each alternating bands of warp stripes with blocks of weft pattern, the strips drifting past one another as the cloth is turned.',
    make(R, U, g) {
      const { n, d } = g, cloth = R.bool(0.6), cols = cloth ? CLOTH[3].cols : X.inks(R, 6, 0.3).slice(), SW = n >= 200 ? 20 : n >= 100 ? 10 : 8, S = Math.ceil(n / SW);
      const clothName = cloth ? 'Kente' : inkName(cols);
      // palette rolls often came out all one value (lime on cyan on yellow): sink the two darkest
      // inks so every roll has darks to weave against, the way kente's black and green do
      if (!cloth) { const order = cols.map((c, i) => [X.lum(c), i]).sort((a, b) => a[0] - b[0]); cols[order[0][1]] = X.shade(cols[order[0][1]], 0.3); cols[order[1][1]] = X.shade(cols[order[1][1]], 0.62); }
      const panel = g.home ? 'Medium' : g.alt.pick(['Medium', 'Medium', 'Short', 'Long']), pk = panel === 'Short' ? 0.6 : panel === 'Long' ? 1.6 : 1;
      const strips = Array.from({ length: S }, (_, s) => {
        const stripes = Array.from({ length: SW }, (_, x) => cols[[0, 1, 0, 3, 2, 3, 0, 1][(x + s) % 8] % cols.length]), blockH = R.int(8, 16) * n / 100 | 0, bandH = R.int(10, 20) * n / 100 | 0, pat = R.int(0, 2), a = R.pick(cols), b = R.pick(cols);
        return { stripes, blockH: Math.max(3, Math.round(blockH * pk)), bandH: Math.max(3, Math.round(bandH * pk)), pat, a, b, v: (s & 1 ? 1 : -1) * R.range(0.8, 1.6) };
      });
      g.trait('Cloth', clothName); g.trait('Strip width', SW === 20 ? 'Wide' : SW === 10 ? 'Medium' : 'Narrow'); g.trait('Panels', panel); g.trait('Weft blocks', strips.filter(st => st.pat === 2).length > S / 3 ? 'Diamonds' : 'Checks'); g.trait('Grid', n);
      return t => {
        for (let s = 0; s < S; s++) {
          const st = strips[s], off = Math.floor(t * st.v * 3), per = st.blockH + st.bandH;
          for (let y = 0; y < n; y++) {
            const yy = ((y + off) % per + per) % per;
            for (let x = 0; x < SW && s * SW + x < n; x++) {
              let c;
              if (yy < st.bandH) c = st.stripes[x];
              else { const u = x, v = yy - st.bandH; c = st.pat === 0 ? (((u >> 1) + (v >> 1)) & 1 ? st.a : st.b) : st.pat === 1 ? (v % 4 < 2 ? st.a : u % 3 === 0 ? st.b : st.a) : (Math.abs(u - SW / 2 + 0.5) + Math.abs(v - st.blockH / 2) < st.blockH / 3 ? st.b : st.a); }
              d[y * n + s * SW + x] = x === 0 ? X.shade(c, 0.6) : (y & 1) && yy < st.bandH ? X.shade(c, 0.9) : c;
            }
          }
        }
      };
    },
  });

  P.addPixel({
    name: 'Tesserae', fam: 'Textile', sizes: [100, 200], fps: 10,
    recipe: 'A floor mosaic: small stones of slightly uneven size set in grout, each one a single colour sampled from the picture it belongs to, a sun whose rays slowly turn.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, T = n >= 200 ? 5 : 3.4, M = Math.ceil(n / T), seeds = [], owner = new Int32Array(N), grout = new Uint8Array(N), cols = dyes(R, 6);
      for (let j = 0; j < M; j++) for (let i = 0; i < M; i++) seeds.push([(i + 0.5 + R.range(-0.3, 0.3)) * T, (j + 0.5 + R.range(-0.3, 0.3)) * T, R.range(0.85, 1.12)]);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const gi = Math.floor(x / T), gj = Math.floor(y / T);
        let best = -1, b1 = 1e9, b2 = 1e9;
        for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
          const ii = gi + di, jj = gj + dj; if (ii < 0 || jj < 0 || ii >= M || jj >= M) continue;
          const s = seeds[jj * M + ii], dd = Math.max(Math.abs(x + 0.5 - s[0]), Math.abs(y + 0.5 - s[1]));
          if (dd < b1) { b2 = b1; b1 = dd; best = jj * M + ii; } else if (dd < b2) b2 = dd;
        }
        owner[y * n + x] = best; grout[y * n + x] = b2 - b1 < 0.9 ? 1 : 0;
      }
      // the sun takes the lightest, warmest colours of the set and the ground rings the darkest, so it
      // always reads as a sun (the plain index order once gave a black sun with red rays)
      const warm = c => X.lum(c) + ((c & 255) - (c >> 16 & 255)) / 255 * 0.3, byWarm = cols.slice(0, 6).sort((a, b) => warm(b) - warm(a)), byLum = cols.slice(0, 6).sort((a, b) => X.lum(a) - X.lum(b));
      const rays = R.int(8, 16), groutC = 0xffb8c8d0, sunA = byWarm[0], sunB = byWarm[1] === sunA ? byWarm[2] : byWarm[1], bgA = byLum[0] === sunA || byLum[0] === sunB ? byLum[2] : byLum[0], bgB = byLum[1] === sunA || byLum[1] === sunB ? byLum[2] : byLum[1], tone = seeds.map(() => R.range(0.88, 1.06));
      g.trait('Rays', rays); g.trait('Dyes', dyeName(cols)); g.trait('Stones', T > 4 ? 'Small' : 'Large'); g.trait('Grid', n);
      const motif = g.home ? 'Sun' : g.alt.pick(['Sun', 'Sun', 'Rosette', 'Spiral']);
      g.trait('Motif', motif);
      const picture = (u, v, t) => {
        const dx = u - 0.5, dy = v - 0.5, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx) + t * 0.08;
        if (r < 0.18) return r < 0.14 ? sunA : sunB;
        if (motif === 'Rosette' && r < 0.43) return r < 0.2 + 0.2 * Math.abs(Math.cos(a * rays / 2)) ? (r < 0.3 ? sunB : sunA) : r > 0.4 ? BLACK : bgA;
        if (motif === 'Spiral' && r < 0.43) return r > 0.4 ? BLACK : (Math.floor(a / U.TAU * 3 + r * 9) & 1 ? bgA : r < 0.26 ? sunB : bgB);
        if (r < 0.4 && (Math.floor(a / U.TAU * rays * 2) & 1) && r < 0.22 + 0.18 * (1 - Math.abs(((a / U.TAU * rays) % 1) - 0.5) * 2)) return sunB;
        if (r > 0.46) return (Math.floor((u + v) * 8) & 1) ? cols[4 % cols.length] : cols[5 % cols.length];
        return r > 0.43 ? BLACK : (Math.floor(r * 30) & 1 ? bgA : bgB);
      };
      return t => {
        const tc = seeds.map((s, i) => X.shade(picture(s[0] / n, s[1] / n, t), tone[i]));
        for (let i = 0; i < N; i++) d[i] = grout[i] ? groutC : tc[owner[i]];
      };
    },
  });

  P.addPixel({
    name: 'Knotwork', fam: 'Textile', sizes: [80, 100, 200], fps: 12,
    recipe: 'Interlace in the insular style: ribbons running on the diagonals of a grid, passing over and under in strict alternation and turning back at the borders, with colour flowing along them.',
    make(R, U, g) {
      const { n, d } = g, M = n >= 200 ? R.pick([8, 10]) : R.pick([4, 5]), T = n / M, inks = X.inks(R, 4, 0.4), ground = X.shade(inks[0], 0.12), rib = g.home ? 'Medium' : g.alt.pick(['Medium', 'Medium', 'Narrow', 'Broad']), w = Math.max(2, Math.round(T * (rib === 'Narrow' ? 0.2 : rib === 'Broad' ? 0.34 : 0.28)));
      const ramp = X.rampPk(inks, 48, true);
      g.trait('Panels', M + 'x' + M); g.trait('Palette', inkName(inks)); g.trait('Ribbon', rib); g.trait('Weave', T > 20 ? 'Large' : 'Small'); g.trait('Grid', n);
      return t => {
        d.fill(ground);
        // Every pixel measures its distance to the two families of diagonal lines across the whole
        // panel. Ribbons cross at every tile centre and every tile corner, and those alternate along
        // each ribbon, so putting one family on top at centres and the other at corners gives the
        // strict over-and-under; the ribbon underneath is cut just short of the one on top.
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = Math.floor(x / T), j = Math.floor(y / T);
          const a = (((x - y) % T) + T) % T, b = (x + y + 1) % T, dA = Math.min(a, T - a), dB = Math.min(b, T - b);
          const onA = dA < w, onB = dB < w;
          if (!onA && !onB) continue;
          const aOver = (Math.round((x - y) / T) + Math.round((x + y + 1) / T)) & 1, which = onA && onB ? (aOver ? 'A' : 'B') : onA ? 'A' : 'B';
          if (!(onA && onB) && (which === 'B' ? aOver && dA < w + 1.2 : !aOver && dB < w + 1.2)) { d[y * n + x] = BLACK; continue; }
          if (i === 0 || j === 0 || i === M - 1 || j === M - 1) {
            // turn back at the border: keep only the diagonal that points inward
            const inA = (i === 0 && j === 0) || (i === M - 1 && j === M - 1), inB = (i === M - 1 && j === 0) || (i === 0 && j === M - 1);
            if ((inA && which === 'B') || (inB && which === 'A')) continue;
          }
          const dd = which === 'A' ? dA : dB;
          const c = ramp[((Math.floor((which === 'A' ? x + y : x - y + n) / 3 - t * 8) % 48) + 48) % 48];
          d[y * n + x] = dd > w - 1 ? BLACK : dd < 1 ? X.mixPk(c, WHITE, 0.35) : c;
        }
      };
    },
  });
})();
