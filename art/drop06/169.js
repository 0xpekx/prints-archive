// Glowworm Cave: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/169.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(D0){D0&&function(){"use strict";const g0=new WeakMap,Gt=`
`,gt="#version 300 es"+Gt+"precision highp float;"+Gt+"precision highp int;"+Gt+"precision highp sampler2D;"+Gt+""+Gt,Z=192,F=384,Mt=.125,T=48,mo=32,h0=336,z=Z+1,L0=6,Qe=18,qt=10,Ze=`uniform vec4 uV[10];
vec4 prj(vec3 r, out vec3 w){ r.z += 2.4 * max(r.z - 18.0, 0.0); w = vec3(dot(r, uV[0].xyz), dot(r, uV[1].xyz), dot(r, uV[2].xyz)); return vec4(w.x * uV[0].w, w.y * uV[0].w, w.z * 1.0029 - 0.2003, w.z); }
`,vo=gt+Ze+`uniform sampler2D uP; uniform sampler2D uN; uniform sampler2D uSt;
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
}`,xo=gt+Ze+`uniform sampler2D uSt; in vec4 aA; in vec4 aB;
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
}`,N0=gt+`uniform vec4 uV[10]; uniform sampler2D uD;
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
}`,wo=gt+Ze+`uniform sampler2D uSt; uniform sampler2D uWA; uniform sampler2D uN; uniform int uW0; out vec2 vQ; out vec4 vC;
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
}`,po=gt+`in vec2 vQ; in vec4 vC; out vec4 o;
void main(){
  float r2 = dot(vQ, vQ);
  if (r2 > 1.0) discard;
  float g = exp(-r2 * 2.6) - 0.074;
  float dsk = smoothstep(1.0, 0.72, r2) * (0.8 + 0.3 * r2);
  o = vec4(vC.rgb * mix(g, dsk, vC.w), 0.0);
}`,To=gt+Ze+`uniform sampler2D uSt; in vec4 aA; in vec4 aB; out vec2 vQ; out vec4 vC; out vec4 vW;
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
  float t = float(seg) / ${L0.toFixed(1)};
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
}`,yo=gt+`in vec2 vQ; in vec4 vC; in vec4 vW; out vec4 o;
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
}`,d0=gt+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",Eo=gt+`uniform sampler2D uT; uniform vec4 uA[5]; uniform vec4 uG[4]; out vec4 o;
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
}`,bo=gt+`uniform sampler2D uT; uniform sampler2D uT2; uniform vec4 uB; out vec4 o;
void main(){
  vec2 uv = gl_FragCoord.xy * uB.zw;
  vec2 e = uB.xy;
  vec3 c = texture(uT, uv + e).rgb + texture(uT, uv - e).rgb + texture(uT, uv + vec2(e.x, -e.y)).rgb + texture(uT, uv + vec2(-e.x, e.y)).rgb;
  o = vec4(c * 0.25, 1.0);
}`,Ao=gt+`uniform vec4 uC[8]; uniform vec4 uR[12]; uniform sampler2D uS; uniform sampler2D uB0; uniform sampler2D uB1; uniform sampler2D uW; out vec4 o;
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
}`,U0=typeof FinalizationRegistry=="function"?new FinalizationRegistry(e=>{try{const t=e.gl;e.tex.forEach(B=>t.deleteTexture(B)),e.fb.forEach(B=>t.deleteFramebuffer(B)),e.vao.forEach(B=>{B.buf&&t.deleteBuffer(B.buf),t.deleteVertexArray(B)})}catch{}}):null;function Ro(e){let t=g0.get(e);if(t)return t;e.bindVertexArray(null),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,4);const B=(r,s)=>{const u=e.createShader(r);return e.shaderSource(u,s),e.compileShader(u),u},C={rock:[vo,N0],stal:[xo,N0],worm:[wo,po],silk:[To,yo],state:[d0,Eo],blur:[d0,bo],comp:[d0,Ao]},yt=[],v={};for(const r in C){const s=B(e.VERTEX_SHADER,C[r][0]),u=B(e.FRAGMENT_SHADER,C[r][1]);yt.push([s,C[r][0]],[u,C[r][1]]);const x=e.createProgram();e.attachShader(x,s),e.attachShader(x,u),e.bindAttribLocation(x,0,"aA"),e.bindAttribLocation(x,1,"aB"),e.linkProgram(x),v[r]=x}for(const r in v)if(!e.getProgramParameter(v[r],e.LINK_STATUS)){let s=e.getProgramInfoLog(v[r]);for(const[u,x]of yt){const g=e.getShaderInfoLog(u);g&&(s+=Gt+g+Gt+x.split(Gt).map((k,J)=>J+1+": "+k).join(Gt))}throw new Error("169 shader "+r+": "+s)}const G=(r,s)=>e.getUniformLocation(r,s),D={};for(const r of["rock","stal","worm","silk"])D[r]={V:G(v[r],"uV"),St:G(v[r],"uSt")};D.rock.P=G(v.rock,"uP"),D.rock.N=G(v.rock,"uN"),D.rock.D=G(v.rock,"uD"),D.stal.D=G(v.stal,"uD"),D.state={T:G(v.state,"uT"),A:G(v.state,"uA"),G:G(v.state,"uG")},D.blur={T:G(v.blur,"uT"),T2:G(v.blur,"uT2"),B:G(v.blur,"uB")},D.comp={C:G(v.comp,"uC"),R:G(v.comp,"uR"),S:G(v.comp,"uS"),B0:G(v.comp,"uB0"),B1:G(v.comp,"uB1"),W:G(v.comp,"uW")},e.useProgram(v.rock),e.uniform1i(D.rock.St,0),e.uniform1i(D.rock.P,1),e.uniform1i(D.rock.N,2),e.uniform1i(D.rock.D,3),e.useProgram(v.stal),e.uniform1i(D.stal.St,0),e.uniform1i(D.stal.D,3),D.worm.WA=G(v.worm,"uWA"),D.worm.W0=G(v.worm,"uW0"),e.useProgram(v.worm),e.uniform1i(D.worm.St,0),e.uniform1i(D.worm.WA,5),e.uniform1i(G(v.worm,"uN"),2),e.useProgram(v.silk),e.uniform1i(D.silk.St,0),e.useProgram(v.state),e.uniform1i(D.state.T,0),e.useProgram(v.blur),e.uniform1i(D.blur.T,0),e.useProgram(v.comp),e.uniform1i(D.comp.S,0),e.uniform1i(D.comp.B0,1),e.uniform1i(D.comp.B1,2),e.uniform1i(D.comp.W,3);let Ft=!!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float"));if(Ft){const r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,4,4,0,e.RGBA,e.HALF_FLOAT,null);const s=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,s),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),Ft=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE,e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(s),e.deleteTexture(r)}const lt=new Uint16Array(Z*(h0-1)*6);{let r=0;for(let s=0;s<h0-1;s++)for(let u=0;u<Z;u++){const x=s*z+u,g=x+1,k=x+z,J=k+1;lt[r++]=x,lt[r++]=k,lt[r++]=g,lt[r++]=g,lt[r++]=k,lt[r++]=J}}const ze=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,ze),e.bufferData(e.ELEMENT_ARRAY_BUFFER,lt,e.STATIC_DRAW);const ut=new Uint16Array(Qe*qt*6);{let r=0;for(let s=0;s<Qe;s++)for(let u=0;u<qt;u++){const x=s*(qt+1)+u,g=x+1,k=x+qt+1,J=k+1;ut[r++]=x,ut[r++]=k,ut[r++]=g,ut[r++]=g,ut[r++]=k,ut[r++]=J}}const Lt=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,Lt),e.bufferData(e.ELEMENT_ARRAY_BUFFER,ut,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null);const Et=new Float32Array(65536);{let r=5787;for(let s=0;s<65536;s++){r=r+1831565813|0;let u=Math.imul(r^r>>>15,1|r);u=u+Math.imul(u^u>>>7,61|u)^u,Et[s]=((u^u>>>14)>>>0)/4294967296}}const y=(r,s,u,x)=>{let g=Math.floor(r),k=Math.floor(s);const J=r-g,Ct=s-k;g=(g%u+u)%u,k=(k%x+x)%x;const Je=(g+1)%u,ie=(k+1)%x,De=J*J*(3-2*J),Ae=Ct*Ct*(3-2*Ct),Re=Et[k<<8|g],ge=Et[k<<8|Je],ce=Et[ie<<8|g],$t=Et[ie<<8|Je];return Re+(ge-Re)*De+(ce-Re)*Ae+(Re-ge-ce+$t)*De*Ae},p=256,ft=new Float32Array(p*p),ne=new Float32Array(p*p);for(let r=0;r<p;r++)for(let s=0;s<p;s++){const u=s/p,x=r/p,g=y(u*6,x*14,6,14),k=1-Math.abs(2*y(u*5+3,x*28,5,28)-1),J=y(u*34,x*42,34,42),Ct=y(u*86,x*86,86,86);ft[r*p+s]=.42*g+.3*k*k+.2*J+.08*Ct,ne[r*p+s]=.55*y(u*4+9,x*9+4,4,9)+.3*y(u*11+1,x*44,11,44)+.15*Ct}const Wt=new Uint8Array(p*p*4);for(let r=0;r<p;r++)for(let s=0;s<p;s++){const u=r*p+s,x=ft[r*p+(s+1)%p]-ft[r*p+(s+p-1)%p],g=ft[(r+1)%p*p+s]-ft[(r+p-1)%p*p+s];Wt[u*4]=Math.max(0,Math.min(255,128+x*900)),Wt[u*4+1]=Math.max(0,Math.min(255,128+g*900)),Wt[u*4+2]=ft[u]*255,Wt[u*4+3]=Math.min(255,ne[u]*300)}const wt=(r,s,u,x)=>{const g=e.createTexture();return e.bindTexture(e.TEXTURE_2D,g),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,r,s,0,e.RGBA,e.UNSIGNED_BYTE,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,x?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),x&&e.generateMipmap(e.TEXTURE_2D),g},be=wt(p,p,Wt,!0),b=128,rt=new Float32Array(b*b),se=new Uint8Array(b*b*4);for(let r=0;r<b;r++)for(let s=0;s<b;s++){const u=s/b,x=r/b;rt[r*b+s]=.55*y(u*7+20,x*7+50,7,7)+.3*y(u*15+60,x*15+90,15,15)+.15*y(u*31+7,x*31,31,31)}for(let r=0;r<b;r++)for(let s=0;s<b;s++){const u=r*b+s,x=rt[r*b+(s+1)%b]-rt[r*b+(s+b-1)%b],g=rt[(r+1)%b*b+s]-rt[(r+b-1)%b*b+s],k=s/b,J=r/b,Ct=.6*y(k*4+33,J*4+77,4,4)+.4*y(k*9+13,J*9+37,9,9);se[u*4]=Math.max(0,Math.min(255,128+x*1300)),se[u*4+1]=Math.max(0,Math.min(255,128+g*1300)),se[u*4+2]=Math.max(0,Math.min(255,(Ct-.2)*420)),se[u*4+3]=255}const Xt=wt(b,b,se,!0),W=new Uint32Array(12e4*6);for(let r=0,s=0;r<W.length;r+=6,s+=4)W[r]=s,W[r+1]=s+1,W[r+2]=s+2,W[r+3]=s+2,W[r+4]=s+1,W[r+5]=s+3;const Ht=e.createVertexArray();e.bindVertexArray(Ht);const Yt=e.createBuffer();return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,Yt),e.bufferData(e.ELEMENT_ARRAY_BUFFER,W,e.STATIC_DRAW),e.bindVertexArray(null),t={P:v,U:D,hfOK:Ft,rockIB:ze,stalIB:Lt,detail:be,water:Xt,wormVAO:Ht,emptyVAO:e.createVertexArray()},g0.set(e,t),t}D0.add({num:169,name:"Glowworm Cave",fam:"Worlds",recipe:"A limestone cave over still black water, seen from a drifting boat. Thousands of glowworms hang from the ceiling, and a noise or a light makes them fade in a slow wave. How crowded the ceiling is and the glow colour change every mint. Drag to paddle, tap the water to drop a pebble, or hold for a dim torch that shows the rock while the glow nearby goes out.",interactive:"Drag to paddle: the boat drifts that way, the lights slide past with real depth and ripples spread from the bow. Tap the water to drop a pebble: the rings break the reflected stars and the noise makes nearby worms fade. Hold for a dim torch: wet limestone, stalactites and glittering silk appear, and the glow nearby goes out; let go and it slowly comes back.",music:!0,gl:!0,fps:30,seed:2,make(e){const t=e.gl,B=e.size,C=Ro(t),yt=C.U,v=C.P;t.bindVertexArray(null),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.colorMask(!0,!0,!0,!0);const G=Math.sqrt(B/1e3),D=(e.hash||"0x0").slice(2).padEnd(64,"0"),Ft=c=>parseInt(D.slice(c*8,c*8+8),16)>>>0,lt=c=>{let a=c>>>0;const i=()=>{a=a+1831565813|0;let f=Math.imul(a^a>>>15,1|a);return f=f+Math.imul(f^f>>>7,61|f)^f,((f^f>>>14)>>>0)/4294967296};return i.st=f=>f===void 0?a:a=f,i},ze=lt((Ft(0)^Math.imul(Ft(5),739982445)^361)>>>0),ut=lt((Ft(1)^51838)>>>0),Lt=lt((Ft(2)^24817)>>>0),Et=lt((Ft(3)^20754)>>>0),y=lt((Ft(4)^53787)>>>0),p=(c,a)=>{let i=0;for(const tt of a)i+=tt;let f=ze()*i,P=0;for(;f>=a[P]&&P<a.length-1;)f-=a[P++];return c[P]};let ft=p(["Sparse","Dense","Galaxy band"],[34,54,12]),ne=p(["Blue-green","Teal","Green"],[52,36,12]),Wt=p(["Low vault","High cathedral","Narrow slot"],[48,40,12]),wt=p(["Mirror still","Gentle drip","Slow current"],[42,46,12]),be=p(["Mid-channel","Hugging the wall"],[55,45]),b=p(["Clear","Low mist","Thick mist"],[40,46,14]),rt=p(["Short lines","Long lines","Silk curtains"],[38,50,12]);e.home&&(ft="Dense",ne="Blue-green",Wt="Low vault",wt="Gentle drip",be="Mid-channel",b="Low mist",rt="Long lines");const se=lt((Ft(6)^20907)>>>0);let Xt=(()=>{const c=["Ahead","To the near wall","Up into the colony"],a=[56,28,16];let i=se()*100,f=0;for(;i>=a[f]&&f<2;)i-=a[f++];return c[f]})();e.home&&(Xt="Ahead"),(Xt==="Up into the colony"||Xt==="To the near wall")&&(be="Mid-channel"),e.trait("Colony",ft),e.trait("Glow",ne),e.trait("Cave",Wt),e.trait("Water",wt),e.trait("Boat",be),e.trait("Mist",b),e.trait("Silk",rt),e.trait("View",Xt);const W=["Low vault","High cathedral","Narrow slot"].indexOf(Wt),Ht=ft==="Sparse"?13e3:6e4,Yt=ne==="Blue-green"?[.03,.58,.8]:ne==="Teal"?[.02,.7,.46]:[.17,.62,.1],r=b==="Clear"?.25:b==="Low mist"?.8:1.9,s=b==="Thick mist"?13:30,u=b==="Thick mist"?.18:.14,x=wt==="Mirror still"?6e-4:wt==="Gentle drip"?.002:.006,g=.82,k=[2.5,3,2.1][W],J=lt((Ft(7)^14974)>>>0),Ct=e.home?-.3:(J()<.5?-1:1)*(.16+.16*J()),Je=Xt==="Up into the colony"?.55:0,ie=Xt==="To the near wall"?.72:Xt==="Ahead"?Ct:0,De=C.world&&C.world.key===e.hash?C.world:C.world=(()=>{const c=new Float32Array(65536);for(let o=0;o<65536;o++)c[o]=ut();const a=(o,n,l)=>{const E=o|0,m=n|0,w=o-E,M=n-m,U=E&l,$=E+1&l,K=m&255,I=m+1&255,Rt=w*w*(3-2*w),Dt=M*M*(3-2*M),Q=c[K<<8|U],O=c[K<<8|$],pt=c[I<<8|U],Tt=c[I<<8|$];return Q+(O-Q)*Rt+(pt-Q)*Dt+(Q-O-pt+Tt)*Rt*Dt},i=[6.2,7.5,2.1][W],f=[3.5,11,7][W],P=[2.6,5,1.6][W],tt=[2.2,3,1.5][W],H=ut()*6.283,Bt=ut()*6.283,j=new Float32Array(F),bt=o=>{const n=o/T*6.28318530718;return tt*(Math.sin(n+H)+.45*Math.sin(2*n+Bt))};for(let o=0;o<F;o++)j[o]=bt(o*Mt);const xt=ut()*T,R=ut()<.5?0:1,X=z*F,V=new Float32Array(X*4),Vt=new Uint8Array(X*4),oe=new Float32Array(X),ve=new Float32Array(X),Se=(o,n)=>{const l=o-n;return l-T*Math.round(l/T)},je=ut()*T,i0=.3+ut()*.25,xe=new Float32Array(49),we=new Float32Array(49),pe=new Float32Array(49);for(let o=0;o<F;o++){const n=o*Mt,l=o/F,E=i*(.85+.42*a(l*4+11.3,3.1,3)),m=f*(.82+.4*a(l*4+41.7,9.3,3));for(let w=0;w<=48;w++){const M=w/48;xe[w]=.6*a(l*8,M*5+20,7)+.4*a(l*16+3,M*10+40,15)-.5;const U=1-Math.abs(2*a(l*16,M*2.2+70,15)-1);we[w]=U,pe[w]=.7*a(l*8+150,M*6+170,7)+.3*a(l*32+190,M*13+210,31)}for(let w=0;w<z;w++){const M=w/Z,U=M*Math.PI,$=Math.cos(U),K=Math.sin(U),I=Math.min(47,w>>2),Rt=(w-I*4)/4,Dt=1/Math.sqrt($*$/(E*E)+K*K/(m*m)),Q=xe[I]+(xe[I+1]-xe[I])*Rt,O=we[I]+(we[I+1]-we[I])*Rt,pt=O*O*O,Tt=.6*a(l*32+7,M*18+90,31)+.4*a(l*64+2,M*36+110,63)-.5,Ye=a(l*128,M*90+130,127)-.5;let ct=Dt+P*(.55*Q-.34*pt+.22*Tt+.05*Ye);if(W===1){const Ee=R?U:Math.PI-U,f0=a(l*8+13,5.5,7),Ke=Math.exp(-Math.pow((Ee-.95)/.62,2))*Math.min(1,Math.max(0,(f0-.28)/.3));ct+=(3.1+2.6*(Q+.5)+1.1*Tt+1.2*O-ct)*Math.min(1,Ke*1.2)}const Uo=2,Io=[1.8,2.2,1.25][W],Co=[4.2,4.2,1.6][W],io=(Ee,f0,Ke)=>{const ho=Math.max(Ke-Math.abs(Ee-f0),0)/Ke;return Math.max(Ee,f0)+ho*ho*Ke*.25},co=Math.min(1,Math.max(0,(Co-Math.abs(ct*$))/1.4))*Math.min(1,Math.max(0,(K-.25)/.3));co>0&&(ct=io(ct,ct+(Uo/K-ct)*co,.9)),ct=io(ct,Io,.5);const $e=o*z+w;ve[$e]=ct,V[$e*4]=j[o]+ct*$,V[$e*4+1]=ct*K;const ko=pe[I]+(pe[I+1]-pe[I])*Rt,lo=.55*Q+.3*Tt+.12*Ye-.3*pt,Po=ct*K,z0=Math.min(1,Math.max(0,(Po-.1)/.5));let u0=(.09+.91*Math.min(1,Math.max(0,(ko-(ft==="Sparse"?.56:.36))/.2)))*(.3+.7*Math.min(1,Math.max(0,(lo+.06)/.16)))*z0;if(ft==="Galaxy band"){const Ee=(M-.5+i0*Math.sin((n+je)/T*6.2832)*.5)/.16;u0=u0*.1+z0*Math.exp(-Ee*Ee)*(.3+.7*a(l*32+5,M*24+60,31))*1.2}const uo=Se(n,xt+3.2),fo=(U-(R?1.15:1.95))/.7;u0+=(ft==="Sparse"?2.6:.9)*Math.exp(-uo*uo/(ft==="Sparse"?16:9)-fo*fo)*z0,oe[$e]=u0,V[$e*4+3]=lo}}for(let o=0;o<F;o++)for(let n=0;n<z;n++){const l=o*z+n,E=o*z+Math.max(n-1,0),m=o*z+Math.min(n+1,Z),w=(o+1)%F*z+n,M=(o+F-1)%F*z+n,U=V[m*4]-V[E*4],$=V[m*4+1]-V[E*4+1];let K=V[w*4]-V[M*4],I=V[w*4+1]-V[M*4+1];const Rt=2*Mt;K=K-(j[(o+1)%F]-j[(o+F-1)%F])*.5;let Dt=-$*Rt,Q=U*Rt,O=$*K-U*I;const pt=Math.hypot(Dt,Q,O)||1;Dt/=pt,Q/=pt,O/=pt,Vt[l*4]=(Dt*.5+.5)*255,Vt[l*4+1]=(Q*.5+.5)*255,Vt[l*4+2]=(O*.5+.5)*255,Vt[l*4+3]=255}const q=49,zt=96;let Y=new Float32Array(q*zt);for(let o=0;o<F;o++)for(let n=0;n<z;n++){const l=n>>2,E=o>>2;Y[E*q+l]+=oe[o*z+n]}const Nt=new Float32Array(q*zt);for(let o=0;o<3;o++){for(let n=0;n<zt;n++)for(let l=0;l<q;l++)Nt[n*q+l]=Y[n*q+Math.max(l-1,0)]+Y[n*q+l]*2+Y[n*q+Math.min(l+1,q-1)];for(let n=0;n<zt;n++)for(let l=0;l<q;l++)Y[n*q+l]=Nt[(n+1)%zt*q+l]+Nt[n*q+l]*2+Nt[(n+zt-1)%zt*q+l]}let et=0;for(let o=0;o<Y.length;o++)Y[o]>et&&(et=Y[o]);const re=Ht>3e4?1:.6;for(let o=0;o<F;o++)for(let n=0;n<z;n++){const l=n/4,E=o/4,m=Math.min(q-2,Math.floor(l)),w=Math.floor(E)%zt,M=(w+1)%zt,U=l-m,$=E-Math.floor(E),K=(Y[w*q+m]*(1-U)+Y[w*q+m+1]*U)*(1-$)+(Y[M*q+m]*(1-U)+Y[M*q+m+1]*U)*$;V[(o*z+n)*4+2]=re*(.22+.78*K/et)}const ot=new Float32Array(Ht*8),qe=new Int32Array(Ht);let Be=0;const Te=(o,n,l)=>{const E=Math.min(Z-1,Math.floor(o)),m=o-E,w=Math.floor(n)%F,M=(w+1)%F,U=n-Math.floor(n);return(V[(w*z+E)*4+l]*(1-m)+V[(w*z+E+1)*4+l]*m)*(1-U)+(V[(M*z+E)*4+l]*(1-m)+V[(M*z+E+1)*4+l]*m)*U},kt=96,Ut=new Int32Array(kt+1);let Ve=0;for(let o=0;o<F*z;o++)o%z!==Z&&(Ve+=oe[o]*ve[o]);const ae=Ve/Ht;let Pt=Lt()*ae,h=0;for(let o=0;o<F;o++){Ut[Math.floor(o/F*kt)]=Ut[Math.floor(o/F*kt)]||h;for(let n=0;n<Z;n++){const l=o*z+n;for(Pt+=oe[l]*ve[l];Pt>=ae&&h<Ht;){Pt-=ae;const E=Math.min(Z-.001,Math.max(0,n+Lt()*1.6-.3)),m=o+Lt()*1,w=m/F,M=E/Z,U=Te(E,m,0),$=Te(E,m,1),K=(Vt[l*4]/127.5-1)*.03,I=(Vt[l*4+1]/127.5-1)*.03,Rt=a(w*8+77,M*5+200,7),Dt=Math.exp((Lt()+Lt()+Lt()-1.5)*1.75),Q=Rt*Rt,O=Te(E,m,2),pt=(.25+7*Q*Q)*Dt/(1+.8*O*O)*(ft==="Sparse"?1.8:1),Tt=h*8;ot[Tt]=U+K,ot[Tt+1]=$+I,ot[Tt+2]=m*Mt%T,ot[Tt+3]=pt,ot[Tt+4]=Lt(),ot[Tt+5]=Lt()*6.283,ot[Tt+6]=M,ot[Tt+7]=w;const Ye=U-j[o],ct=$-g;Ye*Ye+ct*ct<36&&(qe[Be++]=h),h++}}}Ut[kt]=h;for(let o=1;o<kt;o++)Ut[o]||(Ut[o]=Ut[o-1]);const S=h,L=new Float32Array(Math.max(1,Math.ceil(S/512))*512*8);L.set(ot.subarray(0,S*8));const _=rt==="Silk curtains"?22e3:11e3,N=new Float32Array(_*8),At=rt==="Short lines"?.05:rt==="Long lines"?.1:.26,it=rt==="Short lines"?.2:rt==="Long lines"?.42:.85,Ot=rt==="Silk curtains"?8:5,c0=Math.min(1,_/Math.max(1,Be*Ot));let It=0;for(let o=0;o<Be&&It<_-12;o++){if(Et()>c0)continue;const n=qe[o]*8,l=2+Math.floor(Et()*(Ot*2-3));for(let E=0;E<l&&It<_;E++){const m=It*8,w=At+(it-At)*Math.pow(Et(),3);N[m]=ot[n]+(Et()-.5)*.08,N[m+1]=ot[n+1],N[m+2]=ot[n+2]+(Et()-.5)*.08,N[m+3]=w,N[m+4]=Et()*6.283,N[m+5]=Et()*.4,N[m+6]=ot[n+6],N[m+7]=ot[n+7],It++}}const ye=96,He=new Int32Array(ye+1),no=new Float32Array(It*8);for(let o=0;o<It;o++)He[Math.min(ye-1,Math.floor(N[o*8+2]/T*ye))+1]++;for(let o=0;o<ye;o++)He[o+1]+=He[o];{const o=He.slice();for(let n=0;n<It;n++){const l=Math.min(ye-1,Math.floor(N[n*8+2]/T*ye)),E=o[l]++;for(let m=0;m<8;m++)no[E*8+m]=N[n*8+m]}}const B0=420,jt=new Float32Array(B0*8),V0=[];let l0=0,so=0;for(;l0<B0&&so<B0*40;){so++;const o=(.08+.84*y())*Z,n=y()*F,l=n/F,E=o/Z,m=a(l*16+230,E*7+15,15);if(y()>m*m*2.2)continue;const w=Te(o,n,0),M=Te(o,n,1),U=n|0,$=o|0;if(M<1.7)continue;let I=(.1+1.25*Math.pow(y(),2.2))*(W===1?1.7:1)+(y()<.1?.3+y()*.9:0);Math.abs(w-j[U])<2&&(I=Math.min(I,Math.max(.1,M-1.55))),I=Math.min(I,M-.25);const Dt=y()<.28,Q=Dt?.008+.006*y():I*(.11+.14*y())+.012,O=l0*8;{const pt=.12+.35*I+Q*2;jt[O]=w,jt[O+1]=M+pt,jt[O+2]=n*Mt,jt[O+3]=I+pt}jt[O+4]=Q,jt[O+5]=y()*6.283,jt[O+6]=V[(U*z+$)*4+2],jt[O+7]=E,I>.25&&V0.length<60&&V0.push([w,n*Mt,I]),l0++}return{key:e.hash,re:y.st(),A0:i,B0:f,CEN:j,cenAt:bt,zd:Se,ph1:H,startZ:xt,shelfSide:R,pos:V,nor:Vt,wPad:L,NWP:S,WB:kt,wStart:Ut,NT:It,TB:ye,tCnt:He,tB:no,sA:jt,ns:l0,drips:V0}})();y.st(De.re);const{A0:Ae,B0:Re,CEN:ge,cenAt:ce,zd:$t,ph1:Mo,startZ:I0,shelfSide:m0,pos:Fo,nor:_o,wPad:C0,NWP:Wo,WB:Le,wStart:k0,NT:P0,TB:Kt,tCnt:t0,tB:Ne,sA:So,ns:G0,drips:v0}=De,le=(c,a,i,f,P,tt,H,Bt)=>{const j=t.createTexture();return t.bindTexture(t.TEXTURE_2D,j),t.texImage2D(t.TEXTURE_2D,0,c,a,i,0,f,P,tt),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,H),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,H),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,Bt||t.CLAMP_TO_EDGE),j},W0=le(t.RGBA32F,z,F,t.RGBA,t.FLOAT,Fo,t.NEAREST),X0=le(t.RGBA8,z,F,t.RGBA,t.UNSIGNED_BYTE,_o,t.NEAREST),e0=(c,a)=>{const i=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,i),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,c,0),a&&t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,a),i},_t=C.hfOK?[t.RGBA16F,t.RGBA,t.HALF_FLOAT]:[t.RGBA8,t.RGBA,t.UNSIGNED_BYTE],o0=64,r0=96,Me=[le(_t[0],o0,r0,_t[1],_t[2],null,t.LINEAR,t.REPEAT),le(_t[0],o0,r0,_t[1],_t[2],null,t.LINEAR,t.REPEAT)],x0=[e0(Me[0]),e0(Me[1])];for(const c of x0)t.bindFramebuffer(t.FRAMEBUFFER,c),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT);let Ue=0;const Qt=[Math.max(16,B>>2),Math.max(8,B>>3),Math.max(4,B>>4),Math.max(8,B>>3)],Bo=(C.tg=C.tg||{})[B]||(C.tg[B]=(()=>{const c=le(_t[0],B,B,_t[1],_t[2],null,t.LINEAR),a=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,a),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,B,B);const i=Qt.map(f=>le(_t[0],f,f,_t[1],_t[2],null,t.LINEAR));return{sceneT:c,sceneF:e0(c,a),blurT:i,blurF:i.map(f=>e0(f))}})()),{sceneT:O0,sceneF:Vo,blurT:Ie,blurF:zo}=Bo,j0=(c,a)=>{const i=t.createVertexArray();t.bindVertexArray(i);const f=t.createBuffer();return i.buf=f,t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,c,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,4,t.FLOAT,!1,32,0),t.vertexAttribDivisor(0,2),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,16),t.vertexAttribDivisor(1,2),t.bindVertexArray(null),i},q0=le(t.RGBA32F,1024,C0.length/4096,t.RGBA,t.FLOAT,C0,t.NEAREST),w0=j0(Ne),p0=j0(So.subarray(0,G0*8));t.bindVertexArray(p0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,C.stalIB),t.bindVertexArray(null);const T0=t.createVertexArray();t.bindVertexArray(T0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,C.rockIB),t.bindVertexArray(null);const d=new Float32Array(40),A=new Float32Array(32),Ce=new Float32Array(48),ke=new Float32Array(20),ht=new Float32Array(16),a0=[];for(let c=0;c<12;c++)a0.push({x:0,z:0,age:99,amp:0});const Zt=[],H0=[Ae*.42,Ae*.38,.45][W],Do=m0?ie:-ie,Pe=be==="Hugging the wall"?(Do>0?-1:1)*[3.4,3.9,.42][W]:0;let St=I0,at=ce(I0)-(W===1?m0?-.6:.6:0)+Pe,Jt=0,ue=.2,fe=0,n0=0;wt==="Slow current"&&(ue=.38);const go=wt==="Slow current"?.38:.2;let te=0,Ge=0,ee=.3,We=1,he=0,y0=1.2+ze()*2,E0=1.5,b0=-1,Xe=0,A0=-1,Oe=0,R0=0;const Lo=wt==="Mirror still"?7.5:wt==="Gentle drip"?3.2:5.5;let Y0=0,$0=0,Fe=0,K0=0,Q0=!1,Z0=0,J0=0,to=0,de=0,M0=0,F0=0,me=null,nt=0,st=null;const eo=()=>{const i=[2137,2591,3119,3557],f=3.4;st={rate:16e3,N:3200,buf:new Float32Array(3200),comb:i.map(P=>({b:new Float32Array(P),i:0,g:Math.pow(10,-3*P/(16e3*f)),lp:0})),ap:[{b:new Float32Array(347),i:0},{b:new Float32Array(113),i:0}],drops:[],paddle:0,seed:31281,lap1:0,lap2:0,phase:0,nf:0}},No=()=>{const c=st,a=c.buf;let i=c.seed,f=c.lap1,P=c.lap2,tt=c.nf;for(let H=0;H<c.N;H++){i=i^i<<13|0,i=i^i>>>17,i=i^i<<5|0;const Bt=i/2147483648;let j=0;for(let R=0;R<c.drops.length;R++){const X=c.drops[R];X.n++;const V=X.n/c.rate,Vt=X.f*(1+.8*Math.min(1,V/.04));X.ph+=Vt*6.2832/c.rate,j+=Math.sin(X.ph)*X.a*Math.exp(-V*38)*Math.min(1,X.n/8)}f+=(Bt-f)*.028,P+=(f-P)*.09;const bt=.5+.5*Math.sin((Fe+H/c.rate)*.9+1.7*Math.sin((Fe+H/c.rate)*.31));j+=P*(.5+1.4*bt*bt),tt+=(Bt-tt)*.16,j+=tt*c.paddle*.8,c.paddle*=.99985;let xt=0;for(const R of c.comb){const X=R.b[R.i];R.lp+=(X-R.lp)*.42,xt+=X,R.b[R.i]=j*.3+R.lp*R.g,R.i=(R.i+1)%R.b.length}xt*=.5;for(const R of c.ap){const X=R.b[R.i],V=xt+X*.5;R.b[R.i]=V,R.i=(R.i+1)%R.b.length,xt=X-V*.5}a[H]=Math.max(-1,Math.min(1,j*.55+xt*.8))}c.seed=i,c.lap1=f,c.lap2=P,c.nf=tt;for(let H=c.drops.length-1;H>=0;H--)c.drops[H].n>c.rate*.4&&c.drops.splice(H,1)},oo=(c,a)=>{if(!e.sound.on)return;st||eo();const i=(a?.85:.5)/(1+c*.14);st.drops.length<10&&st.drops.push({n:0,ph:0,f:(a?420:760)+y()*(a?260:1e3),a:i})},s0=(c,a,i)=>{let f=a0[0];for(const P of a0)P.age>f.age&&(f=P);f.x=c,f.z=a,f.age=0,f.amp=i},_0=(c,a,i,f)=>{if(Zt.length<5){const P=Math.floor((a%T+T)%T/Mt)%F;Zt.push([c-ge[P],1.2,(a%T+T)%T,f*(W===1?4:1),i])}};function S0(c,a){a=Math.min(a,.2),nt+=a,t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.colorMask(!0,!0,!0,!0),K0+=a;const i=e.input;for(const h of i.taps())i.down?me={x:h.x,y:h.y}:ao(h.x,h.y);let f=0;if(i.inside&&i.down){Q0||(Z0=M0=i.x,J0=F0=i.y,to=nt,de=0);const h=Math.hypot(i.x-Z0,i.y-J0);if(de!==2&&h>.022&&(de=2,me=null),de===0&&nt-to>.26&&(de=1,me=null),de===2){const S=i.x-M0,L=i.y-F0;Jt+=S*3.6,ue-=L*4.2;const _=Math.hypot(S,L)/Math.max(a,.01);R0+=_*a*2.4,st&&(st.paddle=Math.min(.5,st.paddle+_*.03))}if(de===1){f=1;const S=(i.x*2-1)/_e,L=(1-i.y*2)/_e,_=dt[0]*S+mt[0]*L+vt[0],N=dt[1]*S+mt[1]*L+vt[1],At=dt[2]*S+mt[2]*L+vt[2],it=Math.hypot(_,N,At);Ge+=(_/it-Ge)*Math.min(1,a*7),ee+=(N/it-ee)*Math.min(1,a*7),We+=(At/it-We)*Math.min(1,a*7)}M0=i.x,F0=i.y}else me&&(ao(me.x,me.y),me=null);Q0=i.inside&&i.down,te+=(f*1-te)*Math.min(1,a*(f?5:3.5)),te<.001&&(te=0);const P=Math.floor((St%T+T)%T/Mt)%F,tt=ce(St),H=ce(St+3.5);ue+=(go-ue)*Math.min(1,a*.35);const Bt=at-tt;let j=(ce(St+2)-tt)/2*ue+(tt+Pe+(Pe?.1:.55)*H0*Math.sin(nt*.05+Mo)-at)*.03;Jt+=(j-Jt)*Math.min(1,a*.5);const bt=Pe?Math.abs(Pe)+.35:H0;Math.abs(Bt)>bt&&(Jt-=(Bt-Math.sign(Bt)*bt)*a*1.6),at+=Jt*a,St+=ue*a;const xt=Math.atan2(H-tt,3.5)*.85+Jt*.1;fe+=(xt-fe)*Math.min(1,a*.7);const R=Math.sin(nt*.8+.7)*.004+Math.sin(nt*1.37)*.002,X=Math.sin(nt*.53+1.1)*.006-Jt*.012;n0-=a*(.5+Math.hypot(Jt,ue)*1.2),R0>.5?(R0=0,n0=-1,s0(at+Math.sin(fe)*1.1+(y()-.5)*.3,St+Math.cos(fe)*1.1,.012),_0(at,St+1,.05,6),y()<.3&&st&&(st.paddle=Math.min(.5,st.paddle+.12))):n0<0&&(n0=1.8+y()*1.6,s0(at+Math.sin(fe)*1.25,St+Math.cos(fe)*1.25,.0028));const V=.17+R+Je,Vt=fe+(m0?ie:-ie),oe=Math.sin(Vt),ve=Math.cos(Vt),Se=Math.sin(V),je=Math.cos(V);vt[0]=oe*je,vt[1]=Se,vt[2]=ve*je;let i0=ve,xe=-oe,we=0,pe=-oe*Se,q=je,zt=-ve*Se;const Y=Math.sin(X),Nt=Math.cos(X);dt[0]=i0*Nt+pe*Y,dt[1]=we*Nt+q*Y,dt[2]=xe*Nt+zt*Y,mt[0]=-i0*Y+pe*Nt,mt[1]=-we*Y+q*Nt,mt[2]=-xe*Y+zt*Nt;const et=(St%T+T)%T,re=g+R*.8;if(y0-=a,y0<0&&v0.length){y0=Lo*(.5+y()*1.2);let h=null;for(let N=0;N<8;N++){const At=v0[Math.floor(y()*v0.length)],it=$t(At[1],et);if(it>1.2&&it<16){h=At;break}}const S=y()-.5,L=h?h[0]:at+S*5,_=h?h[1]:et+3+y()*8;s0(L,_,.016),_0(L,_,.3,5),oo(Math.hypot(L-at,$t(_,et)),!1)}if(E0-=a,E0<0&&P0){E0=1.8+y()*3;let h=-1,S=1e9;const L=Math.floor((et+.6)/T*Kt)%Kt,_=t0[L],N=t0[Math.min(Kt,L+8)]-_;for(let At=0;At<18&&N>0;At++){const it=_+Math.floor(y()*N),Ot=$t(Ne[it*8+2],et),c0=Ne[it*8]-at,It=Ot*Ot+c0*c0;Ot>.6&&It<S&&(S=It,h=it)}Xe>Oe?(A0=h,Oe=0):(b0=h,Xe=0)}if(Xe+=a,Oe+=a,te>.05){const h=(1.6+2.6*Math.abs(ee)*0)/Math.max(.2,Math.abs(ee)),S=Math.min(7,Math.max(1.8,(2.2-re)/Math.max(.12,ee)));if(he<a*1.5){const L=at+Ge*S,_=et+We*S,N=Math.floor((_%T+T)%T/Mt)%F;Zt.length<5&&Zt.push([L-ge[N],re+ee*S,(_%T+T)%T,10,.22*te])}}if(he+=a,he>=.1||ro){he=Math.min(he-.1,.1),he<0&&(he=0),t.bindFramebuffer(t.FRAMEBUFFER,x0[1-Ue]),t.viewport(0,0,o0,r0),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.depthMask(!1),t.useProgram(v.state),t.bindVertexArray(C.emptyVAO),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Me[Ue]),ht[0]=o0,ht[1]=r0,ht[2]=.1,ht[3]=Zt.length,ht[4]=2.2,ht[5]=.6,ht[6]=.22,ht[7]=2,ht[8]=T,ht[9]=Ae,ht[10]=Re,ht[11]=.11;for(let h=0;h<4;h++)ht[12+h]=0;for(let h=0;h<Zt.length&&h<4;h++){const S=Zt[h];ke[h*4]=S[0],ke[h*4+1]=S[1],ke[h*4+2]=S[2],ke[h*4+3]=S[3],ht[12+h]=S[4]}t.uniform4fv(yt.state.G,ht),t.uniform4fv(yt.state.A,ke),t.drawArrays(t.TRIANGLES,0,3),Ue=1-Ue,Zt.length=0}d[0]=dt[0],d[1]=dt[1],d[2]=dt[2],d[3]=_e,d[4]=mt[0],d[5]=mt[1],d[6]=mt[2],d[7]=B,d[8]=vt[0],d[9]=vt[1],d[10]=vt[2],d[11]=nt,d[12]=at,d[13]=re,d[14]=et,d[15]=T;const ot=.18,qe=re-.2,Be=.1;d[16]=Ge,d[17]=ee,d[18]=We,d[19]=te*.8,d[20]=ot,d[21]=qe,d[22]=Be,d[23]=k;const Te=Math.floor(et/Mt)-mo;d[24]=Te,d[25]=K0,d[26]=Xe<2.5&&b0>=0?Ne[b0*8+4]:-1,d[27]=Xe,d[28]=Yt[0],d[29]=Yt[1],d[30]=Yt[2],d[31]=.02,d[32]=Oe<2.5&&A0>=0?Ne[A0*8+4]:-1,d[33]=Oe,d[34]=G,d[35]=W===1?.38:1,d[36]=s,d[37]=u,d[38]=rt==="Silk curtains"?1.3:.45,d[39]=rt==="Silk curtains"?.2:.045,t.bindFramebuffer(t.FRAMEBUFFER,Vo),t.viewport(0,0,B,B),t.depthMask(!0),t.clearColor(0,0,0,0),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Me[Ue]),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,W0),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,X0),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,C.detail),t.useProgram(v.rock),t.uniform4fv(yt.rock.V,d),t.bindVertexArray(T0),t.drawElementsInstanced(t.TRIANGLES,Z*(h0-1)*6,t.UNSIGNED_SHORT,0,2),t.useProgram(v.stal),t.uniform4fv(yt.stal.V,d),t.bindVertexArray(p0),t.drawElementsInstanced(t.TRIANGLES,Qe*qt*6,t.UNSIGNED_SHORT,0,G0*2),t.depthMask(!1),t.enable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.blendFuncSeparate(t.ONE,t.ONE,t.ZERO,t.ONE),t.useProgram(v.worm),t.uniform4fv(yt.worm.V,d),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,q0),t.bindVertexArray(C.wormVAO);const kt=Math.floor(((et-4)/T+1)%1*Le),Ut=kt+Math.ceil(45/T*Le),Ve=(h,S)=>{const L=k0[h],_=k0[S]-L;_<=0||(t.uniform1i(yt.worm.W0,L),t.drawElements(t.TRIANGLES,_*12,t.UNSIGNED_INT,0))};if(Ut<=Le?Ve(kt,Ut):(Ve(kt,Le),Ve(0,Ut-Le)),P0){t.useProgram(v.silk),t.uniform4fv(yt.silk.V,d),t.bindVertexArray(w0),t.bindBuffer(t.ARRAY_BUFFER,w0.buf);const h=Math.floor(((et-4)/T+1)%1*Kt),S=Math.ceil(11.5/T*Kt),L=h+S,_=(N,At)=>{const it=t0[N],Ot=t0[At]-it;Ot<=0||(t.vertexAttribPointer(0,4,t.FLOAT,!1,32,it*32),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,it*32+16),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,(L0+1)*2,Ot*2))};L<=Kt?_(h,L):(_(h,Kt),_(0,L-Kt))}t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.useProgram(v.blur),t.bindVertexArray(C.emptyVAO),t.activeTexture(t.TEXTURE0);const ae=(h,S,L,_,N)=>{t.bindFramebuffer(t.FRAMEBUFFER,zo[S]),t.viewport(0,0,_,_),t.bindTexture(t.TEXTURE_2D,h),t.uniform4f(yt.blur.B,N/L,N/L,1/_,1/_),t.drawArrays(t.TRIANGLES,0,3)};ae(O0,0,B,Qt[0],1),ae(Ie[0],1,Qt[0],Qt[1],1.5),ae(Ie[1],2,Qt[1],Qt[2],1.5),ae(Ie[2],3,Qt[2],Qt[3],1),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,B,B),t.useProgram(v.comp),t.bindVertexArray(C.emptyVAO),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,O0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,Ie[0]),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,Ie[3]),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,C.water);let Pt=0;for(const h of a0)h.age+=a,!(h.age>9)&&(Ce[Pt*4]=h.x-at,Ce[Pt*4+1]=$t(h.z,et),Ce[Pt*4+2]=h.age,Ce[Pt*4+3]=h.amp,Pt++);Y0=wt==="Slow current"?0:nt*.002,$0=(wt==="Slow current"?-nt*.06:nt*.003)+et*.45*0,A[0]=dt[0],A[1]=dt[1],A[2]=dt[2],A[3]=_e,A[4]=mt[0],A[5]=mt[1],A[6]=mt[2],A[7]=B,A[8]=vt[0],A[9]=vt[1],A[10]=vt[2],A[11]=nt,A[12]=re,A[13]=Pt,A[14]=2.15,A[15]=r,A[16]=Ge,A[17]=ee,A[18]=We,A[19]=te*.8,A[20]=ot,A[21]=qe-re,A[22]=Be,A[23]=x,A[24]=Yt[0],A[25]=Yt[1],A[26]=Yt[2],A[27]=nt*61.7%311,A[28]=Y0+at*.45,A[29]=$0+et*.45,A[30]=wt==="Slow current"?.5:0,A[31]=0,t.uniform4fv(yt.comp.C,A),t.uniform4fv(yt.comp.R,Ce),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null),t.depthMask(!0),e.sound.on&&(st||eo(),Fe<nt+.3&&(Fe<nt&&(Fe=nt),No(),e.sound.pcm(st.buf,st.rate,{vel:1}),Fe+=st.N/st.rate)),ro=!1}const _e=1.05,dt=[1,0,0],mt=[0,1,0],vt=[0,0,1];let ro=!0;function ao(c,a){const i=(c*2-1)/_e,f=(1-a*2)/_e,P=dt[0]*i+mt[0]*f+vt[0],tt=dt[1]*i+mt[1]*f+vt[1],H=dt[2]*i+mt[2]*f+vt[2],Bt=Math.max(.03,Math.abs(tt)),j=Math.min(26,g/Bt),bt=at+P*j,xt=St+H*j;s0(bt,xt,.03);{const R=Math.hypot(bt-at,$t(xt,St))||1,X=$t(xt,St)/R,V=(bt-at)/R;_0(bt+V*3,xt+X*3,.95,26)}oo(j,!0)}return S0(0,0),U0&&U0.register(S0,{gl:t,tex:[W0,X0,q0,Me[0],Me[1]],fb:x0,vao:[w0,p0,T0]}),S0}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
