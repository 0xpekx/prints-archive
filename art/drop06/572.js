// Gondolas: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/572.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(kt){kt&&kt.add({num:572,name:"Gondolas",fam:"Vistas",recipe:"The stone waterfront in Venice, mostly at a foggy winter dawn, with gondolas rocking between striped poles and a church across the water as a pale shape in the fog. The hour and weather, the fog and the gondolas change every mint. Press a gondola to rock it and knock its neighbour, tap the water for a ring, drag to drift the fog, or hold to let the light come and the fog thin out.",interactive:"Press a gondola to rock it: it may knock its neighbour and rings run out over the water (tap the water to start a ring); drag to drift the fog so the far church comes and goes; hold to let the light come: slowly the fog turns gold, then thins and the basin opens out (at night, first light).",music:!0,gl:!0,fps:30,seed:0,make(N){const e=N.gl,I=N.size,_=!!N.home;let a0=5713670;for(let t=2;t<66;t+=8)a0=Math.imul(a0^parseInt(N.hash.slice(t,t+8),16),2246822507)^a0>>>13;const g=()=>{a0=a0+1831565813|0;let t=Math.imul(a0^a0>>>15,1|a0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<8;t++)g();const r0=t=>{let o=0;for(const r in t)o+=t[r];let s=g()*o;for(const r in t)if(s-=t[r],s<0)return r;return Object.keys(t)[0]},p0=Math.PI*2,q0=Math.PI/180,O=(t,o,s)=>t<o?o:t>s?s:t,t0=(t,o,s)=>{const r=O((s-t)/(o-t),0,1);return r*r*(3-2*r)},w0=(t,o,s)=>t.map((r,i)=>r+(o[i]-r)*s);let n0=1462516241;for(let t=2;t<66;t+=8)n0=Math.imul(n0^parseInt(N.hash.slice(t,t+8),16),2146121005)^n0>>>11;const Z=()=>{n0=n0+1831565813|0;let t=Math.imul(n0^n0>>>15,1|n0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<5;t++)Z();const fe=(t=>{let o=0;for(const r in t)o+=t[r];let s=Z()*o;for(const r in t)if(s-=t[r],s<0)return r;return Object.keys(t)[0]})({"Dawn fog":41,"Fog lifting":14,"Sun burning through":12,"Night fog":11,Drizzle:10,"Evening fog":8,"Clear dawn":4}),X=_?"Dawn fog":fe,V0=Z(),he=Z(),Dt=Z(),H0=Z(),rt=Z(),de=Z(),ue=Z(),M0=_||H0<.66?"Bow-in":H0<.82?"Stern-in":H0<.96?"One out":"Rank out",nt=_?"Thick":r0({Thick:42,"Drifting banks":30,"Lying low":18,"Pea-souper":10}),ve=_?"Pearl dawn":r0({"Pearl dawn":40,"Rose dawn":30,"Blue hour":20,"Silver sun":10}),We=N.trait("Fog",{"Fog lifting":"Lying on the water","Sun burning through":"Burning off",Drizzle:"Rain veil","Clear dawn":"A bar on the horizon"}[X]||nt),ct=N.trait("Light",X==="Dawn fog"?ve:X),B0=_?"Rank of six":r0({"Rank of six":45,"Rank of eight":30,"Three by the steps":25});N.trait("Gondolas",M0==="Rank out"?"Rank out":M0==="Bow-in"?B0:B0+(M0==="Stern-in"?", stern-in":", one out"));const it=N.trait("Covers",_?"One uncovered":r0({"One uncovered":30,"Navy covers":30,"Mixed covers":25,"Blue covers":15})),lt=N.trait("Poles",_?"Blue and white":r0({"Blue and white":40,"Red and white":30,Mixed:22,"Gilded caps":8})),St=N.trait("Across the basin",_?"Dome and campanile":r0({"Dome and campanile":50,"Twin domes":30,"Lone campanile":20})),ft=N.trait("Lamps",_?"Amber glass":r0({"Amber glass":45,"Rose glass":25,"Pale gold":20,"Triple lanterns":10})),Ut=N.trait("Water",_?"Still":r0({Still:50,"Light swell":35,"Passing wake":15}));let c0=1461776397;for(let t=2;t<66;t+=8)c0=Math.imul(c0^parseInt(N.hash.slice(t,t+8),16),739982445)^c0>>>15;const m0=()=>{c0=c0+1831565813|0;let t=Math.imul(c0^c0>>>15,1|c0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<4;t++)m0();const xe=_?"On the quay":(t=>{let o=0;for(const r in t)o+=t[r];let s=m0()*o;for(const r in t)if(s-=t[r],s<0)return r;return Object.keys(t)[0]})({"On the quay":40,"At the top of the steps":27,"Along the rank":23,"Down the quay":10}),pe=_||he>=.45?null:Dt<.4?"The open basin":Dt<.75?"Beside the lamp":"Low on the steps",me=N.trait("Where you stand",pe||xe),C={"On the quay":[-.95,-1.35,1,-.075,1.56,32],"At the top of the steps":[.35,-.25,.42,-.16,1.56,32],"Along the rank":[-7.2,-3.2,.75,-.03,1.56,32],"Down the quay":[.8,-2.6,1.3,-.045,1.56,32],"Beside the lamp":[2.4,-3.3,1.25,.05,1.56,32],"The open basin":[-8.5,-.6,.15,-.05,1.56,32],"Low on the steps":[-.6,1.3,.55,-.03,.5,32]}[me],L={"Pearl dawn":{hor:[.53,.54,.565],zen:[.7,.71,.73],sun:[1,.8,.6],glow:1,ambD:[.1,.12,.11],body:[.045,.085,.075],lamp:2.4,exp:.78,vis:0},"Rose dawn":{hor:[.8,.52,.42],zen:[.52,.47,.56],sun:[1,.55,.4],glow:1.7,ambD:[.11,.1,.1],body:[.065,.075,.068],lamp:2.4,exp:.78,vis:0},"Blue hour":{hor:[.13,.165,.24],zen:[.1,.13,.2],sun:[.55,.58,.75],glow:.12,ambD:[.03,.04,.05],body:[.018,.03,.035],lamp:4.2,exp:1,vis:0},"Fog lifting":{hor:[.88,.85,.8],zen:[.4,.56,.8],sun:[1,.8,.6],glow:1.2,ambD:[.12,.13,.13],body:[.04,.08,.075],lamp:1.2,exp:.72,vis:0,el:9,fg:[.06,1.3,.5,.85]},"Sun burning through":{hor:[.86,.75,.56],zen:[.8,.75,.64],sun:[1,.84,.6],glow:2,ambD:[.13,.12,.1],body:[.06,.075,.06],lamp:1.2,exp:.7,vis:.85,el:11,ahead:1,fg:[.02,60,.6,.5]},"Night fog":{hor:[.034,.038,.048],zen:[.018,.022,.03],sun:[.4,.45,.6],glow:.04,ambD:[.008,.01,.012],body:[.006,.011,.012],lamp:3,exp:1.25,vis:0},Drizzle:{hor:[.4,.42,.45],zen:[.46,.48,.52],sun:[.8,.82,.86],glow:.3,ambD:[.07,.08,.08],body:[.03,.05,.05],lamp:3,exp:.88,vis:0,fg:[.008,80,.3,.8]},"Evening fog":{hor:[.42,.33,.4],zen:[.24,.24,.33],sun:[1,.5,.5],glow:1,ambD:[.05,.05,.06],body:[.02,.035,.04],lamp:3.8,exp:1,vis:0,el:2},"Clear dawn":{hor:[.95,.66,.5],zen:[.3,.42,.62],sun:[1,.62,.42],glow:1.6,ambD:[.07,.08,.1],body:[.03,.07,.08],lamp:1,exp:.8,vis:1,el:3,ahead:1,fg:[.0035,40,.2,.92]},"Silver sun":{hor:[.6,.61,.625],zen:[.8,.81,.83],sun:[1,.93,.8],glow:.7,ambD:[.12,.14,.13],body:[.065,.09,.075],lamp:1.6,exp:.75,vis:.5,az:1,el:8.5}}[ct],be={Thick:[.024,80,.4,.5],"Drifting banks":[.022,60,.85,.58],"Lying low":[.05,2,.4,.75],"Pea-souper":[.075,90,.3,.12]},R0=L.fg||be[nt],X0=Ut==="Still"?.018:.034,ge=St==="Dome and campanile"?0:St==="Twin domes"?1:2,ht=B0==="Rank of six"?5:B0==="Rank of eight"?6:2,Lt=B0==="Rank of eight"?2:1,Y0=1.85,dt=[];for(let t=0;t<ht;t++)dt.push(2.4+Y0*t);for(let t=0;t<Lt;t++)dt.push(-2.55-Y0*t);const ye=ht>2?1+(g()*2|0):0,we=t=>it==="Blue covers"?1:it==="Navy covers"?0:it==="Mixed covers"?[0,1,2,0][g()*4|0]:t===ye?3:0,E=dt.map((t,o)=>({x:t,z:6.07+(g()-.5)*.3,yaw:Math.PI/2+(g()-.5)*.05,cov:we(o)+g()*.45,gild:g()<.5,h:0,vh:0,r:(g()-.5)*.02,vr:0,p:0,vp:0,s:0,vs:0,f:[0,1,2,3,4,5].map(()=>g()*p0),lastRing:0,lastVh:0}));E.sort((t,o)=>t.x-o.x);for(const t of E)t.yaw+=(m0()-.5)*.09,t.z+=(m0()-.5)*.5,t.h0=(m0()-.5)*.07,t.r0=(m0()-.5)*.07,t.p0=(m0()-.5)*.02;const k0=()=>lt==="Blue and white"?0:lt==="Red and white"?1:lt==="Gilded caps"?4:g()<.5?0:g()<.7?1:2,i0=[];for(let t=0;t+1<E.length;t++){const o=E[t],s=E[t+1];s.x-o.x>Y0+.2||((t%2===0||g()<.3)&&i0.push({x:(o.x+s.x)/2+(g()-.5)*.1,z:1.3+g()*.2,top:3.3+g()*.9,col:k0(),lx:(g()-.5)*.05,lz:(g()-.5)*.06}),(t%2===1||g()<.4)&&i0.push({x:(o.x+s.x)/2+(g()-.5)*.1,z:11.55+g()*.3,top:3.2+g()*1,col:k0(),lx:(g()-.5)*.06,lz:(g()-.5)*.08,outer:1}))}const It=E[E.length-1],Me=E[0];i0.push({x:It.x+.85,z:1.4,top:3.6+g()*.5,col:k0(),lx:.03,lz:0}),i0.push({x:It.x+.9,z:11.7,top:3.4+g()*.6,col:k0(),lx:.04,lz:.02,outer:1}),i0.push({x:Me.x-.9,z:11.6,top:3.3+g()*.6,col:k0(),lx:-.03,lz:.02,outer:1});for(const[t,o]of[[-7.5,19],[-14,31],[7.5,27],[26,21],[-22,15]])i0.push({x:t+(g()-.5)*2,z:o+(g()-.5)*3,top:2.8+g()*1.2,col:3,lx:(g()-.5)*.1,lz:(g()-.5)*.1});const l0=M0==="Stern-in";if(l0)for(const t of E)t.yaw+=Math.PI;M0==="One out"&&E.length>2&&E.splice(1+(H0*977%1*(E.length-2)|0),1),M0==="Rank out"&&(E.length=0);const G=t=>{const o=Math.sin(t*12.9898+4.1)*43758.5453;return o-Math.floor(o)},ut=(t,o)=>{const s=Math.cos(t.yaw),r=Math.sin(t.yaw);return[t.x+o[0]*s+o[2]*r,o[1],t.z-o[0]*r+o[2]*s]},vt=[];let f0=null,P0=null;if(E.forEach((t,o)=>{for(const s of[0,1]){const r=s?-4.55:4.35,i=l0?!s:s,h=i0.filter(n=>(i?n.z>10&&n.z<13:n.z<3)&&Math.abs(n.x-t.x)<1.35);h.sort((n,v)=>Math.abs(n.x-t.x)-Math.abs(v.x-t.x));const l=h[0];if(!l){t[s?"sL":"bL"]=[r,0,0];continue}const m=l.x>t.x?1:-1,a=m*(l0?-1:1)*(s?.42:.4),p=s?.86:.74;t[s?"sL":"bL"]=[r,p,a];const d=ut(t,[r,p+.02,a]),f=1+.35*G(o*2+s);vt.push({A:d,B:[l.x+l.lx*f-m*.13,f,d[2]+(l.z-d[2])*.9],sag:.12+.1*G(o*2+s+9),gi:o,st:s,col:[l.x+l.lx*f,f,l.z+l.lz*f]})}t.x>0&&(!f0||t.x<f0.x)&&(f0=t)}),f0){P0=[1.98,1.04,-.18];const t=l0?[-4.2,.8,.5]:[3.9,.66,-.55],o=l0?"sL":"bL";f0[o][1]||(f0[o]=t),vt.push({A:ut(f0,[t[0],t[1]+.02,t[2]]),B:[P0[0]+.07,1.06,P0[2]+.02],sag:.25,gi:E.indexOf(f0),st:l0?1:0})}const Z0=ft==="Triple lanterns",h0=((t,o)=>{const s=C[2]-.3+(t-.5)*.08+(_?0:(ue-.5)*.9),r=24+(o-.5)*3;return[C[0]+Math.sin(s)*r,C[1]+Math.cos(s)*r]})(g(),g()),xt=[...[-15,-3.2,5.6,15.2,24.8,34.4,44].map(t=>[t,4.34,-.75,Z0?1.3:1]),[h0[0],4.75,h0[1],Z0?.75:.55],[0,5.55,-9.7,.8]],D0=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
layout(std140) uniform UB { vec4 u[32]; };
#define CAM u[0]
#define VPM mat4(u[1], u[2], u[3], u[4])
#define FOGH u[5]
#define FOGZ u[6]
#define SUND u[7]
#define SUNC u[8]
#define WIND u[9]
#define AMBU u[10]
#define AMBD u[11]
#define WBODY u[12]
#define CHUR u[13]
#define VAPO u[14]
#define RES u[15]
#define LAMPC u[16]
#define BRT u[17]
#define BUP u[18]
#define BFW u[19]
#define MISC u[20]
#define MISC2 u[21]
#define WX u[30]
#define WX2 u[31]
`,pt=`
uniform sampler2D uN; uniform sampler2D uD; uniform int uZ;
float h21(vec2 p) { uvec2 q = uvec2(ivec2(floor(p)) + 32768); uint h = q.x * 1597334677u ^ q.y * 3812015801u; h = (h ^ (h >> 16)) * 2246822519u; h ^= h >> 13; return float(h & 0xffffffu) / 16777216.; }
float fbm(vec2 p) { return texture(uN, p).r * 0.5 + texture(uN, p * 2.03 + 0.17).r * 0.3 + texture(uN, p * 4.1 + 0.41).g * 0.2; }
vec3 fogCol(vec3 rd) {
  vec3 c = mix(FOGH.rgb, FOGZ.rgb, smoothstep(-0.2 + 0.2 * step(FOGZ.w, 3.), FOGZ.w < 3. ? 0.3 : 0.85, rd.y));
  float az = dot(normalize(rd.xz + vec2(1e-4, 0.)), normalize(SUND.xz));
  c *= 0.9 + 0.1 * az;
  float mu = max(dot(rd, SUND.xyz), 0.);
  return c + SUNC.rgb * SUNC.w * (0.08 * mu * mu + 0.26 * pow(mu, 8.) + 0.42 * pow(mu, 60.));
}
float bank(vec2 xz) { vec2 q = (xz + WIND.xy) * 0.0009; return texture(uN, q).r * 0.7 + texture(uN, q * 2.7 + 0.3).g * 0.3; }
float wisp(vec3 ro, vec3 rd, float d) { vec3 p = ro + rd * min(d, 30.) * 0.6; return texture(uN, (p.xz + WIND.xy * 1.6) * 0.0045 + vec2(p.y * 0.004, 0.)).g; }
float fogT(vec3 ro, vec3 rd, float d) {
  float H = FOGZ.w, y0 = max(ro.y, 0.), y1 = max(ro.y + rd.y * d, 0.);
  float k = abs(y1 - y0) > 0.05 ? H * (exp(-y0 / H) - exp(-y1 / H)) / (y1 - y0) : exp(-0.5 * (y0 + y1) / H);
  float b = bank((ro + rd * min(d, 90.) * 0.5).xz);
  return exp(-max(FOGH.w * d * d / (d + 12.) * k * (1. + WIND.z * (b - 0.5) * 2.), 0.));
}
vec3 fogged(vec3 c, vec3 ro, vec3 rd, float d) {
  float T = fogT(ro, rd, d);
  return mix(fogCol(rd) * (0.965 + 0.07 * wisp(ro, rd, d)), c, T);
}
`,Re=`#version 300 es
out vec2 vQ;
void main() { vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) * 2. - 1.; vQ = p; gl_Position = vec4(p, 0.999, 1.); }`,Pe=D0+`
layout(location = 0) in vec3 aP; layout(location = 1) in vec3 aN; layout(location = 2) in vec3 aA;
layout(location = 3) in vec4 aI0; layout(location = 4) in vec4 aI1;
uniform float uMir;
out vec3 vW; out vec3 vN; out vec3 vA; out vec3 vL; out vec4 vI;
vec3 rotY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c); }
void main() {
  vec3 p = aP, n = aN; float kind = aI1.w;
  vL = aP; vI = aI1; vA = aA;
  if (kind > 0.5 && kind < 1.5) {
    float cr = cos(aI1.x), sr = sin(aI1.x), cp = cos(aI1.y), sp = sin(aI1.y);
    vec3 q = p - vec3(0., 0.15, 0.);
    q = vec3(q.x, q.y * cr - q.z * sr, q.y * sr + q.z * cr); n = vec3(n.x, n.y * cr - n.z * sr, n.y * sr + n.z * cr);
    q = vec3(q.x * cp - q.y * sp, q.x * sp + q.y * cp, q.z); n = vec3(n.x * cp - n.y * sp, n.x * sp + n.y * cp, n.z);
    q.y += 0.15;
    p = rotY(q, aI0.z) + vec3(aI0.x, aI0.w, aI0.y); n = rotY(n, aI0.z);
  } else if (aA.x > 13.5 && aA.x < 14.5) {
    vec4 g = u[22 + int(aA.y + 0.5)]; float st = step(1.5, aA.z), w = aA.z - 2. * st;
    p.xy += w * mix(g.xy, g.zw, st);
  }
  vW = p; vN = n;
  vec3 q = p; if (uMir > 0.5) q.y = -q.y;
  gl_Position = VPM * vec4(q, 1.);
}`,_t=D0+pt+`
in vec2 vQ; out vec4 o; uniform float uMir;
float sdB(vec2 q, vec2 c, vec2 h) { vec2 d = abs(q - c) - h; return length(max(d, 0.)) + min(max(d.x, d.y), 0.); }
float church(vec2 q) {
  float st = MISC.w, d = sdB(q, vec2(-10., 1.6), vec2(170., 1.6));
  d = min(d, sdB(q, vec2(-66., 8.), vec2(32., 8.)));
  d = min(d, max(sdB(q, vec2(-66., 18.), vec2(32., 3.)), q.y - 16. - (32. - abs(q.x + 66.)) * 0.14));
  d = min(d, sdB(q, vec2(84., 6.5), vec2(38., 6.5)));
  if (st < 0.5) {
    d = min(d, sdB(q, vec2(0., 12.), vec2(22., 12.)));
    d = min(d, max(abs(q.x) - 22., q.y - 33. + abs(q.x) * 0.41));
    d = min(d, sdB(q, vec2(-2., 33.), vec2(10., 6.)));
    d = min(d, length(q - vec2(-2., 38.5)) - 11.);
    d = min(d, sdB(q, vec2(-2., 52.), vec2(1.9, 4.)));
    d = min(d, length(q - vec2(-2., 56.3)) - 1.9);
    d = min(d, sdB(q, vec2(-2., 59.), vec2(0.22, 2.5)));
    d = min(d, sdB(q, vec2(44., 30.), vec2(5., 30.)));
    d = min(d, max(sdB(q, vec2(44., 63.), vec2(5.6, 3.)), -min(sdB(q, vec2(41.8, 62.6), vec2(1.1, 2.1)), sdB(q, vec2(46.2, 62.6), vec2(1.1, 2.1)))));
    d = min(d, max(abs(q.x - 44.) - 5. * (82. - q.y) / 16., 66. - q.y));
    d = min(d, sdB(q, vec2(44., 84.), vec2(0.25, 2.5)));
  } else if (st < 1.5) {
    d = min(d, sdB(q, vec2(0., 11.), vec2(30., 11.)));
    d = min(d, sdB(q, vec2(-14., 29.), vec2(8., 6.)));
    d = min(d, length(q - vec2(-14., 34.)) - 9.5);
    d = min(d, sdB(q, vec2(-14., 46.), vec2(1.5, 3.5)));
    d = min(d, sdB(q, vec2(16., 26.), vec2(6., 4.)));
    d = min(d, length(q - vec2(16., 30.)) - 7.);
    d = min(d, sdB(q, vec2(16., 39.), vec2(1.2, 3.)));
    d = min(d, sdB(q, vec2(52., 24.), vec2(4., 24.)));
    d = min(d, max(abs(q.x - 52.) - 4. * (60. - q.y) / 12., 48. - q.y));
  } else {
    d = min(d, sdB(q, vec2(-10., 9.), vec2(26., 9.)));
    d = min(d, max(abs(q.x + 10.) - 26., q.y - 26. + abs(q.x + 10.) * 0.33));
    d = min(d, sdB(q, vec2(24., 36.), vec2(5.5, 36.)));
    d = min(d, max(sdB(q, vec2(24., 75.), vec2(6., 3.5)), -min(sdB(q, vec2(21.7, 74.5), vec2(1.1, 2.4)), sdB(q, vec2(26.3, 74.5), vec2(1.1, 2.4)))));
    d = min(d, max(abs(q.x - 24.) - 6. * (96. - q.y) / 18., 78.5 - q.y));
  }
  return d;
}
float shore(vec2 q) {
  float c = floor(q.x / 23.), f = q.x - c * 23. - 11.5, hz = h21(vec2(c, 9.));
  float h = 6. + 5. * texture(uN, vec2(q.x * 0.0021, 0.37)).r + 2. * step(0.5, h21(vec2(floor(q.x / 9.), 3.)));
  float d = q.y - h;
  if (hz > 0.8) d = min(d, max(abs(f) - 1.4, q.y - 24. - 8. * hz));
  if (abs(q.x - 140.) < 40.) d = min(d, min(length(q - vec2(140., 18.)) - 9., sdB(q, vec2(140., 10.), vec2(16., 8.))));
  return d;
}
void main() {
  vec3 rd = normalize(BFW.xyz + (BRT.xyz * vQ.x + BUP.xyz * vQ.y) * BFW.w), ro = CAM.xyz;
  if (uMir > 0.5) { rd.y = -rd.y; ro.y = -ro.y; }
  vec3 col = fogCol(rd) * (0.965 + 0.07 * wisp(ro, rd, 1e3));
  float mu = dot(rd, SUND.xyz);
  col += SUNC.rgb * SUND.w * 5. * smoothstep(0.99955, 0.9998, mu) * (1. - uMir);
  float px = 2. * BFW.w * RES.y * (uMir > 0.5 ? 2. : 1.);
  // the church across the basin, fading with the banks that drift over it
  vec3 cb = vec3(CHUR.x, 0., CHUR.y); float dd = dot(rd, cb);
  if (dd > 0.2) {
    float t = CHUR.z / dd; vec3 p = ro + rd * t, cr = vec3(cb.z, 0., -cb.x);
    vec2 q = vec2(dot(p - ro, cr), p.y);
    float cov = clamp(0.5 - church(q) / (px * t), 0., 1.);
    float b = bank((ro + cb * 45.).xz), a = CHUR.w * (0.5 + 1.1 * smoothstep(0.3, 0.7, b));
    if (FOGZ.w < 3.) a *= 1. - exp(-q.y / FOGZ.w * 0.7);
    vec3 sc = fogCol(rd) * (0.6 + 0.16 * clamp(q.y / 70., 0., 1.)) + SUNC.rgb * SUND.w * 0.06;
    sc *= 1. - 0.3 * MISC2.x;
    if (WX2.z > 0.) {
      // in clearer air the church shows its form: the temple front's columns and pediment, the lit side of the dome
      // and drum, the belfry, the monastery's rows of windows, all still pale
      float ls = dot(cr, SUND.xyz) > 0. ? 1. : -1., st = MISC.w, sh = 0.;
      if (st < 0.5) {
        float cx = abs(abs(q.x) - 11.) - 5.5;
        sh -= 0.22 * step(q.y, 23.) * step(abs(q.x), 21.) * step(1.3, abs(cx)) * step(2., q.y);
        sh -= 0.12 * step(abs(q.y - 25.5), 1.5) * step(abs(q.x), 20.);
        sh += 0.22 * ls * clamp((q.x + 2.) / 11., -1., 1.) * step(30., q.y) * step(q.y, 50.);
        sh += 0.12 * ls * step(39., q.x) * step(q.x, 49.) * sign(q.x - 44.);
      }
      vec2 wq = vec2(fract(q.x / 3.2) - 0.5, fract(q.y / 4.5) - 0.5);
      sh -= 0.16 * step(abs(wq.x), 0.18) * step(abs(wq.y), 0.2) * step(abs(q.x - 84.), 36.) * step(2., q.y) * step(q.y, 12.);
      vec3 lit = mix(FOGZ.rgb, SUNC.rgb, 0.45) * (0.78 + 0.5 * sh) * (0.7 + 0.5 * max(SUND.y * 4., 0.2));
      sc = mix(sc, lit, WX2.z);
      a = mix(a, 0.94, WX2.z * 0.6);
    }
    col = mix(col, sc, cov * clamp(a, 0., 0.9));
  }
  // the far shore off to the left
  vec3 sb = normalize(vec3(-0.62, 0., 0.78)); dd = dot(rd, sb);
  if (dd > 0.4) {
    float t = 720. / dd; vec3 p = ro + rd * t, sr = vec3(sb.z, 0., -sb.x);
    vec2 q = vec2(dot(p - ro, sr), p.y);
    float cov = clamp(0.5 - shore(q) / (px * t), 0., 1.) * smoothstep(-560., -380., q.x) * (1. - smoothstep(380., 560., q.x));
    col = mix(col, fogCol(rd) * 0.8, cov * MISC2.y);
    if (WX.w > 0.) {
      float cx = floor(q.x / 7.), hz = h21(vec2(cx, 41.));
      vec2 lp = vec2((cx + 0.2 + 0.6 * h21(vec2(cx, 43.))) * 7., 1.5 + 4. * hz);
      float lr = length(q - lp) / (px * t);
      col += LAMPC.rgb * step(0.45, hz) * (exp(-lr * lr * 0.5) * 0.5 + exp(-lr * 0.25) * 0.05) * WX.w * (0.35 + MISC2.y) * smoothstep(-560., -380., q.x) * (1. - smoothstep(380., 560., q.x));
    }
  }
  col = mix(col, FOGH.rgb * 1.08, WX2.x * exp(-pow((rd.y - 0.006) * 60., 2.)));
  // the vaporetto crossing well out, its cabin lights through the fog
  if (rd.z * (abs(VAPO.y) - ro.z) > 0.) {
    float t = (abs(VAPO.y) - ro.z) / rd.z; vec3 p = ro + rd * t; float lx = (p.x - VAPO.x) * (VAPO.y < 0. ? -1. : 1.), h = p.y;
    float wx = clamp(floor((lx + 9.6) / 1.25 + 0.5), 0., 13.), dx = lx + 9.6 - wx * 1.25;
    float win = exp(-(dx * dx / 0.12 + (h - 2.2) * (h - 2.2) / 0.08)) * step(abs(lx + 1.5), 9.);
    float glo = exp(-length(vec2((lx + 1.5) * 0.25, h - 2.2)) * 0.9);
    vec3 lc = vec3(1., 0.72, 0.42) * (win * 0.9 + glo * 0.35);
    float g1 = length(vec2(lx - 11.3, h - 3.5)), g2 = length(vec2(lx - 7.6, h - 5.6));
    lc += vec3(0.25, 1., 0.45) * (exp(-g1 * g1 * 3.) * 2. + exp(-g1 * 0.8) * 0.25) + vec3(1., 0.95, 0.85) * (exp(-g2 * g2 * 3.) * 2. + exp(-g2 * 0.8) * 0.25);
    col += lc * VAPO.w;
  }
  o = vec4(col, 1.);
}`,ze=D0+pt+`
in vec3 vW; in vec3 vN; in vec3 vA; in vec3 vL; in vec4 vI;
uniform float uMir; out vec4 o;
//ENV<
// what a glossy surface mirrors: the fog, the water below the horizon (its ripples breaking the mirrored fog), and for
// lacquer and steel the neighbouring black hulls
vec3 envR(vec3 P, vec3 Rr, bool pl, float rough) {
  // near the horizon a glossy hull sees the quay, the rank and the poles more than open fog: darker there, open fog above
  vec3 fR = fogCol(Rr), e = fR * (pl ? 0.2 + 1.05 * smoothstep(-0.04, 0.4, Rr.y) : 1.);
  if (Rr.y < 0.02 && rough < 0.3) {
    float tw = min(max(P.y, 0.02) / max(-Rr.y, 0.01), 80.);
    vec2 hp = P.xz + Rr.xz * tw;
    float rip = texture(uN, hp * 0.21 + CAM.w * vec2(0.011, 0.007)).b - texture(uN, hp * 0.47 - CAM.w * vec2(0.008, -0.013)).b;
    float cw = clamp(-Rr.y + rip * 0.3, 0.015, 1.);
    float Fw = 0.02 + 0.98 * pow(1. - cw, 5.);
    vec3 wc = mix(WBODY.rgb * 1.5, fogCol(vec3(Rr.x, abs(Rr.y), Rr.z)) * (0.92 + 0.3 * rip), Fw);
    wc = mix(fR, wc, exp(-FOGH.w * tw));
    e = mix(e, wc, smoothstep(0.02, -0.03, Rr.y));
  }
  if (pl) {
    float best = 1e9;
    // the neighbouring hulls in the rank, black in the mirror
    if (abs(Rr.x) > 0.02) {
      float sg = sign(Rr.x), rgt = step(0., P.x), base = mix(-2.55, 2.4, rgt), stp = mix(-1.85, 1.85, rgt), cnt = mix(floor(MISC2.w / 10.), mod(MISC2.w, 10.), rgt);
      float k1 = floor((P.x - base) / stp + 0.5) + sg * sign(stp);
      if (k1 >= 0. && k1 < cnt) {
        float t = (base + stp * k1 - sg * 0.6 - P.x) / Rr.x;
        vec3 h = P + Rr * t; float uh = (6.07 - h.z) / 5.4;
        if (t > 0. && abs(uh) < 0.97) {
          float gs = 0.4 + 0.62 * pow(max(uh, 0.), 2.6) + 0.8 * pow(max(-uh, 0.), 2.8);
          if (h.y < gs && h.y > -0.3) { best = t; e = mix(fR, vec3(0.012, 0.013, 0.015) + fR * 0.08 * smoothstep(gs - 0.12, gs, h.y), exp(-FOGH.w * t)); }
        }
      }
    }
  }
  return e;
}
//ENV>
void main() {
  vec3 P = vW; bool mir = uMir > 0.5;
  if (mir && P.y < -0.01) discard;
  vec3 Pm = mir ? vec3(P.x, -P.y, P.z) : P;
  vec3 dv = Pm - CAM.xyz; float dist = length(dv); vec3 V = dv / dist;
  if (mir) V.y = -V.y;
  int m = int(vA.x + 0.5);
  vec3 N = normalize(vN); if (dot(N, V) > 0.) N = -N;
  vec3 alb = vec3(0.5), emi = vec3(0.); float F0 = 0.04, rough = 0.6, occ = 1., spk = 1., wetS = 0.; bool metal = false;
  if (P.z < -9.35 && P.y < 7.25 && P.z > -14.2) occ = 0.3 + 0.25 * smoothstep(-12., -9.4, P.z);
  bool pl = false;
//@M
  if (m == 0) {
    // black lacquer over planking: near-black, mirror-glossy, the planks making the highlights waver
    float uh = vL.x / 5.4, gs = 0.36 + 0.62 * pow(max(uh, 0.), 2.6) + 0.8 * pow(max(-uh, 0.), 2.8);
    float sc = texture(uN, vL.xz * vec2(0.12, 0.5) + vL.y * 0.3).r;
    alb = vec3(0.005, 0.0052, 0.006) * (0.8 + 0.5 * sc);
    rough = 0.05 + 0.06 * sc; F0 = 0.06; spk = 1. + 0.8 * smoothstep(gs - 0.22, gs - 0.06, vL.y); pl = true;
    // the flank rolls toward the gunwale, so a long soft band of sky lies under it; the turn of the bilge faces the water
    float fl = smoothstep(gs - 0.34, gs - 0.14, vL.y) * smoothstep(gs + 0.005, gs - 0.05, vL.y);
    N = normalize(N + vec3(0., 0.9 * fl - 0.45 * smoothstep(gs - 0.5, gs - 0.8, vL.y), 0.));
    float pw = texture(uN, vec2(vL.x * 0.031, vL.y * 1.3 + vL.z * 0.4)).g - 0.5;
    N = normalize(N + vec3(0., pw * 0.07 + 0.012 * sin(vL.y * 31. + pw * 4.), 0.));
    alb = mix(alb, vec3(0.045, 0.055, 0.035), smoothstep(0.07, -0.02, P.y) * 0.6);
    rough = mix(rough, 0.3, smoothstep(0.07, -0.02, P.y));
    if (fract(vI.z) > 0.5 && abs(vL.y - gs + 0.105) < 0.007 && abs(uh) < 0.78 && abs(vL.z) > 0.2) { metal = true; alb = vec3(0.78, 0.56, 0.24); rough = 0.22; }
  }
//@M
  if (m == 1) {
    // the polished steel ferro, its blade very slightly dished so the light runs across it
    float w = texture(uN, vL.xy * vec2(1.3, 0.9) + 0.3).r;
    if (vA.z > 2.5) {
      float tw = fract(vL.y * 46. + vA.y * 3.);
      alb = vec3(0.24, 0.21, 0.16) * (0.55 + 0.6 * smoothstep(0.1, 0.5, tw) * smoothstep(0.95, 0.6, tw)) * (0.8 + 0.4 * w);
      alb *= mix(0.6, 1., smoothstep(0.1, 0.3, P.y)); rough = 0.9; F0 = 0.03; spk = 0.3;
    } else if (vA.z > 1.5) { metal = true; alb = vec3(0.62, 0.45, 0.2) * (0.75 + 0.4 * w); rough = 0.22; }
    else {
      metal = true; pl = true; alb = vec3(0.42, 0.43, 0.45); rough = 0.05;
      N = normalize(N + vec3(0., (vL.y - 1.5) * 0.9, 0.));
    }
  }
//@M
  if (m == 2) {
    float ty = floor(vI.z + 0.001), sh = mod(fract(vI.z), 0.5);
    if (ty > 2.5) discard;
    alb = ty < 0.5 ? vec3(0.010, 0.014, 0.042) : ty < 1.5 ? vec3(0.012, 0.03, 0.10) : vec3(0.012, 0.012, 0.014);
    alb *= 0.85 + 0.35 * sh;
    float uu = vA.y * 0.59 - 0.405, w = vA.z, aw = abs(w), cd = 1., cs = 0.;
    const float CU[6] = float[6](-0.372, -0.312, -0.19, -0.1, 0.02, 0.13);
    for (int k = 0; k < 6 + uZ; k++) { float dd = uu - CU[k]; if (abs(dd) < cd) { cd = abs(dd); cs = dd; } }
    vec2 tq = vec2(uu * 60., w * 3.) + sh * 9.;
    vec2 g = vec2(texture(uN, tq * 0.05 + vec2(0.01, 0.)).r - texture(uN, tq * 0.05 - vec2(0.01, 0.)).r, texture(uN, tq * 0.05 + vec2(0., 0.01)).r - texture(uN, tq * 0.05 - vec2(0., 0.01)).r);
    // creases pulled across the cover by each cord, folds gathering at the hem between the ties, a general crumple
    float nz = texture(uN, vec2(uu * 3., w * 0.7 + sh)).r;
    float foldC = sin(w * 14. + nz * 6.) * exp(-cd * cd / 0.0006) * (1. - exp(-cd * cd / 0.00002));
    float foldH = sin(uu * 110. + nz * 5.) * smoothstep(0.75, 1.02, aw) * smoothstep(0.004, 0.03, cd);
    float foldL = sin(w * 9. + uu * 40. + nz * 4.) * 0.5;
    N = normalize(N + vec3(g.y, 0., g.x) * 0.04 + vec3(foldL * 0.1, 0., foldC * 0.3 + foldH * 0.2));
    float wet = smoothstep(0.6, 0.8, fbm(vec2(uu * 4., w * 0.35) + sh));
    alb *= mix(1., 0.8, wet) * (0.92 + 0.16 * nz); rough = mix(0.92, 0.6, wet); F0 = 0.025; spk = 0.6;
    float pool = smoothstep(0.58, 0.66, texture(uN, vec2(uu * 7., w * 1.3) + sh * 3.).g) * smoothstep(0.75, 0.3, aw) * smoothstep(0.05, 0.02, cd) * step(0.008, cd);
    N = normalize(mix(N, vec3(0., 1., 0.), pool * 0.85)); alb *= 1. - 0.5 * pool; rough = mix(rough, 0.2, pool); spk = mix(spk, 0.8, pool);
    emi = vec3(0.35, 0.42, 0.65) * alb * pow(1. - abs(dot(N, V)), 3.) * AMBU.rgb * 6.;
    if (cd < 0.0024 && aw < 1.08) {
      alb = vec3(0.30, 0.28, 0.24) * (0.85 + 0.2 * smoothstep(0.2, 0.8, abs(fract(w * 22.) - 0.5) * 2.)); rough = 0.85; F0 = 0.03; spk = 0.3; emi = vec3(0.);
      N = normalize(N + vec3(0., 0., -cs / 0.0024 * 0.9));
    }
  }
//@M
  if (m == 3) {
    float wd = smoothstep(0.4, 0.6, vA.y);
    vec3 wood = vec3(0.10, 0.052, 0.026) * (0.7 + 0.6 * texture(uN, vec2(vL.x * 0.05, vL.z * 1.6)).r);
    wood *= mix(0.55, 1., smoothstep(0.0, 0.04, abs(fract(vL.z * 7.) - 0.5) * 2. - 0.02));
    float dw = texture(uN, vL.xz * vec2(0.03, 0.09)).r;
    alb = mix(vec3(0.006), wood, wd); rough = mix(0.07 + 0.08 * dw, 0.2, wd); F0 = 0.05; spk = mix(0.16 + 0.2 * dw, 0.7, wd); pl = wd < 0.5;
  }
//@M
  if (m == 4) {
    float top = vA.y, code = floor(vA.z * 0.5), ang = vA.z - code * 2., ci = mod(code, 4.), gild = step(3.5, code);
    vec3 sc = ci < 0.5 ? vec3(0.025, 0.08, 0.34) : ci < 1.5 ? vec3(0.40, 0.035, 0.03) : vec3(0.035, 0.16, 0.07);
    float s = fract(ang * 2. + P.y * 0.5);
    float wear = fbm(vec2(ang * 1.1 + P.x, P.y * 0.13)), gr = texture(uN, vec2(ang * 0.9 + P.z * 0.3, P.y * 0.05)).r;
    vec3 paint = mix(vec3(0.50, 0.49, 0.45), sc, smoothstep(0.47, 0.53, s)) * (0.72 + 0.45 * gr);
    vec3 wood = vec3(0.17, 0.15, 0.12) * (0.5 + 0.9 * gr);
    alb = ci > 2.5 ? wood : mix(paint, wood, smoothstep(0.5, 0.64, wear + 0.3 * smoothstep(top - 0.6, 0.8, P.y)));
    float band = 1.2 + (wear - 0.5) * 0.3;
    alb = mix(alb, wood * 0.55, smoothstep(band, band - 0.15, P.y));
    alb = mix(alb, vec3(0.03, 0.045, 0.028), smoothstep(0.38, 0.12, P.y + (wear - 0.5) * 0.15));
    if (ci < 2.5) alb = mix(alb, mix(sc * 0.8, wood, smoothstep(0.45, 0.7, wear)), step(top - 0.4, P.y));
    rough = 0.6;
    if (gild > 0.5 && P.y > top - 0.4) { metal = true; alb = vec3(0.75, 0.55, 0.22) * (0.7 + 0.4 * gr); rough = 0.3; }
  }
//@M
  if (m == 5) {
    vec2 sp = vec2(abs(N.x) > 0.5 ? P.z : P.x, P.y);
    alb = vec3(0.50, 0.48, 0.44) * (0.7 + 0.38 * fbm(P.xz * 0.5 + P.y * vec2(0.3, 0.7)));
    if (abs(N.y) < 0.5) {
      alb *= 0.78 + 0.3 * texture(uN, sp * vec2(0.11, 0.07)).r;
      if (m == 5 && P.y < 0.87 && abs(P.x) > 1.59 && P.z < 0.1) {
        float bx = floor(P.x / 1.25 + floor((P.y + 3.) / 0.5) * 0.5), hb = h21(vec2(bx, floor((P.y + 3.) / 0.5)));
        alb = vec3(0.19, 0.175, 0.155) * (0.6 + 0.6 * hb) * (0.7 + 0.5 * fbm(P.xy * vec2(0.3, 0.9)));
        float fx = fract(P.x / 1.25 + floor((P.y + 3.) / 0.5) * 0.5), fy = fract((P.y + 3.) / 0.5);
        alb *= mix(0.45, 1., smoothstep(0.004, 0.02, min(min(fx, 1. - fx) * 1.25, min(fy, 1. - fy) * 0.5)));
      } else if (m == 5) {
        if (abs(P.x) < 1.58 && P.z > 0.) alb *= 0.5;
        float along = abs(N.z) > abs(N.x) ? P.x : P.z, ry = floor((P.y + 3.) / 0.36);
        float fx = fract((along + h21(vec2(ry, 1.)) * 1.1) / 1.1), fy = fract((P.y + 3.) / 0.36);
        float e = min(min(fx, 1. - fx) * 1.1, min(fy, 1. - fy) * 0.36);
        alb *= mix(0.5, 1., smoothstep(0.004, 0.014, e));
      }
    } else if (abs(P.x) < 1.6 && P.z > 0.) {
      float fz = fract((P.z - 0.03) / 0.3), st = floor((P.z - 0.03) / 0.3), sw = h21(vec2(st, 4.));
      N = normalize(N + vec3(0., 0., 1.) * smoothstep(0.8, 1., fz) * 0.8);
      float c0 = -0.7 + 0.5 * h21(vec2(st, 31.)), c1 = 0.2 + 0.7 * h21(vec2(st, 32.)), bk = P.x < c0 ? 0. : P.x < c1 ? 1. : 2.;
      float hb = h21(vec2(st * 3. + bk, 17.)), jd = min(abs(P.x - c0), abs(P.x - c1));
      alb *= vec3(0.6, 0.6, 0.585) * (0.72 + 0.3 * hb) * (0.78 + 0.3 * texture(uN, P.xz * vec2(0.6, 1.4) + sw).r);
      alb *= mix(0.3, 1., smoothstep(0.003, 0.012, jd)) * (0.8 + 0.2 * smoothstep(0.01, 0.08, jd));
      alb *= mix(0.55, 1., smoothstep(0.0, 0.14, fz)) * (0.86 + 0.24 * texture(uN, P.xz * 3.1).a);
    }
    if (m == 5 && P.y > 0.86 && P.z < 0.1 && abs(P.x) > 1.58) {
      // Istrian kerb: long blocks, fine pale grain, the front arris rounded and polished by ropes and feet, grime in
      // the joints and against the paving, black lichen specks, a rust stain spreading from the iron ring
      float kb = floor(P.x / 1.45), kx = fract(P.x / 1.45) * 1.45, kh = h21(vec2(kb, 13.));
      alb = vec3(0.47, 0.455, 0.42) * (0.7 + 0.3 * kh) * (0.7 + 0.55 * texture(uN, P.xz * 0.021).r) * (0.8 + 0.22 * fbm(P.xz * vec2(0.25, 1.2) + kh * 3.)) * (0.9 + 0.14 * texture(uN, P.xz * vec2(4.3, 5.1)).a);
      alb *= mix(0.4, 1., smoothstep(0.003, 0.016, min(kx, 1.45 - kx)));
      if (N.y > 0.5) {
        N = normalize(N + vec3(0., 0., 1.) * smoothstep(-0.06, 0.02, P.z) * 1.4);
        alb *= mix(0.62, 1., smoothstep(-0.44, -0.33, P.z));
      } else alb *= 0.75 + 0.25 * smoothstep(0.88, 1.02, P.y);
      alb *= 1. - 0.6 * smoothstep(0.78, 0.86, texture(uN, P.xz * 2.7 + 5.).a) * smoothstep(0.4, 0.7, fbm(P.xz * 0.6));
      float rs = length((P.xz - vec2(1.98, -0.18)) * vec2(1., 1.6)) + (texture(uN, P.xz * 1.3).r - 0.5) * 0.12;
      alb = mix(alb, vec3(0.30, 0.16, 0.07), smoothstep(0.3, 0.08, rs) * 0.65 * MISC.z);
    }
    float wl = P.y + (fbm(P.xz * 0.6 + P.y * 0.2) - 0.5) * 0.14;
    float drip = texture(uN, vec2((P.x + P.z) * 2.2, P.y * 0.12)).g;
    alb = mix(alb, alb * 0.55, smoothstep(0.85, 0.4, wl - (drip - 0.5) * 0.25));
    // old tide lines: thin dark bands of dried weed, each a little ragged
    float tl = fract(wl * 6.5 + (drip - 0.5) * 0.6);
    alb *= 1. - 0.35 * exp(-(tl - 0.5) * (tl - 0.5) / 0.004) * smoothstep(1.05, 0.5, wl) * smoothstep(0.15, 0.35, wl);
    alb = mix(alb, vec3(0.042, 0.062, 0.032), smoothstep(0.34, 0.12, wl));
    alb = mix(alb, vec3(0.075, 0.17, 0.04) * (0.7 + 0.6 * drip), smoothstep(0.13, 0.03, wl) * smoothstep(-0.12, 0.0, wl));
    alb = mix(alb, vec3(0.055, 0.09, 0.04), smoothstep(0.0, -0.15, wl));
    rough = mix(0.7, 0.16, smoothstep(0.7, 0.2, wl)); F0 = 0.035;
    if (m == 5 && N.y > 0.5 && abs(P.x) < 1.6 && P.z > 0.) {
      float tread = exp(-P.x * P.x * 1.2);
      alb *= 1. + 0.12 * tread; rough = min(rough, mix(rough, 0.3, tread));
    }
  }
//@M
  if (m == 6) {
    vec2 xz = P.xz; float row = floor(xz.y / 0.34), SL = 0.46 + 0.36 * h21(vec2(row, 3.)), off = h21(vec2(row, 7.)) * SL;
    vec2 cell = vec2(floor((xz.x + off) / SL), row);
    vec2 f = vec2(fract((xz.x + off) / SL) * SL, fract(xz.y / 0.34) * 0.34);
    float ex = min(f.x, SL - f.x), ez = min(f.y, 0.34 - f.y), e = min(ex, ez), hc = h21(cell);
    // trachyte slabs worn by centuries of feet: chipped arrises, a polished crown, pitting, a pale grit in the joints
    float chip = texture(uN, xz * 1.9 + hc * 5.).a;
    float jn = smoothstep(0.003, 0.013 + 0.02 * smoothstep(0.55, 0.8, chip), e);
    float pit = smoothstep(0.62, 0.8, texture(uN, xz * 5.3 + hc).a) * 0.35;
    alb = vec3(0.10, 0.098, 0.094) * mix(vec3(1.), vec3(1.06, 1.0, 0.92), h21(cell + 9.)) * (0.62 + 0.7 * hc) * (0.86 + 0.24 * fbm(xz * 0.9 + hc)) * (0.9 + 0.2 * texture(uN, xz * 0.25).b);
    alb *= (1. - pit) * (1. + 0.18 * smoothstep(0.02, 0.15, e));
    alb = mix(vec3(0.035, 0.033, 0.03) * (0.7 + 0.6 * texture(uN, xz * 3.).g), alb, jn);
    vec2 gd = ex < ez ? vec2(f.x < SL * 0.5 ? -1. : 1., 0.) : vec2(0., f.y < 0.17 ? -1. : 1.);
    vec2 tilt = (vec2(h21(cell + 3.1), h21(cell + 5.7)) - 0.5) * 0.06;
    N = normalize(N + vec3(tilt.x + gd.x * (1. - smoothstep(0., 0.02, e)) * 0.22, 0., tilt.y + gd.y * (1. - smoothstep(0., 0.02, e)) * 0.22));
    float pud = smoothstep(0.56, 0.64, fbm(xz * 0.28 + 3.) + (1. - jn) * 0.12 + hc * 0.08);
    rough = mix(mix(0.34, 0.08, WX.x), 0.03, pud); F0 = 0.03 + 0.02 * WX.x; alb *= mix(1., 0.72, pud) * (1. - 0.45 * WX.x); spk = 1. + 0.8 * WX.x; wetS = WX.x * (0.5 + pud);
  }
//@M
  if (m == 7) {
    alb = vec3(0.018, 0.023, 0.02) * (0.8 + 0.4 * texture(uN, P.xz * 2. + P.y).r); rough = 0.38; F0 = 0.05;
  }
//@M
  if (m == 8) {
    float fr = abs(fract(vA.y * 6.) - 0.5) * 2.;
    if (fr > 0.88) { alb = vec3(0.02); rough = 0.4; }
    else { alb = vec3(0.03); float core = exp(-fr * fr * 5.) * smoothstep(0.05, 0.45, vA.z) * smoothstep(1.0, 0.55, vA.z);
      emi = LAMPC.rgb * LAMPC.w * (0.9 + 0.8 * smoothstep(0.0, 0.4, vA.z) + 4.5 * core); }
  }
//@M
  if (m == 10) {
    float bid = floor((P.x + 1.8) / 14.4), hb = h21(vec2(bid, 2.)), Ht = 14.5 + 5. * hb;
    float cx = (bid + 0.5) * 14.4 - 1.8 + (h21(vec2(bid, 4.)) - 0.5) * 9.;
    float chim = step(abs(P.x - cx), 0.28 + 0.25 * smoothstep(Ht + 1.4, Ht + 1.9, P.y)) * step(P.y, Ht + 2.1) * step(0.35, hb);
    if (P.y > Ht && chim < 0.5) discard;
    float xp = P.x - 3.6 * floor(P.x / 3.6 + 0.5);
    if (abs(xp) < 1.45 && P.y < 5.3 + sqrt(max(1.45 * 1.45 - xp * xp, 0.))) discard;
    float hc = h21(vec2(bid, 5.));
    vec3 pl = hc < 0.3 ? vec3(0.46, 0.30, 0.26) : hc < 0.55 ? vec3(0.50, 0.39, 0.25) : hc < 0.8 ? vec3(0.55, 0.52, 0.47) : vec3(0.42, 0.20, 0.15);
    alb = pl * (0.75 + 0.4 * fbm(P.xy * vec2(0.15, 0.08) + bid));
    alb *= 0.8 + 0.2 * texture(uN, vec2(P.x * 0.6, P.y * 0.03)).r;
    float st = step(abs(P.y - 7.15), 0.14) + step(Ht - 0.35, P.y) * step(P.y, Ht);
    float ap = abs(P.y - 5.3 - sqrt(max(1.45 * 1.45 - xp * xp, 0.))) < 0.22 && abs(xp) < 1.67 ? 1. : 0.;
    alb = mix(alb, vec3(0.56, 0.54, 0.5), clamp(st + ap, 0., 1.));
    float wx = P.x - 1.8 * floor(P.x / 1.8 + 0.5), wid = floor(P.x / 1.8 + 0.5);
    for (int r = 0; r < 3 + uZ; r++) {
      float y0 = 8.4 + float(r) * 3.4, y1 = y0 + (r == 2 ? 1.6 : 2.1);
      if (y1 > Ht - 0.6) break;
      float tp = y1 + 0.28 * (1. - abs(wx) / 0.42);
      if (abs(wx) < 0.52 && P.y > y0 - 0.1 && P.y < tp + 0.1) {
        if (abs(wx) < 0.42 && P.y > y0 && P.y < tp) {
          float hw = h21(vec2(wid, float(r) + bid * 7.));
          alb = hw < 0.28 ? vec3(0.09, 0.15, 0.11) * (0.7 + 0.3 * step(0.5, fract(P.y * 9.))) : vec3(0.02);
          if (hw > 0.9) emi = LAMPC.rgb * (0.35 + 0.4 * h21(vec2(wid, 11.))) * LAMPC.w * 0.5;
        } else alb = vec3(0.55, 0.53, 0.49);
      }
    }
    alb = mix(alb, alb * 0.6, smoothstep(2.5, 1.0, P.y));
    rough = 0.8; F0 = 0.03;
  }
//@M
  if (m == 12) {
    if (floor(vI.z + 0.001) < 2.5) discard;
    if (vA.y > 1.5) { alb = vec3(0.006); rough = 0.12; F0 = 0.06; pl = true; }
    else {
      // red damask cushions: a woven lozenge pattern, buttoned, velvet sheen at the turned edges
      vec2 dq = vec2(vL.x + vL.y, vL.z + vL.y) * 9.;
      float lz = abs(fract(dq.x + dq.y) - 0.5) + abs(fract(dq.x - dq.y) - 0.5);
      float mot = smoothstep(0.42, 0.36, lz) * (0.6 + 0.4 * smoothstep(0.2, 0.1, lz));
      alb = mix(vec3(0.24, 0.016, 0.026), vec3(0.34, 0.07, 0.03), mot) * (0.85 + 0.3 * texture(uN, vL.xz * 2.).r);
      vec2 bt = fract(vL.xz * 6.5) - 0.5; float btn = exp(-dot(bt, bt) * 300.);
      alb *= 1. - 0.5 * btn; N = normalize(N - vec3(bt.y, 0., bt.x) * btn * 1.5);
      rough = 0.85; F0 = 0.03; spk = 0.5;
      emi = vec3(0.5, 0.12, 0.1) * pow(1. - abs(dot(N, V)), 3.) * AMBU.rgb * 0.18;
    }
  }
//@M
  if (m == 14) {
    // hemp mooring lines, darker and wet where they dip toward the water
    float ta = dot(P, vec3(1., 0.9, 1.1)) * 38., tw = fract(ta), tf = 1. - smoothstep(0.25, 0.6, fwidth(ta));
    alb = vec3(0.30, 0.27, 0.21) * (0.7 + 0.35 * mix(0.45, smoothstep(0.2, 0.5, tw) * smoothstep(0.9, 0.6, tw), tf)) * (0.8 + 0.4 * texture(uN, P.xz * 1.7).r);
    alb *= mix(0.55, 1., smoothstep(0.35, 0.9, P.y));
    rough = 0.85; F0 = 0.03; spk = 0.4;
  }
//@M
  if (m == 13) {
    alb = vec3(0.22, 0.19, 0.16) * (0.7 + 0.5 * fbm(P.xy * 0.2 + P.z * 0.1));
    if (N.y < -0.5) alb *= mix(1., 0.35, step(fract(P.x / 1.2), 0.16));
    else if (abs(N.z) > 0.5) {
      float xp = P.x - 3.6 * floor(P.x / 3.6 + 0.5), bay = floor(P.x / 3.6 + 0.5);
      if (abs(xp) < 1.1 && P.y > 1.25 && P.y < 3.7) {
        float hb = h21(vec2(bay, 21.)), mull = step(0.06, abs(fract(xp * 1.2 + 0.5) - 0.5)) * step(0.06, abs(fract(P.y * 1.1) - 0.5));
        alb = vec3(0.03);
        if (hb > 0.35) emi = vec3(1., 0.66, 0.36) * (0.5 + 0.6 * hb) * mull * (0.7 + 0.3 * smoothstep(3.7, 1.5, P.y)) * LAMPC.w * 0.42;
      }
    }
    rough = 0.85;
  }
//@M
  if (m == 9) {
    alb = vec3(0.58, 0.56, 0.52) * (0.7 + 0.35 * fbm(vec2(P.x * 3. + P.z * 3., P.y * 0.3))) * mix(0.6, 1., smoothstep(1.0, 2.2, P.y)); rough = 0.65; F0 = 0.035;
  }
//@M
  if (dot(N, V) > 0.) N = normalize(N - V * dot(N, V) * 1.01);
  // light: fog light from above and the water below, the lamps, the sun when it breaks through
  vec3 amb = mix(AMBD.rgb, AMBU.rgb, N.y * 0.5 + 0.5) * occ;
  float shin = clamp(2. / (rough * rough + 1e-3) - 2., 2., 3000.);
  vec3 ld = vec3(0.), ls = vec3(0.); float lw = 0.;
  int nl = mir ? 0 : int(MISC.y);
  for (int i = 0; i < nl; i++) {
    vec4 L = texelFetch(uD, ivec2(i, 1), 0);
    vec3 l = L.xyz - P; float d2 = dot(l, l), d = sqrt(d2); l /= d;
    float att = L.w * LAMPC.w / (d2 + 0.35) * exp(-FOGH.w * d * 0.7);
    ld += max(dot(N, l), 0.) * att;
    float nh = max(dot(N, normalize(l - V)), 0.);
    ls += pow(nh, shin) * att * (shin + 8.) / 25.; lw += pow(nh, 70.) * att;
  }
  ld *= LAMPC.rgb; ls *= LAMPC.rgb;
  vec3 sunL = SUNC.rgb * SUND.w * 1.7 * occ;
  vec3 Rr = reflect(V, N);
  vec3 env = mix(envR(P, Rr, pl && !mir, rough), (AMBU.rgb + AMBD.rgb) * 0.5, rough * 0.6);
  env *= occ;
  float F = (F0 + (1. - F0) * pow(1. - clamp(dot(-V, N), 0., 1.), 5.)) * spk;
  float ssp = pow(max(dot(Rr, SUND.xyz), 0.), shin) * (shin + 8.) / 25.;
  vec3 col;
  if (metal) col = alb * (env + ls + sunL * ssp + 0.06 * amb);
  else col = alb * (amb + sunL * max(dot(N, SUND.xyz), 0.) + ld) + F * (env * (1. - 0.6 * rough) + (ls + sunL * ssp) * (1. - 0.5 * rough));
  col += emi + LAMPC.rgb * lw * wetS * 1.6;
  if (P.y < 0.) col = mix(WBODY.rgb, col, exp(P.y * 2.2));
  // fog along the real path (for the mirror image, only the leg from the water to the surface)
  vec3 roF = CAM.xyz; float dF = dist;
  if (mir) { float fw = CAM.y / (CAM.y + P.y); roF = vec3(CAM.x + dv.x * fw, 0., CAM.z + dv.z * fw); dF = dist * (1. - fw); }
  col = fogged(col, roF, V, dF);
  o = vec4(col, dist / 256.);
}`,Ct=D0+pt+`
in vec3 vW; in vec3 vN; in vec3 vA; in vec3 vL; in vec4 vI;
uniform sampler2D uR; out vec4 o;
float hgt(vec2 q) { return textureLod(uN, q, 0.).b; }
vec2 grd(vec2 q, float e) { return vec2(hgt(q + vec2(e, 0.)) - hgt(q - vec2(e, 0.)), hgt(q + vec2(0., e)) - hgt(q - vec2(0., e))) / (2. * e); }
bool solid(vec3 s) {
  if (s.z < 0.02) return true;
  if (abs(s.x) < 1.6 && s.z < 3.9) return s.y < 1. - 0.17 * (floor(s.z / 0.3) + 1.);
  return false;
}
void main() {
  vec3 P = vW, dv = P - CAM.xyz; float dist = length(dv); vec3 V = dv / dist;
  vec2 q = P.xz; float t = CAM.w;
  float fade = 1. / (1. + dist * 0.07);
  vec2 g = vec2(0.);
  for (int i = 0; i < 3 + uZ; i++) {
    vec4 k = i == 0 ? vec4(0.011, 0.0008, 0.0005, 0.2) : i == 1 ? vec4(0.045, 0.0021, 0.0013, 0.03) : vec4(0.13, -0.0036, 0.0029, 0.007);
    g += grd(vec2(q.x * 0.4, q.y) * k.x + t * k.yz, 0.004) * vec2(0.4, 1.) * k.x * k.w;
  }
  g *= WBODY.w * fade;
  int nr = int(MISC.x);
  for (int i = 0; i < nr; i++) {
    vec4 r = texelFetch(uD, ivec2(i, 0), 0);
    float age = t - r.z; if (age < 0. || age > 10.) continue;
    vec2 d2 = q - r.xy; float rr = length(d2) + 1e-3;
    float x = rr - (0.1 + age * 0.62);
    float env = exp(-x * x * 1.5) * r.w * exp(-age * 0.3) / (1. + rr * 0.6);
    g += d2 / rr * env * cos(x * 21.) * 1.4 * (0.4 + 0.6 * fade);
  }
  if (WX.y > 0.) {
    vec2 cq = q * 1.7;
    for (int k = 0; k < 2 + uZ; k++) {
      vec2 ci = floor(cq), dd = fract(cq) - 0.5 - (vec2(h21(ci + 3.1), h21(ci + 5.3)) - 0.5) * 0.5;
      float ph = fract(t * 0.9 + h21(ci + float(k) * 17.)), rr = length(dd) + 1e-3, x = rr - ph * 0.45;
      g += dd / rr * exp(-x * x * 900.) * (1. - ph) * cos(x * 70.) * 0.5 * WX.y * fade;
      cq = cq * 1.63 + 3.3;
    }
  }
  vec3 N = normalize(vec3(-g.x, 1., -g.y));
  vec2 uv = gl_FragCoord.xy * RES.y + N.xz * vec2(0.35, 1.) * 0.24 * (0.45 + 0.55 * smoothstep(2.5, 8., dist)) / (1. + dist * 0.12), e = vec2(0.004, 0.012 + 0.05 * length(g)) / (1. + dist * 0.12);
  vec3 refl = texture(uR, clamp(uv, vec2(0.001), vec2(0.999))).rgb * 0.5 + (texture(uR, clamp(uv + e, vec2(0.001), vec2(0.999))).rgb + texture(uR, clamp(uv - e, vec2(0.001), vec2(0.999))).rgb) * 0.25;
  float F = 0.03 + 0.97 * pow(1. - clamp(dot(-V, N), 0., 1.), 4.);
  vec3 body = WBODY.rgb * (0.85 + 0.3 * fbm(q * 0.05 + t * 0.002));
  vec3 under = body;
  if (P.z < 2.6 || (abs(P.x) < 3.2 && P.z < 5.5)) {
    vec3 rr = refract(V, N, 0.75); float tl = 0.;
    for (int i = 0; i < 14 + uZ; i++) {
      tl += 0.07 + float(i) * 0.012; vec3 s = P + rr * tl;
      if (solid(s)) {
        vec3 st = vec3(0.11, 0.16, 0.085) * (0.55 + 0.7 * fbm(s.xz * 0.6 + s.y * 0.3)) * AMBU.rgb;
        under = mix(body, st, exp(-tl * 2.3)); break;
      }
    }
  }
  vec3 col = mix(under, refl, F);
  col += SUNC.rgb * SUND.w * WX2.y * 9. * pow(max(dot(reflect(V, N), SUND.xyz), 0.), 1400.) * (0.4 + 0.6 * smoothstep(0.3, 0.7, texture(uN, q * 0.9 + t * 0.03).a));
  col = fogged(col, CAM.xyz, V, dist);
  o = vec4(col, -dist / 256.);
}`,Ot=D0+`
uniform sampler2D uT; uniform sampler2D uD; in vec2 vQ; out vec4 o;
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec4 s = texelFetch(uT, ip, 0);
  vec3 c = s.rgb;
  vec2 sp = gl_FragCoord.xy * RES.y;
  int nl = int(MISC.y);
  for (int i = 0; i < nl; i++) {
    vec4 L = texelFetch(uD, ivec2(i, 2), 0);
    if (L.w > 0.) {
      vec4 z = texelFetch(uT, ivec2(clamp(L.xy, 0., 0.999) * RES.x), 0);
      float vis = abs(z.a) * 256. < L.z * 0.0 + texelFetch(uD, ivec2(i, 3), 0).z - 0.6 ? 0.18 : 1.;
      float r = length(sp - L.xy) / L.z;
      c += LAMPC.rgb * L.w * vis * (0.9 * exp(-r * r * 7.) + 0.3 * exp(-r * 1.4) + 0.08 * exp(-r * 0.4) * clamp(0.22 / L.z, 0.3, 1.));
    }
    vec4 M = texelFetch(uD, ivec2(i + 12, 2), 0);
    if (M.w > 0. && s.a < 0.) {
      vec2 d = (sp - M.xy) / M.z; d.y *= 0.3;
      float r = length(d);
      c += LAMPC.rgb * M.w * (0.22 * exp(-r * r * 6.) + 0.06 * exp(-r * 1.2));
    }
  }
  c *= RES.z;
  if (WX.y > 0.) {
    float cl = floor(sp.x * 260. + sp.y * 26.), hr = fract(sin(cl * 12.9898) * 43758.5453);
    float ph = fract(sp.y * (1.6 + hr) + CAM.w * (1.3 + hr) + hr * 7.);
    c += FOGZ.rgb * 0.05 * WX.y * smoothstep(0.93, 0.99, ph) * step(0.55, hr);
  }
  c = clamp(c * (2.51 * c + 0.03) / (c * (2.43 * c + 0.59) + 0.14), 0., 1.);
  vec2 v = sp - 0.5; c *= 1. - 0.075 * dot(v, v);
  c = pow(c, vec3(1. / 2.2));
  uint h = uint(ip.x) * 1973u + uint(ip.y) * 9277u; h = (h ^ (h >> 13)) * 1274126177u; h ^= h >> 16;
  c += (float(h & 255u) / 255. - 0.5) / 180.;
  o = vec4(c, 1.);
}`,mt=()=>({v:[],i:[]}),b0=(t,o,s,r,i,h)=>(t.v.push(o[0],o[1],o[2],s[0],s[1],s[2],r,i,h),t.v.length/9-1),S0=(t,o)=>[t[0]-o[0],t[1]-o[1],t[2]-o[2]],j0=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]],z0=t=>{const o=Math.hypot(t[0],t[1],t[2]);return o>1e-9?[t[0]/o,t[1]/o,t[2]/o]:[0,1,0]},d0=(t,o,s,r,i,h)=>{const l=[],m=[],a=o+1,p=t.v.length/9;for(let d=0;d<=s;d++)for(let f=0;f<=o;f++)l.push(r(f,d)),m.push([0,0,0]);for(let d=0;d<s;d++)for(let f=0;f<o;f++){const n=d*a+f,v=n+1,b=n+a+1,w=n+a,c=j0(S0(l[b],l[n]),S0(l[w],l[v]));for(const u of[n,v,b,w])m[u][0]+=c[0],m[u][1]+=c[1],m[u][2]+=c[2];t.i.push(p+n,p+v,p+b,p+n,p+b,p+w)}for(let d=0;d<l.length;d++){const f=h?h(d%a,d/a|0):[0,0];b0(t,l[d],z0(m[d]),i,f[0],f[1])}},Y=(t,o,s,r,i,h,l=[0,0])=>{const m=z0(j0(S0(r,o),S0(i,s))),a=b0(t,o,m,h,l[0],l[1]);b0(t,s,m,h,l[0],l[1]),b0(t,r,m,h,l[0],l[1]),b0(t,i,m,h,l[0],l[1]),t.i.push(a,a+1,a+2,a,a+2,a+3)},W=(t,o,s,r,i,h,l,m,a)=>{Y(t,[o,h,r],[i,h,r],[i,h,l],[o,h,l],m,a),Y(t,[o,s,l],[i,s,l],[i,h,l],[o,h,l],m,a),Y(t,[o,s,r],[i,s,r],[i,h,r],[o,h,r],m,a),Y(t,[o,s,r],[o,s,l],[o,h,l],[o,h,r],m,a),Y(t,[i,s,r],[i,s,l],[i,h,l],[i,h,r],m,a)},j=(t,o,s,r,i,h=0,l=0)=>{const m=o.length,a=o.reduce((d,f)=>d+f[0],0)/m,p=o.reduce((d,f)=>d+f[1],0)/m;for(const d of[-r/2,r/2]){const f=[0,0,Math.sign(d)],n=b0(t,s(a,p,d),f,i,h,l===1?0:l);for(let v=0;v<m;v++)b0(t,s(o[v][0],o[v][1],d),f,i,h,l);for(let v=0;v<m;v++)t.i.push(n,n+1+v,n+1+(v+1)%m)}for(let d=0;d<m;d++){const f=o[d],n=o[(d+1)%m];Y(t,s(f[0],f[1],-r/2),s(n[0],n[1],-r/2),s(n[0],n[1],r/2),s(f[0],f[1],r/2),i,[h,l])}},u0=(t,o,s,r,i,h)=>d0(t,s,o.length-1,(l,m)=>{const a=l/s*p0,p=o[m];return r(p[0]*Math.cos(a),p[1],p[0]*Math.sin(a))},i,h||(l=>[l/s,0])),Ee=()=>{const t=mt(),o=5.4,s=64,r=c=>-Math.cos(Math.PI*c/s),i=c=>.7*Math.pow(Math.max(1-Math.pow(Math.abs(c),1.9),0),.85)*(1-.12*Math.max(c,0)*Math.max(c,0)),h=c=>-.07*(1-c*c),l=c=>.36+.62*Math.pow(Math.max(c,0),2.6)+.8*Math.pow(Math.max(-c,0),2.8),m=c=>-.22+.55*Math.pow(Math.abs(c),3),a=(c,u)=>c*(u<0?1.08:.92),p=(c,u)=>c*o+Math.sign(c)*Math.pow(Math.abs(c),8)*Math.max(u-m(c),0)*(c>0?.5:.32);d0(t,s,14,(c,u)=>{const x=r(c),y=(u/14-.5)*Math.PI,P=Math.sin(y),A=m(x)+(l(x)-m(x))*(1-Math.cos(y));return[p(x,A),A,h(x)+Math.sign(P)*a(i(x),P)*Math.pow(Math.abs(P),.55)]},0);const d=c=>t0(-.4,-.34,c)*(1-t0(.12,.18,c));d0(t,s,8,(c,u)=>{const x=r(c),y=u/4-1,P=d(x),A=(l(x)+.008+.075*Math.pow(1-y*y,.7))*(1-P)+.1*P;return[p(x,l(x)),A,h(x)+y*a(i(x),y)*(1-.13*P)]},3,(c,u)=>[d(r(c)),u/8]);for(const c of[-1,1])d0(t,s,4,(u,x)=>{const y=r(u),P=a(i(y),c),A=l(y),S=Math.min(1,P*6),V=[A-.075,A-.04,A-.012,A+.01,A+.022][x];return[p(y,V),V,h(y)+c*(P+[.004,.024,.03,.022,.002][x]*S)]},0);const f=(c,u,x)=>Math.exp(-((c-u)/x)*((c-u)/x)),n=[-.372,-.312,-.19,-.1,.02,.13],v=60;d0(t,v,16,(c,u)=>{const x=-.405+.59*c/v,y=(u/8-1)*1.12,P=Math.abs(y),A=Math.pow(Math.sin(Math.PI*c/v),.35);let S=0;for(const y0 of n)S=Math.max(S,f(x,y0,.011));const V=(.05+.27*f(x,-.283,.024)+.12*f(x,-.232,.045)+.07*f(x,-.075,.035)+.085*f(x,.098,.035))*A,s0=Math.pow(Math.max(1-y*y,0),.8),A0=P<=1?l(x)+.02+V*s0-.03*S*Math.pow(Math.max(1-y*y,0),.3):l(x)+.02-(P-1)*1.15*A*(.7+.45*S);return[x*o,A0,h(x)+Math.sign(y)*(a(i(x),y)*Math.min(P,1)*1.03+Math.max(P-1,0)*.12)]},2,(c,u)=>[c/v,(u/8-1)*1.12]);const b=(c,u,x,y,P,A,S)=>d0(t,10,8,(V,s0)=>{const A0=Math.PI*V/10,y0=p0*s0/8,C0=O0=>Math.sign(O0)*Math.pow(Math.abs(O0),.35),et=Math.sin(A0);return[c+y*C0(Math.cos(A0)),u+P*C0(et*Math.sin(y0)),x+A*C0(et*Math.cos(y0))]},12,()=>[S,0]);W(t,-1.5,.1,-.5,-.95,.29,.38,12,[2,0]),W(t,-1.62,.1,-.52,-1.5,.78,.4,12,[2,0]),b(-1.22,.34,-.06,.28,.065,.42,1),b(-1.45,.55,-.06,.055,.19,.4,1);for(const c of[-.36,.28])W(t,-.55,.1,c-.12,-.25,.24,c+.12,12,[2,0]),b(-.4,.28,c,.16,.05,.13,1);W(t,.36,.1,-.36,.7,.24,.24,12,[2,0]),b(.53,.28,-.06,.18,.05,.29,1);const w=(c,u,x)=>[5.33+c,.8+u,x];j(t,[[0,0],[.085,0],[.12,.33],[.14,.6],[0,.6],[.045,.34]],w,.01,1);for(let c=0;c<6;c++){const u=.13+c*.085,x=.075+.06*u/.68;j(t,[[x,u],[.3,u+.002],[.306,u+.016],[.3,u+.03],[x,u+.032]],w,.01,1)}j(t,[[.06,.555],[-.11,.558],[-.12,.571],[-.11,.584],[.06,.587]],w,.01,1),j(t,[[.085,.11],[.15,.11],[.215,.05],[.235,-.03],[.195,-.025],[.14,.04]],w,.01,1),j(t,[[.235,.585],[.305,.585],[.306,.672],[.235,.672]],w,.01,1),j(t,[[.03,.585],[.125,.585],[.125,.672],[0,.672]],w,.01,1),j(t,[[.306,.67],[.312,.8],[.312,.93],[.302,.985],[.24,.968],[.16,.93],[.08,.868],[.025,.79],[-.004,.71],[0,.67],[.125,.67],[.142,.698],[.18,.716],[.218,.698],[.235,.67]],w,.01,1);for(const c of[-1,1]){const u=-.07+c*(c<0?1.08:.92)*.58;j(t,[[0,0],[.07,0],[.06,.05],[.1,.11],[.085,.18],[.03,.205],[-.005,.17],[.035,.13],[.025,.06]],(x,y,P)=>[-2.36+x,.425+y,u+P],.022,1,0,2)}u0(t,[[0,0],[.03,.01],[.034,.035],[.02,.06],[0,.07]],8,(c,u,x)=>[-5.62+c,1.37+u,x],1,()=>[0,2]);for(const[c,u,x]of[[.42,.632,0],[-.85,.63,0],[.42,-.88,0],[-.85,-.882,0],[2.6,.494,.09],[2.6,-.688,.09]])u0(t,[[0,.06],[.04,.07],[.056,.11],[.058,.26],[.045,.33],[0,.345]],8,(y,P,A)=>[c+y,P+x,u+A],1,(y,P)=>[y/8,3+P*.01]);for(let c=0;c<14;c++){const u=S=>{const V=-1.2+S*4.2,s0=.15-.09*S;return[-5.74-s0*Math.cos(V)*.9,1.24+s0*Math.sin(V)]},x=u(c/14),y=u((c+1)/14),P=z0([y[1]-x[1],x[0]-y[0],0]),A=.022;j(t,[[x[0]-P[0]*A,x[1]-P[1]*A],[y[0]-P[0]*A,y[1]-P[1]*A],[y[0]+P[0]*A,y[1]+P[1]*A],[x[0]+P[0]*A,x[1]+P[1]*A]],(S,V,s0)=>[S,V,s0],.05,0)}return j(t,[[-5.62,1],[-5.52,1],[-5.6,1.14],[-5.72,1.12]],(c,u,x)=>[c,u,x],.05,0),j(t,[[0,0],[.13,0],[.17,.18],[.1,.3],[.19,.46],[.13,.56],[.03,.52],[.07,.36],[-.02,.2]],(c,u,x)=>[-3.7+c,.56+u,.42+x],.06,3,1),t},Gt=(t,o)=>{let s=(Math.imul(t+32768,1597334677)^Math.imul(o+32768,-482951495))>>>0;return s=Math.imul(s^s>>>16,-2048144777)>>>0,s^=s>>>13,(s&16777215)/16777216},Ne=()=>{const t=mt();for(const[a,p]of[[-90,-1.6],[1.6,90]])W(t,a,.88,-.45,p,1.03,.02,5),Y(t,[a,-3,.02],[p,-3,.02],[p,.88,.02],[a,.88,.02],5);W(t,-1.6,-3,-.46,1.6,.995,0,5);for(let a=0;a<13;a++){let p=-1.6;const d=[-.7+.5*Gt(a,31),.2+.7*Gt(a,32),1.6];for(let f=0;f<3;f++){const n=d[f],v=(G(a*5+f*7)-.5)*.022-.006*f*G(a+40);W(t,p,-3,.3*a,n,1-.17*(a+1)+v,.3*(a+1)+.03,5),p=n}}const o=t.i.length;Y(t,[-90,1,-14.5],[90,1,-14.5],[90,1,-.45],[-90,1,-.45],6);const s=[[.21,0],[.21,.1],[.17,.14],[.155,.42],[.105,.5],[.09,.6],[.12,.64],[.12,.7],[.07,.77],[.062,1],[.05,2.86],[.075,2.9],[.085,2.95],[.085,3.02],[.05,3.06],[.08,3.1],[.11,3.13]],r=(a,p,d,f)=>{u0(t,[[.11*f,3.13*f],[.18*f,3.55*f]].map(n=>[n[0],n[1]-3.13*f]),6,(n,v,b)=>[a+n,p+v,d+b],8,(n,v)=>[n/6,v]),u0(t,[[.06*f,0],[.22*f,.02*f],[.2*f,.07*f],[.06*f,.22*f],[.02*f,.32*f],[0,.33*f]],6,(n,v,b)=>[a+n,p+.42*f+v,d+b],7)};for(const a of xt){if(a[2]<-5){r(a[0],5.39,a[2],.8),W(t,a[0]-.012,5.95,a[2]-.012,a[0]+.012,6.75,a[2]+.012,7);continue}if(a[1]>4.5){if(r(a[0],4.55,a[2],.7),Z0)for(const p of[-1,1])W(t,a[0]-.02,4.32,a[2]+p*.05,a[0]+.02,4.35,a[2]+p*.42,7),r(a[0],4.36,a[2]+p*.42,.55);continue}if(u0(t,s,16,(p,d,f)=>[a[0]+p,1+d,a[2]+f],7),W(t,a[0]-.26,1,a[2]-.26,a[0]+.26,1.16,a[2]+.26,7),W(t,a[0]-.235,1.16,a[2]-.235,a[0]+.235,1.2,a[2]+.235,7),r(a[0],4.13,a[2],1),W(t,a[0]-.011,3.66,a[2]-.2,a[0]+.011,3.682,a[2]+.2,7),Z0)for(const p of[-1,1])W(t,a[0]-.02,3.78,a[2]+p*.05,a[0]+.02,3.82,a[2]+p*.5,7),r(a[0],3.84,a[2]+p*.5,.72)}const i=(a,p,d,f,n,v)=>{const b=[[.135,-3],[.135,0],[.13,1],[.118,d-.43],[.142,d-.41],[.142,d-.35],[.118,d-.33],[.108,d-.17],[.065,d-.045],[0,d]];u0(t,b,14,(w,c,u)=>[a+w+f*c,c,p+u+n*c],4,(w,c)=>[d,v*2+w/14])};for(const a of i0)i(a.x,a.z,a.top,a.lx,a.lz,a.col);for(let a=0;a<3;a++){const p=a*p0/3+.4,d=Math.cos(p)*.2,f=Math.sin(p)*.2;i(h0[0]+d*1.6,h0[1]+f*1.6,4.55,-d*.22,-f*.22,3)}W(t,h0[0]-.17,3.7,h0[1]-.17,h0[0]+.17,3.86,h0[1]+.17,7);const h=(a,p,d,f,n)=>{const v=z0(S0(p,a)),b=z0(j0(v,[0,1,0])),w=j0(b,v),c=.013;d0(t,14,4,(u,x)=>{const y=u/14,P=p0*x/4,A=d*4*y*(1-y);return[0,1,2].map(S=>a[S]+(p[S]-a[S])*y-(S===1?A:0)+c*(b[S]*Math.cos(P)+w[S]*Math.sin(P)))},14,u=>[f,1-u/14+2*n])};for(const a of vt)h(a.A,a.B,a.sag,a.gi,a.st),a.col&&u0(t,[[.142,-.04],[.15,0],[.15,.06],[.142,.1]],10,(p,d,f)=>[a.col[0]+p,a.col[1]-.03+d,a.col[2]+f],14,()=>[a.gi,0]);if(P0){const a=P0;d0(t,16,6,(p,d)=>{const f=p0*p/16,n=p0*d/6,v=.075+.014*Math.cos(n);return[a[0]+v*Math.cos(f),a[1]+.014*Math.sin(n)+.004,a[2]+v*Math.sin(f)*.98]},7),W(t,a[0]-.1,1.03,a[2]-.022,a[0]-.055,1.07,a[2]+.022,7)}const l=t.i.length;for(const a of[-9.3,-9.85])Y(t,[-90,1,a],[90,1,a],[90,22,a],[-90,22,a],10);Y(t,[-90,7.2,-14.2],[90,7.2,-14.2],[90,7.2,-9.85],[-90,7.2,-9.85],13),Y(t,[-90,1,-14.2],[90,1,-14.2],[90,7.2,-14.2],[-90,7.2,-14.2],13);const m=[[.4,1],[.4,1.16],[.33,1.22],[.29,1.32],[.27,1.45],[.26,3.2],[.235,4.62],[.27,4.72],[.31,4.8],[.4,5.05],[.42,5.18],[.42,5.32],[.2,5.33]];for(let a=-17;a<=16;a++){const p=1.8+3.6*a;u0(t,m,12,(d,f,n)=>[p+d,f,-9.575+n],9)}return t.rg=[[0,o],[o,l-o],[l,t.i.length-l]],t},F=e.__c572||(e.__c572=(()=>{const t=!!e.getExtension("EXT_color_buffer_float"),o=t||!!e.getExtension("EXT_color_buffer_half_float");e.getExtension("KHR_parallel_shader_compile");const s=(z,B)=>{const R=e.createShader(B);return e.shaderSource(R,z),e.compileShader(R),R},r=s(Re,e.VERTEX_SHADER),i=s(Pe,e.VERTEX_SHADER),h=e.getExtension("WEBGL_debug_renderer_info"),l=/Direct3D/i.test(e.getParameter(e.RENDERER)+" "+(h?e.getParameter(h.UNMASKED_RENDERER_WEBGL):"")),m=[0,1,2,3,12],a=[5],p=[4,6,7,8,14],d=[9,10,13],f=(z,B)=>{const R=ze.split("//@M");let T=R[0];for(let D=1;D<R.length-1;D++)z.includes(parseInt(R[D].match(/m == (\d+)/)[1],10))&&(T+=R[D]);return T+=R[R.length-1],B?T:T.replace(/\/\/ENV<[\s\S]*?\/\/ENV>/,"").replace("envR(P, Rr, pl && !mir, rough)","fogCol(Rr)")},n=(z,B)=>{const R=e.createProgram(),T=s(B,e.FRAGMENT_SHADER);return e.attachShader(R,z),e.attachShader(R,T),e.linkProgram(R),{p:R,f:T,v:z}},v=l?{bg:[r,_t],g:[i,f(m,!0)],s1:[i,f(a,!1)],s2:[i,f(p,!1)],wat:[i,Ct],comp:[r,Ot]}:{bg:[r,_t],f:[i,f([...m,...a,...p],!0)],wat:[i,Ct],comp:[r,Ot]},b={};for(const z in v)b[z]=n(v[z][0],v[z][1]);e.flush();const w=256,c=new Uint8Array(w*w*4);let u=2654435769;const x=()=>(u=Math.imul(u^u>>>15,739982445),u=Math.imul(u^u>>>12,695872825),u^=u>>>15,(u>>>0)/4294967296);for(let z=0;z<4;z++){const B=[8,4,4,2][z],R=w/B,T=new Float32Array(R*R);for(let D=0;D<T.length;D++)T[D]=x();for(let D=0;D<w;D++){const G0=D/B,T0=Math.floor(G0),W0=G0-T0,ot=W0*W0*(3-2*W0),At=T0%R,Tt=(T0+1)%R;for(let st=0;st<w;st++){const ne=st/B,qt=Math.floor(ne),Bt=ne-qt,ce=Bt*Bt*(3-2*Bt),at=qt%R,ie=(qt+1)%R,le=T[At*R+at]+(T[At*R+ie]-T[At*R+at])*ce,Oe=T[Tt*R+at]+(T[Tt*R+ie]-T[Tt*R+at])*ce;c[(D*w+st)*4+z]=Math.round((le+(Oe-le)*ot)*255)}}}const y=(z,B,R,T,D,G0,T0,W0)=>{const ot=e.createTexture();return e.bindTexture(e.TEXTURE_2D,ot),e.texImage2D(e.TEXTURE_2D,0,R,z,B,0,T,D,W0||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,G0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,G0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,T0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,T0),ot},P=y(w,w,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT,c),A=y(24,4,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE),S=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,S),e.bufferData(e.UNIFORM_BUFFER,32*16,e.DYNAMIC_DRAW);const V=z=>{const B=e.createVertexArray();e.bindVertexArray(B);const R=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,R),e.bufferData(e.ARRAY_BUFFER,new Float32Array(z.v),e.STATIC_DRAW);for(let D=0;D<3;D++)e.enableVertexAttribArray(D),e.vertexAttribPointer(D,3,e.FLOAT,!1,36,D*12);const T=e.createBuffer();return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,T),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint32Array(z.i),e.STATIC_DRAW),{vao:B,vb:R,ib:T,n:z.i.length}},A0=((z,B)=>{e.bindVertexArray(z.vao);const R=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,R),e.bufferData(e.ARRAY_BUFFER,B*32,e.DYNAMIC_DRAW);for(let T=3;T<5;T++)e.enableVertexAttribArray(T),e.vertexAttribPointer(T,4,e.FLOAT,!1,32,(T-3)*16),e.vertexAttribDivisor(T,1);return z.inst=R,z})(V(Ee()),16),y0=mt();Y(y0,[-420,0,.02],[420,0,.02],[420,0,420],[-420,0,420],0);const C0=V(y0);e.bindVertexArray(null);const et=e.createVertexArray(),O0=(z,B)=>{if(!e.getProgramParameter(B.p,e.LINK_STATUS))throw new Error("572 "+z+": "+e.getShaderInfoLog(B.f)+e.getShaderInfoLog(B.v)+e.getProgramInfoLog(B.p));e.uniformBlockBinding(B.p,e.getUniformBlockIndex(B.p,"UB"),0),e.useProgram(B.p);for(const[R,T]of[["uN",0],["uD",1],["uR",2],["uT",3]]){const D=e.getUniformLocation(B.p,R);D&&e.uniform1i(D,T)}return{p:B.p,uMir:e.getUniformLocation(B.p,"uMir")}},Ce=()=>{for(const z in b)b[z]=O0(z,b[z])};let Ft=null;return{P:b,fin:Ce,back:z=>(Ft||(Ft=n(i,f(d,!1)),e.flush()),z&&!b.b&&(b.b=O0("b",Ft)),b.b),tN:P,tD:A,ubo:S,tex:y,gG:A0,gW:C0,vao0:et,hf:o,upload:V,statics:[],rts:{}}})());let K=F.statics.find(t=>t.key===N.hash);if(!K){const t=Ne(),o=F.upload(t);if(e.bindVertexArray(null),K={key:N.hash,g:o,rg:t.rg},F.statics.push(K),F.statics.length>12){const s=F.statics.shift();e.deleteBuffer(s.g.vb),e.deleteBuffer(s.g.ib),e.deleteVertexArray(s.g.vao)}}F.fin&&(F.fin(),F.fin=null);const J=F.P;let $=F.rts[I];if(!$){const t=o=>{const s=F.hf?F.tex(o,o,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE):F.tex(o,o,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),r=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,r),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,o,o);const i=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,r),{t:s,f:i,s:o}};$=F.rts[I]={m:t(I),r:t(Math.ceil(I/2))};try{const o=F.hf?e.RGBA16F:e.RGBA8,s=e.getInternalformatParameter(e.RENDERBUFFER,o,e.SAMPLES),r=Math.min(4,s&&s.length?s[0]:0);if(r>1){const i=e.createFramebuffer(),h=e.createRenderbuffer(),l=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,h),e.renderbufferStorageMultisample(e.RENDERBUFFER,r,o,I,I),e.bindRenderbuffer(e.RENDERBUFFER,l),e.renderbufferStorageMultisample(e.RENDERBUFFER,r,e.DEPTH_COMPONENT24,I,I),e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,h),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,l),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE&&($.m.ms=i)}}catch{$.m.ms=null}e.bindRenderbuffer(e.RENDERBUFFER,null),e.bindFramebuffer(e.FRAMEBUFFER,null)}const Fe={yaw:0,pitch:0,x:0,y:0,z:0},v0=Math.tan(C[5]*q0),Wt=C[2],Vt=C[3],Ht=C[0],Xt=C[1],Yt=C[4],M={x:Ht,y:1+Yt,z:Xt,yaw:Wt,pitch:Vt},Zt=(t,o)=>o<0||Math.abs(t)>1.55?1:Math.max(1-.17*(Math.floor(o/.3)+1),.15);let U=null;const jt=()=>{const t=N.view||Fe;M.x=Ht+O(t.x||0,-.55,2.45),M.z=Math.min(Xt+O(t.z||0,-4.2,2.45),Math.abs(M.x)<1.55?3.6:-.15),M.y=Math.max(Zt(M.x,M.z),Zt(M.x,M.z-.15))+Yt+O(t.y||0,-.4,.5),M.yaw=Wt+(t.yaw||0),M.pitch=O(Vt+(t.pitch||0),-1.3,1.3);const o=Math.cos(M.pitch),s=Math.sin(M.pitch),r=Math.sin(M.yaw),i=Math.cos(M.yaw);U={fw:[r*o,s,i*o],rt:[i,0,-r],up:[-r*s,o,-i*s]}},x0=(t,o)=>t[0]*o[0]+t[1]*o[1]+t[2]*o[2],Ae=(t,o)=>{const s=(t*2-1)*v0,r=(1-o*2)*v0;return z0([0,1,2].map(i=>U.fw[i]+U.rt[i]*s+U.up[i]*r))},Kt=_?99*q0:L.az?C[2]+.22:L.ahead?C[2]+.12+(V0-.5)*.3:C[2]+(V0<.3?.2:V0<.55?-1.15:V0<.8?1.2:Math.PI-.35);let o0=0,K0=[0,0],J0=0,U0=0;const k=new Float32Array(32*4),H=new Float32Array(24*4*4),Jt=[Math.sin(56*q0),Math.cos(56*q0)],Te=()=>{const t=o0,o=t0(0,.42,t)*(1-t0(.5,1,t)),s=t0(.25,1,t),r=((L.el||5)+7*t)*q0,i=Math.cos(r),h=[Math.sin(Kt)*i,Math.sin(r),Math.cos(Kt)*i],l=X==="Night fog"?.3:X==="Evening fog"||ct==="Blue hour"?.55:1,m=[.98*l,.74*l,.46*l],a=[.7*l,.73*l,.77*l],p=[.66*l,.74*l,.84*l],d=w0(w0(L.hor,m,o*.55),a,s*.45),f=w0(w0(L.zen,w0(m,[1,1,1],.4),o*.4),p,s*.5),n=R0[0]*(1-.86*s);k.set([d[0],d[1],d[2],n],20),k.set([f[0],f[1],f[2],R0[1]],24);const v=O(L.vis+.9*t0(.12,.65,t),0,1);k.set([h[0],h[1],h[2],v],28);const b=w0(L.sun,[1,.86,.66],o*.6);k.set([b[0],b[1],b[2],L.glow+1.3*o+.3*s],32),k.set([K0[0],K0[1],O(R0[2]+U0,0,1.2),0],36);const w=f.map(c=>c*.88);k.set([w[0],w[1],w[2],0],40),k.set([L.ambD[0],L.ambD[1],L.ambD[2],0],44),k.set([L.body[0]*(1+.4*s),L.body[1]*(1+.4*s),L.body[2]*(1+.3*s),X0>.02?1.5:1],48),k.set([Jt[0],Jt[1],430,O(R0[3]+.6*s,0,.9)],52),k.set([gt[0],gt[1],gt[2],L.lamp*(1-.45*s)],64),k.set([t,O(R0[3]*.45+.5*s,0,.6),0,E.length?ht+10*Lt:0],84),k.set(qe,120),k.set(Be,124)},bt=X==="Night fog"?1:X==="Evening fog"?.5:ct==="Blue hour"?.45:0,qe=[X==="Drizzle"?1:bt>.9?.85:.55,X==="Drizzle"?1:0,bt,bt],Be=[X==="Clear dawn"?1:0,L.vis>.4?1:.35,{"Clear dawn":1,"Fog lifting":.85,Drizzle:.45,"Sun burning through":.3}[X]||(nt==="Lying low"&&X==="Dawn fog"?.6:0),0],gt=ft==="Rose glass"?[1,.52,.46]:ft==="Pale gold"?[1,.82,.5]:[1,.6,.28],e0=[];let $t=0;const E0=(t,o,s)=>{e0.length<16?e0.push([t,o,q,s]):(e0[$t%16]=[t,o,q,s],$t++)},Qt=.69,te=.95,N0=.42;let q=0,$0=0,ee=0,L0=0;const yt=(t,o)=>{const s=o[0]-t.x,r=o[2]-t.z,i=-t.yaw,h=Math.cos(i),l=Math.sin(i);return[s*h+r*l,o[1]-t.h,-s*l+r*h]},I0=(t,o,s)=>{const r=t.yaw,i=Math.cos(r),h=Math.sin(r);return[t.x+o*i+s*h,t.z-o*h+s*i]},ke=(t,o,s)=>{const r=Math.min(1,Math.abs(s)*5);if(q-ee>.08){ee=q;const l=O(((t.x+o.x)/2-M.x)/10,-.8,.8);N.sound.hit("blip",.25+.6*r,{freq:150+70*g(),pan:l}),N.sound.hit("noise",.08+.25*r,{cutoff:1100,dur:.06,pan:l})}const i=(g()-.5)*6,h=I0(t,i,.6);E0((t.x+o.x)/2,h[1],.25+r)},oe=t=>{const o=X0*(1+2.2*L0);for(const s of E){const r=s.f,i=s.x*.21,h=o*(Math.sin(.83*q+r[0]+i)+.6*Math.sin(1.31*q+r[1]+i*1.3)),l=o*1.7*(Math.sin(.61*q+r[2]+i)+.5*Math.sin(1.13*q+r[3])),m=o*1.4*(Math.sin(.37*q+r[4]+i*.7)+.6*Math.sin(.71*q+r[5])),a=o*.25*Math.sin(.97*q+r[1]+i);s.vh+=(22*(h-s.h)-2*.15*4.7*s.vh)*t,s.h+=s.vh*t,s.vr+=(6.8*(l-s.r)-2*.07*2.6*s.vr)*t,s.r+=s.vr*t,s.vs+=(1.4*(m-s.s)-2*.12*1.2*s.vs)*t,s.s+=s.vs*t,s.vp+=(12*(a-s.p)-2*.12*3.5*s.vp)*t,s.p+=s.vp*t}for(let s=0;s+1<E.length;s++){const r=E[s],i=E[s+1];if(i.x-r.x>Y0+.2)continue;const h=i.x+i.s-(l0?Qt:te)-N0*i.r-(r.x+r.s+(l0?te:Qt)+N0*r.r),l=i.vs-N0*i.vr-(r.vs+N0*r.vr);if(h<0&&l<0){const m=-1.35*l;r.vs-=.35*m,i.vs+=.35*m,r.vr-=.15*m/N0,i.vr+=.15*m/N0,r.s+=h*.25,i.s-=h*.25,-l>.012&&ke(r,i,-l)}}},wt=(t,o,s,r)=>{t.vh-=.3*r,t.vr+=.45*r*O(s/.6,-1,1),t.vp-=.1*r*O(o/4,-1,1),t.vs-=.3*r*Math.sign(s||1);for(const i of[-4.2,0,4.2]){const h=I0(t,i,0);E0(h[0],h[1],.9*r)}};let Q=null,Mt=0,De=0,Rt=9+g()*30,Q0=9+g()*5,Pt=0,zt=2,Et=1.5+g()*3,Xe=380+g()*600,g0=_||de<.5?1:-1,F0=_?18:rt<.34?g0*(-200+rt*900):-g0*(420+4.2*(20+rt*110)),Se=2.3,tt=null,_0=1,Nt=17;const Ue=[62,64,67,69,71,74,76,79],Le=(t,o)=>{const s=Ae(t,o),r=[M.x,M.y,M.z];let i=null,h=1e9;for(const l of E){const m=yt(l,r),a=-l.yaw,p=Math.cos(a),d=Math.sin(a),f=[s[0]*p+s[2]*d,s[1],-s[0]*d+s[2]*p],n=[-5.7,-.3,-.85],v=[5.75,1.8,.7];let b=0,w=1e9;for(let c=0;c<3;c++){if(Math.abs(f[c])<1e-6){if(m[c]<n[c]||m[c]>v[c]){b=1e9;break}continue}let u=(n[c]-m[c])/f[c],x=(v[c]-m[c])/f[c];u>x&&([u,x]=[x,u]),b=Math.max(b,u),w=Math.min(w,x)}b<=w&&b<h&&(h=b,i=l)}if(i){const l=[r[0]+s[0]*h,r[1]+s[1]*h,r[2]+s[2]*h],m=yt(i,l);wt(i,m[0],m[2],.55),N.sound.hit("noise",.18,{cutoff:600,dur:.45}),N.sound.hit("blip",.3,{freq:95});return}if(s[1]<-.003){const l=M.y/-s[1],m=M.x+s[0]*l,a=M.z+s[2]*l;if(l<120&&a>.1){E0(m,a,1.1),N.sound.hit("noise",.12,{cutoff:900,dur:.2});for(const p of E){const d=yt(p,[m,0,a]);Math.abs(d[0])<6.5&&Math.abs(d[2])<2.2&&wt(p,d[0],-Math.sign(d[2])*.6,.35)}}}},Ie=t=>{const o=N.input;for(const s of o.taps())Le(s.x,s.y);if(o.down){Q||(Q={lx:o.x,ly:o.y,t:0,path:0});const s=o.x-Q.lx,r=o.y-Q.ly;Q.lx=o.x,Q.ly=o.y,Q.t+=t,Q.path+=Math.hypot(s,r),Q.path>.02?(J0+=(O(s/Math.max(t,.001)*160,-260,260)-J0)*(1-Math.exp(-t*5)),U0=Math.min(.45,U0+t*.6)):Q.t>.35&&(o0=Math.min(1,o0+t*.032),Mt-=t,Mt<=0&&(Mt=.9,N.sound.note(Ue[De++%5+Math.round(o0*3)],{dur:2.6,vel:.045,wave:"sine"})))}else Q=null,o0=Math.max(0,o0-t*.012);J0*=Math.exp(-t*1.2),U0=Math.max(0,U0-t*.03),K0[0]+=(.5+J0)*t,K0[1]+=.12*t},se=new Float32Array(16*8),ae=(t,o,s)=>{const r=[t[0]-M.x,t[1]-M.y,t[2]-M.z],i=x0(r,U.fw);if(i<.1){o[s+3]=0;return}o[s]=.5+.5*x0(r,U.rt)/(i*v0),o[s+1]=.5+.5*x0(r,U.up)/(i*v0),o[s+2]=.5/(i*v0)},re=(t,o)=>{o=O(o||0,0,.1),q+=o,jt(),Ie(o),$0+=o;let s=0;for(;$0>=1/60&&s<8;)oe(1/60),$0-=1/60,s++;s===8&&($0=0),Ut==="Passing wake"&&(q>Nt&&(_0=q+16+g()*55,Nt=_0+11+g()*8),L0=q>_0?Math.sin((q-_0)/(Nt-_0)*Math.PI):0);for(const n of E){if(Math.sign(n.vh)!==Math.sign(n.lastVh)&&Math.abs(n.h)>.012&&q-n.lastRing>.35){n.lastRing=q;for(const v of[-4.5,0,4.5]){const b=I0(n,v,0);E0(b[0],b[1],Math.min(.8,Math.abs(n.h)*9))}}n.lastVh=n.vh}if(tt&&q-_e>Se&&(wt(tt,2.2,.55,.9),tt=null),Rt-=o,Rt<=0){Rt=20+g()*50;const n=-12+g()*30,v=13+g()*25;E0(n,v,.6),N.sound.hit("noise",.04,{cutoff:1400,dur:.08})}if(zt-=o,zt<=0&&(zt=(4+g()*11)/(1+2*L0+(X0>.02?.6:0)),E0(-1.4+g()*2.8,1.62+g()*.1,.3+.3*L0+(X0>.02?.12:0)),N.sound.hit("noise",.025+.05*L0,{cutoff:480,dur:.5})),Q0-=o,Q0<=0&&(Pt<3?(Pt++,Q0=2.8,N.sound.note(55,{dur:4,vel:.04,wave:"sine"}),N.sound.note(58,{dur:3,vel:.016,wave:"sine"}),N.sound.note(67,{dur:2.4,vel:.014,wave:"sine"})):(Pt=0,Q0=45+g()*15)),Et-=o,Et<=0&&E.length){Et=2.5+g()*8;const n=E[g()*E.length|0],v=g()<.5?-1:1,b=.2+.2*g();n.vs+=v*b,n.vr+=v*b*.25,n.vh+=.05*(g()-.5)}Te();const r=1/v0,i=.05,h=1e3,l=(h+i)/(i-h),m=2*h*i/(i-h),a=[M.x,M.y,M.z],p=[[...U.rt.map(n=>n*r),-r*x0(U.rt,a)],[...U.up.map(n=>n*r),-r*x0(U.up,a)],[...U.fw.map(n=>-l*n),l*x0(U.fw,a)+m],[...U.fw,-x0(U.fw,a)]];for(let n=0;n<4;n++)for(let v=0;v<4;v++)k[4+n*4+v]=p[v][n];k.set([M.x,M.y,M.z,q],0),F0+=g0*4.2*o,F0*g0>420&&(g0=Z()<.5?1:-1,F0=-g0*(420+4.2*(60+Z()*180))),k.set([F0,150*g0,.2*O(R0[3]*3,.2,1)*(1+1.6*t0(.25,1,o0)),.55*t0(-360,-300,F0)*(1-t0(320,380,F0))],56),k.set([I,1/I,L.exp*(1+.06*o0),q*30|0],60),k.set([...U.rt,0],68),k.set([...U.up,0],72),k.set([...U.fw,v0],76),k.set([e0.length,xt.length,P0?1:0,ge],80),H.fill(0),e0.forEach((n,v)=>H.set(n,v*4)),xt.forEach((n,v)=>{H.set([n[0],n[1],n[2],n[3]],(24+v)*4);const b=Math.hypot(n[0]-M.x,n[1]-M.y,n[2]-M.z),w=k[23],c=(48+v)*4;ae(n,H,c),H[c+2]>0?H[c+3]=n[3]*L.lamp*(1-.4*t0(.3,1,o0))*(.3+.7*Math.exp(-w*b))/(1+b*.02)*.55:H[c+3]=0,H[(72+v)*4+2]=b;const u=(60+v)*4,x=[n[0],-n[1],n[2]],y=Math.hypot(n[0]-M.x,n[1]+M.y,n[2]-M.z);ae(x,H,u),H[u+2]>0&&n[2]>-5?H[u+3]=n[3]*L.lamp*(.25+.75*Math.exp(-w*y))/(1+y*.03)*.5:H[u+3]=0}),E.forEach((n,v)=>{const b=n.r+n.r0,w=c=>[n.s+(c[1]-.15)*Math.sin(b),n.h+n.h0+c[0]*Math.sin(n.p+n.p0)-c[2]*Math.sin(b)];k.set([...w(n.bL),...w(n.sL)],(22+v)*4)}),E.forEach((n,v)=>se.set([n.x+n.s,n.z,n.yaw,n.h+n.h0,n.r+n.r0,n.p+n.p0,n.cov+(n.gild?.5:0),1],v*8)),e.bindBuffer(e.UNIFORM_BUFFER,F.ubo),e.bufferSubData(e.UNIFORM_BUFFER,0,k),e.bindBufferBase(e.UNIFORM_BUFFER,0,F.ubo),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,F.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,24,4,e.RGBA,e.FLOAT,H),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,F.tN),e.bindBuffer(e.ARRAY_BUFFER,F.gG.inst),e.bufferSubData(e.ARRAY_BUFFER,0,se,0,E.length*8),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0);const d=U.fw[2]-v0*(Math.abs(U.rt[2])+Math.abs(U.up[2]))<-.05?F.back(!0):null;!d&&(F.fr=(F.fr||0)+1)===2&&F.back(!1);const f=(n,v)=>{e.bindFramebuffer(e.FRAMEBUFFER,n.ms||n.f),e.viewport(0,0,n.s,n.s),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.useProgram(J.bg.p),e.uniform1f(J.bg.uMir,v),e.bindVertexArray(F.vao0),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.bindVertexArray(K.g.vao),e.vertexAttrib4f(3,0,0,0,0),e.vertexAttrib4f(4,0,0,0,0);const b=!J.s1&&K.rg[1][0]===K.rg[0][0]+K.rg[0][1];for(let c=b?1:0;c<3;c++){const u=c===0?J.s1||J.f:c===1?J.s2||J.f:d,x=b&&c===1?K.rg[0][0]:K.rg[c][0],y=K.rg[c][1]+(b&&c===1?K.rg[0][1]:0);!u||!y||(e.useProgram(u.p),e.uniform1f(u.uMir,v),e.drawElements(e.TRIANGLES,y,e.UNSIGNED_INT,x*4))}const w=J.g||J.f;e.useProgram(w.p),e.uniform1f(w.uMir,v),e.bindVertexArray(F.gG.vao),e.drawElementsInstanced(e.TRIANGLES,F.gG.n,e.UNSIGNED_INT,0,E.length)};f($.r,1),f($.m,0),e.useProgram(J.wat.p),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,$.r.t),e.bindVertexArray(F.gW.vao),e.vertexAttrib4f(3,0,0,0,0),e.vertexAttrib4f(4,0,0,0,0),e.drawElements(e.TRIANGLES,F.gW.n,e.UNSIGNED_INT,0),e.disable(e.DEPTH_TEST),$.m.ms&&(e.bindFramebuffer(e.READ_FRAMEBUFFER,$.m.ms),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,$.m.f),e.blitFramebuffer(0,0,I,I,0,0,I,I,e.COLOR_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(e.READ_FRAMEBUFFER,null)),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,I,I),e.useProgram(J.comp.p),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,$.m.t),e.bindVertexArray(F.vao0),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0)};for(let t=0;t<420;t++)q+=1/60,oe(1/60);const _e=q;{jt();let t=.9;for(const o of E){const s=ut(o,[2.2,.5,0]),r=[s[0]-M.x,s[1]-M.y,s[2]-M.z],i=Math.hypot(...r),h=x0(r,U.fw)/i;i<16&&h>t&&(t=h,tt=o)}}return E.forEach((t,o)=>{const s=I0(t,(G(o+3)-.5)*8,.7),r=I0(t,-5.9-G(o+5),(G(o+9)-.5)*1.2);e0.push([s[0],s[1],q+.4+3.2*G(o+7),.6+.5*G(o+11)],[r[0],r[1],q+.2+3.6*G(o+13),.5+.4*G(o+17)])}),e0.push([.2+G(31)*.6,2.3+G(32)*.6,q+1.2,.8],[C[0]+30*Math.sin(C[2]-.05),C[1]+30*Math.cos(C[2]-.05),q+1.6,1]),e0.push([3.32+G(34)*.1,.5,q+1,1],[5.2+G(35)*.1,.55,q+2.8,.9]),e0.splice(0,Math.max(0,e0.length-16)),re(0,0),re}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
