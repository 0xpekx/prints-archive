// Bait Ball: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/166.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ze){ze&&function(){"use strict";const Ae=new WeakMap,_e=Math.PI,v0=2*_e,G=(t,e,p)=>t<e?e:t>p?p:t,S=`#version 300 es
// w166 r91ae04
precision highp float;
precision highp int;
precision highp sampler2D;
`,j=`layout(std140) uniform S { vec4 s[16]; };
layout(std140) uniform D { vec4 d[32]; };
`,C=32,u0=6,W=C*u0,H0=S+`out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,ae=`
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
}`,st=S+j+`layout(location=0) in vec4 aP; layout(location=1) in vec4 aV; out vec4 vC;
void main() {
  uint h = (uint(gl_VertexID) + uint(d[0].z) * 977u) * 2654435761u; h ^= h >> 15; h *= 2246822519u;
  vec3 j = vec3(float(h & 255u), float((h >> 8) & 255u), float((h >> 16) & 255u)) / 255.0;
  h *= 3266489917u; h ^= h >> 13;
  j += vec3(float(h & 255u), float((h >> 8) & 255u), float((h >> 16) & 255u)) / 255.0 - 1.0;
  vec3 g = (aP.xyz - d[2].xyz) * d[2].w + j * 1.25;
  float z = floor(g.z);
  vec2 q = floor(g.xy);
  bool out_ = z < 0.0 || z > ${(C-1).toFixed(1)} || min(q.x, q.y) < 0.0 || max(q.x, q.y) > ${(C-1).toFixed(1)};
  vec2 px = (vec2(mod(z, ${u0.toFixed(1)}), floor(z / ${u0.toFixed(1)})) * ${C.toFixed(1)} + q + 0.5) / ${W.toFixed(1)};
  gl_Position = out_ ? vec4(2.0, 2.0, 0.0, 1.0) : vec4(px * 2.0 - 1.0, 0.0, 1.0);
  gl_PointSize = 1.0;
  vC = vec4(aV.xyz * step(0.5, d[5].w), 1.0) * d[5].w;
}`,rt=S+"in vec4 vC; out vec4 o; void main() { o = vC; }",it=S+j+`in vec2 vUv; out vec4 o; uniform sampler2D uG; uniform sampler2D uM;
const ivec3 NB[6] = ivec3[6](ivec3(1,0,0), ivec3(-1,0,0), ivec3(0,1,0), ivec3(0,-1,0), ivec3(0,0,1), ivec3(0,0,-1));
void main() {
  ivec2 px = ivec2(gl_FragCoord.xy), tl = px / ${C};
  ivec3 c = ivec3(px - tl * ${C}, tl.x + tl.y * ${u0});
  vec4 m = texelFetch(uM, px, 0);
  float sum = 0.0, gx = 0.0, gz = 0.0;
  for (int i = 0; i < int(d[30].x); i++) {
    ivec3 n = clamp(c + NB[i], ivec3(0), ivec3(${C-1}));
    float e = texelFetch(uM, ivec2(n.x + (n.z % ${u0}) * ${C}, n.y + (n.z / ${u0}) * ${C}), 0).r;
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
}`,Me=t=>S+`#define FORM ${t}
`+j+`layout(location=0) in vec4 aP; layout(location=1) in vec4 aV; layout(location=2) in vec4 aX;
out vec4 oP; out vec4 oV; out vec4 oX;
uniform sampler2D uG; uniform sampler2D uM;
const vec3 OFF[7] = vec3[7](vec3(0.0), vec3(1.5,0.0,0.0), vec3(-1.5,0.0,0.0), vec3(0.0,1.5,0.0), vec3(0.0,-1.5,0.0), vec3(0.0,0.0,1.5), vec3(0.0,0.0,-1.5));
vec2 sl(float z, vec2 q) { return (vec2(mod(z, ${u0.toFixed(1)}), floor(z / ${u0.toFixed(1)})) * ${C.toFixed(1)} + q) / ${W.toFixed(1)}; }
void main() {
  float id = float(gl_VertexID), r1 = fract(id * 0.61803399), r2 = fract(id * 0.7548777), r3 = fract(id * 0.5698403);
  float T = d[0].x, dt = d[0].y;
  vec3 p = aP.xyz, v = aV.xyz, g = (p - d[2].xyz) * d[2].w;
  // what the fish feels from its neighbours, and how much school lies between it and the sun
  vec3 grad = vec3(0.0), mo = vec3(0.0); float rho = 0.0, sunD = 0.0;
  for (int i = 0; i < int(d[0].w); i++) {
    float k = float(i);
    vec3 q = i < 7 ? g + OFF[i] : g + s[4].xyz * (k - 6.0) * (k - 6.0) * 1.3;
    vec3 c = clamp(q, vec3(0.5), vec3(${(C-.5).toFixed(1)}));
    float z = c.z - 0.5, z0 = floor(z);
    vec4 a = mix(textureLod(uG, sl(z0, c.xy), 0.0), textureLod(uG, sl(z0 + 1.0, c.xy), 0.0), z - z0);
    if (i == 0) { mo = a.xyz; rho = a.w; }
    else if (i < 7) grad += OFF[i] * a.w;
    else sunD += a.w;
  }
  float w = max(d[5].w, 0.001), rho0 = d[5].y; rho /= w; grad /= w; sunD /= w;
  vec3 c0 = clamp(g, vec3(0.5), vec3(${(C-.5).toFixed(1)}));
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
}`,ke=S+"out vec4 o; void main() { o = vec4(0.0); }",nt=S+j+`layout(location=0) in vec4 aP;
void main() {
  vec2 q = aP.xz + s[4].xz / s[4].y * (-aP.y);
  vec2 uv = (q - s[14].xy) * s[14].z;
  gl_Position = vec4(uv * 2.0 - 1.0, 0.0, 1.0); gl_PointSize = s[14].w;
}`,ct=S+"out vec4 o; void main() { o = vec4(1.0, 1.0, 1.0, 1.0) * 0.045; }",lt=S+j+`in vec2 vUv; out vec4 o; uniform sampler2D uT; uniform sampler2D uSh;
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
}`,ft=S+j+ae+`in vec2 vUv; out vec4 o; uniform sampler2D uT; uniform sampler2D uS2;
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
}`,se=`
vec4 PJ(vec3 p) { vec3 r = p - s[0].xyz; float z = dot(r, s[3].xyz);
  return vec4(dot(r, s[1].xyz) * s[0].w, dot(r, s[2].xyz) * s[0].w, ((z - 0.3) / 59.7 * 2.0 - 1.0) * z, z); }
`,ht=S+j+se+`layout(location=0) in vec4 aP; layout(location=1) in vec4 aV; layout(location=2) in vec4 aX; layout(location=3) in vec4 aR;
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
}`,dt=S+j+ae+`in vec3 vW; in vec3 vN; in vec3 vU; in vec3 vH; in vec4 vUV; in vec3 vK; in vec2 vF; out vec4 o; uniform sampler2D uS2;
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
}`,vt=S+j+se+`out vec2 vL; out vec3 vI; flat out vec4 vP; out float vD;
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
}`,ut=S+j+ae+`in vec2 vL; in vec3 vI; flat in vec4 vP; in float vD; out vec4 o;
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
}`,mt=S+j+se+`out vec4 vC; flat out float vM;
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
}`,pt=S+`in vec4 vC; flat in float vM; out vec4 o;
void main() {
  vec2 q = gl_PointCoord * 2.0 - 1.0; float r = dot(q, q);
  if (vM < 0.5) { float a = max(1.0 - r, 0.0); o = vec4(vC.rgb * a * a, 1.0); }
  else { float rn = sqrt(r); // a bubble: a bright skin, a clear middle, one window highlight
    float ring = smoothstep(1.0, 0.6, rn) * (0.4 + 0.6 * smoothstep(0.2, 0.8, rn));
    vec2 h = q - vec2(-0.3, 0.38);
    o = vec4(vC.rgb * (ring * 0.6 + 1.5 * max(1.0 - dot(h, h) * 26.0, 0.0)), 1.0); }
}`;function Se(t,e,p){const R=t.createProgram();return t.attachShader(R,e(t.VERTEX_SHADER,p[0])),t.attachShader(R,e(t.FRAGMENT_SHADER,p[1])),p[2]&&t.transformFeedbackVaryings(R,p[2],t.INTERLEAVED_ATTRIBS),t.linkProgram(R),R}function Ue(t,e,p){if(!t.getProgramParameter(e,t.LINK_STATUS)){const c=t.getAttachedShaders(e).map(_=>t.getShaderInfoLog(_)).join(`
`);throw new Error("166 "+p+": "+t.getProgramInfoLog(e)+" "+c)}const R=t.getUniformBlockIndex(e,"S"),b=t.getUniformBlockIndex(e,"D");R!==t.INVALID_INDEX&&R!==4294967295&&t.uniformBlockBinding(e,R,0),b!==t.INVALID_INDEX&&b!==4294967295&&t.uniformBlockBinding(e,b,1),t.useProgram(e);for(const[c,_]of[["uT",0],["uS2",1],["uG",2],["uM",3],["uSh",4]]){const a=t.getUniformLocation(e,c);a&&t.uniform1i(a,_)}}function xt(t,e,p){if(!e.stepF[p]){const b=Se(t,(c,_)=>{const a=t.createShader(c);return t.shaderSource(a,_),t.compileShader(a),a},[Me(p),ke,["oP","oV","oX"]]);Ue(t,b,"step"+p),e.stepF[p]=b}return e.stepF[p]}function wt(t,e){const p=(M,J)=>{const Z=t.createShader(M);return t.shaderSource(Z,J),t.compileShader(Z),Z},R={bake:[H0,at],splat:[st,rt],med:[H0,it],step:[Me(e),ke,["oP","oV","oX"]],shadow:[nt,ct],shaft:[H0,lt],bg:[H0,ft],fish:[ht,dt],pred:[vt,ut],fx:[mt,pt]},b={};for(const M in R)b[M]=Se(t,p,R[M]);for(const M in b)Ue(t,b[M],M);const c=t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float"),_=(M,J,Z,I,V,B)=>{const n0=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n0),t.texImage2D(t.TEXTURE_2D,0,Z,M,J,0,I,V,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,B),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,B),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),n0},a=M=>{const J=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,J),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,M,0),J},a0=c?_(W,W,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR):_(W,W,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR),Y=_(128,128,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR),T0=t.createTexture();t.bindTexture(t.TEXTURE_2D,T0),t.texStorage2D(t.TEXTURE_2D,9,t.RGBA8,256,256),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const U=t.getExtension("EXT_texture_filter_anisotropic");U&&t.texParameterf(t.TEXTURE_2D,U.TEXTURE_MAX_ANISOTROPY_EXT,4);const Q=new Float32Array(28*4);let g0=12345;const G0=()=>(g0=g0*1664525+1013904223>>>0,g0/4294967296);for(let M=0;M<28;M++){const J=1.6+13*Math.pow(M/27,1.3),Z=G0()*v0;let I=Math.round(Math.cos(Z)*J),V=Math.round(Math.sin(Z)*J);!I&&!V&&(I=1);const B=Math.hypot(I,V);Q.set([I,V,.62/Math.pow(B,1.9),G0()*v0],M*4)}const m0=a(T0);t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.viewport(0,0,256,256),t.useProgram(b.bake),t.uniform4fv(t.getUniformLocation(b.bake,"uW"),Q),t.uniform1i(t.getUniformLocation(b.bake,"uN"),28);const z0=t.createVertexArray();t.bindVertexArray(z0),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,T0),t.generateMipmap(t.TEXTURE_2D);const W0={P:b,hf:!!c,vao:z0,surfT:T0,gridT:a0,gridF:a(a0),shadowT:Y,shadowF:a(Y),shafts:new Map,stepF:{[e]:b.step},tex:_,fbo:a};return t.bindFramebuffer(t.FRAMEBUFFER,null),W0}const Be=typeof FinalizationRegistry=="function"?new FinalizationRegistry(t=>{for(const e of t.b)t.gl.deleteBuffer(e);for(const e of t.t)t.gl.deleteTexture(e);for(const e of t.f)t.gl.deleteFramebuffer(e);for(const e of t.v)t.gl.deleteVertexArray(e);for(const e of t.x)t.gl.deleteTransformFeedback(e)}):null;ze.add({num:166,name:"Bait Ball",fam:"Worlds",recipe:"Tens of thousands of silver fish herded up against the surface, each flashing when it catches the sun, so a startle sweeps across the school as a sheet of light. The school's shape changes every mint, and rarely it's torn in two or down to the last few. Drag through it to hunt (fast drags split it), tap for a strike, or hold to push the ball up against the surface.",interactive:"Drag through the ball to be a predator: it opens around your path with a flash wave, and a fast drag splits it. Tap for a strike and a burst of fish, bubbles and falling scales. Hold to push the ball slowly up against the surface.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,p=t.size;let R=2654435769;const b=t.hash.slice(2);for(let o=0;o<b.length;o+=8)R=Math.imul(R^parseInt(b.slice(o,o+8),16),1540483477)>>>0;const c=()=>{R=R+1831565813|0;let o=Math.imul(R^R>>>15,1|R);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},_=o=>{let s=c(),n;for(n in o)if(s-=o[n],s<=0)return n;return n},a={fish:_({"sardine silver":.55,anchovy:.33,"blue-green jacks":.12}),water:_({"tropical blue":.55,"green temperate":.33,"deep dusk":.12}),ball:_({tight:.3,great:.55,towering:.15}),light:_({noon:.62,"low sun":.38}),predator:_({dolphins:.38,sharks:.27,tuna:.23,"diving gannets":.12}),bubbles:_({few:.5,trails:.38,"gannet plumes":.12}),turn:_({slow:.5,fast:.35,"against itself":.15}),shape:_({round:.55,egg:.3,flattened:.15})};t.home&&(a.fish="sardine silver",a.water="tropical blue",a.ball="great",a.light="noon",a.predator="dolphins",a.bubbles="trails",a.shape="round",a.turn="slow"),t.trait("Fish",a.fish),t.trait("Water",a.water),t.trait("Ball",a.ball),t.trait("Light",a.light);let a0=2246822507;for(let o=0;o<b.length;o+=8)a0=Math.imul(a0^parseInt(b.slice(o,o+8),16),3266489909)>>>0;const Y=()=>{a0=a0+1831565813|0;let o=Math.imul(a0^a0>>>15,1|a0);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},T0=o=>{let s=Y(),n;for(n in o)if(s-=o[n],s<=0)return n;return n};a.view=t.home?"below the ball":T0({"below the ball":.4,"from the deep":.24,"level, from the side":.24,"in close":.12});const U=Y()<.5?1:-1,Q=Y();!t.home&&Y()<.1&&(a.shape="torn in two");const g0=(Y()-.5)*.9;!t.home&&a.shape!=="torn in two"&&Y()<.14&&(a.shape="the last few"),!t.home&&Y()<.3&&(a.view="from the surface");const G0=t.home?3.8:3.62+Y()*.22;let m0=668265350;for(let o=0;o<b.length;o+=8)m0=Math.imul(m0^parseInt(b.slice(o,o+8),16),374761393)>>>0;const z0=()=>{m0=m0+1831565813|0;let o=Math.imul(m0^m0>>>15,1|m0);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},W0=z0(),M=z0(),J=z0();!t.home&&(a.shape==="round"||a.shape==="egg"||a.shape==="flattened")&&(a.shape=W0<.21?"a ring":W0<.39?"a pillar":a.shape),!t.home&&a.shape!=="torn in two"&&a.water!=="deep dusk"&&/below|deep|level/.test(a.view)&&M<.2&&(a.view="from far off"),a.shape==="a pillar"&&(a.view==="below the ball"||a.view==="in close")&&(a.view="level, from the side"),a.shape==="a ring"&&a.turn==="against itself"&&(a.turn="fast"),t.trait("Predator",a.predator),t.trait("Bubbles",a.bubbles),t.trait("Turn",a.turn),t.trait("Shape",a.shape),t.trait("View",a.view);const Z={tight:[.62,1.6],great:[.85,1.95],towering:[1,2.3]}[a.ball],I={"sardine silver":{n:1,L:.18,dp:.21,back:[.012,.035,.07],silver:[.94,.98,1.02],belly:[1,1,1],tail:[.2,.26,.28]},anchovy:{n:1.12,L:.125,dp:.15,back:[.05,.055,.03],silver:[.98,.93,.74],belly:[.98,.95,.85],tail:[.3,.28,.18]},"blue-green jacks":{n:.34,L:.31,dp:.31,back:[0,.11,.12],silver:[.72,1,.96],belly:[.9,1,.9],tail:[.55,.5,.12]}}[a.fish],V={"tropical blue":{deep:[.0015,.012,.05],mid:[.005,.06,.19],top:[.022,.2,.46],win:[1.5,1.8,1.9],k:.075},"green temperate":{deep:[.002,.018,.02],mid:[.012,.085,.08],top:[.06,.26,.2],win:[1.6,1.85,1.45],k:.086},"deep dusk":{deep:[8e-4,.002,.009],mid:[.004,.012,.05],top:[.05,.05,.14],win:[2.2,1.05,.5],k:.082}}[a.water],B=a.light==="noon"?[.08,1,-.78]:[.3,.68,-.66];{const o=Math.hypot(...B);B[0]/=o,B[1]/=o,B[2]/=o}const n0=[B[0]*1.33,0,B[2]*1.33];n0[1]=Math.sqrt(Math.max(0,1-n0[0]*n0[0]-n0[2]*n0[2]));const De=a.shape==="the last few",d=Z[1]*(a.fish==="blue-green jacks"?1.08:1)*(De?.92:1),p0=a.shape==="egg"?1.28:a.shape==="flattened"?.76:a.shape==="a pillar"?5:1,x0=a.shape==="a pillar"?d*.56:d,re=a.shape==="torn in two",K0=re?d*.62:0,ie=Math.cos(g0),ne=Math.sin(g0),Pe=a.turn==="fast"?1.25:.72,c0={"a ring":1,"a pillar":2}[a.shape]||0,ce=1,Ie=Math.sqrt(2/3/(Math.PI*ce));let x=Ae.get(e);x||(x=wt(e,c0),Ae.set(e,x));const w0=x.P,yt=xt(e,x,c0),Ne=Math.round(4e4*Z[0]*I.n),y0=Math.round((p<=400?Math.round(Ne*.5):Ne)*(De?.12:1)),bt=p<=400?1.28:1,l0=[(c()-.5)*(t.home?.2:1.1),0,(c()-.5)*.8];let F=[0,-6.3,5.6+d*.3],P=1.73,K=[0,-3.55,0];if(a.view==="from the deep"?(F=[U*(2.2+Q*.6),-7.9-d*.3,4.7],K=[U*.8,-2.7,.2],P=1.7):a.view==="level, from the side"?(F=[U*-(1.7+Q*.7),-4.1,5.1+d*.3],K=[U*-(1.1+Q*.3),-2.55,0],P=1.75):a.view==="from the surface"&&(F=[U*(1.6+Q*.6),-.55,3.4+d*.4],K=[U*-.2,-3.9,-.4],P=1.55),a.shape==="a pillar"?a.view==="level, from the side"?(F=[U*-(2+Q*.6),-4.6,7.4+d*.35],K=[U*-.5,-4.1,0],P=1.6):a.view==="from the deep"&&(F=[U*(4.2+Q*.8),-9.4-d*.3,6.6],K=[U*.4,-3.6,.2],P=1.6):a.view==="in close"&&(F=[U*.9,-5.4,3+d*.35],K=[U*-1.05,-3.1,0],P=1.6),a.view==="from far off"){const o=a.shape==="a pillar"?-3.9:-3.4,s=U*(3+Q*1.8),n=12.6+d*.8;F=[s,-2.7,n];const f=[-s,o+2.7,-n],r=Math.hypot(f[0],f[2]),z=[-f[2]/r,0,f[0]/r],T=J<.5?1:-1,u=Math.hypot(...f);P=1.7,K=[z[0]*T*u*.34/P,o+u*.2/P,z[2]*T*u*.34/P]}a.shape==="a ring"&&a.view==="level, from the side"&&(K[0]*=.3,F[2]+=1.1),a.shape==="a ring"&&a.view==="below the ball"&&(F=[U*.3,-8.3-d*.35,3.1+d*.35],K=[0,-3.3,-.7],P=1.7);const E=[K[0]-F[0],K[1]-F[1],K[2]-F[2]];{const o=Math.hypot(...E);E[0]/=o,E[1]/=o,E[2]/=o}const N=[E[2]*-1,0,E[0]];{const o=Math.hypot(...N);N[0]/=o,N[1]/=o,N[2]/=o}const e0=[N[1]*E[2]-N[2]*E[1],N[2]*E[0]-N[0]*E[2],N[0]*E[1]-N[1]*E[0]];e0[1]<0&&(e0[0]=-e0[0],e0[1]=-e0[1],e0[2]=-e0[2]);const Ft=.31,Et=.75+c()*.5,Rt=a.bubbles==="few"?.45:1,Le=p<=400?260:620,Ce=480,Tt=880,k0=d/7.2,$0=1/k0,le=k0*C,fe=26,Ve=[-fe/2,-fe/2],t0=new Float32Array(16*4),L=(o,s,n)=>{t0[o*4]=s[0],t0[o*4+1]=s[1],t0[o*4+2]=s[2],t0[o*4+3]=n};L(0,F,P),L(1,N,Ft),L(2,e0,p),L(3,E,Et),L(4,B,a.water==="deep dusk"?.85:1),L(5,V.deep,V.k),L(6,V.mid,2.2),L(7,V.top,(a.view==="from the surface"?1.6:a.view==="from the deep"?.8:1)*(a.water==="green temperate"&&a.view!=="from the surface"?.82:1)),L(8,V.win,Rt),L(9,I.back,I.L*bt),L(10,I.silver,I.dp),L(11,I.belly,a.view==="from the deep"?2.4:.45),L(12,n0,Le),L(13,I.tail,Ce),t0[14*4]=Ve[0],t0[14*4+1]=Ve[1],t0[14*4+2]=1/fe,t0[14*4+3]=3;{const o=Math.max(...V.top);for(let s=0;s<3;s++)t0[15*4+1+s]=.35+2.2*(1-V.top[s]/o)}t0[15*4]=G((Math.asin(B[1])-.42)*.5,.14,.55);const j0=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,j0),e.bufferData(e.UNIFORM_BUFFER,t0,e.STATIC_DRAW);const i=new Float32Array(32*4);i[96]=a.turn==="against itself"?1:0,i[97]=a.view==="from the surface"?1.2:0,i[95]=a.water==="deep dusk"?1:0,i[92]=a.view==="from the surface"?3.5:.6,i[93]=a.view==="from the surface"?.8:.22,i[94]=a.view==="from the surface"?1.8:1,i[98]=ce,i[99]=Q*v0,i[103]=Ie,i[101]=a.view==="from far off"?.55:0;const S0=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,S0),e.bufferData(e.UNIFORM_BUFFER,i,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null);const O=new Float32Array(y0*12),U0=new Uint8Array(y0*4),q=[l0[0],-3.25,l0[2]],m=[(c()-.5)*.5,1,(c()-.5)*.5];if(c0===1){const o=F[1]<q[1]?-1:1,s=F[0]-q[0],n=F[2]-q[2],f=(Math.hypot(s,n)||1)*o,r=a.view==="level, from the side"?.62:a.view==="from far off"?1:.7;m[0]=m[0]*.4+s/f*r,m[2]=m[2]*.4+n/f*r}{const o=Math.hypot(...m);m[0]/=o,m[1]/=o,m[2]/=o}c0===2&&(q[1]=-.32-.74*x0*p0);const $=[m[1],-m[0],0];{const o=Math.hypot(...$);$[0]/=o,$[1]/=o}const he=[m[1]*$[2]-m[2]*$[1],m[2]*$[0]-m[0]*$[2],m[0]*$[1]-m[1]*$[0]],E0=[-.62,.24,.74];{const o=Math.hypot(...E0);E0[0]/=o,E0[1]/=o,E0[2]/=o}for(let o=0;o<y0;o++){const s=o*12,n=c(),f=c()*v0,r=c()*2-1,z=Math.sqrt(1-r*r),T=d*Math.pow(n,.42)*(.95+c()*.16);let u=Math.cos(f)*z*T,y=r*T*p0,A=Math.sin(f)*z*T;if(re){const h=u*ie+y*ne>=0?1:-1;u=u*.8+h*ie*K0,y=y*.8+h*ne*K0,A*=.8}if(c0===1){const h=d*Ie*Math.sqrt(n)*1.1,k=r*_e,H=d*ce+h*Math.cos(k),oe=Math.cos(f)*H,V0=Math.sin(f)*H,i0=h*Math.sin(k);u=$[0]*oe+he[0]*V0+m[0]*i0,y=$[1]*oe+he[1]*V0+m[1]*i0,A=$[2]*oe+he[2]*V0+m[2]*i0}else if(c0===2){const h=-.6+(r+1)*.675,k=1+.7*G((h-.1)/.65,0,1)-.4*G(-h/.7,0,1),H=x0*Math.sqrt(Math.max(k*k-h*h,.01)*n);u=Math.cos(f)*H,A=Math.sin(f)*H,y=h*x0*p0}const o0=m[1]*A-m[2]*y,C0=m[2]*u-m[0]*A,g=m[0]*y-m[1]*u,s0=Pe/d,r0=(u*E0[0]+y*E0[1]+A*E0[2])/d-.1,l=Math.exp(-r0*r0*16);O[s]=q[0]+u,O[s+1]=q[1]+y,O[s+2]=q[2]+A,O[s+3]=-.56*l*Math.sign(o0||1),O[s+4]=o0*s0+(c()-.5)*.3,O[s+5]=C0*s0+(c()-.5)*.14,O[s+6]=g*s0+(c()-.5)*.3,O[s+7]=0,O[s+8]=Math.exp(-Math.max(0,(d-(u*B[0]+y*B[1]+A*B[2]))/d)*1.2),O[s+9]=l*.5,O[s+10]=c()*v0,O[s+11]=0,U0[o*4]=c()*255,U0[o*4+1]=c()*255,U0[o*4+2]=c()*255,U0[o*4+3]=c()*255}const B0=[e.createBuffer(),e.createBuffer()];for(const o of B0)e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,O,e.DYNAMIC_COPY);const de=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,de),e.bufferData(e.ARRAY_BUFFER,U0,e.STATIC_DRAW);const Oe=B0.map(o=>{const s=e.createTransformFeedback();return e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,s),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,0,o),s});e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),e.bindBuffer(e.TRANSFORM_FEEDBACK_BUFFER,null);const qe=(o,s)=>{e.bindBuffer(e.ARRAY_BUFFER,o);for(let n=0;n<3;n++)e.enableVertexAttribArray(n),e.vertexAttribPointer(n,4,e.FLOAT,!1,48,n*16),e.vertexAttribDivisor(n,s)},Y0=B0.map(o=>{const s=e.createVertexArray();return e.bindVertexArray(s),qe(o,0),s}),Xe=B0.map(o=>{const s=e.createVertexArray();return e.bindVertexArray(s),qe(o,1),e.bindBuffer(e.ARRAY_BUFFER,de),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,4,e.UNSIGNED_BYTE,!0,4,0),e.vertexAttribDivisor(3,1),s});e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null);let R0=0;const Q0=[0,1].map(()=>x.hf?x.tex(W,W,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR):x.tex(W,W,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR)),ve=Q0.map(x.fbo);for(const o of ve)e.bindFramebuffer(e.FRAMEBUFFER,o),e.disable(e.SCISSOR_TEST),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);let D0=0;const b0=p>=640?340:Math.max(128,Math.round(p*.5));let P0=x.shafts.get(b0);if(!P0){const o=x.tex(b0,b0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR);P0={t:o,f:x.fbo(o)},x.shafts.set(b0,P0)}e.bindFramebuffer(e.FRAMEBUFFER,null);const X={dolphins:0,sharks:1,"diving gannets":2,tuna:3}[a.predator],He=[1.05,1.3,.72,1.15][X],Ge=[.56,.72,.45,.6][X],I0=[0,1,2,3].map(()=>({x:0,y:0,z:0,vx:0,vy:0,vz:0,r:0,st:0,life:0,vis:0,kind:X,ax:0,ay:0,az:0,wave:!0})),ue=[0,1,2,3].map(()=>({x:0,y:-40,z:0,age:-1,ex:0,ey:0,ez:0,bird:0}));let me=0;const Mt=new Float32Array(16);let w=0,We=0;const F0=c()*v0;let J0=0,A0=0,pe=1,xe=0;const v=[q[0],q[1],q[2]],f0=[q[0],q[1],q[2]],h0=m.slice();let Ke=G0,$e=t.home?1:2.2+c()*2,je=.4,d0=0,D=[0,0,0],N0=0,Z0=!1,we=-1,ye=0,be=0,L0=0,kt=0,St=0,Fe=0,Ee=0,Re=0,_0=0,Te=0;const Ye=(o,s)=>{const n=o*2-1,f=1-s*2,r=E[0]*P+N[0]*n+e0[0]*f,z=E[1]*P+N[1]*n+e0[1]*f,T=E[2]*P+N[2]*n+e0[2]*f,u=((v[0]-F[0])*E[0]+(v[1]-F[1])*E[1]+(v[2]-F[2])*E[2])/(r*E[0]+z*E[1]+T*E[2]);return[F[0]+r*u,Math.min(F[1]+z*u,-.1),F[2]+T*u]},M0=t.sound,Qe=(o,s)=>{for(let n=0;n<9;n++)M0.hit("click",s*(.7+.3*c()),{at:n*(.03+.012*n),pan:o})},Je=(o,s)=>{for(let n=0;n<6;n++){const f=500+c()*900;M0.note(0,{freq:f,dur:.05+c()*.05,vel:o*(.4+c()*.5),wave:"sine",at:n*.035+c()*.03,pan:s})}},ee=(o,s)=>M0.hit("noise",o,{cutoff:700,dur:.55,pan:s}),te=(o,s,n,f,r,z,T,u,y,A,o0,C0)=>{let g=null;for(let k=1;k<4;k++)if(I0[k].life<=0){g=I0[k];break}if(!g)return null;const s0=r-s,r0=z-n,l=T-f,h=Math.hypot(s0,r0,l)||1;return g.x=s,g.y=n,g.z=f,g.vx=s0/h*u,g.vy=r0/h*u,g.vz=l/h*u,g.r=y,g.st=A,g.life=o0,g.vis=C0,g.kind=o,g.vs=0,g},ge=(o,s,n,f)=>{const r=ue[me];if(me=(me+1)%4,r.x=o,r.y=s,r.z=n,r.age=0,r.bird=f?1:0,f)r.ex=o+(c()-.5)*1.4,r.ey=-.05,r.ez=n+(c()-.5)*.8,te(2,r.ex,r.ey,r.ez,o,s,n,11,d*.34,1.3,Math.hypot(o-r.ex,s-r.ey,n-r.ez)/11+.12,0);else{const T=c()*v0,u=Math.cos(T),y=Math.sin(T),A=1.9;r.ex=o+u*A,r.ey=s-.6*(c()-.2),r.ez=n+y*A*.7,te(X===2?0:X,r.ex,r.ey,r.ez,o-u*.4,s,n-y*.4,9,d*.34,1.2,.8,1)}D[0]=o,D[1]=s,D[2]=n,d0=3,N0=4.5;const z=G(o/4,-1,1);ee(.8,z),Je(.7,z),f?M0.hit("kick",.5,{pan:z}):Qe(z,.4)},gt=()=>{const o=c()<.5?1:-1,s=(c()-.5)*2.4,n=(c()-.45)*3.2,f=v[0]+o*(9+c()*2),r=v[1]+s+(c()-.5)*1.4,z=v[2]+n,T=v[0]+(c()-.5)*d*1.2,u=v[1]+s*.6,y=v[2]+n*.5,A=X===1?5.2:X===3?9:7,o0=X===2?0:X;te(o0,f,r,z,T,u,y,A,d*.27,1,22/A,.9),X===0&&c()<.8&&te(o0,f+o*2,r-.9,z+.8,T,u-.6,y+.5,A,d*.24,.9,24/A,.85),X===0&&Qe(G(o*.7,-1,1),.28),ee(.32,G(o*.5,-1,1))},zt=()=>{ge(v[0]+(c()-.5)*d*1.3,v[1]+(c()-.2)*d*.9,v[2]+d*(.2+c()*.5),!0)},At=o=>{const s=I0[o],f=(6+o*2)*4;i[f]=s.x,i[f+1]=s.y,i[f+2]=s.z,i[f+3]=Math.max(s.r,.01),i[f+4]=s.vx,i[f+5]=s.vy,i[f+6]=s.vz,i[f+7]=s.life>0?s.st:0;const r=(26+o)*4;i[r]=s.life>0&&s.vs||0,i[r+1]=o===0?He:s.kind===2?.72:He,i[r+2]=o===0?Ge:s.kind===2?.45:Ge,i[r+3]=s.kind},Ze=o=>{w+=o,We++;const s=t.input,n=s.taps();let f=null;if(n.length){const l=n[n.length-1];!s.down&&!Z0&&(f=l)}const r=I0[0];if(s.down){const l=Ye(s.x,s.y);Z0||(we=w,ye=s.x,be=s.y,L0=0,Fe=l[0],Ee=l[1],Re=l[2]);const h=(l[0]-Fe)/o,k=(l[1]-Ee)/o,H=(l[2]-Re)/o;Fe=l[0],Ee=l[1],Re=l[2];const oe=Math.hypot(h,k,H);L0=Math.max(L0,Math.hypot(s.x-ye,s.y-be));const V0=w-we;r.x=l[0],r.y=l[1],r.z=l[2],r.vx+=(h-r.vx)*.5,r.vy+=(k-r.vy)*.5,r.vz+=(H-r.vz)*.5;const i0=Math.hypot(r.vx,r.vy,r.vz);if(L0>.025){if(r.life=1,r.st=1+Math.min(i0*.1,.8),r.r=d*(.3+Math.min(i0*.035,.32)),_0+=(G((i0-1.2)/5,0,.75)-_0)*.25,D[0]=l[0]+r.vx*.05,D[1]=l[1]+r.vy*.05,D[2]=l[2]+r.vz*.05,i0>.6&&(d0=1,N0=2.2+Math.min(i0*.2,1.5)),i0>5&&Math.hypot(l[0]-v[0],l[1]-v[1],l[2]-v[2])<d*1.15){const O0=-r.vy,q0=r.vx,X0=Math.hypot(O0,q0)||1;pe=O0/X0,xe=q0/X0,A0=Math.max(A0,d*.7),Te<=0&&(ee(.6,G(l[0]/4,-1,1)),Te=.3)}}else if(V0>.25){r.life=1,r.st=.13,r.r=d*.85,J0=Math.min(1,J0+o*.3);const O0=v[0]-l[0],q0=v[2]-l[2],X0=Math.hypot(O0,q0)+.5;l0[0]=G(l0[0]+O0/X0*o*.28,-1.7,1.7),l0[2]=G(l0[2]+q0/X0*o*.1,-1.5,1.5),_0*=.85}else r.life=0,_0*=.85}else Z0&&w-we<.3&&L0<.03&&(f={x:ye,y:be}),r.life=0,_0*=.85,J0*=Math.exp(-o*.1);if(r.vs=_0,Z0=s.down,f){const l=Ye(f.x,f.y);ge(l[0],l[1],l[2],X===2||f.y<.3)}if(w>Ke){Ke=w+1.9+c()*1.1;const l=c()*v0;D[0]=v[0]+Math.cos(l)*d*.85,D[1]=v[1]+Math.sin(l)*d*.7,D[2]=v[2]+d*.32,d0<=0&&(d0=3,N0=2.5,ee(.2,G(D[0]/4,-1,1)))}w>$e&&($e=w+4.6+c()*3.6,X===2||a.bubbles==="gannet plumes"&&c()<.55?zt():c()<.2?ge(v[0]+(c()-.5)*d,v[1]+(c()-.5)*d*.8,v[2]+d*.3,!1):gt()),w>je&&(je=w+1.1+c()*1.4,M0.note(29+Math.floor(c()*5),{dur:1.7,vel:.22,wave:"sine",cutoff:160,attack:.5}),M0.hit("noise",.07,{cutoff:240,dur:1.2}),a.bubbles!=="few"&&c()<.3&&Je(.1,(c()-.5)*1.2)),Te-=o;for(let l=1;l<4;l++){const h=I0[l];h.life>0&&(h.life-=o,h.x+=h.vx*o,h.y+=h.vy*o,h.z+=h.vz*o,h.vs=Math.min((h.vs||0)+o*5,h.vis)*Math.min(h.life*5,1),Math.hypot(h.x-v[0],h.y-v[1],h.z-v[2])<d*1.5&&d0<=0&&(D[0]=h.x+h.vx*.09,D[1]=h.y+h.vy*.09,D[2]=h.z+h.vz*.09,d0=1,N0=2.1))}for(const l of ue)l.age>=0&&(l.age+=o,l.age>12&&(l.age=-1));const z=.14+.32*(.5+.5*Math.sin(w*.13+F0)),T=G(z+J0,0,1),u=1+.035*Math.sin(w*.8+F0),y=x0*(1-.27*T)*u,A=c0===2?-.32-.5*x0*p0:-y*p0*.62,o0=c0===2?-.32-.74*x0*p0:-3.5-(d-1.9)*.3,C0=o0+(A-o0)*T*T,g=Math.exp(-o*.6);l0[0]*=Math.exp(-o*.02),v[0]+=(l0[0]+.3*Math.sin(w*.11+F0)-v[0])*(1-g),v[1]+=(C0+.1*Math.sin(w*.23)-v[1])*(1-g),v[2]+=(l0[2]+.2*Math.cos(w*.09)-v[2])*(1-g),f0[0]+=(v[0]-f0[0])*.1,f0[1]+=(v[1]-f0[1])*.1,f0[2]+=(v[2]-f0[2])*.1,h0[0]=m[0]+.25*Math.sin(w*.07+F0),h0[2]=m[2]+.25*Math.cos(w*.05+F0),h0[1]=m[1],A0*=Math.exp(-o*.42),re&&A0<K0&&(A0=K0,pe=ie,xe=ne),i[0]=w,i[1]=o,i[2]=We,i[3]=10,i[4]=v[0],i[5]=v[1],i[6]=v[2],i[7]=y,i[8]=f0[0]-le/2,i[9]=f0[1]-le/2,i[10]=f0[2]-le/2,i[11]=$0;const s0=Math.hypot(h0[0],h0[1],h0[2]);i[12]=h0[0]/s0,i[13]=h0[1]/s0,i[14]=h0[2]/s0,i[15]=Pe,c0===2&&(i[100]=x0*(.9*Math.sin(w*.13+F0)+.5*Math.sin(w*.31+2*F0)),i[102]=x0*(.7*Math.cos(w*.11+F0)+.45*Math.sin(w*.23+1.7))),i[16]=pe,i[17]=0+xe,i[18]=0,i[19]=A0,i[20]=.82,i[21]=y0*k0*k0*k0/(4.19*y*y*y*p0)*1.8,i[22]=p0,i[23]=x.hf?1:8/255;for(let l=0;l<4;l++)At(l);for(let l=0;l<4;l++){const h=ue[l],k=(14+l)*4,H=(18+l)*4;i[k]=h.x,i[k+1]=h.y,i[k+2]=h.z,i[k+3]=h.age,i[H]=h.ex,i[H+1]=h.ey,i[H+2]=h.ez,i[H+3]=h.bird}let r0=22*4;i[r0]=(D[0]-i[8])*$0,i[r0+1]=(D[1]-i[9])*$0,i[r0+2]=(D[2]-i[10])*$0,i[r0+3]=d0>0?N0:0,d0>0&&d0--,i[120]=6,i[121]=1,i[122]=4,i[123]=4,i[124]=(b0>=340?26:20)*(a.view==="from the surface"?1.6:1),i[125]=w*.016,i[126]=w*.011,i[127]=b0},et=()=>{e.bindBuffer(e.UNIFORM_BUFFER,S0),e.bufferSubData(e.UNIFORM_BUFFER,0,i),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,0,j0),e.bindBufferBase(e.UNIFORM_BUFFER,1,S0),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindFramebuffer(e.FRAMEBUFFER,x.gridF),e.viewport(0,0,W,W),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.useProgram(w0.splat),e.bindVertexArray(Y0[R0]),e.drawArrays(e.POINTS,0,y0),e.disable(e.BLEND),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,x.gridT),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Q0[D0]),e.bindFramebuffer(e.FRAMEBUFFER,ve[1-D0]),e.useProgram(w0.med),e.bindVertexArray(x.vao),e.drawArrays(e.TRIANGLES,0,3),D0=1-D0,e.bindTexture(e.TEXTURE_2D,Q0[D0]),e.bindFramebuffer(e.FRAMEBUFFER,x.shadowF),e.useProgram(yt),e.bindVertexArray(Y0[R0]),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,Oe[1-R0]),e.enable(e.RASTERIZER_DISCARD),e.beginTransformFeedback(e.POINTS),e.drawArrays(e.POINTS,0,y0),e.endTransformFeedback(),e.disable(e.RASTERIZER_DISCARD),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),e.bindVertexArray(null),R0=1-R0},tt=()=>{e.bindBufferBase(e.UNIFORM_BUFFER,0,j0),e.bindBufferBase(e.UNIFORM_BUFFER,1,S0),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindFramebuffer(e.FRAMEBUFFER,x.shadowF),e.viewport(0,0,128,128),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.useProgram(w0.shadow),e.bindVertexArray(Y0[R0]),e.drawArrays(e.POINTS,0,Math.ceil(y0/5)),e.disable(e.BLEND),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,x.surfT),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,x.shadowT),e.bindFramebuffer(e.FRAMEBUFFER,P0.f),e.viewport(0,0,b0,b0),e.useProgram(w0.shaft),e.bindVertexArray(x.vao),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,p,p),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,P0.t),e.enable(e.SCISSOR_TEST),e.scissor(0,0,p,p),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.useProgram(w0.fish),e.bindVertexArray(Xe[R0]),e.drawArraysInstanced(e.TRIANGLE_STRIP,1,13,y0),e.depthMask(!1),e.depthFunc(e.LEQUAL),e.depthRange(1,1),e.useProgram(w0.bg),e.bindVertexArray(x.vao),e.drawArrays(e.TRIANGLES,0,3),e.depthRange(0,1),e.depthFunc(e.LESS),e.depthMask(!1),e.colorMask(!0,!0,!0,!1),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(w0.pred),e.bindVertexArray(x.vao),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,4),e.blendFunc(e.ONE,e.ONE),e.useProgram(w0.fx),e.drawArrays(e.POINTS,0,Le+Ce+Tt),e.bindVertexArray(null),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.colorMask(!0,!0,!0,!0),e.bindBufferBase(e.UNIFORM_BUFFER,0,null),e.bindBufferBase(e.UNIFORM_BUFFER,1,null)};Ze(1/30),et(),tt();const ot=(o,s)=>{const n=s>.05?2:1,f=Math.min(s,.1)/n;for(let r=0;r<n;r++)Ze(f),et();tt()};return Be&&Be.register(ot,{gl:e,b:[...B0,de,j0,S0],t:Q0,f:ve,v:[...Y0,...Xe],x:Oe}),ot}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
