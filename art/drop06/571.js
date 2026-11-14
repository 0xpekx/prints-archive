// Incoming Tide: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/571.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ce){Ce&&Ce.add({num:571,name:"Incoming Tide",fam:"Vistas",recipe:"Huge sand flats at dusk with a spring tide sliding in silently, filling the creeks first, then joining the pools until it's all one mirror around a rocky island with an abbey on top. The light, how far the tide has come and where you stand change every mint. Tap the water to drop a pebble or the sand to leave a footprint that fills up, drag to set the wind and break the mirror, or hold to bring the flood all the way in.",interactive:"Tap the water to drop a pebble and watch its rings, or the wet sand to press a footprint that fills; drag to set the wind (the sheets ripple and the mirror breaks); hold to bring the flood all the way in until the sand is gone and the island stands in the sea.",music:!0,gl:!0,fps:30,seed:0,make(g){const e=g.gl,ot=g.size,z=!!g.home;let at=1461653517;for(let t=2;t<66;t+=8)at=Math.imul(at^parseInt(g.hash.slice(t,t+8),16),2246822507)^at>>>13;const i=()=>{at=at+1831565813|0;let t=Math.imul(at^at>>>15,1|at);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<8;t++)i();const st=t=>{let o=0;for(const s in t)o+=t[s];let a=i()*o;for(const s in t)if(a-=t[s],a<0)return s;return Object.keys(t)[0]},G=Math.PI*2,rt=Math.PI,O=(t,o,a)=>t<o?o:t>a?a:t,De=(t,o,a)=>{const s=O((a-t)/(o-t),0,1);return s*s*(3-2*s)},B=z?"Afterglow":st({Afterglow:40,"Red dusk":26,"Blue hour":24,Moonrise:10}),Wt=z?"Spring flood":st({"Spring flood":50,"Slow neap":32,"Tidal bore":18}),Ft=z?"Meanders":st({Meanders:40,Branching:28,"One great creek":20,"Ridges and runnels":12}),Gt=z?"Abbey and spire":st({"Abbey and spire":48,"Abbey tower":28,"Two rocks":14,"Lone chapel":10}),Xt=z?"A few lit":st({"A few lit":50,"Village lit":34,"Floodlit abbey":16}),Ct=z?"Guided line":st({"Guided line":46,"Two groups":24,"Lone walker":16,None:14}),to=z?"Oystercatchers":st({Oystercatchers:42,Gulls:28,Curlews:18,"Great flock":12}),ne=z?"Still":st({Still:44,"Light air":36,Gusty:20});let nt=1364697373;for(let t=2;t<66;t+=8)nt=Math.imul(nt^parseInt(g.hash.slice(t,t+8),16),739982445)^nt>>>15;const le=()=>{nt=nt+1831565813|0;let t=Math.imul(nt^nt>>>15,1|nt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<4;t++)le();let xt=z?"Facing the mount":(t=>{let o=0;for(const s in t)o+=t[s];let a=le()*o;for(const s in t)if(a-=t[s],a<0)return s;return Object.keys(t)[0]})({"Facing the mount":42,"Mount to the right":26,"Low by the water":20,"Close under the mount":12});xt==="Close under the mount"&&(Gt!=="Abbey and spire"||Xt==="Floodlit abbey")&&(xt="Mount to the right");const eo=le();let lt=1460681233;for(let t=2;t<66;t+=8)lt=Math.imul(lt^parseInt(g.hash.slice(t,t+8),16),2654435761)^lt>>>14;const I=()=>{lt=lt+1831565813|0;let t=Math.imul(lt^lt>>>15,1|lt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<4;t++)I();const Qt=t=>{let o=0;for(const s in t)o+=t[s];let a=I()*o;for(const s in t)if(a-=t[s],a<0)return s;return Object.keys(t)[0]};let Q=z?"Into the glow":Qt({"Into the glow":42,"Glow to one side":22,"Glow behind you":22,"Sun still up":14});Q==="Sun still up"&&(B==="Blue hour"||B==="Moonrise")&&(Q="Into the glow"),B==="Moonrise"&&(Q="Glow behind you");const oo=B!=="Moonrise",Dt=z?"High cirrus":Qt({"High cirrus":32,Clear:20,"Ribbed altocumulus":16,Haze:14,"Lid and slit":14,"Grey evening":3.4}),ao=Qt({"First tongues":25,"Half flooded":35,"Islands shrinking":25,"Full mirror":15});let St=z||Wt==="Tidal bore"?"Half flooded":ao;const so=I()<.5,Se=Qt({"From a rock":24,"Low horizon":26,"At your feet":22,"Along the tide front":28});!z&&so&&(xt==="Facing the mount"||xt==="Mount to the right")&&(oo||Se!=="At your feet")&&(xt=Se);const ie=I()<.5?-1:1,ro=.006+.022*I();xt==="Along the tide front"&&St!=="Half flooded"&&(St="Half flooded");const no=B==="Moonrise"?"Moonrise":Q==="Sun still up"?"Sun still up":B+(Q==="Glow to one side"?", side-lit":Q==="Glow behind you"?" behind you":"");g.trait("Light",no),g.trait("Sky",Dt),g.trait("Tide",Wt==="Tidal bore"?"Tidal bore":St),g.trait("Creeks",Ft),g.trait("Island",Gt),g.trait("Windows",Xt),g.trait("Tracks",{"Guided line":"A party's trail","Two groups":"Two trails","Lone walker":"One set of prints",None:"Untrodden"}[Ct]),g.trait("Wind",ne);const V=g.trait("Where you stand",xt),P={"Facing the mount":{yaw:0,pitch:-.125,eye:1.6},"Mount to the right":{yaw:-.62,pitch:-.11,eye:1.6},"Low by the water":{yaw:.1,pitch:-.07,eye:.62},"Close under the mount":{yaw:.04,pitch:-.09,eye:1.6},"From a rock":{yaw:-.1,pitch:-.24,eye:24},"Low horizon":{yaw:.06,pitch:.17,eye:1.6},"At your feet":{yaw:.15,pitch:-.8,eye:1.6},"Along the tide front":{yaw:1.25*ie,pitch:-.15,eye:1.6}}[V];let it=1460977886;for(let t=2;t<66;t+=8)it=Math.imul(it^parseInt(g.hash.slice(t,t+8),16),668265263)^it>>>12;const bt=()=>{it=it+1831565813|0;let t=Math.imul(it^it>>>15,1|it);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<4;t++)bt();const _={mx:null,lead:0};if(!z){const t=bt(),o=bt(),a=bt(),s=bt()<.5?-1:1,r=bt()<.5?-1:1;V==="Facing the mount"?t<.45?(_.lead=r,P.pitch=-.1-.12*a):(_.mx=s*.6*o,P.pitch=-.03-.33*a):V==="Mount to the right"?(_.mx=.5+.45*o,P.pitch=-.04-.22*a):V==="Low by the water"?(t<.5?_.lead=r:_.mx=s*(.5+.75*o),P.pitch=-.03-.08*a):V==="Low horizon"?(_.mx=s*.7*o,P.pitch=.14+.14*a):V==="From a rock"?(_.mx=s*.6*o,P.pitch=-.22-.1*a,P.eye=10+6*t):V==="Close under the mount"&&(_.mx=s*.3*o,P.pitch=.03+.07*a)}const h={Afterglow:{el:-.06,zen:[.02,.042,.125],hz:[.17,.19,.31],glow:[1.25,.42,.12],yel:.8,shd:[.1,.12,.22],belt:[.2,.1,.13],cc:.45,ct:.63,cl:[1,.42,.26],cd:[.05,.05,.08],E0:[.2,.22,.32],E1:[.34,.17,.08],haze:[.26,.22,.28],st:.25,lit:.3,ex:.95},"Red dusk":{el:-.028,zen:[.03,.05,.13],hz:[.24,.21,.29],glow:[1.7,.45,.11],yel:.45,shd:[.12,.11,.2],belt:[.24,.09,.11],cc:.7,ct:.52,cl:[1.35,.36,.16],cd:[.06,.045,.06],E0:[.2,.19,.27],E1:[.42,.15,.05],haze:[.3,.2,.22],st:.1,lit:.2,ex:.85},"Blue hour":{el:-.115,zen:[.01,.022,.068],hz:[.07,.09,.17],glow:[.36,.2,.13],yel:.25,shd:[.05,.065,.13],belt:[.04,.03,.05],cc:.35,ct:.62,cl:[.24,.14,.14],cd:[.018,.022,.04],E0:[.075,.095,.16],E1:[.06,.04,.03],haze:[.08,.09,.14],st:1,lit:.6,ex:2.2},Moonrise:{el:-.1,zen:[.013,.026,.075],hz:[.09,.11,.19],glow:[.45,.24,.14],yel:.3,shd:[.06,.075,.14],belt:[.06,.04,.06],cc:.3,ct:.64,cl:[.3,.17,.15],cd:[.02,.025,.045],E0:[.09,.11,.17],E1:[.07,.05,.035],haze:[.1,.11,.16],st:.7,lit:.55,ex:1.9}}[B],ce={"High cirrus":[1,0,0],Clear:[0,0,0],"Ribbed altocumulus":[0,1,0],Haze:[.25,0,0],"Lid and slit":[0,0,1],"Grey evening":[0,0,2]}[Dt],fe=Dt==="Haze"?1:Dt==="Grey evening"?.6:0;if(Q==="Sun still up"&&(h.el=ro,h.glow=h.glow.map(t=>t*1.5),h.yel=.9,h.E1=h.E1.map(t=>t*1.8),h.ex*=.72,h.cl=h.cl.map(t=>t*1.2),h.zen=h.zen.map(t=>t*1.6),h.hz=h.hz.map(t=>t*1.35),h.st=0),fe){const t=Dt==="Grey evening",o=(a,s,r)=>{const n=(a[0]+a[1]+a[2])/3;return a.map(l=>(l+(n-l)*r)*s)};h.hz=o(h.hz,t?1.05:1.3,t?.8:.3),h.zen=o(h.zen,t?1.6:1.3,t?.75:.2),h.glow=h.glow.map(a=>a*(t?.08:.55)),h.yel*=t?.2:.7,h.belt=h.belt.map(a=>a*(t?.1:.5)),h.haze=o(h.haze,t?1.25:1.6,t?.7:.25),h.E1=h.E1.map(a=>a*(t?.15:.6)),h.E0=o(h.E0,t?1.25:1.15,t?.5:.1),h.st=0,h.ex*=t?1.15:1}const _e=-.1+(z?0:(i()-.5)*.3)+(Q==="Glow to one side"?ie*(1.3+.3*I()):Q==="Glow behind you"?rt+(I()-.5)*.5:0),W=[Math.sin(_e)*Math.cos(h.el),Math.sin(h.el),Math.cos(_e)*Math.cos(h.el)],Le=B==="Moonrise"?-.25-ie*(.1+.12*I()):rt-.35,he=B==="Moonrise"?.025+.035*I():.07,ue=[Math.sin(Le)*Math.cos(he),Math.sin(he),Math.cos(Le)*Math.cos(he)],Ie=.3+(i()-.5)*.2,R=[Math.sin(Ie),Math.cos(Ie)],Vt=.0011,_t=2e-4,de=-95,Pe=.72,zt=Ft==="Ridges and runnels"?[.065,42]:[.028,55],pe=i()*G,Lt=[],me=(t,o,a,s,r,n,l,c,u,m)=>{const w=Math.sin(a),y=Math.cos(a),d={ox:t,oz:o,ang:a,L:s,w0:r,w1:n,D0:l,D1:c,dx:w,dz:y,nx:y,nz:-w,A1:u*(.7+.5*i()),k1:G/(m*(.8+.4*i())),p1:i()*G,A2:u*.35*i(),k2:G/(m*.37*(.8+.4*i())),p2:i()*G};return Lt.push(d),d},Ne=(t,o)=>(t.A1*Math.sin(o*t.k1+t.p1)+t.A2*Math.sin(o*t.k2+t.p2))*O(o/30,0,1),Mt=(t,o)=>{const a=Ne(t,o);return[t.ox+t.dx*o+t.nx*a,t.oz+t.dz*o+t.nz*a]},lo=(t,o,a)=>{const s=o-t.ox,r=a-t.oz,n=s*t.dx+r*t.dz;if(n<-60||n>t.L+30)return 0;const l=s*t.nx+r*t.nz-Ne(t,n),c=O(n/t.L,0,1),u=t.w0+(t.w1-t.w0)*c,m=(t.D0+(t.D1-t.D0)*c)*(1-De(.82,1,n/t.L))*De(-60,0,n),w=l/u;return m*Math.pow(Math.max(0,1-w*w),.65)};{const t=Ft==="One great creek",o=Ft==="Ridges and runnels",a=rt-.36+(z?0:(i()-.5)*.5),s=[13+(z?0:(i()-.5)*24),25+(z?0:(i()-.5)*14)],r=900,n=Math.sin(a),l=Math.cos(a),c=me(s[0]-n*r,s[1]-l*r,a,r+105,t?34:o?12:18,t?13:o?3.5:6,t?1.4:o?.6:1.1,t?.75:o?.3:.42,t?14:9,t?130:85);if(_.lead){const d=r-32,p=Mt(c,d),b=t?22:o?9:12;c.ox+=_.lead*b-p[0],c.oz-=p[1];const E=Mt(c,d-160);_.yaw=Math.atan2(E[0],E[1])}const u={Meanders:6,Branching:10,"One great creek":2,"Ridges and runnels":3}[Ft];for(let d=0;d<u;d++){const p=430+i()*560,b=Mt(c,p),E=i()<.5?-1:1;me(b[0],b[1],a+E*(.5+.8*i()),40+190*i(),2.5+2.5*i(),1+.6*i(),.22+.18*i(),.1,3,30)}const m=Mt(c,r+8+(z?0:i()*30)),w=1.5-m[0],y=-6-m[1];me(m[0],m[1],Math.atan2(w,y),Math.hypot(w,y)+28,3.2,1.3,.3,.12,2,26)}const Be=(t,o)=>{const a=t*R[0]+o*R[1],s=t*R[1]-o*R[0];let r=-Vt*a+zt[0]*Math.sin(a*G/zt[1]+1.5*Math.sin(s*.013+pe)),n=0;for(const l of Lt)n=Math.max(n,lo(l,t,o));return r-n};let ct=null;const Et=64,Y=192,Wo=(t,o)=>{const a=t*R[0]+o*R[1];return-Vt*a+zt[0]*Math.sin(a*G/zt[1]+1.5*Math.sin((t*R[1]-o*R[0])*.013+pe))},vt=(t,o,a)=>{if(!ct||Math.abs(t)>94||Math.abs(o)>94)return a?a(t,o):Be(t,o);const s=160+28*Math.asinh(t/7)-.5-Et,r=160+28*Math.asinh(o/7)-.5-Et,n=Math.floor(s),l=Math.floor(r),c=s-n,u=r-l,m=(l*Y+n)*4;return(ct[m]*(1-c)+ct[m+4]*c)*(1-u)+(ct[m+Y*4]*(1-c)+ct[m+Y*4+4]*c)*u},io=t=>de+5*Math.sin(t*.027+1)+2.5*Math.sin(t*.071+2),He=Be(0,0)+P.eye,xe={"Spring flood":{mid:.03,A:.13,P:360},"Slow neap":{mid:0,A:.07,P:420},"Tidal bore":{mid:.03,A:.12,P:360}}[Wt];let H=-.025;const co=Math.asin(O((-.025-xe.mid)/xe.A,-1,1)),fo=t=>H+xe.A*.8*(1-Math.exp(-t/70))+.003*Math.sin(t*.031+co)*Math.min(1,t/90),k={D:2100+(z?0:i()*900),RH:78,RW:150,style:0,az:-.25+(z?0:(i()-.5)*.16)};V==="Close under the mount"&&(k.D=700+eo*200),k.k=k.D<1500?1950/k.D:1,_.mx!==null?P.yaw=k.az-Math.atan(_.mx*Math.tan(31*rt/180)):_.lead&&(P.yaw=_.yaw),Gt==="Abbey tower"&&(k.style=1),Gt==="Lone chapel"&&(k.style=2,k.RH=50,k.RW=115);const ho=Gt==="Two rocks",uo={"A few lit":.22,"Village lit":.75,"Floodlit abbey":.5}[Xt]*(.6+h.lit),po=Xt==="Floodlit abbey"?1:0,wt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,qe=`
#define PI 3.14159265
#define NG 320.
#define GA 7.
#define GB 28.
float h21(vec2 p){ uvec2 v = uvec2(ivec2(floor(p)) + 65536); v = v*1664525u + 1013904223u; v.x += v.y*1664525u; v.y += v.x*1664525u; v ^= v >> 16u; v.x += v.y*1664525u; v.y += v.x*1664525u; v ^= v >> 16u; return float(v.x)*(1./4294967296.); }
float h11(float x){ return h21(vec2(x, 17.)); }
vec4 nt(vec2 p){ return textureLod(uN, p*.03125, 0.); }
float sdSeg(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba)/dot(ba, ba), 0., 1.); return length(pa - ba*h); }
`,mo=wt+"void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); gl_Position = vec4(p*2. - 1., 0., 1.); }",Ue=wt+"uniform vec4 uB; uniform vec4 uK[16]; uniform sampler2D uN; uniform sampler2D uCh; out vec4 o;"+qe+`
vec3 vqg(vec2 p, float per, float sd){
  vec2 i = floor(p), f = p - i;
  vec2 u = f*f*f*(f*(f*6. - 15.) + 10.), du = 30.*f*f*(f*(f - 2.) + 1.);
  float a = h21(mod(i, per) + sd), b = h21(mod(i + vec2(1, 0), per) + sd), c = h21(mod(i + vec2(0, 1), per) + sd), d = h21(mod(i + 1., per) + sd);
  return vec3(a + (b - a)*u.x + (c - a)*u.y + (a - b - c + d)*u.x*u.y, du*(vec2(b - a, c - a) + (a - b - c + d)*u.yx));
}
float n1(float x){ return textureLod(uN, vec2(x, 9.37)*.03125, 0.).r; }
float fbS(vec2 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++){ s += a*nt(p).r; p = p*2.03 + vec2(13.1, 7.7); a *= .5; } return s/.9375; }`+`// ---- sand ----
float sandM(vec2 p, out float mud){
  vec2 sea = uK[0].xy; float s = dot(p, sea), al = dot(p, vec2(sea.y, -sea.x));
  vec2 sp = p + uK[2].zw;
  float b = -uK[0].z*s;
  float rel = uK[2].x*(fbS(sp*.006) - .5) + .05*(nt(sp*.022).r - .5) + .025*(nt(sp*.08).a - .5);
  b += rel + uK[0].w*sin(s*6.2832/uK[1].x + 1.5*sin(al*.013 + uK[2].y));
  float ch = 0., lev = 0.;
  int n = int(uK[1].w);
  for (int i = 0; i < 16; i++) {
    if (i >= n) break;
    vec4 c0 = texelFetch(uCh, ivec2(i, 0), 0), c1 = texelFetch(uCh, ivec2(i, 1), 0), c2 = texelFetch(uCh, ivec2(i, 2), 0), c3 = texelFetch(uCh, ivec2(i, 3), 0);
    vec2 dd = vec2(sin(c0.z), cos(c0.z)), nn = vec2(dd.y, -dd.x), q = p - c0.xy;
    float a = dot(q, dd);
    if (a < -60. || a > c0.w + 30.) continue;
    float m = (c2.x*sin(a*c2.y + c2.z) + c2.w*sin(a*c3.x + c3.y))*clamp(a/30., 0., 1.);
    float lat = dot(q, nn) - m, f = clamp(a/c0.w, 0., 1.);
    float w = mix(c1.x, c1.y, f);
    float D = mix(c1.z, c1.w, f)*(1. - smoothstep(.82, 1., a/c0.w))*smoothstep(-60., 0., a);
    float r = lat/w;
    ch = max(ch, D*pow(max(0., 1. - r*r), .65));
    lev = max(lev, .06*D*exp(-pow((abs(r) - 1.3)*2.2, 2.)));
  }
  b += lev*(1. - smoothstep(.0, .05, ch)) - ch;
  // the opening mint's foreground rises a few centimetres toward your feet, so the flood's front creeps over it in the
  // lower half of the picture (polish 2)
  b += uK[10].w*(1. - smoothstep(0., 12., length(p - vec2(0., -2.))));
  mud = clamp(smoothstep(.04, .22, ch) + smoothstep(-.03, -.09, rel)*.6, 0., 1.);
  float ze = uK[1].y + 5.*sin(p.x*.027 + 1.) + 2.5*sin(p.x*.071 + 2.);
  float mm = smoothstep(ze + .4, ze - .4, p.y);
  b = mix(b, uK[1].z + .003*(ze - p.y), mm);
  return b;
}
// ---- island ----
float rockH(float x, float RH, float RW){
  float r = (x - RW*.08)/RW; r *= r < 0. ? .92 : 1.08;
  float q = max(0., 1. - pow(abs(r), 2.4));
  float h = RH*pow(q, .42) + (n1(x*.035) - .5)*.26*RH*q + (n1(x*.11 + 5.) - .5)*.1*RH*q + (n1(x*.37 + 2.) - .5)*.04*RH*q;
  h -= 6.*smoothstep(.55, .75, n1(x*.06 + 3.))*q;
  return max(h, 7.*smoothstep(1.45, .92, abs(r))*(.8 + .5*n1(x*.07 + 9.)));
}
void island(float x, float y, float px, out float cov, out float win, out float rank, out float mat){
  float RH = uK[3].y, RW = uK[3].z, st = uK[3].w, sd = uK[4].w;
  float rk = rockH(x, RH, RW), top = rk; mat = .2 + .15*n1(x*.3 + y*.05);
  win = 0.; rank = 1.;
  float xa = RW*.06;
  // ramparts with round towers, lamps on top
  if (st < 1.5 && x > -1.04*RW && x < .52*RW) {
    float tw = smoothstep(5., 3.8, abs(mod(x + 20., 57.) - 28.5));
    float wt = 12.5 + 4.5*tw;
    if (y < wt) { top = max(top, wt); mat = .5; }
    float lx = mod(x, 16.) - 8.;
    float l = exp(-(lx*lx + (y - wt + 2.5)*(y - wt + 2.5))/(px*px*.5));
    if (l > win) { win = l; rank = .03 + .25*h11(floor(x/16.) + sd); }
  }
  // village climbing the left flank (and a few houses on the right)
  float vL = st > 1.5 ? -.95*RW : -.98*RW, vR = st > 1.5 ? -.7*RW : -.06*RW;
  float cw = 9.5, k = floor(x/cw), fx = x/cw - k, hk = h11(k + sd);
  float xc = (k + .5)*cw;
  bool inV = (xc > vL && xc < vR) || (st < 1.5 && xc > .38*RW && xc < .8*RW);
  if (inV && hk > .1) {
    float g = rockH(xc, RH, RW);
    float ht = g - 2. + 7. + 6.*hk;
    float roof = ht + (2. + 2.*h11(k*1.7 + sd))*(1. - abs(fx*2. - 1.))*step(.35, h11(k*2.3));
    if (y < roof && fx > .04 && fx < .96) {
      if (roof > top) top = roof;
      mat = max(mat, .55);
      float row = floor((y - g)/3.2), wy = fract((y - g)/3.2);
      float wx = fract(fx*2.);
      if (y < ht - 1.2 && y > g + 1. && wx > .32 && wx < .68 && wy > .3 && wy < .78) {
        win = 1.; rank = .1 + .9*h21(vec2(k*3. + floor(fx*2.), row) + sd);
      }
    }
  }
  if (st < 1.5) {
    // the abbey: terraces of monastery walls stepping up the summit, the church on top, a crossing tower
    float tA = -1.;
    if (x > xa - 60. && x < xa + 64.) tA = RH - 4. + 6.*step(xa - 44., x) + 5.*step(xa - 32., x);
    if (x > xa + 30. && x < xa + 62.) tA = max(tA, RH + 19. - 3.*step(xa + 54., x) + (abs(mod(x - xa, 7.) - 3.5) < .6 ? 1.5 : 0.));
    if (y < tA) { top = max(top, tA); mat = max(mat, .72); }
    float wx = mod(x - xa, 5.5) - 2.75, wyy = mod(y - RH, 4.6) - 2.3;
    if (x > xa + 32. && x < xa + 60. && y < tA - 2. && y > rk + 3. && abs(wx) < .55 && abs(wyy) < .9) { win = max(win, 1.); rank = min(rank, .35 + .6*h21(vec2(floor((x - xa)/5.5), floor((y - RH)/4.6)) + sd + 3.)); }
    float wb = RH + 31.;
    if (x > xa - 30. && x < xa + 40.) {
      float ch = x < xa + 28. ? min(RH + 42., min(wb + (x - xa + 30.)*1.5, wb + (xa + 28. - x)*1.5 + 2.)) : RH + 30. - (x - xa - 28.)*(x - xa - 28.)*.09;
      ch = max(ch, x < xa + 28. ? wb : 0.);
      if (abs(mod(x - xa + 30., 7.) - 3.5) < .45 && x < xa + 28.) ch = max(ch, wb + 3.2);
      if (y < ch) { top = max(top, ch); mat = .9; }
      float lx = mod(x - xa + 26.75, 6.5) - 3.25;
      if (abs(lx) < .7 && y > RH + 23. && y < RH + 29.5 && x < xa + 26.) { win = max(win, 1.); rank = min(rank, .5 + .5*h21(vec2(floor((x - xa)/6.5), 5.) + sd)); }
    }
    float xt = xa + 3.;
    if (abs(x - xt) < 5.2) {
      float tt = st < .5 ? RH + 51. : RH + 57.;
      if (y < tt) { top = max(top, tt); mat = .9; }
      if (st > .5 && abs(abs(x - xt) - 4.6) < .55 && y < tt + 4.5) top = max(top, tt + 4.5);
      if (abs(x - xt) < .8 && y > tt - 8. && y < tt - 3.) { win = max(win, 1.); rank = min(rank, .6); }
    }
    if (st < .5) {
      float sh = 4.1*(1. - (y - RH - 51.)/47.);
      if (y > RH + 50. && abs(x - xt) < sh) { top = max(top, y + .1); mat = .9; }
      if (abs(x - xt) < .32 && y < RH + 104.) top = max(top, y + .1);
    }
  } else {
    float xc2 = xa - 4.;
    if (abs(x - xc2) < 9.) {
      float rr = RH + 8. + 5.*(1. - abs(x - xc2)/9.);
      if (y < rr) { top = max(top, rr); mat = .7; }
      if (abs(x - xc2 + 8.) < 1. && y < RH + 17.) top = max(top, RH + 17.);
      if (abs(x - xc2 - 3.) < .7 && y > RH + 3. && y < RH + 6.) { win = 1.; rank = .2; }
    }
  }
  cov = clamp((top - y)/px + .5, 0., 1.);
  win *= cov;
}
// ---- the low panorama: coasts, villages and their lights ----
void lights(float az, float el, float D, float y0, float y1, float dens, float cell, float sd, float pxa, inout float lit, inout float tint){
  float k = floor(az/cell);
  for (int j = -1; j <= 1; j++) {
    float kk = k + float(j);
    for (int m = 0; m < 2; m++) {
      vec2 hs = vec2(kk, float(m) + sd);
      if (h21(hs) > dens) continue;
      float la = (kk + h21(hs + 3.1))*cell;
      float ly = mix(y0, y1, pow(h21(hs + 7.7), 1.6 - float(m)*.8));
      float le = (ly - 1.6)/D;
      float dd = ((az - la)*(az - la) + (el - le)*(el - le))/(pxa*pxa);
      float I = exp(-dd*1.6)*(.4 + .8*h21(hs + 11.));
      if (I > lit) { lit = I; tint = step(.72, h21(hs + 13.)); }
    }
  }
}
vec4 lowPano(float az, float el, float pxa){
  float cov = 0., lit = 0., tint = 0., hz = 1.;
  float ab = az > 0. ? az - PI : az + PI;
  float sd = uK[12].x, dens = uK[12].y;
  float D1 = 5000., H1 = 0., vl = 0., H2 = 0., H3 = 0., cl0 = smoothstep(.42, .72, n1(ab*7. + sd*.01));
  // the coast behind: low hills, hedges, a village with a church, lights along the shore road and up the hills
  float w = smoothstep(1.5, 1.08, abs(ab));
  if (w > 0.) {
    float D = 4800. + 900.*sin(ab*2.3 + 1.); D1 = D;
    float H = (8. + 26.*n1(ab*2.5 + 3.) + 34.*pow(n1(ab*.9 + 7.), 2.))*w;
    float top = H + 5.*(n1(ab*230. + 1.) - .3)*w + 2.*(n1(ab*900.) - .5)*w;
    float vx = (ab - .16)*D;
    if (abs(vx) < 300.) top = max(top, H + (6. + 6.*h11(floor(vx/12.)))*smoothstep(300., 170., abs(vx)));
    if (abs(vx - 30.) < 3.6) top = max(top, H + 36.);
    float y = el*D + 1.6;
    if (abs(vx - 30.) < 3.6*(1. - (y - H - 36.)/16.) && y > H + 35.) top = max(top, y + .5);
    float c1 = clamp((top - y)/(pxa*D) + .5, 0., 1.);
    if (c1 > 0.) { cov = c1; hz = .5; }
    H1 = H; vl = smoothstep(360., 120., abs(vx));
  }
  // the far coast on the left, very low and hazy, few lights
  float w2 = smoothstep(-1.95, -1.6, az)*smoothstep(-.42, -.62, az);
  if (w2 > 0. && cov < .5) {
    float D = 12000.;
    float H = (14. + 50.*n1(az*4. + 11.) + 30.*n1(az*13.))*w2;
    float top = H + 4.*(n1(az*500.) - .3);
    float y = el*D + 1.6;
    float c2 = clamp((top - y)/(pxa*D) + .5, 0., 1.);
    if (c2 > cov) { cov = c2; hz = .82; }
    H2 = H;
  }
  // a headland on the right-hand side of the sea, far off (its lighthouse is drawn live)
  float w3 = smoothstep(1.7, 1.95, az)*smoothstep(2.62, 2.35, az);
  if (w3 > 0. && cov < .5) {
    float D = 9000.;
    float H = (20. + 30.*n1(az*6. + 2.))*w3;
    float y = el*D + 1.6;
    float c3 = clamp((H + 3.*(n1(az*400.) - .3) - y)/(pxa*D) + .5, 0., 1.);
    if (c3 > cov) { cov = c3; hz = .72; }
    H3 = H;
  }
  for (int li = 0; li < int(uK[12].w); li++) {
    vec4 A = li == 0 ? vec4(D1, 2.5, max(H1*.85, 4.), dens*w*(.15 + .85*cl0)) : li == 1 ? vec4(D1, 3., H1 + 14., .9*vl) : li == 2 ? vec4(12000., 3., H2*.8, dens*.35*w2) : vec4(9000., 3., H3*.7, dens*.3*w3);
    vec2 B = li == 0 ? vec2(.0045, sd) : li == 1 ? vec2(.0011, sd + 40.) : vec2(.006, sd + 10.*float(li));
    if (A.w > 0.) lights(az, el, A.x, A.y, A.z, A.w, B.x, B.y, pxa, lit, tint);
  }
  return vec4(cov, lit, tint, hz);
}
// ---- the dusk sky ----
vec3 skyF(vec3 d){
  vec3 sd = uK[6].xyz;
  float y = max(d.y, 0.);
  vec2 hd = normalize(d.xz + 1e-6), hs = normalize(sd.xz);
  float m = clamp(.5 + .5*dot(hd, hs), 0., 1.), a = 1. - m;
  vec3 c = mix(uK[7].rgb, uK[8].rgb, pow(1. - y, 4.));
  float gw = pow(m, 3.)*exp(-y*10.*uK[9].w), gt = pow(m, 16.)*exp(-y*30.);
  c += uK[9].rgb*(gw*.55 + gt*.8) + vec3(.35, .3, .12)*uK[6].w*gt*exp(-y*10.);
  c += vec3(.22, .25, .1)*uK[6].w*pow(m, 2.)*exp(-abs(y - .13)*11.)*.6;
  float es = smoothstep(.075, .02, y)*a*a;
  c = mix(c, uK[10].rgb, es*.7);
  c += uK[11].rgb*exp(-pow((y - .1)/.055, 2.))*pow(a, 1.5);
  return c;
}
void main(){
  vec2 fc = gl_FragCoord.xy;
  int md = int(uB.x);
  if (md == 0) {
    vec2 p = fc/8.;
    vec3 A = vqg(p, 32., 0.); float B = vqg(p, 32., 500.).x;
    o = vec4(A.x, A.yz*.2 + .5, B);
  } else if (md == 1) {
    vec2 u = floor(fc) + .5 - NG*.5;
    vec2 p = GA*sinh(u/GB), cs = GA/GB*cosh(u/GB);
    float mud; float b = sandM(p, mud);
    o = vec4(b, cs, mud);
  } else if (md == 2) {
    vec2 uv = fc/uB.yz;
    float ik = uK[4].y*(1./.13), da = (uv.x - .5)*2.*uK[4].y, el = mix(-.004, .105, uv.y)*ik;
    float D = uK[3].x, px = .109*ik/uB.z*D;
    float cov, win, rank, mat;
    island(da*D, el*D + 1.6, px, cov, win, rank, mat);
    if (uK[5].x > .5 && cov < .99) {
      float D2 = uK[5].z, x2 = (da - uK[5].y)*D2, y2 = el*D2 + 1.6, px2 = .109*ik/uB.z*D2;
      float r2 = (x2 - 8.)/105., q2 = max(0., 1. - pow(abs(r2), 2.4));
      float c2 = clamp((uK[5].w*pow(q2, .42) + (n1(x2*.035) - .5)*.26*uK[5].w*q2 - y2)/px2 + .5, 0., 1.);
      if (c2 > cov) { cov = c2; mat = .05; win = 0.; }
    }
    o = vec4(cov, win, rank, mat);
  } else if (md == 3) {
    vec2 uv = fc/uB.yz;
    float az = (uv.x - .5)*2.*PI, el = mix(-.006, .05, uv.y);
    o = lowPano(az, el, 2.*PI/uB.y);
  } else {
    vec2 uv = fc/uB.yz;
    float az = (uv.x - .5)*2.*PI, el = uv.y*1.5707963, y = sin(el), ce = cos(el);
    o = vec4(skyF(vec3(sin(az)*ce, y, cos(az)*ce)), 1.);
  }
}`,xo=wt+`uniform vec4 uF[4]; uniform sampler2D uS; uniform sampler2D uQ; uniform sampler2D uG; out vec4 o;
#define NG 320
float face(float q, float e0, float e1, float b0, float b1, float h0, float h1, float l, float w, float A0, float A1, float wind, float acc, float dt){
  float hf = max(e0, e1) - max(b0, b1);
  if (hf < 1e-4) return 0.;
  q += dt*(-9.81*hf*w*(e1 - e0)/l + (1.6e-6*wind*abs(wind)*smoothstep(0., .02, hf) + hf*acc)*w);
  float u = q/(w*hf);
  q /= 1. + dt*(9.81*uF[0].y*abs(u)/pow(hf, 1.3333) + 2e-6/(hf*hf));
  return q > 0. ? min(q, h0*A0/(4.*dt)) : max(q, -h1*A1/(4.*dt));
}
void main(){
  ivec2 c = ivec2(gl_FragCoord.xy);
  vec4 G0 = texelFetch(uG, c, 0); float h0 = texelFetch(uS, c, 0).r, e0 = G0.r + h0;
  vec2 Q = texelFetch(uQ, c, 0).rg;
  float dt = uF[0].x;
  vec2 sd = vec2(c) + .5 - uF[1].xy;
  float sw = uF[1].z*exp(-dot(sd, sd)/(uF[1].w*uF[1].w));
  vec2 r = vec2(0.);
  if (c.x < NG - 1) {
    ivec2 c1 = c + ivec2(1, 0); vec4 G1 = texelFetch(uG, c1, 0); float h1 = texelFetch(uS, c1, 0).r;
    r.x = face(Q.x, e0, G1.r + h1, G0.r, G1.r, h0, h1, .5*(G0.g + G1.g), G0.b, G0.g*G0.b, G1.g*G1.b, uF[0].z, sw*uF[2].x, dt);
  }
  if (c.y < NG - 1) {
    ivec2 c1 = c + ivec2(0, 1); vec4 G1 = texelFetch(uG, c1, 0); float h1 = texelFetch(uS, c1, 0).r;
    r.y = face(Q.y, e0, G1.r + h1, G0.r, G1.r, h0, h1, .5*(G0.b + G1.b), G0.g, G0.g*G0.b, G1.g*G1.b, uF[0].w, sw*uF[2].y, dt);
  }
  o = vec4(r, 0., 1.);
}`,vo=wt+`uniform vec4 uF[4]; uniform sampler2D uS; uniform sampler2D uQ; uniform sampler2D uG; out vec4 o;
#define NG 320
float foamAt(vec2 g){
  vec2 f = g - .5; vec2 fl = floor(f); f -= fl;
  ivec2 i = clamp(ivec2(fl), ivec2(0), ivec2(NG - 2));
  return mix(mix(texelFetch(uS, i, 0).g, texelFetch(uS, i + ivec2(1, 0), 0).g, f.x), mix(texelFetch(uS, i + ivec2(0, 1), 0).g, texelFetch(uS, i + ivec2(1, 1), 0).g, f.x), f.y);
}
void main(){
  ivec2 c = ivec2(gl_FragCoord.xy);
  vec4 G = texelFetch(uG, c, 0), S = texelFetch(uS, c, 0);
  vec2 p = 7.*sinh((vec2(c) + .5 - 160.)/28.);
  float Lx = uF[0].z + uF[0].w*dot(p, uF[2].xy);
  if (uF[2].z > .5) { float h = max(0., Lx - .012 - G.r); o = vec4(h, 0., h > .002 ? 20. : -40., 0.); return; }
  float dt = uF[0].x;
  vec2 Qc = texelFetch(uQ, c, 0).rg;
  float qW = c.x > 0 ? texelFetch(uQ, c - ivec2(1, 0), 0).r : 0.;
  float qS = c.y > 0 ? texelFetch(uQ, c - ivec2(0, 1), 0).g : 0.;
  float h = S.r + dt*(qW - Qc.r + qS - Qc.g)/(G.g*G.b);
  h += dt*uF[0].y*smoothstep(.002, .3, h)*(Lx - G.r - h);
  vec2 sd = vec2(c) + .5 - uF[1].xy;
  h += dt*uF[1].z*exp(-dot(sd, sd)/(uF[1].w*uF[1].w));
  h = max(h, 0.);
  if (c.x == 0 || c.y == 0 || c.x == NG - 1 || c.y == NG - 1) h = max(0., Lx - G.r);
  float hh = max(h, .004);
  vec2 u = vec2((qW + Qc.r)/G.b, (qS + Qc.g)/G.g)*.5/hh;
  float sp = h > .001 ? length(u) : 0.;
  float f0 = foamAt(vec2(c) + .5 - u*dt/G.gb)*exp(-dt*uF[2].w);
  float thin = 1. - smoothstep(.004, .05, h);
  float f = f0 + dt*(2.5*smoothstep(.12, .5, sp)*thin*step(.0008, h) + 1.5*smoothstep(.6, 1.4, sp));
  f = min(f, 1.);
  // a tap (or a bore) churns up dense foam: above 1 (only ever reached after a surge), it advects and decays like the
  // rest, so it spreads with the racing water and lingers a few seconds before it thins back to lace
  if (uF[3].x + uF[3].y > 0. || f0 > 1.) {
    f = max(f, f0);
    f += dt*(uF[3].x*exp(-dot(sd, sd)/(uF[1].w*uF[1].w*2.)) + uF[3].y*smoothstep(.15, .5, sp)*step(.001, h)*exp(-dot(sd, sd)/(uF[1].w*uF[1].w*8.)));
    f = min(f, 2.4);
  }
  if (h < .0008) f *= exp(-dt*.8);
  float age = h > .002 ? max(S.b, 0.) + dt : min(S.b, 0.) - dt;
  o = vec4(h, f, clamp(age, -60., 60.), sp);
}`,wo=wt+"uniform vec4 uC[20]; uniform sampler2D uN; uniform sampler2D uS; uniform sampler2D uG; uniform sampler2D uSky; uniform sampler2D uI; uniform sampler2D uP; uniform sampler2D uCl; uniform sampler2D uD; out vec4 o;"+qe+`
float at2(float y, float x){ float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay)/max(max(ax, ay), 1e-12)); a = ay > ax ? 1.5707963 - a : a; a = x < 0. ? PI - a : a; return y < 0. ? -a : a; }
vec2 toG(vec2 p){ return NG*.5 + GB*asinh(p/GA); }
vec4 bv(sampler2D t, vec2 g){
  vec2 f = g - .5; vec2 fl = floor(f); f -= fl;
  ivec2 i = clamp(ivec2(fl), ivec2(0), ivec2(318));
  return mix(mix(texelFetch(t, i, 0), texelFetch(t, i + ivec2(1, 0), 0), f.x), mix(texelFetch(t, i + ivec2(0, 1), 0), texelFetch(t, i + ivec2(1, 1), 0), f.x), f.y);
}
vec4 bg(sampler2D t, vec2 g, out vec4 gx, out vec4 gy){
  vec2 f = g - .5; vec2 fl = floor(f); f -= fl;
  ivec2 i = clamp(ivec2(fl), ivec2(0), ivec2(318));
  vec4 a = texelFetch(t, i, 0), b = texelFetch(t, i + ivec2(1, 0), 0), c = texelFetch(t, i + ivec2(0, 1), 0), d = texelFetch(t, i + ivec2(1, 1), 0);
  gx = mix(b - a, d - c, f.y); gy = mix(c - a, d - b, f.x);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float farB(vec2 p){ return -uC[8].w*dot(p, uC[6].xy) + .1*(nt(p*.004).r - .5); }
float gCov = 0.;
vec3 farV(vec3 d, float lod, float PIX){
  float a = at2(d.x, d.z), e = d.y, T = uC[0].w;
  vec3 c = textureLod(uSky, vec2(a*(.5/PI) + .5, asin(clamp(e, 0., 1.))*.63662), 0.).rgb;
  // high cloud about 9 km up, read from one shared cloud map (polish: the live warped noise folded back on itself like
  // stirred ink and cost a fifth of the program): R cirrus strands combed along the wind, each from a dense hooked head
  // to a thinning tail; G ribbed altocumulus; B a lumpy stratus lid. The mint picks the mix (uC[16].yzw), the wind's
  // bearing and the patches. Toward the afterglow and low (far off) the layer is lit from below; overhead it is in the
  // earth's shadow and grey. A lid leaves a clear slit along the horizon unless the evening is grey.
  if (e > .003 && dot(uC[16].yzw, vec3(1.)) > 0.) {
    float ie = 1./(e + .02);
    vec2 q = d.xz*ie;
    vec2 qw = mat2(uC[19].y, uC[19].z, -uC[19].z, uC[19].y)*q + uC[19].x*vec2(.013, .007);
    float fw = (PIX + lod*.006)*ie*ie;
    vec4 cm = textureLod(uCl, qw*vec2(.021, .047) + uC[19].x*.01, max(log2(max(fw*.047*512., 1e-4)), 0.));
    float pat = nt(qw*vec2(.07, .16) + 3.).r*.7 + nt(qw*vec2(.21, .4) + 9.).a*.3;
    float lid = uC[16].w*smoothstep(.12, .42, cm.b*.7 + .45*pat)*mix(smoothstep(.012, .045, e), 1., step(1.5, uC[16].w));
    float rib = uC[16].z > 0. ? textureLod(uCl, qw*vec2(.07, .16), max(log2(max(fw*.16*512., 1e-4)), 0.)).g : 0.;
    float P = smoothstep(uC[17].w - .3, uC[17].w + .08, pat);
    // (polish 2: the lid no longer thins with the light's cloud amount; at blue hour it was all but invisible)
    float ci = (uC[16].y*min(cm.r*3.2, 1.)*P + uC[16].z*rib*smoothstep(.35, .6, pat)*1.5)*smoothstep(.003, .05, e)*uC[18].w*1.6 + min(lid, 1.)*.95;
    vec2 hs = normalize(uC[4].xz);
    float m = clamp(.5 + .5*dot(normalize(d.xz + 1e-6), hs), 0., 1.);
    float qs = dot(q, hs), qT = 6371.*(-uC[4].y - .053)/9.;
    float li = smoothstep(qT - 4., qT + 5., qs), deep = smoothstep(qT + 12., qT - 2., qs);
    vec3 lc = uC[17].rgb*(.5 + 1.1*pow(m, 4.))*vec3(1., 1. - .35*deep, 1. - .5*deep);
    vec3 dc = uC[18].rgb*(1. + 1.8*pow(m, 3.)) + c*.25;
    li *= 1. - .7*step(1.5, uC[16].w);
    c = mix(c, mix(dc, lc, li*(1. - .5*cm.b*uC[16].w)), min(ci, 1.)*.85); gCov = min(ci, 1.);
  }
  if (uC[11].w > 0.) {
    float r = sqrt(max(0., 2. - 2.*dot(d, uC[11].xyz)));
    c += uC[12].rgb*(smoothstep(.0053, .0043, r) + .015*exp(-r*25.) + .004*exp(-r*5.) + .05*step(5., uC[12].r)*exp(-r*60.));
  }
  if (e < .05) {
    vec4 P = textureLod(uP, vec2(a*(.5/PI) + .5, (e + .006)*(1./.056)), lod);
    if (P.r > 0.) {
      float Tr = 1. - P.a;
      vec3 land = vec3(.008, .01, .015) + uC[8].rgb*.06;
      c = mix(c, land*Tr + c*(1. - Tr), P.r); gCov = max(gCov, P.r);
      c += P.g*mix(vec3(1., .52, .2), vec3(.8, .88, 1.), P.b)*uC[15].a*Tr;
    }
    if (uC[13].z > 0.) {
      float da = a - uC[12].w, de = e - .0055;
      float fl = pow(max(0., sin(T*2.1)), 30.) + .7*pow(max(0., sin(T*2.1 - .9)), 30.);
      float sp = PIX*.9 + lod*.002;
      c += vec3(1., .93, .78)*uC[13].z*(.4 + 30.*fl)*exp(-(da*da + de*de)/(sp*sp))*(.25 + .75*smoothstep(.0, .002, PIX*.5/sp));
    }
  }
  float ik = uC[7].y*(1./.13);
  if (e < .105*ik) {
    vec2 iu = vec2((a - uC[7].x)/(2.*uC[7].y) + .5, (e + .004*ik)/(.109*ik));
    if (iu.x > 0. && iu.x < 1.) {
      vec4 I = textureLod(uI, iu, lod);
      if (I.r > 0.) {
        float Tr = (I.a < .1 ? .55 : .88)*(1. - .55*uC[13].w);
        vec3 st = vec3(.011, .012, .019)*(.5 + .9*I.a) + uC[8].rgb*.05;
        // the mount is lit from where the light is (polish: it was one flat brown cut-out): a warm rim on the edges that
        // face the glow, the flank toward a side light, the whole face lit rose when the glow is behind you
        float sa = uC[14].w;
        float fr = smoothstep(.8, 2.6, abs(sa)), sdn = sa < 0. ? -1. : 1.;
        float fl = clamp(.5 + 1.6*sdn*(iu.x - .5), 0., 1.)*smoothstep(.3, 1.3, abs(sa))*(1. - fr);
        float Ir = textureLod(uI, iu + vec2(sdn*.004, .012)*(1. - fr), lod).r;
        float rim = max(I.r - Ir, 0.)*(1. - fr);
        st += uC[9].rgb*(.32*rim + .14*fl*(.5 + I.a) + fr*(.05 + .1*I.a))*(1. - .8*uC[13].w);
        st += uC[7].w*vec3(1., .6, .28)*.12*smoothstep(.45, .9, I.a)*(.6 + .4*nt(iu*vec2(400., 120.)).r);
        c = mix(c, st*Tr + c*(1. - Tr), I.r); gCov = max(gCov, I.r);
        c += I.g*smoothstep(I.b, I.b + .02, uC[4].w)*uC[15].rgb*Tr;
      }
    }
  }
  return c;
}
void main(){
  vec2 fc = gl_FragCoord.xy/uC[2].w;
  vec2 sc = (fc*2. - 1.)*uC[1].w;
  vec3 ro = uC[0].xyz;
  vec3 rd = normalize(uC[3].xyz + uC[1].xyz*sc.x + uC[2].xyz*sc.y);
  float T = uC[0].w, PIX = 2.*uC[1].w/uC[2].w, L = uC[3].w;
  vec3 col; float tg = 1e7, mir = 0., sky = 0.;
  vec3 E0 = uC[8].rgb, E1 = uC[9].rgb;
  vec3 Ld = normalize(vec3(uC[4].x, .35, uC[4].z));
  // the salt meadow behind you is drawn by its own small program over this one (polish 2: it is never in the opening
  // view and cost a fifth of this program on Windows)
  // one farV call site (it is big): the sky looks along rd, the ground along its reflection
  int kd = 1; vec3 fd = rd; float flod = 0.;
  vec3 sandC = vec3(0.), bed = vec3(0.), foamC = vec3(0.); float Fs = 0., Fw = 0., fa = 0., wm = 0., edge = 0., tW = 0.;
  if (rd.y >= -2e-4) {
    kd = 0;
  } else {
    kd = 2;
    float t = (ro.y - L)/-rd.y;
    vec2 p;
    for (int k = 0; k < int(uC[16].x); k++) {
      p = ro.xz + rd.xz*t;
      float s;
      if (max(abs(p.x), abs(p.y)) < 1000.) { vec2 g = toG(p); s = bv(uG, g).r + bv(uS, g).r; }
      else s = max(farB(p), L + uC[5].w*dot(p, uC[6].xy));
      t = max((ro.y - min(s, .45))/-rd.y, .2);
    }
    p = ro.xz + rd.xz*t; tg = t;
    float fp = t*PIX/max(-rd.y, .012);
    float bC, h, foam = 0., age = 30., sp = 0., mud = 0.;
    vec2 bgrad = vec2(0.), egrad = vec2(0.);
    if (max(abs(p.x), abs(p.y)) < 1000.) {
      vec2 g = toG(p);
      vec4 gx, gy, sx, sy;
      vec4 G = bg(uG, g, gx, gy), S = bg(uS, g, sx, sy);
      bC = G.r; h = S.r; foam = S.g; age = S.b; sp = S.a; mud = G.a;
      bgrad = vec2(gx.r/G.g, gy.r/G.b);
      egrad = bgrad + vec2(sx.r/G.g, sy.r/G.b);
      float fw2 = smoothstep(700., 1000., max(abs(p.x), abs(p.y)));
      if (fw2 > 0.) { float hf = max(0., L + uC[5].w*dot(p, uC[6].xy) - farB(p)); h = mix(h, hf, fw2); bC = mix(bC, farB(p), fw2); }
    } else {
      bC = farB(p); h = max(0., L + uC[5].w*dot(p, uC[6].xy) - bC); age = h > 0. ? 30. : -60.;
    }
    float sandy = 1. - mud;
    // current ripples at their real 11 cm, centimetre bumps, worm casts
    vec2 rdir = normalize(uC[6].xy + .45*(nt(p*.021).gb - .5));
    vec4 w1 = nt(p*.9);
    vec4 w2 = nt(p*3.3 + 5.);
    float ph = dot(p + .25*(vec2(w1.r, w1.a) - .5) + .035*(vec2(w2.r, w2.a) - .5), rdir)*57.1 + 6.28*nt(p*.31).r + 2.2*(w2.r - .5)*smoothstep(.4, .8, w1.a);
    float fr = 1. - smoothstep(.02, .065, fp);
    float rA = .0058*sandy*fr*(.35 + .9*nt(p*.13).a)*(.55 + .6*smoothstep(.2, .7, w2.a));
    float rip = rA*(sin(ph) + .28*sin(2.*ph + 1.2));
    vec2 rgr = rA*(cos(ph) + .56*cos(2.*ph + 1.2))*57.1*rdir;
    vec4 m1 = nt(p*.62), m2 = nt(p*1.9 + 7.);
    float fm = 1. - smoothstep(.25, 1., fp);
    float meso = (.012*(m1.r - .5) + .006*(m2.r - .5))*(.4 + .6*sandy);
    vec2 mgr = ((m1.gb - .5)*5.*.62*.012 + (m2.gb - .5)*5.*1.9*.006)*fm;
    float casts = 0.; vec2 cgr = vec2(0.);
    if (fp < .03) {
      vec2 cq = p*5., ci = floor(cq);
      float hh = h21(ci + 91.);
      if (hh > .9) {
        vec2 cc = ci + .3 + .4*fract(hh*vec2(1731.3, 2399.7));
        vec2 dv = (cq - cc)/5.;
        float k2 = 1./(.016*.016);
        casts = .007*exp(-dot(dv, dv)*k2)*(1. - .6*smoothstep(.0, .5, sin(length(dv)*900. + atan(dv.y/(dv.x + 1e-5))*2.)))*sandy;
        cgr = -2.*dv*k2*casts;
      }
    }
    // megaripples, 80 cm, the texture that carries ripples out to the middle distance
    float fM = (1. - smoothstep(.12, .4, fp))*sandy;
    vec2 mdir = normalize(rdir + .25*vec2(rdir.y, -rdir.x));
    float phM = dot(p + 1.6*(vec2(m1.r, m1.a) - .5) + .5*(vec2(m2.r, m2.a) - .5), mdir)*7.85 + 9.*nt(p*.07).a;
    float mA = .0055*fM*smoothstep(.3, .75, nt(p*.045).r)*(.6 + .8*nt(p*.33).a);
    float mrip = mA*(sin(phM) + .3*sin(2.*phM + .8));
    vec2 mrg = mA*(cos(phM) + .6*cos(2.*phM + .8))*7.85*mdir;
    // tracks (polish: the walkers are gone, what a crossing party leaves stays): prints pressed 1.5 cm into the sand, each
    // holding water, along one or two trails toward the shore; a party's trail is many feet and the guide's stick holes
    float prt = 0.; vec2 pgr = vec2(0.);
    if (fp < .14) for (int i = 0; i < int(uC[13].y); i++) {
      vec4 TT = texelFetch(uD, ivec2(4 + i, 0), 0);
      vec2 v = p - TT.xy; float al = dot(v, TT.zw), la = dot(v, vec2(-TT.w, TT.z)) - .5*sin(al*.06 + float(i)*2.) - .2*sin(al*.17);
      float party = uC[13].x, stp = party > .5 ? .34 : .68, k = floor(al/stp + .5), aL = al - k*stp;
      float hk = fract(sin(k*12.9898 + float(i)*78.233)*43758.545), hs = fract(hk*97.31);
      float side = party > .5 ? (hs - .5)*.9 : (mod(k, 2.) - .5)*.24;
      vec2 fq = vec2(aL + .03*(hk - .5), la - side)/vec2(.135, .052);
      float pr = exp(-pow(dot(fq, fq), 2.))*step(-60., al)*step(al, 160.)*step(.12, hk);
      vec2 sq = vec2(mod(al + .2, 1.36) - .68, la - .42);
      float stick = party > .5 && i == 0 ? exp(-dot(sq, sq)*1600.) : 0.;
      prt += (pr + stick*.8)*(1. - smoothstep(.06, .14, fp));
    }
    casts -= .016*prt;
    // taps: on water a pebble's rings run out; on bare sand a press, as of a foot, that pales the sand round it and fills
    float tdim = 0., tpale = 0.; vec2 tg = vec2(0.);
    for (int i = 0; i < int(uC[19].w); i++) {
      vec4 Tp = texelFetch(uD, ivec2(i, 0), 0);
      vec2 v = p - Tp.xy; float r = length(v) + 1e-4, ag = T - Tp.z;
      if (Tp.w > .5) {
        float R0 = .08 + .42*ag, w = .05 + .12*ag, x = (r - R0)/w;
        tg += v/r*.012*exp(-ag*.6)*exp(-x*x)*(cos(x*3.4)*3.4/w - 2.*x/w*sin(x*3.4))/(1. + r*1.5);
      } else {
        float e2 = exp(-ag*.5);
        tdim += .018*smoothstep(0., 1.2, ag)*exp(-r*r*55.);
        tpale += e2*smoothstep(.07, .2, r)*exp(-r*r*5.)*smoothstep(0., .3, ag)*(1. - smoothstep(1.2, 4., ag));
      }
    }
    casts -= tdim;
    float micro = rip + meso + casts + mrip;
    vec2 bgr = bgrad + rgr + mgr + cgr + mrg;
    vec3 nb = normalize(vec3(-bgr.x, 1., -bgr.y));
    float dry0 = 1. - smoothstep(0., .004, h);
    float d = h - micro - mix(.0015, mix(.0105, .0042, smoothstep(-80., -5., age)), dry0);
    // far off, a grid cell covers tens of pixels of width and one of height: break the waterline with sand relief at the
    // cell's own scale so it ends in lobes and tongues, not level bars (polish)
    float ffar = smoothstep(.04, .4, fp);
    d += ffar*(.007*(nt(p*.13 + 4.).r - .5) + .004*(nt(p*.47 + 1.).a - .5));
    // the sand: wet and glossy where the water has just been, drier and matte on crests and high bars
    float crest = smoothstep(.001, .006, rip + .4*meso + .5*mrip);
    float hiDry = smoothstep(.04, .2, bC + micro - L);
    float recent = age > 0. ? 1. : smoothstep(-50., -3., age);
    float wetS = clamp(.84 - .5*crest*sandy - .45*hiDry + .15*recent + .3*mud - .6*tpale, .08, 1.);
    vec3 alb = mix(uC[14].rgb, vec3(.1, .093, .083), wetS);
    alb = mix(alb, vec3(.07, .067, .063), mud*.7)*(.86 + .28*nt(p*3.7).a)*(1. - .35*min(prt, 1.));
    // dark heavy-mineral lag in the ripple troughs, paler crests, grain
    float gfade = 1. - smoothstep(.004, .02, fp);
    alb *= mix(1., mix(.72, 1.18, smoothstep(-.005, .004, rip)), sandy*fr);
    alb *= 1. + gfade*(.22*(nt(p*37.).r - .5) + .2*(nt(mat2(.8, .6, -.6, .8)*p*91.).a - .5));
    vec3 E = E0*(.65 + .35*nb.y) + E1*max(0., dot(nb, Ld))*1.6;
    sandC = alb*E;
    float gl = wetS*wetS*(.12 + .5*recent);
    vec3 ns = normalize(mix(nb, vec3(0., 1., 0.), .25*recent));
    Fs = (.02 + .98*pow(1. - max(dot(-rd, ns), 0.), 5.))*gl;
    float lodR = 3.5 - 2.*recent*wetS;
    float lodW = 0.;
    vec3 nw = ns; foamC = (E0*1.2 + E1*.7)*.6;
    if (d > -.003) {
      float W = length(uC[5].xy);
      vec2 wd = W > .01 ? uC[5].xy/W : vec2(.6, .8), wp = vec2(-wd.y, wd.x);
      vec2 q = vec2(dot(p, wd), dot(p, wp));
      float cp = smoothstep(.35, .75, nt(p*.045 - uC[5].xy*T*.045).a);
      float amp = uC[5].z + W*(.0018 + .0065*cp);
      vec4 a1 = nt(q*vec2(2.2, .8) - vec2(T*1.7, 0.)), a2 = nt(q*vec2(4.1, 1.6) + vec2(-T*2.4, 1.3)), a3 = nt(p*9.3 + T*.4);
      vec2 gq = (a1.gb - .5)*5.*vec2(2.2, .8) + (a2.gb - .5)*5.*vec2(4.1, 1.6)*.6;
      vec2 wg = (gq.x*wd + gq.y*wp)*amp/(1. + fp*5.) + tg;
      wg += (a3.gb - .5)*5.*9.3*.0006*(.4 + 3.*min(sp, 1.5))/(1. + fp*15.);
      float thin = 1. - smoothstep(.002, .015, d);
      // deep water leans on its wind ripples: the grid's surface slope is constant per cell and showed as squares (polish)
      vec2 sg = mix(mix(egrad, vec2(0.), smoothstep(.03, .15, d)) + wg, bgr, thin*.75);
      nw = normalize(vec3(-sg.x, 1., -sg.y));
      float cw = max(dot(-rd, nw), 0.);
      Fw = .02 + .98*pow(1. - cw, 5.) + min(length(tg)*.8, .3);
      lodW = clamp(log2(1. + amp*fp*250. + fp*2.), 0., 4.);
      float dd = max(d, 0.);
      vec3 Tr = exp(-dd*vec3(11., 9.5, 8.)/max(cw, .25));
      bed = mix(alb, vec3(.09, .085, .077), .6)*E*Tr + vec3(.05, .052, .046)*E0*(1. - Tr)*1.5;
      // foam carried by the flow (two-phase flow map) with lace from noise, and the bright lip of an advancing sheet
      float lace = nt(p*4.1 + vec2(T*.05, 0.)).r*.6 + nt(p*11.3 - vec2(0., T*.07)).a*.4;
      float fo = clamp(foam, 0., 1.);
      // the foam field lives on the grid (0.25 m cells at your feet): break its threshold up with noise so no cell shows
      float fbr = fo + .45*(nt(p*1.7 + 3.).r - .5) + .25*(lace - .5);
      // close up the foam is thin and broken (speckled, half transparent), not flat patches
      float lsp = .35 + .65*nt(p*23. + 2.).a;
      fa = mix(smoothstep(.6, .9, nt(p*7.9 + vec2(T*.03, 0.)).r*.6 + lace*.4)*lsp, .3, smoothstep(.05, .4, fp))*smoothstep(.2, .75, fbr)*.32;
      float gd = length(bgr) + .02;
      wm = smoothstep(0., max(.0006, fp*gd*.8) + .003*ffar, d);
      float front = clamp(fo*1.6 + smoothstep(.06, .3, sp)*.6, 0., 1.)*smoothstep(-4., 1., age)*smoothstep(12., 2., age);
      // a slow sheet creeping over sand has its lip too, where the sand was wetted in the last few seconds (polish 2)
      front = max(front, .6*smoothstep(-1., .5, age)*smoothstep(14., 3., age)*sandy);
      // a thin bright lip, not a band: a 2.5 mm depth band covered whole thin cells near your feet after a surge
      edge = smoothstep(-.0004, .0004, d)*(1. - smoothstep(0., max(.0009, fp*gd*1.4), d))*front*smoothstep(.25, .6, lace + .3*(fbr - fo));
      // the dense foam a tap churns up (foam above 1): a white mat, still torn by the lace, a bright rim where it is thick
      float xf = foam - 1.;
      if (xf > 0.) {
        float bub = nt(p*31. + 7.).a*.55 + nt(p*67. + 3.).r*.45;
        float xa = smoothstep(0., 1.2, xf), net = mix(smoothstep(.45, .75, bub*.6 + lace*.4 + .25*xa - .1), .45, smoothstep(.05, .4, fp));
        fa = max(fa, xa*(.15 + .55*net));
        edge = max(edge, xa*net*.3);
      }
    }
    vec3 rr = reflect(rd, normalize(mix(ns, nw, wm))); rr.y = max(abs(rr.y), .0004);
    fd = rr; flod = mix(lodR, lodW, wm); tW = t;
    mir = mix(Fs, Fw*(1. - fa), wm);
  }
  if (kd != 1) {
    vec3 F = farV(fd, flod, PIX);
    if (kd == 0) {
      col = F; sky = 1. - gCov;
    } else {
      vec3 rc = F;
      vec3 wc = mix(mix(bed, rc, Fw), foamC + rc*.08, fa*.85);
      col = mix(sandC + rc*Fs, wc, wm) + (foamC*1.2 + rc*.25)*edge*.8;
      col = mix(col, uC[10].rgb, 1. - exp(-tW*uC[9].w));
    }
  }
  o = vec4(col*.25, sky);
}`,yo=wt+`uniform vec4 uC[20]; uniform sampler2D uN; out vec4 o;
vec4 nt(vec2 p){ return textureLod(uN, p*.03125, 0.); }
float meadowZ(float x){ return uC[6].z + 5.*sin(x*.027 + 1.) + 2.5*sin(x*.071 + 2.); }
void main(){
  vec2 fc = gl_FragCoord.xy/uC[2].w;
  vec2 sc = (fc*2. - 1.)*uC[1].w;
  vec3 ro = uC[0].xyz;
  vec3 rd = normalize(uC[3].xyz + uC[1].xyz*sc.x + uC[2].xyz*sc.y);
  vec3 E0 = uC[8].rgb, E1 = uC[9].rgb;
  float tm = 1e7; vec3 mcol = vec3(0.);
  if (rd.z < -.05) {
    // (polish: one refinement step and fewer noise reads; it is never in the opening view)
    float tz = (uC[6].z - ro.z)/rd.z;
    tz = (meadowZ(ro.x + rd.x*tz) - ro.z)/rd.z;
    float xe = ro.x + rd.x*tz, ye = ro.y + rd.y*tz;
    vec4 nm = nt(vec2(xe*3.1, ye*9.));
    float mh = uC[6].w + .08*nm.r;
    if (tz > 0. && ye < mh && ye > .05) {
      tm = tz;
      float v = (ye - .05)/(mh - .05);
      mcol = mix(vec3(.06, .055, .05)*(.7 + .5*nm.a), vec3(.045, .055, .035), smoothstep(.82, .95, v))*(E0*1.3 + E1*.6*max(0., -dot(normalize(vec2(rd.x, rd.z)), normalize(uC[4].xz))));
    } else if (rd.y < 0. && ye >= mh) {
      float t2 = (ro.y - uC[6].w)/-rd.y;
      if (t2 > tz) {
        tm = t2;
        vec2 p = ro.xz + rd.xz*t2;
        vec4 ng = nt(p*.05);
        mcol = mix(vec3(.05, .06, .04)*(.75 + .5*ng.r), vec3(.06, .06, .055), smoothstep(.6, .8, ng.a)*.5)*(E0*1.2 + E1*.4);
      }
    }
  }
  if (tm > 1e6 || (rd.y < -2e-4 && tm >= (ro.y - .2)/-rd.y)) discard;
  o = vec4(mix(mcol, uC[10].rgb, 1. - exp(-tm*uC[9].w))*.25, 0.);
}`,go=wt+`uniform vec4 uF; uniform vec4 uC[20]; uniform sampler2D uR; out vec4 o;
float h21(vec2 p){ uvec2 v = uvec2(ivec2(floor(p)) + 65536); v = v*1664525u + 1013904223u; v.x += v.y*1664525u; v.y += v.x*1664525u; v ^= v >> 16u; v.x += v.y*1664525u; v.y += v.x*1664525u; v ^= v >> 16u; return float(v.x)*(1./4294967296.); }
void main(){
  vec2 uv = gl_FragCoord.xy/uF.w;
  vec4 R = textureLod(uR, uv, 0.);
  vec3 c = R.rgb*4.;
  // stars where the sky is open and dark enough (polish 2: moved here from the main program; the main picture marks open
  // sky in its alpha)
  if (R.a > .01 && uC[10].a > 0.) {
    vec2 sc = (uv*2. - 1.)*uC[1].w;
    vec3 rd = normalize(uC[3].xyz + uC[1].xyz*sc.x + uC[2].xyz*sc.y);
    if (rd.y > .02) {
      float ax = abs(rd.x), az = abs(rd.z), a = atan(min(ax, az)/max(max(ax, az), 1e-12));
      a = az > ax ? a : 1.5707963 - a; a = rd.z < 0. ? 3.14159265 - a : a; a = rd.x < 0. ? -a : a;
      vec2 s = vec2(a*length(rd.xz), asin(rd.y))*420.;
      vec2 ci = floor(s); float hh = h21(ci);
      if (hh > .965) {
        vec3 hr = fract(hh*vec3(1731.3, 2399.7, 3119.1));
        float dd = length(s - ci - .5 - .6*(hr.xy - .5));
        float lum = dot(c, vec3(.3, .5, .2));
        float tw = .75 + .25*sin(uC[0].w*(3. + 4.*hr.z) + hh*40.);
        c += vec3(.9, .92, 1.)*uC[10].a*pow((hh - .965)/.035, 3.)*exp(-dd*dd*6.)*tw*smoothstep(.06, .01, lum)*.8*R.a;
      }
    }
  }
  c *= uF.y;
  c = (c*(2.51*c + .03))/(c*(2.43*c + .59) + .14);
  vec2 q = uv - .5;
  c *= 1. - .09*dot(q, q);
  c = pow(clamp(c, 0., 1.), vec3(1./2.2));
  uint n = uint(gl_FragCoord.x)*1973u + uint(gl_FragCoord.y)*9277u + 571u*26699u;
  n = (n << 13u) ^ n; n = n*(n*n*15731u + 789221u) + 1376312589u;
  c += (float(n & 0x7fffffffu)/2147483647. - .5)*.007;
  o = vec4(c, 1.);
}`,Ke={uN:0,uS:1,uG:2,uSky:3,uI:4,uP:5,uCl:6,uD:7,uQ:7,uCh:1,uR:3},bo=(t,o)=>{const a=(l,c,u)=>{if(l.indexOf(c)<0)throw new Error("571 NU "+t+" "+c);return l.split(c).join(u)},s=(l,c)=>a(l,"void main(){",`void main0();
void main(){main0();`+c+`}
void main0(){`),r=l=>s(a(l,"out vec4 o;","out uvec4 oU; vec4 o;"),"oU=floatBitsToUint(o);"),n=(l,c)=>(l=a(a(a(l,"uniform sampler2D uS;","uniform highp usampler2D uS;"),"uniform sampler2D uG;","uniform highp usampler2D uG;"),"out vec4 o;",`out vec4 o;
vec4 fT(highp usampler2D u_, ivec2 q, int l){ return uintBitsToFloat(texelFetch(u_, q, l)); }
`).split("texelFetch(uS, ").join("fT(uS, ").split("texelFetch(uG, ").join("fT(uG, "),c?a(a(l,"uniform sampler2D uQ;","uniform highp usampler2D uQ;"),"texelFetch(uQ, ","fT(uQ, "):l);return t==="flux"||t==="depth"?r(n(o,!0)):t==="main"?a(a(a(a(n(o,!1),"vec4 bv(sampler2D t,","vec4 bv(highp usampler2D t,"),"vec4 bg(sampler2D t,","vec4 bg(highp usampler2D t,"),"texelFetch(t, ","fT(t, "),"textureLod(uSky, ","4.*textureLod(uSky, "):t==="bake"?a(o,"o = vec4(skyF(vec3(sin(az)*ce, y, cos(az)*ce)), 1.);","o = vec4(skyF(vec3(sin(az)*ce, y, cos(az)*ce))*.25, 1.);"):t==="bakeU"?r(o):o},v=e.__c571||(e.__c571=(()=>{const t=(p,b)=>{const E=e.createShader(b);return e.shaderSource(E,p),e.compileShader(E),E},o=!!e.getExtension("EXT_color_buffer_float"),a=!o&&!!e.getExtension("EXT_color_buffer_half_float"),s=!o&&!a,r=s?bo:(p,b)=>b,n=t(mo,e.VERTEX_SHADER),l={};for(const[p,b,E]of[["bake",n,Ue],["flux",n,xo],["depth",n,vo],["main",n,wo],["fin",n,go],["back",n,yo]].concat(s?[["bakeU",n,Ue]]:[])){const F=e.createProgram(),mt=t(r(p,E),e.FRAGMENT_SHADER);e.attachShader(F,b),e.attachShader(F,mt),e.linkProgram(F),l[p]={p:F,f:mt,v:b}}e.flush();const c=512,u=new Float32Array(c*c*3),m=new Uint8Array(c*c*4);let w=1461457109;const y=()=>{w=w+1831565813|0;let p=Math.imul(w^w>>>15,1|w);return p=p+Math.imul(p^p>>>7,61|p)^p,((p^p>>>14)>>>0)/4294967296},d=(p,b,E,F,mt)=>{const X=Math.floor(E-2.5*F),Ut=Math.ceil(E+2.5*F),et=(Math.round(b)%c+c)%c,se=1/(F*F);for(let Tt=X;Tt<=Ut;Tt++){const Kt=Tt-E,Ge=mt*Math.exp(-Kt*Kt*se);u[((Tt%c+c)%c*c+et)*3+p]+=Ge}};for(let p=0;p<64;p++){const b=y()*c,E=y()*c,F=(y()-.5)*.0016,mt=4+Math.floor(y()*12);for(let X=0;X<mt;X++){const Ut=E+(y()-.5)*140,et=b+(y()-.5)*30,se=40+y()*200,Tt=F+(y()-.5)*6e-4,Kt=.8+y()*1.4,Ge=.35+.5*y(),No=1+Math.floor(y()*3),Bo=[0,(y()-.5)*3,(y()-.5)*4];for(let K=-8;K<se;K++){const re=Math.max(K,0)/se,Ho=K<0?.5*K*K*.06:0,qo=et+Tt*K*K-Ho,Uo=K<0?Kt*1.5:Kt*(1-.55*re),Ko=(K<0?1.4:(1-re)*(1-re)*(.7+.3*Math.sin(K*.05+X)))*Ge;for(let Ot=0;Ot<No;Ot++)d(0,Ut+K,qo+Bo[Ot]*re,Uo*(Ot?.6:1),Ko*(Ot?.5:1))}}}for(let p=0;p<64;p++){const b=p*c/64+(y()-.5)*2,E=y()*6.3;for(let F=0;F<c;F+=5+y()*4){const mt=b+3*Math.sin(F*.012+E),X=1.2+1.5*y(),Ut=.5+.5*y();for(let et=-Math.ceil(X*1.8);et<=X*1.8;et++)d(1,F+et,mt+(y()-.5)*.6,X*.75,Ut*Math.exp(-et*et/(X*X*2.2)))}}for(let p=0;p<c*c;p++){const b=p%c,E=p/c|0,F=.5+.22*Math.sin(b*.0491+2*Math.sin(E*.0368))*Math.sin(E*.0614+1.3*Math.sin(b*.0245))+.12*Math.sin(b*.159+E*.083)*Math.sin(E*.137-b*.061);m[p*4]=Math.min(255,u[p*3]*190),m[p*4+1]=Math.min(255,Math.pow(Math.min(u[p*3+1],1.4)/1.4,.8)*255),m[p*4+2]=Math.max(0,Math.min(255,F*255)),m[p*4+3]=255}return{P:l,hf:o,cb:m,hh:a,u32:s,fresh:!0,slots:{big:[],small:[]},rts:{},n:0,MT:e.getParameter(e.MAX_TEXTURE_SIZE)|0}})()),N=(t,o,a,s,r,n,l,c)=>{const u=e.createTexture();return e.bindTexture(e.TEXTURE_2D,u),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,s,r,c||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n===e.LINEAR_MIPMAP_LINEAR?e.LINEAR:n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,l),u},ft=t=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o},A=(t,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,o)},It=()=>{e.bindVertexArray(v.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0)},Pt=new Float32Array(16*4*4);Lt.forEach((t,o)=>{Pt.set([t.ox,t.oz,t.ang,t.L],o*4),Pt.set([t.w0,t.w1,t.D0,t.D1],64+o*4),Pt.set([t.A1,t.k1,t.p1,t.A2],128+o*4),Pt.set([t.k2,t.p2,0,0],192+o*4)});const j={Oystercatchers:{k:0,n:[16,12],s:.42,fr:6,call:[92,96]},Gulls:{k:1,n:[7,5],s:.62,fr:3,call:[74,79]},Curlews:{k:3,n:[6,4],s:.5,fr:4,call:[80,86]},"Great flock":{k:4,n:[70],s:.2,fr:10,call:[98,101]}}[to],Nt=[],Rt=(t,o,a,s,r,n)=>{let l=null,c=-9;for(let u=0;u<30;u++){const m=t+(o-t)*i(),w=a+(s-a)*i(),y=Math.sin(m)*w,d=Math.cos(m)*w,p=y*R[0]+d*R[1],b=vt(y,d)-(r+_t*p)+(n||0)-.055;-Math.abs(b)>c&&(c=-Math.abs(b),l=[y,d])}return l||[Math.sin(t)*a,Math.cos(t)*a]};j.n.forEach((t,o)=>{const a=o===0?Rt(.05,.42,22,45,H):Rt(-.45,-.1,35,80,H),s={x:a[0],z:a[1],st:"rest",t:0,cx:0,cy:0,cz:0,vx:0,vz:0,tx:0,tz:0,birds:[],lift:0,hb:0,fi:o};s.m=.0018*(9+12*i()+o*8);for(let r=0;r<t;r++){const n=i()*G,l=Math.sqrt(i())*(j.k===4?4:3.2);s.birds.push({ox:Math.cos(n)*l,oz:Math.sin(n)*l*.6,x:0,y:0,z:0,vx:0,vy:0,vz:0,ph:i()*G,hd:i()<.5?-1:1,dl:i()*.8,peck:i()*10,fx:(i()-.5)*2,fy:i()-.5,fz:(i()-.5)*2,s:j.s*(.9+.2*i())})}Nt.push(s)});const zo=[];({"Guided line":[[-50,118,10]],"Two groups":[[-48,112,6],[-110,80,5]],"Lone walker":[[-30,90,1]],None:[]})[Ct].forEach(([t,o,a],s)=>{const r=-120-s*30,n=-150,l=Math.hypot(r-t,n-o),c=[(r-t)/l,(n-o)/l];let u=0;for(let m=0;m<a;m++){const w=m>0&&i()<.3;w&&(u-=.6+i()),zo.push({x0:t,z0:o,dir:c,off:u,lat:w?i()<.5?-.7:.7:(i()-.5)*.5,ph:i()*G,sp:.9,kind:m===0&&a>2?1:0,pack:i()<.6?1:0,sc:.86+.18*i()-(i()<.12?.14:0)}),u+=1.3+2.4*i()+(i()<.25?3+4*i():0)}});const Mo=[],Eo=9+Math.floor(i()*6);for(let t=0;t<Eo;t++){const o=(i()-.5)*150+(t<5?20:0),a=io(o)-6-70*Math.pow(i(),1.4);Mo.push({x:o,z:a,hd:i()*G,gr:i()<.7?1:0,t:i()*10})}const jt=[];if(Ct!=="None"){const t=2.6+2*I(),o=[.3+.12*I(),1],a=Math.hypot(o[0],o[1]);jt.push([t,9,o[0]/a,o[1]/a])}if(Ct==="Two groups"){const t=[-.12-.2*I(),1],o=Math.hypot(t[0],t[1]);jt.push([-3.5-3*I(),14,t[0]/o,t[1]/o])}const Oe=z?.6435:I()*G,Ro=z?.2:.2*I(),ht=[];let yt=Math.atan2(W[0],W[2])-k.az;yt=yt>rt?yt-G:yt<-rt?yt+G:yt;const ve=2.22,Ao=B==="Afterglow"||B==="Red dusk"?.6:1,C=new Float32Array(64);if(C.set([R[0],R[1],Vt,zt[0]],0),C.set([zt[1],de,Pe,Lt.length],4),C.set([.13,pe,i()*300,i()*300],8),C.set([k.D,k.RH,k.RW,k.style],12),C.set([k.az,.13*k.k,0,Math.floor(i()*900)],16),C.set([ho?1:0,.075,3300,36],20),C.set([W[0],W[1],W[2],h.yel],24),C.set([...h.zen,h.cc],28),C.set([...h.hz,h.ct],32),C.set([...h.glow,1],36),C.set([...h.shd,z?.034:0],40),C.set([...h.belt,0],44),C.set([Math.floor(i()*900),.5+.4*(B==="Blue hour"||B==="Moonrise"?1:.4),ve,4],48),C.set([...h.cl,0],52),C.set([...h.cd,0],56),v.fresh){v.fresh=!1;for(const o in v.P){const a=v.P[o];if(!e.getProgramParameter(a.p,e.LINK_STATUS))throw new Error("571 "+o+": "+e.getShaderInfoLog(a.f)+e.getShaderInfoLog(a.v)+e.getProgramInfoLog(a.p));const s={p:a.p},r=e.getProgramParameter(a.p,e.ACTIVE_UNIFORMS);for(let n=0;n<r;n++){const l=e.getActiveUniform(a.p,n).name.replace("[0]","");s[l]=e.getUniformLocation(a.p,l)}e.useProgram(a.p);for(const n in Ke)s[n]&&e.uniform1i(s[n],Ke[n]);v.P[o]=s}v.vao=e.createVertexArray(),v.tN=N(256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT),v.fN=ft(v.tN),v.tCl=N(512,512,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT,v.cb),e.generateMipmap(e.TEXTURE_2D),v.cb=null;for(let o=0;o<8;o++)A(o,null);It();const t=v.P.bake;e.useProgram(t.p),e.uniform4f(t.uB,0,256,256,0),e.bindFramebuffer(e.FRAMEBUFFER,v.fN),e.viewport(0,0,256,256),e.drawArrays(e.TRIANGLES,0,3)}const Yt=v.hf,Zt=v.hh,Z=v.u32,Jt=Yt||Zt||Z,J=ot>450,We=J?"big":"small",At=v.slots[We],we=g.hash+We;let f=null,ye=!1;const D=320,Xe=()=>{const t=v.n;if(f=At.find(o=>o.key===we),ye=!1,!f){const o=At.length<(J?2:9)?null:At.find(a=>t-a.use>64);o?f=o:At.length<(J?4:16)?(f={},At.push(f)):f=At.reduce((a,s)=>s.use<a.use?s:a),f.key!==void 0&&(f.rb=null),ye=!0,f.key=we}if(f.use=t,!f.tG){const o=Yt?e.RGBA32F:Zt?e.RGBA16F:e.RGBA32UI,a=Yt?e.FLOAT:Zt?e.HALF_FLOAT:e.UNSIGNED_INT,s=Z?e.RGBA_INTEGER:e.RGBA;f.tG=N(D,D,o,s,a,e.NEAREST,e.CLAMP_TO_EDGE),f.fG=ft(f.tG),f.S=[0,1].map(()=>{const w=N(D,D,o,s,a,e.NEAREST,e.CLAMP_TO_EDGE);return{t:w,f:ft(w)}}),f.Q=[0,1].map(()=>{const w=Yt?N(D,D,e.RG32F,e.RG,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE):Zt?N(D,D,e.RG16F,e.RG,e.HALF_FLOAT,e.NEAREST,e.CLAMP_TO_EDGE):N(D,D,e.RG32UI,e.RG_INTEGER,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE);return{t:w,f:ft(w)}});const r=J?1024:256,n=J?256:64;f.sky={t:Z?N(r,n,e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE):N(r,n,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE),w:r,h:n},e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),f.sky.f=ft(f.sky.t);const l=J?1024:256,c=J?512:128;f.isl={t:N(l,c,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.CLAMP_TO_EDGE),w:l,h:c},f.isl.f=ft(f.isl.t);const u=J?4096>v.MT?v.MT:4096:1024,m=J?128:32;f.pan={t:N(u,m,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.CLAMP_TO_EDGE),w:u,h:m},e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),f.pan.f=ft(f.pan.t),f.tCh=N(16,4,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE),f.tD=N(8,1,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE)}if(ye){It(),A(1,f.tCh),e.texSubImage2D(e.TEXTURE_2D,0,0,0,16,4,e.RGBA,e.FLOAT,Pt);const o=Z?v.P.bakeU:v.P.bake;e.useProgram(o.p),e.uniform4fv(o.uK,C),A(0,v.tN),A(1,f.tCh),((n,l)=>{e.bindFramebuffer(e.FRAMEBUFFER,l.f),e.viewport(0,0,l.w,l.h),e.uniform4f(o.uB,n,l.w,l.h,0),e.drawArrays(e.TRIANGLES,0,3)})(1,{f:f.fG,w:D,h:D}),Jt&&(f.rb=f.rb||new Float32Array(Y*Y*4),Z?e.readPixels(Et,Et,Y,Y,e.RGBA_INTEGER,e.UNSIGNED_INT,new Uint32Array(f.rb.buffer)):e.readPixels(Et,Et,Y,Y,e.RGBA,e.FLOAT,f.rb));const s=Z?v.P.bake:o;Z&&(e.useProgram(s.p),e.uniform4fv(s.uK,C));const r=(n,l)=>{e.bindFramebuffer(e.FRAMEBUFFER,l.f),e.viewport(0,0,l.w,l.h),e.uniform4f(s.uB,n,l.w,l.h,0),e.drawArrays(e.TRIANGLES,0,3)};r(2,f.isl),r(3,f.pan),r(4,f.sky),A(4,f.isl.t),e.generateMipmap(e.TEXTURE_2D),A(5,f.pan.t),e.generateMipmap(e.TEXTURE_2D)}};Xe();let $t=v.rts[ot];const ut=ot;ct=Jt?f.rb:null;const ge=t=>{t.hb=vt(t.x,t.z);for(const o of t.birds)o.gy=vt(t.x+o.ox,t.z+o.oz)};if(ct&&!z){const t=[],o=V==="From a rock",a=Math.cos(P.yaw),s=Math.sin(P.yaw);for(let n=2;n<=14;n+=.5)for(let l=-5;l<=5;l+=.5){const c=o?l*12:l,u=o?20+n*9:n;t.push(vt(c*a+u*s,u*a-c*s))}t.sort((n,l)=>n-l);const r={"First tongues":[.1,.004],"Half flooded":[.4,.025],"Islands shrinking":[.78,.03],"Full mirror":[1,.05]}[St];(_.lead||o)&&St!=="Full mirror"&&(r[0]=Math.min(r[0],.3),r[1]=Math.min(r[1],.004)),V==="Along the tide front"&&(r[0]=.5,r[1]=0),H=t[Math.min(t.length-1,Math.floor(t.length*r[0]))]+r[1],Nt.forEach(n=>{const l=n.fi===0?Rt(.05,.42,22,45,H):Rt(-.45,-.1,35,80,H);n.x=l[0],n.z=l[1]})}{const t=j.k===4?3:5;for(let o=0;o<t;o++){const a=-.9+o*1.25+i()*.5,s=110+i()*220,r=Rt(a,a+.35,s,s+60,H,.02),n={x:r[0],z:r[1],st:"rest",t:0,cx:0,cy:0,cz:0,vx:0,vz:0,tx:0,tz:0,birds:[],lift:0,hb:0,fi:2+o,far:1};n.m=.01+.03*i();const l=14+Math.floor(i()*26),c=3+i()*6;for(let u=0;u<l;u++){const m=i()*G,w=Math.sqrt(i())*c;n.birds.push({ox:Math.cos(m)*w*1.6,oz:Math.sin(m)*w*.7,x:0,y:0,z:0,vx:0,vy:0,vz:0,ph:i()*G,hd:i()<.5?-1:1,dl:i()*.8,peck:i()*10,fx:(i()-.5)*2,fy:i()-.5,fz:(i()-.5)*2,s:j.s*(.9+.2*i())})}Nt.push(n)}}for(const t of Nt)ge(t),t.lift=t.hb-(H+_t*(t.x*R[0]+t.z*R[1]))-t.m;if(!$t){const t=Z?N(ut,ut,e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE):N(ut,ut,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE);$t=v.rts[ot]={t,f:ft(t)}}let $=0,L=0,q=H,U=0,Qe=.06;const ko=new Uint32Array(4),dt=1/30,kt=new Float32Array(16),T={gx:-1e4,gz:-1e4,R:1,t0:-99,dur:0,acc:0,mass:0,dx:0,dz:0},S={x:0,z:0,tx:0,tz:0},te={Still:.3,"Light air":2.2,Gusty:4.5}[ne],ee=i()*G;S.x=S.tx=Math.sin(ee)*te,S.z=S.tz=Math.cos(ee)*te;const be=t=>D/2+28*Math.asinh(t/7),To=t=>7/28*Math.cosh((be(t)-D/2)/28),Fo=t=>{It();const o=L-T.t0<T.dur;e.viewport(0,0,D,D),A(2,f.tG);const a=v.P.flux;e.useProgram(a.p),kt.set([t,.025*.025,S.x,S.z,T.gx,T.gz,o?T.acc:0,T.R,T.dx,T.dz,0,0],0),e.uniform4fv(a.uF,kt),A(1,f.S[$].t),A(7,f.Q[$].t),e.bindFramebuffer(e.FRAMEBUFFER,f.Q[1-$].f),e.drawArrays(e.TRIANGLES,0,3)},gt=(t,o,a)=>{if(!Jt||(!o&&a!==2&&Fo(t),a===1))return;It();const s=L-T.t0<T.dur,r=f.S[$],n=f.S[1-$],l=f.Q[1-$];e.viewport(0,0,D,D),A(2,f.tG);const c=v.P.depth;e.useProgram(c.p),kt.set([t,Qe,q,_t,T.gx,T.gz,s?T.mass:0,T.R,R[0],R[1],o?1:0,1/3],0);const u=L-T.t0,m=T.mass/.12;if(kt[12]=s?3.5*m:0,kt[13]=u<2?m*(1-u/2):0,e.uniform4fv(c.uF,kt),A(1,r.t),A(7,l.t),e.bindFramebuffer(e.FRAMEBUFFER,n.f),e.drawArrays(e.TRIANGLES,0,3),o)for(const w of f.Q)e.bindFramebuffer(e.FRAMEBUFFER,w.f),Z?e.clearBufferuiv(e.COLOR,0,ko):(e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT));$=1-$},Go=(t,o,a,s,r)=>{const n=[be(t),be(o)],l=To(Math.hypot(t,o)*.7);Object.assign(T,{gx:n[0],gz:n[1],R:O(2.6/l,1.2,9),t0:L,dur:.5*r,acc:2.5*r,mass:.12*r,dx:a,dz:s})};let ze=.4;const Ve=Lt[0],Co={yaw:0,pitch:0,x:0,y:0,z:0},Do=P.yaw,So=P.pitch,Me=Math.tan(31*rt/180),x={ro:[0,He,0],f:[0,0,1],r:[1,0,0],u:[0,1,0]},_o=()=>{const t=g.view||Co,o=Do+(t.yaw||0),a=O(So+(t.pitch||0),-1.35,1.35),s=O(t.x||0,-4,4),r=O(t.y||0,-.6,.8),n=O(t.z||0,-4,4);x.ro=[s,He+r,n],x.f=[Math.sin(o)*Math.cos(a),Math.sin(a),Math.cos(o)*Math.cos(a)],x.r=[Math.cos(o),0,-Math.sin(o)],x.u=[x.f[1]*x.r[2]-x.f[2]*x.r[1],x.f[2]*x.r[0]-x.f[0]*x.r[2],x.f[0]*x.r[1]-x.f[1]*x.r[0]]},je=(t,o)=>{const a=(t*2-1)*Me,s=(1-o*2)*Me,r=[0,1,2].map(l=>x.f[l]+x.r[l]*a+x.u[l]*s),n=Math.hypot(r[0],r[1],r[2]);return r.map(l=>l/n)},Bt=[];let Ee=9+i()*10,Re=0,Vo=20+i()*20;const Ht=(t,o)=>q+_t*(t*R[0]+o*R[1]),Lo=(t,o)=>{if(t.st!=="rest")return;t.st="fly",t.t=0,t.cx=t.x,t.cy=.4,t.cz=t.z;let a=null;if(!o)for(let r=0;r<10&&!a;r++){const n=Math.atan2(t.x,t.z)+(i()-.5)*.9,l=Math.hypot(t.x,t.z)*(.45+.4*i())+6,c=Math.sin(n)*l-R[0]*25,u=Math.cos(n)*l-R[1]*25;vt(c,u)>Ht(c,u)+.07&&Math.hypot(c,u)>9&&(a=[c,u])}if(a)t.away=0;else{const r=rt+(i()-.5)*1.6;a=[Math.sin(r)*260,Math.cos(r)*260],t.away=1}t.tx=a[0],t.tz=a[1];const s=Math.hypot(t.tx-t.x,t.tz-t.z);t.vx=(t.tx-t.x)/s*7,t.vz=(t.tz-t.z)/s*7;for(const r of t.birds)r.dl=i()*.7;for(let r=0;r<4+Math.floor(i()*4);r++)Bt.push({t:L+r*.11+i()*.08,m:j.call[0]+Math.floor(i()*(j.call[1]-j.call[0])),v:.03})},Ye=t=>{for(const o of Nt)if(o.st==="rest"){const a=o.hb;(Ht(o.x,o.z)>a-o.lift||U>.3&&Ht(o.x,o.z)>a-.12)&&Lo(o,U>.3);for(const s of o.birds)s.peck-=t,s.peck<0&&(s.peck=.4+i()*2.5,s.ph=i()*30,i()<.3&&(s.ox+=(i()-.5)*.4,s.hd=i()<.5?-1:1)),s.x=o.x+s.ox,s.z=o.z+s.oz,s.y=s.gy+s.s*.33,s.vx=s.vy=s.vz=0,s.fly=0}else if(o.st==="fly"){o.t+=t;const a=o.tx-o.cx,s=o.tz-o.cz,r=Math.hypot(a,s),n=7.5,l=r>1?[a/r*n,s/r*n]:[0,0],c=Math.sin(o.t*.7)*.6;o.vx+=(l[0]+l[1]*c*.4-o.vx)*Math.min(1,t*.9),o.vz+=(l[1]-l[0]*c*.4-o.vz)*Math.min(1,t*.9),o.cx+=o.vx*t,o.cz+=o.vz*t;const u=r>25?3.5+2*Math.sin(o.t*.5):.3+r*.12;o.cy+=(u-o.cy)*Math.min(1,t*1.2);const m=Math.hypot(o.vx,o.vz)||1,w=o.vx/m,y=o.vz/m;for(const d of o.birds){if(o.t<d.dl)continue;d.fly=1;const p=o.cx+d.fx*2.2*y+d.fz*2.2*w,b=o.cy+d.fy*1.4,E=o.cz-d.fx*2.2*w+d.fz*2.2*y;d.vx+=((p-d.x)*3-d.vx*1.6+o.vx*1.6)*t,d.vy+=((b-d.y)*3-d.vy*1.6)*t,d.vz+=((E-d.z)*3-d.vz*1.6+o.vz*1.6)*t,d.x+=d.vx*t,d.y+=d.vy*t,d.z+=d.vz*t,j.k===1&&Math.sin(L*.6+d.fx*5)>.3||(d.ph+=t*G*j.fr*(.9+.2*d.fy))}if(r<3&&o.cy<1)if(o.away)o.st="gone",o.t=0;else{o.st="rest",o.x=o.tx,o.z=o.tz;for(const d of o.birds)d.dl=0;o.lift=.015+.03*i(),ge(o)}}else if(o.st==="gone"&&(o.t+=t,o.t>25&&U<.1)){const a=Rt(-.5,.5,25,90,q);vt(a[0],a[1])>Ht(a[0],a[1])+.04?(o.x=a[0],o.z=a[1],o.st="rest",ge(o)):o.t=0}};let Ae=0,qt=0,ke=0,Te=0,Ze=!1,tt=!1,Fe=0;const Io=t=>{const o=g.input;if(o.down){if(Ze||(Ae=0,qt=0,ke=o.x,Te=o.y,tt=!1),Ae+=t,qt=Math.max(qt,Math.hypot(o.x-ke,o.y-Te)),qt>.05&&tt!=="hold"){tt="drag";const a=o.x-ke,s=o.y-Te,r=Math.min(11,Math.hypot(a,s)*26),n=x.r[0]*a-x.f[0]*s,l=x.r[2]*a-x.f[2]*s,c=Math.hypot(n,l)||1;S.tx=n/c*r,S.tz=l/c*r,Fe=6}!tt&&Ae>.4&&qt<.04&&(tt="hold",g.sound.hit("noise",.05,{dur:3,cutoff:600}))}else tt=!1;Ze=o.down,U+=((tt==="hold"?1:0)-U)*Math.min(1,t*(tt==="hold"?1.5:.25));for(const a of o.taps()){if(tt)continue;const s=je(a.x,a.y);if(s[1]>-.004)continue;const r=(x.ro[1]-q)/-s[1],n=x.ro[0]+s[0]*r,l=x.ro[2]+s[2]*r;if(Math.hypot(n,l)>60)continue;const c=vt(n,l)<Ht(n,l)+.002;ht.length>=4&&ht.shift(),ht.push([n,l,L,c?1:0]),c?(g.sound.note(84+Math.floor(i()*5),{dur:.12,vel:.05,wave:"sine"}),g.sound.hit("click",.05)):g.sound.hit("noise",.03,{dur:.25,cutoff:1400})}},Po=t=>{L+=t;const o=fo(L)*(1-U)+(H+.525)*U,a=o>q?U>.05?.06*U+.003:.004:.005;if(q+=O(o-q,-a*t,a*t),Qe=.06+.4*U,Fe-=t,Fe<0){const s=ne==="Gusty"?1+.6*Math.sin(L*.37)*Math.sin(L*.13):1;S.tx=Math.sin(ee)*te*s,S.tz=Math.cos(ee)*te*s}if(S.x+=(S.tx-S.x)*Math.min(1,t*1.2),S.z+=(S.tz-S.z)*Math.min(1,t*1.2),Wt==="Tidal bore"&&(ze-=t,ze<0)){ze=1e9;const s=830,r=Mt(Ve,s),n=Mt(Ve,s+2),l=Math.hypot(n[0]-r[0],n[1]-r[1]);Go(r[0],r[1],(n[0]-r[0])/l,(n[1]-r[1])/l,1.6),g.sound.hit("noise",.06,{dur:4,cutoff:380})}for(Ye(t);ht.length&&L-ht[0][2]>7;)ht.shift();for(let s=Bt.length-1;s>=0;s--)if(Bt[s].t<=L){const r=Bt[s];g.sound.note(r.m,{dur:.07,vel:r.v,wave:"triangle"}),Bt.splice(s,1)}Ee-=t,Ee<0&&(Ee=40+i()*25,g.sound.note(55,{dur:4,vel:.025,wave:"sine"}),g.sound.note(67,{dur:3,vel:.012,wave:"sine"})),Re-=t,Re<0&&(Re=1.4+i(),g.sound.hit("noise",.012+.04*U,{dur:2,cutoff:900+600*U}))},M=new Float32Array(20*4),Je=new Float32Array(4),oe=new Float32Array(32),$e=()=>{_o(),M.set([x.ro[0],x.ro[1],x.ro[2],L],0),M.set([x.r[0],x.r[1],x.r[2],Me],4),M.set([x.u[0],x.u[1],x.u[2],ut],8),M.set([x.f[0],x.f[1],x.f[2],q],12),M.set([W[0],W[1],W[2],O(uo+.35*U,0,1)],16),M.set([S.x,S.z,.0015,_t],20),M.set([R[0],R[1],de,Pe],24),M.set([k.az,.13*k.k,k.D,po],28),M.set([...h.E0,Vt],32),M.set([...h.E1,12e-5*(1+5*fe)],36),M.set([...h.haze,h.st],40),Q==="Sun still up"?(M.set([W[0],W[1],W[2],1],44),M.set([9,2.6,.55,ve],48)):(M.set([ue[0],ue[1],ue[2],B==="Moonrise"?1:0],44),M.set([3.3,2.5,1.5,ve],48)),M.set([Ct==="Guided line"?1:0,jt.length,Ao,fe],52),M.set([.38,.345,.29,yt],56),M.set([5.5*1,2.6,.9,1.4],60),M.set([2,ce[0],ce[1],ce[2]],64),M.set([...h.cl,h.ct-Ro],68),M.set([...h.cd,h.cc],72),M.set([C[48]+100,Math.cos(Oe),Math.sin(Oe),ht.length],76),oe.fill(0),ht.forEach((s,r)=>oe.set(s,r*4)),jt.forEach((s,r)=>oe.set(s,16+r*4)),It(),A(0,v.tN),A(1,f.S[$].t),A(2,f.tG),A(3,f.sky.t),A(4,f.isl.t),A(5,f.pan.t),A(6,v.tCl),A(7,f.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,8,1,e.RGBA,e.FLOAT,oe);const t=v.P.main;e.useProgram(t.p),e.uniform4fv(t.uC,M),e.bindFramebuffer(e.FRAMEBUFFER,$t.f),e.viewport(0,0,ut,ut),e.drawArrays(e.TRIANGLES,0,3);let o=1;for(const s of[[0,0],[1,0],[0,1],[1,1]])o=Math.min(o,je(s[0],s[1])[2]);if(o<-.03){const s=v.P.back;e.useProgram(s.p),e.uniform4fv(s.uC,M),e.drawArrays(e.TRIANGLES,0,3)}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,ot,ot);const a=v.P.fin;e.useProgram(a.p),A(3,$t.t),Je.set([ut/ot,h.ex,L,ot]),e.uniform4fv(a.uF,Je),e.uniform4fv(a.uC,M),e.drawArrays(e.TRIANGLES,0,3)};gt(dt,!0);for(let t=0;t<90;t++)q=H-.004+t*45e-6,gt(dt,!1);q=H;let pt=0,ae=0;return Ye(.01),$e(),(t,o)=>{if(o=Math.min(o||0,.12),f.key!==we){Xe(),ct=Jt?f.rb:null;const n=q;gt(dt,!0);for(let l=0;l<90;l++)q=H-.004+l*45e-6,gt(dt,!1);q=n,ae=0}f.use=++v.n,Io(o),Po(o),pt+=o;const a=2*dt,s=U>.01||L-T.t0<T.dur+2.5||q>H+.1;ae&&(gt(a,!1,2),ae=0,pt-=a);let r=0;if(s||pt>=2*a)for(;pt>=dt&&r<5;)gt(dt,!1),pt-=dt,r++;else pt>=a&&(gt(a,!1,1),ae=1);(r===5||pt>.5)&&(pt=0),$e()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
