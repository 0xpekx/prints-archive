// Chalk Desert: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/623.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ke){ke&&ke.add({num:623,name:"Chalk Desert",fam:"Vistas",recipe:"The White Desert of Farafra on a full moon night, standing among chalk mushrooms, sugarloaf cones and humps on cream sand scattered with black stones, with low mist on the plain and hills far off. Where you stand, how high the moon is and the haze change every mint. Nothing to touch, just watch the dust drift, the mist breathe, the shadows creep and now and then a meteor go over.",interactive:"Nothing to touch: thin dust drifts at ground level, the mist breathes, the moon and the shadows creep and now and then a meteor crosses",music:!1,gl:!0,fps:30,seed:0,make(et){const t=et.gl,K=et.size,k=!!et.home,ot=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,io=ot+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",ct=`
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
`,Pt=`
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
`,Ne=`
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
`,co=ot+ct+Pt+`
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
}`,lo=ot+ct+`
in vec4 iA, iB, iF, iE; flat out vec4 vA, vB, vF, vE; flat out float vId; out vec3 vW;
void main(){
  vec3 c = vec3(float((gl_VertexID >> 0) & 1), float((gl_VertexID >> 1) & 1), float((gl_VertexID >> 2) & 1));
  float R = (max(iB.x, max(iB.y, iB.z)) * 1.55 + iA.w * .22 + .6) * max(iE.y, 1.);
  vec3 p = vec3(iA.x, iA.z - 1., iA.y) + vec3((c.x - .5) * 2. * R, c.y * (iA.w * 1.2 + 1.5), (c.z - .5) * 2. * R);
  vA = iA; vB = iB; vF = iF; vE = iE; vW = p; vId = float(gl_InstanceID);
  vec3 v = p - CAM;
  float z = dot(v, FW);
  gl_Position = vec4(dot(v, RT) / TANH, dot(v, UPV) / TANH, 0., z);
}`,ho=ot+ct+Ne+`
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
}`,fo=ot+ct+Pt+`
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
}`,re=`
uniform sampler2D uG, uF; out vec4 o;
float hsh(vec2 p){ vec3 q = fract(vec3(p.xyx) * .1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
vec3 hsh3(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx); }
`,mo=ot+ct+re+`
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
}`,xo=ot+ct+Pt+re+`
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
}`,uo=ot+ct+Pt+Ne+re+`
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
}`,po=ot+ct+`
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
}`;let E=t.__c623;const ie=(e,d)=>{const n=t.createShader(d);return t.shaderSource(n,e),t.compileShader(n),n},vo=(e,d)=>{if(!t.getProgramParameter(d.p,t.LINK_STATUS))throw new Error("623 "+e+": "+t.getShaderInfoLog(d.f)+t.getShaderInfoLog(d.v)+t.getProgramInfoLog(d.p));const n={p:d.p};return n.uU=t.getUniformLocation(d.p,"uU"),n.uHZ=t.getUniformLocation(d.p,"uHZ"),t.useProgram(d.p),[["uN",0],["uHN",1],["uHF",2],["uG",3],["uB",4],["uF",5],["uHZN",6],["uHZF",7]].forEach(([w,F])=>{const N=t.getUniformLocation(d.p,w);N&&t.uniform1i(N,F)}),n.ok=!0,n};let Ft=null;if(!E){{const H=t.getExtension("KHR_parallel_shader_compile");H&&H.maxShaderCompilerThreadsKHR&&H.maxShaderCompilerThreadsKHR(4294967295)}const e=!!t.getExtension("EXT_color_buffer_float"),d=e||!!t.getExtension("EXT_color_buffer_half_float"),n=(H,S)=>{if(d)return H;const L=(b,st,Ot)=>{if(b.indexOf(st)<0)throw new Error("623 NH "+S+" "+st);return b.split(st).join(Ot)},$=`
uvec4 eH(vec4 v){uint a=packHalf2x16(v.xy),b=packHalf2x16(v.zw);return uvec4(a&65535u,a>>16,b&65535u,b>>16);}
vec4 dH(uvec4 u){return vec4(unpackHalf2x16(u.x|(u.y<<16)),unpackHalf2x16(u.z|(u.w<<16)));}
`,dt=(b,st)=>L(b,"void main(){",`void main0();
void main(){main0();`+st+`}
void main0(){`);return S==="h"?dt(L(H,"out vec4 o;","out uint oH; vec4 o;"),"oH=packHalf2x16(o.xy);"):S==="g"||S==="f"?dt(L(H,"out vec4 o;","out uvec4 oU; vec4 o;"+$),"oU=eH(o);"):S==="s"||S==="p"||S==="k"?dt(L(H,"uniform sampler2D uG, uF; out vec4 o;","uniform highp usampler2D uG; uniform sampler2D uF; out uvec4 oU; vec4 o;"+$).split("texelFetch(uG, ip, 0)").join("dH(texelFetch(uG, ip, 0))").replace("texelFetch(uG, ivec2(gl_FragCoord.xy), 0)","dH(texelFetch(uG, ivec2(gl_FragCoord.xy), 0))"),"oU=eH(o);"):S==="c"?L(L(L(L(L(H,"uniform sampler2D uB, uG, uHZN, uHZF; out vec4 o;","uniform highp usampler2D uB, uG, uHZN, uHZF; out vec4 o;"+$+`vec2 hT(highp usampler2D s, ivec2 i, ivec2 m){return unpackHalf2x16(texelFetch(s, clamp(i, ivec2(0), m), 0).r);}
vec2 hzL(highp usampler2D s, vec2 uv){vec2 z = vec2(textureSize(s, 0)), p = uv * z - .5, f = fract(p); ivec2 i = ivec2(floor(p)), m = ivec2(z) - 1;
  return mix(mix(hT(s, i, m), hT(s, i + ivec2(1, 0), m), f.x), mix(hT(s, i + ivec2(0, 1), m), hT(s, i + ivec2(1), m), f.x), f.y);}
`),"textureLod(uHZF, xz / FARS * .5 + .5, 0.).rg","hzL(uHZF, xz / FARS * .5 + .5)"),"textureLod(uHZN, u * .5 + .5, 0.).rg","hzL(uHZN, u * .5 + .5)"),"texelFetch(uB, ip, 0)","dH(texelFetch(uB, ip, 0))"),"texelFetch(uG, ip, 0)","dH(texelFetch(uG, ip, 0))"):H},w=t.getParameter(t.MAX_TEXTURE_SIZE),F=ie(io,t.VERTEX_SHADER),N={};for(const[H,S,L]of[["h",null,fo],["g",null,co],["f",lo,ho],["s",null,mo],["p",null,xo],["k",null,uo],["c",null,po]]){const $=t.createProgram(),dt=S?ie(S,t.VERTEX_SHADER):F,b=ie(n(L,H),t.FRAGMENT_SHADER);t.attachShader($,dt),t.attachShader($,b),t.linkProgram($),N[H]={p:$,f:b,v:dt}}t.flush();const U=64,P=new Uint8Array(U*U*U);let Y=19088811;for(let H=0;H<P.length;H++){Y=Y+1831565813|0;let S=Math.imul(Y^Y>>>15,1|Y);S=S+Math.imul(S^S>>>7,61|S)^S,P[H]=(S^S>>>14)>>>24}Ft={P:N,fl:e,hf2:d,mts:w,n3d:P}}let lt=103010789;for(let e=2;e<66;e+=8)lt=Math.imul(lt^parseInt(et.hash.slice(e,e+8),16),2246822507)^lt>>>13;const He=()=>{lt=lt+1831565813|0;let e=Math.imul(lt^lt>>>15,1|lt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let ht=1369626563;for(let e=2;e<66;e+=8)ht=Math.imul(ht^parseInt(et.hash.slice(e,e+8),16),2654435761)^ht>>>15;const Se=()=>{ht=ht+1831565813|0;let e=Math.imul(ht^ht>>>15,1|ht);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let vt=!1;const y=()=>vt?Se():He(),ft=e=>{let d=0;for(const w in e)d+=e[w];let n=y()*d;for(const w in e)if(n-=e[w],n<0)return w;return Object.keys(e)[0]},wt=Math.PI*2,z=Math.PI/180,Ut=(e,d,n)=>{const w=Math.min(1,Math.max(0,(n-e)/(d-e)));return w*w*(3-2*w)},Lt=(e,d,n)=>e+(d-e)*n,s=(e,d)=>e+(d-e)*y(),wo=0,_e=wo?{"0x24487fbd":{Standpoint:"In a shadow, facing the moon",Moon:"Just above the rim",Light:"Toward the moon",Haze:"Dust lying low"},"0xf17b8a99":{Standpoint:"Low on the pavement","Black stones":"Sparse",Forms:"Few, far apart"},"0xa8e0d2e9":{Standpoint:"Looking down from a rise",Moon:"High overhead"},"0xf2d1fc28":{Standpoint:"Long lens down a corridor",Rim:"Faint and far",Haze:"Clear"},"0x149f1ab8":{Standpoint:"Among the forms",Light:"Moon behind you"},"0x2e78d304":{Standpoint:"Among the forms",Moon:"Very low, huge shadows",Light:"Toward the moon","Black stones":"Thick black field"},"0xf1364849":{Standpoint:"Among the forms",Moon:"Low in the east",Light:"Toward the moon",Sky:"Partial eclipse"},"0x2ec15318":{Standpoint:"Among the forms",Moon:"Low in the east",Light:"Toward the moon",Sky:"Thin cloud, a halo"},"0xf7a3cc18":{Standpoint:"Among the forms",Sky:"After a sandstorm"},"0xd957a826":{Standpoint:"Among the forms",Rim:"High escarpment",Light:"Moon abeam",Chalk:"Whalebacks"},"0x36c4a9f6":{Standpoint:"Among the forms",Rim:"Low dark hills",Chalk:"Sugarloaf cones"},"0x3d0fe055":{Standpoint:"Among the forms",Haze:"Clear",Chalk:"Broken stumps"},"0x710219a0":{Standpoint:"Among the forms",Haze:"Thin",Chalk:"Tall mushrooms"},"0xa7830c68":{Standpoint:"Among the forms",Haze:"Dust lying low",Chalk:"Mushrooms and mounds"},"0x55273b95":{Standpoint:"In a shadow, facing the moon",Moon:"Just above the rim",Light:"Toward the moon",Sky:"Partial eclipse"}}[et.hash.slice(0,10)]:null,at=(e,d)=>et.trait(e,_e&&_e[e]||d),Ue=at("Moon",k?"Low in the east":ft({"Low in the east":40,"High overhead":30,"Just above the rim":22,"Very low, huge shadows":8})),kt=at("Light",k?"Toward the moon":ft({"Toward the moon":40,"Moon abeam":38,"Moon behind you":22})),Nt=at("Chalk",k?"Mushrooms and mounds":(e=>e==="Broken stumps"?"Mushrooms and mounds":e)(ft({"Mushrooms and mounds":36,Whalebacks:22,"Sugarloaf cones":18,"Broken stumps":14,"Tall mushrooms":10}))),Mo=at("Black stones",k?"Strewn":ft({Strewn:50,Sparse:26,"Thick black field":24})),Xt=at("Haze",k?"Thin":ft({Thin:46,Clear:30,"Dust lying low":24})),Le=at("Rim",k?"Low dark hills":ft({"Low dark hills":50,"High escarpment":34,"Faint and far":16})),go=at("Forms",k?"Scattered":ft({Scattered:40,"Dense field":34,"Few, far apart":26})),De=e=>{vt=!0;const d=ft(e);return vt=!1,d},Ie=kt==="Toward the moon"&&Ue!=="High overhead",Mt=at("Standpoint",k?"Among the forms":De(Ie?{"Among the forms":34,"In a shadow, facing the moon":30,"Low on the pavement":12,"Looking down from a rise":12,"Long lens down a corridor":12}:{"Among the forms":44,"Low on the pavement":19,"Looking down from a rise":19,"Long lens down a corridor":18})),Dt=at("Sky",k?"Clear":De(Ie?{Clear:63,"Thin cloud, a halo":26,"After a sandstorm":5,"Partial eclipse":6}:{Clear:93,"After a sandstorm":7})),ce={"Low in the east":19.5,"High overhead":62,"Just above the rim":13,"Very low, huge shadows":7}[Ue]*z,le={"Toward the moon":k?28:24+(y()*8-4),"Moon abeam":78+(y()*18-9),"Moon behind you":138+(y()*22-11)}[kt]*z*(k||y()<.5?1:-1),It=y()*wt,gt=It-le,Be=(e,d)=>{const n=It+e,w=ce+d,F=Math.cos(w);return[Math.sin(n)*F,Math.sin(w),Math.cos(n)*F]},he=y()*wt,qe=Nt==="Whalebacks"&&!k?gt+(he<Math.PI?1:-1)*(.6+.35*(he%Math.PI)/Math.PI):he,Gt=Math.sin(qe),Wt=Math.cos(qe),Vt=Dt==="After a sandstorm",fe=Dt==="Partial eclipse",bo={Thin:.0011,Clear:42e-5,"Dust lying low":.0021}[Xt]*(Vt?2.2:1),yo={Thin:.007,Clear:.0025,"Dust lying low":.11}[Xt]*(Vt?1.6:1),zo=Xt==="Dust lying low"?.75:1.4,Ro={Thin:.5,Clear:.16,"Dust lying low":.95}[Xt],Eo={Strewn:.66,Sparse:.3,"Thick black field":1.15}[Mo],To={"Low dark hills":1,"High escarpment":1.75,"Faint and far":.62}[Le],me=Vt?[.34,.3,.27]:Le==="Faint and far"?[.3,.34,.43]:[.25,.29,.385],j=58,bt=620,A=384,yt=t.__m623||(t.__m623=new Map),Kt=et.hash+(k?"+h":"");let O=yt.get(Kt);if(O)yt.delete(Kt),yt.set(Kt,O);else{let ne=function(o,r,c,a){const M=a*2/A,h=(o+a)/M-.5,u=(r+a)/M-.5,m=Math.max(0,Math.min(A-2,Math.floor(h))),p=Math.max(0,Math.min(A-2,Math.floor(u))),i=h-m,f=u-p,x=c[(m+p*A)*4],g=c[(m+1+p*A)*4],T=c[(m+(p+1)*A)*4],R=c[(m+1+(p+1)*A)*4];return x+(g-x)*i+(T-x)*f+(x-g-T+R)*i*f};var Bo=ne;let e=[];const d=Math.atan2(-Wt,Gt),n=(o,r,c,a,M)=>{let h,u,m,p,i,f,x=1,g=0,T=y()*wt;if(a===0){const v=s(.34,.62)*Math.pow(c,.75);i=s(.16,.32),p=s(.55,.78),m=v*s(.9,1.35),u=v*s(.34,.5),h=v*s(.42,.68),f=s(.5,1),x=s(1,1.35),g=y()<.4?1:0}else if(a===1){const v=s(.9,1.55)*Math.pow(c,.85);i=s(.02,.14),p=s(.12,.34),m=v*s(.75,1),u=v*s(.72,.96),h=v*s(.86,1.08),f=s(.2,.55),x=s(1,1.6)}else if(a===2){const v=s(.3,.55)*Math.pow(c,.7);i=s(.1,.3),p=s(.42,.72),m=v*s(.4,.75),u=v*s(.6,.8),h=v*s(.85,1.15),f=s(.3,.8),x=s(1,1.4)}else if(a===3){const v=s(.22,.32)*Math.pow(c,.78);i=s(.2,.4),p=s(.78,.92),m=v*s(.75,1.05),u=v*s(.5,.65),h=v*s(.7,.95),f=s(.6,1),g=y()<.5?1:0}else if(a===4){const v=s(.62,.95)*Math.pow(c,.8);i=s(.3,.5),p=s(.72,.88),h=v*s(.95,1.2),u=v*s(.5,.66),m=v*s(.2,.32),f=s(.1,.4),x=s(1,1.3),y(),m=v*(.34+(m/v-.2)*1.333)}else if(a===5){const v=s(.75,1.1)*Math.pow(c,.85);i=s(.05,.15),p=s(.32,.52),h=v*s(.95,1.1),u=v*s(.82,.95),m=v*s(.62,.85),f=s(.4,.9),x=s(2.3,3.6),T=d+s(-.15,.15)}else{const v=c*s(.55,1.05);i=s(.2,.35),p=s(.6,.76),m=v*.78,u=v*s(.9,.98),h=v*s(1.25,1.5),f=s(.1,.3),x=s(1,1.6),g=.5}a===2&&(f=-f);const R={Rb:h,Rw:u,Rc:m,el:x},D=a===3;if(D){e.length&&(c*=.6),a=0,x=1,g=1,m=c/2.5;const v=h/u;u=m/2.4,h=u*v,p=2/2.5}if(a===0&&!(k&&!e.length)){m=Math.max(m,u*2.4);const v=Math.min(m*.5,Math.max(m*.4,(1-p)*c)),X=Math.min(p*c,m*(D?2:1.7));c=X+v,p=X/c}a===2&&c<2.2&&c>2*Math.max(h,u,m)&&(h=Math.max(h,c*.7)),e.push({x:o,z:r,H:c,Rb:h,Rw:u,Rc:m,sc:p,sw:i,rot:T,sd:y()*7+1,wc:f,tone:s(.95,1.04)*(a===6?.72:1),kind:a,el:x,cap:g,near:!!M,p0:R})},w=()=>{const o=y();return Nt==="Whalebacks"?o<.55?5:o<.75?1:o<.9?0:4:Nt==="Sugarloaf cones"?o<.55?4:o<.75?0:o<.9?1:2:Nt==="Broken stumps"?o<.6?2:o<.8?1:o<.92?0:4:Nt==="Tall mushrooms"?o<.45?0:o<.75?3:o<.9?4:2:o<.36?0:o<.54?1:o<.68?4:o<.8?5:o<.92?2:3},F=(o,r)=>{const c=r?s(.6,2.6):s(.55,1.3);return{0:s(3.2,6.2),1:s(1.6,3.8),2:s(2.4,5.2),3:s(6.5,10.5),4:s(3.5,7.5),5:s(1.8,3.6),6:s(5,13)}[o]*c},N={"Mushrooms and mounds":0,Whalebacks:5,"Sugarloaf cones":4,"Broken stumps":2,"Tall mushrooms":3}[Nt],U=Math.sin(gt),P=Math.cos(gt),Y=Math.cos(gt),H=-Math.sin(gt),S=(o,r,c,a)=>n(U*r+Y*o,P*r+H*o,c,a,!0),L=k||y()<.5?-1:1;S(L*s(11,15),s(19,25),k?5.6:N===5?s(2.6,3.6):s(4,6.2),N),e[0].kind===5&&(e[0].el=Math.min(e[0].el,2.2+(e[0].el-2.3)*.3)),S(-L*s(7,12),s(27,38),s(4.4,6.6),k?4:N===5?1:y()<.55?0:N===0?4:N),y()<.7&&S(L*s(-3,5)*(y()<.5?-1:1)+L*26,s(38,58),s(2.4,4.4),y()<.55?5:2);const $={Scattered:230,"Dense field":340,"Few, far apart":100}[go];let dt=0;for(;e.length<$&&dt++<9e3;){const o=y()*wt,r=y()<.55?30+y()*170:Math.pow(y(),.62)*540+60,c=Math.cos(o)*r,a=Math.sin(o)*r,M=Math.sin(c*.011+2.3)*Math.sin(a*.013+1.1)+.7*Math.sin(c*.033+5.1)*Math.sin(a*.029+3.7);if(y()>.03+Math.pow(Ut(-.1,1,M),1.6)*.97)continue;const h=c*U+a*P,u=Math.abs(c*Y+a*H);if(h>0&&h<78&&u<10+h*.5)continue;const m=r>230&&y()<.12?6:w(),p=F(m,r>140);let i=!0;for(const f of e){const x=(f.p0.Rc+f.p0.Rb+p*.5)*1.25+5;if((f.x-c)*(f.x-c)+(f.z-a)*(f.z-a)<x*x){i=!1;break}}i&&n(c,a,p,m,!1)}vt=!0;const b=e[0],st=It,Ot=(o,r,c)=>{for(const a of e){const M=Math.max(a.p0.Rb,a.p0.Rw,a.p0.Rc)*a.p0.el+c;if((a.x-o)*(a.x-o)+(a.z-r)*(a.z-r)<M*M)return!1}return!0},l={x:0,z:0,eye:1.7,yaw:gt,pitch:6*z,tanH:Math.tan(25*z),spill:[0,0,0,0]},Re=Math.max(b.Rb,b.Rw,b.Rc)*Math.min(b.el,1.6),$t=(o,r,c)=>{o=Math.max(o+Re,b.H*1.35+Re*.5),l.yaw=gt+c;const a=l.yaw+Math.atan(r*l.tanH);for(let M=0;M<6&&(l.x=b.x-Math.sin(a)*o,l.z=b.z-Math.cos(a)*o,!Ot(l.x,l.z,1.5));M++,o+=2);};let Et=0,St=20,Ee=170,te=.25;if(Mt==="Among the forms"){l.tanH=Math.tan((k?26.5:s(23,27))*z),l.pitch=(k?6:s(5,8))*z;const o=s(-6,6)*z,r=kt==="Toward the moon"?le-Math.sign(le)*s(9,17)*z:o;$t(k?11:s(7,12),k?-.5:L*s(.3,.6),k?8*z:Dt!=="Clear"&&Dt!=="After a sandstorm"||y()<.6?r:o),Et=k?9:6+Math.floor(y()*8)}else if(Mt==="In a shadow, facing the moon"){const o=(y()<.5?-1:1)*s(12,17)*z;let r=s(7,10);l.tanH=Math.tan(26*z),l.pitch=s(7,10)*z,r=Math.max(r+Re*.6,b.H*1.25),l.x=b.x-Math.sin(st+o)*r,l.z=b.z-Math.cos(st+o)*r,l.yaw=st+o*.5,Et=5+Math.floor(y()*6),St=25}else Mt==="Low on the pavement"?(l.eye=s(.32,.5),l.pitch=s(4,8)*z,l.tanH=Math.tan(25*z),$t(s(7,11),L*s(.3,.55),s(-6,6)*z),Et=4+Math.floor(y()*5),St=26):Mt==="Looking down from a rise"?(l.eye=s(5.5,7),l.pitch=-s(16,22)*z,l.tanH=Math.tan(27*z),$t(s(24,32),L*s(.2,.45),s(-6,6)*z),Et=10+Math.floor(y()*7),St=12,Ee=90,te=0):(l.tanH=Math.tan(s(10,12.5)*z),l.pitch=s(2.3,3)*z,$t(s(36,48),L*s(.25,.6),s(-4,4)*z),Et=8+Math.floor(y()*6),St=60,Ee=380,te=.1);const ee={"Among the forms":[3,12],"In a shadow, facing the moon":[4,14],"Low on the pavement":[2,13],"Looking down from a rise":[-24,-9]}[Mt]||[0,5],eo=o=>{const r=Math.cos(b.rot),c=Math.sin(b.rot),a=Math.max(b.Rb,b.Rw,b.Rc)*(b.kind===5?1.1:1.25),M=Math.atan(.8*l.tanH),h=Math.atan(.92*l.tanH),u=Math.sin(l.yaw),m=Math.cos(l.yaw),p=Math.cos(l.yaw),i=-Math.sin(l.yaw);let f=-9,x=9,g=0,T=0;for(let R=0;R<48;R++){const D=R%16*wt/16,v=Math.floor(R/16),X=v===2?Math.max(b.Rc,b.Rw)*1.25:v===1?a:b.Rb*1.2,J=Math.cos(D)*X*b.el,_t=Math.sin(D)*X,rt=b.x+J*r+_t*c-l.x,it=b.z-J*c+_t*r-l.z,G=o-l.eye+b.H*[0,.6,1.1][v],C=rt*u+it*m,tt=rt*p+it*i;if(C<.5)return null;const Tt=tt/C/l.tanH;Math.abs(Tt)>g&&(g=Math.abs(Tt),T=Math.sign(Tt));const I=Math.atan2(G,C);f=Math.max(f,I-M),x=Math.min(x,I+h)}return{lo:f,hi:x,xo:g,xs:T}};if(!k){const o=Math.max(ee[0]*z,Math.min(ee[1]*z,l.pitch));let r=null;for(let c=0;c<22&&(r=eo(0),!(r&&r.xo<.9&&r.lo<=r.hi&&r.lo<=ee[1]*z&&r.hi>=ee[0]*z&&Ot(l.x,l.z,1.5)));c++){r&&r.xo>=.9&&(l.yaw+=r.xs*Math.min(.06,Math.atan((r.xo-.85)*l.tanH)));const a=l.x-b.x,M=l.z-b.z,h=Math.hypot(a,M)||1,u=h*.07+.6;Math.max(Math.abs(l.x+a/h*u),Math.abs(l.z+M/h*u))>j*.85||(l.x+=a/h*u,l.z+=M/h*u)}l.pitch=r&&r.lo<=r.hi?Math.max(r.lo,Math.min(r.hi,o)):o}{const o=Math.sin(l.yaw),r=Math.cos(l.yaw),c=Math.cos(l.yaw),a=-Math.sin(l.yaw),M=Mt==="Long lens down a corridor"?34:Mt==="Looking down from a rise"?9:6;for(const i of e){if(i===b)continue;const f=i.x-l.x,x=i.z-l.z,g=f*o+x*r,T=f*c+x*a,R=Math.max(i.Rb,i.Rw,i.Rc)*Math.min(i.el,1.6)+1;g>-R&&g<M+i.H&&Math.abs(T)-R<Math.max(g,0)*l.tanH*1.15&&(i.gone=!0)}for(let i=0,f=0;i<Et&&f<Et*12;f++){const x=St+Math.pow(y(),.85)*(Ee-St),g=(y()<.5?-1:1)*(te+(1.05-te)*y()),T=l.x+o*x+c*g*x*l.tanH,R=l.z+r*x+a*g*x*l.tanH,D=w(),v=F(D,x>140)*(x<40?.8:1);Math.hypot(T,R)>bt*.9||!Ot(T,R,v*.5+3)||(n(T,R,v,D,x<60),e[e.length-1].extra=!0,i++)}const h=e.filter(i=>!i.gone).map(i=>{const f=i.x-l.x,x=i.z-l.z;return{q:i,a:f*o+x*r,s:f*c+x*a,r:Math.max(i.Rb,i.Rw,i.Rc)*Math.min(i.el,1.6)}}),u=i=>{for(const f of h){if(f===i||f.q.gone||f.a<1||f.a>=Math.min(80,i.a)||i.a-f.a>45||i.q.H<f.q.H*1.4)continue;const x=f.s-f.a*i.s/i.a,g=3*i.r+f.r;if(Math.abs(x)<g)return(Math.abs(x)-g)*Math.sign(x||1)*i.a/f.a}return 0};for(const i of h){if(k||!i.q.extra||i.a<2||i.q.H<2*i.r)continue;const f=u(i);if(!f)continue;const x=i.q.x,g=i.q.z;i.q.x+=c*f,i.q.z+=a*f,i.s+=f,i.q.gone=!0;const T=e.every(R=>R===i.q||R.gone||Math.hypot(R.x-i.q.x,R.z-i.q.z)>Math.max(R.Rb,R.Rw,R.Rc)*R.el+i.r+2);Math.abs(f)<5*i.r+8&&T&&Math.hypot(i.q.x,i.q.z)<bt*.9&&!u(i)?i.q.gone=!1:(i.q.x=x,i.q.z=g,i.s-=f)}const m=s(2.5,5.5),p=s(-1.6,1.6);l.spill=[l.x+o*m+c*p,l.z+r*m+a*p,b.x+(b.x-l.x)*.12+c*s(-2,2),b.z+(b.z-l.z)*.12+a*s(-2,2)]}vt=!1;const Lo=e;e=e.filter(o=>!o.gone);const oe=e.length,Zt=new Float32Array(A*A*4),ae=new Float32Array(A*A*4);if(!t.__n623){const o=new Float32Array(65536);let r=23063;for(let c=0;c<o.length;c++){r=r+1831565813|0;let a=Math.imul(r^r>>>15,1|r);a=a+Math.imul(a^a>>>7,61|a)^a,o[c]=((a^a>>>14)>>>0)/4294967296}t.__n623=o}const xt=t.__n623,Te=(o,r)=>{const c=Math.floor(o),a=Math.floor(r),M=o-c,h=r-a,u=M*M*(3-2*M),m=h*h*(3-2*h),p=c&255,i=a&255,f=p+1&255,x=i+1&255,g=xt[p+i*256],T=xt[f+i*256],R=xt[p+x*256],D=xt[f+x*256];return g+(T-g)*u+(R-g)*m+(g-T-R+D)*u*m},ut=y()*900,qo=(o,r)=>{const c=Te(o*.009+ut,r*.009-ut)*1.5,a=Te(o*.037+13+ut,r*.037+7)*.4,M=Te(o*.13+91,r*.13+ut)*.08;return c+a+M-1.1},oo=(o,r)=>{const c=r*2/A,a=new Int32Array(A*6),M=new Float64Array(A*3),h=(m,p,i)=>{const f=Math.floor(i),x=i-f,g=f&255;M[p*3+m]=x*x*(3-2*x),a[p*6+m*2]=g,a[p*6+m*2+1]=g+1&255};for(let m=0;m<A;m++){const p=(m+.5)*c-r;h(0,m,p*.009+ut),h(1,m,p*.037+13+ut),h(2,m,p*.13+91)}const u=(m,p,i,f,x)=>{const g=a[m*6+p*2],T=a[m*6+p*2+1],R=M[m*3+p],D=xt[g+i],v=xt[T+i],X=xt[g+f],J=xt[T+f];return D+(v-D)*R+(X-D)*x+(D-v-X+J)*R*x};for(let m=0;m<A;m++){const p=(m+.5)*c-r,i=p*.009-ut,f=p*.037+7,x=p*.13+ut,g=Math.floor(i),T=i-g,R=T*T*(3-2*T),D=(g&255)*256,v=((g&255)+1&255)*256,X=Math.floor(f),J=f-X,_t=J*J*(3-2*J),rt=(X&255)*256,it=((X&255)+1&255)*256,G=Math.floor(x),C=x-G,tt=C*C*(3-2*C),Tt=(G&255)*256,I=((G&255)+1&255)*256;for(let Q=0;Q<A;Q++){const At=u(Q,0,D,v,R)*1.5+u(Q,1,rt,it,_t)*.4+u(Q,2,Tt,I,tt)*.08-1.1;o[(Q+m*A)*4]=At,o[(Q+m*A)*4+1]=At}}};oo(Zt,j),oo(ae,bt);const ao=(o,r)=>{const c=r*2/A;for(const a of Lo){const M=a.extra?Se():He();if(a.gone)continue;const h=Math.pow(a.H,.85)*(2.2+a.Rc*.5)*(a.kind===6?.5:1)+2,u=(a.Rc*.9+a.H*.2)*1.25*Math.min(a.el,1.6),m=Math.max(h,u*a.el)+2,p=Math.min(1.25,a.H*.1+.22)*(.55+.8*M),i=Math.max(0,Math.floor((a.x-m+r)/c)),f=Math.min(A-1,Math.ceil((a.x+m+r)/c)),x=Math.max(0,Math.floor((a.z-m+r)/c)),g=Math.min(A-1,Math.ceil((a.z+m+r)/c));if(i>f||x>g)continue;const T=Math.max(a.Rb,a.Rw,a.Rc)*1.08,R=Math.cos(a.rot),D=Math.sin(a.rot),v=a.Rb*1.7+.8,X=Math.min(.5,.12+a.H*.04),J=Math.max(a.Rc*1.9+.5,v*a.el,T*1.08*a.el)*1.0001+1e-6,_t=J*J;for(let rt=x;rt<=g;rt++)for(let it=i;it<=f;it++){const G=(it+.5)*c-r-a.x,C=(rt+.5)*c-r-a.z,tt=G*Gt+C*Wt,Tt=-G*Wt+C*Gt,I=(it+rt*A)*4;if(tt>-a.Rc*.6&&tt<h){const W=(tt+a.Rc*.6)/(h+a.Rc*.6),pt=Tt/(u*(1.05-.7*W));if(Math.abs(pt)<1){const Fe=Ut(1,.35,Math.abs(pt))*(W<.12?Ut(0,.12,W):Math.pow(1-W,1.4));o[I]+=p*Fe,o[I+1]+=p*Fe,o[I+2]=Math.max(o[I+2],p*Fe)}}if(G*G+C*C>=_t)continue;if(tt<a.Rc){const W=Math.hypot(G,C)/(a.Rc*1.9+.5);if(W<1){const pt=.3*(1-W)*(1-W)*Ut(a.Rc,-a.Rc,tt);o[I]-=pt,o[I+1]-=pt}}const Q=Math.hypot(G,C);if(Q<v*a.el){const W=X*Math.pow(1-Q/(v*a.el),2)*(1+.6*Math.max(0,tt/(Q+.1)));o[I]+=W,o[I+1]+=W,o[I+2]=Math.max(o[I+2],W*.6)}const At=Math.hypot((G*R-C*D)/a.el,G*D+C*R);if(At<T*1.08){const W=a.H*(At<T*.5?1:Math.max(0,1-Math.pow((At-T*.5)/(T*.6),3))),pt=o[I]+W;pt>o[I+1]&&(o[I+1]=pt,o[I+3]=a.kind===0&&At>a.Rw*1.25?100+o[I]+a.H*(.32+a.sc*.34):0)}}}};ao(Zt,j),ao(ae,bt);const Do=o=>{const r=o>>16&32768,c=o>>12&2047,a=o>>23&255;if(a<103)return r;if(a>142)return r|31744|((a==255?0:1)&&o&8388607);if(a<113){const M=c|2048;return r|(M>>114-a)+(M>>113-a&1)}return r|a-112<<10|(c>>1)+(c&1)},no=o=>{const r=new Int32Array(o.buffer,o.byteOffset,o.length),c=new Uint16Array(o.length);for(let a=0;a<o.length;a++)c[a]=Do(r[a]);return c},Ae=ne(l.x,l.z,Zt,j),se=Ae+l.eye,so=new Float32Array(oe*4*4);if(e.forEach(o=>{const r=ne(Math.max(-j,Math.min(j,o.x)),Math.max(-j,Math.min(j,o.z)),Zt,j),c=ne(o.x,o.z,ae,bt);o.y0=(Math.abs(o.x)<j*.98&&Math.abs(o.z)<j*.98?r:c)-.35}),!k){const o=Math.sin(l.yaw),r=Math.cos(l.yaw),c=Math.cos(l.yaw),a=-Math.sin(l.yaw),M=e.map(h=>{const u=h.x-l.x,m=h.z-l.z,p=u*o+m*r;return{q:h,a:p,s:(u*c+m*a)/p,t:(h.y0+h.H-se)/p,w:Math.max(h.Rb,h.Rw,h.Rc)*Math.min(h.el,1.6)/p}}).filter(h=>h.a>2);for(const h of M)if(!(h.a>80))for(const u of M)u.a>h.a&&u.t>h.t&&u.t<h.t+.03&&Math.abs(u.s-h.s)<h.w*.85&&(u.q.H=Math.max(u.q.H*.5,(h.t-.006)*u.a+se-u.q.y0),u.t=(u.q.y0+u.q.H-se)/u.a)}e.forEach((o,r)=>{const c=o.y0,a=[o.x,o.z,c,o.H,o.Rb,o.Rw,o.Rc,o.sc,o.sw,o.rot,o.sd,o.wc,o.tone,o.el,k&&o.kind===5?5.3:o.kind,o.cap];for(let M=0;M<4;M++)for(let h=0;h<4;h++)so[(M*oe+r)*4+h]=a[M*4+h]});const ro=new Float32Array(oe*16);if(!k){const o=eo(b.y0+.35-Ae);o&&o.lo<=o.hi&&(l.pitch=Math.max(o.lo,Math.min(o.hi,l.pitch)))}e.forEach((o,r)=>{ro.set([o.x,o.z,o.y0,o.H,o.Rb,o.Rw,o.Rc,o.sc,o.sw,o.rot,o.sd,o.wc,o.tone,o.el,k&&o.kind===5?5.3:o.kind,o.cap],r*16)}),vt=!0;const Io=[y()*wt,y()*4294967296>>>0];vt=!1,O={NFORM:oe,camY0:se,gy0:Ae,cv:l,hN:no(Zt),hF:no(ae),fdat:so,inst:ro,met0:Io},yt.set(Kt,O),yt.size>4&&yt.delete(yt.keys().next().value)}const de=O.NFORM,Ce=O.camY0,Ao=O.gy0,q=O.cv,Fo={yaw:0,pitch:0,x:0,y:0,z:0},Oe=q.tanH,Ze=q.pitch,_={yaw:q.yaw,pitch:Ze,x:q.x,y:Ce,z:q.z};let Pe="";const Xe=()=>{const e=et.view||Fo;_.yaw=q.yaw+(e.yaw||0),_.pitch=Math.max(-1.3,Math.min(1.3,Ze+(e.pitch||0)));const d=e.x||0,n=e.z||0,w=Math.hypot(d,n),F=w>8?8/w:1;_.x=q.x+d*F,_.z=q.z+n*F,_.y=Ce+Math.max(-q.eye+.25,Math.min(4,e.y||0));const N=_.yaw.toFixed(5)+_.pitch.toFixed(5)+_.x.toFixed(3)+_.z.toFixed(3)+_.y.toFixed(3),U=N!==Pe;return Pe=N,U};Xe();const ko=(e,d)=>[e[1]*d[2]-e[2]*d[1],e[2]*d[0]-e[0]*d[2],e[0]*d[1]-e[1]*d[0]];if(!E){E=t.__c623={fl:Ft.fl,hf2:Ft.hf2,mts:Ft.mts,P:Ft.P},E.vao=t.createVertexArray();const e=64,d=Ft.n3d;E.tN=t.createTexture(),t.bindTexture(t.TEXTURE_3D,E.tN),t.texImage3D(t.TEXTURE_3D,0,t.R8,e,e,e,0,t.RED,t.UNSIGNED_BYTE,d),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_WRAP_T,t.REPEAT),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_WRAP_R,t.REPEAT),t.bindTexture(t.TEXTURE_3D,null),E.tmpBoxIdx=(()=>{const n=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([1,3,2,1,2,0,5,4,6,5,6,7,0,2,6,0,6,4,1,5,7,1,7,3,2,3,7,2,7,6,0,4,5,0,5,1]),t.STATIC_DRAW),n})()}const Bt=E.P,mt=e=>Bt[e].ok?Bt[e]:Bt[e]=vo(e,Bt[e]),xe=t.HALF_FLOAT,jt=(e,d,n,w,F,N,U)=>{const P=t.createTexture();return t.bindTexture(t.TEXTURE_2D,P),t.texImage2D(t.TEXTURE_2D,0,n,e,d,0,w,F,N),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,U),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,U),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),P},V={};V.tHN=jt(A,A,t.RGBA16F,t.RGBA,xe,O.hN,t.LINEAR),V.tHF=jt(A,A,t.RGBA16F,t.RGBA,xe,O.hF,t.LINEAR),V.tF=jt(de,4,t.RGBA32F,t.RGBA,t.FLOAT,O.fdat,t.NEAREST),V.ib=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,V.ib),t.bufferData(t.ARRAY_BUFFER,O.inst,t.STATIC_DRAW);const No=()=>{const e=mt("f").p,d=E.al||(E.al=["iA","iB","iF","iE"].map(w=>t.getAttribLocation(e,w)));V.vao=t.createVertexArray(),t.bindVertexArray(V.vao);const n=(w,F)=>{w<0||(t.enableVertexAttribArray(w),t.vertexAttribPointer(w,4,t.FLOAT,!1,64,F),t.vertexAttribDivisor(w,1))};t.bindBuffer(t.ARRAY_BUFFER,V.ib),n(d[0],0),n(d[1],16),n(d[2],32),n(d[3],48),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,E.tmpBoxIdx),t.bindVertexArray(null),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null)},Yt=(e,d,n,w,F,N,U)=>{const P=jt(w,F,e,d,n,null,U||t.NEAREST),Y=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,Y),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,P,0);let H=null;return N&&(H=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,H),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,w,F),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,H)),{t:P,f:Y,d:H}},ue=Math.min(768,E.mts||768),Ge=42,Ht=!(E.fl||E.hf2),Ho=new Uint32Array(4),We=E.fl||E.hf2?t.RGBA16F:t.RGBA16UI,Jt=E.fl||E.hf2?xe:t.UNSIGNED_SHORT,Ve=Ht?t.RGBA_INTEGER:t.RGBA,nt={a:Yt(We,Ve,Jt,K,K,!0),b:Yt(We,Ve,Jt,K,K,!1),hzN:Yt(E.fl||E.hf2?t.RG16F:t.R32UI,E.fl||E.hf2?t.RG:t.RED_INTEGER,Ht?t.UNSIGNED_INT:Jt,ue,ue,!1,Ht?t.NEAREST:t.LINEAR),hzF:Yt(E.fl||E.hf2?t.RG16F:t.R32UI,E.fl||E.hf2?t.RG:t.RED_INTEGER,Ht?t.UNSIGNED_INT:Jt,A,A,!1,Ht?t.NEAREST:t.LINEAR)};t.bindFramebuffer(t.FRAMEBUFFER,null);const Ke=new Float32Array(19*4),Qt=Be(0,0),So=Math.max(.14,Qt[1]),pe=1.92*Math.pow(So/.334,-.42)*(kt==="Moon behind you"?.9:1),qt=Ut(17*z,6*z,ce),ve=fe?.36:1,we=[pe*ve,ve*Lt(.985,.87,qt)*pe,ve*Lt(.955,.7,qt)*pe],Me=[Lt(.97,1,qt),Lt(.98,.8,qt),Lt(1,.56,qt)],ge=[.17,.215,.33],je=It-1.7*z,Ye=It+1.7*z,be=O.met0[0];let Ct=O.met0[1];const zt=()=>{Ct=Ct+1831565813|0;let e=Math.imul(Ct^Ct>>>15,1|Ct);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Z={t0:60+zt()*200,dur:.5,a:[0,1,0],d:[0,0,0]},Je=()=>{const e=zt()*wt,d=(18+zt()*45)*z,n=Math.cos(d),w=[Math.sin(e)*n,Math.sin(d),Math.cos(e)*n],F=(zt()-.5)*2.4,N=(5+zt()*9)*z,U=Math.cos(e),P=-Math.sin(e);Z.a=w,Z.d=[U*Math.cos(F)*N,-Math.abs(Math.sin(F))*N*.7-N*.2,P*Math.cos(F)*N],Z.dur=.35+zt()*.5};Je();const ye=(e,d)=>{e>Z.t0+Z.dur&&(Z.t0=e+50+zt()*250,Je());const n=Ke,w=[Math.sin(_.yaw)*Math.cos(_.pitch),Math.sin(_.pitch),Math.cos(_.yaw)*Math.cos(_.pitch)],F=[Math.cos(_.yaw),0,-Math.sin(_.yaw)],N=ko(w,F);n[0]=_.x,n[1]=_.y,n[2]=_.z,n[3]=Oe,n[4]=w[0],n[5]=w[1],n[6]=w[2],n[7]=Oe*2/K,n[8]=F[0],n[9]=F[1],n[10]=F[2],n[11]=e,n[12]=N[0],n[13]=N[1],n[14]=N[2],n[15]=K,n[16]=Qt[0],n[17]=Qt[1],n[18]=Qt[2],n[19]=1;const U=Be(d.az,d.el);n[20]=U[0],n[21]=U[1],n[22]=U[2],n[23]=Math.tan(Math.asin(U[1])),n[24]=we[0],n[25]=we[1],n[26]=we[2],n[27]=.62,n[28]=ge[0],n[29]=ge[1],n[30]=ge[2],n[31]=bo,n[32]=me[0],n[33]=me[1],n[34]=me[2],n[35]=Eo,n[36]=j,n[37]=bt,n[38]=To,n[39]=Ro,n[40]=Gt,n[41]=Wt,n[42]=(d.az+1.7*z)/(3.4*z),n[43]=(ce<15*z?.78:.64)*z,n[44]=Math.sin(je),n[45]=Math.cos(je),n[46]=Math.sin(Ye),n[47]=Math.cos(Ye),n[48]=Dt==="Thin cloud, a halo"?1:0,n[49]=de,n[50]=(kt==="Toward the moon"?1:kt==="Moon behind you"?.7:.9)*(fe?.55:1),n[51]=Vt?1:0,n[52]=0,n[53]=yo*(1+.2*Math.sin(e*.031+be)*Math.sin(e*.0117+be*2.3)+.12*Math.sin(e*.0071+be*4.1)),n[54]=Ao,n[55]=zo,n[56]=Me[0],n[57]=Me[1],n[58]=Me[2],n[59]=fe?1:0,n[60]=q.spill[0],n[61]=q.spill[1],n[62]=q.spill[2],n[63]=q.spill[3],n[64]=Z.a[0],n[65]=Z.a[1],n[66]=Z.a[2],n[67]=(e-Z.t0)/Z.dur,n[68]=Z.d[0],n[69]=Z.d[1],n[70]=Z.d[2],n[72]=q.x,n[73]=q.z,n[74]=Ge},Rt=e=>{t.useProgram(e.p),t.uniform4fv(e.uU,Ke)},B=(e,d,n)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(d,n)},Qe=()=>{B(0,t.TEXTURE_3D,E.tN),B(1,t.TEXTURE_2D,V.tHN),B(2,t.TEXTURE_2D,V.tHF),B(5,t.TEXTURE_2D,V.tF)},_o=()=>{t.bindVertexArray(E.vao),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.depthMask(!0),Qe(),B(3,t.TEXTURE_2D,null),B(4,t.TEXTURE_2D,null),B(6,t.TEXTURE_2D,null),B(7,t.TEXTURE_2D,null),Rt(mt("h"));for(const[e,d,n,w,F]of[[nt.hzN,Ge,ue,q.x,q.z],[nt.hzF,bt,A,0,0]])t.bindFramebuffer(t.FRAMEBUFFER,e.f),t.viewport(0,0,n,n),t.uniform4f(Bt.h.uHZ,d,n,w,F),t.drawArrays(t.TRIANGLES,0,3);t.flush()},$e=()=>{t.bindVertexArray(E.vao),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.depthMask(!0),Qe(),B(3,t.TEXTURE_2D,null),B(4,t.TEXTURE_2D,null),B(6,t.TEXTURE_2D,null),B(7,t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,nt.a.f),t.viewport(0,0,K,K),t.clearColor(0,0,0,0),t.clearDepth(1),Ht?(t.clear(t.DEPTH_BUFFER_BIT),t.clearBufferuiv(t.COLOR,0,Ho)):t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),Rt(mt("g")),t.drawArrays(t.TRIANGLES,0,3),t.flush(),t.enable(t.CULL_FACE),t.cullFace(t.FRONT),V.vao||No(),Rt(mt("f")),t.bindVertexArray(V.vao),t.drawElementsInstanced(t.TRIANGLES,36,t.UNSIGNED_SHORT,0,de),t.bindVertexArray(E.vao),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.flush(),B(3,t.TEXTURE_2D,nt.a.t),t.bindFramebuffer(t.FRAMEBUFFER,nt.b.f),t.viewport(0,0,K,K),Rt(mt("s")),t.drawArrays(t.TRIANGLES,0,3),Rt(mt("p")),t.drawArrays(t.TRIANGLES,0,3),Rt(mt("k")),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush()},to=()=>{t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,K,K),t.bindVertexArray(E.vao),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),B(0,t.TEXTURE_3D,E.tN),B(3,t.TEXTURE_2D,nt.a.t),B(4,t.TEXTURE_2D,nt.b.t),B(6,t.TEXTURE_2D,nt.hzN.t),B(7,t.TEXTURE_2D,nt.hzF.t),Rt(mt("c")),t.drawArrays(t.TRIANGLES,0,3)},ze=e=>({az:Math.sin(e*.0093)*1.5*z,el:Math.sin(e*.0071+1)*.55*z});ye(0,ze(0)),_o(),$e(),to();let Uo=0;return(e,d)=>{Xe()&&(ye(e,ze(e)),$e()),ye(e,ze(e)),to(),t.bindVertexArray(null),t.bindFramebuffer(t.FRAMEBUFFER,null),Uo=e}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
