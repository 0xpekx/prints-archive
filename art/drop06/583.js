// Overwater Hut: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/583.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(oo){oo&&function(){"use strict";const mo={yaw:0,pitch:0,x:0,y:0,z:0},vo=0,At=Math.PI*2,Yt=(r,e,G)=>r<e?e:r>G?G:r,ye=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,bo=ye+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 0., 1.); }",yo=ye+`
uniform sampler2D uN;
uniform vec4 uM, uM2;
out vec4 o;
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
float sq(float x) { return x * x; }
float fbm(vec2 p, int n) { float s = 0., a = .5, w = 0.; for (int i = 0; i < n; i++) { s += a * n2(p); w += a; p = mat2(1.6, 1.2, -1.2, 1.6) * p + 13.7; a *= .5; } return s / w; }
void main() {
  vec2 uv = gl_FragCoord.xy / vec2(uM.w, uM2.x);
  float l = uM2.y * tan((uv.x - .5) * 2. * uM2.w);
  float b = (uv.y - .5) * 2. * uM2.z;
  vec2 p = vec2(l, b) * 16. + uM.xy;
  float F[8];
  int nk = int(uM2.x * 0.) + 8;
  for (int k = 0; k < nk; k++) {
    float fk = float(k);
    float sc = k == 0 ? .45 : k == 1 ? 1.7 : k == 2 ? 5.3 : k == 3 ? .8 : k == 4 ? 2.6 : k == 5 ? 7.1 : k == 6 ? .3 : .55;
    vec2 pp = k == 6 ? vec2(l * 5., 3.) : k == 7 ? vec2(l * 9., 7.) : p * sc + fk * 17.3;
    F[k] = clamp((fbm(pp, k < 2 ? 5 : k == 3 ? 6 : 4) - .5) * 2.7 + .5, 0., 1.);
  }
  float cl = F[0], cl2 = F[1], cl3 = F[2];
  float hw = .05 + .065 * exp(-l * l / .3);
  float disc = exp(-abs(b + .012 * sin(l * 1.3)) / hw);
  float lonF = .12 + .7 * exp(-l * l / .6) + .25 * exp(-sq(l - 1.35) / .15);
  float bul = exp(-1.7 * pow(pow(abs(l) / .21, 2.4) + pow(abs(b) / .15, 2.4), 1. / 2.4));
  float I = disc * lonF * (.3 + 1.3 * cl * cl + .45 * cl2 * cl2) * (.75 + .5 * cl3) + bul * (3.4 + 1.2 * cl) + .9 * exp(-(l * l / .1 + b * b / .025)) * (.6 + .8 * cl2);
  I += .8 * exp(-(sq(l - .47) / .005 + sq(b + .04) / .0015)) * (.5 + .9 * cl2);
  I += 1. * exp(-(sq(l - .03) / .007 + sq(b + .075) / .0025)) * (.5 + .9 * cl2);
  float r2 = 1. - abs(2. * F[4] - 1.); r2 *= r2 * r2;
  float r3 = 1. - abs(2. * F[5] - 1.); r3 *= r3 * r3;
  float b0 = .022 * smoothstep(-.1, .35, l) + .01 * sin(l * 2.3) + .035 * (F[6] - .5);
  float lw = (.014 + .03 * smoothstep(0., 1.3, l)) * (.5 + F[7]);
  float env = exp(-sq((b - b0) / lw)) * smoothstep(-.2, .02, l) * (1. - smoothstep(1.5, 2.1, l));
  float patchy = smoothstep(.3, .78, F[3] + .4 * (F[4] - .5));
  float tau = uM.z * (env * (2.4 * patchy + .9 * r2 + .5 * r3) + exp(-abs(b - b0 * .6) / .07) * (.35 * patchy + 1.1 * r2 + .8 * r3) * (.3 + .7 * exp(-l * l / 1.2)));
  tau += uM.z * 1.7 * exp(-(sq(l + .03) / .0012 + sq(b - .085) / .0005)) * (.5 + r2);
  tau += uM.z * 1.1 * exp(-(sq(l + .1) / .004 + sq(b - .23) / .003)) * (.4 + r2);
  vec3 sc = mix(vec3(.74, .84, 1.08), vec3(1., .9, .76), exp(-l * l / .45));
  sc = mix(sc, vec3(1., .76, .52), clamp(bul * 1.2, 0., 1.));
  vec3 col = sc * I * exp(-tau * vec3(.86, 1., 1.18));
  float neb = exp(-(sq(l - .105) / .00012 + sq(b + .023) / .00006)) + .7 * exp(-(sq(l - .263) / .0001 + sq(b + .012) / .00005));
  col += vec3(1., .32, .42) * neb * .2 * (.6 + .8 * cl3) * exp(-tau * .5);
  float edge = smoothstep(uM2.z, uM2.z * .8, abs(b));
  col *= edge;
  float dens = clamp((disc * lonF * (.3 + cl) + bul) * exp(-tau * .9), 0., 1.) * edge;
  o = vec4(sqrt(clamp(col * .2, 0., 1.)), dens);
}`,wo=ye+`
uniform sampler2D uS, uT;
uniform vec4 uE;
out vec4 o;
uint hu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec3 c = max(texelFetch(uS, ip, 0).rgb + texelFetch(uT, ip, 0).rgb, 0.) * uE.x;
  c = pow(c / (1. + c * .9), vec3(1. / 2.2));
  float dh = float(hu(uint(gl_FragCoord.x) * 7717u + uint(gl_FragCoord.y) * 3343u + 5u) >> 8) / 16777216. - .5;
  o = vec4(c + dh / 255., 1.);
}`,qe=`
uniform sampler2D uN, uMW, uD, uS1, uS2, uL, uAN;
uniform vec4 uC[40];
uniform vec4 uK[2];
#define AY uK[0]
#define AMG uK[1].x
#define ALS uK[1].y
#define CAMP uC[0].xyz
#define TANH uC[0].w
#define FW uC[1].xyz
#define SZ uC[1].w
#define RT uC[2].xyz
#define TIME uC[2].w
#define UPV uC[3].xyz
#define EXPO uC[3].w
#define LPOS uC[4].xyz
#define LAMP uC[4].w
#define LDIR uC[5].xyz
#define LPOW uC[5].w
#define LCOL uC[6].xyz
#define DEP uC[6].w
#define GX uC[7].xyz
#define GY uC[8].xyz
#define GZ uC[9].xyz
#define MWD uC[10]
#define NANI (int(uC[11].x) + ZI)
#define NRING (int(uC[11].y) + ZI)
#define NWAVE (int(uC[11].z) + ZI)
#define ZI int(uC[11].w)
#define WIND uC[12]
#define AGL uC[13]
#define ABSW uC[14].xyz
#define SCAT uC[14].w
#define FLR uC[15]
#define BIO uC[16]
#define HUT uC[17]
#define RIP uC[18]
#define CUR uC[19]
#define CRB uC[20]
#define INL uC[21]
#define PLAN uC[22]
#define POOLC uC[23].xyz
#define PCX uC[24].xy
#define SEEDF uC[24].z
#define WLC uC[25].xyz
#define NMD uC[26].xyz
#define NMI uC[26].w
#define NSKY uC[27].xyz
#define NMW uC[27].w
#define NBAND uC[28].xyz
#define NSTAR uC[28].w
#define NFL uC[29]
#define NMC uC[30].xyz
#define RAIN uC[30].w
#define NUP uC[31].xyz
#define WET uC[31].w
#define NME uC[32].xyz
#define LKP uC[36]
#define NLP uC[37]
#define NLC uC[38].xyz
#define PLC uC[39].xyz
#define DKY 1.55
#define ETA 1.333
#define PW .145
#define GW .011
#define X0 -2.7
#define X1 2.2
#define ZF -1.
#define ZW 2.4
uint hu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hu(x) >> 8) * (1. / 16777216.); }
uint hc(vec2 c, uint s) { return hu(uint(int(c.x) + 65536) * 73856093u ^ uint(int(c.y) + 65536) * 19349663u ^ s); }
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
vec4 n4(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.); }
float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-20)); a = ay > ax ? 1.5707963 - a : a; a = x < 0. ? 3.1415927 - a : a; return y < 0. ? -a : a; }
float sq(float x) { return x * x; }
float fres(float c) { float m = 1. - clamp(c, 0., 1.); float m2 = m * m; return .02 + .98 * m2 * m2 * m; }
#define S1O vec2(-4.4, -9.6)
#define S1S 11.2
#define S2O vec2(-119., -180.)
#define S2S 240.
// the water's slope: the coarse map everywhere it reaches, the fine map round the pool; xy gradient, z sub-texel roughness
vec3 surfG(vec2 p, float fp) {
  vec2 u2 = (p - S2O) / S2S, u1 = (p - S1O) / S1S;
  vec3 g = vec3(0.);
  float e2 = min(min(u2.x, u2.y), 1. - max(u2.x, u2.y));
  if (e2 > 0.) g = textureLod(uS2, u2, 0.).xyz * smoothstep(0., .05, e2);
  float e1 = min(min(u1.x, u1.y), 1. - max(u1.x, u1.y));
  float w1 = smoothstep(0., .06, e1) * (1. - smoothstep(.04, .08, fp));
  if (w1 > 0.) g = mix(g, vec3(textureLod(uS1, u1, 0.).xy, 0.), w1);
  return g;
}
// SG: how far the ripples too small to draw smear a reflection along the line of sight (twice their rms slope)
float SG;
vec3 surfN(vec2 p, float fp) {
  vec3 g = surfG(p, fp);
  SG = 2. * g.z;
  vec2 j = (n4(p * 2.3 + TIME * vec2(.21, .13)).xy - .5) * g.z * .8;
  return normalize(vec3(-g.x - j.x, 1., -g.y - j.y));
}
vec2 boxTN(vec3 o, vec3 d, vec3 a, vec3 b, out vec3 n) {
  vec3 dd = mix(d, vec3(1e-7), lessThan(abs(d), vec3(1e-7)));
  vec3 id = 1. / dd;
  vec3 t0 = (a - o) * id, t1 = (b - o) * id;
  vec3 tn = min(t0, t1), tx = max(t0, t1);
  float te = max(max(tn.x, tn.y), tn.z);
  n = -sign(dd) * step(vec3(te), tn);
  return vec2(te, min(min(tx.x, tx.y), tx.z));
}
`,go=`
vec3 starL(vec3 q, float N, float prob, float br, uint salt, float pa, float dens) {
  vec3 a = abs(q);
  float m = max(a.x, max(a.y, a.z));
  bool bx = a.x >= m, by = !bx && a.y >= m;
  vec2 uv = (bx ? q.zy : by ? q.xz : q.xy) / m;
  uint face = (bx ? 0u : by ? 2u : 4u) + ((bx ? q.x : by ? q.y : q.z) > 0. ? 0u : 1u);
  vec2 g = (uv * .5 + .5) * N, ci = floor(g);
  uint h = hu(uint(ci.x) * 73856093u ^ uint(ci.y) * 19349663u ^ face * 83492791u ^ salt);
  float on = step(hf(h), prob * (1. + dens));
  uint h2 = hu(h ^ 0x9e3779b9u);
  vec4 r = vec4(uvec4(h2, h2 >> 8u, h2 >> 16u, h2 >> 24u) & 255u) / 255.;
  vec2 sp = ci + .27 + .46 * r.xy;
  float ang = length(g - sp) * (2. / N) / (1. + .5 * dot(uv, uv));
  float u = r.z, u3 = u * u * u;
  float b = br * (.05 + 2.8 * u3 * u3 * u) * pow(min(1., .0013 / pa), .6);
  float sg = pa * .46;
  vec3 sc = r.w < .22 ? vec3(.8, .9, 1.15) : r.w < .7 ? vec3(1., 1., .98) : r.w < .93 ? vec3(1.06, .97, .86) : vec3(1.16, .88, .68);
  return on * sc * b * (1.6 * exp(-ang * ang / (2. * sg * sg)) + .006 * min(b, 4.) * exp(-ang / (sg * 2.6)));
}
float GL = 1.;
vec3 sky(vec3 d, float pa) {
  float dy = d.y;
  d.y = max(d.y, .002); d = normalize(d);
  float e = d.y;
  float vr = 1. / sqrt(1. - .95 * (1. - e * e));
  vec3 c = mix(vec3(.0034, .005, .0084), vec3(.0016, .0025, .0056), smoothstep(0., .9, e));
  vec2 pp = d.xz / (e + .09);
  float wv = .62 + .38 * sin(dot(pp, vec2(1.7, .6)) * 1.25 + AGL.z + 2.6 * n2(pp * .55 + 9.));
  c += vec3(.0011, .0046, .0017) * AGL.x * vr * wv * (.6 + .7 * n2(pp * .22 + 30.)) * exp(-sq(max(e - .05, 0.) / .16)) * .55;
  c += vec3(.0017, .0014, .0011) * exp(-e / .06) * AGL.y;
  vec3 g = vec3(dot(d, GX), dot(d, GY), dot(d, GZ));
  float lat = asin(clamp(g.z, -1., 1.)), lon = at2(g.y, g.x);
  vec4 m = vec4(0.);
#if NGK != 4
  if (abs(lat) < MWD.z) {
    m = textureLod(uMW, vec2(atan(lon / MWD.x) / (2. * MWD.y) + .5, lat / (2. * MWD.z) + .5), 0.);
    m.rgb = m.rgb * m.rgb * .26;
    m.rgb = mix(vec3(dot(m.rgb, vec3(.3, .45, .25))), m.rgb, .5) * vec3(.9, .98, 1.14);
  }
  float cm = dot(d, NMD);
  vec3 cel = m.rgb * MWD.w * NMW;
  float pf = pow(min(1., .0013 / pa), .9);
  vec3 s = vec3(0.);
  int nl = 3 + ZI;
  for (int i = 0; i < nl; i++) {
    float fi = float(i);
    s += starL(g, 36. * pow(2.36, fi), (i == 0 ? .22 : .38) - .05 * fi, (i == 1 ? .95 : 1.9) * pow(.27, fi), uint(i) * 977u + 11u, pa, m.a * 1.2 * fi) * pow(pf, min(fi, 2.));
  }
#else
  float cm = dot(d, NMD);
  vec3 cel = vec3(0.), s = vec3(0.);
#endif
  cel += s * sq(PA / pa) * NSTAR * (1. - .85 * smoothstep(.72, .96, cm) * step(.01, NMI));   // smeared by ripples (pa wider than a pixel), a star's reflection thins out; few stars near the moon
  float am = 1. / (e + .028);
  cel *= exp(-.085 * am * vec3(.62, .8, 1.15));
  // the night's own light: a sky lit by the moon or the coming day, its haze low down
#if NGK == 3
  float bw = smoothstep(-.3, .95, cm);
  c += NSKY * (.25 + 1.6 * smoothstep(.0, .14, e) * (1. - .35 * smoothstep(.3, .9, e)));
  c += NBAND * (exp(-e / (.014 + .01 * bw)) + .12 * exp(-e / .05)) * (.12 + .88 * bw);
  c += vec3(.5, .62, .3) * NBAND.x * .3 * exp(-sq((e - .045 - .02 * bw) / .022)) * bw;
#else
  c += NSKY * (1. + 1.4 * exp(-e / .22));
#endif
  c += NMC * NMI * .0025 * exp((cm - 1.) * 40.) * exp(-e / .25);
  // far storm towers: low, soft-topped, dark against the stars; a flash lights one from inside
#if NGK == 5
  if (NFL.y > 5.) {
    vec2 T = vec2(sin(NFL.y - 10.), -cos(NFL.y - 10.));
    float tx = dot(d.xz, T), a = atan(dot(d.xz, vec2(-T.y, T.x)) / max(tx, 1e-3));
    float h = (.016 + .01 * n2(vec2(a * 7., 3.))) * smoothstep(.55, .3, abs(a));
    for (int i = 0; i < 3 + ZI; i++) { float fi = float(i), ai = (fi - 1.) * .19 + .05 * sin(fi * 7.1), wi = .05 + .02 * fi, hi = .07 + .03 * float(i == 1) - .012 * fi; float u = (a - ai) / wi; h = max(h, hi * pow(max(0., 1. - u * u), .35) + .012 * smoothstep(.6, 1.6, 1. / max(abs(u), .3)) * step(abs(u), 1.4) * step(.5, float(i == 1))); }
    float bl = n2(vec2(a * 30., e * 34.)), bf = n2(vec2(a * 60., e * 70.) + 5.);
    h += .006 * (bl - .5) + .003 * (bf - .5);
    float tw = smoothstep(h + .001, h - .003, e) * step(0., tx);
    float lit = exp(-(sq(a - NFL.z) + sq(e - h * .55)) / .003) * (.15 + 1.4 * bl * bf * bf) + .012 * bl;
    vec3 tc = vec3(.0012, .0012, .0016) * (1. + 1.5 * exp(-e / .015)) + vec3(.2, .19, .3) * NFL.x * lit;
    c = mix(c, tc, tw); cel *= 1. - tw;
  }
#endif
  // a passing shower's low cloud: warm grey from the lamps under it; no stars through it
#if NGK == 4
  if (NFL.w > .01) {
    float cn = .7 + .45 * n2(pp * .35 + TIME * vec2(.02, .01)) + .2 * n2(pp * 1.3);
    c = mix(c, vec3(.0034, .0031, .0029) * cn * (1. + 1.6 * exp(-e / .12)), NFL.w); cel *= 1. - NFL.w;
  }
#endif
  c += cel;
  // the moon's disc: in the water the ripples too small to draw spread it into the broken path
#if NGK == 1 || NGK == 2
  if (NMI > 0.) {
    vec3 dd = d - NMD; float core = max(.0048, pa * .7), st = 1. + SG * SG / (core * core);
    float th = dd.x * dd.x + dd.z * dd.z + dd.y * dd.y / st;
    c += NMC * NMI * exp(-th / (2. * core * core)) * inversesqrt(st) * (1. - NFL.w) * GL;
  }
#endif
  return c * smoothstep(-.06, 0., dy);
}

`,Mo=`
vec3 hutPos(int i, out vec3 f, out float lit, out uint hs) {
  vec4 a = texelFetch(uD, ivec2(0, 64 + i), 0), b = texelFetch(uD, ivec2(1, 64 + i), 0);
  f = vec3(b.x, 0., b.y); lit = b.z; hs = uint(b.w);
  return a.xyz;
}
`,ao=`
// ---------------------------------------------------------------- the near scene's light (deck and hut programs)
// the curtain behind the glass: gathered folds, wider toward the hem; backlit fabric passes most light where it
// faces the glass square on and least on the steep sides of each fold (longer path through the cloth)
#define GAP (.4 - .14 * INL.y)
float curT(vec2 w) {
  float g = 1. - .3 * clamp(w.y / 2.1, 0., 1.);
  float ph = w.x * 29. * g + 2.6 * n2(vec2(w.x * 4.3, w.y * .45 + 2.)) + 1.3 * n2(vec2(w.x * 11., 7.));
  float cp = cos(ph);
  float t = exp(-.9 * sqrt(1. + 5. * cp * cp)) * 2.3;
  t *= 1. - .55 * smoothstep(.15, .07, w.y) - .5 * smoothstep(1.96, 2.03, w.y);
  return t * (.88 + .24 * n2(w * vec2(70., 2.5)));
}
// the curtained glass door and the louvred window: how much room light gets through at a wall point (x, height)
float doorT(vec2 w) {
  float T = 0.;
  if (w.x > -1.4 && w.x < .4 && w.y > 0. && w.y < 2.1) {
    float fr = min(min(w.x + 1.4, .4 - w.x), min(w.y, 2.1 - w.y));
    float bars = step(.065, fr) * step(.025, abs(w.x + .5)) * step(.025, abs(w.y - .95));
    T = bars * (w.x > GAP ? .95 : .3 * curT(w));
  } else if (w.x > 1. && w.x < 1.9 && w.y > .85 && w.y < 1.85) {
    float fr = min(min(w.x - 1., 1.9 - w.x), min(w.y - .85, 1.85 - w.y));
    T = step(.05, fr) * .55 * smoothstep(.35, .55, fract((w.y - .85) / .065));
  }
  return T;
}
vec3 nearLight(vec3 p, vec3 n) {
  // starlight, and the pool's glow thrown back by the hut wall and the eave behind
  vec3 E = (vec3(.0011, .0015, .0024) + POOLC * .03 + NSKY * 3.) * (.55 + .45 * n.y) + NME * max(dot(n, NMD), 0.);
  vec3 warm = vec3(1., .6, .29);
  // the woven lamp: warm, inverse square, the wall behind it blocks
  vec3 lc = vec3(.72, DKY + 1.9, ZW - .13);
  vec3 l = lc - p; float d2 = dot(l, l); l *= inversesqrt(d2);
  E += WLC * max(dot(n, l), 0.) / (d2 + .04) * step(p.z, ZW + .001);
  // room light through the door and the window
  vec3 rl = vec3(-.5, DKY + 2.15, 3.7);
  vec3 lr = rl - p; float dr2 = dot(lr, lr); lr *= inversesqrt(dr2);
  if (p.z < ZW - .005 && lr.z > 0.) {
    float tq = (ZW - p.z) / lr.z; vec2 w = p.xy + lr.xy * tq; w.y -= DKY;
    E += warm * INL.x * doorT(w) * max(dot(n, lr), 0.) / dr2;
  }
  // light coming up off the pool; the deck shades what is above it
  vec3 pc = vec3(PCX.x, -.3, PCX.y + 1.) - p; float dp = length(pc); pc /= dp;
  float occ = 1.;
  if (p.y > DKY - .2) { float tq = (DKY - .2 - p.y) / pc.y; vec2 q = p.xz + pc.xz * tq; occ = 1. - step(X0, q.x) * step(q.x, X1) * smoothstep(ZF - .05, ZF + .15, q.y); }
  E += POOLC * max(dot(n, pc), 0.) * occ / (1. + dp * dp * .2);
  // the deck light's own spill (the eave lamp over a flood, or the lantern on the post), cut below its horizon; the
  // front post throws its shadow across the boards
  vec3 ln = NLP.xyz - p; float dn2 = dot(ln, ln); ln *= inversesqrt(dn2);
  vec2 o2 = p.xz - vec2(2.08, -.93); float qa = dot(ln.xz, ln.xz), qb = dot(o2, ln.xz), qt = -qb / max(qa, 1e-4);
  float so = 1. - smoothstep(-.001, .003, qb * qb - qa * (dot(o2, o2) - .0064)) * step(.05, qt) * step(qt, sqrt(dn2)) * step(p.y + ln.y * qt, DKY + 1.12);
  E += NLC * max(dot(n, ln), 0.) * so / (dn2 + .02) * step(NLP.w, p.y);
  return E;
}

