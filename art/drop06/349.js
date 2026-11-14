// Dust Plume: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/349.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ft){ft&&function(){"use strict";const N=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,jt=N+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",dt=896,ut=640,xe=256,mt=1600,xt=1280,ie=16,Re=1,Ut=.32,B=10,Ce=12,je=69;function vt(e,o,t){let r=Math.imul(e>>>0,1664525)+1013904223>>>0,s=Math.imul(o>>>0,1664525)+1013904223>>>0,l=Math.imul(t>>>0,1664525)+1013904223>>>0;return r=r+Math.imul(s,l)>>>0,s=s+Math.imul(l,r)>>>0,l=l+Math.imul(r,s)>>>0,r=(r^r>>>16)>>>0,s=(s^s>>>16)>>>0,l=(l^l>>>16)>>>0,r=r+Math.imul(s,l)>>>0,s=s+Math.imul(l,r)>>>0,l=l+Math.imul(r,s)>>>0,((r^s^l)>>>8)/16777216}const et=(e,o,t)=>{const r=Math.min(Math.max((t-e)/(o-e),0),1);return r*r*(3-2*r)};function Ht(e,o,t){const r=Math.fround,s=e[5],l=e[6],f=e[7],p=e[8],ee=e[9],le=e[12],Ge=e[13],D=e[14],P=e[15],Oe=e[16],we=e[17],ye=e[18],te=e[19],V=e[33],Me=e[34],n=e[35],Ve=(X,m,u)=>{const Y=1+.12*Math.sin(u/31+1.7);let w=p*Y,b=ee*Y;const C=Math.floor((u-P)/D);for(let W=0;W<2;W++){const K=C-W,A=K*D+P,Z=(K|0)+4096;let M=Oe+ye*(u-A),Q=we+te*(u-A);K!==0&&(M+=160*(vt(Z,3,1)-.5),Q+=160*(vt(Z,3,2)-.5));const F=et(A-30,A+6,u)*(1-et(A+.55*D,A+1.15*D,u)),j=X-M,T=m-Q,ae=j*j+T*T+1,se=F*Ge/.638*le*(1-Math.exp(-ae/(le*le)))/ae;w-=se*T,b+=se*j}return[w,b]};let oe=e[4];for(let X=0;X<je;X++){for(let m=0;m<Me*V;m++){const u=Math.floor(m/V),Y=m%V,w=o[u],b=Ve(w[0],w[1],oe),C=Math.max(Math.hypot(b[0],b[1]),4),W=b[0]/C,K=b[1]/C,A=10*w[2]/C,Z=Math.floor(oe/A)-Y,M=oe-Z*A,Q=Z-2*Math.floor(Z/2)<.5?1:-1,F=1.3*w[2]+.82*C*M,j=Q*w[2]*(.9+.02*M),T=(X*Ce+m)*4;t[T]=w[0]+W*F-K*j,t[T+1]=w[1]+K*F+W*j,t[T+2]=-Q*n*C*w[2]*w[3]*et(0,1.5*A,M)*Math.exp(-M/16),t[T+3]=.3*w[2]*w[2]+4*M}X<l+f&&(oe=r(oe-(X<l?s:r(2*s))))}return t}const tt=`uint hu(uvec3 v) { v = v * 1664525u + 1013904223u; v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y; v ^= v >> 16u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y; return v.x ^ v.y ^ v.z; }
float hf(ivec2 c, uint s) { return float(hu(uvec3(uvec2(c), s)) >> 8) / 16777216.; }
float vn(vec2 x, uint s) { vec2 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f); ivec2 c = ivec2(i);
  return mix(mix(hf(c, s), hf(c + ivec2(1, 0), s), f.x), mix(hf(c + ivec2(0, 1), s), hf(c + ivec2(1, 1), s), f.x), f.y); }
`,Gt=N+`out vec4 o;
`+tt+`float hp(ivec2 c, int n, uint s) { ivec2 w = (c + n * 8) % n; return float(hu(uvec3(uvec2(w), s)) >> 8) / 16777216.; }
float vnp(vec2 x, int n, uint s) { vec2 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f); ivec2 c = ivec2(i);
  return mix(mix(hp(c, n, s), hp(c + ivec2(1, 0), n, s), f.x), mix(hp(c + ivec2(0, 1), n, s), hp(c + ivec2(1, 1), n, s), f.x), f.y); }
