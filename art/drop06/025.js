// Sleeper Train: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/025.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(kt){kt&&function(){"use strict";const St=new WeakMap,c0=(e,t,r)=>e<t?t:e>r?r:e,$t=(e,t,r)=>e+(t-e)*r,Qt=.375,te=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,S0=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uN;
#define GX0 0.165
#define GX1 0.835
#define GY0 0.115
#define GY1 0.600
#define YH 0.375
#define EYE 2.8
#define LB vec3(0.29, 0.553, 0.15)
#define TEA vec4(0.63, 0.7225, 0.0292, 0.0131)
float sdBox(vec2 p, vec2 c, vec2 h, float r) { vec2 d = abs(p - c) - h + r; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r; }
float sdGlass(vec2 p) { return sdBox(p, vec2(0.5 * (GX0 + GX1), 0.5 * (GY0 + GY1)), vec2(0.5 * (GX1 - GX0), 0.5 * (GY1 - GY0)), 0.03); }
// the pane sits back in the frame: seen from the seat, its opening is the front edge drawn in toward the eye point
#define RVK 0.95
float sdPane(vec2 p) { return sdGlass(vec2(0.5, YH) + (p - vec2(0.5, YH)) / RVK) * RVK; }
float hsh(float n) { return fract(sin(n * 12.9898 + 4.1414) * 43758.5453); }
float hsh2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float N1(vec2 p) { return textureLod(uN, p, 0.0).r; }
// the lamp: light leaves the open bottom of the shade strongly, the top less, the sides only through the fabric
vec3 lampAt(vec3 P, vec3 n, vec3 shade, float green) {
  vec3 d = LB - P; float r2 = dot(d, d) + 0.003; vec3 l = d * inversesqrt(r2);
  float up = smoothstep(0.74, 0.92, l.y), dn = smoothstep(0.3, 0.72, -l.y);
  vec3 c = vec3(1.0, 0.8, 0.56) * (1.4 * up * (1.0 - green * 0.6) + 2.6 * dn) + shade * (0.55 - 0.45 * green) * (1.0 - max(up, dn));
  return c * max(dot(n, l), 0.0) * 0.03 / r2;
}
`,Et=`float hwT(float tv) { return mix(0.30, 0.40, tv); }
// the table top, its corners rounded (about .012 at the near edge, .008 at the far)
float tabD(vec2 p) {
  float tv = clamp((p.y - 0.643) / 0.222, 0.0, 1.0), r = mix(0.008, 0.012, tv);
  vec2 tq = vec2((abs(p.x - 0.5) - hwT(tv)) * 0.912, max(0.643 - p.y, p.y - 0.865)) + r;
  return length(max(tq, 0.0)) + min(max(tq.x, tq.y), 0.0) - r;
}
`,ee=S0+Et+`
uniform int uMode, uSty, uL2;
uniform vec3 uShade, uCurt, uWall, uWood, uMetal;
uniform float uPx, uGreen, uSd;
vec3 gAlb; vec3 gN; vec3 gP; vec3 gEm; float gSpec; float gAO; float gGl = 0.0; float gCov = 0.0;
float cv(float d) { return clamp(0.5 - d / uPx, 0.0, 1.0); }
void surf(vec3 alb, vec3 P, vec3 n, float spec) { gAlb = alb; gP = P; gN = n; gSpec = spec; gEm = vec3(0.0); }
void lay(float a, vec3 alb, vec3 P, vec3 n, float spec, vec3 em) {
  gGl *= 1.0 - a; gCov += (1.0 - gCov) * a;
  gAlb = mix(gAlb, alb, a); gP = mix(gP, P, a); gN = mix(gN, n, a); gSpec = mix(gSpec, spec, a); gEm = mix(gEm, em, a);
}
float sq(float x) { return x * x; }
// the shade (screen space): returns coverage, fills local coords. Seen from the same eye as the table (circles on it
// at .45), the rims of a shade standing higher are ovals of about .3: the lower one's front arc is its foot, the top
// one's back arc its head
float shadeCov(vec2 p, float soft, out vec2 q) {
  float t = (p.y - 0.488) / 0.112; float hw = mix(0.036, 0.07, clamp(t, 0.0, 1.0));
  q = vec2((p.x - LB.x) / hw, t);
  float bot = 0.6 + 0.021 * sqrt(max(0.0, 1.0 - q.x * q.x)), top = 0.488 - 0.011 * sqrt(max(0.0, 1.0 - sq((p.x - LB.x) / 0.036)));
  float d = max(max(abs(p.x - LB.x) - hw, p.y - bot), top - p.y);
  return clamp(0.5 - d / soft, 0.0, 1.0);
}
void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y);
  float nB = textureLod(uN, p * 9.0 + uSd, 0.0).g;
  gAO = 1.0;
  // ---- wall: veneered panels held in solid framing, mirrored about the window's middle (u): a cornice where the wall
  // turns into the roof, a frieze panel over the window, a moulded waist rail at sill height and a framed dado panel
  // under it at each side. Mouldings are normals only, so the lamp gives each a lit side and a dark side that fade
  // with distance. Wood and brass: full bevels, a slow book-matched figure; the couchette: flat laminate.
  float u = abs(p.x - 0.5), sx = p.x < 0.5 ? -1.0 : 1.0, bvw = uSty == 1 ? 0.0 : 1.0;
  bool hi = p.y < 0.35;
  vec2 fc = hi ? vec2(0.0, 0.0675) : vec2(0.426, 0.731), fh = hi ? vec2(0.302, 0.0135) : vec2(0.046, 0.059);
  vec2 fq = vec2(u, p.y) - fc, fd = abs(fq) - fh;
  float df = max(fd.x, fd.y);
  vec2 fg = fd.x > fd.y ? vec2(sign(fq.x), 0.0) : vec2(0.0, sign(fq.y));
  // the figure: broad slow flames, book-matched about the panel's middle; one read for every style
  // the framing round it a straight grain along each member (the stiles upright, the rails level)
  bool fld = df < 0.0, stl = !hi && !fld && p.y > 0.645 && fd.x > fd.y;
  vec2 fcq = fld ? vec2(abs(fq.x) * (hi ? 1.6 : 7.0), p.y * (hi ? 9.0 : 1.3)) : stl ? vec2(u * 40.0, p.y * 1.2) : vec2(p.y * 40.0, u * 1.2);
  vec4 fn4 = textureLod(uN, fcq + uSd, 0.0);
  float fig = fn4.g + 0.5 * fn4.b, wk = uSty == 0 ? 0.45 : 1.0;
  vec3 wall = uWall * mix(0.95 + 0.06 * nB, (0.72 + 0.42 * fig) * wk * (fld ? 0.92 : 1.0), bvw);
  float wsp = uSty == 0 ? 0.35 : uSty == 1 ? 0.15 : 0.6;
  vec2 wn = vec2(0.0); float wsh = 1.0;
  // the bevel round the sunk field (faces the field's middle) and the frame's shade on the field's upper and inner edges
  float bvl = 0.006 * bvw, inb = step(0.0, df) * step(df, bvl);
  wn -= fg * 0.55 * inb;
  wsh *= 1.0 - 0.3 * bvw * step(df, 0.0) * smoothstep(-0.006, 0.0, df) * clamp(-fg.x - fg.y, 0.0, 1.0);
  wsh *= 1.0 - 0.25 * (1.0 - bvw) * smoothstep(0.0012, 0.0, abs(df)) * (hi ? 0.0 : 1.0);   // laminate: a hairline joint
  // the waist rail: its face turns from up at the top arris to down at the underside; a shade under it
  float wr = (p.y - 0.615) / 0.03;
  if (wr > 0.0 && wr < 1.0) { wn = vec2(0.0, mix(-0.7, 0.8, wr) * bvw + 0.1); wall = uWall * wk * (0.8 + 0.25 * fig); if (uSty == 1 && abs(wr - 0.5) < 0.05) wall = vec3(0.5, 0.51, 0.53); }
  wsh *= 1.0 - 0.45 * smoothstep(0.009, 0.0, p.y - 0.645) * step(0.645, p.y);
  // the cornice: a flat fascia, a cove turning down, a dark fillet; a shade on the wall under it
  float cn = p.y / 0.028;
  if (cn < 1.0) { wn = vec2(0.0, (0.15 + 0.75 * smoothstep(0.35, 0.9, cn)) * mix(0.4, 1.0, bvw)); wall = uWall * wk * (0.85 + 0.2 * fn4.r); wsh *= 1.0 - 0.6 * smoothstep(0.9, 1.0, cn); }
  wsh *= 1.0 - 0.35 * smoothstep(0.007, 0.0, p.y - 0.028) * step(0.028, p.y);
  if (uSty == 2) wall = mix(wall, uMetal * 0.6, smoothstep(0.0012, 0.0004, abs(df - bvl - 0.001)));   // a brass bead round each field
  vec3 wN = normalize(vec3(wn.x * sx, wn.y, 1.0)), wP = vec3(p, 0.0), wE = vec3(0.0); float bnc = 1.0;
  // ---- the ends of the two berths, meeting the window wall at each side of the table about .12 under its top; their
  // inner edges run to the table's vanishing point (x .5, y -.023). One mirrored shape: an upholstered top with a
  // front roll and a line of piping, two seams across, the front face below the roll; under the table between them
  // the table's shadow on the wall. The lamp's light falls past the table's left edge onto the left berth; the
  // table's own shadow lies across it beside the table, and the right one is wholly in that shadow.
  if (p.y > 0.82 && (u > 0.338 || p.y > 0.889)) {
    float ex = 0.401 * (p.y + 0.023), bt = ex - u, rw = 0.0105 * ex / 0.338, top = step(bt, 0.0), rq = clamp(-bt / rw, 0.0, 1.0);
    rq = rq * (2.0 - rq);
    float sm = min(abs(p.y - 0.856), abs(p.y - 0.932)), bx = 0.5 + (p.x - 0.5) * 0.338 / ex;
    float cl = dot(uCurt, vec3(0.2126, 0.7152, 0.0722));
    vec3 ba = mix(vec3(cl), uCurt, 0.72) * 0.055 / clamp(cl, 0.025, 0.25);
    ba *= top > 0.5 ? (1.0 - 0.35 * smoothstep(0.0016, 0.0004, abs(bt + rw))) * (1.0 - 0.35 * smoothstep(0.0012, 0.0, sm)) : 0.7 * (1.0 - 0.6 * smoothstep(0.012, 0.0, u - 0.338));
    ba *= (1.0 - 0.7 * smoothstep(0.016, 0.0, p.y - 0.82)) * (0.9 + 0.2 * nB);
    // the table's shadow: where the line from the bulb to the point passes under the table top
    wE = ba * vec3(0.05, 0.035, 0.025) * (1.2 - 0.6 * rq + 1.6 * top * exp(-sq((rq - 0.45) / 0.22)));
    ba *= 1.0 - 0.92 * smoothstep(0.346, 0.338, abs(LB.x + 0.182 / (0.247 + 0.04 * (1.0 - top)) * (bx - LB.x) - 0.5));
    wall = ba; wsh = 1.0; wsp = 0.15; bnc = 0.0;
    wP = vec3(bx, 0.86, (p.y - 0.82) * 1.6);
    wN = normalize(top > 0.5 ? vec3(-sx * (1.0 - rq) * 1.3, -0.15 - rq, 0.15) : vec3(-sx, 0.15, 0.35));
    if (u < 0.338) { wall = vec3(0.0); wE = vec3(0.0085, 0.003, 0.0015) * (0.4 + 0.6 * smoothstep(0.889, 0.99, p.y)); }
  }
  surf(wall * wsh, wP, wN, wsp); gEm = wE;
  // the table's lipped edge, round at the corners: a thin lit arris along its top, bright under the lamp and fading to
  // the right, the face below it falling darker downward
  {
    float tt = tabD(p), tds = tabD(p - vec2(0.0, 0.024)), te = max(tds, -tt), fy = 1.0 - clamp(-tds / 0.024, 0.0, 1.0);
    vec3 ea = (uSty == 2 ? uMetal : uSty == 1 ? vec3(0.2) : uWood * 0.65) * (1.0 - 0.45 * fy);
    float tar = smoothstep(0.0028, 0.0014, tt);
    bnc = mix(bnc, 0.2, cv(te));
    lay(cv(te), ea, vec3(p.x, 0.75, 0.34), normalize(mix(vec3(0.0, -0.2 + 0.7 * fy, 1.0), vec3(0.0, -0.93, 0.36), tar)), mix(uSty == 2 ? 2.0 : 0.6, 1.5, tar), ea * vec3(1.0, 0.7, 0.45) * 0.07 * (1.0 - fy) * (1.0 - tar));
  }
  // ---- window frame
  float g = sdGlass(p);
  float fw = uSty == 1 ? 0.03 : 0.026;
  // the frame stands proud of the wall and the lamp is below it and to the left: its shade lies on the wall above the
  // top member and beside the right one only
  vec2 gq = abs(p - vec2(0.5, 0.3575)) - vec2(0.335, 0.2425), gd = gq.x > gq.y ? vec2(sx, 0.0) : vec2(0.0, sign(p.y - 0.3575));
  gAlb *= 1.0 - 0.5 * smoothstep(fw + 0.02, fw, g) * smoothstep(-0.2, 0.7, dot(gd, vec2(0.55, -0.83)));
  if (g < fw + 0.004) {
    vec2 e = vec2(0.002, 0.0);
    vec2 gr = normalize(vec2(sdGlass(p + e.xy) - sdGlass(p - e.xy), sdGlass(p + e.yx) - sdGlass(p - e.yx)) + 1e-5);
    float bev = 1.0 - smoothstep(0.0, fw, g);
    vec3 fn = normalize(vec3(-gr * (0.2 + 1.3 * bev * bev), 1.0));
    // the grain runs along each of the four members, and a dark joint line at each mitred corner
    vec2 gs = gq.x > gq.y ? p.yx : p.xy;
    vec3 fa = uSty == 0 ? uWood * 0.8 * (0.8 + 0.4 * textureLod(uN, vec2(gs.x * 2.0, gs.y * 30.0), 0.0).g) : uSty == 1 ? vec3(0.09, 0.09, 0.095) : uMetal;
    if (uSty == 1 && g > 0.012) fa = vec3(0.5, 0.51, 0.52);
    fa *= 1.0 - 0.6 * bvw * cv(abs(gq.x - gq.y) * 0.7071 - 0.0004) * step(-0.03, min(gq.x, gq.y)) * step(0.0, g);
    lay(cv(g - fw), fa, vec3(p, 0.01), fn, uSty == 2 ? 1.6 : 0.5, vec3(0.0));
    // the reveal: the frame's inner faces running back to the pane (the lower one is the sill, the lamp side lit),
    // darker into the corner where they meet the glass, and a dark rubber seal round the pane
    float gp = sdPane(p), rv = cv(g) * (1.0 - cv(gp));
    if (rv > 0.0) {
      float dep = clamp(-g / max(-g + gp, 1e-4), 0.0, 1.0);
      vec3 rn = normalize(vec3(-gr, 0.25 - 0.2 * dep));
      vec3 ra = (uSty == 0 ? uWood * (0.85 + 0.3 * textureLod(uN, vec2(p.x * 3.0 + p.y * 3.0, dep * 0.3) + uSd, 0.0).g) : uSty == 1 ? vec3(0.42, 0.43, 0.44) : uWood * 0.9) * (1.0 - 0.45 * dep);
      ra = mix(ra, vec3(0.012), smoothstep(0.75, 0.9, dep));
      lay(rv, ra, vec3(p, 0.01 - 0.05 * dep), rn, uSty == 2 ? 1.2 : 0.5, vec3(0.0));
    }
  }
  // blind housing
  float hb = sdBox(p, vec2(0.5, 0.104), vec2(0.345, 0.012), 0.004);
  lay(cv(hb), uSty == 1 ? vec3(0.45) : uSty == 0 ? uWood * 0.7 : uWall * 0.9, vec3(p, 0.02), normalize(vec3(0.0, (p.y - 0.104) * 60.0, 1.0)), 0.4, vec3(0.0));
  gGl = cv(sdPane(p));
  // ---- curtains
  float ct = 0.044, cb = 0.7;
  float inL = 0.146 + 0.008 * textureLod(uN, vec2(0.1, p.y * 0.6) + uSd, 0.0).r + 0.014 * smoothstep(0.3, 0.7, p.y);
  float inR = 0.854 - 0.008 * textureLod(uN, vec2(0.6, p.y * 0.6) + uSd, 0.0).r - 0.014 * smoothstep(0.3, 0.7, p.y);
  float side = p.x < 0.5 ? 1.0 : 0.0;
  float dC = side > 0.5 ? p.x - inL : inR - p.x;
  if (dC < 0.004 && p.y > ct - 0.004 && p.y < cb + 0.01) {
    float fx = side > 0.5 ? (inL - p.x) : (p.x - inR);
    // gathered at the rail: many narrow folds at the top opening into few, wide, deep ones toward the hem; the widths
    // from the piece's noise, so no two neighbours match
    float yb = clamp((p.y - ct) / (cb - ct), 0.0, 1.0);
    float fs = fx / mix(0.014, 0.026, sqrt(yb)) + side * 3.1;
    float ph = 6.2832 * (fs + 0.9 * textureLod(uN, vec2(fs * 0.045, 0.3 + side * 0.4) + uSd, 0.0).r + 0.18 * sin(fs * 0.7 + side));
    float sl = cos(ph) * (0.3 + 0.45 * yb + 0.25 * smoothstep(0.02, 0.0, p.y - ct));
    vec3 cn = normalize(vec3(sl, 0.0, 1.0));
    vec3 ca = uCurt;
    ca *= 0.86 + 0.16 * smoothstep(-1.0, 1.0, sin(ph - 0.9)) - 0.1 * yb * smoothstep(0.3, -0.9, cos(ph));
    if (uSty == 2) ca *= 0.88 + 0.24 * smoothstep(0.45, 0.75, textureLod(uN, vec2(fx * 6.0, p.y * 4.0), 0.0).a);
    // a straight hem with a stitched band
    float hem = cb;
    float a = cv(dC) * cv(ct - p.y) * cv(p.y - hem);
    ca *= 1.0 - 0.3 * smoothstep(0.013, 0.011, hem - p.y) * smoothstep(0.0, 0.002, hem - p.y);
    lay(a, ca, vec3(p, 0.035), cn, uSty == 1 ? 0.1 : 0.45, vec3(0.0));
    gAO *= mix(1.0, 0.75 + 0.25 * (0.5 + 0.5 * sl), a);
  }
  // shadow beside curtain on wall/glass edge
  gAO *= 1.0 - 0.3 * smoothstep(0.03, 0.0, max(dC, 0.0)) * step(0.004, dC) * step(ct, p.y);
  // ---- the curtain rod: a 12 mm tube standing off the wall on two brackets, a cap at each end short of the wall's
  // edge; one narrow highlight on its lower side, bright only near the lamp; its shade on the wall above it (the light
  // comes from below)
  {
    gAlb *= 1.0 - 0.45 * smoothstep(0.009, 0.0, 0.038 - p.y) * step(p.y, 0.038) * step(u, 0.465);
    float br = sdBox(vec2(u, p.y), vec2(0.425, 0.041), vec2(0.0055, 0.0085), 0.003);
    gAlb *= 1.0 - 0.4 * smoothstep(0.004, 0.0, br) * step(0.0, br);
    vec3 rm = uSty == 1 ? vec3(0.4, 0.41, 0.42) : uMetal;
    lay(cv(br), rm * 0.45, vec3(p, 0.03), normalize(vec3(0.0, 0.0, 1.0)), 0.3, vec3(0.0));
    float ry = clamp((p.y - 0.041) / 0.003, -1.0, 1.0);
    float rd = max(abs(p.y - 0.041) - 0.003, u - 0.461), cap = sdBox(vec2(u, p.y), vec2(0.4625, 0.041), vec2(0.0035, 0.0048), 0.0018);
    float hl = exp(-sq((ry - 0.45) / 0.2)) * smoothstep(0.56, 0.0, abs(p.x - LB.x)) * (1.0 - 0.6 * uGreen);
    lay(cv(min(rd, cap)), rm * 0.4, vec3(p, 0.04), normalize(vec3(0.0, ry * 0.9, sqrt(1.0 - 0.81 * ry * ry))), 0.3, vec3(1.0, 0.8, 0.56) * rm * 0.9 * hl * step(rd, cap));
  }
  // (the coat hook went: on the curtain at this size it read as a pin, then as a switch plate)
  // ---- light
  vec3 col; float acc = 0.0;
  gN = normalize(gN);
  if (uMode == 0) {
    vec3 L = lampAt(gP, gN, uShade, uGreen);
    vec3 d = normalize(LB - gP), h = normalize(d + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(gN, h), 0.0), 18.0 + gSpec * 30.0) * gSpec * 0.5;
    // light thrown back up by the lit table: the panelling and the curtains are dim and warm, not black
    vec2 bq = p - vec2(0.44, 0.72);
    L += vec3(1.0, 0.68, 0.4) * (0.4 + 0.6 * uShade) * 0.05 / (1.0 + dot(bq, bq) * 7.0) * (0.75 + 0.25 * gN.y) * bnc;
    col = (gAlb * L + spec * L * 2.0) * gAO + gEm;
    // halation around the glowing shade
    vec2 q; float sh = shadeCov(p, 0.05, q);
    col += uShade * (0.05 * exp(-length((p - vec2(LB.x, 0.545)) * vec2(1.0, 1.3)) * 11.0) + 0.06 * sh) * (1.0 - uGreen * 0.7);
  } else {
    float dg = max(g, 0.0);
    float face = clamp(0.6 + 0.6 * gN.z * 0.3 - gN.y * 0.6, 0.0, 1.2);
    col = gAlb * gAO * (vec3(0.025, 0.035, 0.06) * (0.2 + 0.8 * exp(-dg * 9.0)) * face + vec3(0.006, 0.005, 0.004));
    acc = (0.25 + 0.75 * exp(-dg * 4.0)) * face * gAO * 0.5;
  }
  // ---- the glass and its reflection of the lit compartment
  float ga = gGl;
  if (ga > 0.0) {
    vec3 r = vec3(0.0);
    if (uMode == 0) {
      vec2 im = vec2(0.5, 0.45) + (p - vec2(0.5, 0.45)) / 0.62;
      // the lamp mirrored in the pane, and a fainter second image from the outer pane (one call site)
      vec3 gh = uShade * (1.0 - uGreen * 0.6);
      for (int i = 0; i < uL2; i++) {
        float fi = float(i); vec2 q;
        float sc = shadeCov(im + vec2(-0.03, 0.012) * fi, 0.012 + 0.008 * fi, q);
        r += gh * sc * (0.35 + 0.75 * q.y) * mix((1.0 - 0.4 * q.x * q.x) * 0.05, 0.016, fi);
      }
      r += uShade * 0.014 * exp(-length(im - vec2(LB.x, 0.56)) * 9.0);
      float tb = smoothstep(0.6, 0.53, p.y) * smoothstep(0.42, 0.55, p.y);
      r += uWood * 0.25 * tb * exp(-abs(im.x - LB.x) * 4.0) * 0.12;
      // dust and dried streaks on the glass catch the lamp near it, and hardly at all across the pane
      float gr = 0.35 + 0.9 * textureLod(uN, vec2(p.x * 7.0 + p.y * 1.3, p.y * 0.5) + uSd, 0.0).g * textureLod(uN, p * vec2(23.0, 5.0), 0.0).b;
      r += vec3(0.010, 0.008, 0.006) * gr * (0.22 + 1.5 * exp(-length(p - vec2(LB.x, 0.56)) * 5.0)) * smoothstep(0.12, 0.5, p.y);
    }
    col = mix(col, r, ga);
    acc *= 1.0 - ga;
  }
  o = vec4(sqrt(max(col, 0.0) / 4.0), uMode == 0 ? ga : acc);
}`,oe=S0+Et+`
uniform int uMode, uSty;
uniform vec3 uShade, uCurt, uWall, uWood, uMetal;
uniform float uPx, uGreen, uSd;
vec3 gAlb; vec3 gN; vec3 gP; vec3 gEm; float gSpec; float gAO; float gGl = 0.0; float gCov = 0.0;
float cv(float d) { return clamp(0.5 - d / uPx, 0.0, 1.0); }
void surf(vec3 alb, vec3 P, vec3 n, float spec) { gAlb = alb; gP = P; gN = n; gSpec = spec; gEm = vec3(0.0); }
void lay(float a, vec3 alb, vec3 P, vec3 n, float spec, vec3 em) {
  gGl *= 1.0 - a; gCov += (1.0 - gCov) * a;
  gAlb = mix(gAlb, alb, a); gP = mix(gP, P, a); gN = mix(gN, n, a); gSpec = mix(gSpec, spec, a); gEm = mix(gEm, em, a);
}
float sq(float x) { return x * x; }
// the shade (screen space): returns coverage, fills local coords. Seen from the same eye as the table (circles on it
// at .45), the rims of a shade standing higher are ovals of about .3: the lower one's front arc is its foot, the top
// one's back arc its head
float shadeCov(vec2 p, float soft, out vec2 q) {
  float t = (p.y - 0.488) / 0.112; float hw = mix(0.036, 0.07, clamp(t, 0.0, 1.0));
  q = vec2((p.x - LB.x) / hw, t);
  float bot = 0.6 + 0.021 * sqrt(max(0.0, 1.0 - q.x * q.x)), top = 0.488 - 0.011 * sqrt(max(0.0, 1.0 - sq((p.x - LB.x) / 0.036)));
  float d = max(max(abs(p.x - LB.x) - hw, p.y - bot), top - p.y);
  return clamp(0.5 - d / soft, 0.0, 1.0);
}
void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y);
  gAO = 1.0;
  gAlb = vec3(0.0); gN = vec3(0.0, 0.0, 1.0); gP = vec3(p, 0.1); gEm = vec3(0.0); gSpec = 0.0;
  float g = sdGlass(p);
  // ---- the frame's lower member, its front edge (the sill proper is the reveal's lit lower face), no wider than the window
  float sl = sdBox(p, vec2(0.5, 0.623), vec2(0.335, 0.019), 0.004);
  vec3 sa = (uSty == 1 ? vec3(0.33, 0.33, 0.34) : uSty == 0 ? uWood * 0.85 : uWood * 0.8) * (1.0 - 0.35 * smoothstep(0.628, 0.642, p.y));
  float arr = smoothstep(0.0035, 0.0, p.y - 0.604);   // the arris where it turns into the reveal catches the lamp
  lay(cv(sl), sa, vec3(p.x, 0.62, 0.02), normalize(vec3(0.0, -0.12 - 0.6 * arr, 1.0)), 0.5, vec3(0.0));
  // ---- table top (fold-down, in perspective), its corners rounded
  float tv = (p.y - 0.643) / 0.222;
  float thw = hwT(clamp(tv, 0.0, 1.0));
  float tt = tabD(p);
  float tz = 0.02 + 0.32 * clamp(tv, 0.0, 1.0);
  vec3 TP = vec3(0.5 + (p.x - 0.5) * hwT(0.42) / thw, 0.735, tz);
  if (tt < 0.004) {
    vec2 tc = vec2(TP.x, tz);
    vec3 ta = uSty == 1 ? vec3(0.075, 0.08, 0.09) * (0.94 + 0.08 * textureLod(uN, tc * 60.0, 0.0).b) : uWood * (0.7 + 0.6 * textureLod(uN, vec2(tc.x * 3.0, tc.y * 40.0) + uSd, 0.0).g) * (0.9 + 0.2 * textureLod(uN, vec2(tc.x * 25.0, tc.y * 200.0), 0.0).b);
    lay(cv(tt), ta, TP, vec3(0.0, -1.0, 0.12), uSty == 2 ? 2.2 : uSty == 0 ? 0.9 : 0.4, vec3(0.0));
    // cup shadow cast by the bulb across the table
    vec2 L2 = vec2(LB.x, LB.z), C2 = uSty == 0 ? vec2(0.620, 0.255) : vec2(0.624, 0.215), dq = tc - L2, dc = C2 - L2;
    float dl = length(dq), dcl = length(dc);
    float along = dot(dq, dc) / dcl, lat = abs(dq.x * dc.y - dq.y * dc.x) / dcl;
    float rr = (uSty == 0 ? 0.024 : 0.028) * along / dcl;
    float sh = smoothstep(rr + 0.012, rr - 0.004, lat) * smoothstep(dcl - 0.01, dcl + 0.01, along) * smoothstep(dcl * 1.9, dcl * 1.3, along);
    // the lamp foot and cup contact
    sh = max(sh, 0.7 * smoothstep(0.075, 0.03, length((tc - L2) * vec2(1.0, 2.2))));
    sh = max(sh, 0.6 * smoothstep(0.07, 0.03, length((tc - C2) * vec2(1.0, 2.0))));
    gAO *= 1.0 - 0.85 * sh * cv(tt);
    gAO *= 1.0 - 0.4 * smoothstep(0.03, 0.0, tv) * cv(tt);
    // the lamp's light through the tea glass lands on the table as a small amber crescent beyond its foot
    if (uSty == 0) { vec2 kq = (p - vec2(0.661, 0.805)) / vec2(0.0075, 0.0032); gEm += vec3(1.0, 0.45, 0.12) * 0.07 * exp(-dot(kq, kq)) * smoothstep(1.0, 1.25, length((p - vec2(0.63, 0.7978)) / vec2(0.025, 0.01125))) * cv(tt); }
  }
  // ---- lamp: foot, stem, shade
  {
    // a weighted, stepped metal foot and a turned stem; polished metal shows the lit table and shade, so it carries
    // its own warm streaks (a rod lit only from straight above is black)
    vec3 la = uSty == 1 ? vec3(0.55, 0.56, 0.58) : uMetal;
    vec3 wl = vec3(1.0, 0.74, 0.46) * la;
    // the foot, a disc on the table seen at the table's .45: dark polished metal giving back the table's colour, one hot
    // streak where it faces the shade, and a thin lit bevel along its front edge
    vec2 fq = (p - vec2(LB.x, 0.735)) / vec2(0.036, 0.0162);
    float foot = length(fq) - 1.0;
    float rimF = smoothstep(0.22, 0.0, abs(foot + 0.1)) * smoothstep(-0.2, 0.7, fq.y);
    float stk = exp(-sq((fq.x + 0.38 + 0.25 * fq.y) / 0.13)) * smoothstep(1.0, 0.2, abs(fq.y + 0.1));
    lay(cv(foot * 0.0162), la * 0.03, vec3(p.x, 0.735, 0.16), normalize(vec3(fq.x * 0.3, -0.75, 0.6)), 0.0, wl * (0.004 + 0.025 * rimF + 0.9 * stk) + uWood * 0.03);
    vec2 dq2 = (p - vec2(LB.x, 0.731)) / vec2(0.021, 0.013);
    float dome = max(length(dq2) - 1.0, p.y - 0.731);
    lay(cv(dome * 0.013), la * 0.08, vec3(p.x, p.y, 0.16), normalize(vec3(dq2.x, -0.8, 0.6)), 0.3, wl * (0.02 + 0.35 * exp(-dot(dq2 + vec2(0.35, 0.55), dq2 + vec2(0.35, 0.55)) * 7.0)));
    float sy = (p.y - 0.6) / 0.122;
    float sw = 0.0034 + 0.0042 * exp(-sq((sy - 0.74) / 0.13)) + 0.0022 * exp(-sq((sy - 0.2) / 0.035)) + 0.002 * smoothstep(0.9, 1.0, sy);
    float stem = max(abs(p.x - LB.x) - sw, max(0.6 - p.y, p.y - 0.722));
    float snx = (p.x - LB.x) / sw;
    lay(cv(stem), la * 0.8, vec3(p.x, p.y, 0.16), normalize(vec3(snx, 0.0, 0.6)), 2.5, wl * (0.02 + 0.26 * exp(-sq((snx + 0.35) / 0.22)) + 0.06 * exp(-sq((snx - 0.6) / 0.2))) * (0.5 + 0.5 * smoothstep(0.0, 0.25, sy)));
    vec2 q; float sc = shadeCov(p, uPx, q);
    if (sc > 0.0) {
      // cloth lit from inside: brightest where the bulb sits behind it, pleats bunching towards the silhouette,
      // a weave, and an opaque trim band top and bottom
      float qa = asin(clamp(q.x, -1.0, 1.0)), plA = (1.0 - uGreen) * smoothstep(0.6, 0.75, uShade.g);
      float wv = textureLod(uN, vec2(qa * 0.9, q.y * 0.35) + uSd, 0.0).b;
      float pl = mix(0.94 + 0.12 * wv, 0.86 + 0.1 * cos(qa * 17.0 + 0.7 * sin(q.y * 2.2)) + 0.08 * wv, plA);
      // a cone of cloth: brightest in a soft band at the bulb's height, darker toward the top and toward both edges
      // (seen more obliquely there), a thin dark rim top and bottom; no bright disc
      // ts runs down the cloth from the top rim's front arc to the bottom rim's; a faint seam at one side
      float ox = (p.x - LB.x) / 0.036, tf = 0.488 + 0.011 * sqrt(max(0.0, 1.0 - ox * ox)), bf = 0.6 + 0.021 * sqrt(max(0.0, 1.0 - q.x * q.x));
      float ts = (p.y - tf) / (bf - tf);
      float band = exp(-(ts - 0.6) * (ts - 0.6) * 6.0);
      float glow = (0.1 + 0.1 * ts + 0.8 * band) * (1.0 - 0.8 * q.x * q.x) * pl * (1.0 - 0.18 * exp(-sq((qa - 0.55) / 0.035)));
      float trim = max(smoothstep(0.05, 0.025, ts), smoothstep(0.95, 0.975, ts));
      glow *= 1.0 - 0.75 * trim;
      vec3 em = uShade * uShade * glow * (0.85 - uGreen * 0.6);
      // the open top: the inside of the far wall, lit by the bulb, and the wire ring round it
      float od = length(vec2(ox, (p.y - 0.488) / 0.011)) - 1.0, op = clamp(0.5 - od * 0.011 / uPx, 0.0, 1.0);
      em = mix(em, uShade * (1.0 - 0.6 * uGreen) * (0.75 + 0.5 * smoothstep(0.488, 0.478, p.y)), op);
      em *= 1.0 - 0.55 * clamp(1.0 - abs(od) * 0.011 / (1.2 * uPx), 0.0, 1.0);
      vec3 sn = normalize(vec3(q.x, -0.35, sqrt(max(0.0, 1.0 - q.x * q.x))));
      lay(sc, uGreen > 0.5 ? vec3(0.01, 0.07, 0.025) : uShade * 0.3, vec3(p.x, p.y, 0.2), sn, uGreen > 0.5 ? 3.0 : 0.1, em);
    }
  }
  // ---- the cup (a plain tea glass, a paper cup, or porcelain with a gold rim), seen from the table's eye: every circle
  // on it an oval of .45, so the mouth shows the far inner wall and the tea; yc undoes the cylinder's curve, so the
  // tea's level runs round it
  if (abs(p.x - 0.64) < 0.08 && p.y > 0.64 && p.y < 0.835) {
    float paper = uSty == 1 ? 1.0 : 0.0, gold = uSty == 2 ? 1.0 : 0.0, tall = uSty == 0 ? 1.0 : 0.0;
    float rw = mix(0.033, 0.031, paper), bw = mix(mix(0.025, 0.023, paper), 0.025, tall);
    float cx = 0.63, rimY = TEA.y - 0.0045, baseY = 0.778 + 0.031 * tall - 0.45 * bw;
    vec3 sca = uSty == 0 ? uMetal * 0.9 : vec3(0.8, 0.79, 0.75);
    float sau = length((p - vec2(cx, 0.781)) / vec2(0.064, 0.0288)) - 1.0;
    float ring = smoothstep(-0.25, 0.0, sau);
    lay(cv(sau * 0.0288) * gold, mix(sca, uMetal * 1.2, gold * smoothstep(-0.1, -0.03, sau)) * (1.0 - 0.4 * ring * step(0.781, p.y)), vec3(p.x, 0.737, 0.215), vec3((p.x - cx) * 3.0, -1.0 + ring, 0.3 + ring), 1.4, vec3(0.0));
    float tY = clamp((p.y - rimY) / (baseY - rimY), 0.0, 1.0), w = mix(rw, bw, tY) + 0.001 * tall * smoothstep(0.88, 1.0, tY);
    float ux = (p.x - cx) / rw, front = rimY + 0.45 * rw * sqrt(max(0.0, 1.0 - ux * ux));
    float ub = (p.x - cx) / bw, bot = baseY + 0.45 * bw * sqrt(max(0.0, 1.0 - ub * ub));
    float body = max(abs(p.x - cx) - w, max(rimY - p.y, p.y - bot));
    float nx = clamp((p.x - cx) / w, -1.0, 1.0), nz = sqrt(1.0 - nx * nx);
    float an = asin(nx), yc = p.y - 0.45 * w * nz, tc = (yc - rimY) / (baseY - rimY);
    // the handle: a strap as wide as a finger, its outer face lit, its edges turning dark
    vec2 hq = (p - vec2(cx + 0.036, 0.742 + 0.018 * tall)) / vec2(0.016 - 0.002 * tall, 0.021);
    float hl0 = length(hq), hw0 = 0.0058 - 0.0012 * tall, hv = (hl0 - 1.0) * 0.017 / hw0;
    float hd = max(abs(hl0 - 1.0) * 0.017 - hw0, cx + 0.028 - p.x);
    vec3 hn = normalize(vec3(hq / max(hl0, 1e-3) * hv * 0.8, 0.6));
    lay(cv(hd) * (1.0 - paper) * (1.0 - tall), (uSty == 0 ? uMetal : vec3(0.82, 0.8, 0.76)) * (1.0 - 0.6 * hv * hv), vec3(p.x, p.y, 0.23), hn, 2.0, vec3(1.0, 0.74, 0.46) * uMetal * tall * 0.12 * exp(-sq((hv + 0.2) / 0.35)) * smoothstep(-0.2, 0.6, hq.x));
    // the wooden compartment's tea glass (its holder read as a toy and went): the railway glass, tapering to a foot three
    // quarters of its mouth, a smooth band under the rim and twelve flat facets below it (each one value, stepping at
    // every arris), black tea that the lamp shines through, so the facets away from the lamp glow amber and the ones
    // toward it stay dark but for a broken warm streak; a solid clear foot, dark at the table with a lit arc
    float tea = tall * smoothstep(-0.001, 0.001, yc - TEA.y), clr = tall - tea;
    float edg = smoothstep(0.82, 0.97, abs(nx));
    float fct = tall * smoothstep(0.08, 0.1, tc), ft = tall * smoothstep(0.885, 0.905, tc);
    float fk = floor(an / 0.5236 + 0.5), aq = fk * 0.5236, ff = an / 0.5236 + 0.5 - fk;
    float nT = mix(nx, sin(aq), fct);
    float ex = smoothstep(0.5, 2.5, (w - abs(p.x - cx)) / uPx);   // the wall seen edge-on: a dark line at each side
    float dA = min(ff, 1.0 - ff) * 0.5236 * w * nz / uPx;        // px to the nearest arris
    vec3 ba = mix(vec3(0.85, 0.84, 0.8), vec3(0.78, 0.76, 0.72), paper);
    ba = mix(ba, mix(vec3(0.032, 0.012, 0.004), vec3(0.025, 0.02, 0.016), ft), tea);
    ba = mix(ba, mix(vec3(0.5, 0.45, 0.38), vec3(0.13, 0.085, 0.05), tall), clr);
    ba = mix(ba, uMetal * 1.3, gold * step(abs(p.y - front - 0.002), 0.0011));
    float sv = smoothstep(0.03, 0.14, tc) * smoothstep(0.62, 0.36, tc);
    float stk = sv * smoothstep(0.08, 0.03, abs(nx + 0.575)) * (fk < -1.5 ? mix(1.0, 0.3, fct) : 1.0);
    vec3 tg = vec3(0.55, 0.16, 0.03) * (0.015 + 0.34 * smoothstep(-0.1, 0.5, nT) * smoothstep(1.02, 0.8, nT) * (0.55 + 0.6 * smoothstep(0.1, 0.85, tc))) * ex * (1.0 - ft)
      + vec3(1.0, 0.8, 0.55) * (0.075 * stk + (0.03 * smoothstep(1.2, 0.2, dA) * fct * smoothstep(0.15, -0.35, nx) + 0.02 * edg) * (1.0 - ft) * (0.25 + 0.75 * sv))
      + vec3(1.0, 0.55, 0.18) * 0.3 * ft * exp(-sq((tc - 0.945) / 0.016)) * smoothstep(0.1, 0.75, nx);
    tg *= 1.0 - smoothstep(0.972, 0.992, tc);   // where the foot meets the table
    lay(cv(body) * (1.0 - 0.7 * clr * (1.0 - edg)), ba, vec3(cx + nx * w, p.y, 0.215 + 0.03 * nz), mix(vec3(nx, -0.05, nz), vec3(sin(aq), -0.05, cos(aq)), fct), mix(2.5, 0.2, tall), tg * (tea + 0.6 * clr));
    // the opening: the far inner wall above the tea, the tea, the rim
    float rd = length((p - vec2(cx, rimY)) / vec2(rw, 0.45 * rw)) - 1.0;
    float td = length((p - TEA.xy) / TEA.zw) - 1.0;
    float rimL = abs(rd) * 0.45 * rw - mix(0.0009, 0.0005, tall);
    vec3 oc = mix((uSty == 0 ? vec3(0.16, 0.09, 0.05) : vec3(0.8, 0.79, 0.75)) * (0.55 + 0.45 * smoothstep(rimY - 0.012, rimY + 0.004, p.y)), vec3(0.09, 0.028, 0.004), cv(td * TEA.w));
    // under the surface the spoon's shaft runs on bent toward the eye and dimmed by the tea (in the opening's colour: no
    // layer of its own)
    vec2 s0 = vec2(cx + 0.011, TEA.y - 0.004), su = vec2(-0.004, 0.008);
    float sh2 = clamp(dot(p - s0, su) / dot(su, su), 0.0, 1.0);
    oc = mix(oc, mix(uMetal * 0.5, vec3(0.3, 0.2, 0.1), paper), 0.45 * (1.0 - tall) * cv(length(p - s0 - su * sh2) - mix(0.0011, 0.002, paper)) * cv(td * TEA.w + 0.0015));
    // the glass's rim: a hairline, brightest at the near left and the far right; a spark on the near-left lip
    float rimB = max(smoothstep(-0.2, -0.8, ux) * step(rimY, p.y), smoothstep(0.2, 0.8, ux) * step(p.y, rimY));
    oc = mix(oc, gold > 0.5 ? uMetal * 1.3 : mix(vec3(0.9), vec3(0.25, 0.2, 0.16), tall), cv(rimL));
    vec3 oe = tall * (vec3(1.0, 0.62, 0.35) * 0.03 * (0.7 + 1.2 * smoothstep(-0.25, 0.0, rd)) * (1.0 - cv(td * TEA.w))
      + vec3(1.0, 0.85, 0.65) * cv(rimL) * (0.03 + 0.12 * rimB + 0.5 * smoothstep(0.07, 0.02, abs(ux + 0.6)) * step(rimY, p.y)));
    lay(cv(rd * 0.45 * rw - 0.0009), oc, vec3(p.x, 0.70, 0.215), mix(vec3(0.0, 0.5, 0.8), vec3(0.0, -1.0, 0.25), cv(td * TEA.w)), mix(1.0, 6.0, cv(td * TEA.w)), oe);
    // spoon (or a wooden stirrer) leaning in the cup: the shaft out of the tea (the tea glass has none: at its size a
    // spoon's handle read as a straw)
    vec2 sd = vec2(0.022, -0.053);
    float sh = clamp(dot(p - s0, sd) / dot(sd, sd), 0.0, 1.0);
    float sdist = length(p - s0 - sd * sh) - mix(0.0012 + 0.0011 * smoothstep(0.8, 0.97, sh), 0.0022, paper);
    lay(cv(sdist) * (1.0 - tall), mix(uMetal * 1.1, vec3(0.45, 0.33, 0.2), paper), vec3(p.x, p.y, 0.22), vec3(-0.9, -0.3, 0.6), mix(4.0, 0.3, paper), vec3(1.0, 0.74, 0.46) * uMetal * 0.09 * (1.0 - paper));
  }
  // ---- light
  vec3 col; float acc = 0.0;
  gN = normalize(gN + vec3(0.0, 0.0, 1e-4));
  if (uMode == 0) {
    vec3 L = lampAt(gP, gN, uShade, uGreen);
    vec3 d = normalize(LB - gP), h = normalize(d + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(gN, h), 0.0), 18.0 + gSpec * 30.0) * gSpec * 0.5;
    col = (gAlb * L + spec * L * 2.0) * gAO + gEm;
    // halation around the glowing shade
    vec2 q; float sh = shadeCov(p, 0.05, q);
    col += uShade * (0.05 * exp(-length((p - vec2(LB.x, 0.545)) * vec2(1.0, 1.3)) * 11.0) + 0.06 * sh) * (1.0 - uGreen * 0.7) * gCov;
  } else {
    float dg = max(g, 0.0);
    float face = clamp(0.6 + 0.6 * gN.z * 0.3 - gN.y * 0.6, 0.0, 1.2);
    col = gAlb * gAO * (vec3(0.025, 0.035, 0.06) * (0.2 + 0.8 * exp(-dg * 9.0)) * face + vec3(0.006, 0.005, 0.004));
    acc = (0.25 + 0.75 * exp(-dg * 4.0)) * face * gAO * 0.5;
  }
  o = vec4(sqrt(max(col, 0.0) / 4.0), gCov);
}`,ae=S0+`
uniform int uK, uL, uReg, uSea;
uniform vec3 uMoonL, uFogC, uAmb;
uniform float uSd, uMdir, uRows, uMist;
uniform int uL2, uL3;
float tn(float u, float f, float r) { return textureLod(uN, vec2(u * f, r), 0.0).r; }
float ridge(float u, float r, float rid) {
  // nothing finer than 17 periods: the strip cannot hold it, and a slope taken from it is noise
  float n = 0.5 * tn(u, 3.0, r) + 0.36 * tn(u, 7.0, r + 0.21) + 0.14 * tn(u, 17.0, r + 0.43);
  n = (n - 0.25) / 0.55;
  if (rid > 0.5) { float m = 1.0 - abs(tn(u, 5.0, r + 0.33) * 2.0 - 1.0); n = n * 0.55 + m * m * 0.55; }
  return clamp(n, 0.0, 1.2);
}
vec4 over(vec4 b, vec3 c, float a) { return vec4(b.rgb * (1.0 - a) + c * a, b.a + a * (1.0 - b.a)); }
void main() {
  float u = vUv.x, v = vUv.y;
  int k = uK; int reg = k == 0 ? uReg : -1;
  float snow = uSea == 0 ? 1.0 : 0.0;
  vec4 r = vec4(0.0);
  if (uL == 0) {
    // ---------------- far ranges, 3 km out, up to 1400 m
    float H = v * 1400.0, px = 1400.0 / uRows;
    float amp = 260.0, rid = 0.0, base = 0.0, lights = 0.0;
    if (reg == 0) { amp = 300.0; lights = 0.4; }
    else if (reg == 1) { amp = 90.0; }
    else if (reg == 2 || k == 2) { amp = 800.0; rid = 1.0; base = 80.0; }
    else if (reg == 3 || k == 1) { amp = 220.0; }
    else if (reg == 4) { amp = 420.0; rid = 1.0; }
    else if (k == 3) { amp = 340.0; lights = 0.5; }
    else if (k == 4) { amp = 230.0; lights = 1.0; }
    float sr = uSd * 0.37 + float(k) * 0.13;
    float e = 20.0 / 2048.0;   // the slope over 20 texels: a ridge's lit and shaded sides are broad faces
    float mk = (reg == 3 || k == 1) ? smoothstep(0.42, 0.62, tn(u, 2.0, sr + 0.5)) : 1.0;
    // the two ridgelines and their neighbours 20 texels on (for the slope), from one call site
    vec4 rr = vec4(0.0);
    for (int i = 0; i < uL2 * 2; i++) {
      float q = ridge(u + e * float(i - (i / 2) * 2), sr + 0.5 * float(i / 2), rid);
      if (i == 0) rr.x = q; else if (i == 1) rr.y = q; else if (i == 2) rr.z = q; else rr.w = q;
    }
    float hb = base + amp * rr.x * mk, hb2 = base + amp * rr.y * mk;
    float hf = amp * 0.55 * rr.z * (0.4 + 0.6 * mk), hf2 = amp * 0.55 * rr.w * (0.4 + 0.6 * mk);
    if (reg == 4) { hf *= 0.25; hf2 *= 0.25; }
    for (int i = 0; i < uL2; i++) {
      float h = i == 0 ? hb : hf, s = ((i == 0 ? hb2 : hf2) - h) / (e * 12000.0);
      float a = clamp((h - H) / px + 0.5, 0.0, 1.0);
      if (!(a <= 0.0)) {
      vec4 rk = textureLod(uN, vec2(u * 10.0, v * 3.0) + sr, 0.0);
      float rock = rk.g;
      // the lit and the shaded face meet along a line that wanders down from each peak (spurs and gullies), not a
      // column ruled down the whole range
      float lit = clamp(0.5 - uMdir * (s + (rk.r - 0.5) * 2.4 * smoothstep(0.0, 250.0, h - H)) * 1.3, 0.08, 1.3);
      // snow by height and by the broad noise, never by the slope (a slope read per column paints upright stripes): the
      // high ranges' snow lies in sheets near the top, thinning downward with a ragged lower edge hundreds of metres
      // across; through rain or mist at night it does not show. Winter snow lies in broad patches on the far hills.
      float cap = smoothstep(0.0, 0.35, (H - 640.0) / 260.0 + (rock - 0.5) * 1.1 + (rk.r - 0.5) * 0.9 - 0.6 * smoothstep(250.0, 600.0, h - H));
      float sn = max(snow * smoothstep(0.36, 0.52, rock * 0.6 + rk.r * 0.4), cap * (1.0 - smoothstep(0.2, 0.4, uMist)));
      if (rid < 0.5 && snow < 0.5) sn = 0.0;
      // on rain and mist nights the range's top goes up into the cloud base
      a *= 1.0 - 0.8 * smoothstep(0.2, 0.4, uMist) * smoothstep(550.0, 800.0, H);
      vec3 alb = mix(vec3(0.05, 0.055, 0.05) * (0.6 + 0.8 * rock), vec3(0.62, 0.66, 0.72), sn);
      float forest = smoothstep(500.0, 300.0, H) * (1.0 - snow * 0.5);
      alb = mix(alb, vec3(0.025, 0.035, 0.03), forest * 0.8);
      vec3 c = alb * (uMoonL * lit + uAmb);
      // a high range on a clear night stands a little darker than the sky behind it (a silhouette, not a pale wall)
      float hz = i == 0 ? 0.72 - 0.34 * rid * (1.0 - smoothstep(0.2, 0.4, uMist)) : 0.5;
      hz = clamp(hz + uMist * 0.25 * smoothstep(400.0, 0.0, H) + 0.1 * smoothstep(300.0, 0.0, H), 0.0, 0.95);
      c = mix(c, uFogC, hz);
      r = over(r, c, a);
    }}
    if (lights > 0.0) {
      float cu = u * 900.0, ci = floor(cu), hh = hsh(ci + uSd * 7.0);
      if (hh < 0.22 * lights) {
        float ly = (hf * 0.12 + 15.0 + 25.0 * fract(hh * 37.0)), dx = (fract(cu) - 0.5) * 2048.0 / 900.0, dy = (H - ly) / px;
        float l2 = dx * dx + dy * dy * 2.0;   // a texel is about half again as tall as it is wide on screen
        r.rgb += vec3(1.0, 0.62, 0.3) * (0.45 * exp(-l2 * 1.3) + 0.05 * exp(-l2 * 0.3 / (1.0 + uMist))) * step(H, hf);
      }
    }
  } else {
    // ---------------- middle distance, 260 m out, up to 70 m: banks, woods, houses, lamps
    float X = u * 520.0, H = v * 70.0, pxh = 70.0 / uRows, pxw = 520.0 / 2048.0;
    float bank = 2.0 + 5.0 * tn(u, 5.0, 0.3 + uSd), tDen = 0.5, conF = 0.5, tH = 1.0, hDen = 0.15, lamp = 0.0, block = 0.0, lit = 0.35;
    if (reg == 0) { tDen = 0.8; conF = 0.55; hDen = 0.16; }
    else if (reg == 1) { bank = 0.6 + 1.5 * tn(u, 4.0, 0.2); tDen = 0.07; conF = 0.0; hDen = 0.05; tH = 0.7; }
    else if (reg == 2) { bank = 14.0 + 40.0 * tn(u, 3.0, 0.4 + uSd); tDen = 0.9; conF = 0.95; hDen = 0.07; }
    else if (reg == 3) { bank = 3.0 + 9.0 * tn(u, 4.0, 0.7); tDen = 0.12; conF = 0.8; hDen = 0.12; tH = 0.6; }
    else if (reg == 4) { bank = 0.0; tDen = 0.0; hDen = 0.0; }
    else if (k == 1) { bank = 2.0 + 5.0 * tn(u, 6.0, 0.9); tDen = 0.1; conF = 0.9; hDen = 0.12; tH = 0.6; }
    else if (k == 2) { bank = 22.0 + 46.0 * tn(u, 3.0, 0.5 + uSd); tDen = 0.92; conF = 0.97; hDen = 0.04; tH = 1.1; }
    else if (k == 3) { bank = 2.5 + 2.0 * tn(u, 7.0, 0.1); tDen = 0.6; conF = 0.4; hDen = 0.3; lamp = 0.3; lit = 0.45; }
    else if (k == 4) { bank = 1.0; tDen = 0.25; conF = 0.3; hDen = 0.9; lamp = 1.0; block = 0.45; lit = 0.5; }
    if (uSea == 1 || uSea == 3) conF *= 0.6;
    vec3 moon = uMoonL, amb = uAmb;
    // the bank (the ground swell the woods stand on); no noise finer than four texels anywhere in a strip
    float ba = clamp((bank - H) / pxh + 0.5, 0.0, 1.0);
    float cl = textureLod(uN, vec2(X * 0.012, H * 0.008) + uSd, 0.0).g;
    vec3 bc = mix(vec3(0.03, 0.04, 0.03), vec3(0.5, 0.55, 0.62), snow * 0.8) * (moon * 0.5 + amb) * (0.7 + 0.5 * tn(u, 8.0, 0.5));
    // wooded country: the slope under the tree line is canopy, not a bare bank
    vec3 fc = mix(vec3(0.02, 0.03, 0.022) * (0.5 + 1.0 * cl), vec3(0.5, 0.55, 0.62), snow * smoothstep(0.5, 0.6, cl)) * (moon * 0.5 + amb);
    bc = mix(bc, fc, smoothstep(0.5, 0.85, tDen));
    r = over(r, bc, ba);
    // woods: a low ragged mass of scrub and young trees where the stands are, and over it every tree from its own cell's
    // numbers (height, width, lean, two to four lobes to a crown); stands and gaps from a broad noise, one cell in four
    // empty or scrub, so a wood's top line never repeats; filled masses with an antialiased outline, a soft moonward rim
    float cw = 520.0 / 120.0, ci = floor(X / cw);
    bool wil = reg == 0 || k == 3;
    vec4 st4 = textureLod(uN, vec2(u * 6.0, 0.37 + uSd), 0.0);
    float ugH = bank + tH * (2.5 + 7.0 * st4.g) * smoothstep(0.3, 0.55, st4.r * (0.6 + 0.6 * tDen)) - 0.6;
    vec4 un = textureLod(uN, vec2(X * 0.012, H * 0.008) + 0.29, 0.0);
    float ua = clamp((ugH + (un.g - 0.5) * 2.5 - H) / max(pxw, pxh) + 0.5, 0.0, 1.0) * step(0.05, tDen), cl2 = un.a;
    vec3 uc = mix(vec3(0.02, 0.028, 0.02) * (0.7 + 0.6 * cl2), vec3(0.5, 0.55, 0.62), snow * smoothstep(0.52, 0.62, cl2) * 0.7);
    r = over(r, uc * (moon * (0.35 + 0.12 * smoothstep(ugH - 3.0, ugH, H)) + amb), ua);
    for (int i = -2; i < uL3; i++) {
      float c = ci + float(i), cm = mod(c, 120.0), h = hsh(cm + uSd * 13.0 + float(k) * 7.0);
      float stand = textureLod(uN, vec2((cm + 0.5) / 120.0 * 6.0, 0.37 + uSd), 0.0).r;
      if (!(h > tDen * (0.2 + 1.3 * stand))) {
      float h2 = hsh(cm * 1.7 + 3.1 + uSd), h3 = hsh(cm * 2.3 + 5.7 + uSd), h4 = hsh(cm * 3.9 + 1.3 + uSd), h5 = hsh(cm * 5.3 + 7.7 + uSd);
      float cx = (c + 0.5 + (h2 - 0.5) * 0.8) * cw;
      bool con = h3 < conF, scrub = fract(h4 * 5.7) < 0.25, pop = !con && !scrub && h5 > 0.9;
      float sz = scrub ? mix(0.25, 0.45, h5) : mix(0.55, 1.15, fract(h4 * 3.3)) + 0.45 * step(0.85, fract(h4 * 9.1));
      if (!con && !pop) sz = min(sz, 1.2);
      float ht = (con ? 17.0 : pop ? 19.0 : 13.0) * sz * tH;
      float y = H - bank + 0.6, xx = X - cx - (h5 - 0.5) * 0.14 * y;
      float d, nx;   // signed distance to the outline (m) and the across-crown position for the rim
      if (con) {
        // a spruce: a narrow irregular spire; its sides from noise up the stem and soft drooping tiers, never stepped
        float yt = clamp(y / ht, 0.0, 1.0), sd2 = xx < 0.0 ? 0.0 : 0.5;
        float tier = textureLod(uN, vec2(y * 0.014 + h * 3.0, h2 * 5.0 + sd2), 0.0).g;
        float br = 0.82 + 0.3 * sin(y * (2.4 + h2) + h * 20.0 + sd2 * 3.0) * (0.4 + tier);
        float w = ht * (0.12 + 0.06 * h2) * pow(1.0 - yt, 0.8) * (0.5 + 1.0 * tier) * br + 0.12;
        d = max(abs(xx) - w, max(y - ht, -y)); nx = xx / max(w, 0.3);
      } else {
        // a broadleaf: a crown whose top line rises and falls in two to four lumps (a noise across its width), a
        // willow's dome with a hanging skirt, a poplar's tall narrow flame
        bool wl = wil && h5 < 0.45 && !scrub;
        float wd = pop ? 0.16 : wl ? 0.42 : 0.36 + 0.12 * h2;
        vec2 R = ht * (pop ? vec2(0.16, 0.45) : vec2(wd * (0.8 + 0.3 * h2), wl ? 0.3 : 0.3 + 0.1 * h4));
        float cy = ht * (pop ? 0.55 : wl ? 0.68 : 0.6 + 0.1 * h3);
        float ex = clamp(xx / R.x, -1.0, 1.0), sq = sqrt(1.0 - ex * ex);
        float bump = textureLod(uN, vec2(ex * (0.12 + 0.12 * h5) + h * 5.0, 0.5 + h2), 0.0).g;
        d = max(max(abs(xx) - R.x * (0.9 + 0.3 * bump), y - cy - R.y * sq * (0.55 + 0.8 * bump)), cy - R.y * 0.75 * sq - y);
        nx = ex;
        if (wl) {
          // the willow's skirt hangs from the dome nearly to the ground, its hem ragged
          float hem = ht * (0.08 + 0.2 * textureLod(uN, vec2(X * 0.02, h), 0.0).r);
          float sk = max(abs(xx) - ht * wd * (1.0 - 0.3 * smoothstep(ht * 0.66, hem, y)), max(hem - y, y - ht * 0.66));
          if (sk < d) { d = sk; nx = xx / (ht * wd); }
        }
        d = min(d, max(abs(xx) - 0.15 - 0.01 * ht, max(y - ht * 0.4, -y)));   // the trunk
      }
      vec4 tn4 = textureLod(uN, vec2(X * 0.012, H * 0.008) + h * 7.0, 0.0);
      float rag = tn4.g - 0.5 + 0.5 * (tn4.b - 0.5);
      d += rag * ht * (con ? 0.06 : 0.16);
      float a = clamp(-d / max(pxw, pxh) + 0.5, 0.0, 1.0) * smoothstep(9.0, 7.5, abs(X - cx));   // never cut by the cell reach
      if (!(a <= 0.0)) {
      vec3 tc = con ? vec3(0.016, 0.026, 0.022) : uSea == 2 ? vec3(0.05, 0.03, 0.012) : vec3(0.022, 0.03, 0.018);
      // clumps of foliage a few metres across, darker toward the foot, a soft lighter rim on the moon's side
      float clm = tn4.a;
      tc *= (0.75 + 0.5 * clm) * (0.6 + 0.4 * smoothstep(0.0, ht * 0.7, y));
      float rim = 0.45 * smoothstep(0.1, 0.95, nx * uMdir) * smoothstep(-ht * 0.25, 0.0, d) + 0.15 * smoothstep(ht * 0.4, ht, y);
      if (snow > 0.5) tc = mix(tc, vec3(0.55, 0.6, 0.7), smoothstep(0.5, 0.62, clm + 0.15 * nx * uMdir) * 0.75);
      if (uSea == 3 && !con && h4 < 0.3) tc = mix(tc, vec3(0.075, 0.068, 0.072), smoothstep(0.45, 0.7, clm) * 0.45);   // blossom, a soft pale cast
      r = over(r, tc * (moon * (0.4 + rim) + amb), a);
    }}}
    // houses
    float hw = 520.0 / 32.0, hi = floor(X / hw);
    for (int i = -1; i < uL3 - 1; i++) {
      float c = hi + float(i), cm = mod(c, 32.0), h = hsh(cm * 3.3 + uSd * 5.0 + float(k) * 11.0);
      if (!(h > hDen)) {
      float h2 = hsh(cm * 1.3 + 9.1 + uSd), h3 = hsh(cm * 4.1 + 2.2 + uSd);
      bool blk = h3 < block;
      float w = blk ? mix(12.0, 15.0, h2) : mix(6.5, 11.0, h2), wh = blk ? mix(11.0, 22.0, fract(h2 * 9.0)) : mix(4.5, 7.0, fract(h2 * 3.0));
      float cx = (c + 0.5) * hw + (h3 - 0.5) * (hw - w - 1.0), gb = bank - 0.5;
      float dx = X - cx, y = H - gb;
      float roof = blk ? 0.6 : 3.5 * (1.0 - abs(dx) / (w * 0.5 + 0.6));
      float aw = clamp((w * 0.5 - abs(dx)) / pxw + 0.5, 0.0, 1.0) * clamp((wh - y) / pxh + 0.5, 0.0, 1.0) * step(0.0, y);
      float ar = clamp((wh + roof - y) / pxh + 0.5, 0.0, 1.0) * step(wh - 0.01, y) * step(abs(dx), w * 0.5 + 0.6);
      vec3 wc = mix(vec3(0.16, 0.15, 0.14), vec3(0.3, 0.26, 0.2), fract(h2 * 13.0)) * (moon * 0.35 + amb);
      // windows: at 260 m a lit window is a point with a small halo (wider in mist), a dark one a faint soft patch
      float fx = fract(dx / 2.6 + 0.5), fy = fract(y / 3.0), wx = floor(dx / 2.6 + 0.5), wy = floor(y / 3.0);
      float win = step(abs(dx), w * 0.5 - 1.0) * step(y, wh - 1.0) * step(0.8, y);
      float wd = length(vec2((fx - 0.5) * 2.6, (fy - 0.52) * 3.0));
      float on = step(hsh(wx * 7.7 + wy * 3.1 + cm * 1.9 + uSd), lit) * win;
      vec3 wcol = mix(vec3(1.0, 0.55, 0.22), vec3(1.0, 0.75, 0.45), hsh(wx + wy * 5.0 + cm)) * (1.2 + 1.2 * hsh(wy + cm * 2.0));
      wc *= 1.0 - 0.45 * win * (1.0 - on) * smoothstep(0.6, 0.2, wd);
      r = over(r, wc, aw);
      vec3 rc = snow > 0.5 ? vec3(0.6, 0.64, 0.72) * (moon * 0.7 + amb) : vec3(0.06, 0.05, 0.05) * (moon * 0.6 + amb);
      r = over(r, rc, ar);
      float hr = 0.42 * (1.0 + 1.6 * uMist);
      r.rgb += wcol * on * aw * (0.45 * smoothstep(0.36, 0.08, wd) + 0.12 * exp(-wd * wd / (hr * hr)));
    }}
    // street lamps (sodium) along the line
    if (lamp > 0.0) {
      float lw = 520.0 / 40.0, li = floor(X / lw + 0.5), lm = mod(li, 40.0);
      if (hsh(lm * 5.1 + uSd) < lamp) {
        float lx = li * lw, dx = X - lx, ly = bank + 6.5;
        float post = clamp((0.13 - abs(dx)) / pxw + 0.5, 0.0, 1.0) * step(H, ly) * step(bank, H);
        r = over(r, vec3(0.02), post * 0.8);
        float dd = length(vec2(dx, H - ly));
        r.rgb += vec3(1.0, 0.5, 0.16) * (3.0 * exp(-dd * dd * 4.0) + 0.12 * exp(-dd * 0.45));
        r.a = max(r.a, clamp(1.0 - dd * 2.0, 0.0, 1.0));
      }
    }
    // lighthouse on a coast
    if (reg == 3 || k == 1) {
      float lx = 0.31 * 520.0, dx = X - lx, gb = bank - 0.5, y = H - gb;
      float tw = mix(1.6, 1.0, clamp(y / 20.0, 0.0, 1.0));
      float a = clamp((tw - abs(dx)) / pxw + 0.5, 0.0, 1.0) * step(0.0, y) * step(y, 20.0);
      r = over(r, mix(vec3(0.3, 0.3, 0.32), vec3(0.18, 0.02, 0.02), step(0.5, fract(y / 5.0))) * (moon * 0.5 + amb), a);
      float dd = length(vec2(dx, y - 21.0));
      r.rgb += vec3(1.0, 0.92, 0.75) * (3.0 * exp(-dd * dd * 1.5) + 0.15 * exp(-dd * 0.3));
      r.a = max(r.a, clamp(1.6 - dd, 0.0, 1.0));
    }
    r.rgb = mix(r.rgb, uFogC * r.a, 0.28);
    // a tall wooded slope on a wet night is two planes: a nearer spur, dark, and behind it the upper slope a step paler
    // going up into the cloud; mist lies along the foot of both (rain and mist nights; banks under ~12 m untouched)
    float tall = smoothstep(12.0, 24.0, bank) * smoothstep(0.2, 0.5, uMist);
    float spur = bank * (0.38 + 0.28 * tn(u, 5.0, 0.61 + uSd) + 0.14 * tn(u, 11.0, 0.17));
    float behind = smoothstep(spur - 3.0, spur + 3.0, H);
    r.rgb = mix(r.rgb, uFogC * r.a, tall * (0.38 * behind + 0.22 * behind * smoothstep(spur, bank + 14.0, H)));
    r.rgb = mix(r.rgb, (uFogC * 1.2 + moon * 0.03) * r.a, tall * 0.2 * smoothstep(0.0, 4.0, H - spur) * smoothstep(16.0 + 6.0 * tn(u, 6.0, 0.4), 4.0, H - spur));
    // mist on the water and the low fields: a pale band from the water line up to about a third of the trees' height,
    // its top edge soft and uneven; the crowns clear it
    float mTop = bank + 3.5 + 3.5 * tn(u, 5.0, 0.83 + uSd);
    float mA = uMist * 0.8 * smoothstep(mTop, mTop * 0.25, H) + tall * 0.35 * smoothstep(6.0 + 3.0 * tn(u, 7.0, 0.5), 0.5, H);
    r = over(r, uFogC * 1.3 + moon * 0.035, mA);
  }
  o = vec4(sqrt(max(r.rgb, 0.0) / 4.0), r.a);
}`,se=S0+`

