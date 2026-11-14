// Prayer Flags: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/551.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(eo){eo&&function(){"use strict";const jo={yaw:0,pitch:0,x:0,y:0,z:0},te=8,ae=9,$e=2,qe=24,Je=432,Xe=te*qe,nt=ae*(Je/qe),Y=28,Se=1/60,to=24e3,oo=400,$=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,Yo=$+"void main() { vec2 p = vec2(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1.); gl_Position = vec4(p, 0., 1.); }",He=`
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
`,ao=`
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
`,Mt=`
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
`,so=Mt+`
vec3 glac(vec2 p) {     // mask, along (m), across (-1..1)
  float z = p.y;
  float gx = 700. + 650. * sin((z + 3000.) / 2600.) + uB[3].z;
  float w = 380. + 90. * sin(z / 1700.);
  float a = (p.x - gx) / w;
  float m = smoothstep(1., .72, abs(a)) * smoothstep(-3600., -4200., z) * smoothstep(-10500., -8500., z);
  return vec3(m, -z, a);
}
`,no=$+`
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
`+so+`
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
`,$o=$+`
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
`,rt=He+`
uniform sampler2D uHF, uHN, uSC, uN2, uPL;
uniform sampler2D uCM;
uniform vec4 uW[7], uB[5];
out vec4 o;
`+so+`
float vn(vec2 x) { vec2 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f); return textureLod(uN2, (i + f + .5) / 256., 0.).r; }
// the same noise with full-precision weights (the hardware filter's 8-bit weights terrace the tall mid-detail into dashes)
float vnF(vec2 x) { vec2 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f); ivec2 c = ivec2(i) & 255, d = (c + 1) & 255;
  return mix(mix(texelFetch(uN2, c, 0).r, texelFetch(uN2, ivec2(d.x, c.y), 0).r, f.x), mix(texelFetch(uN2, ivec2(c.x, d.y), 0).r, texelFetch(uN2, d, 0).r, f.x), f.y); }
