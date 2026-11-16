// Harmonograph: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/151.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ve){ve&&function(){"use strict";const xe=new WeakMap,N0=new Map,Ye=4,m0=`
`,f0="#version 300 es"+m0+"// h151 r12"+m0+"precision highp float;"+m0+"precision highp int;"+m0+"precision highp sampler2D;"+m0,it=f0+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",Y0=`
uniform vec4 U[64];
uniform sampler2D uN;
out vec4 o;
float PA;
const float ZE = -0.095, RB = 0.009, TT = 0.024, XL = -0.15, XR = 0.66, ZB = 1.4;
uint hu(uint x){ x ^= x >> 16u; x *= 0x7feb352du; x ^= x >> 15u; x *= 0x846ca68bu; x ^= x >> 16u; return x; }
float h1(vec2 c){ uvec2 i = uvec2(ivec2(floor(c)) + 65536); return float(hu(i.x * 1597334677u ^ hu(i.y + 374761393u))) * 2.3283064e-10; }
vec4 TXA(vec2 w, vec2 sc, float f){ return textureGrad(uN, w * sc, vec2(f * sc.x, 0.0), vec2(0.0, f * sc.y)); }
vec3 enc(vec3 c){ return U[6].w > 0.5 ? c : sqrt(c / (1.0 + c)); }
vec3 dec(vec3 e){ if (U[6].w > 0.5) return e; vec3 s = e * e; return s / max(1.0 - s, vec3(1e-3)); }
void camRay(vec2 q, vec2 lz, out vec3 ro, out vec3 rd){
  vec2 s = (q * 2.0 - 1.0) * U[0].w;
  vec3 d = normalize(U[1].xyz + U[2].xyz * s.x + U[3].xyz * s.y);
  vec3 pf = U[0].xyz + d * (U[3].w / dot(d, U[1].xyz));
  ro = U[0].xyz + (U[2].xyz * lz.x + U[3].xyz * lz.y) * U[2].w;
  rd = normalize(pf - ro);
}
vec2 lensS(int k, int n, float rot){ float r = sqrt((float(k) + 0.5) / float(n)); float a = float(k) * 2.39996 + rot; return r * vec2(cos(a), sin(a)); }
float bar(float x, float hw, float pw){ return smoothstep(hw - pw, hw + pw, abs(x)); }
// the window in the back wall (z = 1.5): 1 through the glass, 0 on the frame and the wall
float winMask(vec2 p, float pw){
  float a = smoothstep(-1.4 - pw, -1.4 + pw, p.x) * smoothstep(0.4 + pw, 0.4 - pw, p.x) * smoothstep(0.12 - pw, 0.12 + pw, p.y) * smoothstep(1.7 + pw, 1.7 - pw, p.y);
  return a * bar(p.x + 0.55, 0.03, pw) * bar(p.y - 0.65, 0.022, pw) * bar(p.y - 1.2, 0.022, pw);
}
vec3 lightDir(vec3 P){ return U[4].w < 0.5 ? U[4].xyz : normalize(U[6].xyz - P); }
vec3 lightCol(vec3 P){ if (U[4].w < 0.5) return U[5].rgb; vec3 d = U[6].xyz - P; float l2 = dot(d, d); float cs = dot(d, U[4].xyz) * inversesqrt(l2); return U[5].rgb / l2 * (0.006 + 0.994 * smoothstep(0.84, 0.965, cs)); }
float lightVis(vec3 P, float pw){
  if (U[4].w > 0.5) return 1.0;
  vec3 L = U[4].xyz; float t = (1.5 - P.z) / L.z;
  return winMask((P + L * t).xy, t * U[5].w + pw) * clamp(1.0 - 0.55 * (P.x * 0.8 - P.z * 0.5), 0.6, 1.2);
}
vec3 room(vec3 d){
  vec3 c = mix(vec3(0.022, 0.016, 0.011), vec3(0.062, 0.046, 0.032), smoothstep(-0.2, 0.4, d.y));
  c *= 0.6 + 0.8 * textureLod(uN, vec2(atan(d.x, d.z) * 0.4, d.y * 0.6) + 0.37, 2.0).r;
  c += vec3(0.075, 0.06, 0.045) * smoothstep(-0.05, 0.5, d.y) * smoothstep(0.15, -0.5, d.z);
  c = mix(U[14].rgb, c, smoothstep(-0.16, 0.02, d.y));
  return c * (U[4].w > 0.5 ? 0.18 : 1.0);
}
vec3 env(vec3 P, vec3 d, float rough){
  vec3 c = room(d);
  if (U[4].w < 0.5) {
    if (d.z > 0.02) {
      float t = (1.5 - P.z) / d.z; vec2 h = (P + d * t).xy;
      float m = winMask(h, 0.003 + rough * t);
      vec3 sky = mix(vec3(2.7, 2.5, 2.2), vec3(1.3, 1.6, 2.2), smoothstep(0.3, 1.6, h.y));
      c = mix(c, sky, m);
    }
  } else {
    vec3 ld = U[6].xyz - P; float dl = length(ld); float cs = dot(d, ld / dl);
    float r = 0.05 / dl;
    c += vec3(1.0, 0.62, 0.3) * 3.2 * smoothstep(cos(r * 1.25 + rough * 0.5), cos(r * 0.6), cs) + vec3(0.6, 0.32, 0.12) * 0.25 * pow(max(cs, 0.0), 6.0);
  }
  return c;
}
// one lighting path for every material: diffuse albedo a, specular colour f0 at normal incidence, f90 at grazing
vec3 lit(vec3 P, vec3 n, vec3 rd, vec3 a, vec3 f0, float f90, float rough, float vis){
  vec3 L = lightDir(P), Lc = lightCol(P);
  float ndl = max(dot(n, L), 0.0), cv = max(dot(-rd, n), 0.0), p = min(2.0 / max(rough * rough, 1e-4), U[4].w > 0.5 ? 260.0 : 1e5);
  vec3 F = f0 + (vec3(f90) - f0) * pow(1.0 - cv, 5.0);
  vec3 hv = normalize(L - rd);
  return a * (Lc * ndl * vis + U[7].rgb) + F * (env(P, reflect(rd, n), rough) + Lc * vis * ndl * min((p + 8.0) / 25.1 * pow(max(dot(n, hv), 0.0), p), 40.0));
}
const vec3 BRASS = vec3(0.95, 0.70, 0.36);
vec3 woodAlb(vec2 w, float f, float sd, int ty){
  w += vec2(sd * 3.1, sd * 1.3);
  float wob = TXA(w, vec2(0.3, 1.2), f).r;
  float rz = w.y * 50.0 + wob * 6.0 + TXA(w + 0.3, vec2(0.12, 0.6), f).g * 4.0;
  float ring = abs(fract(rz) * 2.0 - 1.0);
  ring = mix(0.5, smoothstep(0.15, 0.95, ring), 1.0 - smoothstep(0.3, 1.0, f * 50.0));
  float rib = TXA(w + 0.7, vec2(0.1, 2.0), f).b;
  float pore = TXA(w + 0.2, vec2(5.0, 50.0), f).a;
  float pd = mix(0.16, smoothstep(0.58, 0.8, pore), 1.0 - smoothstep(0.4, 1.5, f * 3000.0));
  float v = 0.5 + 0.25 * (ring - 0.5) + 0.85 * (rib - 0.5);
  v += 0.3 * (TXA(w + 0.9, vec2(1.5, 40.0), f).a - 0.5) * (1.0 - smoothstep(0.5, 1.5, f * 2500.0));
  vec3 dk, lt;
  if (ty == 0) { dk = vec3(0.030, 0.010, 0.0055); lt = vec3(0.165, 0.058, 0.030); }
  else if (ty == 1) { dk = vec3(0.16, 0.095, 0.04); lt = vec3(0.40, 0.25, 0.115); v += 0.3 * smoothstep(0.7, 0.9, TXA(w + 0.5, vec2(0.8, 8.0), f).a); }
  else { dk = vec3(0.010, 0.0085, 0.0075); lt = vec3(0.036, 0.029, 0.023); }
  return mix(dk, lt, clamp(v, 0.0, 1.2)) * (1.0 - 0.5 * pd);
}
// polished wood: its albedo, the polish's normal and roughness
vec3 wood(vec2 w, float f, float sd, int ty, vec3 n, out vec3 nc, out float rough){
  vec2 g = vec2(TXA(w + sd, vec2(0.6), f).g, TXA(w + sd + 0.5, vec2(0.6), f).b) - 0.5;
  nc = normalize(n + vec3(g.x, g.x + g.y, g.y) * 0.012);
  float scr = TXA(vec2(w.x + w.y * 3.0, w.y - w.x * 0.1) + sd, vec2(1.5, 14.0), f).a;
  rough = 0.012 + 0.05 * smoothstep(0.6, 0.9, scr);
  return woodAlb(w, f, sd, ty);
}
`,$e=f0+Y0+`
// what a ray meets: 0 nothing (under the table), 1 wood, 2 a brass flange, 3 a post hole
int table(vec3 ro, vec3 rd, out vec3 P, out vec3 n, out vec2 w, out float t, out float ao){
  ao = 1.0; n = vec3(0.0, 1.0, 0.0); w = vec2(0.0); P = vec3(0.0); t = 0.0;
  int kind = 0;
  if (rd.y < 0.0) {
    t = -ro.y / rd.y; P = ro + rd * t;
    if (P.z >= ZE + RB && P.x > XL && P.x < XR && P.z < ZB) {
      w = P.xz;
      float r = length(P.xz - U[13].zw);
      ao = 0.6 + 0.4 * smoothstep(0.024, 0.034, r);
      kind = r < 0.0115 ? 3 : 1;
    }
  }
  if (kind == 0) {
    vec2 oc = vec2(ro.y + RB, ro.z - (ZE + RB)), dd = rd.yz;
    float a = dot(dd, dd), b = dot(oc, dd), cc = dot(oc, oc) - RB * RB, disc = b * b - a * cc;
    float tc = (-b - sqrt(max(disc, 0.0))) / a; vec3 Pc = ro + rd * tc;
    if (disc > 0.0 && tc > 0.0 && Pc.y >= -RB && Pc.z <= ZE + RB && Pc.x > XL && Pc.x < XR) { t = tc; P = Pc; n = normalize(vec3(0.0, Pc.y + RB, Pc.z - (ZE + RB))); w = vec2(Pc.x, Pc.y * 0.7 + 0.31); kind = 1; }
  }
  if (kind == 0 && rd.z > 0.0) {
    float tf = (ZE - ro.z) / rd.z; vec3 Pf = ro + rd * tf;
    if (Pf.y < -RB && Pf.y > -TT && Pf.x > XL && Pf.x < XR) { t = tf; P = Pf; n = vec3(0.0, 0.0, -1.0); w = vec2(Pf.x, Pf.y + 0.31); kind = 1; }
  }
  return kind;
}
void main(){
  vec2 q = gl_FragCoord.xy / U[1].w;
  PA = 2.0 * U[0].w / U[1].w;
  int N = int(U[9].x);
  float rot = h1(gl_FragCoord.xy) * 6.283;
  vec3 acc = vec3(0.0); float und = 0.0;
  for (int k = 0; k < N; k++) {
    vec2 jit = vec2(h1(gl_FragCoord.xy + float(k) * 7.13), h1(gl_FragCoord.yx * 1.3 + float(k) * 3.71)) - 0.5;
    vec3 ro, rd; camRay(q + jit / U[1].w, lensS(k, N, rot), ro, rd);
    vec3 P, n; vec2 w; float t, ao;
    int kind = table(ro, rd, P, n, w, t, ao);
    if (kind == 0) und += 1.0;
    else {
      vec3 c = vec3(0.002, 0.0015, 0.001);
      if (kind == 1) {
        vec3 nc; float rough;
        vec3 a = wood(w, t * PA, U[8].y, int(U[8].x + 0.5), n, nc, rough) * ao;
        c = lit(P, nc, rd, a, vec3(0.04 * U[8].z), U[8].z, rough, lightVis(P, 0.0));
        if (P.y < -1e-4 && P.z < ZE + RB) c += (U[7].rgb + vec3(0.05, 0.035, 0.0)) * U[47].w * smoothstep(0.72, 0.84, n.y) * smoothstep(0.975, 0.91, n.y);
      }
      acc += min(c, vec3(60.0));
    }
  }
  vec3 cm = acc / float(N);
  if (any(isnan(cm)) || any(isinf(cm))) cm = vec3(0.0);
  o = vec4(enc(min(cm, vec3(1000.0))), und / float(N));
}`,Je=f0+Y0+`
float dot2(vec3 v){ return dot(v, v); }
float iCyl(vec3 ro, vec3 rd, vec3 a, vec3 b, float ra, out vec3 n){
  vec3 ba = b - a, oc = ro - a;
  float baba = dot(ba, ba), bard = dot(ba, rd), baoc = dot(ba, oc);
  float k2 = baba - bard * bard, k1 = baba * dot(oc, rd) - baoc * bard, k0 = baba * dot(oc, oc) - baoc * baoc - ra * ra * baba;
  float h = k1 * k1 - k2 * k0;
  if (h < 0.0) return -1.0;
  h = sqrt(h);
  float t = (-k1 - h) / k2, y = baoc + t * bard;
  if (y > 0.0 && y < baba) { n = (oc + t * rd - ba * y / baba) / ra; return t; }
  t = ((y < 0.0 ? 0.0 : baba) - baoc) / bard;
  if (abs(k1 + k2 * t) < h) { n = ba * sign(y) / sqrt(baba); return t; }
  return -1.0;
}
float iCone(vec3 ro, vec3 rd, vec3 pa, vec3 pb, float ra, float rb, out vec3 n){
  vec3 ba = pb - pa, oa = ro - pa, ob = ro - pb;
  float m0 = dot(ba, ba), m1 = dot(oa, ba), m2 = dot(rd, ba), m3 = dot(rd, oa), m5 = dot(oa, oa), m9 = dot(ob, ba);
  if (m1 < 0.0) { if (dot2(oa * m2 - rd * m1) < ra * ra * m2 * m2) { n = -ba * inversesqrt(m0); return -m1 / m2; } }
  else if (m9 > 0.0) { float t = -m9 / m2; if (dot2(ob + rd * t) < rb * rb) { n = ba * inversesqrt(m0); return t; } }
  float rr = ra - rb, hy = m0 + rr * rr;
  float k2 = m0 * m0 - m2 * m2 * hy, k1 = m0 * m0 * m3 - m1 * m2 * hy + m0 * ra * (rr * m2), k0 = m0 * m0 * m5 - m1 * m1 * hy + m0 * ra * (rr * m1 * 2.0 - m0 * ra);
  float h = k1 * k1 - k2 * k0;
  if (h < 0.0) return -1.0;
  float t = (-k1 - sqrt(h)) / k2, y = m1 + t * m2;
  if (y < 0.0 || y > m0) return -1.0;
  n = normalize(m0 * (m0 * (oa + t * rd) + rr * ba * ra) - ba * hy * y);
  return t;
}
float iCap(vec3 ro, vec3 rd, vec3 pa, vec3 pb, float ra){
  vec3 ba = pb - pa, oa = ro - pa;
  float baba = dot(ba, ba), bard = dot(ba, rd), baoa = dot(ba, oa), rdoa = dot(rd, oa), oaoa = dot(oa, oa);
  float a = baba - bard * bard, b = baba * rdoa - baoa * bard, c = baba * oaoa - baoa * baoa - ra * ra * baba, h = b * b - a * c;
  if (h >= 0.0) {
    float t = (-b - sqrt(h)) / a, y = baoa + t * bard;
    if (y > 0.0 && y < baba) return t;
    vec3 oc = y <= 0.0 ? oa : ro - pb;
    b = dot(rd, oc); c = dot(oc, oc) - ra * ra; h = b * b - c;
    if (h > 0.0) return -b - sqrt(h);
  }
  return -1.0;
}
void main(){
  vec2 q = gl_FragCoord.xy / U[1].w;
  vec4 bb = U[21];
  if (q.x < bb.x || q.y < bb.y || q.x > bb.z || q.y > bb.w) { o = vec4(0.0); return; }
  PA = 2.0 * U[0].w / U[1].w;
  vec3 Hg = U[16].xyz, Ct = U[17].xyz, Tp = U[18].xyz, ax = U[19].xyz, Cw = U[20].xyz;
  float nl = U[18].w, cl = U[19].w;
  vec3 Nt = Tp + ax * nl;
  vec3 ad = normalize(Ct - Hg);
  int N = int(U[9].x);
  float rot = h1(gl_FragCoord.xy) * 6.283;
  vec3 acc = vec3(0.0); float al = 0.0;
  for (int k = 0; k < N; k++) {
    vec2 jit = vec2(h1(gl_FragCoord.xy + float(k) * 7.13), h1(gl_FragCoord.yx * 1.3 + float(k) * 3.71)) - 0.5;
    vec3 ro, rd; camRay(q + jit / U[1].w, lensS(k, N, rot), ro, rd);
    float tb = 1e9, t; int id = -1; vec3 nb = vec3(0.0, 1.0, 0.0), n;
    // the hinge knuckle, the counterweight and the collar
    int nc = int(U[22].y);
    for (int i = 0; i < nc; i++) {
      vec4 ca = U[24 + 2 * i], cb = U[25 + 2 * i];
      t = iCyl(ro, rd, ca.xyz, cb.xyz, ca.w, n); if (t > 0.0 && t < tb) { tb = t; id = int(cb.w); nb = n; }
    }
    t = iCap(ro, rd, Hg, Ct, U[17].w); if (t > 0.0 && t < tb) { tb = t; id = 2; }
    t = iCone(ro, rd, Tp, Nt, 0.00035, 0.0040, n); if (t > 0.0 && t < tb) { tb = t; id = 5; nb = n; }
    if (id < 0) continue;
    vec3 P = ro + rd * tb;
    if (id == 2) { vec3 pa = P - Hg; nb = normalize(pa - ad * clamp(dot(pa, ad), 0.0, length(Ct - Hg))); }
    float vis = lightVis(P, 0.0);
    vec3 a = BRASS * 0.1, f0 = BRASS * 0.85, extra = vec3(0.0); float f90 = 1.0, rough = id == 4 ? 0.12 : (id == 3 ? 0.06 : (id == 2 ? 0.035 : 0.08)), alpha = 1.0;
    if (id == 5) {
      // the twisted glass nib: fluted, ink held in the flutes near the tip, dark refraction at the rim
      float u = clamp(dot(P - Tp, ax) / nl, 0.0, 1.0);
      vec3 e1 = normalize(cross(ax, vec3(0.0, 1.0, 0.0))), e2 = cross(ax, e1);
      vec3 rp = P - Tp - ax * dot(P - Tp, ax);
      float ph = atan(dot(rp, e2), dot(rp, e1));
      float fl = sin(ph * 8.0 + u * 13.0);
      float ink = clamp(smoothstep(0.62, 0.15, u) * smoothstep(0.35, -0.7, fl) + smoothstep(0.14, 0.02, u), 0.0, 1.0);
      float edge = pow(1.0 - max(dot(-rd, nb), 0.0), 1.5);
      nb = normalize(nb + (-e1 * sin(ph) + e2 * cos(ph)) * cos(ph * 8.0 + u * 13.0) * 0.5);
      a = (U[11].w > 0.5 ? vec3(0.75) : exp(-U[11].rgb * 1.8) * 0.75) * ink * 0.35;
      f0 = vec3(0.04); f90 = 1.0; rough = 0.012;
      float br = smoothstep(0.72, 0.96, fl), dl = smoothstep(-0.72, -0.96, fl);
      extra = vec3(0.004) * edge + vec3(2.6, 2.5, 2.3) * br * (0.3 + 0.7 * max(dot(nb, lightDir(P)), 0.0)) * vis * (1.0 - ink);
      alpha = clamp(0.1 + 0.75 * edge + 0.75 * ink + 0.5 * dl + 0.3 * br, 0.0, 0.96);
    } else if (id == 4) {
      // knurled band on the collar
      vec3 rp = P - Ct; float along = dot(rp, ax);
      vec3 e1 = normalize(cross(ax, vec3(0.0, 1.0, 0.0))), e2 = cross(ax, e1);
      float ph = atan(dot(rp, e2), dot(rp, e1));
      float kn = step(-0.009, along) * step(along, -0.004);
      nb = normalize(nb + (e1 * -sin(ph) + e2 * cos(ph)) * sin(ph * 40.0) * 0.4 * kn);
    } else if (id == 2) nb = normalize(nb + ad * 0.02 * sin(dot(P, ad) * 900.0));
    acc += lit(P, nb, rd, a, f0, f90, rough, vis) + extra;
    al += alpha;
  }
  o = vec4(enc(acc / float(N)), al / float(N));
}`,ue=`
vec3 C0, C1, C2, PV;
vec3 toL(vec3 p){ p -= PV; return vec3(dot(p, C0), dot(p, C1), dot(p, C2)); }
vec3 dirL(vec3 d){ return vec3(dot(d, C0), dot(d, C1), dot(d, C2)); }
vec3 toW(vec3 l){ return PV + C0 * l.x + C1 * l.y + C2 * l.z; }
float platSh(vec3 P, vec3 L, float pang){
  vec3 lp = toL(P), ld = dirL(L);
  float t = (U[21].x - U[21].y * 0.5 - lp.y) / ld.y;
  if (t <= 0.0) return 0.0;
  vec2 h = abs(lp.xz + ld.xz * t) - vec2(U[20].w);
  float pw = t * pang * 1.5 + 0.0015;
  return (1.0 - smoothstep(-pw, pw, h.x)) * (1.0 - smoothstep(-pw, pw, h.y));
}
`,be=`
uniform sampler2D uP;
uniform sampler2D uA;
uniform sampler2D uI;
uniform sampler2D uJ;
`+ue+`
float segSh(vec3 P, vec3 L, vec3 a, vec3 b, float ra, float rb, float pang){
  vec3 u = b - a, w0 = P - a;
  float B = dot(L, u), C = dot(u, u), D = dot(L, w0), E = dot(u, w0);
  float s = clamp((E - B * D) / max(C - B * B, 1e-10), 0.0, 1.0);
  float t = B * s - D;
  if (t <= 0.0) return 0.0;
  float r = mix(ra, rb, s), pw = t * pang + 0.0003;
  float d = length(w0 + L * t - u * s);
  return (1.0 - smoothstep(r - pw, r + pw, d)) * min(1.0, 1.6 * r / pw);
}
float occl(vec3 P, vec3 L, float pang){
  float s = 0.0;
  int n = int(U[23].z);
  for (int i = 0; i < n; i++) { vec4 a = U[48 + 2 * i], b = U[49 + 2 * i]; s = max(s, segSh(P, L, a.xyz, b.xyz, a.w, b.w, pang)); }
  return s;
}
float platAO(vec3 P){
  vec3 lp = toL(P);
  vec2 e = abs(lp.xz) - vec2(U[20].w);
  return (1.0 - smoothstep(-0.012, 0.03, max(e.x, e.y))) * 0.3;
}
float tableFree(vec3 P, vec3 L){
  float t = (-0.017 - P.y) / max(L.y, 1e-3); vec2 h = P.xz + L.xz * t;
  float pw = 0.006 + t * 0.012;
  float inx = smoothstep(XL - pw, XL + pw, h.x) * smoothstep(XR + pw, XR - pw, h.x);
  float inz = smoothstep(ZE - pw, ZE + pw, h.y) * smoothstep(ZB + pw, ZB - pw, h.y);
  return 1.0 - inx * inz;
}
float sdSeg(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-9), 0.0, 1.0); return length(pa - ba * h); }
`,to=f0+Y0+be+`
vec3 under(vec2 q){
  vec3 ro, rd; camRay(q, vec2(0.0), ro, rd);
  float t = (-0.76 - ro.y) / min(rd.y, -1e-3); vec3 P = ro + rd * t;
  float bd = 0.8 + 0.2 * TXA(P.xz, vec2(0.6, 3.0), 0.03).r;
  vec3 L = lightDir(P);
  float sun = tableFree(P, L) * lightVis(P, 0.04);
  float seam = smoothstep(0.0, 0.012, abs(fract(P.x / 0.11) - 0.5) * 0.11);
  vec3 col = vec3(0.13, 0.085, 0.05) * bd * (0.75 + 0.25 * seam) * (U[7].rgb * 2.4 + lightCol(P) * max(L.y, 0.0) * sun * 0.7);
  float cov = 0.0; vec3 acc = vec3(0.0);
  int nr = int(U[23].y) * 4;
  for (int j = 0; j < nr; j++) {
    int i = j >> 2, k = j & 3;
    vec4 R0 = U[28 + 6 * i], R1 = U[29 + 6 * i];
    vec4 Ea = U[30 + 6 * i + (k >> 1)], Wa = U[32 + 6 * i + (k >> 1)];
    vec2 e = (k & 1) == 0 ? Ea.xy : Ea.zw, w = (k & 1) == 0 ? Wa.xy : Wa.zw;
    vec2 pv = R0.xy; float rw = R0.z, coc = R0.w;
    vec2 ax = normalize(e - pv), pp = vec2(-ax.y, ax.x);
    float lit = R1.w, bw = R1.x, hh = R1.y, ec = R1.z, aa = coc + 0.0007;
    // the rod: lacquered brass (steel with nickel bobs), a soft highlight down one side
    float dr = sdSeg(q, pv, e);
    float cr = (1.0 - smoothstep(rw - aa, rw + aa, dr)) * min(1.0, (rw + 0.0007) / aa);
    float xr = clamp(dot(q - pv, pp) / rw, -1.0, 1.0);
    float sr = 0.06 + (coc / rw) * (coc / rw);
    vec3 colR = U[46].rgb * (0.10 + 0.25 * (1.0 - xr * xr) + (0.45 + 0.6 * lit) * exp(-(xr + 0.45) * (xr + 0.45) / sr));
    // the bob: a stack of three slotted disc weights on the rod, seen from above (top face an ellipse), and the
    // knurled thumb-nut that holds it, under it
    vec2 d = q - w; float x = dot(d, pp), y = dot(d, ax);
    float xn = clamp(x / bw, -1.0, 1.0), cx = sqrt(1.0 - xn * xn), yb = ec * bw * cx;
    float cw = 1.0 - smoothstep(-aa, aa, max(abs(x) - bw, max(-hh - yb - y, y - hh - yb)));
    float nw = bw * 0.3, nh = hh * 0.2, xm = clamp(x / nw, -1.0, 1.0), ynb = ec * nw * sqrt(1.0 - xm * xm);
    float cn = 1.0 - smoothstep(-aa, aa, max(abs(x) - nw, max(hh - ynb - y, y - hh - 2.0 * nh - ynb)));
    // side: a metal cylinder lit from the window side, its seams curved like the discs' rims
    float sg = 0.012 + (coc / bw) * (coc / bw) * 0.25;
    float prof = 0.05 + (0.35 + 0.45 * lit) * exp(-(xn + 0.45) * (xn + 0.45) / sg) + 0.08 * exp(-(xn - 0.5) * (xn - 0.5) / (sg * 2.0)) + 0.12 * lit * max(-xn, 0.0) * cx;
    float gw = 0.0009 + coc, ys = y - yb;
    float sa_ = (ys + hh / 3.0) / gw, sb_ = (ys - hh / 3.0) / gw;
    float seam = exp(-sa_ * sa_) + exp(-sb_ * sb_);
    float ph = float(i) * 1.7 + clamp(floor((ys + hh) / (hh * 0.667)), 0.0, 2.0) * 2.3 + 0.4, cs = cos(ph);
    float slot = step(0.15, cs) * (1.0 - smoothstep(0.06 * cs * bw, 0.06 * cs * bw + aa, abs(x - sin(ph) * bw)));
    vec3 colW = (U[12].rgb * U[12].w * prof + U[7].rgb * 0.1 * max(xn, 0.0) * cx) * (1.0 - 0.55 * min(seam, 1.0)) * (1.0 - 0.8 * slot);
    // top face: dim (it faces the table's underside), a bright chamfer along its front rim, the top disc's slot
    vec2 u = vec2(xn, (y + hh) / max(ec * bw, 1e-5));
    float e2 = length(u);
    float tf = 1.0 - smoothstep(1.0 - aa / bw / max(ec, 0.05), 1.0, e2);
    float p0 = float(i) * 1.7 + 0.4;
    float ts = step(0.3, dot(u, vec2(sin(p0), cos(p0)))) * (1.0 - smoothstep(0.08, 0.08 + aa / bw, abs(u.x * cos(p0) - u.y * sin(p0))));
    vec3 colT = U[12].rgb * U[12].w * ((0.1 + 0.22 * lit) * (0.8 - 0.3 * u.y) * (1.0 - 0.85 * ts) + (0.12 + 0.3 * lit) * smoothstep(0.78, 0.96, e2) * max(u.y, 0.0));
    colW = mix(colW, colT, tf);
    // the nut: darker, knurled
    float xk = clamp(x / nw, -1.0, 1.0);
    vec3 colN = U[12].rgb * U[12].w * (0.04 + (0.3 + 0.5 * lit) * exp(-(xk + 0.4) * (xk + 0.4) / (sg * 1.5))) * (0.75 + 0.25 * sin(asin(xk) * 14.0));
    // back to front: the rod below the top face, the nut, the bob, the rod above it
    float fr = step(y, -hh);
    float r1 = cr * (1.0 - fr), r2 = cr * fr;
    vec3 cc = colR * r1; float ca = r1;
    cc = colN * cn + cc * (1.0 - cn); ca = cn + ca * (1.0 - cn);
    cc = colW * cw + cc * (1.0 - cw); ca = cw + ca * (1.0 - cw);
    cc = colR * r2 + cc * (1.0 - r2); ca = r2 + ca * (1.0 - r2);
    acc += cc * 0.25; cov += ca * 0.25;
  }
  cov = min(cov, 1.0);
  return col * (1.0 - cov) + acc;
}
void main(){
  vec2 q = gl_FragCoord.xy / U[1].w;
  PA = 2.0 * U[0].w / U[1].w;
  C0 = U[17].xyz; C1 = U[18].xyz; C2 = U[19].xyz; PV = vec3(U[17].w, U[18].w, U[19].w);
  vec4 pl = textureLod(uP, q, 0.0);
  vec3 col = dec(pl.rgb);
  float und = pl.a;
  vec3 ro, rd; camRay(q, vec2(0.0), ro, rd);
  float pang = U[4].w < 0.5 ? U[5].w * 2.0 : 0.08;
  // the moving shadows on the table top
  if (und < 0.999 && rd.y < 0.0) {
    float t = -ro.y / rd.y; vec3 P = ro + rd * t;
    vec4 sb = U[24];
    if (P.z > ZE + RB && P.x > sb.x && P.z > sb.y && P.x < sb.z && P.z < sb.w) {
      vec3 L = lightDir(P);
      float s = max(platSh(P, L, pang), occl(P, L, pang));
      float sv = s * lightVis(P, 0.0);
      col *= (1.0 - 0.74 * sv) * (1.0 - platAO(P));
      col = mix(col, col * vec3(U[47].x, 1.0 - U[47].y, 1.0 - U[47].y) + dot(col, vec3(0.2126, 0.7152, 0.0722)) * vec3(0.0, U[47].y, U[47].z), sv);
    }
  }
  if (und > 0.002) col += und * under(q);
  o = vec4(enc(col), 1.0);
}`,eo=f0+Y0+be+`
float inkAt(vec2 uv, float bt){
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 0.0;
  float tx = 1.0 / U[27].x;
  float m = smoothstep(2.2, 3.6, bt), d = 0.0;
  if (m < 1.0) {
    float r = max(bt, 0.5) * 0.6 * tx;
    d += (1.0 - m) * 0.25 * (textureLod(uI, uv + vec2(r, r * 0.35), 0.0).r + textureLod(uI, uv + vec2(-r * 0.35, r), 0.0).r + textureLod(uI, uv - vec2(r, r * 0.35), 0.0).r + textureLod(uI, uv - vec2(-r * 0.35, r), 0.0).r);
  }
  if (m > 0.0) {
    float r = max(bt - 2.0, 0.0) * 0.6 * tx;
    d += m * 0.25 * (textureLod(uJ, uv + vec2(r, r * 0.35), 0.0).r + textureLod(uJ, uv + vec2(-r * 0.35, r), 0.0).r + textureLod(uJ, uv - vec2(r, r * 0.35), 0.0).r + textureLod(uJ, uv - vec2(-r * 0.35, r), 0.0).r);
  }
  return d * U[27].y;
}
uniform sampler2D uS;
// the board's top in its own frame, baked: sqrt(albedo), and what it is (0 paper, 0.5 wood, 1 brass clip)
vec4 surf(vec2 lp, float f){ vec2 t = lp / (2.0 * U[20].w) + 0.5; float g = f / (2.0 * U[20].w); return textureGrad(uS, t, vec2(g, 0.0), vec2(0.0, g)); }
void main(){
  vec2 q = gl_FragCoord.xy / U[1].w;
  PA = 2.0 * U[0].w / U[1].w;
  C0 = U[17].xyz; C1 = U[18].xyz; C2 = U[19].xyz; PV = vec3(U[17].w, U[18].w, U[19].w);
  vec3 ro, rd; camRay(q, vec2(0.0), ro, rd);
  float pang = U[4].w < 0.5 ? U[5].w * 2.0 : 0.08;
  int K = int(U[23].x);
  float BH = U[20].w, HT = U[21].x, BT = U[21].y, hw = U[20].z;
  vec2 sl = U[21].zw; bool sa = U[23].w > 0.5;
  // per material: weight and summed position; brass also sums its normals
  float wP = 0.0, wO = 0.0, wW = 0.0, wB = 0.0;
  vec3 pP = vec3(0.0), pO = vec3(0.0), pW = vec3(0.0), pB = vec3(0.0), nB = vec3(0.0);
  float fpx = dot(toW(vec3(0.0, HT, 0.0)) - U[0].xyz, U[1].xyz) * PA;
  float rot = h1(gl_FragCoord.xy + 31.0) * 6.283;
  for (int k = 0; k < K; k++) {
    vec2 jit = vec2(h1(gl_FragCoord.xy + float(k) * 3.1), h1(gl_FragCoord.yx + float(k) * 5.3)) - 0.5;
    vec3 r0, r1; camRay(q + jit / U[1].w, lensS(k, K, rot), r0, r1);
    vec3 lo = toL(r0), ld = dirL(r1);
    if (sa) {
      float t = (HT + 0.0008 - lo.y) / ld.y;
      vec2 h = lo.xz + ld.xz * t - sl;
      vec2 pu = vec2(U[20].x * h.x + U[20].y * h.y, -U[20].y * h.x + U[20].x * h.y);
      if (t > 0.0 && max(abs(pu.x), abs(pu.y)) < hw) { wO += 1.0; pO += vec3(h.x + sl.x, HT + 0.0008, h.y + sl.y); continue; }
    }
    vec3 bmin = vec3(-BH, HT - BT, -BH), bmax = vec3(BH, HT, BH);
    vec3 ir = 1.0 / ld, t0 = (bmin - lo) * ir, t1 = (bmax - lo) * ir, tn = min(t0, t1), tf = max(t0, t1);
    float a = max(max(tn.x, tn.y), tn.z), b = min(min(tf.x, tf.y), tf.z);
    if (a > b || a < 0.0) continue;
    vec3 P = lo + ld * a;
    if (a == tn.y) {
      // what the top is here, worked out exactly (the baked map's mask stair-steps in the close view)
      vec2 pu = vec2(U[20].x * P.x + U[20].y * P.z, -U[20].y * P.x + U[20].x * P.z);
      if (length(abs(pu) - vec2(hw - 0.0065)) >= 0.0036) { if (max(abs(pu.x), abs(pu.y)) < hw) { wP += 1.0; pP += P; } else { wW += 1.0; pW += P; } }
      else {
        vec2 d = pu - sign(pu) * (hw - 0.0065);
        vec2 dl = vec2(U[20].x * d.x - U[20].y * d.y, U[20].y * d.x + U[20].x * d.y);
        wB += 1.0; pB += P; nB += normalize(vec3(dl.x, max(0.0036 - length(dl), 0.0) + 0.0012, dl.y));
      }
    } else {
      // the brass band round the board's edge: a bevel at the top, a fine groove
      vec3 nl = a == tn.x ? vec3(sign(P.x), 0.0, 0.0) : vec3(0.0, 0.0, sign(P.z));
      float u = (P.y - (HT - BT)) / BT;
      nl.y = u > 0.6 ? (u - 0.6) * 2.2 : (u < 0.12 ? -(0.12 - u) * 4.0 : 0.0);
      float dk = 1.0 - 0.6 * (1.0 - smoothstep(0.03, 0.09, abs(u - 0.45)));
      wB += dk; pB += P * dk; nB += nl;
    }
  }
  float W = wP + wO + wW + wB;
  if (W <= 0.0) { o = vec4(0.0); return; }
  float kf = 1.0 / float(K);
  // the sheet (or the old sheet sliding off), with its ink
  vec3 alb = vec3(0.0), f0 = vec3(0.0), nl = vec3(0.0); float f90 = 0.0, rough = 0.0;
  float wp = wP + wO;
  vec3 Pm = (pP + pO + pW + pB) / max(W, 1e-3);
  if (wp > 0.0) {
    bool old = wO > wP;
    vec3 lp = old ? pO / wO : pP / wP;
    vec2 pp = lp.xz - (old ? sl : vec2(0.0));
    vec2 pu = vec2(U[20].x * pp.x + U[20].y * pp.y, -U[20].y * pp.x + U[20].x * pp.y);
    vec2 uv = pu / (2.0 * hw) + 0.5;
    vec3 Pw = toW(lp);
    float zc = dot(Pw - U[0].xyz, U[1].xyz);
    float fp = zc * PA, coc = U[2].w * abs(zc - U[3].w) / U[3].w;
    vec4 sf = surf(pp, fp + coc);
    vec3 a = U[10].rgb * sf.rgb * sf.rgb;
    float D = (sa && !old ? 0.0 : 1.0) * inkAt(uv, (fp * 0.45 + coc) / (2.0 * hw) * U[27].x) * (0.4 + 0.65 * sf.g * sf.g);
    if (U[11].w > 0.5) a = mix(a, vec3(0.80, 0.79, 0.75), 1.0 - exp(-D * 1.3));
    else a *= exp(-U[11].rgb * D);
    float k = U[10].w > 1.5 ? 1.2 : 0.45;
    alb += wp * a; f0 += wp * vec3(0.03 * k); f90 += wp * 0.5 * k; rough += wp * 0.25; nl += wp * vec3(0.0, 1.0, 0.0);
  }
  if (wW > 0.0) { vec4 sf = surf(pW.xz / wW, fpx); alb += wW * sf.rgb * sf.rgb; f0 += wW * vec3(0.04); f90 += wW; rough += wW * 0.02; nl += wW * vec3(0.0, 1.0, 0.0); }
  if (wB > 0.0) { alb += wB * BRASS * 0.12; f0 += wB * BRASS * 0.6; f90 += wB * 0.7; rough += wB * 0.3; nl += normalize(nB) * wB; }
  alb /= W; f0 /= W; f90 /= W; rough /= W;
  vec3 Pw = toW(Pm), n = normalize(C0 * nl.x + C1 * nl.y + C2 * nl.z);
  float vis = lightVis(Pw, 0.0) * (1.0 - occl(Pw, lightDir(Pw), pang));
  vec3 col = lit(Pw, n, rd, alb, f0, f90, rough, vis);
  float cov = min(W * kf, 1.0);
  o = vec4(enc(col) * cov, cov);
}`,oo=f0+Y0+`
void main(){
  vec2 q = gl_FragCoord.xy / U[9].w;
  float BH = U[20].w, hw = U[20].z;
  vec2 lp = (q * 2.0 - 1.0) * BH;
  float f = 2.0 * BH / U[9].w;
  vec2 pu = vec2(U[20].x * lp.x + U[20].y * lp.y, -U[20].y * lp.x + U[20].x * lp.y), ap = abs(pu);
  if (length(ap - vec2(hw - 0.0065)) < 0.0036) { o = vec4(0.5, 0.5, 0.5, 1.0); return; }
  if (max(ap.x, ap.y) < hw) {
    // paper: fibres and cloud, laid and chain lines for laid paper
    float fb = TXA(pu + 3.7, vec2(18.0), f).a * 0.6 + TXA(pu + 1.3, vec2(5.0), f).b * 0.4;
    float laid = 1.0;
    if (int(U[10].w + 0.5) == 0) {
      laid = 1.0 - 0.03 * sin(pu.y * 6614.0) - 0.02 * TXA(pu + 0.2, vec2(30.0, 2.0), f).a;
      float ch = abs(fract((pu.x + 0.004) / 0.024) - 0.5) * 0.024;
      laid *= 1.0 - 0.075 * (1.0 - smoothstep(0.0004, 0.0016, ch));
    }
    float edge = smoothstep(hw - 0.0015, hw, max(ap.x, ap.y));
    float wv = smoothstep(-0.7, 0.7, (pu.x + 0.6 * pu.y) / hw + 0.3 * sin(pu.y / hw * 2.4 + 0.8));
    o = vec4(sqrt((0.92 + 0.14 * fb) * laid * (1.0 - 0.1 * edge) * (1.0 - 0.055 * wv)) * vec3(1.0, 1.0, 1.0), 0.0);
    return;
  }
  float cs = smoothstep(hw, hw + 0.0025, max(ap.x, ap.y));
  o = vec4(sqrt(woodAlb(lp, f, U[8].y + 0.37, int(U[8].w + 0.5)) * (0.55 + 0.45 * cs)), 0.5);
}`,ao=f0+Y0+ue+`
uniform sampler2D uA;
uniform sampler2D uC;
// polished brass at P: mostly what it reflects (the table below, the dim room, the window), a little diffuse; under the
// table top the light comes in only through the opening (centre o.xy, radius o.z) and the dark closes in with depth
vec3 brassAt(vec3 P, vec3 n, vec3 rd, vec3 o, float pang){
  vec3 L = lightDir(P), rf = reflect(rd, n);
  float v = lightVis(P, 0.0) * (1.0 - platSh(P, L, pang));
  float sub = max(-P.y - 1e-4, 0.0), dk = exp(-sub * 70.0);
  if (sub > 0.0) v *= step(length(P.xz + L.xz * (sub / max(L.y, 0.02)) - o.xy), o.z);
  float e = 0.05 + 0.6 * smoothstep(-0.1, 0.7, rf.z) * smoothstep(-0.3, 0.4, rf.y);
  vec3 en = mix(U[14].rgb, vec3(0.045, 0.034, 0.024) * (1.0 - 0.82 * U[4].w), smoothstep(-0.16, 0.02, rf.y));
  return dk * BRASS * (U[7].rgb * 0.15 + 0.85 * en + lightCol(P) * (0.12 * e + v * (0.1 * max(dot(n, L), 0.0) + 1.6 * pow(max(dot(rf, L), 0.0), 40.0))));
}
void main(){
  vec2 q = gl_FragCoord.xy / U[1].w;
  PA = 2.0 * U[0].w / U[1].w;
  C0 = U[17].xyz; C1 = U[18].xyz; C2 = U[19].xyz; PV = vec3(U[17].w, U[18].w, U[19].w);
  vec3 col = dec(textureLod(uC, q, 0.0).rgb);
  // n13 (the founder's note: the post went through the table). Each post turns about its pivot 8 cm under the table
  // top and comes up through a round opening as wide as its swing (platform at the origin 30 mm, pen at U[13].xy 32 mm,
  // third at U[13].zw 24 mm), lined with a brass sleeve the table's thickness deep, a thin turned brass lip round it.
  // Looking in: the sleeve's far wall, the post leaning inside with dark round it, below the sleeve the dark under the
  // table. Edges as soft as the lens makes them at their depth. Drawn here, over the board's pass, so the board hides
  // what is behind it; under the pen arm.
  vec3 ro, rd; camRay(q, vec2(0.0), ro, rd);
  float pang = U[4].w < 0.5 ? U[5].w * 2.0 : 0.08;
  float tB = 1e9;
  {
    // the board (a box in the platform's frame): how far along the ray
    vec3 lo = ro - PV, ld = vec3(dot(rd, C0), dot(rd, C1), dot(rd, C2)), bx = vec3(U[20].w, 0.5 * U[21].y, U[20].w);
    lo = vec3(dot(lo, C0), dot(lo, C1) - U[21].x + bx.y, dot(lo, C2));
    vec3 ti = (-bx - lo) / ld, ta = (bx - lo) / ld, tn = min(ti, ta), tf = max(ti, ta);
    float t0 = max(max(tn.x, tn.y), tn.z), t1 = min(min(tf.x, tf.y), tf.z);
    if (t0 < t1 && t1 > 0.0) tB = t0;
  }
  float tt = rd.y < 0.0 ? -ro.y / rd.y : 1e8;
  vec3 P0 = ro + rd * tt;
  // what this pixel shows of them: S, N the brass surface (one shading for all), ka its cover, hb the opening
  vec3 S = P0, N = vec3(0.0, 1.0, 0.0), hb = vec3(0.0, 0.0, 0.030); float ka = 0.0, kin = 0.0; bool dark = false;
  if (tt < tB) {
    float eb = length(P0.xz) - 0.030;
    float e1 = length(P0.xz - U[13].xy) - 0.032, e2 = length(P0.xz - U[13].zw) - 0.024;
    if (e1 < eb) { hb = vec3(U[13].xy, 0.032); eb = e1; }
    if (e2 < eb) { hb = vec3(U[13].zw, 0.024); eb = e2; }
    float w = max(U[2].w * abs(dot(rd * tt, U[1].xyz) - U[3].w) / U[3].w, tt * PA * 0.7);
    ka = smoothstep(0.006 + w, 0.006 - w, eb);
    vec2 dv = (P0.xz - hb.xy) / (eb + hb.z);
    if (eb < 0.0) {
      // down the opening: the far wall of the sleeve, or below it the dark
      vec2 o2 = ro.xz - hb.xy; float a = dot(rd.xz, rd.xz), b = dot(o2, rd.xz), k = dot(o2, o2) - hb.z * hb.z;
      S = ro + rd * ((-b + sqrt(max(b * b - a * k, 0.0))) / max(a, 1e-9));
      N = vec3(-(S.xz - hb.xy) / hb.z, 0.0).xzy;
      dark = S.y < -TT; kin = ka;
    } else {
      // the lip: rounded down into the opening and down to the wood
      float u = eb / 0.006, sl = 0.75 * smoothstep(0.6, 1.0, u) - 0.75 * smoothstep(0.4, 0.0, u);
      N = normalize(vec3(dv.x * sl, 1.0, dv.y * sl));
    }
  }
  vec3 DK = U[7].rgb * vec3(0.1, 0.075, 0.05);   // the dark under the table
  // the posts (platform, pen, the rotary's third), each from its pivot up its own axis: below the top only down its
  // opening
  {
    int np = int(U[46].w);
    float al = 0.0; vec3 P = vec3(0.0), nb = vec3(0.0, 1.0, 0.0), hp = hb;
    for (int i = 0; i < np; i++) {
      vec4 A4 = i == 0 ? vec4(toW(vec3(0.0, 0.03, 0.0)), 0.0055) : (i == 1 ? U[62] : U[25]);
      vec4 B4 = i == 0 ? vec4(toW(vec3(0.0, U[21].x - U[21].y, 0.0)), 0.030) : (i == 1 ? U[63] : vec4(U[26].xyz, 0.024));
      vec3 pa = A4.xyz, ba = B4.xyz - pa, oc = ro - pa;
      float ra = A4.w, la = length(ba);
      vec3 u = ba / la, cr = cross(rd, u);
      // the ray's closest approach to the axis: its distance d and the ray's t there
      float c2 = max(dot(cr, cr), 1e-8), tc = -dot(cross(oc, u), cr) / c2;
      float d = abs(dot(oc, cr)) * inversesqrt(c2);
      float w = max(U[2].w * abs(dot(rd * tc, U[1].xyz) - U[3].w) / U[3].w, tc * PA * 0.7);
      // the surface point: the hit on the near side, or the silhouette for a ray that only grazes the blur
      float hh = ra * ra - d * d, t = tc - sqrt(max(hh, 0.0) / c2);
      vec3 Pi = ro + rd * t;
      vec2 ci = pa.xz + ba.xz * ((-0.08 - pa.y) / ba.y);   // the pivot, under its opening's centre
      float yh = dot(Pi - pa, u);   // where it meets the side, up the axis (a ray near the axis meets it far along)
      float a = (1.0 - smoothstep(ra - w, ra + w, d)) * step(0.0, yh) * step(yh, la) * step(0.0, t);
      if (t > tB || (t > tt && length(P0.xz - ci) > B4.w)) a = 0.0;
      if (a > al) { al = a; P = Pi; nb = Pi - pa - u * dot(Pi - pa, u); hp = vec3(ci, B4.w); }
    }
    // a post in front. Down the opening behind its soft edge: the sleeve by what it reflects (or the dark)
    if (al > 0.0) {
      vec3 rf = reflect(rd, N), en = mix(U[14].rgb, vec3(0.045, 0.034, 0.024) * (1.0 - 0.82 * U[4].w), smoothstep(-0.16, 0.02, rf.y));
      col = mix(col, dark ? DK : exp(min(S.y, 0.0) * 70.0) * BRASS * (U[7].rgb * 0.15 + 0.85 * en), kin);
      ka = al; S = P; N = normalize(nb); hb = hp; dark = false;
    }
  }
  if (ka > 0.0) col = mix(col, dark ? DK : brassAt(S, N, rd, hb, pang), ka);
  // the pen arm, moved with its pendulum
  vec2 qa = vec2(U[16].x * q.x - U[16].y * q.y, U[16].y * q.x + U[16].x * q.y) + U[16].zw;
  if (qa.x > 0.0 && qa.y > 0.0 && qa.x < 1.0 && qa.y < 1.0) { vec4 a = textureLod(uA, qa, 0.0); col = col * (1.0 - a.a) + dec(a.rgb); }
  // the print
  col *= U[27].z;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  vec2 vq = q - 0.5;
  col *= 1.0 - 0.08 * dot(vq, vq);
  o = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
}`,ro=f0+`
uniform vec4 U[64];
void main(){ vec2 c = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1)); gl_Position = vec4(mix(U[22].xy, U[22].zw, c) * 2.0 - 1.0, 0.0, 1.0); }`,so=f0+`
layout(location = 0) in vec4 aS;
layout(location = 1) in vec2 aW;
uniform vec4 uG;
out vec2 vP;
out vec3 vK;
void main(){
  vec2 a = aS.xy, b = aS.zw, u = b - a;
  float L = length(u);
  vec2 dir = L > 1e-9 ? u / L : vec2(1.0, 0.0), nr = vec2(-dir.y, dir.x);
  float sg = sqrt(aW.x * aW.x + uG.x), e = sg * 3.5;
  float sx = (gl_VertexID & 1) == 0 ? -e : L + e, sy = (gl_VertexID & 2) == 0 ? -e : e;
  vP = vec2(sx, sy); vK = vec3(L, sg, aW.y * uG.y);
  gl_Position = vec4((a + dir * sx + nr * sy) * 2.0 - 1.0, 0.0, 1.0);
}`,no=f0+`
in vec2 vP;
in vec3 vK;
out vec4 o;
float erf_(float x){ float x2 = x * x; return sign(x) * sqrt(1.0 - exp(-x2 * (1.2732395 + 0.147 * x2) / (1.0 + 0.147 * x2))); }
void main(){
  float L = vK.x, sg = vK.y, s = vP.x, d = vP.y;
  float nd = exp(-0.5 * d * d / (sg * sg)) / (2.5066283 * sg);
  float along;
  if (L < 0.08 * sg) { float m = s - 0.5 * L; along = exp(-0.5 * m * m / (sg * sg)) / (2.5066283 * sg); }
  else along = 0.5 * (erf_(s / (sg * 1.4142136)) - erf_((s - L) / (sg * 1.4142136))) / L;
  o = vec4(vK.z * nd * along, 0.0, 0.0, 0.0);
}`;function co(r){let e=xe.get(r);if(e)return e;r.getExtension("EXT_color_buffer_float"),r.getExtension("EXT_color_buffer_half_float");const g=(L,y0,B)=>{const k=r.createTexture();r.bindTexture(r.TEXTURE_2D,k),r.texImage2D(r.TEXTURE_2D,0,L,4,4,0,y0,B,null);const I=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,I),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,k,0);const U0=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteFramebuffer(I),r.deleteTexture(k),U0},A=g(r.RGBA16F,r.RGBA,r.HALF_FLOAT),d0=g(r.R16F,r.RED,r.HALF_FLOAT),C=[],q={},V=(L,y0)=>{const B=r.createShader(r.VERTEX_SHADER);r.shaderSource(B,L),r.compileShader(B);const k=r.createShader(r.FRAGMENT_SHADER);r.shaderSource(k,y0),r.compileShader(k);const I=r.createProgram();return r.attachShader(I,B),r.attachShader(I,k),r.linkProgram(I),C.push([B,L],[k,y0]),I.__sh=[[B,L],[k,y0]],I};q.table=V(it,$e),q.arm=V(it,Je),q.surf=V(it,oo),q.A=V(it,to),q.B=V(ro,eo),q.C=V(it,ao),q.seg=V(so,no),r.flush();const T=256,$=new Uint8Array(T*T*4);let J=354224763;const t0=()=>(J^=J<<13,J^=J>>>17,J^=J<<5,(J>>>0)/4294967296),w0=(L,y0)=>{const B=new Float32Array(L*L);for(let k=0;k<L*L;k++)B[k]=t0();for(let k=0;k<T;k++){const I=k*L/T,U0=I|0,X0=I-U0,J0=X0*X0*(3-2*X0),g0=U0*L,dt=(U0+1)%L*L;for(let q0=0;q0<T;q0++){const kt=q0*L/T,F0=kt|0,T0=kt-F0,h0=T0*T0*(3-2*T0),e0=(F0+1)%L,_=B[g0+F0]+(B[g0+e0]-B[g0+F0])*h0,O=B[dt+F0]+(B[dt+e0]-B[dt+F0])*h0;$[(k*T+q0)*4+y0]=Math.round((_+(O-_)*J0)*255)}}};w0(8,0),w0(16,1),w0(32,2),w0(64,3),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_ALIGNMENT,1);const $0=r.createTexture();r.bindTexture(r.TEXTURE_2D,$0),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,T,T,0,r.RGBA,r.UNSIGNED_BYTE,$),r.generateMipmap(r.TEXTURE_2D),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.REPEAT),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.REPEAT);const lt=r.createVertexArray(),ft=r.createBuffer();r.bindVertexArray(lt),r.bindBuffer(r.ARRAY_BUFFER,ft),r.enableVertexAttribArray(0),r.vertexAttribPointer(0,4,r.FLOAT,!1,24,0),r.vertexAttribDivisor(0,1),r.enableVertexAttribArray(1),r.vertexAttribPointer(1,2,r.FLOAT,!1,24,16),r.vertexAttribDivisor(1,1),r.bindVertexArray(null);const Vt=r.createVertexArray();return e={progs:q,sh:C,tn:$0,hdr:A,r16:d0,vao:lt,evao:Vt,buf:ft,U:{},mk:V},xe.set(r,e),e}function D0(r,e,g){const A=e.U;if(!A[g]){const d0=e.progs[g];if(!r.getProgramParameter(d0,r.LINK_STATUS)){let T=g+": "+r.getProgramInfoLog(d0);for(const[$,J]of d0.__sh){const t0=r.getShaderInfoLog($);t0&&(T+=m0+t0+m0+J.split(m0).map((w0,$0)=>$0+1+": "+w0).join(m0).slice(0,2e4))}throw new Error("151 shader: "+T)}const C={},q=r.getProgramParameter(d0,r.ACTIVE_UNIFORMS);for(let T=0;T<q;T++){const $=r.getActiveUniform(d0,T);C[$.name.replace("[0]","")]=r.getUniformLocation(d0,$.name)}A[g]=C,r.useProgram(d0);const V={uN:0,uP:1,uA:2,uI:3,uJ:4,uC:5,uS:6};for(const T in V)C[T]&&r.uniform1i(C[T],V[T])}r.useProgram(e.progs[g])}const io=9.81,me=Math.PI*2,z0=(r,e,g)=>r<e?e:r>g?g:r,M0=(r,e,g)=>{const A=z0((g-r)/(e-r),0,1);return A*A*(3-2*A)};ve.add({num:151,name:"Harmonograph",fam:"Worlds",recipe:"A Victorian harmonograph: one pendulum rocks the paper, another swings the pen, and as both die down the pen lays down a looping figure. The ratio of the swings changes every mint. Drag a pendulum back and let go to set its swing, hold to slide a weight up or down its rod and change the figure live, or tap to lift the pen and tap again for a fresh sheet.",interactive:"Drag a pendulum (its bob below the table, or the platform) to pull it back and let go: that sets its swing and its phase. Tap to lift the pen; tap again to slide the drawing off and drop the pen on a fresh sheet. Hold to slide the nearest bob up its rod (move up or down while holding to place it): that pendulum's frequency changes live and the figure morphs. Left alone it draws each figure to its decayed centre, then starts a new sheet with new swings.",music:!0,gl:!0,fps:30,seed:0,make(r){const e=r.gl,g=r.size,A=co(e),d0=A.progs,C=A.U,q=A.hdr,V=(r.hash||"0x0").slice(2).padEnd(64,"0"),T=t=>parseInt(V.slice(t*8,t*8+8),16)>>>0,$=t=>{let o=t>>>0;return()=>{o=o+1831565813|0;let a=Math.imul(o^o>>>15,1|o);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}},J=$((T(0)^Math.imul(T(3),739982445)^354057277)>>>0),t0=(t,o)=>{let a=0;for(const c of o)a+=c;let s=J()*a,n=0;for(;s>=o[n]&&n<o.length-1;)s-=o[n++];return t[n]},w0=["1:1 near","2:3","3:4","1:3","Three-pendulum rotary"],$0=["Indigo","Sepia","Iron gall black","Viridian","Carmine"],lt=["Cream laid","White card","Black card"],ft=["Mahogany","Oak","Ebonised"],Vt=["Window","Lamp"],L=["Long swing","Even","Short swing"],y0=["Brass","Iron","Nickel"];let B=t0(w0,[28,27,25,10,10]),k=t0($0,[34,26,22,10,8]),I=t0(lt,[55,35,10]),U0=t0(ft,[55,33,12]),X0=t0(Vt,[64,36]),J0=t0(L,[28,50,22]),g0=t0(y0,[60,30,10]);r.home&&(B="2:3",k="Indigo",I="Cream laid",U0="Mahogany",X0="Window",J0="Long swing",g0="Brass"),I==="Black card"&&(k="White"),r.trait("Ratio",B),r.trait("Ink",k),r.trait("Paper",I),r.trait("Wood",U0),r.trait("Light",X0),r.trait("Friction",J0),r.trait("Bobs",g0);const dt=$((T(6)^Math.imul(T(7),739982445)^2052986128)>>>0),q0=t=>{let o=0;for(const n of t)o+=n;let a=dt()*o,s=0;for(;a>=t[s]&&s<t.length-1;)a-=t[s++];return s},kt=["Across the table","Over the sheet","Low at the edge"],F0=["Mid-drawing","First loops","Nearly still"];let T0=q0([58,28,14]),h0=q0([56,24,20]);T0===1&&h0===1&&(h0=0),r.home&&(T0=0,h0=0),r.trait("Camera",kt[T0]),r.trait("Stage",F0[h0]);const e0=w0.indexOf(B),_=e0===4,O=X0==="Lamp",ht=ft.indexOf(U0),we=lt.indexOf(I),p0=Array.from({length:16},()=>J()),Kt=[{E:[-.13,.31,-.25],TG:[.04,-.035,.02],fov:19},{E:[-.04,.47,-.08],TG:[.012,.05,.006],fov:8},{E:[-.27,.16,-.27],TG:[.06,-.01,.05],fov:17}][T0],jt=$((T(2)^Math.imul(T(4),1540483477)^1013904242)>>>0),O0=Kt.TG,K=Kt.E.slice();{const t=(jt()-.5)*.5,o=.88+.24*jt();if(T0===0&&!r.home){const a=K[0]-O0[0],s=K[2]-O0[2],n=Math.cos(t),c=Math.sin(t);K[0]=O0[0]+a*n-s*c,K[2]=O0[2]+a*c+s*n,K[1]=O0[1]+(K[1]-O0[1])*o}}let zt=jt();zt=r.home||zt<.45?0:zt<.8?1:2;const n0=(t,o)=>[t[0]-o[0],t[1]-o[1],t[2]-o[2]],tt=(t,o)=>t[0]*o[0]+t[1]*o[1]+t[2]*o[2],v0=t=>{const o=Math.hypot(t[0],t[1],t[2]);return[t[0]/o,t[1]/o,t[2]/o]},pt=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]],W0=v0(n0(O0,K)),vt=v0(pt([0,1,0],W0)),Mt=pt(W0,vt),xt=Math.tan(Kt.fov*Math.PI/180),ye=[0,.0503,0],Zt=tt(n0(ye,K),W0),Ue=.0034,ut=[0,0,0],W=(t,o)=>{const a=n0(t,K),s=tt(a,W0);return o[0]=.5+.5*tt(a,vt)/(s*xt),o[1]=.5+.5*tt(a,Mt)/(s*xt),o[2]=s,o},lo=t=>Ue*Math.abs(t-Zt)/t/(2*Zt*xt),ge=v0([-.42,.5,.76]),G0=$((T(5)^Math.imul(T(1),668265263)^354167853)>>>0)()<.5?[.24,.29,.2]:[-.22,.29,.21],fo=(t,o,a)=>{const s=(c,i,f)=>M0(c,i,f),n=(c,i)=>s(i-a,i+a,Math.abs(c));return s(-1.4-a,-1.4+a,t)*(1-s(.4-a,.4+a,t))*s(.12-a,.12+a,o)*(1-s(1.7-a,1.7+a,o))*n(t+.55,.03)*n(o-.65,.022)*n(o-1.2,.022)},ho=t=>{const o=O?v0(n0(G0,t)):ge;let a=1;if(!O){const s=(1.5-t[2])/o[2];a=fo(t[0]+o[0]*s,t[1]+o[1]*s,s*.0047+.02)}if(t[1]<-.02){const s=(-.017-t[1])/Math.max(o[1],.001),n=t[0]+o[0]*s,c=t[2]+o[2]*s,i=.006+s*.012;a*=1-M0(-.15-i,-.15+i,n)*(1-M0(.66-i,.66+i,n))*M0(-.095-i,-.095+i,c)*(1-M0(1.4-i,1.4+i,c))}return a},po=g0==="Iron"?2.1:2.4,Qt=(t,o,a,s,n)=>({px:t,py:-.08,pz:o,h:a,M:po,mr:.05,Lr:.62,mt:s,It:n,mt2:0,h2:.1,Iring:0,s:.25,th:[0,0],v:[0,0],ax:[!0,!0],c:0,K:1,I:1,drv:!1,tg:[0,0],smin:.08,w:[1,1],hist:new Float32Array(32),m:[0,1,0,0,0,0,0,0,0]}),v=Qt(0,0,.13,.32,.0013);v.Iring=6e-4;const u=Qt(.28,.04,.17,.11,9e-4),m=_?Qt(.13,.021,.17,.05,3e-4):null;_&&(u.ax=[!0,!1],m.ax=[!1,!0]),v.cap=.27,u.cap=.27,_&&(m.cap=.2);const vo=.032,xo=(t,o,a)=>{const s=Math.hypot(o,a);return s>t.cap?t.cap/s:1},M=_?[v,u,m]:[v,u],Te=(t,o)=>[io*(t.M*o+t.mr*t.Lr/2-t.mt*t.h-t.mt2*t.h2),t.M*o*o+t.mr*t.Lr*t.Lr/3+t.mt*t.h*t.h+t.It+t.mt2*t.h2*t.h2],Ft=(t,o)=>{const a=Te(t,o);return Math.sqrt(Math.max(a[0],1e-4)/a[1])},x0=(t,o)=>{t.s=o;const a=Te(t,o);t.K=a[0],t.I=a[1],t.w[0]=Math.sqrt(Math.max(t.K,1e-4)/t.I),t.w[1]=Math.sqrt(Math.max(t.K,1e-4)/(t.I+t.Iring))},uo=t=>{let o=.04,a=0;for(let s=.04;s<.3;s+=.002){const n=Ft(t,s);n>a&&(a=n,o=s)}t.smin=o+.008},bt=(t,o)=>{let a=t.smin,s=.6;if(o>=Ft(t,a))return a;if(o<=Ft(t,s))return s;for(let n=0;n<40;n++){const c=(a+s)/2;Ft(t,c)>o?a=c:s=c}return(a+s)/2},mt=()=>(p0[1]<.5?-1:1)*(.004+.011*p0[2]);e0===3&&(u.Lr=.16,u.mr=.02,v.mt2=4.6);for(const t of M)uo(t);if(e0===0)x0(v,.2+.08*p0[0]),x0(u,bt(u,v.w[0]*(1+mt()*2.2)));else if(e0===1||e0===2){const t=e0===1?1.5:1.3333333333333333,o=r.home?!1:p0[3]<.55,a=o?v:u,s=o?u:v;x0(a,(e0===1?.36:.3)+.08*p0[0]),x0(s,bt(s,a.w[0]*t*(1+mt())))}else e0===3?(x0(v,.6),x0(u,bt(u,v.w[0]*3*(1+mt())))):(x0(v,.33+.06*p0[0]),x0(u,bt(u,v.w[0]*1.5*(1+mt()))),x0(m,bt(m,v.w[0]*1.5*(1+mt()*.6+.004))));const Ee=[44,27,12][L.indexOf(J0)],Pe=[1,1.15,1.7][L.indexOf(J0)];for(const t of M)t.c=2*t.I/Ee;const bo=.004,Yt=.13,H0=.1297,wt=.009,et=.08,E0=.13,Re=(p0[4]-.5)*.3,Lt=Math.cos(Re),_t=Math.sin(Re),V0=g>600?1024:512,yt=V0/4,mo=8e-5*Pe,wo=.0054*Pe,U=[.28,.09,.04],j=ye.slice(),Ae=v0([U[0]-j[0],0,U[2]-j[2]]),ke=Math.cos(62*Math.PI/180),yo=Math.sin(62*Math.PI/180),o0=[Ae[0]*ke,yo,Ae[2]*ke],Bt=.03,St=.014,L0=[j[0]+o0[0]*Bt,j[1]+o0[1]*Bt,j[2]+o0[2]*Bt],S=[L0[0]+o0[0]*St,L0[1]+o0[1]*St,L0[2]+o0[2]*St],c0=[U[0]+(S[0]-U[0])*.2,U[1]+(S[1]-U[1])*.2,U[2]+(S[2]-U[2])*.2],Do=_?[m.px,0,m.pz]:null,Uo=_?(()=>{const t=(m.px-U[0])/(S[0]-U[0]);return[m.px,U[1]+(S[1]-U[1])*t-.003,U[2]+(S[2]-U[2])*t]})():null;_&&(m.h=Uo[1]-m.py);const G=new Float32Array(64*4),h=(t,o,a,s,n)=>{G[t*4]=o,G[t*4+1]=a,G[t*4+2]=s,G[t*4+3]=n},$t=[[.7,.62,.46],[.78,.77,.74],[.024,.023,.026]][we],Jt={Indigo:[1.25,.95,.42],Sepia:[.55,.85,1.3],"Iron gall black":[1.1,1.06,.95],Viridian:[1.3,.42,.85],Carmine:[.28,1.3,.95],White:[0,0,0]}[k],Ct={Brass:[.62,.4,.15,1],Iron:[.16,.16,.17,.8],Nickel:[.78,.76,.72,1]}[g0],te=[[.13,.042,.018],[.26,.16,.075],[.02,.017,.015]][ht].map(t=>t*(O?.15:1)),ee=O?[.8,.04,.25]:[[.65,.12,.6],[.75,.08,.35],[.85,.05,.2]][ht],ze=t=>{h(0,K[0],K[1],K[2],xt),h(1,W0[0],W0[1],W0[2],g),h(2,vt[0],vt[1],vt[2],Ue),h(3,Mt[0],Mt[1],Mt[2],Zt);{const o=O?v0([G0[0],G0[1]-.05,G0[2]]):ge;h(4,o[0],o[1],o[2],O?1:0)}O?h(5,.36,.2,.088,.0047):h(5,2.22,1.854,1.302,.0047),h(6,G0[0],G0[1],G0[2],q?1:0),O?h(7,.009,.01,.024,0):h(7,.16,.178,.238,0),h(8,ht,(T(5)&65535)/65536*7,ht===1?.55:1,ht===2?0:2),h(9,t,0,0,0),h(10,$t[0],$t[1],$t[2],we),h(11,Jt[0],Jt[1],Jt[2],k==="White"?1:0),h(12,Ct[0],Ct[1],Ct[2],Ct[3]*(O?.3:1)),h(13,u.px,u.pz,_?m.px:-9,_?m.pz:-9),h(14,te[0],te[1],te[2],0),h(47,ee[0],ee[1],ee[2],O?.25:.8)},It=()=>{e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0)},ot=(t,o,a,s,n,c,i)=>{const f=e.createTexture();return e.bindTexture(e.TEXTURE_2D,f),e.texStorage2D(e.TEXTURE_2D,i||1,a,t,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),f};It(),e.clearColor(0,0,0,0);const at=t=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),e.clear(e.COLOR_BUFFER_BIT),o},u0=q?[e.RGBA16F,e.RGBA,e.HALF_FLOAT]:[e.RGBA8,e.RGBA,e.UNSIGNED_BYTE],rt=A.r16?[e.R16F,e.RED,e.HALF_FLOAT]:u0,oe=A.r16||q?1:6,Me=ot(g,g,u0[0],u0[1],u0[2],e.LINEAR),go=at(Me),Fe=ot(g,g,u0[0],u0[1],u0[2],e.LINEAR),To=at(Fe),Le=ot(V0,V0,rt[0],rt[1],rt[2],e.LINEAR),_e=at(Le),Be=ot(yt,yt,rt[0],rt[1],rt[2],e.LINEAR),Se=at(Be),Ce=ot(g,g,u0[0],u0[1],u0[2],e.NEAREST),Eo=at(Ce),st=g>600?1024:512,ae=ot(st,st,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,Math.log2(st)+1),Po=at(ae);e.bindFramebuffer(e.FRAMEBUFFER,null),e.flush();const Ro=g>600?28:20;let _0=8192,a0=new Float32Array(_0*6),r0=0;const Ao=(t,o,a,s,n,c)=>{if(r0>=_0){const f=new Float32Array(_0*12);f.set(a0),a0=f,_0*=2}const i=r0*6;r0++,a0[i]=t,a0[i+1]=o,a0[i+2]=a,a0[i+3]=s,a0[i+4]=n,a0[i+5]=c},Ie=()=>{r0&&(It(),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),D0(e,A,"seg"),e.bindVertexArray(A.vao),e.bindBuffer(e.ARRAY_BUFFER,A.buf),e.bufferData(e.ARRAY_BUFFER,a0.subarray(0,r0*6),e.DYNAMIC_DRAW),e.bindFramebuffer(e.FRAMEBUFFER,_e),e.viewport(0,0,V0,V0),e.uniform4f(C.seg.uG,Math.pow(.45/V0,2),1/oe,0,0),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,r0),e.bindFramebuffer(e.FRAMEBUFFER,Se),e.viewport(0,0,yt,yt),e.uniform4f(C.seg.uG,Math.pow(.65/yt,2),1/oe,0,0),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,r0),e.bindVertexArray(null),e.disable(e.BLEND),r0=0)},Nt=(t,o)=>{const a=Math.sin(t.th[0]),s=Math.cos(t.th[0]),n=Math.sin(t.th[1]),c=Math.cos(t.th[1]);return o[0]=s,o[1]=-a,o[2]=0,o[3]=a*c,o[4]=s*c,o[5]=n,o[6]=-a*n,o[7]=-s*n,o[8]=c,o},d={lift:0,liftT:0,sheetT:0,inked:!1,ink:1,slide:0,sliding:!1,pu:0,pv:0,have:!1,speed:0,rel:0},B0=[0,0,0],Z=[0,0,0],re=()=>{Nt(v,v.m),Nt(u,u.m),_?(Nt(m,m.m),Z[0]=u.h*u.m[3],Z[2]=m.h*m.m[5],Z[1]=u.h*(u.m[4]-1)):(Z[0]=u.h*u.m[3],Z[1]=u.h*(u.m[4]-1),Z[2]=u.h*u.m[5]);const t=v.m,o=j[0]+Z[0],a=j[2]+Z[2],s=(a-v.pz-t[5]*Yt)/t[8],n=(o-v.px-t[3]*Yt-t[6]*s)/t[0],c=v.py+t[1]*n+t[4]*Yt+t[7]*s;B0[0]=o,B0[1]=c+3e-4+d.lift*.008,B0[2]=a,d.pu=(Lt*n+_t*s)/E0+.5,d.pv=(-_t*n+Lt*s)/E0+.5},nt=1/240;let K0=(T(1)^99537233)>>>0;const z=()=>{K0=K0+1831565813|0;let t=Math.imul(K0^K0>>>15,1|K0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},i0={creak:0,creakF:90,creakA:0},Ne=()=>{const t=d.lift<.02;let o=0,a=0;if(t){const y=u.h*u.v[0],x=_?m.h*m.v[1]:u.h*u.v[1];o=-.12*(y-v.h*v.v[0]),a=-.12*(x-v.h*v.v[1])}for(let y=0;y<M.length;y++){const x=M[y];for(let b=0;b<2;b++){if(!x.ax[b])continue;const R=x.I+(b===1?x.Iring:0),Q=x.th[b];let b0=-x.K*Math.sin(Q)-x.c*x.v[b];for(let F=0;F<M.length;F++)F!==y&&M[F].ax[b]&&(b0+=bo*x.K*(M[F].th[b]-Q));const C0=b===0?o:a;if(x===v?b0-=C0*x.h:(x===u&&(!_||b===0)||x===m&&b===1)&&(b0+=C0*x.h),x.drv){const F=30*x.K;b0+=F*(x.tg[b]-Q)-2*Math.sqrt(F*R)*x.v[b]}const R0=x.v[b];x.v[b]+=b0/R*nt,x.th[b]+=x.v[b]*nt,R0*x.v[b]<0&&Math.abs(Q)>.12&&z()<.12&&i0.creak<=0&&(i0.creak=.11,i0.creakF=70+50*z(),i0.creakA=Math.min(1,Math.abs(Q)*3))}x.hist.copyWithin(2,0,30),x.hist[0]=x.th[0],x.hist[1]=x.th[1]}const s=d.pu,n=d.pv;re();const c=(d.pu-s)*E0,i=(d.pv-n)*E0,w=Math.hypot(c,i)/nt;if(d.speed+=(w-d.speed)*.05,t&&d.have&&d.pu>.01&&d.pu<.99&&d.pv>.01&&d.pv<.99){const y=mo*(1+1.5*Math.exp(-w/.012))*(.92+.12*d.ink),x=1-.35*M0(.14,.4,w)*z();Ao(s,n,d.pu,d.pv,y/E0,wo*nt*d.ink*x),d.sheetT+=nt,d.inked=!0,d.ink=.68+.32*Math.exp(-d.sheetT/45)}d.have=!0},De=()=>{let t=0;for(const o of M)for(let a=0;a<2;a++)o.ax[a]&&(t+=o.h*Math.hypot(o.th[a],o.v[a]/o.w[a]));return t};let Ut=!0;const Xe=r.home?23:h0===1?5+3*p0[6]:h0===2?150:15+16*p0[6],qe=()=>{const t=Ut?zt:z()<.45?0:z()<.6?1:2,o=Ut?Xe:0;Ut=!1;const a=Math.min(.0505,(.041+.008*z())*1.2),s=.36+.26*z(),n=(f,w)=>Math.asin(z0(f/w,-.5,.5)),c=()=>z()*me,i=[];if(_){const f=z()<.5?1:-1;i.push([n(a*s,v.h),0,n(a*s*(.8+.2*z()),v.h),f*Math.PI/2]),i.push([n(a*(1-s),u.h),c(),0,0]),i.push([0,0,n(a*(1-s)*(.85+.15*z()),m.h),c()])}else if(e0===0){const f=z()<.5?1:-1;i.push([n(a*s,v.h),0,n(a*s*(.75+.25*z()),v.h),f*Math.PI/2]);{const w=c();i.push([n(a*(1-s)*(.2+.5*z()),u.h),w,n(a*(1-s),u.h),w+(z()-.5)*.8])}}else if(t===0){const f=.72+.22*z(),w=.72+.22*z();i.push([n(a*f,v.h),c(),n(a*(1-w),v.h),c()]),i.push([n(a*(1-f),u.h),c(),n(a*w,u.h),c()])}else if(t===1){const f=.5+.2*z(),w=z()<.5?1:-1,y=c(),x=c(),b=z()*.6;i.push([n(a*f,v.h),y,n(a*f*(.85+.15*z()),v.h),y+w*Math.PI/2]),i.push([n(a*(1-f)*Math.cos(b),u.h),x,n(a*(1-f)*Math.sin(b)+.002,u.h),x])}else{const f=.42+.16*z();i.push([n(a*f,v.h),c(),n(a*f*(.6+.4*z()),v.h),c()]),i.push([n(a*(1-f)*(.6+.4*z()),u.h),c(),n(a*(1-f),u.h),c()])}for(let f=0;f<M.length;f++){const w=M[f],y=i[f],x=w.w[1]-w.w[0];let b=0;for(let Q=o;Q<o+60;Q+=.5){const b0=y[3]-y[1]+x*Q,C0=y[0]*y[0],R0=y[2]*y[2],F=.5*(C0-R0),A0=y[0]*y[2]*Math.cos(b0);b=Math.max(b,Math.exp(-Q/Ee)*Math.sqrt(.5*(C0+R0)+Math.sqrt(F*F+A0*A0)))}const R=b>w.cap?w.cap/b:1;y[0]*=R,y[2]*=R}return i},Oe=t=>{for(let o=0;o<M.length;o++){const a=M[o],s=t[o];for(let n=0;n<2;n++){if(!a.ax[n]){a.th[n]=0,a.v[n]=0;continue}const c=s[n*2],i=s[n*2+1];a.th[n]=c*Math.cos(i),a.v[n]=-c*a.w[n]*Math.sin(i)}a.drv=!1}},Dt=r.hash+(r.home?" home":""),s0=N0.get(Dt);if(s0){N0.delete(Dt),N0.set(Dt,s0),r0=s0.nseg,r0>_0&&(_0=s0.segCap,a0=new Float32Array(_0*6)),a0.set(s0.segs),M.forEach((t,o)=>{const a=s0.p[o];t.th[0]=a.th[0],t.th[1]=a.th[1],t.v[0]=a.v[0],t.v[1]=a.v[1],t.hist.set(a.hist);for(let s=0;s<9;s++)t.m[s]=a.m[s];t.drv=a.drv}),Object.assign(d,s0.st),Object.assign(i0,s0.au);for(let t=0;t<3;t++)B0[t]=s0.nib[t],Z[t]=s0.dpen[t];K0=s0.srS,Ut=s0.firstSwing}else{Oe(qe()),re(),d.have=!0;for(let t=0,o=Math.round(Xe*240);t<o&&(Ne(),!(h0===2&&t%240===239&&De()<.006+.003*p0[6]));t++);for(const t of M)for(let o=0;o<16;o++)t.hist[o*2]=t.th[0],t.hist[o*2+1]=t.th[1];for(N0.set(Dt,{nseg:r0,segCap:_0,segs:a0.slice(0,r0*6),p:M.map(t=>({th:t.th.slice(),v:t.v.slice(),hist:t.hist.slice(),m:t.m.slice(),drv:t.drv})),st:Object.assign({},d),au:Object.assign({},i0),nib:B0.slice(),dpen:Z.slice(),srS:K0,firstSwing:Ut});N0.size>Ye;)N0.delete(N0.keys().next().value)}It(),e.disable(e.BLEND),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,A.tn),e.bindVertexArray(A.evao),e.viewport(0,0,g,g),ze(Ro),e.bindFramebuffer(e.FRAMEBUFFER,go),D0(e,A,"table"),e.uniform4fv(C.table.U,G),e.drawArrays(e.TRIANGLES,0,3);{let t=1,o=1,a=0,s=0;for(const i of[U,S,j,L0,c0])W(i,ut),t=Math.min(t,ut[0]),o=Math.min(o,ut[1]),a=Math.max(a,ut[0]),s=Math.max(s,ut[1]);h(16,U[0],U[1],U[2],.0075),h(17,S[0],S[1],S[2],.0032),h(18,j[0],j[1],j[2],Bt),h(19,o0[0],o0[1],o0[2],St),h(20,c0[0],c0[1],c0[2],.0095),h(21,t-.06,o-.06,a+.06,s+.06),h(22,.013,3,0,0);const n=v0(n0(S,U));h(26,c0[0]-n[0]*.013,c0[1]-n[1]*.013,c0[2]-n[2]*.013,.0095),h(27,c0[0]+n[0]*.013,c0[1]+n[1]*.013,c0[2]+n[2]*.013,3),h(28,L0[0],L0[1],L0[2],.0052),h(29,S[0]+o0[0]*.002,S[1]+o0[1]*.002,S[2]+o0[2]*.002,4);const c=v0(pt(n,[0,1,0]));h(24,U[0]-c[0]*.011,U[1]-c[1]*.011,U[2]-c[2]*.011,.0068),h(25,U[0]+c[0]*.011,U[1]+c[1]*.011,U[2]+c[2]*.011,1),e.bindFramebuffer(e.FRAMEBUFFER,To),D0(e,A,"arm"),e.uniform4fv(C.arm.U,G),e.drawArrays(e.TRIANGLES,0,3)}h(9,0,0,0,st),h(20,Lt,_t,E0/2,et),e.bindFramebuffer(e.FRAMEBUFFER,Po),e.viewport(0,0,st,st),D0(e,A,"surf"),e.uniform4fv(C.surf.U,G),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,ae),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.viewport(0,0,g,g);const ko=()=>{e.clearColor(0,0,0,0),e.bindFramebuffer(e.FRAMEBUFFER,_e),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,Se),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null)};Ie();const E={st:"draw",t:0,idle:99,sw:null,after:"drop",dropAt:0},l={on:!1,mode:"",t0:0,x0:0,y0:0,p:null,kind:"",th0:[0,0],J:null,s0:0,sdir:-1,lx:0,ly:0},Xt=(t,o,a,s,n)=>{const c=Math.sin(a),i=Math.cos(a),f=Math.sin(s),w=Math.cos(s),y=[c*w,i*w,f],x=o==="bob"?-t.s:t===u?.09:t.h;let b=[t.px+y[0]*x,t.py+y[1]*x,t.pz+y[2]*x];return o==="top"&&t===u&&(b=[(U[0]+S[0])/2+t.h*c*w,.09,(U[2]+S[2])/2+t.h*f]),W(b,n)},zo=t=>{const o=W([-.2,0,We],[0,0,0]),a=W([.4,0,We],[0,0,0]);return o[1]+(a[1]-o[1])*(t-o[0])/(a[0]-o[0])},We=-.095,Mo=(t,o)=>{let a=null,s=1e9;const n=[0,0,0];for(const c of M){if(Xt(c,"bob",c.th[0],c.th[1],n),n[1]<zo(n[0])-.01){const f=Math.hypot(n[0]-t,n[1]-o)*.8;f<s&&(s=f,a=[c,"bob"])}Xt(c,"top",c.th[0],c.th[1],n);const i=Math.hypot(n[0]-t,n[1]-o)*(c===v?1:1.3);i<s&&(s=i,a=[c,"top"])}return a},Fo=(t,o)=>{const a=[0,0,0],s=[0,0,0],n=.01,c=[0,0,0,0];for(let i=0;i<2;i++){if(!t.ax[i])continue;const f=t.th.slice(),w=t.th.slice();f[i]-=n,w[i]+=n,Xt(t,o,f[0],f[1],a),Xt(t,o,w[0],w[1],s),c[i]=(s[0]-a[0])/(2*n),c[2+i]=(s[1]-a[1])/(2*n)}return c},Lo=(t,o,a)=>{const n=t[0]*t[0]+t[2]*t[2]+1e-4,c=t[0]*t[1]+t[2]*t[3],i=t[1]*t[1]+t[3]*t[3]+1e-4,f=t[0]*o+t[2]*a,w=t[1]*o+t[3]*a,y=n*i-c*c;return[(i*f-c*w)/y,(n*w-c*f)/y]},Ge=()=>{E.idle=0,d.liftT===0?(d.liftT=1,E.st="up",E.t=0):E.st!=="slide"&&E.st!=="set"&&(E.st=d.inked?"slide":"set",E.t=0)},P0=t=>{E.st=t,E.t=0},_o=t=>{switch(E.t+=t,E.st){case"draw":d.liftT=0,(De()<.0035||d.sheetT>170)&&P0("lift");break;case"lift":d.liftT=1,E.t>.7&&P0("slide");break;case"up":d.liftT=1,E.idle>7&&P0(d.inked?"slide":"set");break;case"slide":{d.liftT=1,d.sliding=!0,d.slide=M0(0,1.4,E.t),E.t>1.4&&(d.sliding=!1,d.slide=0,ko(),d.inked=!1,d.sheetT=0,d.ink=1,P0("set"));break}case"set":{if(d.liftT=1,!E.sw){E.sw=qe();for(const a of M)a.drv=!0}const o=M0(0,1,E.t);for(let a=0;a<M.length;a++){const s=M[a],n=E.sw[a];for(let c=0;c<2;c++)s.tg[c]=s.ax[c]?n[c*2]*Math.cos(n[c*2+1])*o:0}E.t>1.25&&(Oe(E.sw),E.sw=null,P0("drop"));break}case"drop":d.liftT=0,E.t>.3&&d.lift<.02&&P0("draw");break;case"held":d.liftT=1;break;case"afterdrag":d.liftT=1,E.t>.45&&P0("drop");break}},Bo=t=>{const o=r.input,a=o.taps?o.taps():[];let s=!1;if(o.inside&&o.down){const n=o.x,c=1-o.y;if(E.idle=0,l.on)l.t0+=t;else{l.on=!0,l.mode="pending",l.t0=0,l.x0=n,l.y0=c,l.lx=n,l.ly=c;const f=Mo(n,c);l.p=f?f[0]:v,l.kind=f?f[1]:"top"}const i=Math.hypot(n-l.x0,c-l.y0)>.014;if(l.mode==="pending"&&(i?(l.mode="drag",l.th0=l.p.th.slice(),l.J=Fo(l.p,l.kind),l.p.drv=!0,E.st!=="slide"&&(E.prev=d.liftT,P0("held"))):l.t0>.32&&(l.mode="hold",l.s0=l.p.s,l.y0=c,l.sdir=-1)),l.mode==="drag"){const f=Lo(l.J,n-l.x0,c-l.y0),w=l.p.ax[0]?z0(l.th0[0]+f[0],-.42,.42):0,y=l.p.ax[1]?z0(l.th0[1]+f[1],-.42,.42):0,x=xo(l.p,w,y);l.p.tg[0]=w*x,l.p.tg[1]=y*x}else if(l.mode==="hold"){let f=l.s0-(c-l.y0)*.9;Math.abs(c-l.y0)<.02?(l.s0+=l.sdir*.05*t,l.s0<l.p.smin+.005&&(l.sdir=1),l.s0>.59&&(l.sdir=-1),f=l.s0):(l.s0=z0(f,l.p.smin,.6),l.y0=c),x0(l.p,z0(f,l.p.smin,.6))}l.lx=n,l.ly=c}else l.on&&(s=!0,l.mode==="pending"?Ge():l.mode==="drag"&&(l.p.drv=!1,P0(E.prev===1&&d.inked?"up":"afterdrag"),E.st==="up"&&(E.idle=0)),l.on=!1,l.mode="");!s&&!l.on&&a.length&&Ge(),E.idle+=t},j0=16e3,He=new Float32Array(j0);let se=0,qt=0,ne=0,ce=0,ie=0,gt=0,le=0,Ve=0,Z0=19088743;const Tt=()=>(Z0^=Z0<<13,Z0^=Z0>>>17,Z0^=Z0<<5,(Z0>>>0)/4294967296*2-1),So=t=>{if(!r.sound||!r.sound.on)return;const o=Math.min(4e3,Math.round(t*j0)),s=(d.lift<.02?1:0)*Math.pow(z0(d.speed/.28,0,1),.8)*.5;for(let n=0;n<o;n++){const c=Tt();qt+=(c-qt)*.55,ne+=(qt-ne)*.18;let i=(qt-ne)*s*(.6+.4*Math.abs(ce));ce+=(Tt()-ce)*.002,s>.02&&Tt()>.997-s*.004&&(i+=Tt()*s*1.5),i0.creak>0&&(ie+=i0.creakF/j0,ie>1&&(ie-=1,i+=.25*i0.creakA*(i0.creak/.11)),i0.creak-=1/j0),se++,se>=j0&&(se=0,Ve^=1,gt=1,le=0),gt>.001&&(le+=(Ve?2300:1850)/j0,i+=Math.sin(le*me)*gt*.07+Tt()*gt*.02,gt*=.9955),He[n]=i}r.sound.pcm(He.subarray(0,o),j0,{vel:.7})},N=[0,0,0],Q0=[0,0,0],S0=[0,0,0],fe=[0,0,0],de=[0,0,0],he=[0,0,0],Co=(t,o,a)=>{const s=Math.cos(o),n=Math.sin(o),c=pt(t,a),i=tt(t,a);return[a[0]*s+c[0]*n+t[0]*i*(1-s),a[1]*s+c[1]*n+t[1]*i*(1-s),a[2]*s+c[2]*n+t[2]*i*(1-s)]};let pe=0;const Ke=()=>{ze(0),h(9,0,pe,6,0);const t=[U[0]+Z[0],U[1]+Z[1],U[2]+Z[2]],o=n0(j,U),a=n0(B0,t),s=pt(o,a),n=Math.hypot(s[0],s[1],s[2]),c=Math.atan2(n,tt(o,a)),i=n>1e-12?[s[0]/n,s[1]/n,s[2]/n]:[0,1,0],f=P=>{const p=Co(i,c,n0(P,U));return[t[0]+p[0],t[1]+p[1],t[2]+p[2]]},w=f(S),y=f(L0),x=f(c0),b=v0(n0(w,t));W(U,N),W(j,Q0),W(t,S0),W(B0,fe);{const P=Q0[0]-N[0],p=Q0[1]-N[1],Y=fe[0]-S0[0],l0=fe[1]-S0[1],k0=P*P+p*p,D=(Y*P+l0*p)/k0,X=(l0*P-Y*p)/k0,H=S0[0]-(D*N[0]-X*N[1]),Et=S0[1]-(D*N[1]+X*N[0]),Pt=D*D+X*X,Rt=D/Pt,At=-X/Pt;h(16,Rt,At,-(Rt*H-At*Et),-(Rt*Et+At*H))}const R=v.m;h(17,R[0],R[1],R[2],v.px),h(18,R[3],R[4],R[5],v.py),h(19,R[6],R[7],R[8],v.pz),h(20,Lt,_t,E0/2,et);const Q=d.sliding?d.slide*.34:0,b0=-Q*.95,C0=Q*.3;h(21,H0,wt,b0,C0);{let P=1,p=1,Y=0,l0=0;const k0=(D,X,H)=>{W([v.px+R[0]*D+R[3]*X+R[6]*H,v.py+R[1]*D+R[4]*X+R[7]*H,v.pz+R[2]*D+R[5]*X+R[8]*H],N),P=Math.min(P,N[0]),p=Math.min(p,N[1]),Y=Math.max(Y,N[0]),l0=Math.max(l0,N[1])};for(const D of[-1,1])for(const X of[-1,1])k0(D*et,H0,X*et),k0(D*et,H0-wt,X*et),d.sliding&&k0(b0+D*E0*.72,H0,C0+X*E0*.72);h(22,P-.03,p-.03,Y+.03,l0+.03)}h(24,-.13,-.12,.42,.3);{const P=O?.3:1;g0==="Nickel"?h(46,.62*P,.62*P,.64*P,_?3:2):h(46,.66*P,.47*P,.22*P,_?3:2)}const R0=[u.px,u.py,u.pz],F=n0(t,R0),A0=Math.hypot(F[0],F[1],F[2]),Ot=[R0[0]+F[0]/A0*.03,R0[1]+F[1]/A0*.03,R0[2]+F[2]/A0*.03],Wt=[t[0]-F[0]/A0*.006,t[1]-F[1]/A0*.006,t[2]-F[2]/A0*.006];h(62,Ot[0],Ot[1],Ot[2],.0075),h(63,Wt[0],Wt[1],Wt[2],vo);let Gt=0;const I0=(P,p,Y,l0)=>{h(48+Gt*2,P[0],P[1],P[2],Y),h(49+Gt*2,p[0],p[1],p[2],l0),Gt++};if(_){Nt(m,m.m);const P=[m.px+m.h*m.m[3],m.py+m.h*m.m[4],m.pz+m.h*m.m[5]],p=[m.px+.03*m.m[3],m.py+.03*m.m[4],m.pz+.03*m.m[5]];h(25,p[0],p[1],p[2],.0055),h(26,P[0],P[1],P[2],1),I0(p,P,.0055,.0055)}else h(26,0,0,0,0);I0(Ot,Wt,.0075,.0075),I0([t[0]-b[0]*.008,t[1],t[2]-b[2]*.008],[t[0]+b[0]*.008,t[1],t[2]+b[2]*.008],.0085,.0085),I0(t,w,.0032,.0032),I0([x[0]-b[0]*.013,x[1]-b[1]*.013,x[2]-b[2]*.013],[x[0]+b[0]*.013,x[1]+b[1]*.013,x[2]+b[2]*.013],.0095,.0095),I0(y,w,.0052,.0052),I0(y,B0,.004,4e-4),I0([v.px+R[3]*.03,v.py+R[4]*.03,v.pz+R[5]*.03],[v.px+R[3]*(H0-wt),v.py+R[4]*(H0-wt),v.pz+R[5]*(H0-wt)],.0055,.0055),h(23,g>600?8:6,M.length,Gt,d.sliding?1:0),h(27,V0,oe,O?1.15:.86,pe%977);for(let P=0;P<M.length;P++){const p=M[P],Y=28+6*P;W([p.px,p.py,p.pz],N),W([p.px,p.py-p.s,p.pz],Q0);const l0=Q0[2],k0=1/(2*l0*xt);W([p.px,p.py-p.s+.03,p.pz],S0);const D=Math.hypot(S0[0]-Q0[0],S0[1]-Q0[1]);h(Y,N[0],N[1],.0034*k0,lo(l0));const X=v0(n0([p.px,p.py-p.s,p.pz],K));h(Y+1,.034*k0,D,Math.abs(X[1])*.98,ho([p.px,p.py-p.s,p.pz]));for(let H=0;H<4;H++){const Et=p.hist[H*4],Pt=p.hist[H*4+1],Rt=Math.sin(Et),At=Math.cos(Et),Io=Math.sin(Pt),je=Math.cos(Pt),ct=[Rt*je,At*je,Io];W([p.px-ct[0]*p.Lr,p.py-ct[1]*p.Lr,p.pz-ct[2]*p.Lr],de),W([p.px-ct[0]*p.s,p.py-ct[1]*p.s,p.pz-ct[2]*p.s],he);const Ze=Y+2+(H>>1),Qe=Y+4+(H>>1),Ht=(H&1)*2;G[Ze*4+Ht]=de[0],G[Ze*4+Ht+1]=de[1],G[Qe*4+Ht]=he[0],G[Qe*4+Ht+1]=he[1]}}It(),e.disable(e.BLEND),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,A.tn),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Me),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Fe),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Le),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,Be),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,ae),e.bindVertexArray(A.evao),e.bindFramebuffer(e.FRAMEBUFFER,Eo),e.viewport(0,0,g,g),D0(e,A,"A"),e.uniform4fv(C.A.U,G),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.blendEquation(e.FUNC_ADD),D0(e,A,"B"),e.uniform4fv(C.B.U,G),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,Ce),D0(e,A,"C"),e.uniform4fv(C.C.U,G),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),pe++};return re(),Ke(),(t,o)=>{o=z0(o||0,0,.25),Bo(o),_o(o);const a=Math.min(60,Math.round(o*240));for(let s=0;s<a;s++){const n=d.liftT,c=1-Math.exp(-nt*9);d.lift+=(n-d.lift)*c,Ne()}Ie(),So(o),Ke()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
