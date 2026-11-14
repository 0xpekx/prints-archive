// Lavender Field: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/570.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(pt){pt&&function(){"use strict";const Zt={yaw:0,pitch:0,x:0,y:0,z:0},Ze=Math.PI*2,Ie=Math.PI/180,$e=Math.tan(32*Ie),Ce=.04,He=3e4,B=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,j=`
uniform sampler2D uN;
layout(std140) uniform UB { vec4 u[36]; };
#define CAM u[0].xyz
#define TANH u[0].w
#define FWD u[1].xyz
#define PA u[1].w
#define RGT u[2].xyz
#define TIME u[2].w
#define UPV u[3].xyz
#define EXPO u[3].w
#define SUN u[4].xyz
#define SUNI u[4].w
#define SUNC u[5].rgb
#define DUSK u[5].w
#define SKYA u[6].rgb
#define HAZE u[6].w
#define ROW u[7]
#define BEND u[8]
#define WIND u[9]
#define GA u[10]
#define GB u[11]
#define GC u[12]
#define GD u[13]
#define GE u[14]
#define HOUSE u[15]
#define FLD u[16]
#define LAV u[17]
#define SKY u[18]
#define VEN u[19]
#define MISC u[20]
#define VP mat4(u[21], u[22], u[23], u[24])
#define FIN u[25]
#define FIN2 u[26]
#define ALPS u[27]
#define SGL u[28]
#define LP u[29]
#define WX u[30]
#define WY u[31]
#define WZ u[32]
#define WQ u[33]
#define WR u[34]
float sq(float x) { return x * x; }
uint hu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hu(x) >> 8) * (1. / 16777216.); }
float nf(vec2 p) { vec2 i = floor(p), f = p - i; f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-20)); a = ay > ax ? 1.5707963 - a : a; a = x < 0. ? 3.1415927 - a : a; return y < 0. ? -a : a; }
vec3 tmap(vec3 x) { x = max(x, 0.); vec3 y = (x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14); return pow(clamp(y, 0., 1.), vec3(1. / 2.2)); }
float bend(float v) { return BEND.x * (sqrt(BEND.y * BEND.y + v * v) - BEND.y); }
float bendD(float v) { return BEND.x * v / sqrt(BEND.y * BEND.y + v * v); }
float Gr(vec2 p) {
  return BEND.z * exp(-sq((p.y - BEND.w) / 95.)) + (.5 + WQ.x) * sin(p.x * .021 + 1.3) * sin(p.y * .017 + .4) + 1.8 * sin(p.x * .0047 + p.y * .0031 + 2.)
       + 1.2 * sin(p.x * .0023 - p.y * .0041 + .7) - MISC.z;
}
// the bush chain of row k at along-row position v: (half width, height, d ln g / dv, size)
vec4 bushAt(float k, float v) {
  uint hk = uint(int(k) + 50000);
  float ph = hf(hk * 7919u) * ROW.w, vj = (v - ph) / ROW.w, j0 = floor(vj);
  vec4 r = vec4(0.);
  float best = 0.;
  for (int i = 0; i < 2; i++) {
    float j = j0 + float(i);
    uint hh = hu(hk * 1973u ^ uint(int(j) + 900000) * 9277u);
    float jit = (hf(hh) - .5) * .22, sz = .8 + .35 * hf(hh ^ 3u), miss = step(LAV.w, hf(hh ^ 7u));
    float L = .8 * ROW.w * (.85 + .3 * sz), q = (v - (j + jit) * ROW.w - ph) / L;
    float q2 = q * q, g = sqrt(max(1. - q2 * q2, 0.)) * miss, hb = g * sz;
    if (hb > best) { best = hb; r = vec4(ROW.y * (.8 + .25 * sz) * g, ROW.z * sz * g, -2. * q2 * q / max(1. - q2 * q2, .1) / L, sz); }
  }
  if ((k + .5) * ROW.x * (1. - 2. * GE.z) < GE.w) r.xy *= vec2(.8, .45);
  return r;
}
// soil along the across-row coordinate x (furrow centres at whole numbers, soil fraction g), integrated from 0
float soilF(float x, float g) { float f = fract(x); return floor(x) * g + min(f, g * .5) + max(f - 1. + g * .5, 0.); }
float gust(vec2 p, vec4 g, vec2 dir) {
  if (g.w < .004) return 0.;
  vec2 r = p - g.xy;
  float s = dot(r, dir) - g.z + 5. * (nf(p / 19. + 2.) - .5), l = dot(r, vec2(-dir.y, dir.x));
  float env = s > 0. ? exp(-s * s / 7.) : exp(-s * s / 110.);
  return g.w * env * (.6 + .4 * sin(s * .75)) * exp(-l * l / 5000.);
}
float windAt(vec2 p) {
  vec2 q = p - WIND.xy * WIND.w;
  float w = WIND.z * (.3 + .9 * smoothstep(.42, .85, nf(q / 13. + 3.)) + .3 * (nf(q / 3.7 + 9.) - .5));
  return w + gust(p, GA, GD.xy) + gust(p, GB, GD.zw) + gust(p, GC, GE.xy);
}
vec3 skyRad(vec3 d) {
  float e = max(d.y, 0.);
  vec2 dh = normalize(d.xz + vec2(1e-6, 0.)), sh = normalize(SUN.xz + vec2(1e-6, 0.));
  float sw = .5 + .5 * dot(dh, sh), ang = acos(clamp(dot(d, SUN), -1., 1.));
  float hz = exp(-e / .13), hz2 = exp(-e / .035);
  vec3 c = WZ.rgb * (1. + .9 * hz) * (1. - .5 * hz2 * sw * SGL.x);
  vec3 wc = SUNC * SUNC * 1.15;
  c += wc * (1.5 * hz2 + .7 * hz) * pow(sw, 2.5) * (1. + SKY.w * .6) * SGL.x;
  c += mix(vec3(.13, .105, .075), vec3(.32, .17, .05), sq(sw)) * (.75 * hz + .5 * hz2) * (1. - .4 * SKY.w) * (.4 + .6 * SGL.x) * (1. - WY.x);
  c += vec3(.24, .11, .15) * SKY.y * exp(-sq((e - .065) / .055)) * sq(1. - sw);
  c = mix(c, c * vec3(.5, .58, .85), SKY.y * exp(-e / .03) * sq(1. - sw));
  c += SUNC * (1.3 * exp(-ang / .028) + .16 * exp(-ang / .07)) * (1. + SKY.w * 1.4) * SGL.y * (WY.z > .008 ? .25 : 1.);
  return c * SKY.x;
}
vec3 hazeCol(vec3 d) { return skyRad(normalize(vec3(d.x, .02, d.z))) * vec3(.68, .68, .8); }
// the haze, and the dawn mist lying in the hollows (the tree and the mas float on it)
vec3 fogMix(vec3 col, vec3 d, float dist, float py) {
  vec3 hc = hazeCol(d);
  col = mix(col, hc, 1. - exp(-dist / HAZE));
  return mix(col, vec3(.42, .42, .44) * SKY.x + SUNC * SUNI * .03, WX.z * (1. - exp(-dist / 60.)) * exp(-max(py - .8, 0.) / 6.));
}
`,$t=B+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 1., 1.); }",ut=e=>B+"#define MMASK "+e+`
`+j+`
out vec4 oc;
// region of a ground point: 0 lavender, 1 lane, 2 stubble, 3 sunflowers, 4 road, 5 verge, 6 far fields, 7 ripe wheat,
// 8 clary sage, 9 a young lavender field (FLD.w 10+: the side field is region FLD.w - 10; WZ.w: the far band's region)
float regionOf(vec2 p, out float top) {
  float up = p.x - bend(p.y), r = 6.;
  if (p.y < -63.) r = p.y > -69. ? 4. : (p.y > -79. ? 5. : 6.);
  else if (p.y < 520. && up > FLD.z && up < FLD.x) r = p.y > WY.w ? (p.y < WY.w + 150. ? WZ.w : 6.) : (p.y > MISC.w && p.y < MISC.w + 6.) ? 1. : 0.;
  else if (p.y < 520. && up >= FLD.x && up < FLD.x + 280.) r = up < FLD.x + 3. ? 5. : FLD.w < .5 ? (p.y < FLD.y ? 2. : 3.) : FLD.w < 1.5 ? 7. : FLD.w < 2.5 ? 6. : FLD.w - 10.;
  if (length(p - HOUSE.xy) < 34.) r = 5.;
  top = r == 0. ? ROW.z * 1.25 : r == 3. ? 1.55 + .3 * nf(p / .6) : r == 7. ? .9 + .1 * nf(p / .5) : r == 8. ? .65 : r == 9. ? .22 : .05;
  return r;
}
vec3 lavMean(vec3 p, vec3 d, float lean) {
  vec2 dh = normalize(d.xz), sH = normalize(SUN.xz);
  float back = dot(dh, sH), lit = mix(.5, .06, smoothstep(-1., 1., back));
  float fw = pow(max(dot(d, SUN), 0.), 5.);
  float up = p.x - bend(p.y), bdv = bendD(p.y);
  float cut = up * (1. - 2. * GE.z) < GE.w ? 1. : 0.;
  vec3 alb = (cut > .5 ? vec3(.22, .25, .2) : mix(vec3(.11, .14, .085), LAV.rgb, .8 * (1. - cut))) * (.85 + .3 * nf(p.xz / 31.));
  float gl2 = max(lean - WIND.z * .6, 0.);
  alb = mix(alb, vec3(.24, .25, .2), clamp(lean * .3 + gl2 * .4, 0., .6));
  vec3 c = alb * (SKYA * (.72 + .5 * gl2) + SUNC * SUNI * (lit + fw * .6) * (.9 + .25 * lean + .6 * gl2)) + (LAV.rgb * .6 + vec3(.08, .055, .015)) * SUNC * SUNI * fw * .3 * (1. - cut);
  // the rows stay stripes of violet and pale soil: the soil the bushes leave in view at this angle, box-filtered
  // over the pixel's footprint across the rows
  float gr = abs(d.x - bdv * d.z) / sqrt(1. + bdv * bdv) / max(-d.y, .002);
  float w = max(length(p - CAM) * PA * (gr + 1.) / ROW.x, 1e-3);
  float g = clamp((ROW.x - 1.9 * ROW.y * (1. - .2 * cut) - ROW.z * (1. - .55 * cut) * gr) / ROW.x, 0., 1.);
#ifdef STRIPE
  float sf = (soilF(up / ROW.x + .5 * w, g) - soilF(up / ROW.x - .5 * w, g)) / w;
#else
  float sf = g;
#endif
  vec3 soil = vec3(.6, .45, .33) * mix(vec3(1.), vec3(.6, .44, .36), WX.w) * (1. + .22 * WR.w) * (SKYA * .9 + SUNC * SUNI * (lit * .5 + fw * .4));
  return mix(c, soil, sf);
}
vec3 farFields(vec2 p, vec3 d, float dist, float lean) {
  vec2 q = mat2(.94, .34, -.34, .94) * p / 230.;
  vec2 ci = floor(q), fq = q - ci;
  uint h = hu(uint(int(ci.x) + 9000) * 7919u ^ uint(int(ci.y) + 9000) * 104729u);
  float ty = hf(h);
  vec3 alb; float sheen = .1;
  if (ty < .36) { alb = mix(vec3(.11, .14, .085), LAV.rgb, .75); sheen = .2; }
  else if (ty < .58) { alb = vec3(.5, .38, .18); sheen = .45; }
  else if (ty < .7) { alb = vec3(.09, .11, .04); }
  else if (ty < .86) { alb = vec3(.1, .13, .07); }
  else { alb = vec3(.3, .2, .13); }
  alb *= .85 + .3 * nf(p / 60. + 9.);
  float fp = dist * PA / max(-d.y, .002);
  float hedge = (1. - smoothstep(4., 4. + fp * .6, min(min(fq.x, 1. - fq.x), min(fq.y, 1. - fq.y)) * 230.)) * step(.35, hf(h ^ 77u));
  alb = mix(alb, vec3(.04, .055, .03), hedge * .8);
  float fw = pow(max(dot(d, SUN), 0.), 4.);
  return alb * (SKYA * .85 + SUNC * SUNI * (.12 + sheen * (.4 + fw) * (1. + .3 * lean)));
}
void main() {
  vec2 sz = vec2(2. * TANH / PA);
  vec2 sc = gl_FragCoord.xy / sz * 2. - 1.;
  vec3 d = normalize(FWD + RGT * sc.x * TANH + UPV * sc.y * TANH);
  vec3 o = CAM;
  vec3 col; vec3 P = vec3(0.); bool hitAny = false;
  // ground: geometric march to the layer top, then bisection (one loop)
  float tlo = 0., thi = 0., reg = -1., top, rLo = -1., topLo = 0.;
  if (d.y < .02) {
    float t = max(.25, (o.y - Gr(o.xz) - ROW.z * 1.25 - .05) / (-d.y + .05) - .2), tp = t;
    int bis = 0;
    for (int i = 0; i < int(LP.y) + int(LP.w); i++) {
      float tq = bis > 0 ? .5 * (tlo + thi) : t;
      vec3 p = o + d * tq;
      float r = regionOf(p.xz, top);
      bool below = p.y < Gr(p.xz) - sq(length(p.xz - o.xz)) / 1.27e7 + top;
      if (bis == 0) {
        if (below) { reg = r; tlo = tp; thi = t; bis = 1; }
        else { tp = t; rLo = r; topLo = top; t = t * 1.4 + .15; if (t > 9000.) break; }
      } else {
        if (below) { thi = tq; reg = r; } else { tlo = tq; rLo = r; topLo = top; }
        bis++; if (bis > int(LP.w)) break;
      }
    }
  }
  if (reg >= 0.) {
    hitAny = true;
    P = o + d * thi;
    float dist = thi;
    float lean = windAt(P.xz);
#if MMASK != 255
    int bi = reg < .5 ? 0 : reg < 1.5 ? 1 : (reg < 2.5 || reg > 8.5) ? 2 : reg < 3.5 ? 3 : reg < 4.5 ? 4 : reg < 5.5 ? 5 : reg < 6.5 ? 6 : 7;
    if (((MMASK >> bi) & 1) == 0) discard;
#endif
    if (reg < .5) {
      float bdv = bendD(P.z);
      float a = abs(d.x - bdv * d.z) / sqrt(1. + bdv * bdv);
      float fpU = dist * PA * (a / max(-d.y, .002) + 1.);
      float wm = smoothstep(.3 * ROW.x, 1.1 * ROW.x, fpU);
      if (wm < 1.) discard;
#if MMASK & 1
      col = lavMean(P, d, lean);
#endif
    } else {
      vec3 N = vec3(0., 1., 0.);
      float wall = (rLo != reg && P.y > Gr(P.xz) + topLo + .05) ? 1. : 0.;
      float fw = pow(max(dot(d, SUN), 0.), 4.);
      vec3 Ls = SUNC * SUNI;
      float fp = dist * PA;
      if (reg < 1.5) {
#if MMASK & 2
        float up = P.x - bend(P.z), m = abs(P.z - MISC.w - 3.);
        vec3 alb = mix(vec3(.42, .36, .27), vec3(.16, .17, .08), smoothstep(.55, .35, m) * .8) * (.8 + .4 * nf(P.xz / .7));
        alb = mix(alb, vec3(.3, .25, .17), smoothstep(.25, .05, abs(m - 1.)) * .5);
        col = alb * (SKYA * .9 + Ls * .25);
#endif
      } else if (reg < 2.5 || reg > 8.5) {
#if MMASK & 4
        float st = mix(.5, nf(vec2(P.x * 12., P.z * .7)), clamp(.04 / fp, 0., 1.));
        float yl = step(8.5, reg);
        float wr = smoothstep(.75, .95, sin((P.x - bend(P.z) * mix(.5, 1., yl)) * mix(1.1, 6.2832 / ROW.x, yl)) * .5 + .5);
        vec3 alb = mix(vec3(.5, .39, .19) * (.75 + .5 * st) * (1. + .25 * wr), mix(vec3(.56, .46, .34), LAV.rgb * 1.3, wr * (.5 + .5 * st)), yl);
        col = alb * (SKYA * .8 + Ls * (.18 + .5 * fw + .3 * wr));
#endif
      } else if (reg < 3.5) {
#if MMASK & 8
        vec3 alb;
        vec3 L = SUN;
        if (wall > .5) {
          N = normalize(vec3(-d.x, 0., -d.z));
          float y = P.y - Gr(P.xz);
          vec2 hq = vec2(dot(P.xz, vec2(N.z, -N.x)), y);
          float lf = nf(hq / .12 + 3.), lf2 = nf(hq / .4 + 9.);
          alb = vec3(.05, .085, .025) * (.5 + lf + .4 * lf2) * (.4 + .6 * smoothstep(.2, 1.5, y));
          vec2 hc = hq / vec2(.55, .45), hi = floor(hc);
          uint hh = hu(uint(int(hi.x) + 9000) * 7919u ^ uint(int(hi.y) + 9000) * 3343u);
          vec2 hp = hc - hi - .5 - .25 * (vec2(hf(hh), hf(hh ^ 3u)) - .5);
          float hd = length(hp * vec2(1., 1.25));
          float head = step(1.25, y) * step(hf(hh ^ 5u), .7) * (1. - smoothstep(.2, .26, hd));
          float ring = head * smoothstep(.12, .2, hd) * step(.5, nf(vec2(at2(hp.y, hp.x) * 4., hd * 9.) + hf(hh) * 20.));
          alb = mix(alb, vec3(.07, .1, .03), head);
          alb = mix(alb, vec3(.6, .38, .02), ring);
        } else {
          vec2 hc = P.xz / .42, hi = floor(hc);
          uint hh = hu(uint(int(hi.x) + 9000) * 7919u ^ uint(int(hi.y) + 9000) * 3343u);
          float hd = length(hc - hi - .5 - .25 * (vec2(hf(hh), hf(hh ^ 3u)) - .5));
          float ff = clamp(.05 / fp - .3, 0., 1.);
          float head = mix(.35, (1. - smoothstep(.22, .3, hd)) * step(hf(hh ^ 5u), .75), ff);
          float ring = mix(.3, smoothstep(.13, .22, hd) * head, ff);
          alb = vec3(.06, .095, .03) * (.7 + .6 * nf(P.xz / 3.));
          alb = mix(alb, vec3(.07, .09, .03), head * .5);
          alb = mix(alb, vec3(.55, .36, .02), ring * .55);
          N = normalize(vec3(0., 1., 0.) + vec3(nf(P.xz / .3) - .5, 0., nf(P.xz / .3 + 7.) - .5));
        }
        col = alb * (SKYA * .8 + Ls * (max(dot(N, L), 0.) * 1.2 + .1 + .25 * fw));
#endif
      } else if (reg < 4.5) {
#if MMASK & 16
        // a stony white track: wheel ruts, gravel, a grass line down the middle
        float gv = mix(.5, nf(P.xz / .05 + 3.), clamp(.012 / fp - .3, 0., 1.));
        vec3 alb = vec3(.56, .5, .42) * (.75 + .35 * nf(P.xz / 1.3)) * (.6 + .7 * gv) * (1. - .3 * smoothstep(1., 0., abs(abs(P.z + 66.) - 1.2)));
        alb = mix(alb, vec3(.2, .2, .1) * (.6 + .8 * gv), smoothstep(.45, .2, abs(P.z + 66.)) * .7);
        col = alb * (SKYA * .9 + Ls * (.25 + .3 * fw));
#endif
      } else if (reg < 5.5) {
#if MMASK & 32
        vec3 alb = vec3(.3, .25, .14) * (.7 + .5 * nf(P.xz / .9)) * (.8 + .3 * nf(P.xz / 9.));
        col = alb * (SKYA * .85 + Ls * (.2 + .35 * fw));
#endif
      } else if (reg < 6.5) {
#if MMASK & 64
        col = farFields(P.xz, d, dist, lean);
#endif
      } else {
#if MMASK & 128
        // ripe wheat, or clary sage: a pink-mauve haze of bracts over grey-green leaves
        float y = P.y - Gr(P.xz);
        float wv = .85 + .3 * nf(P.xz / 4. - WIND.xy * WIND.w * .3) + .25 * lean;
        vec3 alb = (reg > 7.5 ? vec3(.34, .21, .29) : vec3(.55, .41, .17)) * wv;
        if (wall > .5) alb *= .55 + .45 * smoothstep(.0, .9, y);
        col = alb * (SKYA * .8 + Ls * (.25 + .7 * fw) * wv);
#endif
      }
    }
  }
  if (!hitAny) discard;
  {
    float dist = length(P - o);
    col = fogMix(col, d, dist, P.y);
    vec4 cp = VP * vec4(P, 1.);
    gl_FragDepth = clamp(cp.z / cp.w * .5 + .5, 0., 1.);
  }
  oc = vec4(tmap(col * EXPO), 1.);
}`,Je=(e,t)=>B+"#define PASS "+e+`
#define LMASK `+(t||3)+`
#define STRIPE
`+j+`
uniform sampler2D uSt;
out vec4 oc;
float gYr;
float insideF(vec3 p, float scl) {
  float v = p.z, up = p.x - bend(v);
  float k = floor(up / ROW.x), s = up - (k + .5) * ROW.x;
  vec4 b = bushAt(k, v);
  bool cut = (k + .5) * ROW.x * (1. - 2. * GE.z) < GE.w;
  float sc = scl > 0. ? scl : cut ? 1. : mix(.7, 1., smoothstep(SGL.z, SGL.w, length(p.xz - CAM.xz)));
  float w = b.x * sc, h = b.y * sc;
  gYr = p.y - Gr(p.xz);
  if (cut && w > .005) return sq(s / w) + sq(sq(max(gYr, 0.) / h)) + .3 * (nf(vec2(p.x * .7 + p.z * .7, p.y) * 22.) - .5);
  return w > .005 ? sq(s / w) + sq(max(gYr, 0.) / h) : 9.;
}
vec2 shadowF(vec3 p) {
  float a = 1., b = 1., tt = .05;
  for (int i = 0; i < int(LP.z); i++) {
    float s = smoothstep(.65, 1.35, insideF(p + SUN * tt, -1.));
    a = min(a, tt > .7 ? .2 + .8 * s : s); if (tt > .7) b = min(b, .2 + .8 * s);
    tt *= 2.5;
  }
  return vec2(a, b);
}
// region of a ground point: 0 lavender, 1 lane, 2 stubble, 3 sunflowers, 4 road, 5 verge, 6 far fields, 7 ripe wheat,
// 8 clary sage, 9 a young lavender field (FLD.w 10+: the side field is region FLD.w - 10; WZ.w: the far band's region)
float regionOf(vec2 p, out float top) {
  float up = p.x - bend(p.y), r = 6.;
  if (p.y < -63.) r = p.y > -69. ? 4. : (p.y > -79. ? 5. : 6.);
  else if (p.y < 520. && up > FLD.z && up < FLD.x) r = p.y > WY.w ? (p.y < WY.w + 150. ? WZ.w : 6.) : (p.y > MISC.w && p.y < MISC.w + 6.) ? 1. : 0.;
  else if (p.y < 520. && up >= FLD.x && up < FLD.x + 280.) r = up < FLD.x + 3. ? 5. : FLD.w < .5 ? (p.y < FLD.y ? 2. : 3.) : FLD.w < 1.5 ? 7. : FLD.w < 2.5 ? 6. : FLD.w - 10.;
  if (length(p - HOUSE.xy) < 34.) r = 5.;
  top = r == 0. ? ROW.z * 1.25 : r == 3. ? 1.55 + .3 * nf(p / .6) : r == 7. ? .9 + .1 * nf(p / .5) : r == 8. ? .65 : r == 9. ? .22 : .05;
  return r;
}
vec3 lavMean(vec3 p, vec3 d, float lean) {
  vec2 dh = normalize(d.xz), sH = normalize(SUN.xz);
  float back = dot(dh, sH), lit = mix(.5, .06, smoothstep(-1., 1., back));
  float fw = pow(max(dot(d, SUN), 0.), 5.);
  float up = p.x - bend(p.y), bdv = bendD(p.y);
  float cut = up * (1. - 2. * GE.z) < GE.w ? 1. : 0.;
  vec3 alb = (cut > .5 ? vec3(.22, .25, .2) : mix(vec3(.11, .14, .085), LAV.rgb, .8 * (1. - cut))) * (.85 + .3 * nf(p.xz / 31.));
  float gl2 = max(lean - WIND.z * .6, 0.);
  alb = mix(alb, vec3(.24, .25, .2), clamp(lean * .3 + gl2 * .4, 0., .6));
  vec3 c = alb * (SKYA * (.72 + .5 * gl2) + SUNC * SUNI * (lit + fw * .6) * (.9 + .25 * lean + .6 * gl2)) + (LAV.rgb * .6 + vec3(.08, .055, .015)) * SUNC * SUNI * fw * .3 * (1. - cut);
  // the rows stay stripes of violet and pale soil: the soil the bushes leave in view at this angle, box-filtered
  // over the pixel's footprint across the rows
  float gr = abs(d.x - bdv * d.z) / sqrt(1. + bdv * bdv) / max(-d.y, .002);
  float w = max(length(p - CAM) * PA * (gr + 1.) / ROW.x, 1e-3);
  float g = clamp((ROW.x - 1.9 * ROW.y * (1. - .2 * cut) - ROW.z * (1. - .55 * cut) * gr) / ROW.x, 0., 1.);
#ifdef STRIPE
  float sf = (soilF(up / ROW.x + .5 * w, g) - soilF(up / ROW.x - .5 * w, g)) / w;
#else
  float sf = g;
#endif
  vec3 soil = vec3(.6, .45, .33) * mix(vec3(1.), vec3(.6, .44, .36), WX.w) * (1. + .22 * WR.w) * (SKYA * .9 + SUNC * SUNI * (lit * .5 + fw * .4));
  return mix(c, soil, sf);
}
vec3 lavShade(vec3 p, vec3 d, float dist, float kind, float lean) {
  float v = p.z, up = p.x - bend(v), bdv = bendD(v);
  vec3 nU = normalize(vec3(1., 0., -bdv)), nV = vec3(-nU.z, 0., nU.x);
  float k = floor(up / ROW.x), s = up - (k + .5) * ROW.x;
  vec4 b = bushAt(k, v);
  float cut = (k + .5) * ROW.x * (1. - 2. * GE.z) < GE.w ? 1. : 0.;
  float near = (1. - smoothstep(SGL.z, SGL.w, length(p.xz - CAM.xz))) * (1. - cut);
  float sc = mix(1., .7, near), w = max(b.x * sc, .01), h = max(b.y * sc, .01);
  float yr = p.y - Gr(p.xz), fp = dist * PA;
  vec2 sh = shadowF(p + vec3(0., .015, 0.));
  float fw = pow(max(dot(d, SUN), 0.), 5.);
  vec3 Ls = SUNC * SUNI;
  uint hb = hu(uint(int(k) + 50000) * 31u ^ uint(int(floor(v / ROW.w)) + 900000) * 977u);
#if LMASK & 1
  if (kind < .5) {
    float hr = clamp(yr / h, 0., 1.);
    vec3 N = normalize(nU * (s / (w * w)) + vec3(0., max(yr, 0.) / (h * h), 0.) - nV * b.z * .4);
    // the crown is a mass of flower heads with dark gaps between them
    float th = at2(s, max(yr, 0.) + .05);
    vec2 qs = vec2(dot(p.xz, nV.xz), th * (w + h) * .5);
    float f1 = clamp(.022 / fp - .5, 0., 1.), f2 = clamp(.08 / fp - .5, 0., 1.);
    if (cut > .5) {
      // a cut bush: a low dome of grey-green leafy stems, the pale straw of the cut stalks on its top
      float stw = mix(.3, smoothstep(.5, .8, nf(qs / vec2(.006, .009) + 5.)), clamp(.015 / fp - .5, 0., 1.)) * smoothstep(.15, .85, hr);
      float cl = mix(.5, nf(qs / .09 + 19.), f2), cl2 = mix(.5, nf(qs / .03 + 3.), f1);
      vec3 alb = mix(vec3(.2, .24, .2), vec3(.4, .37, .28), stw * .75) * (.82 + .2 * cl + .16 * cl2);
      float ndl = dot(N, SUN), dif = max(ndl, 0.) * .8 + .2 * max(ndl + .4, 0.) / 1.4;
      float rim = pow(1. - abs(dot(N, -d)), 2.);
      float tf = mix(.5, nf(vec2(p.x * .7 + p.z * .7, p.y) * 22.), clamp(.02 / fp - .3, 0., 1.));
      float ao = mix(.4, 1., smoothstep(0., .8, hr)) * (.85 + .15 * cl2) * (.55 + .9 * tf);
      return alb * (SKYA * (.55 + .45 * N.y) * ao + Ls * (dif * sh.x + fw * (.25 + 1.4 * rim) * sh.y * (.3 + .7 * hr)));
    }
    float hd1 = mix(.6, .25 + .75 * smoothstep(.3, .7, nf(qs / vec2(.016, .012) + 7.)), f1 * (1. - .7 * near));
    float cl = mix(.5, nf(qs / .09 + 19.), f2);
    float cov = clamp(mix(.3, .9, smoothstep(.1, .8, hr * .7 + N.y * .5)) * (.8 + .4 * cl) * mix(1., .75, near) * (1. - cut), 0., 1.);
    float head = clamp(hd1 * cov * 1.6, 0., 1.);
    vec3 lav = LAV.rgb * (.92 + .16 * hf(hb)) * mix(vec3(1.), vec3(1.15, .88, .95), hf(hb ^ 5u) * .25);
    vec3 fol = mix(vec3(.1, .125, .08), vec3(.15, .17, .1), cut) * (.6 + .5 * cl);
    vec3 gap = mix(fol * .35, lav * .35, .5);
    vec3 lean3 = vec3(.21, .23, .17);
    float ndl = dot(N, SUN), dif = max(ndl, 0.) * .8 + .2 * max(ndl + .4, 0.) / 1.4;
    float rim = pow(1. - abs(dot(N, -d)), 2.);
    float ao = mix(.35, 1., smoothstep(0., .8, hr)) * mix(1., .75, near);
    vec3 Eh = SKYA * (.55 + .45 * N.y) * ao + Ls * (dif * sh.x + fw * (.25 + 1.4 * rim) * sh.y * (.3 + .7 * hr));
    vec3 Eg = (SKYA * (.5 + .5 * N.y) * ao + Ls * dif * sh.x * .25) * .55;
    vec3 ch = mix(lav, lean3 * 1.3, clamp(lean * .25 + max(lean - WIND.z * .6, 0.) * .45, 0., .6) * hr) * Eh * mix(1., .8, near), cg = gap * Eg;
    // low sun through the florets and stems at the crown's rim: a gold glow toward the sun
    ch += (lav * .9 + vec3(.1, .07, .02)) * Ls * fw * (.15 + 1.4 * rim) * sh.y * hr;
    vec3 cF = mix(cg, ch, head);
    if (near > .001) {
      // close up the crown is a mass of thin stems: grey-green below, a violet haze of spikes above
      float sk = nf(qs / .0045 + 3.) * .55 + nf(qs / .013 + 9.) * .45;
      float flw = smoothstep(.15, .55, hr + .35 * (nf(qs / .05 + 2.) - .5));
      // grey-green leafy skirt below; above it the shade inside the bush, flecked with spikes deeper in
      float lf = smoothstep(.45, .7, sk), fk = smoothstep(.55, .8, sk);
      vec3 nc = mix(vec3(.2, .23, .17) * (.55 + .7 * lf) * mix(Eg, Eh, .6), mix(fol * .5, lav * .8, .35 + .65 * fk) * mix(Eg, Eh, .35) * (.7 + .5 * fk), flw);
      cF = mix(cF, nc, near * near);
    }
    return cF;
  }
#endif
#if (LMASK & 2) == 0
  return vec3(0.);
#else
  // the furrow floor: pale ochre limestone soil, a compacted wheel track down its middle, pebbles and grit
  float edge = smoothstep(b.x * .5, b.x * 1.15, abs(s));
  vec2 q = p.xz;
  float rut = smoothstep(.17, .06, abs(abs(s) - .5 * ROW.x));
  float n1 = nf(q / .9 + 3.), n2 = mix(.5, nf(q / .045 + 11.), clamp(.02 / fp - .3, 0., 1.)), n3 = mix(.5, nf(q / .2 + 5.), clamp(.06 / fp - .4, 0., 1.));
  vec3 alb = vec3(.6, .45, .33) * (.72 + .36 * n1) * (.72 + .56 * n2 * (1. - .4 * rut)) * (.85 + .3 * n3) * (1. - .1 * rut);
  alb *= mix(vec3(1.), vec3(.6, .44, .36), WX.w) * (1. - .12 * WR.w);
  vec3 N = vec3(0., 1., 0.);
  float occ = 1.;
  if (fp < .03) {
    // pebbles and grit from the baked stone map, two scales (one lookup site, a loop bounded by a uniform)
    for (int i = 0; i < int(LP.z) - 3; i++) {
      float cs = i == 0 ? .085 : .03;
      vec2 c = q / cs + (vec2(nf(q / (cs * .5)), nf(q / (cs * .5) + 7.)) - .5) * .8 + float(i) * vec2(13.7, 5.3);
      vec4 sm = textureLod(uSt, c / 32., 0.);
      float pres = (1. - smoothstep(cs * .1, cs * .35, fp)) * (i == 0 ? 1. - .6 * rut : 1.);
      float st = sm.r * pres;
      vec3 sc = mix(vec3(.68, .65, .58), vec3(.64, .5, .35), nf(c * .9 + 3.)) * (.68 + .45 * nf(c * 2.3 + 11.));
      alb = mix(alb, sc, st);
      occ *= 1. - .5 * sm.a * pres;
      vec2 nx = sm.gb * 2. - 1.;
      N = normalize(mix(N, vec3(nx.x, sqrt(max(1. - dot(nx, nx), 0.)), nx.y), st * .75));
    }
  }
  alb = mix(alb * vec3(.45, .4, .36), alb, edge);
  float ao = (.35 + .65 * edge) * occ;
  vec3 Sg = normalize(vec3(SUN.x, .35, SUN.z));
  vec3 fc = alb * (SKYA * ao * 1.2 * (.55 + .45 * N.y) + SUNC * SUNI * .012 * ao * max(dot(N, Sg), 0.) + Ls * max(dot(N, SUN), 0.) * sh.x * 1.6 * occ);
  // after rain: puddles in the wheel track mirror the sky
  // after rain the wet clay takes a sheen of the sky at a grazing look
  return fc + WZ.rgb * SKY.x * WX.w * (.3 + .7 * n1) * edge * sq(sq(1. + d.y)) * .9;
#endif
}
#if PASS == 0
// the march: ground, then the rows (one loop each); writes where it hit, the shading passes light it
void main() {
  vec2 sz = vec2(2. * TANH / PA);
  vec2 sc = gl_FragCoord.xy / sz * 2. - 1.;
  vec3 d = normalize(FWD + RGT * sc.x * TANH + UPV * sc.y * TANH);
  vec3 o = CAM;
  vec3 P = vec3(0.); bool hitAny = false;
  // ground: geometric march to the layer top, then bisection (one loop)
  float tlo = 0., thi = 0., reg = -1., top, rLo = -1., topLo = 0.;
  if (d.y < .02) {
    float t = max(.25, (o.y - Gr(o.xz) - ROW.z * 1.25 - .05) / (-d.y + .05) - .2), tp = t;
    int bis = 0;
    for (int i = 0; i < int(LP.y) + int(LP.w); i++) {
      float tq = bis > 0 ? .5 * (tlo + thi) : t;
      vec3 p = o + d * tq;
      float r = regionOf(p.xz, top);
      bool below = p.y < Gr(p.xz) - sq(length(p.xz - o.xz)) / 1.27e7 + top;
      if (bis == 0) {
        if (below) { reg = r; tlo = tp; thi = t; bis = 1; }
        else { tp = t; rLo = r; topLo = top; t = t * 1.4 + .15; if (t > min(9000., 1.6 * ROW.x / PA)) break; }
      } else {
        if (below) { thi = tq; reg = r; } else { tlo = tq; rLo = r; topLo = top; }
        bis++; if (bis > int(LP.w)) break;
      }
    }
  }
  if (reg >= 0.) {
    hitAny = true;
    P = o + d * thi;
    float dist = thi;
    if (reg < .5) {
      float bdv = bendD(P.z);
      float a = abs(d.x - bdv * d.z) / sqrt(1. + bdv * bdv);
      float fpU = dist * PA * (a / max(-d.y, .002) + 1.);
      float wm = smoothstep(.3 * ROW.x, 1.1 * ROW.x, fpU);
      if (wm >= 1.) discard;
      float kind = 2.;
      {
        // walk the rows, then bisect onto the crown (one loop)
        float t = tlo, tp = tlo, tMax = min(thi + (ROW.z * 1.3 + .3 + .35 * WQ.x) / max(-d.y, .01), thi + 60.);
        float yp = 1., lo = 0., hi = 0.;
        int wb = 0;
        for (int i = 0; i < int(LP.x) + int(LP.w); i++) {
          float tq = wb > 0 ? .5 * (lo + hi) : t;
          vec3 p = o + d * tq;
          float F = insideF(p, -1.);
          if (wb == 0) {
            if (F < 1.) { kind = 0.; lo = tp; hi = t; wb = 1; }
            else {
              if (gYr < 0.) { kind = 1.; break; }
              if (t > tMax || i >= int(LP.x)) break;
              tp = t; yp = gYr;
              float bd = bendD(p.z);
              float aa = abs(d.x - bd * d.z);
              float st = min(max(ROW.w * .4, t * .03) / max(abs(d.z), 1e-3), .22 / max(aa, 1e-3));
              st = min(st, max(gYr, .015) / max(-d.y, 1e-4) + .008);
              t += max(st, .008);
            }
          } else {
            if (F < 1.) hi = tq; else lo = tq;
            wb++; if (wb >= int(LP.w)) break;
          }
        }
        if (kind < .5) t = hi;
        else if (kind < 1.5) t = tp + yp / max(-d.y, 1e-4);
        if (kind < 1.5) P = o + d * t; else wm = 1.;
      }
      // the hit goes to the shading passes: distance (log, 16 bits), kind, blend to the row mean
      float tq = floor(clamp(log2(length(P - o) + 1.) / 12., 0., 1.) * 65535. + .5), hiB = floor(tq / 256.);
      oc = vec4(hiB / 255., (tq - hiB * 256.) / 255., kind * .5, wm);
      vec4 cp = VP * vec4(P, 1.);
      gl_FragDepth = clamp(cp.z / cp.w * .5 + .5, 0., 1.);
    } else discard;
  }
  if (!hitAny) discard;
}
#else
uniform sampler2D uG;
void main() {
  vec4 g = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
  float kind = floor(g.b * 2. + .5);
#if LMASK != 3
  if (((LMASK >> (kind < .5 ? 0 : 1)) & 1) == 0) discard;
#endif
  float t = exp2((floor(g.r * 255. + .5) * 256. + floor(g.g * 255. + .5)) / 65535. * 12.) - 1., wm = g.a;
  vec2 sz = vec2(2. * TANH / PA);
  vec2 sc = gl_FragCoord.xy / sz * 2. - 1.;
  vec3 d = normalize(FWD + RGT * sc.x * TANH + UPV * sc.y * TANH);
  vec3 P = CAM + d * t;
  float lean = windAt(P.xz);
  vec3 ce = kind < 1.5 ? lavShade(P, d, t, kind, lean) : vec3(0.);
  vec3 col = mix(ce, wm > 0. ? lavMean(P, d, lean) : vec3(0.), wm);
  col = fogMix(col, d, t, P.y);
  oc = vec4(tmap(col * EXPO), 1.);
}
#endif
`,Jt=B+j+`
out vec4 oc;
float vilHill(float x) { return .003 + .012 * exp(-sq(x / .055)) + .004 * exp(-sq((x + .075) / .06)); }
vec3 skyAll(vec3 d) {
  vec3 c = skyRad(d);
  float e = d.y;
  // cirrus, lit from below by the low sun
  if (e > .006 && SKY.z > 0.) {
    vec2 cp = d.xz / (e + .12) * 1.6, ro = vec2(cos(WR.x * .11 + .64), sin(WR.x * .11 + .64));
    vec2 q = vec2(dot(cp, ro) * .7, dot(cp, vec2(-ro.y, ro.x)) * 2.);
    q.y += 1.4 * sin(q.x * .32 + WR.y) + .8 * (nf(q * .21 + 4.) - .5);
    float cn = nf(q * 1.1 + 5.) * .55 + nf(q * 2.7 + vec2(9., 3.)) * .3 + nf(q * 7. + 2.) * .15;
    float m = smoothstep(.56, .86, cn - .12 * (nf(q * 16. + 4.) - .5)) * SKY.z * smoothstep(.006, .1, e) * (1. - .6 * smoothstep(.4, .9, e));
    float fw = max(dot(d, SUN), 0.);
    vec3 cc = (mix(vec3(.95, .5, .5), vec3(1.2, .75, .45), fw * fw) * SGL.x * SGL.x + vec3(.06, .06, .1)) * SKY.x * 1.2;
    c = mix(c, cc, m * .45);
  }
  // the sun (a deep yellow disc when it is low; the moon on a moonlit night)
  float ang = acos(clamp(dot(d, SUN), -1., 1.));
  c += SUNC * SUNC * SUNC * 7. * smoothstep(WY.z * 1.12, WY.z * .9, ang) * SGL.y;
  // the evening star and a few first stars
  float va = acos(clamp(dot(d, VEN.xyz), -1., 1.)) / PA;
  c += vec3(1., .97, .9) * VEN.w * (exp(-va * va * 1.2) * 1.4 + exp(-va * .7) * .05);
  if (MISC.x > .01 && e > .05) {
    vec2 sc = vec2(at2(d.x, d.z) * 40., asin(e) * 40.);
    vec2 ci = floor(sc);
    uint h = hu(uint(int(ci.x) + 9000) * 7919u ^ uint(int(ci.y) + 9000) * 3343u);
    vec2 sp = ci + .2 + .6 * vec2(hf(h ^ 1u), hf(h ^ 2u));
    float dd = length((sc - sp) / 40.) / PA;
    c += step(hf(h), .05) * pow(hf(h ^ 9u), 6.) * MISC.x * exp(-dd * dd * 1.5) * vec3(.9, .95, 1.) * (1.5 - .9 * WY.y);
  }
  if (WX.z > 0.) c = mix(c, vec3(.42, .42, .44) * SKY.x + SUNC * SUNI * .03, WX.z * exp(-max(e, 0.) / .03));
  // far land against the sky: hills, the Alps, distant woods
  if (e > .035) return c;
  float az = at2(d.x, d.z);
  vec2 cs = vec2(sin(az), cos(az));
  vec3 hzc = skyRad(normalize(vec3(d.x, .004, d.z)));
  float aw = exp(-sq(sin((az - ALPS.x) * .5) / ALPS.y));
  float rC = aw * (.003 + .0075 * (1. - abs(nf(cs * 40. + 3.) * 2. - 1.)) + .004 * nf(cs * 110. + 7.)) - .0015;
  float px = PA * .8;
  float mC = smoothstep(rC + px, rC - px, e) * aw;
  vec3 alp = mix(hzc * vec3(.86, .88, .97), vec3(1., .62, .62) * SKY.x * 1.1 * (1. - .6 * DUSK) + vec3(.05, .06, .1) * DUSK, smoothstep(rC - .004, rC, e) * .45 * ALPS.z);
  c = mix(c, alp, mC * (.35 + .5 * ALPS.z));
  float rB = .0035 + .017 * sq(nf(cs * 5. + 11.)) + .006 * nf(cs * 19. + 4.) + .0015 * nf(cs * 70. + 1.);
  vec3 hil = hzc * mix(vec3(.46, .5, .66), vec3(.7, .7, .8), SKY.w) * (.94 + .12 * smoothstep(rB, rB - .006, e));
  c = mix(c, hil, smoothstep(rB + px, rB - px, e));
  // a hilltop village (rare): a far hill with the village stepped up its crown round a church and its bell tower,
  // backlit by the low sun with gold on its sunward edges, windows lit at dusk
  if (ALPS.w > -9.) {
    float x = az - ALPS.w;
    if (abs(x) < .22) {
      float hE = vilHill(x) + .0005 * nf(vec2(x * 700., 1.));
      c = mix(c, hzc * vec3(.33, .36, .43) * (.92 + .16 * nf(vec2(x * 260., e * 260.))), smoothstep(hE + px, hE - px, e));
      float vf = smoothstep(.052, .018, abs(x + .004));
      if (vf > 0.) {
        float xw = x / .0024 + .35 * sin(x * 1900.), ci = floor(xw), fx = xw - ci;
        uint hh = hu(uint(int(ci) + 900) * 7919u);
        float hC = vilHill((ci + .5) * .0024), tw = step(abs(x + .006), .0012), nave = step(abs(x + .0105), .0045);
        float top = hC + (.0012 + .0028 * hf(hh)) * vf * step(hf(hh ^ 1u), .25 + .75 * vf);
        top = max(top, max(tw * (vilHill(-.006) + .0115 + step(abs(x + .006), .0005) * .0012), nave * (vilHill(-.0105) + .0048)));
        float bot = hC - .0075 * vf;
        float m = smoothstep(top + px, top - px, e) * smoothstep(bot - px, bot + px, e);
        vec3 wc = hzc * vec3(.29, .28, .32) * (.85 + .25 * hf(hh ^ 2u));
        wc = mix(wc, hzc * vec3(.33, .24, .23), smoothstep(top - .0011, top - .0004, e) * (1. - max(tw, nave)) * .75);
        float sl = at2(SUN.x, SUN.z) < ALPS.w ? step(fx, .3) : step(.7, fx);
        wc += SUNC * SUNI * .008 * sl * (1. - DUSK);
        c = mix(c, wc, m * vf);
        vec2 lc = vec2(x / .0011, (e - bot) / .0011), li = floor(lc);
        uint lh = hu(uint(int(li.x) + 900) * 1973u ^ uint(int(li.y) + 900) * 9277u);
        float ld = length(lc - li - .5) * .0011 / PA;
        c += m * vf * step(hf(lh), .07) * step(e, top - .0008) * step(bot + .0012, e) * DUSK * vec3(1., .55, .2) * exp(-ld * ld * 2.) * 1.2;
      }
    }
  }
  float rN = .002 + .007 * sq(nf(cs * 9. + 23.)) + .0012 * nf(cs * 45. + 3.);
  c = mix(c, hil * vec3(.82, .84, .9), smoothstep(rN + px, rN - px, e));
  float rA = .0012 + .0022 * nf(cs * 60. + 8.) * nf(cs * 13. + 2.) + .0015 * step(.8, nf(cs * 180.));
  vec3 woo = hzc * vec3(.45, .48, .55);
  c = mix(c, woo, smoothstep(rA + px, rA - px, e));
  return c;
}
void main() {
  vec2 sz = vec2(2. * TANH / PA);
  vec2 sc = gl_FragCoord.xy / sz * 2. - 1.;
  vec3 d = normalize(FWD + RGT * sc.x * TANH + UPV * sc.y * TANH);
  oc = vec4(tmap(skyAll(d) * EXPO), 1.);
}`,eo=B+j+`
out vec4 o;
void main() {
  vec2 sz = vec2(2. * TANH / PA);
  vec2 sc = gl_FragCoord.xy / sz * 2. - 1.;
  vec3 d = normalize(FWD + RGT * sc.x * TANH + UPV * sc.y * TANH);
  float e = d.y;
  o = vec4(0.);
  // the Milky Way standing over the end of the rows on a moonless night
  if (WY.y > 0. && e > 0.) {
    vec3 nm = normalize(vec3(cos(WR.z), .28, -sin(WR.z)));
    float b = dot(d, nm);
    vec3 t1 = normalize(cross(nm, vec3(0., 1., 0.))), t2 = cross(nm, t1);
    vec2 gp = vec2(at2(dot(d, t2), dot(d, t1)) * 6., b * 9.);
    float core = exp(-sq(b / .15)) * (.5 + .5 * nf(gp * 2.3 + 3.)) * (.55 + .45 * nf(gp * 7. + 9.));
    float lane = smoothstep(.035, 0., abs(b - .015 + .03 * (nf(gp * 3.1) - .5))) * .75;
    o = vec4(tmap(vec3(.045, .043, .04) * core * (1. - lane) * WY.y * smoothstep(0., .25, e) * EXPO * .35), 1.);
  }
  // the weather's cloud: 1 a storm wall over the far sky, the low sun in under its edge and rain veils below it;
  // 2 summer cumulus, 3 torn cloud after rain, lit from below, 4 a soft grey overcast
  if (WX.y > .5) {
    vec2 cp = d.xz / (max(e, 0.) + .07) * (WX.y > 1.5 && WX.y < 2.5 ? 1.5 : .8) + WR.xy;
    float n = nf(cp * .55) * .5 + nf(cp * 1.45 + 3.) * .28 + nf(cp * 3.9 + 7.) * .14 + nf(cp * 9.5 + 1.) * .08;
    float fw = max(dot(d, SUN), 0.), hzF = smoothstep(.0, .06, e);
    float m, lit, rv = 0.;
    vec3 dk;
    if (WX.y < 1.5) {
      float az = at2(d.x, d.z), da = az - WQ.z;
      da -= 6.2832 * floor(da / 6.2832 + .5);
      float edge = .07 + .045 * nf(vec2(az * 2.6 + WR.x, 1.)) + .07 * sq(da / 1.7);
      m = smoothstep(edge - .006, edge + .02, e + .035 * (n - .5)) * smoothstep(2.3, 1.4, abs(da));
      lit = exp(-max(e - edge, 0.) / .03) * (.3 + .7 * pow(fw, 3.)) * (.6 + .6 * n);
      dk = vec3(.034, .04, .056) * (.55 + .9 * n);
      // rain standing under the cloud far off
      rv = smoothstep(.0, .25, da - .2) * smoothstep(1.1, .7, da) * step(e, edge + .01);
      rv *= .5 * smoothstep(-.005, .02, e);
      dk = mix(dk, vec3(.06, .07, .09) * (.8 + .4 * nf(vec2(az * 240., e * 5.))) / max(SKY.x, .05), rv * (1. - m)); m = max(m, rv);
    } else {
      float th = 1. - WX.x;
      m = smoothstep(th - .08, th + .22, n) * hzF;
      float dn = smoothstep(th, th + .5, n);
      lit = (1. - .75 * dn) * (.25 + .75 * pow(fw, 2.5)) + .25 * (1. - dn) * fw;
      dk = WX.y > 3.5 ? vec3(.36, .37, .39) * (1.05 - .3 * dn) : mix(vec3(.11, .115, .135), vec3(.05, .055, .07), dn);
    }
    vec3 cc = dk * SKY.x + SUNC * vec3(1., .72, .55) * lit * SGL.x * (WX.y > 3.5 ? 0. : .9);
    o = vec4(tmap(cc * EXPO), m * WX.x);
  }
  if (o.a < .002 || WY.y > 0. && max(o.r, o.g) < .002) discard;
}`,to=B+j+`
void main() {
  vec2 q = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1. : -1., gl_VertexID >= 2 ? 1. : -1.);
  vec3 b = vec3(HOUSE.x, Gr(HOUSE.xy) + 4., HOUSE.y);
  vec3 tc = CAM - b; vec3 R = normalize(vec3(-tc.z, 0., tc.x));
  gl_Position = VP * vec4(b + R * q.x * 15. + vec3(0., q.y * 9., 0.), 1.);
}`,oo=B+j+`
out vec4 oc;
// the mas: convex pieces (walls + gable roof; a lower barn with a lean-to roof)
void pl(vec3 n, float h, vec3 ro, vec3 rd, inout float te, inout float tx, inout vec3 ne) {
  float dn = dot(n, rd), nm = h - dot(n, ro);
  if (abs(dn) < 1e-7) { if (nm < 0.) te = 1e9; return; }
  float t = nm / dn;
  if (dn < 0.) { if (t > te) { te = t; ne = n; } } else tx = min(tx, t);
}
float houseHit(vec3 o, vec3 d, out vec3 nW, out vec3 lp) {
  vec3 b = vec3(HOUSE.x, Gr(HOUSE.xy) - .4, HOUSE.y);
  vec3 ro = o - b;
  float c = cos(HOUSE.z), s = sin(HOUSE.z);
  mat3 R = mat3(c, 0., s, 0., 1., 0., -s, 0., c);
  vec3 r0 = R * ro, rd = R * d;
  float te = -1e9, tx = 1e9; vec3 ne = vec3(0.);
  pl(vec3(1, 0, 0), 8., r0, rd, te, tx, ne); pl(vec3(-1, 0, 0), 8., r0, rd, te, tx, ne);
  pl(vec3(0, 0, 1), 5., r0, rd, te, tx, ne); pl(vec3(0, 0, -1), 5., r0, rd, te, tx, ne);
  pl(vec3(0, -1, 0), 0., r0, rd, te, tx, ne);
  pl(normalize(vec3(0, 1, .36)), 9.9 * .941, r0, rd, te, tx, ne); pl(normalize(vec3(0, 1, -.36)), 9.9 * .941, r0, rd, te, tx, ne);
  float t1 = te <= tx && tx > 0. ? te : 1e9; vec3 n1 = ne;
  te = -1e9; tx = 1e9;
  pl(vec3(1, 0, 0), 17., r0, rd, te, tx, ne); pl(vec3(-1, 0, 0), -8., r0, rd, te, tx, ne);
  pl(vec3(0, 0, 1), 4., r0, rd, te, tx, ne); pl(vec3(0, 0, -1), 4.5, r0, rd, te, tx, ne);
  pl(vec3(0, -1, 0), 0., r0, rd, te, tx, ne);
  pl(normalize(vec3(0, 1, .3)), 6.2 * .958, r0, rd, te, tx, ne);
  float t2 = te <= tx && tx > 0. ? te : 1e9;
  if (t2 < t1) { t1 = t2; n1 = ne; }
  nW = transpose(R) * n1;
  lp = r0 + rd * t1;
  return t1;
}
vec3 houseShade(vec3 lp, vec3 N, vec3 nL, float dist) {
  vec3 col;
  if (nL.y > .3) {
    float tiles = .8 + .2 * sin(lp.x * 11.) + .15 * (nf(lp.xz * 3.) - .5);
    vec3 alb = vec3(.4, .15, .07) * tiles * (.8 + .4 * nf(lp.xz * .7 + 3.));
    col = alb * (SKYA * (.6 + .4 * N.y) + SUNC * SUNI * max(dot(N, SUN), 0.) * 1.2);
  } else {
    vec3 alb = vec3(.42, .34, .25) * (.8 + .35 * nf(lp.xy * 1.3 + lp.zz * .7)) * (.9 + .15 * nf(lp.xy * 5.));
    float glow = 0.;
    if (nL.z < -.5) {
      // the front: shuttered windows, a door, one lit window
      vec2 f = lp.xy;
      for (int i = 0; i < 6; i++) {
        vec2 wc = vec2(-5. + 4.5 * float(i - (i / 3) * 3), i < 3 ? 2.2 : 5.6);
        vec2 dd = abs(f - wc) - vec2(.5, .7);
        float inW = step(max(dd.x, dd.y), 0.);
        if (i == 0) glow = inW; else alb = mix(alb, vec3(.12, .16, .15), inW * (i == 4 ? 0. : 1.));
      }
      vec2 dd = abs(f - vec2(10.5, 1.2)) - vec2(.9, 1.2);
      alb = mix(alb, vec3(.1, .08, .06), step(max(dd.x, dd.y), 0.) * step(lp.x, 16.) * step(8.1, lp.x));
    }
    if (nL.x < -.5 && HOUSE.w > 1.2) {
      vec2 dd = abs(lp.zy - vec2(-1., 5.6)) - vec2(.5, .7);
      glow = max(glow, step(max(dd.x, dd.y), 0.));
    }
    col = alb * (SKYA * .85 + SUNC * SUNI * max(dot(N, SUN), 0.) * 1.3);
    col += glow * vec3(1., .5, .17) * (.5 + 1.6 * DUSK) * min(HOUSE.w, 1.) * 2.5;
  }
  return col;
}
void main() {
  vec2 sz = vec2(2. * TANH / PA);
  vec2 sc = gl_FragCoord.xy / sz * 2. - 1.;
  vec3 d = normalize(FWD + RGT * sc.x * TANH + UPV * sc.y * TANH);
  vec3 hn, hl;
  float th = houseHit(CAM, d, hn, hl);
  if (th > 3000.) discard;
  mat3 R = mat3(cos(HOUSE.z), 0., sin(HOUSE.z), 0., 1., 0., -sin(HOUSE.z), 0., cos(HOUSE.z));
  vec3 col = houseShade(hl, hn, R * hn, th);
  col = fogMix(col, d, th, CAM.y + d.y * th);
  vec4 cp = VP * vec4(CAM + d * th, 1.);
  gl_FragDepth = clamp(cp.z / cp.w * .5 + .5, 0., 1.);
  oc = vec4(tmap(col * EXPO), 1.);
}`,ao=B+j+`
layout(location=0) in vec2 aV;
uniform vec4 uG0, uG1;
out vec4 vC; out vec3 vH;
void main() {
  int SPB = int(uG1.y);
  int id = gl_InstanceID + int(uG1.x);
  int slot = id / SPB, q = id - slot * SPB;
  int NK = int(uG0.z);
  int jI = slot / NK, kI = slot - jI * NK;
  float k = uG0.x + float(kI), j = uG0.y + float(jI);
  uint hk = uint(int(k) + 50000);
  float ph = hf(hk * 7919u) * ROW.w;
  uint hh = hu(hk * 1973u ^ uint(int(j) + 900000) * 9277u);
  float jit = (hf(hh) - .5) * .22, sz = .8 + .35 * hf(hh ^ 3u), miss = step(LAV.w, hf(hh ^ 7u));
  float vc = (j + jit) * ROW.w + ph, uc = (k + .5) * ROW.x;
  vec2 bxz = vec2(uc + bend(vc), vc);
  float dist = length(bxz - CAM.xz);
  float rank = (float(q) + .5) / float(SPB);
  float dens = uG1.y > 300. ? (dist < uG1.z ? 1. - .7 * smoothstep(3., uG1.z, dist) : 0.) : (dist >= uG1.z ? 1. - smoothstep(uG1.z, uG1.w, dist) : 0.);
  dens *= miss;
  if (uc * (1. - 2. * GE.z) < GE.w || uc >= FLD.x || vc < -62.5 || vc > WY.w) dens = 0.;
  vec4 cc = VP * vec4(bxz.x, CAM.y - 1., bxz.y, 1.);
  if (rank > dens || cc.w < -1. || abs(cc.x) > cc.w * 1.15 + 1.2 || cc.y > cc.w * 1.1 + 1.2) { gl_Position = vec4(2., 2., 2., 1.); vC = vec4(0.); vH = vec3(0.); return; }
  float gb = Gr(bxz);
  uint hs = hu(hh ^ uint(q + 1) * 2654435761u);
  float r1 = hf(hs), r2 = hf(hs ^ 0x9e37u), r3 = hf(hs ^ 0x51edu), r4 = hf(hs ^ 0x7f4au), r5 = hf(hs ^ 0x3c6eu);
  float W = ROW.y * (.8 + .25 * sz), Hh = ROW.z * sz, L = .8 * ROW.w * (.85 + .3 * sz);
  float phi = 6.2832 * r1, ct = 1. - .78 * pow(r2, .8), st = sqrt(1. - ct * ct);
  vec3 dirE = vec3(st * cos(phi), ct, st * sin(phi));
  float bdv = bendD(vc);
  vec3 nU = normalize(vec3(1., 0., -bdv)), nV = vec3(-nU.z, 0., nU.x);
  vec3 base = vec3(bxz.x, gb, bxz.y);
  // stems rise from the woody heart of the bush and arch outward, drooping at the rim (a quadratic curve)
  vec3 tL = dirE * vec3(W, Hh, L) * (.84 + .24 * r3), rL = dirE * vec3(W * .25, Hh * .3, L * .25) * (.6 + .4 * r4);
  vec3 tip = base + nU * tL.x + vec3(0., tL.y, 0.) + nV * tL.z;
  vec3 root = base + nU * rL.x + vec3(0., rL.y, 0.) + nV * rL.z;
  vec3 ax = tip - root; float len = length(ax);
  vec3 hdir = normalize(vec3(0., .4 + ct, 0.) + (nU * dirE.x + nV * dirE.z) * (.75 + .3 * r5));
  vec3 cB = tip - hdir * len * .45;
  float hfr = clamp((.055 + .035 * r5) / len, .12, .5);
  int vi = int(aV.x + .5);
  float s = vi == 0 ? 0. : vi == 1 ? .5 * (1. - hfr) : vi == 2 ? .997 * (1. - hfr) : 1. - hfr + hfr * float(vi - 3) * .5;
  float hd = clamp((s - (1. - hfr)) / hfr, 0., 1.);
  // wind lean (travelling gusts) and a flutter
  float lean = windAt(base.xz);
  float fl = sin(TIME * (2.1 + 1.7 * r3) + r1 * 40.) * (.012 + .03 * WIND.z) + sin(TIME * 5.3 + r4 * 30.) * .004;
  vec3 wv = vec3(WIND.x, 0., WIND.y);
  vec3 Dv = wv * (lean * (.07 + .05 * r5) + fl) + cross(wv, vec3(0., 1., 0.)) * fl * .6;
  vec3 P = sq(1. - s) * root + 2. * s * (1. - s) * cB + s * s * tip + Dv * s * s * (len / .3) - vec3(0., dot(Dv, Dv) * s * s * 1.5, 0.);
  vec3 tg = normalize(2. * (1. - s) * (cB - root) + 2. * s * (tip - cB) + 2. * Dv * s * (len / .3));
  vec3 te = CAM - P; float dc = length(te); vec3 V = te / dc;
  vec3 Wd = normalize(cross(tg, V) + 1e-5);
  float w0 = s < 1. - hfr - .001 ? .0013 : .0115 * (.8 + .4 * r4) * (1. - pow(hd, 6.) * .6) * mix(.6, 1., smoothstep(0., .1, hd));
  float wd = max(w0, dc * PA * .8);
  P += Wd * aV.y * wd * .5;
  gl_Position = VP * vec4(P, 1.);
  vec3 N = normalize(cross(Wd, tg)); N = dot(N, V) < 0. ? -N : N;
  // light: sky, sun through the neighbouring rows, own-crown shade, backlight through the heads
  float own = smoothstep(-.35, .45, dot(normalize(P - base - vec3(0., Hh * .25, 0.)), SUN) + .25 * s);
  float shn = 1.;
  float tt = .45;
  for (int i = 0; i < 3; i++) {
    vec3 sp = P + SUN * tt;
    float up2 = sp.x - bend(sp.z), k2 = floor(up2 / ROW.x), s2 = up2 - (k2 + .5) * ROW.x;
    vec4 b2 = bushAt(k2, sp.z);
    float F = b2.x > .005 ? sq(s2 / b2.x) + sq(max(sp.y - Gr(sp.xz), 0.) / b2.y) : 9.;
    shn = min(shn, smoothstep(.6, 1.3, F));
    tt *= 2.6;
  }
  float sh = own * shn;
  float dif = (.3 + .7 * max(dot(N, SUN), 0.)) * sqrt(max(1. - sq(dot(tg, SUN)), 0.));
  float fw = pow(max(dot(-V, SUN), 0.), 4.);
  float occ = .3 + .7 * smoothstep(0., .9, s);
  vec3 lav = LAV.rgb * (.75 + .5 * hf(hh ^ 11u)) * mix(vec3(1.), vec3(1.2, .85, .9), r5 * .5);
  vec3 alb = hd > 0. ? lav : mix(vec3(.06, .075, .05), vec3(.1, .115, .075), s);
  vec3 E = SKYA * (.6 + .4 * max(N.y, 0.)) * occ + SUNC * SUNI * (dif * sh * (hd > 0. ? .6 : .45) + fw * (hd > 0. ? .8 : .4) * shn * (.3 + .7 * own));
  vec3 col = alb * E;
  vC = vec4(tmap(col * EXPO), clamp(w0 / wd, 0., 1.));
  vH = vec3(hd, hd > 0. ? 1. - smoothstep(1.5, 4., dc) : 0., aV.y);
}`,so=B+`in vec4 vC; in vec3 vH; out vec4 o;
void main() {
  float a = vC.a, wh = 1.;
  if (vH.y > 0.) {
    // a spike of separate whorls (grey-violet woolly cups, a few open flowers brighter), a bare gap under the
    // lowest one, a blunt tip
    float x = vH.x * 5.2 - .55, wi = floor(x), w = x - wi;
    float bump = smoothstep(0., .3, w) * smoothstep(1., .5, w);
    float rp = mix(.18, .45 + .55 * bump, step(0., x)) * sqrt(max(1. - pow(vH.x, 6.), 0.));
    float aw = fwidth(vH.z) + 1e-3;
    a *= mix(1., smoothstep(rp + aw, rp - aw, abs(vH.z)), vH.y);
    float fl = step(.55, fract(wi * .618 + vH.z * 1.7 + vC.a * 3.1)) * bump * step(0., x);
    wh = mix(1., (.72 + .28 * bump) * (1. + .45 * fl), vH.y);
  }
  if (a < .01) discard;
  o = vec4(vC.rgb * wh, a);
}`,no=B+j+`
layout(location=0) in vec2 aQ;
layout(location=1) in vec4 aA;
layout(location=2) in vec4 aB;
out vec2 vL; flat out vec4 vK; out vec3 vP;
void main() {
  vec3 b = vec3(aA.x, Gr(aA.xy) - .3, aA.y);
  vec3 tc = CAM - b;
  vec3 R = normalize(vec3(-tc.z, 0., tc.x));
  vec2 l = vec2(aQ.x * aA.w * .58, (aQ.y * .5 + .5) * aA.z * 1.05);
  vec3 P = b + R * l.x + vec3(0., l.y, 0.);
  vL = l; vK = vec4(aB.xy, aA.zw); vP = P;
  gl_Position = VP * vec4(P, 1.);
}`,co=B+j+`
in vec2 vL; flat in vec4 vK; in vec3 vP; out vec4 o;
float seg(vec2 p, vec2 a, vec2 b, float ra, float rb) {
  vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.);
  return length(pa - ba * h) - mix(ra, rb, h);
}
void main() {
  float kind = vK.x, sd = vK.y, H = vK.z, W = vK.w;
  vec2 l = vL;
  float D, inner = 1.;
  if (kind < .5) {
    float tH = H * .3;
    D = seg(l, vec2(0., -1.), vec2(.25, tH), W * .033, W * .024);
    D = min(D, seg(l, vec2(.25, tH), vec2(-W * .22, tH + H * .22), W * .022, W * .01));
    D = min(D, seg(l, vec2(.25, tH), vec2(W * .25, tH + H * .25), W * .02, W * .01));
    D = min(D, seg(l, vec2(.2, tH * .9), vec2(-W * .05, tH + H * .3), W * .018, W * .008));
    float cD = 1e5;
    vec2 cc = vec2(0., tH + (H - tH) * .5);
    vec2 cr = vec2(W * .45, (H - tH) * .48);
    for (int i = 0; i < int(LP.x) - 14; i++) {
      uint hh = hu(uint(i) * 747796405u + uint(sd * 1000.));
      float a = (hf(hh) - .5) * 3.4, rr = .45 + .5 * hf(hh ^ 1u);
      vec2 c = cc + vec2(sin(a) * cr.x, cos(a) * cr.y * .9) * rr - vec2(0., cr.y * .12);
      cD = min(cD, length((l - c) * vec2(1., 1.1)) - W * (.1 + .08 * hf(hh ^ 2u)));
    }
    cD = min(cD, length((l - cc) / cr) * min(cr.x, cr.y) - min(cr.x, cr.y) * .72);
    float lf = (nf(l / .5 + sd * 7.) - .5) * 1.1 + (nf(l / .19 + sd * 3.) - .5) * .5;
    cD += lf;
    float hole = nf(l / .8 + sd * 11.);
    cD = max(cD, (hole - .74) * 2.5 - max(-cD - 1.5, 0.) * 3.);
    inner = smoothstep(0., 1.2, -cD);
    D = min(D, cD);
  } else if (kind < 1.5) {
    float y = l.y / H;
    float hw = W * .5 * (y < .12 ? mix(.55, 1., y / .12) : pow(max(1. - (y - .12) / .88, 0.), .85));
    D = abs(l.x) - hw + (nf(vec2(l.x * 2.2, l.y * 1.6) + sd * 13.) - .5) * .22 * W + (nf(l * 6. + sd) - .5) * .14 * W;
    D = max(D, -l.y - .5);
    inner = smoothstep(0., W * .3, -D);
  } else {
    float tH = H * .32;
    D = seg(l, vec2(0., -1.), vec2(0., tH + 1.), W * .05, W * .035);
    vec2 cc = vec2(0., tH + (H - tH) * .5);
    float cD = length((l - cc) / vec2(W * .5, (H - tH) * .5)) * W * .4 - W * .4;
    cD += (nf(l / (W * .08) + sd * 7.) - .5) * W * .16 + (nf(l / (W * .025) + sd) - .5) * W * .05;
    D = min(D, cD);
    inner = smoothstep(0., W * .2, -cD);
  }
  float aa = max(fwidth(D), 1e-4);
  float a = clamp(.5 - D / aa, 0., 1.);
  if (a < .004) discard;
  vec3 tc = CAM - vP; float dist = length(tc); vec3 V = tc / dist;
  vec3 Rr = normalize(vec3(-V.z, 0., V.x));
  float xn = clamp(l.x / (W * .5), -1., 1.);
  vec3 N = normalize(Rr * xn + V * sqrt(1. - xn * xn) * .8 + vec3(0., .25, 0.));
  vec3 alb = kind < .5 ? vec3(.022, .024, .018) : kind < 1.5 ? vec3(.022, .032, .02) * (.7 + .6 * nf(l * 3. + sd * 5.)) : vec3(.04, .05, .03);
  float dif = max(dot(N, SUN), 0.) * (.5 + .5 * inner);
  float bl = pow(max(dot(-V, SUN), 0.), 8.) * (1. - inner) * .05;
  vec3 col = alb * (SKYA * .7 + SUNC * SUNI * dif * (kind > .5 && kind < 1.5 ? .5 : .9)) + SUNC * SUNI * bl * vec3(.5, .45, .2);
  col = fogMix(col, -V, dist, vP.y);
  o = vec4(tmap(col * EXPO), a);
}`,io=B+j+`
layout(location=0) in vec2 aQ;
layout(location=1) in vec4 aA;
layout(location=2) in vec4 aB;
layout(location=3) in vec4 aC;
out vec2 vQ; flat out vec4 vK; out vec3 vCol;
void main() {
  vec3 P0 = aA.xyz, dir = normalize(aB.xyz + 1e-6);
  vec3 tc = CAM - P0; float dist = length(tc); vec3 V = tc / dist;
  float px = dist * PA, sz = max(aA.w, px * 3.);
  vec3 ax = normalize(cross(vec3(0., 1., 0.), V) + 1e-5), ay = cross(V, ax);
  vec3 dp = dir - V * dot(dir, V);
  if (length(dp) > 1e-3) { ax = normalize(dp); ay = cross(V, ax); }
  gl_Position = VP * vec4(P0 + (ax * aQ.x + ay * aQ.y) * sz * .5, 1.);
  vQ = aQ;
  vK = vec4(aA.w / sz, px / sz, aC.x, 0.);
  float bl = pow(max(dot(-V, SUN), 0.), 6.);
  vCol = SKYA * .8 + SUNC * SUNI * (.5 + .5 * max(dot(V, SUN), 0.) + bl * .6);
}`,ro=B+j+`
in vec2 vQ; flat in vec4 vK; in vec3 vCol; out vec4 o;
float ell(vec2 p, vec2 c, vec2 r) { return (length((p - c) / r) - 1.) * min(r.x, r.y); }
void main() {
  vec2 q = vQ;
  float s = vK.x;
  float body = ell(q, vec2(0.), vec2(.5, .22) * s);
  float wing = min(ell(q, vec2(-.05, .3 + .06 * vK.z) * s, vec2(.34, .17) * s), ell(q, vec2(-.05, -.3 - .06 * vK.z) * s, vec2(.34, .17) * s));
  float band = step(.5, fract(q.x / s * 4.5 + .3));
  vec3 alb = mix(vec3(.03, .022, .012), vec3(.3, .17, .03), band * step(-.25 * s, q.x) * step(q.x, .3 * s));
  float aw = clamp(.5 - wing / max(fwidth(wing), 1e-4), 0., 1.) * .3;
  float ab = clamp(.5 - body / max(fwidth(body), 1e-4), 0., 1.);
  float bpx = .25 * s / max(vK.y, 1e-4), cov = clamp(bpx * bpx * 2., .05, 1.);
  float a = max(ab, aw) * cov;
  if (a < .01) discard;
  vec3 col = mix(vec3(.5, .52, .55) * 1.4, alb, ab) * vCol;
  o = vec4(tmap(col * EXPO), a);
}`,lo=B+j+`
uniform sampler2D uS;
out vec4 o;
void main() {
  vec2 sz = vec2(2. * TANH / PA);
  vec2 uv = gl_FragCoord.xy / sz;
  vec3 c = texelFetch(uS, ivec2(gl_FragCoord.xy), 0).rgb;
  vec2 v = uv - .5;
  c *= 1. - .11 * dot(v, v);
  float wd = length(uv - FIN.xy);
  c += vec3(1., .58, .25) * FIN.z * (.35 * exp(-wd / .0025) + .06 * exp(-wd / .01));
  uint s = uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u;
  float g = hf(s) + hf(s ^ 0x55u) - 1.;
  float l = dot(c, vec3(.3, .6, .1));
  c += g * (MISC.y > 0. ? .005 : .01) * (.35 + .65 * (1. - l));
  o = vec4(c, 1.);
}`;function fo(e){if(e.__c570)return e.__c570;const t=performance.now(),f=[],E=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float");e.getExtension("KHR_parallel_shader_compile");const C=(c,v)=>{const A=e.createShader(c);return e.shaderSource(A,v),e.compileShader(A),A},N=C(e.VERTEX_SHADER,$t),Q={sky:[N,Jt],main:[N,ut(55)],main2:[N,ut(200)],lavM:[N,Je(0)],lav:[N,Je(1,1)],lav2:[N,Je(1,2)],hou:[to,oo],spk:[ao,so],tre:[no,co],crt:[io,ro],fin:[N,lo]},W={};for(const c in Q){const[v,A]=Q[c],H=e.createProgram(),D=typeof v=="string"?C(e.VERTEX_SHADER,v):v,U=C(e.FRAGMENT_SHADER,A);e.attachShader(H,D),e.attachShader(H,U),e.linkProgram(H),W[c]={p:H,vs:D,fs:U}}e.flush();let te=91270081;const oe=()=>{te=te+1831565813|0;let c=Math.imul(te^te>>>15,1|te);return c=c+Math.imul(c^c>>>7,61|c)^c,((c^c>>>14)>>>0)/4294967296},p=new Uint8Array(65536);for(let c=0;c<65536;c++)p[c]=Math.floor(oe()*256);const xe=[];for(let c=0;c<6;c++)xe.push(c,-1,c,1);for(const c in W){const v=W[c].p,A=e.getProgramParameter(v,e.LINK_STATUS);if(f.push(c+" "+(performance.now()-t).toFixed(0)),!A)throw new Error("570 "+c+": "+e.getProgramInfoLog(v)+e.getShaderInfoLog(W[c].fs)+(W[c].vs?e.getShaderInfoLog(W[c].vs):""));const H=e.getUniformBlockIndex(v,"UB");H!==e.INVALID_INDEX&&e.uniformBlockBinding(v,H,0),e.useProgram(v);for(const[D,U]of[["uN",0],["uSt",1],["uG",2],["uS",3]]){const q=e.getUniformLocation(v,D);q&&e.uniform1i(q,U)}W[c].g0=e.getUniformLocation(v,"uG0"),W[c].g1=e.getUniformLocation(v,"uG1")}const K=512,_=new Uint8Array(K*K*4);for(let c=0;c<32;c++)for(let v=0;v<32;v++){const A=oe(),H=(oe()-.5)*.3,D=(oe()-.5)*.3,U=.17+.2*oe(),q=1.25+.3*oe(),Re=oe()*3.1416,X=A<.55,ie=Math.cos(Re),ze=Math.sin(Re);for(let fe=0;fe<16;fe++)for(let re=0;re<16;re++){const b=(re+.5)/16-.5-H,G=(fe+.5)/16-.5-D,ot=ie*b+ze*G,$=(-ze*b+ie*G)*q,Oe=Math.hypot(ot,$),he=X?1-Math.min(1,Math.max(0,(Oe-U*.72)/(U*.28))):0,be=X?(1-Math.min(1,Math.max(0,(Oe-U)/(U*.45))))*(1-he):0,we=Math.hypot(b,U*1.1,G),ye=he*he*(3-2*he),Te=((c*16+fe)*K+v*16+re)*4;_[Te]=Math.round(ye*255),_[Te+1]=Math.round((.5+.5*b/we)*255),_[Te+2]=Math.round((.5+.5*G/we)*255),_[Te+3]=Math.round(be*be*(3-2*be)*255)}}e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.bindBuffer(e.PIXEL_UNPACK_BUFFER,null);const me=e.createTexture();e.bindTexture(e.TEXTURE_2D,me),e.texImage2D(e.TEXTURE_2D,0,e.R8,256,256,0,e.RED,e.UNSIGNED_BYTE,p),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);const Ae=(c,v)=>{const A=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,c,v||e.STATIC_DRAW),A},qe=e.createVertexArray(),ae=e.createVertexArray();e.bindVertexArray(ae),Ae(new Float32Array(xe)),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0);const se=Ae(new Float32Array([-1,-1,1,-1,-1,1,1,1])),Se=(c,v)=>{const A=e.createVertexArray();e.bindVertexArray(A),e.bindBuffer(e.ARRAY_BUFFER,se),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0);const H=Ae(new Float32Array(c*v*4),e.DYNAMIC_DRAW);for(let D=0;D<v;D++)e.enableVertexAttribArray(1+D),e.vertexAttribPointer(1+D,4,e.FLOAT,!1,v*16,D*16),e.vertexAttribDivisor(1+D,1);return{v:A,b:H}},Ge=Se(96,2),ne=Se(96,3);e.bindVertexArray(null);const Ue=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,Ue),e.bufferData(e.UNIFORM_BUFFER,36*16,e.DYNAMIC_DRAW);const Z=e.createTexture();e.bindTexture(e.TEXTURE_2D,Z),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,K,K,0,e.RGBA,e.UNSIGNED_BYTE,_),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);const ce={P:W,fl:E,tN:me,tSt:Z,vEmpty:qe,vSpk:ae,qTre:Ge,qCrt:ne,ubo:Ue,rts:{},vsFull:N,cld:null};return e.__c570=ce,ce}const ho=(e,t)=>{if(t.cld)return t.cld;const f=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(f,eo),e.compileShader(f);const E=e.createProgram();if(e.attachShader(E,t.vsFull),e.attachShader(E,f),e.linkProgram(E),e.flush(),!e.getProgramParameter(E,e.LINK_STATUS))throw new Error("570 cld: "+e.getProgramInfoLog(E)+e.getShaderInfoLog(f));const C=e.getUniformBlockIndex(E,"UB");C!==e.INVALID_INDEX&&e.uniformBlockBinding(E,C,0),e.useProgram(E);const N=e.getUniformLocation(E,"uN");return N&&e.uniform1i(N,0),t.cld=E},vo=(e,t,f)=>{if(t.rts[f])return t.rts[f];const E=e.createTexture();e.bindTexture(e.TEXTURE_2D,E),t.fl?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,f,f,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,f,f,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const C=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,C),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH24_STENCIL8,f,f);const N=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,N),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,E,0),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,C);const Q=e.createTexture();e.bindTexture(e.TEXTURE_2D,Q),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,f,f,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const W=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,W),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Q,0),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,C),e.bindFramebuffer(e.FRAMEBUFFER,null),t.rts[f]={t:E,fb:N,tg:Q,fbG:W}},et=e=>(e>>>=0,e=(e^e>>>16)>>>0,e=Math.imul(e,2146121005)>>>0,e=(e^e>>>15)>>>0,e=Math.imul(e,2221713035)>>>0,(e^e>>>16)>>>0),Ee=e=>(et(e)>>>8)/16777216,ve=(e,t,f)=>Math.max(t,Math.min(f,e)),V=(e,t,f)=>{const E=ve((f-e)/(t-e),0,1);return E*E*(3-2*E)},mt=e=>{const t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]},xo=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],bt=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],tt=e=>e*e;pt.add({num:570,name:"Lavender Field",fam:"Vistas",recipe:"A furrow in a lavender field, mostly on a July sunset, with violet rows running away toward a lone tree, an old stone farmhouse far off and blue hills on the rim. The weather and the hour, where you stand and how far along the lavender is change every mint. Drag to send a breeze rolling across the rows, or hold to let the sun go down (at dawn it comes up instead, and at night the moon rises).",interactive:"Drag to send the breeze rolling across the rows; hold to let the sun go down (at dawn it climbs, at night the moon climbs, under overcast the cloud thins).",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,f=fo(t),E=e.size,C=vo(t,f,E),N=!!e.home,Q=E<=300,W=e.hash.slice(2).padEnd(64,"0"),te=a=>{let s=parseInt(W.slice(0,8),16)^a,n=parseInt(W.slice(8,16),16),o=parseInt(W.slice(16,24),16)^a*7,i=parseInt(W.slice(24,32),16);const r=()=>{s|=0,n|=0,o|=0,i|=0;const l=(s+n|0)+i|0;return i=i+1|0,s=n^n>>>9,n=o+(o<<3)|0,o=o<<21|o>>>11,o=o+l|0,(l>>>0)/4294967296};for(let l=0;l<12;l++)r();return r},oe=te(1392),p=te(40503),xe=[],K=(a,s,n)=>{let o=0;for(const l of s)o+=l[1];let i=oe()*o,r=s[s.length-1];for(const l of s)if(i-=l[1],i<0){r=l;break}return N&&(r=s[n]),xe.push([a,r[0]]),r[2]},_=(a,s)=>{for(const n of xe)n[0]===a&&(n[1]=s)},me=a=>{for(const s of xe)if(s[0]===a)return s[1];return""},Ae=K("Hour",[["Golden hour",3,6.5],["Sunset",4,3.2],["Sun on the ridge",2,.9],["Afterglow",1,-2.8]],1),qe=K("Rows",[["Gentle curve",4,[.35,1.3]],["Straight to the tree",3,[.05,1]],["Sweeping curve",2,[.72,1.4]],["Over the brow",1,[.3,5]]],0),ae=K("Lavender",[["Lavandin in full bloom",5,0],["Fine lavender, blue-violet",3,1],["Half harvested",1,2]],0),se=K("Sky",[["Clear",5,0],["High cirrus",2,1],["Saharan dust",2,2],["Mistral-clear, the Alps sharp",1,3]],0),Se=K("Beyond",[["Sunflowers and stubble",4,0],["Ripe wheat",2,1],["More lavender",2,2]],0),Ge=K("Breeze",[["Still",2,.1],["Light breeze",5,.4],["Gusty",2,.8]],1);oe();const ne=K("Standpoint",[["In a furrow",5,0],["Kneeling among the bushes",2,1],["Across the rows",2,2],["Down the rows into the sun",1,3]],0),Ue=K("Farm",[["A mas with one light",5,1],["Two lit windows",3,2],["A hilltop village",1,3]],0),Z=te(23063),ce=a=>{let s=0;for(const o of a)s+=o[1];let n=Z()*s;for(const o of a)if(n-=o[1],n<0)return o[0];return a[a.length-1][0]};let c=ce([[0,43],[1,12],[2,12],[3,8],[4,8],[5,8],[6,6],[7,3]]),v=ce([[0,45],[1,25],[2,20],[3,10]]),A=Z()<.4?ce([[4,30],[5,30],[6,20],[7,20]]):-1,H=ce([[0,70],[1,30]]),D=ce([[0,55],[1,15],[2,15],[3,15]]),U=ce([[0,60],[1,10],[2,10],[3,10],[4,10]]),q=Z()<.4?ce([[0,30],[1,20],[2,20],[3,15],[4,15]]):-1;const Re=Z()<.5?-1:1,X=Z(),ie=Z(),ze=Z(),fe=Z(),re=Z()<.5?1:0;N&&(c=0,v=0,A=-1,H=0,D=0,U=0,q=-1),ae===2&&(U=0),c===6&&v===0&&(v=1+(fe<.5?0:1)),c===4&&(v=0),Ae<0&&c<4&&(v=0),A===7&&q===3&&(q=0);const b=ae===1?[1.15,.38,.46,.78]:[1.35,.5,.6,.95];b[0]*=.95+p()*.1,U===3&&(b[1]*=.55,b[2]*=.55);const G=[qe[0],140+p()*30,qe[1],150],ot=147,$=ae===1?[.11,.105,.56]:[.2,.105,.5];U===1&&$.splice(0,3,.1,.095,.14),U===2&&$.splice(0,3,.14,.09,.12),c===5&&($[0]*=.8,$[2]*=1.05),c===3&&($[0]*=.95,$[1]*=.85,$[2]*=1.05);const Oe=U===4?.3:.025;let he=ae===2&&ne===2?-1:1,be=ae===2?Math.floor(p()*3):0,we=ae!==2?-1e9:ne===2?-3-be*b[0]:be===2?-1.45:-.1;const ye=a=>G[0]*(Math.sqrt(G[1]*G[1]+a*a)-G[1]),Te=a=>G[0]*a/Math.sqrt(G[1]*G[1]+a*a),wt=H===1?2.6+ze*1.6:0,yt=(a,s)=>G[2]*Math.exp(-tt((s-G[3])/95))+(.5+wt)*Math.sin(a*.021+1.3)*Math.sin(s*.017+.4)+1.8*Math.sin(a*.0047+s*.0031+2)+1.2*Math.sin(a*.0023-s*.0041+.7),Et=yt(-.15,0),Be=(a,s)=>yt(a,s)-Et,At=(a,s)=>{const n=a+5e4>>>0,o=Ee(Math.imul(n,7919))*b[3],i=(s-o)/b[3],r=Math.floor(i);let l=0,u=null;for(let w=0;w<2;w++){const R=r+w,y=et(Math.imul(n,1973)^Math.imul(R+9e5,9277)),d=(Ee(y)-.5)*.22,S=.8+.35*Ee(y^3),m=Ee(y^7)>=Oe?1:0,F=.8*b[3]*(.85+.3*S),k=(s-(R+d)*b[3]-o)/F,T=Math.sqrt(Math.max(1-k*k*k*k,0))*m,x=T*S;x>l&&(l=x,u={w:b[1]*(.8+.25*S)*T,h:b[2]*S*T,j:R,vc:(R+d)*b[3]+o,sz:S,W:b[1]*(.8+.25*S),H:b[2]*S,L:F})}return u&&(a+.5)*b[0]*he<we&&(u.w*=.8,u.h*=.45,u.H*=.45,u.cut=1),u},qo=a=>{const s=a[0]-ye(a[2]),n=Math.floor(s/b[0]),o=s-(n+.5)*b[0],i=At(n,a[2]),r=a[1]-Be(a[0],a[2]);return{F:i&&i.w>.005?tt(o/i.w)+tt(Math.max(r,0)/i.h):9,k:n,b:i,yr:r}},ge=(a,s,n,o)=>{const i=(a+.5)*b[0],r=i+ye(s.vc),l=s.vc,u=Te(s.vc),w=Math.hypot(1,u),R=[1/w,0,-u/w],y=[u/w,0,1/w],d=n()*Ze,S=o?.55+.45*n():.25+.75*n(),m=Math.sqrt(1-S*S),F=[m*Math.cos(d)*s.W,S*s.H,m*Math.sin(d)*s.L*.7],k=1.02+.06*n();return[r+(R[0]*F[0]+y[0]*F[2])*k,Be(r,l)+F[1]*k,l+(R[2]*F[0]+y[2]*F[2])*k]},Ke=(a,s,n,o)=>{for(let i=0;i<12;i++){const r=o()*Ze,l=Math.sqrt(o())*n,u=a+Math.sin(r)*l,w=s+Math.cos(r)*l,R=u-ye(w),y=Math.floor(R/b[0]),d=At(y,w);if(d&&d.w>.2&&!d.cut&&w>-62&&w<Ut&&(y+.5)*b[0]<pe[0])return{k:y,b:d}}return null};let P=[.04,.03,.72,.02][ne]+(N?0:(p()-.5)*.12),Ne=[-.13,-.05,-.17,-.12][ne],Le=[1.3,.72,1.5,1.25][ne],St=-.15,at=0;A===4?(P=Re*(1.42+X*.14),Ne=-.1,Le=1.55):A===5?(P=(X-.5)*.5,Ne=-.22,Le=4.4,at=-62.8):A===6?(P=Re*(1.12+X*.22),Ne=-.12,Le=1.6,at=-60.6):A===7&&(P=.2+X*.12,Ne=-.1,Le=1.6),A===4&&ae===2&&(he=Re<0?1:-1,we=-(5+be*3));let De=P+(ne===3?.03:-.46)+(N?0:(p()-.5)*.14);v===1?De=P+(fe<.5?-1:1)*(A===4?.66+ie*.25:1.25+ie*.35):v===2?De=P+Math.PI+(ie-.5)*.9:v===3&&(De=P+(ie-.5)*.1);const Fe=c===0||c===5,st=se===2&&Fe?1:0,po=Fe?se===1?.9:se===0?.25:se===3?.1:.4:0,uo=[se===2?1200:se===3?5e3:2400,1700,2600,4200,1300,1900,2200,3e3][c],mo=c===1||c===4||c===6?0:c===3?.9:se===3&&Fe?1:se===2&&Fe?0:.45,bo=st?[.034,.085,.19]:c===5?[.02,.05,.11]:c===6?[.03,.075,.16]:[.024,.066,.15];let J=c===5?34+X*16:c===4?14+X*12:c===6?1.8+X*3.5:c===7?-16:Ae,Ve=1.2+X*3,le=c===4?1:0;const nt=[[.04,.086,.18],[.035,.045,.07],[.04,.09,.2],[.03,.075,.19],[.2,.205,.215],[.07,.14,.27],[.07,.09,.15],[.03,.075,.2]][c],wo=[0,1,.55,.6,1,0,0,0][c],ct=[0,1,2,3,4,0,0,0][c],yo=P+(fe-.5)*1.2,Rt=ct||c===7&&!re?ho(t,f):null;c===5?_("Hour","Heat of the day"):c===4?_("Hour","Afternoon"):c===6?_("Hour","Dawn"):c===7&&_("Hour","Night"),c!==4&&c!==7&&v===1?_("Hour",me("Hour")+", light from the side"):c!==4&&c!==7&&v===2?_("Hour",me("Hour")+", the sun at your back"):c!==4&&c!==7&&v===3&&ne!==3&&_("Hour",me("Hour")+", the sun down the rows"),Fe||_("Sky",["","Storm behind the field","Summer cumulus","After rain","Soft overcast","","Mist in the hollows",re?"Moonrise":"The Milky Way"][c]),A>=4&&_("Standpoint",["","","","","Truly across the rows","From the bank above the road","At the ends of the rows","Where two fields meet"][A]),H===1&&_("Rows",me("Rows")+", over rolling ground"),U>0&&_("Lavender",["","In bud","Going over","A young field","An old field with gaps"][U]),q>=0&&_("Beyond",["Sunflowers across the far field","Pale stubble beyond the rows","Clary sage beyond the rows","A young lavender field beyond","Ripe wheat beyond the rows"][q]),xe.push(["Skyline",["A lone walnut","An old almond","A row of trees","Nothing but the rows"][D]]);for(const a of xe)e.trait(a[0],a[1]);const zt=.35,Tt=a=>{const s=1/(Math.sin(Math.max(a+.9,.15)*Ie)+.022)*(c===6?1.6:1),n=bo.map(u=>Math.exp(-u*s)),o=V(zt-.35,zt+.45,a),i=.14+.86*V(-7,3,a)*(.75+.25*V(3,10,a)),r=V(.5,-5.5,a),l=V(-7,-.5,a)*(.6+.4*V(-.5,4,a));return{sc:n,vis:o,skyL:i,dusk:r,glow:l}},it=P+.44+(N?0:(p()-.5)*.12),Nt=470+(N?0:(p()-.5)*80),O={x:Math.sin(it)*Nt,z:Math.cos(it)*Nt,yaw:it-.2+(p()-.5)*.3},Mt=P+(ne===3?-.17:-.245)+(N?0:(p()-.5)*.1),_e=Math.sin(Mt)*158,We=Math.cos(Mt)*158,Pt=Math.atan2(_e,We)-.02,rt=9*Ie,lt=[Math.sin(Pt)*Math.cos(rt),Math.sin(rt),Math.cos(Pt)*Math.cos(rt)],z=[];z.push([_e,We,13.5,15,0,p()]),!N&&p()<.25&&z.push([_e+24+p()*10,We+4,11,12,0,p()]),z.push([O.x-18,O.z-4,12.5,2.2,1,p()],[O.x-21,O.z-8,10.5,2,1,p()],[O.x+26,O.z+6,15,14,2,p()]);for(let a=-175;a<175;a+=4.6+p()*5.5){if(p()<.2){a+=8+p()*14;continue}z.push([a,-74-p()*2.5,8+p()*7,1.6+p()*1,1,p()])}for(let a=0;a<16;a++){const s=p()*Ze,n=320+p()*1300,o=Math.sin(s)*n,i=Math.cos(s)*n;Math.abs(Math.atan2(o,i)-Math.atan2(_e,We))<.12||z.push([o,i,9+p()*7,9+p()*8,2,p()])}if(D===1)z[0][2]=8.5,z[0][3]=10.5,z[1]&&z[1][4]===0&&(z[1][2]=7.5,z[1][3]=9);else if(D===2){z[0][2]=0,z[1]&&z[1][4]===0&&(z[1][2]=0);for(let a=0;a<4;a++)z.push([_e-22+a*(12+fe*4),We+2+a*1.5,11+ie*3+a%2,9+ze*3,2,X+a*.17])}else D===3&&(z[0][2]=0,z[1]&&z[1][4]===0&&(z[1][2]=0));for(let a=z.length-1;a>=0;a--)z[a][2]===0&&z.splice(a,1);const ft=new Float32Array(96*8);z.slice(0,96).forEach((a,s)=>{ft.set([a[0],a[1],a[2],a[3]],s*8),ft.set([a[4],a[5],0,0],s*8+4)});const Eo=Math.min(96,z.length),pe=[Se===2?1e5:46+Math.floor(p()*8)*b[0],60+p()*40,-230,Se];A===7&&(pe[0]>1e4&&(pe[0]=50+Math.floor(ie*6)*b[0]),pe[1]=-9e3,q>=0?pe[3]=10+[3,2,8,9,7][q]:Se===2&&(pe[3]=13),St=Math.floor((pe[0]-7)/b[0])*b[0]);const Ut=q>=0?95+ze*110:1e4,Ao=Ue===3?P+.14+p()*.14:-99,So=1.9+(p()-.5)*.5,Xe=[Math.cos(P),-Math.sin(P)],h={e:[0,0,0],f:[0,0,1],r:[1,0,0],u:[0,1,0],yaw:P,pitch:Ne},g=new Float32Array(16),gt=()=>{const a=e.view||Zt,s=P+(a.yaw||0),n=ve(Ne+(a.pitch||0),-1.45,1.45),o=[Math.sin(s)*Math.cos(n),Math.sin(n),Math.cos(s)*Math.cos(n)],i=mt([o[2],0,-o[0]]),r=xo(o,i),l=ve(a.x||0,-4,4),u=ve(a.z||0,-4,4),w=St+Xe[0]*l+Math.sin(P)*u,R=at+Xe[1]*l+Math.cos(P)*u,y=Be(w,R)+Math.max(.3,Le+ve(a.y||0,-.9,1.5));h.e=[w,y,R],h.f=o,h.r=i,h.u=r,h.yaw=s,h.pitch=n;const d=1/$e,S=(He+Ce)/(Ce-He),m=2*He*Ce/(Ce-He),F=[i,r,[-o[0],-o[1],-o[2]]],k=F.map(T=>-bt(T,h.e));for(let T=0;T<4;T++){const x=T<3?[F[0][T],F[1][T],F[2][T],0]:[k[0],k[1],k[2],1];g[T*4]=d*x[0],g[T*4+1]=d*x[1],g[T*4+2]=S*x[2]+m*x[3],g[T*4+3]=-x[2]}},Lt=a=>{const s=g[0]*a[0]+g[4]*a[1]+g[8]*a[2]+g[12],n=g[1]*a[0]+g[5]*a[1]+g[9]*a[2]+g[13],o=g[3]*a[0]+g[7]*a[1]+g[11]*a[2]+g[15];return o>.01?[s/o*.5+.5,n/o*.5+.5]:null};gt();const ue=[],Ro=48,L=te(3054),zo=(a,s,n,o)=>{ue.length>=Ro&&ue.shift();const i={p:a.slice(),v:[0,0,0],st:s,tm:1+L()*3,tgt:a.slice(),k:n,b:o,ph:L()*100,home:a.slice()};return ue.push(i),i},Dt=Q?9:14;for(let a=0;a<Dt;a++){const s=h.e[0]+Math.sin(P)*(2.5+L()*4)+Xe[0]*(L()-.5)*4,n=h.e[2]+Math.cos(P)*(2.5+L()*4)+Xe[1]*(L()-.5)*4,o=Ke(s,n,1.5,L);if(o){const i=ge(o.k,o.b,L,!0),r=zo(i,0,o.k,o.b);r.tgt=i.slice()}}const M=new Float32Array(36*4),Ft=new Float32Array(96*12),de=[{o:[0,0],d:[1,0],f:0,a:0,age:99},{o:[0,0],d:[1,0],f:0,a:0,age:99},{o:[0,0],d:[1,0],f:0,a:0,age:99}];let ht=0;const _t=.5+(N?0:(p()-.5)*2),ee={dx:Math.sin(_t),dz:Math.cos(_t),travel:0};let I=null,Wt=0,kt=0,It=-9,To=0,Ct=!1;const Go={s:0},No=(a,s,n,o)=>{const i=Math.hypot(a,s)||1,r=a/i,l=s/i,u=de[ht];ht=(ht+1)%3,u.d=[r,l],u.o=[h.e[0]-r*4,h.e[2]-l*4],u.f=-6,u.a=n,u.age=0,ee.dx+=(r-ee.dx)*.3,ee.dz+=(l-ee.dz)*.3;const w=Math.hypot(ee.dx,ee.dz)||1;ee.dx/=w,ee.dz/=w,e.sound&&e.sound.hit("noise",.2+.3*n,{cutoff:380+300*n,dur:1.6,pan:ve(bt([r,0,l],h.r),-1,1)*.7})},Mo=(a,s)=>{for(let n=ue.length-1;n>=0;n--){const o=ue[n];o.tm-=a,o.ph+=a;let i;if(o.st===2){const d=o.ph*(2.2+n%5*.3)+n;if(i=[o.home[0]+Math.sin(d)*.5,o.home[1]+Math.sin(d*1.7)*.25,o.home[2]+Math.cos(d)*.5],o.tm<0){const S=Ke(o.p[0],o.p[2],7,L);S&&L()<.85?(o.k=S.k,o.b=S.b,o.tgt=ge(S.k,S.b,L,!0),o.st=1):(o.st=3,o.tgt=[o.p[0]+(L()-.5)*30,6,o.p[2]+(L()-.5)*30],o.tm=4)}}else if(o.st===1)i=o.tgt,Math.hypot(o.p[0]-o.tgt[0],o.p[1]-o.tgt[1],o.p[2]-o.tgt[2])<.06&&(o.st=0,o.tm=1.5+L()*4);else if(o.st===0){if(i=[o.tgt[0]+Math.sin(o.ph*3.1)*.02,o.tgt[1]+Math.sin(o.ph*4.3)*.015,o.tgt[2]+Math.cos(o.ph*2.7)*.02],o.tm<0){if(L()<.6&&o.b)o.tgt=ge(o.k,o.b,L,!0);else{const d=Ke(o.p[0],o.p[2],2.5,L);d&&(o.k=d.k,o.b=d.b,o.tgt=ge(d.k,d.b,L,!0))}o.st=1}}else{if(i=o.tgt,o.tm<0&&ue.length>Dt){ue.splice(n,1);continue}if(o.tm<0){o.st=1;const d=Ke(h.e[0]+Math.sin(h.yaw)*4,h.e[2]+Math.cos(h.yaw)*4,3,L);d&&(o.k=d.k,o.b=d.b,o.tgt=ge(d.k,d.b,L,!0))}}const r=o.st===0?6:o.st===2?4:2.5,l=(i[0]-o.p[0])*r-o.v[0]*2.2+Math.sin(o.ph*13+n)*1.2,u=(i[1]-o.p[1])*r-o.v[1]*2.2+Math.sin(o.ph*11+n*2)*.8,w=(i[2]-o.p[2])*r-o.v[2]*2.2+Math.cos(o.ph*12+n)*1.2;o.v[0]+=l*a,o.v[1]+=u*a,o.v[2]+=w*a;const R=Math.hypot(o.v[0],o.v[1],o.v[2]),y=o.st===0?.25:2.4;R>y&&(o.v[0]*=y/R,o.v[1]*=y/R,o.v[2]*=y/R),o.p[0]+=o.v[0]*a,o.p[1]+=o.v[1]*a,o.p[2]+=o.v[2]*a}},Po=(a,s)=>{ee.travel+=a*(1.2+2.5*Ge);for(const n of de)n.age+=a,n.f+=a*7.5,n.a*=Math.exp(-a/7);Mo(a,s)},Ht=a=>{const s=Tt(J),n=c===7,o=(n?Ve:J)*Ie,i=[Math.sin(De)*Math.cos(o),Math.sin(o),Math.cos(De)*Math.cos(o)];n&&(s.sc=re?[.62,.5,.32].map(x=>x*(.6+.4*V(1,12,Ve))):[0,0,0],s.vis=re?1:0,s.glow=0);let r=(n?.45:c===5?3.2:6)*s.vis*(1-.92*le)*(c===6?.7:1),l=[(.07+.035*s.dusk)*s.skyL+.04*s.sc[0]*s.vis,(.098+.007*s.dusk)*s.skyL+.022*s.sc[1]*s.vis,.215*s.skyL+.01*s.vis];c===5?l=[.12,.14,.19]:c===1?l=l.map((x,Y)=>x*[.62,.66,.74][Y]):c===6?l=l.map((x,Y)=>x*[1.25,1.2,1.05][Y]):n&&(l=[.014,.02,.045]),l=l.map(x=>x*1.3),le>0&&(l=l.map((x,Y)=>x+([.21,.215,.225][Y]*s.skyL-x)*le));const u=(1.05+2.1*s.dusk)*(st?.95:1)*(c===5?.78:1)*(n?1.25:1);M.set([h.e[0],h.e[1],h.e[2],$e,h.f[0],h.f[1],h.f[2],2*$e/E,h.r[0],h.r[1],h.r[2],a,h.u[0],h.u[1],h.u[2],u],0),M.set([i[0],i[1],i[2],r,s.sc[0],s.sc[1],s.sc[2],s.dusk,l[0],l[1],l[2],uo],16),M.set(b,28),M.set(G,32),M.set([ee.dx,ee.dz,Ge,ee.travel],36);for(let x=0;x<3;x++){const Y=de[x];M.set([Y.o[0],Y.o[1],Y.f,Y.age<40?Y.a:0],40+x*4)}M.set([de[0].d[0],de[0].d[1],de[1].d[0],de[1].d[1],de[2].d[0],de[2].d[1],he<0?1:0,we],52);const w=Ue===2?2:1;M.set([O.x,O.z,O.yaw,w],60),M.set(pe,64),M.set([$[0],$[1],$[2],0],68),M.set([s.skyL,Math.max(V(3,-2,J),v===2&&J<9?.55:0)*(1-le),po,st],72),M.set([lt[0],lt[1],lt[2],V(-1.5,-4.5,J)*1.2],76),M.set([V(-3.5,-7,J),Q?1:0,Et,ot],80),M.set(g,84);const R=Math.cos(O.yaw),y=Math.sin(O.yaw),d=[-5,2.2,-5.05],S=[O.x+R*d[0]+y*d[2],Be(O.x,O.z)-.4+d[1],O.z-y*d[0]+R*d[2]],m=Lt(S),F=[h.e[0]-S[0],h.e[2]-S[2]],k=-y*F[0]-R*F[1]>0;M.set([m?m[0]:-9,m?m[1]:-9,m&&k?(.35+1.2*s.dusk)*(Q?.6:1):0,Wt%64],100);const T=Lt([h.e[0]+i[0]*1e3,h.e[1]+i[1]*1e3,h.e[2]+i[2]*1e3]);return M.set([T?T[0]:-9,T?T[1]:-9,T?s.vis*(1-s.dusk)*.9:0,0],104),M.set([So,.35,mo,Ao],108),M.set([s.glow*(1-le),(n?s.vis:s.vis*(.4+.6*V(-.5,1.5,J)))*(1-le),5,12,32,30,5,7],112),M.set([wo*(c===4?Math.max(le,.05):1),ct,c===6?.97:0,c===3?1:0],120),M.set([le,n?re?.25:1:0,n?.012:.0047,Ut],124),M.set([nt[0],nt[1],nt[2],q>=0?[3,2,8,9,7][q]:6],128),M.set([wt,U,yo,0],132),M.set([X*40,ie*40,P,c===5?1:0],136),s},qt=a=>{let s=0;const n=(o,i,r,l,u,w,R,y)=>{s>=96||(Ft.set([o[0],o[1],o[2],i,r[0],r[1],r[2],l,u,w,R,y],s*12),s++)};for(const o of ue){const i=Math.hypot(o.v[0],o.v[2]);n(o.p,.03,i>.01?o.v:[1,0,0],0,Math.sin(o.ph*70),0,0,0)}return s},Uo=9,go=13,Lo=21,Do=29,Fo=[[],[]],_o=[new Float64Array(20).fill(NaN),new Float64Array(20).fill(NaN)],Oo=[[0,0,0,0],[0,0,0,0]],Gt=(a,s,n,o,i,r)=>{const l=h.e[0]-ye(h.e[2]),u=Math.floor(l/b[0])-(a>>1),w=Math.floor(h.e[2]/b[3]),R=w-(s>>1),y=Fo[r?0:1],d=_o[r?0:1];let S=d[19]===n;for(let m=0;m<16;m++)d[m]!==g[m]&&(S=!1,d[m]=g[m]);for(let m=0;m<3;m++)d[16+m]!==h.e[m]&&(S=!1,d[16+m]=h.e[m]);if(!S){d[19]=n,y.length=0;let m=0,F=s;const k=h.f[2]/Math.max(.2,Math.hypot(h.f[0],h.f[2]));Math.abs(h.pitch)<1&&(k>.45?m=Math.max(0,(s>>1)-3):k<-.45&&(F=Math.min(s,(s>>1)+4)));const T=b[3],x=g,Y=h.e[0],ko=h.e[2],dt=h.e[1]-1;for(let Ye=m;Ye<F;Ye++){let Me=-1,Bt=-1,Kt=0;for(let Pe=0;Pe<=a;Pe++){let vt=0;if(Pe<a){const Vt=u+Pe,Xt=R+Ye,Yt=Vt+5e4>>>0,jt=(Vt+.5)*b[0];if(!(jt*he<we-.01)){const Io=et(Math.imul(Yt,1973)^Math.imul(Xt+9e5,9277)),ke=(Xt+(Ee(Io)-.5)*.22)*T+Ee(Math.imul(Yt,7919))*T,je=jt+ye(ke),Qe=Math.hypot(je-Y,ke-ko);if(r?Qe<=o+.01:Qe>=o-.01){const Qt=r?1-.7*V(3,o,Qe-.01):1-V(o,i,Qe-.01),Co=x[0]*je+x[4]*dt+x[8]*ke+x[12],Ho=x[1]*je+x[5]*dt+x[9]*ke+x[13],xt=x[3]*je+x[7]*dt+x[11]*ke+x[15];Qt>0&&!(xt<-1.05||Math.abs(Co)>xt*1.15+1.25||Ho>xt*1.1+1.25)&&(vt=Math.min(n,Math.ceil((Qt+1e-4)*n)+1))}}}vt?(Me<0&&(Me=Pe),Bt=Pe,Kt=vt):Me>=0&&(y.push((Ye*a+Me)*n,(Bt-Me)*n+Kt),Me=-1)}}}t.uniform4f(f.P.spk.g0,u,R,a,s);for(let m=0;m<y.length;m+=2)t.uniform4f(f.P.spk.g1,y[m],n,o,i),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,12,y[m+1])},Ot=a=>{t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,C.fbG),t.viewport(0,0,E,E),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.bindBuffer(t.UNIFORM_BUFFER,f.ubo),t.bufferSubData(t.UNIFORM_BUFFER,0,M),t.bindBufferBase(t.UNIFORM_BUFFER,0,f.ubo),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,f.tSt),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,f.tN),t.depthMask(!0),t.clearDepth(1),t.stencilMask(255),t.clearStencil(0),t.clear(t.DEPTH_BUFFER_BIT|t.STENCIL_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthFunc(t.ALWAYS),t.disable(t.BLEND),t.enable(t.STENCIL_TEST),t.stencilFunc(t.ALWAYS,1,255),t.stencilOp(t.KEEP,t.KEEP,t.REPLACE),t.useProgram(f.P.lavM.p),t.bindVertexArray(f.vEmpty),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,C.fb),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,C.tg),t.activeTexture(t.TEXTURE0),t.stencilFunc(t.EQUAL,1,255),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.depthMask(!1),t.useProgram(f.P.lav.p),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(f.P.lav2.p),t.drawArrays(t.TRIANGLES,0,3),t.depthMask(!0),t.stencilFunc(t.EQUAL,0,255),t.useProgram(f.P.main.p),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(f.P.main2.p),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.STENCIL_TEST),t.depthFunc(t.LEQUAL),t.useProgram(f.P.sky.p),t.drawArrays(t.TRIANGLES,0,3),Rt&&(t.enable(t.BLEND),ct?t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE):t.blendFuncSeparate(t.ONE,t.ONE,t.ZERO,t.ONE),t.useProgram(Rt),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.BLEND)),t.depthFunc(t.LESS),t.useProgram(f.P.hou.p),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.enable(t.BLEND),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE),t.depthMask(!1),t.useProgram(f.P.tre.p),t.bindVertexArray(f.qTre.v),t.bindBuffer(t.ARRAY_BUFFER,f.qTre.b),t.bufferSubData(t.ARRAY_BUFFER,0,ft),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,Eo),t.depthMask(!0),t.useProgram(f.P.spk.p),t.bindVertexArray(f.vSpk),Gt(Uo,go,Q?320:960,5,12,!0),Gt(Lo,Do,Q?90:190,5,12,!1),t.depthMask(!1),t.useProgram(f.P.crt.p),t.bindVertexArray(f.qCrt.v),t.bindBuffer(t.ARRAY_BUFFER,f.qCrt.b),t.bufferSubData(t.ARRAY_BUFFER,0,Ft,0,a*12),a&&t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,a),t.depthMask(!0),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,E,E),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.useProgram(f.P.fin.p),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,C.t),t.bindVertexArray(f.vEmpty),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0)},Wo=(a,s)=>{s=ve(s||0,0,.25),Wt++;const n=e.input;if(gt(),n&&n.taps&&n.taps(),n&&n.down){I||(I={x:n.x,y:n.y,t:a,lx:n.x,ly:n.y,mode:0});const r=n.x-I.lx,l=n.y-I.ly;if(I.mode===0&&Math.hypot(n.x-I.x,n.y-I.y)>.025&&(I.mode=1),I.mode===0&&a-I.t>.35&&(I.mode=2),I.mode===1&&s>0){const u=Math.hypot(r,l)/s;if(u>.05&&a-It>.3){const w=mt([h.f[0],0,h.f[2]]);No(h.r[0]*r-w[0]*l,h.r[2]*r-w[2]*l,ve(.5+u*.6,.5,1.6),a),It=a}}I.mode===2&&(To+=s,c===7?Ve=Math.min(35,Ve+s*1.05):c===4?le=Math.max(.1,le-s*.07):c===6?J=Math.min(16,J+s*1.05):J=Math.max(-7.5,J-s*1.05)),I.lx=n.x,I.ly=n.y}else I=null;const o=Tt(J);!Ct&&o.dusk>.45&&(Ct=!0,e.sound&&(e.sound.note(88,{dur:2.5,vel:.06,wave:"sine"}),e.sound.note(95,{dur:2,vel:.03,wave:"sine",at:.4})));let i=s;for(;i>1e-4;){const r=Math.min(i,.016666666666666666);kt+=r,Po(r,kt),i-=r}Ht(a),Ot(qt(a))};return Ht(0),Ot(qt(0)),Wo}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
