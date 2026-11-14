// Hot Spring: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/561.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ft){Ft&&Ft.add({num:561,name:"Hot Spring",fam:"Vistas",recipe:"The rocky edge of an outdoor hot spring in winter, with lanterns glowing in the steam, snow on the bamboo fence and the cedars, and an inn lit across the valley. The hour, how deep the snow is and how thick the steam is change every mint. Tap the water to toss a pebble, drag to blow the steam aside, or hold and the sky slowly turns: the snow stops and the moon comes out, or on clear nights and sunny days it clouds over and snows again.",interactive:"Tap the water to toss a pebble (rings spread and the steam swirls up); drag to send a gust that tears the steam aside and blows the snow; hold and over several seconds the sky turns: the snow stops and the clouds part for a full moon, or on a moonlit night or a sunny day the cloud closes in again and it snows",music:!0,gl:!0,fps:30,seed:0,make(d){const e=d.gl,w=d.size,L=!!d.home,I=w>400;let ee=1444679141;for(let t=2;t<66;t+=8)ee=Math.imul(ee^parseInt(d.hash.slice(t,t+8),16),2246822507)^ee>>>13;const f=()=>{ee=ee+1831565813|0;let t=Math.imul(ee^ee>>>15,1|ee);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},fe=t=>{let o=0;for(const a in t)o+=t[a];let n=f()*o;for(const a in t)if(n-=t[a],n<0)return a;return Object.keys(t)[0]},nt=Math.PI*2,Ee=d.trait("Snow",L?"Big soft flakes":fe({"Big soft flakes":38,"Fine steady snow":30,"Heavy fall":22,"Last flakes, moon breaking":10})),Eo=d.trait("Cold",L?"Minus 15":fe({"Minus 8":28,"Minus 15":44,"Minus 22":28})),Ao=d.trait("Water",L?"Milky jade":fe({"Milky jade":50,"Milky blue-white":36,"Iron gold":14})),kt=d.trait("Air",L?"Still":fe({Still:55,"Drifting down-valley":45})),Fo=d.trait("Rim stones",L?"Dark basalt":fe({"Dark basalt":55,"Grey granite":45})),ko=d.trait("Paper lantern",L?"Cream":fe({Cream:70,Red:30})),Lt=d.trait("Far lights",L?"Ryokan":fe({Ryokan:50,"Ryokan and farmhouses":38,"One far window":12})),Ae={"Big soft flakes":[.7,1.35,.75,.0062],"Fine steady snow":[1,.7,1.15,.0078],"Heavy fall":[1,1.1,.95,.011],"Last flakes, moon breaking":[.22,1.2,.8,.0042]}[Ee],Lo=Ee==="Last flakes, moon breaking",Co={"Minus 8":.55,"Minus 15":.8,"Minus 22":1.08}[Eo],Ct=kt==="Still"?[.06,.03]:[.55,.1],Po={"Milky jade":[.5,.74,.68],"Milky blue-white":[.66,.78,.86],"Iron gold":[.62,.36,.14]}[Ao],He=ko==="Red"?[1,.25,.1,.6]:[1,.55,.24,.62],_e=Lt==="Ryokan"?0:Lt==="Ryokan and farmhouses"?1:2;let te=1444355643;for(let t=2;t<66;t+=8)te=Math.imul(te^parseInt(d.hash.slice(t,t+8),16),739982445)^te>>>15;const st=()=>{te=te+1831565813|0;let t=Math.imul(te^te>>>15,1|te);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Oo=t=>{let o=0;for(const a in t)o+=t[a];let n=st()*o;for(const a in t)if(n-=t[a],n<0)return a;return Object.keys(t)[0]};let J=d.trait("View",L?"From the rocks":Oo({"From the rocks":44,"Toward the stone lantern":22,"Along the rim":22,"In the water":kt==="Still"?18:0}));const it=st(),rt=st();let oe=1444128721;for(let t=2;t<66;t+=8)oe=Math.imul(oe^parseInt(d.hash.slice(t,t+8),16),2654435761)^oe>>>14;const lt=()=>{oe=oe+1831565813|0;let t=Math.imul(oe^oe>>>15,1|oe);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ue=t=>{let o=0;for(const a in t)o+=t[a];let n=lt()*o;for(const a in t)if(n-=t[a],n<0)return a;return Object.keys(t)[0]};let ae=1444196519;for(let t=2;t<66;t+=8)ae=Math.imul(ae^parseInt(d.hash.slice(t,t+8),16),2146121005)^ae>>>16;const Ge=()=>{ae=ae+1831565813|0;let t=Math.imul(ae^ae>>>15,1|ae);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Do=t=>{let o=0;for(const a in t)o+=t[a];let n=Ge()*o;for(const a in t)if(n-=t[a],n<0)return a;return Object.keys(t)[0]},ct=d.trait("Pool",L?"A long kidney":Do({"A long kidney":45,"Nearly round":22,"Two lobes":18,"Wide, its far end in steam":15})),Io=Ge()<.27,ft=Ge(),Pt=Ge();let ne=1444270816;for(let t=2;t<66;t+=8)ne=Math.imul(ne^parseInt(d.hash.slice(t,t+8),16),2221713035)^ne>>>12;const be=()=>{ne=ne+1831565813|0;let t=Math.imul(ne^ne>>>15,1|ne);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ot=be(),Dt=be(),va=be(),qo=be(),Bo=be(),Ho=be(),we=L?"":Ot<.09?"Snowing by day":Ot<.16?"Sun on new snow":"",It=L||Dt<.5?"River boulders":Dt<.75?"Standing rocks":"Snow bank and a spring",j={"River boulders":0,"Standing rocks":2,"Snow bank and a spring":3}[It];let v=L?"Lantern light, heavy cloud":Ue({"Lantern light, heavy cloud":40,"Full moon after the snow":16,"Moon through thin cloud":8,"Blue hour":14,Blizzard:10,"First light":5,"Hard frost":5});Ee==="Last flakes, moon breaking"&&v==="Lantern light, heavy cloud"&&(v="Moon through thin cloud");const qt=v==="Full moon after the snow"||v==="Moon through thin cloud";let V=L?"All three":Ue(Object.assign({"All three":40,"Stone lantern alone":22,"Paper lantern alone":16,"The lantern behind you":12},qt?{"None lit":12}:{}));v==="First light"&&V==="All three"&&(V="Stone lantern alone");const Bt=L?"Deep midwinter":Ue({"Deep midwinter":55,"A first thin fall":20,Buried:25});let x=L?"":Ue({"":51,"Back in the garden":13,"Low at the water":12,"Close on the stone lantern":12,"Up through the snowfall":12});const ge=lt(),he=lt();x==="Up through the snowfall"&&!(qt||v==="Blue hour"||v==="First light"||v==="Lantern light, heavy cloud")&&(x=""),x==="Low at the water"&&v==="Blizzard"&&(x=""),(x==="Close on the stone lantern"||x==="Low at the water"||!x&&(J==="Toward the stone lantern"||J==="In the water")||x==="Up through the snowfall")&&(V==="Paper lantern alone"||V==="The lantern behind you"||V==="None lit")&&(V=v==="First light"||V==="None lit"?"Stone lantern alone":"All three"),v==="Lantern light, heavy cloud"&&!L&&Io&&(v="Lantern light, cloud lit by the valley"),we&&(v=we,V="None lit",x==="Up through the snowfall"&&(x="")),v==="Blizzard"&&!x&&J==="Along the rim"&&(J=qo<.5?"Toward the stone lantern":"From the rocks",d.trait("View",J)),x==="Back in the garden"&&(x="From the slope above"),d.trait("Hour",v),d.trait("Lamps",V),d.trait("Snow depth",Bt),d.trait("Rim",It),x&&d.trait("View",x),v==="Hard frost"||v==="Sun on new snow"?d.trait("Snow","None falling"):v==="Full moon after the snow"&&x!=="Up through the snowfall"?d.trait("Snow","Last few flakes"):v==="Blizzard"?d.trait("Snow","Driven flat"):Ee==="Last flakes, moon breaking"&&v!=="Moon through thin cloud"&&d.trait("Snow","Last flakes");const g={"Lantern light, heavy cloud":{amb:[.0085,.011,.018],haze:[.003,.0038,.0062],moon:0,cover:1.25,mc:[.036,.05,.079],ex:5.2,sn:1,wind:1,heat:1,fog:1,sz:[0,0,0],sh:[0,0,0],ring:0,stars:0,rime:0,disc:.9},"Lantern light, cloud lit by the valley":{amb:[.0095,.011,.017],haze:[.0042,.0038,.0056],moon:0,cover:1.25,mc:[.036,.05,.079],ex:5.2,sn:1,wind:1,heat:1,fog:1,sz:[.007,.0034,.0038],sh:[.008,.0036,.003],ring:0,stars:0,rime:0,disc:.9},"Full moon after the snow":{amb:[.009,.012,.021],haze:[.0028,.0042,.0085],moon:1,cover:.15,mc:[.05,.068,.11],ex:5,sn:.1,wind:.6,heat:1.05,fog:.5,sz:[0,0,0],sh:[0,0,0],ring:0,stars:1,rime:.3,disc:1},"Moon through thin cloud":{amb:[.0095,.0125,.02],haze:[.0035,.0045,.0072],moon:.6,cover:.82,mc:[.042,.055,.085],ex:5.1,sn:.35,wind:1,heat:1,fog:.8,sz:[0,0,0],sh:[0,0,0],ring:1,stars:.4,rime:0,disc:.55},"Blue hour":{amb:[.024,.04,.085],haze:[.012,.02,.045],moon:0,cover:1.25,mc:[.036,.05,.079],ex:4.4,sn:.45,wind:1,heat:.95,fog:.8,sz:[.006,.012,.034],sh:[.01,.016,.03],ring:0,stars:0,rime:0,disc:0},Blizzard:{amb:[.012,.015,.024],haze:[.013,.0165,.025],moon:0,cover:1.25,mc:[.036,.05,.079],ex:4.8,sn:1.9,wind:4.5,heat:.75,fog:22,sz:[0,0,0],sh:[0,0,0],ring:0,stars:0,rime:.5,disc:0},"First light":{amb:[.03,.027,.045],haze:[.022,.016,.022],moon:0,cover:.9,mc:[.036,.05,.079],ex:4.4,sn:.25,wind:.5,heat:1.3,fog:.9,sz:[.004,.008,.02],sh:[.07,.022,.018],ring:0,stars:.15,rime:.4,disc:0},"Hard frost":{amb:[.0075,.0105,.019],haze:[.0025,.0036,.0072],moon:.55,cover:.05,mc:[.04,.054,.09],ex:5.2,sn:0,wind:.05,heat:1.35,fog:.4,sz:[0,0,0],sh:[0,0,0],ring:0,stars:1.3,rime:1,disc:0},"Snowing by day":{amb:[.05,.056,.066],haze:[.1,.104,.112],moon:1,cover:1.25,mc:[.088,.09,.096],ex:4.4,sn:1,wind:1,heat:.9,fog:2.2,sz:[0,0,0],sh:[0,0,0],ring:0,stars:-1,rime:.3,disc:0},"Sun on new snow":{amb:[.022,.042,.09],haze:[.06,.075,.1],moon:1,cover:.05,mc:[.25,.215,.165],ex:4.4,sn:0,wind:.3,heat:.7,fog:.5,sz:[.03,.07,.17],sh:[.04,.05,.06],ring:0,stars:-1,rime:1,disc:0}}[v],q={"All three":[1,1,1],"Stone lantern alone":[1,0,0],"Paper lantern alone":[0,1,0],"The lantern behind you":[0,0,1],"None lit":[0,0,0]}[V],_o=Co*g.heat,We=v==="Blizzard"?[1.7,.35]:[Ct[0]*g.wind,Ct[1]*g.wind];v==="Blizzard"&&d.trait("Air","A gale down-valley");const Ht=x==="Up through the snowfall",je=v==="Blizzard"?1.9:Lo&&v==="Moon through thin cloud"?Ae[0]:Ae[0]*(Ht?Math.max(g.sn,.8):g.sn),_t={"Deep midwinter":[1,0],"A first thin fall":[.3,1],Buried:[1.9,0]}[Bt];let S=.35+.3*(f()-.5),T=3.95+.25*(f()-.5),C=2.55+.45*f(),P=2.25+.35*f();const Ut=.07+.07*f(),Gt=nt*f(),Wt=.035+.05*f(),jt=nt*f(),B=[Ut*Math.cos(Gt),Ut*Math.sin(Gt),Wt*Math.cos(jt),Wt*Math.sin(jt)];if(ct==="Nearly round")C=P=1.75+.25*ft,B[0]*=.25,B[1]*=.25,B[2]*=.3,B[3]*=.3;else if(ct==="Two lobes"){const t=(ft-.5)*.5;B[0]=.21*Math.cos(t),B[1]=.21*Math.sin(t),B[2]*=.5,B[3]*=.5,C=2.9+.2*Pt,P=2}else ct==="Wide, its far end in steam"&&(C=3.05+.1*ft,P=2.55+.15*Pt,T+=.5);const Re=(t,o)=>{const n=t*t-o*o,a=2*t*o,s=t*(4*t*t-3),r=o*(3-4*o*o);return 1+B[0]*n-B[1]*a+B[2]*s-B[3]*r},Xt=(t,o)=>{const n=(t-S)/C,a=(o-T)/P,s=Math.hypot(n,a)+1e-5;return(s-Re(n/s,a/s))*Math.min(C,P)};for(;Xt(0,.1)<1;)T+=.05;const Xe=(t,o)=>{const n=Math.cos(t),a=Math.sin(t),s=Re(n,a),r=n/C,b=a/P,p=Math.hypot(r,b);return[S+n*s*C+r/p*o,T+a*s*P+b/p*o]},ht=2.2+.25*f();let E=Xe(ht,1.35);E[1]=Math.min(E[1],7);const Vt=1.08+.14*f(),Uo=Math.atan2(E[0],-E[1]),dt=-3.35+.3*(f()-.5),mt=-2.75+.3*(f()-.5),Go=Math.atan2(-(S-dt),T-mt),ze=[-1.25+.3*(f()-.5),-2.75+.3*(f()-.5)],ut=.9+.12*f(),Wo=Math.atan2(-(dt-ze[0]),mt-ze[1]),Me=Xe(.32+.2*(f()-.5),1.15),pt=Math.atan2(T-Me[1],S-Me[0]),Kt=1.85+.1*f(),jo=-6.4,Xo=5.4+.7*f(),Vo=7.9+.15*f(),Ko=-.05+.04*(f()-.5),Yo=Math.floor(f()*97),U=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,Zo=U+"void main(){ gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 0., 1.); }",de=`
uniform vec4 uC[42];
uniform sampler2D uN;
uniform sampler3D uN3;
#define CAMP uC[0].xyz
#define TANH uC[0].w
#define FW uC[1].xyz
#define TT uC[1].w
#define RT uC[2].xyz
#define SZF uC[2].w
#define UPV uC[3].xyz
#define FARD uC[3].w
#define L0 uC[4]
#define C0 uC[5]
#define L1 uC[6]
#define C1 uC[7]
#define L2 uC[8]
#define C2 uC[9]
#define MOOND uC[10].xyz
#define MOONA uC[10].w
#define POOL uC[11]
#define POOLH uC[12]
#define WALB uC[13].rgb
#define RIMT uC[13].w
#define HEAT uC[14].x
#define RISE uC[14].y
#define WOFF uC[14].zw
#define WIND uC[15].xy
#define SNOWV uC[15].z
#define COVER uC[15].w
#define SIMD uC[16]
#define RIPD uC[17]
#define MIRF uC[18].x
#define SEED uC[18].y
#define FARM uC[18].z
#define EXPO uC[18].w
#define AMB uC[19].rgb
#define FLK uC[19].w
#define TA uC[20]
#define TB uC[21]
#define PP uC[22]
#define RY uC[23]
#define MFW uC[24].xyz
#define MUP uC[25].xyz
#define LS0 uC[26]
#define LS1 uC[27]
#define LS2 uC[28]
#define HS0 uC[29]
#define HS1 uC[30]
#define HS2 uC[31]
#define FEN uC[32]
#define SHL uC[33]
#define CLO uC[34]
#define HAZE uC[35].rgb
#define FOGK uC[35].w
#define RYL uC[36]
#define MOONC uC[37].rgb
#define MOONI uC[37].w
#define RBR uC[38]
#define SKYZ uC[39].rgb
#define HALO uC[39].w
#define SKYH uC[40].rgb
#define MRING uC[40].w
#define SNOWD uC[41].x
#define RIME uC[41].y
#define THIN uC[41].z
#define STARS uC[41].w
#define LDR (SHL.w > .5)
#define ENC(a) (LDR ? (a)*.25 + .5 : (a))
#define DEC(a) (LDR ? (a)*4. - 2. : (a))
#define ENCC(c) (LDR ? sqrt(max(c, 0.)) : (c))
#define DECC(c) (LDR ? (c)*(c) : (c))
`,Jo=`
float N2(vec2 p){ return textureLod(uN, p*(1./256.), 0.).r; }
float N3(vec3 p){ return textureLod(uN3, p*(1./64.), 0.).r; }
`,Fe=`
uint hu(uint x){ x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float h1(vec2 p){ uvec2 q = uvec2(ivec2(floor(p)) + 32768); return float(hu(q.x + hu(q.y)))*(1./4294967296.); }
`,Yt=`
vec4 h4(vec2 p){ uvec2 q = uvec2(ivec2(floor(p)) + 32768); uint a = hu(q.x + hu(q.y + 0x9e3779b9u)); uint b = hu(a); uint c = hu(b); uint d = hu(c); return vec4(uvec4(a, b, c, d))*(1./4294967296.); }
`,vt=`
float poolR(vec2 u){ float c2 = u.x*u.x - u.y*u.y, s2 = 2.*u.x*u.y, c3 = u.x*(4.*u.x*u.x - 3.), s3 = u.y*(3. - 4.*u.y*u.y); return 1. + POOLH.x*c2 - POOLH.y*s2 + POOLH.z*c3 - POOLH.w*s3; }
float poolD(vec2 xz){ vec2 q = (xz - POOL.xy)/POOL.zw; float l = length(q) + 1e-5; return (l - poolR(q/l))*min(POOL.z, POOL.w); }
`,Ve=`
float toroMask(vec3 d, vec4 T){
  float lz = -sin(T.z)*d.x + cos(T.z)*d.z;
  float side = smoothstep(.42, .8, abs(lz));
  float up = smoothstep(.17, .3, d.y);
  return (.16 + .84*side)*(1. - .93*up)*(1. - .5*smoothstep(-.55, -.8, d.y));
}
float paperMask(vec3 d){ return 1. - .8*smoothstep(.82, .95, abs(d.y)); }
vec3 lampF(vec3 p, vec4 L, vec4 C, out vec3 ld){ vec3 l = L.xyz - p; float d2 = dot(l, l); ld = l*inversesqrt(d2); return C.rgb*(L.w/(d2 + C.w*C.w)); }
`,Zt=`
vec3 farGlow(vec3 rd){
  vec3 g = vec3(0.);
  for (int i = 0; i < 4; i++) {
    vec4 L = i == 0 ? RYL : (i == 1 ? HS0 : (i == 2 ? HS1 : HS2));
    if (L.w <= 0.) continue;
    vec3 d = normalize(L.xyz - CAMP);
    float x = max(1. - dot(rd, d), 0.);
    g += L.w*(.00045/(x + .0011) + .25*exp(-x*2500.))*vec3(1., .6, .32);
  }
  return g;
}
vec3 hazeCol(vec3 rd){
  float e = rd.y;
  vec3 c = HAZE*(1. + .3*exp(-abs(e)*7.)) + vec3(.006, .0035, .0015)*exp(-max(e, 0.)*6.);
  return c + farGlow(rd);
}
`,Ke=t=>U+t+de+Jo+Fe+Yt+vt+Ve+(t.includes("FAR")?Zt:"")+`
uniform vec4 uS;
out vec4 o;
#define I1 int(uS.z)
#if defined(OBJP) || defined(BACKP)
#define OBJS
#endif
#ifdef NEARP
uniform sampler2D uHF;
vec4 hfAt(vec2 u){ vec4 h = textureLod(uHF, u, 0.); if (LDR) { h.x = h.x*3. - 1.; h.y *= .25; } return h; }
#endif
#ifdef NEARP_UNUSED
float at2(float y, float x){ float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay)/max(max(ax, ay), 1e-9)); if (ay > ax) a = 1.5707963 - a; if (x < 0.) a = 3.1415927 - a; return y < 0. ? -a : a; }
#endif
vec2 rot(vec2 p, float a){ float c = cos(a), s = sin(a); return vec2(c*p.x + s*p.y, -s*p.x + c*p.y); }
float sdBox(vec3 p, vec3 b){ vec3 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.); }
float sdCap(vec3 p, vec3 a, vec3 b, float r){ vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba)/dot(ba, ba), 0., 1.); return length(pa - ba*h) - r; }
float smax(float a, float b, float k){ float h = clamp(.5 - .5*(b - a)/k, 0., 1.); return mix(b, a, h) + k*h*(1. - h); }

