// Koi Pond: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/183.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ht){ht&&function(){"use strict";const dt=new WeakMap,K0=Math.PI,U=2*K0,P=(o,e,I)=>o<e?e:o>I?I:o,F0=12,c0=16,Pe=c0+3,j0=1.3,z=`#version 300 es
// w183 s9e42a
precision highp float;
precision highp int;
precision highp sampler2D;
`,o0=`layout(std140) uniform S { vec4 s[32]; };
layout(std140) uniform D { vec4 d[6]; };
`,T0=z+`out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,xt=z+o0+`out vec3 vRay; out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; vec2 n = p * 2.0 - 1.0;
  vRay = s[5].xyz + s[6].xyz * n.x + s[7].xyz * n.y; gl_Position = vec4(n, 0.0, 1.0); }`,ge=`
vec2 EV(vec3 R) { return (R.xz / (R.y + 0.35) - s[14].xy) * s[14].z + 0.5; }
vec3 ENV(vec4 e) { return e.rgb * e.rgb * s[12].w; }
vec3 FIN(vec3 c) {
  c *= s[7].w;
  c = (c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14);
  vec2 q = gl_FragCoord.xy / s[5].w - 0.5;
  c *= 1.0 - 0.42 * dot(q, q);
  return pow(clamp(c, 0.0, 1.0), vec3(0.4545));
}
vec4 CL(vec4 a, vec2 p) { return vec4(dot(a.xy, p), 0.0, 0.0, 0.0); }
`,Xe=`vec4 CLIP(vec3 W) { vec4 q = vec4(W, 1.0); return vec4(dot(s[0], q), dot(s[1], q), dot(s[2], q), dot(s[3], q)); }
`,to=z+o0+`in vec2 vUv; out vec4 o; uniform sampler2D uSim; uniform sampler2D uRock;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy), m = textureSize(uSim, 0) - ivec2(1);
  vec4 c = texelFetch(uSim, p, 0);
  float a = texelFetch(uSim, min(p + ivec2(1, 0), m), 0).r, b = texelFetch(uSim, max(p - ivec2(1, 0), ivec2(0)), 0).r;
  float e = texelFetch(uSim, min(p + ivec2(0, 1), m), 0).r, f = texelFetch(uSim, max(p - ivec2(0, 1), ivec2(0)), 0).r;
  float sum4 = a + b + e + f, lap = 0.25 * sum4 - c.r, bih = 20.0 * c.r - 8.0 * sum4;
  for (int i = 0; i < int(s[17].w); i++) { // the far ring of the 13-point biharmonic: gives short ripples their lead
    ivec2 q = i < 4 ? ivec2(i == 0 ? 2 : i == 1 ? -2 : 0, i == 2 ? 2 : i == 3 ? -2 : 0) : ivec2(i == 4 || i == 6 ? 1 : -1, i < 6 ? 1 : -1);
    bih += texelFetch(uSim, clamp(p + q, ivec2(0), m), 0).r * (i < 4 ? 1.0 : 2.0);
  }
  float v = (c.g + s[15].x * lap - s[15].y * bih * 0.0625) * s[15].z;
  float h = c.r + v;
  float k = 1.0 - textureLod(uRock, vUv, 0.0).a;
  vec2 q = abs(vUv - 0.5) * 2.0;
  float ed = 1.0 - 0.14 * smoothstep(0.86, 1.0, max(q.x, q.y));
  o = vec4(h * k * ed, v * k * ed, 0.0, 1.0);
}`,oo=z+o0+`layout(location=0) in vec4 iA; out vec2 vQ; out float vA; out float vB;
void main() { vec2 q = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0; vQ = q * 2.2; vA = iA.w; vB = iA.w * d[3].w;
  vec2 P = iA.xy + q * 2.2 * iA.z; gl_Position = vec4(P * s[6].w * 2.0, 0.0, 1.0); }`,ao=z+`in vec2 vQ; in float vA; in float vB; out vec4 o;
void main() { float r = dot(vQ, vQ), g = (1.0 - r * 0.55) * exp(-r); o = vec4(vA * g, vB * g, 0.0, 0.0); }`,ro=z+o0+`in vec2 vUv; out vec4 o; uniform sampler2D uSim; uniform sampler2D uN;
void main() {
  float e = s[16].w;
  vec2 g = vec2(texture(uSim, vUv + vec2(e, 0.0)).r - texture(uSim, vUv - vec2(e, 0.0)).r,
                texture(uSim, vUv + vec2(0.0, e)).r - texture(uSim, vUv - vec2(0.0, e)).r) / (2.0 * s[8].w);
  vec2 P = (vUv - 0.5) / s[6].w;
  float gust = d[2].z * (0.25 + 1.5 * texture(uN, P * 0.05 + d[2].xy).r);
  vec2 w = vec2(0.0);
  for (int i = 0; i < int(s[14].w); i++) { vec4 q = s[19 + i]; w += q.xy * q.z * cos(dot(q.xy, P) - q.w * d[0].x); }
  g += w * gust;
  o = vec4((g - s[16].x) / s[15].w, 0.0, 0.0);
}`,so=z+o0+`layout(location=0) in vec4 iA; layout(location=1) in vec4 iB; out vec2 vL; out vec3 vD; flat out vec2 vC;
void main() { vec2 q = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  float r = iB.x, cs = cos(iA.w), sn = sin(iA.w), cell = iB.z;
  vL = q * 1.3; vD = vec3(cs, sn, r); vC = vec2(mod(cell, 4.0), floor(cell / 4.0)); vec2 l = q * 1.3 * r; vec2 P = iA.xz + vec2(cs * l.x - sn * l.y, sn * l.x + cs * l.y);
  gl_Position = iA.y > 0.008 ? vec4(2.0, 2.0, 2.0, 1.0) : vec4(P * s[6].w * 2.0, 0.0, 1.0); }`,no=z+o0+`in vec2 vL; in vec3 vD; flat in vec2 vC; out vec4 o; uniform sampler2D uAtlas;
float A(vec2 l) { vec2 c = clamp(l, vec2(-0.98), vec2(0.98)); return textureLod(uAtlas, (vC + c * 0.5 + 0.5) * 0.25, 2.6).a * step(max(abs(l.x), abs(l.y)), 1.0); }
void main() { float e = 0.03, a = A(vL), ax = A(vL + vec2(e, 0.0)), ay = A(vL + vec2(0.0, e));
  vec2 gr = vec2(ax - a, ay - a) / (e * vD.z), w = vec2(vD.x * gr.x - vD.y * gr.y, vD.y * gr.x + vD.x * gr.y);
  float gm = length(w), sd = gm > 1e-3 ? dot(w / gm, normalize(s[10].xz + vec2(1e-4))) : 0.0;
  o = vec4(-w * 0.0013, 0.0, a * 0.08 + min(gm * 0.0045, 0.3) * sd); }`,io=z+o0+`layout(location=0) in vec2 aG; uniform sampler2D uSurf; out vec2 vOld; out vec2 vNew;
void main() { vec2 g = textureLod(uSurf, aG, 0.0).xy * s[15].w + s[16].x, P = (aG - 0.5) / s[6].w, Q = P + g * s[16].y;
  vOld = P; vNew = Q; gl_Position = vec4(Q * s[6].w * 2.0, 0.0, 1.0); }`,co=z+`in vec2 vOld; in vec2 vNew; out vec4 o;
void main() { vec2 a = dFdx(vOld), b = dFdy(vOld), c = dFdx(vNew), e = dFdy(vNew);
  float A = abs(a.x * b.y - a.y * b.x), B = abs(c.x * e.y - c.y * e.x);
  o = vec4(vec3(min(A / max(B, 1e-9), 6.0) * 0.22), 1.0); }`,pt=o0+Xe+`layout(location=0) in vec4 aP; layout(location=1) in vec3 aN; layout(location=2) in vec2 aUV;
uniform sampler2D uF;
out vec3 vW; out vec3 vNr; out vec3 vT; out vec2 vUV; out vec2 vLc; flat out vec4 vI;
uniform float uAbove;
void main() {
  int f = gl_InstanceID;
  vec4 i0 = texelFetch(uF, ivec2(${c0}, f), 0), i1 = texelFetch(uF, ivec2(${c0+1}, f), 0), i2 = texelFetch(uF, ivec2(${c0+2}, f), 0);
  float L = i0.x, kind = aP.w, u = aP.x;
  float x = clamp(u, 0.0, 1.0) * ${(c0-1).toFixed(1)}, fl = min(floor(x), ${(c0-2).toFixed(1)}), a = x - fl; int i = int(fl);
  vec3 p0 = texelFetch(uF, ivec2(max(i - 1, 0), f), 0).xyz, p1 = texelFetch(uF, ivec2(i, f), 0).xyz;
  vec3 p2 = texelFetch(uF, ivec2(i + 1, f), 0).xyz, p3 = texelFetch(uF, ivec2(min(i + 2, ${c0-1}), f), 0).xyz;
  vec3 m1 = (p2 - p0) * 0.5, m2 = (p3 - p1) * 0.5; float a2 = a * a, a3 = a2 * a;
  vec3 p = (2.0 * a3 - 3.0 * a2 + 1.0) * p1 + (a3 - 2.0 * a2 + a) * m1 + (-2.0 * a3 + 3.0 * a2) * p2 + (a3 - a2) * m2;
  vec3 T = normalize((6.0 * a2 - 6.0 * a) * p1 + (3.0 * a2 - 4.0 * a + 1.0) * m1 + (-6.0 * a2 + 6.0 * a) * p2 + (3.0 * a2 - 2.0 * a) * m2);
  vec3 R = normalize(cross(vec3(0.0, 1.0, 0.0), T)), Up = cross(T, R);
  float cr = cos(i0.w * (1.0 - u * 0.5)), sr = sin(i0.w * (1.0 - u * 0.5)); vec3 R2 = R * cr + Up * sr; Up = Up * cr - R * sr; R = R2;
  // the body wave: an S that travels tailward and grows along the fish
  float amp = i1.y * L, ph = i1.x - 5.6 * u, A = amp * (0.004 + 0.085 * u * u * u + 0.012 * u), sw = sin(ph), cw = cos(ph);
  p += R * A * sw;
  T = normalize(T + R * ((amp * (0.255 * u * u + 0.012)) * sw - A * 5.6 * cw) / L);
  vec3 W = p, Nr = Up; vec2 uv = aUV; vec2 lc = aP.yz;
  if (kind < 0.5) { // body
    float mo = smoothstep(0.07, 0.0, u) * i0.z;
    float lat = aP.y * i0.y * (1.0 + mo * 0.9), up = aP.z + mo * 0.004;
    W = p + L * (R * lat + Up * up);
    Nr = R * aN.x + Up * aN.y + T * aN.z;
    lc = vec2(lat, up);
  } else if (kind < 1.5) { // paired fins: a fan that folds back at speed and sculls when slow
    float sd = aN.z, sz = aP.y * i2.x, sp = i1.z, sc = aN.x;
    float phi = mix(1.2, 0.5, sp) + (aUV.y - 0.5) * 1.05 + 0.14 * sin(i2.z + u * 9.0) * sp;
    vec3 dir = R * sd * cos(phi) + T * sin(phi);
    float dr = -0.25 * sc * sc + sin(i2.z * 1.1 - sc * 3.0 + sd) * sc * 0.14 * (0.3 + sp);
    W = p + L * (R * sd * aP.z * i0.y - Up * 0.045 + (dir + Up * dr) * sc * sz);
    Nr = normalize(Up - R * sd * dr * 0.9 + T * 0.1);
  } else if (kind < 2.5) { // dorsal: a soft sail leaning with the wave
    float h = aP.y * aN.y * i2.x, lean = 0.55 * cos(ph + 0.8) + i0.w * 0.6;
    W = p + L * (Up * (aP.z + h) + R * h * lean);
    Nr = normalize(R * (-1.0) + Up * 0.5);
  } else if (kind < 3.5) { // tail: a soft fan carried off the end of the spine, lagging behind the wave
    float sv = aN.x, tv = aN.y, tl = i2.y;
    vec3 side = normalize(R * 0.86 + Up * 0.5);
    float lag = sin(ph - sv * 2.6) * amp * (0.12 + 0.06 * sv) * (1.0 + 0.9 * (tl - 1.0)) * sv + sin(ph - 1.0 - sv * 3.4 + tv * 1.6) * 0.02 * tl * sv * L;
    W = p + L * (T * sv * tl * 0.2 * (1.0 + 0.12 * abs(tv)) + side * tv * (0.012 + sv * 0.092) * tl) + R * lag;
    Nr = normalize(Up * 0.86 - R * 0.5 + R * cos(ph - sv * 2.6) * 0.4);
  } else { // barbels
    float sv = aN.x, sd = aN.y;
    W = p + L * (R * sd * (aP.y + sv * aP.z + aUV.y * 0.0042) + T * sv * sv * aP.z * 0.5 - Up * (0.012 + sv * 0.012)) + R * sin(i2.z * 1.6 + sv * 4.0 + sd) * sv * 0.004 * L;
    Nr = Up;
  }
  vW = W; vNr = Nr; vT = T; vUV = uv; vLc = lc; vI = vec4(float(f), L, i0.z, kind);
`,bt=z+pt+`
  vec3 Q = vec3(W.x, W.y < 0.0 ? W.y * 0.75 : W.y, W.z);
  gl_Position = (uAbove > 0.5 && i1.w < 0.5) ? vec4(2.0, 2.0, 2.0, 1.0) : CLIP(Q);
}`,lo=z+pt+`
  vec2 xz = W.xz - s[10].xz / s[10].y * 1.25 * (s[4].w + W.y); // set off down-sun, clear of the fish
  gl_Position = vec4(xz * s[6].w * 2.0, 0.0, 1.0);
}`,fo=z+o0+`in vec3 vW; in vec3 vNr; flat in vec4 vI; out vec4 o;
void main() { float kk = smoothstep(0.1, 0.65, abs(normalize(vNr).y)), dp = clamp(-vW.y / s[4].w, 0.0, 1.0);
  o = vec4(vec3(kk * mix(0.55 + 0.45 * dp, 1.0, s[11].w) * (vI.w > 0.5 ? 0.4 : 1.0)), 1.0); }`,At=o0+ge+`in vec3 vW; in vec3 vNr; in vec3 vT; in vec2 vUV; in vec2 vLc; flat in vec4 vI;
uniform sampler2D uPat; uniform sampler2D uScale; uniform sampler2D uCau; uniform sampler2D uEnv; uniform float uAbove;
out vec4 o;
`,Rt=`
float GOB(vec2 P) { return 1.0 - s[10].w * smoothstep(0.12, 0.55, textureLod(uEnv, P * 0.3 + 0.5 + d[0].zw, 3.0).a); }
vec3 UNDER(vec3 c) { float dist = max(-vW.y, 0.0) * 1.3; vec3 tr = exp(-s[8].rgb * dist); return c * tr + s[9].rgb * (1.0 - tr); }
`,uo=z+At+Rt+`
void main() {
  vec3 N = normalize(vNr), T = normalize(vT), B = normalize(cross(N, T));
  float u = vUV.x, v = vUV.y, L = vI.y;
  float latA = abs(vLc.x), gill = u - (0.178 + 5.5 * latA * latA);
  float sm = smoothstep(0.0, 0.018, gill) * (1.0 - smoothstep(0.93, 1.0, u));
  vec4 sc = texture(uScale, vec2(u * 38.0, v * 42.0) * 0.25);
  vec2 off = sc.xy * 2.0 - 1.0;
  vec2 puv = vec2(u, v) - off * vec2(1.0 / 38.0, 1.0 / 42.0) * sm;
  vec4 pat = texture(uPat, vec2(clamp(puv.x, 0.004, 0.98), (vI.x + clamp(puv.y, 0.01, 0.99)) / ${F0}.0));
  vec3 alb = pat.rgb;
  float ridge = smoothstep(0.45, 0.98, normalize(vNr).y), nm = smoothstep(0.7, 0.3, pat.a);
  float redn = clamp((alb.r - alb.g) * 2.2 - 0.2, 0.0, 1.0) * nm;
  alb = mix(alb, alb * vec3(0.92, 0.6, 0.52), redn * ridge * 0.75);
  alb = mix(alb, mix(alb, vec3(dot(alb, vec3(0.3, 0.55, 0.15))), 0.3) * 1.06, redn * (1.0 - ridge) * 0.7);
  vec2 ss = vec2(off.x * 0.72 + 0.28 + (sc.b - 0.5) * 0.34, off.y * 0.75 + (fract(sc.b * 7.3) - 0.5) * 0.24) * sm;
  vec3 Ns = normalize(N + T * ss.x * 0.85 + B * ss.y * 0.85);
  // pockets between the scales: stronger on metallic fish, where the net reads
  alb *= mix(1.0, mix(0.6, 0.4, pat.a) + mix(0.4, 0.6, pat.a) * sc.a, sm);
  // the head: bony plates, a gill line, nostrils, an eye
  float lat = latA, up = vLc.y;
  // the gill cover's arc: a dark crease with a lit edge on the head side
  float gl1 = smoothstep(0.012, 0.0, abs(gill));
  alb *= 1.0 - 0.34 * gl1;
  Ns = normalize(Ns + T * gl1 * 0.6 * sign(gill));
  float wet = 0.0;
  if (gill < 0.02) {
    float brow = smoothstep(0.014, 0.0, abs(lat - (0.018 + u * 0.2))) * smoothstep(0.03, 0.06, u);
    alb *= 1.0 - 0.2 * brow;
    Ns = normalize(Ns + B * sign(vLc.x) * brow * 0.34);
    float nos = smoothstep(0.0055, 0.0032, length(vec2(u - 0.037, lat - 0.019)));
    alb *= 1.0 - 0.8 * nos;
    Ns = normalize(Ns + T * sin(u * 70.0) * 0.03);
    alb *= 1.0 - 0.3 * smoothstep(0.024, 0.01, length(vec3(u - 0.086, lat - 0.047, up - 0.047)));
    wet = 0.5;
  }
  // the lip and the mouth
  float lip = smoothstep(0.03, 0.006, u);
  alb = mix(alb, vec3(0.8, 0.56, 0.44) * (0.5 + 0.5 * alb), lip * 0.72);
  float mouth = u < 0.0 ? 1.0 : 0.0;
  alb *= 1.0 - mouth * 0.97;
  // lighting: soft sky from above, sun through the moving light
  vec3 V_ = normalize(s[4].xyz - vW);
  vec2 cuv = vW.xz * s[6].w + 0.5;
  float ca = texture(uCau, cuv).r / 0.22;
  float gb = GOB(vW.xz);
  float ndl = max(dot(Ns, s[10].xyz), 0.0);
  vec3 amb = s[12].rgb * (0.16 + 0.84 * max(Ns.y, 0.0) * max(Ns.y, 0.0)) * mix(1.0, 0.7 + 0.3 * ca, s[11].w * 0.5);
  vec3 dif = s[11].rgb * ndl * (0.3 + 0.7 * gb) * mix(1.0, 0.3 + ca * 0.9, s[11].w);
  vec3 col = alb * (amb + dif) * (0.66 + 0.34 * smoothstep(0.0, 0.7, N.y));
  // each scale is a small mirror, tilted its own way: rows catch the sky, a few flash
  vec3 Rf = reflect(-V_, Ns);
  vec4 e = textureLod(uEnv, EV(Rf), 3.0);
  float fr = min(0.03 + 0.97 * pow(1.0 - max(dot(Ns, V_), 0.0), 5.0), 0.2);
  vec3 ec = ENV(e);
  float pearl = mix(0.05, 0.42, pat.a);
  col += ec * alb * pearl * (0.2 + 0.6 * sm * smoothstep(0.35, 0.95, sc.b));
  col += ec * fr * (0.45 + wet);
  vec3 H = normalize(V_ + s[10].xyz);
  float ns = max(dot(normalize(Ns + (T * (sc.b - 0.5) + B * (fract(sc.b * 7.3) - 0.5)) * 0.2 * sm), H), 0.0);
  col += s[11].rgb * gb * (pow(ns, 90.0) * (0.25 + 0.75 * pat.a) * (0.5 + ca) + pow(ns, 700.0) * 2.5 * sm * sc.b);
  // the eye sits in its socket: gold ring, black pupil, a small hard reflection of the sky
  vec3 eQ = vec3(u - 0.086, lat - 0.047, up - 0.047);
  float er = length(eQ);
  if (er < 0.016) {
    float rim = smoothstep(0.0128, 0.0106, er), pu = smoothstep(0.0072, 0.0058, er);
    vec3 eye = mix(vec3(0.34, 0.22, 0.07) * (0.75 + 0.25 * sin(atan(eQ.x, eQ.y) * 14.0)), vec3(0.002), pu);
    eye *= 0.2 + amb + dif;
    eye += smoothstep(0.003, 0.0016, length(eQ.xy - vec2(-0.0025, 0.002))) * 0.65;
    col = mix(col * 0.5, eye, rim);
  }
  col *= 1.0 - mouth * 0.96;
  float rl = smoothstep(0.25, 0.97, N.y);
  col = mix(col, mix(col * 0.4 + s[9].rgb * 0.5, col * 1.1, rl), mix(1.0, 0.35, pat.a));
  if (uAbove > 0.5) {
    if (vW.y < 0.002) discard;
    col += alb * s[12].rgb * 0.16;
    col *= 0.62 + 0.38 * smoothstep(0.002, 0.012, vW.y);
    col += ec * 0.06 + s[11].rgb * pow(max(dot(Ns, normalize(V_ + s[13].xyz)), 0.0), 120.0) * 1.2;
    o = vec4(FIN(col), 1.0);
    return;
  }
  o = vec4(sqrt(max(UNDER(col), vec3(0.0))), clamp(-vW.y / s[4].w, 0.0, 1.0));
}`,vo=z+At+Rt+`
void main() {
  float sv = vUV.x, tv = vUV.y, kind = vI.w;
  if (kind > 3.5) {
    vec3 c = vec3(0.62, 0.44, 0.34) * (s[12].rgb + s[11].rgb * 0.6);
    o = vec4(sqrt(UNDER(c)), 0.9 * (1.0 - sv * 0.2));
    return;
  }
  vec3 tint = texture(uPat, vec2(0.992, (vI.x + 0.5) / ${F0}.0)).rgb;
  vec3 root = texture(uPat, vec2(0.992, (vI.x + 0.1) / ${F0}.0)).rgb;
  float rn = kind < 1.5 ? 11.0 : kind < 2.5 ? 20.0 : 15.0;
  float ang = kind < 2.5 ? tv : tv * 0.5 + 0.5;
  // bony rays that fork halfway out, a clear membrane between them, an edge scalloped from ray to ray
  float rp = ang * rn * TAU_C + sin(sv * 6.0) * 0.4;
  float fw = fwidth(rp) + 1e-4;
  float ray = mix(mix(smoothstep(0.5, 0.96, 0.5 + 0.5 * cos(rp)), 0.24, smoothstep(1.2, 2.6, fw)),
                  mix(smoothstep(0.5, 0.96, 0.5 + 0.5 * cos(rp * 2.0)), 0.24, smoothstep(0.4, 1.0, fw)), smoothstep(0.4, 0.62, sv));
  if (kind > 2.5) root = mix(root, texture(uPat, vec2(0.95, (vI.x + 0.5) / ${F0}.0)).rgb, 0.55);
  vec3 alb = mix(root, tint, smoothstep(0.08, 0.6, sv)) * mix(0.62, 0.9, ray);
  float al = mix(0.58, 0.9, ray) * (1.0 - sv * sv * 0.3) * smoothstep(0.0, 0.035, 1.0 - sv - 0.05 * (1.0 - ray));
  if (kind > 2.5) al *= smoothstep(1.0, 0.92, abs(tv));
  vec3 N = normalize(vNr);
  vec2 cuv = vW.xz * s[6].w + 0.5;
  float ca = texture(uCau, cuv).r / 0.22, gb = GOB(vW.xz);
  vec3 lit = s[12].rgb * (0.65 + 0.35 * abs(N.y)) * mix(1.0, 0.7 + 0.3 * ca, s[11].w * 0.5) + s[11].rgb * (0.4 + 0.6 * abs(dot(N, s[10].xyz))) * gb * mix(1.0, ca, s[11].w);
  vec3 col = alb * lit;
  col += ENV(textureLod(uEnv, EV(reflect(vec3(0.0, -1.0, 0.0), normalize(N + vec3(ray - 0.5) * 0.3))), 3.0)) * 0.02 * ray;
  o = vec4(sqrt(max(UNDER(col), vec3(0.0))), al);
}`.replace("TAU_C","6.2831853"),mo=z+o0+`in vec3 vRay; out vec4 o; uniform sampler2D uBot; uniform sampler2D uCau; uniform sampler2D uSurf; uniform sampler2D uShadow; uniform sampler2D uEnv;
void main() {
  float t = (-s[4].w * 0.75 - s[4].y) / vRay.y; vec3 P = s[4].xyz + vRay * t;
  vec2 uv = P.xz * s[6].w + 0.5;
  vec4 b = texture(uBot, uv);
  vec2 g = texture(uSurf, uv).xy * s[15].w + s[16].x;
  float dp = b.a * s[4].w;
  float ca = texture(uCau, uv).r / 0.22;
  float sh = min(texture(uShadow, uv + g * 0.02).r * s[16].z, 0.95);
  float gb = 1.0 - s[10].w * smoothstep(0.12, 0.55, textureLod(uEnv, P.xz * 0.3 + 0.5 + d[0].zw, 3.0).a);
  vec3 lit = s[12].rgb * mix(1.0, 0.62 + 0.38 * ca, s[11].w * 0.8) * (1.0 - sh * 0.8) + s[11].rgb * gb * (1.0 - sh) * max(s[10].y, 0.0) * mix(1.0, ca, s[11].w);
  vec3 tr = exp(-s[8].rgb * dp * 1.6);
  vec3 c = b.rgb * b.rgb * lit * tr + s[9].rgb * (1.0 - tr);
  o = vec4(sqrt(c), b.a);
}`,ho=z+o0+ge+`in vec3 vRay; out vec4 o;
uniform sampler2D uLay; uniform sampler2D uSurf; uniform sampler2D uEnv; uniform sampler2D uRock; uniform sampler2D uTile; uniform sampler2D uRing; uniform sampler2D uN;
const vec2 TP[4] = vec2[4](vec2(0.7, 0.3), vec2(-0.3, 0.7), vec2(-0.7, -0.3), vec2(0.3, -0.7));
void main() {
  vec3 Rd = normalize(vRay);
  float t = -s[4].y / vRay.y; vec3 P = s[4].xyz + vRay * t;
  vec2 uv = P.xz * s[6].w + 0.5;
  vec4 sf = texture(uSurf, uv);
  vec2 g = sf.xy * s[15].w + s[16].x;
  vec2 mi = texture(uTile, P.xz * 1.6 + d[1].xy).rg + texture(uTile, P.xz * 2.9 + d[1].zw).rg - 1.0;
  // rain: rings from a baked field of drop sites, each with its own moment
  float rain = d[0].y;
  vec2 rg = vec2(0.0);
  for (int i = 0; i < int(d[3].z); i++) {
    float fi = float(i), sc = 2.2 + fi * 1.7;
    vec4 r = texture(uRing, P.xz * sc * 0.5 + vec2(fi * 0.37, fi * 0.61));
    float tt = fract(d[0].x * (0.62 + fi * 0.13) + r.a * 7.0), rad = tt * 0.9, dist = r.b;
    float on = step(fract(r.a * 13.7), rain * (1.0 - fi * 0.12));
    float en = on * exp(-tt * 3.4) * smoothstep(0.3, 0.0, abs(dist - rad)) * smoothstep(1.0, 0.72, dist);
    rg += (r.rg * 2.0 - 1.0) * sin((dist - rad) * 21.0) * en * (0.13 - fi * 0.025);
  }
  vec2 gt = g + mi * 0.022 + rg;
  vec3 n = normalize(vec3(-gt.x, 1.0, -gt.y));
  // what's below, bent by the surface in proportion to how deep it lies
  vec2 sv = gl_FragCoord.xy / s[5].w, bend = vec2(g.x + mi.x * 0.016 + rg.x * 0.12, -(g.y + mi.y * 0.016 + rg.y * 0.12));
  bend *= s[18].w / (1.0 + length(bend) * 2.6);
  float d0 = textureLod(uLay, sv, 0.0).a;
  vec2 q = sv + bend * (d0 * s[4].w + 0.05);
  vec4 c1 = texture(uLay, q);
  float dp = c1.a;
  q = sv + bend * (dp * s[4].w + 0.05);
  c1 = texture(uLay, q);
  dp = c1.a;
  vec3 cc = c1.rgb * c1.rgb;
  float br = 0.0007 + 0.0036 * dp * dp + 0.0009 * rain;
  for (int i = 0; i < int(d[3].y); i++) { vec3 v = texture(uLay, q + TP[i] * br).rgb; cc += v * v; }
  cc /= 1.0 + d[3].y;
  // what's above, off the moving mirror
  vec2 gm = g * 0.42 + mi * 0.009 + rg * 1.1;
  vec3 Rf = reflect(Rd, normalize(vec3(-gm.x, 1.0, -gm.y)));
  float c = max(-dot(Rd, n), 0.0), F = s[9].w + (1.0 - s[9].w) * pow(1.0 - c, 5.0);
  vec2 ee = EV(Rf);
  vec3 sky = ENV(textureLod(uEnv, ee, 2.4));
  if (s[18].z > 0.0) {
    vec2 lq = (EV(reflect(Rd, normalize(vec3(-g.x * 0.3, 1.0, -g.y * 0.3)))) - s[18].xy) * 30.0;
    float ll = dot(lq, lq);
    // a paper globe seen in the water: soft-edged, hot at the heart, a few faint ribs
    float rl = length(lq * vec2(1.0, 0.86)), rib = 0.9 + 0.1 * cos(lq.y * 8.0);
    float globe = exp(-rl * rl * 1.7) * rib;
    sky += vec3(3.0, 1.15, 0.26) * s[18].z * (exp(-ll * 0.16) * 0.28 + globe * 2.1);
  }
  // the banks and stones lie in the mirror too
  float rkm = textureLod(uRock, uv + Rf.xz * 0.11, 3.5).a;
  sky = mix(sky, s[12].rgb * vec3(0.17, 0.19, 0.16), rkm);
  float glint = pow(max(dot(normalize(n + vec3(mi.x, 0.0, mi.y) * 0.22), normalize(s[13].xyz - Rd)), 0.0), 2600.0) * s[13].w;
  // each ring's near wall tips toward the sky and shows it far brighter than the flat water does
  F += rain * (min(dot(rg, rg) * 4.5, 0.3) + max(dot(rg, vec2(-0.5, -0.86)), 0.0) * 1.3);
  F = min(F + rain * 0.03, 0.6);
  vec3 col = mix(cc, sky, F) * (1.0 - sf.a * 0.55);
  col += s[11].rgb * glint * 2.4;
  vec4 rk = texture(uRock, uv);
  col = mix(col, rk.rgb * rk.rgb * 1.5, rk.a);
  col = FIN(col);
  float gr = texture(uN, gl_FragCoord.xy / 256.0 + d[1].xz * 11.0).r - 0.5;
  o = vec4(col + gr * 0.016, 1.0);
}`,xo=z+o0+Xe+`layout(location=0) in vec4 iA; layout(location=1) in vec4 iB; layout(location=2) in vec4 iC; layout(location=3) in vec2 aQ;
out vec3 vW; out vec3 vN; out vec2 vUv; out vec2 vL; flat out vec4 vK; flat out vec2 vC;
void main() {
  vec2 l = aQ * 2.0 - 1.0; vC = iA.xz;
  float cu = iB.y, sd = iB.w;
  float ax = 0.7 + 0.5 * fract(sd * 7.1), az = 0.8 + 0.6 * fract(sd * 3.3), tw = (fract(sd * 11.3) - 0.5) * 1.4;
  float y0 = cu * (ax * l.x * l.x + az * l.y * l.y + tw * l.x * l.y + 0.35 * (fract(sd * 5.7) - 0.5) * l.y);
  vec3 nl = normalize(vec3(-cu * (2.0 * ax * l.x + tw * l.y), 1.0 / iB.x * 0.04 + 0.04, -cu * (2.0 * az * l.y + tw * l.x)));
  float cs = cos(iA.w), sn = sin(iA.w), r = iB.x;
  vec3 q = vec3(l.x * r, y0 * r, l.y * r);
  // in the air it tumbles
  float ca = cos(iC.x), sa = sin(iC.x), cb = cos(iC.y), sb = sin(iC.y);
  q = vec3(q.x * ca - q.y * sa, q.x * sa + q.y * ca, q.z); q = vec3(q.x, q.y * cb - q.z * sb, q.y * sb + q.z * cb);
  nl = vec3(nl.x * ca - nl.y * sa, nl.x * sa + nl.y * ca, nl.z); nl = vec3(nl.x, nl.y * cb - nl.z * sb, nl.y * sb + nl.z * cb);
  vec3 W = iA.xyz + vec3(cs * q.x - sn * q.z, q.y, sn * q.x + cs * q.z) + vec3(0.0, 0.0015, 0.0);
  vec3 N = vec3(cs * nl.x - sn * nl.z, nl.y, sn * nl.x + cs * nl.z);
  float cell = iB.z;
  vUv = (vec2(mod(cell, 4.0), floor(cell / 4.0)) + aQ) * 0.25;
  vW = W; vN = N; vL = l; vK = vec4(iB.xy, cell, sd);
  gl_Position = CLIP(W);
}`,po=z+o0+ge+`in vec3 vW; in vec3 vN; in vec2 vUv; in vec2 vL; flat in vec4 vK; flat in vec2 vC; out vec4 o; uniform sampler2D uAtlas; uniform sampler2D uEnv; uniform float uAlpha;
void main() {
  vec4 a = texture(uAtlas, vUv);
  if (a.a < 0.03) discard;
  float rr = length(vL), an = atan(vL.y, vL.x), kk = vK.z;
  // pleats: a maple folds along its veins; pads are flat with a faint radial
  float pl = kk < 3.5 || kk > 9.5 ? 7.0 : kk > 5.5 && kk < 6.5 ? 18.0 : 3.0;
  bool mp = kk < 3.5 || kk > 9.5;
  vec3 N = normalize(vN + vec3(-sin(an), 0.0, cos(an)) * sin(an * pl + 1.6) * (mp ? 0.5 : kk > 5.5 && kk < 6.5 ? 0.012 : 0.05) * rr);
  if (N.y < 0.0) N = -N;
  vec3 V_ = normalize(s[4].xyz - vW);
  float gb = 1.0 - s[10].w * 0.75 * smoothstep(0.12, 0.55, textureLod(uEnv, vW.xz * 0.3 + 0.5 + d[0].zw, 3.0).a);
  vec3 lit = s[12].rgb * (0.16 + 0.84 * N.y * N.y) * 1.08 + s[11].rgb * gb * max(dot(N, s[13].xyz), 0.0) * 1.22;
  // where it touches the water it's soaked and darker; where it curls up it's lit through
  float low = smoothstep(0.0, 0.016, vW.y);
  vec3 col = a.rgb * lit * mix(0.72, 1.0, low) + a.rgb * s[12].rgb * 0.24 * low * rr;
  // the rim: lit where it faces the sun, shaded on the side away, never a line all round
  float ed = 1.0 - smoothstep(0.35, 0.95, textureLod(uAtlas, vUv, 2.0).a);
  float sside = dot(normalize(vW.xz - vC + vec2(1e-5)), normalize(s[13].xz + vec2(1e-4)));
  col *= 1.0 + ed * (sside > 0.0 ? 0.3 * sside * gb : 0.4 * sside);
  vec3 Rf = reflect(-V_, N);
  float fr = 0.03 + 0.97 * pow(1.0 - max(dot(N, V_), 0.0), 5.0);
  col += ENV(textureLod(uEnv, EV(Rf), 2.2)) * (fr * 1.4 + (kk > 5.5 && kk < 6.5 ? 0.04 : 0.012));
  o = vec4(FIN(col), clamp(a.a * 1.8 - 0.05, 0.0, 1.0) * uAlpha);
}`,bo=z+o0+`layout(location=0) in vec4 iA; layout(location=1) in vec4 iB; layout(location=3) in vec2 aQ; out vec2 vUv;
void main() { vec2 l = (aQ * 2.0 - 1.0) * iB.x; float cs = cos(iA.w), sn = sin(iA.w), cell = iB.z;
  vec2 xz = iA.xz + vec2(cs * l.x - sn * l.y, sn * l.x + cs * l.y) - s[10].xz / s[10].y * 1.25 * (s[4].w + iA.y);
  vUv = (vec2(mod(cell, 4.0), floor(cell / 4.0)) + aQ) * 0.25;
  gl_Position = vec4(xz * s[6].w * 2.0, 0.0, 1.0); }`,Ao=z+`in vec2 vUv; out vec4 o; uniform sampler2D uAtlas; uniform float uSt;
void main() { o = vec4(vec3(textureLod(uAtlas, vUv, 1.5).a * uSt), 1.0); }`,Ro=z+o0+Xe+`layout(location=0) in vec4 aP; layout(location=1) in vec2 aK; out vec2 vK; out vec3 vW;
void main() { vec4 c = CLIP(aP.xyz); gl_Position = c; vK = aK; vW = aP.xyz; gl_PointSize = max(aP.w * s[5].w * 2.0 / (c.w * length(s[6].xyz)) , 1.5); }`,yo=z+o0+ge+`in vec2 vK; in vec3 vW; out vec4 o;
void main() { vec2 p = gl_PointCoord * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard;
  float a; vec3 c; float k = vK.x;
  vec3 N = vec3(p.x, sqrt(1.0 - r), -p.y);
  if (k < 0.5) { // a pellet: a matte, slightly speckled ball
    float l = 0.5 + 0.5 * dot(N, normalize(vec3(-0.3, 0.8, 0.4)));
    c = vec3(0.17, 0.095, 0.04) * (s[12].rgb + s[11].rgb * 0.7) * (0.35 + 0.95 * l) + s[12].rgb * pow(max(N.z * 0.5 + N.y * 0.8, 0.0), 24.0) * 0.5;
    c *= 1.0 - 0.4 * smoothstep(0.5, 0.95, r);
    a = (1.0 - smoothstep(0.8, 1.0, r)) * vK.y;
  } else if (k < 1.5) { // a thrown droplet: bright rim, sky inside
    c = s[12].rgb * 1.6 + s[11].rgb * pow(max(N.y, 0.0), 8.0);
    a = (1.0 - smoothstep(0.3, 1.0, r)) * vK.y;
  } else { // snow, out of focus when close
    c = vec3(1.0) * (s[12].rgb * 1.5);
    a = (1.0 - smoothstep(0.0, 1.0, r)) * (1.0 - smoothstep(0.0, 1.0, r)) * vK.y;
  }
  o = vec4(FIN(c), a); }`,Eo=z+`in vec2 vUv; out vec4 o; uniform vec4 uW[24]; uniform int uC;
void main() { vec2 p = vUv * 6.2831853, g = vec2(0.0); float h = 0.0;
  for (int i = 0; i < uC; i++) { vec4 w = uW[i]; float a = dot(w.xy, p) + w.w; g += w.xy * w.z * cos(a); h += w.z * sin(a); }
  o = vec4(g * 0.5 + 0.5, h * 0.5 + 0.5, 1.0); }`,Fo=z+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform vec4 uP; uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform vec3 uT2;