`,zo=`
// ---------------------------------------------------------------- the deck: planks with gaps, rail posts, rope rails
float PJ(float k) { return (hf(uint(k + 100.) * 2654435761u) - .5) * .62; }
// each seam wanders along its length: a bow (some boards sprung by a couple of centimetres) and a twist (a drift
// from end to end), so neighbouring seams converge and part and widths change down the deck
float SM(float k, float z) {
  uint h = uint(k + 100.) * 2246822519u;
  float t = clamp((z - ZF) / 3.4, 0., 1.);
  return k + PJ(k) + (hf(h ^ 11u) - .5) * .22 * sin(3.1416 * t) + (hf(h ^ 23u) - .5) * .14 * (t - .5);
}
// each seam its own gap: some boards butted tight, some shrunk apart, the gap tapering where the board is sprung
float GWZ(uint hs, float z) { float t = clamp((z - ZF) / 3.4, 0., 1.), a = hf(hs ^ 61u); return GW * (.6 + 1.3 * hf(hs ^ 77u)) * clamp(mix(.35 + 1.3 * a, 1.65 - 1.3 * a, t) + .5 * (hf(hs ^ 62u) - .5) * sin(6.28 * t), .15, 2.2); }
// short replacement boards: some planks are two pieces, butted over a joist; returns the joint's z (or -9.)
float BJZ(float pi) { uint h = hu(uint(pi + 50.) * 577u + 3u); return hf(h) < .5 ? -.92 + .62 * floor(1. + 4. * hf(h ^ 5u)) : -9.; }
// the timber map: weathered planks and piles (see bakeTimber); lod from the footprint, stretched along the view
uniform sampler2D uDK;
vec4 timber(vec2 uv, vec3 p, vec3 rd, vec2 tx) {
  float fp = length(p - CAMP) * PA;
  return textureLod(uDK, uv, log2(max(fp / tx.x, fp / max(abs(rd.y), .08) / tx.y)) - .5);
}
// a weathered pile: leaning, its centre wandering and its girth changing with height
vec3 postCR(float fj, vec2 c0, vec2 ln, float y) {
  float h = y - DKY;
  return vec3(c0 + ln * h + .009 * vec2(sin(h * 3.1 + fj * 2.3), sin(h * 2.3 + fj * 4.1 + 1.)), .075 - .01 * clamp(h, 0., 1.) + .004 * sin(h * 7.3 + fj * 1.7) + .002 * sin(h * 19. + fj));
}
float deckHit(vec3 ro, vec3 rd, float tmax, out vec3 nn, out float mat, out vec4 ax) {
  float tb = tmax; mat = 0.; nn = vec3(0., 1., 0.); ax = vec4(0.);
  // the boards: uneven widths, each seam shifted by up to an eighth of a board, ragged front ends
  if (rd.y < -1e-5) {
    float t = (DKY - ro.y) / rd.y; vec3 p = ro + rd * t;
    if (t > 0. && t < tb && p.x > X0 && p.x < X1 && p.z > ZF && p.z < ZW) {
      float px = (p.x - X0) / PW, pi = floor(px), b0 = px - 1., b1 = 1e9, kb = pi;
      for (int i = -1; i < 3 + ZI; i++) { float k = pi + float(i), v = SM(k, p.z); if (v <= px) { b0 = v; kb = k; } else if (b1 > 1e8) b1 = v; }
      float fu = (px - b0) * PW;
      uint hs = hu(uint(kb + 50.) * 911u + 7u);
      bool wood = fu > GWZ(hs, p.z) && p.z > ZF + .004 + .014 * hf(hs) && abs(p.z - BJZ(kb)) > .003 + .004 * hf(hs ^ 88u);
      tb = t; mat = wood ? 1. : 2.; ax = vec4(fu, p.z, kb, (b1 - b0) * PW);
    }
  }
  // rail posts (the piles carried up through the deck)
  float qa = dot(rd.xz, rd.xz);
  for (int j = 0; j < 6 + ZI; j++) {
    float fj = float(j);
    vec2 c0 = vec2(j < 3 ? 2.08 : -2.62, -.93 + 1.355 * (fj - (j < 3 ? 0. : 3.)));
    vec2 oq = ro.xz - c0; float qb = dot(oq, rd.xz);
    if (qb * qb - qa * (dot(oq, oq) - .0256) < 0.) continue;
    vec2 ln = (vec2(hf(uint(j) * 3u + 1u), hf(uint(j) * 3u + 2u)) - .5) * .07;
    float top = DKY + .96 + .03 * hf(uint(j) + 40u);
    float yy = top, t = -1.; vec3 cr = vec3(0.), ct = vec3(0.);
    for (int it = 0; it < 3 + ZI; it++) {
      cr = postCR(fj, c0, ln, yy); if (it == 0) ct = cr;
      vec2 oc = ro.xz - cr.xy; float b = dot(oc, rd.xz), disc = b * b - qa * (dot(oc, oc) - cr.z * cr.z);
      t = disc > 0. ? (-b - sqrt(disc)) / qa : -1.;
      yy = ro.y + rd.y * max(t, 0.);
    }
    vec3 p = ro + rd * t;
    if (t > 0. && t < tb && p.y > DKY - .01 && p.y < top) {
      tb = t; mat = 9.; nn = normalize(vec3(p.x - cr.x, 0., p.z - cr.y)); ax = vec4(fj, p.y, at2(nn.z, nn.x), 0.);
    } else if (rd.y < 0.) {
      // the sawn top, its rim worn round
      float t3 = (top - ro.y) / rd.y; vec2 q = ro.xz + rd.xz * t3 - ct.xy; float rq = length(q) / ct.z;
      if (t3 > 0. && t3 < tb && rq < 1.) { tb = t3; mat = 9.; float rim = smoothstep(.6, 1., rq) * 1.3; nn = normalize(vec3(q.x / ct.z * rim, 1., q.y / ct.z * rim)); ax = vec4(fj, q / ct.z, 1.); }
    }
  }
  // ropes: two runs per side, sagging between posts
  for (int j = 0; j < 8 + ZI; j++) {
    int sd = j / 4, k = (j / 2) - sd * 2, l = j - (j / 2) * 2;
    float xs = sd == 0 ? 2.08 : -2.62;
    float z0 = -.93 + 1.355 * float(k), z1 = z0 + 1.355;
    float y0 = DKY + (l == 0 ? .9 : .47), sg = (l == 0 ? .08 : .06) * (1. + .5 * hf(uint(j) + 70u));
    if (abs(rd.x) < 1e-4) continue;
    float tx = (xs - ro.x) / rd.x;
    if (tx <= 0. || tx > tb + .1) continue;
    float zz = ro.z + rd.z * tx;
    if (zz < z0 + .05 || zz > z1 - .05) continue;
    float f = (zz - z0) / (z1 - z0);
    float yc = y0 - sg * 4. * f * (1. - f);
    vec2 oc = vec2(ro.x - xs, ro.y - yc), d2 = rd.xy;
    float a = dot(d2, d2), b = dot(oc, d2), cc = dot(oc, oc) - .0155 * .0155;
    float disc = b * b - a * cc;
    if (disc > 0.) {
      float t = (-b - sqrt(disc)) / a;
      if (t > 0. && t < tb) { tb = t; mat = 10.; vec3 p = ro + rd * t; nn = normalize(vec3(p.x - xs, p.y - yc, 0.)); ax = vec4(p.z, at2(nn.y, nn.x), float(j), 0.); }
    }
  }
  return tb;
}
vec3 deckShade(vec3 p, vec3 rd, vec3 n, float mat, vec4 ax) {
  vec3 alb = vec3(.2), em = vec3(0.);
  float fpx = length(p - CAMP) * PA, gf = 1. - smoothstep(.004, .014, fpx);
  float pi = ax.z, fu = ax.x, wd = ax.w, gw = 0.;
  vec2 uv = vec2(0.), tx = vec2(.006, .01);
  if (mat < 2.5) {
    gw = GWZ(hu(uint(pi + 50.) * 911u + 7u), p.z);
    float tz = sqrt(clamp((p.z - ZF) / 3.4, 0., 1.));
    uv = vec2((mod(pi + 36., 36.) + clamp((fu - gw) / (wd - gw), .03, .97)) * (24. / 864.), tz * (256. / 416.));
    tx.y = max(.0266 * tz, .003);
  } else if (mat < 9.5) {
    uv = vec2((mod(ax.x, 3.) + clamp(fract(ax.z / 6.2832 + (ax.x < 2.5 ? 0. : .5)), .004, .996)) * (128. / 864.), (256.5 + clamp(ax.y - DKY, 0., 1.) * 159.) / 416.);
    tx = vec2(.0034, .00625);
  }
  vec4 tk = timber(uv, p, rd, tx);
  tk.rgb *= tk.rgb;
  if (mat < 1.5) {
    // weathered boards from the map; the fine latewood lines it can't hold are drawn here, fading with distance
    float g1 = n2(vec2(fu * 380. + pi * 31., p.z * 4.1 + pi * 7.)), g2 = n2(vec2(fu * 140. + pi * 13., p.z * 1.3));
    alb = tk.rgb * mix(1., .6 + .52 * g1 + .28 * g2, gf);
    // hairline checks along the grain, here and there
    alb *= 1. - .7 * gf * smoothstep(.028, 0., abs(n2(vec2(fu * 75. + pi * 17., p.z * .9 + pi)) - .5)) * smoothstep(.4, .65, n2(vec2(pi * 5.3, p.z * 1.3)));
    float e = min(fu - gw, wd - fu), mid = fu - (wd + gw) * .5;
    alb *= (.3 + .7 * smoothstep(0., .014, e)) * (.4 + .6 * smoothstep(0., .03, p.z - ZF));
    // cupped boards, the grain's relief, the rounded arris at the edges and the front end
    n = normalize(vec3(mid * -1.2 + (tk.a - .5) * 1.1 + (g1 - .5) * .3 * gf + .3 * smoothstep(.012, 0., e) * sign(mid), 1., -1.4 * smoothstep(.012, 0., p.z - ZF)));
  } else if (mat < 2.5) {
    // a gap: the next board's edge, lit from below by the pool's spill shimmering under the deck; dark over the joists
    float jg = abs(fract((p.z + .92) / .62 + .5) - .5) * .62;
    alb = vec3(.015);
    em = POOLC * .022 * exp(-(p.z - ZF) * 2.2) * smoothstep(.022, .04, jg) * (.3 + n2(vec2(pi * 2.3 + TIME * .2, p.z * 6. - TIME * .35)));
  } else if (mat < 9.5) {
    if (ax.w > .5) {
      // the sawn top: end grain in rings, radial checks, a dark heart, lichen-grey
      float rq = length(ax.yz); vec2 dq = ax.yz / max(rq, .02);
      float ring = n2(vec2(rq * 19. + 1.5 * n2(dq * 1.3 + ax.x), ax.x * 3.));
      float chk = smoothstep(.07, 0., abs(n2(dq * 2.6 + ax.x * 5.) - .5)) * smoothstep(.1, .5, rq);
      alb = vec3(.2, .19, .175) * (.5 + .6 * ring) * (1. - .8 * chk) * (.45 + .55 * smoothstep(0., .4, rq)) * (.8 + .4 * n2(ax.yz * 23.));
    } else {
      float y = ax.y - DKY, g1 = n2(vec2(uv.x * 1040. + ax.x * 3., y * 5.));
      alb = tk.rgb * mix(1., .66 + .68 * g1, gf);
      n = normalize(n + vec3(-n.z, 0., n.x) * ((tk.a - .5) * 1.8 + (g1 - .5) * .35 * gf));
      // the rail ropes run through holes bored in the pile
      float L = abs(y - .9) < abs(y - .47) ? .9 : .47;
      alb *= .15 + .85 * smoothstep(.016, .03, length(vec2(n.x * .075, y - L)));
    }
  } else {
    // three-strand manila gone grey: rounded strands with dark lays between, fibres standing off it
    float ph = ax.x * (6.2832 / .045) + 3. * ax.y + .5 * n2(vec2(ax.x * 9., ax.z));
    float sp = sin(ph), fib = n2(vec2(ph * 2.2, ax.x * 260. + ax.y * 4.));
    alb = mix(vec3(.3, .26, .2), vec3(.27, .265, .25), n2(vec2(ax.x * 1.7, ax.z * 3.))) * (.3 + .7 * smoothstep(-.9, .5, sp)) * (.55 + .8 * fib);
    n = normalize(n + (.45 * cos(ph) + .2 * (fib - .5)) * normalize(vec3(0., -n.x, 1.)));
  }
  // rain: the boards dark and shining with the lamp and the cloud in them
  vec3 wt = vec3(0.);
  if (WET > 0. && mat < 1.5) { vec3 lw = normalize(vec3(.72, DKY + 1.9, ZW - .13) - p); wt = WET * (WLC * .02 * pow(max(dot(n, normalize(lw - rd)), 0.), 40.) + vec3(.0034, .0031, .0029) * fres(dot(-rd, n)) * 4.); }
  return alb * nearLight(p, n) * (1. - .45 * WET) + em + wt;
}

`,To=`
// ---------------------------------------------------------------- behind you: the hut wall, its lamp, the thatch eave
float eaveY(float z) { return DKY + 2.08 + (z - .75) * .24; }
float eaveZ(float x) { return .75 - .05 * n2(vec2(x * 9., 3.)) - .02 * n2(vec2(x * 41., 8.)); }
float hutHit(vec3 ro, vec3 rd, float tmax, out vec3 nn, out float mat, out vec4 ax) {
  float tb = tmax; mat = 0.; nn = vec3(0., 1., 0.); ax = vec4(0.);
  vec3 bn; vec2 tt;
  // board walls
  tt = boxTN(ro, rd, vec3(-3.05, DKY - .3, ZW), vec3(2.65, DKY + 2.6, 8.), bn);
  if (tt.x < tt.y && tt.x > 0. && tt.x < tb) { tb = tt.x; mat = 6.; nn = bn; vec3 p = ro + rd * tb; ax = vec4(bn.z != 0. ? p.x : p.z, p.y - DKY, bn.z != 0. ? 1. : 0., 0.); }
  {
    // the woven lamp beside the door
    vec3 lc = vec3(.72, DKY + 1.9, ZW - .13);
    vec3 oc = (ro - lc) * vec3(1., .8, 1.); vec3 d = rd * vec3(1., .8, 1.);
    float a = dot(d, d), b = dot(oc, d), cc = dot(oc, oc) - .11 * .11;
    float disc = b * b - a * cc;
    if (disc > 0.) { float t = (-b - sqrt(disc)) / a; if (t > 0. && t < tb) { tb = t; mat = 12.; vec3 p = ro + rd * t; nn = normalize((p - lc) * vec3(1., .64, 1.)); ax = vec4(at2(nn.z, nn.x), p.y - lc.y, 0., 0.); } }
  }
  // the thatch eave above the deck, and its ragged fringe
  float dz = rd.y - .24 * rd.z;
  if (dz > 1e-5) {
    float t = (DKY + 2.08 + (ro.z - .75) * .24 - ro.y) / dz;
    vec3 p = ro + rd * t;
    if (t > 0. && t < tb && p.x > -3.6 && p.x < 3.2 && p.z < ZW && p.z > eaveZ(p.x)) { tb = t; mat = 7.; nn = normalize(vec3(0., -1., .24)); ax = vec4(p.xz, 0., 0.); }
  }
  if (rd.z > 1e-5) {
    float t = (.75 - .035 - ro.z) / rd.z; vec3 p = ro + rd * t;
    float ze = eaveZ(p.x);
    t = (ze - ro.z) / rd.z; p = ro + rd * t;
    float ye = eaveY(ze);
    float fr = .03 + .07 * pow(n2(vec2(p.x * 47., 1.)), 2.) + .03 * n2(vec2(p.x * 160., 5.));
    if (t > 0. && t < tb && p.x > -3.6 && p.x < 3.2 && p.y > ye - fr && p.y < ye + .3) { tb = t; mat = 8.; nn = vec3(0., 0., -1.); ax = vec4(p.x, p.y - ye, 0., 0.); }
  }
  return tb;
}
vec3 hutShade(vec3 p, vec3 rd, vec3 n, float mat, vec4 ax) {
  vec3 alb = vec3(.2), em = vec3(0.);
  vec3 warm = vec3(1., .6, .29);
  if (mat < 6.5) {
    float x = ax.x, y = ax.y;
    float bx = x / .13; float bi = floor(bx), bf = fract(bx);
    alb = vec3(.21, .16, .12) * (.65 + .45 * hf(hu(uint(int(bi) + 100)))) * (.75 + .3 * n2(vec2(bi * 9., y * 4.)) + .2 * n2(vec2(bx * 30., y * 40.)));
    alb *= .4 + .6 * smoothstep(0., .07, min(bf, 1. - bf));
    if (ax.z > .5) {
      float T = doorT(vec2(x, y));
      if (x > -1.45 && x < .45 && y < 2.15) { alb = mix(vec3(.12, .09, .07), alb, step(2.15, y)); }
      if (x > .95 && x < 1.95 && y > .8 && y < 1.9) alb = vec3(.13, .1, .08);
      // the lit room behind: a curtain glowing with its folds, or (where it's drawn) the room and its lamp
      // through the gap at the edge: a dim warm room, its lamp off to the left, furniture dark below
      vec3 room = warm * (.25 + .9 * smoothstep(.9, 1.9, y) * (.6 + .4 * n2(vec2(x * 9., y * 3.)))) * (.3 + .7 * smoothstep(.55, .95, y));
      // the curtain: the lamp behind makes a soft hot glow, falling off across the cloth
      vec3 glow = warm * vec3(1., .9, .78) * (.35 + 1.5 * exp(-sq((x + .3) / .55) - sq((y - 1.55) / .7))) * (.75 + .25 * smoothstep(0., 1.2, y));
      em = (x > GAP && x < .4 ? room : glow * 4.) * T * INL.x * .14;
      if (x > 1. && x < 1.9) em = warm * INL.x * .12 * T;
    }
  } else if (mat < 7.5) {
    // thatch underside: lashed rows, fibres, rafters every 55 cm
    float rx = abs(fract((p.x + 3.6) / .55 + .5) - .5) * .55;
    float row = fract(p.z / .11 + .4 * n2(vec2(p.x * 4., 1.)));
    float fib = n2(vec2(p.x * 260., p.z * 6.)) * .6 + n2(vec2(p.x * 90., p.z * 2.)) * .4;
    alb = vec3(.2, .15, .09) * (.45 + .7 * fib) * (.55 + .45 * smoothstep(0., .5, row));
    if (rx < .035) { alb = vec3(.17, .13, .09) * (.7 + .3 * n2(vec2(p.z * 40., p.x))); n = normalize(vec3((fract((p.x + 3.6) / .55 + .5) - .5) * .55 / .035, -1., 0.)); }
  } else if (mat < 8.5) {
    float st = n2(vec2(ax.x * 300., 2.)) * .6 + n2(vec2(ax.x * 70., ax.y * 4.)) * .4;
    alb = vec3(.18, .13, .08) * (.35 + .9 * st) * smoothstep(-.1, .05, ax.y + .05);
  } else {
    // woven shade: light through the weave
    float wv = abs(sin(ax.x * 14.)) * abs(sin(ax.y * 70.));
    alb = vec3(.3, .22, .12);
    em = WLC * (.05 + .55 * smoothstep(.2, .8, wv) * smoothstep(.6, .1, wv * abs(sin(ax.x * 7. + ax.y * 30.)))) * .22;
  }
  return alb * nearLight(p, n) + em;
}

`,ko=`
float RGH;
// ---------------------------------------------------------------- the water surface: swell, ripples, rings, breeze
float waves(vec2 p, float fp, out vec2 g, out vec3 H) {
  float h = 0.; g = vec2(0.); H = vec3(0.);
  float msk = RIP.x * (.45 + .9 * n2(p * .45 + CUR.xy * .3 + 30.));
  float gust = WIND.z * smoothstep(.35, .75, n2((p - CRB.zw) * .5 + 60.)) * 2.6;
  vec4 en = vec4(.5);
  for (int i = 0; i < NWAVE; i++) {
    vec4 a = texelFetch(uD, ivec2(0, 24 + i), 0), b = texelFetch(uD, ivec2(1, 24 + i), 0);
    float k = a.z;
    // each ripple train lives only in short-crested groups drifting at its group speed, its crests bent
    if (b.z > .5 && (i & 3) == 0) en = n4(p * (k * .05) + vec2(float(i) * 13.1, float(i) * 7.7) - a.xy * (.03 * b.x * TIME));
    float e = b.z > .5 ? en[i & 3] : .5;
    float Ar = a.w * (b.z > .5 ? (msk + gust) * smoothstep(.22, .78, e) * 1.8 : 1.), lod = 1. - smoothstep(.35, 1., fp * k);
    float A = Ar * lod;
    RGH += sq(Ar * k) * (1. - lod) * .5;
    if (lod < 1e-3) continue;
    float ph = k * dot(a.xy, p) - b.x * TIME + b.y + 2.5 * e;
    float s = sin(ph), c = cos(ph);
    h += A * c;
    g -= A * s * k * a.xy;
    H -= A * c * k * k * vec3(a.x * a.x, a.x * a.y, a.y * a.y);
  }
  // rain: each cell of the surface takes a drop now and then, at a place and time of its own; a ring runs out from it
  if (RAIN > 0.) {
    vec2 cb = floor(p / .45);
    for (int j = 0; j < 9 + ZI; j++) {
      vec2 cc = cb + vec2(float(j % 3) - 1., float(j / 3) - 1.);
      uint hh = hc(cc, 7177u);
      float per = .7 + .6 * hf(hh), tt = TIME / per + hf(hh ^ 1u), k = floor(tt), age = fract(tt) * per;
      uint h2 = hu(hh ^ uint(int(k) * 7919));
      if (hf(h2) > RAIN) continue;
      vec2 dp = (cc + .15 + .7 * vec2(hf(h2 ^ 3u), hf(h2 ^ 5u))) * .45;
      vec2 d = p - dp; float rr = length(d) + .002;
      float R = .03 + .32 * age, w = .01 + .018 * age, A = .0035 * (.5 + hf(h2 ^ 9u)) * exp(-age * 2.2);
      float x = (rr - R) / w, ga = exp(-x * x);
      float hr = A * ga * cos(x * 2.4);
      h += hr;
      g += (A * ga * (-2. * x * cos(x * 2.4) - 2.4 * sin(x * 2.4)) / w) * (d / rr) * (1. - smoothstep(.3, 1., fp * 60.));
    }
    RGH += RAIN * .0008 * step(.1, fp);
  }
  for (int i = 0; i < NRING; i++) {
    vec4 r = texelFetch(uD, ivec2(0, 16 + i), 0);
    if (r.w <= 0.) continue;
    vec2 d = p - r.xy; float rr = length(d) + .004; vec2 u = d / rr;
    float tau = r.z;
    float kk = 9.81 * tau * tau / (4. * rr * rr);
    float bsz = texelFetch(uD, ivec2(1, 16 + i), 0).x;
    float x = kk * bsz;
    float E = r.w * x * exp(-x * x) * exp(-tau * .45) * smoothstep(0., .08, tau) / sqrt(1. + rr * 6.);
    E *= 1. - smoothstep(.3, 1., fp * kk);
    float ph = kk * rr;
    float c = cos(ph), s = sin(ph);
    h += E * c;
    float dr = E * s * kk;
    g += dr * u;
    float d2 = -E * c * kk * kk;
    H += d2 * vec3(u.x * u.x, u.x * u.y, u.y * u.y) + dr / rr * vec3(1. - u.x * u.x, -u.x * u.y, 1. - u.y * u.y);
  }
  return h;
}

