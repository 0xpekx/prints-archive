// Drawing Gears: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/153.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(It){It&&function(){"use strict";const At=new WeakMap,Z=Math.PI*2,V=Math.PI/180,F=(a,e,i)=>a<e?e:a>i?i:a,F0=(a,e,i)=>{const p=F((i-a)/(e-a),0,1);return p*p*(3-2*p)},C0=`
`,o0="#version 300 es"+C0+"// w153 r12z"+C0+"precision highp float;"+C0+"precision highp int;"+C0+"precision highp sampler2D;"+C0,v0=o0+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",Nt=33,I0=1024,Te=3,B0=.8,Me=2.6,fa=5,A0=`
uniform vec4 U[${Nt}];
uniform sampler2D uE;
uniform sampler2D uN;
#define EYE U[0].xyz
#define TANH U[0].w
#define FWD U[1].xyz
#define ZF U[1].w
#define RTV U[2].xyz
#define APK U[2].w
#define UPV U[3].xyz
#define MAXC U[3].w
#define IRES U[4].x
#define TIME U[4].y
#define NIT int(U[4].z)
#define NSL int(U[4].w)
#define LDIR U[5].xyz
#define LPEN U[5].w
#define LCOL U[6].rgb
#define LSZ U[6].w
#define AMB U[7].rgb
#define GLI U[7].w
#define PAPC U[8].rgb
#define PKIND U[8].w
#define TC U[9].xy
#define TL U[9].z
#define TR U[9].w
#define TRO U[10].x
#define RZ U[10].y
#define TKIND U[10].z
#define WIPEY U[10].w
#define TCS U[11].x
#define TSN U[11].y
#define PSC U[11].z
#define TOOTH U[11].w
#define SIGT U[12].rgb
#define FLUO U[12].w
#define WC U[13].xy
#define WCS U[13].z
#define WSN U[13].w
#define WR U[14].x
#define WN U[14].y
#define WZ U[14].z
#define NHOLE U[14].w
#define HR0 U[15].x
#define HDR U[15].y
#define HGA U[15].z
#define HRAD U[15].w
#define SIGW U[16].rgb
#define IC U[17].xy
#define IW U[17].z
#define IMODE U[17].w
#define PTIP U[18].xyz
#define PRAD U[18].w
#define PAX U[19].xyz
#define PLEN U[19].w
#define PINC U[23].rgb
#define NPIN int(U[23].w)
#define IKS U[24].x
#define SHEEN U[24].y
#define SPR U[24].zw
#define EJ U[25]
#define GLOWT U[26].rgb
#define GLOWW U[27].rgb
#define NSTEP int(U[28].x)
#define WNF U[29].xyz
#define WNW U[29].w
#define WNR U[30].xyz
#define WNH U[30].w
#define WNU U[31].xyz
#define WNI U[31].w
#define RMID U[28].y
#define RES U[28].z
#define PER U[28].w
#define GKR U[32].xy
#define GKW U[32].z
const float PI = 3.14159265, TAU = 6.2831853, GH = ${Te.toFixed(2)}, FIL = 0.7, TA = ${B0.toFixed(2)}, PINR = ${Me.toFixed(2)};
vec3 rayDir(vec2 n){ return normalize(FWD + (RTV * n.x + UPV * n.y) * TANH); }
vec2 llUV(vec3 d){ return vec2(atan(d.y, d.x) * (0.5 / PI) + 0.5, acos(clamp(d.z, -1.0, 1.0)) / PI); }
vec3 envL(vec3 d, float rough){ float lod = clamp(log2(1.0 + rough * 110.0), 0.0, 6.0); vec3 e = textureLod(uE, llUV(d), lod).rgb; return e * e * 4.0; }
float glint(vec3 r, float w){ float a = LSZ + w; return GLI * smoothstep(cos(a * 1.3), cos(a * 0.35), dot(r, LDIR)) * (LSZ * LSZ) / (a * a); }
float h12(vec2 p){ vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
`,St=`
float penR(float u, float kind, float ca){
  float clip = smoothstep(0.935, 0.975, ca) * 1.05, r, e;
  if (kind < 0.5) {
    e = smoothstep(145.0, 150.0, u);
    if (u < 3.5) r = 0.2 + u * 0.21;
    else if (u < 12.0) r = mix(0.95, 3.9, smoothstep(3.5, 12.0, u));
    else if (u < 41.0) r = 4.36 + 0.13 * smoothstep(12.0, 15.0, u) * smoothstep(41.0, 38.0, u) + 0.045 * sin((u - 12.0) * 0.78);
    else if (u < 112.0) r = 4.25;
    else r = (5.05 + (u > 117.0 && u < 144.0 ? clip : 0.0)) * sqrt(max(1.0 - e * e, 0.0));
  } else {
    e = u < 52.0 ? 1.0 - smoothstep(0.0, 4.0, u) : smoothstep(122.0, 126.0, u);
    if (u < 52.0) r = (5.05 + (u > 9.0 && u < 47.0 ? clip : 0.0)) * sqrt(max(1.0 - e * e, 0.0));
    else if (u < 120.0) r = 4.25;
    else r = 4.0 * sqrt(max(1.0 - e * e, 0.0));
  }
  return r;
}
float penMarch(vec3 ro, vec3 rd, vec3 ax, vec3 b1, float len, float kind, out vec3 hp){
  hp = vec3(0.0);
  float a = dot(rd, ax), b = dot(ro, ax);
  vec3 rp = rd - ax * a, op = ro - ax * b;
  float A = dot(rp, rp), B = dot(rp, op), C = dot(op, op) - 41.0;
  float h = B * B - A * C, res = -1.0;
  if (h > 0.0 && A > 1e-6) {
    h = sqrt(h);
    float t = max((-B - h) / A, 0.0), t1 = (-B + h) / A;
    for (int i = 0; i < NSTEP; i++) {
      if (res < 0.0 && t < t1) {
        vec3 p = ro + rd * t; float u = dot(p, ax); vec3 w = p - ax * u; float rho = length(w);
        float d = max(rho - penR(u, kind, dot(w, b1) / max(rho, 1e-4)), max(-u, u - len));
        if (d < 0.012) { hp = p; res = t; }
        t += max(d * 0.8, 0.025);
      }
    }
  }
  return res;
}
vec4 penShade(vec3 q, vec3 rd, vec3 ax, vec3 b1, float kind, vec3 pc, float fill){
  float u = dot(q, ax); vec3 w = q - ax * u; float rho = max(length(w), 1e-4); vec3 rn = w / rho;
  float ca = dot(rn, b1);
  float dr = (penR(u + 0.08, kind, ca) - penR(u - 0.08, kind, ca)) * 6.25;
  vec3 n = normalize(rn - ax * dr);
  float cv = max(dot(n, -rd), 0.0);
  float F = 0.04 + 0.96 * pow(1.0 - cv, 5.0);
  vec3 rr = reflect(rd, n);
  float ndl = max(dot(n, LDIR), 0.0);
  vec3 lt = LCOL * ndl + AMB * (0.55 + 0.45 * n.z);
  float m, b0, bu;
  if (kind < 0.5) { m = u < 3.5 ? 0.0 : u < 12.0 ? 1.0 : u < 41.0 ? 2.0 : u < 112.0 ? 3.0 : 1.0; b0 = 41.0; bu = 112.0; }
  else { m = u < 52.0 ? 1.0 : u < 120.0 ? 3.0 : 4.0; b0 = 52.0; bu = 120.0; }
  if (m > 0.5 && m < 1.5 && ca > 0.93 && rho > 5.25) m = 5.0;
  // material: body colour, opacity, then one mirror lookup and one glint
  vec3 c, kE = vec3(F); float a = 1.0, rg = 0.03, kG = 0.4;
  if (m < 0.5) { c = lt * 0.03; kE = vec3(0.72, 0.71, 0.69); rg = 0.04; kG = 0.8; }
  else if (m < 1.5) { c = pc * lt * 0.72; }
  else if (m < 2.5) { c = mix(pc, vec3(0.5), 0.12) * lt * 0.72; kE = vec3(F * 0.6); rg = 0.3; kG = 0.08; }
  else if (m < 3.5) {
    vec3 qp = q - ax * dot(q, ax), rp = rd - ax * dot(rd, ax);
    float tt = -dot(qp, rp) / max(dot(rp, rp), 1e-5);
    float dl = length(qp + rp * tt), ua = dot(q + rd * tt, ax);
    float tube = smoothstep(2.1, 1.75, dl) * step(b0, ua) * step(ua, bu);
    float inkd = step(ua, b0 + fill * (bu - b0));
    vec3 tcol = mix(vec3(0.3), pc * 0.45, inkd);
    float ed = (1.0 - cv) * (1.0 - cv);
    a = clamp(0.5 + 0.45 * ed + tube * 0.5, 0.0, 1.0);
    c = tube * 0.6 * tcol * (LCOL * 0.35 + AMB * 1.2) + (0.5 + 0.45 * ed) * mix(pc, vec3(1.0), 0.45) * lt * 0.42;
    kE = vec3(F * 1.6); rg = 0.02; kG = 0.5;
  }
  else if (m < 4.5) { c = pc * lt * 0.5; rg = 0.06; kG = 0.0; }
  else { c = pc * lt * 0.42; rg = 0.02; kG = 0.5; }
  c += kE * envL(rr, rg) + LCOL * glint(rr, rg) * kG;
  return vec4(c, a);
}
`,Ao=o0+`
uniform vec4 K[3];
layout(location = 0) in vec4 aP;
layout(location = 1) in vec4 aT;
layout(location = 2) in vec4 aW;
flat out vec4 vP; flat out vec4 vT; flat out vec4 vW; out vec2 vQ;
void main(){
  vec2 c = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  float m = max(aW.x, aW.y) * 0.5 + K[1].w * 2.0;
  vec2 lo = min(aP.xy, aP.zw) - m, hi = max(aP.xy, aP.zw) + m;
  vQ = mix(lo, hi, c);
  vP = aP; vT = aT; vW = aW;
  gl_Position = vec4((vQ - K[0].xy) * K[0].z, 0.0, 1.0);
}`,No=o0+`
uniform vec4 K[3];
flat in vec4 vP; flat in vec4 vT; flat in vec4 vW; in vec2 vQ; out vec4 oC;
void main(){
  vec2 a = vP.xy, b = vP.zw, ba = b - a, pa = vQ - a;
  float L = length(ba), h = 0.0, dist;
  if (L < 1e-4) dist = length(pa);
  else {
    if (dot(pa, vT.xy) < 0.0 || dot(vQ - b, vT.zw) >= 0.0) discard;
    vec2 dir = ba / L; h = clamp(dot(pa, dir) / L, 0.0, 1.0);
    dist = abs(pa.x * dir.y - pa.y * dir.x);
  }
  float w = mix(vW.x, vW.y, h) * 0.5, k = mix(vW.z, vW.w, h);
  float cov = clamp((w - dist) / K[1].w + 0.5, 0.0, 1.0);
  if (cov <= 0.0) discard;
  float rim = clamp(dist / max(w, 1e-3), 0.0, 1.0);
  float amt = k * cov * (0.84 + 0.32 * rim * rim);
  if (K[0].w < 0.5) oC = vec4(K[1].rgb * amt, amt) * K[2].x;
  else { float al = 1.0 - exp(-amt * 2.4); oC = vec4(K[1].rgb * al, al); }
}`,So=`
uniform sampler2D uP;
uniform sampler2D uI;
vec3 paperShade(vec2 p, vec3 vis, vec3 rd, float tk){
  vec4 a = textureLod(uP, p * PSC, U[26].w), b = textureLod(uP, p * (PSC * 0.37) + 0.53, max(U[26].w - 1.4, 0.0));
  vec3 n = normalize(vec3(((a.rg - 0.5) + (b.rg - 0.5) * 0.6) * TOOTH * tk, 1.0));
  float h = a.b * 0.6 + b.b * 0.4;
  vec3 alb = PAPC * (0.99 - 0.07 * tk + 0.14 * h * tk);
  if (PKIND > 0.5 && PKIND < 1.5) alb *= 0.8 + 0.3 * a.a * b.a + 0.14 * b.a;
  float ndl = max(dot(n, LDIR), 0.0);
  vec3 lt = LCOL * vis * ndl + AMB * (0.62 + 0.38 * n.z);
  vec3 base = alb * lt;
  float wd = p.y - WIPEY;
  if (wd < 0.0) return base * (1.0 + 0.12 * exp(wd / 0.5));
  base *= 1.0 - 0.32 * exp(-wd / 5.0);
  vec2 iu = (p - IC) / (2.0 * IW) + 0.5;
  if (abs(iu.x - 0.5) > 0.498 || abs(iu.y - 0.5) > 0.498) return base;
  vec4 ik = textureLod(uI, iu, 0.0);
  if (ik.a < 0.002) return base;
  float e = 1.0 / ${I0.toFixed(1)};
  float ax = textureLod(uI, iu + vec2(e, 0.0), 0.0).a - textureLod(uI, iu - vec2(e, 0.0), 0.0).a;
  float ay = textureLod(uI, iu + vec2(0.0, e), 0.0).a - textureLod(uI, iu - vec2(0.0, e), 0.0).a;
  vec3 nI = normalize(vec3(-vec2(ax, ay) * SHEEN, 1.0) + (n - vec3(0.0, 0.0, 1.0)) * 0.4);
  vec3 rr = reflect(rd, nI);
  float Fi = 0.04 + 0.96 * pow(1.0 - max(dot(-rd, nI), 0.0), 5.0);
  vec3 c;
  if (IMODE < 0.5) {
    float A = ik.a * IKS;
    vec3 D = ik.rgb * IKS * (1.0 + 0.35 * (0.5 - h));
    float wet = smoothstep(0.1, 1.3, A);
    c = base * exp(-D) + (envL(rr, 0.1) * Fi * 0.8 + LCOL * vis * glint(rr, 0.06) * 0.5) * wet;
  } else {
    float cov = clamp(ik.a * (1.0 + 0.25 * (h - 0.5)), 0.0, 1.0);
    vec3 ic = ik.rgb / max(ik.a, 1e-3);
    vec3 idf = mix(ic, ic * ic, 0.6) * lt;
    if (IMODE > 1.5) {
      vec4 fl = textureLod(uN, p * 2.7, 1.0);
      vec3 nf = normalize(nI + vec3((fl.rg - 0.5) * 0.9, 0.0));
      vec3 rf = reflect(rd, nf);
      idf = ic * ic * (lt * 0.5 + envL(rf, 0.2) * 1.0) + ic * LCOL * vis * (0.03 + 1.1 * step(0.74, fl.a) + glint(rf, 0.1) * 1.5);
    }
    // opaque pastel and white inks dry to a satin skin: a faint sheen; the metallic ink keeps its mirror
    float shK = IMODE > 1.5 ? 1.0 : 0.2;
    c = mix(base, idf, cov) + (envL(rr, 0.12) * Fi * 0.6 + LCOL * vis * glint(rr, 0.07) * 0.35) * cov * shK;
  }
  return c;
}
`,go=`
float toothF(float u){ float c = cos(u); return c * (1.3 - 0.3 * c * c); }
float toothD(float u){ float c = cos(u); return -sin(u) * (1.3 - 0.9 * c * c); }
`,gt=`
vec2 stadP(vec2 q){
  float a = atan(q.y, q.x > TL ? q.x - TL : q.x < -TL ? q.x + TL : 1.0);
  vec2 res;
  if (q.x > TL) res = vec2(a, 0.0);
  else if (q.x < -TL) res = vec2(a < 0.0 ? a + TAU : a, 2.0 * TL);
  else res = q.y > 0.0 ? vec2(0.5 * PI, TL - q.x) : vec2(1.5 * PI, 3.0 * TL + q.x);
  return res;
}
`,ko=`
vec3 sdTrackA(vec2 p){
  vec2 v0 = p - TC;
  vec2 q = vec2(v0.x * TCS + v0.y * TSN, -v0.x * TSN + v0.y * TCS);
  vec2 v = vec2(q.x - clamp(q.x, -TL, TL), q.y);
  float r = max(length(v), 1e-4);
  vec2 nr = v / r, tg = vec2(-nr.y, nr.x);
  bool cap = abs(q.x) > TL;
  vec2 sp = stadP(q);
  float ui = 2.0 * (sp.x * TR + sp.y);
  float re = TR - TA * toothF(ui);
  float dre = -TA * toothD(ui) * 2.0 * (cap ? TR / r : 1.0);
  float l = sqrt(1.0 + dre * dre);
  float d = TKIND < 0.5 ? (re - r) / l : -1e3; vec2 g = (tg * dre - nr) / l;
  float uo = 2.0 * (sp.x * TRO + sp.y);
  float ro = TRO + TA * toothF(uo);
  float dro = TA * toothD(uo) * 2.0 * (cap ? TRO / r : 1.0);
  float lo = sqrt(1.0 + dro * dro);
  float d2 = (r - ro) / lo;
  if (d2 > d) { d = d2; g = (nr - tg * dro) / lo; }
  return vec3(d, g.x * TCS - g.y * TSN, g.x * TSN + g.y * TCS);
}
`,Do=`
vec3 sdWheelA(vec2 p){
  vec2 v = p - WC;
  vec2 q = vec2(v.x * WCS + v.y * WSN, -v.x * WSN + v.y * WCS);
  float r = max(length(q), 1e-4);
  vec2 nr = q / r, tg = vec2(-nr.y, nr.x);
  float ph = atan(q.y, q.x) * WN;
  float re = WR + TA * toothF(ph), dre = TA * toothD(ph) * WN / r;
  float l = sqrt(1.0 + dre * dre);
  float d = (r - re) / l; vec2 g = (nr - tg * dre) / l;
  float k0 = floor((r - HR0) / HDR) - 1.0;
  for (int i = 0; i < NIT; i++) {
    float k = k0 + float(i);
    if (k >= 0.0 && k < NHOLE - 0.5) {
      float rk = HR0 + k * HDR, ak = k * HGA;
      vec2 w = q - rk * vec2(cos(ak), sin(ak));
      float lw = max(length(w), 1e-4), dh = HRAD - lw;
      if (dh > d) { d = dh; g = -w / lw; }
    }
  }
  return vec3(d, g.x * WCS - g.y * WSN, g.x * WSN + g.y * WCS);
}
`,Ze=`
uniform sampler2D uG;
uniform sampler2D uW;
vec3 decSD(vec4 v){ float dc = v.r * 16.0 - 12.0, df = v.g * 3.0 - 1.5; return vec3(abs(dc) < 1.3 ? df : dc, v.ba * 2.0 - 1.0); }
vec3 sdTrack(vec2 p){
  vec2 v0 = p - TC; vec2 q = vec2(v0.x * TCS + v0.y * TSN, -v0.x * TSN + v0.y * TCS);
  vec3 s = decSD(textureLod(uG, q * GKR + 0.5, 0.0));
  return vec3(s.x, s.y * TCS - s.z * TSN, s.y * TSN + s.z * TCS);
}
vec3 sdWheel(vec2 p){
  vec2 v0 = p - WC; vec2 q = vec2(v0.x * WCS + v0.y * WSN, -v0.x * WSN + v0.y * WCS);
  vec3 s = decSD(textureLod(uW, q * GKW + 0.5, 0.0));
  return vec3(s.x, s.y * WCS - s.z * WSN, s.y * WSN + s.z * WCS);
}
`,zo=`
uniform vec4 BK[2];
out vec4 oC;
void main(){
  vec2 l = (gl_FragCoord.xy / BK[0].zw - 0.5) / BK[0].xy;
  vec3 s;
  float cs = BK[1].x > 0.5 ? 1.0 : TCS, sn = BK[1].x > 0.5 ? 0.0 : TSN;
  vec2 p = vec2(l.x * cs - l.y * sn, l.x * sn + l.y * cs);
  if (BK[1].x > 0.5) s = sdWheelA(WC + p); else s = sdTrackA(TC + p);
  vec2 g = vec2(s.y * cs + s.z * sn, -s.y * sn + s.z * cs);
  oC = vec4(clamp((s.x + 12.0) / 16.0, 0.0, 1.0), clamp((s.x + 1.5) / 3.0, 0.0, 1.0), g * 0.5 + 0.5);
}
`,kt=`
float occl(vec3 X){
  float v = 1.0;
  for (int i = 0; i < NPIN; i++) {
    vec3 c = U[20 + i].xyz - X; float al = dot(c, LDIR);
    if (al > 0.0) { float dd = length(c - LDIR * al), pw = 0.08 + al * LPEN; v *= mix(0.2, 1.0, smoothstep(PINR - pw, PINR + pw, dd)); }
    // the steel shank under the head, down through the ring: its shadow joins the head's to the pin's foot
    float hz = GH + PINR * 0.3, us = clamp((-c.z + hz + LDIR.z * (dot(c, LDIR) - LDIR.z * hz)) / max(1.0 - LDIR.z * LDIR.z, 1e-4), 0.0, hz);
    vec3 cs = c - vec3(0.0, 0.0, hz - us); float as = dot(cs, LDIR);
    if (as > 0.0) { float pw = 0.06 + as * LPEN; v *= mix(0.3, 1.0, smoothstep(0.32 - pw, 0.32 + pw, length(cs - LDIR * as))); }
  }
  vec3 w0 = X - PTIP; float b = dot(LDIR, PAX), dq = dot(LDIR, w0), e = dot(PAX, w0);
  float u = clamp((e - b * dq) / max(1.0 - b * b, 1e-4), 0.0, PLEN);
  vec3 pa = PTIP + PAX * u;
  float t = dot(pa - X, LDIR);
  if (t > 0.0) {
    float dd = length(X + LDIR * t - pa), rr = min(PRAD, 0.35 + u * 0.4), pw = 0.1 + t * LPEN;
    v *= mix(0.35, 1.0, smoothstep(rr - pw, rr + pw, dd));
  }
  return v;
}
`,Qe=`
vec4 outC(vec3 col, float tD, vec3 rd){
  float z = tD * dot(rd, FWD);
  float coc = min(APK * IRES * abs(1.0 - ZF / z), MAXC);
#ifdef LDR
  return vec4(sqrt(clamp(col / 16.0, 0.0, 1.0)), coc / MAXC);
#else
  return vec4(min(col, vec3(60.0)), coc / MAXC);
#endif
}
`,Uo=`
out vec4 oC;
void main(){
  vec2 uv = gl_FragCoord.xy / (IRES * 0.5);
  vec3 rd = rayDir(uv * 2.0 - 1.0);
  vec3 pP = EYE + rd * (-EYE.z / rd.z);
  vec3 sunT = vec3(1.0);
  float under = 0.0, ao = 1.0, u0 = 0.0, u1 = 0.0;
  for (int k = 0; k < NIT; k++) {
    int o = k & 1;
    float z0 = o == 0 ? RZ : WZ;
    vec2 q = k < 2 ? pP.xy : pP.xy + LDIR.xy * ((z0 + GH) / LDIR.z);
    vec3 s;
    if (o == 0) s = sdTrack(q); else s = sdWheel(q);
    if (k < 2) {
      float lowK = max(1.0 - z0 / 6.0, 0.0);
      if (s.x < 0.0) { under = max(under, lowK); if (o == 0) u0 = lowK; else u1 = lowK; }
      ao *= 1.0 - 0.5 * exp(-max(s.x, 0.0) / 0.7) * lowK;
    } else {
      float pw = 0.08 + (z0 + GH) * LPEN / LDIR.z;
      // paper under a gear gets its sun through the plastic even where the ray enters by the side wall
      float uo = o == 0 ? u0 : u1;
      float inside = max(smoothstep(pw, -pw, s.x), uo);
      if (inside > 0.0) {
        float x = -s.x / FIL;
        float cu = mix(1.0, 0.2, under);
        float dip = 0.4 * exp(-(x - 0.35) * (x - 0.35) * 9.0), cw = exp(-(x - 1.3) * (x - 1.3) * 5.0);
        float pf = max(clamp(-s.x * LDIR.z / (GH * length(LDIR.xy)), 0.0, 1.0), uo * 0.7);
        vec3 sg = o == 0 ? SIGT : SIGW;
        vec3 Tc = exp(-sg * (GH / LDIR.z) * mix(0.8, 0.35, under) * pf) * (1.0 - dip * cu) * mix(vec3(1.0), exp(-sg * 1.2) * 1.55, cw * cu);
        sunT *= mix(vec3(1.0), Tc, inside);
      }
    }
  }
  oC = vec4(sunT * occl(pP) * 0.5, under > 0.5 ? 0.0 : ao);
}
`,Fo=`
uniform sampler2D uB;
uniform sampler2D uM;
out vec4 oC;
void main(){
  vec2 uv = gl_FragCoord.xy / IRES;
  vec3 rd = rayDir(uv * 2.0 - 1.0);
  vec3 pP = EYE + rd * (-EYE.z / rd.z);
  vec4 sb = textureLod(uB, uv, 0.0), mk = textureLod(uM, uv, 0.0);
  vec3 sunT = mk.rgb * 2.0;
  float under = 1.0 - smoothstep(0.05, 0.25, mk.a), ao = mk.a;
  float sst = sb.a > 0.004 ? clamp((sb.a - 0.1) / 0.9, 0.0, 1.0) : 1.0;
  vec3 col;
  if (sb.a > 0.004) col = paperShade(pP.xy, sunT * sst * mix(ao, 1.0, under), rd, mix(1.0, 0.45, under));
  else col = sb.rgb * sb.rgb * 4.0 * mix(vec3(1.0), sunT, 0.8) * mix(ao, 1.0, under);
#ifdef LDR
  oC = vec4(sqrt(clamp(col / 16.0, 0.0, 1.0)), 1.0);
#else
  oC = vec4(min(col, vec3(60.0)), 1.0);
#endif
}
`,Dt=`
uniform sampler2D uB;
uniform sampler2D uA;
uniform sampler2D uM;
out vec4 oC;
vec3 baseAt(vec2 uv){
  vec3 v = textureLod(uA, uv, 0.0).rgb;
#ifdef LDR
  return v * v * 16.0;
#else
  return v;
#endif
}
float winR(vec3 d){
  float c = max(dot(d, WNF), 0.05);
  vec2 w = vec2(dot(d, WNR), dot(d, WNU)) / c, a = abs(w) / vec2(WNW, WNH);
  float box = smoothstep(1.03, 0.97, a.x) * smoothstep(1.03, 0.97, a.y);
  float bars = smoothstep(0.005, 0.009, abs(w.x)) * smoothstep(0.005, 0.009, abs(abs(w.y) - WNH * 0.34));
  return box * bars * (0.8 + 0.35 * w.y / WNH);
}
void main(){
  vec2 uv = gl_FragCoord.xy / IRES;
  vec3 rd = rayDir(uv * 2.0 - 1.0);
  float tP = -EYE.z / rd.z;
#ifdef RING
  const float HO = 0.0;
  float z0 = RZ;
  vec3 sg = SIGT, gc = GLOWT;
#else
  const float HO = 1.0;
  float z0 = WZ;
  vec3 sg = SIGW, gc = GLOWW;
#endif
  float tt = (z0 + GH - EYE.z) / rd.z, tb = (z0 - EYE.z) / rd.z;
  float hitT = -1.0, hitW = 0.0, tO = tt, dO = 1.0, tI = tt, dI = -1.0; vec3 hitS = vec3(1.0, 0.0, 0.0);
  // down through the slab: even steps, then secant steps on the wall that was crossed (all map lookups)
  int nsl = NSL;
  for (int i = 0; i < nsl + 3; i++) {
    bool ref = i >= nsl;
    float t = ref ? mix(tO, tI, dO / max(dO - dI, 1e-5)) : mix(tt, tb, float(i) / float(nsl - 1));
    vec2 q = EYE.xy + rd.xy * t;
#ifdef RING
    vec3 s = sdTrack(q);
#else
    vec3 s = sdWheel(q);
#endif
    if (!ref) {
      if (hitT < 0.0) {
        if (s.x < 0.0) { hitT = t; hitW = i == 0 ? 0.0 : 1.0; hitS = s; tI = t; dI = s.x; }
        else { tO = t; dO = s.x; }
      }
    } else if (hitW > 0.5) {
      if (s.x < 0.0) { tI = t; dI = s.x; hitS = s; } else { tO = t; dO = s.x; }
      hitT = mix(tO, tI, dO / max(dO - dI, 1e-5));
    }
  }
#ifndef RING
  if (hitT < 0.0) discard;
#endif
  vec3 col = vec3(0.0);
  float tD = tP;
  if (hitT < 0.0) col = baseAt(uv);
  else {
    vec3 pH = EYE + rd * hitT; tD = hitT;
    vec2 g = hitS.yz; float d = hitS.x, rough = 0.012, haze = 0.0;
    vec3 n;
    if (hitW < 0.5) { float x = clamp(1.0 + d / FIL, 0.0, 0.97); n = normalize(vec3(g * (x / sqrt(1.0 - x * x)), 1.0)); }
    else { float zr = clamp((pH.z - z0) / GH, 0.0, 1.0); n = normalize(vec3(g, smoothstep(0.55, 1.0, zr) * 1.4 - smoothstep(0.35, 0.0, zr) * 0.6)); }
    // moulded plastic: broad waviness, hairline scuffs, flow bands, gates, ejector rings, a knit line, a few bubbles
    vec4 nz = textureLod(uN, pH.xy * 0.021 + HO * 0.37, 0.0);
    vec2 wave = (nz.rg - 0.5) * 0.05, pert = vec2(0.0);
    float scuff = textureLod(uN, vec2(dot(pH.xy, vec2(0.8, 0.6)) * 0.012, dot(pH.xy, vec2(-0.6, 0.8)) * 0.3) + HO * 0.7, 0.5).a;
    vec2 sc2 = vec2(-0.6, 0.8) * (scuff - 0.5);
    float bub = hitW < 0.5 ? smoothstep(0.9, 0.95, textureLod(uN, pH.xy * 0.041 + HO * 0.23, 0.0).a * nz.b * 1.6) : 0.0;
    float flow = 0.5;
    if (hitW < 0.5) {
      vec2 lp = vec2(0.0);
#ifdef RING
      float cs = TCS, sn = TSN;
      vec2 v0 = pH.xy - TC; vec2 ql = vec2(v0.x * cs + v0.y * sn, -v0.x * sn + v0.y * cs);
      vec2 hitSP = stadP(ql);
      vec2 qv = vec2(ql.x - clamp(ql.x, -TL, TL), ql.y); float rr = max(length(qv), 1e-4);
      vec2 nrl = qv / rr, tgl = vec2(-nrl.y, nrl.x);
      float sc = hitSP.x * TR + hitSP.y, rm = rr - RMID;
      float ds = sc - floor(sc / RES + 0.5) * RES;
      vec2 ev = tgl * ds + nrl * rm; float le = length(ev);
      float er = exp(-(le - 1.5) * (le - 1.5) * 90.0);
      lp += ev / max(le, 1e-3) * 0.35 * er; haze += er * 0.3 + step(le, 1.5) * 0.05;
      float hp = PER * 0.5, dg = sc - floor(sc / hp + 0.5) * hp;
      vec2 gv = tgl * dg + nrl * (rr - TR - (RMID - TR) * 0.42); float lg = length(gv);
      if (lg < 1.9) { float kk = 1.0 - lg / 1.9; lp += gv / max(lg, 1e-3) * kk * 0.5; pert += (nz.ba - 0.5) * 0.5 * kk; rough = mix(rough, 0.3, smoothstep(0.0, 0.25, kk)); haze += smoothstep(0.0, 0.3, kk); }
      float dk = sc + TR * 0.5 * PI + 0.25 * hp; dk = dk - floor(dk / hp) * hp - 0.25 * hp;
      float kn = exp(-dk * dk * 22.0);
      lp += tgl * dk * kn * 0.12;
      flow = textureLod(uN, vec2(sc / PER * 3.0, rm * 0.05), 1.0).r + kn * 0.5;
#else
      float cs = WCS, sn = WSN;
      vec2 v0 = pH.xy - WC; vec2 ql = vec2(v0.x * cs + v0.y * sn, -v0.x * sn + v0.y * cs);
      vec2 sp = ql - SPR; float ls = length(sp);
      if (ls < 1.6) { float kk = 1.0 - ls / 1.6; lp += sp / max(ls, 1e-3) * kk * 0.5; pert += (nz.ba - 0.5) * 0.5 * kk; rough = mix(rough, 0.3, smoothstep(0.0, 0.25, kk)); haze += smoothstep(0.0, 0.3, kk); }
      float ang = atan(ql.y, ql.x), sec = TAU / EJ.z, ea = ang - EJ.y, ai = floor(ea / sec + 0.5) * sec + EJ.y;
      vec2 ev = ql - EJ.x * vec2(cos(ai), sin(ai)); float le = length(ev);
      float er = exp(-(le - EJ.w) * (le - EJ.w) * 90.0);
      lp += ev / max(le, 1e-3) * 0.35 * er; haze += er * 0.3;
      flow = textureLod(uN, vec2(ang / TAU * 2.0, length(ql) * 0.045), 1.0).r;
#endif
      pert += vec2(lp.x * cs - lp.y * sn, lp.x * sn + lp.y * cs);
    }
    vec3 n0 = n;
    n = normalize(n0 + vec3(pert + wave * 0.16 + sc2 * 0.012, 0.0));
    float cv = max(dot(n, -rd), 0.0);
    float FG = 0.04 + 0.96 * pow(1.0 - cv, 5.0);
    vec3 rG = reflect(rd, n);
    vec3 ri = refract(rd, normalize(n0 + vec3(pert * 1.2 + wave * 0.7, 0.0)), 1.0 / 1.52);
    if (dot(ri, ri) < 0.01) ri = rd;
    float tbk = min((z0 - pH.z) / min(ri.z, -0.08), 6.0);
    vec3 pb = pH + ri * tbk;
    // a ray that would leave through a side wall is caught by total internal reflection and sent back in
#ifdef RING
    vec3 sw = sdTrack(pb.xy);
#else
    vec3 sw = sdWheel(pb.xy);
#endif
    float tirK = smoothstep(-0.05, 0.1, sw.x);
    pb.xy -= 2.0 * max(sw.x, 0.0) * sw.yz; tbk += 2.0 * max(sw.x, 0.0) / max(length(ri.xy), 0.3);
    vec3 rb = vec3(pb.xy + rd.xy * (z0 / -rd.z), 0.0) - EYE;
    vec2 suv = 0.5 + 0.5 * vec2(dot(rb, RTV), dot(rb, UPV)) / (dot(rb, FWD) * TANH);
    float var = (0.96 + 0.08 * nz.b) * (0.95 + 0.1 * flow);
    float edge = exp(d / 0.7);
    // the moulded edge: the fillet bends the view onto the inside of the far wall (a dark, saturated line), and light
    // piped through the slab leaves just inside the edge (a thin bright line)
    float fx = hitW < 0.5 ? 1.0 + d / FIL : 1.0;
    float dkL = smoothstep(0.5, 0.86, fx) * (1.0 - 0.6 * smoothstep(0.9, 1.0, fx));
    float pipe = hitW < 0.5 ? exp(-(fx - 0.42) * (fx - 0.42) * 70.0) : 0.0;
    vec3 Tr = exp(-sg * tbk * (1.0 + hitW * 0.9) * var * (1.0 + 1.6 * edge + 2.5 * tirK)) * (1.0 - FG) * (1.0 - 0.3 * hitW) * (1.0 - 0.25 * bub) * (1.0 - 0.68 * dkL);
    haze += bub * 0.8;
    float wallK = hitW * max(dot(n, LDIR), 0.0);
    float rimK = edge * (0.35 + 0.65 * smoothstep(-1.0, 1.0, dot(g, -normalize(LDIR.xy))));
    vec3 mk = textureLod(uM, uv, 0.0).rgb;
    float occ = clamp(max(mk.r, max(mk.g, mk.b)) * 2.0, 0.0, 1.0), sa = textureLod(uB, uv, 0.0).a, sst = sa > 0.004 ? clamp((sa - 0.1) / 0.9, 0.0, 1.0) : 1.0;
#ifdef RING
    float pinC = 1.0;
    for (int i = 0; i < NPIN; i++) { vec2 dp = pH.xy - U[20 + i].xy - LDIR.xy * -0.8; pinC *= 1.0 - 0.6 * exp(-dot(dp, dp) / 6.0); }
    Tr *= pinC;
#endif
    float filK = hitW < 0.5 ? smoothstep(0.25, 0.8, 1.0 + d / FIL) : 0.35;
    float filS = filK * smoothstep(0.82, 0.985, dot(rG, LDIR)) * occ * sst;
    vec3 tintC = exp(-sg * 1.6), lit = AMB + LCOL * occ * sst * 0.5;
    col = LCOL * filS * 0.42 + FG * (envL(rG, rough) * 1.6 + (hitW < 0.5 ? winR(rG) * WNI * occ * LCOL / LCOL.g : vec3(0.0)) + LCOL * glint(rG, rough + 0.018) * occ * sst)
        + gc * (FLUO * (0.25 + 1.6 * edge + 1.3 * hitW)) * lit
        + (1.0 - exp(-sg * 2.0)) * 0.025 * (LCOL * occ * sst + AMB)
        + tintC * (rimK * 0.3 + wallK * 0.45 + hitW * 0.12) * lit
        + haze * 0.06 * lit
        + tintC * pipe * (0.25 + 0.5 * occ * sst) * LCOL * 0.35
        + baseAt(suv) * Tr;
  }
  oC = outC(col, tD, rd);
}
`,Co=`
out vec4 oC;
void main(){
  vec2 uv = gl_FragCoord.xy / IRES;
  vec3 rd = rayDir(uv * 2.0 - 1.0);
  float tPin = 1e9; vec3 nPin = vec3(0.0, 0.0, 1.0);
  for (int i = 0; i < NPIN; i++) {
    vec3 oc = EYE - U[20 + i].xyz; float b = dot(oc, rd), h = b * b - dot(oc, oc) + PINR * PINR;
    if (h > 0.0) { float t = -b - sqrt(h); if (t < tPin) { tPin = t; nPin = normalize(oc + rd * t); } }
  }
  if (tPin > 1e8) {
    // the head's shadow on the ring's top face, starting at its foot (multiplied over the ring)
    vec3 Xp = EYE + rd * ((U[20].z - PINR * 0.3 - EYE.z) / rd.z);
    float sh = 1.0;
    for (int i = 0; i < NPIN; i++) {
      vec3 c = U[20 + i].xyz - Xp; float al = dot(c, LDIR);
      if (al > 0.0) { float pw = 0.15 + al * LPEN * 2.0; sh *= mix(0.5, 1.0, smoothstep(PINR - pw, PINR + pw, length(c - LDIR * al))); }
    }
    if (sh > 0.995) discard;
    oC = vec4(0.0, 0.0, 0.0, 1.0 - sh);
    return;
  }
  vec3 X = EYE + rd * tPin;
  float occ = occl(X), cv = max(dot(nPin, -rd), 0.0), F = 0.04 + 0.96 * pow(1.0 - cv, 5.0);
  vec3 rr = reflect(rd, nPin);
  float wr = clamp((dot(nPin, LDIR) + 0.35) / 1.35, 0.0, 1.0);
  vec3 col = PINC * (LCOL * wr * wr * occ + AMB * (0.5 + 0.5 * nPin.z) + LCOL * GLOWT * 0.18 * max(-nPin.z, 0.0)) * 0.7 + max(F, 0.06) * envL(rr, 0.01) * 1.3 + LCOL * glint(rr, 0.004) * occ * 1.4;
  oC = vec4(outC(col, tPin, rd).rgb, 1.0);
}
`,Wo=`
uniform vec4 P[20];
out vec4 oC;
#define NLP int(P[1].w)
float penShadow(vec3 X){
  float v = 1.0;
  for (int i = 0; i < NLP; i++) {
    vec3 T = P[3 + 4 * i].xyz, A = P[4 + 4 * i].xyz; float L = P[3 + 4 * i].w;
    vec3 w0 = X - T; float b = dot(LDIR, A), dq = dot(LDIR, w0), e = dot(A, w0);
    float u = clamp((e - b * dq) / max(1.0 - b * b, 1e-4), 0.0, L);
    vec3 pa = T + A * u; float t = dot(pa - X, LDIR);
    if (t > 0.0) { float dd = length(X + LDIR * t - pa), pw = 0.2 + t * LPEN; v *= mix(0.25, 1.0, smoothstep(4.6 - pw, 4.6 + pw, dd)); }
  }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / IRES;
  vec3 rd = rayDir(uv * 2.0 - 1.0);
  vec3 p = EYE + rd * (-EYE.z / rd.z);
  vec2 sq = p.xy - P[0].xy; sq = vec2(sq.x * P[1].x + sq.y * P[1].y, -sq.x * P[1].y + sq.y * P[1].x);
  vec2 ed = abs(sq) - P[0].zw; float de = max(ed.x, ed.y);
  bool onPaper = de < 0.0;
  vec3 X = onPaper ? p : EYE + rd * ((P[1].z - EYE.z) / rd.z);
  float sh = penShadow(X);
  float wl = dot(p.xy, P[11].xy);
  sh *= 1.0 - P[2].w * clamp(smoothstep(P[11].z - 7.0, P[11].z + 7.0, wl) + smoothstep(P[11].w + 6.0, P[11].w - 6.0, wl) + smoothstep(9.0, 4.5, abs(wl - P[11].w - 30.0)), 0.0, 1.0);
  vec3 col;
  if (onPaper) col = PAPC * (LCOL * sh * LDIR.z + AMB) * (1.0 - 0.25 * exp(de / 0.35));
  else {
    vec2 wq = X.xy;
    float gr = texture(uN, vec2(wq.x * 0.0021, wq.y * 0.031)).r;
    float g2 = texture(uN, vec2(wq.x * 0.009 + gr * 0.3, wq.y * 0.12)).g;
    float rings = 0.5 + 0.5 * sin((wq.y + gr * 46.0) * 0.6 + g2 * 3.0);
    vec3 wood = P[2].rgb * (0.68 + 0.36 * g2 + 0.18 * rings);
    float ao = 1.0 - 0.45 * exp(-de / 0.9);
    vec3 rr = reflect(rd, normalize(vec3((g2 - 0.5) * 0.04, 0.0, 1.0)));
    float F = 0.04 + 0.96 * pow(1.0 - max(-rd.z, 0.0), 5.0);
    col = wood * (LCOL * sh * LDIR.z + AMB) * ao + F * envL(rr, 0.35) * 0.8;
  }
  float tb = 1e9; vec3 hq = vec3(0.0); int pb = -1;
  for (int i = 0; i < NLP; i++) {
    vec3 hp; float t = penMarch(EYE - P[3 + 4 * i].xyz, rd, P[4 + 4 * i].xyz, P[5 + 4 * i].xyz, P[3 + 4 * i].w, P[4 + 4 * i].w, hp);
    if (t > 0.0 && t < tb) { tb = t; hq = hp; pb = i; }
  }
  float flag = onPaper ? 0.1 + 0.9 * sh : 0.0;
  if (pb >= 0) {
    vec4 pc = penShade(hq, rd, P[4 + 4 * pb].xyz, P[5 + 4 * pb].xyz, P[4 + 4 * pb].w, P[6 + 4 * pb].rgb, P[5 + 4 * pb].w);
    col = pc.rgb + col * (1.0 - mix(pc.a, 1.0, 0.8)); flag = 0.0;
  }
  oC = vec4(sqrt(clamp(col / 4.0, 0.0, 1.0)), flag);
}
`,Oo=`
uniform vec4 P[6];
out vec4 oC;
void main(){
  vec2 suv = P[4].xy + gl_FragCoord.xy / P[5].zw * P[4].zw;
  vec3 rdc = rayDir(suv * 2.0 - 1.0);
  vec3 fp = EYE + rdc * (ZF / dot(rdc, FWD));
  vec3 T = P[0].xyz, ax = P[1].xyz, b1 = P[2].xyz;
  // skip pixels whose central ray passes nowhere near the pen
  vec3 w0 = EYE - T; float b = dot(rdc, ax), dq = dot(rdc, w0), e = dot(ax, w0);
  float den = max(1.0 - b * b, 1e-4);
  float u = clamp((e - b * dq) / den, 0.0, P[0].w);
  float tc = max(dot(T + ax * u - EYE, rdc), 0.0);
  float dd = length(EYE + rdc * tc - T - ax * u);
  float zz = tc * dot(rdc, FWD);
  if (dd > 6.6 + P[5].y * abs(1.0 - zz / ZF) * 1.3) { oC = vec4(0.0); return; }
  int NS = int(P[5].x);
  float rot = h12(gl_FragCoord.xy) * TAU;
  vec4 acc = vec4(0.0);
  for (int i = 0; i < NS; i++) {
    float fi = float(i) + 0.5;
    float rr = sqrt(fi / float(NS)) * P[5].y, an = fi * 2.39996 + rot;
    vec3 o = EYE + (RTV * cos(an) + UPV * sin(an)) * rr;
    vec3 d = normalize(fp - o);
    vec3 hp;
    float t = penMarch(o - T, d, ax, b1, P[0].w, P[1].w, hp);
    if (t > 0.0) acc += penShade(hp, d, ax, b1, P[1].w, P[3].rgb, P[2].w);
  }
  acc /= float(NS);
  oC = vec4(sqrt(clamp(acc.rgb / 4.0, 0.0, 1.0)), acc.a);
}
`,qo=o0+`
uniform sampler2D uS; uniform vec4 D; out vec4 oC;
void main(){
  vec2 uv = gl_FragCoord.xy * D.zw;
  oC = 0.25 * (textureLod(uS, uv + vec2(-1.0, -1.0) * D.xy, 0.0) + textureLod(uS, uv + vec2(1.0, -1.0) * D.xy, 0.0) + textureLod(uS, uv + vec2(-1.0, 1.0) * D.xy, 0.0) + textureLod(uS, uv + vec2(1.0, 1.0) * D.xy, 0.0));
}`,Go=`
uniform sampler2D uL0; uniform sampler2D uL1; uniform sampler2D uL2; uniform sampler2D uL3; uniform sampler2D uL4;
uniform sampler2D uT; uniform sampler2D uN;
uniform vec4 V[9];
#define SZ V[0].x
#define MAXC V[0].y
#define EXPO V[0].z
#define TIME V[0].w
#define TSH0 V[1].xy
#define TSH1 V[1].zw
#define TSH2 V[2].xy
#define VIGN V[2].z
#define GRAIN V[2].w
#define TINT V[3].rgb
#define BLOOM V[3].w
#define FADE V[4].x
#define IRES V[4].y
#define NTAP int(V[4].z)
#define OVO V[5].xy
#define OVS V[5].zw
#define HC V[6].xy
#define HD V[6].zw
#define HE V[7].xy
#define HON V[7].z
#define WTR V[8].rgb
out vec4 oC;
vec3 dec(vec4 v){
#ifdef LDR
  return v.rgb * v.rgb * 16.0;
#else
  return v.rgb;
#endif
}
vec3 tapL(int l, vec2 uv){
  vec4 v;
  if (l <= 0) v = textureLod(uL0, uv, 0.0);
  else if (l == 1) v = textureLod(uL1, uv, 0.0);
  else if (l == 2) v = textureLod(uL2, uv, 0.0);
  else if (l == 3) v = textureLod(uL3, uv, 0.0);
  else v = textureLod(uL4, uv, 0.0);
  return dec(v);
}
vec4 ovT(vec2 uv){ vec2 q = (uv - OVO) / OVS; vec4 v = textureLod(uT, q, 0.0); return (q.x < 0.0 || q.y < 0.0 || q.x > 1.0 || q.y > 1.0) ? vec4(0.0) : v; }
void main(){
  vec2 uv = gl_FragCoord.xy / SZ;
  vec4 c0 = textureLod(uL0, uv, 0.0);
  float coc = c0.a * MAXC;
  vec3 col = dec(c0);
  if (coc > 0.8) {
    float lev = clamp(log2(coc * 0.42), 0.0, 3.999);
    int l0 = int(lev); float f = lev - float(l0);
    vec3 a = vec3(0.0), b = vec3(0.0);
    for (int i = 0; i < NTAP; i++) {
      float fi = float(i) + 0.5;
      float rr = sqrt(fi / float(NTAP)) * coc, an = fi * 2.39996;
      vec2 o = vec2(cos(an), sin(an)) * rr / IRES;
      a += tapL(l0, uv + o); b += tapL(l0 + 1, uv + o);
    }
    col = mix(a, b, f) / float(NTAP);
  }
  vec3 glow = tapL(2, uv) * 0.3 + tapL(3, uv) * 0.35 + tapL(4, uv) * 0.35;
  col += BLOOM * max(glow - 0.6, vec3(0.0));
  vec4 t0 = ovT(uv - TSH0), t1 = ovT(uv - TSH1), t2 = ovT(uv - TSH2);
  float ta = (t0.a + t1.a + t2.a) * 0.33333;
  float hid = 0.0;
  if (HON > 0.5) { vec2 dp = uv - HC; hid = smoothstep(0.92, 1.08, length(dp * HE)) * smoothstep(0.0, 0.004, dot(dp, HD)); }
  col = col * (1.0 - ta * (1.0 - 0.6 * hid)) + (t0.rgb * t0.rgb + t1.rgb * t1.rgb + t2.rgb * t2.rgb) * (4.0 / 3.0) * mix(vec3(1.0), WTR * 0.4, hid);
  col *= EXPO * FADE * TINT;
  vec2 vq = uv - 0.5;
  col *= 1.0 - VIGN * dot(vq, vq) * 2.2;
  col = max(col, vec3(0.0));
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
  vec4 nz = textureLod(uN, gl_FragCoord.xy / 64.0 + vec2(fract(TIME * 7.13), fract(TIME * 3.71)), 0.0);
  col += (nz.a - 0.5) * GRAIN + (nz.b - 0.5) / 255.0;
  oC = vec4(col, 1.0);
}`;function c0(a,e,i){const p=(h,I)=>{const W=a.createShader(h);return a.shaderSource(W,I),a.compileShader(W),W},m=a.createProgram(),R=p(a.VERTEX_SHADER,e),k=p(a.FRAGMENT_SHADER,i);return a.attachShader(m,R),a.attachShader(m,k),a.linkProgram(m),{p:m,u:{},sh:[R,k],ok:!1}}const zt={uE:0,uN:1,uP:2,uI:3,uB:4,uS:5,uL0:6,uL1:7,uL2:8,uL3:9,uL4:10,uT:11,uA:12,uM:13,uG:14,uW:15};function s0(a,e,i){if(e.ok)return e;if(!a.getProgramParameter(e.p,a.LINK_STATUS))throw new Error("153 link "+i+": "+a.getProgramInfoLog(e.p)+" "+a.getShaderInfoLog(e.sh[0])+" "+a.getShaderInfoLog(e.sh[1]));const p=a.getProgramParameter(e.p,a.ACTIVE_UNIFORMS);for(let m=0;m<p;m++){const R=a.getActiveUniform(e.p,m);e.u[R.name.replace(/\[0\]$/,"")]=a.getUniformLocation(e.p,R.name)}a.useProgram(e.p);for(const m in zt)e.u[m]&&a.uniform1i(e.u[m],zt[m]);return e.ok=!0,e}function Ut(a,e,i,p){a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,e),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,i),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,p),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,p)}function u0(a,e,i,p,m,R){const k=a.createTexture();return a.bindTexture(a.TEXTURE_2D,k),a.texImage2D(a.TEXTURE_2D,0,p,e,i,0,m,R,null),Ut(a,a.LINEAR,a.LINEAR,a.CLAMP_TO_EDGE),k}function N0(a,e){const i=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,i),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),i}function Je(a,e,i,p,m,R){const k=a.createTexture();return a.activeTexture(a.TEXTURE0+e),a.bindTexture(a.TEXTURE_2D,k),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,i,p,0,a.RGBA,a.UNSIGNED_BYTE,m),a.generateMipmap(a.TEXTURE_2D),Ut(a,a.LINEAR_MIPMAP_LINEAR,a.LINEAR,R),k}const Ee=(a,e,i,p)=>{a=(a%i+i)%i,e=(e%i+i)%i;let m=Math.imul(a,668265261)^Math.imul(e+7919*p,374761393);return m=Math.imul(m^m>>>15,2246822507),m=Math.imul(m^m>>>13,3266489909),m^=m>>>16,(m>>>0)/4294967296},W0=(a,e,i,p,m)=>{const R=Math.floor(a),k=Math.floor(e);let h=a-R,I=e-k;h=h*h*(3-2*h),I=I*I*(3-2*I);const W=Ee(R,k,i,m),J=Ee(R+1,k,i,m),M=Ee(R,k+1,i,m),P=Ee(R+1,k+1,i,m);return(W*(1-h)+J*h)*(1-I)+(M*(1-h)+P*h)*I};function _o(a){let e=At.get(a);if(e)return e;a.getExtension("KHR_parallel_shader_compile");const i=!!a.getExtension("EXT_color_buffer_float");e={vao:a.createVertexArray(),hf:i,pyr:{},env:{}};const p=i?"":"#define LDR"+C0;e.ink=c0(a,Ao,No),e.sunm=c0(a,v0,o0+A0+Ze+kt+Uo),e.base=c0(a,v0,o0+p+A0+So+Fo),e.ring=c0(a,v0,o0+p+"#define RING"+C0+A0+gt+Ze+Qe+Dt),e.wheel=c0(a,v0,o0+p+A0+Ze+Qe+Dt),e.sdb=c0(a,v0,o0+A0+go+gt+ko+Do+zo),e.pins=c0(a,v0,o0+p+A0+kt+Qe+Co),e.stat=c0(a,v0,o0+A0+St+Wo),e.penb=c0(a,v0,o0+A0+St+Oo),e.down=c0(a,v0,qo),e.fin=c0(a,v0,o0+p+Go),a.flush();const m=64,R=new Uint8Array(m*m*4),k=[4,8,32,64];for(let M=0;M<m;M++)for(let P=0;P<m;P++)for(let N=0;N<4;N++){const T=k[N];let K=W0(P*T/m,M*T/m,T,T,N*11+1);N<2&&(K=.65*K+.35*W0(P*T*2/m,M*T*2/m,T*2,T*2,N*11+5)),R[(M*m+P)*4+N]=Math.round(K*255)}e.noise=Je(a,1,m,m,R,a.REPEAT);const h=256,I=new Float32Array(h*h),W=new Float32Array(h*h);for(let M=0;M<h;M++)for(let P=0;P<h;P++){const N=P/h,T=M/h,K=.42*W0(N*18,T*18,18,18,3)+.33*W0(N*44,T*44,44,44,4)+.25*W0(N*104,T*104,104,104,5),Q=1-Math.abs(2*W0(N*9,T*64,9,64,6)-1),i0=1-Math.abs(2*W0(N*60,T*8,60,8,7)-1);I[M*h+P]=K,W[M*h+P]=Math.max(Q*Q*Q,i0*i0*i0)}const J=new Uint8Array(h*h*4);for(let M=0;M<h;M++)for(let P=0;P<h;P++){const N=M*h+P,T=I[M*h+(P+1&255)]-I[M*h+(P+255&255)],K=I[(M+1&255)*h+P]-I[(M+255&255)*h+P];J[N*4]=F(Math.round(128-T*900),0,255),J[N*4+1]=F(Math.round(128-K*900),0,255),J[N*4+2]=Math.round(I[N]*255),J[N*4+3]=Math.round(W[N]*255)}e.paper=Je(a,2,h,h,J,a.REPEAT),e.ibuf=a.createBuffer(),e.ivao=a.createVertexArray(),a.bindVertexArray(e.ivao),a.bindBuffer(a.ARRAY_BUFFER,e.ibuf);for(let M=0;M<3;M++)a.enableVertexAttribArray(M),a.vertexAttribPointer(M,4,a.FLOAT,!1,48,M*16),a.vertexAttribDivisor(M,1);return a.bindVertexArray(null),At.set(a,e),e}function Bo(a,e,i){if(e.pyr[i])return e.pyr[i];const p=[];for(let h=0;h<5;h++){const I=Math.max(1,Math.ceil(i/(1<<h))),W=e.hf?u0(a,I,I,a.RGBA16F,a.RGBA,a.HALF_FLOAT):u0(a,I,I,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE);p.push({t:W,fb:N0(a,W),w:I})}const m=e.hf?u0(a,i,i,a.R11F_G11F_B10F,a.RGB,a.HALF_FLOAT):u0(a,i,i,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE);p.base={t:m,fb:N0(a,m)};const R=Math.ceil(i/2),k=u0(a,R,R,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE);return p.sun={t:k,fb:N0(a,k),w:R},e.pyr[i]=p,p}const O0=a=>{const e=Math.hypot(a[0],a[1],a[2])||1;return[a[0]/e,a[1]/e,a[2]/e]},Pe=(a,e)=>[a[1]*e[2]-a[2]*e[1],a[2]*e[0]-a[0]*e[2],a[0]*e[1]-a[1]*e[0]],je=(a,e)=>a[0]*e[0]+a[1]*e[1]+a[2]*e[2];function Ho(a,e,i){if(e.env[i.key])return e.env[i.key];const p=128,m=64,R=new Uint8Array(p*m*4);for(let h=0;h<m;h++)for(let I=0;I<p;I++){const W=((I+.5)/p-.5)*Z,J=(h+.5)/m*Math.PI,M=Math.PI/2-J;let P;if(M<0){const T=.1+.05*Math.sin(W*9);P=[T*1.5,T*.95,T*.55]}else{const T=.16+.12*Math.sin(M)+.04*Math.cos(W-i.az);P=[T*1.12,T*1,T*.85];let K=W-i.waz;K-=Z*Math.round(K/Z);const Q=M-i.wel;if(Math.abs(K)<i.ww&&Math.abs(Q)<i.wh){const i0=Math.abs(K)<.022||Math.abs(Q)<.02||Math.abs(Math.abs(K)-i.ww*.5)<.014,x0=.85+.3*(Q/i.wh);P=i0?[.05,.045,.04]:i.win.map(S0=>S0*x0),!i0&&Q<-i.wh*.55&&(P=P.map((S0,D)=>S0*[.55,.62,.5][D]))}M>1.2&&(P=P.map(i0=>i0*1.25))}const N=(h*p+I)*4;for(let T=0;T<3;T++)R[N+T]=Math.round(Math.sqrt(F(P[T]/4,0,1))*255);R[N+3]=255}const k=Je(a,0,p,m,R,a.REPEAT);return a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),e.env[i.key]=k,k}const Ft=[{name:"Classic ring",w:60},{name:"Oval ring",w:28},{name:"Straight bar",w:12}],Ct=[{name:"Rainbow gel",w:45,mode:0,wid:.8,cols:[[.92,.1,.42],[.98,.46,.05],[.03,.5,.62],[.42,.13,.78],[.14,.58,.16],[.06,.25,.86],[.9,.07,.09]]},{name:"Metallic",w:25,mode:2,wid:.85,cols:[[.95,.72,.32],[.2,.76,.78],[.92,.5,.33],[.32,.52,.98],[.4,.8,.44],[.98,.46,.72]]},{name:"Pastel",w:20,mode:1,wid:.85,cols:[[.9,.2,.38],[.08,.55,.35],[.15,.33,.9],[.95,.52,.06],[.42,.2,.85],[.95,.28,.12]]},{name:"White on black paper",w:10,mode:1,wid:.8,cols:[[.97,.97,.95],[.95,.9,.78],[.82,.9,.99],[.97,.84,.9]]}],Wt=[{name:"White",w:55,c:[.9,.895,.875],kind:0,tooth:.55},{name:"Cream",w:35,c:[.92,.82,.6],kind:0,tooth:.6},{name:"Kraft",w:10,c:[.58,.42,.27],kind:1,tooth:1}],Ot=[{name:"Single",w:28},{name:"Layered",w:57},{name:"Dense mandala",w:15}],qt=[{name:"Morning window",w:50,key:0,el:33,az:128,col:[3.55,3,2.2],amb:[.37,.45,.63],pen:.012,sz:.012,gli:70,waz:155,wel:30,ww:.42,wh:.36,bars:.97,wni:8.5,win:[2.6,2.7,2.95],expo:.55,tint:[1,.985,.95]},{name:"Golden hour",w:30,key:1,el:16,az:152,col:[5.2,3.1,1.35],amb:[.3,.36,.56],pen:.01,sz:.01,gli:90,waz:150,wel:22,ww:.4,wh:.3,bars:.95,wni:8,win:[3,2.3,1.5],expo:.58,tint:[1,.96,.9]},{name:"Overcast",w:20,key:2,el:58,az:112,bars:0,wni:6,col:[1,1.04,1.1],amb:[.92,1,1.15],pen:.2,sz:.25,gli:4,waz:165,wel:30,ww:.6,wh:.45,win:[2.9,3,3.2],expo:.52,tint:[.97,1,1.03]}],Gt=[{name:"Candy tints",w:60},{name:"Clear",w:22},{name:"Fluorescent",w:18}],Le=[[.97,.42,.68],[.34,.62,.97],[.46,.9,.5],[.98,.8,.22],[.72,.42,.95],[.99,.58,.24],[.28,.86,.86]],_t=[[.99,.2,.55],[.5,.99,.18],[.99,.52,.08],[.98,.95,.12],[.2,.7,.99]],Vo=[24,30,32,36,40,42,45,48,52,56,60,63,64,72,75,80,84],Bt=[[.4,.41,.43],[.85,.83,.78],[.4,.41,.43],[.86,.84,.8],null],Re=(a,e)=>{for(;e;){const i=a%e;a=e,e=i}return a};It.add({num:153,name:"Drawing Gears",fam:"Worlds",recipe:"The old drawing toy: a toothed wheel rolling round inside a toothed ring with a gel pen in one of its holes, so the pattern comes from the real tooth counts. The gears and the inks change every mint. Drag round the ring to draw (drag back to retrace), tap the wheel for the next pen hole or the paper for the next colour, or hold to swap to a different wheel.",interactive:"Drag round the ring to roll the wheel and draw; drag back to retrace. Tap the wheel for the next pen hole, tap the paper for the next pen colour. Hold to swap to a different wheel, which changes the tooth ratio and the pattern. Left alone it draws a layered design pattern by pattern, then starts a fresh sheet.",music:!0,gl:!0,fps:30,seed:0,make(a){const e=a.gl,i=a.size,p=_o(e),m=a.hash.slice(2),R=t=>(parseInt(m.slice(t,t+8),16)^parseInt(m.slice(t+32,t+40),16))>>>0,k=t=>()=>{t=t+1831565813|0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296},h=k(R(0)),I=k(R(8)^1540483477),W=(t,n)=>{let r=0;for(const d of t)r+=d.w;let c=(n||h)()*r;for(let d=0;d<t.length;d++)if(c-=t[d].w,c<=0)return d;return t.length-1},J=(t,n)=>Math.floor((n||h)()*t)%t;let M=W(Ft),P=W(Ct),N=W(Wt),T=W(Ot),K=W(qt),Q=W(Gt),i0=h()<.3;M===2&&T===0&&(T=1),a.home&&(M=0,P=0,N=0,T=1,K=0,Q=0,i0=!1);const x0=Ct[P],S0=Wt[N],D=qt[K],ne=P===3,re=x0.mode;let j,z,L,l0,E=0,X=[0,0],H0=0,V0,K0;if(M===0)j=i0?105:96,z=j/2,L=0,l0=z+12.5,H0=h()*Z;else if(M===1)j=96,z=34,L=(j*Math.PI-Z*z)/4,l0=46,H0=(h()-.5)*40*V;else{j=0,z=8,l0=8,L=120,E=1,X=[0,-2];const t=h();H0=(t<.5?-1:1)*(22+16*Math.abs(t-.5))*V}const m0=Math.cos(H0),E0=Math.sin(H0);E===0?(V0=L+z+3.5,K0=X.slice()):(V0=104,K0=X.slice());const g0=Z*z+4*L,ce=E?.9:(L*Math.abs(m0)+l0+3)/64,Ko=E?20:z-3.2,$e=Vo.filter(t=>t/2<=Ko&&(!E||t<=36));a.trait("Gear set",Ft[M].name),a.trait("Ring",E?"Toothed bar":j+" teeth"),a.trait("Palette",x0.name),a.trait("Paper",ne?"Black":S0.name),a.trait("Design",Ot[T].name),a.trait("Light",D.name),a.trait("Plastic",Gt[Q].name);const q0=30*V,a0=.28,Ie=226*ce,X0=E?[4,-4,0]:[X[0]+4*ce,X[1]-3*ce,0],G0=[X0[0],X0[1]-Ie*Math.sin(q0),Ie*Math.cos(q0)],Y0=[0,Math.sin(q0),-Math.cos(q0)],se=[0,Math.cos(q0),Math.sin(q0)],Z0=[1,0,0],k0=t=>{const n=[t[0]-G0[0],t[1]-G0[1],t[2]-G0[2]],r=je(n,Y0);return[je(n,Z0)/(r*a0)*.5+.5,je(n,se)/(r*a0)*.5+.5,r]},Ae=(t,n)=>{const r=O0([Y0[0]+(Z0[0]*(t*2-1)+se[0]*(n*2-1))*a0,Y0[1]+(Z0[1]*(t*2-1)+se[1]*(n*2-1))*a0,Y0[2]+(Z0[2]*(t*2-1)+se[2]*(n*2-1))*a0]),c=-G0[2]/r[2];return[G0[0]+r[0]*c,G0[1]+r[1]*c]},et=3.4*ce;let Q0=Ie,Ne=et/(2*Q0*a0);const A=i>=600?i:Math.min(1024,i*2),Ht=O0([Math.cos(D.el*V)*Math.cos(D.az*V),Math.cos(D.el*V)*Math.sin(D.az*V),Math.sin(D.el*V)]),tt=Ho(e,p,{key:K,az:D.az*V,waz:D.waz*V,wel:D.wel*V,ww:D.ww,wh:D.wh,win:D.win}),Vt=t=>t.map(n=>-Math.log(F(n,.02,1))/2.3),ot=()=>Q===2?_t[J(_t.length)]:Q===1?[.9+.03*h(),.95,.96]:Le[J(Le.length)],at=a.home?Le[6]:ot(),Se={};a.home&&(Se[56]=Le[5]);const Xo=t=>{if(!Se[t]){let n=ot(),r=0;for(;Q!==1&&n===at&&r++<6;)n=ot();Se[t]=n}return Se[t]},Yo=Q===2?.55:0,nt=Ae(.5,.9),Kt=(h()-.5)*9*V,ge=[nt[0]-10+h()*20,nt[1]-150,135,150+(h()-.5)*6],Zo=ne?[.019,.019,.022]:S0.c,rt=[[.42,.25,.13],[.3,.17,.09],[.5,.36,.22]][J(3)],ke=[];if(E)for(const t of[-84,84])ke.push([t,0]);else if(L>0){const t=(z+l0)/2+1;ke.push([L+t*.7,t*.7],[-L-t,0],[L*.2,-t])}else{const t=h()*Z,n=(z+l0)/2+.8;for(let r=0;r<3;r++){const c=t+r*Z/3;ke.push([n*Math.cos(c),n*Math.sin(c)])}}const D0=ke.map(([t,n])=>[X[0]+t*m0-n*E0,X[1]+t*E0+n*m0,Te+Me*.3]),Qo=Bt[J(Bt.length)]||x0.cols[0].map(t=>t*.8),$=z*Math.PI/2,S={x:0,y:0,nx:0,ny:0,tau:0},Jo=t=>{const n=Math.floor((t+$)/g0),r=t-n*g0;if(r<$){const c=r/z;S.nx=Math.cos(c),S.ny=Math.sin(c),S.x=L+z*S.nx,S.y=z*S.ny,S.tau=c+Math.PI/2}else if(r<$+2*L)S.x=L-(r-$),S.y=z,S.nx=0,S.ny=1,S.tau=Math.PI;else if(r<3*$+2*L){const c=Math.PI/2+(r-$-2*L)/z;S.nx=Math.cos(c),S.ny=Math.sin(c),S.x=-L+z*S.nx,S.y=z*S.ny,S.tau=c+Math.PI/2}else S.x=-L+(r-3*$-2*L),S.y=-z,S.nx=0,S.ny=-1,S.tau=Z;return S.tau+=n*Z,S},ie=3.6,le=1.25,ct=.72,st=1.25,De=t=>Math.max(1,Math.floor((t/2-B0-2.6-ie)/le)+1),ze=t=>V0-2*t-4,f0=(t,n,r,c,d,s)=>{const v=t/2,u=De(t),x=r||E?(Math.PI-2*c+Z*d)/t:(2*c+Math.PI+Z*d)/t,f=E?1:Re(j,t);let y=0,w=t/f*g0;if(E){const b=(r?3*$+3*L:$+L)+ze(v)-c;y=-b,w=2*ze(v)-b}return{n:t,r:v,nh:u,hole:F(n,0,u-1),side:r,s0:c,k:d,a0:x,wMin:y,wEnd:w,ci:s,lobes:E?0:j/f}},Xt=(t,n,r)=>t?3*$+3*L+ze(n)-r:$+L+ze(n)-r,P0={cx:0,cy:0,psi:0},fe=(t,n,r)=>{const c=t.side||E,d=c?t.s0-n:t.s0+n,s=Jo(d),v=t.r;let u,x,f;return c?(u=s.x+s.nx*v,x=s.y+s.ny*v,f=s.tau+Math.PI/2-t.a0-n/v):(u=s.x-s.nx*v,x=s.y-s.ny*v,f=s.tau-Math.PI/2-t.a0-n/v),r.cx=X[0]+u*m0-x*E0,r.cy=X[1]+u*E0+x*m0,r.psi=f+H0,r},Yt=(t,n)=>{const r=ie+t.hole*le,c=n.psi+t.hole*ct;return[n.cx+r*Math.cos(c),n.cy+r*Math.sin(c)]},z0=x0.cols.length,it=t=>E?$e.slice():$e.filter(n=>n/Re(j,n)<=(L>0&&t===6?3:t)),w0=(t,n)=>Math.round(n*(De(t)-1)),Zt=(t,n,r)=>{const c=[],d=Math.floor(t()*z0);if(r)return c.push(f0(56,w0(56,.95),0,0,0,3)),c.push(f0(56,w0(56,.55),0,0,0,2)),c.push(f0(56,w0(56,.95),0,0,1,0)),c.push(f0(84,w0(84,.7),0,0,0,1)),c;if(n===2){const x=it(3),f=E?x:x.filter(t0=>Re(j,t0)>=8),y=f.length?f:x,w=y[Math.floor(t()*y.length)],b=w/2,g=E?1:Re(j,w),C=E?12:Math.min(g,[9,12,16][Math.floor(t()*3)]),G=E?2+Math.floor(t()*3):Math.max(1,Math.round(g/C)),Y=w0(w,.55+t()*.4),ae=w0(w,.25+t()*.3),be=E?0:Math.PI*Math.floor(t()*j);for(let t0=0;t0<C;t0++){const ye=E?t0&1:0,Ye=E?Xt(ye,b,Math.PI*G*(t0>>1)):be;c.push(f0(w,t0%3===2?ae:Y,ye,Ye,G*(E?t0>>1:t0),(d+t0%3)%z0))}return c}if(n===1&&!E){const x=it(6),f=L>0?5+Math.floor(t()*3):3+Math.floor(t()*2),y=x[Math.floor(t()*x.length)],w=t()<.5?y:x[Math.floor(t()*x.length)],b=Math.PI*Math.floor(t()*j),g=1+Math.floor(t()*2),C=w0(y,.82+t()*.16),G=w0(y,.35+t()*.25);c.push(f0(y,C,0,b,0,d)),c.push(f0(y,G,0,b,0,(d+2)%z0)),c.push(f0(w,w===y?C:w0(w,.6+t()*.35),0,b,w===y?g:0,(d+4)%z0));for(let Y=3;Y<f;Y++)c.push(f0(y,Y&1?C:G,0,b,g*(Y-1)+1,(d+Y)%z0));return c}const s=n===0?1:3+Math.floor(t()*2),v=it(n===0?8:6),u=[];for(let x=0;x<s;x++){let f=v[Math.floor(t()*v.length)],y=0;for(;u.includes(f)&&y++<8;)f=v[Math.floor(t()*v.length)];u.push(f);const w=E?x&1:0,b=E?Xt(w,f/2,Math.PI*Math.floor(t()*6)):Math.PI*Math.floor(t()*j);c.push(f0(f,w0(f,.3+t()*.68),w,b,Math.floor(t()*f),(d+x*2)%z0))}return c},Qt=u0(e,A,A,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE),jo=N0(e,Qt),b0=Bo(e,p,A);let Ue,lt,ft,ht,dt,pt,Fe,Ce,vt,ut,We;const Jt=()=>{Ue||(Ue=s0(e,p.ink,"ink"),lt=s0(e,p.sunm,"sun"),ft=s0(e,p.base,"base"),ht=s0(e,p.ring,"ring"),dt=s0(e,p.wheel,"wheel"),pt=s0(e,p.pins,"pins"),Fe=s0(e,p.stat,"static"),Ce=s0(e,p.penb,"pen"),vt=s0(e,p.down,"down"),ut=s0(e,p.fin,"final"),We=s0(e,p.sdb,"sdf"))},_=(t,n)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,n)};e.bindVertexArray(p.vao),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND);const jt=u0(e,I0,I0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE),$t=N0(e,jt),eo=()=>{e.bindFramebuffer(e.FRAMEBUFFER,$t),e.viewport(0,0,I0,I0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)},$o=t=>t.map(n=>-Math.log(F(n,.02,1))),to=.25,oo=new Float32Array(12);let B=new Float32Array(12*4096),U0=0,y0=0,he=!p.ink.ok;const xt=[];he||Jt();const ao=(t,n,r)=>{const c=x0.cols[r],d=re===0?$o(c):c;oo.set([K0[0],K0[1],1/V0,re===0?0:1,d[0],d[1],d[2],2*V0/I0,to,0,0,0]),e.bindFramebuffer(e.FRAMEBUFFER,$t),e.viewport(0,0,I0,I0),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),re===0?e.blendFunc(e.ONE,e.ONE):e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(Ue.p),e.uniform4fv(Ue.u.K,oo),e.bindVertexArray(p.ivao),e.bindBuffer(e.ARRAY_BUFFER,p.ibuf),e.bufferData(e.ARRAY_BUFFER,t.subarray(0,n*12),e.DYNAMIC_DRAW),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,n),e.bindVertexArray(p.vao),e.disable(e.BLEND)},de=()=>{U0&&(he?xt.push([B.slice(0,U0*12),U0,y0]):ao(B,U0,y0),U0=0)},no=()=>{he=!1,Jt();for(const[t,n,r]of xt)ao(t,n,r);xt.length=0},mt=(t,n,r,c,d,s,v,u,x,f,y,w)=>{if(U0*12+12>B.length)if(B.length<12*65536){const g=new Float32Array(B.length*2);g.set(B),B=g}else he&&no(),de();const b=U0*12;B[b]=t,B[b+1]=n,B[b+2]=r,B[b+3]=c,B[b+4]=d,B[b+5]=s,B[b+6]=v,B[b+7]=u,B[b+8]=x,B[b+9]=f,B[b+10]=y,B[b+11]=w,U0++},l={have:0,ax:0,ay:0,aw:0,ak:0,bx:0,by:0,bw:0,bk:0,tx:0,ty:0,arc:0},ea=(t,n,r,c)=>{if(l.have===0){l.ax=t,l.ay=n,l.aw=r,l.ak=c,l.have=1;return}const d=l.have===1?l.ax:l.bx,s=l.have===1?l.ay:l.by,v=t-d,u=n-s,x=Math.hypot(v,u);if(x<.04)return;if(l.have===1){l.bx=t,l.by=n,l.bw=r,l.bk=c,l.tx=v/x,l.ty=u/x,l.have=2;return}const f=l.bx-l.ax,y=l.by-l.ay,w=Math.hypot(f,y)||1,b=f/w,g=y/w,C=v/x,G=u/x;let Y,ae,be,t0;if(b*C+g*G<-.2)Y=b,ae=g,be=C,t0=G;else{const ye=b+C,Ye=g+G,Io=Math.hypot(ye,Ye)||1;Y=ye/Io,ae=Ye/Io,be=Y,t0=ae}mt(l.ax,l.ay,l.bx,l.by,l.tx,l.ty,Y,ae,l.aw,l.bw,l.ak,l.bk),l.ax=l.bx,l.ay=l.by,l.aw=l.bw,l.ak=l.bk,l.bx=t,l.by=n,l.bw=r,l.bk=c,l.tx=be,l.ty=t0},ta=()=>{if(l.have===2){const t=l.bx-l.ax,n=l.by-l.ay,r=Math.hypot(t,n)||1;mt(l.ax,l.ay,l.bx,l.by,l.tx,l.ty,t/r,n/r,l.aw,l.bw,l.ak,l.bk)}l.have=0},oa=(t,n,r,c)=>mt(t,n,t,n,0,0,0,0,r,r,c,c),ro=x0.wid,co=h()*Z;let h0=null;const so=(t,n,r,c)=>{const d=ie+t.hole*le,s=F(Math.ceil(Math.abs(r-n)*(1+d/t.r)/.42),1,2e4),v=Math.max(c,1e-4)/s;for(let u=1;u<=s;u++){const x=Yt(t,fe(t,n+(r-n)*u/s,P0)),f=h0?Math.hypot(x[0]-h0[0],x[1]-h0[1])/v:100;h0&&(l.arc+=Math.hypot(x[0]-h0[0],x[1]-h0[1])),h0=x;const y=Math.exp(-f/14),w=ro*(1+.065*Math.sin(l.arc*.83+co)+.04*Math.sin(l.arc*2.7+co*2))*(1+.3*y);ea(x[0],x[1],w,1+.75*y)}},_0=()=>{ta(),h0=null},H=new Float32Array(Nt*4),e0=(t,n,r,c,d)=>{H[t*4]=n,H[t*4+1]=r,H[t*4+2]=c,H[t*4+3]=d},O=(t,n,r)=>e0(t,n[0],n[1],n[2],r);O(0,G0,a0),O(1,Y0,Q0),O(2,Z0,Ne),O(3,se,.045*A),e0(4,A,0,4,i>=600?12:8),O(5,Ht,D.pen),O(6,D.col,D.sz),O(7,D.amb,D.gli),O(8,Zo,ne?2:S0.kind),e0(9,X[0],X[1],L,z),e0(10,l0,0,E,-1e5),e0(11,m0,E0,1/9,ne?.5:S0.tooth),O(12,Vt(at),Yo),e0(15,ie,le,ct,st),e0(17,K0[0],K0[1],V0,re);for(let t=0;t<3;t++)O(20+t,D0[t]||[0,0,-100],0);O(23,Qo,D0.length),e0(24,1/to,re===0?2:.8,0,0),O(26,at.map(t=>t*t),Math.max(0,Math.log2(256/9/(A/(2*Ie*a0)))));{const t=O0([-.13,.57,.81]),n=O0(Pe(t,[0,0,1])),r=Pe(n,t);O(29,t,.115),O(30,n,.14),O(31,r,D.wni)}const aa=E?z*.45:z+(l0-z)*.72;e0(28,30,aa,g0/Math.max(3,Math.round(g0/34)),g0);const io=new Float32Array(8),Oe=L+l0+B0+3,qe=l0+B0+3,wt=Math.min(2048,Math.ceil(Oe*16)),bt=Math.min(1024,Math.ceil(qe*16)),Ge=720,lo=u0(e,wt,bt,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE),fo=N0(e,lo),ho=u0(e,Ge,Ge,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE),na=N0(e,ho),yt=(t,n,r,c,d,s)=>{_(14,null),_(15,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.viewport(0,0,n,r),io.set([c,d,n,r,s,0,0,0]),e.useProgram(We.p),e.uniform4fv(We.u.U,H),e.uniform4fv(We.u.BK,io),e.drawArrays(e.TRIANGLES,0,3)};H[32*4]=.5/Oe,H[32*4+1]=.5/qe;const po=!he;po&&yt(fo,wt,bt,.5/Oe,.5/qe,0);const Tt=28*V,vo=(44+h()*24)*V,T0=[Math.sin(Tt)*Math.cos(vo),Math.sin(Tt)*Math.sin(vo),Math.cos(Tt)];let J0=O0(Pe(T0,[0,0,1]));{const t=Pe(T0,J0),n=Math.cos(1),r=Math.sin(1);J0=O0(J0.map((c,d)=>c*n+t[d]*r))}const Mt=150;O(19,T0,Mt);let n0=Zt(I,T,a.home);const L0=a.home?2:T===0?0:Math.min(n0.length-1,Math.floor(n0.length*(.6+.4*h()))),ra=t=>{const n=n0[L0],r=X0[0]+m0*(t-.5)*36,c=X0[1]+E0*(t-.5)*36;let d=.5,s=1e9;for(let v=0;v<=1.0001;v+=.01){const u=n.wMin+(n.wEnd-n.wMin)*v+70;if(u>n.wEnd-4)break;fe(n,u,P0);const x=Math.hypot(P0.cx-r,P0.cy-c);x<s&&(s=x,d=v)}return d},uo=a.home?.66:E?ra(h()):(T===0?.8:.55)+(T===0?.2:.4)*h(),xo=E?26:70;eo();for(let t=0;t<=L0;t++){const n=n0[t];y0=n.ci;const r=t<L0?n.wEnd:n.wMin+(n.wEnd-n.wMin)*uo;so(n,n.wMin,r,(r-n.wMin)/xo),t<L0&&_0(),de()}no(),po||yt(fo,wt,bt,.5/Oe,.5/qe,0);const o={pi:L0,cf:n0[L0],w:n0[L0].wMin+(n0[L0].wEnd-n0[L0].wMin)*uo,phase:"roll",pt:0,lift:0,penLift:0,idle:99,fade:1,rz:0,wipe:-1e5,pause:-9,hFrom:0,hT:1,from:null,to:null,toothAcc:0,scrT:0,poolT:0,room:0,sheetN:0,holdT:0,swapN:0};y0=o.cf.ci;const pe=Yt(o.cf,fe(o.cf,o.w,P0)).concat(0);Q0=k0(pe)[2],Ne=et/(2*Q0*a0),O(1,Y0,Q0),O(2,Z0,Ne);const Et=[];for(let t=0;t<=Mt;t+=10)Et.push(k0([pe[0]+T0[0]*t,pe[1]+T0[1]*t,T0[2]*t]));const M0=Et[0];let j0=1e9,$0=1e9,ve=-1e9,ue=-1e9;for(const t of Et){if(t[2]<10)continue;const n=Ne*Math.abs(1-Q0/t[2])*1.3+6/(t[2]*a0*2)+.01;j0=Math.min(j0,t[0]-n),$0=Math.min($0,t[1]-n),ve=Math.max(ve,t[0]+n),ue=Math.max(ue,t[1]+n)}j0=Math.max(j0,M0[0]-1.1),$0=Math.max($0,M0[1]-1.1),ve=Math.min(ve,M0[0]+1.25),ue=Math.min(ue,M0[1]+1.25);const ee=[Math.max(.05,ve-j0),Math.max(.05,ue-$0)],_e=[j0,$0],mo=i>=600?1:1.6,Pt=F(Math.round(ee[0]*i*mo),16,2048),Lt=F(Math.round(ee[1]*i*mo),16,2048),wo=u0(e,Pt,Lt,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE),ca=N0(e,wo),bo=new Float32Array(24),yo=()=>{const t=x0.cols[y0];bo.set([pe[0],pe[1],0,Mt,T0[0],T0[1],T0[2],0,J0[0],J0[1],J0[2],.3+.55*((y0*.618+.2)%1),t[0],t[1],t[2],0,_e[0],_e[1],ee[0],ee[1],i>=600?26:14,et,Pt,Lt]),e.bindFramebuffer(e.FRAMEBUFFER,ca),e.viewport(0,0,Pt,Lt),e.useProgram(Ce.p),e.uniform4fv(Ce.u.U,H),e.uniform4fv(Ce.u.P,bo),_(0,tt),_(1,p.noise),e.drawArrays(e.TRIANGLES,0,3)},xe=new Float32Array(20*4);xe.set([ge[0],ge[1],ge[2],ge[3],Math.cos(Kt),Math.sin(Kt),-.35,0,rt[0],rt[1],rt[2],D.bars],0);{const t=(a.home?28:15+h()*45)*V,n=Math.cos(t),r=Math.sin(t),c=62*ce,d=X0[0]*n+X0[1]*r,s=a.home?0:(h()-.5)*50;xe.set([n,r,d+c*1.14,d-c*1.12+s],11*4)}const Be=[];{const t=(r,c)=>E?Math.abs(-(r-X[0])*E0+(c-X[1])*m0)>54:Math.hypot(r-X[0],c-X[1])>l0+L+9,n=[[.66+h()*.12,.88+h()*.06,(165+h()*30)*V,1],[.12+h()*.12,.92+h()*.05,(10+h()*25)*V,h()<.5?1:0]];for(const[r,c,d,s]of n){const v=Ae(r,c);let u=v[0],x=v[1];const f=Math.cos(d),y=Math.sin(d),w=s?126:150;let b=0;for(;b++<40;){let g=!0;for(let C=-.5;C<=.5;C+=.1)t(u+f*w*C,x+y*w*C)||(g=!1);if(g)break;x+=3}Be.push({tip:[u-f*w/2,x-y*w/2,5.1],ax:[f,y,0],len:w,kind:s,col:x0.cols[(o.cf.ci+1+Be.length*2)%z0].map(g=>(g*.75+.06)*.78)})}}Be.forEach((t,n)=>{const r=O0([-t.ax[1]*.45,t.ax[0]*.45,.89]);xe.set([...t.tip,t.len,...t.ax,t.kind,...r,.3+.6*h(),...t.col,0],(3+4*n)*4)}),xe[7]=Be.length,e.bindFramebuffer(e.FRAMEBUFFER,jo),e.viewport(0,0,A,A),e.useProgram(Fe.p),e.uniform4fv(Fe.u.U,H),e.uniform4fv(Fe.u.P,xe),_(0,tt),_(1,p.noise),e.drawArrays(e.TRIANGLES,0,3),yo();const r0=new Float32Array(36),me=new Float32Array(4),sa=D.expo*(ne?1.1:1);let He=[1,1,1];const Ve=t=>{const n=Xo(t);He=n,O(16,Vt(n),0),O(27,n.map(c=>c*c),0),e0(14,t/2,t,0,De(t)),e0(25,Math.min(t/2*.55,t/2-5),.4+t*.37,3,1.35);const r=t/2+B0+2.5;H[32*4+2]=.5/r,e0(13,0,0,1,0),yt(na,Ge,Ge,.5/r,.5/r,1)},q=[0,0,0],R0=[0,0,0];let te=0,oe=0,Ke=0;const To=t=>{e0(13,te,oe,Math.cos(Ke),Math.sin(Ke)),H[14*4+2]=o.lift,O(18,q,4.8),e0(4,A,t,4,i>=600?12:8),H[10*4+1]=o.rz,H[10*4+3]=o.wipe;for(let s=0;s<D0.length;s++)H[(20+s)*4+2]=D0[s][2]+o.rz;e.disable(e.BLEND),_(14,lo),_(15,ho),e.bindFramebuffer(e.FRAMEBUFFER,b0.sun.fb),e.viewport(0,0,b0.sun.w,b0.sun.w),e.useProgram(lt.p),e.uniform4fv(lt.u.U,H),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,b0.base.fb),e.viewport(0,0,A,A),e.useProgram(ft.p),e.uniform4fv(ft.u.U,H),_(0,tt),_(1,p.noise),_(2,p.paper),_(3,jt),_(4,Qt),_(13,b0.sun.t),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,b0[0].fb),_(12,b0.base.t),e.useProgram(ht.p),e.uniform4fv(ht.u.U,H),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.SCISSOR_TEST);{const s=k0([te,oe,o.lift]),v=k0([te,oe,o.lift+Te]),u=(o.cf.r+B0+1.5)/(Math.min(s[2],v[2])*a0*2),x=Math.min(s[0],v[0])-u,f=Math.min(s[1],v[1])-u,y=Math.max(s[0],v[0])+u,w=Math.max(s[1],v[1])+u,b=F(Math.floor(x*A),0,A),g=F(Math.floor(f*A),0,A);e.scissor(b,g,F(Math.ceil(y*A),0,A)-b,F(Math.ceil(w*A),0,A)-g)}e.useProgram(dt.p),e.uniform4fv(dt.u.U,H),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(pt.p),e.uniform4fv(pt.u.U,H),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);for(let s=0;s<D0.length;s++){const v=k0([D0[s][0],D0[s][1],D0[s][2]+o.rz]),u=(Me*1.25+Me*1.1/Math.max(Ht[2],.25))/(v[2]*a0*2),x=F(Math.floor((v[0]-u)*A),0,A),f=F(Math.floor((v[1]-u)*A),0,A);e.scissor(x,f,F(Math.ceil((v[0]+u)*A),0,A)-x,F(Math.ceil((v[1]+u)*A),0,A)-f),e.drawArrays(e.TRIANGLES,0,3)}e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.useProgram(vt.p);for(let s=1;s<5;s++){const v=b0[s-1],u=b0[s];e.bindFramebuffer(e.FRAMEBUFFER,u.fb),e.viewport(0,0,u.w,u.w),_(5,v.t),me[0]=1/v.w,me[1]=1/v.w,me[2]=1/u.w,me[3]=1/u.w,e.uniform4fv(vt.u.D,me),e.drawArrays(e.TRIANGLES,0,3)}const n=k0(q),r=s=>k0([q[0]+(R0[0]-q[0])*s,q[1]+(R0[1]-q[1])*s,q[2]+(R0[2]-q[2])*s]),c=r(.08),d=r(.16);r0.set([i,.045*A,sa,t,n[0]-M0[0],n[1]-M0[1],c[0]-M0[0],c[1]-M0[1],d[0]-M0[0],d[1]-M0[1],.12,.01,D.tint[0],D.tint[1],D.tint[2],.2,o.fade,A,i>=600?10:8,0,_e[0],_e[1],ee[0],ee[1]],0);{const s=o.lift+Te;if((s-q[2])/T0[2]>.05){const u=k0([q[0],q[1],s]),x=1/(u[2]*a0*2),f=n[0]-u[0],y=n[1]-u[1],w=Math.hypot(f,y)||1;r0[24]=u[0],r0[25]=u[1],r0[26]=f/w,r0[27]=y/w,r0[28]=1/(st*x),r0[29]=1/(st*x*Math.cos(q0)),r0[30]=1,r0[32]=He[0],r0[33]=He[1],r0[34]=He[2]}else r0[30]=0}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,i,i),e.useProgram(ut.p),e.uniform4fv(ut.u.V,r0),_(1,p.noise);for(let s=0;s<5;s++)_(6+s,b0[s].t);_(11,wo),e.drawArrays(e.TRIANGLES,0,3)},Mo=()=>{fe(o.cf,o.w,P0);let t=P0.cx,n=P0.cy,r=P0.psi;if(o.from&&o.to){const v=F0(0,1,o.mv);t=o.from.cx+(o.to.cx-o.from.cx)*v,n=o.from.cy+(o.to.cy-o.from.cy)*v;let u=o.to.psi-o.from.psi;u-=Z*Math.round(u/Z),r=o.from.psi+u*v}te=t,oe=n,Ke=r;const c=o.hT<1?o.hFrom+(o.cf.hole-o.hFrom)*F0(0,1,o.hT):o.cf.hole;o.hv=c;const d=ie+c*le,s=r+c*ct;q[0]=t+d*Math.cos(s),q[1]=n+d*Math.sin(s),q[2]=o.lift+o.penLift*7};Ve(o.cf.n),Mo(),R0[0]=q[0],R0[1]=q[1],R0[2]=q[2],To(0);const d0=a.input,p0=a.sound;let Rt=!1,U=null,we=null;const Eo=()=>Ae(d0.x,1-d0.y),Po=(t,n)=>{const r=t-X[0],c=n-X[1],d=r*m0+c*E0,s=-r*E0+c*m0;if(E)return d;if(d>L)return z*Math.atan2(s,d-L);if(d<-L){let v=Math.atan2(s,d+L);return v<0&&(v+=Z),$+2*L+z*(v-Math.PI/2)}return s>0?$+L-d:3*$+3*L+d},ia=(t,n,r)=>{const c=o.cf,d=c.side||E?c.s0-o.w:c.s0+o.w;return f0(t,n,c.side,d,0,y0)},Lo=(t,n)=>{o.from={cx:te,cy:oe,psi:Ke},o.cf=t,o.w=n;const r=fe(t,n,{cx:0,cy:0,psi:0});o.to={cx:r.cx,cy:r.cy,psi:r.psi},o.mv=0,o.hT=1},Ro=()=>{const t=$e;let n=t.indexOf(o.cf.n);o.swapN++;const r=(n+1+(o.swapN%3===0?2:0))%t.length;_0();const c=ia(t[r],Math.round(o.cf.hole/Math.max(1,o.cf.nh-1)*(De(t[r])-1)));o.phase="lift",o.pt=0,o.next={cf:c,w:o.w},o.manual=!0,p0.hit("click",.25)},la=()=>{if(o.pi++,o.pi>=n0.length){o.phase="show",o.pt=0;return}o.phase="lift",o.pt=0,o.next={cf:n0[o.pi],w:n0[o.pi].wMin},o.manual=!1},Xe=t=>{t!==y0&&(de(),y0=t,o.cf.ci=t,yo())};return(t,n)=>{n=F(n||0,0,.25),R0[0]=q[0],R0[1]=q[1],R0[2]=q[2];const r=d0.taps();let c=0;const d=d0.down&&d0.inside;if(d){o.idle=0;const f=Eo();Rt||(U={t0:t,x:d0.x,y:d0.y,len:0,mode:0,p:Po(f[0],f[1]),held:0});const y=Math.hypot(d0.x-U.x,d0.y-U.y);if(U.len+=y,U.x=d0.x,U.y=d0.y,U.mode||(U.len>.02?U.mode="drag":t-U.t0>.5&&(U.mode="hold",U.held=0,o.phase!=="fresh"&&Ro())),U.mode==="drag"&&o.phase!=="fresh"){const w=Po(f[0],f[1]);let b=w-U.p;E||(b-=g0*Math.round(b/g0)),U.p=w,c=F(E?b*(o.cf.side?-1:1):b,-30,30),o.phase!=="roll"&&o.phase!=="show"&&(o.phase="roll",o.lift=0,o.from=o.to=null,o.next&&(o.cf=o.next.cf,o.w=o.next.w,o.next=null,Ve(o.cf.n),Xe(o.cf.ci))),o.phase==="show"&&(o.phase="roll")}else U.mode==="hold"&&(U.held+=n,U.held>1.1&&o.phase==="roll"&&(U.held=0,Ro()))}else if(Rt&&U){if(!U.mode&&t-U.t0<.5){const f=Eo();Math.hypot(f[0]-te,f[1]-oe)<o.cf.r+1&&o.phase==="roll"?(_0(),o.hFrom=o.hT<1?o.hv:o.cf.hole,o.cf.hole=(o.cf.hole+1)%o.cf.nh,o.hT=0,o.penLift=1,p0.hit("blip",.12,{freq:1300})):(Xe((y0+1)%z0),_0(),o.penLift=1,p0.hit("blip",.1,{freq:800}))}U=null}Rt=d,o.idle+=n;const s=o.idle>4;o.pt+=n;let v=o.w;if(o.phase==="roll"){if(o.lift=Math.max(0,o.lift-n*40),c)o.w+=c;else if(s){const f=o.pt-o.pause,y=o.pi*1.7+o.sheetN*2.3;f>0&&(o.w+=xo*n*F0(0,.7,f)*(.78+.16*Math.sin(f*.9+y)+.1*Math.sin(f*2.31+y*1.6)))}E&&(o.w=F(o.w,o.cf.wMin,o.cf.wEnd)),s&&!c&&o.w>=o.cf.wEnd-1e-6&&(o.w=Math.min(o.w,o.cf.wEnd))}else if(o.phase==="lift"){if(o.lift=14*F0(0,.45,o.pt),o.pt>=.45){const f=o.next;o.next=null,Xe(f.cf.ci),Ve(f.cf.n),Lo(f.cf,f.w),o.phase="move",o.pt=0}}else if(o.phase==="move")o.mv=Math.min(1,o.pt/.7),o.mv>=1&&(o.from=o.to=null,o.phase="lower",o.pt=0);else if(o.phase==="lower")o.lift=14*(1-F0(0,.4,o.pt)),o.pt>=.4&&(o.lift=0,o.phase="roll",o.pt=0,o.pause=.2+.7*((o.pi*.618+o.sheetN*.377)%1),p0.hit("click",.35),p0.hit("kick",.05));else if(o.phase==="show")s&&o.pt>4.5+3.5*((o.sheetN*.618+.3)%1)&&(o.phase="fresh",o.pt=0);else if(o.phase==="fresh"){const f=o.pt,y=14;if(f<.55)l.have&&_0(),o.rz=y*F0(0,.55,f),o.lift=o.rz;else if(f<1.65){o.cleared||(o.cleared=1,p0.hit("noise",.25,{cutoff:900,dur:.9}));const w=(f-.55)/1.1,b=Ae(.5,-.05)[1]-14,g=nt[1]+90;o.wipe=b+(g-b)*w*w*(3-2*w)}else if(o.cleared===1){o.cleared=2,o.wipe=-1e5,de(),eo(),o.sheetN++,n0=Zt(I,T===0?0:T===2?o.sheetN&1?1:2:1,!1),o.pi=0;const w=n0[0];Ve(w.n),Xe(w.ci),Lo(w,w.wMin),o.mv=0}f>=1.65&&(o.rz=y*(1-F0(1.65,2.15,f)),o.mv=Math.min(1,(f-1.65)/.7),f>=2.35&&(o.rz=0,o.from=o.to=null,o.phase="lower",o.pt=0,o.cleared=0,p0.hit("click",.2)))}o.penLift=Math.max(0,o.penLift-n*3.5),o.hT<1&&(o.hT=Math.min(1,o.hT+n/(.25+.06*Math.abs(o.cf.hole-o.hFrom))),o.penLift=Math.max(o.penLift,1-Math.pow(o.hT,4)));const u=o.phase==="roll"&&o.lift<.01&&o.penLift<.05,x=o.w-v;if(u&&Math.abs(x)>1e-6?(so(o.cf,v,o.w,n),o.poolT=0):u&&U&&U.mode==="drag"?(o.poolT+=n,o.poolT>.35&&(o.poolT=0,h0&&oa(h0[0],h0[1],ro*1.6,.35))):!u&&l.have&&_0(),de(),o.phase==="roll"&&s&&o.w>=o.cf.wEnd-1e-6&&(_0(),la()),Math.abs(x)>0&&(o.toothAcc+=Math.abs(x)/Math.PI,o.toothAcc>=1&&(o.toothAcc%=1,p0.hit("click",F(.04+Math.abs(x)/Math.max(n,.001)*8e-4,.04,.14))),o.scrT-=n,u&&o.scrT<=0)){o.scrT=.08;const f=Math.abs(x)/Math.max(n,.001);p0.hit("noise",F(.02+f*.0012,.02,.16),{cutoff:2200+Math.min(4e3,f*30),dur:.1})}if(p0.on&&(o.room-=n,o.room<=0)){if(!we){const w=new Float32Array(8800);let b=0,g=0,C=R(16)|1;for(let G=0;G<8800;G++){C^=C<<13,C^=C>>>17,C^=C<<5;const Y=(C>>>0)/4294967296*2-1;b+=(Y-b)*.05,g+=(b-g)*.2,w[G]=g*2.5}we=w.subarray(0,8e3);for(let G=0;G<800;G++){const Y=G/800;we[G]=we[G]*Y+w[8e3+G]*(1-Y)}}p0.pcm(we,8e3,{vel:.12}),o.room=1}Mo(),To(t)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