`+`
uniform int uZ;
// one call site for all fifteen lattice lookups (8 for the stream function at four points, 7 for the two fbm), in a loop
// bounded by a never-set uniform so the compilers keep it rolled
const int NN[7] = int[7](4, 9, 19, 41, 6, 13, 37);
const float NW[7] = float[7](.5, .25, .15, .1, .5, .3, .2);
void main() {
  vec2 u = gl_FragCoord.xy / ${xe}.; float h = 1. / ${xe}.;
  vec4 ps = vec4(0.); float f1 = 0., f2 = 0.;
  for (int k = 0; k < 15 + uZ; k++) {
    vec2 x; int n; uint s; float wt;
    if (k < 8) {
      int pi = k >> 1, j = k & 1;
      vec2 d = pi == 0 ? vec2(h, 0.) : pi == 1 ? vec2(-h, 0.) : pi == 2 ? vec2(0., h) : vec2(0., -h);
      n = j == 0 ? 5 : 11; s = uint(j + 1); wt = j == 0 ? .62 : .38; x = (u + d) * float(n);
    } else { int i = k - 8; n = NN[i]; s = uint(i + 7); wt = NW[i]; x = u * float(n); }
    vec2 fl = floor(x), f = fract(x); f = k < 8 ? f * f * f * (f * (f * 6. - 15.) + 10.) : f * f * (3. - 2. * f); ivec2 c = ivec2(fl);
    float r = wt * mix(mix(hp(c, n, s), hp(c + ivec2(1, 0), n, s), f.x), mix(hp(c + ivec2(0, 1), n, s), hp(c + ivec2(1, 1), n, s), f.x), f.y);
    if (k < 8) ps[k >> 1] += r; else if (k < 12) f1 += r; else f2 += r;
  }
  vec2 g = vec2(ps.x - ps.y, ps.z - ps.w) / (2. * h);
  vec2 v = vec2(g.y, -g.x) / 10.;
  o = vec4(clamp(v * .5 + .5, 0., 1.), f1, f2);
}`,pt=N+`uniform sampler2D uN, uI; uniform vec4 k[6]; uniform int uZ; out vec4 o;
float n3(vec2 x) { return textureLod(uN, x, 0.).z; }
float n4(vec2 x) { return textureLod(uN, x, 0.).w; }
// one random number per street row: its offset across the wind and its strength
float rh(float r) { uint h = uint(int(r) + 65536) * 2654435761u; h ^= h >> 15; h *= 0x846ca68bu; h ^= h >> 16; return float(h & 65535u) / 65535.; }
float org(vec2 X) {
  vec2 w = k[1].xy, Y = X + k[4].xy; float al = dot(Y, w), cr = dot(Y, vec2(-w.y, w.x));
  float lg = n3(Y / 2600. + .37), lg2 = n4(mat2(.8, .6, -.6, .8) * Y / 700. + .71);
  float dc = dot(k[2].xy - X, k[2].zw), D = k[3].w, md = k[5].w;
  float off = md > 2.5 ? 1. : smoothstep(D * .4, D * 1.4, dc), far = md > 2.5 ? .3 : smoothstep(D, D * 2.3, dc);
  float env = off * smoothstep(.36, .66, .75 * lg + .4 * (lg2 - .5) + .3 * far + k[1].w);
  float reg = k[1].z, pat;
  if (reg < .5) pat = smoothstep(.5, .78, n3(Y / 170. + .21)) * (.4 + .6 * n4(Y / 60. + .5));
  else if (reg < 1.5) {
    // streets: the rows themselves come from the puff lattice (one row of cumulus per lattice row across the wind); here
    // only how strong they are, fading in and out irregularly along each row and from one row to the next
    float fr = smoothstep(.3, .72, n3(vec2(al / 1200., cr / (4. * k[5].x)) + .63)) * (.55 + .45 * n4(vec2(al / 420., cr / (2.5 * k[5].x)) + .2));
    pat = .95 * (.35 + .65 * fr) * smoothstep(.3, .62, n3(Y / 330. + .9));
    pat = max(pat, .55 * smoothstep(.6, .85, n3(Y / 140. + .21)) * smoothstep(.35, .7, n4(Y / 50. + .5)));
  } else {
    // open cells: rings of cloud round clear middles (the contour band round each high of a smooth field)
    float rn = n4(Y / k[5].y + .19) * .8 + .2 * n3(mat2(.6, .8, -.8, .6) * Y / (k[5].y * .4) + .4);
    pat = .9 * smoothstep(.5, .545, rn) * (1. - smoothstep(.575, .62, rn)) * (.45 + .55 * smoothstep(.3, .62, n3(Y / 40. + .8)));
  }
  return env * (.05 + .95 * pat);
}
void main() {
  vec2 X = k[0].xy + gl_FragCoord.xy * k[0].zw;
  vec2 w = k[1].xy, Y = X + k[4].xy; vec2 a = vec2(dot(Y, w), dot(Y, vec2(-w.y, w.x)));
  vec2 sh = vec2(dot(k[3].xy, w), dot(k[3].xy, vec2(-w.y, w.x)));
  vec3 sun = normalize(vec3(sh, k[3].z));
  float bump = (n4(Y / 16. + .13) - .5) * 1.2 + (n3(Y / 40. + .61) - .5) * .7;
  // org() has one call site (every call site is compiled again): the view's own organisation is the puff loop's first step
  float og = 0., ogf = 0., tau = 0., L = 0., W = 0., T = 0.;
  bool sts = k[1].z > .5 && k[1].z < 1.5;
  float stretch = sts ? 1.6 : 1.15;
  // on street mints each lattice row across the wind is one street (spacing k5.x), meandering slowly so the rows close
  // up and spread apart
  float wp = sts ? k[5].x * 1.5 * (n4(vec2(a.x / 1100., a.y / 2600.) + .27) - .5) : 0.;
  // on 'few' mints the trade cumulus far out at sea are specks of 1.5 to 4 km on a lattice half as wide, standing only
  // where the organisation is high, so they gather in clusters and arcs with clear sea between
  bool few = k[1].z < .5;
  for (int oc = 0; oc < 1 + uZ; oc++) {
    float fo = float(oc), cs = k[5].z * pow(.45, fo) * (few ? .5 : 1.), e0 = few ? .55 : .45 - .17 * fo, e1 = few ? .76 : .78 - .17 * fo;
    vec2 g = vec2(cs * stretch, sts ? k[5].x * pow(.45, fo) : cs);
    vec2 cq = vec2(a.x, a.y + wp) / g, ci = floor(cq), cf = fract(cq);
    for (int jj = 0; jj < 10 + uZ; jj++) {
      int j = max(jj - 1, 0);
      vec2 of = vec2(float(j % 3) - 1., float(j / 3) - 1.);
      uvec2 hu = uvec2(ivec2(ci + of) + 65536 + oc * 7919);
      uint hx = hu.x * 1664525u ^ (hu.y * 1013904223u + 374761393u);
      hx ^= hx >> 16; hx *= 0x7feb352du; hx ^= hx >> 15; hx *= 0x846ca68bu; hx ^= hx >> 16;
      vec4 hc = vec4(hx & 255u, (hx >> 8) & 255u, (hx >> 16) & 255u, hx >> 24) / 255.;
      vec2 cen = sts ? vec2(of.x + .05 + .9 * hc.x, of.y + .5 + .2 * (hc.y - .5) + .5 * (rh(ci.y + of.y) - .5)) : of + .2 + .6 * hc.xy;
      vec2 cw = (ci + cen) * g - vec2(0., wp);
      float oq = org(jj == 0 ? X : cw.x * w + cw.y * vec2(-w.y, w.x) - k[4].xy);
      if (jj == 0) { og = oc == 0 ? oq : og; ogf = few ? .1 + .9 * smoothstep(.45, .72, og) : .2 + .8 * smoothstep(.25, .65, og); } else {
      float pp = smoothstep(e0, e1, oq);
      pp *= pp;
      // street rows differ: some strong, some broken, a few nearly empty
      if (sts) pp *= .15 + .85 * smoothstep(.1, .55, rh(ci.y + of.y + 7777.));
      // no puff is a hard point: each is a soft tuft at least a few km across, dim alone and white only where they crowd
      vec2 rel;
      if (sts) {
        // a cumulus in its row: most small, a few large; where the row is strong some draw out along it and join up
        float rc = cs * (.26 + .62 * hc.z * hc.z) * (.7 + .5 * pp), mg = smoothstep(.5, .9, pp) * step(.7, fract(hc.w * 13.7));
        rel = (cf - cen) * g / vec2(min(rc * (1. + 1.5 * mg) + mg * .35 * g.x, .95 * g.x), rc);
      } else rel = (cf - cen) / ((.32 + .22 * hc.z * hc.z) * (.75 + .4 * pp));
      float d = length(rel) + bump * (.5 + .1 * fo);
      float dn = (hc.w < pp ? 1. : 0.) * smoothstep(1., .1, d) * (1. - .4 * fo) * (.35 + .9 * hc.z) * (.4 + .6 * pp) * ogf;
      vec3 nr = normalize(vec3(rel, 1.2 * sqrt(max(1. - dot(rel, rel), 0.)) + .2));
      tau += dn; L += dn * clamp(dot(nr, sun), 0., 1.); W += dn;
      T += oc == 0 && hc.z > .55 && fract(hc.w * 7.31) < .45 ? dn : 0.;
      }
    }
  }
  float dk = 3. * smoothstep(.62, .95, og) * clamp(.7 + 1.3 * bump, 0., 1.) * (k[1].z > 1.5 ? 1. : k[1].z > .5 ? 0. : smoothstep(.4, .62, n3(vec2(a.x / 420., a.y / 170.) + .21)));
  tau += dk; L += .75 * dk; W += dk;
  float mt = og * smoothstep(.46, .86, .55 * n4(Y / 90. + .3) + .45 * n3(mat2(.8, .6, -.6, .8) * Y / 53. + .7)) * (.35 + .65 * n3(Y / 170. + .1));
  // on street mints the thin low cloud only lies along the rows: here and there a row's cumulus merge into a line
  if (sts) { float rq = (a.y + wp) / k[5].x, ri = floor(rq);
    mt = og * smoothstep(2.6, .5, abs(fract(rq) - .5 - .5 * (rh(ri) - .5)) * k[5].x + 2. * (n4(Y / 30. + .1) - .5)) * smoothstep(.15, .6, rh(ri + 7777.))
      * smoothstep(.6, .84, n3(vec2(a.x / 240., a.y / 70.) + .3)) * (.45 + .55 * n4(vec2(a.x / 70., a.y / 25.) + .6)) * smoothstep(.3, .7, n3(vec2(a.x / 28., a.y / 14.) + .8)); }
  tau += 1.3 * mt; L += 1. * mt; W += 1.3 * mt;
  // a stratocumulus deck over the cold water to the north: a sheet of closed cells, polygons 10 to 40 km across whose size
  // varies two- to threefold, flat-topped (no lit or shaded side), the lanes between them a little thinner cloud that
  // never opens to the sea in the heart; brighter and duller in swathes. Toward its edge the sheet tears into rafts of
  // cells with ragged indented outlines and clear water between them, with thin grey veils beyond
#ifdef DECK
  if (k[4].w < 9e4) {
    // closed cells as a Voronoi tiling: F1 to the nearest centre, F2 to the next; a third of the centres are left out, so
    // their neighbours take their ground and the cells differ in size
    vec2 dg = vec2(21., 17.), dw = a + 5. * (textureLod(uN, Y / 31. + .3, 0.).zw - .5) + 28. * (textureLod(uN, Y / 102. + .45, 0.).wz - .5), dq = dw / dg, di = floor(dq), df = fract(dq);
    // how much of the deck is here (0 beyond its edge, 1 in its heart), from the edge distance, clusters and rolls
    vec4 N1 = textureLod(uN, X / 1900. + .5, 0.), N2 = textureLod(uN, mat2(.8, .6, -.6, .8) * X / 520. + .2, 0.), N3 = textureLod(uN, X / 190. + .7, 0.);
    float ed = X.y - k[4].w + 170. * (N1.z - .5) + 70. * (N2.w - .5);
    float rl = .5 + .5 * cos(6.2832 * a.y / 36. + 7. * (N2.z - .5) + 4. * (N1.w - .5));
    float c0 = clamp((ed + 40.) / 170., 0., 1.);
    float cv = clamp(c0 + 4. * c0 * (1. - c0) * (1.1 * (N3.w - .5) + .5 * (rl - .5)), 0., 1.);
    float F1 = 1e4, F2 = 1e4;
    for (int j = 0; j < 9 + uZ; j++) {
      vec2 of = vec2(float(j % 3) - 1., float(j / 3) - 1.);
      uvec2 hu = uvec2(ivec2(di + of) + 65536 + 3331);
      uint hx = hu.x * 1664525u ^ (hu.y * 1013904223u + 2654435761u);
      hx ^= hx >> 16; hx *= 0x7feb352du; hx ^= hx >> 15; hx *= 0x846ca68bu; hx ^= hx >> 16;
      vec4 hc = vec4(hx & 255u, (hx >> 8) & 255u, (hx >> 16) & 255u, hx >> 24) / 255.;
      float d = length((df - of - .12 - .76 * hc.xy) * dg) + 1e4 * step(hc.w, .35);
      F2 = min(F2, max(F1, d)); F1 = min(F1, d);
    }
    // the rafts: the sheet is there where a field shared by neighbouring cells (the cover with clusters 40-150 km across)
    // passes a threshold, its outline indented along the lanes and frayed by the small bumps; under a cover of .3 nothing
    float lane = 1. - smoothstep(0., mix(9., 5., cv), F2 - F1);
    float fz = n4(Y / 9. + .5);
    float rf = clamp(c0 + 4. * c0 * (1. - c0) * (1.1 * (N3.w - .5) + .12 * (rl - .5)), 0., 1.) + .5 * (N2.w - .5) + .24 * (N3.z - .5) + .05 * bump
      + .04 * (fz - .5) - .14 * lane * (1. - cv);
    float pr = smoothstep(.44, .5, rf) * smoothstep(.34, .42, cv);
    // the veil: thin grey cloud lying a little beyond the rafts
    float vl = .5 * smoothstep(.3, .44, rf) * (1. - pr) * smoothstep(.2, .3, cv) * smoothstep(.45, .6, N3.x);
    // the lanes: a shallow dip in thickness in the heart, deeper and opening up only near the edge
    float dip = lane * mix(.6, .24, smoothstep(.45, .8, cv));
    float sw = .78 + .3 * (N1.w - .5) + .22 * (N2.z - .5) + .25 * (N2.y - .5);
    float dm = (pr * (1. - dip) + vl) * sw * clamp(.92 + .25 * bump + .15 * (fz - .5), .7, 1.1) * (.55 + .45 * smoothstep(.3, .7, cv)) * 10.;
    // flat tops under a high sun: lit as one sheet. The deck's tops stand mostly above the thin dust layer, so dust
    // only tints it a little
    tau += dm; L += dm * sun.z; W += dm; T += .75 * dm;
  }
#endif
  // the cap cloud on the highest peak, a little downwind of the summit
  for (int j = 0; j < int(k[4].z); j++) {
    vec4 A = texelFetch(uI, ivec2(j, 0), 0), B = texelFetch(uI, ivec2(j, 1), 0);
    if (B.x > .95) {
      // a bank of cloud pressed against the windward slope at one height
      vec2 d = X - A.xy + w * .55 * A.z; float r = .26 * A.z;
      vec2 dw = vec2(dot(d, w) / .5, dot(d, vec2(-w.y, w.x)) / 1.6);
      float dc = 1.4 * pow(max(1. - length(dw) / r - .45 * bump - .3 * (n4(X / 3. + .3) - .5), 0.), 1.2);
      tau += dc; T += dc; L += dc * clamp(.6 + .5 * dot(normalize(d + 1e-3), sh / max(length(sh), 1e-3)), 0., 1.); W += dc;
    }
  }
  o = vec4(tau / (tau + 3.), W > 1e-4 ? L / W : 0., tau > 1e-3 ? T / tau : 0., 1.);
}`,wt=`
float nz(vec2 x) { return textureLod(uN, x, 0.).z; }
float nw(vec2 x) { return textureLod(uN, x, 0.).w; }
float coastG(vec2 x, vec4 P, float mode, float fine) {
  float g = dot(x - P.xy, P.zw);
  g += 150. * (nz(x / 1700. + .21) - .5) + fine * (40. * (nw(x / 380. + .63) - .5) + 12. * (nz(x / 130. + .37) - .5) + 4. * (nw(x / 31. + .19) - .5));
  return mode > 3.5 ? 1e4 : mode > 2.5 ? -1e4 : g;
}`,yt=N+`uniform sampler2D uI, uN; uniform vec4 l[7]; out vec4 o;
#ifdef TWO
uniform vec4 lF;
#endif
`+wt+`
// a volcanic island's height: a rough cone cut by radial barrancos (sharp V valleys between rounded ridges)
float isH(vec2 x, vec4 A, vec4 B, vec4 P, out float sd, out float cr) {
  vec2 d = x - A.xy; float cs = cos(B.z), sn = sin(B.z);
  vec2 rr = vec2(cs * d.x + sn * d.y, -sn * d.x + cs * d.y); rr.x /= B.y;
  float L = length(rr); vec2 dir = rr / max(L, 1e-3);
  // the coast: lobes from two slow noises, and capes and bays from a ridged term in bearing (pointed where it peaks,
  // rounded between), five to nine to a turn, weaker on the low pale islands
  float cp = 1. - 2. * abs(nz(dir * .21 + B.w * .29 + .5) - .5);
  float re = A.z * (1. + P.x * dir.x * (4. * dir.x * dir.x - 3.) + P.y * dir.x + .75 * (nz(x / (9. * A.z) + B.w) - .5) + .25 * (nw(x / (4. * A.z) + B.w) - .5)
    + (.5 - .3 * P.z) * (cp - .6));
  float u = L / re; sd = (re - L) * mix(1., B.y, abs(dir.x));
  float rv = nz(dir * .15 + B.w * .37 + rr / (16. * A.z)) + .08 * (nw(x / (.5 * A.z) + B.w) - .5);
  float crease = 1. - smoothstep(0., .3, abs(2. * rv - 1.));
  float cone = pow(max(1. - u, 0.), 1.25) + .06 * max(1. - u, 0.) * (nw(x / (1.2 * A.z) + B.w * .7) - .5);
  // the ravine net: V valleys a few km apart running from the ridge line to the coast, branching as they go down
  float rq = nw(dir * (.045 * A.z) + B.w * .53 + rr / (4. * A.z)) + .12 * (nz(x / (.4 * A.z) + B.w) - .5);
  float rav = (1. - smoothstep(0., .3, abs(2. * rq - 1.))) * smoothstep(.1, .35, u) * (1. - smoothstep(.9, 1., u));
  cr = max(crease, rav) * smoothstep(.06, .35, u) * step(0., sd);
  return cone * (1. - .12 * crease * smoothstep(.06, .35, u) - .22 * rav * (1. - .6 * P.z)) * (.35 + .65 * B.x);
}
float rockF(vec2 x) { return smoothstep(.49, .64, .7 * nz(mat2(.8, .6, -.6, .8) * x / 1300. + l[3].zw) + .2 * nw(mat2(.6, -.8, .8, .6) * x / 260. + .4) + .05 * nz(mat2(.8, .6, -.6, .8) * x / 45.)); }
void main() {
  vec2 x = l[0].xy + gl_FragCoord.xy * l[0].zw;
  float mode = l[2].x; int NI = int(l[2].y);
  vec2 sun = l[2].zw, w = l[3].xy;
  float g = coastG(x, l[1], mode, 1.);
#ifdef TWO
  // the far shore (lF: a point on its coast, its normal toward the land), with bays of its own: a narrow pale coastal
  // plain, then a range of bare dark rock along the coast cut by dry valleys (the desert's own rock and wadis), the
  // plateau beyond
  vec2 fn = lF.zw, ft = vec2(-fn.y, fn.x);
  float g2 = dot(x - lF.xy, fn) + 170. * (nz(x / 1500. + .53) - .5) + 64. * (nw(x / 430. + .11) - .5) + 18. * (nz(x / 110. + .71) - .5) + 6. * (nw(x / 29. + .33) - .5);
  float es = g2 - 15. - 16. * (nw(vec2(dot(x, ft) / 160., g2 / 300.) + .45) - .5);
  float rng = step(g, g2) * smoothstep(0., 5., es) * (1. - smoothstep(40., 90., es + 40. * (nz(x / 230. + .8) - .5)));
#endif
  vec2 r = vec2(dot(x, w), dot(x, vec2(-w.y, w.x)));
  // the desert, three grounds: sand seas in orange-tan whose dune crests are thin contour lines of a warped field drawn
  // out along the wind (so they curve, fork and join, a lit and a shaded flank each); dark rock plateaus with pale wadis
  // branching through them; salt pans, white with grey rims, in the hollows (the same pans are the plume heads in BAKE)
  // (the sea texels away from the shore skip the desert: their colour is never shown)
  vec3 col = vec3(.3, .25, .2); float grain = .5, rk = 0., rs = 0., wadi = 0.;
#ifdef TWO
  if (max(g, g2) > -6.) {
#else
  if (g > -6.) {
#endif
  float big = nz(x / 2300. + .7), mid = nw(x / 520. + .2); grain = nz(x / 45.);
  vec2 xq = x + 70. * vec2(nz(x / 800. + .13) - .5, nw(x / 700. + .41) - .5);
  vec2 rq = vec2(dot(xq, w), dot(xq, vec2(-w.y, w.x)));
  float d1 = nz(rq / vec2(150., 44.) + .27) - .5, d2 = nw(rq / vec2(70., 23.) + .66) - .5;
  float erg = smoothstep(.42, .58, nz(x / 1600. + .2) + .25 * (mid - .5));
  float crest = (1. - smoothstep(0., .022, abs(d1))) + .4 * (1. - smoothstep(0., .022, abs(d2))) * smoothstep(.45, .65, mid);
  float flank = clamp(d1 * 9., -1., 1.) * (1. - smoothstep(0., .1, abs(d1))) * dot(sun, vec2(-w.y, w.x));
  vec3 sand = mix(vec3(.46, .27, .14), vec3(.55, .39, .24), smoothstep(.3, .7, big + .3 * (mid - .5)));
  sand *= 1. + erg * (.07 * crest + .06 * flank) + .05 * (grain - .5);
  vec3 reg = mix(vec3(.43, .35, .26), vec3(.5, .43, .34), nw(x / 140. + .3)) * (.94 + .1 * nz(x / 18. + .6));
  col = mix(reg, sand, erg);
  rk = rockF(x) * l[5].z; rs = rockF(x + sun * 1.6) * l[5].z;
#ifdef TWO
  rk = max(rk, rng * (.85 + .15 * nw(x / 40. + .2))); rs = max(rs, rng * (.8 + .3 * nz(x / 17. + .5)));
#endif
  vec3 rock = mix(vec3(.15, .095, .06), vec3(.26, .17, .11), nw(x / 90.)) * (.85 + .3 * nz(mat2(.6, .8, -.8, .6) * x / 23.));
  col = mix(col, rock, rk * (.7 + .3 * nw(x / 31.)));
  col *= 1. + .5 * (rs - rk);
  // wadis: trunk channels and the tributaries that branch off them, pale gravel in the dark rock, faint on the sand
  float w1 = abs(nz(xq / 420. + .55) - .5), w2 = abs(nw(xq / 110. + .15) - .5);
  wadi = (1. - smoothstep(.002, .007, w1)) + .7 * (1. - smoothstep(.002, .009, w2)) * (1. - smoothstep(.0, .05, w1));
  col = mix(col, vec3(.44, .37, .29) * (.9 + .2 * grain), clamp(wadi, 0., 1.) * (.5 * rk) * smoothstep(-5., 30., g));
  // salt pans
  float pn = .7 * nw(mat2(.8, .6, -.6, .8) * x / 210. + .37) + .3 * nz(mat2(.6, -.8, .8, .6) * x / 75. + .11);
  float pan = smoothstep(.68, .695, pn) * (1. - rk), rim = (smoothstep(.645, .68, pn) - smoothstep(.68, .695, pn)) * (1. - rk);
  col = mix(col, vec3(.34, .32, .29), rim * .55);
  col = mix(col, vec3(.6, .57, .52) * (.94 + .1 * nz(x / 9. + .2)), pan * .85);
  col = mix(col, vec3(.15, .14, .08), l[5].y * smoothstep(.45, .7, nz(x / 1500. + .5)) * smoothstep(-200., -700., x.y - l[1].y));
  }
  // the plume heads: fresh dust lifted off the pans' cores in a few ragged teeth side by side (a broken comb across the
  // wind), each a pale streak sharp at its upwind end on the pan, widening a little and fading downwind over 40-130 km
  // into the haze. The streak is the source summed along the upwind line at a jittered spacing, so no copy registers
  // (only on the land and its shore: the sea texels skip the 32 steps)
  if (l[6].w > .5 && g > -12.) {
    vec2 wn = vec2(-w.y, w.x);
    float gw = dot(w, l[1].zw), jt = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715))));
    float al = dot(x, w), cr = dot(x, wn) + 13. * (nz(x / 90. + .5) - .5), hd = 0.;
    for (int i = 0; i < int(l[6].w); i++) {
      float fi = float(i) + jt, s = 1.2 * fi + .09 * fi * fi, ds = 1.2 + .18 * fi;
      vec2 xs = x - w * s;
      float pn = .7 * nw(mat2(.8, .6, -.6, .8) * xs / 210. + .37) + .3 * nz(mat2(.6, -.8, .8, .6) * xs / 75. + .11);
      float tq = nw(vec2((al - s) / 45., cr / (2.2 + .12 * s)) + .23);
      hd += smoothstep(.69, .705, pn) * smoothstep(.42, .64, tq) * smoothstep(-5., 10., g - s * gw) * exp(-s / (40. + 90. * tq * tq)) * ds / 7.;
    }
    hd *= (.55 + .9 * nz(vec2(al / 70., dot(x, wn) / 1.6) + .41)) * (1. - .6 * rk);
    col = mix(col, vec3(.62, .54, .44), clamp(hd * .7, 0., .85) * step(0., g));
  }
