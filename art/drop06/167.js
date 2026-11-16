// Bats at Dusk: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/167.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Pe){Pe&&function(){"use strict";const Ne=new WeakMap,Ro="",Bt=`
`,M0="#version 300 es"+Bt+Ro+"precision highp float;"+Bt+"precision highp int;"+Bt+"precision highp sampler2D;"+Bt,v=256,Ct=38,ae=4e4,He=4e4,Ut=M0+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",Mo=M0+`uniform vec4 uH[4]; uniform sampler2D uN; uniform sampler2D uP; out vec4 o;
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
}`,Fo=M0+`layout(location = 0) in vec4 a0; layout(location = 1) in vec4 a1; uniform vec4 uG; out vec2 vP; out float vL; out vec4 vD;
void main(){
  vec2 A = a0.xy, B = a0.zw; if (uG.y > 0.5) { A.x = 1.0 - A.x; B.x = 1.0 - B.x; }
  vec2 d = B - A; float L = max(length(d), 1e-5); vec2 t = d / L, n = vec2(-t.y, t.x);
  float r = max(max(a1.x, a1.y), 0.6 / uG.x) + 1.5 / uG.x;
  float cx = float(gl_VertexID & 1), cy = float(gl_VertexID >> 1), al = mix(-r, L + r, cx), pe = mix(-r, r, cy);
  vP = vec2(al, pe); vL = L; vD = a1;
  gl_Position = vec4((A + t * al + n * pe) * 2.0 - 1.0, 0.0, 1.0);
}`,Lo=M0+`uniform vec4 uG; in vec2 vP; in float vL; in vec4 vD; out vec4 o;
void main(){
  float k = clamp(vP.x / vL, 0.0, 1.0), r = max(mix(vD.x, vD.y, k), 0.6 / uG.x);
  float d = length(vec2(vP.x - k * vL, vP.y)) / r;
  if (d > 1.0) discard;
  float cov = smoothstep(1.0, 1.0 - min(1.0, 1.5 / (uG.x * r)), d);
  o = vec4(0.0, 0.0, vD.w, cov);
}`,_o=M0+`uniform vec4 uL[8]; uniform sampler2D uT; uniform sampler2D uN; uniform sampler2D uP; out vec4 o;
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
}`,So=M0+`uniform vec4 uK[4]; uniform sampler2D uN; out vec4 o;
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
}`,Do=M0+`layout(location = 0) in vec4 a0; layout(location = 1) in vec4 a1;
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
}`,ko=M0+`in vec2 vQ; in vec4 vC; in vec3 vS; out vec4 o;
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
}`,Bo=M0+`uniform vec4 uM[33]; out vec2 vQ; out vec3 vK;
void main(){
  vec4 a = uM[gl_InstanceID * 2 + 1], b = uM[gl_InstanceID * 2 + 2];
  float cx = float(gl_VertexID & 1) * 2.0 - 1.0, cy = float(gl_VertexID >> 1) * 2.0 - 1.0, SZ = uM[0].x;
  vec2 px = a.xy * SZ + a.zw * cx * b.x + vec2(-a.w, a.z) * cy * b.y;
  vQ = vec2(cx, cy); vK = b.zwx;
  gl_Position = vec4(px / SZ * 2.0 - 1.0, 0.0, 1.0);
}`,Co=M0+`uniform vec4 uM[33]; in vec2 vQ; in vec3 vK; out vec4 o;
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
}`,Uo=M0+`uniform vec4 uC[13]; uniform sampler2D uBat; uniform sampler2D uS1; uniform sampler2D uS2; uniform sampler2D uCl; uniform sampler2D uLUT; uniform sampler2D uN; uniform sampler2D uP; uniform sampler2D uD; out vec4 o;
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
}`;function qe(o,t,g){const E=o.createShader(t);return o.shaderSource(E,g),o.compileShader(E),E}function Po(o){const t={f32:!!o.getExtension("EXT_color_buffer_float"),f16:!!(o.getExtension("EXT_color_buffer_float")||o.getExtension("EXT_color_buffer_half_float"))};o.getExtension("OES_texture_float_linear");const g={h:[Ut,Mo],seg:[Fo,Lo],l:[Ut,_o],c:[Ut,So],bat:[Do,ko],sm:[Bo,Co],comp:[Ut,Uo]},E={},P=[];for(const x in g){const u=o.createProgram(),M=qe(o,o.VERTEX_SHADER,g[x][0]),Y=qe(o,o.FRAGMENT_SHADER,g[x][1]);o.attachShader(u,M),o.attachShader(u,Y),o.linkProgram(u),E[x]=u,P.push([x,M,Y])}o.flush();const V={},o0={h:[["uN",0],["uP",1]],l:[["uT",0],["uN",1],["uP",2]],c:[["uN",0]],bat:[["uP",0],["uR",1]],comp:[["uBat",0],["uS1",1],["uS2",2],["uCl",3],["uLUT",4],["uN",5],["uP",6],["uD",7]]},I={h:["uH","uN","uP"],seg:["uG"],l:["uL","uT","uN","uP"],c:["uK","uN"],bat:["uB","uP","uR"],sm:["uM"],comp:["uC","uBat","uS1","uS2","uCl","uLUT","uN","uP","uD"]};let a=!1;const l0=x=>{if(!a){a=!0;for(const u of P){const M=E[u[0]];o.getProgramParameter(M,o.LINK_STATUS)||console.error("167 "+u[0]+": "+o.getProgramInfoLog(M)+" / "+o.getShaderInfoLog(u[1])+" / "+o.getShaderInfoLog(u[2]))}for(const u in I){V[u]={};for(const M of I[u])V[u][M]=o.getUniformLocation(E[u],M);o.useProgram(E[u]);for(const[M,Y]of o0[u]||[])o.uniform1i(V[u][M],Y)}}o.useProgram(E[x])},j=256,G=new Float32Array(j*j);let t0=5369127;const W=()=>{t0=t0+1831565813|0;let x=Math.imul(t0^t0>>>15,1|t0);return x=x+Math.imul(x^x>>>7,61|x)^x,((x^x>>>14)>>>0)/4294967296};let n0=1,Y0=0;for(let x=4;x<=128;x*=2){const u=new Float32Array(x*x);for(let Y=0;Y<u.length;Y++)u[Y]=W();const M=x/j;for(let Y=0,lt=0;Y<j;Y++){const ut=Y*M,J0=ut|0,yt=ut-J0,ne=yt*yt*(3-2*yt),Tt=J0*x,d0=(J0+1&x-1)*x;for(let e0=0;e0<j;e0++,lt++){const v0=e0*M,u0=v0|0,O0=v0-u0,Xt=O0*O0*(3-2*O0),gt=u0+1&x-1,$0=u[Tt+u0]+(u[Tt+gt]-u[Tt+u0])*Xt,U0=u[d0+u0]+(u[d0+gt]-u[d0+u0])*Xt;G[lt]+=($0+(U0-$0)*ne)*n0}}Y0+=n0,n0*=.55}let H=1e9,z=-1e9;for(let x=0;x<G.length;x++){const u=G[x];u<H&&(H=u),u>z&&(z=u)}const a0=new Uint8Array(j*j*4),G0=255/(z-H);for(let x=0,u=0;x<j;x++)for(let M=0;M<j;M++,u+=4)a0[u]=(G[x*j+M]-H)*G0,a0[u+1]=(G[(M+97&255)*j+(x+31&255)]-H)*G0,a0[u+2]=(G[(255-x+53&255)*j+(M+171&255)]-H)*G0,a0[u+3]=W()*255;const f0=o.createTexture();o.bindTexture(o.TEXTURE_2D,f0),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,j,j,0,o.RGBA,o.UNSIGNED_BYTE,a0),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.REPEAT);const h0=new Float32Array(ae*8),Q=()=>(W()+W()+W()-1.5)*.82;for(let x=0,u=0;x<ae;x++,u+=8){h0[u]=W(),h0[u+1]=(1+.11*Q())/Ct,h0[u+2]=Math.floor(W()*2)*3.1416+Q()*.85,h0[u+3]=Math.sqrt(-Math.log(1-W()*.985))*.62*(W()<.025?1.45:1),h0[u+4]=.72+.6*W()*W()+.2*W(),h0[u+5]=W(),h0[u+6]=W();const M=W();h0[u+7]=M*M*M*M*M*M*M*M}const O=o.createVertexArray(),C0=o.createBuffer();o.bindVertexArray(O),o.bindBuffer(o.ARRAY_BUFFER,C0),o.bufferData(o.ARRAY_BUFFER,h0,o.STATIC_DRAW),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,4,o.FLOAT,!1,32,0),o.vertexAttribDivisor(0,1),o.enableVertexAttribArray(1),o.vertexAttribPointer(1,4,o.FLOAT,!1,32,16),o.vertexAttribDivisor(1,1);const m0=o.createVertexArray(),Ht=o.createBuffer();o.bindVertexArray(m0),o.bindBuffer(o.ARRAY_BUFFER,Ht),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,4,o.FLOAT,!1,32,0),o.vertexAttribDivisor(0,1),o.enableVertexAttribArray(1),o.vertexAttribPointer(1,4,o.FLOAT,!1,32,16),o.vertexAttribDivisor(1,1);const qt=o.createVertexArray();return o.bindVertexArray(null),{P:E,U:V,use:l0,ex:t,noise:f0,bv:O,segV:m0,segB:Ht,empty:qt,segData:new Float32Array(He*8),memo:new Map}}function No(o){let t=Ne.get(o);return t||(t=Po(o),Ne.set(o,t)),t}function I0(o,t,g,E,P,V,o0,I,a){const l0=o.createTexture();return o.activeTexture(o.TEXTURE0+t),o.bindTexture(o.TEXTURE_2D,l0),o.texImage2D(o.TEXTURE_2D,0,g,E,P,0,V,o0,I||null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),l0}const _=(o,t,g)=>{const E=Math.min(1,Math.max(0,(g-o)/(t-o)));return E*E*(3-2*E)},U=(o,t,g)=>o+(t-o)*g,B0=(o,t,g,E)=>{let P=0;for(;P<o.length-2&&t>o[P+1][0];)P++;const V=o[P],o0=o[P+1],I=Math.min(1,Math.max(0,(t-V[0])/(o0[0]-V[0])));g[E]=V[1]+(o0[1]-V[1])*I,g[E+1]=V[2]+(o0[2]-V[2])*I,g[E+2]=V[3]+(o0[3]-V[3])*I},Ho=[[0,1.8,.92,.38],[.14,1.7,.72,.22],[.3,1.2,.34,.08],[.5,0,0,0],[1,0,0,0]],qo=[[0,.17,.16,.25],[.3,.11,.108,.18],[.6,.05,.055,.1],[.85,.012,.015,.032],[1,.0045,.0055,.013]],Xo=[[0,1.15,.62,.42],[.2,1.02,.46,.3],[.4,.52,.17,.16],[.6,.11,.05,.09],[.8,.012,.011,.024],[1,.0035,.004,.009]],Io=[[0,.27,.21,.27],[.2,.15,.115,.17],[.4,.05,.035,.09],[.6,.012,.012,.035],[1,.0016,.002,.0048]],Go=[[0,.62,.22,.04],[.3,.42,.1,.02],[.55,.09,.02,.008],[.8,0,0,0],[1,0,0,0]],Oo=[[0,.52,.27,.22],[.3,.2,.1,.12],[.6,.028,.02,.034],[1,.002,.0025,.005]],zo=[[0,.1,.055,.08],[.3,.035,.024,.04],[.6,.006,.006,.012],[1,7e-4,8e-4,.0016]],Ko=[[0,.012,.0085,.011],[.4,.005,.004,.006],[1,5e-4,6e-4,.0012]],Vo=[[0,.17,.09,.09],[.2,.11,.055,.07],[.4,.045,.025,.04],[.6,.01,.008,.016],[.8,.0025,.0025,.005],[1,9e-4,.001,.0024]],Pt=[0,.1,.25,.45,.7,1],re=[[0,[[1.3,.62,.17],[1.14,.44,.13],[.86,.3,.17],[.52,.26,.29],[.27,.2,.33],[.13,.125,.28]]],[.2,[[1.08,.38,.09],[.84,.26,.09],[.5,.17,.14],[.27,.15,.24],[.12,.1,.21],[.065,.065,.15]]],[.4,[[.62,.17,.05],[.38,.115,.07],[.17,.07,.125],[.07,.048,.145],[.03,.032,.11],[.015,.021,.075]]],[.6,[[.2,.058,.032],[.1,.038,.048],[.04,.026,.06],[.018,.018,.055],[.009,.012,.04],[.005,.008,.026]]],[.8,[[.034,.03,.03],[.017,.017,.024],[.009,.008,.02],[.005,.006,.018],[.003,.004,.013],[.002,.003,.009]]],[1,[[.011,.015,.019],[.0065,.0085,.0125],[.0035,.004,.009],[.0025,.003,.007],[.002,.0025,.006],[.0015,.002,.005]]]],jo=[[0,[[.17,.17,.27],[.5,.33,.42],[.9,.5,.5],[.52,.38,.52],[.25,.26,.46],[.12,.16,.36]]],[.2,[[.1,.1,.18],[.28,.19,.27],[.5,.26,.32],[.27,.2,.34],[.12,.13,.3],[.06,.08,.22]]],[.4,[[.05,.05,.1],[.09,.07,.12],[.13,.08,.14],[.08,.06,.15],[.04,.045,.12],[.02,.03,.09]]],[.6,[[.02,.022,.05],[.024,.024,.055],[.024,.022,.06],[.018,.02,.055],[.012,.015,.045],[.007,.01,.032]]],[.8,[[.008,.009,.02],[.008,.009,.021],[.007,.008,.02],[.006,.007,.018],[.005,.006,.015],[.004,.005,.012]]],[1,[[.0045,.005,.011],[.0045,.005,.011],[.004,.0048,.0105],[.0036,.0044,.0095],[.003,.0038,.0085],[.0026,.0034,.0075]]]],Zo=re.slice(0,2).concat([[.4,[[.12,.19,.25],[.07,.12,.21],[.042,.074,.18],[.027,.048,.155],[.017,.031,.12],[.01,.02,.085]]],[.6,[[.045,.07,.1],[.026,.043,.085],[.016,.028,.075],[.011,.019,.062],[.007,.012,.045],[.004,.008,.03]]]],re.slice(4));function Wo(o,t,g,E,P){const I=new Float32Array(8192),a=[0,0,0];for(let l0=0,j=0;l0<32;l0++){const G=l0/31;let t0=0;for(;t0<o.length-2&&G>o[t0+1][0];)t0++;const W=(G-o[t0][0])/(o[t0+1][0]-o[t0][0]),n0=o[t0][1],Y0=o[t0+1][1];for(let H=0;H<64;H++,j+=4){const z=H/63*P;let a0=0;for(;a0<Pt.length-2&&z>Pt[a0+1];)a0++;const G0=_(Pt[a0],Pt[a0+1],z);for(let Q=0;Q<3;Q++){const O=U(n0[a0][Q],n0[a0+1][Q],G0),C0=U(Y0[a0][Q],Y0[a0+1][Q],G0);let m0=O*Math.pow(C0/O,W);m0*=(Q===2?g:1)*U(1,E,z),Q===1&&(m0*=t),a[Q]=m0}const f0=a[0]*.3+a[1]*.55+a[2]*.15,h0=.93*_(.1,.6,z)+(1-_(.1,.6,z));for(let Q=0;Q<3;Q++)I[j+Q]=Math.sqrt(Math.max(f0+(a[Q]-f0)*h0,0));I[j+3]=1}}return I}const pt=[[0,-.012,.135,.36,0,.026,.45,0,.2],[.012,0,.205,1.1,0,.036,.4,0,.5],[.05,.008,.3,.82,0,.064,.3,0,1.2],[.15,.024,.42,.48,0,.086,.34,0,1.55],[.27,.03,.54,.33,.02,.092,.42,0,1.45],[.38,.066,.64,.25,.05,.104,.48,0,1.3]],se=[[.45,.21,.07,.06,.2,.72,.6],[.5,.17,.12,.04,.2,1,0],[.56,.135,.18,.031,.2,1,0],[.64,.1,.26,.024,.2,1,0],[.71,.075,.35,.018,.2,1,0],[.78,.055,.46,.0135,.2,1,0],[.85,.04,.58,.0095,.2,1,0],[.91,.03,.7,.0065,.2,1,0],[.96,.022,.8,.0042,.2,1,0],[1,.016,.9,.0028,.2,1,0]],Qo=[[[.47,.69],[.575,.705],[.68,.685],[.77,.64],[.835,.625],[.885,.595],[.925,.56],[.955,.54],[.975,.53],[.992,.522]],[[.48,.675],[.59,.665],[.695,.625],[.78,.6],[.845,.585],[.895,.55],[.93,.525],[.958,.51],[.977,.498],[.993,.49]],[[.47,.7],[.575,.73],[.68,.72],[.765,.67],[.83,.655],[.88,.63],[.92,.59],[.95,.565],[.972,.555],[.99,.548]]],Yo=.13,Jo=[[.565,.72],[.6,.79],[.645,.845],[.7,.885],[.76,.9],[.82,.893],[.875,.865],[.925,.825],[.965,.775],[.995,.725]],bt=null,Nt=null,Xe=null,$o=0,t1=[[.47,.9],[.56,.905],[.65,.897],[.735,.884],[.81,.868],[.87,.852],[.915,.837],[.952,.822],[.976,.81],[.993,.8]],e1=[[0,.5],[.012,1],[.05,1.7],[.1,2.7],[.15,4],[.27,3.4],[.38,2.6],[.5,2.1],[.64,1.5],[.78,1.15],[.9,.7],[1,.2]],o1=[[0,.5],[.1,1.4],[.22,2.1],[.4,2.4],[.55,2.2],[.67,1.2],[.71,.5],[.745,.3],[1,.2]],a1=[.048,.04,.033,.027,.022,.017,.013,.0092,.0062,.004],Ie=(o,t,g,E,P)=>.5*(2*t+(g-o)*P+(2*o-5*t+4*g-E)*P*P+(3*t-o-3*g+E)*P*P*P);Pe.add({num:167,name:"Bats at Dusk",fam:"Worlds",recipe:"A cave mouth at dusk, with bats pouring out in a spiral and streaming off over the land in a ribbon. The cave, the hour and the path the ribbon takes change every mint. Tap to send a falcon diving in and a kink runs down the ribbon, drag to push it with wind, or hold to bring the night on faster.",interactive:"Tap to send a falcon down at that point: the column dents and a kink runs along the ribbon. Drag to push the stream with wind. Hold to bring the night on faster.",music:!0,gl:!0,fps:30,seed:50,make(o){const t=o.gl,g=o.size,E=No(t),P=E.U,V=E.ex,o0=E.use;let I=-2128831035;for(let e=2;e<o.hash.length;e++)I^=o.hash.charCodeAt(e),I=Math.imul(I,16777619);const a=()=>{I=I+1831565813|0;let e=Math.imul(I^I>>>15,1|I);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},l0=e=>{let r=a(),i=0;for(;i<e.length-1&&r>=e[i][1];)r-=e[i][1],i++;return e[i][0]},j=l0([["limestone arch",.52],["jungle-hung mouth",.34],["desert canyon slot",.14]]),G=l0([["clear orange",.42],["cloud-streaked",.46],["storm-lit",.12]]),t0=l0([["steady stream",.46],["pulsing waves",.42],["double ribbon",.12]]),W=l0([["hawks",.62],["falcon pair",.26],["owl at dark",.12]]),n0=l0([["high summer",.42],["spring",.3],["first frost",.28]]),Y0=l0([["none",.87],["rising full moon",.13]]),H=Y0!=="none",z=a()<.34?1:0,a0=Math.floor(a()*3),G0=.11+a()*a()*.22;o.trait("Cave",j),o.trait("Sky",G),o.trait("Flow",t0),o.trait("Predator",W),o.trait("Season",n0),o.trait("Moon",Y0);let f0=-1640531535;for(let e=o.hash.length-1;e>=2;e--)f0^=o.hash.charCodeAt(e),f0=Math.imul(f0,16777619);const h0=()=>{f0=f0+1831565813|0;let e=Math.imul(f0^f0>>>15,1|f0);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Q=(e=>e<.4?"falling away":e<.64?"high arc":e<.86?"low over the ridge":"towering column")(h0());let O=Q;h0()<.12&&(O="still circling"),bt&&(O=bt),o.home&&(O="falling away");const C0=a(),m0=a(),Ht=a()*40,qt=j==="limestone arch",x=j==="jungle-hung mouth",u=j==="desert canyon slot";let M=668265263;for(let e=2;e<o.hash.length;e++)M^=o.hash.charCodeAt(e),M=Math.imul(M,1540483477),M^=M>>>13;const Y=()=>{M=M+1831565813|0;let e=Math.imul(M^M>>>15,1|M);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},lt=Y(),ut=Y(),J0=Y(),yt=Y(),ne=Y(),Tt=Y();let d0=lt<.17?"beyond the ridge":lt<.37?u?"at the mouth":"back from the cave":lt<.49&&qt?"under the saddle":"at the mouth",e0=ut<.24?"sun just down":ut<.64?"dusk":ut<.92?"afterglow":"blue hour";Nt&&!o.home&&(d0=Nt),Xe&&!o.home&&(e0=Xe),(o.home||G==="storm-lit")&&(d0="at the mouth",e0="dusk"),e0==="blue hour"&&x&&(e0="afterglow"),e0==="sun just down"&&H&&(e0="dusk");let v0=-626627285;for(let e=2;e<o.hash.length;e++)v0^=o.hash.charCodeAt(e),v0=Math.imul(v0,1540483477),v0^=v0>>>15;const u0=()=>{v0=v0+1831565813|0;let e=Math.imul(v0^v0>>>15,1|v0);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},O0=u0(),Xt=u0(),gt=u0(),$0=u0(),U0=u0(),tt=u0(),ie=u0(),ce=u0();!o.home&&!(G==="storm-lit"&&O==="still circling")&&(O0<.15?d0="under the stream":G==="storm-lit"&&(d0=O0<.4?"beyond the ridge":O0<.6?u?"at the mouth":"back from the cave":O0<.7&&qt?"under the saddle":"at the mouth"),Xt<.18&&O!=="still circling"&&(O="a low river")),Nt&&!o.home&&(d0=Nt),bt&&!o.home&&(O=bt);const r1=d0==="beyond the ridge",wt=d0==="back from the cave",It=d0==="under the saddle",p0=d0==="under the stream",r0=r1||p0,z0=O==="a low river"&&!p0,le=r0?$o||(gt<.35?1:gt<.6?2:0):0;r0&&O==="still circling"&&!bt&&(O=Q),o.trait("Path",O),o.trait("View",d0),o.trait("Hour",e0);const s1=e0==="sun just down"?.01+.025*J0:e0==="afterglow"?.34+.04*J0:e0==="blue hour"?.45+.03*J0:G0,Ge=O==="towering column"?1:0,Et=O==="high arc"?1:0,Oe=O==="low over the ridge"&&!p0,n1=Et?Jo:Ge?t1:Qo[a0],ze=.1+.06*ie,Gt=u?.33+a()*.08:x?.36+a()*.06:.29+a()*.07;let J=Gt,K0=.045,ft=u?.05:x?.2:.205,et=u?.4:x?.28:.3;const i0=wt?.55+.1*Tt:1,Ke=.04;wt?(J=Gt+.1,ft*=i0,et*=i0,K0=Ke+K0*i0):It?(J=.44+yt*.05,ft=.14+ne*.03,et=.19):r0&&(K0=-1);const ue=[];for(let e=0;e<40;e++)ue.push(a());const $=e=>{const r=e*12.7+30,i=Math.floor(r),l=r-i,d=l*l*(3-2*l);return U(ue[(i%40+40)%40],ue[((i+1)%40+40)%40],d)-.5},Ve=e=>{let r;if(It){const h=e-J+.02;r=.31+.25*_(-.05,-.3,h)+.15*_(.05,.3,h)-.06*_(.36,.56,h)}else u?r=.54-.02*e-.36*_(.45,.95,e):x?r=.52-.04*e-.38*e*e:r=.46-.04*e-.34*e*e+.07*_(.26,0,e);r+=$(e*.33)*.045+$(e*1.1+3)*.024;const i=.03,l=r/i+$(e*1.9+13)*1.3,d=Math.floor(l),A=l-d;return r=U(r,(d+_(.5,.9,A))*i,.55),r+$(e*3.1+7)*.008+$(e*8.3+11)*.004+$(e*21+3)*.0016},ht=(e,r,i)=>{const l=(e-r)/i;return Math.exp(-l*l)},fe=e=>$(e*3.1+7)*.01+$(e*8.3+11)*.005+$(e*21+3)*.002,je=.15+.045*U0,Ze=.108+.03*tt,he=J-.012,We=$0<.5,b0=le===1?e=>.092+.014*$0+.06*(1-e)+(.14+.03*U0)*ht(e,.02+.04*tt,.2)+.04*ht(e,.43+.06*tt,.09)+.026*ht(e,.7+.07*$0,.07)+$(e*1.1+3)*.018+fe(e):le===2?e=>.07+(We?je:Ze)*ht(e,he-.2-.05*tt,.13)+(We?Ze:je)*ht(e,he+.22+.05*U0,.15)+.02*(1-ht(e,he,.4))+$(e*1.1+3)*.012+fe(e):r0?e=>.158-.022*e+$(e*.33)*.05+$(e*1.1+3)*.03+fe(e):wt?e=>Math.max(Ke+i0*(Ve(Gt+(e-J)/i0)-.42*_(-.1,-.7,Gt+(e-J)/i0)),.055+.012*$(e*2.3+5)+.004*$(e*9.1+2)):Ve,Z=[],Qe=J-.33+(a()-.5)*.02,i1=r0?b0(J-.012)-.016-.135:wt?K0+.3*et-.135:0,c1=u?.07:0,Ot=O==="still circling"?1:0;for(const e of pt){const r=e.slice();if(Ot&&(r[0]=e[0]*2.25,r[2]=.135+(r[2]-.135)*1.12,r[5]*=1+1.1*e[0]/.38,r[8]*=1.25,r[6]*=.6),Ge&&(r[2]=.135+(r[2]-.135)*(e[0]<.05?1.32:1.5),r[5]*=1.12,e[0]>=.05&&(r[1]=.3*e[1])),Et&&e[0]>=.05){const i=(e[0]-.05)/.33;r[1]+=ze*(1-(1-i)*(1-i)),r[8]*=.4,r[5]*=.7}r[1]+=.33+Qe,r[2]+=c1*(1-_(.05,.3,e[0])),u&&e[0]<.06&&(r[5]*=.58),r[2]+=i1*(1-_(.05,.38,e[0])),wt&&e[0]<.06&&(r[5]*=.5+.5*i0),Z.push(r)}if(z0||Oe){const e=Z[0][2],r=Z[pt.length-1][1],i=Z[pt.length-1][2];let l=0;for(let b=r-.08;b<=r+.1;b+=.005)l=Math.max(l,b0(b));const d=Math.min(1,(l+(r0?.08:0)+(z0?.055+.025*$0:.05+.02*ie)-e)/(i-e));Z.forEach((b,R)=>{b[0]*=z0?.55:.7,R&&(b[2]=e+(b[2]-e)*d),b[5]*=.6+.4*d});const A=.22+.05*U0,h=tt*6.283,f=Z[pt.length-1],s=.05+.03*ce,y=b=>Math.max(b0(b-.02),b0(b),b0(b+.02));se.forEach((b,R)=>{const L=[0,.201,.402,.575,.699,.795,.872,.929,.967,1][R],X=U(f[1]+.05,1.035,L)+(a()-.5)*.01*(1-L),k=z0?a1[R]:b[3],c=(z0?Math.max(y(X)+.055+1.3*k,A+.013*Math.sin(L*6.283+h)):y(X)+s+k+(r0?.07:0))+(a()-.5)*.006*(1-L);Z.push([z0?.25+(b[0]-.45)/.55*.75:.3+(b[0]-.45)/.55*.7,X,Math.min(c,U(f[2]-.01,9,R/9)),b[1],b[2],k,b[4],b[5],b[6]])})}else if(p0){Z.length=0;const e=J-.012,r=O==="low over the ridge"?0:O==="high arc"?1:O==="towering column"?2:O==="a low river"?3:4,i=Math.min([.3,.43,.36,.41,.38][r]+.04*(ie-.5),.86-e),l=[.07,.075,.045,.06,.065][r]*(.85+.3*ce),d=r?[-.08-.05*U0,1.05+.04*tt]:[-.08,.5+.3*U0],A=r?.45:.32,h=1.5+.3*U0,f=n=>Math.max(b0(n-.02),b0(n),b0(n+.02)),s=tt*6.283,y=(n,m,C,c0,B,F)=>Z.push([n,m,C,c0,B,F,.2,1,0]);let b=0,R=0;for(let n=0;n<=5;n++){const m=n/5,C=n?(a()-.5)*.006:(a(),0),c0=(a()-.5)*.004*m,B=e+i*m+C,F=n?Math.max(f(B)+.032+.038*m,.285+.025*m)+.012*Math.sin(m*3.1416+s)+c0:Math.max(f(B)+.012,.268);y(.11*n,B,F,U(.03,.07,m),U(.6,.35,m),U(.004,.012,m)),b=B,R=F}let L=2.4;for(let n=0;n<4;n++){const m=b+l*Math.sin(L),C=R+l-l*Math.cos(L);L=Math.atan2(d[1]-C,d[0]-m)}for(let n=1;n<=3;n++){const m=L*n/3;y(.55+.04*n,b+l*Math.sin(m)+(a()-.5)*.004,R+l-l*Math.cos(m)+(a()-.5)*.004,.07+.01*n,.35-.03*n,.012+.006*n)}const X=Z[Z.length-1][1],k=Z[Z.length-1][2],c=-(d[1]-k),K=d[0]-X,T=Math.hypot(c,K),w=(.03+.02*ce)*(r&1?1:-1);[[.15,.69,.16,.18,.055],[.33,.705,.4,.1,.12],[.55,.718,.75,.04,.22],[.78,.731,.92,0,.34],[1,.745,1,0,1],[1.6,.8,1,0,1.2],[3,.9,1,0,1.4],[5,1,1,0,1.6]].forEach(([n,m,C,c0,B],F)=>{const N=(F?0:(a()-.5)*.004+(a()-.5)*.002)+w*Math.sin(Math.min(n,1)*3.1416);y(m,U(X,d[0],n)+N*c/T,U(k,d[1],n)+N*K/T,C>.5?h*C:C,c0,B>.5?A*B:B)})}else Ot?se.forEach((e,r)=>{const i=Z[pt.length-1],l=r/9;Z.push([.875+.125*l,i[1]+.06*l+(a()-.5)*.01,i[2]+.05+.2*l+(a()-.5)*.01,e[1]*.8+.06,e[2],e[3]*1.6,e[4],e[5]*.5*l,1.3*(1-l)])}):se.forEach((e,r)=>{const i=n1[r],l=_(1,.45,e[0]);Z.push([e[0],i[0]+(Qe+Et*(ze-Yo))*l+(a()-.5)*.02*(1-e[0]),i[1]+(a()-.5)*.03*(1-e[0]),e[1],e[2],e[3]*(Et?.7:1),e[4],e[5],e[6]*(Et?.4:1)])});const s0=new Float32Array(v*4*4),P0=new Float32Array(v),N0=new Float32Array(v),de=new Float32Array(v),xe=new Float32Array(v),me=new Float32Array(v),Ye=t0==="double ribbon";let Je=p0?1.75:0,ot=0;for(let e=0;e<v;e++){const r=e/(v-1);for(;ot<Z.length-2&&r>Z[ot+1][0];)ot++;const i=Z[Math.max(ot-1,0)],l=Z[ot],d=Z[ot+1],A=Z[Math.min(ot+2,Z.length-1)],h=Math.min(1,(r-l[0])/(d[0]-l[0])),f=h*h*(3-2*h),s=Ie(i[1],l[1],d[1],A[1],h),y=Ie(i[2],l[2],d[2],A[2],h),b=z?1-s:s;P0[e]=b,N0[e]=y,de[e]=U(l[3],d[3],h);const R=U(l[8],d[8],f);Je+=R*Ct/(v-1);const L=e*4;s0[L]=b,s0[L+1]=y,s0[L+2]=de[e],s0[L+3]=U(l[4],d[4],h),s0[v*4+L]=U(l[5],d[5],f),s0[v*4+L+1]=Je,s0[v*4+L+2]=U(l[6],d[6],f),s0[v*4+L+3]=U(l[7],d[7],f);const X=Ye?_(.4,.62,r)*(p0?.3:1):0;s0[v*8+L+2]=(z?1:-1)*X*(.05+.26*_(.55,1,r))*(r>.9?1-.3*(r-.9):1),s0[v*8+L+3]=-X*(.17*_(.4,.7,r)*(1-.72*_(.7,1,r)))}const $e=[];for(let e=0,r=4+Math.floor(a()*4);e<r;e++)$e.push([a(),(a()-.5)*.08]);const to=e=>{let r=$(e*.21+5)*.06+$(e*.7+2)*.02;for(const i of $e)r+=i[1]*_(i[0]-.005,i[0]+.005,e);return r},zt=new Float32Array(v);for(let e=0;e<v;e++)zt[e]=a();for(let e=0;e<v;e++){const r=Math.max(e-1,0),i=Math.min(e+1,v-1),l=e*4+v*8,d=(v-1)/Ct/(i-r),A=(P0[i]-P0[r])*d,h=(N0[i]-N0[r])*d,f=Math.hypot(A,h)+1e-6;s0[l]=A,s0[l+1]=h,xe[e]=-h/f,me[e]=A/f;const s=e/(v-1),y=Ot?s<.855?s/2.25:.38+(s-.855)/.145*.62:z0?s<.209?s/.55:.38+(s-.209)/.791*.62:Oe?s<.266?s/.7:.38+(s-.266)/.734*.62:s,b=p0?o1:e1;let R=0;for(;R<b.length-2&&y>b[R+1][0];)R++;const L=v*12+e*4,X=b[R],k=b[R+1];s0[L]=b0(s),s0[L+1]=to(s),s0[L+2]=U(X[1],k[1],_(X[0],k[0],y))*(z0?1+.4*_(.3,.5,y):1),s0[L+3]=zt[e]}let At,ve,pe,be,ye,Te,eo,Kt,ge,oo;const Rt=[],at=u?[16,-.2,.012,.022]:x?[8.5,.1,.014,.004]:[9+a()*3,.07,.012,.003];at[0]/=i0;const l1=new Float32Array([g,z,C0,m0,J,K0,ft,et,at[0],at[1],at[2],at[3],.2,.05,u?.1:.13,r0?.012:.05]);Rt.push(()=>{t.bindVertexArray(E.empty),At=I0(t,1,t.RGBA32F,v,4,t.RGBA,t.FLOAT,s0,t.NEAREST),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0),t.viewport(0,0,g,g);const e=V.f16?t.RGBA16F:t.RGBA8,r=V.f16?t.HALF_FLOAT:t.UNSIGNED_BYTE;ve=t.createFramebuffer(),pe=Kt=I0(t,2,e,g,g,t.RGBA,r,null,t.LINEAR),t.bindFramebuffer(t.FRAMEBUFFER,ve),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,pe,0),o0("h"),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,E.noise),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,At),t.uniform4fv(P.h.uH,l1),t.drawArrays(t.TRIANGLES,0,3)});const F0=E.segData;let rt=0;const st=(e,r,i,l,d,A,h,f)=>{if(rt>=He)return;const s=rt++*8;F0[s]=e,F0[s+1]=r,F0[s+2]=i,F0[s+3]=l,F0[s+4]=d,F0[s+5]=A,F0[s+6]=h,F0[s+7]=f},S0=E.memo;let H0=S0.get(o.hash);if(H0)S0.delete(o.hash),S0.set(o.hash,H0),F0.set(H0.seg),rt=H0.ns,I=H0.hsSeg;else{const l=T=>{const w=(T-J)/ft,n=1-w*w;return n>0?K0+et*Math.sqrt(n):-1},d=(T,w,n,m,C,c0,B)=>{let F=-Math.PI/2+(a()-.5)*.35,N=T,E0=w;const A0=Math.max(5,Math.round(n/.012));for(let L0=0;L0<A0;L0++){F+=(a()-.5)*.3+(-Math.PI/2-F)*.12;const D0=n/A0,X0=N+Math.cos(F)*D0+C*D0,k0=E0+Math.sin(F)*D0,Z0=L0/A0,Ue=(L0+1)/A0;if(st(N,E0,X0,k0,m*(1-.72*Z0),m*(1-.72*Ue),.92,c0),B&&a()<.8)for(let _0=0;_0<2;_0++){const W0=-Math.PI/2+(a()-.5)*2.6,Q0=.004+a()*.007;st(X0,k0,X0+Math.cos(W0)*Q0,k0+Math.sin(W0)*Q0,.0012,.0024+a()*.001,.93,.72)}L0>2&&a()<.05&&n>.05&&d(X0,k0,n*(1-Z0)*.5,m*(1-Z0)*.6,C+(a()-.5),c0,B),N=X0,E0=k0}},A=Math.round((u?4:x?60:9)*i0);for(let T=0;T<A;T++){const w=J+(a()*2-1)*ft*.95,n=l(w)-.002;if(n<0)continue;const m=a();d(w,n,(x?.05+.2*m*m:.02+.09*m*m*m)*i0,(m>.75?.0017:9e-4)*(x?1.2:1)*(.4+.6*i0),(a()-.5)*.5,.4,x&&a()<.55)}const h=n0!=="first frost"||x,f=()=>(a()+a()+a()-1.5)*.8,s=(T,w,n,m,C)=>{const c0=2+Math.floor(a()*5);for(let B=0;B<c0;B++){let F=Math.PI/2+f()*1.5+m,N=T+f()*n*.2,E0=w;const A0=2+Math.floor(a()*4),L0=n*(.2+a()*.3);let D0=6e-4+n*.018;for(let X0=0;X0<A0;X0++){F+=f()*.9;const k0=N+Math.cos(F)*L0,Z0=E0+Math.sin(F)*L0*C;if(st(N,E0,k0,Z0,D0,D0*.72,.9,.4),D0*=.72,h&&X0>=A0-2){const Ue=5+Math.floor(n*(500+a()*900)),_0=n*(.12+.36*a());for(let W0=0;W0<4;W0++){const Q0=k0+f()*_0*.8,kt=Z0+f()*_0*.42;st(Q0,kt,Q0+f()*_0*.5,kt+f()*_0*.3,_0*.14,_0*.09,.91,.72)}for(let W0=0;W0<Ue;W0++){const Q0=k0+f()*_0,kt=Z0+f()*_0*.62*C,Ao=a()*6.283,oe=n*(.012+.03*a())+.0012;st(Q0,kt,Q0+Math.cos(Ao)*oe,kt+Math.sin(Ao)*oe,oe*(.3+.5*a()),oe*.25,.91,.72)}}N=k0,E0=Z0}}},y=T=>$(T*.63+21)+.6*$(T*2.3+9),b=Math.round((u?7:x?90:11)*(r0?x?1.5:u?2.6:3.6:1));for(let T=0,w=0;T<b&&w<400;w++){const n=a();if(y(n)<(x?-1:r0&&!u?-.22:.04))continue;const m=x||u?a()*a()*a():a()*a();let C=x?.018+m*.1:u?.008+m*.02:.012+m*.05;r0&&(C*=1.25*(1+(p0?.3:1.4)*Math.exp(-Math.pow((n-J)/.09,2)))),s(n,b0(n)-.003,C*i0,(a()-.5)*.5-.25,x?.9:.7),T++}if(r0)for(let T=0,w=4+Math.floor(a()*4);T<w;T++){const n=T<2&&!p0?J-.012+(T?.03:-.026)+(a()-.5)*.016:a();s(n,b0(n)-.004,((u?.045:.06)+a()*.05)*(le===1&&!p0?1+.9*_(.45,.05,n):1)*(p0?.7:1),(a()-.5)*.3,u?.8:1)}const R=(T,w,n,m,C,c0,B)=>{const F=T+m*n*.45,N=w+n*.6,E0=T+m*n*1.2,A0=w+n*.92;st(T,w,F,N,C,C*.72,B,c0),st(F,N,E0,A0,C*.72,C*.25,B,c0)};for(let T=0;T<900;T++){const w=a(),n=y(w);if(n<.02&&a()<.92)continue;const m=a();R(w,b0(w)-.002,(.003+m*m*m*.024*(.5+n))*i0,(a()-.5)*1.2-.12,7e-4+a()*5e-4,u&&a()<.7?.4:1,.88)}const L=at[0],X=at[1],k=[];{let T=null;for(let w=-.5;w<1.4;w+=.0015){let n=w*L;n+=.5*Math.sin(n*.71+C0*6)+.22*Math.sin(n*1.93+m0*9);const m=Math.floor(n);T!==null&&m!==T&&m>-64&&m<180&&zt[m+63&255]>zt[m+64&255]+.12&&k.push(w),T=m}}const c=k.length&&!r0?u?8:x?110:44:0;for(let T=0,w=0;T<c&&w<900;w++){const n=a(),m=k[Math.floor(a()*k.length)]-X*n-to(n),C=b0(n);if(m<.02||m>C-.012||y(n*1.7+m*3)<-.04||Math.hypot((n-J)/ft,(m-K0)/et)<1.06)continue;T++;const B=a()*a();s(n,m,((x?.012:.006)+B*(x?.045:.021))*i0,(a()-.5)*.5,.55);const F=Math.floor(a()*12);for(let N=0;N<F;N++)R(n+f()*.02*i0,m-.001,(.003+a()*a()*.012)*i0,(a()-.5)*1.3,5e-4,1,.86)}const K=9+Math.floor(a()*6);for(let T=0;T<K;T++){const w=a(),n=.018+a()*a()*.075,m=8+Math.floor(a()*34);s(w,-.006,n*.8,(a()-.5)*.6,.62);for(let C=0;C<m;C++)R(w+f()*n*1.3,-.005,n*(.3+a()*.9),(a()-.5)*1.1,9e-4+a()*.0012,1,.95)}}const u1=I;Rt.push(()=>{t.enable(t.BLEND),t.blendEquation(t.MAX),t.blendFunc(t.ONE,t.ONE),o0("seg"),t.uniform4f(P.seg.uG,g,z,0,0),t.bindVertexArray(E.segV),t.bindBuffer(t.ARRAY_BUFFER,E.segB),t.bufferData(t.ARRAY_BUFFER,F0.subarray(0,rt*8),t.STREAM_DRAW),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,rt),t.blendEquation(t.FUNC_ADD),t.disable(t.BLEND),t.bindVertexArray(E.empty)});const Mt=H?[.66,.28,.7]:u?[.95,.2,.24]:[.96,.15,.22];z&&(Mt[0]=-Mt[0]);const q0=r0?[.085,.07,.055,.065,.055,.04,.075,.055,.035]:u?[.66,.3,.15,.4,.16,.085,.82,.48,.22]:x?[.36,.33,.25,.2,.21,.16,.27,.31,.12]:[.64,.52,.38,.4,.32,.24,.55,.31,.14],we=n0==="spring"?[.2,.28,.07]:n0==="first frost"?x?[.17,.17,.06]:[.46,.2,.05]:[.1,.17,.05],Ee=new Float32Array([g,0,g<400?12:22,.36,Mt[0],Mt[1],Mt[2],1.9,q0[0],q0[1],q0[2],z,q0[3],q0[4],q0[5],K0,q0[6],q0[7],q0[8],et,we[0],we[1],we[2],1,.115,.09,.07,1,n0==="first frost"?.42:.3,n0==="first frost"?.3:.27,.1,.12]);Rt.push(()=>{be=I0(t,2,t.RGBA8,g,g,t.RGBA,t.UNSIGNED_BYTE,null,t.NEAREST),ye=I0(t,2,t.RGBA8,g,g,t.RGBA,t.UNSIGNED_BYTE,null,t.NEAREST),o0("l"),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,pe),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,E.noise),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,At),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,be,0),t.uniform4fv(P.l.uL,Ee),t.drawArrays(t.TRIANGLES,0,3),Ee[1]=1,t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ye,0),t.uniform4fv(P.l.uL,Ee),t.drawArrays(t.TRIANGLES,0,3)});const Ae=H?z?.8:.2:It?z?.94-J:J+.06:z?.22:.78,f1=G==="clear orange"?.3:G==="cloud-streaked"?.82:.66,h1=new Float32Array([g,f1,2.6+a()*1.6,G==="storm-lit"?1:0,(Ae-.5)*.06,-.05,1,Ht,r0?.245:.178,r0?.226:.148,r0?.207:.112,Ae-.03,.015,.022,.026,0]),d1=Wo(H?jo:e0==="blue hour"?Zo:re,G==="storm-lit"?.82:G==="clear orange"?1.08:1,G==="storm-lit"?.82:G==="clear orange"&&e0!=="blue hour"?.8:1,G==="storm-lit"?.62:1,e0==="sun just down"&&!H?.62:1),Ft=g>>1;Rt.push(()=>{Te=I0(t,2,t.RGBA8,g,g,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Te,0),o0("c"),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,E.noise),t.uniform4fv(P.c.uK,h1),t.drawArrays(t.TRIANGLES,0,3),eo=I0(t,4,t.RGBA16F,64,32,t.RGBA,t.FLOAT,d1,t.LINEAR);const e=V.f16?t.RGBA16F:t.RGBA8,r=V.f16?t.HALF_FLOAT:t.UNSIGNED_BYTE;t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Kt,0),ge=I0(t,2,e,Ft,Ft,t.RGBA,r,null,t.LINEAR),oo=I0(t,5,t.RGBA32F,v,2,t.RGBA,t.FLOAT,V0,t.NEAREST)});const y0=new Float32Array(v),T0=new Float32Array(v),nt=new Float32Array(v),it=new Float32Array(v),dt=new Float32Array(v),xt=new Float32Array(v),Re=new Float32Array(v),Vt=new Float32Array(v),V0=new Float32Array(v*2*4),ao=new Float32Array(v);for(let e=0;e<v;e++){const r=Math.sin(e*12.9898+4.1)*43758.5453;ao[e]=.25+.5*(r-Math.floor(r))}const ro=new Float32Array(v),Me=new Float32Array(v),so=new Float32Array(v),no=new Float32Array(v),io=new Float32Array(v),co=new Float32Array(v),jt=a()*6.28;for(let e=0;e<v;e++){const r=e/(v-1),i=11+11*_(.35,1,r);ro[e]=i*i,Me[e]=_(.2,.46,r),so[e]=Math.sin(r*11+jt),no[e]=Math.cos(r*11+jt),io[e]=Math.sin(r*27+jt*2),co[e]=Math.cos(r*27+jt*2)}const lo=v/Ct;let R0=40+a()*300,g0=0,mt=0,S=s1;const uo=t0==="pulsing waves"?1:.13,x1=6.5+a()*5,fo=a()*6.28,m1=e=>{const r=e/x1+fo,i=Math.floor(r),l=r-i,d=L=>{const X=Math.sin(L*127.1+fo*31.7)*43758.5453;return X-Math.floor(X)},A=d(i),h=d(i+1),f=.25+.5*A,s=l<f?Math.sin(l/f*1.5708):Math.cos((l-f)/(1-f)*1.5708),y=s*s*(.45+.55*A)+(1-s*s)*.12*h,b=y*y*(3-2*y),R=uo>.5?.42+.58*b:.88+uo*(b-.5);return Math.max(0,R*(1-.72*_(.84,1,S)))};let Zt=a()*6,Lt=0,v1=.37;const ho=(e,r)=>{y0[e]=T0[e]=nt[e]=it[e]=dt[e]=0,Lt+=Math.sin(r*.41+v1*3)*.04+(Math.sin(r*1.13+2)+Math.sin(r*.53))*.018,Lt*=.94,Zt+=Lt,xt[e]=Zt;const i=m1(r);Vt[e]=i,Re[e]=(i-.65)*.55};for(let e=0;e<v;e++)ho(v-e&v-1,R0-e/lo);let Wt=0,Qt=0,xo=.5,mo=.5,vo=0;const Yt=e=>{R0+=e;const r=Math.exp(-e/7.5);for(g0+=lo*e;g0>=256;)g0-=256;const i=Math.floor(g0);for(;mt!==i;)mt=mt+1&255,ho(mt,R0);const l=Math.sin(R0*.37),d=Math.cos(R0*.37),A=Math.sin(R0*.91+1),h=Math.cos(R0*.91+1),f=1/(.3*.3);for(let s=0;s<v;s++){let y=g0-s;if(y<0&&(y+=v),y<1){nt[s]=it[s]=0;continue}const b=y|0,R=Me[b];let L=0,X=0;if(y<254){const T=s+1&255,w=s+255&255,n=ro[b];L=n*(y0[T]+y0[w]-2*y0[s]),X=n*(T0[T]+T0[w]-2*T0[s])}const k=l*no[b]+d*so[b],c=A*co[b]+h*io[b],K=.03+5*(y0[s]*y0[s]+T0[s]*T0[s]);if(L+=R*(k*.016+c*.007)-.24*nt[s]-K*y0[s],X+=R*(c*.015-k*.006)-.24*it[s]-K*T0[s],vo>.001){const T=P0[b]+y0[s]-xo,w=N0[b]+T0[s]-mo,n=Math.exp(-(T*T+w*w)*f)*(.25+.75*R);L+=Wt*n,X+=Qt*n}nt[s]+=L*e,it[s]+=X*e,dt[s]*=r}for(let s=0;s<v;s++){let y=g0-s;y<0&&(y+=v),y>=1&&(y0[s]+=nt[s]*e,T0[s]+=it[s]*e,xt[s]+=e*.28)}},po=(e,r)=>{let i=0,l=1e9;for(let d=2;d<v-6;d++){let A=Math.round(g0)-d;A=A+v&255;const h=Math.pow(de[d],.38),f=P0[d]+y0[A]*h-e,s=N0[d]+T0[A]*h-r,y=f*f+s*s;y<l&&(l=y,i=d)}return[i,Math.sqrt(l)]},Jt=(e,r,i,l)=>{const d=r*xe[e]+i*me[e]>=0?1:-1,A=Math.round(g0),h=14;for(let f=-h;f<=h;f++){const s=e+f;if(s<1||s>=v)continue;const y=A-s+v&255,b=Math.exp(-f*f/42),R=.45+.55*Me[s];nt[y]+=xe[s]*d*1.05*b*R*l,it[y]+=me[s]*d*1.05*b*R*l,dt[y]=Math.min(.85,dt[y]+.6*b*l),xt[y]+=1.4*b*d}},bo=[y0,T0,nt,it,dt,xt,Re,Vt];if(H0){const e=H0.sim;bo.forEach((r,i)=>r.set(e.a[i])),R0=e.T,g0=e.head,mt=e.lastP,Zt=e.psiW,Lt=e.psiV,I=e.hs}else{for(let r=0;r<60;r++)Yt(1/30);Jt(95+Math.floor(a()*25),1,0,.5);for(let r=0;r<150;r++)Yt(1/30);Jt(70+Math.floor(a()*30),-1,0,.42);for(let r=0;r<40;r++)Yt(1/30);H0={seg:F0.slice(0,rt*8),ns:rt,hsSeg:u1,sim:{a:bo.map(r=>r.slice()),T:R0,head:g0,lastP:mt,psiW:Zt,psiV:Lt,hs:I}},S0.set(o.hash,H0);let e=0;for(const r of S0.values())e+=r.seg.length;for(const r of S0.keys()){if(S0.size<=1||S0.size<=4&&e<=1<<20)break;e-=S0.get(r).seg.length,S0.delete(r)}}const j0=[],yo=W==="owl at dark",p1=W==="falcon pair",_t=(e,r,i)=>{if(j0.length>=3)return;const l=po(e,r),d=l[0],A=Math.min(1,l[1]/.3)*.65,h=Math.round(g0)-d+v&255,f=P0[d]+y0[h],s=N0[d]+T0[h],y=U(e,f,A),b=U(r,s,A),R=a()<.5?-1:1;i===2?(j0.push({k:2,age:0,x0:y-R*.75,y0:b+.1,gx:y,gy:b,side:R,dur:2.6,hit:!1,ni:d}),o.sound.on&&(o.sound.note(55,{dur:.32,vel:.2,wave:"sine",cutoff:500}),o.sound.note(53,{dur:.5,vel:.17,wave:"sine",cutoff:500,at:.42}))):j0.push({k:1,age:0,x0:y+R*(.08+a()*.16),y0:Math.max(b+.4,1.08),gx:y,gy:b,side:R,dur:1.7,hit:!1,ni:d}),i===1&&Jt(d,-R,-.4,.22),i===1&&o.sound.on&&o.sound.hit("noise",.32,{cutoff:2600,dur:.5,at:.18,pan:y*2-1})},x0=new Float32Array(8);let Fe=5.5+a()*4;const w0=new Float32Array(33*4),p=new Float32Array(13*4),D=new Float32Array(8*4);p[0]=g,p[1]=.2,p[48]=z,p[49]=V.f16?.6:3.6,p[4]=Ae,p[5]=H?0:2.8;const b1=z?.36+C0*.12:.52+C0*.12,y1=.5+m0*.12;p[36]=b1,p[37]=y1;let T1=It?(z?1.02-J:J-.02)+(m0-.5)*.03:z?.44+m0*.14:.56+m0*.14,g1=.26+C0*.04;p[43]=.082,p[35]=0,p[11]=H?.025:G==="storm-lit"?.05:.11;const Le=G==="storm-lit",w1=e0==="blue hour"&&!H;let _e=0,Se=3+a()*6,De=0,$t=0,te=0;const To=Math.floor(ae*(n0==="high summer"?1:n0==="spring"?.72:.84)*(g<400?.5:1)),E1=g<400?1.5:1,go=Math.floor(To*.5),q={down:!1,t:0,moved:0,drag:!1,x:0,y:0,sx:0,sy:0},St=12e3,ke=new Float32Array(St>>1);let ee=0,Be=0,ct=12345,Dt=0,wo=0,Ce=0;const A1=(e,r)=>{const i=Math.min(ke.length,Math.round(e*St)),l=.55*_(.08,.5,S)*(1-.6*_(.85,1,S))*(n0==="first frost"?.2:1);for(let d=0;d<i;d++){ct^=ct<<13,ct^=ct>>>17,ct^=ct<<5;const A=ct/2147483648;ee+=(A-ee)*.42,Be+=(ee-Be)*.06,Dt+=.0098/St*1200,wo+=6.283*(3650+90*Math.sin(Dt*.13))/St;const h=.68+.32*Math.sin(Dt*.73)*Math.sin(Dt*.31+1),f=Math.sin(Dt*2.3),s=f>.25?(f-.25)*1.3:0;ke[d]=(ee-Be)*.5*r*h+Math.sin(wo)*s*.022*l}return ke.subarray(0,i)},vt=o.input;function Eo(){const e=g0;p[2]=(S*31+.5)/32,p[3]=1+2.3*_(.45,1,S),B0(Go,S,p,8),G==="clear orange"&&!H&&(p[8]*=1.5,p[9]*=1.6,p[10]*=1.2),w1&&(p[8]*=.2,p[9]*=.3,p[10]*=.6),p[11]=H?.02:Le?.05:.11,B0(Xo,S,p,12);const r=_(.5,.92,S)*(H?.5:1);if(p[15]=r,B0(Io,S,p,16),Le&&(p[16]*=.34,p[17]*=.34,p[18]*=.42),p[19]=H?0:_(.2,.42,S),B0(Ho,S,p,20),p[20]*=.13,p[21]*=.13,p[22]*=.13,p[23]=U(.14,.0025,_(0,.46,S)),B0(qo,S,p,24),H){const h=_(.4,.75,S);p[24]+=.02*h,p[25]+=.024*h,p[26]+=.034*h}if(p[27]=_e,B0(Oo,S,p,28),p[31]=H?1:0,B0(zo,S,p,32),p[6]=R0%3600*12e-5,p[7]=R0*13.7%57,H){p[38]=T1,p[39]=g1+S*.3;const h=_(0,.5,p[39]-.2),f=_(.3,.7,S);p[40]=U(.95,.9,f),p[41]=U(.42,.78,f),p[42]=U(.17,.62,f);const s=U(.3,.1,f);p[44]=p[40]*s,p[45]=p[41]*s*.7,p[46]=p[42]*s*.6,h<0&&(p[31]=0)}t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.viewport(0,0,g,g);for(let h=0;h<v;h++){const f=h*4,s=(h+v)*4;V0[f]=y0[h],V0[f+1]=T0[h],V0[f+2]=dt[h],V0[f+3]=Vt[h],V0[s]=p0?ao[h]+.25*Math.sin(xt[h]):xt[h],V0[s+1]=Re[h]}t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,oo),t.texSubImage2D(t.TEXTURE_2D,0,0,0,v,2,t.RGBA,t.FLOAT,V0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,At),t.bindFramebuffer(t.FRAMEBUFFER,ve),o0("bat"),D[0]=R0%7200,D[1]=e,D[3]=E1,B0(Ko,S,D,4),D[7]=1.65,B0(Vo,S,D,8),D[11]=.22,D[12]=p[24]*.3,D[13]=p[25]*.25,D[14]=p[26]*.19,D[28]=Ot,D[15]=Ye?1:0,D[27]=z,D[16]=x0[0],D[17]=x0[1],D[18]=x0[2],D[19]=x0[3],D[20]=x0[4],D[21]=x0[5],D[22]=x0[6],D[23]=x0[7],t.bindVertexArray(E.bv),t.clearColor(0,0,0,0),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ge,0),t.viewport(0,0,Ft,Ft),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ONE),D[2]=Ft,D[24]=1,D[25]=go,D[26]=V.f16?1:1/6,t.uniform4fv(P.bat.uB,D),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,go),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Kt,0),t.viewport(0,0,g,g),t.clear(t.COLOR_BUFFER_BIT),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),D[2]=g,D[24]=0,t.uniform4fv(P.bat.uB,D),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,To);let i=0;const l=D[4],d=D[5],A=D[6];w0[0]=g,w0[1]=l,w0[2]=d,w0[3]=A;for(let h=0;h<j0.length;h++){const f=j0[h],s=4+i*8;i++,w0[s]=f.px,w0[s+1]=f.py,w0[s+2]=f.dx,w0[s+3]=f.dy;const y=g/1e3;w0[s+4]=(f.k===2?9:8)*y,w0[s+5]=(f.k===2?13:9)*y,w0[s+6]=.96,w0[s+7]=(f.k===2?2:1)+Math.min(.95,f.spread)}i>0&&(o0("sm"),t.uniform4fv(P.sm.uM,w0),t.bindVertexArray(E.empty),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,i)),t.disable(t.BLEND),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,g,g),o0("comp"),t.uniform4fv(P.comp.uC,p),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Kt),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,be),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,ye),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,Te),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,eo),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,E.noise),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,At),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,ge),t.bindVertexArray(E.empty),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)}function R1(e,r){const i=Math.min(Math.max(r,0),.2),l=vt.taps?vt.taps():null,d=!!(vt.inside&&vt.down),A=vt.x,h=1-vt.y;d&&!q.down&&(q.down=!0,q.t=0,q.moved=0,q.drag=!1,q.x=q.sx=A,q.y=q.sy=h);let f=0,s=0,y=!1;if(d){const k=A-q.x,c=h-q.y;if(q.moved+=Math.hypot(k,c),q.t+=i,q.moved>.03&&(q.drag=!0),q.drag){const K=1/Math.max(i,.016666666666666666);f=k*K,s=c*K,xo=A,mo=h}else q.t>.3&&(y=!0);q.x=A,q.y=h}else q.down?(!q.drag&&q.t<=.3&&_t(q.sx,q.sy,1),q.down=!1):l&&l.length&&_t(l[0].x,1-l[0].y,1);const b=1-Math.exp(-i/.12);Wt+=(f*2.4-Wt)*b,Qt+=(s*2.4-Qt)*b,vo=Math.abs(Wt)+Math.abs(Qt),De+=((y?1:0)-De)*(1-Math.exp(-i/.3)),S<1?(S=Math.min(1,S+i*((S<.4?1/480:1/280)+De/19)),$t=0):($t+=i,$t>150&&!te&&(te=1)),te&&(S=Math.max(.04,S-i/40),S<=.04&&(te=0,$t=0));let R=i,L=0;for(;R>1e-4&&L<6;){const k=Math.min(R,.03333333333333333);Yt(k),R-=k,L++}if(Fe-=i,Fe<=0){const k=yo?S<.5:S<.72,c=yo&&S>.5;if(Fe=(c?15:9)+a()*(c?18:16),!q.down){const K=p0?168+Math.floor(a()*20):30+Math.floor(a()*90);c?_t(P0[K],N0[K],2):k&&(_t(P0[K],N0[K],1),p1&&_t(P0[Math.min(K+18,200)],N0[Math.min(K+18,200)],1))}}x0[3]=x0[7]=0;let X=0;for(let k=j0.length-1;k>=0;k--){const c=j0[k];if(c.age+=i,c.age>c.dur){j0.splice(k,1);continue}let K,T,w,n,m=.12;if(c.k===1)if(c.age<.38){const F=c.age/.38,N=F*F*.6+F*.4;K=U(c.x0,c.gx,N),T=U(c.y0,c.gy,N),w=c.gx-c.x0,n=c.gy-c.y0}else{const F=(c.age-.38)/(c.dur-.38),N=1-F,E0=c.gx+(c.gx-c.x0)*.35,A0=c.gy+(c.gy-c.y0)*.35,L0=c.gx+c.side*-.7,D0=c.gy+.28;K=N*N*c.gx+2*N*F*E0+F*F*L0,T=N*N*c.gy+2*N*F*A0+F*F*D0,w=2*N*(E0-c.gx)+2*F*(L0-E0),n=2*N*(A0-c.gy)+2*F*(D0-A0),m=U(.12,.9,_(0,.45,F))}else{const B=c.age/c.dur;K=U(c.x0,c.gx+(c.gx-c.x0),B),T=c.gy+.08-.1*Math.sin(B*3.14),w=c.gx-c.x0,n=.02,m=.85+.1*Math.sin(c.age*7)}const C=Math.hypot(w,n)+1e-5;c.px=K,c.py=T,c.dx=w/C,c.dy=n/C,c.spread=m;const c0=Math.exp(-Math.pow(Math.hypot(K-c.gx,T-c.gy)/.2,2));if(X<2){const B=X*4;x0[B]=K,x0[B+1]=T,x0[B+2]=c.k===2?.04:.06,x0[B+3]=(c.k===2?.024:.044)*c0,X++}if(!c.hit&&(c.k===1?c.age>.36:c.age>c.dur*.5)){c.hit=!0;const B=po(c.gx,c.gy);if(Jt(B[0],c.dx,c.dy,c.k===2?.45:1),o.sound.on)for(let F=0;F<6;F++)o.sound.note(98+a()*12,{dur:.04+a()*.05,vel:.1,wave:"sine",at:F*.04+a()*.02,pan:c.gx*2-1})}}if(Le&&(Se-=i,_e*=Math.exp(-i/.09),Se<=0&&(_e=(.5+a()*1.1)*(.35+.65*_(.1,.5,S)),Se=2+a()*a()*14,o.sound.on&&o.sound.hit("kick",.12,{at:1.2+a()}))),o.sound.on){let k=Math.round(g0)&255;o.sound.pcm(A1(i,(.32+.68*Vt[k])*(1-.55*_(.7,1,S))),St,{vel:.55}),Ce-=i,Ce<=0&&(Ce=.08+a()*.42,o.sound.note(100+a()*9,{dur:.025+a()*.05,vel:.05+a()*.05,wave:"sine",pan:(a()-.5)*.9}))}Eo()}for(const e of Rt)e();return Eo(),R1}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
