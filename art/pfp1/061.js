// Clay Folk: from D:/code/synaesthesia/public/drop03/pieces/061.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Drop 03 · 061 · Clay Folk: plasticine head-and-shoulders folk, raymarched in WebGL2.
(() => {
  const built = new WeakMap();

  const VERT = /* glsl */ `#version 300 es
void main() {
  vec2 corner = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}`;

  const FRAG = /* glsl */ `#version 300 es
precision highp float;
out vec4 pix;
uniform float uS, uBlink;
uniform int uAA, uSteps;
uniform vec3 uSkin, uSkin2, uWall, uCloth, uCloth2, uHairC, uIris, uIris2, uPal, uKey, uKeyC, uFillC, uCap;
uniform vec4 uHead;   // width, height, jaw, nose kind
uniform vec4 uEye;    // kind, size, look x, look y
uniform vec4 uMouth;  // kind, width, curve, open
uniform vec4 uMisc;   // brow kind, brow tilt, hair or hat kind, knit kind
uniform vec4 uMore;   // ears, clay finish, turn, tilt
uniform vec4 uFace;   // facial hair, accessory, shoulder pal, cheeks
uniform vec4 uLook;   // light kind, wallpaper, propeller angle, how dark the clay is (0-1)
uniform vec4 uBuild;  // the body: chest half-width, flare toward the hem, shoulder lift, shoulder slope
uniform vec4 uBuild2; // 1 a round belly, 2 shoulders hunched up round the neck; collar lift; shoulder pal's x and y shift
uniform vec4 uJaw;    // jaw width under the ear, chin width, chin height, chin depth
uniform vec4 uCarve;  // cheekbones, brow ridge, crown, jaw softness
uniform vec4 uLeg;    // legendary (0 none, 1 bronze, 2 mid-shot, 3 scrap clay), pointer x, y on the set, amount
uniform vec4 uMid;    // Mid-Shot: where the finished clay stops (head x), the tool pulled out, the tool waggled, a press
uniform vec4 uCandle; // the coveted birthday candle: on, base height, x on the head, flame lean
uniform vec4 uFlame;  // the flame's centre on the set, and how lit it is

float mat_;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
float ell(vec3 p, vec3 r) {
  float k0 = length(p / r), k1 = length(p / (r * r));
  return k0 * (k0 - 1.0) / max(k1, 1e-5);
}
float rod(vec3 p, vec3 a, vec3 b, float r) {
  vec3 pa = p - a, ba = b - a;
  return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)) - r;
}
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec3 headLocal(vec3 p) {
  vec3 q = p - vec3(0.0, 0.14, 0.0);
  q.xz = rot(uMore.z) * q.xz;
  q.xy = rot(uMore.w) * q.xy;
  return q;
}
// how far a tall crown (Egghead, Long) lifts the hair or hat, and the camera with it
float hatLift() { return max(0.0, 0.06 + 0.05 * uCarve.z + (0.6 + 0.07 * uCarve.z) * uHead.y - 0.74); }

// the bench's leftover colours, for the scrap-clay legendary
vec3 scrapCol(float r) {
  float i = floor(r * 7.0);
  vec3 c = i < 1.0 ? vec3(0.86, 0.13, 0.1) : i < 2.0 ? vec3(0.95, 0.72, 0.08) : i < 3.0 ? vec3(0.1, 0.3, 0.75)
         : i < 4.0 ? vec3(0.15, 0.55, 0.22) : i < 5.0 ? vec3(0.96, 0.45, 0.62) : i < 6.0 ? vec3(0.97, 0.5, 0.1) : vec3(0.45, 0.25, 0.65);
  return c * c;
}

// The sculpted head, before features: a skull dome with flattened temples, a jaw cut along
// a real jawline down to a chin, cheekbones, a brow ridge, eye sockets, a muzzle for the lips.
float headBase(vec3 q, vec3 sq) {
  float W = uHead.x, H = uHead.y, crown = uCarve.z;
  float h = ell(q - vec3(0.0, 0.06 + 0.05 * crown, -0.07), vec3(0.57 * W, (0.6 + 0.07 * crown) * H, 0.61));
  h = smax(h, abs(q.x) - 0.5 * W - 0.05 * smoothstep(0.0, 0.5, -q.z) - 0.04 * smoothstep(0.2, -0.2, q.y), 0.12);
  float jw = uJaw.x * W, cw = uJaw.y, cy = uJaw.z, cz = uJaw.w;
  h = smin(h, ell(q - vec3(0.0, -0.2, 0.03), vec3(jw * 1.02, -0.18 - cy, 0.47)), 0.18);
  // the jawline: from under the ear down to the corner of the chin, and the chin's underside back to the neck
  // the ramus drops straight from the ear to the jaw's corner, then the jaw runs in to the chin
  float gy = mix(-0.3, cy + 0.2, 0.35);
  h = smax(h, abs(q.x) - jw - 0.03 - 1.6 * max(0.0, q.y + 0.08), uCarve.w + 0.04);
  vec2 a = vec2(jw + 0.03, gy), jd = normalize(vec2(cw, cy) - a);
  h = smax(h, dot(vec2(abs(q.x), q.y) - a, vec2(-jd.y, jd.x)), uCarve.w);
  h = smax(h, dot(vec2(q.z, q.y) - vec2(cz, cy), normalize(vec2(-0.5, -1.0))), 0.13);
  // chin (thumbed into the jaw, not stuck on), cheekbones, brow ridge, nose bridge, lips
  h = smin(h, ell(q - vec3(0.0, cy + 0.13, cz - 0.03), vec3(cw * 0.8 + 0.08, 0.14, 0.1)), 0.15);
  if (uJaw.x > 0.625) h = smin(h, ell(sq - vec3(jw - 0.2, cy + 0.3, 0.16), vec3(0.2, 0.19, 0.22)), 0.12); // a pear's heavy jowls
  h = smin(h, ell(sq - vec3(0.31 * W, -0.07, 0.29), vec3(0.17, 0.12, 0.16) * uCarve.x), 0.11);
  h = smin(h, rod(sq, vec3(0.03, 0.245, 0.49), vec3(0.31 * W, 0.235, 0.43), 0.03 + 0.03 * uCarve.y), 0.07);
  h = smin(h, rod(q, vec3(0.0, 0.2, 0.5), vec3(0.0, 0.0, 0.56), 0.045), 0.06);
  h = smin(h, ell(q - vec3(0.0, -0.36, 0.33), vec3(0.23, 0.14, 0.17)), 0.1);
  h = smax(h, -ell(sq - vec3(0.2 * W, 0.11, 0.6), vec3(0.15, 0.11, 0.1)), 0.07);
  return h;
}

float scene(vec3 p) {
  float d = p.z + 1.25, m = 0.0;
  // torso: a chest block whose shoulders fall away from the neck, the neck sunk into a knitted collar;
  // the build sets its width, its flare to the hem, how high and how square the shoulders sit, and a belly
  float ck = uMisc.w;
  vec3 bq = abs(p - vec3(0.0, -1.8, -0.12)) - vec3(uBuild.x + uBuild.y * smoothstep(-0.9, -1.6, p.y), 0.9, 0.3);
  float cloth = length(max(bq, 0.0)) + min(max(bq.x, max(bq.y, bq.z)), 0.0) - 0.32;
  cloth = smax(cloth, dot(vec2(abs(p.x), p.y) - vec2(0.28, -0.62 + uBuild.z), normalize(vec2(uBuild.w, 1.0))), 0.2);
  cloth = smax(cloth, dot(vec2(p.z, p.y) - vec2(0.2, -0.6), vec2(0.743, 0.669)), 0.22); // the chest falls forward from the collar
  if (uBuild2.x > 1.5) cloth = smin(cloth, ell(vec3(abs(p.x) - 0.6, p.y + 0.68, p.z + 0.1), vec3(0.42, 0.32, 0.36)), 0.16); // shoulders up by the ears
  else if (uBuild2.x > 0.5) cloth = smin(cloth, ell(p - vec3(0.0, -1.62, 0.06), vec3(1.3, 0.78, 0.62)), 0.3); // a round belly
  vec3 pc = p - vec3(0.0, uBuild2.y, 0.0); // the collar rides up with hunched shoulders
  cloth = smin(cloth, ell(pc - vec3(0.0, -0.76, -0.12), vec3(0.46, 0.18, 0.3)), 0.2);
  if (ck > 2.5 && ck < 3.5) { // turtleneck: a ribbed tube rolled over at the top
    float tube = max(length((pc.xz - vec2(0.0, -0.04)) * vec2(1.0, 1.1)) - 0.27, abs(pc.y + 0.74) - 0.24);
    cloth = smin(cloth, tube - 0.02, 0.08);
    vec3 s = pc - vec3(0.0, -0.52, -0.04);
    cloth = min(cloth, length(vec2(length(s.xz * vec2(1.0, 1.1)) - 0.27, s.y)) - 0.06);
  }
  if (cloth < d) { d = cloth; m = 5.0; }
  if (ck < 2.5 || ck > 3.5) {
    vec3 s = pc - vec3(0.0, -0.6, -0.05);
    float rib = length(vec2(length(s.xz * vec2(1.0, 1.1)) - 0.27, s.y)) - 0.075;
    if (rib < d) { d = rib; m = 11.0; }
  }
  if (ck > 1.5 && ck < 2.5) { // scarf: a thick rolled wrap, one flat tail down the chest and one flung over the shoulder
    vec3 s = pc - vec3(0.0, -0.55, -0.04);
    float tor = length(vec2(length(s.xz * vec2(1.0, 1.12)) - 0.34, s.y + 0.035 * sin(atan(s.z, s.x) * 3.0))) - 0.125;
    // the tails are knitted strips lying on the jumper: a thin shell over the cloth, cut to a band
    float tail = abs(cloth - 0.045) - 0.032;
    float fr = max(max(abs(p.x - 0.22 - 0.08 * (p.y + 0.6)) - 0.11, abs(p.y + 0.93) - 0.31 + 0.02 * sin(p.x * 90.0)), -p.z);
    vec2 so = p.xz - vec2(-0.26, 0.1), sd = normalize(vec2(-1.0, -0.5));
    float sh = max(max(abs(dot(so, vec2(-sd.y, sd.x))) - 0.11, abs(dot(so, sd) - 0.32) - 0.32), -p.y - 0.98);
    tail = smax(tail, min(fr, sh), 0.03);
    tor = smin(tor, tail, 0.05);
    if (tor < d) { d = tor; m = 6.0; }
  }
  if (ck > 3.5) { // bow tie
    vec3 s = pc - vec3(0.0, -0.73, 0.33 - 0.9 * uBuild2.y);
    float bw = min(ell(vec3(abs(s.x) - 0.11, s.y * (1.0 + 2.2 * abs(s.x)), s.z), vec3(0.12, 0.08, 0.05)), length(s) - 0.05);
    if (bw < d) { d = bw; m = 6.0; }
  }
  // a short thick neck, set a little forward of the shoulders
  float neck = rod(p, vec3(0.0, -0.8, -0.08), vec3(0.0, -0.2, -0.04), 0.25);

  // head (the Mid-Shot legendary models it apart from the set and body, to cut it)
  vec3 q = headLocal(p);
  bool midShot = uLeg.x > 1.5 && uLeg.x < 2.5;
  float dB = d, mB = m;
  if (midShot) d = 1e3;
  vec3 sq = q * vec3(sign(q.x), 1.0, 1.0);
  float hb = headBase(q, sq);
  float h = smin(hb, neck, 0.1);
  h = smin(h, ell(sq - vec3(0.58 * uHead.x, -0.02, -0.02), vec3(0.09, 0.15, 0.11) * uMore.x), 0.05);
  // nose (a little lower under a cyclops eye)
  float nk = uHead.w;
  bool cyc = uEye.x > 2.5 && uEye.x < 3.5;
  vec3 nq = q + vec3(0.0, cyc ? 0.06 : 0.0, 0.0);
  float nose;
  if (nk < 0.5) nose = length(nq - vec3(0.0, -0.06, 0.58)) - 0.11;
  else if (nk < 1.5) nose = ell(nq - vec3(0.0, -0.04, 0.6), vec3(0.08, 0.1, 0.2));
  else if (nk < 2.5) nose = length(nq - vec3(0.0, -0.05, 0.6)) - 0.15;
  else nose = ell(nq - vec3(0.0, -0.02, 0.6), vec3(0.06, 0.17, 0.1));
  h = smin(h, nose, 0.06);
  // the replacement mouth: a groove (or an O) pressed into the clay
  float mk = uMouth.x, mw = uMouth.y;
  vec3 mq = q - vec3(0.0, -0.38, 0.0);
  mq.y -= uMouth.z * mq.x * mq.x + (mk > 2.5 && mk < 3.5 ? 0.12 * mq.x : 0.0);
  float mz = 0.5 - 0.2 * mq.x * mq.x;
  float cut = mk > 3.5 ? ell(q - vec3(0.0, -0.4, 0.46), vec3(0.09, 0.11, 0.2) * (0.8 + uMouth.w))
                       : rod(mq, vec3(-mw, 0.0, mz), vec3(mw, 0.0, mz), 0.035 + 0.05 * uMouth.w);
  h = smax(h, -cut, 0.03);
  if (h < d) { d = h; m = 1.0; }
  if (cut < 0.012 && h < 0.02) m = 2.0;
  if (mk > 0.5 && mk < 1.5) {
    float tt = rod(mq, vec3(-mw * 0.75, 0.035, mz - 0.07), vec3(mw * 0.75, 0.035, mz - 0.07), 0.05);
    if (tt < d) { d = tt; m = 3.0; }
  }

  // eyes: one mirrored pair (or one big eye), so the scene stays small
  float ek = uEye.x, es = uEye.y;
  float sx = q.x < 0.0 ? -1.0 : 1.0;
  vec3 eq = cyc ? q : sq;
  vec3 look = normalize(vec3(uEye.z * sx, uEye.w, 1.0));
  float r = cyc ? 0.16 * es : 0.13 * es * (ek > 3.5 && sx > 0.0 ? 0.72 : 1.0);
  vec3 ec = cyc ? vec3(0.0, 0.17, 0.52 - 0.5 * r) : vec3(0.2 * uHead.x, 0.12, 0.53 - 0.5 * r);
  if (ek > 0.5 && ek < 1.5) {
    float bd = length(eq - ec - vec3(0.0, 0.0, 0.04)) - 0.065;
    if (bd < d) { d = bd; m = 4.0; }
  } else {
    float ew = length(eq - ec) - r;
    if (ew < d) { d = ew; m = 3.0; }
    float pu = length(eq - ec - look * (r - 0.02)) - r * 0.3;
    if (pu < d) { d = pu; m = 4.0; }
    float lidLine = mix(r * 1.3, -r * 1.1, uBlink);
    if (ek > 1.5 && ek < 2.5) lidLine = min(lidLine, r * 0.15);
    float lid = max(length(eq - ec) - r * 1.12, ec.y + lidLine - eq.y);
    if (lid < d) { d = lid; m = 1.0; }
  }
  // brows
  float bk = uMisc.x;
  if (bk < 0.5) {
    float br = rod(sq, vec3(0.09, 0.3 - uMisc.y * 0.05, 0.52), vec3(0.31 * uHead.x, 0.3 + uMisc.y * 0.05, 0.47), 0.035);
    if (br < d) { d = br; m = 7.0; }
  } else if (bk < 1.5) {
    float br = rod(q, vec3(-0.3, 0.3, 0.48), vec3(0.3, 0.3, 0.48), 0.045);
    if (br < d) { d = br; m = 7.0; }
  }
  // facial hair, rolled from the same clay as the hair
  float fh = uFace.x;
  if (fh > 0.5) {
    float f = 1e3;
    if (fh < 1.5 || fh > 4.5) f = rod(sq, vec3(0.03, -0.22, 0.6), vec3(0.2, -0.28, 0.5), 0.055);
    if (fh > 4.5) f = smin(f, rod(sq, vec3(0.2, -0.28, 0.5), vec3(0.28, -0.17, 0.44), 0.035), 0.03);
    else if (fh > 1.5 && fh < 2.5) {
      // a full beard: a slab of clay pressed over the jaw itself, up to the ears, combed into grooves
      f = hb - 0.06 - 0.006 * sin(q.x * 42.0 + q.y * 9.0);
      f = smax(f, q.y + 0.2 - 0.36 * smoothstep(0.2, 0.5, abs(q.x)), 0.04);
      f = smax(f, -q.z - 0.12, 0.06);
      f = smax(f, -ell(q - vec3(0.0, -0.37, 0.46), vec3(0.2, 0.09, 0.3)), 0.03);
      f = smin(f, rod(sq, vec3(0.03, -0.22, 0.6), vec3(0.18, -0.27, 0.52), 0.05), 0.05);
    }
    else if (fh > 2.5 && fh < 3.5) { // sideburns pressed flat along the cheek
      f = smax(hb - 0.035, max(abs(q.y + 0.06) - 0.2, 0.34 * uHead.x - abs(q.x)), 0.03);
      f = smax(f, abs(q.z - 0.06) - 0.2, 0.04);
    }
    else if (fh > 3.5 && fh < 4.5) f = ell(q - vec3(0.0, uJaw.z + 0.07, uJaw.w + 0.07), vec3(0.1, 0.12, 0.09));
    if (f < d) { d = f; m = 7.0; }
  }
  // hair or hat, raised to sit on a tall crown
  float hk = uMisc.z;
  vec3 q0 = q;
  q.y -= hatLift();
  if (hk < 0.5) { // tuft: three clay rolls
    float t1 = rod(q, vec3(0.0, 0.6, 0.1), vec3(-0.12, 0.85, 0.05), 0.07);
    t1 = smin(t1, rod(q, vec3(0.05, 0.6, 0.1), vec3(0.14, 0.82, 0.12), 0.06), 0.04);
    t1 = smin(t1, rod(q, vec3(0.0, 0.62, 0.05), vec3(0.03, 0.92, -0.05), 0.065), 0.04);
    if (t1 < d) { d = t1; m = 7.0; }
  } else if (hk < 1.5 || (hk > 6.5 && hk < 7.5)) { // bowl cut, or a curly mop pressed all over with a pencil end
    float bc = ell(q - vec3(0.0, 0.12, -0.04), vec3(0.66 * uHead.x, 0.66 * uHead.y, 0.62) * (hk > 1.5 ? 1.05 : 1.0));
    bc = max(bc, 0.22 - q.y - 0.25 * smoothstep(0.2, 0.0, q.z) + (hk > 1.5 ? 0.06 : 0.0));
    if (hk > 1.5) bc = (bc - 0.03 * sin(q.x * 23.0) * sin(q.y * 21.0) * sin(q.z * 22.0)) * 0.8;
    if (bc < d) { d = bc; m = 7.0; }
  } else if (hk < 2.5) { // bun
    float bn = ell(q - vec3(0.0, 0.08, -0.04), vec3(0.62 * uHead.x, 0.66 * uHead.y, 0.6));
    bn = max(bn, 0.42 - q.y - 0.42 * smoothstep(0.25, -0.15, q.z)); // hairline high on the brow, low at the nape
    bn = smin(bn, length(q - vec3(0.0, 0.78, -0.12)) - 0.19, 0.08);
    if (bn < d) { d = bn; m = 7.0; }
  } else if (hk < 4.5 || (hk > 12.5)) { // beanie with a bobble, or a propeller cap
    vec3 hq = q - vec3(0.0, cyc ? 0.3 : 0.22, -0.02);
    float bn = max(ell(hq, vec3(0.66 * uHead.x, 0.62, 0.62)), 0.02 - hq.y);
    if (hk < 4.5) {
      float rim = ell(hq - vec3(0.0, 0.06, 0.0), vec3(0.69 * uHead.x, 0.13, 0.65)) + 0.008 * sin(atan(hq.z, hq.x) * 40.0);
      bn = min(bn, rim);
      if (hk > 3.5) bn = smin(bn, length(hq - vec3(0.0, 0.66, 0.0)) - 0.15, 0.03);
    } else {
      bn = min(bn, ell(hq - vec3(0.0, 0.02, 0.48), vec3(0.32, 0.03, 0.22)));
      bn = min(bn, rod(hq, vec3(0.0, 0.58, 0.0), vec3(0.0, 0.76, 0.0), 0.025));
      vec3 bq = hq - vec3(0.0, 0.77, 0.0);
      bq.xz = rot(uLook.z) * bq.xz;
      float blade = ell(bq, vec3(0.44, 0.022, 0.075));
      if (blade < d) { d = blade; m = 10.0; }
    }
    if (bn < d) { d = bn; m = 8.0; }
  } else if (hk < 5.5) { // party hat
    vec3 hq = q - vec3(0.12, 0.56, 0.0);
    hq.xy = rot(-0.25) * hq.xy;
    float rr = mix(0.26, 0.02, clamp(hq.y / 0.55, 0.0, 1.0));
    float cone = min(max(length(hq.xz) - rr, max(-hq.y, hq.y - 0.55)) * 0.8, length(hq - vec3(0.0, 0.58, 0.0)) - 0.06);
    if (cone < d) { d = cone; m = 8.0; }
  } else if (hk < 6.5) { // quiff: a slicked cap and a rolled wave over the brow
    float cap = max(ell(q - vec3(0.0, 0.14, -0.06), vec3(0.64 * uHead.x, 0.64 * uHead.y, 0.6)), 0.3 - q.y);
    vec3 wq = q - vec3(0.05, 0.6, 0.26);
    wq.xy = rot(0.3) * wq.xy;
    cap = smin(cap, ell(wq, vec3(0.3, 0.14, 0.2)), 0.08);
    if (cap < d) { d = cap; m = 7.0; }
  } else if (hk < 8.5) { // mohawk: a pinched ridge
    float ridge = ell(q - vec3(0.0, 0.62, -0.02), vec3(0.075, 0.3, 0.5)) - 0.025 * sin(q.z * 19.0);
    if (ridge < d) { d = ridge; m = 7.0; }
  } else if (hk > 9.5 && hk < 10.5) { // flat cap: a band hugging the head, a soft crown puffed out at the back and
    // pulled forward and down onto a stiff peak that sticks out over the brow
    float W = uHead.x;
    float fc = ell(q - vec3(0.0, 0.2, -0.05), vec3(0.63 * W, 0.56, 0.64));
    vec3 cq = q - vec3(0.0, 0.53, -0.17);
    cq.yz = rot(0.34) * cq.yz;
    fc = smin(fc, ell(cq, vec3(0.71 * W, 0.23, 0.76)), 0.12);
    fc = max(fc, 0.31 + 0.11 * q.z - q.y) * 0.85; // its lower edge, low at the nape, up at the brow
    vec3 pq = q - vec3(0.0, 0.37, 0.48);
    pq.y += 0.26 * max(pq.z, 0.0);
    fc = smin(fc, max(ell(pq, vec3(0.53 * W, 0.045, 0.46)), -pq.z), 0.04);
    if (fc < d) { d = fc; m = 8.0; }
  } else if (hk > 10.5 && hk < 11.5) { // bucket hat: a crown that fits the head, and a soft brim sloping down all round
    vec3 hq = q - vec3(0.0, 0.36, -0.05);
    float rr = length(hq.xz * vec2(1.0 / uHead.x, 1.0));
    float bh = smax(max(rr - 0.67 + 0.2 * hq.y, -hq.y), hq.y - 0.42, 0.1) * 0.85;
    bh = smin(bh, max(abs(hq.y + 0.5 * max(rr - 0.62, 0.0)) - 0.028, rr - 0.98) * 0.7, 0.05);
    if (bh < d) { d = bh; m = 8.0; }
  } else if (hk > 11.5 && hk < 12.5) { // a little clay crown, gilded
    vec3 rq = q - vec3(0.0, 0.66, 0.0);
    float ring = max(abs(length(rq.xz) - 0.4) - 0.035, abs(rq.y) - 0.13);
    ring = max(ring, rq.y - 0.02 - 0.12 * abs(sin(atan(rq.z, rq.x) * 2.5)));
    if (ring < d) { d = ring; m = 9.0; }
  }
  q = q0;
  // accessories
  float ak = uFace.y;
  if (ak > 0.5) {
    float a = 1e3;
    if (ak < 1.5) {
      vec3 c0 = vec3(0.2 * uHead.x, 0.12, 0.6);
      a = length(vec2(length(sq.xy - c0.xy) - 0.15, sq.z - c0.z)) - 0.017;
      a = min(a, rod(sq, vec3(0.0, 0.15, 0.63), vec3(0.06, 0.14, 0.62), 0.015));
      a = min(a, rod(sq, vec3(0.34 * uHead.x + 0.02, 0.13, 0.56), vec3(0.58 * uHead.x, 0.1, 0.0), 0.015));
    } else if (ak < 2.5) {
      vec3 c0 = vec3(0.6 * uHead.x, -0.16, 0.0);
      a = length(vec2(length(q.yz - c0.yz) - 0.05, q.x - c0.x)) - 0.013;
    } else if (ak < 3.5) {
      vec3 fq = q - vec3(0.5 * uHead.x, 0.36, 0.1);
      a = ell(fq, vec3(0.13, 0.13, 0.05)) - 0.03 * sin(atan(fq.y, fq.x) * 5.0);
      float mid = length(fq - vec3(0.0, 0.0, 0.04)) - 0.045;
      if (mid < d) { d = mid; m = 12.0; }
      a *= 0.8;
      if (a < d) { d = a; m = 10.0; }
      a = 1e3;
    } else {
      vec3 c0 = vec3(0.2 * uHead.x, 0.12, 0.6);
      a = length(vec2(length(q.xy - c0.xy) - 0.16, q.z - c0.z)) - 0.02;
      a = min(a, rod(q, vec3(0.3, 0.0, 0.58), vec3(0.42, -0.5, 0.45), 0.01));
    }
    if (a < d) { d = a; m = 9.0; }
  }
  // the coveted birthday candle, pressed into the top of the head, and its wick
  if (uCandle.x > 0.5) {
    vec3 cq = q - vec3(uCandle.z, uCandle.y, 0.02);
    float cd = max(length(cq.xz) - 0.042, abs(cq.y - 0.16) - 0.16) - 0.004;
    if (cd < d) { d = cd; m = 14.0; }
    float wick = rod(cq, vec3(0.0, 0.3, 0.0), vec3(0.0, 0.36, 0.0), 0.008);
    if (wick < d) { d = wick; m = 4.0; }
  }
  if (midShot) {
    // Mid-Shot: caught between frames. Past the animator's line (uMid.x, head x) the head is still a raw,
    // thumbed ball of clay with a loop of armature wire poking out and a sculpting tool stuck in it
    // the line between them is ragged, pushed about by thumbs, not a clean cut
    float cx = uMid.x + 0.05 * sin(q.y * 8.0 + 1.3) + 0.03 * sin(q.y * 17.0 + q.z * 6.0) + 0.025 * sin(q.z * 11.0 + 0.5);
    d = smax(d, min(cx - q.x, p.y + 0.5), 0.025);
    float raw = length((q - vec3(-0.02, 0.04, -0.04)) * vec3(1.0, 1.0 - 0.1 * uMid.w, 1.0)) - 0.69
              - 0.045 * sin(q.x * 9.0 + 1.0) * sin(q.y * 7.0) * sin(q.z * 8.0 + 2.0)
              - 0.018 * sin(q.x * 19.0 + q.z * 5.0) * sin(q.y * 17.0 + 2.0);
    // thumb dents pressed along the seam, the clay pushed over onto the finished side
    for (int j = 0; j < 3 + min(uSteps, 0); j++) {
      float fy = 0.36 - 0.33 * float(j), fx = uMid.x - 0.13 - 0.04 * float(j & 1);
      vec3 tc = vec3(fx, fy, -0.04 + sqrt(max(0.05, 0.5 - fx * fx - (fy - 0.04) * (fy - 0.04))));
      raw = smax(raw, -ell(q - tc, vec3(0.1, 0.13, 0.07)), 0.05);
    }
    raw = smax(raw, q.x - cx - 0.035, 0.06);
    if (raw < d) { d = raw; m = 15.0; }
    // a boxwood modelling tool pressed into the raw cheek at a shallow angle, its wire end in the clay
    vec3 tdir = normalize(vec3(-0.93, 0.32 + uMid.z, -0.19));
    vec3 tt = vec3(-0.45, 0.06, 0.48) + tdir * uMid.y;
    float tool = rod(q, tt + tdir * 0.15, tt + tdir * 0.85, 0.035 + 0.02 * smoothstep(0.15, 0.6, dot(q - tt, tdir)));
    if (tool < d) { d = tool; m = 16.0; }
    float wire = min(rod(q, tt - tdir * 0.04, tt + tdir * 0.16, 0.02),
                     length(vec2(length(q.xy - vec2(-0.3, 0.7)) - 0.13, q.z + 0.02)) - 0.02);
    wire = max(wire, q.x - cx);
    if (wire < d) { d = wire; m = 17.0; }
    if (dB < d) { d = dB; m = mB; }
  }
  // a friend on the shoulder
  float pk = uFace.z;
  if (pk > 0.5) {
    p -= vec3(uBuild2.z, uBuild2.w, 0.0);
    if (pk < 1.5) {
      float bird = smin(ell(p - vec3(0.8, -0.83, 0.1), vec3(0.17, 0.13, 0.14)), length(p - vec3(0.93, -0.68, 0.14)) - 0.1, 0.06);
      bird = smin(bird, rod(p, vec3(0.68, -0.8, 0.06), vec3(0.54, -0.73, 0.0), 0.04), 0.03);
      if (bird < d) { d = bird; m = 10.0; }
      float beak = ell(p - vec3(1.03, -0.69, 0.17), vec3(0.06, 0.025, 0.035));
      if (beak < d) { d = beak; m = 12.0; }
      float be = length(p - vec3(0.975, -0.65, 0.215)) - 0.022;
      if (be < d) { d = be; m = 4.0; }
    } else {
      float shell = length(p - vec3(0.8, -0.8, 0.12)) - 0.15;
      if (shell < d) { d = shell; m = 10.0; }
      float slug = min(rod(p, vec3(0.6, -0.93, 0.2), vec3(1.0, -0.94, 0.22), 0.055), rod(p, vec3(0.98, -0.92, 0.22), vec3(1.03, -0.76, 0.25), 0.016));
      if (slug < d) { d = slug; m = 13.0; }
      float se = length(p - vec3(1.03, -0.75, 0.25)) - 0.025;
      if (se < d) { d = se; m = 4.0; }
    }
  }
  mat_ = m;
  return d;
}

float h31(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float vnoise(vec3 p) {
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(h31(i), h31(i + vec3(1, 0, 0)), f.x), mix(h31(i + vec3(0, 1, 0)), h31(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(h31(i + vec3(0, 0, 1)), h31(i + vec3(1, 0, 1)), f.x), mix(h31(i + vec3(0, 1, 1)), h31(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
// worked plasticine: soft lumps, a few thumb dents, and fingerprint whorls left here and there
float claySkin(vec3 p, float prints) {
  float lumps = vnoise(p * 4.2);
  float dent = smoothstep(0.58, 0.8, vnoise(p * 1.9 + 11.0));
  vec2 cell = floor(p.xy * 4.5), loc = fract(p.xy * 4.5) - 0.5;
  float whorl = sin(length(loc + 0.12 * vec2(h31(vec3(cell, 1.0)), h31(vec3(cell, 2.0)))) * 120.0);
  whorl *= step(0.7, h31(vec3(cell, 7.0))) * smoothstep(0.4, 0.1, length(loc));
  return lumps * 0.55 - dent * 0.45 + whorl * 0.012 * prints;
}

vec3 render(vec2 fc) {
  vec2 uv = (fc - 0.5 * uS) / uS * 2.0;
  vec3 ro = vec3(0.0, -0.15 + 0.6 * hatLift(), 6.0);
  vec3 rd = normalize(vec3(uv * 0.25, -1.0));
  vec3 key = uKey;
  // one loop and one call to scene(): the march, four normal taps, a shadow ray, four occlusion taps
  int phase = 0, k = 0;
  float t = 0.0, m = 0.0, sh = 1.0, st = 0.02, ao = 0.0, aw = 1.0;
  vec3 p = ro, n = vec3(0.0), e = n;
  for (int i = 0; i < uSteps + 34; i++) {
    vec3 at = ro + rd * t;
    if (phase == 1) {
      e = 0.5773 * (2.0 * vec3(float(((k + 3) >> 1) & 1), float((k >> 1) & 1), float(k & 1)) - 1.0);
      at = p + e * 0.0015;
    } else if (phase == 2) at = p + n * 0.008 + key * st;
    else if (phase == 3) at = p + n * 0.05 * float(k + 1);
    float dd = scene(at);
    if (phase == 0) {
      if (dd < 0.0008 * t || t > 12.0 || i >= uSteps - 1) { p = at; m = mat_; phase = 1; st = 0.02 + 0.05 * fract(52.9829189 * fract(dot(fc, vec2(0.06711056, 0.00583715)))); }
      else t += dd * 0.9;
    } else if (phase < 2) {
      n += e * dd; k++;
      if (k > 3) { n = normalize(n); phase = 2; k = 0; }
    } else if (phase < 3) {
      sh = min(sh, 8.0 * dd / st); st += clamp(dd, 0.025, 0.2); k++;
      if (sh < 0.01 || st > 4.0 || k >= 34) { phase = 3; k = 0; }
    } else {
      ao += (0.05 * float(k + 1) - dd) * aw; aw *= 0.6; k++;
      if (k > 3) break;
    }
  }
  sh = clamp(sh, 0.0, 1.0); // the key's soft shadow
  ao = clamp(1.0 - 2.4 * ao, 0.0, 1.0);
  vec3 alb, emit = vec3(0.0);
  float spec = 0.1, bump = 0.0;
  vec3 q = headLocal(p);
  if (m < 0.5) { // the set wall: painted card, sometimes papered
    alb = uWall * (0.92 + 0.08 * vnoise(p * 6.0));
    float wp = uLook.y;
    vec2 w = p.xy;
    if (wp > 0.5 && wp < 1.5) alb *= 1.0 - 0.12 * smoothstep(0.1, 0.08, length(fract(w * 2.2 + vec2(0.5 * floor(w.y * 2.2), 0.0)) - 0.5));
    else if (wp > 1.5 && wp < 2.5) alb *= 1.0 - 0.1 * step(0.5, fract(w.x * 2.4));
    else if (wp > 2.5 && wp < 3.5) alb *= 1.0 - 0.1 * step(0.25, abs(fract(w.x * 1.6 + w.y * 1.6) - 0.5) + abs(fract(w.x * 1.6 - w.y * 1.6) - 0.5) - 0.25);
    else if (wp > 3.5) emit = vec3(1.0, 0.92, 0.7) * step(0.965, h31(vec3(floor(w * 18.0), 3.0))) * smoothstep(0.3, 0.1, length(fract(w * 18.0) - 0.5)) * 0.5;
    alb *= 1.0 - 0.2 * smoothstep(0.6, 1.8, length(p.xy - vec2(0.0, 0.2)));
    if (uLook.x > 2.5) alb *= 0.35 + 0.65 * smoothstep(1.6, 0.4, length(p.xy - vec2(0.0, 0.1)));
  } else if (m < 1.5) {
    alb = uSkin;
    float fin = uMore.y;
    if (fin > 0.5 && fin < 1.5) alb = mix(uSkin, uSkin2, smoothstep(-0.25, 0.25, sin(q.x * 6.0 + vnoise(q * 3.0) * 7.0 + q.y * 4.0)));
    else if (fin > 1.5 && fin < 2.5) emit = vec3(0.35, 0.95, 0.4) * 0.45 * (0.8 + 0.2 * vnoise(q * 8.0));
    else if (fin > 2.5 && fin < 3.5) alb *= 1.0 - 0.6 * step(0.86, h31(floor(q * 26.0))) * smoothstep(0.3, 0.2, length(fract(q * 26.0) - 0.5));
    // pressed-on cheeks
    float front = smoothstep(0.2, 0.4, q.z);
    vec2 ch = vec2(abs(q.x) - 0.33 * uHead.x, q.y + 0.14);
    if (uFace.w > 0.5 && uFace.w < 1.5) alb = mix(alb, alb * vec3(1.25, 0.72, 0.72), smoothstep(0.13, 0.08, length(ch)) * front * 0.75);
    else if (uFace.w > 1.5) alb *= 1.0 - 0.35 * front * step(0.78, h31(floor(vec3(q.xy * 28.0, 1.0)))) * smoothstep(0.17, 0.1, length(ch)) * smoothstep(0.32, 0.2, length(fract(q.xy * 28.0) - 0.5));
    bump = 1.0;
  } else if (m < 2.5) {
    alb = mix(vec3(0.22, 0.04, 0.05), vec3(0.045, 0.018, 0.016), uLook.w);
  } else if (m < 3.5) {
    alb = mix(vec3(0.95, 0.94, 0.9), vec3(0.86, 0.83, 0.76), uLook.w); spec = 0.5;
    // the iris, painted round the pupil
    if (q.y > -0.15) {
      bool cy = uEye.x > 2.5 && uEye.x < 3.5;
      float sx = q.x < 0.0 ? -1.0 : 1.0, es = uEye.y;
      vec3 eq = cy ? q : vec3(abs(q.x), q.yz);
      float r = cy ? 0.16 * es : 0.13 * es * (uEye.x > 3.5 && sx > 0.0 ? 0.72 : 1.0);
      vec3 ec = cy ? vec3(0.0, 0.17, 0.52 - 0.5 * r) : vec3(0.2 * uHead.x, 0.12, 0.53 - 0.5 * r);
      float ca = dot(normalize(eq - ec), normalize(vec3(uEye.z * sx, uEye.w, 1.0)));
      vec3 ir = sx > 0.0 ? uIris2 : uIris;
      alb = mix(alb, ir * (0.75 + 0.35 * smoothstep(0.8, 0.95, ca)), smoothstep(0.75, 0.78, ca));
    }
  } else if (m < 4.5) {
    alb = vec3(0.03); spec = 0.9;
    if (uLook.w > 0.0 && uEye.x > 0.5 && uEye.x < 1.5 && q.z > 0.3 && abs(q.y - 0.12) < 0.12) {
      // bead eyes on dark clay: a painted glint, so they never sink into the face
      float sx = q.x < 0.0 ? -1.0 : 1.0;
      vec3 bc = vec3(0.2 * uHead.x, 0.12, 0.57 - 0.065 * uEye.y);
      float gl = dot(normalize(vec3(abs(q.x), q.yz) - bc), normalize(vec3(-0.4 * sx, 0.55, 0.75)));
      emit = vec3(0.95, 0.92, 0.85) * smoothstep(0.78, 0.84, gl) * uLook.w;
    }
  } else if (m < 5.5 || m > 10.5 && m < 11.5) {
    alb = uCloth;
    if (m < 5.5 && uMisc.w < 0.5) alb = mix(uCloth, uCloth2, step(0.5, fract(p.y * 4.2)));
    // stockinette: little V stitches in columns, sculpted into the clay
    float col = fract(p.x * 13.0), row = fract(p.y * 19.0 + abs(col - 0.5) * 1.2);
    alb *= 0.92 + 0.08 * smoothstep(0.1, 0.4, row) * smoothstep(0.95, 0.65, row);
    if (m > 10.5) alb = mix(uCloth, uCloth2, 0.25) * (0.86 + 0.14 * step(0.5, fract(atan(p.z, p.x) * 9.0)));
    bump = 0.7;
  } else if (m < 6.5) {
    alb = uCloth2; bump = 0.7;
    // the scarf is garter-knitted: soft ridges, and a darker band near the end of the tail
    if (uMisc.w < 2.5) alb *= (0.8 + 0.2 * smoothstep(0.15, 0.6, abs(fract(p.y * 17.0) - 0.5) * 2.0)) * (1.0 - 0.3 * step(abs(p.y + 1.1), 0.05));
  } else if (m < 7.5) {
    alb = uHairC; bump = 1.2;
  } else if (m < 8.5) {
    alb = uCloth2;
    float hk = uMisc.z;
    if (hk > 4.5 && hk < 5.5) alb = mix(uCloth2, uCloth, step(0.5, fract((q.y + q.x * 0.5) * 7.0)));
    if (hk > 12.5) alb = mix(uCloth2, uPal, step(0.5, fract(atan(q.z, q.x) * 0.955)));
    if (hk > 9.5 && hk < 10.5) {        // tweed: a herringbone twill in brown, grey or green wool, flecked
      float cl = q.x * 19.0, tw = fract((q.y + 0.6 * q.z) * 19.0 + (mod(floor(cl), 2.0) < 1.0 ? 1.0 : -1.0) * fract(cl));
      alb = mix(uCap, uCap * vec3(0.55, 0.5, 0.45), 0.42 * smoothstep(0.25, 0.5, tw) * smoothstep(0.95, 0.7, tw));
      alb = mix(alb, uCap * vec3(1.35, 1.2, 0.95), step(0.9, h31(floor(q * 60.0))) * 0.6);
    } else if (hk > 10.5 && hk < 11.5) alb *= 0.9 + 0.1 * smoothstep(0.02, 0.0, abs(fract(length(q.xz) * 12.0) - 0.5) - 0.06);
    else alb *= 0.9 + 0.1 * sin(atan(q.z, q.x) * 40.0);
    bump = 0.8;
  } else if (m < 9.5) {
    alb = vec3(0.95, 0.7, 0.28); spec = 1.4;
  } else if (m < 10.5) {
    alb = uPal; bump = 1.0;
    vec2 sp2 = p.xy - uBuild2.zw;
    if (uFace.z > 1.5 && length(sp2 - vec2(0.8, -0.8)) < 0.2) alb *= 0.75 + 0.25 * step(0.5, fract(length(sp2 - vec2(0.82, -0.79)) * 22.0 + atan(sp2.y + 0.79, sp2.x - 0.82) * 0.32));
  } else if (m < 12.5) {
    alb = vec3(0.95, 0.55, 0.15); bump = 0.6;
  } else if (m > 14.5) { // Mid-Shot: raw clay still in the lump, the sculpting tool's handle, armature wire
    // the unworked lump is a touch paler and dead matte, smeared with fingerprints
    alb = m < 15.5 ? min(uSkin * 1.25 + 0.012, vec3(1.0)) * (0.88 + 0.12 * vnoise(q * 7.0)) : m < 16.5 ? vec3(0.62, 0.38, 0.17) : vec3(0.55, 0.56, 0.6);
    bump = m < 15.5 ? 3.4 : 0.3; spec = m > 16.5 ? 1.6 : m < 15.5 ? 0.03 : 0.2;
  } else if (m > 13.5) { // candle wax, a twisted stripe
    alb = mix(vec3(0.9, 0.86, 0.78), uPal, step(0.5, fract((q.y - uCandle.y) * 7.0 + atan(q.z - 0.02, q.x - uCandle.z) * 0.318)));
    spec = 0.6;
  } else {
    alb = vec3(0.72, 0.74, 0.62); bump = 1.0;
  }
  if (uLeg.x > 2.5 && (m > 0.5 && m < 1.5 || m > 4.5 && m < 8.5 || m > 9.5 && m < 11.5)) {
    // every leftover scrap on the bench kneaded into one figure: bands of colour, swirled, bleeding softly into each other
    vec3 s3 = (m < 1.5 || m > 6.5 && m < 8.5 ? q : p) * 2.3 + vec3(uLeg.yz * 0.6, uLeg.w);
    float f = s3.y + s3.x * 0.5 + 1.9 * vnoise(s3 * 1.3) + 0.5 * vnoise(s3 * 4.5);
    float id = floor(f), fb = fract(f) + 0.12 * vnoise(s3 * 6.0);
    alb = mix(scrapCol(h31(vec3(id, 1.0, 2.0))), scrapCol(h31(vec3(id + 1.0, 1.0, 2.0))), smoothstep(0.66, 1.06, fb));
    emit = vec3(0.0);
  }
  if (bump > 0.0) {
    vec3 bp = (m < 1.5 || (m > 6.5 && m < 8.5) || (m > 14.5 && m < 15.5)) ? q : p;
    float e = 0.004;
    float fp = m < 1.5 ? 1.0 : m > 14.5 && m < 15.5 ? 3.0 : 0.0;
    // four taps in a loop the compiler can't unroll, so the clay noise is built only once
    float b0 = 0.0;
    vec3 g = vec3(0.0);
    for (int j = 0; j < 4 + min(uSteps, 0); j++) {
      float v = claySkin(bp + (j == 1 ? vec3(e, 0.0, 0.0) : j == 2 ? vec3(0.0, e, 0.0) : j == 3 ? vec3(0.0, 0.0, e) : vec3(0.0)), fp);
      if (j == 0) b0 = v; else g[j - 1] = (v - b0) / e;
    }
    n = normalize(n - 0.014 * bump * g);
  }
  vec3 fillD = normalize(vec3(0.7, 0.1, 0.5));
  float lam = dot(n, key);
  float dif = clamp(lam, 0.0, 1.0);
  float wrap = clamp(lam * 0.5 + 0.5, 0.0, 1.0);
  vec3 h = normalize(key - rd);
  // plasticine is satin, not glossy: a broad soft sheen rather than a pin highlight
  float sp = (pow(clamp(dot(n, h), 0.0, 1.0), m < 2.5 ? 10.0 : 28.0) * (m < 2.5 ? 0.45 : 1.0)) * spec;
  vec3 col = alb * (uKeyC * dif * sh * 1.1 + uFillC * wrap * 0.55 * ao);
  col += alb * vec3(0.4, 0.38, 0.35) * clamp(dot(n, fillD), 0.0, 1.0) * 0.35 * ao;
  // light soaking into the clay: a warm, saturated glow in the shadow side
  if (m > 0.5) col += alb * alb * (1.0 - dif * sh) * 0.22 * ao;
  col += sp * sh * uKeyC;
  float rim = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 3.0);
  if (m > 0.5) col += rim * 0.1 * ao * ao * sh * vec3(0.9, 0.95, 1.0);
  if (uLeg.x > 0.5 && uLeg.x < 1.5 && m > 0.5) {
    // cast in bronze: patina gathered in the hollows, the high points bright, the nose rubbed gold for
    // luck, and a polished spot wherever the viewer's hand has been
    float pat = smoothstep(0.32, 0.8, vnoise(p * 9.0) * 0.35 + vnoise(p * 2.6) * 0.3 + (1.0 - ao) * 1.4 + 0.1 * (1.0 - n.y));
    float pol = max(uLeg.w * smoothstep(0.32, 0.0, length(p.xy - uLeg.yz)), smoothstep(0.17, 0.07, length(q - vec3(0.0, -0.04, 0.62))));
    vec3 brz = mix(vec3(0.3, 0.15, 0.06), vec3(0.85, 0.58, 0.24), pol);
    vec3 ab = mix(brz, vec3(0.12, 0.3, 0.25), pat * (1.0 - pol));
    vec3 rr = reflect(rd, n);
    vec3 env = mix(uWall * 0.45 + 0.02, uKeyC, smoothstep(-0.3, 0.9, dot(rr, key)));
    float metal = 1.0 - 0.85 * pat * (1.0 - pol);
    col = ab * (uKeyC * dif * sh + uFillC * wrap * 0.5 * ao) * (1.0 - 0.6 * metal)
        + metal * ab * env * ao * 1.2
        + metal * mix(ab, vec3(1.0, 0.85, 0.6), 0.3) * pow(clamp(dot(n, h), 0.0, 1.0), 40.0 + 90.0 * pol) * sh * (2.5 + 4.0 * pol) * uKeyC;
    emit = vec3(0.0);
  }
  if (uFlame.w > 0.0) { // the candle lights the clay round it
    float fd = length(p - uFlame.xyz);
    col += alb * vec3(1.0, 0.55, 0.2) * uFlame.w * 0.05 / (fd * fd + 0.03);
  }
  col += emit;
  if (uCandle.x > 0.5 && uFlame.w > 0.0) {
    // the flame itself: a teardrop along the ray's nearest pass, a hot core and a soft halo
    float tt = dot(uFlame.xyz - ro, rd);
    if (tt < t + 0.05) {
      vec3 o = ro + rd * tt - uFlame.xyz;
      o.x -= uCandle.w * max(o.y + 0.04, 0.0);
      float up = max(o.y, 0.0);
      float r = length(vec2(o.x * (1.0 + up * 22.0), o.y * (o.y > 0.0 ? 0.45 : 1.1)));
      float core = smoothstep(0.045, 0.012, r), body = smoothstep(0.075, 0.03, r);
      col += uFlame.w * (vec3(1.0, 0.45, 0.08) * body * 1.6 + vec3(1.0, 0.9, 0.6) * core * 2.0);
      float hd = length(o);
      col += uFlame.w * vec3(1.0, 0.6, 0.25) * 0.0016 / (hd * hd + 0.004);
    }
  }
  return col;
}

void main() {
  vec3 acc = vec3(0.0);
  for (int k = 0; k < uAA * uAA; k++) {
    vec2 o = uAA > 1 ? (vec2(k & 1, k >> 1) - 0.5) * 0.5 : vec2(0.0);
    acc += render(gl_FragCoord.xy + o);
  }
  vec3 col = pow(acc / float(uAA * uAA), vec3(0.4545));
  vec2 vg = gl_FragCoord.xy / uS - 0.5;
  pix = vec4(col * (1.0 - 0.35 * dot(vg, vg)), 1.0);
}`;

  // one program for every folk: the legendaries and the candle are switched on by uniforms, so a gallery
  // compiles the raymarcher once per context and a rare mint never stalls for a second compile
  function setup(gl) {
    const compile = (type, src) => {
      const s = gl.createShader(type); // one stage
      gl.shaderSource(s, src); // its source
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('Clay Folk shader: ' + gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram(); // shared by every Clay Folk on this context
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('Clay Folk link: ' + gl.getProgramInfoLog(prog));
    const u = {};
    const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) { const info = gl.getActiveUniform(prog, i); u[info.name] = gl.getUniformLocation(prog, info.name); }
    for (const n of ['uLeg', 'uMid', 'uCandle', 'uFlame']) if (!u[n]) u[n] = null;
    return { prog, u, tri: gl.createVertexArray() };
  }

  // ---------- the Legendaries' program ----------
  // Bronze and Mid-Shot draw with a program of their own: FRAG with their sets, materials and camera spliced in.
  // It is compiled only when one of them is drawn, so every ordinary folk (and Scrap Clay) runs exactly the program above.
  //   Bronze      a cast bust on a turned socle and a marble plinth with a brass plaque, in a dark gallery under
  //               one spotlight, its cone hazy with drifting dust; rub it for luck and the patina wears through to
  //               gold where you rub (rub enough and it blinks at you); tap to take a flash photo
  //   Mid-Shot    behind the scenes: on the animator's set before a green screen with tracking marks, held up by
  //               a rig arm, seen through the camera's viewfinder, moving on twos and talking; you're the animator:
  //               drag to pose it, let go to shoot the frame, tap the red light to play your shots back
  //   Scrap Clay  is drawn by the folk's own program again (uLeg = 3), as before v=283: every leftover scrap
  //               kneaded into one figure, knead it with a tap (a member asked for it back; the founder, 2026-10-20).
  //               The uLeg.x > 2.5 parts spliced in below (the coil, the scrap balls, the cutting mat) are no longer
  //               drawn; they stay so Bronze's and Mid-Shot's program is the one that shipped.
  const legendEdits = [
    ['uniform vec4 uFlame;  // the flame\'s centre on the set, and how lit it is\n', `uniform vec4 uFlame;  // the flame's centre on the set, and how lit it is
uniform vec4 uLeg2;   // Legendary: time, camera lift, zoom, the camera's frame counter
uniform vec4 uLeg3;   // its toys: a flash; the scrap flying in (which, how far) or the playback; the scraps caught (bits)
uniform vec4 uRub[16];   // Bronze: where it has been rubbed (x, y on the set, radius, how fresh: under 1 it still sparkles)
uniform vec4 uShot;      // Mid-Shot: shots taken, the newest's slot, the slot playing (or -1), the clapper (0 to 1)
uniform sampler2D uShots;   // Mid-Shot: the shots, small, side by side (six slots)
float sid;            // which orbiting scrap was hit
// Scrap Clay: a rope of clay coiled round and round (a helix up the head or body), grooves pressed between the turns
float coilPhase(vec3 q, float k) { return q.y * k + atan(q.z, q.x) * 0.159155 + uLeg2.x * 0.3; }
float coil(float h, vec3 q, float k) { return (h + 0.02 * (1.0 - abs(sin(3.14159 * coilPhase(q, k))))) * 0.85; }
`],
    ['  float d = p.z + 1.25, m = 0.0;\n', '  float d = 1e3, m = 0.0;   // the set wall goes in last, after the figure is cut and set up\n'],
    ['  if (cloth < d) { d = cloth; m = 5.0; }\n', '  if (uLeg.x > 2.5) cloth = coil(cloth, p - vec3(0.0, -0.2, 0.0), 6.0);\n  if (cloth < d) { d = cloth; m = 5.0; }\n'],
    ['  bool midShot = uLeg.x > 1.5 && uLeg.x < 2.5;\n', '  bool midShot = false;   // (this program\'s Mid-Shot is the whole set, below)\n'],
    ['  h = smax(h, -cut, 0.03);\n', `  h = smax(h, -cut, 0.03);
  if (uLeg.x > 2.5) h = coil(h, q, 8.0);
  if (uLeg.x > 1.5 && uLeg.x < 2.5) h = smax(h, -max(abs(q.y + 0.005) - 0.007, 0.05 - q.z), 0.006);   // the replacement face's seam
`],
    ['  mat_ = m;\n', `  if (uLeg.x > 0.5 && uLeg.x < 1.5) {
    // the bust: the body cut off in a curve under the chest, on a turned socle, a marble plinth, a brass plaque
    d = smax(d, -1.5 + 0.34 * min(1.0, p.x * p.x / 1.3) - p.y, 0.05);
    vec3 sq = p - vec3(0.0, -1.68, -0.1);
    float soc = max(length(sq.xz) - (0.24 + 0.16 * smoothstep(0.12, -0.24, sq.y)) + 0.03 * smoothstep(0.03, 0.0, abs(sq.y + 0.1)), abs(sq.y) - 0.26);
    vec3 bb = abs(p - vec3(0.0, -2.0, -0.1)) - vec3(0.42, 0.06, 0.42);
    soc = min(soc, length(max(bb, 0.0)) + min(max(bb.x, max(bb.y, bb.z)), 0.0) - 0.01);
    if (soc < d) { d = soc; m = 18.0; }   // cast with the bust
    vec3 pb = abs(p - vec3(0.0, -3.56, -0.1)) - vec3(0.95, 1.5, 0.62);
    float pl = length(max(pb, 0.0)) + min(max(pb.x, max(pb.y, pb.z)), 0.0) - 0.02;
    if (pl < d) { d = pl; m = 19.0; }
    vec3 qb = abs(p - vec3(0.0, -2.42, 0.54)) - vec3(0.34, 0.09, 0.012);
    float plq = length(max(qb, 0.0)) + min(max(qb.x, max(qb.y, qb.z)), 0.0) - 0.006;
    if (plq < d) { d = plq; m = 20.0; }
    for (int k = 0; k < 8 + min(uSteps, 0); k++) {   // the luck: coins stacked on the plinth, one for every few rubs
      if (float(k) >= uLeg2.w) break;
      vec3 cq = p - vec3((k & 1) == 0 ? 0.6 : -0.62, -2.03 + float(k >> 1) * 0.058, (k & 1) == 0 ? 0.2 : 0.16);
      cq.xz += 0.012 * vec2(sin(float(k) * 2.3), cos(float(k) * 1.7));   // stacked a little crooked
      float cn = max(length(cq.xz) - 0.15, abs(cq.y) - 0.024) - 0.006;
      if (cn < d) { d = cn; m = 20.0; }
    }
  }
  if (uLeg.x > 1.5 && uLeg.x < 2.5) {
    // the rig arm: a steel rod in from the right, a clamp on it, a ball joint into the puppet's back
    float rg = rod(p, vec3(2.8, -0.2, -0.95), vec3(0.6, -0.55, -0.6), 0.045);
    rg = min(rg, length(p - vec3(0.6, -0.55, -0.6)) - 0.1);
    vec3 cb = abs(p - vec3(1.45, -0.38, -0.79)) - vec3(0.1, 0.13, 0.1);
    rg = min(rg, length(max(cb, 0.0)) + min(max(cb.x, max(cb.y, cb.z)), 0.0) - 0.02);
    if (rg < d) { d = rg; m = 17.0; }
    // a light stand at the edge of the set, a softbox on it glaring at the puppet
    float ls = rod(p, vec3(-1.42, -3.0, -0.75), vec3(-1.42, 1.0, -0.75), 0.035);
    if (ls < d) { d = ls; m = 17.0; }
    vec3 sbx = p - vec3(-1.22, 1.05, -0.62); sbx.xz = rot(-0.6) * sbx.xz; sbx.xy = rot(0.35) * sbx.xy;
    vec3 sbq = abs(sbx) - vec3(0.34, 0.27, 0.12);
    float sbd = length(max(sbq, 0.0)) + min(max(sbq.x, max(sbq.y, sbq.z)), 0.0) - 0.02;
    if (sbd < d) { d = sbd; m = 22.0; }
  }
  if (uLeg.x > 2.5) {
    // the last scraps, rolled into balls, going round the head on a tilted ring
    // (only looked at near their ring, so the march pays for them only there)
    float ringB = length(vec2(length(p.xz * vec2(1.0, 1.27)) - 1.08, p.y - 0.32)) - 0.5;
    int caught = int(uLeg3.w + 0.5), fly = int(uLeg3.y + 0.5);
    if (ringB < d || uLeg3.z > 0.0) for (int j = 0; j < 6 + min(uSteps, 0); j++) {
      bool flying = j == fly && uLeg3.z > 0.0;
      if (((caught >> j) & 1) != 0 && !flying) continue;   // caught into the coil
      float a = uLeg2.x * 0.55 + float(j) * 1.0472;
      vec3 c = vec3(cos(a) * 1.08, 0.32 + 0.32 * sin(a + 0.7), sin(a) * 0.85);
      if (flying) c = mix(c, vec3(0.0, 0.2, 0.35), uLeg3.z);
      float b = length(p - c) - (0.075 + 0.035 * fract(float(j) * 0.618)) * (flying ? 1.0 - 0.7 * uLeg3.z : 1.0);
      if (b < d) { d = b; m = 21.0; sid = float(j); }
    }
  }
  float setWall = p.z + 1.25;
  if (setWall < d) { d = setWall; m = 0.0; }
  mat_ = m;
`],
    ['  vec3 ro = vec3(0.0, -0.15 + 0.6 * hatLift(), 6.0);\n  vec3 rd = normalize(vec3(uv * 0.25, -1.0));', '  vec3 ro = vec3(0.0, -0.15 + 0.6 * hatLift() + uLeg2.y, 6.0);\n  vec3 rd = normalize(vec3(uv * 0.25 * uLeg2.z, -1.0));\n  if (uLeg.x > 0.5 && uLeg.x < 1.5) { mat2 orb = rot(0.24 * sin(uLeg2.x * 0.33)); ro.xz = orb * ro.xz; rd.xz = orb * rd.xz; }   // the visitor walks slowly round the bust'],
    ['  if (m < 0.5) { // the set wall: painted card, sometimes papered\n', `  if (m < 0.5 && uLeg.x > 0.5) {
    vec2 w = p.xy;
    if (uLeg.x < 1.5) {   // the gallery: dark green-black, a dado rail, the spotlight's pool
      alb = uWall * 0.55 * (0.9 + 0.1 * vnoise(p * 5.0));
      alb *= 1.0 - 0.35 * smoothstep(0.012, 0.0, abs(w.y + 1.75) - 0.02);
      alb *= 0.25 + 0.75 * exp(-dot(w - vec2(0.0, 0.2), w - vec2(0.0, 0.2)) * 0.45);
    } else if (uLeg.x < 2.5) {   // the green screen, creased, with tracking marks
      alb = vec3(0.03, 0.42, 0.07) * (0.86 + 0.14 * vnoise(vec3(w * vec2(1.5, 5.0), 1.0)));
      vec2 g = fract(w * 1.6 + 0.5) - 0.5;
      float mk = max(step(abs(g.x), 0.014) * step(abs(g.y), 0.075), step(abs(g.y), 0.014) * step(abs(g.x), 0.075));
      alb = mix(alb, vec3(0.75, 0.78, 0.7), mk);
    } else {   // a green self-healing cutting mat: a fine grid, heavier every fifth line, a diagonal and a circle guide
      alb = vec3(0.025, 0.14, 0.075) * (0.9 + 0.1 * vnoise(p * 9.0));
      vec2 f1 = abs(fract(w * 8.0) - 0.5), f5 = abs(fract(w * 1.6) - 0.5);
      float ln = max(smoothstep(0.47, 0.5, max(f1.x, f1.y)) * 0.6, smoothstep(0.485, 0.5, max(f5.x, f5.y)));
      ln = max(ln, smoothstep(0.012, 0.0, abs(abs(w.x - 0.1) - abs(w.y - 0.2)) - 0.004) * 0.7);
      ln = max(ln, smoothstep(0.012, 0.0, abs(length(w - vec2(-1.1, 1.2)) - 0.62) - 0.004) * 0.7);
      alb = mix(alb, vec3(0.32, 0.52, 0.3), ln);
    }
  } else
  if (m < 0.5) { // the set wall: painted card, sometimes papered
`],
    ['  } else if (m > 14.5) { // Mid-Shot:', `  } else if (m > 17.5) {   // the Legendaries' props
    if (m < 18.5) { alb = vec3(0.05, 0.045, 0.04); spec = 0.6; }                                         // the socle: black stone, polished
    else if (m < 19.5) {                                                                                    // the plinth: dark veined marble
      float v = abs(sin(p.x * 3.0 + p.y * 1.4 + 3.5 * vnoise(p * 1.7))), v2 = abs(sin(p.x * 7.0 - p.y * 3.0 + 2.0 * vnoise(p * 4.0 + 3.0)));
      alb = vec3(0.03, 0.045, 0.04) + vec3(0.16, 0.18, 0.17) * (smoothstep(0.06, 0.0, v) * 0.8 + smoothstep(0.04, 0.0, v2) * 0.35); spec = 0.9;
    } else if (m < 20.5) { alb = vec3(0.75, 0.52, 0.2) * (1.0 - 0.6 * step(0.5, fract(p.x * 30.0)) * step(abs(p.y + 2.42), 0.03) * step(abs(p.x), 0.25)); spec = 1.5; }   // the plaque, its engraved line
    else if (m > 21.5) { alb = vec3(0.02); emit = vec3(1.0, 0.97, 0.9) * 1.6 * smoothstep(0.2, 0.8, dot(n, normalize(vec3(0.75, -0.3, 0.6)))); }   // the softbox
    else { alb = scrapCol(h31(vec3(sid, 4.0, 9.0))); bump = 1.0; }                                         // a scrap ball
  } else if (m > 14.5) { // Mid-Shot:`],
    ['  if (uLeg.x > 2.5 && (m > 0.5 && m < 1.5 || m > 4.5 && m < 8.5 || m > 9.5 && m < 11.5)) {\n', `  if (uLeg.x > 2.5 && (m > 0.5 && m < 1.5 || m > 4.5 && m < 5.5 || m > 10.5 && m < 11.5)) {
    // each turn of the coil is a different scrap, marbled a little where two were kneaded together
    vec3 cq = m < 1.5 ? q : p - vec3(0.0, -0.2, 0.0);
    float cp = coilPhase(cq, m < 1.5 ? 8.0 : 6.0), id = floor(cp);
    // a few scraps only (four, picked by the clay), and any caught scrap's colour wound into its own turns
    int ci = int(mod(id, 6.0));
    alb = ((int(uLeg3.w + 0.5) >> ci) & 1) != 0 ? scrapCol(h31(vec3(float(ci), 4.0, 9.0))) : scrapCol(h31(vec3(mod(id, 4.0), floor(uSkin.r * 97.0), m < 1.5 ? 2.0 : 5.0)));
    alb = mix(alb, scrapCol(h31(vec3(id + 9.0, 3.0, 1.0))), 0.12 * smoothstep(0.5, 0.8, vnoise(cq * 7.0)));
    alb *= 0.7 + 0.3 * pow(abs(sin(3.14159 * cp)), 0.5);
    emit = vec3(0.0);
  } else
  if (uLeg.x > 2.5 && (m > 6.5 && m < 8.5 || m > 9.5 && m < 10.5)) {
`],
    ['  if (uLeg.x > 0.5 && uLeg.x < 1.5 && m > 0.5) {\n', '  if (uLeg.x > 1.5 && uLeg.x < 2.5 && m > 0.5) col += alb * vec3(0.06, 0.5, 0.1) * rim * 1.4 * ao;   // green spill from the screen\n  if (uLeg.x > 0.5 && uLeg.x < 1.5 && m > 0.5 && m < 18.5) {\n'],
    ['    float pol = max(uLeg.w * smoothstep(0.32, 0.0, length(p.xy - uLeg.yz)), smoothstep(0.17, 0.07, length(q - vec3(0.0, -0.04, 0.62))));', `    float pol = max(uLeg.w * smoothstep(0.32, 0.0, length(p.xy - uLeg.yz)), smoothstep(0.17, 0.07, length(q - vec3(0.0, -0.04, 0.62))));
    for (int r = 0; r < 16; r++) { vec4 rb = uRub[r]; if (rb.w > 0.0) pol = max(pol, rb.w * smoothstep(rb.z, rb.z * 0.35, length(p.xy - rb.xy))); }   // rubbed for luck`],
    ['    float pat = smoothstep(0.32, 0.8,', '    float pat = smoothstep(0.18, 0.62,'],
    ['    vec3 brz = mix(vec3(0.3, 0.15, 0.06), vec3(0.85, 0.58, 0.24), pol);', '    vec3 brz = mix(vec3(0.17, 0.1, 0.05), vec3(1.0, 0.74, 0.3), pol);   // dull old bronze, rubbed to bright gold'],
    ['    vec3 ab = mix(brz, vec3(0.12, 0.3, 0.25), pat * (1.0 - pol));', '    vec3 ab = mix(brz, vec3(0.1, 0.24, 0.19), pat * (1.0 - pol));'],
    ['    float lidLine = mix(r * 1.3, -r * 1.1, uBlink);', '    float lidLine = mix(r * 1.3, -r * 1.1, max(uBlink, uLeg.x > 0.5 && uLeg.x < 1.5 && sx > 0.0 ? uLeg3.y : 0.0));   // a bronze winks one eye'],
    ['  col += emit;\n', `  col += emit;
  if (uLeg.x > 0.5 && uLeg.x < 1.5) {
    if (m > 0.5 && m < 18.5) col += uKeyC * vec3(0.9, 0.6, 0.3) * pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 3.0) * 0.35;   // a warm rim on the metal
    col += vec3(1.0, 0.97, 0.92) * uLeg3.x * (m > 0.5 ? 1.0 * max(dot(n, -rd), 0.0) : 0.25);   // the camera's flash
    if (m > 0.5 && m < 18.5) for (int r = 0; r < 16; r++) {   // a fresh rub sparkles, a four-point star on the metal
      vec4 rb = uRub[r]; if (rb.w <= 0.0 || rb.w >= 1.0) continue;
      vec2 dv = abs(p.xy - rb.xy); float k = 1.0 - rb.w;
      col += vec3(1.0, 0.92, 0.7) * k * (smoothstep(0.05, 0.0, length(dv)) * 3.0 + smoothstep(0.012, 0.0, min(dv.x, dv.y)) * smoothstep(0.22 * k, 0.0, max(dv.x, dv.y)) * 2.0);
    }
    if (uLeg3.z > -2.5 && uLeg3.z < 2.5 && m > 0.5 && m < 18.5) { float pol2 = 0.0; for (int r = 0; r < 16; r++) { vec4 rb = uRub[r]; if (rb.w > 0.0) pol2 = max(pol2, rb.w * smoothstep(rb.z, rb.z * 0.35, length(p.xy - rb.xy))); } col += vec3(1.0, 0.9, 0.6) * pol2 * smoothstep(0.18, 0.0, abs(p.x * 0.8 + p.y * 0.6 - uLeg3.z)) * 2.5; }   // the gleam
  }
  if (uLeg.x > 0.5 && uLeg.x < 1.5) {
    // the spotlight's cone, hazy where the ray crosses it in front of whatever it hit, and dust drifting in it
    float tb = (0.3 - ro.z) / rd.z;
    if (tb < t) {
      vec3 bp = ro + rd * tb;
      float rr = 0.3 + (2.9 - bp.y) * 0.27, inB = smoothstep(rr, rr * 0.5, abs(bp.x)) * smoothstep(-2.4, -1.2, bp.y);
      col += vec3(1.0, 0.86, 0.62) * inB * 0.045 * uKeyC;
      vec2 dg = vec2(bp.x * 9.0, bp.y * 9.0 + uLeg2.x * 0.6), di = floor(dg), df = fract(dg) - 0.5;
      vec2 jo = vec2(h31(vec3(di, 1.0)), h31(vec3(di, 2.0))) - 0.5;
      float mote = step(0.86, h31(vec3(di, 3.0))) * smoothstep(0.09, 0.0, length(df - jo * 0.7)) * (0.6 + 0.4 * sin(uLeg2.x * 3.0 + h31(vec3(di, 4.0)) * 6.28));
      col += vec3(1.0, 0.9, 0.7) * mote * inB * 0.9;
    }
  }
`],
    ['  pix = vec4(col * (1.0 - 0.35 * dot(vg, vg)), 1.0);', `  col *= 1.0 - 0.35 * dot(vg, vg);
  if (uLeg.x > 1.5 && uLeg.x < 2.5 && uLeg3.w < 0.5) col = viewfinder(col, gl_FragCoord.xy / uS);
  if (uLeg.x > 0.5 && uLeg.x < 1.5 && uLeg3.w > 0.0) col = polaroid(col, gl_FragCoord.xy / uS, uLeg3.w);
  pix = vec4(col, 1.0);`],
    ['void main() {\n  vec3 acc', `// Mid-Shot: the camera's viewfinder over the frame: corner marks, a centre cross, a blinking REC light and the
// frame counter in seven-segment figures
float seg7(vec2 p, int dg) {
  int b = dg == 0 ? 63 : dg == 1 ? 6 : dg == 2 ? 91 : dg == 3 ? 79 : dg == 4 ? 102 : dg == 5 ? 109 : dg == 6 ? 125 : dg == 7 ? 7 : dg == 8 ? 127 : 111;
  float r = 0.0, t = 0.16;
  if ((b & 1) != 0) r = max(r, step(abs(p.y - 2.0), t) * step(abs(p.x - 0.5), 0.45));
  if ((b & 64) != 0) r = max(r, step(abs(p.y - 1.0), t) * step(abs(p.x - 0.5), 0.45));
  if ((b & 8) != 0) r = max(r, step(abs(p.y), t) * step(abs(p.x - 0.5), 0.45));
  if ((b & 32) != 0) r = max(r, step(abs(p.x), t) * step(abs(p.y - 1.5), 0.45));
  if ((b & 2) != 0) r = max(r, step(abs(p.x - 1.0), t) * step(abs(p.y - 1.5), 0.45));
  if ((b & 16) != 0) r = max(r, step(abs(p.x), t) * step(abs(p.y - 0.5), 0.45));
  if ((b & 4) != 0) r = max(r, step(abs(p.x - 1.0), t) * step(abs(p.y - 0.5), 0.45));
  return r;
}
// Bronze: the flash photo, a polaroid that slides out and away, developing as it goes
vec3 polaroid(vec3 col, vec2 u, float age) {
  float q = clamp(age / 2.4, 0.0, 1.0), an = -0.12 - q * 0.35;
  vec2 c0 = vec2(0.82 + q * q * 0.3, 0.62 + q * 0.12), d = mat2(cos(an), -sin(an), sin(an), cos(an)) * (u - c0);
  vec2 bx = abs(d - vec2(0.0, -0.012)) - vec2(0.12, 0.145);
  float card = max(bx.x, bx.y), photo = max(abs(d.x) - 0.1, abs(d.y - 0.012) - 0.1);
  if (card > 0.0) return mix(col, col * 0.6, smoothstep(0.02, 0.0, card - 0.01) * 0.6);   // its shadow
  if (photo > 0.0) return vec3(0.95, 0.94, 0.9);
  vec2 pu = (d - vec2(0.0, 0.012)) / 0.1;
  float dev = smoothstep(0.0, 0.9, age), fig = smoothstep(0.42, 0.38, length(pu * vec2(1.0, 1.1) - vec2(0.0, 0.25))) + smoothstep(0.1, 0.0, max(abs(pu.x) - 0.75 + pu.y * 0.4, pu.y + 0.15) * 2.0) * step(pu.y, 0.0);
  vec3 img = mix(vec3(0.95, 0.9, 0.8), vec3(0.85, 0.55, 0.22), clamp(fig, 0.0, 1.0)) * (0.85 + 0.15 * pu.y);
  return mix(vec3(0.08, 0.07, 0.06), img, dev);
}
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 viewfinder(vec3 col, vec2 u) {
  int ns = int(uShot.x + 0.5), last = int(uShot.y + 0.5), play = int(uShot.z + 0.5);
  // onion skin: the last shot, faint over the live view
  if (ns > 0 && uShot.z < -0.5) col = mix(col, texture(uShots, vec2((float(last) + u.x) / 6.0, u.y)).rgb, 0.24);
  if (uShot.z > -0.5) {   // playing back: a film gate's flicker, weave and scratches
    float fr = floor(uLeg2.x * 12.0);
    col *= 0.86 + 0.14 * hash12(vec2(fr, 3.0));
    col += 0.5 * step(abs(u.x - hash12(vec2(fr, 7.0))), 0.0015) * step(0.6, hash12(vec2(fr, 9.0)));
    col *= 1.0 - 0.6 * dot(u - 0.5, u - 0.5);
  }
  col *= 1.0 - 0.4 * step(0.82, u.y);   // the read-out strip along the top
  // the strip of shots along the foot of the frame, the newest on the right
  if (u.y < 0.15 && ns > 0) {
    for (int k = 0; k < 6; k++) {
      if (k >= ns) break;
      int slot = int(mod(float(last - k) + 6.0, 6.0));
      vec2 c0 = vec2(0.86 - float(k) * 0.135, 0.03), lo = (u - c0) / vec2(0.12, 0.1);
      if (lo.x > -0.05 && lo.x < 1.05 && lo.y > -0.06 && lo.y < 1.06) {
        bool inside = lo.x > 0.0 && lo.x < 1.0 && lo.y > 0.0 && lo.y < 1.0;
        col = inside ? texture(uShots, vec2((float(slot) + lo.x) / 6.0, lo.y)).rgb : (slot == play ? vec3(0.2, 0.95, 0.35) : vec3(0.92));
      }
    }
  }
  float lw = max(2.6 / uS, 0.007);
  vec2 a = abs(u - 0.5), e = a - vec2(0.43);
  float br = (step(-lw, e.x) * step(e.x, 0.0) * step(-0.07, e.y) * step(e.y, 0.0)) + (step(-lw, e.y) * step(e.y, 0.0) * step(-0.07, e.x) * step(e.x, 0.0));
  float cr = max(step(a.x, lw * 0.5) * step(a.y, 0.022), step(a.y, lw * 0.5) * step(a.x, 0.022)) * step(lw * 1.5, max(a.x, a.y));
  col = mix(col, vec3(0.92), clamp(br + cr, 0.0, 1.0) * 0.85);
  vec2 rq = u - vec2(0.115, 0.885);
  if (uLeg3.y > 0.5) { float tri = max(abs(rq.y) * 1.7 + rq.x * 0.9 - 0.018, -rq.x - 0.016); col = mix(col, vec3(0.2, 0.95, 0.35), step(tri, 0.0)); }   // playing back
  else col = mix(col, vec3(0.95, 0.08, 0.05), smoothstep(0.024, 0.019, length(rq)) * step(0.5, fract(uLeg2.x * 0.8)));
  col = mix(col, vec3(1.0), uLeg3.x * 0.85);   // the shutter
  // the frame counter, top right: four figures
  vec2 c0 = vec2(0.73, 0.865);
  float n = uLeg2.w, dig = 0.0;
  for (int k = 0; k < 4; k++) {
    vec2 p = (u - c0 - vec2(float(k) * 0.04, 0.0)) / 0.0125;
    if (p.x > -0.4 && p.x < 1.4 && p.y > -0.4 && p.y < 2.4) dig = max(dig, seg7(p, int(mod(floor(n / pow(10.0, float(3 - k))), 10.0))));
  }
  col = mix(col, vec3(0.92), dig * 0.9);
  if (uShot.w > 0.0) {   // the clapperboard, snapping shut before the playback
    vec2 cb = u - vec2(0.5, 0.45);
    if (abs(cb.x) < 0.2 && cb.y > -0.13 && cb.y < 0.09) {
      col = vec3(0.06);
      if (abs(cb.y + 0.02) < 0.004 || (abs(cb.y + 0.07) < 0.004 && cb.x < 0.05)) col = vec3(0.85);   // chalk lines
      vec2 dp = (cb - vec2(0.08, -0.1)) / 0.012;
      for (int k = 0; k < 2; k++) { vec2 pk = dp - vec2(float(k) * 1.6, 0.0); if (pk.x > -0.4 && pk.x < 1.4 && pk.y > -0.4 && pk.y < 2.4) col = mix(col, vec3(0.85), seg7(pk, k == 0 ? 6 : 1)); }
    }
    vec2 h0 = cb - vec2(-0.2, 0.09); float an = (1.0 - uShot.w) * 0.55; h0 = mat2(cos(an), sin(an), -sin(an), cos(an)) * h0;
    if (h0.x > 0.0 && h0.x < 0.4 && h0.y > 0.0 && h0.y < 0.045) col = step(0.5, fract((h0.x + h0.y) * 18.0)) > 0.5 ? vec3(0.92) : vec3(0.06);
  }
  return col;
}
void main() {
  vec3 acc`],
  ];
  const legendFrag = () => legendEdits.reduce((s, [a, b]) => { if (!s.includes(a)) throw new Error('Clay Folk legendary shader: ' + a.slice(0, 48)); return s.replace(a, () => b); }, FRAG);
  const builtLegend = new WeakMap();
  function setupLegend(gl, src) {
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('Clay Folk legendary shader: ' + gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, src ? src() : legendFrag()));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('Clay Folk legendary link: ' + gl.getProgramInfoLog(prog));
    const u = {};
    const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) { const info = gl.getActiveUniform(prog, i); u[info.name] = gl.getUniformLocation(prog, info.name); }
    for (const n of ['uLeg', 'uMid', 'uCandle', 'uFlame', 'uLeg2', 'uLeg3', 'uShot', 'uShots']) if (!u[n]) u[n] = null;
    u.uRub = gl.getUniformLocation(prog, 'uRub');
    // the animator's camera keeps its shots: the frame is copied out and drawn small into a strip of six slots
    const bs = (type, src) => { const sh = gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh); return sh; };
    const blit = gl.createProgram();
    gl.attachShader(blit, bs(gl.VERTEX_SHADER, VERT));
    gl.attachShader(blit, bs(gl.FRAGMENT_SHADER, '#version 300 es\nprecision highp float;\nuniform sampler2D T;\nuniform vec4 V;\nout vec4 o;\nvoid main() { o = texture(T, (gl_FragCoord.xy - V.xy) / V.zw); }'));
    gl.linkProgram(blit);
    const blitU = { T: gl.getUniformLocation(blit, 'T'), V: gl.getUniformLocation(blit, 'V') };
    return { prog, u, tri: gl.createVertexArray(), blit, blitU };
  }

  Proto.add({
    num: 61,
    name: 'Clay Folk',
    fam: 'Rendered 3D',
    recipe: 'Thumb-pressed plasticine folk, lit like a stop-motion set: worked clay with dents and fingerprints, knitted collars, rolled hair. Every hash moulds a new head on its own build of body: clay, eyes and iris, mouth, nose, brows, hair or hat, facial hair, knitwear, an accessory, sometimes a friend on the shoulder, the light and the wall. It breathes and blinks.',
    interactive: 'Drag to turn its head. Tap to swap its mouth.',
    music: true,
    gl: true,
    fps: 20,
    seed: 1007,
    make(c) {
      const gl = c.gl, S = c.size | 0;

      // sfc32 seeded from the hash (the original rolls, kept in their order)
      const w = [0, 1, 2, 3].map(i => parseInt(c.hash.substr(2 + i * 8, 8), 16) >>> 0);
      let [a, b, cc, d] = w;
      const rnd = () => {
        a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; // sfc32
        let t = (a + b) | 0;
        a = b ^ (b >>> 9);
        b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11);
        d = (d + 1) | 0;
        t = (t + d) | 0;
        cc = (cc + t) | 0;
        return (t >>> 0) * (1 / 4294967296);
      };
      for (let skip = 0; skip < 12; skip++) rnd();
      const pickFrom = (gen, table) => {
        let tot = 0; for (const r of table) tot += r[1];
        let x = gen() * tot;
        for (const r of table) { x -= r[1]; if (x < 0) return r; }
        return table.at(-1);
      };
      const pick = table => pickFrom(rnd, table);
      const hex = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16) / 255);
      const lin = col => col.map(v => Math.pow(v, 2.2));

      let clay = pick([
        ['Fair', 14, '#e9b48a'], ['Tan', 14, '#b9784c'], ['Brown', 13, '#7a4a2e'], ['Deep', 10, '#4a2c1e'],
        ['Light', 12, '#f2c3a2'], ['Medium', 11, '#d79a5e'], ['Pea Green', 6, '#8fbf5a'], ['Lilac', 5, '#b49ad8'],
        ['Sky', 5, '#79b3e0'], ['Marbled', 3, '#e46f5a'],
      ]);
      let marbleMate = ['#f0e6c8', '#5a9fd8', '#f6c447'][Math.floor(rnd() * 3)];
      const eyes = pick([['Wide', 40], ['Beady', 18], ['Sleepy', 18], ['Odd Pair', 12], ['Cyclops', 4]]);
      const eyeKind = { Wide: 0, Beady: 1, Sleepy: 2, Cyclops: 3, 'Odd Pair': 4 }[eyes[0]];
      const mouth = pick([['Grin', 34], ['Toothy', 22], ['Flat', 14], ['Smirk', 16], ['Ooh', 9], ['Frown', 5]]);
      const mouthKind = { Grin: 0, Toothy: 1, Flat: 2, Smirk: 3, Ooh: 4, Frown: 2 }[mouth[0]];
      const mouthCurve = { Grin: 0.9, Toothy: 0.7, Flat: 0.05, Smirk: 0.3, Ooh: 0, Frown: -0.9 }[mouth[0]];
      const brows = pick([['Rolled', 60], ['Monobrow', 12], ['None', 28]]);
      let top = pick([['Tuft', 22, 0], ['Bowl Cut', 20, 1], ['Bun', 14, 2], ['Beanie', 16, 3], ['Bobble Hat', 14, 4], ['Party Hat', 5, 5], ['Bald', 9, 9]]);
      const knit = pick([['Striped Jumper', 30], ['Plain Jumper', 22], ['Scarf', 20], ['Turtleneck', 16], ['Bow Tie', 12]]);
      const knitKind = { 'Striped Jumper': 0, 'Plain Jumper': 1, Scarf: 2, Turtleneck: 3, 'Bow Tie': 4 }[knit[0]];
      const nose = pick([['Button', 40], ['Long', 22], ['Bulb', 22], ['Hook', 16]]);
      const noseKind = { Button: 0, Long: 1, Bulb: 2, Hook: 3 }[nose[0]];
      let wall = [['Mustard', '#e2b23c'], ['Teal', '#3f8f8c'], ['Brick', '#c0563c'], ['Duck Egg', '#a9d2cf'], ['Plum', '#6c3d63'], ['Cream', '#efe2c0'], ['Moss', '#6d8a3e'], ['Cornflower', '#6f8fd6']][Math.floor(rnd() * 8)];
      const knitCols = ['#d8433a', '#2f5fa8', '#f0c43a', '#3b8a52', '#f2efe6', '#e57aa2', '#2b2b35', '#ef8a2c'];
      const k1 = Math.floor(rnd() * knitCols.length);
      let k2 = Math.floor(rnd() * (knitCols.length - 1)); if (k2 >= k1) k2++;
      const hairCols = ['#2a1a12', '#5a3418', '#c9782d', '#e8d27a', '#1d1d24', '#d4d0c8', '#b8402e', '#3a5fb8'];
      const hairCol = hairCols[Math.floor(rnd() * hairCols.length)];
      const headW = 0.92 + rnd() * 0.18, headH = 0.92 + rnd() * 0.16, jaw = 0.85 + rnd() * 0.35;
      const eyeSize = 0.85 + rnd() * 0.35, lookX = (rnd() - 0.5) * 0.7, lookY = (rnd() - 0.5) * 0.4;
      const mouthW = 0.17 + rnd() * 0.1, mouthOpen = rnd() * 0.6;
      const browTilt = (rnd() - 0.5) * 1.6, ears = 0.8 + rnd() * 0.6;
      const blinkPhase = rnd() * 10, blinkEvery = 3.5 + rnd() * 2.5, sway = rnd() * 6.28;

      // Everything added later comes from a second stream (xorshift32 on two other hash words),
      // so the folk the founder already liked keep their faces.
      let xs = (parseInt(c.hash.slice(34, 42), 16) ^ parseInt(c.hash.slice(50, 58), 16) ^ 0x2c1b3c6d) >>> 0 || 0x9e37;
      const more = () => { xs ^= xs << 13; xs >>>= 0; xs ^= xs >>> 17; xs ^= xs << 5; xs >>>= 0; return xs / 4294967296; };
      const swapIn = (chance, table, keep) => { const r0 = more(), r1 = pickFrom(more, table); return r0 < chance ? r1 : keep; };
      clay = swapIn(0.09, [['Speckled', 6, '#e7d3b8', 3], ['Glow in the Dark', 1.5, '#b8f0a0', 2]], clay);
      const finish = clay[0] === 'Marbled' ? 1 : (clay[3] || 0);
      top = swapIn(0.36, [['Quiff', 12, 6], ['Curly Mop', 12, 7], ['Mohawk', 6, 8], ['Flat Cap', 12, 10], ['Bucket Hat', 10, 11], ['Crown', 2, 12], ['Propeller Cap', 2.5, 13]], top);
      const beard = pickFrom(more, [['None', 58, 0], ['Moustache', 12, 1], ['Beard', 10, 2], ['Sideburns', 8, 3], ['Goatee', 8, 4], ['Handlebar', 2.5, 5]]);
      let acc = pickFrom(more, [['None', 60, 0], ['Round Specs', 16, 1], ['Earring', 10, 2], ['Flower', 9, 3], ['Monocle', 2, 4]]);
      if (acc[2] === 1 && eyeKind === 3) acc = ['Monocle', 0, 4];
      if (acc[2] === 3 && top[2] >= 3 && top[2] !== 6 && top[2] !== 7 && top[2] !== 8 && top[2] !== 9) acc = ['Earring', 0, 2];
      const pal = pickFrom(more, [['None', 88, 0], ['Clay Bird', 7, 1], ['Snail', 4, 2]]);
      const iris = pickFrom(more, [['Brown', 34, '#5a3418'], ['Hazel', 18, '#8a6a2a'], ['Blue', 18, '#3f7fc8'], ['Green', 14, '#3f8a4a'], ['Grey', 10, '#7a8a96'], ['Odd', 3, '#3f7fc8']]);
      const iris2 = iris[0] === 'Odd' ? '#8a6a2a' : iris[2];
      const cheeks = pickFrom(more, [['Plain', 50, 0], ['Rosy', 30, 1], ['Freckled', 20, 2]])[2];
      const light = pickFrom(more, [['Studio', 46, 0], ['Golden Hour', 24, 1], ['Blue Hour', 22, 2], ['Spotlight', 8, 3]]);
      wall = swapIn(0.3, [['Peach', 10, '#f0b08c'], ['Lavender', 10, '#b9a8dc'], ['Sea', 8, '#4f8fb0'], ['Charcoal', 5, '#3a3a44']], wall);
      let paper = pickFrom(more, [['', 56, 0], [' Polka', 14, 1], [' Stripes', 14, 2], [' Diamonds', 12, 3], ['Starry Night', 4, 4]]);
      if (paper[2] === 4) wall = ['Starry Night', 0, '#1f2440'];
      let wallHex = wall.length > 2 ? wall[2] : wall[1];
      const palCol = ['#f0c43a', '#e57aa2', '#5aa0d8', '#8fbf5a', '#ef8a2c'][Math.floor(more() * 5)];
      const propSpin = more() * 6.283;
      // the sculpt: each head is modelled to a type (jaw at the ear, chin width, chin drop, chin jut,
      // cheekbones, brow ridge, crown, jaw softness, width, height), then nudged by the old rolls
      const shape = pickFrom(more, [
        ['Oval', 22, 0.47, 0.15, 0.45, 0.45, 1.0, 0.5, 0.3, 0.1, 1, 1],
        ['Square Jaw', 16, 0.53, 0.25, 0.5, 0.6, 0.85, 1.0, 0.0, 0.05, 1.02, 1],
        ['Heart', 14, 0.37, 0.04, 0.85, 0.6, 1.35, 0.35, 0.9, 0.1, 1.12, 1.02],
        ['Round', 16, 0.58, 0.3, -0.05, 0.2, 1.3, 0.2, -0.05, 0.26, 1.17, 0.9],
        ['Long', 12, 0.44, 0.15, 1.3, 0.6, 0.85, 0.7, 0.7, 0.08, 0.87, 1.17],
        ['Pear', 12, 0.67, 0.34, 0.25, 0.3, 1.05, 0.4, -0.5, 0.22, 0.92, 1],
        ['Egghead', 3, 0.42, 0.13, 0.55, 0.5, 0.9, 0.3, 2.5, 0.1, 0.94, 1.1],
        ['Lantern Jaw', 2.5, 0.57, 0.33, 1.0, 1.25, 0.8, 1.35, -0.1, 0.04, 1.02, 1.03],
      ]);
      const sculptW = headW * shape[10], sculptH = headH * shape[11];
      const jawLin = [shape[2] * (0.94 + 0.12 * (jaw - 0.85) / 0.35), shape[3], -0.6 - 0.12 * shape[4], 0.3 + 0.08 * shape[5]];
      const carve = [shape[6], shape[7], shape[8], shape[9]];
      c.trait('Head Shape', shape[0]);
      // the body under the head (new, last on this stream): chest width, flare to the hem, shoulder lift and
      // slope, and a belly; Regular is the original torso exactly
      const build = pickFrom(more, [
        ['Regular', 28, 0.9, 0.1, 0, 0.3496, 0], ['Narrow', 19, 0.6, 0.12, -0.04, 0.6, 0], ['Broad', 19, 1.14, 0.0, 0.05, 0.16, 0],
        ['Round Belly', 18, 0.78, 0.45, 0, 0.42, 1], ['Hunched', 16, 0.8, 0.12, 0, 0.3496, 2],
      ]);
      c.trait('Build', build[0]);
      const shoulderAt = (x, b) => -0.62 + b[4] - b[5] * (x - 0.28);
      const collarLift = shoulderAt(0, build) - shoulderAt(0, ['', 0, 0, 0, 0, 0.3496]);
      const palDX = { Narrow: -0.14, Broad: 0.08, 'Round Belly': -0.06 }[build[0]] || 0;
      const humpAt = x => -0.68 + 0.32 * Math.sqrt(Math.max(0, 1 - ((x - 0.6) / 0.42) ** 2)) + 0.03; // the top of a hunched shoulder
      const palDY = (build[6] === 2 ? Math.max(shoulderAt(0.8, build), humpAt(0.8)) : shoulderAt(0.8 + palDX, build)) - shoulderAt(0.8, ['', 0, 0, 0, 0, 0.3496]);
      const buildU = [build[2], build[3], build[4], build[5]], build2U = [build[6], collarLift, palDX, palDY];
      // how dark the clay is: on the darkest the mouth is a deep groove and the eye whites soften
      const lum = (() => { const l = hex(clay[2]).map(v => Math.pow(v, 2.2)); return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2]; })();
      const darkClay = Math.min(1, Math.max(0, (0.15 - lum) / 0.11));

      c.trait('Clay', clay[0]);
      c.trait('Eyes', eyes[0]); // the original roll
      c.trait('Iris', eyeKind === 1 ? 'Black' : iris[0]);
      c.trait('Mouth', mouth[0]); // the original roll
      c.trait('Nose', nose[0]);
      c.trait('Brows', brows[0]);
      c.trait('Top', top[0]);
      c.trait('Facial Hair', beard[0]);
      c.trait('Knitwear', knit[0]);
      c.trait('Accessory', acc[0]);
      c.trait('Pal', pal[0]);
      c.trait('Light', light[0]);
      c.trait('Backdrop', paper[2] === 4 ? 'Starry Night' : wall[0] + paper[0]);

      // The rarest folk come from a third stream (mulberry32 on a hash word nothing else reads), so
      // every ordinary mint keeps its look: about 1 in 400 is a Legendary, 1 in 200 has the candle.
      let mb = (parseInt(c.hash.slice(42, 50), 16) ^ 0x5bd1e995) >>> 0;
      const rare = () => { // an LCG step, tempered on the way out
        mb = (Math.imul(mb, 1664525) + 1013904223) >>> 0;
        let tq = mb ^ (mb >>> 11);
        tq ^= (tq << 7) & 0x9d2c5680; tq ^= (tq << 15) & 0xefc60000;
        return ((tq ^ (tq >>> 18)) >>> 0) * 2.3283064365386963e-10;
      };
      rare(); rare(); // let the first steps of the LCG settle
      const legRoll = rare(), legPick = rare(), candleRoll = rare(), candleSide = rare();
      const legend = legRoll < 0.0025 ? (legPick < 0.36 ? 1 : legPick < 0.7 ? 2 : 3) : 0;
      const candle = candleRoll < 0.005;
      if (legend) c.trait('Legendary', ['', 'Bronze', 'Mid-Shot', 'Scrap Clay'][legend]);
      if (legend === 1) { wallHex = '#2c3a34'; paper = ['', 0, 0]; c.trait('Backdrop', 'Museum'); } // a bronze stands in a gallery
      if (candle) {
        if (top[2] === 13) top = ['Beanie', 0, 3];
        c.trait('Coveted', 'Birthday Candle');
      }
      // where the candle stands: on the skull, or pressed into the hair or hat at its height there
      const candleX = top[2] === 12 ? 0 : (top[2] === 5 ? -0.24 : (candleSide < 0.5 || legend === 2 ? 0.24 : -0.24)); // a Mid-Shot's raw side has none
      const skullAt = x => 0.06 + 0.05 * carve[2] + (0.6 + 0.07 * carve[2]) * sculptH * Math.sqrt(Math.max(0.05, 1 - (x / (0.57 * sculptW)) ** 2));
      const hatAt = { 1: 0.73, 3: 0.77, 4: 0.77, 6: 0.7, 7: 0.72, 10: 0.73, 11: 0.78 }[top[2]];
      // a tall crown lifts the hair or hat, and the camera with it (hatLift in the shader)
      const lift = Math.max(0, 0.06 + 0.05 * carve[2] + (0.6 + 0.07 * carve[2]) * sculptH - 0.74), camY = -0.15 + 0.6 * lift;
      const candleY = (hatAt ? hatAt * (0.5 + 0.5 * sculptH) + lift : skullAt(candleX)) - 0.05;

      const skin = lin(hex(clay[2])), skin2 = lin(hex(marbleMate));
      const keyDir = [[-0.55, 0.65, 0.6], [-0.85, 0.32, 0.45], [0.6, 0.55, 0.6], [-0.15, 0.95, 0.4]][light[2]];
      const kl = Math.hypot(...keyDir), keyN = keyDir.map(v => v / kl);
      const keyC = [[1.05, 0.98, 0.9], [1.3, 0.86, 0.58], [0.78, 0.88, 1.12], [1.35, 1.25, 1.1]][light[2]];
      const fillC = [[0.32, 0.36, 0.45], [0.34, 0.26, 0.42], [0.26, 0.32, 0.5], [0.12, 0.13, 0.17]][light[2]];

      // The animator's hands. Drag poses the head (yaw and roll on the armature), which holds
      // and then eases home; a tap swaps the replacement mouth, as on a stop-motion set. With no
      // input every offset below is exactly zero and the rolled mouth stays, so the still is unchanged.
      const hands = c.input, voiceOut = c.sound;
      const mouthSet = [[0, 0.9, 0.35], [1, 0.7, 0.3], [4, 0, 0.45], [3, 0.3, 0.32], [2, 0.05, 0.28], [2, -0.9, 0.3]];
      let swap = -1, yaw = 0, roll = 0, peer = 0, hold = 0, squish = 0, wasDown = false, prop = 0, propV = top[2] === 13 ? 1.2 : 0;
      // the voice: a few notes from a mode picked by the hash's last word (not the look's stream)
      const tailWord = parseInt(c.hash.slice(-8), 16) >>> 0;
      const modes = [[0, 2, 4, 7, 9], [0, 3, 5, 7, 10], [0, 2, 5, 7, 9]];
      const mode = modes[tailWord % 3], voiceRoot = 55 + (tailWord >>> 3) % 6;
      // Legendary and candle state. With no input these hold still: the bronze shows only its rubbed
      // nose, the Mid-Shot stays half sculpted, the scraps lie as kneaded, and the candle burns.
      let polish = 0, knead = 0, kneadTo = 0, lit = 1, lean = 0;
      // Bronze's and Mid-Shot's toys: the bronze's rubs and flash; the animator's shots and playback. They have sets and
      // cameras of their own (ownSet); Scrap Clay is drawn and handled as at v=282, like an ordinary folk with its scraps
      const ownSet = legend === 1 || legend === 2;
      let nowT = 0, flash = 0, rubbed = 0, winkAt = -9, lastRub = null, shotFlash = 0, playAt = -9, dragFrom = null, dragGone = 0;
      const rubs = [], shots = [], rubU = new Float32Array(64);
      let pressT0 = 0, pressFrom = null, pressMoved = 0, rubTime = 0, luck = 0, gleamAt = -9, photoAt = -9, pendingShot = false, nShots = 0;   // the bronze's luck; the camera's shots
      const midStops = [-0.02, -0.2, -0.38, -0.56, -0.8];
      let midStage = 0, midCut = midStops[0], press = 0, waggle = 0;
      const playLen = () => shots.length ? 0.45 + Math.max(2.4, shots.length * 0.125 * 3) : 0;
      const pointerOnSet = () => ownSet ? [(hands.x - 0.5) * 2.75 * legCam[1], camY + legCam[0] + (0.5 - hands.y) * 2.75 * legCam[1]] : [(hands.x - 0.5) * 2.75, camY + (0.5 - hands.y) * 2.75];
      let ptr = [0, -0.2];
      // a point on the head, placed on the set: the head's pose undone (see headLocal in the shader)
      const toSet = (fx, fy, fz, turn, tilt) => {
        const c1 = Math.cos(tilt), s1 = Math.sin(tilt), x1 = c1 * fx - s1 * fy, y1 = s1 * fx + c1 * fy;
        const c2 = Math.cos(turn), s2 = Math.sin(turn);
        return [c2 * x1 - s2 * fz, y1 + 0.14, s2 * x1 + c2 * fz];
      };
      let flameW = toSet(candleX, candleY + 0.39, 0.02, 0, 0);
      const pressHands = dt => {
        if (hands.inside) ptr = pointerOnSet();
        if (legend === 1) {   // rubbing: a pressed, moving finger wears the patina through where it goes
          if (hands.down && hands.inside && !pressT0) { pressT0 = nowT; pressFrom = [hands.x, hands.y]; pressMoved = 0; }
          if (hands.down && pressFrom) pressMoved = Math.max(pressMoved, Math.hypot(hands.x - pressFrom[0], hands.y - pressFrom[1]));
          if (!hands.down && pressT0) {
            if (nowT - pressT0 < 0.25 && pressMoved < 0.03) {   // a flash photo: the bulb pops, the bronze leaps out of the dark, a polaroid slides out
              flash = 1; photoAt = nowT; voiceOut.hit('click', 0.4); voiceOut.hit('noise', 0.06, { cutoff: 6000, dur: 0.06, at: 0.02 }); voiceOut.hit('noise', 0.04, { cutoff: 2500, dur: 0.6, at: 0.3 });
            }
            pressT0 = 0; pressFrom = null;
          }
          if (hands.down && hands.inside && pressMoved > 0.02) {
            // each rub wears a bright patch (rubbing near one makes it grow), sparkles, and rings a note a step higher;
            // every so many, a coin of luck lands on the plinth; three seconds of rubbing and it winks at you
            const p = pointerOnSet();
            if (!lastRub || Math.hypot(p[0] - lastRub[0], p[1] - lastRub[1]) > 0.05) {
              let near = null, nd = 0.1;
              for (const r of rubs) { const d = Math.hypot(r[0] - p[0], r[1] - p[1]); if (d < nd) { nd = d; near = r; } }
              if (near) { near[2] = Math.min(0.32, near[2] + 0.012); near[0] += (p[0] - near[0]) * 0.2; near[1] += (p[1] - near[1]) * 0.2; }
              else { if (rubs.length >= 16) { rubs.sort((a, b) => b[2] - a[2]); rubs.pop(); } rubs.push([p[0], p[1], 0.15, 0]); }
              if (lastRub) rubTime += Math.min(0.1, dt * 3);
              lastRub = p; rubbed++;
              if (rubbed % 3 === 0) voiceOut.note(voiceRoot + 12 + mode[Math.floor(rubbed / 3) % 5] + 12 * (Math.floor(rubbed / 15) % 2), { dur: 0.35, vel: 0.06, wave: 'sine' });
              if (rubbed % 10 === 0 && luck < 8) { luck++; voiceOut.note(voiceRoot + 24 + mode[luck % 5], { dur: 0.15, vel: 0.12, wave: 'triangle' }); voiceOut.hit('click', 0.12, { at: 0.05 }); }
              if (rubTime >= 3) { rubTime = 0; winkAt = nowT; gleamAt = nowT + 0.5; [0, 4, 7, 12].forEach((k, i) => voiceOut.note(voiceRoot + 12 + k, { dur: 1.2, vel: 0.12, wave: 'sine', at: 0.25 + i * 0.1 })); }
            }
          } else lastRub = null;
          for (const r of rubs) if (r[3] < 1) r[3] = Math.min(1, r[3] + dt * 2) || 0.001;
          for (const r of rubs) r[3] = Math.min(1, r[3] + dt * 2.5);
          flash = Math.max(0, flash - dt * 3.5);
        }
        if (legend === 2) {   // the animator: a drag poses it; letting go shoots the frame
          if (hands.down && hands.inside) { if (!dragFrom) { dragFrom = [hands.x, hands.y]; dragGone = 0; } dragGone = Math.max(dragGone, Math.hypot(hands.x - dragFrom[0], hands.y - dragFrom[1])); }
          else if (dragFrom) {
            if (dragGone > 0.03 && nowT - playAt > playLen()) { shots.push([yaw, roll, peer, swap]); if (shots.length > 6) shots.shift(); pendingShot = true; voiceOut.hit('click', 0.4); voiceOut.hit('noise', 0.05, { cutoff: 5000, dur: 0.05, at: 0.03 }); }
            dragFrom = null;
          }
          if (hands.down && hands.inside && dragFrom && dragGone > 0.03 && dragGone < 0.06 && !shots.pose) { swap = (Math.max(0, swap) + 1) % mouthSet.length; shots.pose = true; }   // a fresh face for each pose
          if (!hands.down) shots.pose = false;
          shotFlash = Math.max(0, shotFlash - dt * 6);
        }
        if (legend === 2) { // the next frame is thumbed on toward its stop; a hand near the set makes the tool twitch
          midCut += (midStops[midStage] - midCut) * Math.min(1, dt * 4);
          press = Math.max(0, press - dt * 2.5);
          waggle += ((hands.inside ? Math.max(-0.14, Math.min(0.14, (ptr[1] - 0.75) * 0.2)) : 0) - waggle) * Math.min(1, dt * 4);
        }
        if (legend === 3) knead += (kneadTo - knead) * Math.min(1, dt * 2.5);
        if (candle) {
          const near = hands.inside ? Math.hypot(ptr[0] - flameW[0], ptr[1] - flameW[1]) : 9;
          lean += ((hands.inside && near < 0.6 ? Math.sign(flameW[0] - ptr[0]) * (0.6 - near) * 0.9 : 0) - lean) * Math.min(1, dt * 5);
        }
        for (const poke of hands.taps()) {
          const tp = ownSet ? [(poke.x - 0.5) * 2.75 * legCam[1], camY + legCam[0] + (0.5 - poke.y) * 2.75 * legCam[1]] : [(poke.x - 0.5) * 2.75, camY + (0.5 - poke.y) * 2.75];
          if (candle && Math.hypot(tp[0] - flameW[0], tp[1] - flameW[1]) < 0.22) {
            // blow the candle out, or strike a match and light it again
            if (lit > 0.5) { lit = 0; voiceOut.hit('noise', 0.08); voiceOut.note(voiceRoot + 12 + mode[3], { dur: 0.5, vel: 0.14, wave: 'sine' }); voiceOut.note(voiceRoot + 12 + mode[1], { dur: 0.6, vel: 0.12, wave: 'sine', at: 0.14 }); }
            else { lit = 1; voiceOut.hit('click', 0.25); [0, 2, 4].forEach((k, i) => voiceOut.note(voiceRoot + 12 + mode[k], { dur: 0.35, vel: 0.13, wave: 'triangle', at: 0.05 + i * 0.09 })); }
            continue;
          }
          if (legend === 1) continue;   // (a bronze's flash fires on a short, still release: see pressHands)
          if (legend === 2 && poke.x < 0.24 && poke.y < 0.24) {   // the red light: the clapper, then the shots played back
            if (shots.length) { playAt = nowT; voiceOut.hit('click', 0.5, { at: 0.38 }); voiceOut.hit('noise', 0.08, { cutoff: 4000, dur: 0.05, at: 0.38 }); }
            continue;
          }
          if (legend === 3) { // knead the scraps: the bands slide round to new colours
            kneadTo += 1.7;
            [0, 1, 2, 4].forEach((k, i) => voiceOut.note(voiceRoot + mode[k] + (i > 2 ? 12 : 0), { dur: 0.24, vel: 0.14, wave: 'triangle', at: i * 0.07 }));
          }
          if (swap < 0) swap = { Grin: 0, Toothy: 1, Ooh: 2, Smirk: 3, Flat: 4, Frown: 5 }[mouth[0]];
          swap = (swap + 1) % mouthSet.length;
          squish = 1;
          voiceOut.hit('click', 0.35, { pan: (poke.x - 0.5) * 0.6 });
          voiceOut.note(voiceRoot + mode[(swap * 2 + 1) % mode.length], { dur: 0.16, vel: 0.32, wave: 'triangle', cutoff: 1800, pan: (poke.x - 0.5) * 0.4 });
          voiceOut.note(voiceRoot + mode[(swap + 3) % mode.length] - 12, { dur: 0.22, vel: 0.22, wave: 'sine', at: 0.09 });
          if (top[2] === 13) { propV += 9; voiceOut.note(voiceRoot + 12 + mode[2], { dur: 0.4, vel: 0.12, wave: 'sine', at: 0.05 }); }
        }
        if (hands.down && hands.inside && legend !== 1) {   // (a bronze can't turn its head)
          const big = legend === 2 ? 2 : 1;   // the animator's pose goes much further
          const ty = Math.max(-0.65, Math.min(0.65, (hands.x - 0.5) * 0.9 * big)), tr = -(hands.x - 0.5) * 0.18 * big + (0.5 - hands.y) * 0.1 * (legend === 2 ? 2.8 : 1);
          const ease = Math.min(1, dt * 6);
          yaw += (ty - yaw) * ease; roll += (tr - roll) * ease;
          peer += ((hands.y - 0.5) * 0.4 - peer) * ease;
          hold = legend === 2 ? 1e9 : 1.2;   // an animator's pose stays put
          if (!wasDown) voiceOut.hit('blip', 0.12, { freq: 520 });
        } else if (hold > 0) hold = Math.max(0, hold - dt);
        else {
          const k = Math.min(1, dt * 1.6);
          yaw -= yaw * k; roll -= roll * k; peer -= peer * k;
          if (Math.abs(yaw) + Math.abs(roll) + Math.abs(peer) < 1e-4) yaw = roll = peer = 0;
        }
        wasDown = hands.down && hands.inside;
        squish = Math.max(0, squish - dt * 3);
        if (propV > 1.2) propV = Math.max(1.2, propV - dt * 3);
      };

      const wallLin = lin(hex(wallHex)).map(v => v * (light[2] === 2 ? 0.8 : 1));
      const cloth1 = lin(hex(knitCols[k1])), cloth2 = lin(hex(knitCols[k2])), hairLin = lin(hex(hairCol));
      const irisLin = lin(hex(iris[2])), iris2Lin = lin(hex(iris2)), palLin = lin(hex(palCol));
      // a flat cap's tweed (from the voice's word, so no other roll moves): browns, greys, greens, never white
      const capLin = lin(hex(['#7a4a28', '#77736c', '#66702e', '#4a6a44', '#9a7442', '#3e3f45', '#8c4a2c', '#50606c'][(tailWord >>> 9) % 8]));
      let G = ownSet ? builtLegend.get(gl) : built.get(gl);
      if (!G) { if (ownSet) builtLegend.set(gl, G = setupLegend(gl)); else built.set(gl, G = setup(gl)); }
      // a Legendary's camera (lift, zoom) and light: the bronze backs off to show its plinth, under one spotlight
      const legCam = legend === 1 ? [-0.8, 1.3] : [0, 1];
      // the animator's shots: a full-size copy of the frame and a strip of six small ones (only a Mid-Shot makes these)
      const shotFx = legend === 2 ? (() => {
        const tex = (w, h) => { const t2 = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t2); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null); for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v); return t2; };
        const full = tex(S, S), atlas = tex(768, 128), fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, atlas, 0);
        gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT); gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return { full, atlas, fbo };
      })() : null;
      const shotTex = () => shotFx.atlas;
      const spotN = (() => { const v = [0.12, 0.96, 0.42], l = Math.hypot(...v); return v.map(x => x / l); })();
      const draw = t0 => {
        // the Mid-Shot moves on twos (a pose held for two frames, ten a second), with a little boil between poses
        const t = legend === 2 ? Math.floor(t0 * 10) / 10 : t0, pose = Math.floor(t0 * 10);
        const boil = legend === 2 ? (Math.sin(pose * 12.9898) * 43758.5453 % 1) * 0.012 : 0;
        const ph = ((t + blinkPhase) % blinkEvery) / 0.18;
        const wk = (t0 - winkAt) / 0.5, blink = legend === 1 ? (wk > 0 && wk < 1 ? Math.sin(wk * Math.PI) : 0) : ph < 1 ? Math.sin(ph * Math.PI) : 0;   // a bronze never blinks, until it's been rubbed enough
        gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, S, S); // the shared canvas, bottom-left square
        [gl.DEPTH_TEST, gl.BLEND, gl.CULL_FACE, gl.SCISSOR_TEST].forEach(f => gl.disable(f));
        gl.colorMask(true, true, true, true);
        gl.useProgram(G.prog);
        gl.bindVertexArray(G.tri);
        const u = G.u;
        gl.uniform1f(u.uS, S); gl.uniform1f(u.uBlink, blink);
        gl.uniform1i(u.uAA, S <= 420 ? 2 : 1); gl.uniform1i(u.uSteps, 90);
        gl.uniform3fv(u.uSkin, skin); gl.uniform3fv(u.uSkin2, skin2);
        gl.uniform3fv(u.uWall, wallLin);
        gl.uniform3fv(u.uCloth, cloth1); gl.uniform3fv(u.uCloth2, cloth2);
        gl.uniform3fv(u.uHairC, hairLin);
        gl.uniform3fv(u.uIris, irisLin); gl.uniform3fv(u.uIris2, iris2Lin); gl.uniform3fv(u.uPal, palLin); gl.uniform3fv(u.uCap, capLin);
        if (legend === 1) { gl.uniform3fv(u.uKey, spotN); gl.uniform3f(u.uKeyC, 1.5, 1.32, 1.08); gl.uniform3f(u.uFillC, 0.05, 0.06, 0.07); }
        else { gl.uniform3fv(u.uKey, keyN); gl.uniform3fv(u.uKeyC, keyC); gl.uniform3fv(u.uFillC, fillC); }
        const sq = squish > 0 ? 0.05 * Math.sin(squish * Math.PI) : 0;
        gl.uniform4f(u.uHead, sq ? sculptW * (1 + sq) : sculptW, sq ? sculptH * (1 - sq) : sculptH, jaw, noseKind);
        gl.uniform4fv(u.uJaw, jawLin); gl.uniform4fv(u.uCarve, carve);
        gl.uniform4f(u.uEye, eyeKind, eyeSize, peer || yaw ? lookX + yaw * 0.5 : lookX, peer ? lookY - peer : lookY);
        // the Mid-Shot talks: its replacement mouths swapped in a little phrase, a new one every few poses
        // playing back: the shots, a pose every two frames, twice through
        const pt0 = t0 - playAt - 0.45, play = legend === 2 && shots.length && pt0 >= 0 && t0 - playAt < playLen() ? shots[Math.floor(pt0 * 8) % shots.length] : null;
        if (play) { yaw = play[0]; roll = play[1]; peer = play[2]; swap = play[3]; }
        const talk = legend === 2 && swap < 0 && !shots.length ? [0, 2, 0, 4, 1, 3, 2, 0, 0, 0][Math.floor(t0 * 3.3) % 10] : -1;
        if (talk >= 0) gl.uniform4f(u.uMouth, mouthSet[talk][0], mouthW, mouthSet[talk][1], mouthSet[talk][2]);
        else if (swap < 0) gl.uniform4f(u.uMouth, mouthKind, mouthW, mouthCurve, mouthOpen);
        else gl.uniform4f(u.uMouth, mouthSet[swap][0], mouthW, mouthSet[swap][1], mouthSet[swap][2]);
        gl.uniform4f(u.uMisc, { Rolled: 0, Monobrow: 1, None: 2 }[brows[0]], browTilt, top[2], knitKind);
        const still = legend === 1 ? 0 : 1;   // a bronze holds its pose
        const idleTurn = still * 0.12 * Math.sin(t * 0.35 + sway) + boil, idleTilt = still * 0.04 * Math.sin(t * 0.5 + sway * 1.3) - boil * 0.5;
        gl.uniform4f(u.uMore, ears, finish, yaw ? idleTurn + yaw : idleTurn, roll ? idleTilt + roll : idleTilt);
        gl.uniform4f(u.uFace, beard[2], acc[2], pal[2], cheeks);
        const turnNow = yaw ? idleTurn + yaw : idleTurn, tiltNow = roll ? idleTilt + roll : idleTilt;
        gl.uniform4f(u.uLeg, legend, ptr[0], ptr[1], legend === 1 ? polish : legend === 3 ? knead + (ptr[0] + ptr[1]) * 0.15 : 0);
        gl.uniform4f(u.uMid, midCut, Math.max(0, -0.3 - midCut) * 2.6, waggle, press);
        if (candle) flameW = toSet(candleX, candleY + 0.39, 0.02, turnNow, tiltNow);
        const flick = candle ? 0.92 + 0.08 * Math.sin(t * 13.1) * Math.sin(t * 7.3 + 1.0) : 0;
        gl.uniform4f(u.uCandle, candle ? 1 : 0, candleY, candleX, lean + 0.05 * Math.sin(t * 2.3));
        gl.uniform4f(u.uFlame, flameW[0], flameW[1], flameW[2], candle ? lit * flick : 0);
        gl.uniform4f(u.uLook, light[2], paper[2], propSpin + prop, darkClay);
        gl.uniform4fv(u.uBuild, buildU); gl.uniform4fv(u.uBuild2, build2U);
        if (ownSet) {
          gl.uniform4f(u.uLeg2, t0, legCam[0] + (play ? (Math.sin(pose * 7.1) * 0.006) : 0), legCam[1], legend === 1 ? luck : nShots ? nShots : 140 + pose);
          const playing = !!play, wk = (t0 - winkAt) / 0.9, gl0 = (t0 - gleamAt) / 0.8;
          gl.uniform4f(u.uLeg3, legend === 1 ? flash : shotFlash, legend === 1 ? (wk > 0 && wk < 1 ? Math.sin(wk * Math.PI) : 0) : playing ? 1 : 0, legend === 1 ? (gl0 > 0 && gl0 < 1 ? -2.5 + gl0 * 5 : -9) : 0, legend === 1 ? (t0 - photoAt < 2.6 ? t0 - photoAt : 0) : pendingShot ? 1 : 0);
          if (legend === 1) { rubU.fill(0); rubs.forEach((r, i) => rubU.set(r, i * 4)); gl.uniform4fv(u.uRub, rubU); }
          if (legend === 2) {
            const clap = t0 - playAt < 0.45 && shots.length ? (t0 - playAt) / 0.45 : 0;
            gl.uniform4f(u.uShot, Math.min(6, nShots), (nShots + 5) % 6, play ? (nShots - shots.length + Math.floor(pt0 * 8) % shots.length) % 6 : -1, clap);
            gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, shotTex()); gl.uniform1i(u.uShots, 0);
          }
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (legend === 2 && pendingShot) {
          // the shot just taken (drawn without the viewfinder): copied out, drawn small into the next slot of the strip,
          // then the frame drawn again with the viewfinder and the shutter
          const fx = shotFx;
          gl.bindTexture(gl.TEXTURE_2D, fx.full); gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, S, S);
          gl.bindFramebuffer(gl.FRAMEBUFFER, fx.fbo); gl.viewport((nShots % 6) * 128, 0, 128, 128);
          gl.useProgram(G.blit); gl.uniform1i(G.blitU.T, 0); gl.uniform4f(G.blitU.V, (nShots % 6) * 128, 0, 128, 128);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, S, S); gl.useProgram(G.prog);
          nShots++; pendingShot = false; shotFlash = 1;
          gl.uniform4f(u.uLeg2, t0, legCam[0], legCam[1], nShots);
          gl.uniform4f(u.uLeg3, 1, 0, 0, 0);
          gl.uniform4f(u.uShot, Math.min(6, nShots), (nShots + 5) % 6, -1, 0);
          gl.bindTexture(gl.TEXTURE_2D, fx.atlas);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
        gl.bindVertexArray(null);
      };
      draw(0);
      return (t, dt) => { const step = dt || 0.05; nowT = t; pressHands(step); prop += propV * step; draw(t); };
    },
  });
})();

})(window.Proto);
