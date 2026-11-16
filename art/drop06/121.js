// Shaking Dish: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/121.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Rt){Rt&&function(){"use strict";const rt=new WeakMap,ae=.8,re=.7,ne=1,se=.6,ce=4e-4,nt=[.9,.96,1],ie=10,fe=[.74,.81,.95,.034],t0=`
`,a0="#version 300 es"+t0+"precision highp float;"+t0+"precision highp int;"+t0+"precision highp sampler2D;"+t0,Ft=a0+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",gt=`
#ifdef ENC8
vec2 S(ivec2 c){ vec4 t = texelFetch(uS, c, 0); return (vec2(t.r * 65280.0 + t.g * 255.0, t.b * 65280.0 + t.a * 255.0) / 65535.0) * 5.0 - 2.5; }
vec4 E(vec2 s){ vec2 q = floor(clamp((s + 2.5) / 5.0, 0.0, 1.0) * 65535.0 + 0.5); vec2 hi = floor(q / 256.0); vec2 lo = q - hi * 256.0; return vec4(hi.x, lo.x, hi.y, lo.y) / 255.0; }
#else
vec2 S(ivec2 c){ return texelFetch(uS, c, 0).xy; }
vec4 E(vec2 s){ return vec4(s, 0.0, 1.0); }
#endif
`,ue=a0+`uniform sampler2D uS; uniform sampler2D uM;
uniform vec4 uP[16]; uniform ivec4 uI;
out vec4 o;
const float B8[9] = float[9](1.0, 8.0, 28.0, 56.0, 70.0, 56.0, 28.0, 8.0, 1.0);
const float B4[9] = float[9](0.0, 0.0, 1.0, 4.0, 6.0, 4.0, 1.0, 0.0, 0.0);
${gt}
float hsh(ivec2 c, int s){ uint x = uint(c.x) * 1973u + uint(c.y) * 9277u + uint(s) * 26699u + 7u; x = (x ^ (x >> 15)) * 0x2c1b3c6du; x = (x ^ (x >> 12)) * 0x297a2d39u; x ^= x >> 15; return float(x) * (1.0 / 4294967295.0); }
void main(){
  ivec2 c = ivec2(gl_FragCoord.xy);
  vec4 m = texelFetch(uM, c, 0);
  if (m.r < 0.5) { o = E(vec2(0.0)); return; }
  vec2 g1 = vec2(0.0), g2 = vec2(0.0);
  int R = uI.x;
  for (int j = -R; j <= R; j++) {
    float a8 = B8[j + 4], a4 = B4[j + 4];
    for (int i = -R; i <= R; i++) {
      vec2 s = S(c + ivec2(i, j));
      g2 += (B8[i + 4] * a8) * s;
      g1 += (B4[i + 4] * a4) * s;
    }
  }
  float qf = uP[1].y;
  vec2 s0 = S(c) * qf;
  g1 *= qf / 256.0; g2 *= qf / 65536.0;
  float U = s0.x, V = s0.y, W = U + V;
  vec2 D1 = 2.0 * (g1 - s0), D2 = 4.0 * (g2 - 2.0 * g1 + s0);
  float Lu = -(U + uP[2].x * D1.x + uP[2].y * D2.x);
  float Lv = -(V + uP[2].z * D1.y + uP[2].w * D2.y);
  float nu = uP[0].z * U * U + 2.0 * uP[0].w * U * V - U * U * U - U * V * V;
  float nv = uP[0].w * U * U - V * V * V - U * U * V;
  float nl = uP[1].w * W * W - W * W * W;
  float dt = uP[1].z;
  float fu = uP[0].x * U + Lu + mix(nu, nl, uP[1].x);
  float fv = uP[0].y * V + Lv + mix(nv, nl, uP[1].x);
  float d = m.g * 64.0;
  // the wall: the meniscus, shaken at the drive, forces rolls parallel to it, and holds the lattice off it (the lattice
  // proper begins about two wavelengths in, after one row of squeezed cells)
  float wd = uP[14].x * exp(-d / uP[14].y);
  fu += uP[3].x * cos(uP[3].y * d) * exp(-d / uP[3].z) - wd * U;
  fv -= wd * V;
  float un = U + dt * fu + uP[3].w * (hsh(c, uI.w) - 0.5);
  float vn = V + dt * fv;
  vec2 pc = vec2(c) + 0.5;
  for (int k = 0; k < uI.y; k++) { vec4 I = uP[6 + k]; vec2 dd = pc - I.xy; un += I.z * exp(-dot(dd, dd) / (2.0 * I.w * I.w)); }
  for (int k = 0; k < uI.z; k++) { float th = uP[5].x + float(k) * uP[5].y; un += uP[4].x * cos(uP[4].y * dot(pc - uP[4].zw, vec2(cos(th), sin(th)))); }
  o = E(clamp(vec2(un, vn), -2.2, 2.2));
}`,zt=`
vec3 gelC(float a){ float s = fract(a) * 3.0; float i = floor(s), f = s - i;
  vec3 c0 = i < 0.5 ? uL[4].rgb : i < 1.5 ? uL[5].rgb : uL[6].rgb; vec3 c1 = i < 0.5 ? uL[5].rgb : i < 1.5 ? uL[6].rgb : uL[4].rgb;
  return mix(c0, c1, smoothstep(0.8, 1.0, f)); }
