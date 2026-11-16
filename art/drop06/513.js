// Sea Cave: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/513.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(rt){rt&&function(){"use strict";const Dt={yaw:0,pitch:0,x:0,y:0,z:0},ve=128,we=256,st=256,nt=512,it=64,ct=128,N=(e,t,l)=>e<t?t:e>l?l:e,de=Math.PI*2;let qe=null,He=null;function Ut(){if(qe)return;let e=1362828919;const t=64,l=new Float32Array(t*t*t),r=new Float32Array(t*t*t);for(let d=0;d<l.length;d++){e=e+1831565813|0;let p=Math.imul(e^e>>>15,1|e);p=p+Math.imul(p^p>>>7,61|p)^p,l[d]=((p^p>>>14)>>>0)/4294967296}const u=[1/16,4/16,6/16,4/16,1/16],v=(d,p,E,b,T)=>{for(let M=0;M<t;M++)for(let _=0;_<t;_++)for(let o=0;o<t;o++){let k=0;for(let A=-2;A<=2;A++)k+=u[A+2]*d[(o+A*E&63)+64*((_+A*b&63)+64*(M+A*T&63))];p[o+64*(_+64*M)]=k}};v(l,r,1,0,0),v(r,l,0,1,0),v(l,r,0,0,1),qe=new Float32Array(t*t*t),He=new Uint16Array(t*t*t);const h=new Float32Array(1),w=new Uint32Array(h.buffer);for(let d=0;d<r.length;d++){const p=N(.5+(r[d]-.5)*3.2,0,1);h[0]=p;const E=w[0],b=(E>>>23&255)-112,T=b<=0?0:b<<10|(E&8388607)>>>13;He[d]=T;const M=T>>10,_=T&1023;qe[d]=M===0?0:Math.pow(2,M-15)*(1+_/1024)}}let be=null;function It(){if(be)return;const e=32,t=8,l=new Float32Array(t*t*t*4);let r=1554059413;for(let w=0;w<l.length;w++){r=r+1831565813|0;let d=Math.imul(r^r>>>15,1|r);d=d+Math.imul(d^d>>>7,61|d)^d,l[w]=((d^d>>>14)>>>0)/4294967296}const u=new Float32Array(1),v=new Uint32Array(u.buffer),h=w=>{u[0]=w;const d=v[0],p=d>>>16&32768,E=(d>>>23&255)-112;return E<=0?p:E>=31?p|31743:p|E<<10|(d&8388607)>>>13};be=new Uint16Array(e*e*e*4);for(let w=0;w<e;w++)for(let d=0;d<e;d++)for(let p=0;p<e;p++){const E=(p+.5)/4,b=(d+.5)/4,T=(w+.5)/4,M=Math.floor(E-.5),_=Math.floor(b-.5),o=Math.floor(T-.5);let k=0,A=0,O=0,D=0,G=0,y=0,g=0,P=0,B=0;for(let V=0;V<8;V++){const se=M+(V&1),U=_+(V>>1&1),pe=o+(V>>2),ee=((se&7)+8*((U&7)+8*(pe&7)))*4,he=E-se-.5-(l[ee]-.5)*.85,W=b-U-.5-(l[ee+1]-.5)*.85,q=T-pe-.5-(l[ee+2]-.5)*.85,fe=he*he+W*W+q*q,X=Math.exp(-12*fe),te=.2+1.4*l[ee+3]*l[ee+3],ae=(fe+.45*q-.25)*te,Y=2*he*te,me=2*W*te,Z=(2*q+.45)*te,_e=-24*X*he,ne=-24*X*W,Q=-24*X*q;k+=X,A+=X*ae,O+=X*l[ee+1],D+=_e,G+=ne,y+=Q,g+=_e*ae+X*Y,P+=ne*ae+X*me,B+=Q*ae+X*Z}const S=1/Math.max(k,1e-9),C=(p+e*(d+e*w))*4;be[C]=h((g-A*S*D)*S),be[C+1]=h((P-A*S*G)*S),be[C+2]=h((B-A*S*y)*S),be[C+3]=h(O*S)}}function St(e,t,l){e=e*64-.5,t=t*64-.5,l=l*64-.5;const r=Math.floor(e),u=Math.floor(t),v=Math.floor(l),h=e-r,w=t-u,d=l-v;let p=0;for(let E=0;E<2;E++)for(let b=0;b<2;b++)for(let T=0;T<2;T++)p+=(T?h:1-h)*(b?w:1-w)*(E?d:1-d)*qe[(r+T&63)+64*((u+b&63)+64*(v+E&63))];return p}const oe=(e,t,l,r)=>St(e/(r*21),t/(r*21),l/(r*21)),lt=(e,t,l)=>{const r=N(.5+.5*(t-e)/l,0,1);return t+(e-t)*r-l*r*(1-r)},Xe=(e,t,l)=>-lt(-e,-t,l),Re=(e,t,l)=>{const r=N((l-e)/(t-e),0,1);return r*r*(3-2*r)};function ht(e,t,l,r,u,v,h){const w=e-r,d=Math.max(u+4-l,0),p=v+d*.38,E=h+d*.5;let b=t>0?(1-Math.hypot(w/p,t/E))*Math.min(p,E):p-Math.abs(w);return b=Math.min(b,t+9),Math.min(b,l-u+2)}function re(e,t,l,r){const u=e.o,v=r-e.zc,h=1.6*Math.sin(v*.061+u[0]*6)+.8*Math.sin(v*.13+u[1]*5),w=t-h,d=l,p=v,E=oe(t+u[0]*40,l+u[1]*40,r+u[2]*40,7)-.5,b=e.rx*(1+.35*E),T=(d>0?e.ryU:e.ryD)*(1+.3*E),M=e.len,_=Math.hypot(w/b,d/T,p/M),o=Math.hypot(w/(b*b),d/(T*T),p/(M*M));let k=-_*(_-1)/Math.max(o,.001);k=Xe(k,ht(t,l,r,e.xa,e.zIn,e.hw,e.tp),1.5),e.xa2>-50&&(k=Xe(k,ht(t,l,r,e.xa2,e.zIn+1,e.hw*.55,e.tp*.7),1));const A=e.px,O=e.py,D=e.zc-e.len+6,G=-6,y=.6,g=-26,P=t-A,B=l-O,S=r-D,C=N((P*G+B*y+S*g)/(G*G+y*y+g*g),0,1);k=Xe(k,e.pr*(1-.55*C)-Math.hypot(P-G*C,B-y*C,S-g*C),2.5);const V=1-.8*Re(e.zIn-7,e.zIn-1,r)*(1-Re(3,9,Math.abs(t-e.xa)));k+=V*(E*1.4+(oe(r+u[0]*17,t+u[1]*17,l+u[2]*17,2.4)-.5)*1.1)*e.relief,k+=.55*(.2-Math.abs(oe(t+u[0]*23,l+u[1]*23,r+u[2]*23,1.1)-.5))*e.relief,k+=.07*Math.sin(l*2.3+5*oe(t+u[0]*31,l+u[1]*31,r+u[2]*31,1.6)),k+=.45*Math.exp(-(l-.3)*(l-.3)/.4);const se=l+e.sand+(oe(t+u[0]*11,u[1]*11,r+u[2]*11,3)-.5)*1.4-e.boulders*Math.max(oe(t+u[0]*7,l+u[1]*7,r+u[2]*7,1.6)-.45,0)*3;if(k=Math.min(k,se),e.bench){const U=e.bench,pe=Math.abs(t-U.x)-U.hx,ee=Math.abs(l-U.y)-2.6,he=Math.abs(r-U.z)-U.hz;let W=Math.hypot(Math.max(pe,0),Math.max(ee,0),Math.max(he,0))+Math.min(Math.max(pe,ee,he),0);const q=t-U.cx,fe=r-U.cz,X=Re(.16,2.6,q*q+fe*fe)*(1-Re(.6,.9,W));if(X>0){const te=Math.abs(t-U.x+(oe(t+u[0]*13,l+u[1]*13,r+u[2]*13,2.2)-.5)*1.4)-U.hx+.8,ae=Math.abs(r-U.z+(oe(r+u[0]*19,l+u[1]*19,t+u[2]*19,2.2)-.5)*1.4)-U.hz+.8;let Y=Xe(Math.hypot(Math.max(te,0),Math.max(ae,0))+Math.min(Math.max(te,ae),0)-.8,l-U.y-2.6+(oe(t+u[0]*29,l*.3+u[1]*29,r+u[2]*29,1.2)-.5)*.8+.05*(t-U.x),.35);Y=Math.max(Y,W-.15),W+=(Math.min(Y,W)+(Y-Math.min(Y,W))*Re(.12,.45,l)-W)*X}W+=(oe(t+u[0]*9,l+u[1]*9,r+u[2]*9,1.4)-.5)*.7-.25,k=lt(k,W,1)}return Math.max(k,r-e.zOut)}const Te=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,ft="void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",Ne=`
uniform vec4 uP[34];
uniform sampler3D uN3; uniform sampler3D uSd;
uniform sampler2D uSim; uniform sampler2D uG; uniform sampler2D uK; uniform sampler2D uPb; uniform sampler2D uA;
out vec4 oC;
#define TIDE uP[3].w
#define TIME uP[1].w
float nz(vec3 p, float s) { return textureLod(uN3, p / (s * 21.), 0.).r; }   // no mips: the same as texture(), cheaper to compile
// the same noise read through a smoothed cell coordinate: no crease where linear filtering bends at a cell wall
float nzs(vec3 p, float s) { vec3 x = p / (s * 21.) * 64. - .5, i = floor(x), f = x - i; f = f * f * (3. - 2. * f); return textureLod(uN3, (i + f + .5) / 64., 0.).r; }
float h11(float x) { return fract(sin(x * 91.3458 + 17.13) * 47453.5453); }
float smin(float a, float b, float k) { float h = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(b, a, h) - k * h * (1. - h); }
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
float archD(vec3 p, float xa, float zIn, float hw0, float tp0) {
  float u = p.x - xa, fl = max(zIn + 4. - p.z, 0.);
  float hw = hw0 + fl * .38, tp = tp0 + fl * .5;
  float d = p.y > 0. ? (1. - length(vec2(u / hw, p.y / tp))) * min(hw, tp) : hw - abs(u);
  d = min(d, p.y + 9.);
  return min(d, p.z - zIn + 2.);
}
// the limestone's bedding as a sea cave shows it (uP[31]: the beds' axis, beds per metre; uP[32]: the joints'
// direction, spacing, seed): beds of uneven thickness, bent by the large noise, each stepping out at its base into a
// rounded ledge whose underside takes the light from the water, and melting away in stretches where the sea has
// dissolved them; a few wandering joints open into shallow slots in places and vanish in others.
// x: offset (+ = air), y: how open a bedding plane or joint is here (0..1), z: bed index
vec3 beds(vec3 p) {
  vec4 Bd = uP[31], Jd = uP[32];
  float wn = nzs(p * .5 + Jd.w, 4.) - .5;
  float h = dot(p, Bd.xyz) + wn * 2.6;
  h += .3 * sin(h * 1.3 + Jd.w);
  // in packets: a massive bed two or three metres thick, or a packet of two to seven thin ones
  float u = h * Bd.w * .32, pk = floor(u), hp = fract(sin(pk * 53.71 + Jd.w) * 23421.631);
  float nb = hp < .5 ? 1. : 2. + floor(fract(hp * 13.7) * 6.), uu = (u - pk) * nb;
  float bi = pk * 8. + floor(uu), fu = fract(uu), hb = fract(sin(bi * 91.3458 + Jd.w) * 47453.5453);
  float pr = nz(p * .45 + Jd.w, 1.);
  float o = (fu - smoothstep(.5, 1., fu)) * (.03 + .4 * hb * hb * hb) * inversesqrt(nb) * smoothstep(.28, .6, pr);
  // the joints: far apart, wandering, open only where the rock is weak
  float jx = (dot(p.xz, Jd.xy) + wn * 2. + .35 * sin(p.y * .8 + Jd.w)) / (Jd.z * 2.4);
  float ej = abs(fract(jx) - .5) * Jd.z * 2.4;
  float jo = smoothstep(.55, .75, pr) * step(.45, fract(sin(floor(jx) * 47.13 + Jd.w) * 43758.55));
  float sl = jo * (1. - smoothstep(0., .07 + .1 * jo, ej));
  return vec3(o + sl * .1, sl, bi);
}
// the cave: positive in air and water, negative in rock (lo = 0 adds the fine relief used for shading)
float cave(vec3 p, float lo, out float bbx, out float bz) {
  vec4 A = uP[4], B = uP[5], C = uP[6], D = uP[17];
  vec3 o = uP[13].xyz;
  float zr = p.z - B.x;
  float cx = 1.6 * sin(zr * .061 + o.x * 6.) + .8 * sin(zr * .13 + o.y * 5.);
  vec3 q = vec3(p.x - cx, p.y, zr);
  float l1 = nzs(p + o * 40., 7.) - .5;
  vec3 r = vec3(A.x * (1. + .35 * l1), (q.y > 0. ? A.y : A.z) * (1. + .3 * l1), A.w);
  float k0 = length(q / r), k1 = length(q / (r * r));
  float d = -k0 * (k0 - 1.) / max(k1, 1e-3);
  d = smax(d, archD(p, B.y, B.z, B.w, C.x), 1.5);
  if (C.z > -50.) d = smax(d, archD(p, C.z, B.z + 1., B.w * .55, C.x * .7), 1.);
  vec3 a0 = vec3(D.x, D.y, B.x - A.w + 6.), ab = vec3(-6., .6, -26.);
  vec3 pa = p - a0; float hh = clamp(dot(pa, ab) / dot(ab, ab), 0., 1.);
  d = smax(d, D.z * (1. - .55 * hh) - length(pa - ab * hh), 2.5);
  float wa = 1. - .8 * smoothstep(B.z - 7., B.z - 1., p.z) * (1. - smoothstep(3., 9., abs(p.x - B.y)));
  d += wa * (l1 * 1.4 + (nzs(p.zxy + o * 17., 2.4) - .5) * .9) * uP[9].w;
  // (the beds, the joints and the sea-worn skin are added as relief where the rock is shaded, in R: the march's
  // compile is the opening's long pole)
  d += .45 * exp(-(p.y - .3) * (p.y - .3) / .4);
  if (lo < .5) d += -lo * ((abs(nz(p * 1.7 + o * 5., .3) - .5) - .1) * .1 + (nz(p * .8 + o * 2., .6) - .5) * .04 + (nz(p.yzx * 2.3 + o * 3., .1) - .5) * .012 * -lo);
#ifdef PG_m
  float sd = p.y + C.w;   // the view's march never shows the drowned floor (the pool's passes read it from the bake)
#else
  float sd = p.y + C.w + (nz(vec3(p.x, 0., p.z) + o * 11., 3.) - .5) * 1.4 - uP[13].w * max(nz(p + o * 7., 1.6) - .45, 0.) * 3.;
  if (lo < .5) sd += -lo * .04 * sin(p.x * 3.1 + p.z * 1.7 + 4. * nz(p + o, .5));
#endif
  d = min(d, sd);
  vec4 E = uP[14];
  vec3 bq = abs(p - E.xyz) - vec3(E.w, 2.6, uP[15].x);
  bbx = length(max(bq, 0.)) + min(max(bq.x, max(bq.y, bq.z)), 0.);
  bz = (nz(p + o * 9., 1.4) - .5) * .7 - .25 + (nz(p * 1.3 + o * 4., .5) - .5) * .35;
  d = smin(d, bbx + bz, 1.);
  return max(d, p.z - C.y);
}
// cave() with the ledge above the water worn rock, not a box: a wandering outline, rounded corners and crest, an
// uneven top dipping to the sea. At the waterline it only grows (the pool keeps its outline), where you stand it is
// unchanged, the field more than 0.9 m off the old box is left as it was (the march through the air reads the same
// bake as before), and the bake keeps it out of the layers the pool's surface reads (below lk). The rock without the ledge
// comes back out of cave()'s smooth union (k 1: d = b - k h^2 where the wall is near, a >= b + k where it is not).
float caveW(vec3 p, float lo, float lk) {
  float bb, bz;
  float d = cave(p, lo, bb, bz);
  vec4 E = uP[14];
  vec2 cb = p.xz - vec2(uP[16].w, uP[17].w);
  float wb = p.y < lk ? 0. : smoothstep(.16, 2.6, dot(cb, cb)) * (1. - smoothstep(.6, .9, bb));
  if (wb > 0.) {
    // and not in or right beside the ledge's opening view (eye uP[16].w, uP[21].w, uP[17].w, looking .21 rad left of
    // the arch, pitch -.05): e is metres outside its frustum; the bake keeps a wider margin (its texels blend)
    vec2 ah = normalize(vec2(uP[5].y, uP[6].y) - vec2(uP[16].w, uP[17].w)), fh = vec2(ah.x * .97803 - ah.y * .20846, ah.y * .97803 + ah.x * .20846);
    vec3 fw = vec3(fh.x * .99875, -.04998, fh.y * .99875), rt = vec3(fh.y, 0., -fh.x), up = cross(fw, rt);
    vec3 pc = p - vec3(uP[16].w, uP[21].w, uP[17].w);
    float e = max(abs(dot(pc, rt)), abs(dot(pc, up))) - .60086 * dot(pc, fw);
    wb *= lk > -1e8 ? smoothstep(.9, 1.5, e) : smoothstep(.02, .12, e);
  }
  if (wb > 0.) {
    vec3 o = uP[13].xyz, pb = p - E.xyz;
    float b = bb + bz;
    float h = sqrt(clamp(b - d, 0., 1.)), a = b - d >= 1. ? d : b + 1. - 2. * h;
    vec2 q2 = abs(pb.xz + (vec2(nz(p + o * 13., 2.2), nz(p.zyx + o * 19., 2.2)) - .5) * 1.4) - vec2(E.w, uP[15].x) + .8;
    float bn = smax(length(max(q2, 0.)) + min(max(q2.x, q2.y), 0.) - .8, pb.y - 2.6 + (nz(vec3(p.x, p.y * .3, p.z) + o * 29., 1.2) - .5) * .8 + .05 * pb.x, .35);
    bn = max(bn, bb - .15);
    d = mix(d, max(smin(a, mix(min(bn, bb), bn, smoothstep(.12, .45, p.y)) + bz, 1.), p.z - uP[6].y), wb);
  }
  return d;
}
float sdfB(vec3 p) { vec3 u = (p - uP[22].xyz) * uP[23].xyz; vec2 v = texture(uSd, u.xzy).rg; return dot(v, uP[27].zw) + uP[22].w; }
float sdU(vec3 p) { return sdfB(p); }
vec2 sUV(vec2 xz) { return (xz - uP[11].xy) * uP[11].zw; }
// light under water at q: the sea-lit window(s) below the arch, absorbed per wavelength on the way
vec3 winE(vec3 q) {
  vec3 e = vec3(0.);
  int n = int(uP[8].w);
  for (int i = 0; i < n; i++) {
    vec3 W = vec3(i == 0 ? uP[5].y : uP[6].z, TIDE - 3.5, uP[6].y - 2.);
    vec3 v = q - W; float d = length(v) + .01;
    float g = (.3 + .7 * clamp(-v.z / d, 0., 1.)) / (d * (d * .45 + 5.) + 4.);
    e += (i == 0 ? 1. : .45) * g * exp(-uP[7].rgb * d);
  }
  e += .0006 * exp(-uP[7].rgb * max(uP[6].y - q.z, 0.) * .8);
  return e * uP[8].rgb;
}
// radiance seen from p (just under the surface) along d, up to tMax; w = the floor's share of it (fl: how bright
// the floor shows; rays that leave through the drowned mouth see the sunlit sea itself)
vec4 under(vec3 p, vec3 d, float tMax, float bub, float fl) {
  vec3 W = vec3(uP[5].y, TIDE - 3.5, uP[6].y - 2.);
  vec3 c = uP[7].rgb + uP[7].w;
  vec3 L = vec3(0.), T = vec3(1.);
  float t = 0., h = 1.;
  int N = int(uP[21].y);
  for (int i = 0; i < N; i++) {
    vec3 q = p + d * t;
    h = sdU(q);
    if (h < .08 || t >= tMax) break;
    float dt = min(clamp(h * .85, .25, 4.), tMax - t + .001);
    vec3 m = q + d * dt * .5;
    vec3 E = winE(m);
    float cs = dot(normalize(m - W), -d);
    float ph = .05 + .5 * .51 / (12.566 * pow(1.49 - 1.4 * cs, 1.5));
    float bb = bub * exp(-(TIDE - m.y) * 1.3) * .35;
    vec3 a = exp(-c * dt);
    L += T * (E * uP[7].w * ph + mix(E, vec3(dot(E, vec3(.3, .4, .3))), .4) * bb) * (1. - a) / c;
    T *= a; t += dt;
  }
  if (h < .08) {
    vec3 q = p + d * t;
    vec3 n = vec3(0.);
    for (int i = 0; i < int(uP[21].z); i++) {
      vec3 e = .5773 * (2. * vec3(float(((i + 3) >> 1) & 1), float((i >> 1) & 1), float(i & 1)) - 1.);
      n += e * sdU(q + e * .25);
    }
    n = normalize(n + vec3(0., 1e-4, 0.));
    float sand = smoothstep(.55, .9, n.y) * (1. - smoothstep(-uP[6].w + .6, -uP[6].w + 2.6, q.y));
    vec3 alb = mix(uP[9].rgb * .9, vec3(.66, .63, .55), sand) * (.7 + .6 * nz(q * 2. + 5., .5));
    alb *= 1. + .25 * sand * sin(q.x * 4.3 + q.z * 2.1 + 6. * nz(q, .8));
    vec3 E = winE(q);
    float ld = max(dot(n, normalize(W - q)), 0.);
    vec3 Lf = T * alb * E * (.35 + .9 * ld) * fl * smoothstep(.04, .3, t);   // no pale kerb where the floor meets the surface
    L += Lf;
    return vec4(L, dot(Lf, vec3(1.)) / max(dot(L, vec3(1.)), 1e-6));
  }
  if ((p + d * t).z > uP[6].y - 1.) L += T * uP[8].rgb * uP[29].y;
  return vec4(L, 0.);
}
// how much of the arch's open sky a ray from p along d passes through (0..1)
float archSee(vec3 p, vec3 d) {
  float r = 0.;
  if (d.z > 1e-3) {
    float s = (uP[6].y - 1. - p.z) / d.z;
    vec3 a = p + d * s;
    float y0 = TIDE + uP[12].y;
    float wl = smoothstep(y0, y0 + .06, a.y);
    float u = (a.x - uP[5].y) / uP[5].w, v = a.y / uP[6].x;
    r = (1. - smoothstep(.88, 1., length(vec2(u, max(v, 0.))))) * wl;
    if (uP[6].z > -50.) {
      u = (a.x - uP[6].z) / (uP[5].w * .55); v = a.y / (uP[6].x * .7);
      r += (1. - smoothstep(.85, 1., length(vec2(u, max(v, 0.))))) * wl;
    }
  }
  return min(r, 1.);
}
vec3 outside(vec3 d) {
  float sea = 1. - smoothstep(-.03, .01, d.y);
  float sp = pow(nz(vec3(d.x * 30., d.y * 300., TIME * 1.5), .2), 5.) * 5.;
  return uP[16].rgb * mix(vec3(1.2), vec3(.32, .62, .85) * (.6 + sp), sea);
}
// the sky and sea out through the mouth as the eye sees them from the dark (uP[29].w: a stop or two down)
vec3 sky(vec3 d) {
  float sea = 1. - smoothstep(-.008, .002, d.y);
  float sp = pow(nz(vec3(d.x * 30., d.y * 300., TIME * 1.5), .2), 5.) * 5.;
  vec3 hz = mix(vec3(1.3, 1.32, 1.34), vec3(.8, .95, 1.2) * (uP[33].w == 3. ? vec3(.7, .75, 1.3) : vec3(1.)), smoothstep(0., .3, d.y));   // haze at the horizon, bluer above
  vec3 c = mix(hz, vec3(.22, .55, .85) * (uP[33].w == 2. ? .8 : .75 + sp) * .16, sea);   // the sea band well under the sky: a horizon even when the sky is white
  // a far headland: sunlit stone softened by haze, its top uneven
  float a = d.x / max(d.z, .05) - uP[33].x, ch = uP[33].z * (1. - smoothstep(.3, 1., abs(a) / uP[33].y)) * (.75 + .5 * nz(vec3(a * 9., 1., 2.), .2));
  c = mix(c, vec3(.95, .82, .62) * .32 * (.7 + .3 * smoothstep(-.01, ch, d.y)), (1. - smoothstep(ch - .001, ch + .001, d.y)) * step(-.004, d.y) * .8);
  return uP[16].rgb * uP[29].w * c;
}
// the view's march is kept at the screen's size; the low passes read it at their pixel (uP[26].z: screen / low)
ivec2 mPx() { return ivec2(gl_FragCoord.xy * uP[26].z); }
vec3 kGlow(vec2 xz, float lod) { return 4. * textureLod(uK, sUV(xz), lod).rgb; }
void camRay(out vec3 ro, out vec3 rd) {
  vec2 qv = gl_FragCoord.xy * uP[19].zw * 2. - 1.;
  ro = uP[0].xyz; rd = normalize(uP[1].xyz + (qv.x * uP[2].xyz + qv.y * uP[3].xyz) * uP[0].w);
}
// where the view ray meets the moving surface (the sim's height; the arch's swell at the mouth)
float waterT(vec3 ro, vec3 rd) {
  float tw = 1e5;
  if (rd.y < -1e-4) {
    tw = (TIDE - ro.y) / rd.y;
    for (int i = 0; i < 2; i++) {
      vec3 pw = ro + rd * tw;
      float hs = pw.z > uP[6].y - 1.2 ? uP[12].y : textureLod(uSim, sUV(pw.xz), 0.).x;
      tw = (TIDE + hs - ro.y) / rd.y;
    }
  }
  return tw;
}
// how much of the arch's sky the rays from p0 along dA, dB, dC see (the first n0 of them: x, y, z), and w: the
// afternoon shaft's samples along the view ray up to dist. One call site of archSee for the whole program.
vec4 seeArch(vec3 p0, vec3 dA, vec3 dB, vec3 dC, int n0, float dist, vec3 ro, vec3 rd) {
  vec4 r = vec4(0.);
  // the shaft's samples start at an interleaved offset per pixel (an even pattern the composite's gather hides)
  float L = min(dist, 80.), j = fract(52.98292 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715))));
  int ns = uP[10].w > 0. ? int(uP[12].w) : 0;
  for (int i = 0; i < n0 + ns; i++) {
    bool a = i < n0;
    vec3 q = a ? p0 : ro + rd * L * (float(i - n0) + j) / 10.;
    float v = archSee(q, a ? (i == 0 ? dA : i == 1 ? dB : dC) : -uP[10].xyz);
    r += v * (a ? vec4(float(i == 0), float(i == 1), float(i == 2), 0.) : vec4(0., 0., 0., step(TIDE, q.y) * exp(-max(uP[6].y - 1. - q.z, 0.) * .25)));
  }
  return r;
}
// air: a faint blue haze lit by the pool, and the afternoon shaft through the arch (s: seeArch's w): cave air is
// nearly clear, so the shaft is only a thin warm haze in the spray near the mouth
vec3 air(vec3 col, float dist, vec3 ro, vec3 rd, float s) {
  float fog = 1. - exp(-dist * .012), L = min(dist, 80.), cs = dot(rd, -uP[10].xyz);
  col = mix(col, kGlow(ro.xz + rd.xz * min(dist, 40.) * .5, 6.) * .05, fog);
  return col + uP[16].rgb * vec3(1., .8, .55) * uP[10].w * uP[12].z * s / 10. * min(L, 20.) * .0012 * (.3 + .03 / pow(1.3 - 1.2 * cs, 1.5)) * .3;
}
`,Je=`
vec2 waves(vec2 w, float fp, int i0, int n, out float lap) {
  vec2 g = vec2(0.), dp = vec2(0.); lap = 0.;
  float sd = uP[24].w, st = uP[24].z;
  for (int i = i0; i < n; i++) {
    float fi = float(i);
    float lam = fi < 16. ? .45 * pow(1.15, fi) : .07 * pow(1.22, fi - 16.);
    float k = 6.2832 / lam;
    // most trains come in through the mouth inside a fan, so they cross at shallow angles; a few come off the walls
    float an = h11(fi + sd) < .72 ? 3.1416 + (h11(fi * 3.1 + sd) - .5) * 1.5 : h11(fi * 7.7 + sd) * 6.2832;
    vec2 dir = vec2(sin(an), cos(an));
    float om = sqrt(9.81 * k + 7.4e-5 * k * k * k);
    float a = st * lam * (.5 + h11(fi * 5.3 + sd)) / 6.2832 * smoothstep(3., 7., lam / fp);
    // the short ripples ride the long ones: they are read where the long trains have carried the water
    float ph = k * dot(dir, w - dp) - om * TIME + h11(fi * 1.9 + sd) * 6.2832, sp = sin(ph);
    g += a * k * cos(ph) * dir; lap -= a * k * k * sp;
    if (fi < 16.) dp += a * sp * dir * 2.5;
  }
  return g;
}
`,Lt=`
void main() {
  vec2 f = gl_FragCoord.xy;
  vec3 p = uP[22].xyz + vec3(f.x * uP[25].x, (uP[20].w + .5) * uP[25].y, f.y * uP[25].z);
  float d = caveW(p, 1., uP[25].w);
  if (uP[23].w > .5) { float v = floor(clamp((d + 32.) / 64., 0., 1.) * 65535.); float hi = floor(v / 256.); d = hi / 255.; oC = vec4(d, (v - hi * 256.) / 255., 0., 1.); }
  else oC = vec4(d, 0., 0., 1.);
}`,qt=`
void main() {
  ivec2 ij = ivec2(gl_FragCoord.xy);
  vec2 res = uP[19].xy;
  vec2 w = uP[11].xy + (vec2(ij) + .5) / res / uP[11].zw;
  float m = sdU(vec3(w.x, TIDE, w.y));
  vec4 s = texelFetch(uSim, ij, 0);
  vec4 r = vec4(0.);
  if (m > 0.) {
    ivec2 mx = ivec2(res) - 1;
    vec4 a = texelFetch(uSim, clamp(ij + ivec2(1, 0), ivec2(0), mx), 0);
    vec4 b = texelFetch(uSim, clamp(ij - ivec2(1, 0), ivec2(0), mx), 0);
    vec4 c = texelFetch(uSim, clamp(ij + ivec2(0, 1), ivec2(0), mx), 0);
    vec4 e = texelFetch(uSim, clamp(ij - ivec2(0, 1), ivec2(0), mx), 0);
    a.xz = a.w > .5 ? a.xz : s.xz; b.xz = b.w > .5 ? b.xz : s.xz; c.xz = c.w > .5 ? c.xz : s.xz; e.xz = e.w > .5 ? e.xz : s.xz;
    vec2 cell = 1. / (res * uP[11].zw);
    float lap = (a.x + b.x - 2. * s.x) / (cell.x * cell.x) + (c.x + e.x - 2. * s.x) / (cell.y * cell.y);
    float cw = uP[18].y * clamp(m / 4., .15, 1.);
    float dt = uP[18].x;
    float v = s.y + dt * (cw * cw * lap - uP[18].z * s.y);
    float h = s.x + dt * v;
    vec2 am = vec2(uP[5].y, uP[6].y - 1.5);
    if (w.y > uP[6].y - 1.2) { h = uP[18].w; v = uP[26].x; }
    float bub = s.z * exp(-dt * .3) + .12 * (a.z + b.z + c.z + e.z - 4. * s.z);
    vec2 dm = w - am;
    bub += uP[24].y * dt * exp(-dot(dm, dm) / 5.);
    for (int i = 0; i < int(uP[15].y); i++) {
      vec4 en = texelFetch(uPb, ivec2(4 + i, 0), 0);
      vec2 de = w - en.xy;
      if (en.z < .6) bub += dt * 3. * exp(-dot(de, de) / .08);
    }
    r = vec4(h, v, min(bub, 3.), 1.);
  }
  oC = r;
}`,Xt=`
void main() {
  vec2 uv = gl_FragCoord.xy * uP[19].zw;
  vec2 w = uP[11].xy + uv / uP[11].zw;
  vec3 p = vec3(w.x, TIDE - .02, w.y);
  vec4 r = vec4(0.);
  if (sdU(p) > 0.) {
    vec4 s = texture(uSim, uv);
    vec4 u = under(p, vec3(0., -1., 0.), 60., s.z, .36);
    r = vec4(u.rgb * uP[20].z, 1.);
  }
  oC = r;
}`,Nt=`
void main() {
  vec2 uv = gl_FragCoord.xy * uP[19].zw;
  vec2 w = uP[11].xy + uv / uP[11].zw;
  vec3 g = texture(uG, uv).rgb / uP[20].z;
  float lap;
  waves(w, .01, 0, int(uP[24].x), lap);
  vec2 e = uP[25].xy;
  float h0 = texture(uSim, uv).x;
  lap += (texture(uSim, uv + vec2(e.x, 0.)).x + texture(uSim, uv - vec2(e.x, 0.)).x - 2. * h0) / (uP[25].z * uP[25].z)
       + (texture(uSim, uv + vec2(0., e.y)).x + texture(uSim, uv - vec2(0., e.y)).x - 2. * h0) / (uP[25].w * uP[25].w);
  float C = 1. / max(abs(1. + 2.2 * lap), .2);
  oC = vec4(min(g * .25, 1.), clamp(C * .25, 0., 1.));
}`,Ot=`
void main() {
  vec3 ro, rd; camRay(ro, rd);
  float zO = uP[6].y;
  float t = .05, d = 1.; vec3 p = ro;
  // one cave site (it is big to compile): the march, then the tetrahedral normal taps (k >= 0) with the fine relief fd
  int N = int(uP[21].x), NT = int(uP[21].z), k = -1;
  vec3 n = vec3(0.), te = vec3(0.);
  float fd = 0., ep = 0., am = 1e3;
  bool hit = false;
  for (int i = 0; i < N + NT + 1; i++) {
    vec3 q = p; float lo = 1.; bool cv = false;
    if (k < 0) {
      bool stop = hit || i >= N;
      if (!stop) {
        p = ro + rd * t;
        stop = p.z > zO + .3 || t > 170.;
        if (!stop) { d = sdfB(p); q = p; cv = d < .3; }
      }
      if (stop) {
        if (p.z > zO + .2 || d >= .05) break;
        k = 0; fd = -clamp(2.2 - t * .09, .15, 1.); ep = .012 + .0025 * t;
      }
    }
    if (k >= 0) {
      if (k >= NT) break;
      te = .5773 * (2. * vec3(float(((k + 3) >> 1) & 1), float((k >> 1) & 1), float(k & 1)) - 1.);
      q = p + te * ep; lo = fd; cv = true;
    }
    float c = cv ? caveW(q, lo, -1e9) : d;
    if (k >= 0) { n += te * c; k++; }
    else { d = c; if (cv) am = min(am, d / t); if (cv && d < .0012 * t + .002) hit = true; else t += d * .8; }
  }
  // through the arch: y = how many pixels the ray passed from the rock (the composite softens the rim with it)
  vec3 o = k >= NT ? normalize(n + vec3(0., 1e-6, 0.)) : p.z > zO + .2 ? vec3(am / (2. * uP[0].w * uP[19].w), 0., 3.) : vec3(0.);
  oC = vec4(t, o);
}`,Ct=`
uniform sampler2D uT;
uniform sampler3D uDs;
// the rock's sea-worn skin at p, read at four sizes from a small map of scattered dishes made in make() (uDs: the
// gradient of the relief in xyz, a tone per dish in w; no single noise's outline): two sizes of scallops (overlapping
// spoon dishes of uneven depth, drawn out and leaning along the surge, their rims soft), finger-size pits, and above
// the sea's reach broad shallow scars. Returns the gradient of the relief (xyz) and a tone (w). wr: how much the sea
// reaches here (0..1), sc: the scallops' size (smaller at the mouth), ep: the size the normal can draw
vec4 worn(vec3 p, float wr, float sc, float ep) {
  vec3 gr = vec3(0.); float tone = 0.;
  for (int l = 0; l < int(uP[21].z); l++) {
    float cs = l == 3 ? 1.3 : (l == 0 ? .5 : l == 1 ? .19 : .05) * sc;
    float amp = (l == 3 ? .045 * (1. - .7 * wr) : l == 0 ? .11 * wr : l == 1 ? .035 * wr : .0035 * (.5 + .5 * wr)) * smoothstep(1.2, 3., cs / ep);
    vec3 sq = vec3(l == 1 ? -1. : 1., 1., l == 3 ? 1. : .7) / cs;
    vec4 d = textureLod(uDs, (p * sq + float(l) * 3.17) * .125, 0.);
    gr += d.xyz * sq * amp;
    if (l == 3) tone = d.w - .5;
  }
  return vec4(gr, tone);
}
void main() {
  vec3 ro, rd; camRay(ro, rd);
  vec4 r = vec4(0.), ca = texelFetch(uT, mPx(), 0);
  float tw = rd.y < -1e-4 ? (TIDE - ro.y) / rd.y : 1e5;
  if (ca.x <= tw - .4 && ca.w < 2. && dot(ca.yzw, ca.yzw) > .25) {
    // rock in front: its sea-worn skin for R (the gradient of the relief, and the facet's tone in w as -1.5 - tone)
    float t = ca.x;
    vec3 p = ro + rd * t;
    float ep = .012 + .0025 * t, wa = 1. - .8 * smoothstep(uP[5].z - 7., uP[5].z - 1., p.z) * (1. - smoothstep(3., 9., abs(p.x - uP[5].y)));
    // the sea's reach: a band from the water to a metre or two up (higher with the swell), and the mouth's rim, in patches
    float y0 = p.y - TIDE, sw0 = uP[15].w;
    float wr = max(1. - smoothstep(1. + sw0 * 3., 2.6 + sw0 * 4., y0), 1.25 * (1. - wa)) * (.35 + .65 * smoothstep(.3, .7, nzs(p * .7 + 11., 1.)));
    vec4 wo = worn(p, min(wr, 1.), mix(.75, 1., wa), ep);
    r = vec4(wo.xyz, -1.5 - wo.w);
  }
  else if (rd.y < -1e-4) {
    vec3 pw = ro + rd * tw, tr = refract(rd, vec3(0., 1., 0.), .7519);
    bool vis = ca.x > tw - .4;
    if (vis) r = under(pw, tr, 70., 0., uP[29].x);
    // in the afternoon the sun's blades through the drowned mouth cross the water and leave bright patches on the sand
    // (kept with the view: the pool's own program is the opening's long pole)
    if (vis && uP[10].w > 0.) {
      float zO = uP[6].y, dF = (uP[6].w + TIDE) / max(-tr.y, .3);
      vec3 sw = normalize(vec3(uP[10].x, uP[10].y * 2.2, uP[10].z));
      float bm = 0.;
      for (int i = 0; i < int(uP[12].w) - 3; i++) {   // 7 steps; a uniform bound keeps the loop rolled
        float s = (float(i) + .5) / 7. * dF;
        vec3 q = pw + tr * s;
        float ts = (zO - 1. - q.z) / sw.z;
        vec3 a = q - sw * ts;
        float inw = (1. - smoothstep(uP[5].w * .7, uP[5].w * 1.3, abs(a.x - uP[5].y))) * smoothstep(-.1, -.8, a.y - TIDE) * smoothstep(-uP[6].w, -uP[6].w + 1.5, a.y);
        float bl = smoothstep(.4, .75, nz(vec3(a.x * .6, a.y * .12, 0.), .4));
        bm += inw * bl * exp(-.09 * ts) * (i == 6 ? 3. : 1.);
      }
      r.rgb += uP[8].rgb * vec3(.55, 1., .9) * .00004 * bm * uP[10].w;   // turquoise blades, not a pale wash
    }
  }
  oC = r;
}`,Gt=`
uniform sampler2D uT; uniform sampler2D uU;
void main() {
  vec3 ro, rd; camRay(ro, rd);
  vec4 ca = texelFetch(uT, mPx(), 0);
  float t = ca.x;
  if (t > waterT(ro, rd)) discard;
  float zO = uP[6].y;
  vec3 col = vec3(0.), alb0 = uP[9].rgb, sd = rd, bdT = vec3(0.), p = ro + rd * t, rr = vec3(0., 0., 1.), Es = vec3(0.);
  float sk = ca.w > 2. ? 1. : 0., wF = 0., wT = 0.;   // the sky through the arch, or the rock's wet sheen: one call of sky() below
  bool rock = ca.w < 2. && dot(ca.yzw, ca.yzw) > .25;
  if (rock) {
    vec3 n = ca.yzw;
    // the beds' soft ledges and the joints' slots on the marched rock: their gradient from four taps (one call site)
    {
      float ep = .012 + .0025 * t, wa = 1. - .8 * smoothstep(uP[5].z - 7., uP[5].z - 1., p.z) * (1. - smoothstep(3., 9., abs(p.x - uP[5].y)));
      // the sea-worn skin, kept with the view by U on its rock pixels (w < -.5 marks them)
      vec4 wo = texelFetch(uU, ivec2(gl_FragCoord.xy), 0);
      wo = wo.w < -.5 ? vec4(wo.xyz, -1.5 - wo.w) : vec4(0.);
      wT = wo.w;
      vec3 gb = vec3(0.), b0 = vec3(0.);
      for (int i = 0; i < int(uP[21].z); i++) {
        vec3 e = .5773 * (2. * vec3(float(((i + 3) >> 1) & 1), float((i >> 1) & 1), float(i & 1)) - 1.);
        vec3 b = beds(p + e * ep);
        gb += e * b.x; b0 += b * .25;
      }
      n = normalize(n + (gb * (.75 / ep) * (.5 + .5 * wa) + wo.xyz) * uP[9].w);
      bdT = b0;
    }
    float y = p.y - TIDE;
    vec3 alb = alb0 * (.6 + .8 * nz(p * .9 + 3., .7)) * (.8 + .4 * nz(p * 2.3, .25)) * (.5 + 1.1 * nz(p * .5 + 7., 4.));
    alb *= .85 + .3 * nz(vec3(p.x * 2.5, p.y * .35, p.z * 2.5), 1.);   // faint flowstone streaks down the wall
    alb *= 1. + .5 * wT;   // each broken facet a little its own tone
    // each bed a little its own tone; an open joint holds shadow
    alb *= (.9 + .2 * h11(floor(bdT.z + .5) * 5.3 + uP[32].w)) * (1. - .3 * bdT.y);
    float sw = uP[15].w;
    float wet = 1. - smoothstep(.0, .5 + sw * 2.5, y);
    float band = 1. - smoothstep(.3 + sw, 1.2 + sw * 2., y);
    alb *= mix(1., .45, band);
    // a pale, broken salt line just above the reach of the swell
    float salt = smoothstep(1.1 + sw * 2., 1.3 + sw * 2., y) * (1. - smoothstep(1.4 + sw * 2., 1.9 + sw * 2., y)) * smoothstep(.4, .65, nz(p * 1.1 + 4., .5));
    alb = mix(alb, vec3(.5, .5, .47), salt * .45);
    // the band the swell covers and uncovers: wet, dark, with patches of red-brown crust
    float enc = smoothstep(.45, .7, nz(p * 1.3 + 9., .4)) * smoothstep(-.4, .1, y) * (1. - smoothstep(.4, .9 + sw, y));
    alb = mix(alb, vec3(.30, .15, .10), enc * .8);
    wet *= 1. - enc * .7;
    float hh = max(y, .03);
    vec3 ns = vec3(1e-5);   // the rock's larger form from the baked field: four taps, one call site
    for (int i = 0; i < int(uP[21].z); i++) {
      vec3 e = .5773 * (2. * vec3(float(((i + 3) >> 1) & 1), float((i >> 1) & 1), float(i & 1)) - 1.);
      ns += e * sdU(p + e * .3);
    }
    ns = normalize(ns);
    float bmp = clamp(1. + 2.2 * dot(n - ns, normalize(vec3(uP[5].y - p.x, -4., zO - p.z) * vec3(.15, 1., .15))), .25, 1.9);
    vec2 kq = p.xz + ns.xz * (hh * .6 + 1.2);
    vec4 k = textureLod(uK, sUV(kq), log2(1. + hh * 8.));
    // the surface's own focusing (K's alpha, from the swell and the trains coming in through the mouth), blurred
    // with height by its mips: slow broad patches high up, and close to the water its sharp threads, squared so
    // they knot and fork; it all travels in from the mouth with the waves
    float cau = mix(1., k.a * 4., .7 * exp(-hh / 2.8) + .2 * exp(-hh / 10.));
    {
      float kt = textureLod(uK, sUV(kq), 0.).a * 4.;
      cau *= mix(1., .35 + .5 * kt * kt, exp(-hh / 1.3) * clamp(1.4 - t / 28., .2, 1.));
    }
    vec3 Ep = 4. * k.rgb * cau * max(.52 - .48 * ns.y, .03) * bmp / (1. + hh * hh * uP[30].y);
    vec3 A0 = vec3(uP[5].y, TIDE + .35 * uP[6].x, zO - 1.);
    vec3 va = A0 - p; float da = length(va); va /= da;
    vec3 Ea = uP[16].rgb * uP[12].z * uP[5].w * uP[6].x * .15 * max(dot(n, va), 0.) / (da * da + 6.) * smoothstep(-.1, .4, va.z);
    Es = uP[16].rgb * .9 * uP[10].w * uP[12].z * max(dot(n, -uP[10].xyz), 0.);
    float ao = clamp(.35 + .65 * sdU(p + ns * .9) / .9, 0., 1.);
    vec3 Eb = kGlow(p.xz, 7.) * (.06 + .25 * max(ns.y, 0.)) * bmp / (1. + hh * hh * uP[30].y);
    vec3 Em = 4. * textureLod(uK, vec2(.5), 9.).rgb * (.5 - .3 * ns.y) * bmp;
    col = alb * ((Ep * .6 + Eb * .7 + Em * uP[30].x) * uP[30].w + Ea) * ao;
    Es *= alb * ao;
    vec3 nw = normalize(n + ns);   // the wet sheen follows the rock's larger form: no specks
    rr = reflect(rd, nw);
    float Fr = .03 + .45 * pow(1. - max(dot(nw, -rd), 0.), 5.);
    if (rr.y < -.05) col += wet * Fr * ao * kGlow(p.xz + rr.xz * (hh / -rr.y), 1.) * .5;
    sd = rr; wF = wet * Fr * ao * .25;
  }
  vec4 se = seeArch(p, rr, -uP[10].xyz, rr, rock ? 2 : 0, t, ro, rd);
  col += Es * se.y;
  sk = rock ? wF * se.x : sk;
  if (sk > 0.) col += sk * sky(sd);
  oC = vec4(air(col, t, ro, rd, se.w) * uP[20].y, ca.w > 2. ? 5000. : t);
}`,Bt=`
uniform sampler2D uT; uniform sampler2D uU;
void main() {
  vec3 ro, rd; camRay(ro, rd);
  float tw = waterT(ro, rd);
  if (!(texelFetch(uT, mPx(), 0).x > tw)) discard;
  float zO = uP[6].y;
  vec3 alb0 = uP[9].rgb;
  vec3 pw = ro + rd * tw;
  vec2 su = sUV(pw.xz);
  vec2 e = uP[25].xy * 1.6;
  vec4 sc = texture(uSim, su);
  vec2 g = vec2(texture(uSim, su + vec2(e.x, 0.)).x - texture(uSim, su - vec2(e.x, 0.)).x,
                texture(uSim, su + vec2(0., e.y)).x - texture(uSim, su - vec2(0., e.y)).x) / (3.2 * uP[25].zw);
  if (pw.z > zO - 1.2) g = vec2(0.);
  float fp = tw * 2. * uP[0].w * uP[19].w / max(-rd.y, .12);
  float lap;
  g += waves(pw.xz, fp, 0, int(uP[24].x), lap);
  for (int i = 0; i < int(uP[15].z); i++) {
    vec4 R = texelFetch(uPb, ivec2(i, 1), 0);
    vec2 dv = pw.xz - R.xy; float r = length(dv) + .02, age = R.z;
    float ph = 9.81 * age * age / (4. * r), k = ph / r;
    float env = smoothstep(2., 7., k) * exp(-k / 90.) * (1. - smoothstep(.12, .4, fp * k / 6.2832)) * exp(-age * .3) / (1. + r * 1.6);
    g += R.w * sin(ph) * k * env * dv / r;
    // the capillary ring itself: a short crest train running out at ~0.5 m/s
    float xr = r - (.07 + .5 * age);
    float env2 = exp(-xr * xr / (.012 + .012 * age)) * exp(-age * .5) / (1. + r * .6) * (1. - smoothstep(.06, .3, fp * 4.5));
    g += R.w * 80. * cos(xr * 28.) * env2 * dv / r;
  }
  vec3 n = normalize(vec3(-g.x, 1., -g.y));
  float cI = max(dot(n, -rd), 0.);
  float F = .02 + .98 * pow(1. - cI, 5.);
  vec3 rr = reflect(rd, n); rr.y = max(rr.y, .01); rr = normalize(rr);
  // the arch's image, drawn out by the unresolved ripples into a soft column of wavering lines; along the line from
  // the eye to the mouth the ripple faces turned towards it mirror the mouth as short soft dashes (none on a calm)
  float sg = clamp(fp * .3, 0., .1) * uP[26].w;
  float as = 0.;
  vec2 cA = normalize(vec2(uP[5].y, zO) - ro.xz), cP = pw.xz - ro.xz;
  float pLat = abs(cP.x * cA.y - cP.y * cA.x), pAl = max(dot(cP, cA), 0.);
  float path = exp(-pow(pLat / (.1 * pAl + .35), 2.));
  float gp = path * path * path * clamp(uP[24].z * 60., 0., 1.);
  int na = (sg > .004 || gp > .02) ? 3 : 1;
  vec4 se = seeArch(pw, rr, normalize(rr + vec3(0., sg, 0.)), normalize(rr - vec3(0., sg * .6, 0.)), na, tw, ro, rd);
  as = se.x;
  if (na > 1) as = (se.x + se.y + se.z) / 3. * .5;   // a soft column only: the composite draws the sharp glints
  // the mouth's image broken by the swell: bright on the faces tilted toward the mouth, dim on the far faces, so it
  // lies on the water in bands that travel with the trains (a calm keeps its whole mirror)
  { vec2 aN = normalize(vec2(uP[5].y, zO) - pw.xz);
    as *= mix(1., .05 + 1.3 * smoothstep(0., .6, dot(g, aN) * 5. - lap * .2), clamp(uP[24].z * 60., 0., 1.)); }
  // off the path from the eye to the mouth, the arch's image on a steep facet is dimmed
  as = min(as * mix(.3, 1., path), 1.);
  vec2 rq = pw.xz + rr.xz * min(7. / rr.y, 5.);
  vec3 refl = sky(rr) * as * uP[27].x + (1. - as) * (kGlow(rq, 5.) + 2. * textureLod(uK, vec2(.5), 9.).rgb) * alb0 * .3;
  // the light under the still surface (the view's U pass), plus what the swell's bubbles scatter near the top
  // seen through the moving surface: the refracted view sways with the slope (the sun's blades and the floor with it)
  // (none close to the rock, where the light under the overhang changes fast)
  float sdW = sdU(pw + vec3(0., .3, 0.));
  vec2 sw = clamp(g * (uP[6].w + TIDE) * .3 * uP[19].x / (tw * 2. * uP[0].w), -6., 6.) * smoothstep(.8, 2.5, sdW);
  vec4 U = texelFetch(uU, clamp(ivec2(gl_FragCoord.xy + sw), ivec2(0), ivec2(uP[19].xy) - 1), 0);
  if (U.x + U.y + U.z <= 0. || U.w < 0.) U = texelFetch(uU, ivec2(gl_FragCoord.xy), 0);   // not swayed into the rock
  if (U.w < 0.) U = vec4(0.);   // a surge over rock that U kept as rock: no light from below there yet
  vec3 Eb = winE(pw - vec3(0., .4, 0.));
  vec3 tr = refract(rd, vec3(0., 1., 0.), .7519);
  float dF = (uP[6].w + TIDE) / max(-tr.y, .3);
  vec2 fq = pw.xz + tr.xz * dF + g * dF * .5;
  // the floor's caustic net where the floor shows through (U.w: its share), moving with the surface; in the
  // afternoon the sun's blades through the drowned mouth cross the water and leave bright patches on the sand
  // (the surface's own focusing, K's alpha, read where the refracted ray meets the floor)
  float cn = textureLod(uK, sUV(fq), 1.).a * 4.;
  U.rgb = U.rgb * (1. + U.w * (cn * cn * .55 - .45) * uP[29].z * uP[30].z) + mix(Eb, vec3(dot(Eb, vec3(.3, .4, .3))), .4) * sc.z * .27;
  // the glow fades with distance from the mouth (bright under the arch, deep blue towards you), and the swell's
  // broad slopes shade the light coming up through the surface a little
  vec2 aD = vec2(uP[5].y, zO) - pw.xz; float dA = length(aD);
  float nearW = 1. - exp(-dA / (uP[4].w * .28));
  float gm = .95 + .55 * (1. - nearW);
  float rv = clamp(dot(g, aD / (dA + .01)) * 5. - lap * .2, -.5, .5);
  vec3 L = U.rgb * gm * (1. + .65 * rv);
  // light from beneath: the near pool reads translucent silver-blue, not navy
  vec3 silB = vec3(dot(L, vec3(.3, .45, .25))) * vec3(.72, .96, 1.18);
  L = mix(L, silB * 1.3, .09 * nearW) + nearW * .45 * (2. * textureLod(uK, vec2(.5), 9.).rgb) * alb0 * max(.2 + 1.6 * rv, 0.);
  // a ripple face turned away from the eye is a mirror at this low angle: it shows the dark vault (or the mouth)
  // and the water lying against the rock mirrors the black, undercut wall: pool and rock meet in a dark seam
  float ed = 1. - smoothstep(.1, .8, sdW);
  F = max(min(F, .5), ed * .6);   // the true Fresnel of the summed slope, capped where the glow comes up through it
  vec3 col = F * refl + (1. - F) * L;
  // lace of foam where a surge breaks on the rock: only the swell's bubbles make it, and it drifts and fades
  float fo = ed * smoothstep(.5, .8, nz(vec3(pw.x * 2., TIME * .25, pw.z * 2.), .25));
  col += fo * min(sc.z, 1.5) * kGlow(pw.xz, 1.) * .5;
  oC = vec4(air(col, tw, ro, rd, se.w) * uP[20].y, -tw);
}`,ut=`
uniform sampler2D uT;
void main() {
  vec3 ro, rd; camRay(ro, rd);
  float tw = waterT(ro, rd);
  if (!(texelFetch(uT, mPx(), 0).x > tw)) discard;
  float zO = uP[6].y;
  vec3 pw = ro + rd * tw, tr = refract(rd, vec3(0., 1., 0.), .7519);
  float F = .02 + .98 * pow(1. - max(-rd.y, 0.), 5.);
  float tM = 70.; vec3 silv = vec3(0.); vec3 trail = vec3(0.);
  for (int i = 0; i < int(uP[15].y); i++) {
    vec4 pb = texelFetch(uPb, ivec2(i, 0), 0);
    vec3 oc = pw - pb.xyz;
    float bq = dot(oc, tr), cq = dot(oc, oc) - .0036, hq = bq * bq - cq;
    if (hq > 0. && -bq - sqrt(hq) > 0. && -bq - sqrt(hq) < tM) {
      tM = -bq - sqrt(hq);
      vec3 q = pw + tr * tM, nn = normalize(q - pb.xyz);
      vec3 E = winE(q);
      vec3 W = vec3(uP[5].y, TIDE - 3.5, zO - 2.);
      float sp = pow(max(dot(reflect(tr, nn), normalize(W - q)), 0.), 6.);
      E += winE(pw - vec3(0., .3, 0.)) * .5;   // sheathed in bubbles, it takes the light of the bright water round it
      silv = mix(E, vec3(dot(E, vec3(.33))), .6) * (3.5 + 16. * sp + 5. * max(nn.y, 0.));
    }
    // the bubble thread it leaves behind, rising and fading
    vec3 w0 = pw - vec3(pb.x, 0., pb.z);
    vec3 u2 = vec3(0., 1., 0.);
    float b1 = dot(tr, u2), d1 = dot(tr, w0), e1 = dot(u2, w0), den = max(1. - b1 * b1, 1e-3);
    float s1 = (b1 * e1 - d1) / den, s2 = (e1 - b1 * d1) / den;
    vec3 cpt = pw + tr * s1;
    float dd = length(cpt - (vec3(pb.x, 0., pb.z) + u2 * s2));
    float top = TIDE - .03, bot = pb.y + .08;
    float inside = smoothstep(bot, bot + .3, cpt.y) * (1. - smoothstep(top - .2, top, cpt.y));
    float fl = exp(-pb.w * .45) * inside * step(0., s1) * step(s1, tM);
    float spk = smoothstep(.55, .8, nz(vec3(pb.x * 7., cpt.y * 3. - TIME * 1.4, pb.z * 7.), .12));
    trail += winE(cpt) * fl * exp(-dd * dd / .0012) * (.3 + 6. * spk * spk) * exp(-uP[7].rgb * s1);
  }
  vec3 L = trail;
  if (tM < 69.) L += exp(-(uP[7].rgb + uP[7].w) * tM) * silv;
  oC = vec4(L * (1. - F) * exp(-tw * .012) * uP[20].y, 0.);
}`,Wt=`
uniform sampler2D uT;
void main() {
  vec3 ro, rd; camRay(ro, rd);
  vec2 uv = gl_FragCoord.xy * uP[19].zw;
  // what this screen pixel sees, decided here at full size: the kept march (rock distance, or the sky through the
  // arch with its distance from the rim) against the pool's surface, so the waterline and the mouth's rim are drawn
  // per pixel and blended over one; the colours come from the low target's texels of the same kind round it
  vec4 m = texelFetch(uT, ivec2(gl_FragCoord.xy), 0);
  float tw = waterT(ro, rd), dw = clamp(m.x - tw, -.5, .5);
  float cw = clamp(.5 + dw / max(fwidth(dw), 1e-4), 0., 1.);
  bool sk = m.w > 2.;
  vec2 lf = gl_FragCoord.xy / uP[26].z - .5, li = floor(lf); lf -= li;
  ivec2 mx = textureSize(uA, 0) - 1;
  vec3 cW = vec3(0.), cR = vec3(0.), cS = vec3(0.), w = vec3(0.);
  for (int i = 0; i < 4; i++) {
    ivec2 o = ivec2(i & 1, i >> 1);
    vec2 bw = mix(1. - lf, lf, vec2(o));
    vec4 a = texelFetch(uA, clamp(ivec2(li) + o, ivec2(0), mx), 0);
    // its kind (alpha: -t pool, t rock, 5000 sky); rock texels at another depth count for little
    vec3 k = a.w < 0. ? vec3(1., 0., 0.) : a.w > 4000. ? vec3(0., 0., 1.) : vec3(0., exp(-abs(a.w - m.x) / (.04 * m.x + .05)) + .01, 0.);
    k *= bw.x * bw.y + 1e-4;
    cW += a.rgb * k.x; cR += a.rgb * k.y; cS += a.rgb * k.z; w += k;
  }
  // a kind missing from the four (a thin strip) takes the plain blend
  vec3 bl = texture(uA, uv).rgb;
  vec3 rk = w.y > 0. ? cR / w.y : w.z > 0. ? cS / w.z : bl, sy = w.z > 0. ? cS / w.z : rk;
  vec3 bk = sk ? mix(rk, sy, clamp(.5 + m.y, 0., 1.)) : rk;
  vec3 c = mix(bk, w.x > 0. ? cW / w.x : bl, cw) / uP[20].y;
  // glints: the mouth's image shattered by the ripples, per pixel: a facet whose mirror ray goes out through the arch
  // flashes. They ride the ripples, small and many far off, larger, fewer and scattered near the eye (none on a calm)
  if (cw > 0. && uP[24].z > 1e-3) {
    vec3 pw = ro + rd * tw;
    float zO = uP[6].y;
    vec2 cA = normalize(vec2(uP[5].y, zO) - ro.xz), cP = pw.xz - ro.xz;
    float pLat = abs(cP.x * cA.y - cP.y * cA.x), pAl = max(dot(cP, cA), 0.);
    if (pLat < .45 * pAl + 2. && pw.z < zO - 1.2) {
      float fp = tw * 2. * uP[0].w * uP[19].w / max(-rd.y, .12), lap;
      // the facets finer than the pool's shading tilt further, so the trains are read rougher here; where the still
      // water itself would mirror the mouth, that image is the pool's own broken column, not glints
      vec2 g = waves(pw.xz, fp, 0, int(uP[24].x), lap) * 2.6;
      vec3 n = normalize(vec3(-g.x, 1., -g.y));
      float a = 0., a0 = 0.;
      for (int i = 0; i < 2; i++) { float v = archSee(pw, i == 0 ? reflect(rd, n) : rd * vec3(1., -1., 1.)); if (i == 0) a = v; else a0 = v; }
      a *= 1. - a0;
      float F = .02 + .98 * pow(1. - max(dot(n, -rd), 0.), 5.);
      c += uP[16].rgb * uP[29].w * vec3(1.25, 1.3, 1.35) * uP[27].x * a * a * min(F, .3) * cw * .9;   // the mouth's pale sky
    }
  }
  vec2 vd = (uv - uP[28].xy) / uP[28].z;
  c += uP[16].rgb * uP[28].w / (1. + dot(vd, vd) * 6.) * exp(-dot(vd, vd) * .5);
  c *= uP[12].x;
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  c = pow(clamp(c, 0., 1.), vec3(1. / 2.2));
  c += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255.;
  oC = vec4(c, 1.);
}`,jt=`precision highp usampler2D;
vec4 nfF(highp usampler2D s, ivec2 p){ uvec2 u = texelFetch(s, p, 0).xy; return vec4(unpackHalf2x16(u.x), unpackHalf2x16(u.y)); }
vec4 nfBl(highp usampler2D s, vec2 uv){
  vec2 n = vec2(textureSize(s, 0)), f = uv * n - .5, i = floor(f); f -= i;
  ivec2 a = ivec2(clamp(i, vec2(0.), n - 1.)), b = ivec2(clamp(i + 1., vec2(0.), n - 1.));
  return mix(mix(nfF(s, a), nfF(s, ivec2(b.x, a.y)), f.x), mix(nfF(s, ivec2(a.x, b.y)), nfF(s, b), f.x), f.y);
}
`,dt=["uSim","uG","uA","uT","uU"];function pt(e,t){e=e.replace(`sampler3D;
`,`sampler3D;
`+jt);for(const v of dt)e=e.split("uniform sampler2D "+v+";").join("uniform highp usampler2D "+v+";");let l="",r=0;const u=/\b(texture|textureLod|texelFetch)\((u[A-Za-z0-9]+)\s*,/g;for(let v;v=u.exec(e);){if(!dt.includes(v[2]))continue;let h=v.index+v[0].length,w=0,d=h;const p=[];for(;h<e.length;h++){const E=e[h];if(E==="(")w++;else if(E===")"){if(w===0)break;w--}else E===","&&w===0&&(p.push(e.slice(d,h)),d=h+1)}p.push(e.slice(d,h)),l+=e.slice(r,v.index)+(v[1]==="texelFetch"?"nfF(":"nfBl(")+v[2]+", "+p[0].trim()+")",r=h+1,u.lastIndex=r}return e=l+e.slice(r),(t==="sim"||t==="g"||t==="m"||t==="u"||t==="r"||t==="w"||t==="p")&&(e=e.replace("out vec4 oC;","vec4 oC; out uvec4 oU;").replace("void main()","void main0()")+`
void main(){ main0(); oU = uvec4(packHalf2x16(oC.xy), packHalf2x16(oC.zw), 0u, 0u); }`),e}function Kt(e){if(e.__c513)return e.__c513;const t=!!e.getExtension("EXT_color_buffer_float"),l=t||!!e.getExtension("EXT_color_buffer_half_float"),r=!l,u=(y,g)=>{const P=e.createShader(y);return e.shaderSource(P,g),e.compileShader(P),P},v={bake:Lt,sim:qt,g:Xt,k:Je+Nt,m:Ot,u:Ct,r:Gt,w:Je+Bt,c:Je+Wt},h={},w=(y,g)=>{const P=e.createProgram(),B=u(e.VERTEX_SHADER,Te+ft),S=u(e.FRAGMENT_SHADER,r?pt(Te+"#define PG_"+y+`
`+Ne+g,y):Te+"#define PG_"+y+`
`+Ne+g);return e.attachShader(P,B),e.attachShader(P,S),e.linkProgram(P),e.flush(),{p:P,v:B,f:S}},d=(y,g)=>{const{p:P,v:B,f:S}=g;if(!e.getProgramParameter(P,e.LINK_STATUS))throw new Error("513 "+y+": "+(e.getShaderInfoLog(B)||"")+(e.getShaderInfoLog(S)||"")+e.getProgramInfoLog(P));return e.useProgram(P),["uN3","uSd","uSim","uG","uK","uPb","uA","uU","uT","uDs"].forEach((C,V)=>{const se=e.getUniformLocation(P,C);se&&e.uniform1i(se,V)}),{p:P,uP:e.getUniformLocation(P,"uP")}};for(const y in v)h[y]=w(y,v[y]);e.flush(),Ut(),It();for(const y in h)h[y]=d(y,h[y]);const p=e.getExtension("KHR_parallel_shader_compile");let E=null,b=0,T=null,M=null;const _=y=>{b===0&&(T||(T=u(e.VERTEX_SHADER,Te+ft)),y>1&&!M&&(M=u(e.FRAGMENT_SHADER,r?pt(Te+`#define PG_p
`+Ne+ut,"p"):Te+`#define PG_p
`+Ne+ut)),e.flush())},o=(y,g)=>{if(b===0&&y){_(2);const P=e.createProgram();if(e.attachShader(P,T),e.attachShader(P,M),e.linkProgram(P),E={p:P,v:T,f:M},e.flush(),b=1,!g)return!1}if(b!==1)return b===2;if(p&&!g&&!e.getProgramParameter(E.p,p.COMPLETION_STATUS_KHR))return!1;try{h.p=d("p",E),b=2}catch{b=3}return b===2},k=e.createTexture();e.bindTexture(e.TEXTURE_3D,k),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage3D(e.TEXTURE_3D,0,e.R16F,64,64,64,0,e.RED,e.HALF_FLOAT,He),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const y of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,y,e.REPEAT);const A=e.createTexture();e.bindTexture(e.TEXTURE_3D,A),e.texImage3D(e.TEXTURE_3D,0,e.RGBA16F,32,32,32,0,e.RGBA,e.HALF_FLOAT,be),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const y of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,y,e.REPEAT);const O=e.createTexture();e.bindTexture(e.TEXTURE_3D,O),e.texImage3D(e.TEXTURE_3D,0,e.R16F,1,1,1,0,e.RED,e.HALF_FLOAT,new Uint16Array(1));const D=e.createVertexArray();let G=null;return r&&(G=e.createTexture(),e.bindTexture(e.TEXTURE_2D,G),e.texImage2D(e.TEXTURE_2D,0,e.RG32UI,1,1,0,e.RG_INTEGER,e.UNSIGNED_INT,new Uint32Array(2)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST)),e.__c513={P:h,flt:t,hf:l,nf:r,tN:k,tD:A,t3:O,tU:G,vEmpty:D,late:o,pre:_,frames:0}}function ye(e,t,l,r,u,v,h){const w=e.createTexture();e.bindTexture(e.TEXTURE_2D,w),u==="f"&&t.hf?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,l,r,0,e.RGBA,e.HALF_FLOAT,null):u==="f"&&t.nf?(e.texImage2D(e.TEXTURE_2D,0,e.RG32UI,l,r,0,e.RG_INTEGER,e.UNSIGNED_INT,null),v=e.NEAREST,h=!1):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,l,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,h?e.LINEAR_MIPMAP_LINEAR:v),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,v),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),h&&e.generateMipmap(e.TEXTURE_2D);const d=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,d),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,w,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:w,fb:d,w:l,h:r}}const mt=[0,1,2,3,4,5,6,8,9,10,12,13,14];function Vt(e,t,l,r){const u=ye(e,t,l,l,"f",e.NEAREST),v=ye(e,t,r,r,"f",e.NEAREST);return e.bindTexture(e.TEXTURE_2D,null),{m:u,u:v,sig:new Float32Array(13).fill(NaN),tide:NaN}}rt.add({num:513,name:"Sea Cave",fam:"Vistas",recipe:"Inside a sea cave where sunlight gets in under a low arch and lights the pool from below, throwing rippling light onto the rock roof. The cave, the swell, the water and the day outside change every mint. Tap the water to drop a pebble that sinks glowing silver, drag to push a swell in through the arch, or hold to let the tide rise so the arch narrows and the blue gets deeper.",interactive:"Tap the water to drop a pebble that sinks glowing silver, trailing bubbles. Drag to send a swell in through the arch: it nearly closes the opening, surges through the cave and churns silver foam at the mouth. Hold to let the tide rise: the arch narrows and the blue deepens.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,l=e.size,r=Kt(t),u=r.P;let v=2654435769;for(let a=2;a<e.hash.length;a+=8)v=Math.imul(v^parseInt(e.hash.slice(a,a+8),16),2246822507)>>>0;const h=()=>{v=v+1831565813|0;let a=Math.imul(v^v>>>15,1|v);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},w=a=>{let i=0;for(const n in a)i+=a[n];let s=h()*i;for(const n in a)if(s-=a[n],s<0)return n;return Object.keys(a)[0]};let d=w({"One big vault":58,"Long tunnel":30,"Emerald cave":12}),p=w({"Glassy calm":28,"Gentle swell":47,"Swell surging":25}),E=w({"Midday glow":72,"Afternoon shaft":28}),b=w({"Grey limestone":55,"Ochre limestone":30,"Dark dolomite":15}),T=w({"Pale sand":65,"Boulders and sand":35}),M=w({"Low arch":80,"Twin arches":20});e.home&&(d="One big vault",p="Gentle swell",E="Midday glow",b="Grey limestone",T="Pale sand",M="Low arch"),e.trait("Cave",d),e.trait("Sea",p),e.trait("Hour",E),e.trait("Rock",b),e.trait("Floor",T),e.trait("Arch",M);const _=d==="One big vault"?0:d==="Long tunnel"?1:2,o={rx:[13,8.5,10.5][_],ryU:[11.5,8,9.5][_],ryD:[13,9,10][_],len:[32,50,24][_],zc:0,hw:2.1+h()*.4,tp:1.6+h()*.35,xa:0,xa2:-99,sand:T==="Pale sand"?6+h()*1.5:7.5+h()*1.5,boulders:T==="Pale sand"?0:1,relief:b==="Ochre limestone"?1.15:b==="Dark dolomite"?.85:1,o:[h(),h(),h()],px:0,py:.5,pr:[3.2,2.6,2.4][_],bench:null};o.zOut=o.zc+o.len+3,o.zIn=o.zOut-6;{const a=o.zIn-o.zc;o.xa=1.6*Math.sin(a*.061+o.o[0]*6)+.8*Math.sin(a*.13+o.o[1]*5)+(h()-.6)*o.rx*.3}M==="Twin arches"&&(o.xa2=o.xa+5.5+h()*1.5),o.px=(h()-.5)*4;const k=b==="Grey limestone"?[.3,.29,.27]:b==="Ochre limestone"?[.36,.27,.17]:[.16,.16,.17],A=_===2;let O=739982445;for(let a=2;a<e.hash.length;a+=8)O=Math.imul(O^parseInt(e.hash.slice(a,a+8),16),461845907)>>>0;const D=()=>{O=O+1831565813|0;let a=Math.imul(O^O>>>15,1|O);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},G=a=>{let i=0;for(const n in a)i+=a[n];let s=D()*i;for(const n in a)if(s-=a[n],s<0)return n;return Object.keys(a)[0]};let y=G({"Midday sea":84,"Grey day":10,Sunset:6}),g=G({"Clear azure":80,"Milky turquoise":20});e.home&&(y="Midday sea",g="Clear azure"),A&&(g="Emerald"),e.trait("Outside",y),e.trait("Water",g);const P=y==="Far cliffs"?1:y==="Grey day"?2:y==="Sunset"?3:0,B=A?[.38,.06,.15]:g==="Milky turquoise"?[.42,.05,.05]:[.42,.072,.026],S=A?.07:g==="Milky turquoise"?.1:g==="Silver"?.085:.05,C=A?[.55,1,.58]:P===3?[.62,.66,1]:g==="Milky turquoise"?[.5,.95,.92]:g==="Silver"?[.78,.9,1]:[.55,.85,1],V=1100*(_===1?1.4:1)*(P===2?.5:1)*(g==="Silver"?.8:1),se=p==="Glassy calm"?.006:p==="Gentle swell"?.12:.3,U=p==="Glassy calm"?.008:p==="Gentle swell"?.016:.024,pe=E==="Afternoon shaft"?1:0,ee=p==="Glassy calm"?4e-4:p==="Gentle swell"?.016:.022,he=p==="Glassy calm"?.25:p==="Gentle swell"?1:1.4,q=[(h()<.5?-1:1)*(.12+.1*h()),-.11-.05*h(),-1];{const a=Math.hypot(...q);q[0]/=a,q[1]/=a,q[2]/=a}const fe=P===3?[.95,.42,.15]:P===2?[.66,.7,.74]:pe?[1,.82,.58]:[1,.93,.8],X=34,te=[7.3+h()*2,10.6+h()*3,13.9+h()*2],ae=[h()*de,h()*de,h()*de],Y=o.zc+[2,12,0][_]+(h()-.5)*3;let me=-2;for(;me>-30&&!(re(o,me,1.4,Y)<0);me-=.25);o.bench={x:me+1.4,y:.95-2.6,z:Y,hx:3,hz:6.5,cx:me+3.9,cz:Y+4.5};const Z={x:me+3.9,z:Y+4.5},_e=(a,i)=>{let s=4;for(;s>-2&&!(re(o,a,s,i)<0);s-=.05);return s};let ne=1362709803;for(let a=2;a<e.hash.length;a+=8)ne=Math.imul(ne^parseInt(e.hash.slice(a,a+8),16),3432918353)>>>0;const Q=()=>{ne=ne+1831565813|0;let a=Math.imul(ne^ne>>>15,1|ne);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},Oe={"On the ledge":40,"Low on the water":28,"At the arch, looking in":20,"Close under the arch":12};let ke="On the ledge";{let a=0;for(const s in Oe)a+=Oe[s];let i=Q()*a;for(const s in Oe)if(i-=Oe[s],i<0){ke=s;break}}e.home&&(ke="On the ledge"),e.trait("Standpoint",ke);const $=ke==="On the ledge"?0:ke==="Low on the water"?1:ke==="Close under the arch"?2:3,xt=a=>{const i=a-o.zc;return 1.6*Math.sin(i*.061+o.o[0]*6)+.8*Math.sin(i*.13+o.o[1]*5)};let H=null;if($){const a=Math.hypot(o.xa-Z.x,o.zOut-Z.z);let i=$===1?o.zOut-a*(.8+.25*Q()):$===2?o.zIn-7-Q()*3:o.zIn-3.5-Q()*2;const s=(Q()<.5?-1:1)*o.rx*($===1?.28:.2);let n=xt(i)+s;for(let Le=0;Le<48&&(re(o,n,1.2,i)<1.6||re(o,n,2.6,i)<.9);Le++)n+=(xt(i)-n)*.25,Le%4===3&&(i-=1);const c=$===1?1.05:$===2?1.15:1.25,m=Math.atan2(o.xa-n,o.zOut-i),F=Q()<.5?-1:1,x=$===1?m+F*(.26+.06*Q()):$===2?m+F*(.3+.08*Q()):m+Math.PI+F*(.3+.1*Q()),K=Math.pow(Math.hypot(o.xa-n,o.zOut-i)/Math.hypot(o.xa-Z.x,o.zOut-Z.z),.9);H={x:n,z:i,eye:c,yaw:x,pitch:$===1?.07:$===2?.15:.02,ex:$===3?1:N(K,.8,1.6)}}const vt=l>400,Ae=-(o.rx*1.4+4),ge=-(Math.max(o.ryD*1.35,o.sand+2)+1.5),Ce=o.zc-o.len-32,Ye=-Ae,Ze=o.ryU*1.4+2,wt=o.zOut+2,ie=vt?[80,56,200]:[40,28,100],j=[Ae,Ce,Ye,o.zOut+3],ze={g:ye(t,r,it,ct,"f",t.LINEAR),sd:null,pb:t.createTexture()};t.bindTexture(t.TEXTURE_2D,ze.pb),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,8,2,0,t.RGBA,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const Qe=ye(t,r,st,nt,"b",t.LINEAR,!0),J=Math.round(l*(l>400?.62:.9)),Ge=ye(t,r,J,J,"f",t.LINEAR),I=new Float32Array(34*4),z=(a,i,s,n,c)=>{I[a*4]=i,I[a*4+1]=s,I[a*4+2]=n,I[a*4+3]=c},Fe=Math.tan(31*Math.PI/180);z(4,o.rx,o.ryU,o.ryD,o.len),z(5,o.zc,o.xa,o.zIn,o.hw),z(6,o.tp,o.zOut,o.xa2,o.sand),z(7,B[0],B[1],B[2],S),z(8,C[0]*V,C[1]*V,C[2]*V,o.xa2>-50?2:1),z(9,k[0],k[1],k[2],o.relief),z(10,q[0],q[1],q[2],pe),z(11,j[0],j[1],1/(j[2]-j[0]),1/(j[3]-j[1])),z(13,o.o[0],o.o[1],o.o[2],o.boulders),z(14,o.bench.x,o.bench.y,o.bench.z,o.bench.hx),z(15,o.bench.hz,0,0,se),z(16,fe[0]*X,fe[1]*X,fe[2]*X,o.bench.cx),z(17,o.px,o.py,o.pr,o.bench.cz),z(18,1/90,7,.12,0),z(20,1,r.hf||r.nf?1:.125,r.hf||r.nf?1:.25,0),z(21,vt?110:80,20,4,_e(o.bench.cx,o.bench.cz)+1.6),z(22,Ae,ge,Ce,r.hf?0:-32),z(23,1/(Ye-Ae),1/(Ze-ge),1/(wt-Ce),r.hf?0:1),z(24,16,0,U,h()*50),z(25,1/ve,1/we,(j[2]-j[0])/ve,(j[3]-j[1])/we),z(27,g==="Silver"?2.6:1.6,0,r.hf?1:255*256/65535*64,r.hf?0:255/65535*64),z(29,T==="Pale sand"?.36:.28,8e-4,T==="Pale sand"?.6:.45,.05);{const a=e.home?.1:.03+D()*.2,i=D()*de,s=[Math.sin(a)*Math.cos(i),Math.cos(a),Math.sin(a)*Math.sin(i)],n=b==="Dark dolomite"?.9+D()*.5:.55+D()*.45,c=D()*Math.PI;z(31,s[0],s[1],s[2],1/n),z(32,Math.cos(c),Math.sin(c),2.4+D()*2,D()*40)}z(30,A?.35:.8,A?.035:.012,p==="Glassy calm"?.3:p==="Gentle swell"?1:1.25,A?.45:1);const bt=[1.25,1.25,.78][_]*(b==="Dark dolomite"?1.15:1)*(P===2?1.2:1);{const a=(o.xa-Z.x)/(o.zOut-Z.z);z(33,a+(D()<.5?-1:1)*(.02+.02*D()),.05+.04*D(),P===1?.01+.008*D():0,P)}const Ht=(A?.08:_===1?.13:.23)*($===2?.5:1),Jt=.0025,Ee=new Array(20).fill(void 0);let $e=!1;const Yt=()=>{$e=!1},Zt=a=>{const i=[[t.TEXTURE_3D,r.tN],[t.TEXTURE_3D,ze.sd||r.t3],[t.TEXTURE_2D,a.sim],[t.TEXTURE_2D,ze.g.tex],[t.TEXTURE_2D,Qe.tex],[t.TEXTURE_2D,ze.pb],[t.TEXTURE_2D,Ge.tex],[t.TEXTURE_2D,a.u||null],[t.TEXTURE_2D,a.t||null],[t.TEXTURE_3D,r.tD]];$e||(Ee.fill(void 0),$e=!0,t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(r.vEmpty));for(let s=0;s<10;s++){const n=i[s][0]===t.TEXTURE_3D?a.no===s?null:i[s][1]:null;let c=i[s][0]===t.TEXTURE_2D?a.no===s?null:i[s][1]:null;!c&&r.nf&&(s===2||s===3||s>=6)&&(c=r.tU),!(Ee[s*2]===n&&Ee[s*2+1]===c)&&(t.activeTexture(t.TEXTURE0+s),Ee[s*2]!==n&&t.bindTexture(t.TEXTURE_3D,n),Ee[s*2+1]!==c&&t.bindTexture(t.TEXTURE_2D,c),Ee[s*2]=n,Ee[s*2+1]=c)}},ce=(a,i,s,n,c)=>{const m=u[a];t.bindFramebuffer(t.FRAMEBUFFER,i),t.viewport(0,0,s,n),t.useProgram(m.p),Zt(c),z(19,s,n,1/s,1/n),t.uniform4fv(m.uP,I),t.drawArrays(t.TRIANGLES,0,3)};{const a=t.createTexture();t.bindTexture(t.TEXTURE_3D,a),t.texStorage3D(t.TEXTURE_3D,1,r.hf?t.R16F:t.RGBA8,ie[0],ie[2],ie[1]),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const m of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,m,t.CLAMP_TO_EDGE);const i=t.createFramebuffer(),s=(Ze-ge)/ie[1],n=ge+(Math.ceil(-ge/s-.5)+1)*s;z(25,(Ye-Ae)/ie[0],(Ze-ge)/ie[1],(wt-Ce)/ie[2],n);let c=!0;for(let m=0;m<ie[1];m++){if(t.bindFramebuffer(t.FRAMEBUFFER,i),t.framebufferTextureLayer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,a,0,m),m===0&&t.checkFramebufferStatus(t.FRAMEBUFFER)!==t.FRAMEBUFFER_COMPLETE){c=!1;break}I[20*4+3]=m,ce("bake",i,ie[0],ie[2],{sim:null,no:1})}t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(i),c?ze.sd=a:t.deleteTexture(a),z(25,1/ve,1/we,(j[2]-j[0])/ve,(j[3]-j[1])/we)}const Be=[ye(t,r,ve,we,"f",t.LINEAR),ye(t,r,ve,we,"f",t.LINEAR)];for(const a of Be)t.bindFramebuffer(t.FRAMEBUFFER,a.fb),r.nf?t.clearBufferuiv(t.COLOR,0,new Uint32Array(4)):(t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT));t.bindFramebuffer(t.FRAMEBUFFER,null);const f={x:0,y:0,z:0,fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},Qt=Math.atan2(o.xa-Z.x,o.zOut-Z.z),$t=H?H.yaw:Qt-.21,ea=H?H.pitch:-.05;let We=1e9,je=1e9,yt=0;const ta=()=>{const a=e.view||Dt;if(H){let F=N(a.x||0,-1.5,1.5),x=N(a.z||0,-4,4);if(F!==We||x!==je){We=F,je=x;for(let K=0;K<8&&re(o,H.x+F,1,H.z+x)<1.2;K++)F*=.7,x*=.7;f.x=H.x+F,f.z=H.z+x}f.y=N(Math.max(H.eye,L+.8)+(a.y||0),.6,4)}else{const F=N(a.x||0,-1.6,1.2),x=N(a.z||0,-5,5);f.x=Z.x+F,f.z=Z.z+x,(F!==We||x!==je)&&(yt=_e(f.x,f.z),We=F,je=x),f.y=yt+N(1.6+(a.y||0),.6,4)}const i=$t+(a.yaw||0),s=N(ea+(a.pitch||0),-1.3,1.3),n=Math.cos(s);f.fw=[Math.sin(i)*n,Math.sin(s),Math.cos(i)*n],f.rt=[Math.cos(i),0,-Math.sin(i)];const c=f.fw,m=f.rt;f.up=[c[1]*m[2]-c[2]*m[1],c[2]*m[0]-c[0]*m[2],c[0]*m[1]-c[1]*m[0]]},zt=(a,i)=>{const s=a*2-1,n=1-i*2,c=[0,1,2].map(F=>f.fw[F]+(s*f.rt[F]+n*f.up[F])*Fe),m=Math.hypot(c[0],c[1],c[2]);return c.map(F=>F/m)};let Me=[0,0,1,0];const aa=()=>{const a=[o.xa,.35*o.tp,o.zOut-1],i=[a[0]-f.x,a[1]-f.y,a[2]-f.z],s=i[0]*f.fw[0]+i[1]*f.fw[1]+i[2]*f.fw[2];if(s<.5)return[0,0,1,0];const n=.5+.5*(i[0]*f.rt[0]+i[1]*f.rt[1]+i[2]*f.rt[2])/(s*Fe),c=.5+.5*(i[0]*f.up[0]+i[1]*f.up[1]+i[2]*f.up[2])/(s*Fe);if(n<-.3||n>1.3||c<-.3||c>1.3)return[0,0,1,0];for(let F=1;F<24;F++){const x=F/24;if(re(o,f.x+i[0]*x,f.y+i[1]*x,f.z+i[2]*x)<0)return[0,0,1,0]}const m=o.hw/(s*Fe);return[n,c,.3*m+.015,Jt]};let le=0,L=0,et=0,De=0,Et=0,tt=0,Ke=0,la=0,Ve=1;const Pe=[],ue=[],xe=[],Ue=new Float32Array(8*2*4);let Pt=1.5+h()*3;const oa=(a,i)=>{let s=ra();for(;s>-20&&!(re(o,a,s,i)<0);s-=.2);return s+.06},ra=()=>L,sa=a=>{let i=se*(Math.sin(de*a/te[0]+ae[0])+.6*Math.sin(de*a/te[1]+ae[1])+.35*Math.sin(de*a/te[2]+ae[2]))/1.4;for(const s of Pe){const n=(a-s.t0)/s.dur;n>-.25&&n<1&&(i+=n<0?-.25*s.a*Math.sin(-n/.25*Math.PI):s.a*Math.pow(Math.sin(n*Math.PI),2))}return i},at=(a,i,s)=>{xe.push({x:a,z:i,t0:le,a:s}),xe.length>8&&xe.shift()},na=(a,i)=>{const s=zt(a,i);if(s[1]>-.02)return null;let n=(L-f.y)/s[1],c=f.x+s[0]*n,m=f.z+s[2]*n;return re(o,c,L,m)<.3||m>o.zOut-1.5?null:[c,m]},Tt=(a,i)=>{const s=zt(a,i);let n,c;if(s[1]<-.02){const m=(L-f.y)/s[1];n=f.x+s[0]*m,c=f.z+s[2]*m}else{const m=Math.hypot(s[0],s[2])||1;n=f.x+s[0]/m*10,c=f.z+s[2]/m*10}for(let m=0;m<40&&re(o,n,L,c)<.3;m++)n+=(f.x-n)*.08,c+=(f.z-c)*.08;c=Math.min(c,o.zOut-1.5),ue.push({x:n,y:L-.03,z:c,vy:-.6,age:0,x0:n,z0:c,ph:h()*de,floorY:oa(n,c)}),ue.length>4&&ue.shift(),at(n,c,.02),e.sound.note(86+Math.floor(h()*5),{dur:.09,vel:.35,wave:"sine"}),e.sound.hit("noise",.18,{cutoff:3200,dur:.18}),e.sound.note(74,{dur:.5,vel:.08,wave:"sine"})},kt=a=>{Pe.push({t0:le,a,dur:2.6+a*1.5}),Pe.length>4&&Pe.shift(),e.sound.hit("noise",.25+a*.3,{cutoff:260,dur:2.8}),e.sound.note(31,{dur:2.2,vel:.25+a*.2,wave:"sine"})};let R=null;const ia=a=>{const i=e.input,s=i.taps();if(i.down){R||(R={x0:i.x,y0:i.y,lx:i.x,ly:i.y,t:0,path:0,drag:!1,acc:0,sent:0});const n=i.x-R.lx,c=i.y-R.ly;if(R.lx=i.x,R.ly=i.y,R.t+=a,R.path+=Math.hypot(n,c),R.path>.012){if(R.drag||(R.drag=!0,kt(.65),R.sent=1),R.acc+=Math.hypot(n,c),R.wk=(R.wk||0)+Math.hypot(n,c),R.wk>.045){R.wk=0;const m=na(i.x,i.y);m&&at(m[0],m[1],.014)}R.acc>.35&&R.sent<3&&(R.acc=0,R.sent++,kt(.45))}else R.t>.3&&(et+=a,L=Math.min(L+a*.14,.82),(et*2|0)!==((et-a)*2|0)&&e.sound.hit("noise",.06,{cutoff:500,dur:.6}))}else R?(!R.drag&&R.t<=.3&&Tt(R.x0,R.y0),R=null):s.length&&Tt(s[0].x,s[0].y),L=Math.max(0,L-a*.012)},gt=a=>{le+=a;for(let n=ue.length-1;n>=0;n--){const c=ue[n];c.age+=a,c.y>c.floorY&&(c.vy+=(-5.9-7.3*c.vy*Math.abs(c.vy))*a,c.y=Math.max(c.floorY,c.y+c.vy*a),c.x+=Math.sin(c.age*3.1+c.ph)*.04*a,c.z+=Math.cos(c.age*2.3+c.ph)*.04*a,c.y<=c.floorY&&e.sound.hit("click",.05)),c.age>30&&ue.splice(n,1)}for(let n=xe.length-1;n>=0;n--)le-xe[n].t0>14&&xe.splice(n,1);if(le>Pt){Pt=le+2+h()*5;for(let n=0;n<6;n++){const c=f.x+(h()-.3)*16,m=f.z+h()*22;if(re(o,c,L,m)>.8){at(c,m,.004),e.sound.note(93+Math.floor(h()*6),{dur:.06,vel:.06,wave:"sine"});break}}}for(let n=Pe.length-1;n>=0;n--)le-Pe[n].t0>8&&Pe.splice(n,1);const i=sa(le),s=(i-De)/Math.max(a,.001);De=i,Et=s,tt=Math.max(tt*Math.exp(-a*1.5),Math.max(s,0)*2.2+Math.max(0,L+i-(o.tp-.35))*6)};let Ie=0,Se=-1,Rt=0,_t=!1,At=null;const Ft=a=>{ta(),Ke=Math.min(Ke+a,5/90);const i=N((o.tp-L-De)/o.tp,0,1);Ve+=(i-Ve)*.5,z(0,f.x,f.y,f.z,Fe),z(1,f.fw[0],f.fw[1],f.fw[2],le),z(2,f.rt[0],f.rt[1],f.rt[2],1),z(3,f.up[0],f.up[1],f.up[2],L);{const x=o.xa-f.x,K=o.zOut-f.z,Le=Math.hypot(x,K),ca=(f.fw[0]*x+f.fw[2]*K)/Le,ot=N((ca+.1)/.95,0,1),Mt=1+1.5*(1-ot*ot*(3-2*ot))+.4*Math.max(0,f.fw[1]);Se=Se<0?Mt:Se+(Mt-Se)*Math.min(1,a*1.5)}if(z(12,(H?bt*H.ex:bt)*Se,De,Ve,10),I[29*4+3]=Ht/I[12*4],z(24,16,tt,U,I[24*4+3]),z(26,Et,1/J,l/J,he),Ue.fill(0),ue.forEach((x,K)=>{Ue.set([x.x,x.y,x.z,x.age],K*4),Ue.set([x.x0,x.z0,x.age,0],(4+K)*4)}),xe.forEach((x,K)=>Ue.set([x.x,x.z,le-x.t0,x.a],32+K*4)),t.bindTexture(t.TEXTURE_2D,ze.pb),t.texSubImage2D(t.TEXTURE_2D,0,0,0,8,2,t.RGBA,t.FLOAT,Ue),Yt(),I[15*4+1]=ue.length,I[15*4+2]=xe.length,r.hf||r.nf)for(;Ke>=1/90;){Ke-=1/90,I[18*4+3]=De;const x=Be[Ie],K=Be[1-Ie];ce("sim",K.fb,ve,we,{sim:x.tex,no:-1}),Ie=1-Ie}const s=Be[Ie].tex;I[24*4]=0,ce("g",ze.g.fb,it,ct,{sim:s,no:3}),I[24*4]=16,ce("k",Qe.fb,st,nt,{sim:s,no:4}),t.activeTexture(t.TEXTURE10),t.bindTexture(t.TEXTURE_2D,Qe.tex),t.generateMipmap(t.TEXTURE_2D),I[24*4]=24,I[24*4+2]=ee;const n=At||(At=Vt(t,r,l,J));let c=!0;for(let x=0;x<13;x++)if(n.sig[x]!==I[mt[x]]){c=!1;break}if(!c){ce("m",n.m.fb,l,l,{sim:s,no:8});for(let x=0;x<13;x++)n.sig[x]=I[mt[x]];n.tide=NaN}(!c||!_t)&&(Me=aa(),_t=!0),n.tide!==L&&(ce("u",n.u.fb,J,J,{sim:s,no:7,t:n.m.tex}),n.tide=L);const m={sim:s,no:6,t:n.m.tex,u:n.u.tex};ce("r",Ge.fb,J,J,m),ce("w",Ge.fb,J,J,m),ue.length&&!r.nf&&r.late(!0,++Rt>4)&&Rt>4&&(t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.colorMask(!0,!0,!0,!1),ce("p",Ge.fb,J,J,m),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0)),z(28,Me[0],Me[1],Me[2],Me[3]*Ve),ce("c",null,l,l,{sim:s,no:-1,t:n.m.tex,u:n.u.tex})};for(let a=0;a<3;a++)gt(1/30);return Ft(1/30),(a,i)=>{i=N(i||1/30,0,.1),++r.frames===12&&!r.nf?r.late(!0):(r.frames===8||r.frames===10)&&!r.nf&&r.pre(r.frames===8?1:2),ia(i),gt(i),Ft(i)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
