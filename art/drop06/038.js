// Stone Church: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/038.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(sa){sa&&function(){"use strict";const ua=new WeakMap,k=Math.PI/180,Ye=Math.PI*2,C=(r,e,y)=>r<e?e:r>y?y:r,ke=(r,e,y)=>r+(e-r)*y,ut=(r,e,y)=>{const w=C((y-r)/(e-r),0,1);return w*w*(3-2*w)},fe=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler2DArray;
uniform int uOne;
float at2(float y, float x){ float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-30)); if (ay > ax) a = 1.5707963 - a; if (x < 0.) a = 3.1415927 - a; return y < 0. ? -a : a; }
`,ye=`#version 300 es
void main(){ vec2 p = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1)) * 4. - 1.; gl_Position = vec4(p, 0., 1.); }`,fa=`
float shapeSD(vec2 q, vec2 h, float k){
  vec2 d = abs(q) - h;
  if (k < .5) return length(max(d, 0.)) + min(max(d.x, d.y), 0.);
  if (k > 2.5) return length(q) - h.x;
  float ys = k < 1.5 ? h.y - h.x : h.y - 1.732 * h.x;
  if (q.y <= ys) return max(d.x, d.y);
  if (k < 1.5) return length(vec2(q.x, q.y - ys)) - h.x;
  float R = 2. * h.x;
  return length(vec2(abs(q.x) + R - h.x, q.y - ys)) - R;
}
`,Qe=`
uniform vec3 uBMin, uBMax;
uniform vec4 uFM[5];
uniform vec2 uIdRes;
uniform sampler2D uId;
uniform sampler2D uWD;
uniform vec4 uRuin;
uniform vec4 uPil[16];
uniform int uNP;
`+fa+`
int winAt(int f, vec2 lc){
  vec4 m = uFM[f];
  vec2 u = clamp((lc - m.xy) * m.zw, 0., .9999);
  ivec2 c = ivec2(u * uIdRes); c.y += f * int(uIdRes.y);
  return int(texelFetch(uId, c, 0).r * 255. + .5) - 1;
}
float rag(float s){
  float h = uRuin.y + uRuin.z * (.5 * sin(s * .23 + uRuin.w) + .3 * sin(s * .61 + 2. * uRuin.w) + .2 * sin(s * 1.7 + 3. * uRuin.w));
  return floor(h / .4) * .4;
}
float ragF(int f, vec3 q){ return f < 2 ? rag(q.z + float(f) * 17.) : rag(q.x + float(f) * 17.) + (f == 2 ? 5.5 : 0.); }
`,kt=`
uniform sampler2DArray uGl;
uniform float uLR;
uniform vec4 uGlow[16];
int exitF(vec3 p, vec3 L, out float t){
  vec3 Ls = vec3(abs(L.x) < 1e-5 ? 1e-5 : L.x, max(L.y, 1e-5), abs(L.z) < 1e-5 ? 1e-5 : L.z);
  float tx = ((Ls.x > 0. ? uBMax.x : uBMin.x) - p.x) / Ls.x;
  float tz = ((Ls.z > 0. ? uBMax.z : uBMin.z) - p.z) / Ls.z;
  float ty = (uBMax.y - p.y) / Ls.y;
  if (tx < tz && tx < ty) { t = tx; return Ls.x > 0. ? 0 : 1; }
  if (tz < ty) { t = tz; return Ls.z > 0. ? 2 : 3; }
  t = ty; return 4;
}
vec2 fLoc(int f, vec3 q){ return f < 2 ? q.zy : (f < 4 ? q.xy : q.xz); }
float fE(int f, vec3 L){ return f < 2 ? abs(L.x) : (f < 4 ? abs(L.z) : L.y); }
float glowOf(int id){ return uGlow[id >> 2][id & 3]; }
vec3 sunThru(vec3 p, vec3 L, out float tw, float lb){
  float t; int f = exitF(p, L, t); tw = max(t, 0.);
  vec3 q = p + L * t;
  vec2 lc = fLoc(f, q);
  float bl = t * .0047 + .004;
  if (uRuin.x > .5) {
    if (f == 4) return vec3(1.);
    float o = clamp((q.y - ragF(f, q)) / bl + .5, 0., 1.);
    if (o > .99) return vec3(1.);
  }
  int id = winAt(f, lc);
  if (id < 0) return vec3(0.);
  vec4 A = texelFetch(uWD, ivec2(0, id), 0), B = texelFetch(uWD, ivec2(1, id), 0), C = texelFetch(uWD, ivec2(2, id), 0);
  vec2 l2 = fLoc(f, q + L * (B.w / max(fE(f, L), .02)));
  vec2 d1 = lc - A.xy, d2 = l2 - A.xy;
  float m = clamp(.5 - shapeSD(d1, A.zw + B.z, B.y) / bl, 0., 1.) * clamp(.5 - shapeSD(d2, A.zw, B.y) / bl, 0., 1.);
  if (m <= 0.) return vec3(0.);
  vec2 uv = C.xy + (d2 / (2. * A.zw) + .5) * C.zw;
  float tpm = uLR * C.z / (2. * A.z);
  vec3 T = textureLod(uGl, vec3(uv, B.x), log2(max(bl * tpm, 1.)) + lb).rgb;
  return T * m * (1. + glowOf(id) * 2.2);
}
float pilOcc(vec3 p, vec3 L, float tmax){
  vec2 d = L.xz; float dd = max(dot(d, d), 1e-6), o = 1.;
  for (int i = 0; i < uNP; i++) {
    vec4 P = uPil[i]; vec2 oc = P.xy - p.xz; float tc = dot(oc, d) / dd;
    if (tc <= 0. || tc > tmax) continue;
    if (p.y + L.y * tc > P.w) continue;
    float dist = length(oc - d * tc), pen = .015 + tc * .0047;
    o *= smoothstep(P.z - pen, P.z + pen, dist);
  }
  return o;
}
`,eo=`
uniform float uH, uVt;
uniform vec4 uHall, uTv, uTa, uRib, uPR, uPS, uPw, uPx, uSt, uAl, uRk;
float sdBox(vec3 p, vec3 b){ vec3 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.); }
float carve(int f, vec2 lc, float ff){
  if (ff > .9) return ff;
  int id = winAt(f, lc);
  if (id < 0) return ff;
  vec4 A = texelFetch(uWD, ivec2(0, id), 0), B = texelFetch(uWD, ivec2(1, id), 0);
  float e = -ff;
  float sd = shapeSD(lc - A.xy, A.zw + B.z * clamp(1. - e / max(B.w, .01), 0., 1.), B.y);
  return max(ff, min(-sd, B.w - e));
}
float arcF(float x, float y, float hs, float R){ return y < uH ? 1e3 : R - length(vec2(x + R - hs, y - uH)); }
float trF(float az, float y, vec4 T, float b){ return y < T.w ? b - az : T.x - length(vec2(az + T.y, y - T.z)); }
vec2 mapM(vec3 p){
  vec2 r = vec2(p.y, 1.);
  if (uSt.y > 0.) { float s = sdBox(p - vec3(0., (uSt.y - .5) * .5, uSt.x + 25.), vec3(30., (uSt.y + .5) * .5, 25.)); if (s < r.x) r = vec2(s, 14.); }
  float ax = abs(p.x);
  int fs = p.x > 0. ? 0 : 1;
  float w = carve(fs, p.zy, uBMax.x - ax);
  if (uRuin.x > .5) w = max(w, p.y - rag(p.z + float(fs) * 17.));
  else w = min(w, max(uBMax.x - .38 - ax, p.y - .46));
  int fe = p.z > (uBMin.z + uBMax.z) * .5 ? 2 : 3;
  float we = carve(fe, p.xy, fe == 2 ? uBMax.z - p.z : p.z - uBMin.z);
  if (uRuin.x > .5) we = max(we, p.y - rag(p.x + float(fe) * 17.) - (fe == 2 ? 5.5 : 0.));
  w = min(w, we);
  if (w < r.x) r = vec2(w, 2.);
  if (uVt < 1.5) {
    float zl = mod(p.z - uRib.x, uRib.y) - uRib.y * .5, az = abs(zl), b = uRib.y * .5;
    float fl, ft = -1e3;
    if (uHall.w > .5) {
      if (ax < uHall.x) { fl = arcF(ax, p.y, uHall.x, uHall.y); ft = trF(az, p.y, uTv, b); }
      else { fl = arcF(abs(ax - (uHall.x + uBMax.x) * .5), p.y, (uBMax.x - uHall.x) * .5, uHall.z); ft = trF(az, p.y, uTa, b); }
    } else fl = arcF(ax, p.y, uBMax.x, uHall.y);
    float v = max(fl, ft);
    if (v < r.x) r = vec2(v, 4.);
    if (uHall.w > .5) {
      float dr = max(abs(fl - ft) * .5 - .11, v - .26);
      if (dr < r.x) r = vec2(dr, 13.);
      float wa = max(max(abs(ax - uHall.x) - .3, -trF(az, p.y, uTa, b)), uH - .3 - p.y);
      if (wa < r.x) r = vec2(wa, 13.);
    }
    if (uRib.z > 0.) {
      float k = clamp(floor((p.z - uRib.x) / uRib.y + .5), 0., uRib.z - 1.);
      float tr = max(abs(p.z - uRib.x - k * uRib.y) - uRib.w, fl - .3);
      if (tr < r.x) r = vec2(tr, 13.);
    }
  } else if (uVt < 2.5) {
    float cv = carve(4, p.xz, uH - p.y);
    if (cv < r.x) r = vec2(cv, 4.);
    if (uRib.z > 0.) {
      float k = clamp(floor((p.z - uRib.x) / uRib.y + .5), 0., uRib.z - 1.);
      float bm = max(abs(p.z - uRib.x - k * uRib.y) - uRib.w, uH - p.y - .6);
      if (bm < r.x) r = vec2(bm, 13.);
    }
  }
  if (uPR.w > .5) {
    float k = clamp(floor((p.z - uPR.y) / uPR.z + .5), 0., uPR.w - 1.);
    vec2 q = vec2(ax - uPR.x, p.z - uPR.y - k * uPR.z);
    vec4 P = uPil[int(k) + (p.x > 0. ? int(uPR.w) : 0)];
    float a = at2(q.y, q.x);
    float yc = p.y - uH;
    float rr = P.z + uPS.x * cos(a * uPS.y) * smoothstep(.5, .8, p.y) * (1. - smoothstep(-.55, -.3, yc)) + .2 * (1. - smoothstep(.3, .42, p.y)) + .09 * (1. - smoothstep(.6, .72, p.y))
             + .05 * exp(-(p.y - .84) * (p.y - .84) * 500.) + .05 * exp(-(yc + 1.) * (yc + 1.) * 400.)
             + uPS.z * (.25 + .75 * smoothstep(-.95, -.3, yc)) * step(-.95, yc) + .07 * step(-.24, yc);
    float d = (length(q) - rr) * .8;
    d = max(d, p.y - P.w - .3 * sin(a * 3. + P.x * 7.) * step(P.w, uH - .5));
    if (d < r.x) r = vec2(d, 3.);
  }
  if (uPw.x > .5) {
    float k = clamp(floor((p.z - uPw.y) / uPw.z + .5), 0., uPw.w - 1.);
    vec3 q = vec3(ax, p.y, p.z - uPw.y - k * uPw.z);
    float xm = (uPx.x + uPx.y) * .5, hx = (uPx.y - uPx.x) * .5, d;
    if (uPw.x < 1.5) {
      d = sdBox(q - vec3(xm, .43, .02), vec3(hx, .022, .2));
      d = min(d, sdBox(q - vec3(xm, .7, -.19 - (q.y - .45) * .1), vec3(hx, .25, .02)));
      { float he = .31 + .21 * smoothstep(.12, -.13, q.z) + .012 * cos(q.z * 24.);   // bench end: low arm in front, a rounded shoulder up to the back
        vec3 eb = abs(vec3(abs(q.x - xm) - hx, q.y - he, q.z + .02)) - vec3(.026, he - .03, .22);
        d = min(d, (length(max(eb, 0.)) + min(max(eb.x, max(eb.y, eb.z)), 0.) - .03) * .7); }
      d = min(d, sdBox(q - vec3(xm, .1, .3), vec3(hx - .05, .035, .06)));
      d = min(d, sdBox(q - vec3(xm, .86, -.27), vec3(hx, .015, .07)));
    } else {
      float per = .56, nc = max(floor((uPx.y - uPx.x) / per), 1.);
      float j = clamp(floor((q.x - uPx.x) / per), 0., nc - 1.);
      vec3 c = q - vec3(uPx.x + (j + .5) * per, 0., 0.);
      d = sdBox(c - vec3(0., .45, 0.), vec3(.21, .022, .2));
      d = min(d, sdBox(vec3(abs(c.x) - .185, c.y - .22, abs(c.z) - .175), vec3(.017, .22, .017)));
      d = min(d, sdBox(vec3(abs(c.x) - .185, c.y - .66, c.z + .175), vec3(.017, .22, .017)));
      d = min(d, sdBox(c - vec3(0., .8, -.175), vec3(.2, .05, .014)));
      d = min(d, sdBox(c - vec3(0., .62, -.175), vec3(.2, .02, .012)));
    }
    if (d < r.x) r = vec2(d, uPw.x < 1.5 ? 7. : 8.);
  }
  if (uAl.w > .5) {
    float d = min(sdBox(p - vec3(0., uSt.y + .48, uAl.x), vec3(uAl.y, .48, uAl.z)), sdBox(p - vec3(0., uSt.y + 1.0, uAl.x), vec3(uAl.y + .08, .045, uAl.z + .08)));
    if (d < r.x) r = vec2(d, 11.);
  }
  if (uRk.z > .5) {
    vec3 q = p - vec3(uRk.x, 0., uRk.y);
    float d = sdBox(q - vec3(0., .86 + q.z * .5, 0.), vec3(.55, .02, .26));
    d = min(d, sdBox(vec3(abs(q.x) - .5, q.y - .43, abs(q.z) - .2), vec3(.02, .43, .02)));
    d = min(d, sdBox(q - vec3(0., .25, 0.), vec3(.5, .012, .2)));
    if (d < r.x) r = vec2(d, 9.);
    vec2 cc = vec2(clamp(floor(q.x / .13 + .5), -3., 3.) * .13, clamp(floor(q.z / .15 + .5), -1., 1.) * .15);
    float cy = .89 + cc.y * .5;
    float dc = max(length(q.xz - cc) - .028, abs(q.y - cy - .03) - .03);
    if (dc < r.x) r = vec2(dc, 10.);
  }
  return r;
}
`,to=`
uniform sampler2D uN;
uniform vec3 uSA, uSB, uFA;
uniform vec4 uSK, uEq;
float h1(float n){ return fract(sin(n * 12.9898) * 43758.5453); }
vec4 ashlar(vec2 st, float ch, float sd, vec3 base){
  float row = floor(st.y / ch);
  float len = mix(.5, 1.05, h1(row * 7.31 + sd));
  float x = st.x + h1(row * 3.17 + sd) * len;
  float col = floor(x / len);
  vec2 f = vec2(fract(x / len) * len, fract(st.y / ch) * ch);
  float jd = min(min(f.x, len - f.x), min(f.y, ch - f.y));
  float bh = h1(row * 13.7 + col * 1.31 + sd);
  float n1 = texture(uN, st * .23).r, n2 = texture(uN, st * 1.7).b, n3 = texture(uN, st * .05).g;
  vec3 c = base * (.83 + .32 * bh) * (.8 + .4 * n1) * (.92 + .16 * n2) * (.85 + .3 * n3);
  c = mix(c, c * vec3(1.08, .98, .86), step(.7, h1(bh * 91.7)));
  float j = smoothstep(.005, .018, jd);
  c = mix(base * vec3(.7, .67, .62), c, j);
  return vec4(c, j * (.75 + .25 * n2) - .2 * smoothstep(.62, .85, n2));
}
vec4 floorS(vec3 p){
  if (uSK.y > .5) {   // ruin: grass, fallen leaves, broken flags
    float n1 = texture(uN, p.xz * .09).r, n2 = texture(uN, p.xz * .6).g, n3 = texture(uN, p.xz * 2.3).b, n4 = texture(uN, p.xz * 7.).a;
    vec3 g = vec3(.05, .08, .025) * (.7 + .6 * n2);
    float lv = smoothstep(.35, .6, n1 * .7 + n3 * .3);
    float hue = texture(uN, p.xz * 1.9 + 3.1).r;
    vec3 l = hue < .4 ? vec3(.42, .12, .02) : (hue < .62 ? vec3(.5, .3, .04) : vec3(.18, .08, .03));
    l *= .6 + .7 * n4;
    vec3 c = mix(g, l, lv);
    vec4 fl = ashlar(p.xz, .8, 4., uFA);
    float st = smoothstep(.62, .7, 1. - n1) * (1. - lv);
    return vec4(mix(c, fl.rgb * .8, st), mix(n4 * .6, fl.a, st));
  }
  float rowL = .78;
  float row = floor(p.z / rowL);
  float w = mix(.55, 1.15, h1(row * 5.1 + 2.));
  float x = p.x + h1(row * 2.7 + 1.) * 3.;
  float col = floor(x / w);
  vec2 f = vec2(fract(x / w) * w, fract(p.z / rowL) * rowL);
  float jd = min(min(f.x, w - f.x), min(f.y, rowL - f.y));
  float bh = h1(row * 11.3 + col * 3.7);
  float n1 = texture(uN, p.xz * .31).r, n2 = texture(uN, p.xz * 1.3).b, n3 = texture(uN, p.xz * .06).g;
  vec3 c = uFA * (.75 + .45 * bh) * (.78 + .44 * n1) * (.9 + .2 * n2);
  if (bh > .975) c = mix(c, vec3(.13, .13, .135) * (.8 + .4 * n1), .7);
  float wear = 1. - smoothstep(.6, 1.4, abs(p.x));
  c *= (.85 + .3 * n3) * (1. + .12 * wear);
  float j = smoothstep(.004, .011, jd);
  c = mix(c * .45, c, j);
  if (uEq.z > .5) {
    float ln = uEq.w < .5 ? abs(p.z - uEq.y) : abs(p.x - uEq.x);
    float dm = length(p.xz - uEq.xy);
    float a = at2(p.z - uEq.y, p.x - uEq.x);
    float star = dm - (.12 + .07 * cos(a * 8.));
    float brass = max(1. - smoothstep(.012, .02, ln), max(1. - smoothstep(.0, .015, abs(dm - .3) - .012), 1. - smoothstep(0., .01, star)));
    c = mix(c, vec3(.55, .38, .1) * (.8 + .3 * n2), brass);
    j = max(j * (1. - brass), brass);
  }
  return vec4(c, j * (.85 + .15 * n2));
}
vec4 surf(vec3 p, vec3 n, float m){
  if (m < 1.5 || (m > 13.5 && n.y > .7)) return floorS(p);
  if (m > 6.5 && m < 7.5) {
    float g = texture(uN, vec2(p.x * .07, p.y * 2.3 + p.z * 2.3)).r, g2 = texture(uN, vec2(p.x * .5, p.y * 9. + p.z * 9.)).b;
    return vec4(vec3(.21, .12, .058) * (.6 + .7 * g) * (.85 + .3 * g2), g2);
  }
  if (m > 7.5 && m < 8.5) {
    float g = texture(uN, vec2(p.x * .5 + p.z, p.y * 4.)).r;
    if (abs(p.y - .47) < .025 && n.y > .5) { float wv = sin(p.x * 160.) * sin(p.z * 160.); return vec4(vec3(.3, .23, .11) * (.8 + .25 * wv), .5 + .5 * wv); }
    return vec4(vec3(.24, .13, .06) * (.7 + .5 * g), g);
  }
  if (m > 8.5 && m < 9.5) return vec4(vec3(.025), .5);
  if (m > 9.5 && m < 10.5) return vec4(vec3(.8, .74, .6), .5);
  vec3 an = abs(n);
  vec2 st = an.x > an.y && an.x > an.z ? p.zy : (an.z > an.y ? p.xy : p.xz);
  vec3 base = uSA;
  float sd = 1.;
  if (m > 2.5 && m < 3.5) {   // pillar drums
    float k = clamp(floor((p.z - uPR.y) / uPR.z + .5), 0., uPR.w - 1.);
    vec2 q = vec2(abs(p.x) - uPR.x, p.z - uPR.y - k * uPR.z);
    st = vec2(at2(q.y, q.x) * .6, p.y);
    base = uSB; sd = 7. + k;
    vec4 a = ashlar(st, .48, sd, base);
    a.rgb *= 1. - .25 * smoothstep(1.4, 0., p.y);
    return a;
  }
  if (m > 3.5 && m < 4.5 && uSK.x < 1.5) { // vault webs: plaster over rubble
    float n1 = texture(uN, st * .15).r, n2 = texture(uN, st * 1.1).g;
    vec3 c = mix(uSA, vec3(dot(uSA, vec3(.33))), .2) * 1.08 * (.86 + .25 * n1) * (.95 + .1 * n2);
    return vec4(c, n2);
  }
  float y = p.y;
  vec4 a;
  if (uSK.x > 1.5 && uSK.x < 2.5) {   // board-marked concrete
    float bd = fract(st.y / .14), bi = floor(st.y / .14);
    float gr = texture(uN, vec2(st.x * .08 + h1(bi) * 7., st.y * 3.)).r;
    vec3 c = base * (.86 + .14 * h1(bi * 3.3)) * (.82 + .3 * gr) * (.9 + .2 * texture(uN, st * .3).g);
    float jd = min(bd, 1. - bd) * .14;
    float j = smoothstep(.0, .006, jd);
    vec2 th = abs(fract(st / vec2(.9, .56) + .5) - .5) * vec2(.9, .56);
    float hole = smoothstep(.012, .018, length(th));
    c *= mix(.6, 1., hole) * mix(.85, 1., j);
    a = vec4(c, j * hole * (.6 + .4 * gr));
  } else {
    a = ashlar(st, uSK.w, sd, base);
    if (uSK.x > .5 && uSK.x < 1.5) { float n1 = texture(uN, st * .4).r; a.rgb = mix(uSA * (.92 + .1 * n1), a.rgb, .1); a.a = mix(.7 + .3 * n1, a.a, .25); }
    if (uSK.x > 2.5) a.rgb *= .9 + .2 * sin(st.y * 9. + texture(uN, st * .1).r * 6.);
  }
  float dmp = 1. - smoothstep(.0, 1.1, y);
  a.rgb *= 1. - .3 * dmp;
  a.rgb = mix(a.rgb, a.rgb * vec3(.85, .95, .8), dmp * .4);
  a.rgb *= 1. - .3 * smoothstep(uH * .6, uH * 1.5, y);
  if (m > 10.5 && m < 11.5) a.rgb *= 1.15;
  if (m > 12.5 && m < 13.5) a.rgb *= 1.1;
  return a;
}
`,ao=fe+`
out vec4 o;
float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p, float per){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h21(mod(i, per)), h21(mod(i + vec2(1., 0.), per)), f.x), mix(h21(mod(i + vec2(0., 1.), per)), h21(mod(i + 1., per)), f.x), f.y); }
float fbm(vec2 uv, float per){ float s = 0., a = .5, t = 0.; for (int i = 0; i < 5 * uOne; i++) { s += a * vn(uv * per + float(i) * 17.3, per); t += a; per *= 2.; a *= .5; } return clamp((s / t - .5) * 1.9 + .5, 0., 1.); }
void main(){ vec2 uv = gl_FragCoord.xy / 256.; o = vec4(fbm(uv, 4.), fbm(uv, 8.), fbm(uv, 16.), h21(floor(gl_FragCoord.xy))); }`,oo=`
uniform vec2 uHalf, uRes; uniform float uShape, uStyle, uKind, uSeed, uVar;
uniform vec3 uPal[7];
uniform sampler2D uN;
out vec4 o;
const float TAU = 6.2831853;
`+fa+`
float hs(vec2 p){ return fract(sin(dot(p + uSeed * 1.37, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hs2(vec2 p){ return fract(sin(vec2(dot(p + uSeed, vec2(127.1, 311.7)), dot(p + uSeed, vec2(269.5, 183.3)))) * 43758.5453); }
#if GV > 1
vec3 vor(vec2 x){
  vec2 n = floor(x), f = fract(x), mg = vec2(0.); float d1 = 8., d2 = 8.;
  for (int k = 0; k < 9 * uOne; k++) {
    vec2 g = vec2(float(k % 3 - 1), float(k / 3 - 1)), r = g + hs2(n + g) * .8 + .1 - f; float d = dot(r, r);
    if (d < d1) { d2 = d1; d1 = d; mg = g; } else if (d < d2) d2 = d;
  }
  return vec3((sqrt(d2) - sqrt(d1)) * .5, hs(n + mg), hs(n + mg + 7.1));
}
#endif
float ld(float d, float w){ return smoothstep(w * .45, w, d); }
#if GV == 1
// one medallion: ruby ground, split petals with coloured hearts, a gold hub and a pearled white fillet
vec3 rosette(vec2 m, float R, float N, float h, out float L){
  float r = length(m) / R, a = at2(m.y, m.x);
  float pa = fract(a / TAU * N + .5) - .5, arc = r * R * TAU / N;
  L = ld((1. - r) * R, .02);
  if (r > .86) { float pb = fract(a / TAU * N * 3.); L = min(L, min(ld((r - .86) * R, .014), ld(min(pb, 1. - pb) * arc / 3., .012))); return uPal[3]; }
  if (r < .16) { L = ld((.16 - r) * R, .014); return uPal[2]; }
  float lp = r - (.36 + .44 * cos(pa * 3.1416));
  L = min(L, min(ld(abs(lp) * R, .016), ld((r - .16) * R, .014)));
  if (lp < 0.) {
    L = min(L, min(ld(abs(pa) * arc, .011), ld(abs(r - .46) * R, .012)));
    if (r < .46) return h < .5 ? uPal[4] : uPal[6];
    return (h < .35 ? uPal[3] : (h < .75 ? uPal[2] : uPal[3] * vec3(.75, 1., .8))) * (pa > 0. ? 1. : .8);
  }
  if (abs(pa) > .38 && r > .6) { L = min(L, ld((abs(pa) - .38) * arc, .011)); return uPal[0]; }
  return uPal[1];
}
// a medieval window: stone mullion and oculus on the wide lancets, then per light a block border, a stack of
// medallions and a blue trellis ground with ruby bosses
vec3 medWin(vec2 q, float sd, out float L){
  L = 1.;
  bool field = sd < -.99 && uKind > 1.5;
  vec2 p = q; float lw = uHalf.x, dl = sd, hsd = 0.;
  if (field) { p.x = (fract(q.x / 1.1 + .5) - .5) * 1.1; lw = .55; dl = abs(p.x) - lw; }
  vec2 mc = vec2(0.); float mR = 0., mN = 8.;
  if (!field && uShape > 1.5 && uHalf.x > .95) {
    float st = .085, hx = uHalf.x, ys = uHalf.y - 1.732 * hx, hy2 = (ys + .866 * hx + uHalf.y) * .5;
    float sx = q.x < 0. ? -1. : 1.;
    p = vec2(q.x - sx * hx * .5, q.y + uHalf.y - hy2);
    dl = shapeSD(p, vec2(hx * .5, hy2), 2.) + st;
    vec2 qo = q - vec2(0., ys + 1.118 * hx);
    float dOc = length(qo) - hx * .5 + st;
    if (dl > 0. && dOc > 0.) { L = 0.; return vec3(0.); }
    lw = hx * .5 - st; hsd = sx * 3.;
    if (dl > 0.) { mc = qo; mR = hx * .5 - st; mN = 6.; }
  }
  if (mR == 0.) {
    float bw = clamp(lw * .24, .07, .15);
    if (dl > -bw) {
      float u = (p.y + 30.) / .17 + hsd, fu = fract(u), h = hs(vec2(floor(u), 3.));
      L = ld(min(-dl - .0, min(abs(dl + bw), min(fu, 1. - fu) * .17)), .014);
      if (dl > -.032) { L = min(L, ld(abs(dl + .032), .012)); return uPal[3] * .7; }
      return h < .42 ? uPal[1] : (h < .7 ? uPal[2] : (h < .88 ? uPal[0] : uPal[4]));
    }
    float pitch = 2.3 * lw;
    float lim = max(floor((uHalf.y - lw * 3.4) / pitch), 0.);
    float ky = field ? floor(p.y / pitch + .5) : clamp(floor((p.y + hsd * .13 * pitch) / pitch + .5), -lim, lim);
    vec2 m = p - vec2(0., ky * pitch - hsd * .13 * pitch);
    float R = lw - bw - .03;
    if (length(m) < R) { mc = m; mR = R; mN = 6. + 2. * floor(hs(vec2(ky, 1. + hsd)) * 3.); hsd += ky; }
  }
  if (mR > 0.) return rosette(mc, mR, mN, hs(vec2(hsd, 5.)), L);
  vec2 g = vec2(p.x + p.y, p.y - p.x) / .21;
  vec2 fg = abs(fract(g) - .5);
  float dc = length(.5 - fg) * .148;
  if (dc < .034) { L = ld(.034 - dc, .011); return uPal[1]; }
  L = min(ld((.5 - max(fg.x, fg.y)) * .148, .011), ld(dc - .034, .011));
  float hq = hs(floor(g) + hsd);
  return uPal[0] * (.7 + .6 * hq) * (hq > .9 ? vec3(.6, 2.4, 1.1) : vec3(1.));
}
#endif
#if GV == 0
vec3 rose(vec2 q, out float L, bool open){
  float R = uHalf.x, rr = length(q), r = rr / R, a = at2(q.y, q.x);
  float N = uVar;
  float sec = a / TAU * N + .5, si = floor(sec), sf = fract(sec) - .5;
  float sw = .05 * R / 2.4 + .02;
  float dRing = min(min(abs(rr - .2 * R), abs(rr - .84 * R)), abs(rr - .985 * R)) - sw * .5;
  float dSp = (r > .2 && r < .84) ? abs(sf) * TAU / N * rr - sw * (.3 + .25 * r) : 1.;
  float a2 = a / TAU * 2. * N, sf2 = fract(a2) - .5;
  vec2 lq = vec2(rr * cos(sf2 * TAU / (2. * N)), rr * sin(sf2 * TAU / (2. * N))) - vec2(.915 * R, 0.);
  float dC = r > .84 ? abs(length(lq) - .052 * R) - sw * .3 : 1.;
  // cusped head of each light: a pointed arch near the outer ring
  vec2 hq = vec2(sf * TAU / N * rr, rr - .66 * R);
  float hw = TAU / N * .66 * R * .5 - sw * .4;
  float dHead = (r > .58 && r < .84) ? -shapeSD(hq - vec2(0., -.05 * R), vec2(hw, .13 * R), 2.) : 1.;
  dHead = max(dHead, 0.) * step(0., dHead) + (r > .58 && r < .84 && shapeSD(hq - vec2(0., -.05 * R), vec2(hw, .13 * R), 2.) > 0. ? -1. : 0.);
  float stone = min(min(dRing, dSp), dC);
  bool broken = open && hs(vec2(si, 9.)) < .35 && r > .3;
  if (stone < 0. && !broken) { L = 0.; return vec3(0.); }
  if (dHead < 0. && !broken && !open) { L = 0.; return vec3(0.); }
  L = ld(stone + sw * .0, .012);
  if (open) return vec3(.95);
  if (r < .2) {
    float pa = fract(a / TAU * 8.) - .5, pr = .1 + .06 * cos(pa * TAU);
    L = min(L, ld(abs(r - pr * 1.5) * R, .012));
    return r < pr * 1.5 ? uPal[2] : uPal[1];
  }
  if (r < .84) {
    vec2 mq = vec2(sf * TAU / N * rr, rr - .45 * R);
    float mr = min(TAU / N * .45 * R * .5 - sw, .14 * R);
    float dm = length(mq) - mr;
    L = min(L, ld(abs(dm), .012));
    if (dm < 0.) { float in2 = length(mq) - mr * .45; L = min(L, ld(abs(in2), .011)); return in2 < 0. ? uPal[2] : (mod(si, 2.) < 1. ? uPal[1] : uPal[4]); }
    float bs = abs(rr - .62 * R); L = min(L, ld(bs, .011));
    return (mod(si, 2.) < 1. ? uPal[0] : uPal[1]) * (rr > .62 * R ? 1. : .9);
  }
  float dcc = length(lq) - .052 * R;
  return dcc < 0. ? (mod(floor(a2), 2.) < 1. ? uPal[2] : uPal[3]) : uPal[0];
}
#endif
#if GV == 2
vec3 nouv(vec2 q, float sd, out float L){
  float tY = (q.y + uHalf.y) / (2. * uHalf.y);
  vec3 c = mix(uPal[1], uPal[3], smoothstep(.05, .85, tY));
  if (tY > .82) c = mix(c, uPal[6], smoothstep(.82, .95, tY));
  vec3 v = vor(q / .27 + 3.);
  L = ld(v.x * .27, .013);
  c *= .82 + .36 * v.y;
  if (sd > -.085) { L = min(L, ld(abs(sd + .085), .012)); return uPal[4]; }
  for (int i = 0; i < 3 * uOne; i++) {
    float fi = float(i);
    float x0 = (fi - 1.) * .52 * uHalf.x, wv = .2 * uHalf.x, ph = fi * 2.1 + uSeed;
    float top = uHalf.y * (.2 + .25 * fract(fi * .37 + uSeed * .1));
    float sx = x0 + wv * sin(q.y * 1.5 + ph);
    float ds = abs(q.x - sx) - .022;
    if (q.y < top) { if (ds < 0.) { L = ld(-ds + .002, .01); return uPal[0] * .8; } L = min(L, ld(ds, .011)); }
    float ly = clamp(floor(q.y / .48 + .5), -40., floor(top / .48) - 1.) * .48;
    float side = mod(ly / .48, 2.) < 1. ? 1. : -1.;
    vec2 lc = vec2(x0 + wv * sin(ly * 1.5 + ph) + side * .14, ly + .06);
    vec2 lq = q - lc; float ca = cos(side * .55), sa = sin(side * .55);
    lq = vec2(ca * lq.x + sa * lq.y, -sa * lq.x + ca * lq.y);
    float dl = length(lq / vec2(.16, .055)) - 1.;
    if (dl < 0.) { L = ld(-dl * .055, .011); L = min(L, ld(abs(lq.y) + .003, .009)); return mix(uPal[0], uPal[2], hs(lc)) * (.75 + .45 * smoothstep(-.12, .12, lq.x * side)); }
    vec2 fq = q - vec2(x0 + wv * sin(top * 1.5 + ph), top + .05);
    float fr = length(fq), fa = at2(fq.y, fq.x);
    float pet = .17 * (.62 + .38 * cos(fa * 5. + fi));
    if (fr < pet) { L = ld(min(pet - fr, abs(fr - .055)), .011); return fr < .055 ? uPal[4] : uPal[5]; }
  }
  return c;
}
#endif
#if GV == 3
vec3 modern(vec2 q, out float L){
  float cs = min(.42, max(uHalf.x * .42, .16));
  vec3 v = vor(q / cs + uSeed);
  L = smoothstep(.014, .024, v.x * cs);
  int k = (int(v.y * 4.99) + int(uSeed)) % 7;
  if (v.z < .25) k = 5;
  vec3 c = uPal[k];
  float fac = texture(uN, q * .9 + v.z * 3.).b, chip = texture(uN, q * 4.1 + v.z).a;
  return c * (.62 + .6 * fac) * (1. + .5 * step(.93, chip));
}
#endif
#if GV == 3
vec3 clearW(vec2 q, out float L, bool rnd){
  vec2 g = vec2(q.x / .12 + q.y / .19, -q.x / .12 + q.y / .19) * .5;
  vec2 f = fract(g);
  float d = min(min(f.x, 1. - f.x), min(f.y, 1. - f.y)) * .1;
  L = ld(d, .010);
  vec3 c = uPal[3] * (.9 + .12 * hs(floor(g)));
  if (rnd) {
    vec2 rc = vec2(0., uHalf.y * .3); float rr = min(uHalf.x * .62, .55);
    float r = length(q - rc) / rr;
    if (r < 1.) {
      float a = at2(q.y - rc.y, q.x - rc.x);
      L = ld(min(abs(r - 1.), min(abs(r - .78), abs(r - .55))) * rr, .012);
      if (r > .78) return uPal[0];
      if (r > .55) return uPal[2];
      float pa = fract(a / TAU * 8.) - .5, pr = .3 + .2 * cos(pa * TAU);
      L = min(L, ld(abs(r - pr) * rr, .01));
      return r < pr ? uPal[4] : uPal[1];
    }
  }
  return c;
}
#endif
#if GV == 0
vec3 openW(vec2 q, float sd, out float L){
  L = 1.;
  float mh = mix(-uHalf.y, uHalf.y * 1.2, hs(vec2(4., 1.)));
  if (abs(q.x) < .065 && q.y < mh) { L = 0.; return vec3(0.); }
  vec2 cell = floor(q * 3.5);
  if (sd > -.3 && hs(cell) < .22 && q.y < 0.) { L = ld(min(abs(fract(q.x * 3.5) - .5), abs(fract(q.y * 3.5) - .5)) * .28 + .0, .012); return uPal[int(hs(cell + 1.) * 6.99)]; }
  return vec3(.95);
}
#endif
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 q = (uv - .5) * 2. * uHalf;
  float L = 1., sd = shapeSD(q, uHalf, uShape);
  vec3 T;
  bool field = uKind > 1.5 && uKind < 2.5;
#if GV == 0
  if (uKind > .5 && uKind < 1.5) T = rose(q, L, false);
  else if (uKind > 3.5) T = rose(q, L, true);
  else T = openW(q, sd, L);
#elif GV == 1
  T = field ? medWin(q, -1., L) : medWin(q, sd, L);
#elif GV == 2
  T = nouv(q, field ? -1. : sd, L);
#else
  if (uStyle < 2.5) T = modern(q, L); else T = clearW(q, L, !field);
#endif
  if (uKind < .5 && uStyle != 2.) { float sb = abs(fract(q.y / .74 + .5) - .5) * .74; L = min(L, smoothstep(.011, .021, sb)); }
  if (uKind < 2.5) {
    float st = texture(uN, q * vec2(.35, 1.4) + uSeed).r, bub = texture(uN, q * 3.7 + uSeed).a;
    T *= (.78 + .4 * st) * (1. - .25 * step(.965, bub));
    T *= .82 + .18 * smoothstep(-uHalf.y, -uHalf.y + .8, q.y);
  }
  o = vec4(T * L, 1.);
}`,ro=fe+Qe+eo+`
uniform vec3 uCam; uniform mat3 uRot; uniform float uTan; uniform vec2 uBR; uniform int uSteps, uPass; uniform sampler2D uPos;
out vec4 o;
void main(){
  vec2 s = gl_FragCoord.xy / uBR * 2. - 1.;
  vec3 rd = normalize(uRot * vec3(s * uTan, 1.));
  vec2 tm = vec2(.05, 1.);
  if (uPass == 1) tm = texelFetch(uPos, ivec2(gl_FragCoord.xy), 0).xy;
  if (uPass == 1 && (tm.y < .5 || abs(tm.y - 5.) < .1)) { o = vec4(.5, .5, .5, 1.); return; }
  float t = tm.x; vec2 h = vec2(1.);
  vec3 p = uCam + rd * t, n = vec3(0.), k = vec3(0.);
  float occ = 0., w = 1., big = 1., hh = 0.;
  bool hit = false;
  int cnt = uPass == 1 ? 10 : uSteps;
  for (int i = 0; i < cnt; i++) {
    vec3 q = uCam + rd * t;
    if (uPass == 1) {
      if (i < 4) { k = vec3(float(((i + 3) >> 1) & 1), float((i >> 1) & 1), float(i & 1)) * 2. - 1.; q = p + k * .0015; }
      else { if (i == 4) n = normalize(n); hh = i < 9 ? .04 * float((i - 3) * (i - 3)) : 1.6; q = p + n * hh; }
    }
    h = mapM(q);
    if (uPass == 1) { if (i < 4) n += k * h.x; else if (i < 9) { occ += (hh - h.x) * w; w *= .62; } else big = clamp(h.x / 1.6, 0., 1.); }
    else {
      if (h.x < .0005 * t + .0006) { hit = true; break; }
      t += h.x * .9;
      if (t > 95.) break;
    }
  }
  if (uPass == 1) { o = vec4(n * .5 + .5, clamp(1. - occ * 1.1, 0., 1.) * (.55 + .45 * big)); return; }
  if (!hit && t > 95.) { o = vec4(t, 0., 0., 0.); return; }
  p = uCam + rd * t;
  float m = h.y;
  if (m > 1.5 && m < 2.5 || m > 3.5 && m < 4.5) {
    float ex = abs(p.x) - uBMax.x, ez = max(p.z - uBMax.z, uBMin.z - p.z), ey = p.y - uH;
    int f = -1; vec2 lc; float e;
    if (ex > .02 && ex >= ez) { f = p.x > 0. ? 0 : 1; lc = p.zy; e = ex; }
    else if (ez > .02) { f = p.z > uBMax.z ? 2 : 3; lc = p.xy; e = ez; }
    else if (uVt > 1.5 && uVt < 2.5 && ey > .02) { f = 4; lc = p.xz; e = ey; }
    if (f >= 0) {
      int id = winAt(f, lc);
      if (id >= 0) { vec4 A = texelFetch(uWD, ivec2(0, id), 0), B = texelFetch(uWD, ivec2(1, id), 0); if (e > B.w - .03 && shapeSD(lc - A.xy, A.zw, B.y) < .01) m = 5.; }
    }
  }
  o = vec4(t, m, 0., 0.);
}`,no=fe+Qe+`
uniform float uH; uniform vec4 uPR;
`+to+`
uniform sampler2D uPos, uNr; uniform vec3 uCam; uniform mat3 uRot; uniform float uTan; uniform vec2 uBR; uniform int uPass;
vec4 posAt(ivec2 px){ vec2 tm = texelFetch(uPos, px, 0).xy; vec2 s = (vec2(px) + .5) / uBR * 2. - 1.; vec3 rd = normalize(uRot * vec3(s * uTan, 1.)); return vec4(uCam + rd * tm.x, tm.y); }
out vec4 o;
void main(){
  ivec2 px = ivec2(gl_FragCoord.xy);
  vec4 P = posAt(px);
  vec4 N = texelFetch(uNr, px, 0);
  if (P.w < .5 || abs(P.w - 5.) < .1 || (uPass == 1 && P.w > 6.5 && P.w < 10.5)) { o = uPass == 1 ? N : vec4(0.); return; }
  vec3 n = N.xyz * 2. - 1.;
  vec3 t1 = normalize(abs(n.y) > .9 ? cross(n, vec3(1., 0., 0.)) : cross(n, vec3(0., 1., 0.))), t2 = cross(n, t1);
  float e = .004; vec4 hh[3];
  int cnt = uPass == 1 ? 3 : 1;
  for (int i = 0; i < cnt; i++) hh[i] = surf(P.xyz + (i == 1 ? t1 : (i == 2 ? t2 : vec3(0.))) * e, n, P.w);
  vec4 s = hh[0];
  if (uPass == 1) {
    float k = P.w < 1.5 ? .0035 : .006;
    n = normalize(n - (t1 * (hh[1].a - s.a) + t2 * (hh[2].a - s.a)) * k / e);
    o = vec4(n * .5 + .5, N.w * (.82 + .18 * s.a));
    return;
  }
  float gl = .03;
  if (P.w < 1.5 || P.w > 13.5) gl = (uSK.y > .5 ? .02 : uSK.z * (.6 + .4 * (1. - smoothstep(.6, 1.4, abs(P.x)))) * s.a);
  if (P.w > 6.5 && P.w < 7.5) gl = .28 + .3 * smoothstep(.2, .9, n.y);
  if (uEq.z > .5 && P.w < 1.5) { float ln = uEq.w < .5 ? abs(P.z - uEq.y) : abs(P.x - uEq.x); if (ln < .02 || abs(length(P.xz - uEq.xy) - .3) < .03) gl = .8; }
  o = vec4(s.rgb, gl);
}`,co=fe+Qe+kt+`
uniform sampler2D uPos, uN, uSh; uniform float uMixK, uFr;
uniform vec3 uCam; uniform mat3 uRot; uniform float uTan; uniform vec2 uBR; uniform float uSR, uT; uniform int uSS;
uniform vec3 uL, uE, uSky; uniform vec4 uAir; uniform float uExp;
vec4 posAt(ivec2 px){ vec2 tm = texelFetch(uPos, px, 0).xy; vec2 s = (vec2(px) + .5) / uBR * 2. - 1.; vec3 rd = normalize(uRot * vec3(s * uTan, 1.)); return vec4(uCam + rd * tm.x, tm.y); }
out vec4 o;
vec3 fOut(int f){ return f == 0 ? vec3(1., 0., 0.) : (f == 1 ? vec3(-1., 0., 0.) : (f == 2 ? vec3(0., 0., 1.) : (f == 3 ? vec3(0., 0., -1.) : vec3(0., 1., 0.)))); }
vec3 winRad(int f, vec3 rd, int id){
  float cs = max(dot(rd, uL), 0.);
  return (uSky + uE * (.05 * max(dot(uL, fOut(f)), 0.) + .18 * pow(cs, 16.) + .6 * pow(cs, 400.))) * .55 * clamp(9. / uExp, .06, 1.);
}
vec3 glare(vec3 rd){
  if (rd.y < -.25) return vec3(0.);
  float t; int f = exitF(uCam, rd, t);
  vec3 q = uCam + rd * t;
  vec2 lc = fLoc(f, q);
  if (uRuin.x > .5 && (f == 4 || q.y > ragF(f, q))) return vec3(0.);
  int id = winAt(f, lc);
  if (id < 0) return vec3(0.);
  vec4 A = texelFetch(uWD, ivec2(0, id), 0), B = texelFetch(uWD, ivec2(1, id), 0), D = texelFetch(uWD, ivec2(3, id), 0);
  float sd = max(shapeSD(lc - A.xy, A.zw, B.y), 0.) / (1. + t * .04);
  float g = (exp(-sd * 1.6) * .035 + exp(-sd * 9.) * .09) * smoothstep(-.15, .06, shapeSD(lc - A.xy, A.zw, B.y));
  return D.rgb * winRad(f, rd, id) * g * (1. + glowOf(id) * 2.);
}
void main(){
  vec2 s = gl_FragCoord.xy / uSR * 2. - 1.;
  vec3 rd = normalize(uRot * vec3(s * uTan, 1.));
  vec4 P = posAt(ivec2(gl_FragCoord.xy / uSR * uBR));
  float tm = P.w < .5 ? 70. : length(P.xyz - uCam);
  float tq = min(tm, 70.);
  float stp = tq / float(uSS);
  float j = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715))) + uFr * .618034);
  vec3 acc = vec3(0.);
  if (uL.y > 0. && uE.r + uE.g > .001) {
    for (int i = 0; i < uSS; i++) {
      float t = (float(i) + j) * stp;
      vec3 q = uCam + rd * t;
      if (q.y > uBMax.y) continue;
      float tw; vec3 T = sunThru(q, uL, tw, 1.2);
      if (T.r + T.g + T.b > .002) {
        T *= pilOcc(q, uL, tw);
        acc += T * (.55 + .9 * textureLod(uN, q.xz * .043 + vec2(q.y * .031, uT * .006), 0.).g);
      }
    }
  }
  float cs = dot(rd, uL), g = .5;
  float ph = .07 + .6 * (1. - g * g) / (12.566 * pow(1. + g * g - 2. * g * cs, 1.5));
  o = vec4(mix(texelFetch(uSh, ivec2(gl_FragCoord.xy), 0).rgb, acc * stp * uAir.y * ph * uE * 1.15 + glare(rd), uMixK), tm);
}`,io=r=>fe+(r?`#define MODC 1
`:"")+Qe+kt+`
#ifdef MODC
#define LBS (wid >= 0 ? 6. : 0.)
#define MODG .5
#define GLK 2.2   // the small pane at the funnel's far end is the brightest thing in it, not a dark card
uniform vec3 uSA;
#else
#define LBS 0.
#define GLK 1.
#endif
uniform sampler2D uPos, uAlb, uNrm, uSh, uN;
uniform vec3 uCam; uniform mat3 uRot; uniform float uTan; uniform vec2 uBR; uniform float uSize, uSR, uT, uExp, uCloud;
vec4 posAt(ivec2 px){ vec2 tm = texelFetch(uPos, px, 0).xy; vec2 s = (vec2(px) + .5) / uBR * 2. - 1.; vec3 rd = normalize(uRot * vec3(s * uTan, 1.)); return vec4(uCam + rd * tm.x, tm.y); }
uniform vec3 uL, uE, uSky, uBnc, uHaze, uZen, uHor;
uniform vec3 uAF[5];
uniform vec4 uAir, uPw, uPx, uCan, uEqG; uniform vec3 uWB;
uniform vec4 uBA[5], uBB[5]; uniform vec3 uBC[5];
out vec4 o;
float slab(vec3 ro, vec3 inv, vec3 bmin, vec3 bmax, out float ta){
  vec3 t0 = (bmin - ro) * inv, t1 = (bmax - ro) * inv, tn = min(t0, t1), tf = max(t0, t1);
  ta = max(max(tn.x, tn.y), tn.z); float tb = min(min(tf.x, tf.y), tf.z);
  return (ta < tb && ta > .012) ? 1. : 0.;
}
float furnOcc(vec3 p, vec3 L){
  if (uPw.x < .5 || p.y > .95 || p.z < uPw.y - 1.5 || p.z > uPw.y + uPw.z * uPw.w + 1.5) return 1.;
  float tb = (.95 - p.y) / max(L.y, 1e-3);
  float za = p.z, zb = p.z + L.z * tb;
  float k0 = max(floor((min(za, zb) - uPw.y) / uPw.z) - 1., 0.), k1 = min(ceil((max(za, zb) - uPw.y) / uPw.z) + 1., uPw.w - 1.);
  vec3 Ls = vec3(abs(L.x) < 1e-4 ? 1e-4 : L.x, L.y, abs(L.z) < 1e-4 ? 1e-4 : L.z), inv = 1. / Ls;
  bool chairs = uPw.x > 1.5;
  for (int i = 0; i < 9 * uOne; i++) {
    float k = k0 + float(i);
    if (k > k1) break;
    float zc = uPw.y + k * uPw.z, ta;
    vec3 lo = chairs ? vec3(-uPx.y, .43, zc - .2) : vec3(-uPx.y, .41, zc - .18), hi = chairs ? vec3(uPx.y, .47, zc + .2) : vec3(uPx.y, .455, zc + .22);
    for (int b = 0; b < 2 * uOne; b++) {
      if (b == 1) { lo = chairs ? vec3(-uPx.y, .58, zc - .19) : vec3(-uPx.y, .45, zc - .23); hi = chairs ? vec3(uPx.y, .85, zc - .16) : vec3(uPx.y, .95, zc - .16); }
      if (slab(p, inv, lo, hi, ta) > .5) {
        float hx = abs(p.x + L.x * ta);
        if (hx < uPx.x || hx > uPx.y) continue;
        if (chairs && fract((hx - uPx.x) / .56) > .79) continue;
        return 0.;
      }
    }
  }
  return 1.;
}
vec3 skyCol(vec3 rd){
  float e = max(rd.y, 0.);
  vec3 c = mix(uHor, uZen, pow(e, .45));
  float cs = max(dot(rd, uL), 0.);
  c += uE * (.012 * pow(cs, 6.) + .06 * pow(cs, 60.)) * (1. - .7 * uCloud);
  vec2 cp = rd.xz / (rd.y + .06) * .07 + vec2(uT * .0016, uT * .0007);
  float cl = texture(uN, cp).r * .62 + texture(uN, cp * 2.9 + .3).g * .28 + texture(uN, cp * 8.1).b * .1;
  float cov = smoothstep(.5 - .3 * uCloud, .78 - .15 * uCloud, cl);
  float lit = texture(uN, cp + uL.xz * .01).r;
  vec3 cc = mix(uHor * .7, uHor * 1.1 + uE * .05 * (1. - uCloud), smoothstep(.3, .8, cl - lit + .5));
  c = mix(c, cc, cov * smoothstep(-.02, .12, rd.y));
  c += uE * 30. * smoothstep(.99993, .99998, cs) * (1. - cov) * (1. - uCloud);
  return c;
}
int faceOf(vec3 p, out vec2 lc){
  float ex = abs(p.x) - uBMax.x, ez = max(p.z - uBMax.z, uBMin.z - p.z);
  if (ex >= ez && ex > 0.) { lc = p.zy; return p.x > 0. ? 0 : 1; }
  if (ez > 0.) { lc = p.xy; return p.z > uBMax.z ? 2 : 3; }
  lc = p.xz; return 4;
}
vec3 fOut(int f){ return f == 0 ? vec3(1., 0., 0.) : (f == 1 ? vec3(-1., 0., 0.) : (f == 2 ? vec3(0., 0., 1.) : (f == 3 ? vec3(0., 0., -1.) : vec3(0., 1., 0.)))); }
vec3 winRad(int f, vec3 rd, int id){
  float cs = max(dot(rd, uL), 0.);
  return (uSky + uE * (.05 * max(dot(uL, fOut(f)), 0.) + .18 * pow(cs, 16.) + .6 * pow(cs, 400.))) * .55 * clamp(9. / uExp, .06, 1.);
}
vec3 glassCol(vec3 p, vec3 rd, float dist, int f, vec2 lc, int id){
  if (id < 0) return vec3(0.);
  vec4 A = texelFetch(uWD, ivec2(0, id), 0), B = texelFetch(uWD, ivec2(1, id), 0), C = texelFetch(uWD, ivec2(2, id), 0);
  vec2 d = lc - A.xy;
  vec2 uv = C.xy + (d / (2. * A.zw) + .5) * C.zw;
  float tpm = uLR * C.z / (2. * A.z), foot = dist * 2. * uTan / uSize / max(abs(dot(rd, fOut(f))), .55);
  vec3 T = textureLod(uGl, vec3(uv, B.x), log2(max(foot * tpm, 1.))).rgb;
  float g = glowOf(id);
  float sh = 1. + g * (3.5 + 2.5 * texture(uN, uv * 3. + uT * .3).r);
  vec3 c = T * winRad(f, rd, id) * sh;
  c += vec3(.006, .0055, .005) * (1. - smoothstep(0., .04, dot(T, vec3(.33)))) * (dot(uAF[f], vec3(.33)) * 8. + .2);
  return c;
}
void main(){
  ivec2 px = ivec2(gl_FragCoord.xy * uBR / uSize);
  vec4 P = posAt(px);
  vec2 s = gl_FragCoord.xy / uSize * 2. - 1.;
  vec3 rd = normalize(uRot * vec3(s * uTan, 1.));
  vec3 col; float dist;
  if (P.w < .5) { col = skyCol(rd); dist = 70.; }
  else {
    vec3 p = P.xyz; dist = length(p - uCam);
    float ex = abs(p.x) - uBMax.x, ez = max(p.z - uBMax.z, uBMin.z - p.z), e = max(max(ex, ez), p.y - uBMax.y);
    vec2 wlc = vec2(0.); int wf = 0, wid = -1;
    if (e > .01) { wf = faceOf(p, wlc); wid = winAt(wf, wlc); }
    if (abs(P.w - 5.) < .1) col = glassCol(p, rd, dist, wf, wlc, wid) * GLK;
    else {
      vec4 A = texelFetch(uAlb, px, 0), N4 = texelFetch(uNrm, px, 0);
      vec3 n = normalize(N4.xyz * 2. - 1.); float ao = N4.w;
      vec3 alb = A.rgb;
#ifdef MODC
      // the deep openings' splays are rough render (no board marks or tie holes), and every light on them takes the
      // colours of the part of the small far pane beside it, mixed (one lookup at a fixed level)
      vec3 gk = vec3(1.);
      if (wid >= 0) {
        alb = uSA * .92;
        vec4 WA = texelFetch(uWD, ivec2(0, wid), 0), WB2 = texelFetch(uWD, ivec2(1, wid), 0), WC = texelFetch(uWD, ivec2(2, wid), 0);
        vec3 g0 = textureLod(uGl, vec3(WC.xy + clamp((wlc - WA.xy) / (2. * WA.zw) * .7 + .5, 0., 1.) * WC.zw, WB2.x), 3.).rgb;
        gk = mix(vec3(1.), g0 / max(max(g0.r, max(g0.g, g0.b)), .02), .8);
      }
#endif
      vec3 dir = vec3(0.);
      float ndl = dot(n, uL);
      if (ndl > 0. && uL.y > 0.) {
        vec3 po = p + n * .012;
        float tw; vec3 T = sunThru(po, uL, tw, LBS);
        if (T.r + T.g + T.b > .0005) dir = T * pilOcc(po, uL, tw) * furnOcc(po, uL) * ndl * uE;
      }
#ifdef MODC
      // the sun on a splay: a soft patch, not the pane drawn out into stripes
      if (wid >= 0) dir = dot(dir, vec3(.2126, .7152, .0722)) * gk * .22;
#endif
      vec3 amb = uAF[0] * pow(.5 + .5 * n.x, 2.) + uAF[1] * pow(.5 - .5 * n.x, 2.) + uAF[2] * pow(.5 + .5 * n.z, 2.)
               + uAF[3] * pow(.5 - .5 * n.z, 2.) + uAF[4] * pow(.5 + .5 * n.y, 2.) + uBnc * pow(.5 - .5 * n.y, 1.5);
      vec3 bn = vec3(0.);
      for (int i = 0; i < 5 * uOne; i++) {
        vec3 a = uBA[i].xyz, ab = uBB[i].xyz;
        vec3 v = a + ab * clamp(dot(p - a, ab) / max(dot(ab, ab), 1e-3), 0., 1.) - p;
        float d = sqrt(dot(v, v) + .6);
        bn += uBC[i] * (max(dot(n, v) / d, 0.) * .85 + .15) / (d * (d + uBA[i].w));
      }
      col = alb * (dir * .3183 + amb * ao + bn * (.35 + .65 * ao));
      {
        // window reveals glow with the glass's own diffuse light
        int f = wf, id = wid;
        {
          if (id >= 0) {
            vec4 WB = texelFetch(uWD, ivec2(1, id), 0), WD = texelFetch(uWD, ivec2(3, id), 0);
            vec3 rad = uSky + uE * .06 * max(dot(uL, fOut(f)), 0.);
            float fdir = .45 + .55 * max(dot(n, -fOut(f)) * .5 + .5, 0.);
            col += alb * WD.rgb * rad * (.25 + .75 * clamp(e / max(WB.w, .05), 0., 1.)) * fdir * .16 * (1. + glowOf(id) * 1.5);
#ifdef MODC
            // daylight through the small far pane fills the white funnel: the pane's own colours, mixed, brightest
            // beside the glass and fading toward the room, lit by the sky (never dark by day), dimmed by cloud
            float kd = clamp(e / max(WB.w, .05), 0., 1.);
            col += alb * gk * (.12 + .25 * dot(WD.rgb, vec3(.2126, .7152, .0722))) * rad * (.12 + .88 * kd * kd) * MODG * (1. + glowOf(id) * 1.5);
#endif
          }
        }
      }
      if (uCan.w > 0.) { vec3 lv = uCan.xyz - p; float dl = dot(lv, lv); col += alb * vec3(1., .5, .18) * uCan.w * max(dot(n, lv * inversesqrt(dl)), 0.) / (dl + .25) * (.4 + .6 * ao); }
      if (A.a > .05) {
        vec3 rr = reflect(rd, n);
        float fr = .04 + .96 * pow(1. - max(dot(-rd, n), 0.), 5.);
        col += dir / max(ndl, .08) * pow(max(dot(rr, uL), 0.), 40.) * A.a * (fr + .06) * 3.;
        if (rr.y > .02) {
          float t; int f = exitF(p, rr, t);
          vec3 q = p + rr * t; vec2 lc = fLoc(f, q);
          int id = winAt(f, lc);
          if (id >= 0) {
            vec4 WA = texelFetch(uWD, ivec2(0, id), 0), WB = texelFetch(uWD, ivec2(1, id), 0), WC = texelFetch(uWD, ivec2(2, id), 0);
            float bl = t * (.05 + .1 * (1. - A.a)) + .02;
            float m = clamp(.5 - shapeSD(lc - WA.xy, WA.zw, WB.y) / bl, 0., 1.);
            if (m > 0.) {
              vec2 uv = WC.xy + ((lc - WA.xy) / (2. * WA.zw) + .5) * WC.zw;
              vec3 T = textureLod(uGl, vec3(uv, WB.x), log2(max(bl * uLR * WC.z / (2. * WA.z), 1.))).rgb;
              col += T * winRad(f, rr, id) * m * fr * A.a * (1. + glowOf(id) * 2.);
            }
          }
        }
        if (uEqG.w > 0. && A.a > .7) col += vec3(1., .75, .3) * uEqG.w * dir * .5;
      }
    }
  }
  // dusty air: ambient haze + the shafts (bilateral upsample)
  vec2 sp = gl_FragCoord.xy / uSize * uSR - .5; ivec2 b = ivec2(floor(sp)); vec2 fr = fract(sp);
  vec3 sh = vec3(0.); float ws = 0.;
  for (int j = -uOne; j <= 2 * uOne; j++) for (int i = -uOne; i <= 2 * uOne; i++) {
    ivec2 c = clamp(b + ivec2(i, j), ivec2(0), ivec2(int(uSR) - 1));
    vec4 S = texelFetch(uSh, c, 0);
    vec2 dd = vec2(float(i), float(j)) - fr;
    float w = exp(-dot(dd, dd) * .9) / (1. + abs(S.a - dist) * 3. / (1. + dist * .1));
    sh += S.rgb * w; ws += w;
  }
  sh /= max(ws, 1e-4);
  float tr = exp(-uAir.x * dist);
  col = col * tr + uHaze * (1. - tr) * .38 + sh;
  col *= uExp * uWB;
  vec3 pc = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  float lu = dot(col, vec3(.2126, .7152, .0722)), mx = max(col.r, max(col.g, col.b));
  float lt = (mx * (2.51 * mx + .03)) / (mx * (2.43 * mx + .59) + .14);
  vec3 hp = col * (lt / max(mx, 1e-5));
  col = mix(pc, hp, .55 * smoothstep(.0, .6, mx - lu));
  o = vec4(pow(clamp(col, 0., 1.), vec3(1. / 2.2)), 1.);
}`,lo=[["#define LBS (wid >= 0 ? 6. : 0.)","#define LBS (wid >= 0 ? 6. : 2.)"],["col = glassCol(p, rd, dist, wf, wlc, wid) * GLK;","col = glassCol(p, rd, dist, wf, wlc, wid) * GLK / clamp(9. / uExp, .06, 1.);"],[`      vec3 gk = vec3(1.);
      if (wid >= 0) {`,`      vec3 gk = vec3(1.), g0 = vec3(.3);
      if (wid >= 0) {`],["        vec3 g0 = textureLod(uGl, vec3(WC.xy + clamp((wlc - WA.xy) / (2. * WA.zw) * .7 + .5, 0., 1.) * WC.zw, WB2.x), 3.).rgb;",`        g0 = textureLod(uGl, vec3(WC.xy + .5 * WC.zw, WB2.x), 1.).rgb;
        vec2 dl = wlc - WA.xy, hz = WA.zw + WB2.z * (1. - clamp(e / max(WB2.w, .05), 0., 1.));
        vec3 ax = wf < 2 ? vec3(0., 0., 1.) : vec3(1., 0., 0.), ay = wf == 4 ? vec3(0., 0., 1.) : vec3(0., 1., 0.);
        n = normalize((abs(dl.x) * hz.y > abs(dl.y) * hz.x ? (dl.x < 0. ? ax : -ax) : (dl.y < 0. ? ay : -ay)) - WB2.z / max(WB2.w, .05) * fOut(wf));
        ao = mix(ao, 1., .7);`],["dir = dot(dir, vec3(.2126, .7152, .0722)) * gk * .22;","dir = dot(dir, vec3(.2126, .7152, .0722)) * gk * .6;"],["col += alb * gk * (.12 + .25 * dot(WD.rgb, vec3(.2126, .7152, .0722))) * rad * (.12 + .88 * kd * kd) * MODG",`col += alb * mix(vec3(1.), g0 / max(max(g0.r, max(g0.g, g0.b)), .02), RVT * (.55 + .45 * kd)) * rad * (.1 + .9 * kd) * MODG
              * (.35 + .65 * clamp(.5 + .5 * dot(n, normalize(uL + vec3(0., .6, 0.))), 0., 1.))`],["#define MODG .5","#define MODG RVK"],["      col = alb * (dir * .3183 + amb * ao + bn * (.35 + .65 * ao));",`      if (wid >= 0) { float kr = 1. - RVA * clamp(e / max(texelFetch(uWD, ivec2(1, wid), 0).w, .05), 0., 1.); amb *= kr; bn *= kr; }
      col = alb * (dir * .3183 + amb * ao + bn * (.35 + .65 * ao));`],["  float bl = t * .0047 + .004;","  float bl = abs(t) * .0047 + .004;"],["  float m = clamp(.5 - shapeSD(d1, A.zw + B.z, B.y) / bl, 0., 1.) * clamp(","  float m = (t < 0. ? 1. : clamp(.5 - shapeSD(d1, A.zw + B.z, B.y) / bl, 0., 1.)) * clamp("],["#define GLK 2.2",`#define RVK .26
#define RVA .8
#define RVT .95
#define GLK 1.9`]],so=[["  vec3 T = textureLod(uGl, vec3(uv, B.x), log2(max(bl * tpm, 1.)) + lb).rgb;",`  float lv = log2(max(bl * tpm, 1.)) + lb; vec2 hd = exp2(lv) * .5 / vec2(uLR, uLR * 4.);
  vec3 T = (textureLod(uGl, vec3(uv + hd, B.x), lv).rgb + textureLod(uGl, vec3(uv - hd, B.x), lv).rgb) * .5;`]],da=r=>{let e=io(r&1);for(const[y,w]of(r&1?lo:[]).concat(r&2?so:[])){if(e.indexOf(y)<0)throw new Error("038 composite patch: "+y);e=e.split(y).join(w)}return e},uo=fe+`
uniform sampler2D uC, uN; uniform float uSize, uT;
out vec4 o;
void main(){
  vec2 px = 1. / vec2(uSize), uv = gl_FragCoord.xy * px;
  vec3 M = texture(uC, uv).rgb, NW = texture(uC, uv + vec2(-1., -1.) * px).rgb, NE = texture(uC, uv + vec2(1., -1.) * px).rgb,
       SW = texture(uC, uv + vec2(-1., 1.) * px).rgb, SE = texture(uC, uv + vec2(1., 1.) * px).rgb;
  vec3 lw = vec3(.299, .587, .114);
  float lM = dot(M, lw), lNW = dot(NW, lw), lNE = dot(NE, lw), lSW = dot(SW, lw), lSE = dot(SE, lw);
  float lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE))), lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
  vec3 c = M;
  if (lMax - lMin > max(.04, lMax * .1)) {
    vec2 dir = vec2(-((lNW + lNE) - (lSW + lSE)), (lNW + lSW) - (lNE + lSE));
    float red = max((lNW + lNE + lSW + lSE) * .03125, 1. / 128.);
    dir = clamp(dir / (min(abs(dir.x), abs(dir.y)) + red), -8., 8.) * px;
    vec3 a = .5 * (texture(uC, uv + dir * (1. / 3. - .5)).rgb + texture(uC, uv + dir * (2. / 3. - .5)).rgb);
    vec3 bb = a * .5 + .25 * (texture(uC, uv - dir * .5).rgb + texture(uC, uv + dir * .5).rgb);
    float lb = dot(bb, lw);
    c = (lb < lMin || lb > lMax) ? a : bb;
  }
  vec2 v = uv - .5;
  c *= 1. - .2 * dot(v, v) * 2.;
  c += (texture(uN, gl_FragCoord.xy / 256.).a - .5) * .008;
  o = vec4(c, 1.);
}`,fo=r=>fe+"#define GV "+r+`
`+oo,xo=fe+Qe+kt+`
layout(location = 0) in vec4 aP;
layout(location = 1) in vec4 aQ;
uniform vec3 uCam; uniform mat3 uRot; uniform float uTan, uSize, uExp; uniform vec3 uL, uE, uAmbM;
out vec3 vC; out float vK, vD, vA, vW;
void main(){
  vec3 v = aP.xyz - uCam;
  vec3 c = transpose(uRot) * v;
  vK = aQ.x; vD = length(v); vA = aQ.z; vW = aQ.y;
  if (c.z < .25) { gl_Position = vec4(3., 3., 3., 1.); gl_PointSize = 0.; vC = vec3(0.); return; }
  gl_Position = vec4(c.xy / uTan, 0., c.z);
  float px = aP.w / (c.z * uTan) * uSize;
  if (aQ.x < .5) {
    float tw; vec3 T = vec3(0.);
    if (uL.y > 0.) { T = sunThru(aP.xyz, uL, tw, 1.5); if (T.r + T.g + T.b > .002) T *= pilOcc(aP.xyz, uL, tw); }
    float cs = dot(v / vD, uL);
    float ph = .25 + 4. * pow(max(cs, 0.), 10.);
    vC = T * uE * ph * aQ.w * uExp * .9;
    float lum = vC.r + vC.g + vC.b;
    gl_PointSize = lum < .01 ? 0. : clamp(px, 1.3, 5.);
  } else if (aQ.x < 1.5) {
    vC = vec3(1., .62, .26) * aQ.w;
    gl_PointSize = clamp(px * 2.2, 2.5, 48.);
  } else {
    vC = uAmbM * uExp;
    gl_PointSize = clamp(px * 2.4, 4., 90.);
  }
}`,vo=fe+`
uniform sampler2D uPos; uniform vec2 uBR; uniform float uSize; uniform vec3 uCam; uniform mat3 uRot; uniform float uTan;
vec4 posAt(ivec2 px){ vec2 tm = texelFetch(uPos, px, 0).xy; vec2 s = (vec2(px) + .5) / uBR * 2. - 1.; vec3 rd = normalize(uRot * vec3(s * uTan, 1.)); return vec4(uCam + rd * tm.x, tm.y); }
in vec3 vC; in float vK, vD, vA, vW;
out vec4 o;
void main(){
  vec4 P = posAt(ivec2(gl_FragCoord.xy * uBR / uSize));
  if (P.w > .5 && length(P.xyz - uCam) < vD - .05) discard;
  vec2 q = gl_PointCoord * 2. - 1.; q.y = -q.y;
  if (vK < .5) { float a = exp(-dot(q, q) * 3.2); vec3 c = vC * a; o = vec4(c / (1. + c), 0.); return; }
  if (vK < 1.5) {
    vec2 f = vec2(q.x * 3.2, q.y + .35);
    float d = length(vec2(f.x, f.y * (f.y > 0. ? .55 : 1.6)));
    float core = exp(-d * d * 7.), halo = exp(-dot(q, q) * 4.) * .25;
    vec3 c = vC * (core * vec3(1.6, 1.3, 1.) + halo);
    o = vec4(c / (1. + c), 0.); return;
  }
  float ca = cos(vA), sa = sin(vA);
  vec2 b = vec2(ca * q.x + sa * q.y, -sa * q.x + ca * q.y);
  float wv = sin(vW);
  float body = length(vec2(b.x * 1.1, b.y * 4.2)) - .32;
  float wing = max(abs(b.y + abs(b.x) * (.5 + .45 * wv)) - .05 * (1. - abs(b.x)), abs(b.x) - .92);
  float tail = max(abs(abs(b.y + .0) - (-b.x - .25) * .5) - .03, max(-b.x - .75, b.x + .25));
  float dd = min(min(body, wing), tail);
  float a = 1. - smoothstep(-.02, .04, dd);
  o = vec4(vC * a, a);
}`;function ho(r,e){const y=r.getExtension("KHR_parallel_shader_compile"),w=e.map(([E,z,g])=>{const P=r.createProgram(),R=[];for(const[q,b]of[[r.VERTEX_SHADER,E],[r.FRAGMENT_SHADER,z]]){const A=r.createShader(q);r.shaderSource(A,b),r.compileShader(A),r.attachShader(P,A),R.push(A)}return g&&g.forEach((q,b)=>r.bindAttribLocation(P,b,q)),r.linkProgram(P),{p:P,sh:R}});return r.flush(),w.map(E=>{if(!r.getProgramParameter(E.p,r.LINK_STATUS))throw new Error("Nave shader: "+E.sh.map(P=>r.getShaderInfoLog(P)).join(" | ")+r.getProgramInfoLog(E.p));const z={},g=r.getProgramParameter(E.p,r.ACTIVE_UNIFORMS);for(let P=0;P<g;P++){const R=r.getActiveUniform(E.p,P);z[R.name.replace("[0]","")]={l:r.getUniformLocation(E.p,R.name),t:R.type}}return{p:E.p,u:z}})}function de(r,e,y,w,E,z,g,P,R){const q=r.createTexture();return r.bindTexture(r.TEXTURE_2D,q),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texImage2D(r.TEXTURE_2D,0,w,e,y,0,E,z,g),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,P),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,P===r.LINEAR_MIPMAP_LINEAR?r.LINEAR:P),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,R),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,R),q}function Me(r,e){const y=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,y),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0),y}function ft(r,e,y){for(const w in e.u){const E=y[w];if(E===void 0)continue;const{l:z,t:g}=e.u[w];g===r.FLOAT?r.uniform1f(z,E):g===r.FLOAT_VEC2?r.uniform2fv(z,E):g===r.FLOAT_VEC3?r.uniform3fv(z,E):g===r.FLOAT_VEC4?r.uniform4fv(z,E):g===r.FLOAT_MAT3?r.uniformMatrix3fv(z,!1,E):r.uniform1i(z,E)}}function mo(r,e,y){let w=ua.get(r);const E=e.filter((te,ge)=>e.indexOf(te)===ge&&!(w&&w.glass[te])),z=!(w&&w.comp[y]);if(w&&!E.length&&!z)return w;r.getExtension("EXT_color_buffer_float");const g=w?z?[[ye,da(y)]]:[]:[[ye,ao],[ye,ro],[ye,no],[ye,co],[ye,da(y)],[ye,uo],[xo,vo,["aP","aQ"]]],P=ho(r,g.concat(E.map(te=>[ye,fo(te)]))),R=P.slice(g.length);if(w)return z&&(w.comp[y]=P[0]),E.forEach((te,ge)=>{w.glass[te]=R[ge]}),w;const[q,b,A,De,D,Z,ie]=P;w={noise:q,glass:[],b0:b,b2:A,shaft:De,comp:[],post:Z,mote:ie,vao:r.createVertexArray()},w.comp[y]=D,E.forEach((te,ge)=>{w.glass[te]=R[ge]}),w.nTex=de(r,256,256,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,null,r.LINEAR,r.REPEAT);const le=Me(r,w.nTex);return r.viewport(0,0,256,256),r.disable(r.BLEND),r.disable(r.DEPTH_TEST),r.disable(r.SCISSOR_TEST),r.disable(r.CULL_FACE),r.useProgram(q.p),r.uniform1i(r.getUniformLocation(q.p,"uOne"),1),r.bindVertexArray(w.vao),r.drawArrays(r.TRIANGLES,0,3),r.bindTexture(r.TEXTURE_2D,w.nTex),r.generateMipmap(r.TEXTURE_2D),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteFramebuffer(le),ua.set(r,w),w}function po(r,e,y,w,E){const z=Math.abs(r)-y,g=Math.abs(e)-w;if(E<.5)return Math.hypot(Math.max(z,0),Math.max(g,0))+Math.min(Math.max(z,g),0);if(E>2.5)return Math.hypot(r,e)-y;const P=E<1.5?w-y:w-1.732*y;if(e<=P)return Math.max(z,g);if(E<1.5)return Math.hypot(r,e-P)-y;const R=2*y;return Math.hypot(Math.abs(r)+R-y,e-P)-R}const xa=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,1,0]];function yo(r,e,y){const w=Math.abs(y[0])<1e-5?1e-5:y[0],E=Math.max(y[1],1e-5),z=Math.abs(y[2])<1e-5?1e-5:y[2],g=((w>0?r.hw:-r.hw)-e[0])/w,P=((z>0?r.z1:r.z0)-e[2])/z,R=(r.top-e[1])/E;return g<P&&g<R?[w>0?0:1,g]:P<R?[z>0?2:3,P]:[4,R]}const bo=(r,e)=>r<2?[e[2],e[1]]:r<4?[e[0],e[1]]:[e[0],e[2]],va={med:{c:[[.03,.085,.5],[.6,.022,.025],[.74,.44,.05],[.62,.64,.55],[.05,.33,.1],[.22,.04,.32],[.04,.22,.42]],w:[.4,.27,.12,.13,.04,0,.04]},nouv:{c:[[.12,.36,.08],[.38,.42,.1],[.3,.48,.16],[.6,.52,.3],[.74,.46,.05],[.36,.16,.4],[.34,.5,.6]],w:[.12,.2,.08,.4,.08,.04,.08]},mod:{c:[[.05,.1,.42],[.5,.045,.05],[.7,.52,.1],[.06,.3,.15],[.62,.26,.06],[.6,.63,.6],[.2,.08,.36]],w:[.15,.15,.15,.14,.14,.14,.13]},clr:{c:[[.05,.12,.48],[.58,.04,.03],[.66,.44,.06],[.8,.84,.78],[.86,.7,.2],[.08,.3,.12],[.3,.06,.3]],w:[.03,.03,.03,.88,.03,0,0]}},wo=(r,e)=>{const y=[0,0,0];return r.c.forEach((w,E)=>{for(let z=0;z<3;z++)y[z]+=w[z]*r.w[E]*e}),y};sa.add({num:38,name:"Stone Church",fam:"Worlds",recipe:"An empty stone church where the coloured light from the windows lands exactly where it would on the floor, pillars, pews and walls. The church, the glass, the season and where you're standing change every mint. Drag to move the sun, hold for a cloud to pass over, or tap a window to make it glow and ring.",interactive:"Drag to move the sun across the sky; hold for a passing cloud; tap a window to make its glass glow and ring.",music:!0,gl:!0,fps:30,seed:0,make(r){const e=r.gl,y=r.size,w=r.hash.replace(/^0x/,"").padEnd(64,"0");let E=parseInt(w.slice(0,8),16)>>>0,z=parseInt(w.slice(8,16),16)>>>0,g=parseInt(w.slice(16,24),16)>>>0,P=parseInt(w.slice(24,32),16)>>>0;const R=()=>{E>>>=0,z>>>=0,g>>>=0,P>>>=0;let t=E+z|0;return E=z^z>>>9,z=g+(g<<3)|0,g=g<<21|g>>>11,P=P+1|0,t=t+P|0,g=g+t|0,(t>>>0)/4294967296};for(let t=0;t<16;t++)R();const q=t=>{let a=0;for(const[,s]of t)a+=s;let n=R()*a;for(const[s,c]of t)if((n-=c)<0)return s;return t[t.length-1][0]},b=(t,a)=>t+(a-t)*R();let A=q([["gothic",40],["romanesque",27],["modern",25],["ruin",8]]),De=q(A==="modern"?[["mod",50],["med",18],["nouv",14],["clr",18]]:[["med",36],["nouv",24],["mod",18],["clr",22]]),D=q([["none",72],["candles",12],["swallow",10],["equinox",6]]),Z=q([["winter",25],["summer",25],["autumn",30],["dawn",20]]),ie=A==="ruin"?"leaves":q(A==="modern"?[["chairs",55],["empty",45]]:[["pews",50],["empty",22],["chairs",28]]),le=q(A==="modern"?[["concrete",70],["whiteconcrete",30]]:[["honey",35],["grey",30],["white",20],["red",15]]),te=q([["clear",28],["dusty",47],["incense",25]]);const ge=R();r.home&&(A="gothic",De="med",D="none",Z="autumn",ie="pews",le="honey",te="dusty"),D==="equinox"&&Z==="dawn"&&(Z="autumn"),A==="ruin"&&D==="candles"&&(D="none"),D==="swallow"&&(D="none");const be={building:{gothic:"High Gothic nave",romanesque:"Romanesque chapel",modern:"Modern concrete chapel",ruin:"Ruined abbey, open to the sky"},glass:{med:"Deep medieval blue and red",nouv:"Art Nouveau greens and golds",mod:"Abstract colour fields",clr:"Clear leaded glass with a roundel"},season:{winter:"Winter low sun",summer:"Summer high sun",autumn:"Autumn gold",dawn:"Dawn"},furn:{pews:"Oak pews",empty:"Worn flagstones",chairs:"Rows of chairs",leaves:"Fallen leaves"},stone:{honey:"Honey limestone",grey:"Pale grey limestone",white:"Whitewashed",red:"Red sandstone",concrete:"Board-marked concrete",whiteconcrete:"Whitewashed concrete"},air:{clear:"Clear air",dusty:"Dusty air",incense:"Incense haze"},rare:{none:"None",candles:"A rack of votive candles",swallow:"A swallow flying through",equinox:"Equinox alignment"}};r.trait("Building",be.building[A]),r.trait("Glass",A==="ruin"?"Empty tracery, "+be.glass[De].toLowerCase()+" fragments":be.glass[De]),r.trait("Season light",be.season[Z]),r.trait("Furnishing",be.furn[ie]),r.trait("Stone",be.stone[le]),r.trait("Air",be.air[te]),r.trait("Something rare",be.rare[D]);const o={hw:7,z0:0,z1:40,H:13,top:18,vt:0,hall:[0,0,0,0],tv:[0,0,0,0],ta:[0,0,0,0],rib:[0,6,0,.2],pr:[0,0,1,0],ps:[.07,8,.12,0],pil:[],step:[0,0,0,0],altar:[0,0,0,0],ruin:[0,0,0,0],cam:null},xe=[],we=[],Ao=t=>va[t],Ze=y<=300?128:256,Dt=Ze*4,U=(t,a,n,s,c,d)=>{const u=Math.min(Ze/(2*s),Dt/(2*c)),i=Math.max(4,Math.round(2*s*u)),h=Math.max(4,Math.round(2*c*u));return we.push({kind:t,style:a,shape:n,hx:s,hy:c,seed:b(0,40),varN:d||12,vw:i,vh:h}),we.length-1},N=(t,a,n,s,c,d,u,i,h,x)=>{const f=we[u],v=Ao(f.style),p=f.kind===3||f.kind===4?1:f.style==="clr"?.88:.8;let l=f.kind===3||f.kind===4?[.85,.85,.85]:wo(v,p);f.kind===1&&(l=l.map(m=>m*.7)),xe.push({face:t,s:a,y:n,hx:s,hy:c,shape:d,layer:u,splay:i,depth:h,uv:x||[0,0,1,1],avg:l,area:Ro(s,c,d),note:0})},Ro=(t,a,n)=>n>2.5?Math.PI*t*t:4*t*a*(n>.5?.93:1),ha={med:0,nouv:1,mod:2,clr:3},ae=De,To=(t,a,n)=>Math.max(1,Math.floor((a-t)/n));if(A==="gothic"||A==="ruin"){const t=o.hw=b(6.6,7.4),a=t*.54,n=o.H=b(12.4,13.6),s=b(5.6,6.3),c=o.z1=b(40,45),d=Math.min(7,Math.floor((c-12)/s)),u=a*1.25,i=Math.sqrt(u*u-(u-a)*(u-a)),h=(t-a)/2,x=Math.min(h*1.15,2.1),f=(h*h+x*x)/(2*x);o.top=n+i+.05,o.vt=A==="ruin"?3:0,o.hall=[a,u,h*1.3,1];const v=s/2,p=v*1.25,l=Math.sqrt(p*p-(p-v)*(p-v));o.tv=[p,p-v,n+i-l,n+i-l];const m=(v*v+x*x)/(2*x);o.ta=[m,0,n+x-m,n],o.pr=[a,6,s,d],o.rib=[6,s,d,.24],o.ps=[.1,8,.17,0];const T=.52;for(let Q=0;Q<2;Q++)for(let st=0;st<d;st++){let Ne=n+.5;A==="ruin"&&(Ne=R()<.35?n+.5:b(1.2,n*.8)),o.pil.push([Q?a:-a,6+st*s,T,Ne])}const _=6+(d-1)*s+3.2;o.step=[Math.min(_,c-6),.32,0,0],o.altar=[c-3,1.25,.5,A==="ruin"?0:1];const K=Math.min(1.2,s*.2),M=b(2.5,3.1),H=n-b(.9,1.4),Y=A==="ruin"?null:ae,Ya=A==="ruin"?[U(3,ae,2,K,(H-M)/2),U(3,ae,2,K,(H-M)/2)]:[U(0,Y,2,K,(H-M)/2),U(0,Y,2,K,(H-M)/2),U(0,Y,2,K,(H-M)/2)],it=[];for(let Q=0;Q<=d;Q++)it.push(6+(Q-.5)*s);let ia=it[it.length-1]+s;for(;ia<c-K-.8;)it.push(ia),ia+=s;it.forEach((Q,st)=>{if(!(Q-K<.8))for(let Ne=0;Ne<2;Ne++)N(Ne,Q,(M+H)/2,K,(H-M)/2,2,Ya[(st+Ne)%Ya.length],.18,.45)});const Qa=Math.min(1.05,a*.3),Nt=n-.6,Zo=U(A==="ruin"?3:0,ae,2,Qa,(Nt-2.4)/2);N(2,0,(2.4+Nt)/2,Qa,(Nt-2.4)/2,2,Zo,.15,.45);const la=Math.min(.85,h*.45),lt=n-2.2,Za=U(A==="ruin"?3:0,ae,2,la,(lt-2.6)/2);for(const Q of[-1,1])N(2,Q*(a+t)/2,(2.6+lt)/2,la,(lt-2.6)/2,2,Za,.15,.45);const pe=Math.min(a*.6,(i+.5)/2+.15),Ja=Nt+.45+pe,Jo=R()<.5?12:16,$a=U(A==="ruin"?4:1,ae,3,pe,pe,Jo);N(2,0,Math.min(Ja,o.top-pe-.25),pe,pe,3,$a,.12,.5),N(3,0,Math.min(Ja-.3,o.top-pe-.25),pe*.9,pe*.9,3,$a,.12,.5);for(const Q of[-1,1])N(3,Q*(a+t)/2,(2.6+lt)/2+1,la,(lt-2.6)/2-1,2,Za,.15,.45);o.cam={p:[-.45,1.62,1.1],yaw:2.5,pitch:A==="ruin"?10:7.5,fov:66},A==="ruin"&&(o.ruin=[1,b(7.5,9.5),b(3.2,4.2),b(0,6)]),o.pews={xi:.85,xo:a-T-.4,z0:6.5,z1:6+(d-1)*s+.3}}else if(A==="romanesque"){const t=o.hw=b(4,4.6),a=o.H=b(6.4,7.2),n=o.z1=b(20,23);o.top=a+t+.05,o.vt=0,o.hall=[0,t,0,0];const s=4,c=n/s;o.rib=[c,c,s-1,.3],o.pr=[t-.12,c,c,s-1],o.ps=[0,4,.1,0];for(let m=0;m<2;m++)for(let T=0;T<s-1;T++)o.pil.push([m?t-.12:-(t-.12),c*(T+1),.4,a+.3]);const d=b(.36,.46),u=b(.95,1.2),i=a-u-b(1,1.5),h=[U(0,ae,1,d,u),U(0,ae,1,d,u)];for(let m=0;m<s;m++)for(let T=0;T<2;T++)N(T,c*(m+.5),i,d,u,1,h[(m+T)%2],.3,.5);const x=.52,f=1.45,v=U(0,ae,1,x,f);N(2,0,4.1,x,f,1,v,.4,.9);for(const m of[-1,1])N(2,m*2.3,3.9,.3,.8,1,v,.35,.9);const p=b(.65,.85),l=U(1,ae,3,p,p,8);N(2,0,Math.min(a+1.6,o.top-p-.5),p,p,3,l,.35,.9),N(3,0,Math.min(a+1.4,o.top-p-.5),p*.9,p*.9,3,l,.35,.9),N(3,2.2,4,.32,.85,1,v,.35,.9),o.step=[n-4.2,.28,0,0],o.altar=[n-1.9,.9,.42,1],o.cam={p:[-.25,1.6,.9],yaw:1.5,pitch:10,fov:68},o.pews={xi:.6,xo:t-.95,z0:3.3,z1:n-5.6}}else{const t=o.hw=b(5.2,5.8),a=o.H=b(9.4,10.6),n=o.z1=b(25,29);o.top=a,o.vt=2,o.rib=[4.5,4.5,Math.floor((n-1)/4.5),.2];const s=U(2,ae,0,3,12),c=(f,v,p,l)=>[((f-p)/6%1+1)%1*.8,((v-l)/12%1+1)%1*.6,2*p/6,2*l/24],d=[];for(let f=0;f<400&&d.length<15;f++){const v=b(.12,.48),p=b(.15,.8),l=b(2,n-2),m=b(1.2+p,a-1.3-p);d.some(T=>Math.abs(T.s-l)<T.hx+v+.45&&Math.abs(T.y-m)<T.hy+p+.45)||d.push({s:l,y:m,hx:v,hy:p})}d.forEach(f=>N(0,f.s,f.y,f.hx,f.hy,0,s,.5,1.2,c(f.s,f.y,f.hx,f.hy)));const u=4+Math.floor(R()*3);for(let f=0;f<u;f++){const v=3+(f+.5)*(n-6)/u+b(-.6,.6),p=b(.08,.14),l=b(2.6,3.8);N(1,v,a*.5,p,l,0,s,.25,1.2,c(v,a*.5,p,l))}const i=b(1.2,2.4)*(R()<.5?-1:1),h=U(2,ae,0,.3,a/2);N(2,i,a/2,.3,a/2-.02,0,h,.3,1.2);for(let f=0;f<5;f++){const v=-i*.3-2+f*.9*Math.sign(-i||1)+b(-.1,.1),p=b(5,8),l=b(.1,.2);N(2,v,p,l,l,0,s,.3,1.2,c(v,p,l,l))}const x=U(5,"clr",0,t-.25,.32);N(4,0,n-.55,t-.25,.32,0,x,.1,.9),N(3,0,6.5,.22,.22,3,s,.25,1.2,c(0,6.5,.22,.22)),o.step=[n-5,.2,0,0],o.altar=[n-3,1.1,.5,1],o.cam={p:[-.35,1.6,1],yaw:3,pitch:6,fov:68},o.pews={xi:.7,xo:t-1.3,z0:3.2,z1:n-7.5}}if(ie==="empty"||ie==="leaves")o.pw=[0,0,1,0];else{const t=o.pews,a=ie==="pews"?.95:.9;o.pw=[ie==="pews"?1:2,t.z0,a,Math.max(1,Math.floor((t.z1-t.z0)/a)+1)],o.px=[t.xi,t.xo,0,0]}o.px=o.px||[0,0,0,0];const Ue={winter:{dec:-22*k,E:[6.2,5.6,4.9],sky:[.48,.58,.78],zen:[.25,.38,.7],hor:[.75,.78,.82],amb:1},summer:{dec:22*k,E:[6.8,6.5,6],sky:[.55,.66,.88],zen:[.18,.34,.78],hor:[.7,.78,.9],amb:1.1},autumn:{dec:-5*k,E:[6.8,5.6,4],sky:[.62,.6,.6],zen:[.24,.36,.66],hor:[.85,.76,.62],amb:1},dawn:{dec:14*k,E:[6.4,4.4,3],sky:[.72,.56,.62],zen:[.22,.26,.5],hor:[.95,.62,.45],amb:.85}}[Z],dt=D==="equinox"?0:Ue.dec,Je=51*k,Pe=t=>{const a=Math.sin(Je)*Math.sin(dt)+Math.cos(Je)*Math.cos(dt)*Math.cos(t),n=Math.asin(C(a,-1,1));let s=Math.acos(C((Math.sin(dt)-a*Math.sin(Je))/(Math.cos(n)*Math.cos(Je)+1e-9),-1,1));return t>0&&(s=Ye-s),[s,n]},ma=Math.acos(C(-Math.tan(Je)*Math.tan(dt),-1,1)),J=Z==="dawn"?{c:-ma+24*k,a:20*k}:{c:0,a:ma-14*k},Ut=(t,a)=>[-Math.cos(a)*Math.cos(t),Math.sin(a),Math.cos(a)*Math.sin(t)];let xt=[0,0,0,0],vt=null;if(D==="equinox"){const[,t]=Pe(0),a=o.pil.length?o.pr[1]+(o.pr[3]-1)*o.pr[2]+1:o.pews.z1+1.2;let n=0;const s=o.H-.8;let c=(o.hw-n)*Math.tan(t);c>s&&(n=o.hw-s/Math.tan(t),c=s),c<1.2&&(c=1.2,n=o.hw-c/Math.tan(t)),xt=[n,a,1,0],vt={s:a,y:c};const d=U(3,"clr",3,.08,.08);we[d].kind=5,N(0,a,c,.075,.075,3,d,.02,.3)}const ht=[50,55,57,59,62,64,66,69,71,74,76,78,81];xe.forEach((t,a)=>{t.shape===3&&t.hx>.5?t.note=43+(t.face===3?7:0):t.face<2?t.note=ht[C(Math.floor((t.s-o.z0)/(o.z1-o.z0)*8)+(t.face?1:3),0,ht.length-1)]:t.note=ht[C(6+Math.round(t.s*.8)+(t.face===3?-3:2),0,ht.length-1)],t.idx=a});const Ae=Math.min(xe.length,64),We={honey:[[.56,.45,.29],[.6,.49,.33],[.4,.34,.25],.38],grey:[[.5,.49,.46],[.54,.53,.5],[.36,.35,.33],.4],white:[[.72,.7,.64],[.46,.44,.4],[.34,.32,.29],.36],red:[[.43,.22,.15],[.47,.25,.17],[.32,.22,.18],.34],concrete:[[.41,.4,.38],[.43,.42,.4],[.27,.26,.25],.14],whiteconcrete:[[.66,.65,.61],[.6,.59,.56],[.26,.25,.24],.14]}[le],pa=[le==="white"||le==="whiteconcrete"?le==="white"?1:2:A==="modern"?2:le==="red"?3:0,A==="ruin"?1:0,ie==="empty"?.55:.3,We[3]];le==="whiteconcrete"&&(pa[0]=2);const ya={clear:[.005,.016],dusty:[.008,.034],incense:[.011,.05]}[te];let S;{let t=(parseInt(w.slice(32,40),16)^2135587861)>>>0;const a=()=>{t=t+1831565813|0;let v=Math.imul(t^t>>>15,1|t);return v=v+Math.imul(v^v>>>7,61|v)^v,((v^v>>>14)>>>0)/4294967296},n=a(),s=a();S=n<.5?"west":n<.76?"choir":n<.9?"vault":"aisle",r.home&&(S="west"),A==="ruin"&&(S="west"),A==="romanesque"&&S!=="west"&&(S="vault"),A==="modern"&&S!=="west"&&(S="choir");const c=A==="gothic";S==="choir"&&(o.cam={p:[.4+s*.3,1.62,o.z1-(c?8.5:5.5)],yaw:176+s*5,pitch:c?9:7,fov:66}),S==="vault"&&(o.cam={p:[.25,1.5,o.z1*(.36+s*.1)],yaw:3,pitch:c?52:31,fov:74}),S==="aisle"&&(o.cam={p:[-(o.hw*.54+o.hw)/2+.2,1.6,1.1],yaw:5+s*3,pitch:7.5,fov:64});let d=(parseInt(w.slice(40,48),16)^3715113)>>>0;const i=(()=>{d=d+1831565813|0;let v=Math.imul(d^d>>>15,1|d);return v=v+Math.imul(v^v>>>7,61|v)^v,((v^v>>>14)>>>0)/4294967296})(),h=S==="west"||S==="choir",x=S==="choir";!r.home&&h&&A!=="ruin"&&(A==="modern"&&S==="choir"?i<.5&&(S="south"):i<.2?S="south":i<.42&&(S=A==="romanesque"?"south":i<.34?"floor":"gallery"),S==="floor"&&(Z==="winter"||Z==="dawn")&&(S="south"));const f=Z==="winter"||Z==="dawn"?1:0;S==="south"&&(o.cam=c?{p:[-o.hw*.3,1.6+.3*f,o.z1*.4],yaw:58,pitch:17+7*f,fov:70}:{p:[-o.hw*.55,1.6+.3*f,o.z1*.4],yaw:58,pitch:13+10*f,fov:70}),S==="floor"&&(o.cam=x?{p:[.2,1.62,o.z1*.7],yaw:176+s*6,pitch:-26,fov:62}:{p:[.2,1.62,o.z1*.3],yaw:2+s*6,pitch:-26,fov:62}),S==="gallery"&&(o.cam={p:[.3,c?o.H*.55:5.2,1],yaw:2,pitch:-17,fov:70})}r.trait("Standing",{west:"At the west door",choir:"In the choir, looking back west",vault:"Under the crossing, looking up",aisle:"In the side aisle",south:"Facing the south windows",floor:"Over the light on the floor",gallery:"From the west gallery"}[S]);const mt=o.cam,pt=mt.yaw*k,Wt=mt.pitch*k,G=[Math.sin(pt)*Math.cos(Wt),Math.sin(Wt),Math.cos(pt)*Math.cos(Wt)],W=[Math.cos(pt),0,-Math.sin(pt)],se=[G[1]*W[2]-G[2]*W[1],G[2]*W[0]-G[0]*W[2],G[0]*W[1]-G[1]*W[0]],$e=Math.tan(mt.fov*k/2),Eo=[W[0],W[1],W[2],se[0],se[1],se[2],G[0],G[1],G[2]],j=mt.p,et=t=>{const a=[t[0]-j[0],t[1]-j[1],t[2]-j[2]],n=a[0]*G[0]+a[1]*G[1]+a[2]*G[2];return n<.2?null:[((a[0]*W[0]+a[1]*W[1]+a[2]*W[2])/(n*$e)+1)/2,(1-(a[0]*se[0]+a[1]*se[1]+a[2]*se[2])/(n*$e))/2,n]},zo=(t,a)=>{const n=(t*2-1)*$e,s=(1-a*2)*$e,c=[W[0]*n+se[0]*s+G[0],W[1]*n+se[1]*s+G[1],W[2]*n+se[2]*s+G[2]],d=Math.hypot(c[0],c[1],c[2]);return[c[0]/d,c[1]/d,c[2]/d]},ba=t=>t.kind===1||t.kind===3||t.kind===4?0:t.kind===5?3:[1,2,3,3][ha[t.style]],Ot=A==="modern"?1:S==="floor"||S==="south"?2:0,F=mo(e,we.map(ba),Ot),$=Math.min(y,1024),tt=Math.max(48,Math.round($/4)),Mo=Ze,go=we.length,Oe=128,He=64,wa=[],Po=t=>t<2?[o.z0,0,o.z1-o.z0,o.top]:t<4?[-o.hw,0,2*o.hw,o.top]:[-o.hw,o.z0,2*o.hw,o.z1-o.z0],Aa=new Uint8Array(Oe*He*5);for(let t=0;t<5;t++){const[a,n,s,c]=Po(t);wa.push(a,n,1/s,1/c);const d=xe.slice(0,Ae).filter(u=>u.face===t);if(d.length)for(let u=0;u<He;u++)for(let i=0;i<Oe;i++){const h=a+(i+.5)/Oe*s,x=n+(u+.5)/He*c;let f=-1,v=1e9;for(const p of d){const l=Math.max(Math.abs(h-p.s)-p.hx,0)**2+Math.max(Math.abs(x-p.y)-p.hy,0)**2;l<v&&(v=l,f=p.idx)}Aa[(t*He+u)*Oe+i]=f+1}}const So=de(e,Oe,He*5,e.R8,e.RED,e.UNSIGNED_BYTE,Aa,e.NEAREST,e.CLAMP_TO_EDGE),at=new Float32Array(4*4*Math.max(Ae,1));xe.slice(0,Ae).forEach((t,a)=>{at.set([t.s,t.y,t.hx,t.hy],(a*4+0)*4),at.set([t.layer,t.shape,t.splay,t.depth],(a*4+1)*4);{const n=we[t.layer],s=n.vw/Ze,c=n.vh/Dt;at.set([t.uv[0]*s,t.uv[1]*c,t.uv[2]*s,t.uv[3]*c],(a*4+2)*4)}{const n=A==="modern"&&t.depth>.6?0:1;at.set([t.avg[0]*n,t.avg[1]*n,t.avg[2]*n,t.area],(a*4+3)*4)}});const Lo=de(e,4,Math.max(Ae,1),e.RGBA32F,e.RGBA,e.FLOAT,at,e.NEAREST,e.CLAMP_TO_EDGE),yt=e.createTexture();e.bindTexture(e.TEXTURE_2D_ARRAY,yt),e.texImage3D(e.TEXTURE_2D_ARRAY,0,e.SRGB8_ALPHA8,Ze,Dt,go,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const Ra=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,Ra),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.bindVertexArray(F.vao),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,F.nTex),we.forEach((t,a)=>{e.viewport(0,0,t.vw,t.vh),e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,yt,0,a);const n=t.kind===5?{c:[[.9,.9,.88],[.9,.9,.88],[.9,.9,.88],[.9,.9,.88],[.9,.9,.88],[.9,.9,.88],[.9,.9,.88]]}:va[t.style],s=F.glass[ba(t)];e.useProgram(s.p),ft(e,s,{uOne:1,uHalf:[t.hx,t.hy],uRes:[t.vw,t.vh],uShape:t.shape,uStyle:t.kind===5?3:ha[t.style],uKind:t.kind===5?2:t.kind,uSeed:t.seed,uVar:t.varN,uPal:new Float32Array(n.c.flat()),uN:0}),e.drawArrays(e.TRIANGLES,0,3)}),e.bindTexture(e.TEXTURE_2D_ARRAY,yt),e.generateMipmap(e.TEXTURE_2D_ARRAY),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Ra);const Ht=de(e,$,$,e.RG32F,e.RG,e.FLOAT,null,e.NEAREST,e.CLAMP_TO_EDGE),Fo=Me(e,Ht),Gt=de(e,$,$,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.NEAREST,e.CLAMP_TO_EDGE),Ta=Me(e,Gt),Ea=de(e,$,$,e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE,null,e.NEAREST,e.CLAMP_TO_EDGE),qo=Me(e,Ea),za=de(e,$,$,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.NEAREST,e.CLAMP_TO_EDGE),Bo=Me(e,za),It=[0,1].map(()=>de(e,tt,tt,e.RGBA16F,e.RGBA,e.HALF_FLOAT,null,e.NEAREST,e.CLAMP_TO_EDGE)),_o=It.map(t=>Me(e,t));let bt=0,Ma=0,Xt=!0;const Ge=[0,0,0],ga=de(e,y,y,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR,e.CLAMP_TO_EDGE),Co=Me(e,ga);e.bindFramebuffer(e.FRAMEBUFFER,null);const Pa=new Float32Array(64);o.pil.slice(0,16).forEach((t,a)=>Pa.set(t,a*4));const wt={uBMin:[-o.hw,0,o.z0],uBMax:[o.hw,o.top,o.z1],uFM:new Float32Array(wa),uIdRes:[Oe,He],uId:1,uWD:2,uGl:3,uN:0,uRuin:o.ruin,uH:o.H,uVt:o.vt,uHall:o.hall,uTv:o.tv,uTa:o.ta,uRib:o.rib,uPR:o.pr,uPS:o.ps,uPil:Pa,uNP:Math.min(o.pil.length,16),uPw:o.pw,uPx:o.px,uSt:o.step,uAl:o.altar,uRk:[0,0,0,0],uCam:j,uRot:new Float32Array(Eo),uTan:$e,uBR:[$,$],uSteps:200,uLR:Mo,uSize:y,uSR:tt,uSS:y<=300?16:24,uSA:We[0],uSB:We[1],uFA:We[2],uSK:pa,uEq:xt,uGlow:new Float32Array(64),uOne:1};let Re=null;if(D==="candles"){const t=Math.max(o.pews.z0-1.25,4.2),a=-Math.min(2.3,o.hw-1.2);Re=[a,t],wt.uRk=[a,t,1,0]}const Sa=()=>{e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,F.nTex),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,So),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Lo),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D_ARRAY,yt)};e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.bindVertexArray(F.vao),e.viewport(0,0,$,$),Sa(),e.bindFramebuffer(e.FRAMEBUFFER,Fo),e.useProgram(F.b0.p),ft(e,F.b0,{...wt,uPos:0,uPass:0}),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,Ht),e.bindFramebuffer(e.FRAMEBUFFER,Ta),e.uniform1i(F.b0.u.uPos.l,4),e.uniform1i(F.b0.u.uPass.l,1),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,Gt),e.bindFramebuffer(e.FRAMEBUFFER,qo),e.useProgram(F.b2.p),ft(e,F.b2,{...wt,uPos:4,uNr:5,uPass:0}),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,Bo),e.uniform1i(F.b2.u.uPass.l,1),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Ta),e.deleteTexture(Gt);const Se=1400,At=o.z0+1.8,Rt=Math.min(o.z1-1,o.z0+20),Vt=Math.min(o.H,9),L=new Float32Array(Se*6);for(let t=0;t<Se;t++)L.set([b(-o.hw+.3,o.hw-.3),b(.3,Vt),b(At,Rt),0,0,0],t*6);const Kt=[];if(Re)for(let t=-1;t<=1;t++)for(let a=-3;a<=3;a++)R()<.72&&Kt.push([Re[0]+a*.13,.89+t*.15*.5+.085,Re[1]+t*.15,b(0,6)]);const No=Se+Kt.length+1,oe=new Float32Array(No*8),La=e.createBuffer(),Fa=e.createVertexArray();e.bindVertexArray(Fa),e.bindBuffer(e.ARRAY_BUFFER,La),e.bufferData(e.ARRAY_BUFFER,oe,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(1,1),e.bindVertexArray(null);const jt=[];for(let t=0;t<Se;t++)jt.push(b(.004,.011),b(.4,1.3));const Te=[];if(D==="swallow"){Te.push([b(-1,1),b(5,8),o.z0-4]);for(let a=0;a<7;a++){const n=a/6;Te.push([b(-o.hw*.5,o.hw*.5),b(2.2,Math.min(o.H,7)),ke(o.z0+3.5,Math.min(o.z1-4,22),Math.sin(n*Math.PI)*.9+n*.1)])}Te.push([b(-1,1),b(5,8),o.z0-4])}const qa=t=>{const a=Te.length-1,n=C(t,0,.9999)*a,s=Math.floor(n),c=n-s,d=Te[Math.max(s-1,0)],u=Te[s],i=Te[Math.min(s+1,a)],h=Te[Math.min(s+2,a)];return[0,1,2].map(x=>.5*(2*u[x]+(-d[x]+i[x])*c+(2*d[x]-5*u[x]+4*i[x]-h[x])*c*c+(-d[x]+3*u[x]-3*i[x]+h[x])*c*c*c))},Le=r.sound,ee=22050,ko=[1557,1617,1491,1422,1277,1356].map(t=>({b:new Float32Array(Math.round(t*ee/44100*1.9)),i:0,f:0})),Do=[556,441,341].map(t=>({b:new Float32Array(Math.round(t*ee/44100)),i:0})),I=[];let Tt=new Float32Array(2048),Fe=19088743,Yt=0,Qt=0,Zt=0;const Ba=()=>(Fe^=Fe<<13,Fe^=Fe>>>17,Fe^=Fe<<5,(Fe>>>0)/4294967296*2-1),_a=(t,a,n,s,c)=>{!Le.on||I.length>14||I.push({k:"tone",p:a.map(([d,u,i])=>({c:1,s:0,cr:Math.cos(Ye*t*d/ee),sr:Math.sin(Ye*t*d/ee),a:u*n,g:Math.exp(-1/(ee*i*c))})),wet:s,att:0,n:0})},ve=(t,a)=>_a(440*Math.pow(2,(t-69)/12),[[1,.5,4.5],[2.01,.16,2.4],[3.02,.07,1.3],[4.17,.04,.8]],a,.7,1),Uo=(t,a)=>_a(t,[[.5,.3,6],[1,.45,4],[1.19,.25,3],[1.5,.2,2.5],[2,.22,2],[2.52,.1,1.4],[3.01,.07,1]],a,.85,1),Wo=t=>{Le.on&&I.length<15&&I.push({k:"coo",t:0,ph:0,vel:t,f:b(330,390),wet:.6})},Oo=t=>{Le.on&&I.length<15&&I.push({k:"flap",t:0,vel:t,wet:.5})},Ca=t=>{Le.on&&I.length<15&&I.push({k:"chirp",t:0,ph:0,vel:t,wet:.4,n:2+Math.floor(R()*3)})},Ho=t=>{Tt.length<t&&(Tt=new Float32Array(t));for(let a=0;a<t;a++){const n=Ba();Yt+=(n-Yt)*.02,Qt+=(Yt-Qt)*.05,Zt+=(n-Zt)*.3;let s=Qt*.9+(n-Zt)*.012,c=0;for(let u=I.length-1;u>=0;u--){const i=I[u];let h=0;if(i.k==="tone"){i.att=Math.min(1,i.att+1/(ee*.006));let x=!1;for(const f of i.p){const v=f.c*f.cr-f.s*f.sr;f.s=f.c*f.sr+f.s*f.cr,f.c=v,f.a*=f.g,h+=f.s*f.a,f.a>2e-4&&(x=!0)}if(!(++i.n&1023))for(const f of i.p){const v=1/Math.hypot(f.c,f.s);f.c*=v,f.s*=v}if(h*=i.att,!x){I.splice(u,1);continue}}else if(i.k==="coo"){i.t+=1/ee;const x=i.t,f=x<.32?0:x<.62?1:x<1.05?2:x<1.3?3:4;if(f===4){I.splice(u,1);continue}const v=[0,.32,.62,1.05][f],p=[.32,.3,.43,.25][f],l=(x-v)/p,m=i.f*[1,1.12,1,.9][f]*(1+.04*Math.sin(l*3.1));i.ph+=Ye*m/ee;const T=Math.sin(Math.PI*l)**1.5*[.6,1,.8,.5][f];h=(Math.sin(i.ph)+.3*Math.sin(2*i.ph))*T*(.8+.2*Math.sin(i.ph*.07))*i.vel*.18}else if(i.k==="flap"){if(i.t+=1/ee,i.t>.9){I.splice(u,1);continue}const x=i.t*11%1;h=Ba()*Math.exp(-x*9)*(1-i.t/.9)*i.vel*.25}else{i.t+=1/ee;const x=.085,f=Math.floor(i.t/x),v=i.t%x/x;if(f>=i.n){I.splice(u,1);continue}const p=3600+1800*Math.sin(v*Math.PI)-f*200;i.ph+=Ye*p/ee,h=Math.sin(i.ph)*Math.sin(Math.PI*Math.min(1,v*1.6))**2*(v<.62?1:0)*i.vel*.08}s+=h*(1-i.wet)*.6,c+=h*i.wet}let d=0;for(const u of ko){const i=u.b[u.i];u.f=i*.72+u.f*.28,u.b[u.i]=c+u.f*.93,u.i=(u.i+1)%u.b.length,d+=i}d*=.2;for(const u of Do){const i=u.b[u.i],h=d+i*.5;u.b[u.i]=h,u.i=(u.i+1)%u.b.length,d=i-h*.5}Tt[a]=Math.tanh((s*.5+d*.55)*1.4)}return Tt.subarray(0,t)};let re=Math.asin(C(-25*k/Math.max(J.a,.01),-1,1));if(r.home){let t=9;for(let a=0;a<200;a++){const n=-1.5+a*.015,s=Pe(J.c+J.a*Math.sin(n)),c=Math.abs(s[0]-140*k);c<t&&(t=c,re=n)}}else re=(ge*2-1)*1.3;const Na=Pe(J.c+J.a*Math.sin(re));let qe=Na[0],ne=Na[1],Et=0,ce=0,ka=0,zt=0,ot=0,Mt=14+R()*20,gt=0;const Pt=S==="south"||S==="floor"||S==="gallery"||A==="modern"&&S==="choir";Pt&&(Mt+=18);const rt=new Float32Array(64);let ue=null,Jt=0,$t=0,Be=!1,_e=!1,St=!1,Lt=0,ea=3+R()*8,ta=18+R()*30,aa=0,Ft=0,Ee=-1,oa=4+R()*6,Da=0,Ua=!1,qt=0,Go=[];const Io=b(180,240),Xo=[],he=[0,0,0],Wa=(t,a)=>{const n=t.face<2?t.face?-o.hw:o.hw:t.s,s=t.face===4?o.top:t.y,c=t.face<2?t.s:t.face===2?o.z1:t.face===3?o.z0:t.y;let d=s/Math.max(a[1],.02);a[0]>1e-4?d=Math.min(d,(n+o.hw)/a[0]):a[0]<-1e-4&&(d=Math.min(d,(n-o.hw)/a[0])),a[2]>1e-4?d=Math.min(d,(c-o.z0)/a[2]):a[2]<-1e-4&&(d=Math.min(d,(c-o.z1)/a[2])),he[0]=n-a[0]*d,he[1]=s-a[1]*d,he[2]=c-a[2]*d};if(!r.home){const t=re;let a=-1;for(let s=0;s<=32;s++){const c=-1.35+s*2.7/32,d=Pe(J.c+J.a*Math.sin(c));if(d[1]<4*k)continue;const u=Ut(d[0],d[1]);let i=0;for(let h=0;h<Ae;h++){const x=xe[h],f=xa[x.face],v=u[0]*f[0]+u[1]*f[1]+u[2]*f[2];if(v<=0)continue;Wa(x,u);const p=et(he);let l=1;if(A==="modern"&&x.depth>.6){const m=x.face<2?u[2]:u[0],T=x.face===4?u[2]:u[1];l=C(1-Math.max(x.depth*Math.abs(m)/v-x.splay,0)/(2*x.hx),0,1)*C(1-Math.max(x.depth*Math.abs(T)/v-x.splay,0)/(2*x.hy),0,1)}if(p&&p[0]>.04&&p[0]<.96&&p[1]>.04&&p[1]<.96&&(i+=l*x.area*v*(x.avg[0]+x.avg[1]+x.avg[2])/(1+p[2]*.08)*(Pt?.4+p[1]:1)),l<1&&A==="modern"&&x.depth>.6&&x.face<2){const m=et([x.face?-o.hw:o.hw,x.y,x.s]);m&&m[0]>.02&&m[0]<.98&&m[1]>.02&&m[1]<.98&&(i+=.5*(1-l)*(Math.max(0,u[2]*Math.sign(j[2]-x.s))+(x.y<j[1]?u[1]:0))*x.area*v*(x.avg[0]+x.avg[1]+x.avg[2])/(1+m[2]*.08))}}i*=1-(Pt?.12:.35)*Math.abs(c-t)/2.7,i>a&&(a=i,re=c)}const n=Pe(J.c+J.a*Math.sin(re));qe=n[0],ne=n[1]}const Ie=new Float32Array(20),Bt=new Float32Array(20),ze=new Float32Array(15),Xe=new Float32Array(5),Ce=new Float32Array(15),nt=new Float32Array(5),ct=new Float32Array(5),ra=new Float32Array(15),Vo=(t,a)=>{const n=zo(t,a),[s,c]=yo(o,j,n);if(n[1]<-.05&&s!==4&&j[1]+n[1]*c<0)return-1;const d=[j[0]+n[0]*c,j[1]+n[1]*c,j[2]+n[2]*c],[u,i]=bo(s,d);for(const f of o.pil){const v=f[0]-j[0],p=f[1]-j[2],l=n[0]*n[0]+n[2]*n[2],m=(v*n[0]+p*n[2])/l;if(m>0&&m<c&&j[1]+n[1]*m<f[3]){const T=v-n[0]*m,_=p-n[2]*m;if(T*T+_*_<f[2]*f[2]*.8)return-1}}let h=-1,x=.35+c*.008;return xe.slice(0,Ae).forEach((f,v)=>{if(f.face!==s)return;const p=po(u-f.s,i-f.y,f.hx,f.hy,f.shape);p<x&&(x=p,h=v)}),h},X=[0,1,0],me=[0,0,0],Ve=[0,0,0],B=new Float32Array(15),O=[0,0,0],Ke=[0,0,0];let Oa=2*(o.z1-o.z0)*o.H+2*2*o.hw*o.H+2*2*o.hw*(o.z1-o.z0);const je=[1,1,1],Ko=()=>{Ga(0);const t=Ha,a=[Ke[0],Ke[1],Ke[2]];Ga(ce),qt=qt?ke(qt,t,.04):t;const n=a[0]*.3+a[1]*.55+a[2]*.15+1e-6;for(let c=0;c<3;c++)je[c]=ke(1,n/Math.max(a[c],1e-6),.72);const s=je[0]*.3+je[1]*.55+je[2]*.15;for(let c=0;c<3;c++)je[c]/=s};let Ha=1;const jo=.11,Ga=t=>{const a=Ut(qe,ne);X[0]=a[0],X[1]=a[1],X[2]=a[2];const n=Math.max(ne,0),s=1/Math.max(Math.sin(n)+.025,.03),c=[Math.exp(-.035*s),Math.exp(-.085*s),Math.exp(-.2*s)],d=Math.sqrt(c[0]*.3+c[1]*.55+c[2]*.15),u=ut(-.02,.06,ne),i=1-.9*t;for(let l=0;l<3;l++)me[l]=Ue.E[l]*c[l]/d*u*i*(1+.3*zt);const h=(.55+1.3*Math.sin(n))*(1-.3*t)*(.3+.7*u);for(let l=0;l<3;l++)Ve[l]=ke(Ue.sky[l],.6,t*.6)*h;B.fill(0),O[0]=O[1]=O[2]=0,Xe.fill(0),Ce.fill(0),ra.fill(0),nt.fill(1e9),ct.fill(-1e9);for(let l=0;l<Ae;l++){const m=xe[l],T=xa[m.face],_=Math.max(0,X[0]*T[0]+X[1]*T[1]+X[2]*T[2]),K=1+rt[l]*1.5;if(_>0&&!o.ruin[0]){const M=m.face,H=(m.avg[0]*me[0]*.3+m.avg[1]*me[1]*.55+m.avg[2]*me[2]*.15)*m.area*_*K+1e-9;Wa(m,X);const Y=M<2?he[2]:he[0];Xe[M]+=H,Ce[M*3]+=he[0]*H,Ce[M*3+1]+=he[1]*H,Ce[M*3+2]+=he[2]*H,Y<nt[M]&&(nt[M]=Y),Y>ct[M]&&(ct[M]=Y)}for(let M=0;M<3;M++)B[m.face*3+M]+=m.avg[M]*m.area*(Ve[M]+me[M]*_*.06)*K,O[M]+=m.avg[M]*m.area*me[M]*_*K,ra[m.face*3+M]+=m.avg[M]*m.area*me[M]*_*K}if(o.ruin[0]){const l=2*o.hw*(o.z1-o.z0)*.9;for(let m=0;m<3;m++)B[12+m]+=l*Ve[m]*1.4,B[m]+=14*Ve[m],B[3+m]+=14*Ve[m],O[m]+=l*me[m]*Math.max(X[1],0)*.9}for(let l=0;l<5;l++){const m=B[l*3]*.3+B[l*3+1]*.55+B[l*3+2]*.15;for(let T=0;T<3;T++)B[l*3+T]=ke(B[l*3+T],m,.55)}{const l=O[0]*.3+O[1]*.55+O[2]*.15;for(let m=0;m<3;m++)O[m]=ke(O[m],l,.35)}const x=2.6*Ue.amb/Oa,f=1.7*We[2][0]/Oa*(ie==="leaves"?.4:1);for(let l=0;l<15;l++)B[l]*=x;for(let l=0;l<3;l++)O[l]*=f;let v=0;for(let l=0;l<5;l++)v+=B[l*3]*.3+B[l*3+1]*.55+B[l*3+2]*.15;v=v/2.2+(O[0]*.3+O[1]*.55+O[2]*.15)*.5;for(let l=0;l<5;l++){const m=l*4;if(Xe[l]<1e-6){ze[l*3]=ze[l*3+1]=ze[l*3+2]=0;continue}const T=C(Ce[l*3]/Xe[l],-o.hw+.7,o.hw-.7),_=Math.max(Ce[l*3+1]/Xe[l],.5),K=C(Ce[l*3+2]/Xe[l],o.z0+.7,o.z1-.7),M=l<2?C(nt[l],o.z0+.7,o.z1-.7):C(nt[l],-o.hw+.7,o.hw-.7),H=l<2?C(ct[l],o.z0+.7,o.z1-.7):C(ct[l],-o.hw+.7,o.hw-.7);Ie[m]=l<2?T:M,Ie[m+1]=_,Ie[m+2]=l<2?M:K,Ie[m+3]=(H-M)*.5,Bt[m]=l<2?0:H-M,Bt[m+1]=0,Bt[m+2]=l<2?H-M:0;for(let Y=0;Y<3;Y++)ze[l*3+Y]=ra[l*3+Y]*We[2][Y]*jo;v+=(ze[l*3]*.3+ze[l*3+1]*.55+ze[l*3+2]*.15)*.3/(5*(5+Ie[m+3]))}Ha=C(.145/Math.max(v,1e-4),2.5,80)**.9*(S==="floor"?1.3:A==="modern"?1.12:1);for(let l=0;l<3;l++)Ke[l]=(B[l]+B[3+l]+B[6+l]+B[9+l]+B[12+l])*.25+O[l]*.2},V={uL:X,uE:me,uSky:Ve,uAF:B,uBnc:O,uHaze:Ke,uZen:new Float32Array(3),uHor:new Float32Array(3),uAir:[ya[0],ya[1],0,0],uExp:1,uWB:je,uT:0,uCloud:0,uCan:Re?new Float32Array([Re[0],1.05,Re[1],0]):[0,0,0,0],uEqG:new Float32Array(4),uGlow:rt,uAmbM:new Float32Array(3),uBA:Ie,uBB:Bt,uBC:ze,uMixK:1,uFr:0},Ia={...wt,uPos:4,uAlb:5,uNrm:6,uSh:7,uC:8},Xa={};for(const t in V)delete Ia[t];const _t=t=>{t.own!==Xa&&(ft(e,t,Ia),t.own=Xa);const a=t.dk||(t.dk=Object.keys(t.u).filter(n=>n in V));for(const n of a){const s=V[n],{l:c,t:d}=t.u[n];d===e.FLOAT?e.uniform1f(c,s):d===e.FLOAT_VEC3?e.uniform3fv(c,s):d===e.FLOAT_VEC4?e.uniform4fv(c,s):d===e.FLOAT_VEC2?e.uniform2fv(c,s):e.uniform1i(c,s)}},Va=t=>{Ko();const a=B,n=D==="equinox"?Da:0;Re&&(V.uCan[3]=1.15*(.85+.15*Math.sin(t*13)*Math.sin(t*7.3)));{const u=(1-.4*ce)*(.4+.6*ut(-.05,.2,ne)),i=(1-.3*ce)*(.5+.5*ut(-.05,.2,ne));for(let h=0;h<3;h++)V.uZen[h]=Ue.zen[h]*u,V.uHor[h]=Ue.hor[h]*i,V.uAmbM[h]=Ke[h]*.5}V.uAF=a,V.uExp=qt,V.uT=t,V.uCloud=ce,V.uEqG[3]=n;const s=V;e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(F.vao),Sa(),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,Ht),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,Ea),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,za);const c=Math.hypot(X[0]-Ge[0],X[1]-Ge[1],X[2]-Ge[2]);Ge[0]=X[0],Ge[1]=X[1],Ge[2]=X[2];for(let u=Xt?6:1;u>0;u--)e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,It[bt]),bt^=1,e.bindFramebuffer(e.FRAMEBUFFER,_o[bt]),e.viewport(0,0,tt,tt),V.uFr=Ma=(Ma+1)%64,V.uMixK=Xt?u===6?1:.4:C(.3+c*30,.3,.9),e.useProgram(F.shaft.p),_t(F.shaft),e.drawArrays(e.TRIANGLES,0,3);Xt=!1,e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,It[bt]),e.bindFramebuffer(e.FRAMEBUFFER,Co),e.viewport(0,0,y,y),e.useProgram(F.comp[Ot].p),_t(F.comp[Ot]),e.drawArrays(e.TRIANGLES,0,3);let d=0;for(let u=0;u<Se;u++){const i=u*6,h=d*8;oe[h]=L[i],oe[h+1]=L[i+1],oe[h+2]=L[i+2],oe[h+3]=jt[u*2],oe[h+4]=0,oe[h+5]=0,oe[h+6]=0,oe[h+7]=jt[u*2+1],d++}for(const u of Kt){const i=.8+.2*Math.sin(t*11+u[3])*Math.sin(t*6.7+u[3]*2);oe.set([u[0],u[1]+.012*Math.sin(t*9+u[3]),u[2],.022,1,0,0,i*1.6],d*8),d++}if(Ee>=0){const u=Ee,i=qa(u),h=qa(Math.min(u+.004,.9999)),x=et(i),f=et(h);if(x&&f){const v=Math.atan2(-(f[1]-x[1]),f[0]-x[0]);oe.set([i[0],i[1],i[2],.34,2,t*26,v,0],d*8),d++}}e.bindVertexArray(Fa),e.bindBuffer(e.ARRAY_BUFFER,La),e.bufferSubData(e.ARRAY_BUFFER,0,oe,0,d*8),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(F.mote.p),_t(F.mote),e.drawArraysInstanced(e.POINTS,0,1,d),e.disable(e.BLEND),e.bindVertexArray(F.vao),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,ga),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,y,y),e.useProgram(F.post.p),_t(F.post),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)},Ct=4096,na=new Float32Array(Ct+1),Ka=Ct/(2*Math.PI);for(let t=0;t<=Ct;t++)na[t]=Math.sin(t/Ka);const ca=t=>{const a=t*Ka,n=Math.floor(a),s=n&Ct-1,c=na[s];return c+(na[s+1]-c)*(a-n)},Yo=(t,a)=>{const n=Math.min(1,t*1.5);for(let s=0;s<Se;s++){const c=s*6;let d=L[c],u=L[c+1],i=L[c+2];const h=.035*ca(u*1.3+a*.21+i*.7+s),x=.02*ca(d*1.1+a*.17+s*.3)+.004,f=.035*ca(d*.9+a*.23+u*.5+s*.7+1.5707963267948966);L[c+3]+=(h-L[c+3])*n,L[c+4]+=(x-L[c+4])*n,L[c+5]+=(f-L[c+5])*n,d+=L[c+3]*t,u+=L[c+4]*t,i+=L[c+5]*t,d<-o.hw+.2?d+=2*o.hw-.4:d>o.hw-.2&&(d-=2*o.hw-.4),u<.2?u=Vt-.1:u>Vt&&(u=.25),i<At?i+=Rt-At:i>Rt&&(i-=Rt-At),L[c]=d,L[c+1]=u,L[c+2]=i}},ja=(t,a,n,s,c,d,u)=>{for(let i=0;i<Se;i++){const h=i*6,x=et([L[h],L[h+1],L[h+2]]);if(!x)continue;const f=x[0]-t,v=x[1]-a,p=f*f+v*v;if(p>c*c*4)continue;const l=Math.exp(-p/(c*c))*d*Math.min(x[2],12)*.5;let m=n,T=s;if(u){const _=Math.sqrt(p)+.001;m=f/_,T=v/_}m+=-v*2.5*Math.sign(n+1e-6)*.3,T+=f*2.5*.3;for(let _=0;_<3;_++)L[h+3+_]+=(W[_]*m-se[_]*T)*l}};return Va(0),(t,a)=>{a=Math.min(a,.25),Lt+=a;const n=r.input,s=n.taps();let c=null;if(n.down&&!St&&(ue={x:n.x,y:n.y,t:Lt,moved:0},Jt=n.x,$t=n.y,Be=!1,_e=!1),n.down&&ue){const i=n.x-Jt,h=n.y-$t;ue.moved+=Math.hypot(i,h),ue.moved>.02&&!_e&&(Be=!0),Be?(qe+=i*150*k,ne=C(ne-h*85*k,1.5*k,76*k),Et=1,Math.hypot(i,h)>1e-4&&ja(n.x,n.y,i/Math.max(a,.016),h/Math.max(a,.016),.09,.25,!1)):Lt-ue.t>.32&&(_e=!0),Jt=n.x,$t=n.y}if(!n.down&&St&&ue){if(!Be&&!_e&&Lt-ue.t<.35&&(c=[ue.x,ue.y]),Be){let i=re,h=1e9;for(let x=0;x<96;x++){const f=-Math.PI/2+x/95*Math.PI,v=Pe(J.c+J.a*Math.sin(f));let p=v[0]-qe;p=Math.atan2(Math.sin(p),Math.cos(p));const l=p*p+(v[1]-ne)**2*2;l<h&&(h=l,i=f)}re=i}ue=null,Be=!1,_e=!1}if(s.length&&!n.down&&!St&&!c&&(c=[s[0].x,s[0].y]),St=n.down,c){const i=Vo(c[0],c[1]);if(i>=0){rt[i]=1;const h=xe[i];ve(h.note,.55),h.note<50&&ve(h.note+12,.3)}else ja(c[0],c[1],0,0,.07,.35,!0)}Mt-=a,Mt<=0&&!_e&&(gt=5+R()*6,Mt=22+R()*30+gt),gt>0?(gt-=a,ot=Math.min(.75,ot+a*.5)):ot=Math.max(0,ot-a*.35);const d=_e?1:ot,u=ce;if(ce+=(d-ce)*Math.min(1,a*(d>ce?1.4:.9)),u>.45&&ce<=.45&&d<.1&&(zt=1,Le.on&&(ve(62,.22),ve(69,.18),ve(74,.16))),zt=Math.max(0,zt-a*.5),ka+=a,!Be){const i=(Z==="dawn"?.045:.03)*(Pt?.3:1);re+=a*i,re>Math.PI/2&&(re-=Math.PI);const[h,x]=Pe(J.c+J.a*Math.sin(re));Et=Math.max(0,Et-a*.12);const f=Math.min(1,a*(Et>.01?.25:2));let v=h-qe;v=Math.atan2(Math.sin(v),Math.cos(v)),qe+=v*f,ne+=(x-ne)*f}for(let i=0;i<Ae;i++)rt[i]=Math.max(0,rt[i]-a*.55);if(Yo(a,t),D==="swallow"&&(oa-=a,Ee<0&&oa<=0&&(Ee=0,oa=16+R()*14,Ca(.7)),Ee>=0&&(Ee+=a/6.5,R()<a*.8&&Ca(.5),Ee>=1&&(Ee=-1))),D==="equinox"&&vt){const i=Ut(qe,ne),h=vt.y/Math.max(i[1],.01),x=o.hw-i[0]*h,f=vt.s-i[2]*h,v=Math.hypot(x-xt[0],f-xt[1]);Da=ut(.45,.1,v)*(1-ce);const p=v<.2&&ce<.5;p&&!Ua&&(ve(62,.5),ve(66,.4),ve(69,.4),ve(74,.35)),Ua=p}if(Le.on){ea-=a,ea<=0&&(Wo(b(.4,.8)),R()<.25&&Qo(),ea=6+R()*14),ta-=a,ta<=0&&(aa=3+Math.floor(R()*3),Ft=0,ta=50+R()*40),aa>0&&(Ft-=a,Ft<=0&&(Uo(Io,.45),aa--,Ft=2.6));const i=Math.round(Math.min(a,.2)*ee);i>0&&Le.pcm(Ho(i),ee,{vel:.7})}else I.length=0;Va(t)};function Qo(){Oo(.6)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
