// Shipwreck: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/582.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ta){ta&&function(){"use strict";const Ca={yaw:0,pitch:0,x:0,y:0,z:0},he=(n,o,f)=>n<o?o:n>f?f:n,oa=0,At={"0x7b858adc":{gr:"Sea fans"},"0xbea2fff2":{li:"Late gold"},"0x40cd3db8":{sh:"Broken in two",st:"Beside the hull"}},Q=Math.PI*2,aa=52,ft=512,Ua=1536,La=3e3,Zt=320,To=900,Ao=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp usampler2D;
`,Ke=`out vec2 vUV;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUV = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,Xt=`
uniform vec4 uP[${aa}];
uniform sampler2D uN, uC, uV, uM;
#ifdef SIMU
uniform highp usampler2D uS;
#define SS(p) uintBitsToFloat(texelFetch(uS, p, 0))
#else
uniform sampler2D uS;
#define SS(p) texelFetch(uS, p, 0)
#endif
uniform highp usampler2D uG, uSH;
#define CAM uP[0].xyz
#define TANH uP[0].w
#define FW uP[1].xyz
#define SZ uP[1].w
#define RT uP[2].xyz
#define TIME uP[2].w
#define UPV uP[3].xyz
#define SD uP[3].w
#define SUNW uP[4].xyz
#define SUNE uP[4].w
#define SUNC uP[5].rgb
#define AMBE uP[5].w
#define KC uP[6].rgb
#define BS uP[6].w
#define KD uP[7].rgb
#define EXPO uP[7].w
#define WUP uP[8].rgb
#define CAUSK uP[8].w
#define WHOR uP[9].rgb
#define ENC uP[9].w
#define WDEEP uP[10].rgb
#define MODE uP[10].w
#define SE1 uP[11].xyz
#define SU0 uP[11].w
#define SE2 uP[12].xyz
#define SV0 uP[12].w
#define SSC uP[13].xy
#define SMAX uP[13].z
#define SMIN uP[13].w
#define SSZ uP[14].xy
#define CUR vec3(uP[14].z, 0., uP[14].w)
#define LC uP[15].x
#define LS uP[15].y
#define ZS uP[15].z
#define ZB uP[15].w
#define BZ uP[16].x
#define GROW uP[16].y
#define CDEP uP[16].z
#define ZI int(uP[16].w)
#define SIMP uP[32]
#define HOME uP[37].xyz
#define HOMER uP[38].xyz
#define MOFF uP[39].xyz
#define SUNA uP[41].xyz
#define FDEN uP[17].x
float hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return float(x) / 4294967295.; }
vec3 ray(vec2 uv) { vec2 s = (uv * 2. - 1.) * TANH; return normalize(FW + RT * s.x + UPV * s.y); }
vec3 toH(vec3 p) { vec2 w = p.xy - vec2(7., -1.5); return vec3(w.x * LC + w.y * LS, -w.x * LS + w.y * LC, p.z); }
vec3 proj(vec3 p) { vec3 d = p - CAM; return vec3(dot(d, RT), dot(d, UPV), dot(d, FW)); }
vec2 shuv(vec3 p) { return (vec2(dot(p, SE1), dot(p, SE2)) - vec2(SU0, SV0)) * SSC; }
float shv(vec3 p) {
  vec2 uv = shuv(p);
  if (uv.x <= 0. || uv.y <= 0. || uv.x >= 1. || uv.y >= 1.) return 1.;
  return step(uintBitsToFloat(texelFetch(uSH, ivec2(uv * SSZ), 0).x) - .15, dot(p, SUNW));
}
float shp(vec3 p) {
  vec2 uv = shuv(p);
  if (uv.x <= 0. || uv.y <= 0. || uv.x >= 1. || uv.y >= 1.) return 1.;
  vec2 f = uv * SSZ - .5; ivec2 i = ivec2(floor(f)), mx = ivec2(SSZ) - 1; f = fract(f);
  float s = dot(p, SUNW) + .15;
  float a = step(uintBitsToFloat(texelFetch(uSH, clamp(i, ivec2(0), mx), 0).x), s);
  float b = step(uintBitsToFloat(texelFetch(uSH, clamp(i + ivec2(1, 0), ivec2(0), mx), 0).x), s);
  float c = step(uintBitsToFloat(texelFetch(uSH, clamp(i + ivec2(0, 1), ivec2(0), mx), 0).x), s);
  float d = step(uintBitsToFloat(texelFetch(uSH, clamp(i + ivec2(1, 1), ivec2(0), mx), 0).x), s);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
vec3 sunAt(float dep) { return SUNC * exp(-KD * dep / SUNW.y); }
vec2 sunUV(vec3 p, float dep) { return (p.xz + SUNW.xz * dep / SUNW.y) * .125; }
float caus(vec3 p, float dep) {
  float c = textureLod(uC, sunUV(p, dep) * .5, clamp(dep * .09 - .5, 0., 2.6)).r * 4.;
  return mix(1., c, CAUSK * .65 * mix(.5, 1., smoothstep(6., 14., dep)));   // a fine, faint net; fainter still on the high deck
}
float beam(vec3 p, float dep, float lb) {
  vec2 u = sunUV(p, dep);
  float a = textureLod(uC, u * .5, 4.2 + lb).r * 4.;
  float n = textureLod(uN, u * .5 + TIME * vec2(.0031, .0019), lb * .7).r * .62 + textureLod(uN, u * .23 - TIME * vec2(.0017, .0011), lb * .4).g * .38;
  float sh = smoothstep(.44, .7, n);
  return mix(1., (.12 + 2.9 * sh * sh) * mix(1., a, .45), CAUSK);
}
vec3 wbg(vec3 rd) {
  vec3 c = mix(WDEEP, WHOR, smoothstep(-.95, .08, rd.y));
  c = mix(c, WUP, smoothstep(.0, .95, rd.y));
  float m = max(dot(rd, SUNW), 0.);
  c += WUP * (.45 * pow(m, 5.) + .5 * pow(m, 40.)) * SUNE / 3.;
  return c * AMBE;
}
`,_a=`
in vec2 vUV; out uvec4 oG;
bool gNoSand; float gFade, gL;
vec4 nz4(vec2 p) { return textureLod(uN, p, 0.); }
// shading noise at a scale 2^lk: mip-filtered once its cells drop under ~2 px (the far-surface speckle)
vec4 nzl(vec2 p, float lk) { return textureLod(uN, p, max(gL + lk, 0.)); }
float sdBox(vec3 p, vec3 b) { vec3 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.); }
float sdBox2(vec2 p, vec2 b) { vec2 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, q.y), 0.); }
float sdSeg(vec3 p, vec3 a, vec3 b) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * h); }
float hbw(float z, float y) {
  float k = clamp(y / 11.5, 0., 1.), zb = ZB + 3. * k, zs = ZS - 2.2 * k;
  return 6.8 * sqrt(clamp((zb - z) / 18., 0., 1.)) * sqrt(clamp((z - zs) / 5., 0., 1.));
}
float sandH(vec2 x) {
  vec4 a = nz4(x * .011), b = nz4(x * .047 + .31);
  float h = (a.r - .5) * 1.3 + (b.g - .5) * .35;
  float w = dot(x, vec2(.83, .55)) * 9.5 + (a.b - .5) * 18. + (b.a - .5) * 6.;
  // burrow mounds and pits, a cone each with a rim, one per 1.3 m cell; the scour pit the current dug under the stern
  vec2 c = x / 1.3, ci = floor(c);
  vec4 hh = texelFetch(uN, ivec2(ci * vec2(41., 67.) + 5.) & 127, 0);
  float r = length((fract(c) - .5 - (hh.xy - .5) * .5) * 1.3), rr = .1 + .2 * fract(hh.z * 5.3), sg = fract(hh.w * 9.1) < .45 ? -1. : 1.;
  h += (max(1. - r / rr, 0.) * rr * .5 * sg - .05 * sg * rr * smoothstep(rr * 1.6, rr, r) * step(r, rr * 1.6) * step(rr, r)) * step(.62, fract(hh.w * 3.7));
  vec2 sd = x - vec2(6.6, -16.8);
  h -= 1.15 * exp(-dot(sd, sd) * .045);
  return h + .022 * (sin(w) + .35 * sin(2. * w + 1.)) * (.5 + b.r);
}
// where growth stands: thick on the upper strake and the rail where the current and the light reach, round the hold's
// torn rim, the ports and along the plate laps; thinning to bare rust and algae film lower down; patchy everywhere
float coverAt(vec2 u, float y, vec4 b) {
  vec2 bq = vec2(u.x - BZ, y - 7.8);
  float pz = u.x - 2.4 * floor(u.x / 2.4 + .5);
  vec4 a = nz4(u * vec2(.07, .11) + 1.7);
  float c = 1.25 * smoothstep(5.2, 10.9, y) + .75 * exp(-abs(sdBox2(bq, vec2(3., 2.2))) * 1.3) + .4 * smoothstep(.75, .25, length(vec2(pz, y - 9.7)))
    + .25 * smoothstep(.2, 0., abs(fract(y / 1.55) - .5) * 1.55 - .55) + (a.g - .5) * 1.4 + (b.r - .5) * .6 - .5;
  return clamp(c, 0., 1.) * GROW * mix(1., .75, smoothstep(11.2, 11.5, y));
}
vec4 gK;   // the colony the last growth() call found: the shading reads the one the trace stopped on
// colonies on two warped lattices: a coarse one of few big soft-coral bushes and fans (hanging, lobed), a fine one of
// many small sponges and encrusting patches; size and count follow the cover, so they crowd and overlap where it is
// dense and stand few and small where it thins: no row, no repeated spacing
vec4 colony(vec2 u, float cv, vec4 w) {
  vec4 r = vec4(0.);
  u += (w.ga - .5) * vec2(2.2, 1.6);   // the warp shares the cover's finer noise lookup
  for (int i = ZI; i < 2; i++) {
    float cs = i == 0 ? 1.3 : .36;
    vec2 c = (u + float(i) * vec2(.23, .17)) / cs, ci = floor(c);
    vec4 h = texelFetch(uN, ivec2(ci * vec2(37., 59.) + vec2(11. + float(i) * 29., 3. + float(i) * 13.)) & 127, 0);
    float rr = fract(h.z * 7.1), big = float(1 - i);
    float rad = cs * mix(.12 + .4 * rr * rr, .2 + .26 * rr, big) * (.45 + .75 * cv);
    vec2 o = (fract(c) - .5) * cs - (h.xy - .5) * 2. * max(cs * .5 - rad * .5, 0.);
    o.y *= o.y < 0. ? mix(.9, .68, big) : 1.;   // soft corals hang
    float d = length(o) / rad + (nz4(u * mix(2.6, 1.3, big) + h.w * 5.).g - .5) * mix(.7, 1.1, big);
    float k = max(1. - d, 0.) * step(fract(h.x * 11.3), cv * mix(1.05, .7, big) - .04);
    if (k * (1. + .35 * big) > r.x) r = vec4(k, fract(h.w * 13.7), rad, fract(h.y * 7.9) + big * 2.);
  }
  return r;
}
float growth(vec3 q) {
  vec2 u = vec2(q.z, q.y + abs(q.x));
  vec4 b = nz4(u * .29 + 4.1);
  vec4 k = colony(u, coverAt(u, q.y, b) * (1. - .6 * smoothstep(11.1, 11.4, q.y) * smoothstep(5.6, 4.4, abs(q.x))), b);   // the deck's silted middle stays thinner
  gK = k;
  return k.z * .55 * smoothstep(0., .45, k.x) + .01 * nz4(u * .53 + .2).b;
}
#ifdef FORM
// table corals (a per-mint program): flat plates kept level whatever the ship's list, as shelves in tiers up her side
// and as tables on short stalks along the deck edge; each plate lobed at the rim, thicker at its heart, slightly cupped
vec2 forms(vec3 q) {
  float sx = q.x < 0. ? -1. : 1.;
  vec3 a = vec3(abs(q.x), q.y, q.z);
  vec2 up = vec2(LS * sx, LC);
  vec2 r = vec2(1e3, 9.);
  for (int i = ZI; i < 2; i++) {
    bool dk = i == 1;
    vec2 cs = dk ? vec2(3.1, 3.) : vec2(2.5, 1.2), g = vec2(a.z + (dk ? 1.1 : 0.), dk ? a.x : a.y);
    vec2 c = g / cs, ci = floor(c), f = fract(c) - .5;
    vec4 h = texelFetch(uN, ivec2(ci * vec2(43., 71.) + vec2(17. + float(i) * 31. + sx * 13., 9.)) & 127, 0);
    float zc = (ci.x + .5) * cs.x - (dk ? 1.1 : 0.) + (h.x - .5) * .3, cl = nz4(vec2(zc, ci.y * cs.y) * .045 + sx * .3 + 2.9).r;   // they crowd in patches
    float yc, x0, ok, R;
    if (dk) {
      float W = hbw(zc, 11.5);
      R = .6 + .7 * h.w * h.w;
      x0 = (ci.y + .5) * cs.y + (h.y - .5) * .28; yc = 11.5 + .3 + .55 * fract(h.y * 7.3);
      ok = step(h.z, FDEN * (.4 + 1.1 * cl)) * step(x0 + R * .4, W) * step(4.3 + R * .6, abs(zc - BZ)) * step(4.8 + R, abs(zc - uP[17].y));
    } else {
      R = .5 + .6 * h.w;
      yc = (ci.y + .5) * cs.y + (h.y - .5) * .25;
      float W = hbw(zc, yc);
      x0 = W + R * .5;
      ok = step(h.z, FDEN * (.2 + .65 * smoothstep(3.5, 10.5, yc) + .9 * cl - .3)) * step(3.2, yc) * step(yc, 10.9) * step(2.4, W) * step(3.6, abs(zc - BZ));
    }
    vec3 o = a - vec3(x0, yc, zc);
    float oy = dot(o.xy, up), ox = o.x * up.y - o.y * up.x, rr = length(vec2(ox, o.z));
    vec4 e = nz4(vec2(ox, o.z) * .55 + h.zw * 7.);
    float Rr = R * (.8 + .34 * e.r + .08 * e.g), u = clamp(rr / Rr, 0., 1.);
    float d = max(rr - Rr, abs(oy - .16 * R * u * u) - mix(.13, .035, u)) * .8;
    if (dk) d = min(d, max(length(vec2(ox, o.z)) - .07 - .08 * smoothstep(-.1, -.6, oy), max(oy, -(yc - 11.3) - oy)));
    d = d + 9. * (1. - ok);
    float ed = min((.5 - abs(f.x)) * cs.x, (.5 - abs(f.y)) * cs.y) + .12;
    d = min(d, max(ed, .03));
    if (d < r.x) r = vec2(d, 9. + h.z * .9);
  }
  return r;
}
#endif
float hullO(vec3 q) {
  float b = hbw(q.z, q.y);
  vec2 c = vec2(abs(q.x), q.y - 5.75), h = vec2(b, 5.75);
  float r = min(c.y < 0. ? 2.6 : .1, b * .9);
  vec2 d = c - h + r;
  return length(max(d, 0.)) + min(max(d.x, d.y), 0.) - r;
}
vec2 hull(vec3 q) {
  float o = hullO(q);
  if (o > 2.5) return vec2(o - 1.5, 2.);
  float s = abs(o + .15) - .15;
  s = max(s, -sdBox(q - vec3(0., 11.5, BZ), vec3(3.2, .7, 3.4)));
  vec2 bq = vec2(q.z - BZ, q.y - 7.8);
  vec4 jn = nz4(bq * .13 + 3.7);
  float br = sdBox2(bq, vec2(3., 2.2)) + (jn.r - .5) * 1.7 + (jn.g - .5) * .6;
  s = max(s, -max(br, q.x + 4.));
  float pz = q.z - 2.4 * floor(q.z / 2.4 + .5);
  float ph = length(vec2(pz, q.y - 9.7)) - .2 + 9. * (step(abs(q.z - BZ), 5.) + step(q.z, ZS + 8.) + step(ZB - 20., q.z));
  s = max(s, -ph);
  float jg = (nz4(vec2(q.y + q.x, q.y - q.x) * .16 + 5.1).r - .5) * 3.2 + (nz4(vec2(q.y, q.x) * .7 + 2.3).g - .5) * .9;
  float cut = max(uP[40].z - abs(q.z - uP[40].y), uP[40].w - q.z) + jg;   // broken in two (a gap) or the bow alone
  s = max(s, cut);
#ifdef RIBS
  // ribs open to the light (a per-mint program): for a stretch of her length the plating has rusted away above the bilge;
  // the frames stand at an even pitch, thinner upward, and run on across as the deck beams; a few have fallen
  float fz = q.z / 1.15, fi = floor(fz + .5), fh = fract(sin(fi * 91.7) * 4375.5);
  float fr = abs(fz - fi) * 1.15 - mix(.1, .05, smoothstep(2., 11.5, q.y)) + 9. * step(.86, fh) * step(q.y, 9.5 - 5. * fh);
  float opn = max(max(abs(q.z - uP[17].z) - uP[17].w + jg * .55, 1.9 + jg * .3 - q.y), -fr);
  s = max(s, -opn);
#endif
  float g = growth(q);
  float m = 2. + min(g * 2.5, .99);
  s -= g;
#ifdef FORM
  vec2 fo = forms(q);
  fo.x = max(fo.x, cut);   // none in her break's gap (they floated there)
  if (fo.x < s) { s = fo.x; m = fo.y; }
#endif
  float inr = max(min(abs(q.y - 1.3) - .12, abs(abs(q.z - BZ) - 5.) - .12), o + .1);
  inr = min(inr, sdBox(q - vec3(-1.6, 2.5, BZ - 1.8), vec3(1.3, 1.1, 1.5)) - .1);
  inr = min(inr, sdBox(q - vec3(1.8, 2.1, BZ + 1.9), vec3(1.4, .7, 1.6)) - .1);
  return inr < s ? vec2(inr, 4.) : vec2(s, m);
}
float rails(vec3 q) {
  float yy = q.y - 11.5;
  float bd = max(-.4 - yy, yy - 1.4);
  if (bd > .3) return bd;
  float b = hbw(q.z, 11.5) - .2, rx = abs(q.x) - b;
  float ci = floor(q.z / 1.6 + .5), zc = q.z - 1.6 * ci;
  float gap = step(.7, nz4(vec2(ci * .137, .5)).r) * 3.;
  float en = nz4(vec2(q.z * 1.1, q.y * 2.3 + q.x * .7)).g * .026 + nz4(vec2(q.z * 4.3, q.y * 3.9)).b * .012;
  float sag = .25 * smoothstep(.6, .8, nz4(vec2(q.z * .031, 2.7)).r) * sin(fract(q.z / 9.) * 3.14159);
  float st = length(vec3(rx, yy - clamp(yy, 0., 1.05), zc)) - .045 - en + gap;
  float tr = length(vec2(rx, yy - 1.05 + sag)) - .04 - en + 3. * step(.72, nz4(vec2(q.z * .043, 1.3)).g), mr = length(vec2(rx, yy - .55 + sag * .5)) - .03 - en;
  return max(min(st, min(tr, mr)), max(max(ZS + 2. - q.z, q.z - ZB + 4.), max(uP[40].z + 1. - abs(q.z - uP[40].y), uP[40].w + 1.5 - q.z)));
}
float mast(vec3 q, vec4 M) {
  vec3 m = q - vec3(0., 11.5, M.x);
  float h = M.y - 11.5, y = clamp(m.y, 0., h);
  float d = length(vec3(m.x, m.y - y, m.z)) - mix(.27, .15, y / h);
  vec3 c = m - vec3(0., h * .72, 0.);
  d = min(d, length(vec3(c.x - clamp(c.x, -2.4, 2.4), c.y, c.z)) - .09);
  return min(d, sdSeg(m, vec3(0., 2.2, 0.), vec3(.5, .9, (BZ > M.x ? 7. : -7.))) - .14);
}
float debris(vec3 p, vec4 D) {
  vec2 o = p.xz - D.xy;
  float c = cos(D.z), s = sin(D.z);
  vec3 l = vec3(c * o.x + s * o.y, p.y, -s * o.x + c * o.y);
  vec3 lp = l - vec3(0., l.x * .22 + .12 * sin(l.x * 1.7 + l.z) - .02, 0.);
  return D.w < 1.5 ? sdBox(lp, vec3(1.3, .035, .8)) - .02 : abs(length(vec2(l.y - .08, l.z)) - .2) - .025 + max(abs(l.x) - 1.6, 0.);
}
float chead(vec3 p, vec4 H) {
  vec3 o = p - vec3(H.x, .05, H.y);
  vec4 n = nz4(o.xz * .45 + o.y * .3 + H.w * .1);
  // a mound standing a metre or more, domes on top, undercut and narrower where it meets the sand
  float d = length(o * vec3(1., 1.2, 1.)) - H.z * (.7 + .55 * n.r) * (.72 + .28 * smoothstep(-.9, .1, o.y));
  return (d - .05 * nz4((o.xz + o.y) * 2.1).g) * .75;
}
#ifdef HOUSE
// the deckhouse (a per-mint program): decks stepped back like stairs, each a shell of thin plate with its windows and doors
// cut through, the deck above overhanging a walkway on stanchions, rails; l from its foot
float sdR2(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.)) + min(max(q.x, q.y), 0.) - r; }
float rpt(float x, float P, float a, float b) { return x - P * clamp(floor(x / P + .5), a, b); }
float house(vec3 l, vec4 B, float sd) {
  // B: the lower house's half width and half length, the half beam, decks above the lower one * 10 + the height scale.
  // In shallow water she has the lower house and the bridge; in deeper water a middle deck between them.
  float X = B.x, L = B.y, Z3 = L - 2.6, k = fract(B.w) + .001, two = step(15., B.w), yb = mix(2.6, 5.1, two);
  l.y /= k;
  vec3 a = vec3(abs(l.x), l.y, l.z);
  // the shells (abs of a box, less the plate): each one deck, its floor the roof of the one below
  float w = abs(sdBox(l - vec3(0., 1.3, 0.), vec3(X, 1.3, L))) - .07;
  w = min(w, abs(sdBox(l - vec3(0., 3.85, -.3), vec3(X - 1.5, 1.25, L - 1.1))) - .07 + 1e3 * (1. - two));
  w = min(w, abs(sdBox(l - vec3(0., yb + 1.15, .6), vec3(X - 2.3 + 1. - two, 1.15, Z3 - .6))) - .07);
  // openings, each prism cut through the whole house, so the far side's windows line up with the near side's
  float o = sdR2(vec2(rpt(l.z, 1.9, -1., 1.) - .3, a.y - 1.15), vec2(.33, .95), .12);                              // doors, lower deck, both sides
  o = min(o, sdR2(vec2(rpt(l.x, 1.7, -1., 1.), a.y - 1.6), vec2(.3, .32), .12));                                    // lower windows fore and aft
  o = min(o, sdR2(vec2(rpt(l.z + .3, 1.15, -2., 2.), a.y - 3.95), vec2(.3, .42), .1) + 1e3 * (1. - two));           // the middle deck's windows
  o = min(o, sdR2(vec2(rpt(l.x, 1.15, -2., 2.), a.y - 3.95), vec2(.3, .42), .1) + 1e3 * (1. - two));
  o = min(o, sdR2(vec2(rpt(l.z - .6, .95, -1., 1.), a.y - yb - 1.35), vec2(.34, .48), .09));                        // the bridge: a close row all round
  o = min(o, sdR2(vec2(rpt(l.x, .95, -2., 2.), a.y - yb - 1.35), vec2(.34, .48), .09));
  w = max(w, -o);
  // the deck slabs that overhang: the middle deck's roof over the walkway, the bridge top out over its wings
  float s = sdBox(l - vec3(0., 5.12, -.3), vec3(X - .25, .08, L - .5)) + 1e3 * (1. - two);
  s = min(s, sdBox(l - vec3(0., yb + 2.37, .6), vec3(B.z - .4, .08, Z3 - .3)));
  // stanchions under the overhang every 2 m, and the rails: round the lower roof's edge, round the bridge top
  vec2 rc = mix(vec2(X - .45, Z3 - .45), vec2(X - .45, L - .7), two);
  float e2 = abs(sdBox2(l.xz - vec2(0., mix(.6, -.3, two)), rc)), e3 = abs(sdBox2(l.xz - vec2(0., .6), vec2(B.z - .55, Z3 - .45)));
  float st = length(vec2(e2, min(abs(rpt(l.z, 2., -9., 9.)), abs(rpt(l.x, 2., -9., 9.))))) - .055;
  st = max(st, abs(a.y - 3.86) - 1.2);
  st = max(st, abs(a.y - (2.6 + yb + 2.3) * .5) - (yb - .3) * .5);
  float rl = min(length(vec2(e2 - .1, a.y - 3.62)) - .035, length(vec2(e3, a.y - yb - 3.4)) - .035);
  rl = min(rl, max(length(vec2(e3, min(abs(rpt(l.z, 1.5, -9., 9.)), abs(rpt(l.x, 1.5, -9., 9.))))) - .03, abs(a.y - yb - 2.93) - .5));
  // the stump of the signal mast on the bridge top, and a ventilator pipe aft
  float m = max(length(l.xz - vec2(0., 1.)) - .16 + .05 * smoothstep(yb + 2.4, yb + 5.3, a.y), abs(a.y - yb - 3.9) - 1.5);
  m = min(m, max(length(vec2(a.x - 1.2, l.z + L - 1.3)) - .22, abs(a.y - 3.3) - .7));
  return min(min(w, s), min(min(st, rl), m)) * k;
}
#endif
// the ship's other parts (house, bridge, funnel, deck gear, rudder, shaft, screw): one rolled loop over a small table
uniform highp sampler2D uK;
vec2 parts(vec3 p, vec3 q) {
  vec2 r = vec2(1e3, 8.);
  int n = int(uP[40].x), i0 = sdBox(q - uP[42].xyz, uP[51].xyz) > .6 ? int(uP[42].w) : 0;
  for (int i = i0 + ZI; i < n; i++) {
    vec4 A = texelFetch(uK, ivec2(0, i), 0);
    vec3 l = q - A.xyz;
    float ty = floor(A.w + .01), d = length(l) - texelFetch(uK, ivec2(2, i), 0).x, m = 8. + fract(A.w + .01) * .9;
    if (d < .5) {
      vec4 B = texelFetch(uK, ivec2(1, i), 0);
      if (ty < 1.5) d = sdBox(l, B.xyz - B.w) - B.w;
      else if (ty < 2.5) { l.z += l.y * B.w; d = max((length(l.xz / B.xz) - 1.) * min(B.x, B.z), abs(l.y) - B.y);
#ifdef HOUSE
        if (abs(A.w - 2.3) < .05) {   // the funnel: a hollow oval, its rim eaten ragged, a steam pipe up its fore side
          float fr = .5 + .25 * sin(l.x * 7.3 + l.z * 2.1) + .25 * sin(l.z * 9.7 - l.x * 3.3 + 1.7);   // the rim eaten ragged
          d = max(abs((length(l.xz / B.xz) - 1.) * min(B.x, B.z)) - .06, l.y - B.y + .75 * fr * fr);
          d = max(d, -l.y - B.y);
          d = min(d, max(length(vec2(l.x - .35, l.z - B.z - .14)) - .09, abs(l.y - .3) - B.y));
        }
#endif
      }
      else if (ty < 3.5) d = max(length(l.yz) - B.y, abs(l.x) - B.x);
      else if (ty < 4.5) d = max(length(l.xy) - B.x, abs(l.z) - B.z);
      else if (ty < 5.5) {
        vec2 f = abs(l.xy); f = f.y > f.x ? f.yx : f;
        float bl = (length(vec3((f.x - B.x * .55) / (B.x * .47), f.y / B.y, (l.z + (f.y - .2) * .45) / B.z)) - 1.) * B.z;
        d = min(bl, length(l * vec3(1., 1., .7)) - B.x * .2);
      }
      else if (ty < 6.5) { d = mast(q, B); m = 5.; }
      else if (ty < 7.5) { d = debris(p, B); m = 6.; }
#ifdef HOUSE
      else if (ty > 8.5) d = house(l + vec3(0., 4.3, 0.), B, A.z);
#endif
      else { d = chead(p, B); m = 7.; }
    }
    if (d < r.x) r = vec2(d, m);
  }
  return r;
}
vec2 scene(vec3 p) {
  vec2 r = vec2(1e3, 0.);
  if (!gNoSand) r = vec2((p.y - sandH(p.xz)) * .8, 1.);
  vec3 q = toH(p);
  vec2 h = hull(q);
  h.x *= .85;
  if (h.x < r.x) r = h;
  float d = rails(q);
  if (d < r.x) r = vec2(d, 5.);
  vec2 k = parts(p, q);   // the house, gear, rudder and screw, the masts, the debris and the coral heads: one loop
  if (k.x < r.x) r = k;
  if (uP[19].w > .5) { d = sdSeg(p, uP[19].xyz, uP[20].xyz) - .24; if (d < r.x) r = vec2(d, 5.); }
  return r;
}
vec2 octE(vec3 n) {
  n /= abs(n.x) + abs(n.y) + abs(n.z);
  return n.z >= 0. ? n.xy : (1. - abs(n.yx)) * vec2(n.x >= 0. ? 1. : -1., n.y >= 0. ? 1. : -1.);
}
void main() {
  bool shd = MODE > .5;
  vec3 ro, rd; float tmax, e0, e1, t;
  if (shd) {
    // sun shadow map: from above the wreck, down along the sun, to the first surface
    gNoSand = true;
    vec2 uv = gl_FragCoord.xy / SSZ;
    ro = SE1 * (SU0 + uv.x / SSC.x) + SE2 * (SV0 + uv.y / SSC.y) + SUNW * SMAX; rd = -SUNW;
    tmax = SMAX - SMIN; e0 = .02; e1 = 0.; t = 0.;
  } else {
    gNoSand = false;
    ro = CAM; rd = ray(vUV);
    tmax = 80.; if (rd.y > 0.) tmax = min(tmax, (SD - CAM.y) / rd.y);
    e0 = .0012; e1 = .0006; t = .05;
  }
  vec2 h = vec2(0.); bool hit = false; vec4 kH = vec4(0.);
  vec3 p = ro, n = vec3(0.);
  float e = 0., ao = 0.;
  int ph = 0;
  for (int i = ZI; i < 212; i++) {
    vec3 k = ph == 1 ? vec3(1., -1., -1.) : ph == 2 ? vec3(-1., -1., 1.) : ph == 3 ? vec3(-1., 1., -1.) : vec3(1.);
    float hh = .06 + .2 * float((ph - 5) * (ph - 5));
    vec2 r = scene(ph == 0 ? ro + rd * t : ph < 5 ? p + k * e : p + n * hh);
    if (ph == 0) {
      if (r.x < e0 + e1 * t) {
        hit = true; h = r; kH = gK;
        if (shd) break;
        p = ro + rd * t; e = .0012 + .0006 * t; ph = 1;
        continue;
      }
      t += shd ? max(r.x, .025) : r.x;
      if (t > tmax) break;
    } else {
      if (ph < 5) n += k * r.x; else ao += max(hh - r.x, 0.) / hh * (1. - .18 * float(ph - 5));
      if (ph == 4) n = normalize(n);
      ph++;
      if (ph > 8) break;
    }
  }
  if (shd) { oG = uvec4(floatBitsToUint(hit ? SMAX - t : -1e4), 0u, 0u, 0u); return; }
  if (!hit) { oG = uvec4(floatBitsToUint(1e4), 0u, 0u, 0u); return; }
  ao = clamp(1. - ao * .38, 0., 1.);
  vec3 qa = toH(p);
#ifdef RIBS
  if (hullO(qa) < -.25 && abs(qa.z - uP[17].z) > uP[17].w + .8) ao *= .22;   // inside her, but the open stretch is lit
#else
  if (hullO(qa) < -.25) ao *= .22;
#endif
  float fm = floor(h.y + .001), gr = h.y - fm;
  // to the shading pass: t, the normal, ao, the growth and the material, the colony (its noise texel, lattice and strength)
  vec2 oc = octE(n) * .5 + .5;
  uint ox = uint(oc.x * 8388607. + .5), oy = uint(oc.y * 8388607. + .5);
  // to the shading pass: t and ao exact, the normal in 2 x 23 bits, the material; the growth is found again there
  oG = uvec4(floatBitsToUint(t), floatBitsToUint(ao), ox | (oy << 23u), (oy >> 9u) | (uint(fm) << 14u) | (fm > 7.5 ? uint(gr * 16383. + .5) << 18u : 0u));
}`,Ia=`
in vec2 vUV; out uvec4 oG;
bool gNoSand; float gFade, gL;
vec4 nz4(vec2 p) { return textureLod(uN, p, 0.); }
// shading noise at a scale 2^lk: mip-filtered once its cells drop under ~2 px (the far-surface speckle)
vec4 nzl(vec2 p, float lk) { return textureLod(uN, p, max(gL + lk, 0.)); }
float sdBox2(vec2 p, vec2 b) { vec2 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, q.y), 0.); }
float hbw(float z, float y) {
  float k = clamp(y / 11.5, 0., 1.), zb = ZB + 3. * k, zs = ZS - 2.2 * k;
  return 6.8 * sqrt(clamp((zb - z) / 18., 0., 1.)) * sqrt(clamp((z - zs) / 5., 0., 1.));
}
float coverAt(vec2 u, float y, vec4 b) {
  vec2 bq = vec2(u.x - BZ, y - 7.8);
  float pz = u.x - 2.4 * floor(u.x / 2.4 + .5);
  vec4 a = nz4(u * vec2(.07, .11) + 1.7);
  float c = 1.25 * smoothstep(5.2, 10.9, y) + .75 * exp(-abs(sdBox2(bq, vec2(3., 2.2))) * 1.3) + .4 * smoothstep(.75, .25, length(vec2(pz, y - 9.7)))
    + .25 * smoothstep(.2, 0., abs(fract(y / 1.55) - .5) * 1.55 - .55) + (a.g - .5) * 1.4 + (b.r - .5) * .6 - .5;
  return clamp(c, 0., 1.) * GROW * mix(1., .75, smoothstep(11.2, 11.5, y));
}
vec4 gK;   // the colony the last growth() call found: the shading reads the one the trace stopped on
// colonies on two warped lattices: a coarse one of few big soft-coral bushes and fans (hanging, lobed), a fine one of
// many small sponges and encrusting patches; size and count follow the cover, so they crowd and overlap where it is
// dense and stand few and small where it thins: no row, no repeated spacing
vec4 colony(vec2 u, float cv, vec4 w) {
  vec4 r = vec4(0.);
  u += (w.ga - .5) * vec2(2.2, 1.6);   // the warp shares the cover's finer noise lookup
  for (int i = ZI; i < 2; i++) {
    float cs = i == 0 ? 1.3 : .36;
    vec2 c = (u + float(i) * vec2(.23, .17)) / cs, ci = floor(c);
    vec4 h = texelFetch(uN, ivec2(ci * vec2(37., 59.) + vec2(11. + float(i) * 29., 3. + float(i) * 13.)) & 127, 0);
    float rr = fract(h.z * 7.1), big = float(1 - i);
    float rad = cs * mix(.12 + .4 * rr * rr, .2 + .26 * rr, big) * (.45 + .75 * cv);
    vec2 o = (fract(c) - .5) * cs - (h.xy - .5) * 2. * max(cs * .5 - rad * .5, 0.);
    o.y *= o.y < 0. ? mix(.9, .68, big) : 1.;   // soft corals hang
    float d = length(o) / rad + (nz4(u * mix(2.6, 1.3, big) + h.w * 5.).g - .5) * mix(.7, 1.1, big);
    float k = max(1. - d, 0.) * step(fract(h.x * 11.3), cv * mix(1.05, .7, big) - .04);
    if (k * (1. + .35 * big) > r.x) r = vec4(k, fract(h.w * 13.7), rad, fract(h.y * 7.9) + big * 2.);
  }
  return r;
}
float growth(vec3 q) {
  vec2 u = vec2(q.z, q.y + abs(q.x));
  vec4 b = nz4(u * .29 + 4.1);
  vec4 k = colony(u, coverAt(u, q.y, b) * (1. - .6 * smoothstep(11.1, 11.4, q.y) * smoothstep(5.6, 4.4, abs(q.x))), b);   // the deck's silted middle stays thinner
  gK = k;
  return k.z * .55 * smoothstep(0., .45, k.x) + .01 * nz4(u * .53 + .2).b;
}
float hs1(float x) { return fract(sin(x * 127.1 + 3.7) * 43758.5453); }
float plateH(vec2 u) {
  float sy = u.y / 1.55, iy = floor(sy), fy = fract(sy);
  float fz = fract((u.x + hs1(iy) * 5.4) / 5.4);
  float ey = min(fy, 1. - fy) * 1.55, ez = min(fz, 1. - fz) * 5.4;
  float h = fy * .011 - (.005 * (1. - smoothstep(0., .014, ey)) + .004 * (1. - smoothstep(0., .012, ez))) * (.3 + .7 * gFade);
  float rz = (fract(u.x / .09) - .5) * .09, ry = min(abs(ey - .045), abs(ey - .105));
  h += .006 * gFade * smoothstep(.015, .006, length(vec2(rz, ry)));
  float ryz = (fract(u.y / .09) - .5) * .09;
  h += .006 * gFade * smoothstep(.015, .006, length(vec2(abs(ez - .05), ryz)));
  return h + .003 * nz4(u * 1.9).b;
}
uint pk8(vec4 v) { uvec4 u = uvec4(clamp(v, 0., 1.) * 255. + .5); return u.x | (u.y << 8u) | (u.z << 16u) | (u.w << 24u); }
vec3 palette(float h) { return h < .28 ? uP[28].rgb : h < .5 ? uP[29].rgb : h < .74 ? uP[30].rgb : uP[31].rgb; }
vec2 octE(vec3 n) {
  n /= abs(n.x) + abs(n.y) + abs(n.z);
  return n.z >= 0. ? n.xy : (1. - abs(n.yx)) * vec2(n.x >= 0. ? 1. : -1., n.y >= 0. ? 1. : -1.);
}
vec3 octD(vec2 e) {
  vec3 n = vec3(e, 1. - abs(e.x) - abs(e.y));
  if (n.z < 0.) n.xy = (1. - abs(n.yx)) * vec2(n.x >= 0. ? 1. : -1., n.y >= 0. ? 1. : -1.);
  return normalize(n);
}
void main() {
  uvec4 T = texelFetch(uG, ivec2(gl_FragCoord.xy) - ivec2(0, int(uP[33].x)), 0);   // the band's row in the scratch
  float t = uintBitsToFloat(T.x);
  if (t > 1e3) { oG = uvec4(T.x, 0u, 0u, 0u); return; }
  vec3 rd = ray(vUV), p = CAM + rd * t, n = octD(vec2(float(T.z & 8388607u), float((T.z >> 23u) | ((T.w & 16383u) << 9u))) / 8388607. * 2. - 1.);
  float ao = uintBitsToFloat(T.y), fm = float((T.w >> 14u) & 15u), gr = float(T.w >> 18u) / 16383., tr = 0.;
  vec4 kH = vec4(0.);
  if (fm > 1.5 && fm < 2.5) {
    // the growth the trace stopped on, found again at the same point (the same arithmetic as hull())
    float m = 2. + min(growth(toH(p)) * 2.5, .99);
    gr = m - floor(m + .001); kH = gK;
  }
  float fp = t * 2. * TANH / SZ;
  gFade = smoothstep(.006, .002, fp);
  gL = log2(fp * inversesqrt(max(abs(dot(n, rd)), .1)) * 128.) - 2.;
  vec3 q = toH(p);
  vec3 alb;
  vec4 nA = nz4(p.xz * .07 + p.y * .05), nB = nzl(vec2(q.z, q.y) * .9 + q.x * .1, -.15), nC = nzl(vec2(q.z, q.y + q.x) * 3.1, 1.63);
#ifdef FORM
  if (fm > 8.5) {
    // table coral, matt: the top a close mat of branch tips (fine relief, fading with the footprint), the lobed rim paler
    // where the young tips are, the underside dark brown and shaded; four tones, cream, tan, dull lilac and olive
    vec4 bt = nzl(p.xz * 5.3 + gr * 9., 1.1), b2 = nzl(p.xz * 17. + gr * 5., 2.8);
    vec3 c0 = gr < .25 ? vec3(.5, .46, .32) : gr < .5 ? vec3(.46, .34, .2) : gr < .7 ? vec3(.4, .34, .38) : vec3(.34, .36, .22);
    float top = smoothstep(.25, .75, n.y), und = smoothstep(-.15, -.65, n.y), rim = clamp(1. - top - und, 0., 1.);
    alb = c0 * (.68 + .55 * bt.r) * (.8 + .4 * b2.g);
    alb = mix(alb, c0 * 1.3 + vec3(.05, .05, .04), rim * .7);
    alb = mix(alb, c0 * vec3(.42, .36, .3), und * .85);
    n = normalize(n + vec3(b2.r - .5, 0., b2.b - .5) * .9 * top * gFade);
    ao *= (.72 + .28 * smoothstep(.3, .7, b2.a)) * mix(1., .6, und);
  } else
#endif
  if (fm < 1.5) {
    vec4 c = nzl(p.xz * 3.7, 1.89);
    alb = vec3(.66, .62, .53) * (.8 + .3 * nA.r) * (.86 + .28 * nzl(p.xz * .9, -.15).g);
    alb = mix(alb, vec3(.28, .25, .2), smoothstep(.64, .8, c.b) * .6);
    alb = mix(alb, vec3(.92, .9, .84), smoothstep(.72, .86, c.a) * .5);
    float sc = smoothstep(4., .5, -q.x - hbw(q.z, 2.) + .5);
    alb = mix(alb, alb * vec3(.55, .5, .45), sc * .6);
  } else if (fm < 2.5 || fm > 7.5) {
    float lk = fm > 7.5 ? gr : 0.;
    if (fm > 7.5) gr = 0.;
    // the plate laps and the polyp relief: three taps each, from one call site apiece (each call site compiles again on D3D)
    vec2 uu = vec2(q.z, q.y + abs(q.x)) * 4.7;
    vec3 hv = vec3(0.), pv = vec3(0.);
    for (int i = ZI; i < 3; i++) {
      vec2 o = vec2(i == 1 ? 1. : 0., i == 2 ? 1. : 0.);
      float a = plateH(vec2(q.z, q.y) + o * .005), b = nzl(uu + o * .004, 2.23).r;
      if (i == 0) { hv.x = a; pv.x = b; } else if (i == 1) { hv.y = a; pv.y = b; } else { hv.z = a; pv.z = b; }
    }
#ifdef HOUSE
    if (lk < .05 || lk > .35)   // the stepped house and its funnel are thin plate, not the hull's lapped strakes
#endif
    if (gr < .3) n = normalize(n - ((hv.y - hv.x) * vec3(0., 0., 1.) + (hv.z - hv.x) * vec3(-LS, LC, 0.)) / .005 * (1. - gr * 3.));
    vec3 c;
    {
      // bare plating: each plate its own tone, rust running down from the laps, seams drawn no thinner than a pixel
      bool dk = -n.x * LS + n.y * LC > .7;   // the deck: plates run across it
      float sy = (dk ? q.x + 20. : q.y) / 1.55, iy = floor(sy), fy = fract(sy), fz = fract((q.z + hs1(iy) * 5.4) / 5.4), iz = floor((q.z + hs1(iy) * 5.4) / 5.4);
      float pt = hs1(iy * 7.13 + iz * 3.71 + 1.3);
      float ey = min(fy, 1. - fy) * 1.55, ez = min(fz, 1. - fz) * 5.4, w = max(fp * 1.5, .02);
      float seam = (1. - smoothstep(0., w, ey)) * min(.02 / w, 1.) + (1. - smoothstep(0., w, ez)) * min(.02 / w, 1.) * .7;
      vec4 sr = nzl(vec2(q.z * .8, q.y * .05 + iy * .37), -.32);
      float run = dk ? 0. : smoothstep(.44, .66, sr.r) * exp(-(1. - fy) * 1.55 * 1.2);
      c = mix(vec3(.09, .068, .055), vec3(.2, .12, .07), nA.g);
      c = mix(c, vec3(.3, .16, .21), smoothstep(.55, .75, nB.g) * .5);
      c *= (.8 + .4 * nC.b) * (.78 + .44 * pt) * 1.7;
      c = mix(c, vec3(.54, .22, .09), clamp(smoothstep(.7, .95, pt) * .35, 0., .85));
      c = mix(c, vec3(.34, .17, .085), clamp(run, 0., .8));
      c *= 1. - .55 * min(seam, 1.);
      c = mix(c, vec3(.24, .22, .18) * (.75 + .5 * nC.g), smoothstep(.45, .92, n.y) * .7);   // silt on what faces up
    }
    vec2 u = vec2(q.z, q.y + abs(q.x));
    vec4 kc = kH;   // the colony the trace stopped on (no second colony() call site)
    float kb = step(1.5, kc.w), kv = fract(kc.w * 17.3);
    vec3 pc = palette(kc.y) * (.7 + .65 * smoothstep(.25, .8, pv.x)) * (.8 + .45 * kc.x) * (.75 + .45 * kv);
    pc = max(mix(vec3(dot(pc, vec3(.3, .5, .2))), pc, 1.3), 0.);
    pc = mix(pc, mix(vec3(.42, .2, .12), vec3(.36, .3, .26), kv) * (.8 + .4 * pv.x), (1. - kb) * step(.62, fract(kc.y * 5.3)) * .75);   // some small ones dull sponge and crust
    float cg = smoothstep(.1, .45, gr);
    if (cg > 0.) {
      n = normalize(n - ((pv.y - pv.x) * vec3(0., 0., 1.) + (pv.z - pv.x) * vec3(-LS, LC, 0.)) * 90. * cg * (.4 + .6 * gFade) * min(1., .01 / fp));   // polyp relief fades with the footprint
      ao *= mix(1., .55 + .45 * smoothstep(.3, .75, pv.x), cg);
    }
    alb = mix(c, pc, cg);
    tr = cg * .8;
    if (lk > .05) {
      // the house and gear: a row of ports, the bridge's band of windows, the funnel's sooted top, iron, a bronze screw
      vec3 nh = vec3(n.x * LC + n.y * LS, -n.x * LS + n.y * LC, n.z);
      float u = abs(nh.x) > .6 ? q.z : q.x;
#ifdef HOUSE
      if (lk < .15) {
        // thin plate between stiffeners every 70 cm, each panel its own rust; rust run down from the openings' heads; silt on top
        float pu = u / .7, pf = fract(pu), pt2 = hs1(floor(pu) * 3.1 + floor(q.y / 2.6) * 7.7);
        alb = mix(vec3(.1, .075, .06), vec3(.21, .135, .085), pt2 * .6 + nB.r * .4) * (.8 + .4 * nC.b) * 1.45;
        alb = mix(alb, vec3(.3, .16, .08), smoothstep(.55, .8, nB.b) * .45 * step(abs(nh.y), .5));
        alb *= 1. - .22 * (1. - smoothstep(0., max(fp * 1.5, .04), min(pf, 1. - pf) * .7)) * step(abs(nh.y), .5);
        alb = mix(alb, vec3(.24, .22, .18) * (.75 + .5 * nC.g), smoothstep(.45, .92, n.y) * .75);
      } else
#endif
      if (lk < .25) {
        float rs = nzl(vec2(u * 2.3, q.y * .1 + u * .03), .4).r;
        alb = mix(alb, vec3(.34, .17, .08), smoothstep(.56, .82, rs) * .6 * step(abs(nh.y), .5));
        alb *= .62 + .5 * smoothstep(11.5, 13.5, q.y) * (.7 + .6 * nC.r);
      }
#ifndef HOUSE
      if (lk < .15) alb *= mix(1., .07, smoothstep(.25, .19, length(vec2((fract(u / 1.7) - .5) * 1.7, q.y - uP[43].y))) * step(abs(nh.y), .5));
      else if (lk < .25) { float wb = step(abs(q.y - uP[43].x), .4) * step(.2, abs(fract(u / 1.25) - .5) * 1.25) * step(abs(nh.y), .5); alb *= 1. - .93 * wb; ao *= 1. - .6 * wb; }
      else
#else
      if (lk < .25) {} else
#endif
      if (lk < .35) alb = mix(alb, vec3(.04, .035, .03), smoothstep(uP[43].z - .25, uP[43].z, q.y));
      else if (lk < .45) alb *= .62;
      else if (lk < .55) alb = mix(vec3(.17, .24, .17), vec3(.4, .29, .14), smoothstep(.35, .7, nC.g)) * (.8 + .4 * nB.r);
    }
  } else if (fm < 4.5) {
    alb = vec3(.07, .055, .045) * (.7 + .6 * nC.b);
  } else if (fm < 5.5) {
    alb = vec3(.15, .12, .1) * (.6 + .8 * nC.g);
#ifdef HOUSE
    float pp = smoothstep(.58, .78, nz4(p.xz * .19 + p.y * .23).r) * (.6 + .4 * nC.g);   // growth in patches, not confetti
#else
    float pp = smoothstep(.62, .8, nz4(p.xz * .7 + p.y * .9).r);
#endif
    alb = mix(alb, palette(nz4(p.xz * .2 + p.y * .3).a), pp * .8);
    tr = pp * .5;
  } else if (fm < 6.5) {
    alb = mix(vec3(.12, .07, .045), vec3(.26, .2, .14), nzl(p.xz * 1.3, .38).g) * (.7 + .5 * nzl(p.xz * 4., 2.).b);
    alb = mix(alb, vec3(.42, .38, .3), smoothstep(.5, .95, n.y) * .6);
  } else {
    vec4 a = nz4(p.xz * 1.7 + p.y * .8);
    float r = sin((a.r + a.g) * 42.) * smoothstep(.012, .004, fp);   // ridges ~1 cm: fade once under a pixel
    alb = mix(vec3(.38, .36, .26), vec3(.6, .52, .38), .5 + .5 * r) * (.8 + .4 * a.b);
    alb = mix(alb, uP[30].rgb * .8, smoothstep(.7, .85, a.a) * .6);
  }
  uint w = uint(fm) | (uint(clamp(tr, 0., 1.) * 255.) << 8u);
  oG = uvec4(floatBitsToUint(t), packSnorm2x16(octE(n)), pk8(vec4(sqrt(clamp(alb, 0., 1.)), ao)), w);
}`,Da=`
in vec2 vUV; out vec4 oC;
void main() {
  vec2 x = vUV * 16.;
  vec3 H = vec3(0.);
#define WV(i) { vec4 w = uP[i]; float s = sin(dot(w.xy, x) + w.w); H -= w.z * s * vec3(w.x * w.x, w.y * w.y, w.x * w.y); }
  WV(44) WV(45) WV(46) WV(47) WV(48) WV(49) WV(50)
  float al = CDEP;
  float det = (1. - al * H.x) * (1. - al * H.y) - al * al * H.z * H.z;
  oC = vec4(min(1. / max(abs(det), .07), 3.95) * .25, 0., 0., 1.);
}`,Ha=`
in vec2 vUV; out vec4 oC;
void main() {
  float tg = uintBitsToFloat(texelFetch(uG, min(ivec2(gl_FragCoord.xy) * 2, ivec2(SZ * 2.) - 1), 0).x);
  vec3 rd = ray(vUV);
  float tm = min(tg, 60.);
  if (rd.y > 0.) tm = min(tm, (SD - CAM.y) / rd.y);
  // a fresh unpatterned offset every frame, averaged in this view's own history target (blended), so no weave, no grain
  float j = hsh(uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u + uint(uP[51].w) * 26699u + 7u);
  vec2 sk = 2. / (SSC * SSZ);   // two shadow-map texels, in metres
  float mu = dot(rd, SUNW);
  float ph = .55 * (1. - .64) / pow(1. + .64 - 1.6 * mu, 1.5) + .45 * .3;
  vec3 acc = vec3(0.);
  float N = 24., tp = 0.;   // 24 steps: the history averages the frames, so fewer per frame give the same beams
  for (int i = ZI; i < 24; i++) {
    float u = (float(i) + j) / N, t = tm * u * u * (1.6 - .6 * u);
    float dt = t - tp; tp = t;
    vec3 p = CAM + rd * t;
    float dep = SD - p.y;
    if (dep < 0.) break;
    vec2 o = fract(vec2(j * 7.31 + float(i) * .618, j * 3.17 + float(i) * .382)) - .5;   // a soft shadow edge, not texel stairs
    acc += sunAt(dep) * shv(p + SE1 * o.x * sk.x + SE2 * o.y * sk.y) * beam(p, dep, min(t * .03, 1.2)) * exp(-KC * t) * dt;
  }
  oC = vec4(acc * ph * BS * SUNE * ENC, 1.);
}`,Va=`
in vec2 vUV; out vec4 oC;
vec3 octD(vec2 o) { vec3 n = vec3(o, 1. - abs(o.x) - abs(o.y)); float t = max(-n.z, 0.); n.x += n.x >= 0. ? -t : t; n.y += n.y >= 0. ? -t : t; return normalize(n); }
void main() {
  uvec4 g = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
  float t = uintBitsToFloat(g.x);
  vec3 rd = ray(vUV);
  vec3 bg = wbg(rd), col;
  if (t < 1e3) {
    vec3 p = CAM + rd * t;
    vec3 n = octD(unpackSnorm2x16(g.y));
    vec4 a4 = vec4(uvec4(g.z, g.z >> 8u, g.z >> 16u, g.z >> 24u) & 255u) / 255.;
    vec3 alb = a4.rgb * a4.rgb;
    float ao = a4.a, tr = float((g.w >> 8u) & 255u) / 255.;
    float dep = max(SD - p.y, 0.);
    vec3 sl = sunAt(dep) * SUNE;
    float vis = shp(p), ndl = dot(n, SUNW);
    vec3 amb = sunAt(dep * 1.05) * AMBE * (vec3(.2, .3, .36) * (.6 + .4 * n.y) + vec3(.14, .14, .12) * max(-n.y, 0.))
      + sunAt(dep) * (SUNE * SUNW.y * vec3(.12, .14, .14) * (.5 - .5 * n.y) + uP[41].w * vec3(.3, .4, .44) * (.62 + .38 * n.y));   // light thrown back up off the white sand; overcast: the bright ceiling
    vec3 L = alb * (amb * ao * (1. + tr * .4) + sl * vis * mix(1., caus(p, dep), .45 + .55 * abs(n.y)) * (max(ndl, 0.) + tr * (.35 * max(-ndl, 0.) + .12)) * mix(1., ao, .5));
    vec3 T = exp(-KC * t);
    col = L * T + bg * (1. - T);
  } else if (rd.y > 0.) {
    float ts = (SD - CAM.y) / rd.y;
    vec3 ps = CAM + rd * ts;
    vec2 su = ps.xz * .16;
    vec4 a = textureLod(uN, su + TIME * vec2(.006, .004), 0.), b = textureLod(uN, su * 2.7 - TIME * vec2(.004, .011), 0.);
    float rk = exp(-ts * .045);
    vec3 n = normalize(vec3(((a.r - .5) * .22 + (b.g - .5) * .16) * rk, 1., ((a.g - .5) * .22 + (b.r - .5) * .16) * rk));
    vec3 rr = refract(rd, -n, 1.333), sc;
    float wf = smoothstep(.6, .76, dot(rd, n));
    vec3 refl = WDEEP * 1.4 + WHOR * .5;
    if (dot(rr, rr) < .5) sc = refl;   // past the critical angle; F below reaches 1 there, so the window's edge is continuous
    else {
      rr = normalize(rr);
      float c = clamp(dot(rd, n), 0., 1.), F = .02 + .98 * pow(1. - c, 5.);
      F = max(F, smoothstep(.78, .662, c));
      vec3 sky = mix(vec3(.45, .66, 1.), vec3(.85, .93, 1.), rr.y) * 2.4 * mix(1., .55, 1. - AMBE);
      float m = max(dot(rr, SUNA), 0.);
      sky += SUNC * SUNE * (pow(m, 900.) * 40. + pow(m, 30.) * 1.4);
      sc = mix(refl, mix(sky, refl, F), wf);
    }
    vec3 T = exp(-KC * ts);
    col = sc * T + bg * (1. - T);
  } else col = bg;
  vec2 vt = .5 / vec2(textureSize(uV, 0));   // four bilinear taps: an even tent, not the diagonal cross that drew a weave
  col += (texture(uV, vUV + vt).rgb + texture(uV, vUV - vt).rgb + texture(uV, vUV + vec2(vt.x, -vt.y)).rgb + texture(uV, vUV - vec2(vt.x, -vt.y)).rgb) * .25 / ENC;
  oC = vec4(col * ENC, 1.);
}`,Oa=`
layout(location = 0) in vec4 aA; layout(location = 1) in vec4 aB; layout(location = 2) in vec4 aC;
out vec3 vCol; out float vA, vX, vHw, vT; out vec3 vRd;
void main() {
  int v = gl_VertexID;
  bool al = v == 1 || v == 2 || v == 4;
  float sd = (v == 2 || v == 4 || v == 5) ? 1. : -1.;
  vec3 a = proj(aA.xyz), b = proj(aB.xyz);
  if (a.z < .08 && b.z < .08) { gl_Position = vec4(2., 2., 2., 1.); return; }
  if (a.z < .08) a = mix(a, b, (.08 - a.z) / (b.z - a.z));
  if (b.z < .08) b = mix(b, a, (.08 - b.z) / (a.z - b.z));
  float f = SZ * .5 / TANH;
  vec2 sa = a.xy / a.z * f, sb = b.xy / b.z * f, dd = sb - sa;
  float L = length(dd);
  vec2 dir = L > 1e-4 ? dd / L : vec2(1., 0.), nr = vec2(-dir.y, dir.x);
  vec3 c = al ? b : a;
  float wpx = (al ? aB.w : aA.w) * f / c.z;
  float hw = max(wpx, 1.) * .5;
  vec2 s = (al ? sb : sa) + nr * sd * (hw + .9) + dir * (al ? .7 : -.7);
  gl_Position = vec4(s / (SZ * .5), 0., 1.);
  vX = sd * (hw + .9); vHw = hw; vA = min(1., wpx) * aC.a;
  vec3 p = al ? aB.xyz : aA.xyz;
  vRd = p - CAM; vT = length(vRd);
  float dep = max(SD - p.y, 0.);
  vec3 lt = sunAt(dep) * (SUNE * shv(p) * caus(p, dep) * .45 + AMBE * vec3(.2, .3, .36) * .8);
  vCol = aC.rgb * lt;
}`,Ga=`
in vec3 vCol; in float vA, vX, vHw, vT; in vec3 vRd; out vec4 oC;
void main() {
  float tg = uintBitsToFloat(texelFetch(uG, ivec2(gl_FragCoord.xy), 0).x);
  if (vT > tg + .03) discard;
  float a = vA * clamp(vHw + .5 - abs(vX), 0., 1.);
  vec3 T = exp(-KC * vT);
  vec3 c = vCol * T + wbg(normalize(vRd)) * (1. - T);
  oC = vec4(c * a * ENC, a);
}`,Wa=`
out vec2 vL; out vec3 vCol; out float vA, vT, vG; out vec3 vRd;
void main() {
  int i = gl_InstanceID, v = gl_VertexID;
  vec2 cr = vec2((v == 1 || v == 2 || v == 4) ? 1. : -1., (v == 2 || v == 4 || v == 5) ? 1. : -1.);
  ivec2 ij = ivec2((i & 31) * 2, i >> 5);
  vec4 P = SS(ij), V = SS(ij + ivec2(1, 0));
  vec3 p = P.xyz, hd = normalize(V.xyz + vec3(1e-4, 0., 0.));
  vec3 c = proj(p);
  if (c.z < .15) { gl_Position = vec4(2., 2., 2., 1.); return; }
  float f = SZ * .5 / TANH;
  vec3 c2 = proj(p + hd * .03);
  vec2 s = c.xy / c.z * f, s2 = c2.xy / c2.z * f, dd = s2 - s;
  float dl = length(dd), full = .03 * f / c.z;
  vec2 dir = dl > 1e-5 ? dd / dl : vec2(1., 0.), nr = vec2(-dir.y, dir.x);
  float fore = clamp(dl / max(full, 1e-5), .3, 1.);
  float lpx = .08 * f / c.z * fore, hpx = .024 * f / c.z;
  float lx = max(lpx, 1.6) * .5 + .8, hy = max(hpx, 1.) * .5 + .8;
  vec2 o = s + dir * cr.x * lx + nr * cr.y * hy;
  gl_Position = vec4(o / (SZ * .5), 0., 1.);
  vL = vec2(cr.x * lx / (max(lpx, 1.6) * .5), cr.y * hy / (max(hpx, 1.) * .5));
  vA = min(1., lpx / 1.6) * min(1., hpx);
  vRd = p - CAM; vT = length(vRd);
  float dep = max(SD - p.y, 0.);
  vec3 q = toH(p);
  float inside = q.x > -6.6 ? .3 : 1.;
  float vis = shv(p);
  vec3 sl = sunAt(dep) * SUNE * vis * caus(p, dep);
  vec3 amb = sunAt(dep) * AMBE * vec3(.2, .3, .36) * inside;
  vec3 nf = normalize(cross(hd, vec3(0., 1., 0.)) + vec3(0., .2, 0.));
  if (dot(nf, CAM - p) < 0.) nf = -nf;
  // a flash runs across the school now and then as the flanks turn together (its path drifts, never on a beat)
  float fw = smoothstep(.82, 1., sin(dot(p.xz, vec2(.31, .93)) * .7 - TIME * 1.05 + 2.3 * sin(TIME * .121) + 1.4 * sin(TIME * .067)));
  float bend = sin(P.w) * .25 + fw * .7;
  nf = normalize(nf + hd * bend);
  float gli = pow(max(dot(reflect(-SUNW, nf), normalize(CAM - p)), 0.), 7.);
  vCol = vec3(1., .52, .12) * (amb * vec3(4.6, 3.1, 2.2) + sl * .75) + vec3(1., .92, .7) * (gli * 3. + fw * .8) * (sl + amb * .6);
  vG = gli;
}`,Za=`
in vec2 vL; in vec3 vCol; in float vA, vT, vG; in vec3 vRd; out vec4 oC;
void main() {
  float tg = uintBitsToFloat(texelFetch(uG, ivec2(gl_FragCoord.xy), 0).x);
  if (vT > tg + .02) discard;
  float x = vL.x, y = vL.y;
  float xw = (x + .05) / 1.02, hw = x > -.6 ? sqrt(max(0., 1. - xw * xw)) * .9 : 0.;   // x * x: pow() of a negative base is NaN on some GPUs
  float body = smoothstep(.15, -.15, abs(y) - hw);
  float tail = step(x, -.55) * step(-1.05, x) * smoothstep(.12, 0., abs(y) - (-.5 - x) * 1.4) * .55;
  float a = max(body * (.6 + .4 * smoothstep(-.4, .6, x)), tail) * vA;
  if (a < .004) discard;
  vec3 c = vCol * (body > .1 ? .85 + .3 * smoothstep(.6, .95, x) : .7);
  vec3 T = exp(-KC * vT);
  c = c * T + wbg(normalize(vRd)) * (1. - T);
  oC = vec4(c * a * ENC, a);
}`,Xa=`
#ifdef SIMU
out uvec4 oS;
#define OUT(v) oS = floatBitsToUint(v)
#else
out vec4 oS;
#define OUT(v) oS = v
#endif
void main() {
  ivec2 fc = ivec2(gl_FragCoord.xy);
  int i = (fc.x >> 1) + fc.y * 32;
  ivec2 bb = ivec2((fc.x >> 1) * 2, fc.y);
  vec4 P = SS(bb), Vv = SS(bb + ivec2(1, 0));
  vec3 p = P.xyz, v = Vv.xyz;
  float dt = SIMP.x, NF = SIMP.z;
  int nf = int(NF);
  vec3 ali = vec3(0.), coh = vec3(0.), sep = vec3(0.);
  float na = 0., nc = 0., nd = 0.;
  uint sd = uint(i) * 747796405u + uint(SIMP.y) * 2891336453u + 17u;
  for (int k = ZI; k < 16; k++) {
    sd = sd * 747796405u + 2891336453u;
    uint hh = ((sd >> ((sd >> 28u) + 4u)) ^ sd) * 277803737u; hh ^= hh >> 22u;
    int j = int(hh % uint(nf));
    if (j == i) continue;
    ivec2 jb = ivec2((j & 31) * 2, j >> 5);
    vec3 pj = SS(jb).xyz, vj = SS(jb + ivec2(1, 0)).xyz;
    vec3 d = p - pj; float r = length(d);
    if (r < .2) sep += d / (r * r + .004);
    if (r < 1.) { ali += vj; na += 1.; nd += 1.; }
    if (r < 2.6) { coh += pj; nc += 1.; }
  }
  vec3 acc = vec3(0.);
  float f0 = SIMP.w;   // the share of the school a fish should find within a metre (set for the sheet's own shape)
  if (nc > 0.) acc += (coh / nc - p) * .4 * (1. - (nd / 16.) / f0);
  if (na > 0.) acc += (ali / na - v) * 1.8;
  acc += sep * .015;
  float tm = TIME;
  vec3 hc = HOME + vec3(sin(p.y * 1.1 + tm * .21) + .5 * sin(p.z * .7 - tm * .13), .45 * sin(p.z * .8 + tm * .17), sin(p.x * 1.3 + tm * .19) + .6 * sin(p.y * .9 + tm * .11)) * .75;
  vec3 o = (p - hc) / HOMER; float ol = length(o);
  acc -= (p - hc) / max(ol, 1e-3) / HOMER * max(ol - .7, 0.) * 1.1;
  vec3 q = toH(p), fl = vec3(0.);
  bool inB = abs(q.z - BZ) < 2.6 && abs(q.y - 7.8) < 1.8;
  if (q.x > -7.3 && q.x < -6.75 && !inB) fl.x = -(q.x + 7.3) * 10.;
  if (q.x >= -6.75 && q.x < -6.15 && !inB) fl.x = (q.x + 6.75) * 10. + 1.;
  if (q.x >= -6.15) {
    fl.x -= max(q.x + 1., 0.) * 3.;
    fl.z -= sign(q.z - BZ) * max(abs(q.z - BZ) - 4.3, 0.) * 8.;
    fl.y -= sign(q.y - 6.) * max(abs(q.y - 6.) - 3.6, 0.) * 8.;
  }
  acc += vec3(fl.x * LC - fl.y * LS, fl.x * LS + fl.y * LC, fl.z);
  acc.y += max(.6 - p.y, 0.) * 6.;
  float st = 0.;
#define COLV(k) { vec4 cl = uP[k]; if (cl.w > cl.z) { vec2 dxz = p.xz - cl.xy; float r = length(dxz); if (r < 1.4 && p.y > cl.z - .6 && p.y < cl.w + .6) { acc.xz += dxz / max(r, .05) * (1.4 - r) * 9.; st = max(st, 1.4 - r); } } }
  COLV(33) COLV(34) COLV(35) COLV(36)
  acc += (vec3(.12, 0., -.05) - CUR * .8 - v) * .5;   // every fish nose-on to the slight draw into the hold (broadside to you)
  acc += (vec3(hsh(sd), hsh(sd + 1u), hsh(sd + 2u)) - .5) * .32;
  v += acc * dt;
  v.y *= .97;
  float sp = length(v), mx = .32 + .8 * min(st, 1.);
  v *= clamp(sp, .06, mx) / max(sp, 1e-4);
  if ((fc.x & 1) == 1) OUT(vec4(v, 0.));
  else OUT(vec4(p + (v + CUR * .85) * dt, mod(P.w + dt * (5. + 18. * sp), 6.2831853)));
}`,ja=`
layout(location = 0) in vec4 aP; layout(location = 1) in vec4 aQ;
out vec2 vL; out vec3 vCol; out float vT, vK, vPh, vA, vFo; out vec3 vRd;
void main() {
  int v = gl_VertexID;
  vec2 cr = vec2((v == 1 || v == 2 || v == 4) ? 1. : -1., (v == 2 || v == 4 || v == 5) ? 1. : -1.);
  vec3 c = proj(aP.xyz);
  if (c.z < .12 || aQ.w <= 0.) { gl_Position = vec4(2., 2., 2., 1.); return; }
  float f = SZ * .5 / TANH;
  vec2 s = c.xy / c.z * f;
  float r = aP.w * f / c.z, k = aQ.x;
  vec2 o;
  vFo = 1.;
  if (k < .5 || k > 2.5) { float rr = max(r, 1.1) + .7; o = s + cr * rr; vL = cr * rr / max(r, 1.1); vA = min(1., .25 + r / 1.4); }
  else {
    vec3 hd = vec3(sin(aQ.y), 0., cos(aQ.y));
    vec3 c2 = proj(aP.xyz + hd * .3);
    vec2 s2 = c2.xy / c2.z * f, dd = s2 - s;
    float dl = length(dd);
    vec2 dir = dl > 1e-5 ? dd / dl : vec2(1., 0.);
    vec2 nr = vec2(-dir.y, dir.x);
    if (nr.y < 0.) nr = -nr;
    float fo = clamp(dl / max(.3 * f / c.z, 1e-4), .1, 1.);
    vFo = fo;
    float rr = max(r, 2.) + 1.;
    o = s + dir * cr.x * rr * max(fo, .35) + nr * cr.y * rr;
    vL = vec2(cr.x * max(fo, .35) / fo, cr.y) * rr / max(r, 2.);
    vA = min(1., r / 2.);
  }
  gl_Position = vec4(o / (SZ * .5), 0., 1.);
  vK = k; vPh = aQ.z;
  vRd = aP.xyz - CAM; vT = length(vRd);
  float dep = max(SD - aP.y, 0.);
  vec3 sl = sunAt(dep) * SUNE * shv(aP.xyz);
  vec3 amb = sunAt(dep) * AMBE * vec3(.2, .3, .36);
  vCol = k < .5 || k > 2.5 ? sl * .8 + amb * 1.6 : amb * 1.2 + sl * .3;
  vA *= aQ.w;
}`,Ka=`
in vec2 vL; in vec3 vCol; in float vT, vK, vPh, vA, vFo; in vec3 vRd; out vec4 oC;
void main() {
  float tg = uintBitsToFloat(texelFetch(uG, ivec2(gl_FragCoord.xy), 0).x);
  if (vT > tg + .02) discard;
  vec2 l = vL;
  vec3 bgc = wbg(normalize(vRd)), c; float a;
  if (vK < .5 || vK > 2.5) {
    if (vK > 2.5) { l.y = (l.y + .25) * 1.6 + .12 * sin(l.x * 3. + vPh); l.x *= .9; if (l.y < -.2) l.y = -.2 + (l.y + .2) * 3.; }
    float d = length(l);
    float rim = smoothstep(.5, .97, d);
    a = (1. - smoothstep(.88, 1.04, d)) * (.22 + .78 * rim);
    float hl = smoothstep(.35, .0, length(l - vec2(-.32, .4)));
    c = bgc * 1.8 + vCol * (.5 + rim) + vec3(1.) * hl * (length(vCol) + .1) * 1.5;
    a = max(a, hl * .8) * vA;
  } else {
    float x = l.x, y = l.y;
    // a far batfish: a tall dark lozenge with a hint of tail, no markings at this size
    float d = min(abs(x - .08) * 1.5 + abs(y) * .82 - .8, max(abs(y) - .18, abs(x + .78) - .14));
    float w = fwidth(d) + .03;
    a = smoothstep(w, -w, d) * vA;
    c = vCol * vec3(.55, .6, .62);
  }
  if (a < .003) discard;
  vec3 T = exp(-KC * vT);
  c = c * T + bgc * (1. - T);
  oC = vec4(c * a * ENC, a);
}`,Ya=`
out vec3 vCol; out float vT;
void main() {
  uint i = uint(gl_VertexID);
  vec3 h = vec3(hsh(i * 3u + 11u), hsh(i * 3u + 12u), hsh(i * 3u + 13u));
  float B = 16.;
  vec3 dr = vec3(sin(TIME * .05 + h.x * 9.), .5 * sin(TIME * .033 + h.y * 9.), cos(TIME * .041 + h.z * 9.)) * .5 + MOFF;
  vec3 b0 = CAM - B * .5;
  vec3 p = b0 + mod(h * B + dr - b0, B);
  vec3 c = proj(p);
  float dep = SD - p.y;
  if (c.z < .2 || dep < .1 || p.y < .1) { gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 1.; return; }
  float f = SZ * .5 / TANH;
  gl_Position = vec4(c.xy / c.z * f / (SZ * .5), 0., 1.);
  float px = .005 * f / c.z;
  gl_PointSize = clamp(px * 1.3, 1., 4.);
  vec3 lt = sunAt(dep) * (SUNE * shv(p) * beam(p, dep, 0.) * .9 + AMBE * .75) + vec3(.045, .055, .055) * AMBE;
  vT = length(p - CAM);
  vCol = lt * min(1., px * px) * (.3 + .7 * hsh(i + 77u)) * .65 * exp(-KC * vT * .7);
}`,Qa=`
in vec3 vCol; in float vT; out vec4 oC;
void main() {
  float tg = uintBitsToFloat(texelFetch(uG, ivec2(gl_FragCoord.xy), 0).x);
  if (vT > tg) discard;
  float r = length(gl_PointCoord - .5) * 2.;
  oC = vec4(vCol * smoothstep(1., .2, r) * ENC, 0.);
}`,Ja=`
in vec2 vUV; out vec4 oC;
vec3 T(vec2 u) { return texture(uM, u).rgb / ENC; }
float lu(vec3 c) { return sqrt(dot(c * EXPO, vec3(.3, .59, .11))); }
vec3 tmap(vec3 c) { c *= EXPO * vec3(1.35, 1.03, .9); c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14); return pow(clamp(c, 0., 1.), vec3(1. / 2.2)); }
void main() {
  vec2 px = 1. / vec2(SZ);
  vec3 cM = T(vUV);
  float lM = lu(cM), lNW = lu(T(vUV + vec2(-1., 1.) * px)), lNE = lu(T(vUV + vec2(1., 1.) * px)), lSW = lu(T(vUV + vec2(-1., -1.) * px)), lSE = lu(T(vUV + vec2(1., -1.) * px));
  float mn = min(lM, min(min(lNW, lNE), min(lSW, lSE))), mx = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
  vec2 d = vec2(-((lNW + lNE) - (lSW + lSE)), (lNW + lSW) - (lNE + lSE));
  float rd = max((lNW + lNE + lSW + lSE) * .03125, 1. / 128.);
  d = clamp(d / (min(abs(d.x), abs(d.y)) + rd), -6., 6.) * px;
  vec3 A = .5 * (T(vUV - d / 6.) + T(vUV + d / 6.));
  vec3 B = A * .5 + .25 * (T(vUV - d * .5) + T(vUV + d * .5));
  float lB = lu(B);
  vec3 c = (mx - mn < .04) ? cM : (lB < mn || lB > mx) ? A : B;
  vec2 q = vUV - .5;
  c *= 1. - .16 * dot(q, q);
  float g = hsh(uint(gl_FragCoord.x) * 7919u + uint(gl_FragCoord.y) * 104729u) - .5;
  oC = vec4(tmap(c) + g * .014, 1.);
}`;function $a(n,o,f){let T=Math.imul(n^2654435769,2246822507)^Math.imul(o+2135587861,3266489909)^Math.imul(f+374761393,668265263);return T^=T>>>15,T=Math.imul(T,739982445),T^=T>>>12,T=Math.imul(T,695872825),T^=T>>>15,(T>>>0)/4294967296}const na=n=>n*n*n*(n*(n*6-15)+10);function en(){const f=new Uint8Array(65536),T=new Float32Array(16*16),v=new Float32Array(16*16);for(let N=0;N<4;N++){for(let r=0;r<16*16;r++){const A=$a(r,N,23)*Q;T[r]=Math.cos(A),v[r]=Math.sin(A)}for(let r=0;r<128;r++){const A=(r+.5)/128*16,H=Math.floor(A),E=A-H,V=na(E),ve=H%16*16,_=(H+1)%16*16;for(let de=0;de<128;de++){const g=(de+.5)/128*16,B=Math.floor(g),z=g-B,W=na(z),q=B%16,S=(B+1)%16,se=T[ve+q]*z+v[ve+q]*E,J=T[ve+S]*(z-1)+v[ve+S]*E,ht=T[_+q]*z+v[_+q]*(E-1),Eo=T[_+S]*(z-1)+v[_+S]*(E-1),jt=se+(J-se)*W,$=jt+(ht+(Eo-ht)*W-jt)*V;f[(r*128+de)*4+N]=he(Math.round(($*.85+.5)*255),0,255)}}}return f}function Ee(n,o,f,T,v,N,r,A,H){const E=n.createTexture();return n.bindTexture(n.TEXTURE_2D,E),n.texImage2D(n.TEXTURE_2D,0,T,o,f,0,v,N,H||null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,r),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,r===n.LINEAR_MIPMAP_LINEAR?n.LINEAR:r),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,A),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,A),E}function Ye(n,o,f,T){const v=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,v),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),n.bindFramebuffer(n.FRAMEBUFFER,null),{tex:o,fb:v,w:f,h:T}}const tn=["uN","uC","uV","uM","uS","uG","uSH","uK"],sa=typeof FinalizationRegistry=="function"?new FinalizationRegistry(n=>{try{for(const o of n.st)n.gl.deleteTexture(o.tex),n.gl.deleteFramebuffer(o.fb);n.fb&&(n.gl.deleteBuffer(n.fb.b),n.gl.deleteVertexArray(n.fb.a))}catch{}}):null;function on(n,o){if(n.__c582)return n.__c582;const f=!!n.getExtension("EXT_color_buffer_float"),T=f||!!n.getExtension("EXT_color_buffer_half_float"),v=(g,B)=>{const z=n.createShader(g);return n.shaderSource(z,B),n.compileShader(z),z},N={trc:[Ke,_a],shd:[Ke,Ia],cau:[Ke,Da],vol:[Ke,Ha],comp:[Ke,Va],fin:[Ke,Ja],sim:[Ke,Xa],line:[Oa,Ga],fish:[Wa,Za],spr:[ja,Ka],mote:[Ya,Qa]},r={},A=(g,B)=>{const z=g+"|"+B;if(!r[z]){const W=n.createProgram(),q=v(n.VERTEX_SHADER,Ao+B+Xt+N[g][0]),S=v(n.FRAGMENT_SHADER,Ao+B+Xt+N[g][1]);n.attachShader(W,q),n.attachShader(W,S),n.linkProgram(W),B&&n.flush(),r[z]={p:W,v:q,f:S}}return z};for(const g in N){if(g==="trc"||g==="shd"){A(g,o);continue}const B=Ao+(!f&&(g==="sim"||g==="fish")?`#define SIMU 1
`:""),z=n.createProgram(),W=v(n.VERTEX_SHADER,B+Xt+N[g][0]),q=v(n.FRAGMENT_SHADER,B+Xt+N[g][1]);n.attachShader(z,W),n.attachShader(z,q),n.linkProgram(z),r[g]={p:z,v:W,f:q}}n.flush();const H=en();n.pixelStorei(n.UNPACK_ALIGNMENT,1);const E=Ee(n,128,128,n.RGBA8,n.RGBA,n.UNSIGNED_BYTE,n.LINEAR_MIPMAP_LINEAR,n.REPEAT,H);n.generateMipmap(n.TEXTURE_2D);const V=g=>{if(!("uP"in r[g])){const{p:B,v:z,f:W}=r[g];if(!n.getProgramParameter(B,n.LINK_STATUS))throw new Error("582 "+g+": "+(n.getShaderInfoLog(z)||"")+(n.getShaderInfoLog(W)||"")+n.getProgramInfoLog(B));n.useProgram(B),tn.forEach((q,S)=>{const se=n.getUniformLocation(B,q);se&&n.uniform1i(se,S)}),r[g]={p:B,uP:n.getUniformLocation(B,"uP")}}return r[g]},ve=n.createVertexArray(),_=(g,B)=>{const z=n.createVertexArray(),W=n.createBuffer();n.bindVertexArray(z),n.bindBuffer(n.ARRAY_BUFFER,W),n.bufferData(n.ARRAY_BUFFER,g*4*B,n.DYNAMIC_DRAW);for(let q=0;q<g/4;q++)n.enableVertexAttribArray(q),n.vertexAttribPointer(q,4,n.FLOAT,!1,g*4,q*16),n.vertexAttribDivisor(q,1);return n.bindVertexArray(null),{a:z,b:W}},de=Ye(n,Ee(n,ft,ft,n.RGBA8,n.RGBA,n.UNSIGNED_BYTE,n.LINEAR_MIPMAP_LINEAR,n.REPEAT),ft,ft);return n.bindTexture(n.TEXTURE_2D,de.tex),n.generateMipmap(n.TEXTURE_2D),n.__c582={P:r,use:V,variant:A,fl:f,hf:T,nd:H,tN:E,vao:ve,C:de,L:_(12,To),SP:_(8,Zt+8),rt:{},pool:{},clock:0}}const ca=(n,o,f,T)=>{const v=o*128-.5,N=f*128-.5,r=Math.floor(v),A=Math.floor(N),H=v-r,E=N-A,V=(ve,_)=>n[((_&127)*128+(ve&127))*4+T]/255;return(V(r,A)*(1-H)+V(r+1,A)*H)*(1-E)+(V(r,A+1)*(1-H)+V(r+1,A+1)*H)*E};ta.add({num:582,name:"Shipwreck",fam:"Vistas",recipe:"An old cargo ship lying on the sand in the clear Red Sea, mostly around midday, grown over with soft corals, with sunbeams through the rigging and batfish far off in the haze. Where you hover, the ship, how far it leans and the fish change every mint. Tap to breathe out bubbles that slide up the hull and part the school, drag to send a current along the wreck, or hold to let a cloud drift over the sun until the light slowly comes back.",interactive:"Tap a spot to breathe out bubbles there: they rise at their real speeds in silver strings, growing as the pressure falls, sliding up the overhanging hull, and the glassfish school parts around them. Drag to send a current along the wreck: the school, the whip corals, the garden eels and the slack rigging lean and flow. Hold to let a cloud drift over the sun: the beams fade and the blue deepens, then the light comes slowly back.",music:!0,gl:!0,fps:30,seed:0,make(n){const o=n.gl,f=n.size,T={};let v=null,N=2654435769;for(let e=2;e<n.hash.length;e+=8)N=Math.imul(N^parseInt(n.hash.slice(e,e+8),16),2246822507)>>>0;const r=()=>{N=N+1831565813|0;let e=Math.imul(N^N>>>15,1|N);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},A=e=>{let t=0;for(const s in e)t+=e[s];let a=r()*t;for(const s in e)if(a-=e[s],a<0)return s;return Object.keys(e)[0]};let H=A({"Listing to port":45,Upright:35,"Heeled over":20}),E=A({"Soft coral garden":45,"Purple and orange":25,"Yellow whips":18,"Pink bloom":12}),V=A({"Dense school":50,"Wall of glassfish":18,"Loose school":32}),ve=A({"Turtle and batfish":35,Batfish:35,Turtle:30}),_=A({"Red Sea blue":50,Turquoise:25,"Plankton haze":17,"Gin clear":8}),de=A({"Late morning":45,"High noon":35,"Low sun":20}),g=A({"Two masts":50,"One mast":30,"Fallen mast":20}),B=A({"Twenty metres":50,"Sixteen metres":30,"Twenty-eight metres":20});n.home&&(H="Listing to port",E="Soft coral garden",V="Dense school",ve="Turtle and batfish",_="Red Sea blue",de="Late morning",g="Two masts",B="Twenty metres");let z=625341585;for(let e=2;e<n.hash.length;e+=8)z=Math.imul(z^parseInt(n.hash.slice(e,e+8),16),3266489909)>>>0;const W=()=>{z=z+1831565813|0;let e=Math.imul(z^z>>>15,1|z);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},q={"Beside the hull":56,"Over the rail":28,"At the hull's foot":16};let S="Beside the hull";{let e=W()*100;for(const t in q)if(e-=q[t],e<0){S=t;break}}n.home&&(S="Beside the hull");let se=1779033703;for(let e=2;e<n.hash.length;e+=8)se=Math.imul(se^parseInt(n.hash.slice(e,e+8),16),668265263)>>>0;const J=()=>{se=se+1831565813|0;let e=Math.imul(se^se>>>15,1|se);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},ht=e=>{let t=0;for(const s in e)t+=e[s];let a=J()*t;for(const s in e)if(a-=e[s],a<0)return s;return Object.keys(e)[0]},Eo=J(),jt=ht({"Under the stern":0,"Off the bow":22,"Far across the sand":20,"Up the mast":18,"Above the deck":16});let $=ht({"Bridge amidships":38,"Bridge aft":32,"Broken in two":20,"Bow section only":10}),ue=ht({"Sun across":40,"Into the sun":22,"Sun at your back":16,"Late gold":13,Overcast:9});const u=[J(),J(),J(),J(),J()],Qe=[J(),J(),J(),J()],vt=[J(),J()];let Je=3144134277;for(let e=2;e<n.hash.length;e+=8)Je=Math.imul(Je^parseInt(n.hash.slice(e,e+8),16),2654435761)>>>0;const Me=()=>{Je=Je+1831565813|0;let e=Math.imul(Je^Je>>>15,1|Je);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Bo=Me(),an=Me(),Zn=Me(),Xn=Me(),nn=Me(),Et=[Me(),Me(),Me(),Me(),Me(),Me()];let Bt="";const Ro=E;if(n.home||(Bo<.14?E="Table corals":Bo>=.55&&Bo<.7&&(E="Sea fans")),n.home?($="Bridge amidships",ue="Sun across"):S==="Beside the hull"&&Eo<.5&&(S=jt),$==="Bow section only"&&(S==="Under the stern"||S==="Up the mast")&&(S="Off the bow"),!n.home&&ue==="Sun across"&&nn<.1&&(ue="Late gold"),oa&&At[n.hash.slice(0,10)]){const e=At[n.hash.slice(0,10)];e.gr&&(E=e.gr),e.st&&(S=e.st),e.sh&&($=e.sh),e.li&&(ue=e.li),e.wa&&(_=e.wa)}n.trait("Wreck",H),n.trait("Growth",E),n.trait("Glassfish",V),n.trait("Water",_),n.trait("Masts",g),n.trait("Depth",B),!n.home&&an<.11&&($==="Bridge amidships"||$==="Bridge aft")&&(Bt="Ribs open to the light"),oa&&At[n.hash.slice(0,10)]&&At[n.hash.slice(0,10)].sn&&(Bt=At[n.hash.slice(0,10)].sn),n.trait("Standpoint",S),n.trait("Ship",Bt||$),n.trait("Light",ue==="Sun across"?de:ue);const ra=E==="Table corals",$e=E==="Sea fans",sn=Bt==="Ribs open to the light",Kt=!n.home&&$!=="Bow section only",ko=(ra?`#define FORM 1
`:"")+(sn?`#define RIBS 1
`:"")+(Kt?`#define HOUSE 1
`:"");v=on(o,ko);const ia=v.variant("trc",ko),cn=v.variant("shd",ko),M=new Float32Array(aa*4),p=(e,t,a,s,c)=>{M[e*4]=t,M[e*4+1]=a,M[e*4+2]=s,M[e*4+3]=c},ee={"Twenty metres":20,"Sixteen metres":16,"Twenty-eight metres":28}[B],la={"Listing to port":11,Upright:2.5,"Heeled over":23}[H]*Math.PI/180,D=Math.cos(la),ce=Math.sin(la),Ne=-15,Be=64,Po=12.5,k=(e,t,a)=>[e*D-t*ce+7,e*ce+t*D-1.5,a],Rt=(e,t,a)=>{const s=e-7,c=t+1.5;return[s*D+c*ce,-s*ce+c*D,a]},pe=(e,t)=>{const a=he(t/11.5,0,1),s=Be+3*a,c=Ne-2.2*a;return 6.8*Math.sqrt(he((s-e)/18,0,1))*Math.sqrt(he((e-c)/5,0,1))},Fo=(e,t)=>{const a=v.nd;return(ca(a,e*.011,t*.011,0)-.5)*1.3+(ca(a,e*.047+.31,t*.047+.31,1)-.5)*.35};p(15,D,ce,Ne,Be);const rn={"Soft coral garden":1,"Purple and orange":.9,"Yellow whips":.6,"Pink bloom":1.1,"Table corals":.55}[$e?Ro:E]*($e?.8:1);p(16,Po,rn,2.2,0),{"Soft coral garden":[[.5,.2,.55],[.9,.5,.16],[.82,.76,.3],[.92,.42,.6]],"Purple and orange":[[.5,.18,.58],[.95,.42,.12],[.6,.2,.5],[.92,.55,.18]],"Yellow whips":[[.85,.74,.24],[.62,.56,.2],[.9,.45,.14],[.5,.2,.52]],"Pink bloom":[[.95,.45,.6],[.85,.32,.5],[.55,.2,.55],[.95,.7,.72]],"Table corals":[[.62,.4,.22],[.5,.44,.3],[.46,.3,.4],[.7,.5,.3]]}[$e?Ro:E].forEach((e,t)=>p(28+t,e[0],e[1],e[2],0));const Ie=Math.min(ee-1.8,21.5)+1.5,ae={z:17,on:g!=="Fallen mast"},et={z:43,on:g!=="One mast"},dt=e=>{const t=(e+1.5+6.8*ce)/D;return-6.8*D-t*ce+7},fa=8.5,De=dt(fa)-5;let Re=Math.tan(34*Math.PI/180),j=De,O=fa,K=0,re=.25,tt=.08;const He=(e,t)=>{const a=e[0]-j,s=e[1]-O,c=e[2]-K;re=Math.atan2(a,c),tt=Math.atan2(s,Math.hypot(a,c))+(t||0)},No=et.on?et:ae,ln=(No===ae?Ie:Ie-1.2)/D,qo=($==="Bridge amidships"?44:24)+3*Et[1];if(S==="Beside the hull"&&!n.home){const e=Bt&&H!=="Heeled over",t=u[2]>.62&&!e,a=e?qo-12-5*u[2]:t?22+20*u[2]:-4+30*u[2];if(O=4.5+5.5*u[1],j=dt(O)-(4.5+4.5*u[0])*(_==="Plankton haze"?.6:1),K=a,re=t?Math.PI-.06-.3*u[3]:.08+.3*u[3],tt=-.04+.26*u[4],e&&(j=dt(O)-4-3*u[0],He(k(-4.5,5.5+2*u[4],qo+1+3*u[3]),.05)),$==="Broken in two"){const s=24+8*Qe[1],c=2.6+1.6*Qe[2],h=k(-12-2*u[0],5+2*u[1],s-1.5+3*u[2]);j=h[0],O=h[1],K=h[2],He(k(0,5.5,s),.04)}}else if(S==="Over the rail"){const e=k(-9.5,15.5,-4+24*u[2]);j=e[0],O=Math.min(e[1],ee-2.5),K=e[2],re=.2+.25*u[3],tt=-.3}else if(S==="At the hull's foot")K=1+18*u[2],j=dt(1.6)-(_==="Plankton haze"?2.4+.6*u[0]:3.6+1.4*u[0]),O=Math.max(1.6,Fo(j,K)+1.1),re=.08+.14*u[3],tt=.62+.14*u[4];else if(S==="Under the stern"){const e=k(0,3,Ne-1.2);j=e[0]-1.5-3.5*u[0],O=1.5+1.2*u[1],K=e[2]-8-3.5*u[2],He(e,.16+.12*u[4]),Re=.78}else if(S==="Off the bow"){const e=k(0,6,Be+1),t=_==="Plankton haze"?.75:1;j=e[0]-(8+5*u[0])*t,O=2.2+3*u[1],K=Be+1+(10+6*u[2])*t,He(e,.1+.1*u[4]),re+=(u[3]-.5)*.2,Re=.74}else if(S==="Far across the sand"){const e={"Gin clear":34,"Red Sea blue":24,Turquoise:21,"Plankton haze":11}[_]*(1+.18*u[0]),t=k(0,7,22+12*u[3]);j=3-e,O=3.6+3*u[1],K=6+26*u[2],He(t,.05),Re=Math.tan(27*Math.PI/180),_==="Plankton haze"&&(K=Be+2+5*u[2],He(k(0,6,Be-6-6*u[3]),.08),Re=Math.tan(30*Math.PI/180))}else if(S==="Up the mast"){const e=k(-3.4-1.6*u[0],12.6,No.z-3.5-3*u[2]);j=e[0],O=Math.min(e[1],ee-1.6),K=e[2],He(k(0,ln,No.z),0),tt=Math.min(tt,1.15),Re=.78}else if(S==="Above the deck"){const e=2+34*u[2],t=k(-pe(e,11.5)-2-2.5*u[0],16+2*u[1],e);j=t[0],O=Math.min(t[1],ee-1.6),K=e,He(k(1,11.5,e+8+5*u[3]),0),Re=.74}const kt={"Late morning":[38,3.2],"High noon":[14,3.5],"Low sun":[60,2.6]}[de];ue==="Late gold"&&(kt[0]=64+6*vt[0]);let Pt=[-.8,.6];if(!n.home){let e=vt[1]<.5?-1:1,t={"Into the sun":.2+.35*vt[0],"Sun at your back":Math.PI-.2-.5*vt[0]}[ue]||1.05+.7*vt[0];S==="Far across the sand"&&ue!=="Into the sun"&&(t=Math.max(t,2.1+.5*vt[0])),(S==="Far across the sand"&&ue!=="Into the sun"||S==="Beside the hull"&&(de==="Low sun"||ee>25))&&(e=Math.sin(re+t)<Math.sin(re-t)?1:-1);const a=re+e*t;Pt=[Math.sin(a),Math.cos(a)]}const Yt=kt[0]*Math.PI/180,Co=[Pt[0]*Math.sin(Yt),Math.cos(Yt),Pt[1]*Math.sin(Yt)],Uo=Math.asin(Math.sin(Yt)/1.333),Z=[Pt[0]*Math.sin(Uo),Math.cos(Uo),Pt[1]*Math.sin(Uo)],U={"Red Sea blue":[[.27,.095,.062],[.08,.058,.038],.013,[.034,.165,.29],[.007,.052,.112],[.0014,.012,.033]],Turquoise:[[.33,.075,.072],[.09,.05,.045],.009,[.03,.22,.3],[.007,.085,.12],[.0012,.02,.04]],"Plankton haze":[[.42,.14,.13],[.12,.085,.075],.015,[.035,.17,.22],[.009,.06,.088],[.002,.014,.03]],"Gin clear":[[.2,.05,.032],[.06,.045,.025],.005,[.024,.14,.35],[.004,.04,.14],[.001,.009,.04]]}[_],fn=ee-O,hn=U[1].map(e=>Math.exp(-e*(fn-15)*.8)),Lo=(e,t)=>e.map((a,s)=>a*hn[s]*t),ut=ue==="Late gold",ot=ue==="Overcast",_o=kt[1]*(ot?.06:ut?1.2:1),vn=ot?1.25:ut?.78:1,ha=ot?0:1;ot&&(U[0]=U[0].map((e,t)=>e*[.8,.76,.86][t])),ut&&(U[1]=U[1].map((e,t)=>e*[.52,.78,1.04][t]),U[0]=U[0].map((e,t)=>e*[.8,.94,1.06][t])),p(4,Z[0],Z[1],Z[2],_o),ut?p(5,1,.7,.38,1):p(5,1,.97,.92,1),p(6,U[0][0],U[0][1],U[0][2],U[2]);const va=(e,t,a)=>[.3,.59,.11].reduce((s,c,h)=>s+c*Math.exp(-e[h]*t/a),0),dn=Math.asin(Math.sin(38*Math.PI/180)/1.333),un=3.2*va([.08,.058,.038],11.5,Math.cos(dn)),pn=(ot?kt[1]*.4:_o)*va(U[1],Math.max(ee-O,1),Z[1])*(_==="Plankton haze"?.75:1),xn=n.home?.8:.8*he(Math.pow(un/pn,.4),.82,1.55);p(7,U[1][0],U[1][1],U[1][2],xn);const Io=(e,t)=>{const a=.3*e[0]+.59*e[1]+.11*e[2];return e.map((s,c)=>(s+(a-s)*.38)*[.96,1.07,.86][c]*t)};let Ft=Lo(U[3],.9).map((e,t)=>e*(ut?[2.1,1.35,.55][t]:1)),at=Lo(U[4],1),Qt=Lo(U[5],1);ut&&(at=at.map((e,t)=>e*[1.25,1.02,.9][t]),Qt=Qt.map((e,t)=>e*[1.2,.82,1.1][t])),ot&&(Ft=Io(Ft,1.15),at=Io(at,1.05),Qt=Io(Qt,1)),p(8,Ft[0],Ft[1],Ft[2],ha),p(41,Co[0],Co[1],Co[2],ot?kt[1]*.8:0);const Do=g==="Fallen mast",te=k(-pe(ae.z,11.5)+.3,11.8,ae.z),qe=[De-6.5,.25,ae.z+7.5];if(p(19,te[0],te[1],te[2],Do?1:0),p(20,qe[0],qe[1],qe[2],0),$e&&Do){const e=.3+.1*Et[0],t=Rt(te[0]+(qe[0]-te[0])*e,te[1]+(qe[1]-te[1])*e+.2,te[2]+(qe[2]-te[2])*e);p(18,t[0],t[1],t[2],1)}const ie=()=>r()-.5;p(21,De-4.2+ie(),14+2*ie(),r()*3,1),p(22,dt(.5)-1.6,23+2*ie(),.2*ie(),2),p(23,De-1.5+ie(),-6+2*ie(),r()*3,1),p(24,De-7+ie(),3+2*ie(),r()*3,1),p(25,De-5+ie(),21+2*ie(),1.1+.3*r(),1),p(26,De-9+ie(),-3+2*ie(),1.4+.3*r(),1),p(27,dt(.5)-1.3,-9+ie(),.9+.2*r(),1);const Nt=[],xe=(e,t,a,s,c,h,l,i)=>Nt.push([e,t,a,s,c,h,l,i]),da=$==="Broken in two",Ho=$==="Bow section only",nt=$==="Bridge amidships"?29.5+(n.home?0:(Qe[0]-.5)*3):-9.2+Qe[0]*1.5,mn=qo;p(17,ra?.55+.3*Et[0]:$e?.42+.2*Et[0]:0,$==="Bow section only"?-1e3:nt,mn,5.2+2*Et[2]);const oe=11.5,ua=oe+4.7+1.3,yn=oe+4.7+5.6,Jt=ee-(11.5*D-1.5),qt=Jt>9.2?1:0,$t=Math.min(.999,(Jt-1)/(qt?8.6:6.05));if(!Ho){const e=pe(nt,oe);if(Kt?xe(0,oe+4.3,nt+.8,9.1,e-1.1,5.2,e,qt*20+$t):(xe(0,oe+2.35,nt,1.1,e-1.3,2.35,4.4,.22),xe(0,ua,nt+1.6,1.2,e-.35,1.3,2.1,.18)),Kt){const t=(qt?5.2:2.65)*$t,a=Math.min(2.8,(Jt-t-1.2)/2);xe(0,oe+t+a,nt-2.4,2.3,1.2,a,1.75,.2)}else xe(0,oe+4.7+2.8,nt-2.4,2.3,1.2,2.8,1.75,.2);xe(0,3.6,Ne-2.35,1.6,.2,3.4,.95,.08),xe(0,2.6,Ne-.35,4.6,.36,.36,1.3,0),xe(0,2.6,Ne-1.05,5.5,2.15,.62,.16,0)}for(const e of[ae,et])e.on&&(xe(0,oe+.35,e.z+2.4,1.4,1.35,.35,.65,.08),xe(0,oe+.95,e.z+2.4,3.4,1.05,.42,0,0));Ho||xe(-(pe(5,oe)-.75),oe+.35,5,2.4,.2,.38,.2,0),xe(-(pe(37,oe)-.75),oe+.35,37,2.4,.2,.38,.2,0);const Vo=Nt.length,eo=[];for(const e of[ae,et])if(e.on){const t=(e===ae?Ie:Ie-1.2)/D;eo.push([0,(11.5+t)/2,e.z,6,[e.z,t,1,0],Math.hypot((t-11.5)/2+.5,7.6)])}for(let e=21;e<=27;e++){const t=M.slice(e*4,e*4+4),a=e>=25;eo.push([...Rt(t[0],a?.05:0,t[1]),a?8:7,Array.from(t),a?t[2]*1.4:2.4])}const st=new Float32Array(3*24*4);let Ve=[1e9,1e9,1e9],Oe=[-1e9,-1e9,-1e9];Nt.forEach((e,t)=>{const a=Math.hypot(e[4],e[5],e[6])+.4;st.set(e.slice(0,4),t*12),st.set(e.slice(4,8),t*12+4),st[t*12+8]=a;for(let s=0;s<3;s++)Ve[s]=Math.min(Ve[s],e[s]-a),Oe[s]=Math.max(Oe[s],e[s]+a)}),eo.forEach((e,t)=>{const a=Vo+t;st.set([e[0],e[1],e[2],e[3]],a*12),st.set(e[4],a*12+4),st[a*12+8]=e[5]}),Nt.length=Vo+eo.length,p(40,Nt.length,da?24+8*Qe[1]:0,da?2.6+1.6*Qe[2]:-1e3,Ho?8+6*Qe[1]:-1e3),p(42,(Ve[0]+Oe[0])/2,(Ve[1]+Oe[1])/2,(Ve[2]+Oe[2])/2,Vo),p(51,(Oe[0]-Ve[0])/2,(Oe[1]-Ve[1])/2,(Oe[2]-Ve[2])/2,0),p(43,ua+.35,oe+2.6,Kt?oe+(qt?5.2:2.65)*$t+2*Math.min(2.8,(Jt-(qt?5.2:2.65)*$t-1.2)/2)-.9:yn-.9,0),o.pixelStorei(o.UNPACK_ALIGNMENT,4);const pa=Ee(o,3,24,o.RGBA32F,o.RGBA,o.FLOAT,o.NEAREST,o.CLAMP_TO_EDGE,st),me=(()=>{const e=Z[2],t=[-Z[0]*e,-Z[1]*e,1-Z[2]*e],a=Math.hypot(...t);return t.map(s=>s/a)})(),pt=[Z[1]*me[2]-Z[2]*me[1],Z[2]*me[0]-Z[0]*me[2],Z[0]*me[1]-Z[1]*me[0]];let to=1e9,Oo=-1e9,oo=1e9,Go=-1e9,Wo=1e9,Zo=-1e9;for(const e of[-12,23])for(const t of[-2,Math.min(ee,23)])for(const a of[Ne-4,Be+5]){const s=e*me[0]+t*me[1]+a*me[2],c=e*pt[0]+t*pt[1]+a*pt[2],h=e*Z[0]+t*Z[1]+a*Z[2];to=Math.min(to,s),Oo=Math.max(Oo,s),oo=Math.min(oo,c),Go=Math.max(Go,c),Wo=Math.min(Wo,h),Zo=Math.max(Zo,h)}const ao=f>600?1024:512,no=f>600?512:256;p(11,me[0],me[1],me[2],to),p(12,pt[0],pt[1],pt[2],oo),p(13,1/(Oo-to),1/(Go-oo),Zo+1,Wo-1);const xa=[],bn=r()*Q,ma=Q/16,ya=new Set,wn=[0,4,1,5,2,6,3];for(let e=0;e<7;e++){const t=1.7*Math.pow(.8,e)*(.9+.2*r()),a=bn+(wn[e]-3+(r()-.5)*.7)*.43;let s=Math.round(Math.cos(a)*16/t),c=Math.round(Math.sin(a)*16/t);for(;ya.has(s+","+c)||!s&&!c;)c+=1;ya.add(s+","+c);const h=s*ma,l=c*ma,i=Math.hypot(h,l);xa.push({kx:h,kz:l,a:.2/(i*i)*(.7+.6*r()),om:Math.sqrt(9.81*i)*.8,ph:r()*Q})}const gn=v.fl,Ct=v.hf;if(!v.rt[f]){const e=Math.ceil(f/2);v.rt[f]={M:Ye(o,Ee(o,f,f,Ct?o.RGBA16F:o.RGBA8,o.RGBA,Ct?o.HALF_FLOAT:o.UNSIGNED_BYTE,o.LINEAR,o.CLAMP_TO_EDGE),f,f)}}const xt=v.rt[f],zn=Ct?1:.25;p(9,at[0],at[1],at[2],zn);const ba=()=>{const e=v.pool[f]||(v.pool[f]=[]);let t=null;for(const a of e)v.clock-a.used>90&&(!t||a.used<t.used)&&(t=a);if(!t)if(e.length<(f>600?2:16)){const a=Math.ceil(f/2);t={G:Ye(o,Ee(o,f,f,o.RGBA32UI,o.RGBA_INTEGER,o.UNSIGNED_INT,o.NEAREST,o.CLAMP_TO_EDGE),f,f),V:Ye(o,Ee(o,a,a,Ct?o.RGBA16F:o.RGBA8,o.RGBA,Ct?o.HALF_FLOAT:o.UNSIGNED_BYTE,o.LINEAR,o.CLAMP_TO_EDGE),a,a),SH:Ye(o,Ee(o,ao,no,o.R32UI,o.RED_INTEGER,o.UNSIGNED_INT,o.NEAREST,o.CLAMP_TO_EDGE),ao,no),used:0,owner:null},e.push(t)}else t=e.reduce((a,s)=>a.used<s.used?a:s);return t.owner=T,t.used=v.clock,t};let Se=ba(),Xo=!0,Ut=!0,so=0;const co={"Dense school":1024,"Wall of glassfish":1536,"Loose school":512}[V],mt=k(-8.4,8.3,Po-1.6);p(37,mt[0],mt[1],mt[2],0),p(38,V==="Loose school"?2.3:V==="Wall of glassfish"?1.8:2,V==="Wall of glassfish"?1.9:V==="Loose school"?1.3:1.15,V==="Wall of glassfish"?2.6:V==="Loose school"?3.2:2.7,0);const wa=Math.min(M[38*4],M[38*4+1],M[38*4+2])*.75,Mn=Math.PI*(2*Math.min(wa,1)-2*Math.pow(Math.min(wa,1),3)/3)/(4.19*M[38*4]*M[38*4+1]*M[38*4+2])*.65,yt=64,ro=Ua/32,Ce=new Float32Array(yt*ro*4);for(let e=0;e<co;e++){const t=((e>>5)*yt+(e&31)*2)*4;let a,s,c;do a=r()*2-1,s=r()*2-1,c=r()*2-1;while(a*a+s*s+c*c>1);const h=.45+.75*Math.pow(Math.sin(e*12.9898+4.1)*43758.5453%1*.5+.5,1.6),l=Rt(mt[0]+a*M[38*4]*h,mt[1]+s*M[38*4+1]*h,mt[2]+c*M[38*4+2]*h);l[0]>-7.3&&l[0]<-6.1&&(l[0]=-7.4-r()*.3);const i=k(l[0],l[1],l[2]);Ce[t]=i[0],Ce[t+1]=i[1],Ce[t+2]=i[2],Ce[t+3]=r()*Q;const y=(r()-.5)*.5,x=.1+.06*r();Ce[t+4]=Math.cos(y)*x,Ce[t+5]=(r()-.5)*.02,Ce[t+6]=-Math.sin(y)*x*.4-.3*x}const io=[0,1].map(()=>Ye(o,gn?Ee(o,yt,ro,o.RGBA32F,o.RGBA,o.FLOAT,o.NEAREST,o.CLAMP_TO_EDGE,Ce):Ee(o,yt,ro,o.RGBA32UI,o.RGBA_INTEGER,o.UNSIGNED_INT,o.NEAREST,o.CLAMP_TO_EDGE,new Uint32Array(Ce.buffer)),yt,ro));let lo=0,Sn=0;const le=new Float32Array(To*12),Ge=[],ga=(e,t)=>k(e*(pe(t,11.5)-.3),11.65,t);for(const e of[ae,et]){if(!e.on)continue;const t=(e===ae?Ie:Ie-1.2)/D,a=11.5+(t-11.5)*.72,s=k(0,t,e.z);for(const c of[-1,1])for(const h of[-1.7,0,1.7])r()<.2||Ge.push({a:k(c*2.3,a,e.z),b:ga(c,e.z+h),sag:.05,w:.035});Ge.push({a:s,b:k(0,12.2,e.z+(e===ae?-11:12)),sag:.25,w:.04}),Ge.push({hang:!0,a:k(-1.2,a,e.z),len:4+3*r(),w:.04,ph:r()*Q})}{const e=Be-4.5,t=k(-pe(e,10.2)+.1,10.2,e),a=[t[0]-3.5,.05,t[2]+5],s=[t[0]-6,.05,t[2]+14];Ge.push({a:t,b:a,sag:.9,w:.075}),Ge.push({a,b:s,sag:-.05,w:.075})}if(ae.on&&et.on&&Ge.push({a:k(0,Ie/D-.3,ae.z),b:k(0,(Ie-1.2)/D-.3,et.z),sag:1.6,w:.035}),Do)for(let e=0;e<3;e++)Ge.push({a:ga(-1,ae.z-3+e*3),b:[te[0]+(qe[0]-te[0])*(.5+.2*e),te[1]+(qe[1]-te[1])*(.5+.2*e),te[2]+(qe[2]-te[2])*(.5+.2*e)],sag:.4,w:.035});const za=[],Tn={"Soft coral garden":16,"Purple and orange":14,"Yellow whips":34,"Pink bloom":12}[$e?Ro:E];for(let e=0;e<Tn;e++){let t,a;do t=-6+r()*40,a=2.5+r()*8.5;while(Math.abs(t-Po)<3.4&&Math.abs(a-7.8)<2.6);const s=k(-pe(t,a)-.04,a,t),c=-1,h=.5+r()*1.1,l=(r()-.5)*.8,i=Math.hypot(c,h,l),y=[(c*D-h*ce)/i,(c*ce+h*D)/i,l/i],x=E==="Yellow whips"||r()<.45?[.75,.66,.18]:r()<.5?[.78,.26,.1]:[.3,.45,.2];za.push({b:s,d:y,len:.9+r()*1.4,col:x,ph:r()*Q,k:.6+r()*.6})}const Lt=[],Ma=[De-2.5,8];for(let e=0;e<26;e++){const t=r()*Q,a=Math.sqrt(r())*2.4,s=Ma[0]+Math.cos(t)*a,c=Ma[1]+Math.sin(t)*a*1.3;Lt.push({b:[s,Fo(s,c)-.02,c],h:.3+.22*r(),ph:r()*Q,out:1,lag:.5+r()})}let _t=null;if($e){let e=1013904242;for(let b=2;b<n.hash.length;b+=8)e=Math.imul(e^parseInt(n.hash.slice(b,b+8),16),374761393)>>>0;const t=()=>{e=e+1831565813|0;let b=Math.imul(e^e>>>15,1|e);return b=b+Math.imul(b^b>>>7,61|b)^b,((b^b>>>14)>>>0)/4294967296},a=v.nd,s=(b,I)=>{const R=((I&127)*128+(b&127))*4;return[a[R]/255,a[R+1]/255,a[R+2]/255,a[R+3]/255]},c=[],h=M[68],l=M[69],i=M.slice(160,164);for(const b of[-1,1])for(let I=Math.floor((Ne+3)/3.4)-1;I*3.4<Be-5;I++){const R=s(I*43+17+b*13,29+b*5),we=(I+.5)*3.4+(R[0]-.5)*.6*(1-R[3]),wo=Math.max(Math.max(Ne+3-we,we-Be+6),Math.max(i[2]+1.5-Math.abs(we-i[1]),i[3]+2-we)),Ot=b*(pe(we,11.5)-.12),Ko=Ot*D-11.52*ce+7-j,Yo=Ot*ce+11.52*D-1.5-O,Qo=we-K,Jo=Math.exp(-(U[0][0]+U[0][1]+U[0][2])/3*Math.hypot(Ko,Yo,Qo));R[2]<h*1.25&&Math.abs(we-l-.8)>=7&&wo<=0&&Jo>.17&&c.push({o:[b*(pe(we,11.5)-.12),11.52,we],R:1.05+1.6*R[3]*R[3],an:1.15+(R[1]-.5)*.7,sx:b,sd:R[1]*7})}M[75]>.5&&c.push({o:[M[72],M[73],M[74]],R:2.1,an:.45,sx:1,sd:3.3});const y=[.7,.46,.36,.66,.5,.37,.62,.4,.32];let x=0;for(const b of c)x+=502+Math.ceil(900*b.R);const w=new Float32Array(x*12),d=new Float64Array(3200*7),C=new Int32Array(240*96),Y=new Float64Array(240*96),We=new Float64Array(240*96),ke=new Float64Array(3200),Pe=new Float64Array(3200),be=new Float64Array(3200),fe=new Float64Array(3200),Ze=new Float64Array(3200),rt=new Float64Array(3200),xo=new Int32Array(3200);let mo=new Int32Array(3200),yo=new Int32Array(3200),bo=0;for(const b of c){const I=b.R,R=.16*I,we=I*.03,wo=I*.032,Ot=500+900*I,Ko=t()*Q,Yo=t()*Q,Qo=t()*Q,Jo=(t()-.5)*.5,go=.74+.14*t(),Ra=1+(t()*3|0),Mt=new Float64Array(9);for(let X=0;X<Ra;X++){const G=(t()-.5)*1.8,Le=(.35+.4*t())*I;Mt[X*3]=Math.sin(G)*Le/go,Mt[X*3+1]=R+Math.cos(G)*Le,Mt[X*3+2]=(.06+.08*t())*I}const $o=(b.sd*3.1|0)%3*3;C.fill(0);let St=0;d[0]=0,d[1]=0,d[2]=0,d[3]=R,d[4]=.065*Math.sqrt(I),d[5]=.05*Math.sqrt(I),d[6]=0,St=1;let ka=0,zo=0;const Pa=4+(t()*3|0);for(let X=0;X<Pa;X++){const G=ka++;ke[G]=0,Pe[G]=R,be[G]=((X+.5)/Pa-.5)*1.9+(t()-.5)*.35,fe[G]=.032*Math.sqrt(I),Ze[G]=0,rt[G]=Math.atan2(0,.001),xo[G]=0,mo[zo++]=G}for(;zo&&St<Ot;){let X=0;for(let Le=0;Le<zo&&!(St>=Ot);Le++){const P=mo[Le],Fe=ke[P],_e=Pe[P],Xe=rt[P],Gt=be[P],je=Gt+((t()-.5)*.55+(Xe-Gt)*.05);be[P]=je;const Te=Fe+Math.sin(je)*we/go,Ae=_e+Math.cos(je)*we,ge=Math.atan2(Te*go,Ae-R+.001),Mo=Math.hypot(Te*go,Ae-R);if(Math.abs(ge)>1.45||Mo>I*(1.02+.17*Math.sin(2.1*ge+Ko)+.11*Math.sin(3.7*ge+Yo)+.07*Math.sin(6.3*ge+Qo))*(1-.28*ge*ge)*(1+Jo*ge)*(.84+.3*t())||Ae<R*.7)continue;let it=!1;for(let ne=0;ne<Ra;ne++){const ze=ne*3;if(Math.hypot(Te-Mt[ze],Ae-Mt[ze+1])<Mt[ze+2]){it=!0;break}}if(it)continue;const Tt=(Math.floor(Te/wo)+120)*96+Math.floor(Ae/wo),ea=C[Tt]-1,Wt=fe[P],So=Ze[P];if(ea>=0&&ea!==P&&xo[P]>2){const ne=St++*7;if(d[ne]=Fe,d[ne+1]=_e,d[ne+2]=Y[Tt],d[ne+3]=We[Tt],d[ne+4]=Wt,d[ne+5]=Wt,d[ne+6]=So,t()<.85)continue}const lt=St++*7;if(d[lt]=Fe,d[lt+1]=_e,d[lt+2]=Te,d[lt+3]=Ae,d[lt+4]=Wt,d[lt+5]=Wt*.985,d[lt+6]=So,ea<0&&(C[Tt]=P+1,Y[Tt]=Te,We[Tt]=Ae),ke[P]=Te,Pe[P]=Ae,rt[P]=ge,fe[P]=Math.max(Wt*.988,.009),xo[P]++,t()<.34){const ne=t()<.5?-1:1,ze=ka++;ke[ze]=Te,Pe[ze]=Ae,be[ze]=je+ne*(.45+.55*t()),fe[ze]=Math.max(fe[P]*.8,.009),Ze[ze]=So+1,rt[ze]=ge,xo[ze]=0,yo[X++]=ze,be[P]=je-ne*.14,fe[P]=Math.max(fe[P]*.92,.009),Ze[P]=So+.5}yo[X++]=P}const G=mo;mo=yo,yo=G,zo=X}const Dn=Math.cos(b.an),Hn=Math.sin(b.an),Fa=(b.sd*3.7%1-.5)*.7,Na=Math.cos(Fa),qa=Math.sin(Fa),Vn=b.sx*Dn,On=b.o[0],Gn=b.o[1],Wn=b.o[2];for(let X=0;X<St;X++){const G=X*7,Le=d[G+6],P=Math.min(Le/5,1),Fe=Le>3?.3:0,_e=bo++*12;for(let Xe=0;Xe<2;Xe++){const Gt=d[G+Xe*2],je=d[G+Xe*2+1],Te=Gt*Na+je*qa,Ae=-Gt*qa+je*Na,ge=On+Vn*Te,Mo=Gn+Ae,it=_e+Xe*4;w[it]=ge*D-Mo*ce+7,w[it+1]=ge*ce+Mo*D-1.5,w[it+2]=Wn+Hn*Te,w[it+3]=d[G+4+Xe]}w[_e+8]=y[$o]*(.62+.5*P)*(1-Fe)+.62*Fe,w[_e+9]=y[$o+1]*(.62+.5*P)*(1-Fe)+.57*Fe,w[_e+10]=y[$o+2]*(.62+.5*P)*(1-Fe)+.5*Fe,w[_e+11]=1}}const In=w.subarray(0,bo*12);if(bo){const b=o.createVertexArray(),I=o.createBuffer();o.bindVertexArray(b),o.bindBuffer(o.ARRAY_BUFFER,I),o.bufferData(o.ARRAY_BUFFER,In,o.STATIC_DRAW);for(let R=0;R<3;R++)o.enableVertexAttribArray(R),o.vertexAttribPointer(R,4,o.FLOAT,!1,48,R*16),o.vertexAttribDivisor(R,1);o.bindVertexArray(null),_t={a:b,b:I,n:bo}}}let It=0;const fo=(e,t,a,s,c,h)=>{if(It>=To)return;const l=It++*12;le[l]=e[0],le[l+1]=e[1],le[l+2]=e[2],le[l+3]=a,le[l+4]=t[0],le[l+5]=t[1],le[l+6]=t[2],le[l+7]=s,le[l+8]=c[0],le[l+9]=c[1],le[l+10]=c[2],le[l+11]=h},Sa=[.08,.07,.06],An=(e,t,a)=>{It=0;const s=Math.hypot(t,a);for(const i of Ge){let y=i.a.slice();if(i.hang){for(let x=1;x<=10;x++){const w=x/10,d=Math.sin(e*.4+i.ph+w*2)*.25*w,C=[i.a[0]-.3*w+d*.4+t*3*w*w,i.a[1]-i.len*w*(1-.12*s),i.a[2]+d+a*3*w*w];fo(y,C,i.w,i.w,Sa,1),y=C}continue}for(let x=1;x<=12;x++){const w=x/12,d=4*w*(1-w),C=Math.sin(e*.3+i.a[2]*.1)*.06*d,Y=[i.a[0]+(i.b[0]-i.a[0])*w+(t*1.5*i.sag+C)*d,i.a[1]+(i.b[1]-i.a[1])*w-i.sag*d,i.a[2]+(i.b[2]-i.a[2])*w+a*1.5*i.sag*d];fo(y,Y,i.w,i.w,Sa,1),y=Y}}for(const i of za){let y=i.b.slice();const x=10,w=i.len/x;for(let d=1;d<=x;d++){const C=d/x,Y=Math.sin(e*(.7+.2*i.k)+i.ph-C*1.5)*.12*C;let We=i.d[0]+t*2.2*i.k*C+Y*.3,ke=i.d[1]+.5*C,Pe=i.d[2]+a*2.2*i.k*C+Y;const be=Math.hypot(We,ke,Pe)/w,fe=[y[0]+We/be,y[1]+ke/be,y[2]+Pe/be];fo(y,fe,.014*(1-.6*(C-1/x)),.014*(1-.6*C),i.col,1),y=fe}}let c=-t,h=-a;const l=Math.hypot(c,h);l<.02?(c=.35,h=-.94):(c/=l,h/=l);for(const i of Lt){const y=i.h*i.out;if(y<.02)continue;let x=i.b.slice();const w=8,d=(y+.06)/w;for(let C=1;C<=w;C++){const Y=C/w,We=Math.sin(e*1.3+i.ph+Y*3)*.15*Y,ke=Y*Y*Y*2.2;let Pe=c*ke+We*h-t*.5*Y,be=1,fe=h*ke-We*c-a*.5*Y;const Ze=Math.hypot(Pe,be,fe)/d,rt=[x[0]+Pe/Ze,x[1]+be/Ze,x[2]+fe/Ze];fo(x,rt,.018,C===w?.02:.017,C===w?[.45,.4,.3]:[.62,.58,.48],1),x=rt}}},jo=[],En=ve!=="Turtle",Bn=ve!=="Batfish";if(En)for(let e=0,t=Bn?7+(r()*3|0):3+(r()*3|0);e<t;e++)jo.push({u:(r()-.5)*4,v:(r()-.5)*2.4,w:(r()-.5)*4,du:.2+.06*r(),dv:(r()-.5)*.03,ph:r()*Q,s:.09+.02*r()});const Rn=17+6*r(),kn=-6-6*r(),Pn=.1+.12*r(),Ue=new Float32Array((Zt+8)*8),ct=[],Dt=[];let Fn=0;const Nn=(e,t)=>{const a=(e*2-1)*Re,s=((1-t)*2-1)*Re,c=[m.fw[0]+m.rt[0]*a+m.up[0]*s,m.fw[1]+m.rt[1]*a+m.up[1]*s,m.fw[2]+m.rt[2]*a+m.up[2]*s],h=Math.hypot(...c);c[0]/=h,c[1]/=h,c[2]/=h;let l=.3,i=0;for(;l<14;l+=.1){const y=[m.x+c[0]*l,m.y+c[1]*l,m.z+c[2]*l];if(y[1]<Fo(y[0],y[2])+.05){i=1;break}const x=Rt(y[0],y[1],y[2]);if(x[1]>0&&x[1]<11.5&&x[0]>-pe(x[2],x[1])-.1&&x[0]<0){i=2;break}}return i||(l=5),l=Math.min(Math.max(.6,l-.25),7),[m.x+c[0]*l,m.y+c[1]*l,m.z+c[2]*l]},Ta=(e,t)=>{const a=Nn(e,t),s={x:a[0],y:a[1],z:a[2],left:2.1,acc:0,id:Fn++,y0:a[1],y1:a[1],live:!0};Dt.push(s),Dt.length>4&&Dt.shift(),n.sound.hit("noise",.3,{cutoff:900,dur:1.5});for(const c of Lt){const h=Math.hypot(c.b[0]-a[0],c.b[2]-a[2]);h<4.5&&(c.out=Math.min(c.out,h/4.5*.3))}},qn=e=>{for(const t of Dt){if(t.left>0)for(t.left-=e,t.acc+=e*44;t.acc>=1&&ct.length<Zt;){t.acc-=1;const a=r()<.07,s=a?.006+.004*r():9e-4+.0035*r()*r();ct.push({x:t.x+(r()-.5)*.06,y:t.y+(r()-.5)*.04,z:t.z+(r()-.5)*.06,r0:s,r:s,d0:ee-t.y,ph:r()*Q,age:0,e:t,cap:a}),r()<.12&&n.sound.hit("blip",.05+.1*Math.min(1,s/.005),{freq:he(3.26/s,300,2600)})}t.y0=1e9,t.y1=-1e9}for(let t=ct.length-1;t>=0;t--){const a=ct[t];a.age+=e;const s=ee-a.y;a.r=a.r0*Math.cbrt((10+a.d0)/(10+Math.max(s,0)));const c=a.cap?Math.min(.36,.711*Math.sqrt(9.81*2*a.r)*1.1):he(.12+55*a.r,.1,.3);a.ph+=e*(a.cap?7:11);const h=a.r>.0011?.07:.015;a.y+=c*e,a.x+=(Math.cos(a.ph)*h*.5+wt*.9)*e,a.z+=(Math.sin(a.ph*.7)*h*.5+gt*.9)*e;const l=Rt(a.x,a.y,a.z);if(l[1]>.5&&l[1]<11.45&&l[0]<0){const y=pe(l[2],l[1]);if(l[0]>-y-a.r-.02){const x=k(-y-a.r-.02,l[1],l[2]);a.x=x[0],a.y=x[1]}}if(a.y>ee-.05){ct.splice(t,1);continue}const i=a.e;i.y0=Math.min(i.y0,a.y),i.y1=Math.max(i.y1,a.y)}for(let t=0;t<4;t++){const a=Dt[t];a&&a.y1>a.y0?p(33+t,a.x,a.z,a.y0,a.y1):p(33+t,0,0,1,0)}},m={x:j,y:O,z:K,fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},bt={fw:[Math.sin(re),0,Math.cos(re)],rt:[Math.cos(re),0,-Math.sin(re)]};let Aa="";const Cn=()=>{const e=n.view||Ca,t=re+(e.yaw||0),a=he(tt+(e.pitch||0),-1.45,1.45);m.x=j+he(e.x||0,-4,1.8),m.y=Math.min(O+he(e.y||0,-3.5,4),ee-1.2),m.z=K+he(e.z||0,-5,5);const s=[Math.sin(t)*Math.cos(a),Math.sin(a),Math.cos(t)*Math.cos(a)],c=Math.hypot(s[2],s[0])||1,h=[s[2]/c,0,-s[0]/c];m.fw=s,m.rt=h,m.up=[s[1]*h[2]-s[2]*h[1],s[2]*h[0]-s[0]*h[2],s[0]*h[1]-s[1]*h[0]];const l=[m.x,m.y,m.z,t,a].map(i=>i.toFixed(4)).join(",");l!==Aa&&(Aa=l,Ut=!0)};let F=null,wt=0,gt=0,Ht=0,zt=0,ho=0,vo=0;const Vt=[0,0,0],Un=e=>{const t=n.input,a=t.taps();for(const s of a)F?t.down||Ta(s.x,s.y):F={x:s.x,y:s.y,lx:s.x,ly:s.y,t:0,moved:!1,held:!1};if(F)if(F.t+=e,t.down){const s=t.x-F.x,c=t.y-F.y;if(!F.moved&&!F.held&&Math.hypot(s,c)>.035&&(F.moved=!0,n.sound.hit("noise",.22,{cutoff:260,dur:2.6})),F.moved){const h=t.x-F.lx,l=t.y-F.ly,i=h*m.rt[0]-l*m.fw[0],x=h*m.rt[2]-l*m.fw[2];Ht=he(Ht+x*1.2+i*.2,-.32,.32)}!F.moved&&!F.held&&F.t>.45&&(F.held=!0,n.sound.note(33,{dur:3.5,vel:.1,wave:"sine",attack:1.2})),F.held&&(ho=1,vo=3.5),F.lx=t.x,F.ly=t.y}else!F.moved&&!F.held&&Ta(F.x,F.y),F=null};let uo=0,po=0;const Ln=e=>{uo+=e,gt+=(Ht-gt)*Math.min(1,e*1.2),wt+=(Ht*.15-wt)*Math.min(1,e*1.2),Ht*=Math.exp(-e/7),vo>0&&(vo-=e,vo<=0&&(ho=0)),zt+=(ho-zt)*Math.min(1,e*(ho>zt?.22:.3)),Vt[0]+=wt*e,Vt[2]+=gt*e;for(const t of Lt)t.out=Math.min(1,t.out+e*.12/t.lag);for(const t of ct)for(const a of Lt)Math.abs(t.x-a.b[0])<.6&&Math.abs(t.z-a.b[2])<.6&&t.y-a.b[1]<1.2&&(a.out=Math.min(a.out,.2));qn(e);for(const t of jo)t.u+=t.du*e,t.v+=t.dv*e},L=(e,t)=>{o.activeTexture(o.TEXTURE0+e),o.bindTexture(o.TEXTURE_2D,t)},ye=(e,t,a,s)=>{const c=v.use(e);return o.bindFramebuffer(o.FRAMEBUFFER,t?t.fb:null),o.viewport(0,0,a,s),o.useProgram(c.p),M[1*4+3]=a,o.uniform4fv(c.uP,M),c},_n=()=>{for(let e=0;e<8;e++)L(e,null)},Ea=e=>{v.clock++,Se.owner!==T&&(Se=ba(),Xo=!0,Ut=!0),Ut&&(so=0),Se.used=v.clock,Cn(),p(0,m.x,m.y,m.z,Re),p(1,m.fw[0],m.fw[1],m.fw[2],f),p(2,m.rt[0],m.rt[1],m.rt[2],uo%600),p(3,m.up[0],m.up[1],m.up[2],ee),M[4*4+3]=_o*(1-.72*zt),M[5*4+3]=vn*(1-.3*zt),M[8*4+3]=ha*(1-.75*zt),p(14,ao,no,wt,gt),p(39,Vt[0],Vt[1],Vt[2],0);for(let s=0;s<7;s++){const c=xa[s];p(44+s,c.kx,c.kz,c.a,(c.ph-c.om*uo)%Q)}if(o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),o.bindVertexArray(v.vao),_n(),L(0,v.tN),L(7,pa),Xo&&(M[10*4+3]=1,ye(ia,Se.SH,ao,no),o.drawArrays(o.TRIANGLES,0,3),M[10*4+3]=0,Xo=!1),L(6,Se.SH.tex),Ut){const s=1<<Math.max(0,Math.ceil(Math.log2(f/4))),c=Math.max(s,Math.min(f,256));if(L(4,null),!v.T||v.T.w<f||v.T.h<c){v.T&&(o.deleteFramebuffer(v.T.fb),o.deleteTexture(v.T.tex));const i=Math.max(f,v.T?v.T.w:0),y=Math.max(c,v.T?v.T.h:0);v.T=Ye(o,Ee(o,i,y,o.RGBA32UI,o.RGBA_INTEGER,o.UNSIGNED_INT,o.NEAREST,o.CLAMP_TO_EDGE),i,y)}const h=v.T,l=h.h>=f?f:1<<Math.floor(Math.log2(h.h));L(4,null),o.enable(o.SCISSOR_TEST);for(let i=0;i<f;i+=l)ye(ia,h,f,f),o.viewport(0,-i,f,f),o.scissor(0,0,f,l),o.drawArrays(o.TRIANGLES,0,3),L(5,h.tex),M[33*4]=i,ye(cn,Se.G,f,f),o.scissor(0,i,f,l),o.drawArrays(o.TRIANGLES,0,3),L(5,null),M[33*4]=0;o.disable(o.SCISSOR_TEST),Ut=!1}L(7,null);for(let s=0;s<e;s++)p(32,1/30,Sn++&65535,co,Mn),L(4,io[lo].tex),ye("sim",io[lo^1],yt,Math.ceil(co/32)),o.drawArrays(o.TRIANGLES,0,3),lo^=1;L(4,null),ye("cau",v.C,ft,ft),o.drawArrays(o.TRIANGLES,0,3),L(1,v.C.tex),o.generateMipmap(o.TEXTURE_2D),L(5,Se.G.tex),M[51*4+3]=so&4095,ye("vol",Se.V,Se.V.w,Se.V.h),o.enable(o.BLEND),o.blendColor(0,0,0,so?1/12:1),o.blendFunc(o.CONSTANT_ALPHA,o.ONE_MINUS_CONSTANT_ALPHA),o.drawArrays(o.TRIANGLES,0,3),o.disable(o.BLEND),so++,L(2,Se.V.tex),ye("comp",xt.M,f,f),o.drawArrays(o.TRIANGLES,0,3),L(2,null),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),An(uo,wt,gt),ye("line",xt.M,f,f),o.bindVertexArray(v.L.a),o.bindBuffer(o.ARRAY_BUFFER,v.L.b),o.bufferSubData(o.ARRAY_BUFFER,0,le.subarray(0,It*12)),o.drawArraysInstanced(o.TRIANGLES,0,6,It),_t&&(o.bindVertexArray(_t.a),o.drawArraysInstanced(o.TRIANGLES,0,6,_t.n)),L(4,io[lo].tex),ye("fish",xt.M,f,f),o.bindVertexArray(v.vao),o.drawArraysInstanced(o.TRIANGLES,0,6,co),L(4,null);let t=0;const a=(s,c,h,l,i,y,x,w)=>{const d=t++*8;Ue[d]=s,Ue[d+1]=c,Ue[d+2]=h,Ue[d+3]=l,Ue[d+4]=i,Ue[d+5]=y,Ue[d+6]=x,Ue[d+7]=w};for(const s of jo){const c=Rn+s.w,h=kn+s.u,l=Math.min(O+Pn*c+s.v,ee-2);a(j+bt.fw[0]*c+bt.rt[0]*h,l,K+bt.fw[2]*c+bt.rt[2]*h,s.s*Re/.67,1,Math.atan2(bt.rt[0],bt.rt[2]),0,1)}for(const s of ct)t<Zt+8&&a(s.x,s.y,s.z,s.cap?s.r*1.3:s.r,s.cap?3:0,0,s.ph,Math.min(1,s.age*6));t&&(ye("spr",xt.M,f,f),o.bindVertexArray(v.SP.a),o.bindBuffer(o.ARRAY_BUFFER,v.SP.b),o.bufferSubData(o.ARRAY_BUFFER,0,Ue.subarray(0,t*8)),o.drawArraysInstanced(o.TRIANGLES,0,6,t)),o.blendFunc(o.ONE,o.ONE),ye("mote",xt.M,f,f),o.bindVertexArray(v.vao),o.drawArrays(o.POINTS,0,La),o.disable(o.BLEND),o.flush(),L(5,null),L(6,null),L(3,xt.M.tex),ye("fin",null,f,f),o.drawArrays(o.TRIANGLES,0,3),L(3,null),o.bindVertexArray(null)};Ea(0);const Ba=(e,t)=>{t=Math.min(t||1/30,.1),Un(t),po+=t;let a=0;for(;po>=1/30&&a<4;)Ln(1/30),po-=1/30,a++;a===4&&(po=0),Ea(a)};return sa&&sa.register(Ba,{gl:o,st:io.concat([{tex:pa,fb:null}]),fb:_t}),Ba}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
