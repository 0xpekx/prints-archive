// Seed Board: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/266.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(mo){mo&&(()=>{const oa=h=>Math.max(16,Math.ceil(h/4)),aa=h=>h>=512?Math.max(h,1024):h,It=(h,t,E)=>{const S=oa(E),b=aa(E);t.sz=E,t.q=S,t.uw=b,h.bindTexture(h.TEXTURE_2D,t.m.t),h.texImage2D(h.TEXTURE_2D,0,h.RGBA8,E,E,0,h.RGBA,h.UNSIGNED_BYTE,null),h.bindTexture(h.TEXTURE_2D,t.a.t),h.texImage2D(h.TEXTURE_2D,0,h.RGBA8,S,S,0,h.RGBA,h.UNSIGNED_BYTE,null),h.bindTexture(h.TEXTURE_2D,t.b.t),h.texImage2D(h.TEXTURE_2D,0,h.RGBA8,S,S,0,h.RGBA,h.UNSIGNED_BYTE,null),h.bindTexture(h.TEXTURE_2D,t.u.t),h.texImage2D(h.TEXTURE_2D,0,h.RGBA16UI,b,b,0,h.RGBA_INTEGER,h.UNSIGNED_SHORT,null),h.bindTexture(h.TEXTURE_2D,null),h.bindRenderbuffer(h.RENDERBUFFER,t.rb),h.renderbufferStorage(h.RENDERBUFFER,h.DEPTH_COMPONENT24,E,E),h.bindRenderbuffer(h.RENDERBUFFER,null)},sa=h=>{const t=h.tg,E=h.gl;if(t.users.delete(h),t.dead||E.isContextLost())return;let S=0;for(const b of t.users)b.S>S&&(S=b.S);if(S)S<t.sz&&It(E,t,S);else{t.dead=!0;const b=E.__c266;b&&b.tg===t&&(b.tg=null);for(const ce of[t.m,t.a,t.b,t.u])E.deleteFramebuffer(ce.f),E.deleteTexture(ce.t);E.deleteRenderbuffer(t.rb)}},xo=typeof FinalizationRegistry=="function"?new FinalizationRegistry(sa):null,pt=new Float32Array(1),na=new Int32Array(pt.buffer),bo=(h,t)=>(pt[0]=(h-.5)/t,pt[0]*t<h-.5&&na[0]++,pt[0]);mo.add({num:266,name:"Seed Board",fam:"Worlds",recipe:"A game of oware played by the real rules, mostly on a hand-carved board in the sun, sometimes in cups scooped in earth. Every seed actually drops, clacks and settles. The seeds, the board and the opponent change every mint. Tap one of the six cups on your near row to sow it and the board plays back, or leave it alone and it plays both sides.",interactive:"Tap one of the six cups on your near row to sow it: its seeds hop out cup to cup, one staying in each; the board answers with its own move. Left alone it plays both sides.",music:!0,gl:!0,fps:30,seed:0,make(h){const t=h.gl,E=h.size;let S=-2128831035;for(let e=2;e<h.hash.length;e++)S=Math.imul(S^h.hash.charCodeAt(e),16777619);const b=()=>{S=S+1831565813|0;let e=Math.imul(S^S>>>15,1|S);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},ce=e=>{let s=0;for(const o of e)s+=o[1];let n=b()*s;for(const o of e)if(n-=o[1],n<=0)return o[0];return e[0][0]};let Gt=ce([["Grey nickernuts",38],["Mixed nickernuts",24],["River pebbles",22],["Red lucky beans",9],["Cowries",7]]),mt=ce([["Iroko, oiled",40],["Pale, sun-bleached",24],["Ebonised, worn through",14],["Red padauk",8]]),xt=ce([["Plinth",6],["Four feet",4]]),at=ce([["Weathered planks",45],["Woven mat",33],["Indigo cloth",22]]),qe=ce([["Low morning sun",38],["Late golden sun",32],["Hazy noon",18],["Through shutters",12]]),we=ce([["Opening",36],["Midgame",46],["Endgame",18]]),Me=ce([["Along the board",28],["Over the near row",30],["From the far store",20]]),Ot=ce([["Gentle",55],["Careful",33],["Sly",12]]),ue=739982445;for(let e=2;e<h.hash.length;e++)ue=Math.imul(ue^h.hash.charCodeAt(e),1540483477)^ue>>>13;const bt=()=>{ue=ue+1831565813|0;let e=Math.imul(ue^ue>>>15,1|ue);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};{const e=bt(),s=bt();e<.16?Me="From above":e<.26&&(Me="Close on a cup"),s<.08&&(we="Rout")}{const e=bt();e<.3?Me="Overhead":e<.42&&(Me="Low at the edge")}let ze=1359893119;for(let e=2;e<h.hash.length;e++)ze=Math.imul(ze^h.hash.charCodeAt(e),739982445)^ze>>>12;const wo=()=>{ze=ze+1831565813|0;let e=Math.imul(ze^ze>>>15,1|ze);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},go=wo(),ra=wo();let wt=go<.13?"Scooped in the earth":go<.22?"Cut in rock":"Carved plank";h.home&&(Gt="Grey nickernuts",mt="Iroko, oiled",xt="Plinth",at="Weathered planks",qe="Low morning sun",we="Midgame",Me="Along the board",Ot="Gentle",wt="Carved plank");const V=wt==="Scooped in the earth"?1:wt==="Cut in rock"?2:0;!h.home&&(V?qe!=="Hazy noon":at!=="Weathered planks"&&ra<.22)&&(qe="Under a tree");const ca=qe==="Under a tree"?1:0,la=V?3+V:["Iroko, oiled","Pale, sun-bleached","Ebonised, worn through","Red padauk"].indexOf(mt),Wt=V?2+V:["Weathered planks","Woven mat","Indigo cloth"].indexOf(at);V&&(mt="None",xt="None",at=V===1?"Bare earth":"Rock"),h.trait("Seeds",Gt),h.trait("Board",wt),h.trait("Wood",mt),h.trait("Feet",xt),h.trait("Table",at),h.trait("Light",qe),h.trait("Stage",we),h.trait("Camera",Me),h.trait("Opponent",Ot);const le=["Grey nickernuts","Mixed nickernuts","River pebbles","Red lucky beans","Cowries"].indexOf(Gt),yo=xt==="Plinth"?0:1,oe=7,Eo=7,ve=3.6,To=3.026,Ro=7.676,K=24.3,Mo=7.45,gt=e=>e<6?(e-2.5)*Eo:(8.5-e)*Eo,Xt=e=>e<6?-ve:ve,st=e=>e===12?-K:e===13?K:gt(e),yt=e=>e>=12?0:Xt(e),zo=(e,s,n,o)=>{if(s<oe-3||s>oe+3)return-3;if((o>=0?o>=12?Math.max(0,Math.hypot((e-st(o))/3.3,n/6)-1)*3.3:Math.hypot(e-st(o),n-yt(o))-3:9)<.6)return o;if(Math.abs(e)>20.8)return Math.abs(n)<6.2&&Math.abs(e)<28?e<0?12:13:-2;const r=Math.min(5,Math.max(0,Math.floor(e/7+3)));return Math.hypot(e-(r-2.5)*7,n-(n<0?-ve:ve))<3.4?n<0?r:11-r:-2},Ao={"Along the board":[[-45,20.5,-17],[-1,1.4,3],33,[-14.5,-3.6]],"Over the near row":[[-34,25,-36],[-1,3,0],38,[-3.5,-3.6]],"From the far store":[[46,24,19],[3,-.5,-1.5],33,[10.5,3.6]],"From above":[[-27,66,-40],[3,2,1],36,[-3.5,-3.6]],"Close on a cup":[[-19,28,-26],[-6,4.5,-.5],30,[-10.5,-3.6]],Overhead:[[-14,88,-27],[2,2,1],34,[-3.5,0]],"Low at the edge":[[-32,16,-22],[8,-2,3],36,[-17.5,-3.6]]};let Ae=1779033703;for(let e=2;e<h.hash.length;e++)Ae=Math.imul(Ae^h.hash.charCodeAt(e),668265261)^Ae>>>15;const Fo=()=>{Ae=Ae+1831565813|0;let e=Math.imul(Ae^Ae>>>15,1|Ae);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},ia=!h.home&&Me!=="From the far store"&&Fo()<.45,fa=h.home?0:(Fo()-.5)*22;let Fe=1013904242;for(let e=2;e<h.hash.length;e++)Fe=Math.imul(Fe^h.hash.charCodeAt(e),374761393)^Fe>>>14;const Et=()=>{Fe=Fe+1831565813|0;let e=Math.imul(Fe^Fe>>>15,1|Fe);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Tt=[(Et()-.5)*36,(Et()-.5)*20,(Et()-.5)*.6,Et()];if(V){const e=Ao["Low at the edge"];e[0]=[e[0][0],e[0][1]+5,e[0][2]],e[1]=[e[1][0],e[1][1]+7,e[1][2]]}const pe=Ao[Me],nt=ia?[[-pe[0][0],pe[0][1],pe[0][2]],[-pe[1][0],pe[1][1],pe[1][2]],pe[2],[-pe[3][0],pe[3][1]]]:pe,Rt=e=>{const s=Math.hypot(e[0],e[1],e[2]);return[e[0]/s,e[1]/s,e[2]/s]},Ht=(e,s)=>[e[1]*s[2]-e[2]*s[1],e[2]*s[0]-e[0]*s[2],e[0]*s[1]-e[1]*s[0]],P=nt[0].map(e=>e+(b()-.5)*1.2),Mt=we!=="Rout"?0:Math.hypot(P[0]+K,P[2])<=Math.hypot(P[0]-K,P[2])?-K:K,Kt=Mt?nt[1].map((e,s)=>e+([Mt,oe-1,0][s]-e)*.45):nt[1],ge=Rt([Kt[0]-P[0],Kt[1]-P[1],Kt[2]-P[2]]),rt=Rt(Ht(ge,[0,1,0])),zt=Ht(rt,ge),Vt=Math.tan(nt[2]*Math.PI/360),ke={"Low morning sun":[[.42,.58,-.7],[1,.87,.72],3.4,[.31,.39,.53],.3,44],"Late golden sun":[[.24,.33,-.91],[1,.6,.31],3.8,[.28,.29,.4],.24,56],"Hazy noon":[[.32,.76,-.56],[1,.93,.84],2.4,[.42,.46,.52],.5,7],"Through shutters":[[.42,.58,-.7],[1,.82,.62],3.6,[.3,.34,.44],.26,44],"Under a tree":[[.32,.76,-.56],[1,.87,.72],2.4,[.42,.45,.49],.56,30]}[qe],ye=Rt([ke[0][0]+(b()-.5)*.12,ke[0][1],ke[0][2]]),ko=Rt([-ye[2],0,ye[0]]),ha=Ht(ko,ye),da=[ye[0]*90,ye[1]*90+4,ye[2]*90],ua=1/38,va=1/38,pa=200,jt=ke[1].map(e=>e*ke[2]),Qt=ke[3].map(e=>e*ke[4]/.3*.62),No=e=>.2126*e[0]+.7152*e[1]+.0722*e[2],ma=[0,1,2].map(e=>Math.min(2,Qt[e]/No(Qt)/(jt[e]/No(jt)))),xa=(()=>{const e=Mt?[Mt,0]:nt[3],s=[e[0]-P[0],oe-1-P[1],e[1]-P[2]];return s[0]*ge[0]+s[1]*ge[1]+s[2]*ge[2]})(),Oe=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler2DShadow; precision highp usampler2D;
layout(std140) uniform U { vec4 uC[16]; vec4 uS[48]; };
uniform sampler2D uN;
#define PI 3.14159265
float sq(float x){return x*x;}
float n3(vec3 x){ vec3 p=floor(x), f=fract(x); f=f*f*(3.-2.*f); vec2 uv=p.xy+vec2(37.,17.)*p.z+f.xy; vec2 rg=textureLod(uN,(uv+.5)/256.,0.).xy; return mix(rg.x,rg.y,f.z); }
float smax(float a,float b,float k){ float h=max(k-abs(a-b),0.)/k; return max(a,b)+h*h*k*.25; }
float sdRBox(vec3 p,vec3 b,float r){ vec3 q=abs(p)-b+r; return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.)-r; }
float sdEll(vec3 p,vec3 r){ float k0=length(p/r), k1=length(p/(r*r)); return k0*(k0-1.)/k1; }
float at2(float y,float x){ float a=atan(y/(abs(x)+1e-7)); return x<0.?(y<0.?-PI:PI)-a:a; }
vec3 ray(vec2 uv){ vec2 s=uv*2.-1.; return normalize(uC[1].xyz+(s.x*uC[2].xyz+s.y*uC[3].xyz)*uC[0].w); }
vec3 tone(vec3 x){ x*=uC[6].w; x=x*(2.51*x+.03)/(x*(2.43*x+.59)+.14); return pow(clamp(x,0.,1.),vec3(1./2.2)); }
#if defined(TREE)||defined(GROUND)
float win(vec3 p){ return 1.; }   // out of doors: no window (a tree's light is laid on per frame by dap)
#else
float win(vec3 p){
  vec3 L=uC[4].xyz; float t=(-78.-p.z)/L.z; vec3 q=p+L*t; float pw=t*.0047+.12;
  float a=smoothstep(-pw,pw,q.x+75.)*smoothstep(pw,-pw,q.x-260.)*smoothstep(-pw,pw,q.y-16.)*smoothstep(pw,-pw,q.y-uC[5].w-48.);
  float mx=abs(mod(q.x-uC[9].y,46.)-23.); a*=smoothstep(1.9-pw,1.9+pw,23.-mx);
  a*=smoothstep(-pw,pw,abs(q.y-uC[5].w)-2.2);
  if(uC[4].w>.5) a*=smoothstep(-pw,pw,abs(mod(q.y+.6*n3(vec3(q.xy*.05,2.)),5.6)-2.8)-1.15);
  return a;
}
#endif
#ifdef TREE
// sun through a crown: every small gap throws a soft image of the sun (4 to 8 cm across here, stretched along the sun's
// bearing), the images overlap into loose clusters where the crown is thin, with open shade between; each drifts a
// little and the clusters thin and fill as the leaves move, on incommensurate clocks (no period). Applied per frame.
float dap(vec3 p){
  vec3 L=uC[4].xyz; float tt=uC[11].z;
  vec2 q=p.xz-L.xz*(p.y-7.)/L.y, lh=normalize(L.xz+1e-5);
  vec2 u=vec2(dot(q,lh)*L.y,dot(q,vec2(-lh.y,lh.x)))*.25;   // 4 cm cells, in which the sun's images are round
  float a=0.; vec2 ci=floor(u), pr=vec2(-lh.y,lh.x);
  for(int j=0;j<9;j++){
    vec2 c=ci+vec2(float(j%3-1),float(j/3-1));
    vec4 h=texelFetch(uN,ivec2(mod(c+vec2(91.,57.),256.)),0);
    vec2 o=c+.5+(h.xy-.5)*.6+.07*vec2(sin(tt*(.21+.3*h.z)+h.w*40.),cos(tt*(.17+.27*h.x)+h.y*40.));
    vec2 oq=lh*(o.x*4./L.y)+pr*(o.y*4.);   // the image's centre back on the ground: is the crown thin over it?
    float cl=n3(vec3(oq*.04,tt*.011))*.7+n3(vec3(oq*.13+5.,2.+tt*.02))*.3, r=.42+.38*h.z, pOn=clamp(cl*3.2-1.,0.,.96)+.07*sin(tt*(.1+.15*h.y)+h.x*50.);
    float b=smoothstep(pOn,pOn-.06,h.w)*smoothstep(r,r*.5,length(u-o))*(.8+.2*fract(h.x*7.3));
    a=a+b-a*b;
  }
  return .03+.97*a;
}
#endif
#if defined(TREE)||defined(GROUND)
const vec3 HZ=vec3(1.05,1.06,1.0);   // far sunlit air out of doors
#endif
vec3 lco(vec3 p){ vec3 l=p-uC[7].xyz; return vec3(dot(l,uC[8].xyz)*uC[7].w*.5+.5, dot(l,uC[10].xyz)*uC[8].w*.5+.5, -dot(l,uC[4].xyz)/uC[9].w); }
vec3 env(vec3 d,float r){
  vec3 c=mix(vec3(.05,.04,.03),vec3(.26,.23,.20),smoothstep(-.15,.7,d.y));
  vec2 lh=normalize(uC[4].xz); vec2 dh=normalize(d.xz+vec2(1e-5));
  float az=dot(dh,lh), el=d.y, e=.02+r*.3;
  float w=smoothstep(.8-e,.86+e,az)*smoothstep(-e,.06+e,el)*smoothstep(.62+e,.55-e,el);
  float a=atan((lh.x*dh.y-lh.y*dh.x)/max(az,.05));   // the angle from the sun's bearing (one-argument atan)
  float mul=mix(smoothstep(.03,.06,abs(fract(a*2.6+.5)-.5))*smoothstep(.02,.04,abs(el-.3)),.8,smoothstep(.1,.3,r));
  return c+w*mul*vec3(3.,2.85,2.6)*(1.-.5*smoothstep(.3,.6,el))*(1.-.6*smoothstep(.15,.5,r));
}
`,Yt=`
uniform highp usampler2D uG;
float gT; bool gHB; vec3 gN; float gAO, gVis, gCup, gWear;
void gRead(){
  uvec4 g=texelFetch(uG,ivec2(gl_FragCoord.xy),0);
  gT=sq(float(g.x)/65535.)*1600.;
  vec2 oc=vec2(float(g.y&255u),float(g.y>>8u))/255.*2.-1.;
  vec3 v=vec3(oc.x,1.-abs(oc.x)-abs(oc.y),oc.y); if(v.y<0.) v.xz=(1.-abs(v.zx))*vec2(v.x<0.?-1.:1.,v.z<0.?-1.:1.);
  gN=normalize(v); gAO=float(g.z&255u)/255.; gVis=float(g.z>>8u)/255.;
  gCup=float(g.w&255u)/255.; gWear=float((g.w>>8u)&127u)/127.; gHB=(g.w>>15u)>0u;
}
#ifdef GROUND
#define ONT(p) (abs(p.y-7.)<.4&&gT<1585.)
#else
#define ONT(p) (p.y<.05&&p.y>-4.05&&p.x<640.05)
#endif
`,ba=`
float carve(vec3 p,float bc){
  // chip-carved by hand: the cuts drift in width and line, and each goes in to its own depth
  float v=(p.y-bc-.07*sin(p.x*.23+p.z))/1.05; if(abs(v)>1.) return 0.;
  float u=p.x/1.75+.5+.22*sin(p.x*.37+1.3+p.z*.2)+.12*sin(p.x*1.13+p.z*.3); float cell=floor(u), f=fract(u);
  float vv=v*.5+.5; if(mod(cell,2.)>.5) vv=1.-vv;
  float dp=.72+.56*textureLod(uN,vec2(mod(cell,256.)+.5,p.z<0.?60.5:61.5)/256.,0.).z;
  float m=min(vv,(1.-vv-2.*abs(f-.5))*.55*dp);
  return max(m,0.)*1.05;
}
float board(vec3 p){
  float d, bc;
#ifdef GROUND
  // no board: the ground is the board, level with the rims; its relief fades out at the bake's box
  float fe=smoothstep(29.5,26.,abs(p.x))*smoothstep(8.4,7.,abs(p.z));
#ifdef EARTH
  d=p.y-7.+fe*(.14*(n3(p*vec3(.3,.5,.3)+11.)-.5)+.06*(n3(p*1.7+5.)-.5));
#else
  d=p.y-7.+fe*(.22*(n3(p*vec3(.12,.3,.12)+11.)-.5)+.05*(n3(p*1.3+5.)-.5));
  // a crack or two running through the rows
  float ck=abs(p.z-uC[12].y*1.4-1.3*sin(p.x*.11+uC[12].z)-.35*sin(p.x*.47+1.)), ck2=abs(p.x-uC[13].y*1.3-1.6*sin(p.z*.3+2.)-.3*p.z);
  d+=fe*(.2*smoothstep(.5,0.,ck)+.15*smoothstep(.4,0.,ck2)*smoothstep(1.,4.,p.z*sign(uC[12].x+14.)+5.));
#endif
#else
  if(uC[12].w<.5){ d=sdRBox(p-vec3(0.,4.3,0.),vec3(29.1,2.7,7.95),.8); d=min(d,sdRBox(p-vec3(0.,.95,0.),vec3(27.7,.95,6.7),.35)); bc=4.2; }
  else { d=sdRBox(p-vec3(0.,4.85,0.),vec3(29.1,2.15,7.95),.8); vec3 q=vec3(abs(p.x)-24.6,p.y-1.5,abs(p.z)-5.2); float rf=1.75-.35*clamp((2.9-p.y)/2.9,0.,1.)+.12*sin(p.y*3.3); d=min(d,max(length(q.xz)-rf,abs(q.y)-1.5)); bc=4.8; }
  d+=.07*(n3(p*vec3(.06,.14,.14)+11.)-.5)+.02*(n3(p*.8+5.)-.5);
  // knocks and bruises along the top arrises and round the ends
  d+=.1*smoothstep(5.9,7.,p.y)*max(smoothstep(7.,7.9,abs(p.z)),smoothstep(28.2,29.1,abs(p.x)))*smoothstep(.7,.92,n3(p*1.2+30.))*.7;
  float m=smoothstep(7.25,7.8,abs(p.z))*step(abs(p.x),27.7);
  if(m>0.) d+=m*(carve(p,bc)+.085*exp(-sq((p.y-bc-1.4)/.085))+.085*exp(-sq((p.y-bc+1.4)/.085)));
#endif
  // gouged cups: each a little off its place and out of round, with its own lip; the owner's side of the lip
  // worn down into a shallow saddle where fingers scoop
  float ix=clamp(floor(p.x/7.+3.),0.,5.), rw=p.z<0.?0.:1.;
  vec4 cj=textureLod(uN,vec2(ix+rw*6.+.5,floor(uC[12].z)+100.5)/256.,0.);
  vec3 dc=p-vec3((ix-2.5)*7.+(cj.x-.5)*.36,7.676,(rw>.5?3.6:-3.6)+(cj.z-.5)*.3); float el=(cj.w-.5)*.09;
#ifdef GROUND
  // dug or pecked by hand: no two lips alike (each rim's second and third harmonics; the solver's twin has the same)
  vec4 cw=textureLod(uN,vec2(ix+rw*6.+.5,floor(uC[12].z)+130.5)/256.,0.)-.5;
  vec2 cr=dc.xz/max(length(dc.xz),1e-3);
  float wob=(.42*(cw.x*(cr.x*cr.x-cr.y*cr.y)+cw.y*2.*cr.x*cr.y)+.3*(cw.z*cr.x*(4.*cr.x*cr.x-3.)+cw.w*cr.y*(3.-4.*cr.y*cr.y)))*smoothstep(.6,2.4,length(dc.xz));
#ifdef EARTH
  d=smax(d,3.026+wob-length(dc*vec3(1.+el,1.,1.-el)),.75+.5*cj.y);
#else
  d=smax(d,3.026+wob-length(dc*vec3(1.+el,1.,1.-el)),.3+.25*cj.y);
#endif
#else
  d=smax(d,3.026-length(dc*vec3(1.+el,1.,1.-el)),.3+.3*cj.y);
#endif
  vec2 sd=vec2(dc.x*.55,dc.z-(rw>.5?2.9:-2.9));
#ifdef EARTH
  d+=.5*exp(-dot(sd,sd)*.7)*smoothstep(5.5,7.,p.y);   // the rim broken down where the players reach in
  // the collar of loose crumbs thrown out round each hole (and each store) by the digging and by fingers
  { float rc=length(p.xz-vec2((ix-2.5)*7.,rw>.5?3.6:-3.6))-3.;
    float rs=(length(vec2((abs(p.x)-24.3)/3.3,p.z/6.))-1.)*4.;
    float re=min(rc,rs);
    d-=fe*exp(-sq((re-.7)/.6))*(.06+.2*n3(p*2.1+19.)+.16*n3(p*6.3+3.))*(1.-.6*exp(-dot(sd,sd)*.5)); }
#else
#ifdef ROCK
  d+=.14*exp(-dot(sd,sd))*smoothstep(5.5,7.,p.y);
  // the pecked rim: little pits round each lip
  d+=fe*.07*smoothstep(.5,.8,n3(p*3.6+13.))*smoothstep(4.4,3.2,length(dc.xz));
#else
  d+=.2*exp(-dot(sd,sd))*smoothstep(5.5,7.,p.y);
#endif
#endif
  d=smax(d,-.62*sdEll(p-vec3(p.x<0.?-24.3:24.3,7.45,0.),vec3(3.3,2.65,6.)),.3);
  return d;
}
`,Be=`#version 300 es
out vec2 vU; void main(){ vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2)); vU=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,wa=Oe+ba+`
uniform float uMode;
in vec2 vU; out uvec4 o;
#ifdef GROUND
#define BYT 7.9
#else
#define BYT 7.4
#endif
void main(){
  bool cam=uMode<.5;
  vec3 L=uC[4].xyz;
  vec3 ro=cam?uC[0].xyz:uC[7].xyz+uC[8].xyz*(vU.x*2.-1.)/uC[7].w+uC[10].xyz*(vU.y*2.-1.)/uC[8].w;
  vec3 rd=cam?ray(vU):-L;
  vec3 ird=1./rd, t0=(vec3(-29.5,-.1,-8.4)-ro)*ird, t1=(vec3(29.5,BYT,8.4)-ro)*ird, tn=min(t0,t1), tf=max(t0,t1);
  float ta=max(max(tn.x,tn.y),max(tn.z,0.)), tb=min(min(tf.x,tf.y),tf.z);
#ifdef GROUND
  float tp=rd.y<0.?(ro.y-7.)/-rd.y:1e5;
  if(tp<ta) tb=ta;   // the ray meets the open ground before the box round the holes
#endif
  float t=1e5, hb=0., eps=cam?.0005:.0, s=ta;
  vec3 p=ro, n=vec3(0.,1.,0.), nb=vec3(0.), sp=ro;
  float cv=0., cu=1., aoS=0., aw=1., res=1., s2=0., tb2=0.;
  bool onB=false, doA=false, doS=false;
  int ph=ta<tb?0:1, j=0;   // 0 march, 1 resolve the hit, 2 normal taps, 3 occlusion taps, 4 shadow setup, 5 shadow march
  for(int i=0;i<int(uC[9].x*420.);i++){
    if(ph==1){
      if(t>1e4){
#ifdef GROUND
        t=min(tp,1590.);
#else
        if(!cam) t=ro.y/L.y;
        else {
          float tt=rd.y<0.?-ro.y/rd.y:1e5; vec3 g=ro+rd*tt;
          if(g.x<640.&&abs(g.z)<300.) t=tt;
          else { float te=rd.x>0.?(640.-ro.x)/rd.x:1e5; vec3 q=ro+rd*te; if(q.y<0.&&q.y>-4.&&abs(q.z)<300.) t=te;
            else { float tw=rd.x>0.?(900.-ro.x)/rd.x:1e5, tz=rd.z>0.?(420.-ro.z)/rd.z:1e5, tg=rd.y<0.?(-76.-ro.y)/rd.y:1e5; t=min(min(tw,tz),tg); } }
        }
#endif
      }
      if(!cam) break;
      p=ro+rd*t; onB=hb>.5;
#ifdef GROUND
      bool onT=!onB&&t<1585.;
      doA=onB||(onT&&abs(p.x)<40.&&abs(p.z)<20.); doS=onT||onB;
#else
      bool onT=!onB&&p.y<.05&&p.y>-4.05&&p.x<640.05;
      doA=onB||(onT&&abs(p.x)<40.&&abs(p.z)<20.); doS=!(p.x>639.||p.y<-4.05);
#endif
      ph=onB?2:doA?3:4; j=0;
    }
    if(ph==4){
      if(!doS||dot(n,L)<=0.) break;
      sp=p+n*.02;
      vec3 jd=1./L, u0=(vec3(-29.5,-.1,-8.4)-sp)*jd, u1=(vec3(29.5,BYT,8.4)-sp)*jd, un=min(u0,u1), uf=max(u0,u1);
      float ua=max(max(un.x,un.y),max(un.z,0.)); tb2=min(min(uf.x,uf.y),uf.z);
      if(ua>=tb2) break;
      s2=max(ua,.015); ph=5;
    }
    vec3 e=.5773*(2.*vec3(float(((j+3)>>1)&1),float((j>>1)&1),float(j&1))-1.);
    float h=j<5?.06+.42*float(j*j)*.25:-.3;
    vec3 q=ph==0?ro+rd*s:ph==2?p+e*.006:ph==3?p+n*h:sp+L*s2;
    float d=board(q);
    if(ph==0){ if(d<eps*s+(cam?0.:.004)){t=s;hb=1.;ph=1;} else { s+=d*.72; if(s>tb) ph=1; } }
    else if(ph==2){ nb+=e*d; j++; if(j==4){ n=normalize(nb); ph=doA?3:4; j=0; } }
    else if(ph==3){ float dd=min(d,q.y+.5*step(30.,abs(q.x))); if(j==2) cu=dd-h; if(j==5) cv=dd+.3; else { aoS+=aw*max(h-dd,0.)/h; aw*=.72; } j++; if(j==6) ph=4; }
    else { res=min(res,uC[15].w*d/s2); s2+=clamp(d,.02,1.2); if(res<.002||s2>tb2) break; }
  }
  if(!cam){ gl_FragDepth=clamp(t/uC[9].w,0.,1.); o=uvec4(0u); return; }
  float ao=doA?clamp(1.-aoS*.36,0.,1.):1., vis0=smoothstep(0.,1.,clamp(res,0.,1.));
  vec2 oc=n.xz/(abs(n.x)+abs(n.y)+abs(n.z)); if(n.y<0.) oc=(1.-abs(oc.yx))*vec2(oc.x<0.?-1.:1.,oc.y<0.?-1.:1.);
  uvec2 on=uvec2(clamp(oc*.5+.5,0.,1.)*255.+.5);
  float wear=smoothstep(.015,.12,cv), cup=smoothstep(.02,-.22,cu);
  o=uvec4(uint(clamp(sqrt(t/1600.),0.,.99999)*65535.), on.x|(on.y<<8u), uint(ao*255.+.5)|(uint(vis0*255.+.5)<<8u),
          uint(cup*255.+.5)|(uint(wear*127.+.5)<<8u)|(uint(hb)<<15u));
  gl_FragDepth=.5;
}`,ga=`
float gIR=0.;   // how much of a store's own lit wall reaches this point (set by shade)
vec4 lit(vec3 p,vec3 rd,vec3 n,vec3 alb,float rough,float ao,float vis0,float spw){
  vec3 L=uC[4].xyz;
  float ndl=max(dot(n,L),0.);
  float vis=ndl>0.?vis0:0.;
  vis*=win(p);
  vec3 V=-rd, H=normalize(L+V);
  float a2=sq(rough*rough), nh=max(dot(n,H),0.), nv=max(dot(n,V),.02);
  float D=a2/(PI*sq(nh*nh*(a2-1.)+1.));
  float Fr=.04+.96*pow(1.-max(dot(H,V),0.),5.);
  float G=.5/(nv*sqrt(a2+(1.-a2)*ndl*ndl)+ndl*sqrt(a2+(1.-a2)*nv*nv)+1e-4);
  vec3 sunC=uC[5].rgb, amb=uC[6].rgb;
  vec3 S=sunC*vis*(alb*ndl/PI*2.6+vec3(D*G*Fr*ndl)*spw);
  int TK=int(uC[15].y+.5);
  vec3 tA=TK==0?vec3(.15,.12,.09):TK==1?vec3(.2,.14,.07):TK==2?vec3(.012,.016,.035):TK==3?vec3(.2,.1,.058):vec3(.2,.19,.17);
  vec3 bounce=vec3(.42,.32,.22)*amb*.55+sunC*max(L.y,0.)*tA*.7*step(abs(p.x),40.)*step(abs(p.z),20.)+sunC*max(L.y,0.)*alb*gIR*2.4;
  float Fv=.04+.96*pow(1.-nv,5.);
  vec3 A=alb*(amb*(.62+.38*n.y)+bounce*(.5-.5*n.y+gIR*.5))*ao+env(reflect(rd,n),rough)*Fv*spw*ao*(1.-rough*.6);
  vec3 F=A+S;
  float sf=clamp(dot(S,vec3(.2126,.7152,.0722))/max(dot(F,vec3(.2126,.7152,.0722)),1e-5),0.,1.);
  return vec4(sqrt(clamp(F/4.,0.,1.)),sf);
}
`,Co=`
#ifdef GROUND
vec3 gmat(vec3 p,float bowl,inout vec3 n,out float rough){
  float G[8]; vec2 rz=mat2(.8,.6,-.6,.8)*p.xz;   // patterns on the flat run in the noise's own plane, turned off its grid
  for(int i=0;i<int(uC[9].x*8.);i++) G[i]=n3(i==0?p*.045+1.:i==1?vec3(rz*.21,4.):i==2?p*.9+7.:i==3?vec3(rz*3.1,2.):i==4?vec3(p.xz*.5,9.):i==5?vec3(p.xz*.5+vec2(.06,0.),9.):i==6?vec3(p.xz*.5+vec2(0.,.06),9.):vec3(rz.yx*1.3,5.));
  float ix=clamp(floor(p.x/7.+3.),0.,5.);
  float rc=length(p.xz-vec2((ix-2.5)*7.,p.z<0.?-3.6:3.6))-3., rs=(length(vec2((abs(p.x)-24.3)/3.3,p.z/6.))-1.)*4., re=min(rc,rs);
  vec3 alb; float far=smoothstep(30.,9.,re);
#ifdef EARTH
  // hard red-brown yard earth, swept in long faint arcs; grit; paler dust lying in the hollows; the holes' floors packed
  // smooth and darker; the dents of knuckles and heels beside the rows
  alb=mix(vec3(.118,.066,.044),vec3(.152,.094,.064),G[0])*(.84+.32*G[1]);
  float sw=sin(length(p.xz-vec2(40.,-90.))*1.3+G[1]*4.+G[0]*6.);
  alb*=1.+.07*sw*(1.-bowl)*smoothstep(.3,2.,re);
  alb*=.93+.14*G[3];
  alb=mix(alb,vec3(.2,.15,.11),smoothstep(.55,.85,G[2]*.6+G[7]*.4)*.35*(1.-bowl));
  alb=mix(alb,alb*vec3(.66,.62,.62),bowl*smoothstep(6.9,5.6,p.y));
  float dent=smoothstep(.62,.8,G[1])*smoothstep(1.,2.5,re)*smoothstep(7.,4.,re);
  alb*=1.-.12*dent;
  n=normalize(n+vec3(G[4]-G[5],0.,G[4]-G[6])*(4.+6.*dent)*(1.-bowl));
  rough=mix(.92,.7,bowl);
#else
  // weathered buff-grey stone: pitted, crusts of pale and orange lichen that stop short of the cups, a crack's dark line;
  // the cups darker and smoother, polished by hands, a rain tide line in the deepest
  alb=mix(vec3(.12,.118,.11),vec3(.165,.162,.15),G[0])*(.82+.36*G[1])*(.9+.2*G[2]);
  alb*=1.-.1*smoothstep(.45,.8,G[3]*.5+G[2]*.5)*(1.-bowl);
  float lich=smoothstep(.52,.68,G[1]*.75+G[2]*.25)*smoothstep(.4,1.8,re)*(1.-bowl), lo=smoothstep(.55,.75,G[0]*.5+G[2]*.5);
  alb=mix(alb,mix(vec3(.185,.185,.17),vec3(.17,.125,.075),lo),lich*.5);
  float ck=abs(p.z-uC[12].y*1.4-1.3*sin(p.x*.11+uC[12].z)-.35*sin(p.x*.47+1.)), ck2=abs(p.x-uC[13].y*1.3-1.6*sin(p.z*.3+2.)-.3*p.z);
  float cw=.08+.1*G[2];   // the crack's width wanders; dirt and shade lie soft along it
  alb*=1.-(.4*smoothstep(cw,cw*.2,ck)+.2*smoothstep(cw*4.,cw,ck))*far-(.35*smoothstep(cw*.8,cw*.15,ck2)+.15*smoothstep(cw*3.,cw*.8,ck2))*smoothstep(1.,4.,p.z*sign(uC[12].x+14.)+5.)*far;
  alb=mix(alb,alb*vec3(.62,.62,.64),bowl*smoothstep(6.9,6.,p.y));
  alb*=1.-.22*bowl*exp(-sq((p.y-5.35-.15*G[1])/.07));
  n=normalize(n+vec3(G[4]-G[5],0.,G[4]-G[6])*3.*(1.-bowl));
  rough=mix(.85,.45,bowl);
#endif
  return alb;
}
#endif
`,ya=Oe+Yt+ga+Co+`
uniform highp usampler2D uTm;
in vec2 vU; out vec4 o;
float WN[8];   // wood noise bank, filled by one n3 call site
vec3 woodCol(vec3 p,out float ring,out float fig){
  vec4 g=uC[13];
  vec3 q=p; q.y-=g.x+p.x*g.z; q.z-=g.y+p.x*g.z*.5;
  for(int i=0;i<int(uC[9].x*8.);i++) WN[i]=n3(i==0?p*vec3(.05,.3,.3)+uC[12].z:i==1?p*vec3(.12,.9,.9)+3.:i==2?p*vec3(.7,15.,15.):i==3?p*.07+7.:i==4?p*.33+1.:i==5?p*1.7:i==6?p*vec3(.04,.12,.12)+2.:p*.11+9.);
  float w=WN[0]*1.7+WN[1]*.45;
  float r=length(q.yz)+w;
  ring=fract(r*g.w);
  float late=smoothstep(.42,.86,ring)*smoothstep(1.,.9,ring);
  float pores=smoothstep(.6,.93,WN[2]);
  float fl=smoothstep(.78,.96,n3(vec3(p.x*.5,at2(q.z,q.y)*34.,r*2.5)));
  float lo=WN[3]*.6+WN[4]*.4;
  int W=int(uC[15].x+.5);
  vec3 a=vec3(.19,.108,.058), b=vec3(.088,.044,.022);
  if(W==1){a=vec3(.40,.30,.19); b=vec3(.26,.17,.10);}
  else if(W==2){a=vec3(.22,.11,.05); b=vec3(.12,.055,.024);}
  else if(W==3){a=vec3(.15,.068,.046); b=vec3(.07,.028,.019);}   // padauk aged to a deep red-brown
  vec3 col=mix(a,b,late*.8)*(.78+.44*lo);
  col*=1.-.38*pores;
  col*=1.+.35*fl;
  fig=late;
  return col;
}
void main(){
  gRead(); float t=gT;
  vec3 ro=uC[0].xyz, rd=ray(vU), p=ro+rd*t;
  vec3 n=gN, alb; float rough=.5, ao=gAO, spw=1., kind=0., vis0=gVis;
  bool onB=gHB, onT=!onB&&ONT(p);
  if(onB){
#ifndef GROUND
    { float e=.03, M[12];   // raised grain and dents: one n3 call site in a loop
      for(int i=0;i<int(uC[9].x*12.);i++){ int t=i/3, c=i-t*3; vec3 q=p+(t==1?vec3(e,0,0):t==2?vec3(0,e,0):t==3?vec3(0,0,e):vec3(0.));
        M[i]=n3(c==0?q*vec3(.7,15.,15.):c==1?q*2.2+4.:q*9.+2.); }
      vec3 w3=vec3(.004,.010,.0025), g0=vec3(M[0],M[1],M[2]);
      vec3 gr=vec3(dot(vec3(M[3],M[4],M[5])-g0,w3),dot(vec3(M[6],M[7],M[8])-g0,w3),dot(vec3(M[9],M[10],M[11])-g0,w3))/e;
      n=normalize(n-(gr-n*dot(gr,n))); }
#endif
    // the gouge's facets inside each bowl: shallow scallops running rim to bottom, a little uneven
    float ix=clamp(floor(p.x/7.+3.),0.,5.); bool stD=abs(p.x)>21.;
    vec2 lc=stD?vec2((p.x-sign(p.x)*24.3)*1.8,p.z):p.xz-vec2((ix-2.5)*7.,p.z<0.?-3.6:3.6);
    float fa=at2(lc.y,lc.x)*(stD?2.6:1.9)+.35*sin(length(lc)*1.7+ix*2.3), fr=fract(fa)-.5;
    vec3 tg=normalize(vec3(-lc.y,0.,lc.x)+1e-5);
    float rB=stD?5.9:3., bowl=smoothstep(rB+.1,rB-.6,length(lc))*smoothstep(7.02,6.6,p.y)*step(abs(p.z),7.2);
    // a bowl's sunlit wall bounces into its own shade (every cup, as the stores since cycle 2): a pale bowl glows inside
    gIR=bowl*smoothstep(4.6,5.6,p.y);
#ifdef GROUND
    gIR*=.5;
#endif
#ifdef GROUND
    alb=gmat(p,bowl,n,rough); kind=1.;
#else
    n=normalize(n+tg*fr*.22*bowl*smoothstep(4.6,5.6,p.y));
    // inside a chip cut the grain is the face's own, carried in (not a window into another board)
    vec3 pw=p; if(abs(p.z)>7.1&&abs(p.x)<27.8&&p.y<6.85) pw.z=p.z<0.?-7.95:7.95;
    float ring, fig; alb=woodCol(pw,ring,fig); vec3 raw=alb;
                                                     // cv > 0 on convex edges
    float wear=gWear*(.55+.45*WN[5]);
    float cup=gCup;                                   // concave: cups, carving
    float top=smoothstep(.6,.95,n.y)*step(6.9,p.y);
    int W=int(uC[15].x+.5);
    if(W==2){ vec3 bk=vec3(.026,.021,.018)*(.85+.3*n3(p*2.)); float thru=clamp(wear*1.25+top*.25*smoothstep(.55,.75,n3(p*.5+2.))+cup*.22*smoothstep(.4,.7,n3(p*1.3)),0.,1.); alb=mix(bk,alb*1.05,thru); }
    else alb*=1.+.3*wear;
    // fifty years of hands: the bowls dark and polished by seeds and fingers, the scooping lips darker still,
    // the flats between them dry; the ends and the near edge handled most, the middle faded by the sun
    vec2 sd=vec2((p.x-(ix-2.5)*7.)*.5,p.z-(p.z<0.?-6.5:6.5));
    float lip=exp(-dot(sd,sd)*.9)*step(abs(p.x),21.)*step(6.2,p.y);
    alb*=1.-.4*bowl*smoothstep(6.9,5.8,p.y)-.25*lip;
    alb*=mix(.78,1.06,smoothstep(27.,12.,abs(p.x)))*(.72+.56*WN[6]);
    if(W!=2) alb*=vec3(.9,.82,.76);     // oil gone brown with age
    alb=mix(alb,alb*vec3(.86,.8,.78),smoothstep(.4,.8,WN[7])*.5);
    rough=mix(.5,.2,max(bowl,lip*.8))-.1*wear+.08*(WN[3]-.5);
    // a dry check running in along the grain from one end
    { float side=fract(uC[12].x)>.5?1.:-1., cx=side*p.x, len=8.+9.*fract(uC[12].x*7.3);
      float cz=abs(p.z-uC[12].y-.35*sin(p.x*.31)-.12*sin(p.x*1.7)), run=smoothstep(29.3-len,29.,cx);
      float wd=.012+.045*run, fw=max(fwidth(cz),.002);
      alb*=1.-.85*run*smoothstep(wd+fw,wd-fw,cz)-.18*run*smoothstep(wd*5.,wd,cz); }
    // dust and old dirt packed into the cuts and the joints
    alb=mix(alb,vec3(.27,.245,.21),clamp((1.-ao)*.55*smoothstep(.6,-.3,n.y),0.,1.)*(1.-step(7.1,abs(p.z))*step(p.y,6.85)));
    alb*=1.-.8*smoothstep(.45,.95,gCup)*step(7.3,abs(p.z));
    kind=1.;
#endif
  } else if(onT){
    uvec4 m=texelFetch(uTm,ivec2(gl_FragCoord.xy),0);
    alb=vec3(float(m.x&255u),float(m.x>>8u),float(m.y&255u))/255.; alb*=alb; rough=float(m.y>>8u)/255.;
    vec2 nt=vec2(float(m.z&255u),float(m.z>>8u))/255.*2.-1.; n=vec3(nt.x,sqrt(max(0.,1.-dot(nt,nt))),nt.y);
    ao=float(m.w)/255.; kind=2.;
  } else {
    n=p.x>899.?vec3(-1.,0.,0.):p.z>419.?vec3(0.,0.,-1.):vec3(0.,1.,0.);
    vec3 wp=p.x>899.?p.yzx:p;
    alb=p.y>-75.?vec3(.50,.44,.36)*(.8+.3*n3(vec3(wp.xy*.06,1.))+.08*n3(vec3(wp.xy*.6,2.))):vec3(.06,.05,.04);
    rough=.9; spw=0.; kind=3.;
  }
  o=lit(p,rd,n,alb,rough,ao,vis0,spw);
#if defined(TREE)||defined(GROUND)
  { float hz=1.-exp(-max(t-90.,0.)/520.); vec3 F=o.rgb*o.rgb*4.; o=vec4(sqrt(clamp(mix(F,HZ,hz)/4.,0.,1.)),o.a*(1.-hz)); }   // far off, sunlit air
#endif
}`,Ea=Oe+Yt+Co+`
in vec2 vU; out uvec4 o;
float hN(float k,float r){ return textureLod(uN,vec2(mod(k,256.)+.5,r+.5)/256.,0.).z; }
float lateW(float r){ float rr=fract(r); return smoothstep(.68,.9,rr)*smoothstep(1.,.93,rr); }
void main(){
  gRead(); float t=gT;
  vec3 ro=uC[0].xyz, rd=ray(vU), p=ro+rd*t;
  bool onT=!gHB&&ONT(p);
  vec3 n=vec3(0.,1.,0.), alb; float rough, ao=gAO;
  int T=int(uC[15].y+.5);
#ifdef GROUND
  alb=gmat(p,0.,n,rough);
#else
  if(T==0){
    // old boards: irregular widths, staggered end joints, flat-sawn cathedral grain, weathered grey, dust in the gaps
    float zz=p.z+3.3, PW=14.;
    float k=floor(zz/PW), b0=k*PW+(hN(k,3.)-.5)*7., b1=(k+1.)*PW+(hN(k+1.,3.)-.5)*7.;
    if(zz<b0){ b1=b0; k-=1.; b0=k*PW+(hN(k,3.)-.5)*7.; }
    else if(zz>=b1){ b0=b1; k+=1.; b1=(k+1.)*PW+(hN(k+1.,3.)-.5)*7.; }
    float pw=b1-b0, f=zz-b0;
    float Lk=120.+170.*hN(k,5.), xo=p.x+Lk*hN(k,6.), sg=floor(xo/Lk), fx=xo-sg*Lk;
    float id=k*7.+sg*13.+11., h1=hN(id,9.), h2=hN(id,10.), h3=hN(id,12.), h4=hN(id,14.);
    float Nv[6];
    for(int i=0;i<int(uC[9].x*6.);i++) Nv[i]=n3(i==0?vec3(fx*.011,f*.05,id):i==1?vec3(fx*.05,f*.25,id+3.):i==2?vec3(fx*.03,f*2.4,id+5.):i==3?vec3(p.xz*.045,7.):i==4?vec3(p.xz*.35,2.):vec3(fx*.25,f*1.3,id+9.6));
    float c0=pw*(.2+.6*h1), sx=1.+.25*Nv[0], wy=1.5+7.*h2+fx*(h3-.5)*.07+1.9*Nv[0]+.45*Nv[1];
    float r1=length(vec2((f-c0)*sx,wy)), r2=length(vec2((f+.05-c0)*sx,wy));
    // growth years are uneven: the ring count runs through a slow random warp of the radius
    float yw=textureLod(uN,vec2(r1*.9+id*3.1,h2*40.+.5)/256.,0.).w, yw2=textureLod(uN,vec2(r2*.9+id*3.1,h2*40.+.5)/256.,0.).w;
    float gr=r1*.9+yw*1.8+.8*Nv[1], gr2=r2*.9+yw2*1.8+.8*Nv[1];
    float aa=clamp(1.-fwidth(gr)*1.6,0.,1.);
    float late=mix(.13,lateW(gr),aa), slope=(lateW(gr2)-lateW(gr))/.05*aa;
    float fz=max(fwidth(zz),.05), fxw=max(fwidth(p.x),.05);
    float sd=min(f,pw-f), jd=min(fx,Lk-fx), md=min(sd,jd);
    float seam=smoothstep(0.,.26+fz,sd), joint=smoothstep(0.,.2+fxw,jd);
    vec3 ew=mix(vec3(.205,.185,.155),vec3(.215,.155,.10),h4), lw=ew*vec3(.46,.4,.36);
    alb=mix(ew,lw,late*.9*mix(.12,1.,smoothstep(30.,58.,t)));
    alb*=(.72+.56*Nv[2])*(.84+.32*Nv[1])*(.74+.5*h1);
    alb=mix(alb,vec3(.30,.285,.26)*(.9+.2*Nv[4]),smoothstep(.45,.78,Nv[3])*.4);     // worn pale where walked
    alb*=1.-.28*smoothstep(1.6,0.,jd);                                                // end grain holds dirt
    alb=mix(alb,alb*vec3(.74,.66,.58),smoothstep(1.,0.,md)*.55);                      // grime on the arrises
    alb*=1.-.3*smoothstep(.62,.8,Nv[5])*smoothstep(.3,.6,Nv[3])*smoothstep(42.,62.,t);   // old stains (none at the lens, where blur makes one a blot)
    alb=mix(alb,vec3(.31,.295,.27),smoothstep(.75,.15,md)*smoothstep(.12,.3,md)*.65); // dust packed at the gap
    // nails at the joists, two per board, each in a little black stain
    float jx=mod(p.x+3.,40.6)-20.3+(hN(k,17.)-.5)*1.2, nd=min(length(vec2(jx,f-1.9-.4*h3)),length(vec2(jx+.3*(h1-.5),pw-f-1.9-.4*h1)));
    alb*=max(0.,1.-.8*smoothstep(.32,.18,nd)-.25*smoothstep(1.1,.3,nd));
    alb*=1.-(1.-seam)*.86*min(1.,.4/fz);
    alb*=1.-(1.-joint)*.86*min(1.,.4/fxw);
    float dz=(f/pw-.5)*.08+.75*smoothstep(.55,0.,f)-.75*smoothstep(.55,0.,pw-f)-slope*.012;
    float dx=.6*smoothstep(.5,0.,fx)-.6*smoothstep(.5,0.,Lk-fx);
    n=normalize(vec3(-dx+(Nv[4]-.5)*.05,1.,-dz));
    rough=.62+.12*Nv[3];
    if(int(uC[15].x+.5)==1) alb*=vec3(.58,.54,.5);   // under a pale, sun-bleached board the boards are the old dark ones
  } else if(T==1){
      // a palm-strip mat: flat strips a finger wide going over and under, each crossing a little pillow
      vec2 uv=vec2(p.x+p.z,p.x-p.z)*.7071; float sw=1.;
      vec2 c2=floor(uv/sw), fr=fract(uv/sw);
      bool aTop=mod(c2.x+c2.y,4.)<2.;
      float acr=aTop?fr.y:fr.x, fa=(aTop?fr.x+mod(c2.x+c2.y,2.):fr.y+mod(c2.x+c2.y+1.,2.))*.5, along=aTop?uv.x:uv.y, idx=aTop?c2.y:c2.x;
      vec3 A[3]; float Nv[3]; A[0]=vec3(along*1.4,acr*11.,idx); A[1]=vec3(along*.25,acr*2.,idx+5.); A[2]=vec3(idx*1.7,along*.03,2.);
      for(int i=0;i<int(uC[9].x*3.);i++) Nv[i]=n3(A[i]);
      float sa=sin(PI*acr), sf=sin(PI*fa), h=sa*(.3+.7*sf);
      float dA=PI*cos(PI*acr)*(.3+.7*sf)/sw, dF=sa*.7*PI*cos(PI*fa)/(2.*sw)+(Nv[0]-.5)*.6;
      vec2 du=aTop?vec2(dF,dA):vec2(dA,dF);
      vec2 gxz=vec2(du.x+du.y,du.x-du.y)*.7071;
      float hs=hN(idx+(aTop?0.:97.),21.), fib=Nv[0]*.6+Nv[1]*.4;
      vec3 straw=mix(vec3(.45,.36,.2),vec3(.37,.26,.13),hs)*(.85+.25*Nv[2]);
      if(mod(idx+(aTop?0.:11.),29.)<1.) straw=vec3(.11,.065,.04);
      alb=straw*(.8+.3*fib)*mix(.5,1.,smoothstep(.0,.1,acr)*smoothstep(1.,.9,acr));
      n=normalize(vec3(-gxz.x*.16,1.,-gxz.y*.16));
      ao*=.55+.45*h;
      rough=.5+.15*(1.-fib);
    } else {
      // adire eleko, laid a little askew on a bare table: the cloth is ruled into squares and each square holds one
      // motif painted in starch by hand (beaded rings, a dot field, comb strokes, crossed strokes, nested squares,
      // chevrons), no two neighbours alike, no line of even width; the pale is a washed blue with the dye crept in at
      // its edges; the ground is worn pale along the folds and where it has been washed most; a stitched hem
      vec2 xz=p.xz, d0=xz-vec2(uC[1].w,uC[2].w);
      float ca=cos(uC[3].w), sa=sin(uC[3].w), cs=uC[10].w;
      vec2 cr=vec2(ca*d0.x+sa*d0.y,-sa*d0.x+ca*d0.y), hs2=vec2(48.+14.*fract(cs*7.13),24.+8.*fract(cs*3.31));
      float Nv[10];
      for(int i=0;i<int(uC[9].x*10.);i++) Nv[i]=n3(i==0?vec3(xz*.06,1.):i==1?vec3((xz+vec2(.6,0.))*.06,1.):i==2?vec3((xz+vec2(0.,.6))*.06,1.):i==3?vec3(cr*.17,6.):i==4?vec3(cr*.17,9.):i==5?vec3(xz*1.6,11.):i==6?vec3(cr*.9,13.):i==7?vec3(cr*5.,3.):i==8?vec3(xz*.03,15.):vec3(p.x*.035,p.z*1.1,17.));
      vec2 ed=hs2-abs(cr)+(vec2(Nv[3],Nv[4])-.5)*.8;   // the cloth's edge, never quite straight
      float e=min(ed.x,ed.y);
      if(e<0.){
        // the bare table beyond the cloth: old oiled boards, the grain running long, a dark warm brown
        float bz=p.z/17.+.37, bk=floor(bz), bf=fract(bz);
        alb=vec3(.12,.07,.038)*(.66+.55*Nv[9])*(.8+.35*hN(bk,40.))*(.85+.3*Nv[8]);
        alb*=1.-.7*smoothstep(.02,.0,min(bf,1.-bf));
        alb*=1.-.5*smoothstep(.6,0.,-e);              // the cloth's own thickness shades the boards at its edge
        rough=.48; ao*=1.-.3*smoothstep(.6,0.,-e);
      } else {
        vec2 od=ed.x<ed.y?vec2(cr.x<0.?-1.:1.,0.):vec2(0.,cr.y<0.?-1.:1.); od=vec2(ca*od.x-sa*od.y,sa*od.x+ca*od.y);
        float far=smoothstep(8.,22.,length(max(abs(xz)-vec2(29.,8.),0.)));
        vec2 fd=vec2(.8,.6), fq=vec2(-.6,.8);
        float f1=dot(xz,fd)-38.-4.*Nv[0], f2=dot(xz,fq)+30.+3.*Nv[3];
        vec2 fold=fd*(-f1/18.)*exp(-f1*f1/36.)+fq*(-f2/14.)*exp(-f2*f2/28.);
        float crest=(exp(-f1*f1/14.)+exp(-f2*f2/12.))*far;
        // the hem turned under and stitched: a soft ridge at the fold line, the edge rounded away
        float dh=.6*smoothstep(.7,0.,e)-2.*(e-2.3)/.12*.05*exp(-sq(e-2.3)/.12);
        n=normalize(vec3(-(Nv[1]-Nv[0])*2.-fold.x*1.6,1.,-(Nv[2]-Nv[0])*2.-fold.y*1.6)*vec3(far,1.,far)+vec3(od.x,0.,od.y)*dh);
        float CSZ=11.5;
        vec2 wz=cr+(vec2(Nv[3],Nv[4])-.5)*.9+vec2(fract(cs*5.3),fract(cs*9.1))*CSZ;
        vec2 id=floor(wz/CSZ), u0=(fract(wz/CSZ)-.5)*CSZ, u=u0;   // cm from the square's middle
        float hk=id.x*7.+id.y*31., h1=hN(hk,41.), h2=hN(hk,42.), h3=hN(hk,43.);
        int mo=int(mod(2.*id.x+3.*id.y+60.,6.));                  // never the same motif in two touching squares
        if(h1>.5) u.x=-u.x; if(h2>.5) u=u.yx;                     // each square painted its own way round
        u*=.88+.24*h3;
        u+=vec2(sin(u.y*.9+h1*6.),sin(u.x*.8+h2*6.))*.22+(vec2(Nv[6],Nv[3])-.5)*.5;
        float wob=Nv[6]-.5, w=.2+.42*Nv[6]*Nv[6]+.12*h2, dm;               // the paste's width runs with the hand
        if(mo==0){        // tied rings of unequal beads round a knot
          float r=length(u), k=clamp(floor(r/1.55+.5),0.,3.), R0=k*1.55;
          float ang=at2(u.y,u.x)/6.2832+.5, nb=max(1.,floor(R0*3.9)), bi=floor(ang*nb), f=fract(ang*nb)-.5;
          dm=length(vec2(r-R0,f*6.2832*R0/nb))-.36-.26*hN(bi+k*41.+hk*3.,44.);
          if(k<.5) dm=r-.65-.25*h1;
        } else if(mo==1){ // thumb-pressed dots, unequal, a few missed
          vec2 g=u/2.3+2., gi=floor(g), gf=fract(g)-.5;
          float hd=hN(gi.x+gi.y*5.+hk*3.,45.);
          dm=length(gf*2.3+(vec2(hN(gi.x*3.+gi.y+hk,46.),hN(gi.y*3.+gi.x+hk,47.))-.5)*.5)-.36-.3*hd;
          if(hd<.12||max(abs(g.x-2.),abs(g.y-2.))>2.) dm=1.;
        } else if(mo==2){ // comb strokes across the square, wavering
          float v=u.y+.45*sin(u.x*.55+h1*6.)+.3*wob;
          dm=max(abs(fract(v/2.05)*2.05-1.025)-w*.85,abs(u.x)-4.8-.7*wob);
        } else if(mo==3){ // two crossed strokes, a dot in each quarter
          vec2 q=abs(u);
          dm=max(min(abs(u.x-u.y),abs(u.x+u.y))*.7071-w*1.1,length(u)-5.);
          dm=min(dm,min(length(q-vec2(3.3,0.))-.5-.25*h2,length(q-vec2(0.,3.3))-.5-.25*h3));
        } else if(mo==4){ // nested squares, the corners rounded by the hand
          float s=mix(max(abs(u.x),abs(u.y)),length(u),.3);
          dm=max(abs(fract(s/1.75+.3)*1.75-.875)-w*.8,s-5.2);
        } else {          // chevrons stacked up a stem
          float v=u.y+abs(u.x)*.75;
          dm=max(max(abs(fract(v/1.9)*1.9-.95)-w*.8,abs(u.x)-4.6),abs(u.y)-4.8);
          dm=min(dm,max(abs(u.x)-w*.9,abs(u.y)-5.));
        }
        // the rule between squares: a broken line of pressed beads
        float bd=CSZ*.5-max(abs(u0.x),abs(u0.y)), tl=abs(u0.x)>abs(u0.y)?u0.y:u0.x;
        dm=min(dm,max(abs(bd)-.24-.12*Nv[6],abs(fract(tl/1.15+h1)-.5)*1.15-.4));
        dm+=.26*(Nv[5]-.5)+.12*(Nv[7]-.5);
        float fw=max(fwidth(dm),.01);
        float pat=smoothstep(fw+.07,-fw-.05,dm)*(.62+.38*smoothstep(0.,-.32,dm));   // the dye creeps in from the edges
        pat=mix(pat,.26,smoothstep(.15,.6,fw))*smoothstep(3.,3.8,e);        // far off it reads as a quiet figure
        float pl=.6+.4*hN(hk,48.);
        vec3 gd=mix(vec3(.010,.013,.031),vec3(.027,.037,.068),clamp(crest*.85+smoothstep(.5,.85,Nv[8])*.55,0.,1.));
        gd*=1.-.18*smoothstep(2.6,2.,e);                                     // two layers at the hem
        vec3 pale=vec3(.064,.088,.142)*pl;
        float crk=smoothstep(.07,.0,abs(Nv[7]-.5))*smoothstep(.3,.8,pat);   // crackle where the paste broke
        float wv=sin(xz.x*50.)*sin(xz.y*50.), wa=clamp(1.-fwidth(xz.x*50.)*.35,0.,1.);
        float st=smoothstep(.14,.05,abs(e-1.85))*step(.5,fract((ed.x<ed.y?cr.y:cr.x)/.75));   // the hem's stitches
        alb=mix(gd,pale,max(pat*(1.-.6*crk),st*.7))*(.9+.2*Nv[5])*(1.+.12*wv*wa);
        n=normalize(n+vec3(cos(xz.x*50.)*sin(xz.y*50.),0.,sin(xz.x*50.)*cos(xz.y*50.))*.05*wa);
        rough=.85;
      }
  }
  alb*=1.-.2*smoothstep(.5,-1.,n3(vec3(p.xz*.05,9.)));
  if(p.x>639.9) n=vec3(1.,0.,0.);
#endif
  uvec3 a8=uvec3(sqrt(clamp(alb,0.,1.))*255.+.5); uvec2 n8=uvec2(clamp(n.xz*.5+.5,0.,1.)*255.+.5);
  o=onT?uvec4(a8.x|(a8.y<<8u),a8.z|(uint(clamp(rough,0.,1.)*255.+.5)<<8u),n8.x|(n8.y<<8u),uint(clamp(ao,0.,1.)*255.+.5)):uvec4(0u);
}`,Ta=Oe+Yt+`
uniform sampler2D uF; uniform sampler2DShadow uSM;
in vec2 vU; out vec4 o;
void main(){
  gRead(); float t=gT;
  vec3 rd=ray(vU), p=uC[0].xyz+rd*t;
  vec4 f=texture(uF,vU); vec3 Fl=f.rgb*f.rgb*4.; float s=f.a;
  vec3 n=normalize(cross(dFdx(p),dFdy(p))); if(dot(n,rd)>0.) n=-n;
  float ao=1., sv=1.;
  if(t<120.&&abs(p.x)<31.&&abs(p.z)<10.){
    vec3 lc=lco(p+n*.03);
    if(s>.01){ sv=0.; for(int i=0;i<4;i++){ vec2 q=vec2(float(i&1),float(i>>1))-.5; sv+=texture(uSM,vec3(lc.xy+q*uC[14].x,lc.z-.0006)); } sv*=.25; }
    for(int i=0;i<int(uC[9].z);i++){ vec4 S=uS[i]; vec3 d=S.xyz-p; float l2=dot(d,d), r2=S.w*S.w; if(l2<r2*16.){ float l=sqrt(l2); ao*=1.-.8*clamp(dot(n,d)/l*.7+.3,0.,1.)*min(r2/l2,1.)*smoothstep(4.,1.2,l/S.w); } }
  }
#ifdef TREE
  sv*=dap(p);
#endif
  vec3 A=Fl*(1.-s)*mix(vec3(1.),uC[14].yzw,s);
  vec3 col=A*ao+(Fl-A)*sv*mix(1.,ao,.6);
  float z=t*dot(rd,uC[1].xyz);
  float coc=clamp(uC[11].y*(z-uC[11].x)/z,-1.,1.);
  o=vec4(tone(col),coc*.5+.5);
  gl_FragDepth=clamp(z/1600.,0.,1.);
}`,Ra=`#version 300 es
layout(std140) uniform U { vec4 uC[16]; vec4 uS[48]; };
layout(location=0) in vec4 aP; layout(location=1) in vec4 aQ; layout(location=2) in vec4 aA;
out vec3 vW; flat out vec4 vP, vQ, vA;
void main(){
  vec2 cr=vec2(float(gl_VertexID&1),float(gl_VertexID>>1))*2.-1.;
  vec3 c=aP.xyz, dir=normalize(c-uC[0].xyz);
  vec3 ax=normalize(cross(dir,vec3(0.,1.,0.))), ay=cross(ax,dir);
  float R=aP.w;
  vec3 w=c-dir*R*1.02+(ax*cr.x+ay*cr.y)*R*1.08;
  vec3 v=w-uC[0].xyz; float vz=dot(v,uC[1].xyz);
  gl_Position=vec4(dot(v,uC[2].xyz)/uC[0].w,dot(v,uC[3].xyz)/uC[0].w,(vz/200.-1.)*vz,vz);
  vW=w; vP=aP; vQ=aQ; vA=aA;
}`,Ma=`#version 300 es
layout(std140) uniform U { vec4 uC[16]; vec4 uS[48]; };
layout(location=0) in vec4 aP; layout(location=1) in vec4 aQ; layout(location=2) in vec4 aA;
out vec3 vW; flat out vec4 vP, vQ, vA;
void main(){
  vec2 cr=vec2(float(gl_VertexID&1),float(gl_VertexID>>1))*2.-1.;
  vec3 w=aP.xyz+(uC[8].xyz*cr.x+uC[10].xyz*cr.y)*aP.w*1.05;
  vec3 l=w-uC[7].xyz;
  gl_Position=vec4(dot(l,uC[8].xyz)*uC[7].w,dot(l,uC[10].xyz)*uC[8].w,0.,1.);
  vW=w; vP=aP; vQ=aQ; vA=aA;
}`,Uo=`
vec3 qr(vec4 q,vec3 v){ return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v); }
vec3 qi(vec4 q,vec3 v){ return qr(vec4(-q.xyz,q.w),v); }
vec3 gAx, gAl; float gTp;   // drawn axes, the axes where the ray hit (taper applied), taper
bool hitE(vec3 ro,vec3 rd,out float t,out vec3 sl){
  gAx=vA.xyz; gTp=0.;
  if(uC[15].z<1.5){ float c=fract(vA.w); gAx*=vec3(1.+.05*fract(c*17.3),.88+.1*fract(c*23.9),.8+.16*fract(c*29.1)); gTp=(fract(c*13.7)-.5)*.4; }
  vec3 lo0=qi(vQ,ro-vP.xyz), ld0=qi(vQ,rd); float h=0.; gAl=gAx; t=0.;
  for(int k=0;k<int(uC[9].x*3.);k++){   // the egg's taper by fixed-point: hit, re-taper at the hit, hit again
    vec3 lo=lo0/gAl, ld=ld0/gAl; float a=dot(ld,ld), b=dot(lo,ld), c=dot(lo,lo)-1.; h=b*b-a*c;
    t=(-b-sqrt(max(h,0.)))/a; float tp=1.+gTp*clamp((lo0.x+ld0.x*t)/gAx.x,-1.,1.); gAl=vec3(gAx.x,gAx.yz*tp); }
  sl=(lo0+ld0*t)/gAl; return h>0.;
}`,za=Oe+`
in vec3 vW; flat in vec4 vP, vQ, vA;   // depth only: no colour output, so D3D11 draws with the pixel shader built at link
`+Uo+`
void main(){
  vec3 L=uC[4].xyz, ro=vW+L*vP.w*2.5; float t; vec3 sl;
  if(!hitE(ro,-L,t,sl)) discard;
  vec3 p=ro-L*t;
  gl_FragDepth=clamp(-dot(p-uC[7].xyz,L)/uC[9].w,0.,1.);
}`,Aa=Oe+`
uniform sampler2DShadow uSM, uLD;
in vec3 vW; flat in vec4 vP, vQ, vA; out vec4 o;
`+Uo+`
void main(){
  vec3 ro=uC[0].xyz, rd=normalize(vW-ro); float t; vec3 sl;
  if(!hitE(ro,rd,t,sl)) discard;
  vec3 p=ro+rd*t, ax=gAl;
  vec3 n=normalize(qr(vQ,vec3((sl.x-dot(sl.yz,sl.yz)*gTp*gAx.x/gAl.y*gAx.y/gAx.x)/gAx.x,sl.y/gAl.y,sl.z/gAl.z)));
  float cs=fract(vA.w), K=uC[15].z;
  vec3 alb; float rough, f0=.05;
  float lat=acos(clamp(sl.x,-1.,1.));
  // one noise bank (one n3 call site): 0-3 lumps, 4-7 seed-coat mottle and cracks
  vec3 q=sl+vec3(cs*7.1,cs*3.3,cs*5.7); if(K<1.5) q*=.7+.6*fract(cs*5.9); float M[8];
  for(int i=0;i<int(uC[9].x*8.);i++){ vec3 e=i==1?vec3(.15,0.,0.):i==2?vec3(0.,.15,0.):i==3?vec3(0.,0.,.15):vec3(0.);
    M[i]=n3(i<4?q*1.7+e:i==4?q*2.6+3.:i==5?q*5.5+9.:i==6?q*13.+5.:q*6.5+1.); }
  { vec3 nl=normalize(sl/ax), lg=(vec3(M[1],M[2],M[3])-M[0])/.15; float bk=K<1.5?.13:K<2.5?.2:K<3.5?.05:.03;
    n=normalize(n-qr(vQ,lg-nl*dot(lg,nl))*bk); }
  if(K<1.5){
    // grey nickernut: grey-green, mottled, fine hairline cracks round the hilum axis, a dark hilum, a waxy coat
    float c1=fract(cs*7.31), c2=fract(cs*3.17), c3=fract(cs*11.9);
    vec3 base=mix(vec3(.088,.098,.082),vec3(.17,.172,.148),c1);
    base*=mix(vec3(1.),vec3(.9,.98,1.1),step(.66,c2));
    base*=mix(vec3(1.),vec3(1.14,1.05,.78),step(.8,c3));
    if(K>.5&&c1>.62) base=mix(vec3(.26,.20,.10),vec3(.38,.31,.17),fract(cs*13.7));
    float mot=M[4]*.55+M[5]*.45;
    alb=base*(.8+.36*mot)*(.9+.2*M[6]);   // a dull satin coat, its mottle faint
    alb*=1.-.38*smoothstep(.56,.76,M[5])*smoothstep(.3,.6,M[4]);
    alb=mix(alb,alb*vec3(1.3,1.32,1.24),smoothstep(.62,.85,M[4])*.4);
    float ln=lat*7.+(M[4]-.5)*1.2+c2*3., fw=max(fwidth(ln),.01), dl=.5-abs(fract(ln)-.5);
    float crk=(1.-smoothstep(fw*.3,fw*1.1,dl))*min(1.,.25/fw)*smoothstep(.35,.6,M[4]);
    float rc=abs(M[7]-.5), fw2=max(fwidth(M[7]),.003);
    float crk2=(1.-smoothstep(fw2*.4,fw2*1.4,rc))*min(1.,.04/fw2)*smoothstep(.62,.8,M[5]);
    alb*=(1.-.2*crk)*(1.-.22*crk2); crk=max(crk,crk2*.5);
    float hil=length(vec2(sl.y*2.4,sl.z));
    if(sl.x>0.){ alb=mix(alb,vec3(.045,.032,.022),smoothstep(.13,.09,hil)); alb=mix(alb,alb*1.22,smoothstep(.2,.15,hil)*smoothstep(.09,.13,hil)); }
    rough=.32+.2*fract(cs*5.7)+.1*(M[6]-.5); rough=mix(rough,.6,crk*.6); f0=.045;
  } else if(K<2.5){
    float typ=fract(cs*5.13);
    alb=typ<.55?mix(vec3(.15,.145,.14),vec3(.25,.24,.225),cs):typ<.8?mix(vec3(.36,.30,.23),vec3(.48,.40,.31),cs):vec3(.30,.27,.25);
    alb*=.8+.4*n3(sl*28.+cs*50.);
    vec3 vn=normalize(vec3(cos(cs*31.),sin(cs*17.)*.6,sin(cs*31.)));
    float vein=smoothstep(.07,.03,abs(dot(sl,vn)+.25*(n3(sl*3.+cs*3.)-.5)-(fract(cs*9.)-.5)*.6));
    alb=mix(alb,vec3(.72,.70,.64),vein*step(.35,fract(cs*3.7)));
    rough=.42;
  } else if(K<3.5){
    // coral red with a satin shine and a small pale scar on its edge
    alb=mix(vec3(.30,.035,.022),vec3(.40,.06,.035),cs)*(.88+.24*M[4]);
    alb=mix(alb,vec3(.018,.012,.01),smoothstep(.5,.62,sl.x+.06*(M[5]-.5)));   // the black eye
    rough=.4+.08*M[6];
  } else {
    alb=mix(vec3(.34,.3,.235),vec3(.41,.36,.28),cs);
    float mot=n3(sl*6.+cs*20.); alb=mix(alb,vec3(.42,.3,.17),smoothstep(.45,.7,mot)*smoothstep(-.2,.4,sl.y)*.75);
    alb*=1.-.25*smoothstep(.2,.0,abs(sl.y-.05))*.0;
    if(sl.y<-.45){ float sl2=abs(sl.z+.04*sin(sl.x*7.)); float teeth=smoothstep(.0,.5,sin(sl.x*55.)); alb=mix(alb,vec3(.18,.13,.08),smoothstep(.11,.04,sl2)); alb=mix(alb,alb*.82,smoothstep(.32,.12,sl2)*teeth); }
    rough=.16;
  }
  vec3 L=uC[4].xyz, V=-rd;
  float ndl=max(dot(n,L),0.);
  vec3 lc=lco(p+n*.04);
  float vis=0.;
  if(ndl>0.){ for(int i=0;i<4;i++){ vec2 q=vec2(float(i&1),float(i>>1))-.5; vec3 c3=vec3(lc.xy+q*uC[14].x,lc.z-.0005); vis+=texture(uSM,c3)*texture(uLD,vec3(c3.xy,lc.z-.0012)); } vis*=.25*win(p); }
#ifdef TREE
  vis*=dap(p);
#endif
  float ao=1.;
  for(int i=0;i<int(uC[9].z);i++){ vec4 S=uS[i]; vec3 d=S.xyz-p; float l2=dot(d,d); float r2=S.w*S.w; if(l2<r2*12.&&dot(S.xyz-vP.xyz,S.xyz-vP.xyz)>1e-4){ float l=sqrt(l2); ao*=1.-.75*clamp(dot(n,d)/l,0.,1.)*min(r2/l2,1.); } }
  ao*=1.-.42*clamp((7.-p.y)/2.4,0.,1.)*(1.-.55*max(n.y,0.));
  vec3 H=normalize(L+V);
  float a2=sq(rough*rough), nh=max(dot(n,H),0.), nv=max(dot(n,V),.02);
  float D=a2/(PI*sq(nh*nh*(a2-1.)+1.));
  float Fr=f0+(1.-f0)*pow(1.-max(dot(H,V),0.),5.);
  float G=.5/(nv*sqrt(a2+(1.-a2)*ndl*ndl)+ndl*sqrt(a2+(1.-a2)*nv*nv)+1e-4);
  vec3 amb=uC[6].rgb, bounce=vec3(.42,.28,.17)*amb*.7;
  float Fv=f0+(1.-f0)*pow(1.-nv,5.);
  vec3 R=reflect(rd,n);
  vec3 er=env(R,rough); if(R.y<0.) er=mix(er,vec3(.05,.03,.018)*(1.+2.*vis),smoothstep(.0,-.25,R.y));
  vec3 col=alb*(amb*(.6+.4*n.y)+bounce*(.5-.5*n.y))*ao+er*Fv*ao*(1.-rough)*1.6;
  col+=uC[5].rgb*vis*(alb*ndl/PI*2.6+vec3(D*G*Fr*ndl));
  // the cup's sunlit wall lights the seeds lying in its shade, as it lights the bowl itself (gIR in shade)
  { float ixs=clamp(floor(p.x/7.+3.),0.,5.); bool stS=abs(p.x)>21.;
    vec2 lcs=stS?vec2((abs(p.x)-24.3)*1.8,p.z):p.xz-vec2((ixs-2.5)*7.,p.z<0.?-3.6:3.6);
    float inB=smoothstep(stS?6.4:3.4,stS?5.2:2.4,length(lcs))*smoothstep(7.9,6.6,p.y);
    int Wk=int(uC[15].x+.5);
    vec3 wC=Wk==0?vec3(.12,.066,.034):Wk==1?vec3(.25,.175,.1):Wk==2?vec3(.05,.035,.026):Wk==3?vec3(.1,.042,.028):Wk==4?vec3(.07,.04,.027):vec3(.065,.064,.06);
    col+=alb*L.y*uC[5].rgb*wC*inB*1.8*(.75-.25*n.y)*ao; }
  float z=dot(p-ro,uC[1].xyz);
  float coc=clamp(uC[11].y*(z-uC[11].x)/z,-1.,1.);
  o=vec4(tone(col),coc*.5+.5);
  gl_FragDepth=clamp(z/1600.,0.,1.);
}`,Fa=`#version 300 es
precision highp float; uniform sampler2D uM; uniform vec4 uP, uK; in vec2 vU; out vec4 o;
vec2 tc(vec2 u){ return min(u*uK.xy,uK.zw); }
void main(){ vec2 e=uP.xy; vec4 a=texture(uM,tc(vU+vec2(-e.x,-e.y))), b=texture(uM,tc(vU+vec2(e.x,-e.y))), c=texture(uM,tc(vU+vec2(-e.x,e.y))), d=texture(uM,tc(vU+e));
  vec4 w=vec4(abs(a.a-.5),abs(b.a-.5),abs(c.a-.5),abs(d.a-.5))*2.+.05;
  o=vec4((a.rgb*w.x+b.rgb*w.y+c.rgb*w.z+d.rgb*w.w)/(w.x+w.y+w.z+w.w),min(min(a.a,b.a),min(c.a,d.a))*.5+(a.a+b.a+c.a+d.a)*.125); }`,ka=`#version 300 es
precision highp float; uniform sampler2D uM; uniform vec4 uP, uK; in vec2 vU; out vec4 o;
void main(){ vec4 s=vec4(0.); float ws=0.; for(int i=-6;i<=6;i++){ float w=exp(-float(i*i)/14.); s+=texture(uM,min((vU+uP.xy*float(i))*uK.xy,uK.zw))*w; ws+=w; } o=s/ws; }`,Na=`#version 300 es
precision highp float; uniform sampler2D uM, uB, uN; uniform vec4 uP, uK, uK2; in vec2 vU; out vec4 o;
float lu(vec3 c){ return dot(c,vec3(.299,.587,.114)); }
vec3 tx(vec2 u){ return texture(uM,min(u,uK.zw)).rgb; }
void main(){
  vec2 c=vU*uK.xy, d=vec2(uK.x/uP.x);
  vec4 s=texture(uM,min(c,uK.zw)), b=texture(uB,min(vU*uK2.xy,uK2.zw));
  // the baked board and the seed impostors are whole-pixel silhouettes: one soft pixel along each edge (after FXAA's
  // console pass: four corner taps, then two or four along the edge where there is one)
  float lNW=lu(tx(c-d*.5)), lNE=lu(tx(c+d*vec2(.5,-.5))), lSW=lu(tx(c+d*vec2(-.5,.5))), lSE=lu(tx(c+d*.5)), lM=lu(s.rgb);
  float lMin=min(lM,min(min(lNW,lNE),min(lSW,lSE))), lMax=max(lM,max(max(lNW,lNE),max(lSW,lSE)));
  vec3 cs=s.rgb;
  if(lMax-lMin>max(.035,lMax*.12)){
    vec2 dir=vec2(lSW+lSE-lNW-lNE,lNW+lSW-lNE-lSE);
    dir=clamp(dir/(min(abs(dir.x),abs(dir.y))+max((lNW+lNE+lSW+lSE)*.03125,.0078)),-5.,5.)*d;
    vec3 A=.5*(tx(c-dir*.1667)+tx(c+dir*.1667)), B=A*.5+.25*(tx(c-dir*.5)+tx(c+dir*.5));
    float lB=lu(B); cs=lB<lMin||lB>lMax?A:B;
  }
  float coc=abs(s.a*2.-1.), near=clamp((.5-b.a)*2.4,0.,1.);
  float m=smoothstep(.1,.6,max(coc,near));
  vec3 col=mix(cs,b.rgb,m);
  vec2 q=vU-.5; col*=1.-.32*dot(q,q)*1.6;
  float gr=texture(uN,vU*uP.x/256.+uP.yz).w-.5;
  col+=gr*.022;
  o=vec4(col,1.);
}`,Ca=()=>{const e=(d,w)=>{const R=t.createShader(d);return t.shaderSource(R,w),t.compileShader(R),R},s=[],n=(d,w,R)=>{const N=t.createProgram(),k=e(t.VERTEX_SHADER,d),_=e(t.FRAGMENT_SHADER,w);return t.attachShader(N,k),t.attachShader(N,_),t.linkProgram(N),s.push([N,k,_,R]),N},o=d=>Ea.replace("int T=int(uC[15].y+.5);","const int T="+d+";"),a=d=>Aa.replace("float cs=fract(vA.w), K=uC[15].z;","float cs=fract(vA.w); const float K="+d+".;").replace("if(K>.5&&c1>.62)","if(uC[15].z>.5&&c1>.62)"),r=(d,w)=>w?d.replace(`#version 300 es
`,`#version 300 es
`+w):d,c=d=>d?`#define GROUND
#define `+(d===1?"EARTH":"ROCK")+`
`:"",l={geom:{},shade:{},comp:{},tab:[],seed:{}},u=(d,w,R,N)=>{const k=N?`#define TREE
`:"",_=(w<2?0:w)+(N?"T":"");return l.geom[R]||(l.geom[R]=n(Be,r(wa,c(R)),{uN:0})),l.shade[R+k]||(l.shade[R+k]=n(Be,r(ya,c(R)+k),{uN:0,uG:1,uTm:2})),l.comp[N]||(l.comp[N]=n(Be,r(Ta,k),{uN:0,uG:1,uF:2,uSM:3})),l.sm||(l.sm=n(Ma,za,{uN:0}),l.down=n(Be,Fa,{uM:5}),l.blur=n(Be,ka,{uM:5}),l.fin=n(Be,Na,{uM:5,uB:6,uN:0})),l.tab[d]||(l.tab[d]=n(Be,r(o(d),c(d-2>0?d-2:0)),{uN:0,uG:1})),l.seed[_]||(l.seed[_]=n(Ra,r(a(w<2?0:w),k),{uN:0,uSM:3,uLD:4})),t.flush(),{geom:l.geom[R],shade:l.shade[R+k],comp:l.comp[N],tab:l.tab[d],seed:l.seed[_]}},f=()=>{for(const[d,w,R,N]of s.splice(0)){if(!t.getProgramParameter(d,t.LINK_STATUS))throw new Error("266 link: "+t.getProgramInfoLog(d)+t.getShaderInfoLog(w)+t.getShaderInfoLog(R));t.useProgram(d);const k=t.getUniformBlockIndex(d,"U");k!==t.INVALID_INDEX&&t.uniformBlockBinding(d,k,0);for(const _ in N){const Re=t.getUniformLocation(d,_);Re&&t.uniform1i(Re,N[_])}d.uP=t.getUniformLocation(d,"uP"),d.uMode=t.getUniformLocation(d,"uMode"),d.uK=t.getUniformLocation(d,"uK"),d.uK2=t.getUniformLocation(d,"uK2")}};let i=-1640531527;const p=()=>{i=i+1831565813|0;let d=Math.imul(i^i>>>15,1|i);return d=d+Math.imul(d^d>>>7,61|d)^d,(d^d>>>14)>>>0&255},y=new Uint8Array(256*256*4);for(let d=0;d<65536;d++)y[d*4]=p(),y[d*4+2]=p(),y[d*4+3]=p();for(let d=0;d<256;d++)for(let w=0;w<256;w++)y[(d*256+w)*4+1]=y[((d+17&255)*256+(w+37&255))*4];const T=t.createTexture();t.bindTexture(t.TEXTURE_2D,T),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,y),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const A=d=>{const w=t.createTexture();t.bindTexture(t.TEXTURE_2D,w),t.texStorage2D(t.TEXTURE_2D,1,t.DEPTH_COMPONENT16,d,d),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_COMPARE_FUNC,t.LEQUAL);const R=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,R),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,w,0),t.drawBuffers([t.NONE]),t.readBuffer(t.NONE),t.bindFramebuffer(t.FRAMEBUFFER,null),{t:w,f:R}},m=A(1024),U=t.createVertexArray();return{P:l,tN:T,sm:m,depthTex:A,vao0:U,tg:null,want:u,ready:f,nd:y}},I=t.__c266||(t.__c266=Ca()),{P:O,tN:Zt,vao0:_o}=I,me=I.want(Wt,le,V,ca),Do=(e,s,n,o)=>{const a=t.createTexture();t.bindTexture(t.TEXTURE_2D,a),t.texStorage2D(t.TEXTURE_2D,1,o||t.RGBA8,e,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const r=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,a,0),t.bindFramebuffer(t.FRAMEBUFFER,null),{t:a,f:r}},xe=Math.max(16,Math.ceil(E/4));let F=I.tg;if(!F||F.dead){const e=s=>{const n=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),{t:n,f:t.createFramebuffer()}};F=I.tg={sz:0,q:0,uw:0,users:new Set,dead:!1,m:e(t.LINEAR),a:e(t.LINEAR),b:e(t.LINEAR),u:e(t.NEAREST),rb:t.createRenderbuffer()},It(t,F,E);for(const s of[F.m,F.a,F.b,F.u])t.bindFramebuffer(t.FRAMEBUFFER,s.f),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,s.t,0);t.bindFramebuffer(t.FRAMEBUFFER,F.m.f),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,F.rb),t.bindFramebuffer(t.FRAMEBUFFER,null)}else F.sz<E&&It(t,F,E);const Jt=Do(E,E,t.NEAREST,t.RGBA16UI),So=Do(E,E,t.NEAREST),At=I.depthTex(1024),Ua=F.uw===1024?F.u.t:I.ldC||(I.ldC=(()=>{const e=t.createTexture();return t.bindTexture(t.TEXTURE_2D,e),t.texStorage2D(t.TEXTURE_2D,1,t.R8UI,1024,1024),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),e})());t.bindFramebuffer(t.FRAMEBUFFER,At.f),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ua,0),t.drawBuffers([t.COLOR_ATTACHMENT0]),t.bindFramebuffer(t.FRAMEBUFFER,null);const $t=t.createBuffer(),B=new Float32Array(64*4);t.bindBuffer(t.UNIFORM_BUFFER,$t),t.bufferData(t.UNIFORM_BUFFER,B.byteLength,t.DYNAMIC_DRAW);const M=48,j=new Float32Array(M*12),Po=t.createBuffer(),eo=t.createVertexArray();t.bindVertexArray(eo),t.bindBuffer(t.ARRAY_BUFFER,Po),t.bufferData(t.ARRAY_BUFFER,j.byteLength,t.DYNAMIC_DRAW);for(let e=0;e<3;e++)t.enableVertexAttribArray(e),t.vertexAttribPointer(e,4,t.FLOAT,!1,48,e*16),t.vertexAttribDivisor(e,1);t.bindVertexArray(null);const W=(e,s,n,o,a)=>{B[e*4]=s,B[e*4+1]=n,B[e*4+2]=o,B[e*4+3]=a};W(0,P[0],P[1],P[2],Vt),W(1,...ge,0),W(2,...rt,0),W(3,...zt,0),W(4,...ye,qe==="Through shutters"?1:0),W(5,...jt,7+ye[1]/-ye[2]*78+24+fa),W(6,...Qt,.86),W(7,...da,ua),W(8,...ko,va),W(9,1,0,48,pa),W(10,...ha,0),W(11,xa,.7,0,E),W(12,-14+(b()-.5)*2.5,-2.4+b()*4.8,b()*50,yo),W(13,-11-b()*14,(b()-.5)*18,(b()-.5)*.05,1+b()*.7),W(14,1.4/1024,...ma),B[37]=b()*46,W(15,la,Wt,le,ke[5]),Wt===2&&(B[7]=Tt[0],B[11]=Tt[1],B[15]=Tt[2],B[43]=Tt[3]);const qo=()=>{t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.colorMask(!0,!0,!0,!0),t.depthMask(!0),t.bindBufferBase(t.UNIFORM_BUFFER,0,$t)},X=(e,s)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,s)},Ne=(e,s,n,o)=>{t.bindFramebuffer(t.FRAMEBUFFER,s),t.viewport(0,0,n,o),t.useProgram(e),t.bindVertexArray(_o),t.drawArrays(t.TRIANGLES,0,3)},ct=981,Ft=(e,s,n)=>{const o=Math.max(n-Math.abs(e-s),0)/n;return Math.max(e,s)+o*o*n*.25},Bo=(e,s,n,o,a,r,c)=>{const l=Math.abs(e)-o+c,u=Math.abs(s)-a+c,f=Math.abs(n)-r+c,i=Math.max(l,0),p=Math.max(u,0),y=Math.max(f,0);return Math.sqrt(i*i+p*p+y*y)+Math.min(Math.max(l,u,f),0)-c},Lo=(e,s,n,o,a,r)=>{const c=Math.hypot(e/o,s/a,n/r),l=Math.hypot(e/(o*o),s/(a*a),n/(r*r));return c*(c-1)/l},$=new Float64Array(48);for(let e=0;e<12;e++){const s=((Math.floor(B[50])+100)*256+e)*4;$[e*4]=(I.nd[s]/255-.5)*.36,$[e*4+1]=I.nd[s+1]/255,$[e*4+2]=(I.nd[s+2]/255-.5)*.3,$[e*4+3]=(I.nd[s+3]/255-.5)*.09}const lt=new Float64Array(48);for(let e=0;e<48;e++)lt[e]=I.nd[((Math.floor(B[50])+130)*256+(e>>2))*4+(e&3)]/255-.5;const it=(e,s,n)=>{const o=Math.min(1,Math.max(0,(n-e)/(s-e)));return o*o*(3-2*o)},We=V?(e,s,n)=>{const o=Math.min(5,Math.max(0,Math.floor(e/7+3))),a=n<0?0:1,r=(o+a*6)*4,c=$[r+3],l=e-(o-2.5)*7-$[r],u=n-(a?ve:-ve)-$[r+2],f=Math.hypot(l,u)||.001,i=l/f,p=u/f,y=(.42*(lt[r]*(i*i-p*p)+lt[r+1]*2*i*p)+.3*(lt[r+2]*i*(4*i*i-3)+lt[r+3]*p*(3-4*p*p)))*it(.6,2.4,f);let T=Ft(s-7,To+y-Math.hypot(l*(1+c),s-Ro,u*(1-c)),V===1?.75+.5*$[r+1]:.3+.25*$[r+1]);const A=l*.55,m=u-(a?2.9:-2.9),U=A*A+m*m;if(V===1){T+=.5*Math.exp(-U*.7)*it(5.5,7,s);const d=Math.hypot(e-(o-2.5)*7,n-(a?ve:-ve))-3,w=(Math.hypot((Math.abs(e)-K)/3.3,n/6)-1)*4,R=Math.min(d,w);T-=it(29.5,26,Math.abs(e))*it(8.4,7,Math.abs(n))*Math.exp(-(((R-.7)/.6)**2))*.24*(1-.6*Math.exp(-U*.5))}else T+=.14*Math.exp(-U)*it(5.5,7,s);return Ft(T,-.62*Lo(e-(e<0?-K:K),s-Mo,n,3.3,2.65,6),.3)}:(e,s,n)=>{let o=yo?Bo(e,s-4.85,n,29.1,2.15,7.95,.8):Bo(e,s-4.3,n,29.1,2.7,7.95,.8);const a=Math.min(5,Math.max(0,Math.floor(e/7+3))),r=(a+(n<0?0:6))*4,c=$[r+3];return o=Ft(o,To-Math.hypot((e-(a-2.5)*7-$[r])*(1+c),s-Ro,(n-(n<0?-ve:ve)-$[r+2])*(1-c)),.3+.3*$[r+1]),o=Ft(o,-.62*Lo(e-(e<0?-K:K),s-Mo,n,3.3,2.65,6),.3),Math.min(o,s)},v=new Float64Array(M*3),Q=new Float64Array(M*3),x=new Float64Array(M*3),z=new Float64Array(M*3),g=new Float64Array(M*4),ae=new Float64Array(M*4),se=new Float64Array(M*3),Xe=new Float64Array(M*3),Ce=new Float64Array(M),ee=new Float64Array(M),kt=new Float64Array(M),D=new Int8Array(M),L=new Uint8Array(M),Ue=new Float64Array(M),ft=new Float64Array(M),ht=new Uint8Array(M);for(let e=0;e<M;e++){let s,n,o;if(le<=1){const i=.82+(b()-.5)*.14;s=i*(1.01+b()*.09),n=i*(.78+b()*.12),o=i*(.92+b()*.08)}else if(le===2){const i=.74+b()*.24;s=1.08*i,n=.62*i*(.85+.3*b()),o=.86*i*(.9+.2*b())}else if(le===3){const i=.57+(b()-.5)*.06;s=i*1.1,n=i*.6,o=i*.98}else{const i=.74+b()*.16;s=1.2*i,n=.64*i,o=.84*i}se[e*3]=s,se[e*3+1]=n,se[e*3+2]=o,ee[e]=Math.max(s,n,o);const a=s*n*o;Ce[e]=1/a,Xe[e*3]=5/(a*(n*n+o*o)),Xe[e*3+1]=5/(a*(s*s+o*o)),Xe[e*3+2]=5/(a*(s*s+n*n)),kt[e]=b()+e;const r=b(),c=b()*6.2832,l=b()*6.2832,u=Math.sqrt(1-r),f=Math.sqrt(r);g[e*4]=u*Math.sin(c),g[e*4+1]=u*Math.cos(c),g[e*4+2]=f*Math.sin(l),g[e*4+3]=f*Math.cos(l)}const ne=[0,0,0],ie=[0,0,0],Nt=(e,s,n,o,a,r)=>{const c=r?-g[e*4]:g[e*4],l=r?-g[e*4+1]:g[e*4+1],u=r?-g[e*4+2]:g[e*4+2],f=g[e*4+3],i=2*(l*o-u*n),p=2*(u*s-c*o),y=2*(c*n-l*s);a[0]=s+f*i+l*y-u*p,a[1]=n+f*p+u*i-c*y,a[2]=o+f*y+c*p-l*i},to=(e,s,n,o,a)=>{Nt(e,s,n,o,ie,!0),Nt(e,ie[0]*Xe[e*3],ie[1]*Xe[e*3+1],ie[2]*Xe[e*3+2],a,!1)},oo=(e,s,n,o,a)=>{Nt(e,s,n,o,ie,!0);const r=se[e*3],c=se[e*3+1],l=se[e*3+2],u=r*r*ie[0],f=c*c*ie[1],i=l*l*ie[2],p=Math.sqrt(u*ie[0]+f*ie[1]+i*ie[2])||1e-9;Nt(e,u/p,f/p,i/p,a,!1)},Io=(e,s,n,o,a)=>{const r=e*4,c=g[r],l=g[r+1],u=g[r+2],f=g[r+3],i=.5*a;g[r]+=i*(s*f+n*u-o*l),g[r+1]+=i*(n*f+o*c-s*u),g[r+2]+=i*(o*f+s*l-n*c),g[r+3]+=i*(-s*c-n*l-o*u);const p=1/Math.hypot(g[r],g[r+1],g[r+2],g[r+3]);g[r]*=p,g[r+1]*=p,g[r+2]*=p,g[r+3]*=p},He=(e,s,n,o,a,r,c)=>{const l=n*c-o*r,u=o*a-s*c,f=s*r-n*a;return to(e,l,u,f,ne),Ce[e]+l*ne[0]+u*ne[1]+f*ne[2]},Go=(e,s,n,o,a,r,c,l)=>{v[e*3]+=a*Ce[e]*l,v[e*3+1]+=r*Ce[e]*l,v[e*3+2]+=c*Ce[e]*l,to(e,n*c-o*r,o*a-s*c,s*r-n*a,ne),Io(e,ne[0],ne[1],ne[2],l)},Ct=(e,s,n,o,a,r,c,l)=>{x[e*3]+=a*Ce[e]*l,x[e*3+1]+=r*Ce[e]*l,x[e*3+2]+=c*Ce[e]*l,to(e,n*c-o*r,o*a-s*c,s*r-n*a,ne),z[e*3]+=ne[0]*l,z[e*3+1]+=ne[1]*l,z[e*3+2]+=ne[2]*l},_e=400,Oo=new Int16Array(_e),Wo=new Int16Array(_e),Ke=new Float64Array(_e*3),Ve=new Float64Array(_e*3),je=new Float64Array(_e*3),Xo=new Float64Array(_e),Ho=new Float64Array(_e);let Qe=0;const dt=(e,s,n,o,a)=>{const r=z[e*3],c=z[e*3+1],l=z[e*3+2];a[0]=x[e*3]+c*o-l*n,a[1]=x[e*3+1]+l*s-r*o,a[2]=x[e*3+2]+r*n-c*s},re=[0,0,0],Y=[0,0,0],G=[0,0,0],Le=[0,0,0],te=[];let Ee=0;const _a=(e,s,n)=>{Ee-ft[e]<.012||te.length>40||(ft[e]=Ee,s>=0&&(ft[s]=Ee),te.push([Ee,s<0?0:1,n,kt[e]%1,v[e*3]]))},Ko=(e,s,n,o,a,r,c,l,u,f,i,p)=>{const y=He(e,c,l,u,n,o,a),T=s>=0&&L[s]?He(s,f,i,p,n,o,a):0,A=r/(y+T);if(Qe<_e){const m=Qe++;Oo[m]=e,Wo[m]=s,Ke[m*3]=n,Ke[m*3+1]=o,Ke[m*3+2]=a,Ve[m*3]=c,Ve[m*3+1]=l,Ve[m*3+2]=u,je[m*3]=f,je[m*3+1]=i,je[m*3+2]=p,Ho[m]=A,dt(e,c,l,u,re),s>=0?dt(s,f,i,p,Y):Y[0]=Y[1]=Y[2]=0,Xo[m]=(re[0]-Y[0])*n+(re[1]-Y[1])*o+(re[2]-Y[2])*a}Go(e,c,l,u,n*A,o*A,a*A,1),T>0&&Go(s,f,i,p,n*A,o*A,a*A,-1)},Da=le===4?.32:le===2?.5:.4,Sa=le===2?.3:.4,ao=(e,s)=>{Ee+=e;for(let o=0;o<M;o++){if(!L[o])continue;const a=o*3;Q[a]=v[a],Q[a+1]=v[a+1],Q[a+2]=v[a+2],ae[o*4]=g[o*4],ae[o*4+1]=g[o*4+1],ae[o*4+2]=g[o*4+2],ae[o*4+3]=g[o*4+3],x[a+1]-=ct*e,v[a]+=x[a]*e,v[a+1]+=x[a+1]*e,v[a+2]+=x[a+2]*e,Io(o,z[a],z[a+1],z[a+2],e)}Qe=0;for(let o=0;o<M;o++){if(!L[o])continue;const a=o*3;ht[o]=0;const r=v[a],c=v[a+1],l=v[a+2];if(We(r,c,l)<ee[o]+.05){const i=We(r+.004,c-.004,l-.004),p=We(r-.004,c-.004,l+.004),y=We(r-.004,c+.004,l-.004),T=We(r+.004,c+.004,l+.004);let A=i-p-y+T,m=-i-p+y+T,U=-i+p-y+T;const d=Math.hypot(A,m,U)||1;A/=d,m/=d,U/=d,oo(o,-A,-m,-U,G);const w=We(r+G[0],c+G[1],l+G[2]);w<0&&(Ko(o,-1,A,m,U,-w,G[0],G[1],G[2],0,0,0),ht[o]=1)}for(let f=0;f<M;f++){if(f===o||L[f]&&f<o||s&&D[f]!==D[o])continue;const i=f*3,p=r-v[i],y=c-v[i+1],T=l-v[i+2],A=ee[o]+ee[f],m=p*p+y*y+T*T;if(m>=A*A||m<1e-12)continue;const U=Math.sqrt(m),d=p/U,w=y/U,R=T/U;oo(o,-d,-w,-R,G),oo(f,d,w,R,Le);const N=-(G[0]*d+G[1]*w+G[2]*R),k=Le[0]*d+Le[1]*w+Le[2]*R,_=N+k-U;if(!(_<=0)){if(!L[f]&&(dt(o,G[0],G[1],G[2],re),re[0]*d+re[1]*w+re[2]*R<-16||_>.05)){L[f]=1,Ue[f]=0,Q[i]=v[i],Q[i+1]=v[i+1],Q[i+2]=v[i+2];for(let be=0;be<4;be++)ae[f*4+be]=g[f*4+be]}Ko(o,f,d,w,R,_,G[0],G[1],G[2],Le[0],Le[1],Le[2])}}}const n=1/e;for(let o=0;o<M;o++){if(!L[o])continue;const a=o*3,r=o*4;x[a]=(v[a]-Q[a])*n,x[a+1]=(v[a+1]-Q[a+1])*n,x[a+2]=(v[a+2]-Q[a+2])*n;const c=-ae[r],l=-ae[r+1],u=-ae[r+2],f=ae[r+3],i=g[r],p=g[r+1],y=g[r+2],T=g[r+3];let A=T*c+i*f+p*u-y*l,m=T*l+p*f+y*c-i*u,U=T*u+y*f+i*l-p*c;const d=T*f-i*c-p*l-y*u,w=d<0?-2*n:2*n;z[a]=A*w,z[a+1]=m*w,z[a+2]=U*w}for(let o=0;o<Qe;o++){const a=Oo[o],r=Wo[o],c=Ke[o*3],l=Ke[o*3+1],u=Ke[o*3+2],f=Ve[o*3],i=Ve[o*3+1],p=Ve[o*3+2],y=je[o*3],T=je[o*3+1],A=je[o*3+2],m=r>=0&&L[r];dt(a,f,i,p,re),m?dt(r,y,T,A,Y):Y[0]=Y[1]=Y[2]=0;const U=re[0]-Y[0],d=re[1]-Y[1],w=re[2]-Y[2],R=U*c+d*l+w*u;let N=U-c*R,k=d-l*R,_=w-u*R;const Re=Math.hypot(N,k,_);if(Re>1e-6){N/=Re,k/=Re,_/=Re;const po=He(a,f,i,p,N,k,_)+(m?He(r,y,T,A,N,k,_):0),Pe=Math.min(Da*Ho[o]*n,Re/po);Ct(a,f,i,p,-N*Pe,-k*Pe,-_*Pe,1),m&&Ct(r,y,T,A,-N*Pe,-k*Pe,-_*Pe,-1)}const be=Xo[o];if(be<0){const po=be<-2*ct*e*4&&!s?Sa:0,Pe=Math.max(-po*be,0),ta=Pe-R;if(ta>0){const Wa=He(a,f,i,p,c,l,u)+(m?He(r,y,T,A,c,l,u):0),ot=ta/Wa;Ct(a,f,i,p,c*ot,l*ot,u*ot,1),m&&Ct(r,y,T,A,c*ot,l*ot,u*ot,-1)}be<-9&&_a(a,r,-be)}}for(let o=0;o<M;o++){if(!L[o])continue;const a=o*3,r=1-.08*e,c=ht[o]?Math.exp(-e*3.5):1-.1*e;if(x[a]*=r,x[a+1]*=r,x[a+2]*=r,z[a]*=c,z[a+1]*=c,z[a+2]*=c,s){const f=Math.hypot(x[a],x[a+1],x[a+2]),i=f>25?25/f:.985;x[a]*=i,x[a+1]*=i,x[a+2]*=i}const l=x[a]*x[a]+x[a+1]*x[a+1]+x[a+2]*x[a+2],u=z[a]*z[a]+z[a+1]*z[a+1]+z[a+2]*z[a+2];if(l<6&&u<9){if(Ue[o]+=e,Ue[o]>(s?.12:.3)){const f=zo(v[a],v[a+1],v[a+2],D[o]);if(f>=0||D[o]<0)f>=0&&D[o]>=0&&(D[o]=f),L[o]=0,x[a]=x[a+1]=x[a+2]=0,z[a]=z[a+1]=z[a+2]=0;else{Ue[o]=0;const i=D[o],p=st(i)-v[a],y=yt(i)-v[a+2],T=Math.hypot(p,y)||1;x[a]+=p/T*9,x[a+2]+=y/T*9}}}else Ue[o]=0;v[a+1]<-20&&(v[a+1]=0)}},Ye=(e,s)=>{let n=0;for(let o=s*6;o<s*6+6;o++)n+=e[o];return n},Vo=(e,s)=>{const n=[];let o=e[s],a=s;for(;o>0;)a=(a+1)%12,a!==s&&(n.push(a),o--);return n},Ut=(e,s,n)=>{const o=Vo(e,s);e[s]=0;for(const l of o)e[l]++;let a=o[o.length-1];const r=[];for(;Math.floor(a/6)!==n&&(e[a]===2||e[a]===3)&&(r.push(a),a=a-1,!(a<0||Math.floor(a/6)===n)););let c=0;for(const l of r)c+=e[l];if(r.length&&c===Ye(e,1-n))return[];for(const l of r)e[12+n]+=e[l],e[l]=0;return r},_t=(e,s)=>{const n=[],o=Ye(e,1-s)===0;for(let a=s*6;a<s*6+6;a++)e[a]&&(o&&e[a]<s*6+6-a||n.push(a));return n},jo=(e,s,n,o,a)=>{if(e[12+s]>=25)return 100;if(e[13-s]>=25)return-100;const r=_t(e,s);if(!r.length)return e[12+s]+Ye(e,s)-(e[13-s]+Ye(e,1-s));if(n===0)return e[12+s]-e[13-s]+.05*(Ye(e,s)-Ye(e,1-s));let c=-1e9;for(const l of r){const u=e.slice();Ut(u,l,s);const f=-jo(u,1-s,n-1,-a,-o);if(f>c&&(c=f),f>o&&(o=f),o>=a)break}return c};let Ie=S^1540483477;const fe=()=>{Ie=Ie+1831565813|0;let e=Math.imul(Ie^Ie>>>15,1|Ie);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},so=(e,s,n)=>{const o=_t(e,s);if(!o.length)return-1;const a=n==="Sly"?6:n==="Careful"?4:n==="demo"?2:3,r=n==="Sly"?0:n==="Careful"?.5:2,c=o.map(f=>{const i=e.slice();return Ut(i,f,s),-jo(i,1-s,a-1,-1e9,1e9)}),l=Math.max(...c),u=o.filter((f,i)=>c[i]>=l-r-1e-9);return u[Math.floor(fe()*u.length)%u.length]},Dt=()=>{const e=new Array(14).fill(0);for(let s=0;s<M;s++)D[s]>=0&&e[D[s]]++;return e};let Z=[4,4,4,4,4,4,4,4,4,4,4,4,0,0],he=0,Te=0,Ze=0;const Ge=I.mints||(I.mints=[]),C=Ge.find(e=>e.hash===h.hash);if(!C){const e=we==="Opening"?0:we==="Midgame"?9+Math.floor(b()*8):we==="Rout"?30+Math.floor(b()*10):26+Math.floor(b()*14);for(let n=0;n<e;n++){const o=so(Z,he,"demo");if(o<0)break;const a=Z.slice(),r=Ut(a,o,he);if(a[12]>=22||a[13]>=22)break;Z=a,r.length&&(Ze=Te),he=1-he,Te++}if(we==="Rout"){const n=Math.hypot(P[0]+K,P[2])<=Math.hypot(P[0]-K,P[2])?12:13,o=21+Math.floor(bt()*3);for(;Z[n]<o;){let a=-1;for(let r=0;r<12;r++)Z[r]>0&&(a<0||Z[r]>Z[a])&&(a=r);if(a<0||Z.slice(0,12).reduce((r,c)=>r+c,0)<=7)break;Z[a]--,Z[n]++}}we!=="Opening"&&(he=0);const s=(n,o,a)=>{const r=o*2.39996+b()*.6,c=Math.min(1.7,.75*Math.sqrt(o+b()));return n>=12?[(n===12?-K:K)+Math.cos(r)*Math.min(1.6,c),oe-1.4+Math.floor(o/9)*1.5+b()*.3,(o%9-4)*1.15+(b()-.5)*.5]:[gt(n)+Math.cos(r)*c,oe-1.5+o*.62,Xt(n)+Math.sin(r)*c]};{let n=0;for(let o=0;o<14;o++)for(let a=0;a<Z[o];a++,n++){D[n]=o;const r=s(o,a,Z[o]);v[n*3]=r[0],v[n*3+1]=r[1],v[n*3+2]=r[2],L[n]=1}for(let o=0;o<160;o++)ao(1/120,!0);for(let o=0;o<3;o++){let a=0;for(let r=0;r<M;r++)zo(v[r*3],v[r*3+1],v[r*3+2],D[r])!==D[r]&&(v[r*3]=st(D[r])+(b()-.5),v[r*3+1]=oe+2.5+a*1.8,v[r*3+2]=yt(D[r])+(b()-.5),x[r*3]=x[r*3+1]=x[r*3+2]=0,L[r]=1,a++);if(!a)break;for(let r=0;r<110;r++)ao(1/120,!0)}for(let o=0;o<M;o++)L[o]=0,x[o*3]=x[o*3+1]=x[o*3+2]=0,z[o*3]=z[o*3+1]=z[o*3+2]=0;te.length=0}}C?(Ge.splice(Ge.indexOf(C),1),Ge.unshift(C),v.set(C.X),Q.set(C.XP),x.set(C.V),z.set(C.W),g.set(C.Q),ae.set(C.QP),D.set(C.loc),L.set(C.aw),Ue.set(C.calm),ft.set(C.lastHit),ht.set(C.inC),Z=C.board0.slice(),he=C.turn,Te=C.moves,Ze=C.lastCap,Ee=C.simT,S=C.hs,ue=C.hs2,Ie=C.gS,Qe=C.nc):(Ge.unshift({hash:h.hash,board0:Z.slice(),X:v.slice(),XP:Q.slice(),V:x.slice(),W:z.slice(),Q:g.slice(),QP:ae.slice(),loc:D.slice(),aw:L.slice(),calm:Ue.slice(),lastHit:ft.slice(),inC:ht.slice(),turn:he,moves:Te,lastCap:Ze,simT:Ee,hs:S,hs2:ue,gS:Ie,nc:Qe}),Ge.length=Math.min(Ge.length,2)),I.ready();const Qo=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,Qo),t.bufferData(t.UNIFORM_BUFFER,B,t.STATIC_DRAW),qo(),t.bindBufferBase(t.UNIFORM_BUFFER,0,Qo),t.disable(t.DEPTH_TEST),X(0,Zt),X(2,null),t.useProgram(me.geom),t.uniform1f(me.geom.uMode,0),Ne(me.geom,Jt.f,E,E),X(1,Jt.t),Ne(me.tab,F.u.f,E,E),X(2,F.u.t),Ne(me.shade,So.f,E,E),X(2,null),t.enable(t.DEPTH_TEST),t.depthFunc(t.ALWAYS),t.bindFramebuffer(t.FRAMEBUFFER,At.f),t.viewport(0,0,1024,1024),t.clear(t.DEPTH_BUFFER_BIT),t.useProgram(me.geom),t.uniform1f(me.geom.uMode,1),Ne(me.geom,At.f,1024,1024),t.flush();const q=[];let J=null,St=0;const de=e=>({d:e,s(){},u(){}}),De=e=>({d:0,s:e}),no=e=>{L[e]=1,Ue[e]=0,Q[e*3]=v[e*3],Q[e*3+1]=v[e*3+1],Q[e*3+2]=v[e*3+2];for(let s=0;s<4;s++)ae[e*4+s]=g[e*4+s]},Pa=1.2,Yo=(e,s)=>{const n=e*3,o=v[n],a=v[n+1],r=v[n+2],c=s>=12;let l=0,u=0,f=1e9;for(let m=0;m<7;m++){const U=m?(c?1.6:1.1)*(.6+.4*fe()):0,d=m*1.047+fe()*.8,w=st(s)+Math.cos(d)*U*(c?1.4:1),R=yt(s)+Math.sin(d)*U*(c?2.8:1);let N=oe-1.6+.25*U;for(let k=0;k<M;k++)if(k!==e&&D[k]===s){const _=Math.hypot(v[k*3]-w,v[k*3+2]-R);_<ee[k]+ee[e]&&(N=Math.max(N,v[k*3+1]+Math.sqrt((ee[k]+ee[e])**2-_*_)*.8))}N+.25*fe()<f&&(f=N,l=w,u=R)}f=Math.min(f,oe+1);const i=Math.hypot(l-o,u-r),p=Math.max(a+.5,f,oe+ee[e])+.9+i*.05+fe()*.3,y=Math.sqrt(2*ct*(p-a)),T=y/ct+Math.sqrt(2*(p-f)/ct);for(let m=0;m<M;m++)!L[m]&&m!==e&&Math.hypot(v[m*3]-o,v[m*3+1]-a,v[m*3+2]-r)<ee[m]+ee[e]+.5&&no(m);no(e),D[e]=s,x[n]=(l-o)/T,x[n+1]=y,x[n+2]=(u-r)/T;const A=(Pa+fe()*.5)/ee[e]/T;z[n]=-(u-r)*A+(fe()-.5)*8,z[n+1]=(fe()-.5)*8,z[n+2]=(l-o)*A+(fe()-.5)*8},qa=(e,s)=>De(()=>{let n=-1,o=-1e9;for(let a=0;a<M;a++)D[a]===e&&v[a*3+1]>o&&(!L[a]||Math.abs(x[a*3+1])<40)&&(o=v[a*3+1],n=a);n>=0&&Yo(n,s)}),Pt=(e,s,n,o)=>{for(let a=0;a<e.length-1&&s>0;a++){for(let r=0;r<s;r++)o.push(qa(e[a],e[a+1])),o.push(de(.1+fe()*.03+(r===s-1?.03:0)));o.push(de(.16+fe()*.05)),s-=n}},ut=[12,0,1,2,3,4,5,13,6,7,8,9,10,11],ro=(e,s)=>{const n=ut.indexOf(e),o=[e],a=[e];for(let c=n;ut[c]!==s;)c=(c+1)%14,o.push(ut[c]);for(let c=n;ut[c]!==s;)c=(c+13)%14,a.push(ut[c]);const r=c=>c.slice(1,-1).some(l=>l>=12);return r(o)?a:r(a)||o.length<=a.length?o:a},co=e=>{const s=q.splice(0),n=[];e(n),q.push(...n,de(.3),...s)};let Zo=!1,vt=!0,lo=0,Je=null,Se=!1;const io=e=>{const s=[];for(let n=0;n<M;n++)D[n]===e&&s.push(n);return s},fo=(e,s)=>{Se=!0;const n=Dt(),o=Vo(n,e),a=n.slice(),r=Ut(a,e,s);Pt([e,...o],n[e],1,q),q.push(de(.4));for(const c of r)q.push(De(()=>{const l=io(c).length;l&&co(u=>Pt(ro(c,12+s),l,0,u))}));q.push(de(.3)),q.push(De(()=>{Te++,r.length&&(Ze=Te),he=1-s,Se=!1;const c=Dt(),l=48-c[12]-c[13];(c[12]>=25||c[13]>=25||!_t(c,he).length||Te>150||l<=8&&Te-Ze>16)&&ho()}))},ho=()=>{Zo=!0,Se=!0,q.push(de(1.6));for(let e=0;e<12;e++)q.push(De(()=>{const s=io(e).length;s&&co(n=>Pt(ro(e,e<6?12:13),s,0,n))}));q.push(de(1.2));for(const e of[0,11,1,10,2,9,3,8,4,7,5,6])q.push(De(()=>{const s=[12,13].filter(n=>io(n).length>=4).map(n=>ro(n,e)).sort((n,o)=>n.length-o.length);s.length&&co(n=>Pt(s[0],4,0,n))}));q.push(de(.8)),q.push(De(()=>{Zo=!1,Se=!1,he=0,Te=0,Ze=0}))},Ba=(e,s,n)=>{const o=e-P[0],a=s-P[1],r=n-P[2],c=o*ge[0]+a*ge[1]+r*ge[2];return[(o*rt[0]+a*rt[1]+r*rt[2])/(c*Vt)*.5+.5,.5-(o*zt[0]+a*zt[1]+r*zt[2])/(c*Vt)*.5]},uo=[];for(let e=0;e<6;e++)uo.push(Ba(gt(e),oe-.8,Xt(e)));const La=e=>{const s=Jo(e.x,e.y,[0,1,2,3,4,5]);if(!(s<0)){te.push([Ee,0,70,.3+.1*s,gt(s)]);for(let n=0;n<M;n++){const o=D[n];if(o!==s&&o!==s-1&&o!==s+1&&o!==11-s)continue;const a=n*3,r=(kt[n]*7.31+Ee*3.7)%1;no(n),x[a+1]+=11+9*r,z[a]+=(r-.5)*10,z[a+2]+=(.5-r)*10}}},Jo=(e,s,n)=>{let o=-1,a=.15;for(const r of n){const c=Math.hypot(e-uo[r][0],s-uo[r][1]);c<a&&(a=c,o=r)}return o},$e=22050,vo=24,H=new Float64Array(vo*3*4);let et=0,Ia=0;const tt=le<=1?[2700,1700,.006]:le===2?[2300,1500,.004]:le===3?[4300,1600,.004]:[3400,1800,.011],qt=(e,s)=>{const n=Ia++%vo;for(let o=0;o<3;o++){const a=s[o*3],r=s[o*3+1],c=s[o*3+2]*e,l=2*Math.PI*a/$e,u=Math.exp(-1/(r*$e)),f=(n*3+o)*4;H[f]=2*u*Math.cos(l),H[f+1]=-u*u,H[f+2]=0,H[f+3]=c*Math.sin(l)}},Ga=e=>{if(!h.sound.on){et=e,te.length=0;return}et<e-.3&&(et=e);const s=Math.floor((e+.08-et)*$e);if(s<256)return;const n=Math.min(s,4096),o=new Float32Array(n);te.sort((r,c)=>r[0]-c[0]);let a=0;for(let r=0;r<n;r++){const c=et+r/$e-.08;for(;a<te.length&&te[a][0]<=c;){const u=te[a++],f=Math.min(1,Math.pow(u[2]/160,1.2))*.7,i=u[3];u[1]===1?qt(f,[tt[0]+i*tt[1],tt[2],1,(tt[0]+i*tt[1])*1.58,tt[2]*.6,.5,6800+i*900,.0018,.3]):V===1?qt(f,[240+i*120,.006,.9,610+i*200,.004,.4,120+i*30,.018,.25]):V===2?qt(f,[1150+i*500,.009,.8,2700+i*400,.005,.45,430+i*60,.015,.2]):qt(f,[620+i*380,.016,.8,1480+i*300,.008,.45,175+i*30,.05,.25])}let l=0;for(let u=0;u<vo*3;u++){const f=u*4;if(H[f+2]===0&&H[f+3]===0)continue;const i=H[f]*H[f+3]+H[f+1]*H[f+2];H[f+2]=H[f+3],H[f+3]=i,l+=i,Math.abs(i)<1e-5&&Math.abs(H[f+2])<1e-5&&(H[f+2]=0,H[f+3]=0)}o[r]=Math.max(-1,Math.min(1,l*.5))}te.splice(0,a),te.length>60&&te.splice(0,te.length-60),h.sound.pcm(o,$e,{vel:.7}),et+=n/$e},Oa=()=>{for(let e=0;e<M;e++){const s=e*12;j[s]=v[e*3],j[s+1]=v[e*3+1],j[s+2]=v[e*3+2],j[s+3]=ee[e],j[s+4]=g[e*4],j[s+5]=g[e*4+1],j[s+6]=g[e*4+2],j[s+7]=g[e*4+3],j[s+8]=se[e*3],j[s+9]=se[e*3+1],j[s+10]=se[e*3+2],j[s+11]=kt[e];const n=64+e*4;B[n]=v[e*3],B[n+1]=v[e*3+1],B[n+2]=v[e*3+2],B[n+3]=(se[e*3]+se[e*3+1]+se[e*3+2])/3}},$o=e=>{Oa(),B[46]=e,t.bindBuffer(t.UNIFORM_BUFFER,$t),t.bufferSubData(t.UNIFORM_BUFFER,0,B),t.bindBuffer(t.ARRAY_BUFFER,Po),t.bufferSubData(t.ARRAY_BUFFER,0,j),qo(),X(0,Zt),t.bindFramebuffer(t.FRAMEBUFFER,I.sm.f),t.viewport(0,0,1024,1024),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.clear(t.DEPTH_BUFFER_BIT),t.useProgram(O.sm),t.bindVertexArray(eo),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,M),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,F.m.f),t.viewport(0,0,E,E),t.enable(t.SCISSOR_TEST),t.scissor(0,0,E,E),t.clear(t.DEPTH_BUFFER_BIT),t.disable(t.SCISSOR_TEST),X(1,Jt.t),X(2,So.t),X(3,I.sm.t),X(4,At.t),t.depthFunc(t.ALWAYS),t.useProgram(me.comp),t.bindVertexArray(_o),t.drawArrays(t.TRIANGLES,0,3),t.depthFunc(t.LESS),t.useProgram(me.seed),t.bindVertexArray(eo),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,M),t.disable(t.DEPTH_TEST);const s=E/F.sz,n=xe/F.q,o=bo(E,F.sz),a=bo(xe,F.q);X(5,F.m.t),t.useProgram(O.down),t.uniform4f(O.down.uP,1/E,1/E,0,0),t.uniform4f(O.down.uK,s,s,o,o),Ne(O.down,F.a.f,xe,xe),X(5,F.a.t),t.useProgram(O.blur),t.uniform4f(O.blur.uP,1.15/xe,0,0,0),t.uniform4f(O.blur.uK,n,n,a,a),Ne(O.blur,F.b.f,xe,xe),X(5,F.b.t),t.uniform4f(O.blur.uP,0,1.15/xe,0,0),Ne(O.blur,F.a.f,xe,xe),X(5,F.m.t),X(6,F.a.t),X(0,Zt),t.useProgram(O.fin),t.uniform4f(O.fin.uP,E,e*7.31%1,e*3.17%1,0),t.uniform4f(O.fin.uK,s,s,o,o),t.uniform4f(O.fin.uK2,n,n,a,a),Ne(O.fin,null,E,E)};$o(0);let Bt=0,Ka=0;const Lt=1/240,ea=(e,s)=>{s=Math.min(Math.max(s||0,0),.1);for(const o of h.input.taps())vt=!1,lo=0,Je=o;if(lo+=s,!vt&&lo>25&&(vt=!0),!Se&&!J&&!q.length){for(let o=0;o<M;o++)if(!L[o]&&D[o]>=0&&v[o*3+1]<oe-3){Se=!0;const a=D[o];q.push(De(()=>Yo(o,a)),de(.9),De(()=>{Se=!1}));break}}if(!Se&&!q.length&&!J&&(e>4.6||!vt))if(he===1){const o=Dt(),a=so(o,1,Ot);a>=0?(q.push(de(.5)),fo(a,1)):ho()}else{const o=Dt(),a=_t(o,0);if(!a.length)ho();else if(Je){const r=Jo(Je.x,Je.y,[0,1,2,3,4,5]);r>=0&&a.includes(r)?fo(r,0):La(Je),Je=null}else if(vt){const r=so(o,0,"demo");q.push(de(.7)),fo(r,0)}}Bt+=s;let n=0;for(;Bt>=Lt&&n<16;)Bt-=Lt,n++,!J&&q.length&&(J=q.shift(),St=0,J.s&&J.s(),J.d||(J=null)),J&&(St+=Lt,J.u&&J.u(Math.min(1,St/J.d)),St>=J.d&&(J=null)),ao(Lt,!1);n===16&&(Bt=0),Ga(e),$o(e)};{const e={tg:F,gl:t,S:E};F.users.add(e),xo&&xo.register(ea,e)}return ea}})})()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