float hMap(sampler2D s, vec2 uv) { vec2 v = textureLod(s, uv, 0.).rg; return v.x + v.y; }
float baseH(vec2 p) {
  float h = hMap(uHF, p / ${2*to}. + .5);
  vec2 un = p / ${2*oo}. + .5, e2 = abs(un - .5);
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
`,Jo=$+`#define MARCH
`+rt,Qo=$+`#define LAND
`+rt,Zo=$+`#define POLEP
`+rt,ro=$+`
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
`+Mt+`
float gnd(vec2 p) { return passH(p); }
void main() {
  ivec2 pc = ivec2(gl_FragCoord.xy);
  int bx = pc.x / ${te}, i = pc.x - bx * ${te}, by = pc.y / ${ae}, j = pc.y - by * ${ae};
  int f = by * ${qe} + bx;
  if (float(f) >= uS[0].w) { o = vec4(0.); return; }
  vec4 info = texelFetch(uFI, ivec2(f % 32, f / 32), 0);
  int s = int(info.x + .5);
  float dx = uS[2].x * info.w, dy = uS[2].y * info.w;
  float u = info.y + float(i) * dx;
  vec3 top = strPt(s, u);
  if (j == 0) { o = vec4(top, 1.); return; }
  ivec2 base = ivec2(bx * ${te}, by * ${ae});
  vec3 x = P(pc);
  float dt = uS[0].y;
  if (uS[0].x < .5) {
    vec3 xp = texelFetch(uQ, pc, 0).xyz;
    vec3 v = (x - xp) / dt;
    vec3 ex = P(base + ivec2(min(i + 1, ${te-1}), j)) - P(base + ivec2(max(i - 1, 0), j));
    vec3 ey = P(base + ivec2(i, min(j + 1, ${ae-1}))) - P(base + ivec2(i, j - 1));
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
      if (ii >= 0 && ii < ${te} && jj >= 0 && jj < ${ae}) {
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
`,co=$+He+`
uniform sampler2D uP, uFI;
uniform vec4 uMode;     // x: 1 shadow pass; yzw shadow map centre xz, half extent;
uniform vec2 uSR;       // shadow param range
in float aF;
out vec2 vUV; out vec3 vW, vN; out float vD; flat out vec4 vI;
// the particle sheet is drawn ${$e}x finer: positions interpolated between particles, plus the cloth's own small
// motion the 8 x 9 sheet can't carry (a wave running out along the free edge, one or two creases drifting across)
vec3 gP(ivec2 c) { return texelFetch(uP, c, 0).xyz; }
vec3 sheet(ivec2 base, vec2 g) {
  vec2 c = clamp(floor(g), vec2(0.), vec2(${te-2}., ${ae-2}.)), w = g - c; ivec2 ic = base + ivec2(c);
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
  int qi = q % ${(te-1)*$e}, qj = q / ${(te-1)*$e};
  int ox = (k == 1 || k == 3 || k == 4) ? 1 : 0, oy = (k == 2 || k == 4 || k == 5) ? 1 : 0;
  ivec2 base = ivec2((f % ${qe}) * ${te}, (f / ${qe}) * ${ae});
  vI = texelFetch(uFI, ivec2(f % 32, f / 32), 0);
  vec2 g = vec2(qi + ox, qj + oy) / ${$e}.;
  const vec2 GN = vec2(${te-1}., ${ae-1}.);
  vec3 t0 = gP(base), t1 = gP(base + ivec2(${te-1}, 0)), b0 = gP(base + ivec2(0, ${ae-1})), b1 = gP(base + ivec2(${te-1}, ${ae-1}));
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
`,io=`
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
`,lo=$+He+`
uniform vec4 uFL[3];
in vec2 vUV; in vec3 vW, vN; in float vD; flat in vec4 vI;
out vec4 o;
`+io+`
void main() { float e; if (flagAlpha(vUV, vI, e) < .5 || e < 0.) discard; o = vec4(1.); }
`,fo=$+He+ao+`
uniform vec4 uFL[3];
in vec2 vUV; in vec3 vW, vN; in float vD; flat in vec4 vI;
out vec4 o;
`+io+`
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
`,ea=$+He+`
uniform sampler2D uST;
uniform vec4 uSD;   // res, nodes per string, -, -
out float vA; out vec3 vWp;
vec4 proj(vec3 p) { vec3 r = p - EYE; float zv = dot(r, FW); const float n = .03, fa = 2e5; return vec4(dot(r, RT) / TANH, dot(r, UPV) / TANH, zv * (fa + n) / (fa - n) - 2. * fa * n / (fa - n), zv); }
void main() {
  int seg = gl_InstanceID, s = seg / ${Y-1}, k = seg - s * ${Y-1};
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
`,ta=$+He+`
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
`,ho=$+He+Mt+`
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
`,po=$+He+ao+`
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
`,oa=$+`
uniform sampler2D uT; uniform vec4 uR;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy / uR.x;
  vec3 c = texture(uT, uv).rgb;
  o = vec4(c, 1.);
}
`;function ze(v){let e=parseInt(v.slice(2,10),16)>>>0,x=parseInt(v.slice(10,18),16)>>>0,m=parseInt(v.slice(18,26),16)>>>0,g=parseInt(v.slice(26,34),16)>>>0;return()=>{e>>>=0,x>>>=0,m>>>=0,g>>>=0;let q=e+x|0;return e=x^x>>>9,x=m+(m<<3)|0,m=m<<21|m>>>11,g=g+1|0,q=q+g|0,m=m+q|0,(q>>>0)/4294967296}}const ie=(v,e)=>{let x=0;for(const g of e)x+=g[1];let m=v()*x;for(const g of e)if(m-=g[1],m<=0)return g[0];return e[e.length-1][0]};function aa(v,e){const x=new Float32Array(e*e*e);for(const[M,W]of[[4,.5],[8,.3],[16,.2]]){const R=new Float32Array(M*M*M);for(let _=0;_<R.length;_++)R[_]=v();const we=e/M,Pe=new Int32Array(e),D=new Int32Array(e),re=new Float32Array(e);for(let _=0;_<e;_++){const de=_/we,se=Math.floor(de),ve=de-se;Pe[_]=se%M,D[_]=(se+1)%M,re[_]=ve*ve*(3-2*ve)}for(let _=0;_<e;_++)for(let de=0;de<e;de++){const se=Pe[_]*M*M,ve=D[_]*M*M,le=Pe[de]*M,fe=D[de]*M,Oe=re[de],ct=re[_],it=(_*e+de)*e;for(let Ne=0;Ne<e;Ne++){const De=Pe[Ne],xt=D[Ne],lt=re[Ne],_e=Ze=>R[Ze+De]+(R[Ze+xt]-R[Ze+De])*lt,Qe=_e(se+le)+(_e(se+fe)-_e(se+le))*Oe,Ue=_e(ve+le)+(_e(ve+fe)-_e(ve+le))*Oe;x[it+Ne]+=(Qe+(Ue-Qe)*ct)*W}}}let m=1e9,g=-1e9;for(let M=0;M<x.length;M++){const W=x[M];W<m&&(m=W),W>g&&(g=W)}const q=new Uint8Array(x.length),y=255/(g-m);for(let M=0;M<x.length;M++)q[M]=(x[M]-m)*y;return q}const gt=(v,e,x)=>{v=Math.abs(v),e=Math.abs(e),x=Math.abs(x);let m=v>e?v:e;if(x>m&&(m=x),m===1/0)return 1/0;if(v!==v||e!==e||x!==x)return NaN;if(m===0)return 0;let g=0,q=0,y=v/m,M=y*y,W=M;return q=W-g-M,g=W,y=e/m,M=y*y-q,W=g+M,q=W-g-M,g=W,y=x/m,M=y*y-q,W=g+M,q=W-g-M,g=W,Math.sqrt(g)*m},Rt=(v,e,x)=>{const m=Math.max(0,Math.min(1,(x-v)/(e-v)));return m*m*(3-2*m)},Q=(v,e)=>{const x=Math.abs(v),m=.0018*v*v/(1+x/220)*(v<0?1:.78),g=Math.exp(-Math.pow(e/(420+x*.55),2)),q=Math.max(-e-6,0),y=-1450*(1-Math.exp(-q*q/(q+60)/2e3)),M=Math.max(e-8,0),W=-520*(1-Math.exp(-M*M/(M+40)/700)),R=Math.exp(-Math.pow((e+19+3*Math.sin(v/7.3))/4.5,2))*Rt(70,25,x)*(.3+1.5*Rt(.15,.8,.5+.5*Math.sin(v/8.1+2)*Math.sin(v/3.7+.5)));return m*g+(e<0?y:W)+R};function sa(v){const e=(x,m)=>{let g=Math.imul(x,374761393)+Math.imul(m,668265263)+v|0;return g=Math.imul(g^g>>>13,1274126177),((g^g>>>16)>>>0)/4294967296};return(x,m)=>{const g=Math.floor(x),q=Math.floor(m),y=x-g,M=m-q,W=y*y*(3-2*y),R=M*M*(3-2*M),we=e(g,q),Pe=e(g+1,q),D=e(g,q+1),re=e(g+1,q+1);return we+(Pe-we)*W+(D-we)*R+(we-Pe-D+re)*W*R}}eo.add({num:551,name:"Prayer Flags",fam:"Vistas",recipe:"A high pass with strings of five-colour flags running from a stone cairn, flapping like real cloth, with snowy peaks behind. How the strings are hung, the wind and how old the flags are change every mint, and sometimes there's a sea of cloud below. Tap a string to send a gust down it, drag sideways to turn the wind, or hold to bring a cloud bank boiling up through the pass.",interactive:"Tap a string of flags to send a gust running down it; drag sideways to turn the wind, so the strings swing round and the summit plume swings with it; hold to bring a cloud bank boiling up the valley and through the pass.",music:!0,gl:!0,fps:30,seed:0,make(v){const e=v.gl,x=v.size,m=ze(v.hash),g=!!v.home,q=ze("0x"+v.hash.slice(50,66)+v.hash.slice(18,34)+v.hash.slice(2,18)+v.hash.slice(34,50));for(let t=0;t<8;t++)q();const y=[];for(let t=0;t<16;t++)y.push(q());const M=t=>()=>y[t],W=ze("0x"+v.hash.slice(18,34)+v.hash.slice(50,66)+v.hash.slice(34,50)+v.hash.slice(2,18));for(let t=0;t<10;t++)W();const R=[];for(let t=0;t<16;t++)R.push(W());const we=t=>()=>R[t],Pe=0,D=Pe?{}[v.hash.slice(2,10)]||{}:{},re=g?"fan":D.lay?D.lay:ie(we(0),[["fan",.46],["gate",.27],["span",.19],["old",.08]]),_=g?"as now":D.flk?D.flk:ie(we(1),[["as now",.47],["large",.16],["small",.14],["mixed",.18],["white",.05]]),de=!g&&(()=>{const t=ze("0x"+v.hash.slice(34,66)+v.hash.slice(2,34));for(let o=0;o<8;o++)t();return ie(t,[["Clear",.88],["Storm light",.12]])==="Storm light"})(),se=D.hour?D.hour:g||de||D.storm?"Bright morning":ie(M(0),[["Bright morning",.62],["Dawn alpenglow",.12],["Golden evening",.14],["Blue dusk",.08],["Moonlit",.035]]),ve=g?"Clear":D.wx?D.wx:ie(M(1),[["Clear",.8],["High cirrus",.2]]);let le=g?5:ie(m,[[3,.1],[4,.3],[5,.35],[6,.25]]),fe=g?"Steady":ie(m,[["Breeze",.25],["Steady",.45],["Gale",.22],["Jet stream",.08]]);D.nStr&&(le=D.nStr),D.wind&&(fe=D.wind);const Oe=ze("0x"+v.hash.slice(34,66)+v.hash.slice(2,34));for(let t=0;t<6;t++)Oe();g||m();const ct=g?"Sun-faded":ie(Oe,[["New",.32],["Sun-faded",.4],["Tattered",.28]]);let it=g?"Morning":ie(m,[["Morning",.5],["High sun",.32],["Early low sun",.18]]);D.light&&(it=D.light);const Ne=g?"Pyramid":ie(m,[["Pyramid",.45],["Twin summits",.33],["Great wall",.22]]),De=g?"Dry season":ie(m,[["Dry season",.5],["Fresh snow",.38],["Deep winter",.12]]),xt=De==="Deep winter"?"Frozen":g?"Turquoise":ie(m,[["Turquoise",.6],["Jade",.4]]),lt=Math.max(3,Math.min(5,le)),_e=le<5?1:2,Qe=g||De==="Deep winter"?"gravel":D.grd?D.grd:ie(we(3),[["gravel",.4],["slate",.2],["shale",.2],["granite",.2]]);v.trait("Strings",re==="fan"?String(le+1):re==="gate"?lt+" · gate":re==="span"?_e+" · long span":re==="old"?le+1+" · old site":String(le+1)),v.trait("Wind",fe),v.trait("Flags",_==="as now"?ct:_==="white"?"White":_==="mixed"?"Mixed ages":ct+" · "+_),v.trait("Light",se==="Bright morning"?it:se),v.trait("Range",Ne),v.trait("Snow",Qe==="gravel"?De:De+" · "+{slate:"slate scree",shale:"ochre shale",granite:"granite"}[Qe]);const Ue=ze("0x"+v.hash.slice(2).split("").reverse().join(""));Ue(),Ue(),Ue();const Ze=g?"Across the pass":ie(Oe,[["Across the pass",.42],["Under the strings",.32],["Above the lake",.26]]),na=Ze==="Above the lake"?y[2]<.4?"Close on one string":y[2]<.7?"Across the pass":"Under the strings":Ze,kt=!g&&D.view?D.view:!g&&y[3]<.16?y[4]>.5?"Lying under the fan":"Close on one string":na,Le=!g&&!de&&!D.storm&&(D.sea||R[2]<.09),Ce=re==="gate"?"Through the gate":re==="span"||Le&&(kt==="Under the strings"||kt==="Lying under the fan")?"Across the pass":kt;v.trait("View",Ce);const uo=g?"Clear":ie(Oe,[["Clear",.88],["Storm light",.12]])==="Storm light"||D.storm?"Storm light":"Clear",me=uo==="Storm light";v.trait("Sky",me?uo:Le?ve==="High cirrus"?"Cloud sea · cirrus":"Cloud sea":ve);const et={Breeze:5.5,Steady:9,Gale:14,"Jet stream":11}[fe],ra={Breeze:.45,Steady:.5,Gale:.6,"Jet stream":.55}[fe],vo={Breeze:.5,Steady:1,Gale:1.4,"Jet stream":2.6}[fe],ca={New:.08,"Sun-faded":.55,Tattered:.8}[ct],[mo,St,zt]={Morning:[56,31,0],"High sun":[32,52,-.05],"Early low sun":[74,15,.35]}[it],bt={Pyramid:0,"Twin summits":1,"Great wall":2}[Ne],ia={"Dry season":850,"Fresh snow":350,"Deep winter":-150}[De],go={"Dry season":-.4,"Fresh snow":.3,"Deep winter":.8}[De],ge=()=>m()*2-1,Pt=m()*50,Nt=m()*50,Ee=[2300+ge()*2200,-14e3+ge()*1500,2300+m()*500],Te=[400+ge()*400,2300+ge()*250],xo=650+m()*200,bo=Q(Te[0],Te[1])-230*(.5+m()*.1),la=ge()*400,z=Math.PI/180,X=[Math.sin(mo*z)*Math.cos(St*z),Math.sin(St*z),-Math.cos(mo*z)*Math.cos(St*z)];let tt=[3.1*(1+zt*.1),3*(1-zt*.05),2.85*(1-zt*.3)];const Z={gAmb:0,expo:.62,glow:.25,belt:0,esh:0,litAlt:-1e6,flagSun:1,bounce:1,shK:.74,starK:0,sky:null};{const t=y[9]<.5?-1:1,o=(s,a,r,c)=>{const p=s*z,d=a*z;X[0]=Math.sin(p)*Math.cos(d),X[1]=Math.sin(d),X[2]=-Math.cos(p)*Math.cos(d),tt=r,Object.assign(Z,c)};se==="Dawn alpenglow"&&o(t*(115+y[10]*45),3+y[11]*2,[1.7,.72,.4],{gAmb:1.6,expo:1.15,glow:.55,belt:.1,esh:.55,litAlt:1300+y[12]*900,flagSun:0,bounce:.45,shK:0,sky:[[.02,.04,.11],[.27,.27,.34],[.46,.37,.38],[.085,.105,.17]]}),se==="Golden evening"&&o(42+y[10]*20,8.5+y[11]*3.5,[3.3,1.95,.95],{expo:.72,glow:.7,belt:.04,shK:.8,sky:[[.02,.055,.2],[.36,.4,.52],[.7,.55,.45],[.08,.1,.17]]}),se==="Blue dusk"&&o(t*(55+y[10]*40),1,[.1,.05,.035],{gAmb:2.2,expo:2,glow:1.6,esh:.3,bounce:.25,shK:0,starK:.25,sky:[[.008,.02,.07],[.1,.12,.21],[.36,.22,.17],[.05,.06,.11]]}),se==="Moonlit"&&o(t*(15+y[10]*130),30+y[11]*25,[.26,.29,.36],{expo:2.1,glow:.1,bounce:.2,shK:.3,starK:1,sky:[[.004,.007,.02],[.012,.018,.035],[.02,.025,.04],[.012,.016,.03]]})}const J=[-6.9+ge()*.5,-4.3+ge()*.5],yt=(1.9+m()*.25)*.82,wt=(1.15+m()*.3)*.85,Ge=[J[0],Q(J[0],J[1])+4.7+m()*.4,J[1]],fa=[[13,-15,3.2],[5.5,-27,-1],[9,7,3.6],[-15,6,-1],[-12,-22,-1],[-1,16,3],[3,-3.6,-1]],ha=le===3?[6,0,2,4]:le===4?[6,0,1,2,4]:le===5?[6,0,1,2,3,4]:[6,0,1,2,3,4,5],Ae=[[J[0],J[1],Q(J[0],J[1])+wt*.5,Ge[1]-Q(J[0],J[1])-wt*.5+.25]],O=[];for(const t of ha){const o=fa[t],s=t===6?.4:1.5,a=o[0]+ge()*s,r=o[1]+ge()*s,c=Q(a,r);let p;if(o[2]>0){const d=o[2]+m()*.4;Ae.push([a,r,c-.1,d+.1]),p=[a,c+d-.05,r]}else Ae.push([a,r,c,-1]),p=[a,c+.62,r];O.push({a:g?Ge.slice():[Ge[0],Ge[1]-(t*.37+y[12])%1*.16,Ge[2]],b:p,gnd:o[2]<=0})}if(re==="span"){Ae.length=1,O.length=0;for(let t=0;t<_e;t++){const o=t?-2-R[5]*8:14+R[5]*10,s=-31-(R[6]*7.1+t*.43)%1*9,a=Q(o,s);Ae.push([o,s,a,-1]),O.push({a:[Ge[0],Ge[1]-t*.22,Ge[2]],b:[o,a+.62,s],gnd:!0,slack:1.012+R[7]*.008,sm:.8})}}if(re==="old"){const t=O.map((o,s)=>s).filter(o=>o>0).slice(0,4);for(let o=0;o<2&&t.length;o++){const s=t.splice(Math.floor((R[4]*7.3+o*.41)%1*t.length),1)[0],a=O[s],r=.55+R[5]*.15,c=a.a[0]+(a.b[0]-a.a[0])*r,p=a.a[2]+(a.b[2]-a.a[2])*r;a.b=[c,Q(c,p)+.12,p],a.gnd=!0,a.broken=!0;const d=Math.hypot(c-a.a[0],p-a.a[2]),n=a.a[1]-Q(a.a[0],a.a[2]);a.slack=(n*.85+d*1.04)/Math.hypot(d,a.a[1]-a.b[1])}}let Et=null,xe=null;if(re==="gate"){Et=(R[13]-.5)*.3;const t=h=>Et+1.3+.17*h+.4*Math.sin(h/5.3),o=5.5+R[4]*3,s=t(o)+(R[5]-.5)*.6,a=(-4+R[6]*16)*z,r=5.5+R[7]*2,c=9+R[8]*3,p=(R[9]<.5?-1:1)*(1.4+R[9]*9.3%1*1.6),d=Math.sin(a),n=-Math.cos(a),b=Math.cos(a),k=Math.sin(a),C=s+d*r+b*p,N=o+n*r+k*p,F=[[C-b*c/2,N-k*c/2],[C+b*c/2,N+k*c/2]];Ae.length=0,O.length=0;const w=[],i=[];for(let h=0;h<lt;h++){const T=3+h*2.5/(lt-1)+(R[14]*7.3+h*.37)%1*.25;i.push([T,T+((R[15]*5.1+h*.61)%1-.5)*.7])}for(let h=0;h<2;h++){const T=Q(F[h][0],F[h][1]);let A=0;for(const S of i)A=Math.max(A,S[h]);Ae.push([F[h][0],F[h][1],T-.1,A+.45]),w.push(T)}for(const h of i)O.push({a:[F[0][0],w[0]+h[0],F[0][1]],b:[F[1][0],w[1]+h[1],F[1][1]],gnd:!1,slack:1.006+R[10]*.006});for(let h=0;h<2;h++){const T=h?1:-1,A=F[h][0]+b*T*2.4+d*1.6,S=F[h][1]+k*T*2.4+n*1.6,I=Q(A,S);Ae.push([A,S,I,-1]),O.push({a:[F[h][0],w[h]+Ae[h][3]-.25,F[h][1]],b:[A,I+.3,S],gnd:!0,noFl:!0,slack:1.003})}xe={ex:s,ez:o,g:a,wa:a+Math.PI+(R[10]<.5?-1:1)*(62+R[11]*7.7%1*14)*z}}const Ve=O.length,ft=new Float32Array(32*14*4),yo=[],wo=[];let be=0;const ht=.25,Dt=.065,Eo=_==="small"?.68:xe?_==="large"?2.25:1.7:_==="large"?2.05:1;let _t=_==="small"?.5:1;if(_==="small"){let t=0;for(const s of O)s.noFl||(t+=Math.hypot(s.b[0]-s.a[0],s.b[1]-s.a[1],s.b[2]-s.a[2])*1.022-(s.gnd?2.9:.9));const o=t/(Je*.93)/Eo;_t=Math.max(_t,(o-ht*1)/(Dt*1.1))}const pa=Math.floor(R[12]*13.1%1*O.filter(t=>!t.noFl).length);for(let t=0;t<Ve;t++){const o=O[t],s=Math.hypot(o.b[0]-o.a[0],o.b[1]-o.a[1],o.b[2]-o.a[2]);o.len=s*(o.slack||1.022),o.seg=o.len/(Y-1);const a=(.92+m()*.2)*Eo*(o.sm&&_!=="large"?o.sm:1);o.scale=a;const r=_==="white"?1e3:_==="mixed"?t===pa?2e3:t%2?3e3:4e3:0,c=(ht+Dt)*a;let p=.45,d=Math.floor(m()*5);for(;!o.noFl&&p+ht*a<o.len-(o.broken?.3:o.gnd?2.4:.45)&&be<Je;){const n=(Math.sin(be*12.9898+t*78.233+a*37.719)*43758.5453%1+1)%1,b=(Math.sin(be*39.3468+t*11.135+a*83.155)*24634.6345%1+1)%1,k=a*(.85+n*.3);ft.set([t,p,d%5+5*Math.floor(m()*100+1)+r,k],be*4),yo.push(t),wo.push(p+ht*k*.5),be++,d++,p+=ht*k+Dt*a*(.45+b*1.3)*_t}}const ua={bake:{},march:{uHF:0,uHN:1,uSC:2,uN2:3,uPL:4,uCM:5},shade:{uHF:0,uHN:1,uSC:2,uN2:3,uPL:4,uCM:5,uG:6,uCA:7},shadeP:{uHF:0,uHN:1,uSC:2,uN2:3,uPL:4,uCM:5,uG:6,uCA:7},shadeW:{uHF:0,uHN:1,uSC:2,uN2:3,uPL:4,uCM:5,uG:6,uCA:7},cb:{uN2:0,uCM:1},sim:{uP:0,uQ:1,uFI:2,uST:3,uGU:4,uN3:5},flag:{uP:0,uFI:1,uSh:2},shad:{uP:0,uFI:1},fog:{uSc:0,uN3:1},comp:{uSc:0,uFg:1,uSh:2,uN3:3,uCl:4},str:{uST:0},copy:{uT:0}},l=e.__c551||(e.__c551=(()=>{e.getExtension("KHR_parallel_shader_compile");const t=(u,E)=>{const H=e.createShader(E);return e.shaderSource(H,u),e.compileShader(H),H},o=t(Yo,e.VERTEX_SHADER),s=t(co,e.VERTEX_SHADER),a=t(ea,e.VERTEX_SHADER),r={march:[o,Jo],shade:[o,Qo],shadeP:[o,Zo],bake:[o,no],cb:[o,$o],sim:[o,ro],comp:[o,po],copy:[o,oa],flag:[s,fo],shad:[s,lo],str:[a,ta]},c={};let p=ho,d=$+`#define WATER
`+rt;for(const u in r){const E=e.createProgram(),H=t(r[u][1],e.FRAGMENT_SHADER);e.attachShader(E,r[u][0]),e.attachShader(E,H),(u==="flag"||u==="shad")&&e.bindAttribLocation(E,0,"aF"),e.linkProgram(E),c[u]={p:E,f:H,v:r[u][0]}}e.flush();const n={};n.n3=e.createTexture(),e.bindTexture(e.TEXTURE_3D,n.n3),e.texImage3D(e.TEXTURE_3D,0,e.R8,32,32,32,0,e.RED,e.UNSIGNED_BYTE,aa(ze("0x5510c0ffee5510c0ffee5510c0ffee5510c0ffee"),32)),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const u of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,u,e.REPEAT);const b=ze("0x551a11ce551a11ce551a11ce551a11ce551a11ce"),k=new Uint8Array(256*256*4);for(let u=0;u<k.length;u++)k[u]=b()*256;const C=n.fl=!!e.getExtension("EXT_color_buffer_float");e.getExtension("OES_texture_float_linear");const N=n.hfl=C||!!e.getExtension("EXT_color_buffer_half_float");if(n.ui=!C,n.sui=!N,!C){const u=(U,oe,pe)=>{if(U.split(oe).length!==2)throw new Error("551 ui: "+oe);return U.split(oe).join(pe)},E=U=>u(u(U,"out vec4 o;","out uvec4 oU; vec4 o;"),"void main() {","void main0() {")+`
void main() { main0(); oU = floatBitsToUint(o); }
`,H=`uniform highp usampler2D uSc;
vec4 scT(vec2 uv) { ivec2 s = textureSize(uSc, 0); return uintBitsToFloat(texelFetch(uSc, clamp(ivec2(uv * vec2(s)), ivec2(0), s - 1), 0)); }
`,ee=(U,oe,pe)=>{c[U]&&e.deleteProgram(c[U].p);const ue=e.createProgram(),ke=t(pe,e.FRAGMENT_SHADER);e.attachShader(ue,oe),e.attachShader(ue,ke),(U==="flag"||U==="shad")&&e.bindAttribLocation(ue,0,"aF"),e.linkProgram(ue),c[U]={p:ue,f:ke,v:oe}};let ce=u(ro,"uniform sampler2D uP, uQ, uFI, uST, uGU;","uniform highp usampler2D uP, uQ; uniform sampler2D uFI, uST, uGU;");ce=u(u(ce,"texelFetch(uP, c, 0).xyz","uintBitsToFloat(texelFetch(uP, c, 0)).xyz"),"texelFetch(uQ, pc, 0).xyz","uintBitsToFloat(texelFetch(uQ, pc, 0)).xyz");let B=co.split("texelFetch(uP, ").join("fP(");B=u(B,"uniform sampler2D uP, uFI;",`uniform highp usampler2D uP; uniform sampler2D uFI;
vec4 fP(ivec2 c, int l) { return uintBitsToFloat(texelFetch(uP, c, l)); }`);const ne=t(B,e.VERTEX_SHADER);if(ee("sim",o,E(ce)),ee("flag",ne,fo),ee("shad",ne,lo),!N){let U=u(rt,"uniform sampler2D uHF, uHN, uSC, uN2, uPL;","uniform highp usampler2D uHF, uHN; uniform sampler2D uSC, uN2, uPL;");U=u(U,"float hMap(sampler2D s, vec2 uv) { vec2 v = textureLod(s, uv, 0.).rg; return v.x + v.y; }",`vec2 hT(highp usampler2D s, ivec2 i, ivec2 n) { return uintBitsToFloat(texelFetch(s, clamp(i, ivec2(0), n - 1), 0).rg); }
float hMap(highp usampler2D s, vec2 uv) { ivec2 n = textureSize(s, 0); vec2 x = uv * vec2(n) - .5, f = fract(x); ivec2 i = ivec2(floor(x));
  vec2 v = mix(mix(hT(s, i, n), hT(s, i + ivec2(1, 0), n), f.x), mix(hT(s, i + ivec2(0, 1), n), hT(s, i + ivec2(1, 1), n), f.x), f.y); return v.x + v.y; }`),ee("march",o,E($+`#define MARCH
`+U)),U=u(u(U,"uniform sampler2D uG, uCA;","uniform highp usampler2D uG; uniform sampler2D uCA;"),"texelFetch(uG, ivec2(gl_FragCoord.xy), 0)","uintBitsToFloat(texelFetch(uG, ivec2(gl_FragCoord.xy), 0))"),ee("shade",o,E($+`#define LAND
`+U)),ee("shadeP",o,E($+`#define POLEP
`+U)),d=E($+`#define WATER
`+U),p=u(u(ho,"uniform sampler2D uSc;",H),"textureLod(uSc, uv, 0.)","scT(uv)"),ee("comp",o,u(u(po,"uniform sampler2D uSc, uFg, uCl;",H+"uniform sampler2D uFg, uCl;"),"textureLod(uSc, uv, 0.)","scT(uv)")),ee("bakeU",o,E(no))}e.flush()}const F=u=>{if(!e.getProgramParameter(c[u].p,e.LINK_STATUS))throw new Error("551 "+u+": "+e.getShaderInfoLog(c[u].f)+e.getShaderInfoLog(c[u].v)+e.getProgramInfoLog(c[u].p));const E=c[u].p,H={p:E};c[u]=H;const ee=e.getProgramParameter(E,e.ACTIVE_UNIFORMS);for(let B=0;B<ee;B++){const ne=e.getActiveUniform(E,B).name.replace("[0]","");H[ne]=e.getUniformLocation(E,ne)}const ce=ua[u];e.useProgram(E);for(const B in ce)H[B]&&e.uniform1i(H[B],ce[B])};for(const u in c)u!=="fog"&&F(u);n.fogPending=null,n.readyFog=()=>F("fog"),n.buildFog=()=>{const u=e.createProgram(),E=t(p,e.FRAGMENT_SHADER);e.attachShader(u,o),e.attachShader(u,E),e.linkProgram(u),e.flush(),c.fog={p:u,f:E,v:o},n.fogPending=c.fog},n.pcx=e.getExtension("KHR_parallel_shader_compile");let w=null,i=!1;n.swReady=()=>{if(i)return!0;if(!w){const u=e.createProgram(),E=t(d,e.FRAGMENT_SHADER);return e.attachShader(u,o),e.attachShader(u,E),e.linkProgram(u),e.flush(),c.shadeW=w={p:u,f:E,v:o},!1}return n.pcx&&!e.getProgramParameter(w.p,n.pcx.COMPLETION_STATUS_KHR)?!1:(F("shadeW"),i=!0,!0)},n.swForce=()=>{w||n.swReady(),i||(F("shadeW"),i=!0)};const h=(u,E,H,ee,ce,B,ne,U)=>{const oe=e.createTexture();return e.bindTexture(e.TEXTURE_2D,oe),e.texImage2D(e.TEXTURE_2D,0,H,u,E,0,ee,ce,U||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,B),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,B===e.LINEAR_MIPMAP_LINEAR?e.LINEAR:B),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,ne),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,ne),oe},T=(u,E)=>{const H=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,H),u&&e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,u,0),E&&e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,E,0),H};n.tex=h,n.fbo=T,n.n2=h(256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT,k),n.vao=e.createVertexArray(),n.P=c,n.sc=h(512,512,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT),e.bindVertexArray(n.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.useProgram(c.bake.p);{const u=T(n.sc);e.viewport(0,0,512,512),e.uniform4fv(c.bake.uB,new Float32Array([2,512,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(u)}e.bindTexture(e.TEXTURE_2D,n.sc),e.generateMipmap(e.TEXTURE_2D),n.cm=h(512,512,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),n.ca=h(512,512,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),e.useProgram(c.cb.p),e.viewport(0,0,512,512),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,n.n2);{const u=T(n.cm);e.uniform4f(c.cb.uQ,0,0,0,0),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(u)}e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,n.cm),e.activeTexture(e.TEXTURE0);{const u=T(n.ca);e.uniform4f(c.cb.uQ,1,0,0,0),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(u)}e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0);const A=N?e.RG16F:e.RG32UI,S=N?e.RG:e.RG_INTEGER,I=N?e.HALF_FLOAT:e.UNSIGNED_INT,j=N?e.LINEAR:e.NEAREST;return n.hf=h(1024,1024,A,S,I,j,e.CLAMP_TO_EDGE),n.hn=h(512,512,A,S,I,j,e.CLAMP_TO_EDGE),n.fHF=T(n.hf),n.fHN=T(n.hn),n.HFm=[A,S,I,j],n.SM=1280,n.shD=h(n.SM,n.SM,e.DEPTH_COMPONENT16,e.DEPTH_COMPONENT,e.UNSIGNED_SHORT,e.NEAREST,e.CLAMP_TO_EDGE),n.fSh=T(null,n.shD),n.FR=288,n.fg=h(n.FR,n.FR,N?e.RGBA16F:e.RGBA8,e.RGBA,N?e.HALF_FLOAT:e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),n.fFg=T(n.fg),n.comp={},n.owner=null,e.bindFramebuffer(e.FRAMEBUFFER,null),n})()),L=l.P,To=l.comp[x]||(l.comp[x]=(()=>{const t=l.tex(x,x,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),o=l.tex(x,x,e.DEPTH_COMPONENT24,e.DEPTH_COMPONENT,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE);return{t,d:o,f:l.fbo(t,o)}})()),pt={},Ut=l.sui?l.tex(x,x,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE):l.tex(x,x,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST,e.CLAMP_TO_EDGE),da=l.fbo(Ut),Ke=[],Lt=[];for(let t=0;t<4;t++)Ke.push(l.ui?l.tex(Xe,nt,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE):l.tex(Xe,nt,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE)),Lt.push(l.fbo(Ke[t]));const Ao=l.tex(32,14,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,ft),Ie=new Float32Array(32*8*4),Ct=l.tex(32,8,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,Ie),he=16,Tt=new Uint8Array(he*he),Gt=l.tex(he,he,e.R8,e.RED,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE,Tt),Fo=new Float32Array(8*4);Ae.forEach((t,o)=>Fo.set(t,o*4));const va=l.tex(8,1,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,Fo);let je=3*z,Be=.5*z,Fe=0,Me=0,ut=1.6,ot=Math.tan(33*z);if(Ce==="Across the pass"&&!g&&(je=(-18+y[14]*30)*z,Fe=(y[15]-.5)*8,Me=(y[14]*13.7+y[15]*5.3)%1*3),Le&&Ce==="Across the pass"&&(Be=-3.5*z),xe&&(Fe=xe.ex,Me=xe.ez,je=xe.g+(R[11]-.5)*6*z,Be=(7+R[12]*4)*z,ot=Math.tan(30*z)),Ce==="Lying under the fan"){const t=se!=="Dawn alpenglow"&&se!=="Blue dusk"&&!me;let o;if(t)o=Math.atan2(X[0],-X[2])+Math.PI+(y[5]-.5)*30*z;else{let p=0,d=0;for(const n of O){const b=n.b[0]-J[0],k=n.b[2]-J[1],C=Math.hypot(b,k);p+=b/C,d+=k/C}o=Math.atan2(p,-d)+(y[5]-.5)*.7}const s=3.2+y[6]*1;Fe=J[0]+Math.sin(o)*s,Me=J[1]-Math.cos(o)*s,ut=.45,je=o+Math.PI+(y[7]-.5)*(t?24:14)*z,t&&(je+=(R[13]-.5)*20*z);const a=Q(Fe,Me)+ut,r=Q(J[0],J[1]);let c=-1;for(let p=0;p<yt*1.1;p+=.1){const d=Math.max(0,1-p/yt),n=r+wt*1.1*d*d*(3-2*d);c=Math.max(c,Math.atan2(n-a,s-p))}Be=t?c+35*z:Math.atan2(Ge[1]-a,s)+y[8]*4*z}const P={fw:[0,0,-1],rt:[1,0,0],up:[0,1,0],eye:[0,1.6,0],key:""},Ye=new Float32Array(48);let It=me?[.05,.058,.075]:[.016,.062,.25],Bt=me?[.2,.215,.24]:[.3,.46,.78],qt=me?[.36,.37,.385]:[.55,.66,.84],At=me?[.075,.085,.105]:[.105,.15,.26];if(Z.sky){const t=.62/Z.expo*(se==="Golden evening"?1:.7);[It,Bt,qt,At]=me?[It,Bt,qt,At].map((o,s)=>o.map((a,r)=>a*t*(s===2?Z.sky[2][r]/Z.sky[1][r]*.5+.5:1))):Z.sky}const dt=new Float32Array(48),Mo=()=>{const t=v.view||jo,o=je+(t.yaw||0),s=Math.max(-1.25,Math.min(1.25,Be+(t.pitch||0))),a=Fe+Math.max(-3,Math.min(3,t.x||0)),r=Me+Math.max(-3,Math.min(3,t.z||0)),c=Q(a,r)+ut+Math.max(-1,Math.min(1.5,t.y||0)),p=[o,s,a,c,r].map(N=>N.toFixed(4)).join();if(p===P.key)return!1;P.key=p;const d=Math.cos(s),n=[Math.sin(o)*d,Math.sin(s),-Math.cos(o)*d];let b=[-n[2],0,n[0]];const k=Math.hypot(b[0],b[2]);b=[b[0]/k,0,b[2]/k];const C=[b[1]*n[2]-b[2]*n[1],b[2]*n[0]-b[0]*n[2],b[0]*n[1]-b[1]*n[0]];return P.fw=n,P.rt=b,P.up=C,P.eye=[a,c,r],!0};let Ro=null;const Ht=t=>{if(Ro===P.key){Ye[24]=dt[24]=t;return}Ro=P.key,Ye.set([...P.eye,ot,...P.fw,0,...P.rt,0,...P.up,0,...X,0,...tt,Z.expo,t,Z.litAlt,0,0,...It,Z.belt,...Bt,Z.esh,...qt,0,...At,0,x,Z.glow,Z.bounce,0]),Ye[43]=Z.gAmb,dt.set(Ye);for(let o=20;o<23;o++)dt[o]*=Z.flagSun},Re=new Float32Array([0,0,0,0,bt,Ee[0],Ee[1],Ee[2],Pt,Nt,Te[0],Te[1],bo,xo,la,go,0,0,0,0]),Wt={gravel:[[1,1,1],[1,1,1],1],slate:[[.6,.64,.76],[1.2,1.17,1.1],.85],shale:[[1.32,.98,.68],[1.22,.96,.7],1],granite:[[1.42,1.4,1.36],[1.3,1.28,1.24],2.2]}[Qe],ma=new Float32Array([Ae.length,bt,ia,go,J[0],J[1],yt,xe?0:wt,Te[0],Te[1],xo,bo,xt==="Frozen"?1:0,xt==="Jade"?.3:1,Et===null?ge()*.3:(ge(),Et),Ce==="Under the strings"?1:0,me?1:0,Pt*.37,Nt*.41,!me&&ve==="Fair cumulus"?.5:0,xe?1:0,...Wt[0],Wt[2],...Wt[1]]),ye=me?{k:"st",kind:3,sc:.1,dr:9e-4,a:0,sun:.3}:ve==="High cirrus"?{k:"ci",kind:2,sc:.11,dr:4e-4,a:.42,sun:1.1}:null;let Ft=null;if(ye){const t=ze("0x"+v.hash.slice(26,58)),o=256,s={},a=(i,h)=>{const T=i+"x"+h;if(s[T])return s[T];const A=new Float32Array(i*h);for(let S=0;S<A.length;S++)A[S]=t();return s[T]={a:A,px:i,pz:h}},r=(i,h,T)=>{const A=h*i.px,S=T*i.pz,I=Math.floor(A),j=Math.floor(S),u=A-I,E=S-j,H=u*u*(3-2*u),ee=E*E*(3-2*E),ce=(I%i.px+i.px)%i.px,B=(ce+1)%i.px,ne=(j%i.pz+i.pz)%i.pz,U=(ne+1)%i.pz,oe=i.a,pe=oe[ne*i.px+ce],ue=oe[ne*i.px+B],ke=oe[U*i.px+ce],mt=oe[U*i.px+B];return pe+(ue-pe)*H+(ke-pe)*ee+(pe-ue-ke+mt)*H*ee},c={st:[[4,4,.5],[8,8,.25],[16,16,.13],[32,32,.07],[64,64,.05]],ci:[[4,10,.45],[8,20,.27],[16,40,.15],[32,80,.09],[64,160,.04]]}[ye.k],p=y[13]<.5?1:-1,d=new Float32Array(o*o),n=new Uint8Array(o*o*2),b=a(4,4),k=a(5,5),C=c.map(i=>[a(i[0],i[1]),i[2]]),N=(i,h,T)=>{const A=Math.max(0,Math.min(1,(T-i)/(h-i)));return A*A*(3-2*A)};for(let i=0;i<o;i++)for(let h=0;h<o;h++){let T=h/o,A=i/o,S=0;if(ye.k==="ci"){const I=r(b,T,A)-.5,j=r(k,T,A)-.5;A+=j*.12,T+=I*.05+A*p}for(const I of C)S+=r(I[0],T,A)*I[1];d[i*o+h]=ye.k==="ci"?Math.max(0,Math.min(1,(S-.3)/.5))*N(.3,.6,r(b,T*3,A*3)):Math.max(0,Math.min(1,(S-.25)/.55))}const F=X[0]/(Math.hypot(X[0],X[2])||1),w=X[2]/(Math.hypot(X[0],X[2])||1);for(let i=0;i<o;i++)for(let h=0;h<o;h++){const T=d[i*o+h],A=(h+Math.round(F*6)+o)%o,S=(i+Math.round(w*6)+o)%o;n[(i*o+h)*2]=T*255,n[(i*o+h)*2+1]=Math.max(0,Math.min(1,.5+(T-d[S*o+A])*3.5))*255}e.activeTexture(e.TEXTURE15),Ft=l.tex(o,o,e.RG8,e.RG,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT,n),e.generateMipmap(e.TEXTURE_2D)}const ga=()=>{if(!l.hf){e.activeTexture(e.TEXTURE15);const[o,s,a,r]=l.HFm;l.hf=l.tex(1024,1024,o,s,a,r,e.CLAMP_TO_EDGE),l.hn=l.tex(512,512,o,s,a,r,e.CLAMP_TO_EDGE),l.fHF=l.fbo(l.hf),l.fHN=l.fbo(l.hn)}e.bindVertexArray(l.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST);const t=l.sui?L.bakeU:L.bake;e.useProgram(t.p),Re[0]=0,Re[1]=1024,Re[2]=to,Re[3]=7,e.bindFramebuffer(e.FRAMEBUFFER,l.fHF),e.viewport(0,0,1024,1024),e.uniform4fv(t.uB,Re),e.drawArrays(e.TRIANGLES,0,3),Re[1]=512,Re[2]=oo,Re[3]=11,e.bindFramebuffer(e.FRAMEBUFFER,l.fHN),e.viewport(0,0,512,512),e.uniform4fv(t.uB,Re),e.drawArrays(e.TRIANGLES,0,3),l.owner=pt},G=(t,o,s)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(o,s)},ko=()=>{(l.owner!==pt||!l.hf)&&ga(),l.bakeAt=l.tick||0,l.bakeBig=x>400,e.bindVertexArray(l.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.activeTexture(e.TEXTURE6);const t=l.sui?l.tex(x,x,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE):l.tex(x,x,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST,e.CLAMP_TO_EDGE);e.bindTexture(e.TEXTURE_2D,null);const o=l.fbo(t);e.viewport(0,0,x,x);const s=Math.hypot(Te[0]-P.eye[0],Te[1]-P.eye[2]),a=(P.fw[0]*(Te[0]-P.eye[0])+P.fw[2]*(Te[1]-P.eye[2]))/s>.2,r=[L.march,L.shade,L.shadeP];pt.needW=!1,a&&Ce==="Above the lake"&&l.swForce(),a&&(l.swReady()?r.push(L.shadeW):pt.needW=!0);for(const c of r){const p=c!==L.march;e.useProgram(c.p),e.bindFramebuffer(e.FRAMEBUFFER,p?da:o),e.uniform4fv(c.uC,Ye),e.uniform4fv(c.uW,ma),e.uniform4fv(c.uB,Re),G(0,e.TEXTURE_2D,l.hf),G(1,e.TEXTURE_2D,l.hn),G(2,e.TEXTURE_2D,l.sc),G(3,e.TEXTURE_2D,l.n2),G(4,e.TEXTURE_2D,va),G(5,e.TEXTURE_2D,l.cm),p&&(G(6,e.TEXTURE_2D,t),G(7,e.TEXTURE_2D,l.ca)),e.drawArrays(e.TRIANGLES,0,3)}G(6,e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(o),e.deleteTexture(t)},Xt=-80-90*(R[2]/.09),f={t:0,acc:0,wAng:(155+ge()*12)*z,wTarget:0,gust:sa(m()*1e9|0),taps:[[-1,0,-99,0],[-1,0,-99,0],[-1,0,-99,0]],tapI:0,nextAuto:.6+m()*1.6,snapT:0,fog:Le?1:0,lev:0,fogTop:Le?Xt:-1400,relTop:-1400,press:null,drag:null};f.pOff=xe?f.wAng-xe.wa:0,xe&&(f.wAng=xe.wa),f.wTarget=f.wAng;const So=()=>[Math.sin(f.wAng),-Math.cos(f.wAng)],Ot=70;let Vt=1;const Kt=(t,o,s,a)=>{const r=t*s+o*a,c=-t*a+o*s,p=f.gust((r-et*f.t*.95)/16,c/11+f.t*.03);return Math.max(.12,1+ra*Vt*(p*2-1)*1.5)},zo=(t,o)=>Kt(t,o,Math.sin(f.wAng),-Math.cos(f.wAng)),Po=()=>{const t=Math.sin(f.wAng),o=-Math.cos(f.wAng);for(let s=0;s<he;s++)for(let a=0;a<he;a++){const r=((a+.5)/he-.5)*Ot,c=((s+.5)/he-.5)*Ot;Tt[s*he+a]=Math.min(255,Kt(r,c,t,o)*127.5)}},jt=(t,o,s)=>{const a=f.t-t[2];if(t[0]!==o||a<0||a>5)return 0;const r=Math.abs(s-t[1])-a*9;return t[3]*Math.exp(-r*r/5)*Math.exp(-a*.5)*Math.min(1,a/.05)};for(const t of O){t.x=new Float64Array(Y*3),t.p=new Float64Array(Y*3);for(let o=0;o<Y;o++){const s=o/(Y-1),a=Math.sin(Math.PI*s)*(t.slack?Math.sqrt(3*t.len*(t.len-t.len/t.slack)/8):t.len*.085),r=[t.a[0]+(t.b[0]-t.a[0])*s,t.a[1]+(t.b[1]-t.a[1])*s-a,t.a[2]+(t.b[2]-t.a[2])*s];t.x.set(r,o*3),t.p.set(r,o*3)}}const No=t=>{const o=Math.sin(f.wAng),s=-Math.cos(f.wAng),a=f.taps[0],r=f.taps[1],c=f.taps[2];for(let p=0;p<Ve;p++){const d=O[p],n=d.x,b=d.p,k=d.seg,C=a[0]===p,N=r[0]===p,F=c[0]===p;for(let w=1,i=3;w<Y-1;w++,i+=3){const h=n[i],T=n[i+1],A=n[i+2];let S=(h-b[i])/t,I=(T-b[i+1])/t,j=(A-b[i+2])/t;const u=(C?jt(a,p,w*k):0)+(N?jt(r,p,w*k):0)+(F?jt(c,p,w*k):0),E=Kt(h,A,o,s)+u,H=o*et*E,ee=et*u*.5,ce=s*et*E;let B=n[i+3]-n[i-3],ne=n[i+4]-n[i-2],U=n[i+5]-n[i-1];const oe=gt(B,ne,U)||1;B/=oe,ne/=oe,U/=oe;let pe=H-S,ue=ee-I,ke=ce-j;const mt=pe*B+ue*ne+ke*U;pe-=B*mt,ue-=ne*mt,ke-=U*mt;const Ma=gt(pe,ue,ke),Zt=1-Math.exp(-.9*Ma*t);S+=pe*Zt,I+=ue*Zt-9.81*t,j+=ke*Zt,b[i]=h,b[i+1]=T,b[i+2]=A,n[i]=h+S*t*.995,n[i+1]=T+I*t*.995,n[i+2]=A+j*t*.995}for(let w=0;w<10;w++)for(let i=0,h=0;i<Y-1;i++,h+=3){const T=n[h+3]-n[h],A=n[h+4]-n[h+1],S=n[h+5]-n[h+2],I=gt(T,A,S)||1,j=(I-k)/I,u=i===0?0:i+1===Y-1?1:.5,E=i+1===Y-1?0:i===0?1:.5;n[h]+=T*j*u,n[h+1]+=A*j*u,n[h+2]+=S*j*u,n[h+3]-=T*j*E,n[h+4]-=A*j*E,n[h+5]-=S*j*E}for(let w=3;w<(Y-1)*3;w+=3){const i=Q(n[w],n[w+2])+.1;n[w+1]<i&&(n[w+1]=i)}}},Do=()=>{for(let t=0;t<Ve;t++){const o=O[t],s=o.x;for(let r=0,c=t*128;r<Y*3;r+=3,c+=4)Ie[c]=s[r],Ie[c+1]=s[r+1],Ie[c+2]=s[r+2];const a=(t*32+31)*4;Ie[a]=o.seg,Ie[a+1]=Y,Ie[a+2]=o.len,Ie[a+3]=0}e.bindTexture(e.TEXTURE_2D,Ct),e.texSubImage2D(e.TEXTURE_2D,0,0,0,32,8,e.RGBA,e.FLOAT,Ie)},Yt=new Float32Array(Xe*nt*4);{const[t,o]=So();for(let s=0;s<be;s++){const a=O[ft[s*4]],r=ft[s*4+3],c=ft[s*4+1],p=s%qe*te,d=Math.floor(s/qe)*ae;for(let n=0;n<ae;n++)for(let b=0;b<te;b++){const k=c+b*.25*r/(te-1),C=Math.min(Y-1.001,k/a.seg),N=Math.floor(C),F=C-N,w=a.x.subarray(N*3,N*3+3),i=a.x.subarray(N*3+3,N*3+6),h=n*.3*r/(ae-1);Yt.set([w[0]+(i[0]-w[0])*F+t*h*.75,w[1]+(i[1]-w[1])*F-h*.66,w[2]+(i[2]-w[2])*F+o*h*.75,1],((d+n)*Xe+p+b)*4)}}}for(let t=0;t<4;t++)e.bindTexture(e.TEXTURE_2D,Ke[t]),l.ui?e.texSubImage2D(e.TEXTURE_2D,0,0,0,Xe,nt,e.RGBA_INTEGER,e.UNSIGNED_INT,new Uint32Array(Yt.buffer)):e.texSubImage2D(e.TEXTURE_2D,0,0,0,Xe,nt,e.RGBA,e.FLOAT,Yt);let vt=0,$t=1;const xa=Math.ceil(be/qe)*ae,V=new Float32Array(28),ba={Breeze:.3,Steady:.34,Gale:.4,"Jet stream":.36}[fe],_o=[];for(let t=0;t<4;t++)for(let o=0;o<4;o++)_o.push([0,1,2,3].filter(s=>s!==t&&s!==o));const Uo=(t,o)=>{V[0]=0,V[1]=t,V[2]=f.t,V[3]=be,V[4]=Math.sin(f.wAng),V[5]=-Math.cos(f.wAng),V[6]=et,V[7]=ba,V[8]=.25/(te-1),V[9]=.3/(ae-1),V[10]=0,V[11]=0,V[12]=Ot,V[13]=0,V[14]=0,V[15]=0,V.set(f.taps[0],16),V.set(f.taps[1],20),V.set(f.taps[2],24),o&&(e.useProgram(L.sim.p),e.viewport(0,0,Xe,xa),G(2,e.TEXTURE_2D,Ao),G(3,e.TEXTURE_2D,Ct),G(4,e.TEXTURE_2D,Gt),G(5,e.TEXTURE_3D,l.n3));const s=_o[vt*4+$t],a=s[0],r=s[1];e.bindFramebuffer(e.FRAMEBUFFER,Lt[a]),G(0,e.TEXTURE_2D,Ke[vt]),G(1,e.TEXTURE_2D,Ke[$t]),e.uniform4fv(L.sim.uS,V),e.drawArrays(e.TRIANGLES,0,3),V[0]=1,e.uniform4fv(L.sim.uS,V);let c=a;e.activeTexture(e.TEXTURE0);for(let p=0;p<4;p++){const d=c===a?r:a;e.bindFramebuffer(e.FRAMEBUFFER,Lt[d]),e.bindTexture(e.TEXTURE_2D,Ke[c]),e.drawArrays(e.TRIANGLES,0,3),c=d}$t=vt,vt=c},Lo=e.createBuffer(),Co=e.createVertexArray();let Jt=!0;e.bindVertexArray(Co),e.bindBuffer(e.ARRAY_BUFFER,Lo),e.bufferData(e.ARRAY_BUFFER,Je*4,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,1,e.FLOAT,!1,0,0),e.vertexAttribDivisor(0,1),e.bindVertexArray(l.vao);const Go=new Float32Array(Je),Qt=new Float32Array(Je),Io=Array.from({length:be},(t,o)=>o),We=new Float32Array(8),at=new Float32Array(12),K=new Float32Array(20),Bo=new Float32Array(12);(()=>{const o=9/Math.max(X[1],.2),s=17+3/Math.max(X[1],.25);We.set([1-X[0]/X[1]*2,-7-X[2]/X[1]*2,s,l.SM,-12,o,0,0])})();const qo=t=>{const o=t?L.shad:L.flag;e.useProgram(o.p),e.bindVertexArray(Co),e.uniform4fv(o.uC,dt),e.uniform4fv(o.uFL,at),e.uniform4f(o.uMode,t?1:0,We[0],We[1],We[2]),e.uniform2f(o.uSR,We[4],We[5]),G(0,e.TEXTURE_2D,Ke[vt]),G(1,e.TEXTURE_2D,Ao),t||(G(2,e.TEXTURE_2D,l.shD),e.uniform4fv(o.uM,We)),e.drawArraysInstanced(e.TRIANGLES,0,(te-1)*(ae-1)*6*$e*$e,be),e.bindVertexArray(l.vao)},Ho=t=>{Ht(t),e.bindFramebuffer(e.FRAMEBUFFER,l.fSh),e.viewport(0,0,l.SM,l.SM),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.disable(e.BLEND),Jt&&(e.bindBuffer(e.ARRAY_BUFFER,Lo),e.bufferData(e.ARRAY_BUFFER,Go,e.DYNAMIC_DRAW),Jt=!1),Z.shK>0&&qo(!0),e.disable(e.DEPTH_TEST);let o=f.fog>.003;if(o&&!L.fog&&l.buildFog(),o&&l.fogPending&&(l.readyFog(),l.fogPending=null),o){e.bindVertexArray(l.vao),e.useProgram(L.fog.p),e.bindFramebuffer(e.FRAMEBUFFER,l.fFg),e.viewport(0,0,l.FR,l.FR);const[a,r]=So();Bo.set([f.fogTop,Math.min(1,f.fog*1.6),t,l.FR,a,r,et,0,Rt(-420,-40,f.relTop)*Math.min(1,f.fog*1.3),at[1],Le?.93*(1-f.lev):0,0]),e.uniform4fv(L.fog.uC,Ye),e.uniform4fv(L.fog.uF,Bo),G(0,e.TEXTURE_2D,Ut),G(1,e.TEXTURE_3D,l.n3),e.drawArrays(e.TRIANGLES,0,3)}e.bindVertexArray(l.vao),e.bindFramebuffer(e.FRAMEBUFFER,To.f),e.viewport(0,0,x,x),e.enable(e.DEPTH_TEST),e.depthFunc(e.ALWAYS),e.depthMask(!0),e.useProgram(L.comp.p);const s=f.wAng-62*z+f.pOff;K[0]=o?1:0,K[1]=Ft?1:0,K[2]=l.FR,K[3]=Z.shK,K[4]=Ee[0],K[5]=ya,K[6]=Ee[1],K[7]=vo*(me?1.8:1),K[8]=Math.sin(s),K[9]=-Math.cos(s),K[10]=fe==="Jet stream"?9e3:2600+vo*1400,K[11]=t,Ft&&(K[12]=ye.sc,K[13]=Math.sin(f.wAng)*ye.dr,K[14]=-Math.cos(f.wAng)*ye.dr,K[15]=ye.a,G(4,e.TEXTURE_2D,Ft)),K[16]=ye?ye.kind:0,K[17]=me?1:0,K[18]=Z.starK,K[19]=ye?ye.sun:1,e.uniform4fv(L.comp.uC,Ye),e.uniform4fv(L.comp.uK,K),e.uniform4fv(L.comp.uM,We),G(0,e.TEXTURE_2D,Ut),G(1,e.TEXTURE_2D,l.fg),G(2,e.TEXTURE_2D,l.shD),G(3,e.TEXTURE_3D,l.n3),e.drawArrays(e.TRIANGLES,0,3),e.depthFunc(e.LEQUAL),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.depthMask(!1),e.useProgram(L.str.p),e.uniform4fv(L.str.uC,dt),e.uniform4fv(L.str.uFL,at),e.uniform4f(L.str.uSD,x,Y,0,0),G(0,e.TEXTURE_2D,Ct),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Ve*(Y-1)),e.depthMask(!0),qo(!1),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,x,x),e.useProgram(L.copy.p),e.uniform4f(L.copy.uR,x,0,0,0),G(0,e.TEXTURE_2D,To.t),e.drawArrays(e.TRIANGLES,0,3)},ya=(()=>{const t=Ee[0],o=Ee[1];let s=wa(Ee)+Ea(o)*(2100+500*Math.sin(t/3900+1.3+Pt)+300*Math.sin(t/1700+Nt)+(bt===2?500:0))+Ee[2];return bt===1&&(s+=Ee[2]*.86*Math.pow(Math.max(0,1-Math.hypot(3400,900)/5200),1.6)),s+60})();function wa(t){const o=t[0],s=t[1],a=Math.abs(o),r=.0018*o*o/(1+a/220)*(o<0?1:.78),c=Math.exp(-Math.pow(s/(420+a*.55),2));return Q(t[0],t[1])+r*0}function Ea(t){const o=(s,a,r)=>{const c=Math.max(0,Math.min(1,(r-s)/(a-s)));return c*c*(3-2*c)};return o(-6200,-11500,t)*(1-.35*o(-17e3,-22e3,t))}const Wo=()=>{const t=P.eye;for(let o=0;o<be;o++){const s=O[yo[o]],a=Math.min(Y-1.001,wo[o]/s.seg),r=Math.floor(a),c=a-r,p=s.x,d=r*3;Qt[o]=gt(p[d]+(p[d+3]-p[d])*c-t[0],p[d+1]+(p[d+4]-p[d+1])*c-.15-t[1],p[d+2]+(p[d+5]-p[d+2])*c-t[2])}Io.sort((o,s)=>Qt[s]-Qt[o]);for(let o=0;o<be;o++)Go[o]=Io[o];Jt=!0};if(at.set([ca,0,0,0,.95*tt[0]*.55+.3,.95*tt[1]*.55+.36,.95*tt[2]*.55+.48,0,1,0,0,0]),Z.sky)for(let t=0;t<3;t++)at[4+t]=.5*tt[t]*.55+At[t]*2.8;const Xo=()=>{const t=f.fog>.003?Math.max(0,Math.min(1,(f.relTop+160)/220))*(.6+.4*Math.max(-1,Math.min(1,(zo(-1,-4)-1)*1.6))):0;at[1]=.028*t*Math.min(1,f.fog*1.4)},Ta=()=>{const t=v.input;for(const s of t.taps())f.press={x:s.x,y:s.y,t0:f.t,moved:!1,lx:s.x};const o=f.press;if(o)if(t.down){const s=t.x-o.lx;Math.abs(t.x-o.x)+Math.abs(t.y-o.y)>.025&&(o.moved=!0),o.moved&&(f.wTarget+=s*2.6),o.lx=t.x,o.hold=!o.moved&&f.t-o.t0>.35}else!o.moved&&f.t-o.t0<.35&&Aa(o.x,o.y),f.press=null},Aa=(t,o)=>{const s=t*2-1,a=1-o*2,r=[P.fw[0]+(s*P.rt[0]+a*P.up[0])*ot,P.fw[1]+(s*P.rt[1]+a*P.up[1])*ot,P.fw[2]+(s*P.rt[2]+a*P.up[2])*ot],c=Math.hypot(...r);r[0]/=c,r[1]/=c,r[2]/=c;let p=.09,d=-1,n=0;O.forEach((b,k)=>{for(let C=0;C<Y;C++){const N=b.x.subarray(C*3,C*3+3),F=[N[0]-P.eye[0],N[1]-.2-P.eye[1],N[2]-P.eye[2]],w=F[0]*r[0]+F[1]*r[1]+F[2]*r[2];if(w<.3)continue;const i=Math.hypot(F[0]-r[0]*w,F[1]-r[1]*w,F[2]-r[2]*w)/w;i<p&&(p=i,d=k,n=C*b.seg)}}),d<0&&(d=Math.floor(m()*Ve),n=O[d].len*.5),f.taps[f.tapI]=[d,n,f.t,2.4],f.snapT=f.t,f.tapI=(f.tapI+1)%3,v.sound.hit("noise",.5,{cutoff:700,dur:1.2});for(let b=0;b<4;b++)v.sound.hit("click",.25+.1*b)};let Oo=0;const Vo=t=>{f.t+=t,f.wAng+=(f.wTarget-f.wAng)*(1-Math.exp(-t*1.4));const o=!!(f.press&&f.press.hold);if(f.fog+=((o||Le?1:0)-f.fog)*(1-Math.exp(-t*(o?.8:.12))),f.lev+=((o?1:0)-f.lev)*(1-Math.exp(-t*(o?.9:.45))),f.relTop=f.fogTop=-1e3+950*Math.pow(f.lev,.7)+90*Math.sin(f.t*.42)*f.lev*f.lev,Le&&(f.fogTop=Xt+(-50-Xt)*Math.pow(f.lev,.7)+90*Math.sin(f.t*.42)*f.lev*f.lev),f.t>f.nextAuto){const s=Math.floor(m()*Ve);f.taps[f.tapI]=[s,0,f.t,1.1+m()*.9],f.tapI=(f.tapI+1)%3,f.nextAuto=f.t+2.5+m()*m()*9}No(t)};if(Ce==="Close on one string"||Ce==="Under the strings"){Vt=0;for(let a=0;a<150;a++)No(Se);Vt=1;const t=(a,r)=>{const c=O[a].x,p=Math.round(r*(Y-1))*3;return[c[p],c[p+1],c[p+2]]},o=Math.sin(f.wAng),s=-Math.cos(f.wAng);if(Ce==="Close on one string"){const a={Breeze:55,Steady:40,Gale:24,"Jet stream":30}[fe]*z,r=1.9+y[6]*.6,c=[o*Math.cos(a),-Math.sin(a),s*Math.cos(a)],p=[];for(let b=0;b<Ve;b++)for(const k of[.07,.12,.17,.83,.88]){if(k>.5&&O[b].gnd)continue;const C=t(b,k-.03),N=t(b,k+.03),F=t(b,k),w=[N[0]-C[0],N[1]-C[1],N[2]-C[2]];let i=[w[1]*c[2]-w[2]*c[1],w[2]*c[0]-w[0]*c[2],w[0]*c[1]-w[1]*c[0]];const h=Math.hypot(...i)||1;i=i.map(B=>B/h),(i[1]>0||Math.abs(i[1])<.35&&i[0]*X[0]+i[2]*X[2]>0)&&(i=i.map(B=>-B));const T=Q(F[0]+i[0]*r,F[2]+i[2]*r)+1.6,A=i[1]<-.25?Math.min(3.2,Math.max(1.2,(F[1]-T)/-i[1])):r,S=F[0]+i[0]*A,I=F[2]+i[2]*A,j=Q(S,I)+1.6,u=[F[0]-S,F[1]-j,F[2]-I],E=Math.hypot(...u),H=-(u[0]*i[0]+u[1]*i[1]+u[2]*i[2])/E,ee=Z.flagSun?(u[0]*X[0]+u[1]*X[1]+u[2]*X[2])/E:0,ce=Math.hypot(S-J[0],I-J[1])<yt+.4?5:0;p.push({cost:Math.abs(E-r)*1.5+(1-H)*4-ee*1.2+ce+Math.max(0,Math.abs(S)-14)*.3+Math.max(0,Math.abs(I+2)-9)*.3,P:F,ex:S,ez:I})}p.sort((b,k)=>b.cost-k.cost);const d=p[Math.min(p.length-1,Math.floor(y[5]*2.99))];Fe=d.ex,Me=d.ez;const n=Q(Fe,Me)+ut;je=Math.atan2(d.P[0]-Fe,-(d.P[2]-Me))+(y[7]-.5)*10*z,Be=Math.atan2(d.P[1]-.12-n,Math.hypot(d.P[0]-Fe,d.P[2]-Me)),!g&&Be>18*z&&(Be=18*z+(Be-18*z)*.35),ot=Math.tan((fe==="Gale"||fe==="Jet stream"?21+y[8]*3:19+y[8]*5)*z)}else{const a=t(0,.5+Ue()*.15),r=(30+Ue()*8)*z,c=Q(a[0],a[2]+2)+ut,p=Math.max(1.2,(a[1]-c)/Math.tan(r));Fe=a[0]+o*p*.5+(Ue()-.5),Me=a[2]+Math.max(.8,s)*p,je=(-22+Ue()*14)*z,Be=Math.max(16,Math.min(24,r/z-14))*z}}Mo(),Ht(0),Po(),ko(),e.bindVertexArray(l.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.bindTexture(e.TEXTURE_2D,Gt),e.texSubImage2D(e.TEXTURE_2D,0,0,0,he,he,e.RED,e.UNSIGNED_BYTE,Tt);for(let t=0;t<30;t++)Vo(Se),Do(),Uo(Se,t===0);Wo(),Xo(),Le&&!L.fog&&l.buildFog(),Ho(0);let st=0,Fa=0,Ko=0;return(t,o)=>{if(Ta(),l.tick=(l.tick||0)+1,Ko===8&&!L.fog&&!l.fogPending&&l.buildFog(),!l.bakeBig&&l.hf&&l.tick-l.bakeAt>30){for(const r of[l.hf,l.hn])e.deleteTexture(r);for(const r of[l.fHF,l.fHN])e.deleteFramebuffer(r);l.hf=l.hn=l.fHF=l.fHN=null,l.owner=null}(Mo()||pt.needW&&l.swReady())&&(Ht(f.t),ko()),st+=Math.min(Math.max(o,0),.1);let s=0;for(st>=Se&&(Po(),e.bindTexture(e.TEXTURE_2D,Gt),e.texSubImage2D(e.TEXTURE_2D,0,0,0,he,he,e.RED,e.UNSIGNED_BYTE,Tt)),e.bindVertexArray(l.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST);st>=Se&&s<2;)Vo(Se),Do(),Uo(Se,s===0),st-=Se,s++;s===2&&(st=Math.min(st,Se)),Ko++&3||Wo(),Xo();const a=zo(-2,-6);a>1.35&&f.t-Oo>.7&&(Oo=f.t,v.sound.hit("snare",Math.min(.3,(a-1.2)*.3)),v.sound.hit("noise",.18,{cutoff:500,dur:.9}));for(const r of f.taps){const c=f.t-r[2];if(r[0]<0||c<.05||c>2.6)continue;const p=O[r[0]].len;r[1]+c*9>p+1&&r[1]-c*9<-1||f.t-f.snapT>.085+.06*Math.abs(Math.sin(f.t*37.3))&&(f.snapT=f.t,v.sound.hit(Math.sin(f.t*91.7)>0?"snare":"click",.22*Math.exp(-c*.9)+.04))}Ho(f.t),Fa=t}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