#ifdef TWO
  {
    col = mix(col, vec3(.44, .37, .29) * (.9 + .2 * grain), clamp(wadi, 0., 1.) * .5 * rng);
    // the coastal plain: pale gravel and sabkha between the shore and the scarp foot
    col = mix(col, vec3(.43, .36, .27) * (.9 + .2 * nw(x / 23. + .3)) * (.95 + .1 * grain), step(g, g2) * (1. - smoothstep(-2., 6., es)) * .6);
    // a few low sandy islets off it
    float isd = 60. * (nz(x / 21. + .29) - .835) + 4. * (nw(x / 4. + .7) - .5);
    isd = mix(-60., isd, smoothstep(-34., -26., g2) * (1. - smoothstep(-16., -11., g2)));
    col = mix(col, vec3(.6, .55, .46) * (.9 + .2 * grain), step(0., isd) * step(g2, 0.));
    g = max(g, max(g2, isd));
  }
#endif
  if (mode > 3.5) {
    vec2 q = (x - l[4].xy) / l[4].zw;
    float bd = 1. - smoothstep(.7, 1.05, length(q) + .3 * (nz(x / 400.) - .5));
    col = mix(col, vec3(.5, .48, .44) * (.8 + .35 * nw(r / vec2(300., 12.))), bd * (.5 + .5 * smoothstep(.35, .65, nz(x / 160.))));
    float ms = smoothstep(.45, .6, nz((x - l[4].xy) / 1400.) + .65 - length((x - l[4].xy - vec2(330., 300.)) / 300.));
    col = mix(col, vec3(.10, .08, .065) * (.75 + .5 * nw(x / 60.)), ms);
  }
  // the shore: a pale beach, sand spits drawn along the coast with darker lagoon water behind
  float beach = smoothstep(1.5, 0., g) * step(0., g);
  col = mix(col, vec3(.6, .54, .45), beach * .6);
  float lag = smoothstep(.62, .7, nw(x / 260. + .8)) * smoothstep(9., 2., g) * smoothstep(1.2, 2.5, g);
  col = mix(col, vec3(.06, .1, .1), lag * .8);
  // islands: volcanic relief lit from the sun, green and dark on the wet windward heights, brown and dry low and in
  // the lee, ash-pale at the summit; a broken pale surf rim at the shore
  float sdI = -1e4;
  vec3 sun3 = vec3(sun * sqrt(1. - l[6].y * l[6].y), l[6].y);
  for (int j = 0; j < NI; j++) {
    vec4 A = texelFetch(uI, ivec2(j, 0), 0), B = texelFetch(uI, ivec2(j, 1), 0), P = texelFetch(uI, ivec2(j, 2), 0);
    // an islet (under 6 km and round) is a dark rock a few km long with a broken outline
    float ist = step(A.z, 6.) * step(B.y, 1.5);
    A.z *= 1. - .6 * ist; P.xy += ist * vec2(.25, .2);
    if (length(x - A.xy) < 2. * A.z * B.y) {
      float hh[3], sd = -1e4, val = 0., e = .7;
      for (int i = 0; i < int(l[6].x); i++) { float sdi, cri; hh[i] = isH(x + vec2(i == 1 ? e : 0., i == 2 ? e : 0.), A, B, P, sdi, cri); if (i == 0) { sd = sdi; val = cri; } }
      float Hs = l[6].z * 3.5;
      vec3 nr = normalize(vec3(-(hh[1] - hh[0]) / e * Hs, -(hh[2] - hh[0]) / e * Hs, 1.));
      float dif = max(dot(nr, sun3), 0.) / sun3.z, h = hh[0] / (.35 + .65 * B.x);
      float wind = smoothstep(-.2, .6, dot(normalize(x - A.xy + 1e-3), -w));
      // dark, low in colour: grey-brown rock, pale tan where the slopes face the sun (the relief light carried by the
      // ravines), dull olive only in the highest windward valleys, one near-black lava field, ash at the summit
      vec3 dry = mix(vec3(.066, .059, .052), vec3(.096, .083, .071), nw(x / 9. + B.w)) * (.9 + .2 * nz(x / 2.5));
      vec3 wet = mix(vec3(.052, .058, .042), vec3(.066, .07, .05), nz(x / 6. + B.w));
      float green = smoothstep(.3, .75, B.x) * smoothstep(.1, .7, dot(normalize(x - A.xy + 1e-3), -w)) * smoothstep(.45, .6, h) * (1. - smoothstep(.8, .92, h)) * (.4 + .6 * val);
      vec3 ic = mix(dry, wet, green);
      vec3 pal = mix(vec3(.15, .13, .105), vec3(.2, .175, .14), nw(x / 14. + B.w)) * (.9 + .2 * nz(x / 4. + B.w));
      ic = mix(ic, pal, P.z);
      ic = mix(ic, vec3(.034, .032, .03) * (.8 + .4 * nw(x / 5. + B.w)), P.w * smoothstep(.56, .66, nz(x / (2.5 * A.z) + B.w * 1.7 + .5)));
      // a low pale island has a sandy apron at its shore
      ic = mix(ic, vec3(.2, .185, .16), P.z * smoothstep(1.4, .2, sd) * .5);
      ic = mix(ic, vec3(.15, .14, .125) * (.8 + .4 * nw(x / 3. + B.w)), smoothstep(.72, .92, h) * step(.85, B.x));
      ic = mix(ic, ic * vec3(.82, .86, .84), val * .4);
      // no two islands of a group share a colour: each its own rock and soil, lighter or darker
      float hv = fract(B.w * .618);
      ic *= mix(vec3(1.06, .99, .93), vec3(.94, .98, 1.03), hv) * (.85 + .3 * fract(B.w * 1.73));
      ic = mix(ic, vec3(.045, .042, .04) * (.8 + .4 * nz(x / 1.5 + B.w)), ist);
      ic *= clamp(.1 + 1. * dif, .08, 1.8);
      float il = smoothstep(-.7, .7, sd);
      col = mix(col, ic, step(g, 0.) * step(-4., sd));
      // a thin turquoise shelf on the lee side of the low pale islands, kept in the colour of the sea texels by it (the
      // composite reads a sea texel bluer than red as shelf)
      col = mix(col, vec3(.03, .075, .068), P.z * (1. - ist) * step(sd, 0.) * smoothstep(-3.5, -1., sd) * smoothstep(-.1, .6, dot(normalize(x - A.xy + 1e-3), w)) * step(g, 0.));
      sdI = max(sdI, sd);
    }
  }
  float sdf = max(g, sdI);
  o = vec4(sqrt(clamp(col, 0., 1.)), .5 + .5 * sdf / (abs(sdf) + 16.));
}`,gt=N+`uniform sampler2D uN, uI, uV; uniform vec4 b[15]; out vec4 o;
`+tt+wt+`
vec2 UB; float CA, CK, LR, LV, PP, PH, NI_, K_, NS_, SG, MODE, FS; vec2 LC, LD, HC; float HQ;
vec2 wAt(vec2 x, float s) {
  vec2 u = UB * (1. + .12 * sin(s / 31. + 1.7));
  float e0 = floor((s - PH) / PP);
  for (int j = 0; j < 2; j++) {
    float n = e0 - float(j), T = n * PP + PH;
    ivec2 nn = ivec2(int(n) + 4096, 3);
    vec2 c = LC + LD * (s - T) + (n == 0. ? vec2(0.) : 160. * vec2(hf(nn, 1u) - .5, hf(nn, 2u) - .5));
    float env = smoothstep(T - 30., T + 6., s) * (1. - smoothstep(T + .55 * PP, T + 1.15 * PP, s));
    vec2 d = x - c; float r2 = dot(d, d) + 1.;
    u += env * LV / .638 * LR * (1. - exp(-r2 / (LR * LR))) / r2 * vec2(-d.y, d.x);
  }
  return u;
}
vec2 vel(vec2 x, float s, int row) {
  vec2 u = wAt(x, s);
  vec2 q = (x - UB * s * .45) / CK;
  vec2 n1 = textureLod(uN, q, 0.).xy * 2. - 1., n2 = textureLod(uN, mat2(.8, .6, -.6, .8) * q * 2.2 + .31, 0.).xy * 2. - 1.;
  u += CA * (n1 + .55 * mat2(.8, -.6, .6, .8) * n2);
  if (HQ > 0.) {
    float T = PH + floor((s - PH) / PP) * PP;
    vec2 d = x - HC; float r = length(d) + 1., Rf = FS * max(s - T, 0.);
    u += HQ * d / r * smoothstep(.15 * Rf, Rf, r) * (1. - smoothstep(Rf * .8, Rf + 140., r)) * exp(-max(s - T, 0.) / 30.);
  }
  // islands: potential-flow obstacles with a wake deficit, the tall ones shedding a von Karman street
  int NI = int(NI_), K = int(K_), NS = int(NS_);
  vec2 u0 = u;
  for (int j = 0; j < NI; j++) {
    vec4 A = texelFetch(uI, ivec2(j, 0), 0);
    vec2 d = x - A.xy; float a2 = A.z * A.z * .55, r2 = max(dot(d, d), a2);
    vec2 z2 = vec2(d.x * d.x - d.y * d.y, 2. * d.x * d.y);
    u += a2 / (r2 * r2) * vec2(-(u0.x * z2.x + u0.y * z2.y), u0.y * z2.x - u0.x * z2.y);
    float U = length(u0); vec2 w = u0 / max(U, 1e-3);
    float xd = max(dot(d, w), 0.), yd = dot(d, vec2(-w.y, w.x)), az = .75 * A.z;
    u -= w * U * .45 * min(A.w, 1.) * exp(-yd * yd / (a2 * (1.5 + xd / az))) * (1. - exp(-xd / az)) * exp(-xd / (10. * az));
  }
  // the street's vortices depend only on the time along the path, the same for every pixel: their centre, strength and
  // core come from a small table worked out in make() for each bake (uV: one column per vortex, one row per time step)
  for (int i = 0; i < NS * K; i++) {
    vec4 V = texelFetch(uV, ivec2(i, row), 0);
    vec2 d = x - V.xy; float r2 = dot(d, d) + 1e-3;
    u += V.z * .159155 / r2 * (1. - exp(-r2 / V.w)) * vec2(-d.y, d.x);
  }
  return u;
}
float onsetT(vec2 x, float n, vec4 F) {
  float T = n * PP + PH;
#ifdef HAB
  // the gust front's edge is cut into lobes of unequal size with narrow clefts between them (a ridged noise in bearing)
  vec2 dh = x - HC; float rr = length(dh) + 1e-3;
  return T + rr * (1. + .45 * (nz(x / 2400. + .4) - .5) + .07 * (.5 - abs(nz(dh / rr * 3. + .17) - .5)) + .025 * (.5 - abs(nw(dh / rr * 9. + .61) - .5))) / FS;
#else
  return HQ > 0. ? T + length(x - HC) * (1. + .45 * (nz(x / 2400. + .4) - .5)) / FS : T + dot(x - b[5].xy, F.xy) / FS;
#endif
}
float edgeG(vec2 x) { vec2 w = b[11].xy; return b[9].z - dot(x, vec2(-w.y, w.x)) - b[14].x * (nz(x / b[14].y + .3) - .5); }
float srcG(vec2 x) {
  if (MODE > 3.5) { vec2 q = (x - b[12].xy) / b[12].zw; return (1. - length(q) - .3 * (nz(x / 500.) - .5)) * 120.; }
  return coastG(x, b[5], MODE < 2.5 ? MODE : 0., 0.);
}
float srcS(vec2 x, float g) {
  // broad lifting in sheets and streaks drawn out along the wind (sources longer than a trajectory step, so they never
  // alias); the narrow plume heads over the salt pans are drawn in the composite
  vec2 w = b[11].xy; vec2 r = vec2(dot(x, w), dot(x, vec2(-w.y, w.x))) + b[11].zw;
  float st = .9 * smoothstep(.5, .62, nz(r / vec2(2600., 22. * b[13].w) + .17)) * smoothstep(.4, .6, nw(x / 2200. + .3)) + 1.1 * smoothstep(.5, .75, nw(x / 1100. + .37)) + .03;
  float inl = MODE > 3.5 ? 1. : MODE > 2.5 ? 1. : (1. - smoothstep(700., 1100., g));
  return st * inl * (.4 + 1.2 * nz(x / 5000. + .61));
}
vec2 ivl(float ga, float gb) {
  if (ga > 0. && gb > 0.) return vec2(0., 1.);
  if (ga > 0.) return vec2(0., ga / (ga - gb));
  if (gb > 0.) return vec2(ga / (ga - gb), 1.);
  return vec2(1., 0.);
}
void main() {
  vec2 p = b[0].xy + gl_FragCoord.xy * b[0].zw;
  float t = b[1].x, dt1 = b[1].y; int n1 = int(b[1].z), n2 = int(b[1].w);
  UB = b[2].xy; CA = b[2].z; CK = b[2].w; LR = b[3].x; LV = b[3].y; PP = b[3].z; PH = b[3].w; LC = b[4].xy; LD = b[4].zw;
  MODE = b[7].x; NI_ = b[7].w; K_ = b[8].y; NS_ = b[8].z; SG = b[8].w; HC = b[10].xy; HQ = b[10].z; FS = b[6].z;
  vec4 F = b[6];
  float amp = b[7].y, tdep = b[7].z, toff = b[8].x, leeK = b[9].w, tauR = b[10].w, TD = b[13].x, diu = b[13].z;
  float smA = b[9].x, smY = b[9].y;
  vec2 x = p; float s = t;
  float C = 0., Sm = 0., m = 1.;
  vec2 D = vec2(0.), v1 = vec2(0.); bool got = false;
  float ga = srcG(x), oa = onsetT(x, 0., F) - PH, ea = edgeG(x);
  int NI = int(NI_);
  for (int it = 0; it < 2 * (n1 + n2); it++) {
    int i = it >> 1; bool second = (it & 1) == 1;
    float dt = i < n1 ? dt1 : 2. * dt1;
    vec2 v = vel(second ? x - v1 * dt : x, second ? s - dt : s, second ? i + 1 : i);
    if (!second) v1 = v;
    else {
      vec2 xb = x - .5 * (v1 + v) * dt; float sb = s - dt;
      float gb = srcG(xb), ob = onsetT(xb, 0., F) - PH, eb = edgeG(xb);
      // island lee: dust older than the passage past an island is cleared (refills with a memory tauR)
      for (int j = 0; j < NI; j++) {
        vec4 A = texelFetch(uI, ivec2(j, 0), 0);
        vec2 sg = xb - x; float hh = clamp(dot(A.xy - x, sg) / max(dot(sg, sg), 1e-3), 0., 1.);
        float dd = length(x + sg * hh - A.xy);
        m *= 1. - leeK * min(A.w + .2, 1.) * (1. - smoothstep(.7 * A.z, 1.9 * A.z, dd)) * exp(-(t - s) / tauR);
      }
      // emission: the part of this step spent over the source after the outbreak's onset front passed
      float n = floor((s - PH - oa) / PP), T = n * PP + PH;
      float ha = s - T - oa, hb = sb - T - ob;
      vec2 I1 = ivl(ga, gb), I2 = ivl(ha, hb), I4 = ivl(ea, eb);
      float lo = max(max(I1.x, I2.x), I4.x), hi = min(min(I1.y, I2.y), I4.y);
      if (hi > lo) {
        float um = .5 * (lo + hi);
        vec2 xm = mix(x, xb, um); float sm = mix(s, sb, um);
        float age = mix(ha, hb, um);
        float en = age < F.w ? 1. : exp(-(age - F.w) / toff);
        ivec2 nn = ivec2(int(n) + 4096, 5);
        en *= (n == 0. ? 1. : .65 + .7 * hf(nn, 3u)) * (1. - diu + diu * 2. * max(0., cos(6.2832 * (sm - 2.) / 24.)));
        en *= .5 + .5 * smoothstep(0., 1.5, age);
        C += m * amp * en * srcS(xm, mix(ga, gb, um)) * (hi - lo) * dt * exp(-(t - sm) / tdep);
      }
      if (smA > 0.) {
        // smoke from burning savanna to the south: steady, patchy, darker
        vec2 I3 = ivl(min(smY - x.y, ga), min(smY - xb.y, gb));
        if (I3.y > I3.x) { vec2 xm = mix(x, xb, .5 * (I3.x + I3.y)); Sm += m * smA * smoothstep(.45, .8, vn(xm / 45., 95u)) * (I3.y - I3.x) * dt * exp(-(t - s) / tdep); }
      }
      x = xb; s = sb; ga = gb; oa = ob; ea = eb;
      if (!got && t - s >= TD - 1e-3) { D = x - p; got = true; }
    }
  }
  o = b[13].y > .5 ? vec4(C, Sm, D) : vec4(clamp(C / 6., 0., 1.), clamp(Sm / 3., 0., 1.), clamp(D / 400. + .5, 0., 1.));
}`,bt=N+`uniform sampler2D uA, uB, uL, uC, uN; uniform vec4 q[13]; out vec4 o;
`+tt+`
vec4 st(sampler2D T, vec2 p) {
  vec4 s = texture(T, (p - q[2].xy) / q[2].zw);
  if (q[1].z < .5) s = vec4(s.x * 6., s.y * 3., (s.zw - .5) * 400.);
  return s;
}
float strc(float x) {
  float r = x * 255.;
  return (r < 30. ? r * 110. / 30. : r < 60. ? 110. + (r - 30.) * 50. / 30. : r < 120. ? 160. + (r - 60.) * 50. / 60.
    : r < 190. ? 210. + (r - 120.) * 30. / 70. : min(240. + (r - 190.) * 15. / 65., 255.)) / 255.;
}
void main() {
  float sz = q[0].w, W = q[0].z;
  vec2 uv = vec2(gl_FragCoord.x, sz - gl_FragCoord.y) / sz;
  vec2 sc = (uv - .5) * W;
  vec2 p = q[0].xy + vec2(sc.x, -sc.y);
#ifdef LIMB
  // from the station: the camera 400 km up over q9.xy (moved by the pan), tilted 54 degrees from straight down toward
  // q9.zw (downwind), 50 degrees across. The pixel's ray meets the curved earth (the map point p is the distance along
  // the surface) or misses it (the limb and space above). vm: the slant path through the dust layer
  vec3 hd = vec3(q[9].zw, 0.), cf = vec3(hd.xy * .809, -.588), cu = vec3(hd.xy * .588, .809), cr = vec3(hd.y, -hd.x, 0.);
  vec3 rd = normalize(cf + .466 * ((uv.x * 2. - 1.) * cr + (1. - uv.y * 2.) * cu));
  float bq = 6771. * rd.z, dq = bq * bq - 5255800., ht = sqrt(max(45845441. - bq * bq, 0.)) - 6371.;
  float sky = dq > 0. && bq < 0. ? 0. : 1., sh = -bq - sqrt(max(dq, 0.));
  vec3 P = vec3(0., 0., 400.) + rd * sh;
  float hl = length(P.xy), gd0 = 6371. * asin(clamp(hl / 6371., 0., 1.));
  p = q[0].xy + q[9].xy + P.xy / max(hl, 1e-3) * gd0;
  float mu = max(-dot(rd, normalize(P + vec3(0., 0., 6371.))), 0.), vm = 1. / (mu + .07), fad = 1. - smoothstep(450., 1000., gd0);
#endif
  float frac = q[1].x, DT = q[1].y;
  // two baked passes, each carried along its own wind to now
  vec2 pq = p;
#ifdef HAB
  // the gust front's edge bulges in lobes of unequal size with narrow clefts between them: the dust is read displaced
  // outward from the storm (q10.zw) by a ridged noise in bearing
  vec2 rh = p - q[10].zw; float rr = length(rh) + 1e-3; rh /= rr;
  pq -= rh * (55. * (.5 - abs(textureLod(uN, rh * 1.5 + .17, 0.).z - .5)) + 16. * (.5 - abs(textureLod(uN, rh * 4. + .61, 0.).w - .5)) - 18.);
#endif
  vec4 s0 = st(uA, pq);
  vec2 v = -s0.zw / 3.;
  vec2 pa = pq - v * frac * DT, pb = pq + v * (1. - frac) * DT;
  vec4 sa = st(uA, pa), sb = st(uB, pb);
  vec4 S = mix(sa, sb, frac);
  // a soft cross-wind spread: the bake's thinnest lee lines and shear seams are narrower than the air can hold
  vec2 wd = q[3].xy, wn = vec2(-wd.y, wd.x);
  S.x = .5 * S.x + .25 * mix(st(uA, pa + wn * 3.5).x + st(uA, pa - wn * 3.5).x, st(uB, pb + wn * 3.5).x + st(uB, pb - wn * 3.5).x, frac);
  // a lone thread of dust far out on clear sea (a filament the trajectories stretched to a few km) would have mixed away:
  // where the air 5 km to both sides of it across some direction is clear, it fades (a plume edge has dust on one side)
  vec2 ta = (pa - q[2].xy) / q[2].zw, te = vec2(5., 0.) / q[2].zw, tf = vec2(0., 5.) / q[2].zw;
  float iso = 1. - min(max(textureLod(uA, ta + te, 0.).x, textureLod(uA, ta - te, 0.).x), max(textureLod(uA, ta + tf, 0.).x, textureLod(uA, ta - tf, 0.).x))
    * (q[1].z < .5 ? 6. : 1.) / max(sa.x, 1e-3);
  S.x *= 1. - .96 * smoothstep(.45, .85, iso);
  vec2 X = p + S.zw;
  vec2 sun = q[4].xy; float tz = q[4].z, mu0 = sin(q[4].w);
  float gs = dot(p - q[8].xy, q[8].zw);
#ifdef TWO
  // the far shore (q9: a point on its coast and its normal; its large bays as the land bake draws them): the shore terms
  // below read the nearer of the two coasts
  float gF = dot(p - q[9].xy, q[9].zw) + 170. * (textureLod(uN, p / 1500. + .53, 0.).z - .5) + 64. * (textureLod(uN, p / 430. + .11, 0.).w - .5), gN = gs;
  gs = max(gs, gF - 60.);
#endif
  // the plume's grain, carried with the air: lumpy billows near the coast, combed into fibres along the wind farther out
  vec2 Xa = vec2(dot(X, wd), dot(X, wn));
  float fib = texture(uN, Xa / vec2(800., 48.) + .13).z - .5 + .35 * (texture(uN, Xa / vec2(300., 19.) + .57).w - .5);
  float bil = texture(uN, X / 95. + .31).w - .5 + .5 * (texture(uN, X / 33. + .7).z - .5);
  float fs = mix(bil, fib, smoothstep(-60., -380., gs));
#ifdef LIMB
  // far off, the grain is finer than a pixel: it fades rather than shimmer
  fs *= fad;
#endif
  float tau = max(S.x, 0.) * (1. + .5 * fs) * q[6].w;
  // a thin haze lies as a milky veil over the sea nearer the land, thickening toward the coast, in broad streaks
  tau += q[7].z * smoothstep(-640., -40., gs) * clamp(.85 + .6 * fib, .4, 1.3);
#ifdef HAB
  // the haboob: dust piled up in a rolled rim just behind the gust front (where the air a little farther out is clear),
  // and the fan behind it broken into streaks that point back at the storm (q10.zw)
  float rim = clamp((tau - 1.6 * max(st(uA, pa + rh * 24.).x, 0.) * q[6].w) / max(tau, .05), 0., 1.);
  tau *= (1. - (.18 - .36 * textureLod(uN, rh * 5. + rr / 2600. + .29, 0.).z) * smoothstep(30., -30., dot(p - q[8].xy, q[8].zw)))
    * (1. + 1.8 * rim * smoothstep(.05, .4, tau) * (.6 + .8 * bil));
#endif
  float tauS = max(S.y, 0.) * (1. + .3 * fs) * q[5].w;
  // the ground
  vec2 tl0 = (p - q[2].xy) / q[2].zw;
  vec4 L = texture(uL, tl0);
  vec3 alb = L.rgb * L.rgb;
  float ua = clamp(2. * L.a - 1., -.99, .99), sdf = clamp(16. * ua / (1. - abs(ua)), -30., 30.);
  float land = smoothstep(-.35, .35, sdf);
  // the lee shelf of the low islands (the land bake marks it in the sea texels' colour)
  float shf = clamp((L.g + L.b - 2. * L.r) * 6., 0., 1.) * (1. - land);
  // dust over the desert is nearly the ground's own colour, so there it shows as a loss: the ground's pattern goes soft
  alb = mix(alb, vec3(.4, .3, .2), .75 * (1. - exp(-1.5 * tau)) * land * smoothstep(-60., -25., gs));
  // the dust layer rides over the islands (the clear lee only opens downwind of them): an island is veiled by the air
  // arriving over it, a little thinner than the open plume because the mountain fills the bottom of the layer
  float isl = smoothstep(-.2, 3., sdf) * smoothstep(-25., -60., gs);
  tau = mix(tau, .8 * max(texture(uA, (p + S.zw * .35 - q[2].xy) / q[2].zw).x, 0.) * (q[1].z < .5 ? 6. : 1.) * q[6].w, isl);
  // the highest volcanoes stand up through the dust layer
  vec2 e1 = (p - q[11].xy) / q[11].z, e2 = (p - q[12].xy) / q[12].z;
  tau *= (1. - q[11].w * exp(-dot(e1, e1))) * (1. - q[12].w * exp(-dot(e2, e2)));
  // dust shadow: the sun's path to the ground runs through the column on its side
  vec2 ps = p + sun * tz * 3.5;
  float tauSun = mix(tau, max(st(uA, ps).x, 0.) * q[6].w, .55);
#ifdef HAB
  // the rim stands a few km high: it throws a thin shadow line ahead of itself on the side away from the sun
  vec2 ps2 = p + sun * tz * 9.;
  float tP = max(st(uA, ps2).x, 0.) * q[6].w, rP = clamp((tP - 1.6 * max(st(uA, ps2 + rh * 24.).x, 0.) * q[6].w) / max(tP, .05), 0., 1.);
  tauSun = max(tauSun, .9 * tP * (1. + 1.4 * rP));
#endif
  vec2 gd = uv - q[5].xy;
  // the sea: slate to blue-black in broad soft areas (rougher where the wind is up), long glassy tongues in the lee of
  // the high islands, green-grey where cold water wells up along the coast
  vec2 wq = vec2(dot(p, wd), dot(p, wn));
  float rough = .65 * texture(uN, p / 2900. + .23).z + .35 * texture(uN, wq / vec2(2400., 900.) + .5).w;
  vec2 a1 = vec2(dot(e1, wd), dot(e1, wn)) / .45, a2 = vec2(dot(e2, wd), dot(e2, wn)) / .45;
  float lee = step(.01, q[11].w) * smoothstep(-1., 2., a1.x) * exp(-a1.y * a1.y / (3. + .25 * max(a1.x, 0.)) - max(a1.x, 0.) / 28.)
            + step(.01, q[12].w) * smoothstep(-1., 2., a2.x) * exp(-a2.y * a2.y / (3. + .25 * max(a2.x, 0.)) - max(a2.x, 0.) / 28.);
  lee = min(lee, 1.);
  rough *= 1. - .7 * lee;
  // sun glint: the sun's own colour returned along the track, falling off to both sides over hundreds of km; inside it
  // the sea's roughness drawn fine (wind streaks a few km apart along the wind, slicks between); calm water is dark at
  // the glint's edge and bright at its heart; a warm pewter at the heart turning toward the sea's blue as it thins
  float sk = texture(uN, wq / vec2(260., 22.) + .71).z;
  float gb = q[5].z * exp(-gd.x * gd.x / .09 - gd.y * gd.y / .7), gh = smoothstep(.45, .95, gb / max(q[5].z, 1e-3));
  float gl = gb * ((.3 + 1.15 * clamp(rough + .38 * (sk - .5), 0., 1.)) * (1. - .5 * lee) + .9 * lee * gh);
  vec3 ocean = vec3(.0055, .0115, .026) * (.72 + .6 * rough) + mix(vec3(.2, .21, .23), vec3(.31, .285, .225), smoothstep(.08, .45, gl)) * gl;
  float upw = smoothstep(-280., -40., gs) * smoothstep(.42, .68, texture(uN, (p + 90. * vec2(texture(uN, p / 1500. + .3).z - .5, 0.)) / 620. + .8).w) * q[10].x;
  ocean = mix(ocean, vec3(.0085, .0175, .022) * (.8 + .4 * rough), upw * .75);
  // the shallows: turquoise in a band of uneven width, widest in the bays, a broken white thread of surf at the shore
  float bay = clamp((gs - sdf) / 30., 0., 1.);
  float swd = 3.5 + 15. * bay + 6. * texture(uN, p / 260. + .4).z;
  float cz = smoothstep(-95., -55., gs) * (1. - land) * q[10].x;
  ocean = mix(ocean, vec3(.03, .075, .068), clamp(exp(min(sdf, 0.) / swd) * (.55 + .5 * texture(uN, p / 90.).z), 0., 1.) * .8 * cz);
  ocean = mix(ocean, vec3(.42, .44, .44), (1. - smoothstep(.1, 1., -sdf)) * smoothstep(.35, .6, texture(uN, p / 47. + .2).w) * .5 * cz);
#ifdef TWO
  // pale reef flats in broken strings a few km off the far shore
  float reef = smoothstep(-9., -7., sdf) * (1. - smoothstep(-5., -3.5, sdf)) * smoothstep(.52, .66, texture(uN, p / 31. + .37).z) * step(gN, gF);
  ocean = mix(ocean, vec3(.07, .095, .085) * (.85 + .3 * texture(uN, p / 7. + .5).w), reef * .6);
#endif
  ocean = mix(ocean, vec3(.03, .075, .068), shf * .5);
  vec3 surf = mix(ocean, alb, land);
  // low cumulus under the dust, carried with the air; shadows offset on the sea toward the anti-sun side, a km or two
  // under a mid-morning sun (longer at evening), soft, never darker than three quarters of the sea beside them
#ifdef EVE
  const float SHO = 3.2;
#else
  const float SHO = 1.2;
#endif
  vec2 Xc = p + S.zw * .25;
  vec4 cb = texture(uC, (Xc - q[2].xy) / q[2].zw, .8), cs = texture(uC, (Xc + sun * tz * SHO - q[2].xy) / q[2].zw, 2.5);
  float ctau = 9. * cb.r / (1.03 - cb.r), stau = 9. * cs.r / (1.03 - cs.r);
#ifdef TWO
  // no low cloud over the far desert: the cells end a little off its shore
  float fk = 1. - smoothstep(-24., 4., sdf) * step(gN, gF);
  ctau *= fk; stau *= fk;
#endif
  float Rc = ctau / (ctau + 9.) * (.6 + .55 * cb.g), tk = cb.b;
  float RcHi = Rc * tk, RcLo = Rc * (1. - tk);
#ifdef EVE
  // a low sun: every cloud lays a long shadow streak away from it
  stau = max(stau, max(9. * texture(uC, (Xc + sun * tz * 1.1 - q[2].xy) / q[2].zw, 1.5).r, 9. * texture(uC, (Xc + sun * tz * 2.1 - q[2].xy) / q[2].zw, 1.5).r) / 1.03);
#endif
  float shd = 1. - exp(-.3 * stau);
  vec3 below = RcLo * vec3(.97, .99, 1.) + (1. - RcLo) * (1. - RcLo) * surf * (1. - .25 * shd * (1. - cb.r) * (1. - cs.b));
#ifdef LIMB
  // seen slantwise the dust is thicker by the slant path; beyond the simulated square it is the haze's own mean
  vec2 tq = (p - q[2].xy) / q[2].zw, te2 = smoothstep(vec2(0.), vec2(.04), tq) * smoothstep(vec2(1.), vec2(.96), tq);
  tau = mix(.3 * q[6].w, tau, te2.x * te2.y) * vm; tauS *= vm;
#endif
  // the dust layer: two-stream reflectance from the spectral single-scattering albedo, warm transmission
  vec3 om = q[6].xyz;
  vec3 tl = tau * vec3(.93, 1., 1.08);
  vec3 Rinf = (1. - sqrt((1. - om) / (1. - .7 * om))) / (1. + sqrt((1. - om) / (1. - .7 * om)));
  vec3 Rd = Rinf * (1. - exp(-tl * .16 * om / Rinf));
  // colour by thickness: a milky blue-grey where thin, putty, then a sandy ochre where thick (the hue turns as it thickens)
  Rd *= mix(mix(vec3(.93, .98, 1.07), vec3(1.03, .99, .91), q[7].w), vec3(1.08, 1., .84), smoothstep(.15, .85, 1. - exp(-.6 * tau)));
  // smoke: smaller absorbing particles, grey-brown
  vec3 ts = tauS * vec3(.7, 1., 1.35);
  Rd += vec3(.11, .1, .09) * (1. - exp(-ts * .9)) * (1. - Rinf);
  vec3 Tv = exp(-tl * (1. - om * .75) - ts * .55);
  vec3 Tsun = exp(-(tauSun * vec3(.93, 1., 1.08) * (1. - om * .75) + ts * .55) / max(mu0, .3));
  // relief of the dust top: thick tongues lit on their sun side
  float tg = (st(uA, p + sun * 6.).x - st(uA, p - sun * 6.).x) * q[6].w;
#ifdef EVE
  Rd *= 1. + clamp(tg * .3, -.45, .35);
#else
  Rd *= 1. + clamp(tg * .12, -.25, .25);
#endif
  vec3 R = Rd + Tv * Tsun * below;
  // the tallest cumulus and the cap cloud poke through the dust: crisp, shadowing the dust top
  R *= 1. - .25 * shd * cs.b;
  R = RcHi * vec3(.99, 1., 1.02) + (1. - RcHi) * (1. - RcHi) * R;
  // faint cirrus wisps high above, drawn out across the trades
  if (q[10].y > 0.) {
    vec2 cw = vec2(q[3].x * .8 - q[3].y * .6, q[3].y * .8 + q[3].x * .6);
    vec2 cq = vec2(dot(p, cw), dot(p, vec2(-cw.y, cw.x)));
    float ci = texture(uN, cq / vec2(1500., 420.) + .41).z + .35 * (texture(uN, cq / vec2(500., 160.) + .83).w - .5);
    float veil = q[10].y * smoothstep(.62, .85, ci) * (.5 + .7 * texture(uN, cq / vec2(240., 80.) + .17).w);
    R = mix(R, vec3(.8, .82, .85), veil * .06);
  }
  // Rayleigh path radiance above it all
  R = R * vec3(.98, .97, .95) + vec3(.003, .006, .016);
#ifdef LIMB
  // the air's own blue haze thickens toward the horizon; above it the thin bright line of the limb, then space
  R = mix(R, vec3(.16, .2, .3), 1. - exp(-.045 * (1. / (mu + .03) - 1.)));
  R = mix(R, vec3(.2, .38, .95) * exp(-max(ht, 0.) / 7.) + vec3(.06, .1, .25) * exp(-max(ht, 0.) / 2.), sky);
#endif
#ifdef EVE
  // an hour before dusk: the sun's height falls across the frame, full on its west part and down to under a degree at
  // the east edge (so the terminator never lies inside the opening frame), its light reddened a little by the long path;
  // as it falls the ground is lit more and more by the twilight sky alone, a dim blue-grey, never a brown or black edge
  float el = q[4].w * (1.6 - 1.5 * clamp(p.x / W + .5, -1., 1.)), se = sin(max(el, 0.)), am = min(1. / (se + .05), 9.);
  float dk = smoothstep(0., .1, el);
  vec3 Rs = R * exp(-vec3(.008, .02, .045) * (am - 1.)) * min(se / sin(q[4].w), 1.25);
  Rs = mix(vec3(dot(Rs, vec3(.3, .55, .15))), Rs, .3 + .7 * dk);
  R = Rs + (dot(R, vec3(.3, .55, .15)) * vec3(.5, .62, .95) * .14 + vec3(.006, .011, .022)) * (1. - dk);
#endif
  // the standard true-colour stretch of corrected reflectance (0,30,60,120,190,255 -> 0,110,160,210,240,255)
  vec3 col = vec3(strc(R.r), strc(R.g), strc(R.b));
#ifdef LIMB
  vec3 colS = col;
#endif
  // the aerosol optical depth product: retrieved where the sky is clear of cloud, grey elsewhere
  if (q[7].x > 0.) {
    // retrieved on a coarse grid of 10 km cells fixed to the ground
    vec2 pc = (floor(p / 10.) + .5) * 10., tcU = (pc - q[2].xy) / q[2].zw;
    vec2 tc = texture(uA, tcU).xy * (q[1].z < .5 ? vec2(6., 3.) : vec2(1.));
    float ta = clamp((max(tc.x, 0.) + max(tc.y, 0.) * q[5].w / q[6].w) * .22, 0., 1.6);
    vec3 pal = ta < .25 ? mix(vec3(.98, .97, .72), vec3(.98, .84, .38), ta / .25)
             : ta < .6 ? mix(vec3(.98, .84, .38), vec3(.93, .5, .17), (ta - .25) / .35)
             : ta < 1. ? mix(vec3(.93, .5, .17), vec3(.72, .17, .08), (ta - .6) / .4)
             : mix(vec3(.72, .17, .08), vec3(.35, .07, .05), min((ta - 1.) / .6, 1.));
    float cc = texture(uC, tcU, 3.).r, lc = texture(uL, tcU, 3.).a;
    float ok = (1. - step(.12, cc)) * step(lc, .5) * step(gl, .25);
    float gy = dot(col, vec3(.3, .55, .15)) * .2 + .4;
    vec3 prod = mix(vec3(gy), pal * .9, ok);
    prod = mix(prod, vec3(.2), (1. - smoothstep(.0, 1.3 * W / sz, abs(sdf))) * .8);
    // the edge of the instrument's swath: a slanted boundary fixed to the ground, beyond which the pass saw nothing
    prod = mix(prod, vec3(.05, .055, .06), smoothstep(-1., 1., (dot(p, vec2(.97, -.24)) - .4 * W) * sz / W));
    col = mix(col, prod, q[7].x);
  }
#ifdef LIMB
  col = mix(col, colS, sky);
#endif
  o = vec4(col + (hf(ivec2(gl_FragCoord.xy), 99u) - .5) / 255., 1.);
}`,Ot=N+"uniform sampler2D uT; out vec4 o; void main() { o = texelFetch(uT, ivec2(gl_FragCoord.xy), 0); }";function zt(e,o){const t=o.map(r=>{const s=e.createProgram();for(const[l,f]of[[e.VERTEX_SHADER,jt],[e.FRAGMENT_SHADER,r]]){const p=e.createShader(l);e.shaderSource(p,f),e.compileShader(p),e.attachShader(s,p)}return e.linkProgram(s),s});return t.forEach(r=>{if(!e.getProgramParameter(r,e.LINK_STATUS)){const s=e.getAttachedShaders(r);throw new Error("349 link: "+e.getProgramInfoLog(r)+s.map(l=>e.getShaderInfoLog(l)).join(`
`))}}),t}function ve(e,o,t,r,s,l){const f=e.createTexture();return e.bindTexture(e.TEXTURE_2D,f),e.texStorage2D(e.TEXTURE_2D,1,r,o,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,l),f}function Ae(e,o){const t=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),t}function pe(e,o,t,r,s,l){e.useProgram(t),e.bindVertexArray(o.vao),e.bindFramebuffer(e.FRAMEBUFFER,r),e.viewport(0,0,s,l),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0)}function G(e,o,t,r){e.activeTexture(e.TEXTURE0+o),e.bindTexture(e.TEXTURE_2D,t),e.uniform1i(r,o)}function Vt(e,o){if(e.__c349)return e.__c349;const t={};t.half=!!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float")),[t.LX,t.LY]=e.getParameter(e.MAX_TEXTURE_SIZE)>=2048?[1920,1600]:[1280,914];let r;[t.pNoise,r,t.pLand,t.pBake,t.pComp,t.pBlit]=zt(e,[Gt,pt.replace(N,N+o),yt,gt,bt,Ot]),t.vao=e.createVertexArray();const s=(f,p)=>e.getUniformLocation(f,p);t.var={},t.uT=s(t.pBlit,"uT"),t.var["cumu"+o]={p:r,u:s(r,"k"),t:[s(r,"uN"),s(r,"uI")]},t.noise=ve(e,xe,xe,e.RGBA8,e.LINEAR,e.REPEAT);let l=Ae(e,t.noise);return pe(e,t,t.pNoise,l,xe,xe),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(l),e.bindFramebuffer(e.FRAMEBUFFER,null),t.tgt={},t.free=[],t.freeT=[],t.reg=typeof FinalizationRegistry=="function"?new FinalizationRegistry(f=>{const p=f.tile?t.freeT:t.free;if(p.length<2){p.push(f);return}try{e.deleteFramebuffer(f.cellF),e.deleteTexture(f.cell);for(const ee of f.st)e.deleteFramebuffer(ee.f),e.deleteTexture(ee.t);e.deleteFramebuffer(f.landF),e.deleteTexture(f.land),e.deleteTexture(f.isl),e.deleteTexture(f.vt)}catch{}}):null,e.__c349=t,t}function Ue(e,o,t,r){const s=t+r;if(o.var[s])return o.var[s];const l=r||t==="cumu"?zt(e,[{land:yt,bake:gt,comp:bt,cumu:pt}[t].replace(N,N+r)])[0]:{land:o.pLand,bake:o.pBake,comp:o.pComp}[t],f=p=>e.getUniformLocation(l,p);return o.var[s]=t==="cumu"?{p:l,u:f("k"),t:[f("uN"),f("uI")]}:t==="land"?{p:l,u:f("l"),uF:f("lF"),t:[f("uI"),f("uN")]}:t==="bake"?{p:l,u:f("b"),t:[f("uN"),f("uI"),f("uV")]}:{p:l,u:f("q"),t:["uA","uB","uL","uC","uN"].map(f)}}function Yt(e,o,t){const r=t?o.freeT:o.free;if(r.length)return r.pop();const s=t?{tile:!0,nx:dt/4,ny:ut/4,cx:mt/4,cy:xt/4,lx:Math.round(o.LX/4),ly:Math.round(o.LY/4)}:{nx:dt,ny:ut,cx:mt,cy:xt,lx:o.LX,ly:o.LY},l=e.createTexture();e.bindTexture(e.TEXTURE_2D,l),e.texStorage2D(e.TEXTURE_2D,t?Math.floor(Math.log2(Math.max(s.cx,s.cy)))+1:11,e.RGBA8,s.cx,s.cy),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),s.cell=l,s.cellF=Ae(e,l);const f=o.half?e.RGBA16F:e.RGBA8;return s.st=[0,1,2].map(()=>{const p=ve(e,s.nx,s.ny,f,e.LINEAR,e.CLAMP_TO_EDGE);return{t:p,f:Ae(e,p)}}),s.land=ve(e,s.lx,s.ly,e.RGBA8,e.LINEAR,e.CLAMP_TO_EDGE),s.landF=Ae(e,s.land),s.isl=ve(e,B,3,e.RGBA32F,e.NEAREST,e.CLAMP_TO_EDGE),s.vt=ve(e,Ce,je,e.RGBA32F,e.NEAREST,e.CLAMP_TO_EDGE),s}function Wt(e){let o=parseInt(e.slice(2,10),16)^parseInt(e.slice(18,26),16)*7^parseInt(e.slice(42,50),16);return()=>{o=o+1831565813|0;let t=Math.imul(o^o>>>15,1|o);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function O(e,o){let t=e()*o.reduce((r,s)=>r+s.w,0);for(const r of o)if(t-=r.w,t<=0)return r;return o[o.length-1]}const ce=e=>[Math.cos(e),Math.sin(e)];function He(e,o,t){let r=parseInt(e.slice(o,o+8),16)^t;return()=>{r=r+1831565813|0;let s=Math.imul(r^r>>>15,1|r);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}ft.add({num:349,name:"Dust Plume",fam:"Worlds",recipe:"A satellite pass over a dust storm pouring off a desert coast out over a dark ocean, carried by real wind so it curls round, eddies and leaves clear wakes behind any islands. The storm, where the coast is and the clouds change every mint. Drag to follow the plume, tap for the next day's pass, or hold to see a map of how thick the dust is.",interactive:"Drag to pan along the plume, tap for the next day's pass, hold to see the aerosol thickness product",music:!0,gl:!0,fps:30,seed:0,make(e){const o=e.gl,t=Wt(e.hash),r=[{n:"classic outbreak",v:0,w:5},{n:"haboob front",v:1,w:2.2},{n:"thin haze",v:2,w:2},{n:"Caribbean arrival",v:3,w:.6},{n:"Bodele plume",v:4,w:.15}],s=[{n:"few",v:0,w:2.5},{n:"cloud streets",v:1,w:4},{n:"open cells",v:2,w:3}],l=[{n:"Canary-like chain",w:4},{n:"Cape Verde-like ring",w:3},{n:"lone peak",w:2}],f=[{n:"curling low",v:1,w:5},{n:"straight stream",v:0,w:3}],p=[{n:"winter",v:0,w:5},{n:"summer",v:1,w:4}],ee=[{n:"none",v:0,w:7.5},{n:"sun glint",v:1,w:2.5}],le=[{n:"none",v:0,w:9.2},{n:"smoke mix",v:1,w:.8}],Ge=[{n:"close",v:560,w:2.5},{n:"regional",v:820,w:5},{n:"wide",v:1150,w:2.5}];let D=O(t,r),P=O(t,s),Oe=O(t,l),we=O(t,f),ye=O(t,p),te=O(t,ee),V=O(t,le),Me=O(t,Ge);e.home&&(D=r[0],P=s[1],Oe=l[0],we=f[0],ye=p[0],te=ee[0],V=le[0],Me=Ge[1]),D.v===4&&(D=r[0]);const n=D.v,Ve=He(e.hash,34,882650428),oe=!e.home&&n<3&&(P.v===0||Ve()<(ye.v===1?.3:.6)),X=oe?`#define DECK 1
`:"",m=Vt(o,X),u=Yt(o,m,e.tile),Y=Ue(o,m,"cumu",X),w=u.nx,b=u.ny,C=u.cx,W=u.cy,K=u.lx,A=u.ly;let Z=n===3?"Lesser Antilles-like arc":n===4?"none":Oe.n;n===4&&(V=le[0]),e.trait("Event",D.n+(V.v?", smoke mix":"")),e.trait("Clouds",P.n),e.trait("Islands",Z),e.trait("Flow",we.n),e.trait("Season",ye.n),e.trait("Glint",te.n),e.trait("Scale",Me.n);const M=He(e.hash,26,882641495),Q=[{n:"corner",w:50},{n:"down the right edge",w:25},{n:"across the frame",w:25}],F=e.home?0:Q.indexOf(O(M,Q)),j=He(e.hash,10,882802177),T=!e.home&&n<3&&F!==2&&j()<.26&&!te.v&&!(n===2&&P.v===0),ae=He(e.hash,50,2044689264),se=[ae(),ae(),ae(),ae(),ae()];let he=!e.home&&n<3&&F===0&&se[0]<.31;const Le=!e.home&&n===0&&F!==2&&!T&&!he&&!te.v&&se[1]<.45,c=Me.v,k=e.home?0:1,$=ye.v===1;let fe=Math.PI+($?.4:.66)-(we.v===0?.3:0)+k*(t()-.5)*.3,_=ce(fe),Ye=($?30:25)*(1+k*(t()-.5)*.25);n===4&&(fe=Math.PI+.78+k*(t()-.5)*.2,_=ce(fe),Ye=34),n===3&&(fe=Math.PI+.1,_=ce(fe),Ye=26);const kt=(40+k*(t()-.5)*16)*Math.PI/180,x=[Math.cos(kt),-Math.sin(kt)];let v=n===3?[c*.78,0]:[c*(.26+k*(t()-.5)*.06),-c*(.28+k*(t()-.5)*.06)];n===3&&(x[0]=1,x[1]=0);const S=v.slice();if(n<3&&F===1){const a=(6+(M()-.5)*10)*Math.PI/180;x[0]=Math.cos(a),x[1]=-Math.sin(a),v=[c*(.31+M()*.05),S[1]]}else if(n<3&&F===2){const a=c*(.16+.05*M());v=[S[0]-x[0]*a,S[1]-x[1]*a]}const J=(()=>{const a=n===4?fe:n===3?Math.PI:Math.PI+.55;return ce(a)})(),ot=.6*c,Tt=-.35*c,We=(a,i)=>i(J[a]*Tt,J[a]*ot),E=[Math.min(0,We(0,Math.min))-.54*c,Math.min(0,We(1,Math.min))-.54*c],ge=[Math.max(0,We(0,Math.max))+.54*c,Math.max(0,We(1,Math.max))+.54*c],Kt=n===4?24:90,Zt=0,at=n===4?17.5:n===2?62:n===1?14:e.home?13+0*t():(n===3?41:0)+19+k*(t()-.5)*8,Qt=we.v===1&&n!==4,$t=(n===3?330:270)*(1+k*(t()-.5)*.3),Jt=Qt?(n===3?18:26)*(1+k*(t()-.5)*.3):0,Et=[-.72*c+k*(t()-.5)*.3*c,-.5*c+($?.2*c:0)+k*(t()-.5)*.3*c],Ke=[5+k*t()*4,4+k*t()*3],qt=[Et[0]-Ke[0]*at,Et[1]-Ke[1]*at],Rt=ce(Math.PI+1.05+k*(t()-.5)*.6),eo=n===1?42:n===4?400:30,Ze=[v[0]+140+t()*80,v[1]-20-t()*80],z=[],st=(a,i,d,h,g)=>z.push({x:a,y:i,r:d,h,sh:g,e:1+t()*.5,a:t()*6.28,s:t()*50});if(n===3)for(let a=0;a<7;a++){const i=-.62+a*.19+(t()-.5)*.07,d=c*(.92+(t()-.5)*.05);st(-.66*c+d*Math.cos(i),.02*c+d*Math.sin(i),11+t()*8,.7+t()*.3,a===2||a===4?1:.2)}else if(n!==4){const a=Z;if(a==="Canary-like chain"){const i=[S[0]-80,S[1]+.3*c],d=[[0,0,13,.3,0,3.6,1,[0,.2,1,.5]],[42,70,10,.32,0,2.7,1.1,[0,0,1,1]],[-157,-45,22,.8,.9,1.05,.6,[.06,0,0,.1]],[-252,-10,22,1,1,1.55,.55,[.22,.1,0,.35]],[-310,-30,10,.7,.25,1.1,.3,[0,.05,0,0]],[-370,30,11,.9,.45,1.9,1.62,[0,.25,0,.4]],[-388,-66,9,.75,.3,1.25,.9,[.3,0,0,.3]]];for(const h of d){const g=t();z.push({x:i[0]+h[0]*c/820,y:i[1]+h[1]*c/820,r:h[2],h:h[3],sh:h[4],e:h[5],a:h[6]+(g-.5)*.25,s:t()*50,p:h[7]})}}else if(a==="Cape Verde-like ring"){const i=[S[0]-.55*c+60,S[1]+.38*c-215],d=[[-171,219,12,.9,.7,1.7,.75,[.05,.1,0,.1]],[-144,190,8,.6,0,1.25,.4,[.15,0,0,.3]],[-75,166,6,.7,0,3.4,.25,[0,.2,0,.2]],[72,183,6,.25,0,2.3,1.55,[0,.15,1,.6]],[86,113,13,.3,0,1.15,.9,[.1,0,1,.3]],[45,17,8,.3,0,1.3,1.3,[0,.1,1,.2]],[0,0,13,.75,.3,1.8,1.5,[.05,.2,0,.25]],[-83,-17,12,1,1,1,0,[0,0,0,.7]],[-118,-26,5,.6,0,1.1,0,[0,0,0,0]]];for(const h of d){const g=t(),H=t();z.push({x:i[0]+h[0],y:i[1]+h[1],r:h[2],h:h[3],sh:h[4],e:h[5]*(.95+g*.1),a:h[6]+(H-.5)*.2,s:t()*50,p:h[7]})}z.push({x:i[0]-116,y:i[1]+190,r:3.5,h:.4,sh:0,e:1.4,a:.3,s:17,p:[0,0,0,.2]})}else st(S[0]-.5*c,S[1]+.5*c,17,1,1),st(S[0]-.5*c+55,S[1]+.5*c+35,6,.4,0)}const be=[v[0]+x[0]*50,v[1]+x[1]*50],q=J.slice();if(Le){const a=z.reduce((g,H)=>[g[0]+H.x/z.length,g[1]+H.y/z.length],[0,0]),i=[a[0]-be[0],a[1]-be[1]],d=Math.hypot(i[0],i[1])||1;q[0]=J[0]+.8*i[0]/d,q[1]=J[1]+.8*i[1]/d;const h=Math.hypot(q[0],q[1]);q[0]/=h,q[1]/=h}if(Le)for(const a of[0,1250+.24*c])for(const i of[-1,1]){const d=400+.45*a,h=be[0]+q[0]*a+q[1]*i*d,g=be[1]+q[1]*a-q[0]*i*d;E[0]=Math.min(E[0],h),E[1]=Math.min(E[1],g),ge[0]=Math.max(ge[0],h),ge[1]=Math.max(ge[1],g)}const ne=[ge[0]-E[0],ge[1]-E[1]];let Ne=null;if(he){const a=(Ee,R)=>{let Xe=0;for(let me=0;me<24;me++)for(let I=0;I<24;I++)((me+.5)/24-.5)*c*Ee[0]+((I+.5)/24-.5)*c*Ee[1]>R&&Xe++;return Xe/576},i=Math.atan2(-x[1],-x[0]),d=.16+.07*se[4],h=[45,30,60,15],g=Math.floor(se[3]*4),H=h.slice(g).concat(h.slice(0,g),[-15,-30]);for(let Ee=0;Ee<6&&!Ne;Ee++){const R=ce(i+(H[Ee]+6*(se[2]-.5))*Math.PI/180);let Xe=-c,me=c;for(let L=0;L<24;L++){const qe=(Xe+me)/2;a(R,qe)>d?Xe=qe:me=qe}let I=me;for(const L of z)I=Math.max(I,L.x*R[0]+L.y*R[1]+L.r*L.e+70);let Xt=!0;for(let L=-1.2;L<=1.2;L+=.1){const qe=R[0]*I-R[1]*L*c,Ct=R[1]*I+R[0]*L*c;Math.abs(qe)<.62*c&&Math.abs(Ct)<.62*c&&(qe-v[0])*x[0]+(Ct-v[1])*x[1]>-.22*c&&(Xt=!1)}Xt&&a(R,I)>=.13&&(Ne=[R[0]*I,R[1]*I,R[0],R[1]])}Ne||(he=!1)}e.trait("Coast",n===3?"none, mid-ocean":n===4?"none, inland":he?"two shores":Q[F].n),e.trait("Pass",T?"evening":Le?"from the station":"morning"),z.sort((a,i)=>i.sh-a.sh);const to=Math.min(2,z.filter(a=>a.sh>.2).length);{const a=new Float32Array(B*3*4);z.slice(0,B).forEach((i,d)=>{a.set([i.x,i.y,i.r,i.sh],d*4),a.set([i.h,i.e,i.a,i.s],(B+d)*4),a.set(i.p||[0,0,0,0],(2*B+d)*4)}),o.bindTexture(o.TEXTURE_2D,u.isl),o.texSubImage2D(o.TEXTURE_2D,0,0,0,B,3,o.RGBA,o.FLOAT,a)}const At=n===1?`#define HAB 1
`:"",Mt=he?`#define TWO 1
`:"",oo=At+Mt+(T?`#define EVE 1
`:"")+(Le?`#define LIMB 1
`:""),Pe=Ue(o,m,"land",Mt),Fe=Ue(o,m,"bake",At),nt=Ue(o,m,"comp",oo),ze=(T?5+6*j():$?66:46)*Math.PI/180,rt=(T?252+26*j():$?105:145)*Math.PI/180,ke=[Math.sin(rt),Math.cos(rt)],Qe=[v[0]+.15*c,v[1]+.55*c];pe(o,m,Pe.p,u.landF,K,A),o.uniform4fv(Pe.u,new Float32Array([E[0],E[1],ne[0]/K,ne[1]/A,v[0],v[1],x[0],x[1],n,Math.min(z.length,B),ke[0],ke[1],_[0],_[1],t()*40,t()*40,Qe[0],Qe[1],160,75,$?1:0,$?.7:.15,.85+t()*.15,n===4?1:.6+t()*.4,3,Math.sin(ze),2.6,n<3?32:0])),he&&o.uniform4fv(Pe.uF,new Float32Array(Ne)),G(o,0,u.isl,Pe.t[0]),G(o,1,m.noise,Pe.t[1]),o.drawArrays(o.TRIANGLES,0,3);const ao=[.24,.5,.14,.09,.25][n]*(1+k*(t()-.5)*.3),$e=n===4?_:ce(fe),_e=new Float32Array(60),so=n>=3||c<600||!e.home&&t()<.4?1e5:.45*c*-$e[1]+(-.2+(e.home?-.07:t()*.3))*c*$e[0];_e.set([E[0],E[1],ne[0]/w,ne[1]/b,0,.5,48,20,_[0]*Ye,_[1]*Ye,n===3?6:5.5,600,$t,Jt,Kt,Zt,qt[0],qt[1],Ke[0],Ke[1],v[0],v[1],x[0],x[1],Rt[0],Rt[1],eo,n===4?6:n===1?14:n===0?60:38,n,ao,n===2?70:n===3?90:46,Math.min(z.length,B),n===4?2.5:9,6,to,.7,V.v?.3:0,v[1]-.25*c,so,n===3?.45:.7,Ze[0],Ze[1],n===1?62:0,7,$e[0],$e[1],t()*300,t()*300,Qe[0],Qe[1],160,75,3,m.half?1:0,n===4?.7:.35,n===4?9:16]),_e.set(n===2?[110,520,0,0]:[70,4e3,0,0],56);const no=z.slice(0,B).map(a=>[a.x,a.y,a.r,a.sh].map(Math.fround)),ro=new Float32Array(Ce*je*4);u.vtK=NaN;function Je(a,i,d){const h=u.st[a%3];_e[4]=at+a*Re,u.vtK!==a&&(u.vtK=a,o.bindTexture(o.TEXTURE_2D,u.vt),o.texSubImage2D(o.TEXTURE_2D,0,0,0,Ce,je,o.RGBA,o.FLOAT,Ht(_e,no,ro))),pe(o,m,Fe.p,h.f,w,b),o.enable(o.SCISSOR_TEST),o.scissor(0,i,w,d-i),o.uniform4fv(Fe.u,_e),G(o,0,m.noise,Fe.t[0]),G(o,1,u.isl,Fe.t[1]),G(o,2,u.vt,Fe.t[2]),o.drawArrays(o.TRIANGLES,0,3),o.disable(o.SCISSOR_TEST)}const it=n===4?[.985,.975,.955]:n===3?[.985,.96,.91]:V.v?[.965,.93,.86]:[.975,.92,.83],Lt=te.v?[.5+Math.cos(rt)*0+(t()-.5)*.3,.5+(t()-.5)*.3]:[0,0],y=new Float32Array(52);y.set([0,0,c,e.size,0,Re,m.half?1:0,n,E[0],E[1],ne[0],ne[1],_[0],_[1],620,P.v,ke[0],ke[1],1/Math.tan(ze),ze,Lt[0],Lt[1],te.v*($?.9:.6),1,it[0],it[1],it[2],1,0,0,1*(n===4?0:n===3?1.1:.95),1*(P.v===0?.55:$?.6:.45),v[0],v[1],x[0],x[1],t()*500,t()*500,n===3?0:300,n<3?7:0,n<3?.9:0,0,Ze[0],Ze[1]]),y[30]=n===2?.2:0,y[31]=n===2?.8:0,z.filter(a=>a.h>.84).sort((a,i)=>i.h-a.h).slice(0,2).forEach((a,i)=>y.set([a.x,a.y,.45*a.r,Math.min(.9,(a.h-.8)*4.5)],44+4*i)),y[46]===0&&(y[46]=1),y[50]===0&&(y[50]=1),he&&y.set(Ne,36),Le&&y.set([be[0]-q[0]*222,be[1]-q[1]*222,q[0],q[1]],36);const Se=new Float32Array(24),io=n===4?-1:(e.home?-.13:[-.1,0,.03][P.v]+(t()-.5)*.08)+(n===3?.05:0)+0;y[41]=e.home?0*t():t()<.5?.3+t()*.7:0,Se.set([E[0],E[1],ne[0]/C,ne[1]/W,_[0],_[1],P.v,io,v[0],v[1],x[0],x[1],ke[0]*Math.cos(ze),ke[1]*Math.cos(ze),Math.sin(ze),n===3?0:300,0,0,Math.min(z.length,B),0,13+t()*9,230+t()*120,6+t()*1.5,n]),Se[19]=oe?(.22+.2*Ve())*c:1e5;const Nt=[t()*900,t()*900];function Pt(a){pe(o,m,Y.p,u.cellF,C,W),Se[16]=Nt[0]+a*173,Se[17]=Nt[1]+a*97,o.uniform4fv(Y.u,Se),G(o,0,m.noise,Y.t[0]),G(o,1,u.isl,Y.t[1]),o.drawArrays(o.TRIANGLES,0,3),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindTexture(o.TEXTURE_2D,u.cell),o.generateMipmap(o.TEXTURE_2D)}Pt(0);function co(){let a=m.tgt[e.size];if(!a){const i=ve(o,e.size,e.size,o.RGBA8,o.NEAREST,o.CLAMP_TO_EDGE);a=m.tgt[e.size]={t:i,f:Ae(o,i)}}return a}let U=0,re=0,de=0,ue=0,ct=0;function Ft(a){y[0]=J[0]*ue,y[1]=J[1]*ue,y[3]=e.size,y[4]=a,y[28]=ct,y[29]=de;const i=co();o.flush(),pe(o,m,nt.p,i.f,e.size,e.size),o.uniform4fv(nt.u,y);const d=[u.st[U%3].t,u.st[(U+1)%3].t,u.land,u.cell,m.noise];for(let h=0;h<5;h++)G(o,h,d[h],nt.t[h]);o.drawArrays(o.TRIANGLES,0,3),pe(o,m,m.pBlit,null,e.size,e.size),G(o,0,i.t,m.uT),o.drawArrays(o.TRIANGLES,0,3)}function _t(){Je(U,0,b),Je(U+1,0,b),re=0}_t(),Ft(0);let Te=-1,St=0,It=0,lt=0,ht=0,Ie=!1,Be=!1,De=0,Bt=!1;const Dt=(a,i)=>{i=Math.min(Math.max(i||0,0),.25),De+=i;const d=e.input;d.taps();let h=!1;for(d.down?(Te<0&&(Te=De,St=lt=d.x,It=ht=d.y,Ie=!1),Math.hypot(d.x-St,d.y-It)>.02&&(Ie=!0),Ie&&(Bt=!0,ue+=((d.x-lt)*J[0]-(d.y-ht)*J[1])*c*-1,ue=Math.max(Tt,Math.min(ot,ue))),lt=d.x,ht=d.y,!Be&&!Ie&&De-Te>.35&&(Be=!0,e.sound.note(57,{dur:1.6,vel:.14,wave:"triangle",cutoff:1400}))):(Te>=0&&!Ie&&De-Te<=.35&&(h=!0),Be&&e.sound.note(52,{dur:1.2,vel:.1,wave:"triangle",cutoff:1e3}),Te=-1,Be=!1),ct+=((Be?1:0)-ct)*(1-Math.exp(-i/.18)),Bt||(ue=Math.min(.4*ot,ue+i*.006*c*Math.min(1,De/6))),h?(de+=24,U=Math.floor(de/Re),_t(),Pt(Math.round(de/24)),e.sound.hit("noise",.3,{dur:1.4,cutoff:700}),e.sound.note(62,{dur:1.6,vel:.12,wave:"sine"})):de+=i*Ut;de>=(U+1)*Re;)re<ie&&(Je(U+2,Math.floor(re*b/ie),b),re=ie),U++,re=0;const g=de/Re-U,H=Math.min(ie,Math.ceil(g*ie*1.15));H>re&&(Je(U+2,Math.floor(re*b/ie),Math.floor(H*b/ie)),re=H),Ft(g)};return m.reg&&m.reg.register(Dt,u),Dt}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