float N2s(vec2 p){ p -= .5; vec2 i = floor(p), f = p - i; f = f*f*(3. - 2.*f); ivec2 a = ivec2(i) & 255, b = (a + 1) & 255; return mix(mix(texelFetch(uN, a, 0).r, texelFetch(uN, ivec2(b.x, a.y), 0).r, f.x), mix(texelFetch(uN, ivec2(a.x, b.y), 0).r, texelFetch(uN, b, 0).r, f.x), f.y); }
float terr(vec2 q){
  float x = q.x, z = q.y;
  float ze = 9.2 + 1.2*(N2(vec2(x*.11, 3.7)) - .5) + .5*(N2(vec2(x*.43, 9.1)) - .5);
  float dz = z - ze, dzs = .5*(dz + sqrt(dz*dz + .6));
  vec3 ns = vec3(0.);
  for (int i = 0; i < 3*I1; i++) { float v = N2s(i == 0 ? q*1.6 : (i == 1 ? q*.37 + 17. : q*2.3)); if (i == 0) ns.x = v; else if (i == 1) ns.y = v; else ns.z = v; }
  float h = .35 + .06*(ns.x - .5) + .08*(ns.y - .5);
  h -= 40.*(1. - exp(-dzs/20.));
  float zb = -z - 4.5, zbs = .5*(zb + sqrt(zb*zb + 4.));
  h += 240.*(1. - exp(-zbs/450.));
#ifdef FARP
  float zo = z - 105. - 12.*sin(x*.011);
  h += 190.*(1. - exp(-max(zo, 0.)/380.));
  float am = smoothstep(10., 70., length(q - vec2(.3, 1.)));
  if (am > 0.) h += am*(30.*(N2(q*.012)*.6 + N2(q*.03 + 40.)*.4 - .5) + 7.*(N2(q*.07 + 5.) - .5) + 1.6*(N2(q*.31) - .5));
#endif
  float pd = poolD(q);
  h = mix(h, .08 + .1*(ns.z - .5), smoothstep(1.4, .05, pd));
  h = mix(h, -.75, smoothstep(.05, -.6, pd));
  return h;
}
#ifdef FARP
float terrB(vec2 q){ float dz = q.y - 9.2, dzs = .5*(dz + sqrt(dz*dz + .6)); float zb = -q.y - 4.5, zbs = .5*(zb + sqrt(zb*zb + 4.)); return .35 - 40.*(1. - exp(-dzs/20.)) + 240.*(1. - exp(-zbs/450.)); }
float forestM(vec2 q){
  float m = smoothstep(1., 1.3, length((q - vec2(.3, 1.))/vec2(12.5, 11.)));
  float openV = smoothstep(4., 9., q.y)*smoothstep(125., 110., q.y)*smoothstep(-18., -10., q.x);
  m *= 1. - openV;
  if (FARM < 1.5) m *= smoothstep(10., 17., length(q - RY.xz));
  m *= smoothstep(.27, .42, N2(q*.017 + 3.));
  return m;
}
float canopy(vec2 q, float fm){
  vec2 g = q/5.5, cl = floor(g), f = g - cl, o0 = step(.5, f) - 1.;
  float best = 0., fd = smoothstep(50., 160., length(q - CAMP.xz));
  for (int j = 0; j < 4*I1; j++) {
    vec2 cc = cl + o0 + vec2(float(j & 1), float(j >> 1));
    vec4 hh = h4(cc + 71.);
    vec2 ctr = (cc + .2 + .6*hh.xy)*5.5;
    float Rt = 2.0 + 1.1*hh.w, hr = length(q - ctr);
    if (hr > Rt*1.2) continue;
    float Ht = 10. + 12.*hh.z;
    float cn = (N2(q*1.7 + hh.xy*50.) - .5)*.5 + (N2(q*4.3) - .5)*.22*(1. - fd);
    float u = Ht*(1. - (hr + cn)/Rt);
    float tk = 1.1 + .3*hh.x, ti = floor(u/tk), tf = u/tk - ti;
    best = max(best, mix((ti + pow(clamp(tf, 0., 1.), .45))*tk, u, fd));
  }
  return best*fm;
}
vec2 heroC(vec3 p){
  float best = 1e3, mat = 11.;
  for (int k = 0; k < 6*I1; k++) {
    float fk = float(k);
    vec4 hh = h4(vec2(fk, 3. + SEED));
    float a = 2.1 + fk*.85 + (hh.x - .5)*.4;
    vec2 cp = vec2(.3, 1.) + vec2(cos(a), sin(a))*(8.8 + 2.2*hh.y);
    float hr = length(p.xz - cp), Rt = 1.45 + .75*hh.z, Ht = 15. + 8.*hh.w;
    if (hr > Rt + 1.) { best = min(best, hr - Rt - .6); continue; }
    float y = p.y - terrB(cp) + .5;
    if (y > Ht + 1.) { best = min(best, y - Ht - .5); continue; }
    float trunk = max(hr - (.3 - .01*y), -y - 1.);
    // a sugi: sprays leaving the trunk in a spiral (no two at one height), closer together toward the top, short and
    // raised up there, long and hanging below, each broken into tufts of several sizes with dark gaps to the trunk
    float y0 = 2.3 + 1.7*hh.x, u = clamp((y - y0)/(Ht - y0), 0., 1.);
    float env = Rt*pow(1. - u, .8);
    vec2 dv = (p.xz - cp)/max(hr, 1e-3);
    float dn = N3(vec3(p.x*1.3, (y + hr*1.2)*1.9, p.z*1.3) + hh.xyz*40.), fn = N3(p*4.4 + fk*9.);
    float tuf = N3(vec3(dv*2.2, y*1.2) + hh.zyx*30.)*.75 + fn*.25;
    // the spray phase turns round the trunk: the left and right outlines are half a spray apart
    float ph2 = dot(dv, vec2(cos(hh.y*6.28), sin(hh.y*6.28)))*.5 + dv.x*dv.y + tuf*.6;
    float sp = 1.25 + 1.2*u, droop = (.18 + .22*(1. - u))*hr;
    float tf = fract((y - y0)*sp + droop*sp + ph2 + (dn - .5)*.9);
    float spray = smoothstep(.0, .3, tf)*smoothstep(1., .5, tf);
    float r = env*(.3 + .95*smoothstep(.3, .7, tuf))*(.42 + .62*spray)*mix(.55, 1., smoothstep(.0, .3, u)*.6 + .4*spray) + (fn - .5)*.3*min(env, 1.);
    float fol = max((hr - r)*.34, max(y0 - hr*.7 - y, y - Ht - .3));
    if (trunk < best) { best = trunk; mat = 12.; }
    if (fol < best) { best = fol; mat = 11.; }
  }
  return vec2(best, mat);
}
#endif
#ifdef OBJS
vec2 toro(vec3 p){
#ifdef OBJP
  // a snow-viewing lantern (yukimi) at the water: four curved legs, a low hexagonal fire box with paper windows,
  // a wide umbrella roof with turned-up corners carrying a deep loaf of snow
  float r2 = length(p.xz);
  if (r2 > .74 || p.y > 1.1) return vec2(max(r2 - .69, p.y - 1.05), 4.);
  vec2 f = abs(p.xz); const vec2 kk = vec2(-.8660254, .5);
  float y = p.y, yl = clamp(y/.37, 0., 1.);
  float ga = (f.x + f.y)*.7071068, gb = (f.x - f.y)*.7071068;
  float leg = max(length(vec2(ga - .13 - .17*pow(1. - yl, 2.2), gb))*.75 - .05 - .025*(1. - yl)*(1. - yl), max(y - .4, -y - .03));
  vec2 hx = f; hx -= 2.*min(dot(kk, hx), 0.)*kk;
  float ap = hx.y, cn = clamp(abs(hx.x)/(ap*.57735 + 1e-3), 0., 1.);
  float fb = max(ap - .17, abs(y - .47) - .1);
  fb = max(fb, -max(max(abs(y - .475) - .066, abs(p.x) - .072), .1 - abs(p.z)));
  float d = min(min(leg, fb), max(ap - .21, abs(y - .365) - .028));
  float lift = .07*cn*cn*cn*smoothstep(.3, .64, ap);
  float yt = .6 + .2*pow(clamp(1. - ap/.64, 0., 1.), 1.5) + lift;
  float kasa = max(ap - .64 - .04*cn*cn*cn, max(.572 + lift*.9 + .035*smoothstep(.35, .64, ap) - y, y - yt))*.7;
  kasa = min(kasa, length((p - vec3(0., .84, 0.))*vec3(1., .85, 1.)) - .055);
  d = min(d*.85 - .004, kasa) + (N3(p*40.) - .5)*.007 + (N3(p*13.) - .5)*.006;
  float mat = 4.;
  float paper = max(ap - .13, abs(y - .475) - .07);
  if (paper < d) { d = paper; mat = 6.; }
  float ea = ap/(.65 + .04*cn*cn*cn);
  float thk = .13*SNOWD*sqrt(max(1. - ea*ea*ea*ea, 0.))*(1. - .35*cn*cn*cn*cn*smoothstep(.2, .5, ap)) + .03*(N3(p*7.) - .5);
  float sn = max(max(ap - .665 - .045*cn*cn*cn, y - yt - thk), yt - .03 - y)*.7 - .016;
  if (sn < d) { d = sn; mat = 5.; }
  return vec2(d, mat);
#else
  // a stone pedestal lantern: base, stem, platform, fire box with windows, thick cap with curled corners, jewel, snow
  float r2 = length(p.xz);
  if (r2 > .5 || p.y > 1.5) return vec2(max(r2 - .45, p.y - 1.45), 4.);
  vec2 f = abs(p.xz); const vec2 kk = vec2(-.8660254, .5);
  f -= 2.*min(dot(kk, f), 0.)*kk;
  float ap = f.y, cn = clamp(abs(f.x)/(ap*.57735 + 1e-3), 0., 1.), y = p.y;
  float d = max(ap - .2 + .35*max(y - .07, 0.), abs(y - .065) - .065);
  d = min(d, max(r2 - .078 + .02*(y - .13), abs(y - .39) - .27));
  d = min(d, max(r2 - .094, abs(y - .42) - .016));
  d = min(d, max(ap - .11 - .9*(y - .63), abs(y - .69) - .05));
  float ch = max(ap - .14, abs(y - .87) - .13);
  ch = max(ch, -max(max(abs(y - .875) - .085, abs(p.x) - .062), .08 - abs(p.z)));
  d = min(d, ch)*.85 - .006;
  float lift = .075*cn*cn*cn*smoothstep(.16, .36, ap);
  float yt = 1.075 + .17*pow(clamp(1. - ap/.36, 0., 1.), 1.3) + lift;
  float kasa = max(ap - .36 - .04*cn*cn*cn, max(1.0 + lift*.85 - y, y - yt))*.7;
  kasa = min(kasa, min(length((p - vec3(0., 1.31, 0.))*vec3(1., .85, 1.)) - .052, max(r2 - .036, abs(y - 1.255) - .03)));
  d = min(d, kasa) + (N3(p*40.) - .5)*.006;
  float mat = 4.;
  float paper = max(ap - .115, abs(y - .875) - .09);
  if (paper < d) { d = paper; mat = 6.; }
  // a pillow of snow that follows the roof, thins to a rounded lip just past its edge
  float ea = ap/(.37 + .04*cn*cn*cn);
  float thk = .085*SNOWD*sqrt(max(1. - ea*ea*ea*ea, 0.)) + .02*(N3(p*9.) - .5);
  float sn = max(max(ap - .38 - .045*cn*cn*cn, y - yt - thk), yt - .03 - y)*.7 - .012;
  sn = min(sn, length((p - vec3(0., 1.36, 0.))*vec3(1., 1.5, 1.)) - .06);
  sn = min(sn, max(ap - .2, abs(y - .748) - .012) - .006);
  if (sn < d) { d = sn; mat = 5.; }
  return vec2(d, mat);
#endif
}
vec2 paperP(vec3 q){
  float H = PP.w;
  float bnd = max(length(q.xz - vec2(.2, 0.)) - .62, q.y - H - .2);
  if (bnd > .1) return vec2(bnd, 7.);
  vec3 b = q; b.x -= .015*q.y;
  float post = max(length(b.xz) - .054 + .008*q.y/H - .008*(N3(q*vec3(9., 2.2, 9.)) - .5) - .004*N3(q*vec3(34., 3., 34.)), max(q.y - H, -q.y - .3));
  float arm = sdCap(q, vec3(.0, H - .14, 0.), vec3(.47, H - .07, .0), .021) + (N3(q*26.) - .5)*.006;
  float d = min(post, arm)*.9; float mat = 7.;
  vec3 lc = vec3(.4, H - .55, 0.), l = q - lc;
  d = min(d, sdCap(q, vec3(.4, H - .1, 0.), lc + vec3(0., .22, 0.), .004));
  float body = (length(l/vec3(.15, .21, .15)) - 1.)*.15 + .0025*smoothstep(.6, 1., abs(sin(l.y*95.)));
  body = max(body, abs(l.y) - .18);
  if (body < d) { d = body; mat = 8.; }
  float caps = max(length(l.xz) - .085, abs(abs(l.y) - .19) - .025) - .004;
  if (caps < d) { d = caps; mat = 17.; }
  float sn = min(length((l - vec3(0., .225, 0.))*vec3(1., 2.2, 1.)) - .075, sdCap(q*vec3(1., 1.5, 1.), vec3(.02, (H - .115)*1.5, 0.), vec3(.43, (H - .045)*1.5, 0.), .026)/1.5 + (N3(q*20.) - .5)*.01);
  sn = min(sn, length((q - vec3(.015*H, H + .005, 0.))*vec3(1., 2.2, 1.)) - .068 + (N3(q*17.) - .5)*.012);
  if (sn < d) { d = sn; mat = 3.; }
  return vec2(d, mat);
}
vec2 fence(vec3 p){
  vec2 rp = p.xz - FEN.xy; float ca = cos(FEN.w), sa = sin(FEN.w);
  float u = ca*rp.x + sa*rp.y, v = -sa*rp.x + ca*rp.y, L = FEN.z;
  float bnd = max(max(abs(v) - .2, max(-u - .15, u - L - .15)), p.y - 2.05);
  if (bnd > .1) return vec2(bnd, 9.);
  float y = p.y - .28;
  float uc = clamp(u, .01, L - .01), cid = floor(uc/.052), hj = h1(vec2(cid, 5.));
  float top = 1.52 + .04*hj;
  float slat = max(length(vec2(u - (cid + .5)*.052, v)) - (.02 + .0045*hj), max(y - top, -y - .3));
  float nd = fract((y + hj*.3)/.34);
  slat -= .003*smoothstep(.04, .0, min(nd, 1. - nd));
  float d = slat; float mat = 9.;
  float ryN = y < .55 ? .28 : (y < 1.08 ? .82 : 1.34), yr = y - ryN;
  float ue = max(-u - .05, u - L - .05);
  d = min(d, max(length(vec2(yr, v + .05)) - .019, ue));
  float pc = clamp(floor(u/1.8 + .5), 0., floor(L/1.8))*1.8;
  d = min(d, max(length(vec2(u - pc, v + .02)) - .042, max(y - top - .1, -y - .3)));
  d = min(d, max(length(vec2(y - top - .015, v)) - .036, max(-u - .03, u - L - .03)));
  vec3 wp = p*5.;
  float sn = max(length(vec2((y - top - .05*SNOWD)*1.25, v*.85)) - .055*min(SNOWD, 1.4) - .03*(N3(wp) - .5), max(-u - .02, u - L - .02));
  sn = min(sn, max(length(vec2((yr - .028)*1.6, (v + .05)*1.1)) - .014 - .012*(N3(wp*2.) - .55), ue));
  if (sn < d) { d = sn; mat = 3.; }
  return vec2(d, mat);
}
#endif
#ifdef BACKP
vec2 shelter(vec3 p){
  vec3 q = p - vec3(SHL.x, .28, SHL.y); q.xz = rot(q.xz, SHL.z);
  float W = 1.15, D = .8;
  float bnd = max(max(abs(q.x) - W - .6, abs(q.z) - D - .7), q.y - 2.95);
  if (bnd > .1) return vec2(bnd, 7.);
  float d = sdBox(vec3(abs(q.x) - W, q.y - 1.05, abs(q.z) - D), vec3(.055, 1.05, .055)) - .006;
  d = min(d, sdBox(vec3(q.x, q.y - 2.08, abs(q.z) - D), vec3(W + .15, .06, .05)));
  d = min(d, sdBox(vec3(abs(q.x) - W, q.y - 2.08, q.z), vec3(.05, .05, D + .1)));
  d += (N3(q*vec3(30., 4., 30.)) - .5)*.004;
  float mat = 7.;
  vec2 rn = normalize(vec2(.42, 1.));
  float pl = dot(vec2(abs(q.z), q.y - 2.48), rn);
  float ext = max(abs(q.x) - W - .35, abs(q.z) - D - .45);
  d = min(d, max(abs(pl + .035) - .035, ext));
  float sn = max(max(pl - .16 - .04*(N3(q*3.) - .5), -pl - .01), max(abs(q.x) - W - .4, abs(q.z) - D - .5));
  if (sn < d) { d = sn; mat = 3.; }
  float bench = min(sdBox(q - vec3(0., .44, -D + .22), vec3(W - .06, .025, .19)) - .006, sdBox(vec3(abs(q.x) - W + .3, q.y - .2, q.z + D - .22), vec3(.03, .22, .15)));
  if (bench < d) { d = bench; mat = 7.; }
  vec3 tq = q - vec3(.38, .49, -D + .2); tq.xz = rot(tq.xz, .25);
  float tw = sdBox(tq, vec3(.16, .022, .11)) - .014 + .0015*sin(tq.x*70.);
  if (tw < d) { d = tw; mat = 13.; }
  return vec2(d, mat);
}
float stones(vec3 p){
  if (p.y > .7) return p.y - .6;
  float d = 1e3;
  for (int k = 0; k < 5*I1; k++) {
    float fk = float(k);
    vec4 hh = h4(vec2(fk, 11.));
    vec2 cc = mix(vec2(.0, .05), vec2(SHL.x + .9, SHL.y + .8), fk/4.6) + (hh.xy - .5)*.22*min(fk, 1.);
    vec3 q = p - vec3(cc.x, .3, cc.y); q.xz = rot(q.xz, hh.z*3.);
    vec3 rs = vec3(.3 + .08*hh.w, .1, .23 + .06*hh.x);
    float e = smax((length(q/rs) - 1.)*.1, q.y - .065, .04) + (N3(p*9. + fk*7.) - .5)*.02;
    d = min(d, e);
  }
  return d;
}
#endif
#ifdef FARP
vec2 house(vec3 p, vec4 H, float s){
  vec3 q = (p - H.xyz)/s;
  float bd = length(q) - 7.;
  if (bd > 1.) return vec2((bd - .5)*s, 16.);
  float body = min(sdBox(q - vec3(0., 1.6, 0.), vec3(3.6, 1.6, 1.7)), sdBox(q - vec3(-3., .9, 1.2), vec3(1.4, .9, 1.4)));
  float pl = dot(vec2(abs(q.z), q.y - 3.9), normalize(vec2(.6, 1.)));
  return vec2(min(body, max(abs(pl) - .1, max(abs(q.x) - 4., abs(q.z) - 2.3)))*s, 16.);
}
#endif
float GF = 0., GM = 0.;
vec2 map(vec3 p){
#ifdef OBJS
  // the objects alone; a ground plane only for the AO taps
  vec2 r = vec2(GF > .5 ? p.y - .26 : 1e3, 1.);
#else
  float th = terr(p.xz);
  vec2 r = vec2((p.y - th)*.48, 1.);
#ifdef NEARP
  // the moon's shadow rays see the stones only (the snow's own low swells banded under a low moon)
  if (GM > .5) r.x = 1e3;
#endif
#endif
  vec2 rel = p.xz - vec2(.3, 1.);
  bool inB = abs(rel.x) < 14. && abs(rel.y) < 13. && p.y < 24.;
#ifdef FARP
  float fm = forestM(p.xz);
  if (fm > .01 && p.y < th + 24.) { float dc = (p.y - th - canopy(p.xz, fm))*.24; if (dc < r.x) r = vec2(dc, 15.); }
  if (inB) { vec2 hc = heroC(p); if (hc.x < r.x) r = hc; }
#endif
#ifdef NEARP
  // the rim boulders and their snow: a height map baked per mint (RB_FS), fine relief from the noise volume
  vec2 hu2 = (p.xz - RBR.xy)/RBR.z;
  if (inB && p.y < (SIMD.w < 0. ? 2.1 : 1.3) && hu2.x > 0. && hu2.y > 0. && hu2.x < 1. && hu2.y < 1.) {
    vec4 hf = hfAt(hu2);
    float dr = (p.y - hf.x + (N3(p*7.) - .5)*mix(.022, .006, smoothstep(.0, .03, hf.y)))*.27;
    if (dr < r.x) r = vec2(dr, 2.);
  }
#endif
#ifdef OBJS
  if (inB) {
#ifdef OBJP
    vec4 T = TA;
#else
    vec4 T = TB;
#endif
    vec3 lq = p - vec3(T.x, .3, T.y); lq.xz = rot(lq.xz, T.z); vec2 t = toro(lq/T.w); t.x *= T.w; if (t.x < r.x) r = t;
#ifdef OBJP
    lq = p - vec3(PP.x, .3, PP.y); lq.xz = rot(lq.xz, PP.z);
    t = paperP(lq); if (t.x < r.x) r = t;
    t = fence(p); if (t.x < r.x) r = t;
#else
    t = shelter(p); if (t.x < r.x) r = t;
    float sd = stones(p); if (sd < r.x) r = vec2(sd, 14.);
#endif
  }
#endif
  // (not for shadow rays: the box's wall read as an occluder and banded the moonlit snow)
  if (!inB && GF < 2.5) r.x = min(r.x, max(max(abs(rel.x) - 13.9, abs(rel.y) - 12.9), p.y - 23.9) + .05);
#ifdef FARP
  if (p.z > 60.) for (int i = 0; i < 4*I1; i++) { vec4 H = i == 0 ? vec4(RY.xyz, 1. - step(1.5, FARM)) : (i == 1 ? HS0 : (i == 2 ? HS1 : HS2)); if (H.w > 0.) { vec2 t = house(p, H, i == 0 ? 2.7 : 1.); if (t.x < r.x) r = t; } }
  else r.x = min(r.x, 105. - p.z);
#endif
  return r;
}
vec3 nTap(int k){ return k == 0 ? vec3(1., -1., -1.) : (k == 1 ? vec3(-1., -1., 1.) : (k == 2 ? vec3(-1., 1., -1.) : vec3(1.))); }
void setC(inout vec4 v, int i, float x){ if (i == 0) v.x = x; else if (i == 1) v.y = x; else if (i == 2) v.z = x; else v.w = x; }
void main(){
  vec2 uv = gl_FragCoord.xy*uS.x;
  vec3 ro = CAMP, rd = normalize(FW + ((uv.x*2. - 1.)*RT + (uv.y*2. - 1.)*UPV)*TANH);
  bool mir = MIRF > .5;
  float t = .02;
  bool sky0 = false;
  if (mir) { if (rd.y <= .002) sky0 = true; else t = -ro.y/rd.y + .01; }
  float tw = 1e9;
  if (!mir && rd.y < 0.) { float tt = -ro.y/rd.y; vec3 pw = ro + rd*tt; if (poolD(pw.xz) < 0.) tw = tt; }
  float tEnd = min(2600., tw);
#ifndef FARP
  { vec3 bl = vec3(-13.7, -2., -12.), bh = vec3(14.3, 24., 14.); vec3 iv = 1./rd, ta = (bl - ro)*iv, tb = (bh - ro)*iv, tx = max(ta, tb); tEnd = min(tEnd, min(tx.x, min(tx.y, tx.z))); }
#endif
  // one loop, one map() call site: the march, then the normal taps, the AO taps and the shadow rays as jobs
  int ph = 0, k = 0, li = -1, total = sky0 ? 0 : int(uS.w), nst = int(uS.y);
  float m = 0., ne = 0., occ = 0., ow = 1., ao = 1., st = 1e9, smx = 0., sres = 1.;
  float tp = t, dp = 1.; int nref = 0;
  bool hit = false;
  vec3 p = ro, n = vec3(0., 1., 0.), nacc = vec3(0.), sp0 = ro, sd = vec3(0., 1., 0.);
  vec4 shv = vec4(1.);
  for (int it = 0; it < total; it++) {
    vec3 q = ph == 0 ? ro + rd*t : (ph == 1 ? p + nTap(k)*ne : (ph == 2 ? p + n*(.06*float(k*k)) : sp0 + sd*st));
    GF = float(ph); GM = ph == 3 && li == 3 ? 1. : 0.;
    vec2 rr = map(q);
    if (ph == 0) {
      float eps = .0007*t + .0012;
      if (rr.x < -eps && nref < 4) { t = tp + (t - tp)*dp/max(dp - rr.x, 1e-6); nref++; continue; }
      if (rr.x < eps) { hit = true; m = rr.y; p = q; ph = 1; k = 0; ne = (rr.y > 1.5 && rr.y < 2.5 ? .035 : rr.y < 3.5 || rr.y > 10.5 && rr.y < 11.5 || rr.y > 13.5 && rr.y < 15.5 ? .022 : .004) + .0012*t; continue; }
      tp = t; dp = rr.x;
      t += max(rr.x, eps*.6);
      if (t > tEnd || it >= nst) break;
      continue;
    } else if (ph == 1) {
      nacc += nTap(k)*rr.x; k++;
#ifdef OBJS
      // the objects take their occlusion from the ground plane alone (no AO taps)
      if (k == 4) { n = normalize(nacc); ao = clamp(.45 + 2.2*(p.y - .26) + .25*n.y, 0., 1.); break; }
      continue;
    }
#else
      if (k == 4) { n = normalize(nacc); ph = 2; k = 1; }
      continue;
    } else if (ph == 2) {
      float hd = .06*float(k*k); occ += (hd - rr.x)*ow; ow *= .6; k++;
      if (k == 5) { ao = clamp(1. - 1.4*occ, 0., 1.); ph = 3; }
      if (ph == 2) continue;
#ifdef NEARP
    } else {
      sres = min(sres, 6.*(rr.x + .03)/st);
      if (sres < .01 || st >= smx) { setC(shv, li, clamp(sres, 0., 1.)); st = 1e9; } else st = min(st + clamp(rr.x, li == 3 ? .06 : .02, .6), smx);
    }
    if (st > 1e8) {
      // the next shadow ray: lamps 0-2, then the moon; a ray not worth casting gets no length
      li++;
      if (li > 3) break;
      vec3 l = (li == 0 ? L0.xyz : (li == 1 ? L1.xyz : L2.xyz)) - p; float dl = length(l);
      sd = li == 3 ? MOOND : l/dl; sp0 = p + n*.03; st = li == 3 ? .3 : .05; sres = 1.;
      smx = li == 3 ? (MOOND.y > 0. && t < 60. ? 30. : 0.) : (dl < 28. && dot(n, sd) > -.35 ? dl - (li == 1 ? .22 : .32*(li == 0 ? TA.w : TB.w)) : 0.);
      if (li < 3 && (li == 0 ? L0.w : (li == 1 ? L1.w : L2.w)) <= 0.) smx = 0.;
    }
#else
    }
    break;
