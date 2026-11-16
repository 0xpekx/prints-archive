// Fire Cloud: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/531.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ke){Ke&&function(){"use strict";const Pa={yaw:0,pitch:0,x:0,y:0,z:0},Jt=(e,t,x)=>e<t?t:e>x?x:e,St=(e,t,x)=>{const o=Jt((x-e)/(t-e),0,1);return o*o*(3-2*o)},be=(e,t,x)=>e.map((o,b)=>o+(t[b]-o)*x),gt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,Zt=`
uniform vec4 uP[52];
uniform sampler2D uN2;
#define TIME uP[0].x
#define SUN uP[1].xyz
#define SEL uP[1].w
#define EYE uP[3].xyz
#define ENC uP[23].w
#define NI(n) int(uP[39].w * float(n) + .5)
float gDisc = 1.;
float at2(vec2 v) {
  float ax = abs(v.x), ay = abs(v.y);
  float a = atan(min(ax, ay) / max(max(ax, ay), 1e-7));
  a = ay > ax ? 1.5707963 - a : a;
  a = v.x < 0. ? 3.1415927 - a : a;
  return v.y < 0. ? -a : a;
}
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hg(float c, float g) { float g2 = g * g; return .0796 * (1. - g2) / pow(1. + g2 - 2. * g * c, 1.5); }
vec3 sunAt(float y, vec3 base) {
  float e = SEL + sqrt(max(y, 0.) * 3.14e-7);
  float m = 1. / (max(e, 0.) + .03);
  return base * exp(-uP[30].rgb * m * exp(-max(y, 0.) / 8000.)) * smoothstep(-.012, .006, e);
}
vec3 skyCol(vec3 d) {
  float e = max(d.y, 0.);
  vec2 dh = normalize(d.xz + vec2(1e-6, 0.)), lh = normalize(SUN.xz + vec2(1e-6, 0.));
  float ca = dot(dh, lh) * .5 + .5;
  float cs = max(dot(d, SUN), 0.);
  vec3 hor = mix(uP[12].rgb, uP[11].rgb, ca * ca);
  vec3 c = mix(hor, uP[10].rgb, smoothstep(0., 1., pow(e, .62)));
  float anti = 1. - ca;
  c += uP[11].rgb * vec3(1., .6, .75) * anti * anti * exp(-pow((e - .08) / .06, 2.)) * .12;
  float dw = smoothstep(-.3, .9, dot(dh, uP[29].xy));
  float lum = dot(c, vec3(.3, .55, .15));
  c = mix(c, lum * vec3(1.25, .95, .62), clamp(uP[11].w * (dw * .8 + .2 * uP[33].w) * exp(-e / .55), 0., 1.));
  // 1: the smoke of an earlier day lies across the upper sky as a brown roof; 2: a milky veil of high cloud
  float skM = uP[51].w;
  if (skM > .5) {
    float l2 = dot(c, vec3(.3, .55, .15));
    vec3 rc = skM < 1.5 ? l2 * vec3(1.45, .95, .55) * .75 : mix(c, vec3(l2 * 1.2), .7) + uP[20].rgb * pow(cs, 5.) * .25;
    c = mix(c, rc, skM < 1.5 ? smoothstep(.05, .38, e + .12 * dot(dh, uP[29].xy)) * .9 : smoothstep(-.02, .2, e) * .85);
  }
  c += uP[20].rgb * (pow(cs, 16.) * .45 + pow(cs, 4.) * .08) * exp(-e * 2.);
  c += uP[20].rgb * 9. * gDisc * smoothstep(.99996, .999985, cs);
  return c;
}
float hillH(vec2 p) {
  float r2 = dot(p, p);
  float h = -uP[31].x * (1. - exp(-r2 / uP[31].y));
  float k = r2 / (r2 + 9e4);
  float n = textureLod(uN2, p / 2600. + .37, 0.).r - .5, n2 = textureLod(uN2, p / 420. + .11, 0.).g - .5;
  float m = textureLod(uN2, p / 37. + .53, 0.).b - .5;
  return h + (n * 110. + n2 * 16.) * k + m * .9 * smoothstep(6., 40., sqrt(r2));
}
`,ce=gt+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",wa=gt+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 1., 1.); }",Ea=gt+Zt+`
uniform sampler3D uN3;
uniform sampler2D uL;
out vec4 oC;
float gSheet = 0.;
vec4 n3(vec3 p) { return textureLod(uN3, p, 0.); }
vec2 axisOff(float h) {
  vec2 lv = mix(uP[8].xy, uP[8].zw, smoothstep(0., 6000., h));
  return lv * (1800. * (1. - exp(-h / 1800.)) + .25 * h);
}
float surge(float h, float r) {
  float a = (h - uP[25].x) / (.8 * r + 250.), b = (h - uP[26].x) / (.8 * r + 250.), c = (h - uP[27].x) / (.8 * r + 250.);
  return uP[25].y * exp(-a * a) + uP[26].y * exp(-b * b) + uP[27].y * exp(-c * c);
}
// x smoke sigma, y cloud sigma, z safe skip (m), w depth inside (m); gFr = smoke right above the flames
float gFr = 0., gCol = 1e5;
vec4 dens(vec3 p, bool full) {
  vec4 R = vec4(0., 0., 1e5, 0.);
  gSheet = 0.; gFr = 0.;
  int mode = int(uP[30].w + .5);
  vec2 RD = uP[28].xy;
  // ---- the column (and a second, smaller one on a farther ridge), one loop so the code compiles once
  for (int ci = 0; ci < int(uP[38].w + .5); ci++) {
    bool m0 = ci == 0;
    vec4 Bv = m0 ? uP[7] : uP[19];
    float r0 = Bv.w, kk = m0 ? .2 : .15, h = p.y - Bv.y, hc = max(h, 0.);
    float top = m0 ? (mode == 1 ? 5200. : uP[9].y - Bv.y) : uP[38].z;
    if (h > -500. && h < top + 1500.) {
      vec2 v = p.xz - Bv.xz - axisOff(hc) * (m0 ? 1. : .8);
      // a neck at the fire (the whole front's smoke is drawn into one stem), widening about one in four upward and
      // flaring a little where it enters the cap
      float r = (r0 + kk * hc) * (m0 && mode != 1 ? 1. + .28 * smoothstep(top - 1800., top - 100., h) : 1.);
      float sg = m0 ? surge(h, r) : 0.;
      r *= 1. + .3 * sg;
      vec2 q = vec2(dot(v, RD), dot(v, vec2(-RD.y, RD.x))) / r;
      float s = length(q);
      R.z = min(R.z, (s - 1.6) * r * .7);
      if (s < 1.75) {
        float zeta = log(1. + kk * hc / r0) / kk;
        vec3 nc = vec3(q.x, zeta - TIME * uP[0].w * (m0 ? 1. : 1.3), q.y) + (m0 ? 0. : 3.7);
        vec4 w0 = n3(nc * .13 + vec3(.1, TIME * .003, .3));
        vec3 ncw = nc + (w0.rgb - .5) * .6;
        float D = (n3(ncw * .42).a - .5) * .8 + (w0.a - .5) * .5;
        float fine = .5;
        if (full) {
          vec4 b2 = n3(ncw * 1.15 + .37), b3 = n3(ncw * 2.4 + .71);
          D += (b2.a - .5) * .3 + (b3.a - .5) * .12;
          fine = b3.g;
        }
        float e = 1. - s + D;
        float lo = smoothstep(-330., 40., h + 140. * D);
        float hi = !m0 ? smoothstep(top + 1200., top - 600., h) : mode == 1 ? smoothstep(5600., 3600., h) : smoothstep(top + 250., top - 450., h);
        // a hard skin (opaque within some tens of metres) over billows at every size, like a thundercloud's
        float ds = uP[13].w * (m0 ? 1. : .8 * uP[38].y) * smoothstep(0., .05, e) * (.55 + .45 * smoothstep(.05, .4, e)) * (.8 + .4 * fine)
          * (1. + .8 * exp(-hc / 650.)) * (1. + .5 * sg) * lo * hi;
        R.x += ds;
        R.w = max(R.w, max(e, 0.) * r);
        R.z = min(R.z, max(-e, 0.) * r * .6 + 8.);
      }
    }
  }
  // ---- smoke rising off the fire front: many small leaning plumes along the burning run, feeding the column
  if (uP[29].w > 0.) {
    vec2 fw = vec2(-RD.y, RD.x);
    float lat = dot(p.xz, RD), fz = dot(p.xz, fw);
    float la = dot(uP[37].xy, RD), lb = dot(uP[37].zw, RD);
    if (fz > 0. && lat > la - 900. && lat < lb + 900. && p.y < uP[7].y + 2800.) {
      float u = lat / fz;
      vec4 l = textureLod(uL, vec2((uP[36].w + u * (1. - u * u * .3)) / 6.2831853, .375), 0.);
      float rad = length(p.xz) - l.g;
      float hf = p.y - (l.r - 150.);
      if (rad > -1400. && rad < 600. && hf > -120.) {
        float hp = max(hf, 0.);
        vec2 off = axisOff(hp) * .85;
        float latd = lat - dot(off, RD), radd = rad - dot(off, fw);
        // the front's smoke is drawn in toward the column as it rises: separate leaning smokes merging into the stem
        latd = mix(latd, dot(uP[7].xz, RD), .72 * smoothstep(0., 1200., hp));
        float ew = exp(-pow(max(max(la - latd, latd - lb), 0.) / 260., 2.));
        float env = exp(-pow((radd + 480.) / (230. + .3 * hp), 2.)) * smoothstep(-110., 30., hf) * exp(-hp / 430.) * ew;
        if (env > .01) {
          float pl = n3(vec3(latd / 1150., hp / 1700. - TIME * .004, .37)).g;
          float wi = full ? n3(vec3(latd / 330., (hp - TIME * 9.) / 420., radd / 400.)).a : .5;
          float fd = uP[13].w * .15 * uP[29].w
 * env * smoothstep(.34, .74, pl + (wi - .5) * .4 + .2 * smoothstep(300., 1100., hp)) * (1. + 1.2 * exp(-hp / 90.));
          R.x += fd;
          gFr = fd * exp(-hp / 260.) * smoothstep(.45, .7, pl);
          R.z = min(R.z, 30.);
        }
      }
    }
  }
  // ---- the condensation cap: a lumpy bank of cauliflower towers on top of the leaning plume, offset downwind,
  // wider than tall (lobes set per mint in JS, in metres in the wind frame; max of spheres keeps creases)
  if (mode != 1) {
    vec3 v3 = p - uP[9].xyz;
    vec2 wq = uP[29].xy;
    vec3 cq = vec3(dot(v3.xz, wq), v3.y, dot(v3.xz, vec2(-wq.y, wq.x)));
    vec3 bq = (cq - uP[50].xyz) / uP[51].xyz;
    float Rc = uP[9].w, sk = 1.;
    R.z = min(R.z, max(length(bq) - 1.15, 0.) * min(uP[51].x, uP[51].y) * .8 + 8.);
    if (dot(bq, bq) < 1.32) {
      // a thunderhead's top: above the tropopause the towers flatten and are sheared out downwind into a shelf
      if (uP[49].w > 0.) {
        float ya = smoothstep(uP[49].x - 700., uP[49].x + 250., cq.y);
        cq.x = (cq.x - ya * uP[49].y) / (1. + uP[49].z * ya);
        cq.y += max(cq.y - uP[49].x, 0.) * 1.4;
        sk = .4;
      }
      float f = uP[41].w - length(cq - uP[41].xyz);
      f = max(f, uP[42].w - length(cq - uP[42].xyz));
      f = max(f, uP[43].w - length(cq - uP[43].xyz));
      f = max(f, uP[44].w - length(cq - uP[44].xyz));
      f = max(f, uP[45].w - length(cq - uP[45].xyz));
      f = max(f, uP[46].w - length(cq - uP[46].xyz));
      f = max(f, uP[47].w - length(cq - uP[47].xyz));
      f = max(f, uP[48].w - length(cq - uP[48].xyz));
      // the anvil of a thunderhead: a flat lens spreading downwind from the top of the tower
      R.z = min(R.z, max(-f - .3 * Rc, 0.) * .8 * sk + 8.);
      if (f > -.3 * Rc) {
        // billows at three scales: the worley channel is a union of soft spheres, so its iso-surface buds into lobes
        vec3 cc = cq / Rc * 1.6 + vec3(uP[40].x, -TIME * .006, 0.);
        vec4 c0 = n3(cc * .19 + vec3(.5, TIME * .0015, .2));
        vec3 ccw = cc + (c0.rgb - .5) * .5;
        float Dc = (n3(ccw * .45 + .13).a - .5) * .5 + (c0.a - .5) * .16;
        if (full) Dc += (n3(ccw * 1.2 + .51).a - .5) * .26 + (n3(ccw * 2.7 + .77).a - .5) * .07;


        float fD = f + Dc * Rc * .38 + 60. * smoothstep(0., 900., cq.y);
        // a ragged flat base where the cloud condenses out of the smoke
        float bs = smoothstep(-90., 70., cq.y + Dc * 160.);
        R.y = uP[14].w * smoothstep(0., 90., fD) * bs;
        R.w = max(R.w, max(fD, 0.) * bs);
        R.z = min(R.z, max(-fD, 0.) * .5 * sk + 8.);
        R.x *= 1. - .95 * smoothstep(-40., 200., fD) * bs;

      }
    }
  }

  // ---- the sheet drifting downwind (gCol: how far the column and cap are, so the long steps taken through the
  // thin sheet stop short of them instead of jumping over their lit skin)
  gCol = R.z;
  {
    vec2 wd = uP[29].xy, rel = p.xz - uP[7].xz;
    float a = dot(rel, wd), c = dot(rel, vec2(-wd.y, wd.x));
    float wid = 700. + .18 * max(a, 0.);
    float hz = (p.y - uP[32].x - .04 * max(a, 0.)) / (uP[32].y * (1. + max(a, 0.) / 22000.));
    float env = exp(-hz * hz - c * c / (wid * wid)) * smoothstep(-1800., 3000., a) * exp(-max(a, 0.) / 40000.);
    if (env > .02) {
      float nn = n3(vec3(a / 15000. - TIME * .0007, p.y / 2600., c / 5200.)).r;
      float n2v = full ? n3(vec3(a / 5000. - TIME * .0015, p.y / 900., c / 1900.) + .4).a : .5;
      gSheet = uP[32].z * env * smoothstep(.22, .72, nn * .75 + env * .35 + (n2v - .5) * .35);
      R.x += gSheet;
      R.z = min(R.z, 60. + .004 * abs(a));
    }
  }
  return R;
}
float sunTau(vec3 p) {
  vec3 B = uP[7].xyz;
  float hc = max(p.y - B.y, 0.);
  vec2 Lh = normalize(SUN.xz + vec2(1e-5, 0.));
  vec2 v = p.xz - B.xz - axisOff(hc);
  float r = (uP[7].w + .2 * hc) * .95;
  float al = dot(v, Lh), pp = dot(v, v) - al * al;
  float ch = max(sqrt(max(r * r - pp, 0.)) - al, 0.);
  float tau = ch * .0041 * (1. + exp(-hc / 650.)) / (1. + hc / 9000.);
  if (int(uP[30].w + .5) != 1) {
    tau *= smoothstep(uP[9].y + 300., uP[9].y - 600., p.y);
    vec2 wq = uP[29].xy, wr = vec2(-wq.y, wq.x);
    vec3 v3 = p - uP[9].xyz, sc = uP[51].xyz * vec3(.85, .7, .8);
    vec3 q = (vec3(dot(v3.xz, wq), v3.y, dot(v3.xz, wr)) - uP[50].xyz) / sc, Ls = vec3(dot(SUN.xz, wq), SUN.y, dot(SUN.xz, wr)) / sc;
    float a = dot(Ls, Ls), b = dot(q, Ls), c = dot(q, q) - .9;
    float disc = b * b - a * c;
    if (disc > 0.) tau += max((-b + sqrt(disc)) / a, 0.) * uP[14].w * .24;
  }
  return tau;
}
void main() {
  vec2 fc = vec2(gl_FragCoord.x, floor(gl_FragCoord.y) * 2. + uP[23].x + .5);
  vec2 uv = fc / uP[4].w;
  vec3 d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
  vec3 o = EYE;
  vec3 dd = mix(d, vec3(1e-6), lessThan(abs(d), vec3(1e-6)));
  vec3 t1 = (uP[34].xyz - o) / dd, t2 = (uP[35].xyz - o) / dd;
  vec3 tn = min(t1, t2), tf = max(t1, t2);
  float t0 = max(max(tn.x, tn.y), max(tn.z, 0.)), tE = min(min(min(tf.x, tf.y), tf.z), 70000.);
  float hl = max(length(d.xz), 1e-4);
  float az = at2(vec2(d.z, d.x));
  vec4 l1 = texture(uL, vec2(az / 6.2831853, .375));
  float tc = l1.g / hl;
  if (o.y + d.y * tc + l1.g * l1.g * 6.8e-8 < l1.r + 8.) {
    float Hr = l1.r + uP[31].x, ta = max(l1.g - 4500., 0.) / hl, tb = tc;
    for (int k = 0; k < NI(7); k++) {
      float tm = .5 * (ta + tb), x = (tm * hl - l1.g) / 1500.;
      float hy = -uP[31].x + Hr * (.62 * exp(-x * x) + .38 / (1. + 3. * x * x));
      if (o.y + d.y * tm < hy) tb = tm; else ta = tm;
    }
    tE = min(tE, tb);
  }
  if (d.y < -.06) tE = 0.;
  vec3 E = vec3(0.); float T = 1.;
  if (tE > t0) {
    float jit = fract(52.9829189 * fract(dot(fc, vec2(.06711056, .00583715))) + uP[23].y);
    float cph = dot(d, SUN);
    float phS = mix(hg(cph, .6), hg(cph, -.2), .35), phC = mix(hg(cph, .55), hg(cph, -.2), .3);
    // the haze colour low in this direction (the sky's horizon colours: no skyCol call in this program)
    vec2 dhz = normalize(d.xz + vec2(1e-6, 0.)), lhz = normalize(SUN.xz + vec2(1e-6, 0.));
    float chz = dot(dhz, lhz) * .5 + .5;
    vec3 hazeC = mix(uP[12].rgb, uP[11].rgb, chz * chz);
    hazeC = mix(hazeC, dot(hazeC, vec3(.3, .55, .15)) * vec3(1.25, .95, .62), clamp(uP[11].w * (smoothstep(-.3, .9, dot(dhz, uP[29].xy)) * .8 + .2 * uP[33].w) * .93, 0., 1.));
    vec3 B = uP[7].xyz;
    vec2 P0 = uP[37].xy, P1 = uP[37].zw;
    float t = t0 + jit * 30.;
    int NS = int(uP[23].z);
    int NL = min(NS, NI(140)), i = 0, k = 0;
    bool live = NL > 0 && !(t > tE);
    vec3 p = o; vec4 Dn = vec4(0.); float tau = 0., fSh = 0., fFr = 0., cf = 0., fCol = 1e5;
    // one flat loop over (step, tap): k = 0 is the sample, k = 1, 2 are the sun taps; one dens() call site
    for (int it = 0; it < NL * 3 && live; it++) {
      {
      if (k == 0) { p = o + d * t; tau = 0.; }
      vec4 a1 = dens(p + SUN * (k == 0 ? 0. : k == 1 ? mix(32., 75., cf) : mix(170., 290., cf)), k < 2);
      bool sEnd = k == 2;
      if (k == 0) { Dn = a1; fSh = gSheet; fFr = gFr; fCol = gCol; cf = a1.y / max(a1.x + a1.y, 1e-9); sEnd = a1.x + a1.y - gSheet <= 2e-6; }
      else tau += (a1.x + a1.y) * (k == 1 ? mix(40., 60., cf) : mix(190., 160., cf));
      k++;
      if (sEnd) {

      float sg = Dn.x + Dn.y;
      fSh /= max(sg, 1e-9); fFr /= max(sg, 1e-9);
      float base = 30. + t * .012;
      if (fSh > .97) base = max(base, min(t * .06, fCol * .9));
      float dt = max(base, Dn.z);
      if (fCol < base) dt = max(fCol, (12. + t * .0025) * (1. + float(i) * .03));
      if (sg > 1e-6) {
        tau *= 1. - .62 * smoothstep(uP[9].y - 2600., uP[9].y - 500., p.y) * (1. - cf);
        tau += sunTau(p);
        float fC = Dn.y / sg;
        float hh = p.y - B.y;
        vec3 albS = mix(uP[13].rgb, uP[14].rgb, smoothstep(200., 4200., hh));
        vec3 albC = mix(vec3(.985, .985, .98), vec3(.62, .58, .54), smoothstep(uP[9].y + 700., uP[9].y - 100., p.y));

        if (int(uP[30].w + .5) != 1) albS = mix(albS, vec3(.84, .82, .78), smoothstep(uP[9].y - 2400., uP[9].y - 100., p.y) * (1. - fSh));
        albS = mix(albS, vec3(.55, .42, .3), fSh);
        vec3 alb = mix(albS, albC, fC);
        float ph = mix(phS, phC, fC);
        vec3 ms = vec3(0.); float a = 1., b = 1.; vec3 al = alb;
        float bk = mix(.55, .2, fC);
        for (int j = 0; j < NI(3); j++) { ms += al * a * exp(-tau * b) * mix(ph, .0796, float(j) * .45); a *= .55; b *= bk; al *= alb; }
        vec3 sc = sunAt(p.y, uP[2].rgb);
        float occ = exp(-Dn.w / 380.);
        vec3 amb = mix(uP[33].rgb * .8, uP[33].rgb * .55 + uP[10].rgb * .55, fC) * alb * (.42 + .45 * occ) * (.55 + .45 * smoothstep(-500., 5000., hh));
        // fire glow from the flame line below
        vec2 sgm = P1 - P0; vec2 w = p.xz - P0;
        float u = clamp(dot(w, sgm) / dot(sgm, sgm), 0., 1.);
        vec2 dv = w - sgm * u;
        float glow = uP[24].w * (.03 + .67 * uP[0].z) * exp(-max(hh + 250., 0.) / 700.) / (1. + dot(dv, dv) / 6.4e5);
        vec3 fire = uP[24].rgb * albS * (glow * 1.15 * (1. - fC * .5) + uP[24].w * fFr * (.05 + .3 * uP[0].z) * 1.4);

        vec3 lf = p - uP[18].xyz;
        vec3 fl = uP[18].w * alb * vec3(.75, .8, 1.) / (1. + dot(lf, lf) / 1.2e6);
        vec3 Lc = sc * ms * mix(10., 15., fC) + amb + fire + fl;
        dt = clamp(.55 / sg, 10., base);
        float Ts = exp(-sg * dt);
        E += T * (1. - Ts) * mix(hazeC, Lc, exp(-t / (uP[31].z * 1.8)));
        T *= Ts;
      }
      t += dt;
      i++; k = 0;
      live = !(T < .02) && i < NL && !(t > tE);
      }
      }
    }
  }
  vec4 r = vec4(E * ENC, T);
  bool bad = !(r.r >= 0. && r.g >= 0. && r.b >= 0. && r.a >= 0. && r.r < 6e4 && r.g < 6e4 && r.b < 6e4 && r.a <= 1.01);
  oC = bad ? vec4(0., 0., 0., 1.) : r;
}
`,Ta=gt+`
uniform vec4 uP[52];
uniform sampler2D uS;
out vec4 oC;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  if ((p.y & 1) != int(uP[23].x) && uP[32].w < 0.) discard;
  oC = texelFetch(uS, ivec2(p.x, p.y >> 1), 0);
}
`,We=`
uniform sampler2D uR;
// the fire ridge, baked per mint into a polar height map (uR: azimuth x distance 3-12.5 km): ridge height, tree amplitude
float terrH(vec2 p) {
  float h = hillH(p);
  if (dot(p, p) > 4e6) {
    vec4 b = textureLod(uR, vec2(at2(vec2(p.y, p.x)) / 6.2831853, (length(p) - uP[40].z) / uP[40].w), 0.);
    float tr = textureLod(uN2, p / 13. / 256., 0.).a * .7 + textureLod(uN2, p / 41. / 256. + .3, 0.).a * .5 - .3;
    h += b.r * 2048. + b.g * 96. * tr + (textureLod(uN2, p / 330. + .71, 0.).b - .5) * 34. * smoothstep(40., 400., b.r * 2048.);
  }
  return h;
}
`,ga=gt+Zt+`
uniform sampler2D uL;
${We}
out vec4 oC;
void main() {
  vec2 uv = gl_FragCoord.xy / uP[5].w;
  vec3 d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
  vec3 o = EYE;
  bool hit = false;
  float tr = -1.;
  float hl = max(length(d.xz), 1e-4), az = at2(vec2(d.z, d.x));
  // march only rays that can meet our hill or pass below the fire ridge's crest at this azimuth
  vec4 lr = texture(uL, vec2(az / 6.2831853, .375));
  if (d.y < .06 || (d.y < max(.06, (uP[20].w - o.y) / 4200.) && o.y + d.y * (lr.g - 600.) / hl < lr.r + 200.)) {
    float t = .3, tp = t, hp = o.y - terrH(o.xz), ta = 0., tb = 0., ha = 0., hb = 0.;
    int nb = 0;
    for (int i = 0; i < NI(108); i++) {
      vec3 p = o + d * t;
      float h = p.y - terrH(p.xz);
      if (nb > 0) {
        if (h < 0.) { tb = t; hb = h; } else { ta = t; ha = h; }
        if (++nb > 6) break;
        t = .5 * (ta + tb);
        continue;
      }
      if (h < 0.) { nb = 1; ta = tp; ha = hp; tb = t; hb = h; t = .5 * (ta + tb); continue; }
      tp = t; hp = h;
      t += t < 450. ? max(h * 1.6, .05 + t * .085) : max(h * .55, 12. + t * .009);
      if (t > 450. && tp < 450.) {
        // over the empty valley floor: jump to where this azimuth's ridge starts rising
        float ts = (lr.g - 3500.) / hl;
        t = max(t, o.y + d.y * ts > 70. - uP[31].x ? ts : 2300.);
      }
      if (t * hl > lr.g + 4000. || (d.y > 0. && p.y > uP[20].w) || p.y > 1500.) break;
    }
    if (nb > 0) { hit = true; tr = ta + (tb - ta) * ha / max(ha - hb, 1e-4); }
  }
  uint u = floatBitsToUint(tr);
  oC = vec4(uvec4(u, u >> 8, u >> 16, u >> 24) & 255u) / 255.;
}
`,Ra=gt+Zt+`
uniform sampler2D uL;
uniform sampler2D uT;
uniform sampler2D uQ;
out vec4 oC;
vec3 gFire = vec3(0.); float gFog = 1., gEmK = .4; bool gCand = false;
float flare(vec4 F, float az) { float x = (az - F.x) * uP[35].w / max(F.z, 1.); return F.y * exp(-x * x); }
float fireAt(float az, float lat, float del) {
  float e = (texture(uN2, vec2(del / 3000., lat / 9000.)).r - .5) * .06;
  float w = smoothstep(uP[28].z - .01, uP[28].z + .03, az + e) * smoothstep(uP[28].w + .01, uP[28].w - .03, az - e);
  float pa = smoothstep(.3, .6, texture(uN2, vec2(lat / 2300., .61)).g);
  return (w * (.2 + .8 * pa) + flare(uP[15], az) + flare(uP[16], az) + flare(uP[17], az)) * uP[24].w;
}
// fire on a ridge face at depth del below the crest: emission; burn = how burned the ground is
vec3 fireFace(float F, float lat, float del, out float burn) {
  burn = 0.;
  if (F < .01) return vec3(0.);
  // the fire edge across the slope: lobes and bays, not a zigzag
  float dl = 90. + 300. * texture(uN2, vec2(lat / 3400., .17)).r + 110. * (texture(uN2, vec2(lat / 700., .29)).g - .5) + 40. * (texture(uN2, vec2(lat / 150., .53)).r - .5);
  float up = dl - del;
  // where the front runs hot: a few stretches with heads of flame; the rest of the edge only smoulders
  float run = smoothstep(.5, .6, texture(uN2, vec2(lat / 2600., .83 + TIME * .0004)).r + .2 * (F - 1.));
  float head = smoothstep(.52, .76, texture(uN2, vec2(lat / 420., TIME * .009 + .2)).g);
  float fk = texture(uN2, vec2(lat / 60., TIME * .35 - up / 40.)).r;
  float hgt = 3. + min(F, 1.4) * (4. + 13. * head * run);
  float pat = smoothstep(.35, .65, texture(uN2, vec2(lat / 240., .41)).b);
  float flame = smoothstep(-4., 0., up) * exp(-max(up, 0.) / hgt) * (.006 * pat + run * (.03 + 1.1 * head) * (.4 + .6 * pat)) * (.45 + 1.1 * fk);
  // spot fires thrown ahead of the front into the unburnt forest: a handful of separate points
  float spot = smoothstep(.8, .84, texture(uN2, vec2(lat / 900., del / 500. + .37)).g) * smoothstep(20., 60., up) * smoothstep(420., 200., up) * (.5 + fk);
  float bn = texture(uN2, vec2(lat / 3000., del / 2400. + .5)).g;
  burn = smoothstep(-4., -30., up) * smoothstep(900., 150., -up + 500. * (bn - .5));
  // stumps and logs still glowing in the black, fewer away from the edge
  float emb = smoothstep(.8, .93, texture(uN2, vec2(lat / 9. / 256., del / 7. / 256. + .7)).a) * burn * exp(min(up, 0.) / 140.) * (.35 + .5 * fk);
  vec3 em = uP[24].rgb * min(F, 1.6) * (flame * 1.05 + spot * .5 + emb * .2 * vec3(1., .6, .5));
  em = uP[24].rgb * (1. - exp(-em / uP[24].rgb));
  // the fire's glow on the smoke and trees right at the edge: faint, and only where it burns hot
  em += uP[24].rgb * vec3(1., .7, .5) * .05 * F * exp(-max(-up, 0.) / 35. - max(up, 0.) / 150.) * (.05 + .8 * run) * pat;
  return em;
}
vec3 layerShade(int i, vec4 l, float t, float del, float az) {
  float D = l.g, lat = az * D, u = az / 6.2831853, row = (float(i) + .5) / 4.;
  float hr = texture(uL, vec2(u + 1. / 1024., row)).r;
  float dhdl = (hr - l.r) / (6.2831853 * D / 1024.);
  vec4 g = texture(uN2, vec2(lat / 2600., del / 2600. + float(i) * .27));
  vec4 g2 = texture(uN2, vec2(lat / 900., del / 900. + .5));
  vec3 Rr = vec3(sin(az), 0., cos(az)), Tt = vec3(cos(az), 0., -sin(az));
  float gul = ((g.r - .5) * 3.6 + (g2.g - .5) * 2.) * (i == 2 ? .5 : .3);
  vec3 n = normalize(-Rr * .55 + vec3(0., .45 + .35 * g.b, 0.) - Tt * (dhdl * 1.3 + gul));
  float cov = l.b * smoothstep(.28, .55, g2.b * .7 + g.a * .3 + l.b * .25);
  vec3 dry = uP[21].rgb * (.45 + .3 * g.g), rock = uP[39].rgb * .9;
  vec3 alb = mix(mix(dry, rock, smoothstep(.6, .8, g2.r) * .6), uP[22].rgb, cov);
  float fp = t * uP[6].w;
  float tn = texture(uN2, vec2(lat / 12. / 256., del / 12. / 256. + float(i) * .31)).a;
  alb *= mix(.55 + .9 * tn * cov + .3 * (1. - cov), 1., smoothstep(10., 60., fp));
  alb *= mix(1., .55 + .9 * texture(uN2, vec2(lat / 700., del / 450. + .37)).b, cov);
  float dif = max(dot(n, SUN), 0.);
  vec3 sl = sunAt(max(l.r - del, 0.), uP[36].rgb) * smoothstep(-.02, .2, dot(n, SUN));
  vec3 c = alb * (sl * dif * 1.1 + uP[33].rgb * (.45 + .4 * n.y));
  float x = (az - uP[38].x) * D;
  gFire = vec3(i == 2 ? uP[38].y * .8 * smoothstep(900., 300., abs(x)) * uP[24].w : 0., lat, del);
  gFog = exp(-t / uP[31].z) * (1. - .6 * smoothstep(80., 900., del) * (1. - float(min(i, 2)) * .25));
  gEmK = .5;
  return c;
}
${We}vec3 terrShade(vec3 P, vec3 d, float t) {
  float e = .04 + t * .004, r = length(P.xz);
  // one terrH call site: two normal taps, then (on the far ridges) seven sun-shadow taps
  float hk0 = 0., hk1 = 0., shadow = 1.;
  int nt = r > 2200. ? NI(6) : NI(2);
  for (int i = 0; i < nt; i++) {
    float s = 50. * pow(2.6, float(i - 2));
    vec2 q = i == 0 ? P.xz + vec2(e, 0.) : i == 1 ? P.xz + vec2(0., e) : P.xz + SUN.xz * s;
    float hq = terrH(q);
    if (i == 0) hk0 = hq; else if (i == 1) hk1 = hq; else shadow = min(shadow, clamp((P.y + SUN.y * s - hq) / (s * .06) + .5, 0., 1.));
  }
  vec3 n = normalize(vec3(P.y - hk0, e, P.y - hk1));
  vec4 a = texture(uN2, P.xz / 420.), b = texture(uN2, P.xz / 95. + .3);
  float fp = t * uP[6].w;
  vec3 alb = uP[21].rgb * (.72 + .5 * a.g);
  alb = mix(alb, alb * vec3(.62, .66, .5), smoothstep(.55, .75, a.r));
  alb = mix(alb, uP[39].rgb, smoothstep(.66, .8, b.b) * .55);
  vec2 wd = uP[29].xy;
  vec2 q = vec2(dot(P.xz, wd), dot(P.xz, vec2(-wd.y, wd.x)));
  float st = texture(uN2, q * vec2(.35, 1.4)).a * .5 + texture(uN2, q * vec2(.9, 3.1) + .5).a * .5;
  float sh = mix(.8 + .3 * st, .95, smoothstep(.004, .02, fp));
  float tuft = mix(.75 + .5 * b.r, 1., smoothstep(.3, 1.5, fp)) * (.62 + .38 * smoothstep(.36, .56, texture(uN2, P.xz / 70. + .21).g)) * mix(.66, 1., smoothstep(10., 45., r)) * (1. - .42 * smoothstep(.58, .68, texture(uN2, P.xz / 19. + .43).g) * smoothstep(8., 30., r));
  tuft *= mix(.6 + .7 * smoothstep(.3, .7, texture(uN2, P.xz / 7. + .6).g), 1., smoothstep(.03, .07, fp)) * mix(.72, 1., smoothstep(.01, .04, fp));
  float vh = 0.;
  gFire = vec3(0.);
  if (r > 2200.) {
    float az = at2(vec2(P.z, P.x));
    vec4 l = texture(uL, vec2(az / 6.2831853, .375));
    float x = r - l.g, rf = P.y + uP[31].x, lat = az * l.g;
    vec4 g = texture(uN2, P.xz / 2600. + .4), g2 = texture(uN2, P.xz / 700. + .8);
    float cov = 1. - .85 * smoothstep(.62, .74, g.r + .12 * (g2.b - .5) + (1. - l.b) * .25);
    vec3 dry = mix(uP[21].rgb, uP[22].rgb * 3., .4) * (.5 + .3 * g.g);
    float tn = texture(uN2, P.xz / 12. / 256.).a;
    vec3 fo = uP[22].rgb * mix(.35 + 1.3 * tn, 1., smoothstep(6., 22., fp)) * (.65 + .7 * texture(uN2, P.xz / 1100. + .15).b);
    alb = mix(mix(dry, uP[39].rgb, smoothstep(.62, .8, g2.r) * .35), fo, cov);
    sh = 1.; tuft = 1.;
    if (x < 400. && rf > 60.) { gFire = vec3(fireAt(az, lat, -x * .4), lat, -x * .4 + (l.r - P.y) * .15); gCand = az > uP[28].z - .12 && az < uP[28].w + .12; }
    vh = .2 + .38 * smoothstep(-uP[31].x + 380., -uP[31].x + 40., P.y);
  }
  // grass canopy: the ground's small bumps barely change how the stems catch the low sun
  float dif = max(dot(normalize(mix(n, vec3(0., 1., 0.), .6)), SUN) + .3, 0.) / 1.3;
  if (r > 2200.) dif = max(dot(n, SUN), 0.);
  float tr = pow(max(dot(d, SUN), 0.), 3.) * .5 * (r > 2200. ? .2 : 1.);
  vec3 c = alb * (sunAt(P.y + uP[31].x, uP[36].rgb) * (dif * sh * tuft * shadow + tr) + uP[33].rgb * (.55 + .45 * n.y) * tuft);
  c += alb * uP[24].rgb * .0012 * max(dot(n, normalize(vec3(uP[7].x, 300., uP[7].z))), 0.) * step(r, 2200.);
  gFog = exp(-t / uP[31].z) * (1. - vh);
  gEmK = .4;
  return c;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uP[5].w;
  vec3 d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
  vec3 o = EYE;
  vec3 col; float tHit = 1e9;
  // uP[40].y: 0 shade everything, 1 write the still part (land, sky, haze) to the cache, 2 read it back
  // (cache alpha: 0 = a burning pixel, shaded every frame; 1 = cached, nothing behind; 2 = cached, the volume shows)
  int md = int(uP[40].y + .5);
  // a pixel uses the cache only if its whole 2x2 quad does, so the burning pixels' texture derivatives match
  vec4 cq = vec4(0.);
  if (md == 2) {
    ivec2 qb = ivec2(gl_FragCoord.xy) & ~1;
    cq = texelFetch(uQ, ivec2(gl_FragCoord.xy), 0);
    cq.a = min(cq.a, min(min(texelFetch(uQ, qb, 0).a, texelFetch(uQ, qb + ivec2(1, 0), 0).a), min(texelFetch(uQ, qb + ivec2(0, 1), 0).a, texelFetch(uQ, qb + ivec2(1, 1), 0).a)) > .5 ? cq.a : 0.);
  }
  if (cq.a > .5) { col = cq.rgb; tHit = cq.a > 1.5 ? 1e9 : 0.; }
  else {
  bool hit = false, sky = false;
  float cir = 0.; vec3 cirC = vec3(0.), st = vec3(0.);
  gFire = vec3(0.); gFog = 1.;
  float hl = max(length(d.xz), 1e-4), az = at2(vec2(d.z, d.x));
  // the hill and fire-ridge march, cached per view (FS_MARCH: hit distance as float bits in RGBA8, -1 = no hit)
  uvec4 tq = uvec4(texelFetch(uT, ivec2(gl_FragCoord.xy), 0) * 255. + .5);
  float tm = uintBitsToFloat(tq.r | (tq.g << 8) | (tq.b << 16) | (tq.a << 24));
  if (tm > 0.) { hit = true; tHit = tm; col = terrShade(o + d * tm, d, tm); }
  if (!hit) {
    int li = -1; vec4 L = vec4(0.); float tl = 0., del = 0.;
    for (int k = 0; k < NI(3); k++) {
      int i = k == 0 ? 0 : k + 1;
      vec4 l = texture(uL, vec2(az / 6.2831853, (float(i) + .5) / 4.));
      float t = l.g / hl;
      float y = o.y + d.y * t + l.g * l.g * 6.8e-8;
      float tn = texture(uN2, vec2(az * l.g / 13. / 256., .5 + float(i) * .17)).a;
      float tn2 = texture(uN2, vec2(az * l.g / 47. / 256., .21 + float(i) * .13)).a;
      // ridgelines: ridged multi-scale noise along the crest (spurs, saddles, knolls), scaled per layer
      vec4 rn = texture(uN2, vec2(az * l.g / 9000., .13 + float(i) * .21));
      float crest = l.r + l.a * ((1. - abs(2. * rn.r - 1.)) * 1.4 + rn.g * .8 - 1.) + l.b * uP[22].w * (tn * .75 + tn2 * .45 - .2);
      if (y < crest) { li = i; L = l; tl = t; del = crest - y; break; }
    }
    if (li >= 0) { tHit = tl; col = layerShade(li, L, tl, del, az); }
    else {
      sky = true;
      // high thin cirrus, streaming in the upper wind
      if (d.y > .01) {
        float tc = (9500. - o.y) / d.y;
        vec2 cp = o.xz + d.xz * tc, wd = uP[29].xy;
        vec2 cu = vec2(dot(cp, wd), dot(cp, vec2(-wd.y, wd.x)));
        float cn = texture(uN2, cu * vec2(1.6e-5, 3.6e-5) + .2).r * .62 + texture(uN2, cu * vec2(6e-5, 1.3e-4) + .7).g * .38;
        float ca = smoothstep(.5, .95, cn) * smoothstep(.02, .12, d.y) * uP[12].w * .55;
        vec3 cc = sunAt(9500., uP[36].rgb) * .5 * (.6 + 1.4 * pow(max(dot(d, SUN), 0.), 4.)) + uP[33].rgb * 1.2;
        cir = ca * exp(-tc / 90000.); cirC = cc;
      }
      // stars at night
      vec2 sc = vec2(az, d.y) * 650.;
      float hs = hash12(floor(sc));
      st = vec3(.85, .92, 1.) * step(.9965, hs) * max(1. - 2.2 * length(fract(sc) - .5), 0.) * (hs - .9965) * 70. * smoothstep(-.09, -.18, SEL) * smoothstep(0., .08, d.y) * (1. - .8 * step(1.5, uP[51].w));
    }
  }
  {
    // one skyCol call site: the sky itself, or the haze colour low in this direction
    gDisc = sky ? 1. : 0.;
    vec3 hz = skyCol(sky ? d : normalize(vec3(d.x, .025, d.z)));
    if (sky) col = mix(hz, cirC, cir) + st;
    float burn = 0.;
    vec3 em = fireFace(gFire.x, gFire.y, gFire.z, burn);
    col = mix(hz * (sky ? 1. : .92), col * (1. - .85 * burn) + em, gFog) + em * (1. - gFog) * gEmK;
  }
  if (md == 1) { oC = vec4(col, gFire.x < .01 && !gCand ? (tHit > uP[34].w ? 2. : 1.) : 0.); return; }
  }
  // alpha: the smoke volume goes over this pixel (the final pass lays it in; grass writes 0)
  oC = vec4(col * ENC, tHit > uP[34].w ? 1. : 0.);
}
`,za=gt+Zt+`
uniform sampler2D uL;
out vec4 oC;
void main() {
  float az = gl_FragCoord.x / 1024. * 6.2831853;
  az = az > 3.1415927 ? az - 6.2831853 : az;
  float r = uP[40].z + gl_FragCoord.y / 256. * uP[40].w;
  vec4 l = textureLod(uL, vec2(az / 6.2831853, .375), 0.);
  // a crest along the baked profile, concave slopes, spurs and gullies running downslope
  float x = r - l.g, lat = az * l.g, Hr = l.r + uP[31].x;
  float ax = abs(x) / (x < 0. ? 1500. : 1150.);
  float prof = .62 * exp(-ax * ax) + .38 / (1. + 3. * ax * ax);
  vec4 n = textureLod(uN2, vec2(lat / 4300., x / 9500. + .2), 0.);
  vec4 n2 = textureLod(uN2, vec2(lat / 1400., x / 2900. + .6), 0.);
  float sp = (n.r - .5) * .6 + (n2.g - .5) * .34;
  float hp = Hr * prof * (1. + sp * smoothstep(0., .45, ax));
  float m = smoothstep(2200., uP[50].w, r);
  oC = vec4(max(hp, 0.) * m / 2048., l.b * uP[22].w * smoothstep(40., 160., hp) * m / 64., 0., 1.);
}
`,Aa=gt+Zt+`
layout(location=0) in vec2 aV;
layout(location=1) in vec4 aI;
layout(location=2) in vec2 aO;
layout(location=3) in vec4 aN;
layout(location=4) in vec2 aM;
uniform mat4 uVP;
out vec3 vC;
void main() {
  float sd = aI.w, h = abs(aI.z);
  // the static noise of each stem (hill height terms, patches) is read once per stem on the CPU, not per vertex
  float r2 = dot(aI.xy, aI.xy);
  vec3 base = vec3(aI.x, -uP[31].x * (1. - exp(-r2 / uP[31].y)) + aN.x * r2 / (r2 + 9e4) + aN.y * smoothstep(6., 40., sqrt(r2)) - .04, aI.y);
  vec2 wd = uP[29].xy;
  float W = uP[29].z;
  float g = textureLod(uN2, (aI.xy - wd * TIME * 6.5) / 260., 0.).r;
  float g2 = textureLod(uN2, (aI.xy - wd * TIME * 10.) / 70. + .4, 0.).g;
  float bend = W * (.12 + 1.15 * smoothstep(.4, .78, g)) + .3 * W * (g2 - .5);
  float fa = sd * 43.98;
  vec2 b = wd * (bend + sin(TIME * (2.4 + 2.2 * fract(sd * 13.)) + sd * 20.) * .07 * W) * (.6 + .5 * fract(sd * 5.7)) + aO + vec2(cos(fa), sin(fa)) * .08;
  float bl = min(length(b), 1.35); vec2 bd = b / max(length(b), 1e-4);
  float s = aV.x;
  vec3 p1 = vec3(0., h * .55, 0.), p2 = vec3(bd.x * sin(bl) * h, cos(bl) * h, bd.y * sin(bl) * h);
  vec3 P = base + 2. * s * (1. - s) * p1 + s * s * p2;
  vec3 tg = normalize(2. * (1. - s) * p1 + 2. * s * (p2 - p1) + 1e-5);
  vec3 te = EYE - base; float dist = length(te);
  vec2 vp = normalize(vec2(-te.z, te.x) + 1e-5);
  vec2 rf = vec2(cos(fa * 1.3), sin(fa * 1.3)); rf *= sign(dot(rf, vp) + 1e-4);
  vec2 ww = normalize(mix(rf, vp, .55));
  vec3 Wd = vec3(ww.x, 0., ww.y);
  float w0 = .0025 + .005 * fract(sd * 31.);
  float prof = 1. - pow(s, 1.6);
  bool head = aI.z < 0.;
  if (head) prof = s > .78 ? 1. + 1.4 * sin((s - .78) / .22 * 3.1416) : prof * .65;
  float wid = max(w0, dist * uP[6].w * .75) * prof;
  P += Wd * aV.y * wid * .5;
  gl_Position = uVP * vec4(P, 1.);
  vec3 N = normalize(cross(Wd, tg)); vec3 V = normalize(EYE - P); N = dot(N, V) < 0. ? -N : N;
  N = normalize(N + vec3(0., .35, 0.));
  float pn = aN.z, pm = aN.w;
  float r1 = fract(sd * 3.7);
  vec3 tip = uP[21].rgb * (.8 + .45 * r1);
  tip = mix(tip, tip * vec3(.7, .78, .62), smoothstep(.5, .72, pn));
  tip = mix(tip, uP[21].rgb * vec3(1.1, .88, .7), smoothstep(.6, .8, pm) * .6);
  vec3 alb = mix(uP[21].rgb * vec3(.45, .4, .32), tip, smoothstep(0., .3, s));
  if (head && s > .76) alb = uP[21].rgb * vec3(1.45, 1.3, 1.08) * (.9 + .25 * r1);
  vec3 sl = sunAt(base.y, uP[36].rgb);
  float diff = max(dot(N, SUN), 0.) * .8 + .2;
  float tr = pow(max(dot(-V, SUN), 0.), 4.) * (.3 + .9 * s);
  float shd = .38 + .62 * smoothstep(.05, .8, s * (.75 + .5 * fract(sd * 5.3)) + (aM.x - .5) * .5);
  float pat = aM.y;
  shd *= .55 + .45 * smoothstep(.36, .56, pat + (fract(sd * 2.9) - .5) * .12);
  vec3 c = alb * (sl * (diff * .95 + tr * 2.6) * shd + uP[33].rgb * (.25 + .75 * s)) * (.75 + .45 * fract(sd * 9.7));
  c += alb * uP[24].rgb * uP[24].w * .001 * s;
  vec3 cav = uP[21].rgb * (sl * .62 * shd + uP[33].rgb * .8);
  vC = mix(c, cav, smoothstep(5., 19., dist) * .55);
}
`,Fa=gt+`
uniform vec4 uP[52];
in vec3 vC; out vec4 oC;
void main() { oC = vec4(vC * uP[23].w, 0.); }
`,Ma=gt+Zt+`
uniform sampler2D uS;
uniform sampler2D uC;
out vec4 oC;
// Catmull-Rom upsample (5 taps): keeps the cap's hard edges that a B-spline would soften
vec4 volAt(vec2 uv) {
  vec2 ts = vec2(uP[4].w), sp = uv * ts, tp = floor(sp - .5) + .5, f = sp - tp;
  vec2 w0 = f * (-.5 + f * (1. - .5 * f)), w1 = 1. + f * f * (-2.5 + 1.5 * f), w2 = f * (.5 + f * (2. - 1.5 * f)), w3 = f * f * (-.5 + .5 * f);
  vec2 w12 = w1 + w2, o12 = (tp + w2 / w12) / ts, t0 = (tp - 1.) / ts, t3 = (tp + 2.) / ts;
  vec4 r = textureLod(uC, vec2(o12.x, t0.y), 0.) * (w12.x * w0.y) + textureLod(uC, vec2(t0.x, o12.y), 0.) * (w0.x * w12.y) + textureLod(uC, o12, 0.) * (w12.x * w12.y)
    + textureLod(uC, vec2(t3.x, o12.y), 0.) * (w3.x * w12.y) + textureLod(uC, vec2(o12.x, t3.y), 0.) * (w12.x * w3.y);
  r /= w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y;
  // blended 2:1 with a B-spline (together a Mitchell filter: crisp without ringing stairs)
  vec2 b0 = (1. - f) * (1. - f) * (1. - f) / 6., b1 = (4. - 6. * f * f + 3. * f * f * f) / 6., b3 = f * f * f / 6., b2 = 1. - b0 - b1 - b3;
  vec2 s0 = b0 + b1, s1 = b2 + b3, q0 = (tp - .5 + b1 / s0) / ts, q1 = (tp + 1.5 + b3 / s1) / ts;
  vec4 rb = (textureLod(uC, vec2(q0.x, q0.y), 0.) * s0.x + textureLod(uC, vec2(q1.x, q0.y), 0.) * s1.x) * s0.y
          + (textureLod(uC, vec2(q0.x, q1.y), 0.) * s0.x + textureLod(uC, vec2(q1.x, q1.y), 0.) * s1.x) * s1.y;
  r = mix(rb, r, .667);
  vec4 o = vec4(max(r.rgb, vec3(0.)), clamp(r.a, 0., 1.));
  if (uP[5].w > uP[4].w) {
    // edge-aware upsample: where the four nearest texels jump from clear to cloud (the cap's hard edge, sharper than a
    // texel), the edge follows the smooth contour of the filtered alpha with the cloud side's and the clear side's own
    // colours, instead of a soft ramp over the texel staircase
    ivec2 i0 = max(ivec2(tp - .5), ivec2(0)), i1 = min(i0 + 1, ivec2(uP[4].w) - 1);
    vec4 c0 = texelFetch(uC, i0, 0), c1 = texelFetch(uC, ivec2(i1.x, i0.y), 0), c2 = texelFetch(uC, ivec2(i0.x, i1.y), 0), c3 = texelFetch(uC, i1, 0);
    vec4 a4 = vec4(c0.a, c1.a, c2.a, c3.a);
    float lo = min(min(a4.x, a4.y), min(a4.z, a4.w)), hi = max(max(a4.x, a4.y), max(a4.z, a4.w));
    float e = smoothstep(.35, .7, hi - lo);
    if (e > 0.) {
      vec4 wa = step(a4, vec4((lo + hi) * .5)), wb = 1. - wa;
      vec4 cA = (c0 * wa.x + c1 * wa.y + c2 * wa.z + c3 * wa.w) / dot(wa, vec4(1.));
      vec4 cB = (c0 * wb.x + c1 * wb.y + c2 * wb.z + c3 * wb.w) / dot(wb, vec4(1.));
      float k = clamp((o.a - cB.a) / min(cA.a - cB.a, -1e-3), 0., 1.);
      vec4 s = mix(cB, cA, smoothstep(.36, .64, k));
      o = mix(o, vec4(max(s.rgb, vec3(0.)), clamp(s.a, 0., 1.)), e);
    }
  }
  return o;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uP[5].w;
  vec4 s = texelFetch(uS, ivec2(gl_FragCoord.xy), 0);
  vec3 c = s.rgb / ENC;
  if (s.a > .5) { vec4 v = volAt(uv); c = c * v.a + v.rgb / ENC; }
  c *= uP[2].w;
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  c = pow(clamp(c, 0., 1.), vec3(1. / 2.2));
  c += (hash12(gl_FragCoord.xy + fract(uP[0].x * 7.13) * 400.) - .5) * (4. / 255.);
  oC = vec4(c, 1.);
}
`;function _a(e,t,x,o){const b=new Float32Array(t**o);for(let d=0;d<b.length;d++)b[d]=x();const s=new Int32Array(e),E=new Int32Array(e),v=new Float32Array(e);for(let d=0;d<e;d++){const F=d/e*t,M=Math.floor(F),P=F-M;s[d]=M%t,E[d]=(M+1)%t,v[d]=P*P*(3-2*P)}const N=new Float32Array(e**o);if(o===2)for(let d=0;d<e;d++){const F=s[d]*t,M=E[d]*t,P=v[d];for(let U=0;U<e;U++){const z=b[F+s[U]]+(b[F+E[U]]-b[F+s[U]])*v[U],y=b[M+s[U]]+(b[M+E[U]]-b[M+s[U]])*v[U];N[d*e+U]=z+(y-z)*P}}else{const d=new Float32Array(t*t*e);for(let F=0;F<t;F++)for(let M=0;M<t;M++){const P=(F*t+M)*t,U=(F*t+M)*e;for(let z=0;z<e;z++){const y=b[P+s[z]];d[U+z]=y+(b[P+E[z]]-y)*v[z]}}for(let F=0;F<e;F++){const M=s[F]*t,P=E[F]*t,U=v[F];for(let z=0;z<e;z++){const y=(M+s[z])*e,K=(M+E[z])*e,nt=(P+s[z])*e,Rt=(P+E[z])*e,ht=v[z],Vt=(F*e+z)*e;for(let W=0;W<e;W++){const vt=d[y+W]+(d[K+W]-d[y+W])*ht,It=d[nt+W]+(d[Rt+W]-d[nt+W])*ht;N[Vt+W]=vt+(It-vt)*U}}}}return N}function te(e,t,x,o,b){const s=new Float32Array(e**x);o.forEach((N,d)=>{const F=_a(e,N,t,x);for(let M=0;M<s.length;M++)s[M]+=F[M]*b[d]});let E=1e9,v=-1e9;for(const N of s)N<E&&(E=N),N>v&&(v=N);for(let N=0;N<s.length;N++)s[N]=(s[N]-E)/(v-E);return s}function Ye(e,t,x){const o=t*t*t,b=new Float32Array(o),s=new Float32Array(o),E=new Float32Array(o);for(let P=0;P<o;P++)b[P]=x(),s[P]=x(),E[P]=x();const v=new Float32Array(e*e*e),N=t/e,d=new Int32Array(e*3),F=new Float32Array(e);for(let P=0;P<e;P++){const U=(P+.5)*N,z=Math.floor(U);F[P]=U-z;for(let y=0;y<3;y++)d[P*3+y]=(z+y-1+t)%t}let M=0;for(let P=0;P<e;P++)for(let U=0;U<e;U++){const z=F[P],y=F[U];for(let K=0;K<e;K++){const nt=F[K];let Rt=9;for(let ht=0;ht<3;ht++){const Vt=d[P*3+ht]*t*t,W=ht-1-z;for(let vt=0;vt<3;vt++){const It=Vt+d[U*3+vt]*t,xt=vt-1-y;for(let X=0;X<3;X++){const Bt=It+d[K*3+X],Dt=X-1-nt+b[Bt],bt=xt+s[Bt],Nt=W+E[Bt],mt=Dt*Dt+bt*bt+Nt*Nt;mt<Rt&&(Rt=mt)}}}v[M++]=1-Math.min(Math.sqrt(Rt),1)}}return v}const Qe=new Float32Array(1),ka=new Uint32Array(Qe.buffer);function ye(e){Qe[0]=e;const t=ka[0],x=t>>>16&32768,o=(t>>>23&255)-112,b=t&8388607;return o<=0?x:o>=31?x|31743:x|o<<10|b>>>13}function Da(e,t){if(e.__c531)return e.__c531;e.getExtension("KHR_parallel_shader_compile");const x=(n,u)=>{const C=e.createShader(n);return e.shaderSource(C,u),e.compileShader(C),C},o={vol:[ce,Ea],comp:[wa,Ra],fin:[ce,Ma],grass:[Aa,Fa],mar:[ce,ga],rb:[ce,za],copy:[ce,Ta]},b={};for(const n in o){const u=e.createProgram(),C=x(e.VERTEX_SHADER,o[n][0]),g=x(e.FRAGMENT_SHADER,o[n][1]);e.attachShader(u,C),e.attachShader(u,g),e.linkProgram(u),b[n]={p:u,v:C,f:g}}e.flush();let s=99538225;const E=()=>{s=s+1831565813|0;let n=Math.imul(s^s>>>15,1|s);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296},v=32,N=[te(v,E,3,[2,4,8],[.55,.3,.15]),te(v,E,3,[2,4,8],[.55,.3,.15]),te(v,E,3,[4,8,16],[.5,.32,.18])],d=Ye(v,4,E),F=Ye(v,8,E),M=new Float32Array(v**3);let P=1e9,U=-1e9;for(let n=0;n<M.length;n++){const u=d[n]*.62+F[n]*.38;M[n]=u,u<P&&(P=u),u>U&&(U=u)}const z=new Uint8Array(v**3*4);for(let n=0;n<M.length;n++)z[n*4]=N[0][n]*255,z[n*4+1]=N[1][n]*255,z[n*4+2]=N[2][n]*255,z[n*4+3]=(M[n]-P)/(U-P)*255;const y=256,K=[te(y,E,2,[4,8,16,32,64],[.42,.26,.16,.1,.06]),te(y,E,2,[8,16,32,64],[.45,.28,.17,.1]),te(y,E,2,[16,32,64,128],[.45,.28,.17,.1])],nt=new Uint8Array(y*y*4);for(let n=0;n<y*y;n++)nt[n*4]=K[0][n]*255,nt[n*4+1]=K[1][n]*255,nt[n*4+2]=K[2][n]*255,nt[n*4+3]=E()*255;e.pixelStorei(e.UNPACK_ALIGNMENT,1);const Rt=e.createTexture();e.bindTexture(e.TEXTURE_3D,Rt),e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,v,v,v,0,e.RGBA,e.UNSIGNED_BYTE,z),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const n of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,n,e.REPEAT);const ht=e.createTexture();e.bindTexture(e.TEXTURE_2D,ht),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,y,y,0,e.RGBA,e.UNSIGNED_BYTE,nt),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.pixelStorei(e.UNPACK_ALIGNMENT,4);const Vt=e.createVertexArray(),W=4,vt=[];for(let n=0;n<=W;n++)vt.push(n/W,-1,n/W,1);const It=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,It),e.bufferData(e.ARRAY_BUFFER,new Float32Array(vt),e.STATIC_DRAW);const xt=(n,u,C)=>{const g=u*y-.5,T=C*y-.5,R=Math.floor(g),k=Math.floor(T),J=g-R,dt=T-k,S=(zt,At)=>nt[((At%y+y)%y*y+(zt%y+y)%y)*4+n]/255;return(S(R,k)*(1-J)+S(R+1,k)*J)*(1-dt)+(S(R,k+1)*(1-J)+S(R+1,k+1)*J)*dt},X={gs:39509,i:0,a:new Float32Array(0),t:null},Bt=n=>{if(X.i>=n)return;const u=new Float32Array(n*12);u.set(X.a.subarray(0,X.i*12)),X.a=u;let C=X.gs,g=X.i,T=X.t;const R=()=>{C=C+1831565813|0;let k=Math.imul(C^C>>>15,1|C);return k=k+Math.imul(k^k>>>7,61|k)^k,((k^k>>>14)>>>0)/4294967296};for(;g<n;){if(!T||T.k>=T.m){const Z=.5+19*Math.pow(R(),.82),it=R()*6.2832,_=Math.sin(it)*Z,tt=Math.cos(it)*Z,j=.35+.75*R()*R()+(R()<.12?.35:0),G=.05+.14*R(),et=6+Math.floor(R()*18),O=R();T={cx:_,cz:tt,tall:j,cr:G,m:et,heady:O,k:0}}const{cx:k,cz:J,tall:dt,cr:S,m:zt,heady:At}=T;for(;T.k<zt&&g<n;T.k++,g++){const Z=Math.sqrt(R())*S,it=R()*6.2832,_=Math.sin(it)*Z,tt=Math.cos(it)*Z,j=.08+1.6*Z/S*(.25+.3*R());u[g*12]=k+_,u[g*12+1]=J+tt,u[g*12+2]=dt*(.55+.5*R())*(1-.35*Z/S)*(R()<At*.75+.14?-1:1),u[g*12+3]=R(),u[g*12+4]=Math.sin(it)*j,u[g*12+5]=Math.cos(it)*j;const G=k+_,et=J+tt;u[g*12+6]=(xt(0,G/2600+.37,et/2600+.37)-.5)*110+(xt(1,G/420+.11,et/420+.11)-.5)*16,u[g*12+7]=(xt(2,G/37+.53,et/37+.53)-.5)*.9,u[g*12+8]=xt(0,G*.021,et*.021),u[g*12+9]=xt(2,G*.07+.3,et*.07+.3),u[g*12+10]=xt(3,G*.11+.7,et*.11+.7),u[g*12+11]=xt(1,G/70+.21,et/70+.21)}}X.gs=C,X.i=g,X.t=T},Dt=n=>{Bt(n);const u=X.a,C=36,g=[0,3,8,20.5],T=3*C,R=new Uint16Array(n),k=new Uint32Array(T+1);for(let _=0;_<n;_++){const tt=u[_*12],j=u[_*12+1],G=Math.hypot(tt,j),et=G<3?0:G<8?1:2;let O=Math.atan2(tt,j);O<0&&(O+=6.2831853);const qt=et*C+Math.min(C-1,Math.floor(O/6.2831853*C));R[_]=qt,k[qt+1]++}for(let _=0;_<T;_++)k[_+1]+=k[_];const J=k.slice(0,T),dt=new Float32Array(n*12),S=J.slice();for(let _=0;_<n;_++){const tt=S[R[_]]++;dt.set(u.subarray(_*12,_*12+12),tt*12)}const zt=new Float32Array(T*36),At=6.2831853/C;for(let _=0;_<T;_++){const tt=Math.floor(_/C),j=_%C,G=g[tt],et=g[tt+1]/Math.cos(At/2);let O=_*36;for(const qt of[j*At,(j+.5)*At,(j+1)*At])for(const le of[G,et])for(const Xt of[-1,.6])zt[O++]=Math.sin(qt)*le,zt[O++]=Xt,zt[O++]=Math.cos(qt)*le}const Z=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Z),e.bufferData(e.ARRAY_BUFFER,dt,e.STATIC_DRAW);const it=e.createVertexArray();return e.bindVertexArray(it),e.bindBuffer(e.ARRAY_BUFFER,It),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0),e.bindBuffer(e.ARRAY_BUFFER,Z),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,48,0),e.vertexAttribDivisor(1,1),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,2,e.FLOAT,!1,48,16),e.vertexAttribDivisor(2,1),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,4,e.FLOAT,!1,48,24),e.vertexAttribDivisor(3,1),e.enableVertexAttribArray(4),e.vertexAttribPointer(4,2,e.FLOAT,!1,48,40),e.vertexAttribDivisor(4,1),e.bindVertexArray(null),n===62e3&&bt[18e3]||n===18e3&&bt[62e3]?X.a=null:n===62e3&&(X.a=X.a.slice(0,18e3*12)),{v:it,n,b:Z,st:J,cnt:k.slice(1),pts:zt,NC:T}},bt={},Nt=t<=256?18e3:62e3;bt[Nt]=Dt(Nt);const mt=()=>{if(!ae.linked){ae.linked=!0;for(const n in b){const{p:u,v:C,f:g}=b[n];if(!e.getProgramParameter(u,e.LINK_STATUS))throw new Error("531 "+n+": "+(e.getShaderInfoLog(C)||"")+(e.getShaderInfoLog(g)||"")+e.getProgramInfoLog(u));const T=R=>e.getUniformLocation(u,R);b[n]={p:u,uP:T("uP"),uVP:T("uVP"),uN2:T("uN2"),uN3:T("uN3"),uC:T("uC"),uL:T("uL"),uS:T("uS"),uR:T("uR"),uT:T("uT"),uQ:T("uQ")}}}},st=!!e.getExtension("EXT_color_buffer_float"),je=!!(st||e.getExtension("EXT_color_buffer_half_float")),ae={link:mt,P:b,n3:Rt,n2:ht,vEmpty:Vt,bladeVerts:(W+1)*2,half:je,f32:st,grass:bt,mkGrass:Dt};return e.__c531=ae}function ee(e,t,x,o,b=x,s=!1,E=!1,v=!1){const N=e.createTexture();e.bindTexture(e.TEXTURE_2D,N),v&&t.f32?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,x,b,0,e.RGBA,e.FLOAT,null):v?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,x,b,0,e.RGBA,e.HALF_FLOAT,null):E?e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,x,b,0,e.RGBA,e.UNSIGNED_BYTE,null):t.half&&s?e.texImage2D(e.TEXTURE_2D,0,e.RG16F,x,b,0,e.RG,e.HALF_FLOAT,null):t.half?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,x,b,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,s?e.RGBA8:e.SRGB8_ALPHA8,x,b,0,e.RGBA,e.UNSIGNED_BYTE,null);const d=E||v?e.NEAREST:e.LINEAR;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,d),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,d),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const F=e.createFramebuffer();if(e.bindFramebuffer(e.FRAMEBUFFER,F),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,N,0),o){const M=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,M),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,x,b),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,M)}return e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:N,fb:F,w:x}}Ke.add({num:531,name:"Fire Cloud",fam:"Vistas",recipe:"Watching from a grassy hill as a wildfire burns along a forested ridge a few kilometres away, drawing its smoke into one tall column that blooms into a big white cap. The size of the fire, the hour and the wind change every mint. The fire flares up on its own, and you can tap the ridge for a gust that thickens the smoke, drag sideways to swing the wind and lean the plume, or hold to let dusk fall.",interactive:"The fire flares in runs along the ridge on its own. Tap the ridge for a gust there: the flames brighten and lean, and the smoke thickens up the column a few seconds later. Drag sideways to shift the wind and watch the plume lean over, the top last. Hold to let dusk fall until last light: the sun sinks, the fire glows under the darkening column; let go and the light slowly returns.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,x=e.size,o=Da(t,x);let b=0;for(let a=2;a<66;a+=8)b=Math.imul(b^parseInt(e.hash.slice(a,a+8),16),2654435761)+2135587861|0;const s=()=>{b=b+1831565813|0;let a=Math.imul(b^b>>>15,1|b);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},E=a=>{let r=s(),i=0;for(const[c,f]of a)if(i+=f,r<i)return c;return a[a.length-1][0]},v=e.home;let N=v?"Pyrocumulus":E([["Pyrocumulus",.6],["Smoke plume, no cap",.27],["Pyrocumulonimbus with lightning",.13]]),d=v?"Golden evening":E([["Golden evening",.58],["Dusk",.32],["Last light, fire glowing",.1]]);const F=v?"Strong lean":E(d==="Last light, fire glowing"?[["Strong lean",.55],["Moderate",.45]]:[["Strong lean",.42],["Moderate",.38],["Calm, straight up",.2]]),M=v?"Clear upwind":E([["Clear upwind",.65],["Smoky everywhere",.35]]);let P=d==="Last light, fire glowing"?"Afterglow":v?"Side-lit":E([["Side-lit",.62],["Backlit, red sun in the smoke",.38]]);const U=v?"California oak and chaparral":E([["California oak and chaparral",.4],["Australian eucalypt",.32],["Canadian spruce",.28]]);let z=v?"None":E([["None",.85],["Second fire on a far ridge",.15]]),y=739982445;for(let a=2;a<66;a+=8)y=Math.imul(y^parseInt(e.hash.slice(a,a+8),16),3266489909)+374761393|0;const K=()=>{y=y+1831565813|0;let a=Math.imul(y^y>>>15,1|y);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},nt=K(),Rt=K(),ht=K(),Vt=K(),W=K(),vt=K(),It=K(),xt=K();N.startsWith("Pyrocumulonimbus")&&nt>.3&&(N="Pyrocumulus"),z!=="None"&&Rt>.34&&(z="None");const X=d==="Last light, fire glowing",Bt=!v&&!X&&ht<.245,Dt=X&&Vt<.3;Bt&&(d="Afternoon",P.startsWith("Backlit")&&(P="Backlit, sun high in the haze")),Dt&&(d="Night",P="Firelight only");const bt=M==="Smoky everywhere",Nt=bt?"Lost in the smoke":v||W<.66?"Clear":W<.88?"Smoke overhead":"High cloud";e.trait("Fire",N),e.trait("Hour",d),e.trait("Wind",F),e.trait("Haze",M),e.trait("Light",P),e.trait("Country",U),e.trait("Second fire",z),e.trait("Sky",Nt);let mt=1540483477;for(let a=2;a<66;a+=8)mt=Math.imul(mt^parseInt(e.hash.slice(a,a+8),16),2246822519)+668265263|0;const st=()=>{mt=mt+1831565813|0;let a=Math.imul(mt^mt>>>15,1|mt);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},ae=v?"From the hill":(a=>{let r=st(),i=0;for(const[c,f]of a)if(i+=f,r<i)return c;return a[a.length-1][0]})([["From the hill",.65],["Under the column",.35]]);e.trait("View",ae);const n=ae==="Under the column",u=N==="Pyrocumulus"?0:N==="Smoke plume, no cap"?1:2,C=X,g=bt,T=Nt==="Smoke overhead"?1:Nt==="High cloud"?2:0,R=U.startsWith("California")?0:U.startsWith("Australian")?1:2,k=v?1:s()<.5?-1:1,J=[430,360,300][R]+80*s(),dt=1300+300*s(),S=-k*(.15+.07*s()),zt=7200+700*s(),At=n?4900+500*st():zt,Z=n?[2200,7500,3e3]:[3e3,9500,3800],it=P.startsWith("Backlit"),_=1024,tt=(a,r)=>{const i=[];for(let c=1;c<=a;c++)i.push([c,Math.pow(c,-r)*(s()-.5)*2,s()*6.2832]);return i},j=(a,r)=>{let i=0;for(let c=0;c<a.length;c++){const f=a[c];i+=f[1]*Math.sin(f[0]*r+f[2])}return i},G=a=>{for(;a>Math.PI;)a-=2*Math.PI;for(;a<-Math.PI;)a+=2*Math.PI;return a},et=[11500,At,16500+3e3*s(),36e3+8e3*s()],O=[[-60,260,1.05],[-150,260,1.15],[120,560,1],[450,1300,.85]];R===1&&(O[2][1]=380,O[3][1]=700),R===2&&(O[2][1]=420,O[3][0]=650,O[3][1]=1700);const qt=[0,1,2,3].map(a=>tt(a===3?48:36,O[a][2])),le=[0,1,2,3].map(()=>tt(5,1.2)),Xt=S+k*(.45+.3*s()),Na=[[.6,.7,.45,.25],[.8,.9,.7,.4],[.9,1,.85,.6]][R],_e=(a,r)=>{let i=O[a][0]+O[a][1]*j(qt[a],r)*1.3;return a===3&&(i=O[a][0]+O[a][1]*Math.pow(Math.abs(j(qt[a],r))*1.2+.1,.8)),a===1&&(i+=520*Math.exp(-Math.pow(G(r-S)/.55,2))+200*Math.exp(-Math.pow(G(r-S+k*.5)/.5,2))),a===2&&z!=="None"&&(i+=350*Math.exp(-Math.pow(G(r-Xt)/.2,2))),a===0&&(i-=120*Math.exp(-Math.pow(G(r-S)/.5,2))),a===1&&(i=Math.max(i,-J+180)),a===2&&(i=Math.max(i,-J+120)),i},ke=(a,r)=>et[a]*(1+[.12,.08,.1,.08][a]*j(le[a],r)-(a===1?.08*j(le[1],S):0)),Ot=o.lays||(o.lays=new Map);let oe=Ot.get(e.hash);if(oe)Ot.delete(e.hash),Ot.set(e.hash,oe);else{const a=new Uint16Array(_*4*4);let r=-1e4;for(let i=0;i<4;i++){const c=ye(Na[i]),f=ye([110,0,160,260][i]);for(let l=0;l<_;l++){const h=l/_*6.2832,D=(i*_+l)*4,I=_e(i,h);i===1&&(r=Math.max(r,I)),a[D]=ye(I),a[D+1]=ye(ke(i,h)),a[D+2]=c,a[D+3]=f}}oe={lay:a,maxH:r},Ot.set(e.hash,oe),Ot.size>12&&Ot.delete(Ot.keys().next().value)}const Ua=oe.lay,Ut=Math.min(560,x),L={lay:t.createTexture(),rid:ee(t,o,1024,!1,256,!0),rtH:ee(t,o,Ut,!1,Ut/2),rtC:ee(t,o,Ut,!1,Ut),tm:ee(t,o,x,!1,x,!1,!0),tmK:null,q:null,qK:null,qOK:!1};o.half&&(L.q=ee(t,o,x,!1,x,!1,!1,!0)),t.bindTexture(t.TEXTURE_2D,L.lay),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,_,4,0,t.RGBA,t.HALF_FLOAT,Ua),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const La=oe.maxH+[14,24,20][R]*1.2+90,yt=ke(1,S),Ca=_e(1,S),V=[Math.sin(S)*yt*.985,Ca-260,Math.cos(S)*yt*.985],$e=[Math.cos(S),-Math.sin(S)],De=(1e3+500*s())/yt;let Kt=S-De*(1+.3*s()),re=S+De*(1+.3*s());const Sa=u===2?1.25:u===1?.8:1,Ia=(400+100*s())*Sa*.72,Ht=u===1?4300:(u===2?3e3:3300)+400*s(),fe=u===2?1600+250*s():1900+400*s(),Pe=u===2?1700:1450+300*s(),Ba=(u===2?[[-.1,.35,0,.58],[.4,.35,.25,.5],[.8,.45,-.1,.42],[.1,1.3,0,.4],[0,.85,.05,.5],[.35,.95,-.25,.42],[-.2,1,.15,.4],[.25,1.6,.1,.36]]:[[-.1,.35,0,.6],[.35,.3,.25,.46],[.75,.2,-.1,.36],[1.05,.05,.15,.22],[.05,.95,.05,.5],[.45,.8,-.25,.3],[.1,1.42,.1,.32],[-.3,.72,.2,.2]]).map(a=>[a[0]+(s()-.5)*.16,a[1]+(s()-.5)*.1,(a[2]+(s()-.5)*.2)*(s()<.5?-1:1),a[3]*(.9+.2*s())]),qa=s()*10,we=z!=="None",Je=ke(2,Xt),Wt=[Math.sin(Xt)*Je*.985,_e(2,Xt)-150,Math.cos(Xt)*Je*.985],Ne=F==="Strong lean"?.58+.1*s():F==="Moderate"?.32+.08*s():.05+.03*s(),Xa=(s()-.5)*.5;let ue=[k*Ne,Xa*Ne],ct=ue.slice(),Ft=ue.slice();const Ze=it?k*(.22+.1*s()):k*(1.2+.35*s()),Ha=C?-(3+1.5*s()):d==="Dusk"?.4+.6*s():2+1.6*s(),ta=(Dt?-14:Bt?it?17+7*xt:27+14*xt:Ha)*Math.PI/180,Gt={lo:[.3,.235,.175],hi:[.5,.44,.37]};R===1&&(Gt.lo=[.34,.24,.16],Gt.hi=[.53,.44,.35]),bt&&(Gt.lo=Gt.lo.map(a=>a*.7),Gt.hi=Gt.hi.map(a=>a*.8));const Ga=[[.62,.47,.24],[.72,.62,.4],[.46,.42,.24]][R],Va=[[.05,.055,.035],[.07,.072,.05],[.025,.038,.028]][R],Oa=[14,24,20][R],Ka=[[.36,.29,.2],[.5,.27,.15],[.3,.27,.22]][R],Ue=u===1?2600:Ht-1300,Le=u===1?1200:950,ea=(11e-5+14e-5*Ne)*(g?1.4:1),Wa=g?[.032,.075,.17]:[.024,.06,.14],Ya=g?14e3:48e3,Ee=x<=256?18e3:62e3;o.grass[Ee]||(o.grass[Ee]=o.mkGrass(Ee));const Mt=o.grass[Ee],aa=L.rtH,oa=L.rtC,Ce=ee(t,o,x,!0),Qa=o.half?1:.25;let Se=0,ra=0,Ie=!1;const w=new Float32Array(52*4),sa=new Float32Array(16),na=v?0:(It-.5)*.5,ja=n?S+k*(.1+.06*st())+na*.6:na,$a=n?.47+.03*st():.33,lt=Math.tan(34*Math.PI/180),q={eye:[0,1.6,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]};let _t=0,se=0,H=null,Be=!1;const pt=[],Lt=[];let Ct=null,ia=2+6*s(),Te=0,qe=0,Yt=0,ft=0;const he=[];pt.push({az:S+(st()-.5)*1.2*De,age:5,s:.75});let ca=5+12*st();const Ja=(a,r)=>-J*(1-Math.exp(-(a*a+r*r)/(dt*dt))),la=()=>{const a=e.view||Pa,r=ja+(a.yaw||0),i=Jt($a+(a.pitch||0),-1.35,1.45);let c=a.x||0,f=a.z||0;const l=Math.hypot(c,f);l>8&&(c*=8/l,f*=8/l),q.eye=[c,Ja(c,f)+Jt(1.6+(a.y||0),.6,3),f];const h=Math.cos(i);q.fw=[Math.sin(r)*h,Math.sin(i),Math.cos(r)*h],q.rt=[Math.cos(r),0,-Math.sin(r)];const D=q.fw,I=q.rt;q.up=[D[1]*I[2]-D[2]*I[1],D[2]*I[0]-D[0]*I[2],D[0]*I[1]-D[1]*I[0]];const Pt=.05,Y=2e3,at=(Y+Pt)/(Y-Pt),ot=-2*Y*Pt/(Y-Pt),wt=q.eye,rt=q.up,Et=Q=>Q[0]*wt[0]+Q[1]*wt[1]+Q[2]*wt[2],$=[[I[0]/lt,I[1]/lt,I[2]/lt,-Et(I)/lt],[rt[0]/lt,rt[1]/lt,rt[2]/lt,-Et(rt)/lt],[D[0]*at,D[1]*at,D[2]*at,-Et(D)*at+ot],[D[0],D[1],D[2],-Et(D)]];for(let Q=0;Q<4;Q++)for(let Tt=0;Tt<4;Tt++)sa[Tt*4+Q]=$[Q][Tt]},Za=(a,r)=>{const i=a*2-1,c=1-r*2,f=[0,1,2].map(h=>q.fw[h]+(i*q.rt[h]+c*q.up[h])*lt),l=Math.hypot(f[0],f[1],f[2]);return f.map(h=>h/l)},to=(a,r)=>{const i=Za(a,r);let c=Math.atan2(i[0],i[2]);if(Math.abs(G(c-S))>.7)return;c=Jt(c,Kt-.08,re+.08),pt.length>=3&&pt.shift(),pt.push({az:c,age:0,s:1});const f=Math.exp(-Math.pow(G(c-S)*yt/1800,2));Lt.length>=3&&Lt.shift(),Lt.push({h:-700,s:.3+.3*f,v:120+40*f}),ft=Math.min(1.5,ft+.5+.5*f),e.sound.hit("kick",.35),e.sound.hit("noise",.35,{cutoff:300,dur:2.4})},eo=a=>{const r=e.input;if(r.down&&r.inside!==!1){H||(H={x0:r.x,y0:r.y,lx:r.x,ly:r.y,t:0,moved:0}),H.t+=a;const f=r.x-H.lx;H.moved=Math.max(H.moved,Math.hypot(r.x-H.x0,r.y-H.y0)),H.moved>.025&&(ue[0]=Jt(ue[0]+f*1.5,-.75,.75),Math.abs(f)>.002&&e.sound.hit("noise",Math.min(.12,Math.abs(f)*4),{cutoff:500+2e3*Math.abs(f)*10,dur:.5})),H.moved<.025&&H.t>.35&&(se=Math.min(1,se+a*.09)),H.lx=r.x,H.ly=r.y}else H&&(Be=H.t>.3||H.moved>.025,H=null);const i=r.taps(),c=H&&(H.t>.3||H.moved>.025);if(i.length&&!Be&&!c)for(const f of i.slice(-2))to(f.x,f.y);i.length&&(Be=!1)},p=(a,r,i,c,f)=>{w[a*4]=r,w[a*4+1]=i,w[a*4+2]=c,w[a*4+3]=f},Qt=[[32,[.15,.29,.58],[.62,.68,.76],[.5,.58,.7],[.2,.24,.33],.5],[16,[.12,.25,.54],[.8,.72,.62],[.45,.52,.66],[.16,.19,.28],.62],[8,[.075,.17,.42],[1,.66,.38],[.36,.46,.64],[.1,.13,.22],1],[4,[.06,.13,.36],[1.15,.58,.26],[.3,.37,.54],[.07,.09,.16],.9],[1,[.045,.09,.26],[1.05,.4,.15],[.24,.27,.42],[.05,.06,.11],1.05],[-2,[.014,.025,.075],[.6,.2,.08],[.1,.1,.19],[.03,.035,.07],1.5],[-5,[.004,.008,.026],[.16,.06,.03],[.03,.03,.065],[.012,.014,.03],1.9],[-12,[.0015,.003,.009],[.008,.005,.005],[.003,.004,.008],[.0012,.0015,.003],3.2]],ao=a=>{if(a>=Qt[0][0])return Qt[0];for(let r=0;r<Qt.length-1;r++){const i=Qt[r],c=Qt[r+1];if(a>=c[0]){const f=(i[0]-a)/(i[0]-c[0]);return[a,be(i[1],c[1],f),be(i[2],c[2],f),be(i[3],c[3],f),be(i[4],c[4],f),i[5]+(c[5]-i[5])*f]}}return Qt[Qt.length-1]},oo=(a,r)=>{const i=St(0,6e3,a),c=ct[0]+(Ft[0]-ct[0])*i,f=ct[1]+(Ft[1]-ct[1])*i,l=1800*(1-Math.exp(-a/1800))+.25*a;return r[0]=c*l,r[1]=f*l,r},ro=(a,r,i,c)=>{const f=a-V[0],l=i-V[2],h=f*c[0]+l*c[1],D=-f*c[1]+l*c[0],I=Math.max(h,0),Pt=700+.18*I,Y=(r-Ue-.04*I)/(Le*(1+I/22e3));return Math.exp(-Y*Y-D*D/(Pt*Pt))*St(-1800,3e3,h)*Math.exp(-I/4e4)},fa=(a,r,i)=>{let c=0;for(let f=0;f<48;f++){const l=300+f*1e3;c+=ro(a[0]+r[0]*l,a[1]+r[1]*l,a[2]+r[2]*l,i)*1e3}return c*ea*.55},Xe=[0,0],ua=()=>{const a=ta-se*Math.max(ta+4.2*Math.PI/180,0),r=a*180/Math.PI,i=[Math.sin(Ze)*Math.cos(a),Math.sin(a),Math.cos(Ze)*Math.cos(a)],c=ao(r).slice(),f=(m,A,ut,jt)=>{const $t=m[0]*.3+m[1]*.55+m[2]*.15;return m.map((kt,uo)=>(kt+($t*A[uo]-kt)*ut)*jt)};g?(c[1]=f(c[1],[1.55,.98,.5],.9,.85),c[2]=f(c[2],[1.4,.9,.5],.7,1),c[3]=f(c[3],[1.4,.95,.55],.8,.9),c[4]=f(c[4],[1.35,.95,.6],.8,.8)):T===1?c[4]=f(c[4],[1.3,.95,.65],.6,.75):T===2&&(c[4]=f(c[4],[1,1,1],.4,1.35));const l=Math.hypot(Ft[0],Ft[1]),h=l>.001?[Ft[0]/l,Ft[1]/l]:[k,0],D=St(.02,.3,l),I=fa([V[0],V[1]+(u===1?2500:Ht+300),V[2]],i,h),Pt=fa(q.eye,i,h),Y=[3,2.75,2.5],at=m=>[Math.exp(-m*.55),Math.exp(-m),Math.exp(-m*1.7)],ot=g?1.5:T===2?.3:0,wt=at(ot),rt=T===2?.6:1,Et=at(g?2.1:ot),$=at(I).map((m,A)=>m*Et[A]),Q=at(Pt).map((m,A)=>m*wt[A]*rt),Tt=Wa,me=1/(Math.max(a,0)+.03),Ve=Tt.map(m=>Math.exp(-m*me)),ge=Y.map((m,A)=>m*Ve[A]*Q[A]/rt*(T===2?.5:1)*St(-.012,.006,a)),no=(C?.9:1)*(1+.5*ft);p(0,_t,se,1-St(-6,4,r),.075*(1+.25*ft)),p(1,i[0],i[1],i[2],a),p(2,Y[0]*$[0],Y[1]*$[1],Y[2]*$[2],c[5]*(C?1.1:1)),p(3,q.eye[0],q.eye[1],q.eye[2],lt),p(4,...q.fw,Ut),p(5,...q.rt,x),p(6,...q.up,2*lt/x),p(7,V[0],V[1],V[2],Ia),p(8,ct[0],ct[1],Ft[0],Ft[1]);const de=St(.05,.45,l),ne=fe*(1+.18*Yt),da=Pe*(1+.3*Yt),pa=u===2?.7+.2*de:.45+.45*de,io=.95+.2*de,co=u===2?.86+.14*de:.98+.08*de;oo(Ht,Xe);const ie=[V[0]+Xe[0],V[1]+Ht,V[2]+Xe[1]];p(9,ie[0],ie[1],ie[2],fe),p(10,...c[1],Pe);const B=[1e9,-1e9,1e9,-1e9,1e9,-1e9],lo=(m,A,ut,jt,$t,kt)=>{B[0]=Math.min(B[0],m-jt),B[1]=Math.max(B[1],m+jt),B[2]=Math.min(B[2],A-$t),B[3]=Math.max(B[3],A+$t),B[4]=Math.min(B[4],ut-kt),B[5]=Math.max(B[5],ut+kt)};for(let m=0;m<8;m++){const A=Ba[m],ut=A[0]*ne*pa,jt=A[1]*da,$t=A[2]*ne*io,kt=A[3]*ne*co;p(41+m,ut,jt,$t,kt),lo(ut,jt,$t,kt,kt,kt)}if(u===2){const m=1.3*da,A=.8*ne*pa,ut=1.5;p(49,m,A,ut,1),B[1]+=A+ut*.9*ne,B[0]-=.3*ne}else p(49,0,0,0,0);const Oe=.3*fe+80;p(40,qa,0,Z[0],Z[1]),p(50,(B[0]+B[1])/2,(B[2]+B[3])/2,(B[4]+B[5])/2,Z[2]),p(51,(B[1]-B[0])/2+Oe,(B[3]-B[2])/2+Oe,(B[5]-B[4])/2+Oe,T);const pe=[ie[0]+h[0]*w[200]-h[1]*w[202],ie[1]+w[201],ie[2]+h[1]*w[200]+h[0]*w[202]],Re=Math.max(w[204],w[206]);p(11,...c[2],(g?.55:.35)*D+(g?.25:0)),p(12,...c[3],T===0?.55:T===1?.3:0),p(13,...Gt.lo,.03*(u===1?.85:1)),p(14,...Gt.hi,.03);for(let m=0;m<3;m++){const A=pt[m];A?p(15+m,A.az,A.s*2.2*St(0,2.2,A.age)*Math.exp(-A.age/22),150+A.age*30,0):p(15+m,0,0,1,0)}let va=0,ze=[0,-1e5,0];if(Ct){const m=_t-Ct.t0;va=m<0?0:(1-Math.exp(-m/.06))*Math.exp(-m/.3)*Ct.I,ze=Ct.p,m>1.6&&(Ct=null)}p(18,ze[0],ze[1],ze[2],va),p(19,Wt[0],Wt[1],Wt[2],we?230:0),p(20,...ge,La),p(21,...Ga,R),p(22,...Va,Oa),p(23,Se,(ra>>1)*.618034%1,x<=256?48:80,Qa),p(24,2.6,.5,.05,no*(Dt?.8:1));for(let m=0;m<3;m++){const A=Lt[m];A?p(25+m,A.h,A.s*St(-300,300,A.h)*Math.exp(-Math.max(A.h-Ht,0)/1500),0,0):p(25+m,-1e5,0,0,0)}p(28,$e[0],$e[1],Kt,re),p(29,h[0],h[1],.35+1.1*Math.min(Math.hypot(ct[0],ct[1])/.45,1.3),(u===1?.8:1)*(1+.6*ft)),p(30,...Tt,u),p(31,J,dt*dt,Ya,Yt),p(32,Ue,Le,ea*(.35+.65*D),w[32*4+3]||-1),p(33,...c[4],g?1:0);const ve=42e3*D+4e3,Ae=2.6*(700+.18*ve),Fe=[V[0]-3800,V[0]+3800,pe[0]-Re,pe[0]+Re,V[0]+h[0]*ve-Ae,V[0]+h[0]*ve+Ae],Me=[V[2]-3800,V[2]+3800,pe[2]-Re,pe[2]+Re,V[2]+h[1]*ve-Ae,V[2]+h[1]*ve+Ae];we&&(Fe.push(Wt[0]-2500,Wt[0]+2500),Me.push(Wt[2]-2500,Wt[2]+2500));for(const m of[Kt,re]){const A=Math.sin(m)*yt,ut=Math.cos(m)*yt;Fe.push(A-1500,A+1500),Me.push(ut-1500,ut+1500)}const fo=u===1?V[1]+6200:pe[1]+w[205];p(34,Math.min(...Fe),V[1]-600,Math.min(...Me),4800),p(35,Math.max(...Fe),Math.max(fo,Ue+3*Le+2200),Math.max(...Me),yt),p(36,Y[0]*Q[0],Y[1]*Q[1],Y[2]*Q[2],S);const ba=[Math.sin(Kt)*yt,Math.cos(Kt)*yt],ya=[Math.sin(re)*yt,Math.cos(re)*yt];p(37,ba[0],ba[1],ya[0],ya[1]),p(38,Xt,we?1:0,2800,we?2:1),p(39,...Ka,1)},He=a=>{w[23*4]=Se,w[23*4+1]=(ra++>>1)*.618034%1,w[32*4+3]=a?1:-1,t.bindFramebuffer(t.FRAMEBUFFER,aa.fb),t.viewport(0,0,Ut,Ut/2),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.depthMask(!0),t.useProgram(o.P.vol.p),t.uniform4fv(o.P.vol.uP,w),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.vol.uN2,0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_3D,o.n3),t.uniform1i(o.P.vol.uN3,1),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,L.lay),t.uniform1i(o.P.vol.uL,5),t.bindVertexArray(o.vEmpty),t.drawArrays(t.TRIANGLES,0,3),ha=a,Se^=1};let ha=!1;const xa=()=>{const a=ha;t.bindFramebuffer(t.FRAMEBUFFER,oa.fb),t.viewport(0,0,Ut,Ut),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),Ie&&!a&&(t.enable(t.BLEND),t.blendFunc(t.CONSTANT_ALPHA,t.ONE_MINUS_CONSTANT_ALPHA),t.blendColor(0,0,0,.6)),t.useProgram(o.P.copy.p),t.uniform4fv(o.P.copy.uP,w),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,aa.tex),t.uniform1i(o.P.copy.uS,2),t.bindVertexArray(o.vEmpty),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.BLEND)},xe=[];for(const a of[1,3,4,5,6,7,10,11,12,20,21,22,28,30,33,34,35,36,38,39])xe.push(a*4,a*4+1,a*4+2,a*4+3);xe.push(23*4+3,29*4,29*4+1,31*4,31*4+1,31*4+2);const Ge=xe.length,ma=()=>{const a=L.tmK,r=q.eye,i=q.fw,c=q.rt;(!a||a[0]!==r[0]||a[1]!==r[1]||a[2]!==r[2]||a[3]!==i[0]||a[4]!==i[1]||a[5]!==i[2]||a[6]!==c[0]||a[7]!==c[2])&&(L.tmK=[r[0],r[1],r[2],i[0],i[1],i[2],c[0],c[2]],t.bindFramebuffer(t.FRAMEBUFFER,L.tm.fb),t.viewport(0,0,x,x),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.useProgram(o.P.mar.p),t.uniform4fv(o.P.mar.uP,w),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.mar.uN2,0),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,L.lay),t.uniform1i(o.P.mar.uL,5),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,L.rid.tex),t.uniform1i(o.P.mar.uR,6),t.bindVertexArray(o.vEmpty),t.drawArrays(t.TRIANGLES,0,3)),t.bindFramebuffer(t.FRAMEBUFFER,Ce.fb),t.viewport(0,0,x,x),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.depthMask(!0),t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.useProgram(o.P.grass.p),t.uniform4fv(o.P.grass.uP,w),t.uniformMatrix4fv(o.P.grass.uVP,!1,sa),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.grass.uN2,0),t.bindVertexArray(Mt.v),t.bindBuffer(t.ARRAY_BUFFER,Mt.b);{const l=q.eye,h=q.fw,D=q.rt,I=q.up,Pt=1/Math.hypot(1,lt),Y=Mt.pts;let at=-1;for(let ot=0;ot<=Mt.NC;ot++){let wt=!1;if(ot<Mt.NC&&Mt.cnt[ot]>Mt.st[ot]){wt=!0;for(let rt=0;rt<4&&wt;rt++){let Et=!0;for(let $=ot*36;$<ot*36+36;$+=3){const Q=Y[$]-l[0],Tt=Y[$+1]-l[1],me=Y[$+2]-l[2],Ve=Q*h[0]+Tt*h[1]+me*h[2],ge=rt<2?Q*D[0]+Tt*D[1]+me*D[2]:Q*I[0]+Tt*I[1]+me*I[2];if((rt&1?-ge:ge)-lt*Ve<=1.7/Pt){Et=!1;break}}Et&&(wt=!1)}}else if(ot<Mt.NC)continue;if(wt&&at<0&&(at=ot),!wt&&at>=0){const rt=Mt.st[at],Et=Mt.cnt[ot-1],$=rt*48;t.vertexAttribPointer(1,4,t.FLOAT,!1,48,$),t.vertexAttribPointer(2,2,t.FLOAT,!1,48,$+16),t.vertexAttribPointer(3,4,t.FLOAT,!1,48,$+24),t.vertexAttribPointer(4,2,t.FLOAT,!1,48,$+40),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,o.bladeVerts,Et-rt),at=-1}}}t.disable(t.DEPTH_TEST),xa();let f=0;if(L.q){let l=!!L.qK&&L.qOwn===w;if(l){for(let h=0;h<Ge;h++)if(L.qK[h]!==w[xe[h]]){l=!1;break}}if(l)f=2;else{L.qK=L.qK||new Float32Array(Ge);for(let h=0;h<Ge;h++)L.qK[h]=w[xe[h]];L.qOwn=w,L.qOK=!1}}t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.useProgram(o.P.comp.p),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.comp.uN2,0),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,L.lay),t.uniform1i(o.P.comp.uL,5),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,L.rid.tex),t.uniform1i(o.P.comp.uR,6),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,L.tm.tex),t.uniform1i(o.P.comp.uT,7),t.bindVertexArray(o.vEmpty),f===2&&!L.qOK&&(w[161]=1,t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.comp.uQ,3),t.bindFramebuffer(t.FRAMEBUFFER,L.q.fb),t.viewport(0,0,x,x),t.uniform4fv(o.P.comp.uP,w),t.drawArrays(t.TRIANGLES,0,3),L.qOK=!0),w[161]=f,t.bindFramebuffer(t.FRAMEBUFFER,Ce.fb),t.viewport(0,0,x,x),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.depthMask(!1),t.uniform4fv(o.P.comp.uP,w),L.q&&(t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,L.q.tex),t.uniform1i(o.P.comp.uQ,3)),t.drawArrays(t.TRIANGLES,0,3),w[161]=0,t.depthMask(!0),t.depthFunc(t.LESS),t.disable(t.DEPTH_TEST),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,x,x),t.useProgram(o.P.fin.p),t.uniform4fv(o.P.fin.uP,w),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,Ce.tex),t.uniform1i(o.P.fin.uS,4),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,oa.tex),t.uniform1i(o.P.fin.uC,2),t.bindVertexArray(o.vEmpty),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)},so=(a,r)=>{r=Math.min(Math.max(r||0,0),.25),_t=a,la(),eo(r),e.input.down&&H&&H.moved<.025&&H.t>.35||(se=Math.max(0,se-r*.02));const c=1-Math.exp(-r/2.2),f=1-Math.exp(-r/9);for(let l=0;l<2;l++)ct[l]+=(ue[l]-ct[l])*c,Ft[l]+=(ct[l]-Ft[l])*f;for(let l=pt.length-1;l>=0;l--)pt[l].age+=r,pt[l].age>70&&pt.splice(l,1);for(let l=Lt.length-1;l>=0;l--){const h=Lt[l];h.h+=h.v*r*(h.h>Ht?.5:1),h.h>Ht-300&&!h.hit&&(h.hit=!0,Yt=Math.min(.35,Yt+.12*h.s)),h.h>Ht+Pe*2.5&&Lt.splice(l,1)}if(Yt=Math.max(0,Yt-r*.006),_t>=ca&&(ca=_t+7+30*st()*st(),pt.length>=3&&pt.shift(),pt.push({az:Kt+(re-Kt)*(.1+.8*st()),age:0,s:.5+.5*st()}),Lt.length<3&&Lt.push({h:-300,s:.22+.25*st(),v:110}),ft=Math.min(1.5,ft+.25)),ft=Math.max(0,ft-r*.03),u===2&&_t>=ia){const l=w[36]+w[116]*w[200],h=w[9*4+1]+w[201],D=w[9*4+2]+w[29*4+1]*w[200];Ct={t0:_t,p:[l+(s()-.5)*fe,h+(s()-.5)*Pe*.8,D+(s()-.5)*fe],I:3+5*s()},Te=Te>0?Te-1:Math.floor(3*s()),ia=_t+(Te>0?.12+.5*s():8+32*s());const I=Math.hypot(Ct.p[0],Ct.p[1],Ct.p[2]);he.push({at:_t+I/343,v:Jt(2/(1+I/4e3),.08,.6)})}for(let l=he.length-1;l>=0;l--)if(_t>=he[l].at){const h=he[l];he.splice(l,1),e.sound.hit("kick",h.v*.5),e.sound.hit("noise",h.v*.5,{cutoff:140,dur:3})}if(qe-=r,qe<=0){qe=.45;const l=Math.hypot(ct[0],ct[1]);e.sound.hit("noise",.03+.1*l,{cutoff:260+1500*l,dur:1}),e.sound.hit("noise",.02+.05*ft,{cutoff:140,dur:1.2}),ft>.2&&s()<ft&&e.sound.hit("hat",.03*ft)}ua(),He(!1),ma(),Ie=!0};return la(),ua(),o.link(),(a=>{t.bindTexture(t.TEXTURE_2D,L.rid.tex),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.bindFramebuffer(t.FRAMEBUFFER,L.rid.fb),t.viewport(0,0,1024,256),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.useProgram(o.P.rb.p),t.uniform4fv(o.P.rb.uP,a),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.rb.uN2,0),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,L.lay),t.uniform1i(o.P.rb.uL,5),t.bindVertexArray(o.vEmpty),t.drawArrays(t.TRIANGLES,0,3)})(w),He(!0),xa(),He(!1),ma(),Ie=!0,so}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
