// Stone Church: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/038.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(va){va&&function(){"use strict";const ma=new WeakMap,D=Math.PI/180,Qe=Math.PI*2,C=(a,e,y)=>a<e?e:a>y?y:a,Ne=(a,e,y)=>a+(e-a)*y,xt=(a,e,y)=>{const b=C((y-a)/(e-a),0,1);return b*b*(3-2*b)},xe=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler2DArray;
uniform int uOne;
float at2(float y, float x){ float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-30)); if (ay > ax) a = 1.5707963 - a; if (x < 0.) a = 3.1415927 - a; return y < 0. ? -a : a; }
`,be=`#version 300 es
void main(){ vec2 p = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1)) * 4. - 1.; gl_Position = vec4(p, 0., 1.); }`,pa=`
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
`,Ze=`
uniform vec3 uBMin, uBMax;
uniform vec4 uFM[5];
uniform vec2 uIdRes;
uniform sampler2D uId;
uniform sampler2D uWD;
uniform vec4 uRuin;
uniform vec4 uPil[16];
uniform int uNP;
`+pa+`
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
`,Wt=`
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
`,so=`
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
`,lo=`
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
`,uo=xe+`
out vec4 o;
float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p, float per){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h21(mod(i, per)), h21(mod(i + vec2(1., 0.), per)), f.x), mix(h21(mod(i + vec2(0., 1.), per)), h21(mod(i + 1., per)), f.x), f.y); }
float fbm(vec2 uv, float per){ float s = 0., a = .5, t = 0.; for (int i = 0; i < 5 * uOne; i++) { s += a * vn(uv * per + float(i) * 17.3, per); t += a; per *= 2.; a *= .5; } return clamp((s / t - .5) * 1.9 + .5, 0., 1.); }
void main(){ vec2 uv = gl_FragCoord.xy / 256.; o = vec4(fbm(uv, 4.), fbm(uv, 8.), fbm(uv, 16.), h21(floor(gl_FragCoord.xy))); }`,fo=`
uniform vec2 uHalf, uRes; uniform float uShape, uStyle, uKind, uSeed, uVar;
uniform vec3 uPal[7];
uniform sampler2D uN;
out vec4 o;
const float TAU = 6.2831853;
`+pa+`
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
}`,xo=xe+Ze+so+`
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
}`,ho=xe+Ze+`
uniform float uH; uniform vec4 uPR;
`+lo+`
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
}`,vo=xe+Ze+Wt+`
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
}`,mo=a=>xe+(a?`#define MODC 1
`:"")+Ze+Wt+`
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
}`,po=[["#define LBS (wid >= 0 ? 6. : 0.)","#define LBS (wid >= 0 ? 6. : 2.)"],["col = glassCol(p, rd, dist, wf, wlc, wid) * GLK;","col = glassCol(p, rd, dist, wf, wlc, wid) * GLK / clamp(9. / uExp, .06, 1.);"],[`      vec3 gk = vec3(1.);
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
#define GLK 1.9`]],yo=[["  vec3 T = textureLod(uGl, vec3(uv, B.x), log2(max(bl * tpm, 1.)) + lb).rgb;",`  float lv = log2(max(bl * tpm, 1.)) + lb; vec2 hd = exp2(lv) * .5 / vec2(uLR, uLR * 4.);
  vec3 T = (textureLod(uGl, vec3(uv + hd, B.x), lv).rgb + textureLod(uGl, vec3(uv - hd, B.x), lv).rgb) * .5;`]],ya=a=>{let e=mo(a&1);for(const[y,b]of(a&1?po:[]).concat(a&2?yo:[])){if(e.indexOf(y)<0)throw new Error("038 composite patch: "+y);e=e.split(y).join(b)}return e},bo=xe+`
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
}`,wo=a=>xe+"#define GV "+a+`
`+fo,To=xe+Ze+Wt+`
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
}`,Eo=xe+`
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
}`;function Ro(a,e){const y=a.getExtension("KHR_parallel_shader_compile"),b=e.map(([E,z,g])=>{const S=a.createProgram(),R=[];for(const[_,w]of[[a.VERTEX_SHADER,E],[a.FRAGMENT_SHADER,z]]){const T=a.createShader(_);a.shaderSource(T,w),a.compileShader(T),a.attachShader(S,T),R.push(T)}return g&&g.forEach((_,w)=>a.bindAttribLocation(S,w,_)),a.linkProgram(S),{p:S,sh:R}});return a.flush(),b.map(E=>({p:E.p,sh:E.sh,u:null}))}function Je(a,e){if(e.u)return e;if(!a.getProgramParameter(e.p,a.LINK_STATUS))throw new Error("Nave shader: "+e.sh.map(E=>a.getShaderInfoLog(E)).join(" | ")+a.getProgramInfoLog(e.p));const y={},b=a.getProgramParameter(e.p,a.ACTIVE_UNIFORMS);for(let E=0;E<b;E++){const z=a.getActiveUniform(e.p,E);y[z.name.replace("[0]","")]={l:a.getUniformLocation(e.p,z.name),t:z.type}}return e.u=y,e.sh=null,e}function ge(a,e,y,b,E,z,g,S,R){const _=a.createTexture();return a.bindTexture(a.TEXTURE_2D,_),a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.texImage2D(a.TEXTURE_2D,0,b,e,y,0,E,z,g),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,S),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,S===a.LINEAR_MIPMAP_LINEAR?a.LINEAR:S),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,R),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,R),_}function Ue(a,e){const y=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,y),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),y}function ht(a,e,y){for(const b in e.u){const E=y[b];if(E===void 0)continue;const{l:z,t:g}=e.u[b];g===a.FLOAT?a.uniform1f(z,E):g===a.FLOAT_VEC2?a.uniform2fv(z,E):g===a.FLOAT_VEC3?a.uniform3fv(z,E):g===a.FLOAT_VEC4?a.uniform4fv(z,E):g===a.FLOAT_MAT3?a.uniformMatrix3fv(z,!1,E):a.uniform1i(z,E)}}function Ao(a,e,y){let b=ma.get(a);const E=e.filter((ee,Pe)=>e.indexOf(ee)===Pe&&!(b&&b.glass[ee])),z=!(b&&b.comp[y]);if(b&&!E.length&&!z)return b;a.getExtension("EXT_color_buffer_float");const g=E.map(ee=>[be,wo(ee)]),S=b?g.concat(z?[[be,ya(y)]]:[]):[[be,uo]].concat(g,[[be,xo],[be,ho],[be,ya(y)],[be,vo],[To,Eo,["aP","aQ"]],[be,bo]]),R=Ro(a,S),_=R.slice(b?0:1,(b?0:1)+E.length);if(b)return z&&(b.comp[y]=R[E.length]),E.forEach((ee,Pe)=>{b.glass[ee]=_[Pe]}),b;const[w,T,We,N,Z,ie,se]=[R[0]].concat(R.slice(1+E.length));return b={noise:w,glass:[],b0:T,b2:We,shaft:Z,comp:[],post:se,mote:ie,vao:a.createVertexArray(),idL:[]},b.comp[y]=N,E.forEach((ee,Pe)=>{b.glass[ee]=_[Pe]}),b.nTex=a.createTexture(),a.bindTexture(a.TEXTURE_2D,b.nTex),a.texStorage2D(a.TEXTURE_2D,9,a.RGBA8,256,256),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.REPEAT),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.REPEAT),b.nTodo=!0,ma.set(a,b),b}function zo(a,e){if(!e.nTodo)return;e.nTodo=!1;const y=Ue(a,e.nTex);a.viewport(0,0,256,256),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),Je(a,e.noise),a.useProgram(e.noise.p),a.uniform1i(a.getUniformLocation(e.noise.p,"uOne"),1),a.bindVertexArray(e.vao),a.drawArrays(a.TRIANGLES,0,3),a.bindTexture(a.TEXTURE_2D,e.nTex),a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.bindFramebuffer(a.FRAMEBUFFER,null),a.deleteFramebuffer(y)}function Mo(a,e,y,b,E){const z=Math.abs(a)-y,g=Math.abs(e)-b;if(E<.5)return Math.hypot(Math.max(z,0),Math.max(g,0))+Math.min(Math.max(z,g),0);if(E>2.5)return Math.hypot(a,e)-y;const S=E<1.5?b-y:b-1.732*y;if(e<=S)return Math.max(z,g);if(E<1.5)return Math.hypot(a,e-S)-y;const R=2*y;return Math.hypot(Math.abs(a)+R-y,e-S)-R}const ba=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,1,0]];function go(a,e,y){const b=Math.abs(y[0])<1e-5?1e-5:y[0],E=Math.max(y[1],1e-5),z=Math.abs(y[2])<1e-5?1e-5:y[2],g=((b>0?a.hw:-a.hw)-e[0])/b,S=((z>0?a.z1:a.z0)-e[2])/z,R=(a.top-e[1])/E;return g<S&&g<R?[b>0?0:1,g]:S<R?[z>0?2:3,S]:[4,R]}const Po=(a,e)=>a<2?[e[2],e[1]]:a<4?[e[0],e[1]]:[e[0],e[2]],wa={med:{c:[[.03,.085,.5],[.6,.022,.025],[.74,.44,.05],[.62,.64,.55],[.05,.33,.1],[.22,.04,.32],[.04,.22,.42]],w:[.4,.27,.12,.13,.04,0,.04]},nouv:{c:[[.12,.36,.08],[.38,.42,.1],[.3,.48,.16],[.6,.52,.3],[.74,.46,.05],[.36,.16,.4],[.34,.5,.6]],w:[.12,.2,.08,.4,.08,.04,.08]},mod:{c:[[.05,.1,.42],[.5,.045,.05],[.7,.52,.1],[.06,.3,.15],[.62,.26,.06],[.6,.63,.6],[.2,.08,.36]],w:[.15,.15,.15,.14,.14,.14,.13]},clr:{c:[[.05,.12,.48],[.58,.04,.03],[.66,.44,.06],[.8,.84,.78],[.86,.7,.2],[.08,.3,.12],[.3,.06,.3]],w:[.03,.03,.03,.88,.03,0,0]}},Lo=(a,e)=>{const y=[0,0,0];return a.c.forEach((b,E)=>{for(let z=0;z<3;z++)y[z]+=b[z]*a.w[E]*e}),y};va.add({num:38,name:"Stone Church",fam:"Worlds",recipe:"An empty stone church where the coloured light from the windows lands exactly where it would on the floor, pillars, pews and walls. The church, the glass, the season and where you're standing change every mint. Drag to move the sun, hold for a cloud to pass over, or tap a window to make it glow and ring.",interactive:"Drag to move the sun across the sky; hold for a passing cloud; tap a window to make its glass glow and ring.",music:!0,gl:!0,fps:30,seed:0,make(a){const e=a.gl,y=a.size,b=a.hash.replace(/^0x/,"").padEnd(64,"0");let E=parseInt(b.slice(0,8),16)>>>0,z=parseInt(b.slice(8,16),16)>>>0,g=parseInt(b.slice(16,24),16)>>>0,S=parseInt(b.slice(24,32),16)>>>0;const R=()=>{E>>>=0,z>>>=0,g>>>=0,S>>>=0;let t=E+z|0;return E=z^z>>>9,z=g+(g<<3)|0,g=g<<21|g>>>11,S=S+1|0,t=t+S|0,g=g+t|0,(t>>>0)/4294967296};for(let t=0;t<16;t++)R();const _=t=>{let o=0;for(const[,u]of t)o+=u;let n=R()*o;for(const[u,c]of t)if((n-=c)<0)return u;return t[t.length-1][0]},w=(t,o)=>t+(o-t)*R();let T=_([["gothic",40],["romanesque",27],["modern",25],["ruin",8]]),We=_(T==="modern"?[["mod",50],["med",18],["nouv",14],["clr",18]]:[["med",36],["nouv",24],["mod",18],["clr",22]]),N=_([["none",72],["candles",12],["swallow",10],["equinox",6]]),Z=_([["winter",25],["summer",25],["autumn",30],["dawn",20]]),ie=T==="ruin"?"leaves":_(T==="modern"?[["chairs",55],["empty",45]]:[["pews",50],["empty",22],["chairs",28]]),se=_(T==="modern"?[["concrete",70],["whiteconcrete",30]]:[["honey",35],["grey",30],["white",20],["red",15]]),ee=_([["clear",28],["dusty",47],["incense",25]]);const Pe=R();a.home&&(T="gothic",We="med",N="none",Z="autumn",ie="pews",se="honey",ee="dusty"),N==="equinox"&&Z==="dawn"&&(Z="autumn"),T==="ruin"&&N==="candles"&&(N="none"),N==="swallow"&&(N="none");const we={building:{gothic:"High Gothic nave",romanesque:"Romanesque chapel",modern:"Modern concrete chapel",ruin:"Ruined abbey, open to the sky"},glass:{med:"Deep medieval blue and red",nouv:"Art Nouveau greens and golds",mod:"Abstract colour fields",clr:"Clear leaded glass with a roundel"},season:{winter:"Winter low sun",summer:"Summer high sun",autumn:"Autumn gold",dawn:"Dawn"},furn:{pews:"Oak pews",empty:"Worn flagstones",chairs:"Rows of chairs",leaves:"Fallen leaves"},stone:{honey:"Honey limestone",grey:"Pale grey limestone",white:"Whitewashed",red:"Red sandstone",concrete:"Board-marked concrete",whiteconcrete:"Whitewashed concrete"},air:{clear:"Clear air",dusty:"Dusty air",incense:"Incense haze"},rare:{none:"None",candles:"A rack of votive candles",swallow:"A swallow flying through",equinox:"Equinox alignment"}};a.trait("Building",we.building[T]),a.trait("Glass",T==="ruin"?"Empty tracery, "+we.glass[We].toLowerCase()+" fragments":we.glass[We]),a.trait("Season light",we.season[Z]),a.trait("Furnishing",we.furn[ie]),a.trait("Stone",we.stone[se]),a.trait("Air",we.air[ee]),a.trait("Something rare",we.rare[N]);const r={hw:7,z0:0,z1:40,H:13,top:18,vt:0,hall:[0,0,0,0],tv:[0,0,0,0],ta:[0,0,0,0],rib:[0,6,0,.2],pr:[0,0,1,0],ps:[.07,8,.12,0],pil:[],step:[0,0,0,0],altar:[0,0,0,0],ruin:[0,0,0,0],cam:null},he=[],Te=[],So=t=>wa[t],Oe=y<=300?128:256,vt=Oe*4,U=(t,o,n,u,c,x)=>{const f=Math.min(Oe/(2*u),vt/(2*c)),i=Math.max(4,Math.round(2*u*f)),v=Math.max(4,Math.round(2*c*f));return Te.push({kind:t,style:o,shape:n,hx:u,hy:c,seed:w(0,40),varN:x||12,vw:i,vh:v}),Te.length-1},k=(t,o,n,u,c,x,f,i,v,d)=>{const l=Te[f],h=So(l.style),p=l.kind===3||l.kind===4?1:l.style==="clr"?.88:.8;let s=l.kind===3||l.kind===4?[.85,.85,.85]:Lo(h,p);l.kind===1&&(s=s.map(m=>m*.7)),he.push({face:t,s:o,y:n,hx:u,hy:c,shape:x,layer:f,splay:i,depth:v,uv:d||[0,0,1,1],avg:s,area:Fo(u,c,x),note:0})},Fo=(t,o,n)=>n>2.5?Math.PI*t*t:4*t*o*(n>.5?.93:1),Ta={med:0,nouv:1,mod:2,clr:3},te=We,qo=(t,o,n)=>Math.max(1,Math.floor((o-t)/n));if(T==="gothic"||T==="ruin"){const t=r.hw=w(6.6,7.4),o=t*.54,n=r.H=w(12.4,13.6),u=w(5.6,6.3),c=r.z1=w(40,45),x=Math.min(7,Math.floor((c-12)/u)),f=o*1.25,i=Math.sqrt(f*f-(f-o)*(f-o)),v=(t-o)/2,d=Math.min(v*1.15,2.1),l=(v*v+d*d)/(2*d);r.top=n+i+.05,r.vt=T==="ruin"?3:0,r.hall=[o,f,v*1.3,1];const h=u/2,p=h*1.25,s=Math.sqrt(p*p-(p-h)*(p-h));r.tv=[p,p-h,n+i-s,n+i-s];const m=(h*h+d*d)/(2*d);r.ta=[m,0,n+d-m,n],r.pr=[o,6,u,x],r.rib=[6,u,x,.24],r.ps=[.1,8,.17,0];const A=.52;for(let Q=0;Q<2;Q++)for(let dt=0;dt<x;dt++){let De=n+.5;T==="ruin"&&(De=R()<.35?n+.5:w(1.2,n*.8)),r.pil.push([Q?o:-o,6+dt*u,A,De])}const B=6+(x-1)*u+3.2;r.step=[Math.min(B,c-6),.32,0,0],r.altar=[c-3,1.25,.5,T==="ruin"?0:1];const K=Math.min(1.2,u*.2),M=w(2.5,3.1),H=n-w(.9,1.4),Y=T==="ruin"?null:te,oo=T==="ruin"?[U(3,te,2,K,(H-M)/2),U(3,te,2,K,(H-M)/2)]:[U(0,Y,2,K,(H-M)/2),U(0,Y,2,K,(H-M)/2),U(0,Y,2,K,(H-M)/2)],ut=[];for(let Q=0;Q<=x;Q++)ut.push(6+(Q-.5)*u);let xa=ut[ut.length-1]+u;for(;xa<c-K-.8;)ut.push(xa),xa+=u;ut.forEach((Q,dt)=>{if(!(Q-K<.8))for(let De=0;De<2;De++)k(De,Q,(M+H)/2,K,(H-M)/2,2,oo[(dt+De)%oo.length],.18,.45)});const ro=Math.min(1.05,o*.3),Ut=n-.6,$o=U(T==="ruin"?3:0,te,2,ro,(Ut-2.4)/2);k(2,0,(2.4+Ut)/2,ro,(Ut-2.4)/2,2,$o,.15,.45);const ha=Math.min(.85,v*.45),ft=n-2.2,no=U(T==="ruin"?3:0,te,2,ha,(ft-2.6)/2);for(const Q of[-1,1])k(2,Q*(o+t)/2,(2.6+ft)/2,ha,(ft-2.6)/2,2,no,.15,.45);const ye=Math.min(o*.6,(i+.5)/2+.15),co=Ut+.45+ye,er=R()<.5?12:16,io=U(T==="ruin"?4:1,te,3,ye,ye,er);k(2,0,Math.min(co,r.top-ye-.25),ye,ye,3,io,.12,.5),k(3,0,Math.min(co-.3,r.top-ye-.25),ye*.9,ye*.9,3,io,.12,.5);for(const Q of[-1,1])k(3,Q*(o+t)/2,(2.6+ft)/2+1,ha,(ft-2.6)/2-1,2,no,.15,.45);r.cam={p:[-.45,1.62,1.1],yaw:2.5,pitch:T==="ruin"?10:7.5,fov:66},T==="ruin"&&(r.ruin=[1,w(7.5,9.5),w(3.2,4.2),w(0,6)]),r.pews={xi:.85,xo:o-A-.4,z0:6.5,z1:6+(x-1)*u+.3}}else if(T==="romanesque"){const t=r.hw=w(4,4.6),o=r.H=w(6.4,7.2),n=r.z1=w(20,23);r.top=o+t+.05,r.vt=0,r.hall=[0,t,0,0];const u=4,c=n/u;r.rib=[c,c,u-1,.3],r.pr=[t-.12,c,c,u-1],r.ps=[0,4,.1,0];for(let m=0;m<2;m++)for(let A=0;A<u-1;A++)r.pil.push([m?t-.12:-(t-.12),c*(A+1),.4,o+.3]);const x=w(.36,.46),f=w(.95,1.2),i=o-f-w(1,1.5),v=[U(0,te,1,x,f),U(0,te,1,x,f)];for(let m=0;m<u;m++)for(let A=0;A<2;A++)k(A,c*(m+.5),i,x,f,1,v[(m+A)%2],.3,.5);const d=.52,l=1.45,h=U(0,te,1,d,l);k(2,0,4.1,d,l,1,h,.4,.9);for(const m of[-1,1])k(2,m*2.3,3.9,.3,.8,1,h,.35,.9);const p=w(.65,.85),s=U(1,te,3,p,p,8);k(2,0,Math.min(o+1.6,r.top-p-.5),p,p,3,s,.35,.9),k(3,0,Math.min(o+1.4,r.top-p-.5),p*.9,p*.9,3,s,.35,.9),k(3,2.2,4,.32,.85,1,h,.35,.9),r.step=[n-4.2,.28,0,0],r.altar=[n-1.9,.9,.42,1],r.cam={p:[-.25,1.6,.9],yaw:1.5,pitch:10,fov:68},r.pews={xi:.6,xo:t-.95,z0:3.3,z1:n-5.6}}else{const t=r.hw=w(5.2,5.8),o=r.H=w(9.4,10.6),n=r.z1=w(25,29);r.top=o,r.vt=2,r.rib=[4.5,4.5,Math.floor((n-1)/4.5),.2];const u=U(2,te,0,3,12),c=(l,h,p,s)=>[((l-p)/6%1+1)%1*.8,((h-s)/12%1+1)%1*.6,2*p/6,2*s/24],x=[];for(let l=0;l<400&&x.length<15;l++){const h=w(.12,.48),p=w(.15,.8),s=w(2,n-2),m=w(1.2+p,o-1.3-p);x.some(A=>Math.abs(A.s-s)<A.hx+h+.45&&Math.abs(A.y-m)<A.hy+p+.45)||x.push({s,y:m,hx:h,hy:p})}x.forEach(l=>k(0,l.s,l.y,l.hx,l.hy,0,u,.5,1.2,c(l.s,l.y,l.hx,l.hy)));const f=4+Math.floor(R()*3);for(let l=0;l<f;l++){const h=3+(l+.5)*(n-6)/f+w(-.6,.6),p=w(.08,.14),s=w(2.6,3.8);k(1,h,o*.5,p,s,0,u,.25,1.2,c(h,o*.5,p,s))}const i=w(1.2,2.4)*(R()<.5?-1:1),v=U(2,te,0,.3,o/2);k(2,i,o/2,.3,o/2-.02,0,v,.3,1.2);for(let l=0;l<5;l++){const h=-i*.3-2+l*.9*Math.sign(-i||1)+w(-.1,.1),p=w(5,8),s=w(.1,.2);k(2,h,p,s,s,0,u,.3,1.2,c(h,p,s,s))}const d=U(5,"clr",0,t-.25,.32);k(4,0,n-.55,t-.25,.32,0,d,.1,.9),k(3,0,6.5,.22,.22,3,u,.25,1.2,c(0,6.5,.22,.22)),r.step=[n-5,.2,0,0],r.altar=[n-3,1.1,.5,1],r.cam={p:[-.35,1.6,1],yaw:3,pitch:6,fov:68},r.pews={xi:.7,xo:t-1.3,z0:3.2,z1:n-7.5}}if(ie==="empty"||ie==="leaves")r.pw=[0,0,1,0];else{const t=r.pews,o=ie==="pews"?.95:.9;r.pw=[ie==="pews"?1:2,t.z0,o,Math.max(1,Math.floor((t.z1-t.z0)/o)+1)],r.px=[t.xi,t.xo,0,0]}r.px=r.px||[0,0,0,0];const He={winter:{dec:-22*D,E:[6.2,5.6,4.9],sky:[.48,.58,.78],zen:[.25,.38,.7],hor:[.75,.78,.82],amb:1},summer:{dec:22*D,E:[6.8,6.5,6],sky:[.55,.66,.88],zen:[.18,.34,.78],hor:[.7,.78,.9],amb:1.1},autumn:{dec:-5*D,E:[6.8,5.6,4],sky:[.62,.6,.6],zen:[.24,.36,.66],hor:[.85,.76,.62],amb:1},dawn:{dec:14*D,E:[6.4,4.4,3],sky:[.72,.56,.62],zen:[.22,.26,.5],hor:[.95,.62,.45],amb:.85}}[Z],mt=N==="equinox"?0:He.dec,$e=51*D,Le=t=>{const o=Math.sin($e)*Math.sin(mt)+Math.cos($e)*Math.cos(mt)*Math.cos(t),n=Math.asin(C(o,-1,1));let u=Math.acos(C((Math.sin(mt)-o*Math.sin($e))/(Math.cos(n)*Math.cos($e)+1e-9),-1,1));return t>0&&(u=Qe-u),[u,n]},Ea=Math.acos(C(-Math.tan($e)*Math.tan(mt),-1,1)),J=Z==="dawn"?{c:-Ea+24*D,a:20*D}:{c:0,a:Ea-14*D},Ot=(t,o)=>[-Math.cos(o)*Math.cos(t),Math.sin(o),Math.cos(o)*Math.sin(t)];let pt=[0,0,0,0],yt=null;if(N==="equinox"){const[,t]=Le(0),o=r.pil.length?r.pr[1]+(r.pr[3]-1)*r.pr[2]+1:r.pews.z1+1.2;let n=0;const u=r.H-.8;let c=(r.hw-n)*Math.tan(t);c>u&&(n=r.hw-u/Math.tan(t),c=u),c<1.2&&(c=1.2,n=r.hw-c/Math.tan(t)),pt=[n,o,1,0],yt={s:o,y:c};const x=U(3,"clr",3,.08,.08);Te[x].kind=5,k(0,o,c,.075,.075,3,x,.02,.3)}const bt=[50,55,57,59,62,64,66,69,71,74,76,78,81];he.forEach((t,o)=>{t.shape===3&&t.hx>.5?t.note=43+(t.face===3?7:0):t.face<2?t.note=bt[C(Math.floor((t.s-r.z0)/(r.z1-r.z0)*8)+(t.face?1:3),0,bt.length-1)]:t.note=bt[C(6+Math.round(t.s*.8)+(t.face===3?-3:2),0,bt.length-1)],t.idx=o});const Ee=Math.min(he.length,64),Ie={honey:[[.56,.45,.29],[.6,.49,.33],[.4,.34,.25],.38],grey:[[.5,.49,.46],[.54,.53,.5],[.36,.35,.33],.4],white:[[.72,.7,.64],[.46,.44,.4],[.34,.32,.29],.36],red:[[.43,.22,.15],[.47,.25,.17],[.32,.22,.18],.34],concrete:[[.41,.4,.38],[.43,.42,.4],[.27,.26,.25],.14],whiteconcrete:[[.66,.65,.61],[.6,.59,.56],[.26,.25,.24],.14]}[se],Ra=[se==="white"||se==="whiteconcrete"?se==="white"?1:2:T==="modern"?2:se==="red"?3:0,T==="ruin"?1:0,ie==="empty"?.55:.3,Ie[3]];se==="whiteconcrete"&&(Ra[0]=2);const Aa={clear:[.005,.016],dusty:[.008,.034],incense:[.011,.05]}[ee];let P;{let t=(parseInt(b.slice(32,40),16)^2135587861)>>>0;const o=()=>{t=t+1831565813|0;let h=Math.imul(t^t>>>15,1|t);return h=h+Math.imul(h^h>>>7,61|h)^h,((h^h>>>14)>>>0)/4294967296},n=o(),u=o();P=n<.5?"west":n<.76?"choir":n<.9?"vault":"aisle",a.home&&(P="west"),T==="ruin"&&(P="west"),T==="romanesque"&&P!=="west"&&(P="vault"),T==="modern"&&P!=="west"&&(P="choir");const c=T==="gothic";P==="choir"&&(r.cam={p:[.4+u*.3,1.62,r.z1-(c?8.5:5.5)],yaw:176+u*5,pitch:c?9:7,fov:66}),P==="vault"&&(r.cam={p:[.25,1.5,r.z1*(.36+u*.1)],yaw:3,pitch:c?52:31,fov:74}),P==="aisle"&&(r.cam={p:[-(r.hw*.54+r.hw)/2+.2,1.6,1.1],yaw:5+u*3,pitch:7.5,fov:64});let x=(parseInt(b.slice(40,48),16)^3715113)>>>0;const i=(()=>{x=x+1831565813|0;let h=Math.imul(x^x>>>15,1|x);return h=h+Math.imul(h^h>>>7,61|h)^h,((h^h>>>14)>>>0)/4294967296})(),v=P==="west"||P==="choir",d=P==="choir";!a.home&&v&&T!=="ruin"&&(T==="modern"&&P==="choir"?i<.5&&(P="south"):i<.2?P="south":i<.42&&(P=T==="romanesque"?"south":i<.34?"floor":"gallery"),P==="floor"&&(Z==="winter"||Z==="dawn")&&(P="south"));const l=Z==="winter"||Z==="dawn"?1:0;P==="south"&&(r.cam=c?{p:[-r.hw*.3,1.6+.3*l,r.z1*.4],yaw:58,pitch:17+7*l,fov:70}:{p:[-r.hw*.55,1.6+.3*l,r.z1*.4],yaw:58,pitch:13+10*l,fov:70}),P==="floor"&&(r.cam=d?{p:[.2,1.62,r.z1*.7],yaw:176+u*6,pitch:-26,fov:62}:{p:[.2,1.62,r.z1*.3],yaw:2+u*6,pitch:-26,fov:62}),P==="gallery"&&(r.cam={p:[.3,c?r.H*.55:5.2,1],yaw:2,pitch:-17,fov:70})}a.trait("Standing",{west:"At the west door",choir:"In the choir, looking back west",vault:"Under the crossing, looking up",aisle:"In the side aisle",south:"Facing the south windows",floor:"Over the light on the floor",gallery:"From the west gallery"}[P]);const wt=r.cam,Tt=wt.yaw*D,Ht=wt.pitch*D,I=[Math.sin(Tt)*Math.cos(Ht),Math.sin(Ht),Math.cos(Tt)*Math.cos(Ht)],W=[Math.cos(Tt),0,-Math.sin(Tt)],le=[I[1]*W[2]-I[2]*W[1],I[2]*W[0]-I[0]*W[2],I[0]*W[1]-I[1]*W[0]],et=Math.tan(wt.fov*D/2),Bo=[W[0],W[1],W[2],le[0],le[1],le[2],I[0],I[1],I[2]],j=wt.p,tt=t=>{const o=[t[0]-j[0],t[1]-j[1],t[2]-j[2]],n=o[0]*I[0]+o[1]*I[1]+o[2]*I[2];return n<.2?null:[((o[0]*W[0]+o[1]*W[1]+o[2]*W[2])/(n*et)+1)/2,(1-(o[0]*le[0]+o[1]*le[1]+o[2]*le[2])/(n*et))/2,n]},_o=(t,o)=>{const n=(t*2-1)*et,u=(1-o*2)*et,c=[W[0]*n+le[0]*u+I[0],W[1]*n+le[1]*u+I[1],W[2]*n+le[2]*u+I[2]],x=Math.hypot(c[0],c[1],c[2]);return[c[0]/x,c[1]/x,c[2]/x]},za=t=>t.kind===1||t.kind===3||t.kind===4?0:t.kind===5?3:[1,2,3,3][Ta[t.style]],It=T==="modern"?1:P==="floor"||P==="south"?2:0,L=Ao(e,Te.map(za),It),ne=Math.min(y,1024),at=Math.max(48,Math.round(ne/4)),Co=Oe,Ma=Te.length,ue=128,fe=64,ga=[],Pa=t=>t<2?[r.z0,0,r.z1-r.z0,r.top]:t<4?[-r.hw,0,2*r.hw,r.top]:[-r.hw,r.z0,2*r.hw,r.z1-r.z0],La=a.hash+":"+Oe,Gt=L.idL.find(t=>t[0]===La);let ot=Gt?Gt[1]:null;for(let t=0;t<5;t++){const[o,n,u,c]=Pa(t);ga.push(o,n,1/u,1/c)}ot||(ot=new Uint8Array(ue*fe*5),L.idL.unshift([La,ot]),L.idL.length>6&&L.idL.pop());for(let t=0;t<5&&!Gt;t++){const[o,n,u,c]=Pa(t),x=he.slice(0,Ee).filter(d=>d.face===t);if(!x.length)continue;const f=x.length,i=new Float64Array(f*ue),v=new Float64Array(f*fe);for(let d=0;d<f;d++){const l=x[d];for(let h=0;h<ue;h++){const p=o+(h+.5)/ue*u;i[d*ue+h]=Math.max(Math.abs(p-l.s)-l.hx,0)**2}for(let h=0;h<fe;h++){const p=n+(h+.5)/fe*c;v[d*fe+h]=Math.max(Math.abs(p-l.y)-l.hy,0)**2}}for(let d=0;d<fe;d++)for(let l=0;l<ue;l++){let h=-1,p=1e9;for(let s=0;s<f;s++){const m=i[s*ue+l]+v[s*fe+d];m<p&&(p=m,h=x[s].idx)}ot[(t*fe+d)*ue+l]=h+1}}const ko=ge(e,ue,fe*5,e.R8,e.RED,e.UNSIGNED_BYTE,ot,e.NEAREST,e.CLAMP_TO_EDGE),rt=new Float32Array(4*4*Math.max(Ee,1));he.slice(0,Ee).forEach((t,o)=>{rt.set([t.s,t.y,t.hx,t.hy],(o*4+0)*4),rt.set([t.layer,t.shape,t.splay,t.depth],(o*4+1)*4);{const n=Te[t.layer],u=n.vw/Oe,c=n.vh/vt;rt.set([t.uv[0]*u,t.uv[1]*c,t.uv[2]*u,t.uv[3]*c],(o*4+2)*4)}{const n=T==="modern"&&t.depth>.6?0:1;rt.set([t.avg[0]*n,t.avg[1]*n,t.avg[2]*n,t.area],(o*4+3)*4)}});const Do=ge(e,4,Math.max(Ee,1),e.RGBA32F,e.RGBA,e.FLOAT,rt,e.NEAREST,e.CLAMP_TO_EDGE),Xt=ge(e,ne,ne,e.RG32F,e.RG,e.FLOAT,null,e.NEAREST,e.CLAMP_TO_EDGE),Sa=Ue(e,Xt),Fa=ge(e,ne,ne,e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE,null,e.NEAREST,e.CLAMP_TO_EDGE),qa=Ue(e,Fa),Ba=ge(e,ne,ne,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.NEAREST,e.CLAMP_TO_EDGE),_a=Ue(e,Ba),Vt=[0,1].map(()=>ge(e,at,at,e.RGBA16F,e.RGBA,e.HALF_FLOAT,null,e.NEAREST,e.CLAMP_TO_EDGE)),Kt=Vt.map(t=>Ue(e,t));let Et=0,Ca=0,jt=!0;const Ge=[0,0,0],Yt=ge(e,y,y,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR,e.CLAMP_TO_EDGE),Qt=Ue(e,Yt);e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0);for(const t of[Sa,qa,_a,Kt[0],Kt[1],Qt])e.bindFramebuffer(e.FRAMEBUFFER,t),e.clear(e.COLOR_BUFFER_BIT);e.bindFramebuffer(e.FRAMEBUFFER,null);const nt=e.createTexture();e.bindTexture(e.TEXTURE_2D_ARRAY,nt),e.texStorage3D(e.TEXTURE_2D_ARRAY,Math.floor(Math.log2(vt))+1,e.SRGB8_ALPHA8,Oe,vt,Ma),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const Zt=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,Zt),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.bindVertexArray(L.vao),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0);for(let t=0;t<Ma;t++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,nt,0,t),e.clear(e.COLOR_BUFFER_BIT);e.flush(),zo(e,L),e.bindFramebuffer(e.FRAMEBUFFER,Zt),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.bindVertexArray(L.vao),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,L.nTex),Te.forEach((t,o)=>{e.viewport(0,0,t.vw,t.vh),e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,nt,0,o);const n=t.kind===5?{c:[[.9,.9,.88],[.9,.9,.88],[.9,.9,.88],[.9,.9,.88],[.9,.9,.88],[.9,.9,.88],[.9,.9,.88]]}:wa[t.style],u=Je(e,L.glass[za(t)]);e.useProgram(u.p),ht(e,u,{uOne:1,uHalf:[t.hx,t.hy],uRes:[t.vw,t.vh],uShape:t.shape,uStyle:t.kind===5?3:Ta[t.style],uKind:t.kind===5?2:t.kind,uSeed:t.seed,uVar:t.varN,uPal:new Float32Array(n.c.flat()),uN:0}),e.drawArrays(e.TRIANGLES,0,3)}),e.bindTexture(e.TEXTURE_2D_ARRAY,nt),e.generateMipmap(e.TEXTURE_2D_ARRAY),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Zt);const ka=new Float32Array(64);r.pil.slice(0,16).forEach((t,o)=>ka.set(t,o*4));const Rt={uBMin:[-r.hw,0,r.z0],uBMax:[r.hw,r.top,r.z1],uFM:new Float32Array(ga),uIdRes:[ue,fe],uId:1,uWD:2,uGl:3,uN:0,uRuin:r.ruin,uH:r.H,uVt:r.vt,uHall:r.hall,uTv:r.tv,uTa:r.ta,uRib:r.rib,uPR:r.pr,uPS:r.ps,uPil:ka,uNP:Math.min(r.pil.length,16),uPw:r.pw,uPx:r.px,uSt:r.step,uAl:r.altar,uRk:[0,0,0,0],uCam:j,uRot:new Float32Array(Bo),uTan:et,uBR:[ne,ne],uSteps:200,uLR:Co,uSize:y,uSR:at,uSS:y<=300?16:24,uSA:Ie[0],uSB:Ie[1],uFA:Ie[2],uSK:Ra,uEq:pt,uGlow:new Float32Array(64),uOne:1};let Re=null;if(N==="candles"){const t=Math.max(r.pews.z0-1.25,4.2),o=-Math.min(2.3,r.hw-1.2);Re=[o,t],Rt.uRk=[o,t,1,0]}const Da=()=>{e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,L.nTex),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,ko),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Do),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D_ARRAY,nt)};e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.bindVertexArray(L.vao),e.viewport(0,0,ne,ne),Da(),Je(e,L.b0),Je(e,L.b2),e.bindFramebuffer(e.FRAMEBUFFER,Sa),e.useProgram(L.b0.p),ht(e,L.b0,{...Rt,uPos:0,uPass:0}),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,Xt),e.bindFramebuffer(e.FRAMEBUFFER,Qt),e.uniform1i(L.b0.u.uPos.l,4),e.uniform1i(L.b0.u.uPass.l,1),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,Yt),e.bindFramebuffer(e.FRAMEBUFFER,qa),e.useProgram(L.b2.p),ht(e,L.b2,{...Rt,uPos:4,uNr:5,uPass:0}),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,_a),e.uniform1i(L.b2.u.uPass.l,1),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null);const Se=1400,At=r.z0+1.8,zt=Math.min(r.z1-1,r.z0+20),Jt=Math.min(r.H,9),F=new Float32Array(Se*6);for(let t=0;t<Se;t++)F.set([w(-r.hw+.3,r.hw-.3),w(.3,Jt),w(At,zt),0,0,0],t*6);const $t=[];if(Re)for(let t=-1;t<=1;t++)for(let o=-3;o<=3;o++)R()<.72&&$t.push([Re[0]+o*.13,.89+t*.15*.5+.085,Re[1]+t*.15,w(0,6)]);const No=Se+$t.length+1,ae=new Float32Array(No*8),Na=e.createBuffer(),Ua=e.createVertexArray();e.bindVertexArray(Ua),e.bindBuffer(e.ARRAY_BUFFER,Na),e.bufferData(e.ARRAY_BUFFER,ae,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(1,1),e.bindVertexArray(null);const ea=[];for(let t=0;t<Se;t++)ea.push(w(.004,.011),w(.4,1.3));const Ae=[];if(N==="swallow"){Ae.push([w(-1,1),w(5,8),r.z0-4]);for(let o=0;o<7;o++){const n=o/6;Ae.push([w(-r.hw*.5,r.hw*.5),w(2.2,Math.min(r.H,7)),Ne(r.z0+3.5,Math.min(r.z1-4,22),Math.sin(n*Math.PI)*.9+n*.1)])}Ae.push([w(-1,1),w(5,8),r.z0-4])}const Wa=t=>{const o=Ae.length-1,n=C(t,0,.9999)*o,u=Math.floor(n),c=n-u,x=Ae[Math.max(u-1,0)],f=Ae[u],i=Ae[Math.min(u+1,o)],v=Ae[Math.min(u+2,o)];return[0,1,2].map(d=>.5*(2*f[d]+(-x[d]+i[d])*c+(2*x[d]-5*f[d]+4*i[d]-v[d])*c*c+(-x[d]+3*f[d]-3*i[d]+v[d])*c*c*c))},Fe=a.sound,$=22050,Uo=[1557,1617,1491,1422,1277,1356].map(t=>({b:new Float32Array(Math.round(t*$/44100*1.9)),i:0,f:0})),Wo=[556,441,341].map(t=>({b:new Float32Array(Math.round(t*$/44100)),i:0})),G=[];let Mt=new Float32Array(2048),qe=19088743,ta=0,aa=0,oa=0;const Oa=()=>(qe^=qe<<13,qe^=qe>>>17,qe^=qe<<5,(qe>>>0)/4294967296*2-1),Ha=(t,o,n,u,c)=>{!Fe.on||G.length>14||G.push({k:"tone",p:o.map(([x,f,i])=>({c:1,s:0,cr:Math.cos(Qe*t*x/$),sr:Math.sin(Qe*t*x/$),a:f*n,g:Math.exp(-1/($*i*c))})),wet:u,att:0,n:0})},ve=(t,o)=>Ha(440*Math.pow(2,(t-69)/12),[[1,.5,4.5],[2.01,.16,2.4],[3.02,.07,1.3],[4.17,.04,.8]],o,.7,1),Oo=(t,o)=>Ha(t,[[.5,.3,6],[1,.45,4],[1.19,.25,3],[1.5,.2,2.5],[2,.22,2],[2.52,.1,1.4],[3.01,.07,1]],o,.85,1),Ho=t=>{Fe.on&&G.length<15&&G.push({k:"coo",t:0,ph:0,vel:t,f:w(330,390),wet:.6})},Io=t=>{Fe.on&&G.length<15&&G.push({k:"flap",t:0,vel:t,wet:.5})},Ia=t=>{Fe.on&&G.length<15&&G.push({k:"chirp",t:0,ph:0,vel:t,wet:.4,n:2+Math.floor(R()*3)})},Go=t=>{Mt.length<t&&(Mt=new Float32Array(t));for(let o=0;o<t;o++){const n=Oa();ta+=(n-ta)*.02,aa+=(ta-aa)*.05,oa+=(n-oa)*.3;let u=aa*.9+(n-oa)*.012,c=0;for(let f=G.length-1;f>=0;f--){const i=G[f];let v=0;if(i.k==="tone"){i.att=Math.min(1,i.att+1/($*.006));let d=!1;for(const l of i.p){const h=l.c*l.cr-l.s*l.sr;l.s=l.c*l.sr+l.s*l.cr,l.c=h,l.a*=l.g,v+=l.s*l.a,l.a>2e-4&&(d=!0)}if(!(++i.n&1023))for(const l of i.p){const h=1/Math.hypot(l.c,l.s);l.c*=h,l.s*=h}if(v*=i.att,!d){G.splice(f,1);continue}}else if(i.k==="coo"){i.t+=1/$;const d=i.t,l=d<.32?0:d<.62?1:d<1.05?2:d<1.3?3:4;if(l===4){G.splice(f,1);continue}const h=[0,.32,.62,1.05][l],p=[.32,.3,.43,.25][l],s=(d-h)/p,m=i.f*[1,1.12,1,.9][l]*(1+.04*Math.sin(s*3.1));i.ph+=Qe*m/$;const A=Math.sin(Math.PI*s)**1.5*[.6,1,.8,.5][l];v=(Math.sin(i.ph)+.3*Math.sin(2*i.ph))*A*(.8+.2*Math.sin(i.ph*.07))*i.vel*.18}else if(i.k==="flap"){if(i.t+=1/$,i.t>.9){G.splice(f,1);continue}const d=i.t*11%1;v=Oa()*Math.exp(-d*9)*(1-i.t/.9)*i.vel*.25}else{i.t+=1/$;const d=.085,l=Math.floor(i.t/d),h=i.t%d/d;if(l>=i.n){G.splice(f,1);continue}const p=3600+1800*Math.sin(h*Math.PI)-l*200;i.ph+=Qe*p/$,v=Math.sin(i.ph)*Math.sin(Math.PI*Math.min(1,h*1.6))**2*(h<.62?1:0)*i.vel*.08}u+=v*(1-i.wet)*.6,c+=v*i.wet}let x=0;for(const f of Uo){const i=f.b[f.i];f.f=i*.72+f.f*.28,f.b[f.i]=c+f.f*.93,f.i=(f.i+1)%f.b.length,x+=i}x*=.2;for(const f of Wo){const i=f.b[f.i],v=x+i*.5;f.b[f.i]=v,f.i=(f.i+1)%f.b.length,x=i-v*.5}Mt[o]=Math.tanh((u*.5+x*.55)*1.4)}return Mt.subarray(0,t)};let oe=Math.asin(C(-25*D/Math.max(J.a,.01),-1,1));if(a.home){let t=9;for(let o=0;o<200;o++){const n=-1.5+o*.015,u=Le(J.c+J.a*Math.sin(n)),c=Math.abs(u[0]-140*D);c<t&&(t=c,oe=n)}}else oe=(Pe*2-1)*1.3;const Ga=Le(J.c+J.a*Math.sin(oe));let Be=Ga[0],re=Ga[1],gt=0,ce=0,Xa=0,Pt=0,ct=0,Lt=14+R()*20,St=0;const Ft=P==="south"||P==="floor"||P==="gallery"||T==="modern"&&P==="choir";Ft&&(Lt+=18);const it=new Float32Array(64);let de=null,ra=0,na=0,_e=!1,Ce=!1,qt=!1,Bt=0,ca=3+R()*8,ia=18+R()*30,sa=0,_t=0,ze=-1,la=4+R()*6,Va=0,Ka=!1,Ct=0,Xo=[];const Vo=w(180,240),Ko=[],me=[0,0,0],ja=(t,o)=>{const n=t.face<2?t.face?-r.hw:r.hw:t.s,u=t.face===4?r.top:t.y,c=t.face<2?t.s:t.face===2?r.z1:t.face===3?r.z0:t.y;let x=u/Math.max(o[1],.02);o[0]>1e-4?x=Math.min(x,(n+r.hw)/o[0]):o[0]<-1e-4&&(x=Math.min(x,(n-r.hw)/o[0])),o[2]>1e-4?x=Math.min(x,(c-r.z0)/o[2]):o[2]<-1e-4&&(x=Math.min(x,(c-r.z1)/o[2])),me[0]=n-o[0]*x,me[1]=u-o[1]*x,me[2]=c-o[2]*x};if(!a.home){const t=oe;let o=-1;for(let u=0;u<=32;u++){const c=-1.35+u*2.7/32,x=Le(J.c+J.a*Math.sin(c));if(x[1]<4*D)continue;const f=Ot(x[0],x[1]);let i=0;for(let v=0;v<Ee;v++){const d=he[v],l=ba[d.face],h=f[0]*l[0]+f[1]*l[1]+f[2]*l[2];if(h<=0)continue;ja(d,f);const p=tt(me);let s=1;if(T==="modern"&&d.depth>.6){const m=d.face<2?f[2]:f[0],A=d.face===4?f[2]:f[1];s=C(1-Math.max(d.depth*Math.abs(m)/h-d.splay,0)/(2*d.hx),0,1)*C(1-Math.max(d.depth*Math.abs(A)/h-d.splay,0)/(2*d.hy),0,1)}if(p&&p[0]>.04&&p[0]<.96&&p[1]>.04&&p[1]<.96&&(i+=s*d.area*h*(d.avg[0]+d.avg[1]+d.avg[2])/(1+p[2]*.08)*(Ft?.4+p[1]:1)),s<1&&T==="modern"&&d.depth>.6&&d.face<2){const m=tt([d.face?-r.hw:r.hw,d.y,d.s]);m&&m[0]>.02&&m[0]<.98&&m[1]>.02&&m[1]<.98&&(i+=.5*(1-s)*(Math.max(0,f[2]*Math.sign(j[2]-d.s))+(d.y<j[1]?f[1]:0))*d.area*h*(d.avg[0]+d.avg[1]+d.avg[2])/(1+m[2]*.08))}}i*=1-(Ft?.12:.35)*Math.abs(c-t)/2.7,i>o&&(o=i,oe=c)}const n=Le(J.c+J.a*Math.sin(oe));Be=n[0],re=n[1]}const Xe=new Float32Array(20),kt=new Float32Array(20),Me=new Float32Array(15),Ve=new Float32Array(5),ke=new Float32Array(15),st=new Float32Array(5),lt=new Float32Array(5),ua=new Float32Array(15),jo=(t,o)=>{const n=_o(t,o),[u,c]=go(r,j,n);if(n[1]<-.05&&u!==4&&j[1]+n[1]*c<0)return-1;const x=[j[0]+n[0]*c,j[1]+n[1]*c,j[2]+n[2]*c],[f,i]=Po(u,x);for(const l of r.pil){const h=l[0]-j[0],p=l[1]-j[2],s=n[0]*n[0]+n[2]*n[2],m=(h*n[0]+p*n[2])/s;if(m>0&&m<c&&j[1]+n[1]*m<l[3]){const A=h-n[0]*m,B=p-n[2]*m;if(A*A+B*B<l[2]*l[2]*.8)return-1}}let v=-1,d=.35+c*.008;return he.slice(0,Ee).forEach((l,h)=>{if(l.face!==u)return;const p=Mo(f-l.s,i-l.y,l.hx,l.hy,l.shape);p<d&&(d=p,v=h)}),v},X=[0,1,0],pe=[0,0,0],Ke=[0,0,0],q=new Float32Array(15),O=[0,0,0],je=[0,0,0];let Ya=2*(r.z1-r.z0)*r.H+2*2*r.hw*r.H+2*2*r.hw*(r.z1-r.z0);const Ye=[1,1,1],Yo=()=>{Za(0);const t=Qa,o=[je[0],je[1],je[2]];Za(ce),Ct=Ct?Ne(Ct,t,.04):t;const n=o[0]*.3+o[1]*.55+o[2]*.15+1e-6;for(let c=0;c<3;c++)Ye[c]=Ne(1,n/Math.max(o[c],1e-6),.72);const u=Ye[0]*.3+Ye[1]*.55+Ye[2]*.15;for(let c=0;c<3;c++)Ye[c]/=u};let Qa=1;const Qo=.11,Za=t=>{const o=Ot(Be,re);X[0]=o[0],X[1]=o[1],X[2]=o[2];const n=Math.max(re,0),u=1/Math.max(Math.sin(n)+.025,.03),c=[Math.exp(-.035*u),Math.exp(-.085*u),Math.exp(-.2*u)],x=Math.sqrt(c[0]*.3+c[1]*.55+c[2]*.15),f=xt(-.02,.06,re),i=1-.9*t;for(let s=0;s<3;s++)pe[s]=He.E[s]*c[s]/x*f*i*(1+.3*Pt);const v=(.55+1.3*Math.sin(n))*(1-.3*t)*(.3+.7*f);for(let s=0;s<3;s++)Ke[s]=Ne(He.sky[s],.6,t*.6)*v;q.fill(0),O[0]=O[1]=O[2]=0,Ve.fill(0),ke.fill(0),ua.fill(0),st.fill(1e9),lt.fill(-1e9);for(let s=0;s<Ee;s++){const m=he[s],A=ba[m.face],B=Math.max(0,X[0]*A[0]+X[1]*A[1]+X[2]*A[2]),K=1+it[s]*1.5;if(B>0&&!r.ruin[0]){const M=m.face,H=(m.avg[0]*pe[0]*.3+m.avg[1]*pe[1]*.55+m.avg[2]*pe[2]*.15)*m.area*B*K+1e-9;ja(m,X);const Y=M<2?me[2]:me[0];Ve[M]+=H,ke[M*3]+=me[0]*H,ke[M*3+1]+=me[1]*H,ke[M*3+2]+=me[2]*H,Y<st[M]&&(st[M]=Y),Y>lt[M]&&(lt[M]=Y)}for(let M=0;M<3;M++)q[m.face*3+M]+=m.avg[M]*m.area*(Ke[M]+pe[M]*B*.06)*K,O[M]+=m.avg[M]*m.area*pe[M]*B*K,ua[m.face*3+M]+=m.avg[M]*m.area*pe[M]*B*K}if(r.ruin[0]){const s=2*r.hw*(r.z1-r.z0)*.9;for(let m=0;m<3;m++)q[12+m]+=s*Ke[m]*1.4,q[m]+=14*Ke[m],q[3+m]+=14*Ke[m],O[m]+=s*pe[m]*Math.max(X[1],0)*.9}for(let s=0;s<5;s++){const m=q[s*3]*.3+q[s*3+1]*.55+q[s*3+2]*.15;for(let A=0;A<3;A++)q[s*3+A]=Ne(q[s*3+A],m,.55)}{const s=O[0]*.3+O[1]*.55+O[2]*.15;for(let m=0;m<3;m++)O[m]=Ne(O[m],s,.35)}const d=2.6*He.amb/Ya,l=1.7*Ie[2][0]/Ya*(ie==="leaves"?.4:1);for(let s=0;s<15;s++)q[s]*=d;for(let s=0;s<3;s++)O[s]*=l;let h=0;for(let s=0;s<5;s++)h+=q[s*3]*.3+q[s*3+1]*.55+q[s*3+2]*.15;h=h/2.2+(O[0]*.3+O[1]*.55+O[2]*.15)*.5;for(let s=0;s<5;s++){const m=s*4;if(Ve[s]<1e-6){Me[s*3]=Me[s*3+1]=Me[s*3+2]=0;continue}const A=C(ke[s*3]/Ve[s],-r.hw+.7,r.hw-.7),B=Math.max(ke[s*3+1]/Ve[s],.5),K=C(ke[s*3+2]/Ve[s],r.z0+.7,r.z1-.7),M=s<2?C(st[s],r.z0+.7,r.z1-.7):C(st[s],-r.hw+.7,r.hw-.7),H=s<2?C(lt[s],r.z0+.7,r.z1-.7):C(lt[s],-r.hw+.7,r.hw-.7);Xe[m]=s<2?A:M,Xe[m+1]=B,Xe[m+2]=s<2?M:K,Xe[m+3]=(H-M)*.5,kt[m]=s<2?0:H-M,kt[m+1]=0,kt[m+2]=s<2?H-M:0;for(let Y=0;Y<3;Y++)Me[s*3+Y]=ua[s*3+Y]*Ie[2][Y]*Qo;h+=(Me[s*3]*.3+Me[s*3+1]*.55+Me[s*3+2]*.15)*.3/(5*(5+Xe[m+3]))}Qa=C(.145/Math.max(h,1e-4),2.5,80)**.9*(P==="floor"?1.3:T==="modern"?1.12:1);for(let s=0;s<3;s++)je[s]=(q[s]+q[3+s]+q[6+s]+q[9+s]+q[12+s])*.25+O[s]*.2},V={uL:X,uE:pe,uSky:Ke,uAF:q,uBnc:O,uHaze:je,uZen:new Float32Array(3),uHor:new Float32Array(3),uAir:[Aa[0],Aa[1],0,0],uExp:1,uWB:Ye,uT:0,uCloud:0,uCan:Re?new Float32Array([Re[0],1.05,Re[1],0]):[0,0,0,0],uEqG:new Float32Array(4),uGlow:it,uAmbM:new Float32Array(3),uBA:Xe,uBB:kt,uBC:Me,uMixK:1,uFr:0},Ja={...Rt,uPos:4,uAlb:5,uNrm:6,uSh:7,uC:8},$a={};for(const t in V)delete Ja[t];const Dt=t=>{t.u||Je(e,t),t.own!==$a&&(ht(e,t,Ja),t.own=$a);const o=t.dk||(t.dk=Object.keys(t.u).filter(n=>n in V));for(const n of o){const u=V[n],{l:c,t:x}=t.u[n];x===e.FLOAT?e.uniform1f(c,u):x===e.FLOAT_VEC3?e.uniform3fv(c,u):x===e.FLOAT_VEC4?e.uniform4fv(c,u):x===e.FLOAT_VEC2?e.uniform2fv(c,u):e.uniform1i(c,u)}},eo=t=>{Yo();const o=q,n=N==="equinox"?Va:0;Re&&(V.uCan[3]=1.15*(.85+.15*Math.sin(t*13)*Math.sin(t*7.3)));{const f=(1-.4*ce)*(.4+.6*xt(-.05,.2,re)),i=(1-.3*ce)*(.5+.5*xt(-.05,.2,re));for(let v=0;v<3;v++)V.uZen[v]=He.zen[v]*f,V.uHor[v]=He.hor[v]*i,V.uAmbM[v]=je[v]*.5}V.uAF=o,V.uExp=Ct,V.uT=t,V.uCloud=ce,V.uEqG[3]=n;const u=V;e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(L.vao),Da(),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,Xt),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,Fa),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,Ba);const c=Math.hypot(X[0]-Ge[0],X[1]-Ge[1],X[2]-Ge[2]);Ge[0]=X[0],Ge[1]=X[1],Ge[2]=X[2];for(let f=jt?6:1;f>0;f--)e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,Vt[Et]),Et^=1,e.bindFramebuffer(e.FRAMEBUFFER,Kt[Et]),e.viewport(0,0,at,at),V.uFr=Ca=(Ca+1)%64,V.uMixK=jt?f===6?1:.4:C(.3+c*30,.3,.9),e.useProgram(L.shaft.p),Dt(L.shaft),e.drawArrays(e.TRIANGLES,0,3);jt=!1,e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,Vt[Et]),e.bindFramebuffer(e.FRAMEBUFFER,Qt),e.viewport(0,0,y,y),e.useProgram(L.comp[It].p),Dt(L.comp[It]),e.drawArrays(e.TRIANGLES,0,3);let x=0;for(let f=0;f<Se;f++){const i=f*6,v=x*8;ae[v]=F[i],ae[v+1]=F[i+1],ae[v+2]=F[i+2],ae[v+3]=ea[f*2],ae[v+4]=0,ae[v+5]=0,ae[v+6]=0,ae[v+7]=ea[f*2+1],x++}for(const f of $t){const i=.8+.2*Math.sin(t*11+f[3])*Math.sin(t*6.7+f[3]*2);ae.set([f[0],f[1]+.012*Math.sin(t*9+f[3]),f[2],.022,1,0,0,i*1.6],x*8),x++}if(ze>=0){const f=ze,i=Wa(f),v=Wa(Math.min(f+.004,.9999)),d=tt(i),l=tt(v);if(d&&l){const h=Math.atan2(-(l[1]-d[1]),l[0]-d[0]);ae.set([i[0],i[1],i[2],.34,2,t*26,h,0],x*8),x++}}e.bindVertexArray(Ua),e.bindBuffer(e.ARRAY_BUFFER,Na),e.bufferSubData(e.ARRAY_BUFFER,0,ae,0,x*8),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(L.mote.p),Dt(L.mote),e.drawArraysInstanced(e.POINTS,0,1,x),e.disable(e.BLEND),e.bindVertexArray(L.vao),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,Yt),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,y,y),e.useProgram(L.post.p),Dt(L.post),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)},Nt=4096,fa=new Float32Array(Nt+1),to=Nt/(2*Math.PI);for(let t=0;t<=Nt;t++)fa[t]=Math.sin(t/to);const da=t=>{const o=t*to,n=Math.floor(o),u=n&Nt-1,c=fa[u];return c+(fa[u+1]-c)*(o-n)},Zo=(t,o)=>{const n=Math.min(1,t*1.5);for(let u=0;u<Se;u++){const c=u*6;let x=F[c],f=F[c+1],i=F[c+2];const v=.035*da(f*1.3+o*.21+i*.7+u),d=.02*da(x*1.1+o*.17+u*.3)+.004,l=.035*da(x*.9+o*.23+f*.5+u*.7+1.5707963267948966);F[c+3]+=(v-F[c+3])*n,F[c+4]+=(d-F[c+4])*n,F[c+5]+=(l-F[c+5])*n,x+=F[c+3]*t,f+=F[c+4]*t,i+=F[c+5]*t,x<-r.hw+.2?x+=2*r.hw-.4:x>r.hw-.2&&(x-=2*r.hw-.4),f<.2?f=Jt-.1:f>Jt&&(f=.25),i<At?i+=zt-At:i>zt&&(i-=zt-At),F[c]=x,F[c+1]=f,F[c+2]=i}},ao=(t,o,n,u,c,x,f)=>{for(let i=0;i<Se;i++){const v=i*6,d=tt([F[v],F[v+1],F[v+2]]);if(!d)continue;const l=d[0]-t,h=d[1]-o,p=l*l+h*h;if(p>c*c*4)continue;const s=Math.exp(-p/(c*c))*x*Math.min(d[2],12)*.5;let m=n,A=u;if(f){const B=Math.sqrt(p)+.001;m=l/B,A=h/B}m+=-h*2.5*Math.sign(n+1e-6)*.3,A+=l*2.5*.3;for(let B=0;B<3;B++)F[v+3+B]+=(W[B]*m-le[B]*A)*s}};return eo(0),(t,o)=>{o=Math.min(o,.25),Bt+=o;const n=a.input,u=n.taps();let c=null;if(n.down&&!qt&&(de={x:n.x,y:n.y,t:Bt,moved:0},ra=n.x,na=n.y,_e=!1,Ce=!1),n.down&&de){const i=n.x-ra,v=n.y-na;de.moved+=Math.hypot(i,v),de.moved>.02&&!Ce&&(_e=!0),_e?(Be+=i*150*D,re=C(re-v*85*D,1.5*D,76*D),gt=1,Math.hypot(i,v)>1e-4&&ao(n.x,n.y,i/Math.max(o,.016),v/Math.max(o,.016),.09,.25,!1)):Bt-de.t>.32&&(Ce=!0),ra=n.x,na=n.y}if(!n.down&&qt&&de){if(!_e&&!Ce&&Bt-de.t<.35&&(c=[de.x,de.y]),_e){let i=oe,v=1e9;for(let d=0;d<96;d++){const l=-Math.PI/2+d/95*Math.PI,h=Le(J.c+J.a*Math.sin(l));let p=h[0]-Be;p=Math.atan2(Math.sin(p),Math.cos(p));const s=p*p+(h[1]-re)**2*2;s<v&&(v=s,i=l)}oe=i}de=null,_e=!1,Ce=!1}if(u.length&&!n.down&&!qt&&!c&&(c=[u[0].x,u[0].y]),qt=n.down,c){const i=jo(c[0],c[1]);if(i>=0){it[i]=1;const v=he[i];ve(v.note,.55),v.note<50&&ve(v.note+12,.3)}else ao(c[0],c[1],0,0,.07,.35,!0)}Lt-=o,Lt<=0&&!Ce&&(St=5+R()*6,Lt=22+R()*30+St),St>0?(St-=o,ct=Math.min(.75,ct+o*.5)):ct=Math.max(0,ct-o*.35);const x=Ce?1:ct,f=ce;if(ce+=(x-ce)*Math.min(1,o*(x>ce?1.4:.9)),f>.45&&ce<=.45&&x<.1&&(Pt=1,Fe.on&&(ve(62,.22),ve(69,.18),ve(74,.16))),Pt=Math.max(0,Pt-o*.5),Xa+=o,!_e){const i=(Z==="dawn"?.045:.03)*(Ft?.3:1);oe+=o*i,oe>Math.PI/2&&(oe-=Math.PI);const[v,d]=Le(J.c+J.a*Math.sin(oe));gt=Math.max(0,gt-o*.12);const l=Math.min(1,o*(gt>.01?.25:2));let h=v-Be;h=Math.atan2(Math.sin(h),Math.cos(h)),Be+=h*l,re+=(d-re)*l}for(let i=0;i<Ee;i++)it[i]=Math.max(0,it[i]-o*.55);if(Zo(o,t),N==="swallow"&&(la-=o,ze<0&&la<=0&&(ze=0,la=16+R()*14,Ia(.7)),ze>=0&&(ze+=o/6.5,R()<o*.8&&Ia(.5),ze>=1&&(ze=-1))),N==="equinox"&&yt){const i=Ot(Be,re),v=yt.y/Math.max(i[1],.01),d=r.hw-i[0]*v,l=yt.s-i[2]*v,h=Math.hypot(d-pt[0],l-pt[1]);Va=xt(.45,.1,h)*(1-ce);const p=h<.2&&ce<.5;p&&!Ka&&(ve(62,.5),ve(66,.4),ve(69,.4),ve(74,.35)),Ka=p}if(Fe.on){ca-=o,ca<=0&&(Ho(w(.4,.8)),R()<.25&&Jo(),ca=6+R()*14),ia-=o,ia<=0&&(sa=3+Math.floor(R()*3),_t=0,ia=50+R()*40),sa>0&&(_t-=o,_t<=0&&(Oo(Vo,.45),sa--,_t=2.6));const i=Math.round(Math.min(o,.2)*$);i>0&&Fe.pcm(Go(i),$,{vel:.7})}else G.length=0;eo(t)};function Jo(){Io(.6)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
