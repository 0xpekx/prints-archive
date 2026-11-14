// Koi Pond: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/183.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ft){Ft&&function(){"use strict";const Tt=new WeakMap,oe=Math.PI,M=2*oe,z=(t,e,D)=>t<e?e:t>D?D:t,N0=12,i0=16,Ie=i0+3,ae=1.3,B=`#version 300 es
// w183 s9e42a
precision highp float;
precision highp int;
precision highp sampler2D;
`,e0=`layout(std140) uniform S { vec4 s[32]; };
layout(std140) uniform D { vec4 d[6]; };
`,w0=B+`out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,Nt=B+e0+`out vec3 vRay; out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; vec2 n = p * 2.0 - 1.0;
  vRay = s[5].xyz + s[6].xyz * n.x + s[7].xyz * n.y; gl_Position = vec4(n, 0.0, 1.0); }`,Ce=`
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
`,je=`vec4 CLIP(vec3 W) { vec4 q = vec4(W, 1.0); return vec4(dot(s[0], q), dot(s[1], q), dot(s[2], q), dot(s[3], q)); }
`,io=B+e0+`in vec2 vUv; out vec4 o; uniform sampler2D uSim; uniform sampler2D uRock;
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
}`,co=B+e0+`layout(location=0) in vec4 iA; out vec2 vQ; out float vA; out float vB;
void main() { vec2 q = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0; vQ = q * 2.2; vA = iA.w; vB = iA.w * d[3].w;
  vec2 P = iA.xy + q * 2.2 * iA.z; gl_Position = vec4(P * s[6].w * 2.0, 0.0, 1.0); }`,lo=B+`in vec2 vQ; in float vA; in float vB; out vec4 o;
void main() { float r = dot(vQ, vQ), g = (1.0 - r * 0.55) * exp(-r); o = vec4(vA * g, vB * g, 0.0, 0.0); }`,fo=B+e0+`in vec2 vUv; out vec4 o; uniform sampler2D uSim; uniform sampler2D uN;
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
}`,uo=B+e0+`layout(location=0) in vec4 iA; layout(location=1) in vec4 iB; out vec2 vL; out vec3 vD; flat out vec2 vC;
void main() { vec2 q = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  float r = iB.x, cs = cos(iA.w), sn = sin(iA.w), cell = iB.z;
  vL = q * 1.3; vD = vec3(cs, sn, r); vC = vec2(mod(cell, 4.0), floor(cell / 4.0)); vec2 l = q * 1.3 * r; vec2 P = iA.xz + vec2(cs * l.x - sn * l.y, sn * l.x + cs * l.y);
  gl_Position = iA.y > 0.008 ? vec4(2.0, 2.0, 2.0, 1.0) : vec4(P * s[6].w * 2.0, 0.0, 1.0); }`,vo=B+e0+`in vec2 vL; in vec3 vD; flat in vec2 vC; out vec4 o; uniform sampler2D uAtlas;
float A(vec2 l) { vec2 c = clamp(l, vec2(-0.98), vec2(0.98)); return textureLod(uAtlas, (vC + c * 0.5 + 0.5) * 0.25, 2.6).a * step(max(abs(l.x), abs(l.y)), 1.0); }
void main() { float e = 0.03, a = A(vL), ax = A(vL + vec2(e, 0.0)), ay = A(vL + vec2(0.0, e));
  vec2 gr = vec2(ax - a, ay - a) / (e * vD.z), w = vec2(vD.x * gr.x - vD.y * gr.y, vD.y * gr.x + vD.x * gr.y);
  float gm = length(w), sd = gm > 1e-3 ? dot(w / gm, normalize(s[10].xz + vec2(1e-4))) : 0.0;
  o = vec4(-w * 0.0013, 0.0, a * 0.08 + min(gm * 0.0045, 0.3) * sd); }`,mo=B+e0+`layout(location=0) in vec2 aG; uniform sampler2D uSurf; out vec2 vOld; out vec2 vNew;
void main() { vec2 g = textureLod(uSurf, aG, 0.0).xy * s[15].w + s[16].x, P = (aG - 0.5) / s[6].w, Q = P + g * s[16].y;
  vOld = P; vNew = Q; gl_Position = vec4(Q * s[6].w * 2.0, 0.0, 1.0); }`,ho=B+`in vec2 vOld; in vec2 vNew; out vec4 o;
void main() { vec2 a = dFdx(vOld), b = dFdy(vOld), c = dFdx(vNew), e = dFdy(vNew);
  float A = abs(a.x * b.y - a.y * b.x), B = abs(c.x * e.y - c.y * e.x);
  o = vec4(vec3(min(A / max(B, 1e-9), 6.0) * 0.22), 1.0); }`,wt=e0+je+`layout(location=0) in vec4 aP; layout(location=1) in vec3 aN; layout(location=2) in vec2 aUV;
uniform sampler2D uF;
out vec3 vW; out vec3 vNr; out vec3 vT; out vec2 vUV; out vec2 vLc; flat out vec4 vI;
uniform float uAbove;
void main() {
  int f = gl_InstanceID;
  vec4 i0 = texelFetch(uF, ivec2(${i0}, f), 0), i1 = texelFetch(uF, ivec2(${i0+1}, f), 0), i2 = texelFetch(uF, ivec2(${i0+2}, f), 0);
  float L = i0.x, kind = aP.w, u = aP.x;
  float x = clamp(u, 0.0, 1.0) * ${(i0-1).toFixed(1)}, fl = min(floor(x), ${(i0-2).toFixed(1)}), a = x - fl; int i = int(fl);
  vec3 p0 = texelFetch(uF, ivec2(max(i - 1, 0), f), 0).xyz, p1 = texelFetch(uF, ivec2(i, f), 0).xyz;
  vec3 p2 = texelFetch(uF, ivec2(i + 1, f), 0).xyz, p3 = texelFetch(uF, ivec2(min(i + 2, ${i0-1}), f), 0).xyz;
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
`,_t=B+wt+`
  vec3 Q = vec3(W.x, W.y < 0.0 ? W.y * 0.75 : W.y, W.z);
  gl_Position = (uAbove > 0.5 && i1.w < 0.5) ? vec4(2.0, 2.0, 2.0, 1.0) : CLIP(Q);
}`,xo=B+wt+`
  vec2 xz = W.xz - s[10].xz / s[10].y * 1.25 * (s[4].w + W.y); // set off down-sun, clear of the fish
  gl_Position = vec4(xz * s[6].w * 2.0, 0.0, 1.0);
}`,po=B+e0+`in vec3 vW; in vec3 vNr; flat in vec4 vI; out vec4 o;
void main() { float kk = smoothstep(0.1, 0.65, abs(normalize(vNr).y)), dp = clamp(-vW.y / s[4].w, 0.0, 1.0);
  o = vec4(vec3(kk * mix(0.55 + 0.45 * dp, 1.0, s[11].w) * (vI.w > 0.5 ? 0.4 : 1.0)), 1.0); }`,Mt=e0+Ce+`in vec3 vW; in vec3 vNr; in vec3 vT; in vec2 vUV; in vec2 vLc; flat in vec4 vI;
uniform sampler2D uPat; uniform sampler2D uScale; uniform sampler2D uCau; uniform sampler2D uEnv; uniform float uAbove;
out vec4 o;
`,Bt=`
float GOB(vec2 P) { return 1.0 - s[10].w * smoothstep(0.12, 0.55, textureLod(uEnv, P * 0.3 + 0.5 + d[0].zw, 3.0).a); }
vec3 UNDER(vec3 c) { float dist = max(-vW.y, 0.0) * 1.3; vec3 tr = exp(-s[8].rgb * dist); return c * tr + s[9].rgb * (1.0 - tr); }
`,bo=B+Mt+Bt+`
void main() {
  vec3 N = normalize(vNr), T = normalize(vT), B = normalize(cross(N, T));
  float u = vUV.x, v = vUV.y, L = vI.y;
  float latA = abs(vLc.x), gill = u - (0.178 + 5.5 * latA * latA);
  float sm = smoothstep(0.0, 0.018, gill) * (1.0 - smoothstep(0.93, 1.0, u));
  vec4 sc = texture(uScale, vec2(u * 38.0, v * 42.0) * 0.25);
  vec2 off = sc.xy * 2.0 - 1.0;
  vec2 puv = vec2(u, v) - off * vec2(1.0 / 38.0, 1.0 / 42.0) * sm;
  vec4 pat = texture(uPat, vec2(clamp(puv.x, 0.004, 0.98), (vI.x + clamp(puv.y, 0.01, 0.99)) / ${N0}.0));
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
}`,Ao=B+Mt+Bt+`
void main() {
  float sv = vUV.x, tv = vUV.y, kind = vI.w;
  if (kind > 3.5) {
    vec3 c = vec3(0.62, 0.44, 0.34) * (s[12].rgb + s[11].rgb * 0.6);
    o = vec4(sqrt(UNDER(c)), 0.9 * (1.0 - sv * 0.2));
    return;
  }
  vec3 tint = texture(uPat, vec2(0.992, (vI.x + 0.5) / ${N0}.0)).rgb;
  vec3 root = texture(uPat, vec2(0.992, (vI.x + 0.1) / ${N0}.0)).rgb;
  float rn = kind < 1.5 ? 11.0 : kind < 2.5 ? 20.0 : 15.0;
  float ang = kind < 2.5 ? tv : tv * 0.5 + 0.5;
  // bony rays that fork halfway out, a clear membrane between them, an edge scalloped from ray to ray
  float rp = ang * rn * TAU_C + sin(sv * 6.0) * 0.4;
  float fw = fwidth(rp) + 1e-4;
  float ray = mix(mix(smoothstep(0.5, 0.96, 0.5 + 0.5 * cos(rp)), 0.24, smoothstep(1.2, 2.6, fw)),
                  mix(smoothstep(0.5, 0.96, 0.5 + 0.5 * cos(rp * 2.0)), 0.24, smoothstep(0.4, 1.0, fw)), smoothstep(0.4, 0.62, sv));
  if (kind > 2.5) root = mix(root, texture(uPat, vec2(0.95, (vI.x + 0.5) / ${N0}.0)).rgb, 0.55);
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
}`.replace("TAU_C","6.2831853"),Ro=B+e0+`in vec3 vRay; out vec4 o; uniform sampler2D uBot; uniform sampler2D uCau; uniform sampler2D uSurf; uniform sampler2D uShadow; uniform sampler2D uEnv;
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
}`,yo=B+e0+Ce+`in vec3 vRay; out vec4 o;
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
}`,Eo=B+e0+je+`layout(location=0) in vec4 iA; layout(location=1) in vec4 iB; layout(location=2) in vec4 iC; layout(location=3) in vec2 aQ;
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
}`,Fo=B+e0+Ce+`in vec3 vW; in vec3 vN; in vec2 vUv; in vec2 vL; flat in vec4 vK; flat in vec2 vC; out vec4 o; uniform sampler2D uAtlas; uniform sampler2D uEnv; uniform float uAlpha;
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
}`,To=B+e0+`layout(location=0) in vec4 iA; layout(location=1) in vec4 iB; layout(location=3) in vec2 aQ; out vec2 vUv;
void main() { vec2 l = (aQ * 2.0 - 1.0) * iB.x; float cs = cos(iA.w), sn = sin(iA.w), cell = iB.z;
  vec2 xz = iA.xz + vec2(cs * l.x - sn * l.y, sn * l.x + cs * l.y) - s[10].xz / s[10].y * 1.25 * (s[4].w + iA.y);
  vUv = (vec2(mod(cell, 4.0), floor(cell / 4.0)) + aQ) * 0.25;
  gl_Position = vec4(xz * s[6].w * 2.0, 0.0, 1.0); }`,No=B+`in vec2 vUv; out vec4 o; uniform sampler2D uAtlas; uniform float uSt;
void main() { o = vec4(vec3(textureLod(uAtlas, vUv, 1.5).a * uSt), 1.0); }`,wo=B+e0+je+`layout(location=0) in vec4 aP; layout(location=1) in vec2 aK; out vec2 vK; out vec3 vW;
void main() { vec4 c = CLIP(aP.xyz); gl_Position = c; vK = aK; vW = aP.xyz; gl_PointSize = max(aP.w * s[5].w * 2.0 / (c.w * length(s[6].xyz)) , 1.5); }`,_o=B+e0+Ce+`in vec2 vK; in vec3 vW; out vec4 o;
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
  o = vec4(FIN(c), a); }`,Mo=B+`in vec2 vUv; out vec4 o; uniform vec4 uW[24]; uniform int uC;
void main() { vec2 p = vUv * 6.2831853, g = vec2(0.0); float h = 0.0;
  for (int i = 0; i < uC; i++) { vec4 w = uW[i]; float a = dot(w.xy, p) + w.w; g += w.xy * w.z * cos(a); h += w.z * sin(a); }
  o = vec4(g * 0.5 + 0.5, h * 0.5 + 0.5, 1.0); }`,Bo=B+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform vec4 uP; uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform vec3 uT2;
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
}`,Uo=B+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform vec4 uK; uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform int uLobes;
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
}`,zo=B+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform vec3 uA; uniform vec3 uB; uniform vec4 uP; uniform int uFb;
float fbm(vec2 p) { float a = 0.5, r = 0.0; for (int i = 0; i < uFb; i++) { r += a * texture(uN, p).r; p = p * 2.03 + 0.37; a *= 0.5; } return r; }
void main() {
  float f = fbm(vUv * 0.07 + uP.xy), f2 = fbm(vUv * 0.16 + uP.yx + 0.3);
  vec3 c = mix(uA, uB, smoothstep(uP.z, uP.w, f + (f2 - 0.5) * 0.4));
  o = vec4(sqrt(c), 0.0);
}`,Lo=B+`layout(location=0) in vec4 iA; layout(location=1) in vec2 iB; out vec2 vQ; out vec4 vS; out vec2 vR;
void main() { float t = float(gl_VertexID & 1), sd = float((gl_VertexID >> 1) & 1) * 2.0 - 1.0;
  vec2 a = iA.xy, b = iA.zw, dv = b - a; float l = max(length(dv), 1e-4); vec2 d = dv / l, nr = vec2(-d.y, d.x);
  float R = max(iB.x, iB.y) * 1.5 + 0.004;
  vec2 q = mix(a - d * R, b + d * R, t) + nr * sd * R;
  vQ = q; vS = iA; vR = iB;
  gl_Position = vec4(q * 2.0 - 1.0, 0.0, 1.0); }`,Po=B+`in vec2 vQ; in vec4 vS; in vec2 vR; out vec4 o; uniform vec3 uA;
