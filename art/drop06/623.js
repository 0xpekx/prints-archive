// Chalk Desert: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/623.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ae){Ae&&Ae.add({num:623,name:"Chalk Desert",fam:"Vistas",recipe:"The White Desert of Farafra on a full moon night, standing among chalk mushrooms, sugarloaf cones and humps on cream sand scattered with black stones, with low mist on the plain and hills far off. Where you stand, how high the moon is and the haze change every mint. Nothing to touch, just watch the dust drift, the mist breathe, the shadows creep and now and then a meteor go over.",interactive:"Nothing to touch: thin dust drifts at ground level, the mist breathes, the moon and the shadows creep and now and then a meteor crosses",music:!1,gl:!0,fps:30,seed:0,make(tt){const t=tt.gl,V=tt.size,N=!!tt.home,et=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,so=et+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",it=`
uniform vec4 uU[19]; uniform highp sampler3D uN;
#define CAM uU[0].xyz
#define TANH uU[0].w
#define FW uU[1].xyz
#define PXA uU[1].w
#define RT uU[2].xyz
#define TT uU[2].w
#define UPV uU[3].xyz
#define SZF uU[3].w
#define MOON0 uU[4].xyz
#define BLOOM uU[4].w
#define MOON uU[5].xyz
#define MTAN uU[5].w
#define MOONC uU[6].rgb
#define EXPO uU[6].w
#define AMBC uU[7].rgb
#define FOGK uU[7].w
#define HAZEC uU[8].rgb
#define COVER uU[8].w
#define NEARS uU[9].x
#define FARS uU[9].y
#define RIMH uU[9].z
#define DUSTA uU[9].w
#define WIND uU[10].xy
#define AZF uU[10].z
#define MOONSZ uU[10].w
#define AZA uU[11].xy
#define AZB uU[11].zw
#define CHILL uU[12].x
#define NFORM uU[12].y
#define SKYK uU[12].z
#define IZ int(uU[13].x)
#define MISTK uU[13].y
#define MISTY uU[13].z
#define MISTH uU[13].w
#define MDISC uU[14].rgb
#define ECL uU[14].w
#define HALO uU[12].x
#define STORM uU[12].w
#define SPILL uU[15]
#define MET0 uU[16]
#define MET1 uU[17]
#define HZC uU[18].xy
#define HZH uU[18].z
float smin(float a, float b, float k){ float h = max(k - abs(a - b), 0.) / k; return min(a, b) - h * h * k * .25; }
float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) * (1. / 64.), 0.).r; }
vec3 ray(vec2 fc){ vec2 q = fc / SZF * 2. - 1.; return normalize(FW + (q.x * RT + q.y * UPV) * TANH); }
vec2 octE(vec3 n){ n /= abs(n.x) + abs(n.y) + abs(n.z); vec2 e = n.y >= 0. ? n.xz : (1. - abs(n.zx)) * (step(0., n.xz) * 2. - 1.); return e * .5 + .5; }
vec3 octD(vec2 e){ e = e * 2. - 1.; vec3 n = vec3(e.x, 1. - abs(e.x) - abs(e.y), e.y); if (n.y < 0.) n.xz = (1. - abs(n.zx)) * (step(0., n.xz) * 2. - 1.); return normalize(n); }
vec3 hazeCol(vec3 rd){
  float m = max(dot(rd, MOON0), 0.);
  return HAZEC * (.92 + 1.3 * pow(m, 5.) + .45 * m);
}
`,Bt=`
uniform sampler2D uHN, uHF;
float hTail(vec2 xz){
  vec2 u = xz / NEARS;
  if (max(abs(u.x), abs(u.y)) < .985) return textureLod(uHN, u * .5 + .5, 0.).b;
  return textureLod(uHF, xz / FARS * .5 + .5, 0.).b;
}
vec4 hAll(vec2 xz){
  vec2 u = xz / NEARS;
  if (max(abs(u.x), abs(u.y)) < .985) return textureLod(uHN, u * .5 + .5, 0.);
  return textureLod(uHF, xz / FARS * .5 + .5, 0.);
}
vec2 hAt(vec2 xz){
  vec2 u = xz / NEARS;
  if (max(abs(u.x), abs(u.y)) < .985) return textureLod(uHN, u * .5 + .5, 0.).rg;
  return textureLod(uHF, xz / FARS * .5 + .5, 0.).rg;
}
`,Fe=`
float sdForm(vec3 q, vec4 a, vec4 b, vec4 f, vec4 e, float fine){
  float H = a.w, sw = f.x, sc = b.w, sd = f.z;
  vec2 cs = vec2(cos(f.y), sin(f.y));
  vec2 xz = vec2(q.x * cs.x - q.z * cs.y, q.x * cs.y + q.z * cs.x);
  xz.x /= e.y;
  xz -= vec2(sin(sd * 7.1), cos(sd * 5.3)) * q.y * q.y / (H + 1.5) * .05;
  xz.y *= 1. + .3 * sin(sd * 13.7);
  // the windward face is sand-blasted smooth; the lee keeps its pits and lobes
  float ww = smoothstep(-.2, .7, -dot(q.xz, WIND) / (length(q.xz) + .3)), rough = 1. - .62 * ww;
  // noise scales follow the form's size, so a big far hill is not ragged
  float ns = min(1., 7. / H);
  float wob = n3(vec3(xz * (.42 * ns) + sd * 11.3, q.y * .5 * ns + sd * 3.)) - .5;
  float s = (q.y + wob * H * .1) / H;
  float t1 = smoothstep(0., sw, s), t2 = smoothstep(sw, sc, s);
  float mush = 1. - step(.5, e.z), cut = step(3.5, e.z) * step(e.z, 4.5);
  // a mushroom's cap is a slab: a short flare under it and a near-flat top with a firm shoulder (no bulb)
  t2 = mix(t2, smoothstep(sc - .07, sc - .01, s), mush);
  float R = mix(mix(b.x, b.y, t1), b.z, t2);
  // a sugarloaf is a tent: straight, slightly hollow flanks from the foot to a broken slab at the top
  R = mix(R, mix(b.z, b.x, pow(1. - clamp(s * 1.05, 0., 1.), 1.3)), cut);
  // a harder cap rock overhangs a little on some forms
  R += max(e.w, mush) * b.z * .16 * smoothstep(sc - .06, sc + .02, s);
  float over = clamp((s - sc) / max(1. - sc, .05), 0., 1.);
  R *= cut > .5 ? 1. : sqrt(max(0., 1. - pow(over, mix(mix(2.3, 6., e.w), 11., mush))));
  // whalebacks: a dome across (the home's keep their first shape, kind 5.3), its crest along the wind and sinking downwind, so no flank stands as a flat wall
  float wb = step(4.5, e.z) * step(e.z, 5.1), tw = 1. - .5 * smoothstep(1.5, 2.4, e.y) * smoothstep(-1., 1.2, xz.x / b.z);
  R = mix(R, b.x * pow(max(0., 1. - pow(clamp(s / tw, 0., 1.), 1.7)), .7), wb);
  // soft irregular bedding, shallow vertical fluting on the flanks
  float y2 = q.y + .3 * sin(xz.x * .6 + sd * 9.) * sin(xz.y * .5 + sd);
  float ledge = n3(vec3(sd * 17., y2 * 1.3 * ns, sd * 4.1)) - .5;
  float flute = n3(vec3(xz * 2.1 * ns + sd * 5., q.y * .2 + sd)) - .5;
  float lob = n3(vec3(xz * 1.1, q.y * 1.3) * ns + sd * 31.) - .5;
  // wind ribs along a whaleback's flanks (grooves at uneven heights) in place of the vertical fluting
  float rib = abs(fract(y2 * 1.7 + ledge * 2.2 + lob * .9) - .5) * 2.;
  // cones: no wobble in the radius high up (it cut a neck under the top); two to four level beds, each a ledge
  // with a hard upper edge, at uneven heights (from the ledge noise)
  float fb = fract(s * (2. + floor(fract(sd * 5.3) * 3.)) + ledge * .8 + sd);
  R *= 1. + cut * (.04 + .03 * fract(sd * 2.9)) * (fb - smoothstep(.86, 1., fb) - .45) * (1. - smoothstep(.5, .7, s));
  R *= 1. + (wob * .4 * (1. - cut * smoothstep(.55, .75, s)) + lob * .12) * (.45 + .55 * rough) * (1. - .45 * mush) + ledge * .1 * (1. - .55 * s) + flute * .12 * (1. - ww) * (1. - .85 * wb) - wb * .055 * smoothstep(.5, .95, rib) * (.55 + .45 * ww) * (.6 + .8 * lob);
  // wind cut near the ground, deepest on the windward side
  R *= 1. - .24 * exp(-pow((q.y - .45) * 2.2, 2.)) * abs(f.w) * (.6 + .8 * ww);
  float r = length(xz);
  float d = (r - R) * .62;
  d += fine * (n3(q * 3.1 + sd) - .5) * .09 * (.4 + .6 * rough) * smoothstep(0., .4, R);
  float top = H * (1. + .1 * lob * (1. - .7 * mush));
  // whalebacks: blunt and high to windward, tapering downwind; and never above the dome's own apex (s = 1, s = tw on
  // a whaleback): between the two R is 0 and d = .62 r drew a needle (a white peg) on the summit
  top = min(top * tw, H * mix(1., tw, wb) - wob * H * .1);
  // stumps and cones end in a broken, tilted cut with an edge
  if (f.w < 0. || cut > .5) {
    vec2 td = vec2(cos(sd * 9.1), sin(sd * 9.1));
    float jag = n3(vec3(xz * mix(1.3, 3.2, cut) + sd * 4., sd)) - .5;
    top = H * (mix(.93, .86 + .09 * fract(sd * 6.1), cut) + jag * mix(.22, .04, cut)) - dot(xz, td) * (.35 + .5 * fract(sd * 3.7)) * mix(1., .3, cut) * (1. + jag * (1. - cut));
  }
  return max(d, (q.y - top) * mix(.8, .6, cut));
}
`,ro=et+it+Bt+`
out vec4 o;
void main(){
  vec3 rd = ray(gl_FragCoord.xy), ro = CAM;
  float t = -1.;
  if (rd.y < .02) {
    float a = 0., fa = ro.y - hAt(ro.xz).r;
    float b = rd.y < -1e-4 ? min(fa / -rd.y * 1.3 + 6., 9000.) : 9000.;
    float tt = .02;
    for (int i = 0; i < 90; i++) {
      vec3 p = ro + rd * tt;
      float f = p.y - hAt(p.xz).r;
      if (f < .002 * tt) { a = tt; t = tt; break; }
      a = tt; fa = f;
      tt += max(f * .9, tt * .012 + .03);
      if (tt > b) break;
    }
    if (t > 0.) {
      float lo = max(t * .7, .01), hi = t;
      for (int i = 0; i < 6 + IZ; i++) { float m = .5 * (lo + hi); vec3 p = ro + rd * m; if (p.y - hAt(p.xz).r < 0.) hi = m; else lo = m; }
      t = hi;
    }
  }
  if (t <= 0.) { o = vec4(0.); gl_FragDepth = 1.; return; }
  vec3 p = ro + rd * t;
  float e = max(.24, t * .004);
  vec3 n = vec3(0., 2. * e, 0.);
  for (int i = 0; i < 4 + IZ; i++) {
    vec2 k = i == 0 ? vec2(1., 0.) : i == 1 ? vec2(-1., 0.) : i == 2 ? vec2(0., 1.) : vec2(0., -1.);
    float hv = hAt(p.xz + k * e).r;
    n.xz -= k * hv;
  }
  n = normalize(n);
  o = vec4(t, octE(n), 0.);
  gl_FragDepth = clamp(t / 9000., 0., 1.);
}`,io=et+it+`
in vec4 iA, iB, iF, iE; flat out vec4 vA, vB, vF, vE; flat out float vId; out vec3 vW;
void main(){
  vec3 c = vec3(float((gl_VertexID >> 0) & 1), float((gl_VertexID >> 1) & 1), float((gl_VertexID >> 2) & 1));
  float R = (max(iB.x, max(iB.y, iB.z)) * 1.55 + iA.w * .22 + .6) * max(iE.y, 1.);
  vec3 p = vec3(iA.x, iA.z - 1., iA.y) + vec3((c.x - .5) * 2. * R, c.y * (iA.w * 1.2 + 1.5), (c.z - .5) * 2. * R);
  vA = iA; vB = iB; vF = iF; vE = iE; vW = p; vId = float(gl_InstanceID);
  vec3 v = p - CAM;
  float z = dot(v, FW);
  gl_Position = vec4(dot(v, RT) / TANH, dot(v, UPV) / TANH, 0., z);
}`,co=et+it+Fe+`
flat in vec4 vA, vB, vF, vE; flat in float vId; in vec3 vW; out vec4 o;
void main(){
  vec3 rd = normalize(vW - CAM), ro = CAM;
  vec3 C = vec3(vA.x, vA.z, vA.y);
  float R = (max(vB.x, max(vB.y, vB.z)) * 1.55 + vA.w * .22 + .6) * max(vE.y, 1.);
  vec3 ib = 1. / rd, bmin = C + vec3(-R, -1., -R), bmax = C + vec3(R, vA.w * 1.2 + .5, R);
  vec3 ta = (bmin - ro) * ib, tb = (bmax - ro) * ib, tmn = min(ta, tb), tmx = max(ta, tb);
  float t0 = max(max(tmn.x, max(tmn.y, tmn.z)), 0.), t1 = min(tmx.x, min(tmx.y, tmx.z));
  if (t1 < t0) discard;
  // one loop, one call of sdForm (Windows compiles every call site): the march, then four taps for the normal.
  // A grazing ray that runs out of steps right beside the surface still counts as a hit (no stepped outline)
  float t = t0, hit = -1., eps = max(.004, t0 * PXA * .7), dm = 1e9, tm = 0., e = 0.;
  vec3 n = vec3(0.), ph = vec3(0.);
  int j = -1;
  for (int i = 0; i < 100 + IZ; i++) {
    vec3 k = j == 0 ? vec3(1., -1., -1.) : j == 1 ? vec3(-1., -1., 1.) : j == 2 ? vec3(-1., 1., -1.) : vec3(1.);
    vec3 pp = j < 0 ? ro + rd * t - C : ph + k * e;
    float d = sdForm(pp, vA, vB, vF, vE, j < 0 ? .5 : 1.);
    if (j >= 0) {
      n += k * d; j++;
      if (j > 3) break;
    } else {
      if (d < eps) hit = t;
      else {
        if (d < dm) { dm = d; tm = t; }
        t += d * .85 + eps * .4;
        if (t > t1 || i >= 95) { if (dm < eps * 2.2) hit = tm; else break; }
      }
      if (hit >= 0.) { ph = ro + rd * hit - C; e = max(.012, hit * PXA * 1.3); j = 0; }
    }
  }
  if (hit < 0.) discard;
  n = normalize(n);
  o = vec4(hit, octE(n), vId + 1.);
  gl_FragDepth = clamp(hit / 9000., 0., 1.);
}`,lo=et+it+Bt+`
uniform vec4 uHZ; out vec4 o;
float hor(vec2 p, float h0, vec2 d, float dt){
  float m = -1., t = dt * .8;
  for (int i = 0; i < 46; i++) {
    vec2 q = p + d * t;
    if (max(abs(q.x), abs(q.y)) > FARS) break;
    vec4 v = hAll(q);
    if (!(v.a > 50. && h0 + MTAN * t < v.a - 100.)) m = max(m, (v.g - h0) / t);
    t = t * 1.12 + dt * .35;
  }
  return m;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uHZ.y;
  vec2 p = (uv * 2. - 1.) * uHZ.x + uHZ.zw;
  float h0 = hAt(p).r + .03, dt = uHZ.x * 2. / uHZ.y;
  // both moon azimuths through one call site
  vec2 hv = vec2(0.);
  for (int k = 0; k < 2 + IZ; k++) { float v = hor(p, h0, k == 0 ? AZA : AZB, dt); if (k == 0) hv.x = v; else hv.y = v; }
  o = vec4(hv, 0., 1.);
}`,ee=`
uniform sampler2D uG, uF; out vec4 o;
float hsh(vec2 p){ vec3 q = fract(vec3(p.xyx) * .1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
vec3 hsh3(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx); }
`,ho=et+it+ee+`
// the far rim: three ranges of hills, each a low silhouette
vec3 sky(vec3 rd){
  float my = max(dot(rd, MOON0), 0.), el = max(rd.y, 0.);
  vec3 z = vec3(.0085, .0135, .03) * SKYK, h = HAZEC * .55;
  vec3 col = mix(h, z, pow(smoothstep(0., .62, el), .55));
  col += vec3(.1, .125, .17) * (pow(my, 40.) * .35 + pow(my, 6.) * .2 + pow(my, 2.) * .06) * SKYK;
  // stars: thin close to the moon, more toward the dark side
  if (el > .005) {
    vec3 a = abs(rd), u = a.x > a.y && a.x > a.z ? rd.yzx / a.x : a.y > a.z ? rd.zxy / a.y : rd.xyz / a.z;
    float face = a.x > a.y && a.x > a.z ? (rd.x > 0. ? 1. : 2.) : a.y > a.z ? (rd.y > 0. ? 3. : 4.) : (rd.z > 0. ? 5. : 6.);
    float thin = smoothstep(.03, .2, 1. - my), hz = smoothstep(.0, .2, el) * (1. - .75 * STORM * smoothstep(.45, 0., el));
    thin *= thin;
    float acc = 0.; vec3 tint = vec3(0.);
    for (int k = 0; k < 2 + IZ; k++) {
      float cells = k == 0 ? 170. : 400.;
      vec2 g = (k == 0 ? u.xy : vec2(u.x * .77 - u.y * .64, u.x * .64 + u.y * .77)) * cells, id = floor(g), fr = g - id;
      vec3 r = hsh3(vec3(id, face * 7. + float(k) * 3.));
      float mag = k == 0 ? pow(r.z, 130.) * 1.7 : pow(r.z, 300.) * .35;
      if (mag > .006) {
        vec2 c = fr - (.08 + .84 * r.xy);
        float px = PXA * cells;
        float s = exp(-dot(c, c) / max(px * px * .42, 1e-7));
        mag *= min(1., .0013 / PXA);
        acc += mag * s;
        tint += mag * s * mix(vec3(1., .86, .72), vec3(.74, .84, 1.), fract(r.x * 7.3));
      }
    }
    col += tint * (.55 + .45 * thin) * thin * hz * 1.25 * (1. + 1.6 * ECL) * (1. - .55 * HALO);
    // faint band of dust far across the sky, a little brighter toward the dark side
    float mw = n3(rd * 2.4 + 3.) * n3(rd.zxy * 6.5 + 9.);
    col += vec3(.007, .009, .014) * smoothstep(.18, .48, mw) * smoothstep(.1, .55, el) * (.4 + thin * .6) * SKYK;
  }
  // thin high cloud: a 22 degree ring and a few silver bars near the moon
  if (HALO > 0.) {
    float ga = acos(clamp(dot(rd, MOON0), -1., 1.));
    float bars = smoothstep(.45, .75, n3(vec3(rd.x * 3., rd.y * 26., rd.z * 3.) + 5.)) * smoothstep(.75, .1, ga) * smoothstep(0., .15, el);
    float veil = (.3 + .7 * smoothstep(.3, .7, n3(vec3(rd.x * 2.2, rd.y * 9., rd.z * 2.2) + 2.))) * smoothstep(0., .2, el);
    col += vec3(.06, .066, .075) * HALO * (exp(-pow((ga - .384) / .03, 2.)) * .22 * veil + exp(-ga * 2.5) * .45 * veil + veil * .1 + bars * .45);
  }
  // after a sandstorm the low sky is a tawny band
  col = mix(col, vec3(.12, .1, .08), STORM * smoothstep(.3, .0, el) * .75);
  // the rim: three ranges, farther paler; the base dissolves into the haze along the plain
  float m5 = max(dot(rd, MOON0), 0.);
  vec3 hz2 = HAZEC * (.92 + .45 * m5 + .35 * pow(m5, 5.));
  float lrd = length(rd.xz) + 1e-5; vec2 az = rd.xz / lrd;
  float rimT = -1.;
  for (int k = 2; k >= -IZ; k--) {
    float fk = float(k);
    float ridge = (.009 + .0065 * fk) * RIMH * (.7 + 1.1 * n3(vec3(az * (5. + 2.7 * fk), 2. + fk * 5.)))
      + .004 * RIMH * n3(vec3(az * 21., 8. + fk))
      + .0016 * n3(vec3(az * 61., 3. + fk));
    float esc = step(1.5, RIMH);
    float flt = (.012 + .0055 * fk) * RIMH * (.92 + .1 * n3(vec3(az * 3., fk))) * (fk < 1.5 ? smoothstep(.5, .56, n3(vec3(az * (7. + fk * 3.), 11. + fk))) : 1.);
    ridge = mix(ridge, min(ridge * 1.6, flt), esc);
    float m = smoothstep(ridge, ridge - PXA * 1.4, rd.y);
    if (m > 0.) {
      float shade = .45 + .55 * n3(vec3(az * 34., 3. + fk * 2.));
      shade *= 1. - esc * .35 * smoothstep(.3, .7, fract(rd.y / max(ridge, 1e-4) * 3.2 + .3 * n3(vec3(az * 40., fk))));
      vec3 rc = mix(vec3(.018, .025, .043) * (.8 + .4 * shade), hz2 * .95, .1 + .32 * (2. - fk) / 2.);
      rc = mix(rc, hz2, smoothstep(ridge * .65, 0., rd.y));
      col = mix(col, rc, m);
      rimT = fk;
    }
  }
  return col;
}
void main(){
  vec4 g = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
  if (g.r > 0.) discard;
  o = vec4(sky(ray(gl_FragCoord.xy)), -1.);
}`,fo=et+it+Bt+ee+`
// stones: pyrite nodules in three sizes. coverage in a; returns height in rgb's x etc via out params
void stones(vec2 p, float dens, float rub, float sharp, out float blk, out float wht, out float shad, out vec3 sN, out float glint){
  blk = 0.; wht = 0.; shad = 1.; sN = vec3(0.); glint = 0.;
  float t2p = sharp * 1.3;
  vec2 md = normalize(MOON0.xz + 1e-5); float ml = min(4.2, 1. / max(MTAN, .1));
  for (int k = 0; k < 3 + IZ; k++) {
    float fk = float(k);
    float cell = k == 0 ? .2 : k == 1 ? .62 : 2.1;
    float rmin = k == 0 ? .01 : k == 1 ? .022 : .038, rmax = k == 0 ? .026 : k == 1 ? .05 : .075;
    float fp = t2p / (rmin * 2.5);
    vec2 g = p / cell, id = floor(g);
    float fS = sharp, kb = 0.;
    float dk = dens * (k == 0 ? 1.3 : k == 1 ? .7 : .28), rm = mix(rmin, rmax, .3);
    float avg = min(dk * rm * rm * 3.14 / (cell * cell) * 1.4, .6);
    if (fp > 2.6) { blk = max(blk, avg); continue; }
    for (int n = 0; n < 9 + IZ; n++) {
      vec2 c = id + vec2(float(n % 3 - 1), float(n / 3 - 1));
      vec3 h = hsh3(vec3(c, 19. + fk * 41.));
      if (h.z > dk + rub * (k == 0 ? .25 : 1.1)) continue;
      float rr = mix(rmin, rmax, pow(fract(h.x * 53.7 + h.y * 11.3), 3.4));
      float isW = step(fract(h.z * 37.1 + h.x * 3.3), rub);
      vec2 q = p - (c + h.xy) * cell;
      // an irregular, skewed outline; the height of a rounded nodule
      float r = rr * (1. + (.5 - h.x) * .44 * q.x / rr + (.5 - fract(h.y * 7.9)) * .36 * q.y / rr), l2 = dot(q, q);
      float cv = smoothstep(r + fS, r - fS, sqrt(l2));
      float nh = sqrt(max(1. - l2 / (r * r), .0));
      sN += vec3(q.x / r * .95, nh + .15, q.y / r * .95) * cv; kb = max(kb, cv * (1. - isW)); wht = max(wht, cv * isW);
      glint = max(glint, cv * (1. - isW) * step(.93, fract(h.y * 71.3)));
      // the small cast shadow down moon, away from the moon
      vec2 sq = q + md * r * ml * .36;
      float sl = dot(sq, md) / (r * (1. + ml * .36)), st = (sq.x * md.y - sq.y * md.x) / r;
      shad *= 1. - .5 * smoothstep(1.0, .5, sl * sl + st * st * .91) * (1. - cv) / (1. + fp * .35);
    }
    // with distance the stones of this size become a speckle, then only a darker tone
    blk = max(blk, mix(kb, avg, smoothstep(.7, 2.6, fp)));
    wht *= 1. - smoothstep(.7, 2.6, fp);
  }
  blk = clamp(blk, 0., 1.);
}
void main(){
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec4 g = texelFetch(uG, ip, 0);
  vec3 rd = ray(gl_FragCoord.xy);
  float t = g.r;
  if (t <= 0. || g.a > .5) discard;
  vec3 p = CAM + rd * t;
  vec3 N = octD(g.gb);
  float fid = g.a;
  float foot = t * PXA / max(.07, abs(dot(rd, N)) + .05);
  vec3 M = MOON0;
  float ao = 1., direct, amb;
  vec3 alb;
  {
    // ---------- the plain ----------
    vec2 xz = p.xz;
    vec2 h = hAt(xz);
    float tl = hTail(xz);
    // pale crust and thin sand: mottled at several scales
    vec2 xr = vec2(xz.x * .788 - xz.y * .616, xz.x * .616 + xz.y * .788);
    float n0 = n3(vec3(xr * .09, 2.)), n1 = n3(vec3(xr.yx * .55, 5.)), n2 = n3(vec3(xr * 2.3, 9.)), n3a = n3(vec3(xr.yx * 8.7, 13.));
    float pave = smoothstep(.57, .61, n0 * .62 + n1 * .26 + (n2 - .5) * .16 + (n3a - .5) * .05 + h.r * .1);
    float sandy = clamp(smoothstep(.02, .25, tl) + 1. - pave, 0., 1.);
    float crust = 1. - sandy;
    alb = mix(vec3(.31, .305, .3), vec3(.31, .262, .2), sandy);
    alb *= .92 + .1 * (n0 - .5) + .12 * (n1 - .5) + .1 * (n2 - .5) + .05 * (n3a - .5);
    // bump: grain, fine crust, faint ripples on sand; the amplitudes fall away with distance
    float ampF = 1. / (1. + foot * 60.);
    vec2 wd = normalize(WIND), wr = vec2(-wd.y, wd.x);
    float cf = dot(xz, wr);
    float ripA = sandy * .0035 * smoothstep(.3, .75, n0) * (1. - smoothstep(0., 1., foot / .012));
    float e = max(foot * .6, .003);
    #define HH(q) (n3(vec3((q) * 11., 3.)) * .007 * crust * ampF + n3(vec3((q) * 33., 8.)) * .003 * ampF * crust + n3(vec3(vec2((q).x * .788 - (q).y * .616, (q).x * .616 + (q).y * .788) * 3.1, 11.)) * .03 / (1. + foot * 8.) + n3(vec3(vec2((q).x * .9 - (q).y * .44, (q).x * .44 + (q).y * .9) * .85, 21.)) * .032 + sin(dot(q, wr) * 66. + 3. * n1 + 8. * n2) * ripA + sin(dot(q, wr) * 13. + 5. * n1 + 2.5 * n3a + 6. * n2) * .006 * crust / (1. + foot * 25.))
    vec2 hg = vec2(0.);
    for (int i = 0; i < 4 + IZ; i++) {
      vec2 k = i == 0 ? vec2(1., 0.) : i == 1 ? vec2(-1., 0.) : i == 2 ? vec2(0., 1.) : vec2(0., -1.);
      vec2 qh = xz + k * e;
      hg += k * HH(qh);
    }
    N = normalize(N + vec3(-hg.x, 0., -hg.y) / (2. * e));
    // fine crackle in the crust, dark and thin
    float crk = (1. - smoothstep(0., .035, abs(n3(vec3(xr * 3.3, 1.)) - .5))) * crust * ampF;
    float crk2 = (1. - smoothstep(0., .05, abs(n3(vec3(xr.yx * 9.5, 6.)) - .5))) * crust * ampF;
    alb *= 1. - .16 * crk - .09 * crk2;
    float nearF = 1. / (1. + foot * 90.);
    alb *= 1. + (.26 * (n3(vec3(xr * 91., 3.)) - .5) + .2 * (n3(vec3(xr.yx * 247., 7.)) - .5)) * nearF;
    // proximity to the chalk forms
    float ht = hAt(xz).g, near0 = max(0., ht - h.r);
    float occ = 0.;
    for (int i = 0; i < 8 + IZ; i++) {
      float a = float(i) * 2.399 + hsh(vec2(ip) * .3) * 1.5, r0 = 1. + float(i) * .9;
      vec2 q2 = hAt(xz + vec2(cos(a), sin(a)) * r0);
      occ += clamp((q2.g - q2.r) / (r0 * 1.3 + .4), 0., 1.);
    }
    ao = clamp(1. - occ * .07, .72, 1.) * clamp(1. - near0 * .05, .7, 1.);
    // pyrite and flint: in trails along the wind and patches in the hollows, none on the drifts; fallen chalk at the forms' feet
    vec2 wq = normalize(WIND), pw = vec2(dot(xz, wq), dot(xz, vec2(-wq.y, wq.x)));
    float trail = smoothstep(.55, .72, n3(vec3(pw.x * .011, pw.y * .085, 17.)));
    float hol = smoothstep(.25, -.55, h.r + (n1 - .5) * .7);
    vec2 s1d = xz - SPILL.xy, s2d = xz - SPILL.zw;
    float spill = exp(-dot(s1d, s1d) * .09) * 1.6 * smoothstep(.3, .6, n3(vec3(xz * .9, 4.))) + exp(-dot(s2d, s2d) * .05);
    float dens = 1.1 * spill + COVER * (.04 + 1.25 * trail + .75 * hol * smoothstep(.38, .62, n3(vec3(xz * .045, 7.)))) * (1. - .95 * smoothstep(.02, .16, tl)) * (1. - .55 * pave);
    float rub = smoothstep(.2, 1.4, occ) * (1. - smoothstep(.1, .3, tl));
    float blk, wht, shad, glint; vec3 sN;
    stones(xz, dens, rub, t * PXA * .6, blk, wht, shad, sN, glint);
    if (blk + wht > .002) N = normalize(mix(N, normalize(N + sN), min(1., (blk + wht) * 1.1)));
    float near = 1. / (1. + foot * 6.);
    alb = mix(alb, vec3(.075, .072, .07) * (1. + 1.1 * smoothstep(.45, .85, n3(vec3(xz * 44., 2.))) * near), blk);
    alb = mix(alb, vec3(.4, .395, .385), wht * .5);
    // moonlit shade
    float ndl = max(dot(N, M), 0.);
        vec3 hv = normalize(M - rd);
    float sp = pow(max(dot(N, hv), 0.), 26.) * .22 * (crust * .55 + sandy * .28) * (1. - blk);
    sp += pow(max(dot(N, hv), 0.), 90.) * .22 * blk;
    float rimSheen = pow(max(dot(N, -rd), 0.), 1.) ;
    alb *= 1. + .18 * smoothstep(.0, .3, -rd.y) * pow(max(dot(rd, -M), 0.), 2.);
    direct = ndl * shad;
    vec3 col = alb * direct + sp * vec3(.8, .88, 1.) * direct + glint * vec3(1.4, 1.5, 1.7) * pow(max(dot(rd, -M) * .5 + .5, 0.), 2.) * (1. - foot * 3.) * shad;
    amb = (.24 + .1 * N.y) * ao * (alb.g * .9 + .03);
    o = vec4(col, amb);
    return;
  }
}`,mo=et+it+Bt+Fe+ee+`
void main(){
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec4 g = texelFetch(uG, ip, 0);
  vec3 rd = ray(gl_FragCoord.xy);
  float t = g.r;
  if (t <= 0. || g.a < .5) discard;
  vec3 p = CAM + rd * t;
  vec3 N = octD(g.gb);
  float fid = g.a;
  float foot = t * PXA / max(.07, abs(dot(rd, N)) + .05);
  vec3 M = MOON0;
  float ao = 1., direct, amb;
  vec3 alb;
  // ---------- the chalk forms ----------
  int idx = int(fid - .5);
  vec4 a = texelFetch(uF, ivec2(idx, 0), 0), b = texelFetch(uF, ivec2(idx, 1), 0), f = texelFetch(uF, ivec2(idx, 2), 0), e4 = texelFetch(uF, ivec2(idx, 3), 0);
  vec3 C = vec3(a.x, a.z, a.y);
  vec3 q = p - C;
  float H = a.w, s = q.y / H;
  // fine, rough surface: a few noise scales in world space (grain and pits), horizontal seams
  float sd = f.z;
  float eD = max(.004, foot * .7);
  float pscale = 1. / (1. + foot * 6.);
  float wwS = smoothstep(-.1, .6, -dot(normalize(q.xz + 1e-4), WIND));
  #define DET(p3) (n3((p3) * 2.4 + 9.1) * .045 + n3((p3) * 8.7 + 3.1) * .022 * pscale + n3((p3) * 23. + 7.) * .009 * pscale + pow(abs(fract((p3).y * 1.7 + lw) - .5) * 2., 7.) * lm + pow(n3((p3) * vec3(2.9, 4.4, 2.9) + 17.), 3.) * -.045 * wwS)
  vec3 q0 = q + sd * 9.;
  // the seams' waviness and where they show vary slowly: read once at the pixel, not per tap
  float lw = n3(vec3(q0.xz * .3, q0.y * .55)) * 1.4, lm = .013 * smoothstep(.48, .7, n3(vec3(q0.xz * .05, q0.y * .9)));
  vec3 gr = vec3(0.);
  for (int i = 0; i < 4 + IZ; i++) {
    vec3 k = i == 0 ? vec3(1., -1., -1.) : i == 1 ? vec3(-1., -1., 1.) : i == 2 ? vec3(-1., 1., -1.) : vec3(1.);
    vec3 qd = q0 + k * eD;
    gr += k * DET(qd);
  }
  gr /= 4. * eD;
  N = normalize(N - (gr - N * dot(gr, N)) * 1.4);
  // chalk colour: near white, a faint iron stain low down
  float low = smoothstep(.45, 0., s);
  alb = mix(vec3(.93, .925, .91), vec3(.84, .8, .73), low * .5) * (.96 + .08 * (n3(q * .9 + sd) - .5));
  alb *= e4.x;
  // the chalk's own pocks, darker in the deeper cavities
  float pock = smoothstep(.6, .85, n3(q * vec3(5.2, 7.5, 5.2) + sd * 2.)) * (.35 + .65 * wwS);
  alb *= 1. - pock * .14 * pscale * pscale;
  // ambient: sky above, and the pale plain lit by the moon below (the shaded side of white chalk stays pale from that bounce)
  float sk = clamp(.5 + .5 * N.y, 0., 1.);
  float bounce = clamp(.5 - .55 * N.y, 0., 1.) * .5;
  // cavities (the form's own distance a little along the normal), then the form's own soft shadow toward the moon:
  // one loop, one call of sdForm
  vec3 M0 = MOON0;
  float d0 = 0., sh = 1., tt = .04 + .012 * length(CAM - p);
  for (int i = 0; i < 21 + IZ; i++) {
    float fi = float(i + 1), dd = .16 * fi * fi;
    float d = sdForm(i < 3 ? q + N * dd : q + M0 * tt, a, b, f, e4, 0.);
    if (i < 3) d0 += max(0., dd - d) / dd / fi;
    else {
      sh = min(sh, 7. * d / tt);
      tt += clamp(d, .03, 1.2);
      if (sh < .01 || tt > 40.) break;
    }
  }
  ao = clamp(1. - d0 * .42, 0., 1.);
  // ground occlusion near the base
  float gh = hAt(p.xz).r;
  float base = smoothstep(0., .9, q.y + a.z - gh);
  ao *= mix(.72, 1., base);
  amb = (sk * .42 + bounce) * ao * dot(alb, vec3(.33));
  // moonlight: the form's own soft shadow, then the column shadow of forms between it and the moon
  float ndl = max(dot(N, M), 0.);
  float lit = smoothstep(0., 1., clamp(sh, 0., 1.));
  // other forms: march the top-of-column map from outside this form
  float rmax = max(b.x, max(b.y, b.z)) * 1.2 + .4;
  float ts = rmax + .3; float occ = 0.;
  for (int i = 0; i < 16 + IZ; i++) {
    vec3 qq = p + M * ts;
    float hh2 = hAt(qq.xz).g;
    if (qq.y < hh2 - .05) { occ = 1.; break; }
    ts *= 1.28;
    if (qq.y > 26. || max(abs(qq.x), abs(qq.z)) > FARS) break;
  }
  lit *= 1. - .85 * occ;
  float sat = 1.08;
  vec3 col = alb * pow(ndl, sat) * lit * (.45 + .55 * ao);
  // grazing moon brightens the chalk a little along the rim
  col *= 1. + .16 * pow(1. - max(dot(N, -rd), 0.), 3.);
  o = vec4(col, amb + .004);
}`,xo=et+it+`
uniform sampler2D uB, uG, uHZN, uHZF; out vec4 o;
float hzS(vec2 xz){
  vec2 u = (xz - HZC) / HZH;
  float m = max(abs(u.x), abs(u.y));
  vec2 v = textureLod(uHZF, xz / FARS * .5 + .5, 0.).rg;
  float hv = mix(v.x, v.y, AZF);
  float nearW = smoothstep(.98, .78, m);
  if (nearW > 0.) { vec2 w = textureLod(uHZN, u * .5 + .5, 0.).rg; hv = mix(hv, mix(w.x, w.y, AZF), nearW); }
  return smoothstep(hv - .022, hv + .026, MTAN);
}
void main(){
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec3 rd = ray(gl_FragCoord.xy);
  vec4 B = texelFetch(uB, ip, 0), G = texelFetch(uG, ip, 0);
  float t = G.r;
  vec3 L;
  float tf = t > 0. ? t : 9000.;
  if (t <= 0.) {
    L = B.rgb;
  } else {
    float sh = 1.;
    if (G.a < .5) { vec3 p = CAM + rd * t; vec2 w = normalize(MOON.xz + 1e-5), wp = vec2(-w.y, w.x) * (.26 + t * .007); sh = 0.; for (int i = -1; i <= 1 + IZ; i++) sh += hzS(p.xz + wp * float(i)); sh /= 3.; }
    L = B.rgb * MOONC * sh + AMBC * B.a;
  }
  // haze: thin, cool; the far forms step back in value
  vec3 hz = hazeCol(rd);
  if (t > 0.) L = mix(L, hz, 1. - exp(-t * FOGK));
  // a shallow mist lying on the plain: thickest at the ground, it swallows the feet of the far forms
  float k = 1. / MISTH, ma = exp(-(CAM.y - MISTY) * k), tm = min(tf, 6000.);
  float ry = abs(rd.y) < 1e-4 ? 1e-4 : rd.y;
  float I = ma * (1. - exp(-tm * ry * k)) / (ry * k);
  float mA = (1. - exp(-I * MISTK)) * .92;
  L = mix(L, hz * 1.12, mA);
  // a low moon lays a bright streak on the mist under it
  vec2 a2 = rd.xz / (length(rd.xz) + 1e-5), m2 = MOON.xz / (length(MOON.xz) + 1e-5);
  L += MDISC * HAZEC * 1.4 * exp(-(1. - dot(a2, m2)) * 700.) * smoothstep(MOON.y, -.02, rd.y) * smoothstep(.36, .12, MOON.y) * mA * smoothstep(60., 300., tf);
  // dust close to the ground, drifting: thickens with path through the low layer
  float cy = CAM.y, dy = rd.y;
  float path = dy > -.002 ? 5200. : min(tf, (cy) / max(-dy, .002));
  float lowLayer = (1. - exp(-I * .03)) * exp(-max(dy, 0.) * 25.);
  vec3 gp = CAM + rd * min(path, 240.);
  float elv = max(dy, 0.) * 60.;
  float nA = n3(vec3(gp.xz * .03 + WIND * TT * .4, elv + TT * .018)), nB = n3(vec3(gp.xz * .11 + WIND * TT * .9, elv * 3. + TT * .05));
  float dust = smoothstep(.34, .74, nA * .7 + nB * .35) * lowLayer * DUSTA;
  L += hz * dust * .9;
  // the moon and its glare
  float cm = dot(rd, MOON), ang = acos(clamp(cm, -1., 1.));
  float halo = exp(-ang / (MOONSZ * .9)) * .55 + exp(-ang / (MOONSZ * 5.)) * .06 + exp(-ang * 9.) * .012;
  L += MDISC * vec3(.8, .88, 1.) * halo * BLOOM * step(MOONSZ * .98, ang);
  if (ang < MOONSZ * 1.2) {
    vec3 u = normalize(cross(MOON, vec3(0., 1., 0.))), v = cross(u, MOON);
    vec2 m = vec2(dot(rd, u), dot(rd, v)) / sin(MOONSZ);
    float dq = smoothstep(1., .93, length(m));
    // the near side's seas, roughly where they lie, softened by a little noise
    #define MB(c, r) exp(-dot(m - c, m - c) / (r * r))
    float mar = MB(vec2(-.32, .42), .3) + MB(vec2(.12, .38), .17) * .9 + MB(vec2(.3, .1), .22) * .9 + MB(vec2(-.6, .0), .3) * .8 + MB(vec2(.68, .32), .1)
      + MB(vec2(-.2, -.36), .18) * .6 + MB(vec2(.55, -.15), .14) * .7 + MB(vec2(-.48, -.4), .14) * .5;
    mar = clamp(mar * (.75 + .5 * n3(vec3(m * 4.3, 7.))), 0., 1.);
    float tyc = MB(vec2(-.1, -.76), .07);
    float lum = (1. - .42 * mar + .25 * tyc) * (1. - .12 * dot(m, m));
    vec3 mc = MDISC * 1.35 * lum;
    // partial eclipse: the earth's shadow takes most of the disc, copper inside, a soft edge
    if (ECL > 0.) { float u2 = length(m - vec2(1.35, 1.85)); mc = mix(mc, vec3(.62, .23, .085) * lum, smoothstep(2.55, 2.3, u2)); }
    L = mix(L, mc, dq * step(t, 0.));
  }
  // a meteor now and then (its waits drawn from the hash), only over the sky
  if (MET0.w > 0. && MET0.w < 1. && t <= 0.) {
    vec3 hd = normalize(MET0.xyz + MET1.xyz * MET0.w), nm = normalize(cross(MET0.xyz, MET1.xyz));
    float dx = dot(rd, nm), al = dot(rd - hd, normalize(MET1.xyz));
    L += vec3(.55, .6, .7) * exp(-dx * dx / (PXA * PXA * 1.2)) * smoothstep(-length(MET1.xyz) * .35, 0., al) * step(al, 0.) * sin(MET0.w * 3.1416);
  }
  // exposure and the tone curve (no vignette, no grain: the night is the only finish)
  L *= EXPO;
  vec3 x = L * (L * 2.51 + .03) / (L * (L * 2.43 + .59) + .14);
  x = pow(clamp(x, 0., 1.), vec3(.4545));
  o = vec4(x, 1.);
}`;let F=t.__c623;const oe=(o,h)=>{const n=t.createShader(h);return t.shaderSource(n,o),t.compileShader(n),n},uo=(o,h)=>{if(!t.getProgramParameter(h.p,t.LINK_STATUS))throw new Error("623 "+o+": "+t.getShaderInfoLog(h.f)+t.getShaderInfoLog(h.v)+t.getProgramInfoLog(h.p));const n={p:h.p};return n.uU=t.getUniformLocation(h.p,"uU"),n.uHZ=t.getUniformLocation(h.p,"uHZ"),t.useProgram(h.p),[["uN",0],["uHN",1],["uHF",2],["uG",3],["uB",4],["uF",5],["uHZN",6],["uHZF",7]].forEach(([g,M])=>{const w=t.getUniformLocation(h.p,g);w&&t.uniform1i(w,M)}),n};let Nt=null;if(!F){{const w=t.getExtension("KHR_parallel_shader_compile");w&&w.maxShaderCompilerThreadsKHR&&w.maxShaderCompilerThreadsKHR(4294967295)}const o=!!t.getExtension("EXT_color_buffer_float"),h=o||!!t.getExtension("EXT_color_buffer_half_float"),n=(w,H)=>{if(h)return w;const S=(Y,Z,Me)=>{if(Y.indexOf(Z)<0)throw new Error("623 NH "+H+" "+Z);return Y.split(Z).join(Me)},O=`
uvec4 eH(vec4 v){uint a=packHalf2x16(v.xy),b=packHalf2x16(v.zw);return uvec4(a&65535u,a>>16,b&65535u,b>>16);}
vec4 dH(uvec4 u){return vec4(unpackHalf2x16(u.x|(u.y<<16)),unpackHalf2x16(u.z|(u.w<<16)));}
`,P=(Y,Z)=>S(Y,"void main(){",`void main0();
void main(){main0();`+Z+`}
void main0(){`);return H==="h"?P(S(w,"out vec4 o;","out uint oH; vec4 o;"),"oH=packHalf2x16(o.xy);"):H==="g"||H==="f"?P(S(w,"out vec4 o;","out uvec4 oU; vec4 o;"+O),"oU=eH(o);"):H==="s"||H==="p"||H==="k"?P(S(w,"uniform sampler2D uG, uF; out vec4 o;","uniform highp usampler2D uG; uniform sampler2D uF; out uvec4 oU; vec4 o;"+O).split("texelFetch(uG, ip, 0)").join("dH(texelFetch(uG, ip, 0))").replace("texelFetch(uG, ivec2(gl_FragCoord.xy), 0)","dH(texelFetch(uG, ivec2(gl_FragCoord.xy), 0))"),"oU=eH(o);"):H==="c"?S(S(S(S(S(w,"uniform sampler2D uB, uG, uHZN, uHZF; out vec4 o;","uniform highp usampler2D uB, uG, uHZN, uHZF; out vec4 o;"+O+`vec2 hT(highp usampler2D s, ivec2 i, ivec2 m){return unpackHalf2x16(texelFetch(s, clamp(i, ivec2(0), m), 0).r);}
vec2 hzL(highp usampler2D s, vec2 uv){vec2 z = vec2(textureSize(s, 0)), p = uv * z - .5, f = fract(p); ivec2 i = ivec2(floor(p)), m = ivec2(z) - 1;
  return mix(mix(hT(s, i, m), hT(s, i + ivec2(1, 0), m), f.x), mix(hT(s, i + ivec2(0, 1), m), hT(s, i + ivec2(1), m), f.x), f.y);}
`),"textureLod(uHZF, xz / FARS * .5 + .5, 0.).rg","hzL(uHZF, xz / FARS * .5 + .5)"),"textureLod(uHZN, u * .5 + .5, 0.).rg","hzL(uHZN, u * .5 + .5)"),"texelFetch(uB, ip, 0)","dH(texelFetch(uB, ip, 0))"),"texelFetch(uG, ip, 0)","dH(texelFetch(uG, ip, 0))"):w},g=oe(so,t.VERTEX_SHADER),M={};for(const[w,H,S]of[["g",null,ro],["f",io,co],["s",null,ho],["p",null,fo],["k",null,mo],["c",null,xo],["h",null,lo]]){const O=t.createProgram(),P=H?oe(H,t.VERTEX_SHADER):g,Y=oe(n(S,w),t.FRAGMENT_SHADER);t.attachShader(O,P),t.attachShader(O,Y),t.linkProgram(O),M[w]={p:O,f:Y,v:P}}t.flush(),Nt={P:M,fl:o,hf2:h}}let ct=103010789;for(let o=2;o<66;o+=8)ct=Math.imul(ct^parseInt(tt.hash.slice(o,o+8),16),2246822507)^ct>>>13;const ke=()=>{ct=ct+1831565813|0;let o=Math.imul(ct^ct>>>15,1|ct);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296};let lt=1369626563;for(let o=2;o<66;o+=8)lt=Math.imul(lt^parseInt(tt.hash.slice(o,o+8),16),2654435761)^lt>>>15;const Ne=()=>{lt=lt+1831565813|0;let o=Math.imul(lt^lt>>>15,1|lt);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296};let xt=!1;const z=()=>xt?Ne():ke(),ht=o=>{let h=0;for(const g in o)h+=o[g];let n=z()*h;for(const g in o)if(n-=o[g],n<0)return g;return Object.keys(o)[0]},ut=Math.PI*2,R=Math.PI/180,Ht=(o,h,n)=>{const g=Math.min(1,Math.max(0,(n-o)/(h-o)));return g*g*(3-2*g)},St=(o,h,n)=>o+(h-o)*n,s=(o,h)=>o+(h-o)*z(),po=0,He=po?{"0x24487fbd":{Standpoint:"In a shadow, facing the moon",Moon:"Just above the rim",Light:"Toward the moon",Haze:"Dust lying low"},"0xf17b8a99":{Standpoint:"Low on the pavement","Black stones":"Sparse",Forms:"Few, far apart"},"0xa8e0d2e9":{Standpoint:"Looking down from a rise",Moon:"High overhead"},"0xf2d1fc28":{Standpoint:"Long lens down a corridor",Rim:"Faint and far",Haze:"Clear"},"0x149f1ab8":{Standpoint:"Among the forms",Light:"Moon behind you"},"0x2e78d304":{Standpoint:"Among the forms",Moon:"Very low, huge shadows",Light:"Toward the moon","Black stones":"Thick black field"},"0xf1364849":{Standpoint:"Among the forms",Moon:"Low in the east",Light:"Toward the moon",Sky:"Partial eclipse"},"0x2ec15318":{Standpoint:"Among the forms",Moon:"Low in the east",Light:"Toward the moon",Sky:"Thin cloud, a halo"},"0xf7a3cc18":{Standpoint:"Among the forms",Sky:"After a sandstorm"},"0xd957a826":{Standpoint:"Among the forms",Rim:"High escarpment",Light:"Moon abeam",Chalk:"Whalebacks"},"0x36c4a9f6":{Standpoint:"Among the forms",Rim:"Low dark hills",Chalk:"Sugarloaf cones"},"0x3d0fe055":{Standpoint:"Among the forms",Haze:"Clear",Chalk:"Broken stumps"},"0x710219a0":{Standpoint:"Among the forms",Haze:"Thin",Chalk:"Tall mushrooms"},"0xa7830c68":{Standpoint:"Among the forms",Haze:"Dust lying low",Chalk:"Mushrooms and mounds"},"0x55273b95":{Standpoint:"In a shadow, facing the moon",Moon:"Just above the rim",Light:"Toward the moon",Sky:"Partial eclipse"}}[tt.hash.slice(0,10)]:null,ot=(o,h)=>tt.trait(o,He&&He[o]||h),Se=ot("Moon",N?"Low in the east":ht({"Low in the east":40,"High overhead":30,"Just above the rim":22,"Very low, huge shadows":8})),Et=ot("Light",N?"Toward the moon":ht({"Toward the moon":40,"Moon abeam":38,"Moon behind you":22})),Tt=ot("Chalk",N?"Mushrooms and mounds":(o=>o==="Broken stumps"?"Mushrooms and mounds":o)(ht({"Mushrooms and mounds":36,Whalebacks:22,"Sugarloaf cones":18,"Broken stumps":14,"Tall mushrooms":10}))),vo=ot("Black stones",N?"Strewn":ht({Strewn:50,Sparse:26,"Thick black field":24})),qt=ot("Haze",N?"Thin":ht({Thin:46,Clear:30,"Dust lying low":24})),_e=ot("Rim",N?"Low dark hills":ht({"Low dark hills":50,"High escarpment":34,"Faint and far":16})),wo=ot("Forms",N?"Scattered":ht({Scattered:40,"Dense field":34,"Few, far apart":26})),Ue=o=>{xt=!0;const h=ht(o);return xt=!1,h},Le=Et==="Toward the moon"&&Se!=="High overhead",pt=ot("Standpoint",N?"Among the forms":Ue(Le?{"Among the forms":34,"In a shadow, facing the moon":30,"Low on the pavement":12,"Looking down from a rise":12,"Long lens down a corridor":12}:{"Among the forms":44,"Low on the pavement":19,"Looking down from a rise":19,"Long lens down a corridor":18})),_t=ot("Sky",N?"Clear":Ue(Le?{Clear:63,"Thin cloud, a halo":26,"After a sandstorm":5,"Partial eclipse":6}:{Clear:93,"After a sandstorm":7})),ae={"Low in the east":19.5,"High overhead":62,"Just above the rim":13,"Very low, huge shadows":7}[Se]*R,ne={"Toward the moon":N?28:24+(z()*8-4),"Moon abeam":78+(z()*18-9),"Moon behind you":138+(z()*22-11)}[Et]*R*(N||z()<.5?1:-1),Ut=z()*ut,vt=Ut-ne,De=(o,h)=>{const n=Ut+o,g=ae+h,M=Math.cos(g);return[Math.sin(n)*M,Math.sin(g),Math.cos(n)*M]},se=z()*ut,Ie=Tt==="Whalebacks"&&!N?vt+(se<Math.PI?1:-1)*(.6+.35*(se%Math.PI)/Math.PI):se,Ct=Math.sin(Ie),Ot=Math.cos(Ie),Pt=_t==="After a sandstorm",re=_t==="Partial eclipse",Mo={Thin:.0011,Clear:42e-5,"Dust lying low":.0021}[qt]*(Pt?2.2:1),go={Thin:.007,Clear:.0025,"Dust lying low":.11}[qt]*(Pt?1.6:1),bo=qt==="Dust lying low"?.75:1.4,yo={Thin:.5,Clear:.16,"Dust lying low":.95}[qt],zo={Strewn:.66,Sparse:.3,"Thick black field":1.15}[vo],Ro={"Low dark hills":1,"High escarpment":1.75,"Faint and far":.62}[_e],ie=Pt?[.34,.3,.27]:_e==="Faint and far"?[.3,.34,.43]:[.25,.29,.385],K=58,wt=620,k=384,Mt=t.__m623||(t.__m623=new Map),Zt=tt.hash+(N?"+h":"");let q=Mt.get(Zt);if(q)Mt.delete(Zt),Mt.set(Zt,q);else{let $t=function(e,r,c,a){const b=a*2/k,f=(e+a)/b-.5,u=(r+a)/b-.5,d=Math.max(0,Math.min(k-2,Math.floor(f))),p=Math.max(0,Math.min(k-2,Math.floor(u))),i=f-d,m=u-p,x=c[(d+p*k)*4],y=c[(d+1+p*k)*4],T=c[(d+(p+1)*k)*4],E=c[(d+1+(p+1)*k)*4];return x+(y-x)*i+(T-x)*m+(x-y-T+E)*i*m};var Do=$t;let o=[];const h=Math.atan2(-Ot,Ct),n=(e,r,c,a,b)=>{let f,u,d,p,i,m,x=1,y=0,T=z()*ut;if(a===0){const v=s(.34,.62)*Math.pow(c,.75);i=s(.16,.32),p=s(.55,.78),d=v*s(.9,1.35),u=v*s(.34,.5),f=v*s(.42,.68),m=s(.5,1),x=s(1,1.35),y=z()<.4?1:0}else if(a===1){const v=s(.9,1.55)*Math.pow(c,.85);i=s(.02,.14),p=s(.12,.34),d=v*s(.75,1),u=v*s(.72,.96),f=v*s(.86,1.08),m=s(.2,.55),x=s(1,1.6)}else if(a===2){const v=s(.3,.55)*Math.pow(c,.7);i=s(.1,.3),p=s(.42,.72),d=v*s(.4,.75),u=v*s(.6,.8),f=v*s(.85,1.15),m=s(.3,.8),x=s(1,1.4)}else if(a===3){const v=s(.22,.32)*Math.pow(c,.78);i=s(.2,.4),p=s(.78,.92),d=v*s(.75,1.05),u=v*s(.5,.65),f=v*s(.7,.95),m=s(.6,1),y=z()<.5?1:0}else if(a===4){const v=s(.62,.95)*Math.pow(c,.8);i=s(.3,.5),p=s(.72,.88),f=v*s(.95,1.2),u=v*s(.5,.66),d=v*s(.2,.32),m=s(.1,.4),x=s(1,1.3),z(),d=v*(.34+(d/v-.2)*1.333)}else if(a===5){const v=s(.75,1.1)*Math.pow(c,.85);i=s(.05,.15),p=s(.32,.52),f=v*s(.95,1.1),u=v*s(.82,.95),d=v*s(.62,.85),m=s(.4,.9),x=s(2.3,3.6),T=h+s(-.15,.15)}else{const v=c*s(.55,1.05);i=s(.2,.35),p=s(.6,.76),d=v*.78,u=v*s(.9,.98),f=v*s(1.25,1.5),m=s(.1,.3),x=s(1,1.6),y=.5}a===2&&(m=-m);const E={Rb:f,Rw:u,Rc:d,el:x},U=a===3;if(U){o.length&&(c*=.6),a=0,x=1,y=1,d=c/2.5;const v=f/u;u=d/2.4,f=u*v,p=2/2.5}if(a===0&&!(N&&!o.length)){d=Math.max(d,u*2.4);const v=Math.min(d*.5,Math.max(d*.4,(1-p)*c)),X=Math.min(p*c,d*(U?2:1.7));c=X+v,p=X/c}a===2&&c<2.2&&c>2*Math.max(f,u,d)&&(f=Math.max(f,c*.7)),o.push({x:e,z:r,H:c,Rb:f,Rw:u,Rc:d,sc:p,sw:i,rot:T,sd:z()*7+1,wc:m,tone:s(.95,1.04)*(a===6?.72:1),kind:a,el:x,cap:y,near:!!b,p0:E})},g=()=>{const e=z();return Tt==="Whalebacks"?e<.55?5:e<.75?1:e<.9?0:4:Tt==="Sugarloaf cones"?e<.55?4:e<.75?0:e<.9?1:2:Tt==="Broken stumps"?e<.6?2:e<.8?1:e<.92?0:4:Tt==="Tall mushrooms"?e<.45?0:e<.75?3:e<.9?4:2:e<.36?0:e<.54?1:e<.68?4:e<.8?5:e<.92?2:3},M=(e,r)=>{const c=r?s(.6,2.6):s(.55,1.3);return{0:s(3.2,6.2),1:s(1.6,3.8),2:s(2.4,5.2),3:s(6.5,10.5),4:s(3.5,7.5),5:s(1.8,3.6),6:s(5,13)}[e]*c},w={"Mushrooms and mounds":0,Whalebacks:5,"Sugarloaf cones":4,"Broken stumps":2,"Tall mushrooms":3}[Tt],H=Math.sin(vt),S=Math.cos(vt),O=Math.cos(vt),P=-Math.sin(vt),Y=(e,r,c,a)=>n(H*r+O*e,S*r+P*e,c,a,!0),Z=N||z()<.5?-1:1;Y(Z*s(11,15),s(19,25),N?5.6:w===5?s(2.6,3.6):s(4,6.2),w),o[0].kind===5&&(o[0].el=Math.min(o[0].el,2.2+(o[0].el-2.3)*.3)),Y(-Z*s(7,12),s(27,38),s(4.4,6.6),N?4:w===5?1:z()<.55?0:w===0?4:w),z()<.7&&Y(Z*s(-3,5)*(z()<.5?-1:1)+Z*26,s(38,58),s(2.4,4.4),z()<.55?5:2);const Me={Scattered:230,"Dense field":340,"Few, far apart":100}[wo];let So=0;for(;o.length<Me&&So++<9e3;){const e=z()*ut,r=z()<.55?30+z()*170:Math.pow(z(),.62)*540+60,c=Math.cos(e)*r,a=Math.sin(e)*r,b=Math.sin(c*.011+2.3)*Math.sin(a*.013+1.1)+.7*Math.sin(c*.033+5.1)*Math.sin(a*.029+3.7);if(z()>.03+Math.pow(Ht(-.1,1,b),1.6)*.97)continue;const f=c*H+a*S,u=Math.abs(c*O+a*P);if(f>0&&f<78&&u<10+f*.5)continue;const d=r>230&&z()<.12?6:g(),p=M(d,r>140);let i=!0;for(const m of o){const x=(m.p0.Rc+m.p0.Rb+p*.5)*1.25+5;if((m.x-c)*(m.x-c)+(m.z-a)*(m.z-a)<x*x){i=!1;break}}i&&n(c,a,p,d,!1)}xt=!0;const A=o[0],ge=Ut,be=(e,r,c)=>{for(const a of o){const b=Math.max(a.p0.Rb,a.p0.Rw,a.p0.Rc)*a.p0.el+c;if((a.x-e)*(a.x-e)+(a.z-r)*(a.z-r)<b*b)return!1}return!0},l={x:0,z:0,eye:1.7,yaw:vt,pitch:6*R,tanH:Math.tan(25*R),spill:[0,0,0,0]},ye=Math.max(A.Rb,A.Rw,A.Rc)*Math.min(A.el,1.6),Kt=(e,r,c)=>{e=Math.max(e+ye,A.H*1.35+ye*.5),l.yaw=vt+c;const a=l.yaw+Math.atan(r*l.tanH);for(let b=0;b<6&&(l.x=A.x-Math.sin(a)*e,l.z=A.z-Math.cos(a)*e,!be(l.x,l.z,1.5));b++,e+=2);};let yt=0,Ft=20,ze=170,jt=.25;if(pt==="Among the forms"){l.tanH=Math.tan((N?26.5:s(23,27))*R),l.pitch=(N?6:s(5,8))*R;const e=s(-6,6)*R,r=Et==="Toward the moon"?ne-Math.sign(ne)*s(9,17)*R:e;Kt(N?11:s(7,12),N?-.5:Z*s(.3,.6),N?8*R:_t!=="Clear"&&_t!=="After a sandstorm"||z()<.6?r:e),yt=N?9:6+Math.floor(z()*8)}else if(pt==="In a shadow, facing the moon"){const e=(z()<.5?-1:1)*s(12,17)*R;let r=s(7,10);l.tanH=Math.tan(26*R),l.pitch=s(7,10)*R,r=Math.max(r+ye*.6,A.H*1.25),l.x=A.x-Math.sin(ge+e)*r,l.z=A.z-Math.cos(ge+e)*r,l.yaw=ge+e*.5,yt=5+Math.floor(z()*6),Ft=25}else pt==="Low on the pavement"?(l.eye=s(.32,.5),l.pitch=s(4,8)*R,l.tanH=Math.tan(25*R),Kt(s(7,11),Z*s(.3,.55),s(-6,6)*R),yt=4+Math.floor(z()*5),Ft=26):pt==="Looking down from a rise"?(l.eye=s(5.5,7),l.pitch=-s(16,22)*R,l.tanH=Math.tan(27*R),Kt(s(24,32),Z*s(.2,.45),s(-6,6)*R),yt=10+Math.floor(z()*7),Ft=12,ze=90,jt=0):(l.tanH=Math.tan(s(10,12.5)*R),l.pitch=s(2.3,3)*R,Kt(s(36,48),Z*s(.25,.6),s(-4,4)*R),yt=8+Math.floor(z()*6),Ft=60,ze=380,jt=.1);const Yt={"Among the forms":[3,12],"In a shadow, facing the moon":[4,14],"Low on the pavement":[2,13],"Looking down from a rise":[-24,-9]}[pt]||[0,5],$e=e=>{const r=Math.cos(A.rot),c=Math.sin(A.rot),a=Math.max(A.Rb,A.Rw,A.Rc)*(A.kind===5?1.1:1.25),b=Math.atan(.8*l.tanH),f=Math.atan(.92*l.tanH),u=Math.sin(l.yaw),d=Math.cos(l.yaw),p=Math.cos(l.yaw),i=-Math.sin(l.yaw);let m=-9,x=9,y=0,T=0;for(let E=0;E<48;E++){const U=E%16*ut/16,v=Math.floor(E/16),X=v===2?Math.max(A.Rc,A.Rw)*1.25:v===1?a:A.Rb*1.2,J=Math.cos(U)*X*A.el,kt=Math.sin(U)*X,st=A.x+J*r+kt*c-l.x,rt=A.z-J*c+kt*r-l.z,G=e-l.eye+A.H*[0,.6,1.1][v],B=st*u+rt*d,$=st*p+rt*i;if(B<.5)return null;const zt=$/B/l.tanH;Math.abs(zt)>y&&(y=Math.abs(zt),T=Math.sign(zt));const L=Math.atan2(G,B);m=Math.max(m,L-b),x=Math.min(x,L+f)}return{lo:m,hi:x,xo:y,xs:T}};if(!N){const e=Math.max(Yt[0]*R,Math.min(Yt[1]*R,l.pitch));let r=null;for(let c=0;c<22&&(r=$e(0),!(r&&r.xo<.9&&r.lo<=r.hi&&r.lo<=Yt[1]*R&&r.hi>=Yt[0]*R&&be(l.x,l.z,1.5)));c++){r&&r.xo>=.9&&(l.yaw+=r.xs*Math.min(.06,Math.atan((r.xo-.85)*l.tanH)));const a=l.x-A.x,b=l.z-A.z,f=Math.hypot(a,b)||1,u=f*.07+.6;Math.max(Math.abs(l.x+a/f*u),Math.abs(l.z+b/f*u))>K*.85||(l.x+=a/f*u,l.z+=b/f*u)}l.pitch=r&&r.lo<=r.hi?Math.max(r.lo,Math.min(r.hi,e)):e}{const e=Math.sin(l.yaw),r=Math.cos(l.yaw),c=Math.cos(l.yaw),a=-Math.sin(l.yaw),b=pt==="Long lens down a corridor"?34:pt==="Looking down from a rise"?9:6;for(const i of o){if(i===A)continue;const m=i.x-l.x,x=i.z-l.z,y=m*e+x*r,T=m*c+x*a,E=Math.max(i.Rb,i.Rw,i.Rc)*Math.min(i.el,1.6)+1;y>-E&&y<b+i.H&&Math.abs(T)-E<Math.max(y,0)*l.tanH*1.15&&(i.gone=!0)}for(let i=0,m=0;i<yt&&m<yt*12;m++){const x=Ft+Math.pow(z(),.85)*(ze-Ft),y=(z()<.5?-1:1)*(jt+(1.05-jt)*z()),T=l.x+e*x+c*y*x*l.tanH,E=l.z+r*x+a*y*x*l.tanH,U=g(),v=M(U,x>140)*(x<40?.8:1);Math.hypot(T,E)>wt*.9||!be(T,E,v*.5+3)||(n(T,E,v,U,x<60),o[o.length-1].extra=!0,i++)}const f=o.filter(i=>!i.gone).map(i=>{const m=i.x-l.x,x=i.z-l.z;return{q:i,a:m*e+x*r,s:m*c+x*a,r:Math.max(i.Rb,i.Rw,i.Rc)*Math.min(i.el,1.6)}}),u=i=>{for(const m of f){if(m===i||m.q.gone||m.a<1||m.a>=Math.min(80,i.a)||i.a-m.a>45||i.q.H<m.q.H*1.4)continue;const x=m.s-m.a*i.s/i.a,y=3*i.r+m.r;if(Math.abs(x)<y)return(Math.abs(x)-y)*Math.sign(x||1)*i.a/m.a}return 0};for(const i of f){if(N||!i.q.extra||i.a<2||i.q.H<2*i.r)continue;const m=u(i);if(!m)continue;const x=i.q.x,y=i.q.z;i.q.x+=c*m,i.q.z+=a*m,i.s+=m,i.q.gone=!0;const T=o.every(E=>E===i.q||E.gone||Math.hypot(E.x-i.q.x,E.z-i.q.z)>Math.max(E.Rb,E.Rw,E.Rc)*E.el+i.r+2);Math.abs(m)<5*i.r+8&&T&&Math.hypot(i.q.x,i.q.z)<wt*.9&&!u(i)?i.q.gone=!1:(i.q.x=x,i.q.z=y,i.s-=m)}const d=s(2.5,5.5),p=s(-1.6,1.6);l.spill=[l.x+e*d+c*p,l.z+r*d+a*p,A.x+(A.x-l.x)*.12+c*s(-2,2),A.z+(A.z-l.z)*.12+a*s(-2,2)]}xt=!1;const _o=o;o=o.filter(e=>!e.gone);const Jt=o.length,It=new Float32Array(k*k*4),Qt=new Float32Array(k*k*4);if(!t.__n623){const e=new Float32Array(65536);let r=23063;for(let c=0;c<e.length;c++){r=r+1831565813|0;let a=Math.imul(r^r>>>15,1|r);a=a+Math.imul(a^a>>>7,61|a)^a,e[c]=((a^a>>>14)>>>0)/4294967296}t.__n623=e}const ft=t.__n623,Re=(e,r)=>{const c=Math.floor(e),a=Math.floor(r),b=e-c,f=r-a,u=b*b*(3-2*b),d=f*f*(3-2*f),p=c&255,i=a&255,m=p+1&255,x=i+1&255,y=ft[p+i*256],T=ft[m+i*256],E=ft[p+x*256],U=ft[m+x*256];return y+(T-y)*u+(E-y)*d+(y-T-E+U)*u*d},mt=z()*900,Io=(e,r)=>{const c=Re(e*.009+mt,r*.009-mt)*1.5,a=Re(e*.037+13+mt,r*.037+7)*.4,b=Re(e*.13+91,r*.13+mt)*.08;return c+a+b-1.1},to=(e,r)=>{const c=r*2/k,a=new Int32Array(k*6),b=new Float64Array(k*3),f=(d,p,i)=>{const m=Math.floor(i),x=i-m,y=m&255;b[p*3+d]=x*x*(3-2*x),a[p*6+d*2]=y,a[p*6+d*2+1]=y+1&255};for(let d=0;d<k;d++){const p=(d+.5)*c-r;f(0,d,p*.009+mt),f(1,d,p*.037+13+mt),f(2,d,p*.13+91)}const u=(d,p,i,m,x)=>{const y=a[d*6+p*2],T=a[d*6+p*2+1],E=b[d*3+p],U=ft[y+i],v=ft[T+i],X=ft[y+m],J=ft[T+m];return U+(v-U)*E+(X-U)*x+(U-v-X+J)*E*x};for(let d=0;d<k;d++){const p=(d+.5)*c-r,i=p*.009-mt,m=p*.037+7,x=p*.13+mt,y=Math.floor(i),T=i-y,E=T*T*(3-2*T),U=(y&255)*256,v=((y&255)+1&255)*256,X=Math.floor(m),J=m-X,kt=J*J*(3-2*J),st=(X&255)*256,rt=((X&255)+1&255)*256,G=Math.floor(x),B=x-G,$=B*B*(3-2*B),zt=(G&255)*256,L=((G&255)+1&255)*256;for(let Q=0;Q<k;Q++){const Rt=u(Q,0,U,v,E)*1.5+u(Q,1,st,rt,kt)*.4+u(Q,2,zt,L,$)*.08-1.1;e[(Q+d*k)*4]=Rt,e[(Q+d*k)*4+1]=Rt}}};to(It,K),to(Qt,wt);const eo=(e,r)=>{const c=r*2/k;for(const a of _o){const b=a.extra?Ne():ke();if(a.gone)continue;const f=Math.pow(a.H,.85)*(2.2+a.Rc*.5)*(a.kind===6?.5:1)+2,u=(a.Rc*.9+a.H*.2)*1.25*Math.min(a.el,1.6),d=Math.max(f,u*a.el)+2,p=Math.min(1.25,a.H*.1+.22)*(.55+.8*b),i=Math.max(0,Math.floor((a.x-d+r)/c)),m=Math.min(k-1,Math.ceil((a.x+d+r)/c)),x=Math.max(0,Math.floor((a.z-d+r)/c)),y=Math.min(k-1,Math.ceil((a.z+d+r)/c));if(i>m||x>y)continue;const T=Math.max(a.Rb,a.Rw,a.Rc)*1.08,E=Math.cos(a.rot),U=Math.sin(a.rot),v=a.Rb*1.7+.8,X=Math.min(.5,.12+a.H*.04),J=Math.max(a.Rc*1.9+.5,v*a.el,T*1.08*a.el)*1.0001+1e-6,kt=J*J;for(let st=x;st<=y;st++)for(let rt=i;rt<=m;rt++){const G=(rt+.5)*c-r-a.x,B=(st+.5)*c-r-a.z,$=G*Ct+B*Ot,zt=-G*Ot+B*Ct,L=(rt+st*k)*4;if($>-a.Rc*.6&&$<f){const W=($+a.Rc*.6)/(f+a.Rc*.6),dt=zt/(u*(1.05-.7*W));if(Math.abs(dt)<1){const Te=Ht(1,.35,Math.abs(dt))*(W<.12?Ht(0,.12,W):Math.pow(1-W,1.4));e[L]+=p*Te,e[L+1]+=p*Te,e[L+2]=Math.max(e[L+2],p*Te)}}if(G*G+B*B>=kt)continue;if($<a.Rc){const W=Math.hypot(G,B)/(a.Rc*1.9+.5);if(W<1){const dt=.3*(1-W)*(1-W)*Ht(a.Rc,-a.Rc,$);e[L]-=dt,e[L+1]-=dt}}const Q=Math.hypot(G,B);if(Q<v*a.el){const W=X*Math.pow(1-Q/(v*a.el),2)*(1+.6*Math.max(0,$/(Q+.1)));e[L]+=W,e[L+1]+=W,e[L+2]=Math.max(e[L+2],W*.6)}const Rt=Math.hypot((G*E-B*U)/a.el,G*U+B*E);if(Rt<T*1.08){const W=a.H*(Rt<T*.5?1:Math.max(0,1-Math.pow((Rt-T*.5)/(T*.6),3))),dt=e[L]+W;dt>e[L+1]&&(e[L+1]=dt,e[L+3]=a.kind===0&&Rt>a.Rw*1.25?100+e[L]+a.H*(.32+a.sc*.34):0)}}}};eo(It,K),eo(Qt,wt);const Uo=e=>{const r=e>>16&32768,c=e>>12&2047,a=e>>23&255;if(a<103)return r;if(a>142)return r|31744|((a==255?0:1)&&e&8388607);if(a<113){const b=c|2048;return r|(b>>114-a)+(b>>113-a&1)}return r|a-112<<10|(c>>1)+(c&1)},oo=e=>{const r=new Int32Array(e.buffer,e.byteOffset,e.length),c=new Uint16Array(e.length);for(let a=0;a<e.length;a++)c[a]=Uo(r[a]);return c},Ee=$t(l.x,l.z,It,K),te=Ee+l.eye,ao=new Float32Array(Jt*4*4);if(o.forEach(e=>{const r=$t(Math.max(-K,Math.min(K,e.x)),Math.max(-K,Math.min(K,e.z)),It,K),c=$t(e.x,e.z,Qt,wt);e.y0=(Math.abs(e.x)<K*.98&&Math.abs(e.z)<K*.98?r:c)-.35}),!N){const e=Math.sin(l.yaw),r=Math.cos(l.yaw),c=Math.cos(l.yaw),a=-Math.sin(l.yaw),b=o.map(f=>{const u=f.x-l.x,d=f.z-l.z,p=u*e+d*r;return{q:f,a:p,s:(u*c+d*a)/p,t:(f.y0+f.H-te)/p,w:Math.max(f.Rb,f.Rw,f.Rc)*Math.min(f.el,1.6)/p}}).filter(f=>f.a>2);for(const f of b)if(!(f.a>80))for(const u of b)u.a>f.a&&u.t>f.t&&u.t<f.t+.03&&Math.abs(u.s-f.s)<f.w*.85&&(u.q.H=Math.max(u.q.H*.5,(f.t-.006)*u.a+te-u.q.y0),u.t=(u.q.y0+u.q.H-te)/u.a)}o.forEach((e,r)=>{const c=e.y0,a=[e.x,e.z,c,e.H,e.Rb,e.Rw,e.Rc,e.sc,e.sw,e.rot,e.sd,e.wc,e.tone,e.el,N&&e.kind===5?5.3:e.kind,e.cap];for(let b=0;b<4;b++)for(let f=0;f<4;f++)ao[(b*Jt+r)*4+f]=a[b*4+f]});const no=new Float32Array(Jt*16);if(!N){const e=$e(A.y0+.35-Ee);e&&e.lo<=e.hi&&(l.pitch=Math.max(e.lo,Math.min(e.hi,l.pitch)))}o.forEach((e,r)=>{no.set([e.x,e.z,e.y0,e.H,e.Rb,e.Rw,e.Rc,e.sc,e.sw,e.rot,e.sd,e.wc,e.tone,e.el,N&&e.kind===5?5.3:e.kind,e.cap],r*16)}),xt=!0;const Lo=[z()*ut,z()*4294967296>>>0];xt=!1,q={NFORM:Jt,camY0:te,gy0:Ee,cv:l,hN:oo(It),hF:oo(Qt),fdat:ao,inst:no,met0:Lo},Mt.set(Zt,q),Mt.size>4&&Mt.delete(Mt.keys().next().value)}const ce=q.NFORM,Be=q.camY0,Eo=q.gy0,I=q.cv,To={yaw:0,pitch:0,x:0,y:0,z:0},qe=I.tanH,Ce=I.pitch,_={yaw:I.yaw,pitch:Ce,x:I.x,y:Be,z:I.z};let Oe="";const Pe=()=>{const o=tt.view||To;_.yaw=I.yaw+(o.yaw||0),_.pitch=Math.max(-1.3,Math.min(1.3,Ce+(o.pitch||0)));const h=o.x||0,n=o.z||0,g=Math.hypot(h,n),M=g>8?8/g:1;_.x=I.x+h*M,_.z=I.z+n*M,_.y=Be+Math.max(-I.eye+.25,Math.min(4,o.y||0));const w=_.yaw.toFixed(5)+_.pitch.toFixed(5)+_.x.toFixed(3)+_.z.toFixed(3)+_.y.toFixed(3),H=w!==Oe;return Oe=w,H};Pe();const Ao=(o,h)=>[o[1]*h[2]-o[2]*h[1],o[2]*h[0]-o[0]*h[2],o[0]*h[1]-o[1]*h[0]];if(!F){F=t.__c623={fl:Nt.fl,hf2:Nt.hf2};const o={};for(const M in Nt.P)o[M]=uo(M,Nt.P[M]);F.P=o,F.vao=t.createVertexArray();const h=64,n=new Uint8Array(h*h*h);let g=19088811;for(let M=0;M<n.length;M++){g=g+1831565813|0;let w=Math.imul(g^g>>>15,1|g);w=w+Math.imul(w^w>>>7,61|w)^w,n[M]=(w^w>>>14)>>>24}F.tN=t.createTexture(),t.bindTexture(t.TEXTURE_3D,F.tN),t.texImage3D(t.TEXTURE_3D,0,t.R8,h,h,h,0,t.RED,t.UNSIGNED_BYTE,n),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_WRAP_T,t.REPEAT),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_WRAP_R,t.REPEAT),t.bindTexture(t.TEXTURE_3D,null),F.tmpBoxIdx=(()=>{const M=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,M),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([1,3,2,1,2,0,5,4,6,5,6,7,0,2,6,0,6,4,1,5,7,1,7,3,2,3,7,2,7,6,0,4,5,0,5,1]),t.STATIC_DRAW),M})()}const at=F.P,le=t.HALF_FLOAT,Xt=(o,h,n,g,M,w,H)=>{const S=t.createTexture();return t.bindTexture(t.TEXTURE_2D,S),t.texImage2D(t.TEXTURE_2D,0,n,o,h,0,g,M,w),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,H),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,H),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),S},j={};j.tHN=Xt(k,k,t.RGBA16F,t.RGBA,le,q.hN,t.LINEAR),j.tHF=Xt(k,k,t.RGBA16F,t.RGBA,le,q.hF,t.LINEAR),j.tF=Xt(ce,4,t.RGBA32F,t.RGBA,t.FLOAT,q.fdat,t.NEAREST),j.ib=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,j.ib),t.bufferData(t.ARRAY_BUFFER,q.inst,t.STATIC_DRAW),j.vao=t.createVertexArray(),t.bindVertexArray(j.vao);{const o=at.f.p,h=(n,g)=>{const M=t.getAttribLocation(o,n);M<0||(t.enableVertexAttribArray(M),t.vertexAttribPointer(M,4,t.FLOAT,!1,64,g),t.vertexAttribDivisor(M,1))};t.bindBuffer(t.ARRAY_BUFFER,j.ib),h("iA",0),h("iB",16),h("iF",32),h("iE",48),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,F.tmpBoxIdx)}t.bindVertexArray(null),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null);const Gt=(o,h,n,g,M,w,H)=>{const S=Xt(g,M,o,h,n,null,H||t.NEAREST),O=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,O),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,S,0);let P=null;return w&&(P=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,P),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,g,M),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,P)),{t:S,f:O,d:P}},he=Math.min(768,t.getParameter(t.MAX_TEXTURE_SIZE)||768),Ze=42,At=!(F.fl||F.hf2),Fo=new Uint32Array(4),Xe=F.fl||F.hf2?t.RGBA16F:t.RGBA16UI,Wt=F.fl||F.hf2?le:t.UNSIGNED_SHORT,Ge=At?t.RGBA_INTEGER:t.RGBA,nt={a:Gt(Xe,Ge,Wt,V,V,!0),b:Gt(Xe,Ge,Wt,V,V,!1),hzN:Gt(F.fl||F.hf2?t.RG16F:t.R32UI,F.fl||F.hf2?t.RG:t.RED_INTEGER,At?t.UNSIGNED_INT:Wt,he,he,!1,At?t.NEAREST:t.LINEAR),hzF:Gt(F.fl||F.hf2?t.RG16F:t.R32UI,F.fl||F.hf2?t.RG:t.RED_INTEGER,At?t.UNSIGNED_INT:Wt,k,k,!1,At?t.NEAREST:t.LINEAR)};t.bindFramebuffer(t.FRAMEBUFFER,null);const We=new Float32Array(19*4),Vt=De(0,0),ko=Math.max(.14,Vt[1]),fe=1.92*Math.pow(ko/.334,-.42)*(Et==="Moon behind you"?.9:1),Lt=Ht(17*R,6*R,ae),me=re?.36:1,de=[fe*me,me*St(.985,.87,Lt)*fe,me*St(.955,.7,Lt)*fe],xe=[St(.97,1,Lt),St(.98,.8,Lt),St(1,.56,Lt)],ue=[.17,.215,.33],Ve=Ut-1.7*R,Ke=Ut+1.7*R,pe=q.met0[0];let Dt=q.met0[1];const gt=()=>{Dt=Dt+1831565813|0;let o=Math.imul(Dt^Dt>>>15,1|Dt);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},C={t0:60+gt()*200,dur:.5,a:[0,1,0],d:[0,0,0]},je=()=>{const o=gt()*ut,h=(18+gt()*45)*R,n=Math.cos(h),g=[Math.sin(o)*n,Math.sin(h),Math.cos(o)*n],M=(gt()-.5)*2.4,w=(5+gt()*9)*R,H=Math.cos(o),S=-Math.sin(o);C.a=g,C.d=[H*Math.cos(M)*w,-Math.abs(Math.sin(M))*w*.7-w*.2,S*Math.cos(M)*w],C.dur=.35+gt()*.5};je();const ve=(o,h)=>{o>C.t0+C.dur&&(C.t0=o+50+gt()*250,je());const n=We,g=[Math.sin(_.yaw)*Math.cos(_.pitch),Math.sin(_.pitch),Math.cos(_.yaw)*Math.cos(_.pitch)],M=[Math.cos(_.yaw),0,-Math.sin(_.yaw)],w=Ao(g,M);n[0]=_.x,n[1]=_.y,n[2]=_.z,n[3]=qe,n[4]=g[0],n[5]=g[1],n[6]=g[2],n[7]=qe*2/V,n[8]=M[0],n[9]=M[1],n[10]=M[2],n[11]=o,n[12]=w[0],n[13]=w[1],n[14]=w[2],n[15]=V,n[16]=Vt[0],n[17]=Vt[1],n[18]=Vt[2],n[19]=1;const H=De(h.az,h.el);n[20]=H[0],n[21]=H[1],n[22]=H[2],n[23]=Math.tan(Math.asin(H[1])),n[24]=de[0],n[25]=de[1],n[26]=de[2],n[27]=.62,n[28]=ue[0],n[29]=ue[1],n[30]=ue[2],n[31]=Mo,n[32]=ie[0],n[33]=ie[1],n[34]=ie[2],n[35]=zo,n[36]=K,n[37]=wt,n[38]=Ro,n[39]=yo,n[40]=Ct,n[41]=Ot,n[42]=(h.az+1.7*R)/(3.4*R),n[43]=(ae<15*R?.78:.64)*R,n[44]=Math.sin(Ve),n[45]=Math.cos(Ve),n[46]=Math.sin(Ke),n[47]=Math.cos(Ke),n[48]=_t==="Thin cloud, a halo"?1:0,n[49]=ce,n[50]=(Et==="Toward the moon"?1:Et==="Moon behind you"?.7:.9)*(re?.55:1),n[51]=Pt?1:0,n[52]=0,n[53]=go*(1+.2*Math.sin(o*.031+pe)*Math.sin(o*.0117+pe*2.3)+.12*Math.sin(o*.0071+pe*4.1)),n[54]=Eo,n[55]=bo,n[56]=xe[0],n[57]=xe[1],n[58]=xe[2],n[59]=re?1:0,n[60]=I.spill[0],n[61]=I.spill[1],n[62]=I.spill[2],n[63]=I.spill[3],n[64]=C.a[0],n[65]=C.a[1],n[66]=C.a[2],n[67]=(o-C.t0)/C.dur,n[68]=C.d[0],n[69]=C.d[1],n[70]=C.d[2],n[72]=I.x,n[73]=I.z,n[74]=Ze},bt=o=>{t.useProgram(o.p),t.uniform4fv(o.uU,We)},D=(o,h,n)=>{t.activeTexture(t.TEXTURE0+o),t.bindTexture(h,n)},Ye=()=>{D(0,t.TEXTURE_3D,F.tN),D(1,t.TEXTURE_2D,j.tHN),D(2,t.TEXTURE_2D,j.tHF),D(5,t.TEXTURE_2D,j.tF)},No=()=>{t.bindVertexArray(F.vao),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.depthMask(!0),Ye(),D(3,t.TEXTURE_2D,null),D(4,t.TEXTURE_2D,null),D(6,t.TEXTURE_2D,null),D(7,t.TEXTURE_2D,null),bt(at.h);for(const[o,h,n,g,M]of[[nt.hzN,Ze,he,I.x,I.z],[nt.hzF,wt,k,0,0]])t.bindFramebuffer(t.FRAMEBUFFER,o.f),t.viewport(0,0,n,n),t.uniform4f(at.h.uHZ,h,n,g,M),t.drawArrays(t.TRIANGLES,0,3);t.flush()},Je=()=>{t.bindVertexArray(F.vao),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.depthMask(!0),Ye(),D(3,t.TEXTURE_2D,null),D(4,t.TEXTURE_2D,null),D(6,t.TEXTURE_2D,null),D(7,t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,nt.a.f),t.viewport(0,0,V,V),t.clearColor(0,0,0,0),t.clearDepth(1),At?(t.clear(t.DEPTH_BUFFER_BIT),t.clearBufferuiv(t.COLOR,0,Fo)):t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),bt(at.g),t.drawArrays(t.TRIANGLES,0,3),t.flush(),t.enable(t.CULL_FACE),t.cullFace(t.FRONT),bt(at.f),t.bindVertexArray(j.vao),t.drawElementsInstanced(t.TRIANGLES,36,t.UNSIGNED_SHORT,0,ce),t.bindVertexArray(F.vao),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.flush(),D(3,t.TEXTURE_2D,nt.a.t),t.bindFramebuffer(t.FRAMEBUFFER,nt.b.f),t.viewport(0,0,V,V),bt(at.s),t.drawArrays(t.TRIANGLES,0,3),bt(at.p),t.drawArrays(t.TRIANGLES,0,3),bt(at.k),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush()},Qe=()=>{t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,V,V),t.bindVertexArray(F.vao),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),D(0,t.TEXTURE_3D,F.tN),D(3,t.TEXTURE_2D,nt.a.t),D(4,t.TEXTURE_2D,nt.b.t),D(6,t.TEXTURE_2D,nt.hzN.t),D(7,t.TEXTURE_2D,nt.hzF.t),bt(at.c),t.drawArrays(t.TRIANGLES,0,3)},we=o=>({az:Math.sin(o*.0093)*1.5*R,el:Math.sin(o*.0071+1)*.55*R});ve(0,we(0)),No(),Je(),Qe();let Ho=0;return(o,h)=>{Pe()&&(ve(o,we(o)),Je()),ve(o,we(o)),Qe(),t.bindVertexArray(null),t.bindFramebuffer(t.FRAMEBUFFER,null),Ho=o}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
