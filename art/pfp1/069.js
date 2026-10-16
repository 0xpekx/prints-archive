// Peg Folk: from D:/code/synaesthesia/public/drop03/pieces/069.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Drop 03 · 069 · Peg Folk: lathe-turned wooden peg dolls with painted faces, raymarched in WebGL2.
(() => {
  const made = new WeakMap();

  const vertexSource = `#version 300 es
void main() {
  vec2 v = vec2(-1.0 + float((gl_VertexID & 1) << 2), -1.0 + float((gl_VertexID & 2) << 1));
  gl_Position = vec4(v.x, v.y, 0.0, 1.0);
}`;

  // P[0] size, spin, time, knock rock        P[1] body, topper, eyes, outfit
  // P[2] hair, blink, head radius, mouth     P[3] head w, head h, collar, wear
  // P[4] camera y, focal, flame, cheeks      P[5] wallpaper, flicker, glance, wood figure
  const fragmentSource = `#version 300 es
precision highp float;
out vec4 fragOut;
uniform vec4 P[6];
uniform vec3 wLo, wHi, pA, pB, pC, hairC, wallC;
uniform sampler2D skin, det;
uniform vec4 X;          // wood figure, legendary, pointer x, pointer y on the set
uniform vec4 Y;          // legendary state: lid lift, burnish or torch, lamp, glow charge
uniform vec4 K;          // the wind-up key: x, y on the doll, turn, carried (0 or 1)
uniform float lodB;
uniform int marchN, ssN;

// One program serves every doll: the legendaries and the key are switched by uniforms, so
// nothing new compiles when a rare one scrolls into view.
#define GILD (abs(X.y - 1.0) < 0.5)
#define NEST (abs(X.y - 2.0) < 0.5)
#define GLOWP (X.y > 2.5)

float part, noFlame, noTop;

float smu(float a, float b, float k) { float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
float rbx(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float oval(vec2 p, vec2 r) { float k0 = length(p / r), k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / k1; }
float egg3(vec3 p, vec3 r) { float k0 = length(p / r), k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / k1; }

// the turned profile in (radius, height): everything here is spun round the y axis
float lathe(vec2 q) {
  float R = P[2].z, y = q.y;
  vec2 hr = R * P[3].xy;
  float head = oval(q - vec2(0.0, 0.62), hr);
  float bk = P[1].x, body;
  if (bk < 0.5) body = rbx(q - vec2(0.0, -0.75), vec2(0.5, 0.95), 0.18);
  else if (bk < 1.5) body = max(q.x - (0.36 + 0.16 * smoothstep(0.1, -0.6, y) - 0.06 * exp(-pow((y + 0.05) / 0.2, 2.0))), abs(y + 0.75) - 0.95);
  else if (bk < 2.5) body = max(q.x - mix(0.32, 0.72, smoothstep(-0.1, -1.4, y)), abs(y + 0.75) - 0.95) * 0.85;
  else if (bk < 3.5) body = max(q.x - (0.46 + 0.04 * cos(y * 26.0)), abs(y + 0.75) - 0.95) * 0.9;
  else if (bk < 4.5) body = max(q.x - mix(0.27, 0.66, clamp((0.18 - y) / 1.7, 0.0, 1.0)), abs(y + 0.75) - 0.95) * 0.88;
  else if (bk < 5.5) body = max(q.x - (0.39 + 0.14 * cos(clamp((y + 0.75) * 1.45, -1.57, 1.57))), abs(y + 0.75) - 0.95) * 0.9;
  else body = smu(rbx(q - vec2(0.0, -0.2), vec2(0.37, 0.42), 0.13), rbx(q - vec2(0.0, -1.1), vec2(0.57, 0.62), 0.12), 0.04);
  float d = smu(head, smu(rbx(q - vec2(0.0, 0.17), vec2(0.2, 0.1), 0.05), body, 0.12), NEST ? 0.4 : 0.1); // a nesting doll has no neck
  part = 0.0;
  if (noTop > 0.5) return d;
  float tk = P[1].y, cr = 0.62 + hr.y, top = 1e3;
  if (tk < 0.5) top = 1e3;
  else if (tk < 1.5) top = length(q - vec2(0.0, cr + 0.05)) - 0.17;
  else if (tk < 2.5) top = min(rbx(q - vec2(0.0, cr + 0.2), vec2(0.27, 0.24), 0.03), rbx(q - vec2(0.0, cr - 0.04), vec2(0.48, 0.025), 0.02));
  else if (tk < 3.5) top = min(max(oval(q - vec2(0.0, cr - 0.1), vec2(hr.x * 1.08, R * 0.62)), cr - 0.12 - y), rbx(q - vec2(0.0, cr + 0.12), vec2(0.03, 0.08), 0.02));
  else if (tk < 4.5) top = 1e3; // the beret is modelled in world(): it isn't round
  else if (tk < 5.5) top = max(rbx(q - vec2(0.0, cr + 0.02), vec2(0.3, 0.1), 0.01), -rbx(q - vec2(0.0, cr + 0.1), vec2(0.26, 0.2), 0.0));
  else if (tk < 6.5) {   // pointed hood: a turned cone with a rolled hem and a bead on the tip
    float b = cr - 0.2, w0 = hr.x * 1.07;
    top = max(max(q.x - w0 * clamp(1.0 - (y - b) / 0.82, 0.0, 1.0), b - y), y - b - 0.8) * 0.75;
    top = min(top, length(q - vec2(0.0, b + 0.82)) - 0.055);
    top = min(top, rbx(q - vec2(0.0, b + 0.02), vec2(w0 + 0.02, 0.035), 0.03));
  }
  else if (tk < 7.5) top = smu(rbx(q - vec2(0.0, cr + 0.1), vec2(hr.x * 0.72, 0.16), 0.04), oval(q - vec2(0.0, cr + 0.34), vec2(hr.x * 0.95, 0.19)), 0.06);
  else if (tk < 8.5) {   // bobble beanie, knitted then turned
    top = max(oval(q - vec2(0.0, 0.62), hr * 1.07), 0.62 + hr.y * 0.3 - y);
    top = min(top, rbx(q - vec2(0.0, 0.62 + hr.y * 0.36), vec2(hr.x, 0.055), 0.05));
    top = min(top, length(q - vec2(0.0, cr + 0.13)) - 0.13);
  }
  else if (tk < 9.5) top = length(vec2(q.x - 0.3, y - cr - 0.2)) - 0.035;
  else if (tk < 10.5) top = rbx(q - vec2(0.0, cr + 0.15), vec2(0.075, 0.17), 0.025);
  else top = smu(rbx(q - vec2(0.0, cr - 0.02), vec2(hr.x * 0.9, 0.075), 0.05), rbx(q - vec2(0.0, cr + 0.06), vec2(hr.x * 1.02, 0.03), 0.03), 0.02);
  if (top < d) { d = top; part = 1.0; }
  return d;
}

vec3 toLocal(vec3 p) {
  float b = P[0].w, a = P[0].y;
  if (b != 0.0) { p.y += 1.6; p.xy = mat2(cos(b), -sin(b), sin(b), cos(b)) * p.xy; p.y -= 1.6; }
  p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz; // spin on the base
  return p;
}

float world(vec3 p) {
  vec3 q = toLocal(p);
  // the nesting doll: two hollow halves meeting at the waist; the top lifts off a smaller one inside
  float lift = Y.x * 0.95, split = -0.25, bound = 0.0;
  vec3 qi = (q - vec3(0.0, -0.434, 0.0)) / 0.62;
  bool upper = false, nest = NEST;
  if (nest) {
    upper = q.y > split + 0.5 * lift;
    bound = max(abs(q.y - split - 0.5 * lift) + 0.004, length(q.xz) - 0.85);
    if (upper) q.y -= lift;
  }
  float r = length(q.xz), ang = atan(q.z, q.x);
  // one call site for the lathe serves the doll and, in a nesting doll, the smaller one inside
  // (a second inlined copy would only lengthen the compile)
  float d = 1e3, di = 1e3, p0 = 0.0;
  for (int j = 0; j < (nest ? 2 : 1); j++) {
    noTop = float(j);
    float dd = lathe(j == 0 ? vec2(r, q.y) : vec2(length(qi.xz), qi.y));
    if (j == 0) { d = dd; p0 = part; } else di = dd * 0.62;
  }
  noTop = 0.0; part = p0;
  float R = P[2].z, cr = 0.62 + R * P[3].y;
  if (P[1].y > 3.5 && P[1].y < 4.5) {
    // beret: a soft felt dome pulled down over the crown, a little lopsided and slouched to one
    // side, its rim sitting on the head all round, and a little stalk on top
    float bw = R * P[3].x;
    vec3 b = q - vec3(-0.05, cr - 0.15, 0.0);
    b.xy = mat2(0.951, -0.309, 0.309, 0.951) * b.xy;
    float sx = clamp(-b.x * 3.0, -1.0, 1.0);
    float beret = egg3(b, vec3(bw * (1.13 + 0.09 * sx), 0.22 - 0.03 * sx, bw * 1.1)) * 0.9;
    beret = min(beret, length(b - vec3(0.0, clamp(b.y, 0.17, 0.27), 0.0)) - 0.024);
    if (beret < d) { d = beret; part = 1.0; }
  }
  // crown points are cut round the rim
  if (part > 0.5 && P[1].y > 4.5 && P[1].y < 5.5) d = max(d, (q.y - (cr + 0.06 + 0.2 * abs(fract(ang * 0.95493) - 0.5))) * 0.7);
  float hk = P[2].x;
  if (hk > 2.5 && hk < 3.5) {          // pigtails: painted beads on short pegs
    float tail = length(vec3(abs(q.x), q.yz) - vec3(R * P[3].x + 0.1, 0.62, -0.05)) - 0.12;
    if (tail < d) { d = tail; part = 2.0; }
  } else if (hk > 7.5 && hk < 8.5) {   // top knot
    float knot = length(q - vec3(0.0, cr + 0.07, -0.04)) - 0.13;
    if (knot < d) { d = knot; part = 2.0; }
  }
  float ck = P[3].z;
  if (ck > 0.5 && ck < 1.5) {          // turned beads strung round the neck
    float sl = 6.2832 / 16.0, an = (floor(ang / sl) + 0.5) * sl;
    float bead = length(q - vec3(cos(an) * 0.265, 0.255, sin(an) * 0.265)) - 0.052;
    if (bead < d) { d = bead; part = 3.0; }
  } else if (ck > 1.5 && ck < 2.5) {   // a pleated ruff
    float ruff = (length(vec2(max(r - 0.45 - 0.035 * cos(ang * 18.0), 0.0), q.y - 0.23)) - 0.045) * 0.8;
    if (ruff < d) { d = ruff; part = 3.0; }
  }
  if (noFlame < 0.5 && P[1].y > 9.5 && P[1].y < 10.5 && P[4].z > 0.02) {
    vec3 fp = q - vec3(0.0, cr + 0.42, 0.0);
    fp.x -= P[5].y * 0.25 * (fp.y + 0.12);
    float flame = egg3(fp, vec3(0.055, fp.y > 0.0 ? 0.13 : 0.06, 0.055) * P[4].z);
    if (flame < d) { d = flame; part = 4.0; }
  }
  if (K.w > 0.5) {  // the coveted wind-up key in its side, a little toward the front: a brass shaft and a butterfly bow that turns
    vec3 kr = q; kr.xz = mat2(0.6967, -0.7174, 0.7174, 0.6967) * kr.xz;
    vec3 kq = kr - vec3(K.x, K.y, 0.0);
    float shaft = length(vec2(kq.y, kq.z)) - 0.03;
    shaft = max(shaft, abs(kq.x - 0.15) - 0.17);
    float boss = max(length(kq.yz) - 0.065, abs(kq.x - 0.02) - 0.03);
    vec2 yz = mat2(cos(K.z), -sin(K.z), sin(K.z), cos(K.z)) * kq.yz;
    vec3 wq = vec3(kq.x - 0.36, abs(yz.x) - 0.12, yz.y);
    float bow = max(egg3(wq, vec3(0.028, 0.115, 0.085)), -egg3(wq - vec3(0.0, 0.015, 0.0), vec3(0.08, 0.055, 0.035)));
    float key = min(min(shaft, boss), bow);
    if (key < d) { d = key; part = 6.0; }
  }
  if (nest) {
    float cut = upper ? split - q.y : q.y - split;
    float hollow = -(d + 0.045);
    float sd = max(d, max(cut, hollow));
    if (sd > d + 1e-5) part = 5.0;   // the cut rim and the hollow inside are bare wood
    d = sd;
    if (di < d) { d = di; part = 10.0; }
    d = min(d, bound);
  }
  return d;
}

float hh(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 15731.743); }
float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f *= f * (3.0 - 2.0 * f); return mix(mix(hh(i), hh(i + vec2(1, 0)), f.x), mix(hh(i + vec2(0, 1)), hh(i + vec2(1, 1)), f.x), f.y); }

// The shared detail map, laid round the turned surface (two repeats per turn, angle across, height
// down): r = wood fibres running along the spindle, g = brush strokes laid round it on the lathe,
// b = a blotchy field for knocks and chips, a = fine scratches.
vec4 detailAt(float ang, float y, float lod) { return textureLod(det, vec2(ang * 0.31831, y * 0.35), lod); }

// Turned wood: growth rings are cylinders round the log's pith (off the lathe's axis), so the
// turned profile cuts them into arches on the sides and circles on the end grain on top.
vec3 grain(vec3 q, vec3 n, vec4 dt) {
  float warp = vn(q.xy * vec2(3.0, 0.8) + 2.0) * 0.6 + vn(q.zy * vec2(3.0, 0.8) + 7.0) * 0.4;
  float kind = P[5].w, fig = X.x, g;
  vec3 c;
  if (kind > 0.5 && kind < 1.5) {
    g = smoothstep(0.25, 0.75, 0.5 + 0.5 * sin(atan(q.z, q.x) * 9.0 + warp * 5.0 + q.y * 1.3 + dt.b * 1.5));
    c = mix(wLo, wHi, 0.2 + 0.8 * g);
  } else {
    vec2 pq = q.xz + vec2(0.31, -0.17);
    if (fig > 2.5) pq += 0.12 * vec2(vn(q.xy * 4.0 + 9.0), vn(q.zy * 4.0 + 3.0)) - 0.06; // burl: the rings boil
    float f = length(pq) * 10.0 + warp * 1.7 + q.y * 0.45 + 0.3 * (dt.b - 0.5);
    float fr = fract(f), yr = hh(vec2(floor(f), 3.0));
    // pale soft earlywood, then a dense latewood band that ends sharply at the next year's ring
    float late = smoothstep(0.5, 0.9, fr) * smoothstep(1.0, 0.955, fr);
    c = mix(wHi, wLo * 0.82, late * (0.6 + 0.4 * yr) + 0.1 * yr);
  }
  // fibres and open pores streak along the spindle
  c *= 0.94 + 0.1 * dt.r;
  c *= 1.0 - 0.14 * smoothstep(0.8, 0.95, dt.r) * smoothstep(0.4, 0.8, vn(vec2(atan(q.z, q.x) * 90.0, q.y * 6.0)));
  if (fig > 0.5 && fig < 1.5) {        // flame figure: ripples across the grain that shimmer as it turns
    float band = sin(q.y * 70.0 + 5.0 * vn(q.xy * 3.0 + q.zy * 2.0) + 2.0 * dt.r);
    c *= 1.0 + 0.22 * band * clamp(n.x * 2.5 + 0.3 * n.z, -1.0, 1.0);
  } else if (fig > 1.5 && fig < 2.5) { // birdseye: little dimpled eyes scattered in the maple
    vec2 e = vec2(atan(q.z, q.x) * 7.0, q.y * 9.0);
    vec2 ci = floor(e), cf = fract(e) - 0.5 - 0.3 * (vec2(hh(ci), hh(ci + 7.1)) - 0.5);
    float on = step(0.55, hh(ci + 2.3)), d = length(cf * vec2(1.0, 1.4));
    c *= 1.0 - on * (0.3 * smoothstep(0.11, 0.05, d) - 0.12 * smoothstep(0.2, 0.12, d) * smoothstep(0.06, 0.12, d));
  } else if (fig > 2.5) {              // burl: dark pin knots in clusters
    float kn = vn(vec2(atan(q.z, q.x) * 16.0, q.y * 20.0));
    c *= 1.0 - 0.45 * smoothstep(0.72, 0.85, kn) * smoothstep(0.4, 0.7, dt.b);
  }
  if (kind > 1.5) c = mix(c, vec3(dot(c, vec3(0.33))) * 1.1, 0.35) * (0.8 + 0.3 * dt.r); // driftwood: silvered, raised grain
  // end grain (facing up or down) drinks the finish and reads darker and coarser
  c *= 1.0 - 0.24 * pow(abs(n.y), 3.0) * (0.7 + 0.6 * dt.r);
  return c;
}

vec3 shade(vec2 fc) {
  float S = P[0].x;
  vec2 uv = (2.0 * fc - S) / S;
  float camY = P[4].x;
  vec3 ro = vec3(0.0, camY + 0.35, 6.0), at = vec3(0.0, camY, 0.0);
  vec3 fw = normalize(at - ro), rt = normalize(cross(fw, vec3(0.0, 1.0, 0.0))), up = cross(rt, fw);
  vec3 rd = normalize(fw * P[4].y + uv.x * rt + uv.y * up);
  vec3 L = normalize(vec3(-0.6, 0.7, 0.5));
  const float WZ = -0.95;
  // one loop, one call to world(): the march, the normal, a shadow ray, then three occlusion taps
  int stage = 0, k = 0;
  float t = 4.0, sh = 1.0, st = 0.03, hitPart = -1.0, ao = 0.0, nearest = 1e3;
  vec3 p = ro, n = vec3(0.0, 0.0, 1.0), off = vec3(0.0);
  noFlame = 0.0;
  for (int i = 0; i < marchN + 50; i++) {
    vec3 x = stage == 0 ? ro + rd * t : stage == 1 ? p + off : stage == 2 ? p + n * 0.004 + L * st : p + n * (0.06 * float(k + 1));
    float d = world(x);
    if (stage == 0) {
      nearest = min(nearest, d);
      if (d < 0.0005 * t) { p = x; hitPart = part; stage = 1; k = 0; n = vec3(0.0); off = vec3(0.001, -0.001, -0.001); }
      else {
        t += d * 0.9;
        if (t > 8.0 || i >= marchN) { p = ro + rd * ((ro.z - WZ) / -rd.z); n = vec3(0.0, 0.0, 1.0); stage = 2; k = 0; noFlame = 1.0; }
      }
    } else if (stage < 2) {
      n += off * (d * 1000.0); k++;
      off = 0.001 * (k == 1 ? vec3(-1.0, -1.0, 1.0) : k == 2 ? vec3(-1.0, 1.0, -1.0) : vec3(1.0));
      if (k == 4) { n = normalize(n); stage = 2; k = 0; noFlame = 1.0; }
    } else if (stage < 3) {
      sh = min(sh, 7.0 * d / st); st += clamp(d, 0.02, 0.2); k++;
      if (sh < 0.02 || st > 3.5 || k > 26) { stage = 3; k = 0; }
    } else {
      ao += max(0.0, 0.06 * float(k + 1) - d) / float(k + 1); k++;
      if (k > 2) break;
    }
  }
  sh = max(sh, 0.0);
  ao = clamp(1.0 - 4.0 * ao, 0.0, 1.0);
  float R = P[2].z;
  vec2 hr = R * P[3].xy;
  float cr = 0.62 + hr.y;
  vec3 fpos = vec3(0.0, cr + 0.42, 0.0);
  float glowAmt = P[1].y > 9.5 && P[1].y < 10.5 ? P[4].z * (0.85 + 0.15 * P[5].y) : 0.0;
  float lodD = lodB - 0.95;
  if (hitPart < -0.5) {
    // the wall: papered, lit by a soft window up to the left, with the doll's shadow and a
    // little contact darkening behind it
    vec2 w = p.xy;
    vec4 pd = textureLod(det, w * vec2(0.23, 0.31) + 0.37, lodD + 0.6);
    vec3 c = wallC;
    float pat = P[5].x, ink = 0.0;
    if (pat > 0.5 && pat < 1.5) ink = 0.1 * smoothstep(0.035, 0.012, abs(fract(w.x * 2.6) - 0.5 + 0.004 * (pd.g - 0.5)));
    else if (pat > 1.5 && pat < 2.5) ink = 0.09 * smoothstep(0.075, 0.05, length(fract(w * 3.2 + vec2(0.5 * floor(w.y * 3.2), 0.0)) - 0.5));
    else if (pat > 2.5 && pat < 3.5) ink = 0.075 * (step(0.5, fract(w.x * 2.4)) + step(0.5, fract(w.y * 2.4))) * (0.85 + 0.3 * pd.g);
    else if (pat > 3.5) c += vec3(0.9, 0.85, 0.6) * smoothstep(0.93, 1.0, hh(floor(w * 26.0))) * smoothstep(0.32, 0.05, length(fract(w * 26.0) - 0.5)) * 0.6;
    c *= 1.0 - ink * (0.75 + 0.5 * pd.b);           // printed ink, a touch uneven
    c *= 0.94 + 0.08 * pd.b + 0.03 * pd.r;          // laid paper: fibres and cockle
    float pool = exp(-dot(w - vec2(-1.3, 1.5), w - vec2(-1.3, 1.5)) * 0.22);
    vec3 lightC = vec3(1.08, 1.0, 0.88) * (0.62 + 0.5 * pool);
    c *= lightC * (0.55 + 0.45 * sh) * mix(0.72, 1.0, ao) + vec3(0.03, 0.035, 0.05) * (1.0 - sh);
    c *= 0.9 + 0.12 * smoothstep(-1.0, 1.0, uv.y);
    c += vec3(1.0, 0.62, 0.25) * glowAmt * 0.35 * exp(-dot(p.xy - fpos.xy, p.xy - fpos.xy) * 2.5);
    if (GLOWP) {
      // the room is nearly black; the paint's glow blooms softly into it round the doll
      c *= 0.012 + Y.y * exp(-dot(w - X.zw, w - X.zw) * 4.0) + Y.z;
      c += vec3(0.01, 0.03, 0.025) * exp(-dot(w - vec2(0.0, -0.3), w - vec2(0.0, -0.3)) * 1.2) * (1.0 + Y.w);
      c += vec3(0.1, 0.55, 0.45) * (0.6 * exp(-nearest * 14.0) + 0.25 * exp(-nearest * 4.0)) * (0.45 + 0.4 * Y.w + 0.4 * Y.y);
    }
    return c;
  }
  vec3 q = toLocal(p);
  if (NEST) {
    if (hitPart > 9.5) { q = (q - vec3(0.0, -0.434, 0.0)) / 0.62; hitPart -= 10.0; }
    else if (q.y > -0.25 + 0.5 * Y.x * 0.95) q.y -= Y.x * 0.95;
  }
  float ang = atan(q.x, q.z);           // 0 at the front
  float lod = max(0.0, lodB - log2(max(abs(dot(n, rd)), 0.3)));
  vec4 dt = detailAt(ang, q.y, lod - 0.95);
  // the detail's slope across and down, to raise brush ridges, grain and chip edges in the light
  vec4 dtu = detailAt(ang + 0.012, q.y, lod - 0.95), dtv = detailAt(ang, q.y + 0.012, lod - 0.95);
  vec3 woodCol = grain(q, n, dt), col = woodCol;
  float gloss = 0.35, painted = 0.0, metal = 0.0, glow = 0.0, edge = 0.0;
  float tk = P[1].y;
  if (hitPart > 5.5) { col = vec3(0.92, 0.62, 0.24); metal = 1.0; gloss = 1.5; }   // brass key
  else if (hitPart > 4.5) { col = woodCol * 0.92; gloss = 0.2; }                    // bare wood inside
  else if (hitPart > 3.5) { col = vec3(1.0, 0.78, 0.36); glow = 1.0; }
  else if (hitPart > 2.5) {
    if (P[3].z < 1.5) { col = mod(floor(atan(q.z, q.x) / 0.3927), 2.0) < 0.5 ? pA : pC; gloss = 1.2; }
    else { col = mix(vec3(0.96, 0.94, 0.88), pC, smoothstep(0.43, 0.48, length(q.xz))); gloss = 0.5; }
    painted = 1.0;
  } else if (hitPart > 1.5) { col = hairC * (0.9 + 0.1 * sin(atan(q.z, q.x) * 30.0 + q.y * 40.0)); gloss = 0.8; painted = 1.0; }
  else if (hitPart > 0.5) {
    painted = 1.0; gloss = 0.8;
    if (tk < 1.5) col = pB;
    else if (tk < 2.5) col = abs(q.y - (cr + 0.06)) < 0.05 + 0.004 * (dt.g - 0.5) ? pA : pB;
    else if (tk < 3.5) { col = woodCol * (0.5 + 0.12 * step(0.5, fract(atan(q.z, q.x) * 3.0 + q.y * 14.0)) * step(0.5, fract(atan(q.z, q.x) * 3.0 - q.y * 14.0))); painted = 0.0; gloss = 0.4; }
    else if (tk < 4.5) { col = pB * (0.92 + 0.1 * dt.b); gloss = 0.25; } // felt
    else if (tk < 5.5) { col = vec3(0.95, 0.68, 0.2); metal = 1.0; gloss = 1.4; }
    else if (tk < 6.5) col = q.y < cr - 0.13 ? pC : (q.y > cr + 0.55 ? pC : pA);
    else if (tk < 7.5) col = vec3(0.96, 0.95, 0.91) * (0.93 + 0.07 * sin(atan(q.z, q.x) * 22.0));
    else if (tk < 8.5) { col = (q.y > cr + 0.02 ? pC : pB) * (0.9 + 0.1 * sin(atan(q.z, q.x) * 44.0)); gloss = 0.3; }
    else if (tk < 9.5) { col = vec3(1.0, 0.8, 0.3); metal = 1.0; gloss = 1.6; glow = 0.35; }
    else if (tk < 10.5) { col = mix(vec3(0.97, 0.93, 0.84), pC, 0.18); gloss = 0.5; painted = 0.0; }
    else col = abs(q.y - (cr - 0.03)) < 0.035 ? pA : vec3(0.97, 0.97, 0.95);
  } else {
    // the turned surface wears one painted skin, laid out by angle and height; while it blinks
    // the eye band is read from a closed-eye copy kept below the hem, where nobody looks
    float yy = q.y;
    if (P[2].y > 0.5 && yy > 0.53 && yy < 0.83) yy -= 2.27;
    vec2 suv = vec2(ang * 0.159155 + 0.5, (1.2 - yy) / 2.95);
    suv += (vec2(dt.b, dt.g) - 0.5) * vec2(0.0025, 0.002);  // a hand-held brush: edges wander a little
    vec4 pt = textureLod(skin, suv, lod);
    vec4 pb = textureLod(skin, suv, lod + 2.2);
    painted = pt.a;
    vec3 pc = pow(pt.rgb / max(pt.a, 1e-3), vec3(2.2));
    // paint gathers in a slight bead along every edge, where one colour meets another or the wood
    edge = clamp(abs(pt.a - pb.a) * 2.2 + length(pt.rgb - pb.rgb) * 1.6, 0.0, 1.0) * pt.a;
    if (P[1].w > 10.5 && yy < 0.24 && yy > -1.4) {   // gold leaf laid in torn patches
      float leafN = vn(vec2(ang * 3.0, yy * 5.0)) * 0.7 + vn(vec2(ang * 11.0, yy * 17.0)) * 0.3;
      metal = smoothstep(0.5, 0.53, leafN) * painted;
      pc = mix(pc, vec3(0.9, 0.62, 0.2), metal);
    }
    col = mix(woodCol, pc, painted);
    gloss = mix(0.35, mix(0.6, 1.6, metal), painted);
  }
  float wear = P[3].w, chipped = 0.0;
  vec3 bumpG = vec3(0.0);
  // water gilt: leaf laid in overlapping squares over red bole on the wood, the head, the body's
  // ground and every topper, then crazed with age into a net of fine cracks where the bole shows;
  // the hair, the face and the outfit's pattern sit on top in black and cinnabar lacquer
  if (GILD && glow < 0.5 && hitPart < 4.5) {
    bool ground = painted < 0.5 || hitPart > 0.5 || (q.y < 0.24 && distance(col, pA) < 0.09);
    if (ground) {
      vec2 lu = vec2(ang * 2.6, q.y * 5.0);
      float sq = min(fract(lu.x), fract(lu.y + 0.37 * floor(lu.x)));
      float cz = min(abs(vn(lu * 1.7 + 3.0) - 0.5), abs(vn(lu * 3.9 + 11.0) - 0.5) * 1.4) + 0.015 * (dt.r - 0.5);
      float worn = max(smoothstep(0.8, 0.83, dt.b * 0.7 + 0.25 * max(n.y, 0.0) + 0.25 * smoothstep(0.8, 0.98, length(q.xz) / 0.62)), smoothstep(0.022, 0.008, cz));
      float pol = Y.y * exp(-dot(p.xy - X.zw, p.xy - X.zw) * 9.0);
      vec3 gold = vec3(1.0, 0.64, 0.17) * (0.92 + 0.12 * dt.r) * (1.0 - 0.3 * smoothstep(0.025, 0.0, sq));
      col = mix(gold * (1.0 + 0.25 * pol), vec3(0.45, 0.07, 0.035), worn);
      metal = 1.0 - worn; gloss = 1.8 + 2.0 * pol; painted = 0.0;
    }
  }
  if (glow < 0.5) {
    // hand-painted: brush ridges laid round the doll, thicker paint a shade deeper, a bead at the edges
    float ridge = dt.g - 0.5;
    col *= 1.0 + painted * (0.07 * ridge - 0.08 * edge);
    // a thin coat lets the grain ghost through the paint
    col *= 1.0 - painted * 0.07 * (1.0 - dot(woodCol, vec3(0.6)) / max(dot(wHi, vec3(0.6)), 0.05));
    bumpG = vec3(dtu.g - dt.g, dtv.g - dt.g, 0.0) * painted * 0.1 + vec3(dtu.r - dt.r, dtv.r - dt.r, 0.0) * (1.0 - painted) * 0.05;
    if (wear > 0.5 && painted > 0.02) {
      // knocks land on the proud places: the shoulders, the crown, the hem and the rims
      float proud = max(max(n.y, 0.0) * 0.5, smoothstep(-1.2, -1.5, q.y)) + 0.5 * smoothstep(0.75, 0.95, length(q.xz) / 0.62);
      float chip = dt.b * 0.8 + dt.r * 0.12 + proud * 0.16;
      float thr = wear < 1.5 ? 0.76 : 0.68;
      // the rim of a chip: a dark line of grime where the paint broke, then bare, paler, unvarnished wood
      float rimC = smoothstep(thr - 0.035, thr - 0.005, chip) * (1.0 - smoothstep(thr, thr + 0.01, chip));
      chipped = smoothstep(thr, thr + 0.008, chip) * painted;
      col = mix(col, col * 0.55, rimC * 0.7 * painted);
      col = mix(col, woodCol * 1.12 + 0.02, chipped);
      bumpG += vec3(dtu.b - dt.b, dtv.b - dt.b, 0.0) * 0.6 * (rimC + chipped);
      // fine scratches through the varnish, lighter where the coat is broken
      col += painted * (1.0 - chipped) * smoothstep(0.35, 0.8, dt.a) * (wear > 1.5 ? 0.06 : 0.035);
      metal *= 1.0 - chipped;
    }
  }
  if (P[3].w > 1.5) col *= vec3(1.0, 0.9, 0.74);   // heirloom: the varnish has yellowed
  // varnish pools in the crooks (under the chin, round the collar, at the rims) and runs amber there
  float pool = (1.0 - ao) * (1.0 - chipped);
  col *= mix(vec3(1.0), vec3(0.8, 0.62, 0.4), pool * 0.6);
  // the bump: the detail's slope tips the normal across (round the doll) and down (along it)
  vec3 T = normalize(cross(vec3(0.0, 1.0, 0.0), n) + vec3(1e-4, 0.0, 0.0)), Bt = cross(n, T);
  vec3 nb = normalize(n - (bumpG.x * T + bumpG.y * Bt) * 2.2);
  float dif = max(dot(nb, L), 0.0);
  vec3 c = col * (vec3(1.12, 1.0, 0.86) * dif * sh + vec3(0.4, 0.43, 0.52) * (0.55 + 0.45 * nb.y) * 0.62 * mix(0.55, 1.0, ao) + wallC * 0.1 * ao);
  // the varnish coat: a clear layer over wood and paint, with its own sharp highlight, a broad
  // sheen and the window reflected in it, strongest at the rims (Fresnel); worn dolls are duller
  float coat = (wear > 1.5 ? 0.55 : wear > 0.5 ? 0.8 : 1.0) * (1.0 - chipped) * (gloss > 0.32 ? 1.0 : 0.5);
  vec3 hv = normalize(L - rd), rr = reflect(rd, n);
  float fres = 0.04 + 0.96 * pow(1.0 - max(dot(n, -rd), 0.0), 5.0);
  float peel = 0.85 + 0.3 * dt.b;                  // orange-peel: the coat isn't quite flat
  float win = smoothstep(0.84, 0.93, dot(rr, L)) * smoothstep(-0.2, 0.25, rr.y);
  vec3 env = mix(wallC * 0.4 * ao, vec3(1.25, 1.18, 1.05), win);
  vec3 spc = mix(vec3(1.0, 0.96, 0.88), col * 1.6, metal);
  c += coat * (pow(max(dot(nb, hv), 0.0), mix(160.0, 90.0, metal)) * 1.6 * peel + pow(max(dot(nb, hv), 0.0), 18.0) * 0.08) * sh * spc;
  c += coat * fres * env * mix(0.6, 1.0, ao) * (1.0 + pool);
  // metal: little diffuse, the room and the window mirrored in its own colour
  vec3 envM = mix(vec3(0.02, 0.015, 0.01) + wallC * 0.22 * smoothstep(-0.1, 0.7, rr.y) * smoothstep(-0.9, 0.2, rr.z), vec3(2.2, 2.0, 1.7), smoothstep(0.7, 0.96, dot(rr, L)));
  if (GILD) envM = envM * 1.35 + vec3(0.3, 0.19, 0.08) * smoothstep(0.1, -0.5, rr.y); // gilt mirrors the window and the warm shelf below
  c = mix(c, c * 0.12, metal * 0.9) + metal * col * envM * ao;
  c *= mix(1.0, 0.92, chipped);
  c = mix(c, col * 1.3, glow);
  c += vec3(1.0, 0.62, 0.25) * glowAmt * 0.3 * exp(-dot(p - fpos, p - fpos) * 4.0);
  if (GLOWP) {
    // the lights are out: luminous paint glows in its own colours; the viewer's torch and the lamp
    // switch show the doll as it is by day, and charge the paint where they fall
    float torch = Y.y * exp(-dot(p.xy - X.zw, p.xy - X.zw) * 4.0);
    // every painted stroke (the face's lines, the pattern, the hair, the topper) glows green or blue
    // by its colour, the pale paints brightest; the bare wood is barely lit. The face is painted in
    // lines only for this doll (no round eyes or open mouth), so nothing round glows on the face
    float face = hitPart < 0.5 && q.y > 0.26 ? 1.0 : 0.0;
    vec3 tint = mix(vec3(0.22, 1.0, 0.45), vec3(0.25, 0.65, 1.0), smoothstep(-0.05, 0.25, col.b - 0.5 * col.g - 0.3 * col.r));
    vec3 lum = tint * mix(0.5 + 1.1 * dot(col, vec3(0.3, 0.5, 0.2)), 1.2, face);
    c = c * (0.06 + torch + Y.z) + lum * painted * (1.0 - chipped) * (0.8 + 0.5 * Y.w + 0.5 * torch);
    c += tint * 0.04 * (1.0 - painted) * (0.5 + Y.w);   // the glow spilling onto the wood beside it
  }
  return c;
}

void main() {
  vec3 c = vec3(0.0);
  for (int s = 0; s < ssN; s++) {
    vec2 o = ssN > 1 ? vec2(float(s & 1), float(s >> 1)) * 0.5 - 0.25 : vec2(0.0);
    c += shade(gl_FragCoord.xy + o);
  }
  c /= float(ssN);
  vec2 v = gl_FragCoord.xy / P[0].x - 0.5;
  c *= 1.0 - 0.22 * dot(v, v);
  fragOut = vec4(pow(c, vec3(1.0 / 2.2)), 1.0);
}`;

  // One program for every doll on a context (legendaries and the key are uniform switches), plus
  // the context's resident painted skins and the shared detail map.
  function build(gl) { return { prog: null, vao: gl.createVertexArray(), skins: [], tick: 0, det: detailMap(gl) }; }
  function program(gl, B) {
    if (B.prog) return B.prog;
    const stage = (kind, text) => {
      const sh = gl.createShader(kind);
      gl.shaderSource(sh, text);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error('Peg Folk: ' + gl.getShaderInfoLog(sh));
      return sh;
    };
    const pr = gl.createProgram();
    gl.attachShader(pr, stage(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(pr, stage(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error('Peg Folk: ' + gl.getProgramInfoLog(pr));
    const u = {};
    ['P', 'wLo', 'wHi', 'pA', 'pB', 'pC', 'hairC', 'wallC', 'skin', 'det', 'X', 'Y', 'K', 'lodB', 'marchN', 'ssN'].forEach(n => { u[n] = gl.getUniformLocation(pr, n); });
    return (B.prog = { pr, u });
  }

  // The workshop's detail map, made once per GL context and shared by every doll (it holds no
  // hash, only the texture of the craft): a 512 square that tiles both ways, mipmapped.
  //   r  wood fibres and pores, long along the spindle      g  brush strokes, long round the lathe
  //   b  a blotchy field the knocks and chips are cut from   a  fine scratches in the varnish
  function detailMap(gl) {
    const N = 512, px = new Uint8Array(N * N * 4);
    const hash = (x, y, s) => {
      let h = Math.imul(x, 0x8da6b343) ^ Math.imul(y, 0xd8163841) ^ Math.imul(s, 0xcb1ab31f);
      h = Math.imul(h ^ (h >>> 13), 0x5bd1e995); h ^= h >>> 15;
      return (h >>> 0) * 2.3283064365386963e-10;
    };
    // value noise on a lattice that wraps after px by py cells, so the map tiles
    const wrapNoise = (x, y, px_, py_, s) => {
      const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
      const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
      const x0 = ((ix % px_) + px_) % px_, x1 = (x0 + 1) % px_, y0 = ((iy % py_) + py_) % py_, y1 = (y0 + 1) % py_;
      const a = hash(x0, y0, s), b = hash(x1, y0, s), c = hash(x0, y1, s), d = hash(x1, y1, s);
      return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
    };
    for (let y = 0; y < N; y++) {
      const v = y / N;
      for (let x = 0; x < N; x++) {
        const u = x / N, o = (y * N + x) * 4;
        const fib = 0.55 * wrapNoise(u * 150, v * 5, 150, 5, 1) + 0.3 * wrapNoise(u * 310, v * 11, 310, 11, 2) + 0.15 * wrapNoise(u * 64, v * 3, 64, 3, 9);
        const br = 0.5 * wrapNoise(u * 6, v * 80, 6, 80, 3) + 0.3 * wrapNoise(u * 14, v * 150, 14, 150, 4) + 0.2 * wrapNoise(u * 36, v * 240, 36, 240, 5);
        const bl = 0.47 * wrapNoise(u * 8, v * 8, 8, 8, 6) + 0.27 * wrapNoise(u * 18, v * 18, 18, 18, 7) + 0.16 * wrapNoise(u * 40, v * 40, 40, 40, 8) + 0.1 * wrapNoise(u * 90, v * 90, 90, 90, 10);
        px[o] = Math.min(255, Math.max(0, (fib - 0.5) * 1.8 * 255 + 128));
        px[o + 1] = Math.min(255, Math.max(0, (br - 0.5) * 1.9 * 255 + 128));
        px[o + 2] = Math.min(255, Math.max(0, (bl - 0.5) * 1.7 * 255 + 128));
        px[o + 3] = 0;
      }
    }
    // scratches: short hairline strokes, mostly round the doll, some across (a fixed set)
    let sd = 0x2545f491;
    const r01 = () => { sd ^= sd << 13; sd ^= sd >>> 17; sd ^= sd << 5; return (sd >>> 0) / 4294967296; };
    for (let strokes = 260; strokes-- > 0;) {
      let x = r01() * N, y = r01() * N;
      const a = (r01() < 0.7 ? 0 : Math.PI / 2) + (r01() - 0.5) * 1.1, len = 8 + r01() * 50, lvl = 110 + r01() * 145;
      const dx = Math.cos(a) * 0.5, dy = Math.sin(a) * 0.5;
      for (let k = 0; k < len * 2; k++, x += dx, y += dy) {
        const o = ((((Math.floor(y) % N) + N) % N) * N + (((Math.floor(x) % N) + N) % N)) * 4 + 3;
        px[o] = Math.max(px[o], lvl * (1 - Math.abs(k / (len * 2) - 0.5) * 1.2));
      }
    }
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    gl.pixelStorei(gl.UNPACK_ROW_LENGTH, 0);
    gl.pixelStorei(gl.UNPACK_SKIP_ROWS, 0);
    gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, N, N, 0, gl.RGBA, gl.UNSIGNED_BYTE, px);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.activeTexture(gl.TEXTURE0);
    return tex;
  }

  function skinFor(gl, B, owner, canvas) {
    let slot = B.skins.find(s => s.owner === owner);
    gl.activeTexture(gl.TEXTURE0 + 0);
    if (!slot) {
      if (B.skins.length < 10) { slot = { tex: gl.createTexture(), owner: null, used: 0 }; B.skins.push(slot); }
      else slot = B.skins.reduce((a, b) => (a.used < b.used ? a : b));
      slot.owner = owner;
      gl.bindTexture(gl.TEXTURE_2D, slot.tex);
      gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER, null);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
      gl.pixelStorei(gl.UNPACK_ROW_LENGTH, 0);
      gl.pixelStorei(gl.UNPACK_SKIP_ROWS, 0);
      gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      for (const [k, v] of [[gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.REPEAT], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
    } else gl.bindTexture(gl.TEXTURE_2D, slot.tex);
    gl.bindSampler(0, null);
    slot.used = ++B.tick;
  }

  Proto.add({
    num: 69,
    name: 'Peg Folk',
    fam: 'Rendered 3D',
    recipe: 'Wooden peg dolls turned on a lathe and painted by hand: wood grain shows through the varnish, and old ones are chipped back to the wood. Each hash turns and paints a new one: wood, body and head profile, turned topper, painted hair, eyes, mouth, outfit, paint box, collar, wear and wallpaper. It rocks gently and blinks.',
    interactive: 'Tap to knock it rocking. Drag sideways to spin it.',
    music: true,
    gl: true,
    fps: 24,
    seed: 0,
    make(c) {
      const S = c.size, gl = c.gl;
      if (!made.has(gl)) made.set(gl, build(gl));
      const B = made.get(gl);

      // a 32-bit PCG-style step: LCG state, xorshift-rotate output (the original rolls, kept in order)
      let state = BigInt.asUintN(64, BigInt(c.hash) & 0xffffffffffffffffn);
      const inc = (BigInt('0x' + c.hash.slice(-16)) | 1n) & 0xffffffffffffffffn;
      const pcg = () => {
        const old = state;
        state = BigInt.asUintN(64, old * 6364136223846793005n + inc);
        const xs = Number(BigInt.asUintN(32, ((old >> 18n) ^ old) >> 27n));
        const spinBits = Number(old >> 59n);
        return (((xs >>> spinBits) | (xs << ((32 - spinBits) & 31))) >>> 0) / 4294967296;
      };
      for (let warm = 0; warm < 8; warm++) pcg();
      const fromRows = (gen, rows) => {
        const tot = rows.reduce((s, r) => s + r[1], 0);
        let v = gen() * tot;
        for (const row of rows) { if (v < row[1]) return row; v -= row[1]; }
        return rows[0];
      };
      const lin = n => [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255].map(v => Math.pow(v, 2.2));

      let wood = fromRows(pcg, [['Beech', 26, 0xc9935e, 0xe7c08c], ['Maple', 22, 0xd9b07a, 0xf2d7a8], ['Cherry', 18, 0x9a5532, 0xc77c4e], ['Walnut', 16, 0x5a3a24, 0x86593a], ['Olive', 10, 0xb08a52, 0xe6cf98], ['Ebony', 8, 0x231a16, 0x463428]]);
      let body = fromRows(pcg, [['Peg', 30, 0], ['Skittle', 26, 1], ['Bell', 26, 2], ['Ringed', 18, 3]]);
      let topper = fromRows(pcg, [['None', 36, 0], ['Bun', 16, 1], ['Top Hat', 14, 2], ['Acorn Cap', 14, 3], ['Beret', 14, 4], ['Crown', 6, 5]]);
      let hair = fromRows(pcg, [['Bob', 30, 0], ['Crop', 24, 1], ['Side Part', 22, 2], ['Pigtails', 16, 3], ['Bare Wood', 8, 4]]);
      let eyes = fromRows(pcg, [['Dot Eyes', 34, 0], ['Lashes', 18, 1], ['Big Eyes', 20, 2], ['Spectacles', 14, 3], ['Wink', 14, 4]]);
      let outfit = fromRows(pcg, [['Stripes', 24, 0], ['Polka', 20, 1], ['Buttons', 18, 2], ['Flowers', 18, 3], ['Overalls', 20, 4]]);
      const toyPaints = [0xd8412f, 0x2f62b8, 0xf0b52c, 0x2e8a52, 0x6a3fa8, 0xf1ece0, 0x1f2a44, 0xe77aa0, 0x47a9c9];
      const i1 = Math.floor(pcg() * toyPaints.length);
      let i2 = Math.floor(pcg() * (toyPaints.length - 1)); if (i2 >= i1) i2++;
      const hairTones = [0x2a1a12, 0x6b3a1c, 0xc9862e, 0xe9d38a, 0x111114, 0xb83a2a, 0x5a5a62];
      let hairTone = hairTones[Math.floor(pcg() * hairTones.length)];
      let back = [['Linen', 0, 0xeee3cf], ['Sage', 0, 0xc6d3b8], ['Powder', 0, 0xc5d6e6], ['Blush', 0, 0xefcfcb], ['Butter', 0, 0xf1e2a8], ['Slate', 0, 0x5b6676]][Math.floor(pcg() * 6)];
      const R = 0.4 + pcg() * 0.08, ph = pcg() * 6.283, blinkAt = pcg() * 5;

      // Everything added later rolls from its own stream (a splitmix-style mix of two other hash
      // words), so the dolls that were there before keep their wood, shape, face and paint.
      let s2 = (parseInt(c.hash.slice(18, 26), 16) ^ parseInt(c.hash.slice(42, 50), 16) ^ 0x7f4a7c15) >>> 0;
      const fresh = () => {
        s2 = (s2 + 0x9e3779b9) >>> 0;
        let z = s2 ^ (s2 >>> 16);
        z = Math.imul(z, 0x21f0aaad); z ^= z >>> 15;
        z = Math.imul(z, 0x735a2d97); z ^= z >>> 15;
        return (z >>> 0) / 0x100000000;
      };
      const maybe = (p, rows, keep) => (fresh() < p ? fromRows(fresh, rows) : (fresh(), keep));
      wood = maybe(0.12, [['Driftwood', 6, 0x8d8a82, 0xc9c4b8], ['Rosewood', 5, 0x5e2a1c, 0x9b4a32], ['Zebrawood', 1.6, 0x3a2a1a, 0xe2c896]], wood);
      body = maybe(0.36, [['Cone', 12, 4], ['Barrel', 12, 5], ['Tiered', 10, 6]], body);
      const head = fromRows(fresh, [['Round', 46, 1, 1], ['Egg', 22, 0.92, 1.14], ['Wide', 20, 1.14, 0.9], ['Small', 12, 0.86, 0.86]]);
      topper = maybe(0.42, [['Pointed Hood', 14, 6], ['Chef Toque', 10, 7], ['Bobble Hat', 14, 8], ['Sailor Cap', 10, 11], ['Halo', 3, 9], ['Candle', 2.2, 10]], topper);
      hair = maybe(0.36, [['Long', 10, 5], ['Curls', 10, 6], ['Bangs', 10, 7], ['Top Knot', 8, 8]], hair);
      if (hair[0] === 'Top Knot' && topper[2] !== 0 && topper[2] !== 9) hair = ['Bob', 0, 0];
      eyes = maybe(0.3, [['Sleepy', 12, 5], ['Side Glance', 12, 6], ['Starry', 1.5, 7]], eyes);
      const mouth = fromRows(fresh, [['Smile', 34, 0], ['Grin', 14, 1], ['Oh', 12, 2], ['Button', 12, 3], ['Smirk', 12, 4], ['Tongue Out', 9, 5], ['Moustache', 7, 7]]);
      outfit = maybe(0.46, [['Zigzag', 12, 5], ['Harlequin', 10, 6], ['Tulip Band', 10, 7], ['Tartan', 8, 8], ['Scales', 8, 9], ['Hearts', 8, 10], ['Gold Leaf', 1.6, 11]], outfit);
      const palettes = [
        ['Folk', 12, 0xc8322b, 0x24553a, 0xf2e2b6], ['Nordic', 11, 0x2b4f8c, 0xf1ece0, 0xc8322b], ['Pastel', 11, 0xe9a7b8, 0x9fc7d9, 0xf4e3a1],
        ['Sunset', 10, 0xe8673a, 0x6b2f5c, 0xf2c14e], ['Forest', 9, 0x3f6b3a, 0x8a4b2a, 0xe9d38a], ['Ink & Bone', 7, 0x1d1d22, 0xefe8d8, 0xb8322b],
        ['Candy', 8, 0xf06aa0, 0x55c3b8, 0xfff1c9], ['Royal', 2, 0x4a2a7a, 0xd9a93a, 0xf3e6c4],
      ];
      let third = (i1 + 3 + i2) % toyPaints.length;
      if (third === i1 || third === i2) third = (third + 1) % toyPaints.length;
      if (third === i1 || third === i2) third = (third + 1) % toyPaints.length;
      let paint = ['Toy Box', 0, toyPaints[i1], toyPaints[i2], toyPaints[third]];
      paint = maybe(0.5, palettes, paint);
      let collar = fromRows(fresh, [['None', 50, 0], ['Bead Necklace', 16, 1], ['Ruff', 10, 2], ['Bow Tie', 12, 3], ['Scarf', 12, 4]]);
      const wear = fromRows(fresh, [['Mint', 58, 0], ['Loved', 34, 1], ['Heirloom', 8, 2]]);
      back = maybe(0.4, [['Terracotta', 10, 0xd99a7a], ['Mint', 10, 0xbfe0cf], ['Lavender', 10, 0xd3c8e6], ['Ochre', 8, 0xd8b25a], ['Night Shelf', 3, 0x1e2233]], back);
      const paper = fromRows(fresh, [['', 62, 0], [' Pinstripe', 14, 1], [' Dots', 12, 2], [' Gingham', 9, 3]]);
      const wallPat = back[0] === 'Night Shelf' ? 4 : paper[2];
      const cheeks = fromRows(fresh, [['Blush', 50, 0], ['Freckles', 18, 1], ['Plain', 14, 2], ['Hearts', 4, 3], ['Rosy', 14, 4]])[2];
      if (fresh() < 0.18) hairTone = [0x7a2f8a, 0x2f6a9a, 0xd9d4c8, 0x2e6a3a][Math.floor(fresh() * 4)];
      // The painted face's character rolls from its own stream (two more hash words, xorshift), so
      // every other roll above stays put. Side Glance was a near twin of Dot Eyes: those dolls now
      // wink or doze instead.
      let fs3 = (parseInt(c.hash.slice(34, 42), 16) ^ parseInt(c.hash.slice(50, 58), 16) ^ 0x3c6ef372) >>> 0 || 0x1234567;
      const faceRnd = () => { fs3 ^= fs3 << 13; fs3 >>>= 0; fs3 ^= fs3 >>> 17; fs3 ^= fs3 << 5; fs3 >>>= 0; return fs3 / 4294967296; };
      const face = fromRows(faceRnd, [['Classic', 30], ['Folk Lashes', 18], ['Nutcracker', 14], ['Sleepy Saint', 12], ['Sailor', 13], ['Gap Tooth', 13]]);
      if (eyes[2] === 6) eyes = faceRnd() < 0.5 ? ['Sleepy', 0, 5] : ['Wink', 0, 4];
      const glance = (fresh() < 0.5 ? -1 : 1) * (eyes[2] === 6 ? 1 : 0);
      // the figure in the timber (shown where the wood is bare, and through thin paint)
      const figure = /Zebrawood|Driftwood/.test(wood[0]) ? ['Straight', 0, 0] : fromRows(fresh, [['Straight', 64, 0], ['Flame', 18, 1], ['Birdseye', 11, 2], ['Burl', 7, 3]]);

      for (const [label, row] of [['Wood', wood], ['Body', body], ['Head', head], ['Topper', topper], ['Hair', hair], ['Eyes', eyes], ['Mouth', mouth], ['Outfit', outfit], ['Paint', paint], ['Collar', collar], ['Wear', wear]]) c.trait(label, row[0]);
      c.trait('Backdrop', back[0] + (wallPat > 0 && wallPat < 4 ? paper[0] : ''));
      c.trait('Figure', figure[0]);
      if (face[0] === 'Sleepy Saint' && eyes[2] === 7) face[0] = 'Classic'; // starry eyes stay starry
      c.trait('Face', face[0]);
      if (face[0] === 'Sleepy Saint') c.trait('Eyes', 'Downcast'); // a saint's eyes are painted lowered
      if (face[0] === 'Gap Tooth') c.trait('Mouth', 'Gap-Tooth Grin');

      // The rarest dolls roll from a fourth stream (a Lehmer generator on a hash word the other
      // streams leave alone), so every ordinary doll keeps its look: about 1 in 400 is a
      // Legendary, about 1 in 200 carries the wind-up key.
      let lehmer = (parseInt(c.hash.slice(26, 34), 16) % 2147483646) + 1;
      const rarely = () => (lehmer = (lehmer * 48271) % 2147483647) / 2147483647;
      for (let w = 0; w < 3; w++) rarely();
      const legRoll = rarely(), legPick = rarely(), keyRoll = rarely();
      const legend = legRoll < 0.0025 ? (legPick < 0.4 ? 1 : legPick < 0.75 ? 2 : 3) : 0;
      const hasKey = keyRoll < 0.005 ? 1 : 0;
      if (legend) c.trait('Legendary', ['', 'Water Gilt', 'Nesting Doll', 'Glow Paint'][legend]);
      if (hasKey) c.trait('Coveted', 'Wind-Up Key');
      // water gilt: leaf over the whole doll, its details laid on in black and cinnabar lacquer
      const gilt = legend === 1;
      if (gilt) { hairTone = 0x17110d; paint = ['Lacquer & Gilt', 0, 0xc9a04a, 0x17110d, 0xa8221a]; c.trait('Paint', paint[0]); }
      // a nesting doll is always the rounded matryoshka shell: no topper, no turned hair or collar,
      // a headscarf painted on
      const nesting = legend === 2;
      if (nesting) {
        body = ['Nesting Doll', 0, 0]; topper = ['Nesting Doll', 0, 0]; hair = ['Headscarf', 0, 12]; collar = ['None', 0, 0];
        for (const [label, row] of [['Body', body], ['Topper', topper], ['Hair', hair], ['Collar', collar]]) c.trait(label, row[0]);
      }
      // glow paint: the face is painted in lines (lashed lids, a smiling line), never round eyes or an open mouth
      const glowing = legend === 3;
      const glowEyes = glowing && eyes[2] !== 1 && face[0] !== 'Sleepy Saint';
      const glowMouth = glowing && (face[0] === 'Gap Tooth' || [1, 2, 3, 5].includes(mouth[2]));
      if (glowEyes) c.trait('Eyes', 'Lashes');
      if (glowMouth) c.trait('Mouth', 'Smile');

      // ---------- the painted skin ----------
      // One canvas holds every brushstroke on the turned surface: x runs once round the doll
      // (the front in the middle), y runs down from the crown to below the hem.
      const TW = 1024, TH = 1024, YT = 1.2, YS = 2.95, TAU = Math.PI * 2;
      const skin = document.createElement('canvas');
      skin.width = TW; skin.height = TH;
      const g = skin.getContext('2d');
      const hw = head[2], hh = head[3], hrx = R * hw, hry = R * hh, u = R;
      const ax = a => (a / TAU + 0.5) * TW, hy = y => (YT - y) / YS * TH;
      const css = n => '#' + n.toString(16).padStart(6, '0');
      const shade2 = (n, k) => 'rgb(' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => Math.round(v * k)).join(',') + ')';
      const sstep = (e0, e1, x) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
      const bodyW = y => [0.5, 0.36 + 0.16 * sstep(0.1, -0.6, y) - 0.06 * Math.exp(-(((y + 0.05) / 0.2) ** 2)), 0.32 + 0.4 * sstep(-0.1, -1.4, y), 0.46,
        0.27 + 0.39 * Math.max(0, Math.min(1, (0.18 - y) / 1.7)), 0.39 + 0.14 * Math.cos(Math.max(-1.57, Math.min(1.57, (y + 0.75) * 1.45))), y > -0.55 ? 0.37 : 0.57][body[2]];
      const darkWood = !gilt && /Ebony|Walnut|Rosewood/.test(wood[0]); // a gilt face is gold, whatever the wood
      const keyY = -0.42, keyX = bodyW(keyY) - 0.03;
      // dark woods take their features in gold paint (eyes, mouth, lashes and rims alike), never
      // white eyes or a red mouth on a dark face
      const inkCol = darkWood ? '#e4b95e' : '#1a120f', lipCol = darkWood ? inkCol : gilt ? '#a8221a' : '#9e2024';
      // moustaches and sideburns: the hair's colour, or a dark brown when the hair is too pale to read;
      const hairLum = ((hairTone >> 16) & 255) * 0.3 + ((hairTone >> 8) & 255) * 0.59 + (hairTone & 255) * 0.11;
      const burnCol = darkWood ? '#d8d2c4' : hairLum < 150 ? css(hairTone) : '#3a2418'; // silver on the dark woods
      const A = css(paint[2]), Bc = css(paint[3]), Cc = css(paint[4]);
      // face space (x across the face, y up from the head's centre) onto the canvas
      const onFace = (x, y) => [ax(Math.asin(Math.max(-1, Math.min(1, x / hrx)))), hy(0.62 + y)];
      const trace = (pts, map) => { g.beginPath(); pts.forEach((p, i) => { const q = map ? map(p[0], p[1]) : p; if (i) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]); }); g.closePath(); };
      const ell = (x, y, rx, ry, rot = 0, n = 36) => {
        const out = [];
        for (let i = 0; i < n; i++) { const a = i / n * TAU, ex = Math.cos(a) * rx, ey = Math.sin(a) * ry; out.push([x + ex * Math.cos(rot) - ey * Math.sin(rot), y + ex * Math.sin(rot) + ey * Math.cos(rot)]); }
        return out;
      };
      const arcBand = (x, y, r, w, a0, a1, n = 28) => {
        const out = [];
        for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; out.push([x + Math.cos(a) * (r + w), y + Math.sin(a) * (r + w)]); }
        for (let i = n; i >= 0; i--) { const a = a0 + (a1 - a0) * i / n; out.push([x + Math.cos(a) * (r - w), y + Math.sin(a) * (r - w)]); }
        return out;
      };
      const paintFace = (pts, colr) => { g.fillStyle = colr; trace(pts, onFace); g.fill(); };
      const capped = (x, y, r, w, a0, a1, colr) => {
        paintFace(arcBand(x, y, r, w, a0, a1), colr);
        paintFace(ell(x + Math.cos(a0) * r, y + Math.sin(a0) * r, w, w, 0, 14), colr);
        paintFace(ell(x + Math.cos(a1) * r, y + Math.sin(a1) * r, w, w, 0, 14), colr);
      };
      const star4 = (x, y, r) => { const out = []; for (let i = 0; i < 48; i++) { const a = i / 48 * TAU, k = 0.3 + 0.7 * Math.pow(Math.abs(Math.cos(a * 2)), 5); out.push([x + Math.cos(a) * r * k, y + Math.sin(a) * r * k]); } return out; };
      const heart = (x, y, s) => { const out = []; for (let i = 0; i < 40; i++) { const t = i / 40 * TAU; out.push([x + s * 0.06 * 16 * Math.pow(Math.sin(t), 3), y + s * 0.057 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))]); } return out; };
      // a world-size round dab on the body at (angle, height)
      const dab = (a, y, rw, colr) => { g.fillStyle = colr; g.beginPath(); g.ellipse(ax(a), hy(y), rw / bodyW(y) * TW / TAU, rw * TH / YS, 0, 0, TAU); g.fill(); };
      const wrapX = (fn, a) => { fn(a); if (a < -2.6) fn(a + TAU); if (a > 2.6) fn(a - TAU); };

      // the outfit, from the hem up to the collar line
      const yTop = 0.24, yHem = -1.4, oy0 = hy(yTop), oy1 = hy(yHem);
      g.save();
      g.beginPath(); g.rect(0, oy0, TW, oy1 - oy0); g.clip();
      g.fillStyle = A; g.fillRect(0, oy0, TW, oy1 - oy0);
      const ok = outfit[2];
      if (ok === 0) { g.fillStyle = Bc; for (let y = 0.2; y > yHem - 0.2; y -= 0.2) g.fillRect(0, hy(y), TW, 0.1 * TH / YS); }
      else if (ok === 1) { for (let r = 0; r < 10; r++) for (let i = 0; i < 14; i++) wrapX(a => dab(a, yTop - 0.09 - r * 0.17, 0.05, Bc), -Math.PI + (i + 0.5 * (r % 2)) * TAU / 14); }
      else if (ok === 2) {
        const holes = shade2(paint[3], 0.55);
        for (let b = 0; b < 4; b++) { // four buttons down the front
          const y = 0.1 - b * 0.27;
          dab(0, y, 0.048, Bc);
          for (const hx of [-0.03, 0.03]) for (const hy2 of [0.008, -0.016]) dab(hx, y + hy2, 0.009, holes);
        }
      } else if (ok === 3) {
        for (let r = 0; r < 7; r++) for (let i = 0; i < 10; i++) wrapX(a => {
          const y = yTop - 0.13 - r * 0.25;
          for (let k = 0; k < 5; k++) { const an = k / 5 * TAU + r; dab(a + Math.cos(an) * 0.055 / bodyW(y), y + Math.sin(an) * 0.055, 0.04, Bc); }
          dab(a, y, 0.028, Cc);
        }, -Math.PI + (i + 0.5 * (r % 2)) * TAU / 10);
      } else if (ok === 4) {
        g.fillStyle = Bc;
        g.fillRect(0, hy(-0.05), TW, oy1 - hy(-0.05));
        g.fillRect(ax(-0.55), hy(0.18), ax(0.55) - ax(-0.55), hy(-0.05) - hy(0.18));
        for (const s of [-1, 1]) g.fillRect(ax(s * 0.62 - 0.07), hy(yTop), ax(0.14) - ax(0), hy(-0.1) - hy(yTop));
        g.fillStyle = shade2(paint[3], 0.86);
        g.fillRect(ax(-0.2), hy(0.06), ax(0.2) - ax(-0.2), hy(-0.1) - hy(0.06));
        g.setLineDash([5, 4]); g.strokeStyle = Cc; g.lineWidth = 1.5;
        g.strokeRect(ax(-0.18), hy(0.045), ax(0.18) - ax(-0.18), hy(-0.085) - hy(0.045));
        g.setLineDash([]);
        for (const s of [-1, 1]) dab(s * 0.62, 0.15, 0.028, Cc);
      } else if (ok === 5) {
        g.fillStyle = Bc;
        for (let y = 0.12; y > yHem - 0.3; y -= 0.29) {
          g.beginPath();
          for (let i = 0; i <= 36; i++) g.lineTo(ax(-Math.PI + i / 36 * TAU), hy(y + (i % 2 ? 0.07 : -0.07)));
          for (let i = 36; i >= 0; i--) g.lineTo(ax(-Math.PI + i / 36 * TAU), hy(y - 0.12 + (i % 2 ? 0.07 : -0.07)));
          g.closePath(); g.fill(); // one zigzag band
        }
      } else if (ok === 6) {
        const cols = 8, rh = 0.3;
        for (let r = 0; r < 12; r++) for (let i = 0; i <= cols; i++) {
          const a0 = -Math.PI + (i + 0.5 * (r % 2)) * TAU / cols, y0 = yTop + 0.15 - r * rh / 2;
          g.fillStyle = r % 2 ? Bc : A;
          g.beginPath(); g.moveTo(ax(a0), hy(y0)); g.lineTo(ax(a0 + TAU / cols / 2), hy(y0 - rh / 2)); g.lineTo(ax(a0), hy(y0 - rh)); g.lineTo(ax(a0 - TAU / cols / 2), hy(y0 - rh / 2)); g.closePath(); g.fill(); // a diamond
        }
        g.strokeStyle = Cc; g.lineWidth = 2;
        for (let i = -8; i < 16; i++) { g.beginPath(); g.moveTo(ax(-Math.PI + i * TAU / 16), oy0); g.lineTo(ax(-Math.PI + (i + 7) * TAU / 16), oy1); g.stroke(); g.beginPath(); g.moveTo(ax(-Math.PI + i * TAU / 16), oy1); g.lineTo(ax(-Math.PI + (i + 7) * TAU / 16), oy0); g.stroke(); }
      } else if (ok === 7) {
        const yc = -0.6, sx = 1 / bodyW(yc);
        g.fillStyle = Bc; g.fillRect(0, hy(yc + 0.24), TW, hy(yc - 0.24) - hy(yc + 0.24));
        g.fillStyle = Cc;
        for (const e of [0.25, -0.25]) g.fillRect(0, hy(yc + e) - 3, TW, 6);
        for (let i = 0; i < 9; i++) wrapX(a => {
          g.fillStyle = Cc;
          g.fillRect(ax(a) - 2, hy(yc + 0.02), 4, hy(yc - 0.15) - hy(yc + 0.02));
          for (const s of [-1, 1]) { g.fillStyle = shade2(paint[4], 0.8); g.beginPath(); g.ellipse(ax(a + s * 0.045 * sx), hy(yc - 0.1), 0.045 * sx * TW / TAU, 0.018 * TH / YS, s * 0.5, 0, TAU); g.fill(); }
          dab(a, yc + 0.045, 0.052, Cc); dab(a - 0.032 * sx, yc + 0.075, 0.035, Cc); dab(a + 0.032 * sx, yc + 0.075, 0.035, Cc);
          dab(a, yc + 0.03, 0.02, A);
        }, -Math.PI + (i + 0.5) * TAU / 9);
      } else if (ok === 8) {
        g.globalAlpha = 0.5; g.fillStyle = Bc;
        for (let i = 0; i < 7; i++) g.fillRect(ax(-Math.PI + i * TAU / 7), oy0, ax(0.35) - ax(0), oy1 - oy0);
        for (let y = 0.2; y > yHem; y -= 0.33) g.fillRect(0, hy(y), TW, 0.12 * TH / YS);
        g.globalAlpha = 0.9; g.fillStyle = Cc;
        for (let i = 0; i < 7; i++) g.fillRect(ax(-Math.PI + i * TAU / 7 + 0.42), oy0, 3, oy1 - oy0);
        for (let y = 0.05; y > yHem; y -= 0.33) g.fillRect(0, hy(y), TW, 3);
        g.globalAlpha = 1;
      } else if (ok === 9) {
        g.fillStyle = Bc; g.fillRect(0, oy0, TW, oy1 - oy0);
        for (let r = 13; r >= 0; r--) for (let i = 0; i < 16; i++) wrapX(a => {
          const y = yTop + 0.05 - r * 0.13, rw = 0.1;
          g.fillStyle = A; g.strokeStyle = Cc; g.lineWidth = 2.5;
          g.beginPath(); g.ellipse(ax(a), hy(y), rw / bodyW(y) * TW / TAU, rw * TH / YS, 0, 0, Math.PI); g.fill(); g.stroke();
        }, -Math.PI + (i + 0.5 * (r % 2)) * TAU / 16);
      } else if (ok === 10) {
        for (let r = 0; r < 7; r++) for (let i = 0; i < 9; i++) wrapX(a => {
          const y = yTop - 0.12 - r * 0.24, s = 0.055;
          g.fillStyle = Bc; trace(heart(0, 0, 1), (x, yy) => [ax(a + x * s / bodyW(y)), hy(y + yy * s)]); g.fill();
        }, -Math.PI + (i + 0.5 * (r % 2)) * TAU / 9);
      }
      // painted collars
      if (collar[2] === 3) {
        g.fillStyle = Cc;
        const bx = x => ax(x / bodyW(0.12)), by = y => hy(0.12 + y);
        for (const s of [-1, 1]) { g.beginPath(); g.moveTo(bx(0), by(0)); g.lineTo(bx(s * 0.13), by(0.07)); g.lineTo(bx(s * 0.12), by(-0.07)); g.closePath(); g.fill(); }
        dab(0, 0.12, 0.032, shade2(paint[4], 0.85));
      } else if (collar[2] === 4) {
        g.fillStyle = Cc;
        g.beginPath();
        for (let i = 0; i <= 64; i++) { const a = -Math.PI + i / 64 * TAU; g.lineTo(ax(a), hy(0.2 + 0.012 * Math.sin(a * 5))); }
        for (let i = 64; i >= 0; i--) { const a = -Math.PI + i / 64 * TAU; g.lineTo(ax(a), hy(0.07 + 0.012 * Math.sin(a * 5))); }
        g.closePath(); g.fill(); // the scarf band
        g.beginPath(); g.moveTo(ax(0.36), hy(0.12)); g.lineTo(ax(0.56), hy(0.12)); g.lineTo(ax(0.6), hy(-0.4)); g.lineTo(ax(0.36), hy(-0.38)); g.closePath(); g.fill();
        g.fillStyle = Bc;
        for (let y = 0.0; y > -0.36; y -= 0.09) g.fillRect(ax(0.37), hy(y), ax(0.58) - ax(0.37), 0.04 * TH / YS);
        g.strokeStyle = Cc; g.lineWidth = 2;
        for (let i = 0; i < 7; i++) { const a = 0.37 + i * 0.035; g.beginPath(); g.moveTo(ax(a), hy(-0.39)); g.lineTo(ax(a + 0.004), hy(-0.47)); g.stroke(); }
      }
      g.restore();
      g.fillStyle = shade2(paint[3], 0.8); g.fillRect(0, hy(0.245), TW, 0.012 * TH / YS);

      // the head: painted hair, then the face, drawn once open-eyed and once (into the spare
      // band below the hem) closed-eyed for the blink
      const hairEdge = a => {
        const aa = Math.abs(a);
        switch (hair[2]) {
          case 0: return 0.25 + 0.1 * Math.cos(a) - 0.35 * sstep(0.9, 1.9, aa) - 0.05 * Math.sin(a * 9);
          case 1: return 0.42 + 0.06 * Math.sin(a * 14);
          case 2: { const s = Math.abs(a - 0.32); return s >= 0.25 ? 0.2 : Math.min(0.62, 0.2 + (0.25 - s) / 0.4); }
          case 3: return 0.3 - 0.4 * sstep(1.2, 2.2, aa);
          case 5: return 0.3 - 1.6 * sstep(0.9, 1.6, aa) + 0.04 * Math.sin(a * 5);
          case 6: return 0.3 + 0.08 * (1 - Math.abs(Math.sin(a * 6))) - 0.5 * sstep(1.3, 2.3, aa);
          case 7: return 0.36 - 0.71 * sstep(0.85, 1.25, aa);
          case 8: return 0.45 - 0.55 * sstep(1.0, 2.0, aa);
          case 12: return 0.36 - 1.75 * sstep(0.7, 1.2, aa) + 0.03 * Math.sin(a * 7);
          default: return 9;
        }
      };
      const hairCss = css(hairTone);
      const paintHead = closed => {
        if (hair[2] !== 4) {
          g.save();
          g.beginPath(); g.rect(0, 0, TW, hy(hair[2] === 5 ? -0.15 : hair[2] === 12 ? -0.2 : 0.24)); g.clip();
          g.beginPath(); g.moveTo(0, 0); // hair: everything above the hairline
          for (let i = 0; i <= 256; i++) { const a = -Math.PI + i / 256 * TAU; g.lineTo(ax(a), hy(0.62 + hairEdge(a) * hry)); }
          g.lineTo(TW, 0); g.closePath();
          g.fillStyle = hair[2] === 12 ? Cc : hairCss; g.fill();
          g.clip();
          if (hair[2] === 12) { // the headscarf: a hem in the second paint, little painted flowers, and below it, a fringe of hair at the brow
            g.lineWidth = 7; g.strokeStyle = Bc; g.stroke();
            for (let r = 0; r < 5; r++) for (let i = 0; i < 12; i++) {
              const a = -Math.PI + (i + 0.5 * (r % 2)) * TAU / 12, y = 0.62 + hry * (0.95 - r * 0.45);
              for (let k = 0; k < 5; k++) { const an = k / 5 * TAU; dab(a + Math.cos(an) * 0.03 / bodyW(0), y + Math.sin(an) * 0.03, 0.022, A); }
              dab(a, y, 0.014, Bc);
            }
          }
          // brush streaks follow the hair from the crown down
          g.lineWidth = 2;
          for (let i = 0; i < 90; i++) { // brush streaks
            const a = -Math.PI + (i + 0.37 * Math.sin(i * 2.3)) / 90 * TAU;
            g.strokeStyle = i % 3 ? 'rgba(0,0,0,0.13)' : 'rgba(255,255,255,0.1)';
            g.beginPath(); g.moveTo(ax(a), hy(0.62 + hry)); g.quadraticCurveTo(ax(a + 0.05), hy(0.62), ax(a + 0.02 * Math.sin(i)), hy(0.62 + hairEdge(a) * hry - 0.02)); g.stroke();
          }
          if (hair[2] === 6) {
            g.strokeStyle = 'rgba(0,0,0,0.28)'; g.lineWidth = 3;
            for (let r = 0; r < 6; r++) for (let i = 0; i < 18; i++) { g.beginPath(); g.ellipse(ax(-Math.PI + (i + 0.5 * (r % 2)) * TAU / 18), hy(0.62 + hry * (0.98 - r * 0.24)), 9, 10, 0, 0, TAU); g.stroke(); }
          }
          g.restore();
          if (hair[2] === 12) { // a fringe of hair peeping out under the headscarf at the brow
            g.fillStyle = hairCss; g.beginPath();
            for (let i = 0; i <= 40; i++) { const a = -0.72 + i / 40 * 1.44; g.lineTo(ax(a), hy(0.62 + (hairEdge(a) + 0.01) * hry)); }
            for (let i = 40; i >= 0; i--) { const a = -0.72 + i / 40 * 1.44; g.lineTo(ax(a), hy(0.62 + (hairEdge(a) - 0.09 + 0.03 * Math.sin(a * 23)) * hry)); }
            g.closePath(); g.fill();
          }
        }
        // eyes: painted big, so a face still reads when the doll is small
        const ek = face[0] === 'Sleepy Saint' ? 8 : glowEyes ? 1 : eyes[2], gx = glance * u * 0.07;
        const line = (x0, y0, x1, y1, w, colr) => { const l = Math.hypot(x1 - x0, y1 - y0) || 1, nx = -(y1 - y0) / l * w, ny = (x1 - x0) / l * w; paintFace([[x0 + nx, y0 + ny], [x1 + nx, y1 + ny], [x1 - nx, y1 - ny], [x0 - nx, y0 - ny]], colr); };
        for (const side of [-1, 1]) { // the two eyes
          const ex = side * u * 0.4 + gx, ey = u * 0.1;
          if (ek === 1) {
            capped(ex, ey + u * 0.11, u * 0.15, u * 0.033, -Math.PI + 0.42, -0.42, inkCol);
            for (const k of [-0.6, 0, 0.6]) { const a = -Math.PI / 2 + k; line(ex + Math.cos(a) * u * 0.17, ey + u * 0.11 + Math.sin(a) * u * 0.17, ex + Math.cos(a) * u * 0.25, ey + u * 0.11 + Math.sin(a) * u * 0.25, u * 0.016, inkCol); }
            continue;
          }
          if (ek === 8) { // a saint's downcast eyes: heavy lowered lids, lashes falling
            capped(ex, ey + u * 0.1, u * 0.15, u * 0.034, -Math.PI + 0.45, -0.45, inkCol);
            for (const k of [-0.45, 0.05, 0.55]) { const a = -Math.PI / 2 + k * side; line(ex + Math.cos(a) * u * 0.16, ey + u * 0.1 + Math.sin(a) * u * 0.16, ex + Math.cos(a) * u * 0.23, ey + u * 0.1 + Math.sin(a) * u * 0.23, u * 0.014, inkCol); }
            continue;
          }
          if (ek === 4 && side === 1) { capped(ex, ey - u * 0.08, u * 0.15, u * 0.034, 0.1, Math.PI - 0.1, inkCol); continue; }
          if (ek === 3) {
            capped(ex, ey, u * 0.25, u * 0.03, 0, TAU - 0.001, inkCol);
            if (side === 1) paintFace([[-u * 0.16 + gx, ey + u * 0.025], [u * 0.16 + gx, ey + u * 0.025], [u * 0.16 + gx, ey - u * 0.025], [-u * 0.16 + gx, ey - u * 0.025]], inkCol);
          }
          if (closed) { capped(ex, ey + u * 0.1, u * 0.15, u * 0.033, -Math.PI + 0.55, -0.55, inkCol); continue; }
          if (ek === 0) paintFace(ell(ex, ey, u * 0.165, u * 0.175), inkCol);
          else if (ek === 2) { paintFace(ell(ex, ey, u * 0.235, u * 0.235), inkCol); paintFace(ell(ex - u * 0.065, ey + u * 0.075, u * 0.065, u * 0.065, 0, 16), darkWood ? '#fff1c8' : '#f7f2e8'); }
          else if (ek === 3) paintFace(ell(ex, ey, u * 0.1, u * 0.1, 0, 20), inkCol);
          else if (ek === 4) paintFace(ell(ex, ey, u * 0.14, u * 0.14), inkCol);
          else if (ek === 5) {
            paintFace(arcBand(ex, ey + u * 0.015, u * 0.09, u * 0.09, Math.PI, TAU, 18), inkCol);
            paintFace([[ex - u * 0.22, ey + u * 0.04], [ex + u * 0.22, ey + u * 0.04], [ex + u * 0.22, ey - u * 0.012], [ex - u * 0.22, ey - u * 0.012]], inkCol);
          } else if (ek === 7) { paintFace(star4(ex, ey, u * 0.27), '#e8b13a'); paintFace(ell(ex - u * 0.045, ey + u * 0.045, u * 0.03, u * 0.03, 0, 10), '#fff6dc'); }
          if (face[0] === 'Folk Lashes' && ek !== 1 && ek !== 3 && !(ek === 4 && side === 1)) // three long folk-art lashes fanned over each eye
            for (const k of [-0.55, 0, 0.55]) { const a = Math.PI / 2 + k + 0.25 * side; line(ex + Math.cos(a) * u * 0.2, ey + Math.sin(a) * u * 0.2, ex + Math.cos(a) * u * 0.33, ey + Math.sin(a) * u * 0.33, u * 0.018, inkCol); }
        }
        // brows: a saint's high thin arches, a nutcracker's stern bars
        for (const side of [-1, 1]) {
          const ex = side * u * 0.4;
          if (face[0] === 'Sleepy Saint') capped(ex, u * 0.22, u * 0.2, u * 0.018, 0.45, Math.PI - 0.45, inkCol);
          else if (face[0] === 'Nutcracker') line(side * u * 0.17, u * 0.34, side * u * 0.56, u * 0.47, u * 0.04, inkCol);
        }
        // cheeks
        const ck2 = glowing ? 2 : face[0] === 'Folk Lashes' || gilt ? 5 : face[0] === 'Gap Tooth' ? 1 : cheeks;
        for (const side of [-1, 1]) { // the two cheeks
          const cx0 = side * u * 0.5, cy0 = -u * 0.17;
          if (ck2 === 0 || ck2 === 4) {
            const p = onFace(cx0, cy0), ry = u * 0.2 * (ck2 === 4 ? 1.35 : 1) * TH / YS;
            const rx = ry * (TW / TAU) / (TH / YS) / (hrx * Math.cos(Math.asin(Math.min(0.95, Math.abs(cx0) / hrx))));
            const gr = g.createRadialGradient(p[0], p[1], 0, p[0], p[1], ry);
            // on dark woods the blush is a soft warm terracotta, not a pink disc
            const bc = darkWood ? '196,104,72' : ck2 === 4 ? '240,110,100' : '234,107,107', ba = darkWood ? 0.6 : 1;
            gr.addColorStop(0, `rgba(${bc},${(ck2 === 4 ? 0.55 : 0.72) * ba})`);
            gr.addColorStop(0.7, `rgba(${bc},${(ck2 === 4 ? 0.35 : 0.6) * ba})`);
            gr.addColorStop(1, `rgba(${bc},0)`);
            g.save(); g.translate(p[0], p[1]); g.scale(rx / ry, 1); g.translate(-p[0], -p[1]);
            g.fillStyle = gr; g.beginPath(); g.arc(p[0], p[1], ry, 0, TAU); g.fill();
            g.restore();
          } else if (ck2 === 1) for (const f of [[-0.08, 0.04], [0.06, 0.07], [0, -0.06], [0.09, -0.04], [-0.06, -0.05]]) paintFace(ell(cx0 + f[0] * u * side, cy0 + f[1] * u, u * 0.03, u * 0.03, 0, 12), darkWood ? '#d9a27a' : '#8c4e33');
          else if (ck2 === 3) paintFace(heart(cx0, cy0, u * 0.16), '#e0405a');
          else if (ck2 === 5) paintFace(ell(cx0, cy0 - u * 0.02, u * 0.13, u * 0.13), gilt ? '#a8221a' : darkWood ? '#c4684a' : '#d8412f'); // folk-art: a round rosy dot
        }
        // sideburns: a sailor's mutton chops, down the sides of the face to the jaw
        if (face[0] === 'Sailor') for (const side of [-1, 1]) {
          paintFace([[side * u * 0.66, u * 0.38], [side * u * 0.9, u * 0.36], [side * u * 0.92, -u * 0.3], [side * u * 0.74, -u * 0.62], [side * u * 0.38, -u * 0.6], [side * u * 0.4, -u * 0.34], [side * u * 0.62, -u * 0.2], [side * u * 0.66, u * 0.1]], burnCol);
          for (const f of [[-0.3, -0.56], [-0.14, -0.62], [0.02, -0.64], [0.18, -0.6], [0.34, -0.55]]) paintFace(ell(f[0] * u * side, f[1] * u, u * 0.022, u * 0.022, 0, 10), burnCol); // stubble along the jaw
        }
        // mouth
        const mk = glowMouth ? 0 : face[0] === 'Gap Tooth' ? 9 : mouth[2], my = -u * 0.27;
        if (mk === 0 || mk === 5) capped(0, my + u * 0.22, u * 0.3, u * 0.042, -Math.PI * 5 / 6, -Math.PI / 6, lipCol);
        if (mk === 5) paintFace(ell(u * 0.07, my - u * 0.09, u * 0.085, u * 0.1, 0, 24), darkWood ? '#c9784f' : '#e36a76');
        else if (mk === 1) {
          // on dark woods the grin is one gold open smile, no white teeth
          paintFace(arcBand(0, my + u * 0.05, u * 0.14, u * 0.14, Math.PI, TAU, 24), darkWood ? inkCol : '#5a1216');
          if (!darkWood) paintFace([[-u * 0.27, my + u * 0.05], [u * 0.27, my + u * 0.05], [u * 0.23, my - u * 0.05], [-u * 0.23, my - u * 0.05]], '#f7f2e8');
        } else if (mk === 2) paintFace(ell(0, my, u * 0.1, u * 0.13), darkWood ? inkCol : '#661418');
        else if (mk === 3) paintFace(ell(0, my + u * 0.02, u * 0.065, u * 0.065, 0, 18), lipCol);
        else if (mk === 4) capped(u * 0.09, my + u * 0.19, u * 0.22, u * 0.04, -Math.PI * 0.72 + 0.35, 0, lipCol);
        else if (mk === 7) {
          capped(0, my + u * 0.1, u * 0.14, u * 0.036, -Math.PI * 0.8, -Math.PI * 0.2, lipCol);
          for (const s of [-1, 1]) paintFace(ell(s * u * 0.15, my + u * 0.17, u * 0.18, u * 0.07, s * 0.22), hairCss);
        } else if (mk === 9) { // a freckled grin with a gap in the front teeth (amber and pale gold on dark woods, never white)
          paintFace(arcBand(0, my + u * 0.08, u * 0.17, u * 0.17, Math.PI, TAU, 24), darkWood ? '#8a5a1a' : '#5a1216');
          for (const s of [-1, 1]) paintFace([[s * u * 0.02, my + u * 0.08], [s * u * 0.15, my + u * 0.08], [s * u * 0.15, my - u * 0.03], [s * u * 0.02, my - u * 0.03]], darkWood ? '#f0d79a' : '#f7f2e8');
        }
        if (face[0] === 'Nutcracker') { // a nutcracker's great moustache with curled tips, and the hinge lines of its jaw
          for (const s of [-1, 1]) {
            paintFace(ell(s * u * 0.19, my + u * 0.15, u * 0.22, u * 0.085, s * 0.28), burnCol);
            paintFace(ell(s * u * 0.4, my + u * 0.25, u * 0.06, u * 0.06, 0, 14), burnCol);
            line(s * u * 0.22, my - u * 0.05, s * u * 0.2, my - u * 0.36, u * 0.016, inkCol);
          }
        }
      };
      paintHead(false);
      g.save();
      g.beginPath(); g.rect(0, hy(-1.44), TW, hy(-1.74) - hy(-1.44)); g.clip();
      g.translate(0, 2.27 * TH / YS);
      paintHead(true);
      g.restore();

      // Framing: the camera backs off just enough that the tallest topper (hood, toque, candle
      // flame) clears the top of the frame with a margin, so nothing is ever cut off.
      const crown = 0.62 + hry;
      const lift = [0, 0.25, 0.5, 0.18, 0.2, 0.2, 0.68, 0.56, 0.3, 0.26, 0.62, 0.12][topper[2]] + (hair[2] === 8 && topper[2] === 0 ? 0.22 : 0);
      // A nesting doll's lifted top half takes the camera up with it, so its face stays in frame.
      const foot = -0.86, ceiling = crown + lift + 0.22;
      let span, camY, focal, flameY01, lodBase;
      const frameFor = open => {
        span = Math.max(2.45, ceiling + 0.95 * open - foot); camY = foot + span / 2; focal = 2 * 6.01 / span;
        flameY01 = 0.5 - (crown + 0.95 * open + 0.42 - camY) / span;
        lodBase = Math.log2(span / (S * (S <= 420 ? 2 : 1)) / 0.0029);
      };
      frameFor(0);

      // The viewer's hands: a tap knocks it rocking (a wooden clonk, pitched by where it was
      // struck); a sideways drag spins it on its base with a soft ratchet tick, and it settles
      // back to face front; a tap on a candle flame blows it out until it relights itself.
      const hands = c.input, xylo = c.sound;
      const tailP = parseInt(c.hash.slice(-10, -2), 16) >>> 0;
      const clonkRoot = [55, 52, 50, 57, 53, 51, 54][body[2]] + (tailP % 3), clonkScale = [0, 2, 4, 7, 9, 12, 14, 16, 19];
      const woodTone = darkWood ? 1500 : 2600;
      let rock = 0, rockV = 0, turn = 0, turnV = 0, grabX = null, dragged = 0, sinceGrab = 9, lastNotch = 0;
      let flame = topper[2] === 10 ? 1 : 0, flameGoal = flame, relight = 0;
      const notch = Math.PI / 4;
      // Legendary and key state; with no input these hold still (no burnish, no torch, lamp off,
      // lid shut, key at rest), so a tile shows the doll as rolled.
      let lid = 0, lidGoal = 0, burnish = 0, torch = 0, lamp = 0, charge = 0.4, keyTurn = 0.6, twirl = 0, tune = -1, tuneT = 0, ptr = [0, 0];
      const toSet = (x, y) => [(x - 0.5) * span, camY + (0.5 - y) * span];
      const box = [0, 2, 4, 7, 9, 12, 11, 7, 4, 2, 4, 0];   // a little music-box tune, scale steps
      const handle = dt => {
        if (hands.inside) ptr = toSet(hands.x, hands.y);
        if (legend === 1) burnish += ((hands.inside ? 1 : 0) - burnish) * Math.min(1, dt * 4);
        if (legend === 2) {
          // hovering lifts the lid a crack to peek; a tap takes it right off, another puts it back
          const goal = Math.max(lidGoal, hands.inside ? 0.06 : 0);
          const before = lid;
          lid += (goal - lid) * Math.min(1, dt * (goal > lid ? 3.2 : 4.5));
          if (before > 0.03 && lid <= 0.03 && goal === 0) xylo.note(clonkRoot - 5, { dur: 0.25, vel: 0.22, wave: 'triangle', cutoff: woodTone });
        }
        if (legend === 3) {
          torch += ((hands.inside ? 1 : 0) - torch) * Math.min(1, dt * 5);
          lamp = Math.max(0, lamp - dt * 0.6);
          charge += (Math.min(1, 0.4 + torch * 0.6 + lamp) - charge) * Math.min(1, dt * (torch + lamp > 0.3 ? 1.5 : 0.12));
        }
        if (hasKey) {
          if (hands.inside && !hands.down && tune < 0) { // a hand near the key winds it, a click a notch
            const was = Math.floor(keyTurn / 0.8);
            keyTurn += dt * 1.2;
            if (Math.floor(keyTurn / 0.8) !== was) xylo.hit('click', 0.05, { pan: 0.3 });
          }
          if (tune >= 0) { // playing: the key unwinds and the doll turns once round
            tuneT += dt; keyTurn = Math.max(0, keyTurn - dt * 2.4); twirl += dt * TAU / (box.length * 0.3);
            while (tune < box.length && tuneT >= tune * 0.3) {
              xylo.note(clonkRoot + 24 + clonkScale[box[tune] % clonkScale.length] - (box[tune] > 9 ? 0 : 0), { dur: 0.6, vel: 0.13, wave: 'sine', pan: 0.25 * Math.sin(tune) });
              xylo.note(clonkRoot + 36 + clonkScale[box[tune] % clonkScale.length], { dur: 0.12, vel: 0.03, wave: 'sine' });
              tune++;
            }
            if (tune >= box.length && tuneT > box.length * 0.3 + 0.2) tune = -1;
          } else if (twirl) { const home = Math.round(twirl / TAU) * TAU; twirl += (home - twirl) * Math.min(1, dt * 3); if (Math.abs(home - twirl) < 1e-3) twirl = 0; }
        }
        if (hands.inside && hands.down) {
          if (grabX === null) { grabX = hands.x; dragged = 0; }
          const dx = hands.x - grabX; grabX = hands.x;
          dragged += Math.abs(dx);
          if (dragged > 0.015) { turn += dx * 6; turnV = dx * 6 / Math.max(dt, 1e-3); }
          sinceGrab = 0;
        } else {
          grabX = null; sinceGrab += dt;
          if (turn || turnV) {
            turn += turnV * dt; turnV *= Math.exp(-dt * 2.6);
            if (Math.abs(turnV) < 0.4) {
              const home = Math.round(turn / TAU) * TAU;
              turn += (home - turn) * Math.min(1, dt * 2.2);
              if (Math.abs(home - turn) < 1e-3 && Math.abs(turnV) < 0.05) turn = turnV = 0;
            }
          }
        }
        const nn = Math.floor(turn / notch);
        if (nn !== lastNotch) { xylo.hit('click', 0.07, { pan: 0.1 * Math.sign(nn - lastNotch) }); lastNotch = nn; }
        for (const knockAt of hands.taps()) {
          if (dragged > 0.015 && sinceGrab < 0.3) continue;
          if (legend === 2) {
            lidGoal = lidGoal > 0.5 ? 0 : 1;
            xylo.hit('click', 0.22);
            if (lidGoal) { xylo.note(clonkRoot + 12, { dur: 0.3, vel: 0.2, wave: 'triangle', cutoff: woodTone }); xylo.note(clonkRoot + 19, { dur: 0.4, vel: 0.14, wave: 'sine', at: 0.25 }); xylo.note(clonkRoot + 24, { dur: 0.5, vel: 0.12, wave: 'sine', at: 0.38 }); }
            continue;
          }
          if (legend === 1) { // a tap rings the gilt like a little bell
            xylo.note(clonkRoot + 24, { dur: 1.6, vel: 0.14, wave: 'sine' });
            xylo.note(clonkRoot + 31, { dur: 1.2, vel: 0.07, wave: 'sine', at: 0.02 });
            xylo.note(clonkRoot + 40, { dur: 0.6, vel: 0.04, wave: 'sine', at: 0.04 });
          }
          if (legend === 3) { // the lamp switch: on for a moment, then dark again, the paint freshly charged
            lamp = 1; xylo.hit('click', 0.2);
            xylo.note(clonkRoot + 19, { dur: 0.8, vel: 0.08, wave: 'sine', at: 0.1 });
            continue;
          }
          if (hasKey && tune < 0 && keyTurn > 0.8) { tune = 0; tuneT = 0; xylo.hit('click', 0.15); }
          if (topper[2] === 10 && flameGoal > 0.5 && Math.abs(knockAt.x - 0.5) < 0.08 && Math.abs(knockAt.y - flameY01) < 0.09) {
            flameGoal = 0; relight = 4.5;
            xylo.hit('noise', 0.14, { cutoff: 900, dur: 0.35 });
            xylo.note(clonkRoot + 31, { dur: 0.5, vel: 0.07, wave: 'sine', at: 0.05 });
            continue;
          }
          const side = knockAt.x < 0.5 ? 1 : -1;
          rockV += side * (0.9 + 0.6 * Math.abs(knockAt.x - 0.5));
          const stepN = Math.max(0, Math.min(clonkScale.length - 1, Math.floor((1 - knockAt.y) * clonkScale.length)));
          xylo.hit('click', 0.3, { pan: (knockAt.x - 0.5) * 0.5 });
          xylo.note(clonkRoot + clonkScale[stepN], { dur: 0.35, vel: 0.3, wave: 'triangle', cutoff: woodTone, pan: (knockAt.x - 0.5) * 0.5 });
          xylo.note(clonkRoot + clonkScale[stepN] + 24, { dur: 0.06, vel: 0.08, wave: 'sine' });
        }
        if (relight > 0 && (relight -= dt) <= 0) { flameGoal = 1; xylo.hit('blip', 0.1, { freq: 1300 }); }
        flame += (flameGoal - flame) * Math.min(1, dt * (flameGoal > flame ? 3 : 9));
        if (rock || rockV) {
          rockV += (-38 * rock - 2.2 * rockV) * dt; rock += rockV * dt;
          rock = Math.max(-0.22, Math.min(0.22, rock));
          if (Math.abs(rock) < 1e-5 && Math.abs(rockV) < 1e-4) rock = rockV = 0;
        }
      };

      const woodFigure = wood[0] === 'Zebrawood' ? 1 : wood[0] === 'Driftwood' ? 2 : 0;
      // on dark woods the pigtail beads are painted in the brightest colour of the paint box
      const lum8 = n => ((n >> 16) & 255) * 0.3 + ((n >> 8) & 255) * 0.59 + (n & 255) * 0.11;
      const beadTone = darkWood && hair[2] === 3 ? [paint[2], paint[3], paint[4]].reduce((a, b) => (lum8(b) > lum8(a) ? b : a)) : hairTone;
      const cols = [lin(wood[2]), lin(wood[3]), lin(paint[2]), lin(paint[3]), lin(paint[4]), lin(beadTone), lin(back[2])];
      const uni = new Float32Array(24), owner = {};
      const G = program(gl, B);
      const frame = time => {
        if (legend === 2) frameFor(lid);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, S, S);
        for (const cap of [gl.DEPTH_TEST, gl.BLEND, gl.CULL_FACE, gl.SCISSOR_TEST]) gl.disable(cap);
        gl.useProgram(G.pr);
        gl.bindVertexArray(B.vao);
        skinFor(gl, B, owner, skin);
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, B.det); gl.bindSampler(1, null); gl.activeTexture(gl.TEXTURE0);
        const blink = (time + blinkAt) % 5.1 < 0.15 ? 1 : 0;
        const flicker = flame > 0.02 ? 0.5 * Math.sin(time * 11.3) + 0.3 * Math.sin(time * 17.9 + 1.3) + 0.2 * Math.sin(time * 5.1) : 0;
        uni.set([S, 0.38 * Math.sin(time * 0.35 + ph) + turn + twirl, time, rock,
          body[2], topper[2], eyes[2], outfit[2],
          hair[2], blink, R, mouth[2],
          hw, hh, collar[2], wear[2],
          camY, focal, flame * (1 + 0.06 * flicker), cheeks,
          wallPat, flicker, glance, woodFigure]);
        gl.uniform4fv(G.u.P, uni);
        gl.uniform3fv(G.u.wLo, cols[0]);
        gl.uniform3fv(G.u.wHi, cols[1]);
        gl.uniform3fv(G.u.pA, cols[2]);
        gl.uniform3fv(G.u.pB, cols[3]);
        gl.uniform3fv(G.u.pC, cols[4]);
        gl.uniform3fv(G.u.hairC, cols[5]);
        gl.uniform3fv(G.u.wallC, cols[6]);
        gl.uniform1i(G.u.skin, 0); gl.uniform1i(G.u.det, 1);
        gl.uniform4f(G.u.X, figure[2], legend, ptr[0], ptr[1]);
        gl.uniform4f(G.u.Y, lid, legend === 1 ? burnish : torch, lamp, charge);
        gl.uniform4f(G.u.K, keyX, keyY, keyTurn * 2.0, hasKey);
        gl.uniform1f(G.u.lodB, lodBase);
        gl.uniform1i(G.u.marchN, 100);
        gl.uniform1i(G.u.ssN, S <= 420 ? 4 : 1);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
        gl.bindVertexArray(null); // leave the shared context tidy
      };
      frame(0);
      return (t, dt) => { handle(dt || 1 / 24); frame(t); };
    },
  });
})();

})(window.Proto);