`,Eo=`
// the lamp's light at a point in the water: entry point by Snell, beam, Fresnel, absorption, caustic
vec3 lampAt(vec3 P, vec3 nP, float fpc, out vec3 Lw, out float ci) {
  vec3 tl = LPOS - P;
  vec2 s = P.xz + tl.xz * (-P.y / tl.y);
  vec3 tw;
  for (int i = 0; i < 2 + ZI; i++) {
    vec3 inc = normalize(vec3(s.x, 0., s.y) - LPOS);
    tw = refract(inc, vec3(0., 1., 0.), 1. / ETA);
    s += (P.xz - (s + tw.xz * (P.y / tw.y))) * .85;
  }
  vec3 inc = vec3(s.x, 0., s.y) - LPOS; float r1 = length(inc); inc /= r1;
  tw = refract(inc, vec3(0., 1., 0.), 1. / ETA);
  float r2 = P.y / tw.y;
  Lw = -tw;
  float cz = max(dot(inc, LDIR), 0.);
  float beam = pow(cz, LPOW) * (.85 + .15 * cz) * (clamp((cz - LKP.z) * LKP.w, 0., 1.) * .94 + .06);
  float T = 1. - fres(-inc.y);
  vec2 u1 = (s - S1O) / S1S;
  vec4 sf = textureLod(uS1, u1, 0.);
  float rt = -P.y / DEP;
  float det = 1. + (rt * sf.z + rt * rt * sf.w) * smoothstep(0., .14, min(min(u1.x, u1.y), 1. - max(u1.x, u1.y)));
  ci = 1. / max(abs(det), .16 + .05 * r2);
  ci = mix(mix(ci, 1., smoothstep(.02, .12, fpc)), 1., step(10., LKP.w) * .3);
  return LCOL * LAMP * beam * T * max(dot(nP, Lw), 0.) / (sq(r1 + r2 / ETA) + LKP.y) * exp(-ABSW * r2 - max(1. - LKP.y, 0.) * .9 * length(s - LPOS.xz)) * ci;
}

// lamps under the water on the piles: direct light (no surface, no net of light), aimed seaward and down, and the glow
// of the water they light along the view (closed form for a point light: the atan of the closest approach)
// (an: a point on an animal, its cosine is left to the layer's shading)
vec3 pileL(vec3 P, vec3 nP, float an, vec3 ps, vec3 tr, float tv, out vec3 gw) {
  vec3 E = vec3(0.); gw = vec3(0.);
  for (int i = 0; i < int(LKP.x) + ZI; i++) {
    vec4 L = uC[33 + i];
    vec3 l = L.xyz - P; float r = length(l); l /= r;
    float aim = .25 + .75 * smoothstep(-.3, .8, dot(-l, vec3(0., -.45, -.89)));
    E += L.w * aim * max(max(dot(nP, l), 0.), an) * exp(-ABSW * r) / (r * r + .04);
    vec3 oc = L.xyz - ps; float tc = dot(oc, tr), h = sqrt(max(dot(oc, oc) - tc * tc, .0016));
    float ua = (tv - tc) / h, ub = -tc / h;
    gw += L.w * 1.5708 * (ua / (1. + abs(ua)) - ub / (1. + abs(ub))) / h * exp(-ABSW * (length(oc) * .5 + max(tc, 0.) * .5));
  }
  gw *= PLC;
  return E * PLC;
}

// floor height (sand) and the coral heads
float floorY(vec2 p) { return -DEP + .14 * (n2(p * .35 + 11.) - .5) + .05 * (n2(p * 1.3 + 3.) - .5); }

// the animals' layer (pass N, drawn each frame): four slabs (needlefish, two of rays, sharks), each the plane y = AY[k] as the
// camera sees it straight on (no refraction), so a point on the plane maps back to its texel by plain projection.
// x: signed distance to the nearest body (metres, .5 + d / .2), y: its shading toward the lamp / 2.5, z dark, w pale marks
vec4 layerAt(vec3 Q, int k) {
  vec3 v = Q - CAMP; float z = dot(v, FW);
  vec2 s = vec2(dot(v, RT), dot(v, UPV)) / (max(z, 1e-3) * TANH * AMG);
  if (z < .05 || abs(s.x) > .995 || abs(s.y) > .995) return vec4(1., 0., 0., 0.);
  vec2 uv = s * .5 + .5;
  uv.y = (clamp(uv.y, .5 / ALS, 1. - .5 / ALS) + float(k)) / 4.;
  return textureLod(uL, uv, 0.);
}

vec3 underwater(vec3 ps, vec3 rd, vec3 n, float fp, float dist) {
  vec3 tr = refract(rd, n, 1. / ETA);
  float tf = (-DEP - ps.y) / tr.y;
  for (int i = 0; i < 3 + ZI; i++) { vec3 q = ps + tr * tf; tf += (floorY(q.xz) - q.y) / tr.y; }
  float tb = tf; float kind = 0.; vec3 hn = vec3(0., 1., 0.), cv3 = vec3(0.); vec4 hx = vec4(0.);
#if FLK == 1
  // coral heads: domes and plates, each an ellipsoid flattened by its own factor
  for (int i = 0; i < int(FLR.x) + ZI; i++) {
    vec4 cs = texelFetch(uD, ivec2(0, 48 + i), 0);
    vec4 c1 = texelFetch(uD, ivec2(1, 48 + i), 0); float fy = c1.x;
    vec3 sc = vec3(1. + c1.z, 1. / fy, 1. + c1.w), oc = (ps - cs.xyz) * sc, td = tr * sc;
    float qa = dot(td, td), b = dot(oc, td), cc = dot(oc, oc) - cs.w * cs.w;
    float disc = b * b - qa * cc;
    if (disc > 0.) { float t = (-b - sqrt(disc)) / qa; if (t > 0. && t < tb) { tb = t; kind = 1.; hn = normalize((ps + tr * t - cs.xyz) * sc * sc); hx = vec4(float(i), cs.w, fy, c1.y); } }
  }
#endif
  // the piles under water
  for (int j = 0; j < 3 + ZI; j++) {
    vec2 c = j == 0 ? vec2(2.08, -.93) : j == 1 ? vec2(-.15, -.86) : vec2(-2.62, -.93);
    vec2 oc = ps.xz - c, d2 = tr.xz; float a = dot(d2, d2), b = dot(oc, d2), cc = dot(oc, oc) - .074 * .074;
    float disc = b * b - a * cc;
    if (disc > 0.) { float t = (-b - sqrt(disc)) / a; if (t > 0. && t < tb) { tb = t; kind = 2.; vec3 q = ps + tr * t; hn = normalize(vec3(q.x - c.x, 0., q.z - c.y)); hx = vec4(at2(hn.z, hn.x), q.y, float(j), 0.); } }
  }
  // animals: one look into each slab of their layer along the view (the nearest body wins), then the shading point
  // is fixed and lit, then one look per slab toward the lamp for the shadows
  float aT = 1e9, aA = 0.; vec4 aL = vec4(1., 0., 0., 0.); int aK = 0;
  vec3 bio = vec3(0.);
  for (int k = 0; k < 4 + ZI; k++) {
    float ta = (AY[k] - ps.y) / tr.y;
    if (ta <= .01 || ta >= tb) continue;
    vec3 Q = ps + tr * ta;
    vec4 L = layerAt(Q, k);
    float sd = (L.x - .5) * .2;
    if (BIOON && sd < .14) {
      // dinoflagellates flash in the skin of water the bodies drag along
      vec2 sc = Q.xz / .02; vec2 cl = floor(sc);
      uint hh = hc(cl, uint(k) * 83492791u + 5u);
      float tf2 = fract(TIME * (.8 + .7 * hf(hh)) + hf(hh ^ 3u));
      float pulse = exp(-tf2 * 7.) * step(hf(hh ^ 7u), .5 * smoothstep(.14, .02, sd) * (k == 0 ? .5 : 1.));
      vec2 sp = cl + .3 + .4 * vec2(hf(hh ^ 11u), hf(hh ^ 13u));
      float dd = length(sc - sp) * .02, rr = max(.0035, fp * .7);
      bio += vec3(.25, .85, 1.) * pulse * 2.2 * sq(.004 / rr) * exp(-dd * dd / (rr * rr)) * exp(-ABSW * (ta * .3));
    }
    float fpa = max(fp, .0015) * 1.2;
    float al = smoothstep(fpa, -fpa, sd) * (k == 0 ? .55 : 1.);
    if (al > .01 && aA < .01) { aT = ta; aA = al; aL = L; aK = k; }
  }
  bool onA = aA > .5;
  vec3 P = onA ? ps + tr * aT : ps + tr * tb, PN = onA ? vec3(0., 1., 0.) : hn, Lw;
  float ci;
  if (!onA && kind < .5) {
    // sand ripple marks and grain for the normal
    vec2 xz = P.xz;
    float rph = dot(xz, vec2(.94, .34)) * 62. + 3. * n2(xz * 2.1) + 1.5 * n2(xz * 7.);
    float fr = 1. - smoothstep(.003, .012, fp);
    PN = normalize(vec3(-.32 * cos(rph) * .94 * fr + (n2(xz * 40.) - .5) * .25 * fr, 1., -.32 * cos(rph) * .34 * fr + (n2(xz * 40. + 7.) - .5) * .25 * fr));
    vec2 pc2 = floor(xz / 1.1); vec4 hp = texelFetch(uN, ivec2(mod(pc2 + vec2(71., 37.), 256.)), 0);
    vec2 pv = xz - (pc2 + .2 + .6 * hp.xy) * 1.1; float pd = length(pv) / (.15 + .13 * hp.z);
    float pm = step(hp.w, FLR.z * step(.5, texelFetch(uN, ivec2(mod(floor(xz / 4.4 + .5 * hp.x) + vec2(9., 140.), 256.)), 0).y) * 1.8);
    float sl = pm * (1.3 * smoothstep(.1, .8, pd) * smoothstep(1.05, .85, pd) - .7 * smoothstep(1., 1.2, pd) * smoothstep(1.7, 1.2, pd));
    PN = normalize(PN - vec3(pv.x, 0., pv.y) / max(length(pv), 1e-4) * sl);
    hx.w = pm * smoothstep(1.1, .5, pd);
  }
#if FLK == 1
  if (!onA && kind > .5 && kind < 1.5) {
    // the head's surface by its kind: a brain coral's meandering ridges (the contours of a smooth noise), a finger
    // clump's tips (one knob per 5 cm cell, dark gaps between), a plate's growth rings; faded to their mean when a
    // pixel covers them
    vec2 w = mat2(.8, -.6, .6, .8) * P.xz + hx.x * 7.3;
    float fz = clamp(fp * (1. + tb / max(dist, 1.)) * 1.5, 0., 1.), N = n2(w * 3.6) + .4 * n2(w * 9. + P.y * 4.);
    float rg = abs(fract(N * 4.5) - .5) * 2., gv = mix(smoothstep(.15, .7, rg), .6, smoothstep(.015, .045, fz));
    vec2 cc = floor(w / .065), cf = w / .065 - cc; vec4 ch = texelFetch(uN, ivec2(mod(cc + 64., 256.)), 0);
    vec2 kv = cf - .25 - .5 * ch.xy; float kd = length(kv) / (.22 + .2 * ch.z), kt = mix(smoothstep(1., .35, kd), .45, smoothstep(.015, .045, fz));
    float pr = .8 + .2 * sin(at2(hn.z, hn.x) * 46. + N * 6.) * smoothstep(.05, .3, length(hn.xz)) * (1. - smoothstep(.01, .03, fz));
    cv3 = hx.w < .5 ? vec3(gv, 0., 0.) : hx.w < 1.5 ? vec3(kt, 1., 0.) : vec3(pr, 2., 0.);
    PN = normalize(hn + (hx.w > .5 && hx.w < 1.5 ? vec3(kv.x, 0., kv.y) * 1.4 * (1. - smoothstep(.015, .045, fz)) * step(kd, 1.) : vec3(0.)));
  }
#endif
  vec3 E = lampAt(P, PN, fp, Lw, ci);
#if PIL
  // the pile lamps: the shadows look toward the lamp nearest in light (by its strength over the distance squared),
  // soften with the path and take that lamp's share; an animal takes the light square on (its layer shades it)
  vec3 l0 = uC[33].xyz - P, l1 = uC[34].xyz - P, l2 = uC[35].xyz - P;
  float w0 = uC[33].w / dot(l0, l0), w1 = uC[34].w / max(dot(l1, l1), 1e-4), w2 = uC[35].w / max(dot(l2, l2), 1e-4);
  vec3 lm3 = w0 > w1 ? (w0 > w2 ? l0 : l2) : (w1 > w2 ? l1 : l2);
  vec4 pld = vec4(lm3, max(w0, max(w1, w2)) / max(w0 + w1 + w2, 1e-6));
  vec3 Ls = normalize(lm3);
  float shadow = 1.;
  for (int k = 0; k < 4 + ZI; k++) {
    float dy = AY[k] - P.y;
    if (dy < .05 || Ls.y < .05) continue;
    vec4 L = layerAt(P + Ls * (dy / Ls.y), k);
    float pw = .008 + .035 * dy / Ls.y;   // (the rays' layer keeps its distance at under half scale)
    shadow *= 1. - smoothstep(pw, -pw, (L.x - .5) * .2) * (k == 0 ? .3 : .7);
  }
  float tv = aA > .5 ? aT : tb;
  vec3 pg, Ep = pileL(P, PN, onA ? 1. : 0., ps, tr, tv, pg), Ep0 = Ep;
  Ep *= 1. - min(1.3 * pld.w, 1.) * (1. - shadow);
#else
  float shadow = 1.;
  for (int k = 0; k < 4 + ZI; k++) {
    float dy = AY[k] - P.y;
    if (dy < .05 || Lw.y < .05) continue;
    vec4 L = layerAt(P + Lw * (dy / Lw.y), k);
    float pw = .015 + .07 * dy;
    shadow *= 1. - smoothstep(pw, -pw, (L.x - .5) * .2) * (k == 0 ? .3 : .7);
  }
  float tv = aA > .5 ? aT : tb;
  vec3 pg = vec3(0.), Ep = vec3(0.);
#endif
  vec3 col;
  // the surfaces, lit by the lamp through the moving water
  vec3 Ea = E * shadow + Ep + vec3(.0006, .0009, .0012) + NUP * 1.5;
  vec3 floorC;
  {
    vec3 alb;
    if (kind < .5) {
      vec2 xz = P.xz;
      float gr = n2(xz * 90.) * .5 + n2(xz * 23.) * .5;
      alb = vec3(.78, .75, .66) * (.82 + .25 * n2(xz * 1.7 + 4.)) * (.85 + .2 * gr);
      uint hd = hc(floor(xz / .07), 13u);
      vec2 dp = floor(xz / .07) + .2 + .6 * vec2(hf(hd), hf(hd ^ 1u));
      alb *= 1. - .5 * step(.965, hf(hd ^ 2u)) * smoothstep(.3, .12, length(xz / .07 - dp));
      alb *= 1. - .12 * hx.w;
#if FLK == 1
      for (int i = 0; i < int(FLR.x) + ZI; i++) { vec4 cs = texelFetch(uD, ivec2(0, 48 + i), 0); float dh = length(xz - cs.xz) / cs.w; alb *= (.3 + .7 * smoothstep(.8, 1.1, dh)) * (1. + .3 * smoothstep(1.15, 1.6, dh) * smoothstep(3.4, 2.1, dh)); }
#endif
#if FLK == 2
      if (FLR.y > .5) {
        // turtle grass: a felt of blades all laid one way by the current, thinning at its edge into single shoots,
        // bare oval blow-outs inside; the tips catch the lamp as a fine grain that sways with the surge
        vec2 bd = vec2(.8, .6) + .25 * vec2(n2(xz * .7 + 3.) - .5, n2(xz * .7 + 9.) - .5);
        vec2 bq = vec2(dot(xz, vec2(-bd.y, bd.x)) * 150., dot(xz, bd) * 11. + .3 * sin(TIME * .7 + xz.x * 2.));
        float bl = n2(bq), bt = n2(bq * vec2(1., 3.) + 17.);
        vec2 rx = mat2(.8, .6, -.6, .8) * xz;
        vec4 w4 = n4(rx * 2.3), g4 = n4(rx * 7. + .6 * w4.xy);
        float gb = n2(xz * .5 + SEEDF) + .15 * (g4.x - .5) + .07 * (g4.y - .5) - .3 * smoothstep(.6, .75, n2(vec2(dot(xz, bd) * .45, dot(xz, vec2(-bd.y, bd.x)) * 1.5) + 40.));
        alb *= 1. - .4 * smoothstep(.3, .4, gb) * smoothstep(.5, .4, gb);
        float gm = smoothstep(.36, .64, gb) * smoothstep(.1, .35, bl + .5 * smoothstep(.5, .7, gb));
        alb = mix(alb, vec3(.075, .09, .04) * (.55 + .9 * bl) + vec3(.12, .13, .07) * sq(sq(bt)), gm);
      }
#endif
    }
#if FLK == 1
    else if (kind < 1.5) {
      // brain domes yellow-brown, finger clumps cream to mauve, plates olive; each head its own shade; dark low down
      float hv = hf(hu(uint(hx.x) + 31u));
      vec3 tint = cv3.y < .5 ? mix(vec3(.58, .47, .28), vec3(.47, .48, .3), hv) : cv3.y < 1.5 ? mix(vec3(.56, .46, .4), vec3(.46, .32, .4), hv) : mix(vec3(.42, .4, .26), vec3(.36, .36, .32), hv);
      alb = tint * (cv3.y < .5 ? .28 + .72 * cv3.x : cv3.y < 1.5 ? .12 + .88 * cv3.x : cv3.x) * (.45 + .55 * smoothstep(.1, .6, hn.y)) * (.1 + .9 * smoothstep(-DEP - .02, -DEP + .55 * hx.y * hx.z, P.y));
    }
#endif
    else {
      float y = hx.y;
      alb = vec3(.1, .12, .07) * (.5 + .9 * n2(vec2(hx.x * 8., y * 12.))) * (1. + .8 * step(.8, n2(vec2(hx.x * 40., y * 60.))));
    }
    floorC = alb * Ea;
  }
  col = floorC;
  if (aA > .01) {
    // the animal's back, lit as the layer says: the ray brown-grey with pale rings behind, the blacktip grey-brown with
    // black tips, the needlefish glass-green, only its back line dark
#if PIL
    // (at a ray's rim the point is on the floor: its light, unshadowed and turned to the lamp; fr: the light that lamp
    // gives the floor under the animal, as a share of what the animal gets)
    vec3 Ea2 = onA ? Ep : Ep0 / max(dot(PN, Ls), .2);
    float ra = length(pld.xyz), dyf = max(P.y + DEP, 0.), rf2 = ra * ra + dyf * dyf + 2. * dyf * pld.y;
    float fr = onA ? ra * ra / rf2 * (pld.y + dyf) * inversesqrt(rf2) : 1.;
    vec3 irr = Ea2 * aL.y * 1.6 + vec3(.0006, .0009, .0012) + NUP * 1.5;
#else
    vec3 irr = ((onA ? E * shadow : E * .9) + Ep) * aL.y * 1.6 + vec3(.0006, .0009, .0012) + NUP * 1.5;
#endif
    // (the ray's white spots come in a distance field: sharpened here, and lifted past the knee below as white skin is)
    float spt = aK == 1 || aK == 2 ? smoothstep(.3, .72, aL.w) : 0.;
    vec3 ac = aK == 1 || aK == 2 ? vec3(.072, .067, .051) * (1. - .7 * aL.z) * RAB
      : aK == 3 ? mix(vec3(.092, .086, .07), vec3(.012, .011, .01), aL.z)
      : vec3(.014, .02, .018) * (1. - .45 * aL.z) + vec3(.3, .36, .36) * aL.w;
    // a soft knee so a back never burns white (cycle 3's plastic ray under the spot): set from what the sand beside it
    // gets (the lamp's light at the animal carried down to the floor: the longer path and the water between), so the
    // back of a ray or a shark can come to a fifth of the sand and never past about a quarter of it, at any lamp (the
    // needlefish keep a fixed knee)
    float lf = (LPOS.y - P.y / ETA) / (LPOS.y + DEP / ETA);
#if PIL
    float kn = aK > 0 ? max(KNP * fr * dot(Ea2, vec3(.3, .5, .2)) * EXPO, .004) : .1;
#else
    float kn = aK > 0 ? max(.124 * dot(E, vec3(.3, .5, .2)) * exp(-ABSW.y * (DEP + P.y)) * lf * lf * EXPO, .004) : .1;
#endif
    vec3 ar = ac * irr; float lm = dot(ar, vec3(.3, .5, .2)) * EXPO, lk = max(lm - kn, 0.);
    ar = mix(ar, vec3(.42, .42, .39) * RAB * irr, spt) * (lm - lk + lk / (1. + lk * 5. / kn)) / max(lm, 1e-6);
#if PIL
    // under the pile lamps a back is the sand's own colour, darker (its hue from the sand lit at the animal)
    if (aK > 0) ar = mix(ar, dot(ar, vec3(.3, .5, .2)) * floorC / max(dot(floorC, vec3(.3, .5, .2)), 1e-6), .6);
#endif
    // on a ray or a shark the colour behind a pixel it covers more than half of was never lit as the floor (it is the
    // sand's colour at the animal's own height, unshadowed, and drew a pale rim on the shadow side): such a pixel is the
    // animal's alone, the coverage ramp runs over the outer half
    col = mix(col, ar, aK > 0 ? min(aA * 2., 1.) : aA);
  }
  // the water between: absorption along the view, the beam's glow, plankton in the light
  vec3 att = exp(-(ABSW + SCAT) * tv);
  col *= att;
  vec3 ins = vec3(0.);
  float jt = hf(uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u);
  for (int j = 0; j < 3 + ZI; j++) {
    float tj = tv * (float(j) + .3 + .4 * jt) / 3.;
    vec3 X = ps + tr * tj;
    vec3 lx = LPOS - X; float rx = length(lx); lx /= rx;
    float cz = max(dot(-lx, LDIR), 0.);
    float rw = -X.y / max(lx.y, .1);
    float ph = .6 + .8 * sq(1. + dot(lx, tr));
    ins += pow(cz, LPOW) * clamp((cz - LKP.z) * LKP.w, 0., 1.) / (rx * rx + LKP.y) * exp(-ABSW * (rw + tj)) * ph;
  }
  ins = min(ins * LCOL * LAMP * SCAT * tv * .3333 * .05, vec3(.08));
  ins += pg * SCAT * .14;
  float pr = length(ps.xz - PCX);
  ins += POOLC * SCAT * .5 * exp(-pr * pr / 14.) * (1. - exp(-tv * .7));
  col += ins;
  // plankton motes drifting through the beam
  float mot = 0.;
  for (int j = 0; j < 3 + ZI; j++) {
    float yj = -.2 - .5 * float(j);
    float tj = (yj - ps.y) / tr.y;
    if (tj > tv) continue;
    vec2 q = ps.xz + tr.xz * tj - CUR.xy * (.5 + .17 * float(j));
    vec2 cl = floor(q / .1); vec2 f = q / .1 - cl;
    uint h = hc(cl, uint(j) * 7919u + 3u);
    if (hf(h) > BIO.w) continue;
    vec2 mp = .15 + .7 * vec2(hf(h ^ 1u), hf(h ^ 2u)) + .08 * sin(TIME * (.4 + .5 * hf(h ^ 3u)) + vec2(0., 1.7) + 6.28 * hf(h ^ 4u));
    float dd = length(f - mp) * .1;
    float rr = max(.0018, (dist + tj) * PA * .6);
    vec3 X = vec3(q.x, yj, q.y);
    vec3 lx = LPOS - X; float rx = length(lx);
    float cz = max(dot(-lx / rx, LDIR), 0.);
    mot += sq(.0018 / rr) * exp(-dd * dd / (rr * rr)) * pow(cz, LPOW) * clamp((cz - LKP.z) * LKP.w, 0., 1.) / (rx * rx) * exp(-tj * .25) * (.5 + .5 * hf(h ^ 5u));
  }
  col += mot * LCOL * LAMP * vec3(.5, .9, .95) * 1.2;
  col += bio;
  return col;
}

