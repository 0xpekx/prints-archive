// Prayer Flags: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/551.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(co){co&&function(){"use strict";const oa={yaw:0,pitch:0,x:0,y:0,z:0},se=8,ne=9,Qe=2,qe=24,Ze=432,Oe=se*qe,ct=ne*(Ze/qe),j=28,ke=1/60,io=24e3,lo=400,Y=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,aa=Y+"void main() { vec2 p = vec2(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1.); gl_Position = vec4(p, 0., 1.); }",We=`
uniform vec4 uC[12];
uniform int uZ;   // never set (0): loop bounds read it so the compiler keeps the loops rolled (faster first compile)
#define EYE uC[0].xyz
#define TANH uC[0].w
#define FW uC[1].xyz
#define RT uC[2].xyz
#define UPV uC[3].xyz
#define SUN uC[4].xyz
#define SUNC uC[5].rgb
#define EXPO uC[5].w
#define TIME uC[6].x
#define RES uC[11].x
float h12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 rayDir(vec2 uv) { return normalize(FW + ((uv.x * 2. - 1.) * RT + (uv.y * 2. - 1.) * UPV) * TANH); }
vec3 sky(vec3 d) {
  float y = clamp(d.y, 0., 1.), mu = max(dot(d, SUN), 0.);
  vec3 zen = uC[7].rgb, hor = uC[8].rgb;
  vec3 c = mix(hor, zen, pow(y, .42));
  c = mix(c, uC[9].rgb, exp(-y * 22.) * .6);
  vec2 dh = normalize(d.xz + vec2(1e-5, 0.)), lh = normalize(SUN.xz + vec2(1e-5, 0.));
  float fs = dot(dh, lh), as = max(-fs, 0.);
  c *= 1. + uC[11].y * max(fs, 0.) * exp(-y * 4.);
  // twilight (0 by day): the grey-blue earth shadow on the horizon away from the sun, the pink belt above it
  c = mix(c, c * vec3(.5, .56, .74), uC[8].w * as * exp(-y * 14.));
  c += uC[7].w * vec3(1., .52, .56) * as * exp(-abs(y - .1) * 13.);
  c += SUNC * (.035 * pow(mu, 5.) + .12 * pow(mu, 50.) + .5 * pow(mu, 700.));
  return c;
}
vec3 skyAmb() { return uC[10].rgb; }
vec3 tone(vec3 c) { c *= EXPO; c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14); return pow(clamp(c, 0., 1.), vec3(1. / 2.2)); }
float depthOf(float z) { z = max(z, .031); const float n = .03, f = 2e5; return .5 * ((f + n) / (f - n) - 2. * f * n / ((f - n) * z)) + .5; }
`,fo=`
uniform sampler2D uSh;
uniform vec4 uM[2];
float flagShadow(vec3 P, float bias) {
  float s = P.y / SUN.y;
  vec2 g = (P.xz - SUN.xz * s - uM[0].xy) / uM[0].z * .5 + .5;
  if (g.x < 0. || g.y < 0. || g.x > 1. || g.y > 1.) return 0.;
  float dr = 1. - (s - uM[1].x) / (uM[1].y - uM[1].x);
  vec2 f = g * uM[0].w - .5, i = floor(f), w = f - i;
  float a = 0.;
  for (int k = 0; k < 4; k++) {
    vec2 o = vec2(k & 1, k >> 1);
    float z = texelFetch(uSh, ivec2(clamp(i + o, vec2(0.), vec2(uM[0].w - 1.))), 0).r;
    float sh = step(z + bias, dr);
    a += sh * (o.x > .5 ? w.x : 1. - w.x) * (o.y > .5 ? w.y : 1. - w.y);
  }
  return a;
}
`,kt=`
float passH(vec2 p) {
  float x = p.x, z = p.y, ax = abs(x);
  float side = x < 0. ? 1. : .78;
  float crest = .0018 * x * x / (1. + ax / 220.) * side;
  float w = exp(-pow(z / (420. + ax * .55), 2.));
  float d = max(-z - 6., 0.);
  float front = -1450. * (1. - exp(-d * d / (d + 60.) / 2000.));
  float db = max(z - 8., 0.);
  float back = -520. * (1. - exp(-db * db / (db + 40.) / 700.));
  // the lip ahead: a broken rise of frost-heaved ground, higher in places, with gaps where the drop shows
  float lip = exp(-pow((z + 19. + 3. * sin(x / 7.3)) / 4.5, 2.)) * smoothstep(70., 25., ax) * (.3 + 1.5 * smoothstep(.15, .8, .5 + .5 * sin(x / 8.1 + 2.) * sin(x / 3.7 + .5)));
  return crest * w + (z < 0. ? front : back) + lip;
}
`,ho=kt+`
vec3 glac(vec2 p) {     // mask, along (m), across (-1..1)
  float z = p.y;
  float gx = 700. + 650. * sin((z + 3000.) / 2600.) + uB[3].z;
  float w = 380. + 90. * sin(z / 1700.);
  float a = (p.x - gx) / w;
  float m = smoothstep(1., .72, abs(a)) * smoothstep(-3600., -4200., z) * smoothstep(-10500., -8500., z);
  return vec3(m, -z, a);
}
`,po=Y+`
uniform vec4 uB[5];
uniform int uZ;   // never set (0): rolled loop bounds (faster first compile)
out vec4 o;
float hsh(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 h22(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
vec3 nd(vec2 x) {
  vec2 i = floor(x), f = fract(x);
  vec2 u = f * f * f * (f * (f * 6. - 15.) + 10.), du = 30. * f * f * (f * (f - 2.) + 1.);
  float a = hsh(i), b = hsh(i + vec2(1, 0)), c = hsh(i + vec2(0, 1)), d = hsh(i + vec2(1, 1));
  float k1 = b - a, k2 = c - a, k4 = a - b - c + d;
  return vec3(-1. + 2. * (a + k1 * u.x + k2 * u.y + k4 * u.x * u.y), 2. * du * vec2(k1 + k4 * u.y, k2 + k4 * u.x));
}
`+ho+`
float macro(vec2 p) {
  float h = passH(p);
  // the far range across the valley, peaks, the side summits, the ring of distant ranges
  float z = p.y, x = p.x;
  float rt = uB[1].x;
  float env = smoothstep(-6200., -11500., z) * (1. - .35 * smoothstep(-17000., -22000., z));
  float wall = 2100. + 500. * sin(x / 3900. + 1.3 + uB[2].x) + 300. * sin(x / 1700. + uB[2].y);
  if (rt > 1.5) wall += 500. * smoothstep(9000., 2000., abs(x - uB[1].y));
  h += env * wall;
  vec2 pk = uB[1].yz;
  float dpk = length((p - pk) * vec2(1., 1.25));
  h += uB[1].w * pow(max(0., 1. - dpk / 7200.), 1.55);
  if (rt > .5 && rt < 1.5) { vec2 pk2 = pk + vec2(-3400., -900.); h += uB[1].w * .86 * pow(max(0., 1. - length(p - pk2) / 5200.), 1.6); }
  h += 1150. * pow(max(0., 1. - length((p - vec2(-3300., -1100.)) * vec2(1., .8)) / 2400.), 1.4);
  h += 780. * pow(max(0., 1. - length(p - vec2(3600., 900.)) / 2600.), 1.3);
  float back = smoothstep(9000., 16000., z) + smoothstep(13000., 19000., abs(x)) * smoothstep(-6000., 0., z);
  h += back * (650. + 450. * sin(x / 2300. + uB[2].x * 2.));
  h += smoothstep(15500., 21000., z) * (1500. + 700. * sin(x / 2900. + uB[2].y) + 400. * sin(x / 1100. + 2.));
  vec3 g = glac(p);
  // lake basin behind
  float dl = length(p - uB[2].zw) / uB[3].y;
  h -= 230. * exp(-dl * dl * 1.6);
  return h;
}
float terr(vec2 p, int oct) {
  float r = length(p), z = p.y;
  float h = macro(p);
  vec2 pk = uB[1].yz;
  float dpk = length((p - pk) * vec2(1., 1.25));
  float env = smoothstep(-6200., -11500., z) * (1. - .35 * smoothstep(-17000., -22000., z));
  // relief: erosion fbm, stronger on the mountains
  float mt = clamp(max(smoothstep(40., 1100., h), env * 1.3), 0., 1.);
  vec3 gq = glac(p);
  float gz = smoothstep(-3000., -4500., z) * smoothstep(-11000., -9000., z);
  float rf = 1. - .5 * exp(-gq.z * gq.z * .3) * gz * smoothstep(-200., -900., h);
  float amp = mix(150., 520., mt) * smoothstep(60., 700., r) * rf;
  float a = 0., b = 1.; vec2 dsum = vec2(0.), q = p / 2600. + uB[2].xy;
  mat2 m = mat2(.8, -.6, .6, .8);
  float rg = 0., rb = .5, rw = 1.;
  for (int i = 0; i < oct + uZ; i++) {
    vec3 n = nd(q);
    dsum += n.yz;
    a += b * n.x / (1. + dot(dsum, dsum));
    float rr = 1. - abs(n.x); rr *= rr;
    rg += rr * rb * rw; rw = clamp(rr * 1.8, 0., 1.);
    b *= .5; rb *= .5; q = m * q * 2.03;
  }
  h += amp * a + mt * 900. * (rg - .45) * smoothstep(400., 2500., r) * rf;
  // the summit is a sharp apex at a known height (the plume streams from it)
  float ap = smoothstep(900., 0., dpk);
  h = mix(h, macro(pk) + 200. - dpk * .95, ap * ap);
  // near the pass: the saddle with a small hummocky relief
  float nr = 0.;
  if (oct > 8) { vec3 n1 = nd(p / 9. + 3.1), n2 = nd(p / 3.3 + 7.7); nr = .26 * n1.x + .09 * n2.x; }
  h = mix(passH(p) + nr, h, smoothstep(60., 200., r));
  // glacier: a convex ice surface filling the valley floor
  vec3 g = glac(p);
  return h;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uB[0].y;
  if (uB[0].x > 1.5) {
    // scree tile: Voronoi slabs at two sizes, R height, G tint, B cavity, A lichen
    vec2 x = uv * 11., x2 = uv * 27.;
    float best = -1., tint = 0., cav = 1., lich = 0.;
    for (int L = 0; L < 2 + uZ; L++) {
      vec2 X = L == 0 ? x : x2; float N = L == 0 ? 11. : 27.;
      vec2 w = vec2(nd(uv * 6. + float(L) * 3.).x, nd(uv * 6. + 5. + float(L) * 3.).x) * .35;
      X += w;
      vec2 i = floor(X), f = fract(X);
      float F1 = 9., F2 = 9.; vec2 c1 = vec2(0.), id = vec2(0.);
      for (int k = 0; k < 9 + uZ; k++) {
        vec2 g = vec2(k % 3 - 1, k / 3 - 1), cell = mod(i + g, N), r = g + .1 + .8 * h22(cell + float(L) * 17.) - f; float d = dot(r, r);
        if (d < F1) { F2 = F1; F1 = d; c1 = r; id = cell; } else if (d < F2) F2 = d;
      }
      float e = sqrt(F2) - sqrt(F1);
      float hs = hsh(id + float(L) * 9.1);
      vec2 tl = h22(id + 3.3) - .5;
      // frost-shattered: each stone a tilted, facetted chip (faces slope from a ridge to sharp edges), gravel between
      float top = (L == 0 ? .5 + .5 * hs : .35 + .45 * hs) + dot(-c1, tl) * .8;
      float hh = top * smoothstep(0., .035, e) * (.35 + .65 * min(1., e / (L == 0 ? .4 : .3))) * (.96 + .04 * nd(uv * 120. + hs * 9.).x);
      hh *= L == 0 ? step(.6, hs) : step(.35, hs);
      if (hh > best) { best = hh; tint = hsh(id + float(L) * 4.7); cav = smoothstep(0., .14, e); lich = smoothstep(.6, .85, nd(uv * 70. + hs * 31.).x) * step(.8, hsh(id + 2.2)); }
    }
    float grav = .1 + .05 * nd(uv * 90.).x + .04 * nd(uv * 300.).x;
    float hv = clamp(max(best, grav), 0., 1.) * 255.;
    o = vec4(floor(hv) / 255., tint, cav, fract(hv));
    return;
  }
  vec2 p = (uv * 2. - 1.) * uB[0].z;
  float h = terr(p, int(uB[0].w));
  float hi = floor(h / 16. + .5) * 16.;
  o = vec4(hi, h - hi, 0., 1.);
}
`,sa=Y+`
uniform sampler2D uN2, uCM;
uniform vec4 uQ;
uniform int uZ;
out vec4 o;
float h12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vn(vec2 x) { vec2 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f); return textureLod(uN2, (i + f + .5) / 256., 0.).r; }
float mH(vec2 uv) { vec4 m = textureLod(uCM, uv, 0.); return (m.r + m.a / 255.) * 1.6; }
// cairn: flat stones laid like shingles on a mound (two Voronoi layers of slabs; each slab is a plane tilted
// with the mound under its centre, so its outer edge laps over the course below; rounded edges, dark gaps)
float cprof(float r, float Rr) { float s = clamp(1. - r / Rr, 0., 1.); return 1.15 * s * s * (3. - 2. * s); }
float cairn(vec2 q, out vec2 info) {
  float r = length(q), R = 2.;
  info = vec2(0.);
  if (r > R + .3) return 0.;
  float best = 0.;
  for (int L = 0; L < 2 + uZ; L++) {
    float S = L == 0 ? .3 : .19, fl = float(L);
    mat2 M = L == 0 ? mat2(1.) : mat2(.8, .6, -.6, .8);
    vec2 x = M * q / S + fl * .5;
    vec2 i = floor(x), f = fract(x);
    float F1 = 9., F2 = 9.; vec2 id = vec2(0.), cc = vec2(0.);
    for (int k = 0; k < 9 + uZ; k++) {
      vec2 g = vec2(k % 3 - 1, k / 3 - 1);
      vec2 o = .15 + .7 * vec2(h12(i + g + fl * 7.), h12(i + g + 3.1 + fl * 7.));
      vec2 rr = g + o - f; float dd = dot(rr * vec2(1., 1.4), rr * vec2(1., 1.4));
      if (dd < F1) { F2 = F1; F1 = dd; id = i + g; cc = rr; } else if (dd < F2) F2 = dd;
    }
    float e = (sqrt(F2) - sqrt(F1)) * S;
    vec2 qc = (x + cc - fl * .5) * S * M;
    float rc = length(qc);
    float ang = atan(qc.y / (abs(qc.x) + 1e-4)) * sign(qc.x + 1e-5);
    float Rr = R * (.86 + .09 * sin(ang * 3. + 1.) + .05 * sin(ang * 7. + 2.));
    float pc = cprof(rc, Rr), dp = (cprof(rc + .05, Rr) - cprof(max(rc - .05, 0.), Rr)) * 10.;
    float hs = h12(id + fl * 13.);
    vec2 tl = vec2(h12(id + 5.), h12(id + 8.)) - .5, rad = qc / max(rc, 1e-3);
    float top = pc + (dp * .8 + .12) * dot(q - qc, rad) + dot(q - qc, tl) * .25 + (hs - .5) * .06 + fl * .03;
    float hh = top - (.06 + .025 * hs) * (1. - sqrt(smoothstep(0., .045 + .02 * hs, e)));
    hh *= step(.025, pc);
    float mani = step(.82 - .4 * smoothstep(.45, .8, pc / 1.3), hs) * fl;
    if (hh > best) { best = hh; info = vec2(hs + fl * 2. + mani * 4., e / S); }
  }
  return max(best, 0.);
}
void main() {
  vec2 uv = gl_FragCoord.xy / 512., pp = (uv * 2. - 1.) * 2.56;
  vec2 cinf; float h = cairn(pp, cinf);
  if (uQ.x < .5) { float hv = clamp(h / 1.6, 0., 1.) * 255.; o = vec4(floor(hv) / 255., 0., 0., fract(hv)); }
  else {
    float h0 = mH(uv), hx = mH(uv + vec2(1. / 512., 0.)), hz = mH(uv + vec2(0., 1. / 512.));
    vec3 n = normalize(vec3(h0 - hx, .01, h0 - hz));
    float ao = 1.;
    float hs = fract(cinf.x), kind = floor(cinf.x);
    // varied stones: pale granite, grey gneiss, rusty schist, dark slate, buff sandstone, white quartz
    float h2 = fract(hs * 7.31 + kind * .37);
    vec3 sl = hs < .3 ? vec3(.42, .4, .37) : hs < .5 ? vec3(.27, .26, .25) : hs < .66 ? vec3(.4, .3, .22) : hs < .8 ? vec3(.17, .17, .175) : hs < .93 ? vec3(.48, .42, .33) : vec3(.72, .7, .66);
    sl *= .82 + .36 * h2;
    sl *= (.74 + .3 * vn(pp * 21. + hs * 40.) + .12 * vn(pp * 85.)) * (.86 + .28 * vn(pp * 260.));
    // pale weathered rims where the edges catch the sun
    sl = mix(sl, sl * 1.3 + .04, smoothstep(.35, .1, cinf.y) * smoothstep(.2, .7, n.y) * .6);
    // crustose lichen: orange-yellow and grey-green rosettes on the upward, older faces
    float lq = vn(pp * 55. + hs * 17.) * .6 + vn(pp * 150.) * .4;
    float lch = smoothstep(.64, .7, lq) * smoothstep(.35, .6, vn(pp * 7. + hs * 5.)) * smoothstep(.2, .7, n.y) * step(.25, h2);
    sl = mix(sl, (h2 > .6 ? vec3(.56, .4, .16) : vec3(.48, .5, .38)) * (.75 + .45 * vn(pp * 260.)), lch * .6);
    ao = mix(.5, 1., smoothstep(0., .4, cinf.y)) * mix(.8, 1., smoothstep(.1, .6, n.y));
    if (kind > 3.5) {
      // a carved mani stone: rows of pale cut marks on dark slate (marks, not script)
      float rw = fract(dot(pp, vec2(.6, .8)) * 8. + hs * 3.), mk = smoothstep(.4, .6, vn(vec2(dot(pp, vec2(-.8, .6)) * 16., floor(dot(pp, vec2(.6, .8)) * 8.) * 7.3 + hs * 20.))) * smoothstep(.12, .25, rw) * smoothstep(.88, .75, rw);
      vec3 slab = h2 < .55 ? vec3(.15, .15, .16) : vec3(.22, .24, .29);
      vec3 cut = h2 < .3 ? vec3(.7, .68, .6) : h2 < .55 ? vec3(.62, .52, .2) : h2 < .8 ? vec3(.72, .7, .64) : vec3(.6, .24, .14);
      sl = mix(slab, cut, mk * .9) * (.82 + .3 * vn(pp * 40.));
    }
    // old flags draped over the heap: faded, torn cotton strips
    vec2 dq = mat2(.8, .6, -.6, .8) * pp;
    float strip = floor(dq.x * 4.2), drape = smoothstep(.55, .6, vn(vec2(strip * 3.7, dq.y * 1.3) + 5.)) * step(.35, vn(pp * 26.)) * smoothstep(.25, .5, h / 1.3);
    float ci = mod(strip, 5.);
    vec3 cc = ci < .5 ? vec3(.2, .3, .55) : ci < 1.5 ? vec3(.75, .74, .7) : ci < 2.5 ? vec3(.62, .2, .15) : ci < 3.5 ? vec3(.25, .45, .25) : vec3(.72, .62, .25);
    sl = mix(sl, mix(cc, vec3(.6, .58, .55), .45) * (.8 + .25 * vn(pp * 60.)), drape * .9);
    o = vec4(sl, ao);
  }
}
`,it=We+`
uniform sampler2D uHF, uHN, uSC, uN2, uPL;
uniform sampler2D uCM;
uniform vec4 uW[7], uB[5];
out vec4 o;
`+ho+`
float vn(vec2 x) { vec2 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f); return textureLod(uN2, (i + f + .5) / 256., 0.).r; }
// the same noise with full-precision weights (the hardware filter's 8-bit weights terrace the tall mid-detail into dashes)
float vnF(vec2 x) { vec2 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f); ivec2 c = ivec2(i) & 255, d = (c + 1) & 255;
  return mix(mix(texelFetch(uN2, c, 0).r, texelFetch(uN2, ivec2(d.x, c.y), 0).r, f.x), mix(texelFetch(uN2, ivec2(c.x, d.y), 0).r, texelFetch(uN2, d, 0).r, f.x), f.y); }