void main() { vec2 a = vS.xy, b = vS.zw, ba = b - a, pa = vQ - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  float r = mix(vR.x, vR.y, h), d = length(pa - ba * h) - r;
  float al = 1.0 - smoothstep(-0.0012, 0.0012 + r * 0.3, d);
  o = vec4(uA, al); }`,go=B+`layout(location=0) in vec4 iA; layout(location=1) in vec2 iB; layout(location=3) in vec2 aQ; out vec2 vUv; out float vB;
void main() { vec2 l = (aQ * 2.0 - 1.0) * iA.w; float cs = cos(iA.z), sn = sin(iA.z), cell = iB.x;
  vec2 P = iA.xy + vec2(cs * l.x - sn * l.y, sn * l.x + cs * l.y);
  vUv = (vec2(mod(cell, 4.0), floor(cell / 4.0)) + aQ) * 0.25; vB = iB.y;
  gl_Position = vec4(P * 2.0 - 1.0, 0.0, 1.0); }`,So=B+`in vec2 vUv; in float vB; out vec4 o; uniform sampler2D uAtlas; uniform vec3 uA;
void main() { vec4 a = texture(uAtlas, vUv); o = vec4(sqrt(a.rgb * uA * vB), a.a * 0.92); }`,qe=`float fbm(vec2 p) { float a = 0.5, r = 0.0; for (int i = 0; i < uFb; i++) { r += a * texture(uN, p).r; p = p * 2.03 + 0.37; a *= 0.5; } return r; }
`,Do=B+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform vec4 uP; uniform int uFb;
`+qe+`void main() {
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
}`,ko=B+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform vec4 uP; uniform vec3 uQ; uniform int uK; uniform int uFb;
`+qe+`void main() {
  vec2 p = (vUv - 0.5) * ${(2*ae).toFixed(2)} * uP.x + uP.yz;
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
}`,Io=B+e0+`in vec2 vUv; out vec4 o; uniform sampler2D uN;
void main() { vec2 P = (vUv - 0.5) / s[6].w;
  float rd = s[17].z - length(P - s[17].xy) + (texture(uN, P * 0.031 + 0.3).r - 0.5) * 0.25;
  o = vec4(0.0, 0.0, 0.0, 0.22 + 0.78 * smoothstep(0.0, 0.5, rd)); }`,Co=B+e0+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform int uK; uniform int uFb;
`+qe+`void main() {
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
}`,qo=B+e0+`in vec2 vUv; out vec4 o; uniform sampler2D uN; uniform sampler2D uH; uniform int uK; uniform int uFb; uniform vec4 uP;
`+qe+`float G(ivec2 p) { vec4 t = texelFetch(uH, p, 0); return (t.r + t.g / 255.0 - 0.3) * 2.0; }
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
}`;function Oo(t){const e={sim:[w0,io],splat:[co,lo],surf:[w0,fo],dim:[uo,vo],cau:[mo,ho],fsh:[xo,po],body:[_t,bo],fin:[_t,Ao],bot:[Nt,Ro],comp:[Nt,yo],leaf:[Eo,Fo],lsh:[To,No],pt:[wo,_o],micro:[w0,Mo],pat:[w0,Bo],atlas:[w0,Uo],sky:[w0,zo],branch:[Lo,Po],eleaf:[go,So],bed:[w0,Do],stones:[w0,ko],depth:[w0,Io],rkh:[w0,Co],rk:[w0,qo]},D=new Map,x={},L=(c,n)=>{let l=D.get(n);return l||(l=t.createShader(c),t.shaderSource(l,n),t.compileShader(l),D.set(n,l)),l};for(const c in e){const n=t.createProgram();t.attachShader(n,L(t.VERTEX_SHADER,e[c][0])),t.attachShader(n,L(t.FRAGMENT_SHADER,e[c][1])),t.linkProgram(n),x[c]=n}for(const c in e)if(!t.getProgramParameter(x[c],t.LINK_STATUS)){const n=t.getProgramInfoLog(x[c])||"",l=t.getShaderInfoLog(L(t.VERTEX_SHADER,e[c][0])),f=t.getShaderInfoLog(L(t.FRAGMENT_SHADER,e[c][1]));throw new Error("183 "+c+": "+n+" "+l+" "+f)}const j={uSurf:0,uCau:1,uShadow:2,uLay:3,uEnv:4,uBot:5,uRock:6,uTile:7,uRing:8,uF:9,uPat:10,uScale:11,uAtlas:12,uSim:13,uN:14,uH:15},o0={};for(const c in x){const n=x[c],l=t.getUniformBlockIndex(n,"S"),f=t.getUniformBlockIndex(n,"D");l!==t.INVALID_INDEX&&t.uniformBlockBinding(n,l,0),f!==t.INVALID_INDEX&&t.uniformBlockBinding(n,f,1),t.useProgram(n);for(const R in j){const S=t.getUniformLocation(n,R);S&&t.uniform1i(S,j[R])}const m=t.getUniformLocation(n,"uFb");m&&t.uniform1i(m,c==="pat"?3:5);const h=t.getUniformLocation(n,"uK");h&&c!=="atlas"&&t.uniform1i(h,c==="rk"?8:9);const p=t.getUniformLocation(n,"uLobes");p&&t.uniform1i(p,7),o0[c]=R=>t.getUniformLocation(n,R)}t.useProgram(x.lsh),t.uniform1f(o0.lsh("uSt"),.8);const g0=(c,n,l,f,m,h,p)=>{const R=t.createTexture();return t.bindTexture(t.TEXTURE_2D,R),t.texImage2D(t.TEXTURE_2D,0,l,c,n,0,f,m,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,h),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,h===t.NEAREST?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,p||t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,p||t.CLAMP_TO_EDGE),R},i=c=>{const n=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,n),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,c,0),n},S0=(c,n,l,f)=>{const m=t.createTexture();return t.bindTexture(t.TEXTURE_2D,m),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,c,c,0,t.RGBA,t.UNSIGNED_BYTE,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,f?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,l),f&&t.generateMipmap(t.TEXTURE_2D),m},U=!!(t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float")),_0=t.getExtension("EXT_texture_filter_anisotropic");let ce=183183;const M0=()=>{ce=ce+1831565813|0;let c=Math.imul(ce^ce>>>15,1|ce);return c=c+Math.imul(c^c>>>7,61|c)^c,(c^c>>>14)>>>0},le=new Uint8Array(256*256*4);{const c=new Uint32Array(le.buffer);for(let n=0;n<c.length;n++)c[n]=M0()}const E0=S0(256,le,t.REPEAT,!1),V=128,Oe=V/4,Q0=new Uint8Array(V*V*4),re=new Float32Array(16);for(let c=0;c<16;c++)re[c]=(M0()&1023)/1023;for(let c=0;c<V;c++)for(let n=0;n<V;n++){const l=n/Oe,f=c/Oe;let m=!1,h=0,p=0,R=1,S=0;for(let Q=Math.floor(l)-2;Q<=Math.floor(l)+1&&!m;Q++)for(let G=Math.floor(f)-1;G<=Math.floor(f)+2&&!m;G++){const f0=Q+(G&1)*.5,h0=l-f0,O0=f-G,n0=Math.hypot(h0*.92,O0);n0<.86&&(m=!0,h=h0,p=O0,R=n0/.86,S=re[(Q%4+4)%4+(G%4+4)%4*4])}const Y=(n+c*V)*4;Q0[Y]=z(127.5+h*127.5,0,255),Q0[Y+1]=z(127.5+p*127.5,0,255),Q0[Y+2]=S*255,Q0[Y+3]=z((1-Math.pow(R,5))*255,0,255)}const Me=S0(V,Q0,t.REPEAT,!0);t.bindTexture(t.TEXTURE_2D,Me),_0&&t.texParameterf(t.TEXTURE_2D,_0.TEXTURE_MAX_ANISOTROPY_EXT,4);const c0=256,t0=14,D0=new Uint8Array(c0*c0*4),se=new Float32Array(t0*t0),ne=new Float32Array(t0*t0),k0=new Uint8Array(t0*t0);for(let c=0;c<t0*t0;c++)se[c]=(M0()&1023)/1023,ne[c]=(M0()&1023)/1023,k0[c]=M0()&255;for(let c=0;c<c0;c++)for(let n=0;n<c0;n++){const l=n/c0*t0,f=c/c0*t0,m=Math.floor(l),h=Math.floor(f);let p=9,R=0,S=0,Y=0;for(let f0=-1;f0<=1;f0++)for(let h0=-1;h0<=1;h0++){const O0=(m+h0+t0)%t0,n0=(h+f0+t0)%t0,de=O0+n0*t0,p0=m+h0+se[de]-l,b0=h+f0+ne[de]-f,xe=p0*p0+b0*b0;xe<p&&(p=xe,R=p0,S=b0,Y=k0[de])}const Q=Math.sqrt(p)||1,G=(n+c*c0)*4;D0[G]=z(127.5-R/Q*127,0,255),D0[G+1]=z(127.5-S/Q*127,0,255),D0[G+2]=z(Q*255,0,255),D0[G+3]=Y}const fe=S0(c0,D0,t.REPEAT,!1),K0=t.createVertexArray(),ue=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,ue);const C=8,B0=new Float32Array((C+1)*(C+1)*2),q=new Uint16Array(C*C*6);{let c=0,n=0;for(let l=0;l<=C;l++)for(let f=0;f<=C;f++)B0[c++]=f/C,B0[c++]=l/C;for(let l=0;l<C;l++)for(let f=0;f<C;f++){const m=f+l*(C+1),h=m+1,p=m+C+1,R=p+1;q[n++]=m,q[n++]=h,q[n++]=p,q[n++]=h,q[n++]=R,q[n++]=p}}t.bufferData(t.ARRAY_BUFFER,B0,t.STATIC_DRAW);const l0=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,l0),t.bufferData(t.ELEMENT_ARRAY_BUFFER,q,t.STATIC_DRAW);const X=[],U0=[],F0=[],z0=[[0,.013,.011],[.008,.026,.022],[.02,.036,.034],[.05,.05,.054],[.09,.066,.072],[.16,.086,.094],[.26,.103,.112],[.36,.11,.118],[.48,.104,.112],[.62,.086,.094],[.76,.06,.068],[.88,.034,.042],[1,.014,.02]],j0=(c,n)=>{for(let l=1;l<z0.length;l++)if(c<=z0[l][0]){const f=z0[l-1],m=z0[l];let h=(c-f[0])/(m[0]-f[0]);return h=h*h*(3-2*h)*.35+h*.65,f[n]+(m[n]-f[n])*h}return z0[z0.length-1][n]},$0=(c,n,l,f,m,h,p,R,S)=>(X.push(c,n,l,f,m,h,p,R,S),X.length/9-1),L0=44,I0=22,$e=0,Ze=c=>{const n=c/L0;return n<.3?.14*Math.pow(n/.3,1.8):.14+.86*(n-.3)/.7};for(let c=0;c<=L0;c++){const n=Ze(c),l=j0(n,1),f=j0(n,2),m=(j0(Math.min(n+.01,1),1)-j0(Math.max(n-.01,0),1))/.02;for(let h=0;h<=I0;h++){const p=(h/I0-.5)*M,R=Math.sin(p),S=Math.cos(p),Y=S>=0?f*Math.pow(S,.9):f*.86*S,Q=l*Math.sign(R)*Math.pow(Math.abs(R),.88),G=R/Math.max(l,.001),f0=S/Math.max(f,.001),h0=Math.hypot(G,f0),O0=-m*1.1,n0=Math.hypot(G/h0,f0/h0,O0);$0(n,Q,Y,0,G/h0/n0,f0/h0/n0,O0/n0,n,h/I0)}}for(let c=0;c<=I0;c++){const n=(c/I0-.5)*M,l=Math.sin(n),f=Math.cos(n);$0(.016,.003*l,.003*f,0,0,0,1,-.05,c/I0)}for(let c=0;c<=L0;c++)for(let n=0;n<I0;n++){const l=$e+(c===L0?L0+1:c)*(I0+1)+n,f=l+1,m=$e+(c===L0?0:c+1)*(I0+1)+n,h=m+1;if(c===L0){U0.push(l,f,m,f,h,m);continue}U0.push(l,f,m,f,h,m)}const Z0=(c,n,l,f)=>{const p=X.length/9;for(let R=0;R<=7;R++)for(let S=0;S<=10;S++){const Y=R/7,Q=S/10,G=(1-.62*Math.pow(2*Q-1,2))*(1-.18*Q);$0(c,n,l*j0(c,1),1,Y*G,0,f,Y,Q)}for(let R=0;R<7;R++)for(let S=0;S<10;S++){const Y=p+R*11+S,Q=Y+1,G=Y+10+1,f0=G+1;F0.push(Y,Q,G,Q,f0,G)}};Z0(.235,.2,.82,1),Z0(.235,.2,.82,-1),Z0(.56,.12,.6,1),Z0(.56,.12,.6,-1),Z0(.74,.075,.3,1),Z0(.74,.075,.3,-1);{const n=X.length/9;for(let l=0;l<=18;l++)for(let f=0;f<=2;f++){const m=l/18,h=.36+m*.36,p=f/2,R=.068*Math.pow(Math.sin(Math.min(m*3.5,oe/2)),.8)*(1-m*.72);$0(h,R,j0(h,2)*.98,2,m,p,0,p,m)}for(let l=0;l<18;l++)for(let f=0;f<2;f++){const m=n+l*3+f,h=m+1,p=m+3,R=p+1;F0.push(m,h,p,h,R,p)}}{const l=X.length/9;for(let f=0;f<=8;f++)for(let m=0;m<=10;m++){const h=f/8,p=m/10*2-1,R=1-.34*(1-Math.abs(p))*(1-Math.abs(p))*1.2;$0(1,0,0,3,h*R,p,0,h*R,p)}for(let f=0;f<8;f++)for(let m=0;m<10;m++){const h=l+f*11+m,p=h+1,R=h+10+1,S=R+1;F0.push(h,p,R,p,S,R)}}const C0=(c,n,l,f)=>{const h=X.length/9;for(let p=0;p<=5;p++)for(let R=0;R<=1;R++)$0(c,n,l,4,p/5,f,0,p/5,R*(1-p/5));for(let p=0;p<5;p++){const R=h+p*2,S=R+1,Y=R+2,Q=Y+1;F0.push(R,S,Y,S,Q,Y)}};C0(.008,.015,.082,1),C0(.008,.015,.082,-1),C0(.02,.028,.044,1),C0(.02,.028,.044,-1);const Ve=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,Ve),t.bufferData(t.ARRAY_BUFFER,new Float32Array(X),t.STATIC_DRAW);const ve=t.createBuffer(),O=new Uint16Array(U0.length+F0.length);O.set(U0,0),O.set(F0,U0.length),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,ve),t.bufferData(t.ELEMENT_ARRAY_BUFFER,O,t.STATIC_DRAW);const P0=t.createVertexArray();t.bindVertexArray(P0),t.bindBuffer(t.ARRAY_BUFFER,Ve),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,4,t.FLOAT,!1,36,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,3,t.FLOAT,!1,36,16),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,2,t.FLOAT,!1,36,28),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,ve);const m0=192,Be=new Float32Array((m0+1)*(m0+1)*2),x0=new Uint16Array(m0*m0*6);{let c=0,n=0;for(let l=0;l<=m0;l++)for(let f=0;f<=m0;f++)Be[c++]=f/m0,Be[c++]=l/m0;for(let l=0;l<m0;l++)for(let f=0;f<m0;f++){const m=f+l*(m0+1),h=m+1,p=m+m0+1,R=p+1;x0[n++]=m,x0[n++]=h,x0[n++]=p,x0[n++]=h,x0[n++]=R,x0[n++]=p}}const q0=t.createBuffer(),me=t.createBuffer(),J0=t.createVertexArray();t.bindVertexArray(J0),t.bindBuffer(t.ARRAY_BUFFER,q0),t.bufferData(t.ARRAY_BUFFER,Be,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,me),t.bufferData(t.ELEMENT_ARRAY_BUFFER,x0,t.STATIC_DRAW),t.bindVertexArray(null),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.activeTexture(t.TEXTURE14),t.bindTexture(t.TEXTURE_2D,E0);const Ue=g0(256,256,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.REPEAT);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR);{const c=i(Ue);t.viewport(0,0,256,256),t.useProgram(x.micro);const n=new Float32Array(96);for(let l=0;l<24;l++){const f=3+22*Math.pow(l/23,1.2),m=M0()/4294967296*M;let h=Math.round(Math.cos(m)*f),p=Math.round(Math.sin(m)*f);!h&&!p&&(h=1),n.set([h,p,.8/Math.pow(Math.hypot(h,p),1)/6,M0()/4294967296*M],l*4)}t.uniform4fv(o0.micro("uW"),n),t.uniform1i(o0.micro("uC"),24),t.bindVertexArray(K0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(c),t.bindTexture(t.TEXTURE_2D,Ue),t.generateMipmap(t.TEXTURE_2D)}t.activeTexture(t.TEXTURE14),t.bindTexture(t.TEXTURE_2D,E0),t.activeTexture(t.TEXTURE0);const X0=768,he=g0(X0,X0,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR);{const c=i(he);t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(x.atlas),t.bindVertexArray(K0);const n=(f,m,h,p,R,S,Y)=>{t.viewport(f%4*X0/4,Math.floor(f/4)*X0/4,X0/4,X0/4),t.uniform4f(o0.atlas("uK"),m,h,p,f===2?-.1:f===0?.05:f===8?.12:0),t.uniform1i(o0.atlas("uLobes"),f===1||f===8||f===11?5:7),t.uniform3fv(o0.atlas("uA"),R),t.uniform3fv(o0.atlas("uB"),S),t.uniform3fv(o0.atlas("uC"),Y),t.drawArrays(t.TRIANGLES,0,3)};t.uniform1i(o0.atlas("uLobes"),7);const l=f=>{const m=f[0]*.3+f[1]*.55+f[2]*.15;return f.map(h=>h*.68+m*.32)};n(0,0,.13,1,l([.3,.022,.018]),l([.36,.1,.02]),l([.13,.01,.014])),n(1,0,.47,.3,l([.4,.06,.014]),l([.46,.18,.024]),l([.2,.016,.012])),n(2,0,.71,.7,l([.44,.18,.022]),l([.36,.26,.05]),l([.28,.05,.014])),n(10,0,.39,.8,l([.5,.34,.05]),l([.42,.36,.08]),l([.38,.17,.025])),n(11,0,.91,.4,l([.36,.14,.03]),l([.14,.19,.035]),l([.28,.05,.02])),n(3,0,.29,.5,[.11,.07,.04],[.14,.09,.05],[.06,.04,.03]),n(4,1,.33,0,[.82,.58,.62],[.68,.27,.36],[0,0,0]),n(5,1,.61,0,[.9,.82,.8],[.74,.45,.5],[0,0,0]),n(6,2,.17,0,[.022,.085,.03],[.05,.14,.04],[.11,.08,.03]),n(7,3,.53,0,[.78,.36,.5],[.86,.74,.72],[0,0,0]),n(9,1,.11,0,[.72,.5,.1],[.66,.34,.05],[0,0,0]),n(8,0,.83,.6,[.1,.27,.05],[.14,.33,.05],[.06,.2,.04]),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(c),t.bindTexture(t.TEXTURE_2D,he),t.generateMipmap(t.TEXTURE_2D)}return t.bindVertexArray(null),{P:x,LOC:o0,flt:U,tex:g0,fbo:i,noise:E0,scale:Me,ring:fe,tile:Ue,atlas:he,vao0:K0,qb:ue,qe:l0,QN:q.length,vaoFish:P0,nB:U0.length,nF:F0.length,vaoCau:J0,nC:x0.length}}const Ut=typeof FinalizationRegistry=="function"?new FinalizationRegistry(t=>{for(const e of t.b)t.gl.deleteBuffer(e);for(const e of t.t)t.gl.deleteTexture(e);for(const e of t.f)t.gl.deleteFramebuffer(e);for(const e of t.v)t.gl.deleteVertexArray(e);for(const e of t.r)t.gl.deleteRenderbuffer(e)}):null;Ft.add({num:183,name:"Koi Pond",fam:"Worlds",recipe:"A garden koi pond seen through the water from above, where the real waves bend the fish, mirror the trees and throw moving light on the stones. The koi and how many there are, the season, the water, the light, the bottom and the weather change every mint. Tap to drop pellets, drag a finger through the water and the fish shy away, or hold for rain and the koi sink.",interactive:"Tap to drop pellets and start a feeding frenzy. Drag to trail a finger through the water; the fish shy from it. Hold for rain, thousands of rings, and the koi sink.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,D=t.size;let x=Tt.get(e);x||(x=Oo(e),Tt.set(e,x));const L=x.P,j=x.LOC;let o0=2654435769;const g0=t.hash.slice(2);for(let o=0;o<g0.length;o+=8)o0=Math.imul(o0^parseInt(g0.slice(o,o+8),16),1540483477)>>>0;const i=()=>{o0=o0+1831565813|0;let o=Math.imul(o0^o0>>>15,1|o0);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},S0=o=>{let s=i(),a;for(a in o)if(s-=o[a],s<=0)return a;return a},U={mix:S0({kohaku:.42,ogon:.22,showa:.26,"butterfly long-fin":.1}),count:S0({3:.34,7:.42,12:.24}),season:S0({"autumn maple":.45,"spring blossom":.25,"summer lilies":.2,"snow melting":.1}),water:S0({clear:.66,"green-tinted":.34}),light:S0({overcast:.5,"dappled sun":.38,"dusk lantern":.12}),bottom:S0({"river stones":.68,"dark liner":.32})};t.home&&(U.mix="kohaku",U.count="3",U.season="autumn maple",U.water="clear",U.light="dappled sun",U.bottom="river stones"),t.trait("Koi",U.mix),t.trait("Count",+U.count),t.trait("Season",U.season),t.trait("Water",U.water),t.trait("Light",U.light),t.trait("Bottom",U.bottom);let _0=25403678;for(let o=0;o<g0.length;o+=8)_0=Math.imul(_0^parseInt(g0.slice(o,o+8),16),668265263)^_0>>>15;const M0=(()=>{_0=_0+1831565813|0;let o=Math.imul(_0^_0>>>15,1|_0);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296})(),le=t.home||M0>=.3&&M0<.86?"light breeze":M0<.3?"still air":"drizzle";t.trait("Weather",le);let E0=25412290;for(let o=0;o<g0.length;o+=8)E0=Math.imul(E0^parseInt(g0.slice(o,o+8),16),374761393)^E0>>>13;const V=()=>{E0=E0+1831565813|0;let o=Math.imul(E0^E0>>>15,1|E0);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},Oe=le==="still air"?.4:1,Q0=le==="drizzle"?.27:0,re=+U.count,Me=D<=400?.5:1,c0=D<=400?192:384,t0=D<=400?256:512,D0=D<=400?256:512,se=D<=400?256:512,ne=Math.round(768*Me),k0=Math.round(1024*Me),fe=.9,K0=.27,ue=3.5,C=1/ue,B0=[0,ue*Math.cos(K0),ue*Math.sin(K0)],q=[0,-Math.cos(K0),-Math.sin(K0)],l0=[1,0,0],X=[0,-q[2]*1,q[1]*1*-1];X[0]=l0[1]*q[2]-l0[2]*q[1],X[1]=l0[2]*q[0]-l0[0]*q[2],X[2]=l0[0]*q[1]-l0[1]*q[0],X[2]>0&&(X[0]=-X[0],X[1]=-X[1],X[2]=-X[2]);const U0=.5,F0=8,z0=(F0+U0)/(F0-U0),j0=-2*F0*U0/(F0-U0),$0=(o,s)=>o[0]*s[0]+o[1]*s[1]+o[2]*s[2],L0=(o,s,a)=>[o[0]*s,o[1]*s,o[2]*s,a-$0(o,B0)*s],I0=0,$e=0,Ze=L0(l0,1/C,0),Z0=L0(X,1/C,0),C0=L0(q,1,0),Ve=[C0[0]*z0,C0[1]*z0,C0[2]*z0,C0[3]*z0+j0],ve=(o,s)=>{const a=o*2-1,r=1-s*2,v=q[0]+l0[0]*C*a+X[0]*C*r,E=q[1]+l0[1]*C*a+X[1]*C*r,y=q[2]+l0[2]*C*a+X[2]*C*r,u=-B0[1]/E;return[B0[0]+v*u,B0[2]+y*u]},O={overcast:{amb:[.86,.9,.92],sun:[.22,.22,.2],cm:.34,gob:0,gl:0,shs:.5,gain:3.2,a:[.74,.78,.84],b:[1,1.04,1.08],sa:.3,sb:.7,exp:1.08,F0:.058},"dappled sun":{amb:[.44,.49,.54],sun:[1.2,1.06,.82],cm:1,gob:.86,gl:1,shs:.8,gain:3.2,a:[.42,.56,.8],b:[1.3,1.3,1.3],sa:.38,sb:.62,exp:1,F0:.075},"dusk lantern":{amb:[.2,.2,.33],sun:[.62,.32,.17],cm:.4,gob:.3,gl:.3,shs:.5,gain:1.8,a:[.09,.13,.33],b:[.78,.42,.25],sa:.3,sb:.72,exp:1.25,F0:.075}}[U.light],P0=U.water==="clear"?{k:[1.15,.44,.5],sc:[.012,.042,.052]}:{k:[1.5,.56,1.25],sc:[.018,.075,.03]};U.bottom==="dark liner"&&(P0.sc=P0.sc.map(o=>o*.15));const m0=U.light==="dusk lantern"?[.42,.75,-.3]:[.28,.88,.3],Be=Math.hypot(...m0),x0=m0.map(o=>o/Be),q0=[x0[0]*.75,0,x0[2]*.75];q0[1]=Math.sqrt(Math.max(0,1-q0[0]*q0[0]-q0[2]*q0[2]));const me=11,J0=new Float32Array(44),Ue=i()*M;for(let o=0;o<me;o++){const s=.09+.3*Math.pow(1-o/(me-1),1.4),a=M/s,r=Ue+o*2.39996+(i()-.5)*.5,v=Math.sqrt(9.8*a)*.62;J0.set([Math.cos(r)*a,Math.sin(r)*a,.00105*Math.pow(s/.25,1.1)*(.7+i()*.6),v],o*4)}const X0=t.home?2.42:i()*M,he=.3+i()*.17,c=1.36+i()*.16,n=[Math.cos(X0)*he,Math.sin(X0)*he],l=(o,s)=>c-Math.hypot(o-n[0],s-n[1]),f=new Float32Array(32*4),m=new Float32Array(6*4),h=(o,s,a,r,v)=>{f[o*4]=s,f[o*4+1]=a,f[o*4+2]=r,f[o*4+3]=v};h(0,...Ze),h(1,...Z0),h(2,...Ve),h(3,...C0),h(4,B0[0],B0[1],B0[2],fe),h(5,q[0],q[1],q[2],D),h(6,l0[0]*C,l0[1]*C,l0[2]*C,1/(2*ae)),h(7,X[0]*C,X[1]*C,X[2]*C,O.exp);const p=2*ae/c0;h(8,P0.k[0],P0.k[1],P0.k[2],p),h(9,P0.sc[0],P0.sc[1],P0.sc[2],O.F0),h(10,q0[0],q0[1],q0[2],O.gob),h(11,O.sun[0],O.sun[1],O.sun[2],O.cm),h(12,O.amb[0],O.amb[1],O.amb[2],O.gain),h(13,x0[0],x0[1],x0[2],O.gl);{const o=[q[0],-q[1],q[2]];h(14,o[0]/(o[1]+.35),o[2]/(o[1]+.35),1.5,me)}const R=(D<=400,.62);h(15,R,.1,.9958,x.flt?1:2),h(16,x.flt?0:-1,.42*fe,O.shs,1/c0),h(17,n[0],n[1],c,8);const Y=U.light==="dusk lantern";{const o=i()*M;h(18,.5+Math.cos(o)*.2,.5+Math.sin(o)*.2,Y?1:0,.22)}for(let o=0;o<me;o++)h(19+o,J0[o*4],J0[o*4+1],J0[o*4+2],J0[o*4+3]);const Q=e.createBuffer(),G=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,Q),e.bufferData(e.UNIFORM_BUFFER,f,e.STATIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,G),e.bufferData(e.UNIFORM_BUFFER,m,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,0,Q),e.bindBufferBase(e.UNIFORM_BUFFER,1,G);const f0=[],h0=[],O0=[Q,G],n0=[],de=[],p0=(...o)=>{const s=x.tex(...o);return f0.push(s),s},b0=o=>{const s=x.fbo(o);return h0.push(s),s},xe=()=>{const o=e.createBuffer();return O0.push(o),o},P=(o,s)=>{e.activeTexture(e.TEXTURE0+o),e.bindTexture(e.TEXTURE_2D,s)};e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.depthMask(!0),P(14,x.noise),P(12,x.atlas),P(11,x.scale),P(7,x.tile),P(8,x.ring);const J={"autumn maple":{cells:[0,1,0,2,1],leafN:t.home?10:15,size:.085,curl:.3,fall:4.5,sunk:16,sunkCell:3,sky:[1.5,1.2,1.1],envCells:[0,1,2,0],envN:900},"spring blossom":{cells:[4,5,4],leafN:46,size:.026,curl:.3,fall:.7,sunk:14,sunkCell:4,sky:[1.5,1.45,1.45],envCells:[4,5,5],envN:1500},"summer lilies":{cells:[8],leafN:4,size:.055,curl:.2,fall:16,sunk:9,sunkCell:3,sky:[1,1.2,.9],envCells:[8,8],envN:1e3},"snow melting":{cells:[3],leafN:3,size:.06,curl:.28,fall:40,sunk:12,sunkCell:3,sky:[.5,.5,.5],envCells:[],envN:0}}[U.season],Ge=512,Je=p0(Ge,Ge,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.MIRRORED_REPEAT);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR);const ia=b0(Je);e.viewport(0,0,Ge,Ge),e.useProgram(L.sky),e.bindVertexArray(x.vao0);const zt=o=>[o[0]/O.gain,o[1]/O.gain,o[2]/O.gain];e.uniform3fv(j.sky("uA"),zt(O.a)),e.uniform3fv(j.sky("uB"),zt(O.b)),e.uniform4f(j.sky("uP"),i(),i(),O.sa,O.sb),e.drawArrays(e.TRIANGLES,0,3);{const o=[],s=[];let a=i;const r=(b,T,k,s0,H,$)=>{const so=3+Math.floor(a()*2);for(let T0=0;T0<so;T0++){k+=(a()-.5)*.52;const V0=b+Math.cos(k)*H,ke=T+Math.sin(k)*H,ie=s0*.92;if(o.push(b,T,V0,ke,s0,ie),b=V0,T=ke,s0=ie,$<=2&&a()<.8)for(let Ke=0;Ke<($===0?3:2);Ke++){const Ne=.02+a()*.05,we=a()*M;s.push(b+Math.cos(we)*Ne,T+Math.sin(we)*Ne,a()*M,.014+a()*.016)}}if($>0&&s0>.0012&&o.length<6*(a===i?900:1800)){const T0=$>3?2:2+(a()<.4?1:0);for(let V0=0;V0<T0;V0++)r(b,T,k+(V0-(T0-1)/2)*(.5+a()*.5),s0*.7,H*.78,$-1)}},v=t.home?2:1+Math.floor(i()*2);for(let b=0;b<v;b++){const T=(t.home?3.9:i()*M)+b*2.1,k=.5+Math.cos(T)*.68,s0=.5+Math.sin(T)*.68;r(k,s0,T+oe+(i()-.5)*.5,.013,.052,6)}const E=U.bottom==="dark liner",y=s.length;if(E){a=V;for(let b=0;b<3;b++){const T=V()*M,k=.5+Math.cos(T)*.42,s0=.5+Math.sin(T)*.42;r(k,s0,T+oe+(V()-.5)*.5,.016,.05,6)}a=i}e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);const u=e.createVertexArray();n0.push(u),e.bindVertexArray(u);const d=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,24,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,24,16),e.vertexAttribDivisor(1,1),e.useProgram(L.branch);const A=U.light==="dusk lantern"?[.018,.02,.04]:[.09,.085,.09];e.uniform3fv(j.branch("uA"),A),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,o.length/6);const F=Math.min(J.envN,y/4),N=E?Math.min(J.envN*3,s.length/4):F;if(N>0&&J.envCells.length){const b=new Float32Array(N*6);for(let H=0;H<N;H++)b[H*6]=s[H*4],b[H*6+1]=s[H*4+1],b[H*6+2]=s[H*4+2],b[H*6+3]=s[H*4+3]*(J.envCells[0]>=4&&J.envCells[0]<6?.85:1),b[H*6+4]=J.envCells[H%J.envCells.length],b[H*6+5]=.75+(H<F?i():V())*.5;const T=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,T),e.bufferData(e.ARRAY_BUFFER,b,e.STATIC_DRAW);const k=e.createVertexArray();n0.push(k),e.bindVertexArray(k),e.bindBuffer(e.ARRAY_BUFFER,T),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,24,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,24,16),e.vertexAttribDivisor(1,1),e.bindBuffer(e.ARRAY_BUFFER,x.qb),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,x.qe),e.useProgram(L.eleaf);const s0=U.light==="dusk lantern"?[.38,.3,.3]:[J.sky[0]*1.15/O.gain*1,J.sky[1]*1.15/O.gain*1,J.sky[2]*1.15/O.gain*1];e.uniform3fv(j.eleaf("uA"),E?s0.map(H=>H*.4):s0),e.drawElementsInstanced(e.TRIANGLES,x.QN,e.UNSIGNED_SHORT,0,N),e.deleteBuffer(T),e.deleteVertexArray(k),n0.pop()}e.deleteBuffer(d),e.bindVertexArray(null),e.deleteVertexArray(u),n0.splice(n0.indexOf(u),1),e.disable(e.BLEND),P(4,Je),e.generateMipmap(e.TEXTURE_2D)}const Lt=p0(ne,ne,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.MIRRORED_REPEAT),ca=b0(Lt);e.viewport(0,0,ne,ne),e.bindVertexArray(x.vao0);const Pt=U.bottom==="dark liner";e.useProgram(L.bed),e.uniform4f(j.bed("uP"),Pt?1:0,i(),i(),0),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.colorMask(!0,!0,!0,!1),e.useProgram(L.stones);const ze=(o,s,a)=>{e.uniform4f(j.stones("uP"),o,i()*50,i()*50,s),e.uniform3fv(j.stones("uQ"),a),e.drawArrays(e.TRIANGLES,0,3)};Pt?(ze(12,.09,[.72,.72,.72]),ze(6.5,.08,[.9,.9,.9])):(ze(31,.9,[.9,.9,.9]),ze(17,.84,[1,1,1]),ze(8.5,.55,[1.05,1.05,1.05]));{const o=J.sunk,s=new Float32Array(o*12);for(let v=0;v<o;v++){const E=v*12;s[E]=(i()-.5)*2.2,s[E+1]=-fe,s[E+2]=(i()-.5)*2.2,s[E+3]=i()*M,s[E+4]=(.05+i()*.035)*(J.sunkCell===4?.5:1),s[E+5]=0,s[E+6]=J.sunkCell,s[E+7]=i()}const a=e.createVertexArray(),r=e.createBuffer();e.bindVertexArray(a),e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,48,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,48,16),e.vertexAttribDivisor(1,1),e.bindBuffer(e.ARRAY_BUFFER,x.qb),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,x.qe),e.useProgram(L.lsh),e.uniform1f(j.lsh("uSt"),.55),e.blendFunc(e.ZERO,e.ONE_MINUS_SRC_COLOR),e.drawElementsInstanced(e.TRIANGLES,x.QN,e.UNSIGNED_SHORT,0,o),e.uniform1f(j.lsh("uSt"),.8),e.deleteBuffer(r),e.bindVertexArray(x.vao0),e.deleteVertexArray(a)}if(U.season==="autumn maple"){const o=t.home?[[-.15,.25,0,.085,1.2],[.25,.55,10,.07,3.9],[-.75,-.05,3,.08,.4],[.15,-.8,2,.065,5.1]]:[];if(!t.home)for(let v=0,E=3+Math.floor(V()*4);v<E;v++)o.push([(V()-.5)*2,(V()-.5)*2,[0,1,2,3,10][Math.floor(V()*5)],.05+V()*.04,V()*M]);const s=new Float32Array(o.length*6);o.forEach((v,E)=>s.set([v[0]/(2*ae)+.5,v[1]/(2*ae)+.5,v[4],v[3]/(2*ae),v[2],.42+.3*(E*.37%1)],E*6));const a=e.createVertexArray(),r=e.createBuffer();e.bindVertexArray(a),e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,24,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,24,16),e.vertexAttribDivisor(1,1),e.bindBuffer(e.ARRAY_BUFFER,x.qb),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,x.qe),e.useProgram(L.eleaf),e.uniform3fv(j.eleaf("uA"),[.78,.64,.5]),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.drawElementsInstanced(e.TRIANGLES,x.QN,e.UNSIGNED_SHORT,0,o.length),e.deleteBuffer(r),e.bindVertexArray(x.vao0),e.deleteVertexArray(a)}e.disable(e.BLEND),e.colorMask(!1,!1,!1,!0),e.useProgram(L.depth),e.drawArrays(e.TRIANGLES,0,3),e.colorMask(!0,!0,!0,!0);const et=p0(k0,k0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR);const tt=e.createTexture();P(15,tt),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,k0,k0,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);{const o=x.fbo(tt);e.viewport(0,0,k0,k0),e.useProgram(L.rkh),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(o)}const la=b0(et);e.useProgram(L.rk),e.uniform4f(j.rk("uP"),2*ae/k0,U.season==="snow melting"?1:0,0,0),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(tt),P(6,et),e.generateMipmap(e.TEXTURE_2D);const Vo={kohaku:{k:0,a:[.74,.71,.62],b:[.68,.085,.012],c:[.04,.035,.035],fr:[.88,.5,.36],ft:[.88,.84,.76]},kohaku2:{k:0,a:[.76,.72,.6],b:[.8,.17,.014],c:[.04,.035,.035],fr:[.86,.68,.5],ft:[.9,.85,.76]},ogon:{k:1,a:[.97,.66,.16],b:[.72,.36,.05],c:[.04,.035,.035],fr:[.86,.56,.14],ft:[.92,.72,.3]},platinum:{k:1,a:[.92,.9,.82],b:[.62,.6,.54],c:[.04,.035,.035],fr:[.82,.8,.72],ft:[.9,.88,.82]},showa:{k:2,a:[.72,.69,.6],b:[.66,.075,.012],c:[.018,.017,.02],fr:[.022,.02,.022],ft:[.65,.58,.5]},asagi:{k:3,a:[.25,.34,.45],b:[.7,.2,.05],c:[.04,.035,.035],fr:[.7,.28,.1],ft:[.56,.52,.5]}},Go=U.mix==="butterfly long-fin",Wo=o=>{const s=i();return t.home?["kohaku","ogon","showa"][o%3]:U.mix==="kohaku"?s<.62?i()<.5?"kohaku":"kohaku2":s<.8?"asagi":s<.9?"platinum":"showa":U.mix==="ogon"?s<.55?"ogon":s<.85?"platinum":"kohaku2":U.mix==="showa"?s<.68?"showa":s<.85?"kohaku":"asagi":s<.3?"kohaku2":s<.55?"ogon":s<.78?"platinum":s<.9?"showa":"asagi"},gt=D<=400?256:512,ot=(D<=400?48:96)*N0,St=p0(gt,ot,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR),fa=b0(St);e.useProgram(L.pat),e.bindVertexArray(x.vao0);const Xo=[];for(let o=0;o<N0;o++){const s=Wo(o),a=Vo[s];Xo.push(s),e.viewport(0,Math.round(ot*o/N0),gt,Math.round(ot/N0)),e.uniform4f(j.pat("uP"),a.k,i(),i(),0),e.uniform3fv(j.pat("uA"),a.a),e.uniform3fv(j.pat("uB"),a.b),e.uniform3fv(j.pat("uC"),a.fr),e.uniform3fv(j.pat("uT2"),a.ft),e.drawArrays(e.TRIANGLES,0,3)}e.bindFramebuffer(e.FRAMEBUFFER,null);const Le=x.flt,pe=Le?[e.RGBA16F,e.RGBA,e.HALF_FLOAT]:[e.RGBA8,e.RGBA,e.UNSIGNED_BYTE],We=[p0(c0,c0,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR),p0(c0,c0,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR)],at=Le?[b0(We[0]),b0(We[1])]:[null,null],rt=p0(t0,t0,pe[0],pe[1],pe[2],e.LINEAR,e.MIRRORED_REPEAT),Ho=b0(rt),st=p0(D0,D0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.MIRRORED_REPEAT),Yo=b0(st),nt=p0(se,se,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.MIRRORED_REPEAT),Qo=b0(nt),Dt=p0(D,D,pe[0],pe[1],pe[2],e.LINEAR),Ko=b0(Dt),it=e.createRenderbuffer();if(de.push(it),e.bindRenderbuffer(e.RENDERBUFFER,it),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,D,D),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,it),Le)for(const o of at)e.bindFramebuffer(e.FRAMEBUFFER,o),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);e.bindFramebuffer(e.FRAMEBUFFER,null);const ct=e.createTexture();f0.push(ct),P(9,ct),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,Ie,N0,0,e.RGBA,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const u0=new Float32Array(Ie*N0*4),lt=210,A0=new Float32Array(lt*12),kt=xe(),Pe=e.createVertexArray();n0.push(Pe),e.bindVertexArray(Pe),e.bindBuffer(e.ARRAY_BUFFER,kt),e.bufferData(e.ARRAY_BUFFER,A0,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,48,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,48,16),e.vertexAttribDivisor(1,1),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,4,e.FLOAT,!1,48,32),e.vertexAttribDivisor(2,1),e.bindBuffer(e.ARRAY_BUFFER,x.qb),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,x.qe);const It=96,be=new Float32Array(It*4),Ct=xe(),ft=e.createVertexArray();n0.push(ft),e.bindVertexArray(ft),e.bindBuffer(e.ARRAY_BUFFER,Ct),e.bufferData(e.ARRAY_BUFFER,be,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,0,0),e.vertexAttribDivisor(0,1);const qt=240,ee=new Float32Array(qt*6),Ot=xe(),ut=e.createVertexArray();n0.push(ut),e.bindVertexArray(ut),e.bindBuffer(e.ARRAY_BUFFER,Ot),e.bufferData(e.ARRAY_BUFFER,ee,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,24,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,24,16),e.bindVertexArray(null);const Vt=j.body("uAbove"),jo=j.fin("uAbove"),$o=j.leaf("uAlpha");e.useProgram(L.fin),e.uniform1f(jo,0),e.useProgram(L.leaf),e.uniform1f($o,1);const Zo=re===3?1.06:re===7?.74:.52,W=[];for(let o=0;o<re;o++){const s=Zo*(.8+i()*.32),a=i()*M,r=.15+i()*.55;W.push({i:o,L:s,x:Math.cos(a)*r,y:-.14-i()*.42,z:Math.sin(a)*r,yaw:i()*M,spd:.1,wx:0,wz:0,cy:-.14-i()*.45,tt:0,vd:.12,ph:i()*M,amp:.5,fin:.7,flap:i()*M,mouth:0,roll:0,pit:.07,nod:new Float32Array(i0*3),rise:0,riseX:0,riseZ:0,pulse:0,hunger:.5+i()*.7,wid:.92+i()*.16,wake:0,fx:0,fz:0,breakT:0,gulps:0,dive:0})}if(t.home){const o=W[0],s=W[1],a=W[2];o.L=1.06,o.x=.26,o.z=-.44,o.y=-.07,o.yaw=-.62,o.cy=-.2,o.rise=2.2,o.riseX=.3,o.riseZ=-.47,o.wid=1.04,s.L=.92,s.x=.64,s.z=.32,s.y=-.17,s.yaw=1.74,s.cy=-.17,s.wx=.56,s.wz=.8,s.tt=9,s.vd=.1,a.L=.98,a.x=-.46,a.z=.58,a.y=-.3,a.yaw=2.6,a.cy=-.3,a.wx=-.85,a.wz=.82,a.tt=9,a.vd=.1,o.wx=.5,o.wz=-.62,o.tt=9,o.vd=.08}const Jo=o=>{const s=o.L/(i0-1),a=Math.cos(o.yaw),r=Math.sin(o.yaw);for(let v=0;v<i0;v++){const E=v*s,y=Math.sin(v*.2+o.i)*.05*(v/i0)*o.L;o.nod[v*3]=o.x-a*E-r*y,o.nod[v*3+1]=Math.min(o.y,-.14*o.L)-E*.09,o.nod[v*3+2]=o.z-r*E+a*y}};for(const o of W)Jo(o);const Gt=Go?1:0,a0=[],Xe=(o,s,a,r)=>({x:o,z:s,y:a,vy:0,vx:0,vz:0,ang:i()*M,spin:(i()-.5)*.14,size:J.size*(.72+i()*.56),curl:J.curl*(.45+i()*.85),cell:r,sd:i(),tumb:i()*M,tumb2:i()*M,soak:0,sw:i()*M}),Wt=()=>J.cells[Math.floor(i()*J.cells.length)];if(U.season==="summer lilies"){const o=4+Math.floor(i()*4);for(let s=0;s<o;s++){const a=i()*M,r=.42+i()*.7,v=n[0]+Math.cos(a)*(c-.08-i()*.42),E=n[1]+Math.sin(a)*(c-.08-i()*.42),y=Xe(z(v,-.98,.98),z(E,-.98,.98),0,6);if(y.size=.085+i()*.075,y.curl=.035,y.spin=.01,y.lily=1,a0.push(y),i()<.45){const u=y.x+(i()-.5)*y.size*.5,d=y.z+(i()-.5)*y.size*.5,A=i()*M,F=(N,b,T,k,s0,H)=>{const $=Xe(u+Math.cos(N)*b,d+Math.sin(N)*b,T,H);$.ang=N-oe/2,$.size=k,$.curl=s0,$.spin=0,$.lily=2,$.px=y,$.ox=$.x-y.x,$.oz=$.z-y.z,a0.push($)};for(let N=0;N<9;N++)F(A+N/9*M,.036,.01,.038,.22,7);for(let N=0;N<8;N++)F(A+.4+N/8*M,.024,.024,.031,.34,7);for(let N=0;N<6;N++)F(A+.2+N/6*M,.012,.038,.024,.46,7);F(A,0,.046,.0125,.1,9)}}}for(let o=0;o<J.leafN;o++){const s=i()*M,a=.15+i()*.85;a0.push(Xe(Math.cos(s)*a,Math.sin(s)*a,0,Wt()))}if(t.home)[[.46,-.7,0,.1,.24,.7],[.82,-.3,1,.09,.4,2.8],[-.68,-.28,0,.1,.32,4.1],[-.62,.34,2,.08,.44,5.6],[-.28,.86,1,.095,.26,2.1],[.8,.72,0,.085,.34,3.3],[-.86,.72,2,.075,.36,.3],[.46,.5,1,.08,.42,1.2],[-.32,-.82,1,.085,.3,4.9],[-.5,-.62,0,.07,.5,3.9]].forEach((a,r)=>{const v=a0[r];v.x=a[0],v.z=a[1],v.cell=a[2],v.size=a[3],v.curl=a[4],v.ang=a[5]}),[[.76,-.44,0,.1,.32,.9],[.69,-.35,10,.072,.42,2.6],[.78,-.3,3,.055,.75,4.4],[-.58,-.6,1,.09,.3,4.1],[-.66,.3,11,.066,.4,5.6],[.12,.84,2,.112,.34,2.1]].forEach((a,r)=>{const v=a0[r];v.x=a[0],v.z=a[1],v.cell=a[2],v.size=a[3],v.curl=a[4],v.ang=a[5]}),a0.length=6;else if(U.season==="autumn maple"){for(let v=a0.length-1;v>=0;v--)V()<.45&&a0.splice(v,1);const o=Math.atan2(-n[1],-n[0])+(V()-.5)*1.3,s=z(n[0]+Math.cos(o)*(c-.09),-.85,.85),a=z(n[1]+Math.sin(o)*(c-.09),-.85,.85),r=Math.min(a0.length-2,3+Math.floor(V()*3));for(let v=0;v<r;v++){const E=a0[v],y=V()*M,u=.03+V()*.09;E.x=s+Math.cos(y)*u,E.z=a+Math.sin(y)*u}for(const v of a0)v.size*=.78+.5*V(),v.cell=[0,0,1,1,2,10,11,3][Math.floor(V()*8)]}const H0=[],Ae=[],ua=[],Xt=U.season==="snow melting",K=Xt?new Float32Array(100*5):null;if(K)for(let o=0;o<100;o++){const s=o*5;K[s]=(i()-.5)*2.4,K[s+1]=i()*1.3,K[s+2]=(i()-.5)*2.4,K[s+3]=i()*M,K[s+4]=.0035+i()*.0055}let r0=0,He=0,Re=0,v0=Q0,Ht=2+i()*J.fall,Yt=t.home?2.5:1.8+i()*2,Qt=.8,Kt=.3,ge=0,vt=!1,mt=0,ht=0,dt=0,Se=0,ye=0,Ee=0,Fe=!1,Te=!1,xt=0,pt=0,Ye=0,Qe=0,bt=0;const te={n:0},d0=(o,s,a,r)=>{if(te.n<It){const v=te.n*4;be[v]=o,be[v+1]=s,be[v+2]=a,be[v+3]=r,te.n++}},R0=t.sound,ea=(o,s,a)=>{R0.note(a,{dur:.12,vel:o,wave:"sine",cutoff:1300,attack:.004,pan:s}),R0.note(a+7,{dur:.09,vel:o*.6,wave:"sine",cutoff:1800,attack:.01,at:.03,pan:s}),R0.hit("noise",o*.35,{cutoff:1800,dur:.1,pan:s})},ta=(o,s,a,r)=>{for(let v=0;v<a&&Ae.length<90;v++){const E=i()*M,y=r*(.3+i());Ae.push({x:o,y:.01,z:s,vx:Math.cos(E)*y,vy:.55+i()*.75,vz:Math.sin(E)*y,r:.0036+i()*.0048,life:1})}},oa=(o,s)=>{const a=10+Math.floor(i()*7);for(let r=0;r<a&&H0.length<60;r++){const v=i()*M,E=Math.pow(i(),.6)*.12,y={x:o+Math.cos(v)*E,z:s+Math.sin(v)*E,vx:Math.cos(v)*.035,vz:Math.sin(v)*.035,sd:i()*M,r:.0048+i()*.0018,on:0,life:9+i()*8};H0.push(y),d0(y.x,y.z,.016,-.009)}ea(.4,z(o,-1,1),66);for(const r of W)r.hunger=Math.max(r.hunger,.6+i()*.4)},jt=o=>{const s=r0;for(let a=0;a<W.length;a++){const r=W[a];if(r.tt-=o,r.tt<=0||Math.hypot(r.wx-r.x,r.wz-r.z)<.14){const w=i()*M,_=.1+i()*.72;r.wx=Math.cos(w)*_,r.wz=Math.sin(w)*_,r.tt=6+i()*9,r.vd=.1+i()*.1,r.cy=-.1-r.L*.13-i()*.36*(re===3?.6:1)}let v=r.wx-r.x,E=r.wz-r.z,y=Math.hypot(v,E)+1e-4,u=v/y*.8,d=E/y*.8,A=r.vd,F=r.cy,N=0,b=0,T=null,k=9;if(H0.length&&v0<.3)for(const w of H0){if(w.on>w.life)continue;const _=Math.hypot(w.x-r.x,w.z-r.z);_<k&&(k=_,T=w)}if(T){b=z(1.2-k*.7,.2,1)*r.hunger;const w=T.x-r.x,_=T.z-r.z,g=k+1e-4;u=u*(1-b)+w/g*2.6*b,d=d*(1-b)+_/g*2.6*b,A=k<.26?.07+k*.9:.15+(.28+.36*b)*(1+z(k,0,.8)),F=-.02-z(k-.12,0,1)*.3,k<.34&&(N=1,F=.02),k<.07+r.L*.03&&r.y>-.07&&(T.dead=1,r.hunger*=.92,r.gulps++,d0(T.x,T.z,.032,-.024),d0(r.x,r.z,.05,.012),ta(T.x,T.z,3+Math.floor(i()*5),.18),ge<=0&&(R0.note(52+i()*6,{dur:.1,vel:.5,wave:"sine",cutoff:800,attack:.002,pan:z(r.x,-1,1)}),R0.hit("noise",.2,{cutoff:1100,dur:.09,pan:z(r.x,-1,1)}),ge=.07))}if(r.rise>0){r.rise-=o;const w=r.riseX-r.x,_=r.riseZ-r.z,g=Math.hypot(w,_)+1e-4;u=u*.2+w/g,d=d*.2+_/g,A=g>.05?.09:.01,F=.018,N=g<.2?.55+.45*Math.sin(s*9):0}let s0=0;if(Te){const w=r.x-Ye,_=r.z-Qe,g=Math.hypot(w,_)+1e-4;if(g<.62){const Z=1-g/.62;s0=Z,u+=w/g*Z*4.5,d+=_/g*Z*4.5,A=Math.max(A,.2+Z*.9),F-=Z*.4,N=0}}F-=v0*.62,v0>.3&&!T&&(A=Math.min(A,.13));for(let w=0;w<W.length;w++)if(w!==a){const _=W[w],g=r.x-_.x,Z=r.z-_.z,y0=Math.hypot(g,Z)+1e-4,G0=(r.L+_.L)*(T?.13:.52);if(y0<G0&&Math.abs(r.y-_.y)<.4){const W0=(1-y0/G0)*(T?1.1:1.3);u+=g/y0*W0,d+=Z/y0*W0,T&&(r.yaw+=(i()-.5)*.02)}else!T&&y0<.9&&(u+=Math.cos(_.yaw)*.06,d+=Math.sin(_.yaw)*.06)}const H=l(r.x,r.z);if(H<.34){const w=n[0]-r.x,_=n[1]-r.z,g=Math.hypot(w,_)+1e-4,Z=(.34-H)*9;u+=w/g*Z,d+=_/g*Z}const $=t.home&&r0<7?1.02:1-.24*r.L;Math.abs(r.x)>$&&(u-=Math.sign(r.x)*(Math.abs(r.x)-$)*7),Math.abs(r.z)>$&&(d-=Math.sign(r.z)*(Math.abs(r.z)-$)*7);let T0=Math.atan2(d,u)-r.yaw;for(;T0>oe;)T0-=M;for(;T0<-oe;)T0+=M;const V0=T&&k<.55&&Math.abs(T0)>.75?1:0;V0&&(A=Math.min(A,.04));const ke=Math.min(.28+r.spd/(.42*r.L)+b*.7+s0*1.2+V0*1.1,2.4),ie=z(T0*1.5,-ke,ke);r.yaw+=ie*o;const Ke=A>r.spd?1+3*(b+s0):.5+V0*2.5;r.spd+=(A-r.spd)*Math.min(Ke*o,1);const Ne=Math.cos(r.yaw),we=Math.sin(r.yaw);r.x+=Ne*r.spd*o,r.z+=we*r.spd*o;const ra=z(F,-fe+.14,N>.1?.006:-.012-r.L*.075);r.y+=z(ra-r.y,-.26-b,.26+b*.5)*Math.min((.8+b*1.2+s0*2)*o,1)*(r.rise>0?1.8:1);const no=z((A-r.spd)*3+r.spd*2.2,0,2.3),sa=.5+.5*Math.sin(s*(.33+a%5*.07)+a*1.7),na=z(.42+no*.4+Math.abs(ie)*.45-sa*.2,.2,1.05);r.amp+=(na-r.amp)*Math.min(o*2.2,1),r.ph+=o*(1.9+no*7.2+Math.abs(ie)*2.2),r.fin+=(z(1.1-r.spd*2.2,0,1)-r.fin)*Math.min(o*2.2,1),r.flap+=o*(1.3+r.fin*1.8),r.mouth+=(N-r.mouth)*Math.min(o*9,1),r.pit+=((N>.1?.3:.07)-r.pit)*Math.min(o*2,1),r.roll+=(-ie*.34-r.roll)*Math.min(o*3,1);const I=r.nod,_e=r.L/(i0-1);I[0]=r.x,I[1]=r.y,I[2]=r.z;for(let w=1;w<i0;w++){const _=(w-1)*3,g=w*3;let Z=I[g]-I[_],y0=I[g+1]-I[_+1],G0=I[g+2]-I[_+2],W0=Math.hypot(Z,y0,G0)+1e-5;if(Z/=W0,y0/=W0,G0/=W0,w>1){const yt=(w-2)*3,Et=w<6?.55:w<11?.36:.16;Z+=((I[_]-I[yt])/_e-Z)*Et,y0+=((I[_+1]-I[yt+1])/_e-y0)*Et,G0+=((I[_+2]-I[yt+2])/_e-G0)*Et,W0=Math.hypot(Z,y0,G0)+1e-5,Z/=W0,y0/=W0,G0/=W0}I[g]=I[_]+Z*_e,I[g+1]=Math.min(I[_+1]+y0*_e,-.018),I[g+2]=I[_+2]+G0*_e,I[g+1]+=(Math.min(r.y,-.02)-r.pit*r.L*w/i0-I[g+1])*Math.min(o*1.1,1),w>1&&(I[g+1]=Math.min(I[g+1],-.012-r.L*.122*(w<6?.55+w*.09:1.05-(w-6)*.07)+b*.05))}const Rt=z(1+r.y/.26,0,1);if(Rt>.05){const w=r.spd;if(r.wake-=o,w>.05&&r.wake<=0){r.wake=.05;const _=z(w*.06,0,.022)*Rt*Rt;d0(r.x+Ne*.035,r.z+we*.035,.038+r.L*.018,_*.5);const g=5*3;d0(I[g],I[g+2],.05+r.L*.03,-_*.35);const Z=13*3;d0(I[Z],I[Z+2],.03,Math.sin(r.ph*1)*_*.4)}}if(r.mouth>.3&&r.y>-.022&&(r.pulse-=o,r.pulse<=0)){r.pulse=.18+i()*.08;const w=r.x+Ne*r.L*.012,_=r.z+we*r.L*.012;d0(w,_,.03+r.L*.012,r.rise>0?-.0135:-.0095),ge<=0&&(R0.note(60+i()*4,{dur:.07,vel:.14,wave:"sine",cutoff:900,attack:.002,pan:z(r.x,-1,1)}),ge=.08)}}},aa=o=>{for(let s=H0.length-1;s>=0;s--){const a=H0[s];if(a.on+=o,a.dead||a.on>a.life+2.5){H0.splice(s,1);continue}a.vx*=1-o*1.4,a.vz*=1-o*1.4,a.x+=a.vx*o,a.z+=a.vz*o;for(const r of W){const v=a.x-r.x,E=a.z-r.z,y=Math.hypot(v,E)+1e-4;y<.1&&r.y>-.18&&(a.vx+=v/y*o*.75,a.vz+=E/y*o*.75)}if(Te){const r=a.x-Ye,v=a.z-Qe;Math.hypot(r,v)+1e-4<.12&&(a.vx+=xt*o*4,a.vz+=pt*o*4)}}for(let s=a0.length-1;s>=0;s--){const a=a0[s];if(a.y>5e-4&&!a.lily)a.sw+=o*2.1,a.tumb+=o*1.9,a.tumb2+=o*1.3,a.x+=Math.sin(a.sw)*o*.09,a.z+=Math.cos(a.sw*.7)*o*.05,a.y-=o*(.22+.1*Math.sin(a.sw*2)),a.ang+=o*.5,a.y<=5e-4&&(a.y=0,d0(a.x,a.z,.02,-.0065),i()<.7&&R0.hit("noise",.05,{cutoff:2400,dur:.05,pan:z(a.x,-1,1)}));else{if(a.tumb*=1-Math.min(o*8,1),a.tumb2*=1-Math.min(o*8,1),a.lily===2){a.x=a.px.x+a.ox,a.z=a.px.z+a.oz;continue}const r=a.lily?2.5:1;a.vx*=1-Math.min(o*.7*r,1),a.vz*=1-Math.min(o*.7*r,1);const v=Math.sin(r0*.06+1.4)*.006,E=Math.cos(r0*.05)*.005;a.x+=(a.vx+v*(a.lily?.3:1))*o,a.z+=(a.vz+E*(a.lily?.3:1))*o,a.ang+=(a.spin+(a.vx-a.vz)*2)*o;for(const u of W)if(u.y>-.22){const d=a.x-u.x,A=a.z-u.z,F=Math.hypot(d,A)+1e-4;if(F<.16){const N=(1-F/.16)*(1+u.y*4)*u.spd;a.vx+=(d/F*.7+Math.cos(u.yaw)*.5)*N*o*6,a.vz+=(A/F*.7+Math.sin(u.yaw)*.5)*N*o*6}}if(Te){const u=a.x-Ye,d=a.z-Qe;Math.hypot(u,d)+1e-4<.14&&(a.vx+=xt*o*5,a.vz+=pt*o*5)}const y=l(a.x,a.z);if(y<.1){const u=n[0]-a.x,d=n[1]-a.z,A=Math.hypot(u,d)+1e-4;a.vx+=u/A*(.1-y)*o*8,a.vz+=d/A*(.1-y)*o*8}if(Math.abs(a.x)>1.25||Math.abs(a.z)>1.25){if(a0.length>8){a0.splice(s,1);continue}a.x=z(a.x,-1.2,1.2),a.z=z(a.z,-1.2,1.2)}}}for(let s=Ae.length-1;s>=0;s--){const a=Ae[s];a.vy-=3.8*o,a.x+=a.vx*o,a.y+=a.vy*o,a.z+=a.vz*o,a.y<0&&(d0(a.x,a.z,.008+a.r,-.0045),Ae.splice(s,1))}if(K)for(let s=0;s<100;s++){const a=s*5;K[a+3]+=o*1.3,K[a]+=Math.sin(K[a+3])*o*.04,K[a+2]+=Math.cos(K[a+3]*.8)*o*.03,K[a+1]-=o*.24,K[a+1]<0&&(d0(K[a],K[a+2],.011,-.0022),K[a]=(i()-.5)*2.4,K[a+1]=1.1+i()*.3,K[a+2]=(i()-.5)*2.4)}},$t=o=>{r0+=o,ge-=o;const s=t.input;Te=!1;let a=null;if(s.inside&&s.down){if(!vt){mt=r0,ht=s.x,dt=s.y,Se=0,Fe=!1;const F=ve(s.x,s.y);ye=F[0],Ee=F[1]}Se=Math.max(Se,Math.hypot(s.x-ht,s.y-dt));const u=ve(s.x,s.y),d=(u[0]-ye)/Math.max(o,.001),A=(u[1]-Ee)/Math.max(o,.001);if(Se>=.03){Te=!0,Ye=u[0],Qe=u[1],xt=d,pt=A;const F=Math.hypot(u[0]-ye,u[1]-Ee),N=Math.min(4,1+Math.floor(F/.04)),b=z(Math.hypot(d,A),0,3);for(let T=1;T<=N;T++){const k=T/N;d0(ye+(u[0]-ye)*k,Ee+(u[1]-Ee)*k,.03,-.012*z(.5+b*.5,0,1.6)/Math.sqrt(N))}b>.3&&i()<o*7&&R0.hit("noise",.05+b*.04,{cutoff:1300+b*400,dur:.13,pan:z(u[0],-1,1)})}else r0-mt>.33&&(Fe=!0);ye=u[0],Ee=u[1]}else vt&&!Fe&&Se<.03&&r0-mt<.33&&(a=ve(ht,dt)),Fe=!1;if(s.taps(),vt=s.inside&&s.down,a&&oa(a[0],a[1]),v0+=((Fe?1:Q0)-v0)*Math.min(o*(Fe?1.5:.6),1),v0<.002&&(v0=0),v0>.05){const u=Math.floor(v0*3+i());for(let d=0;d<u;d++)d0((i()-.5)*2.2,(i()-.5)*2.2,.014+i()*.009,-.0032);bt-=o,bt<=0&&(bt=.28,R0.hit("noise",.11*v0+.03,{cutoff:4600,dur:.56,pan:i()-.5}),R0.hit("hat",.018*v0,{pan:i()-.5}))}if(r0>Ht&&(Ht=r0+J.fall*(.6+i()*.8),a0.length<lt-8&&J.leafN>0&&!Xt)){const u=Xe((i()-.5)*1.9,(i()-.5)*1.9,.9+i()*.5,Wt());U.season==="autumn maple"&&(u.cell=[0,1,2,10,11][Math.floor(V()*5)]),a0.push(u)}if(r0>Yt){Yt=r0+3.5+i()*6;const u=W[t.home&&r0<6?0:Math.floor(i()*W.length)];if(t.home&&r0<6)u.rise=3.2,u.riseX=u.x+Math.cos(u.yaw)*.05,u.riseZ=u.z+Math.sin(u.yaw)*.05;else if(v0<.3&&!H0.length&&!Te){const d=u.yaw+(i()-.5)*.6,A=.08+i()*.12,F=u.x+Math.cos(d)*A,N=u.z+Math.sin(d)*A;l(F,N)>.3&&Math.abs(F)<.86&&Math.abs(N)<.86&&(u.rise=2.6+i()*1.6,u.riseX=F,u.riseZ=N)}}r0>Qt&&(Qt=r0+1.8+i()*2.8,R0.note(75+Math.floor(i()*5),{dur:.11,vel:.07,wave:"sine",cutoff:2200,attack:.005,pan:.6}),R0.hit("noise",.018,{cutoff:2100,dur:.55,pan:.6})),r0>Kt&&(Kt=r0+.5+i()*.2,R0.hit("noise",.012,{cutoff:3100,dur:.5,pan:.55})),jt(o),aa(o);for(let u=0;u<W.length;u++){const d=W[u],A=u*Ie*4;for(let b=0;b<i0;b++)u0[A+b*4]=d.nod[b*3],u0[A+b*4+1]=d.nod[b*3+1],u0[A+b*4+2]=d.nod[b*3+2];const F=A+i0*4;u0[F]=d.L,u0[F+1]=d.wid,u0[F+2]=d.mouth,u0[F+3]=d.roll;let N=0;for(let b=0;b<i0;b+=3)d.nod[b*3+1]>-.06&&(N=1);u0[F+4]=d.ph,u0[F+5]=d.amp,u0[F+6]=d.fin,u0[F+7]=N,u0[F+8]=Gt?1.42:1,u0[F+9]=Gt?1.75:1,u0[F+10]=d.flap,u0[F+11]=0}let r=0;for(let u=0;u<a0.length&&r<lt;u++){const d=a0[u],A=r*12;A0[A]=d.x,A0[A+1]=d.y,A0[A+2]=d.z,A0[A+3]=d.ang,A0[A+4]=d.size,A0[A+5]=d.curl*(1-v0*.2),A0[A+6]=d.cell,A0[A+7]=d.sd;const F=d.y>5e-4&&!d.lily;A0[A+8]=F?Math.sin(d.tumb)*.9:0,A0[A+9]=F?Math.sin(d.tumb2)*.9:0,A0[A+10]=0,A0[A+11]=0,r++}Y0=r;let v=0;const E=(u,d,A,F,N,b)=>{if(v<qt){const T=v*6;ee[T]=u,ee[T+1]=d,ee[T+2]=A,ee[T+3]=F,ee[T+4]=N,ee[T+5]=b,v++}};for(const u of H0){const d=z((u.on-u.life)/2.5,0,1);E(u.x,.006-d*.05,u.z,u.r*1.25,0,1-d)}for(const u of Ae)E(u.x,u.y,u.z,u.r,1,1);if(K)for(let u=0;u<100;u++){const d=u*5,A=K[d+1];E(K[d],A,K[d+2],K[d+4]*(1+A*.3),2,.92/(1+A*.4))}De=v;const y=r0;m[0]=y,m[1]=v0,m[2]=Math.sin(y*.11)*.006+Math.sin(y*.37)*.002,m[3]=Math.cos(y*.09)*.006,m[4]=y*.012,m[5]=y*.009,m[6]=-y*.015,m[7]=y*.021,m[8]=y*.0031,m[9]=y*.0023,m[10]=Oe+v0*.5,m[11]=0,m[12]=0,m[13]=D<=400?0:4,m[14]=v0>0?D<=400?1:3:0,m[15]=.2};let Y0=0,De=0;const Zt=()=>{e.bindBuffer(e.UNIFORM_BUFFER,G),e.bufferSubData(e.UNIFORM_BUFFER,0,m),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,0,Q),e.bindBufferBase(e.UNIFORM_BUFFER,1,G),P(9,ct),e.texSubImage2D(e.TEXTURE_2D,0,0,0,Ie,N0,e.RGBA,e.FLOAT,u0),P(14,x.noise),P(12,x.atlas),P(11,x.scale),P(7,x.tile),P(8,x.ring),P(4,Je),P(5,Lt),P(6,et),P(10,St),P(0,rt),P(1,st),P(2,nt),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!0)},At=o=>{if(Le){e.viewport(0,0,c0,c0),te.n&&(e.bindFramebuffer(e.FRAMEBUFFER,at[Re]),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.colorMask(!0,!0,!1,!1),e.useProgram(L.splat),e.bindVertexArray(ft),e.bindBuffer(e.ARRAY_BUFFER,Ct),e.bufferData(e.ARRAY_BUFFER,be.subarray(0,te.n*4),e.DYNAMIC_DRAW),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,te.n),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),te.n=0),e.useProgram(L.sim),e.bindVertexArray(x.vao0);for(let s=0;s<o;s++)P(13,We[Re]),e.bindFramebuffer(e.FRAMEBUFFER,at[1-Re]),e.drawArrays(e.TRIANGLES,0,3),Re=1-Re}},Jt=()=>{P(13,We[Re]),P(0,null),e.bindFramebuffer(e.FRAMEBUFFER,Ho),e.viewport(0,0,t0,t0),e.useProgram(L.surf),e.bindVertexArray(x.vao0),e.drawArrays(e.TRIANGLES,0,3),Le&&Y0&&(e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(L.dim),e.bindVertexArray(Pe),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Y0),e.disable(e.BLEND)),P(0,rt),P(1,null),e.bindFramebuffer(e.FRAMEBUFFER,Yo),e.viewport(0,0,D0,D0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(L.cau),e.bindVertexArray(x.vaoCau),e.drawElements(e.TRIANGLES,x.nC,e.UNSIGNED_SHORT,0),P(1,st),e.disable(e.BLEND)},eo=()=>{P(2,null),e.bindFramebuffer(e.FRAMEBUFFER,Qo),e.viewport(0,0,se,se),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(L.fsh),e.bindVertexArray(x.vaoFish),e.drawElementsInstanced(e.TRIANGLES,x.nB,e.UNSIGNED_SHORT,0,W.length),Y0&&(e.useProgram(L.lsh),e.bindVertexArray(Pe),e.drawElementsInstanced(e.TRIANGLES,x.QN,e.UNSIGNED_SHORT,0,Y0)),e.disable(e.BLEND),P(2,nt)},to=()=>{P(3,null),e.bindFramebuffer(e.FRAMEBUFFER,Ko),e.viewport(0,0,D,D),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.useProgram(L.bot),e.bindVertexArray(x.vao0),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.useProgram(L.body),e.uniform1f(Vt,0),e.bindVertexArray(x.vaoFish),e.drawElementsInstanced(e.TRIANGLES,x.nB,e.UNSIGNED_SHORT,0,W.length),e.depthMask(!1),e.colorMask(!0,!0,!0,!1),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(L.fin),e.drawElementsInstanced(e.TRIANGLES,x.nF,e.UNSIGNED_SHORT,x.nB*2,W.length),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.depthMask(!0),e.colorMask(!0,!0,!0,!0),P(3,Dt)},oo=()=>{e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,D,D),e.useProgram(L.comp),e.bindVertexArray(x.vao0),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.SCISSOR_TEST),e.scissor(0,0,D,D),e.colorMask(!0,!0,!0,!1),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.useProgram(L.body),e.uniform1f(Vt,1),e.bindVertexArray(x.vaoFish),e.drawElementsInstanced(e.TRIANGLES,x.nB,e.UNSIGNED_SHORT,0,W.length),e.disable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),Y0&&(e.useProgram(L.leaf),e.bindVertexArray(Pe),e.drawElementsInstanced(e.TRIANGLES,x.QN,e.UNSIGNED_SHORT,0,Y0)),De&&(e.useProgram(L.pt),e.bindVertexArray(ut),e.drawArrays(e.POINTS,0,De)),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(null),e.bindBufferBase(e.UNIFORM_BUFFER,0,null),e.bindBufferBase(e.UNIFORM_BUFFER,1,null)},ao=()=>{Y0&&(e.bindBuffer(e.ARRAY_BUFFER,kt),e.bufferData(e.ARRAY_BUFFER,A0.subarray(0,Y0*12),e.DYNAMIC_DRAW)),De&&(e.bindBuffer(e.ARRAY_BUFFER,Ot),e.bufferData(e.ARRAY_BUFFER,ee.subarray(0,De*6),e.DYNAMIC_DRAW))},ro=(o,s)=>{const a=Math.min(s,.1),r=a>.05?2:1;for(let y=0;y<r;y++)$t(a/r);Zt(),ao(),He+=a;const v=D<=400?1/30:1/60;let E=0;for(;He>=v&&E<3;)He-=v,E++;E>=3&&(He=0),At(E),Jt(),eo(),to(),oo()};if(!t.home){for(const o of W)o.tt=0;for(let o=0;o<300||o<1200&&Math.hypot(W.reduce((s,a)=>s+a.x,0),W.reduce((s,a)=>s+a.z,0))>.3*W.length;o++)jt(.05);te.n=0}if($t(1/30),t.home){const o=W[0];d0(o.x+.02,o.z-.02,.03,-.022)}else{const o=W[0];d0(o.x,o.z,.03,-.015)}Zt(),ao(),At(D<=400?10:22);for(let o=0;o<3;o++)d0((i()-.5)*1.6,(i()-.5)*1.6,.024,-.012);return At(D<=400?6:12),Jt(),eo(),to(),oo(),e.bindFramebuffer(e.FRAMEBUFFER,null),Ut&&Ut.register(ro,{gl:e,b:O0,t:f0,f:h0,v:n0,r:de}),ro}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
