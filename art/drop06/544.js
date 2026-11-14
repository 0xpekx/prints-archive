// Open Ocean: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/544.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(We){We&&function(){"use strict";const mt={yaw:0,pitch:0,x:0,y:0,z:0},I=(e,a,x)=>e<a?a:e>x?x:e,g=Math.PI*2,we=9.81,Ve=24,Ee=20,D=512,de=64,Ae=400,Oe=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,ne=`out vec2 vUV;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUV = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,G=`
uniform vec4 uP[${Ve}];
uniform sampler2D uN, uD, uC, uV, uS;
#ifdef WPK
// no float render targets: the slope map holds raw float bits (RGBA32UI), filtered here by hand
uniform highp usampler2D uW;
vec3 wtx(ivec2 i) { return uintBitsToFloat(texelFetch(uW, i & ${D-1}, 0).xyz); }
vec4 wlin(vec2 u) {
  vec2 t = u * ${D}. - .5, f = fract(t); ivec2 i = ivec2(floor(t));
  return vec4(mix(mix(wtx(i), wtx(i + ivec2(1, 0)), f.x), mix(wtx(i + ivec2(0, 1)), wtx(i + ivec2(1, 1)), f.x), f.y), 0.);
}
#define WMAP(u, l) wlin(u)
#else
uniform sampler2D uW;
#define WMAP(u, l) textureLod(uW, u, l)
#endif
#define CAM uP[0].xyz
#define TANH uP[0].w
#define FW uP[1].xyz
#define SZ uP[1].w
#define RT uP[2].xyz
#define TIME uP[2].w
#define UPV uP[3].xyz
#define NWV (int(uP[3].w) + ZI)
#define SUNW uP[4].xyz
#define SUNE uP[4].w
#define SUNA uP[5].xyz
#define RIP uP[5].w
#define KD uP[6].rgb
#define BSC uP[6].w
#define CC uP[7].rgb
#define EXPO uP[7].w
#define WUP uP[8].rgb
#define CLD uP[8].w
#define WMID uP[9].rgb
#define ZI int(uP[9].w)
#define WDN uP[10].rgb
#define GPH uP[10].w
#define SKYZ uP[11].rgb
#define SKYH uP[12].rgb
#define SUNC uP[13].rgb
#define OVC uP[13].w
#define SW1 uP[14]
#define SW2 uP[15]
#define CSW uP[16]
#define CCOV uP[17].x
#define CDEP uP[17].y
#define CDR uP[17].zw
#define DIF uP[18].x
#define RAIN uP[18].y
#define BIO uP[18].z
#define SKG uP[22].rgb
#define FLKA uP[22].w
#define H0 uP[19].x
#define KAP uP[19].y
#define ENC uP[19].z
#define MOTEN uP[19].w
#define CLT uP[20].xy
#define APER uP[20].z
#define FOC uP[20].w
#define MOTEK uP[21].x
#define SNOW uP[21].y
#define TRED uP[21].z
#define FOAM uP[21].w
#define MAPL ${de}.
#define MAPT (${de}. / ${D}.)
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hsh(x) >> 8) * (1. / 16777216.); }
// 2D noise tile: 16 cells over 128 texels, one cell per unit of p
float N1(vec2 p, float fp) { return textureLod(uN, p * .0625, log2(max(fp * 8., 1.))).r; }
vec4 N4(vec2 p, float fp) { return textureLod(uN, p * .0625, log2(max(fp * 8., 1.))); }
float hg(float c, float g) { return (1. - g * g) / pow(1. + g * g - 2. * g * c, 1.5) * .0796; }
float phs(float c) { return .55 * hg(c, GPH) + .45 * hg(c, .25); }
// the two long swells (analytic, not on the lattice): slope xy, height z
vec3 swG(vec2 p) {
  float a = dot(SW1.xy, p) + SW1.w, b = dot(SW2.xy, p) + SW2.w;
  return vec3(SW1.z * cos(a) * SW1.xy + SW2.z * cos(b) * SW2.xy, SW1.z * sin(a) + SW2.z * sin(b));
}
// the diffuse water light seen along d (multiply scattered daylight): turquoise up, cobalt level, near-black down
vec3 wcol(vec3 d) {
  float y = d.y;
  vec3 c = y > 0. ? mix(WMID, WUP, pow(smoothstep(0., 1., y), .8)) : mix(WMID, WDN, pow(smoothstep(0., .95, -y), .55));
  return c * (1. + .6 * pow(max(dot(d, SUNW), 0.), 4.)) * DIF;
}
// sunlight left at surface point s by cloud shadows: the cloud a hold brings over (between its trailing and leading
// edges along CSW.xy, ragged) and, on cloudy mints, the drifting shadows of the cumulus
float cshd(vec2 s) {
  vec4 n = N4(s * .021 + CDR, 0.);
  float u = dot(s, CSW.xy) + (n.x - .5) * 16.;
  float sh = smoothstep(CSW.z - 2.5, CSW.z + 2.5, u) * smoothstep(CSW.w + 2.5, CSW.w - 2.5, u);
  sh = max(sh, smoothstep(1. - CCOV, 1.08 - CCOV, n.y * .65 + n.z * .35) * CDEP);
  return 1. - .9 * sh;
}
// sunlight focused by the waves at point p, relative to its mean: four baked depths (H0, 2H0, 4H0, 8H0), blended
// in log depth, each prefiltered by the footprint fp; the swell's slope shifts the whole net (the sway)
float causL(vec3 p, float fp) {
  float h = max(-p.y, 0.);
  vec2 s = p.xz + SUNW.xz / SUNW.y * h;
  s -= swG(s).xy * KAP * h;
  float lh = clamp(log2(max(h, .1) / H0), 0., 3.);
  vec4 w = max(1. - abs(lh - vec4(0., 1., 2., 3.)), 0.);
  float lod = log2(max(fp / MAPT, 1.)) + .35 * log2(1. + h * .06);
  vec4 e = textureLod(uC, s / MAPL, lod);
  vec4 I = e / (1.002 - e);
  float c = dot(I, w);
  c = mix(1., c, smoothstep(.15, H0, h));
  return mix(c, 1., smoothstep(35., 90., h)) * cshd(s);
}
vec3 tmap(vec3 c) {
  c *= EXPO;
  // the curve runs on the brightest channel and keeps the hue (a per-channel curve turns bright blue into cyan as blue
  // clips first); only near the top does the light whiten, so the knot is white, the window's heart blue-white, and
  // the chroma stays in the midtones
  float m = max(c.r, max(c.g, c.b)), t = (m * (2.51 * m + .03)) / (m * (2.43 * m + .59) + .14);
  c = c * (t / max(m, 1e-6));
  c = mix(c, vec3(.6, .9, 1.) * t, smoothstep(.8, .99, t) * .75);
  c = mix(c, vec3(t), smoothstep(.975, 1., t));
  return pow(clamp(c, 0., 1.), vec3(1. / 2.2));
}
`,wt=`
#ifdef WPK
out uvec4 oC;
#else
out vec4 oC;
#endif
in vec2 vUV;
void main() {
  vec2 s = vUV * MAPL;
  vec3 g = vec3(0.);
  for (int i = 0; i < NWV; i++) { vec4 w = texelFetch(uD, ivec2(i, 0), 0); float ph = dot(w.xy, s) + w.w; g += w.z * vec3(cos(ph) * w.xy, sin(ph)); }
#ifdef WPK
  oC = uvec4(floatBitsToUint(g), 0u);
#else
  oC = vec4(g, 0.);
#endif
}`,xt=`out vec4 oC;
in vec2 vUV;
float cI(float k, float h, vec3 H) {
  float det = (1. + k * H.x) * (1. + k * H.y) - k * k * H.z * H.z, e = .05 + .014 * h;
  float I = (1. + e) / (abs(det) + e);
  return I / (1. + I);
}
void main() {
  vec2 s = vUV * MAPL;
  vec2 g0 = WMAP(vUV, 0.).xy;
  // four depths, each with its own surface point (one fixed-point step) and Hessian; one read of each wave for all four
  float h0 = H0 * exp2(float(ZI)), h1 = H0 * exp2(float(1 + ZI)), h2 = H0 * exp2(float(2 + ZI)), h3 = H0 * exp2(float(3 + ZI));
  float k0 = KAP * h0, k1 = KAP * h1, k2 = KAP * h2, k3 = KAP * h3;
  vec2 s0 = s - k0 * g0, s1 = s - k1 * g0, s2 = s - k2 * g0, s3 = s - k3 * g0;
  vec3 H_0 = vec3(0.), H_1 = vec3(0.), H_2 = vec3(0.), H_3 = vec3(0.);
  for (int i = 0; i < NWV; i++) {
    vec4 w = texelFetch(uD, ivec2(i, 0), 0);
    // a wave far past its focus here only adds speckle that the sun's own width blurs away: drop it
    float kk = dot(w.xy, w.xy), f;
    vec3 q = vec3(w.x * w.x, w.y * w.y, w.x * w.y);
    f = k0 * w.z * kk; H_0 -= w.z * sin(dot(w.xy, s0) + w.w) * q / (1. + .9 * f * f);
    f = k1 * w.z * kk; H_1 -= w.z * sin(dot(w.xy, s1) + w.w) * q / (1. + .9 * f * f);
    f = k2 * w.z * kk; H_2 -= w.z * sin(dot(w.xy, s2) + w.w) * q / (1. + .9 * f * f);
    f = k3 * w.z * kk; H_3 -= w.z * sin(dot(w.xy, s3) + w.w) * q / (1. + .9 * f * f);
  }
  float I0 = cI(k0, h0, H_0), I1 = cI(k1, h1, H_1), I2 = cI(k2, h2, H_2), I3 = cI(k3, h3, H_3);
  oC = vec4(I0, I1, I2, I3);
}`,bt=`out vec4 oC;
in vec2 vUV;
void main() {
  vec2 q = vUV * 2. - 1.;
  vec3 d = normalize(FW + (q.x * RT + q.y * UPV) * TANH), o = CAM;
  float pa = 2. * TANH / SZ;
  float tend = d.y > .001 ? min(-o.y / d.y, 110.) : 110.;
  float j = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715))));
  float cp = dot(d, SUNW), sn = sqrt(max(1. - cp * cp, 0.));
  vec3 acc = vec3(0.), acu = vec3(0.);
  // exponential steps: fine near the eye where single sheets resolve, coarse far off where they average out
  float lr = log(1. + tend / .35) / 40.;
  for (int i = 0; i < 40 + ZI; i++) {
    float t = .35 * (exp(lr * (float(i) + j)) - 1.), dtt = (t + .35) * lr;
    vec3 p = o + d * t;
    float h = max(-p.y, 0.);
    float cs = causL(p, max(t * pa, dtt * sn * .2));
    cs *= cs * cs;
    vec3 e = exp(-KD * h / SUNW.y - CC * t) * dtt;
    acc += e * cs; acu += e;
  }
  // the forward peak lights only the even glow round the sun: toward it the shafts themselves would burst into ruled
  // rays across the knot, so their share of the peak is capped and fades within a few degrees of the sun
  float ph = phs(cp), pc = min(ph, .2);
  // the water scatters blue more than red (the top metres glow blue-white, not grey)
  vec3 L = (acc * pc * mix(.08, 1., smoothstep(.97, .8, cp)) + acu * (ph - pc) * .6) * BSC * SUNE * SUNC * vec3(.5, .78, 1.);
  oC = vec4(L * ENC, 0.);
}`,He=`out vec4 oC;
in vec2 vUV;
vec3 skyA(vec3 a, float sh) {
  float y = max(a.y, 0.), mu = dot(a, SUNA);
  vec3 c = mix(SKYH, SKYZ, pow(smoothstep(0., 1., y), .55));
  // low sun: the horizon on its side burns gold, the far side stays violet
  c += SKG * pow(mu * .5 + .5, 4.) * (1. - y) * (1. - y);
  c += SUNC * (.07 * pow(max(mu, 0.), 8.) + .2 * pow(max(mu, 0.), 70.)) * (1. - OVC) * sh;
  if (CLD > 0.) {
    vec2 cp = a.xz / (y + .12) * .55 + CLT;
    float n = N1(cp, 0.) * .6 + N1(cp * 2.3 + 3.1, 0.) * .3 + N1(cp * 5.7 + 1.7, 0.) * .1;
    float cl = smoothstep(.62 - .2 * CLD, .82 - .2 * CLD, n) * smoothstep(.0, .25, y);
    vec3 cc = vec3(1.05, 1.05, 1.06) * (.7 + .5 * smoothstep(.55, .85, n)) * (1. + .8 * pow(max(mu, 0.), 8.));
    c = mix(c, cc, cl * .9);
  }
  return c * DIF;
}
// transmittance out through the surface for cos(incidence) ci with unresolved slope spread w: exact Fresnel above the
// critical angle, softened across it; the critical angle per channel (dispersion) tints the window's rim
vec3 trans(float ci, float w) {
  const float eta = 1.3333;
  float cc = sqrt(1. - 1. / (eta * eta)), ce = max(ci, cc + .004 + .35 * w);
  float ct = sqrt(max(1. - eta * eta * (1. - ce * ce), 0.));
  float rs = (eta * ce - ct) / (eta * ce + ct), rp = (ce - eta * ct) / (ce + eta * ct);
  vec3 cr = sqrt(1. - 1. / vec3(1.3318 * 1.3318, eta * eta, 1.335 * 1.335));
  return (1. - .5 * (rs * rs + rp * rp)) * smoothstep(vec3(-1.7), vec3(1.4), (ci - cr) / w);
}
vec3 surfC(vec3 d, vec3 p, float fp) {
  float fw = smoothstep(.45, .1, fp);
  vec2 g = WMAP(p.xz / MAPL, 0.).xy * fw + swG(p.xz).xy;
  // each octave is drawn while its cells span a few pixels, then fades into the unresolved spread below
  float f1 = 1. - smoothstep(.18, .36, fp), f2 = 1. - smoothstep(.06, .12, fp), f3 = 1. - smoothstep(.037, .075, fp), f4 = 1. - smoothstep(.014, .03, fp);
  vec4 n1 = N4(p.xz * 1.9 + vec2(TIME * .33, TIME * .19), fp * 1.9), n2 = N4(p.xz * 5.7 - vec2(TIME * .5, -TIME * .41), fp * 5.7);
  // the skin of capillary ripples a few centimetres long: hammered glass over the long waves
  vec4 n3 = N4(p.xz * 8.9 + vec2(TIME * .9, -TIME * .7), fp * 8.9);
  g += ((n1.yz - .5) * .14 * f1 + (n2.yz - .5) * .1 * f2 + (n3.yz - .5) * .12 * f3) * RIP;
  // capillary ripples on the waves' backs: fine parallel hairlines eight centimetres apart, bent by the chop, in patches
  vec2 kd = normalize(SW2.xy + vec2(1e-5)), kc = kd * 80.;
  g += kd * cos(dot(kc, p.xz) - TIME * 28.7 + n2.w * 9.) * .11 * f4 * RIP * smoothstep(.1, .5, n1.w);
  // rain: every drop rings the ceiling (two offset grids of drops, each ring spreading and fading)
  float rr = 0.;
#ifdef RAINON
  {
    float rf = 1. - smoothstep(.03, .14, fp);
    for (int k = 0; k < 3 + ZI; k++) {
      vec2 cq = p.xz * 2.3 + float(k) * vec2(.37, .71), cf = floor(cq);
      uint hh = hsh(uint(int(cf.x) + 8192) * 7919u ^ uint(int(cf.y) + 8192) * 104729u ^ uint(k) * 2654435761u);
      float ph = fract(TIME * (.55 + .5 * hf(hh + 2u)) + hf(hh + 3u));
      vec2 dv = fract(cq) - .5 - (vec2(hf(hh), hf(hh + 1u)) - .5) * .4;
      float r = length(dv), x = (r - .06 - ph * .34) / .07;
      float e = (1. - ph) * (1. - ph);
      g += RAIN * rf * dv / max(r, 1e-3) * e * x * exp(-x * x) * 1.1;
      rr += e * exp(-r * r / .004) * (1. - ph);
    }
  }
#endif
  // where a breath reaches the mirror it rings it (the latest arrival)
  {
    vec4 rg = uP[23];
    float age = TIME - rg.z;
    if (age > 0. && age < 4.) {
      vec2 dv = p.xz - rg.xy; float r = length(dv), x = (r - .05 - .23 * age) / (.03 + .02 * age);
      g += dv / max(r, 1e-3) * x * exp(-x * x) * rg.w * .25 * (1. - age * .25) * (1. - age * .25);
    }
  }
  // slope spread left unresolved under this pixel (what it can't draw it blurs, never more)
  float sw = sqrt(.004 * (1. - f1) + .0025 * (1. - f2) + .0012 * (1. - f3) + .0006 * (1. - f4)) * RIP + .0015 + .1 * (1. - fw) * RIP;
  vec3 n = normalize(vec3(-g.x, 1., -g.y));
  float ci = max(dot(d, n), .02);
  // outside the window: total internal reflection of the dark water below, with the shafts' glow in it
  vec3 rd = reflect(d, -n); rd.y = min(rd.y, -.04); rd = normalize(rd);
  // seen nearly edge-on the mirror also holds the bright water just under the surface
  // (a metre or two down the deep it shows is the bright sunlit water just under the surface: a silver ceiling)
  vec3 Lr = (wcol(rd) * .8 + (WMID * 1.6 + WUP * .6) * DIF * smoothstep(.3, .03, ci)) * (1. + 4. * exp(CAM.y * .6));
  // window or mirror is a threshold: the edge is as sharp as the pixel, with only the unresolved slopes to soften it
  float sn = sqrt(max(1. - ci * ci, 0.)), w = sw * (.35 + sn) * .9 + fwidth(ci) * .8;
  vec3 Tt = trans(ci, w);
  const float ETA = 1.3333;
  float ce = max(ci, sqrt(1. - 1. / (ETA * ETA)) + .002);
  vec3 tg = d - n * dot(d, n); tg /= max(length(tg), 1e-4);
  vec3 dt = n * ce + tg * sqrt(1. - ce * ce);
  float ct = sqrt(max(1. - ETA * ETA * (1. - ce * ce), 0.));
  vec3 a = normalize(ETA * dt + (ct - ETA * ce) * n);
  float shd = cshd(p.xz);
  vec3 L = skyA(a, shd) * Tt + Lr * (1. - Tt);
  L += RAIN * rr * .3 * (wcol(-d) + SKYH * .2);
  // under a fresh breeze each breaker leaves a cloud of bubbles hanging under the mirror, a white smoke that thins
#ifdef FOAMON
  {
    vec2 fq = p.xz * .07 + CDR * 3.;
    float bn = dot(texture(uN, fq * .0625), vec4(.4, .3, .2, .1)), th = .7 - .07 * sin(TIME * .23 + bn * 11.);
    float fc = smoothstep(th, th + .1, bn - (n2.x - .5) * .25 - (n3.x - .5) * .15) * FOAM;
    // lit white against the dark mirror, lost against the bright window
    L = mix(L, max(L, (SKYH * .3 + WUP * 3.) * DIF * shd), fc * .7);
  }
#endif
  // the sun through the ripples: every facet tipped toward it throws its own image of the disc, so the drawn normals
  // carve a knot of blobs and threads; what the pixel can't resolve widens the kernel instead of speckling it
  // each facet's image is about the sun's own size (hard), and the tilted facets split it: red bends least, blue most
  vec3 dv = a - d;
  float mu = dot(a, SUNA), s2 = .0012 + .9 * sw * sw * (.3 + 2. * sn * sn), s3 = .00012 + .25 * sw * sw;
  vec3 mu3 = vec3(dot(normalize(a - dv * .04), SUNA), mu, dot(normalize(a + dv * .04), SUNA));
  vec3 kn = exp(-(1. - mu3) / s3) * (.004 / s3) + exp(-(1. - mu) / s2) * (.002 / s2);
  // and round the knot the light the water itself scatters forward: a small pale core a few degrees wide
  float md = dot(d, SUNW);
  L += SUNC * SUNE * Tt * (kn * (.55 + .9 * n2.w) + 1.6 * exp(-(1. - md) / .003) + .6 * exp(-(1. - md) / .02)) * shd * shd * (1. - OVC);
  return L;
}
void main() {
  vec2 q = vUV * 2. - 1.;
  vec3 d = normalize(FW + (q.x * RT + q.y * UPV) * TANH), o = CAM;
  float pa = 2. * TANH / SZ;
  vec3 col = wcol(d);
  if (d.y > .004) {
    float ts = -o.y / d.y;
    vec2 s = o.xz + d.xz * ts;
    ts = (WMAP(s / MAPL, 3.).z + swG(s).z - o.y) / d.y;
    vec3 p = o + d * ts;
    vec3 T = exp(-CC * ts * vec3(TRED, 1., 1.));
    if (T.b > .002) col = surfC(d, p, ts * pa / max(d.y, .06)) * T + col * (1. - T);
  }
  // the half-resolution volume, upsampled through a small tent so its grain stays soft
  vec2 ht = vec2(1. / (SZ * .5));
  vec4 V = (texture(uV, vUV + ht) + texture(uV, vUV - ht) + texture(uV, vUV + vec2(ht.x, -ht.y)) + texture(uV, vUV + vec2(-ht.x, ht.y))) * .25;
  col = col * (1. - V.a) + V.rgb / ENC;
  oC = vec4(col * ENC, 1.);
}`,Mt=`out vec3 vC; out vec3 vK;
void main() {
  uint u = uint(gl_VertexID);
  vec3 h = vec3(hf(u * 3u + 1u), hf(u * 3u + 2u), hf(u * 3u + 3u));
  const float B = 14.;
  bool flk = float(gl_VertexID) >= MOTEN;
  vec3 wp = h * B + vec3(.04, flk ? -.012 * SNOW + .004 * (1. - SNOW) : .004, .025) * TIME * (.7 + .6 * hf(u + 99u))
    + vec3(sin(TIME * .13 + h.x * 40.), .5 * sin(TIME * .09 + h.y * 30.), sin(TIME * .11 + h.z * 50.)) * .3;
  // plankton dart now and then: a hop of a couple of centimetres every few seconds
  if (!flk) { float hp = fract(TIME * (.2 + .25 * hf(u + 31u)) + hf(u + 37u)); wp += normalize(h - .5) * .025 * smoothstep(0., .12, hp); }
  wp = CAM + mod(wp - CAM + B * .5, B) - B * .5;
  vec3 v = wp - CAM;
  float z = dot(v, FW);
  gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 0.; vC = vec3(0.); vK = vec3(1., 1., 0.);
  if (z < .12 || wp.y > -.1) return;
  float r = flk ? (.002 + .007 * pow(hf(u * 7u + 5u), 2.)) * (1. + SNOW * .6) : .0003 + .0012 * pow(hf(u * 7u + 5u), 3.);
  float dist = length(v), pxs = SZ * .5 / TANH;
  vec2 sc = vec2(dot(v, RT), dot(v, UPV)) / (z * TANH);
  float rp = r / z * pxs, coc = APER * abs(1. / z - 1. / FOC) * pxs;
  float rad = sqrt(rp * rp + coc * coc + .45);
  float cs = causL(wp, .02);
  // they shine where a shaft strikes them and all but vanish in the lanes; their colour is the light's, not the water's
  vec3 E = exp(-KD * (-wp.y) / SUNW.y) * pow(cs, 3.) * .5 * (.25 + .75 * hg(dot(SUNW, v / dist), .55) / .0796 * .1);
  vec3 Lp = SUNE * SUNC * E * 3. + WUP * DIF * (flk ? .8 + FLKA : .8);
  Lp = mix(Lp, vec3(dot(Lp, vec3(.3, .4, .3))), .55);
  // (the gain lifts a speck smaller than a pixel to a spark; a fleck big enough to see is only as bright as it is lit)
  vC = Lp * exp(-CC * dist) * (rp * rp + .02) / (rad * rad) * MOTEK / (1. + 2. * rp * rp) * (flk ? .6 : 1.);
  // by night the plankton spark blue-green now and then
  if (BIO > 0. && !flk) { float fl = hf(u * 13u + uint(TIME * 1.7 + hf(u + 7u) * 9.)); vC += BIO * vec3(.05, .9, .6) * pow(fl, 25.) * exp(-CC * dist) * .08 / (rad * rad); }
  vC *= smoothstep(48., 30., rad);
  // in focus a flake is a chip, long and thin at its own angle; out of focus it opens into a round, faint blur
  float an = hf(u * 5u + 3u) * 6.2832, el = 1. + (flk ? 2.6 : 1.2) * hf(u * 11u + 1u) * clamp((rp - .25) / (coc + .6), 0., 1.);
  vK = vec3(2.4, cos(an) * el, sin(an) * el);
  gl_PointSize = 2.2 * rad;
  gl_Position = vec4(sc, 0., 1.);
}`,Tt=`in vec3 vC; in vec3 vK; out vec4 oC;
void main() {
  vec2 q = gl_PointCoord * 2. - 1.;
  float e = length(vK.yz);
  vec2 ax = vK.yz / e, w = vec2(dot(q, ax), dot(q, vec2(-ax.y, ax.x)) * e);
  float r2 = dot(w, w);
  if (r2 > 1.) discard;
  oC = vec4(vC * e * exp(-r2 * vK.x) * smoothstep(1., .5, r2) * ENC, 0.);
}`,yt=`layout(location = 0) in vec4 aP; layout(location = 1) in vec4 aM;
out vec4 vM; out vec3 vL, vV; out float vR, vS;
void main() {
  vec3 v = aP.xyz - CAM;
  float z = dot(v, FW);
  gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 0.; vM = aM; vL = vec3(0.); vV = vec3(0.); vR = 1.; vS = 1.;
  if (z < .08 || aM.z <= 0.) return;
  float pxs = SZ * .5 / TANH, cap = aM.y;
  float rp = aP.w / z * pxs * (1. + .55 * cap), coc = APER * abs(1. / z - 1. / FOC) * pxs;
  float ext = rp + coc * .8 + 1.2;
  gl_PointSize = min(2. * ext, 120.);
  vR = rp / ext; vS = clamp(rp / (coc + .6), .15, 1.);
  vV = normalize(v);
  vL = SUNE * SUNC * exp(-KD * (-aP.y) / SUNW.y) * causL(aP.xyz, .01);
  gl_Position = vec4(vec2(dot(v, RT), dot(v, UPV)) / (z * TANH), 0., 1.);
}`,Et=`in vec4 vM; in vec3 vL, vV; in float vR, vS; out vec4 oC;
vec3 env(vec3 r, vec3 L) {
  // a mirror: its upper half holds the bright surface (Snell's cone), its lower half the dark deep; one hard point of sun
  vec3 c = mix(wcol(r) * .7, (WUP * 3. + SKYH * .3) * 1.6, smoothstep(.0, .6, r.y));
  return c + L * (pow(max(dot(r, SUNW), 0.), 400.) * 90. + pow(max(dot(r, SUNW), 0.), 12.) * .6);
}
void main() {
  vec2 q = (gl_PointCoord * 2. - 1.) * vec2(1., -1.) / vR;
  float wob = vM.x, cap = vM.y;
  vec3 nl; float edge, R;
  if (cap > .5) {
    // spherical cap: a dome with a flat, rippling skirt
    vec2 c = vec2(0., -.55);
    float base = c.y + .1 + .07 * sin(q.x * 7. + wob * 3.) + .05 * sin(q.x * 13. - wob * 5.);
    vec2 dq = (q - c) / vec2(1.05 + .06 * sin(wob), .8 + .08 * cos(wob * 1.3));
    float rho = length(dq);
    edge = max(rho - 1., base - q.y);
    nl = vec3(dq, sqrt(max(1. - rho * rho, 0.)));
    R = mix(.06, 1., smoothstep(.55, .78, rho));
    R = max(R, smoothstep(.12, 0., q.y - base) * .9);
  } else {
    // small bubbles: spheres flattened and rocking as they zigzag
    vec2 dq = q / vec2(1. + .12 * wob, 1. - .14 * wob);
    float rho = length(dq);
    edge = rho - 1.;
    nl = vec3(dq, sqrt(max(1. - rho * rho, 0.)));
    R = mix(.05, 1., smoothstep(.62, .76, rho));
  }
  float soft = .9 / max(vS, .15) * fwidth(edge) + (1. - vS) * .8;
  float a = smoothstep(soft, -soft, edge) * smoothstep(1., .75, length(gl_PointCoord * 2. - 1.));
  if (a <= .001) discard;
  vec3 fw = FW, nw = normalize(nl.x * RT + nl.y * UPV - nl.z * fw);
  vec3 rr = reflect(vV, nw);
  // through the middle the bubble shows the water behind; just inside the rim the light it gathers makes a bright ring;
  // crossing a shaft the whole bubble flashes
  float rho2 = length(nl.xy), ring = exp(-pow((rho2 - .8) / .07, 2.));
  vec3 col = env(rr, vL) * R + wcol(vV) * (1. - R) * .9 + (vL * .5 + WUP * 1.5) * ring * .6 + vL * .04;
  float al = a * mix(.45, 1., R) * vM.z * mix(1., .55, 1. - vS);
  oC = vec4(col * al * ENC, al);
}`,At=`out vec4 oC;
in vec2 vUV;
void main() {
  vec3 c = texture(uS, vUV).rgb / ENC;
  float g = hf(uint(gl_FragCoord.x) * 7919u + uint(gl_FragCoord.y) * 104729u) - .5;
  oC = vec4(tmap(c) + g * .004, 1.);
}`;function Be(e,a,x){let h=Math.imul(e^2654435769,2246822507)^Math.imul(a+2135587861,3266489909)^Math.imul(x+374761393,668265263);return h^=h>>>15,h=Math.imul(h,739982445),h^=h>>>12,h=Math.imul(h,695872825),h^=h>>>15,(h>>>0)/4294967296}const qe=e=>e*e*e*(e*(e*6-15)+10);function Rt(e){const h=new Uint8Array(65536),E=new Float32Array(16*16),i=new Float32Array(16*16);for(let C=0;C<4;C++){for(let A=0;A<16*16;A++){const U=Be(A,C,11)*g;E[A]=Math.cos(U),i[A]=Math.sin(U)}for(let A=0;A<128;A++){const U=(A+.5)/128*16,W=Math.floor(U),N=U-W,X=qe(N),q=W%16*16,z=(W+1)%16*16;for(let K=0;K<128;K++){const T=(K+.5)/128*16,v=Math.floor(T),b=T-v,f=qe(b),_=v%16,te=(v+1)%16,m=E[q+_]*b+i[q+_]*N,w=E[q+te]*(b-1)+i[q+te]*N,V=E[z+_]*b+i[z+_]*(N-1),se=E[z+te]*(b-1)+i[z+te]*(N-1),J=m+(w-m)*f,ae=J+(V+(se-V)*f-J)*X;h[(A*128+K)*4+C]=I(Math.round((ae*.85+.5)*255),0,255)}}}const S=e.createTexture();return e.bindTexture(e.TEXTURE_2D,S),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,128,128,0,e.RGBA,e.UNSIGNED_BYTE,h),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),S}function pe(e,a,x,h,E,i,S,C){const A=e.createTexture();e.bindTexture(e.TEXTURE_2D,A),e.texImage2D(e.TEXTURE_2D,0,h,a,x,0,E,i,null),S===e.LINEAR_MIPMAP_LINEAR&&e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,S),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,C),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,C);const U=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,U),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,A,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:A,fb:U,w:a,h:x}}function Pt(e){if(e.__c544)return e.__c544;const a=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float"),x=(v,b)=>{const f=e.createShader(v);return e.shaderSource(f,b),e.compileShader(f),f},h={wave:[ne,G+wt],caus:[ne,G+xt],vol:[ne,G+bt],main:[ne,G+He],mote:[G+Mt,G+Tt],bub:[G+yt,G+Et],fin:[ne,G+At]},E={},i=a?Oe:Oe+`#define WPK 1
`,S=v=>{const b=e.createProgram(),f=x(e.VERTEX_SHADER,i+h[v][0]),_=x(e.FRAGMENT_SHADER,i+h[v][1]);e.attachShader(b,f),e.attachShader(b,_),e.linkProgram(b),E[v]={p:b,v:f,f:_}};for(const v in h)v!=="bub"&&S(v);e.flush();const C=Rt(e),A=v=>{if(!("uP"in E[v])){const{p:b,v:f,f:_}=E[v];if(!e.getProgramParameter(b,e.LINK_STATUS))throw new Error("544 "+v+": "+(e.getShaderInfoLog(f)||"")+(e.getShaderInfoLog(_)||"")+e.getProgramInfoLog(b));e.useProgram(b),["uN","uD","uW","uC","uV","uS"].forEach((te,m)=>{const w=e.getUniformLocation(b,te);w&&e.uniform1i(w,m)}),E[v]={p:b,uP:e.getUniformLocation(b,"uP")}}return E[v]},U=e.createVertexArray(),W=e.createTexture();e.bindTexture(e.TEXTURE_2D,W),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,32,1,0,e.RGBA,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);let N;a?N=pe(e,D,D,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.REPEAT):(N=pe(e,D,D,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST,e.REPEAT),e.bindTexture(e.TEXTURE_2D,N.tex),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST));const X=pe(e,D,D,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT),q=e.createVertexArray(),z=e.createBuffer();e.bindVertexArray(q),e.bindBuffer(e.ARRAY_BUFFER,z),e.bufferData(e.ARRAY_BUFFER,Ae*32,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,32,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,16),e.bindVertexArray(null);const K=()=>{E.bub||(S("bub"),e.flush())},T=(v,b)=>{const f="main"+(v?"R":"")+(b?"F":"");return h[f]||(h[f]=[ne,G+(v?`#define RAINON 1
`:"")+(b?`#define FOAMON 1
`:"")+He],S(f),e.flush()),f};return e.__c544={P:E,use:A,late:K,variant:T,hf:a,tN:C,tD:W,vao:U,W:N,Cm:X,bvao:q,bbuf:z,rt:{}}}We.add({num:544,name:"Open Ocean",fam:"Vistas",recipe:"Hanging in the open ocean with nothing around but light and water, sunbeams fanning down from a glittering surface into the deep. The weather, the sea and the depth change every mint, and now and then a whale sings somewhere far off. Tap to breathe out bubbles that grow, wobble and flash as they rise through the beams, drag to roll a swell over, or hold to bring a cloud over the sun and watch the beams go out.",interactive:"Tap to breathe out a burst of bubbles at that spot: they rise at their real speeds, growing as the pressure falls, the big ones wobbling caps that split, flashing as they cross the beams and ringing the mirror where they reach it. Drag to send a swell over, so the whole fan of beams sways and Snell's window slides. Hold to bring a cloud over the sun: its shadow sweeps across the fan and the beams go out, and when you let go they light again in the same sweep.",music:!0,gl:!0,fps:30,seed:0,make(e){const a=e.gl,x=e.size,h=Pt(a);let E=2654435769;for(let t=2;t<e.hash.length;t+=8)E=Math.imul(E^parseInt(e.hash.slice(t,t+8),16),2246822507)>>>0;const i=()=>{E=E+1831565813|0;let t=Math.imul(E^E>>>15,1|E);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},S=(t,s=i)=>{let o=0;for(const n in t)o+=t[n];let r=s()*o;for(const n in t)if(r-=t[n],r<0)return n;return Object.keys(t)[0]};let C=S({"Late morning":45,"High noon":25,Afternoon:20,"Low winter sun":10}),A=S({"Light chop":45,"Glassy calm":20,"Fresh breeze":25,"Long ocean swell":10}),U=S({"Oceanic blue":50,"Tropical turquoise":30,"Plankton bloom":12,"Crystal blue":8}),W=S({"Ten metres":50,"Six metres":25,"Fifteen metres":18,"Twenty-five metres":7}),N=S({"Plankton motes":55,Sparse:30,"Marine snow":15}),X=S({Clear:55,"Fair-weather cumulus":35,"Passing clouds":10}),q=S({"Low moans":50,"Rising whoops":35,"Long cries":15});e.home&&(C="Late morning",A="Light chop",U="Oceanic blue",W="Ten metres",N="Plankton motes",X="Clear",q="Low moans");let z=1013904242;for(let t=2;t<e.hash.length;t+=8)z=Math.imul(z^parseInt(e.hash.slice(t,t+8),16),3432918353)>>>0;const K=()=>{z=z+1831565813|0;let t=Math.imul(z^z>>>15,1|z);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let T=S({"Up the beams":52,Level:34,"Down the beams":14},K);e.home&&(T="Up the beams");let v=1541459225;for(let t=2;t<e.hash.length;t+=8)v=Math.imul(v^parseInt(e.hash.slice(t,t+8),16),461845907)>>>0;const b=()=>{v=v+1831565813|0;let t=Math.imul(v^v>>>15,1|v);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let f=S({Sunlit:70,Overcast:10,Sunset:8,Rain:7,Moonlight:5},b);b()<.1&&(T="Just under the surface",W="One metre"),e.home&&(f="Sunlit",T="Up the beams",W="Ten metres");let _=1359893119;for(let t=2;t<e.hash.length;t+=8)_=Math.imul(_^parseInt(e.hash.slice(t,t+8),16),2654435761)>>>0;(()=>{_=_+1831565813|0;let t=Math.imul(_^_>>>15,1|_);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296})()<.12&&!e.home&&T==="Up the beams"&&(T="Straight up"),(f==="Overcast"||f==="Rain")&&T==="Down the beams"&&(T="Level"),(f==="Overcast"||f==="Rain")&&W==="Twenty-five metres"&&T==="Level"&&(T="Up the beams"),f==="Sunset"&&(C="On the horizon"),f==="Moonlight"&&(C="Night"),e.trait("Sun",C),e.trait("Sea",A),e.trait("Water",U),e.trait("Depth",W),e.trait("Drift",N),e.trait("Sky",X),e.trait("Whale song",q),e.trait("View",T),e.trait("Weather",f);const m=new Float32Array(Ve*4),w=(t,s,o,r,n)=>{m[t*4]=s,m[t*4+1]=o,m[t*4+2]=r,m[t*4+3]=n},V={"Ten metres":10,"Six metres":6,"Fifteen metres":15,"Twenty-five metres":25,"One metre":1.5}[W],se=f==="Overcast"||f==="Rain",J=f==="Moonlight",ae={"Late morning":[42,[1,.97,.92],1],"High noon":[16,[1,.98,.95],1.08],Afternoon:[55,[1,.94,.85],.9],"Low winter sun":[66,[1,.86,.7],.72],"On the horizon":[84,[1,.62,.3],.5],Night:[38,[.75,.88,1.1],.07]}[C],Y=-.5,xe=ae[0]*Math.PI/180,Re=[Math.sin(Y)*Math.sin(xe),Math.cos(xe),Math.cos(Y)*Math.sin(xe)],be=Math.asin(Math.sin(xe)/1.3333),Z=[Math.sin(Y)*Math.sin(be),Math.cos(be),Math.cos(Y)*Math.sin(be)],O={"Oceanic blue":[[.4,.095,.03],[.45,.15,.065],.3,[.02,.15,.4],[.004,.027,.13],[.0016,.005,.024]],"Tropical turquoise":[[.36,.06,.045],[.4,.07,.065],.32,[.03,.3,.34],[.008,.1,.18],[.001,.009,.025]],"Plankton bloom":[[.42,.085,.12],[.55,.2,.24],.5,[.05,.3,.2],[.016,.13,.09],[.002,.022,.016]],"Crystal blue":[[.38,.085,.022],[.42,.09,.03],.23,[.03,.14,.42],[.006,.038,.2],[.0018,.004,.034]]}[U],St=[.006,.07,.2],gt=t=>Math.exp(-O[0][t]*(Math.max(V,6)-10)*.9),Pe=t=>t.map((s,o)=>s*gt(o)),Se={"Light chop":[1,1,.22],"Glassy calm":[.42,.25,.12],"Fresh breeze":[1.45,1.6,.25],"Long ocean swell":[.8,.85,.7]}[A],Ge=g/de,ge=i()*g,Xe=[],Ke=new Set;for(let t=0;t<Ee;t++){const s=8*Math.pow(.869,t)*(.9+.2*i()),o=ge+(t*2.39996%2.6-1.3)*(A==="Fresh breeze"?.7:1)+(i()-.5)*.3;let r=Math.round(Math.cos(o)*de/s),n=Math.round(Math.sin(o)*de/s);for(;Ke.has(r+","+n)||!r&&!n;)n+=1;Ke.add(r+","+n);const u=r*Ge,p=n*Ge,d=Math.hypot(u,p);Xe.push({kx:u,kz:p,a:.0072*Math.pow(g/d,1.05)*(.6+.8*i())*Se[0],om:Math.sqrt(we*d),ph:i()*g})}const ve=new Float32Array(32*4),F={lam:55+25*i(),an:ge+(i()-.5)*.8,a:Se[2]};F.k=g/F.lam,F.om=Math.sqrt(we*F.k),F.ph=i()*g;const P={k:g/34,a:0,at:0,an:0,ph:0};P.om=Math.sqrt(we*P.k);const re=h.hf,Nt=h.variant(f==="Rain",A==="Fresh breeze"&&!J),Me=Math.ceil(x/2),Ne=x;h.rt[Ne]||(h.rt[Ne]={V:pe(a,Me,Me,re?a.RGBA16F:a.SRGB8_ALPHA8,a.RGBA,re?a.HALF_FLOAT:a.UNSIGNED_BYTE,a.LINEAR,a.CLAMP_TO_EDGE),M:pe(a,x,x,re?a.RGBA16F:a.SRGB8_ALPHA8,a.RGBA,re?a.HALF_FLOAT:a.UNSIGNED_BYTE,a.LINEAR,a.CLAMP_TO_EDGE)});const ie=h.rt[Ne],Ye=re?1:.25,Ze=Math.tan((T==="Straight up"?55:36)*Math.PI/180);w(4,Z[0],Z[1],Z[2],1),w(5,Re[0],Re[1],Re[2],Se[1]);const je=f==="Sunset"?[.35,.75,1]:[1,1,1];w(6,O[0][0]*je[0],O[0][1]*je[1],O[0][2],O[2]*.33),m[21*4+2]=f==="Sunset"?.3:1,m[21*4+3]=A==="Fresh breeze"&&!J?1:0;const $e=t=>.2*t[0]+.7*t[1]+.1*t[2],Je={Sunlit:1,Overcast:3.6,Rain:3.1,Sunset:1.5,Moonlight:12}[f]*(se&&V>20?1.35:1),Qe=Math.pow($e(St)/$e(O[4]),.5),et=T==="Just under the surface"?2.4:T==="Straight up"?.55:T==="Up the beams"?.85:1;w(7,O[1][0],O[1][1],O[1][2],.32*Math.exp(.06*(V-10))*Je*Qe*et);const _t=Pe(O[3]).map(t=>t*.45),Ct=Pe(O[4]).map(t=>t*.55),It=Pe(O[5]).map(t=>t*.7),_e=(t,s,o)=>{const r=.2*t[0]+.7*t[1]+.1*t[2];return t.map(n=>(n+(r-n)*s)*o)},ce={Sunlit:[0,1],Overcast:[.45,.62],Rain:[.5,.5],Sunset:[.1,.5],Moonlight:[.55,.05]}[f],Ce=_e(_t,ce[0],ce[1]).map((t,s)=>t*(f==="Sunset"?[2.2,1.05,.7][s]:1)),Ie=_e(Ct,ce[0],ce[1]),Ue=_e(It,ce[0],ce[1]*(f==="Sunset"?.7:1));w(8,Ce[0],Ce[1],Ce[2],se||J||X==="Clear"?0:X==="Fair-weather cumulus"?.55:.8),w(9,Ie[0],Ie[1],Ie[2],0),w(10,Ue[0],Ue[1],Ue[2],.76);const ze={Sunlit:[[3.4,6.1,12.2],[7.4,9.2,11.6],[0,0,0]],Overcast:[[2.6,2.75,2.9],[2.3,2.45,2.6],[0,0,0]],Rain:[[1.7,1.8,1.95],[1.5,1.6,1.75],[0,0,0]],Sunset:[[.3,.45,1.05],[1.1,.8,.62],[10,4.6,1.2]],Moonlight:[[.012,.02,.05],[.03,.04,.07],[0,0,0]]}[f];w(11,...ze[0],0),w(12,...ze[1],0),w(22,...ze[2],N==="Marine snow"?3.5:0),w(13,ae[1][0],ae[1][1],ae[1][2],se?1:0),m[21*4+1]=N==="Marine snow"?1:0,m[18*4]=1,m[18*4+1]=f==="Rain"?1:0,m[18*4+2]=J?1:0;const tt=se||J?[0,0]:{Clear:[0,0],"Fair-weather cumulus":[.42,.6],"Passing clouds":[.55,.85]}[X],at=ge+.4,ot=X==="Passing clouds"?.05:.025,nt=[K()*16,K()*16];w(19,3,.25,re?Ye:Ye*.32*Math.exp(.06*(V-10))*Je*Qe*et,0);const st={"Plankton motes":1300,Sparse:420,"Marine snow":1400}[N],Ut={"Plankton motes":90,Sparse:25,"Marine snow":700}[N];m[19*4+3]=st,w(20,0,0,.009,2.6),m[21*4]=U==="Plankton bloom"?110:90;const zt=ae[2]*(V>20?1.15:1)*(f==="Overcast"?.1:f==="Rain"?.07:1),Le=Math.PI/2-be;let he=Y+.25,Q=C==="High noon"?1.2:I(Le-.24,.3,1.05);Q-=I((V-10)*.02,-.1,.3),T==="Level"?(he=Y-.45,Q=.08):T==="Down the beams"?(he=Y+Math.PI+.35,Q=.5-Le):T==="Just under the surface"?(he=Y-.35,Q=I(Le-.6,.1,.55)):T==="Straight up"?(he=Y+.6,Q=1.5):f==="Sunset"&&(he=Y-.25,Q=.78);const Lt=m[7*4+3],kt=m[21*4],Ft=T==="Down the beams",Dt=2.6*Math.exp(.03*(V-10))-1,c={x:0,y:-V,z:0,fw:[0,0,1],rt:[1,0,0],up:[0,1,0],pitch:Q},j=[0,0,0],Wt=(t,s,o,r)=>{j[0]=0,j[1]=0,j[2]=0;for(const n of[P,F]){const u=Math.cos(n.an),p=Math.sin(n.an),d=n.k*(u*t+p*o)+n.ph,M=n.a*Math.exp(n.k*Math.min(s,0));j[0]-=M*Math.cos(d)*u,j[2]-=M*Math.cos(d)*p,j[1]+=M*Math.sin(d)}return j},Vt=()=>{const t=e.view||mt,s=I(t.x||0,-4,4),o=I(t.z||0,-4,4),r=I(t.y||0,-4,4);Wt(s,-V+r,o,L),c.x=s+j[0],c.z=o+j[2],c.y=Math.min(-V+r+j[1],-.9);const n=he+(t.yaw||0),u=I(Q+(t.pitch||0),-1.5,1.5),p=Math.cos(u);c.pitch=u,c.fw=[Math.sin(n)*p,Math.sin(u),Math.cos(n)*p],c.rt=[Math.cos(n),0,-Math.sin(n)];const d=c.fw,M=c.rt;c.up=[d[1]*M[2]-d[2]*M[1],d[2]*M[0]-d[0]*M[2],d[0]*M[1]-d[1]*M[0]]},Ot=(t,s)=>{const o=t*2-1,r=1-s*2,n=[0,1,2].map(p=>c.fw[p]+(o*c.rt[p]+r*c.up[p])*Ze),u=Math.hypot(n[0],n[1],n[2]);return n.map(p=>p/u)},ee=[],$=new Float32Array(Ae*8),Ht=t=>t<7e-4?.03+210*t:t<.0035?.18+.02*(t-7e-4)/.0028:t<.006?.22:2/3*Math.sqrt(we*1.9*t),ke=(t,s,o,r,n,u,p)=>{ee.length>=Ae&&ee.shift(),ee.push({x:t,y:s,z:o,r0:r*Math.cbrt(1+-s/10.3),vx:n,vy:u,vz:p,ph:i()*g,f:2.5+3*i(),age:0,life:1,sp:i()})};let fe=[];const rt=(t,s)=>{const o=Ot(t,s);let r=.95;c.y+o[1]*r>-.8&&(r=Math.max(.6,(-.8-c.y)/Math.max(o[1],.01)));const n=[c.x+o[0]*r,c.y+o[1]*r,c.z+o[2]*r],u=110;for(let d=0;d<u;d++){const M=d<5,me=d>=5&&d<26,R=M?.013+.01*i():me?.003+.0025*i():5e-4+.0022*i()*i();fe.push({at:Te+(M?.1:0)+.6*i()*i(),p:[n[0]+(i()-.5)*.08,n[1]+(i()-.5)*.06,n[2]+(i()-.5)*.08],r:R,v:[(i()-.5)*.3,.15+.35*i(),(i()-.5)*.3]})}fe.sort((d,M)=>d.at-M.at),e.sound.hit("noise",.3,{cutoff:700,dur:.7});let p=0;for(const d of fe){if(p++>12)break;const M=I(3.26/d.r,300,2400);e.sound.hit("blip",.18+.25*Math.min(1,d.r/.006),{freq:M,at:d.at-Te+.05})}};let Te=0,it=-9,ct=0;const ht=[[0,0,-99,0],[0,0,-99,0],[0,0,-99,0],[0,0,-99,0]],Bt=t=>{for(Te+=t;fe.length&&fe[0].at<=Te;){const s=fe.shift();ke(s.p[0],s.p[1],s.p[2],s.r,s.v[0],s.v[1],s.v[2])}for(let s=ee.length-1;s>=0;s--){const o=ee[s];o.age+=t,o.r=o.r0/Math.cbrt(1+Math.max(-o.y,0)/10.3);const r=o.r>.0055,n=Ht(o.r);o.vy+=(n-o.vy)*Math.min(1,t*6),o.vx*=1-Math.min(1,t*3),o.vz*=1-Math.min(1,t*3);const u=o.r>9e-4&&!r?2.2*o.r*g*o.f:r?.03:0;if(o.ph+=t*o.f*g*(r?.35:1),o.x+=(o.vx+u*Math.cos(o.ph))*t+.04*t,o.y+=o.vy*t,o.z+=(o.vz+u*Math.sin(o.ph*.7))*t+.025*t,r&&o.r>.0075&&i()<t*.35){const p=o.r0/1.26;o.r0=p;const d=i()*g;o.vx+=Math.cos(d)*.12,o.vz+=Math.sin(d)*.12,ke(o.x,o.y,o.z,p/Math.cbrt(1+-o.y/10.3),-Math.cos(d)*.12,o.vy,-Math.sin(d)*.12),i()<.6&&e.sound.hit("blip",.08,{freq:I(3.26/p,250,900)});for(let M=0;M<3;M++)ke(o.x,o.y-.01,o.z,4e-4+8e-4*i(),(i()-.5)*.1,.05,(i()-.5)*.1)}o.y>-.03&&(o.life>=1&&o.r>.0015&&L-it>.25&&(it=L,ht[ct++&3]=[o.x,o.z,L%600,Math.min(1,o.r/.006)]),o.life-=t*8,o.life<=0&&ee.splice(s,1))}},l={on:!1,held:!1,lead:-1e4,trail:-1e4,v:9,dx:1,dz:0,u0:0},ft=()=>[c.x+Z[0]/Z[1]*-c.y,c.z+Z[2]/Z[1]*-c.y],qt=()=>{const t=i()<.5?1:-1,s=Math.hypot(c.rt[0],c.rt[2])||1;l.dx=c.rt[0]/s*t,l.dz=c.rt[2]/s*t;const o=ft();l.u0=o[0]*l.dx+o[1]*l.dz-26,(!l.on||l.trail>l.u0+40)&&(l.lead=l.u0),l.trail=-1e4,l.on=!0,l.held=!0},Gt=()=>{l.held&&(l.held=!1,l.trail=Math.min(l.u0,l.lead))},Xt=t=>{l.on&&(l.lead+=l.v*t,l.held||(l.trail+=l.v*t,l.trail>l.u0+120&&(l.on=!1,l.lead=l.trail=-1e4)))};let Fe=null;const lt=t=>{const r=Math.floor(16e4),n=new Float32Array(r),u={"Low moans":[95,160,.35],"Rising whoops":[160,520,.5],"Long cries":[300,820,.3]}[q],p=[];let d=.1;for(;d<7.5-1;){const R=i(),le=.7+1.6*i();let B,k;R<.4?(B=u[0]*(1+.3*i()),k=B*(.75+.2*i())):R<.75?(B=u[0]*(1.2+.4*i()),k=u[1]*(.8+.5*i())):(B=u[1]*(.9+.3*i()),k=B*(.7+.7*i())),p.push({t0:d,dur:le,f0:B,f1:k,nz:i()<u[2]?.4*i():0,cv:.5+i()}),d+=le+.15+.7*i()}for(const R of p){const le=Math.floor(R.t0*16e3),B=Math.floor(R.dur*16e3);let k=0,De=0;for(let ue=0;ue<B;ue++){const vt=ue/B,Qt=R.f0*Math.pow(R.f1/R.f0,Math.pow(vt,R.cv))*(1+.012*Math.sin(ue/16e3*g*5.5));k+=g*Qt/16e3;const ea=Math.pow(Math.sin(Math.PI*vt),.6);De=De*.9+(Be(ue,t,77)-.5)*.1,n[le+ue]+=ea*(Math.sin(k)+.45*Math.sin(2*k+.3)+.22*Math.sin(3*k)+.1*Math.sin(5*k))*(1+R.nz*De*8)}}for(const[R,le]of[[.13,.42],[.29,.33],[.47,.26],[.71,.2],[1.03,.14],[1.4,.1]]){const B=Math.floor(R*16e3);for(let k=r-1;k>=B;k--)n[k]+=n[k-B]*le}let M=0,me=1e-6;for(let R=0;R<r;R++)M+=(n[R]-M)*.35,n[R]=M,me=Math.max(me,Math.abs(M));for(let R=0;R<r;R++)n[R]*=.8/me;return n};let ut=8+22*i(),Kt=0;const Yt=()=>{L<ut||(ut=L+25+45*i(),Fe||(Fe=[lt(1),lt(2)]),e.sound.pcm(Fe[Kt++&1],16e3,{vel:.22+.12*i(),pan:(i()-.5)*1.2}))};let dt=0;const Zt=()=>{f!=="Rain"||L<dt||(dt=L+1.6+.8*i(),e.sound.hit("noise",.07+.04*i(),{cutoff:3500+2500*i(),dur:2.6}))};let y=null;const jt=t=>{const s=e.input,o=s.taps();for(const r of o)y?s.down||rt(r.x,r.y):y={x:r.x,y:r.y,lx:r.x,ly:r.y,t:0,moved:!1,held:!1};if(y)if(y.t+=t,s.down){const r=s.x-y.x,n=s.y-y.y;if(!y.moved&&!y.held&&Math.hypot(r,n)>.035){y.moved=!0;const u=r*c.rt[0]-n*c.fw[0],p=r*c.rt[2]-n*c.fw[2],d=Math.atan2(p,u);P.a<.15&&(P.an=d,P.ph=i()*g),e.sound.hit("noise",.3,{cutoff:220,dur:2.6}),e.sound.note(31,{dur:2.5,vel:.12,wave:"sine",attack:.6})}if(y.moved){const u=Math.hypot(s.x-y.lx,s.y-y.ly);P.at=Math.min(1.1,P.at+u*1.6)}!y.moved&&!y.held&&y.t>.45&&(y.held=!0,qt()),y.lx=s.x,y.ly=s.y}else!y.moved&&!y.held&&rt(y.x,y.y),y.held&&Gt(),y=null};let L=0,ye=0;const $t=t=>{L+=t,P.a+=(P.at-P.a)*Math.min(1,t*.9),P.at*=Math.exp(-t/9),P.ph-=P.om*t,F.ph-=F.om*t,Bt(t),Xt(t),Yt(),Zt()},H=(t,s)=>{a.activeTexture(a.TEXTURE0+t),a.bindTexture(a.TEXTURE_2D,s)},oe=(t,s,o,r)=>{const n=h.use(t);return a.bindFramebuffer(a.FRAMEBUFFER,s?s.fb:null),a.viewport(0,0,o,r),a.useProgram(n.p),m[1*4+3]=o,a.uniform4fv(n.uP,m),n},pt=()=>{if(Vt(),Ft){const r=1+Dt*I((-(c.fw[0]*Z[0]+c.fw[1]*Z[1]+c.fw[2]*Z[2])-.2)/.6,0,1);m[7*4+3]=Lt*r,m[21*4]=kt/Math.sqrt(r)}for(let r=0;r<Ee;r++){const n=Xe[r];ve[r*4]=n.kx,ve[r*4+1]=n.kz,ve[r*4+2]=n.a,ve[r*4+3]=(n.ph-n.om*L)%g}a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,h.tD),a.texSubImage2D(a.TEXTURE_2D,0,0,0,32,1,a.RGBA,a.FLOAT,ve),w(0,c.x,c.y,c.z,Ze),w(1,c.fw[0],c.fw[1],c.fw[2],x),w(2,c.rt[0],c.rt[1],c.rt[2],L%600),w(3,c.up[0],c.up[1],c.up[2],Ee),m[4*4+3]=zt,w(14,Math.cos(P.an)*P.k,Math.sin(P.an)*P.k,P.a,P.ph%g),w(15,Math.cos(F.an)*F.k,Math.sin(F.an)*F.k,F.a,F.ph%g),w(16,l.dx,l.dz,l.trail,l.lead),w(17,tt[0],tt[1],nt[0]+Math.cos(at)*ot*L,nt[1]+Math.sin(at)*ot*L);const t=ft(),s=t[0]*l.dx+t[1]*l.dz,o=l.on?I((s-l.trail+4)/14,0,1)*I((l.lead-s+4)/14,0,1):0;if(m[18*4]=1-.4*o,m[20*4]=L*.004,m[20*4+1]=L*.0015,w(23,...ht[ct-1&3]),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.disable(a.SCISSOR_TEST),a.bindVertexArray(h.vao),H(0,h.tN),H(1,h.tD),H(2,null),H(3,null),H(4,null),H(5,null),oe("wave",h.W,D,D),a.drawArrays(a.TRIANGLES,0,3),H(2,h.W.tex),oe("caus",h.Cm,D,D),a.drawArrays(a.TRIANGLES,0,3),H(3,h.Cm.tex),a.generateMipmap(a.TEXTURE_2D),oe("vol",ie.V,Me,Me),a.drawArrays(a.TRIANGLES,0,3),H(4,ie.V.tex),oe(Nt,ie.M,x,x),a.drawArrays(a.TRIANGLES,0,3),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE),oe("mote",ie.M,x,x),a.drawArrays(a.POINTS,0,st+Ut),ee.length&&h.P.bub){let r=0;for(const n of ee){const u=r*8,p=n.r>.0055;$[u]=n.x,$[u+1]=n.y,$[u+2]=n.z,$[u+3]=n.r,$[u+4]=p?n.ph:Math.sin(n.ph*2),$[u+5]=p?1:0,$[u+6]=I(n.life,0,1)*Math.min(1,n.age*8),$[u+7]=n.sp,r++}a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),oe("bub",ie.M,x,x),a.bindVertexArray(h.bvao),a.bindBuffer(a.ARRAY_BUFFER,h.bbuf),a.bufferSubData(a.ARRAY_BUFFER,0,$.subarray(0,r*8)),a.drawArrays(a.POINTS,0,r),a.bindVertexArray(h.vao)}a.disable(a.BLEND),a.flush(),H(4,null),H(5,ie.M.tex),oe("fin",null,x,x),a.drawArrays(a.TRIANGLES,0,3),H(5,null),a.bindVertexArray(null)};pt();let Jt=0;return(t,s)=>{for(s=I(s||1/30,0,.1),++Jt===2&&h.late(),jt(s),ye=Math.min(ye+s,.2);ye>=1/30;)ye-=1/30,$t(1/30);pt()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