vec3 env(vec3 p, vec3 r, float rough, float foot){
  float kind = uL[3].x;
  vec3 col = uL[3].z * vec3(0.55, 0.57, 0.62) * (0.12 + 0.88 * clamp(r.z, 0.0, 1.0));
  col += uL[3].z * 4.0 * vec3(0.9, 0.85, 0.75) * exp(-14.0 * dot(r.xy - vec2(-0.55, 0.45), r.xy - vec2(-0.55, 0.45))) * step(0.0, r.z);
  if (r.z <= 0.02) return col;
  float t = (uL[0].z - p.z) / r.z;
  vec2 q = p.xy + r.xy * t;
  float sp = rough * t + foot;
  if (kind < 0.5 || kind > 1.5) {
    vec2 dq = q - uL[0].xy; float d = length(dq) - uL[0].w;
    float w = uL[3].y, we2 = w * w + sp * sp;
    float an = atan(dq.y, dq.x);
    float I = w * inversesqrt(we2) * exp(-0.5 * d * d / we2)
            + 0.012 * exp(-0.5 * d * d / (0.0036 + we2)) + 0.003 * exp(-0.5 * d * d / (0.03 + we2));
    vec3 lc = kind > 1.5 ? gelC(an * 0.1591549 + 0.08) : uL[1].rgb;
    col += lc * (uL[1].w * I);
  } else {
    float R = uL[2].w, d = length(q - uL[2].xy) - R;
    float we = sqrt(0.0001 + sp * sp);
    float I = (R * R / (R * R + sp * sp)) * smoothstep(we + uL[2].z, -we - uL[2].z, d) + 0.006 * exp(-max(d, 0.0) * 12.0);
    col += uL[7].rgb * (uL[7].w * I);
  }
  return col;
}
vec3 irr(vec3 p, vec3 n, int nr){
  vec3 e = vec3(0.0); float kind = uL[3].x;
  if (kind > 0.5 && kind < 1.5) { vec3 L = vec3(uL[2].xy, uL[0].z) - p; float d2 = dot(L, L); e = uL[7].rgb * (max(dot(n, L * inversesqrt(d2)), 0.0) * uL[0].z * uL[0].z / d2); }
  else for (int k = 0; k < nr; k++) {
    float a = float(k) / float(nr);
    vec3 L = vec3(uL[0].xy + uL[0].w * vec2(cos(a * 6.2831853), sin(a * 6.2831853)), uL[0].z) - p; float d2 = dot(L, L);
    vec3 lc = kind > 1.5 ? gelC(a + 0.08) : uL[1].rgb;
    e += lc * (max(dot(n, L * inversesqrt(d2)), 0.0) * uL[0].z * uL[0].z / d2 / float(nr));
  }
  return e * uL[3].w + uL[3].z * 0.35;
}
vec3 tone(vec3 c, float ex){ c = 1.0 - exp(-max(c, vec3(0.0)) * ex); return pow(c, vec3(0.4545)); }
`,_t=`
float sd2(vec2 p, float sq){ if (sq < 0.5) return length(p) - 1.0; vec2 d = abs(p) - vec2(0.7); return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - 0.18; }
vec2 sdN(vec2 p, float sq){ if (sq < 0.5) return p / max(length(p), 1e-4); vec2 d = abs(p) - vec2(0.7); vec2 g = d.x > 0.0 && d.y > 0.0 ? normalize(d) : (d.x > d.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0)); return g * sign(p + 1e-6); }
`,le=a0+`uniform vec4 uB[8]; uniform vec4 uL[8]; uniform ivec4 uI; uniform sampler2D uD; uniform sampler2D uF;
out vec4 o;
${zt}
${_t}
float zc(float r){ return -0.07 + 0.42 * (r - 1.0); }
float map(vec3 p, out float id){
  float sq = uB[4].x, hw = uB[4].z, T = 0.055, ZB = -0.14;
  float s = sd2(p.xy, sq);
  vec2 q = vec2(s - 0.5 * T, p.z - 0.5 * (hw + ZB));
  vec2 dq = abs(q) - vec2(0.5 * T, 0.5 * (hw - ZB)) + 0.02;
  float wall = length(max(dq, 0.0)) + min(max(dq.x, dq.y), 0.0) - 0.02;
  float liq = max(s, p.z);
  float r = length(p.xy);
  float cone = (p.z - zc(r)) * 0.92;
  float zs = zc(1.47);
  float tor = length(vec2(r - 1.565, p.z - zs)) - 0.095;
  float fr = max(abs(r - 1.95) - 0.29, abs(p.z - zs) - 0.022) - 0.006;
  float sec = 0.7853982, an = atan(p.y, p.x), a2 = mod(an + 0.5 * sec, sec) - 0.5 * sec;
  float scr = length(vec3(r * cos(a2) - 1.82, r * sin(a2), (p.z - zs - 0.02) * 1.8)) - 0.032;
  float tab = p.z + 0.45;
  float d = wall; id = 1.0;
  if (liq < d) { d = liq; id = 2.0; }
  if (cone < d) { d = cone; id = 3.0; }
  if (tor < d) { d = tor; id = 4.0; }
  if (fr < d) { d = fr; id = 5.0; }
  if (scr < d) { d = scr; id = 6.0; }
  if (tab < d) { d = tab; id = 7.0; }
  return d;
}
void main(){
  vec2 sp = gl_FragCoord.xy / uB[1].w * 2.0 - 1.0;
  vec3 ro = uB[0].xyz, rd = normalize(uB[3].xyz + (sp.x * uB[1].xyz + sp.y * uB[2].xyz) * uB[0].w);
  float t = (ro.z - 0.42) / -rd.z, id = 7.0;
  for (int i = 0; i < uI.x; i++) { float d = map(ro + rd * t, id); if (d < 0.0003 * t) break; t += d; if (t > 30.0) break; }
  vec3 p = ro + rd * t;
  vec3 n = vec3(0.0);
  for (int k = 0; k < uI.y; k++) { vec3 e = 0.5773 * (2.0 * vec3(float(((k + 3) >> 1) & 1), float((k >> 1) & 1), float(k & 1)) - 1.0); float dm; n += e * map(p + e * 0.0012, dm); }
  n = normalize(n);
  float r = length(p.xy), an = atan(p.y, p.x), sq = uB[4].x;
  vec3 alb; float F0, rough, top = 0.0, fw = 0.0;
  // the speaker's wear: radial fibre, tonal mottle and dust, from a map baked once (turned per mint)
  vec2 rp = mat2(uB[5].y, uB[5].z, -uB[5].z, uB[5].y) * p.xy;
  vec4 dd = texture(uD, rp * 0.25 + 0.5);
  float pxw = 2.0 * uB[0].w * t / uB[1].w;
  if (id < 1.5) {
    int dm = int(uB[4].y + 0.5);
    alb = dm == 0 ? vec3(0.010, 0.010, 0.012) : dm == 1 ? vec3(0.80, 0.78, 0.74) : vec3(0.30, 0.31, 0.33);
    F0 = dm == 2 ? 0.35 : 0.045; rough = dm == 0 ? 0.002 : dm == 1 ? 0.012 : 0.05;
    // the top edge is ground, not polished: a soft grey band instead of a hairline
    top = smoothstep(0.75, 0.97, n.z);
    // the rounded corners turn the normal a long way inside one pixel: spread the ring's image over that turn
    fw = 250.0 * pxw * 4.0 * n.z * n.z * (1.0 - n.z * n.z);
    alb = mix(alb, dm == 2 ? alb : vec3(0.03, 0.03, 0.032) + alb * 0.8, top); rough = mix(rough, 0.45, top); F0 = mix(F0, 0.008, top);
  } else if (id < 2.5) { o = vec4(0.0, 0.0, 0.0, 1.0); return; }
  else if (id < 3.5) {
    // pressed paper (radial fibre), filled polypropylene, or a woven fibre cone
    float fb = texture(uF, vec2(an * 0.1591549 + 0.5 + uB[5].w, (r - 0.9) * 0.8)).r;
    alb = uB[6].rgb * (1.0 + uB[7].z * (fb * 2.0 - 1.0)); F0 = uB[7].x; rough = uB[7].y;
    if (uB[6].w > 0.5) {
      vec2 w = p.xy * 70.0, fw = fract(w) - 0.5; float par = mod(floor(w.x) + floor(w.y), 2.0);
      float yarn = par > 0.5 ? cos(3.14159 * fw.y) : cos(3.14159 * fw.x);
      alb *= mix(1.0, 0.5 + 0.65 * yarn, clamp(1.6 - 2.2 * pxw * 70.0, 0.0, 1.0));
    }
    // the bead of glue that holds the dish on the cone
    // squeezed out unevenly: wide here, a thread there; a rounded bead, so it carries a thin glint of the lamp
    float gs = sd2(p.xy, sq) - 0.055, bw = 0.006 + uB[2].w * 0.03 * smoothstep(0.3, 0.75, dd.b) + (1.0 - uB[2].w) * 0.022 * dd.b;
    float gw = 1.0 - smoothstep(0.004, 0.006 + bw, gs);
    alb = mix(alb, uB[2].w > 0.5 ? vec3(0.21, 0.19, 0.145) : vec3(0.20, 0.19, 0.17), 0.7 * gw); rough = mix(rough, 0.05 - 0.03 * uB[2].w, gw); F0 = mix(F0, 0.04, gw);
    n = normalize(n + uB[2].w * gw * 0.9 * (1.0 - smoothstep(0.0, 0.006 + bw, gs)) * vec3(sdN(p.xy, sq), 0.0));
  } else if (id < 4.5) { alb = vec3(0.022, 0.022, 0.024); F0 = 0.025; rough = 0.08; }
  else if (id < 5.5) { alb = vec3(0.035, 0.035, 0.037); F0 = 0.1; rough = 0.06; }
  else if (id < 6.5) { alb = vec3(0.10); F0 = 0.55; rough = 0.02; }
  else { alb = vec3(0.004); F0 = 0.01; rough = 0.6; }
  if (id > 2.5 && id < 5.5) { alb = alb * (0.8 + 0.4 * dd.b) + uB[7].w * dd.g * vec3(0.32, 0.31, 0.29); rough = mix(rough, 0.6, dd.g); }
  float cosv = max(dot(-rd, n), 0.0);
  float F = F0 + (1.0 - F0) * pow(1.0 - cosv, 5.0);
  vec3 col = alb * irr(p, n, uI.z) + F * env(p, reflect(rd, n), rough, fw);
  if (id > 2.5 && id < 3.5) { float sd = sd2(p.xy, sq); col *= 0.4 + 0.6 * smoothstep(0.0, 0.16, sd); }
  if (id > 3.5 && id < 4.5) col *= 0.75 + 0.25 * smoothstep(-0.05, 0.08, n.z);
  col *= mix(1.0, 0.35, smoothstep(1.05, 1.9, r));
  // one cold-white ring lamp overhead: the paper is a warm black that cools toward the surround; the dish's glass a
  // blue-black, its ground cut edge the one faint green (not under a gel)
  if (uB[2].w > 0.5) col *= id > 2.5 ? mix(vec3(1.26, 1.0, 0.78), vec3(0.92, 1.0, 1.1), smoothstep(1.05, 1.75, r)) : id < 1.5 && uB[4].y < 0.5 ? mix(vec3(0.8, 1.0, 1.32), vec3(1.05, 1.08, 0.92), top) : vec3(1.0);
  o = vec4(tone(col, uB[5].x), 0.0);
}`,de=a0+`uniform sampler2D uS; uniform sampler2D uBG; uniform vec4 uC[32]; uniform vec4 uL[8]; uniform ivec4 uI;
out vec4 o;
${gt}
${zt}
${_t}
float Wt(ivec2 c){ vec2 s = S(clamp(c, ivec2(0), ivec2(191))); return s.x + s.y; }
void main(){
  float SZ = uC[1].w, sq = uC[5].y;
  vec2 sp = gl_FragCoord.xy / SZ * 2.0 - 1.0;
  vec3 ro = uC[0].xyz, rd = normalize(uC[3].xyz + (sp.x * uC[1].xyz + sp.y * uC[2].xyz) * uC[0].w);
  float tp = -ro.z / rd.z; vec3 p = ro + rd * tp;
  vec3 pt = ro + rd * ((uC[5].w - ro.z) / rd.z);
  float px = 2.0 * uC[0].w * tp / SZ;
  float s = sd2(p.xy, sq), st = sd2(pt.xy, sq);
  float a = clamp(0.5 - s / px, 0.0, 1.0) * clamp(0.5 - st / px, 0.0, 1.0);
  // the surface: a B-spline through the grid, with its slope and curvature
  vec2 x = clamp(p.xy * 92.0 + 96.0, vec2(3.0), vec2(189.0)) - 0.5;
  vec2 ib = floor(x), f = x - ib, g = 1.0 - f;
  vec4 wx = vec4(g.x * g.x * g.x, 3.0 * f.x * f.x * f.x - 6.0 * f.x * f.x + 4.0, -3.0 * f.x * f.x * f.x + 3.0 * f.x * f.x + 3.0 * f.x + 1.0, f.x * f.x * f.x) / 6.0;
  vec4 wy = vec4(g.y * g.y * g.y, 3.0 * f.y * f.y * f.y - 6.0 * f.y * f.y + 4.0, -3.0 * f.y * f.y * f.y + 3.0 * f.y * f.y + 3.0 * f.y + 1.0, f.y * f.y * f.y) / 6.0;
  vec4 dx = vec4(-0.5 * g.x * g.x, 1.5 * f.x * f.x - 2.0 * f.x, -1.5 * f.x * f.x + f.x + 0.5, 0.5 * f.x * f.x);
  vec4 dy = vec4(-0.5 * g.y * g.y, 1.5 * f.y * f.y - 2.0 * f.y, -1.5 * f.y * f.y + f.y + 0.5, 0.5 * f.y * f.y);
  vec4 ddx = vec4(g.x, 3.0 * f.x - 2.0, 1.0 - 3.0 * f.x, f.x), ddy = vec4(g.y, 3.0 * f.y - 2.0, 1.0 - 3.0 * f.y, f.y);
  vec2 dw = vec2(0.0); vec3 hh = vec3(0.0);
  ivec2 i0 = ivec2(ib) - 1;
  for (int b = 0; b < 4; b++) for (int k = 0; k < 4; k++) {
    float v = Wt(i0 + ivec2(k, b));
    dw += vec2(dx[k] * wy[b], wx[k] * dy[b]) * v;
    hh += vec3(ddx[k] * wy[b], wx[k] * ddy[b], dx[k] * dy[b]) * v;
  }
  // the model's field goes to rest over the last two cells at the wall (its mask is a staircase of cells)
  float dd = max(-s, 0.0); vec2 no = sdN(p.xy, sq);
  float Af = uC[4].x * uC[3].w * smoothstep(0.006, 0.026, dd);
  vec2 grad = (Af * 92.0) * dw; vec3 hes = (Af * 8464.0) * hh;
  // the meniscus climbing the wall, and the small harmonic ripples it sends inward
  float em = exp(-dd / uC[4].z);
  float er = exp(-dd / 0.15), ph = uC[5].z * dd - uC[14].x;
  grad += ((uC[4].y / uC[4].z) * em + uC[4].w * uC[5].z * sin(ph) * er) * no;
  float hn = (uC[4].y / (uC[4].z * uC[4].z)) * em - uC[4].w * uC[5].z * uC[5].z * cos(ph) * er;
  hes += hn * vec3(no.x * no.x, no.y * no.y, no.x * no.y);
  vec3 n = normalize(vec3(-grad, 1.0));
  vec3 r = reflect(rd, n);
  // the blur of the reflected light over one pixel, from the curvature (smooth across the 2 x 2 quads, unlike fwidth)
  float foot = min(0.6, 0.6 * uL[0].z * 2.8 * px * length(vec3(hes.x, hes.y, 1.4142 * hes.z)) / max(r.z, 0.08));
  float cosv = max(dot(-rd, n), 0.0);
  float F = uC[6].x + (1.0 - uC[6].x) * pow(1.0 - cosv, 5.0);
  vec3 spec = env(p, r, uC[9].z, foot);
  vec3 liq;
  bool clear = uC[7].w < 0.5;
  vec3 tr = refract(rd, n, 1.0 / uC[6].y);
  vec3 b = p + tr * ((-uC[6].z - p.z) / min(tr.z, -0.05));
  vec3 E = irr(clear ? b : p, clear ? vec3(0.0, 0.0, 1.0) : n, uI.y);
  if (clear) {
    float Dc = uC[6].w;
    float det = (1.0 - Dc * hes.x) * (1.0 - Dc * hes.y) - Dc * Dc * hes.z * hes.z;
    float Ic = min(inversesqrt(det * det + 0.015), 6.0);
    float ao = 0.45 + 0.55 * smoothstep(0.0, 0.12, -sd2(b.xy, sq));
    vec3 fl = uC[8].rgb * E * mix(1.0, Ic, uC[8].w) * ao;
    fl += uC[9].w * env(b, reflect(tr, vec3(0.0, 0.0, 1.0)), 0.003, foot) * ao;
    liq = F * spec + (1.0 - F) * fl * uC[7].rgb;
  } else {
    // opaque: no floor, only the surface's own body: domes lit, hollows in a soft cool shade
    float cav = clamp(1.0 - uC[10].w * (hes.x + hes.y), 0.25, 1.5);
    liq = F * spec + (1.0 - F) * uC[7].rgb * (E * 0.8 + 0.2 * uL[3].w * 0.8) * cav * mix(uC[10].rgb, vec3(1.0), clamp(cav, 0.0, 1.0));
  }
  // droplets: falling, bouncing walkers, ejecta
  float tS = 1e9, da = 0.0; vec3 dc = vec3(0.0);
  for (int k = 0; k < uI.x; k++) {
    vec4 D = uC[16 + k];
    vec2 dxy = p.xy - D.xy; float sh = exp(-dot(dxy, dxy) / (D.w * D.w * 2.2)) * clamp(1.0 - (D.z - D.w) * 6.0, 0.0, 1.0);
    liq *= 1.0 - 0.55 * sh * (clear ? 1.0 : 0.6);
    liq += (clear ? 1.0 : 0.0) * 2.5 * uL[3].w * exp(-dot(dxy, dxy) / (D.w * D.w * 0.12)) * clamp(1.0 - (D.z - D.w) * 6.0, 0.0, 1.0) * uC[8].rgb;
    vec3 oc = ro - D.xyz; float bq = dot(oc, rd), cq = dot(oc, oc) - bq * bq;
    float dp = sqrt(max(cq, 0.0));
    if (dp < D.w * 1.2) {
      float hq = D.w * D.w - cq, tt = -bq - sqrt(max(hq, 0.0));
      if (tt < tS) {
        tS = tt;
        vec3 q = ro + rd * tt, nd = normalize(q - D.xyz);
        float Fd = uC[6].x + (1.0 - uC[6].x) * pow(1.0 - max(dot(-rd, nd), 0.0), 5.0);
        vec3 rv = reflect(rd, nd), Lq = normalize(uL[0].xyz + vec3(-0.6, 0.6, 0.0) * uL[0].w * 0.0 - q);
        vec3 rf = (uL[1].w * uL[1].rgb + uL[7].w * uL[7].rgb) * 0.004 * pow(max(dot(rv, Lq), 0.0), 60.0) + uL[3].z * 0.5;
        vec3 body = clear ? uC[8].rgb * uL[3].w * (0.25 + 0.9 * pow(max(-nd.z * 0.5 + 0.5 + dot(nd.xy, -rd.xy) * 0.3, 0.0), 3.0)) * uC[7].rgb
                          : uC[7].rgb * uL[3].w * (0.15 + 0.85 * max(dot(nd, normalize(uL[0].xyz - q)), 0.0));
        dc = Fd * rf + (1.0 - Fd) * body;
        da = clamp((D.w - dp) / (2.0 * uC[0].w * tt / SZ) + 0.5, 0.0, 1.0);
      }
    }
  }
  vec3 bg = texture(uBG, gl_FragCoord.xy / SZ).rgb;
  vec3 col = mix(bg, tone(liq, uC[14].w), a);
  col = mix(col, tone(dc, uC[14].w), da);
  float gr = fract(sin(dot(gl_FragCoord.xy + uC[14].z * vec2(17.13, 5.71), vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  col += gr * (0.006 + 0.02 * col.g);
  o = vec4(col, 1.0);
}`;function he(t){let r=rt.get(t);if(r)return r;const v=[],s={},u=t.createShader(t.VERTEX_SHADER);t.shaderSource(u,Ft),t.compileShader(u),v.push([u,Ft]);const f=(T,d)=>{const p=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(p,d),t.compileShader(p),v.push([p,d]);const m=t.createProgram();t.attachShader(m,u),t.attachShader(m,p),t.linkProgram(m),s[T]=m};f("bake",le),t.getExtension("EXT_color_buffer_float"),t.getExtension("EXT_color_buffer_half_float");const x=t.createTexture();t.bindTexture(t.TEXTURE_2D,x),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,4,4,0,t.RGBA,t.HALF_FLOAT,null);const l=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,l),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,x,0);const E=t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE;t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(l),t.deleteTexture(x);const B=E?"":"#define ENC8"+t0;f("comp",a0+B+de.slice(a0.length)),f("step",a0+B+ue.slice(a0.length)),t.flush();const L=xe(t),h=pe(t);return r={progs:s,U:{},sh:v,half:E,TD:L,TF:h,vao:t.createVertexArray(),md:[],ini:[]},rt.set(t,r),r}function st(t,r,v){if(r.U[v])return;const s=r.progs[v];if(!t.getProgramParameter(s,t.LINK_STATUS)){rt.delete(t);let x=v+": "+t.getProgramInfoLog(s);for(const[l,E]of r.sh){const B=t.getShaderInfoLog(l);B&&(x+=t0+B+t0+E.split(t0).map((L,h)=>h+1+": "+L).join(t0))}throw new Error("121 shader: "+x)}const u={},f=t.getProgramParameter(s,t.ACTIVE_UNIFORMS);for(let x=0;x<f;x++){const l=t.getActiveUniform(s,x);u[l.name.replace("[0]","")]=t.getUniformLocation(s,l.name)}r.U[v]=u,t.useProgram(s),v==="step"?(t.uniform1i(u.uS,0),t.uniform1i(u.uM,1)):v==="comp"?(t.uniform1i(u.uS,0),t.uniform1i(u.uBG,2)):(t.uniform1i(u.uD,3),t.uniform1i(u.uF,4))}function xe(t){const v=new Uint8Array(1048576);let s=625341585;const u=()=>(s^=s<<13,s^=s>>>17,s^=s<<5,(s>>>0)/4294967296),f=17,x=new Float32Array(f*f),l=new Float32Array(f*f);for(let d=0;d<f*f;d++)x[d]=u(),l[d]=u();const E=(d,p,m)=>{const b=Math.min(f-2,p|0),I=Math.min(f-2,m|0),_=p-b,S=m-I,C=_*_*(3-2*_),U=S*S*(3-2*S),P=d[I*f+b],r0=d[I*f+b+1],n0=d[(I+1)*f+b],w0=d[(I+1)*f+b+1];return P+(r0-P)*C+(n0-P+(P-r0+w0-n0)*C)*U},B=new Float32Array(512*512);for(let d=0;d<1300;d++){const p=u()*512,m=u()*512,b=.2+.6*u()*u()*u(),I=u()<.9?.6:1.2;for(let _=-2;_<=2;_++)for(let S=-2;S<=2;S++){const C=(p|0)+S,U=(m|0)+_;if(C<0||U<0||C>=512||U>=512)continue;const P=Math.hypot(C+.5-p,U+.5-m)/I;P<1.5&&(B[U*512+C]=Math.max(B[U*512+C],b*Math.exp(-P*P*1.6)))}}const L=128,h=new Float32Array(L*L);for(let d=0;d<L;d++)for(let p=0;p<L;p++){const m=(p+.5)/L*4,b=(d+.5)/L*4;h[d*L+p]=.55*E(x,m*4,b*4)+.45*E(l,m*1.6+3,b*1.6+3)}for(let d=0;d<512;d++)for(let p=0;p<512;p++){const m=(d*512+p)*4;v[m]=128,v[m+1]=Math.round(Math.min(1,B[d*512+p])*255),v[m+2]=Math.round(h[(d>>2)*L+(p>>2)]*255),v[m+3]=255}const T=t.createTexture();return t.bindTexture(t.TEXTURE_2D,T),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,512,512,0,t.RGBA,t.UNSIGNED_BYTE,v),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),T}function pe(t){const s=new Uint8Array(65536);let u=1799596469;const f=()=>(u^=u<<13,u^=u>>>17,u^=u<<5,(u>>>0)/4294967296),x=new Float32Array(2048),l=new Float32Array(2048/8),E=new Float32Array(2048/32*5);for(let h=0;h<2048;h++)x[h]=f()-.5;for(let h=0;h<l.length;h++)l[h]=f()-.5;for(let h=0;h<E.length;h++)E[h]=f();const B=(h,T)=>{const d=h.length,p=Math.floor(T),m=T-p,b=m*m*(3-2*m);return h[(p%d+d)%d]*(1-b)+h[((p+1)%d+d)%d]*b};for(let h=0;h<32;h++)for(let T=0;T<2048;T++){const p=T/32,m=p|0,b=(m+1)%64,I=p-m,_=I*I*(3-2*I),S=h/8,C=Math.min(4,S|0),U=Math.min(4,C+1),P=S-(S|0),r0=(E[C*64+m]*(1-_)+E[C*64+b]*_)*(1-P)+(E[U*64+m]*(1-_)+E[U*64+b]*_)*P,n0=(x[T]*.9+B(l,T/8+h*.04)*.9)*(.3+1.1*r0);s[h*2048+T]=Math.max(0,Math.min(255,Math.round(128+190*n0)))}const L=t.createTexture();return t.bindTexture(t.TEXTURE_2D,L),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R8,2048,32,0,t.RED,t.UNSIGNED_BYTE,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),L}function Xe(t){const r=Math.abs(t);if(r<8){const f=t*t;return(57568490574+f*(-13362590354+f*(6516196407e-1+f*(-1121442418e-2+f*(77392.33017+f*-184.9052456)))))/(57568490411+f*(1029532985+f*(9494680718e-3+f*(59272.64853+f*(267.8532712+f)))))}const v=8/r,s=v*v,u=r-.785398164;return Math.sqrt(.636619772/r)*(Math.cos(u)*(1+s*(-.001098628627+s*(2734510407e-14+s*(-2073370639e-15+s*2093887211e-16))))-v*Math.sin(u)*(-.01562499995+s*(.0001430488765+s*(-6911393771e-15+s*(7621095161e-16-s*934935152e-16)))))}function ve(t){const r=Math.abs(t);if(r<8){const x=t*t;return t*(72362614232+x*(-7895059235+x*(2423968531e-1+x*(-2972611439e-3+x*(15704.4826+x*-30.16036606)))))/(144725228442+x*(2300535178+x*(1858330474e-2+x*(99447.43394+x*(376.9991397+x)))))}const v=8/r,s=v*v,u=r-2.356194491,f=Math.sqrt(.636619772/r)*(Math.cos(u)*(1+s*(.00183105+s*(-3516396496e-14+s*(2457520174e-15+s*-240337019e-15))))-v*Math.sin(u)*(.04687499995+s*(-.0002002690873+s*(8449199096e-15+s*(-88228987e-14+s*105787412e-15)))));return t<0?-f:f}Rt.add({num:121,name:"Shaking Dish",fam:"Worlds",recipe:"A shallow dish of liquid on a speaker cone, shaking up and down. Past a point the surface breaks into glittering standing waves in stripes, squares and hexagons, then chaos. The liquid changes every mint, and rare ones have droplets that walk around on their own waves. Drag up or down to turn the shaking up or down, drag sideways to change the pitch, or tap to drop a droplet.",interactive:"Drag up or down to turn the drive amplitude up or down (each pattern takes over at its threshold); drag sideways to change the pitch, which sets the wavelength; tap to drop a droplet (on walker mints it bounces and walks, steered by its own waves).",music:!0,gl:!0,fps:30,seed:0,make(t){const r=t.gl,v=t.size,s=he(r),u=s.progs,f=s.U,x=(o,a,e)=>o<a?a:o>e?e:o,l=Math.PI*2,E=Math.SQRT2,B=2*Math.cos(Math.PI/12),L=(t.hash||"0x0").slice(2).padEnd(64,"0"),h=o=>parseInt(L.slice(o*8,o*8+8),16)>>>0,T=o=>{let a=o>>>0;return()=>{a=a+1831565813|0;let e=Math.imul(a^a>>>15,1|a);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}},d=T((h(0)^Math.imul(h(3),739982445)^304063917)>>>0),p=(o,a)=>{let e=0;for(const c of a)e+=c;let n=d()*e,i=0;for(;n>=a[i]&&i<a.length-1;)n-=a[i++];return o[i]},m=["Water","Silicone oil","Milk","Ferrofluid"],b=["Black glass","White porcelain","Square tray"],I=["Ring light","Single lamp","Coloured gel"],_=["Stripes","Squares","Hexagons","Quasi-crystal","Chaos"],S=["Low","Middle","High"],C=["None","Walker","Walker pair"];let U=p(m,[40,28,22,10]),P=p(b,[48,40,12]),r0=p(I,[50,36,14]),n0=p(_,[17,24,34,9,16]),w0=p(S,[30,40,30]),ct=p(C,[90,7,3]);const M0=d()*l,E0=d(),T0=d(),_0=d();t.home&&(U="Water",P="Black glass",r0="Ring light",n0="Hexagons",w0="Middle",ct="None");const l0=m.indexOf(U),d0=b.indexOf(P),s0=I.indexOf(r0),me=S.indexOf(w0),N=C.indexOf(ct);let c0=_.indexOf(n0)+1;N>0&&(c0=0),t.trait("Liquid",U),t.trait("Dish",P),t.trait("Light",r0);const ye=T((h(6)^Math.imul(h(1),374761393)^303762005)>>>0),Ct=!t.home&&N===0&&ye()<.16;Ct&&(w0="Deep bass"),t.trait("Mode at mint",N>0?"Below threshold":n0),t.trait("Pitch",w0),t.trait("Walkers",ct);const we=["Overhead","Low oblique","Close in"],it=T((h(7)^Math.imul(h(5),668265261)^303866859)>>>0),Pt=it()*100,Me=it(),Dt=it();let B0=Pt<50?0:Pt<82?1:2;(N>0||t.home)&&(B0=0),t.trait("Camera",we[B0]);const Ee=["Black paper","Grey poly","Brown paper","Woven fibre"],It=T((h(2)^Math.imul(h(4),2246822507)^303828574)>>>0),ft=It()*100,ut=It()*l,St=t.home||ft<46?0:ft<70?1:ft<91?2:3;t.trait("Cone",Ee[St]);const Te=[[.016,.0155,.015,0,.0015,.5,.5,.7],[.07,.071,.075,0,.018,.24,.08,.5],[.13,.082,.045,0,.004,.5,.38,.7],[.26,.17,.04,1,.035,.28,.1,.5]][St],V=[{sig:73e-6,rate:1,F0:.02,ior:1.333,op:0,col:[.97,.99,1]},{sig:215e-7,rate:.62,F0:.028,ior:1.4,op:0,col:[1,.92,.74]},{sig:46e-6,rate:.9,F0:.024,ior:1.35,op:1,col:[.56,.55,.51]},{sig:26e-6,rate:.7,F0:.055,ior:1.5,op:1,col:[.01,.0075,.006]}][l0],Ut=.004,lt=90/92,Nt=o=>{const a=l/(o*.001);return Math.sqrt((9.81*a+V.sig*a*a*a)*Math.tanh(a*Ut))/Math.PI},dt=o=>{let a=1,e=40;for(let n=0;n<30;n++){const i=.5*(a+e),c=l/(i*.001);Math.sqrt((9.81*c+V.sig*c*c*c)*Math.tanh(c*Ut))>o?a=i:e=i}return .5*(a+e)},q0=Nt(9.6),kt=Nt(5.9),be=o=>Math.pow(Math.cos(o*.9238795/2),4)*Math.pow(Math.cos(o*.3826834/2),4),G0=o=>2*(1-be(l/o)),X0=[[-.1,-1,0,0,0,0,E,.002],[.12,-1,0,0,0,0,E,.004],[.1,0,0,0,1,1,E,.008],[.05,-1,1.2,0,0,0,E,.012],[.1,.04,0,0,1,.8,B,.008],[.4,.3,0,0,1,.8,1.6,.05]],Le=[.14,.3,.47,.64,.8],Ae=o=>{let a=0;for(;a<5&&o>=Le[a];)a++;return a};let b0=[.07,.22,.385,.555,.72,.9][c0],h0=Ct?-1.15:[.18,.5,.82][me];const Re=Math.min(0,h0);let F=c0,K=22*Math.PI/180,x0=5,p0=.24,i0=[0,.035,0],j=[i0[0],i0[1]-x0*Math.sin(K),i0[2]+x0*Math.cos(K)],Y=[0,Math.sin(K),-Math.cos(K)],Q=[1,0,0],Z=[0,Math.cos(K),Math.sin(K)];if(B0>0){const o=(Me<.5?-1:1)*(.25+.35*Dt),a=Math.cos(o),e=Math.sin(o);if(B0===1)K=50*Math.PI/180,x0=4.6,p0=.22,i0=[.12*a,.12*e,0];else{K=30*Math.PI/180,x0=2.9,p0=.24;const c=o+(Dt<.5?2.2:-2.2);i0=[.42*Math.cos(c),.42*Math.sin(c),0]}const n=Math.sin(K),i=Math.cos(K);j=[i0[0]+x0*n*e,i0[1]-x0*n*a,i0[2]+x0*i],Y=[-n*e,n*a,-i],Q=[a,e,0],Z=[-i*e,i*a,n]}const Bt=.075,L0=d0===2?1:0,C0=(o,a)=>{if(!L0)return Math.hypot(o,a)-1;const e=Math.abs(o)-.7,n=Math.abs(a)-.7;return Math.hypot(Math.max(e,0),Math.max(n,0))+Math.min(Math.max(e,n),0)-.18},qt=(o,a)=>{const e=[Y[0]+(o*Q[0]+a*Z[0])*p0,Y[1]+(o*Q[1]+a*Z[1])*p0,Y[2]+(o*Q[2]+a*Z[2])*p0],n=-j[2]/e[2];return[j[0]+e[0]*n,j[1]+e[1]*n]},D=new Float32Array(32),ht=[[1,.25,.55],[1,.62,.12],[.15,.6,1]];s0===1?D.set([0,.25,2.6,1.2,1,.97,.92,0,-.75,.95,0,.14,1,.012,.003,1.15]):D.set([0,.25,2.6,1.25,s0===2?1:nt[0],s0===2?1:nt[1],s0===2?1:nt[2],900,0,0,0,0,s0,.012,.003,1]),D.set(ht[0],16),D.set(ht[1],20),D.set(ht[2],24),D.set([1,.9,.76,700],28),N>0&&l0!==2&&(s0===1?(D[8]=-2,D[9]=1.03,D[10]=.35,D[11]=.8,D[31]*=.4):(D[1]=1.03,D[3]=L0?1.95:1.68));const Gt=s0===1?1.05:.95,y=192,W0=(o,a,e,n,i,c,w)=>{const M=r.createTexture();return r.bindTexture(r.TEXTURE_2D,M),r.texImage2D(r.TEXTURE_2D,0,e,o,a,0,n,i,w||null),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,c),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,c),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),M},Xt=o=>{const a=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,a),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0),a};r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_ALIGNMENT,1);let f0=s.md[L0];if(!f0){f0=s.md[L0]=new Uint8Array(y*y*4);for(let o=0;o<y;o++)for(let a=0;a<y;a++){const e=(a+.5-96)/92,n=(o+.5-96)/92,i=C0(e,n),c=(o*y+a)*4;f0[c]=i<-.004?255:0,f0[c+1]=Math.round(x(-i*92/64,0,1)*255),f0[c+3]=255}}const Fe=W0(y,y,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.NEAREST,f0),v0=dt(Math.PI*(q0*Math.pow(kt/q0,h0)))/lt,xt=l/v0,Wt=new Float32Array(1),ge=new Uint32Array(Wt.buffer),ze=o=>{Wt[0]=o;const a=ge[0],e=(a>>>23&255)-112,n=a>>>16&32768;return e<=0?n:e>=31?n|31744:n|e<<10|(a&8388607)>>>13};let g=(h(6)|1)>>>0;const A=()=>(g^=g<<13,g^=g>>>17,g^=g<<5,(g>>>0)/4294967296),Ot=(t.home?"h":"m")+L;let q,P0=s.ini.find(o=>o.k===Ot);if(P0)q=P0.init,g=P0.ns,s.ini.splice(s.ini.indexOf(P0),1),s.ini.push(P0);else{const o=[0,1,2,3,6,3][c0],a=c0===3||c0===5?l/3:Math.PI/o,e=[0,.55,.45,.5,.2,.5][c0],n=96+(E0-.5)*40,i=96+(T0-.5)*40,c=[],w=[],M=[],G=[];for(let X=0;X<o;X++){const O=M0+X*a,k=Math.cos(O),J=Math.sin(O),W=new Float32Array(y),z=new Float32Array(y),k0=new Float32Array(y),te=new Float32Array(y);for(let u0=0;u0<y;u0++){const ee=xt*(u0+.5-n)*k,oe=xt*(u0+.5-i)*J;W[u0]=Math.cos(ee),z[u0]=Math.sin(ee),k0[u0]=Math.cos(oe),te[u0]=Math.sin(oe)}c.push(W),w.push(z),M.push(k0),G.push(te)}q=s.half?new Uint16Array(y*y*4):new Uint8Array(y*y*4);for(let X=0;X<y;X++)for(let O=0;O<y;O++){const k=(X*y+O)*4;let J=0;if(f0[k]){for(let z=0;z<o;z++)J+=c[z][O]*M[z][X]-w[z][O]*G[z][X];const W=f0[k+1]/255*64;J=J*e*x(W/6,0,1)*x((W-.6*v0)/v0,.15,1)+.3*Math.cos(xt*W)*Math.exp(-W/v0)+(A()-.5)*.04}if(s.half)q[k]=ze(J),q[k+1]=0,q[k+2]=0,q[k+3]=15360;else{const W=Math.round(x((J+2.5)/5,0,1)*65535),z=Math.round(.5*65535);q[k]=W>>8,q[k+1]=W&255,q[k+2]=z>>8,q[k+3]=z&255}}s.ini.push({k:Ot,init:q,ns:g}),s.ini.length>4&&s.ini.shift()}const pt=[0,1].map(o=>s.half?W0(y,y,r.RGBA16F,r.RGBA,r.HALF_FLOAT,r.NEAREST,o?null:q):W0(y,y,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.NEAREST,o?null:q)),_e=pt.map(Xt);let O0=0;const D0=Math.min(1024,v),Ht=W0(D0,D0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR),Ce=Xt(Ht);r.bindFramebuffer(r.FRAMEBUFFER,null);const A0=(o,a)=>{r.activeTexture(r.TEXTURE0+o),r.bindTexture(r.TEXTURE_2D,a)},H0=()=>{r.disable(r.DEPTH_TEST),r.disable(r.CULL_FACE),r.disable(r.BLEND),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.colorMask(!0,!0,!0,!0),r.depthMask(!1),r.bindVertexArray(s.vao)},m0=new Float32Array(64);let e0=v0,I0=G0(v0),V0=G0(v0/X0[c0][6]),K0=.1,j0=0,vt=0,Vt=0,mt=1,R0=0,Y0=6,F0=0,Kt=0;const $=[];function yt(){j0=q0*Math.pow(kt/q0,h0),e0=dt(Math.PI*j0)/lt;const o=X0[F][6];I0=G0(e0),V0=G0(e0/o);const a=Math.pow(1-2/I0,2);K0=Math.min(.16,1.2/(a+1+Math.abs(X0[F][0]))),vt=l/(e0/92),Vt=l/(dt(l*j0)/lt/92)}yt();function Pe(o){const a=X0[F],e=N>0&&F===0?-.013:a[0];m0.fill(0),m0.set([e,a[1],a[2],a[3],a[4],o?mt:1,K0,a[5],2/I0,1/(I0*I0),2/V0,1/(V0*V0),ae*(N>0?.04:1)*(.3+b0),l/e0,e0*re,(a[7]*(F===5?1:.4)+F0*.06)*Math.sqrt(K0)]);let n=0;if(m0[56]=ne,m0[57]=e0*se,o){for(const i of $){if(n>=8)break;m0.set(i,24+n*4),n++}R0>0&&m0.set([R0,l/e0,96+(_0-.5)*50,96+(E0-.5)*50,M0+Kt*.37,Y0===2?Math.PI/2:Math.PI/6],16)}r.useProgram(u.step),r.uniform4fv(f.step.uP,m0),r.uniform4i(f.step.uI,4,n,o&&R0>0?Y0:0,Kt++&65535),A0(0,pt[O0]),A0(1,Fe),r.bindFramebuffer(r.FRAMEBUFFER,_e[O0^1]),r.viewport(0,0,y,y),r.drawArrays(r.TRIANGLES,0,3),O0^=1,o&&($.length=0,mt=1,R0=0)}function De(o){if(o===F)return;const a=F;F=o,yt(),o>0&&a>0&&(mt=.25,F0=1),o===4&&(R0=.08,Y0=6),o===2&&(R0=.1,Y0=2)}const y0=[],o0=[],g0=[],Q0=64,wt=.05,Ie=1.25,Mt=4,Et=(o,a,e,n)=>{o0.length>=4&&o0.shift(),o0.push({x:o,y:a,vx:e,vy:n,r:.013,hist:new Float32Array(3*Q0),hn:0,acc:0})},Z0=(o,a)=>[o*92+96,a*92+96];let $0=0;function Se(o){const a=Mt*.12*.12*wt/.904;for(const e of o0)for(e.acc+=o;e.acc>=wt;){e.acc-=wt;const n=e.hn%Q0*3;if(e.hist[n]=e.x,e.hist[n+1]=e.y,e.hist[n+2]=$0,e.hn++,$.length<8){const[i,c]=Z0(e.x,e.y);$.push([i,c,F===0?.5:.3,1.6])}}for(const e of o0){let n=0,i=0;for(const M of o0){const G=Math.min(M.hn,Q0);for(let X=0;X<G;X++){const O=X*3,k=$0-M.hist[O+2],J=e.x-M.hist[O],W=e.y-M.hist[O+1],z=Math.hypot(J,W);if(z<1e-5)continue;const k0=vt*ve(vt*z)*Math.exp(-k/Ie)/z;n+=k0*J,i+=k0*W}}e.vx+=o*(a*n-Mt*e.vx),e.vy+=o*(a*i-Mt*e.vy);const c=C0(e.x,e.y);if(c>-.08){const M=Math.hypot(e.x,e.y)||1,G=(c+.08)*30;e.vx-=o*G*e.x/M,e.vy-=o*G*e.y/M}F>0&&(e.vx+=(A()-.5)*o*.8*F,e.vy+=(A()-.5)*o*.8*F);const w=Math.hypot(e.vx,e.vy);w>.4&&(e.vx*=.4/w,e.vy*=.4/w),e.x+=o*e.vx,e.y+=o*e.vy}}function Tt(o,a,e){C0(o,a)>-.03||(y0.length>=4&&y0.shift(),y0.push({x:o,y:a,z:.55,vz:-.4,r:.011,walk:N>0}),e||(at=0))}function Ue(o){for(let a=y0.length-1;a>=0;a--){const e=y0[a];if(e.vz-=9*o,e.z+=e.vz*o,e.z<=e.r*.6){const[n,i]=Z0(e.x,e.y);e.walk?(Et(e.x,e.y,(A()-.5)*.05,(A()-.5)*.05),$.push([n,i,-.35,1.8])):$.push([n,i,-1.4,2.4]),Zt.plip(e.x),y0.splice(a,1)}}if(F===5){const a=Math.min(6,8-$.length);for(let e=0;e<a;e++){const n=A()*l,i=Math.sqrt(A())*.93,c=Math.cos(n)*i,w=Math.sin(n)*i;if(C0(c,w)>-.04)continue;const[M,G]=Z0(c,w);$.push([M,G,2.2*(A()-.3),2.4])}if(g0.length<5&&A()<o*9){const e=A()*l,n=Math.sqrt(A())*.85,i=A()*l;g0.push({x:Math.cos(e)*n,y:Math.sin(e)*n,z:.005,vx:Math.cos(i)*.12,vy:Math.sin(i)*.12,vz:.55+A()*.5,r:.004+A()*.005})}}for(let a=g0.length-1;a>=0;a--){const e=g0[a];if(e.vz-=9*o,e.x+=e.vx*o,e.y+=e.vy*o,e.z+=e.vz*o,e.z<0){if(g0.splice(a,1),C0(e.x,e.y)<-.03&&$.length<8){const[n,i]=Z0(e.x,e.y);$.push([n,i,-.8,1.6])}A()<.4&&Zt.tick(e.x)}}}const H=new Float32Array(32*4),bt=d0===0?[.012,.012,.014]:d0===1?[.82,.8,.76]:[.42,.43,.45],Ne=[2.2,1.9,0,0][l0],J0=(o,a,e,n)=>o*(Math.sin(a*(n-4)+e)-Math.sin(e));function jt(o){const a=o/3.4+.22*Math.sin(.23*(o-4))+J0(.13,.071,1.3,o)+J0(.077,.65,.4+5*E0,o)+J0(.098,.41,2.1+5*T0,o)+J0(.091,.263,4+5*_0,o);return Math.cos(Math.PI*(a-Math.sin(l*a)/l))}let tt=0;function Yt(o){H0(),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,v,v),A0(0,pt[O0]),A0(2,Ht),r.useProgram(u.comp),H.fill(0);const a=.42/(92*(l/e0))*(N>0?l0===2?3:ie:1);H.set([j[0],j[1],j[2],p0,Q[0],Q[1],Q[2],v,Z[0],Z[1],Z[2],o,Y[0],Y[1],Y[2],jt(o)],0),H.set([a,.011,.026,ce*(.2+b0),l0,L0,Vt,Bt],16),H.set([V.F0,V.ior,.045,.045*(1-1/V.ior)*Ne],24),H.set([V.col[0],V.col[1],V.col[2],V.op],28),H.set(l0===2?fe:[1,1,1,.022],40),H.set([bt[0],bt[1],bt[2],d0===0?.15:1],32),H.set([0,0,l0===3?.0015:5e-4,d0===0?0:d0===2?.01:.004],36),H.set([o*l*.6,F===5?1:0,0,Gt],56);let e=0;const n=(c,w,M,G)=>{e>=12||(H.set([c,w,M,G],64+e*4),e++)};for(const c of y0)n(c.x,c.y,c.z,c.r);const i=.5+.5*jt(o*1.7+.3);for(const c of o0)n(c.x,c.y,c.r*(1.1+.9*i),c.r);for(const c of g0)n(c.x,c.y,c.z,c.r);r.uniform4fv(f.comp.uC,H),r.uniform4fv(f.comp.uL,D),r.uniform4i(f.comp.uI,e,12,0,0),r.drawArrays(r.TRIANGLES,0,3),tt++}const et=8e3,Qt=new Float32Array(4096);let ot=0,S0=0,z0=0,U0=0,Lt=0,Oe=0;function ke(o){if(!t.sound.on)return;const a=Math.min(4096,Math.round(o*et));if(a<8)return;const e=j0,n=.06+.25*b0,i=F>0?1:0;z0||(z0=e);for(let c=0;c<a;c++){z0+=(e-z0)*.0015,U0+=(n-U0)*.001,ot+=z0/et,ot>1&&(ot-=1),S0+=.5*z0/et,S0>1&&(S0-=1);const w=ot*l;let M=Math.sin(w)+.42*Math.sin(2*w)+.22*Math.sin(3*w)+.1*Math.sin(4*w)+.05*Math.sin(5*w);if(M=M*U0*.5+i*.12*U0*Math.sin(S0*l)*(1+.6*Math.sin(2*S0*l+1)),F===5){g^=g<<13,g^=g>>>17,g^=g<<5;const G=(g>>>0)/2147483648-1;Lt+=(G-Lt)*.2,M+=Lt*.05*U0}Qt[c]=M}t.sound.pcm(Qt.subarray(0,a),et,{vel:.6})}const Zt={plip(o){t.sound.note(86+Math.round(A()*5),{dur:.09,vel:.32,wave:"sine",pan:x(o,-.8,.8)}),t.sound.hit("click",.12,{pan:o})},tick(o){t.sound.note(96+Math.round(A()*6),{dur:.03,vel:.08,wave:"sine",pan:x(o,-.8,.8)})}};let R=null,at=0,At=4+5*T0;function Be(o){const a=t.input,e=a.taps(),n=a.x,i=a.y;if(a.down&&a.inside!==!1&&!R&&(R={x:n,y:i,px:n,py:i,t:0,drag:!1}),R)if(at=0,a.down){if(R.t+=o,!R.drag&&Math.hypot(n-R.x,i-R.y)>.018&&(R.drag=!0),R.drag){b0=x(b0-(i-R.py)*1.15,0,1);const c=h0;h0=x(h0+(n-R.px)*.95,Re,1),Math.abs(h0-c)>1e-4&&(yt(),F0=Math.max(F0,.7))}R.px=n,R.py=i}else{if(!R.drag){const[c,w]=qt(R.x*2-1,1-R.y*2);Tt(c,w)}R=null}else if(at+=o,e.length&&!a.down){const[c,w]=qt(e[0].x*2-1,1-e[0].y*2);Tt(c,w)}De(Ae(b0))}function qe(o){if(At-=o,At<0&&at>6&&(At=(N>0?14:9)+6*((tt*.618+_0)%1),N===0||o0.length<3)){const a=(tt*.37+E0)%1*l,e=.07*Math.sqrt((tt*.71+T0)%1),n=_0*l,i=.2+.35*T0;Tt(Math.cos(n)*i+Math.cos(a)*e,Math.sin(n)*i+Math.sin(a)*e,!0)}}let $t=0,Ge=34*V.rate;function Jt(o){F0=Math.max(0,F0-o*.8),Ue(o),Se(o);const a=x(Math.ceil(Ge*o/K0),1,8);for(let e=0;e<a;e++)Pe(e===0);$0+=o}st(r,s,"step"),H0(),N>0&&(Et(-.25+.5*E0,-.2+.4*T0,.08*Math.cos(M0),.08*Math.sin(M0)),N===2&&Et(.3-.5*_0,.25-.3*E0,-.08*Math.cos(M0),-.08*Math.sin(M0)));for(let o=0,a=N>0?70:40;o<a;o++)Jt(1/20);$0=0;for(const o of o0)for(let a=0;a<Q0;a++)o.hist[a*3+2]-=2;H0(),st(r,s,"bake"),r.useProgram(u.bake);const N0=new Float32Array(32);return N0.set([j[0],j[1],j[2],p0,Q[0],Q[1],Q[2],D0,Z[0],Z[1],Z[2],0,Y[0],Y[1],Y[2],0,L0,d0,Bt,0,Gt,Math.cos(ut),Math.sin(ut),0]),N0.set(Te,24),N0[23]=ut/l,N0[11]=s0===2?0:1,A0(3,s.TD),A0(4,s.TF),r.uniform4fv(f.bake.uB,N0),r.uniform4fv(f.bake.uL,D),r.uniform4i(f.bake.uI,110,4,12,0),r.bindFramebuffer(r.FRAMEBUFFER,Ce),r.viewport(0,0,D0,D0),r.drawArrays(r.TRIANGLES,0,3),r.flush(),st(r,s,"comp"),Yt(0),(o,a)=>{a=Math.min(.25,Math.max(.001,a||o-$t)),$t=o,Be(a),qe(a),H0(),Jt(a),Yt(o),ke(a)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