uniform sampler2D uR1, uR2, uA, uD;
uniform float uT, uPx, uLamp, uBlind, uV, uBob, uOurL, uGreen, uFrost, uGR, uExp;
uniform vec3 uOutL, uShade, uBlindC;
uniform vec4 uOff;      // ground (D mod 1280), poles (D mod 45), far strip phase, mid strip phase
uniform vec4 uOff2;     // near (D mod 3360), particles (D mod 6), D mod 240, the other line shown (expresses)
uniform ivec4 uKi; uniform vec4 uSeg;
uniform vec4 uKG[5], uKW[5], uKN[5];
uniform vec3 uSkyH, uSkyZ, uFogC, uMoonL, uAmb, uMoonC;
uniform vec4 uMoon, uSky, uWx;
uniform vec2 uTun, uBr;
uniform vec4 uSt, uXing, uSig, uOT, uDrop, uTea;
uniform vec3 uMoth[6];
uniform vec4 uPt, uPtC; uniform vec3 uPtD;
uniform int uL3, uL5, uL6;
#define ZF 3000.0
#define ZM 260.0
#define ZN 32.0
#define ZP 9.0
#define ZS 30.0
vec3 dec(vec3 c) { return c * c * 4.0; }
float barc(float d, float hw, float w) { return clamp((hw - abs(d)) / w + 0.5, 0.0, 1.0); }
vec4 strip(int k, int l, float u, float v, float lod) {
  float rv = clamp(v, 0.004 + lod * 0.012, 0.996);
  vec4 s = textureLod(uA, vec2(u, (float(k * 2 + l) + rv) * 0.1), lod);
  return vec4(dec(s.rgb), s.a);
}
void kAt(float rx, float bw, out int ka, out int kb, out float w) {
  float w2 = smoothstep(uSeg.y - bw, uSeg.y + bw, rx);
  if (w2 > 0.0) { ka = uKi.y; kb = uKi.z; w = w2; if (uSeg.z < 1.0 && w2 > 0.5) { ka = uKi.w; w = uSeg.z; } }
  else { ka = uKi.x; kb = uKi.y; w = smoothstep(uSeg.x - bw, uSeg.x + bw, rx); }
}
vec4 stripK(float rx, float bw, int l, float u, float v, float lod) {
  int ka, kb; float w; kAt(rx, bw, ka, kb, w);
  vec4 a = w < 0.999 ? strip(ka, l, u, v, lod) : vec4(0.0);
  if (w > 0.001) a = mix(a, strip(kb, l, u, v, lod), w);
  return a;
}
// ---- sky
vec3 sky(vec2 p) {
  float e = YH - p.y;
  vec3 c = mix(uSkyH, uSkyZ, smoothstep(-0.02, 0.42, e));
  c += uSkyH * 0.5 * exp(-max(e, 0.0) * 30.0);
  float sc = 0.42 / uPx;
  vec2 sp = p * sc, ci = floor(sp), cf = fract(sp) - 0.5;
  float hs = hsh2(ci);
  float mw = uSky.y * smoothstep(0.3, 0.8, textureLod(uN, vec2(p.x * 0.8 + p.y * 0.4, p.y * 0.5 - p.x * 0.2) + 0.3, 0.0).r) * smoothstep(0.3, 0.0, abs(p.x * 0.5 - p.y + 0.05));
  float st = step(0.955 - mw * 0.06, hs) * (0.15 + pow(fract(hs * 91.7), 6.0) * 2.5) * exp(-dot(cf, cf) * 9.0);
  c += vec3(0.85, 0.9, 1.0) * st * uSky.x * (0.8 + 0.2 * sin(uT * 3.0 + hs * 60.0)) * smoothstep(0.0, 0.08, e) * 0.12;
  c += vec3(0.03, 0.032, 0.04) * mw;
  // aurora curtains
  if (uSky.z > 0.0) {
    float x = p.x + 0.05 * sin(p.x * 5.0 + uT * 0.05);
    float band = 0.1 + 0.06 * textureLod(uN, vec2(x * 0.5 + uT * 0.004, 0.3), 0.0).r;
    float ray = textureLod(uN, vec2(x * 6.0 + uT * 0.01, 0.7), 0.0).g;
    float a = smoothstep(band - 0.02, band + 0.02, e) * exp(-max(e - band, 0.0) * 9.0) * (0.4 + 1.2 * ray * ray);
    c += (vec3(0.1, 0.9, 0.4) * smoothstep(band + 0.15, band, e) + vec3(0.5, 0.15, 0.6) * smoothstep(band + 0.04, band + 0.2, e)) * a * uSky.z * 0.14;
  }
  // moon
  vec2 md = (p - uMoon.xy) / uMoon.z; float mr = length(md);
  if (mr < 1.08) {
    float x = md.x, y = md.y;
    float tb = uMoon.w * sqrt(max(0.0, 1.0 - y * y));
    float lit = uMoon.w < -0.99 ? 1.0 : smoothstep(tb - 0.07, tb + 0.07, x);
    float mt = 0.62 + 0.38 * textureLod(uN, md * 0.35 + 0.61, 0.0).r - 0.3 * smoothstep(0.42, 0.66, textureLod(uN, md * 0.11 + 0.2, 0.0).a);
    c = mix(c, uMoonC * 0.34 * mt * (lit + 0.025) * (1.0 - 0.3 * mr * mr), smoothstep(1.0, 0.9, mr));
  }
  c += uMoonC * (0.018 * exp(-mr * 0.35) + 0.05 * exp(-mr * 1.3)) * (0.25 + 0.75 * (0.5 - 0.5 * uMoon.w)) * (1.0 + uWx.w);
  // clouds lit by the moon
  if (uSky.w > 0.0) {
    vec2 cp = vec2(p.x * 1.1 + uT * 0.0015, e * 3.2 + 0.1);
    float n = textureLod(uN, cp * vec2(0.7, 1.4), 0.0).r * 0.6 + textureLod(uN, cp * vec2(2.1, 3.0) + 0.4, 0.0).a * 0.4;
    float cl = smoothstep(0.62 - uSky.w * 0.3, 0.95 - uSky.w * 0.25, n) * smoothstep(-0.01, 0.07, e);
    vec3 cc = uSkyH * 0.7 + uMoonC * 0.05 * exp(-mr * 0.25) * (0.6 + 0.8 * textureLod(uN, cp * 3.0, 0.0).g);
    c = mix(c, cc, cl);
  }
  return c;
}
// ---- the ground (true perspective plane) and its water
// the ground's albedo for a blend of two kinds (G, fields weight fw); the noise is read once by the caller
vec3 galb(vec4 G, float fw, float X, float z, float n1, float n2, float n3, float sb) {
  vec3 a = G.rgb * (0.55 + 0.9 * n1) * (0.6 + 0.7 * n2) * (0.7 + 0.6 * n3);
  if (fw > 0.0) {
    // fields in bands along the line, each its own dark (plough, grass, stubble), parted by hedges and wet ditches
    float zb = z + 9.0 * n1, bi = floor(zb / 10.0), bf = fract(zb / 10.0);
    float fh = hsh2(vec2(mod(floor(X / 160.0 + fract(bi * 0.618) * 4.0), 8.0), bi)), ft = fract(fh * 7.0);
    a *= mix(1.0, 0.4 + 1.2 * fh, fw);
    a *= mix(1.0, 0.75 + 0.45 * (0.5 + 0.5 * sin(X * 3.14159 + fh * 6.0)), fw * step(0.5, fh) * smoothstep(70.0, 15.0, z) * (1.0 - sb));
    float edge = smoothstep(0.06, 0.0, min(bf, 1.0 - bf)) * fw * step(0.3, fract(fh * 3.7 + bi * 0.37));
    a *= 1.0 - 0.6 * edge * step(0.3, ft);
    a = mix(a, vec3(0.05, 0.06, 0.085) * (0.6 + 0.8 * n3), edge * step(ft, 0.3) * 0.8);
  }
  return mix(a, vec3(0.62, 0.66, 0.74) * (0.9 + 0.2 * n3), G.w * smoothstep(0.25, 0.5, n1 * 0.6 + n2 * 0.55));
}
float wmask(int k, float X, float z) {
  vec4 W = uKW[k];
  float m = step(W.x, z) * step(z, W.y);
  if (W.z > 0.0) m *= smoothstep(0.5, 0.56, textureLod(uN, vec2(X * 0.0015625, z * 0.0029) + 0.17, 0.0).a + W.z - 0.5);
  return m;
}
vec3 trainLight(float rx, float z, float H) {
  float n = floor(rx / 2.3 + 0.5), f = rx - n * 2.3;
  float w = min(0.5 + z * 0.06, 1.0);
  float on = n == 0.0 ? uOurL : step(hsh(n + 0.5), 0.72) * 0.85;
  float m = smoothstep(w + 0.25, w - 0.1, abs(f)) * on + 0.12;
  return vec3(1.0, 0.72, 0.45) * m * 0.55 * exp(-max(z - 2.0, 0.0) / 6.0) * smoothstep(3.5, 1.0, H);
}
vec4 nearL(int k, float X, float H, float blur) {
  int t = int(uKW[k].w); float dens = uKN[k].x, hs = uKN[k].y, snow = uKG[k].w;
  if (t == 0 || H > hs * 1.1 + 1.0 || H < -0.5) return vec4(0.0);
  float pw = max(blur, uPx * ZN), md = sign(uMoon.x - 0.5);
  vec3 lit = uMoonL * 0.6 + uAmb, sc = vec3(0.55, 0.6, 0.7) * lit;
  if (t == 5) {
    float hn = textureLod(uN, vec2(X * mix(0.0059524, 0.0023810, uOff2.w), 0.4), 0.0).r, hg = textureLod(uN, vec2(X * 0.0833333, H * 0.05), max(uSeg.w - 1.7, 0.0)).g;
    float hr = (hs * (0.35 + 0.65 * hn) + 1.5 * hg) * smoothstep(0.34, 0.6, hn) - 0.4;
    // an express line's cuttings are long earthworks (uOff2.w): their ends long ramps whose crest stays crisp across
    // the line (the blur is along it), never a short notch that reads as a bowl; at speed the snow lies in long ledges,
    // not in mip-blurred blobs
    float sp = max(blur - uPx * ZN, 0.0) * uOff2.w;
    float a = clamp((hr - H) / mix(pw, mix(uPx * ZN, pw, 0.15), uOff2.w) + 0.5, 0.0, 1.0);
    float sn = textureLod(uN, vec2(X * 0.0416667 / (1.0 + 3.0 * sp), H * 0.3), mix(max(uSeg.w - 2.7, 0.0), min(uSeg.w, 1.0), uOff2.w)).b;
    float strata = 0.45 + 1.1 * hg * (0.6 + 0.4 * sin(H * 2.3 + hg * 9.0 + X * 0.07)) + 0.5 * smoothstep(1.2, 0.0, hr - H);
    vec3 c = mix(vec3(0.05, 0.05, 0.055) * (0.5 + 0.7 * sn) * strata * (uMoonL * 0.7 + uAmb), sc, snow * step(0.6, sn));
    return vec4(c * a, a);
  }
  if (t == 4) {
    float c = floor(X / 14.0), h = hsh(c * 0.731 + 3.7), h2 = hsh(c * 1.37 + 9.2), h3 = hsh(c * 2.11 + 4.4);
    float wh = mix(6.0, 10.0, h3), hw = mix(4.0, 5.8, h2), dx = X - (c + 0.5 + (h2 - 0.5) * 0.08) * 14.0;
    float roof = 2.5 * (1.0 - abs(dx) / (hw + 0.5));
    float on = step(h, dens);
    float a = barc(dx, hw, pw) * step(0.0, H) * clamp((wh - H) / pw + 0.5, 0.0, 1.0) * on;
    float ar = barc(dx, hw + 0.5, pw) * step(wh, H) * clamp((wh + roof - H) / pw + 0.5, 0.0, 1.0) * on;
    float fx = fract(dx / 2.4 + 0.5), fy = fract(H / 3.0);
    float win = barc((fx - 0.5) * 2.4, 0.53, pw) * step(0.3, fy) * step(fy, 0.78) * barc(dx, hw - 0.8, pw) * step(H, wh - 0.8) * step(0.8, H);
    float wo = step(hsh(floor(dx / 2.4 + 0.5) * 3.1 + floor(H / 3.0) * 7.3 + c), 0.15);   // a sleeping town: few windows lit
    vec3 wc = mix(vec3(0.13, 0.12, 0.11) * (0.55 + 0.9 * textureLod(uN, vec2(dx * 0.11, H * 0.13) + c * 0.37, 0.0).g) * (uMoonL * 0.45 + uAmb), mix(vec3(0.015, 0.018, 0.025), vec3(1.0, 0.6, 0.28) * 1.4, wo), win);
    vec3 rc = mix(vec3(0.03, 0.028, 0.03) * (uMoonL * 0.5 + uAmb), sc, snow);
    vec4 r = vec4(wc * a, a);
    return vec4(r.rgb * (1.0 - ar) + rc * ar, max(a, ar));
  }
  // trees, bushes and tufts, one per cell: a spruce is a narrow spire of drooping boughs, its two sides out of step and
  // its width from noise up the stem (never tiers of triangles); a broadleaf is two to four lumps of crown over a ragged
  // skirt, never a disc; edges soft along the line at speed, eaten by the noise so the sky flickers through
  float cw = t >= 3 ? 3.0 : 6.0, ci = floor(X / cw);
  float decF = t == 1 ? 0.0 : t == 2 ? 0.6 : t == 3 ? 1.0 : 0.0, trunk = t <= 2 ? 1.0 : 0.0;
  float pv = uPx * ZN * 1.5 + 0.08 + pw * 0.15;
  vec4 r = vec4(0.0);
  for (int i = -1; i < uL3 - 1; i++) {
    float c = ci + float(i), h = hsh(c * 0.731 + float(k) * 3.7), h2 = hsh(c * 1.37 + 9.2), h3 = hsh(c * 2.11 + 4.4);
    float dx = X - (c + 0.5 + (h2 - 0.5) * 0.6) * cw;
    float ht = mix(0.55, 1.0, h3) * hs, y = H / ht;
    float n = textureLod(uN, vec2(X * 0.25, H * 0.3 + h * 7.0), uSeg.w).g;
    float lf = textureLod(uN, vec2(X * 0.055 + h * 3.0, H * 0.09 + h3), max(uSeg.w - 2.2, 0.0)).b;
    float sd = step(0.0, dx), d, wsc;
    if (h2 >= decF) {
      // spruce: bough tips every 60-90 cm, each drooping (slow rise, quick fall), the sides out of step, a slow sway of width
      float bp = H * (1.15 + 0.4 * h) + sd * 0.47 + h3 * 7.0, bf = fract(bp);
      float bough = smoothstep(0.0, 0.75, bf) * smoothstep(1.0, 0.8, bf) * (0.5 + lf);
      float br = 0.78 + 0.1 * sin(H * 0.9 + h * 20.0 + sd * 2.4) + 0.22 * bough + 0.3 * (n - 0.5);
      wsc = ht * (0.17 + 0.05 * h2);
      float w = wsc * pow(clamp(1.0 - y, 0.0, 1.0), 0.9) * (0.75 + 0.5 * lf) * br;
      d = max(abs(dx) - max(w, 0.1 * step(y, 0.25)), max(-H, H - ht * (0.97 + 0.06 * n)));
    } else {
      // broadleaf: three lobes from the cell's own numbers (a main crown and two side masses at other heights), unioned,
      // the union's edge eaten by leafy noise
      wsc = ht * (0.24 + 0.08 * h2);
      float cy = ht * (0.62 + 0.06 * (h3 - 0.5)) - (1.0 - trunk) * ht * 0.25, ry = ht * (0.3 + 0.05 * h);
      float h4 = fract(h * 7.31 + h3 * 3.7), h5 = fract(h2 * 5.17 + h * 1.9);
      float Hq = trunk > 0.5 ? H : max(H, cy - ry * 0.5);   // a bush keeps its width down to the ground
      vec2 q0 = vec2(dx - wsc * 0.12 * (h4 - 0.5), Hq - cy - ry * 0.05) / vec2(wsc * 0.78, ry * 0.88);
      vec2 q1 = vec2(dx + wsc * (0.4 + 0.2 * h5), Hq - cy + ry * (0.1 + 0.35 * h4)) / vec2(wsc * (0.5 + 0.15 * h4), ry * (0.6 + 0.15 * h5));
      vec2 q2 = vec2(dx - wsc * (0.42 + 0.2 * h4), Hq - cy + ry * (0.3 * h5 - 0.05)) / vec2(wsc * (0.48 + 0.15 * h5), ry * (0.62 + 0.2 * h4));
      d = (min(length(q0), min(length(q1), length(q2))) - 1.0) * min(wsc * 0.5, ry * 0.6);
      d += (lf - 0.5) * 0.35 * ry + (n - 0.5) * 0.18 * ht;
      d = max(d, -H);
    }
    float e = clamp(-d / max(wsc * 0.6, 0.3), 0.0, 1.0);
    float a = clamp(-d / (pv + pw * 0.75) + 0.5, 0.0, 1.0);
    a *= smoothstep(0.02, 0.3, n * 0.8 + e * 1.6 + pw * 0.4 + 0.25 * (1.0 - trunk));
    // the stem, under the crown or low in the spruce's skirt
    float tw = (0.1 + 0.012 * ht) * trunk;
    a = max(a, clamp((tw - abs(dx)) / pw + 0.5, 0.0, 1.0) * step(0.0, H) * step(y, h2 >= decF ? 0.3 : 0.6) * trunk);
    a *= step(h, dens);
    float rim = 0.35 + 0.5 * smoothstep(0.0, 1.0, dx * md / max(wsc, 0.2));
    vec3 cc = mix(vec3(0.012, 0.018, 0.015) * (uMoonL * rim * (0.4 + 1.3 * lf) + uAmb), sc, snow * step(0.6, n + 0.12 * h));
    r = vec4(r.rgb * (1.0 - a) + cc * a, max(r.a, a));
  }
  return r;
}
vec4 nearK(float rx, float X, float H, float blur) {
  int ka, kb; float w; kAt(rx, 1.0, ka, kb, w);
  return nearL(w > 0.5 ? kb : ka, X, H, blur);
}
uniform vec4 uRect; uniform float uOS;
void main() {
  vec2 p = uRect.xy + vec2(vUv.x, 1.0 - vUv.y) * uRect.zw;
  p.y += uBob;
  float dy = p.y - YH;
  float blur = uV / 60.0;
  float fogK = uWx.w;
  bool below = dy > 0.0;
  float z = below ? EYE / dy : 1e6, rx = (p.x - 0.5) * z, X = uOff.x + rx;
  vec3 c = vec3(0.0);
  float wm = 0.0, dyr = 0.0, rip = 0.0, calm = 1.0, lb = 0.0;
  if (below) {
    lb = log2(max(1.0, z * uPx * 6.0));
    int ka, kb; float w; kAt(rx, 25.0, ka, kb, w);
    float sb = smoothstep(0.05, 0.4, blur);
    // the ground noise once (it is the same for both kinds); at speed the fine grain is read stretched along the line
    // (streaks, the motion blur), not averaged to a smooth lawn
    float n1 = textureLod(uN, vec2(X * 0.00390625, z * 0.006), 0.0).r, n2 = textureLod(uN, vec2(X * 0.05, z * 0.05), lb).g;
    float n3 = mix(textureLod(uN, vec2(X * 0.375, z * 0.375), lb + 2.0).b, textureLod(uN, vec2(X * 0.025, z * 0.375), lb).b, sb);
    vec4 GK = mix(uKG[ka], uKG[kb], w);
    vec3 alb = galb(GK, mix(uKN[ka].w, uKN[kb].w, w), X, z, n1, n2, n3, sb);
    wm = wmask(ka, X, z);
    if (w > 0.001) wm = mix(wm, wmask(kb, X, z), w);
    // a level crossing: the road runs straight away from the line to the vanishing point
    float road = barc(rx - uXing.x, 3.0, z * uPx * 1.5) * step(uXing.w, 0.5);
    alb = mix(alb, vec3(0.035, 0.035, 0.038) * (0.8 + 0.4 * textureLod(uN, vec2(X * 0.3125, z * 0.3125), lb).b), road);
    // the carriage windows' light on the trackside: soft warm rectangles that stay in the window while the ground streams
    // through them (our own goes with the lamp, the others' compartments dim with it)
    float pn = floor(rx / 2.3 + 0.5), pf = rx - pn * 2.3;
    float pon = pn == 0.0 ? uOurL : step(hsh(pn + 0.5), 0.72) * 0.8 * (0.15 + 0.85 * uOurL);
    float pz = 16.0 + 2.0 * hsh(pn * 3.1 + 0.7);
    float pat = pon * smoothstep(1.2, 0.45, abs(pf) + 0.4 * (n3 - 0.5) + 0.25 * (n2 - 0.5)) * smoothstep(pz + 1.5, pz - 2.5, z) * (1.0 - 0.6 * GK.w);   // snow is white already
    vec3 L = uMoonL * 0.55 + uAmb + vec3(1.0, 0.72, 0.45) * (0.42 * pat + 0.012 * uOurL * exp(-max(z - 12.0, 0.0) / 8.0));
    vec2 rq = vec2(rx - uXing.x + 4.0, z - 7.0);
    L += vec3(1.0, 0.08, 0.03) * uXing.y * 2.5 / (1.0 + dot(rq, rq) * 0.06) * step(abs(uXing.x), 200.0);
    c = alb * L;
    if (wm > 0.001) {
      rip = textureLod(uN, vec2(X * 0.05 + uT * 0.02, z * 0.11), lb).g - 0.5 + 0.5 * (textureLod(uN, vec2(X * 0.3125 - uT * 0.05, z * 0.6), lb + 1.0).b - 0.5);
      calm = uKW[ka].x < 16.0 && uKN[ka].z > 1.5 ? 0.04 : 1.0;
      dyr = max(dy * (1.0 + rip * 0.3 * calm) + rip * 0.0025 * calm, 0.0005);
    }
  }
  // the sky: straight up above the horizon, reflected in water below it (one evaluation either way)
  vec3 rc = (below && wm < 0.001) ? vec3(0.0) : sky(below ? vec2(p.x + rip * 0.004 * calm, YH - dyr) : p);
  if (!below) c = rc;
  // far ranges (3 km) and middle distance (260 m): seen directly above their ground line, otherwise only in water
  vec4 sF = vec4(0.0), sM = vec4(0.0);
  float Hf = EYE - dy * ZF; bool dF = Hf > 0.0;
  if (!dF) Hf = wm > 0.001 ? dyr * ZF - EYE : -1.0;
  if (Hf > 0.0 && Hf < 1400.0) sF = stripK((p.x - 0.5) * 900.0, 140.0, 0, uOff.z + (p.x - 0.5) * 0.25, Hf / 1400.0, dF ? 0.0 : 1.5);
  float Hm = EYE - dy * ZM; bool dM = Hm > 0.0;
  if (!dM) Hm = (wm > 0.001 && z < ZM) ? dyr * ZM - EYE : -1.0;
  if (Hm > 0.0 && Hm < 70.0) { sM = stripK((p.x - 0.5) * ZM, 60.0, 1, uOff.w + (p.x - 0.5) * 0.5, Hm / 70.0, dM ? 0.0 : 2.5); sM.rgb = mix(sM.rgb, uFogC * sM.a, fogK * 0.15 * smoothstep(20.0, 0.0, Hm)); }
  if (!dF) { rc = rc * (1.0 - sF.a) + sF.rgb; sF = vec4(0.0); }
  if (!dM) { rc = rc * (1.0 - sM.a) + sM.rgb; sM = vec4(0.0); }
  if (below) {
    if (wm > 0.001) {
      float fr = 0.03 + 0.97 * pow(1.0 - min(dy * 2.2, 1.0), 5.0);
      vec3 wcol = vec3(0.004, 0.006, 0.008) * (uMoonL + uAmb * 3.0) + rc * fr;
      // moonlight on the water: a narrow path of small glints under the moon, drawn at screen resolution (each 1 to 3 px
      // high, six wide, soft), thinning to the sides and toward the far shore, each twinkling on its own
      float gw = 0.005 + dy * 0.32, gx = (p.x - uMoon.x) / gw;
      vec2 gq = vec2((p.x - uMoon.x) / (uPx * 4.0), (p.y - uBob) / (uPx * (1.0 + 2.0 * smoothstep(0.0, 0.2, dy))));
      vec2 gi = floor(gq), gf = fract(gq) - 0.5;
      float gh = hsh2(gi + floor(uT * 7.0) * 0.137);
      float gd = exp(-gx * gx * 1.3) * (0.12 + 0.88 * smoothstep(0.0, 0.1, dy));
      gf.x += (fract(gh * 53.0) - 0.5) * 0.5;
      float gl = (step(1.0 - 0.32 * gd, gh) * exp(-gf.x * gf.x * 9.0 - gf.y * gf.y * 7.0) * fract(gh * 37.0) * fract(gh * 37.0) * 1.6 + 0.06 * exp(-gx * gx * 2.0)) * calm;
      wcol += uMoonC * gl * 0.25 * (0.5 - 0.5 * uMoon.w) * step(uMoon.y, YH);
      wcol += trainLight(rx, z, 0.0) * 0.05;
      c = mix(c, wcol, wm);
    }
    float fog = 1.0 - exp(-z * (0.0009 + fogK * 0.004));
    float mist = fogK * smoothstep(0.35, 0.7, textureLod(uN, vec2(X * 0.0078125 - uT * 0.004, z * 0.01), 0.0).r) * smoothstep(10.0, 60.0, z);
    c = mix(c, uFogC, clamp(fog + mist * 0.6, 0.0, 1.0));
  }
  c = c * (1.0 - sF.a) + sF.rgb;
  c = c * (1.0 - sM.a) + sM.rgb;
  // the junction signal: two route lamps and a feather of white lights showing which way the points lie
  if (uSig.z > 0.0) {
    float d = (p.x - 0.5) * ZS - uSig.x, H = EYE - dy * ZS, pw = uPx * ZS + blur * 0.2;
    if (abs(d) < 14.0 && H > -4.0 && H < 14.0) {
      float mast = barc(d, 0.12, pw) * step(0.0, H) * step(H, 5.2);
      float head = barc(d, 0.55, pw) * barc(H - 5.0, 0.55, pw);
      c = mix(c, vec3(0.012, 0.012, 0.014) * (1.0 + uMoonL * 3.0), max(mast, head));
      float ch = uSig.y;
      vec2 q = vec2(d, H);
      float lg = length(q - vec2(-0.27, 5.05)), rg = length(q - vec2(0.27, 5.05));
      vec3 cL = ch < 0.0 ? vec3(0.2, 1.0, 0.55) : vec3(1.0, 0.08, 0.03), cR = ch > 0.0 ? vec3(0.2, 1.0, 0.55) : vec3(1.0, 0.08, 0.03);
      vec3 g = cL * (4.0 * smoothstep(0.17, 0.11, lg) + 0.3 * exp(-lg * 3.5) + 0.03 * exp(-lg * 0.9));
      g += cR * (4.0 * smoothstep(0.17, 0.11, rg) + 0.3 * exp(-rg * 3.5) + 0.03 * exp(-rg * 0.9));
      float fe = 0.0;
      for (int i = 0; i < uL5; i++) { vec2 fp = vec2(ch * (0.35 + 0.3 * float(i)), 5.75 + 0.28 * float(i)); float fd = length(q - fp); fe += 2.4 * smoothstep(0.1, 0.06, fd) + 0.09 * exp(-fd * 5.0); }
      g += vec3(1.0, 0.95, 0.85) * fe * (0.7 + 0.3 * uSig.w);
      c += g * uSig.z;
    }
  }
  // near woods, hedges, houses (32 m)
  float Hn = EYE - dy * ZN;
  { vec4 s = nearK((p.x - 0.5) * ZN, uOff2.x + (p.x - 0.5) * ZN, Hn, uV / 15.0); vec3 tl = trainLight((p.x - 0.5) * ZN, ZN, Hn) * 0.3; s.rgb += tl * s.a; s.rgb = mix(s.rgb, uFogC * s.a, clamp(fogK * 0.25 + 0.03, 0.0, 1.0)); c = c * (1.0 - s.a) + s.rgb; }
  o = vec4(c / uOS, 1.0);
}`,tt=S0+`

