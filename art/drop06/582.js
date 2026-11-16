// Shipwreck: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/582.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ea){ea&&function(){"use strict";const Ca={yaw:0,pitch:0,x:0,y:0,z:0},ve=(a,o,h)=>a<o?o:a>h?h:a,ta=0,St={"0x7b858adc":{gr:"Sea fans"},"0xbea2fff2":{li:"Late gold"},"0x40cd3db8":{sh:"Broken in two",st:"Beside the hull"}},J=Math.PI*2,oa=52,ft=512,Ua=1536,La=3e3,Gt=320,Ao=900,To=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp usampler2D;
`,je=`out vec2 vUV;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUV = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,Wt=`
uniform vec4 uP[${oa}];
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
}`,Va=`
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
}`,Ha=`
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
}`;function $a(a,o,h){let d=Math.imul(a^2654435769,2246822507)^Math.imul(o+2135587861,3266489909)^Math.imul(h+374761393,668265263);return d^=d>>>15,d=Math.imul(d,739982445),d^=d>>>12,d=Math.imul(d,695872825),d^=d>>>15,(d>>>0)/4294967296}const aa=a=>a*a*a*(a*(a*6-15)+10);function en(){const h=new Uint8Array(65536),d=new Float32Array(16*16),T=new Float32Array(16*16);for(let r=0;r<4;r++){for(let b=0;b<16*16;b++){const q=$a(b,r,23)*J;d[b]=Math.cos(q),T[b]=Math.sin(q)}for(let b=0;b<128;b++){const q=(b+.5)/128*16,E=Math.floor(q),N=q-E,de=aa(N),I=E%16*16,oe=(E+1)%16*16;for(let ce=0;ce<128;ce++){const M=(ce+.5)/128*16,A=Math.floor(M),R=M-A,H=aa(R),m=A%16,W=(A+1)%16,D=d[I+m]*R+T[I+m]*N,At=d[I+W]*(R-1)+T[I+W]*N,Zt=d[oe+m]*R+T[oe+m]*(N-1),Eo=d[oe+W]*(R-1)+T[oe+W]*(N-1),j=D+(At-D)*H,ae=j+(Zt+(Eo-Zt)*H-j)*de;h[(b*128+ce)*4+r]=ve(Math.round((ae*.85+.5)*255),0,255)}}}return h}function Te(a,o,h,d,T,r,b,q,E){const N=a.createTexture();return a.bindTexture(a.TEXTURE_2D,N),a.texImage2D(a.TEXTURE_2D,0,d,o,h,0,T,r,E||null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,b),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,b===a.LINEAR_MIPMAP_LINEAR?a.LINEAR:b),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,q),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,q),N}function Ke(a,o,h,d){const T=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,T),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,o,0),a.bindFramebuffer(a.FRAMEBUFFER,null),{tex:o,fb:T,w:h,h:d}}const tn=["uN","uC","uV","uM","uS","uG","uSH","uK"],na=typeof FinalizationRegistry=="function"?new FinalizationRegistry(a=>{a=a();try{for(const o of a.st)a.gl.deleteTexture(o.tex),a.gl.deleteFramebuffer(o.fb);a.fb&&(a.gl.deleteBuffer(a.fb.b),a.gl.deleteVertexArray(a.fb.a))}catch{}}):null;function on(a,o){if(a.__c582)return a.__c582;const h=!!a.getExtension("EXT_color_buffer_float"),d=h||!!a.getExtension("EXT_color_buffer_half_float"),T=(M,A)=>{const R=a.createShader(M);return a.shaderSource(R,A),a.compileShader(R),R},r={trc:[je,_a],shd:[je,Ia],cau:[je,Da],vol:[je,Va],comp:[je,Ha],fin:[je,Ja],sim:[je,Xa],line:[Oa,Ga],fish:[Wa,Za],spr:[ja,Ka],mote:[Ya,Qa]},b={},q=(M,A)=>{const R=M+"|"+A;if(!b[R]){const H=a.createProgram(),m=T(a.VERTEX_SHADER,To+A+Wt+r[M][0]),W=T(a.FRAGMENT_SHADER,To+A+Wt+r[M][1]);a.attachShader(H,m),a.attachShader(H,W),a.linkProgram(H),A&&a.flush(),b[R]={p:H,v:m,f:W}}return R};for(const M in r){if(M==="trc"||M==="shd"){q(M,o);continue}const A=To+(!h&&(M==="sim"||M==="fish")?`#define SIMU 1
`:""),R=a.createProgram(),H=T(a.VERTEX_SHADER,A+Wt+r[M][0]),m=T(a.FRAGMENT_SHADER,A+Wt+r[M][1]);a.attachShader(R,H),a.attachShader(R,m),a.linkProgram(R),b[M]={p:R,v:H,f:m}}a.flush();const E=en();a.pixelStorei(a.UNPACK_ALIGNMENT,1);const N=Te(a,128,128,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR_MIPMAP_LINEAR,a.REPEAT,E);a.generateMipmap(a.TEXTURE_2D);const de=M=>{if(!("uP"in b[M])){const{p:A,v:R,f:H}=b[M];if(!a.getProgramParameter(A,a.LINK_STATUS))throw new Error("582 "+M+": "+(a.getShaderInfoLog(R)||"")+(a.getShaderInfoLog(H)||"")+a.getProgramInfoLog(A));a.useProgram(A),tn.forEach((m,W)=>{const D=a.getUniformLocation(A,m);D&&a.uniform1i(D,W)}),b[M]={p:A,uP:a.getUniformLocation(A,"uP")}}return b[M]},I=a.createVertexArray(),oe=(M,A)=>{const R=a.createVertexArray(),H=a.createBuffer();a.bindVertexArray(R),a.bindBuffer(a.ARRAY_BUFFER,H),a.bufferData(a.ARRAY_BUFFER,M*4*A,a.DYNAMIC_DRAW);for(let m=0;m<M/4;m++)a.enableVertexAttribArray(m),a.vertexAttribPointer(m,4,a.FLOAT,!1,M*4,m*16),a.vertexAttribDivisor(m,1);return a.bindVertexArray(null),{a:R,b:H}},ce=Ke(a,Te(a,ft,ft,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR_MIPMAP_LINEAR,a.REPEAT),ft,ft);return a.bindTexture(a.TEXTURE_2D,ce.tex),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAX_LEVEL,6),a.generateMipmap(a.TEXTURE_2D),a.__c582={P:b,use:de,variant:q,fl:h,hf:d,nd:E,tN:N,vao:I,C:ce,L:oe(12,Ao),SP:oe(8,Gt+8)}}const sa=(a,o,h,d)=>{const T=o*128-.5,r=h*128-.5,b=Math.floor(T),q=Math.floor(r),E=T-b,N=r-q,de=(I,oe)=>a[((oe&127)*128+(I&127))*4+d]/255;return(de(b,q)*(1-E)+de(b+1,q)*E)*(1-N)+(de(b,q+1)*(1-E)+de(b+1,q+1)*E)*N};ea.add({num:582,name:"Shipwreck",fam:"Vistas",recipe:"An old cargo ship lying on the sand in the clear Red Sea, mostly around midday, grown over with soft corals, with sunbeams through the rigging and batfish far off in the haze. Where you hover, the ship, how far it leans and the fish change every mint. Tap to breathe out bubbles that slide up the hull and part the school, drag to send a current along the wreck, or hold to let a cloud drift over the sun until the light slowly comes back.",interactive:"Tap a spot to breathe out bubbles there: they rise at their real speeds in silver strings, growing as the pressure falls, sliding up the overhanging hull, and the glassfish school parts around them. Drag to send a current along the wreck: the school, the whip corals, the garden eels and the slack rigging lean and flow. Hold to let a cloud drift over the sun: the beams fade and the blue deepens, then the light comes slowly back.",music:!0,gl:!0,fps:30,seed:0,make(a){const o=a.gl,h=a.size;let d=null,T=2654435769;for(let e=2;e<a.hash.length;e+=8)T=Math.imul(T^parseInt(a.hash.slice(e,e+8),16),2246822507)>>>0;const r=()=>{T=T+1831565813|0;let e=Math.imul(T^T>>>15,1|T);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},b=e=>{let t=0;for(const s in e)t+=e[s];let n=r()*t;for(const s in e)if(n-=e[s],n<0)return s;return Object.keys(e)[0]};let q=b({"Listing to port":45,Upright:35,"Heeled over":20}),E=b({"Soft coral garden":45,"Purple and orange":25,"Yellow whips":18,"Pink bloom":12}),N=b({"Dense school":50,"Wall of glassfish":18,"Loose school":32}),de=b({"Turtle and batfish":35,Batfish:35,Turtle:30}),I=b({"Red Sea blue":50,Turquoise:25,"Plankton haze":17,"Gin clear":8}),oe=b({"Late morning":45,"High noon":35,"Low sun":20}),ce=b({"Two masts":50,"One mast":30,"Fallen mast":20}),M=b({"Twenty metres":50,"Sixteen metres":30,"Twenty-eight metres":20});a.home&&(q="Listing to port",E="Soft coral garden",N="Dense school",de="Turtle and batfish",I="Red Sea blue",oe="Late morning",ce="Two masts",M="Twenty metres");let A=625341585;for(let e=2;e<a.hash.length;e+=8)A=Math.imul(A^parseInt(a.hash.slice(e,e+8),16),3266489909)>>>0;const R=()=>{A=A+1831565813|0;let e=Math.imul(A^A>>>15,1|A);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},H={"Beside the hull":56,"Over the rail":28,"At the hull's foot":16};let m="Beside the hull";{let e=R()*100;for(const t in H)if(e-=H[t],e<0){m=t;break}}a.home&&(m="Beside the hull");let W=1779033703;for(let e=2;e<a.hash.length;e+=8)W=Math.imul(W^parseInt(a.hash.slice(e,e+8),16),668265263)>>>0;const D=()=>{W=W+1831565813|0;let e=Math.imul(W^W>>>15,1|W);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},At=e=>{let t=0;for(const s in e)t+=e[s];let n=D()*t;for(const s in e)if(n-=e[s],n<0)return s;return Object.keys(e)[0]},Zt=D(),Eo=At({"Under the stern":0,"Off the bow":22,"Far across the sand":20,"Up the mast":18,"Above the deck":16});let j=At({"Bridge amidships":38,"Bridge aft":32,"Broken in two":20,"Bow section only":10}),ae=At({"Sun across":40,"Into the sun":22,"Sun at your back":16,"Late gold":13,Overcast:9});const u=[D(),D(),D(),D(),D()],Ye=[D(),D(),D(),D()],ht=[D(),D()];let Qe=3144134277;for(let e=2;e<a.hash.length;e+=8)Qe=Math.imul(Qe^parseInt(a.hash.slice(e,e+8),16),2654435761)>>>0;const ze=()=>{Qe=Qe+1831565813|0;let e=Math.imul(Qe^Qe>>>15,1|Qe);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Bo=ze(),an=ze(),Xn=ze(),jn=ze(),nn=ze(),Tt=[ze(),ze(),ze(),ze(),ze(),ze()];let Et="";const Ro=E;if(a.home||(Bo<.14?E="Table corals":Bo>=.55&&Bo<.7&&(E="Sea fans")),a.home?(j="Bridge amidships",ae="Sun across"):m==="Beside the hull"&&Zt<.5&&(m=Eo),j==="Bow section only"&&(m==="Under the stern"||m==="Up the mast")&&(m="Off the bow"),!a.home&&ae==="Sun across"&&nn<.1&&(ae="Late gold"),ta&&St[a.hash.slice(0,10)]){const e=St[a.hash.slice(0,10)];e.gr&&(E=e.gr),e.st&&(m=e.st),e.sh&&(j=e.sh),e.li&&(ae=e.li),e.wa&&(I=e.wa)}a.trait("Wreck",q),a.trait("Growth",E),a.trait("Glassfish",N),a.trait("Water",I),a.trait("Masts",ce),a.trait("Depth",M),!a.home&&an<.11&&(j==="Bridge amidships"||j==="Bridge aft")&&(Et="Ribs open to the light"),ta&&St[a.hash.slice(0,10)]&&St[a.hash.slice(0,10)].sn&&(Et=St[a.hash.slice(0,10)].sn),a.trait("Standpoint",m),a.trait("Ship",Et||j),a.trait("Light",ae==="Sun across"?oe:ae);const ca=E==="Table corals",Je=E==="Sea fans",sn=Et==="Ribs open to the light",Xt=!a.home&&j!=="Bow section only",Po=(ca?`#define FORM 1
`:"")+(sn?`#define RIBS 1
`:"")+(Xt?`#define HOUSE 1
`:"");d=on(o,Po);const ra=d.variant("trc",Po),cn=d.variant("shd",Po),S=new Float32Array(oa*4),p=(e,t,n,s,c)=>{S[e*4]=t,S[e*4+1]=n,S[e*4+2]=s,S[e*4+3]=c},$={"Twenty metres":20,"Sixteen metres":16,"Twenty-eight metres":28}[M],ia={"Listing to port":11,Upright:2.5,"Heeled over":23}[q]*Math.PI/180,V=Math.cos(ia),re=Math.sin(ia),Fe=-15,Ee=64,ko=12.5,P=(e,t,n)=>[e*V-t*re+7,e*re+t*V-1.5,n],Bt=(e,t,n)=>{const s=e-7,c=t+1.5;return[s*V+c*re,-s*re+c*V,n]},ue=(e,t)=>{const n=ve(t/11.5,0,1),s=Ee+3*n,c=Fe-2.2*n;return 6.8*Math.sqrt(ve((s-e)/18,0,1))*Math.sqrt(ve((e-c)/5,0,1))},Fo=(e,t)=>{const n=d.nd;return(sa(n,e*.011,t*.011,0)-.5)*1.3+(sa(n,e*.047+.31,t*.047+.31,1)-.5)*.35};p(15,V,re,Fe,Ee);const rn={"Soft coral garden":1,"Purple and orange":.9,"Yellow whips":.6,"Pink bloom":1.1,"Table corals":.55}[Je?Ro:E]*(Je?.8:1);p(16,ko,rn,2.2,0),{"Soft coral garden":[[.5,.2,.55],[.9,.5,.16],[.82,.76,.3],[.92,.42,.6]],"Purple and orange":[[.5,.18,.58],[.95,.42,.12],[.6,.2,.5],[.92,.55,.18]],"Yellow whips":[[.85,.74,.24],[.62,.56,.2],[.9,.45,.14],[.5,.2,.52]],"Pink bloom":[[.95,.45,.6],[.85,.32,.5],[.55,.2,.55],[.95,.7,.72]],"Table corals":[[.62,.4,.22],[.5,.44,.3],[.46,.3,.4],[.7,.5,.3]]}[Je?Ro:E].forEach((e,t)=>p(28+t,e[0],e[1],e[2],0));const _e=Math.min($-1.8,21.5)+1.5,ne={z:17,on:ce!=="Fallen mast"},$e={z:43,on:ce!=="One mast"},vt=e=>{const t=(e+1.5+6.8*re)/V;return-6.8*V-t*re+7},la=8.5,Ie=vt(la)-5;let Be=Math.tan(34*Math.PI/180),K=Ie,O=la,Y=0,ie=.25,et=.08;const De=(e,t)=>{const n=e[0]-K,s=e[1]-O,c=e[2]-Y;ie=Math.atan2(n,c),et=Math.atan2(s,Math.hypot(n,c))+(t||0)},No=$e.on?$e:ne,ln=(No===ne?_e:_e-1.2)/V,qo=(j==="Bridge amidships"?44:24)+3*Tt[1];if(m==="Beside the hull"&&!a.home){const e=Et&&q!=="Heeled over",t=u[2]>.62&&!e,n=e?qo-12-5*u[2]:t?22+20*u[2]:-4+30*u[2];if(O=4.5+5.5*u[1],K=vt(O)-(4.5+4.5*u[0])*(I==="Plankton haze"?.6:1),Y=n,ie=t?Math.PI-.06-.3*u[3]:.08+.3*u[3],et=-.04+.26*u[4],e&&(K=vt(O)-4-3*u[0],De(P(-4.5,5.5+2*u[4],qo+1+3*u[3]),.05)),j==="Broken in two"){const s=24+8*Ye[1],c=2.6+1.6*Ye[2],l=P(-12-2*u[0],5+2*u[1],s-1.5+3*u[2]);K=l[0],O=l[1],Y=l[2],De(P(0,5.5,s),.04)}}else if(m==="Over the rail"){const e=P(-9.5,15.5,-4+24*u[2]);K=e[0],O=Math.min(e[1],$-2.5),Y=e[2],ie=.2+.25*u[3],et=-.3}else if(m==="At the hull's foot")Y=1+18*u[2],K=vt(1.6)-(I==="Plankton haze"?2.4+.6*u[0]:3.6+1.4*u[0]),O=Math.max(1.6,Fo(K,Y)+1.1),ie=.08+.14*u[3],et=.62+.14*u[4];else if(m==="Under the stern"){const e=P(0,3,Fe-1.2);K=e[0]-1.5-3.5*u[0],O=1.5+1.2*u[1],Y=e[2]-8-3.5*u[2],De(e,.16+.12*u[4]),Be=.78}else if(m==="Off the bow"){const e=P(0,6,Ee+1),t=I==="Plankton haze"?.75:1;K=e[0]-(8+5*u[0])*t,O=2.2+3*u[1],Y=Ee+1+(10+6*u[2])*t,De(e,.1+.1*u[4]),ie+=(u[3]-.5)*.2,Be=.74}else if(m==="Far across the sand"){const e={"Gin clear":34,"Red Sea blue":24,Turquoise:21,"Plankton haze":11}[I]*(1+.18*u[0]),t=P(0,7,22+12*u[3]);K=3-e,O=3.6+3*u[1],Y=6+26*u[2],De(t,.05),Be=Math.tan(27*Math.PI/180),I==="Plankton haze"&&(Y=Ee+2+5*u[2],De(P(0,6,Ee-6-6*u[3]),.08),Be=Math.tan(30*Math.PI/180))}else if(m==="Up the mast"){const e=P(-3.4-1.6*u[0],12.6,No.z-3.5-3*u[2]);K=e[0],O=Math.min(e[1],$-1.6),Y=e[2],De(P(0,ln,No.z),0),et=Math.min(et,1.15),Be=.78}else if(m==="Above the deck"){const e=2+34*u[2],t=P(-ue(e,11.5)-2-2.5*u[0],16+2*u[1],e);K=t[0],O=Math.min(t[1],$-1.6),Y=e,De(P(1,11.5,e+8+5*u[3]),0),Be=.74}const Rt={"Late morning":[38,3.2],"High noon":[14,3.5],"Low sun":[60,2.6]}[oe];ae==="Late gold"&&(Rt[0]=64+6*ht[0]);let Pt=[-.8,.6];if(!a.home){let e=ht[1]<.5?-1:1,t={"Into the sun":.2+.35*ht[0],"Sun at your back":Math.PI-.2-.5*ht[0]}[ae]||1.05+.7*ht[0];m==="Far across the sand"&&ae!=="Into the sun"&&(t=Math.max(t,2.1+.5*ht[0])),(m==="Far across the sand"&&ae!=="Into the sun"||m==="Beside the hull"&&(oe==="Low sun"||$>25))&&(e=Math.sin(ie+t)<Math.sin(ie-t)?1:-1);const n=ie+e*t;Pt=[Math.sin(n),Math.cos(n)]}const jt=Rt[0]*Math.PI/180,Co=[Pt[0]*Math.sin(jt),Math.cos(jt),Pt[1]*Math.sin(jt)],Uo=Math.asin(Math.sin(jt)/1.333),Z=[Pt[0]*Math.sin(Uo),Math.cos(Uo),Pt[1]*Math.sin(Uo)],U={"Red Sea blue":[[.27,.095,.062],[.08,.058,.038],.013,[.034,.165,.29],[.007,.052,.112],[.0014,.012,.033]],Turquoise:[[.33,.075,.072],[.09,.05,.045],.009,[.03,.22,.3],[.007,.085,.12],[.0012,.02,.04]],"Plankton haze":[[.42,.14,.13],[.12,.085,.075],.015,[.035,.17,.22],[.009,.06,.088],[.002,.014,.03]],"Gin clear":[[.2,.05,.032],[.06,.045,.025],.005,[.024,.14,.35],[.004,.04,.14],[.001,.009,.04]]}[I],fn=$-O,hn=U[1].map(e=>Math.exp(-e*(fn-15)*.8)),Lo=(e,t)=>e.map((n,s)=>n*hn[s]*t),dt=ae==="Late gold",tt=ae==="Overcast",_o=Rt[1]*(tt?.06:dt?1.2:1),vn=tt?1.25:dt?.78:1,fa=tt?0:1;tt&&(U[0]=U[0].map((e,t)=>e*[.8,.76,.86][t])),dt&&(U[1]=U[1].map((e,t)=>e*[.52,.78,1.04][t]),U[0]=U[0].map((e,t)=>e*[.8,.94,1.06][t])),p(4,Z[0],Z[1],Z[2],_o),dt?p(5,1,.7,.38,1):p(5,1,.97,.92,1),p(6,U[0][0],U[0][1],U[0][2],U[2]);const ha=(e,t,n)=>[.3,.59,.11].reduce((s,c,l)=>s+c*Math.exp(-e[l]*t/n),0),dn=Math.asin(Math.sin(38*Math.PI/180)/1.333),un=3.2*ha([.08,.058,.038],11.5,Math.cos(dn)),pn=(tt?Rt[1]*.4:_o)*ha(U[1],Math.max($-O,1),Z[1])*(I==="Plankton haze"?.75:1),xn=a.home?.8:.8*ve(Math.pow(un/pn,.4),.82,1.55);p(7,U[1][0],U[1][1],U[1][2],xn);const Io=(e,t)=>{const n=.3*e[0]+.59*e[1]+.11*e[2];return e.map((s,c)=>(s+(n-s)*.38)*[.96,1.07,.86][c]*t)};let kt=Lo(U[3],.9).map((e,t)=>e*(dt?[2.1,1.35,.55][t]:1)),ot=Lo(U[4],1),Kt=Lo(U[5],1);dt&&(ot=ot.map((e,t)=>e*[1.25,1.02,.9][t]),Kt=Kt.map((e,t)=>e*[1.2,.82,1.1][t])),tt&&(kt=Io(kt,1.15),ot=Io(ot,1.05),Kt=Io(Kt,1)),p(8,kt[0],kt[1],kt[2],fa),p(41,Co[0],Co[1],Co[2],tt?Rt[1]*.8:0);const Do=ce==="Fallen mast",ee=P(-ue(ne.z,11.5)+.3,11.8,ne.z),Ne=[Ie-6.5,.25,ne.z+7.5];if(p(19,ee[0],ee[1],ee[2],Do?1:0),p(20,Ne[0],Ne[1],Ne[2],0),Je&&Do){const e=.3+.1*Tt[0],t=Bt(ee[0]+(Ne[0]-ee[0])*e,ee[1]+(Ne[1]-ee[1])*e+.2,ee[2]+(Ne[2]-ee[2])*e);p(18,t[0],t[1],t[2],1)}const le=()=>r()-.5;p(21,Ie-4.2+le(),14+2*le(),r()*3,1),p(22,vt(.5)-1.6,23+2*le(),.2*le(),2),p(23,Ie-1.5+le(),-6+2*le(),r()*3,1),p(24,Ie-7+le(),3+2*le(),r()*3,1),p(25,Ie-5+le(),21+2*le(),1.1+.3*r(),1),p(26,Ie-9+le(),-3+2*le(),1.4+.3*r(),1),p(27,vt(.5)-1.3,-9+le(),.9+.2*r(),1);const Ft=[],pe=(e,t,n,s,c,l,f,i)=>Ft.push([e,t,n,s,c,l,f,i]),va=j==="Broken in two",Vo=j==="Bow section only",at=j==="Bridge amidships"?29.5+(a.home?0:(Ye[0]-.5)*3):-9.2+Ye[0]*1.5,mn=qo;p(17,ca?.55+.3*Tt[0]:Je?.42+.2*Tt[0]:0,j==="Bow section only"?-1e3:at,mn,5.2+2*Tt[2]);const te=11.5,da=te+4.7+1.3,yn=te+4.7+5.6,Yt=$-(11.5*V-1.5),Nt=Yt>9.2?1:0,Qt=Math.min(.999,(Yt-1)/(Nt?8.6:6.05));if(!Vo){const e=ue(at,te);if(Xt?pe(0,te+4.3,at+.8,9.1,e-1.1,5.2,e,Nt*20+Qt):(pe(0,te+2.35,at,1.1,e-1.3,2.35,4.4,.22),pe(0,da,at+1.6,1.2,e-.35,1.3,2.1,.18)),Xt){const t=(Nt?5.2:2.65)*Qt,n=Math.min(2.8,(Yt-t-1.2)/2);pe(0,te+t+n,at-2.4,2.3,1.2,n,1.75,.2)}else pe(0,te+4.7+2.8,at-2.4,2.3,1.2,2.8,1.75,.2);pe(0,3.6,Fe-2.35,1.6,.2,3.4,.95,.08),pe(0,2.6,Fe-.35,4.6,.36,.36,1.3,0),pe(0,2.6,Fe-1.05,5.5,2.15,.62,.16,0)}for(const e of[ne,$e])e.on&&(pe(0,te+.35,e.z+2.4,1.4,1.35,.35,.65,.08),pe(0,te+.95,e.z+2.4,3.4,1.05,.42,0,0));Vo||pe(-(ue(5,te)-.75),te+.35,5,2.4,.2,.38,.2,0),pe(-(ue(37,te)-.75),te+.35,37,2.4,.2,.38,.2,0);const Ho=Ft.length,Jt=[];for(const e of[ne,$e])if(e.on){const t=(e===ne?_e:_e-1.2)/V;Jt.push([0,(11.5+t)/2,e.z,6,[e.z,t,1,0],Math.hypot((t-11.5)/2+.5,7.6)])}for(let e=21;e<=27;e++){const t=S.slice(e*4,e*4+4),n=e>=25;Jt.push([...Bt(t[0],n?.05:0,t[1]),n?8:7,Array.from(t),n?t[2]*1.4:2.4])}const nt=new Float32Array(3*24*4);let Ve=[1e9,1e9,1e9],He=[-1e9,-1e9,-1e9];Ft.forEach((e,t)=>{const n=Math.hypot(e[4],e[5],e[6])+.4;nt.set(e.slice(0,4),t*12),nt.set(e.slice(4,8),t*12+4),nt[t*12+8]=n;for(let s=0;s<3;s++)Ve[s]=Math.min(Ve[s],e[s]-n),He[s]=Math.max(He[s],e[s]+n)}),Jt.forEach((e,t)=>{const n=Ho+t;nt.set([e[0],e[1],e[2],e[3]],n*12),nt.set(e[4],n*12+4),nt[n*12+8]=e[5]}),Ft.length=Ho+Jt.length,p(40,Ft.length,va?24+8*Ye[1]:0,va?2.6+1.6*Ye[2]:-1e3,Vo?8+6*Ye[1]:-1e3),p(42,(Ve[0]+He[0])/2,(Ve[1]+He[1])/2,(Ve[2]+He[2])/2,Ho),p(51,(He[0]-Ve[0])/2,(He[1]-Ve[1])/2,(He[2]-Ve[2])/2,0),p(43,da+.35,te+2.6,Xt?te+(Nt?5.2:2.65)*Qt+2*Math.min(2.8,(Yt-(Nt?5.2:2.65)*Qt-1.2)/2)-.9:yn-.9,0),o.pixelStorei(o.UNPACK_ALIGNMENT,4);const ua=Te(o,3,24,o.RGBA32F,o.RGBA,o.FLOAT,o.NEAREST,o.CLAMP_TO_EDGE,nt),xe=(()=>{const e=Z[2],t=[-Z[0]*e,-Z[1]*e,1-Z[2]*e],n=Math.hypot(...t);return t.map(s=>s/n)})(),ut=[Z[1]*xe[2]-Z[2]*xe[1],Z[2]*xe[0]-Z[0]*xe[2],Z[0]*xe[1]-Z[1]*xe[0]];let $t=1e9,Oo=-1e9,eo=1e9,Go=-1e9,Wo=1e9,Zo=-1e9;for(const e of[-12,23])for(const t of[-2,Math.min($,23)])for(const n of[Fe-4,Ee+5]){const s=e*xe[0]+t*xe[1]+n*xe[2],c=e*ut[0]+t*ut[1]+n*ut[2],l=e*Z[0]+t*Z[1]+n*Z[2];$t=Math.min($t,s),Oo=Math.max(Oo,s),eo=Math.min(eo,c),Go=Math.max(Go,c),Wo=Math.min(Wo,l),Zo=Math.max(Zo,l)}const to=h>600?1024:512,oo=h>600?512:256;p(11,xe[0],xe[1],xe[2],$t),p(12,ut[0],ut[1],ut[2],eo),p(13,1/(Oo-$t),1/(Go-eo),Zo+1,Wo-1);const pa=[],bn=r()*J,xa=J/16,ma=new Set,wn=[0,4,1,5,2,6,3];for(let e=0;e<7;e++){const t=1.7*Math.pow(.8,e)*(.9+.2*r()),n=bn+(wn[e]-3+(r()-.5)*.7)*.43;let s=Math.round(Math.cos(n)*16/t),c=Math.round(Math.sin(n)*16/t);for(;ma.has(s+","+c)||!s&&!c;)c+=1;ma.add(s+","+c);const l=s*xa,f=c*xa,i=Math.hypot(l,f);pa.push({kx:l,kz:f,a:.2/(i*i)*(.7+.6*r()),om:Math.sqrt(9.81*i)*.8,ph:r()*J})}const gn=d.fl,qt=d.hf,st={M:Ke(o,Te(o,h,h,qt?o.RGBA16F:o.RGBA8,o.RGBA,qt?o.HALF_FLOAT:o.UNSIGNED_BYTE,o.LINEAR,o.CLAMP_TO_EDGE),h,h)},zn=qt?1:.25;p(9,ot[0],ot[1],ot[2],zn);const ao=Math.ceil(h/2),Me={G:Ke(o,Te(o,h,h,o.RGBA32UI,o.RGBA_INTEGER,o.UNSIGNED_INT,o.NEAREST,o.CLAMP_TO_EDGE),h,h),V:Ke(o,Te(o,ao,ao,qt?o.RGBA16F:o.RGBA8,o.RGBA,qt?o.HALF_FLOAT:o.UNSIGNED_BYTE,o.LINEAR,o.CLAMP_TO_EDGE),ao,ao),SH:Ke(o,Te(o,to,oo,o.R32UI,o.RED_INTEGER,o.UNSIGNED_INT,o.NEAREST,o.CLAMP_TO_EDGE),to,oo)},ya=Math.max(1<<Math.max(0,Math.ceil(Math.log2(h/4))),Math.min(h,256));let ba=!0,no=!0,so=0;const co={"Dense school":1024,"Wall of glassfish":1536,"Loose school":512}[N],pt=P(-8.4,8.3,ko-1.6);p(37,pt[0],pt[1],pt[2],0),p(38,N==="Loose school"?2.3:N==="Wall of glassfish"?1.8:2,N==="Wall of glassfish"?1.9:N==="Loose school"?1.3:1.15,N==="Wall of glassfish"?2.6:N==="Loose school"?3.2:2.7,0);const wa=Math.min(S[38*4],S[38*4+1],S[38*4+2])*.75,Mn=Math.PI*(2*Math.min(wa,1)-2*Math.pow(Math.min(wa,1),3)/3)/(4.19*S[38*4]*S[38*4+1]*S[38*4+2])*.65,xt=64,ro=Ua/32,qe=new Float32Array(xt*ro*4);for(let e=0;e<co;e++){const t=((e>>5)*xt+(e&31)*2)*4;let n,s,c;do n=r()*2-1,s=r()*2-1,c=r()*2-1;while(n*n+s*s+c*c>1);const l=.45+.75*Math.pow(Math.sin(e*12.9898+4.1)*43758.5453%1*.5+.5,1.6),f=Bt(pt[0]+n*S[38*4]*l,pt[1]+s*S[38*4+1]*l,pt[2]+c*S[38*4+2]*l);f[0]>-7.3&&f[0]<-6.1&&(f[0]=-7.4-r()*.3);const i=P(f[0],f[1],f[2]);qe[t]=i[0],qe[t+1]=i[1],qe[t+2]=i[2],qe[t+3]=r()*J;const g=(r()-.5)*.5,x=.1+.06*r();qe[t+4]=Math.cos(g)*x,qe[t+5]=(r()-.5)*.02,qe[t+6]=-Math.sin(g)*x*.4-.3*x}const io=[0,1].map(()=>Ke(o,gn?Te(o,xt,ro,o.RGBA32F,o.RGBA,o.FLOAT,o.NEAREST,o.CLAMP_TO_EDGE,qe):Te(o,xt,ro,o.RGBA32UI,o.RGBA_INTEGER,o.UNSIGNED_INT,o.NEAREST,o.CLAMP_TO_EDGE,new Uint32Array(qe.buffer)),xt,ro));let lo=0,Sn=0;const fe=new Float32Array(Ao*12),Oe=[],ga=(e,t)=>P(e*(ue(t,11.5)-.3),11.65,t);for(const e of[ne,$e]){if(!e.on)continue;const t=(e===ne?_e:_e-1.2)/V,n=11.5+(t-11.5)*.72,s=P(0,t,e.z);for(const c of[-1,1])for(const l of[-1.7,0,1.7])r()<.2||Oe.push({a:P(c*2.3,n,e.z),b:ga(c,e.z+l),sag:.05,w:.035});Oe.push({a:s,b:P(0,12.2,e.z+(e===ne?-11:12)),sag:.25,w:.04}),Oe.push({hang:!0,a:P(-1.2,n,e.z),len:4+3*r(),w:.04,ph:r()*J})}{const e=Ee-4.5,t=P(-ue(e,10.2)+.1,10.2,e),n=[t[0]-3.5,.05,t[2]+5],s=[t[0]-6,.05,t[2]+14];Oe.push({a:t,b:n,sag:.9,w:.075}),Oe.push({a:n,b:s,sag:-.05,w:.075})}if(ne.on&&$e.on&&Oe.push({a:P(0,_e/V-.3,ne.z),b:P(0,(_e-1.2)/V-.3,$e.z),sag:1.6,w:.035}),Do)for(let e=0;e<3;e++)Oe.push({a:ga(-1,ne.z-3+e*3),b:[ee[0]+(Ne[0]-ee[0])*(.5+.2*e),ee[1]+(Ne[1]-ee[1])*(.5+.2*e),ee[2]+(Ne[2]-ee[2])*(.5+.2*e)],sag:.4,w:.035});const za=[],An={"Soft coral garden":16,"Purple and orange":14,"Yellow whips":34,"Pink bloom":12}[Je?Ro:E];for(let e=0;e<An;e++){let t,n;do t=-6+r()*40,n=2.5+r()*8.5;while(Math.abs(t-ko)<3.4&&Math.abs(n-7.8)<2.6);const s=P(-ue(t,n)-.04,n,t),c=-1,l=.5+r()*1.1,f=(r()-.5)*.8,i=Math.hypot(c,l,f),g=[(c*V-l*re)/i,(c*re+l*V)/i,f/i],x=E==="Yellow whips"||r()<.45?[.75,.66,.18]:r()<.5?[.78,.26,.1]:[.3,.45,.2];za.push({b:s,d:g,len:.9+r()*1.4,col:x,ph:r()*J,k:.6+r()*.6})}const Ct=[],Ma=[Ie-2.5,8];for(let e=0;e<26;e++){const t=r()*J,n=Math.sqrt(r())*2.4,s=Ma[0]+Math.cos(t)*n,c=Ma[1]+Math.sin(t)*n*1.3;Ct.push({b:[s,Fo(s,c)-.02,c],h:.3+.22*r(),ph:r()*J,out:1,lag:.5+r()})}let Ut=null;if(Je){let e=1013904242;for(let w=2;w<a.hash.length;w+=8)e=Math.imul(e^parseInt(a.hash.slice(w,w+8),16),374761393)>>>0;const t=()=>{e=e+1831565813|0;let w=Math.imul(e^e>>>15,1|e);return w=w+Math.imul(w^w>>>7,61|w)^w,((w^w>>>14)>>>0)/4294967296},n=d.nd,s=(w,_)=>{const B=((_&127)*128+(w&127))*4;return[n[B]/255,n[B+1]/255,n[B+2]/255,n[B+3]/255]},c=[],l=S[68],f=S[69],i=S.slice(160,164);for(const w of[-1,1])for(let _=Math.floor((Fe+3)/3.4)-1;_*3.4<Ee-5;_++){const B=s(_*43+17+w*13,29+w*5),be=(_+.5)*3.4+(B[0]-.5)*.6*(1-B[3]),wo=Math.max(Math.max(Fe+3-be,be-Ee+6),Math.max(i[2]+1.5-Math.abs(be-i[1]),i[3]+2-be)),Vt=w*(ue(be,11.5)-.12),jo=Vt*V-11.52*re+7-K,Ko=Vt*re+11.52*V-1.5-O,Yo=be-Y,Qo=Math.exp(-(U[0][0]+U[0][1]+U[0][2])/3*Math.hypot(jo,Ko,Yo));B[2]<l*1.25&&Math.abs(be-f-.8)>=7&&wo<=0&&Qo>.17&&c.push({o:[w*(ue(be,11.5)-.12),11.52,be],R:1.05+1.6*B[3]*B[3],an:1.15+(B[1]-.5)*.7,sx:w,sd:B[1]*7})}S[75]>.5&&c.push({o:[S[72],S[73],S[74]],R:2.1,an:.45,sx:1,sd:3.3});const g=[.7,.46,.36,.66,.5,.37,.62,.4,.32];let x=0;for(const w of c)x+=502+Math.ceil(900*w.R);const z=new Float32Array(x*12),v=new Float64Array(3200*7),C=new Int32Array(240*96),Q=new Float64Array(240*96),Ge=new Float64Array(240*96),Re=new Float64Array(3200),Pe=new Float64Array(3200),ye=new Float64Array(3200),he=new Float64Array(3200),We=new Float64Array(3200),rt=new Float64Array(3200),xo=new Int32Array(3200);let mo=new Int32Array(3200),yo=new Int32Array(3200),bo=0;for(const w of c){const _=w.R,B=.16*_,be=_*.03,wo=_*.032,Vt=500+900*_,jo=t()*J,Ko=t()*J,Yo=t()*J,Qo=(t()-.5)*.5,go=.74+.14*t(),Ra=1+(t()*3|0),gt=new Float64Array(9);for(let X=0;X<Ra;X++){const G=(t()-.5)*1.8,Ue=(.35+.4*t())*_;gt[X*3]=Math.sin(G)*Ue/go,gt[X*3+1]=B+Math.cos(G)*Ue,gt[X*3+2]=(.06+.08*t())*_}const Jo=(w.sd*3.1|0)%3*3;C.fill(0);let zt=0;v[0]=0,v[1]=0,v[2]=0,v[3]=B,v[4]=.065*Math.sqrt(_),v[5]=.05*Math.sqrt(_),v[6]=0,zt=1;let Pa=0,zo=0;const ka=4+(t()*3|0);for(let X=0;X<ka;X++){const G=Pa++;Re[G]=0,Pe[G]=B,ye[G]=((X+.5)/ka-.5)*1.9+(t()-.5)*.35,he[G]=.032*Math.sqrt(_),We[G]=0,rt[G]=Math.atan2(0,.001),xo[G]=0,mo[zo++]=G}for(;zo&&zt<Vt;){let X=0;for(let Ue=0;Ue<zo&&!(zt>=Vt);Ue++){const k=mo[Ue],ke=Re[k],Le=Pe[k],Ze=rt[k],Ht=ye[k],Xe=Ht+((t()-.5)*.55+(Ze-Ht)*.05);ye[k]=Xe;const Se=ke+Math.sin(Xe)*be/go,Ae=Le+Math.cos(Xe)*be,we=Math.atan2(Se*go,Ae-B+.001),Mo=Math.hypot(Se*go,Ae-B);if(Math.abs(we)>1.45||Mo>_*(1.02+.17*Math.sin(2.1*we+jo)+.11*Math.sin(3.7*we+Ko)+.07*Math.sin(6.3*we+Yo))*(1-.28*we*we)*(1+Qo*we)*(.84+.3*t())||Ae<B*.7)continue;let it=!1;for(let se=0;se<Ra;se++){const ge=se*3;if(Math.hypot(Se-gt[ge],Ae-gt[ge+1])<gt[ge+2]){it=!0;break}}if(it)continue;const Mt=(Math.floor(Se/wo)+120)*96+Math.floor(Ae/wo),$o=C[Mt]-1,Ot=he[k],So=We[k];if($o>=0&&$o!==k&&xo[k]>2){const se=zt++*7;if(v[se]=ke,v[se+1]=Le,v[se+2]=Q[Mt],v[se+3]=Ge[Mt],v[se+4]=Ot,v[se+5]=Ot,v[se+6]=So,t()<.85)continue}const lt=zt++*7;if(v[lt]=ke,v[lt+1]=Le,v[lt+2]=Se,v[lt+3]=Ae,v[lt+4]=Ot,v[lt+5]=Ot*.985,v[lt+6]=So,$o<0&&(C[Mt]=k+1,Q[Mt]=Se,Ge[Mt]=Ae),Re[k]=Se,Pe[k]=Ae,rt[k]=we,he[k]=Math.max(Ot*.988,.009),xo[k]++,t()<.34){const se=t()<.5?-1:1,ge=Pa++;Re[ge]=Se,Pe[ge]=Ae,ye[ge]=Xe+se*(.45+.55*t()),he[ge]=Math.max(he[k]*.8,.009),We[ge]=So+1,rt[ge]=we,xo[ge]=0,yo[X++]=ge,ye[k]=Xe-se*.14,he[k]=Math.max(he[k]*.92,.009),We[k]=So+.5}yo[X++]=k}const G=mo;mo=yo,yo=G,zo=X}const Vn=Math.cos(w.an),Hn=Math.sin(w.an),Fa=(w.sd*3.7%1-.5)*.7,Na=Math.cos(Fa),qa=Math.sin(Fa),On=w.sx*Vn,Gn=w.o[0],Wn=w.o[1],Zn=w.o[2];for(let X=0;X<zt;X++){const G=X*7,Ue=v[G+6],k=Math.min(Ue/5,1),ke=Ue>3?.3:0,Le=bo++*12;for(let Ze=0;Ze<2;Ze++){const Ht=v[G+Ze*2],Xe=v[G+Ze*2+1],Se=Ht*Na+Xe*qa,Ae=-Ht*qa+Xe*Na,we=Gn+On*Se,Mo=Wn+Ae,it=Le+Ze*4;z[it]=we*V-Mo*re+7,z[it+1]=we*re+Mo*V-1.5,z[it+2]=Zn+Hn*Se,z[it+3]=v[G+4+Ze]}z[Le+8]=g[Jo]*(.62+.5*k)*(1-ke)+.62*ke,z[Le+9]=g[Jo+1]*(.62+.5*k)*(1-ke)+.57*ke,z[Le+10]=g[Jo+2]*(.62+.5*k)*(1-ke)+.5*ke,z[Le+11]=1}}const Dn=z.subarray(0,bo*12);if(bo){const w=o.createVertexArray(),_=o.createBuffer();o.bindVertexArray(w),o.bindBuffer(o.ARRAY_BUFFER,_),o.bufferData(o.ARRAY_BUFFER,Dn,o.STATIC_DRAW);for(let B=0;B<3;B++)o.enableVertexAttribArray(B),o.vertexAttribPointer(B,4,o.FLOAT,!1,48,B*16),o.vertexAttribDivisor(B,1);o.bindVertexArray(null),Ut={a:w,b:_,n:bo}}}let Lt=0;const fo=(e,t,n,s,c,l)=>{if(Lt>=Ao)return;const f=Lt++*12;fe[f]=e[0],fe[f+1]=e[1],fe[f+2]=e[2],fe[f+3]=n,fe[f+4]=t[0],fe[f+5]=t[1],fe[f+6]=t[2],fe[f+7]=s,fe[f+8]=c[0],fe[f+9]=c[1],fe[f+10]=c[2],fe[f+11]=l},Sa=[.08,.07,.06],Tn=(e,t,n)=>{Lt=0;const s=Math.hypot(t,n);for(const i of Oe){let g=i.a.slice();if(i.hang){for(let x=1;x<=10;x++){const z=x/10,v=Math.sin(e*.4+i.ph+z*2)*.25*z,C=[i.a[0]-.3*z+v*.4+t*3*z*z,i.a[1]-i.len*z*(1-.12*s),i.a[2]+v+n*3*z*z];fo(g,C,i.w,i.w,Sa,1),g=C}continue}for(let x=1;x<=12;x++){const z=x/12,v=4*z*(1-z),C=Math.sin(e*.3+i.a[2]*.1)*.06*v,Q=[i.a[0]+(i.b[0]-i.a[0])*z+(t*1.5*i.sag+C)*v,i.a[1]+(i.b[1]-i.a[1])*z-i.sag*v,i.a[2]+(i.b[2]-i.a[2])*z+n*1.5*i.sag*v];fo(g,Q,i.w,i.w,Sa,1),g=Q}}for(const i of za){let g=i.b.slice();const x=10,z=i.len/x;for(let v=1;v<=x;v++){const C=v/x,Q=Math.sin(e*(.7+.2*i.k)+i.ph-C*1.5)*.12*C;let Ge=i.d[0]+t*2.2*i.k*C+Q*.3,Re=i.d[1]+.5*C,Pe=i.d[2]+n*2.2*i.k*C+Q;const ye=Math.hypot(Ge,Re,Pe)/z,he=[g[0]+Ge/ye,g[1]+Re/ye,g[2]+Pe/ye];fo(g,he,.014*(1-.6*(C-1/x)),.014*(1-.6*C),i.col,1),g=he}}let c=-t,l=-n;const f=Math.hypot(c,l);f<.02?(c=.35,l=-.94):(c/=f,l/=f);for(const i of Ct){const g=i.h*i.out;if(g<.02)continue;let x=i.b.slice();const z=8,v=(g+.06)/z;for(let C=1;C<=z;C++){const Q=C/z,Ge=Math.sin(e*1.3+i.ph+Q*3)*.15*Q,Re=Q*Q*Q*2.2;let Pe=c*Re+Ge*l-t*.5*Q,ye=1,he=l*Re-Ge*c-n*.5*Q;const We=Math.hypot(Pe,ye,he)/v,rt=[x[0]+Pe/We,x[1]+ye/We,x[2]+he/We];fo(x,rt,.018,C===z?.02:.017,C===z?[.45,.4,.3]:[.62,.58,.48],1),x=rt}}},Xo=[],En=de!=="Turtle",Bn=de!=="Batfish";if(En)for(let e=0,t=Bn?7+(r()*3|0):3+(r()*3|0);e<t;e++)Xo.push({u:(r()-.5)*4,v:(r()-.5)*2.4,w:(r()-.5)*4,du:.2+.06*r(),dv:(r()-.5)*.03,ph:r()*J,s:.09+.02*r()});const Rn=17+6*r(),Pn=-6-6*r(),kn=.1+.12*r(),Ce=new Float32Array((Gt+8)*8),ct=[],_t=[];let Fn=0;const Nn=(e,t)=>{const n=(e*2-1)*Be,s=((1-t)*2-1)*Be,c=[y.fw[0]+y.rt[0]*n+y.up[0]*s,y.fw[1]+y.rt[1]*n+y.up[1]*s,y.fw[2]+y.rt[2]*n+y.up[2]*s],l=Math.hypot(...c);c[0]/=l,c[1]/=l,c[2]/=l;let f=.3,i=0;for(;f<14;f+=.1){const g=[y.x+c[0]*f,y.y+c[1]*f,y.z+c[2]*f];if(g[1]<Fo(g[0],g[2])+.05){i=1;break}const x=Bt(g[0],g[1],g[2]);if(x[1]>0&&x[1]<11.5&&x[0]>-ue(x[2],x[1])-.1&&x[0]<0){i=2;break}}return i||(f=5),f=Math.min(Math.max(.6,f-.25),7),[y.x+c[0]*f,y.y+c[1]*f,y.z+c[2]*f]},Aa=(e,t)=>{const n=Nn(e,t),s={x:n[0],y:n[1],z:n[2],left:2.1,acc:0,id:Fn++,y0:n[1],y1:n[1],live:!0};_t.push(s),_t.length>4&&_t.shift(),a.sound.hit("noise",.3,{cutoff:900,dur:1.5});for(const c of Ct){const l=Math.hypot(c.b[0]-n[0],c.b[2]-n[2]);l<4.5&&(c.out=Math.min(c.out,l/4.5*.3))}},qn=e=>{for(const t of _t){if(t.left>0)for(t.left-=e,t.acc+=e*44;t.acc>=1&&ct.length<Gt;){t.acc-=1;const n=r()<.07,s=n?.006+.004*r():9e-4+.0035*r()*r();ct.push({x:t.x+(r()-.5)*.06,y:t.y+(r()-.5)*.04,z:t.z+(r()-.5)*.06,r0:s,r:s,d0:$-t.y,ph:r()*J,age:0,e:t,cap:n}),r()<.12&&a.sound.hit("blip",.05+.1*Math.min(1,s/.005),{freq:ve(3.26/s,300,2600)})}t.y0=1e9,t.y1=-1e9}for(let t=ct.length-1;t>=0;t--){const n=ct[t];n.age+=e;const s=$-n.y;n.r=n.r0*Math.cbrt((10+n.d0)/(10+Math.max(s,0)));const c=n.cap?Math.min(.36,.711*Math.sqrt(9.81*2*n.r)*1.1):ve(.12+55*n.r,.1,.3);n.ph+=e*(n.cap?7:11);const l=n.r>.0011?.07:.015;n.y+=c*e,n.x+=(Math.cos(n.ph)*l*.5+yt*.9)*e,n.z+=(Math.sin(n.ph*.7)*l*.5+bt*.9)*e;const f=Bt(n.x,n.y,n.z);if(f[1]>.5&&f[1]<11.45&&f[0]<0){const g=ue(f[2],f[1]);if(f[0]>-g-n.r-.02){const x=P(-g-n.r-.02,f[1],f[2]);n.x=x[0],n.y=x[1]}}if(n.y>$-.05){ct.splice(t,1);continue}const i=n.e;i.y0=Math.min(i.y0,n.y),i.y1=Math.max(i.y1,n.y)}for(let t=0;t<4;t++){const n=_t[t];n&&n.y1>n.y0?p(33+t,n.x,n.z,n.y0,n.y1):p(33+t,0,0,1,0)}},y={x:K,y:O,z:Y,fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},mt={fw:[Math.sin(ie),0,Math.cos(ie)],rt:[Math.cos(ie),0,-Math.sin(ie)]};let Ta="";const Cn=()=>{const e=a.view||Ca,t=ie+(e.yaw||0),n=ve(et+(e.pitch||0),-1.45,1.45);y.x=K+ve(e.x||0,-4,1.8),y.y=Math.min(O+ve(e.y||0,-3.5,4),$-1.2),y.z=Y+ve(e.z||0,-5,5);const s=[Math.sin(t)*Math.cos(n),Math.sin(n),Math.cos(t)*Math.cos(n)],c=Math.hypot(s[2],s[0])||1,l=[s[2]/c,0,-s[0]/c];y.fw=s,y.rt=l,y.up=[s[1]*l[2]-s[2]*l[1],s[2]*l[0]-s[0]*l[2],s[0]*l[1]-s[1]*l[0]];const f=[y.x,y.y,y.z,t,n].map(i=>i.toFixed(4)).join(",");f!==Ta&&(Ta=f,no=!0)};let F=null,yt=0,bt=0,It=0,wt=0,ho=0,vo=0;const Dt=[0,0,0],Un=e=>{const t=a.input,n=t.taps();for(const s of n)F?t.down||Aa(s.x,s.y):F={x:s.x,y:s.y,lx:s.x,ly:s.y,t:0,moved:!1,held:!1};if(F)if(F.t+=e,t.down){const s=t.x-F.x,c=t.y-F.y;if(!F.moved&&!F.held&&Math.hypot(s,c)>.035&&(F.moved=!0,a.sound.hit("noise",.22,{cutoff:260,dur:2.6})),F.moved){const l=t.x-F.lx,f=t.y-F.ly,i=l*y.rt[0]-f*y.fw[0],x=l*y.rt[2]-f*y.fw[2];It=ve(It+x*1.2+i*.2,-.32,.32)}!F.moved&&!F.held&&F.t>.45&&(F.held=!0,a.sound.note(33,{dur:3.5,vel:.1,wave:"sine",attack:1.2})),F.held&&(ho=1,vo=3.5),F.lx=t.x,F.ly=t.y}else!F.moved&&!F.held&&Aa(F.x,F.y),F=null};let uo=0,po=0;const Ln=e=>{uo+=e,bt+=(It-bt)*Math.min(1,e*1.2),yt+=(It*.15-yt)*Math.min(1,e*1.2),It*=Math.exp(-e/7),vo>0&&(vo-=e,vo<=0&&(ho=0)),wt+=(ho-wt)*Math.min(1,e*(ho>wt?.22:.3)),Dt[0]+=yt*e,Dt[2]+=bt*e;for(const t of Ct)t.out=Math.min(1,t.out+e*.12/t.lag);for(const t of ct)for(const n of Ct)Math.abs(t.x-n.b[0])<.6&&Math.abs(t.z-n.b[2])<.6&&t.y-n.b[1]<1.2&&(n.out=Math.min(n.out,.2));qn(e);for(const t of Xo)t.u+=t.du*e,t.v+=t.dv*e},L=(e,t)=>{o.activeTexture(o.TEXTURE0+e),o.bindTexture(o.TEXTURE_2D,t)},me=(e,t,n,s)=>{const c=d.use(e);return o.bindFramebuffer(o.FRAMEBUFFER,t?t.fb:null),o.viewport(0,0,n,s),o.useProgram(c.p),S[1*4+3]=n,o.uniform4fv(c.uP,S),c},_n=()=>{for(let e=0;e<8;e++)L(e,null)},Ea=e=>{no&&(so=0),Cn(),p(0,y.x,y.y,y.z,Be),p(1,y.fw[0],y.fw[1],y.fw[2],h),p(2,y.rt[0],y.rt[1],y.rt[2],uo%600),p(3,y.up[0],y.up[1],y.up[2],$),S[4*4+3]=_o*(1-.72*wt),S[5*4+3]=vn*(1-.3*wt),S[8*4+3]=fa*(1-.75*wt),p(14,to,oo,yt,bt),p(39,Dt[0],Dt[1],Dt[2],0);for(let s=0;s<7;s++){const c=pa[s];p(44+s,c.kx,c.kz,c.a,(c.ph-c.om*uo)%J)}if(o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),o.bindVertexArray(d.vao),_n(),L(0,d.tN),L(7,ua),ba&&(S[10*4+3]=1,me(ra,Me.SH,to,oo),o.drawArrays(o.TRIANGLES,0,3),S[10*4+3]=0,ba=!1),L(6,Me.SH.tex),no){L(4,null);const s=Ke(o,Te(o,h,ya,o.RGBA32UI,o.RGBA_INTEGER,o.UNSIGNED_INT,o.NEAREST,o.CLAMP_TO_EDGE),h,ya),c=s.h>=h?h:1<<Math.floor(Math.log2(s.h));L(4,null),o.enable(o.SCISSOR_TEST);for(let l=0;l<h;l+=c)me(ra,s,h,h),o.viewport(0,-l,h,h),o.scissor(0,0,h,c),o.drawArrays(o.TRIANGLES,0,3),L(5,s.tex),S[33*4]=l,me(cn,Me.G,h,h),o.scissor(0,l,h,c),o.drawArrays(o.TRIANGLES,0,3),L(5,null),S[33*4]=0;o.disable(o.SCISSOR_TEST),o.deleteFramebuffer(s.fb),o.deleteTexture(s.tex),no=!1}L(7,null);for(let s=0;s<e;s++)p(32,1/30,Sn++&65535,co,Mn),L(4,io[lo].tex),me("sim",io[lo^1],xt,Math.ceil(co/32)),o.drawArrays(o.TRIANGLES,0,3),lo^=1;L(4,null),me("cau",d.C,ft,ft),o.drawArrays(o.TRIANGLES,0,3),L(1,d.C.tex),o.generateMipmap(o.TEXTURE_2D),L(5,Me.G.tex),S[51*4+3]=so&4095,me("vol",Me.V,Me.V.w,Me.V.h),o.enable(o.BLEND),o.blendColor(0,0,0,so?1/12:1),o.blendFunc(o.CONSTANT_ALPHA,o.ONE_MINUS_CONSTANT_ALPHA),o.drawArrays(o.TRIANGLES,0,3),o.disable(o.BLEND),so++,L(2,Me.V.tex),me("comp",st.M,h,h),o.drawArrays(o.TRIANGLES,0,3),L(2,null),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),Tn(uo,yt,bt),me("line",st.M,h,h),o.bindVertexArray(d.L.a),o.bindBuffer(o.ARRAY_BUFFER,d.L.b),o.bufferSubData(o.ARRAY_BUFFER,0,fe.subarray(0,Lt*12)),o.drawArraysInstanced(o.TRIANGLES,0,6,Lt),Ut&&(o.bindVertexArray(Ut.a),o.drawArraysInstanced(o.TRIANGLES,0,6,Ut.n)),L(4,io[lo].tex),me("fish",st.M,h,h),o.bindVertexArray(d.vao),o.drawArraysInstanced(o.TRIANGLES,0,6,co),L(4,null);let t=0;const n=(s,c,l,f,i,g,x,z)=>{const v=t++*8;Ce[v]=s,Ce[v+1]=c,Ce[v+2]=l,Ce[v+3]=f,Ce[v+4]=i,Ce[v+5]=g,Ce[v+6]=x,Ce[v+7]=z};for(const s of Xo){const c=Rn+s.w,l=Pn+s.u,f=Math.min(O+kn*c+s.v,$-2);n(K+mt.fw[0]*c+mt.rt[0]*l,f,Y+mt.fw[2]*c+mt.rt[2]*l,s.s*Be/.67,1,Math.atan2(mt.rt[0],mt.rt[2]),0,1)}for(const s of ct)t<Gt+8&&n(s.x,s.y,s.z,s.cap?s.r*1.3:s.r,s.cap?3:0,0,s.ph,Math.min(1,s.age*6));t&&(me("spr",st.M,h,h),o.bindVertexArray(d.SP.a),o.bindBuffer(o.ARRAY_BUFFER,d.SP.b),o.bufferSubData(o.ARRAY_BUFFER,0,Ce.subarray(0,t*8)),o.drawArraysInstanced(o.TRIANGLES,0,6,t)),o.blendFunc(o.ONE,o.ONE),me("mote",st.M,h,h),o.bindVertexArray(d.vao),o.drawArrays(o.POINTS,0,La),o.disable(o.BLEND),L(5,null),L(6,null),L(3,st.M.tex),me("fin",null,h,h),o.drawArrays(o.TRIANGLES,0,3),L(3,null),o.bindVertexArray(null)};Ea(0);const Ba=(e,t)=>{t=Math.min(t||1/30,.1),Un(t),po+=t;let n=0;for(;po>=1/30&&n<4;)Ln(1/30),po-=1/30,n++;n===4&&(po=0),Ea(n)},In={gl:o,st:io.concat([{tex:ua,fb:null},Me.G,Me.V,Me.SH,st.M]),fb:Ut};return na&&na.register(Ba,()=>In),Ba}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