float hMap(sampler2D s, vec2 uv) { vec2 v = textureLod(s, uv, 0.).rg; return v.x + v.y; }
float baseH(vec2 p) {
  float h = hMap(uHF, p / ${2*io}. + .5);
  vec2 un = p / ${2*lo}. + .5, e2 = abs(un - .5);
  float e = max(e2.x, e2.y);
  if (e < .5) h = mix(hMap(uHN, un), h, smoothstep(.38, .5, e));
  return h;
}
float trailX(float z) { return uW[3].z + 1.3 + (z < 0. ? .62 * z : .17 * z) + .4 * sin(z / 5.3); }
vec2 cairnUV(vec2 p) { return (p - uW[1].xy) * (2. / uW[1].z) / 5.12 + .5; }
float cairnH(vec2 p) { vec4 m = textureLod(uCM, cairnUV(p), 0.); return (m.r + m.a / 255.) * 1.6 * uW[1].w / 1.3; }
#ifdef MARCH
float nearDet(vec2 p, float dE) {
  vec2 q2 = mat2(.6, .8, -.8, .6) * p / 1.7 + .37;
  vec4 a = texture(uSC, p / (5.2 * uW[6].x)), b = texture(uSC, q2);
  a.r += a.a / 255.; b.r += b.a / 255.;
  float tr = smoothstep(.22, .45, abs(p.x - trailX(p.y)) + .12 * vn(p * 2.));
  float cl = smoothstep(.42, .78, vn(p / 4.3 + 11.)), pb = smoothstep(.2, .5, vn(p / 2.7 + 23.));
  vec4 g = textureLod(uSC, p / .6 + .21, 0.);
  float grit = (g.r + g.a / 255.) * .016 * smoothstep(16., 3., dE) - .02 * smoothstep(.5, .8, vn(p * 1.4 + 5.)) * (1. - tr);
  float st = max(a.r * .17 * sqrt(uW[6].x) * mix(.2, 1., tr) * cl, b.r * .03 * mix(.5, 1., tr) * pb) + grit;
  // snow patches fill the hollows between the stones
  float sm = max(smoothstep(.6 - .5 * uW[0].w, .7 - .5 * uW[0].w, vn(p / 3.1 + 40.) * .7 + vn(p / .9) * .3), smoothstep(.6, .75, uW[0].w));
  // fresh snow and deep winter: a layer between the stones, the tops of the bigger ones through it (it was a raised smooth
  // slab of .17-.22 m, brown on top: the dry season's rare patches keep it)
  float vs = vn(p * 3.7);
  st = max(st, sm * (uW[0].w < 0. ? .17 + .05 * vs : .085 + .1 * max(uW[0].w - .3, 0.) + .03 * vs));
  float ca = cairnH(p);
  float h = max(st, ca);
  // tie-stones and pole footings
  for (int k = 0; k < int(uW[0].x); k++) {
    vec4 P = texelFetch(uPL, ivec2(k, 0), 0);
    float d = length(p - P.xy);
    float rk = P.w < 0. ? .55 : .45;
    if (d < rk + .2) {
      // sunk to a low lumpy heap among the scree (it was a smooth half-egg of .58 m: a made thing from a primitive)
      vec2 lp = (p - P.xy) / rk;
      float bump = (P.w < 0. ? .2 : .14) * pow(max(0., 1. - dot(lp, lp)), .8) * (.45 + .55 * vn(p * 9.));
      h = max(h, bump);
    }
  }
  return h * smoothstep(80., 45., dE);
}
float det(vec2 p, float dE) {
  vec2 q = p / 310.;
  float a = 1. - abs(vn(q) * 2. - 1.), s = a * a * 46.;
  q = mat2(.8, -.6, .6, .8) * q * 2.31; a = 1. - abs(vn(q) * 2. - 1.); s += a * a * 19. * smoothstep(30000., 9000., dE);
  q = mat2(.8, -.6, .6, .8) * q * 2.27; a = 1. - abs(vn(q) * 2. - 1.); s += a * a * 8. * smoothstep(14000., 3000., dE);
  return s;
}
// gullies, rock ribs and ledges at tens of metres on the ridges either side of the pass and the drop in front
float midDet(vec2 p, float dE) {
  vec2 q = p / 95.; mat2 m = mat2(.8, -.6, .6, .8);
  float a = 1. - abs(vnF(q) * 2. - 1.), s = a * a * 23.;
  q = m * q * 2.37; a = 1. - abs(vnF(q) * 2. - 1.); s += a * a * 9.;
  q = m * q * 2.29; a = 1. - abs(vnF(q) * 2. - 1.); s += a * a * 2.4 * smoothstep(2500., 500., dE);
  q = m * q * 2.33; a = 1. - abs(vnF(q) * 2. - 1.); s += a * a * .9 * smoothstep(1200., 250., dE);
  return s - 13.;
}
float H(vec2 p) {
  vec2 dp = p - EYE.xz; float dE = length(dp);
  float h = baseH(p);
  float md = smoothstep(6000., 1800., dE) * max(smoothstep(45., 180., dE) * smoothstep(4., 40., abs(h)), smoothstep(40., 160., abs(p.x)) * smoothstep(1.5, 10., abs(h)));
  if (md > 0.) h += midDet(p, dE) * md;
  float mt = smoothstep(-200., 900., h) * smoothstep(150., 900., dE);
  if (mt > 0.) h += det(p, dE) * mt;
  if (dE < 80.) h += nearDet(p, dE);
  return h - dE * dE * 7.85e-8;
}
#endif
bool inLake(vec2 p) { return length(p - uW[2].xy) < uW[2].z * 1.6; }
#ifdef MARCH
float Hw(vec2 p) { float h = H(p); return inLake(p) ? max(h, uW[2].w - dot(p - EYE.xz, p - EYE.xz) * 7.85e-8) : h; }
float poleHit(vec3 ro, vec3 rd, float tMax, out vec3 nP, out float hy) {
  float best = tMax; nP = vec3(0.); hy = 0.;
  for (int k = 0; k < int(uW[0].x); k++) {
    vec4 P = texelFetch(uPL, ivec2(k, 0), 0);
    if (P.w <= 0.) continue;
    float rad = k == 0 || P.w > 4.3 ? .065 : .048;
    vec2 oc = ro.xz - P.xy; vec2 dd = rd.xz;
    float A = dot(dd, dd), B = dot(oc, dd), C = dot(oc, oc) - rad * rad, D = B * B - A * C;
    if (D > 0. && A > 1e-8) {
      float t = (-B - sqrt(D)) / A;
      float y = ro.y + rd.y * t;
      if (t > 0. && t < best && y > P.z - .6 && y < P.z + P.w) { best = t; nP = vec3((ro.xz + dd * t - P.xy) / rad, 0.).xzy; nP.y = 0.; hy = y - P.z; }
    }
  }
  return best;
}
void mainM() {
  vec2 uv = gl_FragCoord.xy / RES;
  vec3 rd = rayDir(uv), ro = EYE;
  vec3 nP; float hy;
  // looking down (views only, 0 at the opening): normal taps a scree texel apart, so the magnified stones don't show
  // the bilinear texel grid as a woven cross-hatch
  float DN = max(smoothstep(-.35, -.7, FW.y), uW[3].w);
  float tPole = poleHit(ro, rd, 1e9, nP, hy);
  // one loop, one H call site: march, refine, normal taps, then the sun-visibility march
  float t = .05, tp = 0., ta = 0., tb = 0., e = 0., s = 0., vis = 1., h0 = 0., hx = 0., hz = 0.;
  int ph = 0, ri = 0, i3 = 9999;
  bool hit = false, pole = false;
  vec3 P = vec3(0.), Ps = vec3(0.);
  // 600 steps: rays that crawl along the ground (the foot of the side ridges) used to run out at 460 and show sky
  for (int i = 0; i < 600; i++) {
    vec3 q;
    if (ph == 0) {
      q = ro + rd * t;
      if (t > tPole) { pole = true; hit = true; t = tPole; P = ro + rd * t; Ps = P + SUN * .02; s = .012; ph = 3; q = Ps + SUN * s; }
      else if ((q.y > 4700. && rd.y >= 0.) || t > 60000.) break;
    } else if (ph == 1) q = ro + rd * (.5 * (ta + tb));
    else if (ph == 2) q = vec3(P.x + (ri == 1 ? e : 0.), 0., P.z + (ri == 2 ? e : 0.));
    else q = Ps + SUN * s;
    if (ph == 3 && q.y > 4600.) break;
    float hq = Hw(q.xz);
    if (ph == 0) {
      float d = q.y - hq;
      if (d < .0015 * t + .001) { hit = true; ph = 1; ta = tp; tb = t; ri = 0; }
      // rays that skim the plateau use up their steps before they reach the far slopes: they used to be declared a hit
      // in mid-air at step 380 (a band of dark dashes floating on the side ridges); now they stride out instead
      else { tp = t; t += max(d * (t < 60. ? .5 : .42), .003 + t * .0021) * (i > 380 && t > 300. ? 2.2 : 1.); if (i > 520) { hit = true; ph = 1; ta = tp; tb = t; ri = 0; } }
    } else if (ph == 1) {
      if (q.y - hq < 0.) tb = .5 * (ta + tb); else ta = .5 * (ta + tb);
      ri++;
      if (ri == 6) { t = tb; P = ro + rd * t; e = max(.004 + .008 * DN, t * .0011); ph = 2; ri = 0; }
    } else if (ph == 2) {
      if (ri == 0) h0 = hq; else if (ri == 1) hx = hq; else hz = hq;
      ri++;
      if (ri == 3) { vec3 ng = normalize(vec3(h0 - hx, e, h0 - hz)); Ps = P + ng * (.003 + t * .0004); s = max(.012, t * .0007); ph = 3; ri = 0; i3 = i; }
    } else {
      vis = min(vis, clamp((q.y - hq) / (s * .016) + .5, 0., 1.));
      ri++;
      if (vis < .01 || ri >= 56 || (i >= 459 && i3 <= 459)) break;   // a sun march begun before step 460 ends there, as it always has
      s = s * 1.17 + .006;
    }
  }
  // the sky's distance: 6.4e4, under the half float's 65504 (SwiftShader stores an overflowing value, even inf, as NaN:
  // the whole sky went black); every reader only asks 'over 6.2e4 / 5e4' or caps it at 26000, so nothing else changes
  if (!hit) { o = vec4(6.4e4, 0., 0., 0.); return; }
  { vec3 nn; float hy2; if (t < 200. && poleHit(Ps + SUN * .03, SUN, 60., nn, hy2) < 59.) vis *= .1; }
  vec3 gn = pole ? normalize(nP + vec3(0., .05, 0.)) : normalize(vec3(h0 - hx, e, h0 - hz));
  o = vec4(pole ? -t : t, gn.x, gn.z, vis);
}
#else
uniform sampler2D uG, uCA;
void mainS() {
  vec2 uv = gl_FragCoord.xy / RES;
  vec3 rd = rayDir(uv), ro = EYE;
  vec4 gb = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
#ifdef WATER
  // the water pass draws only the lake, over the land pass (a small program, built when a view can see the lake)
  if (gb.r > 6.2e4 || gb.r < 0.) discard;
#endif
#ifdef POLEP
  // the pole pass draws only the poles, over the land pass (a program of its own, so D3D compiles it beside the land)
  if (gb.r >= 0.) discard;
#else
  // one sky() call site: the sky itself on sky pixels, the haze colour on the rest
  vec3 skc = sky(gb.r > 6.2e4 ? rd : normalize(vec3(rd.x, max(rd.y, .0) + .03, rd.z)));
  if (gb.r > 6.2e4) {
    vec3 sk = skc;
    if (uW[4].x > .5) { vec2 q = rd.xz / (max(rd.y, 0.) + .1) * .35 + uW[4].yz; sk *= .88 + .2 * vn(q); }
    o = vec4(sk, 6.4e4); return;
  }
#endif
  bool pole = gb.r < 0.; float t = abs(gb.r), vis = gb.a;
  vec3 P = ro + rd * t, gn = vec3(gb.g, sqrt(max(0., 1. - gb.g * gb.g - gb.b * gb.b)), gb.b);
#ifdef WATER
  float TAP0 = vn(P.xz / 2300. + uW[4].yz), TAP1 = vn(P.xz / 1700.);
#else
  // every value-noise tap of the pole and land shading from one call site (FXC compiles each inlined call again):
  // the arguments first, then one loop
  float hbF = baseH(P.xz);
  vec3 glF = vec3(0.);
#ifdef POLEP
  vec2 A[5];
#else
  vec2 A[33];
#endif
  {
    vec2 pp = P.xz; float dE = length(pp - EYE.xz), alt = P.y;
    A[0] = P.xz / 2300. + uW[4].yz; A[1] = P.xz / 1700.;
#ifdef POLEP
    {
      float an = atan(gn.z / (abs(gn.x) + 1e-4)) + (gn.x < 0. ? 3.1416 : 0.), hy = P.y, hg = hy - hbF;
      A[2] = vec2(an * 5., hy * .7); A[3] = vec2(an * 11., hy * 1.3 + 7.); A[4] = vec2(an * 6., hg * 14.);
    }
#else
    {
      glF = glac(pp);
      vec3 gl = glF; vec2 fd = normalize(gn.xz + 1e-4), cdir = normalize(vec2(-gn.z, gn.x) + 1e-5), bq = pp / (14. + dE * .0015);
      A[2] = pp / 700.; A[3] = pp / 85.; A[4] = pp / 420. + 7.; A[5] = pp / 7.; A[6] = pp / 23.;
      A[7] = vec2(dot(pp, vec2(-fd.y, fd.x)) / 45., alt / 420.); A[8] = pp / 380. + 3.; A[9] = pp / 15.;
      A[10] = pp / (1.3 + dE * .004); A[11] = pp / 800.; A[12] = pp / 70.; A[13] = vec2(dot(pp, cdir) / 9., alt / 160.);
      A[14] = pp / 60.; A[15] = pp / 9.; A[16] = pp / 14.; A[17] = vec2(gl.y / 40., gl.z * 6.); A[18] = pp / 4.; A[19] = pp / 3.;
      A[20] = pp / 4.3 + 11.; A[21] = pp / 2.7 + 23.; A[22] = pp * 2.; A[23] = pp * 31.; A[24] = pp / 1.3 + 3.;
      A[25] = pp * 1.4 + 5.; A[26] = pp / 3.1 + 40.; A[27] = pp / .9; A[28] = pp * 3.7; A[29] = pp * 7.; A[30] = pp * 2.5;
      A[31] = bq; A[32] = bq + 17.;
    }
#endif
  }
#ifdef POLEP
  float v[5];
  for (int k = 0; k < 5 + uZ; k++) v[k] = vn(A[k]);
#else
  float v[33];
  for (int k = 0; k < 33 + uZ; k++) v[k] = vn(A[k]);
#endif
  float TAP0 = v[0], TAP1 = v[1];
#endif
  float cs = max(uW[4].x, uW[4].w);   // cloud shadows on the range: storm light 1, fair cumulus less
  if (cs > .01) vis *= mix(1. - .62 * cs, 1., max(smoothstep(.4, .64, TAP0), smoothstep(300., 80., length(P.xz - EYE.xz))));
  // dawn: the sun lights the range from the top down and has not reached the pass (uC[6].y the lit altitude; far below by day)
  vis *= smoothstep(uC[6].y - 350., uC[6].y + 350., P.y + 600. * TAP1 - 300.);
  vec3 col; float sl;
  if (pole) {
#if defined(WATER) || defined(LAND)
    col = vec3(0.); sl = 0.;   // (the water pass discards pole pixels; the pole pass draws them over the land pass)
#else
    vec3 n = gn; float hy = P.y;
    float an = atan(n.z / (abs(n.x) + 1e-4)) + (n.x < 0. ? 3.1416 : 0.);
    // weathered grey-brown wood: grain running up the pole, dark checks, a little lichen
    float g = v[2], ck = smoothstep(.62, .7, v[3]);
    vec3 alb = vec3(.15, .13, .105) * (.75 + .5 * g) * (1. - .55 * ck) * (uW[5].x > .5 ? 1.8 : 1.);   // the gate's poles: split grey juniper
    // the cairn's pole: its upper part wound with old faded cloth in the five colours, frayed lower edges, cord turns at the head
    float hg = hy - hbF;
    if ((length(P.xz - uW[1].xy) < .3 || uW[5].x > .5) && hg > 3.) {
      float bu = (hg - 3.) * 5.5 + .45 * v[4];
      float bi = floor(bu), bf = fract(bu), cid = mod(bi + floor(uW[3].z * 20.), 5.);
      vec3 cc = cid < .5 ? vec3(.06, .14, .4) : cid < 1.5 ? vec3(.62, .6, .55) : cid < 2.5 ? vec3(.5, .09, .06) : cid < 3.5 ? vec3(.06, .3, .1) : vec3(.6, .45, .1);
      cc = mix(cc, vec3(.42, .4, .36), .35 + .3 * g);
      float cl = step(.18 + .45 * h12(vec2(bi, floor(an * 9.))) * step(.55, h12(vec2(bi + 3., floor(an * 4.)))), bf) * step(hg, 4.45);
      alb = mix(alb * .6, cc, cl);
      alb = mix(alb, vec3(.2, .17, .13), step(4.42, hg) * step(.45, fract(hg * 55. + an * .3)));
    }
    float ndl = max(dot(n, SUN), 0.);
    col = alb * (SUNC * ndl * vis + skyAmb() * .55 + vec3(.12, .1, .08) * uC[11].z);
    sl = ndl * vis;
#endif
  } else {
#ifdef POLEP
    col = vec3(0.); sl = 0.;
#else
    vec2 pp = P.xz;
    float dE = length(pp - EYE.xz);
    vec3 n = gn;
#ifdef WATER
    float hb = baseH(pp);
#else
    float hb = hbF;
#endif
    vec3 alb; float ao = 1., spec = 0.;
#ifdef WATER
    if (inLake(pp) && hb < uW[2].w - .3) {
      n = vec3(0., 1., 0.);
      float wv = vn(pp / 6. + TIME * .0) - .5;
      float cp = .02 + .1 * smoothstep(.45, .75, vn(pp / 90. + vec2(TIME * .0, 3.)));
      n = normalize(vec3(wv * cp, 1., (vn(pp / 4. + 9.) - .5) * cp));
      float cs = max(dot(-rd, n), 0.), F = .02 + .98 * pow(1. - cs, 5.);
      float sh = 0.;
      vec3 wc = mix(vec3(.02, .12, .12), vec3(.04, .22, .22), uW[3].y) * mix(.6, 1., sh);
      if (uW[3].x > .5) {
        float cr = smoothstep(.04, .0, abs(vn(pp / 30.) - .5)) * .5;
        col = vec3(.62, .72, .8) * (1. - cr * .4) * (SUNC * max(dot(n, SUN), 0.) * .8 + skyAmb() * .6);
      } else {
        // open water: depth from the baked bed (a pale silty shelf to deep teal), wind ripples gathered in catspaw
        // patches, and the real far shore and range mirrored (the reflected ray marched against the baked heights)
        float D = max(uW[2].w - hb, 0.), sha = exp(-D / 3.5);
        float paw = smoothstep(.38, .72, vn(pp / 140. + vec2(3.7, 1.1)) * .75 + vn(pp / 37.) * .25);
        vec2 rp = vec2(vn(pp / vec2(2.6, 7.) + 5.), vn(pp / vec2(7., 2.6) + 13.)) - .5 + .45 * (vec2(vn(pp / .9 + 2.), vn(pp / .9 + 7.)) - .5);
        vec3 nw = normalize(vec3(rp.x, 0., rp.y) * (.012 + .075 * paw) + vec3(0., 1., 0.));
        vec3 rr = reflect(rd, nw); rr.y = max(rr.y, .002);
        float Fw = .02 + .98 * pow(1. - clamp(dot(-rd, nw), 0., 1.), 5.);
        vec3 rf = sky(rr);
        float rt = 40.;
        for (int k = 0; k < 15 + uZ; k++) {
          float th = baseH(pp + rr.xz * rt);
          if (P.y + rr.y * rt < th) {
            vec3 ta = mix(vec3(.19, .16, .12) * (.8 + .4 * vn(pp / 9. + rr.xz * rt / 300.)), vec3(.86, .89, .93), smoothstep(uW[0].z - 250., uW[0].z + 300., th));
            vec3 tr = exp(-rt * vec3(5.5e-6, 8.5e-6, 1.6e-5));
            rf = ta * (SUNC * .42 + skyAmb()) * tr + sky(normalize(vec3(rr.x, .03, rr.z))) * (1. - tr);
            break;
          }
          rt *= 1.55;
        }
        vec3 body = wc / mix(.6, 1., sh) * mix(.55, 1.3, sha) + vec3(.08, .07, .05) * sha * sha;
        col = body * (SUNC * .25 + skyAmb()) * (1. - Fw) + rf * Fw + SUNC * 6. * pow(max(dot(rr, SUN), 0.), 300.) * (.4 + paw);
        col = mix(col, vec3(.15, .13, .11) * (SUNC * .3 + skyAmb()), smoothstep(.35, .05, D) * .7);   // the wet margin
      }
      sl = 1.;
    } else discard;
#else
    {
      float sline = uW[0].z;
      float alt = P.y;
      vec3 gl = glF;
      // rock strata: tilted layers of dark gneiss and pale tan limestone
      float strat = vn(vec2((alt + pp.x * .12 - pp.y * .05 + 90. * v[2] + 30. * v[3]) / 26., pp.x / 600.));
      vec3 rock = mix(vec3(.13, .12, .11), vec3(.21, .185, .15), smoothstep(.6, .85, strat) * smoothstep(.75, .45, n.y) * smoothstep(.35, .65, v[4]));
      rock = mix(rock, vec3(.23, .21, .18) * (.8 + .4 * v[5]), smoothstep(.6, .85, n.y) * (1. - smoothstep(500., 1500., alt)) * .7);
      rock *= .75 + .5 * v[6];
      // gullies down the fall line and pale scree fans where the slopes ease at their feet
      if (dE > 600.) {
        vec2 fd = normalize(n.xz + 1e-4);
        rock *= .68 + .6 * v[7];
        float fan = smoothstep(.6, .8, n.y) * smoothstep(.96, .86, n.y) * smoothstep(.35, .62, v[8]) * smoothstep(2200., -400., alt);
        rock = mix(rock, vec3(.27, .255, .23) * (.85 + .3 * v[9]), fan * .75);
      }
      if (dE < 2500.) rock *= .78 + .4 * v[10] * smoothstep(2500., 600., dE) + .2 * smoothstep(600., 2500., dE);
      // snow by altitude and slope, flutes on steep faces
      float sn = smoothstep(sline - 260., sline + 300., alt + 380. * (v[11] - .5) - 260. * smoothstep(1., 6., pp.y / 1000.));
      float stp = smoothstep(.48 + .1 * v[12], .7, n.y + .2 * sn);
      vec2 cdir = normalize(vec2(-n.z, n.x) + 1e-5);
      float flute = smoothstep(.45, .7, v[13]);
      float snow = max(sn * stp, sn * flute * smoothstep(.15, .45, n.y) * .85);
      gl.x = 0.;
      // brown alpine steppe behind and on the low slopes
      vec3 steppe = mix(vec3(.25, .19, .12), vec3(.19, .17, .1), v[14]) * (.8 + .35 * v[15]);
      float stpM = smoothstep(.75, .9, n.y) * smoothstep(250., -50., alt) * smoothstep(200., 1200., pp.y);
      alb = mix(rock, steppe, stpM);
      // moraine grey on the valley floor and the glacier tongue
      vec3 mor = vec3(.22, .21, .2) * (.7 + .5 * v[16]);
      alb = mix(alb, mor, smoothstep(-900., -1250., alt) * (1. - gl.x));
      vec3 ice = mix(vec3(.6, .66, .7), vec3(.32, .31, .3), smoothstep(.15, .05, abs(abs(gl.z) - .35)) * .8);
      ice *= .85 + .2 * smoothstep(.3, .7, v[17]);
      ice = mix(ice, vec3(.27, .26, .25), smoothstep(-5200., -3800., pp.y));
      alb = mix(alb, ice, gl.x);
      alb = mix(alb, vec3(.9, .92, .95) * (.92 + .08 * v[18]), snow);
      // the lake shore: pale silt and wet stones just above the waterline (only round the lake, behind the opening view)
      if (inLake(pp)) alb = mix(alb, vec3(.34, .31, .27) * (.8 + .35 * v[19]), smoothstep(6., .4, P.y - uW[2].w) * .6);
      // the near ground: scree, snow, trail, cairn, mani slabs
      if (dE < 80.) {
        float fn = smoothstep(80., 45., dE);
        vec2 q2 = mat2(.6, .8, -.8, .6) * pp / 1.7 + .37;
        vec4 a = texture(uSC, pp / (5.2 * uW[6].x)), b = texture(uSC, q2);
        a.r += a.a / 255.; b.r += b.a / 255.; a.a = step(.9, fract(a.g * 13.)) * .6; b.a = step(.9, fract(b.g * 13.)) * .6;
        float cl = smoothstep(.42, .78, v[20]), pb = smoothstep(.2, .5, v[21]);
        float tr = smoothstep(.22, .45, abs(pp.x - trailX(pp.y)) + .12 * v[22]);
        vec4 g = texture(uSC, pp / .6 + .21);
        float gh = g.r + g.a / 255.;
        float hA = a.r * .17 * sqrt(uW[6].x) * mix(.2, 1., tr) * cl, hB = b.r * .03 * mix(.5, 1., tr) * pb;
        bool big = hA > hB + .006;
        float tint = big ? a.g : b.g;
        vec3 sc = tint < .35 ? vec3(.25, .24, .225) : tint < .6 ? vec3(.15, .14, .135) : tint < .85 ? vec3(.26, .215, .175) : vec3(.38, .365, .34);
        sc *= (.8 + .4 * v[23]) * uW[5].yzw;   // uW[5].yzw, uW[6].yzw: the ground's stone and grit tints (1 on grey gravel)
        vec4 tt = big ? a : b;
        sc = mix(sc, vec3(.02), tt.a * .7 * step(.5, fract(tint * 7.)));
        sc = mix(sc, vec3(.55, .32, .1), tt.a * .8 * step(fract(tint * 7.), .2));
        float grav = smoothstep(.12, .22, max(a.r * cl, b.r * pb));
        // gravel and grit: small chips of the same rocks, pale tops, dark fines between
        vec3 gc = mix(vec3(.16, .145, .125), vec3(.27, .25, .215), smoothstep(.12, .38, gh)) * (.86 + .28 * g.g) * (.8 + .4 * v[24]) * uW[6].yzw;
        sc = mix(gc, sc, grav);
        ao = mix(.55, 1., tt.b) * mix(.75, 1., grav) * mix(.7, 1., smoothstep(.1, .3, gh));
        // the trodden path: the same grit, dustier, frost left in the boot-worn hollows
        float hol = smoothstep(.5, .8, v[25]) * (1. - tr);
        vec3 tc = gc * vec3(1.08, 1.03, .96) + vec3(.02, .018, .014);
        tc = mix(tc, vec3(.66, .69, .73) * (.85 + .15 * g.g), hol * smoothstep(.3, .1, gh) * smoothstep(.95, -.4, uW[0].w) * .75);
        sc = mix(tc, sc, .3 + .7 * tr);
        float sm = max(smoothstep(.6 - .5 * uW[0].w, .7 - .5 * uW[0].w, v[26] * .7 + v[27] * .3), smoothstep(.6, .75, uW[0].w));
        float snowN = uW[0].w < 0. ? sm * smoothstep(.12, .16, P.y - hb) * smoothstep(.62, .42, v[28] * .45 + max(a.r, b.r) * .55)
          : sm * smoothstep(.012, -.006, max(hA, hB) - .085 - .1 * max(uW[0].w - .3, 0.) - .03 * v[28]);
        vec3 sCol = vec3(.82, .84, .86) * (.9 + .1 * v[29]) - vec3(.08, .1, .12) * smoothstep(.6, .9, v[30]);
        sc = mix(sc, sCol, snowN);
        float ch = cairnH(pp);
        if (ch > .02 && abs(P.y - hb - ch) < .06) { vec4 ca = textureLod(uCA, cairnUV(pp), 0.); sc = ca.rgb; ao = ca.a; }
        alb = mix(alb, sc, fn);
      }
      // little bump detail on the far faces
      if (dE > 300.) {
        vec2 bq = pp / (14. + dE * .0015);
        n = normalize(n + vec3(v[31] - .5, 0., v[32] - .5) * .35 * (1. - snow * .6));
      }
      float ndl = max(dot(n, SUN), 0.);
      vec3 amb = skyAmb() * (.45 + .55 * n.y) * ao * (1. + uC[10].w);   // uC[10].w: more sky light on the ground at dawn and dusk
      vec3 bnc = vec3(.3, .28, .26) * (.5 - .5 * n.y) * .5 * uC[11].z + (dE > 300. ? vec3(.35, .38, .42) * .25 * (1. - n.y) : vec3(0.));
      col = alb * (SUNC * ndl * vis + amb + bnc);
      // snow forward sheen
      col += snow * SUNC * .08 * pow(max(dot(reflect(rd, n), SUN), 0.), 12.) * vis;
      sl = ndl * vis;
    }
#endif
    // thin air, but the valley holds a little blue haze: the far slopes step back in value
    vec3 tr = exp(-t * vec3(1.1e-5, 1.6e-5, 2.7e-5));
    vec3 hzc = skc;
    col = col * tr + hzc * (1. - tr);
#endif
  }
  o = vec4(col, sl > .06 ? t : -t);
}
#endif
void main() {
#ifdef MARCH
  mainM();
#else
  mainS();
#endif
}
`,na=Y+`#define MARCH
`+it,ra=Y+`#define LAND
`+it,ca=Y+`#define POLEP
`+it,uo=Y+`
uniform sampler2D uP, uQ, uFI, uST, uGU;
uniform sampler3D uN3;
uniform vec4 uS[7];
out vec4 o;
vec3 P(ivec2 c) { return texelFetch(uP, c, 0).xyz; }
vec3 strPt(int s, float u) {
  vec4 m = texelFetch(uST, ivec2(31, s), 0);
  float f = clamp(u / m.x, 0., m.y - 1.001);
  int i = int(f); float w = f - float(i);
  return mix(texelFetch(uST, ivec2(i, s), 0).xyz, texelFetch(uST, ivec2(i + 1, s), 0).xyz, w);
}
float tapG(vec4 T, int s, float u, float tm) {
  float age = tm - T.z;
  if (T.x < -.5 || int(T.x + .5) != s || age < 0. || age > 5.) return 0.;
  float a = abs(u - T.y) - age * 9.;
  return T.w * exp(-a * a / 5.) * exp(-age * .5) * smoothstep(0., .05, age);
}
float n3(vec3 p) { return textureLod(uN3, p, 0.).r; }
vec3 windAt(vec3 p, int s, float u) {
  float tm = uS[0].z, U = uS[1].z;
  vec2 wd = uS[1].xy;
  float g = texture(uGU, (p.xz - uS[2].zw) / uS[3].x + .5).r * 2.;
  float tg = tapG(uS[4], s, u, tm) + tapG(uS[5], s, u, tm) + tapG(uS[6], s, u, tm);
  g += tg;
  vec3 w = vec3(wd.x * g, .5 * tg, wd.y * g) * U;
  vec3 q = (p - vec3(wd.x, 0., wd.y) * U * tm * .9) * .55;
  vec3 tb = vec3(n3(q * .5 + vec3(0., tm * .35, 0.)), n3(q * .5 + vec3(.52, .13, tm * .35)), n3(q * .5 + vec3(tm * .35, .77, .21))) - .5;
  tb += .5 * (vec3(n3(q * 1.7 + vec3(.3, tm * .9, .1)), n3(q * 1.7 + vec3(.6, .2, tm * .9)), n3(q * 1.7 + vec3(tm * .9, .4, .8))) - .5);
  w += tb * vec3(1.6, 1.1, 1.6) * U * max(g, .4) * uS[1].w;
  return w;
}
`+kt+`
float gnd(vec2 p) { return passH(p); }
void main() {
  ivec2 pc = ivec2(gl_FragCoord.xy);
  int bx = pc.x / ${se}, i = pc.x - bx * ${se}, by = pc.y / ${ne}, j = pc.y - by * ${ne};
  int f = by * ${qe} + bx;
  if (float(f) >= uS[0].w) { o = vec4(0.); return; }
  vec4 info = texelFetch(uFI, ivec2(f % 32, f / 32), 0);
  int s = int(info.x + .5);
  float dx = uS[2].x * info.w, dy = uS[2].y * info.w;
  float u = info.y + float(i) * dx;
  vec3 top = strPt(s, u);
  if (j == 0) { o = vec4(top, 1.); return; }
  ivec2 base = ivec2(bx * ${se}, by * ${ne});
  vec3 x = P(pc);
  float dt = uS[0].y;
  if (uS[0].x < .5) {
    vec3 xp = texelFetch(uQ, pc, 0).xyz;
    vec3 v = (x - xp) / dt;
    vec3 ex = P(base + ivec2(min(i + 1, ${se-1}), j)) - P(base + ivec2(max(i - 1, 0), j));
    vec3 ey = P(base + ivec2(i, min(j + 1, ${ne-1}))) - P(base + ivec2(i, j - 1));
    vec3 n = cross(ex, ey); float ln = length(n); n = ln > 1e-9 ? n / ln : vec3(0., 0., 1.);
    vec3 W = windAt(x, s, u);
    // the wind meets each flag a little differently: its yaw wanders along the cord (eddies off the flags upwind),
    // and each flag's cotton catches it differently, so neighbours swing out to different angles and gravity wins
    // on the slack ones: they hang from the cord and lift, instead of all standing out like vanes
    float hf = fract(info.z * .6180339), tw = .55 * sin(info.y * 1.7 + float(s) * 2.3 + uS[0].z * .23) + (hf - .5) * .9;
    float cs = cos(tw), sn = sin(tw);
    W.xz = mat2(cs, sn, -sn, cs) * W.xz;
    W.y -= .12 * length(W.xz);
    vec3 vr = W - v;
    float vn = dot(vr, n);
    float cd = (1.3 + 1.5 * hf) / max(uS[1].z, 1.);
    v += n * vn * (1. - exp(-cd * abs(vn) * dt));
    vec3 vt = vr - n * vn;
    v += vt * (1. - exp(-.35 * length(vt) * dt));
    v.y -= 9.81 * dt;
    v *= .9985;
    x += v * dt;
  } else {
    vec3 acc = vec3(0.); float cnt = 0.;
    for (int k = 0; k < 12; k++) {
      ivec2 off = k == 0 ? ivec2(1, 0) : k == 1 ? ivec2(-1, 0) : k == 2 ? ivec2(0, 1) : k == 3 ? ivec2(0, -1)
        : k == 4 ? ivec2(1, 1) : k == 5 ? ivec2(-1, 1) : k == 6 ? ivec2(1, -1) : k == 7 ? ivec2(-1, -1)
        : k == 8 ? ivec2(2, 0) : k == 9 ? ivec2(-2, 0) : k == 10 ? ivec2(0, 2) : ivec2(0, -2);
      int ii = i + off.x, jj = j + off.y;
      if (ii >= 0 && ii < ${se} && jj >= 0 && jj < ${ne}) {
        vec3 y = P(base + ivec2(ii, jj));
        vec3 d = x - y; float L = length(d);
        float r = length(vec2(off) * vec2(dx, dy));
        float st = k < 4 ? 1. : k < 8 ? .5 : .12;
        float wg = jj == 0 ? 1. : .5;
        acc -= d / max(L, 1e-6) * (L - r) * wg * st;
        cnt += st;
      }
    }
    x += acc * 1.7 / max(cnt, 1.);
    // tether to the sleeve above (long-range attachment)
    vec3 dT = x - top; float lT = length(dT), mT = float(j) * dy * 1.015;
    if (lT > mT) x = top + dT * (mT / lT);
    x.y = max(x.y, gnd(x.xz) + .05);
  }
  o = vec4(x, 1.);
}
`,vo=Y+We+`
uniform sampler2D uP, uFI;
uniform vec4 uMode;     // x: 1 shadow pass; yzw shadow map centre xz, half extent;
uniform vec2 uSR;       // shadow param range
in float aF;
out vec2 vUV; out vec3 vW, vN; out float vD; flat out vec4 vI;
// the particle sheet is drawn ${Qe}x finer: positions interpolated between particles, plus the cloth's own small
// motion the 8 x 9 sheet can't carry (a wave running out along the free edge, one or two creases drifting across)
vec3 gP(ivec2 c) { return texelFetch(uP, c, 0).xyz; }
vec3 sheet(ivec2 base, vec2 g) {
  vec2 c = clamp(floor(g), vec2(0.), vec2(${se-2}., ${ne-2}.)), w = g - c; ivec2 ic = base + ivec2(c);
  return mix(mix(gP(ic), gP(ic + ivec2(1, 0)), w.x), mix(gP(ic + ivec2(0, 1)), gP(ic + ivec2(1, 1)), w.x), w.y);
}
float wob(vec2 uv, float sd, float t) {
  float h1 = fract(sd * .731), h2 = fract(sd * 1.37 + .2), h3 = fract(sd * 2.19 + .5), fy = uv.y;
  float env = fy * (.3 + .7 * fy);
  float gust = .65 + .35 * sin(t * (.5 + .4 * h2) + h1 * 9.);
  float tw = sin(6.2832 * ((1. + .8 * h1) * uv.x + .7 * fy) - (6. + 5. * h2) * t + h3 * 6.28)
           + .45 * sin(6.2832 * ((2.1 + h3) * uv.x - .4 * fy) - (9. + 4. * h1) * t + h2 * 6.28) * fy;
  float c1 = .25 + .5 * h2 + .1 * sin(t * (.5 + .5 * h3) + h1 * 6.), c2 = fract(c1 + .4 + .2 * h1);
  float d1 = uv.x - c1 - (fy - .5) * (h3 - .5) * .5, d2 = uv.x - c2 + (fy - .5) * (h1 - .5) * .4;
  float fold = exp(-sqrt(d1 * d1 + 4e-4) / .09) * (.8 + .4 * sin(t * 1.3 + h2 * 5.))
             - step(.45, h3) * .8 * exp(-sqrt(d2 * d2 + 4e-4) / .07);
  return (.09 * tw * env * gust + .12 * fold * (.3 + .7 * fy)) * (.6 + .8 * h1);
}
// the big shape the 8 x 9 sheet is too coarse to hold: the cloth bellied out by the wind (most at the free edge, held
// flat at the sewn hem), and a twist of the free edge against the hem that wanders along the cord, so no two flags
// face the same way; the light then follows the bent surface
float billow(vec2 uv, float sd, float u0, float t) {
  float h1 = fract(sd * .4142), h2 = fract(sd * .8763 + .3), fy = uv.y;
  float bel = (.16 + .14 * h1) * sin(3.1416 * clamp(uv.x * .9 + .05, 0., 1.)) * fy * (1.25 - .45 * fy) * (.8 + .25 * sin(t * (1.1 + h2) + h1 * 6.));
  float tws = (.5 * sin(u0 * 2.3 + sd * 1.7) + (h2 - .5)) * (.9 + .15 * sin(t * .7 + h1 * 9.));
  return bel + tws * (uv.x - .5) * fy * fy * 1.1;
}
void main() {
  int f = int(aF + .5);
  int q = gl_VertexID / 6, k = gl_VertexID - q * 6;
  int qi = q % ${(se-1)*Qe}, qj = q / ${(se-1)*Qe};
  int ox = (k == 1 || k == 3 || k == 4) ? 1 : 0, oy = (k == 2 || k == 4 || k == 5) ? 1 : 0;
  ivec2 base = ivec2((f % ${qe}) * ${se}, (f / ${qe}) * ${ne});
  vI = texelFetch(uFI, ivec2(f % 32, f / 32), 0);
  vec2 g = vec2(qi + ox, qj + oy) / ${Qe}.;
  const vec2 GN = vec2(${se-1}., ${ne-1}.);
  vec3 t0 = gP(base), t1 = gP(base + ivec2(${se-1}, 0)), b0 = gP(base + ivec2(0, ${ne-1})), b1 = gP(base + ivec2(${se-1}, ${ne-1}));
  float W = length(t1 - t0);
  vec3 N0 = normalize(cross(t1 - t0, (b0 + b1 - t0 - t1) * .5) + 1e-7);
  float sd = vI.z, tm = TIME;
  const float e = .35;
  vec2 gx0 = vec2(max(g.x - e, 0.), g.y), gx1 = vec2(min(g.x + e, GN.x), g.y), gy0 = vec2(g.x, max(g.y - e, 0.)), gy1 = vec2(g.x, min(g.y + e, GN.y));
  float u0 = vI.y;
  float wb = wob(g / GN, sd, tm), w0 = wb + billow(g / GN, sd, u0, tm);
  vec3 p = sheet(base, g) + N0 * W * w0;
  vD = wb * sign(dot(N0, EYE - p)) * 9.;
  vec3 ex = sheet(base, gx1) + N0 * W * (wob(gx1 / GN, sd, tm) + billow(gx1 / GN, sd, u0, tm)) - sheet(base, gx0) - N0 * W * (wob(gx0 / GN, sd, tm) + billow(gx0 / GN, sd, u0, tm));
  vec3 ey = sheet(base, gy1) + N0 * W * (wob(gy1 / GN, sd, tm) + billow(gy1 / GN, sd, u0, tm)) - sheet(base, gy0) - N0 * W * (wob(gy0 / GN, sd, tm) + billow(gy0 / GN, sd, u0, tm));
  vN = normalize(cross(ex, ey) + 1e-7);
  vW = p;
  vUV = g / GN;
  if (uMode.x > .5) {
    float s = p.y / SUN.y;
    vec2 gg = (p.xz - SUN.xz * s - uMode.yz) / uMode.w;
    gl_Position = vec4(gg, (1. - (s - uSR.x) / (uSR.y - uSR.x)) * 2. - 1., 1.);
  } else {
    vec3 r = p - EYE;
    float zv = dot(r, FW);
    const float n = .03, fa = 2e5;
    gl_Position = vec4(dot(r, RT) / TANH, dot(r, UPV) / TANH, zv * (fa + n) / (fa - n) - 2. * fa * n / (fa - n), zv);
  }
}
`,mo=`
float fvn(vec2 x) { vec2 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f); float a = h12(i), b = h12(i + vec2(1, 0)), c = h12(i + vec2(0, 1)), d = h12(i + vec2(1, 1)); return mix(mix(a, b, f.x), mix(c, d, f.x), f.y); }
// the age of the cloth: the mint's, or the string's own (seed + 2000 new, + 3000 tattered, + 4000 faded: mixed ages)
float fAge(float s) { return s >= 2000. ? (s >= 4000. ? .6 : s >= 3000. ? .82 : .04) : uFL[0].x; }
float flagAlpha(vec2 uv, vec4 I, out float edge) {
  // each flag wears its own way: some still whole with a fine fringe, some shredded into ribbons, some with one big
  // rip up from the free edge, some ragged; holes only on the old ones. edge: signed distance (uv) to the free edge
  float seed = I.z, A0 = fAge(I.z), age = clamp(fract(I.z * 7.13) * .25 + A0, 0., 1.);
  float hk = h12(vec2(seed * 3.3, 1.7)), ht = h12(vec2(seed, 9.1)), hd = h12(vec2(seed, 2.3));
  float wear = clamp(A0 + (hk - .5) * .9, 0., 1.);
  float dep = .35 + .9 * wear;
  // a flag stays one sheet: a rip is a narrow slit off the middle, at most a fifth of the way up, ribbons half of it (a third
  // on a large 45-60 cm cloth), so no flag seen close splits into two hanging halves (they read as a pair of trousers)
  float lg = smoothstep(1.25, 1.9, I.w);
  float rag = fvn(vec2(uv.x * 9. + seed * 31., seed)) - .5;
  float cut = 1. - (.015 + .06 * wear) * (.6 + .8 * fvn(vec2(uv.x * 4. + seed * 7., 3.))) - .03 * rag * wear;
  float d = cut - uv.y;
  if (ht < .28) {
    d = 1. - (.006 + .012 * wear) - uv.y;   // nearly whole
  } else if (ht < .62) {
    // shredded into ribbons of uneven length, narrow gaps between them
    float N = floor(4. + 6. * hd), sx = uv.x * N, si = floor(sx), fx = fract(sx);
    float rt = max(1. - dep * (.18 + .3 * hd), 1. - mix(.5, .34, lg));
    float ln = 1. - (.02 + dep * (.05 + .4 * h12(vec2(si, seed * 5.))));
    float gap = .07 + .14 * h12(vec2(si + 3., seed));
    float wid = (.5 - gap - abs(fx - .5 + .08 * sin(uv.y * 9. + si))) / N;
    d = min(ln - uv.y, uv.y > rt ? wid : 1.);
    d = max(d, min(rt - uv.y, 1.));
  } else if (ht < .84) {
    // one big rip up from the free edge, opening into a wedge
    float x0 = hd < .5 ? .14 + .3 * hd : .56 + .3 * hd, y1 = max(1. - dep * (.3 + .35 * hk), 1. - mix(.2, .18, lg));
    float dy = uv.y - y1, sk = (hd - .5) * .6;
    float wd = abs(uv.x - x0 - dy * sk) - max(dy, 0.) * .012 + .03 * wear - .006 - .01 * rag;
    d = min(d, dy > 0. ? wd : -dy + max(wd, 0.));
  } else {
    d = 1. - dep * (.05 + .22 * fvn(vec2(uv.x * 6. + seed * 31., seed))) - .04 * rag - uv.y;
  }
  // loose threads hanging past the free edge
  float th = h12(vec2(floor(uv.x * 110.), seed + 1.));
  float tlen = (.01 + .06 * wear) * th * step(.5, th);
  float a = 1.;
  if (d < 0. && d > -tlen) { a = .7; d = .001; }
  float sideW = .006 + .025 * wear;
  float sd = min(uv.x, 1. - uv.x);
  a *= smoothstep(0., .015, sd + .02 - sideW * fvn(vec2(uv.y * 30., seed * 9.)) * step(.1, uv.y));
  // holes: only on the old flags, a few irregular ones with ragged rims
  if (wear > .5 && h12(vec2(seed, 4.4)) < .65) {
    for (int k = 0; k < 3; k++) {
      vec2 c = vec2(.2 + .6 * h12(vec2(seed, float(k) + 11.)), .25 + .5 * h12(vec2(seed, float(k) + 21.)));
      float r = (.025 + .04 * h12(vec2(seed, float(k) + 31.))) * smoothstep(.5, .9, wear) * (1. - .3 * lg) * step(float(k) * .3, h12(vec2(seed, 41.)));
      vec2 dv = (uv - c) * vec2(1.2, 1.);
      float dh = length(dv) - r * (.55 + .9 * fvn(dv * 22. + seed * 3. + float(k)) );
      d = min(d, dh > 0. ? 1. : dh);
    }
  }
  edge = d;
  return a;
}
`,go=Y+We+`
uniform vec4 uFL[3];
in vec2 vUV; in vec3 vW, vN; in float vD; flat in vec4 vI;
out vec4 o;
`+mo+`
void main() { float e; if (flagAlpha(vUV, vI, e) < .5 || e < 0.) discard; o = vec4(1.); }
`,xo=Y+We+fo+`
uniform vec4 uFL[3];
in vec2 vUV; in vec3 vW, vN; in float vD; flat in vec4 vI;
out vec4 o;
`+mo+`
float ink(vec2 uv, float seed) {
  vec2 p = uv - .5; p.x *= .8;
  float fr = max(abs(p.x) / .4, abs(p.y) / .45);
  float m = smoothstep(.035, .012, abs(fr - .9)) * .8;
  vec2 c = p - vec2(0., .02);
  float blob = length(c * vec2(1., 1.2)) + .05 * (fvn(c * 18. + seed * 9.) - .5);
  float fig = smoothstep(.17, .155, blob) * (1. - .7 * smoothstep(.5, .6, fvn(c * 46. + seed)) * smoothstep(.12, .05, blob));
  fig = max(fig, smoothstep(.02, .008, abs(blob - .2)) * .8);
  m = max(m, fig);
  float ry = (p.y + .5) * 15., row = fract(ry);
  float rows = step(.24, abs(p.y)) * step(abs(p.y), .37) * step(abs(p.x), .3);
  float mk = step(.5, fvn(vec2(p.x * 70., floor(ry) * 7.3 + seed * 3.))) * smoothstep(.2, .35, row) * smoothstep(.8, .65, row);
  m = max(m, rows * mk * .85);
  float crn = smoothstep(.012, .004, abs(length(abs(p) - vec2(.28, .36)) - .035));
  m = max(m, crn * .7);
  m *= .55 + .45 * smoothstep(.25, .6, fvn(uv * 60. + seed * 4.));
  return m;
}
void main() {
  float edge;
  float a = flagAlpha(vUV, vI, edge);
  float fw = (fwidth(vUV.x) + fwidth(vUV.y)) * .9;
  a *= smoothstep(0., fw, edge);
  if (a < .02) discard;
  float seed = vI.z, age = clamp(fract(seed * 7.13) * .25 + fAge(seed), 0., 1.);
  int ci = int(mod(floor(seed + .5), 5.));
  vec3 base = ci == 0 ? vec3(.06, .2, .58) : ci == 1 ? vec3(.84, .83, .78) : ci == 2 ? vec3(.66, .09, .06) : ci == 3 ? vec3(.07, .4, .15) : vec3(.86, .64, .1);
  if (seed >= 1000. && seed < 2000.) base = vec3(.84, .83, .78) * (.94 + .08 * fract(seed * .37));   // white strings (seed + 1000)
  // sun bleaching: strongest at the free, wind-whipped edge and in streaks along the weave, uneven flag to flag
  float own = .75 + .5 * fract(seed * 3.71);
  float streak = fvn(vec2(vUV.x * 22. + seed * 7., vUV.y * 2.)) * .6 + fvn(vUV * vec2(5., 3.) + seed) * .4;
  float fade = age * own * (.75 + .55 * vUV.y) * (.55 + .6 * streak);
  float lum = dot(base, vec3(.3, .55, .15));
  vec3 faded = mix(vec3(lum), base, .42) * .72 + vec3(.25, .235, .2);
  base = mix(base, faded, clamp(fade, 0., .92));
  // grime and dust at the string hem, a darker water line where the cotton is folded over the cord
  base *= 1. - age * (.22 * smoothstep(.16, 0., vUV.y) + .1 * smoothstep(.05, .0, abs(vUV.y - .07)));
  // the cotton weave: fine warp/weft threads and slubs
  float wv = fvn(vUV * vec2(140., 170.) + seed), th = abs(fract(vUV.x * 90.) - .5) * abs(fract(vUV.y * 80.) - .5);
  base *= (.9 + .12 * wv) * (.95 + .2 * th);
  float im = ink(vUV, seed) * uFL[2].x * (1. - .45 * age);
  vec3 V = normalize(EYE - vW);
  vec3 n = normalize(vN);
  float nv = dot(n, V);
  n = nv < 0. ? -n : n;
  vec2 cr = vec2(fvn(vUV * vec2(26., 18.) + seed), fvn(vUV * vec2(26., 18.) + seed + 9.)) - .5;
  vec3 tg = normalize(cross(n, vec3(0., 1., 0.)) + 1e-5);
  n = normalize(n + (tg * cr.x + cross(n, tg) * cr.y) * .14);
  float nl = dot(n, SUN);
  float sh = flagShadow(vW, .004) * .6;
  vec3 alb = base * (1. - .7 * im);
  vec3 amb = skyAmb() * (.5 + .3 * n.y) + vec3(.16, .14, .12) * (.4 - .3 * n.y) * uC[11].z;
  vec3 col;
  // thin cotton: some sunlight always passes through (the far side is lit too), the threads' gaps glow brighter
  vec3 tr = (base * base * 1.1 + base * .35) * (1. - .6 * im - .25 * im * im) * (.85 + .3 * (1. - wv));
  float vs = max(dot(-V, SUN), 0.);
  if (nl > 0.) col = alb * (SUNC * nl * (1. - sh) + amb) + tr * skyAmb() * .55;
  else col = alb * amb * .75 + tr * SUNC * (pow(-nl, .6) * .6 + pow(vs, 3.) * .9 + pow(vs, 20.) * .6) * (1. - sh) + tr * skyAmb() * .7;
  col += SUNC * .03 * pow(1. - abs(nv), 4.) * (1. - sh);
  // the folds: hollows turned away from the eye sit in their own shade, the crests catch more sky
  col *= .86 + .18 * smoothstep(-1., 1., vD);
  float dist = length(vW - EYE);
  float Tf = exp(-uFL[0].y * dist);
  col = col * Tf + uFL[1].rgb * (1. - Tf);
  o = vec4(tone(col) * a, a);
}
`,ia=Y+We+`
uniform sampler2D uST;
uniform vec4 uSD;   // res, nodes per string, -, -
out float vA; out vec3 vWp;
vec4 proj(vec3 p) { vec3 r = p - EYE; float zv = dot(r, FW); const float n = .03, fa = 2e5; return vec4(dot(r, RT) / TANH, dot(r, UPV) / TANH, zv * (fa + n) / (fa - n) - 2. * fa * n / (fa - n), zv); }
void main() {
  int seg = gl_InstanceID, s = seg / ${j-1}, k = seg - s * ${j-1};
  int v = gl_VertexID;
  vec3 a = texelFetch(uST, ivec2(k, s), 0).xyz, b = texelFetch(uST, ivec2(k + 1, s), 0).xyz;
  vec4 ca = proj(a), cb = proj(b);
  if (ca.w < .06 || cb.w < .06) { gl_Position = vec4(2., 2., 2., 1.); vA = 0.; return; }
  vec2 sa = ca.xy / ca.w, sb = cb.xy / cb.w, dd = normalize(sb - sa + 1e-6), nn = vec2(-dd.y, dd.x);
  vec4 P = (v == 1 || v == 3) ? cb : ca;
  float side = v >= 2 ? 1. : -1.;
  float px = .006 / (P.w * TANH) * uSD.x * .5;
  float wpx = max(px, .9);
  P.xy += nn * side * wpx / uSD.x * 2. * P.w * .5;
  vA = min(1., px / .9);
  vWp = (v == 1 || v == 3) ? b : a;
  gl_Position = P;
}
`,la=Y+We+`
uniform vec4 uFL[3];
in float vA; in vec3 vWp;
out vec4 o;
void main() {
  vec3 col = vec3(.2, .18, .15) * (SUNC * .5 + skyAmb() * .6);
  float Tf = exp(-uFL[0].y * length(vWp - EYE));
  col = col * Tf + uFL[1].rgb * (1. - Tf);
  float a = vA * .9;
  o = vec4(tone(col) * a, a);
}
`,bo=Y+We+kt+`
uniform sampler2D uSc;
uniform sampler3D uN3;
uniform vec4 uF[3];
out vec4 o;
float n3(vec3 p) { return textureLod(uN3, p, 0.).r; }
float hg(float c, float g) { float g2 = g * g; return (1. - g2) / pow(1. + g2 - 2. * g * c, 1.5); }
#define WD uF[1].xy
#define TM uF[0].z
// the bank's top: rounded heads with creases between them (billow noise), boiling and drifting downwind
float topAt(vec2 xz) {
  vec2 q = xz - WD * TM * uF[1].z * .3;
  float b1 = abs(n3(vec3(q / 2900., TM * .006)) * 2. - 1.);
  float b2 = abs(n3(vec3(q / 1000. + .37, TM * .013 + .5)) * 2. - 1.);
  float b3 = abs(n3(vec3(q / 340. + .71, TM * .03 + .2)) * 2. - 1.);
  return uF[0].x + (1240. * b1 * b1 + 260. * b2 + 90. * b3 - 120.) * (1. - uF[2].z);   // uF[2].z: the cloud sea's flat top
}
float dens(vec3 p, float t, float top, out float dTop) {
  dTop = top - p.y;
  vec3 fw = vec3(WD.x, 0., WD.y) * TM * uF[1].z;
  vec3 q = p - fw * .3 - vec3(0., TM * 5., 0.);
  float e = ((n3(q / 170.) - .5) * 130. + (n3(q / 55. + .3) - .5) * 45.) * (1. - uF[2].z);   // (seen edge-on, 55-170 m lumps on the sea's top drew vertical streaks)
  float d = smoothstep(0., 30. + t * .012, dTop + e) * (.3 + .7 * smoothstep(0., 280., dTop));
  float holes = mix(smoothstep(.28, .55, n3(q / 950. + vec3(.2, .6, .1))), 1., uF[2].z);   // the cloud sea: one unbroken floor
  // a ground-hugging tongue pouring over the pass and racing downwind past you
  vec3 qf = p - fw * 1.05;
  float hug = smoothstep(0., 22., passH(p.xz) + 16. + 55. * n3(qf / 75.) - p.y) * smoothstep(.36, .62, n3(qf / 130. + .5)) * smoothstep(700., 200., length(p.xz)) * uF[2].x;
  float near = mix(.3, 1., smoothstep(.3, .62, n3(qf / 150. + vec3(.1, .3, .7))));
  // inside the bank at the pass: the same near mist the flags fade in (uF[2].y), patchy, so the nearest flags, the cairn
  // and the ground stay faint shapes instead of the cloud being a wall behind a clear foreground
  float inside = uF[2].y * smoothstep(-10., 25., dTop) * smoothstep(500., 150., length(p.xz - EYE.xz)) * (.6 + .8 * n3(qf / 45. + .2));
  return max(d * mix(.15, 1., holes) * near, hug) * uF[0].y * .014 + inside;
}
void main() {
  vec2 fc = gl_FragCoord.xy, uv = fc / uF[0].w;
  vec3 d = rayDir(uv);
  float tS = abs(textureLod(uSc, uv, 0.).a);
  float yTop = uF[0].x + 760. * (1. - uF[2].z) + 100. * uF[2].z;
  vec3 o0 = EYE;
  float t0 = 0., t1 = min(tS, 26000.);
  if (o0.y > yTop) { if (d.y >= 0.) { o = vec4(0., 0., 0., 1.); return; } t0 = (yTop - o0.y) / d.y; }
  else if (d.y > 0.) t1 = min(t1, (yTop - o0.y) / d.y);
  if (t1 <= t0) { o = vec4(0., 0., 0., 1.); return; }
  float jit = fract(52.9829189 * fract(dot(fc, vec2(.06711056, .00583715))));
  vec3 L = SUN; float mu = dot(d, L), Ly = max(L.y, .15);
  float ph = .55 * hg(mu, .65) + .45 * hg(mu, -.2);
  vec3 E = vec3(0.); float T = 1.;
  float span = t1 - t0, k = clamp(log(span / 12.), 1., 6.5), eK = exp(k) - 1.;
  float prev = t0, ts = t0 + jit * 20.;
  // the cloud sea is seen nearly edge-on: the fixed schedule met its top in steps of 500 m or more and every pixel drew
  // its own surface (vertical streaks). There the march jumps to just above the top, then goes in even steps through it
  bool seaM = uF[2].z > 0.;
  for (int i = 1; i <= 52; i++) {
    float t = seaM ? ts : t0 + span * (exp(k * (float(i) - jit) / 52.) - 1.) / eK;
    if (t > t1) break;
    vec3 p = o0 + d * t;
    float top = topAt(p.xz);
    float stp = clamp((p.y - top - 70.) / max(-d.y, .002) * .7, 25. + t * .02, 1500.);
    float dt = seaM ? min(stp, t1 - t) : t - prev; prev = t; ts = t + stp;
    if (p.y > top + 95. && p.y > 110.) continue;
    float dTop, sg = dens(p, t, top, dTop);
    if (sg > 1e-5) {
      // sun: the path up to the billowed top toward the sun (lee sides of the heads sit in their neighbours' shade)
      float dd = max(dTop, 0.);
      float lenS = max(topAt(p.xz + L.xz / Ly * (dd + 50.)) - p.y, 0.) / Ly;
      lenS = mix(lenS, dd / Ly, .3 + .5 * smoothstep(0., 30., -p.y + top) * step(t, 400.));
      float Ts = .72 * exp(-.016 * lenS) + .28 * exp(-.0028 * lenS);
      vec3 amb = skyAmb() * vec3(.95, .9, .81) * (.55 + 1.1 * exp(-dd / 200.)) + vec3(.04, .036, .03) * skyAmb().b / .26;   // the hour's sky light
      vec3 Lc = SUNC * Ts * ph * smoothstep(uC[6].y - 350., uC[6].y + 350., p.y) + amb;   // dawn: the sea still in shade
      float Tst = exp(-sg * dt);
      vec3 tr = exp(-t * vec3(5.5e-6, 8.5e-6, 1.6e-5) * (1. + 2.5 * uF[2].z));   // the far sea goes into the haze
      E += T * (1. - Tst) * (Lc * tr + sky(normalize(vec3(d.x, .03, d.z))) * (1. - tr));
      T *= Tst;
      if (T < .01) break;
    }
  }
  o = vec4(E, T);
}
`,yo=Y+We+fo+`
uniform sampler2D uSc, uFg, uCl;
uniform sampler3D uN3;
uniform vec4 uK[5];
out vec4 o;
float n3(vec3 p) { return textureLod(uN3, p, 0.).r; }
vec4 plume(vec3 ro, vec3 rd, float tS) {
  // a banner cloud on the summit's lee: blown snow and condensation streaming downwind in long smooth veils, densest at
  // the ridge, thinning and fraying into soft fibres downwind, the sky through its tail. Taken in closed form: the column
  // through a soft round section at the ray's closest pass by the axis, the veils a noise in the plume's own (along,
  // across) plane, so every pixel reads a smooth field (the 14-step march through 16 m noise was a field of speckle)
  vec3 S = uK[1].xyz - vec3(0., 70., 0.); vec3 ax = normalize(vec3(uK[2].x, -.07, uK[2].y)); float Lp = uK[2].z;
  vec3 w0 = ro - S; float b = dot(rd, ax), dd = dot(rd, w0), e = dot(ax, w0), den = max(1. - b * b, .05);
  float s = (e - b * dd) / den, tr = (b * e - dd) / den;
  vec3 off = ro + rd * tr - S - ax * s;
  float R = 190. + .24 * max(s, 0.);
  vec3 nv = normalize(cross(ax, rd) + 1e-6);
  float co = mix(.6, 1.3, nv.y * nv.y), v = dot(off, nv);
  float along = smoothstep(-160., 60., s) * smoothstep(Lp, Lp * .45, s);
  if (along * exp(-v * v * co / (R * R)) < 1e-3 || tr < 0.) return vec4(0.);
  float core = exp(-max(s, 0.) / (Lp * .3));
  // the veils: long along the wind, a few across the section, bent a little, streaming and slowly changing
  float tm = uK[2].w, U = (s - tm * 45.) / 8000.;
  // the strands widen slower than the plume, so it frays into more and finer fibres downwind; they wave a little
  float vb = v / (130. + .16 * max(s, 0.)) + .55 * sin(U * 2.9 + 1.3) + .3 * sin(U * 6.7 + tm * .02);
  float vl = n3(vec3(U, vb * .5, .13 + tm * .0017)) * .6 + n3(vec3(U * 2. + .37, vb * .9 + .5, .71 + tm * .0023)) * .4;
  float thr = .43 + .15 * (1. - core);
  float fib = smoothstep(thr - .04, thr + .14 + .14 * (1. - core), vl);
  float rad = exp(-v * v * co / (R * R) * (1. + .6 * (1. - core)));
  float col = rad * along * (.6 * core + (.25 + .75 * core) * fib) * R * 1.77 / sqrt(den * co) * .0025 * (.5 + 1.3 * core) * uK[1].w;
  col *= smoothstep(tr - R, tr + R, tS);   // the part behind the ridge or the flags is hidden
  float a = 1. - exp(-col);
  float lf = smoothstep(-1.4, 1.4, off.y / R + .3), mu = dot(rd, SUN);
  vec3 c = SUNC * (.42 + .25 * lf + 1.4 * pow(max(mu, 0.), 5.)) * (1. - .25 * a * (1. - lf)) + skyAmb() * 1.1;
  return vec4(c * a, a);
}
// the mint's cloud layer: a smooth field baked per mint (R thickness, G light from the sun's side), cut here at the size of
// the pixel with a ragged edge from the 32-cube noise. uK[4].x the kind: 2 high cirrus, thin combed streaks; 3 storm, a
// dark deck with rents of bright upper cloud and curtains of snow under it (cu). (Fair cumulus was tried twice as a map
// seen on a plane and read as paint both times: its share went to Clear.)
float curt(vec3 rd) {
  float y = rd.y; vec2 dh = normalize(rd.xz + vec2(1e-5, 0.)), wd = normalize(uK[3].yz + vec2(1e-7, 0.));
  vec2 q = (dh - wd * y * 1.3) * 2.3;
  return smoothstep(.36, .6, n3(vec3(q, .3))) * smoothstep(.24, .03, y) * smoothstep(-.08, .015, y) * (.55 + .45 * n3(vec3(q * 9., y * 4. + .6)));
}
vec4 clouds(vec3 rd, float cu) {
  float y = rd.y;
  if (y < .004) return vec4(0.);
  float yp = y + .015, mu = max(dot(rd, SUN), 0.);
  vec3 A = skyAmb(), c;
  vec2 cq = rd.xz / yp * uK[3].x + uK[3].yz * TIME;
  float fp = 2. * TANH / RES / (yp * yp) * uK[3].x * 256.;
  vec2 m = textureLod(uCl, cq, log2(max(fp, 1.))).rg;
  float f = m.r + (n3(vec3(cq * 4.7, .37)) - .5) * .2 * (1. - .5 * smoothstep(2., 8., fp)), w = min(.3, .03 * fp + .012), a = 1.;
  if (uK[4].x < 2.5) {
    // high cirrus: thin combed streaks along the map's long axis, the blue showing through, lit by the hour's sun
    float cb = n3(vec3(cq.x * 1.3 + cq.y * .2, cq.y * 15., .55));
    a = smoothstep(uK[3].w - w, uK[3].w + w + .25, f) * (.15 + .85 * smoothstep(.38, .72, cb)) * .62;
    c = SUNC * (.42 + .35 * m.g + .8 * pow(mu, 6.)) * uK[4].w + A * .95;
  } else {
    // storm: a dark deck, thick parts slate, thinner parts lighter, torn open in a few places on bright upper cloud; a pale
    // band under the cloud base on the sun's side; snow curtains hanging from it, darker than the deck
    float th = clamp(f, 0., 1.);
    c = A * (.34 + .75 * (1. - th) * (1. - th)) + SUNC * .02 * (1. - th);
    c = mix(c, SUNC * .13 + A * 1.5, smoothstep(.1 + w + .1, .1 - w, th) * .9);
    vec2 dh = normalize(rd.xz + vec2(1e-5, 0.)), sh = normalize(SUN.xz + vec2(1e-5, 0.));
    c = mix(c, SUNC * .2 + A * 2., exp(-y * 16.) * smoothstep(-.2, .8, dot(dh, sh)) * .75);
    c = mix(c, A * .15, cu * .9);
  }
  c = mix(c * a, sky(normalize(vec3(rd.x, y + .03, rd.z))) * a, exp(-y * 7.) * (uK[4].x > 2.5 ? .3 : .75));
  return vec4(c, a);
}
vec3 stars(vec3 rd) {
  vec3 A = abs(rd);
  vec2 q = A.x > max(A.y, A.z) ? rd.yz / A.x + 3. * sign(rd.x) : A.y > A.z ? rd.xz / A.y + 7. * sign(rd.y) : rd.xy / A.z + 11. * sign(rd.z);
  vec2 g = q * 170., i = floor(g), f = fract(g) - .3 - .4 * vec2(h12(i + 3.1), h12(i + 5.7));
  float h = h12(i), pw = max(.09, 170. * TANH / RES);
  float st = step(.93, h) * pow(h12(i + 9.3), 14.) * exp(-dot(f, f) / (pw * pw)) * 3. * min(1., .01 / (pw * pw));
  // the Milky Way: a soft band of light with darker lanes across it
  float b = dot(rd, normalize(vec3(.62, .35, -.7)));
  float mw = exp(-b * b * 22.) * (.4 + .9 * smoothstep(.35, .75, n3(rd * 2.1 + .3))) * (1. - .7 * smoothstep(.55, .75, n3(rd * 5.3)) * exp(-b * b * 120.));
  return (vec3(.9, .95, 1.) * min(st, 3.) + vec3(.05, .052, .062) * mw) * smoothstep(0., .1, rd.y);
}
void main() {
  vec2 uv = gl_FragCoord.xy / RES;
  vec4 sc = textureLod(uSc, uv, 0.);
  vec3 rd = rayDir(uv);
  float t = abs(sc.a);
  vec3 col = sc.rgb;
  if (sc.a > 0. && t < 120.) {
    vec3 P = EYE + rd * t;
    col *= 1. - uK[0].w * flagShadow(P, .002);
  }
  float cu = uK[4].y > .5 ? curt(rd) : 0.;
  if (t > 5e4) {
    if (uK[4].z > 0.) col += stars(rd) * uK[4].z;
    if (uK[0].y > 0.) { vec4 cl = clouds(rd, cu); col = col * (1. - cl.a) + cl.rgb; }
  } else if (uK[4].y > .5 && t > 3000.) {
    // storm: the range's tops taken into the cloud base (ragged), the curtains drawn across the far land
    vec3 P = EYE + rd * t, A = skyAmb();
    float cb = uK[1].y - 520. + 520. * (n3(P * vec3(1. / 2600., 1. / 900., 1. / 2600.)) - .5);
    col = mix(col, A * .75, smoothstep(cb - 40., cb + 240., P.y) * .92);
    col = mix(col, A * .22, cu * smoothstep(4000., 12000., t) * .8);
  }
  if (uK[1].w > 0.) { vec4 pl = plume(EYE, rd, t); col = col * (1. - pl.a) + pl.rgb; }
  if (uK[0].x > .5) {
    vec2 tx = vec2(.8 / uK[0].z), ty = vec2(tx.x, -tx.y);
    vec4 f = (textureLod(uFg, uv + tx, 0.) + textureLod(uFg, uv - tx, 0.) + textureLod(uFg, uv + ty, 0.) + textureLod(uFg, uv - ty, 0.)) * .25;
    col = col * f.a + f.rgb;
  }
  o = vec4(tone(col) + (h12(gl_FragCoord.xy + fract(TIME) * 61.) - .5) / 255., 1.);
  gl_FragDepth = t > 5e4 ? 1. : depthOf(t * dot(rd, FW));
}
`,fa=Y+`
uniform sampler2D uT; uniform vec4 uR;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy / uR.x;
  vec3 c = texture(uT, uv).rgb;
  o = vec4(c, 1.);
}
`;function ze(v){let e=parseInt(v.slice(2,10),16)>>>0,x=parseInt(v.slice(10,18),16)>>>0,m=parseInt(v.slice(18,26),16)>>>0,g=parseInt(v.slice(26,34),16)>>>0;return()=>{e>>>=0,x>>>=0,m>>>=0,g>>>=0;let I=e+x|0;return e=x^x>>>9,x=m+(m<<3)|0,m=m<<21|m>>>11,g=g+1|0,I=I+g|0,m=m+I|0,(I>>>0)/4294967296}}const le=(v,e)=>{let x=0;for(const g of e)x+=g[1];let m=v()*x;for(const g of e)if(m-=g[1],m<=0)return g[0];return e[e.length-1][0]};function ha(v,e){const x=new Float32Array(e*e*e);for(const[A,H]of[[4,.5],[8,.3],[16,.2]]){const M=new Float32Array(A*A*A);for(let D=0;D<M.length;D++)M[D]=v();const Ee=e/A,Pe=new Int32Array(e),N=new Int32Array(e),ce=new Float32Array(e);for(let D=0;D<e;D++){const de=D/Ee,re=Math.floor(de),ve=de-re;Pe[D]=re%A,N[D]=(re+1)%A,ce[D]=ve*ve*(3-2*ve)}for(let D=0;D<e;D++)for(let de=0;de<e;de++){const re=Pe[D]*A*A,ve=N[D]*A*A,fe=Pe[de]*A,he=N[de]*A,Ve=ce[de],lt=ce[D],ft=(D*e+de)*e;for(let Ne=0;Ne<e;Ne++){const De=Pe[Ne],bt=N[Ne],ht=ce[Ne],_e=tt=>M[tt+De]+(M[tt+bt]-M[tt+De])*ht,et=_e(re+fe)+(_e(re+he)-_e(re+fe))*Ve,Ue=_e(ve+fe)+(_e(ve+he)-_e(ve+fe))*Ve;x[ft+Ne]+=(et+(Ue-et)*lt)*H}}}let m=1e9,g=-1e9;for(let A=0;A<x.length;A++){const H=x[A];H<m&&(m=H),H>g&&(g=H)}const I=new Uint8Array(x.length),y=255/(g-m);for(let A=0;A<x.length;A++)I[A]=(x[A]-m)*y;return I}const xt=(v,e,x)=>{v=Math.abs(v),e=Math.abs(e),x=Math.abs(x);let m=v>e?v:e;if(x>m&&(m=x),m===1/0)return 1/0;if(v!==v||e!==e||x!==x)return NaN;if(m===0)return 0;let g=0,I=0,y=v/m,A=y*y,H=A;return I=H-g-A,g=H,y=e/m,A=y*y-I,H=g+A,I=H-g-A,g=H,y=x/m,A=y*y-I,H=g+A,I=H-g-A,g=H,Math.sqrt(g)*m},zt=(v,e,x)=>{const m=Math.max(0,Math.min(1,(x-v)/(e-v)));return m*m*(3-2*m)},ee=(v,e)=>{const x=Math.abs(v),m=.0018*v*v/(1+x/220)*(v<0?1:.78),g=Math.exp(-Math.pow(e/(420+x*.55),2)),I=Math.max(-e-6,0),y=-1450*(1-Math.exp(-I*I/(I+60)/2e3)),A=Math.max(e-8,0),H=-520*(1-Math.exp(-A*A/(A+40)/700)),M=Math.exp(-Math.pow((e+19+3*Math.sin(v/7.3))/4.5,2))*zt(70,25,x)*(.3+1.5*zt(.15,.8,.5+.5*Math.sin(v/8.1+2)*Math.sin(v/3.7+.5)));return m*g+(e<0?y:H)+M};function pa(v){const e=(x,m)=>{let g=Math.imul(x,374761393)+Math.imul(m,668265263)+v|0;return g=Math.imul(g^g>>>13,1274126177),((g^g>>>16)>>>0)/4294967296};return(x,m)=>{const g=Math.floor(x),I=Math.floor(m),y=x-g,A=m-I,H=y*y*(3-2*y),M=A*A*(3-2*A),Ee=e(g,I),Pe=e(g+1,I),N=e(g,I+1),ce=e(g+1,I+1);return Ee+(Pe-Ee)*H+(N-Ee)*M+(Ee-Pe-N+ce)*H*M}}co.add({num:551,name:"Prayer Flags",fam:"Vistas",recipe:"A high pass with strings of five-colour flags running from a stone cairn, flapping like real cloth, with snowy peaks behind. How the strings are hung, the wind and how old the flags are change every mint, and sometimes there's a sea of cloud below. Tap a string to send a gust down it, drag sideways to turn the wind, or hold to bring a cloud bank boiling up through the pass.",interactive:"Tap a string of flags to send a gust running down it; drag sideways to turn the wind, so the strings swing round and the summit plume swings with it; hold to bring a cloud bank boiling up the valley and through the pass.",music:!0,gl:!0,fps:30,seed:0,make(v){const e=v.gl,x=v.size,m=ze(v.hash),g=!!v.home,I=ze("0x"+v.hash.slice(50,66)+v.hash.slice(18,34)+v.hash.slice(2,18)+v.hash.slice(34,50));for(let t=0;t<8;t++)I();const y=[];for(let t=0;t<16;t++)y.push(I());const A=t=>()=>y[t],H=ze("0x"+v.hash.slice(18,34)+v.hash.slice(50,66)+v.hash.slice(34,50)+v.hash.slice(2,18));for(let t=0;t<10;t++)H();const M=[];for(let t=0;t<16;t++)M.push(H());const Ee=t=>()=>M[t],Pe=0,N=Pe?{}[v.hash.slice(2,10)]||{}:{},ce=g?"fan":N.lay?N.lay:le(Ee(0),[["fan",.46],["gate",.27],["span",.19],["old",.08]]),D=g?"as now":N.flk?N.flk:le(Ee(1),[["as now",.47],["large",.16],["small",.14],["mixed",.18],["white",.05]]),de=!g&&(()=>{const t=ze("0x"+v.hash.slice(34,66)+v.hash.slice(2,34));for(let o=0;o<8;o++)t();return le(t,[["Clear",.88],["Storm light",.12]])==="Storm light"})(),re=N.hour?N.hour:g||de||N.storm?"Bright morning":le(A(0),[["Bright morning",.62],["Dawn alpenglow",.12],["Golden evening",.14],["Blue dusk",.08],["Moonlit",.035]]),ve=g?"Clear":N.wx?N.wx:le(A(1),[["Clear",.8],["High cirrus",.2]]);let fe=g?5:le(m,[[3,.1],[4,.3],[5,.35],[6,.25]]),he=g?"Steady":le(m,[["Breeze",.25],["Steady",.45],["Gale",.22],["Jet stream",.08]]);N.nStr&&(fe=N.nStr),N.wind&&(he=N.wind);const Ve=ze("0x"+v.hash.slice(34,66)+v.hash.slice(2,34));for(let t=0;t<6;t++)Ve();g||m();const lt=g?"Sun-faded":le(Ve,[["New",.32],["Sun-faded",.4],["Tattered",.28]]);let ft=g?"Morning":le(m,[["Morning",.5],["High sun",.32],["Early low sun",.18]]);N.light&&(ft=N.light);const Ne=g?"Pyramid":le(m,[["Pyramid",.45],["Twin summits",.33],["Great wall",.22]]),De=g?"Dry season":le(m,[["Dry season",.5],["Fresh snow",.38],["Deep winter",.12]]),bt=De==="Deep winter"?"Frozen":g?"Turquoise":le(m,[["Turquoise",.6],["Jade",.4]]),ht=Math.max(3,Math.min(5,fe)),_e=fe<5?1:2,et=g||De==="Deep winter"?"gravel":N.grd?N.grd:le(Ee(3),[["gravel",.4],["slate",.2],["shale",.2],["granite",.2]]);v.trait("Strings",ce==="fan"?String(fe+1):ce==="gate"?ht+" · gate":ce==="span"?_e+" · long span":ce==="old"?fe+1+" · old site":String(fe+1)),v.trait("Wind",he),v.trait("Flags",D==="as now"?lt:D==="white"?"White":D==="mixed"?"Mixed ages":lt+" · "+D),v.trait("Light",re==="Bright morning"?ft:re),v.trait("Range",Ne),v.trait("Snow",et==="gravel"?De:De+" · "+{slate:"slate scree",shale:"ochre shale",granite:"granite"}[et]);const Ue=ze("0x"+v.hash.slice(2).split("").reverse().join(""));Ue(),Ue(),Ue();const tt=g?"Across the pass":le(Ve,[["Across the pass",.42],["Under the strings",.32],["Above the lake",.26]]),ua=tt==="Above the lake"?y[2]<.4?"Close on one string":y[2]<.7?"Across the pass":"Under the strings":tt,Pt=!g&&N.view?N.view:!g&&y[3]<.16?y[4]>.5?"Lying under the fan":"Close on one string":ua,Le=!g&&!de&&!N.storm&&(N.sea||M[2]<.09),Ce=ce==="gate"?"Through the gate":ce==="span"||Le&&(Pt==="Under the strings"||Pt==="Lying under the fan")?"Across the pass":Pt;v.trait("View",Ce);const wo=g?"Clear":le(Ve,[["Clear",.88],["Storm light",.12]])==="Storm light"||N.storm?"Storm light":"Clear",me=wo==="Storm light";v.trait("Sky",me?wo:Le?ve==="High cirrus"?"Cloud sea · cirrus":"Cloud sea":ve);const ot={Breeze:5.5,Steady:9,Gale:14,"Jet stream":11}[he],da={Breeze:.45,Steady:.5,Gale:.6,"Jet stream":.55}[he],Eo={Breeze:.5,Steady:1,Gale:1.4,"Jet stream":2.6}[he],va={New:.08,"Sun-faded":.55,Tattered:.8}[lt],[To,Nt,Dt]={Morning:[56,31,0],"High sun":[32,52,-.05],"Early low sun":[74,15,.35]}[ft],yt={Pyramid:0,"Twin summits":1,"Great wall":2}[Ne],ma={"Dry season":850,"Fresh snow":350,"Deep winter":-150}[De],Ao={"Dry season":-.4,"Fresh snow":.3,"Deep winter":.8}[De],ge=()=>m()*2-1,_t=m()*50,Ut=m()*50,Te=[2300+ge()*2200,-14e3+ge()*1500,2300+m()*500],Ae=[400+ge()*400,2300+ge()*250],Fo=650+m()*200,Mo=ee(Ae[0],Ae[1])-230*(.5+m()*.1),ga=ge()*400,k=Math.PI/180,X=[Math.sin(To*k)*Math.cos(Nt*k),Math.sin(Nt*k),-Math.cos(To*k)*Math.cos(Nt*k)];let at=[3.1*(1+Dt*.1),3*(1-Dt*.05),2.85*(1-Dt*.3)];const te={gAmb:0,expo:.62,glow:.25,belt:0,esh:0,litAlt:-1e6,flagSun:1,bounce:1,shK:.74,starK:0,sky:null};{const t=y[9]<.5?-1:1,o=(s,a,n,r)=>{const f=s*k,d=a*k;X[0]=Math.sin(f)*Math.cos(d),X[1]=Math.sin(d),X[2]=-Math.cos(f)*Math.cos(d),at=n,Object.assign(te,r)};re==="Dawn alpenglow"&&o(t*(115+y[10]*45),3+y[11]*2,[1.7,.72,.4],{gAmb:1.6,expo:1.15,glow:.55,belt:.1,esh:.55,litAlt:1300+y[12]*900,flagSun:0,bounce:.45,shK:0,sky:[[.02,.04,.11],[.27,.27,.34],[.46,.37,.38],[.085,.105,.17]]}),re==="Golden evening"&&o(42+y[10]*20,8.5+y[11]*3.5,[3.3,1.95,.95],{expo:.72,glow:.7,belt:.04,shK:.8,sky:[[.02,.055,.2],[.36,.4,.52],[.7,.55,.45],[.08,.1,.17]]}),re==="Blue dusk"&&o(t*(55+y[10]*40),1,[.1,.05,.035],{gAmb:2.2,expo:2,glow:1.6,esh:.3,bounce:.25,shK:0,starK:.25,sky:[[.008,.02,.07],[.1,.12,.21],[.36,.22,.17],[.05,.06,.11]]}),re==="Moonlit"&&o(t*(15+y[10]*130),30+y[11]*25,[.26,.29,.36],{expo:2.1,glow:.1,bounce:.2,shK:.3,starK:1,sky:[[.004,.007,.02],[.012,.018,.035],[.02,.025,.04],[.012,.016,.03]]})}const $=[-6.9+ge()*.5,-4.3+ge()*.5],wt=(1.9+m()*.25)*.82,Et=(1.15+m()*.3)*.85,Ge=[$[0],ee($[0],$[1])+4.7+m()*.4,$[1]],xa=[[13,-15,3.2],[5.5,-27,-1],[9,7,3.6],[-15,6,-1],[-12,-22,-1],[-1,16,3],[3,-3.6,-1]],ba=fe===3?[6,0,2,4]:fe===4?[6,0,1,2,4]:fe===5?[6,0,1,2,3,4]:[6,0,1,2,3,4,5],Fe=[[$[0],$[1],ee($[0],$[1])+Et*.5,Ge[1]-ee($[0],$[1])-Et*.5+.25]],O=[];for(const t of ba){const o=xa[t],s=t===6?.4:1.5,a=o[0]+ge()*s,n=o[1]+ge()*s,r=ee(a,n);let f;if(o[2]>0){const d=o[2]+m()*.4;Fe.push([a,n,r-.1,d+.1]),f=[a,r+d-.05,n]}else Fe.push([a,n,r,-1]),f=[a,r+.62,n];O.push({a:g?Ge.slice():[Ge[0],Ge[1]-(t*.37+y[12])%1*.16,Ge[2]],b:f,gnd:o[2]<=0})}if(ce==="span"){Fe.length=1,O.length=0;for(let t=0;t<_e;t++){const o=t?-2-M[5]*8:14+M[5]*10,s=-31-(M[6]*7.1+t*.43)%1*9,a=ee(o,s);Fe.push([o,s,a,-1]),O.push({a:[Ge[0],Ge[1]-t*.22,Ge[2]],b:[o,a+.62,s],gnd:!0,slack:1.012+M[7]*.008,sm:.8})}}if(ce==="old"){const t=O.map((o,s)=>s).filter(o=>o>0).slice(0,4);for(let o=0;o<2&&t.length;o++){const s=t.splice(Math.floor((M[4]*7.3+o*.41)%1*t.length),1)[0],a=O[s],n=.55+M[5]*.15,r=a.a[0]+(a.b[0]-a.a[0])*n,f=a.a[2]+(a.b[2]-a.a[2])*n;a.b=[r,ee(r,f)+.12,f],a.gnd=!0,a.broken=!0;const d=Math.hypot(r-a.a[0],f-a.a[2]),i=a.a[1]-ee(a.a[0],a.a[2]);a.slack=(i*.85+d*1.04)/Math.hypot(d,a.a[1]-a.b[1])}}let Tt=null,xe=null;if(ce==="gate"){Tt=(M[13]-.5)*.3;const t=h=>Tt+1.3+.17*h+.4*Math.sin(h/5.3),o=5.5+M[4]*3,s=t(o)+(M[5]-.5)*.6,a=(-4+M[6]*16)*k,n=5.5+M[7]*2,r=9+M[8]*3,f=(M[9]<.5?-1:1)*(1.4+M[9]*9.3%1*1.6),d=Math.sin(a),i=-Math.cos(a),b=Math.cos(a),S=Math.sin(a),C=s+d*n+b*f,L=o+i*n+S*f,T=[[C-b*r/2,L-S*r/2],[C+b*r/2,L+S*r/2]];Fe.length=0,O.length=0;const w=[],c=[];for(let h=0;h<ht;h++){const F=3+h*2.5/(ht-1)+(M[14]*7.3+h*.37)%1*.25;c.push([F,F+((M[15]*5.1+h*.61)%1-.5)*.7])}for(let h=0;h<2;h++){const F=ee(T[h][0],T[h][1]);let E=0;for(const z of c)E=Math.max(E,z[h]);Fe.push([T[h][0],T[h][1],F-.1,E+.45]),w.push(F)}for(const h of c)O.push({a:[T[0][0],w[0]+h[0],T[0][1]],b:[T[1][0],w[1]+h[1],T[1][1]],gnd:!1,slack:1.006+M[10]*.006});for(let h=0;h<2;h++){const F=h?1:-1,E=T[h][0]+b*F*2.4+d*1.6,z=T[h][1]+S*F*2.4+i*1.6,q=ee(E,z);Fe.push([E,z,q,-1]),O.push({a:[T[h][0],w[h]+Fe[h][3]-.25,T[h][1]],b:[E,q+.3,z],gnd:!0,noFl:!0,slack:1.003})}xe={ex:s,ez:o,g:a,wa:a+Math.PI+(M[10]<.5?-1:1)*(62+M[11]*7.7%1*14)*k}}const Ke=O.length,pt=new Float32Array(32*14*4),Ro=[],So=[];let be=0;const ut=.25,Lt=.065,ko=D==="small"?.68:xe?D==="large"?2.25:1.7:D==="large"?2.05:1;let Ct=D==="small"?.5:1;if(D==="small"){let t=0;for(const s of O)s.noFl||(t+=Math.hypot(s.b[0]-s.a[0],s.b[1]-s.a[1],s.b[2]-s.a[2])*1.022-(s.gnd?2.9:.9));const o=t/(Ze*.93)/ko;Ct=Math.max(Ct,(o-ut*1)/(Lt*1.1))}const ya=Math.floor(M[12]*13.1%1*O.filter(t=>!t.noFl).length);for(let t=0;t<Ke;t++){const o=O[t],s=Math.hypot(o.b[0]-o.a[0],o.b[1]-o.a[1],o.b[2]-o.a[2]);o.len=s*(o.slack||1.022),o.seg=o.len/(j-1);const a=(.92+m()*.2)*ko*(o.sm&&D!=="large"?o.sm:1);o.scale=a;const n=D==="white"?1e3:D==="mixed"?t===ya?2e3:t%2?3e3:4e3:0,r=(ut+Lt)*a;let f=.45,d=Math.floor(m()*5);for(;!o.noFl&&f+ut*a<o.len-(o.broken?.3:o.gnd?2.4:.45)&&be<Ze;){const i=(Math.sin(be*12.9898+t*78.233+a*37.719)*43758.5453%1+1)%1,b=(Math.sin(be*39.3468+t*11.135+a*83.155)*24634.6345%1+1)%1,S=a*(.85+i*.3);pt.set([t,f,d%5+5*Math.floor(m()*100+1)+n,S],be*4),Ro.push(t),So.push(f+ut*S*.5),be++,d++,f+=ut*S+Lt*a*(.45+b*1.3)*Ct}}const wa={bake:{},march:{uHF:0,uHN:1,uSC:2,uN2:3,uPL:4,uCM:5},shade:{uHF:0,uHN:1,uSC:2,uN2:3,uPL:4,uCM:5,uG:6,uCA:7},shadeP:{uHF:0,uHN:1,uSC:2,uN2:3,uPL:4,uCM:5,uG:6,uCA:7},shadeW:{uHF:0,uHN:1,uSC:2,uN2:3,uPL:4,uCM:5,uG:6,uCA:7},cb:{uN2:0,uCM:1},sim:{uP:0,uQ:1,uFI:2,uST:3,uGU:4,uN3:5},flag:{uP:0,uFI:1,uSh:2},shad:{uP:0,uFI:1},fog:{uSc:0,uN3:1},comp:{uSc:0,uFg:1,uSh:2,uN3:3,uCl:4},str:{uST:0},copy:{uT:0}},u=e.__c551||(e.__c551=(()=>{e.getExtension("KHR_parallel_shader_compile");const t=(p,R)=>{const B=e.createShader(R);return e.shaderSource(B,p),e.compileShader(B),B},o=t(aa,e.VERTEX_SHADER),s=t(vo,e.VERTEX_SHADER),a=t(ia,e.VERTEX_SHADER),n={march:[o,na],shade:[o,ra],shadeP:[o,ca],bake:[o,po],cb:[o,sa],sim:[o,uo],comp:[o,yo],copy:[o,fa],flag:[s,xo],shad:[s,go],str:[a,la]},r={};let f=bo,d=Y+`#define WATER
`+it;for(const p in n){const R=e.createProgram(),B=t(n[p][1],e.FRAGMENT_SHADER);e.attachShader(R,n[p][0]),e.attachShader(R,B),(p==="flag"||p==="shad")&&e.bindAttribLocation(R,0,"aF"),e.linkProgram(R),r[p]={p:R,f:B,v:n[p][0]}}e.flush();const i={};i.n3=e.createTexture(),e.bindTexture(e.TEXTURE_3D,i.n3),e.texImage3D(e.TEXTURE_3D,0,e.R8,32,32,32,0,e.RED,e.UNSIGNED_BYTE,ha(ze("0x5510c0ffee5510c0ffee5510c0ffee5510c0ffee"),32)),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const p of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,p,e.REPEAT);const b=ze("0x551a11ce551a11ce551a11ce551a11ce551a11ce"),S=new Uint8Array(256*256*4);for(let p=0;p<S.length;p++)S[p]=b()*256;const C=i.fl=!!e.getExtension("EXT_color_buffer_float");e.getExtension("OES_texture_float_linear");const L=i.hfl=C||!!e.getExtension("EXT_color_buffer_half_float");if(i.ui=!C,i.sui=!L,!C){const p=(_,ae,we)=>{if(_.split(ae).length!==2)throw new Error("551 ui: "+ae);return _.split(ae).join(we)},R=_=>p(p(_,"out vec4 o;","out uvec4 oU; vec4 o;"),"void main() {","void main0() {")+`
void main() { main0(); oU = floatBitsToUint(o); }
`,B=`uniform highp usampler2D uSc;
vec4 scT(vec2 uv) { ivec2 s = textureSize(uSc, 0); return uintBitsToFloat(texelFetch(uSc, clamp(ivec2(uv * vec2(s)), ivec2(0), s - 1), 0)); }
`,Q=(_,ae,we)=>{r[_]&&e.deleteProgram(r[_].p);const ue=e.createProgram(),Xe=t(we,e.FRAGMENT_SHADER);e.attachShader(ue,ae),e.attachShader(ue,Xe),(_==="flag"||_==="shad")&&e.bindAttribLocation(ue,0,"aF"),e.linkProgram(ue),r[_]={p:ue,f:Xe,v:ae}};let Z=p(uo,"uniform sampler2D uP, uQ, uFI, uST, uGU;","uniform highp usampler2D uP, uQ; uniform sampler2D uFI, uST, uGU;");Z=p(p(Z,"texelFetch(uP, c, 0).xyz","uintBitsToFloat(texelFetch(uP, c, 0)).xyz"),"texelFetch(uQ, pc, 0).xyz","uintBitsToFloat(texelFetch(uQ, pc, 0)).xyz");let W=vo.split("texelFetch(uP, ").join("fP(");W=p(W,"uniform sampler2D uP, uFI;",`uniform highp usampler2D uP; uniform sampler2D uFI;
vec4 fP(ivec2 c, int l) { return uintBitsToFloat(texelFetch(uP, c, l)); }`);const ie=t(W,e.VERTEX_SHADER);if(Q("sim",o,R(Z)),Q("flag",ie,xo),Q("shad",ie,go),!L){let _=p(it,"uniform sampler2D uHF, uHN, uSC, uN2, uPL;","uniform highp usampler2D uHF, uHN; uniform sampler2D uSC, uN2, uPL;");_=p(_,"float hMap(sampler2D s, vec2 uv) { vec2 v = textureLod(s, uv, 0.).rg; return v.x + v.y; }",`vec2 hT(highp usampler2D s, ivec2 i, ivec2 n) { return uintBitsToFloat(texelFetch(s, clamp(i, ivec2(0), n - 1), 0).rg); }
float hMap(highp usampler2D s, vec2 uv) { ivec2 n = textureSize(s, 0); vec2 x = uv * vec2(n) - .5, f = fract(x); ivec2 i = ivec2(floor(x));
  vec2 v = mix(mix(hT(s, i, n), hT(s, i + ivec2(1, 0), n), f.x), mix(hT(s, i + ivec2(0, 1), n), hT(s, i + ivec2(1, 1), n), f.x), f.y); return v.x + v.y; }`),Q("march",o,R(Y+`#define MARCH
