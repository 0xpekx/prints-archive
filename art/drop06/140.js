// Water Bottle: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/140.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Wt){Wt&&function(){"use strict";const _t=new WeakMap,z0=Math.PI*2,a0=(t,a,l)=>t<a?a:t>l?l:t,O0=(t,a,l)=>{const h=a0((l-t)/(a-t),0,1);return h*h*(3-2*h)},r0=`
`,mt="#version 300 es"+r0+"precision highp float;"+r0+"precision highp int;"+r0+"precision highp sampler2D;"+r0,g0=mt+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",kt=38,pt=320,ut=240,w0=12,K=128,ue="// w1a"+r0,Ot=0,ve=`
uniform vec4 U[${kt}];
uniform sampler2D uN;
out vec4 oC;
#define S_ U[0].x
#define TANH U[0].y
#define AP U[0].z
#define FOC U[0].w
#define EYE U[1].xyz
#define SEED U[1].w
#define RT U[2].xyz
#define SET U[2].w
#define UPV U[3].xyz
#define EXPO U[3].w
#define FW U[4].xyz
#define TIME U[4].w
#define LP U[5].xyz
#define LI U[5].w
#define LCOL U[6].rgb
#define SUN U[6].w
#define AMB U[7].rgb
#define TTY U[7].w
#define TALB U[8].rgb
#define GLOSS U[8].w
#define RB U[9].x
#define LEV U[9].y
#define YS0 U[9].z
#define YS1 U[9].w
#define RN U[10].x
#define CAPB U[10].y
#define CAPT U[10].z
#define CAPR U[10].w
#define SQ U[11].x
#define SQY U[11].y
#define SQW U[11].z
#define SIGW U[12].rgb
#define BDEN U[12].w
#define CAPC U[13].rgb
#define RECT U[14]
#define TILT U[15].x
#define LEV0 U[15].y
#define SURGE U[15].z
#define SCUFF U[15].w
#define BLX U[16].x
#define BLY U[16].y
#define COND U[17].x
#define SEAM U[17].y
#define WAIST U[17].w
#define WALC U[18].rgb
#define CUPC U[19].rgb
#define LW U[22].xyz
#define WSP U[22].w
#define ZW U[23].x
#define TBK U[23].y
#define RF U[23].z
#define RIBD U[23].w
#define FILLD U[24].xyz
#define LBR U[24].w
#define RFL U[25]
#define WUP U[26].rgb
#define DMX U[26].w
#define WDN U[27].rgb
#define WROUGH U[27].w
#define FILLC U[28].rgb
#define SRCA U[28].w
#define NST int(U[29].x)
#define NTWO int(U[29].y)
#define NFOUR int(U[29].z)
#define NBK int(U[29].w)
#define WIN U[30]
#define WIN2 U[31]
#define CONE0 U[31].z
#define CONE1 U[31].w
#define PXW U[32].x
#define WALLT U[32].y
#define CRV U[32].z
#define SIGG U[33].rgb
#define TPOOL U[34].rgb
#define FLY U[36].w
#define DYH U[37].w
#define ENVE U[20]
#define LAIM U[21].xyz
#define SNAPF U[36].x
#define PANC U[35]
const float PI = 3.14159265;
float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float pw2(float x){ return x * x; }
float fres(float c, float n){ float r0 = pw2((n - 1.0) / (n + 1.0)); return r0 + (1.0 - r0) * pow(1.0 - clamp(c, 0.0, 1.0), 5.0); }
vec3 rayDir(vec2 uv){ vec2 n = uv * 2.0 - 1.0; return normalize(FW + (RT * n.x + UPV * n.y) * TANH); }
vec4 nz(vec2 uv, float w){ return textureLod(uN, uv, log2(max(w * 128.0, 1.0))); }
#ifdef PK8
vec4 ENC(vec3 c, float a){ return vec4(sqrt(clamp(c / 16.0, 0.0, 1.0)), a); }
vec3 DEC(vec4 v){ return v.rgb * v.rgb * 16.0; }
#else
vec4 ENC(vec3 c, float a){ return vec4(min(c, vec3(60000.0)), a); }
vec3 DEC(vec4 v){ return v.rgb; }
#endif
vec4 lightAt(vec3 P){
  if (SUN > 0.5) return vec4(normalize(LP), LI);
  vec3 d = LP - P; float l2 = dot(d, d); vec3 l = d * inversesqrt(l2);
  return vec4(l, LI / l2 * (0.02 + 0.98 * smoothstep(CONE0, CONE1, -dot(l, LAIM))));
}
// the bottle's round radius at height y: rounded heel, grip ribs, shoulder, neck and its support ring
float prof(float y){
  float r = RB;
  if (y < RF) { float k = RF - y; r = RB - RF + sqrt(max(RF * RF - k * k, 1e-5)); }
  // the blown shoulder: a dome leaving the body on its tangent (an ellipse that meets the neck's radius at YS1), then a
  // short tight fillet into the neck
  float s = max((y - YS0) / (YS1 - YS0), 0.0) * 0.965808, A = 1.35 * (RB - RN);
  float rd = r - A + A * sqrt(max(1.0 - s * s, 0.0)), hf = max(0.45 - abs(rd - RN), 0.0) / 0.45;
  r = max(rd, RN) + hf * hf * 0.1125;
  float inb = step(abs(y - 4.5), 0.95) + step(abs(y - 10.5), 0.95);
  float f = fract(y / 0.6) - 0.5;
  r -= RIBD * inb * pw2(max(1.0 - pw2(f / 0.24), 0.0));
  r -= WAIST * exp(-pw2((y - 7.0) / 2.6));
  r += 0.2 * smoothstep(0.04, 0.0, abs(y - FLY) - 0.06);
  return r;
}
`,xe=`
vec3 bokeh(vec2 q, float cw, vec4 reg, vec3 c1, vec3 c2, float k){
  vec3 acc = vec3(0.0);
  int n = NBK;
  for (int i = 0; i < n; i++) {
    float fi = float(i);
    vec2 bp = mix(reg.xy, reg.zw, vec2(h12(vec2(fi, SEED + 1.0)), h12(vec2(fi + 9.0, SEED))));
    // a street light or a lit window out there: each its own size and strength, some of them far and only points
    float hz = h12(vec2(fi, 17.0 + SEED));
    float br = (cw * 0.5 + 0.4) * mix(0.25, 1.15, hz * hz);
    float dd = length(q - bp) - br;
    float rim = 0.8 + 0.3 * smoothstep(-br * 0.6, 0.0, dd);
    acc += mix(c1, c2, step(0.6, h12(vec2(fi, 4.0)))) * pw2(h12(vec2(fi, 7.0))) * (1.0 - smoothstep(-0.2, 0.2, dd)) * rim * k / max(br * br, 0.6);
  }
  return acc;
}
vec3 wallShade(vec3 o, vec3 d, float dist, float ex){
  if (d.z > -1e-3) return AMB;
  float t = (-ZW - o.z) / d.z;
  vec3 P = o + d * t;
  float cw = max(AP * abs(dist + t - FOC) / FOC + ex * t, 0.05);
  vec2 q = P.xy;
  vec4 L = lightAt(P);
  vec3 E = LCOL * L.w * max(L.z, 0.0) + AMB * 2.0;
  float lo = smoothstep(cw, -cw, P.y);
#if SETK == 0
  {
    // a kitchen at night, far out of focus: a lit back wall, the worktop along it with its clutter, cupboard fronts below,
    // the window over the sink. Everything here is big soft shapes because the lens is focused on the bottle.
    float cw2 = cw + 0.5;
    vec3 wal = WALC * (0.82 + 0.36 * nz(q * 0.006, cw * 0.006).r);
    float ws = exp(-pw2((q.x - LP.x * 2.0) / 150.0)) * (0.6 + 0.4 * smoothstep(-20.0, 30.0, q.y));
    vec3 c = wal * (E * 0.7 + LCOL * 0.13 * ws + vec3(1.0, 0.84, 0.64) * 0.03);
    float top = 8.0;
    // the strip light under the wall cupboards washing the splashback
    float strip = exp(-pw2((q.y - top - 11.0) / 16.0)) * (0.6 + 0.6 * nz(q * 0.012, cw * 0.012).r);
    c += vec3(1.0, 0.74, 0.48) * 0.34 * strip * smoothstep(top - cw2, top + cw2, q.y) * smoothstep(-90.0, 30.0, q.x);
    // things standing on the worktop: canisters, a kettle, jars: blurred masses lit from above
    for (int i = 0; i < NBK; i++) {
      float fi = float(i);
      float px_ = mix(-105.0, 105.0, (fi + 0.2 + 0.6 * h12(vec2(fi, SEED + 3.0))) / max(float(NBK), 1.0));
      float hw = 8.0 + 16.0 * h12(vec2(fi, 5.5 + SEED));
      float hh = 14.0 + 30.0 * h12(vec2(fi, 8.1 + SEED));
      vec2 dd = abs(vec2(q.x - px_, q.y - top - hh * 0.5)) - vec2(hw, hh * 0.5);
      float sd = length(max(dd, 0.0)) + min(max(dd.x, dd.y), 0.0) - 2.5;
      float m = smoothstep(cw2, -cw2, sd);
      vec3 pal = mix(vec3(0.58, 0.42, 0.28), mix(vec3(0.32, 0.4, 0.42), vec3(0.72, 0.62, 0.42), h12(vec2(fi, 2.7))), h12(vec2(fi, 11.0)));
      float cbr = h12(vec2(fi, 13.3 + SEED));
      c = mix(c, pal * (E * 0.4 + vec3(1.0, 0.8, 0.55) * (0.03 + (0.1 + 0.42 * step(0.72, cbr)) * smoothstep(-cw2, hh, q.y - top))), m * 0.96);
      c += vec3(1.0, 0.86, 0.66) * 0.5 * step(0.72, cbr) * exp(-pw2(q.x - px_ + hw * 0.3) / pw2(cw2 + 2.5) - pw2(q.y - top - hh * 0.72) / pw2(cw2 + 2.5));
    }
    // cupboard fronts below the worktop, faintly separated, catching the lamp's spill
    float ctr = smoothstep(top + cw2, top - cw2, q.y);
    float doors = 1.0 - 0.28 * (1.0 - smoothstep(0.2, 0.7 + cw, abs(fract(q.x / 48.0) - 0.5) * 48.0));
    float dn_ = floor(q.x / 48.0), dfx = q.x / 48.0 - dn_;
    float dbr = mix(h12(vec2(dn_, SEED + 6.0)), h12(vec2(dn_ + 1.0, SEED + 6.0)), smoothstep(0.5 - cw2 / 48.0, 0.5 + cw2 / 48.0, dfx));
    vec3 cup = CUPC * (E * 0.7 + vec3(0.22, 0.17, 0.12) * (0.4 + 0.6 * smoothstep(-55.0, top, q.y))) * doors * (0.74 + 0.5 * dbr);
    cup *= 1.0 - 0.55 * smoothstep(top - 18.0, top - 2.0, q.y);
    cup += vec3(1.0, 0.82, 0.6) * 0.14 * exp(-pw2((fract(q.x / 48.0 + 0.18) - 0.5) * 48.0) / pw2(cw2 + 1.5) - pw2(q.y - top + 9.0) / pw2(cw2 + 1.5));
    c = mix(c, cup, ctr);
    c += vec3(1.0, 0.8, 0.58) * 0.26 * exp(-pw2((q.y - top) / max(cw * 0.5, 2.0)));
    float inW = smoothstep(-cw, cw, min(min(q.x - WIN.x, WIN.z - q.x), min(q.y - WIN.y, WIN.w - q.y)));
    float bars = smoothstep(1.6 - cw, 1.6 + cw, abs(q.x - WIN2.x));
    vec3 night = vec3(0.012, 0.018, 0.035) * (1.0 + 2.0 * smoothstep(WIN.y + 30.0, WIN.y, q.y));
    night += bokeh(q, cw, vec4(WIN.x + 4.0, WIN.y + 2.0, WIN.z - 4.0, WIN.y + 22.0), vec3(1.0, 0.55, 0.22), vec3(0.75, 0.85, 1.0), 0.6);
    float frm = smoothstep(-cw, cw, min(min(q.x - WIN.x + 5.0, WIN.z + 5.0 - q.x), min(q.y - WIN.y + 4.0, WIN.w + 5.0 - q.y)));
    c = mix(c, vec3(0.78, 0.74, 0.66) * (E * 0.8 + vec3(1.0, 0.8, 0.56) * 0.11), frm * (1.0 - inW));
    float bar2 = smoothstep(1.4 - cw, 1.4 + cw, abs(q.y - WIN2.y * 0.3));
    c = mix(c, night * 2.5, inW * bars * bar2 * 0.94);
    // the room runs on past the frame and dims; an open doorway to the lit hall stands off to the right. The camera
    // never sees it, the water does
    c *= 1.0 - 0.8 * smoothstep(170.0, 430.0, abs(q.x));
    c *= 0.3;
    float dr = smoothstep(-cw, cw, min(min(q.x - 116.0, 160.0 - q.x), 190.0 - q.y));
    c = mix(c, vec3(1.0, 0.8, 0.56) * (0.5 + 0.9 * smoothstep(-70.0, 110.0, q.y)), dr);
    return c;
  }
#elif SETK == 1
  {
    // glazed tiles, each a little out of true, each holding its own blurred highlight of the bulb
    vec2 tq = q / 7.5 + vec2(0.31, 0.0);
    vec2 tid = floor(tq), tf = fract(tq) - 0.5;
    float ht = h12(tid + SEED * 3.1), ht2 = h12(tid + 9.4);
    float gd = (0.5 - max(abs(tf.x), abs(tf.y))) * 7.5;
    float gr = 1.0 - smoothstep(0.08, 0.16 + cw * 0.35, gd);
    vec3 alb = WDN * (0.92 + 0.12 * ht);
    vec3 c = mix(alb, alb * vec3(0.8, 0.78, 0.74), gr * smoothstep(2.2, 0.6, cw)) * E;
    vec3 n = normalize(vec3((ht - 0.5) * 0.06 + (nz(q * 0.05, cw * 0.05).r - 0.5) * 0.08, (ht2 - 0.5) * 0.06, 1.0));
    vec3 r = reflect(d, n);
    float sp = max(dot(r, normalize(LP - P)), 0.0);
    float sh = 300.0 / (1.0 + cw * cw * 2.0);
    c += LCOL * (1.0 - gr) * LBR * 0.035 * pow(sp, sh) * (sh / 300.0 + 0.02);
    return mix(c, AMB * 0.5, lo);
  }
#else
  // the sunny window: bright leaves and sky behind the glass, the dim room wall around it
  vec3 wal = vec3(0.42, 0.36, 0.3) * (0.85 + 0.3 * nz(q * 0.004, cw * 0.004).r);
  vec3 c = wal * (AMB * 3.5 + LCOL * 0.04);
  float inW = smoothstep(-cw, cw, min(min(q.x - WIN.x, WIN.z - q.x), min(q.y - WIN.y, WIN.w - q.y)));
  float fr = smoothstep(-cw, cw, min(min(q.x - WIN.x + 4.0, WIN.z + 4.0 - q.x), min(q.y - WIN.y + 3.0, WIN.w + 4.0 - q.y)));
  float bars = smoothstep(1.8 - cw, 1.8 + cw, abs(q.x - WIN2.x)) * smoothstep(1.5 - cw, 1.5 + cw, abs(q.y - WIN2.y));
  float lf = nz(q * 0.012 + 0.2, cw * 0.012).r * 0.65 + nz(q * 0.035, cw * 0.035).a * 0.35;
  float leaf = smoothstep(0.42, 0.58, lf + 0.15 * smoothstep(WIN.y, WIN.w, q.y) * -1.0 + 0.1);
  vec3 sky = vec3(1.25, 1.42, 1.65) * 2.2;
  vec3 lv = mix(vec3(0.18, 0.26, 0.07), vec3(0.75, 0.68, 0.28), nz(q * 0.05, cw * 0.05).b) * 2.4;
  vec3 ext = mix(sky, lv, leaf) + bokeh(q, cw, vec4(WIN.x, WIN.y, WIN.z, WIN.y + 40.0), vec3(1.6, 1.25, 0.7), vec3(1.4, 1.4, 1.1), 1.2) * leaf;
  c = mix(c, vec3(0.75, 0.7, 0.62) * (AMB * 4.0 + LCOL * 0.06), fr * (1.0 - inW));
  c = mix(c, ext, inW * bars);
  return mix(c, wal * (AMB * 2.4 + LCOL * 0.02), lo);
#endif
}
void main(){
  vec2 uv = gl_FragCoord.xy / S_;
  oC = ENC(wallShade(EYE, rayDir(uv), 0.0, 0.0), 1.0);
}
`,Yt=`
uniform sampler2D uL;
float bottleLight(vec3 P, vec3 l, float sqq, float lv, float sh){
  float ll = length(l.xz);
  if (ll < 1e-3) return 1.0;
  vec2 u = -l.xz / ll;
  float D = dot(P.xz, u);
  if (D < -RB * 1.25) return 1.0;
  float X = u.x * P.z - u.y * P.x;
  float h = P.y + D * l.y / ll;
  if (h > CAPT) return 1.0;
  if (h > CAPB) return 1.0 - 0.72 * smoothstep(CAPR + 0.2, CAPR - 0.2, abs(X));
  if (h > lv) { float rn = RN + 0.05; return 1.0 - 0.55 * smoothstep(rn + 0.12, rn - 0.12, abs(X)) * (1.0 - 0.5 * smoothstep(rn * 0.85, rn * 0.3, abs(X))); }
  float R = prof(max(h, 0.4));
  float g = exp(-pw2((h - SQY) / SQW)) * smoothstep(0.8, 2.6, h) * smoothstep(YS0 + 0.8, YS0 - 1.6, h);
  float Dq = sqq * DMX * g;
  float a = R - Dq, b = R + 0.85 * Dq;
  float w = sqrt(pw2(a * u.y) + pw2(b * u.x));
  float dp = sqrt(pw2(a * u.x) + pw2(b * u.y));
  float Re = w * w / max(dp, 0.1);
  if (abs(X) > 2.35 * w) return 1.0;
  vec4 nq = textureLod(uN, P.xz * 0.04, 0.0);
  X += 0.04 * w * (nq.g - 0.5);
  X += sh * sin(P.z * 1.7 + TIME * 7.0 + 3.1 * sin(P.x * 0.6 + TIME * 3.3));
  float far_ = max(D / Re - 1.3, 0.0);
  X += far_ * w * 0.16 * (nq.a - 0.5);
  vec2 lu = vec2((X / w + 2.5) / 5.0, (D / Re + 1.2) / 13.2);
  if (lu.y > 1.0) return 1.0 - 0.15 * smoothstep(1.2, 0.8, abs(X / w));
  float v = textureLod(uL, lu, 0.0).r;
  float rib = (step(abs(h - 4.5), 0.95) + step(abs(h - 10.5), 0.95)) * RIBD * 40.0 * pw2(max(1.0 - pw2((fract(h / 0.6) - 0.5) / 0.24), 0.0));
  float vv = v * v * 8.0;
  vv += max(vv - 1.0, 0.0) * 0.8;
  return vv * (1.0 + rib * smoothstep(0.2, 1.2, far_) * smoothstep(1.3, 3.0, vv) * (0.2 + h12(vec2(floor(h / 0.6), 5.0 + SEED))));
}
`,be=Yt+`
uniform sampler2D uW;
float winMask(vec3 P, vec3 l){
#if SETK < 2
  return 1.0;
#endif
  float t = (-ZW - P.z) / min(l.z, -1e-3);
  vec2 q = P.xy + l.xy * t;
  float sw = 0.15 + t * 0.008;
  float inW = smoothstep(-sw, sw, min(min(q.x - WIN.x, WIN.z - q.x), min(q.y - WIN.y, WIN.w - q.y)));
  float bars = smoothstep(1.8 - sw, 1.8 + sw, abs(q.x - WIN2.x)) * smoothstep(1.5 - sw, 1.5 + sw, abs(q.y - WIN2.y));
  return inW * bars;
}
#if TTYK == 3
float gAn;
#endif
vec3 tableAlb(vec2 xz, float cw, out float rough, out float gl){
  vec3 al = TALB; rough = 0.3; gl = GLOSS;
#if TTYK < 2
  {
    float bw = TTY < 0.5 ? 12.0 : 15.0;
    float bx = xz.x / bw + 0.43, id = floor(bx), fx = fract(bx);
    // each board is laid in lengths whose butt joints are staggered from board to board
    float zz = xz.y + h12(vec2(id, 1.3 + SEED)) * 97.0;
    float sg = floor(zz / 97.0), fz = zz - sg * 97.0;
    float hb = h12(vec2(id * 7.0 + sg, 3.7 + SEED));
    // flat-sawn figure: the cut plane crosses the log's rings as nested arches down the board's middle, running out to
    // near-straight lines at its edges; the arches open and close as the cut wanders in depth
    float wb = nz(vec2(xz.x * 0.02 + hb, xz.y * 0.004 + hb * 0.3), cw * 0.02).r - 0.5;
    float wb2 = nz(vec2(xz.x * 0.06 + hb * 0.7, xz.y * 0.01), cw * 0.06).a - 0.5;
    float xc = (fx - 0.5 + 0.3 * (hb - 0.5)) * bw;
    float dep = 2.5 + 6.0 * hb + (0.05 + 0.04 * hb) * fz * (hb < 0.5 ? 1.0 : -1.0) + 3.0 * wb;
    float gx = sqrt(xc * xc + dep * dep) / (TTY < 0.5 ? 0.42 : 0.6) + wb2 * 1.5 + hb * 17.0;
    float lw = fract(gx);
    float aw = min(0.5, cw * 2.0 + 0.04);
    float late = smoothstep(0.62 - aw, 0.8, lw) * smoothstep(1.0, 0.86 - aw * 0.5, lw);
    late = mix(late, 0.3, smoothstep(0.1, 0.45, cw * 2.0));
    float pore = nz(vec2(xz.x * 0.9, xz.y * 0.03) + hb, cw * 0.9).b;
    float wear = nz(xz * 0.03 + 0.6, cw * 0.03).r;
    float fleck = smoothstep(0.72, 0.9, nz(vec2(xz.x * 0.5 + hb, xz.y * 0.09), cw * 0.5).g) * (1.0 - smoothstep(0.0, 0.3, cw));
    al *= (0.8 + 0.36 * hb) * (1.0 - 0.3 * late) * (0.9 + 0.16 * pore) * (0.94 + 0.12 * wear) * (1.0 + 0.18 * fleck * (1.0 - late));
    float sd = min(min(fx, 1.0 - fx) * bw, min(fz, 97.0 - fz) * 0.8);
    al *= 1.0 - 0.7 * (1.0 - smoothstep(0.04, 0.1 + cw, sd));
    rough = TTY < 0.5 ? 0.42 - 0.15 * wear : 0.22;
    gl *= 0.3 + 1.0 * smoothstep(0.3, 0.7, wear);
  }
#elif TTYK == 2
  {
    vec2 m = xz * 0.03;
    float f = nz(m, cw * 0.03).r * 2.0 + nz(m * 2.7 + 0.3, cw * 0.08).g;
    float vein = abs(sin(xz.x * 0.09 + xz.y * 0.05 + f * 5.0));
    float v1 = 1.0 - smoothstep(0.0, 0.07 + cw * 0.05, vein);
    float v2 = 1.0 - smoothstep(0.0, 0.25 + cw * 0.05, abs(sin(xz.x * 0.21 - xz.y * 0.13 + f * 7.0)));
    al *= (0.9 + 0.12 * nz(m * 4.0, cw * 0.12).b) * (1.0 - 0.45 * v1) * (1.0 - 0.12 * v2);
    rough = 0.07;
  }
#else
  {
    vec2 tq = xz / 5.0 + 0.5;
    vec2 tid = floor(tq), tf = abs(fract(tq) - 0.5) * 5.0;
    // the joints, filtered by what a pixel and the lens blur span on the table: along the view that span is stretched
    // by the grazing angle, so the joints running across soften as much as those running away, and far off the grid
    // fades to a faint texture instead of lines
    vec2 jw = vec2(cw, cw * gAn);
    vec2 jl = 1.0 - smoothstep(vec2(0.1), 0.18 + jw, 2.5 - tf);
    float gr = max(jl.x, jl.y) * min(1.0, 0.3 / (cw + 0.05));
    float ht = h12(tid + SEED);
    al *= mix(0.88 + 0.16 * ht, 0.62, gr) * (0.97 + 0.06 * nz(xz * 0.3 + ht, cw * 0.3).b);
    rough = mix(0.05, 0.6, gr) + 0.3 * smoothstep(0.2, 2.0, jw.y); gl *= 1.0 - 0.8 * gr;
  }
#endif
  return al;
}
vec3 wallAt(vec3 P){
  vec3 v = P - EYE; float z = max(dot(v, FW), 1.0);
  vec2 q = vec2(dot(v, RT), dot(v, UPV)) / (z * TANH);
  return DEC(textureLod(uW, clamp(q * 0.5 + 0.5, vec2(0.002), vec2(0.998)), 0.0));
}
void main(){
  vec2 uv = gl_FragCoord.xy / S_;
  vec3 rd = rayDir(uv);
  float tT = rd.y < -1e-4 ? -EYE.y / rd.y : 1e9;
  vec3 P = EYE + rd * tT;
  if (tT > 1e8 || P.z < -TBK) { oC = textureLod(uW, uv, 0.0); return; }
  float cw = AP * abs(tT - FOC) / FOC + PXW * tT / FOC;
  float rough, gl;
#if TTYK == 3
  gAn = 1.0 / max(-rd.y, 0.05);
#endif
  vec3 al = tableAlb(P.xz, cw, rough, gl);
  vec4 L = lightAt(P);
  float vis = winMask(P, L.xyz) * bottleLight(P, L.xyz, 0.0, LEV0, 0.0);
  float rr = length(P.xz);
  float ao = 1.0 - 0.7 * exp(-abs(rr - RB + 0.12) * 4.5);
  float sky = 1.0 - 0.5 * exp(-max(rr - RB, 0.0) * 0.25);
  vec3 E = LCOL * L.w * max(L.y, 0.0) * vis + AMB * 3.0 * ao * sky;
  vec3 c = al * E;
  vec3 Hh = normalize(L.xyz - rd);
  float sh = 2.0 / pw2(rough);
  c += LCOL * L.w * vis * gl * pow(max(Hh.y, 0.0), sh) * (sh + 2.0) / 8.0 * fres(dot(Hh, -rd), 1.5) * 0.25;
  c *= ao;
  // the room mirrored in the table, blurred by its roughness
  vec3 r = reflect(rd, vec3(0.0, 1.0, 0.0));
  float tw = (-ZW - P.z) / min(r.z, -1e-3);
  vec3 W = P + r * min(tw, 600.0);
  vec3 rc = vec3(0.0);
  float bl = rough * 0.35 * tw;
  for (int i = 0; i < NFOUR; i++) {
    vec3 o = vec3((float(i & 1) - 0.5) * bl, (float(i >> 1) - 0.5) * bl, 0.0);
    rc += wallAt(W + o);
  }
  c += rc * 0.25 * fres(-rd.y, 1.5) * gl * 0.9;
  oC = ENC(c, 1.0);
}
`,we=mt+`
uniform vec4 uP[${K}];
uniform vec2 uRg;
out vec2 vQ;
out float vA;
const vec2 C[6] = vec2[6](vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0), vec2(-1.0, 1.0), vec2(1.0, -1.0), vec2(1.0, 1.0));
void main(){
  int i = gl_VertexID / 6;
  vec4 p = uP[i];
  vec2 q = C[gl_VertexID % 6];
  vQ = q * 1.25; vA = p.w;
  vec2 w = p.xy + q * p.z * 1.25;
  gl_Position = vec4(w.x / uRg.x, w.y / uRg.y * 2.0 - 1.0, 0.0, 1.0);
}`,ye=`
in vec2 vQ;
in float vA;
void main(){
  float u = length(vQ);
  float cov = smoothstep(1.0 + vA, 1.0 - vA, u);
  // a bubble is a small lens: clear in the middle, a dark ring where it throws the light aside, bright along the edge
  // that faces the lamp, one pin of light
  float rim = smoothstep(0.45, 0.9, u);
  float lit = clamp(0.5 + 0.5 * dot(vQ / max(u, 1e-3), normalize(LW.xy + 1e-4)), 0.0, 1.0);
  vec3 c = (TPOOL * 0.5 + WUP) * rim * (0.07 + 1.9 * lit * lit * lit);
  c += LCOL * WSP * 0.07 * exp(-dot(vQ - LW.xy * 0.55, vQ - LW.xy * 0.55) / 0.02);
  oC = vec4(sqrt(clamp(c * cov / 16.0, 0.0, 1.0)), cov * (0.06 + 0.84 * rim));
}
`,Ee=`
uniform vec4 uD[${w0}];
uniform float uDn;
// the snapped-in dents: each a diamond facet on the wall, sharp-ridged as plastic folds are, pressed inward by its amount
float gRid;
float dents(float th, float y, float R){
  float tot = 0.0; gRid = 0.0;
  int n = int(uDn);
  for (int i = 0; i < n; i++) {
    vec4 d = uD[i];
    float dth = th - d.x;
    dth -= 2.0 * PI * floor(dth / (2.0 * PI) + 0.5);
    float fi = float(i);
    float ca = cos(fi * 1.7), sa = sin(fi * 1.7);
    vec2 q0 = vec2(dth * R, y - d.y);
    vec2 q = vec2(ca * q0.x + sa * q0.y, -sa * q0.x + ca * q0.y);
    float as = 0.55 + 0.4 * sin(fi * 2.31);
    float f = max(1.0 - (abs(q.x) / d.w + abs(q.y) / (d.w * as)), 0.0);
    tot += d.z * f;
    // the fold: the facet's rim and its long diagonal, where thin plastic whitens and keeps the mark
    float e = abs(q.x) / d.w + abs(q.y) / (d.w * as);
    gRid += d.z * 2.2 * (0.2 * exp(-pw2((e - 1.0) * 10.0)) + f * exp(-pw2(q.y / (0.03 * d.w))));
  }
  return tot;
}
float defo(float th, float y){
  float R = prof(y), r = R;
  float g = exp(-pw2((y - SQY) / SQW)) * smoothstep(0.8, 2.6, y) * smoothstep(YS0 + 0.8, YS0 - 1.6, y);
  float c = cos(th), s = sin(th);
  float D = SQ * DMX * g;
  float a = R - D, b = R + 0.85 * D;
  r = a * b * inversesqrt(b * b * c * c + a * a * s * s);
  vec2 sc = vec2(th * R, y);
  float side = 0.6 + 0.4 * pw2(pw2(c));
  vec4 n1 = textureLod(uN, sc * vec2(0.07, 0.045) + SEED * 0.13, 0.0);
  vec4 n2 = textureLod(uN, vec2(sc.x * 0.075 + sc.y * 0.05, sc.y * 0.075 - sc.x * 0.03) + 0.31, 0.0);
  float crease = 1.0 - abs(n2.r * 2.0 - 1.0);
  float pop = smoothstep(0.08, 0.45, SQ);
  r -= g * side * (SQ * 0.18 * n1.r + pop * 0.13 * crease * crease * crease * crease) * CRV;
  // the wall folds hardest where the flattened section bends sharpest, front and back
  float fold = pw2(pw2(s)); fold *= fold;
  r += g * smoothstep(0.3, 0.85, SQ) * 0.13 * fold * (1.0 - abs(n1.g * 2.0 - 1.0));
  r -= dents(th, y, R);
  // the petal foot: five feet, the valleys between them running up into the heel
  float ft = smoothstep(2.4, 0.15, y);
  r -= ft * ft * 0.36 * pw2(0.5 + 0.5 * cos(5.0 * th + SEAM * 3.0));
  // blow-moulded plastic is never quite true
  r += 0.012 * (n1.b - 0.5) + 0.007 * (n2.a - 0.5);
  return r - R;
}
void main(){
  vec2 f = gl_FragCoord.xy / vec2(${pt}.0, ${ut}.0);
  float th = (f.x * 2.0 - 1.0) * PI, y = f.y * DYH;
  vec3 v = vec3(0.0);
  float st = 0.0;
  for (int i = 0; i < NFOUR - 1; i++) { float e = 0.004; v[i] = defo(th + (i == 1 ? e : 0.0), y + (i == 2 ? e : 0.0)); if (i == 0) st = gRid; }
  vec3 o = vec3(v.x, (v.y - v.x) / 0.004, (v.z - v.x) / 0.004);
  // folds whiten unevenly; the two mould seams run opposite each other from shoulder to heel; where a label was, one
  // upright line of glue a hand high
  float R0 = prof(y);
  float br = smoothstep(0.25, 0.6, textureLod(uN, vec2(th * 0.9, y * 0.11) + 0.7, 0.0).g);
  float sm = smoothstep(0.035, 0.0, abs(sin(th - SEAM)) * R0) * smoothstep(0.3, 1.2, y) * smoothstep(YS1 + 0.3, YS1 - 0.4, y);
  float gd = th - SEAM - 2.2; gd -= 2.0 * PI * floor(gd / (2.0 * PI) + 0.5);
  float glu = smoothstep(0.06, 0.0, abs(gd) * R0) * smoothstep(0.0, 0.1, y - YS0 * 0.4) * smoothstep(0.0, 0.1, YS0 * 0.72 - y);
  st = clamp(st * br * (0.4 + 0.6 * SCUFF) + 0.55 * sm + 0.35 * glu, 0.0, 1.0);
  // a misted wall: a few drops have run down through the dew, each leaving one narrow clear path, nearly straight, from
  // where it grew to where it stopped, and hang there still as a bead (or ran into the heel). Packed into the alpha with
  // the marks: 0.5 to 1 marks, 0.25 to 0.5 a clear track, under 0.25 a bead (its lower rim's light)
  float a = 0.5 + 0.5 * st;
  if (COND > 0.001) {
    float ax = th * RB;
    float id = floor(ax / 0.62), hA = h12(vec2(id, SEED + 41.0));
    float hB = fract(hA * 37.13), hC = fract(hA * 91.71);
    float yt = mix(4.5, min(YS0, LEV - 1.3), hB), yb = yt - mix(2.5, 11.0, hC);
    float wd = 0.07 + 0.08 * fract(hA * 13.37), on = step(fract(hA * 7.31), 0.33);
    float dx = abs(ax - (id + 0.5 + (hA * 2.0 - 1.0) * 0.2) * 0.62 - 0.05 * sin(y * 1.9 + hA * 40.0));
    float trk = on * smoothstep(wd, wd * 0.5, dx) * smoothstep(yt + 0.1, yt - 0.1, y) * smoothstep(yb - 0.05, yb + 0.12, y);
    a = mix(a, 0.5 - 0.25 * trk, trk);
    float br_ = wd * 1.7 + 0.04;
    vec2 bq = vec2(dx, y - yb - br_ * 0.45) / br_;
    float bd = length(bq * vec2(1.0, 0.88));
    float cres = smoothstep(0.35, 0.9, bd) * smoothstep(0.1, -0.8, bq.y / max(bd, 1e-3)) + 0.6 * smoothstep(0.35, 0.1, length(bq - vec2(0.0, 0.5)));
    a = mix(a, 0.25 * (1.0 - clamp(cres, 0.0, 1.0)), on * step(0.5, yb) * smoothstep(1.0, 0.8, bd));
  }
#ifdef PK8
  oC = vec4(clamp(vec3(o.x * 0.5 + 0.5, o.y * 0.25 + 0.5, o.z * 0.25 + 0.5), 0.0, 1.0), clamp(a, 0.0, 1.0));
#else
  oC = vec4(o, clamp(a, 0.0, 1.0));
#endif
}
`,Te=`
uniform sampler2D uB;
uniform sampler2D uA;
uniform sampler2D uE;
vec3 envA(vec3 r, float kb){
  vec3 c = (AMB * (1.5 + r.y) + TPOOL * smoothstep(0.05, -0.4, r.y)) * kb;
  vec3 ld = SUN > 0.5 ? normalize(LP) : normalize(LP - vec3(0.0, 9.0, 0.0));
  float cl = dot(r, ld);
  c += LCOL * LBR * (smoothstep(SRCA - 0.004, SRCA + 0.0005, cl) * 0.5 + 0.002 * pow(max(cl, 0.0), 12.0));
  c += FILLC * smoothstep(0.7, 0.96, dot(r, FILLD)) * (0.6 + 0.4 * smoothstep(-0.2, 0.3, r.y));
  float pu = abs(r.x / max(r.z, 0.05) - PANC.w);
  c += PANC.rgb * 0.8 * smoothstep(0.03, 0.0, pu - 0.15) * smoothstep(0.004, 0.016, pu) * smoothstep(0.012, 0.03, abs(r.y - 0.04)) * step(0.0, r.z) * smoothstep(-0.46, -0.4, r.y) * smoothstep(0.36, 0.3, r.y);
  return c;
}
uniform sampler2D uR;
#ifdef PK8
vec3 DFS(vec4 v){ return vec3((v.x - 0.5) * 2.0, (v.y - 0.5) * 4.0, (v.z - 0.5) * 4.0); }
#else
vec3 DFS(vec4 v){ return v.xyz; }
#endif
float gSt = 0.5;
float sdB(vec3 p){
  float th = atan(p.z, p.x);
  float D = DFS(textureLod(uR, vec2(th / (2.0 * PI) + 0.5, p.y / DYH), 0.0)).x;
  return max(max(length(p.xz) - prof(p.y) - D, -p.y), p.y - CAPB - 0.25);
}
// the outward normal: the round profile's slope plus the squeeze map's slopes in angle and height
vec3 nrmB(vec3 p, out float pr0){
  float dp = 0.0;
  for (int i = 0; i < NTWO; i++) { float v = prof(p.y + float(i) * 0.004); if (i == 0) pr0 = v; dp = i == 0 ? -v : (dp + v) / 0.004; }
  if (p.y < 0.015) return vec3(0.0, -1.0, 0.0);
  float th = atan(p.z, p.x), rho = max(length(p.xz), 1e-3);
  vec4 gt = textureLod(uR, vec2(th / (2.0 * PI) + 0.5, p.y / DYH), 0.0);
  vec3 g = DFS(gt); gSt = gt.a;
  return normalize(vec3(p.x, 0.0, p.z) / rho - vec3(0.0, dp + g.z, 0.0) - g.y * vec3(-p.z, 0.0, p.x) / (rho * rho));
}
// where a ray leaving the bottle lands in the room (table, then the wall behind), looked up in the wide bake taken from
// just in front of the bottle: the water is a strong lens and most of what it shows lies outside the frame
vec3 roomAlong(vec3 o, vec3 d){
  float t = 1e4;
  if (d.y < -1e-4) { t = -o.y / d.y; if (o.z + d.z * t < -TBK) t = 1e4; }
  if (t > 9e3) t = d.z < -1e-4 ? (-ZW - o.z) / d.z : 300.0;
  vec3 v = o + d * min(t, 900.0) - ENVE.xyz;
  vec2 q = v.xy / (max(-v.z, 1.0) * ENVE.w);
  vec3 c = DEC(textureLod(uE, clamp(q * 0.5 + 0.5, vec2(0.004), vec2(0.996)), 0.0));
  return mix(c, AMB * 2.5 + TPOOL * 0.04, smoothstep(0.86, 1.0, max(abs(q.x), abs(q.y))));
}
// k 0: bubbles clinging inside the wall. k 1: cold beads of condensation outside it, smaller and brighter on top
vec4 bubIn(vec3 p){
  float th = atan(p.z, p.x);
  vec2 s = vec2(th * RB, p.y) / 0.3;
  vec2 id = floor(s), f = fract(s) - 0.5;
  float h = h12(id + SEED * 1.7);
  float dn = BDEN * (0.22 + 3.4 * smoothstep(0.4, 0.78, textureLod(uN, id * 0.027 + 0.5, 0.0).r)) * (1.0 + 2.0 * smoothstep(YS0 - 1.5, YS0 + 0.5, p.y) + 1.5 * smoothstep(1.2, 0.3, p.y)) * smoothstep(LEV, LEV - 0.3, p.y);
  vec4 res = vec4(0.0);
  if (!(h > dn)) {
  float rb = mix(0.07, 0.44, pw2(pw2(h12(id + 4.1))));
  vec2 c = (vec2(h12(id + 2.3), h12(id + 7.9)) - 0.5) * (1.0 - 2.0 * rb);
  float dd = length(f - c) / rb;
  float aa = PXW / (0.3 * rb) * 1.5;
  float cov = 1.0 - smoothstep(1.0 - aa, 1.0, dd);
  if (!(cov <= 0.0)) {
  vec2 bv = (f - c) / rb;
  float rim = smoothstep(0.45, 0.88, dd);
  float lit = clamp(0.5 + 0.5 * dot(bv / max(dd, 1e-3), normalize(LW.xy + 1e-4)), 0.0, 1.0);
  vec3 c0 = (TPOOL * 0.5 + WUP) * rim * (0.07 + 1.9 * lit * lit * lit) + LCOL * WSP * 0.07 * exp(-dot(bv - LW.xy * 0.55, bv - LW.xy * 0.55) / 0.02);
  res = vec4(c0, cov * (0.05 + 0.85 * rim));
  }
  }
  return res;
}
vec4 bubOut(vec3 p){
  float th = atan(p.z, p.x);
  vec2 s = vec2(th * RB, p.y) / 0.2;
  vec2 id = floor(s), f = fract(s) - 0.5;
  float h = h12(id + SEED * 1.7 + 31.0);
  float dn = COND * (0.5 + textureLod(uN, id * 0.013 + 0.2, 0.0).g) * smoothstep(LEV + 0.3, LEV - 0.8, p.y);
  vec4 res = vec4(0.0);
  if (!(h > dn)) {
  float rb = mix(0.07, 0.44, pw2(pw2(h12(id + 4.1))));
  vec2 c = (vec2(h12(id + 2.3), h12(id + 7.9)) - 0.5) * (1.0 - 2.0 * rb);
  float dd = length(f - c) / rb;
  float aa = PXW / (0.3 * rb) * 1.5;
  float cov = 1.0 - smoothstep(1.0 - aa, 1.0, dd);
  if (!(cov <= 0.0)) {
    vec2 dv = (f - c) / rb;
    float cz = sqrt(max(1.0 - dot(dv, dv), 0.0));
    vec3 n = vec3(dv.x, dv.y * 0.8, cz);
    vec3 dc = (TPOOL * 0.9 + WUP * 0.7) * (0.55 - 0.42 * dv.y) * (0.35 + 0.65 * cz) + envA(reflect(vec3(0.0, 0.0, -1.0), normalize(n)), 1.0) * (0.35 * (1.0 - cz) + 0.1) + LCOL * WSP * 0.05 * exp(-dot(dv - vec2(-0.3, 0.42), dv - vec2(-0.3, 0.42)) / 0.02);
    res = vec4(dc, cov * 0.86);
  }
  }
  return res;
}
void main(){
  vec2 uv = gl_FragCoord.xy / S_;
  vec3 rd = rayDir(uv), ro = EYE;
  vec3 bg = DEC(textureLod(uB, uv, 0.0));
  float Rb = RB + 0.45;
  float A = dot(rd.xz, rd.xz), Bq = dot(ro.xz, rd.xz), Cq = dot(ro.xz, ro.xz) - Rb * Rb;
  float disc = Bq * Bq - A * Cq;
  if (disc <= 0.0) { oC = ENC(bg, 0.0); return; }
  float sq = sqrt(max(disc, 0.0));
  vec3 o = ro, d = rd;
  float ta = (-Bq - sq) / A, tb = (-Bq + sq) / A;
  vec3 P1 = vec3(0.0), N1 = vec3(0.0, 0.0, 1.0), P2 = vec3(0.0), N2 = vec3(0.0, 0.0, 1.0);
  // lift: a ray leaving through the base (most of them reflected there, the base is seen at a grazing angle) is sent on
  // to the lit table beyond the heel instead of the shadowed spot under it
  float pr1 = 0.0, lift = 0.0;
  bool hit = false, wet = false, surf = false, back = false;
  float Fs = 0.0;
  int ns = NST;
  // the front wall (marched: it carries the creases), then the back wall solved as the squeezed elliptic section
  float t = max(ta, 0.0), fp = 1e9, tp = t;
  int ph = disc > 0.0 ? 0 : 3;
  for (int i = 0; i < ns; i++) {
    if (ph > 0) break;
    float f = sdB(ro + rd * t);
    if (f < 0.002) { if (f < 0.0 && fp < 1e8) t = tp + (t - tp) * fp / (fp - f); ph = 2; }
    else { fp = f; tp = t; t += max(f * 0.8, 0.004); if (t > tb) ph = 3; }
  }
  if (ph == 2) {
    hit = true; P1 = ro + rd * t; N1 = nrmB(P1, pr1);
    wet = P1.y < LEV + TILT * P1.x;
    o = P1; d = wet ? refract(rd, N1, 1.0 / 1.333) : rd;
    if (!wet && d.y < 0.0) {
      vec3 qs = P1 + d * ((LEV - P1.y) / d.y);
      qs = P1 + d * ((LEV + TILT * qs.x - P1.y) / d.y);
      if (length(qs.xz) < RN - 0.08) {
        surf = true; wet = true; Fs = fres(-d.y, 1.333);
        o = qs; d = refract(d, vec3(0.0, 1.0, 0.0), 1.0 / 1.333);
      }
    }
    float tx = 2.0 * RB, a = RB, b = RB, R = RB, R2 = RB;
    for (int i = 0; i < NFOUR; i++) {
      float y = clamp(o.y + d.y * tx, 0.0, CAPB);
      float pr = prof(y + (i == 3 ? 0.01 : 0.0));
      if (i == 3) { R2 = pr; break; }
      float g = exp(-pw2((y - SQY) / SQW)) * smoothstep(0.8, 2.6, y) * smoothstep(YS0 + 0.8, YS0 - 1.6, y);
      float Dq = SQ * DMX * g;
      R = pr; a = pr - Dq; b = pr + 0.85 * Dq;
      vec2 ia = vec2(1.0 / (a * a), 1.0 / (b * b));
      float qa = dot(d.xz * d.xz, ia), qb = dot(o.xz * d.xz, ia), qc = dot(o.xz * o.xz, ia) - 1.0;
      tx = (-qb + sqrt(max(qb * qb - qa * qc, 0.0))) / max(qa, 1e-6);
    }
    P2 = o + d * tx;
    vec2 gx = P2.xz / vec2(a * a, b * b);
    N2 = normalize(vec3(normalize(gx), -(R2 - R) / 0.01).xzy);
    if (P2.y < 0.0) { P2 = o + d * (-o.y / min(d.y, -1e-4)); N2 = vec3(0.0, -1.0, 0.0); lift = 2.5; }
    back = true;
  }
  vec3 col, rN, rr, rmB;
  float F1;
  if (!hit) { oC = ENC(bg, 0.0); return; }
  {
    if (!back) { P2 = o + d * 2.0; N2 = d; }
    float Lw = wet ? length(P2 - o) : 0.0;
    vec3 dOut = d; float Tx = 1.0;
    if (wet) {
      vec3 r = refract(d, -N2, 1.333);
      if (dot(r, r) < 1e-4) { dOut = lift > 0.0 ? d : vec3(0.0, 0.0, 1.0); Tx = 0.85; } else { dOut = r; Tx = 1.0 - fres(dot(d, N2), 1.333); }
    }
    // the plastic itself: a mould seam, hairline scratches and scuffs, a faint greasy film from being handled
    vec4 nu = textureLod(uN, vec2(P1.x * 0.16, P1.y * 0.05) + SEED * 0.07, 0.0);
    vec4 nf = textureLod(uN, vec2(P1.x * 0.9 + P1.y * 0.06, P1.y * 0.02) + 0.3, 0.0);
    float scr = pow(nf.b, 14.0) * SCUFF;
    float sx = P1.x - cos(SEAM) * pr1;
    float seam = smoothstep(0.05, 0.0, abs(sx));
    rN = normalize(N1 + (nu.gba - 0.5) * vec3(0.035, 0.03, 0.035) * (0.5 + SCUFF) + vec3(0.0, 0.05 * seam, 0.0));
    rr = reflect(rd, rN);
    vec3 rmA = vec3(0.0); rmB = vec3(0.0);
    // (the dry neck above the water too: clear plastic over the room, which the wide bake shows sharper than the backdrop)
    for (int i = (wet && dOut.z > 0.25) ? 1 : 0; i < NTWO; i++) { vec3 r = roomAlong(i == 0 ? P2 + vec3(0.0, lift, 0.0) : P1, i == 0 ? dOut : rr); if (i == 0) rmA = r; else rmB = r; }
    col = mix(rmA, (dOut.z > 0.25 ? TPOOL * 0.8 + WUP * 0.35 : rmA) * Tx, bvec3(wet));
    vec3 ldw = SUN > 0.5 ? normalize(LP) : normalize(LP - P2);
    col += LCOL * LBR * 0.3 * smoothstep(SRCA - 0.006, SRCA + 0.001, dot(dOut, ldw)) * Tx * float(wet);
    vec4 bb = vec4(0.0), fb = vec4(0.0), cb = vec4(0.0);
    // the clinging bubbles on the back and front walls, and condensation on the outside of the front wall
    int nw = wet ? NTWO : 0;
    for (int i = 0; i < nw; i++) { vec4 w = bubIn(i == 0 ? P2 : P1); if (i == 0) bb = w; else fb = w; }
    if (wet && COND > 0.001) cb = bubOut(P1);
    if (surf) fb = vec4(0.0);
    col = mix(col, bb.rgb, bb.a * 0.8);
    if (wet) {
      // the free bubbles, on the plane through the bottle's axis
      float ti = -o.z / d.z;
      if (ti > 0.0 && ti < Lw) {
        vec3 p = o + d * ti;
        vec4 lb = textureLod(uA, vec2(p.x / BLX * 0.5 + 0.5, p.y / BLY), 0.0);
        col = lb.rgb * lb.rgb * 16.0 + col * (1.0 - lb.a);
      }
    }

    col *= exp(-SIGW * Lw);
    col = mix(col, fb.rgb, fb.a);
    // the water surface seen from above in the neck mirrors the room through the neck wall, not a pale sheet
    if (surf) col = mix(col, bg * 0.8, Fs);
    float c1 = max(dot(-rd, N1), 0.0);
    col *= exp(-SIGG * WALLT * (1.0 / max(c1, 0.12) + 1.0));
    float mr = exp(-pw2((P1.y - LEV - TILT * P1.x - 0.03) / 0.04));
    col = col * (1.0 - 0.6 * mr) + (WUP + TPOOL) * 0.6 * mr * exp(-pw2((P1.y - LEV - TILT * P1.x - 0.06) / 0.02));
    float smudge = smoothstep(0.35, 0.75, nu.r);
    col *= 1.0 - 0.1 * seam;
    col = mix(col, TPOOL * 0.5 + AMB * 6.0, SCUFF * 0.1 * smoothstep(0.35, 0.8, nu.a));
    // seen edge-on the wall is a long path of plastic: the dark line inside every bottle's outline
    col *= 1.0 - 0.5 * pw2(pw2(1.0 - c1));
    if (!wet) {
      // the dry neck is a clear tube: its outline drawn by the long path through the plastic at its edges and by the
      // inner surface's thin line; the support ring's upper face catches the light as one bright line
      col *= 1.0 - 0.45 * smoothstep(0.35, 0.8, 1.0 - c1);
      col += (TPOOL * 0.3 + WUP * 0.6) * (0.35 * exp(-pw2((c1 - 0.3) / 0.05)) + 0.6 * smoothstep(0.3, 0.8, N1.y));
    }
    F1 = fres(c1, 1.57) * (0.7 + 0.6 * smudge);
    col *= 1.0 - F1;
    // the cold wall's dew: an even matt frosting below the water line, a little uneven, gone over the last centimetre
    // under the water line and at the heel. A few drops have run down through it: each left one narrow clear path,
    // nearly straight, from where it grew to where it stopped, and hangs there still as a bead (or ran into the heel)
    // (the tracks and beads come from the squeeze map's alpha, below 0.5)
    float trk = clamp(2.0 - gSt * 4.0, 0.0, 1.0), cres = clamp(1.0 - gSt * 4.0, 0.0, 1.0);
    if (COND > 0.001) {
      float mist = min(COND * 1.2, 0.3) * (0.8 + 0.4 * nu.r) * smoothstep(LEV - 0.15, LEV - 1.1, P1.y) * smoothstep(0.3, 1.0, P1.y);
      col = mix(col, TPOOL * 0.12 + vec3(dot(TPOOL, vec3(0.1))) + AMB * 6.0, mist * (1.0 - 0.85 * trk));
      // the water left along a track's edges catches the light; a bead is a small lens, its lower rim bright
      col = col * (1.0 - 0.4 * step(gSt, 0.25)) + (TPOOL * 0.5 + WUP) * (0.4 * trk * (1.0 - trk) * mist * 3.0 + 1.3 * cres);
    }
    if (cb.a > 0.0) col = mix(col, cb.rgb, cb.a);
    // the marks in the wall (folds, the mould seams, a label's glue line: the squeeze map's alpha) whiten the thin
    // plastic and hold a hard line of light; a fold flashes as it snaps
    float st = max(gSt * 2.0 - 1.0, 0.0) * step(0.4, P1.y);
    col = mix(col, TPOOL * 0.3 + AMB * 9.0, st * 0.3);
    col += (WUP * 1.2 + PANC.rgb * 0.02) * st * st * (1.0 + 3.0 * SNAPF);
    col += (FILLC * 0.7 + TPOOL * 0.35 + AMB * 8.0) * scr * 0.9;
  }
  // what the wall mirrors: the room behind it at the grazing edges (from the wide bake), the near room elsewhere
  float kr = smoothstep(0.12, -0.2, rr.z);
  col += (envA(rr, 1.0 - kr) + rmB * kr) * F1;
  oC = ENC(col, 1.0);
}
`,Re=`
vec3 envA(vec3 r){
  vec3 c = AMB * (1.5 + r.y) + TPOOL * smoothstep(0.05, -0.4, r.y);
  vec3 ld = SUN > 0.5 ? normalize(LP) : normalize(LP - vec3(0.0, 9.0, 0.0));
  float cl = dot(r, ld);
  c += LCOL * LBR * (smoothstep(SRCA - 0.006, SRCA + 0.002, cl) * 0.8 + 0.004 * pow(max(cl, 0.0), 6.0));
  c += FILLC * smoothstep(0.7, 0.96, dot(r, FILLD)) * (0.6 + 0.4 * smoothstep(-0.2, 0.3, r.y));
  float pu = abs(r.x / max(r.z, 0.05) - PANC.w);
  c += PANC.rgb * 0.8 * smoothstep(0.03, 0.0, pu - 0.15) * smoothstep(0.004, 0.016, pu) * smoothstep(0.012, 0.03, abs(r.y - 0.04)) * step(0.0, r.z) * smoothstep(-0.46, -0.4, r.y) * smoothstep(0.36, 0.3, r.y);
  return c;
}
vec4 capHit(vec3 ro, vec3 rd){
  float a = dot(rd.xz, rd.xz), b = dot(ro.xz, rd.xz), c = dot(ro.xz, ro.xz) - CAPR * CAPR;
  float D = b * b - a * c;
  if (D < 0.0) return vec4(1e9, 0.0, 0.0, 0.0);
  float t = (-b - sqrt(D)) / a;
  vec3 p = ro + rd * t;
  if (p.y > CAPB && p.y < CAPT) return vec4(t, normalize(vec3(p.x, 0.0, p.z)));
  if (p.y >= CAPT && rd.y < 0.0) {
    float tt = (CAPT - ro.y) / rd.y;
    vec3 q = ro + rd * tt;
    if (dot(q.xz, q.xz) < CAPR * CAPR) return vec4(tt, 0.0, 1.0, 0.0);
  }
  return vec4(1e9, 0.0, 0.0, 0.0);
}
// the cap's own light (its reflection is added by the caller): knurled plastic
vec3 capShade(vec3 P, vec3 n, vec3 rd, out vec3 nn){
  float th = atan(P.z, P.x);
  nn = n;
  if (abs(n.y) < 0.5) {
    float hy = P.y - CAPB, ch = CAPT - CAPB;
    float kn = smoothstep(0.56, 0.66, hy) * smoothstep(ch - 0.3, ch - 0.5, hy) * smoothstep(0.1, 0.45, n.z);
    nn = normalize(n + vec3(-sin(th), 0.0, cos(th)) * sin(th * 84.0) * 0.3 * kn + vec3(0.0, 1.3, 0.0) * smoothstep(ch - 0.3, ch, hy));
  } else {
    float rr = length(P.xz) / CAPR;
    nn = normalize(vec3(P.x, 0.0, P.z) * smoothstep(0.82, 1.0, rr) * 1.5 / CAPR + vec3(0.0, 1.0, 0.0));
  }
  vec4 L = lightAt(P);
  float dif = max(dot(nn, L.xyz), 0.0);
  float gap = 1.0 - smoothstep(0.012, 0.03, abs(P.y - CAPB - 0.5));
  vec3 c = CAPC * (LCOL * L.w * dif + AMB * 3.0 + TPOOL * 0.35 * (0.4 + 0.6 * max(-nn.y, 0.0)) + AMB * 2.0 * max(nn.z, 0.0) + PANC.rgb * 0.06 * max(dot(nn, FILLD), 0.0));
  c += LCOL * L.w * 0.25 * pow(max(dot(reflect(rd, nn), L.xyz), 0.0), 40.0);
  return c * (1.0 - 0.85 * gap);
}
void main(){
  vec2 uv = gl_FragCoord.xy / S_;
  vec3 rd = rayDir(uv);
  vec4 cp = capHit(EYE, rd);
  if (cp.x > 1e8) discard;
  vec3 P = EYE + rd * cp.x, nn;
  vec3 col = capShade(P, cp.yzw, rd, nn);
  float F = fres(max(dot(-rd, nn), 0.0), 1.5) * 0.7;
  oC = ENC(col * (1.0 - F) + envA(reflect(rd, nn)) * F, 1.0);
}
`,Le=Yt+`
uniform sampler2D uB;
uniform sampler2D uF;
void main(){
  vec2 uv = gl_FragCoord.xy / S_;
  vec2 px = vec2(1.0 / S_);
  bool inR = uv.x > RECT.x + px.x && uv.x < RECT.z - px.x && uv.y > RECT.y + px.y && uv.y < RECT.w - px.y;
  vec4 f0 = textureLod(uF, uv, 0.0);
  vec3 c = inR ? DEC(f0) : DEC(textureLod(uB, uv, 0.0));
  float cov = inR ? f0.a : 0.0;
  // the table's light, moved by the squeeze: the bake holds the caustic of the round bottle, this is the ratio
  if (cov < 0.5 && (SQ > 0.004 || SURGE > 0.004)) {
    vec3 rdT = rayDir(uv);
    float tT = rdT.y < -1e-4 ? -EYE.y / rdT.y : 1e9;
    vec3 Pt = EYE + rdT * tT;
    if (tT < 1e8 && Pt.z > -TBK) {
      vec4 Lt = lightAt(Pt);
      float v0 = bottleLight(Pt, Lt.xyz, 0.0, LEV0, 0.0);
      float v1 = bottleLight(Pt, Lt.xyz, SQ, LEV, SURGE * 0.34);
      c *= (v1 + 0.3) / (v0 + 0.3);
    }
  }
  if (U[37].x > 0.0 && cov < 0.5) {
    float dx = (uv.x - RFL.z) / RFL.w;
    if (abs(dx) < 1.0) {
      float yf = RFL.x + (RFL.y - RFL.x) * (1.0 - sqrt(1.0 - dx * dx));
      float dy = yf - uv.y;
      if (dy > -0.002) {
        vec2 ru = vec2(uv.x, yf + max(dy, 0.0));
        float bl = 0.002 + max(dy, 0.0) * U[37].y, cut = 1.0;
        if (U[34].w > 0.0) {
          // glazed tiles: each lies at its own slight tilt, so the image steps from tile to tile, and the matt grout
          // breaks it at every joint
          vec3 rdM = rayDir(uv);
          vec2 tq = (EYE.xz + rdM.xz * (-EYE.y / min(rdM.y, -1e-4))) / U[34].w + 0.5;
          vec2 tf = abs(fract(tq) - 0.5);
          float ht = h12(floor(tq) + SEED);
          ru += (vec2(ht, fract(ht * 23.7)) - 0.5) * vec2(0.004, 0.012);
          cut = smoothstep(0.47, 0.44, max(tf.x, tf.y));
        }
        vec4 acc = vec4(0.0);
        for (int i = 0; i < NFOUR; i++) {
          vec2 o = vec2(float(i & 1) - 0.5, float(i >> 1) - 0.5) * bl;
          vec2 q = clamp(ru + o, RECT.xy + 2.0 * px, RECT.zw - 2.0 * px);
          vec4 f = textureLod(uF, q, 0.0);
          acc += vec4(DEC(f) * f.a, f.a);
        }
        acc *= 0.25;
        float k = U[37].x * exp(-max(dy, 0.0) * U[37].z) * smoothstep(-0.002, 0.004, dy) * cut;
        c = c * (1.0 - k * acc.a) + k * acc.rgb;
      }
    }
  }
  c *= EXPO;
  c = (c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14);
  c = pow(clamp(c, 0.0, 1.0), vec3(1.0 / 2.2));
  vec2 v = uv - 0.5;
  c *= 1.0 - 0.13 * pow(dot(v, v) * 2.0, 1.4);
  c += (h12(gl_FragCoord.xy) - 0.5) * 0.008;
  oC = vec4(c, 1.0);
}
`;function y0(t,a,l){const h=(M,U)=>{const R=t.createShader(M);return t.shaderSource(R,U),t.compileShader(R),R},m=t.createProgram(),u=h(t.VERTEX_SHADER,a),T=h(t.FRAGMENT_SHADER,l);return t.attachShader(m,u),t.attachShader(m,T),t.linkProgram(m),t.flush(),{p:m,u:{},sh:[u,T],ok:!1}}const Xt={uN:0,uB:1,uF:2,uA:3,uE:4,uL:5,uW:6,uR:7};function E0(t,a,l){const h=a[l];if(h.ok)return h;if(!t.getProgramParameter(h.p,t.LINK_STATUS))throw new Error("140 link "+l+": "+t.getProgramInfoLog(h.p)+" "+t.getShaderInfoLog(h.sh[1]));const m=t.getProgramParameter(h.p,t.ACTIVE_UNIFORMS);for(let u=0;u<m;u++){const T=t.getActiveUniform(h.p,u);h.u[T.name.replace(/\[0\]$/,"")]=t.getUniformLocation(h.p,T.name)}t.useProgram(h.p);for(const u in Xt)h.u[u]&&t.uniform1i(h.u[u],Xt[u]);return h.ok=!0,h}function Pe(t,a,l,h){const m=t.createTexture();t.bindTexture(t.TEXTURE_2D,m),t.texImage2D(t.TEXTURE_2D,0,a,4,4,0,l,h,null);const u=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,u),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,m,0);const T=t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE;return t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(u),t.deleteTexture(m),T}const Vt=(t,a,l,h)=>{const m="wall"+l,u="tab"+(l===2?2:0)+h;return a[m]||(a[m]=y0(t,g0,a.hd+"#define SETK "+l+r0+xe)),a[u]||(a[u]=y0(t,g0,a.hd+"#define SETK "+(l===2?2:0)+r0+"#define TTYK "+h+r0+be)),[m,u]};function Ae(t,a,l){let h=_t.get(t);if(h)return h;const m=!!t.getExtension("EXT_color_buffer_float"),u=!!t.getExtension("EXT_color_buffer_half_float");t.getExtension("KHR_parallel_shader_compile");const T=(m||u)&&Pe(t,t.RGBA16F,t.RGBA,t.HALF_FLOAT);h={vao:t.createVertexArray(),half:T,luts:{}};const M=T?"":"#define PK8 1"+r0,U=mt+ue+M+ve;h.hd=U,Vt(t,h,a,l),h.btl=y0(t,g0,U+Te),h.fin=y0(t,g0,U+Le),h.def=y0(t,g0,U+Ee),h.cap=y0(t,g0,U+Re),h.bub=y0(t,we,U+ye);const R=128,k=(w,n,b,s)=>{w=(w%b+b)%b,n=(n%b+b)%b;let v=w*374761393+n*668265263+s*2246822519|0;return v=Math.imul(v^v>>>13,1274126177),v^=v>>>16,(v>>>0)/4294967296},D=(w,n,b,s)=>{const v=Math.floor(w),F=Math.floor(n),I=w-v,d=n-F,g=I*I*(3-2*I),y=d*d*(3-2*d),E=k(v,F,b,s),N=k(v+1,F,b,s),W=k(v,F+1,b,s),Q=k(v+1,F+1,b,s);return E+(N-E)*g+(W-E)*y+(E-N-W+Q)*g*y},H=(w,n,b,s,v)=>{let F=0,I=.5,d=b,g=0;for(let y=0;y<s;y++)F+=I*D(w*d/R,n*d/R,d,v+y),g+=I,I*=.5,d*=2;return F/g},B=new Uint8Array(R*R*4);for(let w=0;w<R;w++)for(let n=0;n<R;n++){const b=(w*R+n)*4;B[b]=H(n,w,4,4,13)*255,B[b+1]=H(n,w,8,3,29)*255,B[b+2]=(D(n*32/R,w*32/R,32,41)*.5+D(n*64/R,w*64/R,64,43)*.5)*255,B[b+3]=H(n,w,16,2,71)*255}for(let w=0;w<4;w++){let n=255,b=0;for(let s=w;s<B.length;s+=4)n=Math.min(n,B[s]),b=Math.max(b,B[s]);for(let s=w;s<B.length;s+=4)B[s]=(B[s]-n)*255/Math.max(1,b-n)}return h.noise=t.createTexture(),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,h.noise),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,R,R,0,t.RGBA,t.UNSIGNED_BYTE,B),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),_t.set(t,h),h}function ze(t,a,l,h){const m=l.toFixed(3)+"/"+h.toFixed(3);if(a.luts[m])return a.luts[m];const u=128,T=64,M=2.5,U=-1.2,R=12,k=1100,D=9,H=3.2,B=new Float32Array(u*T),w=2*M/u,n=new Float32Array(T);for(let d=0;d<T;d++)n[d]=U+(d+.5)*(R-U)/T;const b=(d,g)=>{const y=g*g*(1-d*d);if(y>=1)return 1;const E=Math.sqrt(1-y),N=(g*d-E)/(g*d+E),W=(g*E-d)/(g*E+d);return .5*(N*N+W*W)},s=(d,g,y)=>{const E=(g+M)/w-.5,N=Math.floor(E),W=E-N;N>=0&&N<u&&(B[d*u+N]+=y*(1-W)),N+1>=0&&N+1<u&&(B[d*u+N+1]+=y*W)},v=2*H/k/D/w;for(let d=0;d<D;d++){const g=(d/(D-1)-.5)*2*h,y=Math.cos(g),E=Math.sin(g);for(let N=0;N<k;N++){const W=-H+(N+.5)*2*H/k,Q=-4*y-W*E,V=-4*E+W*y,h0=Q*y+V*E,Y0=Q*Q+V*V-1,n0=h0*h0-Y0;if(n0<=0){for(let f=0;f<T;f++)s(f,V+(n[f]-Q)*E/y,v);continue}const _=-h0-Math.sqrt(n0),d0=Q+y*_,T0=V+E*_;let j=-(y*d0+E*T0);const X=1/l,U0=1-X*X*(1-j*j),m0=1-b(j,X);let O=X*y+(X*j-Math.sqrt(U0))*d0,G=X*E+(X*j-Math.sqrt(U0))*T0;const Y=Math.hypot(O,G);O/=Y,G/=Y;const N0=-2*(d0*O+T0*G),s0=d0+O*N0,L=T0+G*N0,P=O*s0+G*L,J=1-l*l*(1-P*P);let q0=0,Z=0,p=0;if(J>0){q0=1-b(P,l),Z=l*O+(Math.sqrt(J)-l*P)*s0,p=l*G+(Math.sqrt(J)-l*P)*L;const f=Math.hypot(Z,p);Z/=f,p/=f}for(let f=0;f<T;f++){const p0=n[f];p0<d0?s(f,V+(p0-Q)*E/y,v):p0<s0?O>1e-4&&s(f,T0+(p0-d0)*G/O,v*m0):q0>0&&Z>1e-4&&s(f,L+(p0-s0)*p/Z,v*m0*q0)}}}const F=new Uint8Array(u*T);for(let d=0;d<F.length;d++)F[d]=Math.round(Math.sqrt(a0(B[d]/8,0,1))*255);const I=t.createTexture();return t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,I),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R8,u,T,0,t.RED,t.UNSIGNED_BYTE,F),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),a.luts[m]=I,I}function S0(t,a,l,h){const m=t.createTexture();return t.bindTexture(t.TEXTURE_2D,m),h?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,a,l,0,t.RGBA,t.HALF_FLOAT,null):t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,a,l,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),m}function C0(t,a){const l=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,l),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,a,0),l}const ge=[{name:"Ribbed",RB:3.3,RF:.7,YS0:12.6,YS1:16.7,RN:1.12,CAPB:17.9,CAPT:20,CAPR:1.48,FLY:17.6,LEV:16.85,ribs:.018,waist:0,wall:.03,ybot:.35,sig:[.03,.02,.02]},{name:"Waisted grip",RB:3.3,RF:.7,YS0:12.6,YS1:16.7,RN:1.12,CAPB:17.9,CAPT:20,CAPR:1.48,FLY:17.6,LEV:16.85,ribs:.01,waist:.78,wall:.03,ybot:.35,sig:[.03,.02,.02]},{name:"Blue plastic",RB:3.2,RF:.55,YS0:14.2,YS1:16.7,RN:1.12,CAPB:17.9,CAPT:20,CAPR:1.48,FLY:17.6,LEV:16.85,ribs:.018,waist:0,wall:.03,ybot:.35,sig:[9,3.5,1.1]},{name:"Smooth",RB:3.75,RF:.9,YS0:10.6,YS1:16.4,RN:1.12,CAPB:17.9,CAPT:20,CAPR:1.48,FLY:17.6,LEV:16.6,ribs:0,waist:0,wall:.03,ybot:.35,sig:[.03,.02,.02]}],Se=[{name:"As bought",scuff:.25,dents:0,mem:0},{name:"Scuffed",scuff:.7,dents:4,mem:.4},{name:"Crushed",scuff:1,dents:12,mem:1.15}],Ce=[{name:"Dry",d:0},{name:"Misted",d:.18},{name:"Beaded",d:.42}],vt=[{wall:[.62,.6,.5],cup:[.36,.24,.14]},{wall:[.42,.5,.42],cup:[.6,.55,.46]},{wall:[.22,.3,.4],cup:[.18,.22,.24]}],Me=[{name:"Clear",sig:[.003,.0012,8e-4]},{name:"Faintly blue",sig:[.045,.014,.004]},{name:"Sparkling",sig:[.003,.0012,8e-4]}],Ue=[{name:"Kitchen at night",sun:0,L:[-24,26,-10],LI:1400,col:[1,.78,.52],cone:[.915,.975],src:.035,amb:[.0026,.0029,.004],fillD:[.6,.25,.75],fillC:[.05,.055,.07],ZW:230,TBK:125,win:[-95,13,-18,110],win2:[-57,200],ex:1.5,nbk:7,wall:[.3,.3,.3]},{name:"Bathroom tiles",sun:0,L:[-24,38,-12],LI:900,col:[1,.88,.74],cone:[-.2,.6],src:.04,amb:[.006,.0068,.008],fillD:[.55,.3,.78],fillC:[.12,.13,.14],ZW:26,TBK:26,win:[0,0,0,0],win2:[0,0],ex:1,nbk:0,wall:[.8,.82,.8]},{name:"Window afternoon",sun:1,L:[-.45,.42,-.79],LI:1.5,col:[1,.8,.58],cone:[-1,-.9],src:.02,amb:[.04,.046,.058],fillD:[-.5,.25,-.8],fillC:[.6,.65,.7],ZW:70,TBK:45,win:[-75,8,-5,80],win2:[-52,50],ex:.85,nbk:8,wall:[.3,.3,.3]}],Ne=[{name:"Oak boards",ty:0,al:[.5,.33,.18],gloss:.35},{name:"Walnut",ty:1,al:[.22,.12,.07],gloss:.6},{name:"Grey marble",ty:2,al:[.72,.71,.69],gloss:.9},{name:"Tiled ledge",ty:3,al:[.8,.82,.81],gloss:.8}],qe=[{name:"Blue cap",c:[.03,.12,.42]},{name:"White cap",c:[.72,.72,.69]},{name:"Green cap",c:[.04,.26,.1]},{name:"Black cap",c:[.018,.018,.02]}],De=[{name:"Few",d:.035},{name:"Clinging",d:.12},{name:"Beaded",d:.34}],M0=1013250,Be=4e5,xt=t=>Be*Math.pow(Math.max(t,0),2.2);Wt.add({num:140,name:"Water Bottle",fam:"Worlds",recipe:"A thin plastic bottle of water, capped and full to the neck, under one lamp. Squeeze it and the wall dents and snaps into creases that stay, the water climbs the neck and bubbles float up. How worn and wet it is changes every mint. Hold to squeeze (a long hold crushes it), tap for a quick squeeze, or drag up or down to set exactly how hard.",interactive:"Hold to squeeze the bottle: a short hold is a gentle squeeze, a long hold crushes it. Tap for a quick pulse. Drag up or down to set the squeeze directly. Every hard squeeze leaves a crease.",music:!0,gl:!0,fps:30,seed:0,make(t){const a=t.gl,l=t.size,h=t.hash.slice(2),m=(e,o=0)=>{let i=(parseInt(h.slice(e,e+8),16)^o)>>>0;return()=>{i=i+1831565813>>>0;let r=i;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}},u=m(0),T=m(8),M=m(16),U=e=>{let o=0;for(const r of e)o+=r;let i=u()*o;for(let r=0;r<e.length;r++)if(i-=e[r],i<=0)return r;return e.length-1};let R=U([44,26,8,22]);U([88,12]);let k=U([84,16]),D=U([45,30,25]),H=U([35,25,22,18]),B=U([40,30,18,12]),w=U([35,50,15]);D===1&&u()<.5&&(H=3);{const e=m(32,1050431911);k===0&&e()<.215&&(k=2)}Ot&&(k=2),t.home&&(R=0,k=0,D=0,H=0,B=0,w=1);const n=ge[R],b=Me[k],s=Ue[D],v=Ne[H],F=qe[B],I=De[w],d=m(40,2100990403),g=e=>{let o=0;for(const r of e)o+=r;let i=d()*o;for(let r=0;r<e.length;r++)if(i-=e[r],i<=0)return r;return e.length-1};let y=g([28,57,15]),E=g([52,33,15]);const N=Math.floor(d()*vt.length)%vt.length;Ot&&(y=2),t.home&&(y=1,E=1);const W=Se[y],Q=Ce[E],V=vt[t.home?0:N];t.trait("Bottle",n.name),t.trait("Condition",W.name),t.trait("Condensation",Q.name),t.trait("Water",b.name),t.trait("Setting",s.name),t.trait("Table",v.name),t.trait("Cap",F.name),t.trait("Wall bubbles",I.name);const h0=m(24,739982445),Y0=[["Long lens, centred",34],["Off to one side",24],["Close on the water",18],["Low at the table",16],["Across the room",8]];let n0=(()=>{let e=0;for(const i of Y0)e+=i[1];let o=h0()*e;for(const i of Y0)if(o-=i[1],o<=0)return i[0];return Y0[0][0]})();t.home&&(n0="Long lens, centred"),t.trait("Camera",n0);const _=Ae(a,D,v.ty),[d0,T0]=Vt(a,_,D,v.ty),j=_.half;let X=9.3,U0=75,m0=.14,O=1.3,G=12.2;if(n0==="Off to one side"){const e=h0()<.5?-1:1;G=14.5,O=e*4.6,X=10.6}else if(n0==="Close on the water")G=6.6,X=n.LEV-2.6,O=.35,m0=.1;else if(n0==="Low at the table"){const e=h0()<.5?-1:1;G=10.6,X=9.9,O=e*4.8,m0=.03}else n0==="Across the room"&&(G=21,X=13.5,O=2.5+h0()*3,m0=.11);const Y=[O,X+U0*Math.sin(m0),U0*Math.cos(m0)],N0=[O,X,0],s0=G/U0,L=[N0[0]-Y[0],N0[1]-Y[1],N0[2]-Y[2]];{const e=Math.hypot(...L);L[0]/=e,L[1]/=e,L[2]/=e}const P=[-L[2],0,L[0]];{const e=Math.hypot(...P);P[0]/=e,P[2]/=e}const J=[P[1]*L[2]-P[2]*L[1],P[2]*L[0]-P[0]*L[2],P[0]*L[1]-P[1]*L[0]],q0=Math.hypot(Y[0],Y[1]-8,Y[2])-n.RB*.4,Z=e=>{const o=[e[0]-Y[0],e[1]-Y[1],e[2]-Y[2]],i=o[0]*L[0]+o[1]*L[1]+o[2]*L[2];return[.5+.5*(o[0]*P[0]+o[1]*P[1]+o[2]*P[2])/(i*s0),.5+.5*(o[0]*J[0]+o[1]*J[1]+o[2]*J[2])/(i*s0)]},p=new Float32Array(kt*4),f=(e,o,i,r,c)=>{p[e*4]=o,p[e*4+1]=i,p[e*4+2]=r,p[e*4+3]=c},p0=Math.floor(T()*60);f(0,l,s0,2.1,q0),f(1,Y[0],Y[1],Y[2],p0),f(2,P[0],P[1],P[2],D),f(3,J[0],J[1],J[2],s.ex),f(4,L[0],L[1],L[2],0);let $;if(s.sun){const e=Math.hypot(...s.L);$=s.L.map(o=>o/e),f(5,$[0],$[1],$[2],s.LI)}else{const e=t.home||T()<.7?1:-1,o=[s.L[0]*e,s.L[1],s.L[2]];f(5,o[0],o[1],o[2],s.LI);const i=[o[0],o[1]-8,o[2]],r=Math.hypot(...i);$=i.map(c=>c/r)}f(6,s.col[0],s.col[1],s.col[2],s.sun);{const e=[2-p[20],-p[21],-6-p[22]],o=Math.hypot(...e);f(21,e[0]/o,e[1]/o,e[2]/o,0)}f(7,s.amb[0],s.amb[1],s.amb[2],v.ty),f(8,v.al[0],v.al[1],v.al[2],v.gloss),f(9,n.RB,n.LEV,n.YS0,n.YS1),f(10,n.RN,n.CAPB,n.CAPT,n.CAPR);const Gt=7.4,Kt=3.4;f(11,0,Gt,Kt,0);const Q0=k===2;f(12,b.sig[0],b.sig[1],b.sig[2],I.d*(Q0?2.2:1)),f(13,F.c[0],F.c[1],F.c[2],0);const D0=s.sun?s.LI*$[1]:(()=>{const e=[p[20]-2,p[21],p[22]-2],o=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=Math.sqrt(o),r=e[1]/i;return s.LI/o*r*(.02+.98*O0(s.cone[0],s.cone[1],-(e[0]*p[84]+e[1]*p[85]+e[2]*p[86])/i))})(),c0=v.al.map((e,o)=>e*D0*s.col[o]*.55+s.amb[o]*2),Fe=D0/(Math.PI*s.src*s.src)/Math.max($[1],.3);f(15,0,n.LEV,0,W.scuff),f(16,4,18,0,0),f(17,Q.d,.35+d()*2.4,0,n.waist),f(18,V.wall[0],V.wall[1],V.wall[2],0),f(19,V.cup[0],V.cup[1],V.cup[2],0),f(22,$[0],$[1],$[2],D0*9),f(23,s.ZW,s.TBK,n.RF,n.ribs),f(24,s.fillD[0],s.fillD[1],s.fillD[2],Fe);const Ie=Z([0,0,n.RB]),Ht=Z([n.RB,0,0]),Qt=Z([0,0,0]);if(f(25,Ie[1],Ht[1],Qt[0],Ht[0]-Qt[0]),f(26,s.col[0]*D0*.35+s.amb[0]*4,s.col[1]*D0*.35+s.amb[1]*4,s.col[2]*D0*.35+s.amb[2]*4,.85),D===1){const e=[[.86,.87,.84],[.72,.82,.78],[.86,.82,.74]][Math.floor(T()*3)];f(27,e[0],e[1],e[2],0)}else f(27,c0[0]*.8,c0[1]*.8,c0[2]*.8,0);f(28,s.fillC[0],s.fillC[1],s.fillC[2],Math.cos(s.src)),f(29,l>600?30:22,2,4,s.nbk),f(30,s.win[0],s.win[1],s.win[2],s.win[3]),f(31,s.win2[0],s.win2[1],s.cone[0],s.cone[1]),f(32,2*s0*q0/l,n.wall,1,0),f(33,n.sig[0],n.sig[1],n.sig[2],0),f(34,c0[0],c0[1],c0[2],v.ty===3?5:0),f(36,0,0,0,n.FLY);{const e=(c0[0]+c0[1]+c0[2])/3,o=[[1,.86,.68,3.5,.8],[.9,.95,1,7,.8],[1,.97,.92,5,.8]][D];f(35,o[0]*e*o[3],o[1]*e*o[3],o[2]*e*o[3],s.fillD[0]/Math.max(s.fillD[2],.3))}f(37,...[[.35*.35,.25,6],[.24,.1,9],[.48,.08,7],[.32,.24,16]][v.ty],n.CAPB+.3);let R0=1,L0=1,B0=0,F0=0;for(const e of[-1,1])for(const o of[-1,1])for(const i of[-.3,n.CAPT+.3]){const r=Z([e*(n.RB+.9),i,o*(n.RB+.9)]);R0=Math.min(R0,r[0]),B0=Math.max(B0,r[0]),L0=Math.min(L0,r[1]),F0=Math.max(F0,r[1])}R0=a0(R0-.01,0,1),L0=a0(L0-.01,0,1),B0=a0(B0+.01,0,1),F0=a0(F0+.01,0,1),f(14,R0,L0,B0,F0);let j0=1,Z0=1,bt=0,wt=0;for(const e of[-1,1])for(const o of[-1,1])for(const i of[n.CAPB-.5,n.CAPT+.05]){const r=Z([e*(n.CAPR+.05),i,o*(n.CAPR+.05)]);j0=Math.min(j0,r[0]),bt=Math.max(bt,r[0]),Z0=Math.min(Z0,r[1]),wt=Math.max(wt,r[1])}const $0=[Math.floor(j0*l)-1,Math.floor(Z0*l)-1,Math.ceil((bt-j0)*l)+3,Math.ceil((wt-Z0)*l)+3],J0=[Math.floor(R0*l),Math.floor(L0*l),Math.ceil((B0-R0)*l)+1,Math.ceil((F0-L0)*l)+1],We=.85,I0=e=>{let o=n.RB;if(e<n.RF){const o0=n.RF-e;o=n.RB-n.RF+Math.sqrt(Math.max(n.RF*n.RF-o0*o0,0))}const i=Math.max((e-n.YS0)/(n.YS1-n.YS0),0)*.965808,r=1.35*(n.RB-n.RN),c=o-r+r*Math.sqrt(Math.max(1-i*i,0)),q=Math.max(.45-Math.abs(c-n.RN),0)/.45;return Math.max(c,n.RN)+q*q*.1125-n.wall-n.waist*Math.exp(-(((e-7)/2.6)**2))};let S=0,X0=0;const yt=e=>We*S*Math.exp(-(((e-Gt)/Kt)**2))*O0(.8,2.6,e)*O0(n.YS0+.8,n.YS0-1.6,e);let P0=n.LEV,Et=0,Tt=0,W0=0,t0=0,tt=0;const jt=Math.PI*(n.RN-n.wall)**2,_e=jt*(n.CAPB+1.5-n.LEV),i0=m(48,1523827175),et=[];for(let e=0;e<w0;e++){const i=i0()<.72?Math.PI/2+(i0()-.5)*2.4:(i0()<.5?0:Math.PI)+(i0()-.5)*1,r=3+i0()*(n.YS0-4.2),c=e<W.dents?W.mem*(.6+.6*i0()):0;et.push({th:i,y:r,amp:.13+i0()*.17,size:.7+i0()*.85,thr:.09+(e+.5)/w0*.72,on:0,a:c,v:0,mem:c,maxm:.5+i0()*.3})}let ot=!0,Rt=0;const V0=new Float32Array(w0*4),Zt=()=>{for(let e=0;e<w0;e++){const o=et[e];V0[e*4]=o.th,V0[e*4+1]=o.y,V0[e*4+2]=o.amp*o.a,V0[e*4+3]=o.size}};Zt();const l0=new Float32Array(K),A0=new Float32Array(K),G0=new Float32Array(K),K0=new Float32Array(K),at=new Float32Array(K),u0=new Float32Array(K),C=m(56,2447881457);let Lt=0,Pt=0;const rt=(e,o,i)=>{const r=Lt;Lt=(Lt+1)%K,l0[r]=e,A0[r]=o,G0[r]=0,K0[r]=C()*z0,at[r]=i,u0[r]=-1},nt=e=>{for(let o=0;o<e;o++){const i=C()*z0,r=1+C()*(P0-2.4),c=I0(r)-yt(r);rt(Math.cos(i)*c*.95,r,.06+.2*C()**2)}},$t=1/240,A={snap:0,unsnap:0,pop:0},ke=(e,o)=>{for(const c of et){!c.on&&S>c.thr?(c.on=1,c.mem=Math.min(c.mem+.22,c.maxm),c.v+=24+18*C(),A.snap=Math.max(A.snap,c.amp*3),t0=Math.min(t0+.4*c.amp*3,1.2),W0+=(C()-.5)*.9,nt(4+Math.floor(C()*4))):c.on&&S<c.thr*.55&&(c.on=0,c.v-=12+8*C(),A.unsnap=Math.max(A.unsnap,c.amp*2),t0=Math.min(t0+.15,1.2));const q=c.on?1:c.mem,o0=12100;c.v+=(o0*(q-c.a)-77*c.v)*e,c.a+=c.v*e,(Math.abs(c.v)>.01||Math.abs(q-c.a)>.002)&&(ot=!0)}const i=Math.min(n.LEV+_e*(1-M0/(M0+o))/jt,n.CAPB-.22);Et+=(150*(i-P0)-2.6*Et)*e,P0+=Et*e,W0+=(-260*Tt-3.2*W0)*e,Tt+=W0*e,t0*=Math.exp(-e*.55),tt*=Math.exp(-e*.06);const r=Math.cbrt(M0/(M0+o));for(let c=0;c<K;c++){const q=at[c];if(q<=0)continue;const o0=q*r;if(u0[c]>0){u0[c]-=e,K0[c]+=e*3,l0[c]+=Math.sin(K0[c])*.02*e,u0[c]<=0&&(u0[c]=0);continue}if(u0[c]<0&&A0[c]>n.YS0-.2+1.2*(1-Math.abs(l0[c])/I0(n.YS0))&&q>.05&&(u0[c]=C()<.7?1+7*C()*C():0,u0[c]>0)){G0[c]=0;continue}const It=7+34*Math.min(1,q/.18);G0[c]+=(It-G0[c])*Math.min(1,e*9),K0[c]+=e*(5+14*q),A0[c]+=G0[c]*e,l0[c]+=Math.sin(K0[c])*(.6+4*q)*e;const b0=Math.max(.06,I0(A0[c])-yt(A0[c])-o0-.04);l0[c]>b0?l0[c]=b0:l0[c]<-b0&&(l0[c]=-b0),A0[c]>P0-o0*.6&&(at[c]=0,t0=Math.min(t0+.5*q,1.2),W0+=(C()-.5)*.25*q/.1,A.pop++)}},At=[];if(Q0){const e=m(32,1374725081),o=6+Math.floor(e()*5);for(let i=0;i<o;i++)At.push({a:e()*z0,y:.8+e()*(n.YS0-2),rate:6+10*e(),r:.04+.035*e(),nx:e()})}let st=0;const Oe=e=>{const o=O0(.12,.4,S);st=o>.5?Math.min(st+e*2.5,4):st*Math.exp(-e*1.4);const i=1+(o>.5?0:st*2.2);for(const r of At)for(r.nx-=e*r.rate*(1-o)*i;r.nx<=0;){r.nx+=.4+1.2*C();const c=I0(r.y)-yt(r.y);rt(Math.cos(r.a)*c*.94,r.y,r.r*(.7+.6*C()))}},Jt=(e,o)=>{Q0&&Oe(e);let i=Math.min(60,Math.round(e/$t));for(;i-- >0;)ke($t,o);const r=Math.abs(X0);for(Pt+=e*r*3.2,tt=Math.min(1,tt+r*e*.3);Pt>=1;)Pt-=1,nt(1)};let zt=.5+M()*2.5,gt=6+M()*10;const te=()=>-Math.log(1-M()*.999),Ye=e=>{if(zt-=e,gt-=e,zt<=0&&(zt=te()*(1.1+.5/(I.d*8+.3)),nt(M()<.22?2+Math.floor(M()*4):1)),gt<=0){gt=7+te()*12;const o=et[Math.floor(M()*w0)];o.mem>.05&&!o.on&&(o.v+=(M()<.5?-1:1)*(5+6*M()),o.mem=a0(o.mem+(M()-.6)*.1,.08,o.maxm),A.unsnap=Math.max(A.unsnap,.25),t0=Math.min(t0+.2,1.2),W0+=(M()-.5)*.5,nt(1+Math.floor(M()*3)),ot=!0)}};for(let e=0;e<10+Math.round(I.d*40);e++){const o=1.5+C()*(P0-3),i=C()*z0;rt(Math.cos(i)*(I0(o)-.2)*C()*.9,o,.05+.14*C()**2)}for(const e of At)for(let o=e.y+.3;o<P0-.4;o+=.8+C()*1.4){const i=I0(o)*.94;rt(Math.cos(e.a)*i,o,e.r*(.8+.5*C()))}const ee=y===0?.1:t.home?.44:.26+M()*.3;for(let e=0;e<40;e++)S+=(ee-S)*.2,X0=(ee-S)*3,Jt(1/60,xt(S));X0=0,A.snap=0,A.unsnap=0,A.pop=0,a.activeTexture(a.TEXTURE7);const oe=S0(a,l,l,j),St=S0(a,l,l,j),ct=l>600?512:256,ae=ct*9/4,re=S0(a,ct,ae,!1),ne=S0(a,pt,ut,j);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.REPEAT);const Xe=C0(a,oe),Ct=C0(a,St),Ve=C0(a,re),Ge=C0(a,ne);let se=-1;a.bindTexture(a.TEXTURE_2D,null);const ce=ze(a,_,Math.min((e=>{const o=Math.asin(a0($[1],0,.999));return Math.sqrt(e*e-Math.sin(o)**2)/Math.cos(o)})(1.333),3.5),s.src),x=(e,o)=>{a.activeTexture(a.TEXTURE0+e),a.bindTexture(a.TEXTURE_2D,o)},ie=()=>{a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.disable(a.SCISSOR_TEST),a.colorMask(!0,!0,!0,!0),a.bindVertexArray(_.vao)},v0=(e,o,i,r)=>{a.bindFramebuffer(a.FRAMEBUFFER,o),a.viewport(0,0,i,r),a.useProgram(e.p),a.uniform4fv(e.u.U,p),a.drawArrays(a.TRIANGLES,0,3)};ie();const le=E0(a,_,d0),fe=E0(a,_,T0);x(0,_.noise),x(1,null),x(2,null),x(3,null),x(4,null),x(5,ce),x(6,null);const e0=l>600?512:256,Mt=2.3,x0=[0,13,26],he=S0(a,e0,e0,j),Ke=C0(a,he);{const e=p.slice(0,20),o=p[32*4];f(0,e0,Mt,.42,x0[2]),f(1,x0[0],x0[1],x0[2],p0),f(2,1,0,0,D),f(3,0,1,0,s.ex),f(4,0,0,-1,0),p[32*4]=2*Mt*x0[2]/e0;const i=S0(a,e0,e0,j),r=C0(a,i);v0(le,r,e0,e0),x(6,i),v0(fe,Ke,e0,e0),x(6,null),a.deleteFramebuffer(r),a.deleteTexture(i),p.set(e),p[32*4]=o,f(20,x0[0],x0[1],x0[2],Mt)}v0(le,Ct,l,l),x(6,St),v0(fe,Xe,l,l),x(6,null),x(5,null);const it=E0(a,_,"bub"),lt=E0(a,_,"def"),He=E0(a,_,"btl"),Qe=E0(a,_,"fin"),je=E0(a,_,"cap"),H0=new Float32Array(K*4),de=e=>{ie(),p[4*4+3]=e,p[11*4]=S,p[9*4+1]=P0,p[15*4]=Tt,p[15*4+2]=t0,p[12*4+3]=I.d*(Q0?2.2:1)*(1-.8*tt),p[36*4]=Rt,x(0,_.noise),x(1,null),x(2,null),x(3,null),x(4,null),x(5,null),x(7,null),(Math.abs(S-se)>.002||ot)&&(se=S,ot=!1,Zt(),a.useProgram(lt.p),a.uniform4fv(lt.u.uD,V0),a.uniform1f(lt.u.uDn,w0),v0(lt,Ge,pt,ut));let o=0;const i=Math.cbrt(M0/(M0+xt(S)));for(let r=0;r<K;r++){const c=at[r];if(c<=0)continue;const q=c*i;H0[o*4]=l0[r],H0[o*4+1]=A0[r],H0[o*4+2]=q,H0[o*4+3]=1.3/Math.max(q*ct/8,1),o++}a.bindFramebuffer(a.FRAMEBUFFER,Ve),a.viewport(0,0,ct,ae),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),o&&(a.useProgram(it.p),a.uniform4fv(it.u.U,p),a.uniform4fv(it.u.uP,H0),a.uniform2f(it.u.uRg,4,18),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),a.drawArrays(a.TRIANGLES,0,o*6),a.disable(a.BLEND)),x(1,oe),x(3,re),x(4,he),x(7,ne),a.enable(a.SCISSOR_TEST),a.scissor(J0[0],J0[1],J0[2],J0[3]),v0(He,Ct,l,l),a.scissor($0[0],$0[1],$0[2],$0[3]),v0(je,Ct,l,l),a.disable(a.SCISSOR_TEST),x(3,null),x(4,null),x(7,null),x(2,St),x(5,ce),v0(Qe,null,l,l),x(2,null),x(1,null),x(5,null)};de(0);const _0=t.sound,z={down:!1,t:0,y0:0,s0:0,drag:!1};let ft=99,k0=-1,ht=0,Ut=.75,Nt=0,qt=9137;const f0=()=>(qt=Math.imul(qt,1664525)+1013904223>>>0,qt/4294967296),Ze=e=>.32*(1-Math.exp(-e/.22))+.68*O0(.9,3.4,e),$e=e=>{const o=t.input,i=o.taps();return!z.down&&o.down?(z.down=!0,z.t=0,z.y0=o.y,z.s0=S,z.drag=!1,k0=-1):!z.down&&i.length&&(ht=.2+.1*f0(),Ut=.6+.3*f0(),k0=-1,ft=0),z.down?(ft=0,z.t+=e,!z.drag&&Math.abs(o.y-z.y0)>.03&&(z.drag=!0,z.y0=o.y,z.s0=S),Nt=z.drag?a0(z.s0+(z.y0-o.y)*2,0,1):Ze(z.t),o.down||(z.down=!1,z.drag?k0=Nt:z.t<.25&&(ht=.2+.1*f0(),Ut=.6+.3*f0())),Nt):(ft+=e,ht>0?(ht-=e,Ut):k0>=0&&ft<12?k0:(k0=-1,null))},me=new Float32Array(1600);let dt=0,Dt=0,Bt=0,Ft=0;return(e,o)=>{o=Math.min(o||1/30,.15);const i=$e(o);let r;i===null?(r=0,Ye(o)):r=i;const c=S,q=r>S?1-Math.exp(-o/.08):1-Math.exp(-o/.12);if(S+=(r-S)*q,X0=(S-c)/o,Jt(o,xt(S)),Rt=Math.max(Rt*Math.exp(-o*7),Math.min(A.snap,1)),de(e),_0.on){A.snap>0&&(_0.hit("click",.06+.1*Math.min(A.snap,1)),_0.note(88+Math.round(f0()*8),{dur:.03,vel:.03+.05*Math.min(A.snap,1),wave:"triangle",cutoff:3200})),A.unsnap>0&&_0.hit("click",.04+.05*Math.min(A.unsnap,1)),A.pop>0&&_0.note(78+Math.round(f0()*12),{dur:.05,vel:.012+.008*Math.min(A.pop,3),wave:"sine",cutoff:2600});const o0=Math.min(1600,Math.round(o*8e3)),It=Math.min(Math.abs(X0)*.05,.25);for(let b0=0;b0<o0;b0++){const pe=f0()*2-1;dt+=(pe-dt)*.02,Dt+=(dt-Dt)*.05,f0()<It&&(Bt=.3+.7*f0()),Bt*=.93,Ft+=1/8e3;const Je=D===0?.012*Math.sin(z0*50*Ft)+.006*Math.sin(z0*100*Ft):0;me[b0]=Dt*1.6+Je+(pe-dt)*Bt*.5}_0.pcm(me.subarray(0,o0),8e3,{vel:.35})}A.snap=0,A.unsnap=0,A.pop=0}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
