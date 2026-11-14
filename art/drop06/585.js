// Evening Sails: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/585.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ht){Ht&&Ht.add({num:585,name:"Evening Sails",fam:"Vistas",recipe:"A granite boulder at the edge of the Nile at Aswan late in the day, with white feluccas crossing a mirror-flat river below golden dunes and a cliff cut with old tomb doors. Where you stand, what the nearest boat is doing and the breeze change every mint. Tap a boat to make it go about or tap the water for a ripple, drag to send a breeze down the river so the sails fill, or hold to bring the sun down into a pink and grey dusk with lanterns coming on.",interactive:"Tap a felucca and it goes about: the bow swings through the wind, the long yard and sail swing across, the hull heels the other way and its wake curls; tap the water to drop a ripple. Drag to send the evening breeze down the river: the sails fill, the boats heel and pick up speed and cat's-paws ruffle the mirror. Hold to set the sun: the sails go from gold to pink to grey, the dunes glow red, and lanterns light on the boats and in the windows on the bank behind you.",music:!0,gl:!0,fps:30,seed:0,make(q){const e=q.gl,c0=q.size,r0=!!q.home;let u0=1482633500;for(let t=2;t<66;t+=8)u0=Math.imul(u0^parseInt(q.hash.slice(t,t+8),16),2246822507)^u0>>>13;const h=()=>{u0=u0+1831565813|0;let t=Math.imul(u0^u0>>>15,1|u0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<6;t++)h();const k0=t=>{let o=0;for(const s in t)o+=t[s];let a=h()*o;for(const s in t)if(a-=t[s],a<0)return s;return Object.keys(t)[0]};let D0=2048677347;for(let t=2;t<66;t+=8)D0=Math.imul(D0^parseInt(q.hash.slice(t,t+8),16),739982445)^D0>>>15;const w0=()=>{D0=D0+1831565813|0;let t=Math.imul(D0^D0>>>15,1|D0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<4;t++)w0();let C0=1372825545;for(let t=2;t<66;t+=8)C0=Math.imul(C0^parseInt(q.hash.slice(t,t+8),16),668265263)^C0>>>12;const n0=()=>{C0=C0+1831565813|0;let t=Math.imul(C0^C0>>>15,1|C0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<5;t++)n0();const z=Array.from({length:24},n0),_e=t=>{let o=0;for(const s in t)o+=t[s];let a=w0()*o;for(const s in t)if(a-=t[s],a<0)return s;return Object.keys(t)[0]},X=Math.PI,G=X*2,W=(t,o,a)=>t<o?o:t>a?a:t,g0=(t,o,a)=>{const s=W((a-t)/(o-t),0,1);return s*s*(3-2*s)},i0=(t,o,a)=>t+(o-t)*a,M0=(t,o)=>[t[0]+o[0],t[1]+o[1],t[2]+o[2]],$=(t,o,a)=>[t[0]+o[0]*a,t[1]+o[1]*a,t[2]+o[2]*a],A0=(t,o,a)=>[t[0]+(o[0]-t[0])*a,t[1]+(o[1]-t[1])*a,t[2]+(o[2]-t[2])*a],T0=t=>{const o=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/o,t[1]/o,t[2]/o]},Y=t=>{for(;t>X;)t-=G;for(;t<-X;)t+=G;return t},N0=`precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`+`
uniform vec4 uS[16];
uniform sampler2D uN;
#define SUN uS[0].xyz
#define DK uS[0].w
#define SUNC uS[1].rgb
#define HAZE uS[1].w
#define AMB uS[2].rgb
#define FOGD uS[2].w
#define EYE uS[3].xyz
#define TANH uS[3].w
#define RES uS[4].xy
#define MIR uS[4].z
#define TIME uS[4].w
#define HZS uS[5].rgb
#define LAMP uS[5].w
#define ZEN uS[6].rgb
#define CLOUD uS[6].w
#define HZA uS[7].rgb
#define BELT uS[7].w
#define CR uS[8].xyz
#define EXPO uS[8].w
#define CU uS[9].xyz
#define MOON uS[9].w
#define CF uS[10].xyz
#define WINL uS[10].w
#define WIND uS[11].xy
#define BREEZE uS[11].z
#define GUST uS[11].w
#define ONE uS[15].w
`,st=`
float atanF(float y, float x) { bool sw = abs(y) > abs(x); float a = atan(sw ? x/y : y/max(abs(x), 1e-12)*sign(x + 1e-30)); if (sw) return (y > 0. ? 1.5707963 : -1.5707963) - a; return x < 0. ? a + (y >= 0. ? 3.14159265 : -3.14159265) : a; }
float sunTr() { return smoothstep(-0.022, 0.012, SUN.y); }
vec3 fogC(vec3 d) {
  vec2 dh = normalize(d.xz + vec2(1e-6, 0.)), sh = normalize(SUN.xz + vec2(1e-6, 0.));
  float w = clamp(dot(dh, sh)*0.5 + 0.5, 0., 1.);
  return mix(HZA, HZS, pow(w, 2.4))*0.95 + SUNC*(0.07*pow(w, 6.) + 0.03*pow(w, 16.)*(0.55 + HAZE));
}
vec3 fogIt(vec3 col, vec3 d, float t) { return mix(col, fogC(d), 1. - exp(-t/FOGD)); }
`,Ot=N0+st+`
vec3 skyB(vec3 d) {
  float e = d.y, ep = max(e, 0.);
  vec3 S = SUN;
  vec2 dh = normalize(d.xz + vec2(1e-6, 0.)), sh = normalize(S.xz + vec2(1e-6, 0.));
  float w = clamp(dot(dh, sh)*0.5 + 0.5, 0., 1.);
  float cg = dot(d, S);
  vec3 hz = mix(HZA, HZS, pow(w, 2.4));
  float g = pow(clamp(ep*(1.45 + 1.3*(1. - w)), 0., 1.), 0.72);
  vec3 col = mix(hz, ZEN, g);
  float anti = (1. - w)*(1. - w);
  col = mix(col, vec3(0.66, 0.43, 0.5)*(1. - 0.55*DK), BELT*anti*smoothstep(0.025, 0.08, ep)*(1. - smoothstep(0.13, 0.32, ep))*0.55);
  col = mix(col, vec3(0.17, 0.19, 0.3)*(1. - 0.5*DK), BELT*anti*(1. - smoothstep(0.0, 0.05 + 0.04*DK, ep))*0.75);
  float sT = 0.25 + 0.75*sunTr();
  float cp = max(cg, 0.);
  // the glow round the sun falls off as a power of the angle t, peaked at the disc (an aureole ~(a/(t + a))^2 and a glare
  // ~1/(t^2 + b^2)^1.5 just off it): no gaussian lobes or flat-topped terms, which the tone curve made a pale plate with a rim
  float x2 = max(2.*(1. - cp), 0.), th = sqrt(x2), a0 = 0.08/(th + 0.08), a1 = 0.02/(th + 0.02), l2 = 6.4e-5/(x2 + 6.4e-5);
  col += SUNC*(0.05*pow(cp, 3.) + 0.1*pow(cp, 20.) + 0.15*a0*a0 + 1.5*a1*a1 + 2.5*l2*sqrt(l2))*(0.55 + HAZE)*sT;
  col = mix(col, hz*0.94 + SUNC*0.07*pow(w, 6.), exp(-ep*(28. - 13.*HAZE))*(0.22 + 0.5*HAZE));
  return col;
}
vec3 skyC(vec3 d, float det) {
  vec3 col = skyB(d);
  float e = d.y, ep = max(e, 0.);
  vec3 S = SUN;
  float cg = dot(d, S), cp = max(cg, 0.);
  vec2 dh = normalize(d.xz + vec2(1e-6, 0.)), sh = normalize(S.xz + vec2(1e-6, 0.));
  float w = clamp(dot(dh, sh)*0.5 + 0.5, 0., 1.);
  vec3 hz = mix(HZA, HZS, pow(w, 2.4));
  {
    float a = length(cross(d, S));
    if (cg > 0.) {
      float disc = smoothstep(0.0053, 0.0043, a);
      col += SUNC*disc*28.*smoothstep(-0.006, 0.006, e)*(0.65 + 0.35*sqrt(max(1. - a*a/2.3e-5, 0.)));
    }
    if (e > 0.) {
      vec2 p = d.xz/(e + 0.07);
      vec2 qq = vec2(p.x*0.8 - p.y*0.6, p.x*0.6 + p.y*0.8);
      float n = texture(uN, qq*vec2(0.012, 0.06) + vec2(TIME*0.0003, 0.)).g*0.6 + texture(uN, qq*vec2(0.05, 0.22) + 0.41).r*0.4;
      n = mix(n, texture(uN, qq*vec2(0.11, 0.42) + 0.23).g*0.55 + texture(uN, qq*vec2(0.3, 0.9) + 0.7).r*0.45, smoothstep(0.25, 0.8, e)*0.7);
      float band = smoothstep(0.03, 0.09, e)*(0.6 + 0.4*(1. - smoothstep(0.35, 0.9, e)));
      float cl = smoothstep(0.56, 0.84, n)*band*CLOUD;
      float lit = texture(uN, qq*vec2(0.012, 0.06) + vec2(TIME*0.0003, 0.) + vec2(0.004, 0.01)).g;
      vec3 cc = SUNC*(0.16 + 0.6*pow(cp, 2.) + 0.5*clamp((n - lit)*6. + 0.5, 0., 1.))*vec3(1., 0.78, 0.8) + vec3(0.2, 0.1, 0.14)*(1. - 0.6*DK);
      col = mix(col, cc, cl*0.8);
    }
    if (DK > 0.72 && e > 0.02) {
      vec2 sp = d.xz/(e + 0.6)*170.;
      vec2 ci = floor(sp); float hb = texelFetch(uN, ivec2(mod(ci, 256.)), 0).b, hc = texelFetch(uN, ivec2(mod(ci*7. + 101., 256.)), 0).b;
      float sd = length(sp - ci - 0.2 - 0.6*vec2(hc, fract(hc*37.)));
      col += vec3(0.85, 0.9, 1.)*step(0.997, hb)*smoothstep(0.32, 0.05, sd)*(0.25 + 1.4*fract(hc*53.))*smoothstep(0.72, 1., DK)*smoothstep(0.02, 0.2, e)*(1. - CLOUD*0.6);
    }
    if (MOON > 0.5) {
      vec3 md = uS[14].xyz;
      float ma = length(cross(d, md));
      if (dot(d, md) > 0. && ma < 0.006) {
        vec3 tow = normalize(S - md*dot(S, md));
        vec3 off = d - md*dot(d, md);
        float disc = smoothstep(0.0046, 0.0041, ma);
        float lit = smoothstep(0.0046, 0.0040, length(off + tow*0.0021));
        col = mix(col, vec3(1., 0.93, 0.78)*(1.6 + 1.2*DK), disc*(1. - lit)*0.9) + vec3(0.02, 0.025, 0.04)*disc*lit;
      }
    }
  }
  return col;
}
`,Pe=`
uniform vec4 uT[8];
float zW(float x) { float b = min(x + 150., 0.); return -340. + 40.*sin(x*0.0047 + uT[7].x) + 18.*sin(x*0.013 + uT[7].y) - b*b*0.0018; }
float zE(float x) { return 7. + 0.0006*x*x + 5.*sin(x*0.021 + 1.); }
float zR(float x) { return -600. + 45.*sin(x*0.006 + uT[7].y); }
float eastH(vec2 q) { float de = q.y - zE(q.x); return clamp(de*0.25 - 0.5, -6., 3.) + smoothstep(20., 140., de)*(7. + 3.*sin(q.x*0.013)*sin(q.y*0.017)); }
float islH(vec2 q, vec4 I) {
  vec2 dq = q - I.xy; float th = atanF(dq.y, dq.x);
  float Rr = I.z*(1. + 0.16*sin(3.*th + I.x) + 0.08*sin(5.*th + I.y));
  float r = length(dq)/Rr; return I.w*(1. - r*r);
}
float tombH(vec2 q, vec4 T) {
  if (T.w < 0.5) return 0.;
  vec2 dq = (q - T.xy)/T.z;
  float add = 0.;
  if (T.w < 1.5) {
    vec2 a = abs(dq); float bx = max(a.x, a.y), r = length(dq);
    // a small domed shrine: a cube with a low drum and a slightly pointed dome, and a lower annex with its own dome
    add = (1. - smoothstep(3.3, 3.6, bx))*(4.6 + (r < 3.6 ? 0.5 : 0.) + (r < 3.1 ? 1.25*sqrt(9.6 - r*r) : 0.));
    vec2 a2 = abs(dq - vec2(7.6, 1.6)); float b2 = max(a2.x, a2.y), r2 = length(dq - vec2(7.6, 1.6));
    add = max(add, (1. - smoothstep(2.3, 2.6, b2))*(3.3 + (r2 < 2. ? 1.15*sqrt(4. - r2*r2) : 0.))*T.w);
  } else {
    vec2 a = abs(dq) - vec2(17., 12.); float mb = max(a.x, a.y);
    add = (mb < 0. && mb > -1.8) ? 3. + 5.*textureLod(uN, q*0.09, 0.).r : 0.;
    vec2 tw = abs(dq - vec2(-9., 3.)) - 3.5; if (max(tw.x, tw.y) < 0.) add = max(add, 10.5);
    vec2 hl = abs(dq - vec2(5., -2.)) - vec2(6., 4.); if (max(hl.x, hl.y) < 0.) add = max(add, 5.8);
  }
  return add*T.z;
}
float Hm(vec2 q, out vec4 m) {
  m = vec4(0.);
  float x = q.x, z = q.y;
  vec4 n0 = textureLod(uN, q*0.00025 + vec2(0.13, 0.71), 0.);
  vec4 n1 = textureLod(uN, q*0.0009 + vec2(0.57, 0.29), 0.);
  float dw = zW(x) - z;
  float h = clamp(dw*0.08, -6., 1.2);
  float inl = smoothstep(12., 170., dw);
  vec2 wq = q + (n0.rg - 0.5)*380. + (n1.rg - 0.5)*60.;
  float u = (wq.x*0.93 - wq.y*0.36)/(170. + 60.*n0.b);
  float p = fract(u);
  // dunes: a long convex windward back up to a sharp crest, then a steep slip face (so the low sun draws a crisp edge)
  float pw = p/0.72, pl = (p - 0.72)/0.28;
  float prof = p < 0.72 ? pw*(1.55 - 0.55*pw) : (1. - pl)*(1. - pl*0.35)/(1. + 0.*pl);
  float amp = (14. + 26.*n0.g)*(0.65 + 0.35*n1.r);
  h += inl*(prof*amp + 8. + max(dw - 40., 0.)*0.055 + 8.*n1.g);
  m.z = smoothstep(2., 8., dw)*(1. - smoothstep(30., 70., dw))*smoothstep(0.42, 0.58, n1.r);
  h += m.z*1.3*n1.g;
  float zr = zR(x), wR = 85. + 30.*n1.r, rx = uT[7].z;
  float along = smoothstep(rx - 300., rx - 140., x)*(1. - smoothstep(rx + 170., rx + 330., x));
  float gul = textureLod(uN, vec2(x*0.0021, z*0.0006) + 0.3, 0.).g;
  // the west bank hill as at Qubbet el-Hawa: a rock crest, a band of sandstone scarp along its face with a row of tomb
  // doors cut in it, and a steep slope of wind-blown sand banked up against the scarp, a stair path climbing it
  float A = uT[7].w*(0.8 + 0.4*gul)*along, f = z - zr;
  float g2 = textureLod(uN, vec2(x*0.006, 0.37), 0.).r;
  float fS = 0.4*A + 32.*g2, D = 0.2*A + 4.;
  float rk = f < 0. ? A*exp(-f*f/(wR*wR)) : A*(1. - 0.06*min(f, 22.)*min(f, 22.)/484.) - 0.3*max(f - 22., 0.);
  rk -= D*smoothstep(fS - 1.2, fS + 1.2, f) + 0.6*max(f - fS - 1.2, 0.);
  rk += (textureLod(uN, q*0.004, 0.).r - 0.5)*4.*along + (textureLod(uN, q*0.03, 0.).g - 0.5)*1.6*along;
  float topS = A*(1. - 0.06*min(fS, 22.)*min(fS, 22.)/484.) - 0.3*max(fS - 22., 0.);
  float sn = topS - 0.62*D - 0.6*max(f - fS, 0.) + (textureLod(uN, vec2(x*0.011, f*0.004), 0.).g - 0.5)*2.;
  sn = f > fS - 0.5 ? sn : -1e3;
  float ridge = max(rk, sn)*smoothstep(10., 80., dw);
  float rx0 = rk > sn + 0.25 ? 1. : 0.;
  float rw = smoothstep(-5., 5., ridge - h)*step(1., ridge);
  m.x = rw*rx0;
  h = mix(h, ridge, rw);
  if (rw > 0.5) {
    // tomb doors: dark openings at the foot of the exposed scarp, not evenly spaced; and the stair path (m.w 0.5)
    float cx = floor(x/9.), fx = fract(x/9.), hd = texelFetch(uN, ivec2(int(mod(cx, 256.)), 77), 0).b;
    float hy = h - (topS - 0.62*D);
    if (rx0 > 0.5 && f > fS - 1.5 && f < fS + 2. && hd > 0.35 && abs(fx - 0.3 - 0.4*fract(hd*7.)) < 0.1 + 0.08*hd && hy > 0.2 && hy < 4.2 + 1.5*hd) m.w = 1.;
    float sx = x - rx - 40. + (f - fS)*1.25;
    if (rx0 < 0.5 && f > fS && f < fS + 70. && (abs(sx) < 1.3 || abs(x - rx + 90. - (f - fS)*1.1) < 1.1)) m.w = 0.5;
  }
  float tt = 0.;
  for (int i = 0; i < int(2.*ONE); i++) tt += tombH(q, i == 0 ? uT[3] : uT[4]);
  if (tt > 0.4) m.y = 1.;
  h += tt;
  float rr = length(q), fr = smoothstep(2400., 3400., rr);
  h = max(h, fr*(16. + 40.*n0.g*n0.g) - 6.*(1. - fr));
  float e = eastH(q);
  if (e > h) { h = e; m = vec4(0., 3., n1.r > 0.6 ? 0.5 : 0., 0.); }
  float de = z - zE(x);
  if (de > 128. && x > uT[6].x && x < uT[6].y) {
    vec2 cc = floor(q/15.);
    float pr = texelFetch(uN, ivec2(mod(cc, 256.)), 0).b;
    if (pr < uT[6].w) {
      float r1 = texelFetch(uN, ivec2(mod(cc + vec2(17., 5.), 256.)), 0).b;
      float r2 = texelFetch(uN, ivec2(mod(cc + vec2(3., 41.), 256.)), 0).b;
      vec2 c0 = (cc + 0.5)*15. + (vec2(r1, r2) - 0.5)*3.;
      vec2 hs = vec2(2.3 + 2.3*r1, 2.2 + 2.1*r2), dd = abs(q - c0) - hs;
      float bx = max(dd.x, dd.y) + (textureLod(uN, q*0.29 + r1, 0.).g - 0.5)*1.1;
      if (bx < 0.) {
        float hb = 2.6 + 3.4*fract(r1*7.3 + r2*3.1) + (textureLod(uN, q*0.21 + r2, 0.).r - 0.5)*1.2;
        float par = bx > -0.4 ? 0.4 : 0.;
        vec2 dv = (q - c0)/hs; float dome = fract(r2*5.1) > 0.55 ? 1.4*min(hs.x, hs.y)*sqrt(max(1. - dot(dv, dv)*1.4, 0.)) : 0.;
        h = max(h, e + hb + max(par, dome)); m = vec4(0., 2., 0., fract(pr*13.7 + r1));
      }
    }
  }
  vec4 kn = uT[5]; float kr = length(q - kn.xy)/kn.z;
  float kh = kr < 1. ? kn.w*pow(1. - kr*kr, 0.8) + (textureLod(uN, q*0.02, 0.).g - 0.5)*1.6 : -6.;
  if (kh > h) { h = kh; m = vec4(0., 5., 0., 0.); }
  float ih = -6.;
  for (int i = 0; i < int(3.*ONE); i++) { vec4 I = i == 0 ? uT[0] : i == 1 ? uT[1] : uT[2]; if (length(q - I.xy) < I.z*1.3) ih = max(ih, islH(q, I)); }
  if (ih > h) { h = ih + (n1.g - 0.5)*0.3; m = vec4(0., 4., smoothstep(0.55, 0.7, n1.r)*0.8, 0.); }
  return h;
}
float H(vec2 q) { vec4 m; return Hm(q, m); }
float winM(vec3 p, vec3 n, float mw, out float lit) {
  lit = 0.;
  if (n.y > 0.55) return 0.;
  vec2 wc = vec2((abs(n.x) > abs(n.z) ? p.z : p.x)/3.3, p.y/2.7);
  vec2 ci = floor(wc), fw = fract(wc);
  float hh = texelFetch(uN, ivec2(mod(ci + vec2(mw*97., 13.), 256.)), 0).b;
  float hk = texelFetch(uN, ivec2(mod(ci + vec2(mw*53. + 7., 91.), 256.)), 0).b;
  float tall = step(0.8, hk);
  float win = step(abs(fw.x - 0.3 - 0.4*hk), 0.08 + 0.05*hh)*step(abs(fw.y - 0.45 + 0.12*tall), 0.12 + 0.14*tall)*step(0.45, hh);
  lit = win*fract(hh*7.13 + hk*3.1);
  return win;
}
float canopy(vec2 q) {
  float de = q.y - zE(q.x);
  if (de < 26. || de > 330. || q.x < uT[6].x - 70. || q.x > uT[6].y + 40.) return -1e3;
  float n = textureLod(uN, q*0.021 + 0.37, 0.).r;
  return n > 0.5 ? eastH(q) + 8. + 7.*n : -1e3;
}
`,vt=`#version 300 es
precision highp float;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p*2. - 1., 0., 1.); }`,Ue=`#version 300 es
`+N0+st+Pe+`
uniform vec4 uBk;
uniform sampler2D uB;
out vec4 o;
void main() {
  vec2 uv = vec2(gl_FragCoord.x/uBk.x, (gl_FragCoord.y + uBk.w)/(uBk.y + uBk.w));
  float a = (uv.x - 0.5)*6.2831853, el = uS[13].x + uv.y*(uS[13].y - uS[13].x);
  vec3 d = vec3(sin(a)*cos(el), sin(el), -cos(a)*cos(el));
  vec3 O = vec3(uS[12].x, uS[15].x, uS[12].y);
  bool m2 = uBk.z > 0.5;
  vec3 n = vec3(0., 1., 0.), p = O, ps = O;
  vec2 sd = normalize(SUN.xz + vec2(1e-6, 0.));
  float e = 0.2;
  if (m2) {
    vec2 B = texelFetch(uB, ivec2(gl_FragCoord.xy), 0).rg;
    if (B.g < 0.5) { o = vec4(0.); return; }
    float dist = uS[14].w > 0.5 ? B.r : B.r*B.r*10000.;
    p = O + d*dist; ps = p + vec3(0., 0.7, 0.); e = max(0.2, dist*0.0013);
  }
  float t = 0.5, tp = 0.5, res = 1e4, st = 2.5, ang = -1.;
  float hl = 0., lo = 0., hi = 0., h0 = 0., hx = 0.;
  vec4 m = vec4(0.); vec3 PH = O;
  int NB = int(250.*uS[15].w), mode = m2 ? 3 : 0, nb = 0, k = 0;
  for (int i = 0; i < NB; i++) {
    float tt = mode == 0 ? t : 0.5*(lo + hi);
    vec3 pp = O + d*tt;
    vec2 qq = mode < 2 ? pp.xz : k < 3 ? p.xz + (k == 1 ? vec2(e, 0.) : k == 2 ? vec2(0., e) : vec2(0.)) : ps.xz + sd*st;
    vec4 mm; float h = Hm(qq, mm);
    if (mode == 3) {
      if (k < 3) {
        if (k == 0) { h0 = h; m = mm; } else if (k == 1) hx = h; else { n = normalize(vec3(h0 - hx, e, h0 - h)); if (uBk.z > 1.5) break; }
        k++; continue;
      }
      h = max(h, canopy(qq));
      ang = max(ang, (h - ps.y)/st);
      st *= 1.3; if (st > 2600.) break;
      continue;
    }
    float dh = pp.y - max(h, 0.);
    if (mode == 0) {
      if (dh < 0.) { mode = 1; lo = tp; hi = t; hl = h; continue; }
      if (d.y > 0.02 && pp.y > 160.) break;
      tp = t; t += max(max(dh*0.5, -h*1.5), 0.05 + t*0.0022);
      if (t > 7800.) break;
    } else {
      if (dh < 0.) { hi = tt; hl = h; } else lo = tt;
      nb++;
      if (nb >= 7) {
        PH = O + d*hi;
        if (hl > -0.02 && PH.y > -0.05) res = hi;
        break;
      }
    }
  }
  if (!m2) { o = res < 9000. ? vec4(uS[14].w > 0.5 ? res : sqrt(res/10000.), 1., 0., 1.) : vec4(0.); return; }
  if (uBk.z > 1.5) { o = vec4(n.xz*0.5 + 0.5, 0., 1.); return; }
  float hs = ang/sqrt(1. + ang*ang), lit = 0.;
  vec2 q = p.xz;
  float nA = texture(uN, q*0.013).r, nB = texture(uN, q*0.071 + 0.3).g;
  vec3 sand = vec3(0.70, 0.47, 0.26)*(0.84 + 0.3*nA)*(0.92 + 0.16*nB);
  vec2 rq = vec2(q.x*0.93 - q.y*0.36, q.x*0.36 + q.y*0.93);
  sand *= 0.93 + 0.14*texture(uN, rq*vec2(0.004, 0.05)).g;
  vec3 rock = vec3(0.38, 0.25, 0.17)*(0.6 + 0.7*texture(uN, q*0.05).g)*(0.8 + 0.4*nB);
  vec3 alb = mix(sand, rock, m.x*smoothstep(0.12, 0.35, 1. - n.y) + m.x*0.35);
  if (m.y < 0.5 && m.w > 0.75) alb = vec3(0.02, 0.017, 0.015);
  else if (m.y < 0.5 && m.w > 0.25) alb = vec3(0.5, 0.42, 0.33)*(0.9 + 0.2*nB);
  if (m.y > 0.5 && m.y < 1.5) alb = vec3(0.66, 0.56, 0.43)*(0.9 + 0.2*nB)*(0.85 + 0.15*smoothstep(0.5, 0.9, n.y));
  else if (m.y > 1.5 && m.y < 2.5) {
    float hh = m.w;
    float grime = texture(uN, vec2(q.x + q.y, p.y*0.2)*0.37 + hh).g;
    alb = hh < 0.3 ? vec3(0.4, 0.42, 0.44) : hh < 0.6 ? vec3(0.5, 0.38, 0.26) : hh < 0.8 ? vec3(0.56, 0.5, 0.42) : vec3(0.48, 0.34, 0.28);
    alb *= (0.55 + 0.35*nB)*(0.7 + 0.45*grime)*(0.75 + 0.25*smoothstep(0., 3., p.y - eastH(q)));
    if (n.y > 0.7) alb = vec3(0.3, 0.24, 0.18)*(0.7 + 0.5*nA);
    alb *= 1. - 0.8*winM(p, n, m.w, lit);
    if (texture(uN, q*0.043 + 0.11).r > 0.36) { hs = max(hs, 0.2); alb *= 0.8; }
  }
  else if (m.y > 2.5 && m.y < 3.5) { alb = vec3(0.44, 0.33, 0.23)*(0.75 + 0.5*nA); alb = mix(alb, vec3(0.07, 0.08, 0.04)*(0.7 + 0.6*nB), smoothstep(0.55, 0.75, texture(uN, q*0.045 + 0.6).g)*0.8); }
  else if (m.y > 3.5 && m.y < 4.5) alb = sand*0.9;
  else if (m.y > 4.5) alb = vec3(0.13, 0.095, 0.08)*(0.7 + 0.7*nB);
  alb = mix(alb, vec3(0.05, 0.075, 0.035)*(0.7 + 0.6*nB), m.z);
  alb *= mix(0.55, 1., smoothstep(0.05, 0.5, h0));
  o = vec4(sqrt(clamp(alb, 0., 1.)), lit > 0.01 ? 0.5 + 0.5*lit : clamp((hs + 0.1)/0.4, 0., 1.)*0.49);
}`,qe=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
uniform sampler2D uW;
uniform vec4 uSim;
uniform vec4 uSrc[16];
out vec4 o;
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy); int N = int(uSim.w);
  vec2 cc = texelFetch(uW, ip, 0).rg;
  float l = texelFetch(uW, ivec2(max(ip.x - 1, 0), ip.y), 0).r, r = texelFetch(uW, ivec2(min(ip.x + 1, N - 1), ip.y), 0).r;
  float dn = texelFetch(uW, ivec2(ip.x, max(ip.y - 1, 0)), 0).r, up = texelFetch(uW, ivec2(ip.x, min(ip.y + 1, N - 1)), 0).r;
  float h = (2.*cc.r - cc.g + uSim.z*(l + r + dn + up - 4.*cc.r))*0.995;
  vec2 q = uSim.xy + (vec2(ip) + 0.5)/uSim.w*260.;
  vec4 s; vec2 dq;
#define SRC(i) s = uSrc[i]; dq = q - s.xy; h += s.w*exp(-dot(dq, dq)/(s.z*s.z));
  SRC(0) SRC(1) SRC(2) SRC(3) SRC(4) SRC(5) SRC(6) SRC(7) SRC(8) SRC(9) SRC(10) SRC(11) SRC(12) SRC(13) SRC(14) SRC(15)
  float eg = float(min(min(ip.x, ip.y), min(N - 1 - ip.x, N - 1 - ip.y)));
  h *= mix(0.94, 1., smoothstep(0., 14., eg));
  o = vec4(h, cc.r, 0., 1.);
}`,Ie=`#version 300 es
`+Ot+`
uniform sampler2D uWv;
uniform sampler2D uB;
uniform sampler2D uA;
uniform sampler2D uNm;
uniform sampler2D uL;
uniform sampler2D uLD;
uniform sampler2D uR;
uniform sampler2D uRD;
uniform sampler2D uW;
out vec4 o;
vec4 gB, gA;
float bakeT(vec3 d, out float cov) {
  cov = 0.;
  float a = atanF(d.x, -d.z), el = asin(clamp(d.y, -1., 1.));
  float v = (el - uS[13].x)/(uS[13].y - uS[13].x);
  if (v <= 0.002 || v >= 0.998) return 1e4;
  vec2 uq = vec2(a*0.15915494 + 0.5, (v*(uS[13].w + uS[13].z) - uS[13].z)/uS[13].w);
  vec2 b = textureLod(uB, uq, 0.).rg;
  cov = b.g;
  if (cov < 0.004) { cov = 0.; return 1e4; }
  gA = textureLod(uA, uq, 0.)/cov; gB = vec4(textureLod(uNm, uq, 0.).rg/cov, 0., 0.);
  float u = b.r/cov;
  return uS[14].w > 0.5 ? u : u*u*10000.;
}
float landT(vec3 ro, vec3 d, out float cov, out vec3 P) {
  vec3 O = vec3(uS[12].x, uS[15].x, uS[12].y);
  P = ro; cov = 0.;
  vec3 dd = d; float t0 = 1e9; vec4 sA = vec4(0.), sB = vec4(0.);
  int st = 0; float c0 = 0., tq = 0.;
  for (int k = 0; k < int(3.*ONE); k++) {
    float cv; float tt = bakeT(dd, cv);
    if (st == 0 && cv < 0.999 && d.y < -1e-5 && ro.y > -d.y*11.) {   // no land lies within 11 m of the eye
      // the eye sits above the panorama's centre, so a ray the centre sees reach the water can still meet the bank first:
      // look again toward where this ray meets the water, and keep the better covered of the two
      c0 = cv; tq = tt; sA = gA; sB = gB;
      st = 1; dd = normalize(ro - d*(ro.y/d.y) - O); continue;
    }
    if (st == 1 && cv < c0 - 0.02) { cv = c0; tt = tq; gA = sA; gB = sB; }
    if (st < 2) {
      if (cv <= 0.) return 1e9;
      cov = cv; t0 = tt; P = ro + d*tt; dd = normalize(P - O); sA = gA; sB = gB; st = 2;
    } else {
      if (cv < cov - 0.02) { gA = sA; gB = sB; return t0; }
      cov = cv; P = O + dd*tt;
      break;
    }
  }
  return length(P - ro);
}
vec3 landC(vec4 bb, vec4 ba, float t, vec3 fc) {
  vec2 ne = bb.rg*2. - 1.;
  vec3 n = normalize(vec3(ne.x, sqrt(max(1. - dot(ne, ne), 0.02)), ne.y));
  vec3 alb = ba.rgb*ba.rgb;
  float hs = ba.a/0.49*0.4 - 0.1, lit = clamp(ba.a*2. - 1., 0., 1.);
  float sT = sunTr();
  float sh = sT > 0.001 && ba.a < 0.495 ? smoothstep(hs - 0.012, hs + 0.006, SUN.y) : 0.;
  float ndl = max(dot(n, SUN), 0.);
  vec3 col = alb*(SUNC*sT*ndl*sh + AMB*(0.5 + 0.5*n.y) + AMB*vec3(0.5, 0.42, 0.36)*0.25*max(-n.y, 0.));
  col += vec3(1., 0.56, 0.22)*smoothstep(0.86 - 0.45*WINL, 0.9 - 0.45*WINL, lit)*(0.35 + 1.4*WINL);
  return mix(col, fc, 1. - exp(-t/FOGD));
}
vec3 waterC(vec3 E, vec3 d, float tw, vec4 L, float lt, vec2 uv, out vec4 M, out vec3 tr, out float F, out vec3 rr) {
  vec3 P = E + d*tw; vec2 q = P.xz;
  float pw = tw*2.*TANH/RES.y;
  // fnote round: a pixel's footprint along the view on the water (pz, metres) is pw/|d.y|, ten to forty times its width
  // far off; a ripple shorter than a few footprints is averaged away there (it was sampled a row at a time: hard-ended pale
  // slivers all over the middle water, and the boats' images cut into sliding bars)
  float pz = pw/max(-d.y, 0.004);
  vec2 g = vec2(0.);
  if (uS[12].w > 0.5) {
    vec2 st = (q - vec2(-130., -250.))/uS[12].z;
    if (st.x > 0.004 && st.y > 0.004 && st.x < 0.996 && st.y < 0.996) {
      float e = uS[15].y;
      float hl = texture(uW, st - vec2(e, 0.)).r, hr = texture(uW, st + vec2(e, 0.)).r;
      float hd = texture(uW, st - vec2(0., e)).r, hu = texture(uW, st + vec2(0., e)).r;
      float fd = smoothstep(0., 0.05, min(min(st.x, st.y), min(1. - st.x, 1. - st.y)))/(1. + pw*1.2);
      g += vec2(hr - hl, hu - hd)/(2.*e*uS[12].z)*fd;
    }
  }
  vec2 w = WIND;
  float pch = smoothstep(0.32, 0.72, texture(uN, q*0.0042 - w*TIME*0.006).g);
  // the long, smooth undulation is everywhere; the fine ripples come in cat's-paw patches (so a patch is a ruffled texture,
  // never a smooth dark stain)
  float gp = GUST*(0.35 + 0.65*smoothstep(0.25, 0.6, texture(uN, q*0.006 - w*TIME*0.02 + 0.5).r));
  float br = BREEZE*0.6 + gp*0.6, brp = BREEZE*(0.12 + 1.5*pch) + gp;
  float ff = 1./(1. + pw*3.);
  vec4 a = texture(uWv, q*0.043 - w*TIME*0.018);
  vec4 b = texture(uWv, q*0.11 + vec2(-w.y, w.x)*TIME*0.011 + 0.37);
  vec4 c3 = texture(uWv, q*0.29 - w*TIME*0.05 + 0.61);
  vec4 c4 = texture(uWv, q*vec2(0.9, 1.3) - w*TIME*0.25 + 0.17);
  vec4 c5 = texture(uWv, q*vec2(2.3, 1.7) + vec2(w.y, -w.x)*TIME*0.3 + 0.83);
  vec4 lp = 1./(1. + pz*pz*vec4(0.03, 0.19, 1.35, 16.));
  vec4 sw = texture(uWv, q*vec2(0.011, 0.006) + vec2(TIME*0.002, 0.));
  vec2 ta = (a.xy - 0.5)*0.2*br, tb = (b.xy - 0.5)*0.15*br, tc = (c3.xy - 0.5)*0.13*ff*brp, ts = (sw.xy - 0.5)*0.045;
  vec2 td = ((c4.xy - 0.5)*0.12 + (c5.xy - 0.5)*0.08*lp.w)*lp.w/(1. + pw*12.)*brp;
  // the sky, the sun's path and the Fresnel see every ripple; the images of edges (the far bank, the boats) see each ripple
  // only as far as it does not fold them: a tilt that changes faster from row to row than the image itself breaks it into
  // hard pale slivers a pixel high (G is that rate per unit slope and frequency, the same at any canvas size)
  float G = 9.*tw/max(-d.y, 0.004);
  vec4 fk = 1./(1. + G*vec4(0.0086*br, 0.0165*br, 0.038*ff*brp, 0.14*brp));
  vec2 gd = g/(1. + G*0.004) + ta*fk.x + tb*fk.y + tc*fk.z + td*fk.w + ts/(1. + G*0.0005);
  g += ta*lp.x + tb*lp.y + tc*lp.z + td + ts;
  vec3 n = normalize(vec3(-g.x, 1., -g.y));
  vec3 r = reflect(d, n); r.y = abs(r.y) + 0.0015;
  vec3 r2 = reflect(d, normalize(vec3(-gd.x, 1., -gd.y))); r2.y = abs(r2.y) + 0.0015;
  float ci = max(dot(-d, n), 0.);
  F = 0.02 + 0.98*pow(1. - ci, 5.);
  rr = r2;
  vec2 fh = normalize(CF.xz + vec2(1e-6, 0.)), rh = normalize(CR.xz + vec2(1e-6, 0.));
  vec2 dl = -gd;
  vec2 off = vec2(-d.y*dot(dl, rh), dot(dl, fh))/TANH*0.5;
  // a tilted facet moves a reflection on screen by the share of the reflected ray that lies beyond the water: the sky by
  // the whole offset, a hull's own waterline not at all (so no sky seam opens under a hull, no ragged blocks at its edges)
  // (one depth read where the pixel is: the shift now changes smoothly across an image; with a second read at the shifted
  // place it jumped wherever the two disagreed)
  float wz = tw*dot(d, CF), m0 = textureLod(uRD, uv, 0.).r;
  off *= clamp(1. - wz*(1. - m0)/0.15, 0., 1.);
  M = texture(uR, uv + off);
  // a reflection is the thing's own colour a tone darker and greyer, never deeper in hue than the thing itself
  M.rgb = mix(vec3(dot(M.rgb, vec3(0.3, 0.55, 0.15))), M.rgb, 0.8)*vec3(0.88, 1., 0.86);
  vec3 deep = vec3(0.022, 0.05, 0.042)*(AMB*1.3 + SUNC*sunTr()*0.3);
  tr = deep;
  if (lt > tw && lt < 1e8) tr = L.rgb + deep*(1. - L.a);
  return r;
}
vec3 aces(vec3 x) { return clamp(x*(2.51*x + 0.03)/(x*(2.43*x + 0.59) + 0.14), 0., 1.); }
void main() {
  vec2 uv = gl_FragCoord.xy/RES;
  vec3 d = normalize(CF + CR*((2.*uv.x - 1.)*TANH) + CU*((2.*uv.y - 1.)*TANH));
  vec3 E = EYE;
  float fz = max(dot(d, CF), 1e-3);
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec4 L = texelFetch(uL, ip, 0);
  float ld = texelFetch(uLD, ip, 0).r;
  float lt = ld < 0.9999995 ? 0.15/max(1. - ld, 1e-7)/fz : 1e9;
  float tw = d.y < -1e-5 ? -E.y/d.y : 1e9;
  float lc = 0., tl = 1e9, lc2 = 0., tl2 = 1e9; vec3 LP = E, LP2 = E;
  bool lf = false, wat = false, opq = false;
  vec4 M = vec4(0.); vec3 tr = vec3(0.), r = d; float F = 0.;
  vec4 gB1 = vec4(0.), gA1 = vec4(0.);
  // the water's own look first, outside the loop (its mipmapped lookups compile far faster on D3D there)
  vec3 rs = d;
  if (tw < 1e8) rs = waterC(E, d, tw, L, lt, uv, M, tr, F, r);
  for (int k = 0; k < int(2.*ONE); k++) {
    vec3 ro = E, dd = d;
    if (k == 1) { if (!wat || lf) break; ro = E + d*tw; dd = r; }
    float cv; vec3 PP; float tt = landT(ro, dd, cv, PP);
    if (k == 0) {
      lc = cv; tl = tt; LP = PP; gB1 = gB; gA1 = gA;
      lf = lc > 0.001 && tl < tw;
      if (L.a > 0.997 && lt < (lf ? tl : tw)) { opq = true; break; }
      wat = tw < 1e8 && !(lf && lc > 0.999);
    } else { lc2 = cv; tl2 = tt; LP2 = PP; }
  }
  float bgT = lf ? tl : tw;
  vec3 col;
  if (opq) col = L.rgb;
  else {
    vec3 fc = fogC(d);
    vec3 bg = skyC(wat ? rs : d, 1.);
    vec3 lcol = vec3(0.);
    if (lf || lc2 > 0.001) lcol = landC(lf ? gB1 : gB, lf ? gA1 : gA, lf ? tl : tl2 + tw*0.3, fc);
    if (wat) {
      // under a partly covered land pixel the water is the shore's own reflection (lcol is already fogged)
      vec3 env = mix(bg, lcol, lf ? 1. : lc2);
      env = M.rgb + env*(1. - M.a);
      bg = mix(mix(tr, env, F), fc, lf ? 0. : 1. - exp(-tw/FOGD));
    }
    if (lf) bg = mix(bg, lcol, lc);
    col = lt < bgT ? L.rgb + bg*(1. - L.a) : bg;
  }
  col *= EXPO;
  col = aces(col);
  vec2 vq = uv - 0.5;
  col *= 1. - 0.22*dot(vq, vq);
  col = pow(col, vec3(1./2.2));
  col += (texelFetch(uN, ivec2(mod(gl_FragCoord.xy + vec2(uS[15].z, uS[15].z*0.37), 256.)), 0).b - 0.5)*0.016;
  o = vec4(col, 1.);
}`,We=`#version 300 es
`+N0+`
in vec4 r0; in vec4 r1; in vec4 r2; in vec4 r3; in vec4 r4;
flat out vec4 v0; flat out vec4 v1; flat out vec4 v2; flat out vec4 v3; flat out vec4 v4;
void main() {
  int k = gl_VertexID;
  vec2 cn = vec2((k == 1 || k == 4 || k == 5) ? 1. : 0., (k == 2 || k == 3 || k == 5) ? 1. : 0.);
  v0 = r0; v1 = r1; v2 = r2; v3 = r3; v4 = r4;
  vec3 C = r0.xyz; if (MIR > 0.5) C.y = -C.y;
  float Rb = r0.w;
  vec3 dv = C - EYE;
  vec3 v = vec3(dot(dv, CR), dot(dv, CU), dot(dv, CF));
  vec2 lo = vec2(-1.), hi = vec2(1.);
  gl_Position = vec4(2., 2., 2., 1.);
  if (v.z + Rb < 0.05) return;
  if (MIR > 0.5 && r0.y + Rb < 0.) return;
  if (v.z - Rb > 0.1 && length(dv) > Rb*1.05) {
    float zn = v.z - Rb, zf = v.z + Rb;
    vec2 a = min((v.xy - Rb)/zn, (v.xy - Rb)/zf), b = max((v.xy + Rb)/zn, (v.xy + Rb)/zf);
    lo = max(a/TANH, vec2(-1.)); hi = min(b/TANH, vec2(1.));
    if (lo.x >= hi.x || lo.y >= hi.y) return;
  }
  gl_Position = vec4(mix(lo, hi, cn), 0., 1.);
}`,He=`#version 300 es
`+Ot+`
uniform highp sampler3D uN3;
flat in vec4 v0; flat in vec4 v1; flat in vec4 v2; flat in vec4 v3; flat in vec4 v4;
out vec4 o;
float sdE(vec3 p, vec3 r) { float k0 = length(p/r), k1 = length(p/(r*r)); return k0*(k0 - 1.)/max(k1, 1e-5); }
vec4 n3(vec3 p) { vec3 x = p*32. - 0.5, i = floor(x), f = x - i; f = f*f*(3. - 2.*f); return textureLod(uN3, (i + f + 0.5)/32., 0.); }
float smin(float a, float b, float k) { float h = clamp(0.5 + 0.5*(b - a)/k, 0., 1.); return mix(b, a, h) - k*h*(1. - h); }
// granite corestones: each lobe a rounded block (between an ellipsoid and a box), and the lobes parted by straight joints:
// a joint is a planar gap between two blocks, its walls flat
float sdB(vec3 p, vec3 r) { vec3 q = abs(p)/r; q *= q*q; return 0.55*sdE(p, r) + 0.45*(pow(q.x + q.y + q.z, 0.3333) - 1.)*min(r.x, min(r.y, r.z)); }
vec4 jPl(int i) {
  vec4 Lb = i == 0 ? v3 : v4;
  vec2 dx = normalize(Lb.xz - v2.xz + vec2(1e-4, 0.));
  float tl = (fract(v1.y*(i == 0 ? 3.7 : 5.3)) - 0.5)*0.5;
  vec3 n = normalize(vec3(dx.x + tl*dx.y, 0.12*(fract(v1.y*7.1) - 0.5), dx.y - tl*dx.x));
  vec3 c = mix(v2.xyz, Lb.xyz, 0.42 + 0.12*fract(v1.y*2.3));
  return vec4(n, dot(c, n));
}
float rockD(vec3 p) {
  float sy = v1.z, d = 1e9;
  for (int i = 0; i < int(3.*ONE); i++) {
    vec4 Lb = i == 0 ? v2 : i == 1 ? v3 : v4;
    if (Lb.w <= 0.) continue;
    vec3 rr = i == 0 ? vec3(Lb.w, Lb.w*sy, Lb.w*0.9) : i == 1 ? vec3(Lb.w*0.92, Lb.w*sy*1.05, Lb.w) : vec3(Lb.w, Lb.w*sy*0.95, Lb.w*0.85);
    float e = sdB(p - Lb.xyz, rr);
    d = i == 0 ? e : smin(d, e, 0.3*Lb.w);
  }
  if (d > 0.3*v2.w) return d - 0.16*v2.w;
  float n1 = n3(p*0.034 + v1.y).r - 0.5;
  float n2 = n3(p*0.13 + v1.y*1.7).g - 0.5;
  d += n1*0.2*v2.w + n2*0.04*v2.w;
  float sv = n3(p*0.05 + v1.y*2.9).b + (n3(p*0.4 + v1.y).g - 0.5)*0.05;
  d += smoothstep(0.555, 0.58, sv)*0.028*v2.w;
  for (int i = 0; i < int(2.*ONE); i++) {
    if ((i == 0 ? v3.w : v4.w) <= 0.) continue;
    vec4 J = jPl(i);
    float cp = abs(dot(p, J.xyz) - J.w) - 0.012*v2.w - 0.025;
    d = -smin(-d, cp, 0.06*v2.w);
  }
  if (v1.w > -5.) {
    vec3 cn = normalize(vec3(sin(v1.w), 0.3, cos(v1.w)));
    float cp = abs(dot(p - mix(v2.xyz, v3.xyz, 0.8), cn)) - 0.012*v2.w - 0.02;
    d = -smin(-d, cp, 0.04*v2.w);
  }
  return d;
}
float crk(vec3 p) {
  float s = v1.y*3.7;
  vec3 a = normalize(vec3(sin(s), 0.35*cos(s*1.7), cos(s))), b = normalize(vec3(cos(s*2.3), 0.9, sin(s*2.3)));
  vec4 nw = n3(p*0.21 + v1.y);
  float w = (nw.r - 0.5)*0.12 + (nw.a - 0.5)*0.03;
  float c1 = abs(dot(p - v2.xyz, a) + w);
  vec4 mk = n3(p*0.11 + 0.5);
  float c2 = abs(dot(p - v2.xyz - a*v2.w*0.35, b) + w*0.7) + 0.03*smoothstep(0.45, 0.6, mk.b);
  vec3 c = normalize(vec3(cos(s*0.6 + 1.), 0.25, sin(s*0.6 + 1.)));
  float c3 = abs(dot(p - v3.xyz, c) + w*0.8) + 0.03*smoothstep(0.5, 0.62, mk.r);
  return min(min(c1, c2), c3)*0.25;
}
float gCk = 1.;
float rockDet(vec3 p, float ee) {
  float k = 1. - smoothstep(0.004, 0.03, ee);
  gCk = crk(p);
  return 0.028*(1. - smoothstep(0.004, 0.02, gCk)) + k*(n3(p*2.3 + v1.y).a - 0.5)*0.006 + k*k*(n3(p*7.9).r - 0.5)*0.0014;
}
void main() {
  vec2 uv = gl_FragCoord.xy/RES;
  vec3 dr = normalize(CF + CR*((2.*uv.x - 1.)*TANH) + CU*((2.*uv.y - 1.)*TANH));
  vec3 ro = EYE, rd = dr;
  if (MIR > 0.5) { ro.y = -ro.y; rd.y = -rd.y; }
  float cy = cos(v1.x), sy = sin(v1.x);
  vec3 oc = ro - v0.xyz;
  vec3 lo = vec3(cy*oc.x - sy*oc.z, oc.y, sy*oc.x + cy*oc.z);
  vec3 ld = vec3(cy*rd.x - sy*rd.z, rd.y, sy*rd.x + cy*rd.z);
  float Rb = v0.w;
  float bb = dot(lo, ld), cc = dot(lo, lo) - Rb*Rb, disc = bb*bb - cc;
  if (disc < 0.) discard;
  float sq = sqrt(disc);
  float t = max(-bb - sq, 0.02), t1 = -bb + sq;
  if (t1 < 0.) discard;
  float lt0 = 1e9, lt1 = -1.;
  for (int i = 0; i < int(3.*ONE); i++) {
    vec4 Lb = i == 0 ? v2 : i == 1 ? v3 : v4;
    if (Lb.w <= 0.) continue;
    float lr = Lb.w*max(1., v1.z*1.1)*1.32 + 0.04;
    vec3 oo = lo - Lb.xyz; float b2 = dot(oo, ld), c2 = dot(oo, oo) - lr*lr, h2 = b2*b2 - c2;
    if (h2 > 0.) { float sh = sqrt(h2); lt0 = min(lt0, -b2 - sh); lt1 = max(lt1, -b2 + sh); }
  }
  if (lt1 < 0.) discard;
  float ytop = max(v2.y + v2.w*v1.z*1.25, max(v3.y + v3.w*v1.z*1.3, v4.w > 0. ? v4.y + v4.w*v1.z*1.3 : -1e3)) + 0.12*v2.w;
  if (lo.y > ytop && ld.y >= 0.) discard;
  t = max(t, lt0); t1 = min(t1, lt1);
  if (MIR > 0.5) { if (ld.y <= 0.) discard; t = max(t, -lo.y/ld.y); if (t > t1) discard; }
  float pix = 2.*TANH/RES.y;
  float best = 1e9, bt = t, cov = 0., ee = 0.004;
  bool hit = false;
  vec3 Ls = vec3(cy*SUN.x - sy*SUN.z, SUN.y, sy*SUN.x + cy*SUN.z);
  float sT = sunTr(), sh = 1., ao = 1., st = 0.03 + 0.01*v2.w;
  vec3 nl = vec3(0.), lp = lo;
  int NM = int(48.*uS[15].w), NS = int(14.*uS[15].w), ph = 0, j = 0, nm = 0;
  for (int i = 0; i < NM + 5 + NS; i++) {
    vec3 kk = vec3(j == 0 || j == 3 ? 1. : -1., j == 1 || j == 3 ? 1. : -1., j == 2 || j == 3 ? 1. : -1.);
    vec3 q = ph == 0 ? lo + ld*t : ph == 1 ? lp + kk*ee : ph == 2 ? lp + normalize(nl)*0.25*v2.w : lp + normalize(nl)*0.01 + Ls*st;
    float h = rockD(q) + (ph == 1 ? rockDet(q, ee) : 0.);
    if (ph == 0) {
      float ratio = h/(t*pix);
      if (ratio < best) { best = ratio; bt = t; }
      nm++;
      if (h < t*pix*0.35) { hit = true; bt = t; }
      else t += h*0.82;
      if (hit || t > t1 || nm >= NM) {
        cov = hit ? 1. : clamp(1. - best, 0., 1.);
        if (cov < 0.02) discard;
        t = bt; lp = lo + ld*t; ee = max(0.004, t*pix*0.7); ph = 1; j = 0;
      }
    } else if (ph == 1) { nl += kk*h; j++; if (j == 4) ph = 2; }
    else if (ph == 2) {
      ao = clamp(0.45 + 0.55*h/(0.25*v2.w), 0.3, 1.);
      if (sT < 0.001 || dot(normalize(nl), Ls) < 0.) { sh = 0.; break; }
      ph = 3;
    } else { sh = min(sh, 10.*h/st); st += clamp(h, 0.03, 0.5*v2.w); if (sh < 0.02 || st > 3.*v2.w) break; }
  }
  sh = clamp(sh, 0., 1.);
  nl = normalize(nl);
  vec3 W = ro + rd*t;
  if (W.y < 0. && MIR > 0.5) discard;
  vec3 n = vec3(cy*nl.x + sy*nl.z, nl.y, -sy*nl.x + cy*nl.z);
  float ndl = dot(n, SUN);
  float g1 = textureLod(uN3, lp*0.6 + v1.y*3.1, 0.).b, g2 = textureLod(uN3, lp*5.3 + v1.y, 0.).a, g3 = textureLod(uN3, lp*0.07 + v1.y*0.6, 0.).r;
  float g5 = textureLod(uN3, lp*0.21 + v1.y*2.3, 0.).b;
  float fw = clamp(t*pix*14., 0., 1.);
  float sv = n3(lp*0.05 + v1.y*2.9).b + (n3(lp*0.4 + v1.y).g - 0.5)*0.05;
  float fresh = smoothstep(0.555, 0.58, sv);
  float rim = fresh*(1. - smoothstep(0.58, 0.59, sv));
  // the joint walls: fresher, redder granite, darker deep in the gap
  float jw = 1e3;
  for (int i = 0; i < int(2.*ONE); i++) { if ((i == 0 ? v3.w : v4.w) <= 0.) continue; vec4 J = jPl(i); jw = min(jw, abs(dot(lp, J.xyz) - J.w) - 0.012*v2.w - 0.025); }
  float jf = 1. - smoothstep(0.02, 0.1 + 0.05*v2.w, jw);
  // black desert varnish over the tops and most of the sides, thinning in patches to the red-grey granite under it
  float varn = smoothstep(0.3, 0.62, g5*0.7 + 0.3*g3 + 0.28*n.y)*(1. - jf*0.85);
  vec3 skin = vec3(0.042, 0.032, 0.027)*(0.75 + 0.5*g1)*(0.85 + 0.3*g3);
  vec3 gran = vec3(0.36, 0.24, 0.2)*(0.8 + 0.3*g1);
  float sp = textureLod(uN3, lp*9.7 + v1.y, 0.).g, sp2 = textureLod(uN3, lp*13.1 + 0.3, 0.).b;
  gran = mix(gran, vec3(0.04, 0.035, 0.035), smoothstep(0.62, 0.7, sp)*(1. - fw)*0.8);
  gran = mix(gran, vec3(0.55, 0.47, 0.43), smoothstep(0.66, 0.74, sp2)*(1. - fw)*0.6);
  gran = mix(gran, vec3(0.27, 0.19, 0.16), fw*0.5);
  vec3 weat = mix(gran, vec3(0.16, 0.11, 0.09)*(0.8 + 0.4*g1), 0.55);
  vec3 alb = mix(weat, skin, varn);
  alb = mix(alb, gran, max(fresh*(0.7 - 0.3*smoothstep(0.6, 0.8, g5)), jf*0.8));
  alb *= 1. + (g2 - 0.5)*0.4*(1. - fw);
  alb = mix(alb, alb*1.4 + 0.02, rim*0.5);
  alb *= 1. - 0.55*smoothstep(0.06, 0.0, jw);
  float ck = 1. - smoothstep(0.003, 0.012 + 0.02*fw, gCk);
  alb *= 1. - 0.6*ck;
  float dust = smoothstep(0.6, 0.92, n.y)*smoothstep(0.45, 0.8, g5)*smoothstep(0.5, 0.9, W.y);
  alb = mix(alb, vec3(0.3, 0.23, 0.17)*(0.85 + 0.3*g2), dust*0.45);
  // the bleached band the river left above the water (pale, with drips down from its top edge) and the dark wet line
  float wl = W.y + (g1 - 0.5)*0.08 + (g2 - 0.5)*0.03*(1. - fw);
  float wet = 1. - smoothstep(0.04, 0.14, wl);
  float drip = textureLod(uN3, vec3(lp.x*2.2, lp.y*0.15, lp.z*2.2) + v1.y, 0.).r;
  float crust = smoothstep(0.06, 0.12, wl)*(1. - smoothstep(0.2 + 0.25*g3 + 0.3*drip, 0.26 + 0.25*g3 + 0.3*drip, wl));
  crust *= 0.6 + 0.4*smoothstep(0.3, 0.6, textureLod(uN3, vec3(lp.x*3., lp.y*0.4, lp.z*3.) + v1.y, 0.).r);
  alb = mix(alb, vec3(0.5, 0.46, 0.41)*(0.8 + 0.3*g2), crust*0.8);
  alb *= 1. - 0.6*wet;
  varn *= 1. - crust;
  float rough = mix(mix(mix(0.42, 0.24, varn), 0.6, max(fresh, max(dust, crust))), 0.1, wet);
  vec3 v = -rd;
  vec3 hh = normalize(SUN + v);
  float nh = max(dot(n, hh), 0.), a2 = rough*rough*rough*rough;
  float D = a2/(3.14159*pow(nh*nh*(a2 - 1.) + 1., 2.));
  float Fs = 0.04 + 0.96*pow(1. - max(dot(hh, v), 0.), 5.);
  float spec = D*Fs*0.25*max(ndl, 0.)/max(dot(n, v)*0.5 + 0.5, 0.2);
  vec3 rf = reflect(-v, n);
  vec3 col = alb*(SUNC*sT*max(ndl, 0.)*sh + AMB*ao*(0.45 + 0.55*n.y) + AMB*vec3(0.6, 0.48, 0.4)*0.35*max(-n.y, 0.)*ao);
  col += SUNC*sT*spec*sh + skyB(rf)*(0.03 + 0.08*wet + 0.035*varn)*ao*(1. - rough*0.6);
  vec3 Wv = W; if (MIR > 0.5) Wv.y = -Wv.y;
  if (W.y < 0. && MIR < 0.5) {
    float dep = -W.y;
    float at = exp(-dep*(1.6 + 1.6/max(-dr.y, 0.12)));
    vec3 deep = vec3(0.016, 0.04, 0.034)*(AMB*1.3 + SUNC*sT*0.3);
    col = mix(deep, col*vec3(0.55, 0.75, 0.6), at);
  }
  col = fogIt(col, dr, t);
  float vz = t*dot(dr, CF);
  gl_FragDepth = 1. - 0.15/max(vz, 0.3);
  o = vec4(sqrt(max(col*cov*0.5, 0.)), cov);
}`,Oe=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
uniform sampler2D uL; uniform sampler2D uLD;
out vec4 o;
uniform float uCs;
void main() { ivec2 ip = ivec2(gl_FragCoord.xy*uCs); vec4 c = texelFetch(uL, ip, 0); if (c.a <= 0.) discard; o = vec4(c.rgb*c.rgb*2., c.a); gl_FragDepth = texelFetch(uLD, ip, 0).r; }`,Ge=`#version 300 es
`+N0+`
in vec4 h0; in vec4 h1; in vec4 h2;
out vec3 vW; out vec3 vO; out vec3 vL; flat out vec4 vP;
void main() {
  int NU = 26, NV = 16;
  int q = gl_VertexID/6, k = gl_VertexID - q*6;
  int iu = q - (q/NU)*NU, iv = q/NU;
  float ox = (k == 1 || k == 4 || k == 5) ? 1. : 0., oy = (k == 2 || k == 3 || k == 5) ? 1. : 0.;
  float u = (float(iu) + ox)/float(NU), v = -1. + 2.*(float(iv) + oy)/float(NV);
  float L = h1.x, B = h1.y, F = h2.y;
  // a full, round stern and a fine bow whose stem sweeps up
  float hb = 0.5*B*pow(max(sin(3.14159*u), 0.), u < 0.5 ? 0.3 : 0.5)*(1. - 0.25*u*u);
  float yt = F + 0.22*(1. - u)*(1. - u) + 1.05*pow(u, 2.6);
  float yb = -0.4*pow(max(sin(3.14159*u), 0.), 0.6);
  float th = v*1.5708;
  float sx = hb*sign(v)*pow(abs(sin(th)), 0.55);
  float yy = yt - (yt - yb)*pow(cos(th), 0.9);
  float a = (u - 0.5)*L;
  float ps = h0.w, ph = h1.z, pt = h1.w;
  vec3 f = vec3(sin(ps), 0., -cos(ps)), s = vec3(cos(ps), 0., sin(ps)), up = vec3(0., 1., 0.);
  vec3 U = cos(ph)*up + sin(ph)*s, S = cos(ph)*s - sin(ph)*up;
  vec3 Fv = cos(pt)*f + sin(pt)*U; U = cos(pt)*U - sin(pt)*f;
  vec3 W = h0.xyz + Fv*a + U*yy + S*sx;
  float ym = 0.5*(yt + yb);
  vO = normalize(U*(yy - ym)*0.6 + S*sx + Fv*(u - 0.5)*0.3);
  vW = W; vL = vec3(u, v, yy); vP = h2;
  vec3 Wp = W; if (MIR > 0.5) Wp.y = -Wp.y;
  vec3 dv = Wp - EYE;
  vec3 vv = vec3(dot(dv, CR), dot(dv, CU), dot(dv, CF));
  gl_Position = vec4(vv.x/TANH, vv.y/TANH, vv.z - 0.3, vv.z);
}`,Ye=`#version 300 es
`+N0+st+`
in vec3 vW; in vec3 vO; in vec3 vL; flat in vec4 vP;
out vec4 o;
void main() {
  vec3 W = vW;
  if (MIR > 0.5 && W.y < -0.08) discard;
  vec3 Wv = W; if (MIR > 0.5) Wv.y = -Wv.y;
  vec3 dv = Wv - EYE; float dist = length(dv); vec3 vd = dv/dist;
  vec3 vo = vd; if (MIR > 0.5) vo.y = -vo.y;
  vec3 n = normalize(cross(dFdx(vW), dFdy(vW)));
  if (dot(n, vo) > 0.) n = -n;
  bool inside = dot(vO, n) < -0.05;
  float pid = vP.x, v = vL.y, u = vL.x;
  float gr = texture(uN, vec2(u*3.1, vL.z*0.8) + pid*0.13).r;
  // painted planking, worn: a pale or coloured hull, a broad coloured sheer strake with a thin line under it, a dark
  // tarred gunwale cap, rust and water streaks running down, a dark weed line at the water
  vec3 hull = pid < 0.5 ? vec3(0.6, 0.58, 0.52) : pid < 1.5 ? vec3(0.56, 0.55, 0.5) : pid < 2.5 ? vec3(0.26, 0.4, 0.46) : vec3(0.26, 0.17, 0.1);
  vec3 band = pid < 0.5 ? vec3(0.05, 0.16, 0.36) : pid < 1.5 ? vec3(0.07, 0.27, 0.19) : pid < 2.5 ? vec3(0.62, 0.48, 0.16) : vec3(0.42, 0.12, 0.07);
  vec3 alb = hull*(0.82 + 0.3*gr);
  float av = abs(v), pl = fract(av*7.);
  alb *= 0.9 + 0.1*smoothstep(0., 0.12, pl);
  alb = mix(alb, band, smoothstep(0.7, 0.72, av));
  alb = mix(alb, band*0.4 + 0.25, smoothstep(0.645, 0.655, av)*(1. - smoothstep(0.67, 0.68, av)));
  alb = mix(alb, vec3(0.06, 0.045, 0.035), smoothstep(0.93, 0.95, av));
  float stk = texture(uN, vec2(u*14., av*0.25) + pid*0.3).r;
  alb *= 1. - 0.3*smoothstep(0.5, 0.8, stk)*(0.5 + 0.5*av);
  alb = mix(alb, vec3(0.05, 0.045, 0.03), smoothstep(0.2, 0.1, vL.z)*(1. - smoothstep(0.84, 0.88, av)));
  alb *= 1. - 0.25*smoothstep(0.55, 0.8, texture(uN, vec2(u*9., v*0.7) + pid).g);
  if (inside) alb = vec3(0.36, 0.26, 0.16)*(0.7 + 0.5*gr);   // the open inside: lighter, worn bare wood
  float sT = sunTr();
  float ndl = max(dot(n, SUN), 0.);
  vec3 col = alb*(SUNC*sT*ndl*(inside ? 0.35 : 1.) + AMB*(0.5 + 0.5*n.y)*(inside ? 0.6 : 1.) + AMB*vec3(0.6, 0.5, 0.4)*0.4*max(-n.y, 0.));
  vec3 hh = normalize(SUN - vo);
  col += SUNC*sT*0.12*pow(max(dot(n, hh), 0.), 40.)*(inside ? 0. : 1.);
  col += vec3(1., 0.6, 0.28)*LAMP*vP.z*(inside ? 0.05 : 0.012);
  if (W.y < 0. && MIR < 0.5) {
    float at = exp(-(-W.y)*(1.6 + 1.6/max(-vd.y, 0.12)));
    vec3 deep = vec3(0.016, 0.04, 0.034)*(AMB*1.3 + SUNC*sT*0.3);
    col = mix(deep, col*vec3(0.55, 0.75, 0.6), at);
  }
  col = fogIt(col, vd, dist);
  float fd = vP.w;
  o = vec4(col*fd, fd);
}`,Ve=`#version 300 es
`+N0+`
in vec4 s0; in vec4 s1; in vec4 s2; in vec4 s3;
out vec3 vW; out vec3 vN; out vec2 vSC; flat out vec4 vI;
vec3 sailP(float s, float c) {
  vec3 Y = mix(s0.xyz, s1.xyz, s), Z = mix(s2.xyz, s1.xyz, s);
  vec3 P = mix(Y, Z, c);
  float camb = 2.6*c*pow(max(1. - c, 0.), 1.35);
  float along = min(s*5., 1.)*pow(1. - s, 0.6);
  P += s3.xyz*camb*along;
  vec3 nn = normalize(cross(s1.xyz - s0.xyz, s2.xyz - s0.xyz));
  P += nn*s0.w*sin(9.*c - 11.*TIME + s1.w + 3.*s)*c*along;
  return P;
}
void main() {
  int NS = 20, NC = 16;
  int q = gl_VertexID/6, k = gl_VertexID - q*6;
  int ic = q - (q/NC)*NC, is = q/NC;
  float ox = (k == 1 || k == 4 || k == 5) ? 1. : 0., oy = (k == 2 || k == 3 || k == 5) ? 1. : 0.;
  float c = (float(ic) + ox)/float(NC), s = (float(is) + oy)/float(NS);
  s = 1. - (1. - s)*(1. - s)*0.35 - (1. - s)*0.65;
  vec3 P = vec3(0.), Ps = vec3(0.), Pc = vec3(0.);
  for (int i = 0; i < int(3.*ONE); i++) {
    vec3 X = sailP(i == 1 ? min(s + 0.02, 1.) : s, i == 2 ? c + 0.02 : c);
    if (i == 0) P = X; else if (i == 1) Ps = X; else Pc = X;
  }
  vN = cross(Ps - P, Pc - P);
  vW = P; vSC = vec2(s, c); vI = vec4(s2.w, s3.w, length(s2.xyz - s0.xyz), 0.);
  vec3 Wp = P; if (MIR > 0.5) Wp.y = -Wp.y;
  vec3 dv = Wp - EYE;
  vec3 vv = vec3(dot(dv, CR), dot(dv, CU), dot(dv, CF));
  gl_Position = vec4(vv.x/TANH, vv.y/TANH, vv.z - 0.3, vv.z);
}`,Xe=`#version 300 es
`+N0+st+`
in vec3 vW; in vec3 vN; in vec2 vSC; flat in vec4 vI;
out vec4 o;
float lineAA(float dl, float hw, float fw) { float we = max(2.*hw, fw); return clamp((we*0.5 - dl)/fw + 0.5, 0., 1.)*(2.*hw/we); }
void main() {
  vec3 W = vW;
  if (MIR > 0.5 && W.y < 0.) discard;
  float s = vSC.x, c = vSC.y;
  float fc = max(fwidth(c), 1e-4), fs = max(fwidth(s), 1e-4);
  float al = clamp(min(min(c, 1. - c)/fc, s/fs) + 0.3, 0., 1.);
  vec3 Wv = W; if (MIR > 0.5) Wv.y = -Wv.y;
  vec3 dv = Wv - EYE; float dist = length(dv); vec3 vd = dv/dist;
  vec3 vo = vd; if (MIR > 0.5) vo.y = -vo.y;
  vec3 n = normalize(vN); if (dot(n, vo) > 0.) n = -n;
  float seed = floor(vI.x), fam = fract(vI.x);
  // cotton cloths sewn edge to edge: soft, slightly wandering seams (a double layer the light shows through darker), panel
  // tones that differ a little (more on a weathered sail), dirt and water stains working up from the foot, a tabled hem
  float NP = max(vI.z/0.6, 6.);
  float wob = (texture(uN, vec2(s*0.9, c*0.2) + seed*0.031).g - 0.5)*0.06;
  float pc = (1. - c)*(1. - s)*NP + wob;
  float dpc = abs(fract(pc + 0.5) - 0.5);
  float seam = lineAA(dpc, 0.08, max(fwidth(pc), 1e-4) + 0.04);
  float ly = 1. + seam*0.45;
  float pv = texelFetch(uN, ivec2(mod(vec2(floor(pc)*5. + seed*7., seed*3. + 9.), 256.)), 0).b;
  float wth = step(0.5, fam);
  float hem = smoothstep(0.12, 0.0, (1. - c)*vI.z*(1. - s)) + smoothstep(0.03, 0.0, s);
  ly += min(hem, 1.)*1.2;
  float lace = smoothstep(0.04, 0., c)*0.22;
  float wc = 0.16/max((1. - s)*vI.z, 0.3), dm = abs(c - 0.38*(1. - s/0.39));
  float msh = s < 0.39 ? smoothstep(wc*1.6, wc*0.4, dm)*0.6 : 0.;
  float grime = texture(uN, vec2(c*2.3, s*4.1) + seed*0.07).r;
  float streak = texture(uN, vec2(pc*0.37, s*0.35) + seed*0.11).g;
  vec3 alb = mix(vec3(0.86, 0.82, 0.74), vec3(0.74, 0.66, 0.54), wth)*(0.88 + 0.16*grime)*(0.96 + (0.08 + 0.16*wth)*(pv - 0.5));
  float foot = smoothstep(0.32 + 0.12*grime, 0.0, s);
  alb *= 1. - (0.2 + 0.18*wth)*foot*(0.5 + grime) - (0.06 + 0.12*wth)*smoothstep(0.55, 0.8, streak)*(1. - s);
  ly += foot*0.25*wth;
  bool och = vI.y > 5.;
  if (och) alb = mix(alb, vec3(0.78, 0.48, 0.22), 0.8);
  alb *= 1. - lace;
  float sT = sunTr();
  float ndl = dot(n, SUN);
  sT *= 1. - msh;
  vec3 refl = alb*(SUNC*sT*max(ndl, 0.)*(1. - 0.15*seam) + AMB*(0.55 + 0.45*n.y) + AMB*vec3(0.62, 0.5, 0.4)*0.35*max(-n.y, 0.));
  float tau = 0.85*exp(-1.25*(ly - 1.))*(0.82 + 0.36*pv)*(0.75 + 0.25*smoothstep(0., 0.5, c));
  float fwd = pow(max(dot(vo, SUN), 0.), 5.);
  vec3 trans = alb*SUNC*sT*tau*(max(-ndl + 0.15, 0.)*1.1 + fwd*1.3*step(ndl, 0.)) + alb*AMB*tau*0.22;
  trans *= mix(vec3(1.), vec3(1.1, 0.84, 0.58), smoothstep(0.3, 0.85, c)*0.75);
  vec3 col = refl + trans;
  col += vec3(1., 0.58, 0.26)*LAMP*0.35*smoothstep(0.35, 0.0, s)*(0.4 + c*0.6);
  col = fogIt(col, vd, dist);
  float fd = clamp(vI.y - (och ? 10. : 0.), 0., 1.);
  o = vec4(col*al*fd, al*fd);
}`,Ze=`#version 300 es
`+N0+`
in vec4 iA; in vec4 iB; in vec4 iM;
flat out vec4 vP; flat out vec4 vQ; flat out vec4 vM; flat out vec3 vA; flat out vec3 vB; flat out vec2 vZ;
void main() {
  int k = gl_VertexID;
  vec2 cn = vec2((k == 1 || k == 4 || k == 5) ? 1. : -1., (k == 2 || k == 3 || k == 5) ? 1. : -1.);
  vec3 A = iA.xyz, B = iB.xyz;
  float hue = floor(iM.w/8. + 0.001), kind = iM.w - hue*8.;
  if (hue > 2.5 && hue < 4.5) {
    float sw = (0.012 + GUST*0.03)*(0.6 + 0.4*sin(TIME*1.7 + A.x*0.7 + A.z*0.4));
    vec3 wv = vec3(WIND.x, 0., WIND.y)*sw;
    A += wv*max(A.y - 0.4, 0.)*(hue > 3.5 ? 2.5 : 0.25); B += wv*max(B.y - 0.4, 0.)*(hue > 3.5 ? 2.5 : 0.25);
  }
  gl_Position = vec4(2., 2., 2., 1.);
  vP = vec4(0.); vQ = vec4(0.); vM = iM; vA = A; vB = B; vZ = vec2(1.);
  vec3 A0 = A, B0 = B;
  if (MIR > 0.5) { if (A.y < 0. && B.y < 0.) return; A.y = -A.y; B.y = -B.y; }
  vec3 da = A - EYE, db = B - EYE;
  vec3 a = vec3(dot(da, CR), dot(da, CU), dot(da, CF)), b = vec3(dot(db, CR), dot(db, CU), dot(db, CF));
  float nr = 0.12;
  if (a.z < nr && b.z < nr) return;
  float ta = a.z < nr ? (nr - a.z)/(b.z - a.z) : 0., tb = b.z < nr ? (nr - a.z)/(b.z - a.z) : 1.;
  vec3 a2 = mix(a, b, ta), b2 = mix(a, b, tb);
  float fp = RES.y*0.5/TANH;
  vec2 pa = RES*0.5 + a2.xy/a2.z*fp, pb = RES*0.5 + b2.xy/b2.z*fp;
  float rpa = mix(iA.w, iB.w, ta)*fp/a2.z, rpb = mix(iA.w, iB.w, tb)*fp/b2.z;
  float mr = 0.6, cov = 1.;
  if (kind < 1.5 || kind > 2.5) { cov = clamp(max(rpa, rpb)/mr, 0., 1.); rpa = max(rpa, mr); rpb = max(rpb, mr); }
  if (cov < 0.03) return;
  float Rr = max(rpa, rpb) + 1.;
  vec2 lo = min(pa, pb) - Rr, hi = max(pa, pb) + Rr;
  if (hi.x < 0. || hi.y < 0. || lo.x > RES.x || lo.y > RES.y) return;
  vec2 dv = pb - pa; float Ln = length(dv); vec2 dir = Ln > 1e-4 ? dv/Ln : vec2(1., 0.); vec2 nm = vec2(-dir.y, dir.x);
  vec2 P = (cn.x < 0. ? pa - dir*Rr : pb + dir*Rr) + nm*cn.y*Rr;
  gl_Position = vec4(P/RES*2. - 1., 0., 1.);
  vP = vec4(pa, pb); vQ = vec4(rpa, rpb, cov, 0.);
  vA = mix(A0, B0, ta); vB = mix(A0, B0, tb);
  vZ = vec2(a2.z, b2.z);
}`,je=`#version 300 es
`+N0+st+`
flat in vec4 vP; flat in vec4 vQ; flat in vec4 vM; flat in vec3 vA; flat in vec3 vB; flat in vec2 vZ;
out vec4 o;
vec3 hueC(float h) {
  return h < 0.5 ? vec3(0.13, 0.09, 0.06) : h < 1.5 ? vec3(0.8, 0.77, 0.7) : h < 2.5 ? vec3(0.92, 0.9, 0.84) : h < 3.5 ? vec3(0.05, 0.06, 0.03)
       : h < 4.5 ? vec3(0.42, 0.34, 0.2) : h < 5.5 ? vec3(0.15, 0.09, 0.06) : h < 6.5 ? vec3(0.4, 0.34, 0.25) : vec3(1., 0.6, 0.27);
}
void main() {
  vec2 P = gl_FragCoord.xy, pa = vP.xy, pb = vP.zw, ba = pb - pa;
  float h = clamp(dot(P - pa, ba)/max(dot(ba, ba), 1e-6), 0., 1.);
  float r = mix(vQ.x, vQ.y, h);
  vec2 off = P - pa - ba*h; float dd = length(off);
  float hue = floor(vM.w/8. + 0.001), kind = vM.w - hue*8.;
  float s = h*vZ.x/(h*vZ.x + (1. - h)*vZ.y);
  float z = vZ.x*vZ.y/max((1. - h)*vZ.y + h*vZ.x, 1e-5);
  gl_FragDepth = 1. - 0.15/max(z, 0.3);
  vec3 W = mix(vA, vB, s);
  if (kind > 1.5 && kind < 2.5) {
    gl_FragDepth = 1. - 0.15/max(z - 0.05, 0.3);
    float e = (exp(-3.*dd*dd/(r*r)) + 2.*exp(-30.*dd*dd/(r*r)))*smoothstep(1., 0.55, dd/r);
    if (e < 0.004 || W.y < 0.) discard;
    o = vec4(hueC(hue)*vM.z*e, 0.);
    return;
  }
  float cov = clamp(r - dd + 0.5, 0., 1.)*vQ.z*vM.y;
  if (cov < 0.004 || W.y < -0.01) discard;
  vec3 Wv = W; if (MIR > 0.5) Wv.y = -Wv.y;
  vec3 dv = Wv - EYE; float dist = length(dv); vec3 vd = dv/dist;
  vec2 dn = clamp(off/max(r, 1e-3), -1., 1.);
  vec3 n = normalize(CR*dn.x + CU*dn.y - vd*sqrt(max(1. - dot(dn, dn), 0.)));
  if (MIR > 0.5) n.y = -n.y;
  vec3 alb = hueC(hue)*vM.x;
  float sT = sunTr();
  float lit = kind > 0.5 && kind < 1.5 ? 0.12 : 1.;
  float ndl = dot(n, SUN);
  vec3 col = alb*(AMB*(0.55 + 0.45*n.y) + SUNC*sT*lit*max(ndl*0.85 + 0.15, 0.) + AMB*vec3(0.6, 0.5, 0.4)*0.3*max(-n.y, 0.));
  if (hue > 2.5 && hue < 4.5) { vec3 vo = vd; if (MIR > 0.5) vo.y = -vo.y; col += alb*SUNC*sT*lit*1.6*pow(max(dot(vo, SUN), 0.), 4.); }
  col += hueC(7.)*vM.z*LAMP;
  col = fogIt(col, vd, dist);
  o = vec4(col*cov, cov);
}`,m=e.__c585||(e.__c585=(()=>{const t=(s,n)=>{const c=e.createShader(n);return e.shaderSource(c,s),e.compileShader(c),c},o={},a=(s,n,c,i)=>{const r=e.createProgram(),l=t(n,e.VERTEX_SHADER),f=t(c,e.FRAGMENT_SHADER);e.attachShader(r,l),e.attachShader(r,f),i.forEach((x,d)=>e.bindAttribLocation(r,d,x)),e.linkProgram(r),o[s]={p:r,vs:l,fs:f}};for(const[s,n,c,i]of[["comp",vt,Ie,[]],["bake",vt,Ue,[]],["copy",vt,Oe,[]],["rock",We,He,["r0","r1","r2","r3","r4"]],["hull",Ge,Ye,["h0","h1","h2"]],["sail",Ve,Xe,["s0","s1","s2","s3"]],["cap",Ze,je,["iA","iB","iM"]]])a(s,n,c,i);return e.flush(),{P:o,mkP:a,fresh:!0,fin:!0,rts:{},bakes:new Map,per:new Map,sims:new Map,tick:0,nid:0,hf:!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float"),mt:e.getParameter(e.MAX_TEXTURE_SIZE)}})()),b0=(t,o,a,s,n,c,i,r)=>{const l=e.createTexture();return e.bindTexture(e.TEXTURE_2D,l),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,s,n,r||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,c===e.LINEAR_MIPMAP_LINEAR?e.LINEAR:c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,i),l},O0=(t,o)=>{const a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o&&e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,o,0),a},Z=(t,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,o)},nt=(t,o,a)=>{const s=e.createVertexArray();e.bindVertexArray(s),e.bindBuffer(e.ARRAY_BUFFER,t);for(let n=0;n<o;n++)e.enableVertexAttribArray(n),e.vertexAttribPointer(n,4,e.FLOAT,!1,a,n*16),e.vertexAttribDivisor(n,1);return e.bindVertexArray(null),s},zt=(t,o,a,s,n)=>{if(t.size>=a){let i=null,r=1/0;for(const[l,f]of t)f.last<r&&(r=f.last,i=l);if(i!==null&&(m.tick-r>64||t.size>=s)){const l=t.get(i);l.free(),l.dead=!0,t.delete(i)}}const c=n();return c.last=++m.tick,t.set(o,c),c};if(m.fresh){m.fresh=!1;let t=625341585;const o=()=>(t^=t<<13,t^=t>>>17,t^=t<<5,(t>>>0)/4294967296),a=256,s=d=>{const p=new Float32Array(a*a),u=new Int32Array(a),v=new Int32Array(a),y=new Float32Array(a),S=new Float32Array(a),F=new Float32Array(a);for(const[M,L]of d){const w=new Float32Array(M*M);for(let E=0;E<M*M;E++)w[E]=o();const R=M/a;for(let E=0;E<a;E++){const A=E*R,g=Math.floor(A),k=A-g;u[E]=g%M,v[E]=(g+1)%M,y[E]=k*k*(3-2*k)}let D=-1;for(let E=0;E<a;E++){const A=E*R,g=Math.floor(A),k=A-g,Q=k*k*(3-2*k);if(g!==D){D=g;const t0=g%M*M,m0=(g+1)%M*M;for(let N=0;N<a;N++){const b=y[N];S[N]=w[t0+u[N]]+(w[t0+v[N]]-w[t0+u[N]])*b,F[N]=w[m0+u[N]]+(w[m0+v[N]]-w[m0+u[N]])*b}}const y0=E*a;for(let t0=0;t0<a;t0++)p[y0+t0]+=(S[t0]+(F[t0]-S[t0])*Q)*L}}for(let M=0;M<a*a;M++)p[M]=W((p[M]-.5)*2.1+.5,0,1);return p},n=s([[8,.5],[16,.25],[32,.15],[64,.1]]),c=s([[4,.45],[8,.3],[16,.15],[32,.1]]),i=new Uint8Array(a*a*4);for(let d=0;d<a*a;d++)i[d*4]=n[d]*255,i[d*4+1]=c[d]*255,i[d*4+2]=o()*255,i[d*4+3]=255;m.tN=b0(a,a,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT,i),e.generateMipmap(e.TEXTURE_2D);const r=s([[8,.42],[16,.3],[32,.17],[64,.11]]),l=new Uint8Array(a*a*4);for(let d=0;d<a;d++)for(let p=0;p<a;p++){const u=(r[d*a+(p+1)%a]-r[d*a+(p+a-1)%a])*.5,v=(r[(d+1)%a*a+p]-r[(d+a-1)%a*a+p])*.5,y=(d*a+p)*4;l[y]=W(.5+u*7,0,1)*255,l[y+1]=W(.5+v*7,0,1)*255,l[y+2]=r[d*a+p]*255,l[y+3]=o()*255}m.tWv=b0(a,a,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT,l),e.generateMipmap(e.TEXTURE_2D);const f=32,x=new Uint8Array(f*f*f*4);for(let d=0;d<x.length;d++)x[d]=o()*255;m.n3=x,m.tN3=e.createTexture(),e.bindTexture(e.TEXTURE_3D,m.tN3),e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,f,f,f,0,e.RGBA,e.UNSIGNED_BYTE,x);for(const d of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,d,e.REPEAT);e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.bindTexture(e.TEXTURE_3D,null),m.vaoE=e.createVertexArray(),m.hullB=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,m.hullB),e.bufferData(e.ARRAY_BUFFER,16*48,e.DYNAMIC_DRAW),m.sailB=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,m.sailB),e.bufferData(e.ARRAY_BUFFER,16*64,e.DYNAMIC_DRAW),m.dynB=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,m.dynB),e.bufferData(e.ARRAY_BUFFER,2400*48,e.DYNAMIC_DRAW),m.vaoH=nt(m.hullB,3,48),m.vaoS=nt(m.sailB,4,64),m.vaoD=nt(m.dynB,3,48)}const Ke=k0({Gold:5,"Dust haze":3,Clear:1.5,Khamsin:.6}),Qe=k0({"Light air":4,"Steady north wind":4,Fresh:1.5,"Dead calm":.6}),Je=k0({Three:2.5,Four:3.5,Five:3,Regatta:1}),$e=k0({"White cotton":5,Weathered:3.5,"One ochre sail":1.5}),to=k0({Raking:5,"Through the sails":3,Downriver:2}),eo=k0({"One tomb":4.5,"Two tombs":4,"Ruined monastery":1.5}),oo=k0({Egrets:5,"Egret skein":3.5,Kites:1.5});k0({a:6,b:3,c:1});const ao=k0({None:8.5,"Young crescent":1.5}),H=r0?{air:"Gold",br:"Light air",fl:"Five",sl:"Weathered",sp:"Raking",rg:"Two tombs",bd:"Egrets",mo:"None"}:{air:Ke,br:Qe,fl:Je,sl:$e,sp:to,rg:eo,bd:oo,mo:ao},ut=r0?"On the boulder":(t=>t<.55?"On the boulder":t<.7?"At the water's edge":t<.85?"Between two boulders":"Out on a mid-river rock")(z[0]),Gt=r0?"Below the dunes":z[3]<.28?"Among the cataract rocks":"Below the dunes",Q0=r0?"Across":(t=>t<.5?"Across":t<.85?"Sun":"Glow")(w0()),J0={Gold:{haze:.45,fog:2600,k:[.022,.066,.15],cl:.55},"Dust haze":{haze:.95,fog:1150,k:[.03,.07,.15],cl:.2},Clear:{haze:.2,fog:4e3,k:[.014,.042,.1],cl:.6},Khamsin:{haze:1.25,fog:800,k:[.045,.1,.2],cl:.05}}[H.air],$0=H.sp==="Raking"?-1.4+(h()-.5)*.12:H.sp==="Through the sails"?-.52+(h()-.5)*.1:.95+(h()-.5)*.2,so=(h()-.5)*.016,Yt={"Light air":3.4,"Steady north wind":4.6,Fresh:6.4,"Dead calm":1.2}[H.br],Vt=(h()-.5)*.3,_0=[-Math.cos(Vt),Math.sin(Vt)],Xt={"Light air":.2,"Steady north wind":.55,Fresh:1.05,"Dead calm":.03}[H.br],Zt=h()*G,St=h()*G,pt=150+(h()-.5)*120,no=55+h()*20,mt=t=>-600+45*Math.sin(t*.006+St),tt=[[0,0,1,0],[0,0,1,0]];if(H.rg==="Ruined monastery"){const t=pt-110+h()*60;tt[0]=[t,mt(t)+6,1,2];const o=pt+140;tt[1]=[o,mt(o)+3,1.1,1]}else{const t=pt-30+(h()-.5)*80;if(tt[0]=[t,mt(t)+4,1.15,1],H.rg==="Two tombs"){const o=t+150+h()*90;tt[1]=[o,mt(o)+4,.9,1]}}const p0=[[62+(h()-.5)*8,-150,26,2.6],[-95+(h()-.5)*10,-165,32,1.4],[175,-250,20,2.2]],co=[-22,17,16,-30],ro=[-170+h()*40,220+h()*60,0,.2+h()*.1],F0=new Float32Array(32);F0.set(p0[0],0),F0.set(p0[1],4),F0.set(p0[2],8),F0.set(tt[0],12),F0.set(tt[1],16),F0.set(co,20),F0.set(ro,24),F0.set([Zt,St,pt,no],28);const xt=t=>7+6e-4*t*t+5*Math.sin(t*.021+1),yt=t=>{const o=Math.min(t+150,0);return-340+40*Math.sin(t*.0047+Zt)+18*Math.sin(t*.013+St)-o*o*.0018},io=(t,o)=>{const a=o-xt(t);return W(a*.25-.5,-6,3)+g0(20,140,a)*(7+3*Math.sin(t*.013)*Math.sin(o*.017))},jt=(t,o,a)=>{const s=t-a[0],n=o-a[1],c=Math.atan2(n,s),i=a[2]*(1+.16*Math.sin(3*c+a[0])+.08*Math.sin(5*c+a[1])),r=Math.hypot(s,n)/i;return a[3]*(1-r*r)},lo=m.n3,Kt=(t,o,a,s)=>{t=t*32-.5,o=o*32-.5,a=a*32-.5;const c=Math.floor(t),i=Math.floor(o),r=Math.floor(a),l=v=>v*v*(3-2*v),f=l(t-c),x=l(o-i),d=l(a-r),p=(v,y,S)=>lo[((S%32+32)%32*32*32+(y%32+32)%32*32+(v%32+32)%32)*4+s]/255,u=(v,y,S)=>v+(y-v)*S;return u(u(u(p(c,i,r),p(c+1,i,r),f),u(p(c,i+1,r),p(c+1,i+1,r),f),x),u(u(p(c,i,r+1),p(c+1,i,r+1),f),u(p(c,i+1,r+1),p(c+1,i+1,r+1),f),x),d)},R0=[],B=(t,o,a,s,n={},c=h)=>{const i=n.sy||.68+c()*.26,r=n.yaw===void 0?c()*G:n.yaw,l=c()*7,f=c()*G,x=f+1.6+c()*2,d=n.l2||[Math.cos(f)*s*.7,-s*.15,Math.sin(f)*s*.7,s*(.5+c()*.25)],p=n.l3||(c()<.6?[Math.cos(x)*s*.75,-s*.2,Math.sin(x)*s*.75,s*(.4+c()*.25)]:[0,0,0,0]),u=n.crack===void 0?c()<.3?c()*G:-9:n.crack;let v=s*Math.max(1,i);for(const y of[d,p])y[3]>0&&(v=Math.max(v,Math.hypot(y[0],y[1],y[2])+y[3]*Math.max(1,i*1.1)));v+=s*.18,R0.push({C:[t,o,a],Rb:v,yaw:r,seed:l,sy:i,crack:u,A:[0,0,0,s],B:d,Cc:p})};B(.2,-.95,.5,2.5,{sy:.62,yaw:0,l2:[-2.3,.22,-4.6,1.15],l3:[1.6,-.2,1.7,1.8],crack:.75}),B(-1.6,-.7,4.8,1.9,{sy:.6}),B(3.6,-.6,5.2,2.4),B(-6.5,-.6,4.5,1.3,{sy:.6}),B(9,-.4,7.5,2.2),B(14,.2,12.5,2.7),B(-14,.5,16,3.2),B(-22,1.5,26,4.5),B(-6,.8,24,3.2),B(9.4,-.5,-14.5,2.5,{sy:.9}),B(7.2,-.7,-18.8,1.3,{sy:.85}),B(4.1,-.9,-17.4,.8),B(-6.4,-.8,-15.5,1.1),B(-8.5,-.8,-15.5,.9),B(-24,-.4,-58,2),B(-21,-.8,-61,1.1),B(30,-.5,-74,1.5),B(16,-.6,-95,1),B(110,-.3,-60,2.6),B(-140,-.4,-90,2.5),B(p0[0][0]-12,-.3,-132,3.2),B(p0[0][0]-2,-.2,-128,3.8),B(p0[0][0]+9,-.1,-137,2.8),B(p0[0][0]-15,-.6,-145,2.2),B(p0[1][0]+21,-.3,-150,2.4),B(p0[1][0]+15,-.5,-145,1.6),B(158,-.4,-236,3.4),B(166,-.2,-232,2.6),B(-60,-.3,-320,3),B(240,-.3,-180,3.5);for(let t=0;t<4;t++)B(-40+h()*100,-.6,-40-h()*60,.6+h()*.8);const Qt=(t,o,a,s)=>{const n=o-t.C[0],c=a-t.C[1],i=s-t.C[2],r=Math.cos(t.yaw),l=Math.sin(t.yaw),f=r*n-l*i,x=c,d=l*n+r*i,p=(w,R,D,E,A,g)=>{const k=Math.hypot(w/E,R/A,D/g),Q=Math.hypot(w/(E*E),R/(A*A),D/(g*g));return k*(k-1)/Math.max(Q,1e-5)},u=(w,R,D)=>{const E=W(.5+.5*(R-w)/D,0,1);return i0(R,w,E)-D*E*(1-E)},v=t.A,y=t.B,S=t.Cc,F=(w,R,D,E,A,g)=>{const k=Math.pow(Math.abs(w/E),3)+Math.pow(Math.abs(R/A),3)+Math.pow(Math.abs(D/g),3);return .55*p(w,R,D,E,A,g)+.45*(Math.cbrt(k)-1)*Math.min(E,A,g)};let M=F(f-v[0],x-v[1],d-v[2],v[3],v[3]*t.sy,v[3]*.9);M=u(M,F(f-y[0],x-y[1],d-y[2],y[3]*.92,y[3]*t.sy*1.05,y[3]),.3*y[3]),S[3]>0&&(M=u(M,F(f-S[0],x-S[1],d-S[2],S[3],S[3]*t.sy*.95,S[3]*.85),.3*S[3])),M+=(Kt(f*.034+t.seed,x*.034+t.seed,d*.034+t.seed,0)-.5)*.2*v[3]+(Kt(f*.13+t.seed*1.7,x*.13+t.seed*1.7,d*.13+t.seed*1.7,1)-.5)*.04*v[3];const L=w=>w-Math.floor(w);for(const[w,R]of[[y,3.7],[S,5.3]]){if(w[3]<=0)continue;let D=w[0]-v[0]+1e-4,E=w[2]-v[2];const A=Math.hypot(D,E);D/=A,E/=A;const g=(L(t.seed*R)-.5)*.5,k=T0([D+g*E,.12*(L(t.seed*7.1)-.5),E-g*D]),Q=.42+.12*L(t.seed*2.3),y0=v[0]+(w[0]-v[0])*Q,t0=v[1]+(w[1]-v[1])*Q,m0=v[2]+(w[2]-v[2])*Q,N=Math.abs((f-y0)*k[0]+(x-t0)*k[1]+(d-m0)*k[2])-.012*v[3]-.025;M=-u(-M,N,.06*v[3])}return M},Jt=(t,o,a)=>{let s=t.C[1]+t.Rb+.5;for(let n=0;n<60;n++){const c=Qt(t,o,s,a);if(c<.004)break;if(s-=Math.max(c*.8,.005),s<t.C[1]-t.Rb)return null}return s},wt=H.sp==="Raking"?1:H.sp==="Downriver"?-1:w0()<.5?1:-1,$t=w0(),kt=w0(),fo=w0(),x0=Q0!=="Across",ho=w0(),te=Q0==="Glow"?"After sunset":r0?"Last light":_e({"Last light":5,"Late afternoon":3,"Sun on the horizon":2}),vo=w0(),uo=w0(),po=w0(),ee=r0?0:(vo-.5)*.42,z0=x0?$0+wt*(.3+.08*$t):ee,mo=x0?-.012:-.035,j={ex:0,ez:0,bo:1,tan:Math.tan(33*X/180),pit:null,yaw:null,ri:0,eh:1.6},Nt=(t,o,a,s)=>[t+Math.cos(z0)*a-Math.sin(z0)*s,o+Math.sin(z0)*a+Math.cos(z0)*s],ct=(t,o,a,s,n,c,i)=>{const r=Nt(t,o,a,n);B(r[0],s,r[1],c,i,n0)};if(ut==="At the water's edge"){let t=x0?Nt(0,0,.4,-4.6):[.9,-3.9];for(let o=0;o<8&&R0.some(a=>Qt(a,t[0],.55,t[1])<.8);o++)t=Nt(t[0],t[1],0,-1.5);Object.assign(j,{ex:t[0],ez:t[1],bo:.55,tan:Math.tan(42*X/180),pit:.05,ri:-1,eh:.55}),ct(t[0],t[1],-3.1+z[5],-.55,-4.7,1.5,{sy:.66}),ct(t[0],t[1],3.3,-.6,-7.6-2*z[6],1.15,{}),ct(t[0],t[1],-7.4,-.7,-12,1,{})}else if(ut==="Between two boulders")Object.assign(j,{tan:Math.tan(29*X/180),pit:-.07}),ct(0,0,-4.7,-.2,-6.3,2.7,{sy:.8}),ct(0,0,5,-.3,-7.2-z[5],2.9,{sy:.75});else if(ut==="Out on a mid-river rock"){const t=14+20*z[5],o=-64-10*z[6];B(t,-.45,o,2.3,{sy:.66},n0);const a=Jt(R0[R0.length-1],t,o);Object.assign(j,{ex:t,ez:o,bo:(a===null?.8:a)+1.5,tan:Math.tan(26*X/180),pit:-.09,yaw:(z[7]<.5?1:-1)*X/2+(z[8]-.5)*.3,ri:R0.length-1,eh:1.5})}const l0=j.ex,f0=j.ez;if(Gt==="Among the cataract rocks")for(let t=0,o=0,a=0;t<22;t++){if(t%5===0){const i=(n0()-.5)*1.6+(j.yaw===null||x0?z0:j.yaw),r=25+170*n0()*n0();o=l0+Math.sin(i)*r,a=f0-Math.cos(i)*r}const s=o+(n0()-.5)*30,n=a+(n0()-.5)*22,c=.7+2.6*n0()*n0();if(Math.hypot(s-l0,n-f0)<9||n>xt(s)-12||n<yt(s)+15){n0();continue}B(s,-.35*c,n,c,{sy:.6+.5*n0()},n0)}const oe=R0.length,ae=new Float32Array(oe*20);R0.forEach((t,o)=>ae.set([...t.C,t.Rb,t.yaw,t.seed,t.sy,t.crack,...t.A,...t.B,...t.Cc],o*20));const O=Math.atan2(-_0[0],_0[1]),e0=[],xo={Three:3,Four:4,Five:5,Regatta:8}[H.fl],P0=(t,o,a,s,n={})=>{const c=n.L||7.4+h()*1.8,i={x:t,z:o,psi:a,psiT:a,mode:s,u:n.u===void 0?1.3:n.u,w:0,phi:0,phiV:0,theta:0,d:n.d===void 0?-.7:n.d,dV:0,L:c,k:c/8,paint:n.paint===void 0?h()*4|0:n.paint,seed:h()*200|0,ph:h()*G,z0:n.z0||-40,z1:n.z1||-130,leg:n.leg||1,tack:0,fade:1,zl:o,crew:n.crew||1+(h()*2|0),ochre:!1,flog:0,fill:.5,rud:0,slap:0,lamp:0,F:[0,0,-1],U:[0,1,0],S:[1,0,0],bob:0,user:0};return e0.push(i),i},I=P0(r0?-5:-10+h()*12,r0?-39:-37-h()*9,O-.8,"beat",{L:8.4,paint:r0?0:void 0,u:.8,z0:-34,z1:-112,leg:1,crew:2,d:-.25});H.sl==="One ochre sail"&&(I.ochre=!0);const et=(t,o,a)=>{t.x=l0+Math.sin(o)*a,t.z=t.zl=f0-Math.cos(o)*a},o0=j.yaw!==null&&!x0?j.yaw:z0,yo=j.pit===null?mo:x0?Math.max(j.pit,-.03):j.pit;x0?et(I,ho<.6?z0-wt*(.12+.1*kt):z0+wt*(.16+.12*kt),42+28*fo):r0||et(I,ee-.22+.3*uo,34+16*po);const wo=[()=>P0(-36+(h()-.5)*20,-100+(h()-.5)*20,O+.8,"beat",{z0:-48,z1:-118,leg:-1,d:.3}),()=>P0(62+(h()-.5)*60,-210,O+X+.12,"run",{d:1.3,u:2.2}),()=>P0(-170+(h()-.5)*40,-255,.2,"reach",{z0:-215,z1:-290,leg:1,d:-.8}),()=>P0(110+(h()-.5)*60,-265,O-.8,"beat",{z0:-240,z1:-290,leg:1,d:-.3}),()=>P0(-260+h()*80,-232,O+X-.1,"run",{d:-1.3,u:2.2}),()=>P0(300+h()*60,-90,O+.8,"beat",{z0:-60,z1:-120,leg:-1,d:.3}),()=>P0(-330+h()*60,-260,O-.8,"beat",{z0:-240,z1:-290,leg:1,d:-.3})];for(let t=0;t<xo-1;t++)wo[t]();for(const t of e0)t.psiT=t.psi;h(),h(),r0||h(),x0&&e0[1]&&et(e0[1],z0-wt*(.2+.1*$t),130+60*kt);for(let t=0;t<8;t++){const o=n0(),a=n0(),s=e0[t];!s||r0||(s.L=s===I?6.6+4.2*o:s.L*(.82+.36*o),s.k=s.L/8,s.ya=1.12+(a-.5)*.34)}for(const t of e0)t.dm=Math.max(34,(j.tan<.6?3.3:2.65)*t.L/j.tan);const G0=r0?"Middle distance":(t=>t<.07?"None near":t<.41?"Middle distance":t<.55?"Two crossing":t<.65?"Coming at you":t<.75?"Going away":t<.84?"Going about":"Crossing ahead")(z[1]),go=t=>{const o=Y(t-O);return Math.abs(o)<.85?Y(O+(o<0?-.85:.85)):t},se=t=>Math.atan2(l0-t.x,-(f0-t.z)),U0=(t,o,a,s,n,c)=>{et(t,o,a),t.psi=t.psiT=go(s),t.mode=n,t.nr=8,n==="reach"?(t.psiA=t.psi,t.leg=1,t.z0=1e4,t.z1=-1e4):(t.z0=t.z+30,t.z1=t.z-60),Object.assign(t,c||{})},q0=I.dm;if(G0==="Crossing ahead"){const t=o0+(z[9]-.5)*.25,o=o0+X/2,a=o0-X/2;U0(I,t,q0+4+10*z[10],Math.abs(Y(o-O))>Math.abs(Y(a-O))?o:a,"reach",{u:1.6}),I.x-=Math.sin(I.psi)*7,I.z+=Math.cos(I.psi)*7}else if(G0==="Two crossing"&&e0[1]){const t=Math.max(28+12*z[10],q0+2+10*z[10]);U0(I,o0-.1,t,O-.8,"beat",{leg:1}),U0(e0[1],o0+.08+.07*z[9],Math.max(t+12+12*z[11],e0[1].dm+2),O+.8,"beat",{leg:-1,u:1.3})}else if(G0==="Coming at you"){const t=Math.max(48+25*z[10],q0+22+25*z[10]);et(I,o0+(z[9]-.5)*.3,t);const o=se(I);U0(I,o0+(z[9]-.5)*.3,t,o,"reach",{near:q0+16,u:1.6}),I.psiA=Y(I.psi+X),I.leg=-1}else G0==="Going away"?(et(I,o0+(z[9]-.5)*.2,q0+1+14*z[10]),U0(I,o0+(z[9]-.5)*.2,q0+1+14*z[10],se(I)+X,"reach",{u:1.6})):G0==="Going about"?((x0||j.yaw!==null)&&U0(I,o0-.1+.2*z[9],Math.max(34+14*z[10],q0+2+12*z[10]),O-.8,"beat",{leg:1}),I.tackAt=6+4*z[11],I.nr=8):G0==="None near"?U0(I,o0+(z[9]-.5)*.5,170+90*z[10],O-.8,"beat",{leg:1,nr:30}):j.yaw!==null&&!x0&&U0(I,o0+(z[9]-.5)*.35,Math.max(36+16*z[10],q0+2+14*z[10]),O-.8,"beat",{leg:1});for(const t of e0){const o=t.x-l0,a=t.z-f0,s=Math.hypot(o,a);if(s<t.dm+2){const n=(t.dm+2)/Math.max(s,.001);t.x=l0+o*n,t.z=t.zl=f0+a*n}}for(const t of e0)t.awn=t.seed%3!==0;for(let t=0,o=(r0?2:3)+({"Egret skein":11,Egrets:4}[H.bd]||2)*5+9;t<o;t++)h();let I0=1000216533;for(let t=2;t<66;t+=8)I0=Math.imul(I0^parseInt(q.hash.slice(t,t+8),16),1327217885)^I0>>>11;const V=()=>{I0=I0+1831565813|0;let t=Math.imul(I0^I0>>>15,1|I0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},gt=[],bt=[],ne=H.bd==="Egret skein"?9:H.bd==="Egrets"?3:0;for(let t=0;t<ne;t++)gt.push({dx:0,dz:0,dy:0,ph:V()*G,f:2.3+V()*.5,j:V()});const K={t:0,z:-70,y:1.2,v:8,dir:-1,x0:40,wait:0,n:0},ce=t=>{K.n++,K.dir=V()<.6?-1:1,K.z=55+V()*110,K.y=.7+V()*1.3,K.v=7+V()*3;const o=H.bd==="Egret skein"?3.2:4.5+V()*3;gt.forEach((s,n)=>{s.dx=n*o*(.8+.4*s.j)*-K.dir,s.dz=(s.j-.5)*4+n*(H.bd==="Egret skein"?1.1:.4),s.dy=(V()-.5)*.5});const a=-K.dir*(10+V()*16);K.x0=t&&z[4]<.3?a:K.dir*-260,K.t=0,K.wait=0};if(ne&&ce(!0),H.bd==="Kites")for(let t=0;t<3;t++){const o=z0+(V()-.5)*.8,a=240+V()*160;bt.push({c:[Math.sin(o)*a,30+V()*36,-Math.cos(o)*a],r:20+V()*26,w:(.17+V()*.1)*(V()<.5?-1:1),a:V()*G,ph:V()*G})}bt.length=0;const Mt=!r0&&z[2]<.085?"Blue hour":te,re={"Last light":.058,"Late afternoon":.27+.06*z[12],"Sun on the horizon":.022,"After sunset":.058}[te]+so,ie=x0?$0+.35:$0-Math.sign($0)*.95,Ft=T0([Math.sin(ie)*.93,x0?.36:.42,-Math.cos(ie)*.93]),le=Mt==="Blue hour"?.95:Q0==="Glow"?.56:0;q.trait("Air",H.air),q.trait("Breeze",H.br),q.trait("Fleet",H.fl),q.trait("Sails",H.sl),q.trait("Sun",H.sp+(Q0==="Sun"?", into the sun":Q0==="Glow"?", set, into the afterglow":"")),q.trait("Hour",Mt),q.trait("Standpoint",ut),q.trait("Nearest boat",G0),q.trait("Reach",Gt);let d0=le,C=0,W0=0,Oo=0;const Et=(t,o,a,s)=>s<.5?A0(t,o,s*2):A0(o,a,s*2-2*.5),Mo=()=>{const t=re-d0*(re+.075),o=[Math.sin($0)*Math.cos(t),Math.sin(t),-Math.cos($0)*Math.cos(t)],a=1/(Math.max(t,0)+.028),s=J0.k,n=1+J0.haze*.6,c=[Math.exp(-s[0]*a*n),Math.exp(-s[1]*a*n),Math.exp(-s[2]*a*n)].map(p=>p*4.3),i=d0,r=J0.haze,l=Et([1.15,.6,.27],[1.05,.38,.17],[.36,.13,.11],i).map((p,u)=>i0(p,[.85,.62,.42][u],r*.35)),f=Et([.44,.38,.5],[.46,.32,.42],[.12,.1,.18],i).map((p,u)=>i0(p,[.6,.52,.48][u],r*.3)),x=Et([.11,.19,.42],[.08,.13,.31],[.025,.04,.12],i).map((p,u)=>i0(p,[.32,.36,.48][u],r*.3)),d=Et([.2,.19,.26],[.17,.14,.21],[.06,.06,.11],i);if(Mt==="Blue hour"){const p=g0(.6,.95,i);for(let u=0;u<3;u++)f[u]=i0(f[u],[.06,.09,.2][u],p),l[u]=i0(l[u],[.24,.13,.15][u],p),x[u]=i0(x[u],[.015,.03,.1][u],p),d[u]=i0(d[u],[.04,.055,.11][u],p)}return{sun:o,sc:c,HZS:l,HZA:f,ZEN:x,AMB:d,belt:(Mt==="Blue hour"?1-.75*g0(.6,.95,i):1)*i0(.35,1,g0(0,.6,i))*(1-.4*g0(.7,1,i))}},Y0=Math.min(c0>=600?3584:c0>=400?2560:1536,m.mt),rt=Math.round(Y0*.115),Eo=-.28,Ao=.22,To=j.bo,fe=1<<Math.floor(Math.log2(rt)),V0=fe>=rt-Math.floor(.195*rt/.5)?fe:rt,At=rt-V0,Bt=q.hash+"|"+Y0,he=()=>zt(m.bakes,Bt,4,16,()=>{const t=(c,i,r)=>{const l=b0(Y0,V0,c,i,r,e.LINEAR,e.CLAMP_TO_EDGE);return e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),l},o=m.hf?t(e.RG16F,e.RG,e.HALF_FLOAT):t(e.RG8,e.RG,e.UNSIGNED_BYTE),a=t(e.RGBA8,e.RGBA,e.UNSIGNED_BYTE),s=t(e.RG8,e.RG,e.UNSIGNED_BYTE),n={t:o,f:O0(o),ta:a,fa:O0(a),tn:s,fn:O0(s)};return n.free=()=>{for(const c of[n.t,n.ta,n.tn])e.deleteTexture(c);for(const c of[n.f,n.fa,n.fn])e.deleteFramebuffer(c)},n});let v0=m.bakes.get(Bt),de=!1;v0||(v0=he(),de=!0);const ve=()=>zt(m.per,q.hash,10,32,()=>{const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,ae,e.STATIC_DRAW);const o={rb:t,rv:nt(t,5,80),sb:null,sv:null,sn:0};return o.free=()=>{e.deleteBuffer(o.rb),e.deleteVertexArray(o.rv),o.sb&&(e.deleteBuffer(o.sb),e.deleteVertexArray(o.sv))},o});let E0=m.per.get(q.hash)||ve();const X0=384,ue=-130,Lt=-250,it=260,Dt=m.hf,Ct=()=>{const t=zt(m.sims,++m.nid,8,16,()=>{const o=()=>{const s=b0(X0,X0,e.RG16F,e.RG,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE);return{t:s,f:O0(s)}},a={a:[o(),o()],cur:0};return a.free=()=>{for(const s of a.a)e.deleteTexture(s.t),e.deleteFramebuffer(s.f)},a});for(const o of t.a)e.bindFramebuffer(e.FRAMEBUFFER,o.f),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);return t};let a0=Dt?Ct():null,B0=m.rts[c0];const _t=c0,pe=Math.max(128,Math.round(c0*.5));if(!B0){const t=r=>m.hf?b0(r,r,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE):b0(r,r,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),o=r=>b0(r,r,e.DEPTH_COMPONENT24,e.DEPTH_COMPONENT,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE),a=t(c0),s=o(c0),n=t(_t),c=o(_t),i=r=>{const l=b0(r,r,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST,e.CLAMP_TO_EDGE),f=b0(r,r,e.DEPTH_COMPONENT16,e.DEPTH_COMPONENT,e.UNSIGNED_SHORT,e.NEAREST,e.CLAMP_TO_EDGE);return{c:l,d:f,f:O0(l,f),own:null,k:[]}};B0=m.rts[c0]={lt:a,ld:s,lf:O0(a,s),rt:n,rd:c,rf:O0(n,c),rc:[i(c0),i(pe)]}}e.bindFramebuffer(e.FRAMEBUFFER,null);let h0=null,H0=0,Pt=0;const _=(t,o,a,s,n,c,i,r,l)=>{if(H0>=Pt)return;const f=H0++*12;h0[f]=t[0],h0[f+1]=t[1],h0[f+2]=t[2],h0[f+3]=a,h0[f+4]=o[0],h0[f+5]=o[1],h0[f+6]=o[2],h0[f+7]=s,h0[f+8]=n,h0[f+9]=c,h0[f+10]=i,h0[f+11]=r+8*(l||0)},Tt=(t,o,a,s,n,c,i)=>{const r=t.length-1;for(let l=0;l<r;l++)_(t[l],t[l+1],i0(o,a,l/r),i0(o,a,(l+1)/r),s,i||1,0,n,c)},me=u0,xe=()=>{const t=u0;u0=me,h0=new Float32Array(12*24e3),H0=0,Pt=24e3;const o=(l,f,x,d,p,u,v,y,S)=>{const F=[Math.cos(f)*Math.cos(x),Math.sin(x),Math.sin(f)*Math.cos(x)],M=[];for(let w=0;w<=4;w++){const R=w/4;M.push([l[0]+F[0]*d*R,l[1]+F[1]*d*R-d*p*R*R,l[2]+F[2]*d*R])}Tt(M,u,u*.3,S,a,y);const L=T0([-F[2],0,F[0]]);for(let w=1;w<=v;w++){const R=w/(v+1),D=R*4,E=Math.min(3,D|0),A=A0(M[E],M[E+1],D-E),g=(.9-.5*R*R)*d*.24;for(const k of[-1,1])_(A,[A[0]+L[0]*k*g*.8+F[0]*g*.3,A[1]-g*.45,A[2]+L[2]*k*g*.8+F[2]*g*.3],u*.9,u*.25,S,1,0,a,y)}};let a=0;const s=(l,f,x,d,p,u,v,y)=>{a=y;const S=h()<.25,F=[],M=.5+h()*.9,L=v?.3:.26,w=S?d*.5:d;for(let A=0;A<=6;A++){const g=A/6;F.push([l+p*w*Math.pow(g,M+.7),f-.4+(w+.4)*g,x+u*w*Math.pow(g,M+.7)])}if(_(F[0],F[1],L*1.25,L,.9,1,0,a,0),Tt(F,L,L*.8,.8,a,0),S){const A=2+(h()<.3?1:0),g=h()*G;for(let k=0;k<A;k++){const Q=g+k*G/A+(h()-.5)*.6,y0=.3+h()*.25,t0=d*(.4+h()*.25),m0=F[6],N=[m0[0]+Math.cos(Q)*y0*t0,m0[1]+t0,m0[2]+Math.sin(Q)*y0*t0];_(m0,N,L*.7,L*.6,.8,1,0,a,0),_(M0(N,[0,-.3,0]),M0(N,[0,.3,0]),.32,.26,.8,1,0,a,3);const b=15+(h()*5|0);for(let P=0;P<b;P++)o(N,h()*G,-.6+h()*1.8,1.8+h()*.9,.18,v?.15:.11,2,3,1.1)}return}const R=F[6];_(M0(R,[0,-.9,0]),M0(R,[0,.3,0]),.38,.3,.8,1,0,a,3);const D=20+(h()*7|0);for(let A=0;A<D;A++){const g=h(),k=i0(1.25,-.25,g),Q=(3.4+h()*1.6)*(.75+.25*g),y0=.12+.55*g*g;o(R,h()*G,k,Q,y0,v?.09:.06,v?3:6,3,1)}const E=h()*4|0;for(let A=0;A<E;A++)o(M0(R,[0,-.6,0]),h()*G,-1.15-h()*.25,2.2+h(),.05,v?.08:.05,0,4,.9)},n=(l,f,x,d,p,u,v)=>{const y=1+(h()*v|0),S=h()*G;for(let F=0;F<y;F++){const M=S+F*G/y+(h()-.5),L=y>1?.08+h()*.22:(h()-.5)*.2,w=y>1?.6+h()*.8:0;s(l+Math.cos(M)*w,f,x+Math.sin(M)*w,d*(F?.6+h()*.45:1),Math.cos(M)*L,Math.sin(M)*L,p,u)}},c=(l,f,x,d,p)=>{for(let u=0;u<d;u++){const v=h()*G,y=Math.sqrt(h())*p,S=l+Math.cos(v)*y,F=x+Math.sin(v)*y,M=1.1+h()*1.9,L=(h()-.5)*.6-.25,w=(h()-.5)*.6,R=h()<.3,D=[];for(let A=0;A<=3;A++){const g=A/3;D.push([S+L*g*g*M*.4,f-.2+M*g,F+w*g*g*M*.4])}Tt(D,.016,.008,R?.75:1.7,0,R?4:3);const E=D[3];h()<.45&&_(E,[E[0]+L*.3+.08,E[1]+.22,E[2]+w*.3],.03,.04,2.2,1,0,0,5);for(let A=1;A<3;A++)if(h()<.6){const g=D[A],k=h()*G;_(g,[g[0]+Math.cos(k)*.55,g[1]+.05-h()*.35,g[2]+Math.sin(k)*.55],.014,.004,R?.7:1.5,1,0,0,R?4:3)}}},i=(l,f,x)=>{for(let d=0;d<f;d++){const p=h()*G,u=Math.sqrt(h())*l[2]*.5,v=l[0]+Math.cos(p)*u,y=l[1]+Math.sin(p)*u;n(v,Math.max(jt(v,y,l),0),y,8+h()*7,!0,0,3)}for(let d=0;d<x;d++){const p=h()*G,u=l[0]+Math.cos(p)*l[2]*(.85+h()*.1),v=l[1]+Math.sin(p)*l[2]*(.85+h()*.1);c(u,Math.max(jt(u,v,l),0),v,34,2.8)}};i(p0[0],3,4),i(p0[1],2,9),i(p0[2],3,3);for(let l=0;l<9;l++){const f=-120+h()*520,x=yt(f)-6-h()*14,d=yt(f)-x;n(f,W(d*.08,-6,1.2),x,9+h()*8,!0,0,3)}for(let l=0;l<17;l++){const f=-110+h()*260,x=22+h()*90,d=xt(f)+x,p=f>-20&&f<140&&x<80?1:0;n(f,io(f,d),d,8+h()*9,Math.hypot(f,d)>60,p,2)}const r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,h0.subarray(0,H0*12),e.STATIC_DRAW),E0.sb=r,E0.sv=nt(r,3,48),E0.sn=H0,u0=t};E0.sb||xe(),u0=me;const U=(t,o,a,s)=>[t.x+t.F[0]*o+t.U[0]*a+t.S[0]*s,t.bob+t.F[1]*o+t.U[1]*a+t.S[1]*s,t.z+t.F[2]*o+t.U[2]*a+t.S[2]*s],ye=t=>{const o=[Math.sin(t.psi),0,-Math.cos(t.psi)],a=[Math.cos(t.psi),0,Math.sin(t.psi)],s=[0,1,0],n=Math.cos(t.phi),c=Math.sin(t.phi);let i=[n*s[0]+c*a[0],n*s[1]+c*a[1],n*s[2]+c*a[2]];const r=[n*a[0]-c*s[0],n*a[1]-c*s[1],n*a[2]-c*s[2]],l=Math.cos(t.theta),f=Math.sin(t.theta),x=[l*o[0]+f*i[0],l*o[1]+f*i[1],l*o[2]+f*i[2]];i=[l*i[0]-f*o[0],l*i[1]-f*o[1],l*i[2]-f*o[2]],t.F=x,t.U=i,t.S=r},we=t=>{const o=t.k,a=.86+((t.ya||1.12)-1.12)*.5,s=[-Math.cos(a),Math.sin(a)],n=[3.5*o,1.05*o],c=12.8*o,i=c/3,r=[n[0]+s[0]*i,n[1]+s[1]*i],l=[n[0]+s[0]*c,n[1]+s[1]*c],f=.42*t.d,x=Math.cos(f),d=Math.sin(f),p=(w,R,D,E,A,g)=>{const k=w-D;return[D+k*A,R,-k*g]},u=p(n[0],n[1],r[0],0,x,d),v=p(l[0],l[1],r[0],0,x,d),y=6.8*o,S=Math.cos(t.d),F=Math.sin(t.d),M=[u[0]-y*S,u[1]+.5*o,u[2]+y*F],L=[u[0]+(u[0]-v[0])*.07,u[1]+(u[1]-v[1])*.07+.3*o,u[2]+(u[2]-v[2])*.07];return{T:u,H:v,Cl:M,MT:[r[0],r[1],0],MF:[r[0]-.45*o,.3,0],Y0:L}},Ro=(t,o,a,s,n)=>{const c=T0([o[0],o[1]*.3,o[2]]),i=T0([c[2],0,-c[0]]),r=a*.42;_($(t,c,-r*.45),$(t,c,r*.3),a*.05,a*.055,n,1,0,0,2);const l=$(M0($(t,c,r*.32),[0,a*.03,0]),c,0);_($(t,c,r*.28),l,a*.04,a*.035,n,1,0,0,2),_(l,$(l,c,a*.14),a*.03,a*.008,.9,1,0,0,4),_($(t,c,-r*.45),$($(t,c,-r*1.25),[0,1,0],-a*.05),a*.012,a*.01,.4,1,0,0,0);const f=Math.sin(s),x=Math.sin(s-.7);for(const d of[-1,1]){const p=$(t,c,r*.05),u=[p[0]+i[0]*d*a*.24,p[1]+f*a*.2,p[2]+i[2]*d*a*.24],v=[u[0]+i[0]*d*a*.27-c[0]*a*.07,u[1]+x*a*.24,u[2]+i[2]*d*a*.27-c[2]*a*.07];_(p,u,a*.075,a*.06,n,1,0,0,2),_(u,v,a*.06,a*.025,n,1,0,0,2)}},zo=(t,o,a,s)=>{const n=T0([o[2],0,-o[0]]),c=W(a*2.2,-.5,.5),i=.06*Math.sin(s*1.7)*Math.max(0,Math.sin(s*.31));_($(t,o,-.3),$(t,o,.28),.07,.06,.5,1,0,0,0);for(const r of[-1,1]){const l=M0($($(t,n,r*.78),o,-.12),[0,r*c*.78+.05+i,0]),f=M0($($(t,n,r*.4),o,.03),[0,r*c*.4+.07+i*.5,0]);_(t,f,.13,.11,.5,1,0,0,0),_(f,l,.11,.04,.5,1,0,0,0),_($(t,o,-.3),M0($($(t,o,-.62),n,r*.07),[0,0,0]),.05,.04,.5,1,0,0,0)}},ge=new Float32Array(2400*12),Me=new Float32Array(16*12),Ee=new Float32Array(16*16);let lt=0,ft=0;const So=t=>{ye(t);const o=t.k,a=t.d>=0?1:-1,s=lt*12;Me.set([t.x,t.bob,t.z,t.psi,t.L,2.3*o+.2,t.phi,t.theta,t.paint,.6*o,t.lamp,t.fade],s),lt++;const n=we(t),c=U(t,...n.T),i=U(t,...n.H),r=U(t,...n.Cl),l=U(t,...n.MT),f=U(t,...n.MF),x=T0([(i[1]-c[1])*(r[2]-c[2])-(i[2]-c[2])*(r[1]-c[1]),(i[2]-c[2])*(r[0]-c[0])-(i[0]-c[0])*(r[2]-c[2]),(i[0]-c[0])*(r[1]-c[1])-(i[1]-c[1])*(r[0]-c[0])]),d=t.S[0]*x[0]+t.S[1]*x[1]+t.S[2]*x[2]>0?a:-a,p=(.35+.75*t.fill)*o*g0(.04,.4,Math.abs(t.d)),u=ft*16;Ee.set([c[0],c[1],c[2],t.flog*.35*o,i[0],i[1],i[2],t.ph,r[0],r[1],r[2],t.seed+(H.sl==="Weathered"?.8:.15),x[0]*p*d,x[1]*p*d,x[2]*p*d,(t.ochre?10:0)+t.fade],u),ft++;const v=t.fade,y=.6,S=Math.hypot(t.x-T.ro[0],t.z-T.ro[2]),F=2.3*o+.2,M=.6*o,L=t.L;for(const b of[-1,1]){let P=null;for(let J=0;J<=13;J++){const s0=J/13,S0=.5*F*Math.pow(Math.max(Math.sin(X*s0),0),s0<.5?.3:.5)*(1-.25*s0*s0),at=U(t,(s0-.5)*L,M+.22*(1-s0)*(1-s0)+1.05*Math.pow(s0,2.6)+.02*o,b*S0);P&&_(P,at,.055*o,.055*o,.55,v,0,0,0),P=at}}if(S<60)for(const b of[.28,.534,.74]){const P=.5*F*Math.pow(Math.sin(X*b),b<.5?.3:.5)*(1-.25*b*b)*.92,J=M+.22*(1-b)*(1-b)+1.05*Math.pow(b,2.6)-.18*o;_(U(t,(b-.5)*L,J,-P),U(t,(b-.5)*L,J,P),.06*o,.06*o,.5,v*(1-g0(50,60,S)),0,0,0)}const w=U(t,.5*L,M+1.05,0);_(w,U(t,.5*L+.12*o,M+1.05+.35*o,0),.07*o,.05*o,.55,v,0,0,0),_(f,l,.11*o,.085*o,y,v,0,0,0);const R=U(t,...n.Y0),D=$(i,T0([i[0]-c[0],i[1]-c[1],i[2]-c[2]]),.7*o),E=A0(R,D,.5);if(E[1]-=.18*o*(.5+t.fill),_(R,A0(R,E,1.12),.12*o,.095*o,y,v,0,0,0),_(A0(E,R,.12),E,.1*o,.085*o,y,v,0,0,0),_(E,D,.085*o,.045*o,y,v,0,0,0),_(c,r,.06*o,.045*o,y,v,0,0,0),t.lamp>.01){const b=U(t,-3.85*o,.6*o+.25,0);_(b,M0(b,[0,.07,0]),.035,.03,.3,1,1.2*t.lamp,0,0),t.lampP=b}if(S>100)return;const A=U(t,-3.95*o,.7*o,0),g=U(t,-4.25*o,-.6,-t.rud*.3);_(A,g,.06,.12,.5,v,0,0,0);const k=U(t,-2.6*o,.85*o,t.rud*1.1);_(A,k,.03,.025,y,v,0,0,0);const Q=-a,y0=U(t,-2.9*o,.5*o,Q*.55*o),t0=U(t,-2.45*o,.9*o,Q*.42*o+t.rud*.6),m0=U(t,-2.2*o,.75*o,Q*.3*o);Tt(((b,P,J)=>{const s0=[];for(let S0=0;S0<=4;S0++){const at=S0/4,Ce=A0(b,P,at);Ce[1]-=J*4*at*(1-at),s0.push(Ce)}return s0})(r,m0,.25+.4*(1-t.fill)),.012,.012,.7,0,6,v),_(l,U(t,3.9*o,.95*o,0),.012,.012,.7,v,0,0,6),_(l,U(t,.9*o,.6*o,Q*1*o),.012,.012,.7,v,0,0,6),_(A0(R,i,.3),U(t,.5*o,.6*o,Q*.9*o),.01,.01,.7,v,0,0,6)},ko=()=>{h0=ge,H0=0,Pt=2400,lt=0,ft=0;const t=e0.filter(a=>a.fade>.01);t.sort((a,s)=>Math.hypot(s.x-T.ro[0],s.z-T.ro[2])-Math.hypot(a.x-T.ro[0],a.z-T.ro[2]));for(const a of t)So(a);const o=K;if(o.wait<=0)for(const a of gt){const s=o.x0+o.dir*o.v*o.t+a.dx,n=o.y+a.dy+Math.sin(o.t*.6+a.ph)*.15,c=o.z+a.dz+Math.sin(o.t*.35+a.ph)*1.2,i=Math.sin(o0),r=-Math.cos(o0),l=Math.cos(o0),f=Math.sin(o0);Ro([l0+i*c+l*s,n,f0+r*c+f*s],[l*o.dir,Math.cos(o.t*.6+a.ph)*.03,f*o.dir],.95,C*a.f*G*.5+a.ph,1)}for(const a of bt){const s=a.a+a.w*C,n=[a.c[0]+Math.cos(s)*a.r,a.c[1]+Math.sin(C*.13+a.ph)*3,a.c[2]+Math.sin(s)*a.r];zo(n,[-Math.sin(s)*Math.sign(a.w),0,Math.cos(s)*Math.sign(a.w)],a.w,C+a.ph)}if(d0>.3){const a=g0(.3,.75,d0);for(const s of e0)if(s.lampP&&s.fade>.5){const n=Math.min(.32,.016*ht*Math.hypot(s.lampP[0]-T.ro[0],s.lampP[1]-T.ro[1],s.lampP[2]-T.ro[2]));_(s.lampP,M0(s.lampP,[0,.04,0]),n,n,1,1,1*a,2,7)}}},No={yaw:0,pitch:0,x:0,y:0,z:0},bo=o0,Fo=yo,ht=j.tan,T={ro:[0,2.2,0],f:[0,0,-1],r:[1,0,0],u:[0,1,0]};let Ae=1e9,Te=1e9,Re=2.2;const Ut=()=>{const t=q.view||No,o=bo+(t.yaw||0),a=W(Fo+(t.pitch||0),-1.35,1.35),s=W(t.x||0,-1.4,1.4),n=W(t.z||0,-1.4,1.6),c=W(t.y||0,-.5,.4);if(s!==Ae||n!==Te){Ae=s,Te=n;const l=j.ri<0?null:Jt(R0[j.ri],l0+s,f0+n);Re=l===null?j.eh:l+j.eh}T.ro=[l0+s,Re+c,f0+n],T.f=[Math.sin(o)*Math.cos(a),Math.sin(a),-Math.cos(o)*Math.cos(a)],T.r=[Math.cos(o),0,Math.sin(o)];const i=T.f,r=T.r;T.u=[r[1]*i[2]-r[2]*i[1],r[2]*i[0]-r[0]*i[2],r[0]*i[1]-r[1]*i[0]]},Bo=(t,o)=>T0([T.f[0]+(T.r[0]*(2*t-1)+T.u[0]*(1-2*o))*ht,T.f[1]+(T.r[1]*(2*t-1)+T.u[1]*(1-2*o))*ht,T.f[2]+(T.r[2]*(2*t-1)+T.u[2]*(1-2*o))*ht]);Ut();const qt=new Float32Array(64),dt=[],Lo=[62,63,66,67,69,70,72,74],Do=t=>{if(!t.tack){if(t.user=1,t.nextT=C+14+V()*50,t.mode==="run")t.psiT=Y(t.psiT+(t.d>0?.55:-.55)),t.tack=1,t.tackFin=t.psiT;else if(t.mode==="beat"){const o=Y(t.psi-O);t.tackFin=Y(O-Math.sign(o||1)*.8),t.psiT=t.tackFin,t.tack=1,t.leg=-t.leg}else t.leg=-t.leg,t.tack=2,t.tackFin=t.leg>0?t.psiA:Y(t.psiA+X),t.psiT=Y(O+(t.leg>0?-.15:.15));q.sound.note(Lo[(t.seed+Co++)%8],{dur:.9,vel:.05,wave:"triangle",cutoff:1200})}};let Co=0;for(const t of e0)t.mode==="reach"&&t.psiA===void 0&&(t.psiA=t.psi),t.nextT=9+V()*45;let Rt=0,Z0=0,ze=0,Se=0,ke=!1,L0=!1,It=99;const _o=t=>{const o=q.input;o.down?(ke||(Rt=0,Z0=0,ze=o.x,Se=o.y,L0=!1),Rt+=t,Z0=Math.max(Z0,Math.hypot(o.x-ze,o.y-Se)),Z0>.06&&L0!=="drag"&&Rt>.05&&(L0="drag",W0=W(.55+Z0*1.2,.55,1),q.sound.hit("noise",.18,{dur:2.6,cutoff:380})),L0==="drag"&&(W0=Math.max(W0,W(.55+Z0*1.2,.55,1))),!L0&&Rt>.45&&Z0<.04&&(L0="hold"),L0==="hold"&&(d0=Math.min(1,d0+t/39),It=0)):L0=!1,ke=o.down,It+=t,!o.down&&It>14&&(d0=Math.max(le,d0-t/50));const a=o.taps();for(const s of a){Ut();const n=Bo(s.x,s.y);let c=null,i=.13;for(const r of e0){if(r.fade<.5)continue;ye(r);const l=we(r);for(const f of[[r.x,.5,r.z],U(r,...l.T),U(r,...l.H),U(r,...l.Cl),A0(U(r,...l.H),U(r,...l.Cl),.5),A0(U(r,...l.T),U(r,...l.H),.4)]){const x=T0([f[0]-T.ro[0],f[1]-T.ro[1],f[2]-T.ro[2]]),d=x[0]*n[0]+x[1]*n[1]+x[2]*n[2];if(d<=0)continue;const p=Math.acos(Math.min(1,d))*(r===I?.8:1);p<i&&(i=p,c=r)}}if(c)Do(c);else if(n[1]<-.002){const r=-T.ro[1]/n[1];if(r<400){const l=T.ro[0]+n[0]*r,f=T.ro[2]+n[2]*r;dt.push([l,f,.7,.05,2]),q.sound.hit("noise",.07,{dur:.35,cutoff:1500})}}}},Po=(t,o)=>{const a=[Math.sin(t.psi),-Math.cos(t.psi)],s=[Math.cos(t.psi),Math.sin(t.psi)],n=Yt*(1+W0*1.3)*(.82+.18*Math.sin(C*.23+t.ph)*Math.sin(C*.071+t.ph*2)),c=[_0[0]*n-a[0]*t.u,_0[1]*n-a[1]*t.u],i=Math.hypot(c[0],c[1])+1e-6,r=(c[0]*a[0]+c[1]*a[1])/i,l=(c[0]*s[0]+c[1]*s[1])/i;let f=Math.atan2(l,-r);const x=Math.abs(f),d=W(x*.55-.05,.14,1.42);x>2.9&&Math.abs(t.d)>.3&&(f=Math.sign(t.d)*x);const p=Math.sign(f)*Math.min(x,d),u=t.d,v=3.2*Math.min(1,i/2.5)+.4;t.dV+=(v*(p-t.d)-2*Math.sqrt(v)*t.dV)*o,t.dV=W(t.dV,-.32,.32),t.d+=t.dV*o,Math.abs(t.d)>d+.02&&Math.sign(t.d)===Math.sign(p)&&(t.d=Math.sign(t.d)*(d+.02),t.dV=0),Math.sign(u)!==Math.sign(t.d)&&t.fade>.5&&q.sound.hit("noise",.12,{dur:.5,cutoff:600});const y=Math.max(x-Math.abs(t.d),0),S=y<.75?1.5*Math.sin(Math.min(y*2.1,X/2)):1.5-(y-.75)*.25,F=.5*1.2*i*i,M=F*46*t.k*t.k*Math.max(S,0),L=[-a[0]*Math.cos(t.d)+s[0]*Math.sin(t.d),-a[1]*Math.cos(t.d)+s[1]*Math.sin(t.d)];let w=[-L[1],L[0]];w[0]*c[0]+w[1]*c[1]<0&&(w=[L[1],-L[0]]);const R=M*(w[0]*a[0]+w[1]*a[1]),D=M*(w[0]*s[0]+w[1]*s[1]);t.fill=i0(t.fill,W(S/1.5,0,1)*W(i/4,.3,1.2),o*2),t.flog=i0(t.flog,y<.08||Math.abs(t.d)<.3?1:0,o*2);const E=1500*t.k,A=t.tack?.3:1;t.u+=(R-(130*t.u*Math.abs(t.u)+50*t.u)*A)/E*o,t.u=W(t.u,t.tack?.35:0,4),t.phiV+=((D*4.2*t.k-12e3*t.k*t.phi)/(3200*t.k)-1.6*t.phiV)*o,t.phi+=t.phiV*o;const g=.6+.4*Math.sin(C*.137+t.ph*3)*Math.sin(C*.059+t.ph),k=.7+Xt*.5+W0;t.theta=(.009*Math.sin(C*1.1+t.ph)*g+.004*Math.sin(C*2.31+t.ph*2)+.003*Math.sin(C*3.7+t.ph*5)*(1-g))*k,t.bob=(.014*Math.sin(C*1.29+t.ph)*g+.007*Math.sin(C*2.03+t.ph*1.7))*k;{const N=l0-t.x,b=f0-t.z,P=W(N*a[0]+b*a[1],0,16);P>0&&Math.hypot(N-a[0]*P,b-a[1]*P)<t.dm+3&&C-(t.eyeT||-99)>3&&(t.eyeT=C,Ne(t))}if(!t.tack&&C-(t.lastT||-99)>9){const N=t.x+a[0]*26,b=t.z+a[1]*26;let P=b<yt(N)+22||b>xt(N)-22;for(const J of p0)Math.hypot(N-J[0],b-J[1])<J[2]*1.3+9&&(P=!0);if(!P)for(const J of R0){const s0=J.Rb+t.L*.75;for(let S0=1;S0<=3&&!P;S0++)Math.hypot(t.x+a[0]*10*S0-J.C[0],t.z+a[1]*10*S0-J.C[2])<s0&&(P=!0);if(P)break}P&&(t.lastT=C,t.mode==="run"?(t.psiT=Y(t.psiT+(t.z<-210?-.35:.35)),t.tack=1):j0(t))}t.mode==="run"&&!t.tack&&C-(t.lastT||-99)>14&&(t.psiT=Y(O+X-W((t.zl-t.z)*.012,-.3,.3))),t.tackAt&&C>t.tackAt&&(t.tackAt=0,t.lastT=C,j0(t)),t.near&&!t.tack&&Math.hypot(t.x-l0,t.z-f0)<t.near&&(t.near=0,t.lastT=C,j0(t)),!t.tack&&t.mode!=="run"&&C>t.nextT&&(t.lastT=C,j0(t)),t.mode==="reach"&&!t.tack&&(t.leg>0&&t.z<t.z1||t.leg<0&&t.z>t.z0)&&j0(t),t.mode==="beat"&&!t.tack&&(t.leg>0&&t.z<t.z1||t.leg<0&&t.z>t.z0)&&j0(t),t.tack===2&&Math.abs(Y(t.psi-t.psiT))<.35&&(t.psiT=t.tackFin,t.tack=1),t.tack===1&&Math.abs(Y(t.psi-t.psiT))<.12&&(t.tack=0,t.user=0);const Q=Y(t.psiT-t.psi),y0=t.tack&&(t.user||C-(t.eyeT||-99)<8)?.2:.13,t0=W(Q*.6,-y0,y0)*(.25+.75*Math.min(1,Math.abs(t.u)/1.2));t.rud=i0(t.rud,W(-Q*1.5,-.6,.6),o*3),t.w+=(t0-t.w)*o*.8,t.psi=Y(t.psi+t.w*o),t.x+=a[0]*t.u*o,t.z+=a[1]*t.u*o;for(const N of R0){const b=t.x-N.C[0],P=t.z-N.C[2],J=Math.hypot(b,P),s0=N.Rb*.8+t.L*.3;J<s0&&J>.001&&(t.x=N.C[0]+b/J*s0,t.z=N.C[2]+P/J*s0)}{const N=t.x-l0,b=t.z-f0,P=Math.hypot(N,b);P<t.dm&&P>.001&&(t.x=l0+N/P*t.dm,t.z=f0+b/P*t.dm,a[0]*N+a[1]*b<0&&C-(t.eyeT||-99)>3&&(t.eyeT=C,Ne(t)))}Math.abs(t.x)>470&&(t.x-=Math.sign(t.x)*900,t.fin=0),t.fin=Math.min(1,(t.fin===void 0?1:t.fin)+o/5),t.fade=Math.min(W((470-Math.abs(t.x))/60,0,1),t.fin*t.fin),t.lamp=g0(.3,.7,d0)},Ne=t=>{const o=Math.atan2(t.x-l0,-(t.z-f0));let a=o,s=9;[o+X/2-.35,o-X/2+.35,o].forEach((n,c)=>{if(Math.abs(Y(n-O))<.85)return;const i=Math.abs(Y(n-t.psi))+(c===2?1:0);i<s&&(s=i,a=n)}),t.lastT=C,t.psiT=t.tackFin=Y(a),t.tack=1,t.nextT=C+14+V()*50},j0=t=>{if(t.nextT=C+14+V()*50,t.mode==="beat"){const o=Y(t.psi-O);t.tackFin=Y(O-Math.sign(o||1)*.8),t.psiT=t.tackFin,t.tack=1,t.leg=-t.leg}else t.leg=-t.leg,t.tack=2,t.tackFin=t.leg>0?t.psiA:Y(t.psiA+X),t.psiT=Y(O+(t.leg>0?-.15:.15))};for(const t of e0){const o=[Math.sin(t.psi),-Math.cos(t.psi)],a=[Math.cos(t.psi),Math.sin(t.psi)],s=Yt*(.82+.18*Math.sin(t.ph)*Math.sin(t.ph*2)),n=[_0[0]*s-o[0]*t.u,_0[1]*s-o[1]*t.u],c=Math.hypot(n[0],n[1])+1e-6;let i=Math.atan2((n[0]*a[0]+n[1]*a[1])/c,-(n[0]*o[0]+n[1]*o[1])/c);const r=Math.abs(i),l=W(r*.55-.05,.14,1.42);r>2.9&&Math.abs(t.d)>.3&&(i=Math.sign(t.d)*r),t.d=Math.sign(i)*Math.min(r,l),t.fill=.8}let Uo=0;const qo=t=>{C+=t,Uo++,W0=Math.max(0,W0-t*(L0==="drag"?0:.16));for(const o of e0)Po(o,t);if(gt.length&&(K.wait>0?(K.wait-=t,K.wait<=0&&ce(!1)):(K.t+=t,(K.x0+K.dir*K.v*K.t)*K.dir>300&&(K.wait=8+V()*50))),Dt){let o=0;const a=(s,n,c,i)=>{o<16&&(qt.set([s,n,c,i],o*4),o++)};for(const s of e0){if(Math.abs(s.x-ue-it/2)>it/2+10||s.z<Lt-10||s.z>Lt+it+10)continue;const n=[Math.sin(s.psi),-Math.cos(s.psi)],c=-.0012*Math.min(Math.abs(s.u),3);a(s.x+n[0]*2.4*s.k,s.z+n[1]*2.4*s.k,1.5,c*.65),a(s.x-n[0]*2*s.k,s.z-n[1]*2*s.k,1.5,c*.55)}for(let s=dt.length-1;s>=0;s--){const n=dt[s];a(n[0],n[1],n[2],n[3]),--n[4]<=0&&dt.splice(s,1)}for(;o<16;o++)qt.set([0,0,1,0],o*4);Io()}else dt.length=0},Io=()=>{a0.dead&&(a0=Ct()),a0.last=++m.tick,m.P.sim.ok||Le("sim");const t=m.P.sim,o=a0.a[a0.cur],a=a0.a[1-a0.cur];e.bindFramebuffer(e.FRAMEBUFFER,a.f),e.viewport(0,0,X0,X0),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.useProgram(t.p),e.uniform4f(t.uSim,ue,Lt,Math.pow(.45*(1/30)/(it/X0),2),X0),e.uniform4fv(t.uSrc,qt),e.bindVertexArray(m.vaoE),Z(0,o.t),e.drawArrays(e.TRIANGLES,0,3),Z(0,null),a0.cur=1-a0.cur},be=new Float32Array(64),Fe={},ot=(t,o)=>{const a=Mo(),s=(.95+d0*1.4)*(Q0==="Sun"?.5:1);be.set([a.sun[0],a.sun[1],a.sun[2],d0,a.sc[0],a.sc[1],a.sc[2],J0.haze,a.AMB[0],a.AMB[1],a.AMB[2],J0.fog,T.ro[0],T.ro[1],T.ro[2],ht,t,t,o,C,a.HZS[0],a.HZS[1],a.HZS[2],g0(.3,.75,d0),a.ZEN[0],a.ZEN[1],a.ZEN[2],J0.cl,a.HZA[0],a.HZA[1],a.HZA[2],a.belt,T.r[0],T.r[1],T.r[2],s,T.u[0],T.u[1],T.u[2],H.mo==="Young crescent"?1:0,T.f[0],T.f[1],T.f[2],g0(.2,.8,d0),_0[0],_0[1],Xt,W0,l0,f0,it,Dt?1:0,Eo,Ao,At,V0,Ft[0],Ft[1],Ft[2],m.hf?1:0,To,1/X0,C*61.7%256|0,1])};ot(c0,0);const K0=t=>{e.useProgram(t.p),e.uniform4fv(t.uS,be),t.uT&&e.uniform4fv(t.uT,F0)},Be=()=>{E0.dead&&(E0=m.per.get(q.hash)||ve(),E0.sb||xe()),v0.dead&&(v0=m.bakes.get(Bt),v0||(v0=he(),De())),a0&&a0.dead&&(a0=Ct()),E0.last=v0.last=++m.tick,a0&&(a0.last=m.tick),Ut(),ko(),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindBuffer(e.ARRAY_BUFFER,m.dynB),e.bufferSubData(e.ARRAY_BUFFER,0,ge,0,H0*12),e.bindBuffer(e.ARRAY_BUFFER,m.hullB),e.bufferSubData(e.ARRAY_BUFFER,0,Me,0,lt*12),e.bindBuffer(e.ARRAY_BUFFER,m.sailB),e.bufferSubData(e.ARRAY_BUFFER,0,Ee,0,ft*16);const t=H0,o=(s,n,c)=>{ot(n,c);const i=B0.rc[c],r=[T.ro[0],T.ro[1],T.ro[2],T.f[0],T.f[1],T.f[2],d0];let l;const f=c?pe:n;(i.own!==Fe||r.some((x,d)=>x!==i.k[d]))&&(i.own=Fe,i.k=r,f!==n&&ot(f,c),e.bindFramebuffer(e.FRAMEBUFFER,i.f),e.viewport(0,0,f,f),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),l=m.P.rock,K0(l),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,m.tN3),Z(0,m.tN),e.bindVertexArray(E0.rv),e.drawArraysInstanced(e.TRIANGLES,0,6,oe),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,null),f!==n&&ot(n,c)),e.bindFramebuffer(e.FRAMEBUFFER,s),e.viewport(0,0,n,n),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.ALWAYS),e.disable(e.BLEND),l=m.P.copy,e.useProgram(l.p),e.uniform1f(l.uCs,f/n),Z(3,i.c),Z(4,i.d),e.bindVertexArray(m.vaoE),e.drawArrays(e.TRIANGLES,0,3),Z(3,null),Z(4,null),e.depthFunc(e.LEQUAL),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),Z(0,m.tN),l=m.P.cap,K0(l),e.bindVertexArray(E0.sv),e.drawArraysInstanced(e.TRIANGLES,0,6,E0.sn),l=m.P.hull,K0(l),e.bindVertexArray(m.vaoH),e.drawArraysInstanced(e.TRIANGLES,0,26*16*6,lt),l=m.P.sail,K0(l),e.bindVertexArray(m.vaoS),e.drawArraysInstanced(e.TRIANGLES,0,20*16*6,ft),l=m.P.cap,K0(l),e.bindVertexArray(m.vaoD),e.drawArraysInstanced(e.TRIANGLES,0,6,t)};o(B0.lf,c0,0),o(B0.rf,_t,1),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.flush(),ot(c0,0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,c0,c0),e.bindVertexArray(m.vaoE);const a=m.P.comp;K0(a),Z(0,m.tN),Z(1,m.tWv),Z(2,v0.t),Z(3,B0.lt),Z(4,B0.ld),Z(5,B0.rt),Z(6,a0?a0.a[a0.cur].t:null),Z(7,v0.ta),Z(8,v0.tn),Z(9,B0.rd),e.drawArrays(e.TRIANGLES,0,3);for(let s=0;s<10;s++)Z(s,null);e.activeTexture(e.TEXTURE0),e.bindVertexArray(null)},Le=t=>{const o=m.P[t];if(!e.getProgramParameter(o.p,e.LINK_STATUS))throw new Error("585 "+t+": "+e.getShaderInfoLog(o.vs)+e.getShaderInfoLog(o.fs)+e.getProgramInfoLog(o.p));const a={p:o.p};for(const n of["uS","uT","uB","uBk","uA","uNm","uSim","uSrc","uN","uN3","uWv","uL","uLD","uR","uRD","uW","uCs"])a[n]=e.getUniformLocation(o.p,n);e.useProgram(o.p),(t==="comp"?[["uN",0],["uWv",1],["uB",2],["uL",3],["uLD",4],["uR",5],["uW",6],["uA",7],["uNm",8],["uRD",9]]:t==="bake"?[["uN",0],["uB",2]]:t==="copy"?[["uL",3],["uLD",4]]:t==="rock"?[["uN",0],["uN3",1]]:t==="sim"?[["uW",0]]:[["uN",0]]).forEach(([n,c])=>{a[n]&&e.uniform1i(a[n],c)}),a.ok=!0,m.P[t]=a};if(m.fin){m.fin=!1;for(const t of["comp","bake","copy","rock","hull","sail","cap"])Le(t)}const De=()=>{ot(c0,0),e.bindFramebuffer(e.FRAMEBUFFER,v0.f),e.viewport(0,0,Y0,V0),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.disable(e.BLEND),e.disable(e.DEPTH_TEST);const t=m.P.bake;K0(t),e.uniform4f(t.uBk,Y0,V0,0,At),Z(0,m.tN),e.bindVertexArray(m.vaoE),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,v0.fa),e.uniform4f(t.uBk,Y0,V0,1,At),Z(2,v0.t),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,v0.fn),e.uniform4f(t.uBk,Y0,V0,2,At),e.drawArrays(e.TRIANGLES,0,3),Z(2,null),e.bindVertexArray(null)};de&&De(),Be(),m.P.sim||(m.mkP("sim",vt,qe,[]),e.flush());let Wt=0;return(t,o)=>{for(o=Math.min(o||0,.1),_o(o),Wt+=o;Wt>1/30;)qo(1/30),Wt-=1/30;Be()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