`+_)),_=p(p(_,"uniform sampler2D uG, uCA;","uniform highp usampler2D uG; uniform sampler2D uCA;"),"texelFetch(uG, ivec2(gl_FragCoord.xy), 0)","uintBitsToFloat(texelFetch(uG, ivec2(gl_FragCoord.xy), 0))"),Q("shade",o,R(Y+`#define LAND
`+_)),Q("shadeP",o,R(Y+`#define POLEP
`+_)),d=R(Y+`#define WATER
`+_),f=p(p(bo,"uniform sampler2D uSc;",B),"textureLod(uSc, uv, 0.)","scT(uv)"),Q("comp",o,p(p(yo,"uniform sampler2D uSc, uFg, uCl;",B+"uniform sampler2D uFg, uCl;"),"textureLod(uSc, uv, 0.)","scT(uv)")),Q("bakeU",o,R(po))}e.flush()}const T=p=>{if(!e.getProgramParameter(r[p].p,e.LINK_STATUS))throw new Error("551 "+p+": "+e.getShaderInfoLog(r[p].f)+e.getShaderInfoLog(r[p].v)+e.getProgramInfoLog(r[p].p));const R=r[p].p,B={p:R};r[p]=B;const Q=e.getProgramParameter(R,e.ACTIVE_UNIFORMS);for(let W=0;W<Q;W++){const ie=e.getActiveUniform(R,W).name.replace("[0]","");B[ie]=e.getUniformLocation(R,ie)}const Z=wa[p];e.useProgram(R);for(const W in Z)B[W]&&e.uniform1i(B[W],Z[W])};for(const p in r)p!=="fog"&&T(p);i.fogPending=null,i.readyFog=()=>T("fog");let w=null;i.preFog=()=>{!w&&!r.fog&&(w=t(f,e.FRAGMENT_SHADER),e.flush())},i.buildFog=()=>{const p=e.createProgram(),R=w||t(f,e.FRAGMENT_SHADER);e.attachShader(p,o),e.attachShader(p,R),e.linkProgram(p),e.flush(),r.fog={p,f:R,v:o},i.fogPending=r.fog},i.pcx=e.getExtension("KHR_parallel_shader_compile");let c=null,h=!1;i.swReady=()=>{if(h)return!0;if(!c){const p=e.createProgram(),R=t(d,e.FRAGMENT_SHADER);return e.attachShader(p,o),e.attachShader(p,R),e.linkProgram(p),e.flush(),r.shadeW=c={p,f:R,v:o},!1}return i.pcx&&!e.getProgramParameter(c.p,i.pcx.COMPLETION_STATUS_KHR)?!1:(T("shadeW"),h=!0,!0)},i.swForce=()=>{c||i.swReady(),h||(T("shadeW"),h=!0)};const F=(p,R,B,Q,Z,W,ie,_)=>{const ae=e.createTexture();return e.bindTexture(e.TEXTURE_2D,ae),e.texImage2D(e.TEXTURE_2D,0,B,p,R,0,Q,Z,_||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,W),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,W===e.LINEAR_MIPMAP_LINEAR?e.LINEAR:W),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,ie),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,ie),ae},E=(p,R)=>{const B=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,B),p&&e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,p,0),R&&e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,R,0),B};i.tex=F,i.fbo=E,i.n2=F(256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT,S),i.vao=e.createVertexArray(),i.P=r,i.sc=F(512,512,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT),e.bindVertexArray(i.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.useProgram(r.bake.p);{const p=E(i.sc);e.viewport(0,0,512,512),e.uniform4fv(r.bake.uB,new Float32Array([2,512,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(p)}e.bindTexture(e.TEXTURE_2D,i.sc),e.generateMipmap(e.TEXTURE_2D),i.cm=F(512,512,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),i.ca=F(512,512,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),e.useProgram(r.cb.p),e.viewport(0,0,512,512),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,i.n2);{const p=E(i.cm);e.uniform4f(r.cb.uQ,0,0,0,0),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(p)}e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,i.cm),e.activeTexture(e.TEXTURE0);{const p=E(i.ca);e.uniform4f(r.cb.uQ,1,0,0,0),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(p)}e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0);const z=L?e.RG16F:e.RG32UI,q=L?e.RG:e.RG_INTEGER,oe=L?e.HALF_FLOAT:e.UNSIGNED_INT,J=L?e.LINEAR:e.NEAREST;return i.HFm=[z,q,oe,J],i.SM=1280,i.FR=288,e.bindFramebuffer(e.FRAMEBUFFER,null),i})()),U=u.P,Gt=u.tex(u.SM,u.SM,e.DEPTH_COMPONENT16,e.DEPTH_COMPONENT,e.UNSIGNED_SHORT,e.NEAREST,e.CLAMP_TO_EDGE),Ea=u.fbo(null,Gt),zo=u.tex(u.FR,u.FR,u.hfl?e.RGBA16F:e.RGBA8,e.RGBA,u.hfl?e.HALF_FLOAT:e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),Ta=u.fbo(zo),Po=(()=>{const t=u.tex(x,x,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),o=u.tex(x,x,e.DEPTH_COMPONENT24,e.DEPTH_COMPONENT,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE);return{t,d:o,f:u.fbo(t,o)}})();e.bindFramebuffer(e.FRAMEBUFFER,null);const It={},Bt=u.sui?u.tex(x,x,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE):u.tex(x,x,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST,e.CLAMP_TO_EDGE),Aa=u.fbo(Bt),je=[],qt=[];for(let t=0;t<4;t++)je.push(u.ui?u.tex(Oe,ct,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE):u.tex(Oe,ct,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE)),qt.push(u.fbo(je[t]));const No=u.tex(32,14,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,pt),Ie=new Float32Array(32*8*4),Wt=u.tex(32,8,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,Ie),pe=16,At=new Uint8Array(pe*pe),Ht=u.tex(pe,pe,e.R8,e.RED,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE,At),Do=new Float32Array(8*4);Fe.forEach((t,o)=>Do.set(t,o*4));const Fa=u.tex(8,1,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,Do);let Ye=3*k,Be=.5*k,Me=0,Re=0,dt=1.6,st=Math.tan(33*k);if(Ce==="Across the pass"&&!g&&(Ye=(-18+y[14]*30)*k,Me=(y[15]-.5)*8,Re=(y[14]*13.7+y[15]*5.3)%1*3),Le&&Ce==="Across the pass"&&(Be=-3.5*k),xe&&(Me=xe.ex,Re=xe.ez,Ye=xe.g+(M[11]-.5)*6*k,Be=(7+M[12]*4)*k,st=Math.tan(30*k)),Ce==="Lying under the fan"){const t=re!=="Dawn alpenglow"&&re!=="Blue dusk"&&!me;let o;if(t)o=Math.atan2(X[0],-X[2])+Math.PI+(y[5]-.5)*30*k;else{let f=0,d=0;for(const i of O){const b=i.b[0]-$[0],S=i.b[2]-$[1],C=Math.hypot(b,S);f+=b/C,d+=S/C}o=Math.atan2(f,-d)+(y[5]-.5)*.7}const s=3.2+y[6]*1;Me=$[0]+Math.sin(o)*s,Re=$[1]-Math.cos(o)*s,dt=.45,Ye=o+Math.PI+(y[7]-.5)*(t?24:14)*k,t&&(Ye+=(M[13]-.5)*20*k);const a=ee(Me,Re)+dt,n=ee($[0],$[1]);let r=-1;for(let f=0;f<wt*1.1;f+=.1){const d=Math.max(0,1-f/wt),i=n+Et*1.1*d*d*(3-2*d);r=Math.max(r,Math.atan2(i-a,s-f))}Be=t?r+35*k:Math.atan2(Ge[1]-a,s)+y[8]*4*k}const P={fw:[0,0,-1],rt:[1,0,0],up:[0,1,0],eye:[0,1.6,0],key:""},$e=new Float32Array(48);let Xt=me?[.05,.058,.075]:[.016,.062,.25],Ot=me?[.2,.215,.24]:[.3,.46,.78],Vt=me?[.36,.37,.385]:[.55,.66,.84],Ft=me?[.075,.085,.105]:[.105,.15,.26];if(te.sky){const t=.62/te.expo*(re==="Golden evening"?1:.7);[Xt,Ot,Vt,Ft]=me?[Xt,Ot,Vt,Ft].map((o,s)=>o.map((a,n)=>a*t*(s===2?te.sky[2][n]/te.sky[1][n]*.5+.5:1))):te.sky}const vt=new Float32Array(48),_o=()=>{const t=v.view||oa,o=Ye+(t.yaw||0),s=Math.max(-1.25,Math.min(1.25,Be+(t.pitch||0))),a=Me+Math.max(-3,Math.min(3,t.x||0)),n=Re+Math.max(-3,Math.min(3,t.z||0)),r=ee(a,n)+dt+Math.max(-1,Math.min(1.5,t.y||0)),f=[o,s,a,r,n].map(L=>L.toFixed(4)).join();if(f===P.key)return!1;P.key=f;const d=Math.cos(s),i=[Math.sin(o)*d,Math.sin(s),-Math.cos(o)*d];let b=[-i[2],0,i[0]];const S=Math.hypot(b[0],b[2]);b=[b[0]/S,0,b[2]/S];const C=[b[1]*i[2]-b[2]*i[1],b[2]*i[0]-b[0]*i[2],b[0]*i[1]-b[1]*i[0]];return P.fw=i,P.rt=b,P.up=C,P.eye=[a,r,n],!0};let Uo=null;const Kt=t=>{if(Uo===P.key){$e[24]=vt[24]=t;return}Uo=P.key,$e.set([...P.eye,st,...P.fw,0,...P.rt,0,...P.up,0,...X,0,...at,te.expo,t,te.litAlt,0,0,...Xt,te.belt,...Ot,te.esh,...Vt,0,...Ft,0,x,te.glow,te.bounce,0]),$e[43]=te.gAmb,vt.set($e);for(let o=20;o<23;o++)vt[o]*=te.flagSun},Se=new Float32Array([0,0,0,0,yt,Te[0],Te[1],Te[2],_t,Ut,Ae[0],Ae[1],Mo,Fo,ga,Ao,0,0,0,0]),jt={gravel:[[1,1,1],[1,1,1],1],slate:[[.6,.64,.76],[1.2,1.17,1.1],.85],shale:[[1.32,.98,.68],[1.22,.96,.7],1],granite:[[1.42,1.4,1.36],[1.3,1.28,1.24],2.2]}[et],Ma=new Float32Array([Fe.length,yt,ma,Ao,$[0],$[1],wt,xe?0:Et,Ae[0],Ae[1],Fo,Mo,bt==="Frozen"?1:0,bt==="Jade"?.3:1,Tt===null?ge()*.3:(ge(),Tt),Ce==="Under the strings"?1:0,me?1:0,_t*.37,Ut*.41,!me&&ve==="Fair cumulus"?.5:0,xe?1:0,...jt[0],jt[2],...jt[1]]),ye=me?{k:"st",kind:3,sc:.1,dr:9e-4,a:0,sun:.3}:ve==="High cirrus"?{k:"ci",kind:2,sc:.11,dr:4e-4,a:.42,sun:1.1}:null;let Mt=null;if(ye){const t=ze("0x"+v.hash.slice(26,58)),o=256,s={},a=(c,h)=>{const F=c+"x"+h;if(s[F])return s[F];const E=new Float32Array(c*h);for(let z=0;z<E.length;z++)E[z]=t();return s[F]={a:E,px:c,pz:h}},n=(c,h,F)=>{const E=h*c.px,z=F*c.pz,q=Math.floor(E),oe=Math.floor(z),J=E-q,p=z-oe,R=J*J*(3-2*J),B=p*p*(3-2*p),Q=(q%c.px+c.px)%c.px,Z=(Q+1)%c.px,W=(oe%c.pz+c.pz)%c.pz,ie=(W+1)%c.pz,_=c.a,ae=_[W*c.px+Q],we=_[W*c.px+Z],ue=_[ie*c.px+Q],Xe=_[ie*c.px+Z];return ae+(we-ae)*R+(ue-ae)*B+(ae-we-ue+Xe)*R*B},r={st:[[4,4,.5],[8,8,.25],[16,16,.13],[32,32,.07],[64,64,.05]],ci:[[4,10,.45],[8,20,.27],[16,40,.15],[32,80,.09],[64,160,.04]]}[ye.k],f=y[13]<.5?1:-1,d=new Float32Array(o*o),i=new Uint8Array(o*o*2),b=a(4,4),S=a(5,5),C=r.map(c=>[a(c[0],c[1]),c[2]]),L=(c,h,F)=>{const E=Math.max(0,Math.min(1,(F-c)/(h-c)));return E*E*(3-2*E)};for(let c=0;c<o;c++)for(let h=0;h<o;h++){let F=h/o,E=c/o,z=0;if(ye.k==="ci"){const q=n(b,F,E)-.5,oe=n(S,F,E)-.5;E+=oe*.12,F+=q*.05+E*f}for(const q of C)z+=n(q[0],F,E)*q[1];d[c*o+h]=ye.k==="ci"?Math.max(0,Math.min(1,(z-.3)/.5))*L(.3,.6,n(b,F*3,E*3)):Math.max(0,Math.min(1,(z-.25)/.55))}const T=X[0]/(Math.hypot(X[0],X[2])||1),w=X[2]/(Math.hypot(X[0],X[2])||1);for(let c=0;c<o;c++)for(let h=0;h<o;h++){const F=d[c*o+h],E=(h+Math.round(T*6)+o)%o,z=(c+Math.round(w*6)+o)%o;i[(c*o+h)*2]=F*255,i[(c*o+h)*2+1]=Math.max(0,Math.min(1,.5+(F-d[z*o+E])*3.5))*255}e.activeTexture(e.TEXTURE15),Mt=u.tex(o,o,e.RG8,e.RG,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT,i),e.generateMipmap(e.TEXTURE_2D)}let Je=null,mt=null,Rt=null,St=null,Yt=0,Lo=0;const Ra=()=>{e.activeTexture(e.TEXTURE15);const[t,o,s,a]=u.HFm;Je=u.tex(1024,1024,t,o,s,a,e.CLAMP_TO_EDGE),mt=u.tex(512,512,t,o,s,a,e.CLAMP_TO_EDGE),Rt=u.fbo(Je),St=u.fbo(mt),e.bindVertexArray(u.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST);const n=u.sui?U.bakeU:U.bake;e.useProgram(n.p),Se[0]=0,Se[1]=1024,Se[2]=io,Se[3]=7,e.bindFramebuffer(e.FRAMEBUFFER,Rt),e.viewport(0,0,1024,1024),e.uniform4fv(n.uB,Se),e.drawArrays(e.TRIANGLES,0,3),Se[1]=512,Se[2]=lo,Se[3]=11,e.bindFramebuffer(e.FRAMEBUFFER,St),e.viewport(0,0,512,512),e.uniform4fv(n.uB,Se),e.drawArrays(e.TRIANGLES,0,3)},G=(t,o,s)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(o,s)},Co=()=>{Je||Ra(),Lo=Yt,e.bindVertexArray(u.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.activeTexture(e.TEXTURE6);const t=u.sui?u.tex(x,x,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE):u.tex(x,x,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST,e.CLAMP_TO_EDGE);e.bindTexture(e.TEXTURE_2D,null);const o=u.fbo(t);e.viewport(0,0,x,x);const s=Math.hypot(Ae[0]-P.eye[0],Ae[1]-P.eye[2]),a=(P.fw[0]*(Ae[0]-P.eye[0])+P.fw[2]*(Ae[1]-P.eye[2]))/s>.2,n=[U.march,U.shade,U.shadeP];It.needW=!1,a&&Ce==="Above the lake"&&u.swForce(),a&&(u.swReady()?n.push(U.shadeW):It.needW=!0);for(const r of n){const f=r!==U.march;e.useProgram(r.p),e.bindFramebuffer(e.FRAMEBUFFER,f?Aa:o),e.uniform4fv(r.uC,$e),e.uniform4fv(r.uW,Ma),e.uniform4fv(r.uB,Se),G(0,e.TEXTURE_2D,Je),G(1,e.TEXTURE_2D,mt),G(2,e.TEXTURE_2D,u.sc),G(3,e.TEXTURE_2D,u.n2),G(4,e.TEXTURE_2D,Fa),G(5,e.TEXTURE_2D,u.cm),f&&(G(6,e.TEXTURE_2D,t),G(7,e.TEXTURE_2D,u.ca)),e.drawArrays(e.TRIANGLES,0,3)}G(6,e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(o),e.deleteTexture(t)},$t=-80-90*(M[2]/.09),l={t:0,acc:0,wAng:(155+ge()*12)*k,wTarget:0,gust:pa(m()*1e9|0),taps:[[-1,0,-99,0],[-1,0,-99,0],[-1,0,-99,0]],tapI:0,nextAuto:.6+m()*1.6,snapT:0,fog:Le?1:0,lev:0,fogTop:Le?$t:-1400,relTop:-1400,press:null,drag:null};l.pOff=xe?l.wAng-xe.wa:0,xe&&(l.wAng=xe.wa),l.wTarget=l.wAng;const Go=()=>[Math.sin(l.wAng),-Math.cos(l.wAng)],Jt=70;let Qt=1;const Zt=(t,o,s,a)=>{const n=t*s+o*a,r=-t*a+o*s,f=l.gust((n-ot*l.t*.95)/16,r/11+l.t*.03);return Math.max(.12,1+da*Qt*(f*2-1)*1.5)},Io=(t,o)=>Zt(t,o,Math.sin(l.wAng),-Math.cos(l.wAng)),Bo=()=>{const t=Math.sin(l.wAng),o=-Math.cos(l.wAng);for(let s=0;s<pe;s++)for(let a=0;a<pe;a++){const n=((a+.5)/pe-.5)*Jt,r=((s+.5)/pe-.5)*Jt;At[s*pe+a]=Math.min(255,Zt(n,r,t,o)*127.5)}},eo=(t,o,s)=>{const a=l.t-t[2];if(t[0]!==o||a<0||a>5)return 0;const n=Math.abs(s-t[1])-a*9;return t[3]*Math.exp(-n*n/5)*Math.exp(-a*.5)*Math.min(1,a/.05)};for(const t of O){t.x=new Float64Array(j*3),t.p=new Float64Array(j*3);for(let o=0;o<j;o++){const s=o/(j-1),a=Math.sin(Math.PI*s)*(t.slack?Math.sqrt(3*t.len*(t.len-t.len/t.slack)/8):t.len*.085),n=[t.a[0]+(t.b[0]-t.a[0])*s,t.a[1]+(t.b[1]-t.a[1])*s-a,t.a[2]+(t.b[2]-t.a[2])*s];t.x.set(n,o*3),t.p.set(n,o*3)}}const qo=t=>{const o=Math.sin(l.wAng),s=-Math.cos(l.wAng),a=l.taps[0],n=l.taps[1],r=l.taps[2];for(let f=0;f<Ke;f++){const d=O[f],i=d.x,b=d.p,S=d.seg,C=a[0]===f,L=n[0]===f,T=r[0]===f;for(let w=1,c=3;w<j-1;w++,c+=3){const h=i[c],F=i[c+1],E=i[c+2];let z=(h-b[c])/t,q=(F-b[c+1])/t,oe=(E-b[c+2])/t;const J=(C?eo(a,f,w*S):0)+(L?eo(n,f,w*S):0)+(T?eo(r,f,w*S):0),p=Zt(h,E,o,s)+J,R=o*ot*p,B=ot*J*.5,Q=s*ot*p;let Z=i[c+3]-i[c-3],W=i[c+4]-i[c-2],ie=i[c+5]-i[c-1];const _=xt(Z,W,ie)||1;Z/=_,W/=_,ie/=_;let ae=R-z,we=B-q,ue=Q-oe;const Xe=ae*Z+we*W+ue*ie;ae-=Z*Xe,we-=W*Xe,ue-=ie*Xe;const La=xt(ae,we,ue),ro=1-Math.exp(-.9*La*t);z+=ae*ro,q+=we*ro-9.81*t,oe+=ue*ro,b[c]=h,b[c+1]=F,b[c+2]=E,i[c]=h+z*t*.995,i[c+1]=F+q*t*.995,i[c+2]=E+oe*t*.995}for(let w=0;w<10;w++)for(let c=0,h=0;c<j-1;c++,h+=3){const F=i[h+3]-i[h],E=i[h+4]-i[h+1],z=i[h+5]-i[h+2],q=xt(F,E,z)||1,oe=(q-S)/q,J=c===0?0:c+1===j-1?1:.5,p=c+1===j-1?0:c===0?1:.5;i[h]+=F*oe*J,i[h+1]+=E*oe*J,i[h+2]+=z*oe*J,i[h+3]-=F*oe*p,i[h+4]-=E*oe*p,i[h+5]-=z*oe*p}for(let w=3;w<(j-1)*3;w+=3){const c=ee(i[w],i[w+2])+.1;i[w+1]<c&&(i[w+1]=c)}}},Wo=()=>{for(let t=0;t<Ke;t++){const o=O[t],s=o.x;for(let n=0,r=t*128;n<j*3;n+=3,r+=4)Ie[r]=s[n],Ie[r+1]=s[n+1],Ie[r+2]=s[n+2];const a=(t*32+31)*4;Ie[a]=o.seg,Ie[a+1]=j,Ie[a+2]=o.len,Ie[a+3]=0}e.bindTexture(e.TEXTURE_2D,Wt),e.texSubImage2D(e.TEXTURE_2D,0,0,0,32,8,e.RGBA,e.FLOAT,Ie)},to=new Float32Array(Oe*ct*4);{const[t,o]=Go();for(let s=0;s<be;s++){const a=O[pt[s*4]],n=pt[s*4+3],r=pt[s*4+1],f=s%qe*se,d=Math.floor(s/qe)*ne;for(let i=0;i<ne;i++)for(let b=0;b<se;b++){const S=r+b*.25*n/(se-1),C=Math.min(j-1.001,S/a.seg),L=Math.floor(C),T=C-L,w=a.x.subarray(L*3,L*3+3),c=a.x.subarray(L*3+3,L*3+6),h=i*.3*n/(ne-1);to.set([w[0]+(c[0]-w[0])*T+t*h*.75,w[1]+(c[1]-w[1])*T-h*.66,w[2]+(c[2]-w[2])*T+o*h*.75,1],((d+i)*Oe+f+b)*4)}}}for(let t=0;t<4;t++)e.bindTexture(e.TEXTURE_2D,je[t]),u.ui?e.texSubImage2D(e.TEXTURE_2D,0,0,0,Oe,ct,e.RGBA_INTEGER,e.UNSIGNED_INT,new Uint32Array(to.buffer)):e.texSubImage2D(e.TEXTURE_2D,0,0,0,Oe,ct,e.RGBA,e.FLOAT,to);let gt=0,oo=1;const Sa=Math.ceil(be/qe)*ne,V=new Float32Array(28),ka={Breeze:.3,Steady:.34,Gale:.4,"Jet stream":.36}[he],Ho=[];for(let t=0;t<4;t++)for(let o=0;o<4;o++)Ho.push([0,1,2,3].filter(s=>s!==t&&s!==o));const Xo=(t,o)=>{V[0]=0,V[1]=t,V[2]=l.t,V[3]=be,V[4]=Math.sin(l.wAng),V[5]=-Math.cos(l.wAng),V[6]=ot,V[7]=ka,V[8]=.25/(se-1),V[9]=.3/(ne-1),V[10]=0,V[11]=0,V[12]=Jt,V[13]=0,V[14]=0,V[15]=0,V.set(l.taps[0],16),V.set(l.taps[1],20),V.set(l.taps[2],24),o&&(e.useProgram(U.sim.p),e.viewport(0,0,Oe,Sa),G(2,e.TEXTURE_2D,No),G(3,e.TEXTURE_2D,Wt),G(4,e.TEXTURE_2D,Ht),G(5,e.TEXTURE_3D,u.n3));const s=Ho[gt*4+oo],a=s[0],n=s[1];e.bindFramebuffer(e.FRAMEBUFFER,qt[a]),G(0,e.TEXTURE_2D,je[gt]),G(1,e.TEXTURE_2D,je[oo]),e.uniform4fv(U.sim.uS,V),e.drawArrays(e.TRIANGLES,0,3),V[0]=1,e.uniform4fv(U.sim.uS,V);let r=a;e.activeTexture(e.TEXTURE0);for(let f=0;f<4;f++){const d=r===a?n:a;e.bindFramebuffer(e.FRAMEBUFFER,qt[d]),e.bindTexture(e.TEXTURE_2D,je[r]),e.drawArrays(e.TRIANGLES,0,3),r=d}oo=gt,gt=r},Oo=e.createBuffer(),Vo=e.createVertexArray();let ao=!0;e.bindVertexArray(Vo),e.bindBuffer(e.ARRAY_BUFFER,Oo),e.bufferData(e.ARRAY_BUFFER,Ze*4,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,1,e.FLOAT,!1,0,0),e.vertexAttribDivisor(0,1),e.bindVertexArray(u.vao);const Ko=new Float32Array(Ze),so=new Float32Array(Ze),jo=Array.from({length:be},(t,o)=>o),He=new Float32Array(8),nt=new Float32Array(12),K=new Float32Array(20),Yo=new Float32Array(12);(()=>{const o=9/Math.max(X[1],.2),s=17+3/Math.max(X[1],.25);He.set([1-X[0]/X[1]*2,-7-X[2]/X[1]*2,s,u.SM,-12,o,0,0])})();const $o=t=>{const o=t?U.shad:U.flag;e.useProgram(o.p),e.bindVertexArray(Vo),e.uniform4fv(o.uC,vt),e.uniform4fv(o.uFL,nt),e.uniform4f(o.uMode,t?1:0,He[0],He[1],He[2]),e.uniform2f(o.uSR,He[4],He[5]),G(0,e.TEXTURE_2D,je[gt]),G(1,e.TEXTURE_2D,No),t||(G(2,e.TEXTURE_2D,Gt),e.uniform4fv(o.uM,He)),e.drawArraysInstanced(e.TRIANGLES,0,(se-1)*(ne-1)*6*Qe*Qe,be),e.bindVertexArray(u.vao)},Jo=t=>{Kt(t),e.bindFramebuffer(e.FRAMEBUFFER,Ea),e.viewport(0,0,u.SM,u.SM),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.disable(e.BLEND),ao&&(e.bindBuffer(e.ARRAY_BUFFER,Oo),e.bufferData(e.ARRAY_BUFFER,Ko,e.DYNAMIC_DRAW),ao=!1),te.shK>0&&$o(!0),e.disable(e.DEPTH_TEST);let o=l.fog>.003;if(o&&!U.fog&&u.buildFog(),o&&u.fogPending&&(u.readyFog(),u.fogPending=null),o){e.bindVertexArray(u.vao),e.useProgram(U.fog.p),e.bindFramebuffer(e.FRAMEBUFFER,Ta),e.viewport(0,0,u.FR,u.FR);const[a,n]=Go();Yo.set([l.fogTop,Math.min(1,l.fog*1.6),t,u.FR,a,n,ot,0,zt(-420,-40,l.relTop)*Math.min(1,l.fog*1.3),nt[1],Le?.93*(1-l.lev):0,0]),e.uniform4fv(U.fog.uC,$e),e.uniform4fv(U.fog.uF,Yo),G(0,e.TEXTURE_2D,Bt),G(1,e.TEXTURE_3D,u.n3),e.drawArrays(e.TRIANGLES,0,3)}e.bindVertexArray(u.vao),e.bindFramebuffer(e.FRAMEBUFFER,Po.f),e.viewport(0,0,x,x),e.enable(e.DEPTH_TEST),e.depthFunc(e.ALWAYS),e.depthMask(!0),e.useProgram(U.comp.p);const s=l.wAng-62*k+l.pOff;K[0]=o?1:0,K[1]=Mt?1:0,K[2]=u.FR,K[3]=te.shK,K[4]=Te[0],K[5]=za,K[6]=Te[1],K[7]=Eo*(me?1.8:1),K[8]=Math.sin(s),K[9]=-Math.cos(s),K[10]=he==="Jet stream"?9e3:2600+Eo*1400,K[11]=t,Mt&&(K[12]=ye.sc,K[13]=Math.sin(l.wAng)*ye.dr,K[14]=-Math.cos(l.wAng)*ye.dr,K[15]=ye.a,G(4,e.TEXTURE_2D,Mt)),K[16]=ye?ye.kind:0,K[17]=me?1:0,K[18]=te.starK,K[19]=ye?ye.sun:1,e.uniform4fv(U.comp.uC,$e),e.uniform4fv(U.comp.uK,K),e.uniform4fv(U.comp.uM,He),G(0,e.TEXTURE_2D,Bt),G(1,e.TEXTURE_2D,zo),G(2,e.TEXTURE_2D,Gt),G(3,e.TEXTURE_3D,u.n3),e.drawArrays(e.TRIANGLES,0,3),e.depthFunc(e.LEQUAL),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.depthMask(!1),e.useProgram(U.str.p),e.uniform4fv(U.str.uC,vt),e.uniform4fv(U.str.uFL,nt),e.uniform4f(U.str.uSD,x,j,0,0),G(0,e.TEXTURE_2D,Wt),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Ke*(j-1)),e.depthMask(!0),$o(!1),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,x,x),e.useProgram(U.copy.p),e.uniform4f(U.copy.uR,x,0,0,0),G(0,e.TEXTURE_2D,Po.t),e.drawArrays(e.TRIANGLES,0,3)},za=(()=>{const t=Te[0],o=Te[1];let s=Pa(Te)+Na(o)*(2100+500*Math.sin(t/3900+1.3+_t)+300*Math.sin(t/1700+Ut)+(yt===2?500:0))+Te[2];return yt===1&&(s+=Te[2]*.86*Math.pow(Math.max(0,1-Math.hypot(3400,900)/5200),1.6)),s+60})();function Pa(t){const o=t[0],s=t[1],a=Math.abs(o),n=.0018*o*o/(1+a/220)*(o<0?1:.78),r=Math.exp(-Math.pow(s/(420+a*.55),2));return ee(t[0],t[1])+n*0}function Na(t){const o=(s,a,n)=>{const r=Math.max(0,Math.min(1,(n-s)/(a-s)));return r*r*(3-2*r)};return o(-6200,-11500,t)*(1-.35*o(-17e3,-22e3,t))}const Qo=()=>{const t=P.eye;for(let o=0;o<be;o++){const s=O[Ro[o]],a=Math.min(j-1.001,So[o]/s.seg),n=Math.floor(a),r=a-n,f=s.x,d=n*3;so[o]=xt(f[d]+(f[d+3]-f[d])*r-t[0],f[d+1]+(f[d+4]-f[d+1])*r-.15-t[1],f[d+2]+(f[d+5]-f[d+2])*r-t[2])}jo.sort((o,s)=>so[s]-so[o]);for(let o=0;o<be;o++)Ko[o]=jo[o];ao=!0};if(nt.set([va,0,0,0,.95*at[0]*.55+.3,.95*at[1]*.55+.36,.95*at[2]*.55+.48,0,1,0,0,0]),te.sky)for(let t=0;t<3;t++)nt[4+t]=.5*at[t]*.55+Ft[t]*2.8;const Zo=()=>{const t=l.fog>.003?Math.max(0,Math.min(1,(l.relTop+160)/220))*(.6+.4*Math.max(-1,Math.min(1,(Io(-1,-4)-1)*1.6))):0;nt[1]=.028*t*Math.min(1,l.fog*1.4)},Da=()=>{const t=v.input;for(const s of t.taps())l.press={x:s.x,y:s.y,t0:l.t,moved:!1,lx:s.x};const o=l.press;if(o)if(t.down){const s=t.x-o.lx;Math.abs(t.x-o.x)+Math.abs(t.y-o.y)>.025&&(o.moved=!0),o.moved&&(l.wTarget+=s*2.6),o.lx=t.x,o.hold=!o.moved&&l.t-o.t0>.35}else!o.moved&&l.t-o.t0<.35&&_a(o.x,o.y),l.press=null},_a=(t,o)=>{const s=t*2-1,a=1-o*2,n=[P.fw[0]+(s*P.rt[0]+a*P.up[0])*st,P.fw[1]+(s*P.rt[1]+a*P.up[1])*st,P.fw[2]+(s*P.rt[2]+a*P.up[2])*st],r=Math.hypot(...n);n[0]/=r,n[1]/=r,n[2]/=r;let f=.09,d=-1,i=0;O.forEach((b,S)=>{for(let C=0;C<j;C++){const L=b.x.subarray(C*3,C*3+3),T=[L[0]-P.eye[0],L[1]-.2-P.eye[1],L[2]-P.eye[2]],w=T[0]*n[0]+T[1]*n[1]+T[2]*n[2];if(w<.3)continue;const c=Math.hypot(T[0]-n[0]*w,T[1]-n[1]*w,T[2]-n[2]*w)/w;c<f&&(f=c,d=S,i=C*b.seg)}}),d<0&&(d=Math.floor(m()*Ke),i=O[d].len*.5),l.taps[l.tapI]=[d,i,l.t,2.4],l.snapT=l.t,l.tapI=(l.tapI+1)%3,v.sound.hit("noise",.5,{cutoff:700,dur:1.2});for(let b=0;b<4;b++)v.sound.hit("click",.25+.1*b)};let ea=0;const ta=t=>{l.t+=t,l.wAng+=(l.wTarget-l.wAng)*(1-Math.exp(-t*1.4));const o=!!(l.press&&l.press.hold);if(l.fog+=((o||Le?1:0)-l.fog)*(1-Math.exp(-t*(o?.8:.12))),l.lev+=((o?1:0)-l.lev)*(1-Math.exp(-t*(o?.9:.45))),l.relTop=l.fogTop=-1e3+950*Math.pow(l.lev,.7)+90*Math.sin(l.t*.42)*l.lev*l.lev,Le&&(l.fogTop=$t+(-50-$t)*Math.pow(l.lev,.7)+90*Math.sin(l.t*.42)*l.lev*l.lev),l.t>l.nextAuto){const s=Math.floor(m()*Ke);l.taps[l.tapI]=[s,0,l.t,1.1+m()*.9],l.tapI=(l.tapI+1)%3,l.nextAuto=l.t+2.5+m()*m()*9}qo(t)};if(Ce==="Close on one string"||Ce==="Under the strings"){Qt=0;for(let a=0;a<150;a++)qo(ke);Qt=1;const t=(a,n)=>{const r=O[a].x,f=Math.round(n*(j-1))*3;return[r[f],r[f+1],r[f+2]]},o=Math.sin(l.wAng),s=-Math.cos(l.wAng);if(Ce==="Close on one string"){const a={Breeze:55,Steady:40,Gale:24,"Jet stream":30}[he]*k,n=1.9+y[6]*.6,r=[o*Math.cos(a),-Math.sin(a),s*Math.cos(a)],f=[];for(let b=0;b<Ke;b++)for(const S of[.07,.12,.17,.83,.88]){if(S>.5&&O[b].gnd)continue;const C=t(b,S-.03),L=t(b,S+.03),T=t(b,S),w=[L[0]-C[0],L[1]-C[1],L[2]-C[2]];let c=[w[1]*r[2]-w[2]*r[1],w[2]*r[0]-w[0]*r[2],w[0]*r[1]-w[1]*r[0]];const h=Math.hypot(...c)||1;c=c.map(Z=>Z/h),(c[1]>0||Math.abs(c[1])<.35&&c[0]*X[0]+c[2]*X[2]>0)&&(c=c.map(Z=>-Z));const F=ee(T[0]+c[0]*n,T[2]+c[2]*n)+1.6,E=c[1]<-.25?Math.min(3.2,Math.max(1.2,(T[1]-F)/-c[1])):n,z=T[0]+c[0]*E,q=T[2]+c[2]*E,oe=ee(z,q)+1.6,J=[T[0]-z,T[1]-oe,T[2]-q],p=Math.hypot(...J),R=-(J[0]*c[0]+J[1]*c[1]+J[2]*c[2])/p,B=te.flagSun?(J[0]*X[0]+J[1]*X[1]+J[2]*X[2])/p:0,Q=Math.hypot(z-$[0],q-$[1])<wt+.4?5:0;f.push({cost:Math.abs(p-n)*1.5+(1-R)*4-B*1.2+Q+Math.max(0,Math.abs(z)-14)*.3+Math.max(0,Math.abs(q+2)-9)*.3,P:T,ex:z,ez:q})}f.sort((b,S)=>b.cost-S.cost);const d=f[Math.min(f.length-1,Math.floor(y[5]*2.99))];Me=d.ex,Re=d.ez;const i=ee(Me,Re)+dt;Ye=Math.atan2(d.P[0]-Me,-(d.P[2]-Re))+(y[7]-.5)*10*k,Be=Math.atan2(d.P[1]-.12-i,Math.hypot(d.P[0]-Me,d.P[2]-Re)),!g&&Be>18*k&&(Be=18*k+(Be-18*k)*.35),st=Math.tan((he==="Gale"||he==="Jet stream"?21+y[8]*3:19+y[8]*5)*k)}else{const a=t(0,.5+Ue()*.15),n=(30+Ue()*8)*k,r=ee(a[0],a[2]+2)+dt,f=Math.max(1.2,(a[1]-r)/Math.tan(n));Me=a[0]+o*f*.5+(Ue()-.5),Re=a[2]+Math.max(.8,s)*f,Ye=(-22+Ue()*14)*k,Be=Math.max(16,Math.min(24,n/k-14))*k}}_o(),Kt(0),Bo(),Co(),e.bindVertexArray(u.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.bindTexture(e.TEXTURE_2D,Ht),e.texSubImage2D(e.TEXTURE_2D,0,0,0,pe,pe,e.RED,e.UNSIGNED_BYTE,At);for(let t=0;t<30;t++)ta(ke),Wo(),Xo(ke,t===0);Qo(),Zo(),Le&&!U.fog&&u.buildFog(),Jo(0);let rt=0,Ua=0,no=0;return(t,o)=>{if(Da(),Yt++,no===8&&!U.fog&&!u.fogPending?u.buildFog():no===6&&!U.fog&&!u.fogPending&&u.preFog(),x<=400&&Je&&Yt-Lo>30){for(const n of[Je,mt])e.deleteTexture(n);for(const n of[Rt,St])e.deleteFramebuffer(n);Je=mt=Rt=St=null}(_o()||It.needW&&u.swReady())&&(Kt(l.t),Co()),rt+=Math.min(Math.max(o,0),.1);let s=0;for(rt>=ke&&(Bo(),e.bindTexture(e.TEXTURE_2D,Ht),e.texSubImage2D(e.TEXTURE_2D,0,0,0,pe,pe,e.RED,e.UNSIGNED_BYTE,At)),e.bindVertexArray(u.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST);rt>=ke&&s<2;)ta(ke),Wo(),Xo(ke,s===0),rt-=ke,s++;s===2&&(rt=Math.min(rt,ke)),no++&3||Qo(),Zo();const a=Io(-2,-6);a>1.35&&l.t-ea>.7&&(ea=l.t,v.sound.hit("snare",Math.min(.3,(a-1.2)*.3)),v.sound.hit("noise",.18,{cutoff:500,dur:.9}));for(const n of l.taps){const r=l.t-n[2];if(n[0]<0||r<.05||r>2.6)continue;const f=O[n[0]].len;n[1]+r*9>f+1&&n[1]-r*9<-1||l.t-l.snapT>.085+.06*Math.abs(Math.sin(l.t*37.3))&&(l.snapT=l.t,v.sound.hit(Math.sin(l.t*91.7)>0?"snare":"click",.22*Math.exp(-r*.9)+.04))}Jo(l.t),Ua=t}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
