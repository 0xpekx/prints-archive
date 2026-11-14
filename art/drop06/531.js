// Fire Cloud: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/531.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ta){ta&&function(){"use strict";const za={yaw:0,pitch:0,x:0,y:0,z:0},ee=(e,t,h)=>e<t?t:e>h?h:e,Bt=(e,t,h)=>{const o=ee((h-e)/(t-e),0,1);return o*o*(3-2*o)},ge=(e,t,h)=>e.map((o,p)=>o+(t[p]-o)*h),Tt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,ae=`
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
`,me=Tt+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",Aa=Tt+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 1., 1.); }",Fa=Tt+ae+`
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
`,Ma=Tt+`
uniform vec4 uP[52];
uniform sampler2D uS;
out vec4 oC;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  if ((p.y & 1) != int(uP[23].x) && uP[32].w < 0.) discard;
  oC = texelFetch(uS, ivec2(p.x, p.y >> 1), 0);
}
`,ea=`
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
`,ka=Tt+ae+`
uniform sampler2D uL;
${ea}
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
`,_a=Tt+ae+`
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
${ea}vec3 terrShade(vec3 P, vec3 d, float t) {
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
`,Da=Tt+ae+`
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
`,Na=Tt+ae+`
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
`,Ua=Tt+`
uniform vec4 uP[52];
in vec3 vC; out vec4 oC;
void main() { oC = vec4(vC * uP[23].w, 0.); }
`,Ca=Tt+ae+`
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
`;function La(e,t,h,o){const p=new Float32Array(t**o);for(let x=0;x<p.length;x++)p[x]=h();const i=new Int32Array(e),g=new Int32Array(e),P=new Float32Array(e);for(let x=0;x<e;x++){const z=x/e*t,M=Math.floor(z),v=z-M;i[x]=M%t,g[x]=(M+1)%t,P[x]=v*v*(3-2*v)}const D=new Float32Array(e**o);if(o===2)for(let x=0;x<e;x++){const z=i[x]*t,M=g[x]*t,v=P[x];for(let F=0;F<e;F++){const R=p[z+i[F]]+(p[z+g[F]]-p[z+i[F]])*P[F],w=p[M+i[F]]+(p[M+g[F]]-p[M+i[F]])*P[F];D[x*e+F]=R+(w-R)*v}}else{const x=new Float32Array(t*t*e);for(let z=0;z<t;z++)for(let M=0;M<t;M++){const v=(z*t+M)*t,F=(z*t+M)*e;for(let R=0;R<e;R++){const w=p[v+i[R]];x[F+R]=w+(p[v+g[R]]-w)*P[R]}}for(let z=0;z<e;z++){const M=i[z]*t,v=g[z]*t,F=P[z];for(let R=0;R<e;R++){const w=(M+i[R])*e,O=(M+g[R])*e,st=(v+i[R])*e,gt=(v+g[R])*e,ut=P[R],Kt=(z*e+R)*e;for(let V=0;V<e;V++){const pt=x[w+V]+(x[O+V]-x[w+V])*ut,Xt=x[st+V]+(x[gt+V]-x[st+V])*ut;D[Kt+V]=pt+(Xt-pt)*F}}}}return D}function oe(e,t,h,o,p){const i=new Float32Array(e**h);o.forEach((D,x)=>{const z=La(e,D,t,h);for(let M=0;M<i.length;M++)i[M]+=z[M]*p[x]});let g=1e9,P=-1e9;for(const D of i)D<g&&(g=D),D>P&&(P=D);for(let D=0;D<i.length;D++)i[D]=(i[D]-g)/(P-g);return i}function aa(e,t,h){const o=t*t*t,p=new Float32Array(o),i=new Float32Array(o),g=new Float32Array(o);for(let v=0;v<o;v++)p[v]=h(),i[v]=h(),g[v]=h();const P=new Float32Array(e*e*e),D=t/e,x=new Int32Array(e*3),z=new Float32Array(e);for(let v=0;v<e;v++){const F=(v+.5)*D,R=Math.floor(F);z[v]=F-R;for(let w=0;w<3;w++)x[v*3+w]=(R+w-1+t)%t}let M=0;for(let v=0;v<e;v++)for(let F=0;F<e;F++){const R=z[v],w=z[F];for(let O=0;O<e;O++){const st=z[O];let gt=9;for(let ut=0;ut<3;ut++){const Kt=x[v*3+ut]*t*t,V=ut-1-R;for(let pt=0;pt<3;pt++){const Xt=Kt+x[F*3+pt]*t,ht=pt-1-w;for(let vt=0;vt<3;vt++){const Nt=Xt+x[O*3+vt],Ut=vt-1-st+p[Nt],Ht=ht+i[Nt],Ct=V+g[Nt],xt=Ut*Ut+Ht*Ht+Ct*Ct;xt<gt&&(gt=xt)}}}P[M++]=1-Math.min(Math.sqrt(gt),1)}}return P}const oa=new Float32Array(1),Sa=new Uint32Array(oa.buffer);function Re(e){oa[0]=e;const t=Sa[0],h=t>>>16&32768,o=(t>>>23&255)-112,p=t&8388607;return o<=0?h:o>=31?h|31743:h|o<<10|p>>>13}function Ia(e,t){if(e.__c531)return e.__c531;e.getExtension("KHR_parallel_shader_compile");const h=(l,U)=>{const N=e.createShader(l);return e.shaderSource(N,U),e.compileShader(N),N},o={vol:[me,Fa],comp:[Aa,_a],fin:[me,Ca],grass:[Na,Ua],mar:[me,ka],rb:[me,Da],copy:[me,Ma]},p={};for(const l in o){const U=e.createProgram(),N=h(e.VERTEX_SHADER,o[l][0]),b=h(e.FRAGMENT_SHADER,o[l][1]);e.attachShader(U,N),e.attachShader(U,b),e.linkProgram(U),p[l]={p:U,v:N,f:b}}e.flush();let i=99538225;const g=()=>{i=i+1831565813|0;let l=Math.imul(i^i>>>15,1|i);return l=l+Math.imul(l^l>>>7,61|l)^l,((l^l>>>14)>>>0)/4294967296},P=32,D=[oe(P,g,3,[2,4,8],[.55,.3,.15]),oe(P,g,3,[2,4,8],[.55,.3,.15]),oe(P,g,3,[4,8,16],[.5,.32,.18])],x=aa(P,4,g),z=aa(P,8,g),M=new Float32Array(P**3);let v=1e9,F=-1e9;for(let l=0;l<M.length;l++){const U=x[l]*.62+z[l]*.38;M[l]=U,U<v&&(v=U),U>F&&(F=U)}const R=new Uint8Array(P**3*4);for(let l=0;l<M.length;l++)R[l*4]=D[0][l]*255,R[l*4+1]=D[1][l]*255,R[l*4+2]=D[2][l]*255,R[l*4+3]=(M[l]-v)/(F-v)*255;const w=256,O=[oe(w,g,2,[4,8,16,32,64],[.42,.26,.16,.1,.06]),oe(w,g,2,[8,16,32,64],[.45,.28,.17,.1]),oe(w,g,2,[16,32,64,128],[.45,.28,.17,.1])],st=new Uint8Array(w*w*4);for(let l=0;l<w*w;l++)st[l*4]=O[0][l]*255,st[l*4+1]=O[1][l]*255,st[l*4+2]=O[2][l]*255,st[l*4+3]=g()*255;e.pixelStorei(e.UNPACK_ALIGNMENT,1);const gt=e.createTexture();e.bindTexture(e.TEXTURE_3D,gt),e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,P,P,P,0,e.RGBA,e.UNSIGNED_BYTE,R),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const l of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,l,e.REPEAT);const ut=e.createTexture();e.bindTexture(e.TEXTURE_2D,ut),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,w,w,0,e.RGBA,e.UNSIGNED_BYTE,st),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.pixelStorei(e.UNPACK_ALIGNMENT,4);const Kt=e.createVertexArray(),V=4,pt=[];for(let l=0;l<=V;l++)pt.push(l/V,-1,l/V,1);const Xt=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Xt),e.bufferData(e.ARRAY_BUFFER,new Float32Array(pt),e.STATIC_DRAW);const ht=(l,U,N)=>{const b=U*w-.5,k=N*w-.5,L=Math.floor(b),W=Math.floor(k),I=b-L,et=k-W,$=(Lt,q)=>st[((q%w+w)%w*w+(Lt%w+w)%w)*4+l]/255;return($(L,W)*(1-I)+$(L+1,W)*I)*(1-et)+($(L,W+1)*(1-I)+$(L+1,W+1)*I)*et},vt=l=>{let U=39509;const N=()=>{U=U+1831565813|0;let E=Math.imul(U^U>>>15,1|U);return E=E+Math.imul(E^E>>>7,61|E)^E,((E^E>>>14)>>>0)/4294967296},b=new Float32Array(l*12);let k=0;for(;k<l;){const E=.5+19*Math.pow(N(),.82),nt=N()*6.2832,at=Math.sin(nt)*E,ot=Math.cos(nt)*E,Wt=.35+.75*N()*N()+(N()<.12?.35:0),H=.05+.14*N(),zt=6+Math.floor(N()*18),Yt=N();for(let bt=0;bt<zt&&k<l;bt++,k++){const ie=Math.sqrt(N())*H,St=N()*6.2832,ce=Math.sin(St)*ie,mt=Math.cos(St)*ie,At=.08+1.6*ie/H*(.25+.3*N());b[k*12]=at+ce,b[k*12+1]=ot+mt,b[k*12+2]=Wt*(.55+.5*N())*(1-.35*ie/H)*(N()<Yt*.75+.14?-1:1),b[k*12+3]=N(),b[k*12+4]=Math.sin(St)*At,b[k*12+5]=Math.cos(St)*At;const u=at+ce,Ft=ot+mt;b[k*12+6]=(ht(0,u/2600+.37,Ft/2600+.37)-.5)*110+(ht(1,u/420+.11,Ft/420+.11)-.5)*16,b[k*12+7]=(ht(2,u/37+.53,Ft/37+.53)-.5)*.9,b[k*12+8]=ht(0,u*.021,Ft*.021),b[k*12+9]=ht(2,u*.07+.3,Ft*.07+.3),b[k*12+10]=ht(3,u*.11+.7,Ft*.11+.7),b[k*12+11]=ht(1,u/70+.21,Ft/70+.21)}}const L=36,W=[0,3,8,20.5],I=3*L,et=new Uint16Array(l),$=new Uint32Array(I+1);for(let E=0;E<l;E++){const nt=b[E*12],at=b[E*12+1],ot=Math.hypot(nt,at),Wt=ot<3?0:ot<8?1:2;let H=Math.atan2(nt,at);H<0&&(H+=6.2831853);const zt=Wt*L+Math.min(L-1,Math.floor(H/6.2831853*L));et[E]=zt,$[zt+1]++}for(let E=0;E<I;E++)$[E+1]+=$[E];const Lt=$.slice(0,I),q=new Float32Array(l*12),qe=Lt.slice();for(let E=0;E<l;E++){const nt=qe[et[E]]++;q.set(b.subarray(E*12,E*12+12),nt*12)}const se=new Float32Array(I*36),Gt=6.2831853/L;for(let E=0;E<I;E++){const nt=Math.floor(E/L),at=E%L,ot=W[nt],Wt=W[nt+1]/Math.cos(Gt/2);let H=E*36;for(const zt of[at*Gt,(at+.5)*Gt,(at+1)*Gt])for(const Yt of[ot,Wt])for(const bt of[-1,.6])se[H++]=Math.sin(zt)*Yt,se[H++]=bt,se[H++]=Math.cos(zt)*Yt}const ne=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ne),e.bufferData(e.ARRAY_BUFFER,q,e.STATIC_DRAW);const Rt=e.createVertexArray();return e.bindVertexArray(Rt),e.bindBuffer(e.ARRAY_BUFFER,Xt),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0),e.bindBuffer(e.ARRAY_BUFFER,ne),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,48,0),e.vertexAttribDivisor(1,1),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,2,e.FLOAT,!1,48,16),e.vertexAttribDivisor(2,1),e.enableVertexAttribArray(3),e.vertexAttribPointer(3,4,e.FLOAT,!1,48,24),e.vertexAttribDivisor(3,1),e.enableVertexAttribArray(4),e.vertexAttribPointer(4,2,e.FLOAT,!1,48,40),e.vertexAttribDivisor(4,1),e.bindVertexArray(null),{v:Rt,n:l,b:ne,st:Lt,cnt:$.slice(1),pts:se,NC:I}},Nt={},Ut=t<=256?18e3:62e3;Nt[Ut]=vt(Ut);const Ht=()=>{if(!j.linked){j.linked=!0;for(const l in p){const{p:U,v:N,f:b}=p[l];if(!e.getProgramParameter(U,e.LINK_STATUS))throw new Error("531 "+l+": "+(e.getShaderInfoLog(N)||"")+(e.getShaderInfoLog(b)||"")+e.getProgramInfoLog(U));const k=L=>e.getUniformLocation(U,L);p[l]={p:U,uP:k("uP"),uVP:k("uVP"),uN2:k("uN2"),uN3:k("uN3"),uC:k("uC"),uL:k("uL"),uS:k("uS"),uR:k("uR"),uT:k("uT"),uQ:k("uQ")}}}},Ct=!!e.getExtension("EXT_color_buffer_float"),xt=!!(Ct||e.getExtension("EXT_color_buffer_half_float")),j={link:Ht,P:p,n3:gt,n2:ut,vEmpty:Kt,bladeVerts:(V+1)*2,half:xt,f32:Ct,rts:{},grass:Nt,mkGrass:vt,inst:{},order:[]};return e.__c531=j}function re(e,t,h,o,p=h,i=!1,g=!1,P=!1,D=!1){const x=h+"x"+p+(o?"d":"c");if(!i&&t.rts[x])return t.rts[x];const z=e.createTexture();e.bindTexture(e.TEXTURE_2D,z),D&&t.f32?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,h,p,0,e.RGBA,e.FLOAT,null):D?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,h,p,0,e.RGBA,e.HALF_FLOAT,null):P?e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,h,p,0,e.RGBA,e.UNSIGNED_BYTE,null):t.half&&g?e.texImage2D(e.TEXTURE_2D,0,e.RG16F,h,p,0,e.RG,e.HALF_FLOAT,null):t.half?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,h,p,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,g?e.RGBA8:e.SRGB8_ALPHA8,h,p,0,e.RGBA,e.UNSIGNED_BYTE,null);const M=P||D?e.NEAREST:e.LINEAR;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,M),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,M),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const v=e.createFramebuffer();if(e.bindFramebuffer(e.FRAMEBUFFER,v),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,z,0),o){const R=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,R),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,h,p),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,R)}e.bindFramebuffer(e.FRAMEBUFFER,null);const F={tex:z,fb:v,w:h};return i||(t.rts[x]=F),F}ta.add({num:531,name:"Fire Cloud",fam:"Vistas",recipe:"Watching from a grassy hill as a wildfire burns along a forested ridge a few kilometres away, drawing its smoke into one tall column that blooms into a big white cap. The size of the fire, the hour and the wind change every mint. The fire flares up on its own, and you can tap the ridge for a gust that thickens the smoke, drag sideways to swing the wind and lean the plume, or hold to let dusk fall.",interactive:"The fire flares in runs along the ridge on its own. Tap the ridge for a gust there: the flames brighten and lean, and the smoke thickens up the column a few seconds later. Drag sideways to shift the wind and watch the plume lean over, the top last. Hold to let dusk fall until last light: the sun sinks, the fire glows under the darkening column; let go and the light slowly returns.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,h=e.size,o=Ia(t,h);let p=0;for(let a=2;a<66;a+=8)p=Math.imul(p^parseInt(e.hash.slice(a,a+8),16),2654435761)+2135587861|0;const i=()=>{p=p+1831565813|0;let a=Math.imul(p^p>>>15,1|p);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},g=a=>{let r=i(),s=0;for(const[n,f]of a)if(s+=f,r<s)return n;return a[a.length-1][0]},P=e.home;let D=P?"Pyrocumulus":g([["Pyrocumulus",.6],["Smoke plume, no cap",.27],["Pyrocumulonimbus with lightning",.13]]),x=P?"Golden evening":g([["Golden evening",.58],["Dusk",.32],["Last light, fire glowing",.1]]);const z=P?"Strong lean":g(x==="Last light, fire glowing"?[["Strong lean",.55],["Moderate",.45]]:[["Strong lean",.42],["Moderate",.38],["Calm, straight up",.2]]),M=P?"Clear upwind":g([["Clear upwind",.65],["Smoky everywhere",.35]]);let v=x==="Last light, fire glowing"?"Afterglow":P?"Side-lit":g([["Side-lit",.62],["Backlit, red sun in the smoke",.38]]);const F=P?"California oak and chaparral":g([["California oak and chaparral",.4],["Australian eucalypt",.32],["Canadian spruce",.28]]);let R=P?"None":g([["None",.85],["Second fire on a far ridge",.15]]),w=739982445;for(let a=2;a<66;a+=8)w=Math.imul(w^parseInt(e.hash.slice(a,a+8),16),3266489909)+374761393|0;const O=()=>{w=w+1831565813|0;let a=Math.imul(w^w>>>15,1|w);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},st=O(),gt=O(),ut=O(),Kt=O(),V=O(),pt=O(),Xt=O(),ht=O();D.startsWith("Pyrocumulonimbus")&&st>.3&&(D="Pyrocumulus"),R!=="None"&&gt>.34&&(R="None");const vt=x==="Last light, fire glowing",Nt=!P&&!vt&&ut<.245,Ut=vt&&Kt<.3;Nt&&(x="Afternoon",v.startsWith("Backlit")&&(v="Backlit, sun high in the haze")),Ut&&(x="Night",v="Firelight only");const Ht=M==="Smoky everywhere",Ct=Ht?"Lost in the smoke":P||V<.66?"Clear":V<.88?"Smoke overhead":"High cloud";e.trait("Fire",D),e.trait("Hour",x),e.trait("Wind",z),e.trait("Haze",M),e.trait("Light",v),e.trait("Country",F),e.trait("Second fire",R),e.trait("Sky",Ct);let xt=1540483477;for(let a=2;a<66;a+=8)xt=Math.imul(xt^parseInt(e.hash.slice(a,a+8),16),2246822519)+668265263|0;const j=()=>{xt=xt+1831565813|0;let a=Math.imul(xt^xt>>>15,1|xt);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},U=P?"From the hill":(a=>{let r=j(),s=0;for(const[n,f]of a)if(s+=f,r<s)return n;return a[a.length-1][0]})([["From the hill",.65],["Under the column",.35]]);e.trait("View",U);const N=U==="Under the column",b=D==="Pyrocumulus"?0:D==="Smoke plume, no cap"?1:2,k=vt,L=Ht,W=Ct==="Smoke overhead"?1:Ct==="High cloud"?2:0,I=F.startsWith("California")?0:F.startsWith("Australian")?1:2,et=P?1:i()<.5?-1:1,$=[430,360,300][I]+80*i(),Lt=1300+300*i(),q=-et*(.15+.07*i()),qe=7200+700*i(),se=N?4900+500*j():qe,Gt=N?[2200,7500,3e3]:[3e3,9500,3800],ne=v.startsWith("Backlit"),Rt=1024,E=new Uint16Array(Rt*4*4),nt=(a,r)=>{const s=[];for(let n=1;n<=a;n++)s.push([n,Math.pow(n,-r)*(i()-.5)*2,i()*6.2832]);return s},at=(a,r)=>{let s=0;for(const[n,f,_]of a)s+=f*Math.sin(n*r+_);return s},ot=a=>{for(;a>Math.PI;)a-=2*Math.PI;for(;a<-Math.PI;)a+=2*Math.PI;return a},Wt=[11500,se,16500+3e3*i(),36e3+8e3*i()],H=[[-60,260,1.05],[-150,260,1.15],[120,560,1],[450,1300,.85]];I===1&&(H[2][1]=380,H[3][1]=700),I===2&&(H[2][1]=420,H[3][0]=650,H[3][1]=1700);const zt=[0,1,2,3].map(a=>nt(a===3?48:36,H[a][2])),Yt=[0,1,2,3].map(()=>nt(5,1.2)),bt=q+et*(.45+.3*i()),ie=[[.6,.7,.45,.25],[.8,.9,.7,.4],[.9,1,.85,.6]][I],St=(a,r)=>{let s=H[a][0]+H[a][1]*at(zt[a],r)*1.3;return a===3&&(s=H[a][0]+H[a][1]*Math.pow(Math.abs(at(zt[a],r))*1.2+.1,.8)),a===1&&(s+=520*Math.exp(-Math.pow(ot(r-q)/.55,2))+200*Math.exp(-Math.pow(ot(r-q+et*.5)/.5,2))),a===2&&R!=="None"&&(s+=350*Math.exp(-Math.pow(ot(r-bt)/.2,2))),a===0&&(s-=120*Math.exp(-Math.pow(ot(r-q)/.5,2))),a===1&&(s=Math.max(s,-$+180)),a===2&&(s=Math.max(s,-$+120)),s},ce=(a,r)=>Wt[a]*(1+[.12,.08,.1,.08][a]*at(Yt[a],r)-(a===1?.08*at(Yt[1],q):0));for(let a=0;a<4;a++)for(let r=0;r<Rt;r++){const s=r/Rt*6.2832,n=(a*Rt+r)*4;E[n]=Re(St(a,s)),E[n+1]=Re(ce(a,s)),E[n+2]=Re(ie[a]),E[n+3]=Re([110,0,160,260][a])}const mt=Math.min(560,h),At=e.hash+":"+h;let u=null;const Ft=a=>{delete o.inst[a.key],o.order.splice(o.order.indexOf(a.key),1),a.key=null,t.deleteTexture(a.lay);for(const r of["rid","rtH","rtC","tm","q"])a[r]&&(t.deleteTexture(a[r].tex),t.deleteFramebuffer(a[r].fb))},ra=()=>{const a=o.tick||0;if(u=o.inst[At],!u&&o.order.length>=16){let r=null,s=null;for(const n of o.order){const f=o.inst[n];(!r||f.use<r.use)&&(r=f),f.S===h&&(!s||f.use<s.use)&&(s=f)}s?(delete o.inst[s.key],o.order.splice(o.order.indexOf(s.key),1),u=o.inst[At]=s,o.order.push(At),u.tmK=null,u.qK=null,u.qOK=!1):Ft(r)}if(!u){u=o.inst[At]={S:h,lay:t.createTexture(),rid:re(t,o,1024,!1,256,!0,!0),rtH:re(t,o,mt,!1,mt/2,!0),rtC:re(t,o,mt,!1,mt,!0),tm:re(t,o,h,!1,h,!0,!1,!0),tmK:null,q:null,qK:null,qOK:!1},o.half&&(u.q=re(t,o,h,!1,h,!0,!1,!1,!0)),o.order.push(At);for(let r=0;o.order.length>10&&r<o.order.length;){const s=o.inst[o.order[r]];s!==u&&a-s.use>64?Ft(s):r++}}u.key=At,u.use=a,t.bindTexture(t.TEXTURE_2D,u.lay),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,Rt,4,0,t.RGBA,t.HALF_FLOAT,E),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)};ra();let ze=-1e4;for(let a=0;a<Rt;a++)ze=Math.max(ze,St(1,a/Rt*6.2832));ze+=[14,24,20][I]*1.2+90;const yt=ce(1,q),qa=St(1,q),G=[Math.sin(q)*yt*.985,qa-260,Math.cos(q)*yt*.985],sa=[Math.cos(q),-Math.sin(q)],Be=(1e3+500*i())/yt;let Qt=q-Be*(1+.3*i()),le=q+Be*(1+.3*i());const Ba=b===2?1.25:b===1?.8:1,Xa=(400+100*i())*Ba*.72,Ot=b===1?4300:(b===2?3e3:3300)+400*i(),de=b===2?1600+250*i():1900+400*i(),Ae=b===2?1700:1450+300*i(),Ha=(b===2?[[-.1,.35,0,.58],[.4,.35,.25,.5],[.8,.45,-.1,.42],[.1,1.3,0,.4],[0,.85,.05,.5],[.35,.95,-.25,.42],[-.2,1,.15,.4],[.25,1.6,.1,.36]]:[[-.1,.35,0,.6],[.35,.3,.25,.46],[.75,.2,-.1,.36],[1.05,.05,.15,.22],[.05,.95,.05,.5],[.45,.8,-.25,.3],[.1,1.42,.1,.32],[-.3,.72,.2,.2]]).map(a=>[a[0]+(i()-.5)*.16,a[1]+(i()-.5)*.1,(a[2]+(i()-.5)*.2)*(i()<.5?-1:1),a[3]*(.9+.2*i())]),Ga=i()*10,Fe=R!=="None",na=ce(2,bt),jt=[Math.sin(bt)*na*.985,St(2,bt)-150,Math.cos(bt)*na*.985],Xe=z==="Strong lean"?.58+.1*i():z==="Moderate"?.32+.08*i():.05+.03*i(),Oa=(i()-.5)*.5;let pe=[et*Xe,Oa*Xe],it=pe.slice(),Mt=pe.slice();const ia=ne?et*(.22+.1*i()):et*(1.2+.35*i()),Va=k?-(3+1.5*i()):x==="Dusk"?.4+.6*i():2+1.6*i(),ca=(Ut?-14:Nt?ne?17+7*ht:27+14*ht:Va)*Math.PI/180,Vt={lo:[.3,.235,.175],hi:[.5,.44,.37]};I===1&&(Vt.lo=[.34,.24,.16],Vt.hi=[.53,.44,.35]),Ht&&(Vt.lo=Vt.lo.map(a=>a*.7),Vt.hi=Vt.hi.map(a=>a*.8));const Ka=[[.62,.47,.24],[.72,.62,.4],[.46,.42,.24]][I],Wa=[[.05,.055,.035],[.07,.072,.05],[.025,.038,.028]][I],Ya=[14,24,20][I],Qa=[[.36,.29,.2],[.5,.27,.15],[.3,.27,.22]][I],He=b===1?2600:Ot-1300,Ge=b===1?1200:950,la=(11e-5+14e-5*Xe)*(L?1.4:1),ja=L?[.032,.075,.17]:[.024,.06,.14],$a=L?14e3:48e3,Me=h<=256?18e3:62e3;o.grass[Me]||(o.grass[Me]=o.mkGrass(Me));const kt=o.grass[Me];let Oe=u.rtH,Ve=u.rtC;const Ke=re(t,o,h,!0),Ja=o.half?1:.25;let fe=0,ve=0,ke=!1;const T=new Float32Array(52*4),fa=new Float32Array(16),ua=P?0:(Xt-.5)*.5,Za=N?q+et*(.1+.06*j())+ua*.6:ua,to=N?.47+.03*j():.33,ct=Math.tan(34*Math.PI/180),S={eye:[0,1.6,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]};let _t=0,ue=0,B=null,We=!1;const dt=[],It=[];let qt=null,ha=2+6*i(),_e=0,Ye=0,$t=0,lt=0;const be=[];dt.push({az:q+(j()-.5)*1.2*Be,age:5,s:.75});let xa=5+12*j();const eo=(a,r)=>-$*(1-Math.exp(-(a*a+r*r)/(Lt*Lt))),ma=()=>{const a=e.view||za,r=Za+(a.yaw||0),s=ee(to+(a.pitch||0),-1.35,1.45);let n=a.x||0,f=a.z||0;const _=Math.hypot(n,f);_>8&&(n*=8/_,f*=8/_),S.eye=[n,eo(n,f)+ee(1.6+(a.y||0),.6,3),f];const c=Math.cos(s);S.fw=[Math.sin(r)*c,Math.sin(s),Math.cos(r)*c],S.rt=[Math.cos(r),0,-Math.sin(r)];const y=S.fw,X=S.rt;S.up=[y[1]*X[2]-y[2]*X[1],y[2]*X[0]-y[0]*X[2],y[0]*X[1]-y[1]*X[0]];const rt=.05,K=2e3,J=(K+rt)/(K-rt),Z=-2*K*rt/(K-rt),Pt=S.eye,tt=S.up,wt=Y=>Y[0]*Pt[0]+Y[1]*Pt[1]+Y[2]*Pt[2],Q=[[X[0]/ct,X[1]/ct,X[2]/ct,-wt(X)/ct],[tt[0]/ct,tt[1]/ct,tt[2]/ct,-wt(tt)/ct],[y[0]*J,y[1]*J,y[2]*J,-wt(y)*J+Z],[y[0],y[1],y[2],-wt(y)]];for(let Y=0;Y<4;Y++)for(let Et=0;Et<4;Et++)fa[Et*4+Y]=Q[Y][Et]},ao=(a,r)=>{const s=a*2-1,n=1-r*2,f=[0,1,2].map(c=>S.fw[c]+(s*S.rt[c]+n*S.up[c])*ct),_=Math.hypot(f[0],f[1],f[2]);return f.map(c=>c/_)},oo=(a,r)=>{const s=ao(a,r);let n=Math.atan2(s[0],s[2]);if(Math.abs(ot(n-q))>.7)return;n=ee(n,Qt-.08,le+.08),dt.length>=3&&dt.shift(),dt.push({az:n,age:0,s:1});const f=Math.exp(-Math.pow(ot(n-q)*yt/1800,2));It.length>=3&&It.shift(),It.push({h:-700,s:.3+.3*f,v:120+40*f}),lt=Math.min(1.5,lt+.5+.5*f),e.sound.hit("kick",.35),e.sound.hit("noise",.35,{cutoff:300,dur:2.4})},ro=a=>{const r=e.input;if(r.down&&r.inside!==!1){B||(B={x0:r.x,y0:r.y,lx:r.x,ly:r.y,t:0,moved:0}),B.t+=a;const f=r.x-B.lx;B.moved=Math.max(B.moved,Math.hypot(r.x-B.x0,r.y-B.y0)),B.moved>.025&&(pe[0]=ee(pe[0]+f*1.5,-.75,.75),Math.abs(f)>.002&&e.sound.hit("noise",Math.min(.12,Math.abs(f)*4),{cutoff:500+2e3*Math.abs(f)*10,dur:.5})),B.moved<.025&&B.t>.35&&(ue=Math.min(1,ue+a*.09)),B.lx=r.x,B.ly=r.y}else B&&(We=B.t>.3||B.moved>.025,B=null);const s=r.taps(),n=B&&(B.t>.3||B.moved>.025);if(s.length&&!We&&!n)for(const f of s.slice(-2))oo(f.x,f.y);s.length&&(We=!1)},d=(a,r,s,n,f)=>{T[a*4]=r,T[a*4+1]=s,T[a*4+2]=n,T[a*4+3]=f},Jt=[[32,[.15,.29,.58],[.62,.68,.76],[.5,.58,.7],[.2,.24,.33],.5],[16,[.12,.25,.54],[.8,.72,.62],[.45,.52,.66],[.16,.19,.28],.62],[8,[.075,.17,.42],[1,.66,.38],[.36,.46,.64],[.1,.13,.22],1],[4,[.06,.13,.36],[1.15,.58,.26],[.3,.37,.54],[.07,.09,.16],.9],[1,[.045,.09,.26],[1.05,.4,.15],[.24,.27,.42],[.05,.06,.11],1.05],[-2,[.014,.025,.075],[.6,.2,.08],[.1,.1,.19],[.03,.035,.07],1.5],[-5,[.004,.008,.026],[.16,.06,.03],[.03,.03,.065],[.012,.014,.03],1.9],[-12,[.0015,.003,.009],[.008,.005,.005],[.003,.004,.008],[.0012,.0015,.003],3.2]],so=a=>{if(a>=Jt[0][0])return Jt[0];for(let r=0;r<Jt.length-1;r++){const s=Jt[r],n=Jt[r+1];if(a>=n[0]){const f=(s[0]-a)/(s[0]-n[0]);return[a,ge(s[1],n[1],f),ge(s[2],n[2],f),ge(s[3],n[3],f),ge(s[4],n[4],f),s[5]+(n[5]-s[5])*f]}}return Jt[Jt.length-1]},no=(a,r)=>{const s=Bt(0,6e3,a),n=it[0]+(Mt[0]-it[0])*s,f=it[1]+(Mt[1]-it[1])*s,_=1800*(1-Math.exp(-a/1800))+.25*a;return r[0]=n*_,r[1]=f*_,r},io=(a,r,s,n)=>{const f=a-G[0],_=s-G[2],c=f*n[0]+_*n[1],y=-f*n[1]+_*n[0],X=Math.max(c,0),rt=700+.18*X,K=(r-He-.04*X)/(Ge*(1+X/22e3));return Math.exp(-K*K-y*y/(rt*rt))*Bt(-1800,3e3,c)*Math.exp(-X/4e4)},da=(a,r,s)=>{let n=0;for(let f=0;f<48;f++){const _=300+f*1e3;n+=io(a[0]+r[0]*_,a[1]+r[1]*_,a[2]+r[2]*_,s)*1e3}return n*la*.55},Qe=[0,0],pa=()=>{const a=ca-ue*Math.max(ca+4.2*Math.PI/180,0),r=a*180/Math.PI,s=[Math.sin(ia)*Math.cos(a),Math.sin(a),Math.cos(ia)*Math.cos(a)],n=so(r).slice(),f=(m,A,ft,Zt)=>{const te=m[0]*.3+m[1]*.55+m[2]*.15;return m.map((Dt,po)=>(Dt+(te*A[po]-Dt)*ft)*Zt)};L?(n[1]=f(n[1],[1.55,.98,.5],.9,.85),n[2]=f(n[2],[1.4,.9,.5],.7,1),n[3]=f(n[3],[1.4,.95,.55],.8,.9),n[4]=f(n[4],[1.35,.95,.6],.8,.8)):W===1?n[4]=f(n[4],[1.3,.95,.65],.6,.75):W===2&&(n[4]=f(n[4],[1,1,1],.4,1.35));const _=Math.hypot(Mt[0],Mt[1]),c=_>.001?[Mt[0]/_,Mt[1]/_]:[et,0],y=Bt(.02,.3,_),X=da([G[0],G[1]+(b===1?2500:Ot+300),G[2]],s,c),rt=da(S.eye,s,c),K=[3,2.75,2.5],J=m=>[Math.exp(-m*.55),Math.exp(-m),Math.exp(-m*1.7)],Z=L?1.5:W===2?.3:0,Pt=J(Z),tt=W===2?.6:1,wt=J(L?2.1:Z),Q=J(X).map((m,A)=>m*wt[A]),Y=J(rt).map((m,A)=>m*Pt[A]*tt),Et=ja,Pe=1/(Math.max(a,0)+.03),Je=Et.map(m=>Math.exp(-m*Pe)),Ne=K.map((m,A)=>m*Je[A]*Y[A]/tt*(W===2?.5:1)*Bt(-.012,.006,a)),fo=(k?.9:1)*(1+.5*lt);d(0,_t,ue,1-Bt(-6,4,r),.075*(1+.25*lt)),d(1,s[0],s[1],s[2],a),d(2,K[0]*Q[0],K[1]*Q[1],K[2]*Q[2],n[5]*(k?1.1:1)),d(3,S.eye[0],S.eye[1],S.eye[2],ct),d(4,...S.fw,mt),d(5,...S.rt,h),d(6,...S.up,2*ct/h),d(7,G[0],G[1],G[2],Xa),d(8,it[0],it[1],Mt[0],Mt[1]);const we=Bt(.05,.45,_),he=de*(1+.18*$t),wa=Ae*(1+.3*$t),Ea=b===2?.7+.2*we:.45+.45*we,uo=.95+.2*we,ho=b===2?.86+.14*we:.98+.08*we;no(Ot,Qe);const xe=[G[0]+Qe[0],G[1]+Ot,G[2]+Qe[1]];d(9,xe[0],xe[1],xe[2],de),d(10,...n[1],Ae);const C=[1e9,-1e9,1e9,-1e9,1e9,-1e9],xo=(m,A,ft,Zt,te,Dt)=>{C[0]=Math.min(C[0],m-Zt),C[1]=Math.max(C[1],m+Zt),C[2]=Math.min(C[2],A-te),C[3]=Math.max(C[3],A+te),C[4]=Math.min(C[4],ft-Dt),C[5]=Math.max(C[5],ft+Dt)};for(let m=0;m<8;m++){const A=Ha[m],ft=A[0]*he*Ea,Zt=A[1]*wa,te=A[2]*he*uo,Dt=A[3]*he*ho;d(41+m,ft,Zt,te,Dt),xo(ft,Zt,te,Dt,Dt,Dt)}if(b===2){const m=1.3*wa,A=.8*he*Ea,ft=1.5;d(49,m,A,ft,1),C[1]+=A+ft*.9*he,C[0]-=.3*he}else d(49,0,0,0,0);const Ze=.3*de+80;d(40,Ga,0,Gt[0],Gt[1]),d(50,(C[0]+C[1])/2,(C[2]+C[3])/2,(C[4]+C[5])/2,Gt[2]),d(51,(C[1]-C[0])/2+Ze,(C[3]-C[2])/2+Ze,(C[5]-C[4])/2+Ze,W);const Ee=[xe[0]+c[0]*T[200]-c[1]*T[202],xe[1]+T[201],xe[2]+c[1]*T[200]+c[0]*T[202]],Ue=Math.max(T[204],T[206]);d(11,...n[2],(L?.55:.35)*y+(L?.25:0)),d(12,...n[3],W===0?.55:W===1?.3:0),d(13,...Vt.lo,.03*(b===1?.85:1)),d(14,...Vt.hi,.03);for(let m=0;m<3;m++){const A=dt[m];A?d(15+m,A.az,A.s*2.2*Bt(0,2.2,A.age)*Math.exp(-A.age/22),150+A.age*30,0):d(15+m,0,0,1,0)}let Ta=0,Ce=[0,-1e5,0];if(qt){const m=_t-qt.t0;Ta=m<0?0:(1-Math.exp(-m/.06))*Math.exp(-m/.3)*qt.I,Ce=qt.p,m>1.6&&(qt=null)}d(18,Ce[0],Ce[1],Ce[2],Ta),d(19,jt[0],jt[1],jt[2],Fe?230:0),d(20,...Ne,ze),d(21,...Ka,I),d(22,...Wa,Ya),d(23,fe,(ve>>1)*.618034%1,h<=256?48:80,Ja),d(24,2.6,.5,.05,fo*(Ut?.8:1));for(let m=0;m<3;m++){const A=It[m];A?d(25+m,A.h,A.s*Bt(-300,300,A.h)*Math.exp(-Math.max(A.h-Ot,0)/1500),0,0):d(25+m,-1e5,0,0,0)}d(28,sa[0],sa[1],Qt,le),d(29,c[0],c[1],.35+1.1*Math.min(Math.hypot(it[0],it[1])/.45,1.3),(b===1?.8:1)*(1+.6*lt)),d(30,...Et,b),d(31,$,Lt*Lt,$a,$t),d(32,He,Ge,la*(.35+.65*y),T[32*4+3]||-1),d(33,...n[4],L?1:0);const Te=42e3*y+4e3,Le=2.6*(700+.18*Te),Se=[G[0]-3800,G[0]+3800,Ee[0]-Ue,Ee[0]+Ue,G[0]+c[0]*Te-Le,G[0]+c[0]*Te+Le],Ie=[G[2]-3800,G[2]+3800,Ee[2]-Ue,Ee[2]+Ue,G[2]+c[1]*Te-Le,G[2]+c[1]*Te+Le];Fe&&(Se.push(jt[0]-2500,jt[0]+2500),Ie.push(jt[2]-2500,jt[2]+2500));for(const m of[Qt,le]){const A=Math.sin(m)*yt,ft=Math.cos(m)*yt;Se.push(A-1500,A+1500),Ie.push(ft-1500,ft+1500)}const mo=b===1?G[1]+6200:Ee[1]+T[205];d(34,Math.min(...Se),G[1]-600,Math.min(...Ie),4800),d(35,Math.max(...Se),Math.max(mo,He+3*Ge+2200),Math.max(...Ie),yt),d(36,K[0]*Y[0],K[1]*Y[1],K[2]*Y[2],q);const ga=[Math.sin(Qt)*yt,Math.cos(Qt)*yt],Ra=[Math.sin(le)*yt,Math.cos(le)*yt];d(37,ga[0],ga[1],Ra[0],Ra[1]),d(38,bt,Fe?1:0,2800,Fe?2:1),d(39,...Qa,1)},De=a=>{T[23*4]=fe,T[23*4+1]=(ve++>>1)*.618034%1,T[32*4+3]=a?1:-1,t.bindFramebuffer(t.FRAMEBUFFER,Oe.fb),t.viewport(0,0,mt,mt/2),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.depthMask(!0),t.useProgram(o.P.vol.p),t.uniform4fv(o.P.vol.uP,T),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.vol.uN2,0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_3D,o.n3),t.uniform1i(o.P.vol.uN3,1),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,u.lay),t.uniform1i(o.P.vol.uL,5),t.bindVertexArray(o.vEmpty),t.drawArrays(t.TRIANGLES,0,3),va=a,fe^=1};let va=!1;const je=()=>{const a=va;t.bindFramebuffer(t.FRAMEBUFFER,Ve.fb),t.viewport(0,0,mt,mt),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),ke&&!a&&(t.enable(t.BLEND),t.blendFunc(t.CONSTANT_ALPHA,t.ONE_MINUS_CONSTANT_ALPHA),t.blendColor(0,0,0,.6)),t.useProgram(o.P.copy.p),t.uniform4fv(o.P.copy.uP,T),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,Oe.tex),t.uniform1i(o.P.copy.uS,2),t.bindVertexArray(o.vEmpty),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.BLEND)},ye=[];for(const a of[1,3,4,5,6,7,10,11,12,20,21,22,28,30,33,34,35,36,38,39])ye.push(a*4,a*4+1,a*4+2,a*4+3);ye.push(23*4+3,29*4,29*4+1,31*4,31*4+1,31*4+2);const $e=ye.length,ba=()=>{const a=u.tmK,r=S.eye,s=S.fw,n=S.rt;(!a||a[0]!==r[0]||a[1]!==r[1]||a[2]!==r[2]||a[3]!==s[0]||a[4]!==s[1]||a[5]!==s[2]||a[6]!==n[0]||a[7]!==n[2])&&(u.tmK=[r[0],r[1],r[2],s[0],s[1],s[2],n[0],n[2]],t.bindFramebuffer(t.FRAMEBUFFER,u.tm.fb),t.viewport(0,0,h,h),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.useProgram(o.P.mar.p),t.uniform4fv(o.P.mar.uP,T),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.mar.uN2,0),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,u.lay),t.uniform1i(o.P.mar.uL,5),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,u.rid.tex),t.uniform1i(o.P.mar.uR,6),t.bindVertexArray(o.vEmpty),t.drawArrays(t.TRIANGLES,0,3)),t.bindFramebuffer(t.FRAMEBUFFER,Ke.fb),t.viewport(0,0,h,h),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.depthMask(!0),t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.useProgram(o.P.grass.p),t.uniform4fv(o.P.grass.uP,T),t.uniformMatrix4fv(o.P.grass.uVP,!1,fa),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.grass.uN2,0),t.bindVertexArray(kt.v),t.bindBuffer(t.ARRAY_BUFFER,kt.b);{const _=S.eye,c=S.fw,y=S.rt,X=S.up,rt=1/Math.hypot(1,ct),K=kt.pts;let J=-1;for(let Z=0;Z<=kt.NC;Z++){let Pt=!1;if(Z<kt.NC&&kt.cnt[Z]>kt.st[Z]){Pt=!0;for(let tt=0;tt<4&&Pt;tt++){let wt=!0;for(let Q=Z*36;Q<Z*36+36;Q+=3){const Y=K[Q]-_[0],Et=K[Q+1]-_[1],Pe=K[Q+2]-_[2],Je=Y*c[0]+Et*c[1]+Pe*c[2],Ne=tt<2?Y*y[0]+Et*y[1]+Pe*y[2]:Y*X[0]+Et*X[1]+Pe*X[2];if((tt&1?-Ne:Ne)-ct*Je<=1.7/rt){wt=!1;break}}wt&&(Pt=!1)}}else if(Z<kt.NC)continue;if(Pt&&J<0&&(J=Z),!Pt&&J>=0){const tt=kt.st[J],wt=kt.cnt[Z-1],Q=tt*48;t.vertexAttribPointer(1,4,t.FLOAT,!1,48,Q),t.vertexAttribPointer(2,2,t.FLOAT,!1,48,Q+16),t.vertexAttribPointer(3,4,t.FLOAT,!1,48,Q+24),t.vertexAttribPointer(4,2,t.FLOAT,!1,48,Q+40),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,o.bladeVerts,wt-tt),J=-1}}}t.disable(t.DEPTH_TEST),je();let f=0;if(u.q){let _=!!u.qK&&u.qOwn===T;if(_){for(let c=0;c<$e;c++)if(u.qK[c]!==T[ye[c]]){_=!1;break}}if(_)f=2;else{u.qK=u.qK||new Float32Array($e);for(let c=0;c<$e;c++)u.qK[c]=T[ye[c]];u.qOwn=T,u.qOK=!1}}t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.useProgram(o.P.comp.p),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.comp.uN2,0),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,u.lay),t.uniform1i(o.P.comp.uL,5),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,u.rid.tex),t.uniform1i(o.P.comp.uR,6),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,u.tm.tex),t.uniform1i(o.P.comp.uT,7),t.bindVertexArray(o.vEmpty),f===2&&!u.qOK&&(T[161]=1,t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.comp.uQ,3),t.bindFramebuffer(t.FRAMEBUFFER,u.q.fb),t.viewport(0,0,h,h),t.uniform4fv(o.P.comp.uP,T),t.drawArrays(t.TRIANGLES,0,3),u.qOK=!0),T[161]=f,t.bindFramebuffer(t.FRAMEBUFFER,Ke.fb),t.viewport(0,0,h,h),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.depthMask(!1),t.uniform4fv(o.P.comp.uP,T),u.q&&(t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,u.q.tex),t.uniform1i(o.P.comp.uQ,3)),t.drawArrays(t.TRIANGLES,0,3),T[161]=0,t.depthMask(!0),t.depthFunc(t.LESS),t.disable(t.DEPTH_TEST),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,h,h),t.useProgram(o.P.fin.p),t.uniform4fv(o.P.fin.uP,T),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,Ke.tex),t.uniform1i(o.P.fin.uS,4),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,Ve.tex),t.uniform1i(o.P.fin.uC,2),t.bindVertexArray(o.vEmpty),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)};let ya=null;const co=(a,r)=>{r=Math.min(Math.max(r||0,0),.25),_t=a,o.tick=(o.tick||0)+1;const s=u.key!==At;s&&ya(),u.use=o.tick,ma(),ro(r),e.input.down&&B&&B.moved<.025&&B.t>.35||(ue=Math.max(0,ue-r*.02));const f=1-Math.exp(-r/2.2),_=1-Math.exp(-r/9);for(let c=0;c<2;c++)it[c]+=(pe[c]-it[c])*f,Mt[c]+=(it[c]-Mt[c])*_;for(let c=dt.length-1;c>=0;c--)dt[c].age+=r,dt[c].age>70&&dt.splice(c,1);for(let c=It.length-1;c>=0;c--){const y=It[c];y.h+=y.v*r*(y.h>Ot?.5:1),y.h>Ot-300&&!y.hit&&(y.hit=!0,$t=Math.min(.35,$t+.12*y.s)),y.h>Ot+Ae*2.5&&It.splice(c,1)}if($t=Math.max(0,$t-r*.006),_t>=xa&&(xa=_t+7+30*j()*j(),dt.length>=3&&dt.shift(),dt.push({az:Qt+(le-Qt)*(.1+.8*j()),age:0,s:.5+.5*j()}),It.length<3&&It.push({h:-300,s:.22+.25*j(),v:110}),lt=Math.min(1.5,lt+.25)),lt=Math.max(0,lt-r*.03),b===2&&_t>=ha){const c=T[36]+T[116]*T[200],y=T[9*4+1]+T[201],X=T[9*4+2]+T[29*4+1]*T[200];qt={t0:_t,p:[c+(i()-.5)*de,y+(i()-.5)*Ae*.8,X+(i()-.5)*de],I:3+5*i()},_e=_e>0?_e-1:Math.floor(3*i()),ha=_t+(_e>0?.12+.5*i():8+32*i());const rt=Math.hypot(qt.p[0],qt.p[1],qt.p[2]);be.push({at:_t+rt/343,v:ee(2/(1+rt/4e3),.08,.6)})}for(let c=be.length-1;c>=0;c--)if(_t>=be[c].at){const y=be[c];be.splice(c,1),e.sound.hit("kick",y.v*.5),e.sound.hit("noise",y.v*.5,{cutoff:140,dur:3})}if(Ye-=r,Ye<=0){Ye=.45;const c=Math.hypot(it[0],it[1]);e.sound.hit("noise",.03+.1*c,{cutoff:260+1500*c,dur:1}),e.sound.hit("noise",.02+.05*lt,{cutoff:140,dur:1.2}),lt>.2&&i()<lt&&e.sound.hit("hat",.03*lt)}if(pa(),s){const c=fe,y=ve;ke=!1,fe=c^1,ve=Math.max(0,y-1),De(!0),je(),fe=c,ve=y}De(!1),ba(),ke=!0};ma(),pa();const lo=T.slice();u.tmK=null,u.qK=null,u.qOK=!1,o.link();const Pa=a=>{t.bindTexture(t.TEXTURE_2D,u.rid.tex),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.bindFramebuffer(t.FRAMEBUFFER,u.rid.fb),t.viewport(0,0,1024,256),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.useProgram(o.P.rb.p),t.uniform4fv(o.P.rb.uP,a),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.n2),t.uniform1i(o.P.rb.uN2,0),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,u.lay),t.uniform1i(o.P.rb.uL,5),t.bindVertexArray(o.vEmpty),t.drawArrays(t.TRIANGLES,0,3)};return Pa(T),ya=()=>{ra(),Oe=u.rtH,Ve=u.rtC,u.tmK=null,u.qK=null,u.qOK=!1,Pa(lo)},De(!0),je(),De(!1),ba(),ke=!0,co}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
