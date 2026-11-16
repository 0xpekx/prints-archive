// Bubble Bounce: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/480.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(T0){T0&&T0.add({num:480,name:"Bubble Bounce",fam:"Worlds",recipe:"A bubble from a wand above lands on felt and squashes, wobbles and bounces, its rainbow film draining and swirling and its thin ring of shadow on the felt. The light, the bubble size and the draught change every mint. Tap beside it to puff it along, hold or drag to blow a stream of air, or tap the bubble to pop it and the wand blows another.",interactive:"Tap beside the bubble to puff air at it; hold or drag to blow a stream of air from your finger; tap the bubble itself to pop it, and the wand blows the next one.",music:!0,gl:!0,fps:30,seed:0,make(G){const t=G.gl,rt=G.size,Ft=G.hash.slice(2);let Je=parseInt(Ft.slice(0,8),16)|0,ie=parseInt(Ft.slice(8,16),16)|0,gt=parseInt(Ft.slice(16,24),16)|0,Ne=parseInt(Ft.slice(24,32),16)|0;const k=()=>{Je>>>=0,ie>>>=0,gt>>>=0,Ne>>>=0;let e=Je+ie|0;return Je=ie^ie>>>9,ie=gt+(gt<<3)|0,gt=gt<<21|gt>>>11,Ne=Ne+1|0,e=e+Ne|0,gt=gt+e|0,(e>>>0)/4294967296};for(let e=0;e<12;e++)k();const yt=e=>{let o=0;for(const c of e)o+=c[1];let a=k()*o;for(const c of e)if(a-=c[1],a<0)return c[0];return e[e.length-1][0]};let Ht=yt([["Charcoal",28],["Moss Green",22],["Oxblood",18],["Ochre",14],["Ivory",11],["Ink Blue",7]]),Ut=yt([["North Window",38],["Venetian Sun",26],["Desk Lamp",22],["Strip Lights",14]]),Rt=yt([["Small",26],["Medium",46],["Large",22],["Giant",6]]),Me=yt([["Dish Soap",44],["Glycerine",28],["Thin Mix",22],["Sugar Syrup",6]]),Ce=yt([["120 fps",28],["240 fps",50],["600 fps",22]]),ze=yt([["Steel Wire",42],["Brass Ring",26],["Red Plastic",22],["Copper Twist",10]]),Kt=yt([["Still",55],["Slow Drift",35],["Window Draught",10]]),jt=yt([["Pressed",34],["Fuzzy",50],["Shaggy",16]]);const A0=0,g0=A0?[{felt:"Ivory",light:"North Window",shot:"High angle",wandShot:!1},{felt:"Ivory",light:"North Window",shot:"Three-quarter",wandShot:!1},{felt:"Charcoal",light:"North Window",shot:"Three-quarter",wandShot:!1},{felt:"Oxblood",light:"North Window",shot:"Felt level",wandShot:!1},{felt:"Ivory",light:"Venetian Sun",shot:"High angle",wandShot:!1},{felt:"Ivory",light:"Desk Lamp",shot:"Close-up",wandShot:!1},{felt:"Charcoal",light:"Desk Lamp",shot:"Felt level",wandShot:!1},{felt:"Ochre",light:"Strip Lights",shot:"Three-quarter",wandShot:!1},{felt:"Ochre",light:"Strip Lights",shot:"Felt level",wandShot:!1},{felt:"Moss Green",light:"Strip Lights",shot:"High angle",wandShot:!1},{size:"Giant",light:"Venetian Sun",shot:"Close-up",wandShot:!1},{size:"Giant",light:"North Window",shot:"Three-quarter",wandShot:!0},{felt:"Charcoal",mix:"Sugar Syrup",light:"North Window",shot:"Felt level",wandShot:!1},{wand:"Red Plastic",light:"Venetian Sun",shot:"Close-up",wandShot:!0},{felt:"Ochre",air:"Window Draught",light:"Strip Lights",shot:"Close-up",wandShot:!1}]:null,B=A0&&!G.home?g0[((window.__f480=(window.__f480||0)+1)-1)%g0.length]:null;B&&(B.felt&&(Ht=B.felt),B.light&&(Ut=B.light),B.size&&(Rt=B.size),B.mix&&(Me=B.mix),B.air&&(Kt=B.air),B.wand&&(ze=B.wand)),G.home&&(Ht="Charcoal",Ut="Venetian Sun",Rt="Medium",Me="Dish Soap",Ce="240 fps",ze="Brass Ring",Kt="Still",jt="Fuzzy"),G.trait("Felt",Ht),G.trait("Light",Ut),G.trait("Bubble",Rt),G.trait("Mixture",Me),G.trait("Frame Rate",Ce),G.trait("Wand",ze),G.trait("Air",Kt),G.trait("Nap",jt);let se=parseInt(Ft.slice(56,64),16)^1540483477|0;const Dt=()=>{se=se+1831565813|0;let e=Math.imul(se^se>>>15,1|se);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let pt="Three-quarter";{const e=[["Felt level",28],["High angle",12],["Close-up",26],["Three-quarter",34]];let o=Dt()*100;for(const a of e)if(o-=a[1],o<0){pt=a[0];break}}G.home&&(pt="Three-quarter");let le=parseInt(Ft.slice(48,56),16)^668265263|0;le=le+1831565813|0;let wt=Math.imul(le^le>>>15,1|le);wt=wt+Math.imul(wt^wt>>>7,61|wt)^wt;let Lt=!G.home&&((wt^wt>>>14)>>>0)/4294967296<.2;B&&B.shot&&(pt=B.shot),B&&B.wandShot!==void 0&&(Lt=B.wandShot),Lt&&pt==="High angle"&&Ut==="Desk Lamp"&&(Lt=!1);let fe=parseInt(Ft.slice(40,48),16)^374761393|0;const _o=()=>{fe=fe+1831565813|0;let e=Math.imul(fe^fe>>>15,1|fe);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};(pt==="High angle"||pt==="Three-quarter")&&(Ht==="Ivory"||Ht==="Ochre")&&(Ut==="North Window"||Ut==="Strip Lights")&&(pt="Felt level"),G.trait("Shot",Lt?pt+", on the wand":pt);const X=["Three-quarter","Felt level","Close-up","High angle"].indexOf(pt),W=["North Window","Venetian Sun","Desk Lamp","Strip Lights"].indexOf(Ut),It=Ce==="120 fps"?4:Ce==="240 fps"?8:20,V=Rt==="Small"?.022:Rt==="Medium"?.027:Rt==="Large"?.032:.038,de={"Dish Soap":[.9,1,4.2],Glycerine:[1.6,.45,7.5],"Thin Mix":[.42,1.9,2.6],"Sugar Syrup":[2.8,.22,13]}[Me],he=jt==="Pressed"?6e-4:jt==="Fuzzy"?.0011:.002,io=jt==="Pressed"?18:jt==="Fuzzy"?30:48,y0=Kt==="Still"?0:Kt==="Slow Drift"?.012:.035;let d=t.__c480;if(!d){const e=(r,n,s,x)=>{const p=(r-n)/(r<n?s:x);return Math.exp(-.5*p*p)},a=.0014285714285714286,c=1/400,l=[],h=[0,0,0];for(let r=0;r<10;r++){const n=a+(c-a)*(r+.5)/10,s=1/n,x=s*s*(c-a)/10,p=1.056*e(s,599.8,37.9,31)+.362*e(s,442,16,26.7)-.065*e(s,501.1,20.4,26.2),u=.821*e(s,568.8,46.9,40.5)+.286*e(s,530.9,16.3,31.1),b=1.217*e(s,437,11.8,36)+.681*e(s,459,26,13.8),M=[3.2406*p-1.5372*u-.4986*b,-.9689*p+1.8758*u+.0415*b,.0557*p-.204*u+1.057*b].map(F=>F*x);l.push([n,M]);for(let F=0;F<3;F++)h[F]+=M[F]}const m=(c-a)/10*.55,R=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
`,T=`
vec2 octE(vec3 d){d/=abs(d.x)+abs(d.y)+abs(d.z);vec2 p=d.xy;if(d.z<0.)p=(1.-abs(p.yx))*vec2(d.x>=0.?1.:-1.,d.y>=0.?1.:-1.);return p*.5+.5;}
vec3 octD(vec2 u){vec2 p=u*2.-1.;vec3 d=vec3(p,1.-abs(p.x)-abs(p.y));float t=max(-d.z,0.);d.x+=d.x>=0.?-t:t;d.y+=d.y>=0.?-t:t;return normalize(d);}
float h12(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
vec2 h22(vec2 p){vec3 q=fract(vec3(p.xyx)*vec3(.1031,.103,.0973));q+=dot(q,q.yzx+33.33);return fract((q.xx+q.yz)*q.zy);}
vec3 enc(vec3 c){c=max(c,0.);return sqrt(c/(1.+c));}
vec3 dec(vec3 v){vec3 s=v*v;return s/max(1.-s,vec3(.004));}
`,L=`
uniform vec4 SC[31];
#define KEYD SC[28].xyz
#define KEYA SC[28].w
#define I1 int(SC[29].x)
#define I2 int(SC[29].y)
#define I48 int(SC[29].z)
#define I18 int(SC[29].w)
#define LT SC[0].x
#define NAP SC[0].y
#define FELT SC[1].rgb
#define FSEED SC[1].w
#define RAL SC[2].rgb
#define RAP SC[2].w
#define RAR SC[3]
#define RAX SC[4]
#define RBL SC[5].rgb
#define RBP SC[5].w
#define RBR SC[6]
#define RBX SC[7]
#define SUND SC[8].xyz
#define SUNON SC[8].w
#define SUNC SC[9].rgb
#define SLAT SC[9].w
#define LAMPP SC[10].xyz
#define LAMPON SC[10].w
#define LAMPC SC[11].rgb
#define WALL SC[12].rgb
#define TABLE SC[13].rgb
#define AMB SC[14].rgb
#define PADC SC[15].xy
#define PADH SC[15].z
#define PADA SC[15].w
#define ROD SC[16]
#define RINGW SC[17].xyz
#define RINGA SC[17].w
#define RINGN SC[18].xyz
#define WIRER SC[18].w
#define CAMP SC[19].xyz
#define FOCUS SC[19].w
#define CAMF SC[20].xyz
#define TANH SC[20].w
#define CAMR SC[21].xyz
#define APER SC[21].w
#define CAMU SC[22].xyz
#define WCOL SC[23].rgb
#define WTYP SC[23].w
#define ARM0 SC[24].xyz
#define ARM1 SC[25].xyz
#define NOZ0 SC[26].xyz
#define NOZ1 SC[27].xyz
#define PADT .4
#define BNC SC[30].rgb
#define CARDK SC[30].w
#define WFO SC[24].w
vec2 padL(vec2 xy){vec2 q=xy-PADC;float c=cos(PADA),s=sin(PADA);return vec2(c*q.x+s*q.y,-s*q.x+c*q.y);}
uniform sampler2D uN;
// value noise read from the shared noise texture (one lookup, not four hashes)
float vt(vec2 p){return textureLod(uN,(p+.5)*.00390625,0.).a;}
vec3 feltCol(vec2 x){return FELT*(.82+.36*vt(x*2.3+FSEED)+.12*(vt(x*.4)-.5));}
float sunMask(vec3 p){
 float t=(RAX.x-p.x)/SUND.x;vec3 q=p+SUND*t;
 vec2 uv=vec2((q.y-RAR.x)/(RAR.y-RAR.x),(q.z-RAR.z)/(RAR.w-RAR.z));
 float w=max(t*.0093,.05);
 float inW=smoothstep(0.,w/(RAR.y-RAR.x),uv.x)*smoothstep(1.,1.-w/(RAR.y-RAR.x),uv.x)*smoothstep(0.,w/(RAR.w-RAR.z),uv.y)*smoothstep(1.,1.-w/(RAR.w-RAR.z),uv.y);
 float f=fract((q.z-RAR.z)/SLAT),ws=w/SLAT;
 return inW*smoothstep(.6-ws,.6+ws,f)*smoothstep(.98+ws,.98-ws,f)*step(0.,t);}
`,A=L+`
float capT(vec3 ro,vec3 rd,vec3 pa,vec3 pb,float r){
 vec3 ba=pb-pa,oa=ro-pa;float baba=dot(ba,ba),bard=dot(ba,rd),baoa=dot(ba,oa),rdoa=dot(rd,oa),oaoa=dot(oa,oa);
 float a=baba-bard*bard,b=baba*rdoa-baoa*bard,c=baba*oaoa-baoa*baoa-r*r*baba,h=b*b-a*c,res=-1.;
 if(h>=0.){float t=(-b-sqrt(h))/a;float y=baoa+t*bard;
  if(y>0.&&y<baba)res=t;else{vec3 oc=y<=0.?oa:ro-pb;b=dot(rd,oc);c=dot(oc,oc)-r*r;h=b*b-c;if(h>0.)res=-b-sqrt(h);}}
 return res;}
vec3 capN(vec3 p,vec3 a,vec3 b,float r){vec3 ba=b-a;float h=clamp(dot(p-a,ba)/dot(ba,ba),0.,1.);return (p-a-ba*h)/r;}
vec3 rectP(vec4 X,float u,float z){return X.z<.5?vec3(X.x,u,z):vec3(u,X.x,z);}
vec3 rectN(vec4 X){return X.z<.5?vec3(X.y,0.,0.):vec3(0.,X.y,0.);}
float rectT(vec3 o,vec3 v,vec4 R,vec4 X,out vec2 uv){
 float oa=X.z<.5?o.x:o.y,va=X.z<.5?v.x:v.y;float t=(X.x-oa)/va;vec3 p=o+v*t;float u=X.z<.5?p.y:p.x;
 uv=vec2((u-R.x)/(R.y-R.x),(p.z-R.z)/(R.w-R.z));
 bool ok=X.w>.5&&t>0.&&va*X.y<0.&&uv.x>0.&&uv.y>0.&&uv.x<1.&&uv.y<1.;
 return ok?t:-1.;}
float patAvg(float p){return p<.5?.62:p<1.5?.55:p<2.5?.9:p<3.5?.85:.4;}
vec3 keyL(vec3 p,vec3 n){
 vec3 e=vec3(0.);
 for(int L=0;L<I2;L++){vec4 R=L==0?RAR:RBR,X=L==0?RAX:RBX;vec3 Lc=L==0?RAL:RBL;float pat=L==0?RAP:RBP;
  if(X.w>.5){vec3 N=rectN(X);float A=(R.y-R.x)*(R.w-R.z);
   vec3 d=rectP(X,(R.x+R.y)*.5,(R.z+R.w)*.5)-p;float dd=dot(d,d);vec3 l=d*inversesqrt(dd);
   e+=Lc*(max(0.,-dot(l,N))*max(0.,dot(l,n))/dd*A/3.14159*patAvg(pat));}}
 if(SUNON>.5)e+=SUNC*max(0.,dot(n,SUND))*sunMask(p);
 if(LAMPON>.5){vec3 d=LAMPP-p;float dd=dot(d,d);vec3 l=d*inversesqrt(dd);vec3 ax=normalize(vec3(-.5,1.,0.)-LAMPP);
  e+=LAMPC*max(0.,dot(n,l))/dd*(.15*smoothstep(.3,.93,dot(-l,ax))+.85*smoothstep(.93,.995,dot(-l,ax)));}
 return e+AMB*(.55+.45*n.z);}
float torusD(vec3 p){vec3 q=p-RINGW;float h=dot(q,RINGN);float r=length(q-h*RINGN);return length(vec2(r-RINGA,h))-WIRER;}
// the scene without the bubble: id 1 felt top, 2 felt edge, 3 table, 4 back wall, 5 left wall, 6 right wall, 7 front wall,
// 8 ceiling, 9 steel stand, 10 brass nozzle, 11 wand ring and handle, 12 camera, 13 light A, 14 light B, 15 lamp head
// (cycle 2: the stand's rod and arm are moved out of every view by their numbers, and the camera is left out of the film)
float trace(vec3 o,vec3 v,out int id,out vec3 n,float cam){
 float tb=1e9;id=0;n=vec3(0.,0.,1.);
 float tx=v.x<0.?(-55.-o.x)/v.x:(95.-o.x)/v.x,ty=v.y<0.?(-160.-o.y)/v.y:(120.-o.y)/v.y,tz=v.z<0.?(-PADT-o.z)/v.z:(130.-o.z)/v.z;
 if(tx<tb){tb=tx;id=v.x<0.?5:6;n=vec3(v.x<0.?1.:-1.,0.,0.);}
 if(ty<tb){tb=ty;id=v.y<0.?7:4;n=vec3(0.,v.y<0.?1.:-1.,0.);}
 if(tz<tb){tb=tz;id=v.z<0.?3:8;n=vec3(0.,0.,v.z<0.?1.:-1.);}
 float t;
 if(v.z<0.){t=-o.z/v.z;vec2 q=padL((o+v*t).xy);if(t>0.&&t<tb&&max(abs(q.x),abs(q.y))<PADH){tb=t;id=1;n=vec3(0.,0.,1.);}}
 vec2 uv;
 t=rectT(o,v,RAR,RAX,uv);if(t>0.&&t<tb+.05){tb=t;id=13;n=rectN(RAX);}
 t=rectT(o,v,RBR,RBX,uv);if(t>0.&&t<tb+.05){tb=t;id=14;n=rectN(RBX);}
 if(LAMPON>.5){vec3 oc=o-LAMPP;float b=dot(oc,v),cc=dot(oc,oc)-16.,h=b*b-cc;if(h>0.){t=-b-sqrt(h);if(t>0.&&t<tb){tb=t;id=15;n=normalize(oc+v*t);}}}
 for(int k=0;k<I2*2;k++){
  vec3 a=k==0?vec3(ROD.xy,-PADT):k==1?ARM0:k==2?ARM0-vec3(0.,0.,1.3):k==3?ARM1:NOZ0;
  vec3 b=k==0?vec3(ROD.xy,ROD.w):k==1?ARM1:k==2?ARM0+vec3(0.,0.,1.3):k==3?RINGW+RINGA*normalize(cross(RINGN,cross(vec3(0.,0.,1.),RINGN))):NOZ1;
  float rr=k==0?ROD.z:k==1?.3:k==2?1.05:k==3?.13:.3;
  if(k<4&&k!=2){t=capT(o,v,a,b,rr);if(t>0.&&t<tb){tb=t;id=k==3?11:k==4?10:9;n=capN(o+v*t,a,b,rr);}}
 }
 {vec3 oc=o-RINGW;float rr=RINGA+WIRER+.05,b=dot(oc,v),cc=dot(oc,oc)-rr*rr,h=b*b-cc;
  if(h>0.){float ta=max(-b-sqrt(h),0.),te=-b+sqrt(h);float tt=ta;bool hit=false;
   for(int i=0;i<I48;i++){if(!hit&&tt<te){float d=torusD(o+v*tt);if(d<.002)hit=true;else tt+=d;}}
   if(hit&&tt<tb){tb=tt;id=11;vec3 q=o+v*tt-RINGW;float h=dot(q,RINGN);n=normalize(q-RINGA*normalize(q-h*RINGN));}}}
 if(cam>.5){vec3 oc=o-CAMP;float b=dot(oc,v),cc=dot(oc,oc)-7.,h=b*b-cc;if(h>0.){t=-b-sqrt(h);if(t>0.&&t<tb){tb=t;id=12;n=normalize(oc+v*t);}}}
 return tb;}
uniform sampler2D uL;
float PXA=.002,ENVM=.3;vec3 ORG=vec3(0.);
// the lights' faces, baked once per mint (light A below, B above), mip-filtered to the footprint
vec3 lightAlong(vec3 p,vec3 r){
 vec2 ua,ub;float ta=rectT(p,r,RAR,RAX,ua),tb=rectT(p,r,RBR,RBX,ub);
 bool A=ta>0.&&(tb<0.||ta<tb);vec4 R=A?RAR:RBR;vec2 u=A?ua:ub;
 float fp=(length(p-ORG)+(A?ta:tb))*PXA/max(abs(dot(r,rectN(A?RAX:RBX))),.15);
 float lod=log2(max(1.,fp*256./min(R.y-R.x,R.w-R.z)));
 vec3 c=dec(textureLod(uL,vec2(u.x,clamp(u.y,.004,.996)*.5+(A?0.:.5)),lod).rgb);
 return ta>0.||tb>0.?c:vec3(0.);}
vec3 shade(int id,vec3 p,vec3 n,vec3 v){
 bool em=id==13||id==14;
 vec3 E=em?vec3(0.):keyL(p,n),r=reflect(v,n);
 vec3 G=lightAlong(em?p-v*.2:p,em?v:r);
 vec3 c=G;
 if(id==1){float g=pow(1.-max(0.,dot(-v,n)),4.);c=feltCol(p.xy)*E*(1.+.5*g);}
 else if(id==2){c=feltCol(p.xy*vec2(1.,3.))*.75*E*(.75+.5*vt(vec2(dot(p.xy,vec2(1.)),p.z)*vec2(4.,30.)));}
 else if(id==3){vec2 tq=vec2(p.x*.08,p.y*2.5)+3.;float gr=.75+.5*(vt(tq)*.62+vt(tq*2.3+5.)*.38);c=TABLE*gr*E+.045*G*(.6+.4*vt(p.xy*.3));}
 else if(id>=4&&id<=8){float nz=vt(p.xz*.05+p.yy*.03);
  // light thrown back by the lit felt and table: brightest on the ceiling, and a pale card hung behind the camera
  vec2 pq=p.xy-vec2(-.5,1.);float fo=WFO>0.?exp(-(dot(pq,pq)+2.6*p.z*p.z)/(WFO*WFO))*smoothstep(-6.,24.,p.z):1.;
  c=WALL*(E+BNC*ENVM*fo*(id==8?1.2:.6+.5*smoothstep(-20.,120.,p.z)))*(.93+.14*nz);
  if(id==7){vec2 cq=vec2(p.x-CAMP.x*.5,p.z-CAMP.z*2.7-26.);float cd=length(cq*vec2(.6,1.))+24.*nz;c+=BNC*CARDK*ENVM*.67*smoothstep(85.,0.,cd)*(.5+.5*smoothstep(-70.,50.,cq.x));}
  if(id==8)c*=.8;}
 else if(id==9){c=vec3(.04)*E+.55*G+vec3(.05)*AMB*(.5+.5*r.z)+.3*WALL*BNC*ENVM*(.6+.4*r.z);}
 else if(id==10){c=vec3(.9,.62,.3)*(.05*E+.6*G+.08*AMB);}
 else if(id==11){bool pl=WTYP>1.5&&WTYP<2.5;c=WCOL*E*(pl?.6:.08)+(pl?vec3(.04):WCOL*(WTYP<1.5?.6:.55))*(G+WALL*BNC*(.5+.5*r.z));}
 else if(id==12){float ln=dot(n,normalize(vec3(0.,0.,4.)-CAMP));c=mix(vec3(.02)+.06*G+AMB*.4,vec3(.003,.004,.008)+.08*G,smoothstep(.85,.9,ln));}
 else if(id==15){c=LAMPC*.025*smoothstep(.5,.9,dot(n,normalize(vec3(0.,2.,0.)-LAMPP)))+vec3(.05,.04,.03);}
 else if(id==0){c=vec3(0.);}
 return c;}
`,K=`
// what a lit rectangle looks like: 0 window, 1 window with blinds, 2 white card, 3 softbox strip, 4 night window
vec3 emitL(float pat,vec2 uv,vec3 L,vec4 R){
 vec2 sz=vec2(R.y-R.x,R.w-R.z),q=uv*sz;vec3 c=L;
 float fr=pat>2.5&&pat<3.5?2.5:5.;
 float inF=step(fr,q.x)*step(fr,q.y)*step(q.x,sz.x-fr)*step(q.y,sz.y-fr);
 vec2 lq=q-fr,ps=(sz-2.*fr)/vec2(2.,3.);
 float mx=abs(fract(lq.x/ps.x+.5)-.5)*ps.x,my=abs(fract(lq.y/ps.y+.5)-.5)*ps.y;
 float mun=1.-step(1.3,mx)*step(1.3,my);
 float nz=vt(uv*vec2(17.,9.)+pat*7.);
 if(pat<.5){
  float tl=.36+.12*sin(uv.x*7.+1.)+.08*nz;
  c=mix(L*(.8+.35*uv.y),L*vec3(.1,.13,.12)*(.4+.8*nz),smoothstep(tl+.02,tl-.02,uv.y));
  c=mix(c,L*vec3(.07,.07,.075),max(mun,1.-inF));
 }else if(pat<1.5){
  float f=fract(q.y/(SLAT*2.7)+.03*nz);
  c=mix(L*vec3(1.,.8,.55)*(.3+.7*smoothstep(0.,.55,f)),L*vec3(.85,.92,1.05)*1.3,smoothstep(.55,.7,f))*mix(.2,1.,smoothstep(1.,.88,f));
  c=mix(c,L*vec3(.06),max(mun*.92,1.-inF));
 }else if(pat<2.5){
  c=L*(.8+.25*(1.-uv.y))*(.94+.12*nz);
 }else if(pat<3.5){
  float e=smoothstep(0.,.12,uv.x)*smoothstep(1.,.88,uv.x)*smoothstep(0.,.04,uv.y)*smoothstep(1.,.96,uv.y);
  c=L*(.55+.45*e)*inF;
 }else{
  c=L*vec3(.35,.5,1.)*(.5+uv.y)*step(.25+.1*nz,uv.y);
  vec2 cg=floor(q/vec2(3.,2.5));vec2 cp=fract(q/vec2(3.,2.5))-.5;
  c+=step(.93,h12(cg+11.))*step(uv.y,.4)*smoothstep(.12,.0,length(cp))*vec3(1.,.7,.35)*40.*(L.b+.02);
  c=mix(c,vec3(.002),max(mun,1.-inF));
 }
 return c;}
`,I=`
vec4 fibreL(vec2 x,float s,float w,float fp,vec3 H,float dn){
 vec2 cid=floor(x/s);float cov=0.,hl=0.,tone=0.,wh=0.;
 for(int j=-I1;j<=I1;j++)for(int i=-I1;i<=I1;i++){
  vec2 c=cid+vec2(i,j);vec2 r=h22(c+FSEED);float r3=h12(c*1.7+FSEED+.3);
  vec2 cen=(c+r)*s;float a=r3*6.2832;vec2 d=vec2(cos(a),sin(a)),pe=vec2(-d.y,d.x);
  vec2 q=x-cen;float u=dot(q,d),vv=dot(q,pe);float L=s*(1.2+1.8*r.x);float k=(r.y-.5)*2.5/L;
  float off=vv-k*u*u;float du=max(abs(u)-L*.5,0.);float dist=length(vec2(du,off));
  float ww=w*(.6+.8*r3);
  float cv=clamp((ww+fp*.5-dist)/fp,0.,1.)*min(1.,2.*ww/fp)*step(h12(c*1.3+2.2),dn);
  vec2 tg=normalize(d+pe*(2.*k*u));vec3 T=normalize(vec3(tg,.3*(r.x-.5)));
  float th=sqrt(max(0.,1.-dot(T,H)*dot(T,H)));
  float hc=h12(c+9.1);hl+=min(1.,cv*3.)*pow(th,14.);cov=max(cov,cv);tone+=cv*(hc-.5);wh+=cv*step(.94,hc);
 }
 return vec4(hl,tone,wh,cov);}
float feltH(vec2 x,float f2){vec2 p=x*5.5+FSEED;float s=0.,a=.5;for(int i=0;i<3;i++){s+=a*vt(p);p=mat2(1.6,1.2,-1.2,1.6)*p+7.3;a*=.5;}return s*.7+(vt(x*16.+FSEED*2.)-.5)*.35*f2;}
vec3 feltDetail(vec3 p,vec3 v,float fp,vec3 E0){
 vec2 x=p.xy;vec3 fc0=feltCol(x);
 float f2=smoothstep(.1,.02,fp);
 float e=.02,h0=0.,hx=0.,hy=0.;
 for(int i=0;i<I1+I2;i++){float hh=feltH(x+vec2(i==1?e:0.,i==2?e:0.),f2);if(i==0)h0=hh;else if(i==1)hx=hh;else hy=hh;}
 vec3 n=normalize(vec3(-(hx-h0)/e*.05,-(hy-h0)/e*.05,1.));
 vec3 H=normalize(KEYD-v);
 vec4 fa=vec4(0.),fb=vec4(0.);vec3 st=vec3(0.);float sc=0.;
 // two matted layers on the face, then loose fibres standing off it at two heights, lit where the light reaches them
 vec3 fcs=mix(FELT*1.6,vec3(.3,.29,.27),.35);
 for(int L=0;L<I2+2;L++){float hz=L<2?0.:NAP*(L==2?.75:1.8);vec3 ph=p+v*(hz/v.z);
  vec4 f=fibreL(ph.xy+float(L)*3.7,L==0?.045:L==1?.11:.13,L==0?.0022:L==1?.0032:.0016,fp,H,L<2?1.:clamp(NAP*3.2,.12,.75)/float(L-1));
  if(L==0)fa=f;else if(L==1)fb=f;else{
   vec3 Ls=SUNON>.5?SUNC*sunMask(vec3(ph.xy,hz))+AMB:E0/max(fc0,vec3(1e-4))*.5;
   st+=f.w*fcs*Ls*(.6+2.5*f.x);sc=max(sc,f.w);}}
 // pills and stray long fibres
 vec2 pc=floor(x/.7);vec2 pr=h22(pc+FSEED*3.);float pill=0.;
 if(pr.x>.9){vec2 pp=(pc+.2+.6*h22(pc+5.))*.7;float dd=length(x-pp)/(.04+.05*pr.y);pill=smoothstep(1.,.2,dd)*(.6+.4*vt(x*80.));}
 vec3 base=fc0*(.88+(.75*h0-.26)*clamp(NAP*7.,.45,1.4));
 vec3 alb=base;
 alb=mix(alb,fc0*(1.3+1.2*fa.y),fa.w*.55);
 alb=mix(alb,fc0*(1.15+1.2*fb.y),fb.w*.45);
 alb=mix(alb,vec3(.42,.4,.37),min(1.,fa.z+fb.z)*.45);
 alb=mix(alb,fc0*1.45,pill*.6);
 float g=pow(1.-max(0.,dot(-v,n)),4.);
 vec3 E=E0/max(fc0*(1.+.5*g),vec3(1e-4));
 E*=clamp((.35+.65*max(0.,dot(n,KEYD)))/(.35+.65*max(0.,KEYD.z)),.4,1.6);
 vec3 c=alb*E*(1.+.5*g)*(1.-.25*pill*smoothstep(.0,.5,dot(n.xy,KEYD.xy)));
 c+=(fa.x*.3+fb.x*.2)*(FELT*2.+vec3(.05))*E;
 c=mix(c,st/max(sc,1e-3),sc*.85);
 return c-fc0*E*(1.+.5*g);}
`,P=R+T+A+`
uniform vec4 BK,EB;out vec4 o;
void main(){
 bool env=EB.w>.5;
 vec2 uv=gl_FragCoord.xy/BK.x,nd=uv*2.-1.;
 vec3 dir=env?octD(uv):normalize(CAMF+nd.x*TANH*CAMR+nd.y*TANH*CAMU);
 vec3 org=env?EB.xyz:CAMP;ORG=org;PXA=env?.0123:2.*TANH/BK.x;ENVM=env?1.:.12;
 vec3 pf=org+dir*FOCUS/dot(dir,CAMF);
 vec3 acc=vec3(0.),p0=vec3(0.);float nf=0.,t0=0.;bool f0=false;
 int ns=int(BK.z+.5);
 for(int k=0;k<ns;k++){{
  float fk=float(k);float rr=k==0?0.:sqrt(fk/23.),a=fk*2.39996+BK.y;
  vec3 o2=org+(CAMR*cos(a)+CAMU*sin(a))*rr*APER;
  vec3 v2=env?dir:normalize(pf+(CAMR*(fract(fk*.7549)-.5)+CAMU*(fract(fk*.5698)-.5))*(k==0?0.:2.*TANH*FOCUS/BK.x)-o2);
  int id;vec3 n;float t=trace(o2,v2,id,n,env?SC[0].w:0.);
  vec3 c=shade(id,o2+v2*t,n,v2);
  if(k==0){f0=id==1;p0=o2+v2*t;t0=t;}
  acc+=min(c,vec3(30.));if(id==1)nf+=1.;
 }}
 acc/=float(ns);
 o=vec4(enc(acc),f0&&!env?nf/24.:0.);
}`,g=R+T+L+I+`
uniform sampler2D uB;uniform vec4 BK;out vec4 o;
void main(){
 vec4 b=texelFetch(uB,ivec2(gl_FragCoord.xy),0);vec3 acc=dec(b.rgb);
 vec2 uv=gl_FragCoord.xy/BK.x,nd=uv*2.-1.;
 vec3 dir=normalize(CAMF+nd.x*TANH*CAMR+nd.y*TANH*CAMU);
 if(b.a>0.&&dir.z<0.){float t0=-CAMP.z/dir.z;vec3 p0=CAMP+dir*t0;
  float px=t0*2.*TANH/BK.x;float coc=2.*APER*abs(t0-FOCUS)/FOCUS;
  acc+=feltDetail(p0,dir,px*1.5+coc,acc)*b.a;}
 o=vec4(enc(acc),1.);
}`,y=R+T+L+K+`
out vec4 o;
void main(){
 vec2 f=gl_FragCoord.xy;bool A=f.y<256.;vec2 uv=vec2(f.x/256.,fract(f.y/256.));
 o=vec4(enc(emitL(A?RAP:RBP,uv,A?RAL:RBL,A?RAR:RBR)),1.);
}`,ot=R+`
uniform sampler2D uNR,uND,uS0,uS1,uS2,uT,uN;uniform vec4 SU,TU[3];out vec4 o;
`+T+`
vec3 swirlU(vec3 d,float t){
 vec3 g=vec3(0.);
 for(int j=0;j<6;j++){float fj=float(j);vec3 k=normalize(vec3(sin(fj*2.1+TU[1].w),cos(fj*3.7+TU[1].w*1.3),sin(fj*5.3+1.+TU[1].w)))*(1.6+fj*.8);
  g+=cos(dot(k,d)+t*(.5+.17*fj)+fj*1.7)*k/(1.+fj*.4);}
 return cross(d,g);}
void shapeP(){
 ivec2 ip=ivec2(gl_FragCoord.xy);vec3 d=octD((vec2(ip)+.5)/64.);
 vec4 A=texelFetch(uS0,ip,0),B=texelFetch(uS1,ip,0),Cc=texelFetch(uS2,ip,0);
 float ws=0.,wr=0.;vec3 gs=vec3(0.),gr=vec3(0.);
 for(int k=0;k<12;k++){
  vec4 q=k<4?A:k<8?B:Cc;int m=k&3;float fi=m==0?q.x:m==1?q.y:m==2?q.z:q.w;
  int i=int(fi+.5);ivec2 ti=ivec2(i%32,i/32);
  vec3 dk=texelFetch(uND,ti,0).xyz;float rk=texelFetch(uNR,ti,0).r;
  float w=exp((dot(d,dk)-1.)*SU.y);vec3 gw=w*SU.y*dk;
  ws+=w;wr+=w*rk;gs+=gw;gr+=gw*rk;
 }
 float r=wr/ws;vec3 g=(gr-r*gs)/ws;g-=d*dot(g,d);
 vec3 n=normalize(d-g/r);
 o=vec4(r/SU.x-.4,n*.5+.5);
}
void thickP(){
 vec2 uv=gl_FragCoord.xy/128.;vec3 d=octD(uv);
 float dt=TU[0].x,t=TU[0].y;float h;
 if(TU[0].w>.5){
  float nz=texture(uN,uv*1.3+TU[1].w).r*.5+texture(uN,uv*3.1).g*.3+texture(uN,uv*7.).b*.2;
  float nb=texture(uN,uv*.45+TU[1].w*.3).a;h=TU[1].z*(1.+1.1*(nz-.5)+.7*(nb-.5))*(1.-.35*d.z)*(1.+.25*sin(d.z*9.+nz*6.));
 }else{
  h=texture(uT,uv).r*2.5;
  vec3 gt=vec3(0.,0.,-1.)+d*d.z;
  vec3 ic=TU[2].xyz;float ca=dot(d,ic);
  vec3 u=TU[0].z*.35*h*h*gt+TU[1].x*swirlU(d,t)+TU[1].y*(d*ca-ic)*exp(-(1.-ca)*2.5);
  vec3 d0=normalize(d-u*dt);
  h=textureLod(uT,octE(d0),0.).r*2.5;
  h-=dt*TU[0].z*.7*h*h*h*d.z;
  h-=dt*TU[2].w*.02*smoothstep(.3,1.,d.z);
  h=max(h*(1.-dt*.01),.008);
 }
 o=vec4(h/2.5,0.,0.,1.);
}
void main(){if(SU.w>.5)thickP();else shapeP();}`,ht=R+T+L+`
uniform sampler2D uBP,uEnv,uSh,uTh;uniform vec4 U[9];out vec4 o;
uniform sampler2D uF;
// the film's reflectance (Airy, s and p, ten spectral lobes) as a table baked once: thickness 0-5 um by sqrt(cos)
vec3 filmR(float hn,float ci){return textureLod(uF,vec2(clamp(hn,0.,5000.)*.00019961+.0009766,sqrt(clamp(ci,.001,1.))*.96875+.015625),0.).rgb;}
float ELOD=0.;
vec3 keyQ(vec3 p,vec3 n){return U[8].rgb*max(0.,dot(n,KEYD))*(SUNON>.5?sunMask(p):1.)+AMB*(.55+.45*n.z);}
vec3 envAt(vec3 p,vec3 r){
 vec3 d=r;float k=smoothstep(.0,-.12,r.z);if(r.z<-.002){float t=-p.z/r.z;d=normalize(p+r*t-U[7].xyz);}
 return mix(dec(textureLod(uEnv,octE(r),ELOD+1.5).rgb),dec(textureLod(uEnv,octE(d),ELOD).rgb),k);}
float rAt(vec3 d){return (textureLod(uSh,octE(d),0.).r+.4)*U[0].w;}
// one film wall: radiance added and transmittance, for a hit at p with outward normal n and thickness h nm
void wall(vec3 p,vec3 n,vec3 rd,float h,float cv,inout vec3 add,inout vec3 tr){
 float ci=abs(dot(n,rd));ELOD=log2(max(1.,U[5].z/max(ci,.12)));vec3 R=filmR(h,ci)*cv;vec3 rr=reflect(rd,n);vec3 Ev=envAt(p,rr);
 if(SUNON>.5){float sa=1.-dot(rr,SUND);Ev+=SUNC*(1500.*exp(-sa/.00012)+25.*exp(-sa/.0025))*sunMask(p);}
 add+=tr*R*Ev;tr*=1.-R;ELOD=0.;}
void main(){
 vec2 fc=gl_FragCoord.xy,uv=fc/U[6].x,nd=uv*2.-1.;
 vec3 bg=dec(texture(uBP,uv).rgb);
 vec3 ro=CAMP,rd=normalize(CAMF+nd.x*TANH*CAMR+nd.y*TANH*CAMU);
 float mode=U[1].x;vec3 C=U[0].xyz;float R0=U[0].w;
 float px=length(C-ro)*2.*TANH/U[6].x;
 // the bubble's shadow on the felt: the film turns nearly all the light away where it is met edge-on, so a hard light
 // draws a dark ring (the outline, darkest at its outer edge) round a disc only a tenth darker; a soft light blurs it
 // to a patch. One shadow per key light (two under the strip lights), each fading with the sun's stripes.
 if(rd.z<0.&&mode>.5&&mode<3.5){
  float tf=-ro.z/rd.z;vec3 q=ro+rd*tf;vec3 Cs=mode>1.5&&mode<2.5?U[2].xyz:C;float Rs=mode>1.5&&mode<2.5?U[2].w:R0;
  float sm=U[6].y*(SUNON>.5?sunMask(q):1.);
  for(int s=0;s<int(SC[0].z);s++){
   vec3 kd=s==0?KEYD:vec3(SC[12].w,SC[13].w,SC[14].w);float sd=dot(Cs-q,kd);
   if(sd>0.&&length(q.xy-Cs.xy)<Rs*4.){
    float b=length(Cs-q-kd*sd);float w=max(sd*KEYA,px*.7);
    float sg=max(sqrt(w*w*.16+Rs*Rs*.0016),px*1.2),x=(b-Rs*.985)/sg;
    bg*=1.-sm*(s==0?1.:.7)*(.1*smoothstep(Rs+w,Rs-w,b)+min(.19,.035*Rs/sg)*exp(-x*x));
   }
  }
  float dc=length(q.xy-C.xy);float ao=smoothstep(R0*.35,0.,C.z-R0*.9);bg*=1.-.16*ao*exp(-dc*dc/(R0*R0*.28));
  // where the film rests on the fibre tips: pressed fibres inside, a ring of tiny glints at the rim of contact
  float rc=U[5].y;
  if(rc>0.){vec2 g=q.xy*vec2(9.,9.);vec2 gi=floor(g);float hh=h12(gi+7.7);vec2 gp=fract(g)-.5-(h22(gi)-.5)*.6;
   float sp=step(.8,hh)*smoothstep(.12,.03,length(gp))*smoothstep(.035*R0,0.,abs(dc-rc));
   bg*=1.-.25*smoothstep(rc,rc*.6,dc);
   bg+=sp*(.6+1.4*h12(gi+3.1))*keyQ(vec3(q.xy,0.),normalize(vec3(-rd.xy,.6)))*.35;}
 }
 vec3 add=vec3(0.),tr=vec3(1.);
 float tFront=1e9;
 vec3 Lp0=vec3(0.),Ln0=vec3(0.,0.,1.),Lp1=vec3(0.),Ln1=vec3(0.,0.,1.);float Lh0=0.,Lh1=0.,on0=0.,on1=0.,rim=0.;
 if(mode>.5&&mode<1.5||mode>2.5){
  float Rb=U[5].x;vec3 oc=ro-C;float b=dot(oc,rd),cc=dot(oc,oc)-Rb*Rb,disc=b*b-cc;
  if(disc>0.){
   float te=-b-sqrt(disc),tx=-b+sqrt(disc);
   vec3 qq=ro-rd*b-C;float LL=length(qq);float covB=clamp(.5-(LL-rAt(qq/LL))/px,0.,1.);
   float t=te,f=1.,minf=1e9,eps=3e-4*R0;
   for(int i=0;i<I18+int(U[5].w);i++){if(f>eps&&t<tx){vec3 q=ro+rd*t-C;float L=length(q);f=L-rAt(q/L);minf=min(minf,f);t+=f*.85;}}
   vec3 popd=U[3].xyz;float cr=cos(U[3].w);
   if(f<=eps*2.&&t<tx){
    float t2=tx,f2=1.;
    for(int i=0;i<I18+int(U[5].w);i++){if(f2>eps&&t2>t){vec3 q=ro+rd*t2-C;float L=length(q);f2=L-rAt(q/L);t2-=f2*.85;}}
    Lp0=ro+rd*t;vec3 d1=normalize(Lp0-C);Lp1=ro+rd*t2;vec3 d2=normalize(Lp1-C);
    vec4 s1=textureLod(uSh,octE(d1),0.),s2=textureLod(uSh,octE(d2),0.);
    Ln0=normalize(s1.gba*2.-1.);Ln1=-normalize(s2.gba*2.-1.);
    Lh0=textureLod(uTh,octE(d1),0.).r*2500.;Lh1=textureLod(uTh,octE(d2),0.).r*2500.;
    on0=(mode<2.5||dot(d1,popd)<cr?1.:0.)*covB;on1=(mode<2.5||dot(d2,popd)<cr?1.:0.)*covB;
    if(mode>2.5)rim=max(smoothstep(.07,0.,abs(dot(d1,popd)-cr)),smoothstep(.07,0.,abs(dot(d2,popd)-cr)));
    tFront=t;
   }else if(mode<2.5){
    float al=covB;
    if(al>0.){vec3 q=ro+rd*(-b)-C;vec3 d1=normalize(q);float h1=textureLod(uTh,octE(d1),0.).r*2500.;
     vec3 R=vec3(.55)*al;add+=R*dec(textureLod(uEnv,octE(rd),2.).rgb);tr*=1.-R;}
   }
  }
 }
 if(mode>1.5&&mode<2.5){
  vec3 Cg=U[2].xyz;float rg=U[2].w;vec3 oc=ro-Cg;float b=dot(oc,rd),cc=dot(oc,oc)-rg*rg,disc=b*b-cc;
  if(disc>0.){float sq=sqrt(disc);
   Lp0=ro+rd*(-b-sq);Lp1=ro+rd*(-b+sq);
   Ln0=normalize(Lp0-Cg);Ln1=-normalize(Lp1-Cg);
   Lh0=textureLod(uTh,octE(Ln0),0.).r*2500.*U[4].w;Lh1=textureLod(uTh,octE(-Ln1),0.).r*2500.*U[4].w;
   on0=dot(Lp0-RINGW,RINGN)>0.?1.:0.;on1=dot(Lp1-RINGW,RINGN)>0.?1.:0.;
   if(on0>.5)tFront=-b-sq;
  }
 }
 // the film left across the wand's ring
 vec3 Lp2=vec3(0.),Ln2=RINGN;float Lh2=0.,on2=0.;
 if(U[6].z>.5){
  float dn=dot(rd,RINGN);float t=dot(RINGW-ro,RINGN)/dn;vec3 p=ro+rd*t;vec3 q=p-RINGW;float rq=length(q);
  if(t>0.&&rq<RINGA-WIRER*.3){
   vec3 ax=normalize(cross(RINGN,vec3(0.,0.,1.))),ay=cross(ax,RINGN);
   float u=dot(q,ax)/RINGA,v=dot(q,ay)/RINGA;float s=(1.-v)*.5;
   float age=U[4].x;float H=U[4].y/(1.+age*.9);
   float sw=texture(uN,vec2(u*.35,v*.25-age*.02)).r-.5+(texture(uN,vec2(u*1.1+age*.01,v*.6-age*.05)).g-.5)*.5;
   float plume=smoothstep(.55,1.,abs(u))*(texture(uN,vec2(u*2.,v*.5-age*.15)).b-.5);
   Lh2=H*1000.*(.06+1.25*pow(max(s+.08*sw,0.),1.1))*(1.+.35*sw-.6*plume);
   Lp2=p;Ln2=dn<0.?RINGN:-RINGN;on2=smoothstep(RINGA-WIRER*.3,RINGA-WIRER*1.5,rq);
  }
 }
 // most pixels see no film at all; the layers are picked by selects, not by indexing local arrays (which spill)
 if(on0>0.||on1>0.||on2>0.){
 vec3 TT=vec3(on0>0.?dot(Lp0-ro,rd):1e9,on1>0.?dot(Lp1-ro,rd):1e9,on2>0.?dot(Lp2-ro,rd):1e9);
 int o0=0,o1=1,o2=2,tmp;
 if(TT[o1]<TT[o0]){tmp=o0;o0=o1;o1=tmp;}
 if(TT[o2]<TT[o1]){tmp=o1;o1=o2;o2=tmp;}
 if(TT[o1]<TT[o0]){tmp=o0;o0=o1;o1=tmp;}
 for(int j=0;j<I2+I1;j++){
  int k=j==0?o0:j==1?o1:o2;
  vec3 p=k==0?Lp0:k==1?Lp1:Lp2,n=k==0?Ln0:k==1?Ln1:Ln2;float lh=k==0?Lh0:k==1?Lh1:Lh2,lc=k==0?on0:k==1?on1:on2;
  if(lc>0.){
   wall(p,n,rd,lh,lc,add,tr);
   // fibres of the felt standing in front of the bubble's foot
   if(k==0&&p.z<NAP*3.){
    vec2 fq=vec2(dot(p.xy,CAMR.xy),dot(p.xy,CAMF.xy));
    float n1=texture(uN,vec2(fq.x*9.,fq.y*1.5)).r,n2=texture(uN,vec2(fq.x*31.,fq.y*4.)).g,n3=texture(uN,vec2(fq.x*83.,fq.y*7.)).b;
    float fz=NAP*(.2+2.2*pow(n1*.45+n2*.35+n3*.2,2.5));
    float oc2=smoothstep(fz,fz*.6,p.z)*(.55+.45*n3);
    vec3 E=keyQ(p,normalize(vec3(-rd.xy,.5)));
    vec3 fc2=feltCol(p.xy)*E*(.7+.9*n2)*(1.+.8*smoothstep(fz*.5,fz,p.z));
    add=mix(add,fc2,oc2);tr*=1.-oc2;
   }
  }
 }
 }
 if(rim>0.)add+=rim*.35*U[8].rgb*tr;
 vec3 col=bg*tr+add;
 col*=U[1].w;
 col=col*(2.51*col+.03)/(col*(2.43*col+.59)+.14);
 col=pow(clamp(col,0.,1.),vec3(1./2.2));
 col*=1.-.04*dot(nd,nd);
 col+=(h12(fc)-.5)/255.;
 o=vec4(col,1.);
}`,je=R.replace(`precision highp float;precision highp int;precision highp sampler2D;
`,"")+"void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}";t.getExtension("KHR_parallel_shader_compile");const b0=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float");t.getExtension("OES_texture_float_linear");const be=t.createShader(t.VERTEX_SHADER);t.shaderSource(be,je),t.compileShader(be);const f=r=>{const n=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(n,r),t.compileShader(n);const s=t.createProgram();return t.attachShader(s,be),t.attachShader(s,n),t.linkProgram(s),{p:s,f:n}},D={bake:f(P),comp:f(ht),felt:f(g),sim:f(ot),light:f(y)};t.flush();const S=6,N=(1+Math.sqrt(5))/2,vt=[[-1,N,0],[1,N,0],[-1,-N,0],[1,-N,0],[0,-1,N],[0,1,N],[0,-1,-N],[0,1,-N],[N,0,-1],[N,0,1],[-N,0,-1],[-N,0,1]],Ee=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]],xt=[],Te=new Map,At=[],ae=(r,n,s)=>{const x=Math.hypot(r,n,s);r/=x,n/=x,s/=x;const p=Math.round(r*1e5)+","+Math.round(n*1e5)+","+Math.round(s*1e5);let u=Te.get(p);return u===void 0&&(u=xt.length/3,Te.set(p,u),xt.push(r,n,s)),u};for(const r of Ee){const n=vt[r[0]],s=vt[r[1]],x=vt[r[2]],p=[];for(let u=0;u<=S;u++){p.push([]);for(let b=0;u+b<=S;b++){const M=u/S,F=b/S;p[u].push(ae(n[0]+(s[0]-n[0])*M+(x[0]-n[0])*F,n[1]+(s[1]-n[1])*M+(x[1]-n[1])*F,n[2]+(s[2]-n[2])*M+(x[2]-n[2])*F))}}for(let u=0;u<S;u++)for(let b=0;u+b<S;b++)At.push(p[u][b],p[u+1][b],p[u][b+1]),u+b<S-1&&At.push(p[u+1][b],p[u+1][b+1],p[u][b+1])}const j=xt.length/3,v=new Float64Array(xt),at=Array.from({length:j},()=>new Set),st=new Float64Array(j);for(let r=0;r<At.length;r+=3){const n=At[r],s=At[r+1],x=At[r+2];at[n].add(s),at[n].add(x),at[s].add(n),at[s].add(x),at[x].add(n),at[x].add(s);const p=v[s*3]-v[n*3],u=v[s*3+1]-v[n*3+1],b=v[s*3+2]-v[n*3+2],M=v[x*3]-v[n*3],F=v[x*3+1]-v[n*3+1],J=v[x*3+2]-v[n*3+2],zt=Math.hypot(u*J-b*F,b*M-p*J,p*F-u*M)/6;st[n]+=zt,st[s]+=zt,st[x]+=zt}let re=0;for(let r=0;r<j;r++)re+=st[r];for(let r=0;r<j;r++)st[r]*=4*Math.PI/re;const Bt=new Int32Array(j+1);let Ct=0;for(let r=0;r<j;r++)Bt[r]=Ct,Ct+=at[r].size;Bt[j]=Ct;const Ae=new Int32Array(Ct),ge=new Float64Array(Ct),$0=new Float64Array(j);for(let r=0;r<j;r++){let n=Bt[r],s=0;for(const x of at[r]){Ae[n]=x;const p=v[r*3]*v[x*3]+v[r*3+1]*v[x*3+1]+v[r*3+2]*v[x*3+2];ge[n]=p,s+=1-p,n++}$0[r]=2*st[r]/s}const to=32,eo=12,ye=new Float32Array(to*eo*4);for(let r=0;r<j;r++)ye[r*4]=v[r*3],ye[r*4+1]=v[r*3+1],ye[r*4+2]=v[r*3+2],ye[r*4+3]=1;const Y=64,oo=[new Float32Array(Y*Y*4),new Float32Array(Y*Y*4),new Float32Array(Y*Y*4)],we=new Int32Array(12),ce=new Float64Array(12),ao=(r,n)=>{let s=r*2-1,x=n*2-1,p=1-Math.abs(s)-Math.abs(x);const u=Math.max(-p,0);s+=s>=0?-u:u,x+=x>=0?-u:u;const b=Math.hypot(s,x,p);return[s/b,x/b,p/b]},Xt=8,ro=[];for(let r=0;r<Xt;r++)for(let n=0;n<Xt;n++){const s=ao((n+.5)/Xt,(r+.5)/Xt),x=[];for(let p=0;p<j;p++)s[0]*v[p*3]+s[1]*v[p*3+1]+s[2]*v[p*3+2]>.6&&x.push(p);ro.push(x)}for(let r=0;r<Y;r++)for(let n=0;n<Y;n++){const[s,x,p]=ao((n+.5)/Y,(r+.5)/Y),u=ro[(r*Xt/Y|0)*Xt+(n*Xt/Y|0)];ce.fill(-9),we.fill(0);for(const M of u){const F=s*v[M*3]+x*v[M*3+1]+p*v[M*3+2];if(F>ce[11]){let J=11;for(;J>0&&ce[J-1]<F;)ce[J]=ce[J-1],we[J]=we[J-1],J--;ce[J]=F,we[J]=M}}const b=(r*Y+n)*4;for(let M=0;M<12;M++)oo[M>>2][b+(M&3)]=we[M]}const Ve=(r,n,s,x,p,u,b,M)=>{const F=t.createTexture();return t.bindTexture(t.TEXTURE_2D,F),t.texImage2D(t.TEXTURE_2D,0,s,r,n,0,x,p,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,b),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,b),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,M),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,M),F},Lo=Ve(to,eo,t.RGBA32F,t.RGBA,t.FLOAT,ye,t.NEAREST,t.CLAMP_TO_EDGE),So=oo.map(r=>Ve(Y,Y,t.RGBA32F,t.RGBA,t.FLOAT,r,t.NEAREST,t.CLAMP_TO_EDGE)),Ye=256,E0=new Uint8Array(Ye*Ye*4);let Gt=-1640531527;for(let r=0;r<E0.length;r++)Gt^=Gt<<13,Gt^=Gt>>>17,Gt^=Gt<<5,E0[r]=Gt>>>0&255;const No=Ve(Ye,Ye,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,E0,t.LINEAR,t.REPEAT),Le=512,Ze=32,Ot=new Float32Array(Le*Ze*4),Wt=1.335;for(let r=0;r<Ze;r++){const n=Math.max(.001,(r/(Ze-1))**2),s=Math.sqrt(Math.max(0,1-(1-n*n)/(Wt*Wt))),x=(n-Wt*s)/(n+Wt*s),p=(Wt*n-s)/(Wt*n+s),u=x*x,b=p*p;for(let M=0;M<Le;M++){const F=12.566*Wt*(M/(Le-1)*5e3)*s,J=Math.exp(-.5*F*F*m*m),zt=(r*Le+M)*4;for(const[ne,zo]of l){const Qe=Math.cos(F*ne)*J,Fo=u*(1-Qe)/(1+u*u-2*u*Qe)+b*(1-Qe)/(1+b*b-2*b*Qe);for(let Se=0;Se<3;Se++)Ot[zt+Se]+=zo[Se]/h[Se]*Fo}for(let ne=0;ne<3;ne++)Ot[zt+ne]=Math.max(0,Ot[zt+ne]);Ot[zt+3]=1}}const co=new Uint16Array(Ot.length),no=new Float32Array(1),Mo=new Uint32Array(no.buffer);for(let r=0;r<Ot.length;r++){no[0]=Ot[r];const n=Mo[0],s=(n>>>23&255)-112;co[r]=s<=0?0:s>=31?31743:s<<10|n>>>13&1023}const Co=Ve(Le,Ze,t.RGBA16F,t.RGBA,t.HALF_FLOAT,co,t.LINEAR,t.CLAMP_TO_EDGE);d=t.__c480={progs:D,tND:Lo,tST:So,tN:No,tF:Co,half:b0,vao:t.createVertexArray(),N:j,D:v,om:st,off:Bt,nbi:Ae,cij:ge,kap:$0,u:{},linked:!1}}if(!d.linked){const e=(o,a,c)=>{const l=t.createTexture();t.bindTexture(t.TEXTURE_2D,l),t.texImage2D(t.TEXTURE_2D,0,c?t.RGBA16F:t.RGBA8,o,a,0,t.RGBA,c?t.HALF_FLOAT:t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const h=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,h),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,l,0),{t:l,fb:h}};d.t2=e,d.shape=e(64,64,d.half),d.tNR=t.createTexture(),t.bindTexture(t.TEXTURE_2D,d.tNR),t.texImage2D(t.TEXTURE_2D,0,t.R32F,32,12,0,t.RED,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),d.linked=!0}const $e={bake:[["SC","BK","EB","uL","uN"],{uL:1,uN:2}],light:[["SC","uN"],{uN:2}],felt:[["SC","BK","uB","uN"],{uB:0,uN:2}],sim:[["uNR","uND","uS0","uS1","uS2","SU","uT","uN","TU"],{uNR:0,uND:1,uS0:2,uS1:3,uS2:4,uT:5,uN:6}],comp:[["SC","U","uBP","uEnv","uSh","uTh","uN","uF"],{uBP:0,uEnv:1,uSh:2,uTh:3,uN:4,uF:5}]},Pt=e=>{const o=d.progs[e].p;t.useProgram(o);let a=d.u[e];if(!a){a=d.u[e]={};for(const c of $e[e][0])a[c]=t.getUniformLocation(o,c);for(const c in $e[e][1])t.uniform1i(a[c],$e[e][1][c])}return a},w0=d.progs,Fe=(e,o,a)=>{const c=t.createTexture();t.bindTexture(t.TEXTURE_2D,c),t.texStorage2D(t.TEXTURE_2D,a,t.RGBA8,e,o),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const l=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,l),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,c,0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),{t:c,fb:l}},L0=e=>Math.floor(Math.log2(e))+1,ct=d.N,U=d.D,Ue=d.om,S0=d.off,so=d.nbi,N0=d.cij,M0=d.kap,w=V*100,lo=he*100,qo=(e,o,a)=>[e,o,a],nt=e=>{const o=Math.hypot(e[0],e[1],e[2]);return[e[0]/o,e[1]/o,e[2]/o]},De=(e,o)=>[e[1]*o[2]-e[2]*o[1],e[2]*o[0]-e[0]*o[2],e[0]*o[1]-e[1]*o[0]],Ie=-.13+(k()-.5)*.06,fo=.23+(k()-.5)*.02,_t=-1.6+(k()-.5)*.8,C0=X===0?Ie:X===1?Ie+(Dt()-.5)*.3:X===2?Ie+(Dt()-.3)*.25:Ie+(Dt()-.5)*.4,t0=X===0?fo:X===1?.035+Dt()*.03:X===2?.12+Dt()*.06:.62+Dt()*.12,Vt=[52,48,34,50][X],mt=X===0?[_t+1,0,3.6+(w-2.7)*.7]:X===1?[.6,0,4+(w-2.7)*.7]:X===2?[-1,0,3.6+(w-2.7)*.9]:[.8,1.5,3.2+(w-2.7)*.6];Lt&&(mt[0]=2-(Rt==="Giant"?1.2:0),mt[1]=1.5,mt[2]=6.6+(w-2.7)*(Rt==="Giant"?3.4:1.1));const z=[mt[0]-Math.sin(C0)*Math.cos(t0)*Vt,mt[1]-Math.cos(C0)*Math.cos(t0)*Vt,mt[2]+Math.sin(t0)*Vt],bt=nt([mt[0]-z[0],mt[1]-z[1],mt[2]-z[2]]),qt=nt(De(bt,[0,0,1])),Yt=De(qt,bt),ho=22,ve=(X===2?4.9+(w-2.7)*.6:X===3?7.2+(w-2.7)*.6:X===0?5.2+(w-2.7)*.5:6.6+(w-2.7)*.6)/Vt*(Lt?(X===2?1.45:1.1)*(Rt==="Giant"?1.2:1):1),Zt={Charcoal:[.05,.05,.055],"Moss Green":[.05,.095,.04],Oxblood:[.15,.022,.026],Ochre:[.36,.19,.045],Ivory:[.55,.5,.4],"Ink Blue":[.025,.04,.13]}[Ht],e0=["Steel Wire","Brass Ring","Red Plastic","Copper Twist"].indexOf(ze),o0=[[.62,.62,.64],[.9,.62,.28],[.42,.025,.02],[.9,.45,.28]][e0],vo=[.075,.11,.1,.095][e0],z0=5.3+(k()-.5)*.5,$=[X===0?_t+z0-1.3:z0,2.5,9.9+(w-2.7)*1.3+(X===0?1.8:0)],lt=1.55+(w-2.7)*.45,it=nt([-.86,-.48,-.06]),a0=nt(De(it,De([0,0,1],it))),Pe=[$[0]+a0[0]*lt,$[1]+a0[1]*lt,$[2]+a0[2]*lt+70],r0=Pe,c0=[$[0]-it[0]*5,$[1]-it[1]*5,$[2]-it[2]*5],n0=[$[0]-it[0]*1.7,$[1]-it[1]*1.7,$[2]-it[2]*1.7],O=new Float32Array(124),i=(e,o,a,c,l)=>{O[e*4]=o,O[e*4+1]=a,O[e*4+2]=c,O[e*4+3]=l};i(0,W,lo,W===3?2:1,0),i(1,Zt[0],Zt[1],Zt[2],k()*50);let ut,pe,ue,_e;if(W===0||W===1){const e=W===0?[4.6,5.1,5.9]:[3.6,3.2,2.7];if(i(2,e[0],e[1],e[2],W),W===1?(i(3,-40,38,8,92),i(4,-55,1,0,1)):(i(3,-50,8,1,70),i(4,-20,1,0,1)),i(5,0,0,0,0),i(6,0,1,0,1),i(7,0,1,0,0),W===1){const o=nt([-1,-.42,.62]);i(8,o[0],o[1],o[2],1),i(9,2.6,1.9,1.15,2.6),ut=o,pe=.012}else i(8,0,0,1,0),i(9,0,0,0,2.6),ut=nt([-20,-21,36]),pe=.35;i(10,0,0,0,0),i(11,0,0,0,0),W===0?(i(12,.085,.09,.105,0),i(13,.012,.018,.032,0),i(14,.022,.026,.034,0)):(i(12,.4,.38,.35,0),i(13,.007,.004,.0022,0),i(14,.045,.038,.028,0)),ue=W===0?3.4:1.9,_e=W===0?.55:.85}else if(W===2){i(2,.2,.15,.1,2),i(3,-22,10,-.3,30),i(4,-24,1,0,0),i(5,.03,.04,.07,4),i(6,-40,10,14,75),i(7,70,-1,1,1),i(8,0,0,1,0),i(9,0,0,0,2.6);const e=[16,-12,27];i(10,e[0],e[1],e[2],1),i(11,2400,1900,1380,0),i(12,.33,.29,.25,0),i(13,.05,.03,.017,0),i(14,.006,.0052,.0045,0),ut=nt(e),pe=.12,ue=1.05,_e=.9}else{i(2,6,6.2,6.7,3),i(3,-30,30,19,33),i(4,-24,1,1,1),i(5,4.5,4.6,5,3),i(6,-30,30,21,35),i(7,24,-1,1,1),i(8,0,0,1,0),i(9,0,0,0,2.6),i(10,0,0,0,0),i(11,0,0,0,0);const e=nt([0,24,28]);i(12,.02,.02,.022,e[0]),i(13,.01,.012,.017,e[1]),i(14,.004,.004,.005,e[2]),ut=nt([0,-24,26]),pe=.3,ue=2.8,_e=.6}i(15,2+(k()-.5)*2,16,32,-.12+(k()-.5)*.1),i(16,400,400,.6,80),i(17,$[0],$[1],$[2],lt),i(18,it[0],it[1],it[2],vo),i(19,z[0],z[1],z[2],Vt),i(20,bt[0],bt[1],bt[2],ve),i(21,qt[0],qt[1],qt[2],.5),i(22,Yt[0],Yt[1],Yt[2],0),i(23,o0[0],o0[1],o0[2],e0),i(24,r0[0],r0[1],r0[2],W===2?90:0),i(25,Pe[0],Pe[1],Pe[2],0),i(26,c0[0],c0[1],c0[2],0),i(27,n0[0],n0[1],n0[2],0),i(28,ut[0],ut[1],ut[2],pe),i(29,1,2,48,18);const ft=[0,0,0];for(const[e,o]of[[2,3],[5,6]]){const a=O.slice(o*4+4,o*4+8),c=O.slice(o*4,o*4+4);if(a[3]<.5)continue;const l=(c[0]+c[1])/2,h=(c[2]+c[3])/2,m=a[2]<.5?[a[0],l,h]:[l,a[0],h],R=Math.hypot(m[0],m[1],m[2]),T=Math.abs(a[2]<.5?m[0]:m[1])/R,L=(c[1]-c[0])*(c[3]-c[2]);for(let A=0;A<3;A++)ft[A]+=O[e*4+A]*L*T/(Math.PI*R*R)*.6/Math.max(.2,(m[0]*ut[0]+m[1]*ut[1]+m[2]*ut[2])/R)}if(W===1&&(ft[0]+=O[36],ft[1]+=O[37],ft[2]+=O[38]),W===2){const e=O.slice(40,43),o=e[0]*e[0]+e[1]*e[1]+e[2]*e[2];for(let a=0;a<3;a++)ft[a]+=O[44+a]/o}{const e=[.3,.3,.1,.25][W];i(30,ft[0]*e,ft[1]*e,ft[2]*e,W===2?0:2.6)}const Qt=[_t,0,w];ue*=Math.min(1.15,Math.pow(.075/(.3*Zt[0]+.6*Zt[1]+.1*Zt[2]),.22)),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST);const po=k()*6.28,F0=Fe(rt,rt,1),i0=Fe(512,512,L0(512)),s0=Fe(256,512,L0(512));t.bindVertexArray(d.vao),t.bindFramebuffer(t.FRAMEBUFFER,s0.fb),t.viewport(0,0,256,512),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,d.tN),t.uniform4fv(Pt("light").SC,O),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,s0.t),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.activeTexture(t.TEXTURE0);const uo=()=>{const e=Fe(rt,rt,1);t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.bindVertexArray(d.vao),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,s0.t),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,d.tN),t.bindFramebuffer(t.FRAMEBUFFER,e.fb),t.viewport(0,0,rt,rt);const o=Pt("bake");t.uniform4fv(o.SC,O),t.uniform4f(o.BK,rt,po,24,0),t.uniform4f(o.EB,0,0,0,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,F0.fb);const a=Pt("felt");t.uniform4fv(a.SC,O),t.uniform4f(a.BK,rt,0,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,e.t),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,i0.fb),Pt("bake"),t.viewport(0,0,512,512),t.uniform4f(o.BK,512,0,1,0),t.uniform4f(o.EB,Qt[0],Qt[1],Qt[2],1),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,i0.t),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(e.fb),t.deleteTexture(e.t)},qe=[d.t2(128,128,d.half),d.t2(128,128,d.half)];let Jt=0;const Z=new Float64Array(ct),tt=new Float64Array(ct),U0=new Float64Array(ct),D0=new Float32Array(32*12),E=[_t/100,0,0],C=[0,0,0],xo=.05,ke=1.2,I0=12e-7,Q=.001,Be=ke*V*(.5+1/3)+1e3*I0,P0=4/3*Math.PI*V**3,Xe=1e3*I0*4*Math.PI*V*V,$t=Xe+ke*P0*1.5,Ro=.8*Be/(Q*Q),mo=.5*Be/Q,bo=2e-6,l0=.15*he,_0=-.85*he,f0=.5*ke*.47*Math.PI*V*V,Et=[-y0,0,0],te=[0,0,0];let Ge=0,xe=0;const Eo=()=>{let e=0,o=0,a=0,c=0;for(let f=0;f<ct;f++){const D=Z[f],S=tt[f],N=f*3,vt=U[N],Ee=U[N+1],xt=U[N+2];let Te=0,At=0;for(let v=S0[f],at=S0[f+1];v<at;v++){const st=so[v];Te+=Z[st]*N0[v]-D,At+=tt[st]*N0[v]-S}const ae=Ue[f]*D*D;let j=xo*M0[f]*Te+bo*M0[f]*At;if(Ge>0){const v=-(vt*te[0]+Ee*te[1]+xt*te[2]);v>0&&(j-=Ge*ae*v*v)}if(xt<-.25){const v=l0-(E[2]+D*xt);if(v>0){const at=Math.min(1,v/he),st=C[2]+S*xt;let re=Ro*Math.min(v,he)-mo*st*at;re<0&&(re=0);const Bt=io*at*ae,Ct=-Bt*(C[0]+S*vt),Ae=-Bt*(C[1]+S*Ee),ge=re*ae;j+=Ct*vt+Ae*Ee+ge*xt,e+=Ct,o+=Ae,a+=ge,c++}}U0[f]=j/(Be*ae)-.5*S}let l=0;for(let f=0;f<ct;f++){tt[f]+=Q*U0[f],Z[f]+=Q*tt[f];const D=U[f*3+2];if(D<-.25&&E[2]+Z[f]*D<_0){Z[f]=(_0-E[2])/D;const S=C[2]/-D;tt[f]>S&&(l+=Be*Ue[f]*Z[f]*Z[f]*(tt[f]-S)*-D,tt[f]=S)}}a+=l/Q;const h=C[0]-Et[0],m=C[1]-Et[1],R=C[2]-Et[2],T=f0*Math.hypot(h,m,R);C[0]+=Q*(e-T*h)/$t,C[1]+=Q*(o-T*m)/$t,C[2]+=Q*(a-T*R-Xe*9.81)/$t,E[0]+=Q*C[0],E[1]+=Q*C[1],E[2]+=Q*C[2];let L=0,A=0,K=0,I=0,P=0,g=0;for(let f=0;f<ct;f++){const D=Ue[f],S=f*3,N=D*Z[f],vt=D*tt[f];L+=N*U[S],A+=N*U[S+1],K+=N*U[S+2],I+=vt*U[S],P+=vt*U[S+1],g+=vt*U[S+2]}const y=3/(4*Math.PI);L*=y,A*=y,K*=y,I*=y,P*=y,g*=y,E[0]+=L,E[1]+=A,E[2]+=K;let ot=0,ht=0,je=0;for(let f=0;f<ct;f++){const D=f*3;Z[f]-=L*U[D]+A*U[D+1]+K*U[D+2],tt[f]-=I*U[D]+P*U[D+1]+g*U[D+2];const S=Ue[f],N=Z[f];ot+=S*N*N*N/3,ht+=S*N*N,je+=S*N*N*tt[f]}const b0=(P0-ot)/ht,be=je/ht;for(let f=0;f<ct;f++)Z[f]+=b0,tt[f]-=be;xe=c},q0=(e,o)=>{for(let a=0;a<ct;a++){const c=U[a*3]*o[0]+U[a*3+1]*o[1]+U[a*3+2]*o[2];Z[a]=V*(1+e*(1.5*c*c-.5)),tt[a]=0}},To=(e,o)=>{let a=e,c=o,l=0;const h=.002;for(;l<4;)if(c+=h*(-Xe*9.81-f0*Math.abs(c)*c)/$t,a+=h*c,l+=h,c<0&&a-V<=l0)return l;return 4};{const e=3.75/It,o=V+.045;let a=-.6,c=.8;for(let l=0;l<30;l++){const h=(a+c)/2;To(o,h)<e?a=h:c=h}E[0]=_t/100+.004,E[2]=o,C[0]=-.004*(It/8),C[2]=(a+c)/2,q0(.05,[.3,.2,.93])}let _=1,dt=0,Oe=1.2,St=0,Re=0,d0=2.2+k()*2,ee=0,Nt=.6,h0=!1,v0=0,p0=de[2]*(.85+.3*k()),k0=3.7,B0=de[0],X0=1,G0=!1,O0=.11,me=0;const Tt=[0,0,-1],oe=[0,0,1];let W0=0,We=2;const H=it,Mt=$,Ao=e=>{const o=Math.hypot(lt,e),a=o+e;return Math.PI*a*a*(3*o-a)/3};let H0;{const e=1.3333333333333333*Math.PI*w**3;let o=-3*lt,a=3*lt;for(let c=0;c<40;c++){const l=(o+a)/2;Ao(l)<e?o=l:a=l}H0=(o+a)/2}const K0=-2.4*lt,He=2.6/It+.05,j0=1.3/It+.02,go=Math.PI*V/7.5,V0=X===0&&!Lt;let u0=He;Lt&&(_=0,dt=j0+.9*He-4/It);const x0=X===0?_t+1:_t,Y0=X===0?[x0-7.5,x0+7.5]:[-9.5,9.5],yo=e=>{const o=R0(1),a=Math.hypot(lt,o)+o,c=a-w,l=Math.cos(me),h=Math.sin(me),m=H[0]*l-H[1]*h;let R=0,T=.25;for(let L=0;L<14;L++){const A=(R+T)/2;let K=(Mt[0]+H[0]*c)/100,I=(Mt[2]+H[2]*c)/100,P=m*A,g=H[2]*A-.02,y=0;for(;I>V&&y<3;){const ot=Math.hypot(P,g),ht=f0*ot/$t;P-=.004*ht*P,g+=.004*(-Xe*9.81/$t-ht*g),K+=.004*P,I+=.004*g,y+=.004}K*100>e==m<0?R=A:T=A}return(R+T)/2},R0=e=>{const o=e<1?e*e*(3-2*e):1;return K0+(H0-K0)*(.15*e+.85*o)},Z0=new Float32Array(36),et=new Float32Array(12),kt=G.sound,Q0=(e,o)=>{const a=e*2-1,c=1-o*2;return nt([bt[0]+(a*qt[0]+c*Yt[0])*ve,bt[1]+(a*qt[1]+c*Yt[1])*ve,bt[2]+(a*qt[2]+c*Yt[2])*ve])},J0=e=>{_=3,dt=0,oe[0]=e[0],oe[1]=e[1],oe[2]=e[2],kt.hit("snare",.3),kt.hit("hat",.45)},wo=e=>{if(St+=e,dt+=e,d0+=e,ee*=Math.exp(-e/.12),Nt=.35+(Nt-.35)*Math.exp(-e/.6),_===1||_===3){Oe+=e,Re+=e;let o=Math.floor(Re/Q);o>30?(o=30,Re=0):Re-=o*Q;for(let h=0;h<o;h++){const m=C[2];if(Eo(),xe>0&&!h0&&m<-.01){const R=Math.min(1,-m/.3);ee=Math.max(ee,1.6*R),Nt+=.9*R;const T=Math.hypot(C[0],C[1],1);Tt[0]=0,Tt[1]=0,Tt[2]=-1,kt.note(43+Math.round((.027-V)*300),{dur:.9,vel:.25+.4*R,wave:"sine",cutoff:500+900*R}),R>.25&&kt.hit("kick",.25*R)}h0=xe>0}const a=E[0]*100,c=E[1]*100,l=E[2]*100;_===1&&(a<Y0[0]||a>Y0[1]||c<-9||c>14||l>17||G0&&xe>4||Oe>p0&&Math.hypot(C[0],C[2])<.05)&&J0(nt([.3*Math.sin(St*7),-.4,.86])),_===3&&(W0=7.5*dt/V,dt>go&&(_=0,dt=0))}else if(_===0)dt>j0*X0*(V0?.05:1)&&(k0=k()*40,B0=de[0]*(.75+.5*k()),X0=.6+1.4*k(),p0=de[2]*(.45+.9*k()),G0=k()<.1,me=(k()-.5)*.7,O0=yo(x0+1+(k()-.5)*3.5),u0=V0?He*.2:He,_=2,dt=0,We=1,kt.hit("noise",.25,{cutoff:520,dur:1.4}));else if(_===2&&dt>u0){const o=R0(1),a=Math.hypot(lt,o)+o,c=a-w;E[0]=(Mt[0]+H[0]*c)/100,E[1]=(Mt[1]+H[1]*c)/100,E[2]=(Mt[2]+H[2]*c)/100;const l=O0,h=Math.cos(me),m=Math.sin(me);C[0]=(H[0]*h-H[1]*m)*l,C[1]=(H[0]*m+H[1]*h)*l,C[2]=H[2]*l-.02,q0(.11,H),_=1,dt=0,Oe=0,d0=0,h0=!1,Re=0,Nt+=.8,kt.note(55+Math.round((.027-V)*300),{dur:.5,vel:.2,wave:"sine",cutoff:900})}},q=(e,o)=>{t.activeTexture(t.TEXTURE0+o),t.bindTexture(t.TEXTURE_2D,e)},m0=(e,o)=>{t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.bindVertexArray(d.vao);const a=_===1||_===3,c=a&&!o;if(c){for(let y=0;y<ct;y++)D0[y]=Z[y]*100;t.bindTexture(t.TEXTURE_2D,d.tNR),t.texSubImage2D(t.TEXTURE_2D,0,0,0,32,12,t.RED,t.FLOAT,D0),t.bindFramebuffer(t.FRAMEBUFFER,d.shape.fb),t.viewport(0,0,64,64);const g=Pt("sim");q(d.tNR,0),q(d.tND,1),q(d.tST[0],2),q(d.tST[1],3),q(d.tST[2],4),q(qe[Jt].t,5),q(d.tN,6),t.uniform4f(g.SU,w,1/(.115*.115),0,0),t.drawArrays(t.TRIANGLES,0,3)}const l=Math.max(0,Oe/p0-.55)*2.2;et[0]=Math.min(.05,Ke),et[1]=St,et[2]=de[1],et[3]=We?1:0,et[4]=Nt,et[5]=ee,et[6]=B0,et[7]=k0,et[8]=Tt[0],et[9]=Tt[1],et[10]=Tt[2],et[11]=l,t.bindFramebuffer(t.FRAMEBUFFER,qe[1-Jt].fb),t.viewport(0,0,128,128);const h=Pt("sim");if(c||(q(d.tNR,0),q(d.tND,1),q(d.tST[0],2),q(d.tST[1],3),q(d.tST[2],4),q(qe[Jt].t,5),q(d.tN,6)),t.uniform4fv(h.TU,et),t.uniform4f(h.SU,w,1,0,1),t.drawArrays(t.TRIANGLES,0,3),Jt=1-Jt,We&&We--,o)return;let m=0,R=0;if(a)for(let g=0;g<ct;g++){const y=Z[g];y>m&&(m=y);const ot=U[g*3+2];if(ot<-.25&&E[2]+y*ot<l0){const ht=y*Math.sqrt(1-ot*ot);ht>R&&(R=ht)}}let T=0,L=0,A=0,K=1,I=1;if(_===2){const g=R0(dt/u0),y=Math.hypot(lt,g),ot=y+g;T=Mt[0]+H[0]*g,L=Mt[1]+H[1]*g,A=Mt[2]+H[2]*g,K=y,I=Math.min(6,4*Math.PI*w*w/(2*Math.PI*y*ot))}Z0.set([E[0]*100,E[1]*100,E[2]*100,w,a?_:_===2?2:0,e,St,ue,T,L,A,K,oe[0],oe[1],oe[2],W0,d0,1.9,Math.min(1,xe/20),I,m*101+.02,R*100,2*(ve*2*Vt/rt)/w/(Math.PI/512)*.7,ho,rt,_e,_===2?0:1,0,Qt[0],Qt[1],Qt[2],0,ft[0],ft[1],ft[2],0]),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,rt,rt);const P=Pt("comp");d.compSC!==O&&(t.uniform4fv(P.SC,O),d.compSC=O),t.uniform4fv(P.U,Z0),q(F0.t,0),q(i0.t,1),q(d.shape.t,2),q(qe[Jt].t,3),q(d.tN,4),q(d.tF,5),t.drawArrays(t.TRIANGLES,0,3)};let Ke=0;for(let e=0;e<6;e++)Ke=.05,St+=.05,m0(0,!0);if(St=0,Ke=0,uo(),m0(0),!d.checked){d.checked=!0;for(const e in w0){const o=w0[e];t.getProgramParameter(o.p,t.LINK_STATUS)||console.error("480 "+e,t.getShaderInfoLog(o.f),t.getProgramInfoLog(o.p))}}return(e,o)=>{o=Math.min(Math.max(o,0),.25);const a=G.input;for(const c of a.taps()){const l=Q0(c.x,c.y),h=[E[0]*100-z[0],E[1]*100-z[1],E[2]*100-z[2]],m=l[0]*h[0]+l[1]*h[1]+l[2]*h[2],R=h[0]*h[0]+h[1]*h[1]+h[2]*h[2]-m*m;if(_===1&&R<w*w*1.05){const T=m-Math.sqrt(Math.max(0,w*w-R));J0(nt([z[0]+l[0]*T-E[0]*100,z[1]+l[1]*T-E[1]*100,z[2]+l[2]*T-E[2]*100]))}else if(_===1){const T=m,L=[z[0]+l[0]*T,z[1]+l[1]*T,z[2]+l[2]*T],A=[E[0]*100-L[0],E[1]*100-L[1],E[2]*100-L[2]],K=Math.hypot(A[0],A[1],A[2]),I=[A[0]/K,A[1]/K,A[2]/K],P=.065*Math.exp(-Math.max(0,K-w)/7);C[0]+=I[0]*P,C[1]+=I[1]*P,C[2]+=I[2]*P;for(let g=0;g<ct;g++){const y=-(U[g*3]*I[0]+U[g*3+1]*I[1]+U[g*3+2]*I[2]);y>0&&(tt[g]-=5*P*y*y*y)}Nt+=4*P,ee=Math.max(ee,6*P),Tt[0]=-I[0],Tt[1]=-I[1],Tt[2]=-I[2],kt.hit("noise",.2+P,{cutoff:1400,dur:.3})}}if(Et[0]=-y0*(1+(Kt==="Window Draught"?.6*Math.sin(St*2.1)*Math.sin(St*.7):0)),Et[1]=0,Et[2]=0,Ge=0,a.down&&a.inside?v0+=o:v0=0,v0>.2&&_===1){const c=Q0(a.x,a.y),l=[E[0]*100-z[0],E[1]*100-z[1],E[2]*100-z[2]],h=c[0]*l[0]+c[1]*l[1]+c[2]*l[2],m=[z[0]+c[0]*h,z[1]+c[1]*h,z[2]+c[2]*h],R=[l[0]+z[0]-m[0],l[1]+z[1]-m[1],l[2]+z[2]-m[2]],T=Math.hypot(R[0],R[1],R[2]),L=T<w*.8?bt:[R[0]/T,R[1]/T,R[2]/T],A=.3*Math.exp(-Math.max(0,T-w)/9);Et[0]+=L[0]*A,Et[1]+=L[1]*A,Et[2]+=L[2]*A,te[0]=L[0],te[1]=L[1],te[2]=L[2],Ge=1.5*ke*A*A,Nt=Math.max(Nt,.35+2.5*A)}Ke=o/It,wo(o/It),m0(e)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
