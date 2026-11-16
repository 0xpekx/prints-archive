// Salt Pans: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/568.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(mt){mt&&mt.add({num:568,name:"Salt Pans",fam:"Vistas",recipe:"A patchwork of shallow salt pans at sunset, each tinted from grey-blue to deep rose by how salty it is, with a stone windmill, salt heaps, flamingos far out and the sea beyond. Where you stand, the hour and the colours change every mint. Tap a pan to drop a pebble, drag sideways to turn the wind and spin the sails, or hold to let the sun go down (hold again to bring it back).",interactive:"Tap a pan to drop a pebble there: rings spread across its mirror; drag sideways to turn and raise the wind, so the mill cap swings round, the sails speed up and cat's paws streak the pans; hold to let the sun go down (hold again to bring it back)",music:!0,gl:!0,fps:30,seed:0,make(M){const e=M.gl,A=M.size,y=!!M.home;let ae=1451890661;for(let t=2;t<66;t+=8)ae=Math.imul(ae^parseInt(M.hash.slice(t,t+8),16),2246822507)^ae>>>13;const r=()=>{ae=ae+1831565813|0;let t=Math.imul(ae^ae>>>15,1|ae);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},he=t=>{let a=0;for(const n in t)a+=t[n];let o=r()*a;for(const n in t)if(o-=t[n],o<0)return n;return Object.keys(t)[0]},F=Math.PI*2,G=Math.PI/180,ut=M.trait("Hour",y?"Golden hour":he({"Golden hour":35,"Sun on the sea":30,"After sunset":25,"Blue hour":10})),jt=M.trait("Brine",y?"Patchwork":he({Patchwork:45,"Pale pans":22,"Deep rose":25,"Blood red":8})),de=M.trait("Sky",y?"High streaks":he({"High streaks":50,Clear:32,"Mackerel sky":18})),Ue=M.trait("Sails",y?"Full canvas":he({"Full canvas":55,Reefed:33,"Bare frames":12})),Wt=M.trait("Flamingos",y?"A small flock":he({"A small flock":50,"A great flock":30,"Three stragglers":20})),pt=M.trait("Harvest",y?"Heaps half tiled":he({"Heaps half tiled":45,"Fresh white heaps":25,"Heaps under tiles":20,"No heaps yet":10})),We=M.trait("Wind",y?"Land breeze":he({"Land breeze":50,"Dead calm":30,Gusty:20}));let oe=1511882307;for(let t=2;t<66;t+=8)oe=Math.imul(oe^parseInt(M.hash.slice(t,t+8),16),2654435761)^oe>>>15;const xt=()=>{oe=oe+1831565813|0;let t=Math.imul(oe^oe>>>15,1|oe);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ve=M.trait("Standpoint",y?"Down the dyke":(()=>{const t=xt()*100;return t<50?"Down the dyke":t<75?"Across the pans":t<90?"Over an open pan":"Back to the sun"})()),Ke=Ve==="Across the pans",V=Ve==="Over an open pan",vt=Ve==="Back to the sun",Vt=Ke?.62+.25*xt():0,Kt={"Golden hour":4.2,"Sun on the sea":1,"After sunset":-2,"Blue hour":-4.7}[ut],K=[6.5,2.6,.3,-2.2,-5.6],bt=y?.18:(r()<.5?-1:1)*(.2+.2*r()),me=Math.PI+(Ke?Math.sign(bt)*Vt:bt),Ae=y?.42:(r()<.5?-1:1)*(.1+.32*r()),Y=me+Ae,Se=y?.0072:.0046+.0036*r(),yt=y?1:(me>Math.PI?-1:1)*(r()<.75?1:-1),qe=me+(vt?Math.PI:0),ne=(t,a)=>{const o=qe+t;return[Math.sin(o)*a,Math.cos(o)*a]},Yt=y?88:70+50*r(),se=ne(yt*(y?.27:.3+.2*r()),Yt),De=y?ne(-.08,430):r()<.6||vt?ne((r()-.5)*1.2,260+160*r()):ne(Math.PI+(r()-.5)*1.6,420+300*r()),xe=y?31:24+16*r(),ue=y?44:32+26*r(),Ye=1.25,Fe=r()*8e6|0,Ne=r()*8e6|0,Jt=r()*8e6|0,re=.33,Qt=t=>(t>>>=0,t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,t>>>0),ie=(t,a)=>(Qt((t+65536^a)>>>0)&65535)/65535,ye=V?t=>(t+.5)*xe+(ie(t,Fe)-.5)*.5*xe:t=>t*xe+(t===0?0:(ie(t,Fe)-.5)*.5*xe),Je=t=>t===0&&!V?Ye:.65+.95*Math.pow(ie(t,(Fe^23505)>>>0),2),_e=-((y?9.5:7+7*r())*(V?0:1))-((-1+.5)*ue+(ie(-1,Ne)-.5)*.5*ue),pe=t=>(t+.5)*ue+(ie(t,Ne)-.5)*.5*ue+_e,Qe=Math.round((-430-_e)/ue-.5),$e=t=>t===Qe?7:V&&t===-1?Ye:.65+.95*Math.pow(ie(t,(Ne^23505)>>>0),2),$t=t=>{let a=Math.floor(t/xe);return t<ye(a)?a--:t>=ye(a+1)&&a++,a},e0=t=>{let a=Math.floor((t-_e)/ue-.5);return t<pe(a)?a--:t>=pe(a+1)&&a++,a},Pe=(t,a)=>{const o=$t(t),n=e0(a);return[ye(o)+Je(o)/2,ye(o+1)-Je(o+1)/2,pe(n)+$e(n)/2,pe(n+1)-$e(n+1)/2,o,n]},Le=[se[0]-8,se[1]-8,se[0]+8,se[1]+8],v=[],wt=-yt;if(pt!=="No heaps yet"){const t=ne(wt*(y?.4:.42+.12*r()),y?40:30+10*r()),a=ne(wt*(y?.3:.3+.08*r()),y?66:50+12*r()),o=y?13:6+4*r(),n=6+2.5*r();Math.abs(t[0])<7&&(t[0]=Math.sign(t[0]||1)*7),Math.abs(a[0])<8&&(a[0]=Math.sign(a[0]||1)*8),y&&(t[0]=6.5,t[1]=-36,a[0]=14,a[1]=-46);const s=(l,h,i)=>{const z=1.6*i,R=Math.atan2(l[1],l[0])+1+.05*h;return[l[0],l[1],z/.66,R,z]};v.push(s(t,o,y?1.6:1.5+.4*r())),v.push(s(a,n,1.45+.3*r()))}const Be=v.length?[Math.min(v[0][0]-v[0][2],v[1][0]-v[1][2])-2.5,Math.min(v[0][1]-v[0][2],v[1][1]-v[1][2])-2.5,Math.max(v[0][0]+v[0][2],v[1][0]+v[1][2])+2.5,Math.max(v[0][1]+v[0][2],v[1][1]+v[1][2])+2.5]:[0,0,0,0],t0={"Heaps half tiled":.55,"Fresh white heaps":-.2,"Heaps under tiles":1.2,"No heaps yet":0}[pt],a0=(y||r()<.5?-1:1)*(2.7+1.2*r()),et={Patchwork:[.55,1,0],"Pale pans":[.22,.7,0],"Deep rose":[.78,.6,0],"Blood red":[.92,.35,1]}[jt],Ce=((t,a)=>[Math.sin(t)*a,Math.cos(t)*a])(me+Math.PI+.5+(r()-.5)*.8,900+500*r()),we=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
uniform int uZ0;
`,o0=we+"out vec2 vUv; void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }",Xe=`
const float PI = 3.14159265, TAU = 6.2831853, E0 = 0.0105;
uniform sampler3D uN;
float atn(float y, float x){ float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-9)); if (ay > ax) a = 1.5707963 - a; if (x < 0.) a = PI - a; return y < 0. ? -a : a; }
vec3 dirOf(vec2 uv){ float az = uv.x * TAU; float el = pow(uv.y, 1.25) * (1.5707963 + E0) - E0; return vec3(sin(az) * cos(el), sin(el), cos(az) * cos(el)); }
vec2 uvOf(vec3 d){ float az = atn(d.x, d.z); float el = asin(clamp(d.y, -1., 1.)); return vec2(fract(az / TAU), pow(clamp((el + E0) / (1.5707963 + E0), 0., 1.), 0.8)); }
float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 64., 0.).r; }
float n2(vec2 p){ return n3(vec3(p, 17.5)); }
`,n0=we+Xe+`
const float RE = 6360., HR = 8., HM = 1.2, RT = 6420.;
const vec3 BR = vec3(5.8e-3, 13.5e-3, 33.1e-3), BO = vec3(1.6e-3, 4.7e-3, 0.21e-3);
uniform vec4 uA; uniform vec4 uB;   // sun dir, mie | ground alt km, sun power, multiple-scatter gain, sun elevation deg
float chap(float X, float h, float c){
  float s = sqrt(X + h), r;
  if (c >= 0.) r = s / (s * c + 1.) * exp(-h);
  else { float x0 = sqrt(max(0., 1. - c * c)) * (X + h); r = 2. * sqrt(x0) * exp(min(X - x0, 60.)) - s / (1. - s * c) * exp(-h); }
  return r;
}
vec3 sunT(vec3 P){
  float r = length(P), c = dot(P, uA.xyz) / r, h = r - RE;
  float oR = HR * chap(RE / HR, h / HR, c), oM = HM * chap(RE / HM, h / HM, c);
  float rr = r / (RE + 25.); float m25 = sqrt(max(1. - rr * rr * (1. - c * c), 0.));
  float oO = 15. / max(m25, 0.05) * (h < 25. ? 1. : 0.3);
  float pg = c < 0. ? r * sqrt(1. - c * c) : r;
  return exp(-min(BR * oR + uA.w * 1.11 * oM + BO * oO, vec3(80.))) * smoothstep(RE - 0.05, RE + 0.3, pg);
}
in vec2 vUv; out vec4 o;
void main(){
  vec3 rd = dirOf(vUv); rd.y = max(rd.y, 0.0004); rd = normalize(rd);
  vec3 ob = vec3(0., RE + uB.x, 0.);
  float b = dot(ob, rd), cc = dot(ob, ob) - RT * RT, tT = -b + sqrt(b * b - cc);
  vec3 sR = vec3(0.), sM = vec3(0.); float oR = 0., oM = 0., tp = 0.;
  for (int i = 0; i < 28 + uZ0; i++){
    float f = (float(i) + 1.) / 28., t = tT * f * f, dt = t - tp, tm = t - dt * .5; tp = t;
    vec3 P = ob + rd * tm; float h = length(P) - RE;
    float dR = exp(-h / HR) * dt, dM = exp(-h / HM) * dt;
    oR += dR * .5; oM += dM * .5;
    vec3 T = sunT(P) * exp(-(BR * oR + uA.w * 1.11 * oM));
    oR += dR * .5; oM += dM * .5;
    sR += T * dR; sM += T * dM;
  }
  float mu = dot(rd, uA.xyz), g = 0.76;
  float pR = 0.0597 * (1. + mu * mu), pM = 0.0796 * (1. - g * g) / pow(1. + g * g - 2. * g * mu, 1.5);
  vec3 L = uB.y * (BR * sR * pR + uA.w * sM * pM);
  float tw = exp(min(uB.w, 0.) / 2.6);
  L += uB.y * uB.z * tw * vec3(0.22, 0.42, 1.) * (0.6 + 0.4 * min(1., 0.25 / max(rd.y, 0.05)));
  // ozone and multiple scattering keep a golden-hour zenith a clean pale blue rather than violet: away from the sun,
  // high up, red is held below green
  float aw = smoothstep(0.03, 0.3, rd.y) * smoothstep(0.998, 0.9, mu) * smoothstep(-6., 0., uB.w);
  L = mix(L, dot(L, vec3(.3, .55, .15)) * mix(vec3(0.48, 0.78, 1.5), vec3(1.12, 1., 0.78), smoothstep(0.55, 0.97, mu)), aw * 0.75);
  L = max(L, 0.);
  o = uB.x < 0. ? vec4(L / (1. + L), 1.) : vec4(L, 1.);
}`,Ge=we+Xe+`
in vec2 vUv; out vec4 o;
uniform vec4 uC; // cover, drift km, seed, wind angle
uniform vec4 uS; // the sun's azimuth (sin, cos), the layer's height km
void main(){
  vec3 rd = dirOf(vec2(vUv.x, vUv.y * vUv.y));
  float hc = uS.z, Rr = 6360.;
  float X = hc * (2. * Rr + hc), b = Rr * max(rd.y, 0.), t = X / (b + sqrt(b * b + X));
  vec2 w = rd.xz * t;
  float ca = cos(uC.w), sa = sin(uC.w);
  vec2 ww = vec2(ca * w.x - sa * w.y + uC.y, sa * w.x + ca * w.y);
  vec2 rh = rd.xz / max(length(rd.xz), 1e-4); rh = abs(vec2(ca * rh.x - sa * rh.y, sa * rh.x + ca * rh.y));
  // one texel in km: along the ray's ground track (rows) and across it (columns); then along and across the wind
  float fr = 0.00514 * pow(max(vUv.y, 1e-3), 1.5) * t * t / hc, ft = TAU * t * sqrt(max(1. - rd.y * rd.y, 0.)) / 2048.;
  float fx = rh.x * fr + rh.y * ft, fy = rh.y * fr + rh.x * ft;
  float d = 0., lit = .5;
#ifndef MACK
  {
    // cirrus: fibrous streaks combed along the wind in tufts that bend together, here and there turning up into a hook
    // where a tuft ends (uncinus); uneven along their length and broken by gaps; denser cores, thin ends.
    // (the fibres themselves are finer than this map: the frame cuts them at screen resolution along the same curves)
    vec2 q = vec2(ww.x * 0.075, ww.y * 0.42) + uC.z;
    float nb = n3(vec3(q.x * 1.9 + 7.1, q.y * 0.35, 1.)), gp = n3(vec3(q.x * 1.9 + 7.42, q.y * 0.35, 1.)), hk = smoothstep(0.5, 0.95, nb);
    q.y += n3(vec3(q.x * 0.7, q.y * 0.25, 1.)) * 1.6 + nb * .45 + hk * hk * 1.5;
    float fq = max(fy * 0.42, fx * 0.075 * (1. + 6. * hk)), a = .3745, a1 = 0.;
    float un = mix(n3(vec3(q.x * 3.3, q.y * 1.3, 11.)), .5, smoothstep(0.25, 0.6, fq * 3.3));
    float sp = uC.x > 0.3 ? (uC.x - 0.52) * 10. : 0.;   // -1 a sparse sky .. 1 a denser veil
    vec3 p = vec3(q, 4.);
    for (int i = 0; i < 5 + uZ0; i++){ a1 += a * mix(n3(p), .5, smoothstep(0.25, 0.6, fq)); p = vec3(p.xy * vec2(1.55, 2.25) + 7.1, p.z + 3.3); fq *= 2.25; a *= .68; }
    float pch = n3(vec3(ww * 0.016 + 3.3, 2.)) * .65 + n3(vec3(ww * 0.04, 2.6)) * .35;
    float th = 0.62 - 0.3 * uC.x - 0.015 * sp + (un - .5) * 0.13 + 0.22 * smoothstep(0.6, 0.8, gp);
    d = smoothstep(th - 0.1 * max(sp, 0.), th + 0.26, a1) * smoothstep(0.4, 0.62, pch + 0.25 * (uC.x - 0.4) + 0.05 * sp) * smoothstep(0.03, 0.2 + 0.25 * rh.x * rh.x, rd.y);   // (seen end-on the streaks pile up low down: thinned there)
    lit = smoothstep(th, th + 0.42, a1);
  }
#else
  {
    // mackerel sky (altocumulus in ripples): small soft cloudlets in patches and ragged sheets with clear sky between.
    // Loose ripple rows, 0.7 km apart, that wander, fork and fade into plain dapple; cloudlets of two sizes; a deck
    // field that thickens them into a sheet with thin lanes or thins them to stray tufts at its frayed edge. Looked up
    // twice, here and a step toward the sun: the side of a cloudlet facing the low sun glows, its thin fringe is
    // bright and translucent, its thick middle grey. Terms too fine for a map texel fade to their mean (far haze).
    // A flat layer would squash the far cloudlets into dashes; real ones have height and keep their shape, so below
    // about 24 degrees the layer is laid out along a compressed range (the squash stops at 0.4)
    vec2 su = vec2(ca * uS.x - sa * uS.y, sa * uS.x + ca * uS.y);
    float rho = length(w), r0 = hc * 2.291, rm = max(rho, r0), gq = min(1., hc * 2.5 / sqrt(rho * rho + hc * hc));
    vec2 q0 = (ww - vec2(uC.y, 0.)) * ((min(rho, r0) + hc * 2.5 * (log(rm / hc + sqrt(rm * rm / (hc * hc) + 1.)) - 1.5668)) / max(rho, 1e-3)) + vec2(uC.y, 0.) + uC.z;
    float fm = max(rh.x * fr * gq + rh.y * ft, rh.y * fr * gq + rh.x * ft), kr = smoothstep(0.25, 0.6, fm * 1.75), kc = smoothstep(0.25, 0.6, fm * 2.1), kf = smoothstep(0.25, 0.6, fm * 4.7);
    float bg = n3(vec3(q0 * 0.03, 3.)) * .5 + n3(vec3(q0 * 0.085, 3.7)) * .3 + n3(vec3(q0 * 0.27, 4.4)) * .2;
    float ord = smoothstep(0.3, 0.7, n3(vec3(q0 * 0.06 + 4.1, 8.))), sz = smoothstep(0.3, 0.7, n3(vec3(q0 * 0.11 + 9.3, 2.2)));
    float wv = n3(vec3(q0 * 0.07, 5.)) * 11. + n3(vec3(q0 * 0.24, 5.5)) * 4.;
    float f0 = 0., f1 = 0.;
    for (int i = 0; i < 2 + uZ0; i++){
      vec2 q = q0 + su * (float(i) * 0.16);
      q += (vec2(n3(vec3(q * 0.45, 9.)), n3(vec3(q * 0.45 + 5.3, 9.4))) - .5) * 0.9;
      float rows = sin(q.y * 9.4 + wv) * (1. - kr);
      float c1 = mix(n3(vec3(q.x * 1.8 + 0.35 * rows, q.y * 2.1, 7.)), .5, kc), c2 = mix(n3(vec3(q * 4.7, 6.)), .5, kf);
      f1 = (c1 - .5) * (1.7 - 0.7 * sz) + (c2 - .5) * (0.35 + 0.75 * sz) + rows * (0.07 + 0.17 * ord) + min((bg - .5) * 2.3, 0.06) + (uC.x - .6) * .5;
      if (i == 0) f0 = f1;
    }
    d = smoothstep(-0.04, 0.5, f0);
    float sw = clamp((f0 - f1) * 2.2, -1., 1.);
    lit = mix(clamp(0.24 + 0.4 * (1. - smoothstep(0.1, 0.8, d)) + 0.36 * max(sw, 0.) + 0.08 * min(sw, 0.), 0., 1.), .5, kc);
    d *= mix(1., .6, kc) * smoothstep(0.03, 0.2, rd.y);
  }
#endif
  o = vec4(d, lit, 0., 1.);
}`,s0=we+Xe+`
out vec4 o;
uint hsh(uint x){ x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float nL(vec2 su, float f, float k){ float th = su.x * (TAU / 25.6), R = 25.6 * f / TAU; return n3(vec3(cos(th) * R, sin(th) * R + k, su.y * f + k * 1.7)); }
void main(){
  vec2 su = vec2(gl_FragCoord.x / 2048. * 25.6, gl_FragCoord.y / 256. * 2. - 1.);
  float u = su.y;
  float big = nL(su, 0.35, 3.), mid = nL(su, 1.1, 9.), f5 = n2(su * 5.), f20 = n2(su * 20. + 7.), f80 = n2(su * vec2(40., 80.) + 3.);
  float a = abs(u) - 0.625 + 0.07 * (mid - .5) + 0.03 * (f5 - .5);   // distance out from the wandering top edge
  vec2 q = vec2(su.x * 5., a * 11. + (u < 0. ? 0. : 37.)), ci = floor(q), cf = fract(q); float d1 = 8., d2 = 8., id = 0.;
  for (int k = 0; k < 9 + uZ0; k++){
    vec2 of = vec2(float(k % 3 - 1), float(k / 3 - 1));
    uint h = hsh(uint(int(mod(ci.x + of.x, 128.))) * 1973u ^ uint(int(ci.y + of.y) + 4096) * 9277u);
    vec2 r = of + vec2(float(h & 255u), float((h >> 8) & 255u)) / 255. * .8 + .1 - cf; float d = dot(r, r);
    if (d < d1){ d2 = d1; d1 = d; id = float(h >> 16) / 65535.; } else if (d < d2) d2 = d;
  }
  float st = smoothstep(0.0, 0.13, sqrt(d2) - sqrt(d1));   // 0 in the joints between stones
  float isSt = smoothstep(-0.15, -0.09, a), topm = 1. - isSt;
  float slope = clamp(1. - a / 0.2, 0., 1.);
  float h = 0.33 * (slope * slope * (3. - 2. * slope) * .35 + slope * .65);
  h += isSt * (0.03 * st - 0.012 + 0.03 * (fract(id * 3.7) - .5)) * smoothstep(0.26, 0.16, a);
  float gone = smoothstep(0.62, 0.75, nL(su, 0.5, 21.)) * isSt;
  h -= gone * 0.07 * slope;
  float path = smoothstep(0.42, 0.1, abs(u + 0.12 * (big - .5)));
  float peb = smoothstep(0.72, 0.8, f20) * topm;
  h += topm * (0.012 * (mid - .5) + 0.006 * (f5 - .5) * (1. - .6 * path) + 0.003 * (f20 - .5) - 0.008 * path) + 0.005 * peb;
  float cw = 0.03 + 0.1 * smoothstep(0.3, 0.8, nL(su, 0.8, 5.)) + 0.03 * (f5 - .5);
  float shelf = smoothstep(0.2 + cw, 0.17 + cw, a) * step(0.16, a);
  h = max(h, shelf * (0.012 + 0.01 * f20));
  float damp = smoothstep(0.35, 0.7, big * .6 + mid * .4);
  vec3 col = mix(vec3(0.46, 0.42, 0.36), vec3(0.27, 0.235, 0.195), damp * (1. - .5 * path)) * (0.9 + 0.2 * f20) * (0.92 + 0.16 * f80);
  col = mix(col, vec3(0.4, 0.37, 0.33) * (0.6 + 0.8 * f80), peb * .8);
  vec3 stc = mix(vec3(0.34, 0.31, 0.27), vec3(0.56, 0.51, 0.43), fract(id * 5.3)) * (0.85 + 0.3 * f20) * mix(0.5, 1., st);
  col = mix(col, stc, isSt * (1. - gone * .7));
  col = mix(col, vec3(0.13, 0.13, 0.09), smoothstep(0.14, 0.05, h) * step(0., a) * .7);
  float bl = smoothstep(0.5, 0.7, nL(su, 0.6, 13.) * .6 + f5 * .25 + f20 * .15) * topm * smoothstep(-0.62, -0.2, a) * .8;
  float crust = max(smoothstep(0.085, 0.045, h + 0.03 * (f5 - .5)) * step(0.02, a), shelf);
  col = mix(col, vec3(0.86, 0.83, 0.78) * (0.9 + 0.1 * f80), max(bl, crust * (0.75 + 0.25 * f20)));
  float tf = smoothstep(0.66, 0.74, nL(su, 2.2, 31.) * .7 + f5 * .3) * smoothstep(-0.32, -0.12, a) * smoothstep(0.06, -0.02, a);
  col = mix(col, mix(vec3(0.2, 0.19, 0.08), vec3(0.5, 0.42, 0.22), f80), tf * .85);
  h += tf * (0.02 + 0.05 * f80 * f20);
  o = vec4(sqrt(col), clamp(h / 0.55, 0., 1.));
}`,r0=we+Xe+`
in vec2 vUv;
out vec4 o;
uniform vec4 uU[26];
uniform sampler2D uSky; uniform sampler2D uCl; uniform sampler2D uPr; uniform sampler2D uD; uniform sampler2D uLut; uniform sampler2D uT0; uniform sampler2D uT1; uniform sampler2D uT2; uniform sampler2D uMp; uniform sampler2D uCm;
#define TT uU[0].w
#define KEYP uU[2].w
#define SUN uU[2].xyz
#define SUNC uU[3].rgb
#define SUNEL uU[4].x
#define SUNAZ uU[4].y
#define HD uU[11].x
#define SXX uU[9].x
#define SZZ uU[9].y
#define ZOFF uU[9].z
#define W0 uU[9].w
uint hsh(uint x){ x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float h01(int k, uint s){ return float(hsh(uint(k + 65536) ^ s) & 65535u) / 65535.; }
uint SXs(){ return uint(uU[10].x); } uint SZs(){ return uint(uU[10].y); }
// the dyke lines and widths along x and z, cell k at texel k + 2048 of a 2048 x 2 texture (baked in JS per mint)
uniform sampler2D uGr;
vec4 grid(int k){ int i = clamp(k + 2048, 0, 4095); return texelFetch(uGr, ivec2(i & 2047, i >> 11), 0); }
float lineX(int k){ return grid(k).x; }
float widX(int k){ return grid(k).y; }
float lineZ(int k){ return grid(k).z; }
float widZ(int k){ return grid(k).w; }
int cellX(float x){ int k = int(floor(x / SXX)); if (x < lineX(k)) k--; else if (x >= lineX(k + 1)) k++; return k; }
int cellZ(float z){ int k = int(floor((z - ZOFF) / SZZ - .5)); if (z < lineZ(k)) k--; else if (z >= lineZ(k + 1)) k++; return k; }
float SEAZ = 0.;   // lineZ(uU[10].w) - 3.5, set once at the top of main
float seaZ(){ return lineZ(int(uU[10].w)) - 3.5; }
float boxE(vec2 p, vec4 b){ vec2 c = (b.xy + b.zw) * .5, h = (b.zw - b.xy) * .5; vec2 q = abs(p - c) - h; return length(max(q, 0.)) + min(max(q.x, q.y), 0.); }
// signed distance outside the dykes (negative on a dyke), plus the cell; BXB is 1 where the nearest bank is a cross bund
float BXB = 0.;
float BL0, BL1, BW0, BW1;   // the last bandE's two long dyke lines and widths (the ruts read them too)
vec4 bandE(vec2 p){
  int kx = cellX(p.x), kz = cellZ(p.y);
  vec4 g0 = grid(kx), g1 = grid(kx + 1), g2 = grid(kz), g3 = grid(kz + 1);
  BL0 = g0.x; BW0 = g0.y; BL1 = g1.x; BW1 = g1.y;
  float ex = min(p.x - BL0 - BW0 * .5, BL1 - BW1 * .5 - p.x);
  float ez = min(p.y - g2.z - g2.w * .5, g3.z - g3.w * .5 - p.y);
  if (p.y < SEAZ + 3.5) ex = 1e3;
  float e = min(ex, ez); BXB = ez < ex ? 1. : 0.;
  e = min(e, boxE(p, uU[12]));
  if (uU[16].w > 0.) e = min(e, boxE(p, uU[13]));
  return vec4(e, float(kx), float(kz), min(abs(ex), abs(ez)));
}
#ifdef GND
vec3 GLX, GWX, GLZ, GWZ;   // the few dyke lines near the ray being marched
float GXB = 0.;            // 1 on a cross bund (the low dividers between pans)
float MH = 0.;             // 1 when the height-field march found the surface
vec2 GUV = vec2(0.);       // where the last dykeH looked in the dyke map
// the bank's height from the dyke map (baked once: along s, 25.6 m repeating; across u, -1..1 m from the centre line of
// a 1.25 m dyke, so each bank edge keeps its own side); cross bunds sit lower near the camera, pads use the top
float dykeH(vec2 p, float cr){
  vec3 ax = abs(p.x - GLX) - GWX * .5, az = abs(p.y - GLZ) - GWZ * .5;
  float exm = min(min(ax.x, ax.y), ax.z), ezm = min(min(az.x, az.y), az.z);
  float lx = exm == ax.x ? GLX.x : exm == ax.y ? GLX.y : GLX.z, lz = ezm == az.x ? GLZ.x : ezm == az.y ? GLZ.y : GLZ.z;
  bool xb = ezm < exm;
  float e = xb ? ezm : exm, s = xb ? p.x + lz * 5.17 : p.y + lx * 7.31;
  float u = ((xb ? p.y - lz : p.x - lx) < 0. ? -1. : 1.) * max(0.625 + e, 0.);
  float ep = boxE(p, uU[12]);
  if (uU[16].w > 0.) ep = min(ep, boxE(p, uU[13]));
  if (ep < e){ e = ep; xb = false; s = p.x + p.y * .37; u = e > -0.6 ? 0.625 + e : abs(mod(p.y, 0.9) - 0.45) - 0.225; }
  GXB = xb ? 1. : 0.;
  GUV = vec2(s / 25.6, u * .5 + .5);
  float h = e > 0.375 ? 0. : textureLod(uMp, GUV, 0.).a * 0.55 * (1. - 0.24 * GXB * cr);
  vec2 sl = uU[17].xy;
  if (abs(p.y - sl.y) < 2.5) h *= smoothstep(0.26, 0.33, abs(p.x - sl.x));   // the sluice cut
  return h;
}

#endif
// ---------- sky ----------
vec3 dec(vec3 c){ return uU[19].w > .5 ? c / max(1. - c, vec3(1e-3)) : c; }
vec3 skyRaw(vec2 uv){
  float k = KEYP, k0 = min(floor(k), 3.), f = k - k0;
  float v = clamp(uv.y, 0., 1.) * (127. / 128.) + .5 / 128.;
  vec3 a = textureLod(uSky, vec2(uv.x, (k0 + v) / 5.), 0.).rgb, b = textureLod(uSky, vec2(uv.x, (k0 + 1. + v) / 5.), 0.).rgb;
  return dec(mix(a, b, f));
}
vec3 lutC(float row, float elDeg){ vec3 v = textureLod(uLut, vec2(clamp((elDeg + 6.) / 12., 0., 1.) * (63. / 64.) + .5 / 64., (row + .5) / 2.), 0.).rgb; return v * v; }
uniform sampler2D uAm;
// the five sky samples of the ambient term (row 0: radiance, row 1: direction), drawn once per sun position by the env
// program (mode 2) instead of in every pixel of every pass
void ambInit(){}
vec3 ambN(vec3 n){  // irradiance / pi from five sky samples
  vec3 s = vec3(0.); float w = 0.;
  for (int i = 0; i < 5 + uZ0; i++){
    vec3 a = texelFetch(uAm, ivec2(i, 0), 0).rgb, d = texelFetch(uAm, ivec2(i, 1), 0).xyz;
    if (uU[19].w > .5){ a = a / max(1. - a, vec3(1e-3)); d = d * 2. - 1.; }
    float k = max(dot(n, d), 0.) + 0.12; s += a * k; w += k;
  }
  return s / w * (0.6 + 0.4 * max(n.y, 0.)) * 1.25 + vec3(0.0004, 0.0005, 0.0008);
}
float elOf(vec3 d){ return asin(clamp(d.y, -1., 1.)); }
const float HT = 7.0, R0 = 3.75, R1 = 3.45, RC = 3.62, HC = 3.1, HUB = 8.1, ZS = 3.95, SL = 6.7, SW = 1.75;
#ifdef ENVP
vec3 envAt(vec3 d, float wantSun){
  vec3 dd = normalize(vec3(d.x, max(d.y, 0.0005), d.z));
  vec2 uv = uvOf(dd);
  float az = uv.x * TAU, el = elOf(dd);
  vec3 col = skyRaw(uv);
  vec3 hor = skyRaw(vec2(uv.x, 0.06));
  // the cloud layer: two keyframes of the baked map cross-faded as it drifts, its fibres (cirrus) or ragged billows
  // (altocumulus) cut here at screen resolution in the layer's own drifting coordinates, lit by the sun that reaches
  // its height and distance
  vec2 cuv = vec2(uv.x, sqrt(uv.y));
  vec2 cl = mix(textureLod(uCl, cuv, 0.).rg, textureLod(uCm, cuv, 0.).rg, uU[24].x);
  float al = 0.;
  if (cl.r > 0.004){
    float hc = uU[24].y, X = hc * (12720. + hc), bb = 6360. * dd.y, tt = X / (bb + sqrt(bb * bb + X));
    vec2 w = dd.xz * tt, ww = vec2(uU[25].x * w.x - uU[25].y * w.y + uU[24].z, uU[25].y * w.x + uU[25].x * w.y);
    vec2 rh = dd.xz / max(length(dd.xz), 1e-4); rh = abs(vec2(uU[25].x * rh.x - uU[25].y * rh.y, uU[25].y * rh.x + uU[25].x * rh.y));
    float pa = 2. * uU[0].z / uU[22].y * tt, pq = pa * tt / hc, fx = rh.x * pq + rh.y * pa, fy = rh.y * pq + rh.x * pa;   // one pixel, km
    float mu = dot(dd, SUN); vec3 gr = vec3(0.);
    if (uU[25].z < .5){
      vec2 q = vec2(ww.x * 0.075, ww.y * 0.42) + uU[24].w;
      float nb = n3(vec3(q.x * 1.9 + 7.1, q.y * 0.35, 1.)), hk = smoothstep(0.5, 0.95, nb);
      q.y += n3(vec3(q.x * 0.7, q.y * 0.25, 1.)) * 1.6 + nb * .45 + hk * hk * 1.5;
      float fq = max(fy * 0.42, fx * 0.075 * (1. + 6. * hk));
      float fib = mix(n3(vec3(q.x * 5., q.y * 26., 3.)), .5, smoothstep(0.25, 0.6, fq * 26.)) * .6 + mix(n3(vec3(q.x * 11., q.y * 61., 8.)), .5, smoothstep(0.25, 0.6, fq * 61.)) * .4;
      al = cl.r * (0.16 + 1.24 * smoothstep(0.28, 0.72, fib)) * .88;
    } else {
      float det = mix(n3(vec3(ww * 7. + uU[24].w, 6.)), .5, smoothstep(0.25, 0.6, max(fx, fy) * 7.));
      al = smoothstep(0., 1., cl.r * (0.66 + 0.68 * det));
      gr = vec3(smoothstep(0.99, 0.9, mu), smoothstep(0.95, 0.72, mu), 1.);   // gold by the sun, salmon and pink further out, mauve-grey away from it
    }
    float dAz = az - SUNAZ;
    float elEff = (SUNEL + tt * cos(dAz) / 6360.) / 0.0174533;
    vec3 cs = lutC(0., elEff) * 22. * uU[22].z;
    cs = mix(cs, mix(cs * vec3(1.1, 0.96, 0.78), dot(cs, vec3(.3, .5, .2)) * mix(vec3(1.25, 0.66, 0.7), vec3(0.55, 0.47, 0.66), gr.y), gr.x), gr.z);
    float ph = 0.0796 * (1. - .49) / pow(1.49 - 1.4 * mu, 1.5) * .6 + 0.04;
    vec3 amb = skyRaw(vec2(0.5, 1.)) * 0.8 + hor * 0.4;
    vec3 cc = cs * ph * (uU[25].w + 1.1 * cl.g) + amb * (0.5 + 0.3 * cl.g);
    cc = mix(cc, col, (1. - exp(-tt / 110.)) * .5);   // far cloud takes the colour of the air in front of it
    al *= uU[4].w;
    col = mix(col, cc, al);
  }
  // sun disc, flattened by refraction low down
  if (wantSun > 0.){
    float da = az - SUNAZ; da = da - TAU * floor(da / TAU + .5);
    float fl = mix(0.8, 1., smoothstep(-0.005, 0.03, SUNEL));
    vec2 q = vec2(da * cos(el), (el - SUNEL) / fl) / 0.00465;
    float r2 = dot(q, q);
    if (r2 < 9.){
      vec3 sc = lutC(1., el / 0.0174533) * 22.;
      float limb = 1. - 0.45 * (1. - sqrt(max(1. - min(r2, 1.), 0.)));
      col += sc * (smoothstep(1.06, 0.94, sqrt(r2)) * limb * 14. + 0.25 * exp(-r2 * 0.8)) * (1. - 0.8 * al);
    }
  }
  // islands, hills, the town, the farm: silhouettes from the profile
  vec4 pr = textureLod(uPr, vec2(uv.x, .5), 0.);
  float hp = pr.r * 0.07;
  float edge = hp + 0.00025 * (n2(vec2(az * 2400., 3.)) - .5) * step(0.0004, hp);
  if (el < edge){
    vec3 amb = ambN(normalize(vec3(-dd.x, 0.3, -dd.z)));
    vec3 lc = pr.a > .5 ? lutC(1., SUNEL / 0.0174533 + 0.3) * 22. : vec3(0.);
    float lam = max(0., -dot(normalize(vec3(dd.x, 0., dd.z)), normalize(vec3(SUN.x, 0., SUN.z))));
    vec3 land = vec3(0.075, 0.07, 0.065) * (amb * 0.8 + lc * lam * 0.11 * smoothstep(0., 0.02, el + 0.01));
    float hz = pr.g * (1. - 0.4 * smoothstep(0., hp + 1e-4, el) * 0.);
    col = mix(land, hor, hz);
    // town lights at dusk on the mountain flank
    float dusk = smoothstep(-0.5, -3., SUNEL / 0.0174533);
    if (pr.b > 0. && dusk > 0.){
      vec2 g = vec2(az * 3000., el * 3000.); vec2 gi = floor(g), gf = fract(g) - .5;
      uint h = hsh(uint(int(gi.x) + 9000000) * 747u ^ uint(int(gi.y) + 4000) * 3203u);
      float lt = float(h & 1023u) / 1023. < 0.06 * pr.b ? exp(-dot(gf, gf) * 14.) : 0.;
      col += lt * dusk * vec3(1., .66, .3) * 0.12;
    }
  }
  // the farmhouse: a dark block with one lit window, far off inland
  vec4 fm = uU[20];
  float fa = az - fm.x; fa = fa - TAU * floor(fa / TAU + .5);
  if (abs(fa) < fm.z * 1.6 && el < fm.w * 1.5 + 0.0005){
    float roof = fm.w * (1.15 - 0.4 * abs(fa) / fm.z);
    if (abs(fa) < fm.z && el < roof){
      col = mix(vec3(0.05, 0.045, 0.045) * (ambN(vec3(0., .3, 1.)) * 1.2), hor, 0.25);
      vec2 wq = vec2((fa / fm.z - 0.3) / 0.12, (el / fm.w - 0.45) / 0.2);
      col += vec3(1., .62, .28) * uU[17].w * exp(-dot(wq, wq) * 2.) * 0.25;
    }
  }
  return col;
}
#endif
#if defined(OBJ) && !defined(ENVP) && !defined(NOMILL)
// ---------- the windmill ----------
float hitMill(vec3 ro, vec3 rd, vec4 M, float ang, out vec3 nn, out float mat, out vec3 lp){
  float sc = M.w, cy = cos(M.z), sy = sin(M.z), tb = 1e9;
  vec3 o = (ro - vec3(M.x, HD, M.y)) / sc;
  o.xz = vec2(cy * o.x - sy * o.z, sy * o.x + cy * o.z);
  vec3 d = rd; d.xz = vec2(cy * d.x - sy * d.z, sy * d.x + cy * d.z);
  vec3 oc = o - vec3(0., 7.4, 0.); float b = dot(oc, d), cc = dot(oc, oc) - 76.;
  if (b * b - cc < 0. || -b + sqrt(max(b * b - cc, 0.)) < 0.) return 1e9;
  // tower: a frustum
  float ya = HT * R0 / (R0 - R1), k2 = (R0 / ya) * (R0 / ya);
  float A = d.x * d.x + d.z * d.z - k2 * d.y * d.y, B = 2. * (o.x * d.x + o.z * d.z + k2 * (ya - o.y) * d.y), C = o.x * o.x + o.z * o.z - k2 * (ya - o.y) * (ya - o.y);
  float D = B * B - 4. * A * C;
  if (D > 0.){
    float sq = sqrt(D), t1 = (-B - sq) / (2. * A), t2 = (-B + sq) / (2. * A);
    float t = min(t1, t2); float y = o.y + d.y * t;
    if (t < 0. || y < 0. || y > HT){ t = max(t1, t2); y = o.y + d.y * t; }
    if (t > 0. && y >= 0. && y <= HT){ tb = t; vec3 p = o + d * t; nn = normalize(vec3(p.x, k2 * (ya - p.y), p.z)); mat = 3.; lp = p; }
  }
  // cap: a cone
  float yb = HT + HC, kc = (RC / HC) * (RC / HC);
  A = d.x * d.x + d.z * d.z - kc * d.y * d.y; B = 2. * (o.x * d.x + o.z * d.z + kc * (yb - o.y) * d.y); C = o.x * o.x + o.z * o.z - kc * (yb - o.y) * (yb - o.y);
  D = B * B - 4. * A * C;
  if (D > 0.){
    float sq = sqrt(D), t1 = (-B - sq) / (2. * A), t2 = (-B + sq) / (2. * A);
    float t = min(t1, t2); float y = o.y + d.y * t;
    if (t < 0. || y < HT - 0.05 || y > yb){ t = max(t1, t2); y = o.y + d.y * t; }
    if (t > 0. && t < tb && y >= HT - 0.05 && y <= yb){ tb = t; vec3 p = o + d * t; nn = normalize(vec3(p.x, kc * (yb - p.y), p.z)); mat = 4.; lp = p; }
  }
  // the windshaft and four sails in the plane z = ZS, hub at y = HUB: a whip (spar) with a lattice of bars on its trailing
  // side; canvas spread over the lattice, half spread (reefed) or furled into a roll along the whip
  if (abs(d.z) > 1e-4){
    float t = (ZS - o.z) / d.z;
    if (t > 0. && t < tb){
      vec3 p = o + d * t; vec2 s = vec2(p.x, p.y - HUB);
      float r = length(s);
      if (r < SL + 0.3){
        float fp = max(t * sc * uU[19].y * 0.45, 0.01);   // half a pixel, in metres: thin bars never vanish
        float th = atn(s.y, s.x) - ang;
        float si = mod(floor((th + PI * .25) / (PI * .5)), 4.);
        float thq = mod(th + PI * .25, PI * .5) - PI * .25;
        float a = r * cos(thq), bb = r * sin(thq);
        float cv = uU[7].w;
        float spread = cv > .9 ? (si == 3. ? 0. : 1.) : cv > .3 ? (mod(si, 2.) < .5 ? .5 : 0.) : 0.;
        float rolled = cv > .3 && spread == 0. ? 1. : 0.;
        float inF = step(1.0, a) * step(a, SL);
        float spar = step(abs(bb), max(0.1, fp)) * step(a, SL + 0.15);
        float inC = inF * step(0.05, bb) * step(bb, 0.05 + (SW - 0.05) * spread);
        float roll = inF * rolled * step(0.04, bb) * step(bb, 0.28);
        float lat = inF * step(0.05, bb) * step(bb, SW + fp) * max(step(abs(fract(a / 0.52) - .5) * 0.52, max(0.035, fp)), max(step(abs(bb - SW * .5), max(0.03, fp)), step(abs(bb - SW), max(0.04, fp))));
        float hubm = step(r, 0.5);
        if (spar + inC + lat + hubm + roll > 0.){
          tb = t; nn = vec3(0., 0., 1.); lp = vec3(a, bb, roll > 0. && inC == 0. ? -1. : r);
          mat = spar + hubm > 0. || (inC + roll == 0. && lat > 0.) ? 6. : 5.;
          if (mat == 5. && roll > 0.){ float u = (bb - 0.16) / 0.12; nn = vec3(0., 0., 1.) * sqrt(max(1. - u * u, 0.)) + vec3(-sin(ang + si * PI * .5), cos(ang + si * PI * .5), 0.) * u; }
        }
      }
    }
  }
  // the windshaft: a short horizontal cylinder from the cap to the hub
  {
    vec2 dq = o.xy - vec2(0., HUB); float A2 = dot(d.xy, d.xy), B2 = dot(dq, d.xy), C2 = dot(dq, dq) - 0.09;
    float D2 = B2 * B2 - A2 * C2;
    if (D2 > 0. && A2 > 1e-6){ float t = (-B2 - sqrt(D2)) / A2; float z = o.z + d.z * t; if (t > 0. && t < tb && z > 1.5 && z < ZS){ tb = t; vec3 p = o + d * t; nn = normalize(vec3(p.x, p.y - HUB, 0.)); mat = 6.; lp = vec3(0., 0., z); } }
  }
  if (tb < 1e8){ nn.xz = vec2(cy * nn.x + sy * nn.z, -sy * nn.x + cy * nn.z); }
  return tb * sc;
}
#endif
#if defined(OBJ) && !defined(ENVP) && !defined(NOHEAP)
// ---------- salt heaps ----------
float heapF(vec2 q, vec4 hp, float hh){
  // a conical heap of salt: a straight slope near the angle of repose, a rounded top, a foot that slumps out in lobes and
  // spreads in a concave toe, granular lumps, and rain runnels meandering straight down the flanks
  float r = length(q); vec2 dq = q / max(r, 1e-4);
  float lob = 1. + 0.3 * (n2(dq * 1.1 + hp.w) - .5) + 0.1 * (n2(dq * 2.9 + hp.w * 2.) - .5);
  float u = length(q / hp.z + 0.06 * vec2(cos(hp.w * 3.), sin(hp.w * 3.)) * (1. - min(r / hp.z, 1.))) / lob;
  float c = 1. - sqrt(u * u + 0.004);
  c = max(c, 0.1 * exp(-max(u - 0.86, 0.) * 7.)) - 0.004;
  float f = clamp(1. - u, 0., 1.);
  float run = n3(vec3(dq * 7. + hp.w, r * 0.12));
  return hh * c + min(f * 6., 1.) * (0.07 * (n2(q * 1.7) - .5) + 0.016 * (n2(q * 8.) - .5) - 0.03 * (1. - smoothstep(0., 0.035, abs(run - .5))) * smoothstep(0.2, 0.6, u));
}
float hitHeap(vec3 ro, vec3 rd, vec4 hp, float hh, out vec3 nn, out vec2 lq){
  vec3 bmin = vec3(hp.x - hp.z * 1.3, HD, hp.y - hp.z * 1.3), bmax = vec3(hp.x + hp.z * 1.3, HD + hh + .15, hp.y + hp.z * 1.3);
  vec3 iv = 1. / rd, ta = (bmin - ro) * iv, tb = (bmax - ro) * iv;
  vec3 tn = min(ta, tb), tf = max(ta, tb);
  float t0 = max(max(tn.x, tn.y), max(tn.z, 0.)), t1 = min(min(tf.x, tf.y), tf.z);
  if (t0 >= t1) return 1e9;
  float dt = (t1 - t0) / 22., t = t0, tp = t0, tm = 0., h0 = 0.;
  int ph = 0, k = 0; vec2 qc = vec2(0.); vec3 g = vec3(0., 1., 0.);
  for (int i = 0; i < 30 + uZ0; i++){
    vec2 q; float y = 0.;
    if (ph == 0){ t = t0 + dt * (float(i) + 1.); vec3 p = ro + rd * t; q = p.xz - hp.xy; y = p.y - HD; }
    else if (ph == 1){ tm = (t + tp) * .5; vec3 p = ro + rd * tm; q = p.xz - hp.xy; y = p.y - HD; }
    else q = qc + (k == 1 ? vec2(0.03, 0.) : k == 2 ? vec2(0., 0.03) : vec2(0.));
    float H = heapF(q, hp, hh);
    if (ph == 0){ if (y < H){ ph = 1; k = 0; } else { tp = t; if (t >= t1) break; } }
    else if (ph == 1){ if (y < H) t = tm; else tp = tm; k++; if (k == 5){ qc = (ro + rd * t).xz - hp.xy; ph = 2; k = 0; } }
    else { if (k == 0) h0 = H; else if (k == 1) g.x = -(H - h0) / 0.03; else { g.z = -(H - h0) / 0.03; break; } k++; }
  }
  if (ph != 2) return 1e9;
  nn = normalize(g); vec2 q = qc;
  lq = q;
  return t;
}

#endif
// ---------- tracing ----------
struct Hit { float t; float m; vec3 n; vec3 p; vec4 a; };
#ifdef ENVP
Hit trace(vec3 ro, vec3 rd, int bounce){ Hit h; h.t = 1e9; h.m = 0.; h.n = vec3(0., 1., 0.); h.p = vec3(0.); h.a = vec4(0.); return h; }
#elif defined(OBJ) || defined(GND)
Hit trace(vec3 ro, vec3 rd, int bounce){
  Hit h; h.t = 1e9; h.m = 0.; h.n = vec3(0., 1., 0.); h.p = vec3(0.); h.a = vec4(0.);
#ifdef OBJ
#ifndef NOMILL
  // mills (near and far, one call site)
  for (int i = 0; i < 2 + uZ0; i++){
    vec3 nn; float mt; vec3 lp;
    vec4 M = i == 0 ? uU[7] : uU[8]; M.w = i == 0 ? 1. : uU[8].w;
    float t = hitMill(ro, rd, vec4(M.xyz, M.w), i == 0 ? uU[6].z : uU[6].w, nn, mt, lp);
    if (t < h.t){ h.t = t; h.m = mt; h.n = nn; h.a = vec4(lp, float(i)); }
  }
#endif
#ifndef NOHEAP
  // heaps
  for (int i = 0; i < 2 + uZ0; i++){
    if (float(i) >= uU[16].w) break;
    vec3 nn; vec2 lq;
    vec4 hp = i == 0 ? uU[14] : uU[15];
    float hh = i == 0 ? uU[16].x : uU[16].y;
    float t = hitHeap(ro, rd, hp, hh, nn, lq);
    if (t < h.t){ h.t = t; h.m = 7.; h.n = nn; h.a = vec4(lq, hp.z, hp.w); }
  }
#endif
#endif
#ifdef GND
  // the sluice board
  for (int j = 0; j < 3 + uZ0; j++){
    vec2 sl = uU[17].xy; float px = j == 1 ? -0.36 : 0.36;
    vec3 bmin = j == 0 ? vec3(sl.x - 0.36, -0.06, sl.y - 0.025) : vec3(sl.x + px - 0.06, -0.06, sl.y - 0.1), bmax = j == 0 ? vec3(sl.x + 0.36, HD - 0.04, sl.y + 0.025) : vec3(sl.x + px + 0.06, HD + 0.2 + 0.05 * float(j), sl.y - 0.0);
    vec3 iv = 1. / rd, ta = (bmin - ro) * iv, tb = (bmax - ro) * iv;
    vec3 tn = min(ta, tb), tf = max(ta, tb);
    float t0 = max(max(tn.x, tn.y), tn.z), t1 = min(min(tf.x, tf.y), tf.z);
    if (t0 < t1 && t0 > 0. && t0 < h.t){
      h.t = t0; h.m = 6.; h.n = -sign(rd) * step(tn.yzx, tn.xyz) * step(tn.zxy, tn.xyz); h.a = vec4((ro + rd * t0) - vec3(sl.x, 0., sl.y), j == 0 ? 2. : 3.);
    }
  }
#endif
  // ground: the near height field under the feet, the analytic grid beyond
  float tg = 1e9; float gm = 0.; vec3 gn = vec3(0., 1., 0.);
#ifdef GND
  bool dn = rd.y < 0.;
#else
  bool dn = false;
#endif
  float tw = dn ? ro.y / -rd.y : 0., tq = dn ? (ro.y - HD) / -rd.y : 0.;
  vec3 q = ro + rd * tq;
  vec4 be = vec4(1e3), bw = vec4(1e3);
  if (dn) for (int j = 0; j < 2 + uZ0; j++){ if (j == 1 && !dn) break; vec4 v = bandE(j == 0 ? q.xz : (ro + rd * tw).xz); if (j == 0) be = v; else bw = v; }
#ifdef GND
  if (dn){
    if (be.x < 0.){ tg = tq; gm = 2.; }
    else {
      int kx = int(be.y), kz = int(be.z);
      vec4 gx = grid(rd.x > 0. ? kx + 1 : kx), gz = grid(rd.z > 0. ? kz + 1 : kz);
      float wx = gx.x - sign(rd.x) * gx.y * .5, wz = gz.z - sign(rd.z) * gz.w * .5;
      float tx = q.z < SEAZ + 3.5 ? 1e9 : (wx - q.x) / rd.x, tz = (wz - q.z) / rd.z;
      float ts = min(tx, tz);
      if (tq + ts < tw){ tg = tq + ts; gm = 2.; gn = tx < tz ? vec3(-sign(rd.x), 0., 0.) : vec3(0., 0., -sign(rd.z)); }
      else { tg = tw; gm = (ro.z + rd.z * tw) < SEAZ ? 9. : 1.; }
    }
    // near the feet and near any dyke edge: march the crumbly height field (march, bisect, then the normal: one call site)
    if (tw < 32. && (gm == 2. || be.x < 0.35 || bw.x < 0.35 || (abs(ro.z + rd.z * tw - uU[17].y) < 2.6 && abs(ro.x + rd.x * tw - uU[17].x) < 3.))){
      int kx = min(int(be.y), int(bw.y)), kz = min(int(be.z), int(bw.z));
      vec4 x0 = grid(kx), x1 = grid(kx + 1), x2 = grid(kx + 2), z0 = grid(kz), z1 = grid(kz + 1), z2 = grid(kz + 2);
      GLX = vec3(x0.x, x1.x, x2.x); GWX = vec3(x0.y, x1.y, x2.y);
      GLZ = vec3(z0.z, z1.z, z2.z); GWZ = vec3(z0.w, z1.w, z2.w);
      float t0 = max(0., (ro.y - HD - 0.05) / -rd.y), dt = (tw - t0) / 18., t = t0, tp = t0, tm = 0., h0 = 0.;
      int ph = 0, k = 0; vec3 pc = vec3(0.); vec3 gq = vec3(0., 1., 0.);
      for (int i = 0; i < 26 + uZ0; i++){
        vec2 xz; float y = 0.;
        if (ph == 0){ t = min(t + dt, tw); xz = ro.xz + rd.xz * t; y = ro.y + rd.y * t; }
        else if (ph == 1){ tm = (t + tp) * .5; xz = ro.xz + rd.xz * tm; y = ro.y + rd.y * tm; }
        else xz = pc.xz + (k == 1 ? vec2(0.012, 0.) : k == 2 ? vec2(0., 0.012) : vec2(0.));
        float cr = 1. - smoothstep(14., 30., length(xz - ro.xz));
        float H = dykeH(xz, cr);
        if (ph == 0){ if (y < H){ ph = 1; k = 0; } else { tp = t; if (t >= tw) break; } }
        else if (ph == 1){ if (y < H) t = tm; else tp = tm; k++; if (k == 5){ pc = ro + rd * t; ph = 2; k = 0; } }
        else { if (k == 0) h0 = H; else if (k == 1) gq.x = -(H - h0) / 0.012; else { gq.z = -(H - h0) / 0.012; break; } k++; }
      }
      if (ph == 2 && h0 > 0.006 && t < tw - 1e-4){ tg = t; gm = 2.; gn = normalize(gq); MH = 1.; }
      else { tg = tw; gm = 1.; }
    }
  }
#endif
  // pads (mill ground, harvest floor): boxes
#ifdef GND
  for (int i = 0; i < 2 + uZ0; i++){
    vec4 b = i == 0 ? uU[12] : uU[13];
    if (i == 1 && uU[16].w < 1.) break;
    vec3 bmin = vec3(b.x, -0.1, b.y), bmax = vec3(b.z, HD, b.w);
    vec3 iv = 1. / rd, ta = (bmin - ro) * iv, tb = (bmax - ro) * iv;
    vec3 tn = min(ta, tb), tf = max(ta, tb);
    float t0 = max(max(tn.x, tn.y), tn.z), t1 = min(min(tf.x, tf.y), tf.z);
    if (t0 < t1 && t0 > 0. && t0 < tg){ tg = t0; gm = 2.; gn = -sign(rd) * step(tn.yzx, tn.xyz) * step(tn.zxy, tn.xyz); }
  }
#endif
  if (tg < h.t){ h.t = tg; h.m = gm; h.n = gn; }
  h.p = ro + rd * h.t;
  return h;
}
#endif

#ifdef FIN
// ---------- water ----------
vec3 brine(float s, out vec3 sig){
  vec3 c0 = vec3(0.30, 0.38, 0.42), c1 = vec3(0.78, 0.62, 0.60), c2 = vec3(0.86, 0.46, 0.44), c3 = vec3(0.88, 0.40, 0.32), c4 = vec3(0.66, 0.16, 0.22);
  vec3 g0 = vec3(3., 1.6, 1.2), g1 = vec3(2., 5., 4.), g2 = vec3(2.5, 11., 9.), g3 = vec3(2.5, 14., 18.), g4 = vec3(4., 30., 24.);
  float x = clamp(s, 0., 1.) * 4.; vec3 c, g;
  if (x < 1.){ c = mix(c0, c1, x); g = mix(g0, g1, x); }
  else if (x < 2.){ c = mix(c1, c2, x - 1.); g = mix(g1, g2, x - 1.); }
  else if (x < 3.){ c = mix(c2, c3, x - 2.); g = mix(g2, g3, x - 2.); }
  else { c = mix(c3, c4, x - 3.); g = mix(g3, g4, x - 3.); }
  sig = g; return c;
}
// the pan's own walls seen in its mirror, traced at full resolution (a crumbling top edge, a wet foot, the salt line)
vec4 wallRefl(vec3 p, vec3 r, vec4 be){
  if (r.y <= 0.) return vec4(0.);
  int kx = int(be.y), kz = int(be.z);
  vec4 gx = grid(r.x > 0. ? kx + 1 : kx), gz = grid(r.z > 0. ? kz + 1 : kz);
  float wx = gx.x - sign(r.x) * (gx.y * .5 + 0.08), wz = gz.z - sign(r.z) * (gz.w * .5 + 0.08);
  float tx = (wx - p.x) / r.x, tz = (wz - p.z) / r.z, ts = max(min(tx, tz), 0.), y = r.y * ts;
  vec2 q = p.xz + r.xz * ts;
  if (y > HD - 0.03 - 0.06 * n2(q * 1.6) - 0.03 * n2(q * 5.)) return vec4(0.);
  vec3 wn = tx < tz ? vec3(-sign(r.x), 0., 0.) : vec3(0., 0., -sign(r.z));
  float nz = n2(q * 3. + y * 4.);
  vec3 alb = mix(vec3(0.25, 0.225, 0.2), vec3(0.37, 0.33, 0.29), nz) * mix(0.5, 1., smoothstep(0.03, 0.15, y + 0.04 * nz));
  alb = mix(alb, vec3(0.82, 0.8, 0.77), smoothstep(0.02, 0.035, y) * smoothstep(0.085, 0.055, y) * smoothstep(0.35, 0.6, n2(q * 2.2 + 7.)) * 0.8);
  return vec4(alb * (ambN(wn) + SUNC * max(dot(wn, SUN), 0.)), 1.);
}
float salOf(int kx, int kz){
  uint s = uint(uU[10].z);
  float a = h01(kx * 131 + kz * 977, s), bl = h01((kx >> 1) * 71 + (kz >> 1) * 313, s ^ 0x9e37u);
  return clamp(uU[11].y + uU[11].z * ((a - .5) * 0.8 + (bl - .5) * 0.6), 0., 1.);
}
vec2 ringSlope(vec2 p, float pix){
  vec2 sl = vec2(0.);
  for (int i = 0; i < 8 + uZ0; i++){
    if (float(i) >= uU[1].w) break;
    vec4 r = texelFetch(uD, ivec2(i, 0), 0), bx = texelFetch(uD, ivec2(i, 1), 0);
    if (p.x < bx.x || p.x > bx.y || p.y < bx.z || p.y > bx.w) continue;
    float age = TT - r.z;
    if (age < 0. || age > 9.) continue;
    for (int j = 0; j < 5 + uZ0; j++){
      vec2 sp = r.xy;
      if (j == 1) sp.x = 2. * bx.x - sp.x; else if (j == 2) sp.x = 2. * bx.y - sp.x; else if (j == 3) sp.y = 2. * bx.z - sp.y; else if (j == 4) sp.y = 2. * bx.w - sp.y;
      vec2 dv = p - sp; float rr = length(dv) + 1e-4;
      if (rr > age * 0.55 + 0.4) continue;
      // a capillary-gravity packet (short ripples run ahead) and a longer gravity swell behind
      float w = 0.09 + 0.12 * age, a1 = rr - 0.36 * age, a2 = rr - 0.46 * age;
      float g = 42. / max(1., 63. * pix) * exp(-a1 * a1 / (w * w)) * sin(42. * (rr - 0.38 * age)) + 16. / max(1., 30. * pix) * exp(-a2 * a2 / (w * w)) * sin(20. * (rr - 0.5 * age));
      sl += dv / rr * g * r.w * 0.004 * exp(-age * 0.45) / sqrt(rr + 0.15) * (j == 0 ? 1. : 0.75);
    }
  }
  return sl;
}
// ---------- sprites: the far flamingos, in pixels ----------
float sdSeg(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * h); }
float sdEl(vec2 p, vec2 r){ float k = length(p / r); return (k - 1.) * min(r.x, r.y); }
vec4 birdAt(vec2 q, float ty, float ph, float pxm){
  // q in metres, x forward, y up; returns albedo, coverage
  float aa = pxm;  // metres per pixel
  vec3 col = vec3(0.); float cov = 0.;
  { // flamingo, head down feeding or up
    float up = ty > 2.5 ? 1. : 0.;
    float d = sdEl(q - vec2(0., 0.), vec2(0.3, 0.13));
    vec2 n0 = vec2(0.22, 0.06), n1 = up > .5 ? vec2(0.33, 0.42) : vec2(0.42, -0.25 + 0.03 * sin(ph)), n2p = up > .5 ? vec2(0.28, 0.72) : vec2(0.34, -0.86 + 0.03 * sin(ph * 1.3));
    float dn = min(sdSeg(q, n0, n1), sdSeg(q, n1, n2p)) - 0.03;
    float dh = length(q - n2p) - 0.05;
    float l1 = sdSeg(q, vec2(0.02, -0.08), vec2(0.03, -0.95)) - 0.014;
    float kn = 0.15 * sin(ph * 0.5);
    float l2 = min(sdSeg(q, vec2(-0.03, -0.08), vec2(-0.06 + kn, -0.5)), sdSeg(q, vec2(-0.06 + kn, -0.5), vec2(-0.03, -0.95))) - 0.014;
    float m = min(min(d, dn), min(dh, min(l1, l2)));
    cov = clamp(0.5 - m / aa, 0., 1.);
    col = vec3(0.96, 0.62, 0.64);
    if (d < 0. && q.y > 0.0 && q.x < 0.1) col = vec3(0.95, 0.42, 0.45);
    if (d < 0. && q.x < -0.22) col = vec3(0.08, 0.05, 0.05);
    if (l1 < 0.006 || l2 < 0.006) col = vec3(0.9, 0.42, 0.45);
    if (dh < 0.01 && q.x > n2p.x) col = vec3(0.1);
  }
  return vec4(col, cov);
}

#endif
#ifndef FIN
void main(){
  vec2 fc = gl_FragCoord.xy; float SZ = uU[19].z;
#ifdef OBJ
  if (uU[22].x > .5){ fc *= uU[19].z / uU[22].y; }
#endif
  float yaw = uU[0].x, pitch = uU[0].y, tanH = uU[0].z;
  vec3 fw = vec3(sin(yaw) * cos(pitch), sin(pitch), cos(yaw) * cos(pitch)), rt = vec3(cos(yaw), 0., -sin(yaw));
  vec3 up = cross(fw, rt);
  vec2 qd = fc / SZ * 2. - 1.;
  vec3 rd0 = normalize(fw + (qd.x * rt + qd.y * up) * tanH);
  vec3 eye = vec3(uU[1].x, uU[1].y, uU[1].z);
  float pix = uU[19].y;   // radians per pixel
  vec3 sunc = SUNC;
  vec3 thr = vec3(1.);
  vec3 hazeC = vec3(0.);
#ifdef GND
  SEAZ = seaZ();
  hazeC = skyRaw(uvOf(normalize(vec3(rd0.x, 0.004, rd0.z))));
#endif
#ifdef ENVP
  if (uU[22].x > 1.5){
    int i = int(gl_FragCoord.x); vec2 sh = normalize(SUN.xz);
    vec2 h = i == 0 ? sh : i == 1 ? -sh : i == 2 ? vec2(-sh.y, sh.x) : vec2(sh.y, -sh.x);
    vec3 d = i == 4 ? vec3(0., 1., 0.) : normalize(vec3(h.x, 0.3, h.y));
    bool r0 = gl_FragCoord.y < 1.; vec3 v = r0 ? skyRaw(uvOf(d)) : d;
    o = vec4(uU[19].w < .5 ? v : r0 ? v / (1. + v) : v * .5 + .5, 1.); return;
  }
#endif
#ifdef OBJ
  int mode = int(uU[22].x);
  if (mode == 1 && rd0.y > 0.08){ o = vec4(0.); return; }
  vec3 ro = eye, rd = rd0;
  if (mode == 1){ float tw = eye.y / max(-rd0.y, 1e-4); ro = rd0.y < -1e-4 ? vec3(eye.x + rd0.x * tw, 0.001, eye.z + rd0.z * tw) : vec3(eye.x, 0.001, eye.z); rd = normalize(vec3(rd0.x, max(abs(rd0.y), 0.0008), rd0.z)); }
  float tPre = length(ro - eye);
  vec3 acc = vec3(0.); float dep = 1e9;
#else
  float tObj = 1e9;
  vec3 acc = vec3(0.); vec3 ro = eye, rd = rd0;
  float tPrim = tObj, mPrim = 0., Fw = 0., tPre = 0.; vec2 wsl = vec2(0.);
  if (rd0.y < 0.)
#endif
  switch (uZ0){ default:   // one pass (break leaves it); a switch, not a loop: FXC compiles it much faster
#ifdef OBJ
    Hit h = trace(ro, rd, mode);
    dep = h.t;
    if (h.m == 0.){
#ifdef ENVP
      dep = mode == 0 && rd.y < 0. ? 1e9 : 6e4; if (mode == 1 || rd.y > -0.002) acc = envAt(rd, mode == 0 ? 1. : 0.); break;
#else
      discard;
#endif
    }
#ifndef ENVP
    hazeC = skyRaw(uvOf(normalize(vec3(rd0.x, 0.004, rd0.z))));
#endif
#else
    Hit h = trace(ro, rd, 0);
    if (h.t >= tObj) break;
    tPrim = h.t; mPrim = h.m;
#endif
#ifndef ENVP
    vec3 p = h.p, n = h.n, col = vec3(0.);
#ifdef GND
    vec4 beS = bandE(p.xz);
#endif
    float tt = h.t + tPre;
    float pf = tt * pix; // metres per pixel at the hit
    // the mill's shadow on the ground (a column toward the sun)
    float shM = 1.;
    {
      vec2 mp = uU[7].xy; vec2 sd = normalize(SUN.xz); vec2 dv = mp - p.xz; float al = dot(dv, sd);
      float hs = p.y + al * SUN.y / max(length(SUN.xz), 1e-3);
      if (al > 0. && length(dv - sd * al) < R0 - 0.1 * max(hs - HD, 0.) / HT && hs < HD + HT + HC * .6) shM = 0.;
    }
#ifdef GND
    if (h.m == 1. || h.m == 9.){ acc = vec3(0.); mPrim = 1.; break; }   // water: shaded in the last pass
#endif
    // solid materials: albedo, shading normal, glow; one lighting call
    vec3 alb = vec3(0.5), nb = n, emit = vec3(0.); float ao = 1., glint = 0., wat = 0., wetS = 0.;
    if (dot(nb, rd) > 0. && h.m >= 5.) nb = -nb;
    vec3 lp = h.a.xyz;
    if (h.m == 2.){
#ifdef GND
      // dykes and pads: packed mud, rubble facing, salt crust and dry weeds all come from the dyke map; a grain finer
      // than its texels near the feet
      float near = 1. - smoothstep(5., 30., tt);
      bool top = n.y > .6;
      vec2 muv = MH > .5 ? GUV : vec2((BXB > .5 ? p.x : p.z) / 25.6, (0.625 + (top ? max(beS.x, -0.6) : 0.2 * (1. - p.y / HD))) * .5 + .5);
      vec4 mp = textureLod(uMp, muv, max(log2(pf / max(-dot(rd, n), 0.12) / 0.0125), 0.));
      alb = mp.rgb * mp.rgb;
      float fine = 1. - smoothstep(2., 9., tt);
      alb *= 1. + (n3(p * 61.) * .6 + n3(p * 173.) * .4 - .5) * 0.45 * fine;
      vec3 bq = p * 43.;
      nb = normalize(nb + vec3(n3(bq) - .5, 0., n3(bq + 9.1) - .5) * 0.22 * fine);
      float salt = smoothstep(0.5, 0.72, min(alb.r, alb.b * 1.2));
      wetS = MH > .5 ? smoothstep(0.09, 0.02, p.y) * (1. - salt) : 0.;
      ao *= mix(0.6, 1., smoothstep(0.0, HD, p.y));
      ao *= mix(0.45, 1., smoothstep(R0 - 0.1, R0 + 1.6, length(p.xz - uU[7].xy)));
      if (uU[16].w > 0.){ ao *= mix(0.55, 1., smoothstep(-0.1, 1.4, min(length(p.xz - uU[14].xy) - uU[14].z, length(p.xz - uU[15].xy) - uU[15].z))); }
      glint = near * salt * 0.35;
      emit += vec3(1., .82, .66) * sunc * 0.05 * salt * shM;   // light glowing through the crystal crust
#endif
#if defined(OBJ) && !defined(NOMILL)
    } else if (h.m == 3. || h.m == 4.){
      float thA = atn(lp.x, lp.z);
      vec3 nz = vec3(n3(vec3(thA * 3., lp.y * 0.9, 1.)), n3(vec3(thA * 14., lp.y * 4., 2.)), n3(vec3(thA * 30., lp.y * 9., 4.)));
      if (h.m == 3.){
        // limestone in rough courses under a worn whitewash skin; a door and a small window
        float row = floor(lp.y / 0.34 + 0.25 * nz.x), bx = thA * R0 / (0.5 + 0.3 * h01(int(row), 4u)) + row * 0.5 + 0.4 * h01(int(row), 3u);
        vec2 bf = vec2(fract(bx), fract(lp.y / 0.34));
        float mort = min(min(bf.x, 1. - bf.x) * 1.24, min(bf.y, 1. - bf.y) * 0.68);
        float ws = smoothstep(0.42, 0.6, nz.x * .7 + nz.y * .3);
        alb = mix(vec3(0.58, 0.52, 0.43), vec3(0.72, 0.66, 0.55), h01(int(row) * 977 + int(floor(bx)), 9u)) * (0.85 + 0.25 * nz.z);
        alb = mix(alb, vec3(0.70, 0.67, 0.62), ws * 0.6) * mix(0.78, 1., smoothstep(0.0, 0.025, mort) * (1. - ws * 0.6) + ws * 0.6);
        alb *= (1. - 0.25 * smoothstep(0.55, 0.8, nz.y) * smoothstep(HT, HT - 3., lp.y)) * mix(0.7, 1., smoothstep(0., 0.8, lp.y));
        nb = normalize(n + 0.25 * (1. - ws) * vec3(0., 1., 0.) * (smoothstep(0.035, 0.0, mort) - 0.3));
        vec2 dw = vec2(thA - 2.4, thA - 1.2); dw = (dw - TAU * floor(dw / TAU + .5)) * R0;
        if (abs(dw.x) < 0.55 && lp.y < 2.05) alb = vec3(0.12, 0.08, 0.06) * (0.7 + 0.3 * nz.z);
        if (abs(dw.y) < 0.28 && abs(lp.y - 4.6) < 0.38) alb = vec3(0.05, 0.04, 0.035);
      } else {
        // the cap: weathered vertical boards
        float bd = thA * RC / 0.16;
        alb = mix(vec3(0.20, 0.15, 0.11), vec3(0.32, 0.25, 0.18), h01(int(floor(bd)) + 4000, 5u)) * (0.75 + 0.25 * smoothstep(0., 0.1, min(fract(bd), 1. - fract(bd)))) * (0.8 + 0.3 * nz.y);
      }
      ao = 0.42;   // seen against the light: the sky behind the camera barely fills it in
      emit += alb * sunc * 0.6 * pow(1. - abs(dot(n, rd)), 3.) * smoothstep(-0.6, 0.2, dot(n, SUN));
    } else if (h.m == 5.){
      // canvas: grey-white, stained, translucent against the low sun, the lattice dark through it
      float pat = 0.85 + 0.15 * n3(vec3(lp.x * 3., lp.y * 3., 5.));
      ao = 0.6;
      if (lp.z < 0.){
        // canvas furled round the whip: a lumpy roll with its lashings
        float tie = step(abs(fract(lp.x / 0.9) - .5), 0.05);
        alb = vec3(0.72, 0.68, 0.6) * (0.8 + 0.25 * n3(vec3(lp.x * 9., lp.y * 20., 3.))) * (1. - 0.55 * tie);
      } else {
        float la = max(step(abs(fract(lp.x / 0.52) - .5), 0.07), step(abs(lp.y - SW * .5), 0.04));
        alb = vec3(0.88, 0.85, 0.78) * pat * (1. - 0.1 * la) * mix(0.85, 1., smoothstep(0., .4, lp.y));
        emit = vec3(1., .84, .62) * sunc * max(-dot(nb, SUN), 0.) * 0.45 * pat * (1. - 0.45 * la);
      }
#endif
    } else if (h.m == 6.){
#ifdef GND
      {
        // the sluice: weathered vertical planks between two posts, dark and green with weed at the waterline
        float pl = (lp.x + 0.36) / 0.18, seam = h.a.w > 2.5 ? 1. : smoothstep(0.0, 0.08, min(fract(pl), 1. - fract(pl)));
        alb = mix(vec3(0.27, 0.22, 0.17), vec3(0.4, 0.35, 0.28), h01(int(floor(pl)) + 70 * int(h.a.w), 7u)) * (0.75 + 0.35 * n3(vec3(lp.x * 40., lp.y * 3., lp.z * 40.)));
        alb *= mix(0.35, 1., seam) * mix(0.45, 1., smoothstep(0.02, 0.12, lp.y));
        alb = mix(alb, vec3(0.12, 0.16, 0.08), smoothstep(0.08, 0.0, abs(lp.y - 0.02)) * 0.6);
      }
#else
      alb = vec3(0.22, 0.17, 0.12) * (0.8 + 0.3 * n3(vec3(lp.x * 9., lp.y * 2., 3.)));
#endif
#if defined(OBJ) && !defined(NOHEAP)
    } else {
      // salt heap: white grains with a grey-buff rain crust, runnels down the flanks, a dirty foot; part of it under curved
      // coppi laid in channels down the slope, each channel's courses offset, tiles missing and displaced here and there
      vec2 lq = h.a.xy; float Rb = h.a.z, hy = h.p.y - HD, r = length(lq);
      vec2 dq = lq / max(r, 1e-4);
      float u = r / Rb, th = atn(dq.y, dq.x);
      vec3 nz = vec3(n2(lq * 2.1), n2(lq * 9.), n3(vec3(dq * 7. + h.a.w, r * 0.12)));
      float side = cos(th - h.a.w) - cos(PI * clamp(uU[16].z, 0., 1.)) + 0.25 * (nz.x - .5);
      float sl = (1. - u) * Rb * 1.2;                       // distance up the slope from the foot
      float ci = floor(th * Rb / 0.24), cj = sl / 0.42 + h01(int(ci) + 700, 33u);
      float tj = floor(cj), tf = fract(cj), fz = fract(th * Rb / 0.24) - .5, conv = mod(ci, 2.) < 1. ? 1. : -1.;
      float th2 = h01(int(ci) * 733 + int(tj), 21u);
      bool tile = (uU[16].z > 1. || side > 0.) && u > 0.1 && u < 0.97 && th2 > 0.06 && (conv > 0. || abs(fz) < 0.42);
      if (tile){
        float tilt = (h01(int(ci) * 97 + int(tj), 37u) - .5) * 0.5;
        nb = normalize(n + cross(n, vec3(-dq.y, 0., dq.x)) * (conv * fz * 1.3 + tilt) + vec3(dq.x, 0., dq.y) * smoothstep(0.75, 1., tf) * 0.5);
        alb = mix(vec3(0.5, 0.27, 0.17), vec3(0.68, 0.4, 0.26), th2) * (conv > 0. ? 1. : 0.84) * (th2 > 0.9 ? 0.72 : 1.);
        alb = mix(alb, vec3(0.8, 0.77, 0.72), smoothstep(0.55, 0.9, nz.x) * 0.5 + smoothstep(0.8, 1., tf) * 0.3) * (0.82 + 0.3 * nz.y);
        alb *= mix(0.55, 1., smoothstep(0.5, 0.38, abs(fz)) * smoothstep(0.0, 0.08, tf));
        ao = 0.85;
      } else {
        vec2 gb = vec2(n2(lq * 7.3) - .5, n2(lq * 7.3 + 5.) - .5) + 0.5 * vec2(n2(lq * 23.) - .5, n2(lq * 23. + 7.) - .5);
        float crust = smoothstep(0.42, 0.7, nz.x * .75 + nz.y * .25) * smoothstep(0.95, 0.5, u);
        float run = 1. - smoothstep(0., 0.04, abs(nz.z - .5));
        nb = normalize(n + vec3(gb.x, 0., gb.y) * mix(0.55, 0.2, crust));
        alb = vec3(0.94, 0.93, 0.91) * (0.9 + 0.1 * nz.y);
        alb = mix(alb, vec3(0.72, 0.69, 0.63) * (0.9 + 0.2 * nz.y), crust * 0.75);
        alb = mix(alb, vec3(0.62, 0.6, 0.58), run * smoothstep(0.15, 0.45, u) * 0.3 + smoothstep(0.35, 0.0, hy) * 0.55);
        if (side > 0. && side < 0.12 && u > 0.1) alb *= 0.72;
        ao = mix(0.7, 1., smoothstep(0.0, 0.3, hy)) * (1. - 0.25 * run);
        glint = (1. - crust) * (1. - smoothstep(10., 60., tt));
      }
#endif
    }
    col = alb * (ambN(nb) * ao + sunc * max(dot(nb, SUN), 0.) * shM) + emit;
#ifdef GND
    if (h.m == 2.) col += alb * ao * sunc * (0.04 + 0.04 * max(-nb.y, 0.)) * (0.6 - 0.4 * nb.y) * vec3(1., .78, .72);   // warm bounce off the lit pans and mud
#endif
    if (glint > 0.){
      uint gh = hsh(uint(int(floor(p.x * 80.)) + 900000) * 1597u ^ uint(int(floor(p.z * 80.)) + 900000) * 51749u ^ uint(int(floor(p.y * 80.)) + 9000) * 7919u);
      col += sunc * 0.7 * glint * step(0.996, float(gh & 4095u) / 4095.) * max(dot(reflect(rd, nb), SUN), 0.);
    }
#ifdef GND
    // thin water in ruts and prints, and the wet foot of the bank: they mirror the sky
    if (max(wat, wetS) > 0.){
      vec3 nn = wat > 0. ? vec3(0., 1., 0.) : nb, rr = reflect(rd, nn);
      float F = 0.02 + 0.98 * pow(1. - max(dot(-rd, nn), 0.), 5.);
      vec3 sk = skyRaw(uvOf(normalize(vec3(rr.x, max(rr.y, 0.004), rr.z))));
      col = wat > 0. ? mix(col, col * 0.3 * (1. - F) + sk * min(0.06 + 1.3 * F, 1.), wat) : col + sk * F * wetS * 0.5;
    }
#endif
    acc = col;
#endif
    break;
  }
#ifdef OBJ
  if (dep < 1e4) acc = mix(acc, hazeC, 1. - exp(-(dep + tPre) / mix(5200., 1400., uU[21].x)));
  o = vec4(uU[19].w > .5 ? acc / (1. + acc) : acc, dep < 1e8 ? dep / (dep + 30.) : 1.);
#else
  if (mPrim != 0.) acc = mix(acc, hazeC, 1. - exp(-tPrim / mix(5200., 1400., uU[21].x)));
  float dc = tPrim > 1e8 ? 1. : tPrim / (tPrim + 30.);
  // (half float: the distance itself, negative on water; 8-bit targets keep a depth code)
  o = uU[19].w > .5 ? vec4(acc / (1. + acc), (mPrim == 1. ? 0. : 0.5) + 0.4995 * dc) : vec4(acc, (mPrim == 1. ? -1. : 1.) * clamp(tPrim, 0.01, 6e4));
#endif
}
#endif
#ifdef FIN
// the last pass: birds over the scene and in its mirrors, the lens glare, the grade and the tone map
void main(){
  SEAZ = seaZ();
  vec2 fc = gl_FragCoord.xy; float SZ = uU[19].z;
  float yaw = uU[0].x, pitch = uU[0].y, tanH = uU[0].z;
  vec3 fw = vec3(sin(yaw) * cos(pitch), sin(pitch), cos(yaw) * cos(pitch)), rt = vec3(cos(yaw), 0., -sin(yaw));
  vec3 up = cross(fw, rt);
  vec2 qd = fc / SZ * 2. - 1.;
  vec3 rd0 = normalize(fw + (qd.x * rt + qd.y * up) * tanH);
  vec3 sunc = SUNC;
  // the cached ground layer, or the objects and sky (drawn this frame) where they are nearer
  vec4 G = texelFetch(uT2, ivec2(fc), 0), T0 = texelFetch(uT0, ivec2(fc), 0);
  float tObj = T0.a > 0.99975 ? 1e9 : 30. * T0.a / max(1. - T0.a, 1e-4);
  bool wat; float tPrim;
  if (uU[19].w > .5){ wat = G.a < 0.5; float dc = (G.a - (wat ? 0. : 0.5)) / 0.4995; tPrim = dc > 0.996 ? 1e9 : 30. * dc / max(1. - dc, 1e-4); }
  else { wat = G.a < 0.; tPrim = abs(G.a) > 5e4 ? 1e9 : abs(G.a); }
  if (tPrim >= tObj){ G.rgb = T0.rgb; wat = false; tPrim = tObj; }
  vec3 acc = dec(G.rgb);
  float Fw = 0.;
  vec3 hazeC = skyRaw(uvOf(normalize(vec3(rd0.x, 0.004, rd0.z))));
  vec2 wsl = vec2(0.);
  if (wat){
    float tw = uU[1].y / max(-rd0.y, 1e-5), pix = uU[19].y, pf = tw * pix;
    vec3 rd = rd0, p = vec3(uU[1].x + rd0.x * tw, 0., uU[1].z + rd0.z * tw), col;
    vec4 beS = bandE(p.xz);
      float shM = 1.;
    {
      vec2 mp = uU[7].xy; vec2 sd = normalize(SUN.xz); vec2 dv = mp - p.xz; float al = dot(dv, sd);
      float hs = p.y + al * SUN.y / max(length(SUN.xz), 1e-3);
      if (al > 0. && length(dv - sd * al) < R0 - 0.1 * max(hs - HD, 0.) / HT && hs < HD + HT + HC * .6) shM = 0.;
    }
      // water: wind ripples (calm in the lee of the walls), cat's paws, pebble rings
      vec4 be = beS;
      bool sea = p.z < SEAZ;
      float lee = smoothstep(0.2, 3.5, be.w);
      vec2 wd = uU[5].xy;
      vec2 cq = p.xz - uU[6].xy;
      float paw = uU[5].w * smoothstep(0.5, 0.78, n2(vec2(dot(cq, wd) * 0.05, dot(cq, vec2(-wd.y, wd.x)) * 0.12) + 3.1)) * 1.4;
      // riffle patches: gusts roughen drifting patches of a pan even on a still evening
      float rif = sea ? 0. : smoothstep(0.52, 0.74, n2(p.xz * 0.085 + wd * TT * 0.04 + 13.) * .7 + n2(p.xz * 0.33 + 5.) * .3);
      float wl = (uU[5].z * (0.35 + 0.65 * n2(p.xz * 0.045 + wd * TT * 0.25)) + paw + 1.1 * rif) * (sea ? 2.5 : lee);
      float amp = wl * 0.05 / (1. + pf * 45.);
      vec2 sl = vec2(0.);
      if (amp > 1e-4){
        vec3 q = vec3(p.x * 6.5 - wd.x * TT * 3., p.z * 6.5 - wd.y * TT * 3., TT * 0.9);
        float e0 = n3(q), ex = n3(q + vec3(0.12, 0., 0.)), ez = n3(q + vec3(0., 0.12, 0.));
        vec3 q2 = vec3(dot(p.xz, vec2(1.7, 1.1)) * 7.5, dot(p.xz, vec2(-1.1, 1.7)) * 7.5, TT * 1.6);
        float f0 = n3(q2), fx = n3(q2 + vec3(0.12, 0., 0.)), fz = n3(q2 + vec3(0., 0.12, 0.));
        sl = amp * (vec2(ex - e0, ez - e0) / 0.12 * 0.32 + vec2(fx - f0, fz - f0) / 0.12 * 0.18 / (1. + pf * 40.));
      }
#ifndef LITE
      if (!sea) sl += ringSlope(p.xz, pf);
#endif
      wsl = sl;
      vec3 nw = normalize(vec3(-sl.x, 1., -sl.y));
      float ci = max(dot(-rd, nw), 0.);
      float F = 0.02 + 0.98 * pow(1. - ci, 5.);
      // what lies under the brine
      int kx = int(be.y), kz = int(be.z);
      float s = sea ? 0. : salOf(kx, kz);
      float shal = sea ? 0. : 1. - smoothstep(0.1, 1.7, be.w + 0.7 * (n2(p.xz * 0.21 + 6.) - .5));   // shallow margins, deeper middle
      if (!sea) s = clamp(s + 0.1 * (n2(p.xz * 0.06 + float(kx) * 3.1) - .5) + 0.06 * (n2(p.xz * 0.37) - .5) + 0.2 * shal, 0., 1.);   // zones within a pan, pinker where shallow
      vec3 sig; vec3 body = brine(s, sig);
      if (uU[11].w > .5) body = mix(body, vec3(0.62, 0.1, 0.12), 0.5);
      float dep = sea ? 3. : (0.05 + 0.18 * (1. - s) * h01(kx * 31 + kz * 7, 11u)) * mix(1.4, 0.35, shal);
      float ct = sqrt(1. - (1. - ci * ci) / 1.8);
      vec3 Tr = exp(-sig * dep * (1. + 1. / max(ct, 0.1)));
      vec3 aUp = ambN(vec3(0., 1., 0.));
      vec3 light = aUp + sunc * max(SUN.y, 0.) * shM;
      float bt = n2(p.xz * 2.1) * .6 + n2(p.xz * 9.) * .4;
      vec3 bottom = mix(vec3(0.24, 0.22, 0.2), vec3(0.42, 0.38, 0.34), bt);
      bottom *= mix(vec3(1.), vec3(0.8, 0.7, 0.66), smoothstep(0.5, 0.72, n2(p.xz * 0.33 + 9.)));   // algal mats
      float net = max(1. - abs(2. * n2(p.xz * 2.3 + 4.) - 1.), 1. - abs(2. * n2(p.xz * 3.7 + 21.) - 1.));   // gypsum ridges on the floor
      bottom = mix(bottom, vec3(0.7, 0.68, 0.64), smoothstep(0.9, 0.97, net) * 0.3 * smoothstep(0.45, 0.65, n2(p.xz * 0.5 + 2.)) * (1. - smoothstep(0.015, 0.05, pf)));
      bottom = mix(bottom, vec3(0.86, 0.84, 0.82) * vec3(1., .93, .93), smoothstep(0.6, 0.95, s));  // crystal floors
      vec3 under = light * (bottom * Tr + body * 1.3 * (1. - Tr));
      if (sea){ under = light * vec3(0.02, 0.05, 0.07); F = max(F, 0.2); }
      // salt crust at the edges of the saltiest pans, and floating rafts of salt
      float crust = 0.;
      if (!sea && s > 0.62){
        float cn = n2(p.xz * 1.3) * .6 + n2(p.xz * 6.) * .4;
        crust = smoothstep(0.45, 0.1, be.w - (s - 0.62) * 3. * cn) * smoothstep(0.62, 0.8, s);
        crust = max(crust, smoothstep(0.78, 0.84, n2(p.xz * 0.9 + 4.) * .7 + n2(p.xz * 5.5) * .3) * smoothstep(0.8, 0.95, s) * 0.8);
      }
      if (!sea){
        // a broken scum of salt floating against the banks, and small rafts drifting out on the open brine
        float sb = n2(p.xz * 4.1) * .6 + n2(p.xz * 13.) * .4;
        float edgeC = smoothstep(0.32, 0.06, be.w - 0.3 * n2(p.xz * 0.9 + 1.)) * smoothstep(0.42, 0.6, sb) * (0.55 + 0.45 * s);
        float raft = smoothstep(0.79, 0.85, n2(p.xz * 1.7 + 2.) * .65 + sb * .35) * smoothstep(0.6, 2.5, be.w) * 0.7 * (1. - smoothstep(0.02, 0.08, pf));
        crust = max(crust, max(edgeC, raft) * (1. - smoothstep(0.03, 0.12, pf)));
      }
      vec3 cr = vec3(0.9, 0.88, 0.86) * (aUp * 1.05 + sunc * max(SUN.y + 0.08, 0.) * shM * 0.6);
      // the sun's glitter: a lobe over the ripple slopes still unresolved at this distance
      vec3 hv = normalize(SUN - rd);
      float sg = 0.003 + wl * 0.07 + min(pf, 0.5) * 0.01;
      float nh = max(dot(nw, hv), 0.), tn2 = (1. - nh * nh) / max(nh * nh, 1e-4);
      float Dm = exp(-tn2 / (sg * sg)) / (PI * sg * sg * nh * nh * nh * nh);
      vec3 spec = sunc * Dm * F * 2.4e-4 * 0.25 / max(ci, 0.05) * shM * step(0., SUN.y + 0.006);
      col = mix((1. - F) * under + spec, cr, crust);
      Fw = F * (1. - crust);
      vec2 off = clamp(vec2(dot(sl, rt.xz), -dot(sl, normalize(fw.xz + vec2(1e-5)))) * 2. / pix, vec2(-80.), vec2(80.));
      vec3 refl = dec(textureLod(uT1, clamp(fc + off, vec2(0.5), vec2(SZ - 0.5)) / SZ, 0.).rgb);
      if (!sea){ vec4 wr = wallRefl(p, reflect(rd, nw), be); if (wr.a > 0.) refl = wr.rgb; }
      // riffled patches mirror a blur of the low sky: paler and matte, with fine streaks along the wind
      if (rif > 0.){ float stk = n2(vec2(dot(p.xz, wd) * 0.7, dot(p.xz, vec2(-wd.y, wd.x)) * 9.) + TT * 0.3); refl = mix(refl, hazeC * (0.85 + 0.3 * stk), rif * 0.42 * lee * (1. - smoothstep(0.05, 0.3, pf))); }
      acc = col + Fw * refl * mix(vec3(1.), body * 1.25, 0.45 * smoothstep(0.3, 1., s) + 0.35 * shal);
      acc = mix(acc, hazeC, 1. - exp(-tw / mix(5200., 1400., uU[21].x)));
  }
  // sprites
  vec4 bb = uU[18];
  if (fc.x > bb.x && fc.x < bb.z && fc.y > bb.y && fc.y < bb.w){
    vec3 amb = ambN(vec3(0., 0.6, 0.8)) * 1.2;
    for (int k = 0; k < 128 + uZ0; k++){   // sprite i, j = 0 itself and 1 its mirror image: one loop, not two nested
      int i = k >> 1, j = k & 1;
      if (float(i) >= uU[19].x) break;
      vec4 a = texelFetch(uD, ivec2(i, 2), 0), e = texelFetch(uD, ivec2(i, 3), 0);
      float ty = floor(e.w * .5), face = mod(e.w, 2.) > .5 ? 1. : -1.;
      float sc = a.z;  // pixels per metre
      vec2 q = (fc - a.xy) / sc; q.x *= face;
      {
        vec2 qq = j == 0 ? q : (fc - e.xy - wsl * sc * 3.) / sc;
        if (j == 1){ qq.x *= face; qq.y = -qq.y; }
        if ((j == 0 ? e.z < tPrim : wat) && abs(qq.x) < 0.8 && abs(qq.y) < 1.2){
          vec4 bd = birdAt(qq, ty, a.w, 1. / sc);
          vec3 bc = bd.rgb * (amb + sunc * 0.35 * max(SUN.y + 0.05, 0.) * 6.);
          if (j == 0) acc = mix(acc, mix(bc, hazeC, 1. - exp(-e.z / 5200.)), bd.a);
          else acc = mix(acc, bc * Fw + acc * (1. - Fw), bd.a * 0.9);
        }
      }
    }
  }
  vec3 col = acc * uU[3].w;
  // the low sun's glare in the lens, and the warm white balance of a golden-hour photograph
  float sa = sqrt(max(2. - 2. * dot(rd0, SUN), 0.));
  col += sunc * uU[3].w * (0.25 * exp(-sa / 0.01) + 0.1 * exp(-sa / 0.05) + 0.025 * exp(-sa / 0.25)) * smoothstep(-0.012, 0.004, SUN.y);
  col *= mix(vec3(1.), vec3(1.1, 1.0, 0.8), uU[23].x * smoothstep(-5., 1., SUNEL / 0.0174533));
  col = clamp((col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14), 0., 1.);
  col = pow(col, vec3(1. / 2.2));
  float gn = fract(sin(dot(fc + uU[21].y, vec2(12.9898, 78.233))) * 43758.5453) - .5;
  col += gn * 0.012;
  o = vec4(col, 1.);
}
#endif`,i0=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
uniform sampler2D uHC; uniform vec4 uR; out vec4 o;
void main(){ vec4 v = texelFetch(uHC, ivec2(gl_FragCoord.xy) - ivec2(uR.xy), 0); if (v.a >= 1.) discard; o = v; }`,u=e.__c568||(e.__c568=(()=>{const t=!!e.getExtension("EXT_color_buffer_float"),a=t||!!e.getExtension("EXT_color_buffer_half_float"),o=(m,p)=>{const g=e.createShader(p);return e.shaderSource(g,m),e.compileShader(g),g},n=o(o0,e.VERTEX_SHADER),s=m=>r0.replace(`
`,`
`+m+`
`),l={map:s0,gnd:s("#define GND"),sky:n0,cloud:de==="Mackerel sky"?Ge.replace(`
`,`
#define MACK
`):Ge,mill:s(`#define OBJ
#define NOHEAP`),heap:s(`#define OBJ
#define NOMILL`),fin:s(`#define FIN
#define LITE`),env:s(`#define OBJ
#define ENVP`),hc:i0},h={},i=m=>{const p=e.createProgram(),g=o(m,e.FRAGMENT_SHADER);return e.attachShader(p,n),e.attachShader(p,g),e.linkProgram(p),{p,f:g}};for(const m in l)h[m]=i(l[m]);e.flush();const z=64,R=new Uint8Array(z*z*z);let x=2654435769;for(let m=0;m<R.length;m++)x=Math.imul(x^x>>>15,739982445),x=Math.imul(x^x>>>12,695872825),x^=x>>>15,R[m]=x&255;const E=e.createVertexArray(),L=(m,p,g,q,te,c,D,W)=>{const b=e.createTexture();return e.bindTexture(e.TEXTURE_2D,b),e.texStorage2D(e.TEXTURE_2D,W||1,g,m,p),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),b},B=m=>{const p=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,p),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,m,0),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),p},U=e.createTexture();e.bindTexture(e.TEXTURE_3D,U),e.texImage3D(e.TEXTURE_3D,0,e.R8,z,z,z,0,e.RED,e.UNSIGNED_BYTE,R),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const m of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,m,e.REPEAT);const T=(m,p)=>{if(!e.getProgramParameter(p.p,e.LINK_STATUS))throw new Error("568 "+m+": "+e.getShaderInfoLog(p.f)+e.getProgramInfoLog(p.p));const g=p.p,q={};q.p=g;const te=e.getProgramParameter(g,e.ACTIVE_UNIFORMS);for(let c=0;c<te;c++){const D=e.getActiveUniform(g,c).name.replace("[0]","");q[D]=e.getUniformLocation(g,D)}return e.useProgram(g),["uN","uSky","uCl","uPr","uD","uLut","uT0","uT1","uT2","uAm","uGr","uMp","uCm","uHC"].forEach((c,D)=>{q[c]&&e.uniform1i(q[c],D)}),q};for(const m of["sky","cloud","map"])h[m]=T(m,h[m]);const w={P:h,vao:E,tN:U,tex:L,fbo:B,fl:t,hf:a};w.readyRest=()=>{for(const m of["gnd","mill","heap","fin","env","hc"])h[m]=T(m,h[m]);w.readyRest=null},w.clouds={[de==="Mackerel sky"?1:0]:h.cloud},w.cloud=m=>w.clouds[m]||(w.clouds[m]=T("cloud",i(m?Ge.replace(`
`,`
#define MACK
`):Ge))),w.startX=()=>{w.bX||(w.bX=i(s("#define FIN")),e.flush())},w.finX=()=>(w.startX(),w.PX||(w.PX=T("finX",w.bX))),w.tD=L(64,4,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE),w.tMp=L(2048,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT,12);const k=B(w.tMp);return e.bindVertexArray(E),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,U),e.viewport(0,0,2048,256),e.useProgram(h.map.p),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(k),e.bindTexture(e.TEXTURE_2D,w.tMp),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),w})()),S=u.P;u.mts||(u.mts=e.getParameter(e.MAX_TEXTURE_SIZE));const ve=u.bk||(u.bk=new Map),tt=M.hash+" "+u.mts,X=ve.get(tt)||{};ve.delete(tt),ve.set(tt,X),ve.size>4&&ve.delete(ve.keys().next().value);const ge=u.mts>=4096?4096:2048,ze=X.prof||(X.prof=new Uint8Array(ge*4)),He=[];He.push([Y-Ae-.02+(y?0:(r()-.5)*.2),.075,.0085,.42,1]),He.push([Y+(Ae>0?1:-1)*(.17+.05*r()),.1,.0062,.48,2]),He.push([Y-(Ae>0?1:-1)*(.08+.05*r()),.05,.009,.72,3]);const gt=me+Math.PI+(r()<.5?-1:1)*(.35+.25*r()),be=(t,a)=>{const o=Math.floor(t),n=t-o,s=n*n*(3-2*n);return ie(o,a)*(1-s)+ie(o+1,a)*s};if(!X.pDone)for(let t=0;t<ge;t++){const a=(t+.5)/ge*F;let o=0,n=0,s=0,l=0;for(const x of He){let E=Math.atan2(Math.sin(a-x[0]),Math.cos(a-x[0]))/x[1];if(Math.abs(E)<1.15){const L=x[4]===2?Math.pow(Math.max(0,1-E*E),.35)*(.55+.45*Math.exp(-((E-.55)**2)*9)):Math.pow(Math.max(0,1-E*E),.8)*(.72+.28*Math.cos(E*3.3+x[4])),B=1.6*x[2]*L*(.85+.25*be(a*900,77+x[4])+.08*be(a*4e3,91));B>o&&(o=B,n=x[3])}}const h=Math.atan2(Math.sin(a-gt),Math.cos(a-gt)),i=.06*Math.exp(-h*h/.022)*(.75+.3*be(a*300,5)+.1*be(a*1500,6)),z=Math.cos(a-(me+Math.PI)),R=z>-.2?.006*(z+.2)*(.6+.8*be(a*60,9))+.0012*be(a*700,3):0;(i>o||R>o)&&(o=Math.max(i,R),n=i>R?.32:.22,s=1,l=i>.035?Math.max(0,(i-.03)/.03):0),ze[t*4]=Math.min(255,Math.round(o/.07*255)),ze[t*4+1]=Math.round(n*255),ze[t*4+2]=Math.round(Math.min(1,l)*255),ze[t*4+3]=s*255}X.pDone=!0;const Te=6360,c0=[.0058,.0135,.0331],l0=[.0016,.0047,21e-5],zt=(t,a,o)=>{const n=Math.sqrt(t+a);if(o>=0)return n/(n*o+1)*Math.exp(-a);const s=Math.sqrt(Math.max(0,1-o*o))*(t+a);return 2*Math.sqrt(s)*Math.exp(Math.min(t-s,60))-n/(1-n*o)*Math.exp(-a)},at=(t,a)=>{const o=Te+t,n=Math.sin(a),s=8*zt(Te/8,t/8,n),l=1.2*zt(Te/1.2,t/1.2,n),h=o/(Te+25),i=Math.sqrt(Math.max(1-h*h*(1-n*n),0)),z=15/Math.max(i,.05)*(t<25?1:.3),R=n<0?o*Math.sqrt(1-n*n):o,x=Math.min(1,Math.max(0,(R-Te+.05)/.35));return[0,1,2].map(E=>Math.exp(-Math.min(c0[E]*s+Se*1.11*l+l0[E]*z,80))*x*x*(3-2*x))},Ee=X.lut||(X.lut=new Uint8Array(64*2*4));if(!X.lDone)for(let t=0;t<64;t++){const a=(-6+12*t/63)*G,o=at(8.5,a),n=at(.003,a);for(let s=0;s<3;s++)Ee[t*4+s]=Math.round(Math.sqrt(o[s])*255),Ee[(64+t)*4+s]=Math.round(Math.sqrt(n[s])*255);Ee[t*4+3]=Ee[(64+t)*4+3]=255}X.lDone=!0;const Ie=22,P=[de==="Clear"?.12:de==="Mackerel sky"?.6:.42+.2*r(),de==="Mackerel sky"?1:0,r()*30,r()*F];{let t=P[3]+Math.PI/2-qe;t-=Math.PI*Math.round(t/Math.PI);const a=P[1]?.8:.62;Math.abs(t)<a&&(P[3]+=(t<0?-1:1)*(a-Math.abs(t))*1.5)}const f0=M.tile?1024:2048,H=768,ot=2,Tt=P[1]?5.2:8.5,Et=P[1]?.02:.035,nt=t=>t<2?0:2-(t-2)%3,Me=(t,a,o)=>{const n=u.cloud(P[1]),s=f.cs;if(ce&&(o=Math.min(o,ce.rowCH)),o<=a)return;const l=Math.floor(a*s.h/H),h=Math.ceil(o*s.h/H);e.bindFramebuffer(e.FRAMEBUFFER,s.fC[nt(t)]),e.viewport(0,0,s.w,s.h),e.useProgram(n.p),e.uniform4f(n.uC,P[0],Math.max(0,t-1)*ot*Et,P[2],P[3]),e.uniform4f(n.uS,Math.sin(Y),Math.cos(Y),Tt,0),e.enable(e.SCISSOR_TEST);for(const[i,z]of ce?ce.cols:[[0,s.w]])e.scissor(i,l,z,h-l),e.drawArrays(e.TRIANGLES,0,3);e.disable(e.SCISSOR_TEST)},h0=t=>{const a=t*3/8,o=[0,1,2].map(()=>u.tex(t,a,e.RG8,e.RG,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT));return{w:t,h:a,tC:o,fC:o.map(n=>u.fbo(n))}},$=Math.tan(32*G),Mt=(Ke?-6:-5.6)*G,kt=re+1.7,d0={yaw:0,pitch:0,x:0,y:0,z:0},d={yaw:qe,pitch:Mt,x:.15,z:0,eye:kt},Rt=()=>{const t=M.view||d0;d.yaw=qe+(t.yaw||0),d.pitch=Math.max(-1.25,Math.min(1.25,Mt+(t.pitch||0))),d.x=.15+Math.max(V?-12:-.6,Math.min(V?12:.6,t.x||0)),d.z=Math.max(V?-.5:-12,Math.min(V?.5:12,t.z||0)),d.eye=Math.max(re+.6,Math.min(re+2.4,kt+(t.y||0)))};Rt();const st=()=>{const t=Math.cos(d.pitch),a=[Math.sin(d.yaw)*t,Math.sin(d.pitch),Math.cos(d.yaw)*t],o=[Math.cos(d.yaw),0,-Math.sin(d.yaw)],n=[a[1]*o[2]-a[2]*o[1],a[2]*o[0]-a[0]*o[2],a[0]*o[1]-a[1]*o[0]];return{fw:a,rt:o,up:n}},m0=(t,a)=>{const o=st(),n=t*2-1,s=1-a*2,l=[0,1,2].map(i=>o.fw[i]+(n*o.rt[i]+s*o.up[i])*$),h=Math.hypot(l[0],l[1],l[2]);return l.map(i=>i/h)},Ut=(t,a,o,n)=>{const s=[a-d.x,o-d.eye,n-d.z],l=s[0]*t.fw[0]+s[1]*t.fw[1]+s[2]*t.fw[2];if(l<.5)return null;const h=s[0]*t.rt[0]+s[1]*t.rt[1]+s[2]*t.rt[2],i=s[0]*t.up[0]+s[1]*t.up[1]+s[2]*t.up[2];return[A*(.5+.5*h/(l*$)),A*(.5+.5*i/(l*$)),A/(2*$*l),Math.hypot(s[0],s[1],s[2])]},u0=(t,a)=>{const o=st(),n=Math.atan2(o.fw[0],o.fw[2]);let s=0,l=0,h=0;for(let U=0;U<4;U++)for(let T=0;T<=32;T++){const w=T/16-1,k=U<2?U?1:-1:w,m=U<2?w:U===2?1:-1,p=[0,1,2].map(te=>o.fw[te]+(k*o.rt[te]+m*o.up[te])*$),g=Math.hypot(p[0],p[1],p[2]);let q=Math.atan2(p[0],p[2])-n;q-=F*Math.round(q/F),s=Math.min(s,q),l=Math.max(l,q),h=Math.max(h,Math.abs(p[1])/g)}if(l-s>2.5||h>.95)return null;let i=Math.floor((n+s)/F*t)-4,z=Math.ceil((n+l)/F*t)+4;const R=Math.floor(i/t)*t;i-=R,z-=R;const x=Math.asin(h),E=Math.sqrt(Math.pow(Math.min(1,(x+.0105)/(Math.PI/2+.0105)),.8)),L=Math.min(a,Math.ceil(E*a)+4);return{cols:z-i>=t-1?[[0,t]]:z>=t?[[i,t-i],[0,z+1-t]]:[[i,z-i+1]],rowCH:Math.min(H,Math.ceil(L*H/a)),key:d.yaw+" "+d.pitch}};let ce=null;const At=!u.hf,f={};f.tSky=u.hf?u.tex(512,640,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.REPEAT):u.tex(512,640,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT),f.fSky=u.fbo(f.tSky),f.tPr=u.tex(ge,1,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT),f.tLut=u.tex(64,2,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),f.tAm=u.fl?u.tex(8,2,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE):u.hf?u.tex(8,2,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST,e.CLAMP_TO_EDGE):u.tex(8,2,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST,e.CLAMP_TO_EDGE),f.fAm=u.fbo(f.tAm),f.tGr=u.tex(2048,2,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE),f.cs=h0(f0),ce=u0(f.cs.w,f.cs.h);{e.bindTexture(e.TEXTURE_2D,f.tPr),e.texSubImage2D(e.TEXTURE_2D,0,0,0,ge,1,e.RGBA,e.UNSIGNED_BYTE,ze),e.bindTexture(e.TEXTURE_2D,f.tLut),e.texSubImage2D(e.TEXTURE_2D,0,0,0,64,2,e.RGBA,e.UNSIGNED_BYTE,Ee);const t=X.gr||(X.gr=new Float32Array(4096*4));if(!X.gDone)for(let a=0;a<4096;a++){const o=a-2048;t[a*4]=ye(o),t[a*4+1]=Je(o),t[a*4+2]=pe(o),t[a*4+3]=$e(o)}X.gDone=!0,e.bindTexture(e.TEXTURE_2D,f.tGr),e.texSubImage2D(e.TEXTURE_2D,0,0,0,2048,2,e.RGBA,e.FLOAT,t),e.bindVertexArray(u.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,u.tN),e.bindFramebuffer(e.FRAMEBUFFER,f.fSky),e.useProgram(S.sky.p);for(let a=0;a<5;a++){const o=K[a]*G,n=[Math.sin(Y)*Math.cos(o),Math.sin(o),Math.cos(Y)*Math.cos(o)];e.viewport(0,a*128,512,128),e.uniform4f(S.sky.uA,n[0],n[1],n[2],Se),e.uniform4f(S.sky.uB,At?-.003:.003,Ie,.0042,K[a]),e.drawArrays(e.TRIANGLES,0,3)}f.cT=0,f.kb=2,f.kr=0,Me(0,0,H),e.bindFramebuffer(e.FRAMEBUFFER,null)}f.amKey=null;const rt=t=>u.hf?u.tex(t,t,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE):u.tex(t,t,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),J=(()=>{const t=Math.ceil(A/2),a=[rt(A),rt(t),rt(A)],o={sz:A,h2:t,t:a,f:a.map(n=>u.fbo(n)),gKey:null};return e.bindFramebuffer(e.FRAMEBUFFER,null),o})(),St=ne(y?.1:(r()-.5)*.5,y?26:22+14*r());let p0=Pe(St[0],St[1]);for(let t=0;t<11;t++){const a=p0;a[0]+2+(a[1]-a[0]-4)*(.3+.4*r()),a[2]+2+(a[3]-a[2]-4)*(.25+.5*r()),r()*F,r()<.5,r()*5}const x0={"A small flock":14,"A great flock":34,"Three stragglers":3}[Wt],qt=ne(y?.02:(r()-.5)*.9,y?160:130+90*r()),ee=Pe(qt[0],qt[1]),it=[];for(let t=0;t<Math.min(x0,40);t++){const a=ee,o=(a[0]+a[1])/2,n=(a[2]+a[3])/2,s=r()*F,l=Math.sqrt(r())*Math.min(14,(a[1]-a[0])/2-2);it.push({x:Math.max(a[0]+1,Math.min(a[1]-1,o+Math.cos(s)*l)),z:Math.max(a[2]+1,Math.min(a[3]-1,n+Math.sin(s)*l*.8)),hd:r()*F,up:r()<.2?1:0,tu:r()*8,ph:r()*F})}const ct=new Float32Array(64*2*4),ke=[];let Z=0,I=Kt*G,lt=-1,Dt=0,le=me+Math.PI*0+(y?-.55:(r()-.5)*1.6);const Oe={"Land breeze":.55,"Dead calm":.06,Gusty:.95}[We];let fe=We==="Gusty"?.35:0,ft=le+Math.PI,Ft=r()*F,Re=Oe*.9;const Ze=[0,0],z0=[0,0],v0=le+Math.PI+.6,Nt={a:r()*F};let N=null,_t=!1;const b0=t=>{const a=M.input,o=a.taps();if(a.down){N||(N={x0:a.x,y0:a.y,lx:a.x,t:0,path:0,drag:!1});const n=a.x-N.lx;N.lx=a.x,N.t+=t,N.path+=Math.abs(n)+0,N.path>.02?(N.drag=!0,le-=n*2.2,fe=Math.min(1.6,fe+Math.abs(n)*5),Math.abs(n)>.004&&M.sound.hit("noise",Math.min(.2,Math.abs(n)*6),{cutoff:500+2500*Math.min(1,fe),dur:.3})):N.t>.35&&(Dt+=t,I+=lt*.85*G*t,I<K[4]*G&&(I=K[4]*G,lt=1),I>K[0]*G&&(I=K[0]*G,lt=-1))}else N?(!N.drag&&N.t<=.35&&Pt(N.x0,N.y0),N=null,Dt=0):o.length&&Pt(o[0].x,o[0].y)},Pt=(t,a)=>{const o=m0(t,a);if(o[1]>-.004)return;const n=d.eye/-o[1];let s=d.x+o[0]*n,l=d.z+o[2]*n,h=Pe(s,l);if((s<h[0]||s>h[1]||l<h[2]||l>h[3])&&(s=Math.max(h[0]+.3,Math.min(h[1]-.3,s)),l=Math.max(h[2]+.3,Math.min(h[3]-.3,l)),h=Pe(s,l)),l<pe(Qe))return;_t=!0;const i=Math.hypot(s-d.x,l-d.z);ke.push({x:s,z:l,t0:Z+.25+i*.012,a:1,box:h,played:!1,dist:i}),ke.length>8&&ke.shift()},j=new Float32Array(26*4);let Lt=0;const ht=new Float32Array(8*2*4),Bt=[se[0],se[1]],Ct=(t,a,o,n,s,l)=>[t-n-.05,a-.05,o-l-.05,t+n+.05,s+.05,o+l+.05],Xt=[[se[0],se[1],1],[De[0],De[1],.9]].map(([t,a,o])=>Ct(t,re+7.4*o-8.7178*o,a,8.7178*o,re+7.4*o+8.7178*o,8.7178*o)),Gt=v.map(t=>Ct(t[0],re,t[1],t[2]*1.3,re+t[4]+.15,t[2]*1.3)),Ht=[null,null],It=(t,a,o,n)=>{let s=1e9,l=1e9,h=-1e9,i=-1e9;const z=(T,w,k)=>{const m=T*t.fw[0]+w*t.fw[1]+k*t.fw[2];if(m<.001)return!1;const p=(T*t.rt[0]+w*t.rt[1]+k*t.rt[2])/(m*$),g=(T*t.up[0]+w*t.up[1]+k*t.up[2])/(m*$);return p<s&&(s=p),p>h&&(h=p),g<l&&(l=g),g>i&&(i=g),!0},R=o?Math.abs(d.pitch)<.3?Math.min(0,(.001-d.eye)*t.fw[1]):-1e9:0;for(const T of a){let w=!0;for(let k=0;k<8&&w;k++)w=((k&1?T[3]:T[0])-d.x)*t.fw[0]+((k&2?T[4]:T[1])-d.eye)*t.fw[1]+((k&4?T[5]:T[2])-d.z)*t.fw[2]<=R;if(!w)for(let k=0;k<8;k++){const m=(k&1?T[3]:T[0])-d.x,p=k&2?T[4]:T[1],g=(k&4?T[5]:T[2])-d.z;if(!(o?z(m,-p-d.eye,g)&&z(m,p-.001,g)&&z(m,.001-p,g):z(m,p-d.eye,g)))return[0,0,n,n]}}const x=T=>(T+1)*.5*n-.5,E=Math.max(0,Math.floor(x(s))-3),L=Math.min(n-1,Math.ceil(x(h))+3),B=Math.max(0,Math.floor(x(l))-3),U=Math.min(n-1,Math.ceil(x(i))+3);return L<E||U<B?null:[E,B,L-E+1,U-B+1]},Ot=()=>{const t=st();let a=0;for(const c of ke)Z-c.t0<9&&Z>=c.t0&&(ht.set([c.x,c.z,c.t0,c.a],a*4),ht.set([c.box[0],c.box[1],c.box[2],c.box[3]],(8+a)*4),a++);let o=0,n=1e9,s=1e9,l=-1e9,h=-1e9;const i=(c,D,W,b,C,je)=>{if(o>=64)return;const _=Ut(t,c,D,W),Q=Ut(t,c,-D,W);if(!_||_[2]*1.2<.35)return;const O=_[2]*1.3+2;(_[0]<-O||_[0]>A+O||_[1]<-O*2||_[1]>A+O*2)&&!Q||(ct.set([_[0],_[1],_[2],je],o*4),ct.set([Q?Q[0]:-1e4,Q?Q[1]:-1e4,_[3],b*2+(C>0?1:0)],(64+o)*4),n=Math.min(n,_[0]-O),l=Math.max(l,_[0]+O),s=Math.min(s,_[1]-O*1.3),h=Math.max(h,_[1]+O*1.3),Q&&(n=Math.min(n,Q[0]-O),l=Math.max(l,Q[0]+O),s=Math.min(s,Q[1]-O*1.3),h=Math.max(h,Q[1]+O*1.3)),o++)},z=(c,D)=>c*t.rt[0]+D*t.rt[2]>=0?1:-1;for(const c of it)i(c.x,.95,c.z,c.up?3:2,z(Math.sin(c.hd),Math.cos(c.hd)),c.ph);if(e.bindVertexArray(u.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,u.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,f.tSky),f.cT+=Lt,ce&&ce.key!==d.yaw+" "+d.pitch){ce=null;for(let c=Math.max(1,f.kb-2);c<f.kb;c++)Me(c,0,H);f.kr>0&&Me(f.kb,0,f.kr)}const R=f.cT/ot,x=Math.floor(R);for(;f.kb<x+2;)f.kr<H&&Me(f.kb,f.kr,H),f.kb++,f.kr=0;{const c=Math.min(H,Math.ceil((R-x)*1.25*H));(c-f.kr>=96||c>=H&&f.kr<H)&&(Me(f.kb,f.kr,c),f.kr=c)}e.activeTexture(e.TEXTURE12),e.bindTexture(e.TEXTURE_2D,f.cs.tC[nt(x+1)]),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,f.cs.tC[nt(x)]),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,f.tPr),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,u.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,8,2,e.RGBA,e.FLOAT,ht),o&&e.texSubImage2D(e.TEXTURE_2D,0,0,2,64,2,e.RGBA,e.FLOAT,ct),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,f.tLut);const E=I/G;let L=0;for(let c=0;c<4;c++)E<=K[c]&&(L=c+Math.min(1,(K[c]-E)/(K[c]-K[c+1])));const B=[Math.sin(Y)*Math.cos(I),Math.sin(I),Math.cos(Y)*Math.cos(I)],U=at(.003,I+.12*G),T=1.4*Math.exp(-.28*Math.max(E,-6)),w=Math.min(1,Math.max(0,(-E-.5)/3)),k=[Math.sin(le),Math.cos(le)],m=Math.atan2(Ce[0]-d.x,Ce[1]-d.z),p=Math.hypot(Ce[0]-d.x,Ce[1]-d.z);j.set([d.yaw,d.pitch,$,Z,d.x,d.eye,d.z,a,B[0],B[1],B[2],L,U[0]*Ie,U[1]*Ie,U[2]*Ie,T,I,Y,Se,de==="Clear"?.6:1,k[0],k[1],Oe*.8,fe,Ze[0],Ze[1],Ft,Nt.a,Bt[0],Bt[1],ft,Ue==="Full canvas"?1:Ue==="Reefed"?.45:0,De[0],De[1],v0,.9,xe,ue,_e,Ye,Fe,Ne,Jt,Qe,re,et[0],et[1],et[2],Le[0],Le[1],Le[2],Le[3],Be[0],Be[1],Be[2],Be[3],...v.length?[v[0][0],v[0][1],v[0][2],v[0][3]]:[0,0,0,0],...v.length?[v[1][0],v[1][1],v[1][2],v[1][3]]:[0,0,0,0],v.length?v[0][4]:0,v.length?v[1][4]:0,t0,v.length,a0,pe(V?-2:-1),1,.4+2.5*w,n,s,l,h,o,2*$/A,A,At?1:0,(m%F+F)%F,p,7/p,5/p,Se>.005?.5:.1,Z*37.17%113,0,0,0,0,de==="Mackerel sky"?.6:1,0,w0,V?1:0,0,0,R-x,Tt,Math.max(0,f.cT-ot)*Et,P[2],Math.cos(P[3]),Math.sin(P[3]),P[1],P[1]?.1:.3]),e.activeTexture(e.TEXTURE10),e.bindTexture(e.TEXTURE_2D,f.tGr);const g=I+" "+L;e.activeTexture(e.TEXTURE9),f.amKey!==g&&(f.amKey=g,j[88]=2,e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,f.fAm),e.viewport(0,0,8,2),e.useProgram(S.env.p),e.uniform4fv(S.env.uU,j),e.drawArrays(e.TRIANGLES,0,3)),e.bindTexture(e.TEXTURE_2D,f.tAm);const q=M.hash+" "+d.yaw+" "+d.pitch+" "+d.x+" "+d.z+" "+d.eye+" "+g;for(let c=0;c<2;c++){j[88]=c,j[89]=c?J.h2:A;const D=j[89],W=Xt.length?It(t,Xt,c,D):null,b=Gt.length?It(t,Gt,c,D):null;e.bindFramebuffer(e.FRAMEBUFFER,J.f[c]),e.viewport(0,0,D,D);let C=Ht[c];if(b&&(!C||C.key!==q+" "+b.join(","))){if(!C||C.w!==b[2]||C.h!==b[3]){C&&(e.deleteFramebuffer(C.f),e.deleteTexture(C.t)),e.activeTexture(e.TEXTURE13);const je=u.hf?u.tex(b[2],b[3],e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST,e.CLAMP_TO_EDGE):u.tex(b[2],b[3],e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST,e.CLAMP_TO_EDGE);C=Ht[c]={w:b[2],h:b[3],t:je,f:u.fbo(je)},e.activeTexture(e.TEXTURE9),e.bindFramebuffer(e.FRAMEBUFFER,J.f[c])}C.key=q+" "+b.join(","),e.enable(e.SCISSOR_TEST),e.scissor(b[0],b[1],b[2],b[3]),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(S.heap.p),e.uniform4fv(S.heap.uU,j),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,C.f),e.blitFramebuffer(b[0],b[1],b[0]+b[2],b[1]+b[3],0,0,b[2],b[3],e.COLOR_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,J.f[c])}e.useProgram(S.env.p),e.uniform4fv(S.env.uU,j),e.drawArrays(e.TRIANGLES,0,3),W&&(e.enable(e.SCISSOR_TEST),e.scissor(W[0],W[1],W[2],W[3]),e.useProgram(S.mill.p),e.uniform4fv(S.mill.uU,j),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.SCISSOR_TEST)),b&&(e.activeTexture(e.TEXTURE13),e.bindTexture(e.TEXTURE_2D,C.t),e.activeTexture(e.TEXTURE9),e.enable(e.SCISSOR_TEST),e.scissor(b[0],b[1],b[2],b[3]),e.useProgram(S.hc.p),e.uniform4f(S.hc.uR,b[0],b[1],0,0),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.SCISSOR_TEST))}J.gKey!==q&&(J.gKey=q,e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE11),e.bindTexture(e.TEXTURE_2D,u.tMp),e.bindFramebuffer(e.FRAMEBUFFER,J.f[2]),e.viewport(0,0,A,A),e.useProgram(S.gnd.p),e.uniform4fv(S.gnd.uU,j),e.drawArrays(e.TRIANGLES,0,3)),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,A,A);const te=_t?u.finX():S.fin;e.useProgram(te.p),e.uniform4fv(te.uU,j),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,J.t[0]),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,J.t[1]),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,J.t[2]),e.drawArrays(e.TRIANGLES,0,3)},y0=t=>{fe*=Math.exp(-t*.3),We==="Gusty"&&(fe=Math.max(fe,.25+.25*Math.sin(Z*.37)*Math.sin(Z*.11+1)));const a=Oe+fe;let o=le+Math.PI-ft;o=Math.atan2(Math.sin(o),Math.cos(o)),ft+=Math.max(-.12*t,Math.min(.12*t,o*.5*t*4));const n=Math.max(0,Math.cos(o)),s=Ue==="Full canvas"?1:Ue==="Reefed"?.55:.12,l=.9*a*a*n*n*s,h=l*1.4;Re+=(h-Re)*(1-Math.exp(-t*.45)),Ft+=Re*t,Nt.a+=(.35*Oe+.2)*t,Ze[0]+=Math.sin(le)*(1.5+3*a)*t,Ze[1]+=Math.cos(le)*(1.5+3*a)*t;for(const i of it)i.ph+=t*1.3,i.tu-=t,i.tu<0&&(i.up=i.up?0:r()<.3?1:0,i.tu=i.up?2+r()*3:4+r()*9,i.hd+=(r()-.5)*1.2),i.up||(i.x+=Math.sin(i.hd)*.08*t,i.z+=Math.cos(i.hd)*.08*t),(i.x<ee[0]+1||i.x>ee[1]-1||i.z<ee[2]+1||i.z>ee[3]-1)&&(i.hd+=Math.PI,i.x=Math.max(ee[0]+1,Math.min(ee[1]-1,i.x)),i.z=Math.max(ee[2]+1,Math.min(ee[3]-1,i.z)))},T0=1,w0={"Golden hour":1,"Sun on the sea":.85,"After sunset":.5,"Blue hour":.2}[ut];u.readyRest&&u.readyRest(),Ot();let dt=0,Zt=2;return(t,a)=>{for(M.tile||u.startX(),a=Math.min(Math.max(a||0,0),.1),Z+=a,Lt=a,Rt(),b0(a),dt+=a;dt>1/30;)y0(1/30),dt-=1/30;for(const o of ke)if(!o.played&&Z>=o.t0){o.played=!0;const n=Math.max(.12,1-o.dist/60);M.sound.hit("click",.3*n),M.sound.note(79+r()*7,{dur:.1,vel:.25*n,wave:"sine"})}Z>Zt&&(Zt=Z+Math.max(.8,6/(1+Re*3)),M.sound.note(38+r()*3,{dur:.35,vel:.05+.05*Math.min(1,Re),wave:"triangle",cutoff:600})),Ot()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
