// Overwater Hut: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/583.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function($e){$e&&function(){"use strict";const ho={yaw:0,pitch:0,x:0,y:0,z:0},po=0,At=Math.PI*2,Ht=(r,e,B)=>r<e?e:r>B?B:r,ve=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,uo=ve+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 0., 1.); }",xo=ve+`
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
}`,mo=ve+`
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
}`,Ne=`
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
`,vo=`
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

`,bo=`
vec3 hutPos(int i, out vec3 f, out float lit, out uint hs) {
  vec4 a = texelFetch(uD, ivec2(0, 64 + i), 0), b = texelFetch(uD, ivec2(1, 64 + i), 0);
  f = vec3(b.x, 0., b.y); lit = b.z; hs = uint(b.w);
  return a.xyz;
}
`,to=`
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

`,yo=`
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

`,wo=`
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

`,Mo=`
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

`,go=`
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

`,zo=`
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

`,Be=`
  vec2 sc = gl_FragCoord.xy / SZ * 2. - 1.;
  vec3 rd = normalize(FW + TANH * (sc.x * RT + sc.y * UPV));
  vec3 ro = CAMP;
  PA = 2. * TANH / SZ;
`,To=ve+Ne+`out vec4 o;
float PA;
`+to+yo+`
void main() {${Be}
  vec3 nn; float mat; vec4 ax;
  float tn = deckHit(ro, rd, rd.y < -1e-4 ? min(-ro.y / rd.y, 90.) : 90., nn, mat, ax);
  o = mat > 0. ? vec4(deckShade(ro + rd * tn, rd, nn, mat, ax), 0.) : vec4(0., 0., 0., 1.);
}`,ko=ve+Ne+`out vec4 o;
float PA;
`+to+wo+`
void main() {${Be}
  vec3 nn; float mat; vec4 ax;
  float tn = hutHit(ro, rd, rd.y < -1e-4 ? min(-ro.y / rd.y, 90.) : 90., nn, mat, ax);
  if (mat < .5) discard;
  o = vec4(hutShade(ro + rd * tn, rd, nn, mat, ax), 0.);
}`,Eo=ve+Ne+`uniform sampler2D uS, uFS;
uniform vec4 uF[2];
out vec4 o;
float PA;
`+vo+bo+zo+`
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
void main() {${Be}
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
}`,Ao=ve+Ne+`
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
}`,Lo=ve+Ne+`out vec4 o;
float PA;
`+go+`
void main() {${Be}
  if (rd.y > -1e-4) discard;
  float tw = -ro.y / rd.y;
  vec3 p = ro + rd * tw;
  float pr0 = length(p.xz - PCX);
  if (pr0 > (BIOON ? 24. : 17.)) discard;
  vec2 dq = ro.xz + rd.xz * ((DKY - ro.y) / rd.y);
  if (ro.y > DKY && dq.x > X0 && dq.x < X1 && dq.y > ZF && dq.y < ZW) discard;
  float fp = tw * PA / sqrt(max(-rd.y, .02));
  o = vec4(underwater(p, rd, surfN(p.xz, fp), fp, tw) * (BIOON ? 1. : smoothstep(17., 12., pr0)), 0.);
}`,Po=ve+Ne+Mo+`
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
}`;function So(r){const mt=(d,L)=>{const X=Math.floor(d),x=Math.floor(L);let ft=d-X,z=L-x;ft=ft*ft*(3-2*ft),z=z*z*(3-2*z);const H=X&255,bt=(x&255)<<8,rt=H+1&255,O=bt+256&65535,ht=r[bt+H<<2],w=r[bt+rt<<2],v=r[O+H<<2],it=r[O+rt<<2];return(ht+(w-ht)*ft+(v-ht)*z+(ht-w-v+it)*ft*z)*.00392156862745098};let _t=7999955;const m=()=>(_t=Math.imul(_t^_t>>>15,739982445),_t=Math.imul(_t^_t>>>12,695872825),_t^=_t>>>15,(_t>>>0)/4294967296),R=(d,L,X)=>{const x=Math.min(Math.max((X-d)/(L-d),0),1);return x*x*(3-2*x)},Q=d=>(d^=d>>>16,d=Math.imul(d,2146121005),d^=d>>>15,d=Math.imul(d,2221713035),d^=d>>>16,d>>>0),Z=d=>(Q(d>>>0)>>>8)/16777216,J=new Uint8Array(864*416*4),ct=new Float32Array(864*416),a=[];for(let d=0;d<90;d++)a.push([-2.7+4.9*m(),.05+1.5*m()*m(),.008+.03*m()*m()]);const Vt=[[.4,.395,.375],[.31,.275,.23],[.2,.15,.11],[.47,.4,.29]];for(let d=0;d<36;d++){const L=m()*90,X=m()*90,x=.42+.3*m(),ft=-2.7+d*.145,z=a.filter(w=>Math.abs(w[0]-ft-.0725)<.11),H=[];for(let w=m()<.6?m()<.3?2:1:0;w>0;w--)H.push([.025+.085*m(),.2+3*m(),.007+.012*m()]);const bt=Q(Math.imul(d+50,577)+3>>>0),rt=Z(bt)<.5?.08+.62*Math.floor(1+4*Z(bt^5)):-9,O=[0,1].map(()=>{const w=m(),v=Vt[w<.4?0:w<.8?1:w<.93?2:3],it=.78+.44*m();return[v[0]*it,v[1]*it,v[2]*it]}),ht=[];for(let w=0;w<12;w++)ht.push([(m()-.5)*.024,(m()-.5)*.02,m()<.75?.07+.18*m():0,m()]);for(let w=0;w<256;w++){const v=3.4*((w+.5)/256)*((w+.5)/256),it=O[v>rt?1:0],T=Math.abs(v-rt),P=2.2*mt(v*.8+X,d*7.3)+.9*mt(v*3.1,L),et=mt(d*5.3+40,v*1.1+L),gt=ft+.145,xt=mt(ft*2.1+70,v*1.7),Wt=mt(gt*2.1+70,v*1.7),Qt=mt(ft*4+20,v*4)-.5,oe=mt(gt*4+20,v*4)-.5,$t=mt(ft*3+50,v*3),st=mt(gt*3+50,v*3),ze=mt(ft*2+9,v*1.3),Lt=mt(gt*2+9,v*1.3),jt=(v+.23)/.62,he=Math.floor(jt),Ce=(jt-he-.5)*.62;let f=0;for(const k of z)Math.abs(v-k[1])<.07&&f++;const i=R(.5,.05,v+.25*et)+R(.25,.02,T),c=.4*R(1.5,.3,v),_=.35+.4*R(1.8,.2,v),nt=.9-1.1*Math.min(v/3.2,1);let q=0;for(const k of H)Math.abs(v-k[1])<k[2]*4&&q++;for(let k=0;k<24;k++){const E=w*864+d*24+k,ot=(k+.5)/24,Xt=ot*.134,C=ft+ot*.145,Rt=mt(Xt*46+P+L,v*1.2+X);let wt=.64+.62*Rt,Ft=.55*Rt;const U=Math.abs(mt(Xt*30+L,v*.7+X)-.5);if(U<.04){const at=R(.04,.01,U)*Math.min(1,i+(et>x?.8:0));wt*=1-.78*at,Ft-=1.8*at}if(q)for(const at of H){const Ct=(Xt-at[0])/at[2],l=(v-at[1])/(at[2]*2.4),u=Ct*Ct+l*l;if(u>2.6)continue;const I=Math.sqrt(u);wt*=1-.55*R(1,.6,I)-.2*R(1.6,1.1,I)*R(.8,1.1,I),Ft+=.5*R(1,.5,I)}wt*=.8+.36*(xt+(Wt-xt)*ot);let j=it[0]*wt,$=it[1]*wt,N=it[2]*wt;const vt=ze+(Lt-ze)*ot,F=Math.abs(C-nt+.25*(vt-.5));if(F<.5){const at=R(.5,.12,F)*(.55+.45*vt),Ct=.6*at,l=.42*(.8+.25*Rt);j+=(l-j)*Ct,$+=(l*.96-$)*Ct,N+=(l*.88-N)*Ct,Ft*=1-.6*at}const Nt=Qt+(oe-Qt)*ot,ae=Math.min(ot,1-ot);let Bt=v<.8?R(.5,.06,v+.55*Nt):0;if(f)for(const at of z){const Ct=C-at[0],l=v-at[1],u=(Ct*Ct+l*l)/(at[2]*at[2]);u<2&&(Bt=Math.max(Bt,R(1.25,.7,Math.sqrt(u)+.3*Nt)*.9))}ae<.14&&(Bt=Math.min(1,Bt+c*R(.14,0,ae)));const ne=(Bt-.2)*(Bt-.2),Se=$t+(st-$t)*ot,ie=(ne<.03?.5*Math.exp(-ne/.006)*R(.3,.7,mt(C*9,v*9)):0)+(Bt<.9&&Se>.6?.3*R(.6,.82,Se)*(1-Bt):0),Pt=ht[(he*2+(ot<.5?0:1)+24)%12],se=(ot<.5?ot-.22:ot-.78)*.134-Pt[0],kt=Ce-Pt[1];let qt=0,ce=0;if(se*se<.0016&&kt>-.26&&kt<.03){const at=(se*se+kt*kt)/169e-6;if(at<9){const Ct=.5*Math.exp(-at)*(.6+.6*mt(C*30,v*30));j*=1-Ct,$*=1-Ct,N*=1-Ct,ce=R(1.1,.35,Math.sqrt(at)*1.6)}if(Pt[2]>0&&kt<0){const Ct=-kt/Pt[2];Ct<1&&(qt=R(1,.15,Ct)*Math.exp(-se*se/((.004+.011*Ct)*(.004+.011*Ct)))*(.5+.6*Rt)*.85)}}const Te=1-.55*Bt;if(j*=Te*(1-.12*Bt),$*=Te*(1-.2*Bt),N*=Te*(1-.3*Bt),ie>0){const at=Math.min(ie,.8);j+=(.56-j)*at,$+=(.545-$)*at,N+=(.5-N)*at}if(qt>0){const at=Math.min(qt,.9);j+=(.33-j)*at,$+=(.13-$)*at,N+=(.045-N)*at}if(ce>0&&(j+=(.05-j)*ce,$+=(.042-$)*ce,N+=(.038-N)*ce,Ft-=.8*ce),ae<.16){const at=R(.16,0,ae)*_;j*=1-at,$*=1-at*.8,N*=1-at}const be=E<<2;J[be]=Math.sqrt(j)*255,J[be+1]=Math.sqrt($)*255,J[be+2]=Math.sqrt(N)*255,ct[E]=Ft}}}const G=(d,L,X)=>{const x=d*X;return mt(x,L)*(1-d)+mt(x-X,L)*d};for(let d=0;d<3;d++){const L=37*d+11;for(let X=0;X<160;X++){const x=(X+.5)/160;for(let ft=0;ft<128;ft++){const z=(ft+.5)/128,H=(256+X)*864+d*128+ft,bt=G(z,x*1.1+L,70),rt=G(z,x*3.5+L,26);let O=.5+.45*bt+.45*rt,ht=.45*bt+.35*rt;const w=Math.abs(G(z,x*.4+L*2,22)-.5);if(w<.06){const Wt=R(.06,.012,w)*R(.3,.5,G(z,x*.9+90,5));O*=1-.9*Wt,ht-=3*Wt}const v=R(.45,.7,G(z,x*1.3+L+30,4));let it=(.36+(.27-.36)*v)*O,T=(.355+(.21-.355)*v)*O,P=(.34+(.15-.34)*v)*O;const et=Math.min(.75,.55*R(.3,0,x)*R(.4,.7,G(z,x*6+3,30))+.3*R(.62,.8,G(z,x*2.5+60,12)));it+=(.56-it)*et,T+=(.545-T)*et,P+=(.5-P)*et;const gt=R(.14,0,x+.08*(G(z,3+L,9)-.5));it*=1-.6*gt,T*=1-.5*gt,P*=1-.62*gt;const xt=H<<2;J[xt]=Math.sqrt(it)*255,J[xt+1]=Math.sqrt(T)*255,J[xt+2]=Math.sqrt(P)*255,ct[H]=ht}}}for(let d=0;d<864*416;d++){const L=d%864,X=L>0?ct[d-1]:ct[d],x=L<863?ct[d+1]:ct[d];J[d*4+3]=Math.max(0,Math.min(255,128+(x-X)*70))}return J}function Ro(){const B=document.createElement("canvas");B.width=512,B.height=256;const V=B.getContext("2d",{willReadFrequently:!0});V.fillStyle="#000",V.fillRect(0,0,512,256);const Ot=(G,d)=>{V.beginPath(),V.moveTo(G[0],G[1]);for(const L of d)V.bezierCurveTo(L[0],L[1],L[2],L[3],L[4],L[5]);for(let L=d.length-1;L>=0;L--){const X=d[L],x=L?d[L-1]:[0,0,0,0,G[0],G[1]];V.bezierCurveTo(X[2],-X[3],X[0],-X[1],x[4],-x[5])}V.closePath()};V.setTransform(256/1.32,0,0,256/1.32,.66*256/1.32,.66*256/1.32);const ee=[[.4,0],[[.4,.026,.385,.045,.35,.052],[.32,.056,.29,.055,.26,.056],[.23,.058,.21,.062,.19,.07],[.12,.2,0,.45,-.13,.625],[-.145,.632,-.16,.628,-.165,.61],[-.14,.45,-.16,.22,-.225,.075],[-.24,.078,-.262,.07,-.27,.05],[-.276,.034,-.274,.02,-.268,.014],[-.28,.01,-.29,.006,-.295,0]]];Ot(ee[0],ee[1]),V.fillStyle="#f00",V.fill(),V.setTransform(256/1.2,0,0,256/1.2,256+.6*256/1.2,.6*256/1.2);const mt=[[.5,0],[[.5,.024,.475,.043,.42,.052],[.36,.062,.3,.068,.255,.07],[.22,.085,.15,.145,.085,.19],[.076,.196,.07,.186,.082,.174],[.12,.125,.155,.085,.165,.064],[.08,.058,-.05,.043,-.12,.034],[-.15,.046,-.185,.058,-.2,.05],[-.19,.04,-.2,.029,-.225,.024],[-.28,.019,-.32,.013,-.36,.012],[-.42,.015,-.5,.02,-.56,.011],[-.565,.006,-.565,.002,-.56,0]]];Ot(mt[0],mt[1]),V.fillStyle="#f00",V.fill(),V.save(),V.clip(),V.globalCompositeOperation="lighter",V.fillStyle="#0f0";for(const G of[1,-1])V.beginPath(),V.ellipse(.083,.183*G,.035,.022,-.6*G,0,At),V.fill();V.beginPath(),V.ellipse(-.53,0,.045,.03,0,0,At),V.fill(),V.fillRect(-.02,-.006,.05,.012),V.restore(),V.setTransform(1,0,0,1,0,0);const _t=V.getImageData(0,0,512,256).data,m=new Uint8Array(512*256*4),R=256,Q=new Float64Array(R),Z=new Float64Array(R),J=new Int32Array(R),ct=new Float64Array(R+1),a=()=>{let G=0;J[0]=0,ct[0]=-1/0,ct[1]=1/0;for(let d=1;d<R;d++){let L=(Q[d]+d*d-(Q[J[G]]+J[G]*J[G]))/(2*d-2*J[G]);for(;L<=ct[G];)G--,L=(Q[d]+d*d-(Q[J[G]]+J[G]*J[G]))/(2*d-2*J[G]);G++,J[G]=d,ct[G]=L,ct[G+1]=1/0}G=0;for(let d=0;d<R;d++){for(;ct[G+1]<d;)G++;Z[d]=(d-J[G])*(d-J[G])+Q[J[G]]}},Vt=(G,d)=>{const L=new Float64Array(R*R);for(let X=0;X<R;X++)for(let x=0;x<R;x++)L[X*R+x]=_t[(X*512+G+x)*4]>127===d?0:1e20;for(let X=0;X<R;X++){for(let x=0;x<R;x++)Q[x]=L[x*R+X];a();for(let x=0;x<R;x++)L[x*R+X]=Z[x]}for(let X=0;X<R;X++){for(let x=0;x<R;x++)Q[x]=L[X*R+x];a();for(let x=0;x<R;x++)L[X*R+x]=Math.sqrt(Z[x])}return L};for(const[G,d]of[[0,1.32],[256,1.2]]){const L=Vt(G,!0),X=Vt(G,!1);for(let x=0;x<R;x++)for(let ft=0;ft<R;ft++){const z=(x*512+G+ft)*4,H=_t[z]/255,bt=L[x*R+ft]>0?L[x*R+ft]-.5+(.5-H)*0:-(X[x*R+ft]-.5);m[z]=Math.max(0,Math.min(255,Math.round((.5+bt*d/256/.12)*255))),m[z+1]=_t[z+1],m[z+2]=_t[z+2],m[z+3]=255}}return m}const ge=.9,fe=.13,Fo=.05,Ue=r=>Math.sqrt(Math.max(r,0)/(Math.max(r,0)+Fo)),eo=r=>(r>>>=0,r^=r>>>16,r=Math.imul(r,2146121005),r^=r>>>15,r=Math.imul(r,2221713035),r^=r>>>16,r>>>0),qe=r=>(eo(r)>>>8)/16777216;function No(r,e){const B=r.width,V=r.height,Ot=V/2,{yaw0:ee,huts:mt,lo:_t,hi:m,hiM:R,sg0:Q,agl:Z,walks:J}=e,ct=f=>[0,1,2].map(i=>.3*(e.me[i]*Math.max(0,f[0]*e.md[0]+f[1]*e.md[1]+f[2]*e.md[2])+e.sky[i]*3*(.55+.45*f[1]))),a=r.getContext("2d",{willReadFrequently:!0});a.setTransform(1,0,0,1,0,0),a.globalCompositeOperation="source-over",a.globalAlpha=1,a.clearRect(0,0,B,V),a.lineCap="round",a.lineJoin="round";const Vt=2*Math.atan(Math.PI/ge),G=B<1200,d=Math.atan(_t/fe),L=Math.atan(m/fe),X=Math.atan(R/fe),x=[1,.6,.28],ft=[1,.5,.16],z=(f,i)=>"rgba("+Math.round(Ue(f[0])*255)+","+Math.round(Ue(f[1])*255)+","+Math.round(Ue(f[2])*255)+","+(i===void 0?1:i)+")",H=(f,i,c)=>[f[0]+i[0]*c,f[1]+i[1]*c,f[2]+i[2]*c],bt=(f,i)=>[f[0]*i,f[1]*i,f[2]*i],rt=(f,i,c)=>[f[0]+(i[0]-f[0])*c,f[1]+(i[1]-f[1])*c,f[2]+(i[2]-f[2])*c];let O=e.eye,ht=0,w=0;const v=f=>B/Vt/ge/(1+f*f),it=f=>Ot/((ht?X:L-d)*fe*(1+(f/fe)**2)),T=f=>ht?Math.atan(f/fe)/X:(Math.atan(f/fe)-d)/(L-d),P=f=>{const i=f[0]-O[0],c=f[1]-O[1],_=f[2]-O[2],nt=Math.hypot(i,c,_)||1e-6;let q=Math.atan2(i,-_)-ee;q-=At*Math.floor(q/At+.5);const k=c/nt;return[(.5+Math.atan(q/ge)/Vt)*B,w+T(k)*Ot,nt,q,k]},et=(f,i)=>{const c=[];for(let q=0;q<f.length;q++){const k=f[q],E=f[(q+1)%f.length];for(let ot=0;ot<i;ot++)c.push(P(rt(k,E,ot/i)))}let _=1e9,nt=-1e9;for(const q of c)_=Math.min(_,q[0]),nt=Math.max(nt,q[0]);if(nt-_>B/2)for(const q of c)q[0]<B/2&&(q[0]+=B);return c.wrap=nt-_>B/2,c},gt=(f,i)=>{i(0),(f.wrap||f.some(c=>c[0]>B))&&(a.save(),a.translate(-B,0),i(1),a.restore())},xt=f=>{a.beginPath(),f.forEach((i,c)=>c?a.lineTo(i[0],i[1]):a.moveTo(i[0],i[1])),a.closePath()},Wt=(f,i)=>gt(f,()=>{xt(f),a.fillStyle=i,a.fill()}),Qt=(f,i)=>(O[0]-i[0])*f[0]+(O[1]-i[1])*f[1]+(O[2]-i[2])*f[2]>0,oe=f=>{const i=[0,0,0];for(const c of f)i[0]+=c[0],i[1]+=c[1],i[2]+=c[2];return bt(i,1/f.length)},$t=(f,i,c,_)=>{const nt=P(f),q=v(nt[3]/ge),k=it(nt[4]),E=i/nt[2],ot=G?2.2:1.3;let Xt=Math.max(ot,E*q),C=Math.max(ot,E*k),Rt=_;if(ht){const wt=Math.hypot(E,Q)/E;C=Math.max(ot,Math.hypot(E,Q)*k),Rt=_/Math.sqrt(Math.min(wt,60))*1.5}a.save(),a.globalCompositeOperation="lighter";for(const wt of[0,B]){if(wt&&nt[0]<B-Xt*3)continue;a.setTransform(Xt,0,0,C,nt[0]-wt,nt[1]);const Ft=Math.max(c[0],c[1],c[2]),U=Ue(Rt*Ft),j=c.map(N=>Math.round(255*Ue(Rt*N)/U)).join(","),$=a.createRadialGradient(0,0,0,0,0,3);$.addColorStop(0,"rgba("+j+","+Math.min(1,U)+")"),$.addColorStop(.18,"rgba("+j+","+U*.55+")"),$.addColorStop(.45,"rgba("+j+","+U*.14+")"),$.addColorStop(1,"rgba("+j+",0)"),a.fillStyle=$,a.fillRect(-3,-3,6,6)}a.restore()},st=f=>{const i=P(f);return Math.sqrt(v(i[3]/ge)*it(i[4]))/i[2]},ze=f=>{let i=(f.hs^5369127)>>>0;const c=()=>(i=eo(i+2654435769),i/4294967296),_=.9+.2*c(),nt=Math.floor(c()*3),q=f.on>0,k=f.f[0],E=f.f[1],ot=-E,Xt=k,C=(l,u,I)=>[f.p[0]+(ot*l-k*I)*_,u*_,f.p[1]+(Xt*l-E*I)*_],Rt=l=>[ot*l[0]-k*l[2],l[1],Xt*l[0]-E*l[2]],wt=c(),Ft=rt([.0046,.0036,.0024],[.0036,.0033,.0027],wt),U=3.6+.25*c(),j=3.45+.2*c(),$=2.1,N=8.9,vt=nt===1?7.1+.4*c():7.5+.6*c(),F=[[-1.95,-.85,2.15,3.15,2],[.75,1.85,2.15,3.15,2],[-.45,.35,1.5,3.3,2],[4.2,5,2.2,3.05,0],[6.3,7.1,2.2,3.05,0],[4.2,5,2.2,3.05,1],[6.3,7.1,2.2,3.05,1]],Nt=F.map(()=>{const l=c(),u=.8+.5*c();return q?l<.3?u:l<.55?.28*u:l<.72?.09*u:0:0});if(q&&!Nt.some(l=>l===1)&&(Nt[f.one?0:Math.floor(c()*3)]=1),f.one)for(let l=1;l<Nt.length;l++)Nt[l]=0;const ae=q&&!f.one&&c()<.8,Bt=f.party?[[1.6,.35,.55],[.45,1.3,.5],[1.4,.9,.3]]:null,ne=q?Nt.reduce((l,u)=>l+u,0)/3:0,Se=()=>{const l=[];for(const W of[-2.8,-1.4,0,1.4,2.8])for(const p of[.3,1.6,3.1,4.6,6.2,7.7])l.push([W,p]);const u=l.map(([W,p])=>({x:W,zl:p,d:Math.hypot(...C(W,.6,p).map((tt,Mt)=>tt-O[Mt]))}));u.sort((W,p)=>p.d-W.d);const I=[-(O[2]-C(0,0,0)[2]),O[0]-C(0,0,0)[0]],D=Math.hypot(...I)||1;for(const W of u){const p=C(W.x,0,W.zl),tt=C(W.x,1.27,W.zl),Mt=.085*_,b=I[0]/D*Mt,lt=I[1]/D*Mt,Gt=et([[p[0]-b,0,p[2]-lt],[p[0]+b,0,p[2]+lt],[tt[0]+b,tt[1],tt[2]+lt],[tt[0]-b,tt[1],tt[2]-lt]],2),Ut=q?Math.exp(-Math.max(W.zl-.3,0)*.45):0,zt=P(p),Zt=P(tt);gt(Gt,()=>{const St=a.createLinearGradient(zt[0],zt[1],Zt[0],Zt[1]);St.addColorStop(0,z(H([.0022,.0019,.0016],[.005,.025,.024],Ut))),St.addColorStop(.5,z(H([.0019,.0016,.0013],[.0015,.0075,.0072],Ut))),St.addColorStop(1,z(H([.0016,.0013,.001],[6e-4,.003,.003],Ut))),xt(Gt),a.fillStyle=St,a.fill()})}a.lineWidth=Math.max(.5,.06*_*st(C(0,.6,0))),a.strokeStyle=z([.0017,.0015,.0012]),a.beginPath();for(const W of[.3,7.7])for(let p=0;p<4;p++){const tt=-2.8+1.4*p,Mt=tt+1.4;for(const[b,lt]of[[C(tt,.15,W),C(Mt,1.15,W)],[C(Mt,.15,W),C(tt,1.15,W)]]){const Gt=P(b),Ut=P(lt);Math.abs(Gt[0]-Ut[0])<B/2&&(a.moveTo(Gt[0],Gt[1]),a.lineTo(Ut[0],Ut[1]))}}a.stroke()},ie=(l,u,I)=>{const D=[[[-1,0,0],[[l[0],l[1],l[2]],[l[0],l[1],u[2]],[l[0],u[1],u[2]],[l[0],u[1],l[2]]]],[[1,0,0],[[u[0],l[1],u[2]],[u[0],l[1],l[2]],[u[0],u[1],l[2]],[u[0],u[1],u[2]]]],[[0,-1,0],[[l[0],l[1],l[2]],[u[0],l[1],l[2]],[u[0],l[1],u[2]],[l[0],l[1],u[2]]]],[[0,1,0],[[l[0],u[1],u[2]],[u[0],u[1],u[2]],[u[0],u[1],l[2]],[l[0],u[1],l[2]]]],[[0,0,-1],[[u[0],l[1],l[2]],[l[0],l[1],l[2]],[l[0],u[1],l[2]],[u[0],u[1],l[2]]]],[[0,0,1],[[l[0],l[1],u[2]],[u[0],l[1],u[2]],[u[0],u[1],u[2]],[l[0],u[1],u[2]]]]];for(const[W,p]of D){const tt=p.map(Mt=>C(...Mt));Qt(Rt(W),oe(tt))&&I(W,p,tt)}},Pt=(l,u,I)=>{const D=et(I,3);if(l[1]>.5){const W=P(C(0,1.5,.1)),p=P(C(0,1.5,2.9));gt(D,()=>{const tt=a.createLinearGradient(W[0],W[1],p[0],p[1]);tt.addColorStop(0,z(H([.0028,.0025,.002],x,ae?.006:0))),tt.addColorStop(1,z(H([.0026,.0023,.0019],x,.012*ne))),xt(D),a.fillStyle=tt,a.fill()})}else l[1]<-.5?Wt(D,z(H([.0012,.001,9e-4],[.006,.03,.028],q?1:0))):Wt(D,z(H([.0019,.0016,.0012],[.0016,.008,.0075],q?l[2]<-.5?1:.4:0)))},se=(l,u,I)=>{const D=et(I,3),W=P(C(0,1.5,3)),p=P(C(0,3.75,3)),tt=H(l[2]<-.5?[.0021,.0017,.0012]:[.0017,.0014,.001],ct(Rt(l)),.8);gt(D,()=>{const b=a.createLinearGradient(W[0],W[1],p[0],p[1]);b.addColorStop(0,z(H(tt,[8e-4,.004,.0038],q&&l[2]<-.5?1:0))),b.addColorStop(1,z(H(tt,x,.003*ne))),xt(D),a.fillStyle=b,a.fill()});const Mt=st(oe(I));if(Mt>3){a.lineWidth=Math.max(.4,.025*_*Mt),a.strokeStyle=z(bt(tt,.55),.5),a.beginPath();const b=Math.abs(l[0])>.5,lt=Math.min(80,Math.floor((b?5:5.2)/.16));for(let Gt=1;Gt<lt;Gt++){const Ut=Gt/lt,zt=b?C(u[0][0],1.5,3+5*Ut):C(-2.6+5.2*Ut,1.5,u[0][2]),Zt=b?C(u[0][0],U,3+5*Ut):C(-2.6+5.2*Ut,U,u[0][2]),St=P(zt),de=P(Zt);Math.abs(St[0]-de[0])<B/2&&(a.moveTo(St[0],St[1]),a.lineTo(de[0],de[1]))}a.stroke()}F.forEach((b,lt)=>{if(!(b[4]===2?l[2]<-.5:b[4]===0?l[0]<-.5:l[0]>.5))return;const Ut=b[4]===1?2.6:-2.6,zt=(Tt,Et)=>b[4]===2?C(Tt,Et,2.99):C(Ut*1.004,Et,Tt),Zt=Nt[lt],St=f.party&&Zt?rt(ft,Bt[lt%3],.5):ft,de=Zt?H([.002,.0016,.0011],St,.36*Zt):[6e-4,6e-4,7e-4],ye=[zt(b[0],b[2]),zt(b[1],b[2]),zt(b[1],b[3]),zt(b[0],b[3])],pe=et(ye,2),ue=P(zt((b[0]+b[1])/2,b[2])),ke=P(zt((b[0]+b[1])/2,b[3]));gt(pe,()=>{const Tt=a.createLinearGradient(ue[0],ue[1],ke[0],ke[1]);Tt.addColorStop(0,z(bt(de,.6))),Tt.addColorStop(.7,z(de)),Tt.addColorStop(1,z(bt(de,.8))),xt(pe),a.fillStyle=Tt,a.fill()});const It=st(ye[0]),dt=c();if(Zt&&It>4){if(dt<.45){a.lineWidth=Math.max(.4,.03*_*It),a.strokeStyle=z([.0012,9e-4,7e-4],.8),a.beginPath();for(let Tt=b[2]+.1;Tt<b[3]-.04;Tt+=.14){const Et=P(zt(b[0],Tt)),Yt=P(zt(b[1],Tt));a.moveTo(Et[0],Et[1]),a.lineTo(Yt[0],Yt[1])}a.stroke()}if(dt>.45&&dt<.8){const Tt=.3+.4*c(),Et=c()<.5?b[0]:b[1]-(b[1]-b[0])*Tt,Yt=et([zt(Et,b[2]),zt(Et+(b[1]-b[0])*Tt,b[2]),zt(Et+(b[1]-b[0])*Tt,b[3]),zt(Et,b[3])],2);Wt(Yt,z(H([.002,.0015,.001],St,.07*Zt),.9))}}if(a.lineWidth=Math.max(.5,.06*_*It),a.strokeStyle=z([.0011,9e-4,7e-4]),gt(pe,()=>{xt(pe),a.stroke()}),Zt){const Tt=zt((b[0]+b[1])/2,(b[2]+b[3])/2);$t(Tt,(b[1]-b[0])*(ht?.45:.7)*_,St,(ht?.06:.012)*Zt)}})},kt=(l,u,I,D,W)=>{const p=[l,u,I,D].map(It=>C(...It)),tt=[p[1][0]-p[0][0],p[1][1]-p[0][1],p[1][2]-p[0][2]],Mt=oe(p),b=[Mt[0]-p[0][0],Mt[1]-p[0][1],Mt[2]-p[0][2]],lt=[tt[1]*b[2]-tt[2]*b[1],tt[2]*b[0]-tt[0]*b[2],tt[0]*b[1]-tt[1]*b[0]],Gt=Math.hypot(...lt);for(let It=0;It<3;It++)lt[It]/=Gt;if(lt[1]<0)for(let It=0;It<3;It++)lt[It]=-lt[It];if(!Qt(lt,Mt))return;const Ut=I[0]===D[0]&&I[1]===D[1]&&I[2]===D[2]?[p[0],p[1],p[2]]:p,zt=et(Ut,4),Zt=.45+.55*lt[1],St=H(bt(Ft,Zt),ct(lt),1),de=H(St,x,W*ne),ye=P(rt(p[0],p[1],.5)),pe=P(rt(p[3],p[2],.5)),ue=st(Mt),ke=Math.hypot(P(p[0])[0]-P(p[1])[0],P(p[0])[1]-P(p[1])[1]);gt(zt,()=>{const It=a.createLinearGradient(ye[0],ye[1],pe[0],pe[1]);if(It.addColorStop(0,z(de)),It.addColorStop(.35,z(bt(St,1.05))),It.addColorStop(1,z(bt(St,.8))),xt(zt),a.fillStyle=It,a.fill(),ue<2)return;a.save(),xt(zt),a.clip();const dt=Math.min(260,Math.max(8,Math.floor(ke/1.6)));a.lineWidth=Math.max(.45,.035*_*ue);for(const[Et,Yt]of[[.55,.5],[1.45,.35],[.8,.45]]){a.strokeStyle=z(bt(St,Et),Yt),a.beginPath();for(let yt=0;yt<dt;yt++){if(c()>.4)continue;const re=(yt+c())/dt,Re=c()*.25,xe=.5+.5*c(),Y=rt(rt(p[0],p[1],re),rt(p[3],p[2],re),Re),Ee=rt(rt(p[0],p[1],re),rt(p[3],p[2],re),xe),te=P(Y),Ie=P(Ee);Math.abs(te[0]-Ie[0])<B/2&&(a.moveTo(te[0],te[1]),a.lineTo(Ie[0],Ie[1]))}a.stroke()}a.lineWidth=Math.max(.5,.05*_*ue),a.strokeStyle=z(bt(St,.45),.7),a.beginPath();for(let Et=.14+.04*c();Et<.95;Et+=.13+.04*c())for(let Yt=0;Yt<=8;Yt++){const yt=Yt/8,re=P(rt(rt(p[0],p[3],Et+.012*Math.sin(yt*17+Et*40)),rt(p[1],p[2],Et+.012*Math.sin(yt*17+Et*40)),yt));Yt?a.lineTo(re[0],re[1]):a.moveTo(re[0],re[1])}a.stroke(),a.restore();const Tt=Math.min(140,Math.max(6,Math.floor(ke/2.2)));a.fillStyle=z(H(bt(St,.7),x,W*ne*.7)),a.beginPath();for(let Et=0;Et<Tt;Et++){const Yt=Et/Tt,yt=(Et+1)/Tt,re=(Yt+yt)/2+(c()-.5)*.4/Tt,Re=P(rt(p[0],p[1],Yt)),xe=P(rt(p[1],p[0],1-yt)),Y=rt(p[0],p[1],re),Ee=P([Y[0],Y[1]-(.06+.3*c()*c())*_,Y[2]]);Math.abs(Re[0]-xe[0])>B/2||(a.moveTo(Re[0],Re[1]),a.lineTo(Ee[0],Ee[1]),a.lineTo(xe[0],xe[1]),a.closePath())}a.fill()})},qt=()=>{const l=[[-j,U,$],[j,U,$]],u=[[j,U,N],[-j,U,N]];if(nt===0){const I=[0,vt,4.6],D=[0,vt,6.4];kt(l[0],l[1],I,I,.006),kt(u[0],u[1],D,D,.002),kt([-j,U,N],[-j,U,$],I,D,.004),kt([j,U,$],[j,U,N],D,I,.004),ce([I,D])}else if(nt===1){const I=[0,vt,$-.3],D=[0,vt,N+.3];Te($-.3,-1),Te(N+.3,1),kt([-j,U,N+.3],[-j,U,$-.3],I,D,.004),kt([j,U,$-.3],[j,U,N+.3],D,I,.004),ce([I,D])}else{const I=(vt-U)/j,D=U+I*(j-.9),W=[0,vt+.25,4.2],p=[0,vt+.25,6.8],tt=[-.9,D,4.2],Mt=[.9,D,4.2],b=[.9,D,6.8],lt=[-.9,D,6.8];kt(l[0],l[1],Mt,tt,.006),kt(u[0],u[1],lt,b,.002),kt([-j,U,N],[-j,U,$],tt,lt,.004),kt([j,U,$],[j,U,N],b,Mt,.004),kt(lt,tt,W,p,0),kt(Mt,b,p,W,0),be([tt,Mt,W],[0,0,-1]),be([b,lt,p],[0,0,1]),ce([W,p])}},ce=l=>{const u=C(...l[0]),I=C(...l[1]),D=st(u),W=P(u),p=P(I);Math.abs(W[0]-p[0])>B/2||(a.lineWidth=Math.max(.8,.28*_*D),a.strokeStyle=z(bt(Ft,.62)),a.beginPath(),a.moveTo(W[0],W[1]),a.lineTo(p[0],p[1]),a.stroke(),a.lineWidth=Math.max(.4,.08*_*D),a.strokeStyle=z(bt(Ft,1.25),.6),a.beginPath(),a.moveTo(W[0],W[1]+(ht?1:-1)*.06*D),a.lineTo(p[0],p[1]+(ht?1:-1)*.06*D),a.stroke())},Te=(l,u)=>{const I=[[-j,U,l],[j,U,l],[0,vt,l]],D=I.map(lt=>C(...lt));if(!Qt(Rt([0,0,u]),oe(D)))return;const W=et(D,3);Wt(W,z(H([.0032,.0026,.0018],x,.002*ne)));const p=st(D[0]);p>3&&(a.lineWidth=Math.max(.4,.03*_*p),a.strokeStyle=z([.0017,.0013,9e-4],.6),gt(W,()=>{a.save(),xt(W),a.clip(),a.beginPath();for(let lt=-12;lt<=12;lt++)for(const Gt of[1,-1]){const Ut=P(C(lt*.32,U,l)),zt=P(C(lt*.32+Gt*4,U+4,l));a.moveTo(Ut[0],Ut[1]),a.lineTo(zt[0],zt[1])}a.stroke(),a.restore()})),a.lineWidth=Math.max(.7,.32*_*p),a.strokeStyle=z(bt(Ft,.75));const tt=P(D[0]),Mt=P(D[2]),b=P(D[1]);Math.abs(tt[0]-b[0])<B/2&&(a.beginPath(),a.moveTo(tt[0],tt[1]),a.lineTo(Mt[0],Mt[1]),a.lineTo(b[0],b[1]),a.stroke())},be=(l,u)=>{const I=l.map(D=>C(...D));Qt(Rt(u),oe(I))&&Wt(et(I,2),z(H([.0011,9e-4,7e-4],x,.004*ne)))},at=()=>{const l=[[-j,U,$],[j,U,$],[j,U,N],[-j,U,N]].map(W=>C(...W));if(!Qt([0,-1,0],oe(l)))return;const u=et(l,3),I=P(C(0,U,$)),D=P(C(0,U,3));gt(u,()=>{const W=a.createLinearGradient(I[0],I[1],D[0],D[1]);W.addColorStop(0,z(H([.0011,9e-4,7e-4],x,.003*ne))),W.addColorStop(1,z(H([.0013,.001,8e-4],x,.009*ne))),xt(u),a.fillStyle=W,a.fill()})},Ct=()=>{if(q){if(ae){const l=C(2.75,1.5,.25),u=C(2.75,2.05,.25),I=P(l),D=P(u);a.lineWidth=Math.max(.5,.08*_*st(l)),a.strokeStyle=z([.0012,.001,8e-4]),a.beginPath(),a.moveTo(I[0],I[1]),a.lineTo(D[0],D[1]),a.stroke(),$t(C(2.75,2.15,.25),.07*_,x.map((W,p)=>W*[1,.9,.75][p]),.9)}if(f.party)for(let l=0;l<9;l++){const u=-2.9+5.8*l/8;$t(C(u,2.05-.18*Math.sin(Math.PI*(l%3/3+.17)),.05),.045*_,Bt[l%3],.5)}}};ht?(qt(),at(),ie([-2.6,1.5,3],[2.6,U-.02,8],se),ie([-2.75,1.25,3],[2.75,1.5,8],Pt),ie([-3,1.25,0],[3,1.5,3],Pt),Se(),Ct()):(Se(),ie([-2.75,1.25,3],[2.75,1.5,8],Pt),ie([-3,1.25,0],[3,1.5,3],Pt),qt(),at(),ie([-2.6,1.5,3],[2.6,U-.02,8],se),Ct())},Lt=(f,i,c)=>{const{a0:_,ax:nt,j:q}=f,k=[-nt[2],0,nt[0]],E=(N,vt,F)=>[_[0]+nt[0]*N+k[0]*F,vt,_[2]+nt[2]*N+k[2]*F],ot=E(i,0,-.8),Xt=E(i,0,.8);for(const N of ht?[]:[ot,Xt]){const vt=P(N),F=P([N[0],1.2,N[2]]);Math.abs(vt[0]-F[0])<B/2&&(a.lineWidth=Math.max(.5,.12*st(N)),a.strokeStyle=z([.0016,.0013,.001]),a.beginPath(),a.moveTo(vt[0],vt[1]),a.lineTo(F[0],F[1]),a.stroke())}const C=N=>N*7,Rt=Math.round((i+c)/14),wt=Math.abs((i+c)/2-Rt*7),Ft=Rt,j=Ft>=1&&Ft<=Math.floor(f.len/7)-1&&qe(Ft*31+q*7+5)>=.12&&!(q===0&&Math.abs(_[0]+nt[0]*Ft*7)<3.5)?Math.exp(-wt*wt/6):0,$=[[[0,1,0],[E(i,1.42,-.9),E(c,1.42,-.9),E(c,1.42,.9),E(i,1.42,.9)],H([.0017,.0014,.0011],x,.03*j)],[[0,-1,0],[E(i,1.2,-.9),E(c,1.2,-.9),E(c,1.2,.9),E(i,1.2,.9)],H([9e-4,8e-4,7e-4],x,.004*j)],[k,[E(i,1.2,.9),E(c,1.2,.9),E(c,1.42,.9),E(i,1.42,.9)],H([.0013,.0011,9e-4],x,.01*j)],[bt(k,-1),[E(i,1.2,-.9),E(c,1.2,-.9),E(c,1.42,-.9),E(i,1.42,-.9)],H([.0013,.0011,9e-4],x,.01*j)]];for(const[N,vt,F]of $)Qt(N,oe(vt))&&Wt(et(vt,2),z(F));for(const N of ht?[ot,Xt]:[]){const vt=P(N),F=P([N[0],1.2,N[2]]);Math.abs(vt[0]-F[0])<B/2&&(a.lineWidth=Math.max(.5,.12*st(N)),a.strokeStyle=z([.0016,.0013,.001]),a.beginPath(),a.moveTo(vt[0],vt[1]),a.lineTo(F[0],F[1]),a.stroke())}for(let N=Math.max(1,Math.ceil(i/7));C(N)<c&&N<=Math.floor(f.len/7)-1;N++){if(q===0&&Math.abs(_[0]+nt[0]*N*7)<3.5)continue;const vt=N%2*2-1,F=E(C(N),1.42,vt*.85),Nt=E(C(N),2,vt*.85),ae=P(F),Bt=P(Nt);Math.abs(ae[0]-Bt[0])<B/2&&(a.lineWidth=Math.max(.5,.07*st(F)),a.strokeStyle=z([.0013,.0011,9e-4]),a.beginPath(),a.moveTo(ae[0],ae[1]),a.lineTo(Bt[0],Bt[1]),a.stroke()),qe(N*31+q*7+5)>=.12&&$t(E(C(N),2.05,vt*.85),.06,x,1.6)}},jt=(f,i)=>{const c=Math.floor(f),_=f-c,nt=_*_*(3-2*_);return qe(c*7919+i)*(1-nt)+qe((c+1)*7919+i)*nt},he=f=>{const i=Math.abs(f),c=(q,k,E)=>{const ot=Ht((E-q)/(k-q),0,1);return ot*ot*(3-2*ot)},_=c(1.75,2.35,i)*(.012+.045*Math.pow(jt(f*6+40,3),1.5)+.012*jt(f*30,5)+.001),nt=c(.45,.6,f)*(1-c(1.2,1.35,f))*(.0032+.0012*jt(f*80,9)+.0055*Math.pow(jt(f*330,11),4));return Math.max(_,nt)},Ce=()=>{const f=[],i=B;for(let E=0;E<=i;E++){const ot=E/i,Xt=Math.tan((ot-.5)*Vt)*ge,C=Xt+ee,Rt=C-At*Math.floor(C/At+.5),wt=he(Rt),Ft=T(wt),U=T(0);f.push([E,w+Ft*Ot,w+U*Ot,wt])}const c=[7e-4,8e-4,.001],_=[.0012,.0016,.0014];a.beginPath(),a.moveTo(0,f[0][2]);for(const E of f)a.lineTo(E[0],E[1]);for(let E=f.length-1;E>=0;E--)a.lineTo(f[E][0],f[E][2]);a.closePath();const nt=w+T(0)*Ot,q=w+T(.03)*Ot,k=a.createLinearGradient(0,nt,0,q);k.addColorStop(0,z(H(c,_,Z))),k.addColorStop(.25,z(H(c,_,Z*.4))),k.addColorStop(1,z(c)),a.fillStyle=k,a.fill();for(let E=-2100;E<=2100;E++){const ot=E/900;if(Math.abs(ot)<1.85||qe((E+9e3)*97+3)<.93)continue;const C=.0012+.002*qe((E+9e3)*3+2);$t([O[0]+Math.sin(ot)*900,O[1]+C*900,O[2]-Math.cos(ot)*900],1.6,x,.35)}};for(ht=0;ht<2;ht++){O=ht?[e.eye[0],-e.eye[1],e.eye[2]]:e.eye,w=ht*Ot,a.save(),a.beginPath(),a.rect(0,w,B,Ot),a.clip(),Ce();const f=[];for(const i of mt){const c=[i.p[0]-i.f[0]*4,3,i.p[1]-i.f[1]*4];f.push({d:Math.hypot(c[0]-O[0],c[2]-O[2]),f:()=>ze(i)})}for(const i of J)for(let c=0;c<i.len-.01;){const _=[i.a0[0]+i.ax[0]*(c+1.75),0,i.a0[2]+i.ax[2]*(c+1.75)],nt=Math.hypot(_[0]-O[0],_[2]-O[2]),q=nt<35||c%7?3.5:7,k=c;f.push({d:nt,f:()=>Lt(i,k,Math.min(k+q,i.len))}),c+=q}f.sort((i,c)=>c.d-i.d);for(const i of f)i.f();a.restore()}return r}function qo(r,e){if(r.__c583){const w=r.__c583;return w.want(e),w}const B=r.getExtension("KHR_parallel_shader_compile");B&&B.maxShaderCompilerThreadsKHR&&B.maxShaderCompilerThreadsKHR(4294967295);const V=(w,v)=>{const it=r.createShader(w);return r.shaderSource(it,v),r.compileShader(it),it},Ot=V(r.VERTEX_SHADER,uo);r.getExtension("EXT_color_buffer_float"),r.getExtension("EXT_color_buffer_half_float");const ee=`#define BIOON false
#define PILES false
#define PIL 0
#define RAB 1.
`,mt=`#define BIOON (BIO.x > .01)
#define PILES false
#define PIL 0
#define RAB 1.
`,_t=`#define BIOON false
#define PILES true
#define PIL 1
#define RAB 2.
#define KNP .2
`,m=(w,v)=>w.replace(`uniform vec4 uC[40];
`,`uniform vec4 uC[40];
`+v),R={n:Ao,blit:mo,surf:Po,mw:xo,a1:To,h:ko},Q=w=>{const[v,it]=w.split("_");return v==="a2"||v==="a2b"?m(Eo,(v==="a2b"?`#define BIOON (BIO.x > .01)
`:`#define BIOON false
`)+"#define NGK "+it[0]+`
#define LANT `+(it[1]==="l"?1:0)+`
`):it!==void 0?m(Lo,{b:ee,bp:_t,bb:mt}[v]+"#define FLK "+it+`
`):R[w]},Z={},J=w=>{const v=r.createProgram(),it=V(r.FRAGMENT_SHADER,Q(w));r.attachShader(v,Ot),r.attachShader(v,it),r.linkProgram(v),Z[w]={p:v,f:it}},ct=["blit","surf","mw","n","a1"];for(const w of e)J(w);for(const w of ct)J(w);r.flush();let a=6219139;const Vt=()=>(a=Math.imul(a^a>>>15,739982445),a=Math.imul(a^a>>>12,695872825),a^=a>>>15,a&255),G=new Uint8Array(256*256*4);for(let w=0;w<G.length;w++)G[w]=Vt();r.pixelStorei(r.UNPACK_ALIGNMENT,1);const d=(w,v,it,T,P,et,gt,xt)=>{const Wt=r.createTexture();return r.bindTexture(r.TEXTURE_2D,Wt),r.texImage2D(r.TEXTURE_2D,0,it,w,v,0,T,P,xt||null),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,et),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,et),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,gt),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,gt),Wt},L=d(256,256,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR,r.REPEAT,G),X=d(864,416,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR,r.CLAMP_TO_EDGE,So(G));r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.generateMipmap(r.TEXTURE_2D);const x=d(512,256,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR,r.CLAMP_TO_EDGE,Ro()),ft=d(4,80,r.RGBA32F,r.RGBA,r.FLOAT,r.NEAREST,r.CLAMP_TO_EDGE,null),z={uN:0,uMW:1,uD:2,uS:3,uS1:4,uS2:5,uT:6,uDK:7,uAN:8,uL:9,uFS:10},H={},bt=w=>{if(H[w])return H[w];Z[w]||J(w);const v=Z[w].p;if(!r.getProgramParameter(v,r.LINK_STATUS))throw new Error("583 "+w+": "+r.getShaderInfoLog(Z[w].f)+" "+r.getShaderInfoLog(Ot)+" "+r.getProgramInfoLog(v));const T={p:v};H[w]=T;const P=r.getProgramParameter(v,r.ACTIVE_UNIFORMS);for(let et=0;et<P;et++){const gt=r.getActiveUniform(v,et).name.replace("[0]","");T[gt]=r.getUniformLocation(v,gt)}r.useProgram(v);for(const et in z)T[et]&&r.uniform1i(T[et],z[et]);return T},rt=r.createVertexArray(),O=[0,1].map(()=>{const w=d(512,512,r.RGBA16F,r.RGBA,r.HALF_FLOAT,r.LINEAR,r.CLAMP_TO_EDGE,null),v=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,v),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,w,0),{t:w,fb:v}});r.bindFramebuffer(r.FRAMEBUFFER,null);const ht={ready:bt,tN:L,tD:ft,tDK:X,tA:x,vao:rt,tex2:d,surf:O,mw:[],far:[],fcv:{},main:{},tick:0,FIRST:ct,want:w=>{let v=0;for(const it of w)Z[it]||(J(it),v=1);v&&r.flush()}};return r.__c583=ht,ht}$e.add({num:583,name:"Overwater Hut",fam:"Vistas",recipe:"The deck of an overwater hut in a Pacific lagoon at night, with the light making a turquoise pool in the dark water and the sand clear underneath, while the rest of the lagoon mirrors the sky and the neighbours' lamps. The night, the visitors and the floor change every mint. Tap the water and whatever's close darts off, drag to send a breeze across, or hold to switch the light off and watch sparks flash wherever a fish moves.",interactive:"Tap the water to ring it (whatever swims near starts away); drag to send a breeze across the lagoon (cat's paws run over the water and the view of the floor wobbles and breaks); hold to switch the deck light off: the pool goes dark, sparks of bioluminescence flash wherever a fish moves and the Milky Way brightens in the mirror.",music:!0,gl:!0,fps:30,seed:0,make(r){const e=r.gl,B=r.size,V=r.hash.slice(2).padEnd(64,"0");let Ot=parseInt(V.slice(0,8),16)>>>0,ee=parseInt(V.slice(8,16),16)>>>0,mt=parseInt(V.slice(16,24),16)>>>0,_t=parseInt(V.slice(24,32),16)>>>0;const m=()=>{const t=(Ot+ee|0)+_t|0;return _t=_t+1|0,Ot=ee^ee>>>9,ee=mt+(mt<<3)|0,mt=mt<<21|mt>>>11,mt=mt+t|0,(t>>>0)/4294967296};for(let t=0;t<16;t++)m();let R=(parseInt(V.slice(32,40),16)^1540483477)>>>0;const Q=()=>{R=R+1831565813|0;let t=Math.imul(R^R>>>15,1|R);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Z=!!r.home,J=t=>(m()-.5)*2*t,ct=po&&typeof window<"u"&&window.__F583||{},a=(t,s,n,o)=>{let h=0;for(const g of s)h+=g[1];let M=m()*h,y=s[s.length-1];for(const g of s)if(M-=g[1],M<0){y=g;break}return Z&&(y=s[n]),ct[t]!==void 0&&(y=s[ct[t]]),r.trait(o||t,y[0]),y[2]},Vt=a("Visitors",[["Eagle rays and a blacktip",5,0],["Blacktip patrol",2.5,1],["Lone ray",2,2],["Ray squadron",1,3]],0),G=a("Deck light",[["Cool white",5,0],["Aqua",3,1],["Warm",1.5,2]],0),d=a("Milky Way",[["Milky Way, core rising",5,0],["Milky Way, core high",3,1],["Milky Way overhead",2,2]],0,"Sky"),L=a("Floor",[["White sand",4,0],["Coral heads",4,1],["Seagrass",1.5,2]],0),X=a("Air",[["Light air",5,0],["Glassy",3,1],["Reef swell",1.5,2]],0),x=a("Plankton",[["Plankton",4,0],["Clear",4,1],["Mysid cloud",1,2]],0),ft=a("Neighbours",[["Lit walkway",5,0],["Late night",2.5,1],["Party hut",1,2]],0),z=a("Depth",[["Two metres",5,0],["Shallow",2,1],["Deep",2,2]],0);let H=(parseInt(V.slice(40,48),16)^625341585)>>>0;const bt=()=>{H=H+1831565813|0;let t=Math.imul(H^H>>>15,1|H);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},rt=[["At the rail",5,[1.15,3,.35],.07,-.45],["Deck corner",3,[1.8,3,0],-.32,-.52],["Sitting on the edge",2.5,[.05,2.35,-.7],.38,-.62],["Leaning over the edge",1,[.45,2.75,-.78],.26,-.98]];let O=0;{let t=0;for(const n of rt)t+=n[1];let s=bt()*t;O=rt.length-1;for(let n=0;n<rt.length;n++)if(s-=rt[n][1],s<0){O=n;break}}Z&&(O=0),ct.Standpoint!==void 0&&(O=Math.min(ct.Standpoint,3)),r.trait("Standpoint",rt[O][0]);let ht=(parseInt(V.slice(48,56),16)^2135587861)>>>0;const w=()=>{ht=ht+1831565813|0;let t=Math.imul(ht^ht>>>15,1|ht);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let v=!Z&&w()<.27;ct.Pool!==void 0&&(v=!!ct.Pool),v&&L===0&&ct.Pool===void 0&&(v=!1),v&&r.trait("Visitors",["Eagle rays and a blacktip","Blacktip patrol","Lone ray","Ray squadron"][Vt]+", arriving later");const it=[20+25*w(),0,0,0,0,0].map((t,s,n)=>s?n[s-1]+6+30*w():t),T=rt[O].slice();T[2]=T[2].slice(),T[5]=O===3?40:34;let P=(parseInt(V.slice(56,64),16)^461845907)>>>0;const et=()=>{P=P+1831565813|0;let t=Math.imul(P^P>>>15,1|P);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},gt=[["Moonless",46],["Low moon",16],["Full moon",14],["First light",10],["Passing shower",8],["Far lightning",6]];let xt=0;{let t=et()*100;for(let s=0;s<gt.length;s++)if(t-=gt[s][1],t<0){xt=s;break}}Z&&(xt=0),ct.Night!==void 0&&(xt=ct.Night),xt&&r.trait("Sky",gt[xt][0]);const Wt=[et(),et(),et(),et()],Qt=[et(),et(),et(),et()];!Z&&ct.Standpoint===void 0&&O<2&&Qt[0]<.2&&xt!==4?(O=4,T[0]="Looking out",T[2]=[.9+.5*Qt[1],3,.35],T[3]=.07+(Qt[2]-.5)*.7,T[4]=-.11-.05*Qt[3],T[5]=25):!Z&&O===0&&(T[3]+=(Qt[1]-.5)*.5,T[2][0]=Ht(T[2][0]+(Qt[2]-.5)*2.4,-1.9,1.75)),ct.Standpoint===4&&(O=4,T[0]="Looking out",T[2]=[1.15,3,.35],T[3]=.07,T[4]=-.13,T[5]=25),O===4&&(T[2][1]=2.45,T[3]=-.3+(T[3]-.07)*.5,T[4]=Math.max(T[4],-.13));const oe=r.hash.toLowerCase()==="0xc2e9cf1343ef7b0f68554361b675baf89af6736353db4138c12dd5e0c100b240";let $t=(parseInt(V.slice(8,16),16)^parseInt(V.slice(48,56),16)^1013904242)>>>0;const st=()=>{$t=$t+1831565813|0;let t=Math.imul($t^$t>>>15,1|$t);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<3;t++)st();const ze=[["",46],[" pile lamps",16],[" lantern",12],[" spot",10],[" wide flood",16]];let Lt=0;{let t=st()*100;for(let s=0;s<ze.length;s++)if(t-=ze[s][1],t<0){Lt=s;break}}(Z||oe)&&(Lt=0),ct.Lamp!==void 0&&(Lt=ct.Lamp);const jt=[st(),st(),st(),st(),st(),st()],he=[st(),st(),st(),st()],Ce=O===4&&ct.Standpoint===void 0&&(Lt===2||Lt===3);Ce&&(O=0,T[0]="At the rail",T[2]=rt[0][2].slice(),T[3]=rt[0][3],T[4]=rt[0][4],T[5]=34);const f=ct.Standpoint>=5?ct.Standpoint:!Z&&!oe&&ct.Standpoint===void 0&&O<3&&he[0]<.3?he[1]<.55||Ce?5:6:0;f===5?(O=5,T[0]="Along the edge",T[2]=[-2.25,3,-.62],T[3]=1.2+.25*he[2],T[4]=-.36-.1*he[3],T[5]=34):f===6&&(O=6,T[0]="Low on the steps",T[2]=[1.25+.45*he[2],.55,-1.32],T[3]=-.35+.3*he[3],T[4]=-.2,T[5]=36),r.trait("Deck light",["Cool white","Aqua","Warm"][G]+ze[Lt][0]),r.trait("Standpoint",T[0]);const i=new Float32Array(40*4),c=(t,s,n,o,h)=>{i[t*4]=s,i[t*4+1]=n,i[t*4+2]=o,i[t*4+3]=h},_=t=>{const s=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/s,t[1]/s,t[2]/s]},nt=(t,s)=>[t[1]*s[2]-t[2]*s[1],t[2]*s[0]-t[0]*s[2],t[0]*s[1]-t[1]*s[0]],q=[2.1,.72,4.75][z]+(Z?0:J(z===1?.06:.12));let k=O===3?[1.05,-3.4]:[1.4,-6],E=[-.15,.62,-.95],ot=O===3?7:28,Xt=3,C=[-2,1],Rt=.022,wt=150,Ft=1;const U=[[1,.97,.93],[.16,1,.62],[1.25,.66,.27]][G];let j=U.slice();const $=[];if(Lt===0&&!Z&&!oe&&O!==3)k=[1.4+(jt[0]-.5)*3,-6+(jt[1]-.5)*2],ot=18+22*jt[2],wt*=.85+.4*(ot-18)/22;else if(Lt===4)k=[.4+(jt[0]-.5)*1.6,-5.2],ot=2.2,wt=75,Rt=.04;else if(Lt===3)k=[.9+(jt[0]-.5)*2.2,-3.6-1.6*jt[1]],ot=14,C=[.989,1/.004],wt=30,Rt=.012;else if(Lt===2)E=[2.2,1.55+.78,-1.12],k=[1.7,-2.6],ot=.25,Xt=.35,wt=7,Ft=.06,j=[U[0]*.4+.6,U[1]*.4+.6*.62,U[2]*.4+.6*.26],Rt=0;else if(Lt===1){const t=[[2.08,-1.04],[-.15,-.97],[-2.62,-1.04]],s=jt[3]<.45?Math.floor(jt[4]*3):-1;for(let n=0;n<3;n++)n!==s&&$.push([t[n][0],-.75-.45*jt[n],t[n][1]-.1]);wt=0,Ft=.5,Rt=0,k=[$.reduce((n,o)=>n+o[0],0)/$.length,-2.8]}const N="_"+xt+(Lt===2?"l":""),vt=($.length?"bp_":"b_")+L,F=qo(e,["a2"+N,vt]),Nt=F.ready,ae=Lt===2?[0,-1,0]:_([k[0]-E[0],-q*.55-E[1],k[1]-E[2]]),Bt=Lt===2?E:[.35,1.55+1.95,.6],ne=Lt===2?3.2:Rt*150,Se=6;c(4,...E,1),c(5,...ae,ot),c(6,U[0]*wt,U[1]*wt,U[2]*wt,q);for(let t=0;t<3;t++)c(33+t,...$[t]||[0,0,0],0);c(36,$.length,Xt,C[0],C[1]),c(37,...Bt,Lt===2?1.2:1.3),c(39,...U,0),c(14,.42,.055,.07,x===2?.09:x===1?.03:.055),c(15,0,L===2?1:0,L===0?.4:L===1?.025:0,0),c(16,0,1,0,[.18,.05,.6][x]);const ie=[.75,.3,.7][ft];c(17,ie,ft===2?Z?11:[11,12,1,6][Math.floor(m()*4)]:-1,Math.floor(m()*65536),0),c(21,.6,Z?.78:.55+m()*.35,0,0),c(24,k[0],k[1]+1.2,m()*50,0),c(25,.9,.64,.4,0),c(13,.8+m()*.6,.5+m()*.5,m()*At,0),c(22,0,1,0,0);const Pt=(()=>{const t=T[3],s=(o,h)=>[Math.sin(o)*Math.cos(h),Math.sin(h),-Math.cos(o)*Math.cos(h)],n={md:[0,1,0],mi:0,sky:[0,0,0],mw:1,band:[0,0,0],star:1,fl:[0,0,0,0],mc:[0,0,0],rain:0,up:[0,0,0],wet:0,me:[0,0,0]};return xt===1?(n.md=s(t+(Wt[0]-.5)*.7,(8+12*Wt[1])*Math.PI/180),n.mi=5,n.mc=[1,.84,.6],n.sky=[5e-4,9e-4,.0019],n.mw=.3,n.star=.55,n.up=[5e-4,.001,.0013],n.me=[.01,.0085,.006]):xt===2?(n.md=s(t+2.1+.5*Wt[0],.85+.3*Wt[1]),n.mi=9,n.mc=[.8,.88,1],n.sky=[.001,.0034,.013],n.mw=.05,n.star=.14,n.up=[.007,.014,.017],n.me=[.06,.068,.085]):xt===3?(n.md=s(t+(Wt[0]-.5)*1.1,0),n.band=[.16,.085,.036],n.sky=[9e-4,.0022,.0075],n.mw=.08,n.star=.3,n.up=[.0016,.003,.004],n.me=[.006,.0045,.0035]):xt===4?(n.fl=[0,0,0,1],n.rain=.8,n.wet=1,n.mw=0,n.star=0,n.sky=[6e-4,5e-4,4e-4]):xt===5&&(n.fl=[0,10+t+(Wt[0]-.5)*.9,0,0],n.mw=.8),n})();c(26,...Pt.md,Pt.mi),c(27,...Pt.sky,Pt.mw),c(28,...Pt.band,Pt.star),c(29,...Pt.fl),c(30,...Pt.mc,Pt.rain),c(31,...Pt.up,Pt.wet),c(32,...Pt.me,0);const se=[];if(xt===5){let t=3.55+.2*et();for(let s=0;s<40;s++)se.push([t,.2+.4*et(),(et()-.5)*.5,et()]),t+=2+12*et()}const kt=new Float32Array(4*80*4),qt=(t,s,n,o,h,M)=>{const y=(t*4+s)*4;kt[y]=n,kt[y+1]=o,kt[y+2]=h,kt[y+3]=M},ce=9.81,Te=73e-6,be=t=>Math.sqrt(ce*t+Te*t*t*t);let at=0;const Ct=-.4+J(.6),l=[.0035,.0028,.02][X];for(let t=0;t<4;t++){const s=5+m()*9,n=At/s,o=Math.PI/2+J(.35);qt(24+at,0,Math.sin(o)*0+Math.cos(o),Math.sin(o),n,l*(.5+m()*.7)),qt(24+at,1,be(n),m()*At,0,0),at++}const u=[1,.06,1.1][X];for(let t=0;t<20;t++){const s=.08*Math.pow(10,t/19)*(1+J(.08)),n=At/s,o=t%2?m()*At:Ct+J(1.2)*1.5,h=.016*Math.pow(s/.3,.3)*(.5+m());qt(24+at,0,Math.cos(o),Math.sin(o),n,h/n*u),qt(24+at,1,be(n),m()*At,1,0),at++}let I=0;const D=[];if(L===1&&!Z){const t=9+Math.floor(jt[5]*6);for(let s=0;s<120&&D.length<t;s++){const n=st(),o=n<.4?0:n<.72?1:2,h=o===0?.18+.32*st():o===1?.14+.24*st():.24+.24*st(),M=st()*At,y=Math.sqrt(st())*(Lt===3?1.6:Lt===2?1.9:2.9),g=k[0]+Math.cos(M)*y,A=k[1]+.8+Math.sin(M)*y*1.2;A>-1.5-h||D.some(S=>Math.hypot(S[0]-g,S[1]-A)<(S[2]+h)*1.25+.08)||D.push([g,A,h,o===0?.55+.2*st():o===1?.62+.2*st():.2+.08*st(),o])}}if(L===1){const t=Z?[[-.6,-5.6,.55],[3.2,-3.4,.4],[2.4,-7.6,.7]]:[];if(!Z)for(let n=0;n<3;n++){const o=n?m()*At:1.1+m()*1,h=n?1.8+m()*3:1.6+m()*1.2;t.push([k[0]+Math.cos(o)*h,k[1]+Math.sin(o)*h*1.3,.35+m()*.4])}let s=0;for(const[n,o,h]of t)for(let M=0;M<3&&s<8;M++){const y=h*(M===0?1:.55+m()*.25),g=M?J(h*.8):0,A=M?J(h*.8):0;Z&&(qt(48+I,0,n+g,-q-y*.45,o+A,y),qt(48+I,1,1,0,0,0),I++),s++}for(const[n,o,h,M,y]of D){const g=y===1?2+(st()<.5?1:0):1;for(let A=0;A<g&&I<16;A++){const S=st()*At,K=A?h*(.55+.25*st()):h,pt=A?Math.cos(S)*h*.7:0,ut=A?Math.sin(S)*h*.7:0;qt(48+I,0,n+pt,-q-K*M*(y===2?-.15:.3),o+ut,K),qt(48+I,1,M,y,(st()-.5)*.45,(st()-.5)*.45),I++}}}i[15*4]=I;const W=T[3],p=T[4],tt=Math.tan(T[5]*Math.PI/180),Mt=[[.1,.38],[.42,.25],[1.1,.6]][d],b=.07-.32+(Z?0:J(.35)),lt=Mt[0]+(Z?0:J(.06)),Gt=[Math.sin(b)*Math.cos(lt),Math.sin(lt),-Math.cos(b)*Math.cos(lt)],Ut=_([Math.cos(b),0,Math.sin(b)]),zt=_(nt(Gt,Ut)),Zt=Mt[1]+(Z?0:J(.3));let St=_([0,1,2].map(t=>zt[t]*Math.cos(Zt)+Ut[t]*Math.sin(Zt)));St[1]<0&&(St=St.map(t=>-t));const de=nt(Gt,St);c(7,...Gt,0),c(8,...St,0),c(9,...de,0);const ye=B>=600?1280:768,pe=B>=600?640:384,ue=1,ke=.55;c(10,ue,Math.atan(Math.PI/ue),ke,1);const It=[m()*200,m()*200,Z?1.05:.85+m()*.35],dt={p:T[2].slice(),fw:[0,0,-1],rt:[1,0,0],up:[0,1,0]},Tt=()=>{const t=r.view||ho;dt.p=[Ht(T[2][0]+Ht(t.x||0,-.6,.6),-2.4,1.85),T[2][1]+Ht(t.y||0,-.6,.3),Ht(T[2][2]+Ht(t.z||0,-.9,.6),Math.min(-.85,T[2][2]),2.2)];const s=W+(t.yaw||0),n=Ht(p+(t.pitch||0),-1.45,1.45),o=Math.cos(n);dt.fw=[Math.sin(s)*o,Math.sin(n),-Math.cos(s)*o],dt.rt=[Math.cos(s),0,Math.sin(s)],dt.up=nt(dt.rt,dt.fw),c(0,...dt.p,tt),c(1,...dt.fw,B);for(let h=0;h<3;h++)i[8+h]=dt.rt[h],i[12+h]=dt.up[h]},Et=()=>{for(let t=0;t<5;t++)for(let s=0;s<5;s++){const n=s/2-1,o=t/2-1,h=[0,1,2].map(g=>dt.fw[g]+(n*dt.rt[g]+o*dt.up[g])*tt*1.04);let M=0,y=1e9;for(let g=0;g<3;g++){const A=[-3.7,1.2,.62][g],S=[3.3,4.6,8.1][g],K=dt.p[g];if(Math.abs(h[g])<1e-9){(K<A||K>S)&&(y=-1);continue}const pt=(A-K)/h[g],ut=(S-K)/h[g];M=Math.max(M,Math.min(pt,ut)),y=Math.min(y,Math.max(pt,ut))}if(M<=y)return!0}return!1},Yt=(t,s)=>{const n=t*2-1,o=1-s*2;return _([0,1,2].map(h=>dt.fw[h]+(n*dt.rt[h]+o*dt.up[h])*tt))},yt=[],re=[2,1,1,5][Vt],Re=[1,3,0,1][Vt];for(let t=0;t<re;t++){const s=Z?[1.75,1.35][t]:1.3+m()*.7,n=Vt===3?(1.1+(s-1.3)/.7*.5)/1.25:s*.9,o=1.3+m()*1.3+(t>1?1:0),h=Z?[2.3,-.6][t]:m()*At,M=Z?[1,-1][t]:m()<.5?1:-1,y=k[0]+J(.8)*(Z?0:1)+(Z?[-.2,.6][t]:0),g=k[1]+1.5+J(.8)*(Z?0:1)+(Z?[.4,-.9][t]:0);yt.push({ty:0,x:y+Math.cos(h)*o,z:g+Math.sin(h)*o,y:-1-m()*.5,h:h+M*Math.PI/2,v:.5,S:n,ph:m()*At,amp:.5,flap:m()*At,bank:0,yb:-.9-m()*.6,wp:[y-Math.sin(h)*M*2,Math.min(g+Math.cos(h)*M*2,-2.4)],wpT:6+8*m()})}for(let t=1;t<yt.length;t++)for(let s=0;s<t;s++){const n=yt[t].x-yt[s].x,o=yt[t].z-yt[s].z,h=Math.hypot(n,o)||1,M=O===3?3.4:2.6;h<M&&(yt[t].x+=n/h*(M-h),yt[t].z+=o/h*(M-h))}const xe=yt.slice(),Y=Vt===3?{x:0,z:0,h:0,v:.5,wp:null,wpT:0}:null;if(Y){const t=g=>{const A=Math.sin(parseInt(V.slice(40,48),16)%100003*.0137+g*91.7)*43758.5453;return A-Math.floor(A)},s=1.02*Math.max(...xe.map(g=>g.S*1.25));Tt();const n=(g,A)=>{const S=Yt(g,A),K=(-1.5-dt.p[1])/Math.min(S[1],-.05);return[dt.p[0]+S[0]*K,dt.p[2]+S[2]*K]},o=.4+.25*t(8),h=n(.55,.78),M=dt.fw[0]>=0?-o:Math.PI+o;Y.h=M,Y.x=h[0]-Math.cos(M)*3,Y.z=Math.min(h[1]-Math.sin(M)*3,-2.4),Y.wp=[h[0]+Math.cos(M)*2.5,Math.min(h[1]+Math.sin(M)*2.5,-2.4)],Y.wpT=11,Y.vp=n;const y=Math.cos(M)>=0?-1:1;xe.forEach((g,A)=>{g.sq=[y*A*.92*s*(1+.08*(t(2+A)-.5)),A*.66*s+.12*s*(t(9+A)-.5)],g.h=Y.h,g.fv=0,g.x=Y.x-Math.sin(Y.h)*g.sq[0]-Math.cos(Y.h)*g.sq[1],g.z=Y.z+Math.cos(Y.h)*g.sq[0]-Math.sin(Y.h)*g.sq[1]})}for(let t=0;t<Re;t++){const s=Z?1.45:1.15+m()*.45,n=3+m()*2.5,o=Z?.25:m()*At,h=Z||m()<.5?1:-1;yt.push({ty:1,x:k[0]+Math.cos(o)*n,z:k[1]+Math.sin(o)*n*.8,y:-q+.45+m()*.4,h:o+h*Math.PI/2,v:.72,S:s,ph:m()*At,amp:1,bank:0,wph:m()*At,wr:m(),yb:-q+.4+m()*.5,wp:null,wpT:0})}const Ee=7+Math.floor(m()*3),te={x:k[0]-.3,z:k[1]+2.3,h:Math.PI+.25},Ie=Math.cos(te.h),oo=Math.sin(te.h);for(let t=0;t<Ee;t++){const s=(t-(Ee-1)/2)*.26+J(.08),n=t%3*.3-Math.abs(t-(Ee-1)/2)*.12+J(.2),o=n*Ie-s*oo,h=n*oo+s*Ie;yt.push({ty:2,x:te.x+o,z:te.z+h,y:-.035-m()*.05,h:te.h+J(.1),v:0,S:.6+m()*.3,ph:m()*At,amp:.3,bank:0,ox:o,oz:h,dart:0,dx:0,dz:0,ds:1.4,cool:1+m()*6});{const M=yt[yt.length-1],y=g=>{const A=Math.sin((t+1)*127.1+g*311.7+M.ph*17.3)*43758.5453;return A-Math.floor(A)};M.S=.38+.75*y(1)*y(2)+.1*y(3),M.y-=.03*y(4),M.ho=(y(5)-.5)*.7,M.h+=M.ho,M.sv=.55+y(6)}}i[11*4]=yt.length;let ao=0,no=0;if(v){for(const t of yt)if(t.ty<2){const s=-Math.PI*(.1+.8*w()),n=15+4*w();t.far=[k[0]+Math.cos(s)*n,Math.min(k[1]+1.2+Math.sin(s)*n,-2.4)],t.x=t.far[0],t.z=t.far[1],t.wp=t.far,t.enter=it[Math.min(no++,5)]}else t.x-=14,t.z-=8.4;ao=it[Math.min(no,5)]+10}const Jt=new Float32Array(8),We=Ht(Math.round(B*.78),96,768);if(Jt[0]=-.07,Jt[1]=q<1?-.26:-Ht(q*.5,.5,1.25),Jt[2]=Jt[1]-(q<1?.13:.28),Jt[3]=q<1?-q+.14:Math.min(-q+.55,Jt[2]-.1),Jt[4]=1.3,Jt[5]=We,$.length&&q>1){const t=Math.min(...$.map(s=>s[1]));Jt[2]=Math.max(-q+.3,t-1.1),Jt[1]=Math.min(Jt[2]+.25,t-.35),Jt[3]=Jt[1]-.12}const De=[];for(let t=0;t<14;t++){let s,n,o;if(t<10){const y=t<5?1:-1,g=t%5;s=[y*(17.5+17.5*g),.3],n=0,o=-1}else{const y=t-10;s=[-30+2.1*y,-46-22*y],n=1,o=0}s[0]+=(Q()-.5)*2.5,s[1]+=(Q()-.5)*1.5;const h=(Q()<ie?1:0)+(t===i[17*4+1]?1:0),M=Math.floor(Q()*16777215);De.push({p:s.slice(),f:[n,o],on:h,hs:M,party:t===i[17*4+1],i:t}),qt(64+t,0,s[0],0,s[1],0),qt(64+t,1,n,o,h,M)}if(ft===1){const t=De.find(s=>s.on>0&&s.i>=10)||De.find(s=>s.on>0);for(const s of De)s!==t?(s.on=0,kt[((64+s.i)*4+1)*4+2]=0):s.one=!0}const so=[{a0:[-140,0,9.5],ax:[1,0,0],len:280,j:0},{a0:[-46,0,9],ax:_([12,0,-134]),len:135,j:1}],Fe=[];let He=1,we=1,Ge=0,Ae=0,le=[1,0],Ke=[0,0],Oe=[0,0],Kt=null,je=!1,Dt=0,Xe=0,Ze=0,Ye=1,Ve=0;const _e=r.sound,ro=(t,s,n,o)=>{Fe.length>=8&&Fe.shift(),Fe.push({x:t,z:s,t0:Dt,amp:n,b:o})},Co=t=>{Dt+=t,Oe[0]+=.05*t,Oe[1]+=.012*t,Ke[0]+=le[0]*t*1.6*(.3+Ae),Ke[1]+=le[1]*t*1.6*(.3+Ae),Ae*=Math.exp(-t/2.8);for(let o=Fe.length-1;o>=0;o--)Dt-Fe[o].t0>9&&Fe.splice(o,1);for(const o of yt){if(o.ty<2){if(o.enter>Dt)o.wp=o.far;else if(o.sq&&!(o.spook>Dt)){const A=Math.cos(Y.h),S=Math.sin(Y.h),K=Y.x-S*o.sq[0]-A*o.sq[1],pt=Y.z+A*o.sq[0]-S*o.sq[1];o.wp=[K+A*1.4,pt+S*1.4],o.wpT=Dt+2,o.fv=Ht(((K-o.x)*A+(pt-o.z)*S)*.5,-.25,.35)}else if(!o.wp||Dt>o.wpT||Math.hypot(o.wp[0]-o.x,o.wp[1]-o.z)<1){const A=Q()*At,S=o.ty?2.2+4.8*Q():.5+3.8*Q();o.wp=[k[0]+Math.cos(A)*S*1.15,Math.min(k[1]+1.2+Math.sin(A)*S,-2.4)],o.wpT=Dt+12+12*Q()}const h=Math.atan2(o.wp[1]-o.z,o.wp[0]-o.x),M=o.ty?.7:.55;let y=h-o.h;y=Math.atan2(Math.sin(y),Math.cos(y));const g=Ht(y,-M*t,M*t);if(o.h+=g,o.ty===0){o.bank+=(Ht(g/Math.max(t,.001)*1.5,-.95,.95)-o.bank)*Math.min(1,t*1.4),o.flap+=t*.9;const A=.5+.5*Math.sin(o.flap*.55+1.3*Math.sin(o.flap*.17));o.amp+=((A>.45?1:.12)-o.amp)*Math.min(1,t*1.2),o.ph+=t*At/2.4*(.25+.75*o.amp),o.v+=((o.sq?Y.v+o.fv:.42+.18*o.amp)+(o.spook>Dt?.5:0)-o.v)*Math.min(1,t*2),o.y+=(o.yb+.25*Math.sin(o.flap*.3)-o.y)*Math.min(1,t*.5)}else o.wph+=t*.05,o.bank+=(Ht(g/Math.max(t,.001)*.5,-.35,.35)-o.bank)*Math.min(1,t*2),o.ph+=t*At/.8*(o.spook>Dt?1.6:1),o.v+=(.7+.1*Math.sin(o.wph*5)+(o.spook>Dt?.8:0)-o.v)*Math.min(1,t*2),o.y+=(o.yb-o.y)*t*.3}else{o.cool-=t;const h=te.x+o.ox,M=te.z+o.oz;let y=h,g=M,A=.25*o.sv;if(o.dart>0)o.dart-=t,y=o.x+o.dx,g=o.z+o.dz,A=o.ds;else if(o.cool<0){o.cool=2+Q()*9,o.dart=.2+.25*Q(),o.ds=1.4;const Pe=o.h+(Q()-.5)*1.2,fo=.5+.8*o.sv*Q();o.dx=Math.cos(Pe)*fo,o.dz=Math.sin(Pe)*fo}const S=y-o.x,K=g-o.z,pt=Math.hypot(S,K),ut=A>1||pt>.5;let Me=(ut&&pt>.08?Math.atan2(K,S):te.h+o.ho+.1*Math.sin(Dt*(.3+.3*o.sv)+o.ox*5))-o.h;Me=Math.atan2(Math.sin(Me),Math.cos(Me)),o.h+=Ht(Me,-(A>1?9:1.5)*t,(A>1?9:1.5)*t);const Le=ut&&pt>.08?Math.min(A,pt*1.5)*Math.max(0,Math.cos(Me)):0;if(o.v+=(Le-o.v)*Math.min(1,t*6),!ut){const Pe=Math.min(1,t*.9);o.x+=S*Pe,o.z+=K*Pe}o.ph+=t*(4+o.v*14),o.amp=.25+Math.min(1,o.v),o.bank=.45*Math.sin(Dt*(1.1+.5*Math.sin(o.ox*7))+o.ox*9)*(.4+.6*Math.min(1,o.v))+.25*Math.sin(o.ph*.37)}o.x+=Math.cos(o.h)*o.v*t,o.z+=Math.sin(o.h)*o.v*t}if(Y){if(!Y.wp||Dt>Y.wpT||Math.hypot(Y.wp[0]-Y.x,Y.wp[1]-Y.z)<1.2){const h=Y.vp(.25+.5*Q(),.74+.18*Q());Y.wp=[h[0],Math.min(h[1],-2.4)],Y.wpT=Dt+10+8*Q()}let o=Math.atan2(Y.wp[1]-Y.z,Y.wp[0]-Y.x)-Y.h;o=Math.atan2(Math.sin(o),Math.cos(o)),Y.h+=Ht(o,-.36*t,.36*t),Y.x+=Math.cos(Y.h)*Y.v*t,Y.z+=Math.sin(Y.h)*Y.v*t}for(let o=1;o<xe.length;o++)for(let h=0;h<o;h++){const M=xe[o],y=xe[h],g=M.x-y.x,A=M.z-y.z,S=Math.hypot(g,A)||.001,K=.6*1.25*(M.S+y.S);if(S<K){const pt=(K-S)*Math.min(1,t*1.5)*.5/S;M.x+=g*pt,M.z+=A*pt,y.x-=g*pt,y.z-=A*pt}}const s=Dt<ao?14:0;te.x=k[0]-.3+.5*Math.sin(Dt*.05)-s,te.z=k[1]+2.3+.3*Math.sin(Dt*.037)-s*.6,Q()<t*.15&&ro(k[0]+(Q()-.5)*5,k[1]+1+(Q()-.5)*4,.0012,.01),we+=(He-we)*Math.min(1,t/.35),Ge=we<.5?Math.min(1,Ge+t/3):Math.max(0,Ge-t/.6)},Io=()=>{for(let s=0;s<yt.length;s++){const n=yt[s],o=n.ty===2?0:n.ty===0?1+(s&1):3;qt(s,0,n.x,Jt[o],n.z,n.S),qt(s,1,Math.cos(n.h),Math.sin(n.h),n.ty,n.bank),qt(s,2,n.ph,n.amp,o,n.v*1.6+.2)}for(let s=0;s<8;s++){const n=Fe[s];n?(qt(16+s,0,n.x,n.z,Dt-n.t0,n.amp),qt(16+s,1,n.b,0,0,0)):qt(16+s,0,0,0,0,0)}if(i[11*4+1]=8,i[11*4+2]=at,i[11*4+3]=0,i[2*4+3]=Dt,c(12,le[0],le[1],Ae,0),c(18,1,0,0,0),c(19,Oe[0],Oe[1],0,0),c(20,0,0,Ke[0],Ke[1]),i[4*4+3]=we,i[16*4]=(1-we)*(1-we),se.length){let s=0,n=0;for(const o of se){const h=(Dt-o[0])/o[1];if(h>-.05&&h<1.05){const M=Math.max(0,Math.sin(h*Math.PI))*(.55+.45*Math.sin(h*23+o[3]*9))*(h<.3||h>.55?1:.35);M>s&&(s=M,n=o[2])}}i[29*4]=s,i[29*4+2]=n}i[3*4+3]=1.25+1.6*Ge;const t=we*(Lt===1||Lt===2?Ft*1.05:wt/143);for(let s=0;s<$.length;s++)i[(33+s)*4+3]=Se*we;for(let s=0;s<3;s++)i[38*4+s]=j[s]*ne*we;i[38*4+3]=Lt===2?1:0,i[23*4]=.1*t*U[0],i[23*4+1]=.7*t*U[1],i[23*4+2]=.65*t*U[2],e.bindTexture(e.TEXTURE_2D,F.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,4,80,e.RGBA,e.FLOAT,kt)},Qe=r.hash+"|"+(B>=600?1:0)+"|"+(Z?1:0),Je=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(F.vao)},Do=()=>{let t=F.mw.find(n=>n.key===Qe);if(t)return t.use=++F.tick,t.t;if(F.mw.length>=9){const n=F.mw.reduce((o,h)=>o.use<=h.use?o:h);e.deleteTexture(n.t),e.deleteFramebuffer(n.fb),F.mw.splice(F.mw.indexOf(n),1)}t={key:Qe,t:F.tex2(ye,pe,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE,null),fb:e.createFramebuffer(),use:++F.tick},e.bindFramebuffer(e.FRAMEBUFFER,t.fb),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t.t,0),e.viewport(0,0,ye,pe),Je();const s=Nt("mw");return e.useProgram(s.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,F.tN),e.uniform4f(s.uM,It[0],It[1],It[2],ye),e.uniform4f(s.uM2,pe,ue,ke,Math.atan(Math.PI/ue)),e.drawArrays(e.TRIANGLES,0,3),F.mw.push(t),t.t},io=()=>{const t=Qe;let s=F.far.find(S=>S.key===t);if(s)return s.use=++F.tick,s;if(F.far.length>=6){const S=F.far.reduce((K,pt)=>K.use<=pt.use?K:pt);e.deleteTexture(S.t),F.far.splice(F.far.indexOf(S),1)}const n=T[2],o=B>=600?1536:768;let h=-.02,M=.1,y=.1;const g=(S,K,pt)=>{const ut=Math.hypot(S-n[0],pt-n[2]);h=Math.min(h,(K-n[1])/Math.hypot(ut,K-n[1])),M=Math.max(M,(K-n[1])/Math.hypot(ut,K-n[1])),y=Math.max(y,(K+n[1])/Math.hypot(ut,K+n[1]))};for(const S of De)for(const K of[-3.9,0,3.9])for(const pt of[-.3,4.5,9.3]){const ut=S.p[0]-S.f[1]*-K*1.1-S.f[0]*pt*1.1,me=S.p[1]+S.f[0]*K*1.1-S.f[1]*pt*1.1;g(ut,0,me),g(ut,9.1,me)}for(const S of so){const K=Ht((n[0]-S.a0[0])*S.ax[0]+(n[2]-S.a0[2])*S.ax[2],0,S.len);for(const pt of[-3,0,3]){const ut=S.a0[0]+S.ax[0]*(K+pt),me=S.a0[2]+S.ax[2]*(K+pt);g(ut,0,me),g(ut,2.2,me)}}h=Math.max(h-.01,-.7),M=Math.min(M+.01,.85),y=Math.min(y+.01,.9);const A=F.fcv[o]||(F.fcv[o]=document.createElement("canvas"));return A.width=o,A.height=o/4,No(A,{yaw0:T[3],eye:n,huts:De,lo:h,hi:M,hiM:y,sg0:[.06,.006,.07][X]+(xt===4?.05:0),agl:i[13*4+1],walks:so,md:Pt.md,me:Pt.me,sky:Pt.sky}),s={key:t,t:e.createTexture(),use:++F.tick,F:new Float32Array([T[3],ge,1/(2*Math.atan(Math.PI/ge)),Math.atan(y/fe),Math.atan(h/fe),Math.atan(M/fe),o,fe])},e.bindTexture(e.TEXTURE_2D,s.t),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,A),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),F.far.push(s),s},_o=()=>{let t=F.main[B];return t||(t={t:F.tex2(B,B,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,null),fb:e.createFramebuffer(),t2:F.tex2(B,B,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,null),fb2:e.createFramebuffer(),sz:B},e.bindFramebuffer(e.FRAMEBUFFER,t.fb),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t.t,0),e.bindFramebuffer(e.FRAMEBUFFER,t.fb2),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t.t2,0),t.tl=F.tex2(We,We*4,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE,null),t.fbl=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,t.fbl),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t.tl,0),F.main[B]=t),t},co=()=>{if(!F.warm){F.warm=1;for(const K of F.FIRST)Nt(K)}lo||(lo=1,Nt("a2"+N),Nt(vt));const t=Do(),s=_o(),n=io();Io(),Je();for(let K=3;K<7;K++)e.activeTexture(e.TEXTURE0+K),e.bindTexture(e.TEXTURE_2D,null);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,F.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,t),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,F.tD);const o=Nt("surf");e.useProgram(o.p),e.uniform4fv(o.uC,i),e.viewport(0,0,512,512),e.bindFramebuffer(e.FRAMEBUFFER,F.surf[0].fb),e.uniform4f(o.uA,-4.4,-9.6,11.2,0),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,F.surf[1].fb),e.uniform4f(o.uA,-119,-180,240,1),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,F.surf[0].t),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,F.surf[1].t),e.activeTexture(e.TEXTURE9),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,F.tA),e.bindFramebuffer(e.FRAMEBUFFER,s.fbl),e.viewport(0,0,We,We*4);const h=Nt("n");e.useProgram(h.p),e.uniform4fv(h.uC,i),e.uniform4fv(h.uK,Jt),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE9),e.bindTexture(e.TEXTURE_2D,s.tl),e.bindFramebuffer(e.FRAMEBUFFER,s.fb2),e.viewport(0,0,B,B),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,F.tDK);const M=Nt("a1");if(e.useProgram(M.p),e.uniform4fv(M.uC,i),e.drawArrays(e.TRIANGLES,0,3),Et()){const K=Nt("h");e.useProgram(K.p),e.uniform4fv(K.uC,i),e.enable(e.BLEND),e.blendFuncSeparate(e.DST_ALPHA,e.ONE_MINUS_DST_ALPHA,e.ZERO,e.ZERO),e.blendEquation(e.FUNC_ADD),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND)}const y=i[16*4]>Math.fround(.01);e.bindFramebuffer(e.FRAMEBUFFER,s.fb),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,s.t2),e.activeTexture(e.TEXTURE10),e.bindTexture(e.TEXTURE_2D,n.t);const g=Nt((y?"a2b":"a2")+N);e.useProgram(g.p),e.uniform4fv(g.uC,i),e.uniform4fv(g.uF,n.F),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFuncSeparate(e.DST_ALPHA,e.ONE,e.ZERO,e.ONE);const A=Nt(y?"bb_"+L:vt);e.useProgram(A.p),e.uniform4fv(A.uC,i),e.uniform4fv(A.uK,Jt),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,B,B),Je();const S=Nt("blit");e.useProgram(S.p),e.uniform4f(S.uE,i[3*4+3],0,0,0),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,s.t),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,s.t2),e.drawArrays(e.TRIANGLES,0,3)};let lo=0;io(),Tt(),co();let Uo=0;return(t,s)=>{s=Math.min(s||1/30,.25),++Uo===12&&F.want(["h","a2b"+N,"bb_"+L]);const n=r.input,o=n.taps?n.taps():[];Tt();const h=(y,g)=>{const A=Yt(y,g);if(A[1]>-.03)return;const S=-dt.p[1]/A[1],K=dt.p[0]+A[0]*S,pt=dt.p[2]+A[2]*S;if(!(S>30||pt>-1.1&&K>-2.8&&K<2.3)){ro(K,pt,.004,.02),_e.hit("blip",.2,{freq:1500});for(const ut of yt){const me=ut.x-K,Me=ut.z-pt,Le=Math.hypot(me,Me)||1;if(ut.ty===2){if(Le<2.6){ut.dart=.3+.3*Q(),ut.ds=2.4,ut.cool=2+Q()*5;const Pe=(1.6-.4*Le)/Le;ut.dx=me*Pe+(Q()-.5)*.5,ut.dz=Me*Pe+(Q()-.5)*.5}}else Le<2.2&&(ut.wp=[ut.x+me/Le*4,Math.min(ut.z+Me/Le*4,-2.4)],ut.wpT=Dt+8,ut.spook=Dt+1.6)}}};if(n.down&&!je&&(Kt={x:n.x,y:n.y,lx:n.x,ly:n.y,t,mode:0}),n.down&&Kt&&(Kt.mode||(Math.hypot(n.x-Kt.x,n.y-Kt.y)>.015?Kt.mode=1:t-Kt.t>.35&&(Kt.mode=2,He=0,_e.hit("click",.45))),Kt.mode===1)){const y=n.x-Kt.lx,g=n.y-Kt.ly,A=Math.hypot(y,g);if(A>1e-4){const S=dt.rt[0]*y-dt.fw[0]*g*2,K=dt.rt[2]*y-dt.fw[2]*g*2,pt=Math.hypot(S,K)||1;le=[le[0]*.8+S/pt*.2,le[1]*.8+K/pt*.2];const ut=Math.hypot(le[0],le[1])||1;le=[le[0]/ut,le[1]/ut],Ae=Math.min(1.2,Ae+A*2.2)}Kt.lx=n.x,Kt.ly=n.y,Ve-=s,Ve<0&&(Ve=.35,_e.hit("noise",.1+.25*Math.min(1,Ae),{cutoff:450+500*Ae,dur:.8}))}if(!n.down&&je&&Kt&&(Kt.mode||h(Kt.x,Kt.y),Kt.mode===2&&(He=1,_e.hit("click",.45)),Kt=null),!n.down&&!je&&o.length)for(const y of o)h(y.x,y.y);je=n.down,Xe+=s;let M=0;for(;Xe>=1/30&&M<8;)Co(1/30),Xe-=1/30,M++;M>=8&&(Xe=0),Ze-=s,Ye-=s,Ze<0&&(Ze=.8+Q()*.6,_e.hit("noise",.07+.05*Q(),{cutoff:160+120*Q(),dur:2.2,pan:-.2+.4*Q()})),Ye<0&&(Ye=1.2+Q()*3,_e.hit("noise",.05+.04*Q(),{cutoff:700+500*Q(),dur:.18})),co()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
