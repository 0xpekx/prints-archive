// Prairie Storm: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/503.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(He){He&&function(){"use strict";const zo={yaw:0,pitch:0,x:0,y:0,z:0},kt=(o,e,E)=>o<e?e:o>E?E:o,Pt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,Qt=`
uniform vec4 uP[34];
uniform sampler2D uN2;
#define TIME uP[0].x
#define PHI uP[0].y
#define WIND uP[0].w
#define SUN uP[1].xyz
#define EYE uP[3].xyz
#define ENC uP[21].w
float at2(vec2 v) {
  float ax = abs(v.x), ay = abs(v.y);
  float a = atan(min(ax, ay) / max(max(ax, ay), 1e-7));
  a = ay > ax ? 1.5707963 - a : a;
  a = v.x < 0. ? 3.1415927 - a : a;
  return v.y < 0. ? -a : a;
}
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 skyCol(vec3 d) {
  vec3 L = SUN;
  float e = max(d.y, 0.);
  vec2 dh = normalize(d.xz + vec2(1e-6, 0.)), lh = normalize(L.xz + vec2(1e-6, 0.));
  float ca = dot(dh, lh) * .5 + .5;
  float cs = max(dot(d, L), 0.);
  vec3 hor = mix(uP[18].rgb, uP[17].rgb, pow(ca, 1.4));
  vec3 c = mix(hor, uP[16].rgb, smoothstep(0., .42, pow(e, .8)));
  c = mix(c, uP[15].rgb, smoothstep(.25, 1., e));
  float anti = 1. - ca;
  c = mix(c, uP[16].rgb * vec3(.7, .75, 1.05), anti * anti * exp(-e / .03) * .55);
  c += uP[18].rgb * vec3(1., .75, .85) * anti * anti * exp(-pow((e - .07) / .05, 2.)) * .35;
  c += uP[17].rgb * .45 * exp(-e / .03) * (.35 + .65 * ca);
  c += uP[19].rgb * uP[19].w * (pow(cs, 14.) * .5 + pow(cs, 4.) * .08) * exp(-e * 3.);
  return c;
}
vec3 sunAt(float h) {
  float hs = uP[15].w;
  return uP[19].rgb * smoothstep(hs - .4, hs + .7, h) * mix(vec3(1., .32, .12), vec3(1.), smoothstep(hs, hs + 4., h));
}
float gustAt(vec2 xz) {
  vec2 a = xz - uP[27].zw * WIND * TIME * .85;
  float g = textureLod(uN2, a * .0105, 0.).r * .62 + textureLod(uN2, a * .034 + .43, 0.).b * .38;
  return smoothstep(.32, .76, g);
}
#define PUFF(i) { vec4 G = uP[i]; vec2 dv = xz - G.xy; float w = G.w * exp(-dot(dv, dv) / 26.); b += vec2(cos(G.z), sin(G.z)) * w; g += w * .6; }
vec2 bendAt(vec2 xz, out float g) {
  g = gustAt(xz);
  vec2 b = uP[27].zw * (WIND / 21.) * (.3 + 1.05 * g);
  PUFF(22) PUFF(23) PUFF(24) PUFF(25)
  return b;
}
`,Zt=Pt+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",No=`
uniform sampler3D uN3;
out vec4 oC;
float n3(vec3 p) { return textureLod(uN3, p, 0.).r; }
float hg(float c, float g) { float g2 = g * g; return (1. - g2) / pow(1. + g2 - 2. * g * c, 1.5); }
// the storm's form is data: uF holds, by bearing (s, world frame) and height above the base (t, -0.5 to 13.5 km), the
// radius as a share of uP[12].x, the plates' depth, the billow share and the widest radius nearby (for the step size)
uniform sampler2D uF;
// x cloud, y rain, z dust, w band phase; hail core, distance estimate (km), anvil underside
vec4 field(vec3 p, bool full, out float hail, out float dist, out float huO, out float thO) {
  float hb = uP[2].z, y = p.y - hb;
  vec2 S = uP[2].xy;
  vec2 c0 = S + uP[27].xy * max(y, 0.);
  vec2 q = p.xz - c0; float r = length(q);
  float ang = PHI * (1. + .9 * exp(-max(y, 0.) * .45));
  float ca = cos(ang), sa = sin(ang);
  vec2 qr = vec2(ca * q.x - sa * q.y, sa * q.x + ca * q.y);
  bool nearT = r < uP[12].x * 1.35 + 2.5 && y > -.4;
  float lump = nearT ? n3(vec3(qr * .045, y * .035 + .3)) : .5;
  float th = at2(qr) * .1591549;
  thO = th - ang * .1591549;
  vec4 Fp = textureLod(uF, vec2(thO, (y + .5) * .0714286), 0.);
  float R = Fp.x * uP[12].x * (.8 + .4 * lump);
  float strat = Fp.y;
  float s = y * uP[12].z + th * uP[13].x + (lump - .5) * 1.7;
  float f = fract(s);
  float f2 = fract(s * 3. + .37);
  R += ((smoothstep(0., .12, f) * pow(1. - f, 1.3) - .32) + .3 * (smoothstep(0., .1, f2) * (1. - f2) - .45)) * uP[12].w * strat;
  float nd = -.05;
  if (full && nearT) {
    vec3 pd = vec3(qr.x, y, qr.y);
    float bw = Fp.z;
    float nL = bw < .99 ? n3(pd * vec3(.25, .9, .25) + vec3(0., 0., .5)) : .5;
    float nB = bw > .01 && abs(R - r) < 1.6 ? n3(pd * .42) * .62 + n3(pd * 1.25 + 7.3) * .38 : .45;
    nd = mix((nL - .5) * .16, (nB - .45) * 1.45, bw);
  }
  float e = R - r + nd;
  float dc = smoothstep(0., .32, e) * smoothstep(-.12, .18, y + nd * .5);
  dc *= 1. - smoothstep(12.2 - hb, 13.6 - hb, y + nd * 2.);
  dist = max(-e - (Fp.w - Fp.x) * uP[12].x * 1.2, max(-.1 - y, y - (13.6 - hb)));
  // wall cloud, turning faster
  vec2 qw = p.xz - uP[11].xy; float aw = PHI * 2.4;
  vec2 qwr = vec2(cos(aw) * qw.x - sin(aw) * qw.y, sin(aw) * qw.x + cos(aw) * qw.y);
  float wr = length(qw);
  bool nearW = wr < uP[11].z * 1.3 && p.y < hb + .55;
  float nw = nearW ? n3(vec3(qwr * .32, p.y * .9 + .1)) : 0.;
  float yb = hb - uP[11].w;
  float wt = uP[11].z * (.72 + .5 * nw) * mix(.7, 1., smoothstep(yb, hb, p.y));
  float dw = !nearW ? 0. : smoothstep(0., .22, wt - wr) * smoothstep(-.06, .1, p.y - yb + (nw - .5) * .3) * (1. - smoothstep(hb + .1, hb + .5, p.y));
  dc = max(dc, dw);
  dist = min(dist, max(wr - uP[11].z * 1.25, max(yb - .1 - p.y, p.y - hb - .5)));
  // rain and hail shaft, slanting downwind
  vec2 cr = uP[10].xy + vec2(.22, .06) * (hb - p.y);
  float rr = length(p.xz - cr);
  bool nearR = rr < uP[10].z * 1.9 && p.y < hb + 2.8;
  float lr = nearR ? n3(vec3((p.xz - cr) * .08, .7 + TIME * .002)) : 0.;
  float Rr = uP[10].z * (.72 + .55 * lr) * (1. + .4 * (1. - smoothstep(0., .7, p.y)));
  float nr = full && nearR ? n3(vec3((p.x - .22 * (hb - p.y)) * 1.2, p.y * .06 + TIME * .012, (p.z - .06 * (hb - p.y)) * 1.2)) * .5 + n3(vec3(p.x * .4, p.y * .05 + .3, p.z * .4)) * .5 : .5;
  float dr = smoothstep(0., .55, Rr - rr) * (1. - smoothstep(hb + .1, hb + .7, p.y)) * (.3 + 1.7 * smoothstep(.3, .72, nr)) * uP[13].w;
  hail = smoothstep(Rr * .6, 0., rr);
  // forward-flank shelf the rain falls from
  float ff = nearR ? smoothstep(0., .35, Rr * 1.15 - rr + (lr - .5) * 1.2) * smoothstep(-.05, .2, p.y - hb + (nr - .5) * .3) * (1. - smoothstep(-.4, .5, p.y - hb - 2.4 * (1. - pow(rr / (Rr * 1.2), 2.)) + (lr - .5) * 1.4 + (nr - .5) * .6)) : 0.;
  dc = max(dc, ff);
  dist = min(dist, max(rr - Rr * 1.4, p.y - hb - 2.7));
  // dust lifted by the inflow under the wall cloud
  float dd = 0.;
  if (DUST > 0.) {
    float nq = n3(vec3(qwr * .5, p.y * 1.6 - TIME * .01));
    dd = uP[14].w * (1. - smoothstep(0., .25 + .35 * nq, p.y)) * smoothstep(4.5, 1.2, wr) * nq;
    dist = min(dist, max(wr - 4.5, p.y - .6));
  }
  // anvil overhead with mammatus pouches hanging under it
  vec2 qa = p.xz - uP[14].xy; float ra = length(qa);
  bool nearA = p.y > 7.75 && ra < uP[14].z * 1.3 + 2.4;
  float en = nearA ? textureLod(uN2, qa * .012 + .21, 0.).r * .65 + textureLod(uN2, qa * .05 + .6, 0.).b * .35 : 0.;
  // the ice edge thins to a fibrous veil drawn out downwind (no hard lid edge)
  vec2 adw = normalize(uP[14].xy - S + 1e-4);
  float fib = nearA ? textureLod(uN2, vec2(dot(qa, adw) * .006, dot(qa, vec2(-adw.y, adw.x)) * .025) + .33, 1.).g : .5;
  float Ra = uP[14].z * (.75 + .5 * en) + (fib - .5) * 1.6;
  float foot = smoothstep(-.5, 4.2, Ra - ra);
  float rel = ra / uP[14].z;
  float hu = uP[2].w + .8 * rel * rel;
  // long soft ribs on the underside, running out from the updraft
  vec2 qs = p.xz - S;
  hu += nearA ? (textureLod(uN2, vec2(at2(qs) * .09, length(qs) * .01) + .61, 1.5).r - .5) * .3 + (en - .5) * 1.1 * BK : 0.;
  // mammatus hangs in fields, not everywhere: pouches largest in the middle of a field, three or four times smaller at its edge
  float mf = nearA ? smoothstep(.4, .68, textureLod(uN2, p.xz * .016 + .77, 0.).b) : 0.;
  float mz = smoothstep(3.5, 7., length(qs)) * foot * uP[13].y * mf * (1. - step(.5, BW) * smoothstep(BW * .55, max(BW, 1.), length(qs)));   // BW > 0: only that near the tower
  vec2 mw = p.xz + (textureLod(uN2, p.xz * .03 + .1, 0.).rb - .5) * 2.2 + vec2(TIME * .006, 0.);
  float wS = min(textureLod(uN2, mw * .075, 0.).g, textureLod(uN2, mw * .12 + .5, 0.).g * 1.2), wL = min(textureLod(uN2, mw * .032, 0.).g, textureLod(uN2, mw * .053 + .3, 0.).g * 1.2);
  float wf = !nearA ? 1. : mix(wS, wL, smoothstep(.3, .85, mf)) + (textureLod(uN2, p.xz * .09, 0.).a - .5) * .1;
  hu -= (.3 + .45 * mf) * sqrt(1. - smoothstep(.04, .5, wf)) * mz;
  float ht = 11.3 - 1.5 * rel * rel + 1.9 * exp(-dot(p.xz - c0, p.xz - c0) * .12);
  float na = full && nearA ? n3(vec3(p.x * .25, p.y * .8, p.z * .25)) : .5;
  float da = foot * smoothstep(hu - .03, hu + .12, p.y) * (1. - smoothstep(ht - .5, ht + .3, p.y + (na - .5) * uP[32].x));
  da *= (.45 + .9 * na * (1. - .45 * mz)) * mix(.3, 1., smoothstep(0., 3.5, Ra - ra));
  // backlit: the leading edge thins out over its outer fifth and frays into soft gaps (no hard-edged hole in the sheet)
  float eg = clamp((Ra - ra) / (uP[14].z * .22) + (en - .5) * .9, 0., 1.);
  da *= mix(1., eg * eg, BK);
  dc = max(dc, da);
  dist = min(dist, max(max(ra - Ra * 1.3 - .5, (hu - .8 * mz) - p.y - .2), p.y - ht - .4));
  huO = hu;
  return vec4(dc, dr, dd, f);
}
float segD(vec3 p, vec3 a, vec3 b) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0., 1.); return length(pa - ba * h); }
void main() {
  vec2 fc = vec2(gl_FragCoord.x, floor(gl_FragCoord.y) * 2. + uP[28].z + .5);
  // a new spot inside the pixel every frame: the accumulated volume averages the fine noise instead of aliasing it
  // into fixed specks
  vec2 uv = (fc + vec2(hash12(fc * 1.37 + uP[29].x * 631.7), hash12(fc.yx * .91 + uP[29].x * 289.3)) - .5) / uP[5].w;
  vec3 d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
  vec3 o = EYE * .001;
  vec3 dd = d; dd.y = max(dd.y, .0006); dd = normalize(dd);
  float tG = d.y < 0. ? o.y / -d.y : 1e9;
  vec3 L = SUN;
  float cosT = dot(dd, L);
  float ph = .7 * hg(cosT, .55) + .3 * hg(cosT, -.2);
  float bowA = acos(clamp(-cosT, -1., 1.)) * 57.29578;
  vec3 bow = vec3(exp(-pow((bowA - 42.1) / 1.1, 2.)), exp(-pow((bowA - 41.1) / 1., 2.)), exp(-pow((bowA - 40.2) / .9, 2.))) * .9
    + vec3(exp(-pow((bowA - 50.6) / .9, 2.)), exp(-pow((bowA - 51.4) / .9, 2.)), exp(-pow((bowA - 52.3) / .9, 2.))) * .45
    + vec3(.22) * smoothstep(40.5, 34., bowA) - vec3(.12) * smoothstep(42.8, 44., bowA) * smoothstep(50., 48.5, bowA);
  float phR = .55 * hg(cosT, .78) + .45 + RBW * dot(bow, vec3(.33)) * 0. ;
  vec3 phRc = vec3(phR) + RBW * bow * 1.6;
  vec3 hd = normalize(vec3(dd.x, .02, dd.z));
  vec3 haze = (skyCol(hd) * .6 - uP[19].rgb * .26 * pow(max(dot(hd, SUN), 0.), 14.)) * uP[32].z;   // the air before the storm, without the sun's hot spot
  vec2 lh = normalize(L.xz + vec2(1e-6, 0.)); float lt = L.y / max(length(L.xz), 1e-3);
  float hb = uP[2].z;
  // segments: A the storm body inside a cylinder below 7.9 km, then B the anvil slab
  vec2 Cc = uP[2].xy + vec2(1.2, .3);
  float RC = uP[12].x + 5.;
  vec2 oc = o.xz - Cc, dx = dd.xz;
  float qa = dot(dx, dx), qb = dot(oc, dx), qc = dot(oc, oc) - RC * RC, disc = qb * qb - qa * qc;
  float tA0 = 1e9, tA1 = -1.;
  if (disc > 0.) { float sq = sqrt(disc); tA0 = max((-qb - sq) / qa, 0.); tA1 = (-qb + sq) / qa; }
  tA1 = min(min(tA1, (7.9 - o.y) / dd.y), tG);
  float tB0 = (7.9 - o.y) / dd.y, tB1 = min(min((13.9 - o.y) / dd.y, tB0 + 30.), tG);
  bool hasB = tB1 > tB0 && dd.y > .03;
  float t = tA0, tEnd = tA1; int seg = 0;
  if (!(tA1 > tA0)) { seg = 1; t = tB0; tEnd = hasB ? tB1 : -1.; }
  // white per-pixel jitter, new every frame: the accumulated volume converges with no regular residue (the old
  // interleaved-gradient pattern left a fixed weave over the storm)
  float jit = hash12(fc + uP[29].x * 917.3);
  // tornado: a thin rope from the wall cloud to the ground, found where the ray crosses its vertical plane
  float tf = 1e9, fa = 0.; vec3 fcol = vec3(0.);
  if (TORN > 0.) {
    vec2 Cw = uP[11].xy; float yb = hb - uP[11].w;
    float tt = dot(Cw - o.xz, dd.xz) / dot(dd.xz, dd.xz);
    vec3 P = o + dd * tt; float u = P.y / yb;
    float ph0 = uP[26].w;
    vec2 cen = Cw + vec2(cos(ph0) > 0. ? 1. : -1., .3 * sin(ph0)) * .8 * (1. - u) * (1. - u) + vec2(.14 * sin(u * 8. + TIME * .6 + ph0) + .08 * sin(u * 23. + ph0 * 3.), 0.) * (1. - u);
    vec2 perp = normalize(vec2(-dd.z, dd.x));
    float dl = dot(P.xz - cen, perp);
    float rad = mix(.055, .2, u * u * u) * (.8 + .4 * sin(u * 11. + ph0)) + .22 * pow(max(1. - u * 1.1, 0.), 12.);
    float a = smoothstep(rad, rad * .3, abs(dl)) * step(0., u) * smoothstep(1.06, .9, u) * mix(.97, .55, smoothstep(.1, 0., u));
    a *= .75 + .25 * n3(vec3(dl * 3., P.y * 2. - TIME * .4, .3));
    tf = tt; fa = tt > .5 ? a * uP[13].z : 0.;
    float side = dot(perp, lh) * sign(dl);
    fcol = mix(uP[21].rgb * .9 + uP[20].rgb * .45, (uP[21].rgb + uP[20].rgb) * vec3(1.6, 1.35, 1.05), smoothstep(.12, 0., u)) + sunAt(P.y) * .3 * max(0., -side) * smoothstep(-.2, .5, P.y);
  }
  vec3 E = vec3(0.); float T = 1.; bool inside = false;
  int NS = int(uP[28].y);
  float dt = .1;
  t += (.085 + t * .004) * jit;
  int K2 = min(NS, 2);       // both loops bounded by the uniform step count, so the HLSL compiler keeps them rolled
  for (int i = 0; i < NS; i++) {
    if (t >= tEnd) {
      if (seg == 0 && hasB) { seg = 1; t = max(tB0, t); tEnd = tB1; } else break;
    }
    vec3 p = o + dd * t;
    if (t > tf) { E += T * fa * fcol; T *= 1. - fa; tf = 1e9; }
    vec4 F = vec4(0.); float hail = 0., dist = 0., hu = 0., sh = 0., thB = 0.;
    for (int k = 0; k < K2; k++) {
      float off = k == 0 ? 0. : mix(.32, 1.5, BK * step(uP[1].w, 0.));     // afterglow behind (sun down): a longer look toward the light
      float hl, ds, hh, tb;
      vec4 G = field(p + L * off, k == 0, hl, ds, hh, tb);
      if (k == 0) { F = G; hail = hl; dist = ds; hu = hh; thB = tb; if (G.x + G.y + G.z < .003) break; }
      else sh += (G.x * 3.4 + G.y * .5) * .5;
    }
    float sig = 3.4 * F.x + 1.1 * F.y + .45 * F.z;
    if (sig > .01 && !inside) { inside = true; t = max(t - (.085 + t * .004) * jit, 0.); continue; }
    if (sig > .01) {
      dt = F.x > .02 ? .085 + t * .004 : .2 + t * .008;
      float y = p.y - hb;
      vec2 q = p.xz - (uP[2].xy + uP[27].xy * max(y, 0.));
      float hEff = p.y + max(dot(-q, lh), 0.) * lt;
      float Rm = textureLod(uF, vec2(thB, (max(hEff - hb, 0.) + .5) * .0714286), 0.).x * uP[12].x;
      float bq = dot(q, lh), dq = bq * bq - (dot(q, q) - Rm * Rm);
      float chord = 0., gap = 0.;
      if (dq > 0.) { float sq = sqrt(dq); gap = max(-bq - sq, 0.); chord = max(0., -bq + sq - gap); }
      // the tower's shadow fades in over the outer part of its width (uP[32].w) and dies out with the gap between the tower
      // and what it falls on (uP[33].x, per km: light scattered in by the haze and the anvil); the home's 1e4 and 0 keep its shadow
      float Tm = mix(1., exp(-chord * 1.6), smoothstep(hb - .15, hb + .25, hEff) * clamp(dq * uP[32].w / max(Rm * Rm, .01), 0., 1.) * exp(-gap * uP[33].x));
      float bk = BK, aV = step(7.6, p.y);
      float Ta = exp(-max(0., p.y - hu) / max(abs(L.y), .045) * mix(.3, .1, bk) * aV);
      // backlit (BK): the anvil's underside darkens toward the tower and brightens where it hangs lower (swells, mammatus)
      float rA = length(p.xz - uP[14].xy) / uP[14].z;
      float kA = mix(.28, 1.1, smoothstep(uP[12].x, max(uP[14].z * .8, uP[12].x + 1.), length(q))) * clamp(1. + 1.4 * (uP[2].w + .8 * rA * rA - hu), .45, 1.7);
      // (and with the sun down, inside the tower its last light reaches only the outer flanks: no lit spot inside the dark body)
      float xr = smoothstep(.45, .85, sqrt(max(dot(q, q) - bq * bq, 0.)) / max(Rm, .1));
      vec3 sunL = sunAt(p.y) * Tm * Ta * exp(-sh) * mix(1., kA, bk * aV) * mix(1., xr, bk * step(uP[1].w, 0.) * (1. - aV));
      float fb = F.w;
      // the striations: thin dark grooves, or (backlit) soft broad bands of a slightly different shade
      float ao = mix(1. - .5 * smoothstep(.62, 1., fb) - .28 * (1. - smoothstep(0., .07, fb)), .9 - .16 * cos(6.2831853 * fb), bk);
      ao = mix(1., ao, smoothstep(-.3, .3, y) * (1. - smoothstep(5., 7., y)));
      vec3 amb = mix(uP[21].rgb, uP[20].rgb, smoothstep(-.5, 3., y)) * ao * (.5 + .5 * smoothstep(0., 7., y)) * mix(1., .6 + .3 * smoothstep(0., 7., y), bk);   // backlit: darker, darkest low
      vec3 fl = uP[26].rgb * (uP[7].w / (1. + pow(segD(p, uP[7].xyz, uP[8].xyz) * 2.1, 2.)) + uP[8].w / (1. + dot(p - uP[9].xyz, p - uP[9].xyz) * uP[32].y));
      vec3 cl = sunL * ph + amb + fl;
      vec3 tint = mix(vec3(.7, .76, .86), vec3(.24, .7, .55), hail * uP[10].w);
      vec3 rl = tint * (sunL * phRc * .2 * mix(.45, 1., hail) + amb * mix(.5, 1.1, hail) + fl * .8);
      rl += vec3(.0, .05, .04) * hail * smoothstep(.5, .9, uP[10].w) * (sunL.r + sunL.g);
      vec3 dl = vec3(.75, .55, .36) * (sunL * .8 + amb + fl * .5);
      vec3 Lc = (3.4 * F.x * cl + 1.1 * F.y * rl + .45 * F.z * dl) / sig;
      float Ts = exp(-sig * dt);
      float fog = exp(-t * .016);
      E += T * (1. - Ts) * mix(haze, Lc, fog);
      T *= Ts;
      if (T < .012) break;
    } else {
      dt = clamp(dist * .75, .085 + t * .004, 1.2);
    }
    t += dt;
  }
  if (tf < tG && tf < 1e8) { E += T * fa * fcol; T *= 1. - fa; }
  vec3 sky = skyCol(d);   // one inline: the NaN guard below reuses it (FXC compile)
  vec4 r = vec4((E + T * sky) * ENC, T);
  bool bad = !(r.r >= 0. && r.g >= 0. && r.b >= 0. && r.a >= 0. && r.r < 6e4 && r.g < 6e4 && r.b < 6e4 && r.a <= 1.01);
  oC = bad ? vec4(sky * ENC, 1.) : r;
}
`,je=o=>Pt+Qt+(o&1?`#define BK uP[33].y
#define BW uP[33].w
`:`#define BK 0.
#define BW 0.
`)+(o&2?`#define TORN uP[13].z
#define DUST uP[14].w
#define RBW uP[20].w
`:`#define TORN 0.
#define DUST 0.
#define RBW 0.
`)+No,Je=`
vec3 grassAlb(vec2 xz, float s, float r1, out vec3 tip) {
  float gt = uP[17].w;
  float pm = texture(uN2, xz * .061 + .3).b, pn2 = texture(uN2, xz * .035 + .6).r;
  vec3 a0, a1;
  if (gt < .5) {
    a0 = vec3(.085, .066, .038);
    a1 = mix(vec3(.39, .285, .135), vec3(.43, .24, .12), smoothstep(.4, .75, pm));
    a1 = mix(a1, vec3(.31, .275, .125), smoothstep(.45, .72, pn2) * .5);
    tip = vec3(.5, .38, .22);
  }
  else if (gt < 1.5) { a0 = vec3(.17, .14, .085); a1 = mix(vec3(.54, .45, .28), vec3(.6, .5, .32), pm); tip = vec3(.66, .56, .37); }
  else if (gt < 2.5) { a0 = vec3(.15, .12, .055); a1 = mix(vec3(.6, .45, .21), vec3(.66, .5, .25), pm); tip = vec3(.76, .6, .32); }
  else { a0 = vec3(.03, .045, .015); a1 = mix(vec3(.16, .27, .06), vec3(.24, .34, .09), pm); tip = a1; }
  a1 *= .92 + .16 * r1;
  return mix(a0, a1, smoothstep(0., .65, s));
}
vec3 grassLit(vec3 alb, float diff, float tr, float s, float g, float fs) {
  vec3 c = alb * (sunAt(0.) * (diff * .48 + tr * 1.15) + (uP[20].rgb + uP[21].rgb * .3) * .5 * (.2 + .8 * s) + uP[17].rgb * .15 * (.3 + .7 * fs) * s);
  // wind bands: where the stems bow together they show their paler, shinier sides
  return c * (1. + (g - .45) * 1.4 * s);
}
`,Fo=Pt+Qt+Je+`
uniform sampler2D uC;
out vec4 oC;
vec3 groundCol(vec3 d, out float dist) {
  float t = EYE.y / -d.y; dist = t;
  vec3 P = EYE + d * t;
  float gt = uP[17].w;
  float pm = texture(uN2, P.xz * .061 + .3).b, pf = texture(uN2, P.xz * .4).a;
  float g; vec2 b = bendAt(P.xz, g);
  g = mix(.5, g, exp(-t / 700.));
  vec3 L = SUN;
  vec2 dh = normalize(d.xz), lh = normalize(L.xz + vec2(1e-6, 0.));
  float cv = dot(dh, lh);
  vec3 sunL = sunAt(0.);
  vec3 lit = sunL * (.22 + .3 * max(0., -cv) + .7 * pow(max(cv, 0.), 3.)) + uP[20].rgb * .9 + uP[21].rgb * .3;
  // the floor between and beyond the blades: near you the eye reaches down into the thatch, far off only the tops show,
  // in the same tones and wind bands as the blades so the field runs on unbroken to the horizon
  float far = smoothstep(2.5, 24., t), sH = mix(.2, .8, far);
  vec3 tipC, alb = grassAlb(P.xz, sH, .5 + (pf - .5) * .5, tipC);
  if (gt > .5 && gt < 2.5) alb = mix(alb, tipC, .35 * far);
  float diff = .42 + .38 * max(-cv, 0.), tr = pow(max(dot(d, L), 0.), 4.) * (.3 + .9 * sH);
  vec3 c = grassLit(alb, diff, tr, sH, g, max(-cv, 0.)) * mix(.36, .95, far);
  if (gt > .5 && gt < 1.5) {       // stubble: cut rows with bare soil between, running away from you
    float row = smoothstep(.25, .75, sin(P.x * 9. + P.z * .35) * .5 + .5);
    c *= mix(1., .8 + .4 * row, exp(-t / 60.));
  }
  if (gt > 2.5) {                  // burned: black ground, pale ash drifts, a green flush coming through
    alb = mix(vec3(.022, .02, .018), vec3(.07, .066, .06), pf) + vec3(.2, .19, .17) * smoothstep(.62, .82, pm) + vec3(.02, .05, .01) * smoothstep(.5, .8, texture(uN2, P.xz * .013).r);
    c = alb * lit;
  }
  float onR = 0.;
  if (uP[29].w > 0.) {      // a gravel section road
    float k = uP[29].z, rd = abs(P.x - uP[29].y - k * P.z) * inversesqrt(1. + k * k), aa = .15 + t * uP[4].w * 1.2;
    onR = smoothstep(uP[29].w + aa, uP[29].w - aa, rd);
    float fade = 1. - smoothstep(.4, 1.6, aa);
    float rut = (1. - smoothstep(.12, .45 + aa, abs(rd - uP[29].w * .48))) * fade * .35;
    float gv = texture(uN2, P.xz * 1.9 + .17).g, gs = texture(uN2, P.xz * .23 + .5).r;
    float edge = smoothstep(uP[29].w * .6, uP[29].w, rd) * .25;
    vec3 ra = mix(vec3(.19, .162, .133), vec3(.25, .215, .175), smoothstep(.25, .75, gs)) * (1. + (gv - .5) * .3 * fade) * (.9 + .2 * pf);
    ra = ra * (1. - rut) * (lit * .85 + uP[17].rgb * .06);
    c = mix(c, mix(ra, c, edge), onR);
  }
  c += alb * uP[26].rgb * (uP[8].w * .05 + uP[7].w * .03);
  // lightning lights the ground near the strike
  vec3 pk = P * .001;
  float gd = length(pk.xz - uP[8].xz);
  c += alb * uP[26].rgb * uP[9].w / (1. + gd * gd * 1.6);
  return c;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uP[6].w;
  vec3 d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
  // B-spline bicubic upsample of the volume (4 bilinear taps)
  vec2 ts = vec2(uP[5].w), tc = uv * ts - .5, f = fract(tc), ic = floor(tc);
  vec2 w0 = (1. - f) * (1. - f) * (1. - f) / 6., w1 = (4. - 6. * f * f + 3. * f * f * f) / 6., w3 = f * f * f / 6., w2 = 1. - w0 - w1 - w3;
  vec2 s0 = w0 + w1, s1 = w2 + w3, o0 = (ic - .5 + w1 / s0) / ts, o1 = (ic + 1.5 + w3 / s1) / ts;
  vec4 A00 = texture(uC, vec2(o0.x, o0.y)), A10 = texture(uC, vec2(o1.x, o0.y)), A01 = texture(uC, vec2(o0.x, o1.y)), A11 = texture(uC, vec2(o1.x, o1.y));
  vec4 C = (A00 * s0.x + A10 * s1.x) * s0.y + (A01 * s0.x + A11 * s1.x) * s1.y;
  vec3 col = C.rgb / ENC;
  // the outline's slope, from the same four taps (about two cloud pixels apart): only a real outline counts below, not
  // the fine noise left in a thin veil
  vec2 tw = 2. + w3 / s1 - w1 / s0;
  vec2 ga = vec2(((A10.a - A00.a) * s0.y + (A11.a - A01.a) * s1.y) / tw.x, ((A01.a - A00.a) * s0.x + (A11.a - A10.a) * s1.x) / tw.y) * uP[5].w * .0025;
  float gm = length(ga);
  if (d.y < 0.) {
    float dist;
    vec3 G = groundCol(d, dist);
    G = mix(skyCol(normalize(vec3(d.x, 0., d.z))), G, exp(-dist / 3500.));
    col += C.a * (G - skyCol(d));
  } else {
    float cs = dot(d, SUN);
    // a sparse high cirrus deck far from the storm, lit from below by the sunset (behind the storm: through its transmittance)
    vec3 o = EYE * .001, sk0 = skyCol(d);
    float sk = uP[30].x;
    if (d.y > .015) {
      float tc = (8.5 - o.y) / d.y;
      vec2 cp = o.xz + d.xz * tc;
      vec2 wdir = vec2(.8, .6);
      vec2 cu = vec2(dot(cp, wdir), dot(cp, vec2(-wdir.y, wdir.x)));
      float cn = texture(uN2, cu * vec2(.004, .018) + .3).r * .6 + texture(uN2, cu * vec2(.012, .06) + .7).a * .4;
      float away = smoothstep(16., 30., length(cp - uP[2].xy));
      float ca = smoothstep(.52, .8, cn) * away * smoothstep(.015, .08, d.y) * .55;
      vec3 ccol = sunAt(8.5) * .55 * (.6 + .6 * pow(max(cs, 0.), 3.)) + uP[20].rgb * .8;
      col += C.a * ca * (mix(skyCol(normalize(vec3(d.x, .02, d.z))) * .6, ccol, exp(-tc * .006)) - sk0);
    }
    col += C.a * uP[19].rgb * smoothstep(.99997, .999992, cs) * 14. * step(0., uP[1].w + .006);
    // backlit (uP[33].z): a burning rim where the storm's outline meets the bright sky behind it, along its top and sides
    // (not its base), and where the anvil thins: the light that comes through the thin edges
    col += (uP[19].rgb * .45 + sk0 * .3) * uP[33].z * smoothstep(.2, .5, gm) * clamp((abs(ga.x) + max(ga.y, 0.)) / max(gm, 1e-4), 0., 1.) * (.4 + .6 * C.a);
    float az = at2(d.xz);
    // the sky trait, behind the storm: far storms on the horizon with their own flicker, streamers torn off the anvil, the moon
    if (sk > .5 && sk < 1.5) {
      for (int i = 0; i < 2; i++) {
        float k = i == 0 ? 1. : .64, da = az - (i == 0 ? uP[30].y : uP[30].z);
        da = (da - 6.2831853 * floor(da / 6.2831853 + .5)) / k;
        float e = d.y / k, n = texture(uN2, vec2(da * 3.1, e * 7.) + float(i) * .37).r - .5, n2 = texture(uN2, vec2(da * 11., e * 19.) + .61).a - .5;
        float body = smoothstep(.003, -.003, abs(da + e * .06) - .021 - n * .016 - n2 * .005) * smoothstep(.086, .074, e + n * .012);
        float th = .011 * (1. - smoothstep(-.03, .17, da)) + .0025;
        float anv = smoothstep(.003, -.003, abs(e - .084 - n2 * .003) - th) * smoothstep(.19, .13, da + n * .05) * smoothstep(-.07, -.035, da + n * .02);
        float dome = smoothstep(.003, -.003, length(vec2(da, (e - .091) * 1.4)) - .015 - n2 * .006);
        float m = max(body, max(anv, dome)) * smoothstep(-.001, .004, e) * .88;
        vec3 lit = sunAt(9.) * (.12 + .3 * smoothstep(0., .1, e)) * (.75 + .5 * n2) + uP[20].rgb * 1.3;
        float fl = step(.86, hash12(vec2(floor(TIME * 9.), float(i) * 13.1))) * step(.55, hash12(vec2(floor(TIME * .8), float(i) * 7.3)));
        lit += vec3(.7, .76, 1.) * fl * .35 * (1. - smoothstep(0., .05, abs(da))) * (1. - smoothstep(.02, .09, e));
        col += C.a * m * (mix(sk0, lit, .62) - sk0);
      }
    }
    if (sk > 1.5 && sk < 2.5 && d.y > .01) {
      float tc = (9.6 - o.y) / d.y;
      vec2 cp = o.xz + d.xz * tc - uP[14].xy, sd = uP[31].xy;
      float u = dot(cp, sd), v = dot(cp, vec2(-sd.y, sd.x));
      float n = texture(uN2, vec2(v * .04 + u * .002, u * .002) + .2).r * .65 + texture(uN2, vec2(v * .15, u * .008) + .6).a * .35;
      float sa = smoothstep(.58, .78, n) * smoothstep(-4., 8., u) * (1. - smoothstep(18., 45., u)) * smoothstep(.01, .05, d.y) * .42;
      vec3 scol = sunAt(9.6) * .5 * (.6 + .6 * pow(max(cs, 0.), 3.)) + uP[20].rgb * .9;
      col += C.a * sa * (mix(skyCol(normalize(vec3(d.x, .02, d.z))) * .6, scol, exp(-tc * .006)) - sk0);
    }
    if (sk > 3.5) {
      vec3 md = uP[31].xyz, mr = normalize(vec3(md.z, 0., -md.x)), mu = cross(mr, md);
      vec2 mp = vec2(dot(d - md, mr), dot(d - md, mu)) / .0105;
      float rr = length(mp), mar = texture(uN2, mp * .1 + .43).r;
      vec3 mc = vec3(1., .74, .5) * (.42 + .3 * smoothstep(.38, .62, mar)) * (1. - .25 * dot(mp, mp) * .3);
      col += C.a * (smoothstep(1., .9, rr) * (mc - sk0) + vec3(1., .8, .6) * .05 * exp(-rr * .4));
    }
    // stars where the sky is dark enough to show them
    vec2 sp = vec2(az * 180., asin(clamp(d.y, -1., 1.)) * 180.);
    vec2 ci = floor(sp), cf = fract(sp) - .5;
    float h = hash12(ci), sz = hash12(ci + 7.1);
    float star = step(.985, h) * smoothstep(.12, 0., length(cf - (vec2(hash12(ci + 3.3), sz) - .5) * .6)) * (.3 + 2. * pow(sz, 4.));
    col += C.a * vec3(.8, .85, 1.) * star * uP[27].x * 0. + C.a * vec3(.8, .85, 1.) * star * uP[16].w * .25 * smoothstep(0., .15, d.y);
    // scud: low ragged cloud racing in under the base toward the updraft, in front of the storm
    if (sk > 2.5 && sk < 3.5 && d.y > .003) {
      float ts = (.5 - o.y) / d.y;
      vec2 fdir = normalize(uP[2].xy), mv = o.xz + d.xz * ts - fdir * TIME * .016;
      mv = vec2(dot(mv, fdir) * .45, dot(mv, vec2(-fdir.y, fdir.x)));     // rags drawn out along the inflow
      float n = texture(uN2, mv * .5 + .1).r * .5 + texture(uN2, mv * 1.9 + .5).a * .5;
      float a = smoothstep(.56, .7, n) * smoothstep(1., 2.5, ts) * (1. - smoothstep(uP[30].w * .55, uP[30].w * .85, ts)) * .85;
      vec3 sc = uP[20].rgb * 1.1 + uP[21].rgb * .6 + sunAt(.5) * .05 * smoothstep(.6, .8, n);
      vec3 scc = mix(skyCol(normalize(vec3(d.x, .02, d.z))) * .6, sc, exp(-ts * .045));
      col = mix(col, mix(scc, min(scc * .6, col * .86), uP[33].y), a);     // backlit: dark rags, never lighter than the storm behind
    }
  }
  oC = vec4(col * ENC, 1.);
}
`,_o=Pt+Qt+Je+`
layout(location=0) in vec2 aV;
layout(location=1) in vec4 aI;
uniform mat4 uVP;
out vec3 vC; out vec4 vA;
void main() {
  vec3 base = vec3(aI.x, 0., aI.y);
  float h = aI.z, sd = aI.w, gt = uP[17].w;
  float g; vec2 b = bendAt(base.xz, g);
  float fa = sd * 43.98;
  float ph = TIME * (3.2 + 2.2 * fract(sd * 13.)) - dot(base.xz, uP[27].zw) * .9 + sd * 20.;
  float stiff = gt > .5 && gt < 1.5 ? .22 : (gt > 2.5 ? .6 : 1.);
  b = (b + uP[27].zw * sin(ph) * (.05 + .08 * g) * WIND / 12.) * stiff + vec2(cos(fa), sin(fa)) * .3 * (fract(sd * 7.1) - .35);
  float bl = min(length(b), 1.3); vec2 bd = normalize(b + 1e-5);
  float s = aV.x;
  vec3 p1 = vec3(0., h * .55, 0.), p2 = vec3(bd.x * sin(bl) * h, cos(bl) * h, bd.y * sin(bl) * h);
  vec3 P = base + 2. * s * (1. - s) * p1 + s * s * p2;
  vec3 tg = normalize(2. * (1. - s) * p1 + 2. * s * (p2 - p1) + 1e-5);
  vec3 te = EYE - base; float dist = length(te);
  vec2 vp = normalize(vec2(-te.z, te.x) + 1e-5);
  vec2 rf = vec2(cos(fa * 1.3), sin(fa * 1.3)); rf *= sign(dot(rf, vp) + 1e-4);
  vec2 wd = normalize(mix(rf, vp, .55));
  vec3 Wd = vec3(wd.x, 0., wd.y);
  // true width tapering to nothing, drawn a pixel and a half wider with a soft coverage edge (no hard aliased sticks)
  float pxw = max(dist * uP[4].w, 1e-5);
  float w0 = (.0042 + .005 * fract(sd * 31.)) * (1. + dist / 26.);
  float prof = 1. - pow(s, 1.6);
  bool head = (gt > 1.5 && gt < 2.5) || (gt < .5 && fract(sd * 17.3) < .3);
  if (head) prof = s > .76 ? 1.1 + .5 * sin((s - .76) / .24 * 3.1416) : prof * .7;
  float wT = w0 * prof, wD = wT + pxw * 1.5;
  P += Wd * aV.y * wD * .5;
  gl_Position = uVP * vec4(P, 1.);
  vec3 N = normalize(cross(Wd, tg)); vec3 V = normalize(EYE - P); N = dot(N, V) < 0. ? -N : N;
  N = normalize(N + vec3(0., .35, 0.));
  float r1 = fract(sd * 3.7);
  vec3 tipC, alb = grassAlb(base.xz, s, r1, tipC);
  if (head && s > .74) alb = tipC * (.9 + .2 * r1);
  vec3 L = SUN;
  float diff = max(dot(N, L), 0.) * .85 + .15;
  float tr = pow(max(dot(-V, L), 0.), 4.) * (.3 + .9 * s);
  float shd = mix(.2, 1., smoothstep(.1, .9, s * (.8 + .4 * fract(sd * 5.3)) + (texture(uN2, base.xz * .09 + .7).a - .5) * .5));
  vec2 lh = normalize(L.xz + vec2(1e-6, 0.));
  vec3 c = grassLit(alb, diff * shd, tr * shd, s, g, max(dot(wd, lh), 0.)) * (.9 + .2 * fract(sd * 9.7));
  float gd = length(base.xz * .001 - uP[8].xz);
  c += alb * uP[26].rgb * (uP[9].w / (1. + gd * gd * 1.6) + uP[8].w * .05 + uP[7].w * .03) * (.4 + .6 * s);
  vC = c;
  // which edge of the round stem faces the low sun: bright along one side, dark on the other
  vA = vec4(aV.y, wT / pxw, wD / pxw, dot(wd, lh) * (.4 + .5 * s));
}
`,Bo=Pt+`
uniform vec4 uP[34];
in vec3 vC; in vec4 vA; out vec4 oC;
void main() {
  float x = abs(vA.x) * vA.z * .5;
  float a = min(vA.y, 1.) * clamp(max(vA.y, 1.) * .5 - x + .5, 0., 1.);
  if (a < .01) discard;
  oC = vec4(vC * (1. + vA.w * vA.x) * uP[21].w, a);
}
`,ko=Pt+Qt+`
layout(location=0) in vec2 aV;
layout(location=1) in vec4 aA;
layout(location=2) in vec4 aB;
layout(location=3) in vec4 aK;
uniform mat4 uVP;
out vec3 vCol; out vec3 vSide; out vec3 vView; out vec4 vX;
void main() {
  // keep both ends in front of the camera (a span crossing behind it would fold across the frame)
  vec3 Ae = aA.xyz, Be = aB.xyz;
  float da = dot(Ae - EYE, uP[4].xyz), db = dot(Be - EYE, uP[4].xyz);
  if (da < .2 && db >= .2) Ae = mix(Ae, Be, (.2 - da) / (db - da));
  if (db < .2 && da >= .2) Be = mix(Be, Ae, (.2 - db) / (da - db));
  vec3 P = mix(Ae, Be, aV.x);
  float w = mix(aA.w, aB.w, aV.x);
  vec3 ax = Be - Ae;
  vec3 toE = EYE - P; float dist = length(toE);
  vec3 side = normalize(cross(ax, toE) + vec3(1e-6, 0., 0.));
  bool bolt = aK.w > 1.5;
  float ww = max(w, dist * uP[4].w * (bolt ? 1.3 : .8));
  P += side * aV.y * ww * .5;
  P += normalize(ax + 1e-6) * (aV.x * 2. - 1.) * (bolt ? ww * .4 : 0.);
  gl_Position = da < .2 && db < .2 ? vec4(2., 2., 2., 1.) : uVP * vec4(P, 1.);
  vCol = aK.rgb; vSide = side; vView = toE / dist;
  vX = vec4(aV.y, w / ww, aK.w, dist);
}
`,So=Pt+Qt+`
in vec3 vCol; in vec3 vSide; in vec3 vView; in vec4 vX;
out vec4 oC;
void main() {
  float v = vX.x;
  vec3 c; float a;
  if (vX.z > 2.5) {         // lightning glow
    float I = uP[28].x * vCol.r;
    c = uP[26].rgb * I * exp(-v * v * 7.) * .035; a = 1.;
  } else if (vX.z > 1.5) {  // lightning channel
    float I = uP[28].x * vCol.r;
    c = mix(uP[26].rgb, vec3(1.), .6) * I * (1. - v * v) * 7. * vX.y; a = 1.;
  } else {
    vec3 N = normalize(vSide * v + vView * sqrt(max(0., 1. - v * v)));
    vec3 L = SUN;
    vec3 sunL = sunAt(.01);
    c = vCol * (sunL * max(dot(N, L), 0.) * .9 + uP[20].rgb * .5 + uP[21].rgb * .25);
    float gd = length((EYE - vView * vX.w).xz * .001 - uP[8].xz);
    c += vCol * uP[26].rgb * uP[9].w / (1. + gd * gd * 1.6);
    c = mix(skyCol(normalize(vec3(-vView.x, .01, -vView.z))), c, exp(-vX.w / 7000.));
    a = vX.y * (vX.z > .5 ? .8 : 1.);
  }
  oC = vec4(c * ENC, a);
}
`,Lo=Pt+`
uniform vec4 uP[34];
uniform sampler2D uS;
out vec4 oC;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  if ((p.y & 1) != int(uP[28].z) && uP[28].w < .5) discard;
  float yy = (float(p.y) - uP[28].z) * .5;
  vec2 ts = vec2(uP[5].w, uP[5].w * .5), uv = vec2(float(p.x) + .5, yy + .5) / ts;
  vec4 r = texture(uS, uv);
  // a lone march sample far off its neighbours is noise, not cloud: clamp it into their range (no specks)
  vec4 a = texture(uS, uv + vec2(1., 0.) / ts), b = texture(uS, uv - vec2(1., 0.) / ts), e = texture(uS, uv + vec2(0., 1.) / ts), f = texture(uS, uv - vec2(0., 1.) / ts);
  r = clamp(r, min(min(a, b), min(e, f)), max(max(a, b), max(e, f)));
  oC = r.r >= 0. && r.g >= 0. && r.b >= 0. && r.a >= 0. ? r : vec4(0., 0., 0., 1.);
}
`,Do=Pt+`
uniform vec4 uP[34];
uniform sampler2D uS;
out vec4 oC;
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
void main() {
  vec3 c = texelFetch(uS, ivec2(gl_FragCoord.xy), 0).rgb / uP[21].w * uP[18].w;
  c *= .93;
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  c = pow(clamp(c, 0., 1.), vec3(1. / 2.2));
  c += (hash12(gl_FragCoord.xy) - .5) * (1. / 255.);
  oC = vec4(c, 1.);
}
`;function Uo(o){const E=new Float32Array(262144);for(const[d,k]of[[4,.42],[8,.3],[16,.18],[32,.1]]){const D=new Float32Array(d*d*d);for(let b=0;b<D.length;b++)D[b]=o();const q=64/d,C=new Int32Array(64),X=new Int32Array(64),$=new Float32Array(64);for(let b=0;b<64;b++){const A=b/q,B=Math.floor(A),S=A-B;C[b]=B%d,X[b]=(B+1)%d,$[b]=S*S*(3-2*S)}const P=new Float32Array(d*d*64);for(let b=0;b<d;b++)for(let A=0;A<d;A++){const B=(b*d+A)*d,S=(b*d+A)*64;for(let z=0;z<64;z++){const G=D[B+C[z]];P[S+z]=G+(D[B+X[z]]-G)*$[z]}}for(let b=0;b<64;b++){const A=C[b]*d,B=X[b]*d,S=$[b];for(let z=0;z<64;z++){const G=C[z],m=X[z],g=$[z],w=(A+G)*64,K=(A+m)*64,et=(B+G)*64,qt=(B+m)*64,ft=(b*64+z)*64;for(let M=0;M<64;M++){const st=P[w+M]+(P[K+M]-P[w+M])*g,nt=P[et+M]+(P[qt+M]-P[et+M])*g;E[ft+M]+=(st+(nt-st)*S)*k}}}}let O=1e9,i=-1e9;for(let d=0;d<E.length;d++){const k=E[d];k<O&&(O=k),k>i&&(i=k)}const j=new Uint8Array(E.length),T=255/(i-O);for(let d=0;d<E.length;d++)j[d]=(E[d]-O)*T;return j}function Co(o){const E=new Uint8Array(262144),O=q=>{const C=new Float32Array(65536);for(const[P,b]of q){const A=new Float32Array(P*P);for(let S=0;S<A.length;S++)A[S]=o();const B=256/P;for(let S=0;S<256;S++){const z=S/B,G=Math.floor(z),m=z-G,g=m*m*(3-2*m),w=G%P,K=(G+1)%P;for(let et=0;et<256;et++){const qt=et/B,ft=Math.floor(qt),M=qt-ft,st=M*M*(3-2*M),nt=ft%P,he=(ft+1)%P,$t=A[w*P+nt]+(A[w*P+he]-A[w*P+nt])*st,_e=A[K*P+nt]+(A[K*P+he]-A[K*P+nt])*st;C[S*256+et]+=($t+(_e-$t)*g)*b}}}let X=1e9,$=-1e9;for(const P of C)P<X&&(X=P),P>$&&($=P);for(let P=0;P<C.length;P++)C[P]=(C[P]-X)/($-X);return C},i=O([[4,.45],[8,.28],[16,.17],[32,.1]]),j=O([[8,.5],[16,.3],[32,.2]]),T=O([[32,.45],[64,.35],[128,.2]]),d=16,k=256/d,D=new Float32Array(d*d*2);for(let q=0;q<d*d;q++)D[q*2]=.15+.7*o(),D[q*2+1]=.15+.7*o();for(let q=0;q<256;q++)for(let C=0;C<256;C++){const X=C/k,$=q/k,P=Math.floor(X),b=Math.floor($);let A=9;for(let S=-1;S<=1;S++)for(let z=-1;z<=1;z++){const G=P+z,m=b+S,g=(m%d+d)%d*d+(G%d+d)%d,w=G+D[g*2]-X,K=m+D[g*2+1]-$,et=w*w+K*K;et<A&&(A=et)}const B=(q*256+C)*4;E[B]=i[q*256+C]*255,E[B+1]=Math.min(1,Math.sqrt(A))*255,E[B+2]=j[q*256+C]*255,E[B+3]=T[q*256+C]*255}return E}function Io(o,e){if(o.__c503)return o.__c503.cloud(e),o.__c503;const E=(m,g)=>{const w=o.createShader(m);return o.shaderSource(w,g),o.compileShader(w),w},O=(m,g)=>{const w=o.createProgram(),K=E(o.VERTEX_SHADER,m),et=E(o.FRAGMENT_SHADER,g);return o.attachShader(w,K),o.attachShader(w,et),o.linkProgram(w),{p:w,v:K,f:et}},i={[e]:O(Zt,je(e))},j={comp:[Zt,Fo],grass:[_o,Bo],rib:[ko,So],fin:[Zt,Do],copy:[Zt,Lo]},T={};for(const m in j)T[m]=O(j[m][0],j[m][1]);o.flush();let d=99538179;const k=()=>{d=d+1831565813|0;let m=Math.imul(d^d>>>15,1|d);return m=m+Math.imul(m^m>>>7,61|m)^m,((m^m>>>14)>>>0)/4294967296};o.pixelStorei(o.UNPACK_ALIGNMENT,1);const D=o.createTexture();o.bindTexture(o.TEXTURE_3D,D),o.texImage3D(o.TEXTURE_3D,0,o.R8,64,64,64,0,o.RED,o.UNSIGNED_BYTE,Uo(k)),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MAG_FILTER,o.LINEAR);for(const m of[o.TEXTURE_WRAP_S,o.TEXTURE_WRAP_T,o.TEXTURE_WRAP_R])o.texParameteri(o.TEXTURE_3D,m,o.REPEAT);const q=o.createTexture();o.bindTexture(o.TEXTURE_2D,q),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,256,256,0,o.RGBA,o.UNSIGNED_BYTE,Co(k)),o.generateMipmap(o.TEXTURE_2D),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.REPEAT),o.pixelStorei(o.UNPACK_ALIGNMENT,4);let C=!1;const X=m=>{i[m]||(i[m]=O(Zt,je(m)),o.flush())},$=m=>{if(X(m),!C){C=!0;for(const g in T)T[g]=P(g,T[g])}return i[m].ok||(i[m]=P("cloud",i[m])),i[m]},P=(m,{p:g,v:w,f:K})=>{if(!o.getProgramParameter(g,o.LINK_STATUS))throw new Error("503 "+m+": "+(o.getShaderInfoLog(w)||"")+(o.getShaderInfoLog(K)||"")+o.getProgramInfoLog(g));return{ok:!0,p:g,uP:o.getUniformLocation(g,"uP"),uVP:o.getUniformLocation(g,"uVP"),uN2:o.getUniformLocation(g,"uN2"),uN3:o.getUniformLocation(g,"uN3"),uC:o.getUniformLocation(g,"uC"),uF:o.getUniformLocation(g,"uF"),uS:o.getUniformLocation(g,"uS")}},b=o.createVertexArray(),A=[],B=5;for(let m=0;m<=B;m++)A.push(m/B,-1,m/B,1);const S=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,S),o.bufferData(o.ARRAY_BUFFER,new Float32Array(A),o.STATIC_DRAW);const z=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,z),o.bufferData(o.ARRAY_BUFFER,new Float32Array([0,-1,0,1,1,-1,1,1]),o.STATIC_DRAW);const G=!!(o.getExtension("EXT_color_buffer_float")||o.getExtension("EXT_color_buffer_half_float"));return o.__c503={P:T,CV:i,cloud:X,ready:$,n3:D,n2:q,vEmpty:b,bladeBuf:S,quadBuf:z,bladeVerts:(B+1)*2,half:G,fin:typeof FinalizationRegistry=="function"?new FinalizationRegistry(m=>{const g=m();try{for(const w of g.v)o.deleteVertexArray(w);for(const w of g.b)o.deleteBuffer(w);for(const w of g.tx)o.deleteTexture(w);for(const w of g.fb)o.deleteFramebuffer(w);for(const w of g.rb)o.deleteRenderbuffer(w)}catch{}}):null}}function Fe(o,e,E,O,i,j){const T=o.createTexture();j.tx.push(T),o.bindTexture(o.TEXTURE_2D,T),e.half?o.texImage2D(o.TEXTURE_2D,0,o.RGBA16F,E,i,0,o.RGBA,o.HALF_FLOAT,null):o.texImage2D(o.TEXTURE_2D,0,o.SRGB8_ALPHA8,E,i,0,o.RGBA,o.UNSIGNED_BYTE,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);const d=o.createFramebuffer();if(j.fb.push(d),o.bindFramebuffer(o.FRAMEBUFFER,d),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,T,0),O){const k=o.createRenderbuffer();j.rb.push(k),o.bindRenderbuffer(o.RENDERBUFFER,k),o.renderbufferStorage(o.RENDERBUFFER,o.DEPTH_COMPONENT24,E,E),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.RENDERBUFFER,k)}return o.bindFramebuffer(o.FRAMEBUFFER,null),{tex:T,fb:d,w:E}}He.add({num:503,name:"Prairie Storm",fam:"Vistas",recipe:"Flat prairie at dusk under a big spinning storm: the striped updraft turns, the anvil spreads out, a rain and hail curtain hangs to one side and the grass streams in toward it. The storm's shape, how far off it is and where the sun is change every mint. Tap the storm and its next bolt comes there, drag to push a gust through the grass, or hold to let the storm come closer, with the wind rising and the lightning coming faster.",interactive:"Tap the storm and its next stroke comes there, in its own time: a bolt to the ground under the base or where you tap the land, a crawler under the anvil. Drag to push a gust through the grass. Hold to let the storm advance: the wind rises, the rotation quickens and the lightning comes faster.",music:!0,gl:!0,fps:30,seed:0,make(o){const e=o.gl,E=o.size;let O=0;for(let t=2;t<66;t+=8)O=Math.imul(O^parseInt(o.hash.slice(t,t+8),16),2654435761)+2135587861|0;const i=()=>{O=O+1831565813|0;let t=Math.imul(O^O>>>15,1|O);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},j=t=>{let a=i(),r=0;for(const[n,s]of t)if(r+=s,a<r)return n;return t[t.length-1][0]},T=o.home,d=T?"Mothership":j([["Mothership",.42],["High-precip green core",.26],["Tornadic rope",.22],["Night storm lit by lightning",.1]]),k=d.startsWith("Night");let D=k?"Night":T?"Golden dusk":j([["Golden dusk",.62],["Blue hour",.38]]);const q=T?"Tallgrass":j([["Tallgrass",.48],["Wheat stubble",.24],["Ripe wheat",.18],["Burned prairie",.1]]),C=D!=="Golden dusk"?"Clear evening sky":T?"Clear sunset":j([["Clear sunset",.7],["Rainbow in the rain shaft",.3]]);let X=1346316817;for(let t=2;t<66;t+=8)X=Math.imul(X^parseInt(o.hash.slice(t,t+8),16),2246822507)^X>>>13;const $=()=>{X=X+1831565813|0;let t=Math.imul(X^X>>>15,1|X);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},P=[["Storm dead ahead",.18],["Storm off the shoulder",.14],["Wide, the whole anvil",.1],["Low in the grass",.16],["Down the section road",.16],["Long lens on the wall cloud",.14],["Storm passing to one side",.12]],b=T?"Storm dead ahead":(()=>{const t=$();let a=0;for(const[r,n]of P)if(a+=n,t<a)return r;return"Storm passing to one side"})(),A=$()<.5?-1:1,B=$(),S=$(),z={"Storm dead ahead":[0,.27,1.45,34],"Storm off the shoulder":[A*(.36+.1*B),.25,1.45,34],"Wide, the whole anvil":[A*(.22+.08*B),.4,1.45,45],"Low in the grass":[A*(.06+.12*B),.47,.72,38],"Down the section road":[0,.16,1.7,33],"Long lens on the wall cloud":[0,0,1.5,21],"Storm passing to one side":[A*(.7+.15*B),.5,1.45,38]}[b],G=b==="Down the section road",m=b==="Long lens on the wall cloud",g=b==="Low in the grass";let w=1346113303;for(let t=2;t<66;t+=8)w=Math.imul(w^parseInt(o.hash.slice(t,t+8),16),3266489909)^w>>>15;const K=()=>{w=w+1831565813|0;let t=Math.imul(w^w>>>15,1|w);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},et=[["Stacked plates",.28],["Barber pole",.2],["Bell and tail cloud",.16],["Shelf cloud",.14],["Far tower",.14],["Flanking line",.08]],qt=K(),ft=[K(),K(),K(),K(),K(),K()],M=T?"Stacked plates":(()=>{let t=0;for(const[a,r]of et)if(t+=r,qt<t)return a;return"Stacked plates"})();let st=1346001981;for(let t=2;t<66;t+=8)st=Math.imul(st^parseInt(o.hash.slice(t,t+8),16),668265263)^st>>>14;const nt=()=>{st=st+1831565813|0;let t=Math.imul(st^st>>>15,1|st);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},he=nt(),$t=nt(),_e=nt(),pt=[nt(),nt(),nt(),nt()];let Rt=T?"Clear":(()=>{let t=0;for(const[a,r]of[["Clear",.45],["Other storms",.18],["Streamers",.15],["Scud",.12],["Moonrise",.1]])if(t+=r,he<t)return a;return"Clear"})();Rt==="Moonrise"&&D!=="Blue hour"&&(Rt="Clear"),Rt==="Moonrise"&&M==="Far tower"&&(Rt="Clear");const qo=T?"Windmill":j([["Windmill",.38],["Power line",.3],["Lone cottonwood",.24],["Fence only",.08]]),fe=G?"Power line":qo,ue=!T&&D==="Golden dusk"&&C==="Clear sunset"&&$()<.16;ue&&(D="Last light on the anvil");const St=C.startsWith("Rainbow"),te=St&&_e<.25;let tt=T||k||ue||St?"side":Rt==="Moonrise"?"opposite":$t<.56?"side":$t<.82?"behind":"under";D==="Blue hour"&&tt==="under"&&(tt="behind"),M==="Far tower"&&tt==="under"&&(tt="side");const Xo=te?"Rainbow in the rain":D==="Golden dusk"?"Sunlit rain":"Dark rain",de=k?"Constant flicker":T?"Anvil crawlers":j([["Anvil crawlers",.42],["Cloud-to-ground",.43],["Bolt from the blue",.15]]),me=T?"Steady inflow":j([["Steady inflow",.5],["Gusty",.32],["Dust lifting",.18]]),R=Io(e,(tt==="behind"?1:0)|(d==="Tornadic rope"&&M!=="Far tower"||me==="Dust lifting"||te?2:0));let Xt=null;o.trait("Storm",d),o.trait("Light",D+(tt==="behind"?D==="Blue hour"?", afterglow behind the storm":", sun behind the storm":tt==="under"?", sun under the base":"")),o.trait("Ground",q),o.trait("Landmark",fe),o.trait("Lightning",de),o.trait("Inflow",me),o.trait("Rain shaft",Xo),o.trait("Framing",b),o.trait("Form",M);const Lt=q==="Tallgrass"?0:q==="Wheat stubble"?1:q==="Ripe wheat"?2:3;o.trait("Sky",Rt);const pe={Mothership:{hb:1.15,R0:6.3,taper:.55,bandK:1.1,lip:.62,helix:1,wallR:1.8,drop:.38,rainR:2.3,rainK:1,green:.55,mam:1,torn:0},"High-precip green core":{hb:.95,R0:5.4,taper:.6,bandK:.95,lip:.4,helix:1,wallR:2,drop:.45,rainR:3.6,rainK:1.7,green:1,mam:.8,torn:0},"Tornadic rope":{hb:1.2,R0:4.8,taper:.62,bandK:1.05,lip:.45,helix:2,wallR:1.6,drop:.26,rainR:2.4,rainK:1.1,green:.6,mam:.9,torn:1},"Night storm lit by lightning":{hb:1.1,R0:6,taper:.55,bandK:1.1,lip:.55,helix:1,wallR:1.8,drop:.4,rainR:2.8,rainK:1.2,green:.6,mam:1,torn:0}}[d];let Et=-1.6+(i()-.5)*2.2,gt=(pe.torn?8.6:11)+(i()-.5)*2;const Qe=(St?-122:-100+(i()-.5)*16)*Math.PI/180,Go=(k?-16:D==="Blue hour"?-2.6:2.6+i()*1.4)*Math.PI/180;let it=ue?-1.45*Math.PI/180:Go,Mt=[Math.sin(Qe)*Math.cos(it),Math.sin(it),Math.cos(Qe)*Math.cos(it)],Ze=it<0?6371*it*it/2:-6;const ee=St?.62:.35+i()*.25;let Gt=pe.R0*(St?.85:.74);const Vt=-2.4+(i()-.5)*.5,Vo=i()*6.283;let dt=[.2+i()*.08,.02+i()*.05],ot=[3.2+i()*1.5,-2.2+(i()-.5)],xt=9.5+i()*1.2;const u=Object.assign({},pe),oe=ft[0],zt=ft[1],Dt=ft[2],Wt=ft[3],Nt=Math.atan2(Et,gt),Be=M==="Far tower"&&(b==="Storm dead ahead"||b==="Storm off the shoulder"||b==="Down the section road");if(Be&&(z[0]*=.62,z[1]=b==="Down the section road"?.13:b==="Storm dead ahead"?.2:.19,z[3]=26),M!=="Stacked plates"){const t={"Barber pole":11+6*Wt,"Bell and tail cloud":9.5+4*Wt,"Shelf cloud":8+2.5*Wt,"Far tower":Be?28+12*Wt:28+2*Wt,"Flanking line":13+5*Wt}[M];Et=Math.sin(Nt)*t,gt=Math.cos(Nt)*t}const Ot=Math.atan2(-gt,-Et),_=(t,a,r)=>{const n=kt((r-t)/(a-t),0,1);return n*n*(3-2*n)},xe=(t,a)=>{let r=(t-a)%6.2831853;return r>3.1415927&&(r-=6.2831853),r<-3.1415927&&(r+=6.2831853),r},ae=(t,a=1.6)=>-.5*_(6,8.5,t)+a*_(8.4,10.8,t),Kt=(t,a=4.8,r=6.8)=>_(-.3,.3,t)*(1-_(a,r,t));let vt;if(M==="Barber pole")Object.assign(u,{hb:1.3,R0:3.4+.8*oe,bandK:1.45,lip:.55,helix:zt<.5?2:3,wallR:1.1,drop:.3,rainR:1.3,rainK:u.rainK*.45,mam:.15}),dt=[(.36+.16*Dt)*(zt<.25||zt>.75?-1:1),.1],xt=28+12*Dt,ot=[dt[0]*9+(8+2*Dt)*.72*Math.sign(dt[0]),-1.5],u.anvB=9.1,u.anvTop=.6,vt=t=>[u.R0*(1+.9*(1-_(0,1.9,t)))*(1-.2*_(2,8,t))+ae(t,1.3),Kt(t,6.8,8.6),_(7,9,t)];else if(M==="Bell and tail cloud"){Object.assign(u,{hb:1.1,R0:4.3+.8*oe,bandK:.6,lip:.14,wallR:2.5,drop:.62});const t=Math.atan2(Math.cos(Vt),Math.sin(Vt)),a=Math.atan2(Math.cos(ee+1.2),Math.sin(ee+1.2))-.25;vt=(r,n)=>{let s=u.R0*(1.42-.62*_(0,3.2,r))*(1-.12*_(3.5,7.5,r))+ae(r);s*=1-.45*Math.exp(-((xe(n,t)/.5)**2))*(1-_(.6,1.9,r));const l=Math.max(0,1-Math.abs(xe(n,a))/.16)*(1-_(.2,.55,r));return[Math.max(s,u.R0*1.3+(7+3*zt)*l),Kt(r,1.4,2.6),_(1,2.6,r)]}}else if(M==="Shelf cloud"){Object.assign(u,{hb:.85,R0:5.2,bandK:1.7,lip:.8,helix:0,wallR:1.2,drop:.2,rainR:3.8,rainK:u.rainK*1.2}),dt=[-.75*Math.cos(Ot),-.75*Math.sin(Ot)],xt=28+8*oe,ot=[-Math.cos(Ot)*2,-Math.sin(Ot)*2-1];const t=15+5*zt,a=3.2+.6*Dt;vt=(r,n)=>{const s=xe(n,Ot),l=t*a/Math.hypot(t*Math.cos(s),a*Math.sin(s))*(1+.3*(1-_(0,2.2,r))*Math.max(0,Math.cos(s)));return[l+(6.3*(1-.2*_(3,7,r))+ae(r)-l)*_(1.6,3.4,r),Kt(r,2.2,3.4),_(2.4,4,r)]}}else if(M==="Far tower")Object.assign(u,{hb:1.4,R0:8.5+2.5*oe,bandK:.9,lip:.22,wallR:1.4,drop:.2,rainR:2.2,torn:0,anvB:9.1,mam:0}),dt=[.12*(zt-.5),.05],xt=45+15*Dt,ot=[(zt<.5?-1:1)*(19+5*Dt)*.62,-.4],u.anvTop=.6,tt==="behind"&&(u.mam=.6),vt=t=>[u.R0*(1+.08*(1-_(0,1.2,t)))*(1-.12*_(1,8,t))+1.4*_(8.4,10.8,t),Kt(t,2,4),_(.2,1.4,t)];else if(M==="Flanking line"){Object.assign(u,{R0:4.4+.5*oe,lip:.2});const t=Ot+(zt<.5?-1:1)*(1.5+.25*Dt);vt=(a,r)=>{const n=Math.exp(-((xe(r,t)/.32)**2));let s=0;for(let c=1;c<=4;c++)s+=1-_(7.6-1.5*c-.25,7.6-1.5*c+.25,a);return[u.R0*(1+.06*_(0,.8,a)*(1-_(.8,2.2,a)))*(1-.3*_(.3,5.8,a))+ae(a)+2.6*s*n,Kt(a,1.5,3)*(1-n),_(.4,1.6,a)]}}else vt=t=>[u.R0*(1+(u.taper-1)*_(.3,5.8,t))*(1+.07*_(0,.8,t)*(1-_(.8,2.2,t)))+ae(t),Kt(t),_(3.4,6.2,t)];if(!T){const t=vt,a=(u.anvB||8.6)-u.hb;vt=(r,n)=>{const s=t(r,n);return s[0]*=1-.8*_(a+.2,a+2.2,r),s}}Gt*=u.R0/pe.R0;const ve=ot.slice();if(!T&&M!=="Barber pole"){const t=Math.max(u.rainR,u.R0*(St?.5:.6+.35*ft[4]));Gt+=(t-u.rainR)*.9,u.rainR=t}if(tt!=="side"){const t=tt==="opposite"?Nt+Math.PI+(pt[0]-.5)*.5:Nt+(pt[0]-.5)*(tt==="under"?.2:.26),a=Math.hypot(Et,gt);it=tt==="under"?Math.min(1+.8*pt[1],.7*Math.atan2(u.hb,a)*180/Math.PI)*Math.PI/180:D==="Blue hour"?-2.6*Math.PI/180:Math.atan2(u.hb+.3+.8*pt[1],a),Mt=[Math.sin(t)*Math.cos(it),Math.sin(it),Math.cos(t)*Math.cos(it)],Ze=it<0?6371*it*it/2:-6}if(!T){(M==="Stacked plates"||M==="Bell and tail cloud"||M==="Flanking line")&&(xt=28+17*ft[5]);const t=Math.hypot(Et,gt),a=Math.hypot(Mt[0],Mt[2])||1,r=Mt[0]/a-Et/t*.6,n=Mt[2]/a-gt/t*.6,s=Math.hypot(r,n)||1,l=M==="Barber pole"?9:0;ot=[dt[0]*l+r/s*.45*xt,dt[1]*l+n/s*.45*xt]}const Wo=["Clear","Other storms","Streamers","Scud","Moonrise"].indexOf(Rt),be=pt[2]<.5?-1:1,ke=[Wo,Math.PI/2-(Nt+be*(.28+.22*pt[3])),Math.PI/2-(Nt-be*(.42+.3*pt[2])),0];let Se=[0,0,0,0];if(Rt==="Streamers"){const t=Nt+Math.PI/2+be*(.15+.3*pt[3]);Se=[Math.sin(t),Math.cos(t),0,0]}if(Rt==="Moonrise"){const t=Nt+be*(.28+.12*pt[3]),a=(2+1.6*pt[1])*Math.PI/180;Se=[Math.sin(t)*Math.cos(a),Math.sin(a),Math.cos(t)*Math.cos(a),0]}const ut=128,Yt=96,Ut=new Float32Array(ut*Yt*3);let Ft=0;for(let t=0;t<Yt;t++)for(let a=0;a<ut;a++){const r=vt((t+.5)/Yt*14-.5,(a+.5)/ut*6.2831853),n=(t*ut+a)*3;Ut[n]=r[0],Ut[n+1]=r[1],Ut[n+2]=r[2],r[0]>Ft&&(Ft=r[0])}Ft*=1.001;{const t=ee+1.2,a=Math.hypot(Math.sin(t)*Gt+.22*u.hb-1.2,Math.cos(t)*Gt+.06*u.hb-.3)+1.7*u.rainR+.4;T||(Ft=Math.max(Ft,a-5))}const re=new Uint8Array(ut*Yt*4);for(let t=0;t<Yt;t++)for(let a=0;a<ut;a++){const r=(t*ut+a)*3,n=(t*ut+a)*4;let s=0;for(let l=-4;l<=4;l++)s=Math.max(s,Ut[(t*ut+(a+l+ut)%ut)*3]);re[n]=Math.round(Ut[r]/Ft*255),re[n+1]=Math.round(kt(Ut[r+1],0,1)*255),re[n+2]=Math.round(kt(Ut[r+2],0,1)*255),re[n+3]=Math.round(s/Ft*255)}const Le=e.createTexture();e.bindTexture(e.TEXTURE_2D,Le),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,ut,Yt,0,e.RGBA,e.UNSIGNED_BYTE,re),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const $e=me==="Dust lifting"?.55:0,to=me==="Gusty"?10:7.5;let we=(St?te?.34:.12:(i()-.5)*.12)+z[0]*(M==="Far tower"&&b==="Storm passing to one side"?.4:1),eo=z[1];const Oo=z[2],oo=Math.atan2(Et,gt)+(S-.5)*.3,se=Math.tan(oo),ye=-.6-.8*S,ne=2.9;if(G&&(we=oo-A*(.17+.1*B)*(Be?.2:1)),m){const t=Et+Math.sin(Vt)*u.R0*.42,a=gt+Math.cos(Vt)*u.R0*.42;we=Math.atan2(t,a)+A*(.03+.04*B),eo=Math.atan((u.hb-u.drop)/Math.hypot(t,a))+.13+.04*S}const mt=Math.tan(z[3]*Math.PI/180),_t=k?{zen:[.004,.006,.014],mid:[.008,.012,.026],hs:[.03,.022,.03],ha:[.01,.013,.025],sun:[0,0,0],amb:[.006,.008,.016],bn:[.004,.004,.006],exp:2.6}:D==="Blue hour"?{zen:[.014,.028,.085],mid:[.05,.075,.17],hs:[.62,.24,.1],ha:[.12,.1,.19],sun:[3,1.1,.42],amb:[.06,.07,.13],bn:[.035,.028,.035],exp:2}:ue?{zen:[.018,.034,.09],mid:[.06,.08,.175],hs:[.85,.32,.12],ha:[.13,.11,.2],sun:[2.7,.68,.17],amb:[.05,.056,.11],bn:[.03,.024,.03],exp:2}:{zen:[.045,.07,.15],mid:[.15,.175,.27],hs:[1.6,.68,.22],ha:[.42,.3,.34],sun:[2.5,1.08,.36],amb:[.07,.085,.13],bn:[.11,.07,.04],exp:1.05},ct=(Lt===3?26e3:52e3)*(E<=256?.5:1),ao=46,bt=2.4,Pe=bt*bt/(bt*bt+2*bt*bt*Math.log(ao/bt)),J=new Float32Array(ct*4),Ko=[.4,.1,.55,.07][Lt],Yo=[.55,.1,.2,.14][Lt];for(let t=0;t<ct;t++){const a=(t+i())/ct,r=a<Pe?bt*Math.sqrt(a/Pe):bt*Math.exp((a-Pe)/(1-Pe)*Math.log(ao/bt)),n=i()*6.2832;J[t*4]=Math.cos(n)*r,J[t*4+1]=Math.sin(n)*r;const s=Math.cos(n)*r,l=Math.sin(n)*r,c=.5+.5*Math.sin(s*1.7+Math.sin(l*1.3)*2)*Math.sin(l*1.9+Math.sin(s*.9)*2);J[t*4+2]=(Ko+Yo*Math.pow(i(),Lt===0?.7:1.2))*(Lt===0||Lt===3?.45+.8*c:.85+.2*c),J[t*4+3]=i()}if(m||G||g)for(let t=0;t<ct;t++){let a=J[t*4],r=J[t*4+1];if(m&&t&1){const n=(t>>1)/(ct>>1),s=6*Math.pow(170/6,n),l=we+Math.atan2(r,a)/6.2832*.8;a=J[t*4]=Math.sin(l)*s,r=J[t*4+1]=Math.cos(l)*s,J[t*4+2]*=1+.25*J[t*4+3]}if(G){const n=Math.abs(a-ye-se*r)/Math.hypot(1,se);n<ne+.25?J[t*4+2]=0:n<ne+1.2&&(J[t*4+2]*=.5)}if(g){const n=Math.hypot(a,r);n<2.9&&(J[t*4+2]=Math.min(J[t*4+2],Math.max(.04,.62-.21*n)))}}const De=new Uint32Array(ct);for(let t=0;t<ct;t++)De[t]=ct-1-t;if(m){const t=new Float32Array(ct);for(let a=0;a<ct;a++)t[a]=J[a*4]**2+J[a*4+1]**2;De.sort((a,r)=>t[r]-t[a])}const ie=new Float32Array(ct*4);for(let t=0;t<ct;t++){const a=De[t]*4,r=t*4;ie[r]=J[a],ie[r+1]=J[a+1],ie[r+2]=J[a+2],ie[r+3]=J[a+3]}const Re=[],Q=(t,a,r,n,s,l=0)=>Re.push(t[0],t[1],t[2],r,a[0],a[1],a[2],n,s[0],s[1],s[2],l),ce=[.13,.11,.085],Bt=[.07,.07,.075],Ue=[.05,.05,.05],Ho=8.5+i()*3,jo=.03+i()*.04,Jo=G?ye+ne+1.6:Ho,Qo=G?se:jo;let Ct=null;for(let t=-240;t<520;t+=4.6+i()*1.4){const a=Jo+Qo*t,r=1.12+i()*.2,n=(i()-.5)*.12,s=(i()-.5)*.1,l=[a+n,r,t+s];if(Q([a,-.05,t],l,.11+i()*.03,.095,ce.map(c=>c*(.8+i()*.4))),Ct)for(const c of[.42,.74,1.04]){const h=[Ct[0]+Ct[3]*c,c*Ct[4],Ct[2]+Ct[5]*c],f=[a+n*c/r,c*(r/r),t+s*c/r],y=[(h[0]+f[0])/2,(h[1]+f[1])/2-.035,(h[2]+f[2])/2];Q(h,y,.004,.004,Ue,1),Q(y,f,.004,.004,Ue,1)}Ct=[a,0,t,n/r,1,s/r]}const ro=(t,a,r)=>{const n=(s,l,c,h,f)=>{const y=[s[0]+l[0]*c,s[1]+l[1]*c,s[2]+l[2]*c];if(Q(s,y,h,h*.68,[.09,.08,.06]),f>=5){for(let v=0;v<7;v++){const U=[y[0]+(i()-.5)*3.2,y[1]+(i()-.3)*2.2,y[2]+(i()-.5)*3.2],L=i()*6.283;Q(U,[U[0]+Math.cos(L)*1.3,U[1]+(i()-.5)*.8,U[2]+Math.sin(L)*1.3],1.2+i()*.8,.5+i()*.6,[.055,.065,.035])}return}const p=f===0?3:2+(i()<.4?1:0);for(let v=0;v<p;v++){const U=i()*6.283,L=f===0?.35+i()*.4:.25+i()*.55,W=[l[0]*.45+Math.cos(U)*Math.sin(L),l[1]*.5+Math.cos(L)*.6,l[2]*.45+Math.sin(U)*Math.sin(L)],H=Math.hypot(W[0],W[1],W[2]);n(y,W.map(I=>I/H),c*(.62+i()*.2),h*.62,f+1)}};n([t,-.1,a],[0,1,0],r*.3,r*.055,0)};if(ro(-70+i()*40,-230-i()*50,15+i()*4),fe==="Lone cottonwood"&&ro(70+i()*50,430+i()*80,19),fe==="Power line"){const t=-16-i()*6,a=G?ye-ne-2.2:t,r=G?se:0;let n=null;for(let s=-380+i()*30;s<1400;s+=52+i()*8){const l=9.5+i(),c=(i()-.5)*.25,h=((s*7.31%1+1)%1-.5)*.3,f=a+r*s;Q([f,-.1,s],[f+c,l,s+h],.3,.22,ce),Q([f+c-1.2,l-.5,s+h],[f+c+1.2,l-.5,s+h],.13,.13,ce),Q([f+c-.55,l-.5,s+h],[f+c-.1,l-.95,s+h],.07,.07,ce),Q([f+c+.55,l-.5,s+h],[f+c+.1,l-.95,s+h],.07,.07,ce);for(const p of[-1.05,1.05])Q([f+c+p,l-.45,s+h],[f+c+p,l-.3,s+h],.09,.07,[.16,.17,.17]);Q([f+c,l-.05,s+h],[f+c,l+.08,s+h],.09,.07,[.16,.17,.17]);const y=[[f+c-1.05,l-.3,s+h],[f+c+1.05,l-.3,s+h],[f+c,l+.08,s+h]];if(n)for(let p=0;p<3;p++){const v=n[p],U=y[p],L=6;for(let W=0;W<L;W++){const H=W/L,I=(W+1)/L,F=yt=>.9*4*yt*(1-yt);Q([v[0]+(U[0]-v[0])*H,v[1]+(U[1]-v[1])*H-F(H),v[2]+(U[2]-v[2])*H],[v[0]+(U[0]-v[0])*I,v[1]+(U[1]-v[1])*I-F(I),v[2]+(U[2]-v[2])*I],.018,.018,Ue,1)}}n=y}}const Ee=fe==="Windmill"?[-70+i()*30,330+i()*80]:null;let so=-1;const It=18;if(Ee){const[t,a]=Ee,r=10.5,n=1.7,s=.32,l=(c,h)=>{const f=n+(s-n)*h/r;return[t+(c&1?f:-f),h,a+(c&2?f:-f)]};for(let c=0;c<4;c++)Q(l(c,-.1),l(c,r),.1,.07,Bt);for(let c=2.4;c<r;c+=2.6){for(const[h,f]of[[0,1],[1,3],[3,2],[2,0]])Q(l(h,c),l(f,c),.05,.05,Bt);if(c<8)for(const[h,f]of[[0,1],[1,3],[3,2],[2,0]])Q(l(h,c-2.4),l(f,c),.03,.03,Bt),Q(l(f,c-2.4),l(h,c),.03,.03,Bt)}Q([t-.6,r,a],[t+.6,r,a],.25,.25,Bt),Q([t,r+.5,a+.2],[t,r+.5,a+2.6],.1,.08,Bt),Q([t,r+.5,a+2],[t,r+.5,a+3.4],1,.8,Bt.map(c=>c*1.4)),so=Re.length/12;for(let c=0;c<It*2+1;c++)Q([0,0,0],[0,0,0],0,0,Bt)}const Zo=Re.length/12,Ce=new Float32Array(Re),Ie=(t,a,r,n)=>{const s=e.createVertexArray();e.bindVertexArray(s),e.bindBuffer(e.ARRAY_BUFFER,t),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,a);const l=r*16;for(let c=0;c<r;c++)e.enableVertexAttribArray(1+c),e.vertexAttribPointer(1+c,4,e.FLOAT,!1,l,c*16),e.vertexAttribDivisor(1+c,n);return e.bindVertexArray(null),s},qe=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,qe),e.bufferData(e.ARRAY_BUFFER,ie,e.STATIC_DRAW);const ge=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ge),e.bufferData(e.ARRAY_BUFFER,Ce,e.DYNAMIC_DRAW);const no=900,Xe=new Float32Array(no*12),Te=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Te),e.bufferData(e.ARRAY_BUFFER,Xe,e.DYNAMIC_DRAW);const io=Ie(R.bladeBuf,qe,1,1),co=Ie(R.quadBuf,ge,3,1),lo=Ie(R.quadBuf,Te,3,1),Tt=Math.min(416,E),Ae={tx:[Le],fb:[],rb:[],b:[qe,ge,Te],v:[io,co,lo]},ho=Fe(e,R,Tt,!1,Tt,Ae),fo=Fe(e,R,Tt,!1,Tt/2,Ae),uo=Fe(e,R,E,!0,E,Ae);let mo=0;const $o=R.half?1:.25,Z=new Float32Array(34*4);G&&(Z[29*4+1]=ye,Z[29*4+2]=se,Z[29*4+3]=ne);let ta=0;const Ge=new Float32Array(16),x={eye:[0,1.45,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]};let Y=0,po=i()*6.283,lt=0,xo=i()*6;const wt=[];let ht=null,Ht=null,le=3.62,vo=k?3.72:2.2+i()*2;const jt=[];let V=null,Ve=!1,We=0,At=null;const at=()=>Et,rt=()=>gt-4.2*lt,bo=()=>{const t=o.view||zo,a=we+(t.yaw||0),r=kt(eo+(t.pitch||0),-1.35,1.45);let n=t.x||0,s=t.z||0;const l=Math.hypot(n,s);l>8&&(n*=8/l,s*=8/l),x.eye=[n,kt(Oo+(t.y||0),.4,3),s];const c=Math.cos(r);x.fw=[Math.sin(a)*c,Math.sin(r),Math.cos(a)*c],x.rt=[Math.cos(a),0,-Math.sin(a)];const h=x.fw,f=x.rt;x.up=[h[1]*f[2]-h[2]*f[1],h[2]*f[0]-h[0]*f[2],h[0]*f[1]-h[1]*f[0]];const y=.05,p=6e4,v=(p+y)/(p-y),U=-2*p*y/(p-y),L=x.eye,W=x.up,H=F=>F[0]*L[0]+F[1]*L[1]+F[2]*L[2],I=[[f[0]/mt,f[1]/mt,f[2]/mt,-H(f)/mt],[W[0]/mt,W[1]/mt,W[2]/mt,-H(W)/mt],[h[0]*v,h[1]*v,h[2]*v,-H(h)*v+U],[h[0],h[1],h[2],-H(h)]];for(let F=0;F<4;F++)for(let yt=0;yt<4;yt++)Ge[yt*4+F]=I[F][yt]},wo=(t,a)=>{const r=t*2-1,n=1-a*2,s=[0,1,2].map(c=>x.fw[c]+(r*x.rt[c]+n*x.up[c])*mt),l=Math.hypot(s[0],s[1],s[2]);return s.map(c=>c/l)},ea=(t,a,r)=>vt(t,Math.atan2(r,a))[0],oa=t=>{const a=[x.eye[0]*.001,x.eye[1]*.001,x.eye[2]*.001],r=u.hb;for(let n=.05;n<45;n+=n<2?.05:.15){const s=[a[0]+t[0]*n,a[1]+t[1]*n,a[2]+t[2]*n];if(s[1]<=0)return{kind:"ground",p:[s[0],0,s[2]],t:n};const l=s[1]-r,c=at()+dt[0]*Math.max(l,0),h=rt()+dt[1]*Math.max(l,0),f=Math.hypot(s[0]-c,s[2]-h);if(l>-.05&&s[1]<12&&f<ea(l,s[0]-c,s[2]-h)*.95)return{kind:l>6?"anvil":"base",p:s,t:n};const[y,p]=yo();if(l<0&&l>-u.drop&&Math.hypot(s[0]-y,s[2]-p)<u.wallR)return{kind:"base",p:s,t:n};const[v,U]=Oe();if(s[1]<r&&Math.hypot(s[0]-v,s[2]-U)<u.rainR)return{kind:"rain",p:s,t:n};const L=Math.hypot(s[0]-at()-ot[0],s[2]-rt()-ot[1]);if(L<xt&&s[1]>8.5+.8*(L/xt)**2-.4)return{kind:"anvil",p:s,t:n}}return{kind:"sky",p:[a[0]+t[0]*20,9,a[2]+t[2]*20],t:20}},yo=()=>[at()+Math.sin(Vt)*u.R0*.42,rt()+Math.cos(Vt)*u.R0*.42],Oe=()=>[at()+Math.sin(ee+1.2)*Gt,rt()+Math.cos(ee+1.2)*Gt];let Jt=0;const Me=(t,a,r,n,s)=>{Jt>=no||(Xe.set([t[0]*1e3,t[1]*1e3,t[2]*1e3,r,a[0]*1e3,a[1]*1e3,a[2]*1e3,r*.8,n,0,0,s],Jt*12),Jt++)},Po=(t,a,r,n,s)=>{let l=[t,a];for(let c=0;c<r;c++){const h=[l[0]];for(let f=1;f<l.length;f++){const y=l[f-1],p=l[f],v=Math.hypot(p[0]-y[0],p[1]-y[1],p[2]-y[2])*n;h.push([(y[0]+p[0])/2+(i()-.5)*v,(y[1]+p[1])/2+(i()-.5)*v*(s?.25:.5),(y[2]+p[2])/2+(i()-.5)*v],p)}l=h}return l},Ro=(t,a,r,n)=>{Jt=0;const s=t==="crawler",l=Po(a,r,7,s?.45:.36,s),c=s?2.5:3.5;for(let p=1;p<l.length;p++)Me(l[p-1],l[p],c,1,2);for(let p=1;p<l.length;p+=3)Me(l[Math.max(0,p-3)],l[p],140,.9,3);const h=s?10:6;for(let p=0;p<h;p++){const v=l[Math.floor((s?.05+.9*i():.05+.6*i())*(l.length-1))],U=s?.8+i()*2.2:.2+i()*.55,L=i()*6.283,W=[v[0]+Math.cos(L)*U,v[1]-(s?(i()-.3)*.25:U*(.5+i()*.6)),v[2]+Math.sin(L)*U];W[1]<.02&&(W[1]=.02);const H=Po(v,W,5,.42,s),I=.25+i()*.35;for(let F=1;F<H.length;F++)Me(H[F-1],H[F],c*.55,I*(1-.6*F/H.length),2);if(s)for(let F=2;F<H.length;F+=4)Me(H[F-2],H[F],70,I*.5,3)}e.bindBuffer(e.ARRAY_BUFFER,Te),e.bufferSubData(e.ARRAY_BUFFER,0,Xe,0,Jt*12);const f=[(a[0]+r[0])/2,(a[1]+r[1])/2,(a[2]+r[2])/2],y=Math.hypot(f[0]-x.eye[0]*.001,f[2]-x.eye[2]*.001,f[1]*.5);ht={t0:Y,A:a,B:r,kind:t,n:Jt,peak:t==="crawler"?2.6:3.4,strokes:[0,.07+i()*.05,.16+i()*.1].slice(0,2+(i()<.5?1:0)),gdist:y},jt.push({at:Y+Math.min(y*2.9,24),v:kt(1.2/(1+y/3),.08,1),dist:y})},ze=(t,a)=>{const n=Math.hypot(t-at(),a-rt())<u.R0+2.5?[t+(i()-.5)*.8,u.hb+.05,a+(i()-.5)*.8]:[t+(i()-.5)*3,8.4,a+(i()-.5)*3];Ro("cg",n,[t,0,a])},Ke=t=>{const a=i()*6.283,r=4+i()*5,n=Math.max(8.3,Math.min(9.4,t[1]));Ro("crawler",[t[0]-Math.cos(a)*r*.3,n,t[2]-Math.sin(a)*r*.3],[t[0]+Math.cos(a)*r*.7,n+(i()-.5)*.4,t[2]+Math.sin(a)*r*.7])},aa=(t,a)=>{const r=oa(wo(t,a));if(r.kind==="ground"){const n=x.eye[0]*.001,s=x.eye[2]*.001,l=r.p[0]-n,c=r.p[2]-s,h=Math.hypot(l,c)||1,f=kt(h,1.5+6*i(),16);ze(n+l/h*f,s+c/h*f)}else if(r.kind==="base"||r.kind==="rain")ze(r.p[0]+(i()-.5)*.3,r.p[2]+(i()-.5)*.3);else if(r.kind==="anvil")Ke(r.p);else if(Math.hypot(r.p[0]-at()-ot[0],r.p[2]-rt()-ot[1])<xt*1.5)Ke([at()+ot[0]+(r.p[0]-at()-ot[0])*.7,8.8,rt()+ot[1]+(r.p[2]-rt()-ot[1])*.7]);else return;o.sound.hit("snare",.08)},ra=()=>{const[t,a]=Oe(),r=i();if(de==="Anvil crawlers"?r<.6:de==="Bolt from the blue"?r<.2:r<.25)Ke([at()+ve[0]*(.3+i()*.5)+(i()-.5)*4,8.8,rt()+ve[1]*(.3+i()*.6)+(i()-.5)*3]);else if(de==="Bolt from the blue"&&r<.75){const n=i()*6.283;ze(at()+ve[0]+Math.cos(n)*5,rt()+ve[1]+Math.sin(n)*4)}else{const n=i()*6.283,s=u.rainR*Math.sqrt(i())*.8;ze(t+Math.cos(n)*s,a+Math.sin(n)*s)}},N=(t,a,r,n,s)=>{Z[t*4]=a,Z[t*4+1]=r,Z[t*4+2]=n,Z[t*4+3]=s},Ne=(t,a,r)=>t<0?0:(1-Math.exp(-t/a))*Math.exp(-t/r),Eo=()=>{const t=to+11*lt,a=[at()-x.eye[0]*.001,rt()-x.eye[2]*.001],r=Math.hypot(a[0],a[1]),n=[a[0]/r*.6+.1,a[1]/r*.6+.4],s=Math.hypot(n[0],n[1]);N(0,Y,po,lt,t),N(1,Mt[0],Mt[1],Mt[2],it),N(32,u.anvTop||.8,k?.3:3.2,tt==="behind"?.12:tt==="under"?.4:1,T?1e4:1.2),N(33,T?0:.25,tt==="behind"?1:0,tt==="behind"?D==="Blue hour"?1:.6:0,M==="Far tower"&&tt==="behind"?24:0),N(30,ke[0],ke[1],ke[2],Math.hypot(at(),rt())),N(31,...Se),N(2,at(),rt(),u.hb,u.anvB||8.6),N(3,x.eye[0],x.eye[1],x.eye[2],mt),N(4,x.fw[0],x.fw[1],x.fw[2],2*mt/E),N(5,x.rt[0],x.rt[1],x.rt[2],Tt),N(6,x.up[0],x.up[1],x.up[2],E);let l=0,c=0,h=0,f=0,y=[0,-50,0],p=[0,-50,0],v=[0,-50,0];if(ht){const I=Y-ht.t0,F=Ne(I,.035,.26);l=ht.peak*F,y=ht.A,p=ht.B,h=ht.kind==="cg"?2.2*F:0;let yt=0;for(const na of ht.strokes)yt+=Ne(I-na,.006,.08);f=Math.min(1.4,yt*1.1+.25*Ne(I,.01,.5)),I>1.6&&(ht=null)}if(Ht){const I=Y-Ht.t0;c=Ht.peak*Ne(I,.05,.38),v=Ht.p,I>1.6&&(Ht=null)}N(7,y[0],y[1],y[2],l),N(8,p[0],p[1],p[2],c),N(9,v[0],v[1],v[2],h);const[U,L]=Oe(),[W,H]=yo();N(10,U,L,u.rainR,u.green),N(11,W,H,u.wallR,u.drop+.12*lt),N(12,Ft,u.taper,u.bandK,u.lip),N(13,u.helix,u.mam,u.torn,u.rainK),N(14,at()+ot[0],rt()+ot[1],xt,$e*(1+lt)),N(15,..._t.zen,Ze),N(16,..._t.mid,k?1:D==="Blue hour"?.35:0),N(17,..._t.hs,Lt),N(18,..._t.ha,_t.exp),N(19,..._t.sun,1),N(20,..._t.amb,te?1:0),N(21,..._t.bn,$o);for(let I=0;I<4;I++){const F=wt[I];F?N(22+I,F.x,F.z,F.ang,F.s):N(22+I,0,0,0,0)}N(26,.8,.7,1,Vo),N(27,dt[0],dt[1],n[0]/s,n[1]/s),N(28,f,E<=256?56:60,0,0)},Ye=()=>{Z[29*4]=ta++*.618034%1,Z[28*4+2]=mo,Z[28*4+3]=Z[7*4+3]+Z[8*4+3]>.02?1:0,e.bindFramebuffer(e.FRAMEBUFFER,fo.fb),e.viewport(0,0,Tt,Tt/2),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.depthMask(!0),e.useProgram(Xt.p),e.uniform4fv(Xt.uP,Z),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.n2),e.uniform1i(Xt.uN2,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,R.n3),e.uniform1i(Xt.uN3,1),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,Le),e.uniform1i(Xt.uF,4),e.bindVertexArray(R.vEmpty),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,ho.fb),e.viewport(0,0,Tt,Tt),Mo&&(e.enable(e.BLEND),e.blendFunc(e.CONSTANT_ALPHA,e.ONE_MINUS_CONSTANT_ALPHA),e.blendColor(0,0,0,Z[28*4+3]<.5?.36:.6)),e.useProgram(R.P.copy.p),e.uniform4fv(R.P.copy.uP,Z),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,fo.tex),e.uniform1i(R.P.copy.uS,2),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND),mo^=1},go=()=>{e.bindFramebuffer(e.FRAMEBUFFER,uo.fb),e.viewport(0,0,E,E),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.useProgram(R.P.comp.p),e.uniform4fv(R.P.comp.uP,Z),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.n2),e.uniform1i(R.P.comp.uN2,0),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,ho.tex),e.uniform1i(R.P.comp.uC,2),e.bindVertexArray(R.vEmpty),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.depthMask(!0),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(R.P.grass.p),e.uniform4fv(R.P.grass.uP,Z),e.uniformMatrix4fv(R.P.grass.uVP,!1,Ge),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.n2),e.uniform1i(R.P.grass.uN2,0),e.bindVertexArray(io),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,R.bladeVerts,ct),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(R.P.rib.p),e.uniform4fv(R.P.rib.uP,Z),e.uniformMatrix4fv(R.P.rib.uVP,!1,Ge),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,R.n2),e.uniform1i(R.P.rib.uN2,0),e.bindVertexArray(co),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Zo),ht&&Z[28*4]>.002&&(e.blendFunc(e.ONE,e.ONE),e.depthMask(!1),e.bindVertexArray(lo),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,ht.n),e.depthMask(!0)),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.flush(),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,E,E),e.useProgram(R.P.fin.p),e.uniform4fv(R.P.fin.uP,Z),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,uo.tex),e.uniform1i(R.P.fin.uS,3),e.bindVertexArray(R.vEmpty),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)},To=()=>{if(!Ee)return;const[t,a]=Ee,r=[t,11,a-.3],n=so*12,s=(c,h,f,y,p)=>{Ce.set([h[0],h[1],h[2],y,f[0],f[1],f[2],p,.07,.07,.075,0],n+c*12)},l=(c,h)=>[r[0]+Math.cos(c)*h,r[1]+Math.sin(c)*h,r[2]];for(let c=0;c<It;c++){const h=xo+c*2*Math.PI/It;s(c,l(h,.35),l(h+.05,1.75),.12,.36),s(It+c,l(h,1.72),l(h+2*Math.PI/It,1.72),.04,.04)}s(It*2,l(0,0),l(0,.01),.4,.4),e.bindBuffer(e.ARRAY_BUFFER,ge),e.bufferSubData(e.ARRAY_BUFFER,n*4,Ce,n,(It*2+1)*12)},sa=t=>{const a=o.input;if(a.down&&a.inside!==!1){V||(V={x0:a.x,y0:a.y,lx:a.x,ly:a.y,t:0,moved:0}),V.t+=t;const s=a.x-V.lx,l=a.y-V.ly;if(V.moved=Math.max(V.moved,Math.hypot(a.x-V.x0,a.y-V.y0)),V.moved>.025&&Math.hypot(s,l)>.002){const c=wo(a.x,a.y),h=Math.hypot(c[0],c[2])||1,f=c[1]<-.02?Math.min(x.eye[1]/-c[1],30):24,y=x.eye[0]+c[0]/h*f,p=x.eye[2]+c[2]/h*f,v=s*x.rt[0]-l*x.fw[0]/Math.hypot(x.fw[0],x.fw[2]),U=s*x.rt[2]-l*x.fw[2]/Math.hypot(x.fw[0],x.fw[2]),L=Math.min(1.6,Math.hypot(s,l)/Math.max(t,.016)*1.2),W=wt[wt.length-1];(!W||Y-W.born>.12)&&(wt.push({x:y,z:p,ang:Math.atan2(U,v),s:.4+.7*L,born:Y,v:6+6*L}),wt.length>4&&wt.shift(),o.sound.hit("noise",.05+.08*L,{cutoff:500+600*L,dur:.5}))}V.moved<.025&&V.t>.35&&(lt=Math.min(1,lt+t*.14)),V.lx=a.x,V.ly=a.y}else V&&(Ve=V.t>.3||V.moved>.025,V=null);const r=a.taps(),n=V&&(V.t>.3||V.moved>.025);if(r.length&&!Ve&&!n){const s=r[r.length-1];At||(At={at:Y+.3+i()*.9}),At.x=s.x,At.y=s.y}r.length&&(Ve=!1)},Ao=(t,a)=>{a=Math.min(Math.max(a||0,0),.25),Y=t,bo(),sa(a),o.input.down&&V&&V.moved<.025&&V.t>.35||(lt=Math.max(0,lt-a*.012));const r=to+11*lt;po+=a*(.028+.05*lt),xo-=a*r*.35;for(const n of wt)n.x+=Math.cos(n.ang)*n.v*a,n.z+=Math.sin(n.ang)*n.v*a,n.s*=Math.exp(-a*.6);for(;wt.length&&wt[0].s<.02;)wt.shift();if(At&&Y>=At.at&&(!ht||Y-ht.t0>1.1)&&(aa(At.x,At.y),At=null,le=Math.max(le,Y+2+i()*3)),Y>=vo){const n=i()*6.283,s=i()*u.R0*.6;Ht={t0:Y,p:[at()+Math.cos(n)*s,u.hb+2+i()*6,rt()+Math.sin(n)*s],peak:(k?1.1:1.4)*(.5+i())},vo=Y+(k?.8+i()*2.2:2+i()*5)/(1+lt*1.5),jt.push({at:Y+9+i()*14,v:.12,dist:9})}Y>=le&&(Y<4&&!T&&i()<.45?le=Y+2+i()*4:(ra(),le=Y+(k?3+i()*4:6+i()*9)/(1+lt*2)));for(let n=jt.length-1;n>=0;n--)if(Y>=jt[n].at){const s=jt[n];jt.splice(n,1),s.dist<3&&o.sound.hit("kick",s.v),o.sound.hit("noise",s.v*.7,{cutoff:90+300/(1+s.dist),dur:2.2+Math.min(3,s.dist*.25)})}We-=a,We<=0&&(We=.45,o.sound.hit("noise",.02+.05*(r-6)/12,{cutoff:260+30*r,dur:.9})),To(),Eo(),Ye(),go()};let Mo=!1;return Xt=R.ready((tt==="behind"?1:0)|(u.torn>0||$e>0||te?2:0)),bo(),To(),Eo(),Ye(),Ye(),Mo=!0,go(),R.fin&&R.fin.register(Ao,()=>Ae),Ao}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
