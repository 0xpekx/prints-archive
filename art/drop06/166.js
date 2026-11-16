// Bait Ball: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/166.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(M0){M0&&function(){"use strict";const k0=new WeakMap,S0=Math.PI,ye=2*S0,J=(t,e,n)=>t<e?e:t>n?n:t,S=`#version 300 es
// w166 r91ae04
precision highp float;
precision highp int;
precision highp sampler2D;
`,oe=`layout(std140) uniform S { vec4 s[16]; };
layout(std140) uniform D { vec4 d[32]; };
`,H=32,be=6,Z=H*be,t0=S+`out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,f0=`
vec3 W(vec3 v) { // the water seen along a ray, no surface
  float e = v.y;
  vec3 c = mix(s[5].rgb, s[6].rgb, smoothstep(-0.22, 0.3, e));
  c = mix(c, s[7].rgb, smoothstep(0.22, 0.85, e));
  float m = max(dot(v, s[4].xyz), 0.0), m2 = m * m;
  return c + s[7].rgb * (m2 * m2 * m2 * 0.2) * s[4].w;
}
vec3 FIN(vec3 c) { // tone curve, lens falloff, display gamma
  c *= s[7].w;
  c = (c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14);
  vec2 q = gl_FragCoord.xy / s[2].w - 0.5;
  c *= 1.0 - 0.55 * dot(q, q);
  return pow(clamp(c, 0.0, 1.0), vec3(0.4545));
}
`,at=S+`in vec2 vUv; out vec4 o; uniform vec4 uW[28]; uniform int uN;
void main() {
  vec2 p = vUv * 6.2831853, g = vec2(0.0); vec3 H = vec3(0.0); float h = 0.0;
  for (int i = 0; i < uN; i++) { vec4 w = uW[i]; float a = dot(w.xy, p) + w.w, sn = sin(a), cs = cos(a);
    h += w.z * sn; g += w.xy * w.z * cs; H -= vec3(w.x * w.x, w.x * w.y, w.y * w.y) * w.z * sn; }
  // caustic: how much the wrinkled surface focuses parallel light at a depth below it
  float f = 0.34, det = (1.0 - f * H.x) * (1.0 - f * H.z) - f * f * H.y * H.y;
  float ca = 1.0 / (0.16 + abs(det));
  o = vec4(g * 0.16 + 0.5, h * 0.25 + 0.5, clamp(ca * 0.125, 0.0, 1.0));
}`,rt=S+oe+`layout(location=0) in vec4 aP; layout(location=1) in vec4 aV; out vec4 vC;
void main() {
  uint h = (uint(gl_VertexID) + uint(d[0].z) * 977u) * 2654435761u; h ^= h >> 15; h *= 2246822519u;
  vec3 j = vec3(float(h & 255u), float((h >> 8) & 255u), float((h >> 16) & 255u)) / 255.0;
  h *= 3266489917u; h ^= h >> 13;
  j += vec3(float(h & 255u), float((h >> 8) & 255u), float((h >> 16) & 255u)) / 255.0 - 1.0;
  vec3 g = (aP.xyz - d[2].xyz) * d[2].w + j * 1.25;
  float z = floor(g.z);
  vec2 q = floor(g.xy);
  bool out_ = z < 0.0 || z > ${(H-1).toFixed(1)} || min(q.x, q.y) < 0.0 || max(q.x, q.y) > ${(H-1).toFixed(1)};
  vec2 px = (vec2(mod(z, ${be.toFixed(1)}), floor(z / ${be.toFixed(1)})) * ${H.toFixed(1)} + q + 0.5) / ${Z.toFixed(1)};
  gl_Position = out_ ? vec4(2.0, 2.0, 0.0, 1.0) : vec4(px * 2.0 - 1.0, 0.0, 1.0);
  gl_PointSize = 1.0;
  vC = vec4(aV.xyz * step(0.5, d[5].w), 1.0) * d[5].w;
}`,it=S+"in vec4 vC; out vec4 o; void main() { o = vC; }",nt=S+oe+`in vec2 vUv; out vec4 o; uniform sampler2D uG; uniform sampler2D uM;
const ivec3 NB[6] = ivec3[6](ivec3(1,0,0), ivec3(-1,0,0), ivec3(0,1,0), ivec3(0,-1,0), ivec3(0,0,1), ivec3(0,0,-1));
void main() {
  ivec2 px = ivec2(gl_FragCoord.xy), tl = px / ${H};
  ivec3 c = ivec3(px - tl * ${H}, tl.x + tl.y * ${be});
  vec4 m = texelFetch(uM, px, 0);
  float sum = 0.0, gx = 0.0, gz = 0.0;
  for (int i = 0; i < int(d[30].x); i++) {
    ivec3 n = clamp(c + NB[i], ivec3(0), ivec3(${H-1}));
    float e = texelFetch(uM, ivec2(n.x + (n.z % ${be}) * ${H}, n.y + (n.z / ${be}) * ${H}), 0).r;
    sum += e; gx += e * float(NB[i].x); gz += e * float(NB[i].z);
  }
  float rho = texelFetch(uG, px, 0).a / max(d[5].w, 0.001);
  float here = smoothstep(0.5, 2.5, rho), rest = 1.0 - smoothstep(0.03, 0.12, m.g);
  uint hs = (uint(px.x) * 73856093u) ^ (uint(px.y) * 19349663u) ^ (uint(d[0].z) * 83492791u); hs ^= hs >> 13; hs *= 1274126177u;
  float th = 0.22 + 0.5 * float(hs & 1023u) / 1023.0;
  float tgt = smoothstep(th, th + 0.3, sum) * rest * here;
  for (int i = 0; i < int(d[30].y); i++) {
    vec4 q = d[22 + i]; float r = length(vec3(c) + 0.5 - q.xyz);
    tgt = max(tgt, here * rest * step(0.001, q.w) * (1.0 - smoothstep(q.w, q.w + 1.5, r)));
  }
  float e = tgt > m.r ? m.r + (tgt - m.r) * 0.6 : m.r * 0.7;
  float rf = max(m.g * 0.94, m.g + (e - m.g) * 0.3);
  o = vec4(e, rf, gx, gz);
}`,U0=t=>S+`#define FORM ${t}
`+oe+`layout(location=0) in vec4 aP; layout(location=1) in vec4 aV; layout(location=2) in vec4 aX;
out vec4 oP; out vec4 oV; out vec4 oX;
uniform sampler2D uG; uniform sampler2D uM;
const vec3 OFF[7] = vec3[7](vec3(0.0), vec3(1.5,0.0,0.0), vec3(-1.5,0.0,0.0), vec3(0.0,1.5,0.0), vec3(0.0,-1.5,0.0), vec3(0.0,0.0,1.5), vec3(0.0,0.0,-1.5));
vec2 sl(float z, vec2 q) { return (vec2(mod(z, ${be.toFixed(1)}), floor(z / ${be.toFixed(1)})) * ${H.toFixed(1)} + q) / ${Z.toFixed(1)}; }
void main() {
  float id = float(gl_VertexID), r1 = fract(id * 0.61803399), r2 = fract(id * 0.7548777), r3 = fract(id * 0.5698403);
  float T = d[0].x, dt = d[0].y;
  vec3 p = aP.xyz, v = aV.xyz, g = (p - d[2].xyz) * d[2].w;
  // what the fish feels from its neighbours, and how much school lies between it and the sun
  vec3 grad = vec3(0.0), mo = vec3(0.0); float rho = 0.0, sunD = 0.0;
  for (int i = 0; i < int(d[0].w); i++) {
    float k = float(i);
    vec3 q = i < 7 ? g + OFF[i] : g + s[4].xyz * (k - 6.0) * (k - 6.0) * 1.3;
    vec3 c = clamp(q, vec3(0.5), vec3(${(H-.5).toFixed(1)}));
    float z = c.z - 0.5, z0 = floor(z);
    vec4 a = mix(textureLod(uG, sl(z0, c.xy), 0.0), textureLod(uG, sl(z0 + 1.0, c.xy), 0.0), z - z0);
    if (i == 0) { mo = a.xyz; rho = a.w; }
    else if (i < 7) grad += OFF[i] * a.w;
    else sunD += a.w;
  }
  float w = max(d[5].w, 0.001), rho0 = d[5].y; rho /= w; grad /= w; sunD /= w;
  vec3 c0 = clamp(g, vec3(0.5), vec3(${(H-.5).toFixed(1)}));
  float z = c0.z - 0.5, z0 = floor(z);
  vec4 me = mix(textureLod(uM, sl(z0, c0.xy), 0.0), textureLod(uM, sl(z0 + 1.0, c0.xy), 0.0), z - z0);
  float E = me.r, Rf = me.g; vec2 gw = me.ba;

  vec3 C = d[1].xyz; float R = d[1].w;
  float fear = aV.w;
  // attraction to the group; a cut ball pulls to two lobes that drift back together
  float sd = dot(p - C, d[4].xyz);
  vec3 r = p - C - d[4].xyz * d[4].w * (sd >= 0.0 ? 1.0 : -1.0);
  // the confinement: q is the offset it works on, Rc its radius (the ball: the offset from the centre, and R)
  vec3 q = r; float Rc = R, lk = 1.0;
#if FORM == 1
  // a mill with room: the fish circle the axis round a hole that is never round and drifts; the band is twice as thick
  // on one side as on the other; one fish in seventy keeps to the whole disc, so single fish cut across the hole
  vec3 A = d[3].xyz, e1 = normalize(cross(A, vec3(0.0, 0.0, 1.0))), e2 = cross(A, e1);
  vec3 rp = r - A * dot(r, A);
  vec3 u = rp / (length(rp) + 0.001);
  float cs = dot(u, e1), sn = dot(u, e2), ph = T * 0.045 + d[24].w, al = T * 0.026 - d[24].w;
  float Rr = R * d[24].z * (1.0 + 0.13 * (cs * 0.8 + sn * 0.6) + 0.14 * ((cs * cs - sn * sn) * cos(ph) + 2.0 * cs * sn * sin(ph)));
  Rc = R * d[25].w * (1.0 + 0.44 * (cs * cos(al) + sn * sin(al)) + 0.1 * sin(dot(u, vec3(5.0, 3.0, 4.0)) + T * 0.11));
  if (r2 > 0.986) Rc += Rr; else q = r - u * Rr;
  lk = 1.7;
#endif
#if FORM == 2
  // a pillar hung from the surface: a head spread wide under the lid, a waist, a tail that narrows and sways (the sway
  // grows with depth squared, from two unequal clocks in d[25].xz)
  float yn = r.y / (R * d[5].z), dep = max(-yn, 0.0);
  q.xz -= d[25].xz * dep * dep;
  Rc = R * (1.0 + 0.7 * smoothstep(0.1, 0.75, yn) - 0.4 * smoothstep(0.0, -0.7, yn));
  lk = 1.9;
#endif
  vec3 rs = vec3(q.x, q.y / d[5].z, q.z);
  float dist = length(rs) + 0.001;
  vec3 rh = rs / dist;
  float lump = 1.0 + lk * (0.16 * sin(rh.x * 3.1 + T * 0.37 + 1.0) * sin(rh.y * 2.7 - T * 0.29) + 0.1 * sin(rh.z * 4.3 + rh.x * 2.0 + T * 0.23) + 0.08 * sin(rh.x * 7.0 - rh.y * 5.0 + rh.z * 6.0 + T * 0.5)) + 0.38 * step(0.92, r2);
  float out1 = dist / (Rc * lump * (1.0 - 0.22 * min(d[4].w / R, 1.0)));
  vec3 acc = -rh * (0.8 * out1 + 16.0 * max(out1 - 0.97, 0.0) + 1.2 * out1 * out1 * out1);
#if FORM == 2
  // inside the column the pull is sideways, and each fish keeps to its own depth in it (more of them up in the wide head)
  acc.y *= 0.2 + 0.8 * smoothstep(0.85, 1.0, out1);
  acc.y += ((-0.62 + 1.42 * sqrt(r3)) * R * d[5].z - r.y) * 0.45;
#endif
  // fish at the rim swim along it, not in and out of it: no fish's heading bristles straight out of the ball
  acc -= rh * dot(v, rh) * 2.6 * smoothstep(0.8, 1.05, out1) * (1.0 - 0.5 * min(fear, 1.0));
  // collision avoidance: pressure from neighbours where the school is packed past its comfort
  float pk = smoothstep(0.55, 1.15, rho / rho0);
  acc -= grad / (2.0 * rho0) * 6.5 * pk;
  // alignment with whoever shares the cell
  if (rho > 0.5 && w > 0.5) acc += (mo / rho - v) * 1.1;
  // the ball mills around its turning axis
  vec3 mill = cross(d[3].xyz, r) / R * d[3].w * mix(1.0, clamp(dot(r, d[3].xyz) / (0.3 * R), -1.0, 1.0), d[24].x);
  acc += (mill - v) * (1.5 * (1.0 - min(fear, 1.0)) + 0.2);
  // seething: slow shared eddies, plus each fish's own wander
  acc += 0.32 * vec3(sin(p.y * 4.1 + T * 0.9 + 1.9 * p.z), sin(p.z * 4.3 + T * 0.7 + 1.7 * p.x), sin(p.x * 3.9 - T * 0.8 + 2.1 * p.y));
  acc += 0.42 * vec3(sin(T * (1.3 + r1) + r2 * 40.0), sin(T * (1.1 + r2) + r3 * 40.0), sin(T * (1.2 + r3) + r1 * 40.0));
  // predators: fish ahead of one dart aside and back, a fountain that closes behind it
  for (int i = 0; i < int(d[30].z); i++) {
    vec4 P = d[6 + i * 2], Q = d[7 + i * 2];
    if (Q.w > 0.0) {
      vec3 rel = p - P.xyz; float sp = length(Q.xyz);
      vec3 dir = sp > 0.3 ? Q.xyz / sp : vec3(0.0);
      float al = dot(rel, dir);
      vec3 rad = rel - dir * al; float rl = length(rad) + 0.001;
      float zone = exp(-rl * rl / (P.w * P.w)) * smoothstep(-P.w * 1.1, -P.w * 0.1, al) * (1.0 - smoothstep(P.w * 0.2, P.w * (0.7 + sp * 0.1), al));
      acc += (rad / rl - dir * 0.3) * zone * Q.w * 24.0;
      fear = max(fear, zone * min(Q.w, 1.0));
    }
  }
  // flash expansion: the whole neighbourhood of a strike bursts outward at once
  for (int i = 0; i < int(d[30].w); i++) {
    vec4 A = d[14 + i];
    if (A.w >= 0.0 && A.w < 0.7) {
      // it opens a hole round the strike, not a star: the push fades well inside the ball, and the shell closes it
      vec3 rel = p - A.xyz; float rl = length(rel) + 0.001, fr = 0.5 * R + A.w * 1.2;
      float zone = exp(-rl * rl / (fr * fr)) * exp(-A.w * 6.0);
      acc += rel / rl * zone * (24.0 + 18.0 * r1);
      fear = max(fear, zone * 1.1);
    }
  }
  // the wave: fish in the front of it turn away from where it came from
  float gl = length(gw);
  vec2 gd = gl > 0.02 ? gw / gl : vec2(0.0);
  acc.xz -= gd * E * 1.0;
  fear = max(fear, E * 0.16);
  fear *= exp(-dt * 1.0);
  // the surface is a lid
  if (p.y > -0.32) acc.y -= (p.y + 0.32) * 26.0;
  float sp = length(v) + 0.001;
  acc += v / sp * ((d[5].x * (0.85 + 0.3 * r2) * (1.0 + fear * 3.4)) - sp) * 2.2;

  acc.y -= v.y * (3.4 - 2.4 * min(fear, 1.0));
  v += acc * dt;
  sp = length(v) + 0.001;
  if (sp > 7.0) v *= 7.0 / sp;
  p += v * dt;
  // the school holds its shape as a drift of the whole body, without tipping the fish
  p -= vec3(rh.x, rh.y * d[5].z, rh.z) * max(out1 - 0.99, 0.0) * Rc * dt * 3.0 * (1.0 - 0.5 * min(fear, 1.0));
  p.y = min(p.y, -0.05 - 0.12 * r3);

  // body attitude: bank into the turn; the wave rocks each fish one way, then the other
  vec3 H = v / max(length(v), 0.001);
  vec3 S0 = normalize(cross(H, vec3(0.0, 1.0, 0.0)) + vec3(0.0001, 0.0, 0.0));
  float lat = dot(acc, S0);
  float side = clamp(-dot(p - C, S0) / R * 5.0 + (r1 - 0.5) * 0.25, -1.0, 1.0);
  float rock = side * (smoothstep(0.03, 0.42, E) * s[15].x - smoothstep(0.1, 0.6, Rf - E) * 0.42);
  float rollT = clamp(lat * 0.075, -0.65, 0.65) + rock + 0.06 * sin(T * (1.0 + r2) + r3 * 60.0) + 0.5 * min(fear, 1.0) * sin(r1 * 97.0 + T * 8.0);
  float roll = aP.w + (rollT - aP.w) * (1.0 - exp(-dt * 11.0));

  float lit = exp(-sunD / max(rho0, 0.5) * 0.85);
  oP = vec4(p, roll);
  oV = vec4(v, fear);
  oX = vec4(aX.x + (lit - aX.x) * 0.2, E, mod(aX.z + dt * (10.0 + 11.0 * sp) * (0.85 + 0.3 * r1), 62.831853), 0.0);
  gl_Position = vec4(2.0, 2.0, 0.0, 1.0); gl_PointSize = 1.0;
}`,B0=S+"out vec4 o; void main() { o = vec4(0.0); }",ct=S+oe+`layout(location=0) in vec4 aP;
void main() {
  vec2 q = aP.xz + s[4].xz / s[4].y * (-aP.y);
  vec2 uv = (q - s[14].xy) * s[14].z;
  gl_Position = vec4(uv * 2.0 - 1.0, 0.0, 1.0); gl_PointSize = s[14].w;
}`,lt=S+"out vec4 o; void main() { o = vec4(1.0, 1.0, 1.0, 1.0) * 0.045; }",ft=S+oe+`in vec2 vUv; out vec4 o; uniform sampler2D uT; uniform sampler2D uSh;
void main() {
  vec2 q = vUv * 2.0 - 1.0;
  vec3 v = normalize(s[3].xyz * s[0].w + s[1].xyz * q.x + s[2].xyz * q.y);
  vec3 cam = s[0].xyz;
  float tMax = v.y > 0.03 ? min(-cam.y / v.y, 24.0) : 24.0;
  float n = d[31].x, dtt = tMax / n;
  vec2 sl = s[4].xz / s[4].y;
  float jit = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5;
  float sum = 0.0;
  for (int i = 0; i < int(n); i++) {
    float t = (float(i) + 0.5 + jit) * dtt;
    vec3 x = cam + v * t;
    float h = max(-x.y, 0.0);
    vec2 sp = x.xz + sl * h;
    vec2 spz = vec2(sp.x, sp.y * d[23].y) * d[23].z;
    // a few broad beams from the big wave lenses, many thin ones from the small: widths differ ten to one
    float a = textureLod(uT, spz * s[1].w * 0.19 + d[31].yz * 0.25, 2.0 + d[24].y).a;
    float b = textureLod(uT, spz * s[1].w * 0.83 - d[31].zy * 0.5 + 0.37, 2.4 + d[24].y).a;
    float l = (a * a * 0.48 + b * b * 0.105) * (0.3 + 1.2 * b); l *= l * 5.0 + 0.16;
    float sh = textureLod(uSh, (sp - s[14].xy) * s[14].z, 0.0).r;
    float below = smoothstep(d[1].y + d[1].w * 0.2, d[1].y - d[1].w * 0.6, x.y);
    l *= 1.0 - min(sh * 2.3, 0.94) * below;
    sum += l * smoothstep(0.0, d[23].x, t) * exp(-(h / s[4].y) * s[5].w * 2.4 - t * s[5].w * 0.8);
  }
  sum *= dtt * s[6].w;
  o = vec4(sqrt(clamp(sum, 0.0, 1.0)), 0.0, 0.0, 1.0);
}`,ht=S+oe+f0+`in vec2 vUv; out vec4 o; uniform sampler2D uT; uniform sampler2D uS2;
void main() {
  vec2 q = vUv * 2.0 - 1.0;
  vec3 v = normalize(s[3].xyz * s[0].w + s[1].xyz * q.x + s[2].xyz * q.y);
  vec3 cam = s[0].xyz;
  vec3 col = W(v);
  float t = -cam.y / max(v.y, 0.02);
  vec3 S0 = cam + v * t;
  vec4 a = texture(uT, S0.xz * s[1].w + d[31].yz);
  vec4 b = texture(uT, S0.xz * s[1].w * 1.73 - d[31].zy * 1.6 + 0.31);
  vec4 c2 = texture(uT, S0.xz * s[1].w * 4.6 + d[31].yz * 3.1 + 0.67);
  vec2 sl = (a.rg - 0.5) + (b.rg - 0.5) * 0.8 + (c2.rg - 0.5) * 0.5;
  // past the flat window's rim the wavelets that still pass sky are the steep ones: their tilt counts for more there
  float ccF0 = 1.0 - 1.769 * (1.0 - v.y * v.y), ccF = max(ccF0, 0.0), sk = s[3].w * (0.6 + 0.5 * d[23].w * smoothstep(0.0, -0.5, ccF0));
  vec3 n = normalize(vec3(-sl.x * sk, 1.0, -sl.y * sk));
  float ci = max(dot(v, n), 0.0);
  float st2 = 1.769 * (1.0 - ci * ci);
  // the mirror part of the ceiling: what the water below looks like, with the ball's own dark image in it
  vec3 rd = reflect(v, n);
  vec3 refl = mix(s[5].rgb * 1.3, s[6].rgb * 1.1, clamp(0.55 + rd.y * 1.6 + (a.b - 0.5) * 0.8, 0.0, 1.0)) * (0.75 + 1.4 * a.a * b.a);
  vec3 oc = d[1].xyz - S0; float tc = dot(oc, rd);
  float miss = sqrt(max(dot(oc, oc) - tc * tc, 0.0));
  refl *= 1.0 - 0.72 * (1.0 - smoothstep(d[1].w * 0.72, d[1].w * 1.15, miss)) * step(0.0, tc);
  // Snell's window: beyond the critical angle the surface is a mirror, inside it you see the sky
  float cc = 1.0 - st2;
  float F = cc <= 0.0 ? 1.0 : 0.02 + 0.98 * pow(1.0 - sqrt(cc), 4.0);
  // a facet tipped near the critical angle passes only a sliver of sky: the window fades into the mirror, no cut edge
  F = max(F, 1.0 - smoothstep(0.0, 0.42 - 0.22 * d[23].w, cc));
  // far out past the flat window's rim a facet would have to tip a long way to pass sky: the mirror holds there
  F = mix(1.0, F, smoothstep(-0.6 - 0.3 * d[23].w, 0.0, ccF0));
  vec3 air = normalize(v * 1.33 + n * (sqrt(max(cc, 0.0)) - 1.33 * ci));
  float m = max(dot(air, s[12].xyz), 0.0);
  float lines = a.a * b.a * 4.0 / (4.0 + max(t - 5.0, 0.0));
  float ay = clamp(air.y, 0.0, 1.0);
  // each wavelet is a filled scale of sky: lighter on the side tipped toward the bright sky (its refracted ray against
  // the flat surface's), shading across; the caustic ridges only sharpen a lit side, they never outline a scale
  vec3 airF = normalize(v * 1.33 + vec3(0.0, sqrt(ccF) - 1.33 * v.y, 0.0));
  float lit = smoothstep(-1.0, 1.0, (m - max(dot(airF, s[12].xyz), 0.0)) * 7.0 + (ay - clamp(airF.y, 0.0, 1.0)) * 2.0);
  // the rim: the sky near the horizon squeezed into a warm band on the window's side of the flat edge, inside the scales
  float rim = smoothstep(-0.06, 0.0, ccF0) * exp(-ccF * 9.0) * (1.0 - F);
  vec3 sky = mix(s[7].rgb * 1.5, s[8].rgb * 0.34, ay * ay * 0.8 + pow(m, 5.0) * 0.5) * (0.4 + 0.1 * d[23].w + (1.25 + 0.85 * d[23].w + 0.4 * lines) * lit) + s[8].rgb * (pow(m, 24.0) * 0.2 + pow(m, 160.0) * 2.5 + pow(m, 900.0) * 30.0) * s[4].w;
  vec3 surf = mix(sky, refl, F);
  surf += s[8].rgb * vec3(1.15, 1.0, 0.8) * rim * 0.3 * (0.4 + 0.8 * lit);
  surf *= exp(-max(t - 6.5, 0.0) * s[5].w * s[11].w * s[15].yzw);
  float A = smoothstep(0.02, 0.1, v.y) * exp(-t * s[5].w * mix(0.55, 1.5, F));
  col = mix(col, surf, A);
  float px = 2.2 / d[31].w, sh = 0.0;
  for (int i = 0; i < 4; i++) { vec2 o2 = vec2(float(i & 1) * 2.0 - 1.0, float(i >> 1) * 2.0 - 1.0) * px; float r = textureLod(uS2, vUv + o2, 0.0).r; sh += r * r; }
  col += s[7].rgb * sh * 0.25 * 2.6;
  o = vec4(FIN(col) + (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 180.0, 1.0);
}`,h0=`
vec4 PJ(vec3 p) { vec3 r = p - s[0].xyz; float z = dot(r, s[3].xyz);
  return vec4(dot(r, s[1].xyz) * s[0].w, dot(r, s[2].xyz) * s[0].w, ((z - 0.3) / 59.7 * 2.0 - 1.0) * z, z); }
`,dt=S+oe+h0+`layout(location=0) in vec4 aP; layout(location=1) in vec4 aV; layout(location=2) in vec4 aX; layout(location=3) in vec4 aR;
out vec3 vW; out vec3 vN; out vec3 vU; out vec3 vH; out vec4 vUV; out vec3 vK; out vec2 vF;
const float SU[7] = float[7](0.0, 0.07, 0.24, 0.5, 0.74, 0.84, 1.0);
const float SW[7] = float[7](0.0, 0.42, 0.9, 1.0, 0.42, 0.14, 0.62);
void main() {
  int k = gl_VertexID >> 1; float sd = float(gl_VertexID & 1) * 2.0 - 1.0;
  float u = SU[k], wd = SW[k];
  float L = s[9].w * (0.82 + 0.36 * aR.x), DP = s[10].w * L;
  vec3 H = normalize(aV.xyz + vec3(0.0, 0.0, 0.0001));
  vec3 S0 = normalize(cross(H, vec3(0.0, 1.0, 0.0)) + vec3(0.0001, 0.0, 0.0));
  vec3 U0 = cross(S0, H);
  float cr = cos(aP.w), sr = sin(aP.w);
  vec3 U = U0 * cr + S0 * sr, N = S0 * cr - U0 * sr;
  // the swim: a wave down the body, growing to the tail; its slope turns the flank mirror as it goes
  float sp = length(aV.xyz);
  float amp = 0.035 + 0.02 * min(sp, 4.0);
  float ph = aX.z + aR.y * 6.283;
  float lat = sin(u * 5.0 - ph) * amp * u * u;
  float slope = (cos(u * 5.0 - ph) * 5.0 * u * u + sin(u * 5.0 - ph) * 2.0 * u) * amp;
  vec3 c = aP.xyz + N * lat * L + H * (0.45 - u) * L;
  // a fish seen end-on still has a body
  vec3 vd = normalize(s[0].xyz - aP.xyz), sv = normalize(cross(H, vd) + vec3(0.0001, 0.0, 0.0));
  float pj = abs(dot(U, sv));
  vec3 Ue = normalize(U + sv * (dot(U, sv) >= 0.0 ? 1.0 : -1.0) * max(0.42 - pj, 0.0) * 1.8);
  vec3 p = c + Ue * sd * wd * DP * 0.5;
  vF = vec2(1.0 - smoothstep(0.12, 0.5, pj), dot(U, vd) >= 0.0 ? 1.0 : -1.0);
  vW = p; vN = N; vU = U; vH = H * slope;
  vUV = vec4(u, sd, aR.z, aR.w);
  vK = vec3(aX.x, aX.y, min(aV.w, 1.0));
  gl_Position = PJ(p);
}`,vt=S+oe+f0+`in vec3 vW; in vec3 vN; in vec3 vU; in vec3 vH; in vec4 vUV; in vec3 vK; in vec2 vF; out vec4 o; uniform sampler2D uS2;
vec3 ENV(vec3 R, float lit, float win) { // what a mirror sees: dark water below, blue around, Snell's window above, the sun in it
  float e = R.y;
  vec3 c = mix(s[5].rgb * 0.6, s[6].rgb * 1.15, smoothstep(-0.55, 0.2, e));
  c = mix(c, s[7].rgb * 1.15, smoothstep(0.25, 0.7, e));
  c += s[8].rgb * smoothstep(0.6, 0.78, e) * 0.75 * win;
  float m = max(dot(R, s[4].xyz), 0.0);
  float m2 = m * m, m4 = m2 * m2, m16 = m4 * m4; m16 *= m16;
  c += s[8].rgb * (m16 * 1.05 + m16 * m16 * 1.6) * s[4].w * lit;
  return c;
}
void main() {
  vec3 D = vW - s[0].xyz; float dist = length(D); vec3 I = D / dist;
  float u = vUV.x, y = vUV.y;
  float f = dot(vN, I) > 0.0 ? -1.0 : 1.0;
  // the flank is a curved mirror: top of the body looks up, belly looks down; the swim wave turns it along the body
  vec3 nf = normalize(mix(vN * f + vU * y * 0.32 + vH * f, vU * vF.y, vF.x * 0.85));
  vec3 R = reflect(I, nf);
  float lit = vK.x * vK.x, ex = smoothstep(0.16, 0.42, vK.y);
  // an upright mirror shows the water beside it: only the turned fish (the wave) and the sunlit crown throw the window
  float crown = smoothstep(d[1].y + d[1].w * 0.25, d[1].y + d[1].w * 0.8, vW.y) * lit;
  float show = max(ex, crown * 0.8);
  // no fish hangs dead upright: each holds its own small tilt and the swim rocks it, so at any moment a scatter of
  // single fish throws the window down to you, short streaks gone as they roll on (on its own clock per fish)
  float tw = 0.5 + 0.5 * sin(d[0].x * (1.3 + 2.4 * vUV.z) + vUV.w * 71.0 + vUV.z * 23.0);
  tw *= tw; tw *= tw; tw *= tw; tw *= tw; tw *= tw; tw *= tw;
  // the top of the ball faces the window: lighter, and its glints come thicker
  float up = smoothstep(d[1].y - d[1].w * 0.7, d[1].y + d[1].w * 0.8, vW.y);
  float glint = tw * (1.0 - smoothstep(0.25, 0.75, abs(u - 0.4) * 2.0)) * (0.55 + 0.45 * lit) * (0.4 + 0.8 * up) * (0.35 + 0.65 * vUV.z) * (1.0 - 0.6 * ex);
  vec3 env = ENV(R, lit * mix(0.3, 1.0, show), (0.35 + 0.65 * lit) * mix(0.6, 1.0, show)) * (0.3 + 0.7 * vK.x);
  vec3 c = env * s[10].rgb * (0.86 + 0.28 * vUV.z) * (0.68 + 2.0 * ex + 0.35 * crown) * (0.8 + 0.4 * up) * (0.6 + 0.8 * vUV.w);
  // dark back, a line of scales along the side, a white belly
  float back = max(smoothstep(0.12, 0.34, y + (u - 0.5) * 0.06), vF.x * step(0.0, vF.y) * 0.9);
  float belly = max(smoothstep(-0.55, -0.95, y), vF.x * step(vF.y, 0.0));
  vec3 sunlit = s[7].rgb * (0.25 + 0.75 * lit);
  c = mix(c, s[9].rgb * (0.35 + 0.65 * sunlit * 1.6) + env * 0.12, back);
  c = mix(c, s[11].rgb * sunlit * 0.3 + env * 0.3, belly * 0.8);
  // tail and fins are thin, dim, a little coloured
  float tail = smoothstep(0.76, 0.86, u);
  c = mix(c, s[13].rgb * sunlit * 0.55 + env * 0.1, tail);
  // eye
  float ed = length(vec2((u - 0.1) * 6.5, (y - 0.08) * 0.6));
  c = mix(c, vec3(0.006, 0.007, 0.01), 1.0 - smoothstep(0.2, 0.27, ed));
  // the sunlit crown glitters: a fish that bounces the sun is a hard streak along its flank, gone as it rolls on
  float sg = max(dot(R, s[4].xyz), 0.0); sg *= sg; sg *= sg;
  c += s[8].rgb * sg * crown * smoothstep(0.5, 0.85, vUV.w) * (1.0 - 0.7 * back) * 1.8;
  // against the sun the crown's thin edges burn with light let through the fish
  float fs = max(dot(I, s[4].xyz), 0.0); fs *= fs; fs *= fs; fs *= fs;
  c += s[8].rgb * fs * crown * (0.2 + 0.8 * smoothstep(0.4, 1.0, abs(y))) * (0.4 + 0.6 * vUV.w) * 1.5;
  c += s[8].rgb * s[10].rgb * glint * (1.0 - 0.8 * back) * 1.6;
  // water between here and the camera
  float Tr = exp(-max(dist - 3.2, 0.0) * s[5].w * (1.5 - d[25].y)); // (seen from far off the haze is eased a little: the school stays a knot)
  c = c * Tr + W(I) * (1.0 - Tr);
  float sh = texture(uS2, gl_FragCoord.xy / s[2].w).r;
  c += s[7].rgb * sh * sh * 2.6 * min(dist / 14.0, 1.0);
  o = vec4(FIN(c), 1.0);
}`,ut=S+oe+h0+`out vec2 vL; out vec3 vI; flat out vec4 vP; out float vD;
void main() {
  vec4 P = d[6 + gl_InstanceID * 2], Q = d[7 + gl_InstanceID * 2], A = d[26 + gl_InstanceID];
  vec2 c = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  float sp = length(Q.xyz);
  vec3 H = sp > 0.01 ? Q.xyz / sp : vec3(1.0, 0.0, 0.0);
  vec3 vd = normalize(s[0].xyz - P.xyz), Wd = normalize(cross(H, vd) + vec3(0.0, 0.0, 0.0001));
  if (Wd.y < 0.0) Wd = -Wd;
  float stretch = 1.0 + min(sp * 0.012, 0.1);
  vec3 p = P.xyz + H * c.x * A.y * stretch + Wd * c.y * A.z;
  vL = c * vec2(stretch, 1.0); vI = p - s[0].xyz; vP = vec4(A.x, A.w, A.y / max(A.z, 0.01), min(sp * 0.012, 0.12));
  vD = length(vI);
  gl_Position = A.x > 0.003 ? PJ(p) : vec4(2.0, 2.0, 0.0, 1.0);
}`,mt=S+oe+f0+`in vec2 vL; in vec3 vI; flat in vec4 vP; in float vD; out vec4 o;
void main() {
  float x = vL.x, y = vL.y, k = vP.y;
  float xb = clamp(x, -1.0, 1.0);
  float nose = k < 1.5 ? 0.86 : 0.92;
  float body = pow(max(1.0 - pow(abs((xb + 0.06) / nose), 2.3), 0.0), 0.75) * (k > 1.5 && k < 2.5 ? 0.22 : (k > 2.5 ? 0.42 : 0.39));
  // dorsal fin, tail, and flippers: enough to tell a kind by, blurred by speed
  float fin = k < 0.5 ? 0.17 * max(1.0 - abs(x - 0.02) / 0.15, 0.0) : (k < 1.5 ? 0.46 * max(1.0 - abs(x - 0.08) / 0.15, 0.0) : (k < 2.5 ? 0.0 : 0.26 * max(1.0 - abs(x + 0.08) / 0.1, 0.0)));
  float tl = (k > 1.5 && k < 2.5 ? 0.12 : 0.6) * smoothstep(-0.72, -1.0, x);
  float pec = (k > 1.5 && k < 2.5 ? 0.0 : 0.2) * max(1.0 - abs(x - 0.32) / 0.12, 0.0);
  float wing = k > 1.5 && k < 2.5 ? 0.24 * smoothstep(0.3, -0.5, x) * smoothstep(-0.95, -0.5, x) : 0.0;
  float top = body + fin + tl + wing, bot = body + pec + tl + wing;
  float bl = 0.24 + vP.w * 1.0;
  float a = smoothstep(-bl, bl, top - y) * smoothstep(-bl, bl, bot + y) * smoothstep(1.0, 0.82, abs(x));
  vec3 I = vI / vD;
  float Tr = exp(-vD * s[5].w);
  vec3 dark = s[5].rgb * 0.22;
  vec3 c = dark * Tr + W(I) * (1.0 - Tr);
  o = vec4(FIN(c), a * vP.x * 0.7);
}`,pt=S+oe+h0+`out vec4 vC; flat out float vM;
void main() {
  int i = gl_VertexID; float fi = float(i), T = d[0].x;
  uint uh = uint(i) * 2654435761u; uh ^= uh >> 15; uh *= 2246822519u; uh ^= uh >> 13; uh *= 3266489917u; uh ^= uh >> 16;
  float r1 = float(uh & 1023u) / 1023.0, r2 = float((uh >> 10) & 1023u) / 1023.0, r3 = float((uh >> 20) & 1023u) / 1023.0;
  uh *= 2654435761u; uh ^= uh >> 15; float r4 = float(uh & 1023u) / 1023.0;
  int nm = int(s[12].w), ns = int(s[13].w);
  vec3 p; float sz = 0.0, a = 0.0, m = 0.0; vec3 tint = s[8].rgb;
  if (i < nm) {
    vec3 q = vec3(r1, r2, r3) * vec3(16.0, 10.0, 15.0) + vec3(sin(T * 0.1 + r4 * 9.0) * 0.3 + T * 0.03, -T * 0.035, cos(T * 0.13 + r1 * 9.0) * 0.3);
    q = mod(q, vec3(16.0, 10.0, 15.0));
    p = vec3(q.x - 8.0, q.y - 9.5, q.z - 8.0);
    float tw = 0.5 + 0.5 * sin(T * (0.5 + r1) + r2 * 40.0);
    a = 0.16 + 0.42 * tw * r3; sz = 1.7 + 2.4 * r4; tint = mix(s[7].rgb, vec3(1.0), 0.4);
  } else if (i < nm + ns) {
    int sl = i % 4; vec4 A = d[14 + sl];
    if (A.w >= 0.0 && A.w < 11.0) {
      float ag = A.w;
      float th = r1 * 6.283, ph = r2 * 2.0 - 1.0, sn = sqrt(1.0 - ph * ph);
      vec3 dir = vec3(cos(th) * sn, ph, sin(th) * sn);
      float rr = (0.25 + 1.35 * sqrt(r3)) * (1.0 - exp(-ag * 3.2));
      p = A.xyz + dir * rr + vec3(0.11 * sin(ag * (1.5 + r4 * 2.0) + r1 * 20.0), -ag * (0.11 + 0.26 * r4), 0.11 * cos(ag * (1.3 + r1 * 2.0) + r2 * 20.0));
      float spin = sin(ag * (3.0 + 6.0 * r2) + r3 * 30.0);
      float gl = spin * spin; gl *= gl; gl *= gl; gl *= gl; // a flake only flashes when it faces the right way
      a = (0.08 + 2.4 * gl) * (1.0 - smoothstep(5.0, 10.0, ag)); sz = 1.1 + 1.2 * r4 + 1.6 * gl;
    }
  } else {
    int sl = i % 4; vec4 A = d[14 + sl]; vec4 B = d[18 + sl];
    if (A.w >= 0.0 && A.w < 6.0 && r4 < s[8].w) {
      float birth = r1 * 0.32, ag = A.w - birth;
      if (ag > 0.0) {
        float sp2 = 0.04 + 0.36 * pow(r1, 0.7) * (B.w > 0.5 ? 0.42 : 1.3);
        vec3 j = (vec3(r2, r3, fract(r1 + r2)) - 0.5) * sp2 * 2.0 * (1.0 + ag * 0.45);
        p = mix(B.xyz, A.xyz, r1) + j;
        float rise = (0.25 + 0.95 * r3 * r3) * (1.0 - exp(-ag * 1.5)) * 1.2;
        p.y += ag * rise + 0.03 * sin(ag * 11.0 + r2 * 30.0) * (1.0 - exp(-ag));
        p.x += 0.05 * sin(ag * 7.0 + r3 * 30.0) * ag;
        if (p.y < -0.03) { a = (1.0 - smoothstep(3.0, 6.0, ag)) * (0.45 + 0.75 * smoothstep(0.9, 0.2, ag)) * (1.0 - B.w * 0.35); sz = (2.2 + 9.0 * r3 * r3 * r3 + 2.2 * r4) * (1.0 + 0.35 * B.w); m = 1.0; }
      }
    }
  }
  vec4 c = sz > 0.0 && a > 0.003 ? PJ(p) : vec4(2.0, 2.0, 0.0, 1.0);
  float dist = max(c.w, 0.5), Tr = exp(-dist * s[5].w * 0.9);
  vC = vec4(tint * a * Tr, a);
  vM = m;
  gl_PointSize = max(sz * (6.0 / dist) * s[2].w / 1000.0, 1.2);
  gl_Position = c;
}`,xt=S+`in vec4 vC; flat in float vM; out vec4 o;
void main() {
  vec2 q = gl_PointCoord * 2.0 - 1.0; float r = dot(q, q);
  if (vM < 0.5) { float a = max(1.0 - r, 0.0); o = vec4(vC.rgb * a * a, 1.0); }
  else { float rn = sqrt(r); // a bubble: a bright skin, a clear middle, one window highlight
    float ring = smoothstep(1.0, 0.6, rn) * (0.4 + 0.6 * smoothstep(0.2, 0.8, rn));
    vec2 h = q - vec2(-0.3, 0.38);
    o = vec4(vC.rgb * (ring * 0.6 + 1.5 * max(1.0 - dot(h, h) * 26.0, 0.0)), 1.0); }
}`;function D0(t,e,n){const m=t.createProgram();return t.attachShader(m,e(t.VERTEX_SHADER,n[0])),t.attachShader(m,e(t.FRAGMENT_SHADER,n[1])),n[2]&&t.transformFeedbackVaryings(m,n[2],t.INTERLEAVED_ATTRIBS),t.linkProgram(m),m}function P0(t,e,n){if(!t.getProgramParameter(e,t.LINK_STATUS)){const c=t.getAttachedShaders(e).map(w=>t.getShaderInfoLog(w)).join(`
`);throw new Error("166 "+n+": "+t.getProgramInfoLog(e)+" "+c)}const m=t.getUniformBlockIndex(e,"S"),g=t.getUniformBlockIndex(e,"D");m!==t.INVALID_INDEX&&m!==4294967295&&t.uniformBlockBinding(e,m,0),g!==t.INVALID_INDEX&&g!==4294967295&&t.uniformBlockBinding(e,g,1),t.useProgram(e);for(const[c,w]of[["uT",0],["uS2",1],["uG",2],["uM",3],["uSh",4]]){const s=t.getUniformLocation(e,c);s&&t.uniform1i(s,w)}}function I0(t,e,n){if(!e.stepF[n]){const m=(g,c)=>{const w=t.createShader(g);return t.shaderSource(w,c),t.compileShader(w),w};e.stepF[n]=D0(t,m,[U0(n),B0,["oP","oV","oX"]]),e.stepOk[n]=!1,t.flush()}}function wt(t,e,n){return I0(t,e,n),e.stepOk[n]||(P0(t,e.stepF[n],"step"+n),e.stepOk[n]=!0),e.stepF[n]}function yt(t,e){const n=(c,w)=>{const s=t.createShader(c);return t.shaderSource(s,w),t.compileShader(s),s},m={bake:[t0,at],splat:[rt,it],med:[t0,nt],step:[U0(e),B0,["oP","oV","oX"]],shadow:[ct,lt],shaft:[t0,ft],bg:[t0,ht],fish:[dt,vt],pred:[ut,mt],fx:[pt,xt]},g={};for(const c in m)g[c]=D0(t,n,m[c]);return t.flush(),{P:g,form:e}}function bt(t,e){const{P:n,form:m}=e;for(const F in n)P0(t,n[F],F);const g=t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float"),c=t.getExtension("EXT_texture_filter_anisotropic"),w=(F,se,fe,W,U,b)=>{const p=t.createTexture();return t.bindTexture(t.TEXTURE_2D,p),t.texImage2D(t.TEXTURE_2D,0,fe,F,se,0,W,U,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,b),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,b),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),p},s=F=>{const se=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,se),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,F,0),se},G=g?w(Z,Z,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR):w(Z,Z,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR),N=w(128,128,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR),ue=t.createTexture();t.bindTexture(t.TEXTURE_2D,ue),t.texStorage2D(t.TEXTURE_2D,9,t.RGBA8,256,256),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),c&&t.texParameterf(t.TEXTURE_2D,c.TEXTURE_MAX_ANISOTROPY_EXT,4);const z=new Float32Array(28*4);let L=12345;const ge=()=>(L=L*1664525+1013904223>>>0,L/4294967296);for(let F=0;F<28;F++){const se=1.6+13*Math.pow(F/27,1.3),fe=ge()*ye;let W=Math.round(Math.cos(fe)*se),U=Math.round(Math.sin(fe)*se);!W&&!U&&(W=1);const b=Math.hypot(W,U);z.set([W,U,.62/Math.pow(b,1.9),ge()*ye],F*4)}const Oe=s(ue);t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.viewport(0,0,256,256),t.useProgram(n.bake),t.uniform4fv(t.getUniformLocation(n.bake,"uW"),z),t.uniform1i(t.getUniformLocation(n.bake,"uN"),28);const O=t.createVertexArray();t.bindVertexArray(O),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,ue),t.generateMipmap(t.TEXTURE_2D);const me={P:n,hf:!!g,vao:O,surfT:ue,gridT:G,gridF:s(G),shadowT:N,shadowF:s(N),shafts:new Map,stepF:{[m]:n.step},stepOk:{[m]:!0},tex:w,fbo:s};return t.bindFramebuffer(t.FRAMEBUFFER,null),me}const Se=[];function Ft(t,e,n,m,g){const{R0:c,shapeY:w,torn:s,tornX:G,tornZ:N,tornS:ue,form:z,ringT:L,ringR:ge,R0f:Oe,e1:O,e2:me,axis0:F,mill0:se,wv:fe,C:W,sunV:U}=g,b=()=>{t=t+1831565813|0;let p=Math.imul(t^t>>>15,1|t);return p=p+Math.imul(p^p>>>7,61|p)^p,((p^p>>>14)>>>0)/4294967296};for(let p=0;p<e;p++){const A=p*12,Ue=b(),h=b()*ye,K=b()*2-1,he=Math.sqrt(1-K*K),ze=c*Math.pow(Ue,.42)*(.95+b()*.16);let C=Math.cos(h)*he*ze,Y=K*ze*w,ae=Math.sin(h)*he*ze;if(s){const V=C*G+Y*N>=0?1:-1;C=C*.8+V*G*ue,Y=Y*.8+V*N*ue,ae*=.8}if(z===1){const V=c*L*Math.sqrt(Ue)*1.1,I=K*S0,Ae=c*ge+V*Math.cos(I),$=Math.cos(h)*Ae,y=Math.sin(h)*Ae,_=V*Math.sin(I);C=O[0]*$+me[0]*y+F[0]*_,Y=O[1]*$+me[1]*y+F[1]*_,ae=O[2]*$+me[2]*y+F[2]*_}else if(z===2){const V=-.6+(K+1)*.675,I=1+.7*J((V-.1)/.65,0,1)-.4*J(-V/.7,0,1),Ae=Oe*Math.sqrt(Math.max(I*I-V*V,.01)*Ue);C=Math.cos(h)*Ae,ae=Math.sin(h)*Ae,Y=V*Oe*w}const Ce=F[1]*ae-F[2]*Y,re=F[2]*C-F[0]*ae,Ve=F[0]*Y-F[1]*C,Be=se/c,x=(C*fe[0]+Y*fe[1]+ae*fe[2])/c-.1,qe=Math.exp(-x*x*16);n[A]=W[0]+C,n[A+1]=W[1]+Y,n[A+2]=W[2]+ae,n[A+3]=-.56*qe*Math.sign(Ce||1),n[A+4]=Ce*Be+(b()-.5)*.3,n[A+5]=re*Be+(b()-.5)*.14,n[A+6]=Ve*Be+(b()-.5)*.3,n[A+7]=0,n[A+8]=Math.exp(-Math.max(0,(c-(C*U[0]+Y*U[1]+ae*U[2]))/c)*1.2),n[A+9]=qe*.5,n[A+10]=b()*ye,n[A+11]=0,m[p*4]=b()*255,m[p*4+1]=b()*255,m[p*4+2]=b()*255,m[p*4+3]=b()*255}return t}const N0=typeof FinalizationRegistry=="function"?new FinalizationRegistry(t=>{const e=t();for(const n of e.b)e.gl.deleteBuffer(n);for(const n of e.t)e.gl.deleteTexture(n);for(const n of e.f)e.gl.deleteFramebuffer(n);for(const n of e.v)e.gl.deleteVertexArray(n);for(const n of e.x)e.gl.deleteTransformFeedback(n)}):null;M0.add({num:166,name:"Bait Ball",fam:"Worlds",recipe:"Tens of thousands of silver fish herded up against the surface, each flashing when it catches the sun, so a startle sweeps across the school as a sheet of light. The school's shape changes every mint, and rarely it's torn in two or down to the last few. Drag through it to hunt (fast drags split it), tap for a strike, or hold to push the ball up against the surface.",interactive:"Drag through the ball to be a predator: it opens around your path with a flash wave, and a fast drag splits it. Tap for a strike and a burst of fish, bubbles and falling scales. Hold to push the ball slowly up against the surface.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,n=t.size;let m=2654435769;const g=t.hash.slice(2);for(let o=0;o<g.length;o+=8)m=Math.imul(m^parseInt(g.slice(o,o+8),16),1540483477)>>>0;const c=()=>{m=m+1831565813|0;let o=Math.imul(m^m>>>15,1|m);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},w=o=>{let a=c(),l;for(l in o)if(a-=o[l],a<=0)return l;return l},s={fish:w({"sardine silver":.55,anchovy:.33,"blue-green jacks":.12}),water:w({"tropical blue":.55,"green temperate":.33,"deep dusk":.12}),ball:w({tight:.3,great:.55,towering:.15}),light:w({noon:.62,"low sun":.38}),predator:w({dolphins:.38,sharks:.27,tuna:.23,"diving gannets":.12}),bubbles:w({few:.5,trails:.38,"gannet plumes":.12}),turn:w({slow:.5,fast:.35,"against itself":.15}),shape:w({round:.55,egg:.3,flattened:.15})};t.home&&(s.fish="sardine silver",s.water="tropical blue",s.ball="great",s.light="noon",s.predator="dolphins",s.bubbles="trails",s.shape="round",s.turn="slow"),t.trait("Fish",s.fish),t.trait("Water",s.water),t.trait("Ball",s.ball),t.trait("Light",s.light);let G=2246822507;for(let o=0;o<g.length;o+=8)G=Math.imul(G^parseInt(g.slice(o,o+8),16),3266489909)>>>0;const N=()=>{G=G+1831565813|0;let o=Math.imul(G^G>>>15,1|G);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},ue=o=>{let a=N(),l;for(l in o)if(a-=o[l],a<=0)return l;return l};s.view=t.home?"below the ball":ue({"below the ball":.4,"from the deep":.24,"level, from the side":.24,"in close":.12});const z=N()<.5?1:-1,L=N();!t.home&&N()<.1&&(s.shape="torn in two");const ge=(N()-.5)*.9;!t.home&&s.shape!=="torn in two"&&N()<.14&&(s.shape="the last few"),!t.home&&N()<.3&&(s.view="from the surface");const Oe=t.home?3.8:3.62+N()*.22;let O=668265350;for(let o=0;o<g.length;o+=8)O=Math.imul(O^parseInt(g.slice(o,o+8),16),374761393)>>>0;const me=()=>{O=O+1831565813|0;let o=Math.imul(O^O>>>15,1|O);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},F=me(),se=me(),fe=me();!t.home&&(s.shape==="round"||s.shape==="egg"||s.shape==="flattened")&&(s.shape=F<.21?"a ring":F<.39?"a pillar":s.shape),!t.home&&s.shape!=="torn in two"&&s.water!=="deep dusk"&&/below|deep|level/.test(s.view)&&se<.2&&(s.view="from far off"),s.shape==="a pillar"&&(s.view==="below the ball"||s.view==="in close")&&(s.view="level, from the side"),s.shape==="a ring"&&s.turn==="against itself"&&(s.turn="fast"),t.trait("Predator",s.predator),t.trait("Bubbles",s.bubbles),t.trait("Turn",s.turn),t.trait("Shape",s.shape),t.trait("View",s.view);const W={tight:[.62,1.6],great:[.85,1.95],towering:[1,2.3]}[s.ball],U={"sardine silver":{n:1,L:.18,dp:.21,back:[.012,.035,.07],silver:[.94,.98,1.02],belly:[1,1,1],tail:[.2,.26,.28]},anchovy:{n:1.12,L:.125,dp:.15,back:[.05,.055,.03],silver:[.98,.93,.74],belly:[.98,.95,.85],tail:[.3,.28,.18]},"blue-green jacks":{n:.34,L:.31,dp:.31,back:[0,.11,.12],silver:[.72,1,.96],belly:[.9,1,.9],tail:[.55,.5,.12]}}[s.fish],b={"tropical blue":{deep:[.0015,.012,.05],mid:[.005,.06,.19],top:[.022,.2,.46],win:[1.5,1.8,1.9],k:.075},"green temperate":{deep:[.002,.018,.02],mid:[.012,.085,.08],top:[.06,.26,.2],win:[1.6,1.85,1.45],k:.086},"deep dusk":{deep:[8e-4,.002,.009],mid:[.004,.012,.05],top:[.05,.05,.14],win:[2.2,1.05,.5],k:.082}}[s.water],p=s.light==="noon"?[.08,1,-.78]:[.3,.68,-.66];{const o=Math.hypot(...p);p[0]/=o,p[1]/=o,p[2]/=o}const A=[p[0]*1.33,0,p[2]*1.33];A[1]=Math.sqrt(Math.max(0,1-A[0]*A[0]-A[2]*A[2]));const Ue=s.shape==="the last few",h=W[1]*(s.fish==="blue-green jacks"?1.08:1)*(Ue?.92:1),K=s.shape==="egg"?1.28:s.shape==="flattened"?.76:s.shape==="a pillar"?5:1,he=s.shape==="a pillar"?h*.56:h,ze=s.shape==="torn in two",C=ze?h*.62:0,Y=Math.cos(ge),ae=Math.sin(ge),Ce=s.turn==="fast"?1.25:.72,re={"a ring":1,"a pillar":2}[s.shape]||0,Ve=1,Be=Math.sqrt(2/3/(Math.PI*Ve));let x=k0.get(e);const qe=x?null:yt(e,re);x&&I0(e,x,re);const V=Math.round(4e4*W[0]*U.n),I=Math.round((n<=400?Math.round(V*.5):V)*(Ue?.12:1)),Ae=n<=400?1.28:1,$=[(c()-.5)*(t.home?.2:1.1),0,(c()-.5)*.8];let y=[0,-6.3,5.6+h*.3],_=1.73,ee=[0,-3.55,0];if(s.view==="from the deep"?(y=[z*(2.2+L*.6),-7.9-h*.3,4.7],ee=[z*.8,-2.7,.2],_=1.7):s.view==="level, from the side"?(y=[z*-(1.7+L*.7),-4.1,5.1+h*.3],ee=[z*-(1.1+L*.3),-2.55,0],_=1.75):s.view==="from the surface"&&(y=[z*(1.6+L*.6),-.55,3.4+h*.4],ee=[z*-.2,-3.9,-.4],_=1.55),s.shape==="a pillar"?s.view==="level, from the side"?(y=[z*-(2+L*.6),-4.6,7.4+h*.35],ee=[z*-.5,-4.1,0],_=1.6):s.view==="from the deep"&&(y=[z*(4.2+L*.8),-9.4-h*.3,6.6],ee=[z*.4,-3.6,.2],_=1.6):s.view==="in close"&&(y=[z*.9,-5.4,3+h*.35],ee=[z*-1.05,-3.1,0],_=1.6),s.view==="from far off"){const o=s.shape==="a pillar"?-3.9:-3.4,a=z*(3+L*1.8),l=12.6+h*.8;y=[a,-2.7,l];const d=[-a,o+2.7,-l],i=Math.hypot(d[0],d[2]),B=[-d[2]/i,0,d[0]/i],D=fe<.5?1:-1,M=Math.hypot(...d);_=1.7,ee=[B[0]*D*M*.34/_,o+M*.2/_,B[2]*D*M*.34/_]}s.shape==="a ring"&&s.view==="level, from the side"&&(ee[0]*=.3,y[2]+=1.1),s.shape==="a ring"&&s.view==="below the ball"&&(y=[z*.3,-8.3-h*.35,3.1+h*.35],ee=[0,-3.3,-.7],_=1.7);const R=[ee[0]-y[0],ee[1]-y[1],ee[2]-y[2]];{const o=Math.hypot(...R);R[0]/=o,R[1]/=o,R[2]/=o}const q=[R[2]*-1,0,R[0]];{const o=Math.hypot(...q);q[0]/=o,q[1]/=o,q[2]/=o}const ie=[q[1]*R[2]-q[2]*R[1],q[2]*R[0]-q[0]*R[2],q[0]*R[1]-q[1]*R[0]];ie[1]<0&&(ie[0]=-ie[0],ie[1]=-ie[1],ie[2]=-ie[2]);const Et=.31,Rt=.75+c()*.5,Tt=s.bubbles==="few"?.45:1,L0=n<=400?260:620,O0=480,gt=880,Xe=h/7.2,o0=1/Xe,d0=Xe*H,v0=26,C0=[-v0/2,-v0/2],ne=new Float32Array(16*4),X=(o,a,l)=>{ne[o*4]=a[0],ne[o*4+1]=a[1],ne[o*4+2]=a[2],ne[o*4+3]=l};X(0,y,_),X(1,q,Et),X(2,ie,n),X(3,R,Rt),X(4,p,s.water==="deep dusk"?.85:1),X(5,b.deep,b.k),X(6,b.mid,2.2),X(7,b.top,(s.view==="from the surface"?1.6:s.view==="from the deep"?.8:1)*(s.water==="green temperate"&&s.view!=="from the surface"?.82:1)),X(8,b.win,Tt),X(9,U.back,U.L*Ae),X(10,U.silver,U.dp),X(11,U.belly,s.view==="from the deep"?2.4:.45),X(12,A,L0),X(13,U.tail,O0),ne[14*4]=C0[0],ne[14*4+1]=C0[1],ne[14*4+2]=1/v0,ne[14*4+3]=3;{const o=Math.max(...b.top);for(let a=0;a<3;a++)ne[15*4+1+a]=.35+2.2*(1-b.top[a]/o)}ne[15*4]=J((Math.asin(p[1])-.42)*.5,.14,.55);const s0=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,s0),e.bufferData(e.UNIFORM_BUFFER,ne,e.STATIC_DRAW);const r=new Float32Array(32*4);r[96]=s.turn==="against itself"?1:0,r[97]=s.view==="from the surface"?1.2:0,r[95]=s.water==="deep dusk"?1:0,r[92]=s.view==="from the surface"?3.5:.6,r[93]=s.view==="from the surface"?.8:.22,r[94]=s.view==="from the surface"?1.8:1,r[98]=Ve,r[99]=L*ye,r[103]=Be,r[101]=s.view==="from far off"?.55:0;const He=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,He),e.bufferData(e.UNIFORM_BUFFER,r,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null);const ce=[$[0],-3.25,$[2]],T=[(c()-.5)*.5,1,(c()-.5)*.5];if(re===1){const o=y[1]<ce[1]?-1:1,a=y[0]-ce[0],l=y[2]-ce[2],d=(Math.hypot(a,l)||1)*o,i=s.view==="level, from the side"?.62:s.view==="from far off"?1:.7;T[0]=T[0]*.4+a/d*i,T[2]=T[2]*.4+l/d*i}{const o=Math.hypot(...T);T[0]/=o,T[1]/=o,T[2]/=o}re===2&&(ce[1]=-.32-.74*he*K);const de=[T[1],-T[0],0];{const o=Math.hypot(...de);de[0]/=o,de[1]/=o}const zt=[T[1]*de[2]-T[2]*de[1],T[2]*de[0]-T[0]*de[2],T[0]*de[1]-T[1]*de[0]],Ge=[-.62,.24,.74];{const o=Math.hypot(...Ge);Ge[0]/=o,Ge[1]/=o,Ge[2]/=o}const V0=t.hash+"|"+(t.home?1:0)+"|"+I;let ve=Se.find(o=>o.k===V0);ve?Se.splice(Se.indexOf(ve),1):(ve={k:V0,data:new Float32Array(I*12),rnds:new Uint8Array(I*4),a:0},ve.a=Ft(m,I,ve.data,ve.rnds,{R0:h,shapeY:K,torn:ze,tornX:Y,tornZ:ae,tornS:C,form:re,ringT:Be,ringR:Ve,R0f:he,e1:de,e2:zt,axis0:T,mill0:Ce,wv:Ge,C:ce,sunV:p})),Se.unshift(ve),Se.length>3&&Se.pop(),m=ve.a;const At=ve.data,_t=ve.rnds;qe&&(x=bt(e,qe),k0.set(e,x));const Fe=x.P,Mt=wt(e,x,re),We=[e.createBuffer(),e.createBuffer()];for(const o of We)e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,At,e.DYNAMIC_COPY);const u0=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,u0),e.bufferData(e.ARRAY_BUFFER,_t,e.STATIC_DRAW);const q0=We.map(o=>{const a=e.createTransformFeedback();return e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,a),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,0,o),a});e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),e.bindBuffer(e.TRANSFORM_FEEDBACK_BUFFER,null);const X0=(o,a)=>{e.bindBuffer(e.ARRAY_BUFFER,o);for(let l=0;l<3;l++)e.enableVertexAttribArray(l),e.vertexAttribPointer(l,4,e.FLOAT,!1,48,l*16),e.vertexAttribDivisor(l,a)},a0=We.map(o=>{const a=e.createVertexArray();return e.bindVertexArray(a),X0(o,0),a}),H0=We.map(o=>{const a=e.createVertexArray();return e.bindVertexArray(a),X0(o,1),e.bindBuffer(e.ARRAY_BUFFER,u0),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,4,e.UNSIGNED_BYTE,!0,4,0),e.vertexAttribDivisor(3,1),a});e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null);let _e=0;const r0=[0,1].map(()=>x.hf?x.tex(Z,Z,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR):x.tex(Z,Z,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR)),m0=r0.map(x.fbo);for(const o of m0)e.bindFramebuffer(e.FRAMEBUFFER,o),e.disable(e.SCISSOR_TEST),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);let Ke=0;const Ee=n>=640?340:Math.max(128,Math.round(n*.5));let Ye=x.shafts.get(Ee);if(!Ye){const o=x.tex(Ee,Ee,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR);Ye={t:o,f:x.fbo(o)},x.shafts.set(Ee,Ye)}e.bindFramebuffer(e.FRAMEBUFFER,null);const j={dolphins:0,sharks:1,"diving gannets":2,tuna:3}[s.predator],G0=[1.05,1.3,.72,1.15][j],W0=[.56,.72,.45,.6][j],$e=[0,1,2,3].map(()=>({x:0,y:0,z:0,vx:0,vy:0,vz:0,r:0,st:0,life:0,vis:0,kind:j,ax:0,ay:0,az:0,wave:!0})),p0=[0,1,2,3].map(()=>({x:0,y:-40,z:0,age:-1,ex:0,ey:0,ez:0,bird:0}));let x0=0;const Pt=new Float32Array(16);let E=0,K0=0;const Re=c()*ye;let i0=0,De=0,w0=1,y0=0;const v=[ce[0],ce[1],ce[2]],pe=[ce[0],ce[1],ce[2]],xe=T.slice();let Y0=Oe,$0=t.home?1:2.2+c()*2,j0=.4,we=0,P=[0,0,0],je=0,n0=!1,b0=-1,F0=0,E0=0,Qe=0,It=0,Nt=0,R0=0,T0=0,g0=0,Pe=0,z0=0;const Q0=(o,a)=>{const l=o*2-1,d=1-a*2,i=R[0]*_+q[0]*l+ie[0]*d,B=R[1]*_+q[1]*l+ie[1]*d,D=R[2]*_+q[2]*l+ie[2]*d,M=((v[0]-y[0])*R[0]+(v[1]-y[1])*R[1]+(v[2]-y[2])*R[2])/(i*R[0]+B*R[1]+D*R[2]);return[y[0]+i*M,Math.min(y[1]+B*M,-.1),y[2]+D*M]},Ie=t.sound,J0=(o,a)=>{for(let l=0;l<9;l++)Ie.hit("click",a*(.7+.3*c()),{at:l*(.03+.012*l),pan:o})},Z0=(o,a)=>{for(let l=0;l<6;l++){const d=500+c()*900;Ie.note(0,{freq:d,dur:.05+c()*.05,vel:o*(.4+c()*.5),wave:"sine",at:l*.035+c()*.03,pan:a})}},c0=(o,a)=>Ie.hit("noise",o,{cutoff:700,dur:.55,pan:a}),l0=(o,a,l,d,i,B,D,M,Q,le,Te,_0)=>{let k=null;for(let te=1;te<4;te++)if($e[te].life<=0){k=$e[te];break}if(!k)return null;const Ne=i-a,Me=B-l,f=D-d,u=Math.hypot(Ne,Me,f)||1;return k.x=a,k.y=l,k.z=d,k.vx=Ne/u*M,k.vy=Me/u*M,k.vz=f/u*M,k.r=Q,k.st=le,k.life=Te,k.vis=_0,k.kind=o,k.vs=0,k},A0=(o,a,l,d)=>{const i=p0[x0];if(x0=(x0+1)%4,i.x=o,i.y=a,i.z=l,i.age=0,i.bird=d?1:0,d)i.ex=o+(c()-.5)*1.4,i.ey=-.05,i.ez=l+(c()-.5)*.8,l0(2,i.ex,i.ey,i.ez,o,a,l,11,h*.34,1.3,Math.hypot(o-i.ex,a-i.ey,l-i.ez)/11+.12,0);else{const D=c()*ye,M=Math.cos(D),Q=Math.sin(D),le=1.9;i.ex=o+M*le,i.ey=a-.6*(c()-.2),i.ez=l+Q*le*.7,l0(j===2?0:j,i.ex,i.ey,i.ez,o-M*.4,a,l-Q*.4,9,h*.34,1.2,.8,1)}P[0]=o,P[1]=a,P[2]=l,we=3,je=4.5;const B=J(o/4,-1,1);c0(.8,B),Z0(.7,B),d?Ie.hit("kick",.5,{pan:B}):J0(B,.4)},kt=()=>{const o=c()<.5?1:-1,a=(c()-.5)*2.4,l=(c()-.45)*3.2,d=v[0]+o*(9+c()*2),i=v[1]+a+(c()-.5)*1.4,B=v[2]+l,D=v[0]+(c()-.5)*h*1.2,M=v[1]+a*.6,Q=v[2]+l*.5,le=j===1?5.2:j===3?9:7,Te=j===2?0:j;l0(Te,d,i,B,D,M,Q,le,h*.27,1,22/le,.9),j===0&&c()<.8&&l0(Te,d+o*2,i-.9,B+.8,D,M-.6,Q+.5,le,h*.24,.9,24/le,.85),j===0&&J0(J(o*.7,-1,1),.28),c0(.32,J(o*.5,-1,1))},St=()=>{A0(v[0]+(c()-.5)*h*1.3,v[1]+(c()-.2)*h*.9,v[2]+h*(.2+c()*.5),!0)},Ut=o=>{const a=$e[o],d=(6+o*2)*4;r[d]=a.x,r[d+1]=a.y,r[d+2]=a.z,r[d+3]=Math.max(a.r,.01),r[d+4]=a.vx,r[d+5]=a.vy,r[d+6]=a.vz,r[d+7]=a.life>0?a.st:0;const i=(26+o)*4;r[i]=a.life>0&&a.vs||0,r[i+1]=o===0?G0:a.kind===2?.72:G0,r[i+2]=o===0?W0:a.kind===2?.45:W0,r[i+3]=a.kind},et=o=>{E+=o,K0++;const a=t.input,l=a.taps();let d=null;if(l.length){const f=l[l.length-1];!a.down&&!n0&&(d=f)}const i=$e[0];if(a.down){const f=Q0(a.x,a.y);n0||(b0=E,F0=a.x,E0=a.y,Qe=0,R0=f[0],T0=f[1],g0=f[2]);const u=(f[0]-R0)/o,te=(f[1]-T0)/o,ke=(f[2]-g0)/o;R0=f[0],T0=f[1],g0=f[2];const Lt=Math.hypot(u,te,ke);Qe=Math.max(Qe,Math.hypot(a.x-F0,a.y-E0));const Bt=E-b0;i.x=f[0],i.y=f[1],i.z=f[2],i.vx+=(u-i.vx)*.5,i.vy+=(te-i.vy)*.5,i.vz+=(ke-i.vz)*.5;const Le=Math.hypot(i.vx,i.vy,i.vz);if(Qe>.025){if(i.life=1,i.st=1+Math.min(Le*.1,.8),i.r=h*(.3+Math.min(Le*.035,.32)),Pe+=(J((Le-1.2)/5,0,.75)-Pe)*.25,P[0]=f[0]+i.vx*.05,P[1]=f[1]+i.vy*.05,P[2]=f[2]+i.vz*.05,Le>.6&&(we=1,je=2.2+Math.min(Le*.2,1.5)),Le>5&&Math.hypot(f[0]-v[0],f[1]-v[1],f[2]-v[2])<h*1.15){const Je=-i.vy,Ze=i.vx,e0=Math.hypot(Je,Ze)||1;w0=Je/e0,y0=Ze/e0,De=Math.max(De,h*.7),z0<=0&&(c0(.6,J(f[0]/4,-1,1)),z0=.3)}}else if(Bt>.25){i.life=1,i.st=.13,i.r=h*.85,i0=Math.min(1,i0+o*.3);const Je=v[0]-f[0],Ze=v[2]-f[2],e0=Math.hypot(Je,Ze)+.5;$[0]=J($[0]+Je/e0*o*.28,-1.7,1.7),$[2]=J($[2]+Ze/e0*o*.1,-1.5,1.5),Pe*=.85}else i.life=0,Pe*=.85}else n0&&E-b0<.3&&Qe<.03&&(d={x:F0,y:E0}),i.life=0,Pe*=.85,i0*=Math.exp(-o*.1);if(i.vs=Pe,n0=a.down,d){const f=Q0(d.x,d.y);A0(f[0],f[1],f[2],j===2||d.y<.3)}if(E>Y0){Y0=E+1.9+c()*1.1;const f=c()*ye;P[0]=v[0]+Math.cos(f)*h*.85,P[1]=v[1]+Math.sin(f)*h*.7,P[2]=v[2]+h*.32,we<=0&&(we=3,je=2.5,c0(.2,J(P[0]/4,-1,1)))}E>$0&&($0=E+4.6+c()*3.6,j===2||s.bubbles==="gannet plumes"&&c()<.55?St():c()<.2?A0(v[0]+(c()-.5)*h,v[1]+(c()-.5)*h*.8,v[2]+h*.3,!1):kt()),E>j0&&(j0=E+1.1+c()*1.4,Ie.note(29+Math.floor(c()*5),{dur:1.7,vel:.22,wave:"sine",cutoff:160,attack:.5}),Ie.hit("noise",.07,{cutoff:240,dur:1.2}),s.bubbles!=="few"&&c()<.3&&Z0(.1,(c()-.5)*1.2)),z0-=o;for(let f=1;f<4;f++){const u=$e[f];u.life>0&&(u.life-=o,u.x+=u.vx*o,u.y+=u.vy*o,u.z+=u.vz*o,u.vs=Math.min((u.vs||0)+o*5,u.vis)*Math.min(u.life*5,1),Math.hypot(u.x-v[0],u.y-v[1],u.z-v[2])<h*1.5&&we<=0&&(P[0]=u.x+u.vx*.09,P[1]=u.y+u.vy*.09,P[2]=u.z+u.vz*.09,we=1,je=2.1))}for(const f of p0)f.age>=0&&(f.age+=o,f.age>12&&(f.age=-1));const B=.14+.32*(.5+.5*Math.sin(E*.13+Re)),D=J(B+i0,0,1),M=1+.035*Math.sin(E*.8+Re),Q=he*(1-.27*D)*M,le=re===2?-.32-.5*he*K:-Q*K*.62,Te=re===2?-.32-.74*he*K:-3.5-(h-1.9)*.3,_0=Te+(le-Te)*D*D,k=Math.exp(-o*.6);$[0]*=Math.exp(-o*.02),v[0]+=($[0]+.3*Math.sin(E*.11+Re)-v[0])*(1-k),v[1]+=(_0+.1*Math.sin(E*.23)-v[1])*(1-k),v[2]+=($[2]+.2*Math.cos(E*.09)-v[2])*(1-k),pe[0]+=(v[0]-pe[0])*.1,pe[1]+=(v[1]-pe[1])*.1,pe[2]+=(v[2]-pe[2])*.1,xe[0]=T[0]+.25*Math.sin(E*.07+Re),xe[2]=T[2]+.25*Math.cos(E*.05+Re),xe[1]=T[1],De*=Math.exp(-o*.42),ze&&De<C&&(De=C,w0=Y,y0=ae),r[0]=E,r[1]=o,r[2]=K0,r[3]=10,r[4]=v[0],r[5]=v[1],r[6]=v[2],r[7]=Q,r[8]=pe[0]-d0/2,r[9]=pe[1]-d0/2,r[10]=pe[2]-d0/2,r[11]=o0;const Ne=Math.hypot(xe[0],xe[1],xe[2]);r[12]=xe[0]/Ne,r[13]=xe[1]/Ne,r[14]=xe[2]/Ne,r[15]=Ce,re===2&&(r[100]=he*(.9*Math.sin(E*.13+Re)+.5*Math.sin(E*.31+2*Re)),r[102]=he*(.7*Math.cos(E*.11+Re)+.45*Math.sin(E*.23+1.7))),r[16]=w0,r[17]=0+y0,r[18]=0,r[19]=De,r[20]=.82,r[21]=I*Xe*Xe*Xe/(4.19*Q*Q*Q*K)*1.8,r[22]=K,r[23]=x.hf?1:8/255;for(let f=0;f<4;f++)Ut(f);for(let f=0;f<4;f++){const u=p0[f],te=(14+f)*4,ke=(18+f)*4;r[te]=u.x,r[te+1]=u.y,r[te+2]=u.z,r[te+3]=u.age,r[ke]=u.ex,r[ke+1]=u.ey,r[ke+2]=u.ez,r[ke+3]=u.bird}let Me=22*4;r[Me]=(P[0]-r[8])*o0,r[Me+1]=(P[1]-r[9])*o0,r[Me+2]=(P[2]-r[10])*o0,r[Me+3]=we>0?je:0,we>0&&we--,r[120]=6,r[121]=1,r[122]=4,r[123]=4,r[124]=(Ee>=340?26:20)*(s.view==="from the surface"?1.6:1),r[125]=E*.016,r[126]=E*.011,r[127]=Ee},tt=()=>{e.bindBuffer(e.UNIFORM_BUFFER,He),e.bufferSubData(e.UNIFORM_BUFFER,0,r),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,0,s0),e.bindBufferBase(e.UNIFORM_BUFFER,1,He),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindFramebuffer(e.FRAMEBUFFER,x.gridF),e.viewport(0,0,Z,Z),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.useProgram(Fe.splat),e.bindVertexArray(a0[_e]),e.drawArrays(e.POINTS,0,I),e.disable(e.BLEND),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,x.gridT),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,r0[Ke]),e.bindFramebuffer(e.FRAMEBUFFER,m0[1-Ke]),e.useProgram(Fe.med),e.bindVertexArray(x.vao),e.drawArrays(e.TRIANGLES,0,3),Ke=1-Ke,e.bindTexture(e.TEXTURE_2D,r0[Ke]),e.bindFramebuffer(e.FRAMEBUFFER,x.shadowF),e.useProgram(Mt),e.bindVertexArray(a0[_e]),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,q0[1-_e]),e.enable(e.RASTERIZER_DISCARD),e.beginTransformFeedback(e.POINTS),e.drawArrays(e.POINTS,0,I),e.endTransformFeedback(),e.disable(e.RASTERIZER_DISCARD),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),e.bindVertexArray(null),_e=1-_e},ot=()=>{e.bindBufferBase(e.UNIFORM_BUFFER,0,s0),e.bindBufferBase(e.UNIFORM_BUFFER,1,He),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindFramebuffer(e.FRAMEBUFFER,x.shadowF),e.viewport(0,0,128,128),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.useProgram(Fe.shadow),e.bindVertexArray(a0[_e]),e.drawArrays(e.POINTS,0,Math.ceil(I/5)),e.disable(e.BLEND),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,x.surfT),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,x.shadowT),e.bindFramebuffer(e.FRAMEBUFFER,Ye.f),e.viewport(0,0,Ee,Ee),e.useProgram(Fe.shaft),e.bindVertexArray(x.vao),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,n,n),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Ye.t),e.enable(e.SCISSOR_TEST),e.scissor(0,0,n,n),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.useProgram(Fe.fish),e.bindVertexArray(H0[_e]),e.drawArraysInstanced(e.TRIANGLE_STRIP,1,13,I),e.depthMask(!1),e.depthFunc(e.LEQUAL),e.depthRange(1,1),e.useProgram(Fe.bg),e.bindVertexArray(x.vao),e.drawArrays(e.TRIANGLES,0,3),e.depthRange(0,1),e.depthFunc(e.LESS),e.depthMask(!1),e.colorMask(!0,!0,!0,!1),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(Fe.pred),e.bindVertexArray(x.vao),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,4),e.blendFunc(e.ONE,e.ONE),e.useProgram(Fe.fx),e.drawArrays(e.POINTS,0,L0+O0+gt),e.bindVertexArray(null),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.colorMask(!0,!0,!0,!0),e.bindBufferBase(e.UNIFORM_BUFFER,0,null),e.bindBufferBase(e.UNIFORM_BUFFER,1,null)};et(1/30),tt(),ot();const st=(o,a)=>{const l=a>.05?2:1,d=Math.min(a,.1)/l;for(let i=0;i<l;i++)et(d),tt();ot()};if(N0){const o={gl:e,b:[...We,u0,s0,He],t:r0,f:m0,v:[...a0,...H0],x:q0};N0.register(st,()=>o)}return st}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
