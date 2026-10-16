// Ink's mark: gem options drawn as SVG. Every facet is shaded by one light from the top left, on a
// gold topaz ramp (the founder's colour). GEMS.svg(id, uid) returns { w, h, svg }; uid keeps gradient
// ids apart when several gems sit in one page.
(() => {
  const RAMP = ['#4a2200', '#7a3d00', '#b36200', '#e58c00', '#ffae14', '#ffd23f', '#ffe98a', '#fffbe6'].map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)));
  function tone(t) {
    t = Math.max(0, Math.min(1, t)) * (RAMP.length - 1);
    const i = Math.min(RAMP.length - 2, Math.floor(t)), f = t - i;
    return '#' + RAMP[i].map((v, k) => Math.round(v + (RAMP[i + 1][k] - v) * f).toString(16).padStart(2, '0')).join('');
  }
  const LX = -0.62, LY = -0.78; // the light, from the top left
  const lit = (nx, ny, base, amt = 0.42) => { const n = Math.hypot(nx, ny) || 1; return base + amt * (nx / n * LX + ny / n * LY); };
  const pts = a => a.map(p => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' ');
  const poly = (a, fill, extra = '') => `<polygon points="${pts(a)}" fill="${fill}"${extra}/>`;
  const mid = a => [a.reduce((s, p) => s + p[0], 0) / a.length, a.reduce((s, p) => s + p[1], 0) / a.length];
  const inset = (a, k, c) => a.map(p => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]);
  const arc = (cx, cy, rx, ry, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]; });
  const RIM = 'stroke="#3a1a00" stroke-opacity=".55" stroke-width=".7" stroke-linejoin="round"';

  // a table (top face) with a soft gradient and a glint
  function table(a, id) {
    const xs = a.map(p => p[0]), ys = a.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
    const g = `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tone(0.96)}"/><stop offset=".5" stop-color="${tone(0.78)}"/><stop offset="1" stop-color="${tone(0.56)}"/></linearGradient>`;
    const sheen = [[x0 + w * 0.2, y0 + h * 0.42], [x0 + w * 0.46, y0 + h * 0.16], [x0 + w * 0.46, y0 + h * 0.3], [x0 + w * 0.2, y0 + h * 0.56]];
    return { defs: g, body: poly(a, `url(#${id})`) + poly(sheen, '#fff', ' opacity=".7"') };
  }
  // rings of facets between nested outlines, then the table in the middle
  function bevel(rings, c, uid, bases = [0.42, 0.56, 0.66]) {
    let body = '';
    for (let r = 0; r < rings.length - 1; r++) {
      const A = rings[r], B = rings[r + 1], n = A.length;
      for (let i = 0; i < n; i++) {
        const q = [A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]], m = mid(q);
        body += poly(q, tone(lit(m[0] - c[0], m[1] - c[1], bases[r] ?? 0.6)));
      }
    }
    const t = table(rings[rings.length - 1], uid + 't');
    return { defs: t.defs, body: body + t.body };
  }
  const wrap = (w, h, defs, body, outline) => ({ w, h, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 ${w + 2} ${h + 2}"><defs>${defs}</defs>${body}${outline ? `<polygon points="${pts(outline)}" fill="none" ${RIM}/>` : ''}</svg>` });

  const B = {
    // the current one, for comparison
    current(uid) {
      const o = [[10, 0], [20, 8], [20, 24], [10, 32], [0, 24], [0, 8]], c = [10, 16];
      const s = bevel([o, inset(o, 0.5, c)], c, uid, [0.5]);
      return wrap(20, 32, s.defs, s.body, o);
    },
    rupee(uid) {
      const o = [[10, 0], [20, 7.5], [20, 24.5], [10, 32], [0, 24.5], [0, 7.5]], c = [10, 16];
      const s = bevel([o, inset(o, 0.74, c), inset(o, 0.46, c)], c, uid);
      return wrap(20, 32, s.defs, s.body, o);
    },
    brilliant(uid) {
      const c = [16, 16], O = [], T = [];
      for (let k = 0; k < 8; k++) { const a = (k * 45 + 22.5) * Math.PI / 180, b = k * 45 * Math.PI / 180; O.push([16 + Math.cos(a) * 16, 16 + Math.sin(a) * 16]); T.push([16 + Math.cos(b) * 7.4, 16 + Math.sin(b) * 7.4]); }
      let body = '';
      for (let k = 0; k < 8; k++) {
        const A = [O[(k + 7) % 8], O[k], T[k]], S = [T[k], O[k], T[(k + 1) % 8]];
        const ma = mid(A), ms = mid(S);
        body += poly(A, tone(lit(ma[0] - 16, ma[1] - 16, 0.42, 0.46))) + poly(S, tone(lit(ms[0] - 16, ms[1] - 16, 0.7, 0.28)));
      }
      const t = table(T, uid + 't');
      return wrap(32, 32, t.defs, body + t.body, O);
    },
    drop(uid) {
      const c = [14, 21], o = [[14, 0], ...arc(14, 23, 13, 13, -50, 230, 14)];
      const s = bevel([o, inset(o, 0.74, c), inset(o, 0.5, c)], c, uid);
      return wrap(28, 36, s.defs, s.body, o);
    },
    emerald(uid) {
      const o = [[5, 0], [19, 0], [24, 5], [24, 29], [19, 34], [5, 34], [0, 29], [0, 5]], c = [12, 17];
      const s = bevel([o, inset(o, 0.84, c), inset(o, 0.68, c), inset(o, 0.52, c)], c, uid, [0.4, 0.5, 0.6]);
      return wrap(24, 34, s.defs, s.body, o);
    },
    marquise(uid) {
      const c = [10, 17], o = [...arc(0.55, 17, 19.45, 19.45, -60.9, 60.9, 6).slice(0, -1), ...arc(19.45, 17, 19.45, 19.45, 119.1, 240.9, 6).slice(0, -1)];
      const s = bevel([o, inset(o, 0.66, c), inset(o, 0.36, c)], c, uid);
      return wrap(20, 34, s.defs, s.body, o);
    },
    trillion(uid) {
      const o = [[16, 0], [24, 13], [32, 27], [16, 27.5], [0, 27], [8, 13]], c = [16, 18];
      const s = bevel([o, inset(o, 0.66, c), inset(o, 0.36, c)], c, uid);
      return wrap(32, 28, s.defs, s.body, o);
    },
    princess(uid) {
      const o = [[0, 0], [28, 0], [28, 28], [0, 28]], c = [14, 14], i1 = inset(o, 0.56, c);
      let s = bevel([o, i1], c, uid, [0.46]).body;
      // the middle as four chevrons meeting in the centre
      for (let k = 0; k < 4; k++) { const tri = [i1[k], i1[(k + 1) % 4], c], m = mid(tri); s += poly(tri, tone(lit(m[0] - 14, m[1] - 14, 0.74, 0.22))); }
      s += poly([[9, 12], [13, 8], [13, 10], [9, 14]], '#fff', ' opacity=".7"');
      return wrap(28, 28, '', s, o);
    },
    kite(uid) {
      const o = [[13, 0], [26, 11], [13, 34], [0, 11]], c = [13, 13];
      const s = bevel([o, inset(o, 0.66, c), inset(o, 0.34, c)], c, uid);
      return wrap(26, 34, s.defs, s.body, o);
    },
    octahedron() {
      const top = [12, 0], bot = [12, 34], l = [0, 15], r = [24, 15], f = [10.5, 17.5];
      const body = poly([top, l, f], tone(0.94)) + poly([top, f, r], tone(0.66)) + poly([l, bot, f], tone(0.48)) + poly([f, bot, r], tone(0.28))
        + `<polyline points="${pts([l, top, r])}" fill="none" stroke="#fffbe6" stroke-opacity=".8" stroke-width=".8" stroke-linejoin="round"/>` + poly([[5, 13], [11, 4.5], [11, 7.5], [6, 14.5]], '#fff', ' opacity=".6"');
      return wrap(24, 34, '', body, [top, r, bot, l]);
    },
    shard() { const s = shardBody(0, 0, 1); return wrap(20, 32, '', s.body, s.outline); },
    cluster() {
      const back1 = shardBody(0, 0, 0.72), back2 = shardBody(0, 0, 0.68), front = shardBody(0, 0, 1);
      const g = (s, tr, dim) => `<g transform="${tr}"${dim ? ' opacity=".92"' : ''}>${s.body}<polygon points="${pts(s.outline)}" fill="none" ${RIM}/></g>`;
      return wrap(34, 34, '', g(back1, 'translate(2 12) rotate(-28 7 11)', 1) + g(back2, 'translate(21 13) rotate(30 7 11)', 1) + g(front, 'translate(7 1)'), null);
    },
  };
  // a column of crystal seen from the side: three body faces and three facets at each end
  function shardBody(x, y, k) {
    const P = p => [x + p[0] * k, y + p[1] * k];
    const tA = P([10, 0]), bA = P([10, 32]), l0 = P([1, 7.5]), l1 = P([1, 24.5]), cl0 = P([6, 9.5]), cr0 = P([14, 9.5]), cl1 = P([6, 26.5]), cr1 = P([14, 26.5]), r0 = P([19, 7.5]), r1 = P([19, 24.5]);
    const body = poly([tA, l0, cl0], tone(0.98)) + poly([tA, cl0, cr0], tone(0.84)) + poly([tA, cr0, r0], tone(0.6))
      + poly([l0, cl0, cl1, l1], tone(0.8)) + poly([cl0, cr0, cr1, cl1], tone(0.6)) + poly([cr0, r0, r1, cr1], tone(0.36))
      + poly([l1, cl1, bA], tone(0.5)) + poly([cl1, cr1, bA], tone(0.36)) + poly([cr1, r1, bA], tone(0.2))
      + poly([P([2.6, 10]), P([4.4, 10.9]), P([4.4, 21]), P([2.6, 20])], '#fff', ' opacity=".55"');
    return { body, outline: [tA, r0, r1, bA, l1, l0] };
  }

  const LIST = [
    ['current', 'First rupee', 'the first version, for comparison'],
    ['rupee', 'Rupee, step cut', 'the same shape with two rows of facets and real lighting'],
    ['brilliant', 'Brilliant', 'a round cut seen from above, like a diamond'],
    ['drop', 'Ink drop', 'a pear cut shaped like a drop of ink'],
    ['emerald', 'Emerald cut', 'a long step cut, like a bar of gold glass'],
    ['marquise', 'Marquise', 'a narrow pointed oval'],
    ['trillion', 'Trillion', 'a triangle cut, reads well very small'],
    ['princess', 'Princess', 'a square brilliant with a chevron centre'],
    ['kite', 'Kite', 'a long diamond, sharp at the bottom'],
    ['octahedron', 'Octahedron', "a 3D crystal lit from the top left · the founder's pick"],
    ['shard', 'Crystal', 'a single column of crystal, like a raw rupee'],
    ['cluster', 'Cluster', 'three crystals growing together'],
  ];
  window.GEMS = {
    list: LIST.map(([id, name, note]) => ({ id, name, note })),
    svg: (id, uid = id) => (B[id] || B.current)(uid),
    url(id) { return "url('data:image/svg+xml," + encodeURIComponent(this.svg(id).svg).replace(/'/g, '%27') + "')"; },
    ar(id) { const g = this.svg(id); return (g.w + 2) / (g.h + 2); },
  };
})();