uniform sampler2D uR1, uR2, uA, uD;
uniform float uT, uPx, uLamp, uBlind, uV, uBob, uOurL, uGreen, uFrost, uGR, uExp;
uniform vec3 uOutL, uShade, uBlindC;
uniform vec4 uOff;      // ground (D mod 1280), poles (D mod 45), far strip phase, mid strip phase
uniform vec4 uOff2;     // near (D mod 3360), particles (D mod 6), D mod 240, the other line shown (expresses)
uniform ivec4 uKi; uniform vec4 uSeg;
uniform vec4 uKG[5], uKW[5], uKN[5];
uniform vec3 uSkyH, uSkyZ, uFogC, uMoonL, uAmb, uMoonC;
uniform vec4 uMoon, uSky, uWx;
uniform vec2 uTun, uBr;
uniform vec4 uSt, uXing, uSig, uOT, uDrop, uTea;
uniform vec3 uMoth[6];
uniform vec4 uPt, uPtC; uniform vec3 uPtD;
uniform int uL3, uL5, uL6;
#define ZF 3000.0
#define ZM 260.0
#define ZN 32.0
#define ZP 9.0
#define ZS 30.0
vec3 dec(vec3 c) { return c * c * 4.0; }
float barc(float d, float hw, float w) { return clamp((hw - abs(d)) / w + 0.5, 0.0, 1.0); }
vec3 trainLight(float rx, float z, float H) {
  float n = floor(rx / 2.3 + 0.5), f = rx - n * 2.3;
  float w = min(0.5 + z * 0.06, 1.0);
  float on = n == 0.0 ? uOurL : step(hsh(n + 0.5), 0.72) * 0.85;
  float m = smoothstep(w + 0.25, w - 0.1, abs(f)) * on + 0.12;
  return vec3(1.0, 0.72, 0.45) * m * 0.55 * exp(-max(z - 2.0, 0.0) / 6.0) * smoothstep(3.5, 1.0, H);
}
uniform vec4 uRect, uSt2; uniform float uOS;
void ov(inout vec3 c, inout float a, vec3 x, float m) { c = mix(c, x, m); a = a + (1.0 - a) * m; }
void main() {
  vec2 p = uRect.xy + vec2(vUv.x, 1.0 - vUv.y) * uRect.zw;
  p.y += uBob;
  float dy = p.y - YH, blur = uV / 60.0, fogK = uWx.w;
  vec3 c = vec3(0.0); float a = 0.0;
  // a car waiting at the crossing, headlights on
  if (uXing.z > 0.5 && abs(uXing.x) < 40.0) {
    float d = (p.x - 0.5) * 16.0 - uXing.x, H = EYE - dy * 16.0;
    float l1 = length(vec2(d + 0.65, H - 0.75)), l2 = length(vec2(d - 0.65, H - 0.75));
    c += vec3(1.0, 0.93, 0.8) * (4.0 * smoothstep(0.14, 0.07, l1) + 4.0 * smoothstep(0.14, 0.07, l2) + 0.3 * exp(-l1 * 1.5) + 0.3 * exp(-l2 * 1.5));
  }
  // the other line (night expresses), 15 m out: ballast, sleepers that are only a flicker at speed, and two rails
  // (a dark web 15 cm tall, a polished head catching the sky and the moon), lit by the carriage windows
  if (uOff2.w > 0.5 && dy > 0.0) {
    float z = EYE / dy, bd = abs(z - 15.0);
    if (bd < 1.75) {
      float rx = (p.x - 0.5) * z, X = uOff2.z + rx;
      float pn = floor(rx / 2.3 + 0.5), pf = rx - pn * 2.3;
      float pat = (pn == 0.0 ? uOurL : step(hsh(pn + 0.5), 0.72) * 0.8 * (0.15 + 0.85 * uOurL)) * smoothstep(1.2, 0.45, abs(pf));
      vec3 L = uMoonL * 0.55 + uAmb + vec3(1.0, 0.72, 0.45) * 0.6 * pat;
      float slp = barc((fract(X / 0.64 + 0.5) - 0.5) * 0.64, 0.12, max(blur * 2.0, z * uPx * 2.0)) * smoothstep(1.3, 1.15, bd);
      vec3 bc = mix(vec3(0.075, 0.072, 0.07), vec3(0.03, 0.025, 0.02), slp * 0.8) * L;
      ov(c, a, bc, smoothstep(1.75, 1.45, bd));
      vec2 zr = 15.0 + vec2(-0.7175, 0.7175), t1 = (EYE - 0.15) / zr, t0 = EYE / zr;
      vec2 side = clamp((0.5 * (t0 - t1) - abs(dy - 0.5 * (t0 + t1))) / uPx + 0.5, 0.0, 1.0), top = clamp((uPx * 0.6 - abs(dy - t1)) / uPx + 0.5, 0.0, 1.0);
      ov(c, a, vec3(0.006, 0.006, 0.007) + L * 0.012, max(side.x, side.y));
      // wet rails under a rain sky are dark: the head shows only where our windows' light strikes it, a broken glint
      float brk = mix(1.0, smoothstep(0.35, 0.65, textureLod(uN, vec2(X * 0.031, 0.37), 0.0).r), uWx.y);
      c += ((uSkyH * 1.6 + uMoonC * 0.012 * (0.5 - 0.5 * uMoon.w)) * (1.0 - 0.92 * uWx.y) + vec3(1.0, 0.72, 0.45) * 0.1 * pat * brk) * (top.x + top.y);
    }
  }
  // station: platform, building, lamps
  float inSt = 0.0;
  if (uSt.w > 0.0) {
    float zb = 13.0, db = (p.x - 0.5) * zb, Hb = EYE - dy * zb;
    float sL = uSt.y - uSt.x, big = uSt.z;
    // platform surface (1 m up)
    if (dy > 0.0) {
      float zp = (EYE - 1.0) / dy, rp = (p.x - 0.5) * zp;
      bool yard = rp > uSt2.x && rp < uSt2.y && zp < 24.0;   // the paving runs on to the building's foot
      if ((zp < zb || yard) && rp > uSt.x && rp < uSt.y) {
        float Xp = uOff2.z + rp;
        float sl = max(smoothstep(0.04, 0.0, abs(fract(Xp / 1.2) - 0.5) - 0.46), smoothstep(0.04, 0.0, abs(fract(zp / 1.2) - 0.5) - 0.46));
        vec3 pa = mix(vec3(0.16, 0.155, 0.15), vec3(0.6, 0.64, 0.72), uKG[uKi.y].w) * (0.8 + 0.4 * textureLod(uN, vec2(Xp, zp) * 0.4, 0.0).b) * (1.0 - 0.4 * sl);
        float n = floor((rp - uSt.x - 9.0) / 18.0 + 0.5), lx = uSt.x + 9.0 + n * 18.0;
        vec3 dl = vec3(rp - lx, 2.9, zp - 5.5);
        vec3 lc = big > 0.5 ? vec3(1.0, 0.55, 0.2) : vec3(1.0, 0.8, 0.55);
        vec3 Lp = lc * 9.0 / dot(dl, dl) + uMoonL * 0.5 + uAmb + trainLight(rp, zp, 0.0);
        // a lit window's light lies on the paving under it, a soft patch widening toward us
        float iw = floor((rp - uSt2.x) / 3.4), wcx = uSt2.x + (iw + 0.5) * 3.4;
        float wlit = step(0.5, hsh(iw + uSt2.w)) * step(1.2, wcx - uSt2.x) * step(wcx, uSt2.y - 1.2);
        Lp += vec3(1.0, 0.66, 0.36) * 0.7 * wlit * smoothstep(0.6 + (24.0 - zp) * 0.18 + 0.4, 0.6 + (24.0 - zp) * 0.18 - 0.3, abs(rp - wcx)) * smoothstep(17.0, 23.6, zp);
        c = pa * Lp; a = 1.0;
        if (uWx.y > 0.0) c += lc * 0.4 * exp(-length(dl.xz) * 0.6) * uWx.y;
        inSt = 1.0;
      }
    }
    // station building or a small shelter, 24 m out across the platform
    float zb2 = 24.0, db2 = (p.x - 0.5) * zb2, Hb2 = EYE - dy * zb2;
    float bh = uSt2.z;
    if (db2 > uSt2.x && db2 < uSt2.y && Hb2 > 0.8 && Hb2 < bh + 2.2) {
      float lx = db2 - uSt2.x, bw = uSt2.y - uSt2.x;
      vec3 wa = (big > 0.5 ? vec3(0.3, 0.22, 0.17) : vec3(0.2, 0.16, 0.13)) * (0.8 + 0.4 * textureLod(uN, vec2(db2 * 0.3, Hb2 * 0.6), 0.0).g) * (0.92 + 0.08 * step(0.5, fract(Hb2 * 3.3)));
      // the wall is lit by the platform lamps' own falloff: a pool under each, near black between; above the lamps'
      // shades and under the eaves it falls into shadow
      float nb = floor((db2 - uSt.x - 9.0) / 18.0 + 0.5), lb = uSt.x + 9.0 + nb * 18.0, lb2 = lb + (db2 > lb ? 18.0 : -18.0);
      vec3 dw = vec3(db2 - lb, (Hb2 - 3.6) * 1.2, 2.6), dw2 = vec3(db2 - lb2, (Hb2 - 3.6) * 1.2, 2.6);
      vec3 lcb = big > 0.5 ? vec3(1.0, 0.55, 0.2) : vec3(1.0, 0.8, 0.55);
      float eave = 1.0 - 0.75 * smoothstep(bh - 1.1, bh - 0.15, Hb2);
      vec3 bc = wa * (lcb * 2.0 * (1.0 / dot(dw, dw) + step(lb2, uSt.y) * step(uSt.x, lb2) / dot(dw2, dw2)) * eave + uMoonL * 0.06 + uAmb * 0.3);
      float fx = fract(lx / 3.4), fy = Hb2 - 1.0;
      float win = barc(fx - 0.5, 0.17, 0.02) * step(1.3, fy) * step(fy, 2.9) * step(1.2, lx) * step(lx, bw - 1.2);
      float mull = (1.0 - barc(fx - 0.5, 0.008, 0.01)) * (1.0 - barc(fy - 2.25, 0.03, 0.02));
      float wi = floor(lx / 3.4), lit = step(0.5, hsh(wi + uSt2.w)), hs3 = hsh(wi * 1.7);
      // a lit window is a dim room: brightest low and to one side (a lamp in there), a curtain drawn over the other half
      float wx = (fx - 0.5) / 0.17, wy = (fy - 1.3) / 1.6, sg = hs3 > 0.5 ? 1.0 : -1.0;
      float room = 0.16 + 0.5 * exp(-(wx - sg * 0.45) * (wx - sg * 0.45) * 2.5 - (wy - 0.3) * (wy - 0.3) * 5.0);
      room *= (1.0 - 0.45 * wy) * (0.85 + 0.3 * hs3);
      float cur = smoothstep(0.15, -0.05, wx * sg) * (0.4 + 0.15 * sin(wx * 26.0 + hs3 * 9.0));
      vec3 wc = mix(vec3(0.012, 0.014, 0.02) * (1.0 + 2.0 * eave * dot(lcb, vec3(0.3)) / dot(dw, dw) * 12.0), vec3(1.0, 0.66, 0.36) * room * mix(1.0, cur, step(0.0, -wx * sg)), lit) * mull;
      bc = mix(bc, wc, win);
      float door = barc(lx - bw * 0.5, 0.7, 0.03) * step(fy, 2.3);
      bc = mix(bc, bc * 0.3, door * step(0.5, big));
      float roof = step(bh, Hb2) * step(Hb2, bh + 0.5 + 1.4 * (1.0 - abs(lx / bw * 2.0 - 1.0)) * big);
      bc = mix(bc, mix(vec3(0.015), vec3(0.6, 0.64, 0.72) * (uMoonL * 0.6 + uAmb), uKG[uKi.y].w), roof);
      if (Hb2 < bh || roof > 0.5) ov(c, a, mix(bc, uFogC, fogK * 0.3), 1.0);   // opaque: no light behind shows through it
    }
    // lamp posts on the platform
    float zl = 5.5, dl = (p.x - 0.5) * zl, Hl = EYE - dy * zl;
    float n = floor((dl - uSt.x - 9.0) / 18.0 + 0.5), lx = uSt.x + 9.0 + n * 18.0;
    if (lx > uSt.x && lx < uSt.y) {
      float pwl = uPx * zl + blur * 0.45;
      float post = barc(dl - lx, 0.06, pwl) * step(1.0, Hl) * step(Hl, 3.9);
      ov(c, a, vec3(0.01), post);
      vec3 lc = big > 0.5 ? vec3(1.0, 0.55, 0.2) : vec3(1.0, 0.82, 0.58);
      float r = length(vec2(dl - lx, Hl - 3.95));
      c += lc * (7.0 * smoothstep(0.16, 0.1, r) + 0.6 * exp(-r * 4.0) + 0.04 * exp(-r * 1.2));
      float cone = smoothstep(0.08 + (3.95 - Hl) * 0.3, 0.0, abs(dl - lx)) * step(1.0, Hl) * step(Hl, 3.9);
      c += lc * cone * 0.012 * (1.0 + 3.0 * (uWx.x + uWx.y + uWx.w));
      // moths around the lamp
      if (uSt.w > 1.5) for (int i = 0; i < uL6; i++) { vec2 m = uMoth[i].xy - p; float md = length(m * vec2(1.0, 1.4)); c += vec3(1.0, 0.85, 0.6) * uMoth[i].z * smoothstep(0.0028, 0.0008, md); }
    }
  }
  // telegraph poles and their wires (9 m), not along platforms or bridges
  {
    float rx = (p.x - 0.5) * ZP, X = uOff.y + rx;
    float d = (fract(X / 45.0 + 0.5) - 0.5) * 45.0;
    float H = EYE - dy * ZP;
    float pr = rx - d;
    float hide = max(step(uSt.x - 4.0, pr) * step(pr, uSt.y + 4.0) * step(0.5, uSt.w), step(uBr.x - 2.0, pr) * step(pr, uBr.y + 2.0));
    hide = max(hide, step(uTun.x - 8.0, pr) * step(pr, uTun.y + 8.0));
    if (hide < 0.5) {
      float pw = blur * ZP / ZP + uPx * ZP;
      float pole = barc(d, 0.14, pw) * step(-1.0, H) * step(H, 7.6);
      float arm = barc(d, 0.75, pw) * barc(H - 6.95, 0.06, uPx * ZP);
      float f = fract(X / 45.0);
      float sag = 4.0 * f * (1.0 - f);
      float wpx = uPx * ZP * 1.2;
      float wr = 0.0;
      wr = max(wr, barc(H - (7.0 - 0.9 * sag), 0.012, wpx));
      wr = max(wr, barc(H - (6.75 - 0.95 * sag), 0.012, wpx));
      wr = max(wr, barc(H - (7.45 - 0.8 * sag), 0.012, wpx));
      vec3 pc = vec3(0.025, 0.02, 0.016) * (uMoonL * 0.8 + uAmb) + trainLight(0.0, ZP, H) * 0.04;
      ov(c, a, pc, max(pole, arm));
      ov(c, a, vec3(0.006, 0.006, 0.008), wr * 0.85);
    }
  }
  // crossing lamps (7 m), flashing in turn
  if (abs(uXing.x) < 60.0 && uXing.w < 0.5) {
    float d = (p.x - 0.5) * 7.0 - (uXing.x - 4.0), H = EYE - dy * 7.0, pw = uPx * 7.0 + blur * 0.8;
    float post = barc(d, 0.06, pw) * step(-1.0, H) * step(H, 2.9);
    float plate = barc(d, 0.5, pw) * barc(H - 2.55, 0.18, pw);
    ov(c, a, vec3(0.015), max(post, plate));
    float r1 = length(vec2(d + 0.3, H - 2.55)), r2 = length(vec2(d - 0.3, H - 2.55));
    vec3 rc = vec3(1.0, 0.07, 0.02);
    c += rc * (uXing.y * (5.0 * smoothstep(0.13, 0.08, r1) + 0.5 * exp(-r1 * 2.0)) + (1.0 - uXing.y) * (5.0 * smoothstep(0.13, 0.08, r2) + 0.5 * exp(-r2 * 2.0)));
  }
  // the other train, rushing the other way
  if (uOT.z > 0.0) {
    float zo = 4.6, d = (p.x - 0.5) * zo - uOT.x, H = EYE - dy * zo;
    float bo = (uV + uOT.w) / 60.0 + uPx * zo;
    if (d > -1.0 && d < uOT.y + 1.0) {
      float body = clamp(d / bo + 0.5, 0.0, 1.0) * clamp((uOT.y - d) / bo + 0.5, 0.0, 1.0);
      float cl = mod(d, 26.0);
      float gap = smoothstep(bo + 0.6, 0.6 - 0.01, min(cl, 26.0 - cl));
      float wf = fract(d / 2.4);
      float duty = 0.55, sharp = clamp(bo / 2.4, 0.0, 1.0);
      float win = mix(smoothstep(0.5 * duty + 0.5 * sharp + 0.01, 0.5 * duty - 0.5 * sharp, abs(wf - 0.5)), duty, smoothstep(0.4, 1.0, sharp));
      win *= step(abs(H - 2.45), 0.45) * (1.0 - smoothstep(0.0, 4.0, 4.0 - min(cl, 26.0 - cl)) * 0.0);
      vec3 bc = vec3(0.03, 0.05, 0.06) * (uMoonL + uAmb) + vec3(0.05, 0.04, 0.03) * 0.15;
      float won = mix(step(0.25, hsh(floor(d / 2.4))), 0.75, smoothstep(0.3, 1.0, sharp));
      bc = mix(bc, vec3(1.0, 0.82, 0.58) * (0.12 + 0.16 * smoothstep(2.1, 2.85, H)) * won, win * (1.0 - gap));
      bc = mix(bc, vec3(0.004), gap * 0.9);
      float stripe = step(abs(H - 1.6), 0.1);
      bc = mix(bc, vec3(0.25, 0.05, 0.03) * (uMoonL + uAmb + 0.1), stripe * (1.0 - gap));
      ov(c, a, bc, body * uOT.z);
      float hl = length(vec2((d + 0.0) * 0.2, H - 1.4));
      c += vec3(1.0, 0.95, 0.85) * 3.0 * exp(-hl * 3.0) * uOT.z * step(d, 0.5);
    }
  }
  // bridge girders (3.6 m), lit by the carriage windows
  if (uBr.x < 4.0 && uBr.y > -4.0) {
    float zb = 3.6, rx = (p.x - 0.5) * zb, H = EYE - dy * zb, X = uOff2.z + rx;
    if (rx > uBr.x && rx < uBr.y) {
      float bb = blur + uPx * zb;
      float lx = mod(X, 6.0);
      float vert = barc(lx - 3.0, 0.22, bb);
      float dg = (lx - H * 6.0 / 7.0 * (mod(floor(X / 6.0), 2.0) * 2.0 - 1.0)) ;
      dg = mod(dg + 3.0, 6.0) - 3.0;
      float diag = barc(dg * 0.76, 0.16, bb);
      float m = max(vert, diag) * min(1.0, 0.5 / (bb * 2.0 + 0.1));   // at speed the girders smear thin: the river shows through
      vec3 gc = vec3(0.03, 0.03, 0.034) * (uMoonL + uAmb) + vec3(1.0, 0.7, 0.42) * 0.07 * (0.2 + uOurL * 0.5) * smoothstep(3.8, 2.0, H);
      ov(c, a, gc, m);
    }
  }
  // weather in the air: snow, rain or fireflies, three depths of one particle sheet
  if (uPt.x > 0.0) {
    float sf = smoothstep(0.06, 0.3, blur);
    for (int i = 0; i < uL3; i++) {
      float zl = i == 0 ? 3.5 : i == 1 ? 8.0 : 18.0, fi = float(i);
      vec2 wp = vec2(uOff2.y + (p.x - 0.5) * zl + fi * 2.17, (p.y - YH) * zl + fi * 1.37);
      vec2 sp = vec2(wp.x + wp.y * uPt.z + uPt.w * sin(wp.y * 0.7 + uT * 0.5 + fi), wp.y * uPtC.w - uT * uPt.y) / uPtD.x + fi * 0.31;
      if (uPt.x < 1.5) sp.x /= 1.0 + 2.2 * sf;
      vec4 d = textureLod(uD, sp, 0.0);
      float a = uPt.x > 2.5 ? d.r : uPt.x > 1.5 ? d.g : mix(d.r, d.g * (0.5 - 0.3 * sf), sf);
      float nz = textureLod(uN, sp * 0.37 + fi * 0.17, 0.0).r;
      float g = i == 0 ? 0.2 : 1.0;
      vec3 lc = uMoonL * 0.6 + uAmb * 2.0 + trainLight((p.x - 0.5) * zl, zl, EYE - (p.y - YH) * zl) * uPtD.y;
      if (uPt.x > 2.5) {
        // fireflies: one hashed point per 1.5 m cell, each with its own blink, streaked by the train's motion
        vec2 w2 = vec2(wp.x, wp.y) / 1.5, ce = floor(w2);
        float h = hsh2(ce + fi * 7.31), ph = fract(h * 91.7) * 6.2832;
        vec2 fp = ce + 0.25 + 0.5 * vec2(fract(h * 13.1), fract(h * 37.9)) + 0.08 * vec2(sin(uT * 0.4 + ph), cos(uT * 0.33 + ph));
        vec2 dd = (w2 - fp) * 1.5;
        float bw = blur * 0.12, ddx = max(abs(dd.x) - bw, 0.0), r = length(vec2(ddx, dd.y)), px = zl * uPx;
        float core = 0.03 / (0.03 + bw) * smoothstep(0.022 + px, 0.0, r), halo = 0.03 / (0.03 + bw) * exp(-r * 22.0);
        float bl = pow(max(0.0, sin(uT * 1.7 + ph)), 6.0) * step(h, 0.45) * step(0.5, fi);
        a = (core * 3.0 + halo * 0.6) * bl * smoothstep(-0.03, 0.04, p.y - YH);
        lc = vec3(1.0); g = 1.0; nz = 1.0;
      }
      c += uPtC.rgb * lc * a * uPtD.z * g * smoothstep(0.3, 0.6, nz + 0.2);
    }
  }
  o = vec4(c / uOS, a);
}`,re=tt.slice(0,tt.indexOf(`
void main() {`))+`

void main() {
  vec2 p = uRect.xy + vec2(vUv.x, 1.0 - vUv.y) * uRect.zw;
  p.y += uBob;
  float dy = p.y - YH, blur = uV / 60.0;
  o = vec4(0.0);
  // tunnel walls (3.2 m): an old brick-lined bore streaming past. Its marks are read stretched along the line (courses,
  // soot rising to the crown, wet shine low down), lime runs across it; two cables sag between their brackets; a refuge
  // niche every 30 m or so; our windows' light lies on it as soft patches with a dim fill between; a caged lamp each 40 m
  if (uTun.x < 3.0 && uTun.y > -3.0) {
    float zt = 3.2, rx = (p.x - 0.5) * zt, H = EYE - dy * zt, X = uOff2.z + rx;
    float inT = smoothstep(uTun.x - 0.2, uTun.x + 0.2, rx) * smoothstep(uTun.y + 0.2, uTun.y - 0.2, rx);
    if (inT > 0.0) {
      float bl = log2(1.0 + blur * 20.0), mpp = uPx * zt, sw = blur + mpp, sm = smoothstep(0.03, 0.35, blur);
      vec4 nA = textureLod(uN, vec2(X * 0.025, H * 0.9), max(log2(mpp * 115.0), 0.0));
      vec4 nB = textureLod(uN, vec2(X * 0.5, H * 0.06), bl);
      vec4 nC = textureLod(uN, vec2(X * 0.2, H * 0.25), bl * 0.7);
      // brick courses 7.5 cm, each brick its own tone; at speed a brick smears into its course's streak
      float ch = H / 0.075, cid = floor(ch), bx = X / 0.23 + 0.5 * mod(cid, 2.0);
      float bt = mix(0.7 + 0.6 * hsh(cid * 1.7 + floor(bx) * 0.31), 0.9 + 0.2 * hsh(cid * 1.7), sm);
      float jt = max(1.0 - barc(fract(ch) - 0.5, 0.43, mpp / 0.075 + 0.02), (1.0 - barc(fract(bx) - 0.5, 0.47, (sw + mpp) / 0.23)) * (1.0 - sm));
      vec3 wa = vec3(0.044, 0.041, 0.037) * (0.8 + 0.4 * nA.b) * bt;
      wa = mix(wa, vec3(0.075, 0.072, 0.066) * (0.6 + 0.6 * nC.b), jt * 0.45 * smoothstep(0.25, 0.75, nC.b + 0.25 * nB.g) * (1.0 - smoothstep(0.012, 0.03, mpp)));
      // lime runs: pale streaks down from the joints, lower on the wall; rough patches where the lining has spalled
      float lime = smoothstep(0.6, 0.82, nB.b) * smoothstep(0.35, 0.65, nC.r) * smoothstep(3.4, 2.4, H);
      wa = mix(wa, vec3(0.12, 0.118, 0.105) * (0.7 + 0.5 * nA.g), lime * 0.7);
      wa *= 0.7 + 0.6 * smoothstep(0.2, 0.8, nC.a);
      // soot, thick toward the crown, in clouds that stream along the line
      float soot = smoothstep(2.5, 3.7, H + (nA.r - 0.5) * 0.9 + (nC.g - 0.5) * 0.3);
      wa *= 1.0 - 0.75 * soot;
      // a refuge niche (cell 30 m, as 240 / 8)
      float ci = floor(X / 30.0), nd = X - (ci * 30.0 + 15.0 + (hsh(ci + 3.3) - 0.5) * 16.0);
      float ntop = 2.3 + 0.28 * mix(sqrt(max(1.0 - nd * nd / 0.36, 0.0)), 0.6, smoothstep(0.1, 0.6, blur));
      float nich = clamp((0.6 - abs(nd)) / sw + 0.5, 0.0, 1.0) * clamp((ntop - H) / (mpp + 0.08 * sm) + 0.5, 0.0, 1.0);
      // our windows' light: soft patches (half a metre of penumbra), strongest from 1.6 to 2.6 m, dim between
      float pn = floor(rx / 2.3 + 0.5), f = rx - pn * 2.3;
      float on = pn == 0.0 ? uOurL : step(hsh(pn + 0.5), 0.72) * 0.85;
      float pat = on * smoothstep(1.0, 0.4, abs(f)) * smoothstep(1.0, 1.6, H) * smoothstep(3.9, 2.6, H);
      float fill = 0.1 * smoothstep(4.2, 2.2, H) * (0.4 + 0.6 * uOurL);
      vec3 Lw = vec3(1.0, 0.72, 0.45) * (fill + 0.32 * pat);
      // the lamp: a small hot core in a cage, a halo on the wet wall, drawn out along the line at speed
      float ld = mod(X, 40.0) - 20.0, lk = 0.07 / (0.07 + blur);
      vec2 lq = vec2(max(abs(ld) - blur * 0.5, 0.0), H - 3.32);
      float lr = length(lq);
      vec3 lcol = vec3(1.0, 0.78, 0.5);
      Lw += lcol * 0.8 * exp(-lr / 0.28) * (0.35 + 0.65 * lk);
      // two cables on brackets every 1.6 m, sagging between; their shadow lies above them (the light comes from below)
      float fb = fract(X / 1.6), sg = 0.035 * 4.0 * fb * (1.0 - fb), sk = smoothstep(0.05, 0.4, blur);
      float sgE = mix(sg, 0.035 * 0.667, sk), cw = 0.014 + 0.0175 * sk, ca = 0.014 / cw;
      float c1 = barc(H - (2.46 - sgE), cw, mpp) * ca, c2 = barc(H - (2.62 - sgE), cw, mpp) * ca;
      float sh = max(barc(H - (2.52 - sgE), cw + 0.012, 0.02), barc(H - (2.68 - sgE), cw + 0.012, 0.02)) * 0.45 * pat;
      float brk = barc(fb * 1.6 - 0.8, 0.018, sw) * step(2.4, H) * step(H, 2.74) * (1.0 - nich);
      wa *= 1.0 - sh;
      wa = mix(wa, wa * 0.12, nich);
      vec3 cc = wa * Lw * 2.0;
      // wet shine low on the wall: streaks of our own light
      cc += vec3(1.0, 0.75, 0.5) * smoothstep(0.62, 0.85, nA.g) * smoothstep(3.0, 2.2, H) * (0.012 * pat + 0.08 * exp(-lr / 0.4)) * (1.0 - nich) * (1.0 - soot);
      // cables and brackets: black, a warm line along the cable's lower edge where our light catches it
      float cab = max(c1, c2);
      float cgl = c1 * smoothstep(0.0, -0.6 * cw, H - (2.46 - sgE)) + c2 * smoothstep(0.0, -0.6 * cw, H - (2.62 - sgE));
      cc = mix(cc, vec3(0.004), max(cab, brk * 0.9));
      cc += vec3(1.0, 0.72, 0.45) * 0.02 * (pat + 0.2) * cgl;
      cc += lcol * (0.5 * smoothstep(0.05, 0.025, lr) * lk + 0.05 * exp(-lr / 0.09) * lk) * smoothstep(blur * 0.5 + 0.06, blur * 0.15, abs(ld)) * (1.0 - 0.6 * barc(mod(ld + 0.025, 0.05) - 0.025, 0.006, mpp + blur) * (1.0 - sm));
      float pf = smoothstep(1.2, 0.0, rx - uTun.x) * step(uTun.x, rx);
      cc = mix(cc, vec3(0.06, 0.055, 0.05) * (uMoonL + uAmb + 0.2) * (0.6 + 0.6 * nA.r), pf * 0.7);
      o = vec4(cc * inT / uOS, inT);
    }
  }
}`,le=S0+`
uniform sampler2D uR1, uR2, uO, uW1, uW2;
uniform float uT, uPx, uLamp, uBlind, uGreen, uFrost, uGR, uExp, uOS;
uniform vec3 uOutL, uShade, uBlindC, uAmb;
uniform vec4 uDrop, uTea, uRect;
vec3 dec(vec3 c) { return c * c * 4.0; }
void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y);
  vec4 r1 = texture(uR1, vUv), r2 = texture(uR2, vUv);
  float ga = r1.a;
  // rain on the outside of the glass, one baked texel a pixel at 1000 px: beads that stay where they landed (w2: at speed
  // only the fine spray holds), and runners the air drags back along the pane, each a head with a beaded tail, and
  // wavering threads (w1: when the train stands, only a few, running down); slopes in r, g, a mask in a
  vec2 dn = vec2(0.0); float wet = 0.0;
  if (uGR > 0.0) {
    vec2 rq = vec2(p.x * uDrop.z - p.y * uDrop.w, p.x * uDrop.w + p.y * uDrop.z);
    vec4 w1 = texture(uW1, rq * 1.95 + uDrop.xy), w2 = texture(uW2, p * 1.95 + vec2(0.37, 0.61));
    float m1 = max(uTea.z, smoothstep(0.07, 0.05, w1.a)), m2 = mix(1.0, smoothstep(0.6, 0.4, w2.a), uTea.z);
    vec2 g1 = (w1.rg - 0.5) * 2.55 * m1;
    dn = vec2(g1.x * uDrop.z + g1.y * uDrop.w, g1.y * uDrop.z - g1.x * uDrop.w) + (w2.rg - 0.5) * 2.55 * m2;
    wet = max(w1.b * m1, w2.b * m2);
  }
  vec3 base = dec(r2.rgb) + dec(r1.rgb) * uLamp + uOutL * r2.a;
  vec3 col = base;
  float blindA = 0.0;
  if (ga > 0.0) {
    float bE = uBlind;
    blindA = smoothstep(bE + uPx, bE - uPx, p.y);
    if (blindA < 1.0) {
      vec2 q = p + dn * 0.012;   // a bead is a small lens: it shows what lies across it, upside down
      vec2 ou = (q - uRect.xy) / uRect.zw;
      vec3 oc = texture(uO, vec2(ou.x, 1.0 - ou.y)).rgb * uOS;
      float g = sdPane(p);
      if (uGR > 0.0) {
        // the water's face gives back a little of the lit room; a bead's steep rim turns the dark into it (a hairline);
        // and it carries one pin-point of the lamp on the lamp's side, where its surface faces half-way between the
        // lamp and the eye: beads by the shade glint, far ones don't
        vec3 bn = normalize(vec3(-dn, 1.0)), bl = vec3(vec2(LB.x, 0.535) - p, 0.15);
        float dl = length(bl.xy);
        oc *= 1.0 - 0.5 * smoothstep(0.4, 1.0, length(dn));
        oc += vec3(1.0, 0.75, 0.45) * uLamp * (0.02 * smoothstep(0.0, 0.6, wet) * (0.4 + 0.3 * exp(-dl * 3.0)) + pow(max(dot(bn, normalize(normalize(bl) + vec3(0.0, 0.0, 1.0))), 0.0), 40.0) * 0.008 / (dl * dl + 0.01) * smoothstep(0.5, 0.3, dl));
      }
      oc *= 0.45 + 0.55 * smoothstep(0.0, 0.011, -g);
      if (uFrost > 0.0) {
        float fn = textureLod(uN, p * 7.0, 0.0).r * 0.6 + textureLod(uN, p * 41.0, 0.0).b * 0.4;
        float fr = smoothstep(0.0, 0.1, g + 0.07 + fn * 0.06) * uFrost;
        oc = mix(oc, (vec3(0.5, 0.55, 0.6) * 0.04 + vec3(1.0, 0.8, 0.6) * 0.05 * uLamp * exp(-length(p - LB.xy) * 3.0)) * (0.6 + 0.8 * fn), fr * 0.85);
      }
      col += oc * ga * 0.92 * (1.0 - blindA);
    }
    if (blindA > 0.0) {
      vec3 P = vec3(p, 0.0);
      vec3 lt = lampAt(P, vec3(0.0, 0.0, 1.0), uShade, uGreen) * uLamp * 1.6 + uAmb * 0.4 + uOutL * 0.5 + vec3(0.003, 0.004, 0.006);
      // matt cloth: a faint broad unevenness and a little sag between the hem bar and the roller, no streaks
      float wv = 0.93 + 0.12 * textureLod(uN, p * vec2(2.5, 1.5) + 0.3, 0.0).g;
      float sag = 1.0 - 0.06 * smoothstep(0.0, 0.3, abs(p.x - 0.5)) * smoothstep(bE - 0.06, bE - 0.01, p.y);
      vec3 bc = uBlindC * lt * wv * sag;
      float barD = abs(p.y - bE + 0.006) - 0.006;
      bc = mix(bc, uBlindC * 0.4 * lt + vec3(1.0, 0.8, 0.6) * 0.04 * uLamp * smoothstep(0.003, -0.006, p.y - bE + 0.006), smoothstep(uPx, -uPx, barD));
      float tab = sdBox(p, vec2(0.5, bE + 0.012), vec2(0.012, 0.01), 0.006);
      bc = mix(bc, uBlindC * 0.3 * lt, smoothstep(uPx, -uPx, tab));
      col = mix(col, bc, blindA * ga);
      col += smoothstep(uPx, -uPx, tab) * uBlindC * 0.3 * lt * (1.0 - ga);
    }
  }
  // tea trembling with the rails
  vec2 tq = (p - TEA.xy) / TEA.zw; float tr = length(tq);
  if (tr < 1.0) {
    float rip = sin(tr * 15.0 - uTea.y) * uTea.x * (1.0 - tr) + sin(tq.x * 9.0 + uTea.y * 0.7) * uTea.x * 0.4;
    vec2 hp = tq - vec2(-0.4, -0.2) + rip * tq * 0.8;
    col += vec3(1.0, 0.75, 0.45) * uLamp * (0.6 * exp(-dot(hp, hp) * 30.0) + 0.03 * (0.5 + rip * 3.0)) * smoothstep(1.0, 0.85, tr);
  }
  col *= uExp;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.4545));
  vec2 vq = p - 0.5; col *= 1.0 - 0.42 * dot(vq, vq);
  col += (hsh2(p * 1000.0 + fract(uT * 7.13) * 91.0) - 0.5) * 0.028;
  o = vec4(col, 1.0);
}`;function u0(e,t){const r=(v,u)=>{const z=e.createShader(v);return e.shaderSource(z,u),e.compileShader(z),z},h=e.createProgram(),T=r(e.VERTEX_SHADER,te),i=r(e.FRAGMENT_SHADER,t);return e.attachShader(h,T),e.attachShader(h,i),e.linkProgram(h),{p:h,u:{},sh:[T,i]}}const Tt=["room","roomf","strip","out","ovl","fin"];function p0(e,t,r,h,T,i){const v=e.createTexture();return e.bindTexture(e.TEXTURE_2D,v),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,r,0,e.RGBA,e.UNSIGNED_BYTE,h),T&&e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,T?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,i?e.REPEAT:e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,i===2?e.REPEAT:e.CLAMP_TO_EDGE),v}function ne(e){let t=St.get(e);if(t)return t;e.getExtension("KHR_parallel_shader_compile"),t={roomf:u0(e,oe),room:u0(e,ee),strip:u0(e,ae),out:u0(e,se),ovl:u0(e,tt),fin:u0(e,le),vao:e.createVertexArray(),ok:!1},e.flush(),t.half=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float");const r=128,h=(o,a,f,w)=>{o=(o%f+f)%f,a=(a%f+f)%f;let L=o*374761393+a*668265263+w*2246822519|0;return L=Math.imul(L^L>>>13,1274126177),L^=L>>>16,(L>>>0)/4294967296},T=(o,a,f,w)=>{const L=Math.floor(o),k=Math.floor(a),q=o-L,H=a-k,F=q*q*(3-2*q),M=H*H*(3-2*H),R=h(L,k,f,w),b=h(L+1,k,f,w),X=h(L,k+1,f,w),Z=h(L+1,k+1,f,w);return R+(b-R)*F+(X-R)*M+(R-b-X+Z)*F*M},i=(o,a,f,w,L)=>{let k=0,q=.5,H=f,F=0;for(let M=0;M<w;M++)k+=q*T(o*H/r,a*H/r,H,L+M),F+=q,q*=.5,H*=2;return k/F},v=new Uint8Array(r*r*4);for(let o=0;o<r;o++)for(let a=0;a<r;a++){const f=(o*r+a)*4;v[f]=i(a,o,4,5,3)*255,v[f+1]=i(a,o,8,4,19)*255,v[f+2]=(T(a*32/r,o*32/r,32,37)*.55+T(a*64/r,o*64/r,64,41)*.3+h(a,o,128,43)*.15)*255,v[f+3]=i(a,o,16,3,71)*255}for(let o=0;o<4;o++){let a=255,f=0;for(let w=o;w<v.length;w+=4)a=Math.min(a,v[w]),f=Math.max(f,v[w]);for(let w=o;w<v.length;w+=4)v[w]=(v[w]-a)*255/Math.max(1,f-a)}t.noise=p0(e,r,r,v,!0,2);const u=256,z=new Float32Array(u*u*4);let N=2654435769;const I=()=>{N=N+1831565813|0;let o=Math.imul(N^N>>>15,1|N);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},x=(o,a,f,w,L)=>{o=(o%u+u)%u,a=(a%u+u)%u;const k=(a*u+o)*4+f;z[k]=L?Math.max(z[k],w):w};for(let o=0;o<140;o++){const a=I()*u,f=I()*u,w=.05+.95*I(),L=1.3+I()*1.4,k=Math.floor(a),q=Math.floor(f);for(let H=-4;H<=4;H++)for(let F=-15;F<=15;F++){const M=k+F+.5-a,R=q+H+.5-f,b=(M*M+R*R)/(L*L);Math.abs(F)<=4&&(x(k+F,q+H,0,Math.exp(-b*1.4),!0),b<10&&x(k+F,q+H,3,w,!1));const X=4+10*w;x(k+F,q+H,1,Math.exp(-(R*R)/(L*L*.6)-M*M/(X*X)*1.6)*.55,!0)}}const E=new Uint8Array(u*u*4);for(let o=0;o<E.length;o++)E[o]=c0(z[o],0,1)*255;return t.dots=p0(e,u,u,E,!0,2),St.set(e,t),t}function ce(e,t){if(t.w1)return;const r=512,h=r-1;let T=625341585;const i=()=>{T=T+1831565813|0;let x=Math.imul(T^T>>>15,1|T);return x=x+Math.imul(x^x>>>7,61|x)^x,((x^x>>>14)>>>0)/4294967296},v=()=>({h:new Float32Array(r*r),x:new Float32Array(r*r),y:new Float32Array(r*r),m:new Float32Array(r*r)}),u=(x,E,o,a,f,w,L)=>{const k=L>0?1:0,q=Math.floor(E-a-k),H=Math.ceil(E+a+k),F=Math.floor(o-f-k),M=Math.ceil(o+f+k);for(let R=F;R<=M;R++){const b=(R+.5-o)/f,X=(R+.5-o)/(f+1),Z=(R&h)*r;for(let s0=q;s0<=H;s0++){const V=(s0+.5-E)/a,m0=V*V+b*b,W=Z+(s0&h);if(m0<1){const r0=w*(1-m0);r0>x.h[W]&&(x.h[W]=r0,x.x[W]=-2*w*V/a,x.y[W]=-2*w*b/f)}if(L>0){const r0=(s0+.5-E)/(a+1);r0*r0+X*X<1&&L>x.m[W]&&(x.m[W]=L)}}}},z=v(),N=v();for(let x=0;x<12;x++){const E=i()*r,o=i()*r,a=140+i()*340,f=(i()-.5)*.06,w=.55+i()*.4,L=1+i()*3,k=.008+i()*.02,q=i()*6.28,H=.3+i(),F=.05+i()*.05,M=i()*6.28,R=b=>o+f*b+L*Math.sin(b*k+q)+H*Math.sin(b*F+M);for(let b=0;b<a;b+=1){const X=Math.min(1,b/8,(a-b)/40);{const Z=Math.max(.45,w*(.75+.25*Math.sin(b*.13+M))*X);u(z,E+b,R(b),1.2,Z,.5*Z,1)}}u(z,E-1,R(0),2.6,2,1.1,1);for(let b=6+i()*10;b<a-10;b+=8+i()*22){const X=.8+i()*.9;u(z,E+b,R(b)+(i()-.5)*.4,X*1.2,X,.55*X,1)}if(i()<.6){const b=a*(.2+.5*i()),X=f+(i()<.5?-1:1)*(.06+.08*i()),Z=30+i()*90,s0=R(b);for(let V=0;V<Z;V+=.8){const m0=Math.max(.4,w*.7*Math.min(1,(Z-V)/20));u(z,E+b+V,s0+X*V+.6*Math.sin(V*.08+q),1.2,m0,.5*m0,1)}}}for(let x=0;x<650;x++){const E=i()*r,o=i()*r,a=.8+Math.pow(i(),2)*2.2,f=.01+.99*i(),w=5+20*i()*Math.min(1,a/1.6),L=(i()-.5)*.12;u(z,E,o,a*1.35,a,.55*a,f);for(let k=a;k<w;k+=.8){const q=k/w;{const H=Math.max(.4,a*.5*(1-q));u(z,E+k,o+L*k,1.1,H,.4*H*(1-.5*q),f)}}for(let k=a+2+i()*3;k<w;k+=2+i()*4){const q=k/w,H=Math.max(.5,a*(.75-.5*q)*(.6+.4*i()));u(z,E+k,o+L*k+(i()-.5)*.5,H*1.1,H,.55*H,f)}}for(let x=0;x<170;x++){const E=i()*r,o=i()*r,a=1.5+i()*1.5,f=(i()-.5)*a*.8,w=(i()-.5)*a*.6;u(N,E,o,a*(.9+.2*i()),a*(.9+.2*i()),.55*a,1),u(N,E+f,o+w,a*.65,a*.6,.5*a,1)}for(let x=0;x<1500;x++){const E=.45+Math.pow(i(),1.6)*.9;u(N,i()*r,i()*r,E*(.9+.25*i()),E*(.9+.25*i()),.55*E,0)}const I=x=>{const E=new Uint8ClampedArray(r*r*4);for(let o=0,a=0;o<r*r;o++,a+=4)E[a]=127.5+100*x.x[o],E[a+1]=127.5+100*x.y[o],E[a+2]=x.h[o]*160,E[a+3]=x.m[o]*255;return E};t.w1=p0(e,r,r,I(z),!0,2),t.w2=p0(e,r,r,I(N),!0,2)}function ie(e,t){if(t.ok)return;t.ok=!0;for(const h of Tt){const T=t[h];if(!e.getProgramParameter(T.p,e.LINK_STATUS))throw new Error("025 link "+h+": "+e.getProgramInfoLog(T.p)+" "+e.getShaderInfoLog(T.sh[1]))}for(const h of Tt){const T=t[h],i=e.getProgramParameter(T.p,e.ACTIVE_UNIFORMS);for(let v=0;v<i;v++){const u=e.getActiveUniform(T.p,v);T.u[u.name.replace(/\[0\]$/,"")]=e.getUniformLocation(T.p,u.name)}}const r={room:{uN:0},roomf:{uN:0},strip:{uN:0},out:{uN:0,uA:3,uD:4},ovl:{uN:0,uD:4},fin:{uN:0,uR1:1,uR2:2,uO:5,uW1:6,uW2:7}};for(const h in r){e.useProgram(t[h].p);for(const T in r[h])t[h].u[T]&&e.uniform1i(t[h].u[T],r[h][T])}}kt.add({num:25,name:"Sleeper Train",fam:"Worlds",recipe:"A window seat on a sleeper train at night, with the country rolling past. At each junction you can send it to the coast, mountains, a river or a sleeping town. The season and the country change every mint. Tap at a junction to pick the line, drag to pull the blind, hold to stop at a little station, or tap the lamp to switch it off.",interactive:"Tap at a junction to throw the points: the signal's feather of lights swings left or right and the line runs that way. Drag up or down to pull the blind. Hold to brake into a small station, where the train stands a moment under the platform lamps before pulling away. Tap the lamp to switch it off and see the night.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,r=e.size,h=ne(t);ie(t,h);const T=e.hash.slice(2),i=p=>{let c=parseInt(T.slice(p,p+8),16)>>>0,n=parseInt(T.slice(p+8,p+16),16)>>>0,d=parseInt(T.slice(p+16,p+24),16)>>>0,g=parseInt(T.slice(p+24,p+32),16)>>>0;const J=()=>{c>>>=0,n>>>=0,d>>>=0,g>>>=0;let G=c+n|0;return c=n^n>>>9,n=d+(d<<3)|0,d=d<<21|d>>>11,g=g+1|0,G=G+g|0,d=d+G|0,(G>>>0)/4294967296};for(let G=0;G<15;G++)J();return J},v=i(0),u=i(32),z=p=>{let c=0;for(const d of p)c+=d;let n=v()*c;for(let d=0;d<p.length;d++)if(n-=p[d],n<0)return d;return p.length-1};let N=z([30,25,25,20]),I=z([30,25,25,20]),x=z([45,35,20]),E=z([45,35,20]),o=z([30,25,20,17,8]),a=z([55,45]),f=z([82,8,6,4]);e.home&&(N=1,I=0,x=0,E=0,o=0,a=0,f=0),f===2&&(I=1,N===2&&(N=0)),f===3&&((N===2||N===3)&&(N=1),o<2&&(o=3));const w=["Snowy forest","Summer fireflies","Autumn rain","Misty spring"],L=["Lake country","Steppe","Mountain line","Coast"],k=["Old wood sleeper","Modern couchette","Brass luxury car"],q=["Cream pleated shade","Amber silk shade","Green glass shade"],H=["Full moon","Gibbous moon","Half moon","Crescent","Low amber moon"];e.trait("Season",w[N]),e.trait("Country",f===3?"Salt flat":L[I]),e.trait("Compartment",k[x]),e.trait("Lamp",q[E]),e.trait("Moon",H[o]),e.trait("Pace",["Night express","Slow stopping train"][a]),e.trait("Rare",["None","A train passing the other way","Aurora over the steppe","Stars mirrored in a salt flat"][f]);const F=f===3?4:I,M=N===0,R=N===1,b=N===2,X=N===3;b&&ce(t,h);const Z=o===4?.36+v()*.3:.33+v()*.36,s0=o===4?.315+v()*.02:.17+v()*.08,V=o===4?.03:.019,m0=[-1,-.45,0,.55,-1][o]*(v()<.5,1),W=[1,.8,.55,.32,.7][o]*(b?.55:1)*(f===3?.6:1),r0=o===4?[.3*W,.21*W,.13*W]:[.2*W,.24*W,.32*W],fe=o===4?[2.4,1.3,.55]:[2.6,2.55,2.4],C0=M?[.022,.026,.036]:[.014,.017,.026];let d0=[.02,.026,.042],Lt=[.0015,.0025,.007];b&&(d0=[.016,.017,.02],Lt=[.006,.0065,.008]),X&&(d0=[.034,.038,.046]),o===4&&(d0=[d0[0]*1.5,d0[1]*1.15,d0[2]]);const Mt=X?[.04,.044,.052]:b?[.02,.021,.025]:M?[.03,.035,.048]:[.022,.028,.042],At=X?.7:b?.35:M?.15:.1,M0=[b?.25:X?.55:1,f===3?1:R?.25:0,f===2?1:0,b?.9:M?.45:X?.3:.12],x0=[M?1:0,b?1:0,R?1:0,At];f===3&&(x0[0]=x0[1]=x0[2]=0,M0[3]=0);const B0=f===3?[0,0,0,0]:M?[1,.9,0,.25]:b?[2,3,.12,0]:R?[3,.05,0,.6]:[0,0,0,0],U0=M?[.75,.8,.9,1]:b?[.5,.55,.6,.35]:[.75,1,.25,1],et=M?[6,.25,.6]:b?[6,.5,.1]:[3,0,1],A0=M?[.5,.53,.6]:R?[.026,.034,.017]:b?[.034,.027,.016]:[.027,.036,.022],i0=M?.85:0,Ht=[],Rt=[],zt=[],ot=M?0:.55,at=[[[...A0,i0],[35,1e5,M?-1:.5,2],[.22,11,0,ot]],[[...A0,i0],[1e5,1e5,0,3],[.35,2.5,0,ot*.6]],[[...A0,i0],[1e5,1e5,0,1],[.45,14,0,0]],[[...A0,i0],[110,1e5,0,3],[.4,2.5,0,ot*.4]],[[.42,.42,.45,0],[14,1e5,0,0],[0,0,2,0]]][F];at[1][2]<0&&(at[1][0]=1e5);const he=[at,[[.12,.105,.08,i0*.6],[40,1e5,0,6],[.75,1.3,0,0]],[[.07,.07,.065,i0],[1e5,1e5,0,5],[1,10,0,0]],[[...A0,i0],[14,300,0,0],[0,0,0,0]],[[.07,.068,.065,i0],[1e5,1e5,0,4],[.6,9,0,0]]];for(const p of he)Ht.push(...p[0]),Rt.push(...p[1]),zt.push(...p[2]);const ue=new Float32Array(Ht),pe=new Float32Array(Rt),me=new Float32Array(zt),de=[[[.035,.09,.05],[.17,.025,.03],[.26,.17,.035]],[[.035,.05,.13],[.09,.1,.12],[.12,.05,.035]],[[.28,.02,.03],[.03,.12,.07],[.06,.04,.12]]][x][Math.floor(v()*3)],Ne=[[.06,.06,.065],[.32,.2,.1],[.04,.055,.11],[.08,.11,.06]][Math.floor(v()*4)],xe=[[.3,.13,.055],[.23,.23,.24],[.2,.06,.03]][x],ve=[[.28,.12,.05],[.36,.36,.37],[.22,.07,.035]][x],be=[[.7,.56,.36],[.6,.6,.62],[.85,.6,.25]][x],we=[[.55,.48,.36],[.38,.4,.44],[.36,.08,.06]][x],qt=[[1,.8,.52],[1,.5,.17],[.12,.55,.22]][E],Pt=E===2?1:0,Nt=v()*10,v0=Math.min(r,1024),Xt=r>=600?2048:1024,G0=r>=600?160:80;h.bk||(h.bk=new Map);const Dt=e.hash+":"+r,b0=h.bk.get(Dt),st=b0?b0[0]:p0(t,v0,v0,null,!1,!1),rt=b0?b0[1]:p0(t,v0,v0,null,!1,!1),K0=b0?b0[2]:p0(t,Xt,G0*10,null,!1,1);if(!b0){const p=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,p),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.bindVertexArray(h.vao),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,h.noise);let c,n;for(let d=0;d<2;d++){t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,d?rt:st,0),t.viewport(0,0,v0,v0);for(let g=0;g<2;g++)c=g?h.roomf:h.room,n=c.u,t.useProgram(c.p),t.uniform1i(n.uSty,x),t.uniform3fv(n.uShade,qt),t.uniform3fv(n.uCurt,de),t.uniform3fv(n.uWall,xe),t.uniform3fv(n.uWood,ve),t.uniform3fv(n.uMetal,be),t.uniform1f(n.uPx,1/v0),t.uniform1f(n.uGreen,Pt),t.uniform1f(n.uSd,Nt),t.uniform1i(n.uMode,d),t.uniform1i(n.uL2,2),g&&(t.enable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ZERO,d?t.ONE:t.ONE_MINUS_SRC_ALPHA)),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.BLEND)}c=h.strip,n=c.u,t.useProgram(c.p),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,K0,0),t.uniform1i(n.uReg,F),t.uniform1i(n.uSea,N),t.uniform3fv(n.uMoonL,r0),t.uniform3fv(n.uFogC,Mt),t.uniform3fv(n.uAmb,C0),t.uniform1f(n.uSd,Nt),t.uniform1f(n.uMdir,Z>.5?1:-1),t.uniform1f(n.uRows,G0),t.uniform1f(n.uMist,At),t.uniform1i(n.uL2,2),t.uniform1i(n.uL3,3);for(let d=0;d<5;d++)for(let g=0;g<2;g++)t.viewport(0,(d*2+g)*G0,Xt,G0),t.uniform1i(n.uK,d),t.uniform1i(n.uL,g),t.drawArrays(t.TRIANGLES,0,3);t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(p),t.bindTexture(t.TEXTURE_2D,K0),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),h.bk.size>=3&&h.bk.delete(h.bk.keys().next().value),h.bk.set(Dt,[st,rt,K0])}const H0=Math.ceil(.69*r),R0=Math.ceil(.505*r),Y=[.155,.105,H0/r,R0/r],lt=h.half?1:2,nt=t.createTexture();t.bindTexture(t.TEXTURE_2D,nt),h.half?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,H0,R0,0,t.RGBA,t.HALF_FLOAT,null):t.texImage2D(t.TEXTURE_2D,0,t.SRGB8_ALPHA8,H0,R0,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const Ft=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,Ft),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,nt,0),t.bindFramebuffer(t.FRAMEBUFFER,null);const z0=a===0?33:24,ge=[1400,1150,1500,950,1150],A=[],q0=(p,c)=>{const n=ge[p]*(.85+u()*.3),d=c+n,g={k:p,s:c,e:d,tun:[],br:null,st:null,xing:[],opts:null,ch:u()<.5?0:1};if(p===2){let O=c+220;const o0=1+(u()<.6?1:0);for(let L0=0;L0<o0&&O<d-450;L0++){const D=170+u()*170;g.tun.push([O,O+D]),O+=D+180+u()*200}}if(p===3&&(g.br=[c+160,d-160]),p===4){const O=c+380+u()*120;g.st=[O,O+190,1,O+30,O+150],g.xing.push(O+330)}if(p===0||p===1)for(let O=c+250+u()*200;O<d-300;O+=450+u()*400)u()<.6&&g.xing.push(O);const J=[0,1,2,3,4].filter(O=>O!==p),G=J.splice(Math.floor(u()*J.length),1)[0],_0=J[Math.floor(u()*J.length)];return g.opts=[G,_0],g.car=g.xing.map(()=>u()<.5),g};let Y0=e.home?0:[0,0,1,2,3,4][Math.floor(v()*6)];(F===4&&v()<.6||f===2)&&(Y0=0);const Ot=i(24),_t=!e.home&&f<2&&Ot()<.16;_t&&(Y0=4);let s,y;A.push(q0(Y0===0?4:0,-2e3)),A[0].e=0,A.push(q0(Y0,0)),A.push(q0(A[1].opts[A[1].ch],A[1].e));const f0=()=>A[1];if(e.home)s=A[1].e-120-10-15,y=4;else{s=A[1].s+(.1+.4*v())*(A[1].e-A[1].s);for(const c of A[1].tun)s>c[0]-z0*30&&s<c[1]+30&&(s=c[1]+40);const p=A[1].e-120;y=s>p-600?4:z0}let w0=!1,P0=1,ct=A[2].k,N0=0,e0=null,g0=null,E0=0,Ct=!1;_t&&(e0={x:A[1].st[0]+9+18*5-1.2},s=e0.x,y=0,E0=9+Ot()*6,e.trait("Pace","Standing at a station"));let U=null,it=e.home?1e9:8+v()*30,y0=.105,W0=.105;!e.home&&f<2&&v()<.3&&(y0=W0=.2+v()*.17);let T0=1,I0=1;const ye=i(16),Bt=!e.home&&ye()<.2;Bt&&(T0=I0=0),e.trait("Lamp lit",Bt?"Off: moonlight only":"On"),e.trait("Blind",y0>.15?"Half drawn":"Up");let X0=0,Ut=0,D0=0,Z0=0,V0=0,Gt=v()*5,ke=v()*5,j=v()*50;const Kt=[0,0,0,0].map((p,c)=>Math.floor((s+[-11.2,-8.7,8.7,11.2][c])/25));let ft=0,ht=99,Yt=25+v()*30;const t0=e.input,P=e.sound;let F0=!1,ut=0,j0=0,O0=0,l0=0,Wt=0,pt=0,mt=0,dt=!1,xt=12345,vt=0,bt=0;const Se=()=>(xt=Math.imul(xt,1103515245)+12345|0,(xt>>>8&65535)/32768-1),Ee=()=>{A.shift();const p=A[1];A.push(q0(p.opts[p.ch],p.e)),w0=!1,P0=1,ct=A[2].k,N0=0},wt=p=>{const c=f0();return w0?!1:(p===c.ch||(ct=A[2].k,c.ch=p,P0=0,A[2]=q0(c.opts[p],c.e),P.hit("kick",.5),P.hit("click",.8),P.hit("snare",.12)),!0)},J0=()=>{const p=f0().e-120;return s>p-640&&s<p},It=()=>{if(e0)return;const p=f0(),c=Math.max(y*y/(2*2),30);let n=s+c;for(const d of A){if(d.st&&d.st[0]+95>s+c*.6&&d.st[0]+95<s+c+450){e0={x:d.st[0]+9+18*5-1.2};return}for(const g of d.tun)n>g[0]-90&&n<g[1]+90&&(n=g[1]+100);d.br&&n>d.br[0]-90&&n<d.br[1]+90&&(n=d.br[1]+100)}g0=[n-79.8,n+70.2,0,n-13,n-3],e0={x:n}},gt=(p,c)=>{let n=c;for(const d of A)for(const g of p(d))Math.abs(g[0]-s+(g[1]-g[0])*.5)<Math.abs(n[0]-s+(n[1]-n[0])*.5)&&(n=g);return n},Te=p=>{const c=f0(),n=c.e-120;let d=z0,g=.9,J=1.4;if(s>n-330&&s<n+25?d=4:s>n-330-400&&s<=n-330&&(d=Math.min(z0,Math.sqrt(16+2*J*(n-330-s)))),e0){const G=e0.x-s;if(E0>0)y=0,E0-=p,E0<=0&&(e0=null,E0=0,P.hit("noise",.35,{dur:1.2,cutoff:2500}));else if(G<=.4||y<.25&&G<3)y=0,E0=6.5,P.hit("noise",.45,{dur:.9,cutoff:3500});else if(G<y*y/(2*1.3)+6){const _0=y*y/(2*Math.max(G,.5));y=Math.max(.15,y-Math.max(_0,.2)*p)}else y=Math.min(z0,y+g*p)}else y<d?y=Math.min(d,y+g*p*(y<6?.7:1)):y=Math.max(d,y-J*p);s+=y*p,s>n&&!w0&&(w0=!0),s>c.e&&Ee(),g0&&s>g0[1]+200&&(g0=null),P0=Math.min(1,P0+p*1.2)},$0=new Float32Array(18);let Le=0;const Zt=(p,c)=>{c=Math.min(Math.max(c||0,0),.25),j+=c,t0.taps&&t0.taps();const n=t0.inside||t0.down;if(t0.down&&!F0&&(F0=!0,ut=j,j0=t0.x,O0=t0.y,l0=0,Wt=W0,ht=0),t0.down&&F0){const l=t0.x-j0,S=t0.y-O0;l0===0&&Math.hypot(l,S)>.025&&(l0=Math.abs(S)>Math.abs(l)*.8?1:3),l0===1&&(W0=c0(Wt+S,.105,.6)),l0===3&&Math.abs(l)>.08&&J0()&&(wt(l<0?0:1),N0=1),l0===0&&j-ut>.35&&(l0=2,Ct=!0,It())}if(!t0.down&&F0&&(F0=!1,l0===0&&j-ut<=.35&&(Math.abs(j0-.29)<.065&&O0>.47&&O0<.75?(I0=I0>.5?0:1,P.hit("click",.6)):J0()&&!w0?(wt(1-f0().ch),N0=1):Math.hypot(j0-.63,O0-.74)<.06?(X0+=.5,P.hit("blip",.3,{freq:2900}),P.hit("blip",.2,{freq:3400,at:.07})):(P.note(62,{dur:.8,wave:"sawtooth",cutoff:900,vel:.3}),P.note(66,{dur:.8,wave:"sawtooth",cutoff:900,vel:.25}))),Ct=!1,l0=0),ht+=c,!n&&ht>12){if(ft+=c,J0()&&!w0&&N0===0){const l=f0().e-120;s>l-160&&u()<c*.5&&(wt(u()<.5?0:1),N0=2)}ft>Yt&&!e0&&(ft=0,Yt=(a===1?30:70)+u()*40,It())}let d=c;for(;d>1e-6;){const l=Math.min(d,.03333333333333333);Te(l),d-=l}const g=[-11.2,-8.7,8.7,11.2];for(let l=0;l<4;l++){const S=Math.floor((s+g[l])/25);if(S!==Kt[l]){Kt[l]=S;const m=.18+.5*Math.min(1,y/30);P.hit("click",m*.8,{pan:g[l]>0?.3:-.3}),P.hit("kick",m*.45,{pan:g[l]>0?.2:-.2}),u()<.3&&P.hit("blip",.1*m,{freq:2400+u()*1100}),X0+=.08*m,Z0+=.004*m*(u()-.3),V0=Math.min(1,V0+.5*m)}}X0=Math.min(X0*Math.exp(-c*2.2)+c*.02*y/30,.9),Ut+=c*26,Z0+=(-D0*140-Z0*9)*Math.min(c,.05),D0+=Z0*Math.min(c,.05)*1,V0*=Math.exp(-c*8),y0+=(W0-y0)*Math.min(1,c*12),T0+=(I0-T0)*Math.min(1,c*10);const J=c0(y/10,0,1),G=$t(1.5708,.22,J);Gt+=c*(.02+y*.007);const _0=f0(),O=_0.e-120,o0=gt(l=>l.tun,[1e6,1e6]),L0=gt(l=>l.br?[l.br]:[],[1e6,1e6]);let D=gt(l=>l.st?[l.st]:[],[1e6,1e6,0,1e6,1e6]);g0&&Math.abs(g0[0]+75-s)<Math.abs(D[0]+95-s)&&(D=g0);let Q0=1e6,Vt=0;for(const l of A)l.xing.forEach((S,m)=>{Math.abs(S-s)<Math.abs(Q0-s)&&(Q0=S,Vt=l.car[m]?1:0)});const h0=Q0-s,Me=Math.floor(j*2.2)%2,k0=s>o0[0]&&s<o0[1];if(k0&&!dt&&P.hit("noise",1,{dur:1.6,cutoff:420}),!k0&&dt&&P.hit("noise",.5,{dur:1,cutoff:900}),dt=k0,f===1&&(it-=c,!U&&it<0&&!k0&&Math.abs(L0[0]-s)>300&&Math.abs(D[0]-s)>300&&(U={x:9,len:180+u()*120,vo:30+u()*8},it=35+u()*40,P.hit("noise",.9,{dur:3.2,cutoff:1400}),P.note(64,{dur:.7,wave:"sawtooth",cutoff:1300,vel:.35}),P.note(68,{dur:.7,wave:"sawtooth",cutoff:1300,vel:.3})),U&&(U.x-=(y+U.vo)*c,U.x+U.len<-9?U=null:u()<c*14&&P.hit("click",.5,{pan:-.3}))),Math.abs(h0)<350&&(pt-=c,pt<=0)){pt=.42;const l=Math.hypot(h0,7),S=y*h0/l,m=343/(343-S),Q=86+12*Math.log2(m),C=Math.min(.5,7/l);P.note(Q,{dur:.5,wave:"sine",vel:C,pan:c0(h0/30,-1,1)}),P.note(Q+17.6,{dur:.25,wave:"sine",vel:C*.35,pan:c0(h0/30,-1,1)})}if(e0&&y>.4&&y<7&&(mt-=c,mt<=0&&(mt=.35,P.note(97+u()*2,{dur:.45,wave:"sine",vel:.05*(1-y/7)}))),P.on){const l=Math.min(2e3,Math.round(c*8e3));if(l>0){const S=new Float32Array(l),m=.04+.5*y/33+(k0?.7:0)+(U?.6:0);for(let Q=0;Q<l;Q++){const C=Se();vt=vt*.985+C*.06,bt=bt*.7+C*.3,S[Q]=(vt*1.6+bt*.12*(k0?1.5:.6))*m}P.pcm(S,8e3,{vel:.7})}}const n0=[0,0,0],Ae=Math.max(0,1-Math.max(0,Math.max(D[0]-s,s-D[1]))/25),He=D[2]>.5?[1,.55,.2]:[1,.8,.55];for(let l=0;l<3;l++)n0[l]+=He[l]*.012*Ae;if(Math.abs(h0)<20&&(n0[0]+=.02*(1-Math.abs(h0)/20)),U&&(n0[0]+=.03,n0[1]+=.027,n0[2]+=.022),k0){const l=Math.abs((s%40+40)%40-20),S=Math.max(0,1-l/4)*.02;n0[0]+=S,n0[1]+=S*.75,n0[2]+=S*.45}let yt=Math.max(D[0]-s,s-D[1])<60?1:0;if(yt&&y<1.5){yt=2;const l=Math.floor((s-D[0]-9)/18+.5),m=.5+(D[0]+9+l*18-s)/5.5,Q=Qt-(3.95-2.8)/5.5+D0;for(let C=0;C<6;C++){const Jt=j*(2.3+C*.41)+C*1.9;$0[C*3]=m+Math.cos(Jt)*(.015+.02*(C*7%3)/2)+.004*Math.sin(j*13+C),$0[C*3+1]=Q+Math.sin(Jt*1.31)*.022+.003*Math.cos(j*17+C),$0[C*3+2]=.4+.6*Math.abs(Math.sin(j*9+C*2))}}const Re=O-10-s,jt=T0*(1-c0((y0-.11)/.45,0,1)*.92),ze=J0()||s>=O&&s<O+30?1:0;t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.bindVertexArray(h.vao),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,h.noise),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,st),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,rt),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,K0),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,h.dots),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,Ft),t.viewport(0,0,H0,R0);const qe=c0(1-(y0-.012-Y[1])/Y[3],0,1);t.enable(t.SCISSOR_TEST),t.scissor(0,0,H0,Math.ceil(qe*R0)+1);const _=t.uniform1f.bind(t),$=t.uniform3fv.bind(t),B=t.uniform4f.bind(t),a0=(l,S)=>(l%S+S)%S;for(let l=0;l<2;l++){const S=l?h.ovl:h.out,m=S.u;t.useProgram(S.p),l?(t.enable(t.BLEND),t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE),t.blendEquation(t.FUNC_ADD)):t.disable(t.BLEND),t.uniform1i(m.uL3,3),t.uniform1i(m.uL5,5),t.uniform1i(m.uL6,6),B(m.uRect,Y[0],Y[1],Y[2],Y[3]),_(m.uOS,lt),_(m.uT,j),_(m.uPx,1/r),_(m.uV,y),_(m.uBob,D0),_(m.uOurL,jt),B(m.uOff,a0(s,1280),a0(s,45),a0(s/12e3,1),a0(s/520,1)),B(m.uOff2,a0(s,3360),a0(s,6),a0(s,240),a===0?1:0),t.uniform4i(m.uKi,A[0].k,A[1].k,A[2].k,ct),B(m.uSeg,A[1].s-s,A[1].e-s,P0,Math.log2(1+y/15*32)),t.uniform4fv(m.uKG,ue),t.uniform4fv(m.uKW,pe),t.uniform4fv(m.uKN,me),$(m.uSkyH,d0),$(m.uSkyZ,Lt),$(m.uFogC,Mt),$(m.uMoonL,r0),$(m.uAmb,C0),$(m.uMoonC,fe),B(m.uMoon,Z,s0,V,m0),B(m.uSky,M0[0],M0[1],M0[2],M0[3]),B(m.uWx,x0[0],x0[1],x0[2],x0[3]),B(m.uPt,B0[0],B0[1],B0[2],B0[3]),B(m.uPtC,U0[0],U0[1],U0[2],U0[3]),t.uniform3f(m.uPtD,et[0],et[1],et[2]),t.uniform2f(m.uTun,o0[0]-s,o0[1]-s),t.uniform2f(m.uBr,L0[0]-s,L0[1]-s),B(m.uSt,D[0]-s,D[1]-s,D[2],Math.abs(D[0]-s)<400||Math.abs(D[1]-s)<400?yt||1:0),B(m.uXing,h0,Me,Vt,Q0>1e5?1:0),B(m.uSig,Re,f0().ch?1:-1,ze,w0?0:.5+.5*Math.sin(j*5)),B(m.uOT,U?U.x:0,U?U.len:0,U?1:0,U?U.vo:0),m.uMoth&&t.uniform3fv(m.uMoth,$0),B(m.uSt2,D[3]-s,D[4]-s,D[2]>.5?5.5:3.4,D[3]*.013%7),t.drawArrays(t.TRIANGLES,0,3)}if(!h.tun)Le++>150&&(h.tun=u0(t,re),t.flush());else if(o0[0]-s<4&&o0[1]-s>-4){const l=h.tun;if(!l.ok){if(!t.getProgramParameter(l.p,t.LINK_STATUS))throw new Error("025 link tun: "+t.getProgramInfoLog(l.p)+" "+t.getShaderInfoLog(l.sh[1]));const m=t.getProgramParameter(l.p,t.ACTIVE_UNIFORMS);for(let Q=0;Q<m;Q++){const C=t.getActiveUniform(l.p,Q);l.u[C.name.replace(/\[0\]$/,"")]=t.getUniformLocation(l.p,C.name)}t.useProgram(l.p),t.uniform1i(l.u.uN,0),l.ok=!0}const S=l.u;t.useProgram(l.p),B(S.uRect,Y[0],Y[1],Y[2],Y[3]),_(S.uOS,lt),_(S.uPx,1/r),_(S.uV,y),_(S.uBob,D0),_(S.uOurL,jt),B(S.uOff2,a0(s,3360),a0(s,6),a0(s,240),a===0?1:0),$(S.uMoonL,r0),$(S.uAmb,C0),t.uniform2fv(S.uTun,[o0[0]-s,o0[1]-s]),t.drawArrays(t.TRIANGLES,0,3)}t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,r,r);const K=h.fin.u;t.useProgram(h.fin.p),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,nt),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,h.w1||h.dots),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,h.w2||h.dots),B(K.uRect,Y[0],Y[1],Y[2],Y[3]),_(K.uOS,lt),_(K.uT,j),_(K.uPx,1/r),_(K.uLamp,T0*(1-.04*V0)),_(K.uBlind,y0),_(K.uGreen,Pt),_(K.uFrost,M?1:0),_(K.uGR,b?1:0),_(K.uExp,2.3*(1+1*(1-T0))),$(K.uOutL,n0),$(K.uShade,qt),$(K.uBlindC,we),$(K.uAmb,C0),B(K.uDrop,Gt,ke,Math.cos(G),Math.sin(G)),B(K.uTea,X0*.25,Ut,c0(y/10,0,1),0),t.drawArrays(t.TRIANGLES,0,3)};return Zt(0,0),Zt}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
