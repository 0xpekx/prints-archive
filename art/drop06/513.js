// Sea Cave: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/513.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(rt){rt&&function(){"use strict";const Mt={yaw:0,pitch:0,x:0,y:0,z:0},ve=128,we=256,st=256,nt=512,it=64,ct=128,N=(e,t,c)=>e<t?t:e>c?c:e,de=Math.PI*2;let Se=null,Ke=null;function Ut(){if(Se)return;let e=1362828919;const t=64,c=new Float32Array(t*t*t),r=new Float32Array(t*t*t);for(let d=0;d<c.length;d++){e=e+1831565813|0;let p=Math.imul(e^e>>>15,1|e);p=p+Math.imul(p^p>>>7,61|p)^p,c[d]=((p^p>>>14)>>>0)/4294967296}const f=[1/16,4/16,6/16,4/16,1/16],m=(d,p,y,b,T)=>{for(let U=0;U<t;U++)for(let A=0;A<t;A++)for(let o=0;o<t;o++){let k=0;for(let _=-2;_<=2;_++)k+=f[_+2]*d[(o+_*y&63)+64*((A+_*b&63)+64*(U+_*T&63))];p[o+64*(A+64*U)]=k}};m(c,r,1,0,0),m(r,c,0,1,0),m(c,r,0,0,1),Se=new Float32Array(t*t*t),Ke=new Uint16Array(t*t*t);const h=new Float32Array(1),v=new Uint32Array(h.buffer);for(let d=0;d<r.length;d++){const p=N(.5+(r[d]-.5)*3.2,0,1);h[0]=p;const y=v[0],b=(y>>>23&255)-112,T=b<=0?0:b<<10|(y&8388607)>>>13;Ke[d]=T;const U=T>>10,A=T&1023;Se[d]=U===0?0:Math.pow(2,U-15)*(1+A/1024)}}let be=null;function Dt(){if(be)return;const e=32,t=8,c=new Float32Array(t*t*t*4);let r=1554059413;for(let v=0;v<c.length;v++){r=r+1831565813|0;let d=Math.imul(r^r>>>15,1|r);d=d+Math.imul(d^d>>>7,61|d)^d,c[v]=((d^d>>>14)>>>0)/4294967296}const f=new Float32Array(1),m=new Uint32Array(f.buffer),h=v=>{f[0]=v;const d=m[0],p=d>>>16&32768,y=(d>>>23&255)-112;return y<=0?p:y>=31?p|31743:p|y<<10|(d&8388607)>>>13};be=new Uint16Array(e*e*e*4);for(let v=0;v<e;v++)for(let d=0;d<e;d++)for(let p=0;p<e;p++){const y=(p+.5)/4,b=(d+.5)/4,T=(v+.5)/4,U=Math.floor(y-.5),A=Math.floor(b-.5),o=Math.floor(T-.5);let k=0,_=0,E=0,g=0,R=0,I=0,M=0,O=0,$=0;for(let ee=0;ee<8;ee++){const ye=U+(ee&1),D=A+(ee>>1&1),pe=o+(ee>>2),te=((ye&7)+8*((D&7)+8*(pe&7)))*4,he=y-ye-.5-(c[te]-.5)*.85,B=b-D-.5-(c[te+1]-.5)*.85,q=T-pe-.5-(c[te+2]-.5)*.85,fe=he*he+B*B+q*q,X=Math.exp(-12*fe),ae=.2+1.4*c[te+3]*c[te+3],oe=(fe+.45*q-.25)*ae,J=2*he*ae,me=2*B*ae,Y=(2*q+.45)*ae,Re=-24*X*he,ne=-24*X*B,Z=-24*X*q;k+=X,_+=X*oe,E+=X*c[te+1],g+=Re,R+=ne,I+=Z,M+=Re*oe+X*J,O+=ne*oe+X*me,$+=Z*oe+X*Y}const C=1/Math.max(k,1e-9),K=(p+e*(d+e*v))*4;be[K]=h((M-_*C*g)*C),be[K+1]=h((O-_*C*R)*C),be[K+2]=h(($-_*C*I)*C),be[K+3]=h(E*C)}}function It(e,t,c){e=e*64-.5,t=t*64-.5,c=c*64-.5;const r=Math.floor(e),f=Math.floor(t),m=Math.floor(c),h=e-r,v=t-f,d=c-m;let p=0;for(let y=0;y<2;y++)for(let b=0;b<2;b++)for(let T=0;T<2;T++)p+=(T?h:1-h)*(b?v:1-v)*(y?d:1-d)*Se[(r+T&63)+64*((f+b&63)+64*(m+y&63))];return p}const re=(e,t,c,r)=>It(e/(r*21),t/(r*21),c/(r*21)),lt=(e,t,c)=>{const r=N(.5+.5*(t-e)/c,0,1);return t+(e-t)*r-c*r*(1-r)},qe=(e,t,c)=>-lt(-e,-t,c),ge=(e,t,c)=>{const r=N((c-e)/(t-e),0,1);return r*r*(3-2*r)};function ht(e,t,c,r,f,m,h){const v=e-r,d=Math.max(f+4-c,0),p=m+d*.38,y=h+d*.5;let b=t>0?(1-Math.hypot(v/p,t/y))*Math.min(p,y):p-Math.abs(v);return b=Math.min(b,t+9),Math.min(b,c-f+2)}function se(e,t,c,r){const f=e.o,m=r-e.zc,h=1.6*Math.sin(m*.061+f[0]*6)+.8*Math.sin(m*.13+f[1]*5),v=t-h,d=c,p=m,y=re(t+f[0]*40,c+f[1]*40,r+f[2]*40,7)-.5,b=e.rx*(1+.35*y),T=(d>0?e.ryU:e.ryD)*(1+.3*y),U=e.len,A=Math.hypot(v/b,d/T,p/U),o=Math.hypot(v/(b*b),d/(T*T),p/(U*U));let k=-A*(A-1)/Math.max(o,.001);k=qe(k,ht(t,c,r,e.xa,e.zIn,e.hw,e.tp),1.5),e.xa2>-50&&(k=qe(k,ht(t,c,r,e.xa2,e.zIn+1,e.hw*.55,e.tp*.7),1));const _=e.px,E=e.py,g=e.zc-e.len+6,R=-6,I=.6,M=-26,O=t-_,$=c-E,C=r-g,K=N((O*R+$*I+C*M)/(R*R+I*I+M*M),0,1);k=qe(k,e.pr*(1-.55*K)-Math.hypot(O-R*K,$-I*K,C-M*K),2.5);const ee=1-.8*ge(e.zIn-7,e.zIn-1,r)*(1-ge(3,9,Math.abs(t-e.xa)));k+=ee*(y*1.4+(re(r+f[0]*17,t+f[1]*17,c+f[2]*17,2.4)-.5)*1.1)*e.relief,k+=.55*(.2-Math.abs(re(t+f[0]*23,c+f[1]*23,r+f[2]*23,1.1)-.5))*e.relief,k+=.07*Math.sin(c*2.3+5*re(t+f[0]*31,c+f[1]*31,r+f[2]*31,1.6)),k+=.45*Math.exp(-(c-.3)*(c-.3)/.4);const ye=c+e.sand+(re(t+f[0]*11,f[1]*11,r+f[2]*11,3)-.5)*1.4-e.boulders*Math.max(re(t+f[0]*7,c+f[1]*7,r+f[2]*7,1.6)-.45,0)*3;if(k=Math.min(k,ye),e.bench){const D=e.bench,pe=Math.abs(t-D.x)-D.hx,te=Math.abs(c-D.y)-2.6,he=Math.abs(r-D.z)-D.hz;let B=Math.hypot(Math.max(pe,0),Math.max(te,0),Math.max(he,0))+Math.min(Math.max(pe,te,he),0);const q=t-D.cx,fe=r-D.cz,X=ge(.16,2.6,q*q+fe*fe)*(1-ge(.6,.9,B));if(X>0){const ae=Math.abs(t-D.x+(re(t+f[0]*13,c+f[1]*13,r+f[2]*13,2.2)-.5)*1.4)-D.hx+.8,oe=Math.abs(r-D.z+(re(r+f[0]*19,c+f[1]*19,t+f[2]*19,2.2)-.5)*1.4)-D.hz+.8;let J=qe(Math.hypot(Math.max(ae,0),Math.max(oe,0))+Math.min(Math.max(ae,oe),0)-.8,c-D.y-2.6+(re(t+f[0]*29,c*.3+f[1]*29,r+f[2]*29,1.2)-.5)*.8+.05*(t-D.x),.35);J=Math.max(J,B-.15),B+=(Math.min(J,B)+(J-Math.min(J,B))*ge(.12,.45,c)-B)*X}B+=(re(t+f[0]*9,c+f[1]*9,r+f[2]*9,1.4)-.5)*.7-.25,k=lt(k,B,1)}return Math.max(k,r-e.zOut)}const Ve=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,Lt="void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",ft=`
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
`,He=`
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
`,St=`
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
}`,Bt=`
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
}`,Gt=`
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
}`,Wt=`
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
}`,jt=`
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
}`,Kt=`precision highp usampler2D;
vec4 nfF(highp usampler2D s, ivec2 p){ uvec2 u = texelFetch(s, p, 0).xy; return vec4(unpackHalf2x16(u.x), unpackHalf2x16(u.y)); }
vec4 nfBl(highp usampler2D s, vec2 uv){
  vec2 n = vec2(textureSize(s, 0)), f = uv * n - .5, i = floor(f); f -= i;
  ivec2 a = ivec2(clamp(i, vec2(0.), n - 1.)), b = ivec2(clamp(i + 1., vec2(0.), n - 1.));
  return mix(mix(nfF(s, a), nfF(s, ivec2(b.x, a.y)), f.x), mix(nfF(s, ivec2(a.x, b.y)), nfF(s, b), f.x), f.y);
}
`,ut=["uSim","uG","uA","uT","uU"];function Vt(e,t){e=e.replace(`sampler3D;
`,`sampler3D;
`+Kt);for(const m of ut)e=e.split("uniform sampler2D "+m+";").join("uniform highp usampler2D "+m+";");let c="",r=0;const f=/\b(texture|textureLod|texelFetch)\((u[A-Za-z0-9]+)\s*,/g;for(let m;m=f.exec(e);){if(!ut.includes(m[2]))continue;let h=m.index+m[0].length,v=0,d=h;const p=[];for(;h<e.length;h++){const y=e[h];if(y==="(")v++;else if(y===")"){if(v===0)break;v--}else y===","&&v===0&&(p.push(e.slice(d,h)),d=h+1)}p.push(e.slice(d,h)),c+=e.slice(r,m.index)+(m[1]==="texelFetch"?"nfF(":"nfBl(")+m[2]+", "+p[0].trim()+")",r=h+1,f.lastIndex=r}return e=c+e.slice(r),(t==="sim"||t==="g"||t==="m"||t==="u"||t==="r"||t==="w"||t==="p")&&(e=e.replace("out vec4 oC;","vec4 oC; out uvec4 oU;").replace("void main()","void main0()")+`
void main(){ main0(); oU = uvec4(packHalf2x16(oC.xy), packHalf2x16(oC.zw), 0u, 0u); }`),e}function Ht(e){if(e.__c513)return e.__c513;const t=!!e.getExtension("EXT_color_buffer_float"),c=t||!!e.getExtension("EXT_color_buffer_half_float"),r=!c,f=(E,g)=>{const R=e.createShader(E);return e.shaderSource(R,g),e.compileShader(R),R},m={bake:St,sim:qt,g:Xt,k:He+Nt,m:Ot,u:Ct,r:Bt,w:He+Gt,c:He+jt},h={},v=(E,g)=>{const R=e.createProgram(),I=f(e.VERTEX_SHADER,Ve+Lt),M=f(e.FRAGMENT_SHADER,r?Vt(Ve+"#define PG_"+E+`
`+ft+g,E):Ve+"#define PG_"+E+`
`+ft+g);return e.attachShader(R,I),e.attachShader(R,M),e.linkProgram(R),e.flush(),{p:R,v:I,f:M}},d=(E,g)=>{const{p:R,v:I,f:M}=g;if(!e.getProgramParameter(R,e.LINK_STATUS))throw new Error("513 "+E+": "+(e.getShaderInfoLog(I)||"")+(e.getShaderInfoLog(M)||"")+e.getProgramInfoLog(R));return e.useProgram(R),["uN3","uSd","uSim","uG","uK","uPb","uA","uU","uT","uDs"].forEach((O,$)=>{const C=e.getUniformLocation(R,O);C&&e.uniform1i(C,$)}),{p:R,uP:e.getUniformLocation(R,"uP")}};for(const E in m)h[E]=v(E,m[E]);e.flush(),Ut(),Dt();for(const E in h)h[E]=d(E,h[E]);const p=e.getExtension("KHR_parallel_shader_compile");let y=null,b=0;const T=(E,g)=>{if(b===0&&E&&(y=v("p",Wt),e.flush(),b=1,!g))return!1;if(b!==1)return b===2;if(p&&!g&&!e.getProgramParameter(y.p,p.COMPLETION_STATUS_KHR))return!1;try{h.p=d("p",y),b=2}catch{b=3}return b===2},U=e.createTexture();e.bindTexture(e.TEXTURE_3D,U),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage3D(e.TEXTURE_3D,0,e.R16F,64,64,64,0,e.RED,e.HALF_FLOAT,Ke),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const E of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,E,e.REPEAT);const A=e.createTexture();e.bindTexture(e.TEXTURE_3D,A),e.texImage3D(e.TEXTURE_3D,0,e.RGBA16F,32,32,32,0,e.RGBA,e.HALF_FLOAT,be),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const E of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,E,e.REPEAT);const o=e.createTexture();e.bindTexture(e.TEXTURE_3D,o),e.texImage3D(e.TEXTURE_3D,0,e.R16F,1,1,1,0,e.RED,e.HALF_FLOAT,new Uint16Array(1));const k=e.createVertexArray();let _=null;return r&&(_=e.createTexture(),e.bindTexture(e.TEXTURE_2D,_),e.texImage2D(e.TEXTURE_2D,0,e.RG32UI,1,1,0,e.RG_INTEGER,e.UNSIGNED_INT,new Uint32Array(2)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST)),e.__c513={P:h,flt:t,hf:c,nf:r,tN:U,tD:A,t3:o,tU:_,vEmpty:k,late:T,frames:0,rts:{},slots:new Map,vc:new Map}}function Te(e,t,c,r,f,m,h){const v=e.createTexture();e.bindTexture(e.TEXTURE_2D,v),f==="f"&&t.hf?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,c,r,0,e.RGBA,e.HALF_FLOAT,null):f==="f"&&t.nf?(e.texImage2D(e.TEXTURE_2D,0,e.RG32UI,c,r,0,e.RG_INTEGER,e.UNSIGNED_INT,null),m=e.NEAREST,h=!1):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,c,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,h?e.LINEAR_MIPMAP_LINEAR:m),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,m),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),h&&e.generateMipmap(e.TEXTURE_2D);const d=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,d),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,v,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:v,fb:d,w:c,h:r}}function dt(e,t,c,r,f,m,h,v){return t.rts[c]||(t.rts[c]=Te(e,t,r,f,m,h,v))}const pt=[0,1,2,3,4,5,6,8,9,10,12,13,14];function Jt(e,t,c,r,f){let m=t.vc.get(c);if(m)return t.vc.delete(c),t.vc.set(c,m),m;const h=(r*r+f*f)*8;let v=h;for(const y of t.vc.values())v+=y.bytes;for(;t.vc.size&&(v>24e6||t.vc.size>=8);){const[y,b]=t.vc.entries().next().value;for(const T of[b.m,b.u])e.deleteTexture(T.tex),e.deleteFramebuffer(T.fb);v-=b.bytes,t.vc.delete(y)}const d=Te(e,t,r,r,"f",e.NEAREST),p=Te(e,t,f,f,"f",e.NEAREST);return e.bindTexture(e.TEXTURE_2D,null),m={m:d,u:p,bytes:h,sig:new Float32Array(13).fill(NaN),tide:NaN},t.vc.set(c,m),m}rt.add({num:513,name:"Sea Cave",fam:"Vistas",recipe:"Inside a sea cave where sunlight gets in under a low arch and lights the pool from below, throwing rippling light onto the rock roof. The cave, the swell, the water and the day outside change every mint. Tap the water to drop a pebble that sinks glowing silver, drag to push a swell in through the arch, or hold to let the tide rise so the arch narrows and the blue gets deeper.",interactive:"Tap the water to drop a pebble that sinks glowing silver, trailing bubbles. Drag to send a swell in through the arch: it nearly closes the opening, surges through the cave and churns silver foam at the mouth. Hold to let the tide rise: the arch narrows and the blue deepens.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,c=e.size,r=Ht(t),f=r.P;let m=2654435769;for(let a=2;a<e.hash.length;a+=8)m=Math.imul(m^parseInt(e.hash.slice(a,a+8),16),2246822507)>>>0;const h=()=>{m=m+1831565813|0;let a=Math.imul(m^m>>>15,1|m);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},v=a=>{let n=0;for(const i in a)n+=a[i];let s=h()*n;for(const i in a)if(s-=a[i],s<0)return i;return Object.keys(a)[0]};let d=v({"One big vault":58,"Long tunnel":30,"Emerald cave":12}),p=v({"Glassy calm":28,"Gentle swell":47,"Swell surging":25}),y=v({"Midday glow":72,"Afternoon shaft":28}),b=v({"Grey limestone":55,"Ochre limestone":30,"Dark dolomite":15}),T=v({"Pale sand":65,"Boulders and sand":35}),U=v({"Low arch":80,"Twin arches":20});e.home&&(d="One big vault",p="Gentle swell",y="Midday glow",b="Grey limestone",T="Pale sand",U="Low arch"),e.trait("Cave",d),e.trait("Sea",p),e.trait("Hour",y),e.trait("Rock",b),e.trait("Floor",T),e.trait("Arch",U);const A=d==="One big vault"?0:d==="Long tunnel"?1:2,o={rx:[13,8.5,10.5][A],ryU:[11.5,8,9.5][A],ryD:[13,9,10][A],len:[32,50,24][A],zc:0,hw:2.1+h()*.4,tp:1.6+h()*.35,xa:0,xa2:-99,sand:T==="Pale sand"?6+h()*1.5:7.5+h()*1.5,boulders:T==="Pale sand"?0:1,relief:b==="Ochre limestone"?1.15:b==="Dark dolomite"?.85:1,o:[h(),h(),h()],px:0,py:.5,pr:[3.2,2.6,2.4][A],bench:null};o.zOut=o.zc+o.len+3,o.zIn=o.zOut-6;{const a=o.zIn-o.zc;o.xa=1.6*Math.sin(a*.061+o.o[0]*6)+.8*Math.sin(a*.13+o.o[1]*5)+(h()-.6)*o.rx*.3}U==="Twin arches"&&(o.xa2=o.xa+5.5+h()*1.5),o.px=(h()-.5)*4;const k=b==="Grey limestone"?[.3,.29,.27]:b==="Ochre limestone"?[.36,.27,.17]:[.16,.16,.17],_=A===2;let E=739982445;for(let a=2;a<e.hash.length;a+=8)E=Math.imul(E^parseInt(e.hash.slice(a,a+8),16),461845907)>>>0;const g=()=>{E=E+1831565813|0;let a=Math.imul(E^E>>>15,1|E);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},R=a=>{let n=0;for(const i in a)n+=a[i];let s=g()*n;for(const i in a)if(s-=a[i],s<0)return i;return Object.keys(a)[0]};let I=R({"Midday sea":84,"Grey day":10,Sunset:6}),M=R({"Clear azure":80,"Milky turquoise":20});e.home&&(I="Midday sea",M="Clear azure"),_&&(M="Emerald"),e.trait("Outside",I),e.trait("Water",M);const O=I==="Far cliffs"?1:I==="Grey day"?2:I==="Sunset"?3:0,$=_?[.38,.06,.15]:M==="Milky turquoise"?[.42,.05,.05]:[.42,.072,.026],C=_?.07:M==="Milky turquoise"?.1:M==="Silver"?.085:.05,K=_?[.55,1,.58]:O===3?[.62,.66,1]:M==="Milky turquoise"?[.5,.95,.92]:M==="Silver"?[.78,.9,1]:[.55,.85,1],ee=1100*(A===1?1.4:1)*(O===2?.5:1)*(M==="Silver"?.8:1),ye=p==="Glassy calm"?.006:p==="Gentle swell"?.12:.3,D=p==="Glassy calm"?.008:p==="Gentle swell"?.016:.024,pe=y==="Afternoon shaft"?1:0,te=p==="Glassy calm"?4e-4:p==="Gentle swell"?.016:.022,he=p==="Glassy calm"?.25:p==="Gentle swell"?1:1.4,q=[(h()<.5?-1:1)*(.12+.1*h()),-.11-.05*h(),-1];{const a=Math.hypot(...q);q[0]/=a,q[1]/=a,q[2]/=a}const fe=O===3?[.95,.42,.15]:O===2?[.66,.7,.74]:pe?[1,.82,.58]:[1,.93,.8],X=34,ae=[7.3+h()*2,10.6+h()*3,13.9+h()*2],oe=[h()*de,h()*de,h()*de],J=o.zc+[2,12,0][A]+(h()-.5)*3;let me=-2;for(;me>-30&&!(se(o,me,1.4,J)<0);me-=.25);o.bench={x:me+1.4,y:.95-2.6,z:J,hx:3,hz:6.5,cx:me+3.9,cz:J+4.5};const Y={x:me+3.9,z:J+4.5},Re=(a,n)=>{let s=4;for(;s>-2&&!(se(o,a,s,n)<0);s-=.05);return s};let ne=1362709803;for(let a=2;a<e.hash.length;a+=8)ne=Math.imul(ne^parseInt(e.hash.slice(a,a+8),16),3432918353)>>>0;const Z=()=>{ne=ne+1831565813|0;let a=Math.imul(ne^ne>>>15,1|ne);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},Xe={"On the ledge":40,"Low on the water":28,"At the arch, looking in":20,"Close under the arch":12};let Pe="On the ledge";{let a=0;for(const s in Xe)a+=Xe[s];let n=Z()*a;for(const s in Xe)if(n-=Xe[s],n<0){Pe=s;break}}e.home&&(Pe="On the ledge"),e.trait("Standpoint",Pe);const Q=Pe==="On the ledge"?0:Pe==="Low on the water"?1:Pe==="Close under the arch"?2:3,mt=a=>{const n=a-o.zc;return 1.6*Math.sin(n*.061+o.o[0]*6)+.8*Math.sin(n*.13+o.o[1]*5)};let V=null;if(Q){const a=Math.hypot(o.xa-Y.x,o.zOut-Y.z);let n=Q===1?o.zOut-a*(.8+.25*Z()):Q===2?o.zIn-7-Z()*3:o.zIn-3.5-Z()*2;const s=(Z()<.5?-1:1)*o.rx*(Q===1?.28:.2);let i=mt(n)+s;for(let Le=0;Le<48&&(se(o,i,1.2,n)<1.6||se(o,i,2.6,n)<.9);Le++)i+=(mt(n)-i)*.25,Le%4===3&&(n-=1);const l=Q===1?1.05:Q===2?1.15:1.25,x=Math.atan2(o.xa-i,o.zOut-n),F=Z()<.5?-1:1,w=Q===1?x+F*(.26+.06*Z()):Q===2?x+F*(.3+.08*Z()):x+Math.PI+F*(.3+.1*Z()),j=Math.pow(Math.hypot(o.xa-i,o.zOut-n)/Math.hypot(o.xa-Y.x,o.zOut-Y.z),.9);V={x:i,z:n,eye:l,yaw:w,pitch:Q===1?.07:Q===2?.15:.02,ex:Q===3?1:N(j,.8,1.6)}}const Je=c>400,xt=e.hash+(Je?"L":"T"),_e=-(o.rx*1.4+4),ke=-(Math.max(o.ryD*1.35,o.sand+2)+1.5),Ne=o.zc-o.len-32,Ye=-_e,Ze=o.ryU*1.4+2,vt=o.zOut+2,ie=Je?[80,56,200]:[40,28,100],G=[_e,Ne,Ye,o.zOut+3];let W=r.slots.get(xt);if(!W&&(W={sims:[],n:0,g:Te(t,r,it,ct,"f",t.LINEAR),sd:null,pb:t.createTexture()},t.bindTexture(t.TEXTURE_2D,W.pb),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,8,2,0,t.RGBA,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),r.slots.set(xt,W),r.slots.size>14)){const[a,n]=r.slots.entries().next().value;for(const s of[...n.sims.flat(),n.g])t.deleteTexture(s.tex),t.deleteFramebuffer(s.fb);n.sd&&t.deleteTexture(n.sd),t.deleteTexture(n.pb),r.slots.delete(a)}const Qe=dt(t,r,"k",st,nt,"b",t.LINEAR,!0),H=Math.round(c*(c>400?.62:.9)),Oe=dt(t,r,"a"+c,H,H,"f",t.LINEAR),L=new Float32Array(34*4),z=(a,n,s,i,l)=>{L[a*4]=n,L[a*4+1]=s,L[a*4+2]=i,L[a*4+3]=l},Ae=Math.tan(31*Math.PI/180);z(4,o.rx,o.ryU,o.ryD,o.len),z(5,o.zc,o.xa,o.zIn,o.hw),z(6,o.tp,o.zOut,o.xa2,o.sand),z(7,$[0],$[1],$[2],C),z(8,K[0]*ee,K[1]*ee,K[2]*ee,o.xa2>-50?2:1),z(9,k[0],k[1],k[2],o.relief),z(10,q[0],q[1],q[2],pe),z(11,G[0],G[1],1/(G[2]-G[0]),1/(G[3]-G[1])),z(13,o.o[0],o.o[1],o.o[2],o.boulders),z(14,o.bench.x,o.bench.y,o.bench.z,o.bench.hx),z(15,o.bench.hz,0,0,ye),z(16,fe[0]*X,fe[1]*X,fe[2]*X,o.bench.cx),z(17,o.px,o.py,o.pr,o.bench.cz),z(18,1/90,7,.12,0),z(20,1,r.hf||r.nf?1:.125,r.hf||r.nf?1:.25,0),z(21,Je?110:80,20,4,Re(o.bench.cx,o.bench.cz)+1.6),z(22,_e,ke,Ne,r.hf?0:-32),z(23,1/(Ye-_e),1/(Ze-ke),1/(vt-Ne),r.hf?0:1),z(24,16,0,D,h()*50),z(25,1/ve,1/we,(G[2]-G[0])/ve,(G[3]-G[1])/we),z(27,M==="Silver"?2.6:1.6,0,r.hf?1:255*256/65535*64,r.hf?0:255/65535*64),z(29,T==="Pale sand"?.36:.28,8e-4,T==="Pale sand"?.6:.45,.05);{const a=e.home?.1:.03+g()*.2,n=g()*de,s=[Math.sin(a)*Math.cos(n),Math.cos(a),Math.sin(a)*Math.sin(n)],i=b==="Dark dolomite"?.9+g()*.5:.55+g()*.45,l=g()*Math.PI;z(31,s[0],s[1],s[2],1/i),z(32,Math.cos(l),Math.sin(l),2.4+g()*2,g()*40)}z(30,_?.35:.8,_?.035:.012,p==="Glassy calm"?.3:p==="Gentle swell"?1:1.25,_?.45:1);const wt=[1.25,1.25,.78][A]*(b==="Dark dolomite"?1.15:1)*(O===2?1.2:1);{const a=(o.xa-Y.x)/(o.zOut-Y.z);z(33,a+(g()<.5?-1:1)*(.02+.02*g()),.05+.04*g(),O===1?.01+.008*g():0,O)}const Yt=(_?.08:A===1?.13:.23)*(Q===2?.5:1),Zt=.0025,ze=new Array(20).fill(void 0);let $e=!1;const Qt=()=>{$e=!1},$t=a=>{const n=[[t.TEXTURE_3D,r.tN],[t.TEXTURE_3D,W.sd||r.t3],[t.TEXTURE_2D,a.sim],[t.TEXTURE_2D,W.g.tex],[t.TEXTURE_2D,Qe.tex],[t.TEXTURE_2D,W.pb],[t.TEXTURE_2D,Oe.tex],[t.TEXTURE_2D,a.u||null],[t.TEXTURE_2D,a.t||null],[t.TEXTURE_3D,r.tD]];$e||(ze.fill(void 0),$e=!0,t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(r.vEmpty));for(let s=0;s<10;s++){const i=n[s][0]===t.TEXTURE_3D?a.no===s?null:n[s][1]:null;let l=n[s][0]===t.TEXTURE_2D?a.no===s?null:n[s][1]:null;!l&&r.nf&&(s===2||s===3||s>=6)&&(l=r.tU),!(ze[s*2]===i&&ze[s*2+1]===l)&&(t.activeTexture(t.TEXTURE0+s),ze[s*2]!==i&&t.bindTexture(t.TEXTURE_3D,i),ze[s*2+1]!==l&&t.bindTexture(t.TEXTURE_2D,l),ze[s*2]=i,ze[s*2+1]=l)}},ce=(a,n,s,i,l)=>{const x=f[a];t.bindFramebuffer(t.FRAMEBUFFER,n),t.viewport(0,0,s,i),t.useProgram(x.p),$t(l),z(19,s,i,1/s,1/i),t.uniform4fv(x.uP,L),t.drawArrays(t.TRIANGLES,0,3)};if(!W.sd){const a=t.createTexture();t.bindTexture(t.TEXTURE_3D,a),t.texStorage3D(t.TEXTURE_3D,1,r.hf?t.R16F:t.RGBA8,ie[0],ie[2],ie[1]),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const x of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,x,t.CLAMP_TO_EDGE);const n=t.createFramebuffer(),s=(Ze-ke)/ie[1],i=ke+(Math.ceil(-ke/s-.5)+1)*s;z(25,(Ye-_e)/ie[0],(Ze-ke)/ie[1],(vt-Ne)/ie[2],i);let l=!0;for(let x=0;x<ie[1];x++){if(t.bindFramebuffer(t.FRAMEBUFFER,n),t.framebufferTextureLayer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,a,0,x),x===0&&t.checkFramebufferStatus(t.FRAMEBUFFER)!==t.FRAMEBUFFER_COMPLETE){l=!1;break}L[20*4+3]=x,ce("bake",n,ie[0],ie[2],{sim:null,no:1})}t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(n),l?W.sd=a:t.deleteTexture(a),z(25,1/ve,1/we,(G[2]-G[0])/ve,(G[3]-G[1])/we)}const bt=W.n++%3,Ce=W.sims[bt]||(W.sims[bt]=[Te(t,r,ve,we,"f",t.LINEAR),Te(t,r,ve,we,"f",t.LINEAR)]);for(const a of Ce)t.bindFramebuffer(t.FRAMEBUFFER,a.fb),r.nf?t.clearBufferuiv(t.COLOR,0,new Uint32Array(4)):(t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT));t.bindFramebuffer(t.FRAMEBUFFER,null);const u={x:0,y:0,z:0,fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},ea=Math.atan2(o.xa-Y.x,o.zOut-Y.z),ta=V?V.yaw:ea-.21,aa=V?V.pitch:-.05;let Be=1e9,Ge=1e9,yt=0;const oa=()=>{const a=e.view||Mt;if(V){let F=N(a.x||0,-1.5,1.5),w=N(a.z||0,-4,4);if(F!==Be||w!==Ge){Be=F,Ge=w;for(let j=0;j<8&&se(o,V.x+F,1,V.z+w)<1.2;j++)F*=.7,w*=.7;u.x=V.x+F,u.z=V.z+w}u.y=N(Math.max(V.eye,S+.8)+(a.y||0),.6,4)}else{const F=N(a.x||0,-1.6,1.2),w=N(a.z||0,-5,5);u.x=Y.x+F,u.z=Y.z+w,(F!==Be||w!==Ge)&&(yt=Re(u.x,u.z),Be=F,Ge=w),u.y=yt+N(1.6+(a.y||0),.6,4)}const n=ta+(a.yaw||0),s=N(aa+(a.pitch||0),-1.3,1.3),i=Math.cos(s);u.fw=[Math.sin(n)*i,Math.sin(s),Math.cos(n)*i],u.rt=[Math.cos(n),0,-Math.sin(n)];const l=u.fw,x=u.rt;u.up=[l[1]*x[2]-l[2]*x[1],l[2]*x[0]-l[0]*x[2],l[0]*x[1]-l[1]*x[0]]},zt=(a,n)=>{const s=a*2-1,i=1-n*2,l=[0,1,2].map(F=>u.fw[F]+(s*u.rt[F]+i*u.up[F])*Ae),x=Math.hypot(l[0],l[1],l[2]);return l.map(F=>F/x)};let Fe=[0,0,1,0];const ra=()=>{const a=[o.xa,.35*o.tp,o.zOut-1],n=[a[0]-u.x,a[1]-u.y,a[2]-u.z],s=n[0]*u.fw[0]+n[1]*u.fw[1]+n[2]*u.fw[2];if(s<.5)return[0,0,1,0];const i=.5+.5*(n[0]*u.rt[0]+n[1]*u.rt[1]+n[2]*u.rt[2])/(s*Ae),l=.5+.5*(n[0]*u.up[0]+n[1]*u.up[1]+n[2]*u.up[2])/(s*Ae);if(i<-.3||i>1.3||l<-.3||l>1.3)return[0,0,1,0];for(let F=1;F<24;F++){const w=F/24;if(se(o,u.x+n[0]*w,u.y+n[1]*w,u.z+n[2]*w)<0)return[0,0,1,0]}const x=o.hw/(s*Ae);return[i,l,.3*x+.015,Zt]};let le=0,S=0,et=0,Me=0,Et=0,tt=0,We=0,fa=0,je=1;const Ee=[],ue=[],xe=[],Ue=new Float32Array(8*2*4);let Tt=1.5+h()*3;const sa=(a,n)=>{let s=na();for(;s>-20&&!(se(o,a,s,n)<0);s-=.2);return s+.06},na=()=>S,ia=a=>{let n=ye*(Math.sin(de*a/ae[0]+oe[0])+.6*Math.sin(de*a/ae[1]+oe[1])+.35*Math.sin(de*a/ae[2]+oe[2]))/1.4;for(const s of Ee){const i=(a-s.t0)/s.dur;i>-.25&&i<1&&(n+=i<0?-.25*s.a*Math.sin(-i/.25*Math.PI):s.a*Math.pow(Math.sin(i*Math.PI),2))}return n},at=(a,n,s)=>{xe.push({x:a,z:n,t0:le,a:s}),xe.length>8&&xe.shift()},ca=(a,n)=>{const s=zt(a,n);if(s[1]>-.02)return null;let i=(S-u.y)/s[1],l=u.x+s[0]*i,x=u.z+s[2]*i;return se(o,l,S,x)<.3||x>o.zOut-1.5?null:[l,x]},Pt=(a,n)=>{const s=zt(a,n);let i,l;if(s[1]<-.02){const x=(S-u.y)/s[1];i=u.x+s[0]*x,l=u.z+s[2]*x}else{const x=Math.hypot(s[0],s[2])||1;i=u.x+s[0]/x*10,l=u.z+s[2]/x*10}for(let x=0;x<40&&se(o,i,S,l)<.3;x++)i+=(u.x-i)*.08,l+=(u.z-l)*.08;l=Math.min(l,o.zOut-1.5),ue.push({x:i,y:S-.03,z:l,vy:-.6,age:0,x0:i,z0:l,ph:h()*de,floorY:sa(i,l)}),ue.length>4&&ue.shift(),at(i,l,.02),e.sound.note(86+Math.floor(h()*5),{dur:.09,vel:.35,wave:"sine"}),e.sound.hit("noise",.18,{cutoff:3200,dur:.18}),e.sound.note(74,{dur:.5,vel:.08,wave:"sine"})},kt=a=>{Ee.push({t0:le,a,dur:2.6+a*1.5}),Ee.length>4&&Ee.shift(),e.sound.hit("noise",.25+a*.3,{cutoff:260,dur:2.8}),e.sound.note(31,{dur:2.2,vel:.25+a*.2,wave:"sine"})};let P=null;const la=a=>{const n=e.input,s=n.taps();if(n.down){P||(P={x0:n.x,y0:n.y,lx:n.x,ly:n.y,t:0,path:0,drag:!1,acc:0,sent:0});const i=n.x-P.lx,l=n.y-P.ly;if(P.lx=n.x,P.ly=n.y,P.t+=a,P.path+=Math.hypot(i,l),P.path>.012){if(P.drag||(P.drag=!0,kt(.65),P.sent=1),P.acc+=Math.hypot(i,l),P.wk=(P.wk||0)+Math.hypot(i,l),P.wk>.045){P.wk=0;const x=ca(n.x,n.y);x&&at(x[0],x[1],.014)}P.acc>.35&&P.sent<3&&(P.acc=0,P.sent++,kt(.45))}else P.t>.3&&(et+=a,S=Math.min(S+a*.14,.82),(et*2|0)!==((et-a)*2|0)&&e.sound.hit("noise",.06,{cutoff:500,dur:.6}))}else P?(!P.drag&&P.t<=.3&&Pt(P.x0,P.y0),P=null):s.length&&Pt(s[0].x,s[0].y),S=Math.max(0,S-a*.012)},gt=a=>{le+=a;for(let i=ue.length-1;i>=0;i--){const l=ue[i];l.age+=a,l.y>l.floorY&&(l.vy+=(-5.9-7.3*l.vy*Math.abs(l.vy))*a,l.y=Math.max(l.floorY,l.y+l.vy*a),l.x+=Math.sin(l.age*3.1+l.ph)*.04*a,l.z+=Math.cos(l.age*2.3+l.ph)*.04*a,l.y<=l.floorY&&e.sound.hit("click",.05)),l.age>30&&ue.splice(i,1)}for(let i=xe.length-1;i>=0;i--)le-xe[i].t0>14&&xe.splice(i,1);if(le>Tt){Tt=le+2+h()*5;for(let i=0;i<6;i++){const l=u.x+(h()-.3)*16,x=u.z+h()*22;if(se(o,l,S,x)>.8){at(l,x,.004),e.sound.note(93+Math.floor(h()*6),{dur:.06,vel:.06,wave:"sine"});break}}}for(let i=Ee.length-1;i>=0;i--)le-Ee[i].t0>8&&Ee.splice(i,1);const n=ia(le),s=(n-Me)/Math.max(a,.001);Me=n,Et=s,tt=Math.max(tt*Math.exp(-a*1.5),Math.max(s,0)*2.2+Math.max(0,S+n-(o.tp-.35))*6)};let De=0,Ie=-1,Rt=0,_t=!1;const At=a=>{oa(),We=Math.min(We+a,5/90);const n=N((o.tp-S-Me)/o.tp,0,1);je+=(n-je)*.5,z(0,u.x,u.y,u.z,Ae),z(1,u.fw[0],u.fw[1],u.fw[2],le),z(2,u.rt[0],u.rt[1],u.rt[2],1),z(3,u.up[0],u.up[1],u.up[2],S);{const w=o.xa-u.x,j=o.zOut-u.z,Le=Math.hypot(w,j),ha=(u.fw[0]*w+u.fw[2]*j)/Le,ot=N((ha+.1)/.95,0,1),Ft=1+1.5*(1-ot*ot*(3-2*ot))+.4*Math.max(0,u.fw[1]);Ie=Ie<0?Ft:Ie+(Ft-Ie)*Math.min(1,a*1.5)}if(z(12,(V?wt*V.ex:wt)*Ie,Me,je,10),L[29*4+3]=Yt/L[12*4],z(24,16,tt,D,L[24*4+3]),z(26,Et,1/H,c/H,he),Ue.fill(0),ue.forEach((w,j)=>{Ue.set([w.x,w.y,w.z,w.age],j*4),Ue.set([w.x0,w.z0,w.age,0],(4+j)*4)}),xe.forEach((w,j)=>Ue.set([w.x,w.z,le-w.t0,w.a],32+j*4)),t.bindTexture(t.TEXTURE_2D,W.pb),t.texSubImage2D(t.TEXTURE_2D,0,0,0,8,2,t.RGBA,t.FLOAT,Ue),Qt(),L[15*4+1]=ue.length,L[15*4+2]=xe.length,r.hf||r.nf)for(;We>=1/90;){We-=1/90,L[18*4+3]=Me;const w=Ce[De],j=Ce[1-De];ce("sim",j.fb,ve,we,{sim:w.tex,no:-1}),De=1-De}const s=Ce[De].tex;L[24*4]=0,ce("g",W.g.fb,it,ct,{sim:s,no:3}),L[24*4]=16,ce("k",Qe.fb,st,nt,{sim:s,no:4}),t.activeTexture(t.TEXTURE10),t.bindTexture(t.TEXTURE_2D,Qe.tex),t.generateMipmap(t.TEXTURE_2D),L[24*4]=24,L[24*4+2]=te;const i=Jt(t,r,e.hash+":"+c,c,H);let l=!0;for(let w=0;w<13;w++)if(i.sig[w]!==L[pt[w]]){l=!1;break}if(!l){ce("m",i.m.fb,c,c,{sim:s,no:8});for(let w=0;w<13;w++)i.sig[w]=L[pt[w]];i.tide=NaN}(!l||!_t)&&(Fe=ra(),_t=!0),i.tide!==S&&(ce("u",i.u.fb,H,H,{sim:s,no:7,t:i.m.tex}),i.tide=S);const x={sim:s,no:6,t:i.m.tex,u:i.u.tex};ce("r",Oe.fb,H,H,x),ce("w",Oe.fb,H,H,x),ue.length&&!r.nf&&r.late(!0,++Rt>4)&&Rt>4&&(t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.colorMask(!0,!0,!0,!1),ce("p",Oe.fb,H,H,x),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0)),z(28,Fe[0],Fe[1],Fe[2],Fe[3]*je),ce("c",null,c,c,{sim:s,no:-1,t:i.m.tex,u:i.u.tex})};for(let a=0;a<3;a++)gt(1/30);return At(1/30),(a,n)=>{n=N(n||1/30,0,.1),++r.frames===12&&!r.nf&&r.late(!0),la(n),gt(n),At(n)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
