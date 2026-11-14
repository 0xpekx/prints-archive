// Northern Ferry: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/084.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Lo){Lo&&function(){"use strict";const qo=new WeakMap,B=(s,e,m)=>s<e?e:s>m?m:s,ue=Math.PI*2,He=.7,ht=2.5,k=2e3,Tt=16,dt=`#version 300 es
layout(location=0) in vec2 aP; out vec2 vS;
void main(){ vS = aP * .5 + .5; gl_Position = vec4(aP, 0., 1.); }`,At=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler2DArray;
layout(std140) uniform St { vec4 S[42]; };
layout(std140) uniform Dy { vec4 Y[64]; };
uniform sampler2D uN;
uniform int uOne;
const float TH = ${He.toFixed(3)};
`,xa=At+`
in vec2 vS; out vec4 o;
void main(){
  float az = (vS.x * 2. - 1.) * S[11].x + S[29].x, el = mix(S[11].y, S[11].z, vS.y);
  float ce = cos(el);
  vec3 d = vec3(sin(az) * ce, sin(el), cos(az) * ce);
  float e = max(el, 0.);
  vec3 col = mix(S[17].rgb, S[16].rgb, pow(smoothstep(0., .9, e), .5));
  float tg = .35 + exp(-pow((az - S[20].w) / S[41].x, 2.));
  col += S[20].rgb * exp(-e * S[41].y) * tg;
  col += S[17].rgb * .5 * exp(-e * 30.);
  float cl = 0.;
  if (S[19].w > 0.) {
    vec2 q = d.xz / (d.y + .07) * .05;
    float n = texture(uN, q * vec2(.5, .25) + .2).b * .62 + texture(uN, q * 1.9 + .4).a * .38;
    cl = smoothstep(.72 - .5 * S[19].w, .86 - .4 * S[19].w, n) * smoothstep(-.02, .04, el);
    vec3 cc = S[20].rgb * (.5 + 1.1 * exp(-e * 3.)) * mix(1., tg, S[41].z) + S[17].rgb * .55 + S[19].rgb * .004;
    col = mix(col, cc * (.55 + .6 * n), cl);
  }
  float mwk = 0.;
  if (S[40].w > 0.) {   // the Milky Way: a ragged band of unresolved stars with a dust lane down its middle
    float md = dot(d, S[40].xyz);
    float m1 = textureLod(uN, vec2(az, el) * .35 + .13, 0.).b, m2 = textureLod(uN, vec2(az, el) * 1.9 + .51, 0.).a;
    float dl = md - .05 * (m1 - .5);
    mwk = exp(-md * md / (.01 + .022 * m1)) * (1. - .8 * smoothstep(.4, .6, m2) * exp(-dl * dl * 250.)) * S[40].w * smoothstep(.02, .2, e) * (1. - cl);
    col += vec3(.008, .0088, .012) * mwk * (.35 + 1.3 * m2);
  }
  for (int k = 0; k < 2; k++) {
    if (k > uOne) break;
    float fk = float(k), cs = mix(140., 400., fk);
    vec2 g = vec2(az, el) * cs, c = floor(g);
    vec4 h = texelFetch(uN, ivec2(mod(c + fk * vec2(57., 113.), 256.)), 0);
    vec4 h2 = texelFetch(uN, ivec2(mod(c.yx * vec2(3., 5.) + vec2(31., 7.) + fk * 19., 256.)), 0);
    if (h2.r < mix(.992, .972 - .1 * mwk, fk)) continue;
    vec2 f = (fract(g) - (.2 + .6 * h.rg)) / cs;
    float rad = S[0].w * mix(.62 + .5 * pow(h2.g, 10.), .55, fk);
    float br = mix(.022 + .22 * pow(h2.g, 5.) + 4. * pow(h2.g, 28.), (.012 + .14 * h2.g * h2.g * h2.g) * (1. + mwk), fk);
    vec3 tint = mix(vec3(1., .8, .62), vec3(.72, .84, 1.), h2.b);
    col += tint * br * S[16].w * exp(-dot(f, f) / (rad * rad)) * smoothstep(0., .03, e) * (1. - cl);
  }
  if (S[18].w > 0.) {
    float ma = acos(clamp(dot(d, S[18].xyz), -1., 1.));
    col += S[19].rgb * (.003 * exp(-ma * 2.) + .025 * exp(-ma * 10.) + .12 * exp(-ma * 1.1 / S[18].w)) * (1. - .4 * cl);
    vec3 rt = normalize(cross(S[18].xyz, vec3(0., 1., 0.))), up = cross(rt, S[18].xyz);
    vec2 lp = vec2(dot(d, rt), dot(d, up) * 1.05) / S[18].w;   // a low moon, a little squashed by the air
    float disc = smoothstep(1.06, .94, length(lp));
    float mar = textureLod(uN, lp * .16 + .3, 0.).b;
    // the seas as the eye sees them: Imbrium, Serenitatis, Tranquillitatis, Crisium, Procellarum, broken by the noise
    vec2 q1 = lp - vec2(-.3, .32), q2 = lp - vec2(.18, .36), q3 = lp - vec2(.32, -.02), q4 = lp - vec2(.62, .26), q5 = lp - vec2(-.55, -.2);
    float sea = clamp(exp(-dot(q1, q1) * 9.) + exp(-dot(q2, q2) * 20.) + exp(-dot(q3, q3) * 14.) + exp(-dot(q4, q4) * 60.) + .8 * exp(-dot(q5, q5) * 7.), 0., 1.) * (.55 + .7 * mar);
    // deep gold, its seas plain, the lower limb redder and darker
    vec3 mcol = pow(S[19].rgb, vec3(1.6)) * .5 * (1.02 - .62 * smoothstep(.25, .75, sea)) * mix(vec3(1.), vec3(.9, .8, .68), smoothstep(.2, -1., lp.y));
    col = mix(col, mcol, disc * (1. - .8 * cl));
  }
  if (S[21].w > 0.) {
    float hh = S[21].x * (.25 + .7 * textureLod(uN, vec2(az * .3 + S[21].z, .73), 0.).b + .35 * (textureLod(uN, vec2(az * 1.4 + S[21].z, .21), 0.).a - .5));
    hh *= smoothstep(S[21].y + .3, S[21].y, abs(az));
    float rm = smoothstep(hh, hh - S[0].w * 1.6, el);   // one sky texel of edge, not a staircase
    float sn = smoothstep(hh * .5, hh * .85, el) * S[23].w;
    vec3 m = mix(S[23].rgb, S[23].rgb * 2.5 + S[17].rgb * .6, sn);
    col = mix(col, mix(m, S[17].rgb * 1.05, .45), rm);
    cl = max(cl, rm);
  }
  float A = 0.;
  if (S[22].w > 0.) {
    // a thin arc low in the north, a fainter one above it; the rays are slight
    float ac = az - (S[22].z - .5) * .6;
    float lo = S[22].x - .2 * ac * ac + .02 * (textureLod(uN, vec2(az * .4 + S[22].z, .55), 0.).b - .5);
    float x = el - lo, x2 = x - .07;
    float cur = (x > 0. ? exp(-x / S[22].y) * smoothstep(0., .008, x) : 0.) + (x2 > 0. ? .35 * exp(-x2 / (S[22].y * 1.6)) * smoothstep(0., .015, x2) : 0.);
    float rays = .8 + .5 * pow(textureLod(uN, vec2(az * 5. + S[22].z, .1), 1.).a * textureLod(uN, vec2(az * 17., .9), 2.5).b * 1.6, 2.);
    float apat = .35 + .65 * smoothstep(.3, .7, textureLod(uN, vec2(az * .5 + S[22].z * 3., .45), 0.).b);
    A = cur * rays * apat * S[22].w * (1. - .9 * cl) * smoothstep(1.1, .5, abs(ac));
  }
  o = vec4(col, A);
}`,ba=At+`
in vec2 vS; out vec4 o;
uniform int uL;
uniform highp sampler2D uB;
uniform sampler2D uG, uT;
float hsh(float a, float b){ return texelFetch(uN, ivec2(int(mod(a, 256.)), int(mod(b, 256.))), 0).g; }
void main(){
  vec4 P = S[1 + uL], T = S[24 + uL];
  float H = P.y, Ls = P.z, u = vS.x, s = u * Ls, y = H * vS.y * vS.y, sd = T.y;
  int ty = int(T.x + .5);
  float n1 = texture(uN, vec2(u, sd)).b, n2 = texture(uN, vec2(u * 6., sd + .31)).a;
  float n3 = texture(uN, vec2(u * 29., sd + .67)).b, n4 = texture(uN, vec2(u * 113., sd + .13)).a;
  float n2s = textureLod(uN, vec2(u * 6., sd + .31), 3.).a, n1s = textureLod(uN, vec2(u, sd), 2.).b;
  float h, n2b = texture(uN, vec2(u * 1.7, sd + .31)).a;   // broad shoulders (a 20 m term of .22 H made a comb of spikes)
  if (ty == 0) h = H * (.4 + .5 * n1 + .14 * (n2b - .5)) + 10. * (n2 - .5) + 4. * (n3 - .5) + 2.5 * (n4 - .5);
  else if (ty == 1) { float r = 1. - abs(n2s * 2. - 1.); h = H * (.25 + .45 * n1s + .4 * r * r) + 4. * (n2 - .5); }
  else if (ty == 2) { float is = n1 * 2.6 - 1.5 + .5 * n2; h = is > 0. ? H * pow(is, .6) + 4. * (n4 - .5) : -1.; }
  else if (ty == 3) h = H * (.35 + .5 * n1 + .15 * n2b) + 3. * (n2 - .5) + 2.5 * (n4 - .5);
  else h = H * (.22 + .6 * n1s * n1s + .25 * n2s) + 3. * (n2 - .5);
  h *= .76;
  // the forest's upper limit: ragged, lower under the high summits; low shores are wooded to the top
  float fl = ty == 0 ? H * (.36 + .1 * (n2b - .5) - .1 * smoothstep(.45 * H, .62 * H, h)) : H;
  if (ty != 1 && ty != 4 && h < fl + 20.) {
    // the treeline against the sky: a row of firs from a table (treeRow), uneven, some missing, a few tall
    h += texture(uT, vec2(u, (float(uL) + .5) * .25)).r * 32. * smoothstep(fl + 20., fl - 20., h);
  }
  float tex = texture(uN, vec2(u * 47., vS.y * 5.3 + sd)).b, tex2 = texture(uN, vec2(u * 19., vS.y * 2.9 + sd * 3.)).a;
  float ttop = h - y;
  float cov = smoothstep(0., max(.5, sqrt(max(y, 1.) * H) * 2. / S[0].z), ttop);
  // spurs and gullies down the fall line: the flanks that face down the water (where the moon and the last light are) are
  // lit two or three times the gullies
  vec2 gq = vec2(u * 1.3, vS.y * .45 + sd * 2.);
  float fa = texture(uN, gq).b, fg = texture(uG, gq).r - .5;
  float lf = (.26 + 1.55 * smoothstep(.1, -.22, fg)) * (.36 + 1.28 * fa);
  // snow: narrow streaks down the fall line on the highest third, lying in the gullies
  float sk = texture(uN, vec2(u * 9., vS.y * 2.2 + sd)).a;
  float snow = smoothstep(T.w * H - 30., T.w * H + 40., y + 60. * (tex - .5)) * smoothstep(.56, .7, sk + .3 * (.5 - fa));
  if (ty == 4) snow = max(snow, smoothstep(5., 25., y) * (.6 + .4 * tex));
  vec3 rock = vec3(.05, .055, .065) * (.4 + .9 * tex * tex2);
  vec3 forest = vec3(.028, .03, .034) * (.6 + .7 * tex);
  float fo = (ty == 4 || ty == 1) ? 0. : smoothstep(fl + 15., fl - 25., y + 50. * (tex2 - .5));
  vec3 alb = mix(rock, forest, fo);
  alb = mix(alb, vec3(.6, .63, .7) * (.65 + .45 * tex), snow);
  vec3 amb = S[30].rgb;
  vec3 col = alb * amb * lf * (1. + 1.2 * smoothstep(10., 0., ttop));
  float vs = abs(fract((s - S[28].x) / Ls + .5) - .5) * Ls;
  col += vec3(1., .58, .3) * S[30].w * T.z * exp(-vs / max(S[28].y, 1.)) * exp(-y / 70.) * (alb + .004) * 3.;
  vec4 res = vec4(col * cov, cov);
  if (ty == 0 || ty == 3) {
    // a second, further ridge shows over the first, lifted by the haze
    float b1 = textureLod(uN, vec2(u * 1.6 + .41, sd + .52), 0.).b, b2 = textureLod(uN, vec2(u * 11., sd + .83), 1.).a;
    float hb = (H * (.56 + .5 * b1) + 5. * (b2 - .5) + 3. * (n3 - .5)) * .76;
    float cb = smoothstep(0., max(.5, sqrt(max(y, 1.) * H) * 2. / S[0].z), hb - y);
    vec3 colb = S[17].rgb * vec3(.36, .3, .36) + amb * .004 * lf;   // the air's colour: bluer and paler than the wall in front
    colb = mix(colb, S[17].rgb * vec3(.3, .26, .3) + vec3(.6, .63, .7) * amb * .45 * lf, smoothstep(T.w * H - 40., T.w * H + 40., y + 50. * (tex - .5)) * smoothstep(.54, .68, sk + .3 * (.5 - fa)) * (ty == 0 ? 1. : 0.));
    res += vec4(colb, 1.) * (cb * (1. - cov));
  }
  if (T.z > .5 && y < 60.) {
    float cw = Ls / 256., c0 = floor(s / cw);
    for (int i = 0; i < 2; i++) {
      if (i > uOne) break;
      int r = 1 - i;
      for (int j = -1; j <= 1; j++) {
        if (j > uOne) break;
        float cc = c0 + float(j);
        int ci = int(mod(cc, 256.));
        vec4 A = texelFetch(uB, ivec2(ci * 2, uL * 2 + r), 0);
        if (A.x < .5) continue;
        vec4 B = texelFetch(uB, ivec2(ci * 2 + 1, uL * 2 + r), 0);
        int bt = int(A.x + .5);
        float lx = s - (cc * cw + A.y), ly = y - A.z, w = A.w * .5;
        float m = 0.; vec3 bc = vec3(0.);
        vec3 wash = vec3(1., .6, .3) * S[30].w * .25;
        if (bt == 1 || bt == 5 || bt == 2 || bt == 6) {
          float roof = bt == 2 ? B.y * (1. - abs(lx) / w) * .5 : B.y * (1. - abs(lx) / w);
          if (abs(lx) < w && ly > -2. && ly < B.x + roof) {
            m = 1.;
            vec3 pal = B.w < 1. ? vec3(.55, .53, .5) : B.w < 2. ? vec3(.45, .12, .08) : B.w < 3. ? vec3(.5, .4, .15) : vec3(.2, .2, .22);
            if (bt == 6) pal = vec3(.35, .07, .05);
            bc = pal * (amb * 2.5 + wash);
            if (ly > B.x) bc = (S[29].w > .5 ? vec3(.5, .52, .58) * amb * 2.5 + wash * .5 : vec3(.03, .025, .022) * amb * 3.);
            else {
              float wx = (lx + w) / 2.3, wy = (ly - .9) / 2.7;
              vec2 wf = fract(vec2(wx, wy));
              if (bt != 6 && ly > .9 && ly < B.x - .4 && abs(lx) < w - .6 && wf.x > .3 && wf.x < .72 && wf.y > .3 && wf.y < .75) {
                float hv = hsh(cc * 7. + floor(wx) + float(r) * 91., floor(wy) * 13. + float(uL) * 37.);
                bc = hv < B.z ? vec3(1., .56, .24) * (.45 + .55 * hsh(cc * 3. + floor(wx), floor(wy) + 5.)) : vec3(.006, .007, .009);
              }
              if (bt == 2 && abs(lx) < 2.2 && ly < 3.5) bc = vec3(1., .55, .2) * .35;
              if (bt == 2) bc += vec3(1., .55, .2) * .06 * exp(-ly * .3);
            }
          }
        } else if (bt == 3 || bt == 9) {
          float wall = 8., roof = 5. * (1. - abs(lx) / w);
          bool nave = bt == 3 && abs(lx) < w && ly > -2. && ly < wall + roof;
          bool tower = bt == 9 && abs(lx) < 2.2 && ly > -2. && ly < 21.;
          bool spire = bt == 9 && ly >= 21. && abs(lx) < 2.4 * (1. - (ly - 21.) / 12.) && ly < 33.;
          if (nave || tower || spire) {
            m = 1.;
            float fl = .32 * (.55 + .45 * exp(-max(ly, 0.) / 18.));
            bc = vec3(.85, .82, .76) * vec3(1., .86, .66) * fl;
            if (spire || (nave && ly > wall)) bc = vec3(.08, .09, .1) * fl * 2.;
            float wx = fract(lx / 2.6);
            if (nave && ly > 2. && ly < 6.5 && wx > .38 && wx < .62) bc = vec3(.9, .6, .25) * .5;
            if (tower && ly > 14. && ly < 17. && abs(lx) < .6) bc = vec3(.02);
          }
        } else if (bt == 4) {
          float hl = w * (1. - .35 * pow(max(ly, 0.) / 1.6, 2.));
          bool hull = ly > -1. && ly < 1.6 && abs(lx) < hl * (1. - .25 * smoothstep(0., w, lx));
          bool cab = ly >= 1.6 && ly < 4. && lx > -2. && lx < 1.2;
          bool mast = abs(lx + .5) < .16 && ly < B.x;
          if (hull || cab || mast) {
            m = 1.;
            bc = hull ? (B.w < 2. ? vec3(.06, .12, .3) : vec3(.35, .06, .04)) * (amb * 3. + wash * 2.) : vec3(.6) * (amb * 3. + wash * 2.);
            if (cab && ly > 2.4 && ly < 3.4 && lx > -1.7 && lx < .9) bc = B.z > .5 ? vec3(1., .7, .4) * .5 : vec3(.01);
            if (mast) bc = vec3(.1) * (amb * 3. + wash);
          }
        } else if (bt == 7) {
          float tw = 1.7 - ly * .035;
          bool tower = abs(lx) < tw && ly > -2. && ly < 16.;
          bool lan = abs(lx) < 1.2 && ly >= 16. && ly < 18.6;
          bool cap = ly >= 18.6 && abs(lx) < 1.4 * (1. - (ly - 18.6) / 1.6);
          if (tower || lan || cap) {
            m = 1.;
            bc = tower ? vec3(.75, .74, .7) * (amb * 3. + vec3(.05, .05, .045)) : lan ? vec3(1., .9, .7) * .8 : vec3(.03);
            if (tower && fract(ly / 7.) > .6) bc *= .3;
          }
        }
        if (m > 0.) res = vec4(bc, 1.);
      }
    }
  }
  o = res;
}`,ya=At+`
in vec2 vS; out vec4 o;
uniform int uSteps;
float at2(float y, float x){ float a = atan(y / max(abs(x), 1e-6)); return x < 0. ? (y < 0. ? -3.14159265 : 3.14159265) - a : a; }
float sdTor(vec3 p, float R, float r){ vec2 q = vec2(length(p.xy) - R, p.z); return length(q) - r; }
vec3 buoyQ(vec3 p){ vec3 q = p - S[39].xyz; float c = cos(.2), s = sin(.2); return vec3(q.x, c * q.y - s * q.z, s * q.y + c * q.z); }
float rE = 0.;
vec3 ropeQ(vec3 p, int i){
  float fi = float(i), a = .17 * sin(fi * 2.1 + .4);
  vec3 q = p - vec3(S[38].z + .012 * fi + .011 * sin(fi * 3.7), -S[37].z - .2 + .004 * fi + .012 * cos(fi * 2.9), S[37].y - .04 - .0125 * fi - .004 * sin(fi * 1.9));
  float c = cos(a), s = sin(a);
  q = vec3(c * q.x - s * q.y, s * q.x + c * q.y, q.z);
  rE = clamp(q.y, -.05 - .05 * fract(fi * .618 + .3), 0.);   // each turn hangs to its own length
  q.y -= rE;
  return q;
}
vec2 map(vec3 p){
  float zr = S[37].y, hr = S[37].z, rr = S[32].w;
  vec2 pr = vec2(p.y + hr, p.z - zr);
  float d = S[36].w > .5 ? length(max(abs(pr) - vec2(rr * .7, rr), 0.)) - rr * .35 : length(pr) - rr;
  float m = 0.;
  d = min(d, length(vec2(p.y + hr + .48, p.z - zr)) - rr * .75);
  float sx = min(abs(p.x - S[38].x), abs(p.x - S[38].y));
  d = min(d, max(length(vec2(sx, p.z - zr)) - rr * .85, p.y + hr));
  float cx = floor(p.x / .05);
  vec4 hh = texelFetch(uN, ivec2(int(mod(cx, 256.)), 77), 0);
  if (hh.r > .68) {
    vec3 q = p - vec3((cx + .3 + .4 * hh.g) * .05, -hr - rr - .003 - .004 * hh.b, zr + .004);
    float dd = length(q * vec3(1., .75, 1.)) - .004 - .003 * hh.b;
    if (dd < d) { d = dd; m = 3.; }
  }
  if (S[33].w > 0.) { float b = sdTor(buoyQ(p), .29, .06); if (b < d) { d = b; m = 1.; } }
  if (S[34].w > 0.) {
    for (int i = 0; i < 7; i++) {
      if (i > uOne * 6) break;
      float b = sdTor(ropeQ(p, i), .2 + .016 * sin(float(i) * 1.7) + .007 * sin(float(i) * 4.3), .0105);
      if (b < d) { d = b; m = 2. + float(i) * .01; }
    }
    // the lashing: three turns of tarred line round the coil and the rail
    vec3 q = p - vec3(S[38].z + .036, -hr + .006, zr - .042);
    float ax = abs(q.x); ax -= .013 * step(.0065, ax);
    float b = sdTor(vec3(q.z, q.y, ax), .079, .0055);
    if (b < d) { d = b; m = 2.5; }
  }
  return vec2(d, m);
}
void main(){
  vec2 n = vS * 2. - 1.;
  float P0 = S[37].x;
  float Y0 = S[38].w, cy0 = cos(Y0), sy0 = sin(Y0);
  vec3 F = vec3(sy0 * cos(P0), sin(P0), cy0 * cos(P0)), U = vec3(-sy0 * sin(P0), cos(P0), -cy0 * sin(P0)), Rr = vec3(cy0, 0., -sy0);
  vec3 rd = normalize(F + (Rr * n.x + U * n.y) * TH);
  float t = .35, dmin = 1e9, tm = .35, pa = S[0].x * 1.4;
  bool hit = false;
  int ph = 0;   // one loop, so the scene is compiled once: 0 marches, 1 to 4 tap the normal, 5 reads the material
  vec3 p = vec3(0.), nn = vec3(0.); vec2 mm = vec2(0.);
  for (int i = 0; i < 126; i++) {
    if (i >= uSteps) break;
    vec3 e = ph < 2 ? vec3(1., -1., -1.) : ph == 2 ? vec3(-1., -1., 1.) : ph == 3 ? vec3(-1., 1., -1.) : ph == 4 ? vec3(1.) : vec3(0.);
    vec2 m = map(ph == 0 ? rd * t : p + e * .0006);
    if (ph == 0) {
      float q = m.x / (pa * t);
      if (q < dmin) { dmin = q; tm = t; }
      if (m.x < .0001 * t) hit = true; else t += max(m.x * .9, .0004);
      if (hit || t > S[37].w || i > 108) { if (!hit && dmin > 1.) break; p = rd * tm; ph = 1; }
    } else if (ph == 5) { mm = m; break; }
    else { nn += e * m.x; ph++; }
  }
  // the deck you stand on, a metre under the rail, ending just outboard of it: seen only from above
  vec4 dk = vec4(0.);
  float tD = rd.y < -.02 ? (-S[37].z - 1.) / rd.y : 1e9, zD = tD * rd.z;
  if (zD < S[37].y + .14) {
    vec3 pd = rd * tD;
    float lbd = log2(S[0].x * tD * 256.);
    float g = textureLod(uN, pd.xz * vec2(1.7, 1.3), lbd + .8).b, g2 = textureLod(uN, pd.xz * 9., lbd + 3.2).a;
    vec3 ad = S[36].w > .5 ? vec3(.2, .13, .075) * (.45 + .7 * g) * (.3 + .7 * smoothstep(0., .05, abs(fract(pd.x / .13) - .5) - .03)) : vec3(.05, .085, .08) * (.5 + .8 * g) * (.75 + .5 * g2);
    if (S[29].w > .5) ad = mix(ad, vec3(.62, .68, .8) * (.6 + .55 * g), .97);
    ad = mix(ad, S[32].rgb * .45 * (.6 + .5 * g2), smoothstep(.1, .07, S[37].y + .14 - zD));   // the painted kerb along the edge
    vec3 Ld = S[35].xyz - pd; float l2d = dot(Ld, Ld);
    dk = vec4(ad * (S[36].rgb * (S[35].w / l2d * max(Ld.y, 0.) * inversesqrt(l2d)) + S[14].rgb * 1.5), 1.) * clamp((S[37].y + .14 - zD) / (pa * tD * 1.5) + .5, 0., 1.);
  }
  if ((!hit && dmin > 1.) || (dk.a > 0. && tD < tm)) { o = dk; return; }
  float cov = hit ? 1. : clamp(1. - dmin, 0., 1.);
  nn = normalize(nn);
  vec3 L = S[35].xyz - p; float l2 = dot(L, L); L *= inversesqrt(l2);
  float E = S[35].w / l2;
  vec3 V = -rd, Hh = normalize(L + V), lc = S[36].rgb;
  float dif = max(dot(nn, L), 0.), nh = max(dot(nn, Hh), 0.), fr = .04 + .96 * pow(1. - max(dot(nn, V), 0.), 5.);
  vec3 alb = S[32].rgb, emi = vec3(0.);
  float sp = .5, gl = 160.;
  float lb = log2(S[0].x * tm * 256.);   // texels of the noise per pixel at one period a metre: every lookup below names its own level
  if (mm.y < .5) {
    if (S[36].w > .5) { float g = textureLod(uN, vec2(p.x * 1.3, p.y * 40. + p.z * 30.), lb + 5.3).b; alb *= .7 + .5 * g; sp = .35; gl = 60.; }
    else {
      // painted steel: grime, small chips down to rust, rust weeping from the joints, beads of water under the lamp
      float g = textureLod(uN, p.xz * vec2(3., 9.), lb + 3.2).a, g2 = textureLod(uN, vec2(p.x * 11. + p.y * 7., p.z * 9. - p.y * 5.), lb + 3.7).b;
      vec2 cu = vec2(p.x * .67 + p.y * .43, p.z * .71 - p.y * .29 + .2);
      float ch = textureLod(uN, cu, 0.).b - textureLod(uN, cu, 3.).b + .09 * (textureLod(uN, cu * .37 + .6, 1.).a - .5);
      float hr = S[37].z, jx = min(abs(p.x - S[38].x), abs(p.x - S[38].y)), jy = min(abs(p.y + hr), abs(p.y + hr + .48));
      float run = textureLod(uN, vec2(p.x * 37. + p.z * 31., p.y * .7), lb + 5.6).a;
      float weep = exp(-jx * 26.) * smoothstep(.22, 0., jy) * step(p.y + hr, 0.) * smoothstep(.5, .8, run) * .7 + smoothstep(-.4, -.95, nn.y) * smoothstep(.52, .74, run * .6 + g * .4) * .45;
      float chip = smoothstep(.04, .05, ch + .01 * (g2 - .5) + .04 * exp(-jx * 12. - jy * 9.) + .01 * smoothstep(.2, -.6, nn.y));
      float rst = clamp(chip + weep * .85, 0., 1.);
      alb *= (.6 + .3 * g) * (.75 + .35 * smoothstep(-.2, .6, nn.y)) * (.85 + .3 * g2);
      alb = mix(alb, vec3(.15, .062, .03) * (.4 + 1. * g2), rst);
      vec3 bd = textureLod(uN, vec2(p.x * 1.5 + p.y * 1.1, p.z * 1.9 - p.y * .8), lb + .9).rgr - .5;
      nn = normalize(nn + bd * (.14 + .3 * rst));
      dif = max(dot(nn, L), 0.); nh = max(dot(nn, Hh), 0.);
      sp = (1. - .4 * g) * (1. - .85 * rst); gl = 220.;
    }
  } else if (mm.y < 1.5) {
    vec3 q = buoyQ(p);
    float a = at2(q.y, q.x);
    float band = smoothstep(.13, .1, abs(mod(a + .785, 1.5708) - .785));
    alb = mix(S[33].rgb, S[31].rgb, band);
    emi = S[31].w * band * lc * E * 2.5 * max(dot(nn, V), 0.);
    // sun-faded, scuffed and grimy, dirtier where the water sits
    float g = textureLod(uN, vec2(a * 2., q.z * 8.), lb + 3.).b, fd = textureLod(uN, q.xy * 1.3 + .3, lb + .4).b, sc = textureLod(uN, vec2(a * .9 + q.z * 3., length(q.xy) * 6.), lb + 2.6).a;
    alb = mix(alb, vec3(dot(alb, vec3(.34))) * 1.1 + .03, .5 * smoothstep(.38, .68, fd));
    alb *= (.6 + .5 * g) * mix(.5, 1., smoothstep(-.3, .12, q.y + .1 * (fd - .5)));
    float scf = smoothstep(.71, .78, sc + .1 * (g - .5));
    alb = mix(alb, vec3(.09, .08, .07), .55 * scf);
    emi *= 1. - .8 * scf;
    sp = .35 * (1. - .7 * scf); gl = 40.;
  } else if (mm.y < 2.45) {
    // three-strand rope: broad strands with thin dark grooves between them, fibres, grime
    int i = int((mm.y - 2.) * 100. + .5);
    vec3 q = ropeQ(p, i);
    float a = at2(q.y, q.x) + (q.x > 0. ? rE : -rE) * 5., b = q.z * 150.;
    float lay = a * 75. + b * 1.5 + float(i) * 1.3, sl = sin(lay), tw = pow(abs(sl), .45);
    float fib = textureLod(uN, vec2(a * 2.3 + float(i) * .17, b * .4 + float(i) * .31), lb + 5.2).a;
    alb = S[34].rgb * (.3 + .8 * tw) * (.82 + .3 * sin(float(i) * 5.3)) * (.5 + .7 * fib);
    nn = normalize(nn + vec3(-sin(a), cos(a), 0.) * .45 * cos(lay) * (sl < 0. ? -1. : 1.) * (1. - tw * .5));
    dif = max(dot(nn, L), 0.); nh = max(dot(nn, Hh), 0.);
    sp = .05; gl = 14.;
  } else if (mm.y < 2.6) {
    alb = vec3(.05, .043, .036); sp = .12; gl = 30.;
  } else { alb = vec3(.02); sp = 3.; gl = 500.; emi = (S[13].rgb * 1.5 + S[10].rgb * .25) * min(S[9].w / 150., 1.) * .5; }
  if (S[29].w > .5 && mm.y < 2.9) {   // winter: snow lies on whatever faces up
    float sc = smoothstep(.2, .5, nn.y + .5 * (textureLod(uN, p.xz * 2.3 + p.y, lb + 2.).b - .5));
    alb = mix(alb, vec3(.86, .9, .97), sc); sp *= 1. - .9 * sc; emi *= 1. - sc;
  }
  vec3 r = reflect(rd, nn);
  vec3 env = mix((S[13].rgb * 1.5 + S[10].rgb * .3) * min(S[9].w / 150., 1.) * .4, S[16].rgb * 2. + S[20].rgb * .5, smoothstep(-.25, .35, r.y));
  vec3 col = alb * (lc * E * (dif * .92 + .04) + S[14].rgb * 1.5) + emi;
  col += lc * E * sp * pow(nh, gl) * (gl + 8.) / 30. * (.25 + fr);
  col += env * fr * (sp > .2 ? 1. : .2);
  o = vec4(col * cov, cov) + dk * (1. - cov);
}`,Ot=At+`
in vec2 vS; out vec4 o;
uniform sampler2D uSky, uG, uFg, uH;
uniform sampler2DArray uStr;
vec3 kel(float x, float y, float fw){
  vec3 res = vec3(0.);
  if (x < 1.) return res;
  float K0 = S[7].x, X = K0 * x, r = abs(y) / x, q = 1. - 8. * r * r;
  float eps = 1.4 * pow(X, -.6667), qs = sqrt(max(q, 0.));
  float A = S[7].y * inversesqrt(max(X, 2.)) * pow(q * q + eps * eps, -.125);
  if (q < 0.) A *= exp(-1.8 * (-q) / max(eps, .22));
  float sy = y < 0. ? -1. : 1.;
  for (int b = 0; b < 2; b++) {
    if (b > uOne) break;
    float sg = float(b * 2 - 1);
    float t = min((1. + sg * qs) / (4. * max(r, 1e-3)), 30.);
    float t2 = t * t, k = K0 * (1. + t2);
    float ph = X * pow(1. + t2, 1.5) / (1. + 2. * t2) - sg * .7854;
    float a = A * exp(-k * S[7].w) * exp(-k * k * fw * fw * .06);
    vec2 g = k * inversesqrt(1. + t2) * vec2(1., -sy * t);
    res.xy -= a * sin(ph) * g;
    res.z += a * cos(ph);
  }
  return res;
}
vec3 skyAt(vec3 r, float lod){
  float az = atan(r.x / max(r.z, 1e-4)), el = asin(clamp(r.y, -1., 1.));   // every ray here looks aft
  vec4 k = textureLod(uSky, vec2((az - S[29].x) / S[11].x * .5 + .5, (el - S[11].y) / (S[11].z - S[11].y)), lod);
  vec3 c = k.rgb;
#ifndef FIRE
  if (S[12].w > 0.) {   // the aurora (never with the sea fire)
    float ta = Y[8].x;
    float f1 = textureLod(uN, vec2(az * .8 + ta * .011, ta * .003), 0.).b, f2 = textureLod(uN, vec2(az * 3.3 - ta * .019, .37 + ta * .002), 0.).a;
    float ac = az - (S[22].z - .5) * .6, hh = smoothstep(.03, .15, el - S[22].x + .2 * ac * ac);
    c += mix(S[12].rgb, vec3(.55, .06, .22), hh * .6) * k.a * (.05 + 2.6 * f1 * f2 * f2) * .45;
  }
#endif
  return c;
}
vec4 strip(int li, vec3 ro, vec3 r, float lodb, float lim){
  vec4 P = S[1 + li];
  if (P.w < .5) return vec4(0.);
  float t = (P.x - ro.x) / r.x;
  if (t <= 0. || t > lim) return vec4(0.);
  vec3 p = ro + r * t;
  float yl = p.y, ek = 1.;
  if (P.w > 1.5) {
    // mountain walls: summits and saddles along the shore (world z, periodic over 44 km so they never jump), spurs whose
    // noses fall steeply towards the far end, and a last headland into the water; the village band keeps its height
    float sw = p.z - Y[9].y, q = S[21].z * 6.283 + float(li) * 2.4, f = fract(sw * 5.9091e-4 + q * .159);
    float en = (.925 + .22 * sin(sw * 1.99922e-3 + q) + .155 * sin(sw * 8.56798e-4 + q * 1.7)) * (.5 + .5 * min(smoothstep(0., .5, f), 1. - smoothstep(.5, 1., f)));
    float ze = (li & 1) == 0 ? 3800. + 1400. * fract(q * 2.13) : 7000. + 4000. * fract(q * 1.37);
    float hd = clamp((ze / max(p.z, 1.) - 1.) * .85, .02, 1.), y0 = (li & 1) == 0 ? 90. * smoothstep(2500., 1800., p.z) : 0.;
    yl = (p.y < y0 ? p.y : y0 + (p.y - y0) / en) / hd;
    ek = en * hd;
  }
  if (p.y < 0. || yl > P.y) return vec4(0.);
  float fs = S[0].x * t / max(abs(r.x), .03) * S[0].y / P.z;
  float fv = S[0].x * t * S[0].z / (2. * sqrt(max(yl, .5) * P.y) * ek);
  float lod = log2(max(max(fs, fv), 1.)) + lodb;
  vec4 L = textureLod(uStr, vec3((p.z - Y[8].z) / P.z, sqrt(yl / P.y), float(li)), lod);
  float la = mix(L.a, smoothstep(.3, .7, L.a), clamp(lod - 1.5, 0., 1.));   // far along a wall the outline stays solid
  L = vec4(L.rgb * (la / max(L.a, 1e-3)), la);
  float fo = 1. - exp(-t * (S[5].w + Y[3].x));
  L.rgb = mix(L.rgb, S[5].rgb * L.a, fo);
  return L;
}
void main(){
  vec2 n2 = vS * 2. - 1.;
  vec3 d = normalize(Y[2].xyz + (Y[0].xyz * n2.x + Y[1].xyz * n2.y) * TH);
  vec3 eye = vec3(0., Y[0].w, 0.);
  float tw = eye.y / -min(d.y, -.002);
  vec3 p = eye + d * tw;
  vec2 wf = vec2(p.x, p.z - Y[2].w);
  float tt = Y[1].w;
  vec4 g1 = texture(uG, wf * .28125 + tt * vec2(.013, .021));
  vec4 g2 = texture(uG, wf * vec2(1.09375, .875) - tt * vec2(.027, .011));
  float nA = texture(uN, wf * vec2(.015625, .0078125)).b;
  float nB = texture(uN, wf * vec2(.0625, .03125) + nA * vec2(.31, .47)).a, nC = texture(uN, wf * vec2(.203125, .09375) - nB * .23).b;
  float nD = texture(uN, wf * vec2(.703125, .3125) + nC * .17).a;
  float age = p.z - S[10].w;
  vec4 Hs = texture(uH, vec2((Y[3].w - clamp(age, 2.6, 630.) / ${ht.toFixed(2)} + .5) / 256., .5));
  bool water = d.y < -.0008;
  vec3 R = d, Ro = eye, wcol = vec3(0.);
  float lodR = 0., F = 1.;
  if (water) {
    float cosd = -d.y, fw = S[0].x * tw / max(cosd, .012), fl = S[0].x * tw;
    vec2 gr = vec2(0.);
    float sv = 0.;
    for (int i = 0; i < 4; i++) {
      if (i > uOne * 3) break;
      vec4 W = Y[4 + i];
      float k2 = dot(W.xy, W.xy), fade = exp(-k2 * fw * fw * .05);
      gr -= W.z * fade * sin(dot(W.xy, p.xz) + W.w) * W.xy;
      sv += .5 * W.z * W.z * k2 * (1. - fade);
    }
    float sea = Y[3].z;
    float px = p.x - S[29].y;
    vec3 kv = kel(p.z - S[7].z, px, fw);
    vec2 kg = vec2(kv.y, kv.x) / (1. + 1.2 * sea);
    gr += kg;
    float ag = max(age, 0.), off = (Hs.r - .5) * 16. * smoothstep(0., 40., ag), str = Hs.g, brk = Hs.b;
    float w = S[8].x + S[8].y * pow(ag, .6), tw2 = S[8].w * exp(-ag / 140.);
    float cy = abs(px - off) - tw2;
    float pr = exp(-cy * cy / (w * w)) * smoothstep(-.5, 2., age);
    float churn = pr * str * exp(-ag / 28.);
    float slick = pr * smoothstep(12., 80., ag) * exp(-ag / 3000.);
    float rip = S[6].w * (1. + Y[9].x) * (1. - .8 * slick);
    gr += ((g1.xy - .5) * 1.4 + (g2.zw - .5)) * rip + (vec2(nB, nC) - .5) * churn * 1.8;
    vec3 n = normalize(vec3(-gr.x, 1., -gr.y));
    float cv = max(dot(n, -d), .02);
    F = .02 + .98 * pow(1. - cv, 5.);
    vec3 ng = normalize(vec3(-(gr.x - kg.x * .8), 1., -(gr.y - kg.y * .8)));   // glints mostly ignore the wake's fixed crests
    R = reflect(d, n); R.y = abs(R.y) + .002; R = normalize(R);
    Ro = p;
    float s2 = .0004 + rip * rip * .6 * (1. - exp(-fl / .8)) + sv;
    lodR = log2(max(1., sqrt(s2) * S[13].w * 1.8));
    vec3 lv = S[9].xyz - p; float l2 = dot(lv, lv); vec3 l = lv * inversesqrt(l2);
    float spot = .08 + .92 * smoothstep(.62, .93, dot(normalize(-l.yz), vec2(-.75, .66))) * smoothstep(.95, .6, abs(l.x) * inversesqrt(dot(l.xz, l.xz)));
    vec3 E = S[10].rgb * (S[9].w * Y[8].w * spot / l2);
    vec3 amb = S[14].rgb;
    // the wash: air under the surface makes the water milky and sea-green in the lamp; foam rides on it as lace that
    // draws out into lines along the lane, thinning and dimming with age
    float e1 = exp(-ag / 10.), e2 = exp(-ag / 50.), e3 = exp(-ag / S[8].z);
    float dens = pr * str * (.95 * e1 + .5 * e2 + .14 * e3) * (1. - .4 * brk);
    float sN = texture(uN, vec2((px - off) / w * .7 + nB * .35, wf.y * .011 + .37)).a;
    float la1 = 1. - abs(nB * 2. - 1.), la2 = 1. - abs(nC * 2. - 1.), la3 = 1. - abs(nD * 2. - 1.), la4 = 1. - abs(sN * 2. - 1.);
#ifdef FIRE
    la2 = 1.14 - sqrt((nC * 2. - 1.) * (nC * 2. - 1.) + .02); la3 = 1.14 - sqrt((nD * 2. - 1.) * (nD * 2. - 1.) + .02);   // no hairline crests: the fire would trace them
#endif
    float boil = smoothstep(.3, .75, nA);
    float k3 = smoothstep(2., .35, fw), k2 = smoothstep(9., 1.8, fw);
    float web = max(la2 * la2 * k2 * (.5 + nD), .9 * la3 * la3 * la3 * k3 * (.45 + 1.1 * nC));
    float lines = la4 * la4 * la4 * (.6 + .4 * mix(1., la3, k3)) * (.55 + .9 * nC);
    float lace = mix(max(web, lines * .8), max(web * .75, lines), smoothstep(5., 36., ag)) * (.72 + .28 * la1) + .4 * (nB - .5) + .34 * (boil - .5);
    float thr = max(1. - .58 * dens * (1.55 - .55 * dens), S[29].z) + .16 * (1. - k3), soft = .07 + .5 * smoothstep(0., 3., fw);
#ifdef FIRE
    // sea fire: dinoflagellates flash where the water is sheared, so the light lives in the fresh churn and the foam,
    // dies well before the foam does, and close by shows as pin-points that wink out as they are carried aft
    float fa = min(pr * str * (1.25 * e1 + .4 * e2) * (1. - .3 * brk), 1.3);
    soft += .2 + .3 * min(fa, 1.);                                                          // no hard contour on a glowing raft
#endif
    float thick = clamp((lace - thr) / .34, 0., 1.);
    float foam = smoothstep(thr - soft * .4, thr + soft, lace) * (.42 + .58 * thick) * min(1., dens * 3.);
    foam = max(foam, min(dens * .3, .5) * (1. - k2));                                 // too far to see the lace: a veil
    foam = clamp(foam, 0., 1.);
    float nl = max(dot(n, l), 0.);
    vec3 body = S[6].rgb * amb + (S[13].rgb * .17 + .002) * E * (.4 + .6 * nl);
    float aer = pr * str * (1.3 * e1 + .4 * e2 + .1 * e3) * (.22 + 1.15 * smoothstep(.3, .7, nB * .55 + nC * .45));
    vec3 glow = (S[13].rgb * .7 + .008) * E * min(aer, 1.3) * (.8 + .45 * nD);
    // sea fire: the churned water glows of itself, brightest where it was just stirred, with sparks that stream aft
    float grain = (.56 + .56 * (.45 * la2 + .55 * la3)) * (.8 + .3 * nA);
    vec3 fc = mix(vec3(.46, .6, .58), vec3(.74, .76, .74), thick) * grain * (E * (.35 + .65 * nl) + amb * 1.6) + glow * (1. - thick) * .8;
#ifdef FIRE
    // the sheet: strongest on the lace's fringe and over the boils, weak on the smooth water between; lower under a
    // town-lit cloud. Colour from one ramp (palette.mjs, hue 212 turning to 196): dark green-blue, teal, near-white.
    float fring = exp(-(lace - thr) * (lace - thr) / ((soft + .15) * (soft + .15)));
    vec3 fire = vec3(.003, .07, .1) * S[41].w * (1. - .4 * S[41].z) * fa * (.08 + .4 * fring + .4 * boil) * (.75 + .5 * nD);
    {
      // the sparks: one point at a place of its own in each cell of a lattice bent by the eddies; each flashes and dies
      // and the next comes up somewhere else. Widened to the pixel's footprint with its strength spread by the area,
      // so far off they melt into the sheet.
      vec2 sc = wf * vec2(4., 2.5) + (vec2(nB, nC) - .5) * 1.5, ci = floor(sc);
      vec2 h1 = texelFetch(uN, ivec2(mod(ci, 256.)), 0).rg;
      float ph = tt * (.4 + .8 * h1.y) + h1.x;
      vec2 h2 = texelFetch(uN, ivec2(mod(ci + floor(ph) * vec2(37., 59.) + vec2(101., 53.), 256.)), 0).rg;
      float hx = fract(h2.x * 31.7 + h2.y * 17.3);
      vec2 c0 = .2 + .6 * h2, m = min(c0, 1. - c0) * vec2(.25, .4), q = (fract(sc) - c0) * vec2(.25, .4);
      float r0 = min(.02 + .015 * fract(hx * 7.13), .5 * min(m.x, m.y));
      vec2 rr = max(vec2(r0), .7 * vec2(fl, fw));
      float spark = exp(-dot(q * q, 1. / (rr * rr))) * r0 * r0 / (rr.x * rr.y) * step(.35, hx) * pow(1. - fract(ph), 5.)
        * smoothstep(m.x, .7 * m.x, abs(q.x)) * smoothstep(m.y, .7 * m.y, abs(q.y)) * smoothstep(.7, .35, max(rr.x / m.x, rr.y / m.y)) * smoothstep(.04, .016, fw);
      fire += vec3(.35, .62, .64) * S[41].w * spark * pr * str * (e1 + .2 * e2) * 3.;
    }
    fc += fire * (1. + .8 * thick) * grain;
    glow += fire;
#endif
    vec3 sp = vec3(0.);
    int nli = int(Y[8].y);
    if (foam > .97) nli = 0;
    for (int i = 0; i < ${Tt}; i++) {
      if (i >= nli) break;
      vec4 A = Y[10 + 2 * i], B = Y[11 + 2 * i];
#ifdef FIRE
      vec3 lq = A.xyz - p;   // sea-fire nights have no moon: every glint source is a point
#else
      vec3 lq = A.w < 0. ? A.xyz : A.xyz - p;
#endif
      float qq = dot(lq, lq);
      vec3 h = normalize(lq * inversesqrt(qq) - d);
#ifdef FIRE
      float Ei = A.w / qq, nm = 0.;
#else
      float Ei = A.w < 0. ? -A.w : A.w / qq;
      float nm = A.w < 0. ? 1. - smoothstep(.15, .9, fl) : 0.;   // close by, the moon's patch is broken glitter, not a smooth oval
#endif
      float nh = max(dot(ng, h), .05), nh2 = nh * nh, ss = s2 + B.w + .007 * nm;
      sp += B.rgb * (Ei * exp(-(1. - nh2) / (nh2 * 2. * ss)) / (ss * nh2 * nh2)) * (1. - nm * .55 + nm * 1.4 * smoothstep(.5, .75, nD));
    }
    float spk = texelFetch(uN, ivec2(mod(floor(wf * vec2(2.3, .8)) + floor(tt * 7.) * vec2(17., 29.), 256.)), 0).r;
    sp *= mix(1., .15 + 2.2 * smoothstep(.55, .97, spk), smoothstep(.15, .9, fl));
    wcol = body * (1. - F) + glow + sp * F * S[15].w * .7 / max(cv, .1);
    wcol = mix(wcol, fc, foam);
    F *= 1. - foam;
    if (S[17].w > 0.) { // drift ice: floes from a jittered cell pattern fixed in the water, a lane broken through them behind the ship
      vec2 ic = wf * vec2(.11, .09375), ci = floor(ic); float f1 = 9., f2 = 9.; vec2 fr = vec2(0.);
      for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
        vec2 cc = ci + vec2(float(i), float(j)), rr = texelFetch(uN, ivec2(mod(cc, 256.)), 0).rg;
        vec2 q = cc + .1 + .8 * rr - ic; float dd = dot(q, q);
        if (dd < f1) { f2 = f1; f1 = dd; fr = rr; } else if (dd < f2) f2 = dd;
      }
      float eg = min(sqrt(f2) - sqrt(f1), .56 + .3 * fr.y - sqrt(f1) * 1.25) * 10.5 + (nD - .5) * 1.8 + (nC - .5) * 2.2 + (nB - .5) * 2.4, aw = fw * 1.6 + .06; // metres in from the floe's ragged edge
      float lane = smoothstep(.0, 1.1, abs(px - off) - w * 1.3 - 2. + (nC - .5) * 9. + (nB - .5) * 7.) + smoothstep(25., 900., age) * .35;
      float brash = smoothstep(.55, .75, nC * .7 + nB * .3) * (.35 + .65 * smoothstep(0., 120., age));
      float gp = .3 + 1.4 * fr.x * fr.x;                                   // each floe's own gap to its neighbours
      float im = max(smoothstep(gp, gp + aw, eg) * min(lane, 1.) * step(.3, fr.y), brash * (1. - min(lane, 1.)) * .9);
      im *= smoothstep(-2., 4., age) * S[17].w;
      vec3 iceA = mix(vec3(.42, .5, .56), vec3(.8, .85, .9), smoothstep(.35, .65, nC * .6 + nD * .4 + fr.x * .3)) * (.8 + .3 * fr.y); // snow, and bare wet ice
      vec3 iceL = amb * 1.5 + S[16].rgb * .9 + E * (.2 + .4 * clamp(l.y, 0., 1.)) + glow * .3;
      vec3 icol = iceA * iceL * (1. - .45 * smoothstep(gp + 1. + aw, gp, eg) * min(lane, 1.));
      wcol = mix(wcol, icol, im); F *= 1. - im;
    }
  }
  vec3 c = skyAt(R, lodR);
#ifdef MOON
  if (water) {
    // the moon's image in the waves keeps the old moon's energy (the disc in the sky is now its true small, dim self), so
    // the path stays a broken path of bright facets; blurred by the same footprint the sky map's level gave it
    float b = exp2(lodR) * 1.2 / S[13].w, rr = .016 + b, a = sqrt(max(2. - 2. * dot(R, S[18].xyz), 0.));
    c += S[19].rgb * (32. * .000256 / (rr * rr)) * smoothstep(rr, rr - 2. * b - .002, a);
  }
#endif
  float fd = S[5].w + Y[3].x;
  c = mix(c, S[5].rgb, clamp(fd * 1500., 0., 1.) * (1. - .75 * smoothstep(0., .5, R.y)));
  int np = water ? 4 : 2;
  for (int k = 0; k < 4; k++) {
    if (k >= np) break;
    if (k == 2) { c = c * F + wcol; c = mix(c, S[5].rgb, 1. - exp(-tw * fd)); }
    bool dir = k >= 2 || !water;
    vec3 ro = dir ? eye : Ro, rr = dir ? d : R;
    int li = (rr.x < 0. ? 0 : 2) + 1 - (k & 1);
    vec4 L = strip(li, ro, rr, dir ? 0. : lodR, dir && water ? tw : 1e9);
    c = L.rgb + c * (1. - L.a);
  }
  c += S[15].rgb * Y[9].w * (.3 + 1.5 * exp(-2.4 * length((n2 - vec2(0., -1.15)) * vec2(.7, 1.))));   // snow and fog glow where the floods reach
  vec4 fg = texture(uFg, vS);
  c = fg.rgb + c * (1. - fg.a);
  c *= 1. - .2 * dot(n2, n2);
  c *= S[11].w;
  c = c * (2.51 * c + .03) / (c * (2.43 * c + .59) + .14);
  c = pow(clamp(c, 0., 1.), vec3(.4545));
  float gn = texelFetch(uN, ivec2(mod(gl_FragCoord.xy + Y[9].zz * vec2(1., 1.7), 256.)), 0).r - .5;
  c += gn * (.026 - .016 * c.g);
  o = vec4(c, 1.);
}`,wa=`#version 300 es
layout(location=0) in vec4 a0; layout(location=1) in vec4 a1; layout(location=2) in vec4 a2; layout(location=4) in float aV;
out vec2 vQ; out vec4 vC; flat out vec4 vX;
void main(){
  int id = int(aV + .5);
  vec2 c = vec2(float(id & 1), float(id >> 1)) * 2. - 1.;
  vec2 up = a2.xy, rt = vec2(up.y, -up.x);
  vec2 off = a0.w > 1.5 ? rt * c.x * a0.z * (.1 + .9 * (c.y * .5 + .5)) + up * (c.y * .5 + .5) * a2.z : (rt * c.x + up * c.y) * a0.z;
  gl_Position = vec4(a0.xy + off, 0., 1.);
  vQ = c; vC = a1; vX = vec4(a0.w, a2.w, a0.z, 0.);
}`,ga=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
uniform sampler2D uFg;
uniform float uPx;
in vec2 vQ; in vec4 vC; flat in vec4 vX; out vec4 o;
void main(){
  float e;
  if (vX.x < 1.5) {
    float r = length(vQ), dp = r * vX.z * uPx;
    e = exp(-dp * dp * .3) * 1.3 + (exp(-r * 4.) * .5 + exp(-r * 1.6) * .14) * smoothstep(1., .6, r);
  } else {
    float y = vQ.y * .5 + .5;
    e = exp(-vQ.x * vQ.x * 3.5) * pow(1. - y, 1.5) * (.35 + .65 * exp(-y * 3.5)) * smoothstep(0., .03, y);
  }
  float occ = vX.y > .5 ? 1. - texelFetch(uFg, ivec2(gl_FragCoord.xy), 0).a : 1.;
  o = vec4(vC.rgb * vC.a * e * occ, 0.);
}`,Ea=`#version 300 es
layout(location=0) in vec4 a0; layout(location=1) in vec4 a1; layout(location=2) in vec4 a2; layout(location=3) in vec4 a3; layout(location=4) in float aV;
out vec2 vQ; flat out vec4 vA; flat out vec4 vB;
void main(){
  int id = int(aV + .5);
  vec2 c = vec2(float(id & 1), float(id >> 1)) * 2. - 1.;
  vec2 up = a3.xy, rt = vec2(up.y, -up.x);
  gl_Position = vec4(a0.xy + (rt * c.x + up * c.y * a2.w) * a0.z, 0., 1.);
  vQ = vec2(c.x, c.y * a2.w);
  vA = vec4(a0.w, a1.xy, a1.z); vB = vec4(a2.rgb, a3.z);
}`,Sa=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
uniform sampler2D uFg;
in vec2 vQ; flat in vec4 vA; flat in vec4 vB; out vec4 o;
void main(){
  int ty = int(vA.x + .5);
  vec2 q = vQ;
  float aa = max(fwidth(q.x), .002) * 1.2, a = 0.;
  vec3 c = vB.rgb;
  float lit = vA.z;
  if (ty == 6) {
    float r = length(vec2(q.x, max(abs(q.y) - (vA.z - 1.), 0.)));   // a flake drawn out along its fall
    a = exp(-r * r * 3.2) * vA.w;
    c = vB.rgb;
  } else if (ty == 7) {
    a = exp(-q.x * q.x * 5. - q.y * q.y * 2.5) * vA.w;
    c = vB.rgb;
  }
  float occ = vB.w > .5 ? 1. - texelFetch(uFg, ivec2(gl_FragCoord.xy), 0).a : 1.;
  a *= occ;
  o = vec4(c * a, a);
}`;function Do(s,e){const m=e.map(([M,S])=>{const w=s.createProgram(),F=[[s.VERTEX_SHADER,M],[s.FRAGMENT_SHADER,S]].map(([N,h])=>{const X=s.createShader(N);return s.shaderSource(X,h),s.compileShader(X),s.attachShader(w,X),X});return{p:w,sh:F}});return m.forEach(M=>s.linkProgram(M.p)),s.flush(),()=>m.map(M=>{if(!s.getProgramParameter(M.p,s.LINK_STATUS))throw new Error("Northern Ferry shader: "+M.sh.map(o=>s.getShaderInfoLog(o)).join(" | ")+s.getProgramInfoLog(M.p));const S=M.p,w=o=>s.getUniformLocation(S,o),F=s.getUniformBlockIndex(S,"St"),N=s.getUniformBlockIndex(S,"Dy");F!==s.INVALID_INDEX&&s.uniformBlockBinding(S,F,0),N!==s.INVALID_INDEX&&s.uniformBlockBinding(S,N,1),s.useProgram(S),[["uN",0],["uSky",1],["uG",2],["uFg",3],["uH",4],["uStr",5],["uB",6],["uT",7]].forEach(([o,d])=>{const u=w(o);u&&s.uniform1i(u,d)});const h=w("uOne");h&&s.uniform1i(h,1);const X=w("uSteps");return X&&s.uniform1i(X,116),{p:S,L:w("uL"),px:w("uPx")}})}function Ta(){const e=new Uint8Array(32768),m=2e3/286,M=S=>{let w=Math.imul(S^2654435769,2246822507);return w^=w>>>13,w=Math.imul(w,3266489909),w^=w>>>16,(w>>>0)/4294967296};for(let S=0;S<4;S++)for(let w=0;w<286;w++){const F=M(S*1e3+w),N=M(S*1e3+w+5e4),h=M(S*1e3+w+9e4);if(N<.17)continue;const X=(9+9*h)*(F<.1?1.3:1),o=(w+.2+.6*N)*m,d=2+1.4*M(S*1e3+w+13e4);for(let u=Math.floor((o-d)/2e3*2048);u<=Math.ceil((o+d)/2e3*2048);u++){const G=Math.abs((u+.5)/2048*2e3-o)/d,P=(S*2048+(u%2048+2048)%2048)*4,ne=X*Math.pow(Math.max(1-G,0),1.2)/32*255;ne>e[P]&&(e[P]=Math.round(Math.min(ne,255)))}}return e}function Wt(s,e,m,M,S){const w=s.createTexture();return s.bindTexture(s.TEXTURE_2D,w),s.pixelStorei(s.UNPACK_ALIGNMENT,1),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.texImage2D(s.TEXTURE_2D,0,s.RGBA8,e,m,0,s.RGBA,s.UNSIGNED_BYTE,M),S&&s.generateMipmap(s.TEXTURE_2D),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,S?s.LINEAR_MIPMAP_LINEAR:s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.REPEAT),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.REPEAT),w}function Aa(){const e=new Uint8Array(262144),m=new Uint8Array(256*256*4);let M=1587671271;const S=()=>(M^=M<<13,M^=M>>>17,M^=M<<5,(M>>>0)/4294967296),w=(o,d)=>{const u=new Float32Array(65536);let G=1;for(let U=0;U<d;U++){const C=o<<U,ze=new Float32Array(C*C),le=256/C;for(let xe=0;xe<C*C;xe++)ze[xe]=S();for(let xe=0;xe<256;xe++){const L=xe/le,Se=L|0,qe=L-Se,Mt=qe*qe*(3-2*qe),be=Se%C*C,ye=(Se+1)%C*C;for(let De=0;De<256;De++){const Qe=De/le,mt=Qe|0,Ze=Qe-mt,$e=Ze*Ze*(3-2*Ze),Ft=mt%C,kt=(mt+1)%C;u[xe*256+De]+=((ze[be+Ft]*(1-$e)+ze[be+kt]*$e)*(1-Mt)+(ze[ye+Ft]*(1-$e)+ze[ye+kt]*$e)*Mt)*G}}G*=.55}let P=1e9,ne=-1e9;for(let U=0;U<256*256;U++){const C=u[U];C<P&&(P=C),C>ne&&(ne=C)}for(let U=0;U<256*256;U++)u[U]=(u[U]-P)/(ne-P);return u},F=w(8,5),N=w(16,4);for(let o=0;o<256*256;o++)e[o*4]=S()*255,e[o*4+1]=S()*255,e[o*4+2]=F[o]*255,e[o*4+3]=N[o]*255;const h=new Float32Array(256*256*4),X=[0,0];for(let o=0;o<256;o++)for(let d=0;d<256;d++){const u=o*256+d,G=o*256+(d+1&255),P=o*256+(d-1&255),ne=(o+1&255)*256+d,U=(o-1&255)*256+d;h[u*4]=F[G]-F[P],h[u*4+1]=F[ne]-F[U],h[u*4+2]=N[G]-N[P],h[u*4+3]=N[ne]-N[U],X[0]=Math.max(X[0],Math.abs(h[u*4]),Math.abs(h[u*4+1])),X[1]=Math.max(X[1],Math.abs(h[u*4+2]),Math.abs(h[u*4+3]))}for(let o=0;o<256*256*4;o++)m[o]=(h[o]/X[(o&3)>>1]*.5+.5)*255;return{out:e,grad:m}}const Bo=[Ot,Ot.replace(`
`,`
#define FIRE
`),Ot.replace(`
`,`
#define MOON
`)];function Ra(s,e){let m=qo.get(s);if(m)return!m.CO[e]&&!m.cf[e]&&(m.cf[e]=Do(s,[[dt,Bo[e]]])),m;const M=Do(s,[[dt,xa],[dt,ba],[dt,ya],[dt,Bo[e]],[wa,ga],[Ea,Sa]]),S=Aa();m={nd:S,cf:[],CO:[],fin:F=>{if(!m.SKY){const N=M();[m.SKY,m.STRIP,m.FG,,m.LIGHT,m.THING]=N,m.CO[e]=N[3]}m.CO[F]||([m.CO[F]]=m.cf[F]())}},m.noise=Wt(s,256,256,S.out,!0),m.grad=Wt(s,256,256,S.grad,!0),m.trees=Wt(s,2048,4,Ta(),!1),m.vaoF=s.createVertexArray(),s.bindVertexArray(m.vaoF);const w=s.createBuffer();return s.bindBuffer(s.ARRAY_BUFFER,w),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),s.STATIC_DRAW),s.enableVertexAttribArray(0),s.vertexAttribPointer(0,2,s.FLOAT,!1,0,0),s.bindVertexArray(null),m.vid=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,m.vid),s.bufferData(s.ARRAY_BUFFER,new Float32Array([0,1,2,3]),s.STATIC_DRAW),m.hdr=!!s.getExtension("EXT_color_buffer_float"),qo.set(s,m),m}function Rt(s,e,m,M){const S=m*256-.5,w=M*256-.5,F=Math.floor(S),N=Math.floor(w),h=S-F,X=w-N,o=(d,u)=>s[((u&255)*256+(d&255))*4+e]/255;return(o(F,N)*(1-h)+o(F+1,N)*h)*(1-X)+(o(F,N+1)*(1-h)+o(F+1,N+1)*h)*X}const Ma=["A deep fjord","An island strait with a lighthouse","A wide lake","An Arctic crossing","Open sea"],Fa=["Clear night, the Milky Way","Snowfall","Sea fog","Moonrise","Blue hour","Low cloud lit by a town"],ka=["Warm white floods","Sodium floods","Cold white floods","Floods off, stern light only"],za=["A small car ferry","An old wooden passenger boat","A modern catamaran"],_a=["A village with a church","A fishing harbour","An empty coast, one farm light","A town in winter, festive lights"],Na=["Glassy calm","Long swell","Choppy"],La=["Nothing","Sea fire in the wake","A ferry passing the other way","The aurora"];function qa(s){const e=s.gl,m=s.size,M=s.hash.slice(2);let S=parseInt(M.slice(0,8),16)>>>0,w=parseInt(M.slice(8,16),16)>>>0,F=parseInt(M.slice(16,24),16)>>>0,N=parseInt(M.slice(24,32),16)>>>0;const h=()=>{S>>>=0,w>>>=0,F>>>=0,N>>>=0;let t=S+w|0;return S=w^w>>>9,w=F+(F<<3)|0,F=F<<21|F>>>11,N=N+1|0,t=t+N|0,F=F+t|0,(t>>>0)/4294967296};for(let t=0;t<12;t++)h();const X=t=>{let a=0;for(const n of t)a+=n;let r=h()*a;for(let n=0;n<t.length;n++)if(r-=t[n],r<0)return n;return t.length-1},o=(t,a)=>t+(a-t)*h();let d=X([45,25,20,10]),u=X([45,25,18,12]),G=X([50,28,22]),P=X([38,32,20,10]),ne=X([28,47,25]),U=X([76,8,9,7]);s.home&&(d=0,u=0,G=0,P=0,ne=1,U=0);const C=U===3;(C||U===1)&&(u=0),U===1&&u===2&&(u=0),P===3&&u===2&&(u=1);let ze=(N^2773480762)>>>0;const le=()=>{ze=ze+1831565813>>>0;let t=ze;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296},xe=t=>{let a=0;for(const n of t)a+=n;let r=le()*a;for(let n=0;n<t.length;n++)if(r-=t[n],r<0)return n;return t.length-1};let L=xe([50,18,16,16]),Se=xe([64,36]),qe=(d===0||d===3)&&le()<(d===3?.42:.2)?1:0;const Mt=le();L===0&&Mt<.36&&(L=4),s.home&&(L=0,Se=0,qe=0),u===2&&L===1&&(L=2),C&&L===2&&(L=1),U===2&&L===2&&(L=0),qe&&(ne=0);let be=139202021;for(let t=0;t<64;t+=8)be=Math.imul(be^parseInt(M.slice(t,t+8),16),668265263)^be>>>15;const ye=()=>{be=be+1831565813|0;let t=Math.imul(be^be>>>15,1|be);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},De=ye(),Qe=ye(),mt=ye(),Ze=ye(),$e=ye(),Ft=ye(),kt=ye(),Da=ye();let Te=u===0?De<.4?0:De<.72?4:5:u,Be=Qe<.36?0:Qe<.6?1:Qe<.8?2:3;C&&(Te=0),U===1&&(Te=De<.6?0:5,Be=3);const Vt=U===1?1:u===3?2:0,K=Ra(e,Vt),zt=K.nd.out;mt<.13&&(d=4),s.home&&(Te=0,Be=0,d=0),s.trait("Waters",Ma[d]),s.trait("Sky",Fa[Te]),s.trait("Ferry",za[G]),s.trait("Shore",d===4?"No land, a far ship and a buoy":_a[P]),s.trait("Sea",qe?"Drift ice":Na[ne]),s.trait("Deck lamps",ka[Be]),s.trait("Something rare",La[U]),s.trait("Vantage",["At the stern rail","Watching the sky","Leaning over the rail","Over the quarter","High on the top deck"][L]);let Ye=(S^2654435769)>>>0;const Je=()=>(Ye^=Ye<<13,Ye^=Ye>>>17,Ye^=Ye<<5,(Ye>>>0)/4294967296),Y=(t,a)=>t+(a-t)*Je(),p=[{EH:7,U:6.5,hull:45,w0:2.2,spread:.38,flen:260,twin:1.6,kel:.9,rail:[.6,.61,.6],rr:.026,buoy:[.8,.2,.04],band:[.86,.86,.82],retro:1,rope:[.4,.37,.31],dl:[1,.7,.42],dlp:3.2,fl:[1,.93,.82],flp:62,churn:[.02,.16,.15],wood:0},{EH:3.4,U:4.6,hull:22,w0:1.1,spread:.3,flen:150,twin:0,kel:.55,rail:[.26,.13,.055],rr:.04,buoy:[.82,.8,.74],band:[.7,.05,.03],retro:0,rope:[.5,.4,.26],dl:[1,.7,.42],dlp:1.6,fl:[1,.74,.48],flp:26,churn:[.014,.08,.055],wood:1},{EH:6,U:12,hull:36,w0:1.7,spread:.45,flen:340,twin:4.6,kel:1.25,rail:[.7,.72,.75],rr:.022,buoy:[.88,.3,.04],band:[.9,.9,.9],retro:1,rope:[.75,.75,.72],dl:[.85,.9,1],dlp:3.4,fl:[.86,.93,1],flp:110,churn:[.01,.12,.11],wood:0}][G];{const t=[{fl:[1,.93,.82],dl:[1,.7,.42],k:1},{fl:[1,.43,.1],dl:[1,.47,.13],k:1.05},{fl:[.78,.9,1],dl:[.8,.9,1],k:1.25},{fl:[1,.95,.88],dl:[1,.7,.42],k:.07}][Be];p.fl=t.fl,p.dl=t.dl,p.flp*=t.k,Be===3&&(p.dlp*=.55);const a=[[.02,.16,.15],[.015,.13,.17],[.07,.1,.04],[.035,.15,.2],[.012,.09,.17]][d],r=p.churn[1]/.16;p.churn=a.map(n=>n*r)}const jt=h()<.5?-1:1,Ue=p.U,pt=p.EH+(L===4?2.6:0),Ba=9.81/(Ue*Ue);let Ie=-(d===2?11.5:12.5)*Math.PI/180,we=(jt<0?-1:1)*o(4,7)*Math.PI/180,Ae=1.12,et=.6;L===1?(Ie=17*Math.PI/180,Ae=1.35,et=.36):L===2?(Ie=-46*Math.PI/180,Ae=.38,et=.62):L===4?(Ie=-17*Math.PI/180,Ae=4.5,et=3.2):L===3&&(we=(d===1?1:jt<0?-1:1)*(u===3?19+2*le():28+4*le())*Math.PI/180);const _t=L===3?we<0?-2.6:2.6:0,Kt=L===4?pt+2.5:pt+3,Qt=L===4?-.5:.2,tt=L===4?[1.5,-1.2,1]:[1.5,1.7,-.9];let Zt=-.64,$t=.6,Uo=Se===1?-.7:.66,Io=Se===1?.74:-.74,Po=0;{const t=le(),a=le(),r=le(),n=le(),c=le(),b=le(),v=le();s.home||(Zt=-.42-.42*t,$t=.42+.42*a,Uo=(Se===1?Zt:$t)+(Se===1?-.06:.06)*(r<.5?1:-1),Io=(Se===1?1:-1)*(.52+.4*n),Po=(b-.5)*.07,L===0&&(et*=.82+.42*c,Ae*=.92+.34*v,we*=1+.8*r))}const Xo=Ae+.5,Co=jt;let V;d===0?V=[[-o(650,820),o(420,560),0,.56],[-o(1900,2400),o(950,1250),1,.45],[o(700,880),o(440,600),0,.54],[o(2e3,2600),o(1e3,1300),1,.45]]:d===1?V=[[-o(430,520),o(180,260),3,2],[-o(1500,1900),o(450,650),1,.6],[o(800,1e3),o(40,60),2,2],[0,0,1,1]]:d===2?V=[[-o(1200,1500),o(140,200),3,2],[-o(3200,3800),o(380,520),1,.7],[o(1400,1800),o(120,180),3,2],[0,0,1,1]]:d===4?V=[[-o(140,260),0,1,1],[0,0,1,1],[o(500,800),0,1,1],[0,0,1,1]]:V=[[-o(600,760),o(380,520),4,.2],[-o(2e3,2500),o(800,1100),1,.3],[o(800,980),o(320,450),4,.2],[o(2400,2900),o(800,1e3),1,.3]];const Re=d===1||Co<0?0:2,Nt=Re===0?2:0;(d===0||d===3)&&(V[Re][0]*=.7);const Ge=o(0,1e3),de=256,z=k/de,Jt=new Float32Array(512*8*4),Ho=new Uint8Array(4*2*de),Lt=[],_e=(t,a,r,n,c)=>{r=(r%de+de)%de;const b=((t*2+a)*512+r*2)*4;for(let v=0;v<4;v++)Jt[b+v]=n[v],Jt[b+4+v]=c[v];Ho[(t*2+a)*de+r]=1},Yo=(t,a,r)=>!Ho[(t*2+a)*de+(r%de+de)%de],j=(t,a,r,n,c,b,v)=>{Lt.length<200&&Lt.push({L:t,s:(a%k+k)%k,y:r,col:n,I:c,kind:b||0,ph:v||0})},eo=[1,.56,.22],Go=[.86,.92,1],ot=[1,.72,.42],Oo=(t,a)=>{const r=a/k,n=.137+t*.21,c=V[t][1],b=Rt(zt,2,r,n),v=Rt(zt,3,r*6,n+.31),f=b*2.6-1.5+.5*v;return f>0?c*Math.pow(f,.6):-1},Wo=d===2?o(1900,2600):s.home?950:o(850,1200),to=Wo,Vo=P===3?360:P===1?240:210,Ua=h()<.25,ut=(t,a,r,n,c,b,v)=>{if(!Yo(t,a,r))return!1;const f=o(5,7.2),x=o(4.2,6.5),_=o(1.8,3.6);return _e(t,a,r,[v===5?5:1,o(2.5,z-2.5),n,f],[x,_,b,v!=null&&v!==5?v:Math.floor(o(0,3.99))]),!0},Ia=(t,a,r,n)=>{const c=Math.floor((a-r)/z),b=Math.ceil((a+r)/z),v=n===3;for(let f=c;f<=b;f++){const x=f*z+z/2,_=Math.abs(x-a)/r,q=Math.exp(-_*_*2.2);if(h()<q*(v?1:.85)&&(n===1&&_<.5&&h()<.55?(_e(t,0,f,[4,o(2,z-2),0,o(8,11)],[o(7,10),0,h()<.4?1:0,Math.floor(o(0,3.99))]),h()<.6&&j(t,x,o(8,10),[1,.95,.9],o(15e3,3e4),0)):n===1&&h()<.25&&Yo(t,0,f+1)?(_e(t,0,f,[2,z,o(.5,2),o(13,17)],[o(6,8),o(2,3),o(.1,.3),3]),_e(t,0,f+1,[0,0,0,0],[0,0,0,0]),j(t,x+z*.5,o(6.5,8),eo,o(8e4,14e4),0)):ut(t,0,f,o(1.5,3.5),q,v?o(.35,.7):o(.15,.5))&&h()<.28&&j(t,x+o(-2,2),o(2.5,3.5),ot,o(1e4,25e3),0)),h()<q*(v?.95:.65)){const D=o(7,14)+(1-q)*o(4,30)+(v?o(0,25):0);ut(t,1,f,D,q,v?o(.35,.7):o(.12,.45)),h()<.12&&j(t,x+o(-2,2),D+o(2,3),ot,o(1e4,2e4),0)}if(q>.12&&h()<.22&&j(t,x+o(-3,3),o(5,9)+(1-q)*o(0,14),h()<.25?ot:Ua||v?v?[1,.8,.55]:Go:eo,o(25e3,11e4),0,h()*6),v&&q>.25&&f%4===0)for(let D=0;D<9;D++){const O=D/8,W=1.6*O*(1-O)*4,Z=[[1,.82,.55],[1,.82,.55],[1,.3,.15],[.3,1,.4],[1,.7,.2]][Math.floor(o(0,4.99))];j(t,x+O*z*4,6.5-W,Z,o(6e3,12e3),3,h()*6)}}if(n===0||n===3){let f=Math.floor((a+o(-.25,.25)*r)/z);const x=o(8,16);_e(t,1,f,[3,z*.5,x,15],[0,0,0,0]),_e(t,1,f-1,[9,z*.35,x,5],[0,0,0,0]),j(t,f*z+z*.5-5,x+.6,[1,.9,.75],o(3e4,5e4),0),j(t,f*z+z*.5+5,x+.6,[1,.9,.75],o(3e4,5e4),0)}if(n===3){const f=a+o(-.4,.4)*r;for(let x=0;x<26;x++){const _=x/25,q=x*2.4;j(t,f+Math.cos(q)*3.2*(1-_),3+_*11,[1,.85,.55],7e3,3,x)}j(t,f,14.6,[1,.9,.6],25e3,3,0)}n===1&&(j(t,a-r*.55,4.5,[1,.12,.06],8e4,1,0),j(t,a+r*.45,4.5,[.1,1,.3],8e4,1,1.4))};if(d===4){const t=o(300,650)-Ge,a=o(1150,1500)-Ge,r=h()<.5;j(0,t,3.2,r?[.12,1,.35]:[1,.13,.06],35e3,1,0);for(let n=0;n<6;n++)j(2,a+n*12,7+n%2*3,[1,.84,.58],o(15e3,3e4),0);j(2,a+14,24,[1,1,1],5e4,0),j(2,a+58,17,[1,1,1],4e4,0)}else if(P===2){const t=Math.floor(to/z),a=o(35,70);_e(Re,1,t,[5,z*.5,a,7],[5.2,2.8,.25,0]),_e(Re,1,t+1,[6,z*.4,a-1,10],[6.5,4,0,1]),j(Re,t*z+z*.9,a+4.5,eo,45e3,0)}else{Ia(Re,to,Vo,P);for(let t=0;t<de;t++)if(h()<.035){const a=o(4,50);ut(Re,1,t,a,0,o(.1,.5))&&h()<.4&&j(Re,t*z+o(1,z-1),a+2.5,ot,15e3,0)}if(d!==1){for(let a=0;a<de;a++)if(h()<.025){const r=o(3,40);ut(Nt,1,a,r,0,o(.1,.45))&&h()<.35&&j(Nt,a*z+o(1,z-1),r+2.5,ot,15e3,0)}const t=o(0,k);for(let a=0;a<3;a++)j(Nt,t+a*9,7,Go,12e4,0)}}let Ne=null;if(d===1){const t=((o(1300,1700)-Ge-13)%k+k)%k;let a=-1,r=t;for(let c=-60;c<=60;c++){const b=((t+c*6)%k+k)%k,v=Oo(2,b);v>a&&(a=v,r=b)}a<6&&(a=6,r=t);const n=Math.floor(r/z);_e(2,0,n,[7,r-n*z,a-3,4],[0,0,0,0]),Ne={s:r,y:a-3+17.3},Ne.a0=Math.atan2(-(((r+Ge-60)%k+k)%k+60),V[2][0])+(kt-.5)*.3,L===3&&(we=B(Math.atan2(V[2][0],((r+Ge-60)%k+k)%k+60)-.24,.38,.63));for(let c=0;c<de;c++){const b=c*z+z/2,v=Oo(2,b);v>12&&c!==n&&h()<.12&&ut(2,1,c,Math.max(1,v*.5-3),0,o(.15,.5),1)&&h()<.3&&j(2,b,v*.5,ot,12e3,0)}}const Pa=Lt.length,me=new Float32Array(42*4),E=(t,a,r,n,c)=>{me[t*4]=a,me[t*4+1]=r,me[t*4+2]=n,me[t*4+3]=c},vt=m>=600,oo=vt?1536:640,jo=vt?768:320,ao=vt?2048:1024,ro=vt?256:128,Ko=50*Math.PI/180,Xa=-4*Math.PI/180,Ca=(L===1?60:52)*Math.PI/180,Qo=oo/(2*Ko);E(0,2*He/m,ao,ro,.75/Qo);for(let t=0;t<4;t++)E(1+t,V[t][0],V[t][1],k,V[t][1]>0?d===0||d===3?2:1:0);const Zo=u===3,ce=[{zen:[.0025,.0038,.009],hor:[.011,.015,.026],st:1.7,fc:[.012,.015,.024],fd:5500,am:[.006,.008,.013],la:[.02,.024,.032],cl:-1},{zen:[.0042,.0056,.0095],hor:[.013,.016,.025],st:0,fc:[.016,.02,.031],fd:2e3,am:[.011,.013,.019],la:[.034,.038,.052],cl:1},{zen:[.0025,.0038,.009],hor:[.022,.025,.031],st:.05,fc:[.025,.029,.038],fd:5500,am:[.006,.008,.013],la:[.02,.024,.032],cl:0},{zen:[.0045,.0068,.0162],hor:[.011,.015,.026],st:.45,fc:[.012,.015,.024],fd:5500,am:[.0132,.0176,.0286],la:[.034,.041,.054],cl:-1},{zen:[.0035,.011,.036],hor:[.02,.04,.058],st:.1,fc:[.03,.043,.066],fd:3200,am:[.02,.032,.06],la:[.06,.09,.15],cl:0,glow:[.26,.1,.028,1.1,15]},{zen:[.008,.006,.006],hor:[.016,.011,.009],st:0,fc:[.024,.017,.013],fd:3800,am:[.015,.011,.008],la:[.045,.03,.021],cl:1.15,glow:[.06,.03,.013,1,9]}][Te],Ha=u===2?1/o(500,800):1/ce.fd,so=C?1.3:1,no=ce.fc;E(5,no[0],no[1],no[2],Ha),E(6,.006,.012,.014,[.022,.065,.1][ne]),E(7,Ba,p.kel,Xo-6.5,.55*(Ue/6.5)),E(8,p.w0,p.spread,p.flen,p.twin),E(9,_t,Kt,Qt,p.flp),E(10,p.fl[0],p.fl[1],p.fl[2],Xo),E(11,Ko,Xa,Ca,u===2?2.2:2.6),E(12,.1,1,.42,C?1:0),E(13,p.churn[0],p.churn[1],p.churn[2],Qo),E(14,ce.am[0]*so,ce.am[1]*so,ce.am[2]*so,Ue);{const t=Be===3?.004:.012;E(15,(.3+.7*p.fl[0])*t,(.3+.7*p.fl[1])*t,(.3+.7*p.fl[2])*t,22e-5)}const lo=ce.zen,io=ce.hor;E(16,lo[0],lo[1],lo[2],ce.st*(vt?1:.6)),E(17,io[0],io[1],io[2],qe);let Oe=0,Me=0,at=0;Zo&&(u===3?(Oe=o(-.14,.14),Me=o(.035,.07),at=.011):(Oe=o(-.5,.5),Me=o(.3,.45),at=.012)),E(18,Math.sin(Oe)*Math.cos(Me),Math.sin(Me),Math.cos(Oe)*Math.cos(Me),at);const rt=u===3?[1,.72,.42]:[.9,.92,1];E(19,rt[0],rt[1],rt[2],(t=>ce.cl<0?t:ce.cl)(u===1?.9:u===2?0:h()<.25?.3:0));const co=P===3?.012:P===2?.0015:.006,$o=Math.atan2(V[Re][0],Wo),Fe=ce.glow,fo=P===2?.6:P===3?1.3:1;Te===4?E(20,Fe[0],Fe[1],Fe[2],(Ze-.5)*.5):Te===5?E(20,Fe[0]*fo,Fe[1]*fo,Fe[2]*fo,d===4?Ze-.5:$o):E(20,co,co*.62,co*.32,$o);{const t=s.home?-.12:($e-.5)*.9,a=s.home?.38:(Ft-.5)*1.2;E(40,-Math.cos(t)*Math.cos(a),Math.sin(a),Math.sin(t)*Math.cos(a),Te===0?1:Te===3?.3:0),E(41,Fe?Fe[3]:.45,Fe?Fe[4]:9,Te===5?1:0,U===1?1:0)}const qt=d===0?o(.05,.08)*1.35:d===2?o(.008,.014):d===3?o(.03,.05):0;if(E(21,qt,d===0?.22:.6,h(),qt>0?1:0),Zo&&qt>0){let t=0;for(let a=-1;a<=1;a++){const r=Oe+a*at,n=me[86];t=Math.max(t,qt*(.25+.7*Rt(zt,2,r*.3+n,.73)+.35*(Rt(zt,3,r*1.4+n,.21)-.5))*B((me[85]+.3-Math.abs(r))/.3,0,1))}Me=Math.max(Me,t+.5*at),E(18,Math.sin(Oe)*Math.cos(Me),Math.sin(Me),Math.cos(Oe)*Math.cos(Me),at)}E(22,(d===0||d===3?.15:.03)+o(.12,.22)*.6,.012+o(.1,.16)*.26,h(),C?.42:0),E(23,.004,.005,.007,d===0||d===3?1:0);for(let t=0;t<4;t++)E(24+t,V[t][2],.137+t*.21,t===Re||t===Nt||d===1&&t===2?1:0,V[t][3]);E(28,to,Vo*1.2,0,P),E(29,L===3?we:0,_t,Be===0||Be===2?.72:.6,P===3||u===1?1:0);const ho=C?1.3:1;E(30,ce.la[0]*ho,ce.la[1]*ho,ce.la[2]*ho*(C?1.1:1),P===2?.002:P===3?.012:.006),E(31,p.band[0],p.band[1],p.band[2],p.retro),E(32,p.rail[0],p.rail[1],p.rail[2],p.rr),E(33,p.buoy[0],p.buoy[1],p.buoy[2],1),E(34,p.rope[0],p.rope[1],p.rope[2],1),E(35,tt[0],tt[1],tt[2],p.dlp*(L===4?1.6:1)),E(36,p.dl[0],p.dl[1],p.dl[2],p.wood),E(37,Ie,Ae,et,Ae*1.5+2.5),E(38,Zt,$t,Uo,we),E(39,Io,-et-.37,Ae-.09,0);const Jo=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,Jo),e.bufferData(e.UNIFORM_BUFFER,me,e.STATIC_DRAW);const y=new Float32Array(64*4),mo=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,mo),e.bufferData(e.UNIFORM_BUFFER,y,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null);const ea=()=>{e.bindBufferBase(e.UNIFORM_BUFFER,0,Jo),e.bindBufferBase(e.UNIFORM_BUFFER,1,mo)},fe=(t,a,r)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(r||e.TEXTURE_2D,a)},Dt=K.hdr?[e.RGBA16F,e.HALF_FLOAT]:[e.RGBA8,e.UNSIGNED_BYTE],ta=(t,a,r,n)=>{const c=e.createTexture();e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,r?Dt[0]:e.RGBA8,t,a,0,e.RGBA,r?Dt[1]:e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const b=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,b),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,c,0),{t:c,f:b}},Bt=ta(oo,jo,!0,!0),po=ta(m,m,!0,!1),oa=e.createTexture();e.bindTexture(e.TEXTURE_2D,oa),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,512,8,0,e.RGBA,e.FLOAT,Jt),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const Ut=e.createTexture();e.bindTexture(e.TEXTURE_2D_ARRAY,Ut),e.texImage3D(e.TEXTURE_2D_ARRAY,0,Dt[0],ao,ro,4,0,e.RGBA,Dt[1],null),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const ke=new Uint8Array(256*4),It=e.createTexture();e.bindTexture(e.TEXTURE_2D,It),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);{K.fin(Vt),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),ea(),fe(0,K.noise),fe(2,K.grad),e.bindVertexArray(K.vaoF),e.bindFramebuffer(e.FRAMEBUFFER,Bt.f),e.viewport(0,0,oo,jo),e.useProgram(K.SKY.p),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),fe(1,Bt.t),e.generateMipmap(e.TEXTURE_2D),fe(6,oa),fe(7,K.trees);const t=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,t),e.viewport(0,0,ao,ro),e.useProgram(K.STRIP.p),e.clearColor(0,0,0,0);for(let a=0;a<4;a++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,Ut,0,a),V[a][1]>0?(e.uniform1i(K.STRIP.L,a),e.drawArrays(e.TRIANGLES,0,3)):e.clear(e.COLOR_BUFFER_BIT);e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t),fe(5,Ut,e.TEXTURE_2D_ARRAY),e.generateMipmap(e.TEXTURE_2D_ARRAY),e.bindFramebuffer(e.FRAMEBUFFER,po.f),e.viewport(0,0,m,m),e.useProgram(K.FG.p),e.drawArrays(e.TRIANGLES,0,3),e.clearColor(0,0,0,1),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Bt.f),e.deleteFramebuffer(po.f),fe(6,null),fe(7,null)}const aa=240,he=new Float32Array(aa*12),ra=e.createVertexArray();e.bindVertexArray(ra);const sa=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,sa),e.bufferData(e.ARRAY_BUFFER,he,e.DYNAMIC_DRAW);for(let t=0;t<3;t++)e.enableVertexAttribArray(t),e.vertexAttribPointer(t,4,e.FLOAT,!1,48,t*16),e.vertexAttribDivisor(t,1);e.bindBuffer(e.ARRAY_BUFFER,K.vid),e.enableVertexAttribArray(4),e.vertexAttribPointer(4,1,e.FLOAT,!1,0,0),e.vertexAttribDivisor(4,0);const na=1500,J=new Float32Array(na*16),la=e.createVertexArray();e.bindVertexArray(la);const ia=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ia),e.bufferData(e.ARRAY_BUFFER,J,e.DYNAMIC_DRAW);for(let t=0;t<4;t++)e.enableVertexAttribArray(t),e.vertexAttribPointer(t,4,e.FLOAT,!1,64,t*16),e.vertexAttribDivisor(t,1);e.bindBuffer(e.ARRAY_BUFFER,K.vid),e.enableVertexAttribArray(4),e.vertexAttribPointer(4,1,e.FLOAT,!1,0,0),e.vertexAttribDivisor(4,0),e.bindVertexArray(null);const xt=[.08,.36,.6][ne];let ca=xt,ee=xt,Pt=0,We=o(-.9,.9)+(h()<.5?0:Math.PI),uo=We;const Xt=[[o(60,85),1,0],[o(38,50),.55,o(-.5,.5)],[o(13,17),.2,o(-1,1)],[o(7,9),.09,o(-1.4,1.4)]].map(([t,a,r])=>({k:ue/t,w:Math.sqrt(9.81*ue/t),a,dd:r,ph:o(0,ue)}));let oe=0,Pe=Ge,Ct=0;for(const t of Xt)t.p=t.ph-t.k*Math.cos(We+t.dd)*Ge;const bt=(t,a)=>{let r=0;for(const n of Xt){const c=We+n.dd,b=n.a*ee*(n.k>.3?.6+.8*Math.max(0,ee-.3):1);r+=b*Math.cos(n.k*(Math.sin(c)*t+Math.cos(c)*a)+n.p)}return r};let vo=0,Ht=0,yt=0,xo=0,bo=0,yo=0,st=0,wo=0,Yt=0,go=0,fa=0,ha=0,Eo=3,nt=0,So=Pe;const Ya=()=>{nt=nt+1&255;const t=nt*4;ke[t]=B(128+Yt/16*255,0,255),ke[t+1]=B(200+Y(-35,35)-ee*50,0,255),ke[t+2]=B(ee*200,0,255),ke[t+3]=255,e.bindTexture(e.TEXTURE_2D,It),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texSubImage2D(e.TEXTURE_2D,0,nt,0,1,1,e.RGBA,e.UNSIGNED_BYTE,ke.subarray(t,t+4))};for(let t=(G===1?3:G===2?4:6)*8+1;t>0;t--)h();for(let t=3+Math.floor(o(10,18))*5+1;t>0;t--)h();U===1&&(h(),h(),h());let ie=U===2?{t:30+o(4,30)*.9}:null;const Gt=[],To=1.15*He,lt=.7,wt=16,Ga=(Da-.5)*3.4,ae=(()=>{const t=Math.cos(Ie),a=Math.sin(Ie),r=Math.cos(we),n=Math.sin(we);return[r,0,-n,-n*a,t,-r*a,n*t,a,r*t]})();for(let t=0;t<1400;t++){const a=t<320?{s:o(.6,1.4),ph:o(0,ue),z:o(.02,1)}:{s:Y(.6,1.4),ph:Y(0,ue),z:Je()};a.z=lt+(wt-lt)*Math.pow(a.z,.9),a.u=Y(-1,1),a.v=Y(-1,1),Gt.push(a)}const it=[];let Ao=u===1?.85:u===2?.5:0,Xe=Ao,Ro=Ao,Oa=-99;const H=s.sound,Wa=[Math.abs(V[0][0]),V[2][0]>0?V[2][0]:4e3].map(t=>t).map(t=>d===4?4e3:t).concat(d===0?[9e3]:[]),ge=[1,0,0],Ee=[0,1,0],Ve=[0,0,1];let Ce=pt;function Va(){const t=Math.cos(Ie),a=Math.sin(Ie),r=Math.cos(we),n=Math.sin(we),c=[[r,0,-n],[-n*a,t,-r*a],[n*t,a,r*t]],b=.14*Math.tanh(vo/.14)+Po,v=Math.cos(yt),f=Math.sin(yt),x=Math.cos(b),_=Math.sin(b),q=Math.cos(st),D=Math.sin(st),O=[ge,Ee,Ve];for(let W=0;W<3;W++){const Z=c[W],l=Z[1]*v-Z[2]*f,i=Z[1]*f+Z[2]*v,g=Z[0],T=g*x-l*_,A=g*_+l*x;O[W][0]=T*q+i*D,O[W][1]=A,O[W][2]=-T*D+i*q}}const Q=[0,0,0];function ct(t,a,r){const n=a-Ce,c=t*Ve[0]+n*Ve[1]+r*Ve[2];return c<.08?!1:(Q[0]=(t*ge[0]+n*ge[1]+r*ge[2])/(c*He),Q[1]=(t*Ee[0]+n*Ee[1]+r*Ee[2])/(c*He),Q[2]=c,!0)}const ja=(t,a,r)=>{const n=_t-t,c=Kt-a,b=Qt-r,v=n*n+c*c+b*b,f=(c*.75-b*.66)/Math.hypot(c,b),x=Math.abs(n)/Math.hypot(n,b);return p.flp*(.08+.92*B((f-.62)/.31,0,1)*B((.95-x)/.35,0,1))/v},da=(t,a,r)=>{const n=tt[0]-t,c=Ce+tt[1]-a,b=tt[2]-r;return p.dlp/(n*n+c*c+b*b)};let gt=0,Mo=0,Fo=.2,ma=0;function pa(){Oa=oe,H.on&&(H.note(0,{freq:G===2?131:98,dur:2.3,vel:.6,wave:"sawtooth",cutoff:560,attack:.07}),H.note(0,{freq:G===2?196:147,dur:2.3,vel:.38,wave:"sawtooth",cutoff:760,attack:.07}),H.note(0,{freq:G===2?65.5:49,dur:2.2,vel:.3,wave:"sine",attack:.08}),Wa.forEach((t,a)=>{if(t>3500)return;const r=2*t/343,n=.2*Math.sqrt(400/t);H.note(0,{freq:G===2?131:98,dur:2.1,vel:n,wave:"sawtooth",cutoff:330,attack:.15,at:r,pan:a===0?-.75:.75}),H.note(0,{freq:G===2?196:147,dur:2.1,vel:n*.6,wave:"triangle",cutoff:420,attack:.15,at:r+.03,pan:a===0?-.75:.75}),t<1200&&H.note(0,{freq:G===2?131:98,dur:1.8,vel:n*.35,wave:"triangle",cutoff:260,attack:.2,at:r*2,pan:a===0?.4:-.4})}),d===0&&H.note(0,{freq:98,dur:2,vel:.06,wave:"triangle",cutoff:250,attack:.3,at:2*1800/343})),ie&&ie.t>5&&ie.t<70&&(ie.answer=oe+o(2.5,4))}function Ka(t){H.on&&(gt-=t,Mo-=t,Fo-=t,gt<0&&(G===0?(gt+=.23,ma^=1,H.note(0,{freq:42,dur:.3,vel:ma?.34:.26,wave:"sine"}),H.note(0,{freq:84,dur:.16,vel:.07,wave:"triangle",cutoff:220})):G===1?(gt+=.37,H.hit("kick",.4),H.note(0,{freq:55,dur:.18,vel:.1,wave:"square",cutoff:160})):(gt+=.42,H.note(0,{freq:64,dur:.55,vel:.12,wave:"sawtooth",cutoff:240}),H.note(0,{freq:128,dur:.5,vel:.05,wave:"triangle",cutoff:500}))),Mo<0&&(Mo+=Y(.22,.36),H.hit("noise",.05+.06*ee+(G===2?.04:0),{cutoff:Y(2200,4200),dur:Y(.6,1.1),pan:Y(-.3,.3)})),Fo<0&&(Fo+=Y(.5,.9),H.hit("noise",.025+.07*Xe+.03*ee,{cutoff:Y(300,650),dur:Y(1,1.6),pan:Y(-.7,.7)})))}function ua(t){oe+=t,Pe+=Ue*t;{let l=uo-We;l=Math.atan2(Math.sin(l),Math.cos(l)),We+=l*Math.min(1,t*.35)}for(const l of Xt)l.p=(l.p-(l.k*Math.cos(We+l.dd)*Ue+l.w)*t)%ue;Pt*=Math.exp(-t/22),ca=B(xt+Pt,0,1.25),ee+=(ca-ee)*Math.min(1,t*.6);const a=-18,r=6,n=20,c=bt(0,a),b=bt(-r,a),v=bt(r,a),f=bt(0,a-n),x=bt(0,a+n),_=B(Math.atan((v-b)/(2*r))*1.7,-.17,.17),q=B(Math.atan((x-f)/(2*n))*1.5,-.06,.06),D=ue/(G===2?4.5:7),O=ue/5;Ht+=(D*D*(_-vo)-2*.22*D*Ht)*t,vo+=Ht*t,xo+=(O*O*(q-yt)-2*.3*O*xo)*t,yt+=xo*t,yo+=(1.6*(c-bo)-1.2*yo)*t,bo+=yo*t,wo+=(-.5*st-.9*wo+(Je()-.5)*.02*(1+2*ee)+Ht*.01)*t,st=B(st+wo*t,-.04,.04),go+=(-.12*Yt-.5*go+(Je()-.5)*(.5+1.2*ee)+st*3)*t,Yt=B(Yt+go*t,-7,7);const W=Math.min(2.2,pt*.45),Z=W*Math.tanh((bo-yt*22)/W)+Math.sin(oe*27)*.0015;for(ha=(Z-fa)/t,fa=Z,Ce=pt+Z;Pe-So>=ht;)So+=ht,Ya();if(Eo-=t,ee>.5&&(ha<-.25||Je()<t*.25*(ee-.5))&&Eo<0){Eo=Y(2.5,6)/ee;const l=Math.floor(Y(30,55)*ee),i=Y(-1,1);for(let g=0;g<l&&it.length<90;g++)it.push({x:i+Y(-.9,.9),y:Ce-Y(1.6,2.4),z:Y(1.5,2.6),vx:Y(-.8,.8),vy:Y(2.8,5.2),vz:Y(-2.6,-.6),life:Y(.9,1.4)});H.on&&(H.hit("noise",.16,{cutoff:2600,dur:.5,pan:i*.4}),H.hit("noise",.1,{cutoff:900,dur:.3,at:.25}))}for(let l=it.length-1;l>=0;l--){const i=it[l];i.vy-=9.81*t,i.vz-=.8*t,i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t,i.life-=t,(i.life<0||i.z<.15)&&it.splice(l,1)}if(ie&&(ie.t+=t,ie.answer&&oe>ie.answer&&(ie.answer=0,ie.flash=oe,H.on&&(H.note(0,{freq:117,dur:1.8,vel:.14,wave:"sawtooth",cutoff:380,attack:.1}),H.note(0,{freq:175,dur:1.8,vel:.08,wave:"sawtooth",cutoff:450,attack:.1})))),Xe+=(Ro-Xe)*Math.min(1,t*(Ro>Xe?.55:.22)),Xe>.003)for(const l of Gt){const i=t/(l.z*To),g=Ga+Math.sin(oe*1.3+l.ph*3)*.5,T=-1.3-.5*l.s,A=Ue*.3+.8*Math.sin(oe*.7+l.ph);l.vx=g,l.vz=A,l.u+=(g*ae[0]+A*ae[2])*i,l.v+=(g*ae[3]+T*ae[4]+A*ae[5])*i,l.z+=(g*ae[6]+T*ae[7]+A*ae[8])*t,l.u>1?l.u-=2:l.u<-1&&(l.u+=2),l.v>1?l.v-=2:l.v<-1&&(l.v+=2),l.z>wt?l.z-=wt-lt:l.z<lt&&(l.z+=wt-lt)}}let re=null,ko=0,zo=0,_o=99,No=!1;function Qa(t,a){a=Math.min(a||1/30,.25);const r=s.input,n=r.taps();if(r.down&&r.inside&&!re&&(re={x:r.x,y:r.y,t:oe,mode:"press"},ko=r.x,zo=r.y),No=!1,re&&r.down){if(_o=0,re.mode==="press"&&Math.hypot(r.x-re.x,r.y-re.y)>.03&&(re.mode="drag"),re.mode==="press"&&oe-re.t>.4&&(re.mode="hold"),re.mode==="drag"){const b=r.x-ko,v=r.y-zo,f=Math.hypot(b,v);if(Pt=Math.min(1,Pt+f*1.1),f>.002){let _=Math.atan2(b,-v)-uo;_=Math.atan2(Math.sin(_),Math.cos(_)),uo+=_*Math.min(1,f*2)}H.on&&f>.01&&Je()<.3&&H.hit("noise",B(f*2,.03,.12),{cutoff:700+f*6e3,dur:.4,pan:r.x*2-1})}re.mode==="hold"&&(No=!0),ko=r.x,zo=r.y}re&&!r.down?(re.mode==="press"&&pa(),re=null):!re&&n.length&&(pa(),_o=0),_o+=a,Ro=No?1:Ao,Ct+=a;let c=0;for(;Ct>=1/30-1e-6&&c<4;)ua(1/30),Ct-=1/30,c++;c>=4&&(Ct=0),Ka(a),va()}function Za(){Va(),y.fill(0),y[0]=ge[0],y[1]=ge[1],y[2]=ge[2],y[3]=Ce,y[4]=Ee[0],y[5]=Ee[1],y[6]=Ee[2],y[7]=oe,y[8]=Ve[0],y[9]=Ve[1],y[10]=Ve[2],y[11]=Pe%8192;const t=u===2?0:Xe,a=u===2?Xe:Xe*.6;y[12]=a*(u===2?1/330:1/900),y[13]=t,y[14]=ee,y[15]=nt+(Pe-So)/ht;for(let r=0;r<4;r++){const n=Xt[r],c=We+n.dd,b=Math.sin(c)*n.k,v=Math.cos(c)*n.k,f=n.a*ee*(n.k>.3?.6+.8*Math.max(0,ee-.3):1);y[16+r*4]=b,y[17+r*4]=v,y[18+r*4]=f,y[19+r*4]=(n.p%ue+ue)%ue}y[32]=oe,y[34]=Pe%k,y[35]=1,y[36]=Math.max(0,ee-.35)*1.2,y[37]=Pe%44e3,y[38]=Math.floor(oe*30)*37%256,y[39]=Math.max(t*.9,a*(u===2?.9:.6))}const je=[];function $a(){let t=0,a=0;const r=me[23]+y[12],n=Pe%k,c=(l,i,g,T,A,te,R,se,I,pe,ve,ft)=>{if(t>=aa)return;const $=t*12;he[$]=l,he[$+1]=i,he[$+2]=g,he[$+3]=T,he[$+4]=A,he[$+5]=te,he[$+6]=R,he[$+7]=se,he[$+8]=I,he[$+9]=pe,he[$+10]=ve,he[$+11]=ft,t++},b=Math.hypot(ge[1],Ee[1]),v=ge[1]/b,f=Ee[1]/b,x=(l,i,g,T,A,te,R,se)=>{if(a>=Tt){let I=0;for(let ve=1;ve<Tt;ve++)je[ve].w<je[I].w&&(I=ve);const pe=T/(l*l+g*g);if(pe<=je[I].w)return;je[I]={x:l,y:i,z:g,I:T,r:A,g:te,b:R,s2:se,w:pe};return}je[a++]={x:l,y:i,z:g,I:T,r:A,g:te,b:R,s2:se,w:T/(l*l+g*g+1)}},_=l=>Math.exp(-Math.sqrt(l)*r),q=1+2.5*Math.min(1,r*600)+1.5*y[13],D=(l,i,g,T,A,te,R)=>{const se=l*l+(i-Ce)*(i-Ce)+g*g;if(te&&x(l,i,g,A*_(se),T[0],T[1],T[2],0),!ct(l,i,g)||Math.abs(Q[0])>1.2||Math.abs(Q[1])>1.2)return;const I=A/se*_(se)*.9;if(I<.004)return;const pe=B((9+45*Math.sqrt(I))*q*(R||1),4,180)*2/m*(m/1e3)**.5;c(Q[0],Q[1],pe,0,T[0],T[1],T[2],Math.min(2.1*Math.sqrt(I),3)/q**.7,v,f,0,1)};for(let l=0;l<Pa;l++){const i=Lt[l],g=V[i.L][0],T=((i.s+n-60)%k+k)%k+60;let A=i.I*B((60+k-T)/420,0,1);i.kind===1?A*=(oe+i.ph)%3<1?1:0:i.kind===3&&(A*=.75+.25*Math.sin(oe*2.3+i.ph*3.7)),!(A<=0)&&D(g,i.y,T,i.col,A,!0)}if(Ne){const l=V[2][0],i=((Ne.s+n-60)%k+k)%k+60,g=(oe-7.5)*ue/16+Ne.a0,T=Math.sin(g),A=Math.cos(g),te=-l,R=-i,se=Math.hypot(te,R),I=Math.pow(Math.max(0,(T*te+A*R)/se),90),pe=B((60+k-i)/150,0,1);D(l,Ne.y,i,[1,.92,.75],4e5*(.3+6*I)*pe,!0,1+I),D(l,Ne.y,i,[1,.92,.75],6e6*(.5+6*I)*pe,!1,.6+I);const ve=Math.min(1.2,Math.max(0,r*600-.25)*1.6+y[13]*.8)*B(_(l*l+i*i)*5,0,1)*pe;if(ve>.02&&ct(l,Ne.y,i)){const ft=Q[0],$=Q[1],Le=B(.45/r,120,420);if(ct(l+T*Le,Ne.y,i+A*Le)){const Et=Q[0]-ft,Ke=Q[1]-$,St=Math.hypot(Et,Ke);St>.004&&c(ft,$,.008+.08*St,2,1,.92,.78,.5*ve,Et/St,Ke/St,St,1)}}}if(ie&&ie.t>0){const l=(L===3?we<0?-1:1:Co<0?1:-1)*260,i=60+ie.t*(Ue+6),g=1,T=ie.flash&&oe-ie.flash<2?1:0;for(let A=0;A<14;A++){const te=i-22+A*3.2,R=7+A%2*2.6;D(l,R,te,[1,.82,.55],9e3*g,A%3===0,.6)}D(l,17,i+4,[1,1,1],4e4*g,!0),D(l,5,i+28,[1,.95,.9],3e4*g,!0),T&&D(l,16,i+4,[1,.95,.9],15e4,!1)}let O=0;const W=(l,i,g,T,A,te,R,se)=>{if(O>=Tt)return;const I=(10+2*O)*4;y[I]=l,y[I+1]=i,y[I+2]=g,y[I+3]=T,y[I+4]=A,y[I+5]=te,y[I+6]=R,y[I+7]=se,O++};me[75]>0&&W(me[72],me[73],me[74],-(u===3?1.6:1.1),rt[0],rt[1],rt[2],.022*.022*.8),W(_t,Kt,Qt,p.flp*.02,p.fl[0],p.fl[1],p.fl[2],.05);for(let l=0;l<a;l++)je[l].s2=.0012;const Z=je.slice(0,a).sort((l,i)=>i.w-l.w);for(const l of Z)W(l.x,l.y,l.z,l.I,l.r,l.g,l.b,l.s2);return y[33]=O,t}function Ja(){let t=0;const a=Math.hypot(ge[1],Ee[1]),r=ge[1]/a,n=Ee[1]/a,c=(f,x,_,q,D,O,W,Z,l,i,g,T,A,te)=>{if(t>=na)return;const R=t*16;J[R]=f,J[R+1]=x,J[R+2]=_,J[R+3]=q,J[R+4]=D,J[R+5]=O,J[R+6]=W,J[R+7]=0,J[R+8]=l,J[R+9]=i,J[R+10]=g,J[R+11]=T,J[R+12]=A,J[R+13]=te,J[R+14]=Z,J[R+15]=0,t++},b=me[23]+y[12],v=Math.floor(Gt.length*B(y[13],0,1));for(let f=0;f<v;f++){const x=Gt[f],_=x.u*To*x.z,q=x.v*To*x.z,D=_*ae[0]+q*ae[3]+x.z*ae[6],O=Ce+q*ae[4]+x.z*ae[7],W=_*ae[2]+q*ae[5]+x.z*ae[8];if(!ct(D,O,W))continue;const Z=Q[0],l=Q[1],i=Q[2];if(Math.abs(Z)>1.1||Math.abs(l)>1.1)continue;const g=.011*x.s/(i*He),T=Math.max(g,1.4/m);let A=0,te=1,R=1;if(ct(D+(x.vx||0)*.012,O-(1.3+.5*x.s)*.012,W+(x.vz||0)*.012)){const Le=Q[0]-Z,Et=Q[1]-l,Ke=Math.hypot(Le,Et);Ke>1e-4&&(A=Le/Ke,te=Et/Ke,R=1+Math.min(Ke*.5/T,.4))}const se=da(D,O,W)*1.5,I=ja(D,O,W)*.5,pe=Math.min(1,(se+I+.02)*2.2),ve=se/(se+I+1e-6),ft=B(g/T,.1,1)*.9*(.3+.7*pe)*Math.exp(-i*b*.5)*B((i-.5)/.7,0,1)*B((wt-x.z)/3,0,1)*B((x.z-lt)/.3,0,1)*Math.min(1,.0075/g),$=Le=>.2+.03*Le+pe*1.05*(p.dl[Le]*ve+p.fl[Le]*(1-ve));c(Z,l,T,6,0,R,ft,W>Ae?1:0,$(0),$(1),$(2),R,A,te)}for(const f of it){if(!ct(f.x,f.y,f.z))continue;const x=da(f.x,f.y,f.z)*2+.05,_=Math.max(.02/(Q[2]*He),.005),q=Math.min(1.1,.35+x*2);c(Q[0],Q[1],_,7,0,0,B(f.life*1.5,0,1)*.75,f.z>Ae?1:0,q*(.72+.28*p.dl[0]),q*(.72+.28*p.dl[1]),q*(.72+.28*p.dl[2]),2.5,r,n)}return t}function va(){Za();const t=$a();e.bindBuffer(e.UNIFORM_BUFFER,mo),e.bufferData(e.UNIFORM_BUFFER,y,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null),ea(),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,m,m),e.bindVertexArray(K.vaoF),fe(0,K.noise),fe(1,Bt.t),fe(2,K.grad),fe(3,po.t),fe(4,It),fe(5,Ut,e.TEXTURE_2D_ARRAY),e.useProgram(K.CO[Vt].p),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),t&&(e.bindVertexArray(ra),e.bindBuffer(e.ARRAY_BUFFER,sa),e.bufferData(e.ARRAY_BUFFER,he,e.DYNAMIC_DRAW),e.blendFunc(e.ONE,e.ONE),e.useProgram(K.LIGHT.p),e.uniform1f(K.LIGHT.px,m/2),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,t));const a=Ja();a&&(e.bindVertexArray(la),e.bindBuffer(e.ARRAY_BUFFER,ia),e.bufferData(e.ARRAY_BUFFER,J,e.DYNAMIC_DRAW),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(K.THING.p),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,a)),e.disable(e.BLEND),e.bindVertexArray(null)}for(let t=0;t<256;t++){const a=t*4,r=(255-t)*ht;ke[a]=B(128+Math.sin(r*.011+1)*10+Math.sin(r*.033)*4,0,255),ke[a+1]=B(200+Y(-30,30)-xt*50,0,255),ke[a+2]=B(xt*200,0,255),ke[a+3]=255}nt=255,e.bindTexture(e.TEXTURE_2D,It),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,ke);for(let t=0;t<60;t++)ua(1/30);return va(),Qa}Lo.add({num:84,name:"Northern Ferry",fam:"Worlds",recipe:"The stern of a small ferry crossing northern water, with a real V-shaped wake. The water (a fjord, a strait, a lake or open sea) and the sky (the Milky Way, moonrise, snow or fog) change every mint. Drag across the sea to raise the swell and roll the ferry, tap to blow the horn and hear it echo, or hold to bring in snow or thick fog.",interactive:"Drag across the sea to raise the swell and roll the ferry, tap to blow the horn and hear it echo off the shores, hold to bring snow or thick fog until it clears.",music:!0,gl:!0,fps:30,seed:0,make:qa})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
