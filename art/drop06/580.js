// Night Dive: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/580.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Pa){Pa&&function(){"use strict";const uo={yaw:0,pitch:0,x:0,y:0,z:0},po=0,he=Math.PI*2,_e=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler2DShadow;
`,Ve=`
#ifndef BOT
#define BOT 0
#endif
#ifndef SND
#define SND 0
#endif
#if defined(GDFS) && (BOT == 2 || BOT == 4 || SND == 1)
// the ground's ripple sand: torchL's light prefix (beam, attenuation, shadow map) is worked out first, in torchPre, so
// the ripple block marches the lee shadow towards the lamp only where that light reaches the surface
#define RSHAD
float gSp, gShP; vec3 gL, gAtt;
#endif
uniform vec4 uC[20];
uniform mat4 uVP, uLVP;
uniform sampler2D uN;
uniform sampler2DShadow uSh;
#define CAMP uC[0].xyz
#define TANF uC[0].w
#define CAMF uC[1].xyz
#define TIME uC[1].w
#define CAMR uC[2].xyz
#define PXW uC[2].w
#define CAMU uC[3].xyz
#define EXPO uC[3].w
#define TPOS uC[4].xyz
#define TPOW uC[4].w
#define TDIR uC[5].xyz
#define RES uC[5].w
#define SIGT uC[6].xyz
#define SURF uC[6].w
#define SIGS uC[7].xyz
#define GPH uC[7].w
#define TCOL uC[8].xyz
#define BIO uC[8].w
#define FLW uC[9]
#define FLW2 uC[10]
#define GP uC[11]
#define MF uC[12]
#define CH uC[13]
#define CH2 uC[14]
#define RF uC[15]
#define AMB uC[16]
#define MOON uC[17]
#define FRM uC[18]
#define BW uC[19]
float sq(float x) { return x * x; }
#if BOT > 0
// the bottom beside the meadow (2026-11-11): a patch round the standpoint, baked height and material (reef, maerl) or
// procedural ripples; uB[0] = patch centre xz, half size, radius cleared of meadow
uniform sampler2D uBH, uBM;
uniform vec4 uB[2];
float botM(vec2 p) { vec2 d = abs(p - uB[0].xy) / uB[0].z; return 1. - smoothstep(.8, .97, max(d.x, d.y)); }
#endif
uint hu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hu(x) >> 8) * (1. / 16777216.); }
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
float fb3(vec2 p) { return n2(p) * .5 + n2(p * 2.03 + 17.1) * .3 + n2(p * 4.1 + 41.7) * .2; }
float field(vec2 p) {
  float f = fb3(p * MF.w + MF.xy) - MF.z + .35 * exp(-dot(p - vec2(1.4, -1.), p - vec2(1.4, -1.)) / 6.);
  vec2 d = p - CH.xy; float a = dot(d, CH.zw); float pd = abs(d.x * CH.w - d.y * CH.z);
  float w = CH2.x * (.75 + .5 * n2(p * .7 + 3.1));
#if BOT > 0
  f -= 3. * (1. - smoothstep(uB[0].w, uB[0].w + 1.8, length(p - uB[0].xy)));
#endif
  return f - CH2.y * exp(-sq(pd / w)) * smoothstep(-6., -3., a);
}
float meadow(vec2 p) { return smoothstep(-.04, .05, field(p)); }
float meadH(vec2 p) { return smoothstep(-.11, .1, field(p)); }
float reefD(vec2 p) { return dot(p, RF.xy) - CH2.z - 1.6 * (n2(p * .22 + RF.zz) - .5); }
float reefM(vec2 p) { return smoothstep(0., 1.6, reefD(p)); }
float gH(vec2 p) {
  float s = .09 * sin(p.x * .23 + GP.x) * sin(p.y * .19 + GP.y) + .05 * sin(p.x * .11 - p.y * .17 + GP.z);
  float rm = reefM(p);
  float m = meadH(p) * (1. - rm);
  float rock = rm * CH2.w * (.55 + .9 * fb3(p * .5 + 7.3)) + smoothstep(.3, 1., rm) * .35 * (n2(p * 1.7) - .5);
#if BOT == 1 || BOT == 3
  s += textureLod(uBH, (p - uB[0].xy) / (2. * uB[0].z) + .5, 0.).r;
#endif
  return s + GP.w * m * (.85 + .3 * n2(p * 1.3)) + rock;
}
vec2 flow(vec2 p, float t) {
  float ph = dot(p, FLW.xy) * FLW2.x;
  float s = sin(FLW.w * t - ph) + .3 * sin(2.13 * FLW.w * t - 1.9 * ph + 1.3) + .2 * sin(.37 * FLW.w * t + .4 * ph);
  vec2 tb = vec2(n2(p * .6 + vec2(t * .35, 3.)), n2(p * .6 + vec2(7., t * .31))) - .5;
  return FLW.xy * (FLW.z * s + .55) + tb * FLW2.y;
}
float beam(float ct) {
  float th = sqrt(max(2. - 2. * ct, 0.)) * (1. + (1. - ct) * .17) / BW.y;   // BW.y: the beam's width (pencil .26 .. flood 2.15)
  // a dive torch: a tight bright hotspot that rolls off softly (no rim), a narrow halo and a faint wide spill
  return exp(-sq(th / .15)) * 1.05 + .3 * exp(-sq(th / .3)) + .03 * exp(-sq(th / .5)) * (1. - smoothstep(.3, .78, th));
}
float shad(vec3 p) {
  vec4 q = uLVP * vec4(p, 1.);
  if (q.w <= .01) return 1.;
  q.xyz = q.xyz / q.w * .5 + .5;
  if (q.x < 0. || q.y < 0. || q.x > 1. || q.y > 1. || q.z > 1.) return 1.;
  return textureLod(uSh, vec3(q.xy, q.z - .0008), 0.);
}
// surfaces: four filtered taps, so a leaf's shadow has the soft edge a 5 cm reflector gives (no stair steps)
float shadS(vec3 p) {
  vec4 q = uLVP * vec4(p, 1.);
  if (q.w <= .01) return 1.;
  q.xyz = q.xyz / q.w * .5 + .5;
  if (q.x < 0. || q.y < 0. || q.x > 1. || q.y > 1. || q.z > 1.) return 1.;
  float s = 0.;
  for (int i = 0; i < 4; i++) { vec2 o = vec2((i & 1) == 0 ? -1.4 : 1.4, i < 2 ? -1.4 : 1.4) / 1024.; s += textureLod(uSh, vec3(q.xy + o, q.z - .0011), 0.); }
  return s * .25;
}
float gSpec = .06, gSh = 1.;
// the scene target: RGBA16F (colour, distance); on devices with no float render targets an RGBA8 fallback keeps the
// picture (sqrt-compressed colour, distance as d / (d + 4))
vec4 outC(vec3 c, float de) {
#ifdef ENC8
  return vec4(sqrt(c / (1. + c)), de / (de + 4.));
#else
  return vec4(c, de);
#endif
}
#ifdef RSHAD
void torchPre(vec3 p, float de) {
  vec3 Lv = TPOS - p; float dl = length(Lv); vec3 l = Lv / dl;
  float ang = sqrt(max(2. + 2. * dot(l, TDIR), 0.));
  float sp = (beam(dot(-l, TDIR)) + .07 * exp(-sq(ang / (.5 * BW.y))) * (1. - smoothstep(.45 * BW.y, .66 * BW.y, ang))) * TPOW * BW.x;
  gSp = sp; gL = l; gShP = 0.;
  if (sp < 1e-4) return;
  gAtt = exp(-SIGT * (dl + de)) / (dl * dl + .3);
  gShP = shadS(p + l * (.04 + .03 * dl));
}
#endif
vec3 torchL(vec3 p, vec3 N, vec3 V, float de, vec3 alb, float rough, float trans) {
#ifdef RSHAD
  vec3 l = gL; float sp = gSp;
  if (sp < 1e-4) return vec3(0.);
  vec3 att = gAtt; float sh = gShP;
#else
  vec3 Lv = TPOS - p; float dl = length(Lv); vec3 l = Lv / dl;
  // the surface response adds a soft spill (surfaces only, so the water stays black) and the mint's reach gain (BW.x)
  float ang = sqrt(max(2. + 2. * dot(l, TDIR), 0.));
  float sp = (beam(dot(-l, TDIR)) + .07 * exp(-sq(ang / (.5 * BW.y))) * (1. - smoothstep(.45 * BW.y, .66 * BW.y, ang))) * TPOW * BW.x;
  if (sp < 1e-4) return vec3(0.);
  vec3 att = exp(-SIGT * (dl + de)) / (dl * dl + .3);
  float sh = shadS(p + l * (.04 + .03 * dl));
#endif
#if BOT > 0 || SND > 0
  sh *= gSh;
#endif
  float nl = dot(N, l);
  vec3 dif = alb * max(nl, 0.) + alb * trans * max(-nl, 0.) * vec3(.85, 1., .45);
  vec3 H = normalize(l + V); float nh = max(dot(N, H), 0.); float a2 = sq(rough * rough);
  float spec = a2 / (3.14 * sq(nh * nh * (a2 - 1.) + 1.)) * gSpec * max(nl, 0.);
  return TCOL * sp * att * sh * (dif + spec);
}
vec3 ambL(vec3 p, vec3 N, float de, vec3 alb) {
  return alb * AMB.rgb * (.3 + .7 * max(N.y, 0.)) * exp(-SIGT * (max(SURF - p.y, 0.) + de));
}
`,Sa=_e+Ve+`
layout(location = 0) in vec4 aA;
layout(location = 1) in vec4 aB;
uniform vec4 uG;
out vec3 vP; out vec3 vN; out vec4 vU; out float vL; out vec3 vW;
// the whole clump bends together: the surge at the clump's rhizome (base position), no per-leaf phase
vec2 leanAt(float si, vec2 td, vec2 F, float flut) {
#ifdef FOR
  // the algal forest (age 3 + kind + the stem's height): aB.y < 0 is a bush's stem, stiff, leaning as a whole with the
  // surge at its holdfast; the rest are its branches, rising from the stem's top into a round crown (Cystoseira) or long
  // and arching over (Sargassum), leaning with the stem, the tips flicking last
  if (aB.z > 2.5) {
    vec2 nd = vec2(-td.y, td.x);
    if (aB.y < 0.) return F * .25 + td * .03;
    bool sg = aB.z >= 4.;
    float sf = (sg ? .22 : .06) + .1 * fract(aB.w * 7.31), up = smoothstep(sf - .04, sf + .15, si);
    return td * (sg ? aB.y + 1.3 * si * si * up : aB.y * (1.1 - .3 * si) + .2 * si * si) + nd * (sg ? .2 : .4) * up * sin(si * 4.5 + aB.w * 31.)
      + F * (.25 + .3 * si * si) + .1 * FLW.z * sin(TIME * FLW.w * 1.7 + aB.w * 6. - si * 1.5) * si * si * nd;
  }
#endif
  if (aB.z > 1.5) return td * 9. + 3.6 * sin(si * (1.6 + 2.2 * aB.w) + aB.w * 20.) * vec2(-td.y, td.x);   // a shed leaf lying curled on the sand
  return td * (aB.y + .1 * si + .25 * aB.z * si * si) + F * (2.7 * pow(si, 1.25))
    + .035 * sin(TIME * 1.3 + si * 4. + flut) * vec2(-td.y, td.x);
}
void main() {
  int seg = gl_VertexID >> 1; float side = float(gl_VertexID & 1);
  float NS = uG.x; float s = float(seg) / NS;
  vec3 b = aA.xyz; float L = aA.w;
  vec2 td = vec2(cos(aB.x), sin(aB.x));
  vec2 F = flow(b.xz, TIME);
#ifdef FOR
  if (aB.z > 2.5 && aB.y >= 0.) { float st = fract(aB.z) * (.55 + .45 * fract(aB.w * 5.13)); b += vec3(F.x * .25 * st, st, F.y * .25 * st); }
#endif
  float flut = dot(b.xz, vec2(3.1, 2.3));
  vec3 p = b; float ds = L / NS;
  int ns = int(NS);
  float thM = aB.z > 1.5 ? 1.565 : 1.5;
#ifdef FOR
  if (aB.z > 2.5) thM = 2.2;
#endif
  for (int i = 0; i < ns; i++) {
    if (i >= seg) break;
    vec2 ln = leanAt((float(i) + .5) / NS, td, F, flut);
    float th = min(length(ln), thM); vec2 hd = ln / max(length(ln), 1e-4);
    p += vec3(hd.x * sin(th), cos(th), hd.y * sin(th)) * ds;
  }
  vec2 ln = leanAt(min(s, 1.), td, F, flut);
  float th = min(length(ln), thM); vec2 hd = ln / max(length(ln), 1e-4);
  vec3 d = vec3(hd.x * sin(th), cos(th), hd.y * sin(th));
  vec3 w0 = vec3(-hd.y, 0., hd.x);
  float tw = aB.z > 1.5 ? 0. : (aB.w - .5) * 2.4 * s + .3 * sin(aB.w * 40.) * s;
  vec3 w = w0 * cos(tw) + cross(d, w0) * sin(tw);
  // a flat ribbon about 1 cm wide with a blunt, worn end (no taper to a point)
  float wd = .0105 * (aB.z > 1.5 ? 1.25 : uG.y) * (s < .05 ? .8 : 1.) * (s > .99 ? .8 : 1.);
#ifdef FOR
  // a branch: a short thin stalk, then the brush, widest a third of the way up and rounded at the end (its branchlets
  // are cut in the fragment shader; seen from too far for that, it is drawn narrower); it turns about its length so the
  // crown shows faces every way. A stem: finger-thick, near black.
  if (aB.z > 2.5) {
    bool sg = aB.z >= 4.;
    float sf = (sg ? .22 : .06) + .1 * fract(aB.w * 7.31), u = clamp((s - sf) / (1. - sf), 0., 1.);
    float cw = (sg ? .022 : .046) * (.8 + .4 * fract(aB.w * 13.7));
    wd = max(.004 * (1. - .4 * u), cw * smoothstep(0., .25, u) * sqrt(max(1. - sq(max(u - .35, 0.) / .66), 0.)));
    if (aB.y < 0.) wd = sg ? .007 : .013;
    tw = (aB.w - .5) * 3.4 + (fract(aB.w * 3.7) - .5) * 4. * s;
    w = w0 * cos(tw) + cross(d, w0) * sin(tw);
  }
#endif
#ifndef SHADOW
  float dist = length(p - CAMP);
  wd = max(wd, PXW * dist * 1.1);
#endif
  vec3 pos = p + w * (side - .5) * wd;
  vP = pos; vN = normalize(cross(d, w)); vU = vec4(s, side, aB.z, aB.w); vL = L; vW = w;
#ifdef FOR
  if (aB.z > 2.5 && aB.y < 0.) vU.z = 2.75;
#endif
  gl_Position = uVP * vec4(pos, 1.);
}`,mo=_e+Ve+`
in vec3 vP; in vec3 vN; in vec4 vU; in float vL; in vec3 vW;
uniform vec4 uG;
out vec4 o;
void main() {
  vec3 V = CAMP - vP; float de = length(V); V /= de;
  vec3 N = normalize(vN); if (dot(N, V) < 0.) N = -N;
#ifdef FOR
  if (vU.z > 2.5) {
    // a frond: the stalk near black and woody, the lower crown dark brown and furred, the crown olive-gold to amber with
    // the growing tips paler and glowing where the torch is behind them; matt, no wet sheen
    float s = vU.x, sd = vU.w, xw = vU.y - .5, sm = s * vL;
    bool sg = vU.z >= 4., stem = vU.z < 2.9;
    float sf = (sg ? .22 : .06) + .1 * fract(sd * 7.31), u = stem ? 0. : clamp((s - sf) / (1. - sf), 0., 1.);
    float cw = (sg ? .022 : .046) * (.8 + .4 * fract(sd * 13.7));
    float wdm = max(.004 * (1. - .4 * u), cw * smoothstep(0., .25, u) * sqrt(max(1. - sq(max(u - .35, 0.) / .66), 0.)));
    float ax = abs(xw) * wdm, fp = PXW * de;            // metres from the branch's axis; metres a pixel
    // the branchlets: short spines on both sides of the axis, slanted up, of uneven length (a bottle-brush); cut where a
    // spine is a few pixels long; further off only the outline is broken
    float k = sm / (sg ? .012 : .0095) + (xw < 0. ? .5 : 0.) - ax * (sg ? 25. : 55.), ki = floor(k);
    float ln = .5 + .5 * hf(uint(ki + 4000.) * 7919u + uint(sd * 65536.) + (xw < 0. ? 77u : 0u));
    float sp = fract(k), hw = wdm * .5 * ln;
    bool keep = stem || ax < .0022 || u < .02 || (ax < hw && sp < .6 * (1. - ax / max(hw, 1e-4)) + .1);
    if (fp < .0034 ? !keep : (!stem && u > .02 && abs(xw) > .2 + .18 * n2(vec2(sm * 70. + sd * 50., xw > 0. ? 3. : 9.)))) discard;
    N = normalize(N + normalize(vW) * xw * 1.8);       // the brush is round across
    vec3 cr = sg ? vec3(.3, .22, .075) : vec3(.34, .24, .065);
    cr *= .78 + .44 * n2(vec2(sm * 19. + sd * 40., xw * 1.5 + sd * 9.));
    vec3 alb = mix(vec3(.13, .08, .032), cr, smoothstep(.1, .45, u));
    alb = mix(vec3(.045, .028, .014) * (.7 + .6 * n2(vec2(sm * 90., sd * 30. + xw * 4.))), alb, smoothstep(.0, .06, u));
    alb = mix(alb, vec3(.46, .37, .15), smoothstep(.72, 1., u) * .75);
    gSpec = .03;
    float trn = mix(.3, 1.7, smoothstep(.3, 1., u)) * step(.02, u);
    vec3 c = torchL(vP, N, V, de, alb, .6, trn) + ambL(vP, N, de, alb);
    if (uG.w > 0.) c += vec3(.02, .3, .26) * smoothstep(.85, 1., u) * (.006 + .2 * pow(n2(vec2(TIME * .8 + sd * 37., sd * 91.)), 6.)) * exp(-SIGT * de);
    o = outC(c, de);
  } else {
#endif
  // the blade is slightly cupped across its width with thickened margins: the torch runs a bright line down one edge
  float xw = vU.y - .5;
  float nearL = 1. - smoothstep(1.5, 4., de);
  N = normalize(N + normalize(vW) * (xw * 1.1 + sign(xw) * .5 * smoothstep(.36, .5, abs(xw))) * nearL);
  float s = vU.x, age = vU.z, sd = vU.w;
  float sm = s * vL;                                   // metres along the leaf
  // three ages: the young inner leaves clean bright green, the middle ones olive, the old outer ones brown-green; the
  // season (uG.z: summer, spring, autumn) sets how clean they are
  float sea = uG.z, dead = step(1.5, age); age = min(age, 1.);
  vec3 alb = age < .5 ? mix(vec3(.11, .37, .06), vec3(.2, .31, .07), age * 2.) : mix(vec3(.2, .31, .07), vec3(.28, .23, .08), age * 2. - 1.);
  if (sea > 1.5) alb = mix(alb, vec3(.25, .2, .08), .3);
  // fouled tips: a brown fuzz of filamentous epiphytes over the last part of older leaves, then a dead brown end
  float tipZ = smoothstep(vL - .05 - (sea > .5 && sea < 1.5 ? .08 : .45) * age, vL, sm);
  if (tipZ > 0.) alb = mix(alb, vec3(.13, .095, .04) * (.7 + .6 * n2(vec2(sm * 90., vU.y * 3. + sd * 31.))), tipZ * (.3 + .7 * age));
  alb = mix(alb, vec3(.09, .06, .03), smoothstep(vL - .025, vL, sm) * age);
  // a pale crust of bryozoans and coralline algae in soft patches over the outer part of old leaves
  float epd = smoothstep(.35, .8, s) * age;
  if (epd > .05) {
    float ep = n2(vec2(sm * 38. + sd * 50., vU.y * 1.3 + sd * 13.)) * .7 + n2(vec2(sm * 140., vU.y * 4. + sd * 7.)) * .3;
    alb = mix(alb, mix(vec3(.6, .58, .52), vec3(.6, .4, .42), smoothstep(.4, .6, n2(vec2(sm * 11. + sd * 9., sd * 23.)))), smoothstep(.5, .75, ep) * epd * (sea > .5 && sea < 1.5 ? .15 : .85));
  }
  // the dead sheaths at the base of the shoot: brown fibre
  alb = mix(vec3(.12, .085, .04), alb, smoothstep(.03, .1, sm));
  // fine parallel veins and slow mottling along the leaf
  alb *= .92 + .08 * sin(vU.y * 44. + sd * 9.);
  alb *= .8 + .4 * n2(vec2(sm * 9. + sd * 31., sd * 57.));
  if (dead > .5) { alb = vec3(.21, .15, .08) * (.65 + .7 * n2(vec2(sm * 14. + sd * 31., sd * 17.))); alb = mix(alb, vec3(.42, .38, .32), smoothstep(.72, .8, n2(vec2(sm * 60., sd * 40.))) * .6); }
  float ao = dead > .5 ? 1. : .2 + .8 * smoothstep(0., .45, sm);
  // living blades are thin and glow yellow-green with the torch behind them; fouled, dead tips pass little light
  float trn = dead > .5 ? .15 : (2.1 - 1.2 * age) * (1. - .8 * tipZ);
  gSpec = .05 + .1 * nearL;                           // a waxy cuticle: sheen streaks along the cupped blade
  vec3 c = torchL(vP, N, V, de, alb * ao, .32, trn) + ambL(vP, N, de, alb) * ao;
  // a Noctiluca bloom: every leaf tip working in the surge is edged with blue-green light, in and out of the beam
  if (uG.w > 0. && dead < .5) c += vec3(.02, .3, .26) * smoothstep(vL - .06, vL, sm) * (.006 + .2 * pow(n2(vec2(TIME * .8 + sd * 37., sd * 91.)), 6.)) * exp(-SIGT * de);
  o = outC(c, de);
#ifdef FOR
  }
#endif
}`,_a=_e+Ve+`
layout(location = 0) in vec2 aP;
uniform vec4 uO;
out vec3 vP; out vec3 vN;
uniform int uZ;   // never set (0): keeps the height loop rolled, one gH expansion instead of three
void main() {
  vec2 xz = aP + uO.xy;
#ifdef SHADOW
  float h = gH(xz);
#else
  float e = max(.04, length(aP) * .012), h = 0., hx = 0., hz = 0.;
  for (int i = 0; i < 3 + uZ; i++) {
    float g = gH(xz + (i == 0 ? vec2(0.) : i == 1 ? vec2(e, 0.) : vec2(0., e)));
    if (i == 0) h = g; else if (i == 1) hx = g; else hz = g;
  }
  vN = normalize(vec3(h - hx, e, h - hz));
#endif
  vP = vec3(xz.x, h, xz.y);
  gl_Position = uVP * vec4(vP, 1.);
}`,vo=_e+`#define GDFS
`+Ve+`
in vec3 vP; in vec3 vN;
out vec4 o;
uniform vec4 uO;
uniform int uZ;
#if BOT == 4
// a silt flat (2026-11-11): soft mud with a low swell, the cones of burrowing shrimps each with a crater at the top,
// pairs of worm holes, a snail's winding furrow with its two low berms. Returns height in metres (A fades it out far off).
float ripH(vec2 p, float A) {
  float h = .005 * (n2(p * 1.9 + 5.) - .5) + .0016 * n2(p * 7. + 2.) + .0006 * n2(p * 23. + 8.);
  vec2 q = mat2(.8, .6, -.6, .8) * p;
  vec2 c = q / .66, ci = floor(c); uint bh = hu(uint(int(ci.x) + 5000) * 7919u + uint(int(ci.y) + 5000) + 313u);
  if (hf(bh) < .55) {
    vec2 bq = q - (ci + .22 + .56 * vec2(hf(bh + 1u), hf(bh + 2u))) * .66;
    float R = .08 + .12 * hf(bh + 3u), d = length(bq * vec2(1., .8 + .3 * hf(bh + 5u))) * (1. + .3 * (n2(bq * 35. + float(bh & 255u)) - .5));
    float cn = clamp(1. - d / R, 0., 1.);
    h += R * (.36 + .2 * hf(bh + 4u)) * cn * cn * (3. - 2. * cn) - R * .3 * smoothstep(R * .24, R * .07, d);
  }
  vec2 c2 = p / .41, cj = floor(c2); uint wh = hu(uint(int(cj.x) + 3000) * 6271u + uint(int(cj.y) + 3000) + 71u);
  if (hf(wh) < .22) {
    vec2 w0 = (cj + .25 + .5 * vec2(hf(wh + 1u), hf(wh + 2u))) * .41, wd = vec2(cos(hf(wh + 3u) * 6.28), sin(hf(wh + 3u) * 6.28)) * (.025 + .025 * hf(wh + 4u));
    float r = .005 + .004 * hf(wh + 5u), d = min(length(p - w0 - wd), length(p - w0 + wd));
    h -= .002 * smoothstep(r * 3.5, r, d) + .0025 * smoothstep(r, r * .4, d);
  }
  vec2 rd = normalize(FLW.yx * vec2(1., -1.) + vec2(.3, .2)), rq = vec2(-rd.y, rd.x);
  float x = dot(p, rd), y = dot(p, rq), bi = floor(y / 1.7);
  float tc = (bi + .5) * 1.7 + .35 * sin(x * 1.3 + bi * 2.1) + .5 * (n2(vec2(x * .8, bi * 3.)) - .5), dd = y - tc;
  float tv = step(.4, fract(sin(bi * 12.9898) * 43758.5)) * smoothstep(.35, .5, n2(vec2(x * .35, bi * 7. + 3.)));
  h += tv * (.0025 * exp(-sq((abs(dd) - .016) / .007)) - .006 * exp(-sq(dd / .009)));
  return h * A / .011;
}
#elif BOT == 2 || SND == 1
// wave ripples in the sand, ~10 cm apart: a sharp crest, a rounded trough; two sets a little turned swap over in
// patches so the crests bend, fork and join, and the amplitude dies away in places. Felt balls of seagrass fibre lie
// in the troughs (BOT 2). Returns height in metres.
float ripH(vec2 p, float A) {
  vec2 rd = normalize(FLW.xy), rq = vec2(-rd.y, rd.x);
  float w = n2(p * .8 + 3.) * 1.3 + n2(p * 2.2 + 11.) * .7 + n2(p * 5.3 + 27.) * .35;
  float ph = dot(p, rd) * 10.5 + w + .45 * sin(dot(p, rq) * 2.3 + n2(p * .45) * 5.);
  float ph2 = dot(p, rd * .93 + rq * .37) * 8.6 + w * .7 + 2.6 * n2(p * .9 + 31.);
  float t1 = abs(fract(ph) * 2. - 1.), t2 = abs(fract(ph2) * 2. - 1.);
  float h = mix(pow(t1, 1.7), pow(t2, 1.7), smoothstep(.4, .6, n2(p * 1.1 + 40.)));
  // crests run out and restart: their height breaks along the crest line, not only in broad patches
  h *= (.2 + .8 * smoothstep(.2, .6, n2(p * .7 + 9.))) * (.35 + .65 * smoothstep(.25, .6, n2(p * vec2(2.6, 2.6) + rq * 3. + 51.)));
  h *= A;
#if BOT == 2
  vec2 c = p / .42, ci = floor(c); uint bh = hu(uint(int(ci.x) + 4096) * 7919u + uint(int(ci.y) + 4096) + 911u);
  if (hf(bh) < .4) {
    vec2 bc = (ci + .25 + .5 * vec2(hf(bh + 1u), hf(bh + 2u))) * .42;
    float bp = dot(bc, rd) * 10.5 + n2(bc * .8 + 3.) * 1.3 + n2(bc * 2.2 + 11.) * .7 + n2(bc * 5.3 + 27.) * .35 + .45 * sin(dot(bc, vec2(-rd.y, rd.x)) * 2.3 + n2(bc * .45) * 5.);
    bc += rd * (.5 - fract(bp)) / 10.5;                              // rolled into the nearest trough
    float r = .022 + .018 * hf(bh + 3u);
    vec2 q = p - bc; float d = length(q / vec2(1., .82 + .2 * hf(bh + 4u))) * (1. + .14 * (n2(q * 160. + float(bh & 255u)) - .5));
    h = max(h, r * .85 * sqrt(max(1. - sq(d / r), 0.)) - .002);
  }
#endif
  return h;
}
#endif
#if BOT == 1 || BOT == 3 || BOT == 5
vec2 ngr(vec2 q) { float a = n2(q); return vec2(n2(q + vec2(.3, 0.)) - a, n2(q + vec2(0., .3)) - a); }
#endif
void main() {
  vec3 V = CAMP - vP; float de = length(V); V /= de;
#ifdef RSHAD
  torchPre(vP, de);
#endif
  vec2 p = vP.xz;
  vec2 rd = normalize(vec2(FLW.x, FLW.y));
  float rm = reefM(p), m0 = 0., m1 = 0.;
  for (int i = 0; i < 2 + uZ; i++) { float g = meadow(i == 0 ? p : p + rd * .5); if (i == 0) m0 = g; else m1 = g; }
  vec3 N = normalize(vN);
  float mm = max(m0, smoothstep(.0, .3, m0) * smoothstep(.97, .85, N.y)) * (1. - rm);
  float fw = clamp(de * .03, 0., 1.);
  // sand: wave ripples, grains, flecks
  float rph = dot(p, rd) * 62.8 + 1.4 * sin(dot(p, vec2(-rd.y, rd.x)) * 1.7 + n2(p * .4) * 6.) + 3. * n2(p * .7) + 4.2 * n2(p * 3.1) + 2.2 * n2(p * 7.3 + 5.);
  // a second, slightly turned set from the last storm: where they cross, crests fork and break (no clean corduroy)
  float rph2 = dot(p, vec2(rd.x * .94 - rd.y * .34, rd.y * .94 + rd.x * .34)) * 51. + 4. * n2(p * .9 + 13.);
  float rip = (1. - smoothstep(.0, .5, fw)) * (1. - mm) * (1. - smoothstep(.0, .3, rm)) * smoothstep(.85, .97, N.y);
  float rw = mix(cos(rph), cos(rph2), smoothstep(.35, .65, n2(p * .7 + 40.))); rw = sign(rw) * pow(abs(rw), .7);
  float rpm = rip * (.15 + .85 * smoothstep(.15, .8, n2(p * 1.3 + 9.))) * (.25 + .75 * smoothstep(.3, .55, n2(p * 4.6 + 21.)));
  N = normalize(N + vec3(rd.x, 0., rd.y) * .45 * rw * rpm);
  vec3 sand = vec3(.52, .47, .38) * (.8 + .4 * n2(p * 95.)) * (.82 + .36 * n2(p * 6.));
  // soft mottling on a rotated, warped domain so the noise lattice never shows as blocks
  vec2 mq = mat2(.8, .6, -.6, .8) * p + (vec2(n2(p * 5.3 + 2.), n2(p * 4.7 + 19.)) - .5) * .22;
  float mt = n2(mq * 19. + 4.) * .5 + n2(mq.yx * 47.) * .3 + n2(mq * 103. + 11.) * .2;
  sand *= 1. + (mt - .5) * .5 * (1. - fw);
  float gfade = 1. - smoothstep(.2, .6, PXW * de * 110. / max(V.y, .2));
  // detritus settles in the ripple troughs; grey-brown silt patches; scattered shell grit and dark grains
  float tro = smoothstep(.2, -.7, sin(rph)) * rpm;
  sand = mix(sand, vec3(.2, .16, .1) * (.7 + .6 * mt), tro * .4);
  sand *= .62 + .38 * smoothstep(.25, .7, n2(p * 1.6 + 23.) * .6 + n2(p * 4.3 + 5.) * .4);
  float gq = n2(mq * 83. + 3.) * n2(mq.yx * 37. + 8.);
  sand = mix(sand, vec3(.85, .8, .7), smoothstep(.42, .55, gq) * gfade * .8);
  sand *= 1. - .4 * smoothstep(.72, .82, n2(mq.yx * 110. + 41.)) * gfade;
  // burrows: a dark hole in a raised ring of cast sand
  {
    vec2 bc = p / .45; vec2 bi = floor(bc); uint bh = hu(uint(int(bi.x) + 8192) * 6271u + uint(int(bi.y) + 8192) + 77u);
    if (hf(bh) < .3) {
      vec2 bq = (fract(bc) - (vec2(hf(bh + 1u), hf(bh + 2u)) * .6 + .2)) * .45;
      float br = .006 + .01 * hf(bh + 3u), bd = length(bq);
      float ring = exp(-sq((bd - br * 2.2) / (br * 1.3)));
      sand *= mix(1., .08, smoothstep(br, br * .55, bd)) * (1. + .25 * ring);
      N = normalize(N + vec3(bq.x, 0., bq.y) / max(bd, 1e-4) * (ring * .5 - smoothstep(br * 1.6, br, bd) * .6));
    }
  }
  // shells
  vec2 sc = p / .32; vec2 ci = floor(sc); uint h = hu(uint(int(ci.x) + 4096) * 9973u + uint(int(ci.y) + 4096));
  if (hf(h) < .38) {
    vec2 ce = vec2(hf(h + 1u), hf(h + 2u)) * .7 + .15; float an = hf(h + 3u) * 6.28;
    vec2 q = (fract(sc) - ce) * .32; q = mat2(cos(an), sin(an), -sin(an), cos(an)) * q;
    float rr = .006 + .018 * hf(h + 4u);
    float e = length(q / vec2(rr, rr * .72));
    if (e < 1.) {
      float rib = .8 + .2 * sin(atan(q.y / (abs(q.x) + 1e-4)) * 14.);
      sand = mix(sand, vec3(.74, .68, .58) * rib * (hf(h + 5u) < .3 ? vec3(.8, .6, .55) : vec3(1.)), (1. - mm) * smoothstep(1., .8, e));
      N = normalize(N + vec3(q.x, 0., q.y) / rr * .6 * (1. - mm));
    }
  }
  // dead leaves washed against the meadow edge
  float edge = smoothstep(.0, .25, m1) * (1. - mm);
  vec2 lq = mat2(rd.x, rd.y, -rd.y, rd.x) * p;
  float lf = smoothstep(.66, .7, n2(lq * vec2(3.5, 70.) + 3.)) * smoothstep(.3, .6, n2(p * 2.1));
  sand = mix(sand, vec3(.2, .13, .06) * (.8 + .4 * n2(lq * 40.)), lf * (.08 + .92 * edge));
  // matte: dead sheaths and fibre
  vec3 mat = vec3(.1, .075, .04) * (.55 + .9 * n2(p * vec2(9., 52.) + vec2(0., vP.y * 30.)));
  float bank = smoothstep(.97, .8, N.y);
  // the bank face: layered dead sheaths (fine horizontal bands) torn by hanging rhizome fibre (vertical streaks)
  float fib = n2(vec2((p.x - p.y) * 70., vP.y * 6.)) * n2(vec2((p.x + p.y) * 23., vP.y * 3. + 5.));
  mat = mix(mat, vec3(.13, .09, .05) * (.7 + .4 * n2(vec2(p.x + p.y, vP.y) * vec2(25., 160.) + n2(p * 9.) * 3.)) * (.65 + .8 * fib), bank);
  // far meadow (no leaf instances out there): the canopy seen as dark streaks
  float far = smoothstep(FLW2.w - 1.6, FLW2.w, length(p - uO.xy));
  mat = mix(mat, vec3(.09, .14, .05) * (.6 + .8 * n2(p * 9.)), far);
  vec3 alb = mix(sand, mat, mm);
  // reef rock: coralline crust, turf, sponges, urchins
  if (rm > .01) {
    float a = n2(p * 3.1 + 2.), b = n2(p * 7.3 + 9.), cc = n2(p * 1.4 + 31.);
    vec3 rock = mix(vec3(.20, .17, .1), vec3(.42, .25, .3), smoothstep(.4, .65, a));
    rock = mix(rock, vec3(.62, .48, .1), smoothstep(.72, .78, b) * .9);
    rock = mix(rock, vec3(.6, .12, .06), smoothstep(.74, .8, n2(p * 5.1 + 77.)) * .9);
    rock *= .55 + .7 * n2(p * 40.) * n2(p * 13. + 3.);
    float ur = smoothstep(.78, .85, n2(p * 9. + 50.));
    rock = mix(rock, vec3(.03, .02, .03), ur);
    vec2 g = vec2(n2(p * 18. + .05) - n2(p * 18. - vec2(.05, 0.)), n2(p * 18. + vec2(0., .05)) - n2(p * 18. - vec2(0., .05)));
    N = normalize(mix(N, normalize(N + vec3(g.x, 0., g.y) * 6. * (1. - fw)), smoothstep(.05, .4, rm)));
    alb = mix(alb, rock, smoothstep(.05, .35, rm));
    alb *= .7 + .3 * cc;
  }
  float rough = mix(.8, .5, rm);
  float fpx = PXW * de / max(V.y, .25);                 // metres of ground under one pixel
  float aoB = 1.;
#if BOT == 1 || BOT == 3
  {
    float pm = botM(p);
    if (pm > .001) {
      vec2 bu = (p - uB[0].xy) / (2. * uB[0].z) + .5;
      vec4 bh = texture(uBH, bu), bm = texture(uBM, bu);
      float rk = 1. - bm.a, nf = 1. - smoothstep(.002, .012, fpx);
      vec3 Nb = normalize(vec3(-bh.g, 1., -bh.b));
      vec3 ra;
#if BOT == 1
      // limestone: rounded, pitted, a few fissures; light warm grey with hard small shadows
      vec2 g = ngr(p * 9. + 3.) * .8;
      float fis = smoothstep(.022, .0, abs(n2(p * 2.6 + 61.) - .5)) * smoothstep(.45, .6, n2(p * .9 + 13.)) * rk;
      ra = vec3(.5, .47, .41) * (.8 + .32 * n2(p * 4.3 + vP.y * 3. + 2.)) * (.88 + .24 * n2(vec2(p.x + p.y, vP.y) * 37.) * nf);
      // coralline crust on the tops and lit sides: pink to mauve, paler growing rims, faintly knobbly
      float cr = bm.r, rim = smoothstep(.25, .45, cr) * (1. - smoothstep(.5, .8, cr));
      vec3 crc = mix(vec3(.5, .34, .37), vec3(.45, .32, .4), n2(p * 3.1 + 17.)) * (.85 + .3 * n2(p * 23. + 4.));
      ra = mix(ra, mix(crc, vec3(.64, .53, .53), rim * .5), smoothstep(.25, .6, cr));

      // brown-gold algal turf: fuzzy, matt
      float tf = bm.g * (1. - smoothstep(.3, .5, cr));
      ra = mix(ra, mix(vec3(.34, .27, .12), vec3(.3, .29, .14), n2(p * 5. + 8.)) * (.7 + .6 * n2(p * 140.) * nf + .3 * (1. - nf)), smoothstep(.15, .6, tf) * .9);
      // sponge: thin matt skins of orange and red under the overhangs, lobed at the edge, pores on low mounds
      float spg = bm.b * smoothstep(.35, .65, n2(p * 6. + 23.) * .7 + bm.b * .5);
      vec3 spc = n2(p * 1.3 + 71.) > .5 ? vec3(.72, .27, .07) : vec3(.6, .1, .07);
      ra = mix(ra, spc * (.85 + .2 * n2(p * 55.)), smoothstep(.3, .5, spg));
      { vec2 c = p / .045, ci = floor(c); uint h = hu(uint(int(ci.x) + 9000) * 6271u + uint(int(ci.y) + 9000) + 3u);
        vec2 q = (fract(c) - .5 - (vec2(hf(h), hf(h + 1u)) - .5) * .4) * .045; float d = length(q);
        float pr = smoothstep(.3, .5, spg) * nf * step(.6, hf(h + 2u));
        ra *= 1. - .6 * smoothstep(.004, .0022, d) * pr;
        g -= q / max(d, 1e-4) * exp(-sq(d / .012)) * .9 * pr; }
      ra *= 1. - .8 * fis;
      // fine relief from three planes (so the steep faces are not streaked): pitted, granular, hard small shadows
      { vec3 P3 = vP * 16.; vec3 an = abs(Nb); an /= an.x + an.y + an.z;
        vec2 gx = ngr(P3.zy + 5.) * 2.2 + ngr(P3.zy * 3.3 + 1.) * 1.1 * nf, gy = ngr(P3.xz) * 2.2 + ngr(P3.xz * 3.3 + 7.) * 1.1 * nf, gz = ngr(P3.xy + 9.) * 2.2 + ngr(P3.xy * 3.3 + 3.) * 1.1 * nf;
        vec3 d3 = vec3(0., gx.y, gx.x) * an.x + vec3(gy.x, 0., gy.y) * an.y + vec3(gz.x, gz.y, 0.) * an.z;
        Nb = normalize(Nb - d3 * (.55 + .5 * smoothstep(.3, .6, cr)) * rk);
        float pit = smoothstep(.62, .78, n2(P3.xz * 2.1 + P3.y * .7 + 13.)) * nf * rk * (1. - smoothstep(.3, .6, cr));
        ra *= 1. - .45 * pit; aoB *= 1. - .3 * pit; }
      Nb = normalize(Nb + vec3(-g.x, 0., -g.y) * .5 * rk);
#else
      // cobbles and boulders: each stone its own rock (pale limestone, brown sandstone, dark grey-green basalt, a few
      // speckled granites), matt and finely grained; a brown film of diatoms and turf on the tops, coralline crust in
      // pink-mauve patches on the highest; silt and gravel in the hollows, the gaps dark (the bake's openness)
      float sid = bm.b;
      vec3 sc = mix(vec3(.56, .53, .47), vec3(.47, .36, .26), smoothstep(.25, .4, sid));
      sc = mix(sc, vec3(.22, .23, .21), smoothstep(.55, .68, sid));
      sc = mix(sc, vec3(.5, .48, .44), smoothstep(.84, .92, sid));
      sc *= mix(1., .7 + .5 * smoothstep(.45, .65, n2(p * 420. + 9.)), smoothstep(.84, .92, sid) * (1. - smoothstep(.0012, .003, fpx)));   // granite grain
      sc *= (.84 + .3 * n2(p * 21. + sid * 40.)) * (.92 + .16 * n2(p * 85.) * nf);
      float fm = bm.g;
      sc = mix(sc, vec3(.32, .26, .15) * (.75 + .45 * n2(p * 37. + 7.)), smoothstep(.3, .8, fm) * .45);
      float cr = bm.r, rim = smoothstep(.3, .5, cr) * (1. - smoothstep(.55, .85, cr));
      vec3 crc = mix(vec3(.53, .36, .39), vec3(.47, .34, .41), n2(p * 4.1 + 17.)) * (.86 + .26 * n2(p * 58. + 4.) * nf);
      sc = mix(sc, mix(crc, vec3(.64, .55, .55), rim * .5), smoothstep(.3, .6, cr + .3 * (n2(p * 47. + 5.) - .5) * nf) * .85);
      ra = sc;
      vec2 g = (ngr(p * 31. + 3.) * .7 + ngr(p * 80.) * .6 * smoothstep(.3, .6, cr)) * nf + ngr(p * 9. + 7.) * .55 + ngr(p * 3.3 + 1.) * .35;
      Nb = normalize(Nb + vec3(-g.x, 0., -g.y) * rk);
      // silt and fine gravel in the hollows
      sand = vec3(.4, .37, .31) * (.86 + .24 * n2(p * 9. + 1.)) * (.9 + .2 * n2(p * 70.) * nf);
#endif
      // sand lies in every hollow (the A channel)
      ra = mix(ra, sand, smoothstep(.3, .7, bm.a));
      alb = mix(alb, ra, pm);
      N = normalize(mix(N, Nb, pm));
      aoB = mix(1., aoB * bh.a, pm);
      rough = mix(rough, .85, pm);
      gSpec = mix(gSpec, .02, pm);
    }
  }
#endif
#if BOT == 5
  {
    // the forest's floor: bedrock under a thin pink-grey coralline crust, matt and finely grained, a little silt in the
    // low places; the bushes' shadows give it its form
    float pm = botM(p);
    if (pm > .001) {
      float nf = 1. - smoothstep(.002, .012, fpx);
      vec3 ra = vec3(.5, .43, .41) * (.88 + .2 * n2(p * 2.3 + 7.)) * (.9 + .2 * n2(p * 29.) * nf);
      ra = mix(ra, vec3(.4, .37, .31), smoothstep(.55, .75, n2(p * .9 + 3.)) * .5);
      vec2 g = ngr(p * 23. + 3.) * .7 * nf + ngr(p * 61. + 9.) * .5 * nf;
      alb = mix(alb, ra, pm);
      N = normalize(mix(N, normalize(vN + vec3(-g.x, 0., -g.y)), pm));
      rough = mix(rough, .85, pm);
      gSpec = mix(gSpec, .02, pm);
    }
  }
#endif
#if BOT == 2 || BOT == 4 || SND == 1
  {
    // the ripple field and the sand of the sand views: each ripple a lit face and a lee with a sharp crest; the lee
    // takes the torch's shadow (marched towards the lamp), grains sparkle on the lit faces, the troughs hold the hash
    float sa = (1. - mm) * smoothstep(.85, .97, vN.y) * (1. - smoothstep(.0, .3, rm));
#if BOT == 2 || BOT == 4
    sa *= botM(p);
#endif
    if (sa > .01) {
      float A = .011 * (1. - smoothstep(.012, .04, fpx));
      vec3 Lt = TPOS - vP; float dlt = length(Lt); Lt /= dlt;
      float h0 = 0., hx = 0., hz = 0., sr = 1., pen = max(.03 / dlt, .02);
      // the march (i >= 3) only where the torch lights this point and the shadow map lets it through: elsewhere sr is
      // unused (torchL returns 0 first, or multiplies it by 0). A sample is skipped when the ray towards the lamp is
      // provably above anything ripH can return there (the ripples <= A; a felt-ball cell <= .85 r), with a margin far
      // over the rounding; the march stops once sr is 0
#ifdef RSHAD
      bool mch = gSp >= 1e-4 && gShP > 0.;
#endif
      for (int i = 0; i < 12 + uZ; i++) {
        float t = i < 3 ? 0. : .005 * pow(1.5, float(i - 3));
        vec2 q = i == 1 ? p + vec2(.0025, 0.) : i == 2 ? p + vec2(0., .0025) : p + Lt.xz * t;
        bool rd = i < 3;
#ifdef RSHAD
        if (!rd && !mch) break;
        if (!rd) {
          float H = A;
#if BOT == 2
          { vec2 c = q / .42, ci = floor(c); uint bh = hu(uint(int(ci.x) + 4096) * 7919u + uint(int(ci.y) + 4096) + 911u);
            if (hf(bh) < .4) H = max(H, .85 * (.022 + .018 * hf(bh + 3u))); }
#endif
          rd = h0 + Lt.y * t - H - (sr - .5) * t * pen < 1e-5;
        }
#endif
        if (rd) {
          float hh = ripH(q, A);
          if (i == 0) h0 = hh; else if (i == 1) hx = hh; else if (i == 2) hz = hh;
          else { sr = min(sr, clamp((h0 + Lt.y * t - hh) / (t * pen) + .5, 0., 1.)); if (sr == 0.) break; }
        }
      }
      vec3 Nr = normalize(normalize(vN) + vec3(-(hx - h0), 0., -(hz - h0)) / .0025);
#if BOT == 4
      // the silt: olive grey-brown and matt, the shrimps' cones paler with fresh grey mud from below, the holes and
      // craters dark, soft flocs of detritus lying in the hollows, a few half-buried pale shells
      float hs = h0 * .011 / max(A, 1e-5);   // metres
      vec3 sd = vec3(.37, .35, .28) * (.84 + .3 * n2(p * 2.7 + 5.)) * (.9 + .2 * n2(p * 13. + 1.)) * (.93 + .14 * n2(p * 70.) * (1. - smoothstep(.001, .004, fpx)));
      sd = mix(sd, vec3(.47, .46, .41) * (.9 + .2 * n2(p * 45.)), smoothstep(.006, .022, hs) * .7);
      sd *= .55 + .45 * smoothstep(-.016, -.007, hs);
      vec2 fq = mat2(.8, .6, -.6, .8) * p + (vec2(n2(p * 7.), n2(p * 7. + 31.)) - .5) * .06;
      float flc = smoothstep(.28, .45, n2(fq * 52. + 3.) * n2(fq.yx * 33. + 17.)) * (1. - smoothstep(.003, .012, fpx));
      sd = mix(sd, vec3(.5, .49, .43), flc * .35);
      vec2 sq2 = p / .47, si = floor(sq2); uint shh = hu(uint(int(si.x) + 4000) * 9973u + uint(int(si.y) + 4000) + 19u);
      if (hf(shh) < .35) {
        float an = hf(shh + 3u) * 6.28, rr = .015 + .02 * hf(shh + 4u);
        vec2 q = mat2(cos(an), sin(an), -sin(an), cos(an)) * ((fract(sq2) - .2 - .6 * vec2(hf(shh + 1u), hf(shh + 2u))) * .47);
        float e = length(q / vec2(rr, rr * .78)), bur = smoothstep(-.1, .25, q.y / rr + .6 * (hf(shh + 5u) - .5));
        float sh = smoothstep(1., .86, e) * bur;
        float rib = .84 + .16 * sin(atan(q.y / (abs(q.x) + 1e-4)) * 12.) * (1. - smoothstep(.002, .005, fpx));
        sd = mix(sd * (1. - .35 * smoothstep(1.35, 1., e) * (1. - bur)), vec3(.7, .66, .58) * rib, sh);
        Nr = normalize(Nr + vec3(q.x, 0., q.y) / rr * .5 * sh);
      }
#else
      float hn = A > 1e-4 ? clamp(h0 / A, 0., 1.4) : .5;
      // the sand: pale, warm; the troughs darker and coarser with shell hash and bits of leaf
      vec3 sd = vec3(.6, .55, .46) * (.86 + .22 * n2(p * 7. + 5.)) * (.9 + .2 * n2(p * 160.) * (1. - smoothstep(.001, .004, fpx)));
      float tro = smoothstep(.35, .05, hn) * (A > 1e-4 ? 1. : 0.);
      vec2 rdd = normalize(FLW.xy), tq = vec2(dot(p, rdd), dot(p, vec2(-rdd.y, rdd.x)));
      vec2 cq = mat2(.8, .6, -.6, .8) * p + (vec2(n2(p * 11.), n2(p * 11. + 17.)) - .5) * .02;
      float cv = n2(cq * 170. + 3.) * n2(cq.yx * 113. + 8.), chip = smoothstep(.3, .42, cv) * (1. - smoothstep(.002, .006, fpx));
      vec3 hsh = mix(vec3(.3, .25, .19), n2(cq * 40. + 5.) > .55 ? vec3(.66, .62, .55) : vec3(.16, .12, .08), chip * .8);
      sd = mix(sd, hsh * (.8 + .3 * n2(p * 30.)), tro * .7);
      sd = mix(sd, vec3(.2, .15, .08), tro * smoothstep(.62, .72, n2(tq * vec2(40., 7.) + 7.)) * .6);
      // grains: a fine sparkle on the lit faces only
      vec2 gq = p / .0022, gc = floor(gq); uint gh = hu(uint(int(gc.x) + 70000) * 9973u + uint(int(gc.y) + 70000));
      sd += vec3(.9, .85, .75) * step(.975, hf(gh)) * smoothstep(.0, .5, dot(Nr, Lt)) * (1. - smoothstep(.0006, .0016, fpx)) * (1. - tro);
#if BOT == 2
      // felt balls (in ripH's height): matted brown fibre
      { vec2 rd = normalize(FLW.xy); vec2 c = p / .42, ci = floor(c); uint bh = hu(uint(int(ci.x) + 4096) * 7919u + uint(int(ci.y) + 4096) + 911u);
        if (hf(bh) < .4) {
          vec2 bc = (ci + .25 + .5 * vec2(hf(bh + 1u), hf(bh + 2u))) * .42;
          float bp = dot(bc, rd) * 10.5 + n2(bc * .8 + 3.) * 1.3 + n2(bc * 2.2 + 11.) * .7 + n2(bc * 5.3 + 27.) * .35 + .45 * sin(dot(bc, vec2(-rd.y, rd.x)) * 2.3 + n2(bc * .45) * 5.);
          bc += rd * (.5 - fract(bp)) / 10.5;
          float r = .022 + .018 * hf(bh + 3u);
          vec2 q = p - bc; float d = length(q / vec2(1., .82 + .2 * hf(bh + 4u))) * (1. + .14 * (n2(q * 160. + float(bh & 255u)) - .5));
          float fb = smoothstep(r, r * .85, d);
          vec2 fq = mat2(.6, .8, -.8, .6) * q;
          vec3 fc = vec3(.3, .2, .1) * (.6 + .5 * n2(fq * vec2(300., 60.) + float(bh & 127u)) * n2(fq.yx * vec2(240., 50.)));
          sd = mix(sd * (1. - .45 * smoothstep(r * 1.3, r, d)), fc, fb);
        } }
#endif
#endif
      alb = mix(alb, sd, sa);
      N = normalize(mix(N, Nr, sa));
      gSh = mix(1., sr, sa);
      gSpec = mix(gSpec, .03, sa);
    }
  }
#endif
  vec3 c = torchL(vP, N, V, de, alb * aoB, rough, 0.) + ambL(vP, N, de, alb) * aoB;
  o = outC(c, de);
}`,kt=16,We=10,qa=_e+Ve+`
layout(location = 0) in vec4 a0;
layout(location = 1) in vec4 a1;
layout(location = 2) in vec4 a2;
layout(location = 3) in vec4 a3;
layout(location = 4) in vec4 a4;
layout(location = 5) in vec4 a5;
out vec3 vP; out vec3 vN; out vec4 vU; flat out vec4 vM;
void main() {
  int ring = gl_VertexID / ${We+1}, j = gl_VertexID - ring * ${We+1};
  float t = float(ring) / ${kt}., th = float(j) / ${We}. * 6.2831853;
  float u = 1. - t;
  vec3 C = u * u * u * a0.xyz + 3. * u * u * t * a1.xyz + 3. * u * t * t * a2.xyz + t * t * t * a3.xyz;
  vec3 T = 3. * u * u * (a1.xyz - a0.xyz) + 6. * u * t * (a2.xyz - a1.xyz) + 3. * t * t * (a3.xyz - a2.xyz);
  T = normalize(T + 1e-6);
  vec3 B = cross(T, a4.xyz); B = length(B) < 1e-4 ? normalize(cross(T, vec3(.3, .1, .9))) : normalize(B);
  vec3 Nn = cross(B, T);
  float r = u * u * a0.w + 2. * u * t * a1.w + t * t * a2.w;
  int caps = int(a5.x);
  if ((caps & 4) != 0) r = a1.w * (t < .3 ? pow(sin(1.5707963 * t / .3), .55) : mix(1., a2.w / a1.w, smoothstep(.3, 1., t)));
  if ((caps & 1) != 0 && t < .2) r *= sqrt(max(1. - sq((.2 - t) / .2), 0.));
  if ((caps & 2) != 0 && t > .8) r *= sqrt(max(1. - sq((t - .8) / .2), 0.));
  float cs = cos(th), sn = sin(th);
  vec3 pos = C + r * (cs * Nn * a4.w + sn * B * a5.w);
  vN = normalize(cs * Nn / max(a4.w, .05) + sn * B / max(a5.w, .05));
  vP = pos; vU = vec4(t, th, cs, sn); vM = vec4(a3.w, a5.y, a5.z, r);
  gl_Position = uVP * vec4(pos, 1.);
}`,xo=_e+Ve+`
in vec3 vP; in vec3 vN; in vec4 vU; flat in vec4 vM;
out vec4 o;
void main() {
  vec3 V = CAMP - vP; float de = length(V); V /= de;
  vec3 N = normalize(vN); if (dot(N, V) < 0.) N = -N;
  int m = int(vM.x + .5); float sd = vM.y, pa = vM.z, t = vU.x;
  vec2 uv = vec2(t, vU.y / 6.2831853);
  float rough = .45, tr = 0.;
  vec3 alb;
  float bump = n2(uv * vec2(60., 14.) + sd * 31.);
  {                        // the comb star: orange-red above, the marginal plates and their pale spines fringing each arm
    alb = vec3(.62, .2, .07) * (.75 + .35 * n2(uv * vec2(80., 20.) + sd * 9.));
    float rim = 1. - smoothstep(.1, .4, abs(vU.z));
    alb = mix(alb, vec3(.8, .58, .4) * (.7 + .3 * smoothstep(-.2, .6, sin(t * 170.))), rim);
    alb = mix(alb, vec3(.42, .13, .05), smoothstep(.9, .99, vU.z) * .5);
    rough = .72;
  }
  N = normalize(N + (bump - .5) * .35 * normalize(cross(N, vec3(.2, .9, .3))));
  vec3 c = torchL(vP, N, V, de, alb, rough, tr) + ambL(vP, N, de, alb);
  o = outC(c, de);
}`,bo=_e+"out vec4 o; void main() { o = vec4(0.); }",wo=_e+Ve+`
uniform vec4 uM;
out vec3 vC;
void main() {
  // two populations in world-anchored wrapping boxes centred ahead of the eye: fine glittering plankton (dense, near)
  // and marine snow (larger pale flakes sinking slowly, out to further)
  uint id = uint(gl_VertexID);
  bool snow = gl_VertexID >= int(uM.x);
  vec3 h = vec3(hf(id * 3u + 11u), hf(id * 3u + 12u), hf(id * 3u + 13u));
  float B = snow ? 8. : uM.y;
  vec3 dr = snow ? vec3(.012, -.022, .008) * TIME + .03 * sin(TIME * (.15 + h.yzx * .2) + h * 30.)
                 : vec3(.03, -.006, .02) * TIME + .05 * sin(TIME * (.25 + h.yzx * .4) + h * 30.);
  dr.xz += FLW.xy * FLW.z * .05 * sin(FLW.w * TIME + h.x * 3.);
  vec3 C0 = CAMP + CAMF * B * .38;
  vec3 p = C0 + (fract(h + (dr - C0) / B) - .5) * B;
  vec3 Lv = TPOS - p; float dl = length(Lv); vec3 l = Lv / dl;
  vec3 V = CAMP - p; float de = length(V); V /= de;
  float sp = beam(dot(-l, TDIR)) * TPOW;
  gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 1.; vC = vec3(0.);
  if (sp < .001 || de < .1) return;
  float cph = dot(-l, V);
  float ph = (1. - .55 * .55) / pow(1. + .3025 - 1.1 * cph, 1.5) * .08 + .15;
  // plankton glitter: most are dim specks, a few flash as their facets catch the beam
  float tw = snow ? .8 + .2 * sin(TIME * .7 + h.y * 40.) : .3 + .5 * pow(.5 + .5 * sin(TIME * (1.5 + h.x * 4.) + h.y * 40.), 3.) + 3. * pow(.5 + .5 * sin(TIME * (2.3 + h.z * 5.) + h.x * 60.), 24.);
  vec3 I = TCOL * sp * exp(-SIGT * (dl + de)) / (dl * dl + .03) * ph * tw;
  // physical size (sub-pixel for plankton) spread over the defocus disc (focus about 1.7 m), energy kept
  float sz = uM.w * (snow ? 2.5 + 4. * h.z * h.z : 1.3 + 2. * h.z * h.z) / de;
  float bd = uM.w * 7. * abs(1. / de - .6);
  float disc = max(max(sz, bd), 1.);
  gl_PointSize = min(disc, 48.);
  vC = I * uM.z * sq(sz / disc) * (snow ? 1.6 : 1.3) * (h.x < .05 ? 4. : 1.);
  gl_Position = uVP * vec4(p, 1.);
}`,Mo=_e+`
in vec3 vC;
out vec4 o;
void main() { vec2 q = gl_PointCoord * 2. - 1.; float r2 = dot(q, q); if (r2 > 1.) discard; o = vec4(vC * exp(-r2 * 2.6), 0.);
#ifdef ENC8
o.rgb = sqrt(o.rgb / (1. + o.rgb)) * .5;
#endif
}`,yo=_e+Ve+`
layout(location = 0) in vec4 aS;
layout(location = 1) in vec4 aK;
out vec3 vC;
void main() {
  vec3 p = aS.xyz; vec3 V = CAMP - p; float de = length(V);
  vec3 c = aK.rgb * exp(-SIGT * de);
  float px = aS.w / (de * PXW);
  float sz = max(px, 2.);
  gl_PointSize = min(sz, 90.);
  vC = c * sq(max(px, .4) / sz) * (aS.w > 0. ? 1. : 0.);
  gl_Position = uVP * vec4(p, 1.);
}`,Da=_e+Ve+`
uniform sampler2D uS;
out vec4 o;
#ifdef UPSURF
vec3 sky(vec3 d) {
  float mI = AMB.w;
  vec3 c = vec3(.006, .011, .024) * (.3 + 1.6 * mI) * (.5 + .5 * d.y);
  vec2 sp = d.xz / (1. + d.y) * 240.;
  vec2 ci = floor(sp); uint h = hu(uint(ci.x + 2000.) * 7919u + uint(ci.y + 2000.));
  if (hf(h) < .045) { vec2 o2 = vec2(hf(h + 1u), hf(h + 2u)) * .6 + .2; float r = length(fract(sp) - o2); c += vec3(.8, .85, 1.) * pow(hf(h + 3u), 5.) * 6. * exp(-r * r * 30.) * MOON.w; }
  float cm = dot(d, MOON.xyz);
  c += vec3(1., .95, .85) * mI * (smoothstep(.99985, .99992, cm) * 30. + exp((cm - 1.) * 60.) * .5 + exp((cm - 1.) * 6.) * .06);
  return c;
}
float wv(vec2 q) { return n2(q * .9 + TIME * vec2(.23, .13)) + .5 * n2(q * 2.3 - TIME * vec2(.17, .37)) + .25 * n2(q * 5.1 + TIME * vec2(.41, -.3)); }
vec3 surf(vec3 rd, out float t) {
  t = (SURF - CAMP.y) / rd.y; vec3 hp = CAMP + rd * t;
  float e = .1, w0 = wv(hp.xz);
  vec3 Nd = normalize(vec3((wv(hp.xz + vec2(e, 0.)) - w0) / e * .25, -1., (wv(hp.xz + vec2(0., e)) - w0) / e * .25));
  vec3 tr = refract(rd, Nd, 1.333);
  vec3 c = vec3(0.);
  if (dot(tr, tr) > .5) { float F = .02 + .98 * pow(1. - abs(dot(rd, Nd)), 5.); c = sky(tr) * (1. - F) * 2.2; }
  else c = AMB.rgb * .02;
  return c * exp(-SIGT * t);
}
#endif
void main() {
  vec2 fc = gl_FragCoord.xy;
  vec4 sc = texelFetch(uS, ivec2(fc * FRM.z), 0);
#ifdef ENC8
  { vec3 x = sc.rgb * sc.rgb; sc.rgb = x / max(1. - x, 1e-3); sc.a = sc.a > .998 ? 1e4 : 4. * sc.a / (1. - sc.a); }
#endif
  vec2 q = fc / RES * 2. - 1.;
  vec3 rd = normalize(CAMF + q.x * TANF * CAMR + q.y * TANF * CAMU);
  float de = sc.a; vec3 col = sc.rgb;
  float colDepth = SURF - CAMP.y;
  // starlight through the water column: deep blue-black, brighter towards the surface overhead
  vec3 Wsrc = AMB.rgb * exp(-SIGT * colDepth * .9) * vec3(.45, .95, 1.2);
  // moonlight in the water column: under a full moon at six metres the water itself is pale enough that the meadow
  // stands dark against it well past the beam; at sixteen metres under a new moon the beam is the world
  vec3 Lw = Wsrc * (.22 + 3.4 * sq(smoothstep(-.45, 1., rd.y))) * (1. + 1.6 * AMB.w * AMB.w * min(1.6, 10. / SURF));
  if (de > 1e3) {
#ifdef UPSURF
    if (rd.y > .6) { float t; col += surf(rd, t); de = t; } else
#endif
    de = 80.;   // below ~.66 the surface is a dark mirror (total internal reflection)
  }
  col = col * (sc.a > 1e3 ? 1. : exp(-.1 * de)) + Lw * (1. - exp(-(SIGT + .12) * de * 2.5));
  // the torch beam: single scattering inside the cone only (ray clipped to the cone analytically), sampled
  // equiangularly about the lamp so the bright throat near the torch is smooth; the shadow map cuts shafts
  vec3 co = CAMP - TPOS;
  float k2 = sq(cos(BW.w));                            // the spill edge
  float dA = dot(rd, TDIR), cA = dot(co, TDIR);
  float qa = dA * dA - k2, qb = dA * cA - k2 * dot(rd, co), qc = cA * cA - k2 * dot(co, co);
  float disc = qb * qb - qa * qc;
  float t0 = 1e9, t1 = -1e9;
  if (disc > 0.) {
    float sd = sqrt(disc), r1 = (-qb - sd) / qa, r2 = (-qb + sd) / qa;
    float lo = min(r1, r2), hi = max(r1, r2);
    if (qa < 0.) { if (cA + dA * (lo + hi) * .5 > 0.) { t0 = lo; t1 = hi; } }
    else if (dA > 0.) { t0 = hi; t1 = 1e4; }
    else { t0 = -1e4; t1 = lo; }
  } else if (qa > 0. && dA > 0.) { t0 = 0.; t1 = 1e4; }
  t0 = max(t0, 0.); t1 = min(t1, min(de, 16.));
  float bp = dot(-co, rd);                             // ray parameter of the closest approach to the lamp
  float hh = max(length(co + rd * bp), .02);
  vec3 acc = vec3(0.);
  ivec2 qi = ivec2(fc) & 1;
  if (t1 > t0) {
    float a0 = atan((t0 - bp) / hh), a1 = atan((t1 - bp) / hh);
    int nv = int(FRM.y);
    // the jitter is stratified over each 2x2 pixel quad (one hashed offset per quad, a quarter step per pixel) and the quad
    // is averaged below, so the four samples per pixel act as sixteen: no dither pattern in the beam
    float jt = (float(qi.x + 2 * qi.y) + hf(uint(fc.x * .5) * 7919u + uint(fc.y * .5) * 104729u + uint(FRM.x) * 26699u + 5u)) * .25;
    float cph = -dot(TDIR, rd);                       // scattering angle taken along the beam axis: once per pixel
    float ph = (1. - GPH * GPH) / pow(1. + GPH * GPH - 2. * GPH * cph, 1.5) * .08 + .06;
    for (int i = 0; i < nv; i++) {
      float th = mix(a0, a1, (float(i) + jt) / FRM.y);
      float t = bp + hh * tan(th);
      vec3 pp = CAMP + rd * t;
      vec3 Lv = pp - TPOS; float dl = length(Lv);
      // the shaft itself: drifting silt thins and frays it, the core and halo widen (and so dim) with distance, and the
      // water takes it out quickly: a hot throat at the lamp, gone before it reaches the frame's far side
      float ang = sqrt(max(2. - 2. * dot(Lv, TDIR) / dl, 0.));
      vec2 dr = TIME * vec2(.06, .04);
      float silt = n2(pp.xz * 3.1 + pp.y * 1.7 + dr) * .55 + n2(pp.xz * 1.4 - pp.y * 1.1 - dr * 1.7) * .45;
      float wc = .115 * (1. + .9 * dl) * BW.y, wh = .25 * (1. + .7 * dl) * BW.y, af = ang * (1. + .7 * (silt - .5));
      float prof = (exp(-sq(af / wc)) * 1.05 * .115 / wc + .22 * exp(-sq(af / wh)) * .25 / wh) * (1. - smoothstep(.42 * BW.y, .58 * BW.y, ang)) * min(BW.y, 1.);
      float along = exp(-.85 * dl) * (1. - smoothstep(1.2, 2.7, dl)) * (.3 + 1.4 * smoothstep(.3, .75, silt)) * (1. + 1.8 * exp(-dl / .4));
      acc += 2.6 * prof * along * shad(pp) * exp(-SIGT * (dl + t)) * (dl * dl / (dl * dl + .3));
    }
    acc *= ph * (a1 - a0) / (hh * FRM.y);
  }
  // depth-aware quad average: the x neighbour, then the other row's pair (derivatives; side found from a ramp so it
  // holds whatever the quad orientation); pairs that straddle a depth edge (a leaf against the far water) stay apart
  {
    float dq = min(de, 16.);
    float lx = dFdx(float(qi.x)) * (qi.x == 0 ? 1. : -1.), ly = dFdy(float(qi.y)) * (qi.y == 0 ? 1. : -1.);
    vec3 ax = dFdx(acc); float dx = dFdx(dq);
    float wx = step(abs(dx), .04 * (dq + .5 * lx * dx) + .01);
    vec3 h = acc + .5 * wx * lx * ax; float hd = dq + .5 * lx * dx;
    vec3 ay = dFdy(h); float dy = dFdy(hd);
    float wy = step(abs(dy), .04 * (hd + .5 * ly * dy) + .01);
    acc = h + .5 * wy * ly * ay;
  }
  col += TCOL * TPOW * SIGS * acc * FRM.w * .55;
  // backscatter haze: light scattered more than once glows softly around the beam and its throat
  {
    float tb = clamp(bp, 0., min(de, 16.));
    vec3 pc = CAMP + rd * tb; vec3 lc = pc - TPOS; float dc = length(lc);
    float wide = sq(smoothstep(-.3, 1., dot(lc / max(dc, 1e-3), TDIR)));
    float hq = max(hh, .12), ha = (atan((min(de, 16.) - bp) / hq) - atan(-bp / hq)) / hq;
    col += TCOL * TPOW * SIGS * ha * wide * exp(-SIGT * (dc + tb) * 1.4) * vec3(.55, .9, 1.) * .004 * (.4 + 30. * sq(SIGS.g - .1));
  }
  col *= EXPO;
  col = clamp(col * (2.51 * col + .03) / (col * (2.43 * col + .59) + .14), 0., 1.);
  col = pow(col, vec3(1. / 2.2));
  float gr = hf(uint(fc.x) * 1973u + uint(fc.y) * 9277u + uint(FRM.x) * 26699u) - .5;
  col += gr * .014 * (.4 + col);
  vec2 vq = fc / RES - .5;
  col *= 1. - .06 * sq(dot(vq, vq) * 2.);
  o = vec4(col, 1.);
}`,To=_e+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 0., 1.); }";function Ua(t){if(t.__q580)return t.__q580;const a=!!(t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_hwfloat")),K=t.getInternalformatParameter(t.RENDERBUFFER,a?t.RGBA16F:t.RGBA8,t.SAMPLES);return t.__q580={fl:a,lim:Math.min(t.getParameter(t.MAX_TEXTURE_SIZE),t.getParameter(t.MAX_RENDERBUFFER_SIZE)),ns:Math.min(4,K&&K.length?K[0]:0),msOK:{}}}function Eo(t){if(t.__c580)return t.__c580;const a=Ua(t).fl,K=(A,I)=>{const F=t.createShader(A);return t.shaderSource(F,a?I:I.replace(`#version 300 es
`,`#version 300 es
#define ENC8
`)),t.compileShader(F),F},W=A=>A.replace(`#version 300 es
`,`#version 300 es
#define SHADOW
`),ee=K(t.FRAGMENT_SHADER,bo),X=K(t.FRAGMENT_SHADER,Mo),se={tb:[qa,xo],tbS:[W(qa),ee],mo:[wo,X],sp:[yo,X]},J={};for(const A in se){const I=K(t.VERTEX_SHADER,se[A][0]),F=typeof se[A][1]=="string"?K(t.FRAGMENT_SHADER,se[A][1]):se[A][1],G=t.createProgram();t.attachShader(G,I),t.attachShader(G,F),t.linkProgram(G),J[A]={p:G,v:I,f:F}}t.flush();const ne=(A,I)=>()=>{if(J[A])return;const F=K(t.VERTEX_SHADER,To),G=K(t.FRAGMENT_SHADER,I),q=t.createProgram();t.attachShader(q,F),t.attachShader(q,G),t.linkProgram(q),t.flush(),J[A]={p:q,v:F,f:G}},ie=ne("fin",Da),Ne=ne("finS",Da.replace(`#version 300 es
`,`#version 300 es
#define UPSURF
`)),x=(A,I)=>{if(J["gd"+A])return;const F=G=>G.replace(`#version 300 es
`,`#version 300 es
`+I);for(const[G,q,de]of[["gdS"+A,W(F(_a)),ee],["gd"+A,F(_a),F(vo)]]){const Te=K(t.VERTEX_SHADER,q),xe=typeof de=="string"?K(t.FRAGMENT_SHADER,de):de,pe=t.createProgram();t.attachShader(pe,Te),t.attachShader(pe,xe),t.linkProgram(pe),J[G]={p:pe,v:Te,f:xe}}t.flush()},De=(A,I)=>{if(J["gr"+A])return;const F=G=>G.replace(`#version 300 es
`,`#version 300 es
`+I);for(const[G,q,de]of[["gr"+A,F(Sa),F(mo)],["grS"+A,W(F(Sa)),ee]]){const Te=K(t.VERTEX_SHADER,q),xe=typeof de=="string"?K(t.FRAGMENT_SHADER,de):de,pe=t.createProgram();t.attachShader(pe,Te),t.attachShader(pe,xe),t.linkProgram(pe),J[G]={p:pe,v:Te,f:xe}}t.flush()};let ye=1540483477;const re=()=>(ye=Math.imul(ye^ye>>>15,739982445),ye=Math.imul(ye^ye>>>12,695872825),ye^=ye>>>15,ye&255),It=new Uint8Array(256*256);for(let A=0;A<It.length;A++)It[A]=re();t.pixelStorei(t.UNPACK_ALIGNMENT,1);const ot=t.createTexture();t.bindTexture(t.TEXTURE_2D,ot),t.texImage2D(t.TEXTURE_2D,0,t.R8,256,256,0,t.RED,t.UNSIGNED_BYTE,It),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const le=220,He=150,Nt=new Float32Array((le+1)*(He+1)*2);for(let A=0,I=0;A<=He;A++){const F=42*Math.pow(A/He,2.1);for(let G=0;G<=le;G++){const q=G/le*he;Nt[I++]=Math.cos(q)*F,Nt[I++]=Math.sin(q)*F}}const Le=new Uint32Array(le*He*6);for(let A=0,I=0;A<le/11;A++)for(let F=0;F<He;F++)for(let G=A*11;G<A*11+11;G++){const q=F*(le+1)+G,de=q+le+1;Le[I++]=q,Le[I++]=de,Le[I++]=q+1,Le[I++]=q+1,Le[I++]=de,Le[I++]=de+1}const Xe=t.createVertexArray();t.bindVertexArray(Xe);const ra=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,ra),t.bufferData(t.ARRAY_BUFFER,Nt,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);const ia=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,ia),t.bufferData(t.ELEMENT_ARRAY_BUFFER,Le,t.STATIC_DRAW),t.bindVertexArray(null);const D=new Uint16Array(kt*We*6);for(let A=0,I=0;A<kt;A++)for(let F=0;F<We;F++){const G=A*(We+1)+F,q=G+We+1;D[I++]=G,D[I++]=q,D[I++]=G+1,D[I++]=G+1,D[I++]=q,D[I++]=q+1}const ue=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,ue),t.bufferData(t.ELEMENT_ARRAY_BUFFER,D,t.STATIC_DRAW);const je=1024,dt=t.createTexture();t.bindTexture(t.TEXTURE_2D,dt),t.texStorage2D(t.TEXTURE_2D,1,t.DEPTH_COMPONENT24,je,je),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_COMPARE_FUNC,t.LEQUAL);const ut=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,ut),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,dt,0),t.bindFramebuffer(t.FRAMEBUFFER,null);const pt={uN:0,uSh:1,uS:2,uBH:3,uBM:4},Ft={},mt={fl:a,ready:A=>{if(Ft[A])return Ft[A];const I=J[A].p;if(!t.getProgramParameter(I,t.LINK_STATUS))throw new Error("580 "+A+": "+t.getShaderInfoLog(J[A].v)+" "+t.getShaderInfoLog(J[A].f)+" "+t.getProgramInfoLog(I));const F={p:I};Ft[A]=F;const G=t.getProgramParameter(I,t.ACTIVE_UNIFORMS);for(let q=0;q<G;q++){const de=t.getActiveUniform(I,q).name.replace("[0]","");F[de]=t.getUniformLocation(I,de)}t.useProgram(I);for(const q in pt)F[q]&&t.uniform1i(F[q],pt[q]);return F},fin:ie,finS:Ne,gdK:x,grK:De,grid2:()=>{if(mt.g2)return mt.g2;const A=300,I=new Float32Array((le+1)*(A+1)*2),F=new Uint32Array(le*A*6);for(let Te=0,xe=0;Te<=A;Te++){const pe=42*Math.pow(Te/A,2.1);for(let nt=0;nt<=le;nt++){const Ee=nt/le*he;I[xe++]=Math.cos(Ee)*pe,I[xe++]=Math.sin(Ee)*pe}}for(let Te=0,xe=0;Te<le/11;Te++)for(let pe=0;pe<A;pe++)for(let nt=Te*11;nt<Te*11+11;nt++){const Ee=pe*(le+1)+nt,ae=Ee+le+1;F[xe++]=Ee,F[xe++]=ae,F[xe++]=Ee+1,F[xe++]=Ee+1,F[xe++]=ae,F[xe++]=ae+1}const G=t.createVertexArray();t.bindVertexArray(G);const q=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,q),t.bufferData(t.ARRAY_BUFFER,I,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);const de=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,de),t.bufferData(t.ELEMENT_ARRAY_BUFFER,F,t.STATIC_DRAW),t.bindVertexArray(null),mt.g2={vao:G,gWi:A*11*6}},tN:ot,NZ:It,gVao:Xe,nGi:Le.length,nGW:le/11,gWi:He*11*6,tib:ue,tSh:dt,fbSh:ut,SM:je,eVao:t.createVertexArray()};return t.__c580=mt,mt}function Ro(t,a,K){const W=Math.min(K,a.lim),ee=a.fl?t.RGBA16F:t.RGBA8,X=t.createTexture();t.bindTexture(t.TEXTURE_2D,X),t.texStorage2D(t.TEXTURE_2D,1,ee,W,W),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const se=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,se),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,X,0);let J=null;const ne=a.ns;if(ne>1&&a.msOK[W]!==!1){const ie=t.createRenderbuffer(),Ne=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,ie),t.renderbufferStorageMultisample(t.RENDERBUFFER,ne,ee,W,W),t.bindRenderbuffer(t.RENDERBUFFER,Ne),t.renderbufferStorageMultisample(t.RENDERBUFFER,ne,t.DEPTH_COMPONENT24,W,W),J=t.createFramebuffer(),t.bindFramebuffer(t.FRAMEBUFFER,J),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ie),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,Ne),a.msOK[W]===void 0&&(a.msOK[W]=t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE),a.msOK[W]||(t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(J),t.deleteRenderbuffer(ie),t.deleteRenderbuffer(Ne),J=null)}if(!J){t.bindFramebuffer(t.FRAMEBUFFER,se);const ie=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,ie),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,W,W),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,ie)}return t.bindRenderbuffer(t.RENDERBUFFER,null),t.bindFramebuffer(t.FRAMEBUFFER,null),{t:X,f:se,fm:J,W}}const Me=(t,a,K)=>Math.max(a,Math.min(K,t)),Z=(t,a,K)=>{const W=Me((K-t)/(a-t),0,1);return W*W*(3-2*W)},lt=t=>{const a=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/a,t[1]/a,t[2]/a]},At=(t,a)=>[t[1]*a[2]-t[2]*a[1],t[2]*a[0]-t[0]*a[2],t[0]*a[1]-t[1]*a[0]],Bt=(t,a)=>t[0]*a[0]+t[1]*a[1]+t[2]*a[2];function La(t,a,K,W,ee,X,se,J){const ne=1/X,ie=(J+se)/(se-J),Ne=2*J*se/(se-J),x=[ne*W[0],ne*W[1],ne*W[2],-ne*Bt(W,a)],De=[ne*ee[0],ne*ee[1],ne*ee[2],-ne*Bt(ee,a)],ye=[-K[0],-K[1],-K[2],Bt(K,a)];for(let re=0;re<4;re++)t[re*4]=x[re],t[re*4+1]=De[re],t[re*4+2]=ie*ye[re]+(re===3?Ne:0),t[re*4+3]=-ye[re]}Pa.add({num:580,name:"Night Dive",fam:"Vistas",recipe:"Hovering over seagrass or a little seaweed forest at night, where your torch finds ribbon leaves swaying in the surge, a starfish on the sand and plankton glittering in the beam. Where you hover, what grows on the bottom and the moon change every mint. Drag to sweep the torch and the stirred water flares with green sparks, tap a spot to point the torch there, or hold to switch it off and let your eyes slowly get used to the sparks and the moonlit water.",interactive:"Drag to sweep the torch through the water: the beam follows your hand and the stirred water flares with green sparks; tap a spot to point the torch there for a moment; hold to switch the torch off and let your eyes slowly adapt to the sparks and the moonlit water.",music:!0,gl:!0,fps:30,seed:0,make(t){const a=t.gl,K=t.size,W=!!t.home,ee=Ro(a,Ua(a),K),X=Ao(a),se=t.hash.slice(2);let J=parseInt(se.slice(0,8),16)>>>0,ne=parseInt(se.slice(8,16),16)>>>0,ie=parseInt(se.slice(16,24),16)>>>0,Ne=parseInt(se.slice(24,32),16)>>>0;const x=()=>{J>>>=0,ne>>>=0,ie>>>=0,Ne>>>=0;let e=J+ne|0;return J=ne^ne>>>9,ne=ie+(ie<<3)|0,ie=ie<<21|ie>>>11,Ne=Ne+1|0,e=e+Ne|0,ie=ie+e|0,(e>>>0)/4294967296};for(let e=0;e<12;e++)x();const De=(e,o,n)=>{let r=0;for(const c of o)r+=c[1];let s=x()*r,i=o[o.length-1];for(const c of o)if(s-=c[1],s<0){i=c;break}return W&&(i=o[n]),t.trait(e,i[0]),i[2]};let ye=(parseInt(se.slice(56,64)||"0",16)^2135587861)>>>0;const re=()=>{ye=ye+1831565813>>>0;let e=ye;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296},It=(e,o)=>{let n=0;for(let r=0;r<o.length;r++)if(n+=o[r],e*100<n)return r;return o.length-1},ot=re(),le=re(),He=re(),Nt=re(),Le=re(),Xe=re(),ra=re(),ia=re();let D=W||ot<.34?0:ot<.55?5:ot<.66?2:ot<.76?5:ot<.88?2:5,ue=D===1?le<.6?1:2:D===2?le<.7?3:4:D===3?5:D===4?6:D===5?le<.5?7:8:D===6?le<.5?10:9:0;const je=De("Water",[["Clear",11,0],["Plankton bloom",7,1],["Milky after a storm",2,2]],0),dt=De("Torch",[["Warm white",10,0],["Cool LED",8,1],["Red filter",2,2]],0),ut=De("Moon",[["New moon",7,0],["Half moon",9,1],["Full moon",4,2]],1),pt=De("Sparks",[["Faint",7,0],["Lively",10,1],["Noctiluca bloom",3,2]],1),Ft=De("Swell",[["Still",5,0],["Gentle surge",11,1],["Long swell",4,2]],1),gt=De("Meadow",[["Dense",8,0],["Sand channels",9,1],["Eroded matte",3,2]],1),ca=De("Depth",[["Six metres",5,6],["Ten metres",9,10],["Sixteen metres",4,16]],1);D&&t.trait("Meadow",["","Rock reef","Ripple field","Cobbles and boulders","Silt and burrows","Cystoseira forest","Broken rock"][D]);const mt=(()=>{const e=x()*12;return W||e<10?1:2})();let A=(parseInt(se.slice(40,48),16)^2654435769)>>>0,F=W||(()=>{A=A+1831565813>>>0;let e=A;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296})()*14<10?0:2,G=(parseInt(se.slice(48,56)||"0",16)^625341585)>>>0;const q=()=>{G=G+1831565813>>>0;let e=G;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296},de=(e,o)=>{let n=0;for(let r=0;r<o.length;r++)if(n+=o[r],e*100<n)return r;return o.length-1},Te=q(),xe=q(),pe=q(),nt=q(),Ee=[q(),q(),q(),q()];let ae=W?0:de(Te,[46,22,12,20,0,0]),ze=W?0:de(xe,[32,27,22,0,19]),Fe=W?0:de(pe,[45,30,25]);!W&&!D&&!ae&&!F&&ut===0&&(ae=3);const fa=D?"b"+D:ae===3?"s":"";X.gdK(fa,D?"#define BOT "+D+`
`:ae===3?`#define SND 1
`:"");const jt=D===5?"f":"";X.grK(jt,jt?`#define FOR 1
`:"");let zt=!1;if(po){const e={"0xde3967de":{off:!0},"0x79926f40":{find:2,hold:0,seas:0},"0x549df33d":{find:3,hold:1,seas:2},"0x4ec9bad0":{find:1,hold:3,seas:0}}[t.hash.slice(0,10)];e&&(e.find!==void 0&&(ae=e.find),e.hold!==void 0&&(ze=e.hold),e.seas!==void 0&&(Fe=e.seas),e.off!==void 0&&(zt=e.off),e.view!==void 0&&(F=e.view))}const ha=[[.19,.06,.07],[.25,.1,.12],[.36,.19,.21]][je],la=[[.15,.18,.19],[.2,.25,.23],[.45,.5,.5]][je],da=[[1,.8,.56],[.86,.94,1],[1,.17,.07]][dt],Bo=[5.2,4.8,10][dt],ua=[0,.5,1][ut],vt=[.45,1,2.4][pt],Pt=[.03,.3,.5][Ft],St=[.9,1.05,.7][Ft],pa=x()*he,me=[Math.cos(pa),Math.sin(pa)],Ke=[x()*he,x()*he,x()*he,[.22,.26,.5][gt]],Ye=[x()*200,x()*200,[.3,.36,.42][gt],.17],ka=(x()-.5)*.3,g=[-.85+x()*.15,0,Math.sin(ka),-Math.cos(ka)],ke=[[.5,.55,0,0][0],.7,5.2+x()*1.5,1.4+x()*.8];ke[0]=[.4,.55,.8][gt];const Ia=(x()-.5)*.5,st=[Math.cos(Ia),Math.sin(Ia),x()*100,0],No=ca,Ca=x()*he,ma=.6+x()*.5,Kt=[Math.cos(Ca)*Math.cos(ma),Math.sin(ma),Math.sin(Ca)*Math.cos(ma),.5+.5*(1-ua*.6)],va=[.026,.06,.07].map(e=>e*(.3+1.4*ua)*(10/ca)),te=5,Yt=4.6;let Re=[1,0];if(D){ke[2]=99;let e=Le*he;ue===3&&(e=Math.atan2(me[1],me[0])+(ra<.5?1:-1)*(Math.PI/2-.25-.35*ia)),Re=[Math.cos(e),Math.sin(e)]}const Ze=Re[0]*2.3,$e=Re[1]*2.3,xa=-Re[1],ba=Re[0];let xt=null;const Zt=X.NZ,Q=(e,o)=>{const n=Math.floor(e),r=Math.floor(o);let s=e-n,i=o-r;s=s*s*(3-2*s),i=i*i*(3-2*i);const c=n&255,l=r&255,w=c+1&255,y=l+1&255,h=Zt[l*256+c],N=Zt[l*256+w],v=Zt[y*256+c],p=Zt[y*256+w],b=h+(N-h)*s,M=v+(p-v)*s;return(b+(M-b)*i)/255},wa=(e,o)=>Q(e,o)*.5+Q(e*2.03+17.1,o*2.03+17.1)*.3+Q(e*4.1+41.7,o*4.1+41.7)*.2,Oa=(e,o)=>{const n=wa(e*Ye[3]+Ye[0],o*Ye[3]+Ye[1])-Ye[2]+.35*Math.exp(-((e-1.4)*(e-1.4)+(o+1)*(o+1))/6),r=e-g[0],s=o-g[1],i=r*g[2]+s*g[3],c=Math.abs(r*g[3]-s*g[2]),l=ke[0]*(.75+.5*Q(e*.7+3.1,o*.7+3.1)),w=D?3*(1-Z(Yt,Yt+1.8,Math.hypot(e-Ze,o-$e))):0;return n-w-ke[1]*Math.exp(-(c/l)*(c/l))*Z(-6,-3,i)},Pe=(e,o)=>Z(-.04,.05,Oa(e,o)),Fo=(e,o)=>Z(-.11,.1,Oa(e,o)),$t=(e,o)=>Z(0,1.6,e*st[0]+o*st[1]-ke[2]-1.6*(Q(e*.22+st[2],o*.22+st[2])-.5)),oe=(e,o)=>{const n=.09*Math.sin(e*.23+Ke[0])*Math.sin(o*.19+Ke[1])+.05*Math.sin(e*.11-o*.17+Ke[2]),r=$t(e,o),s=Fo(e,o)*(1-r),i=r*ke[3]*(.55+.9*wa(e*.5+7.3,o*.5+7.3))+Z(.3,1,r)*.35*(Q(e*1.7,o*1.7)-.5);return n+Ke[3]*s*(.85+.3*Q(e*1.3,o*1.3))+i+(xt?xt.h(e,o):0)},go=(e,o)=>D?1-Z(.8,.97,Math.max(Math.abs(e-Ze),Math.abs(o-$e))/te):0,zo=(e,o,n)=>{const r=(e*me[0]+o*me[1])*.9,s=Math.sin(St*n-r)+.3*Math.sin(2.13*St*n-1.9*r+1.3)+.2*Math.sin(.37*St*n+.4*r);return[me[0]*(Pt*s+.55)+(Q(e*.6+n*.35,o*.6+3)-.5)*.25,me[1]*(Pt*s+.55)+(Q(e*.6+7,o*.6+n*.31)-.5)*.25]};let Ae=[];if(D===1){const o=2*te/384,n=new Float32Array(384*384),r=new Float32Array(384*384);let s=Xe*4294967296>>>0;const i=()=>{s=s+1831565813>>>0;let f=s;return f=Math.imul(f^f>>>15,f|1),f^=f+Math.imul(f^f>>>7,f|61),((f^f>>>14)>>>0)/4294967296},c=(f,B)=>[Ze+Re[0]*f+xa*B,$e+Re[1]*f+ba*B],l=D===1,w=(f,B,P,C)=>{const U=c(f,B);if(Math.abs(f)>te-.4-P||Math.abs(B)>te-.4-P)return!1;if(!C){if(Math.hypot(f+2.3,B)<P+(l?.55:.25)||ue===2&&Math.abs(B)<.3+P*.8&&f>-1.9-P&&f<1.6)return!1;for(const z of Ae)if(Math.hypot(U[0]-z.x,U[1]-z.z)<(l?.82:1.05)*(P+z.r))return!1}return Ae.push({x:U[0],z:U[1],r:P,el:.65+.35*i(),an:i()*Math.PI,hg:P*(l?.55+.35*i():.4+.15*i()),bur:P*(.05+.15*i()),sd:i()*200,tx:(i()-.5)*.5,tz:(i()-.5)*.5}),!0};if(l){if(ue===1)for(let f=0;f<4;f++)w(-1.2+f*1.15+(i()-.5)*.2,.95-f*.3+(i()-.5)*.2,.55+.35*i(),!0);else{const f=.82+.15*i(),B=.78+.15*i();w(.3,-(f+.14),f,!0),w(.4,B+.14,B,!0),w(2.1,(i()-.5)*.3,.65+.2*i(),!0)}for(let f=0;f<500&&Ae.length<70;f++)w((i()*2-1)*te,(i()*2-1)*te,.2+.75*i()*i(),!1)}else for(let f=0;f<1400&&Ae.length<260;f++)w((i()*2-1)*te,(i()*2-1)*te,.08+.1*i(),!1);const y=Ze-te,h=$e-te;for(const f of Ae){const B=Math.cos(f.an),P=Math.sin(f.an),C=f.r*1.15,U=Math.max(0,Math.floor((f.x-C-y)/o)),z=Math.min(383,Math.ceil((f.x+C-y)/o)),O=Math.max(0,Math.floor((f.z-C-h)/o)),d=Math.min(383,Math.ceil((f.z+C-h)/o));for(let m=O;m<=d;m++)for(let T=U;T<=z;T++){const _=y+(T+.5)*o,k=h+(m+.5)*o,S=_-f.x,j=k-f.z,H=(S*B+j*P)/f.r,ve=(-S*P+j*B)/(f.r*f.el);let we=Math.hypot(H,ve);if(l&&(we*=1+.4*(Q(_*1.4+f.sd,k*1.4)-.5)+.16*(Q(_*4.3+f.sd,k*4.3)-.5)),we>=1)continue;let fe=f.hg*Math.pow(1-Math.pow(we,l?3.2:2),l?.38:.55)-f.bur;if(l){const tt=Z(1,.6,we);fe+=(f.tx*S+f.tz*j)*tt+f.r*tt*(.2*(wa(_*1.7+f.sd,k*1.7)-.5)+.1*(1-Math.abs(2*Q(_*4.1,k*4.1+f.sd)-1))+.05*(1-Math.abs(2*Q(_*9.3+f.sd,k*9.3)-1)));const at=.055+.03*(f.sd%1),Ge=fe/at,ht=Ge-Math.floor(Ge);fe=Math.max(0,(Math.floor(Ge)+Z(.55,.95,ht))*at*.6+fe*.4+f.r*.01*(Q(_*17,k*17)-.5))}const Oe=m*384+T;fe>n[Oe]&&(n[Oe]=fe,r[Oe]=fe/(f.hg-f.bur))}}const N=(f,B)=>{const P=new Float32Array(147456),C=new Float32Array(384*384),U=2*B+1;for(let z=0;z<384;z++){let O=0;for(let d=-B;d<=B;d++)O+=f[z*384+Me(d,0,383)];for(let d=0;d<384;d++)P[z*384+d]=O/U,O+=f[z*384+Math.min(383,d+B+1)]-f[z*384+Math.max(0,d-B)]}for(let z=0;z<384;z++){let O=0;for(let d=-B;d<=B;d++)O+=P[Me(d,0,383)*384+z];for(let d=0;d<384;d++)C[d*384+z]=O/U,O+=P[Math.min(383,d+B+1)*384+z]-P[Math.max(0,d-B)*384+z]}return C},v=N(n,2),p=N(n,9),b=new Float32Array(384*384*4),M=new Uint8Array(384*384*4);for(let f=0;f<384;f++)for(let B=0;B<384;B++){const P=f*384+B,C=n[P],U=(n[f*384+Math.min(383,B+1)]-n[f*384+Math.max(0,B-1)])/(2*o),z=(n[Math.min(383,f+1)*384+B]-n[Math.max(0,f-1)*384+B])/(2*o),O=1/Math.sqrt(1+U*U+z*z),d=p[P]-C,m=y+(B+.5)*o,T=h+(f+.5)*o,_=1-Me(d*(l?2.6:4),0,l?.88:.6)*(l?1:.8);b[P*4]=C,b[P*4+1]=U,b[P*4+2]=z,b[P*4+3]=_;const k=Z(.012,.045,C);if(l){const S=r[P],j=k*Z(.45,.8,O)*Z(.35,.7,S)*Z(.5,.72,Q(m*4.6+5,T*4.6)*.6+Q(m*11,T*11+3)*.4),H=k*Z(.4,.75,O)*Z(.2,.55,Q(m*2.3+50,T*2.3)*.8+.3*S),ve=k*Z(.75,.35,O)*Z(.55,.2,S)*Z(.05,.3,d+.1),we=Math.max(1-k,k*Z(.85,.97,O)*Z(.004,.012,v[P]-C+.002)*.9);M[P*4]=j*255,M[P*4+1]=H*255,M[P*4+2]=ve*255,M[P*4+3]=we*255}else M[P*4+3]=(1-k)*255}const L=(f,B,P)=>{const C=a.createTexture();return a.bindTexture(a.TEXTURE_2D,C),a.texImage2D(a.TEXTURE_2D,0,f,384,384,0,a.RGBA,B,P),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),C};xt={tH:L(a.RGBA16F,a.FLOAT,b),tM:L(a.RGBA8,a.UNSIGNED_BYTE,M),h:(f,B)=>{const P=(f-y)/o-.5,C=(B-h)/o-.5;if(P<0||C<0||P>=383||C>=383)return 0;const U=P|0,z=C|0,O=P-U,d=C-z,m=z*384+U;return(n[m]*(1-O)+n[m+1]*O)*(1-d)+(n[m+384]*(1-O)+n[m+384+1]*O)*d}},a.bindTexture(a.TEXTURE_2D,null)}if(D===3){const o=2*te/512,n=new Float32Array(512*512),r=new Float32Array(512*512),s=new Int16Array(512*512).fill(-1);let i=Xe*4294967296>>>0;const c=()=>{i=i+1831565813>>>0;let d=i;return d=Math.imul(d^d>>>15,d|1),d^=d+Math.imul(d^d>>>7,d|61),((d^d>>>14)>>>0)/4294967296},l=Ze-te,w=$e-te,y=.6,h=Math.ceil(2*te/y)+1,N=[];for(let d=0;d<h*h;d++)N.push([]);const v=(d,m,T)=>{if(d<l+.25+T||m<w+.25+T||d>l+2*te-.25-T||m>w+2*te-.25-T||T>.22&&Math.hypot(d,m)<1.1+T)return;const _=Math.floor((d-l)/y),k=Math.floor((m-w)/y),S=Math.ceil((T+.65)/y);for(let ve=Math.max(0,k-S);ve<=Math.min(h-1,k+S);ve++)for(let we=Math.max(0,_-S);we<=Math.min(h-1,_+S);we++)for(const fe of N[ve*h+we])if(Math.hypot(d-fe.x,m-fe.z)<.9*(T+fe.r))return;const j=c(),H={x:d,z:m,r:T,el:.6+.4*c(),an:c()*Math.PI,hg:T*(j<.25?.3+.12*c():.42+.3*c()),bur:T*(.03+.1*c()),sd:c()*200,tint:c(),tx:c()-.5,tz:c()-.5,cap:j<.25?.75+.15*c():2,pe:1.8+2.4*c()};N[k*h+_].push(H),Ae.push(H)},p=5+(c()*6|0);for(let d=0;d<60&&Ae.length<p;d++)v(l+c()*2*te,w+c()*2*te,.3+.28*c());for(let d=0;d<3e4&&Ae.length<7e3;d++){const m=l+c()*2*te,T=w+c()*2*te,_=.5+1.1*Z(.25,.75,Q(m*.35+Xe*50,T*.35));v(m,T,(.04+.2*Math.pow(c(),1.6))*_*(d<6e3?1.3:1))}const b=new Float32Array(512*512).fill(9),M=new Float32Array(512*512).fill(9),L=new Float32Array(512*512),f=new Float32Array(512*512);for(let d=0;d<Ae.length;d++){const m=Ae[d],T=Math.cos(m.an),_=Math.sin(m.an),k=m.r*1.5,S=Math.max(0,Math.floor((m.x-k-l)/o)),j=Math.min(511,Math.ceil((m.x+k-l)/o)),H=Math.max(0,Math.floor((m.z-k-w)/o)),ve=Math.min(511,Math.ceil((m.z+k-w)/o));for(let we=H;we<=ve;we++)for(let fe=S;fe<=j;fe++){const Oe=l+(fe+.5)*o-m.x,tt=w+(we+.5)*o-m.z,at=(Oe*T+tt*_)/m.r,Ge=(-Oe*_+tt*T)/(m.r*m.el),ht=Math.hypot(at,Ge)*(1+.18*(Q(at*1.3+m.sd,Ge*1.3+m.sd)-.5)+.06*(Q(at*3.7+m.sd,Ge*3.7)-.5)),Ue=we*512+fe;ht<b[Ue]?(M[Ue]=b[Ue],b[Ue]=ht,s[Ue]=d,L[Ue]=at,f[Ue]=Ge):ht<M[Ue]&&(M[Ue]=ht)}}for(let d=0;d<512*512;d++){if(s[d]<0)continue;const m=Ae[s[d]],T=L[d],_=f[d],k=Math.max(2*b[d]/(b[d]+M[d]),b[d]*.92);if(k>=1)continue;let S=m.hg*Math.pow(1-Math.pow(k,m.pe),.5)+(m.tx*T+m.tz*_)*m.hg*.4*(1-k*k);const j=m.hg*m.cap;S>j&&(S=j+(S-j)*.2),S+=m.r*(.07*(Q(T*2.6+m.sd,_*2.6)-.5)+.025*(Q(T*8,_*8+m.sd)-.5))-m.bur,S>0?(n[d]=S,r[d]=Me((S+m.bur)/m.hg,0,1)):s[d]=-1}const B=(d,m)=>{const T=new Float32Array(262144),_=new Float32Array(512*512),k=2*m+1;for(let S=0;S<512;S++){let j=0;for(let H=-m;H<=m;H++)j+=d[S*512+Me(H,0,511)];for(let H=0;H<512;H++)T[S*512+H]=j/k,j+=d[S*512+Math.min(511,H+m+1)]-d[S*512+Math.max(0,H-m)]}for(let S=0;S<512;S++){let j=0;for(let H=-m;H<=m;H++)j+=T[Me(H,0,511)*512+S];for(let H=0;H<512;H++)_[H*512+S]=j/k,j+=T[Math.min(511,H+m+1)*512+S]-T[Math.max(0,H-m)*512+S]}return _},P=B(n,4),C=B(n,12),U=new Float32Array(512*512*4),z=new Uint8Array(512*512*4);for(let d=0;d<512;d++)for(let m=0;m<512;m++){const T=d*512+m,_=n[T],k=l+(m+.5)*o,S=w+(d+.5)*o,j=(n[d*512+Math.min(511,m+1)]-n[d*512+Math.max(0,m-1)])/(2*o),H=(n[Math.min(511,d+1)*512+m]-n[Math.max(0,d-1)*512+m])/(2*o),ve=1/Math.sqrt(1+j*j+H*H),we=Math.max(P[T]-_,0)+.5*Math.max(C[T]-_,0);U[T*4]=_,U[T*4+1]=j,U[T*4+2]=H,U[T*4+3]=1-Me(we*12,0,.9);const fe=Z(.003,.015,_),Oe=r[T],tt=s[T]>=0?Ae[s[T]].tint:0,at=s[T]>=0&&Ae[s[T]].sd%1<.4?1:.12,Ge=fe*Z(.55,.9,Oe)*Z(.55,.85,ve)*Z(.48,.66,Q(k*5.3+tt*60,S*5.3)*.7+Q(k*15,S*15+3)*.3)*at,ht=fe*Z(.4,.8,ve)*Z(.25,.65,Oe)*(.45+.55*Q(k*3.1+tt*9,S*3.1)),Ue=Math.max(1-fe,fe*Z(.93,.99,ve)*Z(.35,.15,Oe)*.8);z[T*4]=Ge*255,z[T*4+1]=ht*255,z[T*4+2]=tt*255,z[T*4+3]=Ue*255}const O=(d,m,T)=>{const _=a.createTexture();return a.bindTexture(a.TEXTURE_2D,_),a.texImage2D(a.TEXTURE_2D,0,d,512,512,0,a.RGBA,m,T),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),_};xt={tH:O(a.RGBA16F,a.FLOAT,U),tM:O(a.RGBA8,a.UNSIGNED_BYTE,z),h:(d,m)=>{const T=(d-l)/o-.5,_=(m-w)/o-.5;if(T<0||_<0||T>=511||_>=511)return 0;const k=T|0,S=_|0,j=T-k,H=_-S,ve=S*512+k;return(n[ve]*(1-j)+n[ve+1]*j)*(1-H)+(n[ve+512]*(1-j)+n[ve+512+1]*j)*H}},a.bindTexture(a.TEXTURE_2D,null)}const bt=g[2],wt=g[3],rt=-g[3],it=g[2],Ga=(e,o,n,r)=>{let s=0;for(;s<3&&!(Pe(e+n*s,o+r*s)>.5);s+=.04);return s};let R=null;if(ae===1){const e=1.3+Ee[0]*1.8,o=Ee[1]<.5?-1:1,n=g[0]+bt*e,r=g[1]+wt*e,s=Ga(n,r,rt*o,it*o),i=n+rt*o*s,c=r+it*o*s;for(const l of[.75,.6,.48]){const w=i-rt*o*l-bt*.3,y=c-it*o*l-wt*.3,h=oe(w,y);!R&&s<2.9&&Pe(w,y)<.4&&(R={e:[w,h+.4,y],aim:[i+bt*.3,h+Ke[3]*.5,c+wt*.3],ex:.3})}}else if(ae===2)for(let e=0;e<40&&!R;e++){const o=Ee[0]*he+e*2.4,n=1.2+3*((Ee[1]+e*.37)%1),r=Math.cos(o)*n,s=Math.sin(o)*n,i=r+me[0]*2.4,c=s+me[1]*2.4;Pe(r,s)>.6&&$t(r,s)<.01&&Pe(i,c)>.6&&Pe(r+me[0]*1.2,s+me[1]*1.2)>.6&&i*i+c*c<64&&(R={e:[r,oe(r,s)+1.4,s],aim:[i,oe(i,c)+.55,c],gaze:[r+me[0]*1.5,oe(r,s)+.5,s+me[1]*1.5],ex:.2})}else if(ae===3)for(let e=0;e<12&&!R;e++){const o=.9+(Ee[0]+e*.29)%1*2.4,n=g[0]+bt*o+rt*(Ee[1]-.5)*.15,r=g[1]+wt*o+it*(Ee[1]-.5)*.15,s=(Ee[2]-.5)*1.4,i=bt*Math.cos(s)-rt*Math.sin(s),c=wt*Math.cos(s)-it*Math.sin(s);Pe(n,r)<.15&&(R={e:[n-i*.2,oe(n,r)+.62,r-c*.2],aim:[n,oe(n,r),r],ex:.5})}ae&&!R&&(ae=0),!D&&ze===1&&(ae===1||!ae&&!F&&ut===0)&&(ze=0);let Ct=null;if(D){ae=0,F=0;const e=(s,i)=>[Ze+Re[0]*s+xa*i,$e+Re[1]*s+ba*i],o=s=>oe(s[0],s[1]),n=[0,0];let r=0;for(let s=0;s<he;s+=.5)r=Math.max(r,oe(Math.cos(s)*.35,Math.sin(s)*.35));if(ue===1){const s=Ae[1],i=Ae[2];R={e:[n[0],r+.8,n[1]],aim:[s.x,oe(s.x,s.z)*.8,s.z],gaze:[(s.x+i.x)/2,oe(s.x,s.z)*.5,(s.z+i.z)/2],ex:.3}}else if(ue===2){const s=e(.5,0),i=e(.25,0);R={e:[n[0],r+1.05,n[1]],aim:[s[0],o(s)+.1,s[1]],gaze:[i[0],o(i)+.3,i[1]],ex:.3}}else if(ue===3){const s=e(1.2,0),i=e(.9,-.15);R={e:[n[0],r+.25,n[1]],aim:[i[0],o(i)+.02,i[1]],gaze:[s[0],o(s)-.02,s[1]],ex:.3}}else if(ue===7){const s=e(-1.05,0),i=e(-1.15,.1);R={e:[n[0],r+.5,n[1]],aim:[i[0],o(i)+.22,i[1]],gaze:[s[0],o(s)+.08,s[1]],ex:.3}}else if(ue===8){const s=e(-1.05,0);R={e:[n[0],r+1.2,n[1]],aim:[s[0],o(s)+.3,s[1]],gaze:[s[0],o(s)+.15,s[1]],ex:.3}}else{const s=e(-1.15,0);R={e:[n[0],r+.72,n[1]],aim:[s[0],o(s),s[1]],ex:.3}}ze===2&&(ue===2||D>=2)&&(ze=0)}if(D===2&&He<.55&&ut>0||D===4&&He<.35){ze=5,R.gaze||(R.gaze=R.aim.slice());const e=R.e[0],o=R.e[2],n=R.aim[0]-e,r=R.aim[2]-o,s=Math.hypot(n,r)||1,i=n/s,c=r/s,l=e-c*.3+i*.25,w=o+i*.3+c*.25;Ct=[l,oe(l,w)+.05,w];const y=l+i*2.4+c*.25,h=w+c*2.4-i*.25;R.aim=[y,oe(y,h)+.03,h]}let Je=null;if(!R&&F===0){const e=g[0]+bt*.92,o=g[1]+wt*.92,n=Ga(e,o,-rt,-it),r=e-rt*(n-.1),s=o-it*(n-.1),i=g[0]+rt*.1-bt*.2,c=g[1]+it*.1-wt*.2,l=Math.hypot(r-i,s-c)||1;Je=[i+(r-i)/l*.3,.95,c+(s-c)/l*.3]}const Va=R?[R.e[0],R.e[2]]:[0,0],Mt=9.5,Jt=.3,Ma=4.2;let _t=[],Qt=[];const Po=[1.06,.5,.72][Fe],ya=R?R.e[0]:Je?Je[0]:g[0]-g[3]*.1-g[2]*.2,Ta=R?R.e[2]:Je?Je[2]:g[1]+g[2]*.1-g[3]*.2,So=R?R.ex:.6,Wa=(e,o,n,r,s,i,c,l,w)=>{Math.hypot(o-ya,r-Ta)<=So||Fe===1&&(l>.7?w<.8:w<.25)||Fe===2&&(l>.55?w<.85:w<.2)||e.push(o,n,r,s*(Fe===0?1:Po*(Fe===1?.9+.3*w:1)),i,c,Fe===1?l*.55:l,w)},Ha=(e,o)=>{let n=Math.imul(e*73856093^o*19349663,2654435761)>>>0;return n^=n>>>15,n=Math.imul(n,2246822507)>>>0,n^=n>>>13,(n>>>0)/4294967296},Ea=t.hash+(W?" home":""),qt=X.gC||(X.gC=new Map);let ge=qt.get(Ea);if(ge)qt.delete(Ea),J=ge.s[0],ne=ge.s[1],ie=ge.s[2],Ne=ge.s[3];else for(let e=-Mt;e<Mt;e+=Jt)for(let o=-Mt;o<Mt;o+=Jt){const n=e+x()*Jt,r=o+x()*Jt,s=x(),i=x();if(n*n+r*r>Mt*Mt)continue;const c=Pe(n,r);if(c<.5||$t(n,r)>.06||s>(gt===0?1:.93))continue;const l=Z(.5,.9,c),w=3+(i*(gt===0?6:5)|0)+(n*n+r*r<9?1:0),y=.05+.08*x(),h=x()*he,N=(.55+.3*l)*(.9+.35*Q(n*.8+40,r*.8)),v=oe(n,r)-.03,p=c<.62,b=n*n+r*r<Ma*Ma,M=R?Math.hypot(n-Va[0],r-Va[1])<Ma:b,L=M?_t:Qt;for(let f=0;f<w;f++){const B=x()*he,P=y*Math.sqrt(x()),C=n+Math.cos(B)*P,U=r+Math.sin(B)*P;if(p&&Pe(C,U)<.45)continue;const z=v,O=4+(x()*4|0),d=h+(x()-.5)*.9,m=.85+.3*x();for(let T=0;T<O;T++){const _=(T+.5)/O,k=x();if(!b&&T&1&&T!==O-1){if(M){const S=Ha(e*40+f,o*40+T),j=Ha(o*40+T,e*40+f+7);Wa(L,C,z,U,(.22+.6*_+.12*S)*N*m,d+(T&1?Math.PI:0)+(j-.5)*.35,.03+.1*_+.04*S,Me(_*.85+j*.3,0,1),k)}continue}Wa(L,C,z,U,(.22+.6*_+.12*x())*N*m,d+(T&1?Math.PI:0)+(x()-.5)*.35,.03+.1*_+.04*x(),Me(_*.85+x()*.3,0,1),k)}}}ge||(ge={s:[J,ne,ie,Ne],near:new Float32Array(_t),far:new Float32Array(Qt),m:{}},_t=[],Qt=[]),qt.set(Ea,ge),qt.size>4&&qt.delete(qt.keys().next().value);{const e=D?D===2?5:0:[50,12,220][Fe],o=R?R.e[0]:ya,n=R?R.e[2]:Ta;for(let r=0,s=0;r<e*5&&s<e;r++){const i=r*.618%1*he,c=3*Math.sqrt(r*.382%1),l=q()<.7,w=o+(l?Math.cos(i*7%he)*c*(r%5)/4+(q()-.5)*.5:(q()*2-1)*3.4),y=n+(l?Math.sin(i*7%he)*c*(r%5)/4+(q()-.5)*.5:(q()*2-1)*3.4),h=Pe(w,y),N=q(),v=.12+.3*q(),p=Math.atan2(me[1],me[0])+(q()-.5)*2,b=q();h>.55||$t(w,y)>.05||N>.25+2.2*h*(1-h)*2||Math.hypot(w-ya,y-Ta)<.2||(_t.push(w,oe(w,y)+.004,y,v,p,0,2,b),s++)}}const _o=(e,o)=>{const n=g[0]+g[2]*e,r=g[1]+g[3]*e,s=-g[3]*o,i=g[2]*o;let c=0;for(;c<3&&!(Pe(n+s*c,r+i*c)>.5);c+=.05);return[n+s*c,r+i*c,c]},Qe=-g[3],et=g[2],Xa=_o(.85+x()*.15,-1),Ie=[{x:Xa[0]+Qe*.1,z:Xa[1]+et*.1,yaw:Math.atan2(Qe,et)+(x()-.5)*.4,turn:0,tt:-9,sd:x()}];mt===2&&Ie.push({x:Ie[0].x-g[2]*.22+Qe*.05,z:Ie[0].z-g[3]*.22+et*.05,yaw:Ie[0].yaw+.5,turn:0,tt:-9,sd:x()});for(const e of Ie)e.y=oe(e.x,e.z),e.H=.4+.12*e.sd,e.bL=.5+x()*.1,e.bAz=Math.atan2(et,Qe)+(x()-.5)*.6,e.bs=x(),_t.push(e.x,e.y-.03,e.z,e.bL,e.bAz,.14,.5,e.bs);const ja=Ie[0],ce={x:ja.x+Qe*(.3+x()*.15)+g[2]*.6,z:ja.z+et*(.3+x()*.15)+g[3]*.6,rot:x()*he,curl:x()};ce.y=oe(ce.x,ce.z);const Ce=F===2?[g[0]+g[2]*2.1+Qe*.05,0,g[1]+g[3]*2.1+et*.05]:null;Ce&&(Ce[1]=oe(Ce[0],Ce[2])+.06);const yt=17,qo=g[0]+Qe*.1-g[2]*.2,Do=g[1]+et*.1-g[3]*.2,Ra=(e,o,n)=>{let r=ge.m[n];if(!r){const c=new Float32Array(e.length+o.length);c.set(e);for(let p=0;p<o.length;p++)c[e.length+p]=o[p];const l=c.length/8,w=new Uint8Array(l),y=new Int32Array(yt+1);for(let p=0;p<l;p++){const b=c[p*8]-qo,M=c[p*8+2]-Do;w[p]=b*b+M*M<2.25?0:1+Math.min(15,(Math.atan2(M,b)/he+.5)*16|0),y[w[p]+1]++}for(let p=0;p<yt;p++)y[p+1]+=y[p];const h=new Float32Array(c.length),N=y.slice(0,yt),v=new Float32Array(yt*6);for(let p=0;p<yt;p++)v.set([1e9,1e9,1e9,-1e9,-1e9,-1e9],p*6);for(let p=0;p<l;p++){const b=w[p],M=N[b]++*8,L=c[p*8+3]+.05,f=b*6;for(let B=0;B<8;B++)h[M+B]=c[p*8+B];v[f]=Math.min(v[f],c[p*8]-L),v[f+1]=Math.min(v[f+1],c[p*8+1]-.05),v[f+2]=Math.min(v[f+2],c[p*8+2]-L),v[f+3]=Math.max(v[f+3],c[p*8]+L),v[f+4]=Math.max(v[f+4],c[p*8+1]+L),v[f+5]=Math.max(v[f+5],c[p*8+2]+L)}r=ge.m[n]={data:h,n:l,st:y,box:v}}const s=a.createVertexArray();a.bindVertexArray(s);const i=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,i),a.bufferData(a.ARRAY_BUFFER,r.data,a.STATIC_DRAW);for(let c=0;c<2;c++)a.enableVertexAttribArray(c),a.vertexAttribPointer(c,4,a.FLOAT,!1,32,c*16),a.vertexAttribDivisor(c,1);return a.bindVertexArray(null),{vao:s,b:i,n:r.n,st:r.st,box:r.box}},ea=[],Ka=[];if(D===5){let e=(Xe*4294967296^5369127)>>>0;const o=()=>{e=e+1831565813>>>0;let h=e;return h=Math.imul(h^h>>>15,h|1),h^=h+Math.imul(h^h>>>7,h|61),((h^h>>>14)>>>0)/4294967296},n=ze===1?-.32:.3,r=Re[0]*.6-Re[1]*n,s=Re[1]*.6+Re[0]*n,i=.4,c=ue===7?.8:.5,l=R.gaze[0]-R.e[0],w=R.gaze[2]-R.e[2],y=Math.hypot(l,w)||1;for(let h=-te+.3;h<te-.3;h+=i)for(let N=-te+.3;N<te-.3;N+=i){const v=o(),p=o(),b=o(),M=Ze+Re[0]*(h+(v-.5)*i*.9)+xa*(N+(p-.5)*i*.9),L=$e+Re[1]*(h+(v-.5)*i*.9)+ba*(N+(p-.5)*i*.9),f=Math.hypot(M,L);if(Math.hypot(M-Ze,L-$e)>Yt+.5||f<c||Math.hypot(M-r,L-s)<.6)continue;const B=(M*l+L*w)/y/f>.8&&f<2.4,P=Q(M*.55+Xe*90,L*.55+11)*.7+Q(M*1.4+5,L*1.4+Xe*70)*.3;if(!B&&P<.3+.1*b)continue;const C=o()<.16,U=C?.05+.05*o():.06+.1*o(),z=C?.5+.35*o():.19+.16*o(),O=C?6+(o()*4|0):38+(o()*16|0),d=oe(M,L)-.01,m=o()*he,T=(C?4:3)+U;ea.push(M,d,L,U+.02,m,-1,T,o()),C||Ka.push([M,d+U+z*.45,L,f,(M*l+L*w)/y/f]);for(let _=0;_<O;_++){const k=m+_*2.4+(o()-.5)*.8,S=Math.sqrt(o());ea.push(M,d,L,z*(.6+.5*o())*(C?1:1.05-.2*S),k,C?.08+.45*S:.2+1.5*S,T,o())}}}if(D===5){let e=null,o=1e9;for(const n of Ka){const r=ue===7?n[4]>.82?n[3]+3*(1-n[4]):1e9:Math.hypot(n[0]-R.gaze[0],n[2]-R.gaze[2]);r<o&&(o=r,e=n)}e&&(R.aim=[e[0],e[1],e[2]],ue===7&&(R.gaze=[e[0]*1.5,e[1]*.55,e[2]*1.5]))}const Ya=Ra(ge.near,_t,"near"),Uo=Ra(ge.far,Qt,"far"),ta=ea.length?Ra(ea,[],"for"):null;ge.near=ge.far=null;const Za=200,Aa=new Float32Array(Za*24),Ba=a.createVertexArray();a.bindVertexArray(Ba);const $a=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,$a),a.bufferData(a.ARRAY_BUFFER,Aa.byteLength,a.DYNAMIC_DRAW);for(let e=0;e<6;e++)a.enableVertexAttribArray(e),a.vertexAttribPointer(e,4,a.FLOAT,!1,96,e*16),a.vertexAttribDivisor(e,1);a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,X.tib),a.bindVertexArray(null);const Ja=900,Qa=new Float32Array(Ja*8),eo=a.createVertexArray();a.bindVertexArray(eo);const to=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,to),a.bufferData(a.ARRAY_BUFFER,Qa.byteLength,a.DYNAMIC_DRAW);for(let e=0;e<2;e++)a.enableVertexAttribArray(e),a.vertexAttribPointer(e,4,a.FLOAT,!1,32,e*16);a.bindVertexArray(null);let Dt=0;const Lo=(e,o,n,r,s,i,c,l,w,y,h,N,v,p)=>{if(Dt>=Za)return;const b=Dt++*24,M=Aa;M[b]=e[0],M[b+1]=e[1],M[b+2]=e[2],M[b+3]=s,M[b+4]=o[0],M[b+5]=o[1],M[b+6]=o[2],M[b+7]=i,M[b+8]=n[0],M[b+9]=n[1],M[b+10]=n[2],M[b+11]=c,M[b+12]=r[0],M[b+13]=r[1],M[b+14]=r[2],M[b+15]=l,M[b+16]=w[0],M[b+17]=w[1],M[b+18]=w[2],M[b+19]=y,M[b+20]=N,M[b+21]=v,M[b+22]=p,M[b+23]=h},ko=(e,o,n,r)=>{const s=Math.cos(o),i=Math.sin(o),c=Math.cos(n),l=Math.sin(n),w=Math.cos(r),y=Math.sin(r);return h=>{let N=h[0]*w-h[1]*y,v=h[0]*y+h[1]*w,p=h[2];const b=v*c-p*l,M=v*l+p*c;return v=b,p=M,[e[0]+N*s+p*i,e[1]+v,e[2]-N*i+p*s]}},jo=(e,o)=>{const n=e([0,0,0]),r=e(o);return[r[0]-n[0],r[1]-n[1],r[2]-n[2]]},Ko=(e,o,n,r,s,i,c,l,w,y)=>{const h=[Math.cos(s),Math.sin(s)],N=zo(e,n,y),v=e*3.1+n*2.3,p=8,b=r/p;let M=e,L=o,f=n;const B=Math.floor(w*p),P=w*p-B,C=U=>{const z=2.7*Math.pow(U,1.25),O=.035*Math.sin(y*1.3+U*4+v),d=i+.1*U+.25*c*U*U;return[h[0]*d+N[0]*z-h[1]*O,h[1]*d+N[1]*z+h[0]*O]};for(let U=0;U<=B&&U<p;U++){const z=U<B?1:P;if(z<=0)break;const O=C((U+.5)/p),d=Math.hypot(O[0],O[1])||1e-4,m=Math.min(d,1.5);M+=O[0]/d*Math.sin(m)*b*z,L+=Math.cos(m)*b*z,f+=O[1]/d*Math.sin(m)*b*z}return[M,L,f]};function ao(e){if(Dt=0,!!oo){{const o=ko([ce.x,ce.y+.004,ce.z],ce.rot,0,0);for(let n=0;n<5;n++){const r=n/5*he+Math.sin(n*3.1+ce.curl*9)*.12,s=[Math.sin(r),0,Math.cos(r)],i=[Math.cos(r),0,-Math.sin(r)],c=(ce.curl-.5)*.05*(n&1?1:-1),l=(N,v,p)=>o([s[0]*N+i[0]*v,p,s[2]*N+i[2]*v]),w=(N,v)=>oe(N,v)+.004,y=l(.105,c*1.6,0),h=w(y[0],y[2])-ce.y;Lo(l(0,0,.009),l(.035,c*.2,.009),l(.07,c*.8,.006+h*.5),l(.11,c*1.6,.003+h),.021,.013,.005,5,[0,1,0],.3,1,2,ce.curl+n,0)}}a.bindBuffer(a.ARRAY_BUFFER,$a),a.bufferSubData(a.ARRAY_BUFFER,0,Aa,0,Dt*24)}}const Ot=700,V=new Float32Array(Ot*10);let Na=0;for(let e=0;e<Ot;e++)V[e*10+6]=99;const Fa=(e,o,n,r,s,i,c,l,w,y=.5)=>{for(let h=0;h<r;h++){const N=Na*10;Na=(Na+1)%Ot,V[N]=e+(x()-.5)*s,V[N+1]=o+(x()-.5)*s,V[N+2]=n+(x()-.5)*s,V[N+3]=i+(x()-.5)*.25,V[N+4]=c+(x()-.5)*.25,V[N+5]=l+(x()-.5)*.25,V[N+6]=-x()*y,V[N+7]=.15+x()*.5,V[N+8]=w*(.3+x()*x()*1.4),V[N+9]=x()}},Gt=Ie[0],Y=R?R.e.slice():[g[0]+Qe*.1-g[2]*.2,1.05,g[1]+et*.1-g[3]*.2];Je&&(Y[0]=Je[0],Y[1]=Je[1],Y[2]=Je[2]);let Se=Math.atan2(Gt.x-Y[0],-(Gt.z-Y[2]))+.06,Tt=Math.atan2(Gt.y+.2-Y[1],Math.hypot(Gt.x-Y[0],Gt.z-Y[2]))+.14;F===0&&(Se-=.14);const Io=60*Math.PI/180,qe=Math.tan(Io/2);let Vt=null;if(R){Vt=R.aim.slice();const e=R.gaze||R.aim;Se=Math.atan2(e[0]-Y[0],-(e[2]-Y[2])),Tt=Math.atan2(e[1]-Y[1],Math.hypot(e[0]-Y[0],e[2]-Y[2])),ae===1&&(Tt+=.08)}else F===2&&(Vt=Ce.slice(),Se=Math.atan2(Ce[0]-Y[0],-(Ce[2]-Y[2]))+.12,Tt=Math.atan2(Ce[1]+.45-Y[1],Math.hypot(Ce[0]-Y[0],Ce[2]-Y[2])));if(ae===3){const e=R.gaze||Vt;ce.x=e[0]+.2*Math.cos(Se)+.1*Math.sin(Se),ce.z=e[2]+.2*Math.sin(Se)-.1*Math.cos(Se),ce.y=oe(ce.x,ce.z)}const oo=D?D===2&&Nt<.25:ae!==3||Nt<.25;if(D===2&&oo){const e=R.gaze?(R.aim[0]+R.gaze[0])/2:R.aim[0],o=R.gaze?(R.aim[2]+R.gaze[2])/2:R.aim[2];ce.x=e+.05,ce.z=o,ce.y=oe(ce.x,ce.z)}t.trait("View",D?["","Along the rock","Into the crevice","Low over the ripples","Over the ripples","Over the cobbles","Over the silt","At the forest's edge","Over the canopy","Along the ledges","Into the crevice"][ue]:!ae&&F===2?"Up the channel":["The bank","The matte wall","Over the canopy","Down on the sand","The reef's foot","Up the beam"][ae]);const ct=[[.3,-.28,.6],[-.32,-.26,.6],[.05,.13,.06],[.24,-.24,.55],[.16,-.14,.22],[0,0,0]][ze].slice();(ae===3||ue>=4&&ue<=6)&&(ct[1]*=.5,ct[2]=.1);const aa=[1,1,1,.42,2.15,1][ze]*(D===5&&ze<2?1.3:1),Co=[1,1,1,2.2,.5,.75][ze]*(D===5&&ze<2?1.25:1);t.trait("Torch held",["Low in the right hand","Low in the left hand","Above the mask","Pencil spot","Wide flood","Laid on the sand"][ze]),t.trait("Season",["High summer","Spring growth","Autumn litter"][Fe]),zt&&t.trait("Opening","Torch off"),ae===5?X.finS():X.fin();const Et=new Float32Array(16),Ut=new Float32Array(16),no=new Float32Array(80),u={e:Y.slice(),f:[0,0,-1],r:[1,0,0],u:[0,1,0]},Be=[0,0,0];let $=null;const Oo=()=>{const e=t.view||uo,o=Se+(e.yaw||0),n=Me(Tt+(e.pitch||0),-1.45,1.45),r=u.e,s=u.f,i=u.r,c=u.u;u.e=[Y[0]+Me(e.x||0,-1,1),Y[1]+Me(e.y||0,-.6,1.2),Y[2]+Me(e.z||0,-1,1)],u.f=[Math.sin(o)*Math.cos(n),Math.sin(n),-Math.cos(o)*Math.cos(n)],u.r=lt(At(u.f,[0,1,0])),u.u=At(u.r,u.f);for(let l=0;l<3;l++)Be[l]=Ct?Ct[l]:u.e[l]+u.r[l]*ct[0]+u.u[l]*ct[1]+u.f[l]*ct[2];if($&&(s[0]!==u.f[0]||s[1]!==u.f[1]||s[2]!==u.f[2]||r[0]!==u.e[0]||r[1]!==u.e[1]||r[2]!==u.e[2])){const l=y=>{const h=Bt(y,i),N=Bt(y,c),v=Bt(y,s);return[u.r[0]*h+u.u[0]*N+u.f[0]*v,u.r[1]*h+u.u[1]*N+u.f[1]*v,u.r[2]*h+u.u[2]*N+u.f[2]*v]},w=y=>{const h=l([y[0]-r[0],y[1]-r[1],y[2]-r[2]]);return[u.e[0]+h[0],u.e[1]+h[1],u.e[2]+h[2]]};$.cur=l($.cur),$.base=w($.base),$.tap&&($.tap=w($.tap))}},ga=(e,o)=>{const n=lt([u.f[0]+(2*e-1)*qe*u.r[0]+(1-2*o)*qe*u.u[0],u.f[1]+(2*e-1)*qe*u.r[1]+(1-2*o)*qe*u.u[1],u.f[2]+(2*e-1)*qe*u.r[2]+(1-2*o)*qe*u.u[2]]);let r=0;for(let s=.2;s<16;s+=.06){const i=u.e[0]+n[0]*s,c=u.e[1]+n[1]*s,l=u.e[2]+n[2]*s;if(c<oe(i,l)+.4*Pe(i,l))return{p:[u.e[0]+n[0]*(s+r)/2,u.e[1]+n[1]*(s+r)/2,u.e[2]+n[2]*(s+r)/2],d:n};r=s}return{p:[u.e[0]+n[0]*6,u.e[1]+n[1]*6,u.e[2]+n[2]*6],d:n}};u.f=[Math.sin(Se)*Math.cos(Tt),Math.sin(Tt),-Math.cos(Se)*Math.cos(Tt)],u.r=lt(At(u.f,[0,1,0])),u.u=At(u.r,u.f),u.e=Y.slice();for(let e=0;e<3;e++)Be[e]=Ct?Ct[e]:Y[e]+u.r[e]*ct[0]+u.u[e]*ct[1]+u.f[e]*ct[2];const Rt=Vt||[Ie[0].x-Qe*.1,Ie[0].y+.2,Ie[0].z-et*.1];$={cur:lt([Rt[0]-Be[0],Rt[1]-Be[1],Rt[2]-Be[2]]),tgt:null,base:Rt.slice(),tap:null,tapT:-9},$.tgt=$.cur.slice();let Wt=Math.hypot(Rt[0]-Be[0],Rt[1]-Be[1],Rt[2]-Be[2]);for(let e=.15;e<Wt;e+=.05){const o=Be[0]+$.cur[0]*e,n=Be[1]+$.cur[1]*e,r=Be[2]+$.cur[2]*e;if(n<oe(o,r)+.4*Pe(o,r)){Wt=e;break}}const so=(Wt*Wt+.3)*Math.exp(.06*(Wt-1.8))/3.54,Go=R?Me(so,.32,2):Vt?1.6:Me(so,.9,2),E={pow:zt?0:1,adapt:zt?1:0,wasDown:!1,pT:0,px:0,py:0,moved:!1,hold:!1,kickT:1.2,breathT:2,frame:0,lastT:0,simT:0,on:!zt,wT:0,wO:[0,0,0]},oa=t.sound||{hit(){},note(){}},be=1/30;function ro(e){const o=t.input||{},n=o.taps?o.taps():[];o.down&&!E.wasDown&&(E.pT=e,E.px=o.x,E.py=o.y,E.moved=!1,E.hold=!1),!o.down&&!E.wasDown&&(E.hold=!1),o.down&&(Math.hypot(o.x-E.px,o.y-E.py)>.03&&(E.moved=!0),!E.moved&&e-E.pT>.4&&(E.hold=!0));let r=null;if(!o.down&&E.wasDown&&!E.moved&&!E.hold?r=[E.px,E.py]:!o.down&&!E.wasDown&&n.length&&(r=[n[0].x,n[0].y]),o.down&&E.moved&&!E.hold){const v=ga(o.x,o.y);$.base=v.p}if(o.down&&E.wasDown){const v=o.x-E.lx,p=o.y-E.ly,b=Math.hypot(v,p)/be;if(b>.05){const M=ga(o.x,o.y),L=M.d,f=Math.hypot(M.p[0]-u.e[0],M.p[1]-u.e[1],M.p[2]-u.e[2]),B=u.r[0]*v-u.u[0]*p,P=u.r[1]*v-u.u[1]*p,C=u.r[2]*v-u.u[2]*p;for(let U=Math.min(14,b*5*vt*(1+E.adapt))+x();U>=1;U--){const z=Math.min(f-.1,.9+x()*1.4),O=x();Fa(u.e[0]+L[0]*z-B*O*3,u.e[1]+L[1]*z-P*O*3,u.e[2]+L[2]*z-C*O*3,1,.1*z,B*8,P*8,C*8,vt*(.6+.5*x()),.06)}}}if(E.lx=o.x,E.ly=o.y,r){const v=ga(r[0],r[1]);$.tap=v.p,$.tapT=e}E.wasDown=!!o.down;const s=zt?E.hold:!E.hold;s!==E.on&&(oa.hit("click",.25),E.on=s),E.pow+=((s?1:0)-E.pow)*Math.min(1,be*18),E.adapt+=((s?0:1)-E.adapt)*Math.min(1,be*(s?1.2:.18));let i=$.base;const c=Z(3,9,e)*(o.down?0:1);if($.tap&&e-$.tapT<1.8&&(i=$.tap),e>E.wT){E.wT=e+2.5+x()*5+(x()<.3?4:0);const v=x()<.35?0:.45;E.wO=[(x()-.5)*v*1.4,(x()-.5)*v*.5,(x()-.5)*v]}E.wC=E.wC||[0,0,0];for(let v=0;v<3;v++)E.wC[v]+=(E.wO[v]-E.wC[v])*be*.7;const l=[i[0]+c*E.wC[0],i[1]+c*E.wC[1],i[2]+c*E.wC[2]],w=lt([l[0]-Be[0],l[1]-Be[1],l[2]-Be[2]]),y=Math.min(1,be*(o.down&&E.moved?9:4));$.cur=lt([$.cur[0]+(w[0]-$.cur[0])*y,$.cur[1]+(w[1]-$.cur[1])*y,$.cur[2]+(w[2]-$.cur[2])*y]);const h=1+1.6*E.adapt;if(e>E.kickT){E.kickT=e+1.6+x()*1.2;const v=Math.sin(Se),p=-Math.cos(Se);for(const b of[-1,1])Fa(Y[0]-v*1.3-p*b*.22,Y[1]-.5,Y[2]-p*1.3+v*b*.22,Math.round((8+x()*10)*vt*h),.35,b*.1,-.25,-.35,vt);oa.hit("noise",.05,{cutoff:300,dur:.6})}const N=vt*h*(.6+4*Pt)*be*30;for(let v=N+x();v>=1;v--){const p=x()<.6?Se+(x()-.5)*1.4:x()*he,b=.6+x()*5,M=u.e[0]+Math.sin(p)*b,L=u.e[2]-Math.cos(p)*b;(Pe(M,L)>.5||go(M,L)>.5)&&Fa(M,oe(M,L)+.3+x()*.3,L,1+(x()*3|0),.15,0,0,0,vt*.8)}if(e>E.breathT){E.breathT=e+4+x()*2.6+(x()<.2?2.5+x()*4:0),oa.hit("noise",.04,{cutoff:3200,dur:1});for(let v=0;v<6;v++)oa.hit("blip",.05,{at:1.6+v*.12+x()*.1,freq:180+x()*260})}for(let v=0;v<Ot;v++){const p=v*10;if(V[p+6]>3)continue;V[p+6]+=be;const b=Math.exp(-be*1.8);V[p+3]*=b,V[p+4]=V[p+4]*b-.002,V[p+5]*=b;const M=V[p+4],L=V[p+5],f=be*1.2*(V[p+9]-.5);V[p+4]=M*Math.cos(f)-L*Math.sin(f),V[p+5]=M*Math.sin(f)+L*Math.cos(f),V[p]+=(V[p+3]+me[0]*Pt*.3*Math.sin(St*e))*be,V[p+1]+=V[p+4]*be,V[p+2]+=(V[p+5]+me[1]*Pt*.3*Math.sin(St*e))*be}E.simT=e}function Vo(e){let o=0;const n=Qa,r=1+1.2*E.adapt;for(let s=0;s<Ot&&o<Ja;s++){const i=s*10,c=V[i+6];if(c<0||c>3)continue;const l=V[i+7],w=c<.03?c/.03:Math.exp(-(c-.03)/l)*(1+.5*Math.sin(c*23+V[i+9]*40)*(V[i+9]>.7?1:0)),y=V[i+8]*w*r;if(y<.01)continue;const h=o++*8;n[h]=V[i],n[h+1]=V[i+1],n[h+2]=V[i+2],n[h+3]=.011+.012*V[i+9],n[h+4]=.35*y,n[h+5]=2.6*y,n[h+6]=1.6*y,n[h+7]=0}return a.bindBuffer(a.ARRAY_BUFFER,to),a.bufferSubData(a.ARRAY_BUFFER,0,n,0,o*8),o}const io=[26e3,34e3,4e4][je],Wo=[2200,3200,4500][je],Ho=7,Ht=new Float32Array(20),na=new Float32Array(20),co=(e,o)=>{for(let n=0;n<5;n++){const r=n>>1,s=n&1?-1:1,i=n===4?2:r;for(let c=0;c<4;c++)o[n*4+c]=e[c*4+3]+s*e[c*4+i]}},Xo=(e,o,n)=>{for(let r=0;r<5;r++){const s=e[r*4],i=e[r*4+1],c=e[r*4+2];if(s*(s>0?o[n+3]:o[n])+i*(i>0?o[n+4]:o[n+1])+c*(c>0?o[n+5]:o[n+2])+e[r*4+3]<0)return!0}return!1},Xt=(e,o,n)=>{a.bindVertexArray(e.vao),a.bindBuffer(a.ARRAY_BUFFER,e.b);let r=-1,s=-1;for(let i=0;i<=yt;i++){const c=i<yt&&e.st[i+1]>e.st[i]&&!Xo(o,e.box,i*6);if(c&&r<0&&(r=e.st[i]),c&&(s=e.st[i+1]),!c&&r>=0){for(let l=0;l<2;l++)a.vertexAttribPointer(l,4,a.FLOAT,!1,32,r*32+l*16);a.drawArraysInstanced(a.TRIANGLE_STRIP,0,n,s-r),r=-1}}},Lt=new Float32Array(6*6*20);{const e=1/Math.cos(Math.PI/20);for(let o=0;o<20;o++){const n=o*Math.PI/10,r=n+Math.PI/10;for(let s=0;s<6;s++){const i=s%3===0?0:42*e,c=s%3===1?n:r,l=(o*6+s)*3;Lt[l]=Y[0]+Math.cos(c)*i,Lt[l+1]=s<3?-.7:3.8,Lt[l+2]=Y[2]+Math.sin(c)*i}}}const za=D===1||D===3?X.grid2():{vao:X.gVao,gWi:X.gWi},fo=new Float32Array([Ze,$e,te,Yt,0,0,0,0]),ho=e=>{a.bindVertexArray(za.vao);let o=-1,n=-1;for(let r=0;r<=X.nGW;r++){let s=!1;if(r<X.nGW){s=!0;for(let i=0;i<5&&s;i++){let c=!0;for(let l=0;l<6;l++){const w=(r*6+l)*3;if(e[i*4]*Lt[w]+e[i*4+1]*Lt[w+1]+e[i*4+2]*Lt[w+2]+e[i*4+3]>=0){c=!1;break}}c&&(s=!1)}}s&&o<0&&(o=r),s&&(n=r+1),!s&&o>=0&&(a.drawElements(a.TRIANGLES,(n-o)*za.gWi,a.UNSIGNED_INT,o*za.gWi*4),o=-1)}};function lo(e){Oo();const o=Be,n=$.cur,r=lt(At(n,Math.abs(n[1])>.95?[1,0,0]:[0,1,0])),s=At(r,n),i=Math.tan(Math.min(1.4,.68*aa));La(Et,u.e,u.f,u.r,u.u,qe,.03,90),La(Ut,o,n,r,s,i,.08,22),co(Et,Ht),co(Ut,na);const c=Bo*Co*E.pow,l=.9*(1+2.4*E.adapt*E.adapt)*(dt===2?1.4:1),w=[u.e[0],u.e[1],u.e[2],qe,u.f[0],u.f[1],u.f[2],e,u.r[0],u.r[1],u.r[2],2*qe/K,u.u[0],u.u[1],u.u[2],l,o[0],o[1],o[2],c,n[0],n[1],n[2],K,ha[0],ha[1],ha[2],No,la[0],la[1],la[2],.82,da[0],da[1],da[2],vt,me[0],me[1],Pt*(.55+.45*Z(-.6,.8,Math.sin(e*.21+1.3)+.6*Math.sin(e*.137+pa))),St,.9,.25,E.adapt,Mt,Ke[0],Ke[1],Ke[2],Ke[3],Ye[0],Ye[1],Ye[2],Ye[3],g[0],g[1],g[2],g[3],ke[0],ke[1],ke[2],ke[3],st[0],st[1],st[2],st[3],va[0],va[1],va[2],ua,Kt[0],Kt[1],Kt[2],Kt[3],0,4,ee.W/K,Ho,Go,aa,.3*aa,Math.min(1.3,.58*aa)];no.set(w);const y=p=>{const b=X.ready(p);return a.useProgram(b.p),a.uniform4fv(b.uC,no),a.uniformMatrix4fv(b.uLVP,!1,Ut),b};a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,X.tN),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,null),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,null),xt&&(a.activeTexture(a.TEXTURE3),a.bindTexture(a.TEXTURE_2D,xt.tH),a.activeTexture(a.TEXTURE4),a.bindTexture(a.TEXTURE_2D,xt.tM)),a.disable(a.BLEND),a.disable(a.CULL_FACE),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.depthMask(!0),a.colorMask(!0,!0,!0,!0),a.bindFramebuffer(a.FRAMEBUFFER,X.fbSh),a.viewport(0,0,X.SM,X.SM),a.clearDepth(1),a.clear(a.DEPTH_BUFFER_BIT);let h=y("gdS"+fa);a.uniformMatrix4fv(h.uVP,!1,Ut),a.uniform4f(h.uO,Y[0],Y[2],0,0),h.uB&&a.uniform4fv(h.uB,fo),ho(na),h=y("grS"+jt),a.uniformMatrix4fv(h.uVP,!1,Ut),a.uniform4f(h.uG,6,1,Fe,0),Xt(Ya,na,14),ta&&(a.uniform4f(h.uG,8,1,Fe,0),Xt(ta,na,18)),h=y("tbS"),a.uniformMatrix4fv(h.uVP,!1,Ut),a.bindVertexArray(Ba),a.drawElementsInstanced(a.TRIANGLES,kt*We*6,a.UNSIGNED_SHORT,0,Dt),a.bindFramebuffer(a.FRAMEBUFFER,ee.fm||ee.f),a.viewport(0,0,ee.W,ee.W),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,X.tSh),a.clearColor(0,0,0,1e4),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),h=y("gd"+fa),a.uniformMatrix4fv(h.uVP,!1,Et),a.uniform4f(h.uO,Y[0],Y[2],0,0),h.uB&&a.uniform4fv(h.uB,fo),ho(Ht),h=y("gr"+jt),a.uniformMatrix4fv(h.uVP,!1,Et),a.uniform4f(h.uG,8,1.2,Fe,pt===2?1:0),Xt(Ya,Ht,18),a.uniform4f(h.uG,4,1.5,Fe,pt===2?1:0),Xt(Uo,Ht,10),ta&&(a.uniform4f(h.uG,12,1,Fe,pt===2?1:0),Xt(ta,Ht,26)),h=y("tb"),a.uniformMatrix4fv(h.uVP,!1,Et),a.bindVertexArray(Ba),a.drawElementsInstanced(a.TRIANGLES,kt*We*6,a.UNSIGNED_SHORT,0,Dt),a.enable(a.BLEND),a.blendFuncSeparate(a.ONE,a.ONE,a.ZERO,a.ONE),a.depthMask(!1),h=y("mo"),a.uniformMatrix4fv(h.uVP,!1,Et),a.uniform4f(h.uM,io,3.4,[1,1.3,1.6][je]*15,K/1e3),a.bindVertexArray(X.eVao),a.drawArrays(a.POINTS,0,io+Wo);const N=Vo(e);N&&(h=y("sp"),a.uniformMatrix4fv(h.uVP,!1,Et),a.bindVertexArray(eo),a.drawArrays(a.POINTS,0,N)),a.disable(a.BLEND),a.depthMask(!0),a.disable(a.DEPTH_TEST),ee.fm&&(a.bindFramebuffer(a.READ_FRAMEBUFFER,ee.fm),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,ee.f),a.blitFramebuffer(0,0,ee.W,ee.W,0,0,ee.W,ee.W,a.COLOR_BUFFER_BIT,a.NEAREST)),a.flush(),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,K,K),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,ee.t);let v=-1;for(const p of[-1,1])for(const b of[-1,1]){const M=u.f[0]+qe*(p*u.r[0]+b*u.u[0]),L=u.f[1]+qe*(p*u.r[1]+b*u.u[1]),f=u.f[2]+qe*(p*u.r[2]+b*u.u[2]);v=Math.max(v,L/Math.hypot(M,L,f))}v>.58?X.finS():X.fin(),h=y(v>.58?"finS":"fin"),a.bindVertexArray(X.eVao),a.drawArrays(a.TRIANGLES,0,3),a.bindVertexArray(null),E.frame++}let ft=0;for(let e=0;e<40;e++)ft+=be,ro(ft);ao(ft),lo(ft);let sa=0;return(e,o)=>{sa+=Math.min(.25,o||be);let n=0;for(;sa>=be&&n<4;)sa-=be,ft+=be,ro(ft),n++;n===4&&(sa=0),ao(ft),lo(ft),E.frame===3&&(X.finS(),X.fin())}}});function Ao(t){return Eo(t)}}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