uniform int uFb;
float fbm(vec2 p) { float a = 0.5, r = 0.0; for (int i = 0; i < uFb; i++) { r += a * texture(uN, p).r; p = p * 2.03 + 0.37; a *= 0.5; } return r / (1.0 - a * 1.0); }
void main() {
  float u = vUv.x, v = vUv.y, kind = uP.x; vec2 sd = uP.yz;
  if (u > 0.985) { o = vec4(v < 0.3 ? uC : uT2, 1.0); return; } // fin colour swatch
  float dors = 1.0 - abs(v - 0.5) * 2.0; // 1 on the back, 0 on the belly
  float nA = fbm(vec2(u * 0.021, abs(v - 0.5) * 0.019 + v * 0.002) + sd);
  float nB = fbm(vec2(u * 0.016, v * 0.012) + sd.yx * 1.7);
  float nC = fbm(vec2(u * 0.05, v * 0.04) + sd * 2.3);
  vec3 c = uA; float metal = 0.25;
  float fade = smoothstep(0.1, 0.5, dors);
  if (kind < 0.5) { // kohaku: a white body, stepped red patches over the back and a cap on the head
    float th = 0.5 + (1.0 - fade) * 0.2;
    float fA = nA + 0.085 * sin(u * 15.0 + sd.x * 19.0);
    float fB = fbm(vec2((u + 0.012) * 0.021, abs(v - 0.5) * 0.019 + v * 0.002) + sd) + 0.085 * sin((u + 0.012) * 15.0 + sd.x * 19.0);
    float red = smoothstep(th, th + mix(0.012, 0.06, smoothstep(0.0, -0.006, fB - fA)), fA);
    float cap = smoothstep(0.05, 0.075, u) * (1.0 - smoothstep(0.16, 0.2, u)) * smoothstep(0.42, 0.72, dors + (nC - 0.5) * 0.5);
    red = max(red * smoothstep(0.17, 0.235, u) * (1.0 - smoothstep(0.84, 0.95, u + (nC - 0.5) * 0.1)), cap);
    c = mix(uA * (0.92 + 0.14 * nC), uB * (0.8 + 0.45 * nB), red);
  } else if (kind < 1.5) { // ogon: one metallic colour, deeper along the back
    c = mix(uB, uA, smoothstep(0.1, 0.8, 1.0 - dors + (nB - 0.5) * 0.5));
    metal = 1.0;
  } else if (kind < 2.5) { // showa: sumi wraps in bands, hi rides on top, white between
    float sumi = smoothstep(0.46, 0.53, nB + 0.09 * sin(u * 16.0 + v * 4.0 + sd.y * 7.0) + 0.1 * (1.0 - smoothstep(0.0, 0.35, u)));
    float red = smoothstep(0.49, 0.5, nA + 0.06 * sin(u * 13.0 + sd.x * 17.0)) * fade;
    c = mix(uA * 0.95, uB * (0.8 + 0.4 * nC), red);
    c = mix(c, uC * (0.9 + 0.3 * nC), sumi * (1.0 - red * 0.72));
    c *= 1.0 - 0.18 * smoothstep(0.9, 1.0, u);
  } else { // asagi: blue-grey net on the back, warm red low on the flank and cheek
    float low = 1.0 - smoothstep(0.18, 0.42, dors + (nC - 0.5) * 0.2);
    float cheek = (1.0 - smoothstep(0.1, 0.22, u)) * (1.0 - smoothstep(0.35, 0.7, dors));
    c = mix(uA * (0.85 + 0.3 * nC), uB * (0.85 + 0.3 * nB), max(low, cheek));
    metal = 0.55;
  }
  if (u < 0.05) c = mix(c, vec3(0.75, 0.62, 0.5), 0.45 * (1.0 - u / 0.05));
  c = mix(vec3(0.72, 0.7, 0.64), c, smoothstep(0.0, 0.12, dors));
  o = vec4(c, metal);
}`,To=z+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform vec4 uK; uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform int uLobes;
void main() {
  vec2 p = vUv * 2.0 - 1.0; float k = uK.x, sd = uK.y;
  float nz = texture(uN, vUv * 0.02 + sd).r, nf = texture(uN, vUv * 0.05 + sd * 1.3).g;
  float a = 0.0, vein = 1.0, tip = 0.0;
  if (k < 0.5) { // a Japanese maple: seven deep narrow serrated lobes on a small palm
    vec2 q = p + vec2(0.0, 0.3);
    for (int i = 0; i < uLobes; i++) {
      float fi = float(i) - float(uLobes - 1) * 0.5, an = fi * (0.74 + uK.w) + (nz - 0.5) * 0.06;
      vec2 dr = vec2(sin(an), cos(an));
      float Lb = (1.22 - 0.1 * abs(fi) - 0.05 * fi * fi) * (0.9 + 0.1 * uK.z) * (0.86 + 0.24 * fract(sin(fi * 12.9898 + sd * 78.233) * 43758.5453));
      float along = dot(q, dr), ac = dot(q, vec2(dr.y, -dr.x)), st = along / Lb;
      if (st > 0.0 && st < 1.0) {
        float wd = Lb * 0.2 * pow(st, 0.42) * pow(1.0 - st, 0.72) * 2.0;
        float ser = 0.012 * sin(st * 48.0 + fi) + 0.007 * sin(st * 89.0);
        float d = wd + ser * step(0.2, st) - abs(ac);
        a = max(a, smoothstep(-0.008, 0.008, d));
        vein = min(vein, smoothstep(0.0, 0.018, abs(ac)));
        tip = max(tip, st * smoothstep(-0.01, 0.01, d));
      }
    }
    float palm = 0.2 - length(q * vec2(1.0, 1.15));
    a = max(a, smoothstep(-0.01, 0.01, palm));
    vec2 st2 = p - vec2(0.0, -0.62);
    a = max(a, smoothstep(0.02, 0.008, abs(st2.x + st2.y * st2.y * 0.2)) * smoothstep(0.32, 0.3, abs(st2.y)));
    vec3 c = mix(uB, uA, smoothstep(0.1, 0.62, tip + (nz - 0.5) * 0.45));
    c = mix(c, uC, smoothstep(0.62, 0.95, tip + (nf - 0.5) * 0.3));
    // veins run pale and yellow from the stalk toward each tip
    c = mix(c, uB * 1.3 + vec3(0.05, 0.04, 0.0), (1.0 - vein) * (1.0 - 0.7 * tip) * 0.6);
    c *= 0.9 + (nf - 0.5) * 0.24;
    c = mix(c, vec3(0.1, 0.055, 0.025), 0.55 * smoothstep(0.76, 0.9, texture(uN, vUv * 0.05 + sd * 2.0).b));
    o = vec4(c, a);
  } else if (k < 1.5) { // a blossom petal: a notched oval, deeper at the base
    vec2 q = p * vec2(1.25, 1.0);
    float notch = 0.14 * smoothstep(0.2, 0.0, abs(q.x)) * smoothstep(0.1, 0.9, q.y);
    float d = 0.86 - length(q * vec2(1.0, 1.0 + 0.2 * q.y)) - notch;
    a = smoothstep(-0.015, 0.015, d);
    vec3 c = mix(uB, uA, smoothstep(-0.7, 0.2, p.y + (nz - 0.5) * 0.3));
    c *= 0.94 + 0.08 * sin(atan(p.x, p.y + 1.1) * 60.0);
    o = vec4(c, a);
  } else if (k < 2.5) { // a lily pad: an uneven disc, a notch, faint branching veins, a thin dull lip
    float r = length(p), an = atan(p.x, p.y + 0.001);
    float rim = 0.93 + (nz - 0.5) * 0.09 + 0.012 * sin(an * 7.0 + sd * 20.0);
    float notch = smoothstep(0.022, 0.0, abs(an) - 0.05 - 0.05 * r);
    a = smoothstep(rim, rim - 0.018, r) * (1.0 - notch);
    float vn = smoothstep(0.93, 1.0, cos(an * 15.0 + sin(r * 9.0 + an * 3.0) * 0.3)) * smoothstep(0.08, 0.3, r);
    vec3 c = mix(uA, uB, smoothstep(0.32, 0.68, nf * 0.6 + nz * 0.4));
    c *= 1.0 + vn * 0.12 - 0.12 * (1.0 - r);
    c *= 0.78 + 0.44 * texture(uN, vUv * 0.14 + sd).g;
    c = mix(c, uC, smoothstep(rim - 0.05, rim - 0.015, r) * 0.45);
    o = vec4(c, a);
  } else { // a lily petal, long and pointed
    vec2 q = p * vec2(2.0, 1.0);
    float d = 1.0 - (abs(q.x) + q.y * q.y * 0.9);
    a = smoothstep(-0.03, 0.03, d);
    vec3 c = mix(uB, uA, smoothstep(-0.5, 0.95, p.y));
    c *= 0.86 + 0.14 * cos(p.x * 34.0);
    o = vec4(c, a);
  }
}`,No=z+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform vec3 uA; uniform vec3 uB; uniform vec4 uP; uniform int uFb;
float fbm(vec2 p) { float a = 0.5, r = 0.0; for (int i = 0; i < uFb; i++) { r += a * texture(uN, p).r; p = p * 2.03 + 0.37; a *= 0.5; } return r; }
void main() {
  float f = fbm(vUv * 0.07 + uP.xy), f2 = fbm(vUv * 0.16 + uP.yx + 0.3);
  vec3 c = mix(uA, uB, smoothstep(uP.z, uP.w, f + (f2 - 0.5) * 0.4));
  o = vec4(sqrt(c), 0.0);
}`,wo=z+`layout(location=0) in vec4 iA; layout(location=1) in vec2 iB; out vec2 vQ; out vec4 vS; out vec2 vR;
void main() { float t = float(gl_VertexID & 1), sd = float((gl_VertexID >> 1) & 1) * 2.0 - 1.0;
  vec2 a = iA.xy, b = iA.zw, dv = b - a; float l = max(length(dv), 1e-4); vec2 d = dv / l, nr = vec2(-d.y, d.x);
  float R = max(iB.x, iB.y) * 1.5 + 0.004;
  vec2 q = mix(a - d * R, b + d * R, t) + nr * sd * R;
  vQ = q; vS = iA; vR = iB;
  gl_Position = vec4(q * 2.0 - 1.0, 0.0, 1.0); }`,_o=z+`in vec2 vQ; in vec4 vS; in vec2 vR; out vec4 o; uniform vec3 uA;
