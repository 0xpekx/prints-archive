// Cloud Balloon: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/524.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(qe){qe&&function(){"use strict";const st={yaw:0,pitch:0,x:0,y:0,z:0},ue=(t,e,h)=>t<e?e:t>h?h:t,Ye=(t,e)=>{let h=1,s=0;for(t+=1;t>0;t=Math.floor(t/e))h/=e,s+=h*(t%e);return s},Q=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,Ge=`
uniform vec4 uP[25];
#define EYE uP[0].xyz
#define TANH uP[0].w
#define SUN uP[4].xyz
#define TIME uP[11].w
#define Y0 uP[6].x
#define YR uP[6].y
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 skyCol(vec3 d) {
  float e = max(d.y, 0.);
  vec2 dh = normalize(d.xz + vec2(1e-5, 0.)), lh = normalize(SUN.xz + vec2(1e-5, 0.));
  float ca = dot(dh, lh) * .5 + .5;
  vec3 hor = mix(uP[12].rgb, uP[11].rgb, pow(clamp(ca, 0., 1.), 1.7));
  vec3 c = mix(hor, uP[10].rgb, smoothstep(0., .6, pow(e, .65 + .3 * uP[12].w)));
  float cs = max(dot(d, SUN), 0.);
  c += uP[7].rgb * (pow(cs, 10.) * .42 + pow(cs, 3.) * .1) * exp(-e * 2.2) * (1. + uP[12].w);
  c *= 1. - .1 * exp(-e / .02) * (1. - ca) * (1. - .7 * uP[24].w);
  return c;
}
`,nt=Q+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",it=Q+`
uniform vec4 uB[4];
uniform sampler2D uN2;
uniform sampler2D uNC;
out vec4 oC;
vec4 N(vec2 u) { return texture(uN2, u); }
void main() {
  vec2 uv = gl_FragCoord.xy / uB[2].x, o = uB[1].xy;
  vec4 a = N(uv + o);
  // the deck (0 rolls, 1 cells, 2 towers) and the wind (1 fast jet) shape the map itself, so they cost the march nothing
  float dk = uB[0].x, fast = uB[3].w;
  float isR = 1. - step(.5, dk), isC = step(.5, dk) - step(1.5, dk), isT = step(1.5, dk);
  // a slow warp (periodic on the tile) and integer skew matrices: the 256 px noise is read at several scales, and
  // without these its copies line up into a visible grid of same-sized lumps
  vec2 u = uv + (N(uv + o * .61 + .5).rg - .5) * .1;
  vec4 b = N(mat2(2., 1., 0., 4.) * u + o * 1.3);
  float bil = N(mat2(2., 1., 0., 4.) * u + o).a, bil2 = N(mat2(5., 2., -1., 5.) * u + o * .7).a, bil3 = N(mat2(12., -3., 4., 11.) * u + o * .3).a;
  // a fast jet draws the small relief out downwind (along x) into long fibres
  if (fast > .5) { bil2 = N(mat2(2., 1., 0., 9.) * u + o * .7).a; bil3 = N(mat2(4., -1., 0., 21.) * u + o * .3).a; }
  float act = .5 + .9 * smoothstep(.2, .8, a.r);   // some country heaped, some low and smooth
  // rolls along x (the zonal wind), wandering, spacing breathing, with phase slips that make Y-shaped junctions;
  // each street strong in some stretches and broken in others
  float v = u.y * uB[1].z + ((a.r - .5) * 2. + (b.g - .5) * .35 + (N(uv * vec2(1., 3.) + o * .4).r - .5) * 1.8);
  v += .5 * smoothstep(.42, .58, N(mat2(3., 1., 0., 2.) * u + o * .9).g);
  float f = .5 + .5 * cos(6.2831853 * v);
  float roll = pow(f, .4);
  float rk = .35 + .85 * smoothstep(.3, .7, N(uv * vec2(1., 2.) + o * .83).g);
  float hR = (roll - .72) * .55 * rk + ((bil - .5) * .13 + (bil2 - .5) * .1) * act + (bil3 - .5) * .07;
  // in a fast jet the crests curl over in a row of breaking billows, steep on the lee side
  float bw = fract(u.x * uB[1].z * 1.3 + v * .3 + (b.g - .5) * .8);
  hR += isR * fast * .16 * (pow(bw, 2.2) - .35) * smoothstep(.4, .9, f);
  // closed convective cells with narrow gaps, of two sizes in patches
  float e1 = mix(N(mat2(2., 1., -1., 2.) * u + o * .31).b, N(mat2(3., 1., -1., 3.) * u + o * .47).b, smoothstep(.35, .65, a.g));
  float e2 = N(mat2(6., 1., -2., 5.) * u + o * .57).b;
  float dome = sqrt(smoothstep(0., .42, e1));
  float hC = ((dome - .72) * .3 + (smoothstep(0., .45, e2) - .6) * .1 + (bil2 - .5) * .1) * act + (bil3 - .5) * .07;
  // Cells: a quilt of flat pads 4 to 6 km across parted by thin dark cracks, two sizes in patches, each pad its own
  // height; the small domes ride low on the pads
  vec2 pc = mix(texture(uNC, mat2(2., 1., -1., 2.) * u + o * .19).rg, texture(uNC, mat2(3., 1., -1., 3.) * u + o * .43).rg, smoothstep(.4, .6, a.b));
  float pad = smoothstep(.0, .14, pc.r);
  hC = mix(hC, (pad - .85) * .8 + (pc.g - .5) * .16 + hC * .3, isC);
  float crack = isC * (1. - pad);
  float h = mix(hR, hC, uB[0].y);
  // Towers: a nearly flat, smooth floor
  h = mix(h, h * .3 + (bil3 - .5) * .02, isT);
  // turrets: a few broad rounded ones, in loose groups; on a Towers deck a few stand about a kilometre out of the floor
  float tm = smoothstep(.66 - .02 * isT, .78 - .02 * isT, N(uv * 3. + o * .2).g + (b.r - .5) * .3) * uB[0].z;
  float td = smoothstep(0., .8, N(mat2(2., 1., -1., 1.) * u + o * .5).b); td = sqrt(td * (2. - td));
  td *= smoothstep(.45, .65, N(mat2(2., 1., -1., 1.) * u + o * .5 + .37).r);   // only some cells grow a turret
  h += tm * (.08 + (.13 + .42 * uB[0].z + .45 * isT) * td) * (.8 + .4 * bil2);
  // rifts down to the lower cloud, elongated with the wind
  float rn = textureLod(uN2, u * vec2(1., 2.) + o * 1.1, 4.5).r;
  float rf = uB[0].w;
  float seg = smoothstep(.4, .6, textureLod(uN2, u * vec2(2., 3.) + o * 2.3, 2.).g + .14 * rf);
  float ra = .003 + .008 * rf;
  float cm = rf > 0. ? (1. - smoothstep(ra, ra + .055 + .03 * rf, abs(rn - .5) + (bil2 - .5) * .025 + (bil3 - .5) * .012)) * seg : 0.;
  h = mix(h, -.7 - 1.3 * rf + (bil - .5) * .5 + (bil3 - .5) * .2, cm);
  // the tone channel: the small-scale shade, less (to below zero) in the cells' cracks
  float tone = bil - 1.1 * crack * (1. - cm);
  oC = vec4(clamp((h - uB[2].y) / uB[2].z, 0., 1.), cm, tone, tm);
}
`,lt=Q+`
uniform vec4 uB[4];
uniform sampler2D uH;
out vec4 oC;
void main() {
  vec2 uv = gl_FragCoord.xy / uB[2].x;
  vec4 h0 = texture(uH, uv);
  float Y0 = uB[2].y, YR = uB[2].z, H = Y0 + YR * h0.r, S = H;
  float ds = uB[3].x;
  int NSH = int(uB[3].z);   // 48, from a uniform so the loop stays rolled
  for (int i = 1; i <= NSH; i++) {
    float fi = float(i), s = (fi * .6 + fi * fi) * ds;
    float lod = clamp(log2(max((1.2 + 2. * fi) * ds * uB[2].x * length(uB[1].zw), 1.)), 0., 5.);
    float h = Y0 + YR * textureLod(uH, uv + uB[1].zw * s, lod).r;
    S = max(S, h - uB[3].y * s);
  }
  oC = vec4(h0.r, clamp((S - Y0) / YR, 0., 1.), h0.g, h0.b);
}
`,ct=Q+`
uniform sampler2D uH;
out vec4 oC;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy) * 2;
  oC = .25 * (texelFetch(uH, p, 0) + texelFetch(uH, p + ivec2(1, 0), 0) + texelFetch(uH, p + ivec2(0, 1), 0) + texelFetch(uH, p + ivec2(1, 1), 0));
}
`,ft=Q+Ge+`
uniform sampler2D uD;
uniform sampler3D uN3;
out vec4 oC;
float hg(float c, float g) { float g2 = g * g; return (1. - g2) / pow(1. + g2 - 2. * g * c, 1.5); }
vec3 j0(vec3 x) {
  vec3 x2 = x * x, x4 = x2 * x2;
  vec3 p = 1. - x2 * .25 + x4 / 64. - x4 * x2 / 2304. + x4 * x4 / 147456.;
  vec3 a = sqrt(.63662 / max(x, vec3(.5))) * cos(x - .7853982);
  return mix(p, a, step(vec3(2.5), x));
}
// a rising head of the deck's own cloud (tap): x, z in deck coords, age, amp; it leans downwind as it climbs
#define HEAD_(k) { vec4 C = uP[k]; if (C.w > 0.) { float w = .27 + .025 * min(C.z, 12.); vec2 dq = q - C.xy + vec2(.32 * max(yc + .2, 0.), 0.); h += C.w * .52 * exp(-dot(dq, dq) / (w * w)); } }
float head(vec2 q, float yc) { float h = 0.; HEAD_(14) HEAD_(15) HEAD_(16) HEAD_(17) return h; }
void main() {
  float CR = uP[1].w;
  // a new spot inside the small pixel every frame pair (both halves alike): the history then holds a true average
  // over each pixel, so a cloud edge comes up as a ramp and not as a hard step magnified 2.4 times
  vec2 sp = vec2(gl_FragCoord.x + uP[23].x, gl_FragCoord.y * 2. - .5 + uP[2].w + uP[23].y) / CR;
  vec2 s = sp * 2. - 1.;
  vec3 rd = normalize(uP[1].xyz + (s.x * uP[2].xyz + s.y * uP[3].xyz) * TANH);
  vec3 ro = EYE;
  // phase: forward Mie lobe, back lobe, multiple scattering; glory and fogbow around the antisolar point
  float cth = dot(rd, SUN);
  float th = sqrt(max(2. + 2. * cth, 0.));
  // glory: soft pastel rings about ten degrees across; fogbow: a broad pale band, all but colourless
  vec3 gx = th * vec3(36., 40., 46.), gj = j0(gx);
  vec3 glory = gj * gj * (1. + .3 * gx) * exp(-th * th * 55.) * .8;
  vec3 bw = (th - vec3(.585, .575, .565)) / .15;
  vec3 bow = exp(-bw * bw) * .09;
  vec3 sunL = uP[7].rgb * uP[4].w * (vec3(.42 * hg(cth, .72) + .2 * hg(cth, -.25) + .12) + (glory + bow) * uP[7].w);
  vec3 skyH = skyCol(vec3(rd.x, max(rd.y, 0.), rd.z));
  float YT = Y0 + YR;
  float t = 0.;
  bool esc = false;
  if (ro.y > YT) { if (rd.y < -1e-4) t = (ro.y - YT) / -rd.y; else esc = true; }
  float jit = fract(hash12(gl_FragCoord.xy) + uP[3].w);
  t += jit * (.025 + t * .012);
  float T = 1., tHit = 1e4;
  vec3 acc = vec3(0.);
  int NS = int(uP[6].z);
  vec2 OPD = vec2(sin(uP[5].z), cos(uP[5].z));   // the opening's horizontal direction (world x, z)
  float pix = 2. * TANH / CR, texel = uP[5].w / 1024., prevBig = 0., fineEnd = -1., wall = 0.;
  for (int i = 0; i < NS; i++) {
    if (T < .02 || esc) break;
    vec3 p = ro + rd * t;
    vec2 dx = p.xz - ro.xz;
    float yc = p.y + dot(dx, dx) * 8.2617e-5;
    float vrel = rd.y + t * 1.6523e-4;
    if ((yc > YT && vrel > 0.) || t > 150.) { esc = true; }
    else {
      vec2 q = p.xz + uP[5].xy - uP[24].yz * (yc + .25), qc = q;
      // far deck: a slow domain warp (rolls meander, spacing breathes) so the 48 km bake doesn't repeat as a grid toward
      // the horizon; zero within 18 km and within ~40 degrees of the opening direction (the composed opening is unchanged)
      float wr = dot(p.xz, p.xz);
      if (wr > 324.) {
        float rr = sqrt(wr), wg = smoothstep(18., 50., rr) * smoothstep(.76, .3, dot(p.xz, OPD) / rr);
        if (wg > 0.) q += wg * (9. * vec2(sin(q.y * .019 + 2. * sin(q.x * .0071 + 1.3)), sin(q.x * .023 + 2. * sin(q.y * .0083 + .4)))
                              + 3.5 * vec2(sin(q.y * .047 + q.x * .011 + 2.1), sin(q.x * .053 - q.y * .013 + .7)));
      }
      // far off the relief melts into the haze: the deck map read ever smoother, a smooth pale band at the horizon
      // the level from the long side of the pixel's footprint (its width over the slant, less one level), so the rows
      // of a grazing far deck agree: long soft level bands, no dashes
      float ff = smoothstep(30., 120., t);
      float fw = t * pix * max(1. + .3 / (abs(vrel) + .08), .5 / max(abs(vrel), .004));
      float lod = log2(max(fw / texel, 1.)) + ff * 2.;
      // on a rift wall the map is read smoother: no vertical grooves from the height field seen side-on (the wall
      // flag carried from the step before, so one read a step)
      vec4 D = textureLod(uD, q / uP[5].w, lod + wall);
      wall = D.b * (1. - D.b) > .04 ? 2.2 : 0.;
      float cr = uP[14].w + uP[15].w + uP[16].w + uP[17].w > 0. ? head(qc, yc) : 0.;
      float H = Y0 + YR * D.r + cr;
      // down a rift: the next layer, its own finer relief sliding slowly the other way (parallax), its holes deepest
      if (D.b > .5 && yc - H < .3) { float lw = textureLod(uD, (p.xz + uP[18].xy) * (2.7 / uP[5].w) + vec2(.37, .61), lod + 1.).r; H += smoothstep(.6, .95, D.b) * min(lw - .64, .06) * 2.; }
      float dy = yc - H;
      float ms = (.022 + t * .011) * (1. + 1.5 * ff);   // the smoothed far deck takes longer strides
      float dt = ms;
      // the band searched finely over the map: as deep as the erosion noise can raise cloud over it (deeper on rift
      // walls and tapped heads), or the strides clip the tops into flat slabs that the jittered start dots. Only high
      // above the deck: a low mint keeps the old .16, or its rays run out of fine steps over the rift walls and end as haze
      float kb = 1. + 5. * D.b * (1. - D.b) + 3. * cr, band = mix(mix(.06 + .4 * kb, .16, smoothstep(.55, .9, D.b)), .16, uP[24].w);   // a rift floor stays low and open
      if (dy > band && t > fineEnd) { dt = clamp((dy - band + .04) * .7 / max(-vrel, .06), ms, .12 + t * mix(.05, .075, uP[24].w)); prevBig = dt; }
      else if (dy <= band && prevBig > ms * 1.3) { fineEnd = t; dt = -prevBig * .9 + jit * ms; prevBig = 0.; }   // the fine march at a random phase: no level slices
      else if (dy > band) { prevBig = 0.; }
      else {
        prevBig = 0.;
        float f1 = 1. - smoothstep(4., 14., t);
        vec2 qf = q * vec2(uP[23].z, 1.);   // a fast jet draws the tops out downwind into fibres
        vec3 q3 = vec3(qf.x * .8 + qf.y * .6, yc * 1.35 - TIME * .0035, qf.y * .8 - qf.x * .6) * .74;
        float l3 = log2(max(fw * 12., 1.));   // the erosion noise filtered to the footprint too (42 m texels)
        float n = textureLod(uN3, q3 * .5, l3).r;
        float n2 = f1 > 0. ? textureLod(uN3, q3 * 1.9 + .37, 0.).r : .5;
        float f0 = 1. - smoothstep(1.2, 4.5, t);
        if (f0 > 0.) n2 += (textureLod(uN3, q3 * 5.3 + .71, 0.).r - .5) * .45 * f0;
        float ka = kb * mix(uP[23].w, 1., max(smoothstep(.15, .7, H), min(D.b * 4., 1.)));   // a Towers floor is smooth (not its rift walls)
        float den = clamp(-(dy + ((n - .5) * .75 + (n2 - .5) * .3 * f1) * ka * (1. - ff)) * 5.5 + .3, 0., 1.);
        if (den > .003) {
          float sh = max(Y0 + YR * D.g - yc, 0.);
          float ts = exp(-sh * 5.) * .88 + .12 * exp(-sh * .8);
          // local self-shadow: one sample toward the sun
          vec2 qs = q + SUN.xz * .2;
          float Hs = Y0 + YR * textureLod(uD, qs / uP[5].w, lod).r;
          float ns = textureLod(uN3, (q3 + vec3(SUN.x * .8 + SUN.z * .6, SUN.y * 1.35, SUN.z * .8 - SUN.x * .6) * .148) * .5, l3).r;
          float ds = clamp(-(yc + SUN.y * .2 - Hs + (ns - .5) * .75) * 5.5 + .3, 0., 1.);
          ts *= (.06 + .94 * exp(-ds * 2.6)) * (1. + .4 * min(D.a, 0.));   // the cells' cracks lie in shade
          float dTop = max(H - yc, 0.);
          vec3 L = sunL * ts + uP[8].rgb * (exp(-dTop * 1.5) * .75 + .25) * (.88 + .24 * D.a) * (1. - .75 * D.b)
                 + uP[9].rgb * exp(-max(yc + .3, 0.) * 1.6) * (.03 + .1 * (1. - uP[4].w) + D.b * (.35 + 2.4 * smoothstep(.05, .5, dTop)));   // the glow from below: deep in the lower deck's holes, not on its tops
          if (uP[22].w > 0.) { vec3 fd = p - uP[22].xyz; L += vec3(.75, .8, 1.) * uP[22].w * exp(-dot(fd, fd) * 2.2); }
          vec3 Lc = mix(L, skyH, mix(1. - exp(-t / uP[8].w), 1., ff * ff));
          float a = 1. - exp(-den * 12. * dt);
          acc += T * a * Lc;
          T *= 1. - a;
          if (T < .5 && tHit > 1e3) tHit = t;
        }
      }
      t += dt;
    }
  }
  if (!esc && T > .02) { acc += T * skyH * mix(.9, 1., uP[24].w); T = 0.; }
  oC = vec4(acc * uP[24].x, T);
}
`,ut=Q+`
uniform vec4 uP[25];
uniform sampler2D uS;
out vec4 oC;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  if ((p.y & 1) != int(uP[2].w) && uP[9].w < .5) discard;
  float yy = (float(p.y) - uP[2].w) * .5;
  vec4 r = texture(uS, vec2((float(p.x) + .5) / uP[1].w, (yy + .5) / (uP[1].w * .5)));
  oC = r.r >= 0. && r.g >= 0. && r.b >= 0. && r.a >= 0. ? r : vec4(0., 0., 0., 1.);
}
`,ht=Q+Ge+`
uniform sampler2D uC;
uniform sampler2D uN2;
out vec4 oC;
void main() {
  float S = uP[6].w;
  vec2 uv = gl_FragCoord.xy / S, s = uv * 2. - 1.;
  vec3 rd = normalize(uP[1].xyz + (s.x * uP[2].xyz + s.y * uP[3].xyz) * TANH);
  // the volume (CR px) brought up to full size with a Catmull-Rom filter: firmer edges than bilinear
  float cr = uP[1].w;
  vec2 sp = uv * cr, tp = floor(sp - .5) + .5, f = sp - tp;
  vec2 w0 = f * (-.5 + f * (1. - .5 * f)), w1 = 1. + f * f * (-2.5 + 1.5 * f), w2 = f * (.5 + f * (2. - 1.5 * f)), w3 = f * f * (-.5 + .5 * f);
  vec2 w12 = w1 + w2, t12 = (tp + w2 / w12) / cr, t0 = (tp - 1.) / cr, t3 = (tp + 2.) / cr;
  vec4 V;
  if (S <= cr) V = texture(uC, uv);   // at 256 px the volume is the tile's own size: one read
  else V = (texture(uC, vec2(t12.x, t0.y)) * (w12.x * w0.y) + texture(uC, vec2(t0.x, t12.y)) * (w0.x * w12.y) + texture(uC, t12) * (w12.x * w12.y)
          + texture(uC, vec2(t3.x, t12.y)) * (w3.x * w12.y) + texture(uC, vec2(t12.x, t3.y)) * (w12.x * w3.y))
          / (w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y);
  V = max(V, 0.);
  vec3 col = V.rgb / uP[24].x;
  float T = clamp(V.a, 0., 1.);
  if (T > .002) {
    vec3 sky = skyCol(rd);
    float e = max(rd.y, 0.);
    // high haze veils, streaked along the wind
    // the upper cloud layer seen from below: soft bands and streaks along the zonal wind, lit through from above
    vec2 hp = (EYE.xz + rd.xz / max(rd.y, .03) * 9.) / 32. + vec2(TIME * .0006, 0.);
    float vl = texture(uN2, hp * vec2(1., 3.5)).g * .55 + texture(uN2, hp * vec2(3., 9.) + .3).a * .3 + texture(uN2, hp * vec2(.4, 1.6) + .7).r * .15;
    float vw = smoothstep(.015, .2, e);
    float band = smoothstep(.35, .75, vl);
    float lit = .6 + .4 * pow(max(dot(rd, SUN), 0.), 3.);
    sky *= mix(1., mix(.84, 1.22 * lit, band), .6 * vw * (1. - .4 * uP[12].w));
    // stratified haze just above the horizon
    float st = texture(uN2, vec2(rd.x * .7 + rd.z * .3, e * 6.) * vec2(.5, 1.)).r;
    sky *= 1. + (st - .5) * .1 * exp(-e / .05);
    // the sun: a small white disc through haze, with its aureole
    float cs = dot(rd, SUN), dd = sqrt(max(2. - 2. * cs, 0.));
    float sr = .0064;
    float disc = 1. - smoothstep(sr * .8, sr * 1.15, dd);
    float hz = exp(-max(SUN.y, 0.) / .03) * .7 + .3 * uP[12].w;
    sky += uP[7].rgb * uP[4].w * (disc * mix(26., 6., hz) * (1. - .35 * dd / sr) + exp(-dd / .012) * 1.3 + exp(-dd / .06) * .5 * (1. + uP[12].w) + exp(-dd / .22) * .18);
    // Earth and the Moon
    if (uP[13].w > 0.) {
      float pa = 2. * TANH / S;
      float de = sqrt(max(2. - 2. * dot(rd, uP[13].xyz), 0.)) / pa;
      vec3 md = normalize(uP[13].xyz + vec3(.0035, .0012, 0.));
      float dm = sqrt(max(2. - 2. * dot(rd, md), 0.)) / pa;
      sky += uP[13].w * (vec3(.75, .88, 1.3) * (exp(-de * de / 1.1) * 3.5 + exp(-de / 3.) * .12) + vec3(.6) * exp(-dm * dm / .8) * .35);
    }
    col += sky * T;
  }
  col *= uP[10].w;
  col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  col += (hash12(gl_FragCoord.xy) - .5) * (2. / 255.);
  oC = vec4(col, 1.);
}
`;function dt(t,e,h){const s=new Float32Array(h*h);for(let m=0;m<s.length;m++)s[m]=t();const _=new Float32Array(e*e),l=e/h;for(let m=0;m<e;m++){const i=m/l,M=Math.floor(i),P=i-M,F=P*P*(3-2*P),y=M%h,v=(M+1)%h;for(let b=0;b<e;b++){const c=b/l,u=Math.floor(c),x=c-u,d=x*x*(3-2*x),U=u%h,N=(u+1)%h,D=s[y*h+U]+(s[y*h+N]-s[y*h+U])*d,k=s[v*h+U]+(s[v*h+N]-s[v*h+U])*d;_[m*e+b]=D+(k-D)*F}}return _}function mt(t){const h=new Uint8Array(262144),s=F=>{const y=new Float32Array(65536);for(const[c,u]of F){const x=dt(t,256,c);for(let d=0;d<y.length;d++)y[d]+=x[d]*u}let v=1e9,b=-1e9;for(const c of y)c<v&&(v=c),c>b&&(b=c);for(let c=0;c<y.length;c++)y[c]=(y[c]-v)/(b-v);return y},_=s([[4,.45],[8,.28],[16,.17],[32,.1]]),l=s([[8,.5],[16,.3],[32,.2]]),m=s([[16,.3],[32,.3],[64,.25],[128,.15]]),i=16,M=256/i,P=new Float32Array(i*i*2);for(let F=0;F<i*i;F++)P[F*2]=.1+.8*t(),P[F*2+1]=.1+.8*t();for(let F=0;F<256;F++)for(let y=0;y<256;y++){const v=y/M,b=F/M,c=Math.floor(v),u=Math.floor(b);let x=9,d=9;for(let D=-1;D<=1;D++)for(let k=-1;k<=1;k++){const I=c+k,z=u+D,q=(z%i+i)%i*i+(I%i+i)%i,Z=I+P[q*2]-v,S=z+P[q*2+1]-b,Y=Math.sqrt(Z*Z+S*S);Y<x?(d=x,x=Y):Y<d&&(d=Y)}const U=(F*256+y)*4,N=F*256+y;h[U]=_[N]*255,h[U+1]=l[N]*255,h[U+2]=Math.min(1,(d-x)*1.4)*255,h[U+3]=m[N]*255}return h}function pt(t){const _=new Uint8Array(262144),l=new Float32Array(4*4*3);for(let m=0;m<4*4;m++)l[m*3]=.15+.7*t(),l[m*3+1]=.15+.7*t(),l[m*3+2]=t();for(let m=0;m<256;m++)for(let i=0;i<256;i++){const M=(i+.5)/64,P=(m+.5)/64,F=Math.floor(M),y=Math.floor(P);let v=9,b=9,c=0;for(let x=-1;x<=1;x++)for(let d=-1;d<=1;d++){const U=F+d,N=y+x,D=(N%4+4)%4*4+(U%4+4)%4,k=U+l[D*3]-M,I=N+l[D*3+1]-P,z=Math.sqrt(k*k+I*I);z<v?(b=v,v=z,c=l[D*3+2]):z<b&&(b=z)}const u=(m*256+i)*4;_[u]=Math.min(1,(b-v)*2.5)*255,_[u+1]=c*255,_[u+3]=255}return _}function xt(t){const h=new Float32Array(262144);for(const[i,M]of[[4,.44],[8,.3],[16,.17],[32,.09]]){const P=new Float32Array(i*i*i);for(let u=0;u<P.length;u++)P[u]=t();const F=64/i,y=new Int32Array(64),v=new Int32Array(64),b=new Float32Array(64);for(let u=0;u<64;u++){const x=u/F,d=Math.floor(x),U=x-d;y[u]=d%i,v[u]=(d+1)%i,b[u]=U*U*(3-2*U)}const c=new Float32Array(i*i*64);for(let u=0;u<i;u++)for(let x=0;x<i;x++){const d=(u*i+x)*i,U=(u*i+x)*64;for(let N=0;N<64;N++){const D=P[d+y[N]];c[U+N]=D+(P[d+v[N]]-D)*b[N]}}for(let u=0;u<64;u++){const x=y[u]*i,d=v[u]*i,U=b[u];for(let N=0;N<64;N++){const D=y[N],k=v[N],I=b[N],z=(x+D)*64,q=(x+k)*64,Z=(d+D)*64,S=(d+k)*64,Y=(u*64+N)*64;for(let L=0;L<64;L++){const $=c[z+L]+(c[q+L]-c[z+L])*I,se=c[Z+L]+(c[S+L]-c[Z+L])*I;h[Y+L]+=($+(se-$)*U)*M}}}}let s=1e9,_=-1e9;for(let i=0;i<h.length;i++){const M=h[i];M<s&&(s=M),M>_&&(_=M)}const l=new Uint8Array(h.length),m=255/(_-s);for(let i=0;i<h.length;i++)l[i]=(h[i]-s)*m;return l}function Et(t){if(t.__c524)return t.__c524;t.getExtension("KHR_parallel_shader_compile");const e=(c,u)=>{const x=t.createShader(c);return t.shaderSource(x,u),t.compileShader(x),x},h={h:it,s:lt,down:ct,vol:ft,copy:ut,comp:ht},s={},_=e(t.VERTEX_SHADER,nt);for(const c in h){const u=t.createProgram(),x=e(t.FRAGMENT_SHADER,h[c]);t.attachShader(u,_),t.attachShader(u,x),t.linkProgram(u),s[c]={p:u,f:x}}let l=99538212;const m=()=>{l=l+1831565813|0;let c=Math.imul(l^l>>>15,1|l);return c=c+Math.imul(c^c>>>7,61|c)^c,((c^c>>>14)>>>0)/4294967296},i=xt(m),M=mt(m),P=pt(m);for(const c in s){const{p:u,f:x}=s[c];if(!t.getProgramParameter(u,t.LINK_STATUS))throw new Error("524 "+c+": "+(t.getShaderInfoLog(_)||"")+(t.getShaderInfoLog(x)||"")+t.getProgramInfoLog(u));const d=U=>t.getUniformLocation(u,U);s[c]={p:u,uP:d("uP"),uB:d("uB"),uN2:d("uN2"),uN3:d("uN3"),uH:d("uH"),uD:d("uD"),uS:d("uS"),uC:d("uC"),uNC:d("uNC")}}t.pixelStorei(t.UNPACK_ALIGNMENT,1);const F=t.createTexture();t.bindTexture(t.TEXTURE_3D,F),t.texImage3D(t.TEXTURE_3D,0,t.R8,64,64,64,0,t.RED,t.UNSIGNED_BYTE,i),t.generateMipmap(t.TEXTURE_3D),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const c of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,c,t.REPEAT);const y=t.createTexture();t.bindTexture(t.TEXTURE_2D,y),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,M),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const v=t.createTexture();t.bindTexture(t.TEXTURE_2D,v),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,P),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.pixelStorei(t.UNPACK_ALIGNMENT,4);const b=!!(t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float"));return t.__c524={P:s,n3:F,n2:y,nc:v,vEmpty:t.createVertexArray(),half:b,tmp:{}}}const be=7;function pe(t,e,h,s,_,l){const m=t.createTexture();t.bindTexture(t.TEXTURE_2D,m),t.texStorage2D(t.TEXTURE_2D,l?be:1,s?t.RGBA16F:t.RGBA8,e,h),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,l?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR);const i=_?t.REPEAT:t.CLAMP_TO_EDGE;t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,i);const M=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,M),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,m,0),t.bindFramebuffer(t.FRAMEBUFFER,null),{tex:m,fb:M,w:e,h}}const wt=(t,e)=>{t.deleteTexture(e.tex),t.deleteFramebuffer(e.fb)};qe.add({num:524,name:"Cloud Balloon",fam:"Vistas",recipe:"A balloon drifting over an endless sea of yellow cloud on Venus, with long rolls streaming past in the wind, rifts glowing dull orange from the heat far below and a small white sun in a cream sky. The time of day, the kind of clouds and how high you float change every mint. Tap the cloud tops to make a bump of cloud swell up and slump back, drag to slide the clouds under the balloon, or hold to sink into the yellow fog (let go and you rise again).",interactive:"Tap the cloud tops to set a parcel of the deck rising there: it swells into a rounded head, leans with the wind and slumps back. Drag to slide the cloud deck under the balloon: it follows your finger, coasts on when you let go and falls back into the wind. Hold to let the balloon sink into the cloud tops until the world turns to yellow fog; let go and it rises again.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,h=t.size,s=Et(e);let _=0;for(let o=2;o<66;o+=8)_=Math.imul(_^parseInt(t.hash.slice(o,o+8),16),2654435761)+2135587861|0;const l=()=>{_=_+1831565813|0;let o=Math.imul(_^_>>>15,1|_);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},m=o=>{let r=l(),a=0;for(const[n,f]of o)if(a+=f,r<a)return n;return o[o.length-1][0]},i=t.home,M=i?"Sunset":m([["Sunset",.55],["Afternoon",.33],["Night lightning",.12]]),P=i?"Rolls":m([["Rolls",.45],["Cells",.35],["Towers",.2]]),F=i?"Rifts":m([["Few breaks",.45],["Rifts",.4],["Great chasm",.15]]),y=i?"Clear":m([["Clear",.6],["Thick",.4]]),v=i?"Steady":m([["Steady",.6],["Fast jet",.4]]),b=M==="Night lightning",c=M==="Afternoon",u=i?"Sunward":m(b?[["Sunward",.5],["Across the light",.5]]:[["Sunward",.4],["Across the light",.35],["Glory side",.25]]),x=!c&&!i&&l()<.14;t.trait("Time",M),t.trait("Deck",P),t.trait("Rifts",F),t.trait("Haze",y),t.trait("Wind",v),t.trait("Facing",u),t.trait("Earth",x?"Earth and Moon":"Hidden");let d=706171467;for(let o=2;o<66;o+=8)d=Math.imul(d^parseInt(t.hash.slice(o,o+8),16),2246822507)+1663821211|0;const U=()=>{d=d+1831565813|0;let o=Math.imul(d^d>>>15,1|d);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},N=i?"High above the deck":(()=>{const o=U();return o<.62?"High above the deck":o<.9?"Skimming the tops":"Among the tops"})();t.trait("Altitude",N);const D=N!=="High above the deck",k=N==="Among the tops",I=U(),z=y==="Thick"?1:0,q=b?-.14:c?.33+.12*l():.045+.04*l(),Z=(l()<.5?-1:1)*(.28+.3*l()),S=[Math.cos(Z)*Math.cos(q),Math.sin(q),Math.sin(Z)*Math.cos(q)],Y=Math.atan2(S[0],S[2]),L=l()<.5?-1:1,$={Sunward:[Y+L*(.2+.12*l()),c?q-.5:-.17],"Across the light":[Y+L*(1.25+.3*l()),-.24],"Glory side":[Y+Math.PI+L*(.05+.1*l()),c?-q+.02:-.2]}[u],se=$[0],Ve=k?$[1]*.2:D?$[1]*.45:$[1],xe=Math.tan(32.5*Math.PI/180),Tt=2.4+.6*l(),he=k?.32+.14*I:D?.62+.3*I:Tt,je=v==="Fast jet"?.024:.011,vt=v==="Fast jet"?-.3:-.16,ee=48,T=b?{sunC:[0,0,0],amb:[.03,.027,.024],glow:[.22,.068,.018],zen:[.004,.0034,.0028],hs:[.06,.03,.014],ha:[.01,.008,.006],exp:2.3}:c?{sunC:[1.62,1.3,.72],amb:[.15,.145,.14],glow:[.16,.06,.02],zen:[.62,.53,.31],hs:[1.08,.92,.6],ha:[.8,.67,.44],exp:.62}:{sunC:[1.85,1.16,.52],amb:[.09,.088,.118],glow:[.22,.08,.025],zen:[.6,.53,.36],hs:[1.25,.93,.52],ha:[.66,.53,.4],exp:.66};if(z){const o=[1.06,1,1.02];T.hs=T.hs.map((r,a)=>r*o[a]),T.ha=T.ha.map((r,a)=>(r*.6+T.hs[a]*.4)*o[a]),T.zen=T.zen.map((r,a)=>(r*.65+T.hs[a]*.35)*o[a]),T.sunC=T.sunC.map(r=>r*.8),T.amb=T.amb.map((r,a)=>r*1.25*o[a]),T.exp*=1.12}const yt=z?32:70,Re=(()=>{const o=Math.sin(se-Y)>=0?1:-1,r=se+(l()<.5?.5:1)*o*(.16+.3*l()),a=Math.max(Ve,-.2)+.3+.14*l();return[Math.sin(r)*Math.cos(a),Math.sin(a),Math.cos(r)*Math.cos(a)]})(),te={cell:P==="Cells"?1:P==="Towers"?.55:.12,tur:P==="Towers"?1:P==="Cells"?.3:.38,rift:F==="Few breaks"?.2:F==="Rifts"?.55:1,nR:16+Math.floor(l()*8),ox:l(),oz:l()},H=h<=256?512:1024,G=h<=256?256:h<=600?400:416,Ee=pe(e,H,H,s.half,!0,!0),Oe=pe(e,G,G,s.half,!1),Pe="v"+G;s.tmp[Pe]||(s.tmp[Pe]=pe(e,G,G/2,s.half,!1));const We=s.tmp[Pe],bt=s.half?1:.25,Ne=-3.4,_e=5.2,Ke=o=>{e.useProgram(s.P.down.p),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,o),e.uniform1i(s.P.down.uH,1),s.fbM||(s.fbM=e.createFramebuffer()),e.bindFramebuffer(e.FRAMEBUFFER,s.fbM);for(let r=1;r<be;r++)e.texParameteri(e.TEXTURE_2D,e.TEXTURE_BASE_LEVEL,r-1),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAX_LEVEL,r-1),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,r),e.viewport(0,0,H>>r,H>>r),e.drawArrays(e.TRIANGLES,0,3);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_BASE_LEVEL,0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAX_LEVEL,be-1),e.bindTexture(e.TEXTURE_2D,null)};(()=>{const o=new Float32Array(16),r=Math.hypot(S[0],S[2])||1,a=Math.max(Math.tan(Math.max(q,.04)),.04),n=Math.min(32,2.6/a);o.set([P==="Cells"?1:P==="Towers"?2:0,te.cell,te.tur,te.rift,te.ox,te.oz,te.nR,0,H,Ne,_e,0,n/(48*48.6),a,48,v==="Fast jet"?1:0]),o[6]=S[0]/r/ee,o[7]=S[2]/r/ee,e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.bindVertexArray(s.vEmpty);const f=pe(e,H,H,s.half,!0,!0);e.bindFramebuffer(e.FRAMEBUFFER,f.fb),e.viewport(0,0,H,H),e.useProgram(s.P.h.p);const w=o.slice();w[6]=te.nR,w[7]=0,e.uniform4fv(s.P.h.uB,w),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.n2),e.uniform1i(s.P.h.uN2,0),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,s.nc),e.uniform1i(s.P.h.uNC,2),e.drawArrays(e.TRIANGLES,0,3),Ke(f.tex),e.bindFramebuffer(e.FRAMEBUFFER,Ee.fb),e.viewport(0,0,H,H),e.useProgram(s.P.s.p),e.uniform4fv(s.P.s.uB,o),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,f.tex),e.uniform1i(s.P.s.uH,1),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),Ke(Ee.tex),wt(e,f)})();const B=new Float32Array(25*4),g={eye:[0,he,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]};let j=0,de=0,we=0,Ae=!1,Ze=he,Me=1;const Rt=(k?.5:D?.3:.2)*(v==="Fast jet"?1.3:1);let oe=l()*ee,ne=l()*ee,Te=0,Fe=0,Ue=0,V=he,O=0,W=0,ge=0,De=0,ae=[],ve=0,ye=-.35*oe,Ce=-.35*ne;const J=[];let E=null,ke=!1,ze=0,K=null,Se=b?1.2+l()*1.5:1e9,Je=2;const me=[],Qe=()=>{const o=t.view||st,r=se+(o.yaw||0),a=ue(Ve+(o.pitch||0),-1.4,1.4);let n=(o.x||0)*.001,f=(o.z||0)*.001;const w=Math.hypot(n,f);w>.2&&(n*=.2/w,f*=.2/w),g.eye=[n,V+ue(o.y||0,-50,50)*.001,f];const p=Math.cos(a);g.fw=[Math.sin(r)*p,Math.sin(a),Math.cos(r)*p],g.rt=[Math.cos(r),0,-Math.sin(r)];const R=g.fw,A=g.rt;g.up=[R[1]*A[2]-R[2]*A[1],R[2]*A[0]-R[0]*A[2],R[0]*A[1]-R[1]*A[0]]},Be=(o,r)=>{const a=o*2-1,n=1-r*2,f=[0,1,2].map(p=>g.fw[p]+(a*g.rt[p]+n*g.up[p])*xe),w=Math.hypot(f[0],f[1],f[2]);return f.map(p=>p/w)};let ie=null;const Pt=(o,r)=>{if(!ie){const He=H===1024?2:1,X=256,ot=e.createFramebuffer();if(e.bindFramebuffer(e.FRAMEBUFFER,ot),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Ee.tex,He),s.half){if(ie=new Float32Array(X*X*4),e.getError(),e.readPixels(0,0,X,X,e.RGBA,e.FLOAT,ie),e.getError()){const ce=new Uint16Array(X*X*4);e.readPixels(0,0,X,X,e.RGBA,e.HALF_FLOAT,ce);for(let fe=0;fe<ce.length;fe++){const Ie=ce[fe],at=Ie>>10&31,rt=Ie&1023;ie[fe]=(Ie>>15?-1:1)*(at?Math.pow(2,at-15)*(1+rt/1024):Math.pow(2,-14)*rt/1024)}}}else{const ce=new Uint8Array(X*X*4);e.readPixels(0,0,X,X,e.RGBA,e.UNSIGNED_BYTE,ce),ie=Float32Array.from(ce,fe=>fe/255)}e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(ot)}let a=(o+oe)/ee*256-.5,n=(r+ne)/ee*256-.5;a=(a%256+256)%256,n=(n%256+256)%256;const f=Math.floor(a),w=Math.floor(n),p=a-f,R=n-w,A=f+1&255,le=w+1&255,re=(He,X)=>ie[(X*256+He)*4],gt=(re(f,w)*(1-p)+re(A,w)*p)*(1-R)+(re(f,le)*(1-p)+re(A,le)*p)*R;return Ne+_e*gt},$e=(o,r)=>{const a=Be(o,r),n=g.eye;for(let f=.25;f<40;f+=.03+.02*f){const w=n[0]+a[0]*f,p=n[2]+a[2]*f,R=n[1]+a[1]*f+(w*w+p*p)/12104;if(R<Pt(w,p)+.05)return[w,p,f,R]}return null},Nt=()=>Math.min(Be(.5,.62)[1],-.06),Xe=(o,r,a)=>{const n=Be(o,r),f=g.eye,w=Nt();if(n[1]>w){const R=Math.hypot(n[0],n[2])||1,A=Math.sqrt(1-w*w)/R;n[0]*=A,n[2]*=A,n[1]=w}const p=Math.max(f[1]-a,.05)/-n[1];return[f[0]+n[0]*p,f[2]+n[2]*p,p]},_t=(o,r)=>{const a=$e(o,r);if(!a)return;J.length>=4&&J.shift(),J.push({x:a[0]+oe,z:a[1]+ne,age:0,amp:0,a0:.85+.3*l()});const n=a[2];t.sound.hit("noise",ue(.16/(1+n*.2),.03,.14),{cutoff:260,dur:2.2}),t.sound.note(43+Math.floor(l()*3)*2,{dur:2.4,vel:.05,wave:"sine"})},C=(o,r,a,n,f)=>{B[o*4]=r,B[o*4+1]=a,B[o*4+2]=n,B[o*4+3]=f},et=()=>{C(0,g.eye[0],g.eye[1],g.eye[2],xe),C(1,g.fw[0],g.fw[1],g.fw[2],G),C(2,g.rt[0],g.rt[1],g.rt[2],we),C(3,g.up[0],g.up[1],g.up[2],(de>>1)*.618034%1),C(4,S[0],S[1],S[2],b?0:1),C(5,oe,ne,se,ee),B[23*4+2]=v==="Fast jet"?.55:1,B[23*4+3]=P==="Towers"?.35:1,C(6,Ne,_e,h<=256?72:96,h),C(7,T.sunC[0],T.sunC[1],T.sunC[2],z?.6:1),C(8,T.amb[0],T.amb[1],T.amb[2],yt),C(9,T.glow[0],T.glow[1],T.glow[2],0),C(10,T.zen[0],T.zen[1],T.zen[2],T.exp),C(11,T.hs[0],T.hs[1],T.hs[2],j),C(12,T.ha[0],T.ha[1],T.ha[2],z),C(13,Re[0],Re[1],Re[2],x?b?1:.6:0);for(let a=0;a<4;a++){const n=J[a];n?C(14+a,n.x,n.z,n.age,n.amp):C(14+a,0,0,0,0)}let o=0,r=[0,-50,0];if(K){const a=j-K.t0;for(const n of K.strokes){const f=a-n;f>0&&(o+=(1-Math.exp(-f/.02))*Math.exp(-f/.14))}o*=K.peak,r=K.p,a>1.5&&(K=null)}C(22,r[0],r[1],r[2],o),C(18,ye,Ce,0,0),C(24,bt,vt,0,D?1:0)},Le=(o,r)=>{B[9*4+3]=o?1:0;const a=de++>>1;B[3*4+3]=a*.618034%1,B[23*4]=Ye(a&15,2)-.5,B[23*4+1]=Ye(a&15,3)-.5,B[2*4+3]=we,e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.bindVertexArray(s.vEmpty),e.bindFramebuffer(e.FRAMEBUFFER,We.fb),e.viewport(0,0,G,G/2),e.useProgram(s.P.vol.p),e.uniform4fv(s.P.vol.uP,B),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,Ee.tex),e.uniform1i(s.P.vol.uD,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,s.n3),e.uniform1i(s.P.vol.uN3,1),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,Oe.fb),e.viewport(0,0,G,G),Ae&&(!o||r)&&(e.enable(e.BLEND),e.blendFunc(e.CONSTANT_ALPHA,e.ONE_MINUS_CONSTANT_ALPHA),e.blendColor(0,0,0,Me)),e.useProgram(s.P.copy.p),e.uniform4fv(s.P.copy.uP,B),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,We.tex),e.uniform1i(s.P.copy.uS,2),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND),we^=1},tt=()=>{e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,h,h),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.useProgram(s.P.comp.p),e.uniform4fv(s.P.comp.uP,B),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Oe.tex),e.uniform1i(s.P.comp.uC,3),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,s.n2),e.uniform1i(s.P.comp.uN2,4),e.bindVertexArray(s.vEmpty),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)},At=o=>{const r=t.input;if(r.down&&r.inside!==!1){if(E||(E={x0:r.x,y0:r.y,lx:r.x,ly:r.y,t:0,moved:0}),E.t+=o,E.moved=Math.max(E.moved,Math.hypot(r.x-E.x0,r.y-E.y0)),E.moved>.025){if(!E.slide){E.slide=!0,E.lx=E.x0,E.ly=E.y0,O=W=0,ae=[];const re=$e(E.x0,E.y0);De=Math.min(re?re[3]:0,V-.25)}const f=Xe(E.lx,E.ly,De),w=Xe(r.x,r.y,De);let p=w[0]-f[0],R=w[1]-f[1];const A=Math.hypot(p,R),le=Math.max(1.5,4*xe*w[2])*Math.max(o,1/60);for(A>le&&(p*=le/A,R*=le/A),oe-=p,ne-=R,ye-=p,Ce-=R,ve+=Math.hypot(p,R),ae.push([E.t,p,R,o]);ae.length>1&&E.t-ae[0][0]>.12;)ae.shift();ge=A/Math.max(o,1/60)}E.moved<.025&&E.t>.35&&(Fe=1,Ue+=o),E.lx=r.x,E.ly=r.y}else if(E){if(E.slide){let f=0,w=0,p=0;for(const A of ae)f+=A[1],w+=A[2],p+=A[3];p=Math.max(p,.12),O=f/p,W=w/p;const R=Math.hypot(O,W);R>2&&(O*=2/R,W*=2/R),ae=[]}ke=E.t>.3||E.moved>.025,E=null,Fe=0,Ue=0}const a=r.taps(),n=E&&(E.t>.3||E.moved>.025);if(a.length&&!ke&&!n)for(const f of a.slice(-2))_t(f.x,f.y);a.length&&(ke=!1)},Mt=o=>{if(!(E&&E.slide)){const a=Math.exp(-o/.8);O*=a,W*=a,oe-=O*o,ne-=W*o,ye-=O*o,Ce-=W*o,ve+=Math.hypot(O,W)*o,ge=Math.hypot(O,W)}Te+=(Math.min(1,ge)-Te)*(1-Math.exp(-o/.15)),oe+=je*o,ye-=.35*je*o,Fe?V=Math.max(-.5,V-o*(.15+.4*Math.min(1,Ue/2.5))):V=Math.min(he,V+o*(.06+.14*Math.min(1,(he-V)*2)));for(let a=J.length-1;a>=0;a--){const n=J[a];n.age+=o,n.amp=n.a0*(1-Math.exp(-n.age/3.2))*Math.exp(-Math.max(n.age-11,0)/7),n.age>11&&n.amp<.02&&J.splice(a,1)}if(j>=Se){const a=Math.atan2(g.fw[0],g.fw[2])+(l()-.5)*(l()<.7?1.3:6.283),n=3+l()*16;K={t0:j,p:[Math.sin(a)*n,-.3-l()*.9,Math.cos(a)*n],peak:10+l()*12,strokes:[0,.06+l()*.05,.15+l()*.2].slice(0,1+Math.floor(l()*3))},--Je>0?Se=j+.5+l()*2.5:(Je=1+Math.floor(l()*3),Se=j+8+l()*17),me.push({at:j+n*2.9*.3,v:ue(.6/(1+n*.15),.05,.4)})}for(let a=me.length-1;a>=0;a--)if(j>=me[a].at){const n=me[a];me.splice(a,1),t.sound.hit("noise",n.v,{cutoff:160,dur:2.5})}if(ze-=o,ze<=0){ze=.5;const a=V<.3?1:0;t.sound.hit("noise",.025+.06*Te+.03*a,{cutoff:220+500*Te-80*a,dur:1.1})}},Ft=(o,r)=>{r=Math.min(Math.max(r||0,0),.25),j=o,At(r);let a=r;for(;a>1e-6;){const A=Math.min(a,.03333333333333333);Mt(A),a-=A}Qe(),et();const n=Math.abs(V-Ze)>2e-4;Ze=V;let f=Rt;for(const A of J)A.age<12&&(f=Math.max(f,.35));const w=Xe(.5,.72,Math.min(0,V-.25))[2],p=ve*G/(2*xe*w);ve=0;const R=p>.25;Me=R?ue(f+.8*p,f,1):Math.min(f,.6),Le(!!K||n||R,R&&!K&&!n),tt()},Ut=()=>{const o=de;de=0,we=0;for(let r=0;r<16;r++)Ae=r>0,Me=1/(r+1),Le(!1),Le(!1);Ae=!0,de=o+(o&1)};return Qe(),et(),Ut(),tt(),Ft}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