`,Ao=`
// what the water surface itself adds: dark water beyond the pool, the neighbours' pools, reef foam, sparks
vec3 surfExtras(vec3 p, vec3 rd, vec3 n, float fp, float D) {
  vec3 c = vec3(.0002, .0004, .0005) * step(BIOON ? 24. : 17., length(p.xz - PCX));
  // by moonlight or first light the lagoon floor shows: pale sand shallows, dark blots of coral
#if NGK >= 1 && NGK <= 3
  if (NUP.z > 0.) c += NUP * (.75 + .5 * n2(p.xz * .07 + 3.) - .6 * smoothstep(.56, .74, n2(p.xz * .19 + 11.))) * exp(-D * .004) * smoothstep(12., 18., length(p.xz - PCX));
#endif
#if LANT
  if (uC[38].w > 0.) { vec3 lr = NLP.xyz - p; float dl = length(lr); lr /= dl; float cg = max(dot(reflect(rd, n), lr), 0.);
    c += NLC * uC[38].w * exp((cg - 1.) * 900.) * fres(dot(-rd, n)) * 30. / (dl * dl); }
#endif
  // neighbours' pools: the nearest along each arm
  vec3 f; float lit; uint hs;
  for (int j = 0; j < 3 + ZI; j++) {
    int i = j == 0 ? clamp(int(floor((p.x - 17.5) / 17.5 + .5)), 0, 4) : j == 1 ? 5 + clamp(int(floor((-p.x - 17.5) / 17.5 + .5)), 0, 4) : 10 + clamp(int(floor((-p.z - 46.) / 22. + .5)), 0, 3);
    vec3 hp = hutPos(i, f, lit, hs);
    vec2 pc = hp.xz + f.xz * 2.8;
    vec2 dd = p.xz - pc;
    float g = exp(-dot(dd, dd) / 7.) * min(lit, 1.);
    float wob = 1. + 2.5 * (n.x * .8 + n.z * .6) + 30. * (n.x * n.x + n.z * n.z);
    c += vec3(.02, .3, .3) * g * max(wob, .2) * (1. - fres(dot(-rd, n)));
  }
  // the reef break: a band of foam far out
  if (D > 300.) {
    float az = at2(p.x, -p.z);
    float R = 850. + 140. * n2(vec2(az * 4., 2.));
    float band = exp(-sq((D - R) / (8. + .01 * D))) * smoothstep(1.45, 1.2, abs(az));
    float fo = smoothstep(.35, .8, n2(vec2(az * 260. - TIME * .25, TIME * .2)) * .7 + .25);
    c += vec3(.012, .014, .016) * band * fo * .8;
  }
  // sparks where rings run (in the dark)
  if (BIOON) {
    for (int i = 0; i < NRING; i++) {
      vec4 r = texelFetch(uD, ivec2(0, 16 + i), 0);
      if (r.w <= 0. || r.z > 3.) continue;
      float rr = length(p.xz - r.xy);
      float fr = r.z * .3 + .03;
      float band = exp(-sq((rr - fr) / .05)) * exp(-r.z * .9);
      vec2 cl = floor(p.xz / .015);
      uint hh = hc(cl, uint(i) * 13u + 911u);
      float sp = step(hf(hh), band * .6) * smoothstep(.45, .1, length(fract(p.xz / .015) - .5));
      c += vec3(.25, .85, 1.) * sp * .9 * BIO.x;
    }
  }
  return c;
}

`,Ke=`
  vec2 sc = gl_FragCoord.xy / SZ * 2. - 1.;
  vec3 rd = normalize(FW + TANH * (sc.x * RT + sc.y * UPV));
  vec3 ro = CAMP;
  PA = 2. * TANH / SZ;
