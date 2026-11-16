// Glowworm Cave: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/169.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(L0){L0&&function(){"use strict";const N0=new WeakMap,Gt=`
`,gt="#version 300 es"+Gt+"precision highp float;"+Gt+"precision highp int;"+Gt+"precision highp sampler2D;"+Gt+""+Gt,Z=192,F=384,Mt=.125,T=48,wo=32,d0=336,z=Z+1,U0=6,Qe=18,qt=10,Ze=`uniform vec4 uV[10];
vec4 prj(vec3 r, out vec3 w){ r.z += 2.4 * max(r.z - 18.0, 0.0); w = vec3(dot(r, uV[0].xyz), dot(r, uV[1].xyz), dot(r, uV[2].xyz)); return vec4(w.x * uV[0].w, w.y * uV[0].w, w.z * 1.0029 - 0.2003, w.z); }
`,po=gt+Ze+`uniform sampler2D uP; uniform sampler2D uN; uniform sampler2D uSt;
out vec3 vR; out vec3 vNm; out vec3 vIn; out vec2 vUV; out vec3 vL;
void main(){
  int col = gl_VertexID % ${z}, row = gl_VertexID / ${z};
  int r0 = int(uV[6].x) + row, rw = r0 % ${F};
  if (rw < 0) rw += ${F};
  vec4 a = texelFetch(uP, ivec2(col, rw), 0);
  vec4 n = texelFetch(uN, ivec2(col, rw), 0);
  float my = gl_InstanceID == 0 ? 1.0 : -1.0;
  vec3 r = vec3(a.x - uV[3].x, a.y * my - uV[3].y, float(r0) * ${Mt.toFixed(4)} - uV[3].z);
  vec3 w; gl_Position = prj(r, w);
  float dm = texture(uSt, vec2(float(col) / ${Z.toFixed(1)}, float(rw) / ${F.toFixed(1)})).g;
  vec3 nn = n.xyz * 2.0 - 1.0; nn.y *= my;
  float th = float(col) / ${Z.toFixed(1)} * 3.14159265;
  vIn = vec3(-cos(th), -sin(th) * my, 0.0);
  vR = r; vNm = nn;
  vUV = vec2(float(col) / ${Z.toFixed(1)} * 7.0, float(r0) * ${(Mt/3).toFixed(6)});
  vL = vec3(a.z * (1.0 - 0.85 * dm), 0.0, my);
}`,To=gt+Ze+`uniform sampler2D uSt; in vec4 aA; in vec4 aB;
out vec3 vR; out vec3 vNm; out vec3 vIn; out vec2 vUV; out vec3 vL;
void main(){
  int ring = gl_VertexID / ${qt+1}, side = gl_VertexID % ${qt+1};
  float t = float(ring) / ${Qe.toFixed(1)}, ang = float(side) / ${qt.toFixed(1)} * 6.2831853;
  float ph = aB.y, h = aA.w, r0 = aB.x;
  // carrot-shaped: a flared root, a long taper, growth rings, and a fluted, uneven section
  float u1 = 1.0 - t;
  float rad = r0 * (pow(u1, 1.25) * (1.0 + 0.25 * pow(u1, 8.0)) * (1.0 + 0.14 * sin(t * 9.0 + ph) + 0.07 * sin(t * abs(h) * 46.0 + ph * 3.1) + 0.05 * sin(t * abs(h) * 97.0 + ph)) + 0.012);
  float lobes = 1.0 + 0.24 * sin(ang * 2.0 + ph * 3.0 + t * 3.0) + 0.12 * sin(ang * 3.0 + ph * 4.1 - t * 2.0) + 0.07 * sin(ang * 7.0 + ph * 5.0);
  vec2 dir = vec2(cos(ang), sin(ang));
  vec2 bend = vec2(sin(ph * 7.0), cos(ph * 5.0)) * 0.05 * abs(h) * t * t;
  float my = (gl_InstanceID & 1) == 0 ? 1.0 : -1.0;
  vec3 p = vec3(aA.x + dir.x * rad * lobes + bend.x, aA.y - h * t, aA.z + dir.y * rad * lobes + bend.y);
  vec3 r = vec3(p.x - uV[3].x, p.y * my - uV[3].y, mod(aA.z - uV[3].z + 4.0, uV[3].w) - 4.0 + p.z - aA.z);
  vec3 w; gl_Position = prj(r, w);
  float dm = texture(uSt, vec2(aB.w, aA.z / uV[3].w)).g;
  float sl = -r0 / max(abs(h), 0.01) * sign(h);
  vec3 nn = normalize(vec3(dir.x * lobes, sl, dir.y * lobes)); nn.y *= my;
  vIn = normalize(vec3(-sign(aA.x - uV[3].x) * 0.4, -my, 0.25));
  vR = r; vNm = nn;
  vUV = vec2(ang * 0.11 * max(r0 * 8.0, 0.5) + ph, t * abs(h) * 0.33 + ph);
  vL = vec3(aB.z * (1.0 - 0.85 * dm), mix(2.2, 0.35, sqrt(t)), my);
}`,I0=gt+`uniform vec4 uV[10]; uniform sampler2D uD;
in vec3 vR; in vec3 vNm; in vec3 vIn; in vec2 vUV; in vec3 vL; out vec4 o;
void main(){
  float my = vL.z;
  float dist = length(vR);
  vec3 V = -vR / dist, N = normalize(vNm);
  vec4 d1 = texture(uD, vUV), d2 = texture(uD, vUV * 5.3 + 0.37);
  vec3 Tg = normalize(cross(N, vec3(0.0, 0.0, 1.0))), Bt = cross(Tg, N);
  vec2 sl = (d1.xy - 0.5) * 0.75 + (d2.xy - 0.5) * 0.28;
  N = normalize(N + Tg * sl.x + Bt * sl.y);
  float alb = 0.35 + 0.65 * d1.w * (0.72 + 0.56 * d2.w);
  float cav = 0.45 + 1.1 * d1.z * (0.6 + 0.8 * d2.z);
  float wet = smoothstep(0.34, 0.7, d1.w * 0.6 + d2.z * 0.5);
  // the worms' own light: it comes from all over the cave's inside, so it models the rock softly and glints on the wet parts
  float li = max(0.16 + 0.84 * pow(max(dot(N, normalize(vIn + V * 0.35)), 0.0), 1.4), vL.y);
  vec3 Rf = reflect(-V, N);
  float sp = pow(max(dot(Rf, normalize(vIn)), 0.0), 22.0);
  vec3 col = uV[7].rgb * vL.x * vL.x * (alb * li * li * cav * uV[9].y + sp * (0.004 + 0.05 * wet));
  // the torch
  float tI = uV[4].w;
  if (tI > 0.002) {
    vec3 T = vec3(uV[5].x, uV[5].y * my - uV[3].y, uV[5].z), D = uV[4].xyz * vec3(1.0, my, 1.0);
    vec3 Lv = T - vR; float ld = length(Lv); Lv /= ld;
    float cd = dot(-Lv, D), cone = smoothstep(0.8, 0.985, cd) * (0.55 + 0.9 * smoothstep(0.95, 0.995, cd));
    float nl = max(dot(N, Lv), 0.0);
    vec3 hv = normalize(Lv + V);
    // seeps: dark wet stains running down the flutes, glossier than the dry cream stone
    float seep = smoothstep(0.42, 0.78, d1.z * 0.75 + d2.w * 0.45);
    float s2 = pow(max(dot(N, hv), 0.0), 34.0) * (0.04 + 0.5 * max(wet, seep));
    vec3 lime = mix(vec3(0.62, 0.50, 0.34), vec3(0.95, 0.89, 0.77), d1.w * d1.w) * (0.35 + 1.0 * d2.w) * mix(1.0, 0.28, seep);
    col += tI * vec3(1.0, 0.80, 0.56) * (cone * cone + 0.01) * (lime * nl * cav * cav + s2) * 0.75 / (1.0 + 0.5 * ld * ld * uV[8].w);
  }
  col *= exp(-dist / uV[9].x) * smoothstep(38.0, 24.0, dist);
  o = vec4(col, my > 0.0 ? 1.0 : 0.0);
}`,yo=gt+Ze+`uniform sampler2D uSt; uniform sampler2D uWA; uniform sampler2D uN; uniform int uW0; out vec2 vQ; out vec4 vC;
void main(){
  int qd = gl_VertexID >> 2, wi = uW0 + (qd >> 1);
  ivec2 wt = ivec2((wi & 511) * 2, wi >> 9);
  vec4 aA = texelFetch(uWA, wt, 0), aB = texelFetch(uWA, wt + ivec2(1, 0), 0);
  vec2 q = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  float my = (qd & 1) == 0 ? 1.0 : -1.0;
  vec3 r = vec3(aA.x - uV[3].x, aA.y * my - uV[3].y, mod(aA.z - uV[3].z + 4.0, uV[3].w) - 4.0);
  vec3 w; vec4 cp = prj(r, w);
  float d = length(r), S = uV[1].w, ps = uV[8].z;
  vQ = q; vC = vec4(0.0);
  gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
  if (w.z > 0.14 && w.z < 100.0) {
    float pxm = uV[0].w * 0.5 * S / w.z;
    float rr = (0.0011 + 0.0026 * aB.x * aB.x) * pxm;
    float iv = 1.0 / d - 1.0 / uV[5].w;
    float coc = uV[7].w * S * (iv > 0.0 ? iv : -iv * 0.10);
    float sig = sqrt(rr * rr + coc * coc * 0.20 + ps * (0.2 + 0.22 * min(aA.w * 0.7, 1.6)));
    float R = max(sig * 2.3, 1.3);
    float hard = smoothstep(1.6, 5.0, coc * ps * 1.4);
    float dm = texture(uSt, vec2(aB.z, aB.w)).g;
    float tw = 1.0 + 0.09 * sin(uV[2].w * (0.3 + aB.x * 0.3) + aB.y);
    // far rock seen edge-on stacks its worms into a few pixels: fade those so a ridge never draws a chalk line
    vec3 nw = texture(uN, vec2((aB.z * ${Z.toFixed(1)} + 0.5) / ${z.toFixed(1)}, aB.w + ${(.5/F).toFixed(6)})).xyz * 2.0 - 1.0; nw.y *= my;
    tw *= mix(1.0, smoothstep(0.1, 0.6, abs(dot(nw, r / d))), smoothstep(5.0, 10.0, d));
    float E = 2.8 * aA.w * tw * (1.0 - 0.97 * dm) * exp(-d / uV[9].x) * mix(2.3, 0.8, smoothstep(4.0, 16.0, d)) * smoothstep(0.0, 4.0, 18.0 + 22.0 * fract(aB.x * 7.31) - d) / (1.0 + d * d * 0.03 * uV[8].w);
    float pk = E * ps * ps * 0.8 / (sig * sig + 0.22);
    float hue = fract(aB.y * 3.7) - 0.5;
    vec3 col = uV[7].rgb * vec3(1.0 + hue * 0.3, 1.0, 1.0 - hue * 0.2);
    vC = vec4(col * pk * mix(1.0, 0.22, hard), hard);
    vec2 p = cp.xy / cp.w + q * R * 2.0 / S;
    float zz = w.z - 0.03 - R * 2.0 / (uV[0].w * S) * w.z;
    gl_Position = vec4(p, (zz * 1.0029 - 0.2003) / zz, 1.0);
  }
}`,Eo=gt+`in vec2 vQ; in vec4 vC; out vec4 o;
void main(){
  float r2 = dot(vQ, vQ);
  if (r2 > 1.0) discard;
  float g = exp(-r2 * 2.6) - 0.074;
  float dsk = smoothstep(1.0, 0.72, r2) * (0.8 + 0.3 * r2);
  o = vec4(vC.rgb * mix(g, dsk, vC.w), 0.0);
}`,bo=gt+Ze+`uniform sampler2D uSt; in vec4 aA; in vec4 aB; out vec2 vQ; out vec4 vC; out vec4 vW;
vec3 lp(float t, float jr, float jk){
  // dead plumb: no wind in a cave, only the faintest stir of air, each line on its own phase
  float sw = sin(uV[6].y * (0.5 + aB.y) + aB.x * 5.0) * 0.0025;
  float sz = sin(uV[6].y * (0.4 + aB.y) + aB.x * 1.7) * 0.0025;
  float k = t * t * (0.5 + aA.w * 2.0);
  vec3 p = aA.xyz + vec3(sw * k, -aA.w * t * (1.0 - jk * 0.05 * sin(jr * 26.0)), sz * k);
  p.x += jk * 0.04 * sin(t * 8.0 - jr * 30.0) * t;
  return p;
}
void main(){
  int seg = gl_VertexID >> 1; float side = float(gl_VertexID & 1) * 2.0 - 1.0;
  float t = float(seg) / ${U0.toFixed(1)};
  float my = (gl_InstanceID & 1) == 0 ? 1.0 : -1.0;
  float jr = 0.0, jk = 0.0;
  if (abs(aB.x - uV[6].z) < 1e-5) { jr = uV[6].w; jk = exp(-jr * 2.4); }
  else if (abs(aB.x - uV[8].x) < 1e-5) { jr = uV[8].y; jk = exp(-jr * 2.4); }
  vec3 a = lp(t, jr, jk), b = lp(t + 0.05, jr, jk);
  float zb = mod(aA.z - uV[3].z + 4.0, uV[3].w) - 4.0 - aA.z;
  vec3 ra = vec3(a.x - uV[3].x, a.y * my - uV[3].y, a.z + zb), rb = vec3(b.x - uV[3].x, b.y * my - uV[3].y, b.z + zb);
  vec3 wa, wb; vec4 pa = prj(ra, wa), pb = prj(rb, wb);
  float d = length(ra), S = uV[1].w, ps = uV[8].z;
  vQ = vec2(0.0); vC = vec4(0.0); vW = vec4(0.0);
  gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
  if (wa.z > 0.2 && wb.z > 0.2 && d < 9.0) {
    vec2 sa = pa.xy / pa.w, sb = pb.xy / pb.w;
    vec2 dv = (sb - sa) * S * 0.5; float dl = max(length(dv), 1e-3);
    vec2 pr = vec2(-dv.y, dv.x) / dl;
    float iv = 1.0 / d - 1.0 / uV[5].w;
    float coc = uV[7].w * S * abs(iv) * 0.45;
    float pxm = uV[0].w * 0.5 * S / wa.z;
    float bs = 0.0021 * pxm;
    float sg = 0.28 * ps + 0.0006 * pxm + coc * 0.35;
    float hw = 2.4 * sg + 1.6 * bs + 0.6;
    float dm = texture(uSt, vec2(aB.z, aB.w)).g;
    float fade = smoothstep(9.0, 4.0, d) * smoothstep(0.0, 0.05, t + 0.02) * (1.0 - smoothstep(0.86, 1.0, t) * 0.7);
    float aI = (1.0 - 0.9 * dm) * fade * min(1.0, 0.32 * ps / sg + 0.2) * (1.0 + 2.0 * jk) * 1.6 * exp(-t * aA.w / uV[9].w) * uV[9].z;
    // the torch: lit when the line is inside the beam
    vec3 T = vec3(uV[5].x, uV[5].y * my - uV[3].y, uV[5].z), Dt = uV[4].xyz * vec3(1.0, my, 1.0);
    vec3 Lv = ra - T; float ld = length(Lv);
    float tl = uV[4].w * smoothstep(0.84, 0.97, dot(Lv / ld, Dt)) / (1.0 + 0.1 * ld * ld) * fade;
    gl_Position = vec4(sa + pr * side * hw * 2.0 / S, (pa.z - 0.002 * pa.w) / pa.w, 1.0);
    float spc = (0.010 + 0.007 * fract(aB.x * 5.1)) * pxm;
    vQ = vec2(side * hw, t * aA.w * pxm);
    vC = vec4(uV[7].rgb * aI, spc);
    vW = vec4(sg, bs, tl, fract(aB.x * 13.7));
  }
}`,Ao=gt+`in vec2 vQ; in vec4 vC; in vec4 vW; out vec4 o;
void main(){
  float s = vC.w, k = vQ.y / max(s, 0.3) + 0.45 * sin(vQ.y * 0.21 + vW.w * 40.0), id = floor(k), a = (k - id - 0.5) * s;
  float hs = fract(id * 0.618034 + vW.w);
  float sg = vW.x;
  float lin = exp(-vQ.x * vQ.x / (2.0 * sg * sg)) * 0.32 / (sg + 0.15);
  float rb = max(vW.y * (0.6 + 0.9 * hs), 0.35);
  float bd = exp(-(vQ.x * vQ.x + a * a) / (rb * rb + sg * sg)) * smoothstep(1.0, 3.2, s) * (0.5 + 1.8 * hs * hs);
  vec3 c = vC.rgb * (lin * 0.09 + bd * 0.55);
  c += vW.z * vec3(1.0, 0.85, 0.66) * (lin * 0.025 + bd * 1.5);
  o = vec4(c, 0.0);
}`,m0=gt+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",Ro=gt+`uniform sampler2D uT; uniform vec4 uA[5]; uniform vec4 uG[4]; out vec4 o;
void main(){
  ivec2 c = ivec2(gl_FragCoord.xy);
  int W = int(uG[0].x), Hh = int(uG[0].y);
  vec2 s = texelFetch(uT, c, 0).rg;
  float n = texelFetch(uT, ivec2(max(c.x - 1, 0), c.y), 0).r + texelFetch(uT, ivec2(min(c.x + 1, W - 1), c.y), 0).r
    + texelFetch(uT, ivec2(c.x, (c.y + 1) % Hh), 0).r + texelFetch(uT, ivec2(c.x, (c.y + Hh - 1) % Hh), 0).r;
  float dt = uG[0].z;
  float w = s.r + dt * (uG[1].x * (n - 4.0 * s.r) - s.r * uG[1].y + uG[1].z * s.g * (1.0 - s.g) * step(0.12, s.r));
  float th = gl_FragCoord.x / float(W) * 3.14159265, zz = gl_FragCoord.y / float(Hh) * uG[2].x;
  vec3 P = vec3(uG[2].y * cos(th), uG[2].z * sin(th), zz);
  int ns = int(uG[0].w);
  for (int i = 0; i < ns; i++) {
    vec4 a = uA[i];
    vec3 q = P - vec3(a.x, a.y, a.z);
    q.z = mod(q.z + uG[2].x * 0.5, uG[2].x) - uG[2].x * 0.5;
    w += uG[3][i] * exp(-dot(q, q) / a.w);
  }
  w = clamp(w, 0.0, 1.0);
  float d = s.g + dt * (uG[1].w * w * (1.0 - s.g) - s.g * uG[2].w) - 0.002;
  o = vec4(max(w - 0.004, 0.0), clamp(d, 0.0, 1.0), 0.0, 1.0);
}`,Mo=gt+`uniform sampler2D uT; uniform sampler2D uT2; uniform vec4 uB; out vec4 o;
void main(){
  vec2 uv = gl_FragCoord.xy * uB.zw;
  vec2 e = uB.xy;
  vec3 c = texture(uT, uv + e).rgb + texture(uT, uv - e).rgb + texture(uT, uv + vec2(e.x, -e.y)).rgb + texture(uT, uv + vec2(-e.x, e.y)).rgb;
  o = vec4(c * 0.25, 1.0);
}`,Fo=gt+`uniform vec4 uC[8]; uniform vec4 uR[12]; uniform sampler2D uS; uniform sampler2D uB0; uniform sampler2D uB1; uniform sampler2D uW; out vec4 o;
float h21(vec2 p){ vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
void main(){
  vec2 fc = gl_FragCoord.xy; float SZ = uC[1].w, f = uC[0].w;
  vec2 uv = fc / SZ, n = uv * 2.0 - 1.0;
  vec3 ray = normalize(uC[2].xyz + (n.x * uC[0].xyz + n.y * uC[1].xyz) / f);
  float aS = texelFetch(uS, ivec2(fc), 0).a;
  vec2 tuv = uv;
  float rf = 1.0, glint = 0.0, ringL = 0.0, down = max(-ray.y, 0.0);
  if (ray.y < 0.0 && aS < 0.5) {
    float tw = uC[3].x / max(down, 0.012);
    vec2 hit = ray.xz * tw;
    vec2 wuv = hit * 0.45 + uC[7].xy;
    vec2 sl = (texture(uW, wuv).rg + texture(uW, wuv * 1.73 + vec2(0.37, 0.11) - uC[7].xy * 1.4).rg - 1.0) * uC[5].w;
    int nr = int(uC[3].y);
    for (int i = 0; i < nr; i++) {
      vec4 q = uR[i];
      vec2 dv = hit - q.xy;
      float rr = length(dv) + 0.002, s = rr - q.z * 0.5, ww = 0.09 + 0.09 * q.z, lam = 0.085 + 0.05 * q.z;
      float e = exp(-s * s / (ww * ww)) * q.w / ((1.0 + q.z * 0.9) * sqrt(rr + 0.3));
      sl += dv / rr * (-sin(s * 6.2832 / lam) * e);
      glint += q.w * exp(-rr * rr / 0.003) * exp(-q.z * 14.0);
    }
    // the surface stretches each reflected point into a short upright dash (longer close in, leaning with a current)
    tuv = uv + vec2(sl.x * 0.4 + sl.y * uC[7].z, sl.y * (0.9 + 2.2 * down)) * f;
    ringL = max(sl.y * 36.0 + sl.x * 10.0, 0.0);
    ringL = min(ringL * ringL * 1.6 + ringL * 0.3, 1.1);
    rf = mix(0.30, 0.74, pow(1.0 - down, 4.0));
  }
  vec3 col = texture(uS, tuv).rgb;
  vec3 hal = texture(uB0, tuv).rgb, wide = texture(uB1, tuv).rgb;
  col = (col + hal * 0.42 + wide * 0.10) * rf + uC[6].rgb * glint * 3.0;
  // a ring's far slope tilts toward the bright cave ahead: a faint lift only, the rings read by what they do to the stars
  col += wide * 0.5 * ringL;
  // the mist: a low layer on the water lit from above by the colony, thinning upward
  float ay = abs(ray.y);
  vec2 mn = vec2(ray.x / (ay + 0.4) * 0.11 + uC[2].w * 0.004, ay * 7.0 + uC[2].w * 0.002);
  float mi = texture(uW, mn).b;
  float band = exp(-ay * ay * (ray.y > 0.0 ? 900.0 : 22.0));
  // lit by the cave straight above the waterline at this x, so it is a level sheet and not a ghost of what is above
  float hy = 0.5 - 0.5 * (uC[2].y * f + n.x * uC[0].y) / uC[1].y;
  vec3 above = texture(uB1, vec2(uv.x, clamp(hy + 0.035, 0.0, 1.0))).rgb;
  col += uC[3].w * (0.2 + mi * 0.8) * (above * 0.3 * band + wide * 0.06);
  // the torch in the mist
  if (uC[4].w > 0.002) {
    vec3 Dd = ray; Dd.y = ray.y < 0.0 && aS < 0.5 ? -ray.y : ray.y;
    float cb = dot(Dd, uC[4].xyz);
    col += uC[4].w * vec3(1.0, 0.84, 0.62) * (smoothstep(0.86, 0.97, cb) * 0.6 + smoothstep(0.96, 1.0, cb) * 0.5) * (0.007 + 0.03 * mi) * rf;
  }
  // tonemap
  float lm = dot(col, vec3(0.2, 0.6, 0.2));
  col += vec3(0.75, 0.32, 0.22) * max(lm - 1.0, 0.0) * 0.0;
  vec3 y = 1.0 - exp(-col * uC[3].z);
  y = pow(y, vec3(0.4545));
  y = mix(y, y * y * (3.0 - 2.0 * y), 0.3);
  // lens falloff
  y *= 1.0 - 0.14 * smoothstep(0.55, 2.0, dot(n, n));
  float g = h21(fc + uC[6].w) + h21(fc * 1.37 + uC[6].w + 17.0) - 1.0;
  y += g * 0.005;
  o = vec4(clamp(y, 0.0, 1.0), 1.0);
}`,C0=typeof FinalizationRegistry=="function"?new FinalizationRegistry(e=>{try{const t=e(),C=t.gl;t.tex.forEach(S=>C.deleteTexture(S)),t.fb.forEach(S=>C.deleteFramebuffer(S)),t.rb.forEach(S=>C.deleteRenderbuffer(S)),t.vao.forEach(S=>{S.buf&&C.deleteBuffer(S.buf),C.deleteVertexArray(S)})}catch{}}):null,_o=e=>()=>e;function So(e){let t=N0.get(e);if(t)return t;e.bindVertexArray(null),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,4);const C=(r,s)=>{const u=e.createShader(r);return e.shaderSource(u,s),e.compileShader(u),u},S={rock:[po,I0],stal:[To,I0],worm:[yo,Eo],silk:[bo,Ao],state:[m0,Ro],blur:[m0,Mo],comp:[m0,Fo]},yt=[],v={};for(const r in S){const s=C(e.VERTEX_SHADER,S[r][0]),u=C(e.FRAGMENT_SHADER,S[r][1]);yt.push([s,S[r][0]],[u,S[r][1]]);const x=e.createProgram();e.attachShader(x,s),e.attachShader(x,u),e.bindAttribLocation(x,0,"aA"),e.bindAttribLocation(x,1,"aB"),e.linkProgram(x),v[r]=x}for(const r in v)if(!e.getProgramParameter(v[r],e.LINK_STATUS)){let s=e.getProgramInfoLog(v[r]);for(const[u,x]of yt){const g=e.getShaderInfoLog(u);g&&(s+=Gt+g+Gt+x.split(Gt).map((k,J)=>J+1+": "+k).join(Gt))}throw new Error("169 shader "+r+": "+s)}const G=(r,s)=>e.getUniformLocation(r,s),D={};for(const r of["rock","stal","worm","silk"])D[r]={V:G(v[r],"uV"),St:G(v[r],"uSt")};D.rock.P=G(v.rock,"uP"),D.rock.N=G(v.rock,"uN"),D.rock.D=G(v.rock,"uD"),D.stal.D=G(v.stal,"uD"),D.state={T:G(v.state,"uT"),A:G(v.state,"uA"),G:G(v.state,"uG")},D.blur={T:G(v.blur,"uT"),T2:G(v.blur,"uT2"),B:G(v.blur,"uB")},D.comp={C:G(v.comp,"uC"),R:G(v.comp,"uR"),S:G(v.comp,"uS"),B0:G(v.comp,"uB0"),B1:G(v.comp,"uB1"),W:G(v.comp,"uW")},e.useProgram(v.rock),e.uniform1i(D.rock.St,0),e.uniform1i(D.rock.P,1),e.uniform1i(D.rock.N,2),e.uniform1i(D.rock.D,3),e.useProgram(v.stal),e.uniform1i(D.stal.St,0),e.uniform1i(D.stal.D,3),D.worm.WA=G(v.worm,"uWA"),D.worm.W0=G(v.worm,"uW0"),e.useProgram(v.worm),e.uniform1i(D.worm.St,0),e.uniform1i(D.worm.WA,5),e.uniform1i(G(v.worm,"uN"),2),e.useProgram(v.silk),e.uniform1i(D.silk.St,0),e.useProgram(v.state),e.uniform1i(D.state.T,0),e.useProgram(v.blur),e.uniform1i(D.blur.T,0),e.useProgram(v.comp),e.uniform1i(D.comp.S,0),e.uniform1i(D.comp.B0,1),e.uniform1i(D.comp.B1,2),e.uniform1i(D.comp.W,3);let Ft=!!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float"));if(Ft){const r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,4,4,0,e.RGBA,e.HALF_FLOAT,null);const s=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,s),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),Ft=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE,e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(s),e.deleteTexture(r)}const lt=new Uint16Array(Z*(d0-1)*6);{let r=0;for(let s=0;s<d0-1;s++)for(let u=0;u<Z;u++){const x=s*z+u,g=x+1,k=x+z,J=k+1;lt[r++]=x,lt[r++]=k,lt[r++]=g,lt[r++]=g,lt[r++]=k,lt[r++]=J}}const De=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,De),e.bufferData(e.ELEMENT_ARRAY_BUFFER,lt,e.STATIC_DRAW);const ut=new Uint16Array(Qe*qt*6);{let r=0;for(let s=0;s<Qe;s++)for(let u=0;u<qt;u++){const x=s*(qt+1)+u,g=x+1,k=x+qt+1,J=k+1;ut[r++]=x,ut[r++]=k,ut[r++]=g,ut[r++]=g,ut[r++]=k,ut[r++]=J}}const Lt=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,Lt),e.bufferData(e.ELEMENT_ARRAY_BUFFER,ut,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null);const Et=new Float32Array(65536);{let r=5787;for(let s=0;s<65536;s++){r=r+1831565813|0;let u=Math.imul(r^r>>>15,1|r);u=u+Math.imul(u^u>>>7,61|u)^u,Et[s]=((u^u>>>14)>>>0)/4294967296}}const y=(r,s,u,x)=>{let g=Math.floor(r),k=Math.floor(s);const J=r-g,Ct=s-k;g=(g%u+u)%u,k=(k%x+x)%x;const Je=(g+1)%u,ie=(k+1)%x,ge=J*J*(3-2*J),Re=Ct*Ct*(3-2*Ct),Me=Et[k<<8|g],Le=Et[k<<8|Je],ce=Et[ie<<8|g],$t=Et[ie<<8|Je];return Me+(Le-Me)*ge+(ce-Me)*Re+(Me-Le-ce+$t)*ge*Re},p=256,ft=new Float32Array(p*p),ne=new Float32Array(p*p);for(let r=0;r<p;r++)for(let s=0;s<p;s++){const u=s/p,x=r/p,g=y(u*6,x*14,6,14),k=1-Math.abs(2*y(u*5+3,x*28,5,28)-1),J=y(u*34,x*42,34,42),Ct=y(u*86,x*86,86,86);ft[r*p+s]=.42*g+.3*k*k+.2*J+.08*Ct,ne[r*p+s]=.55*y(u*4+9,x*9+4,4,9)+.3*y(u*11+1,x*44,11,44)+.15*Ct}const Wt=new Uint8Array(p*p*4);for(let r=0;r<p;r++)for(let s=0;s<p;s++){const u=r*p+s,x=ft[r*p+(s+1)%p]-ft[r*p+(s+p-1)%p],g=ft[(r+1)%p*p+s]-ft[(r+p-1)%p*p+s];Wt[u*4]=Math.max(0,Math.min(255,128+x*900)),Wt[u*4+1]=Math.max(0,Math.min(255,128+g*900)),Wt[u*4+2]=ft[u]*255,Wt[u*4+3]=Math.min(255,ne[u]*300)}const wt=(r,s,u,x)=>{const g=e.createTexture();return e.bindTexture(e.TEXTURE_2D,g),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,r,s,0,e.RGBA,e.UNSIGNED_BYTE,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,x?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),x&&e.generateMipmap(e.TEXTURE_2D),g},Ae=wt(p,p,Wt,!0),b=128,rt=new Float32Array(b*b),se=new Uint8Array(b*b*4);for(let r=0;r<b;r++)for(let s=0;s<b;s++){const u=s/b,x=r/b;rt[r*b+s]=.55*y(u*7+20,x*7+50,7,7)+.3*y(u*15+60,x*15+90,15,15)+.15*y(u*31+7,x*31,31,31)}for(let r=0;r<b;r++)for(let s=0;s<b;s++){const u=r*b+s,x=rt[r*b+(s+1)%b]-rt[r*b+(s+b-1)%b],g=rt[(r+1)%b*b+s]-rt[(r+b-1)%b*b+s],k=s/b,J=r/b,Ct=.6*y(k*4+33,J*4+77,4,4)+.4*y(k*9+13,J*9+37,9,9);se[u*4]=Math.max(0,Math.min(255,128+x*1300)),se[u*4+1]=Math.max(0,Math.min(255,128+g*1300)),se[u*4+2]=Math.max(0,Math.min(255,(Ct-.2)*420)),se[u*4+3]=255}const Xt=wt(b,b,se,!0),W=new Uint32Array(12e4*6);for(let r=0,s=0;r<W.length;r+=6,s+=4)W[r]=s,W[r+1]=s+1,W[r+2]=s+2,W[r+3]=s+2,W[r+4]=s+1,W[r+5]=s+3;const Ht=e.createVertexArray();e.bindVertexArray(Ht);const Yt=e.createBuffer();return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,Yt),e.bufferData(e.ELEMENT_ARRAY_BUFFER,W,e.STATIC_DRAW),e.bindVertexArray(null),t={P:v,U:D,hfOK:Ft,rockIB:De,stalIB:Lt,detail:Ae,water:Xt,wormVAO:Ht,emptyVAO:e.createVertexArray()},N0.set(e,t),t}L0.add({num:169,name:"Glowworm Cave",fam:"Worlds",recipe:"A limestone cave over still black water, seen from a drifting boat. Thousands of glowworms hang from the ceiling, and a noise or a light makes them fade in a slow wave. How crowded the ceiling is and the glow colour change every mint. Drag to paddle, tap the water to drop a pebble, or hold for a dim torch that shows the rock while the glow nearby goes out.",interactive:"Drag to paddle: the boat drifts that way, the lights slide past with real depth and ripples spread from the bow. Tap the water to drop a pebble: the rings break the reflected stars and the noise makes nearby worms fade. Hold for a dim torch: wet limestone, stalactites and glittering silk appear, and the glow nearby goes out; let go and it slowly comes back.",music:!0,gl:!0,fps:30,seed:2,make(e){const t=e.gl,C=e.size,S=So(t),yt=S.U,v=S.P;t.bindVertexArray(null),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.colorMask(!0,!0,!0,!0);const G=Math.sqrt(C/1e3),D=(e.hash||"0x0").slice(2).padEnd(64,"0"),Ft=i=>parseInt(D.slice(i*8,i*8+8),16)>>>0,lt=i=>{let a=i>>>0;const c=()=>{a=a+1831565813|0;let h=Math.imul(a^a>>>15,1|a);return h=h+Math.imul(h^h>>>7,61|h)^h,((h^h>>>14)>>>0)/4294967296};return c.st=h=>h===void 0?a:a=h,c},De=lt((Ft(0)^Math.imul(Ft(5),739982445)^361)>>>0),ut=lt((Ft(1)^51838)>>>0),Lt=lt((Ft(2)^24817)>>>0),Et=lt((Ft(3)^20754)>>>0),y=lt((Ft(4)^53787)>>>0),p=(i,a)=>{let c=0;for(const tt of a)c+=tt;let h=De()*c,P=0;for(;h>=a[P]&&P<a.length-1;)h-=a[P++];return i[P]};let ft=p(["Sparse","Dense","Galaxy band"],[34,54,12]),ne=p(["Blue-green","Teal","Green"],[52,36,12]),Wt=p(["Low vault","High cathedral","Narrow slot"],[48,40,12]),wt=p(["Mirror still","Gentle drip","Slow current"],[42,46,12]),Ae=p(["Mid-channel","Hugging the wall"],[55,45]),b=p(["Clear","Low mist","Thick mist"],[40,46,14]),rt=p(["Short lines","Long lines","Silk curtains"],[38,50,12]);e.home&&(ft="Dense",ne="Blue-green",Wt="Low vault",wt="Gentle drip",Ae="Mid-channel",b="Low mist",rt="Long lines");const se=lt((Ft(6)^20907)>>>0);let Xt=(()=>{const i=["Ahead","To the near wall","Up into the colony"],a=[56,28,16];let c=se()*100,h=0;for(;c>=a[h]&&h<2;)c-=a[h++];return i[h]})();e.home&&(Xt="Ahead"),(Xt==="Up into the colony"||Xt==="To the near wall")&&(Ae="Mid-channel"),e.trait("Colony",ft),e.trait("Glow",ne),e.trait("Cave",Wt),e.trait("Water",wt),e.trait("Boat",Ae),e.trait("Mist",b),e.trait("Silk",rt),e.trait("View",Xt);const W=["Low vault","High cathedral","Narrow slot"].indexOf(Wt),Ht=ft==="Sparse"?13e3:6e4,Yt=ne==="Blue-green"?[.03,.58,.8]:ne==="Teal"?[.02,.7,.46]:[.17,.62,.1],r=b==="Clear"?.25:b==="Low mist"?.8:1.9,s=b==="Thick mist"?13:30,u=b==="Thick mist"?.18:.14,x=wt==="Mirror still"?6e-4:wt==="Gentle drip"?.002:.006,g=.82,k=[2.5,3,2.1][W],J=lt((Ft(7)^14974)>>>0),Ct=e.home?-.3:(J()<.5?-1:1)*(.16+.16*J()),Je=Xt==="Up into the colony"?.55:0,ie=Xt==="To the near wall"?.72:Xt==="Ahead"?Ct:0,ge=S.world&&S.world.key===e.hash?S.world:S.world=(()=>{const i=new Float32Array(65536);for(let o=0;o<65536;o++)i[o]=ut();const a=(o,n,l)=>{const E=o|0,m=n|0,w=o-E,M=n-m,U=E&l,$=E+1&l,K=m&255,I=m+1&255,Rt=w*w*(3-2*w),Dt=M*M*(3-2*M),Q=i[K<<8|U],O=i[K<<8|$],pt=i[I<<8|U],Tt=i[I<<8|$];return Q+(O-Q)*Rt+(pt-Q)*Dt+(Q-O-pt+Tt)*Rt*Dt},c=[6.2,7.5,2.1][W],h=[3.5,11,7][W],P=[2.6,5,1.6][W],tt=[2.2,3,1.5][W],H=ut()*6.283,Bt=ut()*6.283,j=new Float32Array(F),bt=o=>{const n=o/T*6.28318530718;return tt*(Math.sin(n+H)+.45*Math.sin(2*n+Bt))};for(let o=0;o<F;o++)j[o]=bt(o*Mt);const xt=ut()*T,R=ut()<.5?0:1,X=z*F,V=new Float32Array(X*4),Vt=new Uint8Array(X*4),oe=new Float32Array(X),xe=new Float32Array(X),Be=(o,n)=>{const l=o-n;return l-T*Math.round(l/T)},je=ut()*T,c0=.3+ut()*.25,we=new Float32Array(49),pe=new Float32Array(49),Te=new Float32Array(49);for(let o=0;o<F;o++){const n=o*Mt,l=o/F,E=c*(.85+.42*a(l*4+11.3,3.1,3)),m=h*(.82+.4*a(l*4+41.7,9.3,3));for(let w=0;w<=48;w++){const M=w/48;we[w]=.6*a(l*8,M*5+20,7)+.4*a(l*16+3,M*10+40,15)-.5;const U=1-Math.abs(2*a(l*16,M*2.2+70,15)-1);pe[w]=U,Te[w]=.7*a(l*8+150,M*6+170,7)+.3*a(l*32+190,M*13+210,31)}for(let w=0;w<z;w++){const M=w/Z,U=M*Math.PI,$=Math.cos(U),K=Math.sin(U),I=Math.min(47,w>>2),Rt=(w-I*4)/4,Dt=1/Math.sqrt($*$/(E*E)+K*K/(m*m)),Q=we[I]+(we[I+1]-we[I])*Rt,O=pe[I]+(pe[I+1]-pe[I])*Rt,pt=O*O*O,Tt=.6*a(l*32+7,M*18+90,31)+.4*a(l*64+2,M*36+110,63)-.5,Ye=a(l*128,M*90+130,127)-.5;let ct=Dt+P*(.55*Q-.34*pt+.22*Tt+.05*Ye);if(W===1){const be=R?U:Math.PI-U,h0=a(l*8+13,5.5,7),Ke=Math.exp(-Math.pow((be-.95)/.62,2))*Math.min(1,Math.max(0,(h0-.28)/.3));ct+=(3.1+2.6*(Q+.5)+1.1*Tt+1.2*O-ct)*Math.min(1,Ke*1.2)}const Io=2,Co=[1.8,2.2,1.25][W],ko=[4.2,4.2,1.6][W],uo=(be,h0,Ke)=>{const xo=Math.max(Ke-Math.abs(be-h0),0)/Ke;return Math.max(be,h0)+xo*xo*Ke*.25},fo=Math.min(1,Math.max(0,(ko-Math.abs(ct*$))/1.4))*Math.min(1,Math.max(0,(K-.25)/.3));fo>0&&(ct=uo(ct,ct+(Io/K-ct)*fo,.9)),ct=uo(ct,Co,.5);const $e=o*z+w;xe[$e]=ct,V[$e*4]=j[o]+ct*$,V[$e*4+1]=ct*K;const Po=Te[I]+(Te[I+1]-Te[I])*Rt,ho=.55*Q+.3*Tt+.12*Ye-.3*pt,Go=ct*K,g0=Math.min(1,Math.max(0,(Go-.1)/.5));let f0=(.09+.91*Math.min(1,Math.max(0,(Po-(ft==="Sparse"?.56:.36))/.2)))*(.3+.7*Math.min(1,Math.max(0,(ho+.06)/.16)))*g0;if(ft==="Galaxy band"){const be=(M-.5+c0*Math.sin((n+je)/T*6.2832)*.5)/.16;f0=f0*.1+g0*Math.exp(-be*be)*(.3+.7*a(l*32+5,M*24+60,31))*1.2}const mo=Be(n,xt+3.2),vo=(U-(R?1.15:1.95))/.7;f0+=(ft==="Sparse"?2.6:.9)*Math.exp(-mo*mo/(ft==="Sparse"?16:9)-vo*vo)*g0,oe[$e]=f0,V[$e*4+3]=ho}}for(let o=0;o<F;o++)for(let n=0;n<z;n++){const l=o*z+n,E=o*z+Math.max(n-1,0),m=o*z+Math.min(n+1,Z),w=(o+1)%F*z+n,M=(o+F-1)%F*z+n,U=V[m*4]-V[E*4],$=V[m*4+1]-V[E*4+1];let K=V[w*4]-V[M*4],I=V[w*4+1]-V[M*4+1];const Rt=2*Mt;K=K-(j[(o+1)%F]-j[(o+F-1)%F])*.5;let Dt=-$*Rt,Q=U*Rt,O=$*K-U*I;const pt=Math.hypot(Dt,Q,O)||1;Dt/=pt,Q/=pt,O/=pt,Vt[l*4]=(Dt*.5+.5)*255,Vt[l*4+1]=(Q*.5+.5)*255,Vt[l*4+2]=(O*.5+.5)*255,Vt[l*4+3]=255}const q=49,zt=96;let Y=new Float32Array(q*zt);for(let o=0;o<F;o++)for(let n=0;n<z;n++){const l=n>>2,E=o>>2;Y[E*q+l]+=oe[o*z+n]}const Nt=new Float32Array(q*zt);for(let o=0;o<3;o++){for(let n=0;n<zt;n++)for(let l=0;l<q;l++)Nt[n*q+l]=Y[n*q+Math.max(l-1,0)]+Y[n*q+l]*2+Y[n*q+Math.min(l+1,q-1)];for(let n=0;n<zt;n++)for(let l=0;l<q;l++)Y[n*q+l]=Nt[(n+1)%zt*q+l]+Nt[n*q+l]*2+Nt[(n+zt-1)%zt*q+l]}let et=0;for(let o=0;o<Y.length;o++)Y[o]>et&&(et=Y[o]);const re=Ht>3e4?1:.6;for(let o=0;o<F;o++)for(let n=0;n<z;n++){const l=n/4,E=o/4,m=Math.min(q-2,Math.floor(l)),w=Math.floor(E)%zt,M=(w+1)%zt,U=l-m,$=E-Math.floor(E),K=(Y[w*q+m]*(1-U)+Y[w*q+m+1]*U)*(1-$)+(Y[M*q+m]*(1-U)+Y[M*q+m+1]*U)*$;V[(o*z+n)*4+2]=re*(.22+.78*K/et)}const ot=new Float32Array(Ht*8),qe=new Int32Array(Ht);let Ve=0;const ye=(o,n,l)=>{const E=Math.min(Z-1,Math.floor(o)),m=o-E,w=Math.floor(n)%F,M=(w+1)%F,U=n-Math.floor(n);return(V[(w*z+E)*4+l]*(1-m)+V[(w*z+E+1)*4+l]*m)*(1-U)+(V[(M*z+E)*4+l]*(1-m)+V[(M*z+E+1)*4+l]*m)*U},kt=96,Ut=new Int32Array(kt+1);let ze=0;for(let o=0;o<F*z;o++)o%z!==Z&&(ze+=oe[o]*xe[o]);const ae=ze/Ht;let Pt=Lt()*ae,f=0;for(let o=0;o<F;o++){Ut[Math.floor(o/F*kt)]=Ut[Math.floor(o/F*kt)]||f;for(let n=0;n<Z;n++){const l=o*z+n;for(Pt+=oe[l]*xe[l];Pt>=ae&&f<Ht;){Pt-=ae;const E=Math.min(Z-.001,Math.max(0,n+Lt()*1.6-.3)),m=o+Lt()*1,w=m/F,M=E/Z,U=ye(E,m,0),$=ye(E,m,1),K=(Vt[l*4]/127.5-1)*.03,I=(Vt[l*4+1]/127.5-1)*.03,Rt=a(w*8+77,M*5+200,7),Dt=Math.exp((Lt()+Lt()+Lt()-1.5)*1.75),Q=Rt*Rt,O=ye(E,m,2),pt=(.25+7*Q*Q)*Dt/(1+.8*O*O)*(ft==="Sparse"?1.8:1),Tt=f*8;ot[Tt]=U+K,ot[Tt+1]=$+I,ot[Tt+2]=m*Mt%T,ot[Tt+3]=pt,ot[Tt+4]=Lt(),ot[Tt+5]=Lt()*6.283,ot[Tt+6]=M,ot[Tt+7]=w;const Ye=U-j[o],ct=$-g;Ye*Ye+ct*ct<36&&(qe[Ve++]=f),f++}}}Ut[kt]=f;for(let o=1;o<kt;o++)Ut[o]||(Ut[o]=Ut[o-1]);const B=f,L=new Float32Array(Math.max(1,Math.ceil(B/512))*512*8);L.set(ot.subarray(0,B*8));const _=rt==="Silk curtains"?22e3:11e3,N=new Float32Array(_*8),At=rt==="Short lines"?.05:rt==="Long lines"?.1:.26,it=rt==="Short lines"?.2:rt==="Long lines"?.42:.85,Ot=rt==="Silk curtains"?8:5,l0=Math.min(1,_/Math.max(1,Ve*Ot));let It=0;for(let o=0;o<Ve&&It<_-12;o++){if(Et()>l0)continue;const n=qe[o]*8,l=2+Math.floor(Et()*(Ot*2-3));for(let E=0;E<l&&It<_;E++){const m=It*8,w=At+(it-At)*Math.pow(Et(),3);N[m]=ot[n]+(Et()-.5)*.08,N[m+1]=ot[n+1],N[m+2]=ot[n+2]+(Et()-.5)*.08,N[m+3]=w,N[m+4]=Et()*6.283,N[m+5]=Et()*.4,N[m+6]=ot[n+6],N[m+7]=ot[n+7],It++}}const Ee=96,He=new Int32Array(Ee+1),co=new Float32Array(It*8);for(let o=0;o<It;o++)He[Math.min(Ee-1,Math.floor(N[o*8+2]/T*Ee))+1]++;for(let o=0;o<Ee;o++)He[o+1]+=He[o];{const o=He.slice();for(let n=0;n<It;n++){const l=Math.min(Ee-1,Math.floor(N[n*8+2]/T*Ee)),E=o[l]++;for(let m=0;m<8;m++)co[E*8+m]=N[n*8+m]}}const z0=420,jt=new Float32Array(z0*8),D0=[];let u0=0,lo=0;for(;u0<z0&&lo<z0*40;){lo++;const o=(.08+.84*y())*Z,n=y()*F,l=n/F,E=o/Z,m=a(l*16+230,E*7+15,15);if(y()>m*m*2.2)continue;const w=ye(o,n,0),M=ye(o,n,1),U=n|0,$=o|0;if(M<1.7)continue;let I=(.1+1.25*Math.pow(y(),2.2))*(W===1?1.7:1)+(y()<.1?.3+y()*.9:0);Math.abs(w-j[U])<2&&(I=Math.min(I,Math.max(.1,M-1.55))),I=Math.min(I,M-.25);const Dt=y()<.28,Q=Dt?.008+.006*y():I*(.11+.14*y())+.012,O=u0*8;{const pt=.12+.35*I+Q*2;jt[O]=w,jt[O+1]=M+pt,jt[O+2]=n*Mt,jt[O+3]=I+pt}jt[O+4]=Q,jt[O+5]=y()*6.283,jt[O+6]=V[(U*z+$)*4+2],jt[O+7]=E,I>.25&&D0.length<60&&D0.push([w,n*Mt,I]),u0++}return{key:e.hash,re:y.st(),A0:c,B0:h,CEN:j,cenAt:bt,zd:Be,ph1:H,startZ:xt,shelfSide:R,pos:V,nor:Vt,wPad:L,NWP:B,WB:kt,wStart:Ut,NT:It,TB:Ee,tCnt:He,tB:co,sA:jt,ns:u0,drips:D0}})();y.st(ge.re);const{A0:Re,B0:Me,CEN:Le,cenAt:ce,zd:$t,ph1:Bo,startZ:k0,shelfSide:v0,pos:Vo,nor:zo,wPad:P0,NWP:Xo,WB:Ne,wStart:G0,NT:W0,TB:Kt,tCnt:t0,tB:Ue,sA:Do,ns:X0,drips:x0}=ge,le=(i,a,c,h,P,tt,H,Bt)=>{const j=t.createTexture();return t.bindTexture(t.TEXTURE_2D,j),t.texImage2D(t.TEXTURE_2D,0,i,a,c,0,h,P,tt),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,H),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,H),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,Bt||t.CLAMP_TO_EDGE),j},O0=le(t.RGBA32F,z,F,t.RGBA,t.FLOAT,Vo,t.NEAREST),j0=le(t.RGBA8,z,F,t.RGBA,t.UNSIGNED_BYTE,zo,t.NEAREST),e0=(i,a)=>{const c=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,c),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,i,0),a&&t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,a),c},_t=S.hfOK?[t.RGBA16F,t.RGBA,t.HALF_FLOAT]:[t.RGBA8,t.RGBA,t.UNSIGNED_BYTE],o0=64,r0=96,Fe=[le(_t[0],o0,r0,_t[1],_t[2],null,t.LINEAR,t.REPEAT),le(_t[0],o0,r0,_t[1],_t[2],null,t.LINEAR,t.REPEAT)],w0=[e0(Fe[0]),e0(Fe[1])];for(const i of w0)t.bindFramebuffer(t.FRAMEBUFFER,i),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT);let Ie=0;const Qt=[Math.max(16,C>>2),Math.max(8,C>>3),Math.max(4,C>>4),Math.max(8,C>>3)],a0=le(_t[0],C,C,_t[1],_t[2],null,t.LINEAR),p0=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,p0),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,C,C);const ue=Qt.map(i=>le(_t[0],i,i,_t[1],_t[2],null,t.LINEAR)),q0=e0(a0,p0),H0=ue.map(i=>e0(i)),Y0=(i,a)=>{const c=t.createVertexArray();t.bindVertexArray(c);const h=t.createBuffer();return c.buf=h,t.bindBuffer(t.ARRAY_BUFFER,h),t.bufferData(t.ARRAY_BUFFER,i,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,4,t.FLOAT,!1,32,0),t.vertexAttribDivisor(0,2),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,16),t.vertexAttribDivisor(1,2),t.bindVertexArray(null),c},$0=le(t.RGBA32F,1024,P0.length/4096,t.RGBA,t.FLOAT,P0,t.NEAREST),T0=Y0(Ue),y0=Y0(Do.subarray(0,X0*8));t.bindVertexArray(y0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,S.stalIB),t.bindVertexArray(null);const E0=t.createVertexArray();t.bindVertexArray(E0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,S.rockIB),t.bindVertexArray(null);const d=new Float32Array(40),A=new Float32Array(32),Ce=new Float32Array(48),ke=new Float32Array(20),ht=new Float32Array(16),n0=[];for(let i=0;i<12;i++)n0.push({x:0,z:0,age:99,amp:0});const Zt=[],K0=[Re*.42,Re*.38,.45][W],go=v0?ie:-ie,Pe=Ae==="Hugging the wall"?(go>0?-1:1)*[3.4,3.9,.42][W]:0;let St=k0,at=ce(k0)-(W===1?v0?-.6:.6:0)+Pe,Jt=0,fe=.2,he=0,s0=0;wt==="Slow current"&&(fe=.38);const Lo=wt==="Slow current"?.38:.2;let te=0,Ge=0,ee=.3,We=1,de=0,b0=1.2+De()*2,A0=1.5,R0=-1,Xe=0,M0=-1,Oe=0,F0=0;const No=wt==="Mirror still"?7.5:wt==="Gentle drip"?3.2:5.5;let Q0=0,Z0=0,_e=0,J0=0,to=!1,eo=0,oo=0,ro=0,me=0,_0=0,S0=0,ve=null,nt=0,st=null;const ao=()=>{const c=[2137,2591,3119,3557],h=3.4;st={rate:16e3,N:3200,buf:new Float32Array(3200),comb:c.map(P=>({b:new Float32Array(P),i:0,g:Math.pow(10,-3*P/(16e3*h)),lp:0})),ap:[{b:new Float32Array(347),i:0},{b:new Float32Array(113),i:0}],drops:[],paddle:0,seed:31281,lap1:0,lap2:0,phase:0,nf:0}},Uo=()=>{const i=st,a=i.buf;let c=i.seed,h=i.lap1,P=i.lap2,tt=i.nf;for(let H=0;H<i.N;H++){c=c^c<<13|0,c=c^c>>>17,c=c^c<<5|0;const Bt=c/2147483648;let j=0;for(let R=0;R<i.drops.length;R++){const X=i.drops[R];X.n++;const V=X.n/i.rate,Vt=X.f*(1+.8*Math.min(1,V/.04));X.ph+=Vt*6.2832/i.rate,j+=Math.sin(X.ph)*X.a*Math.exp(-V*38)*Math.min(1,X.n/8)}h+=(Bt-h)*.028,P+=(h-P)*.09;const bt=.5+.5*Math.sin((_e+H/i.rate)*.9+1.7*Math.sin((_e+H/i.rate)*.31));j+=P*(.5+1.4*bt*bt),tt+=(Bt-tt)*.16,j+=tt*i.paddle*.8,i.paddle*=.99985;let xt=0;for(const R of i.comb){const X=R.b[R.i];R.lp+=(X-R.lp)*.42,xt+=X,R.b[R.i]=j*.3+R.lp*R.g,R.i=(R.i+1)%R.b.length}xt*=.5;for(const R of i.ap){const X=R.b[R.i],V=xt+X*.5;R.b[R.i]=V,R.i=(R.i+1)%R.b.length,xt=X-V*.5}a[H]=Math.max(-1,Math.min(1,j*.55+xt*.8))}i.seed=c,i.lap1=h,i.lap2=P,i.nf=tt;for(let H=i.drops.length-1;H>=0;H--)i.drops[H].n>i.rate*.4&&i.drops.splice(H,1)},no=(i,a)=>{if(!e.sound.on)return;st||ao();const c=(a?.85:.5)/(1+i*.14);st.drops.length<10&&st.drops.push({n:0,ph:0,f:(a?420:760)+y()*(a?260:1e3),a:c})},i0=(i,a,c)=>{let h=n0[0];for(const P of n0)P.age>h.age&&(h=P);h.x=i,h.z=a,h.age=0,h.amp=c},B0=(i,a,c,h)=>{if(Zt.length<5){const P=Math.floor((a%T+T)%T/Mt)%F;Zt.push([i-Le[P],1.2,(a%T+T)%T,h*(W===1?4:1),c])}};function V0(i,a){a=Math.min(a,.2),nt+=a,t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.colorMask(!0,!0,!0,!0),J0+=a;const c=e.input;for(const f of c.taps())c.down?ve={x:f.x,y:f.y}:io(f.x,f.y);let h=0;if(c.inside&&c.down){to||(eo=_0=c.x,oo=S0=c.y,ro=nt,me=0);const f=Math.hypot(c.x-eo,c.y-oo);if(me!==2&&f>.022&&(me=2,ve=null),me===0&&nt-ro>.26&&(me=1,ve=null),me===2){const B=c.x-_0,L=c.y-S0;Jt+=B*3.6,fe-=L*4.2;const _=Math.hypot(B,L)/Math.max(a,.01);F0+=_*a*2.4,st&&(st.paddle=Math.min(.5,st.paddle+_*.03))}if(me===1){h=1;const B=(c.x*2-1)/Se,L=(1-c.y*2)/Se,_=dt[0]*B+mt[0]*L+vt[0],N=dt[1]*B+mt[1]*L+vt[1],At=dt[2]*B+mt[2]*L+vt[2],it=Math.hypot(_,N,At);Ge+=(_/it-Ge)*Math.min(1,a*7),ee+=(N/it-ee)*Math.min(1,a*7),We+=(At/it-We)*Math.min(1,a*7)}_0=c.x,S0=c.y}else ve&&(io(ve.x,ve.y),ve=null);to=c.inside&&c.down,te+=(h*1-te)*Math.min(1,a*(h?5:3.5)),te<.001&&(te=0);const P=Math.floor((St%T+T)%T/Mt)%F,tt=ce(St),H=ce(St+3.5);fe+=(Lo-fe)*Math.min(1,a*.35);const Bt=at-tt;let j=(ce(St+2)-tt)/2*fe+(tt+Pe+(Pe?.1:.55)*K0*Math.sin(nt*.05+Bo)-at)*.03;Jt+=(j-Jt)*Math.min(1,a*.5);const bt=Pe?Math.abs(Pe)+.35:K0;Math.abs(Bt)>bt&&(Jt-=(Bt-Math.sign(Bt)*bt)*a*1.6),at+=Jt*a,St+=fe*a;const xt=Math.atan2(H-tt,3.5)*.85+Jt*.1;he+=(xt-he)*Math.min(1,a*.7);const R=Math.sin(nt*.8+.7)*.004+Math.sin(nt*1.37)*.002,X=Math.sin(nt*.53+1.1)*.006-Jt*.012;s0-=a*(.5+Math.hypot(Jt,fe)*1.2),F0>.5?(F0=0,s0=-1,i0(at+Math.sin(he)*1.1+(y()-.5)*.3,St+Math.cos(he)*1.1,.012),B0(at,St+1,.05,6),y()<.3&&st&&(st.paddle=Math.min(.5,st.paddle+.12))):s0<0&&(s0=1.8+y()*1.6,i0(at+Math.sin(he)*1.25,St+Math.cos(he)*1.25,.0028));const V=.17+R+Je,Vt=he+(v0?ie:-ie),oe=Math.sin(Vt),xe=Math.cos(Vt),Be=Math.sin(V),je=Math.cos(V);vt[0]=oe*je,vt[1]=Be,vt[2]=xe*je;let c0=xe,we=-oe,pe=0,Te=-oe*Be,q=je,zt=-xe*Be;const Y=Math.sin(X),Nt=Math.cos(X);dt[0]=c0*Nt+Te*Y,dt[1]=pe*Nt+q*Y,dt[2]=we*Nt+zt*Y,mt[0]=-c0*Y+Te*Nt,mt[1]=-pe*Y+q*Nt,mt[2]=-we*Y+zt*Nt;const et=(St%T+T)%T,re=g+R*.8;if(b0-=a,b0<0&&x0.length){b0=No*(.5+y()*1.2);let f=null;for(let N=0;N<8;N++){const At=x0[Math.floor(y()*x0.length)],it=$t(At[1],et);if(it>1.2&&it<16){f=At;break}}const B=y()-.5,L=f?f[0]:at+B*5,_=f?f[1]:et+3+y()*8;i0(L,_,.016),B0(L,_,.3,5),no(Math.hypot(L-at,$t(_,et)),!1)}if(A0-=a,A0<0&&W0){A0=1.8+y()*3;let f=-1,B=1e9;const L=Math.floor((et+.6)/T*Kt)%Kt,_=t0[L],N=t0[Math.min(Kt,L+8)]-_;for(let At=0;At<18&&N>0;At++){const it=_+Math.floor(y()*N),Ot=$t(Ue[it*8+2],et),l0=Ue[it*8]-at,It=Ot*Ot+l0*l0;Ot>.6&&It<B&&(B=It,f=it)}Xe>Oe?(M0=f,Oe=0):(R0=f,Xe=0)}if(Xe+=a,Oe+=a,te>.05){const f=(1.6+2.6*Math.abs(ee)*0)/Math.max(.2,Math.abs(ee)),B=Math.min(7,Math.max(1.8,(2.2-re)/Math.max(.12,ee)));if(de<a*1.5){const L=at+Ge*B,_=et+We*B,N=Math.floor((_%T+T)%T/Mt)%F;Zt.length<5&&Zt.push([L-Le[N],re+ee*B,(_%T+T)%T,10,.22*te])}}if(de+=a,de>=.1||so){de=Math.min(de-.1,.1),de<0&&(de=0),t.bindFramebuffer(t.FRAMEBUFFER,w0[1-Ie]),t.viewport(0,0,o0,r0),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.depthMask(!1),t.useProgram(v.state),t.bindVertexArray(S.emptyVAO),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Fe[Ie]),ht[0]=o0,ht[1]=r0,ht[2]=.1,ht[3]=Zt.length,ht[4]=2.2,ht[5]=.6,ht[6]=.22,ht[7]=2,ht[8]=T,ht[9]=Re,ht[10]=Me,ht[11]=.11;for(let f=0;f<4;f++)ht[12+f]=0;for(let f=0;f<Zt.length&&f<4;f++){const B=Zt[f];ke[f*4]=B[0],ke[f*4+1]=B[1],ke[f*4+2]=B[2],ke[f*4+3]=B[3],ht[12+f]=B[4]}t.uniform4fv(yt.state.G,ht),t.uniform4fv(yt.state.A,ke),t.drawArrays(t.TRIANGLES,0,3),Ie=1-Ie,Zt.length=0}d[0]=dt[0],d[1]=dt[1],d[2]=dt[2],d[3]=Se,d[4]=mt[0],d[5]=mt[1],d[6]=mt[2],d[7]=C,d[8]=vt[0],d[9]=vt[1],d[10]=vt[2],d[11]=nt,d[12]=at,d[13]=re,d[14]=et,d[15]=T;const ot=.18,qe=re-.2,Ve=.1;d[16]=Ge,d[17]=ee,d[18]=We,d[19]=te*.8,d[20]=ot,d[21]=qe,d[22]=Ve,d[23]=k;const ye=Math.floor(et/Mt)-wo;d[24]=ye,d[25]=J0,d[26]=Xe<2.5&&R0>=0?Ue[R0*8+4]:-1,d[27]=Xe,d[28]=Yt[0],d[29]=Yt[1],d[30]=Yt[2],d[31]=.02,d[32]=Oe<2.5&&M0>=0?Ue[M0*8+4]:-1,d[33]=Oe,d[34]=G,d[35]=W===1?.38:1,d[36]=s,d[37]=u,d[38]=rt==="Silk curtains"?1.3:.45,d[39]=rt==="Silk curtains"?.2:.045,t.bindFramebuffer(t.FRAMEBUFFER,q0),t.viewport(0,0,C,C),t.depthMask(!0),t.clearColor(0,0,0,0),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Fe[Ie]),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,O0),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,j0),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,S.detail),t.useProgram(v.rock),t.uniform4fv(yt.rock.V,d),t.bindVertexArray(E0),t.drawElementsInstanced(t.TRIANGLES,Z*(d0-1)*6,t.UNSIGNED_SHORT,0,2),t.useProgram(v.stal),t.uniform4fv(yt.stal.V,d),t.bindVertexArray(y0),t.drawElementsInstanced(t.TRIANGLES,Qe*qt*6,t.UNSIGNED_SHORT,0,X0*2),t.depthMask(!1),t.enable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.blendFuncSeparate(t.ONE,t.ONE,t.ZERO,t.ONE),t.useProgram(v.worm),t.uniform4fv(yt.worm.V,d),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,$0),t.bindVertexArray(S.wormVAO);const kt=Math.floor(((et-4)/T+1)%1*Ne),Ut=kt+Math.ceil(45/T*Ne),ze=(f,B)=>{const L=G0[f],_=G0[B]-L;_<=0||(t.uniform1i(yt.worm.W0,L),t.drawElements(t.TRIANGLES,_*12,t.UNSIGNED_INT,0))};if(Ut<=Ne?ze(kt,Ut):(ze(kt,Ne),ze(0,Ut-Ne)),W0){t.useProgram(v.silk),t.uniform4fv(yt.silk.V,d),t.bindVertexArray(T0),t.bindBuffer(t.ARRAY_BUFFER,T0.buf);const f=Math.floor(((et-4)/T+1)%1*Kt),B=Math.ceil(11.5/T*Kt),L=f+B,_=(N,At)=>{const it=t0[N],Ot=t0[At]-it;Ot<=0||(t.vertexAttribPointer(0,4,t.FLOAT,!1,32,it*32),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,it*32+16),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,(U0+1)*2,Ot*2))};L<=Kt?_(f,L):(_(f,Kt),_(0,L-Kt))}t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.useProgram(v.blur),t.bindVertexArray(S.emptyVAO),t.activeTexture(t.TEXTURE0);const ae=(f,B,L,_,N)=>{t.bindFramebuffer(t.FRAMEBUFFER,H0[B]),t.viewport(0,0,_,_),t.bindTexture(t.TEXTURE_2D,f),t.uniform4f(yt.blur.B,N/L,N/L,1/_,1/_),t.drawArrays(t.TRIANGLES,0,3)};ae(a0,0,C,Qt[0],1),ae(ue[0],1,Qt[0],Qt[1],1.5),ae(ue[1],2,Qt[1],Qt[2],1.5),ae(ue[2],3,Qt[2],Qt[3],1),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,C,C),t.useProgram(v.comp),t.bindVertexArray(S.emptyVAO),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,a0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,ue[0]),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,ue[3]),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,S.water);let Pt=0;for(const f of n0)f.age+=a,!(f.age>9)&&(Ce[Pt*4]=f.x-at,Ce[Pt*4+1]=$t(f.z,et),Ce[Pt*4+2]=f.age,Ce[Pt*4+3]=f.amp,Pt++);Q0=wt==="Slow current"?0:nt*.002,Z0=(wt==="Slow current"?-nt*.06:nt*.003)+et*.45*0,A[0]=dt[0],A[1]=dt[1],A[2]=dt[2],A[3]=Se,A[4]=mt[0],A[5]=mt[1],A[6]=mt[2],A[7]=C,A[8]=vt[0],A[9]=vt[1],A[10]=vt[2],A[11]=nt,A[12]=re,A[13]=Pt,A[14]=2.15,A[15]=r,A[16]=Ge,A[17]=ee,A[18]=We,A[19]=te*.8,A[20]=ot,A[21]=qe-re,A[22]=Ve,A[23]=x,A[24]=Yt[0],A[25]=Yt[1],A[26]=Yt[2],A[27]=nt*61.7%311,A[28]=Q0+at*.45,A[29]=Z0+et*.45,A[30]=wt==="Slow current"?.5:0,A[31]=0,t.uniform4fv(yt.comp.C,A),t.uniform4fv(yt.comp.R,Ce),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null),t.depthMask(!0),e.sound.on&&(st||ao(),_e<nt+.3&&(_e<nt&&(_e=nt),Uo(),e.sound.pcm(st.buf,st.rate,{vel:1}),_e+=st.N/st.rate)),so=!1}const Se=1.05,dt=[1,0,0],mt=[0,1,0],vt=[0,0,1];let so=!0;function io(i,a){const c=(i*2-1)/Se,h=(1-a*2)/Se,P=dt[0]*c+mt[0]*h+vt[0],tt=dt[1]*c+mt[1]*h+vt[1],H=dt[2]*c+mt[2]*h+vt[2],Bt=Math.max(.03,Math.abs(tt)),j=Math.min(26,g/Bt),bt=at+P*j,xt=St+H*j;i0(bt,xt,.03);{const R=Math.hypot(bt-at,$t(xt,St))||1,X=$t(xt,St)/R,V=(bt-at)/R;B0(bt+V*3,xt+X*3,.95,26)}no(j,!0)}return V0(0,0),C0&&C0.register(V0,_o({gl:t,tex:[O0,j0,$0,Fe[0],Fe[1],a0,...ue],fb:[...w0,q0,...H0],rb:[p0],vao:[T0,y0,E0]})),V0}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
