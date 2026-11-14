// Harmonograph: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/151.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(le){le&&function(){"use strict";const fe=new WeakMap,h0=`
`,n0="#version 300 es"+h0+"// h151 r12"+h0+"precision highp float;"+h0+"precision highp int;"+h0+"precision highp sampler2D;"+h0,et=n0+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",G0=`
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
`,Ke=n0+G0+`
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
}`,Ze=n0+G0+`
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
}`,de=`
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
`,he=`
uniform sampler2D uP;
uniform sampler2D uA;
uniform sampler2D uI;
uniform sampler2D uJ;
`+de+`
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
`,je=n0+G0+he+`
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
}`,Qe=n0+G0+he+`
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
}`,Ye=n0+G0+`
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
}`,$e=n0+G0+de+`
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
}`,Je=n0+`
uniform vec4 U[64];
void main(){ vec2 c = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1)); gl_Position = vec4(mix(U[22].xy, U[22].zw, c) * 2.0 - 1.0, 0.0, 1.0); }`,to=n0+`
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
}`,eo=n0+`
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
}`;function oo(r){let e=fe.get(r);if(e)return e;r.getExtension("EXT_color_buffer_float"),r.getExtension("EXT_color_buffer_half_float");const R=[],E={},k=(S,R0)=>{const C=r.createShader(r.VERTEX_SHADER);r.shaderSource(C,S),r.compileShader(C);const F=r.createShader(r.FRAGMENT_SHADER);r.shaderSource(F,R0),r.compileShader(F);const D=r.createProgram();return r.attachShader(D,C),r.attachShader(D,F),r.linkProgram(D),R.push([C,S],[F,R0]),D};E.table=k(et,Ke),E.arm=k(et,Ze),E.surf=k(et,Ye),E.A=k(et,je),E.B=k(Je,Qe),E.C=k(et,$e),E.seg=k(to,eo);const z=256,P0=new Uint8Array(z*z*4);let $=354224763;const M=()=>($^=$<<13,$^=$>>>17,$^=$<<5,($>>>0)/4294967296),N=(S,R0)=>{const C=new Float32Array(S*S);for(let F=0;F<S*S;F++)C[F]=M();for(let F=0;F<z;F++){const D=F*S/z,p0=D|0,B0=D-p0,V0=B0*B0*(3-2*B0),v0=p0*S,nt=(p0+1)%S*S;for(let S0=0;S0<z;S0++){const gt=S0*S/z,A0=gt|0,u0=gt-A0,s0=u0*u0*(3-2*u0),J=(A0+1)%S,_=C[v0+A0]+(C[v0+J]-C[v0+A0])*s0,O=C[nt+A0]+(C[nt+J]-C[nt+A0])*s0;P0[(F*z+S0)*4+R0]=Math.round((_+(O-_)*V0)*255)}}};N(8,0),N(16,1),N(32,2),N(64,3),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_ALIGNMENT,1);const _0=r.createTexture();r.bindTexture(r.TEXTURE_2D,_0),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,z,z,0,r.RGBA,r.UNSIGNED_BYTE,P0),r.generateMipmap(r.TEXTURE_2D),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.REPEAT),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.REPEAT);const K=(S,R0,C)=>{const F=r.createTexture();r.bindTexture(r.TEXTURE_2D,F),r.texImage2D(r.TEXTURE_2D,0,S,4,4,0,R0,C,null);const D=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,D),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,F,0);const p0=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteFramebuffer(D),r.deleteTexture(F),p0},H0=K(r.RGBA16F,r.RGBA,r.HALF_FLOAT),ot=K(r.R16F,r.RED,r.HALF_FLOAT),at=r.createVertexArray(),rt=r.createBuffer();r.bindVertexArray(at),r.bindBuffer(r.ARRAY_BUFFER,rt),r.enableVertexAttribArray(0),r.vertexAttribPointer(0,4,r.FLOAT,!1,24,0),r.vertexAttribDivisor(0,1),r.enableVertexAttribArray(1),r.vertexAttribPointer(1,2,r.FLOAT,!1,24,16),r.vertexAttribDivisor(1,1),r.bindVertexArray(null);const Dt=r.createVertexArray();return e={progs:E,sh:R,tn:_0,hdr:H0,r16:ot,vao:at,evao:Dt,buf:rt,U:null,mk:k},fe.set(r,e),e}function ao(r,e){const R=e.U||{};for(const E in e.progs){if(R[E])continue;const k=e.progs[E];if(!r.getProgramParameter(k,r.LINK_STATUS)){let M=E+": "+r.getProgramInfoLog(k);for(const[N,_0]of e.sh){const K=r.getShaderInfoLog(N);K&&(M+=h0+K+h0+_0.split(h0).map((H0,ot)=>ot+1+": "+H0).join(h0).slice(0,2e4))}throw new Error("151 shader: "+M)}const z={},P0=r.getProgramParameter(k,r.ACTIVE_UNIFORMS);for(let M=0;M<P0;M++){const N=r.getActiveUniform(k,M);z[N.name.replace("[0]","")]=r.getUniformLocation(k,N.name)}R[E]=z,r.useProgram(k);const $={uN:0,uP:1,uA:2,uI:3,uJ:4,uC:5,uS:6};for(const M in $)z[M]&&r.uniform1i(z[M],$[M])}e.U=R}const ro=9.81,pe=Math.PI*2,T0=(r,e,R)=>r<e?e:r>R?R:r,E0=(r,e,R)=>{const E=T0((R-r)/(e-r),0,1);return E*E*(3-2*E)};le.add({num:151,name:"Harmonograph",fam:"Worlds",recipe:"A Victorian harmonograph: one pendulum rocks the paper, another swings the pen, and as both die down the pen lays down a looping figure. The ratio of the swings changes every mint. Drag a pendulum back and let go to set its swing, hold to slide a weight up or down its rod and change the figure live, or tap to lift the pen and tap again for a fresh sheet.",interactive:"Drag a pendulum (its bob below the table, or the platform) to pull it back and let go: that sets its swing and its phase. Tap to lift the pen; tap again to slide the drawing off and drop the pen on a fresh sheet. Hold to slide the nearest bob up its rod (move up or down while holding to place it): that pendulum's frequency changes live and the figure morphs. Left alone it draws each figure to its decayed centre, then starts a new sheet with new swings.",music:!0,gl:!0,fps:30,seed:0,make(r){const e=r.gl,R=r.size,E=oo(e);ao(e,E);const k=E.progs,z=E.U,P0=E.hdr,$=(r.hash||"0x0").slice(2).padEnd(64,"0"),M=t=>parseInt($.slice(t*8,t*8+8),16)>>>0,N=t=>{let o=t>>>0;return()=>{o=o+1831565813|0;let a=Math.imul(o^o>>>15,1|o);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}},_0=N((M(0)^Math.imul(M(3),739982445)^354057277)>>>0),K=(t,o)=>{let a=0;for(const c of o)a+=c;let s=_0()*a,n=0;for(;s>=o[n]&&n<o.length-1;)s-=o[n++];return t[n]},H0=["1:1 near","2:3","3:4","1:3","Three-pendulum rotary"],ot=["Indigo","Sepia","Iron gall black","Viridian","Carmine"],at=["Cream laid","White card","Black card"],rt=["Mahogany","Oak","Ebonised"],Dt=["Window","Lamp"],S=["Long swing","Even","Short swing"],R0=["Brass","Iron","Nickel"];let C=K(H0,[28,27,25,10,10]),F=K(ot,[34,26,22,10,8]),D=K(at,[55,35,10]),p0=K(rt,[55,33,12]),B0=K(Dt,[64,36]),V0=K(S,[28,50,22]),v0=K(R0,[60,30,10]);r.home&&(C="2:3",F="Indigo",D="Cream laid",p0="Mahogany",B0="Window",V0="Long swing",v0="Brass"),D==="Black card"&&(F="White"),r.trait("Ratio",C),r.trait("Ink",F),r.trait("Paper",D),r.trait("Wood",p0),r.trait("Light",B0),r.trait("Friction",V0),r.trait("Bobs",v0);const nt=N((M(6)^Math.imul(M(7),739982445)^2052986128)>>>0),S0=t=>{let o=0;for(const n of t)o+=n;let a=nt()*o,s=0;for(;a>=t[s]&&s<t.length-1;)a-=t[s++];return s},gt=["Across the table","Over the sheet","Low at the edge"],A0=["Mid-drawing","First loops","Nearly still"];let u0=S0([58,28,14]),s0=S0([56,24,20]);u0===1&&s0===1&&(s0=0),r.home&&(u0=0,s0=0),r.trait("Camera",gt[u0]),r.trait("Stage",A0[s0]);const J=H0.indexOf(C),_=J===4,O=B0==="Lamp",st=rt.indexOf(p0),ve=at.indexOf(D),c0=Array.from({length:16},()=>_0()),Xt=[{E:[-.13,.31,-.25],TG:[.04,-.035,.02],fov:19},{E:[-.04,.47,-.08],TG:[.012,.05,.006],fov:8},{E:[-.27,.16,-.27],TG:[.06,-.01,.05],fov:17}][u0],qt=N((M(2)^Math.imul(M(4),1540483477)^1013904242)>>>0),C0=Xt.TG,Z=Xt.E.slice();{const t=(qt()-.5)*.5,o=.88+.24*qt();if(u0===0&&!r.home){const a=Z[0]-C0[0],s=Z[2]-C0[2],n=Math.cos(t),c=Math.sin(t);Z[0]=C0[0]+a*n-s*c,Z[2]=C0[2]+a*c+s*n,Z[1]=C0[1]+(Z[1]-C0[1])*o}}let Tt=qt();Tt=r.home||Tt<.45?0:Tt<.8?1:2;const e0=(t,o)=>[t[0]-o[0],t[1]-o[1],t[2]-o[2]],K0=(t,o)=>t[0]*o[0]+t[1]*o[1]+t[2]*o[2],i0=t=>{const o=Math.hypot(t[0],t[1],t[2]);return[t[0]/o,t[1]/o,t[2]/o]},ct=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]],I0=i0(e0(C0,Z)),it=i0(ct([0,1,0],I0)),Et=ct(I0,it),lt=Math.tan(Xt.fov*Math.PI/180),ue=[0,.0503,0],Wt=K0(e0(ue,Z),I0),xe=.0034,ft=[0,0,0],G=(t,o)=>{const a=e0(t,Z),s=K0(a,I0);return o[0]=.5+.5*K0(a,it)/(s*lt),o[1]=.5+.5*K0(a,Et)/(s*lt),o[2]=s,o},no=t=>xe*Math.abs(t-Wt)/t/(2*Wt*lt),be=i0([-.42,.5,.76]),N0=N((M(5)^Math.imul(M(1),668265263)^354167853)>>>0)()<.5?[.24,.29,.2]:[-.22,.29,.21],so=(t,o,a)=>{const s=(c,i,f)=>E0(c,i,f),n=(c,i)=>s(i-a,i+a,Math.abs(c));return s(-1.4-a,-1.4+a,t)*(1-s(.4-a,.4+a,t))*s(.12-a,.12+a,o)*(1-s(1.7-a,1.7+a,o))*n(t+.55,.03)*n(o-.65,.022)*n(o-1.2,.022)},co=t=>{const o=O?i0(e0(N0,t)):be;let a=1;if(!O){const s=(1.5-t[2])/o[2];a=so(t[0]+o[0]*s,t[1]+o[1]*s,s*.0047+.02)}if(t[1]<-.02){const s=(-.017-t[1])/Math.max(o[1],.001),n=t[0]+o[0]*s,c=t[2]+o[2]*s,i=.006+s*.012;a*=1-E0(-.15-i,-.15+i,n)*(1-E0(.66-i,.66+i,n))*E0(-.095-i,-.095+i,c)*(1-E0(1.4-i,1.4+i,c))}return a},io=v0==="Iron"?2.1:2.4,Ot=(t,o,a,s,n)=>({px:t,py:-.08,pz:o,h:a,M:io,mr:.05,Lr:.62,mt:s,It:n,mt2:0,h2:.1,Iring:0,s:.25,th:[0,0],v:[0,0],ax:[!0,!0],c:0,K:1,I:1,drv:!1,tg:[0,0],smin:.08,w:[1,1],hist:new Float32Array(32),m:[0,1,0,0,0,0,0,0,0]}),v=Ot(0,0,.13,.32,.0013);v.Iring=6e-4;const x=Ot(.28,.04,.17,.11,9e-4),m=_?Ot(.13,.021,.17,.05,3e-4):null;_&&(x.ax=[!0,!1],m.ax=[!1,!0]),v.cap=.27,x.cap=.27,_&&(m.cap=.2);const lo=.032,fo=(t,o,a)=>{const s=Math.hypot(o,a);return s>t.cap?t.cap/s:1},B=_?[v,x,m]:[v,x],me=(t,o)=>[ro*(t.M*o+t.mr*t.Lr/2-t.mt*t.h-t.mt2*t.h2),t.M*o*o+t.mr*t.Lr*t.Lr/3+t.mt*t.h*t.h+t.It+t.mt2*t.h2*t.h2],Pt=(t,o)=>{const a=me(t,o);return Math.sqrt(Math.max(a[0],1e-4)/a[1])},l0=(t,o)=>{t.s=o;const a=me(t,o);t.K=a[0],t.I=a[1],t.w[0]=Math.sqrt(Math.max(t.K,1e-4)/t.I),t.w[1]=Math.sqrt(Math.max(t.K,1e-4)/(t.I+t.Iring))},ho=t=>{let o=.04,a=0;for(let s=.04;s<.3;s+=.002){const n=Pt(t,s);n>a&&(a=n,o=s)}t.smin=o+.008},dt=(t,o)=>{let a=t.smin,s=.6;if(o>=Pt(t,a))return a;if(o<=Pt(t,s))return s;for(let n=0;n<40;n++){const c=(a+s)/2;Pt(t,c)>o?a=c:s=c}return(a+s)/2},ht=()=>(c0[1]<.5?-1:1)*(.004+.011*c0[2]);J===3&&(x.Lr=.16,x.mr=.02,v.mt2=4.6);for(const t of B)ho(t);if(J===0)l0(v,.2+.08*c0[0]),l0(x,dt(x,v.w[0]*(1+ht()*2.2)));else if(J===1||J===2){const t=J===1?1.5:1.3333333333333333,o=r.home?!1:c0[3]<.55,a=o?v:x,s=o?x:v;l0(a,(J===1?.36:.3)+.08*c0[0]),l0(s,dt(s,a.w[0]*t*(1+ht())))}else J===3?(l0(v,.6),l0(x,dt(x,v.w[0]*3*(1+ht())))):(l0(v,.33+.06*c0[0]),l0(x,dt(x,v.w[0]*1.5*(1+ht()))),l0(m,dt(m,v.w[0]*1.5*(1+ht()*.6+.004))));const we=[44,27,12][S.indexOf(V0)],ye=[1,1.15,1.7][S.indexOf(V0)];for(const t of B)t.c=2*t.I/we;const po=.004,Gt=.13,D0=.1297,pt=.009,Z0=.08,x0=.13,Ue=(c0[4]-.5)*.3,Rt=Math.cos(Ue),At=Math.sin(Ue),X0=R>600?1024:512,vt=X0/4,vo=8e-5*ye,uo=.0054*ye,U=[.28,.09,.04],j=ue.slice(),ge=i0([U[0]-j[0],0,U[2]-j[2]]),Te=Math.cos(62*Math.PI/180),xo=Math.sin(62*Math.PI/180),t0=[ge[0]*Te,xo,ge[2]*Te],kt=.03,zt=.014,k0=[j[0]+t0[0]*kt,j[1]+t0[1]*kt,j[2]+t0[2]*kt],I=[k0[0]+t0[0]*zt,k0[1]+t0[1]*zt,k0[2]+t0[2]*zt],o0=[U[0]+(I[0]-U[0])*.2,U[1]+(I[1]-U[1])*.2,U[2]+(I[2]-U[2])*.2],Bo=_?[m.px,0,m.pz]:null,bo=_?(()=>{const t=(m.px-U[0])/(I[0]-U[0]);return[m.px,U[1]+(I[1]-U[1])*t-.003,U[2]+(I[2]-U[2])*t]})():null;_&&(m.h=bo[1]-m.py);const H=new Float32Array(64*4),h=(t,o,a,s,n)=>{H[t*4]=o,H[t*4+1]=a,H[t*4+2]=s,H[t*4+3]=n},Ht=[[.7,.62,.46],[.78,.77,.74],[.024,.023,.026]][ve],Vt={Indigo:[1.25,.95,.42],Sepia:[.55,.85,1.3],"Iron gall black":[1.1,1.06,.95],Viridian:[1.3,.42,.85],Carmine:[.28,1.3,.95],White:[0,0,0]}[F],Mt={Brass:[.62,.4,.15,1],Iron:[.16,.16,.17,.8],Nickel:[.78,.76,.72,1]}[v0],Kt=[[.13,.042,.018],[.26,.16,.075],[.02,.017,.015]][st].map(t=>t*(O?.15:1)),Zt=O?[.8,.04,.25]:[[.65,.12,.6],[.75,.08,.35],[.85,.05,.2]][st],Ee=t=>{h(0,Z[0],Z[1],Z[2],lt),h(1,I0[0],I0[1],I0[2],R),h(2,it[0],it[1],it[2],xe),h(3,Et[0],Et[1],Et[2],Wt);{const o=O?i0([N0[0],N0[1]-.05,N0[2]]):be;h(4,o[0],o[1],o[2],O?1:0)}O?h(5,.36,.2,.088,.0047):h(5,2.22,1.854,1.302,.0047),h(6,N0[0],N0[1],N0[2],P0?1:0),O?h(7,.009,.01,.024,0):h(7,.16,.178,.238,0),h(8,st,(M(5)&65535)/65536*7,st===1?.55:1,st===2?0:2),h(9,t,0,0,0),h(10,Ht[0],Ht[1],Ht[2],ve),h(11,Vt[0],Vt[1],Vt[2],F==="White"?1:0),h(12,Mt[0],Mt[1],Mt[2],Mt[3]*(O?.3:1)),h(13,x.px,x.pz,_?m.px:-9,_?m.pz:-9),h(14,Kt[0],Kt[1],Kt[2],0),h(47,Zt[0],Zt[1],Zt[2],O?.25:.8)},j0=(t,o,a,s,n,c)=>{const i=e.createTexture();return e.bindTexture(e.TEXTURE_2D,i),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,s,n,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),i},Q0=t=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o},f0=P0?[e.RGBA16F,e.RGBA,e.HALF_FLOAT]:[e.RGBA8,e.RGBA,e.UNSIGNED_BYTE],Y0=E.r16?[e.R16F,e.RED,e.HALF_FLOAT]:f0,jt=E.r16||P0?1:6,Pe=j0(R,R,f0[0],f0[1],f0[2],e.LINEAR),mo=Q0(Pe),Re=j0(R,R,f0[0],f0[1],f0[2],e.LINEAR),wo=Q0(Re),Ae=j0(X0,X0,Y0[0],Y0[1],Y0[2],e.LINEAR),ke=Q0(Ae),ze=j0(vt,vt,Y0[0],Y0[1],Y0[2],e.LINEAR),Me=Q0(ze),Fe=j0(R,R,f0[0],f0[1],f0[2],e.NEAREST),yo=Q0(Fe),ut=R>600?1024:512,Qt=j0(ut,ut,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR),Uo=Q0(Qt);e.bindFramebuffer(e.FRAMEBUFFER,null);const Yt=()=>{e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0)},go=R>600?28:20;Yt(),e.disable(e.BLEND),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E.tn),e.bindVertexArray(E.evao),e.viewport(0,0,R,R),Ee(go),e.bindFramebuffer(e.FRAMEBUFFER,mo),e.useProgram(k.table),e.uniform4fv(z.table.U,H),e.drawArrays(e.TRIANGLES,0,3);{let t=1,o=1,a=0,s=0;for(const i of[U,I,j,k0,o0])G(i,ft),t=Math.min(t,ft[0]),o=Math.min(o,ft[1]),a=Math.max(a,ft[0]),s=Math.max(s,ft[1]);h(16,U[0],U[1],U[2],.0075),h(17,I[0],I[1],I[2],.0032),h(18,j[0],j[1],j[2],kt),h(19,t0[0],t0[1],t0[2],zt),h(20,o0[0],o0[1],o0[2],.0095),h(21,t-.06,o-.06,a+.06,s+.06),h(22,.013,3,0,0);const n=i0(e0(I,U));h(26,o0[0]-n[0]*.013,o0[1]-n[1]*.013,o0[2]-n[2]*.013,.0095),h(27,o0[0]+n[0]*.013,o0[1]+n[1]*.013,o0[2]+n[2]*.013,3),h(28,k0[0],k0[1],k0[2],.0052),h(29,I[0]+t0[0]*.002,I[1]+t0[1]*.002,I[2]+t0[2]*.002,4);const c=i0(ct(n,[0,1,0]));h(24,U[0]-c[0]*.011,U[1]-c[1]*.011,U[2]-c[2]*.011,.0068),h(25,U[0]+c[0]*.011,U[1]+c[1]*.011,U[2]+c[2]*.011,1),e.bindFramebuffer(e.FRAMEBUFFER,wo),e.useProgram(k.arm),e.uniform4fv(z.arm.U,H),e.drawArrays(e.TRIANGLES,0,3)}h(9,0,0,0,ut),h(20,Rt,At,x0/2,Z0),e.bindFramebuffer(e.FRAMEBUFFER,Uo),e.viewport(0,0,ut,ut),e.useProgram(k.surf),e.uniform4fv(z.surf.U,H),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,Qt),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.viewport(0,0,R,R);const Le=()=>{e.clearColor(0,0,0,0),e.bindFramebuffer(e.FRAMEBUFFER,ke),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,Me),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null)};Le();let Ft=8192,b0=new Float32Array(Ft*6),z0=0;const To=(t,o,a,s,n,c)=>{if(z0>=Ft){const f=new Float32Array(Ft*12);f.set(b0),b0=f,Ft*=2}const i=z0*6;z0++,b0[i]=t,b0[i+1]=o,b0[i+2]=a,b0[i+3]=s,b0[i+4]=n,b0[i+5]=c},_e=()=>{z0&&(Yt(),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.useProgram(k.seg),e.bindVertexArray(E.vao),e.bindBuffer(e.ARRAY_BUFFER,E.buf),e.bufferData(e.ARRAY_BUFFER,b0.subarray(0,z0*6),e.DYNAMIC_DRAW),e.bindFramebuffer(e.FRAMEBUFFER,ke),e.viewport(0,0,X0,X0),e.uniform4f(z.seg.uG,Math.pow(.45/X0,2),1/jt,0,0),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,z0),e.bindFramebuffer(e.FRAMEBUFFER,Me),e.viewport(0,0,vt,vt),e.uniform4f(z.seg.uG,Math.pow(.65/vt,2),1/jt,0,0),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,z0),e.bindVertexArray(null),e.disable(e.BLEND),z0=0)},Lt=(t,o)=>{const a=Math.sin(t.th[0]),s=Math.cos(t.th[0]),n=Math.sin(t.th[1]),c=Math.cos(t.th[1]);return o[0]=s,o[1]=-a,o[2]=0,o[3]=a*c,o[4]=s*c,o[5]=n,o[6]=-a*n,o[7]=-s*n,o[8]=c,o},d={lift:0,liftT:0,sheetT:0,inked:!1,ink:1,slide:0,sliding:!1,pu:0,pv:0,have:!1,speed:0,rel:0},$0=[0,0,0],a0=[0,0,0],$t=()=>{Lt(v,v.m),Lt(x,x.m),_?(Lt(m,m.m),a0[0]=x.h*x.m[3],a0[2]=m.h*m.m[5],a0[1]=x.h*(x.m[4]-1)):(a0[0]=x.h*x.m[3],a0[1]=x.h*(x.m[4]-1),a0[2]=x.h*x.m[5]);const t=v.m,o=j[0]+a0[0],a=j[2]+a0[2],s=(a-v.pz-t[5]*Gt)/t[8],n=(o-v.px-t[3]*Gt-t[6]*s)/t[0],c=v.py+t[1]*n+t[4]*Gt+t[7]*s;$0[0]=o,$0[1]=c+3e-4+d.lift*.008,$0[2]=a,d.pu=(Rt*n+At*s)/x0+.5,d.pv=(-At*n+Rt*s)/x0+.5},J0=1/240;let A=N((M(1)^99537233)>>>0);const m0={creak:0,creakF:90,creakA:0},Be=()=>{const t=d.lift<.02;let o=0,a=0;if(t){const y=x.h*x.v[0],u=_?m.h*m.v[1]:x.h*x.v[1];o=-.12*(y-v.h*v.v[0]),a=-.12*(u-v.h*v.v[1])}for(let y=0;y<B.length;y++){const u=B[y];for(let b=0;b<2;b++){if(!u.ax[b])continue;const P=u.I+(b===1?u.Iring:0),Q=u.th[b];let d0=-u.K*Math.sin(Q)-u.c*u.v[b];for(let L=0;L<B.length;L++)L!==y&&B[L].ax[b]&&(d0+=po*u.K*(B[L].th[b]-Q));const F0=b===0?o:a;if(u===v?d0-=F0*u.h:(u===x&&(!_||b===0)||u===m&&b===1)&&(d0+=F0*u.h),u.drv){const L=30*u.K;d0+=L*(u.tg[b]-Q)-2*Math.sqrt(L*P)*u.v[b]}const y0=u.v[b];u.v[b]+=d0/P*J0,u.th[b]+=u.v[b]*J0,y0*u.v[b]<0&&Math.abs(Q)>.12&&A()<.12&&m0.creak<=0&&(m0.creak=.11,m0.creakF=70+50*A(),m0.creakA=Math.min(1,Math.abs(Q)*3))}u.hist.copyWithin(2,0,30),u.hist[0]=u.th[0],u.hist[1]=u.th[1]}const s=d.pu,n=d.pv;$t();const c=(d.pu-s)*x0,i=(d.pv-n)*x0,w=Math.hypot(c,i)/J0;if(d.speed+=(w-d.speed)*.05,t&&d.have&&d.pu>.01&&d.pu<.99&&d.pv>.01&&d.pv<.99){const y=vo*(1+1.5*Math.exp(-w/.012))*(.92+.12*d.ink),u=1-.35*E0(.14,.4,w)*A();To(s,n,d.pu,d.pv,y/x0,uo*J0*d.ink*u),d.sheetT+=J0,d.inked=!0,d.ink=.68+.32*Math.exp(-d.sheetT/45)}d.have=!0},Se=()=>{let t=0;for(const o of B)for(let a=0;a<2;a++)o.ax[a]&&(t+=o.h*Math.hypot(o.th[a],o.v[a]/o.w[a]));return t};let Jt=!0;const Ce=r.home?23:s0===1?5+3*c0[6]:s0===2?150:15+16*c0[6],Ie=()=>{const t=Jt?Tt:A()<.45?0:A()<.6?1:2,o=Jt?Ce:0;Jt=!1;const a=Math.min(.0505,(.041+.008*A())*1.2),s=.36+.26*A(),n=(f,w)=>Math.asin(T0(f/w,-.5,.5)),c=()=>A()*pe,i=[];if(_){const f=A()<.5?1:-1;i.push([n(a*s,v.h),0,n(a*s*(.8+.2*A()),v.h),f*Math.PI/2]),i.push([n(a*(1-s),x.h),c(),0,0]),i.push([0,0,n(a*(1-s)*(.85+.15*A()),m.h),c()])}else if(J===0){const f=A()<.5?1:-1;i.push([n(a*s,v.h),0,n(a*s*(.75+.25*A()),v.h),f*Math.PI/2]);{const w=c();i.push([n(a*(1-s)*(.2+.5*A()),x.h),w,n(a*(1-s),x.h),w+(A()-.5)*.8])}}else if(t===0){const f=.72+.22*A(),w=.72+.22*A();i.push([n(a*f,v.h),c(),n(a*(1-w),v.h),c()]),i.push([n(a*(1-f),x.h),c(),n(a*w,x.h),c()])}else if(t===1){const f=.5+.2*A(),w=A()<.5?1:-1,y=c(),u=c(),b=A()*.6;i.push([n(a*f,v.h),y,n(a*f*(.85+.15*A()),v.h),y+w*Math.PI/2]),i.push([n(a*(1-f)*Math.cos(b),x.h),u,n(a*(1-f)*Math.sin(b)+.002,x.h),u])}else{const f=.42+.16*A();i.push([n(a*f,v.h),c(),n(a*f*(.6+.4*A()),v.h),c()]),i.push([n(a*(1-f)*(.6+.4*A()),x.h),c(),n(a*(1-f),x.h),c()])}for(let f=0;f<B.length;f++){const w=B[f],y=i[f],u=w.w[1]-w.w[0];let b=0;for(let Q=o;Q<o+60;Q+=.5){const d0=y[3]-y[1]+u*Q,F0=y[0]*y[0],y0=y[2]*y[2],L=.5*(F0-y0),U0=y[0]*y[2]*Math.cos(d0);b=Math.max(b,Math.exp(-Q/we)*Math.sqrt(.5*(F0+y0)+Math.sqrt(L*L+U0*U0)))}const P=b>w.cap?w.cap/b:1;y[0]*=P,y[2]*=P}return i},Ne=t=>{for(let o=0;o<B.length;o++){const a=B[o],s=t[o];for(let n=0;n<2;n++){if(!a.ax[n]){a.th[n]=0,a.v[n]=0;continue}const c=s[n*2],i=s[n*2+1];a.th[n]=c*Math.cos(i),a.v[n]=-c*a.w[n]*Math.sin(i)}a.drv=!1}};Ne(Ie()),$t(),d.have=!0;for(let t=0,o=Math.round(Ce*240);t<o&&(Be(),!(s0===2&&t%240===239&&Se()<.006+.003*c0[6]));t++);for(const t of B)for(let o=0;o<16;o++)t.hist[o*2]=t.th[0],t.hist[o*2+1]=t.th[1];_e();const g={st:"draw",t:0,idle:99,sw:null,after:"drop",dropAt:0},l={on:!1,mode:"",t0:0,x0:0,y0:0,p:null,kind:"",th0:[0,0],J:null,s0:0,sdir:-1,lx:0,ly:0},_t=(t,o,a,s,n)=>{const c=Math.sin(a),i=Math.cos(a),f=Math.sin(s),w=Math.cos(s),y=[c*w,i*w,f],u=o==="bob"?-t.s:t===x?.09:t.h;let b=[t.px+y[0]*u,t.py+y[1]*u,t.pz+y[2]*u];return o==="top"&&t===x&&(b=[(U[0]+I[0])/2+t.h*c*w,.09,(U[2]+I[2])/2+t.h*f]),G(b,n)},Eo=t=>{const o=G([-.2,0,De],[0,0,0]),a=G([.4,0,De],[0,0,0]);return o[1]+(a[1]-o[1])*(t-o[0])/(a[0]-o[0])},De=-.095,Po=(t,o)=>{let a=null,s=1e9;const n=[0,0,0];for(const c of B){if(_t(c,"bob",c.th[0],c.th[1],n),n[1]<Eo(n[0])-.01){const f=Math.hypot(n[0]-t,n[1]-o)*.8;f<s&&(s=f,a=[c,"bob"])}_t(c,"top",c.th[0],c.th[1],n);const i=Math.hypot(n[0]-t,n[1]-o)*(c===v?1:1.3);i<s&&(s=i,a=[c,"top"])}return a},Ro=(t,o)=>{const a=[0,0,0],s=[0,0,0],n=.01,c=[0,0,0,0];for(let i=0;i<2;i++){if(!t.ax[i])continue;const f=t.th.slice(),w=t.th.slice();f[i]-=n,w[i]+=n,_t(t,o,f[0],f[1],a),_t(t,o,w[0],w[1],s),c[i]=(s[0]-a[0])/(2*n),c[2+i]=(s[1]-a[1])/(2*n)}return c},Ao=(t,o,a)=>{const n=t[0]*t[0]+t[2]*t[2]+1e-4,c=t[0]*t[1]+t[2]*t[3],i=t[1]*t[1]+t[3]*t[3]+1e-4,f=t[0]*o+t[2]*a,w=t[1]*o+t[3]*a,y=n*i-c*c;return[(i*f-c*w)/y,(n*w-c*f)/y]},Xe=()=>{g.idle=0,d.liftT===0?(d.liftT=1,g.st="up",g.t=0):g.st!=="slide"&&g.st!=="set"&&(g.st=d.inked?"slide":"set",g.t=0)},w0=t=>{g.st=t,g.t=0},ko=t=>{switch(g.t+=t,g.st){case"draw":d.liftT=0,(Se()<.0035||d.sheetT>170)&&w0("lift");break;case"lift":d.liftT=1,g.t>.7&&w0("slide");break;case"up":d.liftT=1,g.idle>7&&w0(d.inked?"slide":"set");break;case"slide":{d.liftT=1,d.sliding=!0,d.slide=E0(0,1.4,g.t),g.t>1.4&&(d.sliding=!1,d.slide=0,Le(),d.inked=!1,d.sheetT=0,d.ink=1,w0("set"));break}case"set":{if(d.liftT=1,!g.sw){g.sw=Ie();for(const a of B)a.drv=!0}const o=E0(0,1,g.t);for(let a=0;a<B.length;a++){const s=B[a],n=g.sw[a];for(let c=0;c<2;c++)s.tg[c]=s.ax[c]?n[c*2]*Math.cos(n[c*2+1])*o:0}g.t>1.25&&(Ne(g.sw),g.sw=null,w0("drop"));break}case"drop":d.liftT=0,g.t>.3&&d.lift<.02&&w0("draw");break;case"held":d.liftT=1;break;case"afterdrag":d.liftT=1,g.t>.45&&w0("drop");break}},zo=t=>{const o=r.input,a=o.taps?o.taps():[];let s=!1;if(o.inside&&o.down){const n=o.x,c=1-o.y;if(g.idle=0,l.on)l.t0+=t;else{l.on=!0,l.mode="pending",l.t0=0,l.x0=n,l.y0=c,l.lx=n,l.ly=c;const f=Po(n,c);l.p=f?f[0]:v,l.kind=f?f[1]:"top"}const i=Math.hypot(n-l.x0,c-l.y0)>.014;if(l.mode==="pending"&&(i?(l.mode="drag",l.th0=l.p.th.slice(),l.J=Ro(l.p,l.kind),l.p.drv=!0,g.st!=="slide"&&(g.prev=d.liftT,w0("held"))):l.t0>.32&&(l.mode="hold",l.s0=l.p.s,l.y0=c,l.sdir=-1)),l.mode==="drag"){const f=Ao(l.J,n-l.x0,c-l.y0),w=l.p.ax[0]?T0(l.th0[0]+f[0],-.42,.42):0,y=l.p.ax[1]?T0(l.th0[1]+f[1],-.42,.42):0,u=fo(l.p,w,y);l.p.tg[0]=w*u,l.p.tg[1]=y*u}else if(l.mode==="hold"){let f=l.s0-(c-l.y0)*.9;Math.abs(c-l.y0)<.02?(l.s0+=l.sdir*.05*t,l.s0<l.p.smin+.005&&(l.sdir=1),l.s0>.59&&(l.sdir=-1),f=l.s0):(l.s0=T0(f,l.p.smin,.6),l.y0=c),l0(l.p,T0(f,l.p.smin,.6))}l.lx=n,l.ly=c}else l.on&&(s=!0,l.mode==="pending"?Xe():l.mode==="drag"&&(l.p.drv=!1,w0(g.prev===1&&d.inked?"up":"afterdrag"),g.st==="up"&&(g.idle=0)),l.on=!1,l.mode="");!s&&!l.on&&a.length&&Xe(),g.idle+=t},q0=16e3,qe=new Float32Array(q0);let te=0,Bt=0,ee=0,oe=0,ae=0,xt=0,re=0,We=0,W0=19088743;const bt=()=>(W0^=W0<<13,W0^=W0>>>17,W0^=W0<<5,(W0>>>0)/4294967296*2-1),Mo=t=>{if(!r.sound||!r.sound.on)return;const o=Math.min(4e3,Math.round(t*q0)),s=(d.lift<.02?1:0)*Math.pow(T0(d.speed/.28,0,1),.8)*.5;for(let n=0;n<o;n++){const c=bt();Bt+=(c-Bt)*.55,ee+=(Bt-ee)*.18;let i=(Bt-ee)*s*(.6+.4*Math.abs(oe));oe+=(bt()-oe)*.002,s>.02&&bt()>.997-s*.004&&(i+=bt()*s*1.5),m0.creak>0&&(ae+=m0.creakF/q0,ae>1&&(ae-=1,i+=.25*m0.creakA*(m0.creak/.11)),m0.creak-=1/q0),te++,te>=q0&&(te=0,We^=1,xt=1,re=0),xt>.001&&(re+=(We?2300:1850)/q0,i+=Math.sin(re*pe)*xt*.07+bt()*xt*.02,xt*=.9955),qe[n]=i}r.sound.pcm(qe.subarray(0,o),q0,{vel:.7})},X=[0,0,0],O0=[0,0,0],M0=[0,0,0],ne=[0,0,0],se=[0,0,0],ce=[0,0,0],Fo=(t,o,a)=>{const s=Math.cos(o),n=Math.sin(o),c=ct(t,a),i=K0(t,a);return[a[0]*s+c[0]*n+t[0]*i*(1-s),a[1]*s+c[1]*n+t[1]*i*(1-s),a[2]*s+c[2]*n+t[2]*i*(1-s)]};let ie=0;const Oe=()=>{Ee(0),h(9,0,ie,6,0);const t=[U[0]+a0[0],U[1]+a0[1],U[2]+a0[2]],o=e0(j,U),a=e0($0,t),s=ct(o,a),n=Math.hypot(s[0],s[1],s[2]),c=Math.atan2(n,K0(o,a)),i=n>1e-12?[s[0]/n,s[1]/n,s[2]/n]:[0,1,0],f=T=>{const p=Fo(i,c,e0(T,U));return[t[0]+p[0],t[1]+p[1],t[2]+p[2]]},w=f(I),y=f(k0),u=f(o0),b=i0(e0(w,t));G(U,X),G(j,O0),G(t,M0),G($0,ne);{const T=O0[0]-X[0],p=O0[1]-X[1],Y=ne[0]-M0[0],r0=ne[1]-M0[1],g0=T*T+p*p,q=(Y*T+r0*p)/g0,W=(r0*T-Y*p)/g0,V=M0[0]-(q*X[0]-W*X[1]),mt=M0[1]-(q*X[1]+W*X[0]),wt=q*q+W*W,yt=q/wt,Ut=-W/wt;h(16,yt,Ut,-(yt*V-Ut*mt),-(yt*mt+Ut*V))}const P=v.m;h(17,P[0],P[1],P[2],v.px),h(18,P[3],P[4],P[5],v.py),h(19,P[6],P[7],P[8],v.pz),h(20,Rt,At,x0/2,Z0);const Q=d.sliding?d.slide*.34:0,d0=-Q*.95,F0=Q*.3;h(21,D0,pt,d0,F0);{let T=1,p=1,Y=0,r0=0;const g0=(q,W,V)=>{G([v.px+P[0]*q+P[3]*W+P[6]*V,v.py+P[1]*q+P[4]*W+P[7]*V,v.pz+P[2]*q+P[5]*W+P[8]*V],X),T=Math.min(T,X[0]),p=Math.min(p,X[1]),Y=Math.max(Y,X[0]),r0=Math.max(r0,X[1])};for(const q of[-1,1])for(const W of[-1,1])g0(q*Z0,D0,W*Z0),g0(q*Z0,D0-pt,W*Z0),d.sliding&&g0(d0+q*x0*.72,D0,F0+W*x0*.72);h(22,T-.03,p-.03,Y+.03,r0+.03)}h(24,-.13,-.12,.42,.3);{const T=O?.3:1;v0==="Nickel"?h(46,.62*T,.62*T,.64*T,_?3:2):h(46,.66*T,.47*T,.22*T,_?3:2)}const y0=[x.px,x.py,x.pz],L=e0(t,y0),U0=Math.hypot(L[0],L[1],L[2]),St=[y0[0]+L[0]/U0*.03,y0[1]+L[1]/U0*.03,y0[2]+L[2]/U0*.03],Ct=[t[0]-L[0]/U0*.006,t[1]-L[1]/U0*.006,t[2]-L[2]/U0*.006];h(62,St[0],St[1],St[2],.0075),h(63,Ct[0],Ct[1],Ct[2],lo);let It=0;const L0=(T,p,Y,r0)=>{h(48+It*2,T[0],T[1],T[2],Y),h(49+It*2,p[0],p[1],p[2],r0),It++};if(_){Lt(m,m.m);const T=[m.px+m.h*m.m[3],m.py+m.h*m.m[4],m.pz+m.h*m.m[5]],p=[m.px+.03*m.m[3],m.py+.03*m.m[4],m.pz+.03*m.m[5]];h(25,p[0],p[1],p[2],.0055),h(26,T[0],T[1],T[2],1),L0(p,T,.0055,.0055)}else h(26,0,0,0,0);L0(St,Ct,.0075,.0075),L0([t[0]-b[0]*.008,t[1],t[2]-b[2]*.008],[t[0]+b[0]*.008,t[1],t[2]+b[2]*.008],.0085,.0085),L0(t,w,.0032,.0032),L0([u[0]-b[0]*.013,u[1]-b[1]*.013,u[2]-b[2]*.013],[u[0]+b[0]*.013,u[1]+b[1]*.013,u[2]+b[2]*.013],.0095,.0095),L0(y,w,.0052,.0052),L0(y,$0,.004,4e-4),L0([v.px+P[3]*.03,v.py+P[4]*.03,v.pz+P[5]*.03],[v.px+P[3]*(D0-pt),v.py+P[4]*(D0-pt),v.pz+P[5]*(D0-pt)],.0055,.0055),h(23,R>600?8:6,B.length,It,d.sliding?1:0),h(27,X0,jt,O?1.15:.86,ie%977);for(let T=0;T<B.length;T++){const p=B[T],Y=28+6*T;G([p.px,p.py,p.pz],X),G([p.px,p.py-p.s,p.pz],O0);const r0=O0[2],g0=1/(2*r0*lt);G([p.px,p.py-p.s+.03,p.pz],M0);const q=Math.hypot(M0[0]-O0[0],M0[1]-O0[1]);h(Y,X[0],X[1],.0034*g0,no(r0));const W=i0(e0([p.px,p.py-p.s,p.pz],Z));h(Y+1,.034*g0,q,Math.abs(W[1])*.98,co([p.px,p.py-p.s,p.pz]));for(let V=0;V<4;V++){const mt=p.hist[V*4],wt=p.hist[V*4+1],yt=Math.sin(mt),Ut=Math.cos(mt),Lo=Math.sin(wt),Ge=Math.cos(wt),tt=[yt*Ge,Ut*Ge,Lo];G([p.px-tt[0]*p.Lr,p.py-tt[1]*p.Lr,p.pz-tt[2]*p.Lr],se),G([p.px-tt[0]*p.s,p.py-tt[1]*p.s,p.pz-tt[2]*p.s],ce);const He=Y+2+(V>>1),Ve=Y+4+(V>>1),Nt=(V&1)*2;H[He*4+Nt]=se[0],H[He*4+Nt+1]=se[1],H[Ve*4+Nt]=ce[0],H[Ve*4+Nt+1]=ce[1]}}Yt(),e.disable(e.BLEND),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E.tn),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Pe),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Re),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Ae),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,ze),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,Qt),e.bindVertexArray(E.evao),e.bindFramebuffer(e.FRAMEBUFFER,yo),e.viewport(0,0,R,R),e.useProgram(k.A),e.uniform4fv(z.A.U,H),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.blendEquation(e.FUNC_ADD),e.useProgram(k.B),e.uniform4fv(z.B.U,H),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,Fe),e.useProgram(k.C),e.uniform4fv(z.C.U,H),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),ie++};return $t(),Oe(),(t,o)=>{o=T0(o||0,0,.25),zo(o),ko(o);const a=Math.min(60,Math.round(o*240));for(let s=0;s<a;s++){const n=d.liftT,c=1-Math.exp(-J0*9);d.lift+=(n-d.lift)*c,Be()}_e(),Mo(o),Oe()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