`,Lo=ye+qe+`out vec4 o;
float PA;
`+ao+zo+`
void main() {${Ke}
  vec3 nn; float mat; vec4 ax;
  float tn = deckHit(ro, rd, rd.y < -1e-4 ? min(-ro.y / rd.y, 90.) : 90., nn, mat, ax);
  o = mat > 0. ? vec4(deckShade(ro + rd * tn, rd, nn, mat, ax), 0.) : vec4(0., 0., 0., 1.);
}`,Po=ye+qe+`out vec4 o;
float PA;
`+ao+To+`
void main() {${Ke}
  vec3 nn; float mat; vec4 ax;
  float tn = hutHit(ro, rd, rd.y < -1e-4 ? min(-ro.y / rd.y, 90.) : 90., nn, mat, ax);
  if (mat < .5) discard;
  o = vec4(hutShade(ro + rd * tn, rd, nn, mat, ax), 0.);
}`,So=ye+qe+`uniform sampler2D uS, uFS;
uniform vec4 uF[2];
out vec4 o;
float PA;
`+go+Mo+Ao+`
// the neighbours' strip (bakeFar): L 0 its direct half, 1 its mirror half; light and how much it covers
vec4 farS(vec3 d, float L) {
  float az = at2(d.x, -d.z) - uF[0].x; az -= 6.2831853 * floor(az / 6.2831853 + .5);
  float q = az / uF[0].y, se = d.y / uF[1].w, rg = L < .5 ? uF[1].y - uF[1].x : uF[0].w;
  float v = (atan(se) - (L < .5 ? uF[1].x : 0.)) / rg;
  if (v < 0. || v > 1.) return vec4(0.);
  float hl = uF[1].z * .125;
  vec2 uv = vec2(.5 + atan(q) * uF[0].z, (clamp(v, .5 / hl, 1. - .5 / hl) + L) * .5);
  float lod = log2(PA * sqrt(uF[1].z * uF[0].z / uF[0].y / (1. + q * q) * hl / (rg * uF[1].w * (1. + se * se))));
  vec4 t = textureLod(uFS, uv, max(lod, 0.));
  vec3 e = min(t.rgb, vec3(.996)), e2 = e * e;
  return vec4(.05 * e2 / (1. - e2), t.a);
}
void main() {${Ke}
  if (texelFetch(uS, ivec2(gl_FragCoord.xy), 0).a < .5) { o = vec4(0.); return; }
  vec3 acc = vec3(0.), thr = vec3(1.);
  float dist = 0., W = 0.;
  SG = 0.;
  for (int b = 0; b < 2 + ZI; b++) {
    float tw = (b == 0 && rd.y < -1e-4) ? -ro.y / rd.y : 1e9;
    vec4 fr = farS(rd, float(b));
    acc += thr * fr.rgb;
    float fa = fr.a;
    if (tw < 1e8 && fa < .999) {
      vec3 p = ro + rd * tw;
      float D = dist + tw;
      float fp = D * PA / sqrt(max(-rd.y, .02));
      vec3 n = surfN(p.xz, fp);
      float F = fres(dot(-rd, n));
      W = (1. - fa) * (1. - F);
      GL = 2.6 * sq(sq(n2(p.xz * vec2(1.1, 3.4) + TIME * vec2(.13, .41)) * .6 + n2(p.xz * vec2(2.9, 7.) - TIME * vec2(.2, .5)) * .6));
      acc += thr * (W * surfExtras(p, rd, n, fp, D));
      thr *= (1. - fa) * F;
      ro = p; rd = reflect(rd, n); rd.y = max(rd.y, .003); rd = normalize(rd); dist = D;
      continue;
    }
    acc += thr * ((1. - fa) * sky(rd, sqrt(PA * PA + .1 * SG * SG)));
    break;
  }
  o = vec4(acc, W);
}`,Ro=ye+qe+`
out vec4 o;
void main() {
  vec2 fc = gl_FragCoord.xy;
  float kf = floor(fc.y / ALS);
  int k = int(kf);
  vec2 sc = vec2(fc.x, fc.y - kf * ALS) / ALS * 2. - 1.;
  vec3 d = FW + TANH * AMG * (sc.x * RT + sc.y * UPV);
  float Y = AY[k];
  o = vec4(1., 0., 0., 0.);
  if (d.y > -1e-4) return;
  vec2 Q = CAMP.xz + d.xz * ((Y - CAMP.y) / d.y);
  // a texel's size on the plane (metres): the whip may thin no further than half of it, or it breaks into dashes
  float txw = (Y - CAMP.y) / d.y * length(d) * TANH * AMG * 2. / ALS / sqrt(max(-d.y / length(d), .1));
  vec3 Lv = normalize(LPOS - vec3(Q.x, Y, Q.y)); Lv = normalize(vec3(Lv.x * .75, Lv.y, Lv.z * .75));
  // under the pile lamps the backs are lit from the side, by the lamp that gives this point most light
  if (LKP.x > .5) {
    float bw = -1.;
    for (int j = 0; j < int(LKP.x) + ZI; j++) { vec3 l = uC[33 + j].xyz - vec3(Q.x, Y, Q.y); float w = uC[33 + j].w / dot(l, l); if (w > bw) { bw = w; Lv = normalize(l); } }
  }
  float best = .1;
  for (int i = 0; i < NANI; i++) {
    vec4 A2 = texelFetch(uD, ivec2(2, i), 0);
    if (abs(A2.z - kf) > .5) continue;
    vec4 A0 = texelFetch(uD, ivec2(0, i), 0);
    vec2 q = Q - A0.xz;
    if (dot(q, q) > sq(A0.w * (k == 1 || k == 2 ? 2.4 : 1.9) + .1)) continue;
    vec4 A1 = texelFetch(uD, ivec2(1, i), 0);
    vec2 uv = vec2(dot(q, A1.xy), dot(q, vec2(-A1.y, A1.x))) / A0.w;
    uv.y /= max(cos(A1.w), .35);
    float ph = A2.x, amp = A2.y, sd, tl, dk = 0., lt = 0., tn = 1.;
    vec3 nr = vec3(0., 1., 0.);
    if (k == 1 || k == 2) {
      // spotted eagle ray (span 1): the beat runs out along the wing as a wave; the tips lift and now and then show pale.
      // Each ray its own (rs: the mint and its row): tail, spots, tone
      uint rs = hu(uint(i) * 0x9e3779b9u ^ uint(SEEDF * 4096.));
      float av = abs(uv.y), sy = uv.y < 0. ? -1. : 1., s = clamp((av - .07) / .555, 0., 1.);
      float wph = ph - 1.9 * s + 1.4 * uv.x;
      float lift = amp * .2 * sin(wph) * s * s;
      float a = av / (1. - 2.2 * lift * lift);
      vec4 at = textureLod(uAN, vec2(min((uv.x + .66) / 1.32 * .5, .498), (sy * a + .66) / 1.32), 0.);
      sd = (at.x - .5) * .12;
      // the whip of a tail from inside the pelvic fins, two to three disc lengths, thinning to a hair and trailing in
      // one slow bend; it fades into the water over its last half; one in four broken short
      float tL = .65 * (2. + hf(rs)), tC = hf(rs ^ 5u) < .25 ? tL * (.3 + .25 * hf(rs ^ 6u)) : tL;
      float tu = clamp((-.27 - uv.x) / tL, 0., 1.);
      float dT = uv.x < -.26 && uv.x > -.27 - tC ? abs(uv.y - (.22 * sin(ph * .11 + 6.28 * hf(rs ^ 7u)) - .15 * A1.w) * tu * tu) - max(.0075 * pow(1. - tu, 1.6) + .0002, .5 * txw / A0.w) + (.01 + 3. * txw / A0.w) * smoothstep(.15, .75, tu) : 1.;
      sd = min(sd, dT);
      // the back: one smooth dome, highest at the shoulders a short way behind the eyes, falling into the wings over
      // their inner third with no step; the wings droop a little to the tips and from a third of the chord to the
      // trailing edge. The normal in the animal's frame (forward, up, across)
      float u = (uv.x - .015) / .315, t = av / (.085 * sqrt(max(1. - u * u, 0.)) + .003);
      float xl = .19 - .58 * max(a - .07, 0.), cf = clamp((xl - uv.x) / max(xl + .21, .05), 0., 1.);
      float bL = uv.x > .12 ? .42 : .4, bx = (uv.x - .12) / bL, bq = max(1. - bx * bx, 0.), tb = min(av / .21, 1.), cq = 1. - tb * tb;
      float hd = LKP.x > .5 ? .085 : .065;
      vec3 nl = vec3(hd * 4. * bx * bq / bL * cq * cq - .07 * smoothstep(.33, 1., cf) * s, 1., sy * (hd * bq * bq * 4. * tb * cq / .21 + (LKP.x > .5 ? .36 * sqrt(s) : .13 * s)));
      // the beat bends the wing about the body's long axis: light runs along the span through the stroke
      tl = sy * atan(amp * .2 * (cos(wph) * -1.9 / .555 * s * s + sin(wph) * 2. * s / .555));
      // the head's eyes as two small dark notches; a faint dark seam down the back; the dorsal nub at the tail root
      vec2 ey = vec2((uv.x - .292) * .55, av - .046);
      dk = .85 * smoothstep(.012, .006, length(ey)) + .35 * smoothstep(.014, .005, length(vec2((uv.x + .285) * .45, av)));
      // white spots and rings, round and soft, each ray its own pattern (one jittered cell, warped with the wing):
      // the rear two thirds of the disc only, off the ridge, none on the head or the wing fronts
      vec2 sp = vec2(uv.x + .3, sy * a) / .064, sc2 = floor(sp); uint hs = hc(sc2, rs);
      float rr = .18 + .1 * hf(hs ^ 2u), dd = length(sp - sc2 - .5 - (vec2(hf(hs), hf(hs ^ 1u)) - .5) * (.9 - 2. * rr)) / rr;
      float zone = smoothstep(.18, .08, uv.x) * smoothstep(-.27, -.22, uv.x) * smoothstep(.1, .24, cf) * smoothstep(1., 1.4, t) * step(hf(hs ^ 3u), .85);
      lt = zone * smoothstep(0., -.012, sd) * clamp(.5 + (hf(hs ^ 4u) < .3 ? .3 - abs(dd - .68) : 1. - dd) * rr * .064 / .016, 0., 1.);
      // the pale underside at the last tenth of a lifted tip: on about one stroke in three, or when it banks hard
      float gate = max(step(hf(hu(uint(int(floor(wph / 6.2832)) + 4096) ^ rs ^ 77u)), .33), smoothstep(.35, .7, sy * A1.w));
      lt = max(lt, .55 * smoothstep(.86, .96, s) * smoothstep(.02, .07, lift) * gate);
      // the ray's own tone, carried in the shading channel
      tn = .85 + .3 * hf(rs ^ 9u);
      tl += A1.w;
      vec3 F = vec3(A1.x, 0., A1.y), Sd = vec3(-A1.y, 0., A1.x), Up = vec3(0., cos(tl), 0.) - Sd * sin(tl), Sx = Sd * cos(tl) + vec3(0., sin(tl), 0.);
      nl = normalize(nl); nr = F * nl.x + Up * nl.y + Sx * nl.z;
    } else if (k == 3) {
      // blacktip (length 1, snout at +.5): a narrow S that never stops bending
      float x = .5 - uv.x;
      float v = uv.y - amp * (.01 + .07 * x * x) * sin(ph - 5.5 * x);
      vec4 at = textureLod(uAN, vec2(max(.5 + (uv.x + .6) / 1.2 * .5, .502), (v + .6) / 1.2), 0.);
      sd = (at.x - .5) * .12 * 1.154;
      // a round back: the normal turns out to the flanks as a half cylinder of the body's half-width (about .045)
      float din = clamp(-sd / .045, 0., 1.);
      tl = -sign(v) * min(asin(1. - din), 1.15);
      // darker along the top, the first dorsal a dark ridge behind the pectorals
      dk = max(at.y, .12 * smoothstep(.2, .8, din) * step(.06, x) * step(x, .8) + .55 * smoothstep(.009, .003, abs(v)) * smoothstep(.36, .41, x) * smoothstep(.56, .5, x));
    } else {
      // needlefish (length 1, beak at +.5): glass-green and nearly invisible from above; a dark line down its back,
      // an eye that glints
      float x = .5 - uv.x;
      float v = uv.y - amp * .04 * x * sin(ph - 7. * x), av = abs(v);
      float w = x < .2 ? .003 + .009 * x / .2 : .005 + .022 * pow(sin(3.1416 * clamp((x - .12) / .86, 0., 1.)), .7);
      sd = x < 0. || x > 1. ? .1 : av - w;
      float xl = x - .95; sd = min(sd, xl > 0. && xl < .2 ? abs(av - xl * .35) - .008 * (1. - xl / .21) - .0015 : 1.);
      tl = sign(v) * .4;
      dk = smoothstep(.45, .1, av / max(w, 1e-3)) * step(.18, x) * step(x, .96);
      lt = smoothstep(.006, .002, length(vec2(x - .22, av))) * .9;
    }
    sd *= A0.w;
    if (sd < best) {
      best = sd;
      vec3 nv = k == 1 || k == 2 ? nr : vec3(0., cos(tl + A1.w), 0.) - vec3(-A1.y, 0., A1.x) * sin(tl + A1.w);
      float g = (max(dot(nv, Lv), 0.) + .35) * (.62 + .38 * smoothstep(0., .03, -sd)) * tn;
      if (k == 1 || k == 2) {
        // the ray's form, made readable from above: the light falls off faster on the turned flanks, the thin margin
        // of the wing (its last twentieth) is paler, and the wet skin of the dome takes a broad soft sheen on the
        // lamp's side
        float dl = max(dot(nv, Lv), 0.), tb = abs(uv.y) / .21;
        g = (LKP.x > .5 ? dl * 1.35 + .04 : dl * dl * 1.3 + .2) * (1. + .25 * smoothstep(.03 * A0.w, 0., -sd)) * tn
          + .16 * pow(max(dot(nv, normalize(Lv - normalize(d))), 0.), 10.) * smoothstep(1., .4, tb);
      }
      o = vec4(.5 + sd / .2, min(g / 1.6, 1.), dk, lt);
    }
  }
  // (the rays' slabs keep their distance at under half scale: the water softens their outline over two or three pixels)
  o.x = clamp(.5 + best / (k == 1 || k == 2 ? .44 : .2), 0., 1.);
}`,Fo=ye+qe+`out vec4 o;
float PA;
`+Eo+`
void main() {${Ke}
  if (rd.y > -1e-4) discard;
  float tw = -ro.y / rd.y;
  vec3 p = ro + rd * tw;
  float pr0 = length(p.xz - PCX);
  if (pr0 > (BIOON ? 24. : 17.)) discard;
  vec2 dq = ro.xz + rd.xz * ((DKY - ro.y) / rd.y);
  if (ro.y > DKY && dq.x > X0 && dq.x < X1 && dq.y > ZF && dq.y < ZW) discard;
  float fp = tw * PA / sqrt(max(-rd.y, .02));
  o = vec4(underwater(p, rd, surfN(p.xz, fp), fp, tw) * (BIOON ? 1. : smoothstep(17., 12., pr0)), 0.);
}`,qo=ye+qe+ko+`
uniform vec4 uA;
out vec4 o;
void main() {
  vec2 p = uA.xy + gl_FragCoord.xy / 512. * uA.z;
  vec2 g; vec3 H;
  RGH = 0.;
  waves(p, uA.w > .5 ? uA.z / 512. : 0., g, H);
  if (uA.w > .5) { o = vec4(g, sqrt(RGH), 0.); return; }
  vec3 inc = normalize(vec3(p.x, 0., p.y) - LPOS);
  vec3 tw = refract(inc, vec3(0., 1., 0.), 1. / ETA);
  float kf = DEP / max(-tw.y, .2) * (1. - 1. / ETA) * .9;
  o = vec4(g, kf * (H.x + H.z), kf * kf * (H.x * H.z - H.y * H.y));
}`;function No(r){const mt=(x,k)=>{const _=Math.floor(x),m=Math.floor(k);let pt=x-_,z=k-m;pt=pt*pt*(3-2*pt),z=z*z*(3-2*z);const Y=_&255,bt=(m&255)<<8,ct=Y+1&255,K=bt+256&65535,ut=r[bt+Y<<2],lt=r[bt+ct<<2],B=r[K+Y<<2],T=r[K+ct<<2];return(ut+(lt-ut)*pt+(B-ut)*z+(ut-lt-B+T)*pt*z)*.00392156862745098};let Wt=7999955;const b=()=>(Wt=Math.imul(Wt^Wt>>>15,739982445),Wt=Math.imul(Wt^Wt>>>12,695872825),Wt^=Wt>>>15,(Wt>>>0)/4294967296),P=(x,k,_)=>{const m=Math.min(Math.max((_-x)/(k-x),0),1);return m*m*(3-2*m)},Z=x=>(x^=x>>>16,x=Math.imul(x,2146121005),x^=x>>>15,x=Math.imul(x,2221713035),x^=x>>>16,x>>>0),U=x=>(Z(x>>>0)>>>8)/16777216,V=new Uint8Array(864*416*4),dt=new Float32Array(864*416),n=[];for(let x=0;x<90;x++)n.push([-2.7+4.9*b(),.05+1.5*b()*b(),.008+.03*b()*b()]);const Vt=[[.4,.395,.375],[.31,.275,.23],[.2,.15,.11],[.47,.4,.29]];for(let x=0;x<36;x++){const k=b()*90,_=b()*90,m=.42+.3*b(),pt=-2.7+x*.145,z=n.filter(lt=>Math.abs(lt[0]-pt-.0725)<.11),Y=[];for(let lt=b()<.6?b()<.3?2:1:0;lt>0;lt--)Y.push([.025+.085*b(),.2+3*b(),.007+.012*b()]);const bt=Z(Math.imul(x+50,577)+3>>>0),ct=U(bt)<.5?.08+.62*Math.floor(1+4*U(bt^5)):-9,K=[0,1].map(()=>{const lt=b(),B=Vt[lt<.4?0:lt<.8?1:lt<.93?2:3],T=.78+.44*b();return[B[0]*T,B[1]*T,B[2]*T]}),ut=[];for(let lt=0;lt<12;lt++)ut.push([(b()-.5)*.024,(b()-.5)*.02,b()<.75?.07+.18*b():0,b()]);for(let lt=0;lt<256;lt++){const B=3.4*((lt+.5)/256)*((lt+.5)/256),T=K[B>ct?1:0],h=Math.abs(B-ct),v=2.2*mt(B*.8+_,x*7.3)+.9*mt(B*3.1,k),it=mt(x*5.3+40,B*1.1+k),Tt=pt+.145,et=mt(pt*2.1+70,B*1.7),Rt=mt(Tt*2.1+70,B*1.7),Xt=mt(pt*4+20,B*4)-.5,$t=mt(Tt*4+20,B*4)-.5,oe=mt(pt*3+50,B*3),ft=mt(Tt*3+50,B*3),Te=mt(pt*2+9,B*1.3),Lt=mt(Tt*2+9,B*1.3),Ht=(B+.23)/.62,xe=Math.floor(Ht),Ce=(Ht-xe-.5)*.62;let d=0;for(const A of z)Math.abs(B-A[1])<.07&&d++;const c=P(.5,.05,B+.25*it)+P(.25,.02,h),i=.4*P(1.5,.3,B),I=.35+.4*P(1.8,.2,B),st=.9-1.1*Math.min(B/3.2,1);let F=0;for(const A of Y)Math.abs(B-A[1])<A[2]*4&&F++;for(let A=0;A<24;A++){const L=lt*864+x*24+A,ot=(A+.5)/24,Zt=ot*.134,q=pt+ot*.145,Ft=mt(Zt*46+v+k,B*1.2+_);let wt=.64+.62*Ft,qt=.55*Ft;const D=Math.abs(mt(Zt*30+k,B*.7+_)-.5);if(D<.04){const at=P(.04,.01,D)*Math.min(1,c+(it>m?.8:0));wt*=1-.78*at,qt-=1.8*at}if(F)for(const at of Y){const It=(Zt-at[0])/at[2],l=(B-at[1])/(at[2]*2.4),u=It*It+l*l;if(u>2.6)continue;const N=Math.sqrt(u);wt*=1-.55*P(1,.6,N)-.2*P(1.6,1.1,N)*P(.8,1.1,N),qt+=.5*P(1,.5,N)}wt*=.8+.36*(et+(Rt-et)*ot);let O=T[0]*wt,J=T[1]*wt,S=T[2]*wt;const vt=Te+(Lt-Te)*ot,X=Math.abs(q-st+.25*(vt-.5));if(X<.5){const at=P(.5,.12,X)*(.55+.45*vt),It=.6*at,l=.42*(.8+.25*Ft);O+=(l-O)*It,J+=(l*.96-J)*It,S+=(l*.88-S)*It,qt*=1-.6*at}const Nt=Xt+($t-Xt)*ot,re=Math.min(ot,1-ot);let Gt=B<.8?P(.5,.06,B+.55*Nt):0;if(d)for(const at of z){const It=q-at[0],l=B-at[1],u=(It*It+l*l)/(at[2]*at[2]);u<2&&(Gt=Math.max(Gt,P(1.25,.7,Math.sqrt(u)+.3*Nt)*.9))}re<.14&&(Gt=Math.min(1,Gt+i*P(.14,0,re)));const ce=(Gt-.2)*(Gt-.2),Se=oe+(ft-oe)*ot,fe=(ce<.03?.5*Math.exp(-ce/.006)*P(.3,.7,mt(q*9,B*9)):0)+(Gt<.9&&Se>.6?.3*P(.6,.82,Se)*(1-Gt):0),Pt=ut[(xe*2+(ot<.5?0:1)+24)%12],ie=(ot<.5?ot-.22:ot-.78)*.134-Pt[0],kt=Ce-Pt[1];let Ct=0,he=0;if(ie*ie<.0016&&kt>-.26&&kt<.03){const at=(ie*ie+kt*kt)/169e-6;if(at<9){const It=.5*Math.exp(-at)*(.6+.6*mt(q*30,B*30));O*=1-It,J*=1-It,S*=1-It,he=P(1.1,.35,Math.sqrt(at)*1.6)}if(Pt[2]>0&&kt<0){const It=-kt/Pt[2];It<1&&(Ct=P(1,.15,It)*Math.exp(-ie*ie/((.004+.011*It)*(.004+.011*It)))*(.5+.6*Ft)*.85)}}const ke=1-.55*Gt;if(O*=ke*(1-.12*Gt),J*=ke*(1-.2*Gt),S*=ke*(1-.3*Gt),fe>0){const at=Math.min(fe,.8);O+=(.56-O)*at,J+=(.545-J)*at,S+=(.5-S)*at}if(Ct>0){const at=Math.min(Ct,.9);O+=(.33-O)*at,J+=(.13-J)*at,S+=(.045-S)*at}if(he>0&&(O+=(.05-O)*he,J+=(.042-J)*he,S+=(.038-S)*he,qt-=.8*he),re<.16){const at=P(.16,0,re)*I;O*=1-at,J*=1-at*.8,S*=1-at}const we=L<<2;V[we]=Math.sqrt(O)*255,V[we+1]=Math.sqrt(J)*255,V[we+2]=Math.sqrt(S)*255,dt[L]=qt}}}const R=(x,k,_)=>{const m=x*_;return mt(m,k)*(1-x)+mt(m-_,k)*x};for(let x=0;x<3;x++){const k=37*x+11;for(let _=0;_<160;_++){const m=(_+.5)/160;for(let pt=0;pt<128;pt++){const z=(pt+.5)/128,Y=(256+_)*864+x*128+pt,bt=R(z,m*1.1+k,70),ct=R(z,m*3.5+k,26);let K=.5+.45*bt+.45*ct,ut=.45*bt+.35*ct;const lt=Math.abs(R(z,m*.4+k*2,22)-.5);if(lt<.06){const Rt=P(.06,.012,lt)*P(.3,.5,R(z,m*.9+90,5));K*=1-.9*Rt,ut-=3*Rt}const B=P(.45,.7,R(z,m*1.3+k+30,4));let T=(.36+(.27-.36)*B)*K,h=(.355+(.21-.355)*B)*K,v=(.34+(.15-.34)*B)*K;const it=Math.min(.75,.55*P(.3,0,m)*P(.4,.7,R(z,m*6+3,30))+.3*P(.62,.8,R(z,m*2.5+60,12)));T+=(.56-T)*it,h+=(.545-h)*it,v+=(.5-v)*it;const Tt=P(.14,0,m+.08*(R(z,3+k,9)-.5));T*=1-.6*Tt,h*=1-.5*Tt,v*=1-.62*Tt;const et=Y<<2;V[et]=Math.sqrt(T)*255,V[et+1]=Math.sqrt(h)*255,V[et+2]=Math.sqrt(v)*255,dt[Y]=ut}}}for(let x=0;x<864*416;x++){const k=x%864,_=k>0?dt[x-1]:dt[x],m=k<863?dt[x+1]:dt[x];V[x*4+3]=Math.max(0,Math.min(255,128+(m-_)*70))}return V}function Co(){const G=document.createElement("canvas");G.width=512,G.height=256;const j=G.getContext("2d",{willReadFrequently:!0});j.fillStyle="#000",j.fillRect(0,0,512,256);const Kt=(R,x)=>{j.beginPath(),j.moveTo(R[0],R[1]);for(const k of x)j.bezierCurveTo(k[0],k[1],k[2],k[3],k[4],k[5]);for(let k=x.length-1;k>=0;k--){const _=x[k],m=k?x[k-1]:[0,0,0,0,R[0],R[1]];j.bezierCurveTo(_[2],-_[3],_[0],-_[1],m[4],-m[5])}j.closePath()};j.setTransform(256/1.32,0,0,256/1.32,.66*256/1.32,.66*256/1.32);const se=[[.4,0],[[.4,.026,.385,.045,.35,.052],[.32,.056,.29,.055,.26,.056],[.23,.058,.21,.062,.19,.07],[.12,.2,0,.45,-.13,.625],[-.145,.632,-.16,.628,-.165,.61],[-.14,.45,-.16,.22,-.225,.075],[-.24,.078,-.262,.07,-.27,.05],[-.276,.034,-.274,.02,-.268,.014],[-.28,.01,-.29,.006,-.295,0]]];Kt(se[0],se[1]),j.fillStyle="#f00",j.fill(),j.setTransform(256/1.2,0,0,256/1.2,256+.6*256/1.2,.6*256/1.2);const mt=[[.5,0],[[.5,.024,.475,.043,.42,.052],[.36,.062,.3,.068,.255,.07],[.22,.085,.15,.145,.085,.19],[.076,.196,.07,.186,.082,.174],[.12,.125,.155,.085,.165,.064],[.08,.058,-.05,.043,-.12,.034],[-.15,.046,-.185,.058,-.2,.05],[-.19,.04,-.2,.029,-.225,.024],[-.28,.019,-.32,.013,-.36,.012],[-.42,.015,-.5,.02,-.56,.011],[-.565,.006,-.565,.002,-.56,0]]];Kt(mt[0],mt[1]),j.fillStyle="#f00",j.fill(),j.save(),j.clip(),j.globalCompositeOperation="lighter",j.fillStyle="#0f0";for(const R of[1,-1])j.beginPath(),j.ellipse(.083,.183*R,.035,.022,-.6*R,0,At),j.fill();j.beginPath(),j.ellipse(-.53,0,.045,.03,0,0,At),j.fill(),j.fillRect(-.02,-.006,.05,.012),j.restore(),j.setTransform(1,0,0,1,0,0);const Wt=j.getImageData(0,0,512,256).data,b=new Uint8Array(512*256*4),P=256,Z=new Float64Array(P),U=new Float64Array(P),V=new Int32Array(P),dt=new Float64Array(P+1),n=()=>{let R=0;V[0]=0,dt[0]=-1/0,dt[1]=1/0;for(let x=1;x<P;x++){let k=(Z[x]+x*x-(Z[V[R]]+V[R]*V[R]))/(2*x-2*V[R]);for(;k<=dt[R];)R--,k=(Z[x]+x*x-(Z[V[R]]+V[R]*V[R]))/(2*x-2*V[R]);R++,V[R]=x,dt[R]=k,dt[R+1]=1/0}R=0;for(let x=0;x<P;x++){for(;dt[R+1]<x;)R++;U[x]=(x-V[R])*(x-V[R])+Z[V[R]]}},Vt=(R,x)=>{const k=new Float64Array(P*P);for(let _=0;_<P;_++)for(let m=0;m<P;m++)k[_*P+m]=Wt[(_*512+R+m)*4]>127===x?0:1e20;for(let _=0;_<P;_++){for(let m=0;m<P;m++)Z[m]=k[m*P+_];n();for(let m=0;m<P;m++)k[m*P+_]=U[m]}for(let _=0;_<P;_++){for(let m=0;m<P;m++)Z[m]=k[_*P+m];n();for(let m=0;m<P;m++)k[_*P+m]=Math.sqrt(U[m])}return k};for(const[R,x]of[[0,1.32],[256,1.2]]){const k=Vt(R,!0),_=Vt(R,!1);for(let m=0;m<P;m++)for(let pt=0;pt<P;pt++){const z=(m*512+R+pt)*4,Y=Wt[z]/255,bt=k[m*P+pt]>0?k[m*P+pt]-.5+(.5-Y)*0:-(_[m*P+pt]-.5);b[z]=Math.max(0,Math.min(255,Math.round((.5+bt*x/256/.12)*255))),b[z+1]=Wt[z+1],b[z+2]=Wt[z+2],b[z+3]=255}}return b}const ze=.9,pe=.13,Io=.05,Ue=r=>Math.sqrt(Math.max(r,0)/(Math.max(r,0)+Io)),no=r=>(r>>>=0,r^=r>>>16,r=Math.imul(r,2146121005),r^=r>>>15,r=Math.imul(r,2221713035),r^=r>>>16,r>>>0),Ne=r=>(no(r)>>>8)/16777216;function Do(r,e){const G=r.width,j=r.height,Kt=j/2,{yaw0:se,huts:mt,lo:Wt,hi:b,hiM:P,sg0:Z,agl:U,walks:V}=e,dt=d=>[0,1,2].map(c=>.3*(e.me[c]*Math.max(0,d[0]*e.md[0]+d[1]*e.md[1]+d[2]*e.md[2])+e.sky[c]*3*(.55+.45*d[1]))),n=r.getContext("2d",{willReadFrequently:!0});n.setTransform(1,0,0,1,0,0),n.globalCompositeOperation="source-over",n.globalAlpha=1,n.clearRect(0,0,G,j),n.lineCap="round",n.lineJoin="round";const Vt=2*Math.atan(Math.PI/ze),R=G<1200,x=Math.atan(Wt/pe),k=Math.atan(b/pe),_=Math.atan(P/pe),m=[1,.6,.28],pt=[1,.5,.16],z=(d,c)=>"rgba("+Math.round(Ue(d[0])*255)+","+Math.round(Ue(d[1])*255)+","+Math.round(Ue(d[2])*255)+","+(c===void 0?1:c)+")",Y=(d,c,i)=>[d[0]+c[0]*i,d[1]+c[1]*i,d[2]+c[2]*i],bt=(d,c)=>[d[0]*c,d[1]*c,d[2]*c],ct=(d,c,i)=>[d[0]+(c[0]-d[0])*i,d[1]+(c[1]-d[1])*i,d[2]+(c[2]-d[2])*i];let K=e.eye,ut=0,lt=0;const B=d=>G/Vt/ze/(1+d*d),T=d=>Kt/((ut?_:k-x)*pe*(1+(d/pe)**2)),h=d=>ut?Math.atan(d/pe)/_:(Math.atan(d/pe)-x)/(k-x),v=d=>{const c=d[0]-K[0],i=d[1]-K[1],I=d[2]-K[2],st=Math.hypot(c,i,I)||1e-6;let F=Math.atan2(c,-I)-se;F-=At*Math.floor(F/At+.5);const A=i/st;return[(.5+Math.atan(F/ze)/Vt)*G,lt+h(A)*Kt,st,F,A]},it=(d,c)=>{const i=[];for(let F=0;F<d.length;F++){const A=d[F],L=d[(F+1)%d.length];for(let ot=0;ot<c;ot++)i.push(v(ct(A,L,ot/c)))}let I=1e9,st=-1e9;for(const F of i)I=Math.min(I,F[0]),st=Math.max(st,F[0]);if(st-I>G/2)for(const F of i)F[0]<G/2&&(F[0]+=G);return i.wrap=st-I>G/2,i},Tt=(d,c)=>{c(0),(d.wrap||d.some(i=>i[0]>G))&&(n.save(),n.translate(-G,0),c(1),n.restore())},et=d=>{n.beginPath(),d.forEach((c,i)=>i?n.lineTo(c[0],c[1]):n.moveTo(c[0],c[1])),n.closePath()},Rt=(d,c)=>Tt(d,()=>{et(d),n.fillStyle=c,n.fill()}),Xt=(d,c)=>(K[0]-c[0])*d[0]+(K[1]-c[1])*d[1]+(K[2]-c[2])*d[2]>0,$t=d=>{const c=[0,0,0];for(const i of d)c[0]+=i[0],c[1]+=i[1],c[2]+=i[2];return bt(c,1/d.length)},oe=(d,c,i,I)=>{const st=v(d),F=B(st[3]/ze),A=T(st[4]),L=c/st[2],ot=R?2.2:1.3;let Zt=Math.max(ot,L*F),q=Math.max(ot,L*A),Ft=I;if(ut){const wt=Math.hypot(L,Z)/L;q=Math.max(ot,Math.hypot(L,Z)*A),Ft=I/Math.sqrt(Math.min(wt,60))*1.5}n.save(),n.globalCompositeOperation="lighter";for(const wt of[0,G]){if(wt&&st[0]<G-Zt*3)continue;n.setTransform(Zt,0,0,q,st[0]-wt,st[1]);const qt=Math.max(i[0],i[1],i[2]),D=Ue(Ft*qt),O=i.map(S=>Math.round(255*Ue(Ft*S)/D)).join(","),J=n.createRadialGradient(0,0,0,0,0,3);J.addColorStop(0,"rgba("+O+","+Math.min(1,D)+")"),J.addColorStop(.18,"rgba("+O+","+D*.55+")"),J.addColorStop(.45,"rgba("+O+","+D*.14+")"),J.addColorStop(1,"rgba("+O+",0)"),n.fillStyle=J,n.fillRect(-3,-3,6,6)}n.restore()},ft=d=>{const c=v(d);return Math.sqrt(B(c[3]/ze)*T(c[4]))/c[2]},Te=d=>{let c=(d.hs^5369127)>>>0;const i=()=>(c=no(c+2654435769),c/4294967296),I=.9+.2*i(),st=Math.floor(i()*3),F=d.on>0,A=d.f[0],L=d.f[1],ot=-L,Zt=A,q=(l,u,N)=>[d.p[0]+(ot*l-A*N)*I,u*I,d.p[1]+(Zt*l-L*N)*I],Ft=l=>[ot*l[0]-A*l[2],l[1],Zt*l[0]-L*l[2]],wt=i(),qt=ct([.0046,.0036,.0024],[.0036,.0033,.0027],wt),D=3.6+.25*i(),O=3.45+.2*i(),J=2.1,S=8.9,vt=st===1?7.1+.4*i():7.5+.6*i(),X=[[-1.95,-.85,2.15,3.15,2],[.75,1.85,2.15,3.15,2],[-.45,.35,1.5,3.3,2],[4.2,5,2.2,3.05,0],[6.3,7.1,2.2,3.05,0],[4.2,5,2.2,3.05,1],[6.3,7.1,2.2,3.05,1]],Nt=X.map(()=>{const l=i(),u=.8+.5*i();return F?l<.3?u:l<.55?.28*u:l<.72?.09*u:0:0});if(F&&!Nt.some(l=>l===1)&&(Nt[d.one?0:Math.floor(i()*3)]=1),d.one)for(let l=1;l<Nt.length;l++)Nt[l]=0;const re=F&&!d.one&&i()<.8,Gt=d.party?[[1.6,.35,.55],[.45,1.3,.5],[1.4,.9,.3]]:null,ce=F?Nt.reduce((l,u)=>l+u,0)/3:0,Se=()=>{const l=[];for(const W of[-2.8,-1.4,0,1.4,2.8])for(const p of[.3,1.6,3.1,4.6,6.2,7.7])l.push([W,p]);const u=l.map(([W,p])=>({x:W,zl:p,d:Math.hypot(...q(W,.6,p).map(($,gt)=>$-K[gt]))}));u.sort((W,p)=>p.d-W.d);const N=[-(K[2]-q(0,0,0)[2]),K[0]-q(0,0,0)[0]],C=Math.hypot(...N)||1;for(const W of u){const p=q(W.x,0,W.zl),$=q(W.x,1.27,W.zl),gt=.085*I,g=N[0]/C*gt,ht=N[1]/C*gt,Bt=it([[p[0]-g,0,p[2]-ht],[p[0]+g,0,p[2]+ht],[$[0]+g,$[1],$[2]+ht],[$[0]-g,$[1],$[2]-ht]],2),Ut=F?Math.exp(-Math.max(W.zl-.3,0)*.45):0,Mt=v(p),Qt=v($);Tt(Bt,()=>{const St=n.createLinearGradient(Mt[0],Mt[1],Qt[0],Qt[1]);St.addColorStop(0,z(Y([.0022,.0019,.0016],[.005,.025,.024],Ut))),St.addColorStop(.5,z(Y([.0019,.0016,.0013],[.0015,.0075,.0072],Ut))),St.addColorStop(1,z(Y([.0016,.0013,.001],[6e-4,.003,.003],Ut))),et(Bt),n.fillStyle=St,n.fill()})}n.lineWidth=Math.max(.5,.06*I*ft(q(0,.6,0))),n.strokeStyle=z([.0017,.0015,.0012]),n.beginPath();for(const W of[.3,7.7])for(let p=0;p<4;p++){const $=-2.8+1.4*p,gt=$+1.4;for(const[g,ht]of[[q($,.15,W),q(gt,1.15,W)],[q(gt,.15,W),q($,1.15,W)]]){const Bt=v(g),Ut=v(ht);Math.abs(Bt[0]-Ut[0])<G/2&&(n.moveTo(Bt[0],Bt[1]),n.lineTo(Ut[0],Ut[1]))}}n.stroke()},fe=(l,u,N)=>{const C=[[[-1,0,0],[[l[0],l[1],l[2]],[l[0],l[1],u[2]],[l[0],u[1],u[2]],[l[0],u[1],l[2]]]],[[1,0,0],[[u[0],l[1],u[2]],[u[0],l[1],l[2]],[u[0],u[1],l[2]],[u[0],u[1],u[2]]]],[[0,-1,0],[[l[0],l[1],l[2]],[u[0],l[1],l[2]],[u[0],l[1],u[2]],[l[0],l[1],u[2]]]],[[0,1,0],[[l[0],u[1],u[2]],[u[0],u[1],u[2]],[u[0],u[1],l[2]],[l[0],u[1],l[2]]]],[[0,0,-1],[[u[0],l[1],l[2]],[l[0],l[1],l[2]],[l[0],u[1],l[2]],[u[0],u[1],l[2]]]],[[0,0,1],[[l[0],l[1],u[2]],[u[0],l[1],u[2]],[u[0],u[1],u[2]],[l[0],u[1],u[2]]]]];for(const[W,p]of C){const $=p.map(gt=>q(...gt));Xt(Ft(W),$t($))&&N(W,p,$)}},Pt=(l,u,N)=>{const C=it(N,3);if(l[1]>.5){const W=v(q(0,1.5,.1)),p=v(q(0,1.5,2.9));Tt(C,()=>{const $=n.createLinearGradient(W[0],W[1],p[0],p[1]);$.addColorStop(0,z(Y([.0028,.0025,.002],m,re?.006:0))),$.addColorStop(1,z(Y([.0026,.0023,.0019],m,.012*ce))),et(C),n.fillStyle=$,n.fill()})}else l[1]<-.5?Rt(C,z(Y([.0012,.001,9e-4],[.006,.03,.028],F?1:0))):Rt(C,z(Y([.0019,.0016,.0012],[.0016,.008,.0075],F?l[2]<-.5?1:.4:0)))},ie=(l,u,N)=>{const C=it(N,3),W=v(q(0,1.5,3)),p=v(q(0,3.75,3)),$=Y(l[2]<-.5?[.0021,.0017,.0012]:[.0017,.0014,.001],dt(Ft(l)),.8);Tt(C,()=>{const g=n.createLinearGradient(W[0],W[1],p[0],p[1]);g.addColorStop(0,z(Y($,[8e-4,.004,.0038],F&&l[2]<-.5?1:0))),g.addColorStop(1,z(Y($,m,.003*ce))),et(C),n.fillStyle=g,n.fill()});const gt=ft($t(N));if(gt>3){n.lineWidth=Math.max(.4,.025*I*gt),n.strokeStyle=z(bt($,.55),.5),n.beginPath();const g=Math.abs(l[0])>.5,ht=Math.min(80,Math.floor((g?5:5.2)/.16));for(let Bt=1;Bt<ht;Bt++){const Ut=Bt/ht,Mt=g?q(u[0][0],1.5,3+5*Ut):q(-2.6+5.2*Ut,1.5,u[0][2]),Qt=g?q(u[0][0],D,3+5*Ut):q(-2.6+5.2*Ut,D,u[0][2]),St=v(Mt),ue=v(Qt);Math.abs(St[0]-ue[0])<G/2&&(n.moveTo(St[0],St[1]),n.lineTo(ue[0],ue[1]))}n.stroke()}X.forEach((g,ht)=>{if(!(g[4]===2?l[2]<-.5:g[4]===0?l[0]<-.5:l[0]>.5))return;const Ut=g[4]===1?2.6:-2.6,Mt=(zt,Et)=>g[4]===2?q(zt,Et,2.99):q(Ut*1.004,Et,zt),Qt=Nt[ht],St=d.party&&Qt?ct(pt,Gt[ht%3],.5):pt,ue=Qt?Y([.002,.0016,.0011],St,.36*Qt):[6e-4,6e-4,7e-4],ge=[Mt(g[0],g[2]),Mt(g[1],g[2]),Mt(g[1],g[3]),Mt(g[0],g[3])],me=it(ge,2),ve=v(Mt((g[0]+g[1])/2,g[2])),Ee=v(Mt((g[0]+g[1])/2,g[3]));Tt(me,()=>{const zt=n.createLinearGradient(ve[0],ve[1],Ee[0],Ee[1]);zt.addColorStop(0,z(bt(ue,.6))),zt.addColorStop(.7,z(ue)),zt.addColorStop(1,z(bt(ue,.8))),et(me),n.fillStyle=zt,n.fill()});const Dt=ft(ge[0]),xt=i();if(Qt&&Dt>4){if(xt<.45){n.lineWidth=Math.max(.4,.03*I*Dt),n.strokeStyle=z([.0012,9e-4,7e-4],.8),n.beginPath();for(let zt=g[2]+.1;zt<g[3]-.04;zt+=.14){const Et=v(Mt(g[0],zt)),Jt=v(Mt(g[1],zt));n.moveTo(Et[0],Et[1]),n.lineTo(Jt[0],Jt[1])}n.stroke()}if(xt>.45&&xt<.8){const zt=.3+.4*i(),Et=i()<.5?g[0]:g[1]-(g[1]-g[0])*zt,Jt=it([Mt(Et,g[2]),Mt(Et+(g[1]-g[0])*zt,g[2]),Mt(Et+(g[1]-g[0])*zt,g[3]),Mt(Et,g[3])],2);Rt(Jt,z(Y([.002,.0015,.001],St,.07*Qt),.9))}}if(n.lineWidth=Math.max(.5,.06*I*Dt),n.strokeStyle=z([.0011,9e-4,7e-4]),Tt(me,()=>{et(me),n.stroke()}),Qt){const zt=Mt((g[0]+g[1])/2,(g[2]+g[3])/2);oe(zt,(g[1]-g[0])*(ut?.45:.7)*I,St,(ut?.06:.012)*Qt)}})},kt=(l,u,N,C,W)=>{const p=[l,u,N,C].map(Dt=>q(...Dt)),$=[p[1][0]-p[0][0],p[1][1]-p[0][1],p[1][2]-p[0][2]],gt=$t(p),g=[gt[0]-p[0][0],gt[1]-p[0][1],gt[2]-p[0][2]],ht=[$[1]*g[2]-$[2]*g[1],$[2]*g[0]-$[0]*g[2],$[0]*g[1]-$[1]*g[0]],Bt=Math.hypot(...ht);for(let Dt=0;Dt<3;Dt++)ht[Dt]/=Bt;if(ht[1]<0)for(let Dt=0;Dt<3;Dt++)ht[Dt]=-ht[Dt];if(!Xt(ht,gt))return;const Ut=N[0]===C[0]&&N[1]===C[1]&&N[2]===C[2]?[p[0],p[1],p[2]]:p,Mt=it(Ut,4),Qt=.45+.55*ht[1],St=Y(bt(qt,Qt),dt(ht),1),ue=Y(St,m,W*ce),ge=v(ct(p[0],p[1],.5)),me=v(ct(p[3],p[2],.5)),ve=ft(gt),Ee=Math.hypot(v(p[0])[0]-v(p[1])[0],v(p[0])[1]-v(p[1])[1]);Tt(Mt,()=>{const Dt=n.createLinearGradient(ge[0],ge[1],me[0],me[1]);if(Dt.addColorStop(0,z(ue)),Dt.addColorStop(.35,z(bt(St,1.05))),Dt.addColorStop(1,z(bt(St,.8))),et(Mt),n.fillStyle=Dt,n.fill(),ve<2)return;n.save(),et(Mt),n.clip();const xt=Math.min(260,Math.max(8,Math.floor(Ee/1.6)));n.lineWidth=Math.max(.45,.035*I*ve);for(const[Et,Jt]of[[.55,.5],[1.45,.35],[.8,.45]]){n.strokeStyle=z(bt(St,Et),Jt),n.beginPath();for(let yt=0;yt<xt;yt++){if(i()>.4)continue;const le=(yt+i())/xt,Re=i()*.25,be=.5+.5*i(),H=ct(ct(p[0],p[1],le),ct(p[3],p[2],le),Re),Ae=ct(ct(p[0],p[1],le),ct(p[3],p[2],le),be),ae=v(H),Ie=v(Ae);Math.abs(ae[0]-Ie[0])<G/2&&(n.moveTo(ae[0],ae[1]),n.lineTo(Ie[0],Ie[1]))}n.stroke()}n.lineWidth=Math.max(.5,.05*I*ve),n.strokeStyle=z(bt(St,.45),.7),n.beginPath();for(let Et=.14+.04*i();Et<.95;Et+=.13+.04*i())for(let Jt=0;Jt<=8;Jt++){const yt=Jt/8,le=v(ct(ct(p[0],p[3],Et+.012*Math.sin(yt*17+Et*40)),ct(p[1],p[2],Et+.012*Math.sin(yt*17+Et*40)),yt));Jt?n.lineTo(le[0],le[1]):n.moveTo(le[0],le[1])}n.stroke(),n.restore();const zt=Math.min(140,Math.max(6,Math.floor(Ee/2.2)));n.fillStyle=z(Y(bt(St,.7),m,W*ce*.7)),n.beginPath();for(let Et=0;Et<zt;Et++){const Jt=Et/zt,yt=(Et+1)/zt,le=(Jt+yt)/2+(i()-.5)*.4/zt,Re=v(ct(p[0],p[1],Jt)),be=v(ct(p[1],p[0],1-yt)),H=ct(p[0],p[1],le),Ae=v([H[0],H[1]-(.06+.3*i()*i())*I,H[2]]);Math.abs(Re[0]-be[0])>G/2||(n.moveTo(Re[0],Re[1]),n.lineTo(Ae[0],Ae[1]),n.lineTo(be[0],be[1]),n.closePath())}n.fill()})},Ct=()=>{const l=[[-O,D,J],[O,D,J]],u=[[O,D,S],[-O,D,S]];if(st===0){const N=[0,vt,4.6],C=[0,vt,6.4];kt(l[0],l[1],N,N,.006),kt(u[0],u[1],C,C,.002),kt([-O,D,S],[-O,D,J],N,C,.004),kt([O,D,J],[O,D,S],C,N,.004),he([N,C])}else if(st===1){const N=[0,vt,J-.3],C=[0,vt,S+.3];ke(J-.3,-1),ke(S+.3,1),kt([-O,D,S+.3],[-O,D,J-.3],N,C,.004),kt([O,D,J-.3],[O,D,S+.3],C,N,.004),he([N,C])}else{const N=(vt-D)/O,C=D+N*(O-.9),W=[0,vt+.25,4.2],p=[0,vt+.25,6.8],$=[-.9,C,4.2],gt=[.9,C,4.2],g=[.9,C,6.8],ht=[-.9,C,6.8];kt(l[0],l[1],gt,$,.006),kt(u[0],u[1],ht,g,.002),kt([-O,D,S],[-O,D,J],$,ht,.004),kt([O,D,J],[O,D,S],g,gt,.004),kt(ht,$,W,p,0),kt(gt,g,p,W,0),we([$,gt,W],[0,0,-1]),we([g,ht,p],[0,0,1]),he([W,p])}},he=l=>{const u=q(...l[0]),N=q(...l[1]),C=ft(u),W=v(u),p=v(N);Math.abs(W[0]-p[0])>G/2||(n.lineWidth=Math.max(.8,.28*I*C),n.strokeStyle=z(bt(qt,.62)),n.beginPath(),n.moveTo(W[0],W[1]),n.lineTo(p[0],p[1]),n.stroke(),n.lineWidth=Math.max(.4,.08*I*C),n.strokeStyle=z(bt(qt,1.25),.6),n.beginPath(),n.moveTo(W[0],W[1]+(ut?1:-1)*.06*C),n.lineTo(p[0],p[1]+(ut?1:-1)*.06*C),n.stroke())},ke=(l,u)=>{const N=[[-O,D,l],[O,D,l],[0,vt,l]],C=N.map(ht=>q(...ht));if(!Xt(Ft([0,0,u]),$t(C)))return;const W=it(C,3);Rt(W,z(Y([.0032,.0026,.0018],m,.002*ce)));const p=ft(C[0]);p>3&&(n.lineWidth=Math.max(.4,.03*I*p),n.strokeStyle=z([.0017,.0013,9e-4],.6),Tt(W,()=>{n.save(),et(W),n.clip(),n.beginPath();for(let ht=-12;ht<=12;ht++)for(const Bt of[1,-1]){const Ut=v(q(ht*.32,D,l)),Mt=v(q(ht*.32+Bt*4,D+4,l));n.moveTo(Ut[0],Ut[1]),n.lineTo(Mt[0],Mt[1])}n.stroke(),n.restore()})),n.lineWidth=Math.max(.7,.32*I*p),n.strokeStyle=z(bt(qt,.75));const $=v(C[0]),gt=v(C[2]),g=v(C[1]);Math.abs($[0]-g[0])<G/2&&(n.beginPath(),n.moveTo($[0],$[1]),n.lineTo(gt[0],gt[1]),n.lineTo(g[0],g[1]),n.stroke())},we=(l,u)=>{const N=l.map(C=>q(...C));Xt(Ft(u),$t(N))&&Rt(it(N,2),z(Y([.0011,9e-4,7e-4],m,.004*ce)))},at=()=>{const l=[[-O,D,J],[O,D,J],[O,D,S],[-O,D,S]].map(W=>q(...W));if(!Xt([0,-1,0],$t(l)))return;const u=it(l,3),N=v(q(0,D,J)),C=v(q(0,D,3));Tt(u,()=>{const W=n.createLinearGradient(N[0],N[1],C[0],C[1]);W.addColorStop(0,z(Y([.0011,9e-4,7e-4],m,.003*ce))),W.addColorStop(1,z(Y([.0013,.001,8e-4],m,.009*ce))),et(u),n.fillStyle=W,n.fill()})},It=()=>{if(F){if(re){const l=q(2.75,1.5,.25),u=q(2.75,2.05,.25),N=v(l),C=v(u);n.lineWidth=Math.max(.5,.08*I*ft(l)),n.strokeStyle=z([.0012,.001,8e-4]),n.beginPath(),n.moveTo(N[0],N[1]),n.lineTo(C[0],C[1]),n.stroke(),oe(q(2.75,2.15,.25),.07*I,m.map((W,p)=>W*[1,.9,.75][p]),.9)}if(d.party)for(let l=0;l<9;l++){const u=-2.9+5.8*l/8;oe(q(u,2.05-.18*Math.sin(Math.PI*(l%3/3+.17)),.05),.045*I,Gt[l%3],.5)}}};ut?(Ct(),at(),fe([-2.6,1.5,3],[2.6,D-.02,8],ie),fe([-2.75,1.25,3],[2.75,1.5,8],Pt),fe([-3,1.25,0],[3,1.5,3],Pt),Se(),It()):(Se(),fe([-2.75,1.25,3],[2.75,1.5,8],Pt),fe([-3,1.25,0],[3,1.5,3],Pt),Ct(),at(),fe([-2.6,1.5,3],[2.6,D-.02,8],ie),It())},Lt=(d,c,i)=>{const{a0:I,ax:st,j:F}=d,A=[-st[2],0,st[0]],L=(S,vt,X)=>[I[0]+st[0]*S+A[0]*X,vt,I[2]+st[2]*S+A[2]*X],ot=L(c,0,-.8),Zt=L(c,0,.8);for(const S of ut?[]:[ot,Zt]){const vt=v(S),X=v([S[0],1.2,S[2]]);Math.abs(vt[0]-X[0])<G/2&&(n.lineWidth=Math.max(.5,.12*ft(S)),n.strokeStyle=z([.0016,.0013,.001]),n.beginPath(),n.moveTo(vt[0],vt[1]),n.lineTo(X[0],X[1]),n.stroke())}const q=S=>S*7,Ft=Math.round((c+i)/14),wt=Math.abs((c+i)/2-Ft*7),qt=Ft,O=qt>=1&&qt<=Math.floor(d.len/7)-1&&Ne(qt*31+F*7+5)>=.12&&!(F===0&&Math.abs(I[0]+st[0]*qt*7)<3.5)?Math.exp(-wt*wt/6):0,J=[[[0,1,0],[L(c,1.42,-.9),L(i,1.42,-.9),L(i,1.42,.9),L(c,1.42,.9)],Y([.0017,.0014,.0011],m,.03*O)],[[0,-1,0],[L(c,1.2,-.9),L(i,1.2,-.9),L(i,1.2,.9),L(c,1.2,.9)],Y([9e-4,8e-4,7e-4],m,.004*O)],[A,[L(c,1.2,.9),L(i,1.2,.9),L(i,1.42,.9),L(c,1.42,.9)],Y([.0013,.0011,9e-4],m,.01*O)],[bt(A,-1),[L(c,1.2,-.9),L(i,1.2,-.9),L(i,1.42,-.9),L(c,1.42,-.9)],Y([.0013,.0011,9e-4],m,.01*O)]];for(const[S,vt,X]of J)Xt(S,$t(vt))&&Rt(it(vt,2),z(X));for(const S of ut?[ot,Zt]:[]){const vt=v(S),X=v([S[0],1.2,S[2]]);Math.abs(vt[0]-X[0])<G/2&&(n.lineWidth=Math.max(.5,.12*ft(S)),n.strokeStyle=z([.0016,.0013,.001]),n.beginPath(),n.moveTo(vt[0],vt[1]),n.lineTo(X[0],X[1]),n.stroke())}for(let S=Math.max(1,Math.ceil(c/7));q(S)<i&&S<=Math.floor(d.len/7)-1;S++){if(F===0&&Math.abs(I[0]+st[0]*S*7)<3.5)continue;const vt=S%2*2-1,X=L(q(S),1.42,vt*.85),Nt=L(q(S),2,vt*.85),re=v(X),Gt=v(Nt);Math.abs(re[0]-Gt[0])<G/2&&(n.lineWidth=Math.max(.5,.07*ft(X)),n.strokeStyle=z([.0013,.0011,9e-4]),n.beginPath(),n.moveTo(re[0],re[1]),n.lineTo(Gt[0],Gt[1]),n.stroke()),Ne(S*31+F*7+5)>=.12&&oe(L(q(S),2.05,vt*.85),.06,m,1.6)}},Ht=(d,c)=>{const i=Math.floor(d),I=d-i,st=I*I*(3-2*I);return Ne(i*7919+c)*(1-st)+Ne((i+1)*7919+c)*st},xe=d=>{const c=Math.abs(d),i=(F,A,L)=>{const ot=Yt((L-F)/(A-F),0,1);return ot*ot*(3-2*ot)},I=i(1.75,2.35,c)*(.012+.045*Math.pow(Ht(d*6+40,3),1.5)+.012*Ht(d*30,5)+.001),st=i(.45,.6,d)*(1-i(1.2,1.35,d))*(.0032+.0012*Ht(d*80,9)+.0055*Math.pow(Ht(d*330,11),4));return Math.max(I,st)},Ce=()=>{const d=[],c=G;for(let L=0;L<=c;L++){const ot=L/c,Zt=Math.tan((ot-.5)*Vt)*ze,q=Zt+se,Ft=q-At*Math.floor(q/At+.5),wt=xe(Ft),qt=h(wt),D=h(0);d.push([L,lt+qt*Kt,lt+D*Kt,wt])}const i=[7e-4,8e-4,.001],I=[.0012,.0016,.0014];n.beginPath(),n.moveTo(0,d[0][2]);for(const L of d)n.lineTo(L[0],L[1]);for(let L=d.length-1;L>=0;L--)n.lineTo(d[L][0],d[L][2]);n.closePath();const st=lt+h(0)*Kt,F=lt+h(.03)*Kt,A=n.createLinearGradient(0,st,0,F);A.addColorStop(0,z(Y(i,I,U))),A.addColorStop(.25,z(Y(i,I,U*.4))),A.addColorStop(1,z(i)),n.fillStyle=A,n.fill();for(let L=-2100;L<=2100;L++){const ot=L/900;if(Math.abs(ot)<1.85||Ne((L+9e3)*97+3)<.93)continue;const q=.0012+.002*Ne((L+9e3)*3+2);oe([K[0]+Math.sin(ot)*900,K[1]+q*900,K[2]-Math.cos(ot)*900],1.6,m,.35)}};for(ut=0;ut<2;ut++){K=ut?[e.eye[0],-e.eye[1],e.eye[2]]:e.eye,lt=ut*Kt,n.save(),n.beginPath(),n.rect(0,lt,G,Kt),n.clip(),Ce();const d=[];for(const c of mt){const i=[c.p[0]-c.f[0]*4,3,c.p[1]-c.f[1]*4];d.push({d:Math.hypot(i[0]-K[0],i[2]-K[2]),f:()=>Te(c)})}for(const c of V)for(let i=0;i<c.len-.01;){const I=[c.a0[0]+c.ax[0]*(i+1.75),0,c.a0[2]+c.ax[2]*(i+1.75)],st=Math.hypot(I[0]-K[0],I[2]-K[2]),F=st<35||i%7?3.5:7,A=i;d.push({d:st,f:()=>Lt(c,A,Math.min(A+F,c.len))}),i+=F}d.sort((c,i)=>i.d-c.d);for(const c of d)c.f();n.restore()}return r}function _o(r,e){if(r.__c583){const T=r.__c583;return T.want(e),T}const G=r.getExtension("KHR_parallel_shader_compile");G&&G.maxShaderCompilerThreadsKHR&&G.maxShaderCompilerThreadsKHR(4294967295);const j=(T,h)=>{const v=r.createShader(T);return r.shaderSource(v,h),r.compileShader(v),v},Kt=j(r.VERTEX_SHADER,bo);r.getExtension("EXT_color_buffer_float"),r.getExtension("EXT_color_buffer_half_float");const se=`#define BIOON false
#define PILES false
#define PIL 0
#define RAB 1.
`,mt=`#define BIOON (BIO.x > .01)
#define PILES false
#define PIL 0
#define RAB 1.
`,Wt=`#define BIOON false
#define PILES true
#define PIL 1
#define RAB 2.
#define KNP .2
`,b=(T,h)=>T.replace(`uniform vec4 uC[40];
`,`uniform vec4 uC[40];
`+h),P={n:Ro,blit:wo,surf:qo,mw:yo,a1:Lo,h:Po},Z=T=>{const[h,v]=T.split("_");return h==="a2"||h==="a2b"?b(So,(h==="a2b"?`#define BIOON (BIO.x > .01)
`:`#define BIOON false
`)+"#define NGK "+v[0]+`
#define LANT `+(v[1]==="l"?1:0)+`
`):v!==void 0?b(Fo,{b:se,bp:Wt,bb:mt}[h]+"#define FLK "+v+`
`):P[T]},U={},V=T=>{const h=r.createProgram(),v=j(r.FRAGMENT_SHADER,Z(T));r.attachShader(h,Kt),r.attachShader(h,v),r.linkProgram(h),U[T]={p:h,f:v}},dt=T=>{const h=r.createProgram(),v=j(r.FRAGMENT_SHADER,Z(T));U[T]={p:h,f:v,h:1}},n=T=>{const h=U[T];h.h&&(h.h=0,r.attachShader(h.p,Kt),r.attachShader(h.p,h.f),r.linkProgram(h.p))},Vt=["blit","surf","mw","n","a1"];for(const T of e)V(T);for(const T of Vt)V(T);r.flush();let R=6219139;const x=()=>(R=Math.imul(R^R>>>15,739982445),R=Math.imul(R^R>>>12,695872825),R^=R>>>15,R&255),k=new Uint8Array(256*256*4);for(let T=0;T<k.length;T++)k[T]=x();r.pixelStorei(r.UNPACK_ALIGNMENT,1);const _=(T,h,v,it,Tt,et,Rt,Xt)=>{const $t=r.createTexture();return r.bindTexture(r.TEXTURE_2D,$t),r.texImage2D(r.TEXTURE_2D,0,v,T,h,0,it,Tt,Xt||null),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,et),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,et),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,Rt),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,Rt),$t},m=_(256,256,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR,r.REPEAT,k),pt=_(864,416,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR,r.CLAMP_TO_EDGE,No(k));r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.generateMipmap(r.TEXTURE_2D);const z=_(512,256,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR,r.CLAMP_TO_EDGE,Co()),Y=_(4,80,r.RGBA32F,r.RGBA,r.FLOAT,r.NEAREST,r.CLAMP_TO_EDGE,null),bt={uN:0,uMW:1,uD:2,uS:3,uS1:4,uS2:5,uT:6,uDK:7,uAN:8,uL:9,uFS:10},ct={},K=T=>{if(ct[T])return ct[T];U[T]?n(T):V(T);const h=U[T].p;if(!r.getProgramParameter(h,r.LINK_STATUS))throw new Error("583 "+T+": "+r.getShaderInfoLog(U[T].f)+" "+r.getShaderInfoLog(Kt)+" "+r.getProgramInfoLog(h));const it={p:h};ct[T]=it;const Tt=r.getProgramParameter(h,r.ACTIVE_UNIFORMS);for(let et=0;et<Tt;et++){const Rt=r.getActiveUniform(h,et).name.replace("[0]","");it[Rt]=r.getUniformLocation(h,Rt)}r.useProgram(h);for(const et in bt)it[et]&&r.uniform1i(it[et],bt[et]);return it},ut=r.createVertexArray(),lt=[0,1].map(()=>{const T=_(512,512,r.RGBA16F,r.RGBA,r.HALF_FLOAT,r.LINEAR,r.CLAMP_TO_EDGE,null),h=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,h),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,T,0),{t:T,fb:h}});r.bindFramebuffer(r.FRAMEBUFFER,null);const B={ready:K,tN:m,tD:Y,tDK:pt,tA:z,vao:ut,tex2:_,surf:lt,far:[],tick:0,FIRST:Vt,want:T=>{let h=0;for(const v of T)U[v]?U[v].h&&(n(v),h=1):(V(v),h=1);h&&r.flush()},late:(T,h)=>{(h?U[T]&&U[T].h:!U[T])&&(h?n(T):dt(T),r.flush())}};return r.__c583=B,B}oo.add({num:583,name:"Overwater Hut",fam:"Vistas",recipe:"The deck of an overwater hut in a Pacific lagoon at night, with the light making a turquoise pool in the dark water and the sand clear underneath, while the rest of the lagoon mirrors the sky and the neighbours' lamps. The night, the visitors and the floor change every mint. Tap the water and whatever's close darts off, drag to send a breeze across, or hold to switch the light off and watch sparks flash wherever a fish moves.",interactive:"Tap the water to ring it (whatever swims near starts away); drag to send a breeze across the lagoon (cat's paws run over the water and the view of the floor wobbles and breaks); hold to switch the deck light off: the pool goes dark, sparks of bioluminescence flash wherever a fish moves and the Milky Way brightens in the mirror.",music:!0,gl:!0,fps:30,seed:0,make(r){const e=r.gl,G=r.size,j=r.hash.slice(2).padEnd(64,"0");let Kt=parseInt(j.slice(0,8),16)>>>0,se=parseInt(j.slice(8,16),16)>>>0,mt=parseInt(j.slice(16,24),16)>>>0,Wt=parseInt(j.slice(24,32),16)>>>0;const b=()=>{const t=(Kt+se|0)+Wt|0;return Wt=Wt+1|0,Kt=se^se>>>9,se=mt+(mt<<3)|0,mt=mt<<21|mt>>>11,mt=mt+t|0,(t>>>0)/4294967296};for(let t=0;t<16;t++)b();let P=(parseInt(j.slice(32,40),16)^1540483477)>>>0;const Z=()=>{P=P+1831565813|0;let t=Math.imul(P^P>>>15,1|P);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},U=!!r.home,V=t=>(b()-.5)*2*t,dt=vo&&typeof window<"u"&&window.__F583||{},n=(t,a,s,o)=>{let f=0;for(const w of a)f+=w[1];let M=b()*f,y=a[a.length-1];for(const w of a)if(M-=w[1],M<0){y=w;break}return U&&(y=a[s]),dt[t]!==void 0&&(y=a[dt[t]]),r.trait(o||t,y[0]),y[2]},Vt=n("Visitors",[["Eagle rays and a blacktip",5,0],["Blacktip patrol",2.5,1],["Lone ray",2,2],["Ray squadron",1,3]],0),R=n("Deck light",[["Cool white",5,0],["Aqua",3,1],["Warm",1.5,2]],0),x=n("Milky Way",[["Milky Way, core rising",5,0],["Milky Way, core high",3,1],["Milky Way overhead",2,2]],0,"Sky"),k=n("Floor",[["White sand",4,0],["Coral heads",4,1],["Seagrass",1.5,2]],0),_=n("Air",[["Light air",5,0],["Glassy",3,1],["Reef swell",1.5,2]],0),m=n("Plankton",[["Plankton",4,0],["Clear",4,1],["Mysid cloud",1,2]],0),pt=n("Neighbours",[["Lit walkway",5,0],["Late night",2.5,1],["Party hut",1,2]],0),z=n("Depth",[["Two metres",5,0],["Shallow",2,1],["Deep",2,2]],0);let Y=(parseInt(j.slice(40,48),16)^625341585)>>>0;const bt=()=>{Y=Y+1831565813|0;let t=Math.imul(Y^Y>>>15,1|Y);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ct=[["At the rail",5,[1.15,3,.35],.07,-.45],["Deck corner",3,[1.8,3,0],-.32,-.52],["Sitting on the edge",2.5,[.05,2.35,-.7],.38,-.62],["Leaning over the edge",1,[.45,2.75,-.78],.26,-.98]];let K=0;{let t=0;for(const s of ct)t+=s[1];let a=bt()*t;K=ct.length-1;for(let s=0;s<ct.length;s++)if(a-=ct[s][1],a<0){K=s;break}}U&&(K=0),dt.Standpoint!==void 0&&(K=Math.min(dt.Standpoint,3)),r.trait("Standpoint",ct[K][0]);let ut=(parseInt(j.slice(48,56),16)^2135587861)>>>0;const lt=()=>{ut=ut+1831565813|0;let t=Math.imul(ut^ut>>>15,1|ut);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let B=!U&&lt()<.27;dt.Pool!==void 0&&(B=!!dt.Pool),B&&k===0&&dt.Pool===void 0&&(B=!1),B&&r.trait("Visitors",["Eagle rays and a blacktip","Blacktip patrol","Lone ray","Ray squadron"][Vt]+", arriving later");const T=[20+25*lt(),0,0,0,0,0].map((t,a,s)=>a?s[a-1]+6+30*lt():t),h=ct[K].slice();h[2]=h[2].slice(),h[5]=K===3?40:34;let v=(parseInt(j.slice(56,64),16)^461845907)>>>0;const it=()=>{v=v+1831565813|0;let t=Math.imul(v^v>>>15,1|v);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Tt=[["Moonless",46],["Low moon",16],["Full moon",14],["First light",10],["Passing shower",8],["Far lightning",6]];let et=0;{let t=it()*100;for(let a=0;a<Tt.length;a++)if(t-=Tt[a][1],t<0){et=a;break}}U&&(et=0),dt.Night!==void 0&&(et=dt.Night),et&&r.trait("Sky",Tt[et][0]);const Rt=[it(),it(),it(),it()],Xt=[it(),it(),it(),it()];!U&&dt.Standpoint===void 0&&K<2&&Xt[0]<.2&&et!==4?(K=4,h[0]="Looking out",h[2]=[.9+.5*Xt[1],3,.35],h[3]=.07+(Xt[2]-.5)*.7,h[4]=-.11-.05*Xt[3],h[5]=25):!U&&K===0&&(h[3]+=(Xt[1]-.5)*.5,h[2][0]=Yt(h[2][0]+(Xt[2]-.5)*2.4,-1.9,1.75)),dt.Standpoint===4&&(K=4,h[0]="Looking out",h[2]=[1.15,3,.35],h[3]=.07,h[4]=-.13,h[5]=25),K===4&&(h[2][1]=2.45,h[3]=-.3+(h[3]-.07)*.5,h[4]=Math.max(h[4],-.13));const $t=r.hash.toLowerCase()==="0xc2e9cf1343ef7b0f68554361b675baf89af6736353db4138c12dd5e0c100b240";let oe=(parseInt(j.slice(8,16),16)^parseInt(j.slice(48,56),16)^1013904242)>>>0;const ft=()=>{oe=oe+1831565813|0;let t=Math.imul(oe^oe>>>15,1|oe);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<3;t++)ft();const Te=[["",46],[" pile lamps",16],[" lantern",12],[" spot",10],[" wide flood",16]];let Lt=0;{let t=ft()*100;for(let a=0;a<Te.length;a++)if(t-=Te[a][1],t<0){Lt=a;break}}(U||$t)&&(Lt=0),dt.Lamp!==void 0&&(Lt=dt.Lamp);const Ht=[ft(),ft(),ft(),ft(),ft(),ft()],xe=[ft(),ft(),ft(),ft()],Ce=K===4&&dt.Standpoint===void 0&&(Lt===2||Lt===3);Ce&&(K=0,h[0]="At the rail",h[2]=ct[0][2].slice(),h[3]=ct[0][3],h[4]=ct[0][4],h[5]=34);const d=dt.Standpoint>=5?dt.Standpoint:!U&&!$t&&dt.Standpoint===void 0&&K<3&&xe[0]<.3?xe[1]<.55||Ce?5:6:0;d===5?(K=5,h[0]="Along the edge",h[2]=[-2.25,3,-.62],h[3]=1.2+.25*xe[2],h[4]=-.36-.1*xe[3],h[5]=34):d===6&&(K=6,h[0]="Low on the steps",h[2]=[1.25+.45*xe[2],.55,-1.32],h[3]=-.35+.3*xe[3],h[4]=-.2,h[5]=36),r.trait("Deck light",["Cool white","Aqua","Warm"][R]+Te[Lt][0]),r.trait("Standpoint",h[0]);const c=new Float32Array(40*4),i=(t,a,s,o,f)=>{c[t*4]=a,c[t*4+1]=s,c[t*4+2]=o,c[t*4+3]=f},I=t=>{const a=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/a,t[1]/a,t[2]/a]},st=(t,a)=>[t[1]*a[2]-t[2]*a[1],t[2]*a[0]-t[0]*a[2],t[0]*a[1]-t[1]*a[0]],F=[2.1,.72,4.75][z]+(U?0:V(z===1?.06:.12));let A=K===3?[1.05,-3.4]:[1.4,-6],L=[-.15,.62,-.95],ot=K===3?7:28,Zt=3,q=[-2,1],Ft=.022,wt=150,qt=1;const D=[[1,.97,.93],[.16,1,.62],[1.25,.66,.27]][R];let O=D.slice();const J=[];if(Lt===0&&!U&&!$t&&K!==3)A=[1.4+(Ht[0]-.5)*3,-6+(Ht[1]-.5)*2],ot=18+22*Ht[2],wt*=.85+.4*(ot-18)/22;else if(Lt===4)A=[.4+(Ht[0]-.5)*1.6,-5.2],ot=2.2,wt=75,Ft=.04;else if(Lt===3)A=[.9+(Ht[0]-.5)*2.2,-3.6-1.6*Ht[1]],ot=14,q=[.989,1/.004],wt=30,Ft=.012;else if(Lt===2)L=[2.2,1.55+.78,-1.12],A=[1.7,-2.6],ot=.25,Zt=.35,wt=7,qt=.06,O=[D[0]*.4+.6,D[1]*.4+.6*.62,D[2]*.4+.6*.26],Ft=0;else if(Lt===1){const t=[[2.08,-1.04],[-.15,-.97],[-2.62,-1.04]],a=Ht[3]<.45?Math.floor(Ht[4]*3):-1;for(let s=0;s<3;s++)s!==a&&J.push([t[s][0],-.75-.45*Ht[s],t[s][1]-.1]);wt=0,qt=.5,Ft=0,A=[J.reduce((s,o)=>s+o[0],0)/J.length,-2.8]}const S="_"+et+(Lt===2?"l":""),vt=(J.length?"bp_":"b_")+k,X=_o(e,["a2"+S,vt]),Nt=X.ready,re=Lt===2?[0,-1,0]:I([A[0]-L[0],-F*.55-L[1],A[1]-L[2]]),Gt=Lt===2?L:[.35,1.55+1.95,.6],ce=Lt===2?3.2:Ft*150,Se=6;i(4,...L,1),i(5,...re,ot),i(6,D[0]*wt,D[1]*wt,D[2]*wt,F);for(let t=0;t<3;t++)i(33+t,...J[t]||[0,0,0],0);i(36,J.length,Zt,q[0],q[1]),i(37,...Gt,Lt===2?1.2:1.3),i(39,...D,0),i(14,.42,.055,.07,m===2?.09:m===1?.03:.055),i(15,0,k===2?1:0,k===0?.4:k===1?.025:0,0),i(16,0,1,0,[.18,.05,.6][m]);const fe=[.75,.3,.7][pt];i(17,fe,pt===2?U?11:[11,12,1,6][Math.floor(b()*4)]:-1,Math.floor(b()*65536),0),i(21,.6,U?.78:.55+b()*.35,0,0),i(24,A[0],A[1]+1.2,b()*50,0),i(25,.9,.64,.4,0),i(13,.8+b()*.6,.5+b()*.5,b()*At,0),i(22,0,1,0,0);const Pt=(()=>{const t=h[3],a=(o,f)=>[Math.sin(o)*Math.cos(f),Math.sin(f),-Math.cos(o)*Math.cos(f)],s={md:[0,1,0],mi:0,sky:[0,0,0],mw:1,band:[0,0,0],star:1,fl:[0,0,0,0],mc:[0,0,0],rain:0,up:[0,0,0],wet:0,me:[0,0,0]};return et===1?(s.md=a(t+(Rt[0]-.5)*.7,(8+12*Rt[1])*Math.PI/180),s.mi=5,s.mc=[1,.84,.6],s.sky=[5e-4,9e-4,.0019],s.mw=.3,s.star=.55,s.up=[5e-4,.001,.0013],s.me=[.01,.0085,.006]):et===2?(s.md=a(t+2.1+.5*Rt[0],.85+.3*Rt[1]),s.mi=9,s.mc=[.8,.88,1],s.sky=[.001,.0034,.013],s.mw=.05,s.star=.14,s.up=[.007,.014,.017],s.me=[.06,.068,.085]):et===3?(s.md=a(t+(Rt[0]-.5)*1.1,0),s.band=[.16,.085,.036],s.sky=[9e-4,.0022,.0075],s.mw=.08,s.star=.3,s.up=[.0016,.003,.004],s.me=[.006,.0045,.0035]):et===4?(s.fl=[0,0,0,1],s.rain=.8,s.wet=1,s.mw=0,s.star=0,s.sky=[6e-4,5e-4,4e-4]):et===5&&(s.fl=[0,10+t+(Rt[0]-.5)*.9,0,0],s.mw=.8),s})();i(26,...Pt.md,Pt.mi),i(27,...Pt.sky,Pt.mw),i(28,...Pt.band,Pt.star),i(29,...Pt.fl),i(30,...Pt.mc,Pt.rain),i(31,...Pt.up,Pt.wet),i(32,...Pt.me,0);const ie=[];if(et===5){let t=3.55+.2*it();for(let a=0;a<40;a++)ie.push([t,.2+.4*it(),(it()-.5)*.5,it()]),t+=2+12*it()}const kt=new Float32Array(4*80*4),Ct=(t,a,s,o,f,M)=>{const y=(t*4+a)*4;kt[y]=s,kt[y+1]=o,kt[y+2]=f,kt[y+3]=M},he=9.81,ke=73e-6,we=t=>Math.sqrt(he*t+ke*t*t*t);let at=0;const It=-.4+V(.6),l=[.0035,.0028,.02][_];for(let t=0;t<4;t++){const a=5+b()*9,s=At/a,o=Math.PI/2+V(.35);Ct(24+at,0,Math.sin(o)*0+Math.cos(o),Math.sin(o),s,l*(.5+b()*.7)),Ct(24+at,1,we(s),b()*At,0,0),at++}const u=[1,.06,1.1][_];for(let t=0;t<20;t++){const a=.08*Math.pow(10,t/19)*(1+V(.08)),s=At/a,o=t%2?b()*At:It+V(1.2)*1.5,f=.016*Math.pow(a/.3,.3)*(.5+b());Ct(24+at,0,Math.cos(o),Math.sin(o),s,f/s*u),Ct(24+at,1,we(s),b()*At,1,0),at++}let N=0;const C=[];if(k===1&&!U){const t=9+Math.floor(Ht[5]*6);for(let a=0;a<120&&C.length<t;a++){const s=ft(),o=s<.4?0:s<.72?1:2,f=o===0?.18+.32*ft():o===1?.14+.24*ft():.24+.24*ft(),M=ft()*At,y=Math.sqrt(ft())*(Lt===3?1.6:Lt===2?1.9:2.9),w=A[0]+Math.cos(M)*y,E=A[1]+.8+Math.sin(M)*y*1.2;E>-1.5-f||C.some(tt=>Math.hypot(tt[0]-w,tt[1]-E)<(tt[2]+f)*1.25+.08)||C.push([w,E,f,o===0?.55+.2*ft():o===1?.62+.2*ft():.2+.08*ft(),o])}}if(k===1){const t=U?[[-.6,-5.6,.55],[3.2,-3.4,.4],[2.4,-7.6,.7]]:[];if(!U)for(let s=0;s<3;s++){const o=s?b()*At:1.1+b()*1,f=s?1.8+b()*3:1.6+b()*1.2;t.push([A[0]+Math.cos(o)*f,A[1]+Math.sin(o)*f*1.3,.35+b()*.4])}let a=0;for(const[s,o,f]of t)for(let M=0;M<3&&a<8;M++){const y=f*(M===0?1:.55+b()*.25),w=M?V(f*.8):0,E=M?V(f*.8):0;U&&(Ct(48+N,0,s+w,-F-y*.45,o+E,y),Ct(48+N,1,1,0,0,0),N++),a++}for(const[s,o,f,M,y]of C){const w=y===1?2+(ft()<.5?1:0):1;for(let E=0;E<w&&N<16;E++){const tt=ft()*At,nt=E?f*(.55+.25*ft()):f,Q=E?Math.cos(tt)*f*.7:0,rt=E?Math.sin(tt)*f*.7:0;Ct(48+N,0,s+Q,-F-nt*M*(y===2?-.15:.3),o+rt,nt),Ct(48+N,1,M,y,(ft()-.5)*.45,(ft()-.5)*.45),N++}}}c[15*4]=N;const W=h[3],p=h[4],$=Math.tan(h[5]*Math.PI/180),gt=[[.1,.38],[.42,.25],[1.1,.6]][x],g=.07-.32+(U?0:V(.35)),ht=gt[0]+(U?0:V(.06)),Bt=[Math.sin(g)*Math.cos(ht),Math.sin(ht),-Math.cos(g)*Math.cos(ht)],Ut=I([Math.cos(g),0,Math.sin(g)]),Mt=I(st(Bt,Ut)),Qt=gt[1]+(U?0:V(.3));let St=I([0,1,2].map(t=>Mt[t]*Math.cos(Qt)+Ut[t]*Math.sin(Qt)));St[1]<0&&(St=St.map(t=>-t));const ue=st(Bt,St);i(7,...Bt,0),i(8,...St,0),i(9,...ue,0);const ge=G>=600?1280:768,me=G>=600?640:384,ve=1,Ee=.55;i(10,ve,Math.atan(Math.PI/ve),Ee,1);const Dt=[b()*200,b()*200,U?1.05:.85+b()*.35],xt={p:h[2].slice(),fw:[0,0,-1],rt:[1,0,0],up:[0,1,0]},zt=()=>{const t=r.view||mo;xt.p=[Yt(h[2][0]+Yt(t.x||0,-.6,.6),-2.4,1.85),h[2][1]+Yt(t.y||0,-.6,.3),Yt(h[2][2]+Yt(t.z||0,-.9,.6),Math.min(-.85,h[2][2]),2.2)];const a=W+(t.yaw||0),s=Yt(p+(t.pitch||0),-1.45,1.45),o=Math.cos(s);xt.fw=[Math.sin(a)*o,Math.sin(s),-Math.cos(a)*o],xt.rt=[Math.cos(a),0,Math.sin(a)],xt.up=st(xt.rt,xt.fw),i(0,...xt.p,$),i(1,...xt.fw,G);for(let f=0;f<3;f++)c[8+f]=xt.rt[f],c[12+f]=xt.up[f]},Et=()=>{for(let t=0;t<5;t++)for(let a=0;a<5;a++){const s=a/2-1,o=t/2-1,f=[0,1,2].map(w=>xt.fw[w]+(s*xt.rt[w]+o*xt.up[w])*$*1.04);let M=0,y=1e9;for(let w=0;w<3;w++){const E=[-3.7,1.2,.62][w],tt=[3.3,4.6,8.1][w],nt=xt.p[w];if(Math.abs(f[w])<1e-9){(nt<E||nt>tt)&&(y=-1);continue}const Q=(E-nt)/f[w],rt=(tt-nt)/f[w];M=Math.max(M,Math.min(Q,rt)),y=Math.min(y,Math.max(Q,rt))}if(M<=y)return!0}return!1},Jt=(t,a)=>{const s=t*2-1,o=1-a*2;return I([0,1,2].map(f=>xt.fw[f]+(s*xt.rt[f]+o*xt.up[f])*$))},yt=[],le=[2,1,1,5][Vt],Re=[1,3,0,1][Vt];for(let t=0;t<le;t++){const a=U?[1.75,1.35][t]:1.3+b()*.7,s=Vt===3?(1.1+(a-1.3)/.7*.5)/1.25:a*.9,o=1.3+b()*1.3+(t>1?1:0),f=U?[2.3,-.6][t]:b()*At,M=U?[1,-1][t]:b()<.5?1:-1,y=A[0]+V(.8)*(U?0:1)+(U?[-.2,.6][t]:0),w=A[1]+1.5+V(.8)*(U?0:1)+(U?[.4,-.9][t]:0);yt.push({ty:0,x:y+Math.cos(f)*o,z:w+Math.sin(f)*o,y:-1-b()*.5,h:f+M*Math.PI/2,v:.5,S:s,ph:b()*At,amp:.5,flap:b()*At,bank:0,yb:-.9-b()*.6,wp:[y-Math.sin(f)*M*2,Math.min(w+Math.cos(f)*M*2,-2.4)],wpT:6+8*b()})}for(let t=1;t<yt.length;t++)for(let a=0;a<t;a++){const s=yt[t].x-yt[a].x,o=yt[t].z-yt[a].z,f=Math.hypot(s,o)||1,M=K===3?3.4:2.6;f<M&&(yt[t].x+=s/f*(M-f),yt[t].z+=o/f*(M-f))}const be=yt.slice(),H=Vt===3?{x:0,z:0,h:0,v:.5,wp:null,wpT:0}:null;if(H){const t=w=>{const E=Math.sin(parseInt(j.slice(40,48),16)%100003*.0137+w*91.7)*43758.5453;return E-Math.floor(E)},a=1.02*Math.max(...be.map(w=>w.S*1.25));zt();const s=(w,E)=>{const tt=Jt(w,E),nt=(-1.5-xt.p[1])/Math.min(tt[1],-.05);return[xt.p[0]+tt[0]*nt,xt.p[2]+tt[2]*nt]},o=.4+.25*t(8),f=s(.55,.78),M=xt.fw[0]>=0?-o:Math.PI+o;H.h=M,H.x=f[0]-Math.cos(M)*3,H.z=Math.min(f[1]-Math.sin(M)*3,-2.4),H.wp=[f[0]+Math.cos(M)*2.5,Math.min(f[1]+Math.sin(M)*2.5,-2.4)],H.wpT=11,H.vp=s;const y=Math.cos(M)>=0?-1:1;be.forEach((w,E)=>{w.sq=[y*E*.92*a*(1+.08*(t(2+E)-.5)),E*.66*a+.12*a*(t(9+E)-.5)],w.h=H.h,w.fv=0,w.x=H.x-Math.sin(H.h)*w.sq[0]-Math.cos(H.h)*w.sq[1],w.z=H.z+Math.cos(H.h)*w.sq[0]-Math.sin(H.h)*w.sq[1]})}for(let t=0;t<Re;t++){const a=U?1.45:1.15+b()*.45,s=3+b()*2.5,o=U?.25:b()*At,f=U||b()<.5?1:-1;yt.push({ty:1,x:A[0]+Math.cos(o)*s,z:A[1]+Math.sin(o)*s*.8,y:-F+.45+b()*.4,h:o+f*Math.PI/2,v:.72,S:a,ph:b()*At,amp:1,bank:0,wph:b()*At,wr:b(),yb:-F+.4+b()*.5,wp:null,wpT:0})}const Ae=7+Math.floor(b()*3),ae={x:A[0]-.3,z:A[1]+2.3,h:Math.PI+.25},Ie=Math.cos(ae.h),so=Math.sin(ae.h);for(let t=0;t<Ae;t++){const a=(t-(Ae-1)/2)*.26+V(.08),s=t%3*.3-Math.abs(t-(Ae-1)/2)*.12+V(.2),o=s*Ie-a*so,f=s*so+a*Ie;yt.push({ty:2,x:ae.x+o,z:ae.z+f,y:-.035-b()*.05,h:ae.h+V(.1),v:0,S:.6+b()*.3,ph:b()*At,amp:.3,bank:0,ox:o,oz:f,dart:0,dx:0,dz:0,ds:1.4,cool:1+b()*6});{const M=yt[yt.length-1],y=w=>{const E=Math.sin((t+1)*127.1+w*311.7+M.ph*17.3)*43758.5453;return E-Math.floor(E)};M.S=.38+.75*y(1)*y(2)+.1*y(3),M.y-=.03*y(4),M.ho=(y(5)-.5)*.7,M.h+=M.ho,M.sv=.55+y(6)}}c[11*4]=yt.length;let ro=0,co=0;if(B){for(const t of yt)if(t.ty<2){const a=-Math.PI*(.1+.8*lt()),s=15+4*lt();t.far=[A[0]+Math.cos(a)*s,Math.min(A[1]+1.2+Math.sin(a)*s,-2.4)],t.x=t.far[0],t.z=t.far[1],t.wp=t.far,t.enter=T[Math.min(co++,5)]}else t.x-=14,t.z-=8.4;ro=T[Math.min(co,5)]+10}const te=new Float32Array(8),Ge=Yt(Math.round(G*.78),96,768);if(te[0]=-.07,te[1]=F<1?-.26:-Yt(F*.5,.5,1.25),te[2]=te[1]-(F<1?.13:.28),te[3]=F<1?-F+.14:Math.min(-F+.55,te[2]-.1),te[4]=1.3,te[5]=Ge,J.length&&F>1){const t=Math.min(...J.map(a=>a[1]));te[2]=Math.max(-F+.3,t-1.1),te[1]=Math.min(te[2]+.25,t-.35),te[3]=te[1]-.12}const De=[];for(let t=0;t<14;t++){let a,s,o;if(t<10){const y=t<5?1:-1,w=t%5;a=[y*(17.5+17.5*w),.3],s=0,o=-1}else{const y=t-10;a=[-30+2.1*y,-46-22*y],s=1,o=0}a[0]+=(Z()-.5)*2.5,a[1]+=(Z()-.5)*1.5;const f=(Z()<fe?1:0)+(t===c[17*4+1]?1:0),M=Math.floor(Z()*16777215);De.push({p:a.slice(),f:[s,o],on:f,hs:M,party:t===c[17*4+1],i:t}),Ct(64+t,0,a[0],0,a[1],0),Ct(64+t,1,s,o,f,M)}if(pt===1){const t=De.find(a=>a.on>0&&a.i>=10)||De.find(a=>a.on>0);for(const a of De)a!==t?(a.on=0,kt[((64+a.i)*4+1)*4+2]=0):a.one=!0}const io=[{a0:[-140,0,9.5],ax:[1,0,0],len:280,j:0},{a0:[-46,0,9],ax:I([12,0,-134]),len:135,j:1}],Fe=[];let Ye=1,Me=1,Be=0,Le=0,de=[1,0],Oe=[0,0],je=[0,0],Ot=null,Xe=!1,_t=0,He=0,Ve=0,Qe=1,Je=0;const _e=r.sound,lo=(t,a,s,o)=>{Fe.length>=8&&Fe.shift(),Fe.push({x:t,z:a,t0:_t,amp:s,b:o})},Wo=t=>{_t+=t,je[0]+=.05*t,je[1]+=.012*t,Oe[0]+=de[0]*t*1.6*(.3+Le),Oe[1]+=de[1]*t*1.6*(.3+Le),Le*=Math.exp(-t/2.8);for(let o=Fe.length-1;o>=0;o--)_t-Fe[o].t0>9&&Fe.splice(o,1);for(const o of yt){if(o.ty<2){if(o.enter>_t)o.wp=o.far;else if(o.sq&&!(o.spook>_t)){const E=Math.cos(H.h),tt=Math.sin(H.h),nt=H.x-tt*o.sq[0]-E*o.sq[1],Q=H.z+E*o.sq[0]-tt*o.sq[1];o.wp=[nt+E*1.4,Q+tt*1.4],o.wpT=_t+2,o.fv=Yt(((nt-o.x)*E+(Q-o.z)*tt)*.5,-.25,.35)}else if(!o.wp||_t>o.wpT||Math.hypot(o.wp[0]-o.x,o.wp[1]-o.z)<1){const E=Z()*At,tt=o.ty?2.2+4.8*Z():.5+3.8*Z();o.wp=[A[0]+Math.cos(E)*tt*1.15,Math.min(A[1]+1.2+Math.sin(E)*tt,-2.4)],o.wpT=_t+12+12*Z()}const f=Math.atan2(o.wp[1]-o.z,o.wp[0]-o.x),M=o.ty?.7:.55;let y=f-o.h;y=Math.atan2(Math.sin(y),Math.cos(y));const w=Yt(y,-M*t,M*t);if(o.h+=w,o.ty===0){o.bank+=(Yt(w/Math.max(t,.001)*1.5,-.95,.95)-o.bank)*Math.min(1,t*1.4),o.flap+=t*.9;const E=.5+.5*Math.sin(o.flap*.55+1.3*Math.sin(o.flap*.17));o.amp+=((E>.45?1:.12)-o.amp)*Math.min(1,t*1.2),o.ph+=t*At/2.4*(.25+.75*o.amp),o.v+=((o.sq?H.v+o.fv:.42+.18*o.amp)+(o.spook>_t?.5:0)-o.v)*Math.min(1,t*2),o.y+=(o.yb+.25*Math.sin(o.flap*.3)-o.y)*Math.min(1,t*.5)}else o.wph+=t*.05,o.bank+=(Yt(w/Math.max(t,.001)*.5,-.35,.35)-o.bank)*Math.min(1,t*2),o.ph+=t*At/.8*(o.spook>_t?1.6:1),o.v+=(.7+.1*Math.sin(o.wph*5)+(o.spook>_t?.8:0)-o.v)*Math.min(1,t*2),o.y+=(o.yb-o.y)*t*.3}else{o.cool-=t;const f=ae.x+o.ox,M=ae.z+o.oz;let y=f,w=M,E=.25*o.sv;if(o.dart>0)o.dart-=t,y=o.x+o.dx,w=o.z+o.dz,E=o.ds;else if(o.cool<0){o.cool=2+Z()*9,o.dart=.2+.25*Z(),o.ds=1.4;const Pe=o.h+(Z()-.5)*1.2,uo=.5+.8*o.sv*Z();o.dx=Math.cos(Pe)*uo,o.dz=Math.sin(Pe)*uo}const tt=y-o.x,nt=w-o.z,Q=Math.hypot(tt,nt),rt=E>1||Q>.5;let jt=(rt&&Q>.08?Math.atan2(nt,tt):ae.h+o.ho+.1*Math.sin(_t*(.3+.3*o.sv)+o.ox*5))-o.h;jt=Math.atan2(Math.sin(jt),Math.cos(jt)),o.h+=Yt(jt,-(E>1?9:1.5)*t,(E>1?9:1.5)*t);const ne=rt&&Q>.08?Math.min(E,Q*1.5)*Math.max(0,Math.cos(jt)):0;if(o.v+=(ne-o.v)*Math.min(1,t*6),!rt){const Pe=Math.min(1,t*.9);o.x+=tt*Pe,o.z+=nt*Pe}o.ph+=t*(4+o.v*14),o.amp=.25+Math.min(1,o.v),o.bank=.45*Math.sin(_t*(1.1+.5*Math.sin(o.ox*7))+o.ox*9)*(.4+.6*Math.min(1,o.v))+.25*Math.sin(o.ph*.37)}o.x+=Math.cos(o.h)*o.v*t,o.z+=Math.sin(o.h)*o.v*t}if(H){if(!H.wp||_t>H.wpT||Math.hypot(H.wp[0]-H.x,H.wp[1]-H.z)<1.2){const f=H.vp(.25+.5*Z(),.74+.18*Z());H.wp=[f[0],Math.min(f[1],-2.4)],H.wpT=_t+10+8*Z()}let o=Math.atan2(H.wp[1]-H.z,H.wp[0]-H.x)-H.h;o=Math.atan2(Math.sin(o),Math.cos(o)),H.h+=Yt(o,-.36*t,.36*t),H.x+=Math.cos(H.h)*H.v*t,H.z+=Math.sin(H.h)*H.v*t}for(let o=1;o<be.length;o++)for(let f=0;f<o;f++){const M=be[o],y=be[f],w=M.x-y.x,E=M.z-y.z,tt=Math.hypot(w,E)||.001,nt=.6*1.25*(M.S+y.S);if(tt<nt){const Q=(nt-tt)*Math.min(1,t*1.5)*.5/tt;M.x+=w*Q,M.z+=E*Q,y.x-=w*Q,y.z-=E*Q}}const a=_t<ro?14:0;ae.x=A[0]-.3+.5*Math.sin(_t*.05)-a,ae.z=A[1]+2.3+.3*Math.sin(_t*.037)-a*.6,Z()<t*.15&&lo(A[0]+(Z()-.5)*5,A[1]+1+(Z()-.5)*4,.0012,.01),Me+=(Ye-Me)*Math.min(1,t/.35),Be=Me<.5?Math.min(1,Be+t/3):Math.max(0,Be-t/.6)},Uo=()=>{for(let a=0;a<yt.length;a++){const s=yt[a],o=s.ty===2?0:s.ty===0?1+(a&1):3;Ct(a,0,s.x,te[o],s.z,s.S),Ct(a,1,Math.cos(s.h),Math.sin(s.h),s.ty,s.bank),Ct(a,2,s.ph,s.amp,o,s.v*1.6+.2)}for(let a=0;a<8;a++){const s=Fe[a];s?(Ct(16+a,0,s.x,s.z,_t-s.t0,s.amp),Ct(16+a,1,s.b,0,0,0)):Ct(16+a,0,0,0,0,0)}if(c[11*4+1]=8,c[11*4+2]=at,c[11*4+3]=0,c[2*4+3]=_t,i(12,de[0],de[1],Le,0),i(18,1,0,0,0),i(19,je[0],je[1],0,0),i(20,0,0,Oe[0],Oe[1]),c[4*4+3]=Me,c[16*4]=(1-Me)*(1-Me),ie.length){let a=0,s=0;for(const o of ie){const f=(_t-o[0])/o[1];if(f>-.05&&f<1.05){const M=Math.max(0,Math.sin(f*Math.PI))*(.55+.45*Math.sin(f*23+o[3]*9))*(f<.3||f>.55?1:.35);M>a&&(a=M,s=o[2])}}c[29*4]=a,c[29*4+2]=s}c[3*4+3]=1.25+1.6*Be;const t=Me*(Lt===1||Lt===2?qt*1.05:wt/143);for(let a=0;a<J.length;a++)c[(33+a)*4+3]=Se*Me;for(let a=0;a<3;a++)c[38*4+a]=O[a]*ce*Me;c[38*4+3]=Lt===2?1:0,c[23*4]=.1*t*D[0],c[23*4+1]=.7*t*D[1],c[23*4+2]=.65*t*D[2],e.bindTexture(e.TEXTURE_2D,X.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,4,80,e.RGBA,e.FLOAT,kt)},Go=r.hash+"|"+(G>=600?1:0)+"|"+(U?1:0),$e=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(X.vao)};let to=null,fo=null,eo=null;const Ze=(t,a,s,o,f,M)=>{const y=X.tex2(t,a,s,o,f,M,e.CLAMP_TO_EDGE,null),w=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,w),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,y,0),{t:y,fb:w}},Ko=()=>{if(to)return to;const t=Ze(ge,me,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR);e.viewport(0,0,ge,me),$e();const a=Nt("mw");return e.useProgram(a.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,X.tN),e.uniform4f(a.uM,Dt[0],Dt[1],Dt[2],ge),e.uniform4f(a.uM2,me,ve,Ee,Math.atan(Math.PI/ve)),e.drawArrays(e.TRIANGLES,0,3),to=t.t},ho=()=>{if(eo)return eo;const t=Go;let a=X.far.find(f=>f.key===t);if(a)a.use=++X.tick;else{if(X.far.length>=6){const Q=X.far.reduce((rt,ee)=>rt.use<=ee.use?rt:ee);X.far.splice(X.far.indexOf(Q),1)}const f=h[2],M=G>=600?1536:768;let y=-.02,w=.1,E=.1;const tt=(Q,rt,ee)=>{const jt=Math.hypot(Q-f[0],ee-f[2]);y=Math.min(y,(rt-f[1])/Math.hypot(jt,rt-f[1])),w=Math.max(w,(rt-f[1])/Math.hypot(jt,rt-f[1])),E=Math.max(E,(rt+f[1])/Math.hypot(jt,rt+f[1]))};for(const Q of De)for(const rt of[-3.9,0,3.9])for(const ee of[-.3,4.5,9.3]){const jt=Q.p[0]-Q.f[1]*-rt*1.1-Q.f[0]*ee*1.1,ne=Q.p[1]+Q.f[0]*rt*1.1-Q.f[1]*ee*1.1;tt(jt,0,ne),tt(jt,9.1,ne)}for(const Q of io){const rt=Yt((f[0]-Q.a0[0])*Q.ax[0]+(f[2]-Q.a0[2])*Q.ax[2],0,Q.len);for(const ee of[-3,0,3]){const jt=Q.a0[0]+Q.ax[0]*(rt+ee),ne=Q.a0[2]+Q.ax[2]*(rt+ee);tt(jt,0,ne),tt(jt,2.2,ne)}}y=Math.max(y-.01,-.7),w=Math.min(w+.01,.85),E=Math.min(E+.01,.9);const nt=document.createElement("canvas");nt.width=M,nt.height=M/4,Do(nt,{yaw0:h[3],eye:f,huts:De,lo:y,hi:w,hiM:E,sg0:[.06,.006,.07][_]+(et===4?.05:0),agl:c[13*4+1],walks:io,md:Pt.md,me:Pt.me,sky:Pt.sky}),a={key:t,cv:nt,use:++X.tick,F:new Float32Array([h[3],ze,1/(2*Math.atan(Math.PI/ze)),Math.atan(E/pe),Math.atan(y/pe),Math.atan(w/pe),M,pe])},X.far.push(a)}const s={t:e.createTexture(),F:a.F},o=a.cv;return e.bindTexture(e.TEXTURE_2D,s.t),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,o),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),eo=s},Bo=()=>{let t=fo;if(!t){const a=Ze(G,G,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST),s=Ze(G,G,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST),o=Ze(Ge,Ge*4,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR);t={t:a.t,fb:a.fb,t2:s.t,fb2:s.fb,tl:o.t,fbl:o.fb,sz:G},fo=t}return t},po=()=>{if(!X.warm){X.warm=1;for(const nt of X.FIRST)Nt(nt)}xo||(xo=1,Nt("a2"+S),Nt(vt));const t=Ko(),a=Bo(),s=ho();Uo(),$e();for(let nt=3;nt<7;nt++)e.activeTexture(e.TEXTURE0+nt),e.bindTexture(e.TEXTURE_2D,null);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,X.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,t),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,X.tD);const o=Nt("surf");e.useProgram(o.p),e.uniform4fv(o.uC,c),e.viewport(0,0,512,512),e.bindFramebuffer(e.FRAMEBUFFER,X.surf[0].fb),e.uniform4f(o.uA,-4.4,-9.6,11.2,0),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,X.surf[1].fb),e.uniform4f(o.uA,-119,-180,240,1),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,X.surf[0].t),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,X.surf[1].t),e.activeTexture(e.TEXTURE9),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,X.tA),e.bindFramebuffer(e.FRAMEBUFFER,a.fbl),e.viewport(0,0,Ge,Ge*4);const f=Nt("n");e.useProgram(f.p),e.uniform4fv(f.uC,c),e.uniform4fv(f.uK,te),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE9),e.bindTexture(e.TEXTURE_2D,a.tl),e.bindFramebuffer(e.FRAMEBUFFER,a.fb2),e.viewport(0,0,G,G),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,X.tDK);const M=Nt("a1");if(e.useProgram(M.p),e.uniform4fv(M.uC,c),e.drawArrays(e.TRIANGLES,0,3),Et()){const nt=Nt("h");e.useProgram(nt.p),e.uniform4fv(nt.uC,c),e.enable(e.BLEND),e.blendFuncSeparate(e.DST_ALPHA,e.ONE_MINUS_DST_ALPHA,e.ZERO,e.ZERO),e.blendEquation(e.FUNC_ADD),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND)}const y=c[16*4]>Math.fround(.01);e.bindFramebuffer(e.FRAMEBUFFER,a.fb),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,a.t2),e.activeTexture(e.TEXTURE10),e.bindTexture(e.TEXTURE_2D,s.t);const w=Nt((y?"a2b":"a2")+S);e.useProgram(w.p),e.uniform4fv(w.uC,c),e.uniform4fv(w.uF,s.F),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFuncSeparate(e.DST_ALPHA,e.ONE,e.ZERO,e.ONE);const E=Nt(y?"bb_"+k:vt);e.useProgram(E.p),e.uniform4fv(E.uC,c),e.uniform4fv(E.uK,te),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,G,G),$e();const tt=Nt("blit");e.useProgram(tt.p),e.uniform4f(tt.uE,c[3*4+3],0,0,0),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,a.t),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,a.t2),e.drawArrays(e.TRIANGLES,0,3)};let xo=0;ho(),zt(),po();let We=0;return(t,a)=>{a=Math.min(a||1/30,.25),++We,We>=12&&We<24&&!(We&1)&&X.late(["h","a2b"+S,"bb_"+k][We-12>>2],We&2);const s=r.input,o=s.taps?s.taps():[];zt();const f=(y,w)=>{const E=Jt(y,w);if(E[1]>-.03)return;const tt=-xt.p[1]/E[1],nt=xt.p[0]+E[0]*tt,Q=xt.p[2]+E[2]*tt;if(!(tt>30||Q>-1.1&&nt>-2.8&&nt<2.3)){lo(nt,Q,.004,.02),_e.hit("blip",.2,{freq:1500});for(const rt of yt){const ee=rt.x-nt,jt=rt.z-Q,ne=Math.hypot(ee,jt)||1;if(rt.ty===2){if(ne<2.6){rt.dart=.3+.3*Z(),rt.ds=2.4,rt.cool=2+Z()*5;const Pe=(1.6-.4*ne)/ne;rt.dx=ee*Pe+(Z()-.5)*.5,rt.dz=jt*Pe+(Z()-.5)*.5}}else ne<2.2&&(rt.wp=[rt.x+ee/ne*4,Math.min(rt.z+jt/ne*4,-2.4)],rt.wpT=_t+8,rt.spook=_t+1.6)}}};if(s.down&&!Xe&&(Ot={x:s.x,y:s.y,lx:s.x,ly:s.y,t,mode:0}),s.down&&Ot&&(Ot.mode||(Math.hypot(s.x-Ot.x,s.y-Ot.y)>.015?Ot.mode=1:t-Ot.t>.35&&(Ot.mode=2,Ye=0,_e.hit("click",.45))),Ot.mode===1)){const y=s.x-Ot.lx,w=s.y-Ot.ly,E=Math.hypot(y,w);if(E>1e-4){const tt=xt.rt[0]*y-xt.fw[0]*w*2,nt=xt.rt[2]*y-xt.fw[2]*w*2,Q=Math.hypot(tt,nt)||1;de=[de[0]*.8+tt/Q*.2,de[1]*.8+nt/Q*.2];const rt=Math.hypot(de[0],de[1])||1;de=[de[0]/rt,de[1]/rt],Le=Math.min(1.2,Le+E*2.2)}Ot.lx=s.x,Ot.ly=s.y,Je-=a,Je<0&&(Je=.35,_e.hit("noise",.1+.25*Math.min(1,Le),{cutoff:450+500*Le,dur:.8}))}if(!s.down&&Xe&&Ot&&(Ot.mode||f(Ot.x,Ot.y),Ot.mode===2&&(Ye=1,_e.hit("click",.45)),Ot=null),!s.down&&!Xe&&o.length)for(const y of o)f(y.x,y.y);Xe=s.down,He+=a;let M=0;for(;He>=1/30&&M<8;)Wo(1/30),He-=1/30,M++;M>=8&&(He=0),Ve-=a,Qe-=a,Ve<0&&(Ve=.8+Z()*.6,_e.hit("noise",.07+.05*Z(),{cutoff:160+120*Z(),dur:2.2,pan:-.2+.4*Z()})),Qe<0&&(Qe=1.2+Z()*3,_e.hit("noise",.05+.04*Z(),{cutoff:700+500*Z(),dur:.18})),po()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