#endif
#endif
  }
#ifdef NEARP
  // a shadow ray the step budget cut short keeps what it found so far (else its result jumps with the march's count)
  if (li >= 0 && li <= 3 && st < 1e8) setC(shv, li, clamp(sres, 0., 1.));
#endif
#ifndef FARP
  if (!hit && !sky0) discard;
#endif
#ifdef FARP
  vec3 hz = hazeCol(rd);
#endif
  vec4 oc = vec4(0., 0., 0., ENC(-2.)); float fd = 1.;
  if (sky0) {}
  else if (!hit && t >= tw) { oc = vec4(0., 0., 0., ENC(-1.)); fd = tw/FARD; }
  else if (!hit && (t > 2500. || rd.y > 0.)) {}
#ifdef FARP
  else if (!hit) { oc = vec4(ENCC(hz), ENC(.35)); fd = .9999; }
#endif
  else {
  // ---------- materials ----------
  vec3 alb = vec3(.8, .82, .86); float rough = 1., snowy = 1., wet = 0.;
  vec3 emi = vec3(0.);
  float nv = N3(p*6.), nf = N3(p*21.);
  if (m < 1.5) {
#ifndef OBJS
    float rock = smoothstep(.62, .45, n.y + (nv - .5)*.25);
    alb = mix(vec3(.78, .8, .84)*(.92 + .08*nf), vec3(.05, .05, .055)*(.6 + .8*nv), rock);
    snowy = 1. - rock;
    if (THIN > 0.) { float bare = THIN*(.22 + .5*smoothstep(.52, .74, N3(p*1.6)*.75 + nv*.25)); alb = mix(alb, mix(vec3(.06, .05, .035), vec3(.17, .12, .06), smoothstep(.5, .7, N3(p*31.)))*(.7 + .6*nv), bare); snowy *= 1. - bare; rock = max(rock, bare); }
#ifdef NEARP
    float pd = poolD(p.xz);
    float melt = smoothstep(.35, -.05, pd + (nv - .5)*.3);
    alb = mix(alb, vec3(.035, .032, .03)*(.7 + .6*nf), melt);
    wet = melt; snowy = (1. - rock)*(1. - melt);
    // a line of footprints from the house path down to the water, softened by the new snow
    { vec2 fa = vec2(-2.8, -1.), fd = normalize(vec2(1.3, 3.3)), fq = p.xz - fa; float fs = dot(fq, fd), fi = floor(fs/.36);
      if (fs > 0. && fs < 3.4) { float fl = dot(fq, vec2(-fd.y, fd.x)) - (mod(fi, 2.) < 1. ? .1 : -.1) - .03*(h1(vec2(fi, 3.)) - .5), fo = fs - (fi + .5)*.36;
        float fp = smoothstep(1., .55, length(vec2(fo/.15, fl/.065)))*(1. - rock)*(1. - melt); alb *= 1. - .3*fp; ao *= 1. - .25*fp; } }
#endif
#endif
#ifdef NEARP
  } else {
    // rim boulders: dark grey-brown andesite (or pale speckled granite), pitted, pale lichen rings on the dry tops, a
    // line of moss where the steam keeps it damp, wet and bare toward the water, a pale crust at the water line
    vec4 hf = hfAt((p.xz - RBR.xy)/RBR.z);
    float pd = poolD(p.xz);
    float pit = smoothstep(.66, .8, nf);
    vec3 base = RIMT < .5 ? vec3(.13, .112, .098)*(.65 + .7*nv)*(.82 + .36*nf) : vec3(.27, .262, .25)*(.8 + .35*nv)*mix(.55, 1.06, smoothstep(.36, .5, N3(p*70.)));
    base *= (.62 + .76*hf.z)*(.85 + .3*N3(p*95.))*(1. - .35*pit);
    float lich = smoothstep(.035, .0, abs(N3(p*4.1 + hf.z*20.) - .62))*smoothstep(.2, .6, n.y)*smoothstep(.15, .6, pd);
    base = mix(base, vec3(.44, .45, .38), lich*.55);
    base = mix(base, vec3(.045, .06, .03), smoothstep(.55, .7, N3(p*3.3 + 9.))*.7*smoothstep(.05, .25, pd)*smoothstep(.7, .3, pd));
    wet = max(smoothstep(.2, .02, p.y + .04*(nv - .5)), .7*smoothstep(.28, .0, pd + (nv - .5)*.25))*smoothstep(.97, .7, n.y);
    base *= 1. - .55*wet;
    float crust = smoothstep(.05, .0, abs(p.y - .03 - .035*nv))*smoothstep(.3, -.05, pd);
    base = mix(base, vec3(.4, .38, .31)*(.7 + .5*nf), crust*.8);
    snowy = smoothstep(.006, .02, hf.y);
    alb = mix(base, vec3(.8, .82, .86)*(.93 + .07*nf), snowy);
    // the soft blue shadow under the cushion's lip
    ao *= 1. - .55*hf.w*(1. - snowy);
    rough = mix(mix(.85, .42, wet*(1. - crust)), 1., snowy); wet *= 1. - snowy;
#endif
#ifdef OBJS
  } else if (m < 3.5 || (m > 4.5 && m < 5.5)) {
    alb = vec3(.8, .82, .86)*(.93 + .07*nf);
  } else if (m < 4.5) {
    alb = vec3(.27, .26, .245)*(.7 + .5*nv)*(.8 + .4*smoothstep(.3, .6, nf));
    alb = mix(alb, vec3(.05, .06, .035), smoothstep(.55, .75, N3(p*7. + 3.))*.55);
    snowy = 0.; rough = .85;
  } else if (m < 6.5) {
#ifdef OBJP
    vec4 T = TA; vec3 lc = C0.rgb;
#else
    vec4 T = TB; vec3 lc = C2.rgb;
#endif
    // the fire box's paper: brightest low in the middle where the flame sits, fibres, the frame bars
    vec3 lq = p - vec3(T.x, .3, T.y); lq.xz = rot(lq.xz, T.z); lq /= T.w;
#ifdef OBJP
    float g = exp(-dot(lq.xz, lq.xz)*25. - (lq.y - .45)*(lq.y - .45)*150.);
#else
    float g = exp(-dot(lq.xz, lq.xz)*25. - (lq.y - .83)*(lq.y - .83)*70.);
#endif
    float bars = (.35 + .65*smoothstep(.04, .1, abs(fract(lq.y*12.) - .5)))*(.45 + .55*smoothstep(.03, .08, abs(fract((lq.x + lq.z)*9.) - .5)));
    emi = (mix(lc*vec3(1., .55, .22), lc*vec3(1., .8, .5), g)*(.1 + .38*g) + vec3(1., .9, .7)*lc.r*exp(-dot(lq.xz, lq.xz)*90. - (lq.y - .45)*(lq.y - .45)*500.)*.6)*(.75 + .5*N3(lq*70.))*bars;
    alb = vec3(.6, .55, .45); snowy = 0.;
  } else if (m < 7.5) {
    alb = vec3(.085, .062, .045)*(.55 + .9*N3(p*vec3(30., 2.5, 30.)))*(.8 + .4*nf);
    alb = mix(alb, vec3(.72, .75, .8), RIME*.6*smoothstep(.4, .7, nf));
    snowy = RIME*.4; rough = .9;
#ifdef OBJP
  } else if (m < 8.5) {
    vec3 lq = p - vec3(PP.x, .3, PP.y); lq.xz = rot(lq.xz, PP.z); vec3 l = lq - vec3(.4, PP.w - .55, 0.);
    float rib = smoothstep(.75, 1., abs(sin(l.y*95.)));
    float fall = 1. - .45*smoothstep(.1, .19, abs(l.y));
    emi = C1.rgb*(.07 + .25*exp(-l.y*l.y*70.))*(.75 + .5*N3(lq*45.))*(.9 + .2*nf)*(1. - .7*rib)*fall;
    alb = vec3(.5); snowy = 0.;
  } else if (m < 9.5) {
    // split bamboo, each pole its own straw, grey-green or weathered brown, darker nodes, black palm-rope ties
    vec2 rp = p.xz - FEN.xy; float u = cos(FEN.w)*rp.x + sin(FEN.w)*rp.y, y = p.y - .28;
    vec4 hb = h4(vec2(floor(clamp(u, .01, FEN.z - .01)/.052), 9.));
    vec3 bc = mix(vec3(.34, .28, .15), vec3(.24, .25, .17), hb.x);
    bc = mix(bc, vec3(.16, .13, .1), hb.y*hb.y*.8)*(.75 + .5*N3(p*vec3(40., 3., 40.)));
    float nd = fract((y + hb.z*.3)/.34); bc *= 1. - .4*smoothstep(.025, .0, min(nd, 1. - nd));
    float yr = y - (y < .55 ? .28 : (y < 1.08 ? .82 : 1.34));
    float tie = smoothstep(.034, .024, abs(yr))*step(fract(u/.37 + .13*floor(y/.5)), .2);
    alb = mix(bc, vec3(.02, .018, .016)*(.7 + .6*nf), tie);
    alb = mix(alb, vec3(.72, .75, .8), RIME*.7*smoothstep(.35, .65, nf*.6 + N3(p*vec3(60., 9., 60.))*.4));
    snowy = RIME*.5; rough = .6;
#else
  } else if (m < 13.5) {
    alb = vec3(.72, .72, .69); float st = smoothstep(.01, .0, abs(fract(p.x*7.) - .5) - .45);
    alb = mix(alb, vec3(.2, .3, .45), st*.6); snowy = 0.;
  } else {
    alb = vec3(.07, .068, .065)*(.6 + .8*nv)*(.8 + .4*nf);
    float dust = smoothstep(.55, .7, N3(p*14.))*smoothstep(.6, .9, n.y);
    alb = mix(alb, vec3(.75, .77, .8), dust*.8); snowy = dust; rough = .45; wet = .4;
#endif
#endif
#ifdef FARP
  } else if (m < 11.5 || m > 14.5 && m < 15.5) {
    float s = m < 11.5 ? smoothstep(.3 - .3*RIME, .6, n.y + (nv - .5)*.3 + (nf - .5)*.12) : smoothstep(.2, .55, n.y + (nv - .5)*.7);
    // (n12) across the valley the canopy's snow is a soft bloom on the crowns, not one white stroke per spike
    if (m > 14.5) s = mix(s, .16 + .3*smoothstep(-.3, .9, n.y), smoothstep(18., 60., t));
    alb = mix(vec3(.022, .036, .026)*(.6 + .8*nf), vec3(.76, .78, .83), s);
    snowy = s;
  } else if (m < 12.5) {
    alb = vec3(.06, .04, .03)*(.6 + .8*N3(p*vec3(6., 1., 6.)));
    snowy = 0.;
  } else {
    alb = n.y > .55 ? vec3(.7, .72, .76) : vec3(.03, .024, .02)*(.7 + .6*nf);
    snowy = n.y > .55 ? 1. : 0.;
    if (n.y < .55) {
      vec3 q = p - RY.xyz;
      bool ry = FARM < 1.5 && length(q) < 24.;
      if (ry && q.z > -4.2) ry = false;
      vec2 wc = ry ? vec2(q.x/2.2, (q.y - .7)/2.9) : vec2((p.x + p.z)/2.1, (p.y - 1.)/2.2);
      vec2 cf = fract(wc), ci = floor(wc);
      vec4 w4 = h4(ci + 31.*SEED);
      float lit = step(w4.x, ry ? .58 : .5);
      float hw = ry ? .07 + .22*w4.y : .26, hv = ry ? .18 + .14*w4.z : .25, bl = .06;
      float w = smoothstep(hw - bl, hw + bl, cf.x)*smoothstep(1. - hw + bl, 1. - hw - bl, cf.x)*smoothstep(hv - bl, hv + bl, cf.y)*smoothstep(1. - hv*.7 + bl, 1. - hv*.7 - bl, cf.y)*step(-.5, ci.y)*step(ci.y, ry ? 1.5 : .5);
      emi = mix(vec3(1., .42, .14), vec3(1., .68, .38), w4.w)*(.3 + .7*w4.z)*(w + .05*lit)*lit*(ry ? .15 : .2);
      if (FARM > 1.5 && length(p.xz - HS0.xz) > 6.) emi = vec3(0.);
    }
#endif
  }
  // ---------- light ----------
  vec3 col = alb*AMB*(.5 + .5*n.y)*ao;
  float F = .03 + .97*pow(1. - max(dot(n, -rd), 0.), 5.);
#ifdef FARP
  for (int i = 0; i < 3*I1; i++) {
    vec4 L = i == 0 ? L0 : (i == 1 ? L1 : L2);
    vec3 l = L.xyz - p; float d2 = dot(l, l);
    col += (i == 0 ? C0.rgb : (i == 1 ? C1.rgb : C2.rgb))*(L.w/(d2 + 1.))*alb*max(dot(n, l)*inversesqrt(d2) + .3, 0.)*.6;
  }
#else
  vec3 lsum = vec3(0.);
  float stn = m > 1.5 && m < 2.5 ? 1. : 0.;
  for (int i = 0; i < 3*I1; i++) {
    vec4 L = i == 0 ? L0 : (i == 1 ? L1 : L2);
    vec4 C = i == 0 ? C0 : (i == 1 ? C1 : C2);
    vec3 l = L.xyz - p; float d2 = dot(l, l), dl = sqrt(d2); l /= dl;
    if (dl <= 28.) {
    float msk = i == 1 ? paperMask(-l) : toroMask(-l, i == 0 ? TA : TB);
    float att = L.w/(d2 + C.w*C.w)*msk;
    float nl = dot(n, l);
    float dif = mix(max(nl, 0.), max(0., (nl + .35)/1.35), snowy);
    // light bounced up from the lit snow
    col += C.rgb*att*alb*(.5 - .5*n.y)*.12*ao;
    // a thin rim along the stone's edges that face the lamp, from the lit steam behind them
    col += C.rgb*att*stn*pow(1. - max(dot(n, -rd), 0.), 3.)*smoothstep(-.3, .5, dot(l, rd))*.5*(1. - .6*snowy);
    if (!(att < .0005 || (dif <= 0. && wet < .1))) {
    float sh = i == 0 ? shv.x : (i == 1 ? shv.y : shv.z);
    vec3 h = normalize(l - rd); float nh = max(dot(n, h), 0.);
    float a2 = rough*rough*rough*rough; float dd = nh*nh*(a2 - 1.) + 1.;
    float spec = a2/(3.1416*dd*dd)*F*max(nl, 0.)*mix(.04, 1., wet);
    col += C.rgb*att*sh*(alb*dif + spec);
    lsum += C.rgb*att*sh;
    }}
  }
#ifdef NEARP
  // a stone in the dark is not black: the night's blue-violet on its top, the lit pool and steam on its side to the water
  if (stn > 0.) {
    vec3 tw = vec3(POOL.x, .35, POOL.y) - p; float dw = length(tw); tw /= dw;
    vec3 pgl = WALB*(C0.rgb*L0.w + C1.rgb*L1.w + C2.rgb*L2.w*.3);
    col += alb*ao*(AMB*vec3(.8, 1., 1.6)*(1.9 + 1.4*n.y)*abs(SIMD.w) + pgl*max(dot(n, tw)*.8 + .12, 0.)*.035/(1. + .08*dw*dw))*(1. - .7*snowy);
  }
  // snow glitter: a few grains turned to the lamps
  if (snowy > .3) {
    vec3 gp = floor(p*320.); vec4 gh = h4(gp.xz + gp.y*17.31);
    if (gh.w > .97) col += lsum*pow(max(dot(normalize(n + (gh.xyz - .5)*1.3), -rd), 0.), 60.)*1.5*snowy;
  }
#endif
#endif
  col += emi;
  // the moon term (lit colour added per frame by how far the moon is out)
  float lum = dot(alb, vec3(.3, .55, .15));
  float mt = 0.;
  if (MOOND.y > 0.) { float ml = max(dot(n, MOOND), 0.); if (ml > 0. && t < 60.) ml *= shv.w; mt = lum*(ml*1.6 + .25*(.5 + .5*n.y)*ao); }
  float fg = 1. - exp(-max(t - (FOGK > .05 ? 1.5 : 6.), 0.)*FOGK);
#ifndef FARP
  col = mix(col, HAZE*1.3, fg);
#else
  col = mix(col, hz, fg);
#endif
  mt = mix(mt, .35, fg);
  oc = vec4(ENCC(col), ENC(mt));
#ifdef FARP
  if (m < 1.5 && abs(p.x - .3) < 13.6 && abs(p.z - 1.) < 12.6 && p.y < 23.) t *= 1.03;
#endif
  fd = min(t/FARD, .99990);
  }
  o = oc; gl_FragDepth = fd;
}`,Jt=U+de+Fe+Yt+vt+`
out vec4 o;
float N3(vec3 p){ return textureLod(uN3, p*(1./64.), 0.).r; }
float at2(float y, float x){ float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay)/max(max(ax, ay), 1e-9)); if (ay > ax) a = 1.5707963 - a; if (x < 0.) a = 3.1415927 - a; return y < 0. ? -a : a; }
void main(){
  vec2 w = RBR.xy + gl_FragCoord.xy*(RBR.z/RBR.w);
  vec2 q = (w - POOL.xy)/POOL.zw;
  float th = at2(q.y, q.x), pd = poolD(w);
  float H = -9., sd = 0., tone = .5, lip = 0.;
  float melt = smoothstep(-.05, .32, pd + .2*(N3(vec3(w*2.6, 50.)) - .5));
  // (n12) the rim's setting, one #define per setting injected at make (the home compiles none of these)
  float lan = at2(TA.y - POOL.y, TA.x - POOL.x);
#ifdef RIMK2
  vec2 la = vec2(cos(lan), sin(lan));
#endif
#ifdef RIMK3
  float bc = lan - .9;
#endif
  // river boulders rounded by water, of very different sizes, set half sunk and leaning; small fill stones wedged
  // in the gaps (ring 2); each wears its own cushion of snow whose lip runs out to the stone's shoulder
  for (int ring = 0; ring < min(int(RBR.w), 3); ring++) {
    float NR = ring == 1 ? 11. : 15., fr = float(ring);
    float k = floor(th/6.2831853*NR + (ring == 2 ? 0. : .5));
    for (int j = 0; j < min(int(RBR.w), 3); j++) {
      float idx = mod(k + float(j) - 1. + NR, NR);
      vec4 h = h4(vec2(idx + 13.*fr, 7. + SEED));
      vec4 g = h4(vec2(idx + 13.*fr, 23. + SEED));
      float a = (idx + (ring == 2 ? .5 + (h.x - .5)*.2 : (h.x - .5)*.45))/NR*6.2831853;
      vec2 u = vec2(cos(a), sin(a)), nrm = normalize(u/POOL.zw);
#ifdef RIMK3
      // a third of the rim has no stones (the snow bank), and a cleft at its end where the spring runs in
      if (abs(mod(a - bc + 3.1415927, 6.2831853) - 3.1415927) < .95 || abs(mod(a - bc - 1.35 + 3.1415927, 6.2831853) - 3.1415927) < .2) continue;
#endif
      vec2 cxz = POOL.xy + u*poolR(u)*POOL.zw + nrm*(ring == 0 ? .04 + .12*h.y : (ring == 1 ? .6 + .35*h.y : .3 + .25*h.y));
      vec3 rs = ring == 0 ? vec3(.38 + .2*h.z, .3 + .16*h.w, .28 + .1*h.y) : (ring == 1 ? vec3(.55 + .3*h.z, .4 + .2*h.w, .45 + .2*h.x) : vec3(.17 + .09*h.z, .13 + .07*h.w, .14 + .06*h.y));
      float sz = ring == 2 ? 1. : (g.x < .34 ? .52 : (g.x < .84 ? 1. : 1.55));
      float tall = 0.;
#ifdef RIMK2
      // a group of upright stones at the back of the pool on the lantern's side, of unlike heights, leaning
      if (ring < 2 && dot(u, la) > .82 && length(cxz - TA.xy) > .8) { tall = .8 + 1.1*fract(h.w*5.3 + idx*.618 + fr*.31); sz = 1.; rs.xz *= vec2(1.2, .62); }
#endif
      rs *= sz;
      if (ring == 2 && g.y < .3) continue;
      float cy = ring == 0 ? .06 + .25*rs.y*h.w : (ring == 1 ? .08 + .15*rs.y : .07);
      vec2 lp = w - cxz; float ws = dot(lp, nrm)/rs.z, ra = g.z*6.2831853; lp = vec2(dot(lp, vec2(-nrm.y, nrm.x)), dot(lp, nrm));
      lp = vec2(cos(ra)*lp.x + sin(ra)*lp.y, -sin(ra)*lp.x + cos(ra)*lp.y);
      vec2 lq = lp/rs.xz;
      if (dot(lq, lq) > 2.2) continue;
      // a rounded outline: three soft lobes and two scales of wobble, never a straight edge
      float pg = 0.;
      for (int e = 0; e < min(int(RBR.w), 3); e++) { float fe = float(e), an = h.y*6.2831853 + fe*2.0944 + (fract(g.w*(3.1 + fe*1.7)) - .5)*1.2; pg += exp(dot(lq, vec2(cos(an), sin(an)))*3.5); }
      float d = mix(length(lq), log(pg/3.)/3.5 + .55, .3)*(1. + .16*(N3(vec3(w*1.3/sz, h.z*40.)) - .5) + .06*(N3(vec3(w*3.7, 9. + h.w*40.)) - .5));
      if (d > 1.15) continue;
      // a dome flattened on top, the shoulders rounding into the snow, the whole stone leaning a little
      vec2 fa = vec2(cos(h.y*6.28), sin(h.y*6.28));
      float A = (rs.y*(.62 + .25*h.z) + .25)*(g.y < .25 ? .75 : (g.y > .85 ? 1.15 : 1.));
      float dome = (cy - .25) + A*pow(max(1. - pow(min(d, 1.), 1.8 + 1.4*g.w), 0.), .3 + .25*h.x) - dot(lp, fa)*(.06 + .1*h.w);
      float slant = .06 + .1*h.w;
      if (tall > 0.) {
        // steep flanks, a broken slanting top (flat enough for a cap on some), never a cone or an egg
        slant = .12 + .55*fract(g.w*3.7 + h.x);
        float pr = pow(max(1. - pow(min(d, 1.), 1.4 + h.x), 0.), .55);
        dome = (cy - .25) + tall*pr - dot(lp, fa)*slant + tall*.12*(N3(vec3(w*1.9, 33. + h.z*40.)) - .5);
        dome = min(dome, cy - .25 + tall*(.8 + .1*h.y) - dot(lp, vec2(-fa.y, fa.x))*slant*.8);
      }
      float rough = rs.y*(.17*(N3(vec3(w*2.1, 30. + h.x*40.)) - .5) + .07*(N3(vec3(w*6.3, 60. + h.y*40.)) - .5));
      float hr = dome + rough - .3*smoothstep(.95, 1.15, d);
      // the cushion: thicker than a hand is long, round on top, ending in a blunt lip near the shoulder
      float bare = ring == 0 && sz < 1.2 && fract(g.z*7.13 + g.x*3.7) < .34 ? .1 : 1.;
      float D = (.1 + .12*h.w)*SNOWD*melt*bare*(.8 + .4*N3(vec3(w*4., 70.)))*(ring == 2 ? .6 : .5 + .5*min(sz, 1.))*(tall > 0. ? smoothstep(.34, .16, slant)*.8 : 1.);
      float dl = (.56 + .16*h.z)*(1. + .36*(N3(vec3(w*2.6, 80. + h.x*40.)) - .5))*(1. - .28*smoothstep(.1, -.7, ws))*(sz < .8 || ring == 2 ? .7 : (sz < 1.2 ? .86 : 1.))*(tall > 0. ? .5 : 1.);
      float cu = pow(max(1. - pow(d/dl, 5.), 0.), .45);
      float hs = D > .02 && d < dl ? max(hr, dome + rough*.25) + D*cu - .004 : -9.;
      float sf = max(hr, hs);
      if (sf > H) { H = sf; sd = max(hs - hr, 0.); tone = h.z; lip = D > .02 ? smoothstep(dl + .2, dl, d)*step(dl, d) : 0.; }
    }
  }
#ifdef RIMK3
  // the snow bank: the snow comes down to the water in a rounded bank, bare and dark where the water melts it back
  float db = abs(mod(th - bc + 3.1415927, 6.2831853) - 3.1415927);
  float bw = smoothstep(1.12, .85, db);
  if (bw > 0.) {
    float pb = pd + .3*(N3(vec3(w*.9, 93.)) - .5) + .08*(N3(vec3(w*3.1, 94.)) - .5);
    float bh = -.07 + (.44 + .12*(N3(vec3(w*1.3, 90.)) - .5))*pow(smoothstep(-.14, .6 + .25*N3(vec3(w*.8, 95.)), pb), .38) - (1. - bw)*.7;
    float ub = smoothstep(.035, -.01, bh);
    if (bh > H) { H = bh; sd = .3*(1. - ub); tone = .3; lip = ub; }
  }
  // the cleft: bare wet rock where the hot water runs in
  float dc = abs(mod(th - bc - 1.35 + 3.1415927, 6.2831853) - 3.1415927);
  float ch = -.04 + .32*smoothstep(-.1, 1.1, pd) - .35*smoothstep(.12, .2, dc) + .03*(N3(vec3(w*3., 99.)) - .5);
  if (pd > -.25 && pd < 1.3 && ch > H) { H = ch; sd = 0.; tone = .2; lip = 0.; }
#endif
  o = LDR ? vec4((H + 1.)/3., sd*4., tone, lip) : vec4(H, sd, tone, lip);
}`,Qo=U+de+vt+`
uniform vec4 uI[8];
#ifdef UIS
uniform highp usampler2D uP;
out uvec4 o;
vec4 fP(ivec2 i, int n){ return uintBitsToFloat(texelFetch(uP, clamp(i, ivec2(0), ivec2(n - 1)), 0)); }
vec4 bP(vec2 u, int n){ vec2 x = u*float(n) - .5, f = fract(x); ivec2 i = ivec2(floor(x)); return mix(mix(fP(i, n), fP(i + ivec2(1, 0), n), f.x), mix(fP(i + ivec2(0, 1), n), fP(i + ivec2(1), n), f.x), f.y); }
#define TF(i) fP(i, 128)
#define OUT(v) o = floatBitsToUint(v)
#else
uniform sampler2D uP;
out vec4 o;
#define TF(i) texelFetch(uP, i, 0)
#define OUT(v) o = v
#endif
void main(){
  if (uI[7].x > .5) {
    ivec2 ij = ivec2(gl_FragCoord.xy);
    vec2 c0 = TF(ij).rg;
    float hl = TF(max(ij - ivec2(1, 0), ivec2(0))).r, hr = TF(min(ij + ivec2(1, 0), ivec2(127))).r;
    float hd = TF(max(ij - ivec2(0, 1), ivec2(0))).r, hu2 = TF(min(ij + ivec2(0, 1), ivec2(127))).r;
    float h = (2.*c0.x - c0.y + uI[7].y*(hl + hr + hd + hu2 - 4.*c0.x))*uI[7].z;
    vec2 w = RIPD.xy + (vec2(ij) + .5)/128.*RIPD.z;
    for (int i = 0; i < 3; i++) { vec4 D = i == 0 ? uI[4] : (i == 1 ? uI[5] : uI[6]); if (D.z != 0.) { vec2 dd = w - D.xy; h -= D.z*exp(-dot(dd, dd)/(D.w*D.w)); } }
    if (poolD(w) > -.03) h = 0.;
    OUT(vec4(h, c0.x, 0., 0.));
    return;
  }
  vec2 uv = gl_FragCoord.xy/64.;
  vec2 w = SIMD.xy + uv*SIMD.z;
  float dt = uI[3].y;
#ifdef UIS
  vec4 c0 = fP(ivec2(gl_FragCoord.xy), 64);
  vec4 a = bP(uv - c0.xy*dt/SIMD.z, 64);
#else
  vec4 c0 = texture(uP, uv);
  vec4 a = texture(uP, uv - c0.xy*dt/SIMD.z);
#endif
  vec2 v = a.xy; float d = a.z;
  float src = smoothstep(.15, -.35, poolD(w));
  if (uI[3].x > .5) { v = WIND; d = src*HEAT; }
  d += (HEAT - d)*src*min(1., dt*.9);
  if (uI[7].w != 0.) { vec2 su = vec2(cos(uI[7].w), sin(uI[7].w)), sp = POOL.xy + su*(poolR(su)*POOL.zw - .3); float g = exp(-dot(w - sp, w - sp)/.1); d += (2.6*HEAT - d)*g*min(1., dt*1.5); }
  d *= exp(-dt*(.1 + .45*(1. - src)));
  vec4 nz = texture(uN, w*.035 + uI[3].z*vec2(.0021, .0013));
  v = mix(v, WIND + (nz.xy - .5)*.55, 1. - exp(-dt*.35));
  if (uI[1].w > 0.) {
    vec2 A = uI[0].xy, B = uI[0].zw, ab = B - A;
    float hh = clamp(dot(w - A, ab)/max(dot(ab, ab), 1e-4), 0., 1.);
    vec2 dd = w - A - ab*hh;
    float g = exp(-dot(dd, dd)/(uI[1].z*uI[1].z));
    v += uI[1].xy*g*min(1., dt*6.);
    d *= 1. - .5*g*min(1., uI[1].w);
  }
  if (uI[2].z > 0.) {
    vec2 dd = w - uI[2].xy; float r2 = dot(dd, dd), g = exp(-r2/.5);
    v += (normalize(dd + 1e-4)*1.3 + vec2(-dd.y, dd.x)*1.8)*g*uI[2].z;
    d += .7*exp(-r2/.2)*uI[2].z;
  }
  vec2 eb = min(uv, 1. - uv);
  d *= smoothstep(0., .04, min(eb.x, eb.y));
  OUT(vec4(v, d, 0.));
}`,$o=U+de+Fe+Ve+`
uniform vec4 uS; uniform sampler2D uDp;
#ifdef UIS
uniform highp usampler2D uSim;
vec4 fS(ivec2 i){ return uintBitsToFloat(texelFetch(uSim, clamp(i, ivec2(0), ivec2(63)), 0)); }
vec4 bS(vec2 u){ vec2 x = u*64. - .5, f = fract(x); ivec2 i = ivec2(floor(x)); return mix(mix(fS(i), fS(i + ivec2(1, 0)), f.x), mix(fS(i + ivec2(0, 1)), fS(i + ivec2(1)), f.x), f.y); }
#define SIMT(u) bS(u)
#else
uniform sampler2D uSim;
#define SIMT(u) textureLod(uSim, u, 0.)
#endif
out vec4 o;
float gFF;
float steamD(vec3 p){
  vec2 su = (p.xz - SIMD.xy)/SIMD.z;
  if (p.y < 0. || p.y > 5. || su.x < 0. || su.y < 0. || su.x > 1. || su.y > 1.) return 0.;
  vec4 s0 = SIMT(su);
  vec4 s = SIMT(su - s0.xy*(p.y/RISE)*.4/SIMD.z);
  float src = s.z;
  if (src < .004) return 0.;
  vec3 q = p; q.y -= TT*RISE*.55; q.xz -= WIND*TT;
  vec2 w = textureLod(uN3, (q*vec3(.33, .2, .33) + vec3(0., TT*.04, 0.))*(1./64.), 0.).rg - .5;
  vec2 w2 = textureLod(uN3, (q*vec3(.9, .55, .9) + vec3(5., TT*.07, 11.))*(1./64.), 0.).rg - .5;
  vec3 qw = q + vec3(w.x, 0., w.y)*(.6 + 1.1*min(p.y, 2.2)) + vec3(w2.x, 0., w2.y)*(.3 + .9*min(p.y, 2.));
  // separate wisps a few hand-widths wide that join into leaning columns, thin out and are gone two or three metres
  // up; groups of them with dark gaps between; a skin a hand high on the water with holes in it
  float cl = textureLod(uN3, qw*vec3(1.9, .5, 1.9)*(1./64.), 0.).r;
  float fi = textureLod(uN3, (qw*4.2 + vec3(TT*.2, TT*.1, 0.))*(1./64.), 0.).g;
  float bg = textureLod(uN3, (qw*vec3(.42, .16, .42) + vec3(17., 0., 5.))*(1./64.), 0.).r;
  // seen from across the garden (or the far half of the pool) the wisps merge: a low layer over the whole water,
  // thick at the surface and breaking up into the columns that rise out of it
  float ff = max(gFF, smoothstep(4.5, 9., length(p - CAMP)));
  float plume = smoothstep(.44 - .08*ff, .7, cl*.72 + fi*.28 + .1*exp(-p.y*3.))*smoothstep(.2 - .25*ff, .55, bg)*1.35*exp(-p.y*.9)*smoothstep(2.9, 1.1, p.y);
  float film = exp(-p.y*7.)*smoothstep(.4, .66, fi*.6 + cl*.4);
  float lay = ff*exp(-p.y*2.)*(.35 + .65*smoothstep(.25, .75, bg*.45 + cl*.55))*.8;
  vec2 se = min(su, 1. - su);
  return src*(plume*.8 + film + lay)*smoothstep(0., .14, min(se.x, se.y))*smoothstep(.5, 1.8, length(p - CAMP));
}
vec3 lampS(vec3 p, vec4 L, vec4 C, out vec3 ld){ vec3 l = L.xyz - p; float d2 = dot(l, l); ld = l*inversesqrt(d2); return C.rgb*(L.w*.9/(d2 + .45)); }
float ph(float mu){ return .18 + .82*.0796*(1. - .36)/pow(1.36 - 1.2*mu, 1.5)*3.; }
void main(){
  vec2 uv = gl_FragCoord.xy*uS.x;
  vec3 rd = normalize(FW + ((uv.x*2. - 1.)*RT + (uv.y*2. - 1.)*UPV)*TANH);
  gFF = smoothstep(2., 3.2, length((CAMP.xz - POOL.xy)/POOL.zw)) + smoothstep(2.2, 4., CAMP.y)*.6;
  float tS = texture(uDp, uv).r*FARD;
  vec3 bmin = vec3(SIMD.x, -.05, SIMD.y), bmax = vec3(SIMD.x + SIMD.z, 4.5, SIMD.y + SIMD.z);
  vec3 ir = 1./rd, t0v = (bmin - CAMP)*ir, t1v = (bmax - CAMP)*ir;
  vec3 tmn = min(t0v, t1v), tmx = max(t0v, t1v);
  float t0 = max(max(tmn.x, max(tmn.y, tmn.z)), max(uS.w, .05)), t1 = min(min(tmx.x, min(tmx.y, tmx.z)), min(tS, 16.));
  if (t1 <= t0) { o = vec4(0., 0., 0., 1.); return; }
  int NS = int(uS.y);
  float dt = (t1 - t0)/uS.y;
  float jt = float(hu(uint(gl_FragCoord.x) + hu(uint(gl_FragCoord.y) + uint(TT*30.)*7919u)))*(1./4294967296.);
  float t = t0 + dt*jt;
  float T = 1.; vec3 S = vec3(0.);
  vec3 amb = AMB*1.1 + MOONC*MOONA*.22;
  for (int i = 0; i < 48; i++) {
    if (i >= NS) break;
    vec3 p = CAMP + rd*t;
    float dn = steamD(p);
    if (dn > .002) {
      float sg = dn*uS.z;
      vec3 ld, li = amb;
      vec3 e = lampS(p, L0, C0, ld); li += e*toroMask(-ld, TA)*ph(dot(rd, ld));
      e = lampS(p, L1, C1, ld); li += e*FLK*paperMask(-ld)*ph(dot(rd, ld));
      e = lampS(p, L2, C2, ld); li += e*toroMask(-ld, TB)*ph(dot(rd, ld));
      if (MOONA > 0.) li += MOONC*MOONA*ph(dot(rd, MOOND))*.3;
      float tr = exp(-sg*dt);
      S += T*li*(1. - tr);
      T *= tr;
      if (T < .02) break;
    }
    t += dt;
  }
  o = vec4(ENCC(S), T);
}`,ea=U+de+Fe+Ve+Zt+`
#ifdef UIS
uniform sampler2D uSt, uDp, uRf, uSm, uF;
uniform highp usampler2D uRi;
float fR(ivec2 i){ return uintBitsToFloat(texelFetch(uRi, clamp(i, ivec2(0), ivec2(127)), 0).r); }
float bR(vec2 u){ vec2 x = u*128. - .5, f = fract(x); ivec2 i = ivec2(floor(x)); return mix(mix(fR(i), fR(i + ivec2(1, 0)), f.x), mix(fR(i + ivec2(0, 1)), fR(i + ivec2(1)), f.x), f.y); }
#define RIT(u) bR(u)
#else
uniform sampler2D uSt, uDp, uRf, uSm, uRi, uF;
#define RIT(u) texture(uRi, u).r
#endif
out vec4 o;
vec3 skyC(vec3 rd){
  vec3 hz = hazeCol(rd) + MOONC*MOONA*.35;
  if (rd.y <= 0.) return hz;
  float e = rd.y;
  vec2 cu = rd.xz/(e + .12)*1.8 + CLO.xy;
  float n2 = texture(uN, cu*.031).r*.5 + texture(uN, cu*.083 + .3).g*.3, n = n2 + texture(uN, cu*.21 + .6).b*.2;
  float m = smoothstep(.45, .7, n + COVER - .5);
  // (n12) thin cloud under a moon: soft wide lanes from the two coarse octaves, never more than a third of the way to
  // the clear dark (its gaps were small dark holes with hard edges)
  if (MRING > 0.) m = 1. - .33*smoothstep(.62, .3, n2*1.25 + COVER - .5);
  float x = max(1. - dot(rd, MOOND), 0.);
  vec3 cloud = HAZE*.9*(.7 + .6*n) + vec3(.004, .0028, .0016)*exp(-e*4.);
  cloud += MOONC*MOONA*(.06 + .6*exp(-x*25.)*(1.2 - n) + .25*(1. - m))*(.5 + .8*n);
  cloud += MOONC*MOONA*MRING*((vec3(.8, .9, 1.15)*(exp(-x*4500.)*1.6 + exp(-x*700.)*.45) + vec3(1.15, .75, .45)*exp(-(x - 5.2e-4)*(x - 5.2e-4)*3.e7)*.12)*(1.4 - n) + vec3(.9, .92, 1.)*exp(-(x - .073)*(x - .073)*6000.)*.012);
  vec3 clear = vec3(.0022, .0036, .0085) + MOONC*MOONA*(.05 + .6*exp(-x*120.));
  vec2 oc = (rd.xz/(1. + rd.y))*900.;
  float sh = h1(oc); vec2 sf = fract(oc) - .5;
  clear += vec3(.8, .86, 1.)*step(.9955, sh)*smoothstep(.45, .0, length(sf))*(.03 + .25*fract(sh*517.))*(1. - .6*MOONA)*(1. + STARS);
  float disc = smoothstep(8.e-5, 6.6e-5, x);
  vec2 mq = (rd.xz - MOOND.xz)*1.3;
  clear += vec3(1., .97, .9)*disc*(.95 - .4*smoothstep(.45, .65, texture(uN, mq + .3).r*.6 + texture(uN, mq*2.6 + .7).g*.4))*MOONI;
  vec3 sky = mix(clear, cloud, m);
  // (n12) the moon's whole disc shows through thin cloud, dimmed
  sky += vec3(1., .97, .9)*disc*MOONI*.65*m*MRING;
  sky += MOONC*MOONA*exp(-x*1400.)*m*.4 + SKYZ*(.5 + .5*e) + SKYH*exp(-e*7.)*(1. - .5*m);
  return mix(hz + SKYH*.8, sky, smoothstep(.0, .25, e));
}
void main(){
  ivec2 ij = ivec2(gl_FragCoord.xy);
  vec2 uv = gl_FragCoord.xy/SZF;
  vec3 rd = normalize(FW + ((uv.x*2. - 1.)*RT + (uv.y*2. - 1.)*UPV)*TANH);
  vec4 st = texelFetch(uSt, ij, 0); st.a = DEC(st.a); st.rgb = DECC(st.rgb);
  float dz = texelFetch(uDp, ij, 0).r, t = dz*FARD;
  vec3 col = vec3(0.), sdir = rd; float sk = 0.;
  if (dz > .99995) sk = 1.;
  else if (st.a < -.5) {
    vec3 P = CAMP + rd*t;
    vec2 ru = (P.xz - RIPD.xy)/RIPD.z; float e = 1./128.;
    vec2 g = vec2(RIT(ru + vec2(e, 0.)) - RIT(ru - vec2(e, 0.)), RIT(ru + vec2(0., e)) - RIT(ru - vec2(0., e)))/(2.*e*RIPD.z)*RIPD.w;
    vec4 a = texture(uN, P.xz*.045 + TT*vec2(.0042, .0031)), b = texture(uN, P.xz*.11 - TT*vec2(.0035, -.0061));
    g += (vec2(a.x - a.y, a.z - a.w)*.05 + vec2(b.x - b.z, b.y - b.w)*.035)*(.35 + .35*HEAT);
    vec3 n = normalize(vec3(-g.x, 1., -g.y));
    float F = .02 + .98*pow(1. - max(dot(n, -rd), 0.), 5.);
    vec3 r = reflect(rd, n); r.y = max(r.y, .01); r = normalize(r);
    float rz = dot(r, MFW);
    vec2 sp = vec2(dot(r, RT), dot(r, MUP))/(max(rz, .05)*TANH)*.5 + .5;
    vec4 rf = texture(uRf, clamp(sp, .002, .998)); rf.a = DEC(rf.a); rf.rgb = DECC(rf.rgb);
    float wsk = clamp(-rf.a*.5, 0., 1.);
    vec3 rc = rf.rgb + MOONC*MOONA*max(rf.a, 0.);
    vec3 body = AMB*1.2 + MOONC*MOONA*.25, spec = vec3(0.);
    for (int i = 0; i < 3; i++) {
      vec4 L = i == 0 ? L0 : (i == 1 ? L1 : L2);
      vec4 C = i == 0 ? C0 : (i == 1 ? C1 : C2);
      vec3 ld; vec3 e3 = lampF(P, L, C, ld);
      float msk = i == 1 ? paperMask(-ld)*FLK : toroMask(-ld, i == 0 ? TA : TB);
      body += e3*msk*(.45 + .55*max(dot(n, ld), 0.));
      vec3 h = normalize(ld - rd); float nh = max(dot(n, h), 0.);
      float a2 = .0016, dd = nh*nh*(a2 - 1.) + 1.;
      spec += e3*msk*a2/(3.1416*dd*dd)*F*.6;
    }
    float mk = texture(uN, P.xz*.08 + TT*vec2(.0011, .0007)).r*.6 + texture(uN, P.xz*.23 - TT*vec2(.0009, .0013)).g*.4;
    col = body*WALB*(.62 + .3*mk)*(1. - F) + rc*F + spec;
    if (wsk > .01) { sdir = r; sk = wsk*F; }
  } else col = st.rgb + MOONC*MOONA*st.a;
  if (sk > 0.) col += sk*skyC(sdir);
  vec4 sm;
  {
    vec2 sp = uv*uC[24].w - .5, f = fract(sp), b0 = floor(sp);
    vec4 acc = vec4(0.); float wsum = 0.;
    for (int k = 0; k < 4; k++) {
      vec2 o2 = vec2(float(k & 1), float(k >> 1));
      vec2 tuv = (b0 + o2 + .5)/uC[24].w;
      float dk = texture(uDp, tuv).r*FARD;
      float w = (o2.x > .5 ? f.x : 1. - f.x)*(o2.y > .5 ? f.y : 1. - f.y)*(.002 + 1./(1. + 40.*abs(dk - t)/max(t, .3)));
      acc += texture(uSm, tuv)*w; wsum += w;
    }
    sm = acc/wsum; sm.rgb = DECC(sm.rgb);
  }
  col = col*sm.a + sm.rgb;
  for (int i = 0; i < 3; i++) {
    vec4 LS = i == 0 ? LS0 : (i == 1 ? LS1 : LS2);
    if (LS.w <= 0.) continue;
    vec4 L = i == 0 ? L0 : (i == 1 ? L1 : L2); vec3 lc = i == 0 ? C0.rgb : (i == 1 ? C1.rgb : C2.rgb);
    float dl = texture(uDp, LS.xy).r*FARD;
    float vis = LS.w*step(LS.z - .45, dl)*texture(uSm, LS.xy).a;
    vec2 dd = uv - LS.xy; float r2 = dot(dd, dd);
    col += lc*L.w*vis*(.00004*HALO/(r2 + .00008*HALO*HALO) + .02*HALO*exp(-r2*90./(HALO*HALO)))/max(LS.z*LS.z*.1, 1.);
  }
  vec4 sn = texelFetch(uF, ij, 0);
  vec3 c = (col*(1. - sn.a) + sn.rgb)*EXPO;
  c = (c*(2.51*c + .03))/(c*(2.43*c + .59) + .14);
  vec2 vq = uv - .5;
  c *= 1. - .1*dot(vq, vq);
  c = pow(max(c, 0.), vec3(1./2.2));
  c = mix(vec3(dot(c, vec3(.3, .55, .15))), c, .92);
  c += (float(hu(uint(ij.x) + hu(uint(ij.y))))*(1./4294967296.) - .5)*.004;
  o = vec4(c, 1.);
}`,ta=U+de+Fe+Ve+`
uniform vec4 uS;
out vec2 vQ; out vec2 vHL; out vec3 vCol; out float vA; out float vDist; out vec2 vS;
vec4 hh(uint x){ uint a = hu(x*747796405u + 2891336453u), b = hu(a), c = hu(b), d = hu(c); return vec4(uvec4(a, b, c, d))*(1./4294967296.); }
void main(){
  uint id = uint(gl_InstanceID);
  vec4 h = hh(id), g = hh(id + 1000003u);
  if (g.w > uS.x) { gl_Position = vec4(2., 2., 2., 1.); return; }
  vec3 B = vec3(14., 9., 14.);
  float sp = (.6 + .6*h.w)*uS.w;
  float ft = uS.y, ph = g.y*6.2831;
  float sw = .13 + .1*g.z, fr = .7 + .6*g.x;
  vec3 P = h.xyz*B;
  P.y -= ft*sp;
  P.x += sw*sin(ft*1.3*fr + ph) + WOFF.x*(.75 + .5*g.z);
  P.z += sw*cos(ft*1.1*fr + ph*1.3) + WOFF.y*(.75 + .5*g.z);
  vec3 lo = CAMP - vec3(B.x*.5, B.y*.42, B.z*.5);
  // each fall through the box comes down somewhere new, so no flake repeats its path
  uint hc = hu(id*2654435761u + uint(int(floor((P.y - lo.y)/B.y)) + 1048576));
  P.xz += vec2(float(hc & 65535u), float(hc >> 16))*(1./65536.)*B.xz;
  vec3 rel = mod(P - lo, B);
  P = lo + rel;
  vec3 eb = min(rel, B - rel);
  float fe = smoothstep(0., .8, min(eb.x, min(eb.y, eb.z)));
  vec3 vel = vec3(sw*1.3*fr*cos(ft*1.3*fr + ph) + WIND.x + uS.z*0., -sp, -sw*1.1*fr*sin(ft*1.1*fr + ph*1.3) + WIND.y);
  vel.xz += CLO.zw;
  vec3 P0 = P - vel*uS.z;
  vec3 dv = P - CAMP, dv0 = P0 - CAMP;
  float z = dot(dv, FW), z0 = dot(dv0, FW);
  if (z < .3 || z0 < .3) { gl_Position = vec4(2., 2., 2., 1.); return; }
  vec2 s1 = vec2(dot(dv, RT), dot(dv, UPV))/(z*TANH), s0 = vec2(dot(dv0, RT), dot(dv0, UPV))/(z0*TANH);
  float hp = SZF*.5;
  vec2 p1 = s1*hp, p0 = s0*hp;
  float rad = (.0028 + .0055*g.x*g.x)*SNOWV;
  float rpx = rad/(z*TANH)*hp;
  float coc = .0045*abs(1. - 4.2/z)*hp*(SZF > 400. ? 1. : .5);
  float Rr = sqrt(rpx*rpx + coc*coc) + .6;
  vec2 ax = p1 - p0; float L = length(ax)*.5; ax = L > .01 ? ax/(2.*L) : vec2(1., 0.); vec2 nx = vec2(-ax.y, ax.x);
  int vi = gl_VertexID % 6;
  vec2 cr = vi == 0 ? vec2(-1., -1.) : vi == 1 ? vec2(1., -1.) : vi == 2 ? vec2(1., 1.) : vi == 3 ? vec2(-1., -1.) : vi == 4 ? vec2(1., 1.) : vec2(-1., 1.);
  vQ = cr*vec2(L + Rr, Rr); vHL = vec2(L, Rr);
  vec2 pc = (p0 + p1)*.5 + ax*vQ.x + nx*vQ.y;
  gl_Position = vec4(pc/hp, 0., 1.);
  vS = vec2(g.z, h.x)*251. + vec2(ft*.07*(g.x - .5), 0.);
  vec3 ld, li = AMB*1.3*HALO + MOONC*MOONA*.8, li0 = li;
  vec3 e = lampF(P, L0, C0, ld); float mu = dot(normalize(dv), ld); li += e*toroMask(-ld, TA)*(.5 + 2.5*pow(max(mu, 0.), 6.));
  e = lampF(P, L1, C1, ld); mu = dot(normalize(dv), ld); li += e*FLK*paperMask(-ld)*(.5 + 2.5*pow(max(mu, 0.), 6.));
  e = lampF(P, L2, C2, ld); mu = dot(normalize(dv), ld); li += e*toroMask(-ld, TB)*(.5 + 2.5*pow(max(mu, 0.), 6.));
  float tw = pow(fract(g.z*7.13 + ft*(.9 + 1.7*h.x)), 14.)*2.5;
  li /= 1. + .35*max(li.r, max(li.g, li.b));
  vCol = (li*.85 + (li - li0)*tw)*.9;
  vA = fe*min(1., (rpx + .6)*(rpx + .6)/(Rr*Rr))*(rpx + .6)/(rpx + .6 + L*.6);
  vDist = length(dv);
  vA *= mix(1., .3, smoothstep(4. + 5.*uC[25].w, 11., vDist));
  // (n12) looking up from the water: the flakes over the pool catch the lamp-lit steam's glow
  if (uC[25].w > 0.) { vec2 pq = (P.xz - POOL.xy)/POOL.zw; vCol += (WALB*.5 + .5)*(C0.rgb*L0.w + C1.rgb*L1.w + C2.rgb*L2.w*.5)*smoothstep(3.5, .4, length(pq))*exp(-max(P.y, 0.)*.22)*.07 + MOONC*MOONA*.6; }
}`,oa=U+de+`
uniform sampler2D uDp, uSm;
in vec2 vQ; in vec2 vHL; in vec3 vCol; in float vA; in float vDist; in vec2 vS;
out vec4 o;
void main(){
  float dd = length(vec2(max(abs(vQ.x) - vHL.x, 0.), vQ.y));
  if (vHL.y > 2.) dd *= 1. + .9*(textureLod(uN, (vQ/vHL.y)*.009 + vS*(1./256.), 0.).r - .5);
  float a = (1. - smoothstep(vHL.y*.25, vHL.y, dd))*vA;
  ivec2 ij = ivec2(gl_FragCoord.xy);
  float tS = texelFetch(uDp, ij, 0).r*FARD;
  a *= smoothstep(0., .12, tS - vDist);
  vec4 sm = texture(uSm, gl_FragCoord.xy/SZF);
  float f = clamp(vDist/max(tS, .1), 0., 1.);
  a *= pow(max(sm.a, .001), f);
  if (a < .002) discard;
  o = vec4(vCol*a, a*.85);
}`,Qt=t=>t?Jt.replace(U,U+"#define RIMK"+t+`
`):Jt,m=e.__c561||(e.__c561=(()=>{const o=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float"),n=e.getExtension("KHR_parallel_shader_compile"),a=(y,M)=>{const ce=e.createShader(M);return e.shaderSource(ce,y),e.compileShader(ce),ce},s=a(Zo,e.VERTEX_SHADER),r=y=>o?y:y.replace(U,U+`#define UIS
`),b={sim:[s,r(Qo)],sm:[s,r($o)],sn:[ta,oa],co:[s,r(ea)],rb:[s,Qt(j)],stF:[s,Ke(`#define FARP
`)],stN:[s,Ke(`#define NEARP
`)],stO:[s,Ke(`#define OBJP
`)]},p={};for(const y in b){const[M,ce]=b[y],ye=e.createProgram(),To=typeof M=="string"?a(M,e.VERTEX_SHADER):M,So=a(ce,e.FRAGMENT_SHADER);e.attachShader(ye,To),e.attachShader(ye,So),e.linkProgram(ye),p[y]={p:ye,f:So,v:To}}e.flush();let u=5640654;const z=()=>(u=Math.imul(u^u>>>15,739982445),u=Math.imul(u^u>>>12,695872825),u^=u>>>15,u&255),N=64,_=new Uint8Array(N*N*N*2);for(let y=0;y<_.length;y++)_[y]=z();const $=e.createTexture();e.bindTexture(e.TEXTURE_3D,$),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage3D(e.TEXTURE_3D,0,e.RG8,N,N,N,0,e.RG,e.UNSIGNED_BYTE,_),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const y of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,y,e.REPEAT);const G=new Uint8Array(256*256*4);for(let y=0;y<G.length;y++)G[y]=z();const xe=e.createTexture();e.bindTexture(e.TEXTURE_2D,xe),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,G),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);const Se=e.createVertexArray(),No={uN:0,uN3:1,uSt:2,uDp:3,uRf:4,uSm:5,uRi:6,uSim:7,uF:8,uP:9,uHF:10},At=(y,M)=>{if(!e.getProgramParameter(M.p,e.LINK_STATUS)){console.error("561 "+y+": "+e.getProgramInfoLog(M.p)+" "+e.getShaderInfoLog(M.f)+" "+e.getShaderInfoLog(M.v)),M.bad=!0;return}e.useProgram(M.p);for(const ce in No){const ye=e.getUniformLocation(M.p,ce);ye&&e.uniform1i(ye,No[ce])}M.uC=e.getUniformLocation(M.p,"uC"),M.uS=e.getUniformLocation(M.p,"uS"),M.uI=e.getUniformLocation(M.p,"uI")};for(const y in p)At(y,p[y]);const W={q:null,ready:!1,n:0};return W.start=()=>{const y=e.createProgram(),M=a(Ke(`#define BACKP
`),e.FRAGMENT_SHADER);e.attachShader(y,s),e.attachShader(y,M),e.linkProgram(y),e.flush(),W.q={p:y,f:M,v:s}},W.poll=()=>{W.ready||!W.q||W.q.bad||++W.n&7||n&&!e.getProgramParameter(W.q.p,n.COMPLETION_STATUS_KHR)||(At("stB",W.q),W.q.bad||(W.ready=!0))},{P:p,rbv:{[j]:p.rb},setup:At,mk:a,vs:s,tN3:$,tN2:xe,n2d:G,vao:Se,hf:o,back:W,fc:0,slots:{big:[],small:[],nb:0,ns:0}}})()),O=m.P;if(!m.rbv[j]){const t=e.createProgram(),o=m.mk(Qt(j),e.FRAGMENT_SHADER);e.attachShader(t,m.vs),e.attachShader(t,o),e.linkProgram(t),m.rbv[j]={p:t,f:o,v:m.vs},m.setup("rb"+j,m.rbv[j])}const $t=m.rbv[j],me=m.hf?e.RGBA16F:e.RGBA8,ue=m.hf?e.HALF_FLOAT:e.UNSIGNED_BYTE,Ne=I?420:w,pe=I?w>>1:w,ke=I?1024:512,D=(t,o,n,a,s,r)=>{const b=e.createTexture();return e.bindTexture(e.TEXTURE_2D,b),e.texImage2D(e.TEXTURE_2D,0,n,t,o,0,a,s,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),b},H=(t,o)=>{const n=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,n),t&&e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o&&e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,o,0),n},aa=I?"big":"small",ve=m.slots[aa],Te={},Ye={slot:null,me:Te};let c=null;const eo=()=>{if(c=ve.find(t=>t.sz===w&&!t.owner)||(I?ve.find(t=>t.sz===w):null),c||(ve.length<(I?2:9)?(c={sz:0},ve.push(c)):c=ve[I?m.slots.nb++%ve.length:m.slots.ns++%ve.length]),c.sz!==w){for(const t of["tSt","tDp","tRf","tRd","tSm","tF"])c[t]&&e.deleteTexture(c[t]);for(const t of["fSt","fRf","fSm","fF"])c[t]&&e.deleteFramebuffer(c[t]);c.sz=w,c.tSt=D(w,w,me,e.RGBA,ue,e.NEAREST),c.tDp=D(w,w,e.DEPTH_COMPONENT32F,e.DEPTH_COMPONENT,e.FLOAT,e.NEAREST),c.fSt=H(c.tSt,c.tDp),c.tRf=D(pe,pe,me,e.RGBA,ue,e.LINEAR),c.tRd=D(pe,pe,e.DEPTH_COMPONENT32F,e.DEPTH_COMPONENT,e.FLOAT,e.NEAREST),c.fRf=H(c.tRf,c.tRd),c.tSm=D(Ne,Ne,me,e.RGBA,ue,e.LINEAR),c.fSm=H(c.tSm),c.tF=D(w,w,me,e.RGBA,ue,e.NEAREST),c.fF=H(c.tF),c.tHF||(c.tHF=D(ke,ke,me,e.RGBA,ue,e.LINEAR),c.fHF=H(c.tHF)),e.bindFramebuffer(e.FRAMEBUFFER,null)}c.owner=Te,Ye.slot=c};eo(),m.fin===void 0&&(m.fin=typeof FinalizationRegistry=="function"?new FinalizationRegistry(t=>{t.slot.owner===t.me&&(t.slot.owner=null),t.sim&&t.sim.owner===t.me&&(t.sim.owner=null)}):null);const Ze=m.sims||(m.sims={list:[],n:0});let l=null;const to=()=>{const t=Ze.n,o=Ze.list;l=o.length<12?null:o.find(n=>!n.owner)||o.find(n=>t-n.use>64)||(o.length<32?null:o.reduce((n,a)=>a.use<n.use?a:n)),l||(l={},Ze.list.push(l),m.hf?(l.tR0=D(128,128,e.RG16F,e.RG,e.HALF_FLOAT,e.LINEAR),l.fR0=H(l.tR0),l.tR1=D(128,128,e.RG16F,e.RG,e.HALF_FLOAT,e.LINEAR),l.fR1=H(l.tR1),l.tS0=D(64,64,me,e.RGBA,ue,e.LINEAR),l.fS0=H(l.tS0),l.tS1=D(64,64,me,e.RGBA,ue,e.LINEAR),l.fS1=H(l.tS1)):(l.tR0=D(128,128,e.RG32UI,e.RG_INTEGER,e.UNSIGNED_INT,e.NEAREST),l.fR0=H(l.tR0),l.tR1=D(128,128,e.RG32UI,e.RG_INTEGER,e.UNSIGNED_INT,e.NEAREST),l.fR1=H(l.tR1),l.tS0=D(64,64,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST),l.fS0=H(l.tS0),l.tS1=D(64,64,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST),l.fS1=H(l.tS1)),e.bindFramebuffer(e.FRAMEBUFFER,null)),l.owner=Te,l.use=t,Ye.sim=l};to();const na=m.n2d,se=(t,o)=>{t-=.5,o-=.5;const n=Math.floor(t),a=Math.floor(o),s=t-n,r=o-a,b=(_,$)=>na[(($&255)*256+(_&255))*4]/255,p=b(n,a),u=b(n+1,a),z=b(n,a+1),N=b(n+1,a+1);return p+(u-p)*s+(z+(N-z)*s-(p+(u-p)*s))*r},Le=(t,o)=>{const n=9.2+1.2*(se(t*.11,3.7)-.5)+.5*(se(t*.43,9.1)-.5),a=o-n,s=.5*(a+Math.sqrt(a*a+.6));let r=.35+.06*(se(t*1.6,o*1.6)-.5)+.08*(se(t*.37+17,o*.37+17)-.5);r-=40*(1-Math.exp(-s/20));const b=o-105-12*Math.sin(t*.011);r+=190*(1-Math.exp(-Math.max(b,0)/380));const p=-o-4.5,u=.5*(p+Math.sqrt(p*p+4));r+=240*(1-Math.exp(-u/450));const z=Math.hypot(t-.3,o-1),N=Math.min(1,Math.max(0,(z-10)/60)),_=N*N*(3-2*N);return r+=_*(30*(se(t*.012,o*.012)*.6+se(t*.03+40,o*.03+40)*.4-.5)+7*(se(t*.07+5,o*.07+5)-.5)+1.6*(se(t*.31,o*.31)-.5)),r},Ce=38+14*(f()-.5),Je=168+20*f(),oo=Le(Ce,Je)-.5,sa=Math.atan2(-Ce,Je)+.45,Qe=[];if(_e===1)for(let t=0;t<3;t++){const o=Ce-70+55*t+25*f(),n=150+80*f();Qe.push([o,Le(o,n)-.3,n,.012+.01*f()])}if(_e===2){const t=10+30*f(),o=160+40*f();Qe.push([t,Le(t,o)-.3,o,.014])}const ia={yaw:0,pitch:0,x:0,y:0,z:0},$e=Math.tan(34*Math.PI/180),ao=f();let K=.12+.06*(ao-.5),Y=-.19,X=1.45,A=0,F=0;if(J==="Toward the stone lantern")K-=.5+.12*it,Y=-.17-.05*rt;else if(J==="Along the rim")K+=.5+.12*it,Y=-.21-.05*rt;else if(J==="In the water"){const n=Re(-.45,-.893);A=S+-.45*(n*C-.95),F=T+-.893*(n*P-.95),X=.6,K=Math.atan2(E[0]-A,E[1]-F)+.2+.16*it,Y=-.12+.05*rt}if(x==="Back in the garden")A=2.3+1.2*(ge-.5),F=-4.4-.6*he,X=Le(A,F)+1.55,K=Math.atan2(S-A,T+.4-F)+.1*(he-.5),Y=-.15;else if(x==="Low at the water"){const t=-.75+.35*ge,o=Math.cos(t),n=Math.sin(t),a=Re(o,n);A=S+o*(a*C-.8),F=T+n*(a*P-.8),X=.34,K=Math.atan2(E[0]-A,E[1]-F)+.28+.2*he,Y=.085}else if(x==="Close on the stone lantern"){const t=ht+.72+.12*ge,o=Re(Math.cos(t),Math.sin(t)),n=Math.cos(t)/C,a=Math.sin(t)/P,s=Math.hypot(n,a);A=S+Math.cos(t)*o*C+n/s*2,F=T+Math.sin(t)*o*P+a/s*2,X=1.55,K=Math.atan2(E[0]-A,E[1]-F)+.3+.1*he,Y=-.2}else if(x==="Up through the snowfall"){const t=ht+Math.PI+.5*(ge-.5),o=Math.cos(t),n=Math.sin(t),a=Re(o,n);A=S+o*(a*C-.6),F=T+n*(a*P-.6),X=.42,K=Math.atan2(E[0]-A,E[1]-F)+(he<.5?-1:1)*(.3+.12*he),Y=.32+.06*ge}else if(x==="From the slope above"){const t=9.5+3*ge,o=1.2+3*he;A=S+o,F=T-t,X=Math.max(Le(A,F)+1.6,4.5+2.5*Bo);const n=Math.hypot(S-A,T+.3-F);K=Math.atan2(S-A,T+.3-F)+.1*(Ho-.5),Y=-Math.atan2(X-.2,n)+.1}const h={yaw:K,pitch:Y,x:A,y:X,z:F};let no="";const so=()=>{const t=d.view||ia;h.yaw=K+(t.yaw||0),h.pitch=Math.max(-1.3,Math.min(1.3,Y+(t.pitch||0)));const o=t.x||0,n=t.z||0,a=Math.hypot(o,n),s=a>1.5?1.5/a:1;h.x=A+o*s,h.z=F+n*s,h.y=Math.max(.3,X-.55,Math.min(X+.55,X+(t.y||0)));const r=h.yaw.toFixed(5)+h.pitch.toFixed(5)+h.x.toFixed(3)+h.z.toFixed(3)+h.y.toFixed(3),b=r!==no;return no=r,b};so();const Pe=(t,o)=>{const n=Math.cos(o),a=[Math.sin(t)*n,Math.sin(o),Math.cos(t)*n],s=[Math.cos(t),0,-Math.sin(t)],r=[a[1]*s[2]-a[2]*s[1],a[2]*s[0]-a[0]*s[2],a[0]*s[1]-a[1]*s[0]];return{fw:a,rt:s,up:r}},io=(t,o)=>{const n=Pe(h.yaw,h.pitch),a=t*2-1,s=1-o*2,r=[0,1,2].map(p=>n.fw[p]+(a*n.rt[p]+s*n.up[p])*$e),b=Math.hypot(r[0],r[1],r[2]);return r.map(p=>p/b)},i=new Float32Array(42*4),ro=Vt*1.18,lo=[E[0],.3+.47*ro,E[1]],co=[ze[0],.3+.875*ut,ze[1]],ra=Math.cos(pt),la=Math.sin(pt),fo=[Me[0]+.4*ra,.3+Kt-.55,Me[1]+.4*la];i.set([...lo,.95*Vt*q[0]],16),i.set([q[0],.6*q[0],.28*q[0],.22],20),i.set([...fo,He[3]*q[1]],24),i.set([He[0]*q[1],He[1]*q[1],He[2]*q[1],.2],28),i.set([...co,.85*ut*q[2]*(q[0]?1:2)],32),i.set([q[2],.6*q[2],.28*q[2],.22],36);const ho=.12+.06*(ao-.5)-.3,ca=.29;if(we==="Snowing by day")i.set([.18,.97,.16,0],40);else{const t=we?.38:ca;i.set([Math.sin(ho)*Math.cos(t),Math.sin(t),Math.cos(ho)*Math.cos(t),0],40)}i.set([S,T,C,P],44),i.set(B,48),i.set([...Po,Fo==="Dark basalt"?0:1],52),i.set([_o,v==="Hard frost"?.6:.42,0,0],56),i.set([We[0],We[1],Ae[1],1.25],60),i.set([S-10,T-9,20,(we?.2:1)*(j===2?-1:1)],64),i[103]=Ht?1:0,i.set([S-3.4,T-3.4,6.8,1.6],68),i.set([0,Yo,_e,g.ex],72),i.set([...g.amb,1],76),i.set([E[0],E[1],Uo,ro],80),i.set([ze[0],ze[1],Wo,ut],84),i.set([Me[0],Me[1],pt,Kt],88),i.set([Ce,oo,Je,sa],92);for(let t=0;t<3;t++)i.set(Qe[t]?Qe[t]:[0,0,0,0],116+t*4);i.set([jo,Vo,Xo,Ko],128),i.set([dt,mt,Go,m.hf?0:1],132),i.set([0,0,0,0],136),i.set([...g.haze,Ae[3]*.6*g.fog],140),i.set([Ce,oo+4,Je,_e<2?.05:0],144);{const t=Math.max(C,P)*1.12+1.9;i.set([S-t,T-t,2*t,ke],152)}i.set([...g.mc,0],148),i.set([...g.sz,v==="Blizzard"?2.5:1],156),i.set([...g.sh,g.ring],160),i.set([_t[0],g.rime,_t[1],g.stars],164);const et=t=>{const o=Pe(h.yaw,t?-h.pitch:h.pitch);i.set([h.x,t?-h.y:h.y,h.z,$e],0),i.set(o.fw,4),i.set([...o.rt,w],8),i.set([...o.up,3e3],12),i[72]=t?1:0},fa=()=>{const t=Pe(h.yaw,-h.pitch);i.set(t.fw,96),i.set(t.up,100),i[99]=Ne},xt=(t,o)=>{const n=Pe(h.yaw,h.pitch),a=[t[0]-h.x,t[1]-h.y,t[2]-h.z],s=a[0]*n.fw[0]+a[1]*n.fw[1]+a[2]*n.fw[2],r=Math.hypot(a[0],a[1],a[2]);if(s<.2){i.set([0,0,r,0],o);return}const b=(a[0]*n.rt[0]+a[1]*n.rt[1]+a[2]*n.rt[2])/(s*$e),p=(a[0]*n.up[0]+a[1]*n.up[1]+a[2]*n.up[2])/(s*$e);i.set([b*.5+.5,p*.5+.5,r,Math.abs(b)<1.05&&Math.abs(p)<1.05?1:0],o)},R=(t,o,n)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(n||e.TEXTURE_2D,o)},Oe=()=>{e.bindVertexArray(m.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.depthMask(!0),R(0,m.tN2),R(1,m.tN3,e.TEXTURE_3D)},mo=()=>{for(let t=2;t<=10;t++)R(t,null)},Z=t=>(e.useProgram(t.p),e.uniform4fv(t.uC,i),t),uo=()=>{Oe(),mo(),fa(),et(!1),e.bindFramebuffer(e.FRAMEBUFFER,c.fHF),e.viewport(0,0,ke,ke),Z($t),e.drawArrays(e.TRIANGLES,0,3),R(10,c.tHF),e.bindFramebuffer(e.FRAMEBUFFER,c.fSt),e.viewport(0,0,w,w);const t=(n,a,s)=>{e.depthMask(!0),e.enable(e.DEPTH_TEST),e.depthFunc(e.ALWAYS);let r=Z(O.stF);e.uniform4f(r.uS,n,a,1,s),e.drawArrays(e.TRIANGLES,0,3),e.depthFunc(e.LESS),r=Z(O.stN),e.uniform4f(r.uS,n,a,1,s),e.drawArrays(e.TRIANGLES,0,3),r=Z(O.stO),e.uniform4f(r.uS,n,a,1,s),e.drawArrays(e.TRIANGLES,0,3),m.back.ready&&(r=Z(m.back.q),e.uniform4f(r.uS,n,a,1,s),e.drawArrays(e.TRIANGLES,0,3)),e.depthFunc(e.ALWAYS),e.disable(e.DEPTH_TEST)},o=x==="Back in the garden"||x==="Low at the water"||x==="From the slope above";t(1/w,I?o?330:210:o?240:160,I?o?480:360:o?370:290),et(!0),e.bindFramebuffer(e.FRAMEBUFFER,c.fRf),e.viewport(0,0,pe,pe),t(1/pe,I?150:110,I?250:200),R(10,null),et(!1),yt=m.back.ready,e.flush()};let De=0,Ie=0;const k=new Float32Array(32),ha=t=>{const o=De?l.tR1:l.tR0,n=De?l.fR0:l.fR1;R(9,o),e.bindFramebuffer(e.FRAMEBUFFER,n),e.viewport(0,0,128,128);const a=Z(O.sim),s=6.8/128,r=.33*t/s;k[28]=1,k[29]=r*r,k[30]=.9965,e.uniform4fv(a.uI,k),e.drawArrays(e.TRIANGLES,0,3),R(9,null),De^=1},da=(t,o)=>{const n=Ie?l.tS1:l.tS0,a=Ie?l.fS0:l.fS1;R(9,n),e.bindFramebuffer(e.FRAMEBUFFER,a),e.viewport(0,0,64,64);const s=Z(O.sim);k[28]=0,k[12]=o?1:0,k[13]=t,k[14]=ie,e.uniform4fv(s.uI,k),e.drawArrays(e.TRIANGLES,0,3),R(9,null),Ie^=1},ma=Math.round((I?9e3:2600)*(Ee==="Heavy fall"||v==="Blizzard"?1.5:1));let qe=je;const po=()=>{Oe(),mo(),et(!1);const t=Ie?l.tS1:l.tS0,o=De?l.tR1:l.tR0;R(3,c.tDp),R(7,t),e.bindFramebuffer(e.FRAMEBUFFER,c.fSm),e.viewport(0,0,Ne,Ne);let n=Z(O.sm);e.uniform4f(n.uS,1/Ne,I?40:24,x==="Low at the water"?.45:J==="In the water"&&!x?1.8:2.9,x==="Low at the water"?1.3:0),e.drawArrays(e.TRIANGLES,0,3),R(7,null),R(5,c.tSm),e.bindFramebuffer(e.FRAMEBUFFER,c.fF),e.viewport(0,0,w,w),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),n=Z(O.sn),e.uniform4f(n.uS,qe,vo,v==="Blizzard"?.07:.022,Ae[2]),e.drawArraysInstanced(e.TRIANGLES,0,6,ma),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,w,w),R(2,c.tSt),R(4,c.tRf),R(6,o),R(8,c.tF),Z(O.co),e.drawArrays(e.TRIANGLES,0,3),R(2,null),R(3,null),R(4,null),R(5,null),R(6,null),R(8,null)};let yt=!1,ie=0,vo=0,bt=g.moon,xo=g.cover,re=0,tt=0,wt=!1,gt=0,Rt=0,ot=!1,zt=0,Mt=0,Be=[0,0],le=[0,0],at=0,Nt=.5,Tt=0,St=!1,Q=null;const yo=!O.stF.bad&&!O.stN.bad&&!O.stO.bad&&!$t.bad&&!O.co.bad&&!O.sm.bad&&!O.sn.bad&&!O.sim.bad,bo=Math.atan2(E[1]-T,E[0]-S)-.9+1.35,ua=Xe(-2+.4*f(),-.5),wo=j===3?Xe(bo,-.3):ua;j===3&&(k[31]=bo);const go=(t,o,n)=>{const a=io(t,o);if(a[1]<-.02){const r=(n-h.y)/a[1];if(r<25)return[h.x+a[0]*r,h.z+a[2]*r,r]}const s=Math.hypot(a[0],a[2])||1;return[h.x+a[0]/s*12,h.z+a[2]/s*12,99]},Ro=()=>{i[43]=bt,i[63]=xo,i[151]=Math.min(1,bt*1.5)*.9,i[58]=Be[0],i[59]=Be[1],i[1*4+3]=ie,i[136]=ie*.004+Be[0]*.01,i[137]=ie*.0025,i[138]=le[0],i[139]=le[1],i[79]=.96+.04*Math.sin(ie*7.3)*Math.sin(ie*2.9+1)+.02*Math.sin(ie*17.1),xt(lo,104),xt(fo,108),xt(co,112)},Et=(t,o)=>{da(t,o);const n=Math.max(1,Math.min(4,Math.round(t*60)));for(let a=0;a<n;a++)ha(t/n),k.fill(0,16,28);k.fill(0,0,12)},pa=new Uint32Array(4),zo=()=>{if(!m.hf){for(const t of[l.fR0,l.fR1])e.bindFramebuffer(e.FRAMEBUFFER,t),e.clearBufferuiv(e.COLOR,0,pa);return}e.bindFramebuffer(e.FRAMEBUFFER,l.fR0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,l.fR1),e.clear(e.COLOR_BUFFER_BIT)};zo(),Ro(),yo&&(uo(),Oe(),Et(1/30,!0),po());const Mo=(t,o)=>{if(!yo)return;o=Math.min(.1,Math.max(0,o||0)),ie+=o;let n=so();if(!m.back.q&&++m.fc>2&&m.back.start(),m.back.poll(),m.back.ready&&!yt){yt=!0;const u=Pe(h.yaw,h.pitch),z=-2.3-h.x,N=-2.6-h.z;(u.fw[0]*z+u.fw[2]*N)/Math.hypot(z,N)>-.2&&(n=!0)}c.owner!==Te&&(c.sz!==w&&eo(),c.owner=Te,Ye.slot=c,n=!0),l.owner!==Te&&(to(),De=0,Ie=0,zo(),Oe(),Et(1/30,!0)),l.use=++Ze.n;const a=d.input;d.input.taps&&d.input.taps(),a.down&&!wt&&(gt=a.x,Rt=a.y,zt=a.x,Mt=a.y,ot=!1,tt=0);let s=!1;if(a.down){if(Math.hypot(a.x-gt,a.y-Rt)>.02&&(ot=!0),ot){const u=go(zt,Mt,Math.min(.6,h.y*.5)),z=go(a.x,a.y,Math.min(.6,h.y*.5)),N=z[0]-u[0],_=z[1]-u[1],$=Math.hypot(N,_);if($>.01&&o>0){const G=Math.min(7,$/o*.9),xe=N/$,Se=_/$;k.set([u[0]-xe*1.5,u[1]-Se*1.5,z[0]+xe*3,z[1]+Se*3,xe*G,Se*G,1.6,Math.min(1,G/4)],0),le[0]+=xe*G*.25*Math.min(1,o*8),le[1]+=Se*G*.25*Math.min(1,o*8),f()<.25&&d.sound.hit("noise",Math.min(.3,.06+G*.03),{cutoff:500+140*G,dur:.8})}}else tt+=o,tt>.35&&(s=!0);zt=a.x,Mt=a.y}else if(wt&&!ot&&tt<.35){const u=io(gt,Rt);if(u[1]<-.02){const z=-h.y/u[1],N=h.x+u[0]*z,_=h.z+u[2]*z;Xt(N,_)<-.08&&(Q={x:N,z:_,t:.32},d.sound.hit("click",.12))}}wt=!!a.down,re+=((s?1:0)-re)*(1-Math.exp(-o*(s?.14:.03)));const r=g.moon>=.5,b=re*re*(3-2*re);if(bt=we?g.moon:g.moon+((r?0:1)-g.moon)*b,xo=g.cover+((r?1.25:.3)-g.cover)*b,qe=je+((r?.8:0)-je)*Math.min(1,re*1.3),s&&re>.5&&!St&&(St=!0,[57,64,69,71].forEach((u,z)=>d.sound.note(u,{wave:"sine",dur:3.5,vel:.1,attack:.6,at:z*.35}))),!s&&re<.3&&(St=!1),vo+=o*(.25+.75*Math.min(1,qe/Math.max(.2,je))),le[0]*=Math.exp(-o*.8),le[1]*=Math.exp(-o*.8),Be[0]+=(We[0]+le[0])*o,Be[1]+=(We[1]+le[1])*o,Q&&(Q.t-=o,Q.t<=0&&(k.set([Q.x,Q.z,.022,.06],16),k.set([Q.x,Q.z,1,0],8),d.sound.hit("blip",.5,{freq:520+200*f()}),d.sound.hit("noise",.12,{cutoff:2500,dur:.15}),Q=null)),Nt-=o,Nt<=0&&(Nt=.25+.9*f(),k.set([wo[0]+.15*(f()-.5),wo[1]+.15*(f()-.5),.0012+.0015*f(),.04],20)),qe>.1&&f()<qe*.8){const u=f()*nt,z=Math.sqrt(f())*.85;k.set([S+Math.cos(u)*z*C,T+Math.sin(u)*z*P,25e-5,.025],24)}Tt-=o,Tt<=0&&(Tt=1.6,d.sound.hit("noise",.07,{cutoff:320,dur:2.2})),Ro(),n&&uo(),at+=o;let p=0;for(Oe();at>=1/30&&p<3;)Et(1/30,!1),at-=1/30,p++;p===3&&(at=0),po()};return m.fin&&m.fin.register(Mo,Ye),Mo}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
