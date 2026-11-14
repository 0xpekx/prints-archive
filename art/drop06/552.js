// Night Canoe: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/552.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Uo){Uo&&function(){"use strict";const _a={yaw:0,pitch:0,x:0,y:0,z:0},Na=0,R=Math.PI*2,xt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D; precision highp usampler2D;
`,Pa=xt+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 0., 1.); }",qt=`
uniform sampler2D uN;
uniform sampler3D uN3;
uniform vec4 uC[48];
#define CAM uC[0]
#define FW uC[1]
#define RT uC[2]
#define UPV uC[3]
#define TIME uC[2].w
#define PA uC[3].w
#define RIV uC[7]
#define RIV2 uC[8]
#define RIV3 uC[9]
#define TORCH uC[10]
#define TAX uC[11]
#define EXPO uC[12]
#define FOR uC[13]
#define FOR2 uC[14]
#define CAN uC[15]
#define PAD uC[16]
#define PAD2 uC[17]
#define MIST uC[19]
#define AGL uC[20]
#define PLAN uC[21]
#define MWD uC[22]
#define CNT uC[29]
#define CM0 uC[30]
#define CM1 uC[31]
#define CM2 uC[32]
#define CM3 uC[33]
#define SEEDF uC[34]
#define WAVE uC[35]
#define THW uC[38]
#define EG uC[41]
#define FTR uC[43]
#define HZC uC[18]
#define ZEN uC[23]
#define SBD uC[24]
#define MCOL uC[36]
#define CLD uC[37]
#define NGT uC[44]
#define MOON uC[45]
#define SKA uC[46]
#define TCOL uC[47]
#define U0 int(uC[29].w)
uint hu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hu(x) >> 8) * (1. / 16777216.); }
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
float n3(vec3 p) { vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN3, (i + f + .5) / 64., 0.).r; }
float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-20)); a = ay > ax ? 1.5707963 - a : a; a = x < 0. ? 3.1415927 - a : a; return y < 0. ? -a : a; }
float sq(float x) { return x * x; }
float xcen(float z) { return RIV3.x + RIV.x * sin(z * RIV.y + RIV.z) + RIV.w * sin(z * RIV2.x + RIV2.y); }
float wid(float z) { return RIV2.z + RIV2.w * sin(z * .013 + RIV3.y); }
vec3 rayDir(vec2 fc) { vec2 sc = fc / FW.w * 2. - 1.; return normalize(FW.xyz + sc.x * CAM.w * RT.xyz + sc.y * CAM.w * UPV.xyz); }
vec3 toCan(vec3 p) { float c = cos(CAN.z), s = sin(CAN.z); return vec3(p.x * c - p.z * s, p.y, p.x * s + p.z * c); }
vec3 octD(vec2 p) { vec3 n = vec3(p.x, 1. - abs(p.x) - abs(p.y), p.y); if (n.y < 0.) n.xz = (1. - abs(n.zx)) * vec2(n.x >= 0. ? 1. : -1., n.z >= 0. ? 1. : -1.); return normalize(n); }
`,Ua=xt+`
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
  float r2 = smoothstep(.42, .8, F[4]) * .8;
  float r3 = smoothstep(.38, .85, F[5] * .7 + F[1] * .3) * .7;
  float b0 = .022 * smoothstep(-.1, .35, l) + .01 * sin(l * 2.3) + .035 * (F[6] - .5);
  float lw = (.014 + .03 * smoothstep(0., 1.3, l)) * (.5 + F[7]);
  float env = exp(-sq((b - b0) / lw)) * smoothstep(-.2, .02, l) * (1. - smoothstep(1.5, 2.1, l));
  float patchy = smoothstep(.3, .78, F[3] + .4 * (F[4] - .5));
  float tau = uM.z * (env * (2.4 * patchy + .9 * r2 + .5 * r3) + exp(-abs(b - b0 * .6) / .07) * (.35 * patchy + 1.1 * r2 + .8 * r3) * (.3 + .7 * exp(-l * l / 1.2)));
  tau += uM.z * 1.7 * exp(-(sq(l + .03) / .0012 + sq(b - .085) / .0005)) * (.5 + r2);
  tau += uM.z * 1.1 * exp(-(sq(l + .1) / .004 + sq(b - .23) / .003)) * (.4 + r2);
  vec3 sc = mix(vec3(.78, .85, 1.), vec3(1., .9, .76), exp(-l * l / 1.2));
  sc = mix(sc, vec3(1., .76, .52), clamp(bul * 1.2, 0., 1.));
  vec3 col = sc * I * exp(-tau * vec3(.72, 1., 1.4));
  float neb = exp(-(sq(l - .105) / .00012 + sq(b + .023) / .00006)) + .7 * exp(-(sq(l - .263) / .0001 + sq(b + .012) / .00005));
  col += vec3(1., .32, .42) * neb * .2 * (.6 + .8 * cl3) * exp(-tau * .5);
  float edge = smoothstep(uM2.z, uM2.z * .8, abs(b));
  col *= edge;
  float dens = clamp((disc * lonF * (.3 + cl) + bul) * exp(-tau * .9), 0., 1.) * edge;
  o = vec4(sqrt(clamp(col * .2, 0., 1.)), dens);
}`,Sa=`
uniform usampler2D uPrev;
#if MODE == 4
out vec4 o;
#else
out uvec4 o;
#endif
uint SEEDU;
float sdCap(vec3 p, vec3 a, vec3 b, float r) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * h) - r; }
float sdCapT(vec3 p, vec3 a, vec3 b, float ra, float rb) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * h) - mix(ra, rb, h); }
float smin(float a, float b, float k) { float h = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(b, a, h) - k * h * (1. - h); }
#if MODE < 2 || MODE == 4
float hwAt(float z, float s) { return FOR.x * (.55 + .9 * n2(vec2(z * .03, s > 0. ? 77. : 31.))); }
// crown k of a bank (bank frame: u into the forest, y up, z along the river)
void crownP(float k, float s, out vec3 c, out vec2 rr, out float low) {
  uint h = hu(uint(int(k) + 100000) * 2654435761u ^ (s > 0. ? 0x9e37u : 0x7f4au) ^ SEEDU);
  vec4 r = vec4(hf(h), hf(h + 1u), hf(h + 2u), hf(h + 3u));
  c.z = (k + .5) * 9. + (hf(h + 4u) - .5) * 5.;
  float hw = hwAt(c.z, s);
  low = step(r.x, FOR.y);
  c.xy = low > 0. ? vec2(-3.4 + 4. * r.y, 7. + 4. * r.z) : vec2(1. + 9. * r.y, hw + 9. * r.z);
  rr = low > 0. ? vec2(3. + 2. * r.w, 2. + 1.3 * r.z) : vec2(4.5 + 3.5 * r.w, 3. + 2.5 * r.y);
}
void emerP(float k, float s, out vec3 c, out vec2 rr, out float on) {
  uint h = hu(uint(int(k) + 200000) * 2246822519u ^ (s > 0. ? 0x51edu : 0x2b3cu) ^ SEEDU);
  vec4 r = vec4(hf(h), hf(h + 1u), hf(h + 2u), hf(h + 3u));
  on = step(r.x, FOR.z);
  c = vec3(4. + 9. * r.y, 29. + 9. * r.z, (k + .5) * 31. + (hf(h + 4u) - .5) * 14.);
  rr = vec2(8.5 + 5. * r.w, 2.8 + 1.4 * r.z);
}
#endif
#if MODE == 4
// foliage envelope, its broad structure (bank frame q, side s, world p): baked once per mint into a 3D map
float envS(vec3 q, float s, vec3 p) {
  float so = s > 0. ? 0. : 61.;
  float uf = -.5 + 2.6 * (n2(vec2(q.z * .07 + so, q.y * .11) + 17.) - .5) + 1.8 * (n2(vec2(q.z * .021 + so, 3.)) - .5);
  float yb = -1.1 + 1.1 * n2(vec2(q.z * .13 + so, 41.)) * n2(vec2(q.z * .05, 9. + so)) + .6 * (n2(vec2(q.z * .55, q.x * .5) + so) - .5);
  float hw = hwAt(q.z, s);
  float d = max(max(uf - q.x, yb - q.y), q.y - hw);
  d = min(d, max(uf + 4.5 + 3. * n2(vec2(q.z * .1, 5. + so)) - q.x, q.y - hw));
  float k0 = floor(q.z / 9.);
  for (int i = -1; i <= U0 + 1; i++) {
    vec3 c; vec2 rr; float low;
    crownP(k0 + float(i), s, c, rr, low);
    vec3 e = (q - c) / rr.xyx;
    d = min(d, (length(e) - 1.) * min(rr.x, rr.y));
    float th = c.z * 1.7 + float(i);
    vec3 c2 = c + vec3(cos(th) * rr.x * .5, rr.y * .35, sin(th) * rr.x * .5);
    e = (q - c2) / (rr.xyx * .66);
    d = min(d, (length(e) - 1.) * min(rr.x, rr.y) * .66);
  }
  float j0 = floor(q.z / 31.), jn = j0 + (fract(q.z / 31.) < .5 ? -1. : 1.);
  for (int i = 0; i < U0 + 2; i++) {
    vec3 c; vec2 rr; float on;
    emerP(i == 0 ? j0 : jn, s, c, rr, on);
    if (on > 0.) {
      vec3 e = (q - c - vec3(0., rr.y * .3, 0.)) / vec3(rr.x * .62, rr.y, rr.x * .62);
      d = min(d, (length(e) - 1.) * rr.y);
      e = (q - c + vec3(0., rr.y * .25, 0.)) / vec3(rr.x * .95, rr.y * .7, rr.x * .9);
      d = min(d, (length(e) - 1.) * rr.y * .7);
    }
  }
  return d + 2.6 * (n3(p * .09) - .5);
}
#endif
#if MODE == 0
uniform highp sampler3D uEnv;
// foliage envelope: negative inside (the baked structure plus the fine noise)
float envF(vec3 p) {
  float xc = xcen(p.z), dx = p.x - xc, s = dx < 0. ? -1. : 1.;
  vec3 q = vec3(abs(dx) - .5 * wid(p.z), p.y, p.z);
  if (q.x < -16. || q.y > 50.) return length(max(vec2(-q.x - 15., q.y - 49.), 0.)) + .3;
  vec2 e = textureLod(uEnv, vec3(q.z * EG.x + EG.y, q.y * EG.z + EG.w, (q.x + 16.) / 38.), 0.).rg;
  float d = (s > 0. ? e.y : e.x) * 16. - 4.;
  d += 3. * (n3(p * .26 + 3.) - .5) + 2. * (n3(p * .7 + 7.) - .5) + 1.1 * (n3(p * 1.5 + 5.) - .5);
  d += 1.8 * smoothstep(.08, .0, abs(n3(p * .4 + 13.) - .5));   // clefts between sub-crowns
  return d;
}
#endif
#if MODE == 2
// ---- the canoe: one hollowed log along +z (x = 0): adze-scalloped inside, worn rim, spoon ends, rain water in
// the bottom and a pole lashed across ahead of you
float CMF;
float canoeD(vec3 p) {
  p = toCan(p);
  float zt = CAN.x, zs = CAN.y, L = (zt - zs) * .5, zm = (zt + zs) * .5;
  float a = clamp(abs(p.z - zm) / L, 0., 1.);
  float lg = n2(vec2(p.z * 1.7, 4.)) - .5;
  float hw = (.33 * pow(max(1. - pow(a, 2.6), 0.), .55) + .006) * (1. + .06 * lg);
  float top = .21 + .14 * smoothstep(.62, 1., a) + .01 * sin(p.z * 2.3) + .014 * (n2(vec2(p.z * 2.1, 3. + 6. * smoothstep(-.12, .12, p.x))) - .5);
  float H = top + .21, xs = p.x - .012 * lg;
  float dOut = (length(vec2(xs / hw, (p.y - top) / H)) - 1.) * min(hw, H) + .003 * (n3(p * vec3(9., 9., .6)) - .5);
  float th = .045 + .014 * lg;
  float e = sqrt(max(1. - sq(max(a - .52, 0.) / .36), 0.));
  float hi = max((hw - th) * sqrt(e), .004);
  float Hi = (H - th) * (1. - .3 * smoothstep(.55, .95, a)) * (.02 + .98 * e * sqrt(e));
  float dIn = (length(vec2(xs / hi, (p.y - top) / Hi)) - 1.) * min(hi, Hi) + .05 * smoothstep(.5, .0, e);
  float d = max(dOut, -dIn);
  d = -smin(-d, top - p.y, .014);
  d = max(d, abs(p.z - zm) - L);
  CMF = 7.;
  float dw = max(dIn + .004, p.y + .145);
  if (dw < d) d = dw;
  // the pole across, its ends notched into the rim and lashed
  vec3 T = THW.xyz;
  float rP = length(vec2(p.y - T.y - .012 * sin(p.x * 5. + 1.) - .006 * sin(p.x * 13.), p.z - T.x - .03 * sin(p.x * 3.5 + 2.)));
  float dp = max(rP - .016 - .004 * n3(p * vec3(8., 30., 30.)) - .0035 * n3(p * vec3(5., 130., 130.)) - .006 * smoothstep(.7, .9, n3(p * 9. + 4.)), abs(p.x) - T.z - .015 * sin(p.x * 40.));
  float sl = abs(abs(p.x) - T.z + .065);
  float dl = max(length(vec2(rP - .021, (fract(p.x / .0065 + .3 * sin(p.y * 90.)) - .5) * .0065)) - .0029, sl - .02 - .004 * sin(p.z * 80.));
  if (dp < d) { d = dp; CMF = 13.; }
  if (dl < d) { d = dl; CMF = 14.; }
  return d * .8;
}
float paddleD(vec3 p) {
  vec3 a = PAD.xyz, b = PAD2.xyz;
  vec3 ax = normalize(b - a);
  float ds = sdCapT(p, a, b, .0135, .016) + .0012 * (n3(p * 40.) - .5);
  vec3 sd = normalize(cross(ax, vec3(0., 1., 0.)));
  vec3 nr = cross(sd, ax);
  vec3 q = p - b;
  float s = dot(q, ax), lat = dot(q, sd), nn = dot(q, nr) + .02 * s;
  float L = PAD2.w, u = clamp(s / L, 0., 1.);
  float w = .083 * pow(sin(3.1416 * clamp(u * .86 + .14, 0., 1.)), .75) * (1. - .3 * u * u) + .004;
  float d2 = max(abs(lat) - w, max(-s, s - L));
  float thk = .008 * (1. - .75 * clamp(abs(lat) / w, 0., 1.)) * (1. - .5 * u) + .0022;
  float db = max(d2, abs(nn) - thk);
  float gr = sdCap(p, a - sd * .045 + ax * .01, a + sd * .045 + ax * .01, .014);
  return min(min(ds, db), gr);
}
float caimanD(vec3 p, vec4 C) {
  vec3 q = p - vec3(C.x, 0., C.y);
  float cy = cos(C.z), sy = sin(C.z);
  q = vec3(q.x * cy - q.z * sy, q.y, q.x * sy + q.z * cy) / C.w;
  // only the top of the head breaks the water: a long low snout, the eye bosses and the nostril knob
  float d = (length((q - vec3(0., -.05, .03)) / vec3(.072, .058, .34)) - 1.) * .055;
  vec3 qe = vec3(abs(q.x) - .043, q.y - .006, q.z + .085);
  d = smin(d, length(qe * vec3(1., 1.35, .85)) - .021, .018);
  d = smin(d, length((q - vec3(0., -.012, .3)) * vec3(1., 1.3, 1.)) - .019, .02);
  d += .003 * (n3(q * 70.) - .5);
  return d * C.w;
}
#endif
#if MODE == 3
// palm fronds of one crown: P0 crown top, ph phase, sz size. Each frond leaves the crown along d0 (young ones steep,
// old ones low) and droops under its own weight (a parabola in h along d0, with a little sideways bend), so from below
// the crown is a ring of arching, drooping fronds; pinnate leaflets angle toward the tip, hang off both sides in a V
// and droop at their ends, each with its own sag (a few torn out).
float palmCrown(vec3 p, vec3 P0, float ph, float sz) {
  float d = 1e4;
  vec3 pa = p - P0;
  for (int i = 0; i < U0 + 13; i++) {
    float fi = float(i), ag = fi / 12.;
    float az = fi * 2.39996 + ph + .35 * (fract(fi * .7549 + ph) - .5);
    float el = .95 - 1.25 * ag + .12 * sin(fi * 3.7 + ph);
    float L = (3.3 - .5 * ag) * sz * (.93 + .14 * fract(fi * .618 + ph * .3));
    vec3 hz = vec3(cos(az), 0., sin(az)), sd = vec3(-hz.z, 0., hz.x);
    vec3 d0 = hz * cos(el) + vec3(0., sin(el), 0.);
    vec3 g = (sd * .16 * sin(fi * 2.3 + ph * 1.7) - vec3(0., .07 + .15 * ag, 0.)) / sz;
    float h = clamp(dot(pa, d0), 0., L);
    vec3 D = d0 + 2. * h * g;
    h = clamp(h + dot(pa - d0 * h - g * h * h, D) / dot(D, D), 0., L);
    D = d0 + 2. * h * g;
    h = clamp(h + dot(pa - d0 * h - g * h * h, D) / dot(D, D), 0., L);
    D = normalize(d0 + 2. * h * g);
    vec3 rel = pa - d0 * h - g * h * h;
    vec3 S = normalize(sd - D * dot(sd, D)), Nn = cross(S, D);
    float lat = dot(rel, S), nn = dot(rel, Nn), al = abs(lat), u = h / L;
    float Lf = (.08 + .92 * pow(max(sin(3.1416 * clamp(u * .95 + .05, 0., 1.)), 0.), .7)) * .66 * sz;
    float lk = (h - al) / .2 + .5, li = floor(lk);
    float r = hf(uint(int(li) + 4096) * 0x9e3779b9u ^ uint(i) * 0x85ebca6bu ^ uint(ph * 1000.));
    float hv = (.3 + .4 * ag) * (.75 + .5 * r), hq = (.5 + .6 * ag + .5 * u * u) * (.75 + .5 * r);
    float dsh = (abs(nn + hv * al + hq * al * al) - .007) / sqrt(1. + sq(hv + 2. * hq * al));
    float Li = Lf * (.55 + .6 * r), hw = .013 * sz * (1. - .8 * clamp(al / Li, 0., 1.)) + .004;
    float comb = r < .05 ? .1 : (abs(fract(lk) - .5) * .2 - hw) * .7;
    float dl = max(max(max(al - Li, dsh), comb), abs(dot(rel, D)) - .01);
    d = min(d, min(dl, length(rel) - mix(.035, .012, u) * sz));
  }
  return d;
}
#endif
#if MODE == 4
void main() {
  SEEDU = uint(SEEDF.x) * 2654435761u;
#ifdef E256
  vec3 q = vec3(EG.y * 0. + uC[42].x, gl_FragCoord.y - 2., gl_FragCoord.x * 4. - 150.);
#else
  vec3 q = vec3(EG.y * 0. + uC[42].x, gl_FragCoord.y - 2., gl_FragCoord.x * 2. - 150.);
#endif
  float w = .5 * wid(q.z), xc = xcen(q.z);
  float a = envS(q, -1., vec3(xc - q.x - w, q.y, q.z)), b = envS(q, 1., vec3(xc + q.x + w, q.y, q.z));
  o = vec4(clamp((vec2(a, b) + 4.) / 16., 0., 1.), 0., 1.);
}
#else
float GM; // material of the last mapO minimum
float mapO(vec3 p) {
  float d = 1e4, m = 0.;
#if MODE == 2
  vec3 pc = toCan(p);
  if (abs(pc.x) < 1.7 && pc.z > -4.6 && pc.z < 3.8 && p.y < 1.25) {
    float dc = canoeD(p); if (dc < d) { d = dc; m = CMF; }
    float dp = paddleD(p); if (dp < d) { d = dp; m = 8.; }
  } else d = max(max(abs(pc.x) - 1.45, max(-4.4 - pc.z, pc.z - 3.6)), p.y - 1.05);
  if (p.y < .45) {
    float dk = 1e4;
    int ncm = int(CNT.z);
    for (int j = 0; j < ncm; j++) {
      vec4 C = j == 0 ? CM0 : j == 1 ? CM1 : j == 2 ? CM2 : CM3;
      if (length(p.xz - C.xy) < 1.8) dk = min(dk, caimanD(p, C));
      else dk = min(dk, length(p.xz - C.xy) - 1.7);
    }
    if (dk < d) { d = dk; m = 10.; }
  }
  GM = m;
  return d;
#elif MODE == 1 || MODE == 3
  // banks
  float xc = xcen(p.z), dx = p.x - xc, s = dx < 0. ? -1. : 1.;
  vec3 q = vec3(abs(dx) - .5 * wid(p.z), p.y, p.z);
  float so = s > 0. ? 0. : 61.;
  if (q.x < -13. || q.y > 45.) { d = min(d, length(max(vec2(-q.x - 12.5, q.y - 44.), 0.)) + .3); GM = m; return d; }
#if MODE == 1
  // mud bank and ground
  float yg = -.75 + .18 * max(q.x - 1., 0.) + 1.7 * smoothstep(-.2, 3.4, q.x + .8 * (n2(vec2(q.z * .09 + so, 2.)) - .5) + 1.4 * (n2(vec2(q.z * .4 + so, 6.)) - .5)) + .22 * (n2(q.xz * .55 + so) - .5);
  float dg = (q.y - yg) * .55;
  if (dg < d) { d = dg; m = 3.; }
  // trunks of the canopy crowns (leaning out over the water when the crown overhangs)
  float k0 = floor(q.z / 9.);
  for (int i = -1; i <= U0 + 1; i++) {
    vec3 c; vec2 rr; float low;
    crownP(k0 + float(i), s, c, rr, low);
    uint h = hu(uint(int(k0) + i + 300000) ^ (s > 0. ? 0x33u : 0x77u) ^ SEEDU);
    bool ftr = s == FTR.x && k0 + float(i) == floor(FTR.y / 9.);
    if (ftr) { low = 0.; c.z = FTR.y - (hf(h + 1u) - .5) * 2.; c.x = max(c.x, 2.); }
    vec3 base = vec3(ftr ? .35 : low > 0. ? max(c.x, -1.) + .8 + 1.2 * hf(h) : max(c.x, .2) + 1.2 + 2. * hf(h), -.2, c.z + (hf(h + 1u) - .5) * 2.);
    vec3 top = ftr ? vec3(base.x + .9, c.y - rr.y * .4, base.z + .3) : vec3(c.x, c.y - rr.y * .4, c.z);
    float r0 = ftr ? .38 : low > 0. ? .14 + .1 * hf(h + 2u) : .22 + .25 * hf(h + 2u);
    float dt = sdCapT(q, base, top, r0, r0 * .55);
    vec3 lm = mix(base, top, .62);
    dt = min(dt, sdCapT(q, lm, top + vec3(rr.x * .5, rr.y * .1, (hf(h + 3u) - .5) * rr.x), r0 * .5, r0 * .2));
    if (dt < d) { d = dt; m = 2.; }
  }
  // emergent trunks and limbs
  float j0 = floor(q.z / 31.), jn = j0 + (fract(q.z / 31.) < .5 ? -1. : 1.);
  for (int i = 0; i < U0 + 2; i++) {
    vec3 c; vec2 rr; float on;
    emerP(i == 0 ? j0 : jn, s, c, rr, on);
    if (on > 0.) {
      vec3 base = vec3(c.x + .6, -.2, c.z);
      vec3 fork = vec3(c.x, c.y - rr.y * 2.2, c.z);
      float dt = sdCapT(q, base, fork, .85, .55);
      dt = min(dt, sdCapT(q, base + vec3(-1.1, 0., .3), base + vec3(-.2, 2.8, .1), .35, .12));
      dt = min(dt, sdCapT(q, base + vec3(.3, 0., -1.2), base + vec3(.1, 2.6, -.2), .3, .1));
      for (int b = 1; b < U0 + 4; b++) {
        float fb = float(b) * 2.0944 + c.z * .7;
        vec3 tip = c + vec3(cos(fb) * rr.x * .5, -rr.y * .4, sin(fb) * rr.x * .5);
        dt = min(dt, sdCapT(q, fork, tip, .42, .1));
      }
      if (dt < d) { d = dt; m = 2.; }
    }
  }
#else
  // hanging lianas and aerial roots: from the crowns down to the water (some trail in it)
  if (q.x > -5. && q.y < FOR.x * 1.5 + 2.) {
    float lz = floor(q.z / 2.7);
    for (int i = 0; i < U0 + 2; i++) {
      float kz = lz + float(i) - (fract(q.z / 2.7) < .5 ? 1. : 0.);
      uint h = hu(uint(int(kz) + 600000) ^ (s > 0. ? 0x3cu : 0xc3u) ^ SEEDU);
      bool fl = s == FTR.x && kz == floor((FTR.y - .3) / 2.7);   // one liana always hangs across the feature trunk
      if (fl || hf(h + 5u) < FOR2.y) {
        float ul = fl ? -.2 : -2.9 + 3.3 * hf(h), zl = fl ? FTR.y - .3 : (kz + .5) * 2.7 + (hf(h + 1u) - .5) * 1.6;
        float yb = fl ? .5 : hf(h + 2u) < .4 ? -1. : .3 + 4.5 * hf(h + 3u);
        float ph = hf(h + 4u) * 6.28;
        float lu = ul + .5 * sin(q.y * .42 + ph) + .07 * sin(q.y * 1.9 + ph * 2.);
        float lzz = zl + .45 * sin(q.y * .33 + ph * 1.3);
        float rz = q.z - lzz, kb = yb < 0. ? clamp(floor(rz / .07 + .5), -2., 2.) : 0.;
        rz -= kb * .07;
        float rx = q.x - lu - (yb < 0. ? .04 * sin(q.y * 1.3 + kb * 2.1 + ph) : 0.);
        float dl = max(length(vec2(rx, rz)) * .75 - (yb < 0. ? .005 + .006 * hf(h + 6u) : fl ? .03 : .008 + .02 * hf(h + 6u)), yb - q.y);
        dl = max(dl, q.y - 16.);
        if (dl < d) { d = dl; m = 5.; }
      }
    }
  }
  // palms: leaning out over the water
  {
#if MODE == 3
    float pz = floor(q.z / 19.);
    for (int i = 0; i < U0 + 2; i++) {
      float kz = pz + float(i) - (fract(q.z / 19.) < .5 ? 1. : 0.);
      uint h = hu(uint(int(kz) + 700000) ^ (s > 0. ? 0x6bu : 0xb6u) ^ SEEDU);
      if (hf(h) < FOR.w) {
        float Hp = 10. + 9. * hf(h + 1u), ln = .12 + .3 * hf(h + 2u);
        vec3 b0 = vec3(.4 + 2.5 * hf(h + 3u), -.3, (kz + .5) * 19. + (hf(h + 4u) - .5) * 9.);
        vec3 tp = b0 + vec3(-sin(ln) * Hp, cos(ln) * Hp, (hf(h + 5u) - .5) * 2.);
        vec3 md = mix(b0, tp, .5) + vec3(-.4, 0., 0.);
        float dpl = min(sdCapT(q, b0, md, .17, .14), sdCapT(q, md, tp, .14, .12));
        float m2 = 4.;
        float psz = .9 + .3 * hf(h + 7u), dcr = length(q - tp) - 4.8 * psz;
        if (dcr < .3) dpl = min(dpl, palmCrown(q, tp, hf(h + 6u) * 6.28, psz) * .8);
        else dpl = min(dpl, dcr + .1);
        if (dpl < d) { d = dpl; m = m2; }
      }
    }
#endif
  }
#endif
  GM = m;
  return d;
#else
  GM = 0.;
  return 1e4;
#endif
}
vec2 octE(vec3 n) { n /= abs(n.x) + abs(n.y) + abs(n.z); return n.y >= 0. ? n.xz : (1. - abs(n.zx)) * vec2(n.x >= 0. ? 1. : -1., n.z >= 0. ? 1. : -1.); }
void main() {
  SEEDU = uint(SEEDF.x) * 2654435761u;
  vec3 rd0 = rayDir(gl_FragCoord.xy);
  vec3 E = CAM.xyz;
  float tw = rd0.y < -1e-4 ? E.y / -rd0.y : 1e9;
  const float S = .34;
  vec3 ro = E, rd = rd0;
#if MODE > 0
  uvec4 gi = texelFetch(uPrev, ivec2(gl_FragCoord.xy), 0);
  bool wi = ((gi.z >> 8) & 1u) != 0u;
  float mi = float(gi.z & 15u), ti = unpackHalf2x16(gi.x).x, ci = float((gi.z >> 4) & 15u) / 15.;
  float tmax = wi ? min(tw, 1200.) : (mi > .5 && ci > .99 ? ti : min(tw, 1200.));
#if MODE == 2
  tmax = min(tmax, 400.);
#endif
#else
  float tmax = min(tw, 1200.);
#endif
  float tH = -1., mH = 0., aoH = 1., cov = 1.;
  vec3 nH = -rd;
  uint aH = 0u, water = 0u;
  int npass = int(CNT.x);
  for (int pass = 0; pass < npass; pass++) {
    float t = .02, bestR = 1e9, bestT = 0., bestM = 0.;
    bool cm = false;
    vec3 cell = vec3(0.), tMx = vec3(0.), tDl = vec3(0.), stp = vec3(0.);
    int nc = 0, nk = -1;
    vec3 hp0 = vec3(0.), nacc = vec3(0.), sv = vec3(0.);
    float he = 0.;
    tH = -1.;
    for (int i = 0; i < U0 + 280; i++) {
      vec3 p = ro + rd * t;
      bool ex = false;
      if (nk >= 0) { sv = nk == 0 ? vec3(1., -1., -1.) : nk == 1 ? vec3(-1., -1., 1.) : nk == 2 ? vec3(-1., 1., -1.) : vec3(1.); p = hp0 + sv * he; }
      else ex = t > tmax || (p.y > 52. && rd.y > 0.);
      if (!ex) {
      float dO = mapO(p), mo = GM;
      if (nk >= 0) { nacc += sv * dO; nk++; ex = nk > 3; }
      else {
      float eps = max(.0012, t * PA * .45);
      if (dO < eps) { tH = t; mH = mo; hp0 = p; he = max(.002, t * PA * .5); nk = 0; }
      else {
      float rr = dO / (t * PA);
      if (rr < bestR && (mo == 5. || mo == 4. || mo == 11. || mo == 2.)) { bestR = rr; bestT = t; bestM = mo; }
#if MODE == 0
      vec3 cc = (cell + .5) * S;
      float ec = envF(cm ? cc : p);
      if (!cm) {
        if (t > 48.) {
          // (pass 2) the roughness grows with the pixel instead of fading, so a far crown keeps a broken edge at any size
          float fs = clamp(t * PA * 5., 1., 4.);
          if (ec < 1.2 * fs) ec += (.9 * (n3(p * 1.7 / fs) - .5) + .45 * (n3(p * 4.1 / fs + 2.) - .5)) * fs * .8;
          if (ec < eps * 1.5) { tH = t; mH = 12.; nH = -rd; aoH = .4; ex = true; }
          else {
          float r2 = ec / (t * PA);
          if (r2 < bestR) { bestR = r2; bestT = t; bestM = 12.; }
          t += min(dO, ec * .45) + eps * .3;
          }
        }
        else if (ec > .35) { t += min(dO, ec * .45) + eps * .3; }
        else {
        cm = true; nc = 0;
        cell = floor(p / S);
        stp = vec3(rd.x >= 0. ? 1. : -1., rd.y >= 0. ? 1. : -1., rd.z >= 0. ? 1. : -1.);
        vec3 ard = max(abs(rd), vec3(1e-6));
        tMx = t + ((cell + step(0., stp)) * S - p) * stp / ard;
        tDl = S / ard;
        }
      } else {
      bool adv = true;
      float tEx = min(tMx.x, min(tMx.y, tMx.z));
      // three leaf sizes: a 4x4x4 block of cells may hold one big blade (banana, heliconia, aroid: 90-120 cm) that each of its
      // cells tests, a 2x2x2 block one mid leaf, else each cell its own small leaf
      vec3 b3 = floor(cell / 4.), b2 = floor(cell / 2.);
      uvec3 i3 = uvec3(ivec3(b3) + 9000), i2 = uvec3(ivec3(b2) + 9000);
      uint h3 = hu(i3.x * 73856093u ^ i3.y * 19349663u ^ i3.z * 83492791u ^ SEEDU ^ 0x5a5au), h2 = hu(i2.x * 73856093u ^ i2.y * 19349663u ^ i2.z * 83492791u ^ SEEDU ^ 0xa5a5u);
      float cls = h3 < 945000000u ? 2. : h2 < 945000000u ? 1. : 0.;
      if (ec < (cls > 1.5 ? .3 : cls > .5 ? .15 : .04)) {
        float side = cc.x - xcen(cc.z) < 0. ? -1. : 1.;
        uvec3 ci = uvec3(ivec3(cell) + 100000);
        float tl = 1e9; vec3 nl = vec3(0.); uint al = 0u;
        float occ = mix(.2, .95, smoothstep(.0, -1.1, ec)) + (FOR2.x - .62) + 1.6 * (n3(cc * .42 + 11.) - .5);
        uint h = cls > 1.5 ? h3 : cls > .5 ? h2 : hu(ci.x * 73856093u ^ ci.y * 19349663u ^ ci.z * 83492791u ^ SEEDU);
        vec4 r0 = texelFetch(uN, ivec2(h & 255u, (h >> 8) & 255u), 0), r1 = texelFetch(uN, ivec2((h >> 16) & 255u, h >> 24), 0);
        float bs = cls > 1.5 ? 4. : cls > .5 ? 2. : 1.;
        vec3 lc = ((cls > 1.5 ? b3 * 4. : cls > .5 ? b2 * 2. : cell) + .5 * bs + (r0.xyz - .5) * (cls > .5 ? .3 : .45)) * S;
        // the big ones hang at all angles; the small ones are denser low down by the water
        bool bg = cls > 1.5;
        vec3 nn = normalize(vec3(r1.x - .5 - side * (bg ? .45 : .7), r1.y * (bg ? 1.3 : .75) + (bg ? -.35 : .15), (r1.z - .5) * (bg ? 1.8 : 1.2)));
        vec3 ax = normalize(cross(nn, vec3(r1.w - .5, .45, r0.x - .5)));
        vec3 bx = cross(nn, ax);
        uint vrt = (h >> 5) & 7u;
        occ = (cls > .5 ? 1. : occ + .7 * smoothstep(1.4, .3, cc.y)) - 1.6 * smoothstep(.4, .3, n3(cc * .13 + 31.));   // caves 1 to 2 m across
        float big = cls > .5 ? 0. : step(.72, r0.y);
        float Ll = S * (cls > 1.5 ? 1.35 + .4 * r1.w : cls > .5 ? .62 + .2 * r1.w : .34 + .22 * r1.w + .3 * big), Wl = Ll * (.26 + .16 * r0.z + (cls > 1.5 ? .1 : .14 * big));
        float dn = dot(rd, nn);
        float tt = dot(lc - ro, nn) / (abs(dn) < 1e-4 ? 1e-4 : dn);
        vec3 hp = ro + rd * tt - lc;
        float la = dot(hp, ax) / Ll, lb = dot(hp, bx) / Wl;
        float s01 = la * .5 + .5;
        // the outline by the leaf's variant: a lance, a broad blade with a drip tip, a heart, a long strap
        vec3 sh = vrt < 3u ? vec3(.6, 1.4, 3.1) : vrt < 5u ? vec3(.45, 2.2, 3.1) : vrt < 7u ? vec3(.25, .9, 1.75) : vec3(.15, .15, 1.15);
        float wv = s01 > 0. && s01 < 1. ? sh.z * pow(s01, sh.x) * pow(1. - s01, sh.y) : -1.;
        if (r0.w < occ && lc.y > .25 && tt > t - .45 * S * bs && abs(lb) < wv) {
          tl = tt;
          float ub = lb / max(wv, 1e-3);
          float cu = .3 + .6 * r0.z;
          vec3 cn = normalize(nn - bx * ub * cu * (dn < 0. ? 1. : -1.) + ax * la * cu * .6);
          nl = dn < 0. ? cn : -cn;
          al = uint(clamp(s01 * 63., 0., 63.)) | (uint(clamp((ub * .5 + .5) * 63., 0., 63.)) << 6) | (vrt << 12) | (dn > 0. ? 1u << 15 : 0u);
        }
        if (tl < 1e8 && tl <= tEx + .5 * S) {
          if (tl - t <= dO) { tH = tl; mH = 1.; nH = nl; aH = al; aoH = clamp(1. + ec * .9, .08, 1.); ex = true; }
          else t += dO;
          adv = false;
        } else {
        nc++;
        if (nc > 30) { tH = t; mH = 12.; nH = -rd; aoH = 0.; ex = true; adv = false; }
        }
      } else if (ec > 1.1) cm = false;
      if (adv) {
      if (tEx - t > dO) { t += dO; }
      else {
      t = tEx + 1e-4;
      if (tMx.x < tMx.y && tMx.x < tMx.z) { cell.x += stp.x; tMx.x += tDl.x; }
      else if (tMx.y < tMx.z) { cell.y += stp.y; tMx.y += tDl.y; }
      else { cell.z += stp.z; tMx.z += tDl.z; }
      }
      }
      }
#else
      t += dO * .95 + eps * .2;
#endif
      }
      }
      }
      if (ex) break;
    }
    if (nk > 3) nH = normalize(nacc);
#if MODE > 0
    if (mi > .5) bestR = 1e9;
#endif
    if (tH < 0. && bestR < 1. && (tw > 1e8 || pass == 1)) { tH = bestT; mH = bestM; cov = clamp(1. - bestR, 0., 1.); nH = -rd; aoH = 1.; }
    if (tH >= 0. || tw > 1e8 || pass == 1) break;
    ro = E + rd0 * tw; rd = vec3(rd0.x, -rd0.y, rd0.z); tmax = 1200.; water = 1u;
#if MODE > 0
    if (!wi) break;
    tmax = mi > .5 && ci > .99 ? ti : (MODE == 2 ? 400. : 1200.);
#endif
  }
#if MODE > 0
  if (tH < 0.) { o = gi; return; }
#endif
  if (tH < 0.) { tH = 0.; mH = 0.; cov = 0.; }
  vec2 on = octE(nH) * .5 + .5;
  uint nb = uint(clamp(on.x * 255. + .5, 0., 255.)) | (uint(clamp(on.y * 255. + .5, 0., 255.)) << 8);
  uint B = uint(mH) | (uint(cov * 15. + .5) << 4) | (water << 8) | (uint(clamp(aoH, 0., 1.) * 127. + .5) << 9);
  o = uvec4(packHalf2x16(vec2(tH, 0.)) & 0xffffu, nb, B, aH);
}
#endif`,Ia=xt+qt+`
uniform usampler2D uG, uF, uMs;
uniform sampler2D uSk, uD;
out vec4 o;
float beamB(float c) { float x = 2. * max(1. - c, 0.) / TCOL.w; return exp(-x / .016) + .08 * exp(-x / .065) + .006 * exp(-x / .35); }
vec3 torchAt(vec3 P, out vec3 l) { vec3 L = P - TORCH.xyz; float d2 = dot(L, L); l = L * inversesqrt(d2); return TCOL.rgb * (TORCH.w * TAX.w * beamB(dot(l, TAX.xyz)) / (d2 + .6) * d2 * d2 / (d2 * d2 + 20.)); }
float ggx(float nh, float a) { float a2 = a * a, d = nh * nh * (a2 - 1.) + 1.; return a2 / (3.1416 * d * d); }
// ---- surface shading under the headtorch
vec3 surf(float m, vec3 P, vec3 N, vec3 rd, float ao, uint A, float fp) {
  vec3 l; vec3 E = torchAt(P, l);
  vec3 V = -rd;
  vec3 alb = vec3(.05), em = vec3(0.); float rough = .45, f0 = .035, wet = 0.;
  float fine = clamp(1.6 - fp * 30., 0., 1.);
  float na = n3(P * 3.1), nb = n3(P * vec3(7., .9, 7.) + 3.);
  bool cf = (m > 6.5 && m < 7.5) || m > 12.5;
  float nd = n3(cf ? toCan(P) * (m > 12.5 ? vec3(7., 150., 150.) : vec3(34., 34., 1.1)) : P * (m < 1.5 ? 1.3 : m < 2.5 ? 7. : m < 3.5 ? 2.7 : m < 8.5 ? 60. : m < 9.5 ? 160. : m < 10.5 || m > 11.5 ? 55. : 9.) + 17.);
  if (m < 1.5) {
    float la = float(A & 63u) / 63., lb = float((A >> 6) & 63u) / 31.5 - 1.;
    uint vrt = (A >> 12) & 7u;
    bool under = (A >> 15) != 0u;
    float vr = fract(float(vrt) * .618 + na * 2.);
    alb = mix(vec3(.038, .097, .022), vec3(.095, .163, .037), vr);
    float rare = step(.6, nd);
    alb = vrt == 5u ? mix(alb, vec3(.1, .095, .03), rare) : vrt == 6u ? mix(alb, vec3(.075, .036, .022), rare) : vrt == 7u ? vec3(.05, .07, .04) : alb;
    if (under) alb = alb * .7 + vec3(.025, .035, .03);
    float mid = exp(-lb * lb / .006) * smoothstep(.98, .8, la);
    float lat = smoothstep(.75, 1., sin((la * 11. - abs(lb) * 2.4) * 3.1416)) * smoothstep(.95, .6, abs(lb));
    alb *= 1. + fine * (.55 * mid + .25 * lat);
    alb = vrt == 4u ? alb * vec3(.9, 1.05, .8) : vrt == 5u ? alb * vec3(.8, 1.15, .7) : alb;
    rough = under ? .55 : .2; f0 = under ? .01 : .05;
    vec2 du = vec2(la * 7., lb * 2.6) + vr * 17.;
    vec2 dc = fract(du) - .5;
    wet = under ? 0. : max(smoothstep(.13, .07, length(dc)) * step(.65, fract(dot(floor(du), vec2(.6180, .4142)) * 7.31)) * fine, .18 * vr);
  } else if (m < 2.5 || (m > 5.5 && m < 6.5)) {
    float mudl = m > 5.5 ? smoothstep(.55, .2, P.y + .15 * na) : 0.;
    alb = vec3(.019, .016, .012) * (.45 + .7 * nb) * (.8 + .3 * nd);
    alb = mix(alb, vec3(.03, .05, .015), smoothstep(.45, .7, nd) * smoothstep(-.2, .5, N.y) * .8);
    alb = mix(alb, mix(vec3(.04, .041, .034), vec3(.03, .045, .036), nb) * (.6 + .5 * nd), smoothstep(.58, .74, na) * smoothstep(.45, .65, nd) * fine * .6);
    alb = mix(alb * mix(.05, 1., smoothstep(0., 2., P.y)), vec3(.045, .032, .02), mudl);
    rough = mix(.75, .3, mudl); f0 = .002; wet = mudl * .3;
  } else if (m < 3.5) {
    alb = vec3(.005, .004, .003) * (.6 + .8 * na);
    alb = mix(alb, vec3(.014, .011, .006) * (.6 + .8 * nb), smoothstep(.7, .78, nd) * fine * .5);
    rough = .6; f0 = .025; wet = .6 * smoothstep(.74, .8, nd) * fine;
  } else if (m > 6.5 && m < 7.5) {
    P = toCan(P);
    float zm = (CAN.x + CAN.y) * .5, ca = clamp(abs(P.z - zm) / ((CAN.x - CAN.y) * .5), 0., 1.);
    float chw = .33 * pow(max(1. - pow(ca, 2.6), 0.), .55);
    float ctop = .21 + .14 * smoothstep(.62, 1., ca), inner = smoothstep(chw - .03, chw - .07, abs(P.x)) * smoothstep(ctop - .01, ctop - .06, P.y);
    float gr = nd;
    float rim = smoothstep(.6, .9, N.y) * smoothstep(.15, .2, P.y) * smoothstep(chw - .09, chw - .04, abs(P.x));
    alb = vec3(.021, .013, .008) * (.5 + .9 * gr);
    // adze work: lengthwise rows of shallow scallops; light catches only their ridges; darker toward the bottom
    float fr = P.y * 13. + .25 * sin(P.z * 2.7) + .3 * na, fy = fract(fr) - .5;
    float fz = fract(P.z * 3.2 + fract(floor(fr) * .618) * 3.) - .5;
    vec3 zW = vec3(sin(CAN.z), 0., cos(CAN.z));
    N = normalize(N + (vec3(0., fy * .7, 0.) + zW * fz * .4) * fine * inner);
    alb *= mix(1., (1. - .45 * smoothstep(.25, .0, abs(fy) + abs(fz) * .3)) * mix(.75, .3, smoothstep(.12, -.12, P.y)), inner);
    alb *= 1. - .35 * smoothstep(.03, .0, abs(fract(nd * 4.) - .5)) * fine;
    alb = mix(alb, vec3(.042, .03, .019) * (.6 + .6 * gr), rim * .8);
    float wl = smoothstep(.06, .0, P.y) * step(-.02, P.y), bil = step(P.y, -.14);
    alb *= 1. - .35 * wl;
    rough = mix(mix(.5, .3, rim), .22, wl); wet = wl * .4 * (1. - inner);
    alb = mix(alb, vec3(.003), bil); rough = mix(rough, .03, bil); wet *= 1. - bil; f0 = mix(f0, .02, bil);
    ao *= 1. - .55 * inner; E *= 1. - .85 * inner; f0 = mix(f0, .015, inner); rough = mix(rough, .75, inner * (1. - wl));
    em = vec3(.0011, .0012, .0014) * bil;
  } else if (m > 7.5 && m < 8.5) {
    float gr = nd;
    alb = vec3(.045, .028, .016) * (.45 + 1.1 * nb) * (.75 + .5 * gr);
    alb = mix(alb, vec3(.09, .065, .04), smoothstep(.6, .8, na) * .4);
    rough = .6; f0 = .025;
  } else if (m > 9.5 && m < 10.5) {
    alb = vec3(.05, .05, .033) * (.55 + .9 * nd) * (.7 + .5 * na);
    N = normalize(N + vec3(nd - .5, 0., fract(nd * 5.3) - .5) * .6 * fine);
    rough = .16; f0 = .045; wet = .3;
  } else if (m > 12.5) {
    float fis = smoothstep(.03, .13, abs(fract(nd * 3.3 + .4 * na) - .5));
    alb = m < 13.5 ? vec3(.024, .017, .011) * (.35 + 1.2 * nd) * (.45 + .55 * fis) : vec3(.034, .026, .015) * (.5 + .7 * fract(nd * 9.));
    alb = m < 13.5 ? mix(alb * .3, vec3(.03, .03, .024) * (.6 + .5 * nb), smoothstep(.6, .72, na) * .3) : alb;
    if (m < 13.5) N = normalize(N + (vec3(nd, fract(nd * 5.3), nb) - .5) * .7);
    rough = .9; f0 = .015;
  } else {
    alb = m < 4.5 ? (P.y > 3. ? vec3(.035, .055, .022) : vec3(.03, .026, .02) * (.5 + 1.1 * nd)) : m < 5.5 ? vec3(.022, .017, .011) : m < 11.5 ? vec3(.032, .029, .024) * (.6 + .8 * smoothstep(.4, .7, na)) * (.35 + 1.1 * nd) : vec3(.02, .034, .012) * (.15 + 1.7 * smoothstep(.35, .75, na)) * (.4 + 1.2 * nd);
    alb *= .65 + .6 * nb;
    if (m < 5.5) f0 = .002;
    if (m > 11.5) E *= mix(ao, 1., smoothstep(9., 20., length(P - CAM.xyz)));
    if (m > 11.5) N = normalize(N + (vec3(na, nb, nd) - .5) * 1.6);
    rough = m < 5.5 ? .8 : .5;
  }
  // the sky's own light: the crowns' tops catch it, the hollows under them stay dark; the moon on the stored normal
  float top = (m > 6.5 && m < 8.5) || m > 12.5 ? 3. : .35 + .65 * smoothstep(1., FOR.x + 4., P.y);
  vec3 amb = SKA.rgb * (.25 + .75 * clamp(N.y * .5 + .5, 0., 1.)) * ao * top;
  float lm = NGT.x * max(m > 11.5 ? .3 + .5 * N.y : dot(N, MOON.xyz), 0.) * (.25 + .75 * ao) * min(top, 1.);
  float lam = max(dot(N, -l), 0.);
  float nh = max(dot(N, normalize(V - l)), 0.);
  wet = min(wet + NGT.z * (m < 1.5 ? .5 : m > 6.5 && m < 8.5 ? 0. : .2), 1.);
  float sp = f0 * ggx(nh, rough) * lam + wet * .06 * ggx(nh, .07) * lam;
  // the sky in wet and worn surfaces (the canoe's rim and floor water, wet leaves at a slant)
  float fv = 1. - clamp(dot(N, V), 0., 1.); fv *= fv; fv *= fv;
  return SKA.rgb * (.5 * (f0 + fv) * (1. - rough) * ao * (1. + 3. * wet) * smoothstep(-.3, .4, N.y)) + alb * (amb + MCOL.rgb * lm / 3.1416 + E * lam * (.3 + .7 * ao) / 3.1416) + E * sp * (.4 + .6 * ao) + em;
}
// ---- the water surface: ambient swell and ring ripples (capillary-gravity packets), paddle vortex pairs
float RGL; // ring crest glow (bioluminescence stirred up by the paddle)
vec3 waterN(vec2 xz, float fp) {
  RGL = 0.;
  vec2 g = vec2(0.);
  float T = TIME;
  g += WAVE.x * (vec2(.35, .12) * cos(dot(xz, vec2(.35, .12)) + T * .9) + vec2(-.1, .27) * cos(dot(xz, vec2(-.1, .27)) + T * .7 + 2.) + vec2(.6, -.4) * .5 * cos(dot(xz, vec2(.6, -.4)) + T * 1.4));
  vec2 bp = xz * .45 + vec2(T * .05, -T * .03);
  float e = .5;
  g += WAVE.y * vec2(n2(bp + vec2(e, 0.)) - n2(bp - vec2(e, 0.)), n2(bp + vec2(0., e)) - n2(bp - vec2(0., e))) * smoothstep(.5, .02, fp);
  int nr = int(CNT.y);
  for (int i = 0; i < nr; i++) {
    vec4 R = texelFetch(uD, ivec2(i, 2), 0);
    float age = T - R.z;
    if (age < 0. || age > 9.) continue;
    float A = abs(R.w);
    vec2 dv = xz - R.xy;
    float r = length(dv) + 1e-4;
    vec2 dir = dv / r;
    float dh = 0.;
    for (int j = 0; j < U0 + 3; j++) {
      float k = j == 0 ? 28. : j == 1 ? 60. : 125.;
      float w = sqrt(9.81 * k + 7.4e-5 * k * k * k);
      float cg = (9.81 + 3. * 7.4e-5 * k * k) / (2. * w);
      float sg = .03 + .1 * age + .02 * float(j);
      float env = exp(-sq(r - cg * age) / (2. * sg * sg)) * exp(-age * (.25 + .25 * float(j))) / sqrt(1. + r * 4.);
      float aa = clamp(1.5 - k * fp * .6, 0., 1.);
      float cw = cos(k * r - w * age);
      dh += A * env * k * cw * aa * (j == 0 ? .6 : j == 1 ? 1. : .5);
      RGL += A * env * (j == 1 ? .5 + .5 * cw : 0.);
    }
    g += dir * dh;
    if (R.w < 0.) {
      float vd = exp(-age / 4.5) * A * 6.;
      for (int j = 0; j < U0 + 2; j++) {
        vec2 c = R.xy + vec2(j == 0 ? .19 : -.19, -.07 * age);
        vec2 q = xz - c;
        float ee = exp(-dot(q, q) / (2. * .0016));
        g += q / .0016 * vd * ee;
      }
    }
  }
  return normalize(vec3(-g.x, 1., -g.y));
}
// ---- low mist on the water and haze: marched near (torch beam), analytic far
void main() {
  ivec2 fc = ivec2(gl_FragCoord.xy);
  vec3 rd = rayDir(gl_FragCoord.xy);
  uvec4 g = texelFetch(uG, fc, 0);
  float pa = PA;
  uint B = g.z;
  bool water = ((B >> 8) & 1u) != 0u;
  float jit = hf(uint(fc.x) * 1973u + uint(fc.y) * 9277u + 13u);
  vec3 skyD = rd, sP = vec3(0.), sV = rd, add = vec3(0.);
  float sm = 0., sCov = 0., sT = 0., odR = 0., F = 1., tmax = 1e5, fcv = 0.;
  vec3 fcol = vec3(0.);
  uvec4 gs = g;
  ivec2 qp = fc;
  vec2 Pw0 = vec2(0.);
  if (water) {
    float tw = CAM.y / max(-rd.y, 1e-5);
    vec3 Pw = CAM.xyz + rd * tw; Pw0 = Pw.xz;
    float fp = tw * pa / max(-rd.y, .03);
    vec3 n = waterN(Pw.xz, fp);
    vec3 r = reflect(rd, n);
    r.y = max(r.y, .001);
    vec3 dq = normalize(vec3(r.x, -r.y, r.z));
    float fz = dot(dq, FW.xyz);
    qp = fc;
    if (fz > .05) {
      vec2 s2 = vec2(dot(dq, RT.xyz), dot(dq, UPV.xyz)) / (fz * CAM.w);
      ivec2 ip = ivec2(floor((s2 * .5 + .5) * FW.w));
      if (ip.x >= 0 && ip.y >= 0 && ip.x < int(FW.w) && ip.y < int(FW.w)) {
        uvec4 g2 = texelFetch(uG, ip, 0);
        if (((g2.z >> 8) & 1u) != 0u) { gs = g2; qp = ip; }
      }
    }
    skyD = r;
    sm = float(gs.z & 15u);
    if (sm > .5) {
      vec3 dqq = rayDir(vec2(qp) + .5);
      float twq = CAM.y / max(-dqq.y, 1e-5);
      sV = vec3(dqq.x, -dqq.y, dqq.z);
      sT = unpackHalf2x16(gs.x).x;
      sP = CAM.xyz + dqq * twq + sV * sT;
      float H = MIST.z;
      odR = MIST.y * sT + MIST.x * .5 * (abs(sV.y) > 1e-3 ? H / sV.y * (1. - exp(-max(sV.y * sT, 0.) / H)) : sT);
    }
    F = .02 + .98 * pow(1. - clamp(dot(-rd, n), 0., 1.), 5.);
    vec3 l; vec3 Et = torchAt(Pw, l);
    float nh = max(dot(n, normalize(-rd - l)), 0.);
    add = (1. - F) * vec3(.05, .022, .007) * (.0006 + Et * (.003 + .009 * smoothstep(5., 1.5, tw)) * max(dot(n, -l), 0.)) + Et * .02 * ggx(nh, .03) * max(dot(n, -l), 0.);
    if (MOON.w > 0.) {
      // the moon's path: broken into glints where the small waves tilt toward it, dark gaps between them. The ripples'
      // crests lie mostly across the moon's bearing, so the glints are small level dashes, scattered wider near the eye; far off, where a
      // pixel covers many ripples, they close into the disc's own image under the far shore
      vec3 mh = normalize(MOON.xyz - rd);
      vec2 md = normalize(MOON.xz + 1e-6), q = vec2(dot(Pw.xz, md), dot(Pw.xz, vec2(-md.y, md.x)));
      float fr = smoothstep(.5, .06, fp), fr2 = smoothstep(.2, .015, fp), T = TIME;
      // (cycle 2) the crests run long across the bearing (the across tilt a small, slow part of the along tilt) and the
      // waves come in groups that pass, so near the eye the path is a loose stack of level ribbons that pinch and part,
      // never hooks or upright bars
      float grp = .6 + .4 * sin(q.x * .55 + q.y * .21 - T * .5) * sin(q.y * .27 - q.x * .13 + T * .37);
      float sa = ((.55 * cos(q.x * 2.6 + q.y * .1 + T * 1.9) + .35 * cos(q.x * 4.1 - q.y * .17 + T * 2.6 + 1.7)) * fr * (1. - .8 * fr2)
        + (.5 * cos(q.x * 9.1 + q.y * .5 + T * 3.1) + .4 * cos(q.x * 15.7 - q.y * .8 + T * 4.3 + 1.7) + .3 * cos(q.x * 27.3 + q.y * 1.2 - T * 5.2)) * fr2) * grp;
      float sc = .5 * cos(q.y * .7 - q.x * 1.3 - T * .8) * fr + .4 * cos(q.y * 1.6 + q.x * 2.9 + T * 1.3) * fr2;
      vec3 nm = normalize(n + vec3(md.x, 0., md.y) * sa * (.07 + .07 * fr2) + vec3(-md.y, 0., md.x) * sc * .05);
      // (a glint's peak held under the disc's, so it keeps the moon's colour)
      // (cycle 2) the glint's spread is three times wider across the bearing than along it: crisp level ribbons
      vec3 dv = mh - nm; float ea = dot(dv, vec3(md.x, 0., md.y)), ec = dot(dv, vec3(-md.y, 0., md.x)), rr = .006 + .06 * (1. - .5 * (fr + fr2));
      add += MCOL.rgb * NGT.x * F * .03 * min(.9 / (rr * rr), 160.) * exp(-(ea * ea + ec * ec / 9.) / (rr * rr)) * .8 * smoothstep(-.02, .05, MOON.y);
    }
    uvec4 fq = texelFetch(uF, fc, 0);
    fcv = float(fq.x) / 65535.;
    if (fcv > 0.) {
      vec3 fa = vec3(float(fq.y & 255u), float(fq.y >> 8), float(fq.z & 255u)) / 1800.;
      vec2 tl = (vec2(float(fq.z >> 8), float(fq.w)) - 128.) / 80.;
      vec3 nf = normalize(vec3(tl.x, 1., tl.y));
      float lf = max(dot(nf, -l), 0.);
      fcol = fa * (vec3(.0011, .0013, .0017) + Et * lf / 3.1416) + Et * .05 * pow(max(dot(nf, normalize(-rd - l)), 0.), 60.) * lf;
    }
    tmax = tw;
  } else {
    sm = float(B & 15u);
    if (sm > .5) { sT = unpackHalf2x16(g.x).x; sP = CAM.xyz + rd * sT; tmax = sT; }
  }
  sCov = float((gs.z >> 4) & 15u) / 15.;
  vec3 col = vec3(0.);
  if (sm < .5 || sCov < .99) {
    ivec2 sp0 = water ? qp : fc;
    vec3 k0 = texelFetch(uSk, sp0, 0).rgb;
    if (water) { float rch = 3. * FW.w / 1000. * smoothstep(4., 40., tmax); k0 = texelFetch(uSk, clamp(sp0 + ivec2(0, int(floor((n2(Pw0 * vec2(.7, 2.6) + vec2(TIME * .03, 0.)) - .5) * 2. * rch + .5))), ivec2(0), ivec2(int(FW.w) - 1)), 0).rgb; }
    col = pow(k0, vec3(3.)) * 8.;
  }
  if (sm > .5) {
    vec3 N = octD(vec2(float(gs.y & 255u), float(gs.y >> 8)) / 127.5 - 1.);
    vec3 sc = surf(sm, sP, N, sV, float((gs.z >> 9) & 127u) / 127., gs.w, sT * pa);
    sc = mix(sc, HZC.rgb * .8, 1. - exp(-sT / SKA.w));
    sc = sc * exp(-odR) + (SKA.rgb * .4 + MCOL.rgb * NGT.x * .03 * smoothstep(.86, .97, dot(normalize(sV.xz + 1e-6), normalize(MOON.xz + 1e-6))) * smoothstep(.45, .2, MOON.y)) * (1. - exp(-odR));
    col = mix(col, sc, sCov);
  }
  col = mix(col * F + add, fcol, fcv);
  uvec2 mq = texelFetch(uMs, fc, 0).xy; vec2 m0 = unpackHalf2x16(mq.x), m1 = unpackHalf2x16(mq.y);
  float tr = m1.y; vec3 ins = vec3(m0, m1.x);
  col = col * tr + ins;
  col *= EXPO.x;
  float L = dot(col, vec3(.2126, .7152, .0722));
  float Lt = L * (1. + L / 7.) / (1. + L);
  col *= Lt / max(L, 1e-7);
  col = mix(col, vec3(Lt), smoothstep(.7, 2.2, L) * .5);
  vec2 sc = gl_FragCoord.xy / FW.w * 2. - 1.;
  col *= 1. - .04 * dot(sc, sc);
  float gn = hf(uint(fc.x) * 1973u + uint(fc.y) * 9277u + 7919u) - .5;
  col = max(col * (1. + gn * .027) + gn * .0003, 0.);
  col = mix(12.92 * col, 1.055 * pow(col, vec3(1. / 2.4)) - .055, step(.0031308, col));
  col += (hf(uint(fc.x) * 7717u + uint(fc.y) * 3343u + 1u) - .5) / 255.;
  o = vec4(clamp(col, 0., 1.), 1.);
}`,Oa=xt+qt+`
uniform usampler2D uG;
out uvec2 o;
vec3 mistIn(vec3 rd, float tmax, float jit, out float tr) {
  float s0 = .45, s1 = clamp(tmax, s0 + .01, 45.);   // (pass 2) from just under the lamp: the beam a shaft over your forehead
  float lr = log(s1 / s0);
  float od = 0.; vec3 L = vec3(0.);
  // a low moon lights the mist between you and it from behind: only within 20 to 30 degrees of its bearing (cycle 2:
  // elsewhere the mist is the night's own blue-grey, not a brown wash)
  float mb = dot(normalize(rd.xz + 1e-6), normalize(MOON.xz + 1e-6));
  vec3 fsc = MCOL.rgb * NGT.x * (.03 * smoothstep(.86, .97, mb) + .25 * pow(max(dot(rd, MOON.xyz), 0.), 12.)) * smoothstep(.45, .2, MOON.y);
  vec3 amb = SKA.rgb * .4 + fsc;
  for (int i = 0; i < U0 + 6; i++) {
    float s = s0 * exp(lr * (float(i) + .5 + (jit - .5) * .35) / 6.), ds = s * lr / 6.;   // (cycle 2) a third of the jitter: no grain
    vec3 X = CAM.xyz + rd * s;
    float rho = MIST.y + MIST.x * exp(-max(X.y, 0.) / MIST.z) * smoothstep(.25, .85, n3(X * vec3(.11, .5, .11) + vec3(MIST.w, 0., MIST.w * .45)));
    vec3 v = X - TORCH.xyz; float dv2 = dot(v, v);
    float xb = 2. * max(1. - dot(v, TAX.xyz) * inversesqrt(dv2), 0.) / TCOL.w, B = exp(-xb / .016) + .07 * exp(-xb / .05);
    vec3 Ls = amb + TCOL.rgb * (TORCH.w * TAX.w * B / (dv2 + .5) * dv2 * dv2 / (dv2 * dv2 + 6.) * .0028) * smoothstep(40., 20., s);
    L += exp(-od) * rho * ds * Ls;
    od += rho * ds;
  }
  float t2 = min(tmax, 3000.);
  if (t2 > s1) {
    float y1 = CAM.y + rd.y * s1, y2 = CAM.y + rd.y * t2;
    // (cycle 2) the far layer lies in banks and wisps: its height and density vary with where the ray ends (thicker by the
    // banks and in the coves, thin in mid-river), so a far waterline is hidden in places, never ruled
    vec2 XE = CAM.xz + rd.xz * min(t2, 400.);
    float bk = smoothstep(.15, .5, abs(XE.x - xcen(XE.y)) / wid(XE.y)), wn = n2(XE * vec2(.045, .02) + MIST.w);
    float H = MIST.z * (.45 + 1.3 * wn) * (.5 + .7 * bk);
    float lay = abs(rd.y) > 1e-3 ? H / rd.y * (exp(-max(y1, 0.) / H) - exp(-max(y2, 0.) / H)) : exp(-max(y1, 0.) / H) * (t2 - s1);
    // the haze has a scale height (the zenith keeps its own colour) and takes the colour of the sky behind it
    float lah = abs(rd.y) > 1e-3 ? 350. / rd.y * (exp(-max(y1, 0.) / 350.) - exp(-max(y2, 0.) / 350.)) : t2 - s1;
    float odf = MIST.y * .5 * max(lah, 0.) + MIST.x * .5 * max(lay, 0.) * (.25 + 1.1 * bk) * (.4 + 1.2 * wn);
    L += exp(-od) * (mix(HZC.rgb, ZEN.rgb, smoothstep(0., .9, rd.y)) * .7 + fsc) * (1. - exp(-odf));
    od += odf;
  }
  tr = exp(-od);
  return L;
}
void main() {
  ivec2 fc = ivec2(gl_FragCoord.xy);
  vec3 rd = rayDir(gl_FragCoord.xy);
  uvec4 g = texelFetch(uG, fc, 0);
  bool water = ((g.z >> 8) & 1u) != 0u;
  float jit = hf(uint(fc.x) * 1973u + uint(fc.y) * 9277u + 13u);
  float tmax = 1e5;
  if (water) tmax = CAM.y / max(-rd.y, 1e-5);
  else if (float(g.z & 15u) > .5) tmax = unpackHalf2x16(g.x).x;
  float tr; vec3 ins = mistIn(rd, tmax, jit, tr);
  o = uvec2(packHalf2x16(ins.rg), packHalf2x16(vec2(ins.b, tr)));
}`,La=xt+qt+`
uniform usampler2D uG;
out uvec4 o;
// ---- what floats: leaf litter everywhere, water-lettuce rosettes in drifts along the banks (coverage, albedo, tilt)
float flot(vec2 xz, float fp, out vec3 fa, out vec2 tl) {
  float db = .5 * wid(xz.y) - abs(xz.x - xcen(xz.y));
  float cov = 0.; fa = vec3(0.); tl = vec2(0.);
  for (int k = 0; k < U0 + 2; k++) {
    float cs = k == 0 ? .5 : .32;
    vec2 q = xz;
    vec2 ci = floor(q / cs);
    uint h = hu(uint(int(ci.x) + 50000) * 73856093u ^ uint(int(ci.y) + 50000) * 19349663u ^ uint(k) * 0x9e3779b9u);
    float pr = k == 0 ? (.03 + .14 * exp(-db / 1.5)) * smoothstep(.3, .6, n2(xz * .23 + 7.)) : smoothstep(.56, .7, n2(xz * .1 + 40.)) * smoothstep(5., 1.5, db) * .7;
    if (hf(h) > pr) continue;
    vec2 f = q - (ci + .25 + .5 * vec2(hf(h + 1u), hf(h + 2u))) * cs;
    float an = hf(h + 3u) * 6.28, c = cos(an), sn = sin(an);
    f = vec2(c * f.x - sn * f.y, sn * f.x + c * f.y);
    float e;
    vec3 al;
    if (k == 0) {
      float Ll = .045 + .05 * hf(h + 4u), u = f.x / Ll * .5 + .5;
      float w = u > 0. && u < 1. ? Ll * .95 * pow(u, .6) * pow(1. - u, 1.3) : -1.;
      e = w - abs(f.y);
      al = mix(vec3(.07, .035, .014), vec3(.1, .075, .025), hf(h + 5u)) * (.7 + .6 * n2(f * 250.));
      tl = f * (1.5 + 3. * hf(h + 6u));
    } else {
      float r = length(f), ang = at2(f.y, f.x);
      float R = (.09 + .06 * hf(h + 4u)) * (.78 + .22 * cos(ang * 6. + hf(h + 5u) * 6.)) ;
      e = R - r;
      float vein = smoothstep(.75, 1., abs(sin(ang * 6. + hf(h + 5u) * 6. + 1.57)));
      al = vec3(.075, .11, .045) * (.8 + .4 * n2(f * 200.)) * (1. - .25 * vein) * (.7 + .3 * r / R);
      tl = f / max(R, .01) * .9;
    }
    float cv = clamp(e / max(fp, 1e-3) + .5, 0., 1.) * smoothstep(k == 0 ? .05 : .12, .01, fp);
    if (cv > cov) { cov = cv; fa = al; }
  }
  return cov;
}
void main() {
  o = uvec4(0u);
  uvec4 g = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
  if (((g.z >> 8) & 1u) == 0u) return;
  vec3 rd = rayDir(gl_FragCoord.xy);
  float tw = CAM.y / max(-rd.y, 1e-5);
  vec3 Pw = CAM.xyz + rd * tw;
  float fp = tw * PA / max(-rd.y, .03);
  vec3 fa; vec2 tl;
  float cv = flot(Pw.xz, fp, fa, tl);
  uvec3 a8 = uvec3(clamp(fa * 1800., 0., 255.));
  uvec2 t8 = uvec2(clamp(tl * 80. + 128., 0., 255.));
  o = uvec4(uint(cv * 65535.), a8.x | (a8.y << 8), a8.z | (t8.x << 8), t8.y);
}`,So=xt+qt+`
uniform sampler2D uD;
uniform usampler2D uG;
uniform vec4 uS;
out vec2 vq; out vec4 va; out vec4 vb;
#define TRE uC[27]
#define FFP uC[28]
float trB(float a) { return a < 0. ? 0. : a < .03 ? a / .03 : exp(-(a - .03) / .12); }
// (cycle 2) a firefly's flash, dim to peak: green as it fades, lemon-white at its peak (display values: the sprites add)
vec3 ffRamp(float x) {
  x = clamp(x, 0., 1.) * 6.;
  vec3 c = vec3(.145, .208, .059) * min(x, 1.);
  c = mix(c, vec3(.31, .416, .11), clamp(x - 1., 0., 1.));
  c = mix(c, vec3(.518, .635, .227), clamp(x - 2., 0., 1.));
  c = mix(c, vec3(.706, .8, .392), clamp(x - 3., 0., 1.));
  c = mix(c, vec3(.863, .91, .494), clamp(x - 4., 0., 1.));
  return mix(c, vec3(.933, .973, .635), clamp(x - 5., 0., 1.));
}
float ffQ(float a) { return a < 0. ? 0. : a < .06 ? a / .06 : exp(-(a - .06) / .15); }
float hsh(float n) { return fract(sin(n * 12.9898 + 4.1) * 43758.5453); }
void main() {
  int v = gl_VertexID, id = gl_InstanceID + int(uS.y);
#ifdef D6
  ivec2 dp = id < 1536 ? ivec2(id, 0) : ivec2(id - 1536, 3);
  vec4 a = texelFetch(uD, dp, 0), b = texelFetch(uD, dp + ivec2(0, 1), 0);
#else
  vec4 a = texelFetch(uD, ivec2(id, 0), 0), b = texelFetch(uD, ivec2(id, 1), 0);
#endif
  vec2 cr = vec2(v == 1 || v == 4 || v == 5 ? 1. : -1., v == 2 || v == 3 || v == 5 ? 1. : -1.);
  float m = b.w, hl = m > 99.5 && m < 199.5 ? m - 100. : 0.;
  bool tree = m > 2.5 && m < 6., bank = m > 19.5 && m < 99.5, dsh = m > 199.5;
  vec2 R = vec2(a.z * 3.2 + 1.);
  R.y += hl;
  // (cycle 2) a near flyer is drawn out along its motion while lit (a dash: its half length and angle in the mode)
  if (dsh) R.x += floor(mod(m, 100.)) * .1;
  vb = b;
  float st = 1.;
  vec2 dr = vec2(0.);
  // a light of the crown or the banks: its flash, then out in the beam, the exposure, the image's waver, the ramp
  if (tree || bank) {
    float f = fract(m), k;
    bool mir;
    if (tree) {
      // the crown's: drawn only where the G-buffer at the light's own point holds foliage at its distance (on the leaves
      // seen there, or its image in the water); a wave runs through the crown, each light flashing for a tenth of a second
      // when it reaches it (its share of the period), the period wandering; one light in ten on its own clock
      ivec2 ip = ivec2(a.xy);
      uvec4 g = texelFetch(uG, ip, 0);
      bool wtr = ((g.z >> 8) & 1u) != 0u;
      mir = m > 4.5;
      float gm = float(g.z & 15u), gt = unpackHalf2x16(g.x).x;
      vec3 rd = rayDir(vec2(ip) + .5);
      float dd = mir ? CAM.y / max(-rd.y, 1e-5) + gt : gt;
      bool ok = mir == wtr && (abs(gm - 1.) < .5 || abs(gm - 12.) < .5) && abs(dd - a.w) < 1.2 + a.w * .03;
      if (b.z > 0.) k = trB(mod(TIME + f * 7.3, b.z));
      else k = max(trB(TIME - TRE.x - f * 1.1 * TRE.z), trB(TIME - TRE.y - f * 1.1 * TRE.z));
      if (!ok) k = 0.;
    } else {
      // (cycle 2) the banks': placed once per view, each on its own wandering clock (mode: 20 + 2 habit + image, fract the
      // light's phase; b.x its peak on the ramp, b.y the image's stretch, b.z its period). Habits: 0 a quick single flash,
      // 1 a double, 2 a slow glower drifting on a curve, 3 a female glowing dimly on a leaf, 4 the bank in step (bursts of
      // quick flashes, then dark, passing along the bank patch by patch: fract is the patch's lag)
      float mm = m - 20., hab = floor(mm * .5), T = b.z;
      mir = mod(floor(mm), 2.) > .5;
      if (hab > 3.5) {
        float tl = TIME - FFP.y - f * FFP.w - T, L = FFP.z, n = floor(tl / L), s0 = (n + .3 * hsh(n)) * L;
        if (s0 > tl) { n -= 1.; s0 = (n + .3 * hsh(n)) * L; }
        float ab = tl - s0, fp = .42 + .06 * hsh(n + 7.), i = floor(ab / fp);
        ab -= i * fp;
        k = i < 5. + floor(4. * hsh(n + 3.)) && ab > 0. ? (ab < .05 ? ab / .05 : exp(-(ab - .05) / .17)) : 0.;
      } else if (hab > 2.5) k = .38 + .06 * sin(TIME * .9 + f * 40.);
      else {
        float p = TIME / T + f + .14 * sin(TIME * .41 + f * 31.) + .09 * sin(TIME * .23 + f * 57.), ab = fract(p) * T;
        k = hab < .5 ? ffQ(ab) : hab < 1.5 ? max(ffQ(ab), ffQ(ab - .4)) * .92 : pow(sin(3.14159 * min(ab / 1.6, 1.)), 2.);
        if (hab > 1.5) dr = vec2(sin(TIME * .5 + f * 20.), (mir ? -.6 : .6) * sin(TIME * .37 + f * 13.)) * uS.x * .005 * clamp(10. / a.w, .2, 1.);
      }
#ifdef DBGF
      k = 1.;
#endif
    }
    // the beam puts lights out
    vec3 P = CAM.xyz + rayDir(a.xy) * a.w; if (mir) P.y = -P.y;
    float bm = exp(-2. * max(1. - dot(normalize(P - TORCH.xyz), TAX.xyz), 0.) / TCOL.w / .016);
    k *= (1. - smoothstep(.05, .25, bm) * TAX.w) * clamp(pow(EXPO.x / 2.4, .4), 1., 1.35);
    // the image wavers with the ripple
    if (mir) { st = b.y * (1. + .3 * sin(TIME * 2.3 + f * 41.)); k *= .8 + .2 * sin(TIME * 3.1 + f * 67.); }
    float x = min(b.x * k, FFP.x);
    vb.rgb = ffRamp(x);
    R.y *= st;
    if (x < .02) R = vec2(0.);
  }
  vec2 off = cr * R;
  if (dsh) { float an = fract(m) * 3.14159; off = mat2(cos(an), sin(an), -sin(an), cos(an)) * off; }
  vec2 pp = a.xy + dr + off;
  gl_Position = R.x > 0. ? vec4(pp / uS.x * 2. - 1., 0., 1.) : vec4(2., 2., 2., 1.);
  vq = cr * R / vec2(1., st); va = a;
}`,Ga=xt+qt+`
uniform usampler2D uG;
uniform sampler2D uMW;
out vec4 o;
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
  float sg = pa * (.42 + .05 * min(b, 3.));
  if (EXPO.y > 0.) { sg = pa * .5; b = b / (1. + .8 * b) * 1.5; }
  vec3 sc = r.w < .1 ? vec3(.74, .85, 1.18) : r.w < .55 ? vec3(1., .99, .97) : r.w < .86 ? vec3(1.08, .96, .84) : vec3(1.2, .86, .6);
  return on * sc * b * (exp(-ang * ang / (2. * sg * sg)) + .018 * exp(-ang / (sg * 3.5)));
}
vec3 sky(vec3 d, float pa, bool rf) {
  float dy = d.y;
  d.y = max(d.y, .002); d = normalize(d);
  float e = d.y;
  float vr = 1. / sqrt(1. - .95 * (1. - e * e));
  vec3 c = mix(HZC.rgb, ZEN.rgb, smoothstep(0., .9, e));
  vec2 hd = normalize(d.xz + 1e-6), md = normalize(MOON.xz + 1e-6);
  c += SBD.rgb * exp(-e / SBD.w) * pow(.5 + .5 * dot(hd, md), 3.);
  vec2 pp = d.xz / (e + .09);
  float wv = .62 + .38 * sin(dot(pp, vec2(1.7, .6)) * 1.25 + AGL.z + 2.6 * n2(pp * .55 + 9.));
  c += (vec3(.0011, .0046, .0017) * AGL.x * vr * wv * (.6 + .7 * n2(pp * .22 + 30.)) * exp(-e / .2) * .4 + vec3(.0028, .0016, .0008) * exp(-e / .06) * AGL.y) * MCOL.w;
  vec3 g = vec3(dot(d, uC[4].xyz), dot(d, uC[5].xyz), dot(d, uC[6].xyz));
  float lat = asin(clamp(g.z, -1., 1.)), lon = at2(g.y, g.x);
  vec4 m = vec4(0.);
  if (abs(lat) < MWD.z) {
    m = textureLod(uMW, vec2(atan(lon / MWD.x) / (2. * MWD.y) + .5, lat / (2. * MWD.z) + .5), 0.);
    m.rgb = m.rgb * m.rgb * .26;
  }
  vec3 cel = m.rgb * MWD.w * ZEN.w;
  float pf = pow(min(1., .0013 / pa), .9);
  vec3 s = vec3(0.);
  int nl = int(EXPO.z);
  for (int i = 0; i < nl; i++) {
    float fi = float(i);
    s += starL(g, 36. * pow(2.36, fi), (i == 0 ? .22 : .38) - .05 * fi, (i == 1 ? .95 : 1.9) * pow(.27, fi), uint(i) * 977u + 11u, pa, m.a * 1.2 * fi) * pow(pf, min(fi, 2.));
  }
  cel += s * MCOL.w;
  // (in the water the moon is its path of glints, drawn by the composite, not a smeared copy of the disc and its glow)
  if (MOON.w > 0. && !rf) {
    // the moon: a disc with its seas and a darkened limb, and the glow round it
    // (a moon just risen is flattened by the air under it)
    float x = 2. * max(1. - dot(d, MOON.xyz), 0.), sx = sqrt(x), r2 = MOON.w * MOON.w;
    vec2 mu = vec2(dot(d, uC[25].xyz), dot(d, uC[26].xyz));
    float sf = dot(d, MOON.xyz) > 0. ? length(mu * vec2(1., 1. / mix(.84, 1., smoothstep(.06, .3, MOON.y)))) : 9.;
    float sea = .7 + .3 * smoothstep(.35, .65, n2(mu / MOON.w * 2.2 + 5.));
    cel += MCOL.rgb * NGT.y * smoothstep(MOON.w + pa * .7, MOON.w - pa * .7, sf) * (.55 + .45 * sqrt(max(1. - sf * sf / r2, 0.))) * sea;
    float hw = 1. + MIST.x * 30.;
    cel += MCOL.rgb * NGT.y * (.0025 * exp(-sx / (.03 * hw)) + .00035 * exp(-sx / (.3 * hw)));
  }
  if (PLAN.w > 0.) {
    float x = 2. * max(1. - dot(d, PLAN.xyz), 0.);
    float sg = pa * .75;
    cel += vec3(1., .95, .84) * PLAN.w * (exp(-x / (2. * sg * sg)) + .02 * exp(-sqrt(x) / (sg * 4.)));
  }
  float am = 1. / (e + .028);
  cel *= exp(-.11 * am * vec3(.55, .8, 1.35));
  c += cel;
  if (CLD.w > 0.) {
    // after rain, the hour after: the deck breaking, torn with soft edges, black against the stars and a shade paler at its edges
    vec2 cp = d.xz / (e + .12) * 2.2;
    float cn = n2(cp + 3.) * .65 + n2(cp * 2.7 + 9.) * .35;
    float th = .62 - .25 * CLD.w, cv = smoothstep(th - .075, th + .075, cn);
    c = mix(c, CLD.rgb * (1. + 2.2 * cv * (1. - cv) * 4.) * (1. + .6 * exp(-e / .15)), cv);
  }
  return c * smoothstep(-.06, 0., dy);
}
void main() {
  vec3 rd = rayDir(gl_FragCoord.xy);
  uvec4 g = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
  bool w = ((g.z >> 8) & 1u) != 0u;
  if (w) rd.y = -rd.y;
  vec3 c = sky(rd, PA, w);
  float h = hf(uint(gl_FragCoord.x) * 7717u + uint(gl_FragCoord.y) * 3343u + 5u) - .5;
  o = vec4(pow(clamp(c / 8., 0., 1.), vec3(1. / 3.)) + h / 1023., 1.);
}`,Xa=xt+qt+`
uniform usampler2D uG;
in vec2 vq; in vec4 va; in vec4 vb;
out vec4 o;
void main() {
  float m = vb.w, sg = va.z;
  bool dsh = m > 199.5, ffm = dsh || (m > 19.5 && m < 99.5);
  float hl = m > 99.5 && !dsh ? m - 100. : 0., hx = dsh ? floor(mod(m, 100.)) * .1 : 0.;
  vec2 q = vec2(max(abs(vq.x) - hx, 0.), max(abs(vq.y) - hl, 0.));
  float r2 = dot(q, q), Rm = sg * 3.2 + 1.;
  float I = (exp(-r2 / (2. * sg * sg)) + .05 * exp(-sqrt(r2) / (sg * 2.5))) * smoothstep(Rm, Rm * .7, sqrt(r2));
  if (m < 2.5 || m > 6.) {
    uvec4 g = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
    vec3 rd = rayDir(gl_FragCoord.xy);
    bool water = ((g.z >> 8) & 1u) != 0u, mir = (m > .5 && m < 1.5) || m > 299.5 || (m > 19.5 && m < 99.5 && mod(floor(m), 2.) > .5);
    float gm = float(g.z & 15u), t = unpackHalf2x16(g.x).x;
    float tw = CAM.y / max(-rd.y, 1e-5);
    float depth = water ? (mir ? (gm > .5 ? tw + t : 1e9) : tw) : (gm > .5 ? t : 1e9);
    if (mir && !water) discard;
    // (cycle 2) a firefly is never drawn on the sky or on the sky's image in the water, nor behind something nearer
    if (ffm && gm < .5) discard;
    if (depth < va.w - (ffm ? .3 + .02 * va.w : .3)) discard;
  }
  o = vec4(vb.rgb * I, 1.);
}`,Qt=(c,e,h)=>{const x=Math.max(0,Math.min(1,(h-c)/(e-c)));return x*x*(3-2*x)},U=(c,e,h)=>Math.max(e,Math.min(h,c)),at=c=>{const e=Math.hypot(c[0],c[1],c[2]);return[c[0]/e,c[1]/e,c[2]/e]},Mt=(c,e)=>c[0]*e[0]+c[1]*e[1]+c[2]*e[2],_t=(c,e)=>[c[1]*e[2]-c[2]*e[1],c[2]*e[0]-c[0]*e[2],c[0]*e[1]-c[1]*e[0]];let Nt;function Ha(c){if(c.__c552)return c.__c552;const e=c.getExtension("KHR_parallel_shader_compile");e&&e.maxShaderCompilerThreadsKHR&&e.maxShaderCompilerThreadsKHR(4294967295);const h=(g,_)=>{const G=c.createShader(g);return c.shaderSource(G,_),c.compileShader(G),G},x=(c.getParameter(c.MAX_TEXTURE_SIZE)|0)<3072,nt=(c.getParameter(c.MAX_3D_TEXTURE_SIZE)|0)<512,B=Na?So.replace(`#version 300 es
`,`#version 300 es
#define DBGF
`):So,Q=h(c.VERTEX_SHADER,Pa),Jt=h(c.VERTEX_SHADER,x?B.replace(`#version 300 es
`,`#version 300 es
#define D6
`):B);Nt=g=>xt+"#define MODE "+g+`
`+qt+Sa;const tt={g0:[Q,Nt(0)],env:[Q,nt?Nt(4).replace(`#define MODE 4
`,`#define MODE 4
#define E256
`):Nt(4)],g1:[Q,Nt(1)],g3:[Q,Nt(3)],g2:[Q,Nt(2)],comp:[Q,Ia],mst:[Q,Oa],mw:[Q,Ua],sky:[Q,Ga],fl:[Q,La],spr:[Jt,Xa]},Et={};for(const g in tt){const _=c.createProgram(),G=h(c.FRAGMENT_SHADER,tt[g][1]);c.attachShader(_,tt[g][0]),c.attachShader(_,G),c.linkProgram(_),Et[g]={p:_,f:G,v:tt[g][0]}}c.flush();let v=625341585;const gt=()=>(v=Math.imul(v^v>>>15,739982445),v=Math.imul(v^v>>>12,695872825),v^=v>>>15,v&255),b=new Uint8Array(64*64*64);for(let g=0;g<b.length;g++)b[g]=gt();const z=new Uint8Array(256*256*4);for(let g=0;g<z.length;g++)z[g]=gt();c.pixelStorei(c.UNPACK_ALIGNMENT,1);const pt=(g,_,G,k,j,st,L,me)=>{const xe=c.createTexture();return c.bindTexture(c.TEXTURE_2D,xe),c.texImage2D(c.TEXTURE_2D,0,G,g,_,0,k,j,me||null),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,st),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,st),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,L),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,L),xe},pe=pt(256,256,c.RGBA8,c.RGBA,c.UNSIGNED_BYTE,c.LINEAR,c.REPEAT,z),De=c.createTexture();c.bindTexture(c.TEXTURE_3D,De),c.texImage3D(c.TEXTURE_3D,0,c.R8,64,64,64,0,c.RED,c.UNSIGNED_BYTE,b),c.texParameteri(c.TEXTURE_3D,c.TEXTURE_MIN_FILTER,c.LINEAR),c.texParameteri(c.TEXTURE_3D,c.TEXTURE_MAG_FILTER,c.LINEAR);for(const g of[c.TEXTURE_WRAP_S,c.TEXTURE_WRAP_T,c.TEXTURE_WRAP_R])c.texParameteri(c.TEXTURE_3D,g,c.REPEAT);const et={uN:0,uN3:1,uG:2,uMW:3,uD:4,uPrev:6,uSk:7,uF:8,uEnv:9,uMs:10},Pt={},de=g=>{if(Pt[g])return Pt[g];const _=Et[g].p;if(!c.getProgramParameter(_,c.LINK_STATUS))throw new Error("552 "+g+": "+c.getShaderInfoLog(Et[g].f)+" "+c.getShaderInfoLog(Et[g].v)+" "+c.getProgramInfoLog(_));const G={p:_};Pt[g]=G;const k=c.getProgramParameter(_,c.ACTIVE_UNIFORMS);for(let j=0;j<k;j++){const st=c.getActiveUniform(_,j).name.replace("[0]","");G[st]=c.getUniformLocation(_,st)}c.useProgram(_);for(const j in et)G[j]&&c.uniform1i(G[j],et[j]);return G},ue=c.createVertexArray(),Ut={ready:de,tN:pe,tN3:De,vao:ue,tex2:pt,pool:{},tick:0,d6:x,ew:nt?256:512,mws:{},env:null,trees:new Map,ffc:new Map,mt:null};return c.__c552=Ut,Ut}Uo.add({num:552,name:"Night Canoe",fam:"Vistas",recipe:"The front of a dugout canoe on a rainforest river at night, mostly with no moon, with fireflies along the banks and the stars mirrored in the water. Where you drift and look, the lamp and how the fireflies flash change every mint. Drag to sweep your headtorch over the banks and catch the caiman eyes, tap the water to dip the paddle, or hold to switch the torch off so your eyes adjust and the stars blaze.",interactive:"Drag to sweep your headtorch across the banks (it lights wet leaves and roots, and caiman eyes flare back orange-red); tap the water to dip the paddle there (rings and swirls break the star mirror); hold to switch the torch off: your eyes adapt, the Milky Way blazes and the fireflies burn brighter (a mint that opens with the torch already off turns it on when you sweep).",music:!0,gl:!0,fps:30,seed:0,make(c){const e=c.gl,h=c.size,x=Ha(e),nt=x.ready,B=c.hash.slice(2).padEnd(64,"0");let Q=parseInt(B.slice(0,8),16)>>>0,Jt=parseInt(B.slice(8,16),16)>>>0,tt=parseInt(B.slice(16,24),16)>>>0,Et=parseInt(B.slice(24,32),16)>>>0;const v=()=>{const t=(Q+Jt|0)+Et|0;return Et=Et+1|0,Q=Jt^Jt>>>9,Jt=tt+(tt<<3)|0,tt=tt<<21|tt>>>11,tt=tt+t|0,(t>>>0)/4294967296};for(let t=0;t<16;t++)v();let gt=(parseInt(B.slice(32,40),16)^1540483477)>>>0;const b=()=>{gt=gt+1831565813|0;let t=Math.imul(gt^gt>>>15,1|gt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},z=!!c.home,pt=(t,o,a)=>{let n=0;for(const f of o)n+=f[1];let i=v()*n,r=o[o.length-1];for(const f of o)if(i-=f[1],i<0){r=f;break}return z&&(r=o[a]),c.trait(t,r[0]),r[2]},pe=pt("Drifting",[["Close to the bank",5,0],["Midstream",3,1],["Narrow channel",2,2],["Wide river",1,3]],0),De=pt("Forest",[["Mixed canopy",5,0],["Palm-lined",3,1],["Emergent giants",2,2],["Vine-hung",1,3]],0),et=pt("Fireflies",[["Synchronous tree",4,0],["Scattered",4,1],["Click beetles",1,2]],0),Pt=pt("Milky Way",[["Core rising",5,0],["Core high",3,1],["Band overhead",2,2]],0),de=pt("Mist",[["Faint",4,0],["Lying low",4,1],["Thick",1,2]],0),ue=pt("Caiman",[["One",3,0],["Two",4,1],["A pod",1,2]],1),Ut=pt("Planet",[["Jupiter",4,0],["None",3,1],["Venus low",1,2]],0);let g=(parseInt(B.slice(40,48),16)^795580989)>>>0;const _=()=>{g=g+1831565813|0;let t=Math.imul(g^g>>>15,1|g);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},G=[["Downriver",2],["Up through the gap",1]];let k=0;{let t=0;for(const a of G)t+=a[1];let o=_()*t;for(let a=0;a<G.length;a++)if(o-=G[a][1],o<0){k=a;break}z&&(k=0)}const j=!z&&_()<1/9;let st=(parseInt(B.slice(4,12),16)^parseInt(B.slice(36,44),16)^1779033703)>>>0;const L=()=>{st=st+1831565813|0;let t=Math.imul(st^st>>>15,1|st);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},me=t=>{let o=0;for(const n of t)o+=n[1];let a=L()*o;for(let n=0;n<t.length;n++)if(a-=t[n][1],a<0)return n;return t.length-1},xe=[["Moonless",44],["Moonlit",20],["Blue hour",15],["After rain",13],["Moonrise",8]];let N=me(xe);(z||j&&N===3)&&(N=0),N===3&&(N=1);const Io=[["Along the right bank",4],["Down the middle",3],["Straight up",2]],Ba=L(),Wa=me(Io);!z&&Ba<.64&&(k=2+Wa);let zt=(parseInt(B.slice(20,28),16)^parseInt(B.slice(52,60),16)^1013904242)>>>0;const w=()=>{zt=zt+1831565813|0;let t=Math.imul(zt^zt>>>15,1|zt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Qe=!z&&k<2&&w()<.5,Je=z||k>=2?0:Math.floor(w()*3),Oo=[["Warm",55],["Cold white",25],["Dim amber",20]];let vt=me(Oo);z&&(vt=0);const $t=L(),St=[L(),L(),L(),L(),L(),L()];N===4&&(k===1||k===4)&&(N=1);const ve=k===2?-1:1,W=t=>(v()-.5)*t,q=new Float32Array(48*4),T=(t,o,a,n,i)=>{q[t*4]=o,q[t*4+1]=a,q[t*4+2]=n,q[t*4+3]=i},Lo=[{W:40,dL:8},{W:46,dL:15},{W:22,dL:6},{W:72,dL:10}][pe],Ce=Lo.W*(1+(z?0:W(.15))),$e=Ce*(.12+v()*.1),to=v()*R,eo=14+v()*10,oo=.009+v()*.005,ao=4+v()*4,no=.023+v()*.01,so=v()*R,ro=(z?-.35:-.6+v()*.6)+(Qe?Math.PI:0),te=t=>Ce+$e*Math.sin(t*.013+to),Go=t=>eo*Math.sin(t*oo+ro)+ao*Math.sin(t*no+so),ja=Lo.dL*(1+(z?0:W(.2))),co=te(0)/2-(k===3?te(0)/2:k===4?3+2*St[2]:ja)-Go(0),It=t=>co+Go(t),I=(t,o,a,n)=>[It(n)+t*(o+te(n)/2),a,n];T(7,eo,oo,ro,ao),T(8,no,so,Ce,$e),T(9,co,to,0,0);const ee=[[13,.3,.25,.1,.5,.55,.6],[10,.25,.14,.62,.5,.45,.5],[13,.25,.6,.12,.5,.5,.7],[14,.4,.25,.2,.5,.85,.6]][De];T(13,ee[0]*(1+W(.2)),ee[1],ee[2],ee[3]),T(14,.62,ee[5],ee[6],0),T(34,Math.floor(v()*65536),0,0,0),T(41,1/1024,150/1024,1/52,2/52);const oe=Math.tan(33*Math.PI/180),ae=Math.atan2(It(95),95),dt=ae+(k===3?-.03:-.24)+(z?0:W(.1)),Va=.1+(z?0:W(.03)),p={p:[0,.85,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]};let ne="";const se={y:0,p:0},qe=t=>{const o=t?{}:c.view||_a;p.p=[U(o.x||0,-.25,.25),U(.85+(o.y||0),.6,1.2),U(o.z||0,-.6,.3)];const a=dt+se.y+(o.yaw||0),n=U(Va+se.p+(o.pitch||0),-1.35,1.35),i=Math.cos(n);p.fw=[Math.sin(a)*i,Math.sin(n),Math.cos(a)*i];const r=[Math.cos(a),0,-Math.sin(a)];p.up=_t(p.fw,r),p.rt=r.map(l=>l*ve),T(0,...p.p,oe),T(1,...p.fw,h),T(2,...p.rt,0),T(3,...p.up,2*oe/h);const f=p.p.join()+p.fw.join(),s=f!==ne;return ne=f,s},Ot=(t,o)=>{const a=t*2-1,n=1-o*2;return at([0,1,2].map(i=>p.fw[i]+(a*p.rt[i]+n*p.up[i])*oe))},F=t=>{const o=[t[0]-p.p[0],t[1]-p.p[1],t[2]-p.p[2]],a=Mt(o,p.fw);if(a<.15)return null;const n=Mt(o,p.rt)/(a*oe),i=Mt(o,p.up)/(a*oe);return Math.abs(n)>1.1||Math.abs(i)>1.1?null:[(n*.5+.5)*h,(i*.5+.5)*h,Math.hypot(...o)]};qe(!0);const io=2.35,fo=-3.6,Xo=(io-fo)/2,Ho=(io+fo)/2,lo=t=>{const o=U(Math.abs(t-Ho)/Xo,0,1);return .33*Math.pow(Math.max(1-Math.pow(o,2.6),0),.55)+.006},Bo=t=>.21+.14*Qt(.62,1,Math.abs(t-Ho)/Xo)+.01*Math.sin(t*2.3),be=dt+.09+(z?0:W(.1));T(15,io,fo,be,0);const Wo=t=>[t[0]*Math.cos(be)+t[2]*Math.sin(be),t[1],-t[0]*Math.sin(be)+t[2]*Math.cos(be)],ye=1.6+(z?0:W(.1)),jo=Bo(ye)-.012,Ka=lo(ye)+.02;T(38,ye,jo,Ka,0);const Vo=z||v()<.7?1:-1,ho=.3+(z?0:W(.2)),bt=[Vo*(lo(ho)-.028),Bo(ho)+.016,ho],po=[Vo*(lo(ye)-.09),jo+.025+.012,ye],re=at([po[0]-bt[0],po[1]-bt[1],po[2]-bt[2]]),Za=[bt[0]-re[0]*.05,bt[1]-re[1]*.05,bt[2]-re[2]*.05],Ya=[bt[0]+re[0]*1.02,bt[1]+re[1]*1.02,bt[2]+re[2]*1.02];T(16,...Wo(Za),0),T(17,...Wo(Ya),.56);const Ko=18+16*St[3],Zo=[1,2,4][ue],ce=[];let ie=12;{const t=dt-.27+(z?0:W(.1));for(let o=8;o<70;o+=.5){const a=I(-1,-1.5,0,o);if(ie=o,Math.atan2(a[0],a[2])>=t)break}}const Yo=(t,o,a)=>{const n=I(t,a,0,o),i=Math.atan2(p.p[0]-n[0],p.p[2]-n[2])+W(.7),r=.85+v()*.5;ce.push({x:n[0],z:n[2],yaw:i,sc:r})};Yo(-1,ie,-1.3-v()*.6);for(let t=1;t<Zo;t++){const o=ue===2?t<3?-1:1:v()<.5?-1:1,a=ue===2&&t<3?ie+2.5*t+W(1.5):(o<0?ie+8+v()*20:12+v()*30)*(v()<.25?-1:1);Yo(o,a,-1.1-v()*1.2)}T(43,-1,ie-4.6+(z?0:((parseInt(B.slice(56,64),16)>>>0)/4294967296-.5)*4),0,0);const uo=[],Qa=()=>{uo.length=0,ce.forEach((t,o)=>T(30+o,t.x,t.z,t.yaw,t.sc));for(const t of ce)for(const o of[-1,1]){const a=o*.043*t.sc,n=.018*t.sc,i=-.085*t.sc,r=Math.cos(t.yaw),f=Math.sin(t.yaw);uo.push([t.x+a*r+i*f,n,t.z-a*f+i*r])}};z||(v(),v());for(let t=0;t<17;t++)v();const J=[L(),L(),L(),L()];let we=0,mo=0,Qo=J[0]<.5?-1:1;if(N===4){we=ae+Qo*(.18+.34*Math.abs(J[0]-.5));const t=Math.sin(we),o=Math.cos(we);let a=400;for(let n=2;n<400;n+=2){const i=t*n,r=o*n;if(Math.abs(i-It(r))>te(r)/2){a=n;break}}mo=Math.atan2(q[13*4]+5,a)+.06+.05*J[1],mo>.36&&(N=1)}const Rt=[[[.0042,.0052,.0074,0],[.0022,.0028,.0052,1],[0,0,0,.1],[0,0,0,1],[0,0,0,0],[0,0,0,0],[.0066,.0079,.0114,260],2.4],[[.02,.027,.042,0],[.008,.013,.03,.15],[.007,.008,.009,.14],[.86,.92,1,.4],[0,0,0,0],[1.3,40,.25,0],[.008,.011,.017,220],1.5],[[.07,.068,.09,0],[.012,.026,.075,.15],[.16,.07,.028,.09],[.45,.55,.8,.1],[0,0,0,0],[J[3]<.5?0:.06,0,.1,0],[.03,.042,.055,230],.85],[[.0042,.005,.0068,0],[.0021,.0026,.0048,.9],[0,0,0,.1],[0,0,0,1],[9e-4,.001,.0012,.55+.25*J[3]],[0,0,.8,0],[.0066,.0079,.0114,220],2.4],[[.005,.0055,.0072,0],[.0022,.0028,.0052,.6],[.032,.014,.004,.07],[1,.48,.18,.8],[0,0,0,0],[.3,1.5,0,0],[.007,.0076,.01,240],2.4]][N],_e=(t,o)=>[Math.sin(t)*Math.cos(o),Math.sin(o),Math.cos(t)*Math.cos(o)];let Z=[0,1,0],Te=0;N===1&&(Z=J[2]<.5?_e(ae+(J[0]-.35)*.7,.3+.32*J[1]):_e(dt+Math.PI+(J[0]-.5)*2.2,.55+.35*J[1]),Te=.0062),N===2&&(Z=_e(ae+(J[0]-.5)*1.6+(J[3]<.5?0:Math.PI),-.12)),N===4&&(Z=_e(we,mo),Te=.0105),T(18,...Rt[0]),T(23,...Rt[1]),T(24,...Rt[2]),T(36,...Rt[3]),T(37,...Rt[4]),T(44,...Rt[5]),T(46,...Rt[6]),T(45,...Z,Te);{const t=at(_t(Z,[0,1.0001,0])),o=_t(t,Z);T(25,...t,0),T(26,...o,0)}const Ja=Rt[7],Jo=[[.3,.32],[.62,.2],[1.15,.55]][Pt],Me=z?0:W(.3),$o=z?0:W(.08);let kt=ae+.04+Me,Ee=Jo[0]+$o;if(Je===1&&(kt=dt+(Qe?.5:-.5)+Me*.5,Ee+=.08),Je===2&&Pt===0&&(kt=dt+(Qe?-.3:.3)+Me*.5,Ee=.13+$o*.5),N===4&&(kt=we-Qo*(.42+Math.abs(Me))),N===2&&J[3]<.5){const t=Math.atan2(Z[0],Z[2]);kt=t+(t>ae?-.75:.75)+Me*.3}const xo=[Math.sin(kt)*Math.cos(Ee),Math.sin(Ee),Math.cos(kt)*Math.cos(Ee)],ta=at([Math.cos(kt),0,-Math.sin(kt)]),$a=at(_t(ta,xo)).map(t=>t),ea=(Je===2&&Pt===0?-1.3:-Jo[1])+(z?0:W(.4));let ge=at([0,1,2].map(t=>$a[t]*Math.cos(ea)+ta[t]*Math.sin(ea)));ge[1]<0&&(ge=ge.map(t=>-t));const t0=_t(xo,ge);T(4,...xo,0),T(5,...ge,0),T(6,...t0,0);const rt=h>=600?1536:768,vo=h>=600?768:384,Ne=1,oa=.55;if(T(22,Ne,Math.atan(Math.PI/Ne),oa,1),T(20,.8+v()*.6,.4+v()*.5,v()*R,0),Ut!==1){const t=Ut===2?dt+.55+W(.3):dt-.05+W(.5),o=Ut===2?.1+v()*.05:.42+v()*.25;T(21,Math.sin(t)*Math.cos(o),Math.sin(o),Math.cos(t)*Math.cos(o),Ut===2?5.5:2.2)}const bo=[[.005,2e-4,.5],[.012,3e-4,.75],[.03,6e-4,1.2]][de],aa=N===3?1.7:1;T(19,bo[0]*aa,bo[1]*aa,bo[2],0),T(35,N===1?.005:.0025,N===1?.011:.006,0,0),T(12,2.4,h<600?1:0,4,0),T(29,2,0,Zo,0);const Pe=()=>[p.p[0]+p.up[0]*.1,p.p[1]+p.up[1]*.1,p.p[2]+p.up[2]*.1];k===1&&(se.y=(_()-.5)*.2,se.p=.33+(_()-.5)*.08),k===4&&(se.y=-.35-.35*St[0],se.p=.85+.2*St[1]),k&&qe(!0);const na=[2400,1e4,650],fe=Pe(),Lt=[],Gt=(t,o,a)=>{const n=F(o);if(!n)return;const i=n[0]/h,r=1-n[1]/h;i<.05||i>.95||r<.08||r>.92||Lt.push({k:t,s:[i,r],d:Math.hypot(o[0]-fe[0],o[1]-fe[1],o[2]-fe[2]),w:o,cw:a})};Gt(0,I(-1,-.6,1.6,ie+.7),null);{const t=I(1,-.5,1.4,Ko+.5),o=F(t);o&&o[0]/h>.55&&o[0]/h<.9&&Gt(1,t,I(1,-1.3,0,Ko))}if(!Lt.length)for(let t=14;t<60&&!Lt.length;t+=2)for(const o of[1,-1]){const a=I(o,-.5,1.4,t),n=F(a);if(n&&n[0]/h>.12&&n[0]/h<.88&&n[2]<56){Gt(1,a,I(o,-1.3,0,t-.5));break}}for(const t of[.52,.6])for(const o of[.15,.85,.24,.76,.33,.67]){const a=Ot(o,t);let n=null;for(let i=2;i<15&&!n;i+=.25){const r=[p.p[0]+a[0]*i,p.p[1]+a[1]*i,p.p[2]+a[2]*i];r[1]>.3&&Math.abs(r[0]-It(r[2]))>te(r[2])/2+.3&&(n=r)}if(n&&Math.hypot(n[0]-fe[0],n[1]-fe[1],n[2]-fe[2])>4){const i=n[0]>It(n[2])?1:-1;Gt(5,n,Math.hypot(n[0]-p.p[0],n[2]-p.p[2])>7?I(i,-1.3,0,n[2]):null);break}}for(const t of[-1,1])for(let o=2;o<18;o+=1.5){const a=I(t,-2.2,6.5,o),n=F(a);if(n&&n[2]<12){Gt(6,a,null);break}}{const t=Ot(.5+(St[4]-.5)*.4,.72);if(t[1]<-.05){const o=p.p[1]/-t[1];Gt(3,[p.p[0]+t[0]*o,0,p.p[2]+t[2]*o],null)}}de>0&&Gt(2,[It(70),1.1,70],null);const yo=(t,o)=>na[o]/(t.d*t.d),sa=(t,o)=>t.k===2?o!==2:yo(t,o)>=(t.k===0&&k<2?1.2:4)&&(t.k!==1||o===1),e0=t=>t.k===0||t.k===1||t.k===5||t.k===6,ra=[3,3,2,1,0,3,2],wo=(t,o)=>{const a=Lt.filter(f=>sa(f,t)&&(!o||e0(f)));if(!a.length)return null;const n=a.find(f=>f.k===0);if(k<2&&n){const f=a.filter(s=>(s.k===5||s.k===6)&&yo(s,t)>=yo(n,t));return $t<.5||!f.length?n:f[Math.floor(($t-.5)*2*f.length)]}if(t===1){const f=a.find(s=>s.k===1);if(f&&$t<.6)return f}let i=0;for(const f of a)i+=ra[f.k];let r=$t*i;for(const f of a)if(r-=ra[f.k],r<0)return f;return a[a.length-1]};let X=null;if(z)X=Lt.find(t=>t.k===0);else if(k===4)X={k:4,s:[.5+(St[4]-.5)*.3,.42],d:8,w:null,cw:null};else if(X=wo(vt,!0),X)$t<.2&&k>=2&&Lt.some(t=>t.k===2&&sa(t,vt))&&(X=Lt.find(t=>t.k===2));else{const t=wo(vt,!1);t&&(vt===2||$t<.5)?X=t:(X=wo(1,!0),X?vt=1:X=t)}X||(X={k:0,s:k===1?[.3,.35]:[.3,.55],d:21,w:null,cw:null});const Xt=X.s;if(X.cw){const t=X.cw;ce[0].x=t[0],ce[0].z=t[2],ce[0].yaw=Math.atan2(p.p[0]-t[0],p.p[2]-t[2])+(St[5]-.5)*.7}Qa(),c.trait("Looking",k<2?G[k][0]:Io[k-2][0]),c.trait("Headtorch",j?"Off, eyes adapted":Oo[vt][0]),c.trait("Night",xe[N][0]),qe();const ca=Math.min(na[vt],40*X.d*X.d);T(47,...[[1,.9,.76,1],[.84,.93,1.1,.45],[1,.58,.26,1.4]][vt]);const ut=[],Ue=z?-1:v()<.5?1:-1;let ia=40;{const t=Ue>0?dt+.28:dt-.3;for(let o=10;o<160;o+=1){const a=I(Ue,-2.5,0,o);if(ia=o,Ue>0?Math.atan2(a[0],a[2])<=t:Math.atan2(a[0],a[2])>=t)break}}const Se=et===0?[9,64,5,0]:et===1?[22,0,8,0]:[12,0,6,4],le=(t,o,a,n,i,r)=>ut.push({kind:t,s:o,u:a,y:n,z:i,T:r,ph:b(),last:-9,last2:-9,inhib:0,w:[b()*R,b()*R,b()*R],f:[.03+.07*b(),.04+.06*b(),.03+.06*b()],A:t===3?[2.5,.8,3]:t===1?[.25,.2,.25]:[1,.5,1.6],p:[0,0,0],b:0});for(let t=0;t<Se[0];t++){const o=v()<.5?-1:1;le(0,o,-4+v()*2.4,.4+v()*3,-20+v()*80,2.6+v()*3.5)}for(let t=0;t<Se[1];t++)le(1,Ue,-2.6+v()*2.4,.7+v()*4.5,ia-2+v()*40,.9*(1+W(.06)));for(let t=0;t<Se[2];t++){const o=v()<.5?-1:1;le(2,o,-3.8+v()*2.2,.5+v()*2.5,(v()*1.2-.2)*50,3+v()*3)}for(let t=0;t<Se[3];t++){const o=v()<.5?-1:1;le(3,o,-3+v()*2,1+v()*3,6+v()*40,1)}if(et===2)for(let t=0;t<14;t++){const o=_()<.5?-1:1;le(3,o,-4.5+_()*3,.5+_()*3,-6+_()*50,1)}if(et===2)for(let t=0;t<44;t++){const o=L()<.5?-1:1;le(3,o,-7+L()*8,.3+L()*3.2,-10+L()*60,1)}for(const t of ut)t.kind===3&&(t.v=(.5+.9*b())*(b()<.5?-1:1),t.A=[.25,.06,24],t.f=[.02,.5,0]);const At=[],ct={key:"",n:0};let Ht=1.3,To=0;if(et===0){for(let n=ut.length-1;n>=0;n--)ut[n].kind===1&&ut.splice(n,1);const t=Ot(Xt[0],Xt[1]),o=[],a=Te>0?F([p.p[0]+Z[0]*1e4,p.p[1]+Z[1]*1e4,p.p[2]+Z[2]*1e4]):null;for(const n of[-1,1])for(const i of[6,10])for(let r=4;r<120;r+=3){const f=I(n,-.6,i,r),s=F(f);if(!s)continue;const l=s[0]/h,d=1-s[1]/h;if(l<.12||l>.88||d<.1||d>.8||s[2]<12||s[2]>35)continue;const u=at([f[0]-p.p[0],f[1]-p.p[1],f[2]-p.p[2]]);Math.acos(U(Mt(u,t),-1,1))<.2+5/s[2]||a&&Math.abs(l-a[0]/h)<.08+3/(s[2]*oe)||o.push([n,r,i,s[2]])}if(o.length){o.sort((u,m)=>u[3]-m[3]);const n=o[Math.floor(w()*w()*o.length)],i=q[13*4]+4,r=U(n[2]+1,4,i-3),f=Math.min(4,r-1.5),s=4.5+2*w(),l=[Ce,$e,to,eo,oo,ao,no,so,ro,co,i,zt].concat(n.slice(0,3)).join(),d=x.trees.get(l);if(d){for(const u of d.T)At.push(u);zt=d.y0}else{const u=w()*R,m=Math.cos(u),M=Math.sin(u),D=.4,A=36,E=44,C=72,H=new Int16Array(A*E*C),S=new Float32Array(2700);for(let ft=0;ft<2400&&At.length<900;ft++){const $=(w()+w()+w()-1.5)*.96,wt=(w()+w()+w()-1.5)*.96,ot=(w()+w()+w()-1.5)*.96;if(w()>(1-.7*Qt(.2,1,wt))*(.55+.45*Qt(.6,-.6,$)))continue;const jt=.8+$*4.5,Vt=r+wt*f*1.4,Kt=n[1]+ot*s*1.4,lt=Math.floor($*4.5/D)+A/2,Tt=Math.floor(wt*f*1.4/D)+E/2,Ct=Math.floor(ot*s*1.4/D)+C/2;if(lt<1||Tt<1||Ct<1||lt>A-2||Tt>E-2||Ct>C-2)continue;let Zt=!1;for(let Fe=-1;Fe<2&&!Zt;Fe++)for(let Yt=-1;Yt<2&&!Zt;Yt++)for(let Po=-1;Po<2;Po++){const Ye=H[((lt+Fe)*E+Tt+Yt)*C+Ct+Po];if(!Ye)continue;const Da=S[Ye*3]-jt,Ca=S[Ye*3+1]-Vt,qa=S[Ye*3+2]-Kt;if(Da*Da+Ca*Ca+qa*qa<.16){Zt=!0;break}}if(Zt||H[(lt*E+Tt)*C+Ct])continue;const ht=At.length+1;H[(lt*E+Tt)*C+Ct]=ht,S[ht*3]=jt,S[ht*3+1]=Vt,S[ht*3+2]=Kt;const Ae=w()<.1?.5+.4*w():0,Ze=ot*m+wt*M+.12*w();At.push({p:I(n[0],jt,Vt,Kt),lag:Ae?w():Ze,own:Ae,br:.55+.6*w()})}const K=At.filter(ft=>!ft.own).sort((ft,$)=>ft.lag-$.lag);K.forEach((ft,$)=>{ft.lag=($+.5)/K.length*.96}),x.trees.set(l,{T:At.slice(),y0:zt}),x.trees.size>8&&x.trees.delete(x.trees.keys().next().value)}Ht=.62+.23*w(),To=w()*Ht}else{c.trait("Fireflies","Synchronous, along the bank");for(let n=0;n<13;n++){const i=w()<.5?-1:1;ut.push({kind:0,s:i,u:-4+w()*2.4,y:.4+w()*3,z:-20+w()*80,T:2.6+w()*3.5,ph:w(),last:-9,last2:-9,inhib:0,w:[w()*R,w()*R,w()*R],f:[.03+.07*w(),.04+.06*w(),.03+.06*w()],A:[1,.5,1.6],p:[0,0,0],b:0})}}}if(et===0){const t=Ot(Xt[0],Xt[1]);for(let o=0,a=0;o<300&&a<20;o++){const n=w()<.5?-1:1,i=p.p[2]-4+34*w(),r=I(n,-.2-2.6*w(),.15+1.9*Math.pow(w(),1.4),i),f=F(r);if(!f||f[2]<4||f[2]>25)continue;const s=at([r[0]-p.p[0],r[1]-p.p[1],r[2]-p.p[2]]);Math.acos(U(Mt(s,t),-1,1))<.09||(ut.push({kind:4,s:n,u:r[0],y:r[1],z:r[2],ph:w()*R,T:1.8+2.6*w(),glow:w()<.33,w:[w()*R,w()*R,w()*R],f:[.05,.07,.04],A:[.05,.04,.06],p:r,b:0,inhib:0,dc:f[2]}),a++)}}ut.length=0;let ze=(parseInt(B.slice(12,20),16)^parseInt(B.slice(56,64),16)^1359893119)>>>0;const y=()=>{ze=ze+1831565813|0;let t=Math.imul(ze^ze>>>15,1|ze);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Mo=N===1||N===4,Ie=pe===1||pe===3,yt=de===2,o0=et===0&&!At.length,Eo=Mo?.74:1,a0=et===2?.5:1;T(28,Eo,y()*40,8+1.5*y(),60);const n0=[3.5+1.5*y(),3.5+1.5*y()],fa=Te>0?F([p.p[0]+Z[0]*1e4,p.p[1]+Z[1]*1e4,p.p[2]+Z[2]*1e4]):null,s0=fa?fa[0]/h:-9,r0=Ot(Xt[0],Xt[1]),Oe=F([It(170),0,170]),c0=Oe?Oe[0]/h:-9,i0=Oe?1-Oe[1]/h:-9,la=(t,o,a)=>t>.01&&t<.99&&o>.01&&o<.99&&Math.abs(t-s0)>.12&&Math.hypot(t-c0,o-i0)>.045&&Mt(a,r0)<.975,go=[],f0=Ie?2+(y()<.5?1:0):z?4:4+Math.floor(y()*5);for(let t=0;t<f0;t++){const o=t===0,a=y()<.55?2:y()<.5?0:1,n=a===2?2.4+1.8*y():1.5+1.4*y(),i=y(),r=o?[.35,.06,.4]:[.5+.7*y(),.12+.2*y(),.5+.7*y()],f=[.2+.25*y(),.3+.3*y(),.17+.22*y()],s=[y()*R,y()*R,y()*R,y()*R];for(let l=0;l<24;l++){const d=I(y()<.5?-1:1,-1-2*y(),o?.2+.3*y():.4+(k===4?9:3)*y(),p.p[2]+3+70*y()*y()),u=F(d),m=o?2.4+1.4*y():2.5+5.5*y();if(!u||u[2]<m/.7)continue;const M=u[0]/h,D=1-u[1]/h,A=at([d[0]-p.p[0],d[1]-p.p[1],d[2]-p.p[2]]),E=[p.p[0]+A[0]*m,p.p[1]+A[1]*m,p.p[2]+A[2]*m];if(!(M<.06||M>.94||D<.08||D>.9||E[1]<.2+r[1]||E[1]>3.2||!la(M,D,A))){go.push({b:E,A:r,w:f,o:s,hab:a,T:n,ph:i,inhib:0});break}}}const ha=[];if(et===2)for(let t=0;t<20;t++)ha.push({s:y()<.5?-1:1,u:-3.6+3*y(),y:1+1.2*y(),z:-4+64*y(),v:(.4+.7*y())*(y()<.5?-1:1),w:[y()*R,y()*R,y()*R],k:.52+.12*y()});const pa=c.hash+"|"+(z?1:0)+"|"+p.p.join()+p.fw.join();let Re=x.ffc.get(pa);if(!Re){Re=[];const t=[],o=(r,f)=>{for(const[s,l]of r){const d=Math.floor(s/.04)+1,u=Math.floor(l/.04)+1,m=t[u*27+d];if(m&&m.length>=f)return!1;for(let M=-1;M<2;M++)for(let D=-1;D<2;D++)for(const A of t[(u+M)*27+d+D]||[])if(Math.abs(A[0]-s)<.006&&Math.abs(A[1]-l)<.006)return!1}for(const s of r){const l=(Math.floor(s[1]/.04)+1)*27+Math.floor(s[0]/.04)+1;(t[l]||(t[l]=[])).push(s)}return!0},a=(r,f,s,l)=>{const d=[];for(const u of[-1,1])for(let m=-10;m<160;m+=2){const M=F(I(u,-1,k===4&&!l?8:1.2,m+1));M&&M[2]>f-5&&M[2]<s+5&&d.push([u,m])}if(d.length)for(let u=0,m=0;u<r*5&&m<r;u++){const M=d[Math.floor(y()*d.length)],D=M[0],A=M[1]+2*y(),E=y(),C=y(),H=y(),S=y(),K=y(),ft=y();let $,wt;N===2?($=-3+2.7*S,wt=.1+1.3*K*K):(l?ft<.08:k===4||ft<.15)?($=-2.5+3*S,wt=l?3+5*K:k===4?6+9*K:4+4*K):($=l?-5+4.2*S:-4+4.5*S,wt=l?.15+2.85*Math.pow(K,1.3):.2+3.8*Math.pow(K,1.4));const ot=I(D,$,wt,A),jt=ot[0]-p.p[0],Vt=ot[1]-p.p[1],Kt=ot[2]-p.p[2],lt=Math.sqrt(jt*jt+Vt*Vt+Kt*Kt);if(lt<f||lt>s)continue;const Tt=F(ot);if(!Tt)continue;const Ct=Tt[0]/h,Zt=1-Tt[1]/h;if(!la(Ct,Zt,[jt/lt,Vt/lt,Kt/lt]))continue;const ht=!l&&E<.125?3:o0&&E>.25?4:E<.42?0:E<.6?1:2,Ae=$<.4&&!yt,Ze=[[Ct,Zt]];if(Ae){const Yt=F([ot[0],-ot[1],ot[2]]);Yt&&Ze.push([Yt[0]/h,1-Yt[1]/h])}if(!o(Ze,ht===4?4:5))continue;const Fe=ht===4?(Math.floor((A+200)/3.2)*3.2/n0[D>0?0:1]+(D>0?0:17))%60/60:H;Re.push({p:ot,hab:ht,ph:Fe,T:ht===4?.05*C:ht===0?2+2.5*C:ht===1?2.8+2.4*C:2.4+2*C,br:.82+.28*H,wet:Ae,far:l}),m++}},n=k===4||yt&&!Ie?0:Ie?yt?160:300:Math.round(200*(Mo?.5:1)),i=Math.round((k===2?360:Ie?60:300)*(Mo?.5:1));a(i,8,yt?25:30,!1),a(n,30,yt?60:j?140:120,!0),x.ffc.set(pa,Re),x.ffc.size>8&&x.ffc.delete(x.ffc.keys().next().value)}const it=3072,Ft=512,O=new Float32Array(it*3*4),da=[];let zo=0;const l0=[],Ro=c.hash+"|"+h+"|"+(z?1:0),g0={};let P=null;const h0=()=>{const t=x.pool[h]||(x.pool[h]=[]);let o=t.find(a=>a.key===Ro);if(!o){if(t.length<(h>=600?1:3)){o={tG:x.tex2(h,h,e.RGBA16UI,e.RGBA_INTEGER,e.UNSIGNED_SHORT,e.NEAREST,e.CLAMP_TO_EDGE,null),fbG:e.createFramebuffer(),tG2:x.tex2(h,h,e.RGBA16UI,e.RGBA_INTEGER,e.UNSIGNED_SHORT,e.NEAREST,e.CLAMP_TO_EDGE,null),fbG2:e.createFramebuffer(),tS:x.tex2(h,h,e.RGB10_A2,e.RGBA,e.UNSIGNED_INT_2_10_10_10_REV,e.NEAREST,e.CLAMP_TO_EDGE,null),fbS:e.createFramebuffer(),tD:x.d6?x.tex2(it/2,6,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,null):x.tex2(it,3,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,null)},x.mws[rt]||(x.mws[rt]={t:x.tex2(rt,vo,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE,null),fb:e.createFramebuffer(),key:""});const a=x.mws[rt];for(const[n,i]of[[o.fbG,o.tG],[o.fbG2,o.tG2],[o.fbS,o.tS],[a.fb,a.t]])e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0);x.env||(x.env={t:e.createTexture(),fb:e.createFramebuffer(),key:""},e.bindTexture(e.TEXTURE_3D,x.env.t),e.texImage3D(e.TEXTURE_3D,0,e.RG8,x.ew,52,38,0,e.RG,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE)),e.bindFramebuffer(e.FRAMEBUFFER,null),t.push(o)}else o=t.reduce((a,n)=>a.use<=n.use?a:n);o.key=Ro,o.g=""}P=o},Bt=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(x.vao)},ua=()=>{e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,x.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,x.tN3),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,P.tG),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,x.mws[rt].t),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,P.tD),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,P.tS),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,P.tG2)},Le=[v()*200,v()*200,z?1.05:.85+v()*.35],ma=Le.join()+"|"+rt,p0=()=>{const t=x.mws[rt];t.key=ma,e.bindFramebuffer(e.FRAMEBUFFER,t.fb),e.viewport(0,0,rt,vo),Bt();const o=nt("mw");e.useProgram(o.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,x.tN),e.uniform4f(o.uM,Le[0],Le[1],Le[2],rt),e.uniform4f(o.uM2,vo,Ne,oa,Math.atan(Math.PI/Ne)),e.drawArrays(e.TRIANGLES,0,3)},xa=()=>{let t="";for(const o of[7,8,9,13,34,41])t+=q[o*4]+","+q[o*4+1]+","+q[o*4+2]+","+q[o*4+3]+";";return t},d0=()=>{const t=nt("env");e.useProgram(t.p),e.activeTexture(e.TEXTURE9),e.bindTexture(e.TEXTURE_3D,null),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,x.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,x.tN3),x.env.key=xa(),e.bindFramebuffer(e.FRAMEBUFFER,x.env.fb),e.viewport(0,0,x.ew,52),Bt();for(let o=0;o<38;o++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,x.env.t,0,o),q[42*4]=o+.5-16,e.uniform4fv(t.uC,q),e.drawArrays(e.TRIANGLES,0,3);e.bindFramebuffer(e.FRAMEBUFFER,null)},u0=()=>{P.g=ne,e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,x.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,x.tN3);for(const[a,n,i]of[["g0",P.fbG2,null],["g1",P.fbG,P.tG2],["g3",P.fbG2,P.tG],["g2",P.fbG,P.tG2]]){const r=nt(a);e.bindFramebuffer(e.FRAMEBUFFER,n),e.viewport(0,0,h,h),Bt(),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,i),e.activeTexture(e.TEXTURE9),e.bindTexture(e.TEXTURE_3D,x.env.t),e.useProgram(r.p),e.uniform4fv(r.uC,q),e.drawArrays(e.TRIANGLES,0,3)}e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,P.fbG2),e.viewport(0,0,h,h),Bt(),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,P.tG);const t=nt("fl");e.useProgram(t.p),e.uniform4fv(t.uC,q),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,P.fbS),e.viewport(0,0,h,h),Bt(),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,P.tG),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,x.mws[rt].t);const o=nt("sky");e.useProgram(o.p),e.uniform4fv(o.uC,q),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.flush()},va=()=>{(!P||P.key!==Ro)&&h0(),P.use=++x.tick,P.g!==ne&&(x.mws[rt].key!==ma&&p0(),x.env.key!==xa()&&d0(),u0())},m0=(t,o,a)=>{const n=new Uint32Array(4*a);e.bindFramebuffer(e.FRAMEBUFFER,P.fbG);try{e.readPixels(t,o,1,a,e.RGBA_INTEGER,e.UNSIGNED_INT,n)}catch{n.fill(0)}return e.bindFramebuffer(e.FRAMEBUFFER,null),n};let mt=j?0:1,Ge=j?1:0,V=null,Xe=!1,ko=Xt.slice(),Ao=0,ba=3+b()*6,Fo=1+b()*2,ya=6+b()*10,wa=.5,x0=0;const ke=(t,o,a,n)=>{da[zo%12]=[t,o,a,n],zo++},Y=c.sound||{on:!1,hit(){},note(){},pcm(){}},Ta=(t,o,a)=>{const n=U(Math.floor(t*h),0,h-1),i=U(Math.floor((1-o)*h),0,h-1),r=m0(n,0,i+1);let f=i;for(;f>=0&&!(r[f*4+2]>>8&1);)f--;if(f<0||f<i-h*.2){Y.hit("noise",.2,{cutoff:700,dur:.3});return}const s=Ot(t,1-(f+.5)/h);if(s[1]>=-1e-4)return;const l=p.p[1]/-s[1],d=p.p[0]+s[0]*l,u=p.p[2]+s[2]*l;ke(d,u,a,-.0045);for(let M=0;M<4;M++)ke(d+(b()-.5)*.9,u+(b()-.5)*.9,a+.25+b()*.5,5e-4);const m=U(Mt(at([d-p.p[0],0,u-p.p[2]]),p.rt),-1,1);Y.hit("noise",.55,{cutoff:1800,dur:.35,pan:m}),Y.hit("noise",.35,{cutoff:420,dur:.7,pan:m});for(let M=0;M<3;M++)Y.hit("blip",.12,{freq:1300+b()*1500,at:.2+b()*.5,pan:m})},He=t=>{const o=Pe(),a=[t[0]-o[0],t[1]-o[1],t[2]-o[2]],n=Math.hypot(...a),i=Mt(a,q.subarray(44,47))/n,r=2*Math.max(1-i,0)/q[47*4+3];return{b:Math.exp(-r/.016)+.07*Math.exp(-r/.05)+.0015*Math.exp(-r/.6),d:n}},Be=16e3;let Wt=(parseInt(B.slice(48,56),16)^19088743)>>>0;const v0=()=>(Wt^=Wt<<13,Wt^=Wt>>>17,Wt^=Wt<<5,(Wt>>>0)/4294967296*2-1);let he=0,Do=0,Co=0,Ma=0,We=[];const b0=[{f:4400,rate:31,on:.26,per:.74,ph:0},{f:5200,rate:48,on:1.6,per:2.3,ph:.9},{f:3650,rate:22,on:.12,per:.41,ph:.3}],y0=t=>{const o=new Float32Array(t);for(let a=0;a<t;a++){const n=he+a/Be;let i=0;for(const s of b0){const l=(n+s.ph)%s.per;if(l<s.on){const d=Math.sin(R*s.rate*n)>.1?1:0;i+=.05*d*Math.sin(R*s.f*n)*Math.sin(Math.PI*l/s.on)}}const r=v0();Co=.6*(Co+r-Ma),Ma=r,i+=.01*Co*(.6+.4*Math.sin(R*61*n)),Do+=(r-Do)*.06;const f=Math.max(0,Math.sin(R*n/2.7)*Math.sin(R*n/1.13+1));i+=.35*Do*f*f;for(const s of We){const l=n-s.t;l>0&&l<s.d&&(i+=s.v*Math.exp(-l/(s.d*.3))*Math.sin(R*s.f*l*(1+.08*l/s.d)))}o[a]=i}return he+=t/Be,We=We.filter(a=>he-a.t<a.d),o},Dt=Math.max(.75,h*.0017),je=t=>t<8?1:t<60?Math.pow(8/t,.397):Math.max(.25,.45*Math.pow(60/t,.848)),Ea=[[0,0,0],[.145,.208,.059],[.31,.416,.11],[.518,.635,.227],[.706,.8,.392],[.863,.91,.494],[.933,.973,.635]],Ve=t=>{t=U(t,0,1)*6;const o=Math.min(5,Math.floor(t)),a=t-o,n=Ea[o],i=Ea[o+1];return[n[0]+(i[0]-n[0])*a,n[1]+(i[1]-n[1])*a,n[2]+(i[2]-n[2])*a]},qo=t=>t<0?0:t<.06?t/.06:Math.exp(-(t-.06)/.15),_o=(t,o)=>[t.b[0]+t.A[0]*(Math.sin(t.w[0]*o+t.o[0])+.4*Math.sin(t.w[0]*2.31*o+t.o[3])),Math.max(.15,t.b[1]+t.A[1]*Math.sin(t.w[1]*o+t.o[1])),t.b[2]+t.A[2]*(Math.sin(t.w[2]*o+t.o[2])+.4*Math.sin(t.w[2]*1.73*o+t.o[3]))],w0=(t,o)=>{const a=o/t.T+t.ph+.14*Math.sin(o*.41+t.ph*31)+.09*Math.sin(o*.23+t.ph*57),n=(a-Math.floor(a))*t.T;return t.hab===0?qo(n):t.hab===1?Math.max(qo(n),qo(n-.4))*.92:Math.pow(Math.sin(Math.PI*Math.min(n/1.6,1)),2)},ga=(t,o,a)=>{const n=t[0]-o[0],i=t[1]-o[1],r=Math.min(3.5*h/1e3,Math.hypot(n,i)*.35),f=Math.atan2(i,n),s=(f%Math.PI+Math.PI)%Math.PI/Math.PI;return a+Math.min(95,Math.round(r*10))+Math.min(s,.999)},T0=()=>{ct.key=ne;let t=Ft;const o=(r,f,s,l,d,u)=>{if(t>=it)return;let m=t*4;O[m]=r[0],O[m+1]=r[1],O[m+2]=l,O[m+3]=r[2],m+=it*4,O[m]=s,O[m+1]=d,O[m+2]=u,O[m+3]=f,t++},a=q[19*4]*1.5,n=r=>[Math.floor(r[0])+.5,Math.floor(r[1])+.5,r[2]];for(const r of Re){const f=F(r.p);if(!f)continue;const s=f[2],l=20+2*r.hab+Math.min(r.ph,.999),d=r.hab===3?r.br:(r.far?Math.min(.92,1.9*je(s)):Math.min(.9,1.3*je(s)))*r.br*a0*(yt?.9*Math.exp(-.012*s):1),u=(r.far?Math.max(.6,Dt*.5):U(Dt*.75*Math.pow(10/s,.8),.6,1.4))*(yt?1.5:1);o(n(f),l,d,u,1,r.T);const m=r.wet?F([r.p[0],-r.p[1],r.p[2]]):null;m&&o(n(m),l+1,d*.6*Math.exp(-.5*a*m[2]),u*.9,1+2.2*Qt(50,12,m[2]),r.T)}const i=new Uint8Array(27*27);for(const r of At){const f=F(r.p);if(f){const l=(U(Math.floor((1-f[1]/h)/.04),-1,25)+1)*27+U(Math.floor(f[0]/h/.04),-1,25)+1;if(i[l]>=3)continue;i[l]++}f&&o(n(f),3+r.lag,Math.min(.95,1.3*je(f[2]))*(.8+.3*(r.br-.55)),Math.max(.7,Dt*.55*Math.min(1,14/f[2])),1,r.own);const s=F([r.p[0],-r.p[1],r.p[2]]);if(s){const l=.6*Math.min(.95,1.3*je(s[2]))*(.8+.3*(r.br-.55))*Math.exp(-a*s[2]);l>.02&&o(n(s),5+r.lag,l,Math.max(.65,Dt*.5*Math.min(1,14/s[2])),1+2.2*Qt(50,12,s[2]),r.own)}}if(ct.n=t-Ft,e.bindTexture(e.TEXTURE_2D,P.tD),e.pixelStorei(e.UNPACK_ROW_LENGTH,it),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ft),x.d6){const r=Math.min(ct.n,it/2-Ft);r>0&&e.texSubImage2D(e.TEXTURE_2D,0,Ft,0,r,2,e.RGBA,e.FLOAT,O),ct.n>r&&(e.pixelStorei(e.UNPACK_SKIP_PIXELS,it/2),e.texSubImage2D(e.TEXTURE_2D,0,0,3,ct.n-r,2,e.RGBA,e.FLOAT,O))}else ct.n&&e.texSubImage2D(e.TEXTURE_2D,0,Ft,0,ct.n,2,e.RGBA,e.FLOAT,O);e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0)},Ke=t=>To+t*Ht+Math.sin(t*12.9898+Ht*78.2)*43758.5453%1*.1*Ht,M0=t=>{let o=Math.floor((t-To)/Ht);Ke(o+1)<=t?o++:Ke(o)>t&&o--,T(27,Ke(o),Ke(o-1),Ht,0)},za=t=>{let o=0;const a=(s,l,d,u,m,M,D,A)=>{if(o>=Ft)return;let E=o*4;O[E]=s,O[E+1]=l,O[E+2]=d,O[E+3]=u,E+=it*4,O[E]=m,O[E+1]=M,O[E+2]=D,O[E+3]=A,o++},n=q[48]/2.4,i=U(Math.pow(n,.4),1,1.35),r=q[19*4]*1.5;for(const s of go){const l=Math.min(Eo,w0(s,t)*i*U(1-s.inhib,0,1));if(l<.02)continue;const d=_o(s,t),u=_o(s,t-.08),m=F(d),M=F(u),D=Ve(l);m&&M&&a(m[0],m[1],U(h*.0014*Math.pow(4/m[2],.4),.65,1.6),m[2],D[0],D[1],D[2],ga(m,M,200));const A=yt?null:F([d[0],-d[1],d[2]]),E=A&&F([u[0],-u[1],u[2]]);if(A&&E){const C=Ve(l*.6*Math.exp(-r*A[2]));a(A[0],A[1],U(h*.0013*Math.pow(4/A[2],.4),.6,1.5),A[2],C[0],C[1],C[2],ga(A,E,300))}}for(const s of ha){const l=I(s.s,s.u+.25*Math.sin(s.w[0]+t*.05),s.y+.06*Math.sin(s.w[1]+t*.7),s.z+24*Math.sin(s.w[2]+t*s.v/24)),d=Math.min(Eo,s.k*(.94+.06*Math.sin(s.w[0]+1.3*t))*i),u=F(l);if(!u)continue;const m=u[2]<15?2:1,M=Ve(d),D=Ve(d*.6*Math.exp(-r*u[2]));for(let A=0;A<m;A++){const E=m>1?(A-.5)*.07:0,C=[l[0]+E*p.rt[0]*ve,l[1],l[2]+E*p.rt[2]*ve],H=m>1?F(C):u,S=Math.max(.6,Dt*.5*Math.min(1,10/u[2]));H&&a(H[0],H[1],S,H[2],M[0],M[1],M[2],200);const K=yt?null:F([C[0],-C[1],C[2]]);K&&a(K[0],K[1],S*.9,K[2],D[0],D[1],D[2],300)}}for(const s of ut){if(s.b<.02)continue;const l=s.kind===3?[.42,1,.3]:s.kind===4?[.88,1,.6]:[.95,.9,.3],d=s.b*Math.min(1.3,Math.max(s.kind===4?.7:0,n))*(s.kind===3?1.1:.75),u=s.kind===3?Dt*.85:s.kind===4?Dt*.6:Dt,m=s.kind===3?2:1,M=s.kind===4?8:0;for(let D=0;D<m;D++){const A=m>1?(D-.5)*.07:0,E=m>1?[s.p[0]+A*p.rt[0]*ve,s.p[1],s.p[2]+A*p.rt[2]*ve]:s.p,C=F(E);if(C){const S=M?Math.min(.86,d*1.2*Math.pow(Math.min(1,12/C[2]),.9)):d*(.5+Math.min(1.8,40/Math.max(C[2],5)));a(C[0],C[1],u*U(14/C[2],.6,1),C[2],l[0]*S,l[1]*S,l[2]*S,M)}const H=F([E[0],-E[1],E[2]]);if(H){const S=M?Math.min(.55,d*.7*Math.pow(Math.min(1,12/H[2]),.9)):d*.55*(.5+Math.min(1.8,40/Math.max(H[2],5)));a(H[0],H[1],u*U(14/H[2],.6,1),H[2],l[0]*S,l[1]*S,l[2]*S,M+1)}}}for(const s of uo){const l=He(s),d=mt*Math.min(1.6,l.b*4.5*14/Math.max(l.d,3));if(d<.01)continue;const u=F(s),m=F([s[0],-s[1],s[2]]);u&&a(u[0],u[1],Math.max(.6,h*.0011),u[2]-.1,1*d,.42*d,.12*d,0),m&&a(m[0],m[1],Math.max(.6,h*.0011),m[2]-.1,.5*d,.2*d,.06*d,1)}for(const s of l0){const l=t-s.t0;if(l<0||l>s.life)continue;const d=s.b*Math.exp(-l/(s.life*.35))*Math.min(1,l*30)*.5*Math.min(1.5,n),u=F(s.p);u&&(s.glow?a(u[0],u[1],Math.max(3,h*.012)*(1+l),u[2]-.5,.03*d,.12*d,.14*d,2):a(u[0],u[1],Math.max(.8,h*.0018),u[2]-.5,.35*d,1.1*d,1.3*d,2))}if(mt)for(const s of No){const l=He(s.p),d=Math.min(3,l.b*ca*.0016/Math.max(l.d*l.d,1))*s.k*Math.min(1.3,n);if(d<.01)continue;const u=F(s.p),m=F([s.p[0],s.p[1]+s.v/30,s.p[2]]);if(u&&m){const M=Math.min(80,Math.abs(m[1]-u[1])*.5);a(u[0],(u[1]+m[1])*.5,Math.max(.45,h*5e-4),u[2],.8*d,.85*d,.9*d,100+M)}}const f=Math.min(zo,12);for(let s=0;s<f;s++)O.set(da[s],(2*it+s)*4);return q[29*4+1]=f,M0(t),e.bindTexture(e.TEXTURE_2D,P.tD),e.pixelStorei(e.UNPACK_ROW_LENGTH,it),e.texSubImage2D(e.TEXTURE_2D,0,0,0,Math.max(o,12),3,e.RGBA,e.FLOAT,O),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),o},No=[],Ra=(t,o)=>{const a=q.subarray(44,47),n=Pe(),i=1.6+7*b(),r=i*.13*Math.sqrt(b()),f=b()*R,s=at(_t(a,[0,1,0])),l=_t(s,a);t.p=[n[0]+a[0]*i+(s[0]*Math.cos(f)+l[0]*Math.sin(f))*r,n[1]+a[1]*i+(s[1]*Math.cos(f)+l[1]*Math.sin(f))*r+(o?1.5:3*b()-1.5),n[2]+a[2]*i+(s[2]*Math.cos(f)+l[2]*Math.sin(f))*r],t.k=.4+b(),t.v=3.5+2*b()},E0=t=>{for(const o of No)o.p[1]-=o.v*t,(o.p[1]<.02||b()<t*.2)&&Ra(o,!0)},ka=(t,o)=>{for(const a of go)mt>.5&&He(_o(a,t)).b>.25?a.inhib=2.5:a.inhib=Math.max(0,a.inhib-o);for(const a of ut){const n=a.w,i=a.A,r=a.f;if(a.kind===4){if(a.glow){a.b=.32;continue}const s=t/a.T+.14*Math.sin(t*.41+a.ph)+.09*Math.sin(t*.23+2*a.ph)+a.ph/R,l=(s-Math.floor(s))*a.T;a.b=l<.05?l/.05:Math.exp(-(l-.05)/.09);continue}if(a.p=a.kind===3?I(a.s,a.u+i[0]*Math.sin(n[0]+t*.05),a.y+i[1]*Math.sin(n[1]+t*.7),a.z+i[2]*Math.sin(n[2]+t*a.v/i[2])):I(a.s,a.u+i[0]*Math.sin(n[0]+R*r[0]*t),a.y+i[1]*Math.sin(n[1]+R*r[1]*t),a.z+i[2]*Math.sin(n[2]+R*r[2]*t)),a.kind===3){a.b=.8+.2*Math.sin(n[0]+t*1.3);continue}mt>.5&&He(a.p).b>.25&&(a.inhib=2+b()*2),a.inhib>0&&(a.inhib-=o),a.ph+=o/a.T,a.ph>=1&&(a.ph-=1,a.inhib<=0&&(a.last=t));const f=t-a.last;if(a.kind===0)a.b=f<0||f>.7?0:Math.pow(Math.sin(Math.PI*f/.7),2);else{const s=f>=0&&f<.2?Math.sin(Math.PI*f/.2):0,l=f-.38,d=l>=0&&l<.2?Math.sin(Math.PI*l/.2):0;a.b=Math.max(s,d)*.9}}};va();const Aa=t=>{q[2*4+3]=t;const o=Qt(0,1,Ge);T(12,Ja*(1+1.3*o),h<600?1:0,4,0);const a=Pe(),n=Ot(ko[0],ko[1]);T(10,...a,ca),T(11,...n,mt),q[19*4+3]=t*.25};if(Aa(0),ka(4,0),N===3)for(let t=0;t<100;t++){const o={};Ra(o,!1),No.push(o)}if(N===3&&X.w)for(let t=0;t<3;t++)ke(X.w[0]+(b()-.5)*1.6,X.w[2]+(b()-.5)*2,2.4+t*.55+b()*.3,25e-5);const Fa=t=>{if(!x.mt||x.mt.w<h){x.mt&&(e.deleteTexture(x.mt.t),e.deleteFramebuffer(x.mt.fb)),e.activeTexture(e.TEXTURE10);const n={t:x.tex2(h,h,e.RG32UI,e.RG_INTEGER,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE,null),fb:e.createFramebuffer(),w:h};e.bindFramebuffer(e.FRAMEBUFFER,n.fb),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n.t,0),x.mt=n}e.activeTexture(e.TEXTURE10),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,x.mt.fb),e.viewport(0,0,h,h),Bt();const o=nt("mst");e.useProgram(o.p),e.uniform4fv(o.uC,q),ua(),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,h,h),Bt();const a=nt("comp");if(e.useProgram(a.p),e.uniform4fv(a.uC,q),ua(),e.activeTexture(e.TEXTURE10),e.bindTexture(e.TEXTURE_2D,x.mt.t),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.drawArrays(e.TRIANGLES,0,3),ct.key!==ne&&T0(),t||ct.n){e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD);const n=nt("spr");e.useProgram(n.p),e.uniform4fv(n.uC,q),e.uniform4f(n.uS,h,0,0,0),t&&e.drawArraysInstanced(e.TRIANGLES,0,6,t),ct.n&&(e.uniform4f(n.uS,h,Ft,0,0),e.drawArraysInstanced(e.TRIANGLES,0,6,ct.n)),e.disable(e.BLEND)}};return Fa(za(0)),(t,o)=>{o=Math.min(o||1/30,.1);const a=c.input,n=a.taps?a.taps():[];if(qe(),va(),a.down&&!Xe&&(V={x:a.x,y:a.y,t,mode:0}),a.down&&V&&(V.mode||(Math.hypot(a.x-V.x,a.y-V.y)>.015?V.mode=1:t-V.t>.35&&(V.mode=2,mt=0,Y.hit("click",.3))),V.mode===1&&(ko=[U(a.x,0,1),U(a.y,0,1)],mt||(mt=1,Y.hit("click",.3)))),!a.down&&Xe&&V&&(V.mode||Ta(V.x,V.y,t),V.mode===2&&(mt=1,Y.hit("click",.3)),V=null),!a.down&&!Xe&&n.length)for(const i of n)Ta(i.x,i.y,t);if(Xe=a.down,Ge=mt>.5?Math.max(0,Ge-o/.5):Math.min(1,Ge+o/3.2),Aa(t),t>=ba){const i=6+b()*40,r=b()<.5?-1:1,f=I(r,-3-b()*(te(i)/2-4),0,i);ke(f[0],f[2],t,7e-4+b()*5e-4),ba=t+8+37*b()*b(),Y.hit("blip",.1,{freq:900+b()*500}),Y.hit("noise",.12,{cutoff:900,dur:.2})}if(t>=Fo){const i=4+b()*30,r=I(b()<.6?-1:1,-.6-b()*1.8,0,i);ke(r[0],r[2],t,25e-5),Ao>0?(Ao--,Fo=t+.12+.5*b()):(Ao=b()<.4?1+Math.floor(b()*5):0,Fo=t+(1.5+7*b())*(N===3?.3:1)),Y.hit("blip",.04,{freq:2200+b()*1200})}if(Y&&Y.on){if(t>=wa){const r=b();We.push(r<.6?{t:he+.05,d:.05,f:2600+b()*900,v:.07}:r<.85?{t:he+.05,d:.12,f:480+b()*120,v:.12}:{t:he+.05,d:.35,f:1100+b()*300,v:.05}),wa=t+.08+b()*.5}const i=Math.min(3200,Math.round(o*Be));if(i>0&&Y.pcm(y0(i),Be,{vel:.6}),t>=ya){const r=71+Math.floor(b()*3);for(let f=0;f<5;f++)Y.note(r-[0,2,3,5,7][f]+(b()<.2?-1:0),{dur:.95,vel:.12,wave:"sine",attack:.18,at:f*1.25,pan:-.4,cutoff:1400});ya=t+24+b()*22}}ka(t,o),E0(o),x0=t,Fa(za(t))}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
