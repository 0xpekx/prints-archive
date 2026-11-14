// Cloud Balloon: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/524.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ve){Ve&&function(){"use strict";const ft={yaw:0,pitch:0,x:0,y:0,z:0},he=(t,e,h)=>t<e?e:t>h?h:t,je=(t,e)=>{let h=1,r=0;for(t+=1;t>0;t=Math.floor(t/e))h/=e,r+=h*(t%e);return r},ee=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,Oe=`
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
`,ut=ee+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",ht=ee+`
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
`,dt=ee+`
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
`,mt=ee+`
uniform sampler2D uH;
out vec4 oC;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy) * 2;
  oC = .25 * (texelFetch(uH, p, 0) + texelFetch(uH, p + ivec2(1, 0), 0) + texelFetch(uH, p + ivec2(0, 1), 0) + texelFetch(uH, p + ivec2(1, 1), 0));
}
`,pt=ee+Oe+`
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
`,xt=ee+`
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
`,Et=ee+Oe+`
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
`;function wt(t,e,h){const r=new Float32Array(h*h);for(let m=0;m<r.length;m++)r[m]=t();const _=new Float32Array(e*e),l=e/h;for(let m=0;m<e;m++){const i=m/l,A=Math.floor(i),P=i-A,M=P*P*(3-2*P),y=A%h,v=(A+1)%h;for(let b=0;b<e;b++){const f=b/l,u=Math.floor(f),p=f-u,d=p*p*(3-2*p),F=u%h,N=(u+1)%h,g=r[y*h+F]+(r[y*h+N]-r[y*h+F])*d,S=r[v*h+F]+(r[v*h+N]-r[v*h+F])*d;_[m*e+b]=g+(S-g)*M}}return _}function Tt(t){const h=new Uint8Array(262144),r=M=>{const y=new Float32Array(65536);for(const[f,u]of M){const p=wt(t,256,f);for(let d=0;d<y.length;d++)y[d]+=p[d]*u}let v=1e9,b=-1e9;for(const f of y)f<v&&(v=f),f>b&&(b=f);for(let f=0;f<y.length;f++)y[f]=(y[f]-v)/(b-v);return y},_=r([[4,.45],[8,.28],[16,.17],[32,.1]]),l=r([[8,.5],[16,.3],[32,.2]]),m=r([[16,.3],[32,.3],[64,.25],[128,.15]]),i=16,A=256/i,P=new Float32Array(i*i*2);for(let M=0;M<i*i;M++)P[M*2]=.1+.8*t(),P[M*2+1]=.1+.8*t();for(let M=0;M<256;M++)for(let y=0;y<256;y++){const v=y/A,b=M/A,f=Math.floor(v),u=Math.floor(b);let p=9,d=9;for(let g=-1;g<=1;g++)for(let S=-1;S<=1;S++){const Y=f+S,B=u+g,G=(B%i+i)%i*i+(Y%i+i)%i,Q=Y+P[G*2]-v,X=B+P[G*2+1]-b,V=Math.sqrt(Q*Q+X*X);V<p?(d=p,p=V):V<d&&(d=V)}const F=(M*256+y)*4,N=M*256+y;h[F]=_[N]*255,h[F+1]=l[N]*255,h[F+2]=Math.min(1,(d-p)*1.4)*255,h[F+3]=m[N]*255}return h}function vt(t){const _=new Uint8Array(262144),l=new Float32Array(4*4*3);for(let m=0;m<4*4;m++)l[m*3]=.15+.7*t(),l[m*3+1]=.15+.7*t(),l[m*3+2]=t();for(let m=0;m<256;m++)for(let i=0;i<256;i++){const A=(i+.5)/64,P=(m+.5)/64,M=Math.floor(A),y=Math.floor(P);let v=9,b=9,f=0;for(let p=-1;p<=1;p++)for(let d=-1;d<=1;d++){const F=M+d,N=y+p,g=(N%4+4)%4*4+(F%4+4)%4,S=F+l[g*3]-A,Y=N+l[g*3+1]-P,B=Math.sqrt(S*S+Y*Y);B<v?(b=v,v=B,f=l[g*3+2]):B<b&&(b=B)}const u=(m*256+i)*4;_[u]=Math.min(1,(b-v)*2.5)*255,_[u+1]=f*255,_[u+3]=255}return _}function yt(t){const h=new Float32Array(262144);for(const[i,A]of[[4,.44],[8,.3],[16,.17],[32,.09]]){const P=new Float32Array(i*i*i);for(let u=0;u<P.length;u++)P[u]=t();const M=64/i,y=new Int32Array(64),v=new Int32Array(64),b=new Float32Array(64);for(let u=0;u<64;u++){const p=u/M,d=Math.floor(p),F=p-d;y[u]=d%i,v[u]=(d+1)%i,b[u]=F*F*(3-2*F)}const f=new Float32Array(i*i*64);for(let u=0;u<i;u++)for(let p=0;p<i;p++){const d=(u*i+p)*i,F=(u*i+p)*64;for(let N=0;N<64;N++){const g=P[d+y[N]];f[F+N]=g+(P[d+v[N]]-g)*b[N]}}for(let u=0;u<64;u++){const p=y[u]*i,d=v[u]*i,F=b[u];for(let N=0;N<64;N++){const g=y[N],S=v[N],Y=b[N],B=(p+g)*64,G=(p+S)*64,Q=(d+g)*64,X=(d+S)*64,V=(u*64+N)*64;for(let I=0;I<64;I++){const te=f[B+I]+(f[G+I]-f[B+I])*Y,ie=f[Q+I]+(f[X+I]-f[Q+I])*Y;h[V+I]+=(te+(ie-te)*F)*A}}}}let r=1e9,_=-1e9;for(let i=0;i<h.length;i++){const A=h[i];A<r&&(r=A),A>_&&(_=A)}const l=new Uint8Array(h.length),m=255/(_-r);for(let i=0;i<h.length;i++)l[i]=(h[i]-r)*m;return l}function bt(t){if(t.__c524)return t.__c524;t.getExtension("KHR_parallel_shader_compile");const e=(f,u)=>{const p=t.createShader(f);return t.shaderSource(p,u),t.compileShader(p),p},h={h:ht,s:dt,down:mt,vol:pt,copy:xt,comp:Et},r={},_=e(t.VERTEX_SHADER,ut);for(const f in h){const u=t.createProgram(),p=e(t.FRAGMENT_SHADER,h[f]);t.attachShader(u,_),t.attachShader(u,p),t.linkProgram(u),r[f]={p:u,f:p}}let l=99538212;const m=()=>{l=l+1831565813|0;let f=Math.imul(l^l>>>15,1|l);return f=f+Math.imul(f^f>>>7,61|f)^f,((f^f>>>14)>>>0)/4294967296},i=yt(m),A=Tt(m),P=vt(m);for(const f in r){const{p:u,f:p}=r[f];if(!t.getProgramParameter(u,t.LINK_STATUS))throw new Error("524 "+f+": "+(t.getShaderInfoLog(_)||"")+(t.getShaderInfoLog(p)||"")+t.getProgramInfoLog(u));const d=F=>t.getUniformLocation(u,F);r[f]={p:u,uP:d("uP"),uB:d("uB"),uN2:d("uN2"),uN3:d("uN3"),uH:d("uH"),uD:d("uD"),uS:d("uS"),uC:d("uC"),uNC:d("uNC")}}t.pixelStorei(t.UNPACK_ALIGNMENT,1);const M=t.createTexture();t.bindTexture(t.TEXTURE_3D,M),t.texImage3D(t.TEXTURE_3D,0,t.R8,64,64,64,0,t.RED,t.UNSIGNED_BYTE,i),t.generateMipmap(t.TEXTURE_3D),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const f of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,f,t.REPEAT);const y=t.createTexture();t.bindTexture(t.TEXTURE_2D,y),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,A),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const v=t.createTexture();t.bindTexture(t.TEXTURE_2D,v),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,P),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.pixelStorei(t.UNPACK_ALIGNMENT,4);const b=!!(t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float"));return t.__c524={P:r,n3:M,n2:y,nc:v,vEmpty:t.createVertexArray(),half:b,tmp:{},slots:new Map}}const Re=7;function Ee(t,e,h,r,_,l){const m=t.createTexture();t.bindTexture(t.TEXTURE_2D,m),t.texStorage2D(t.TEXTURE_2D,l?Re:1,r?t.RGBA16F:t.RGBA8,e,h),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,l?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR);const i=_?t.REPEAT:t.CLAMP_TO_EDGE;t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,i);const A=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,A),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,m,0),t.bindFramebuffer(t.FRAMEBUFFER,null),{tex:m,fb:A,w:e,h}}const zt=(t,e)=>{t.deleteTexture(e.tex),t.deleteFramebuffer(e.fb)};Ve.add({num:524,name:"Cloud Balloon",fam:"Vistas",recipe:"A balloon drifting over an endless sea of yellow cloud on Venus, with long rolls streaming past in the wind, rifts glowing dull orange from the heat far below and a small white sun in a cream sky. The time of day, the kind of clouds and how high you float change every mint. Tap the cloud tops to make a bump of cloud swell up and slump back, drag to slide the clouds under the balloon, or hold to sink into the yellow fog (let go and you rise again).",interactive:"Tap the cloud tops to set a parcel of the deck rising there: it swells into a rounded head, leans with the wind and slumps back. Drag to slide the cloud deck under the balloon: it follows your finger, coasts on when you let go and falls back into the wind. Hold to let the balloon sink into the cloud tops until the world turns to yellow fog; let go and it rises again.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,h=t.size,r=bt(e);let _=0;for(let o=2;o<66;o+=8)_=Math.imul(_^parseInt(t.hash.slice(o,o+8),16),2654435761)+2135587861|0;const l=()=>{_=_+1831565813|0;let o=Math.imul(_^_>>>15,1|_);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},m=o=>{let s=l(),a=0;for(const[n,c]of o)if(a+=c,s<a)return n;return o[o.length-1][0]},i=t.home,A=i?"Sunset":m([["Sunset",.55],["Afternoon",.33],["Night lightning",.12]]),P=i?"Rolls":m([["Rolls",.45],["Cells",.35],["Towers",.2]]),M=i?"Rifts":m([["Few breaks",.45],["Rifts",.4],["Great chasm",.15]]),y=i?"Clear":m([["Clear",.6],["Thick",.4]]),v=i?"Steady":m([["Steady",.6],["Fast jet",.4]]),b=A==="Night lightning",f=A==="Afternoon",u=i?"Sunward":m(b?[["Sunward",.5],["Across the light",.5]]:[["Sunward",.4],["Across the light",.35],["Glory side",.25]]),p=!f&&!i&&l()<.14;t.trait("Time",A),t.trait("Deck",P),t.trait("Rifts",M),t.trait("Haze",y),t.trait("Wind",v),t.trait("Facing",u),t.trait("Earth",p?"Earth and Moon":"Hidden");let d=706171467;for(let o=2;o<66;o+=8)d=Math.imul(d^parseInt(t.hash.slice(o,o+8),16),2246822507)+1663821211|0;const F=()=>{d=d+1831565813|0;let o=Math.imul(d^d>>>15,1|d);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},N=i?"High above the deck":(()=>{const o=F();return o<.62?"High above the deck":o<.9?"Skimming the tops":"Among the tops"})();t.trait("Altitude",N);const g=N!=="High above the deck",S=N==="Among the tops",Y=F(),B=y==="Thick"?1:0,G=b?-.14:f?.33+.12*l():.045+.04*l(),Q=(l()<.5?-1:1)*(.28+.3*l()),X=[Math.cos(Q)*Math.cos(G),Math.sin(G),Math.sin(Q)*Math.cos(G)],V=Math.atan2(X[0],X[2]),I=l()<.5?-1:1,te={Sunward:[V+I*(.2+.12*l()),f?G-.5:-.17],"Across the light":[V+I*(1.25+.3*l()),-.24],"Glory side":[V+Math.PI+I*(.05+.1*l()),f?-G+.02:-.2]}[u],ie=te[0],We=S?te[1]*.2:g?te[1]*.45:te[1],we=Math.tan(32.5*Math.PI/180),Rt=2.4+.6*l(),de=S?.32+.14*Y:g?.62+.3*Y:Rt,Ke=v==="Fast jet"?.024:.011,Pt=v==="Fast jet"?-.3:-.16,oe=48,T=b?{sunC:[0,0,0],amb:[.03,.027,.024],glow:[.22,.068,.018],zen:[.004,.0034,.0028],hs:[.06,.03,.014],ha:[.01,.008,.006],exp:2.3}:f?{sunC:[1.62,1.3,.72],amb:[.15,.145,.14],glow:[.16,.06,.02],zen:[.62,.53,.31],hs:[1.08,.92,.6],ha:[.8,.67,.44],exp:.62}:{sunC:[1.85,1.16,.52],amb:[.09,.088,.118],glow:[.22,.08,.025],zen:[.6,.53,.36],hs:[1.25,.93,.52],ha:[.66,.53,.4],exp:.66};if(B){const o=[1.06,1,1.02];T.hs=T.hs.map((s,a)=>s*o[a]),T.ha=T.ha.map((s,a)=>(s*.6+T.hs[a]*.4)*o[a]),T.zen=T.zen.map((s,a)=>(s*.65+T.hs[a]*.35)*o[a]),T.sunC=T.sunC.map(s=>s*.8),T.amb=T.amb.map((s,a)=>s*1.25*o[a]),T.exp*=1.12}const Nt=B?32:70,Pe=(()=>{const o=Math.sin(ie-V)>=0?1:-1,s=ie+(l()<.5?.5:1)*o*(.16+.3*l()),a=Math.max(We,-.2)+.3+.14*l();return[Math.sin(s)*Math.cos(a),Math.sin(a),Math.cos(s)*Math.cos(a)]})(),ae={cell:P==="Cells"?1:P==="Towers"?.55:.12,tur:P==="Towers"?1:P==="Cells"?.3:.38,rift:M==="Few breaks"?.2:M==="Rifts"?.55:1,nR:16+Math.floor(l()*8),ox:l(),oz:l()},z=h<=256?512:1024,q=h<=256?256:h<=600?400:416,me=t.hash+"|"+h;let D=null;const Ze=()=>{const o=r.tick||0;if(D=r.slots.get(me),D)r.slots.delete(me);else{let s=0,a=null,n=null;for(const c of r.slots.values())c.DR===z&&c.CR===q&&(s++,!a&&o-c.use>64&&(a=c),(!n||c.use<n.use)&&(n=c));D=a||(s>=(z===512?16:6)?n:null),D?(r.slots.delete(D.key),D.baked=!1):D={deck:Ee(e,z,z,r.half,!0,!0),rtC:Ee(e,q,q,r.half,!1),baked:!1,DR:z,CR:q}}D.key=me,D.use=o,r.slots.set(me,D)};Ze();const Ne="h"+z,_e="v"+q;r.tmp[Ne]||(r.tmp[Ne]=Ee(e,z,z,r.half,!0,!0)),r.tmp[_e]||(r.tmp[_e]=Ee(e,q,q/2,r.half,!1));const Je=r.tmp[_e],_t=r.half?1:.25;let Ae=D.rtC;const Me=-3.4,Fe=5.2,Qe=o=>{e.useProgram(r.P.down.p),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,o),e.uniform1i(r.P.down.uH,1),r.fbM||(r.fbM=e.createFramebuffer()),e.bindFramebuffer(e.FRAMEBUFFER,r.fbM);for(let s=1;s<Re;s++)e.texParameteri(e.TEXTURE_2D,e.TEXTURE_BASE_LEVEL,s-1),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAX_LEVEL,s-1),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,s),e.viewport(0,0,z>>s,z>>s),e.drawArrays(e.TRIANGLES,0,3);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_BASE_LEVEL,0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAX_LEVEL,Re-1),e.bindTexture(e.TEXTURE_2D,null)},$e=()=>{const o=new Float32Array(16),s=Math.hypot(X[0],X[2])||1,a=Math.max(Math.tan(Math.max(G,.04)),.04),n=Math.min(32,2.6/a);o.set([P==="Cells"?1:P==="Towers"?2:0,ae.cell,ae.tur,ae.rift,ae.ox,ae.oz,ae.nR,0,z,Me,Fe,0,n/(48*48.6),a,48,v==="Fast jet"?1:0]),o[6]=X[0]/s/oe,o[7]=X[2]/s/oe,e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.bindVertexArray(r.vEmpty);const c=r.tmp[Ne];e.bindFramebuffer(e.FRAMEBUFFER,c.fb),e.viewport(0,0,z,z),e.useProgram(r.P.h.p);const x=o.slice();x[6]=ae.nR,x[7]=0,e.uniform4fv(r.P.h.uB,x),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.n2),e.uniform1i(r.P.h.uN2,0),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,r.nc),e.uniform1i(r.P.h.uNC,2),e.drawArrays(e.TRIANGLES,0,3),Qe(c.tex),e.bindFramebuffer(e.FRAMEBUFFER,D.deck.fb),e.viewport(0,0,z,z),e.useProgram(r.P.s.p),e.uniform4fv(r.P.s.uB,o),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,c.tex),e.uniform1i(r.P.s.uH,1),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),Qe(D.deck.tex),D.baked=!0};D.baked||$e();const L=new Float32Array(25*4),k={eye:[0,de,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]};let W=0,pe=0,Te=0,ke=!1,et=de,Ue=1;const At=(S?.5:g?.3:.2)*(v==="Fast jet"?1.3:1);let re=l()*oe,le=l()*oe,ve=0,ge=0,De=0,j=de,K=0,Z=0,Ce=0,ze=0,se=[],ye=0,be=-.35*re,Se=-.35*le;const $=[];let w=null,Be=!1,Xe=0,J=null,Le=b?1.2+l()*1.5:1e9,tt=2;const xe=[],ot=()=>{const o=t.view||ft,s=ie+(o.yaw||0),a=he(We+(o.pitch||0),-1.4,1.4);let n=(o.x||0)*.001,c=(o.z||0)*.001;const x=Math.hypot(n,c);x>.2&&(n*=.2/x,c*=.2/x),k.eye=[n,j+he(o.y||0,-50,50)*.001,c];const E=Math.cos(a);k.fw=[Math.sin(s)*E,Math.sin(a),Math.cos(s)*E],k.rt=[Math.cos(s),0,-Math.sin(s)];const R=k.fw,U=k.rt;k.up=[R[1]*U[2]-R[2]*U[1],R[2]*U[0]-R[0]*U[2],R[0]*U[1]-R[1]*U[0]]},He=(o,s)=>{const a=o*2-1,n=1-s*2,c=[0,1,2].map(E=>k.fw[E]+(a*k.rt[E]+n*k.up[E])*we),x=Math.hypot(c[0],c[1],c[2]);return c.map(E=>E/x)};let ce=null;const Mt=(o,s)=>{if(!ce){const Ye=z===1024?2:1,H=256,it=e.createFramebuffer();if(e.bindFramebuffer(e.FRAMEBUFFER,it),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,D.deck.tex,Ye),r.half){if(ce=new Float32Array(H*H*4),e.getError(),e.readPixels(0,0,H,H,e.RGBA,e.FLOAT,ce),e.getError()){const fe=new Uint16Array(H*H*4);e.readPixels(0,0,H,H,e.RGBA,e.HALF_FLOAT,fe);for(let ue=0;ue<fe.length;ue++){const Ge=fe[ue],lt=Ge>>10&31,ct=Ge&1023;ce[ue]=(Ge>>15?-1:1)*(lt?Math.pow(2,lt-15)*(1+ct/1024):Math.pow(2,-14)*ct/1024)}}}else{const fe=new Uint8Array(H*H*4);e.readPixels(0,0,H,H,e.RGBA,e.UNSIGNED_BYTE,fe),ce=Float32Array.from(fe,ue=>ue/255)}e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(it)}let a=(o+re)/oe*256-.5,n=(s+le)/oe*256-.5;a=(a%256+256)%256,n=(n%256+256)%256;const c=Math.floor(a),x=Math.floor(n),E=a-c,R=n-x,U=c+1&255,O=x+1&255,ne=(Ye,H)=>ce[(H*256+Ye)*4],Ct=(ne(c,x)*(1-E)+ne(U,x)*E)*(1-R)+(ne(c,O)*(1-E)+ne(U,O)*E)*R;return Me+Fe*Ct},at=(o,s)=>{const a=He(o,s),n=k.eye;for(let c=.25;c<40;c+=.03+.02*c){const x=n[0]+a[0]*c,E=n[2]+a[2]*c,R=n[1]+a[1]*c+(x*x+E*E)/12104;if(R<Mt(x,E)+.05)return[x,E,c,R]}return null},Ft=()=>Math.min(He(.5,.62)[1],-.06),Ie=(o,s,a)=>{const n=He(o,s),c=k.eye,x=Ft();if(n[1]>x){const R=Math.hypot(n[0],n[2])||1,U=Math.sqrt(1-x*x)/R;n[0]*=U,n[2]*=U,n[1]=x}const E=Math.max(c[1]-a,.05)/-n[1];return[c[0]+n[0]*E,c[2]+n[2]*E,E]},kt=(o,s)=>{const a=at(o,s);if(!a)return;$.length>=4&&$.shift(),$.push({x:a[0]+re,z:a[1]+le,age:0,amp:0,a0:.85+.3*l()});const n=a[2];t.sound.hit("noise",he(.16/(1+n*.2),.03,.14),{cutoff:260,dur:2.2}),t.sound.note(43+Math.floor(l()*3)*2,{dur:2.4,vel:.05,wave:"sine"})},C=(o,s,a,n,c)=>{L[o*4]=s,L[o*4+1]=a,L[o*4+2]=n,L[o*4+3]=c},rt=()=>{C(0,k.eye[0],k.eye[1],k.eye[2],we),C(1,k.fw[0],k.fw[1],k.fw[2],q),C(2,k.rt[0],k.rt[1],k.rt[2],Te),C(3,k.up[0],k.up[1],k.up[2],(pe>>1)*.618034%1),C(4,X[0],X[1],X[2],b?0:1),C(5,re,le,ie,oe),L[23*4+2]=v==="Fast jet"?.55:1,L[23*4+3]=P==="Towers"?.35:1,C(6,Me,Fe,h<=256?72:96,h),C(7,T.sunC[0],T.sunC[1],T.sunC[2],B?.6:1),C(8,T.amb[0],T.amb[1],T.amb[2],Nt),C(9,T.glow[0],T.glow[1],T.glow[2],0),C(10,T.zen[0],T.zen[1],T.zen[2],T.exp),C(11,T.hs[0],T.hs[1],T.hs[2],W),C(12,T.ha[0],T.ha[1],T.ha[2],B),C(13,Pe[0],Pe[1],Pe[2],p?b?1:.6:0);for(let a=0;a<4;a++){const n=$[a];n?C(14+a,n.x,n.z,n.age,n.amp):C(14+a,0,0,0,0)}let o=0,s=[0,-50,0];if(J){const a=W-J.t0;for(const n of J.strokes){const c=a-n;c>0&&(o+=(1-Math.exp(-c/.02))*Math.exp(-c/.14))}o*=J.peak,s=J.p,a>1.5&&(J=null)}C(22,s[0],s[1],s[2],o),C(18,be,Se,0,0),C(24,_t,Pt,0,g?1:0)},qe=(o,s)=>{L[9*4+3]=o?1:0;const a=pe++>>1;L[3*4+3]=a*.618034%1,L[23*4]=je(a&15,2)-.5,L[23*4+1]=je(a&15,3)-.5,L[2*4+3]=Te,e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.bindVertexArray(r.vEmpty),e.bindFramebuffer(e.FRAMEBUFFER,Je.fb),e.viewport(0,0,q,q/2),e.useProgram(r.P.vol.p),e.uniform4fv(r.P.vol.uP,L),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,D.deck.tex),e.uniform1i(r.P.vol.uD,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,r.n3),e.uniform1i(r.P.vol.uN3,1),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,Ae.fb),e.viewport(0,0,q,q),ke&&(!o||s)&&(e.enable(e.BLEND),e.blendFunc(e.CONSTANT_ALPHA,e.ONE_MINUS_CONSTANT_ALPHA),e.blendColor(0,0,0,Ue)),e.useProgram(r.P.copy.p),e.uniform4fv(r.P.copy.uP,L),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Je.tex),e.uniform1i(r.P.copy.uS,2),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND),Te^=1},st=()=>{e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,h,h),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.useProgram(r.P.comp.p),e.uniform4fv(r.P.comp.uP,L),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Ae.tex),e.uniform1i(r.P.comp.uC,3),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,r.n2),e.uniform1i(r.P.comp.uN2,4),e.bindVertexArray(r.vEmpty),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)},Ut=o=>{const s=t.input;if(s.down&&s.inside!==!1){if(w||(w={x0:s.x,y0:s.y,lx:s.x,ly:s.y,t:0,moved:0}),w.t+=o,w.moved=Math.max(w.moved,Math.hypot(s.x-w.x0,s.y-w.y0)),w.moved>.025){if(!w.slide){w.slide=!0,w.lx=w.x0,w.ly=w.y0,K=Z=0,se=[];const ne=at(w.x0,w.y0);ze=Math.min(ne?ne[3]:0,j-.25)}const c=Ie(w.lx,w.ly,ze),x=Ie(s.x,s.y,ze);let E=x[0]-c[0],R=x[1]-c[1];const U=Math.hypot(E,R),O=Math.max(1.5,4*we*x[2])*Math.max(o,1/60);for(U>O&&(E*=O/U,R*=O/U),re-=E,le-=R,be-=E,Se-=R,ye+=Math.hypot(E,R),se.push([w.t,E,R,o]);se.length>1&&w.t-se[0][0]>.12;)se.shift();Ce=U/Math.max(o,1/60)}w.moved<.025&&w.t>.35&&(ge=1,De+=o),w.lx=s.x,w.ly=s.y}else if(w){if(w.slide){let c=0,x=0,E=0;for(const U of se)c+=U[1],x+=U[2],E+=U[3];E=Math.max(E,.12),K=c/E,Z=x/E;const R=Math.hypot(K,Z);R>2&&(K*=2/R,Z*=2/R),se=[]}Be=w.t>.3||w.moved>.025,w=null,ge=0,De=0}const a=s.taps(),n=w&&(w.t>.3||w.moved>.025);if(a.length&&!Be&&!n)for(const c of a.slice(-2))kt(c.x,c.y);a.length&&(Be=!1)},gt=o=>{if(!(w&&w.slide)){const a=Math.exp(-o/.8);K*=a,Z*=a,re-=K*o,le-=Z*o,be-=K*o,Se-=Z*o,ye+=Math.hypot(K,Z)*o,Ce=Math.hypot(K,Z)}ve+=(Math.min(1,Ce)-ve)*(1-Math.exp(-o/.15)),re+=Ke*o,be-=.35*Ke*o,ge?j=Math.max(-.5,j-o*(.15+.4*Math.min(1,De/2.5))):j=Math.min(de,j+o*(.06+.14*Math.min(1,(de-j)*2)));for(let a=$.length-1;a>=0;a--){const n=$[a];n.age+=o,n.amp=n.a0*(1-Math.exp(-n.age/3.2))*Math.exp(-Math.max(n.age-11,0)/7),n.age>11&&n.amp<.02&&$.splice(a,1)}if(W>=Le){const a=Math.atan2(k.fw[0],k.fw[2])+(l()-.5)*(l()<.7?1.3:6.283),n=3+l()*16;J={t0:W,p:[Math.sin(a)*n,-.3-l()*.9,Math.cos(a)*n],peak:10+l()*12,strokes:[0,.06+l()*.05,.15+l()*.2].slice(0,1+Math.floor(l()*3))},--tt>0?Le=W+.5+l()*2.5:(tt=1+Math.floor(l()*3),Le=W+8+l()*17),xe.push({at:W+n*2.9*.3,v:he(.6/(1+n*.15),.05,.4)})}for(let a=xe.length-1;a>=0;a--)if(W>=xe[a].at){const n=xe[a];xe.splice(a,1),t.sound.hit("noise",n.v,{cutoff:160,dur:2.5})}if(Xe-=o,Xe<=0){Xe=.5;const a=j<.3?1:0;t.sound.hit("noise",.025+.06*ve+.03*a,{cutoff:220+500*ve-80*a,dur:1.1})}},Dt=(o,s)=>{s=Math.min(Math.max(s||0,0),.25),W=o,r.tick=(r.tick||0)+1;const a=D.key!==me;a&&(Ze(),Ae=D.rtC,D.baked||$e()),D.use=r.tick,Ut(s);let n=s;for(;n>1e-6;){const O=Math.min(n,.03333333333333333);gt(O),n-=O}ot(),rt(),a&&nt();const c=Math.abs(j-et)>2e-4;et=j;let x=At;for(const O of $)O.age<12&&(x=Math.max(x,.35));const E=Ie(.5,.72,Math.min(0,j-.25))[2],R=ye*q/(2*we*E);ye=0;const U=R>.25;Ue=U?he(x+.8*R,x,1):Math.min(x,.6),qe(!!J||c||U,U&&!J&&!c),st()},nt=()=>{const o=pe;pe=0,Te=0;for(let s=0;s<16;s++)ke=s>0,Ue=1/(s+1),qe(!1),qe(!1);ke=!0,pe=o+(o&1)};return ot(),rt(),nt(),st(),Dt}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