void main() { vec2 a = vS.xy, b = vS.zw, ba = b - a, pa = vQ - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  float r = mix(vR.x, vR.y, h), d = length(pa - ba * h) - r;
  float al = 1.0 - smoothstep(-0.0012, 0.0012 + r * 0.3, d);
  o = vec4(uA, al); }`,Mo=z+`layout(location=0) in vec4 iA; layout(location=1) in vec2 iB; layout(location=3) in vec2 aQ; out vec2 vUv; out float vB;
void main() { vec2 l = (aQ * 2.0 - 1.0) * iA.w; float cs = cos(iA.z), sn = sin(iA.z), cell = iB.x;
  vec2 P = iA.xy + vec2(cs * l.x - sn * l.y, sn * l.x + cs * l.y);
  vUv = (vec2(mod(cell, 4.0), floor(cell / 4.0)) + aQ) * 0.25; vB = iB.y;
  gl_Position = vec4(P * 2.0 - 1.0, 0.0, 1.0); }`,Bo=z+`in vec2 vUv; in float vB; out vec4 o; uniform sampler2D uAtlas; uniform vec3 uA;
void main() { vec4 a = texture(uAtlas, vUv); o = vec4(sqrt(a.rgb * uA * vB), a.a * 0.92); }`,Se=`float fbm(vec2 p) { float a = 0.5, r = 0.0; for (int i = 0; i < uFb; i++) { r += a * texture(uN, p).r; p = p * 2.03 + 0.37; a *= 0.5; } return r; }
`,Uo=z+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform vec4 uP; uniform int uFb;
`+Se+`void main() {
  float f = fbm(vUv * 0.5 + uP.yz), f2 = fbm(vUv * 1.3 + uP.zy);
  if (uP.x < 0.5) { // silt and grit
    vec3 c = mix(vec3(0.16, 0.13, 0.09), vec3(0.27, 0.23, 0.16), f);
    c *= 0.85 + 0.3 * f2;
    o = vec4(sqrt(c) + (texture(uN, gl_FragCoord.xy / 256.0).g - 0.5) / 255.0, 1.0);
  } else { // pond liner: black rubber in slack folds, silt in the troughs
    float f3 = fbm(vUv * 0.18 + uP.yz + 0.2);
    float fold = abs(fract(f3 * 3.0 + f * 0.25) - 0.5) * 2.0, ridge = smoothstep(0.15, 0.0, fold);
    vec3 c = vec3(0.03, 0.032, 0.034) * (0.75 + 0.5 * f) + vec3(0.075, 0.08, 0.085) * ridge;
    c = mix(c, vec3(0.13, 0.11, 0.08) * (0.7 + 0.6 * f2), smoothstep(0.52, 0.72, f + (1.0 - fold) * 0.18) * 0.32);
    o = vec4(sqrt(c) + (texture(uN, gl_FragCoord.xy / 256.0).g - 0.5) / 255.0, 1.0);
  }
}`,zo=z+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform vec4 uP; uniform vec3 uQ; uniform int uK; uniform int uFb;
`+Se+`void main() {
  vec2 p = (vUv - 0.5) * ${(2*j0).toFixed(2)} * uP.x + uP.yz;
  p += (texture(uN, p * 0.011).rg - 0.5) * 0.26;
  vec2 ip = floor(p), fp = p - ip, rel = vec2(0.0), id = vec2(0.0); float f1 = 9.0, f2 = 9.0;
  for (int i = 0; i < uK; i++) {
    vec2 g = vec2(float(i % 3) - 1.0, float(i / 3) - 1.0);
    vec4 h = textureLod(uN, (ip + g + 0.5) / 256.0, 0.0);
    float an = h.b * 6.2831853, cs = cos(an), sn = sin(an), sq = 1.0 + h.a * 0.65;
    vec2 r = g + h.rg - fp; vec2 rr = vec2(cs * r.x - sn * r.y, (sn * r.x + cs * r.y) * sq);
    float dd = length(rr);
    if (dd < f1) { f2 = f1; f1 = dd; id = ip + g; rel = r; } else if (dd < f2) f2 = dd;
  }
  vec4 hs = textureLod(uN, (id + 0.5) / 256.0 * 1.73, 0.0);
  float edge = f2 - f1;
  float present = step(hs.a, uP.w);
  float dome = smoothstep(0.0, 0.6, edge);
  // river stones come in families: slate, ochre, rust, quartz; speckled and veined
  float pk = hs.r;
  vec3 c = pk < 0.4 ? vec3(0.1, 0.11, 0.115) : pk < 0.68 ? vec3(0.16, 0.135, 0.095) : pk < 0.88 ? vec3(0.17, 0.105, 0.07) : vec3(0.3, 0.28, 0.25);
  c *= 0.55 + 0.75 * hs.g;
  float spk = texture(uN, p * 0.17).b, grain = fbm(p * 0.06 + hs.xy);
  c *= 0.76 + 0.5 * grain;
  c *= 1.0 - 0.25 * smoothstep(0.62, 0.8, spk);
  float vn = smoothstep(0.03, 0.0, abs(fract(dot(rel, vec2(hs.g - 0.5, hs.r - 0.5)) * 7.0 + grain) - 0.5));
  c = mix(c, vec3(0.5, 0.48, 0.42), vn * step(hs.b, 0.3) * 0.5);
  vec3 N = normalize(vec3(rel * (1.0 - dome * 0.45) * 1.5, 0.62));
  c *= 0.25 + 0.95 * max(dot(N, normalize(vec3(-0.3, 0.45, 0.8))), 0.0);
  c *= uQ;
  // a skin of silt on top; a dark contact shadow around each stone
  float al = present * smoothstep(0.0, 0.09, edge);
  c = mix(c * 0.28, c, smoothstep(0.02, 0.2, edge));
  o = vec4(sqrt(max(c, vec3(0.0))) + (texture(uN, gl_FragCoord.xy / 256.0).g - 0.5) / 255.0, al);
}`,Lo=z+o0+`in vec2 vUv; out vec4 o; uniform sampler2D uN;
void main() { vec2 P = (vUv - 0.5) / s[6].w;
  float rd = s[17].z - length(P - s[17].xy) + (texture(uN, P * 0.031 + 0.3).r - 0.5) * 0.25;
  o = vec4(0.0, 0.0, 0.0, 0.22 + 0.78 * smoothstep(0.0, 0.5, rd)); }`,Po=z+o0+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform int uK; uniform int uFb;
`+Se+`void main() {
  vec2 P = (vUv - 0.5) / s[6].w;
  float rd = s[17].z - length(P - s[17].xy) + (texture(uN, P * 0.031 + 0.3).r - 0.5) * 0.25;
  vec2 p = P * 2.3 + vec2(11.3, 7.9);
  p += (texture(uN, p * 0.009).rg - 0.5) * 0.35;
  vec2 ip = floor(p), fp = p - ip, id = vec2(0.0); float f1 = 9.0, f2 = 9.0;
  for (int i = 0; i < uK; i++) {
    vec2 g = vec2(float(i % 3) - 1.0, float(i / 3) - 1.0);
    vec4 h = textureLod(uN, (ip + g + 0.5) / 256.0, 0.0);
    vec2 r = g + h.rg - fp; float dd = length(r);
    if (dd < f1) { f2 = f1; f1 = dd; id = ip + g; } else if (dd < f2) f2 = dd;
  }
  vec4 hs = textureLod(uN, (id + 0.5) / 256.0 * 1.31, 0.0);
  float e = f2 - f1;
  float dome = sqrt(smoothstep(0.0, 0.62, e) * smoothstep(1.05, 0.4, f1));
  float f = fbm(P * 0.09 + 0.2), f3 = fbm(P * 0.42 + hs.xy);
  // boulders of their own heights, split by cracks, on a bank that climbs away from the water
  float H = -rd * 0.8 - 0.06 + dome * (0.1 + 0.15 * hs.g) * smoothstep(0.34, -0.12, rd) + (f - 0.5) * 0.06 + (f3 - 0.5) * 0.012;
  H -= 0.02 * smoothstep(0.05, 0.0, e);
  H = clamp(H * 0.5 + 0.3, 0.0, 0.9999);
  float h1 = floor(H * 255.0) / 255.0;
  o = vec4(h1, (H - h1) * 255.0, fract(hs.b + hs.r * 3.0), 1.0);
}`,go=z+o0+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform sampler2D uH; uniform int uK; uniform int uFb; uniform vec4 uP;
`+Se+`float G(ivec2 p) { vec4 t = texelFetch(uH, p, 0); return (t.r + t.g / 255.0 - 0.3) * 2.0; }
void main() {
  ivec2 q = ivec2(gl_FragCoord.xy); vec2 P = (vUv - 0.5) / s[6].w; float ts = uP.x;
  float h = G(q), g0 = 0.0, g1 = 0.0, ao = 0.0;
  for (int i = 0; i < uK; i++) {
    float an = float(i) * 0.7854, cs = cos(an), sn = sin(an);
    float rr = i % 2 == 0 ? 2.0 : 9.0;
    float g = G(q + ivec2(vec2(cs, sn) * rr));
    if (i % 2 == 0) { g0 += g * cs; g1 += g * sn; }
    ao += max(g - h, 0.0);
  }
  vec2 gr = vec2(g0, g1) / (2.0 * 2.0 * ts);
  float f = fbm(P * 0.2 + 0.1), f2 = fbm(P * 0.9), sp = texture(uN, P * 0.9).g, sp2 = texture(uN, P * 2.3).b;
  gr += (vec2(texture(uN, P * 0.12).r, texture(uN, P * 0.12 + 0.37).r) - 0.5) * 0.5;
  gr += (vec2(texture(uN, P * 1.1).r, texture(uN, P * 1.1 + 0.4).r) - 0.5) * 0.09;
  vec3 N = normalize(vec3(-gr.x * 2.0, 1.0, -gr.y * 2.0));
  // a granite boulder: dry and paler on top with rosettes of lichen, a fine grain, no blotches
  float occ = 1.0 / (1.0 + ao * 2.6);
  float top = smoothstep(0.8, 0.97, N.y) * smoothstep(0.03, 0.1, h) * occ;
  vec3 al = mix(vec3(0.085, 0.08, 0.07), vec3(0.15, 0.142, 0.128), smoothstep(0.25, 0.8, f + (f2 - 0.5) * 0.25));
  al *= (0.93 + 0.14 * sp) * (1.0 + 0.4 * top);
  al = mix(al, vec3(0.28, 0.27, 0.24), smoothstep(0.86, 0.94, sp2) * 0.18);
  al = mix(al, vec3(0.33, 0.35, 0.29), smoothstep(0.6, 0.7, fbm(P * 0.9 + 1.7)) * (0.15 + 0.4 * top));
  // moss as soft cushions in the crevices and on the damp shaded side, not dots
  float mossN = fbm(P * 0.3 + 3.1) + (N.y - 0.8) * 0.25 - h * 0.8 + (1.0 - occ) * 0.15;
  float moss = smoothstep(0.44, 0.62, mossN) * smoothstep(0.015, 0.07, h);
  vec3 mc = mix(vec3(0.024, 0.04, 0.012), vec3(0.075, 0.105, 0.03), f2) * (0.9 + 0.2 * sp);
  al = mix(al, mc, moss);
  // the waterline: soaked dark for a span, a line of algae right at the wet edge
  float wetl = 1.0 - smoothstep(0.0, 0.075, h + (f2 - 0.5) * 0.03);
  al = mix(al, al * 0.36, wetl * (1.0 - moss * 0.6));
  if (uP.y > 0.5) { // snow on what faces up
    float sn2 = smoothstep(0.86, 0.97, N.y + (f - 0.5) * 0.25) * smoothstep(0.012, 0.05, h);
    al = mix(al, vec3(0.8, 0.84, 0.88), sn2);
  }
  vec3 V_ = normalize(s[4].xyz - vec3(P.x, max(h, 0.0), P.y));
  vec3 lit = s[12].rgb * (0.3 + 0.7 * N.y) * occ * 1.06 + s[11].rgb * max(dot(N, s[13].xyz), 0.0) * (0.45 + 0.55 * occ);
  vec3 c = al * lit;
  vec3 Rf = reflect(-V_, N);
  float fr = 0.04 + 0.96 * pow(1.0 - max(dot(N, V_), 0.0), 5.0);
  float gloss = (1.0 - moss * 0.9) * (0.2 + 0.8 * wetl);
  c += s[12].rgb * 1.1 * fr * gloss * occ * max(Rf.y, 0.0) * (0.7 + 2.5 * pow(max(dot(Rf, normalize(s[13].xyz + vec3(0.0, 0.3, 0.0))), 0.0), 14.0));
  c += (s[12].rgb * 0.08 + s[11].rgb * 0.1) * smoothstep(0.004, 0.0, abs(h - 0.008)) * (1.0 - moss) * max(dot(normalize(N.xz + vec2(1e-4)), normalize(s[13].xz + vec2(1e-4))), 0.0);
  c *= mix(vec3(0.8, 0.92, 0.62), vec3(1.0), occ);
  c = min(c / 1.5, vec3(1.0));
  float ra = smoothstep(0.0, 0.0065, h);
  o = vec4(sqrt(c), ra);
}`;function So(o){const e={sim:[T0,to],splat:[oo,ao],surf:[T0,ro],dim:[so,no],cau:[io,co],fsh:[lo,fo],body:[bt,uo],fin:[bt,vo],bot:[xt,mo],comp:[xt,ho],leaf:[xo,po],lsh:[bo,Ao],pt:[Ro,yo],micro:[T0,Eo],pat:[T0,Fo],atlas:[T0,To],sky:[T0,No],branch:[wo,_o],eleaf:[Mo,Bo],bed:[T0,Uo],stones:[T0,zo],depth:[T0,Lo],rkh:[T0,Po],rk:[T0,go]},I=!!(o.getExtension("EXT_color_buffer_float")||o.getExtension("EXT_color_buffer_half_float")),p=o.getExtension("EXT_texture_filter_anisotropic"),D=new Map,k={},R0=(c,n)=>{let l=D.get(n);return l||(l=o.createShader(c),o.shaderSource(l,n),o.compileShader(l),D.set(n,l)),l};for(const c in e){const n=o.createProgram();o.attachShader(n,R0(o.VERTEX_SHADER,e[c][0])),o.attachShader(n,R0(o.FRAGMENT_SHADER,e[c][1])),o.linkProgram(n),k[c]=n}o.flush();const S0=(c,n,l,f,m,h,x)=>{const R=o.createTexture();return o.bindTexture(o.TEXTURE_2D,R),o.texImage2D(o.TEXTURE_2D,0,l,c,n,0,f,m,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,h),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,h===o.NEAREST?o.NEAREST:o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,x||o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,x||o.CLAMP_TO_EDGE),R},i=c=>{const n=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,n),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,c,0),n},D0=(c,n,l,f)=>{const m=o.createTexture();return o.bindTexture(o.TEXTURE_2D,m),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,c,c,0,o.RGBA,o.UNSIGNED_BYTE,n),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,f?o.LINEAR_MIPMAP_LINEAR:o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,l),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,l),f&&o.generateMipmap(o.TEXTURE_2D),m};let M=183183;const u0=()=>{M=M+1831565813|0;let c=Math.imul(M^M>>>15,1|M);return c=c+Math.imul(c^c>>>7,61|c)^c,(c^c>>>14)>>>0},He=new Uint8Array(256*256*4);{const c=new Uint32Array(He.buffer);for(let n=0;n<c.length;n++)c[n]=u0()}const $0=D0(256,He,o.REPEAT,!1),N0=128,w0=N0/4,Y=new Uint8Array(N0*N0*4),De=new Float32Array(16);for(let c=0;c<16;c++)De[c]=(u0()&1023)/1023;for(let c=0;c<N0;c++)for(let n=0;n<N0;n++){const l=n/w0,f=c/w0;let m=!1,h=0,x=0,R=1,S=0;for(let $=Math.floor(l)-2;$<=Math.floor(l)+1&&!m;$++)for(let W=Math.floor(f)-1;W<=Math.floor(f)+2&&!m;W++){const Z=$+(W&1)*.5,J=l-Z,g0=f-W,_=Math.hypot(J*.92,g0);_<.86&&(m=!0,h=J,x=g0,R=_/.86,S=De[($%4+4)%4+(W%4+4)%4*4])}const Q=(n+c*N0)*4;Y[Q]=P(127.5+h*127.5,0,255),Y[Q+1]=P(127.5+x*127.5,0,255),Y[Q+2]=S*255,Y[Q+3]=P((1-Math.pow(R,5))*255,0,255)}const Te=D0(N0,Y,o.REPEAT,!0);o.bindTexture(o.TEXTURE_2D,Te),p&&o.texParameterf(o.TEXTURE_2D,p.TEXTURE_MAX_ANISOTROPY_EXT,4);const p0=256,i0=14,d0=new Uint8Array(p0*p0*4),Z0=new Float32Array(i0*i0),J0=new Float32Array(i0*i0),ee=new Uint8Array(i0*i0);for(let c=0;c<i0*i0;c++)Z0[c]=(u0()&1023)/1023,J0[c]=(u0()&1023)/1023,ee[c]=u0()&255;for(let c=0;c<p0;c++)for(let n=0;n<p0;n++){const l=n/p0*i0,f=c/p0*i0,m=Math.floor(l),h=Math.floor(f);let x=9,R=0,S=0,Q=0;for(let Z=-1;Z<=1;Z++)for(let J=-1;J<=1;J++){const g0=(m+J+i0)%i0,_=(h+Z+i0)%i0,X=g0+_*i0,H0=m+J+Z0[X]-l,ne=h+Z+J0[X]-f,Qe=H0*H0+ne*ne;Qe<x&&(x=Qe,R=H0,S=ne,Q=ee[X])}const $=Math.sqrt(x)||1,W=(n+c*p0)*4;d0[W]=P(127.5-R/$*127,0,255),d0[W+1]=P(127.5-S/$*127,0,255),d0[W+2]=P($*255,0,255),d0[W+3]=Q}const ce=D0(p0,d0,o.REPEAT,!1),_0=o.createVertexArray(),te=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,te);const l0=8,oe=new Float32Array((l0+1)*(l0+1)*2),j=new Uint16Array(l0*l0*6);{let c=0,n=0;for(let l=0;l<=l0;l++)for(let f=0;f<=l0;f++)oe[c++]=f/l0,oe[c++]=l/l0;for(let l=0;l<l0;l++)for(let f=0;f<l0;f++){const m=f+l*(l0+1),h=m+1,x=m+l0+1,R=x+1;j[n++]=m,j[n++]=h,j[n++]=x,j[n++]=h,j[n++]=R,j[n++]=x}}o.bufferData(o.ARRAY_BUFFER,oe,o.STATIC_DRAW);const k0=o.createBuffer();o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,k0),o.bufferData(o.ELEMENT_ARRAY_BUFFER,j,o.STATIC_DRAW);const O=[],a0=[],G=[],M0=[[0,.013,.011],[.008,.026,.022],[.02,.036,.034],[.05,.05,.054],[.09,.066,.072],[.16,.086,.094],[.26,.103,.112],[.36,.11,.118],[.48,.104,.112],[.62,.086,.094],[.76,.06,.068],[.88,.034,.042],[1,.014,.02]],B0=(c,n)=>{for(let l=1;l<M0.length;l++)if(c<=M0[l][0]){const f=M0[l-1],m=M0[l];let h=(c-f[0])/(m[0]-f[0]);return h=h*h*(3-2*h)*.35+h*.65,f[n]+(m[n]-f[n])*h}return M0[M0.length-1][n]},U0=(c,n,l,f,m,h,x,R,S)=>(O.push(c,n,l,f,m,h,x,R,S),O.length/9-1),O0=44,z0=22,le=0,yt=c=>{const n=c/O0;return n<.3?.14*Math.pow(n/.3,1.8):.14+.86*(n-.3)/.7};for(let c=0;c<=O0;c++){const n=yt(c),l=B0(n,1),f=B0(n,2),m=(B0(Math.min(n+.01,1),1)-B0(Math.max(n-.01,0),1))/.02;for(let h=0;h<=z0;h++){const x=(h/z0-.5)*U,R=Math.sin(x),S=Math.cos(x),Q=S>=0?f*Math.pow(S,.9):f*.86*S,$=l*Math.sign(R)*Math.pow(Math.abs(R),.88),W=R/Math.max(l,.001),Z=S/Math.max(f,.001),J=Math.hypot(W,Z),g0=-m*1.1,_=Math.hypot(W/J,Z/J,g0);U0(n,$,Q,0,W/J/_,Z/J/_,g0/_,n,h/z0)}}for(let c=0;c<=z0;c++){const n=(c/z0-.5)*U,l=Math.sin(n),f=Math.cos(n);U0(.016,.003*l,.003*f,0,0,0,1,-.05,c/z0)}for(let c=0;c<=O0;c++)for(let n=0;n<z0;n++){const l=le+(c===O0?O0+1:c)*(z0+1)+n,f=l+1,m=le+(c===O0?0:c+1)*(z0+1)+n,h=m+1;if(c===O0){a0.push(l,f,m,f,h,m);continue}a0.push(l,f,m,f,h,m)}const ae=(c,n,l,f)=>{const x=O.length/9;for(let R=0;R<=7;R++)for(let S=0;S<=10;S++){const Q=R/7,$=S/10,W=(1-.62*Math.pow(2*$-1,2))*(1-.18*$);U0(c,n,l*B0(c,1),1,Q*W,0,f,Q,$)}for(let R=0;R<7;R++)for(let S=0;S<10;S++){const Q=x+R*11+S,$=Q+1,W=Q+10+1,Z=W+1;G.push(Q,$,W,$,Z,W)}};ae(.235,.2,.82,1),ae(.235,.2,.82,-1),ae(.56,.12,.6,1),ae(.56,.12,.6,-1),ae(.74,.075,.3,1),ae(.74,.075,.3,-1);{const n=O.length/9;for(let l=0;l<=18;l++)for(let f=0;f<=2;f++){const m=l/18,h=.36+m*.36,x=f/2,R=.068*Math.pow(Math.sin(Math.min(m*3.5,K0/2)),.8)*(1-m*.72);U0(h,R,B0(h,2)*.98,2,m,x,0,x,m)}for(let l=0;l<18;l++)for(let f=0;f<2;f++){const m=n+l*3+f,h=m+1,x=m+3,R=x+1;G.push(m,h,x,h,R,x)}}{const l=O.length/9;for(let f=0;f<=8;f++)for(let m=0;m<=10;m++){const h=f/8,x=m/10*2-1,R=1-.34*(1-Math.abs(x))*(1-Math.abs(x))*1.2;U0(1,0,0,3,h*R,x,0,h*R,x)}for(let f=0;f<8;f++)for(let m=0;m<10;m++){const h=l+f*11+m,x=h+1,R=h+10+1,S=R+1;G.push(h,x,R,x,S,R)}}const fe=(c,n,l,f)=>{const h=O.length/9;for(let x=0;x<=5;x++)for(let R=0;R<=1;R++)U0(c,n,l,4,x/5,f,0,x/5,R*(1-x/5));for(let x=0;x<5;x++){const R=h+x*2,S=R+1,Q=R+2,$=Q+1;G.push(R,S,Q,S,$,Q)}};fe(.008,.015,.082,1),fe(.008,.015,.082,-1),fe(.02,.028,.044,1),fe(.02,.028,.044,-1);const ke=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,ke),o.bufferData(o.ARRAY_BUFFER,new Float32Array(O),o.STATIC_DRAW);const X0=o.createBuffer(),Ne=new Uint16Array(a0.length+G.length);Ne.set(a0,0),Ne.set(G,a0.length),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,X0),o.bufferData(o.ELEMENT_ARRAY_BUFFER,Ne,o.STATIC_DRAW);const ue=o.createVertexArray();o.bindVertexArray(ue),o.bindBuffer(o.ARRAY_BUFFER,ke),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,4,o.FLOAT,!1,36,0),o.enableVertexAttribArray(1),o.vertexAttribPointer(1,3,o.FLOAT,!1,36,16),o.enableVertexAttribArray(2),o.vertexAttribPointer(2,2,o.FLOAT,!1,36,28),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,X0);const L=192,y0=new Float32Array((L+1)*(L+1)*2),L0=new Uint16Array(L*L*6);{let c=0,n=0;for(let l=0;l<=L;l++)for(let f=0;f<=L;f++)y0[c++]=f/L,y0[c++]=l/L;for(let l=0;l<L;l++)for(let f=0;f<L;f++){const m=f+l*(L+1),h=m+1,x=m+L+1,R=x+1;L0[n++]=m,L0[n++]=h,L0[n++]=x,L0[n++]=h,L0[n++]=R,L0[n++]=x}}const Ye=o.createBuffer(),re=o.createBuffer(),P0=o.createVertexArray();o.bindVertexArray(P0),o.bindBuffer(o.ARRAY_BUFFER,Ye),o.bufferData(o.ARRAY_BUFFER,y0,o.STATIC_DRAW),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,2,o.FLOAT,!1,0,0),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,re),o.bufferData(o.ELEMENT_ARRAY_BUFFER,L0,o.STATIC_DRAW),o.bindVertexArray(null);for(const c in e)if(!o.getProgramParameter(k[c],o.LINK_STATUS)){const n=o.getProgramInfoLog(k[c])||"",l=o.getShaderInfoLog(R0(o.VERTEX_SHADER,e[c][0])),f=o.getShaderInfoLog(R0(o.FRAGMENT_SHADER,e[c][1]));throw new Error("183 "+c+": "+n+" "+l+" "+f)}const se={uSurf:0,uCau:1,uShadow:2,uLay:3,uEnv:4,uBot:5,uRock:6,uTile:7,uRing:8,uF:9,uPat:10,uScale:11,uAtlas:12,uSim:13,uN:14,uH:15},f0={};for(const c in k){const n=k[c],l=o.getUniformBlockIndex(n,"S"),f=o.getUniformBlockIndex(n,"D");l!==o.INVALID_INDEX&&o.uniformBlockBinding(n,l,0),f!==o.INVALID_INDEX&&o.uniformBlockBinding(n,f,1),o.useProgram(n);for(const R in se){const S=o.getUniformLocation(n,R);S&&o.uniform1i(S,se[R])}const m=o.getUniformLocation(n,"uFb");m&&o.uniform1i(m,c==="pat"?3:5);const h=o.getUniformLocation(n,"uK");h&&c!=="atlas"&&o.uniform1i(h,c==="rk"?8:9);const x=o.getUniformLocation(n,"uLobes");x&&o.uniform1i(x,7),f0[c]=R=>o.getUniformLocation(n,R)}o.useProgram(k.lsh),o.uniform1f(f0.lsh("uSt"),.8),o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.SCISSOR_TEST),o.disable(o.CULL_FACE),o.colorMask(!0,!0,!0,!0),o.activeTexture(o.TEXTURE14),o.bindTexture(o.TEXTURE_2D,$0);const we=S0(256,256,o.RGBA8,o.RGBA,o.UNSIGNED_BYTE,o.LINEAR,o.REPEAT);o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR);{const c=i(we);o.viewport(0,0,256,256),o.useProgram(k.micro);const n=new Float32Array(96);for(let l=0;l<24;l++){const f=3+22*Math.pow(l/23,1.2),m=u0()/4294967296*U;let h=Math.round(Math.cos(m)*f),x=Math.round(Math.sin(m)*f);!h&&!x&&(h=1),n.set([h,x,.8/Math.pow(Math.hypot(h,x),1)/6,u0()/4294967296*U],l*4)}o.uniform4fv(f0.micro("uW"),n),o.uniform1i(f0.micro("uC"),24),o.bindVertexArray(_0),o.drawArrays(o.TRIANGLES,0,3),o.bindFramebuffer(o.FRAMEBUFFER,null),o.deleteFramebuffer(c),o.bindTexture(o.TEXTURE_2D,we),o.generateMipmap(o.TEXTURE_2D)}o.activeTexture(o.TEXTURE14),o.bindTexture(o.TEXTURE_2D,$0),o.activeTexture(o.TEXTURE0);const V0=768,ve=S0(V0,V0,o.RGBA8,o.RGBA,o.UNSIGNED_BYTE,o.LINEAR);o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR);{const c=i(ve);o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.useProgram(k.atlas),o.bindVertexArray(_0);const n=(f,m,h,x,R,S,Q)=>{o.viewport(f%4*V0/4,Math.floor(f/4)*V0/4,V0/4,V0/4),o.uniform4f(f0.atlas("uK"),m,h,x,f===2?-.1:f===0?.05:f===8?.12:0),o.uniform1i(f0.atlas("uLobes"),f===1||f===8||f===11?5:7),o.uniform3fv(f0.atlas("uA"),R),o.uniform3fv(f0.atlas("uB"),S),o.uniform3fv(f0.atlas("uC"),Q),o.drawArrays(o.TRIANGLES,0,3)};o.uniform1i(f0.atlas("uLobes"),7);const l=f=>{const m=f[0]*.3+f[1]*.55+f[2]*.15;return f.map(h=>h*.68+m*.32)};n(0,0,.13,1,l([.3,.022,.018]),l([.36,.1,.02]),l([.13,.01,.014])),n(1,0,.47,.3,l([.4,.06,.014]),l([.46,.18,.024]),l([.2,.016,.012])),n(2,0,.71,.7,l([.44,.18,.022]),l([.36,.26,.05]),l([.28,.05,.014])),n(10,0,.39,.8,l([.5,.34,.05]),l([.42,.36,.08]),l([.38,.17,.025])),n(11,0,.91,.4,l([.36,.14,.03]),l([.14,.19,.035]),l([.28,.05,.02])),n(3,0,.29,.5,[.11,.07,.04],[.14,.09,.05],[.06,.04,.03]),n(4,1,.33,0,[.82,.58,.62],[.68,.27,.36],[0,0,0]),n(5,1,.61,0,[.9,.82,.8],[.74,.45,.5],[0,0,0]),n(6,2,.17,0,[.022,.085,.03],[.05,.14,.04],[.11,.08,.03]),n(7,3,.53,0,[.78,.36,.5],[.86,.74,.72],[0,0,0]),n(9,1,.11,0,[.72,.5,.1],[.66,.34,.05],[0,0,0]),n(8,0,.83,.6,[.1,.27,.05],[.14,.33,.05],[.06,.2,.04]),o.bindFramebuffer(o.FRAMEBUFFER,null),o.deleteFramebuffer(c),o.bindTexture(o.TEXTURE_2D,ve),o.generateMipmap(o.TEXTURE_2D)}return o.bindVertexArray(null),{P:k,LOC:f0,flt:I,tex:S0,fbo:i,noise:$0,scale:Te,ring:ce,tile:we,atlas:ve,vao0:_0,qb:te,qe:k0,QN:j.length,vaoFish:ue,nB:a0.length,nF:G.length,vaoCau:P0,nC:L0.length}}ht.add({num:183,name:"Koi Pond",fam:"Worlds",recipe:"A garden koi pond seen through the water from above, where the real waves bend the fish, mirror the trees and throw moving light on the stones. The koi and how many there are, the season, the water, the light, the bottom and the weather change every mint. Tap to drop pellets, drag a finger through the water and the fish shy away, or hold for rain and the koi sink.",interactive:"Tap to drop pellets and start a feeding frenzy. Drag to trail a finger through the water; the fish shy from it. Hold for rain, thousands of rings, and the koi sink.",music:!0,gl:!0,fps:30,seed:0,make(o){const e=o.gl,I=o.size;let p=dt.get(e);p||(p=So(e),dt.set(e,p));const D=p.P,k=p.LOC;let R0=2654435769;const S0=o.hash.slice(2);for(let t=0;t<S0.length;t+=8)R0=Math.imul(R0^parseInt(S0.slice(t,t+8),16),1540483477)>>>0;const i=()=>{R0=R0+1831565813|0;let t=Math.imul(R0^R0>>>15,1|R0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},D0=t=>{let s=i(),a;for(a in t)if(s-=t[a],s<=0)return a;return a},M={mix:D0({kohaku:.42,ogon:.22,showa:.26,"butterfly long-fin":.1}),count:D0({3:.34,7:.42,12:.24}),season:D0({"autumn maple":.45,"spring blossom":.25,"summer lilies":.2,"snow melting":.1}),water:D0({clear:.66,"green-tinted":.34}),light:D0({overcast:.5,"dappled sun":.38,"dusk lantern":.12}),bottom:D0({"river stones":.68,"dark liner":.32})};o.home&&(M.mix="kohaku",M.count="3",M.season="autumn maple",M.water="clear",M.light="dappled sun",M.bottom="river stones"),o.trait("Koi",M.mix),o.trait("Count",+M.count),o.trait("Season",M.season),o.trait("Water",M.water),o.trait("Light",M.light),o.trait("Bottom",M.bottom);let u0=25403678;for(let t=0;t<S0.length;t+=8)u0=Math.imul(u0^parseInt(S0.slice(t,t+8),16),668265263)^u0>>>15;const $0=(()=>{u0=u0+1831565813|0;let t=Math.imul(u0^u0>>>15,1|u0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296})(),N0=o.home||$0>=.3&&$0<.86?"light breeze":$0<.3?"still air":"drizzle";o.trait("Weather",N0);let w0=25412290;for(let t=0;t<S0.length;t+=8)w0=Math.imul(w0^parseInt(S0.slice(t,t+8),16),374761393)^w0>>>13;const Y=()=>{w0=w0+1831565813|0;let t=Math.imul(w0^w0>>>15,1|w0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},De=N0==="still air"?.4:1,Te=N0==="drizzle"?.27:0,p0=+M.count,i0=I<=400?.5:1,d0=I<=400?192:384,Z0=I<=400?256:512,J0=I<=400?256:512,ee=I<=400?256:512,ce=Math.round(768*i0),_0=Math.round(1024*i0),te=.9,l0=.27,oe=3.5,j=1/oe,k0=[0,oe*Math.cos(l0),oe*Math.sin(l0)],O=[0,-Math.cos(l0),-Math.sin(l0)],a0=[1,0,0],G=[0,-O[2]*1,O[1]*1*-1];G[0]=a0[1]*O[2]-a0[2]*O[1],G[1]=a0[2]*O[0]-a0[0]*O[2],G[2]=a0[0]*O[1]-a0[1]*O[0],G[2]>0&&(G[0]=-G[0],G[1]=-G[1],G[2]=-G[2]);const M0=.5,B0=8,U0=(B0+M0)/(B0-M0),O0=-2*B0*M0/(B0-M0),z0=(t,s)=>t[0]*s[0]+t[1]*s[1]+t[2]*s[2],le=(t,s,a)=>[t[0]*s,t[1]*s,t[2]*s,a-z0(t,k0)*s],yt=0,ae=0,fe=le(a0,1/j,0),ke=le(G,1/j,0),X0=le(O,1,0),Ne=[X0[0]*U0,X0[1]*U0,X0[2]*U0,X0[3]*U0+O0],ue=(t,s)=>{const a=t*2-1,r=1-s*2,v=O[0]+a0[0]*j*a+G[0]*j*r,E=O[1]+a0[1]*j*a+G[1]*j*r,y=O[2]+a0[2]*j*a+G[2]*j*r,u=-k0[1]/E;return[k0[0]+v*u,k0[2]+y*u]},L={overcast:{amb:[.86,.9,.92],sun:[.22,.22,.2],cm:.34,gob:0,gl:0,shs:.5,gain:3.2,a:[.74,.78,.84],b:[1,1.04,1.08],sa:.3,sb:.7,exp:1.08,F0:.058},"dappled sun":{amb:[.44,.49,.54],sun:[1.2,1.06,.82],cm:1,gob:.86,gl:1,shs:.8,gain:3.2,a:[.42,.56,.8],b:[1.3,1.3,1.3],sa:.38,sb:.62,exp:1,F0:.075},"dusk lantern":{amb:[.2,.2,.33],sun:[.62,.32,.17],cm:.4,gob:.3,gl:.3,shs:.5,gain:1.8,a:[.09,.13,.33],b:[.78,.42,.25],sa:.3,sb:.72,exp:1.25,F0:.075}}[M.light],y0=M.water==="clear"?{k:[1.15,.44,.5],sc:[.012,.042,.052]}:{k:[1.5,.56,1.25],sc:[.018,.075,.03]};M.bottom==="dark liner"&&(y0.sc=y0.sc.map(t=>t*.15));const L0=M.light==="dusk lantern"?[.42,.75,-.3]:[.28,.88,.3],Ye=Math.hypot(...L0),re=L0.map(t=>t/Ye),P0=[re[0]*.75,0,re[2]*.75];P0[1]=Math.sqrt(Math.max(0,1-P0[0]*P0[0]-P0[2]*P0[2]));const se=11,f0=new Float32Array(44),we=i()*U;for(let t=0;t<se;t++){const s=.09+.3*Math.pow(1-t/(se-1),1.4),a=U/s,r=we+t*2.39996+(i()-.5)*.5,v=Math.sqrt(9.8*a)*.62;f0.set([Math.cos(r)*a,Math.sin(r)*a,.00105*Math.pow(s/.25,1.1)*(.7+i()*.6),v],t*4)}const V0=o.home?2.42:i()*U,ve=.3+i()*.17,c=1.36+i()*.16,n=[Math.cos(V0)*ve,Math.sin(V0)*ve],l=(t,s)=>c-Math.hypot(t-n[0],s-n[1]),f=new Float32Array(32*4),m=new Float32Array(6*4),h=(t,s,a,r,v)=>{f[t*4]=s,f[t*4+1]=a,f[t*4+2]=r,f[t*4+3]=v};h(0,...fe),h(1,...ke),h(2,...Ne),h(3,...X0),h(4,k0[0],k0[1],k0[2],te),h(5,O[0],O[1],O[2],I),h(6,a0[0]*j,a0[1]*j,a0[2]*j,1/(2*j0)),h(7,G[0]*j,G[1]*j,G[2]*j,L.exp);const x=2*j0/d0;h(8,y0.k[0],y0.k[1],y0.k[2],x),h(9,y0.sc[0],y0.sc[1],y0.sc[2],L.F0),h(10,P0[0],P0[1],P0[2],L.gob),h(11,L.sun[0],L.sun[1],L.sun[2],L.cm),h(12,L.amb[0],L.amb[1],L.amb[2],L.gain),h(13,re[0],re[1],re[2],L.gl);{const t=[O[0],-O[1],O[2]];h(14,t[0]/(t[1]+.35),t[2]/(t[1]+.35),1.5,se)}const R=(I<=400,.62);h(15,R,.1,.9958,p.flt?1:2),h(16,p.flt?0:-1,.42*te,L.shs,1/d0),h(17,n[0],n[1],c,8);const Q=M.light==="dusk lantern";{const t=i()*U;h(18,.5+Math.cos(t)*.2,.5+Math.sin(t)*.2,Q?1:0,.22)}for(let t=0;t<se;t++)h(19+t,f0[t*4],f0[t*4+1],f0[t*4+2],f0[t*4+3]);const $=e.createBuffer(),W=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,$),e.bufferData(e.UNIFORM_BUFFER,f,e.STATIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,W),e.bufferData(e.UNIFORM_BUFFER,m,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,0,$),e.bindBufferBase(e.UNIFORM_BUFFER,1,W);const Z=p.tex,J=p.fbo,g0=()=>e.createBuffer(),_=(t,s)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,s)};e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.depthMask(!0),_(14,p.noise),_(12,p.atlas),_(11,p.scale),_(7,p.tile),_(8,p.ring);const X={"autumn maple":{cells:[0,1,0,2,1],leafN:o.home?10:15,size:.085,curl:.3,fall:4.5,sunk:16,sunkCell:3,sky:[1.5,1.2,1.1],envCells:[0,1,2,0],envN:900},"spring blossom":{cells:[4,5,4],leafN:46,size:.026,curl:.3,fall:.7,sunk:14,sunkCell:4,sky:[1.5,1.45,1.45],envCells:[4,5,5],envN:1500},"summer lilies":{cells:[8],leafN:4,size:.055,curl:.2,fall:16,sunk:9,sunkCell:3,sky:[1,1.2,.9],envCells:[8,8],envN:1e3},"snow melting":{cells:[3],leafN:3,size:.06,curl:.28,fall:40,sunk:12,sunkCell:3,sky:[.5,.5,.5],envCells:[],envN:0}}[M.season],H0=512,ne=Z(H0,H0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.MIRRORED_REPEAT);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR);const Qe=J(ne);e.viewport(0,0,H0,H0),e.useProgram(D.sky),e.bindVertexArray(p.vao0);const Et=t=>[t[0]/L.gain,t[1]/L.gain,t[2]/L.gain];e.uniform3fv(k.sky("uA"),Et(L.a)),e.uniform3fv(k.sky("uB"),Et(L.b)),e.uniform4f(k.sky("uP"),i(),i(),L.sa,L.sb),e.drawArrays(e.TRIANGLES,0,3);{const t=[],s=[];let a=i;const r=(b,T,q,n0,H,e0)=>{const Jt=3+Math.floor(a()*2);for(let E0=0;E0<Jt;E0++){q+=(a()-.5)*.52;const I0=b+Math.cos(q)*H,Le=T+Math.sin(q)*H,ie=n0*.92;if(t.push(b,T,I0,Le,n0,ie),b=I0,T=Le,n0=ie,e0<=2&&a()<.8)for(let We=0;We<(e0===0?3:2);We++){const ye=.02+a()*.05,Ee=a()*U;s.push(b+Math.cos(Ee)*ye,T+Math.sin(Ee)*ye,a()*U,.014+a()*.016)}}if(e0>0&&n0>.0012&&t.length<6*(a===i?900:1800)){const E0=e0>3?2:2+(a()<.4?1:0);for(let I0=0;I0<E0;I0++)r(b,T,q+(I0-(E0-1)/2)*(.5+a()*.5),n0*.7,H*.78,e0-1)}},v=o.home?2:1+Math.floor(i()*2);for(let b=0;b<v;b++){const T=(o.home?3.9:i()*U)+b*2.1,q=.5+Math.cos(T)*.68,n0=.5+Math.sin(T)*.68;r(q,n0,T+K0+(i()-.5)*.5,.013,.052,6)}const E=M.bottom==="dark liner",y=s.length;if(E){a=Y;for(let b=0;b<3;b++){const T=Y()*U,q=.5+Math.cos(T)*.42,n0=.5+Math.sin(T)*.42;r(q,n0,T+K0+(Y()-.5)*.5,.016,.05,6)}a=i}e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);const u=e.createVertexArray();e.bindVertexArray(u);const d=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferData(e.ARRAY_BUFFER,new Float32Array(t),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,24,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,24,16),e.vertexAttribDivisor(1,1),e.useProgram(D.branch);const A=M.light==="dusk lantern"?[.018,.02,.04]:[.09,.085,.09];e.uniform3fv(k.branch("uA"),A),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,t.length/6);const F=Math.min(X.envN,y/4),N=E?Math.min(X.envN*3,s.length/4):F;if(N>0&&X.envCells.length){const b=new Float32Array(N*6);for(let H=0;H<N;H++)b[H*6]=s[H*4],b[H*6+1]=s[H*4+1],b[H*6+2]=s[H*4+2],b[H*6+3]=s[H*4+3]*(X.envCells[0]>=4&&X.envCells[0]<6?.85:1),b[H*6+4]=X.envCells[H%X.envCells.length],b[H*6+5]=.75+(H<F?i():Y())*.5;const T=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,T),e.bufferData(e.ARRAY_BUFFER,b,e.STATIC_DRAW);const q=e.createVertexArray();e.bindVertexArray(q),e.bindBuffer(e.ARRAY_BUFFER,T),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,24,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,24,16),e.vertexAttribDivisor(1,1),e.bindBuffer(e.ARRAY_BUFFER,p.qb),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,p.qe),e.useProgram(D.eleaf);const n0=M.light==="dusk lantern"?[.38,.3,.3]:[X.sky[0]*1.15/L.gain*1,X.sky[1]*1.15/L.gain*1,X.sky[2]*1.15/L.gain*1];e.uniform3fv(k.eleaf("uA"),E?n0.map(H=>H*.4):n0),e.drawElementsInstanced(e.TRIANGLES,p.QN,e.UNSIGNED_SHORT,0,N),e.deleteBuffer(T),e.deleteVertexArray(q)}e.deleteBuffer(d),e.bindVertexArray(null),e.deleteVertexArray(u),e.disable(e.BLEND),_(4,ne),e.generateMipmap(e.TEXTURE_2D)}const Ft=Z(ce,ce,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.MIRRORED_REPEAT),oa=J(Ft);e.viewport(0,0,ce,ce),e.bindVertexArray(p.vao0);const Tt=M.bottom==="dark liner";e.useProgram(D.bed),e.uniform4f(k.bed("uP"),Tt?1:0,i(),i(),0),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.colorMask(!0,!0,!0,!1),e.useProgram(D.stones);const _e=(t,s,a)=>{e.uniform4f(k.stones("uP"),t,i()*50,i()*50,s),e.uniform3fv(k.stones("uQ"),a),e.drawArrays(e.TRIANGLES,0,3)};Tt?(_e(12,.09,[.72,.72,.72]),_e(6.5,.08,[.9,.9,.9])):(_e(31,.9,[.9,.9,.9]),_e(17,.84,[1,1,1]),_e(8.5,.55,[1.05,1.05,1.05]));{const t=X.sunk,s=new Float32Array(t*12);for(let v=0;v<t;v++){const E=v*12;s[E]=(i()-.5)*2.2,s[E+1]=-te,s[E+2]=(i()-.5)*2.2,s[E+3]=i()*U,s[E+4]=(.05+i()*.035)*(X.sunkCell===4?.5:1),s[E+5]=0,s[E+6]=X.sunkCell,s[E+7]=i()}const a=e.createVertexArray(),r=e.createBuffer();e.bindVertexArray(a),e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,48,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,48,16),e.vertexAttribDivisor(1,1),e.bindBuffer(e.ARRAY_BUFFER,p.qb),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,p.qe),e.useProgram(D.lsh),e.uniform1f(k.lsh("uSt"),.55),e.blendFunc(e.ZERO,e.ONE_MINUS_SRC_COLOR),e.drawElementsInstanced(e.TRIANGLES,p.QN,e.UNSIGNED_SHORT,0,t),e.uniform1f(k.lsh("uSt"),.8),e.deleteBuffer(r),e.bindVertexArray(p.vao0),e.deleteVertexArray(a)}if(M.season==="autumn maple"){const t=o.home?[[-.15,.25,0,.085,1.2],[.25,.55,10,.07,3.9],[-.75,-.05,3,.08,.4],[.15,-.8,2,.065,5.1]]:[];if(!o.home)for(let v=0,E=3+Math.floor(Y()*4);v<E;v++)t.push([(Y()-.5)*2,(Y()-.5)*2,[0,1,2,3,10][Math.floor(Y()*5)],.05+Y()*.04,Y()*U]);const s=new Float32Array(t.length*6);t.forEach((v,E)=>s.set([v[0]/(2*j0)+.5,v[1]/(2*j0)+.5,v[4],v[3]/(2*j0),v[2],.42+.3*(E*.37%1)],E*6));const a=e.createVertexArray(),r=e.createBuffer();e.bindVertexArray(a),e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,24,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,24,16),e.vertexAttribDivisor(1,1),e.bindBuffer(e.ARRAY_BUFFER,p.qb),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,p.qe),e.useProgram(D.eleaf),e.uniform3fv(k.eleaf("uA"),[.78,.64,.5]),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.drawElementsInstanced(e.TRIANGLES,p.QN,e.UNSIGNED_SHORT,0,t.length),e.deleteBuffer(r),e.bindVertexArray(p.vao0),e.deleteVertexArray(a)}e.disable(e.BLEND),e.colorMask(!1,!1,!1,!0),e.useProgram(D.depth),e.drawArrays(e.TRIANGLES,0,3),e.colorMask(!0,!0,!0,!0);const Ke=Z(_0,_0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR);const je=e.createTexture();_(15,je),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,_0,_0,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);{const t=p.fbo(je);e.viewport(0,0,_0,_0),e.useProgram(D.rkh),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(t)}const aa=J(Ke);e.useProgram(D.rk),e.uniform4f(k.rk("uP"),2*j0/_0,M.season==="snow melting"?1:0,0,0),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(je),_(6,Ke),e.generateMipmap(e.TEXTURE_2D);const Do={kohaku:{k:0,a:[.74,.71,.62],b:[.68,.085,.012],c:[.04,.035,.035],fr:[.88,.5,.36],ft:[.88,.84,.76]},kohaku2:{k:0,a:[.76,.72,.6],b:[.8,.17,.014],c:[.04,.035,.035],fr:[.86,.68,.5],ft:[.9,.85,.76]},ogon:{k:1,a:[.97,.66,.16],b:[.72,.36,.05],c:[.04,.035,.035],fr:[.86,.56,.14],ft:[.92,.72,.3]},platinum:{k:1,a:[.92,.9,.82],b:[.62,.6,.54],c:[.04,.035,.035],fr:[.82,.8,.72],ft:[.9,.88,.82]},showa:{k:2,a:[.72,.69,.6],b:[.66,.075,.012],c:[.018,.017,.02],fr:[.022,.02,.022],ft:[.65,.58,.5]},asagi:{k:3,a:[.25,.34,.45],b:[.7,.2,.05],c:[.04,.035,.035],fr:[.7,.28,.1],ft:[.56,.52,.5]}},ko=M.mix==="butterfly long-fin",Io=t=>{const s=i();return o.home?["kohaku","ogon","showa"][t%3]:M.mix==="kohaku"?s<.62?i()<.5?"kohaku":"kohaku2":s<.8?"asagi":s<.9?"platinum":"showa":M.mix==="ogon"?s<.55?"ogon":s<.85?"platinum":"kohaku2":M.mix==="showa"?s<.68?"showa":s<.85?"kohaku":"asagi":s<.3?"kohaku2":s<.55?"ogon":s<.78?"platinum":s<.9?"showa":"asagi"},Nt=I<=400?256:512,$e=(I<=400?48:96)*F0,wt=Z(Nt,$e,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR),ra=J(wt);e.useProgram(D.pat),e.bindVertexArray(p.vao0);const Co=[];for(let t=0;t<F0;t++){const s=Io(t),a=Do[s];Co.push(s),e.viewport(0,Math.round($e*t/F0),Nt,Math.round($e/F0)),e.uniform4f(k.pat("uP"),a.k,i(),i(),0),e.uniform3fv(k.pat("uA"),a.a),e.uniform3fv(k.pat("uB"),a.b),e.uniform3fv(k.pat("uC"),a.fr),e.uniform3fv(k.pat("uT2"),a.ft),e.drawArrays(e.TRIANGLES,0,3)}e.bindFramebuffer(e.FRAMEBUFFER,null);const Me=p.flt,me=Me?[e.RGBA16F,e.RGBA,e.HALF_FLOAT]:[e.RGBA8,e.RGBA,e.UNSIGNED_BYTE],Ie=[Z(d0,d0,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR),Z(d0,d0,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR)],Ze=Me?[J(Ie[0]),J(Ie[1])]:[null,null],Je=Z(Z0,Z0,me[0],me[1],me[2],e.LINEAR,e.MIRRORED_REPEAT),qo=J(Je),et=Z(J0,J0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.MIRRORED_REPEAT),Oo=J(et),tt=Z(ee,ee,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.MIRRORED_REPEAT),Vo=J(tt),_t=Z(I,I,me[0],me[1],me[2],e.LINEAR),Go=J(_t),Mt=e.createRenderbuffer();if(e.bindRenderbuffer(e.RENDERBUFFER,Mt),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,I,I),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,Mt),Me)for(const t of Ze)e.bindFramebuffer(e.FRAMEBUFFER,t),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);e.bindFramebuffer(e.FRAMEBUFFER,null);const Bt=e.createTexture();_(9,Bt),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,Pe,F0,0,e.RGBA,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const v0=new Float32Array(Pe*F0*4),ot=210,x0=new Float32Array(ot*12),Ut=g0(),Ce=e.createVertexArray();e.bindVertexArray(Ce),e.bindBuffer(e.ARRAY_BUFFER,Ut),e.bufferData(e.ARRAY_BUFFER,x0,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,48,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,48,16),e.vertexAttribDivisor(1,1),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,4,e.FLOAT,!1,48,32),e.vertexAttribDivisor(2,1),e.bindBuffer(e.ARRAY_BUFFER,p.qb),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,p.qe);const zt=96,he=new Float32Array(zt*4),Lt=g0(),Pt=e.createVertexArray();e.bindVertexArray(Pt),e.bindBuffer(e.ARRAY_BUFFER,Lt),e.bufferData(e.ARRAY_BUFFER,he,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,0,0),e.vertexAttribDivisor(0,1);const gt=240,Y0=new Float32Array(gt*6),St=g0(),Dt=e.createVertexArray();e.bindVertexArray(Dt),e.bindBuffer(e.ARRAY_BUFFER,St),e.bufferData(e.ARRAY_BUFFER,Y0,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,24,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,24,16),e.bindVertexArray(null);const kt=k.body("uAbove"),Wo=k.fin("uAbove"),Xo=k.leaf("uAlpha");e.useProgram(D.fin),e.uniform1f(Wo,0),e.useProgram(D.leaf),e.uniform1f(Xo,1);const Ho=p0===3?1.06:p0===7?.74:.52,V=[];for(let t=0;t<p0;t++){const s=Ho*(.8+i()*.32),a=i()*U,r=.15+i()*.55;V.push({i:t,L:s,x:Math.cos(a)*r,y:-.14-i()*.42,z:Math.sin(a)*r,yaw:i()*U,spd:.1,wx:0,wz:0,cy:-.14-i()*.45,tt:0,vd:.12,ph:i()*U,amp:.5,fin:.7,flap:i()*U,mouth:0,roll:0,pit:.07,nod:new Float32Array(c0*3),rise:0,riseX:0,riseZ:0,pulse:0,hunger:.5+i()*.7,wid:.92+i()*.16,wake:0,fx:0,fz:0,breakT:0,gulps:0,dive:0})}if(o.home){const t=V[0],s=V[1],a=V[2];t.L=1.06,t.x=.26,t.z=-.44,t.y=-.07,t.yaw=-.62,t.cy=-.2,t.rise=2.2,t.riseX=.3,t.riseZ=-.47,t.wid=1.04,s.L=.92,s.x=.64,s.z=.32,s.y=-.17,s.yaw=1.74,s.cy=-.17,s.wx=.56,s.wz=.8,s.tt=9,s.vd=.1,a.L=.98,a.x=-.46,a.z=.58,a.y=-.3,a.yaw=2.6,a.cy=-.3,a.wx=-.85,a.wz=.82,a.tt=9,a.vd=.1,t.wx=.5,t.wz=-.62,t.tt=9,t.vd=.08}const Yo=t=>{const s=t.L/(c0-1),a=Math.cos(t.yaw),r=Math.sin(t.yaw);for(let v=0;v<c0;v++){const E=v*s,y=Math.sin(v*.2+t.i)*.05*(v/c0)*t.L;t.nod[v*3]=t.x-a*E-r*y,t.nod[v*3+1]=Math.min(t.y,-.14*t.L)-E*.09,t.nod[v*3+2]=t.z-r*E+a*y}};for(const t of V)Yo(t);const It=ko?1:0,r0=[],qe=(t,s,a,r)=>({x:t,z:s,y:a,vy:0,vx:0,vz:0,ang:i()*U,spin:(i()-.5)*.14,size:X.size*(.72+i()*.56),curl:X.curl*(.45+i()*.85),cell:r,sd:i(),tumb:i()*U,tumb2:i()*U,soak:0,sw:i()*U}),Ct=()=>X.cells[Math.floor(i()*X.cells.length)];if(M.season==="summer lilies"){const t=4+Math.floor(i()*4);for(let s=0;s<t;s++){const a=i()*U,r=.42+i()*.7,v=n[0]+Math.cos(a)*(c-.08-i()*.42),E=n[1]+Math.sin(a)*(c-.08-i()*.42),y=qe(P(v,-.98,.98),P(E,-.98,.98),0,6);if(y.size=.085+i()*.075,y.curl=.035,y.spin=.01,y.lily=1,r0.push(y),i()<.45){const u=y.x+(i()-.5)*y.size*.5,d=y.z+(i()-.5)*y.size*.5,A=i()*U,F=(N,b,T,q,n0,H)=>{const e0=qe(u+Math.cos(N)*b,d+Math.sin(N)*b,T,H);e0.ang=N-K0/2,e0.size=q,e0.curl=n0,e0.spin=0,e0.lily=2,e0.px=y,e0.ox=e0.x-y.x,e0.oz=e0.z-y.z,r0.push(e0)};for(let N=0;N<9;N++)F(A+N/9*U,.036,.01,.038,.22,7);for(let N=0;N<8;N++)F(A+.4+N/8*U,.024,.024,.031,.34,7);for(let N=0;N<6;N++)F(A+.2+N/6*U,.012,.038,.024,.46,7);F(A,0,.046,.0125,.1,9)}}}for(let t=0;t<X.leafN;t++){const s=i()*U,a=.15+i()*.85;r0.push(qe(Math.cos(s)*a,Math.sin(s)*a,0,Ct()))}if(o.home)[[.46,-.7,0,.1,.24,.7],[.82,-.3,1,.09,.4,2.8],[-.68,-.28,0,.1,.32,4.1],[-.62,.34,2,.08,.44,5.6],[-.28,.86,1,.095,.26,2.1],[.8,.72,0,.085,.34,3.3],[-.86,.72,2,.075,.36,.3],[.46,.5,1,.08,.42,1.2],[-.32,-.82,1,.085,.3,4.9],[-.5,-.62,0,.07,.5,3.9]].forEach((a,r)=>{const v=r0[r];v.x=a[0],v.z=a[1],v.cell=a[2],v.size=a[3],v.curl=a[4],v.ang=a[5]}),[[.76,-.44,0,.1,.32,.9],[.69,-.35,10,.072,.42,2.6],[.78,-.3,3,.055,.75,4.4],[-.58,-.6,1,.09,.3,4.1],[-.66,.3,11,.066,.4,5.6],[.12,.84,2,.112,.34,2.1]].forEach((a,r)=>{const v=r0[r];v.x=a[0],v.z=a[1],v.cell=a[2],v.size=a[3],v.curl=a[4],v.ang=a[5]}),r0.length=6;else if(M.season==="autumn maple"){for(let v=r0.length-1;v>=0;v--)Y()<.45&&r0.splice(v,1);const t=Math.atan2(-n[1],-n[0])+(Y()-.5)*1.3,s=P(n[0]+Math.cos(t)*(c-.09),-.85,.85),a=P(n[1]+Math.sin(t)*(c-.09),-.85,.85),r=Math.min(r0.length-2,3+Math.floor(Y()*3));for(let v=0;v<r;v++){const E=r0[v],y=Y()*U,u=.03+Y()*.09;E.x=s+Math.cos(y)*u,E.z=a+Math.sin(y)*u}for(const v of r0)v.size*=.78+.5*Y(),v.cell=[0,0,1,1,2,10,11,3][Math.floor(Y()*8)]}const G0=[],de=[],sa=[],qt=M.season==="snow melting",K=qt?new Float32Array(100*5):null;if(K)for(let t=0;t<100;t++){const s=t*5;K[s]=(i()-.5)*2.4,K[s+1]=i()*1.3,K[s+2]=(i()-.5)*2.4,K[s+3]=i()*U,K[s+4]=.0035+i()*.0055}let s0=0,Oe=0,xe=0,m0=Te,Ot=2+i()*X.fall,Vt=o.home?2.5:1.8+i()*2,Gt=.8,Wt=.3,Be=0,at=!1,rt=0,st=0,nt=0,Ue=0,pe=0,be=0,Ae=!1,Re=!1,it=0,ct=0,Ve=0,Ge=0,lt=0;const Q0={n:0},h0=(t,s,a,r)=>{if(Q0.n<zt){const v=Q0.n*4;he[v]=t,he[v+1]=s,he[v+2]=a,he[v+3]=r,Q0.n++}},b0=o.sound,Qo=(t,s,a)=>{b0.note(a,{dur:.12,vel:t,wave:"sine",cutoff:1300,attack:.004,pan:s}),b0.note(a+7,{dur:.09,vel:t*.6,wave:"sine",cutoff:1800,attack:.01,at:.03,pan:s}),b0.hit("noise",t*.35,{cutoff:1800,dur:.1,pan:s})},Ko=(t,s,a,r)=>{for(let v=0;v<a&&de.length<90;v++){const E=i()*U,y=r*(.3+i());de.push({x:t,y:.01,z:s,vx:Math.cos(E)*y,vy:.55+i()*.75,vz:Math.sin(E)*y,r:.0036+i()*.0048,life:1})}},jo=(t,s)=>{const a=10+Math.floor(i()*7);for(let r=0;r<a&&G0.length<60;r++){const v=i()*U,E=Math.pow(i(),.6)*.12,y={x:t+Math.cos(v)*E,z:s+Math.sin(v)*E,vx:Math.cos(v)*.035,vz:Math.sin(v)*.035,sd:i()*U,r:.0048+i()*.0018,on:0,life:9+i()*8};G0.push(y),h0(y.x,y.z,.016,-.009)}Qo(.4,P(t,-1,1),66);for(const r of V)r.hunger=Math.max(r.hunger,.6+i()*.4)},Xt=t=>{const s=s0;for(let a=0;a<V.length;a++){const r=V[a];if(r.tt-=t,r.tt<=0||Math.hypot(r.wx-r.x,r.wz-r.z)<.14){const w=i()*U,B=.1+i()*.72;r.wx=Math.cos(w)*B,r.wz=Math.sin(w)*B,r.tt=6+i()*9,r.vd=.1+i()*.1,r.cy=-.1-r.L*.13-i()*.36*(p0===3?.6:1)}let v=r.wx-r.x,E=r.wz-r.z,y=Math.hypot(v,E)+1e-4,u=v/y*.8,d=E/y*.8,A=r.vd,F=r.cy,N=0,b=0,T=null,q=9;if(G0.length&&m0<.3)for(const w of G0){if(w.on>w.life)continue;const B=Math.hypot(w.x-r.x,w.z-r.z);B<q&&(q=B,T=w)}if(T){b=P(1.2-q*.7,.2,1)*r.hunger;const w=T.x-r.x,B=T.z-r.z,g=q+1e-4;u=u*(1-b)+w/g*2.6*b,d=d*(1-b)+B/g*2.6*b,A=q<.26?.07+q*.9:.15+(.28+.36*b)*(1+P(q,0,.8)),F=-.02-P(q-.12,0,1)*.3,q<.34&&(N=1,F=.02),q<.07+r.L*.03&&r.y>-.07&&(T.dead=1,r.hunger*=.92,r.gulps++,h0(T.x,T.z,.032,-.024),h0(r.x,r.z,.05,.012),Ko(T.x,T.z,3+Math.floor(i()*5),.18),Be<=0&&(b0.note(52+i()*6,{dur:.1,vel:.5,wave:"sine",cutoff:800,attack:.002,pan:P(r.x,-1,1)}),b0.hit("noise",.2,{cutoff:1100,dur:.09,pan:P(r.x,-1,1)}),Be=.07))}if(r.rise>0){r.rise-=t;const w=r.riseX-r.x,B=r.riseZ-r.z,g=Math.hypot(w,B)+1e-4;u=u*.2+w/g,d=d*.2+B/g,A=g>.05?.09:.01,F=.018,N=g<.2?.55+.45*Math.sin(s*9):0}let n0=0;if(Re){const w=r.x-Ve,B=r.z-Ge,g=Math.hypot(w,B)+1e-4;if(g<.62){const t0=1-g/.62;n0=t0,u+=w/g*t0*4.5,d+=B/g*t0*4.5,A=Math.max(A,.2+t0*.9),F-=t0*.4,N=0}}F-=m0*.62,m0>.3&&!T&&(A=Math.min(A,.13));for(let w=0;w<V.length;w++)if(w!==a){const B=V[w],g=r.x-B.x,t0=r.z-B.z,A0=Math.hypot(g,t0)+1e-4,C0=(r.L+B.L)*(T?.13:.52);if(A0<C0&&Math.abs(r.y-B.y)<.4){const q0=(1-A0/C0)*(T?1.1:1.3);u+=g/A0*q0,d+=t0/A0*q0,T&&(r.yaw+=(i()-.5)*.02)}else!T&&A0<.9&&(u+=Math.cos(B.yaw)*.06,d+=Math.sin(B.yaw)*.06)}const H=l(r.x,r.z);if(H<.34){const w=n[0]-r.x,B=n[1]-r.z,g=Math.hypot(w,B)+1e-4,t0=(.34-H)*9;u+=w/g*t0,d+=B/g*t0}const e0=o.home&&s0<7?1.02:1-.24*r.L;Math.abs(r.x)>e0&&(u-=Math.sign(r.x)*(Math.abs(r.x)-e0)*7),Math.abs(r.z)>e0&&(d-=Math.sign(r.z)*(Math.abs(r.z)-e0)*7);let E0=Math.atan2(d,u)-r.yaw;for(;E0>K0;)E0-=U;for(;E0<-K0;)E0+=U;const I0=T&&q<.55&&Math.abs(E0)>.75?1:0;I0&&(A=Math.min(A,.04));const Le=Math.min(.28+r.spd/(.42*r.L)+b*.7+n0*1.2+I0*1.1,2.4),ie=P(E0*1.5,-Le,Le);r.yaw+=ie*t;const We=A>r.spd?1+3*(b+n0):.5+I0*2.5;r.spd+=(A-r.spd)*Math.min(We*t,1);const ye=Math.cos(r.yaw),Ee=Math.sin(r.yaw);r.x+=ye*r.spd*t,r.z+=Ee*r.spd*t;const Jo=P(F,-te+.14,N>.1?.006:-.012-r.L*.075);r.y+=P(Jo-r.y,-.26-b,.26+b*.5)*Math.min((.8+b*1.2+n0*2)*t,1)*(r.rise>0?1.8:1);const eo=P((A-r.spd)*3+r.spd*2.2,0,2.3),ea=.5+.5*Math.sin(s*(.33+a%5*.07)+a*1.7),ta=P(.42+eo*.4+Math.abs(ie)*.45-ea*.2,.2,1.05);r.amp+=(ta-r.amp)*Math.min(t*2.2,1),r.ph+=t*(1.9+eo*7.2+Math.abs(ie)*2.2),r.fin+=(P(1.1-r.spd*2.2,0,1)-r.fin)*Math.min(t*2.2,1),r.flap+=t*(1.3+r.fin*1.8),r.mouth+=(N-r.mouth)*Math.min(t*9,1),r.pit+=((N>.1?.3:.07)-r.pit)*Math.min(t*2,1),r.roll+=(-ie*.34-r.roll)*Math.min(t*3,1);const C=r.nod,Fe=r.L/(c0-1);C[0]=r.x,C[1]=r.y,C[2]=r.z;for(let w=1;w<c0;w++){const B=(w-1)*3,g=w*3;let t0=C[g]-C[B],A0=C[g+1]-C[B+1],C0=C[g+2]-C[B+2],q0=Math.hypot(t0,A0,C0)+1e-5;if(t0/=q0,A0/=q0,C0/=q0,w>1){const vt=(w-2)*3,mt=w<6?.55:w<11?.36:.16;t0+=((C[B]-C[vt])/Fe-t0)*mt,A0+=((C[B+1]-C[vt+1])/Fe-A0)*mt,C0+=((C[B+2]-C[vt+2])/Fe-C0)*mt,q0=Math.hypot(t0,A0,C0)+1e-5,t0/=q0,A0/=q0,C0/=q0}C[g]=C[B]+t0*Fe,C[g+1]=Math.min(C[B+1]+A0*Fe,-.018),C[g+2]=C[B+2]+C0*Fe,C[g+1]+=(Math.min(r.y,-.02)-r.pit*r.L*w/c0-C[g+1])*Math.min(t*1.1,1),w>1&&(C[g+1]=Math.min(C[g+1],-.012-r.L*.122*(w<6?.55+w*.09:1.05-(w-6)*.07)+b*.05))}const ut=P(1+r.y/.26,0,1);if(ut>.05){const w=r.spd;if(r.wake-=t,w>.05&&r.wake<=0){r.wake=.05;const B=P(w*.06,0,.022)*ut*ut;h0(r.x+ye*.035,r.z+Ee*.035,.038+r.L*.018,B*.5);const g=5*3;h0(C[g],C[g+2],.05+r.L*.03,-B*.35);const t0=13*3;h0(C[t0],C[t0+2],.03,Math.sin(r.ph*1)*B*.4)}}if(r.mouth>.3&&r.y>-.022&&(r.pulse-=t,r.pulse<=0)){r.pulse=.18+i()*.08;const w=r.x+ye*r.L*.012,B=r.z+Ee*r.L*.012;h0(w,B,.03+r.L*.012,r.rise>0?-.0135:-.0095),Be<=0&&(b0.note(60+i()*4,{dur:.07,vel:.14,wave:"sine",cutoff:900,attack:.002,pan:P(r.x,-1,1)}),Be=.08)}}},$o=t=>{for(let s=G0.length-1;s>=0;s--){const a=G0[s];if(a.on+=t,a.dead||a.on>a.life+2.5){G0.splice(s,1);continue}a.vx*=1-t*1.4,a.vz*=1-t*1.4,a.x+=a.vx*t,a.z+=a.vz*t;for(const r of V){const v=a.x-r.x,E=a.z-r.z,y=Math.hypot(v,E)+1e-4;y<.1&&r.y>-.18&&(a.vx+=v/y*t*.75,a.vz+=E/y*t*.75)}if(Re){const r=a.x-Ve,v=a.z-Ge;Math.hypot(r,v)+1e-4<.12&&(a.vx+=it*t*4,a.vz+=ct*t*4)}}for(let s=r0.length-1;s>=0;s--){const a=r0[s];if(a.y>5e-4&&!a.lily)a.sw+=t*2.1,a.tumb+=t*1.9,a.tumb2+=t*1.3,a.x+=Math.sin(a.sw)*t*.09,a.z+=Math.cos(a.sw*.7)*t*.05,a.y-=t*(.22+.1*Math.sin(a.sw*2)),a.ang+=t*.5,a.y<=5e-4&&(a.y=0,h0(a.x,a.z,.02,-.0065),i()<.7&&b0.hit("noise",.05,{cutoff:2400,dur:.05,pan:P(a.x,-1,1)}));else{if(a.tumb*=1-Math.min(t*8,1),a.tumb2*=1-Math.min(t*8,1),a.lily===2){a.x=a.px.x+a.ox,a.z=a.px.z+a.oz;continue}const r=a.lily?2.5:1;a.vx*=1-Math.min(t*.7*r,1),a.vz*=1-Math.min(t*.7*r,1);const v=Math.sin(s0*.06+1.4)*.006,E=Math.cos(s0*.05)*.005;a.x+=(a.vx+v*(a.lily?.3:1))*t,a.z+=(a.vz+E*(a.lily?.3:1))*t,a.ang+=(a.spin+(a.vx-a.vz)*2)*t;for(const u of V)if(u.y>-.22){const d=a.x-u.x,A=a.z-u.z,F=Math.hypot(d,A)+1e-4;if(F<.16){const N=(1-F/.16)*(1+u.y*4)*u.spd;a.vx+=(d/F*.7+Math.cos(u.yaw)*.5)*N*t*6,a.vz+=(A/F*.7+Math.sin(u.yaw)*.5)*N*t*6}}if(Re){const u=a.x-Ve,d=a.z-Ge;Math.hypot(u,d)+1e-4<.14&&(a.vx+=it*t*5,a.vz+=ct*t*5)}const y=l(a.x,a.z);if(y<.1){const u=n[0]-a.x,d=n[1]-a.z,A=Math.hypot(u,d)+1e-4;a.vx+=u/A*(.1-y)*t*8,a.vz+=d/A*(.1-y)*t*8}if(Math.abs(a.x)>1.25||Math.abs(a.z)>1.25){if(r0.length>8){r0.splice(s,1);continue}a.x=P(a.x,-1.2,1.2),a.z=P(a.z,-1.2,1.2)}}}for(let s=de.length-1;s>=0;s--){const a=de[s];a.vy-=3.8*t,a.x+=a.vx*t,a.y+=a.vy*t,a.z+=a.vz*t,a.y<0&&(h0(a.x,a.z,.008+a.r,-.0045),de.splice(s,1))}if(K)for(let s=0;s<100;s++){const a=s*5;K[a+3]+=t*1.3,K[a]+=Math.sin(K[a+3])*t*.04,K[a+2]+=Math.cos(K[a+3]*.8)*t*.03,K[a+1]-=t*.24,K[a+1]<0&&(h0(K[a],K[a+2],.011,-.0022),K[a]=(i()-.5)*2.4,K[a+1]=1.1+i()*.3,K[a+2]=(i()-.5)*2.4)}},Ht=t=>{s0+=t,Be-=t;const s=o.input;Re=!1;let a=null;if(s.inside&&s.down){if(!at){rt=s0,st=s.x,nt=s.y,Ue=0,Ae=!1;const F=ue(s.x,s.y);pe=F[0],be=F[1]}Ue=Math.max(Ue,Math.hypot(s.x-st,s.y-nt));const u=ue(s.x,s.y),d=(u[0]-pe)/Math.max(t,.001),A=(u[1]-be)/Math.max(t,.001);if(Ue>=.03){Re=!0,Ve=u[0],Ge=u[1],it=d,ct=A;const F=Math.hypot(u[0]-pe,u[1]-be),N=Math.min(4,1+Math.floor(F/.04)),b=P(Math.hypot(d,A),0,3);for(let T=1;T<=N;T++){const q=T/N;h0(pe+(u[0]-pe)*q,be+(u[1]-be)*q,.03,-.012*P(.5+b*.5,0,1.6)/Math.sqrt(N))}b>.3&&i()<t*7&&b0.hit("noise",.05+b*.04,{cutoff:1300+b*400,dur:.13,pan:P(u[0],-1,1)})}else s0-rt>.33&&(Ae=!0);pe=u[0],be=u[1]}else at&&!Ae&&Ue<.03&&s0-rt<.33&&(a=ue(st,nt)),Ae=!1;if(s.taps(),at=s.inside&&s.down,a&&jo(a[0],a[1]),m0+=((Ae?1:Te)-m0)*Math.min(t*(Ae?1.5:.6),1),m0<.002&&(m0=0),m0>.05){const u=Math.floor(m0*3+i());for(let d=0;d<u;d++)h0((i()-.5)*2.2,(i()-.5)*2.2,.014+i()*.009,-.0032);lt-=t,lt<=0&&(lt=.28,b0.hit("noise",.11*m0+.03,{cutoff:4600,dur:.56,pan:i()-.5}),b0.hit("hat",.018*m0,{pan:i()-.5}))}if(s0>Ot&&(Ot=s0+X.fall*(.6+i()*.8),r0.length<ot-8&&X.leafN>0&&!qt)){const u=qe((i()-.5)*1.9,(i()-.5)*1.9,.9+i()*.5,Ct());M.season==="autumn maple"&&(u.cell=[0,1,2,10,11][Math.floor(Y()*5)]),r0.push(u)}if(s0>Vt){Vt=s0+3.5+i()*6;const u=V[o.home&&s0<6?0:Math.floor(i()*V.length)];if(o.home&&s0<6)u.rise=3.2,u.riseX=u.x+Math.cos(u.yaw)*.05,u.riseZ=u.z+Math.sin(u.yaw)*.05;else if(m0<.3&&!G0.length&&!Re){const d=u.yaw+(i()-.5)*.6,A=.08+i()*.12,F=u.x+Math.cos(d)*A,N=u.z+Math.sin(d)*A;l(F,N)>.3&&Math.abs(F)<.86&&Math.abs(N)<.86&&(u.rise=2.6+i()*1.6,u.riseX=F,u.riseZ=N)}}s0>Gt&&(Gt=s0+1.8+i()*2.8,b0.note(75+Math.floor(i()*5),{dur:.11,vel:.07,wave:"sine",cutoff:2200,attack:.005,pan:.6}),b0.hit("noise",.018,{cutoff:2100,dur:.55,pan:.6})),s0>Wt&&(Wt=s0+.5+i()*.2,b0.hit("noise",.012,{cutoff:3100,dur:.5,pan:.55})),Xt(t),$o(t);for(let u=0;u<V.length;u++){const d=V[u],A=u*Pe*4;for(let b=0;b<c0;b++)v0[A+b*4]=d.nod[b*3],v0[A+b*4+1]=d.nod[b*3+1],v0[A+b*4+2]=d.nod[b*3+2];const F=A+c0*4;v0[F]=d.L,v0[F+1]=d.wid,v0[F+2]=d.mouth,v0[F+3]=d.roll;let N=0;for(let b=0;b<c0;b+=3)d.nod[b*3+1]>-.06&&(N=1);v0[F+4]=d.ph,v0[F+5]=d.amp,v0[F+6]=d.fin,v0[F+7]=N,v0[F+8]=It?1.42:1,v0[F+9]=It?1.75:1,v0[F+10]=d.flap,v0[F+11]=0}let r=0;for(let u=0;u<r0.length&&r<ot;u++){const d=r0[u],A=r*12;x0[A]=d.x,x0[A+1]=d.y,x0[A+2]=d.z,x0[A+3]=d.ang,x0[A+4]=d.size,x0[A+5]=d.curl*(1-m0*.2),x0[A+6]=d.cell,x0[A+7]=d.sd;const F=d.y>5e-4&&!d.lily;x0[A+8]=F?Math.sin(d.tumb)*.9:0,x0[A+9]=F?Math.sin(d.tumb2)*.9:0,x0[A+10]=0,x0[A+11]=0,r++}W0=r;let v=0;const E=(u,d,A,F,N,b)=>{if(v<gt){const T=v*6;Y0[T]=u,Y0[T+1]=d,Y0[T+2]=A,Y0[T+3]=F,Y0[T+4]=N,Y0[T+5]=b,v++}};for(const u of G0){const d=P((u.on-u.life)/2.5,0,1);E(u.x,.006-d*.05,u.z,u.r*1.25,0,1-d)}for(const u of de)E(u.x,u.y,u.z,u.r,1,1);if(K)for(let u=0;u<100;u++){const d=u*5,A=K[d+1];E(K[d],A,K[d+2],K[d+4]*(1+A*.3),2,.92/(1+A*.4))}ze=v;const y=s0;m[0]=y,m[1]=m0,m[2]=Math.sin(y*.11)*.006+Math.sin(y*.37)*.002,m[3]=Math.cos(y*.09)*.006,m[4]=y*.012,m[5]=y*.009,m[6]=-y*.015,m[7]=y*.021,m[8]=y*.0031,m[9]=y*.0023,m[10]=De+m0*.5,m[11]=0,m[12]=0,m[13]=I<=400?0:4,m[14]=m0>0?I<=400?1:3:0,m[15]=.2};let W0=0,ze=0;const Yt=()=>{e.bindBuffer(e.UNIFORM_BUFFER,W),e.bufferSubData(e.UNIFORM_BUFFER,0,m),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,0,$),e.bindBufferBase(e.UNIFORM_BUFFER,1,W),_(9,Bt),e.texSubImage2D(e.TEXTURE_2D,0,0,0,Pe,F0,e.RGBA,e.FLOAT,v0),_(14,p.noise),_(12,p.atlas),_(11,p.scale),_(7,p.tile),_(8,p.ring),_(4,ne),_(5,Ft),_(6,Ke),_(10,wt),_(0,Je),_(1,et),_(2,tt),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!0)},ft=t=>{if(Me){e.viewport(0,0,d0,d0),Q0.n&&(e.bindFramebuffer(e.FRAMEBUFFER,Ze[xe]),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.colorMask(!0,!0,!1,!1),e.useProgram(D.splat),e.bindVertexArray(Pt),e.bindBuffer(e.ARRAY_BUFFER,Lt),e.bufferData(e.ARRAY_BUFFER,he.subarray(0,Q0.n*4),e.DYNAMIC_DRAW),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Q0.n),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),Q0.n=0),e.useProgram(D.sim),e.bindVertexArray(p.vao0);for(let s=0;s<t;s++)_(13,Ie[xe]),e.bindFramebuffer(e.FRAMEBUFFER,Ze[1-xe]),e.drawArrays(e.TRIANGLES,0,3),xe=1-xe}},Qt=()=>{_(13,Ie[xe]),_(0,null),e.bindFramebuffer(e.FRAMEBUFFER,qo),e.viewport(0,0,Z0,Z0),e.useProgram(D.surf),e.bindVertexArray(p.vao0),e.drawArrays(e.TRIANGLES,0,3),Me&&W0&&(e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(D.dim),e.bindVertexArray(Ce),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,W0),e.disable(e.BLEND)),_(0,Je),_(1,null),e.bindFramebuffer(e.FRAMEBUFFER,Oo),e.viewport(0,0,J0,J0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(D.cau),e.bindVertexArray(p.vaoCau),e.drawElements(e.TRIANGLES,p.nC,e.UNSIGNED_SHORT,0),_(1,et),e.disable(e.BLEND)},Kt=()=>{_(2,null),e.bindFramebuffer(e.FRAMEBUFFER,Vo),e.viewport(0,0,ee,ee),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(D.fsh),e.bindVertexArray(p.vaoFish),e.drawElementsInstanced(e.TRIANGLES,p.nB,e.UNSIGNED_SHORT,0,V.length),W0&&(e.useProgram(D.lsh),e.bindVertexArray(Ce),e.drawElementsInstanced(e.TRIANGLES,p.QN,e.UNSIGNED_SHORT,0,W0)),e.disable(e.BLEND),_(2,tt)},jt=()=>{_(3,null),e.bindFramebuffer(e.FRAMEBUFFER,Go),e.viewport(0,0,I,I),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.useProgram(D.bot),e.bindVertexArray(p.vao0),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.useProgram(D.body),e.uniform1f(kt,0),e.bindVertexArray(p.vaoFish),e.drawElementsInstanced(e.TRIANGLES,p.nB,e.UNSIGNED_SHORT,0,V.length),e.depthMask(!1),e.colorMask(!0,!0,!0,!1),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(D.fin),e.drawElementsInstanced(e.TRIANGLES,p.nF,e.UNSIGNED_SHORT,p.nB*2,V.length),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.depthMask(!0),e.colorMask(!0,!0,!0,!0),_(3,_t)},$t=()=>{e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,I,I),e.useProgram(D.comp),e.bindVertexArray(p.vao0),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.SCISSOR_TEST),e.scissor(0,0,I,I),e.colorMask(!0,!0,!0,!1),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.useProgram(D.body),e.uniform1f(kt,1),e.bindVertexArray(p.vaoFish),e.drawElementsInstanced(e.TRIANGLES,p.nB,e.UNSIGNED_SHORT,0,V.length),e.disable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),W0&&(e.useProgram(D.leaf),e.bindVertexArray(Ce),e.drawElementsInstanced(e.TRIANGLES,p.QN,e.UNSIGNED_SHORT,0,W0)),ze&&(e.useProgram(D.pt),e.bindVertexArray(Dt),e.drawArrays(e.POINTS,0,ze)),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(null),e.bindBufferBase(e.UNIFORM_BUFFER,0,null),e.bindBufferBase(e.UNIFORM_BUFFER,1,null)},Zt=()=>{W0&&(e.bindBuffer(e.ARRAY_BUFFER,Ut),e.bufferData(e.ARRAY_BUFFER,x0.subarray(0,W0*12),e.DYNAMIC_DRAW)),ze&&(e.bindBuffer(e.ARRAY_BUFFER,St),e.bufferData(e.ARRAY_BUFFER,Y0.subarray(0,ze*6),e.DYNAMIC_DRAW))},Zo=(t,s)=>{const a=Math.min(s,.1),r=a>.05?2:1;for(let y=0;y<r;y++)Ht(a/r);Yt(),Zt(),Oe+=a;const v=I<=400?1/30:1/60;let E=0;for(;Oe>=v&&E<3;)Oe-=v,E++;E>=3&&(Oe=0),ft(E),Qt(),Kt(),jt(),$t()};if(!o.home){for(const t of V)t.tt=0;for(let t=0;t<300||t<1200&&Math.hypot(V.reduce((s,a)=>s+a.x,0),V.reduce((s,a)=>s+a.z,0))>.3*V.length;t++)Xt(.05);Q0.n=0}if(Ht(1/30),o.home){const t=V[0];h0(t.x+.02,t.z-.02,.03,-.022)}else{const t=V[0];h0(t.x,t.z,.03,-.015)}Yt(),Zt(),ft(I<=400?10:22);for(let t=0;t<3;t++)h0((i()-.5)*1.6,(i()-.5)*1.6,.024,-.012);return ft(I<=400?6:12),Qt(),Kt(),jt(),$t(),e.bindFramebuffer(e.FRAMEBUFFER,null),Zo}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
