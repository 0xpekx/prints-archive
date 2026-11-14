// Bats at Dusk: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/167.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ge){ge&&function(){"use strict";const Ee=new WeakMap,To="",vt=`
`,w0="#version 300 es"+vt+To+"precision highp float;"+vt+"precision highp int;"+vt+"precision highp sampler2D;"+vt,d=256,pt=38,Xt=4e4,Ae=4e4,bt=w0+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",wo=w0+`uniform vec4 uH[4]; uniform sampler2D uN; uniform sampler2D uP; out vec4 o;
vec4 rw(float x){ float k = clamp(x, 0.0, 1.0) * 254.99; int i = int(k); return mix(texelFetch(uP, ivec2(i, 3), 0), texelFetch(uP, ivec2(i + 1, 3), 0), k - float(i)); }
float bedH(float l){ return texelFetch(uP, ivec2(int(l + 64.0) & 255, 3), 0).a; }
float hh(vec2 v){ vec3 q = fract(vec3(v.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
void main(){
  float SZ = uH[0].x; vec2 p = gl_FragCoord.xy / SZ; if (uH[0].y > 0.5) p.x = 1.0 - p.x;
  vec2 so = uH[0].zw;
  vec4 a = textureLod(uN, p * 1.13 + so, 0.0), b = textureLod(uN, p * 4.3 + so.yx, 0.0), d = textureLod(uN, p * 17.0 + so, 0.0), e = textureLod(uN, p * 61.0 + so.yx, 0.0);
  vec2 w = a.rg - 0.5;
  vec4 rr = rw(p.x + w.y * 0.005);
  float top = rr.r - p.y + (d.g - 0.5) * 0.005 + (e.r - 0.5) * 0.002;
  float mask = smoothstep(-1.2 / SZ, 1.2 / SZ, top);
  // a master joint: a long crack running across the beds
  float mjn = textureLod(uN, vec2(p.x * 1.7 + p.y * 0.25 + so.x, p.y * 0.42 + so.y), 0.0).b;
  float mj = smoothstep(0.012, 0.0, abs(mjn - 0.5) + (d.r - 0.5) * 0.008);
  float y1 = p.y + uH[2].y * p.x + rr.g + uH[2].z * (b.r - 0.5);
  float s1 = y1 * uH[2].x; s1 += 0.5 * sin(s1 * 0.71 + so.x * 6.0) + 0.22 * sin(s1 * 1.93 + so.y * 9.0);
  float L1 = floor(s1), f1 = s1 - L1, H1 = bedH(L1), Hu = bedH(L1 + 1.0), Hd = bedH(L1 - 1.0);
  float pr1 = mix(mix(Hd, H1, 0.5), H1, smoothstep(0.0, 0.05, f1));
  pr1 = mix(pr1, mix(H1, Hu, 0.5), smoothstep(0.97, 1.0, f1));
  // a bed's edge doesn't run the whole way: soil and rubble bury it in places
  float vis = smoothstep(0.34, 0.6, textureLod(uN, p * 2.3 + so.yx * 3.0, 0.0).b);
  pr1 = mix(H1 * 0.5 + 0.25, pr1, vis);
  float und = smoothstep(0.0, 0.3, f1) * 0.65 + 0.35 * f1;
  // the thick bed's blocks
  float fj1 = 2.6 + 5.0 * H1;
  float x1 = p.x * fj1 + H1 * 17.0 + w.x * 0.8 + (b.g - 0.5) * 0.3;
  float J1 = floor(x1), g1 = x1 - J1, B1 = hh(vec2(J1, L1 + 40.0 * so.x));
  float jd1 = min(g1, 1.0 - g1) / fj1 + (d.r - 0.5) * 0.0045;
  float joint1 = smoothstep(0.0034, 0.0, jd1) * (0.35 + 0.65 * B1);
  // thin beds inside it, at a thickness that changes from one thick bed to the next
  float s2 = (y1 + (d.g - 0.5) * 0.004) * (22.0 + 60.0 * H1 * H1) + H1 * 9.0;
  float L2 = floor(s2), f2 = s2 - L2, H2 = hh(vec2(L2, L1 + 11.0));
  float x2 = p.x * (9.0 + 22.0 * H2) + H2 * 37.0 + w.y * 2.2 + (d.g - 0.5) * 0.5;
  float J2 = floor(x2), g2 = x2 - J2, B2 = hh(vec2(J2, L2 + L1 * 7.0));
  float joint2 = smoothstep(0.1, 0.0, min(g2, 1.0 - g2));
  // some thick beds are thinly laminated all through, others are massive and smooth
  float lamZ = smoothstep(0.42, 0.62, fract(H1 * 7.3));
  float lam = abs(2.0 * fract(y1 * 190.0 + b.g * 4.0 + H2 * 3.0) - 1.0) * lamZ;
  float hg = uH[3].x * a.r + uH[3].y * b.r
    + uH[3].w * (2.6 * pr1 + 0.85 * und * vis + 1.9 * (B1 - 0.5))
    + (1.0 - 0.72 * lamZ) * (0.02 * (H2 - 0.5) + 0.009 * (B2 - 0.5) + 0.011 * smoothstep(0.0, 0.2, f2))
    + 0.012 * d.r + 0.004 * e.g + uH[2].w * (textureLod(uN, vec2(p.x * 37.0 + w.x * 2.5 + so.x, p.y * 1.7), 0.0).g - 0.5)
    - 0.05 * joint1 - 0.012 * joint2 * (0.3 + 0.7 * B2) - 0.004 * lam - 0.026 * mj * smoothstep(0.4, 0.62, b.b);
  float h = (0.12 + hg) * (0.5 + 0.5 * smoothstep(0.0, 0.05, top));
  // dark vertical stains: water running off a ledge and down the face below
  vec4 st = textureLod(uN, vec2(p.x * 31.0 + w.x * 1.2 + so.y, p.y * 1.05 + so.x), 0.0), su = textureLod(uN, vec2(p.x * 9.0 + so.x, p.y * 0.5), 0.0);
  float stain = smoothstep(0.5, 0.66, st.g) * smoothstep(0.42, 0.62, su.r) * (0.5 + 0.5 * f1) + 0.5 * smoothstep(0.56, 0.7, st.r) * f1 * f1 * smoothstep(0.35, 0.55, su.b);
  float tint = (0.62 + 0.5 * B1 * H1 + 0.18 * H2) * (1.0 - 0.72 * min(stain, 1.0)) * (1.0 - 0.35 * joint1) * (1.0 - 0.6 * smoothstep(0.5, 0.0, f1 / 0.05) * step(Hd, H1 - 0.05));
  // the mouth: wider than high, roofed along a bed, stepping out along the beds, with a thick brow
  vec2 m = vec2((p.x - uH[1].x) / uH[1].z, (p.y - uH[1].y) / uH[1].w);
  m.x += 0.16 * (m.y - 0.3);
  vec2 ma = abs(m);
  float bump = 0.17 * w.x + 0.1 * (b.r - 0.5) + 0.03 * (d.g - 0.5) + (H2 - 0.5) * 0.055 + (H1 - 0.5) * 0.1 + (B1 - 0.5) * 0.05;
  float dq = pow(pow(ma.x, 2.5) + pow(ma.y, 3.2), 0.38) + bump;
  if (uH[1].z < 0.08) {
    float yy = clamp(m.y, 0.0, 1.2), tp = 1.5 - 1.25 * yy;
    float sx = abs((p.x - uH[1].x + (a.b - 0.5) * 0.11 + (b.b - 0.5) * 0.03 + (d.r - 0.5) * 0.012) / uH[1].z) / max(tp, 0.05);
    dq = max(sx, smoothstep(0.82, 1.08, yy)) + (H2 - 0.5) * 0.2;
  }
  vec4 fr = textureLod(uN, vec2(p.x * 2.6, 0.3) + so, 0.0);
  float fy0 = uH[1].y + 0.05 * (fr.g - 0.5) + 0.03 * (b.g - 0.5) + 0.012 * (d.r - 0.5);
  float cave = smoothstep(1.015, 0.985, dq) * smoothstep(-0.004, 0.006, p.y - fy0);
  // the brow stands out from the face above the mouth and its underside faces down
  float lipK = smoothstep(0.15, 0.6, m.y);
  h += uH[3].z * lipK * smoothstep(1.0, 1.04, dq) * smoothstep(1.75, 1.12, dq);
  // fallen blocks at the foot of the mouth and along the base of the hill
  float tal = smoothstep(0.075, 0.0, p.y - fy0) * smoothstep(1.7, 0.9, ma.x);
  h += tal * (0.16 * B2 + 0.09 * B1 + 0.05 * d.g);
  // inside: rock planes stepping back towards a dark centre
  float rho = clamp((1.0 - dq) / 0.86, 0.0, 1.0);
  float pl = rho * 4.6 + 1.5 * (b.g - 0.5) + 0.22 * (d.r - 0.5) + 0.3 * (H2 - 0.5), plF = floor(pl);
  float inner = -0.16 - 0.15 * plF - 0.05 * smoothstep(0.0, 0.5, pl - plF) + 0.012 * (H2 - 0.5) + 0.005 * d.g;
  h = mix(h, inner, cave);
  h = mix(-0.3, h, mask);
  tint *= 1.0 + 1.5 * lipK * smoothstep(1.3, 1.03, dq) * (0.45 + 0.55 * B2);
  float rq = mix(rho, (plF + 0.5) / 4.6, 0.72);
  float g = mix(0.25 * clamp(tint, 0.0, 2.0), 0.51 + 0.49 * clamp(rq, 0.0, 1.0), step(0.5, cave));
  o = vec4((h + 0.5) * 0.5, g, 0.0, mask);
}`,go=w0+`layout(location = 0) in vec4 a0; layout(location = 1) in vec4 a1; uniform vec4 uG; out vec2 vP; out float vL; out vec4 vD;
void main(){
  vec2 A = a0.xy, B = a0.zw; if (uG.y > 0.5) { A.x = 1.0 - A.x; B.x = 1.0 - B.x; }
  vec2 d = B - A; float L = max(length(d), 1e-5); vec2 t = d / L, n = vec2(-t.y, t.x);
  float r = max(max(a1.x, a1.y), 0.6 / uG.x) + 1.5 / uG.x;
  float cx = float(gl_VertexID & 1), cy = float(gl_VertexID >> 1), al = mix(-r, L + r, cx), pe = mix(-r, r, cy);
  vP = vec2(al, pe); vL = L; vD = a1;
  gl_Position = vec4((A + t * al + n * pe) * 2.0 - 1.0, 0.0, 1.0);
}`,Eo=w0+`uniform vec4 uG; in vec2 vP; in float vL; in vec4 vD; out vec4 o;
void main(){
  float k = clamp(vP.x / vL, 0.0, 1.0), r = max(mix(vD.x, vD.y, k), 0.6 / uG.x);
  float d = length(vec2(vP.x - k * vL, vP.y)) / r;
  if (d > 1.0) discard;
  float cov = smoothstep(1.0, 1.0 - min(1.0, 1.5 / (uG.x * r)), d);
  o = vec4(0.0, 0.0, vD.w, cov);
}`,Ao=w0+`uniform vec4 uL[8]; uniform sampler2D uT; uniform sampler2D uN; uniform sampler2D uP; out vec4 o;
void main(){
  float SZ = uL[0].x; vec2 p = gl_FragCoord.xy / SZ; vec4 t = textureLod(uT, p, 0.0);
  float e = 1.2 / SZ, K = uL[0].w, xm = uL[2].w > 0.5 ? 1.0 - p.x : p.x;
  float rk = clamp(xm, 0.0, 1.0) * 254.99; int ri = int(rk);
  float rid = mix(texelFetch(uP, ivec2(ri, 3), 0).r, texelFetch(uP, ivec2(ri + 1, 3), 0).r, rk - float(ri)), under = max(rid - p.y, 0.0);
  float hx = textureLod(uT, p + vec2(e, 0.0), 0.0).r - textureLod(uT, p - vec2(e, 0.0), 0.0).r;
  float hy = textureLod(uT, p + vec2(0.0, e), 0.0).r - textureLod(uT, p - vec2(0.0, e), 0.0).r;
  vec3 n = normalize(vec3(-K * hx / (2.0 * e), -K * hy / (2.0 * e), 1.0));
  vec3 L = uL[1].xyz;
  vec2 gw = vec2(0.0);
  float occ = 0.0, aoS = 0.0, jit = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  int steps = int(uL[0].z);
  for (int i = 0; i < steps; i++) {
    float fi = float(i), dd = (fi + jit) * 0.0024 + 0.001;
    float hs = textureLod(uT, p + L.xy * dd, 0.0).r;
    occ = max(occ, hs - t.r - dd * uL[1].w);
    float ang = fi * 2.399, rr = 0.002 + 0.0032 * fi;
    vec2 dir = vec2(cos(ang), sin(ang) * 0.8 + 0.25);
    float dh = textureLod(uT, p + dir * rr, 0.0).r - t.r;
    aoS += max(dh, 0.0); gw += dir * (dh / rr);
  }
  float sh = 1.0 - smoothstep(0.0, 0.03, occ);
  float ao = clamp(1.0 - aoS * 26.0 / float(steps), 0.0, 1.0); ao = 0.12 + 0.88 * ao * ao;
  vec4 a = textureLod(uN, p * 2.1, 0.0), b = textureLod(uN, p * vec2(7.0, 3.0), 0.0), d = textureLod(uN, p * 83.0, 0.0);
  bool caveP = t.g > 0.505 && t.b < 0.2;
  float tint = caveP ? 0.5 : t.g * 4.0, rho = caveP ? (t.g - 0.51) / 0.49 : 0.0;
  vec3 alb = mix(uL[2].rgb, uL[3].rgb, clamp(a.r * 1.5 - 0.35, 0.0, 1.0));
  alb = mix(alb, uL[4].rgb, smoothstep(0.52, 0.72, b.g) * 0.5);
  alb *= tint * (0.82 + 0.36 * d.a);
  if (t.b > 0.85) alb = uL[7].rgb * (0.6 + 0.8 * d.r);
  else if (t.b > 0.55) alb = uL[5].rgb * (0.45 + 1.1 * d.g);
  else if (t.b > 0.2) alb = uL[6].rgb;
  vec3 col;
  float al;
  if (uL[0].y < 0.5) {
    float sl = (texelFetch(uP, ivec2(min(ri + 3, 255), 3), 0).r - texelFetch(uP, ivec2(max(ri - 3, 0), 3), 0).r) * 42.0;
    float face = 0.14 + 0.86 * smoothstep(0.1, -0.5, sl), gap = smoothstep(0.34, 0.62, b.r);
    float crest = exp(-under / (0.0012 + 0.003 * a.g)) * (0.45 + 0.55 * d.g) * face * (0.25 + 0.75 * gap), near = exp(-under / 0.07) * face;
    float facet = max(dot(n, L), 0.0) * (0.03 + 0.97 * sh) * near;
    col = alb * (facet + crest * 0.1);
    if (t.b > 0.2) col = alb * exp(-under / 0.006) * 0.035;
    if (caveP) col = vec3(0.0);
    al = t.a;
  } else {
    float sky = 0.3 + 0.7 * clamp(0.42 + n.y * 1.15 - n.x * 0.1, 0.0, 1.0);
    // which light each facet sees: tops take the violet zenith, faces turned to the afterglow a dull rose for a long way
    // down the hill, the rest the rose-violet eastern sky behind the camera, undersides and joints a brown-violet
    // (by the facet's broad slope, from the occlusion samples out to about 70 px, so the hue follows the blocks and ledges, not the grain)
    vec2 nw = -gw * K * 2.0 / float(steps);
    float up = smoothstep(0.03, 0.4, nw.y), dn = smoothstep(0.03, 0.4, -nw.y);
    float gs = smoothstep(-0.25, 0.45, nw.x * L.x) * mix(0.45, 1.0, exp(-under / uL[7].w));
    vec3 hue = mix(vec3(1.2, 0.95, 0.9), vec3(0.8, 0.96, 1.28), up * uL[5].w);
    hue = mix(hue, vec3(1.3, 0.88, 1.0), max(dn, smoothstep(0.5, 0.15, ao)) * uL[5].w);
    hue = mix(hue, vec3(1.6, 0.92, 0.66), gs * uL[6].w * (1.0 - up));
    if (t.b > 0.2) hue = vec3(1.0);
    col = alb * sky * ao * hue;
    if (t.b > 0.55) col *= 0.15; else if (t.b > 0.2) col *= 0.3;
    if (caveP) { float fall = exp(-rho * 1.3) * smoothstep(0.95, 0.5, rho); float yr = (p.y - uL[3].w) / uL[4].w, roof = 0.1 + 0.9 * smoothstep(0.8, 0.1, yr); col = alb * (0.3 + 1.0 * clamp(0.3 + n.y * 1.5 + n.x * 0.5, 0.0, 1.0)) * fall * fall * roof * 1.3 * mix(ao, 1.0, 0.25); }
    al = (t.b > 0.2 && t.b < 0.55) ? t.a * 0.92 : 0.0;
  }
  o = vec4(sqrt(col), al);
}`,Ro=w0+`uniform vec4 uK[4]; uniform sampler2D uN; out vec4 o;
float h21(vec2 p){ vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
void main(){
  float SZ = uK[0].x; vec2 p = gl_FragCoord.xy / SZ; float sd = uK[1].w;
  float dd = 0.0, d2 = 0.0, fib = 0.0;
  for (int i = 0; i < 2; i++) {
    vec2 q = p + (i == 1 ? uK[1].xy * uK[1].z : vec2(0.0));
    vec2 r = vec2(q.x * 0.62 + q.y * 0.2 + sd, q.y * uK[0].z * 0.5 - q.x * 0.34 + sd * 1.7);
    vec4 w = textureLod(uN, r * vec2(0.19, 0.3), 0.0);
    r += (w.rg - 0.5) * vec2(0.6, 0.26);
    vec4 a = textureLod(uN, r * vec2(0.34, 0.5), 0.0), b = textureLod(uN, r * vec2(0.7, 1.9), 0.0);
    float v = a.r * 0.5 + b.g * 0.42;
    if (i == 0) {
      dd = v;
      // fibres: long fine streaks that drift off the main direction where the wind has combed them
      vec2 fr = r + (b.rg - 0.5) * vec2(0.12, 0.05);
      fib = textureLod(uN, fr * vec2(1.3, 11.0), 0.0).r * 0.55 + textureLod(uN, fr * vec2(2.6, 31.0), 0.0).g * 0.45;
    } else d2 = v;
  }
  float band = smoothstep(0.14, 0.34, p.y) * (0.72 + 0.28 * smoothstep(0.95, 0.55, p.y));
  float th = 0.625 - 0.13 * uK[0].y;
  float body = smoothstep(th - 0.04, th + 0.24, dd);
  float tau = body * band * (0.03 + 0.24 * smoothstep(0.3, 0.78, fib * (0.55 + 0.8 * body))) * (0.75 + 0.5 * uK[0].y);
  float lit = clamp(0.74 + (dd - d2) * 3.5, 0.0, 1.0) * mix(1.0, 0.45, smoothstep(0.25, 0.95, p.y));
  if (uK[0].w > 0.5) {
    vec4 a = textureLod(uN, p * vec2(0.55, 1.1) + sd, 0.0), b = textureLod(uN, p * vec2(1.6, 3.8) + sd, 0.0), c = textureLod(uN, p * vec2(4.2, 11.0) + sd, 0.0);
    float v = p.y - 0.58 + (a.r - 0.5) * 0.34 + (b.g - 0.5) * 0.12 + (c.r - 0.5) * 0.04;
    float m = smoothstep(-0.03, 0.09, v);
    float under = exp(-max(v, 0.0) / 0.075) * (0.45 + 0.55 * b.r);
    tau = max(tau * 0.6, m * 0.97);
    lit = mix(lit, clamp(under + 0.1 * c.g * smoothstep(0.3, 0.0, v), 0.0, 1.0), m);
  }
  vec2 g = p * 120.0, id = floor(g);
  float s = h21(id + sd * 91.0), st = 0.0;
  float mw = exp(-pow((p.y - 0.62 + (p.x - 0.5) * 0.7 + (textureLod(uN, p * 1.3 + sd, 0.0).r - 0.5) * 0.25) / 0.13, 2.0));
  if (s > 0.5 - 0.4 * mw) {
    vec2 c = id + 0.2 + 0.6 * vec2(h21(id + 3.1), h21(id + 7.7)), dq = (g - c) / 120.0 * SZ;
    float mag = pow(h21(id + 11.3), 11.0), hb = h21(id + 5.3);
    st = (0.0025 + 0.03 * hb * hb * hb * hb + 0.9 * mag) * exp(-dot(dq, dq) * 1.5 / (0.6 + 1.6 * mag));
  }
  st += 0.012 * mw * textureLod(uN, p * vec2(3.0, 5.0) + sd, 0.0).g;
  float rid = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i), y = uK[2][i] + uK[3][i] * (textureLod(uN, vec2(p.x * (0.42 + 0.3 * fi) + fi * 0.37 + sd, 0.2 + fi * 0.21), 0.0).r - 0.5) * 2.6 + uK[3][i] * 0.28 * (textureLod(uN, vec2(p.x * 3.4 + fi * 0.13, 0.5 + fi * 0.1), 0.0).g - 0.5);
    rid = mix(rid, 0.28 + 0.34 * fi, smoothstep(1.2 / SZ, -1.2 / SZ, p.y - y));
  }
  o = vec4(tau, lit, sqrt(clamp(st, 0.0, 1.0)), rid);
}`,Mo=w0+`layout(location = 0) in vec4 a0; layout(location = 1) in vec4 a1;
uniform vec4 uB[8]; uniform sampler2D uP; uniform sampler2D uR; out vec2 vQ; out vec4 vC; out vec3 vS;
vec2 push(vec2 p, vec4 h){ vec2 d = p - h.xy; float l = dot(d, d) + 1e-5; return d * inversesqrt(l) * h.w * exp(-l / (h.z * h.z)); }
void main(){
  float T = uB[0].x, SZ = uB[0].z, s = fract(a0.x + T * a0.y), j = s * 254.99, f = fract(j); int i = int(j);
  vec4 P = mix(texelFetch(uP, ivec2(i, 0), 0), texelFetch(uP, ivec2(i + 1, 0), 0), f);
  vec4 Q = mix(texelFetch(uP, ivec2(i, 1), 0), texelFetch(uP, ivec2(i + 1, 1), 0), f);
  vec4 U = mix(texelFetch(uP, ivec2(i, 2), 0), texelFetch(uP, ivec2(i + 1, 2), 0), f);
  float n = mod(uB[0].y - j - fract(a1.z * 7.31) * s * 14.0 + 512.0, 256.0), g = fract(n); int k = int(n), k1 = (k + 1) & 255;
  vec4 R = mix(texelFetch(uR, ivec2(k, 0), 0), texelFetch(uR, ivec2(k1, 0), 0), g);
  vec4 W = mix(texelFetch(uR, ivec2(k, 1), 0), texelFetch(uR, ivec2(k1, 1), 0), g);
  float alive = smoothstep(a1.z - 0.05, a1.z + 0.05, R.w);
  float rb = Q.w, th = Q.y + a0.z - T * uB[2].w * (1.0 - rb), c = cos(th), sn = sin(th);
  float r = mix(a0.w, 0.86 + 0.2 * a0.w, uB[7].x * (1.0 - rb)) + R.z * (1.0 - 0.5 * min(a0.w, 1.0)), rad = Q.x * (1.0 + W.y), cp = cos(W.x), sp = sin(W.x);
  float dm = uB[6].x, cl = (1.0 - dm) * step(fract(a0.x * 53.3), 0.0012) * (1.0 - smoothstep(0.2, 0.44, s));
  vec2 tv = U.xy * inversesqrt(dot(U.xy, U.xy) + 1e-6), nn = vec2(-tv.y, tv.x);
  float ax = (fract(a0.x * 91.7) - 0.5) * (0.5 + fract(a1.y * 13.1));
  vec2 off = mix(vec2(c, sn * Q.z + ax * 0.36) * r, nn * (c * cp + 0.2 * sn * sp) * r + tv * sn * 0.5 * r, rb) * rad * (1.0 + cl * 1.6);
  float dep = mix(sn, c * sp, rb) * r;
  vec2 pos = P.xy + R.xy * pow(P.z, 0.38) + off + U.zw * uB[3].w * step(0.5, fract(a0.x * 37.7));
  pos += push(pos, uB[4]) + push(pos, uB[5]);
  float sc = P.z * (1.0 + 0.42 * dep * (1.0 - rb)) * (1.0 + cl * (0.2 + 0.6 * fract(a1.y * 7.7)));
  vec2 vel = U.xy + (1.0 - rb) * vec2(-sn, c * Q.z) * rad * r * uB[1].w;
  vec2 nh = vel * inversesqrt(dot(vel, vel) + 1e-6), pr = vec2(-nh.y, nh.x);
  nh = normalize(nh + pr * (a1.y - 0.5) * (0.9 + cl * 2.2)); pr = vec2(-nh.y, nh.x);
  float fl = cos(T * (62.0 + a1.y * 14.0) + a1.y * 40.0), ends = smoothstep(1.0, 0.94, s) * smoothstep(0.0, 0.016, s);
  float cx = float(gl_VertexID & 1) * 2.0 - 1.0, cy = float(gl_VertexID >> 1) * 2.0 - 1.0;
  vec2 px; float a;
  if (dm > 0.5) {
    float hs = clamp(rad * SZ * 0.13, 1.2, 9.0), hu = hs / SZ;
    float v = max(length(U.xy) * 38.0, 0.015);
    float sw = 0.74 + 0.52 * (0.5 + 0.5 * sin(n * 0.37 + a0.z) * sin(n * 0.113 + 1.7 + a0.z * 0.5));
    float tgt = mix(texelFetch(uP, ivec2(i, 3), 0).b, texelFetch(uP, ivec2(i + 1, 3), 0).b, f);
    a = tgt * v * 1.5 * rad / (uB[6].y * 2.0 * hu * hu) * sw * alive * ends * uB[6].z;
    px = pos * SZ + pr * cx * hs * 0.8 + nh * cy * hs * 2.4;
    vQ = vec2(cx, cy);
    vS = vec3(-1.0, 0.0, 0.0);
    vC = vec4(P.w, smoothstep(0.24, 0.05, s), 0.0, a);
  } else {
    float near = smoothstep(0.14, 0.5, P.z);
    float span = a1.x * sc * 0.0052 * SZ * (0.58 + 0.42 * abs(fl));
    float len = span * 0.44 + length(vel) * SZ * 0.0045 * (1.0 + cl * 1.5 + 2.5 * smoothstep(0.08, 0.02, s));
    float wing = step(2.6, span * 1.25), big = mix(1.3, 1.25, wing);
    float hw = max(span * big * mix(0.4, 1.0, smoothstep(0.02, 0.08, s)), 0.85), hl = max(len * big, 0.85);
    // inside the smoke a single bat can't be told apart: fade the core out, and everything beyond the point where they turn to haze
    // every bat is drawn: the stream is a crowd of points seen through one another, darker where it is deeper, never a fog
    a = min(mix(0.62, 0.9, wing), span * len * 2.4 / (hw * hl)) * alive * ends * uB[0].w;
    // the far side of the turning column is fainter, seen through more air
    a *= mix(1.0, 0.12 + 0.88 * smoothstep(-0.7, 0.7, dep), (0.35 + 0.65 * uB[7].x) * (1.0 - rb));
    a *= mix(1.0, 0.5 + 0.5 * abs(fl), near);
    float pad = mix(1.0, 1.3, wing);
    px = pos * SZ + pr * cx * hw * pad + nh * cy * hl * pad;
    vQ = vec2(cx, cy) * pad;
    vS = vec3(wing, fl, (a1.w - 0.5) * 0.6 + (fract(a1.y * 29.3) - 0.5) * 0.7);
    vec3 col = mix(uB[1].rgb, uB[2].rgb, P.w);
    // in front of the rock a bat is not black: its wings catch a little of the sky behind the camera, a dim warm flicker (lead, 2026-11-10: was twice as bright and read as a pale fan in the mouth)
    float xr = clamp(uB[6].w > 0.5 ? 1.0 - pos.x : pos.x, 0.0, 1.0) * 254.99; int ir = int(xr);
    float rg = mix(texelFetch(uP, ivec2(ir, 3), 0).r, texelFetch(uP, ivec2(min(ir + 1, 255), 3), 0).r, xr - float(ir));
    col = mix(col, uB[3].rgb * (0.16 + 0.5 * abs(fl)) * (0.7 + 0.6 * fract(a1.y * 17.3)), 0.7 * smoothstep(-0.004, -0.03, pos.y - rg) * smoothstep(0.004, 0.03, s));
    vC = vec4(col, a);
  }
  gl_Position = a < 0.0002 ? vec4(2.0, 2.0, 2.0, 1.0) : vec4(px / SZ * 2.0 - 1.0, 0.0, 1.0);
}`,Fo=w0+`in vec2 vQ; in vec4 vC; in vec3 vS; out vec4 o;
void main(){
  float a;
  if (vS.x < -0.5) {
    a = max(exp(-dot(vQ, vQ) * 3.0) - 0.05, 0.0) * vC.a;
    o = vec4(vC.r * a, vC.g * a, 0.0, a);
  } else {
    if (vS.x < 0.5) { a = max(1.0 - dot(vQ, vQ), 0.0); a *= a * 1.7; }
    else {
      // a wing pose: flap raises or drops the tips, a bank foreshortens one wing, the trailing edge is scalloped
      float sx = vQ.x * (1.0 + vS.z * sign(vQ.x)), x = abs(sx), y = vQ.y - vS.y * 0.5 * x * x - 0.16 * vS.y * x;
      float le = 0.5 + 0.22 * sin(min(x * 2.6, 3.14)) - 0.5 * x * x, te = -0.46 + 0.34 * x + 0.16 * abs(sin(x * 7.0));
      float w = smoothstep(0.0, 0.16, min(le - y, y - te)) * smoothstep(1.0, 0.84, x);
      float b = smoothstep(0.16, 0.08, x) * smoothstep(0.85, 0.5, abs(vQ.y));
      a = max(w, b);
    }
    a = min(a * vC.a, 1.0);
    o = vec4(vC.rgb * a, a);
  }
}`,Lo=w0+`uniform vec4 uM[33]; out vec2 vQ; out vec3 vK;
void main(){
  vec4 a = uM[gl_InstanceID * 2 + 1], b = uM[gl_InstanceID * 2 + 2];
  float cx = float(gl_VertexID & 1) * 2.0 - 1.0, cy = float(gl_VertexID >> 1) * 2.0 - 1.0, SZ = uM[0].x;
  vec2 px = a.xy * SZ + a.zw * cx * b.x + vec2(-a.w, a.z) * cy * b.y;
  vQ = vec2(cx, cy); vK = b.zwx;
  gl_Position = vec4(px / SZ * 2.0 - 1.0, 0.0, 1.0);
}`,_o=w0+`uniform vec4 uM[33]; in vec2 vQ; in vec3 vK; out vec4 o;
float seg(vec2 p, vec2 a, vec2 b, float r0, float r1){ vec2 d = b - a; float k = clamp(dot(p - a, d) / dot(d, d), 0.0, 1.0); return length(p - a - d * k) - mix(r0, r1, k); }
void main(){
  // far silhouettes only. A falcon stoops as a teardrop with its wings folded back into a narrow W and opens them to pull
  // up; an owl is short, round-headed and broad-winged
  float g = clamp(fract(vK.y) * 1.1, 0.0, 1.0), y = abs(vQ.y), d;
  vec2 q = vec2(vQ.x, y);
  if (vK.y < 2.0) {
    d = min(seg(q, vec2(0.62, 0.0), vec2(0.18, 0.0), 0.05, 0.1), seg(q, vec2(0.18, 0.0), vec2(-0.6, 0.0), 0.1, mix(0.02, 0.07, g)));
    vec2 wr = mix(vec2(-0.05, 0.14), vec2(0.16, 0.5), g), tp = mix(vec2(-0.7, 0.2), vec2(-0.18, 0.96), g);
    d = min(d, min(seg(q, vec2(0.2, 0.04), wr, 0.09, 0.06), seg(q, wr, tp, 0.06, 0.006)));
  } else {
    d = min(seg(q, vec2(0.42, 0.0), vec2(-0.45, 0.0), 0.16, 0.08), length(q - vec2(0.4, 0.0)) - 0.15);
    vec2 tp = vec2(-0.15 + 0.12 * g, 0.95);
    d = min(d, seg(q, vec2(0.08, 0.05), tp, 0.2, 0.09));
  }
  float a = smoothstep(0.07, -0.05, d) * vK.x;
  o = vec4(uM[0].gba * a, a);
}`,So=w0+`uniform vec4 uC[13]; uniform sampler2D uBat; uniform sampler2D uS1; uniform sampler2D uS2; uniform sampler2D uCl; uniform sampler2D uLUT; uniform sampler2D uN; uniform sampler2D uP; uniform sampler2D uD; out vec4 o;
float h21(vec2 p){ vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
void main(){
  vec2 fc = gl_FragCoord.xy; float SZ = uC[0].x; vec2 uv = fc / SZ; ivec2 ic = ivec2(fc);
  float hor = uC[0].y, alt = max(uv.y - hor, 0.0) / (1.0 - hor), dx = uv.x - uC[1].x;
  vec3 lt = textureLod(uLUT, vec2(clamp(alt * (1.0 + uC[1].y * dx * dx), 0.0, 1.0) * 0.984 + 0.008, uC[0].z), 0.0).rgb;
  vec3 sky = lt * lt + uC[2].rgb * exp(-dx * dx * 5.5 - alt * alt / uC[2].w);
  vec4 st = textureLod(uCl, uv, 0.0), cl = textureLod(uCl, uv * 0.93 + vec2(0.035 + uC[1].z, 0.035), 0.0);
  float sh0 = h21(floor(uv * 120.0) + 7.0); sky += st.b * st.b * uC[3].w * mix(vec3(1.0, 0.84, 0.66), vec3(0.82, 0.9, 1.0), sh0) * 0.8;
  vec2 dv = (uv - uC[9].xy) * 1000.0; float dv2 = dot(dv, dv);
  sky += uC[4].w * (exp(-dv2 / 3.2) * vec3(2.4, 2.3, 2.1) + exp(-dv2 / 40.0) * vec3(0.035, 0.035, 0.042));
  if (uC[7].w > 0.0) {
    vec2 m = (uv - uC[9].zw) / uC[10].w; float rm = length(m);
    vec4 mt = textureLod(uN, m * 0.17 + 0.37, 0.0), mu = textureLod(uN, m * 0.6 + 0.11, 0.0);
    float limb = sqrt(max(1.0 - rm * rm, 0.0)), tone = 0.62 + 0.55 * smoothstep(0.34, 0.62, mt.r) + 0.14 * (mu.g - 0.5);
    sky = mix(sky, uC[10].rgb * tone * (0.75 + 0.25 * limb), smoothstep(1.0, 0.985, rm) * uC[7].w);
    sky += uC[11].rgb * exp(-max(rm - 1.0, 0.0) * 2.3) * step(1.0, rm) * 0.25 * uC[7].w;
  }
  sky = mix(sky, mix(uC[4].rgb, uC[3].rgb, cl.g) + uC[6].w * vec3(0.8, 0.82, 1.0) * (0.3 + cl.g), cl.r);
  sky = mix(sky, mix(uC[7].rgb, uC[8].rgb, st.a), smoothstep(0.0, 0.08, st.a));
  vec4 s1 = texelFetch(uS1, ic, 0), s2 = texelFetch(uS2, ic, 0), nz = textureLod(uN, uv * 4.7 + vec2(uC[1].z * 9.0, 0.17), 0.0);
  float xm = uC[12].x > 0.5 ? 1.0 - uv.x : uv.x;
  float rk = clamp(xm, 0.0, 1.0) * 254.99; int ri = int(rk);
  float below = mix(texelFetch(uP, ivec2(ri, 3), 0).r, texelFetch(uP, ivec2(ri + 1, 3), 0).r, rk - float(ri)) - uv.y + (nz.g - 0.5) * 0.03;
  vec3 rock = s1.rgb * s1.rgb * uC[5].rgb * (1.0 - smoothstep(uC[5].w * 0.3, uC[5].w, below)) + s2.rgb * s2.rgb * uC[6].rgb;
  // the air between here and the far end of the hill
  rock += uC[7].rgb * 0.007 * exp(-dx * dx * 4.0);
  vec3 col = mix(sky, rock, s1.a);
  // the smoke: Beer's law on the optical depth, the far end taking on the colour of the air in front of it
  vec4 dn = textureLod(uD, uv + (nz.rg - 0.5) * 0.007, 0.0) * uC[12].y;
  float ia = 1.0 / max(dn.a, 1e-4), gq = h21(fc * 1.07 + uC[1].w * 3.1), tau = dn.a * (0.74 + 0.52 * nz.b) * 2.4 * gq * gq, Tr = exp(-tau);
  float hz = clamp(dn.r * ia, 0.0, 1.0), gw = clamp(dn.g * ia, 0.0, 1.0);
  vec3 pc = mix(uC[8].rgb * 0.16 * (1.0 - 0.8 * gw), col * 0.72, hz);
  col = col * Tr + pc * (1.0 - Tr);
  vec4 b = texelFetch(uBat, ic, 0) * (1.0 - 0.8 * smoothstep(1.0, 2.6, tau));
  col = col * (1.0 - min(b.a, 1.0)) + b.rgb;
  col = mix(col, rock, s2.a);
  // veiling glare: shooting into the bright sky lifts the blacks a little on the sun's side
  col += uC[2].rgb * 0.004 * exp(-dx * dx * 3.0) * (1.0 - uv.y * 0.6);
  vec2 vg = uv - 0.5;
  col *= uC[0].w * (1.0 - uC[8].w * dot(vg, vg) * 1.7);
  vec3 sh = 0.62 + 0.38 * (1.0 - exp(-(col - 0.62) / 0.38));
  col = mix(col, sh, step(0.62, col));
  col = pow(max(col, vec3(0.0)), vec3(0.4545));
  col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
  float gr = h21(fc + uC[1].w) + h21(fc.yx + uC[1].w * 1.7) - 1.0;
  o = vec4(col + gr * 0.006, 1.0);
}`;function Re(o,e,p){const w=o.createShader(e);return o.shaderSource(w,p),o.compileShader(w),w}function Do(o){const e={f32:!!o.getExtension("EXT_color_buffer_float"),f16:!!(o.getExtension("EXT_color_buffer_float")||o.getExtension("EXT_color_buffer_half_float"))};o.getExtension("OES_texture_float_linear");const p={h:[bt,wo],seg:[go,Eo],l:[bt,Ao],c:[bt,Ro],bat:[Mo,Fo],sm:[Lo,_o],comp:[bt,So]},w={},k=[];for(const v in p){const A=o.createProgram(),U=Re(o,o.VERTEX_SHADER,p[v][0]),_=Re(o,o.FRAGMENT_SHADER,p[v][1]);o.attachShader(A,U),o.attachShader(A,_),o.linkProgram(A),w[v]=A,k.push([v,U,_])}for(const v of k){const A=w[v[0]];o.getProgramParameter(A,o.LINK_STATUS)||console.error("167 "+v[0]+": "+o.getProgramInfoLog(A)+" / "+o.getShaderInfoLog(v[1])+" / "+o.getShaderInfoLog(v[2]))}const E={},V=(v,A)=>{E[v]={};for(const U of A)E[v][U]=o.getUniformLocation(w[v],U)};V("h",["uH","uN","uP"]),V("seg",["uG"]),V("l",["uL","uT","uN","uP"]),V("c",["uK","uN"]),V("bat",["uB","uP","uR"]),V("sm",["uM"]),V("comp",["uC","uBat","uS1","uS2","uCl","uLUT","uN","uP","uD"]),o.useProgram(w.comp),o.uniform1i(E.comp.uBat,0),o.uniform1i(E.comp.uS1,1),o.uniform1i(E.comp.uS2,2),o.uniform1i(E.comp.uCl,3),o.uniform1i(E.comp.uLUT,4),o.uniform1i(E.comp.uN,5),o.uniform1i(E.comp.uP,6),o.uniform1i(E.comp.uD,7),o.useProgram(w.bat),o.uniform1i(E.bat.uP,0),o.uniform1i(E.bat.uR,1),o.useProgram(w.h),o.uniform1i(E.h.uN,0),o.uniform1i(E.h.uP,1),o.useProgram(w.l),o.uniform1i(E.l.uT,0),o.uniform1i(E.l.uN,1),o.uniform1i(E.l.uP,2),o.useProgram(w.c),o.uniform1i(E.c.uN,0);const L=256,n=new Float32Array(L*L);let J=5369127;const G=()=>{J=J+1831565813|0;let v=Math.imul(J^J>>>15,1|J);return v=v+Math.imul(v^v>>>7,61|v)^v,((v^v>>>14)>>>0)/4294967296};let j=1,c0=0;for(let v=4;v<=128;v*=2){const A=new Float32Array(v*v);for(let _=0;_<A.length;_++)A[_]=G();const U=v/L;for(let _=0,X=0;_<L;_++){const h0=_*U,M0=h0|0,X0=h0-M0,rt=X0*X0*(3-2*X0),I0=M0*v,nt=(M0+1&v-1)*v;for(let st=0;st<L;st++,X++){const wt=st*U,o0=wt|0,e0=wt-o0,d0=e0*e0*(3-2*e0),E0=o0+1&v-1,G0=A[I0+o0]+(A[I0+E0]-A[I0+o0])*d0,Ot=A[nt+o0]+(A[nt+E0]-A[nt+o0])*d0;n[X]+=(G0+(Ot-G0)*rt)*j}}c0+=j,j*=.55}let p0=1e9,n0=-1e9;for(let v=0;v<n.length;v++){const A=n[v];A<p0&&(p0=A),A>n0&&(n0=A)}const g0=new Uint8Array(L*L*4),O=255/(n0-p0);for(let v=0,A=0;v<L;v++)for(let U=0;U<L;U++,A+=4)g0[A]=(n[v*L+U]-p0)*O,g0[A+1]=(n[(U+97&255)*L+(v+31&255)]-p0)*O,g0[A+2]=(n[(255-v+53&255)*L+(U+171&255)]-p0)*O,g0[A+3]=G()*255;const z=o.createTexture();o.bindTexture(o.TEXTURE_2D,z),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,L,L,0,o.RGBA,o.UNSIGNED_BYTE,g0),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.REPEAT);const W=new Float32Array(Xt*8),q0=()=>(G()+G()+G()-1.5)*.82;for(let v=0,A=0;v<Xt;v++,A+=8){W[A]=G(),W[A+1]=(1+.11*q0())/pt,W[A+2]=Math.floor(G()*2)*3.1416+q0()*.85,W[A+3]=Math.sqrt(-Math.log(1-G()*.985))*.62*(G()<.025?1.45:1),W[A+4]=.72+.6*G()*G()+.2*G(),W[A+5]=G(),W[A+6]=G();const U=G();W[A+7]=U*U*U*U*U*U*U*U}const l0=o.createVertexArray(),Q0=o.createBuffer();o.bindVertexArray(l0),o.bindBuffer(o.ARRAY_BUFFER,Q0),o.bufferData(o.ARRAY_BUFFER,W,o.STATIC_DRAW),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,4,o.FLOAT,!1,32,0),o.vertexAttribDivisor(0,1),o.enableVertexAttribArray(1),o.vertexAttribPointer(1,4,o.FLOAT,!1,32,16),o.vertexAttribDivisor(1,1);const Y=o.createVertexArray(),q=o.createBuffer();o.bindVertexArray(Y),o.bindBuffer(o.ARRAY_BUFFER,q),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,4,o.FLOAT,!1,32,0),o.vertexAttribDivisor(0,1),o.enableVertexAttribArray(1),o.vertexAttribPointer(1,4,o.FLOAT,!1,32,16),o.vertexAttribDivisor(1,1);const S0=o.createVertexArray();return o.bindVertexArray(null),{P:w,U:E,ex:e,noise:z,bv:l0,segV:Y,segB:q,empty:S0,segData:new Float32Array(Ae*8)}}function Po(o){let e=Ee.get(o);return e||(e=Do(o),Ee.set(o,e)),e}function L0(o,e,p,w,k,E,V,L,n){const J=o.createTexture();return o.activeTexture(o.TEXTURE0+e),o.bindTexture(o.TEXTURE_2D,J),o.texImage2D(o.TEXTURE_2D,0,p,w,k,0,E,V,L||null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,n),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,n),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),J}const M=(o,e,p)=>{const w=Math.min(1,Math.max(0,(p-o)/(e-o)));return w*w*(3-2*w)},P=(o,e,p)=>o+(e-o)*p,_0=(o,e,p,w)=>{let k=0;for(;k<o.length-2&&e>o[k+1][0];)k++;const E=o[k],V=o[k+1],L=Math.min(1,Math.max(0,(e-E[0])/(V[0]-E[0])));p[w]=E[1]+(V[1]-E[1])*L,p[w+1]=E[2]+(V[2]-E[2])*L,p[w+2]=E[3]+(V[3]-E[3])*L},ko=[[0,1.8,.92,.38],[.14,1.7,.72,.22],[.3,1.2,.34,.08],[.5,0,0,0],[1,0,0,0]],Bo=[[0,.17,.16,.25],[.3,.11,.108,.18],[.6,.05,.055,.1],[.85,.012,.015,.032],[1,.0045,.0055,.013]],Co=[[0,1.15,.62,.42],[.2,1.02,.46,.3],[.4,.52,.17,.16],[.6,.11,.05,.09],[.8,.012,.011,.024],[1,.0035,.004,.009]],Uo=[[0,.27,.21,.27],[.2,.15,.115,.17],[.4,.05,.035,.09],[.6,.012,.012,.035],[1,.0016,.002,.0048]],No=[[0,.62,.22,.04],[.3,.42,.1,.02],[.55,.09,.02,.008],[.8,0,0,0],[1,0,0,0]],Ho=[[0,.52,.27,.22],[.3,.2,.1,.12],[.6,.028,.02,.034],[1,.002,.0025,.005]],qo=[[0,.1,.055,.08],[.3,.035,.024,.04],[.6,.006,.006,.012],[1,7e-4,8e-4,.0016]],Xo=[[0,.012,.0085,.011],[.4,.005,.004,.006],[1,5e-4,6e-4,.0012]],Io=[[0,.17,.09,.09],[.2,.11,.055,.07],[.4,.045,.025,.04],[.6,.01,.008,.016],[.8,.0025,.0025,.005],[1,9e-4,.001,.0024]],yt=[0,.1,.25,.45,.7,1],It=[[0,[[1.3,.62,.17],[1.14,.44,.13],[.86,.3,.17],[.52,.26,.29],[.27,.2,.33],[.13,.125,.28]]],[.2,[[1.08,.38,.09],[.84,.26,.09],[.5,.17,.14],[.27,.15,.24],[.12,.1,.21],[.065,.065,.15]]],[.4,[[.62,.17,.05],[.38,.115,.07],[.17,.07,.125],[.07,.048,.145],[.03,.032,.11],[.015,.021,.075]]],[.6,[[.2,.058,.032],[.1,.038,.048],[.04,.026,.06],[.018,.018,.055],[.009,.012,.04],[.005,.008,.026]]],[.8,[[.034,.03,.03],[.017,.017,.024],[.009,.008,.02],[.005,.006,.018],[.003,.004,.013],[.002,.003,.009]]],[1,[[.011,.015,.019],[.0065,.0085,.0125],[.0035,.004,.009],[.0025,.003,.007],[.002,.0025,.006],[.0015,.002,.005]]]],Go=[[0,[[.17,.17,.27],[.5,.33,.42],[.9,.5,.5],[.52,.38,.52],[.25,.26,.46],[.12,.16,.36]]],[.2,[[.1,.1,.18],[.28,.19,.27],[.5,.26,.32],[.27,.2,.34],[.12,.13,.3],[.06,.08,.22]]],[.4,[[.05,.05,.1],[.09,.07,.12],[.13,.08,.14],[.08,.06,.15],[.04,.045,.12],[.02,.03,.09]]],[.6,[[.02,.022,.05],[.024,.024,.055],[.024,.022,.06],[.018,.02,.055],[.012,.015,.045],[.007,.01,.032]]],[.8,[[.008,.009,.02],[.008,.009,.021],[.007,.008,.02],[.006,.007,.018],[.005,.006,.015],[.004,.005,.012]]],[1,[[.0045,.005,.011],[.0045,.005,.011],[.004,.0048,.0105],[.0036,.0044,.0095],[.003,.0038,.0085],[.0026,.0034,.0075]]]],Oo=It.slice(0,2).concat([[.4,[[.12,.19,.25],[.07,.12,.21],[.042,.074,.18],[.027,.048,.155],[.017,.031,.12],[.01,.02,.085]]],[.6,[[.045,.07,.1],[.026,.043,.085],[.016,.028,.075],[.011,.019,.062],[.007,.012,.045],[.004,.008,.03]]]],It.slice(4));function zo(o,e,p,w,k){const L=new Float32Array(8192),n=[0,0,0];for(let J=0,G=0;J<32;J++){const j=J/31;let c0=0;for(;c0<o.length-2&&j>o[c0+1][0];)c0++;const p0=(j-o[c0][0])/(o[c0+1][0]-o[c0][0]),n0=o[c0][1],g0=o[c0+1][1];for(let O=0;O<64;O++,G+=4){const z=O/63*k;let W=0;for(;W<yt.length-2&&z>yt[W+1];)W++;const q0=M(yt[W],yt[W+1],z);for(let Y=0;Y<3;Y++){const q=P(n0[W][Y],n0[W+1][Y],q0),S0=P(g0[W][Y],g0[W+1][Y],q0);let v=q*Math.pow(S0/q,p0);v*=(Y===2?p:1)*P(1,w,z),Y===1&&(v*=e),n[Y]=v}const l0=n[0]*.3+n[1]*.55+n[2]*.15,Q0=.93*M(.1,.6,z)+(1-M(.1,.6,z));for(let Y=0;Y<3;Y++)L[G+Y]=Math.sqrt(Math.max(l0+(n[Y]-l0)*Q0,0));L[G+3]=1}}return L}const ot=[[0,-.012,.135,.36,0,.026,.45,0,.2],[.012,0,.205,1.1,0,.036,.4,0,.5],[.05,.008,.3,.82,0,.064,.3,0,1.2],[.15,.024,.42,.48,0,.086,.34,0,1.55],[.27,.03,.54,.33,.02,.092,.42,0,1.45],[.38,.066,.64,.25,.05,.104,.48,0,1.3]],Gt=[[.45,.21,.07,.06,.2,.72,.6],[.5,.17,.12,.04,.2,1,0],[.56,.135,.18,.031,.2,1,0],[.64,.1,.26,.024,.2,1,0],[.71,.075,.35,.018,.2,1,0],[.78,.055,.46,.0135,.2,1,0],[.85,.04,.58,.0095,.2,1,0],[.91,.03,.7,.0065,.2,1,0],[.96,.022,.8,.0042,.2,1,0],[1,.016,.9,.0028,.2,1,0]],Ko=[[[.47,.69],[.575,.705],[.68,.685],[.77,.64],[.835,.625],[.885,.595],[.925,.56],[.955,.54],[.975,.53],[.992,.522]],[[.48,.675],[.59,.665],[.695,.625],[.78,.6],[.845,.585],[.895,.55],[.93,.525],[.958,.51],[.977,.498],[.993,.49]],[[.47,.7],[.575,.73],[.68,.72],[.765,.67],[.83,.655],[.88,.63],[.92,.59],[.95,.565],[.972,.555],[.99,.548]]],Vo=.13,jo=[[.565,.72],[.6,.79],[.645,.845],[.7,.885],[.76,.9],[.82,.893],[.875,.865],[.925,.825],[.965,.775],[.995,.725]],at=null,Tt=null,Me=null,Zo=0,Wo=[[.47,.9],[.56,.905],[.65,.897],[.735,.884],[.81,.868],[.87,.852],[.915,.837],[.952,.822],[.976,.81],[.993,.8]],Qo=[[0,.5],[.012,1],[.05,1.7],[.1,2.7],[.15,4],[.27,3.4],[.38,2.6],[.5,2.1],[.64,1.5],[.78,1.15],[.9,.7],[1,.2]],Yo=[[0,.5],[.1,1.4],[.22,2.1],[.4,2.4],[.55,2.2],[.67,1.2],[.71,.5],[.745,.3],[1,.2]],Jo=[.048,.04,.033,.027,.022,.017,.013,.0092,.0062,.004],Fe=(o,e,p,w,k)=>.5*(2*e+(p-o)*k+(2*o-5*e+4*p-w)*k*k+(3*e-o-3*p+w)*k*k*k);ge.add({num:167,name:"Bats at Dusk",fam:"Worlds",recipe:"A cave mouth at dusk, with bats pouring out in a spiral and streaming off over the land in a ribbon. The cave, the hour and the path the ribbon takes change every mint. Tap to send a falcon diving in and a kink runs down the ribbon, drag to push it with wind, or hold to bring the night on faster.",interactive:"Tap to send a falcon down at that point: the column dents and a kink runs along the ribbon. Drag to push the stream with wind. Hold to bring the night on faster.",music:!0,gl:!0,fps:30,seed:50,make(o){const e=o.gl,p=o.size,w=Po(e),k=w.P,E=w.U,V=w.ex;let L=-2128831035;for(let t=2;t<o.hash.length;t++)L^=o.hash.charCodeAt(t),L=Math.imul(L,16777619);const n=()=>{L=L+1831565813|0;let t=Math.imul(L^L>>>15,1|L);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},J=t=>{let a=n(),r=0;for(;r<t.length-1&&a>=t[r][1];)a-=t[r][1],r++;return t[r][0]},G=J([["limestone arch",.52],["jungle-hung mouth",.34],["desert canyon slot",.14]]),j=J([["clear orange",.42],["cloud-streaked",.46],["storm-lit",.12]]),c0=J([["steady stream",.46],["pulsing waves",.42],["double ribbon",.12]]),p0=J([["hawks",.62],["falcon pair",.26],["owl at dark",.12]]),n0=J([["high summer",.42],["spring",.3],["first frost",.28]]),g0=J([["none",.87],["rising full moon",.13]]),O=g0!=="none",z=n()<.34?1:0,W=Math.floor(n()*3),q0=.11+n()*n()*.22;o.trait("Cave",G),o.trait("Sky",j),o.trait("Flow",c0),o.trait("Predator",p0),o.trait("Season",n0),o.trait("Moon",g0);let l0=-1640531535;for(let t=o.hash.length-1;t>=2;t--)l0^=o.hash.charCodeAt(t),l0=Math.imul(l0,16777619);const Q0=()=>{l0=l0+1831565813|0;let t=Math.imul(l0^l0>>>15,1|l0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Y=(t=>t<.4?"falling away":t<.64?"high arc":t<.86?"low over the ridge":"towering column")(Q0());let q=Y;Q0()<.12&&(q="still circling"),at&&(q=at),o.home&&(q="falling away");const S0=n(),v=n(),A=n()*40,U=G==="limestone arch",_=G==="jungle-hung mouth",X=G==="desert canyon slot";let h0=668265263;for(let t=2;t<o.hash.length;t++)h0^=o.hash.charCodeAt(t),h0=Math.imul(h0,1540483477),h0^=h0>>>13;const M0=()=>{h0=h0+1831565813|0;let t=Math.imul(h0^h0>>>15,1|h0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},X0=M0(),rt=M0(),I0=M0(),nt=M0(),st=M0(),wt=M0();let o0=X0<.17?"beyond the ridge":X0<.37?X?"at the mouth":"back from the cave":X0<.49&&U?"under the saddle":"at the mouth",e0=rt<.24?"sun just down":rt<.64?"dusk":rt<.92?"afterglow":"blue hour";Tt&&!o.home&&(o0=Tt),Me&&!o.home&&(e0=Me),(o.home||j==="storm-lit")&&(o0="at the mouth",e0="dusk"),e0==="blue hour"&&_&&(e0="afterglow"),e0==="sun just down"&&O&&(e0="dusk");let d0=-626627285;for(let t=2;t<o.hash.length;t++)d0^=o.hash.charCodeAt(t),d0=Math.imul(d0,1540483477),d0^=d0>>>15;const E0=()=>{d0=d0+1831565813|0;let t=Math.imul(d0^d0>>>15,1|d0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},G0=E0(),Ot=E0(),Le=E0(),gt=E0(),O0=E0(),z0=E0(),zt=E0(),Kt=E0();!o.home&&!(j==="storm-lit"&&q==="still circling")&&(G0<.15?o0="under the stream":j==="storm-lit"&&(o0=G0<.4?"beyond the ridge":G0<.6?X?"at the mouth":"back from the cave":G0<.7&&U?"under the saddle":"at the mouth"),Ot<.18&&q!=="still circling"&&(q="a low river")),Tt&&!o.home&&(o0=Tt),at&&!o.home&&(q=at);const $o=o0==="beyond the ridge",it=o0==="back from the cave",Et=o0==="under the saddle",m0=o0==="under the stream",a0=$o||m0,C0=q==="a low river"&&!m0,Vt=a0?Zo||(Le<.35?1:Le<.6?2:0):0;a0&&q==="still circling"&&!at&&(q=Y),o.trait("Path",q),o.trait("View",o0),o.trait("Hour",e0);const t1=e0==="sun just down"?.01+.025*I0:e0==="afterglow"?.34+.04*I0:e0==="blue hour"?.45+.03*I0:q0,_e=q==="towering column"?1:0,ct=q==="high arc"?1:0,Se=q==="low over the ridge"&&!m0,e1=ct?jo:_e?Wo:Ko[W],De=.1+.06*zt,At=X?.33+n()*.08:_?.36+n()*.06:.29+n()*.07;let $=At,U0=.045,Y0=X?.05:_?.2:.205,K0=X?.4:_?.28:.3;const s0=it?.55+.1*wt:1,Pe=.04;it?($=At+.1,Y0*=s0,K0*=s0,U0=Pe+U0*s0):Et?($=.44+nt*.05,Y0=.14+st*.03,K0=.19):a0&&(U0=-1);const jt=[];for(let t=0;t<40;t++)jt.push(n());const t0=t=>{const a=t*12.7+30,r=Math.floor(a),i=a-r,l=i*i*(3-2*i);return P(jt[(r%40+40)%40],jt[((r+1)%40+40)%40],l)-.5},ke=t=>{let a;if(Et){const u=t-$+.02;a=.31+.25*M(-.05,-.3,u)+.15*M(.05,.3,u)-.06*M(.36,.56,u)}else X?a=.54-.02*t-.36*M(.45,.95,t):_?a=.52-.04*t-.38*t*t:a=.46-.04*t-.34*t*t+.07*M(.26,0,t);a+=t0(t*.33)*.045+t0(t*1.1+3)*.024;const r=.03,i=a/r+t0(t*1.9+13)*1.3,l=Math.floor(i),y=i-l;return a=P(a,(l+M(.5,.9,y))*r,.55),a+t0(t*3.1+7)*.008+t0(t*8.3+11)*.004+t0(t*21+3)*.0016},J0=(t,a,r)=>{const i=(t-a)/r;return Math.exp(-i*i)},Zt=t=>t0(t*3.1+7)*.01+t0(t*8.3+11)*.005+t0(t*21+3)*.002,Be=.15+.045*O0,Ce=.108+.03*z0,Wt=$-.012,Ue=gt<.5,x0=Vt===1?t=>.092+.014*gt+.06*(1-t)+(.14+.03*O0)*J0(t,.02+.04*z0,.2)+.04*J0(t,.43+.06*z0,.09)+.026*J0(t,.7+.07*gt,.07)+t0(t*1.1+3)*.018+Zt(t):Vt===2?t=>.07+(Ue?Be:Ce)*J0(t,Wt-.2-.05*z0,.13)+(Ue?Ce:Be)*J0(t,Wt+.22+.05*O0,.15)+.02*(1-J0(t,Wt,.4))+t0(t*1.1+3)*.012+Zt(t):a0?t=>.158-.022*t+t0(t*.33)*.05+t0(t*1.1+3)*.03+Zt(t):it?t=>Math.max(Pe+s0*(ke(At+(t-$)/s0)-.42*M(-.1,-.7,At+(t-$)/s0)),.055+.012*t0(t*2.3+5)+.004*t0(t*9.1+2)):ke,K=[],Ne=$-.33+(n()-.5)*.02,o1=a0?x0($-.012)-.016-.135:it?U0+.3*K0-.135:0,a1=X?.07:0,Rt=q==="still circling"?1:0;for(const t of ot){const a=t.slice();if(Rt&&(a[0]=t[0]*2.25,a[2]=.135+(a[2]-.135)*1.12,a[5]*=1+1.1*t[0]/.38,a[8]*=1.25,a[6]*=.6),_e&&(a[2]=.135+(a[2]-.135)*(t[0]<.05?1.32:1.5),a[5]*=1.12,t[0]>=.05&&(a[1]=.3*t[1])),ct&&t[0]>=.05){const r=(t[0]-.05)/.33;a[1]+=De*(1-(1-r)*(1-r)),a[8]*=.4,a[5]*=.7}a[1]+=.33+Ne,a[2]+=a1*(1-M(.05,.3,t[0])),X&&t[0]<.06&&(a[5]*=.58),a[2]+=o1*(1-M(.05,.38,t[0])),it&&t[0]<.06&&(a[5]*=.5+.5*s0),K.push(a)}if(C0||Se){const t=K[0][2],a=K[ot.length-1][1],r=K[ot.length-1][2];let i=0;for(let h=a-.08;h<=a+.1;h+=.005)i=Math.max(i,x0(h));const l=Math.min(1,(i+(a0?.08:0)+(C0?.055+.025*gt:.05+.02*zt)-t)/(r-t));K.forEach((h,T)=>{h[0]*=C0?.55:.7,T&&(h[2]=t+(h[2]-t)*l),h[5]*=.6+.4*l});const y=.22+.05*O0,u=z0*6.283,f=K[ot.length-1],s=.05+.03*Kt,x=h=>Math.max(x0(h-.02),x0(h),x0(h+.02));Gt.forEach((h,T)=>{const g=[0,.201,.402,.575,.699,.795,.872,.929,.967,1][T],F=P(f[1]+.05,1.035,g)+(n()-.5)*.01*(1-g),R=C0?Jo[T]:h[3],c=(C0?Math.max(x(F)+.055+1.3*R,y+.013*Math.sin(g*6.283+u)):x(F)+s+R+(a0?.07:0))+(n()-.5)*.006*(1-g);K.push([C0?.25+(h[0]-.45)/.55*.75:.3+(h[0]-.45)/.55*.7,F,Math.min(c,P(f[2]-.01,9,T/9)),h[1],h[2],R,h[4],h[5],h[6]])})}else if(m0){K.length=0;const t=$-.012,a=q==="low over the ridge"?0:q==="high arc"?1:q==="towering column"?2:q==="a low river"?3:4,r=Math.min([.3,.43,.36,.41,.38][a]+.04*(zt-.5),.86-t),i=[.07,.075,.045,.06,.065][a]*(.85+.3*Kt),l=a?[-.08-.05*O0,1.05+.04*z0]:[-.08,.5+.3*O0],y=a?.45:.32,u=1.5+.3*O0,f=b=>Math.max(x0(b-.02),x0(b),x0(b+.02)),s=z0*6.283,x=(b,C,i0,T0,Q,I)=>K.push([b,C,i0,T0,Q,I,.2,1,0]);let h=0,T=0;for(let b=0;b<=5;b++){const C=b/5,i0=b?(n()-.5)*.006:(n(),0),T0=(n()-.5)*.004*C,Q=t+r*C+i0,I=b?Math.max(f(Q)+.032+.038*C,.285+.025*C)+.012*Math.sin(C*3.1416+s)+T0:Math.max(f(Q)+.012,.268);x(.11*b,Q,I,P(.03,.07,C),P(.6,.35,C),P(.004,.012,C)),h=Q,T=I}let g=2.4;for(let b=0;b<4;b++){const C=h+i*Math.sin(g),i0=T+i-i*Math.cos(g);g=Math.atan2(l[1]-i0,l[0]-C)}for(let b=1;b<=3;b++){const C=g*b/3;x(.55+.04*b,h+i*Math.sin(C)+(n()-.5)*.004,T+i-i*Math.cos(C)+(n()-.5)*.004,.07+.01*b,.35-.03*b,.012+.006*b)}const F=K[K.length-1][1],R=K[K.length-1][2],c=-(l[1]-R),H=l[0]-F,B=Math.hypot(c,H),Z=(.03+.02*Kt)*(a&1?1:-1);[[.15,.69,.16,.18,.055],[.33,.705,.4,.1,.12],[.55,.718,.75,.04,.22],[.78,.731,.92,0,.34],[1,.745,1,0,1],[1.6,.8,1,0,1.2],[3,.9,1,0,1.4],[5,1,1,0,1.6]].forEach(([b,C,i0,T0,Q],I)=>{const f0=(I?0:(n()-.5)*.004+(n()-.5)*.002)+Z*Math.sin(Math.min(b,1)*3.1416);x(C,P(F,l[0],b)+f0*c/B,P(R,l[1],b)+f0*H/B,i0>.5?u*i0:i0,T0,Q>.5?y*Q:Q)})}else Rt?Gt.forEach((t,a)=>{const r=K[ot.length-1],i=a/9;K.push([.875+.125*i,r[1]+.06*i+(n()-.5)*.01,r[2]+.05+.2*i+(n()-.5)*.01,t[1]*.8+.06,t[2],t[3]*1.6,t[4],t[5]*.5*i,1.3*(1-i)])}):Gt.forEach((t,a)=>{const r=e1[a],i=M(1,.45,t[0]);K.push([t[0],r[0]+(Ne+ct*(De-Vo))*i+(n()-.5)*.02*(1-t[0]),r[1]+(n()-.5)*.03*(1-t[0]),t[1],t[2],t[3]*(ct?.7:1),t[4],t[5],t[6]*(ct?.4:1)])});const r0=new Float32Array(d*4*4),D0=new Float32Array(d),P0=new Float32Array(d),Qt=new Float32Array(d),Yt=new Float32Array(d),Jt=new Float32Array(d),He=c0==="double ribbon";let qe=m0?1.75:0,V0=0;for(let t=0;t<d;t++){const a=t/(d-1);for(;V0<K.length-2&&a>K[V0+1][0];)V0++;const r=K[Math.max(V0-1,0)],i=K[V0],l=K[V0+1],y=K[Math.min(V0+2,K.length-1)],u=Math.min(1,(a-i[0])/(l[0]-i[0])),f=u*u*(3-2*u),s=Fe(r[1],i[1],l[1],y[1],u),x=Fe(r[2],i[2],l[2],y[2],u),h=z?1-s:s;D0[t]=h,P0[t]=x,Qt[t]=P(i[3],l[3],u);const T=P(i[8],l[8],f);qe+=T*pt/(d-1);const g=t*4;r0[g]=h,r0[g+1]=x,r0[g+2]=Qt[t],r0[g+3]=P(i[4],l[4],u),r0[d*4+g]=P(i[5],l[5],f),r0[d*4+g+1]=qe,r0[d*4+g+2]=P(i[6],l[6],f),r0[d*4+g+3]=P(i[7],l[7],f);const F=He?M(.4,.62,a)*(m0?.3:1):0;r0[d*8+g+2]=(z?1:-1)*F*(.05+.26*M(.55,1,a))*(a>.9?1-.3*(a-.9):1),r0[d*8+g+3]=-F*(.17*M(.4,.7,a)*(1-.72*M(.7,1,a)))}const Xe=[];for(let t=0,a=4+Math.floor(n()*4);t<a;t++)Xe.push([n(),(n()-.5)*.08]);const Ie=t=>{let a=t0(t*.21+5)*.06+t0(t*.7+2)*.02;for(const r of Xe)a+=r[1]*M(r[0]-.005,r[0]+.005,t);return a},Mt=new Float32Array(d);for(let t=0;t<d;t++)Mt[t]=n();for(let t=0;t<d;t++){const a=Math.max(t-1,0),r=Math.min(t+1,d-1),i=t*4+d*8,l=(d-1)/pt/(r-a),y=(D0[r]-D0[a])*l,u=(P0[r]-P0[a])*l,f=Math.hypot(y,u)+1e-6;r0[i]=y,r0[i+1]=u,Yt[t]=-u/f,Jt[t]=y/f;const s=t/(d-1),x=Rt?s<.855?s/2.25:.38+(s-.855)/.145*.62:C0?s<.209?s/.55:.38+(s-.209)/.791*.62:Se?s<.266?s/.7:.38+(s-.266)/.734*.62:s,h=m0?Yo:Qo;let T=0;for(;T<h.length-2&&x>h[T+1][0];)T++;const g=d*12+t*4,F=h[T],R=h[T+1];r0[g]=x0(s),r0[g+1]=Ie(s),r0[g+2]=P(F[1],R[1],M(F[0],R[0],x))*(C0?1+.4*M(.3,.5,x):1),r0[g+3]=Mt[t]}e.bindVertexArray(w.empty);const Ft=L0(e,1,e.RGBA32F,d,4,e.RGBA,e.FLOAT,r0,e.NEAREST);e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),e.viewport(0,0,p,p);const r1=V.f16?e.RGBA16F:e.RGBA8,n1=V.f16?e.HALF_FLOAT:e.UNSIGNED_BYTE,Ge=e.createFramebuffer(),$t=L0(e,2,r1,p,p,e.RGBA,n1,null,e.LINEAR);e.bindFramebuffer(e.FRAMEBUFFER,Ge),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,$t,0),e.useProgram(k.h),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,w.noise),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Ft);const j0=X?[16,-.2,.012,.022]:_?[8.5,.1,.014,.004]:[9+n()*3,.07,.012,.003];j0[0]/=s0,e.uniform4fv(E.h.uH,new Float32Array([p,z,S0,v,$,U0,Y0,K0,j0[0],j0[1],j0[2],j0[3],.2,.05,X?.1:.13,a0?.012:.05])),e.drawArrays(e.TRIANGLES,0,3);const k0=w.segData;let Lt=0;const Z0=(t,a,r,i,l,y,u,f)=>{if(Lt>=Ae)return;const s=Lt++*8;k0[s]=t,k0[s+1]=a,k0[s+2]=r,k0[s+3]=i,k0[s+4]=l,k0[s+5]=y,k0[s+6]=u,k0[s+7]=f},te=.72,ee=.4,oe=1,s1=t=>{const a=(t-$)/Y0,r=1-a*a;return r>0?U0+K0*Math.sqrt(r):-1},Oe=(t,a,r,i,l,y,u)=>{let f=-Math.PI/2+(n()-.5)*.35,s=t,x=a;const h=Math.max(5,Math.round(r/.012));for(let T=0;T<h;T++){f+=(n()-.5)*.3+(-Math.PI/2-f)*.12;const g=r/h,F=s+Math.cos(f)*g+l*g,R=x+Math.sin(f)*g,c=T/h,H=(T+1)/h;if(Z0(s,x,F,R,i*(1-.72*c),i*(1-.72*H),.92,y),u&&n()<.8)for(let B=0;B<2;B++){const Z=-Math.PI/2+(n()-.5)*2.6,b=.004+n()*.007;Z0(F,R,F+Math.cos(Z)*b,R+Math.sin(Z)*b,.0012,.0024+n()*.001,.93,te)}T>2&&n()<.05&&r>.05&&Oe(F,R,r*(1-c)*.5,i*(1-c)*.6,l+(n()-.5),y,u),s=F,x=R}},i1=Math.round((X?4:_?60:9)*s0);for(let t=0;t<i1;t++){const a=$+(n()*2-1)*Y0*.95,r=s1(a)-.002;if(r<0)continue;const i=n();Oe(a,r,(_?.05+.2*i*i:.02+.09*i*i*i)*s0,(i>.75?.0017:9e-4)*(_?1.2:1)*(.4+.6*s0),(n()-.5)*.5,ee,_&&n()<.55)}const c1=n0!=="first frost"||_,A0=()=>(n()+n()+n()-1.5)*.8,_t=(t,a,r,i,l)=>{const y=2+Math.floor(n()*5);for(let u=0;u<y;u++){let f=Math.PI/2+A0()*1.5+i,s=t+A0()*r*.2,x=a;const h=2+Math.floor(n()*4),T=r*(.2+n()*.3);let g=6e-4+r*.018;for(let F=0;F<h;F++){f+=A0()*.9;const R=s+Math.cos(f)*T,c=x+Math.sin(f)*T*l;if(Z0(s,x,R,c,g,g*.72,.9,ee),g*=.72,c1&&F>=h-2){const H=5+Math.floor(r*(500+n()*900)),B=r*(.12+.36*n());for(let Z=0;Z<4;Z++){const b=R+A0()*B*.8,C=c+A0()*B*.42;Z0(b,C,b+A0()*B*.5,C+A0()*B*.3,B*.14,B*.09,.91,te)}for(let Z=0;Z<H;Z++){const b=R+A0()*B,C=c+A0()*B*.62*l,i0=n()*6.283,T0=r*(.012+.03*n())+.0012;Z0(b,C,b+Math.cos(i0)*T0,C+Math.sin(i0)*T0,T0*(.3+.5*n()),T0*.25,.91,te)}}s=R,x=c}}},ae=t=>t0(t*.63+21)+.6*t0(t*2.3+9),l1=Math.round((X?7:_?90:11)*(a0?_?1.5:X?2.6:3.6:1));for(let t=0,a=0;t<l1&&a<400;a++){const r=n();if(ae(r)<(_?-1:a0&&!X?-.22:.04))continue;const i=_||X?n()*n()*n():n()*n();let l=_?.018+i*.1:X?.008+i*.02:.012+i*.05;a0&&(l*=1.25*(1+(m0?.3:1.4)*Math.exp(-Math.pow((r-$)/.09,2)))),_t(r,x0(r)-.003,l*s0,(n()-.5)*.5-.25,_?.9:.7),t++}if(a0)for(let t=0,a=4+Math.floor(n()*4);t<a;t++){const r=t<2&&!m0?$-.012+(t?.03:-.026)+(n()-.5)*.016:n();_t(r,x0(r)-.004,((X?.045:.06)+n()*.05)*(Vt===1&&!m0?1+.9*M(.45,.05,r):1)*(m0?.7:1),(n()-.5)*.3,X?.8:1)}const re=(t,a,r,i,l,y,u)=>{const f=t+i*r*.45,s=a+r*.6,x=t+i*r*1.2,h=a+r*.92;Z0(t,a,f,s,l,l*.72,u,y),Z0(f,s,x,h,l*.72,l*.25,u,y)};for(let t=0;t<900;t++){const a=n(),r=ae(a);if(r<.02&&n()<.92)continue;const i=n();re(a,x0(a)-.002,(.003+i*i*i*.024*(.5+r))*s0,(n()-.5)*1.2-.12,7e-4+n()*5e-4,X&&n()<.7?ee:oe,.88)}const u1=j0[0],f1=j0[1],St=[];{let t=null;for(let a=-.5;a<1.4;a+=.0015){let r=a*u1;r+=.5*Math.sin(r*.71+S0*6)+.22*Math.sin(r*1.93+v*9);const i=Math.floor(r);t!==null&&i!==t&&i>-64&&i<180&&Mt[i+63&255]>Mt[i+64&255]+.12&&St.push(a),t=i}}const h1=St.length&&!a0?X?8:_?110:44:0;for(let t=0,a=0;t<h1&&a<900;a++){const r=n(),i=St[Math.floor(n()*St.length)]-f1*r-Ie(r),l=x0(r);if(i<.02||i>l-.012||ae(r*1.7+i*3)<-.04||Math.hypot((r-$)/Y0,(i-U0)/K0)<1.06)continue;t++;const u=n()*n();_t(r,i,((_?.012:.006)+u*(_?.045:.021))*s0,(n()-.5)*.5,.55);const f=Math.floor(n()*12);for(let s=0;s<f;s++)re(r+A0()*.02*s0,i-.001,(.003+n()*n()*.012)*s0,(n()-.5)*1.3,5e-4,oe,.86)}const d1=9+Math.floor(n()*6);for(let t=0;t<d1;t++){const a=n(),r=.018+n()*n()*.075,i=8+Math.floor(n()*34);_t(a,-.006,r*.8,(n()-.5)*.6,.62);for(let l=0;l<i;l++)re(a+A0()*r*1.3,-.005,r*(.3+n()*.9),(n()-.5)*1.1,9e-4+n()*.0012,oe,.95)}e.enable(e.BLEND),e.blendEquation(e.MAX),e.blendFunc(e.ONE,e.ONE),e.useProgram(k.seg),e.uniform4f(E.seg.uG,p,z,0,0),e.bindVertexArray(w.segV),e.bindBuffer(e.ARRAY_BUFFER,w.segB),e.bufferData(e.ARRAY_BUFFER,k0.subarray(0,Lt*8),e.STREAM_DRAW),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Lt),e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND),e.bindVertexArray(w.empty);const lt=O?[.66,.28,.7]:X?[.95,.2,.24]:[.96,.15,.22];z&&(lt[0]=-lt[0]);const B0=a0?[.085,.07,.055,.065,.055,.04,.075,.055,.035]:X?[.66,.3,.15,.4,.16,.085,.82,.48,.22]:_?[.36,.33,.25,.2,.21,.16,.27,.31,.12]:[.64,.52,.38,.4,.32,.24,.55,.31,.14],ne=n0==="spring"?[.2,.28,.07]:n0==="first frost"?_?[.17,.17,.06]:[.46,.2,.05]:[.1,.17,.05],se=new Float32Array([p,0,p<400?12:22,.36,lt[0],lt[1],lt[2],1.9,B0[0],B0[1],B0[2],z,B0[3],B0[4],B0[5],U0,B0[6],B0[7],B0[8],K0,ne[0],ne[1],ne[2],1,.115,.09,.07,1,n0==="first frost"?.42:.3,n0==="first frost"?.3:.27,.1,.12]),ze=L0(e,2,e.RGBA8,p,p,e.RGBA,e.UNSIGNED_BYTE,null,e.NEAREST),Ke=L0(e,2,e.RGBA8,p,p,e.RGBA,e.UNSIGNED_BYTE,null,e.NEAREST);e.useProgram(k.l),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,$t),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,w.noise),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Ft),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ze,0),e.uniform4fv(E.l.uL,se),e.drawArrays(e.TRIANGLES,0,3),se[1]=1,e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Ke,0),e.uniform4fv(E.l.uL,se),e.drawArrays(e.TRIANGLES,0,3),e.deleteTexture($t);const ie=O?z?.8:.2:Et?z?.94-$:$+.06:z?.22:.78,m1=j==="clear orange"?.3:j==="cloud-streaked"?.82:.66,Ve=L0(e,2,e.RGBA8,p,p,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Ve,0),e.useProgram(k.c),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,w.noise),e.uniform4fv(E.c.uK,new Float32Array([p,m1,2.6+n()*1.6,j==="storm-lit"?1:0,(ie-.5)*.06,-.05,1,A,a0?.245:.178,a0?.226:.148,a0?.207:.112,ie-.03,.015,.022,.026,0])),e.drawArrays(e.TRIANGLES,0,3);const x1=L0(e,4,e.RGBA16F,64,32,e.RGBA,e.FLOAT,zo(O?Go:e0==="blue hour"?Oo:It,j==="storm-lit"?.82:j==="clear orange"?1.08:1,j==="storm-lit"?.82:j==="clear orange"&&e0!=="blue hour"?.8:1,j==="storm-lit"?.62:1,e0==="sun just down"&&!O?.62:1),e.LINEAR),je=V.f16?e.RGBA16F:e.RGBA8,Ze=V.f16?e.HALF_FLOAT:e.UNSIGNED_BYTE,ce=L0(e,2,je,p,p,e.RGBA,Ze,null,e.NEAREST);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ce,0);const ut=p>>1,We=L0(e,2,je,ut,ut,e.RGBA,Ze,null,e.LINEAR),b0=new Float32Array(d),y0=new Float32Array(d),$0=new Float32Array(d),tt=new Float32Array(d),ft=new Float32Array(d),ht=new Float32Array(d),Qe=new Float32Array(d),le=new Float32Array(d),N0=new Float32Array(d*2*4),Ye=new Float32Array(d);for(let t=0;t<d;t++){const a=Math.sin(t*12.9898+4.1)*43758.5453;Ye[t]=.25+.5*(a-Math.floor(a))}const v1=L0(e,5,e.RGBA32F,d,2,e.RGBA,e.FLOAT,N0,e.NEAREST),Je=new Float32Array(d),ue=new Float32Array(d),$e=new Float32Array(d),to=new Float32Array(d),eo=new Float32Array(d),oo=new Float32Array(d),Dt=n()*6.28;for(let t=0;t<d;t++){const a=t/(d-1),r=11+11*M(.35,1,a);Je[t]=r*r,ue[t]=M(.2,.46,a),$e[t]=Math.sin(a*11+Dt),to[t]=Math.cos(a*11+Dt),eo[t]=Math.sin(a*27+Dt*2),oo[t]=Math.cos(a*27+Dt*2)}const ao=d/pt;let F0=40+n()*300,R0=0,Pt=0,S=t1;const ro=c0==="pulsing waves"?1:.13,p1=6.5+n()*5,no=n()*6.28,b1=t=>{const a=t/p1+no,r=Math.floor(a),i=a-r,l=g=>{const F=Math.sin(g*127.1+no*31.7)*43758.5453;return F-Math.floor(F)},y=l(r),u=l(r+1),f=.25+.5*y,s=i<f?Math.sin(i/f*1.5708):Math.cos((i-f)/(1-f)*1.5708),x=s*s*(.45+.55*y)+(1-s*s)*.12*u,h=x*x*(3-2*x),T=ro>.5?.42+.58*h:.88+ro*(h-.5);return Math.max(0,T*(1-.72*M(.84,1,S)))};let so=n()*6,fe=0,y1=.37;const io=(t,a)=>{b0[t]=y0[t]=$0[t]=tt[t]=ft[t]=0,fe+=Math.sin(a*.41+y1*3)*.04+(Math.sin(a*1.13+2)+Math.sin(a*.53))*.018,fe*=.94,so+=fe,ht[t]=so;const r=b1(a);le[t]=r,Qe[t]=(r-.65)*.55};for(let t=0;t<d;t++)io(d-t&d-1,F0-t/ao);let kt=0,Bt=0,co=.5,lo=.5,uo=0;const Ct=t=>{F0+=t;const a=Math.exp(-t/7.5);for(R0+=ao*t;R0>=256;)R0-=256;const r=Math.floor(R0);for(;Pt!==r;)Pt=Pt+1&255,io(Pt,F0);const i=Math.sin(F0*.37),l=Math.cos(F0*.37),y=Math.sin(F0*.91+1),u=Math.cos(F0*.91+1),f=1/(.3*.3);for(let s=0;s<d;s++){let x=R0-s;if(x<0&&(x+=d),x<1){$0[s]=tt[s]=0;continue}const h=x|0,T=ue[h];let g=0,F=0;if(x<254){const B=s+1&255,Z=s+255&255,b=Je[h];g=b*(b0[B]+b0[Z]-2*b0[s]),F=b*(y0[B]+y0[Z]-2*y0[s])}const R=i*to[h]+l*$e[h],c=y*oo[h]+u*eo[h],H=.03+5*(b0[s]*b0[s]+y0[s]*y0[s]);if(g+=T*(R*.016+c*.007)-.24*$0[s]-H*b0[s],F+=T*(c*.015-R*.006)-.24*tt[s]-H*y0[s],uo>.001){const B=D0[h]+b0[s]-co,Z=P0[h]+y0[s]-lo,b=Math.exp(-(B*B+Z*Z)*f)*(.25+.75*T);g+=kt*b,F+=Bt*b}$0[s]+=g*t,tt[s]+=F*t,ft[s]*=a}for(let s=0;s<d;s++){let x=R0-s;x<0&&(x+=d),x>=1&&(b0[s]+=$0[s]*t,y0[s]+=tt[s]*t,ht[s]+=t*.28)}},fo=(t,a)=>{let r=0,i=1e9;for(let l=2;l<d-6;l++){let y=Math.round(R0)-l;y=y+d&255;const u=Math.pow(Qt[l],.38),f=D0[l]+b0[y]*u-t,s=P0[l]+y0[y]*u-a,x=f*f+s*s;x<i&&(i=x,r=l)}return[r,Math.sqrt(i)]},Ut=(t,a,r,i)=>{const l=a*Yt[t]+r*Jt[t]>=0?1:-1,y=Math.round(R0),u=14;for(let f=-u;f<=u;f++){const s=t+f;if(s<1||s>=d)continue;const x=y-s+d&255,h=Math.exp(-f*f/42),T=.45+.55*ue[s];$0[x]+=Yt[s]*l*1.05*h*T*i,tt[x]+=Jt[s]*l*1.05*h*T*i,ft[x]=Math.min(.85,ft[x]+.6*h*i),ht[x]+=1.4*h*l}};for(let t=0;t<60;t++)Ct(1/30);Ut(95+Math.floor(n()*25),1,0,.5);for(let t=0;t<150;t++)Ct(1/30);Ut(70+Math.floor(n()*30),-1,0,.42);for(let t=0;t<40;t++)Ct(1/30);const H0=[],ho=p0==="owl at dark",T1=p0==="falcon pair",dt=(t,a,r)=>{if(H0.length>=3)return;const i=fo(t,a),l=i[0],y=Math.min(1,i[1]/.3)*.65,u=Math.round(R0)-l+d&255,f=D0[l]+b0[u],s=P0[l]+y0[u],x=P(t,f,y),h=P(a,s,y),T=n()<.5?-1:1;r===2?(H0.push({k:2,age:0,x0:x-T*.75,y0:h+.1,gx:x,gy:h,side:T,dur:2.6,hit:!1,ni:l}),o.sound.on&&(o.sound.note(55,{dur:.32,vel:.2,wave:"sine",cutoff:500}),o.sound.note(53,{dur:.5,vel:.17,wave:"sine",cutoff:500,at:.42}))):H0.push({k:1,age:0,x0:x+T*(.08+n()*.16),y0:Math.max(h+.4,1.08),gx:x,gy:h,side:T,dur:1.7,hit:!1,ni:l}),r===1&&Ut(l,-T,-.4,.22),r===1&&o.sound.on&&o.sound.hit("noise",.32,{cutoff:2600,dur:.5,at:.18,pan:x*2-1})},u0=new Float32Array(8);let he=5.5+n()*4;const v0=new Float32Array(33*4),m=new Float32Array(13*4),D=new Float32Array(8*4);m[0]=p,m[1]=.2,m[48]=z,m[49]=V.f16?.6:3.6,m[4]=ie,m[5]=O?0:2.8;const w1=z?.36+S0*.12:.52+S0*.12,g1=.5+v*.12;m[36]=w1,m[37]=g1;let E1=Et?(z?1.02-$:$-.02)+(v-.5)*.03:z?.44+v*.14:.56+v*.14,A1=.26+S0*.04;m[43]=.082,m[35]=0,m[11]=O?.025:j==="storm-lit"?.05:.11;const de=j==="storm-lit",R1=e0==="blue hour"&&!O;let me=0,xe=3+n()*6,ve=0,Nt=0,Ht=0;const mo=Math.floor(Xt*(n0==="high summer"?1:n0==="spring"?.72:.84)*(p<400?.5:1)),M1=p<400?1.5:1,xo=Math.floor(mo*.5),N={down:!1,t:0,moved:0,drag:!1,x:0,y:0,sx:0,sy:0},mt=12e3,pe=new Float32Array(mt>>1);let qt=0,be=0,W0=12345,xt=0,vo=0,ye=0;const F1=(t,a)=>{const r=Math.min(pe.length,Math.round(t*mt)),i=.55*M(.08,.5,S)*(1-.6*M(.85,1,S))*(n0==="first frost"?.2:1);for(let l=0;l<r;l++){W0^=W0<<13,W0^=W0>>>17,W0^=W0<<5;const y=W0/2147483648;qt+=(y-qt)*.42,be+=(qt-be)*.06,xt+=.0098/mt*1200,vo+=6.283*(3650+90*Math.sin(xt*.13))/mt;const u=.68+.32*Math.sin(xt*.73)*Math.sin(xt*.31+1),f=Math.sin(xt*2.3),s=f>.25?(f-.25)*1.3:0;pe[l]=(qt-be)*.5*a*u+Math.sin(vo)*s*.022*i}return pe.subarray(0,r)},et=o.input;function po(){const t=R0;m[2]=(S*31+.5)/32,m[3]=1+2.3*M(.45,1,S),_0(No,S,m,8),j==="clear orange"&&!O&&(m[8]*=1.5,m[9]*=1.6,m[10]*=1.2),R1&&(m[8]*=.2,m[9]*=.3,m[10]*=.6),m[11]=O?.02:de?.05:.11,_0(Co,S,m,12);const a=M(.5,.92,S)*(O?.5:1);if(m[15]=a,_0(Uo,S,m,16),de&&(m[16]*=.34,m[17]*=.34,m[18]*=.42),m[19]=O?0:M(.2,.42,S),_0(ko,S,m,20),m[20]*=.13,m[21]*=.13,m[22]*=.13,m[23]=P(.14,.0025,M(0,.46,S)),_0(Bo,S,m,24),O){const u=M(.4,.75,S);m[24]+=.02*u,m[25]+=.024*u,m[26]+=.034*u}if(m[27]=me,_0(Ho,S,m,28),m[31]=O?1:0,_0(qo,S,m,32),m[6]=F0%3600*12e-5,m[7]=F0*13.7%57,O){m[38]=E1,m[39]=A1+S*.3;const u=M(0,.5,m[39]-.2),f=M(.3,.7,S);m[40]=P(.95,.9,f),m[41]=P(.42,.78,f),m[42]=P(.17,.62,f);const s=P(.3,.1,f);m[44]=m[40]*s,m[45]=m[41]*s*.7,m[46]=m[42]*s*.6,u<0&&(m[31]=0)}e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.viewport(0,0,p,p);for(let u=0;u<d;u++){const f=u*4,s=(u+d)*4;N0[f]=b0[u],N0[f+1]=y0[u],N0[f+2]=ft[u],N0[f+3]=le[u],N0[s]=m0?Ye[u]+.25*Math.sin(ht[u]):ht[u],N0[s+1]=Qe[u]}e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,v1),e.texSubImage2D(e.TEXTURE_2D,0,0,0,d,2,e.RGBA,e.FLOAT,N0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,Ft),e.bindFramebuffer(e.FRAMEBUFFER,Ge),e.useProgram(k.bat),D[0]=F0%7200,D[1]=t,D[3]=M1,_0(Xo,S,D,4),D[7]=1.65,_0(Io,S,D,8),D[11]=.22,D[12]=m[24]*.3,D[13]=m[25]*.25,D[14]=m[26]*.19,D[28]=Rt,D[15]=He?1:0,D[27]=z,D[16]=u0[0],D[17]=u0[1],D[18]=u0[2],D[19]=u0[3],D[20]=u0[4],D[21]=u0[5],D[22]=u0[6],D[23]=u0[7],e.bindVertexArray(w.bv),e.clearColor(0,0,0,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,We,0),e.viewport(0,0,ut,ut),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ONE),D[2]=ut,D[24]=1,D[25]=xo,D[26]=V.f16?1:1/6,e.uniform4fv(E.bat.uB,D),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,xo),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ce,0),e.viewport(0,0,p,p),e.clear(e.COLOR_BUFFER_BIT),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),D[2]=p,D[24]=0,e.uniform4fv(E.bat.uB,D),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,mo);let r=0;const i=D[4],l=D[5],y=D[6];v0[0]=p,v0[1]=i,v0[2]=l,v0[3]=y;for(let u=0;u<H0.length;u++){const f=H0[u],s=4+r*8;r++,v0[s]=f.px,v0[s+1]=f.py,v0[s+2]=f.dx,v0[s+3]=f.dy;const x=p/1e3;v0[s+4]=(f.k===2?9:8)*x,v0[s+5]=(f.k===2?13:9)*x,v0[s+6]=.96,v0[s+7]=(f.k===2?2:1)+Math.min(.95,f.spread)}r>0&&(e.useProgram(k.sm),e.uniform4fv(E.sm.uM,v0),e.bindVertexArray(w.empty),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,r)),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,p,p),e.useProgram(k.comp),e.uniform4fv(E.comp.uC,m),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,ce),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,ze),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Ke),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Ve),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,x1),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,w.noise),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,Ft),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,We),e.bindVertexArray(w.empty),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}function L1(t,a){const r=Math.min(Math.max(a,0),.2),i=et.taps?et.taps():null,l=!!(et.inside&&et.down),y=et.x,u=1-et.y;l&&!N.down&&(N.down=!0,N.t=0,N.moved=0,N.drag=!1,N.x=N.sx=y,N.y=N.sy=u);let f=0,s=0,x=!1;if(l){const R=y-N.x,c=u-N.y;if(N.moved+=Math.hypot(R,c),N.t+=r,N.moved>.03&&(N.drag=!0),N.drag){const H=1/Math.max(r,.016666666666666666);f=R*H,s=c*H,co=y,lo=u}else N.t>.3&&(x=!0);N.x=y,N.y=u}else N.down?(!N.drag&&N.t<=.3&&dt(N.sx,N.sy,1),N.down=!1):i&&i.length&&dt(i[0].x,1-i[0].y,1);const h=1-Math.exp(-r/.12);kt+=(f*2.4-kt)*h,Bt+=(s*2.4-Bt)*h,uo=Math.abs(kt)+Math.abs(Bt),ve+=((x?1:0)-ve)*(1-Math.exp(-r/.3)),S<1?(S=Math.min(1,S+r*((S<.4?1/480:1/280)+ve/19)),Nt=0):(Nt+=r,Nt>150&&!Ht&&(Ht=1)),Ht&&(S=Math.max(.04,S-r/40),S<=.04&&(Ht=0,Nt=0));let T=r,g=0;for(;T>1e-4&&g<6;){const R=Math.min(T,.03333333333333333);Ct(R),T-=R,g++}if(he-=r,he<=0){const R=ho?S<.5:S<.72,c=ho&&S>.5;if(he=(c?15:9)+n()*(c?18:16),!N.down){const H=m0?168+Math.floor(n()*20):30+Math.floor(n()*90);c?dt(D0[H],P0[H],2):R&&(dt(D0[H],P0[H],1),T1&&dt(D0[Math.min(H+18,200)],P0[Math.min(H+18,200)],1))}}u0[3]=u0[7]=0;let F=0;for(let R=H0.length-1;R>=0;R--){const c=H0[R];if(c.age+=r,c.age>c.dur){H0.splice(R,1);continue}let H,B,Z,b,C=.12;if(c.k===1)if(c.age<.38){const I=c.age/.38,f0=I*I*.6+I*.4;H=P(c.x0,c.gx,f0),B=P(c.y0,c.gy,f0),Z=c.gx-c.x0,b=c.gy-c.y0}else{const I=(c.age-.38)/(c.dur-.38),f0=1-I,Te=c.gx+(c.gx-c.x0)*.35,we=c.gy+(c.gy-c.y0)*.35,bo=c.gx+c.side*-.7,yo=c.gy+.28;H=f0*f0*c.gx+2*f0*I*Te+I*I*bo,B=f0*f0*c.gy+2*f0*I*we+I*I*yo,Z=2*f0*(Te-c.gx)+2*I*(bo-Te),b=2*f0*(we-c.gy)+2*I*(yo-we),C=P(.12,.9,M(0,.45,I))}else{const Q=c.age/c.dur;H=P(c.x0,c.gx+(c.gx-c.x0),Q),B=c.gy+.08-.1*Math.sin(Q*3.14),Z=c.gx-c.x0,b=.02,C=.85+.1*Math.sin(c.age*7)}const i0=Math.hypot(Z,b)+1e-5;c.px=H,c.py=B,c.dx=Z/i0,c.dy=b/i0,c.spread=C;const T0=Math.exp(-Math.pow(Math.hypot(H-c.gx,B-c.gy)/.2,2));if(F<2){const Q=F*4;u0[Q]=H,u0[Q+1]=B,u0[Q+2]=c.k===2?.04:.06,u0[Q+3]=(c.k===2?.024:.044)*T0,F++}if(!c.hit&&(c.k===1?c.age>.36:c.age>c.dur*.5)){c.hit=!0;const Q=fo(c.gx,c.gy);if(Ut(Q[0],c.dx,c.dy,c.k===2?.45:1),o.sound.on)for(let I=0;I<6;I++)o.sound.note(98+n()*12,{dur:.04+n()*.05,vel:.1,wave:"sine",at:I*.04+n()*.02,pan:c.gx*2-1})}}if(de&&(xe-=r,me*=Math.exp(-r/.09),xe<=0&&(me=(.5+n()*1.1)*(.35+.65*M(.1,.5,S)),xe=2+n()*n()*14,o.sound.on&&o.sound.hit("kick",.12,{at:1.2+n()}))),o.sound.on){let R=Math.round(R0)&255;o.sound.pcm(F1(r,(.32+.68*le[R])*(1-.55*M(.7,1,S))),mt,{vel:.55}),ye-=r,ye<=0&&(ye=.08+n()*.42,o.sound.note(100+n()*9,{dur:.025+n()*.05,vel:.05+n()*.05,wave:"sine",pan:(n()-.5)*.9}))}po()}return po(),L1}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
