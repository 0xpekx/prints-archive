// Bubble Bounce: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/480.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(R0){R0&&R0.add({num:480,name:"Bubble Bounce",fam:"Worlds",recipe:"A bubble from a wand above lands on felt and squashes, wobbles and bounces, its rainbow film draining and swirling and its thin ring of shadow on the felt. The light, the bubble size and the draught change every mint. Tap beside it to puff it along, hold or drag to blow a stream of air, or tap the bubble to pop it and the wand blows another.",interactive:"Tap beside the bubble to puff air at it; hold or drag to blow a stream of air from your finger; tap the bubble itself to pop it, and the wand blows the next one.",music:!0,gl:!0,fps:30,seed:0,make(X){const t=X.gl,Y=X.size,Ct=X.hash.slice(2);let Qe=parseInt(Ct.slice(0,8),16)|0,ie=parseInt(Ct.slice(8,16),16)|0,Et=parseInt(Ct.slice(16,24),16)|0,Se=parseInt(Ct.slice(24,32),16)|0;const _=()=>{Qe>>>=0,ie>>>=0,Et>>>=0,Se>>>=0;let e=Qe+ie|0;return Qe=ie^ie>>>9,ie=Et+(Et<<3)|0,Et=Et<<21|Et>>>11,Se=Se+1|0,e=e+Se|0,Et=Et+e|0,(e>>>0)/4294967296};for(let e=0;e<12;e++)_();const Tt=e=>{let r=0;for(const c of e)r+=c[1];let a=_()*r;for(const c of e)if(a-=c[1],a<0)return c[0];return e[e.length-1][0]};let Ht=Tt([["Charcoal",28],["Moss Green",22],["Oxblood",18],["Ochre",14],["Ivory",11],["Ink Blue",7]]),Ft=Tt([["North Window",38],["Venetian Sun",26],["Desk Lamp",22],["Strip Lights",14]]),ut=Tt([["Small",26],["Medium",46],["Large",22],["Giant",6]]),Ne=Tt([["Dish Soap",44],["Glycerine",28],["Thin Mix",22],["Sugar Syrup",6]]),Me=Tt([["120 fps",28],["240 fps",50],["600 fps",22]]),ze=Tt([["Steel Wire",42],["Brass Ring",26],["Red Plastic",22],["Copper Twist",10]]),Kt=Tt([["Still",55],["Slow Drift",35],["Window Draught",10]]),jt=Tt([["Pressed",34],["Fuzzy",50],["Shaggy",16]]);const b0=0,g0=b0?[{felt:"Ivory",light:"North Window",shot:"High angle",wandShot:!1},{felt:"Ivory",light:"North Window",shot:"Three-quarter",wandShot:!1},{felt:"Charcoal",light:"North Window",shot:"Three-quarter",wandShot:!1},{felt:"Oxblood",light:"North Window",shot:"Felt level",wandShot:!1},{felt:"Ivory",light:"Venetian Sun",shot:"High angle",wandShot:!1},{felt:"Ivory",light:"Desk Lamp",shot:"Close-up",wandShot:!1},{felt:"Charcoal",light:"Desk Lamp",shot:"Felt level",wandShot:!1},{felt:"Ochre",light:"Strip Lights",shot:"Three-quarter",wandShot:!1},{felt:"Ochre",light:"Strip Lights",shot:"Felt level",wandShot:!1},{felt:"Moss Green",light:"Strip Lights",shot:"High angle",wandShot:!1},{size:"Giant",light:"Venetian Sun",shot:"Close-up",wandShot:!1},{size:"Giant",light:"North Window",shot:"Three-quarter",wandShot:!0},{felt:"Charcoal",mix:"Sugar Syrup",light:"North Window",shot:"Felt level",wandShot:!1},{wand:"Red Plastic",light:"Venetian Sun",shot:"Close-up",wandShot:!0},{felt:"Ochre",air:"Window Draught",light:"Strip Lights",shot:"Close-up",wandShot:!1}]:null,B=b0&&!X.home?g0[((window.__f480=(window.__f480||0)+1)-1)%g0.length]:null;B&&(B.felt&&(Ht=B.felt),B.light&&(Ft=B.light),B.size&&(ut=B.size),B.mix&&(Ne=B.mix),B.air&&(Kt=B.air),B.wand&&(ze=B.wand)),X.home&&(Ht="Charcoal",Ft="Venetian Sun",ut="Medium",Ne="Dish Soap",Me="240 fps",ze="Brass Ring",Kt="Still",jt="Fuzzy"),X.trait("Felt",Ht),X.trait("Light",Ft),X.trait("Bubble",ut),X.trait("Mixture",Ne),X.trait("Frame Rate",Me),X.trait("Wand",ze),X.trait("Air",Kt),X.trait("Nap",jt);let se=parseInt(Ct.slice(56,64),16)^1540483477|0;const Ut=()=>{se=se+1831565813|0;let e=Math.imul(se^se>>>15,1|se);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let vt="Three-quarter";{const e=[["Felt level",28],["High angle",12],["Close-up",26],["Three-quarter",34]];let r=Ut()*100;for(const a of e)if(r-=a[1],r<0){vt=a[0];break}}X.home&&(vt="Three-quarter");let le=parseInt(Ct.slice(48,56),16)^668265263|0;le=le+1831565813|0;let yt=Math.imul(le^le>>>15,1|le);yt=yt+Math.imul(yt^yt>>>7,61|yt)^yt;let wt=!X.home&&((yt^yt>>>14)>>>0)/4294967296<.2;B&&B.shot&&(vt=B.shot),B&&B.wandShot!==void 0&&(wt=B.wandShot),wt&&vt==="High angle"&&Ft==="Desk Lamp"&&(wt=!1);let fe=parseInt(Ct.slice(40,48),16)^374761393|0;const Fo=()=>{fe=fe+1831565813|0;let e=Math.imul(fe^fe>>>15,1|fe);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};(vt==="High angle"||vt==="Three-quarter")&&(Ht==="Ivory"||Ht==="Ochre")&&(Ft==="North Window"||Ft==="Strip Lights")&&(vt="Felt level"),X.trait("Shot",wt?vt+", on the wand":vt);const G=["Three-quarter","Felt level","Close-up","High angle"].indexOf(vt),O=["North Window","Venetian Sun","Desk Lamp","Strip Lights"].indexOf(Ft),Dt=Me==="120 fps"?4:Me==="240 fps"?8:20,Z=ut==="Small"?.022:ut==="Medium"?.027:ut==="Large"?.032:.038,de={"Dish Soap":[.9,1,4.2],Glycerine:[1.6,.45,7.5],"Thin Mix":[.42,1.9,2.6],"Sugar Syrup":[2.8,.22,13]}[Ne],he=jt==="Pressed"?6e-4:jt==="Fuzzy"?.0011:.002,ao=jt==="Pressed"?18:jt==="Fuzzy"?30:48,A0=Kt==="Still"?0:Kt==="Slow Drift"?.012:.035;let l=t.__c480;if(!l){const e=(o,i,s,p)=>{const u=(o-i)/(o<i?s:p);return Math.exp(-.5*u*u)},a=.0014285714285714286,c=1/400,d=[],h=[0,0,0];for(let o=0;o<10;o++){const i=a+(c-a)*(o+.5)/10,s=1/i,p=s*s*(c-a)/10,u=1.056*e(s,599.8,37.9,31)+.362*e(s,442,16,26.7)-.065*e(s,501.1,20.4,26.2),m=.821*e(s,568.8,46.9,40.5)+.286*e(s,530.9,16.3,31.1),g=1.217*e(s,437,11.8,36)+.681*e(s,459,26,13.8),S=[3.2406*u-1.5372*m-.4986*g,-.9689*u+1.8758*m+.0415*g,.0557*u-.204*m+1.057*g].map(F=>F*p);d.push([i,S]);for(let F=0;F<3;F++)h[F]+=S[F]}const R=(c-a)/10*.55,b=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
`,E=`
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
`,v=L+`
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
`,D=`
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
`,M=`
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
`,P=b+E+v+`
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
}`,H=b+E+L+M+`
uniform sampler2D uB;uniform vec4 BK;out vec4 o;
void main(){
 vec4 b=texelFetch(uB,ivec2(gl_FragCoord.xy),0);vec3 acc=dec(b.rgb);
 vec2 uv=gl_FragCoord.xy/BK.x,nd=uv*2.-1.;
 vec3 dir=normalize(CAMF+nd.x*TANH*CAMR+nd.y*TANH*CAMU);
 if(b.a>0.&&dir.z<0.){float t0=-CAMP.z/dir.z;vec3 p0=CAMP+dir*t0;
  float px=t0*2.*TANH/BK.x;float coc=2.*APER*abs(t0-FOCUS)/FOCUS;
  acc+=feltDetail(p0,dir,px*1.5+coc,acc)*b.a;}
 o=vec4(enc(acc),1.);
}`,V=b+E+L+D+`
out vec4 o;
void main(){
 vec2 f=gl_FragCoord.xy;bool A=f.y<256.;vec2 uv=vec2(f.x/256.,fract(f.y/256.));
 o=vec4(enc(emitL(A?RAP:RBP,uv,A?RAL:RBL,A?RAR:RBR)),1.);
}`,ae=b+`
uniform sampler2D uNR,uND,uS0,uS1,uS2,uT,uN;uniform vec4 SU,TU[3];out vec4 o;
`+E+`
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
void main(){if(SU.w>.5)thickP();else shapeP();}`,Mt=b+E+L+`
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
}`,He=b.replace(`precision highp float;precision highp int;precision highp sampler2D;
`,"")+"void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}";t.getExtension("KHR_parallel_shader_compile");const _t=o=>{const i=t.createShader(t.VERTEX_SHADER);t.shaderSource(i,He),t.compileShader(i);const s=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(s,o),t.compileShader(s);const p=t.createProgram();return t.attachShader(p,i),t.attachShader(p,s),t.linkProgram(p),{p,f:s}},m0={bake:_t(P),comp:_t(Mt),felt:_t(H),sim:_t(ae),light:_t(V)};t.flush();const f=6,T=(1+Math.sqrt(5))/2,C=[[-1,T,0],[1,T,0],[-1,-T,0],[1,-T,0],[0,-1,T],[0,1,T],[0,-1,-T],[0,1,-T],[T,0,-1],[T,0,1],[-T,0,-1],[-T,0,1]],K=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]],it=[],re=new Map,st=[],Ke=(o,i,s)=>{const p=Math.hypot(o,i,s);o/=p,i/=p,s/=p;const u=Math.round(o*1e5)+","+Math.round(i*1e5)+","+Math.round(s*1e5);let m=re.get(u);return m===void 0&&(m=it.length/3,re.set(u,m),it.push(o,i,s)),m};for(const o of K){const i=C[o[0]],s=C[o[1]],p=C[o[2]],u=[];for(let m=0;m<=f;m++){u.push([]);for(let g=0;m+g<=f;g++){const S=m/f,F=g/f;u[m].push(Ke(i[0]+(s[0]-i[0])*S+(p[0]-i[0])*F,i[1]+(s[1]-i[1])*S+(p[1]-i[1])*F,i[2]+(s[2]-i[2])*S+(p[2]-i[2])*F))}}for(let m=0;m<f;m++)for(let g=0;m+g<f;g++)st.push(u[m][g],u[m+1][g],u[m][g+1]),m+g<f-1&&st.push(u[m+1][g],u[m+1][g+1],u[m][g+1])}const Q=it.length/3,y=new Float64Array(it),lt=Array.from({length:Q},()=>new Set),k=new Float64Array(Q);for(let o=0;o<st.length;o+=3){const i=st[o],s=st[o+1],p=st[o+2];lt[i].add(s),lt[i].add(p),lt[s].add(i),lt[s].add(p),lt[p].add(i),lt[p].add(s);const u=y[s*3]-y[i*3],m=y[s*3+1]-y[i*3+1],g=y[s*3+2]-y[i*3+2],S=y[p*3]-y[i*3],F=y[p*3+1]-y[i*3+1],et=y[p*3+2]-y[i*3+2],zt=Math.hypot(m*et-g*F,g*S-u*et,u*F-m*S)/6;k[i]+=zt,k[s]+=zt,k[p]+=zt}let Bt=0;for(let o=0;o<Q;o++)Bt+=k[o];for(let o=0;o<Q;o++)k[o]*=4*Math.PI/Bt;const gt=new Int32Array(Q+1);let At=0;for(let o=0;o<Q;o++)gt[o]=At,At+=lt[o].size;gt[Q]=At;const be=new Int32Array(At),ge=new Float64Array(At),Ae=new Float64Array(Q);for(let o=0;o<Q;o++){let i=gt[o],s=0;for(const p of lt[o]){be[i]=p;const u=y[o*3]*y[p*3]+y[o*3+1]*y[p*3+1]+y[o*3+2]*y[p*3+2];ge[i]=u,s+=1-u,i++}Ae[o]=2*k[o]/s}const Ee=32,Q0=12,Te=new Float32Array(Ee*Q0*4);for(let o=0;o<Q;o++)Te[o*4]=y[o*3],Te[o*4+1]=y[o*3+1],Te[o*4+2]=y[o*3+2],Te[o*4+3]=1;const J=64,J0=[new Float32Array(J*J*4),new Float32Array(J*J*4),new Float32Array(J*J*4)],ye=new Int32Array(12),ce=new Float64Array(12),$0=(o,i)=>{let s=o*2-1,p=i*2-1,u=1-Math.abs(s)-Math.abs(p);const m=Math.max(-u,0);s+=s>=0?-m:m,p+=p>=0?-m:m;const g=Math.hypot(s,p,u);return[s/g,p/g,u/g]},Gt=8,to=[];for(let o=0;o<Gt;o++)for(let i=0;i<Gt;i++){const s=$0((i+.5)/Gt,(o+.5)/Gt),p=[];for(let u=0;u<Q;u++)s[0]*y[u*3]+s[1]*y[u*3+1]+s[2]*y[u*3+2]>.6&&p.push(u);to.push(p)}for(let o=0;o<J;o++)for(let i=0;i<J;i++){const[s,p,u]=$0((i+.5)/J,(o+.5)/J),m=to[(o*Gt/J|0)*Gt+(i*Gt/J|0)];ce.fill(-9),ye.fill(0);for(const S of m){const F=s*y[S*3]+p*y[S*3+1]+u*y[S*3+2];if(F>ce[11]){let et=11;for(;et>0&&ce[et-1]<F;)ce[et]=ce[et-1],ye[et]=ye[et-1],et--;ce[et]=F,ye[et]=S}}const g=(o*J+i)*4;for(let S=0;S<12;S++)J0[S>>2][g+(S&3)]=ye[S]}const je=(o,i,s,p,u,m,g,S)=>{const F=t.createTexture();return t.bindTexture(t.TEXTURE_2D,F),t.texImage2D(t.TEXTURE_2D,0,s,o,i,0,p,u,m),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,g),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,g),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,S),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,S),F},go=je(Ee,Q0,t.RGBA32F,t.RGBA,t.FLOAT,Te,t.NEAREST,t.CLAMP_TO_EDGE),Ao=J0.map(o=>je(J,J,t.RGBA32F,t.RGBA,t.FLOAT,o,t.NEAREST,t.CLAMP_TO_EDGE)),Ve=256,x0=new Uint8Array(Ve*Ve*4);let Xt=-1640531527;for(let o=0;o<x0.length;o++)Xt^=Xt<<13,Xt^=Xt>>>17,Xt^=Xt<<5,x0[o]=Xt>>>0&255;const Eo=je(Ve,Ve,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,x0,t.LINEAR,t.REPEAT),we=512,Ye=32,Ot=new Float32Array(we*Ye*4),Wt=1.335;for(let o=0;o<Ye;o++){const i=Math.max(.001,(o/(Ye-1))**2),s=Math.sqrt(Math.max(0,1-(1-i*i)/(Wt*Wt))),p=(i-Wt*s)/(i+Wt*s),u=(Wt*i-s)/(Wt*i+s),m=p*p,g=u*u;for(let S=0;S<we;S++){const F=12.566*Wt*(S/(we-1)*5e3)*s,et=Math.exp(-.5*F*F*R*R),zt=(o*we+S)*4;for(const[ne,Lo]of d){const Ze=Math.cos(F*ne)*et,So=m*(1-Ze)/(1+m*m-2*m*Ze)+g*(1-Ze)/(1+g*g-2*g*Ze);for(let Le=0;Le<3;Le++)Ot[zt+Le]+=Lo[Le]/h[Le]*So}for(let ne=0;ne<3;ne++)Ot[zt+ne]=Math.max(0,Ot[zt+ne]);Ot[zt+3]=1}}const eo=new Uint16Array(Ot.length),oo=new Float32Array(1),To=new Uint32Array(oo.buffer);for(let o=0;o<Ot.length;o++){oo[0]=Ot[o];const i=To[0],s=(i>>>23&255)-112;eo[o]=s<=0?0:s>=31?31743:s<<10|i>>>13&1023}const yo=je(we,Ye,t.RGBA16F,t.RGBA,t.HALF_FLOAT,eo,t.LINEAR,t.CLAMP_TO_EDGE),wo=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float");t.getExtension("OES_texture_float_linear"),l=t.__c480={progs:m0,tND:go,tST:Ao,tN:Eo,tF:yo,half:wo,vao:t.createVertexArray(),N:Q,D:y,om:k,off:gt,nbi:be,cij:ge,kap:Ae,tg:{},linked:!1}}if(!l.linked){for(const a in l.progs){const c=l.progs[a];t.getProgramParameter(c.p,t.LINK_STATUS)||console.error("480 "+a,t.getShaderInfoLog(c.f),t.getProgramInfoLog(c.p))}const e=(a,c)=>{const d={};for(const h of c)d[h]=t.getUniformLocation(a,h);return d};l.u={bake:e(l.progs.bake.p,["SC","BK","EB","uL","uN"]),light:e(l.progs.light.p,["SC","uN"]),felt:e(l.progs.felt.p,["SC","BK","uB","uN"]),sim:e(l.progs.sim.p,["uNR","uND","uS0","uS1","uS2","SU","uT","uN","TU"]),comp:e(l.progs.comp.p,["SC","U","uBP","uEnv","uSh","uTh","uN","uF"])};const r=(a,c,d)=>{const h=t.createTexture();t.bindTexture(t.TEXTURE_2D,h),t.texImage2D(t.TEXTURE_2D,0,d?t.RGBA16F:t.RGBA8,a,c,0,t.RGBA,d?t.HALF_FLOAT:t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const R=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,R),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,h,0),{t:h,fb:R}};l.t2=r,l.shape=r(64,64,l.half),l.tNR=t.createTexture(),t.bindTexture(t.TEXTURE_2D,l.tNR),t.texImage2D(t.TEXTURE_2D,0,t.R32F,32,12,0,t.RED,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),l.linked=!0}const Pt=l.progs,x=l.u;l.tg[Y]||(l.tg[Y]=l.t2(Y,Y,!1));const E0=l.tg[Y],rt=l.N,U=l.D,Ce=l.om,T0=l.off,ro=l.nbi,y0=l.cij,w0=l.kap,w=Z*100,co=he*100,Uo=(e,r,a)=>[e,r,a],ct=e=>{const r=Math.hypot(e[0],e[1],e[2]);return[e[0]/r,e[1]/r,e[2]/r]},Fe=(e,r)=>[e[1]*r[2]-e[2]*r[1],e[2]*r[0]-e[0]*r[2],e[0]*r[1]-e[1]*r[0]],Ue=-.13+(_()-.5)*.06,no=.23+(_()-.5)*.02,kt=-1.6+(_()-.5)*.8,L0=G===0?Ue:G===1?Ue+(Ut()-.5)*.3:G===2?Ue+(Ut()-.3)*.25:Ue+(Ut()-.5)*.4,Je=G===0?no:G===1?.035+Ut()*.03:G===2?.12+Ut()*.06:.62+Ut()*.12,Vt=[52,48,34,50][G],mt=G===0?[kt+1,0,3.6+(w-2.7)*.7]:G===1?[.6,0,4+(w-2.7)*.7]:G===2?[-1,0,3.6+(w-2.7)*.9]:[.8,1.5,3.2+(w-2.7)*.6];wt&&(mt[0]=2-(ut==="Giant"?1.2:0),mt[1]=1.5,mt[2]=6.6+(w-2.7)*(ut==="Giant"?3.4:1.1));const z=[mt[0]-Math.sin(L0)*Math.cos(Je)*Vt,mt[1]-Math.cos(L0)*Math.cos(Je)*Vt,mt[2]+Math.sin(Je)*Vt],xt=ct([mt[0]-z[0],mt[1]-z[1],mt[2]-z[2]]),It=ct(Fe(xt,[0,0,1])),Yt=Fe(It,xt),io=22,ve=(G===2?4.9+(w-2.7)*.6:G===3?7.2+(w-2.7)*.6:G===0?5.2+(w-2.7)*.5:6.6+(w-2.7)*.6)/Vt*(wt?(G===2?1.45:1.1)*(ut==="Giant"?1.2:1):1),Zt={Charcoal:[.05,.05,.055],"Moss Green":[.05,.095,.04],Oxblood:[.15,.022,.026],Ochre:[.36,.19,.045],Ivory:[.55,.5,.4],"Ink Blue":[.025,.04,.13]}[Ht],$e=["Steel Wire","Brass Ring","Red Plastic","Copper Twist"].indexOf(ze),t0=[[.62,.62,.64],[.9,.62,.28],[.42,.025,.02],[.9,.45,.28]][$e],so=[.075,.11,.1,.095][$e],S0=5.3+(_()-.5)*.5,ot=[G===0?kt+S0-1.3:S0,2.5,9.9+(w-2.7)*1.3+(G===0?1.8:0)],ft=1.55+(w-2.7)*.45,nt=ct([-.86,-.48,-.06]),e0=ct(Fe(nt,Fe([0,0,1],nt))),De=[ot[0]+e0[0]*ft,ot[1]+e0[1]*ft,ot[2]+e0[2]*ft+70],o0=De,a0=[ot[0]-nt[0]*5,ot[1]-nt[1]*5,ot[2]-nt[2]*5],r0=[ot[0]-nt[0]*1.7,ot[1]-nt[1]*1.7,ot[2]-nt[2]*1.7],j=new Float32Array(124),n=(e,r,a,c,d)=>{j[e*4]=r,j[e*4+1]=a,j[e*4+2]=c,j[e*4+3]=d};n(0,O,co,O===3?2:1,0),n(1,Zt[0],Zt[1],Zt[2],_()*50);let pt,pe,ue,Pe;if(O===0||O===1){const e=O===0?[4.6,5.1,5.9]:[3.6,3.2,2.7];if(n(2,e[0],e[1],e[2],O),O===1?(n(3,-40,38,8,92),n(4,-55,1,0,1)):(n(3,-50,8,1,70),n(4,-20,1,0,1)),n(5,0,0,0,0),n(6,0,1,0,1),n(7,0,1,0,0),O===1){const r=ct([-1,-.42,.62]);n(8,r[0],r[1],r[2],1),n(9,2.6,1.9,1.15,2.6),pt=r,pe=.012}else n(8,0,0,1,0),n(9,0,0,0,2.6),pt=ct([-20,-21,36]),pe=.35;n(10,0,0,0,0),n(11,0,0,0,0),O===0?(n(12,.085,.09,.105,0),n(13,.012,.018,.032,0),n(14,.022,.026,.034,0)):(n(12,.4,.38,.35,0),n(13,.007,.004,.0022,0),n(14,.045,.038,.028,0)),ue=O===0?3.4:1.9,Pe=O===0?.55:.85}else if(O===2){n(2,.2,.15,.1,2),n(3,-22,10,-.3,30),n(4,-24,1,0,0),n(5,.03,.04,.07,4),n(6,-40,10,14,75),n(7,70,-1,1,1),n(8,0,0,1,0),n(9,0,0,0,2.6);const e=[16,-12,27];n(10,e[0],e[1],e[2],1),n(11,2400,1900,1380,0),n(12,.33,.29,.25,0),n(13,.05,.03,.017,0),n(14,.006,.0052,.0045,0),pt=ct(e),pe=.12,ue=1.05,Pe=.9}else{n(2,6,6.2,6.7,3),n(3,-30,30,19,33),n(4,-24,1,1,1),n(5,4.5,4.6,5,3),n(6,-30,30,21,35),n(7,24,-1,1,1),n(8,0,0,1,0),n(9,0,0,0,2.6),n(10,0,0,0,0),n(11,0,0,0,0);const e=ct([0,24,28]);n(12,.02,.02,.022,e[0]),n(13,.01,.012,.017,e[1]),n(14,.004,.004,.005,e[2]),pt=ct([0,-24,26]),pe=.3,ue=2.8,Pe=.6}n(15,2+(_()-.5)*2,16,32,-.12+(_()-.5)*.1),n(16,400,400,.6,80),n(17,ot[0],ot[1],ot[2],ft),n(18,nt[0],nt[1],nt[2],so),n(19,z[0],z[1],z[2],Vt),n(20,xt[0],xt[1],xt[2],ve),n(21,It[0],It[1],It[2],.5),n(22,Yt[0],Yt[1],Yt[2],0),n(23,t0[0],t0[1],t0[2],$e),n(24,o0[0],o0[1],o0[2],O===2?90:0),n(25,De[0],De[1],De[2],0),n(26,a0[0],a0[1],a0[2],0),n(27,r0[0],r0[1],r0[2],0),n(28,pt[0],pt[1],pt[2],pe),n(29,1,2,48,18);const dt=[0,0,0];for(const[e,r]of[[2,3],[5,6]]){const a=j.slice(r*4+4,r*4+8),c=j.slice(r*4,r*4+4);if(a[3]<.5)continue;const d=(c[0]+c[1])/2,h=(c[2]+c[3])/2,R=a[2]<.5?[a[0],d,h]:[d,a[0],h],b=Math.hypot(R[0],R[1],R[2]),E=Math.abs(a[2]<.5?R[0]:R[1])/b,L=(c[1]-c[0])*(c[3]-c[2]);for(let v=0;v<3;v++)dt[v]+=j[e*4+v]*L*E/(Math.PI*b*b)*.6/Math.max(.2,(R[0]*pt[0]+R[1]*pt[1]+R[2]*pt[2])/b)}if(O===1&&(dt[0]+=j[36],dt[1]+=j[37],dt[2]+=j[38]),O===2){const e=j.slice(40,43),r=e[0]*e[0]+e[1]*e[1]+e[2]*e[2];for(let a=0;a<3;a++)dt[a]+=j[44+a]/r}{const e=[.3,.3,.1,.25][O];n(30,dt[0]*e,dt[1]*e,dt[2]*e,O===2?0:2.6)}const Qt=[kt,0,w];ue*=Math.min(1.15,Math.pow(.075/(.3*Zt[0]+.6*Zt[1]+.1*Zt[2]),.22));const N0=l.t2(Y,Y,!1),c0=l.t2(512,512,!1);t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.bindVertexArray(l.vao);const M0=l.t2(256,512,!1);t.bindFramebuffer(t.FRAMEBUFFER,M0.fb),t.viewport(0,0,256,512),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,l.tN),t.useProgram(Pt.light.p),t.uniform4fv(x.light.SC,j),t.uniform1i(x.light.uN,2),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,M0.t),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,E0.fb),t.viewport(0,0,Y,Y),t.useProgram(Pt.bake.p),t.uniform1i(x.bake.uL,1),t.uniform1i(x.bake.uN,2),t.uniform4fv(x.bake.SC,j),t.uniform4f(x.bake.BK,Y,_()*6.28,24,0),t.uniform4f(x.bake.EB,0,0,0,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,N0.fb),t.useProgram(Pt.felt.p),t.uniform4fv(x.felt.SC,j),t.uniform4f(x.felt.BK,Y,0,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,E0.t),t.uniform1i(x.felt.uB,0),t.uniform1i(x.felt.uN,2),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,c0.fb),t.useProgram(Pt.bake.p),t.viewport(0,0,512,512),t.uniform4f(x.bake.BK,512,0,1,0),t.uniform4f(x.bake.EB,Qt[0],Qt[1],Qt[2],1),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,c0.t),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR);const ke=[l.t2(128,128,l.half),l.t2(128,128,l.half)];let Jt=0;const $=new Float64Array(rt),at=new Float64Array(rt),z0=new Float64Array(rt),C0=new Float32Array(32*12),A=[kt/100,0,0],N=[0,0,0],lo=.05,Ie=1.2,F0=12e-7,tt=.001,qe=Ie*Z*(.5+1/3)+1e3*F0,U0=4/3*Math.PI*Z**3,_e=1e3*F0*4*Math.PI*Z*Z,$t=_e+Ie*U0*1.5,fo=.8*qe/(tt*tt),ho=.5*qe/tt,vo=2e-6,n0=.15*he,D0=-.85*he,i0=.5*Ie*.47*Math.PI*Z*Z,Rt=[-A0,0,0],te=[0,0,0];let Be=0,me=0;const po=()=>{let e=0,r=0,a=0,c=0;for(let f=0;f<rt;f++){const T=$[f],C=at[f],K=f*3,it=U[K],re=U[K+1],st=U[K+2];let Ke=0,Q=0;for(let k=T0[f],Bt=T0[f+1];k<Bt;k++){const gt=ro[k];Ke+=$[gt]*y0[k]-T,Q+=at[gt]*y0[k]-C}const y=Ce[f]*T*T;let lt=lo*w0[f]*Ke+vo*w0[f]*Q;if(Be>0){const k=-(it*te[0]+re*te[1]+st*te[2]);k>0&&(lt-=Be*y*k*k)}if(st<-.25){const k=n0-(A[2]+T*st);if(k>0){const Bt=Math.min(1,k/he),gt=N[2]+C*st;let At=fo*Math.min(k,he)-ho*gt*Bt;At<0&&(At=0);const be=ao*Bt*y,ge=-be*(N[0]+C*it),Ae=-be*(N[1]+C*re),Ee=At*y;lt+=ge*it+Ae*re+Ee*st,e+=ge,r+=Ae,a+=Ee,c++}}z0[f]=lt/(qe*y)-.5*C}let d=0;for(let f=0;f<rt;f++){at[f]+=tt*z0[f],$[f]+=tt*at[f];const T=U[f*3+2];if(T<-.25&&A[2]+$[f]*T<D0){$[f]=(D0-A[2])/T;const C=N[2]/-T;at[f]>C&&(d+=qe*Ce[f]*$[f]*$[f]*(at[f]-C)*-T,at[f]=C)}}a+=d/tt;const h=N[0]-Rt[0],R=N[1]-Rt[1],b=N[2]-Rt[2],E=i0*Math.hypot(h,R,b);N[0]+=tt*(e-E*h)/$t,N[1]+=tt*(r-E*R)/$t,N[2]+=tt*(a-E*b-_e*9.81)/$t,A[0]+=tt*N[0],A[1]+=tt*N[1],A[2]+=tt*N[2];let L=0,v=0,D=0,M=0,P=0,H=0;for(let f=0;f<rt;f++){const T=Ce[f],C=f*3,K=T*$[f],it=T*at[f];L+=K*U[C],v+=K*U[C+1],D+=K*U[C+2],M+=it*U[C],P+=it*U[C+1],H+=it*U[C+2]}const V=3/(4*Math.PI);L*=V,v*=V,D*=V,M*=V,P*=V,H*=V,A[0]+=L,A[1]+=v,A[2]+=D;let ae=0,Mt=0,He=0;for(let f=0;f<rt;f++){const T=f*3;$[f]-=L*U[T]+v*U[T+1]+D*U[T+2],at[f]-=M*U[T]+P*U[T+1]+H*U[T+2];const C=Ce[f],K=$[f];ae+=C*K*K*K/3,Mt+=C*K*K,He+=C*K*K*at[f]}const _t=(U0-ae)/Mt,m0=He/Mt;for(let f=0;f<rt;f++)$[f]+=_t,at[f]-=m0;me=c},P0=(e,r)=>{for(let a=0;a<rt;a++){const c=U[a*3]*r[0]+U[a*3+1]*r[1]+U[a*3+2]*r[2];$[a]=Z*(1+e*(1.5*c*c-.5)),at[a]=0}},uo=(e,r)=>{let a=e,c=r,d=0;const h=.002;for(;d<4;)if(c+=h*(-_e*9.81-i0*Math.abs(c)*c)/$t,a+=h*c,d+=h,c<0&&a-Z<=n0)return d;return 4};{const e=3.75/Dt,r=Z+.045;let a=-.6,c=.8;for(let d=0;d<30;d++){const h=(a+c)/2;uo(r,h)<e?a=h:c=h}A[0]=kt/100+.004,A[2]=r,N[0]=-.004*(Dt/8),N[2]=(a+c)/2,P0(.05,[.3,.2,.93])}let I=1,ht=0,Ge=1.2,Lt=0,xe=0,s0=2.2+_()*2,ee=0,St=.6,l0=!1,f0=0,d0=de[2]*(.85+.3*_()),k0=3.7,I0=de[0],q0=1,_0=!1,B0=.11,Re=0;const bt=[0,0,-1],oe=[0,0,1];let G0=0,Xe=2;const W=nt,Nt=ot,mo=e=>{const r=Math.hypot(ft,e),a=r+e;return Math.PI*a*a*(3*r-a)/3};let X0;{const e=1.3333333333333333*Math.PI*w**3;let r=-3*ft,a=3*ft;for(let c=0;c<40;c++){const d=(r+a)/2;mo(d)<e?r=d:a=d}X0=(r+a)/2}const O0=-2.4*ft,Oe=2.6/Dt+.05,W0=1.3/Dt+.02,xo=Math.PI*Z/7.5,H0=G===0&&!wt;let h0=Oe;wt&&(I=0,ht=W0+.9*Oe-4/Dt);const v0=G===0?kt+1:kt,K0=G===0?[v0-7.5,v0+7.5]:[-9.5,9.5],Ro=e=>{const r=p0(1),a=Math.hypot(ft,r)+r,c=a-w,d=Math.cos(Re),h=Math.sin(Re),R=W[0]*d-W[1]*h;let b=0,E=.25;for(let L=0;L<14;L++){const v=(b+E)/2;let D=(Nt[0]+W[0]*c)/100,M=(Nt[2]+W[2]*c)/100,P=R*v,H=W[2]*v-.02,V=0;for(;M>Z&&V<3;){const ae=Math.hypot(P,H),Mt=i0*ae/$t;P-=.004*Mt*P,H+=.004*(-_e*9.81/$t-Mt*H),D+=.004*P,M+=.004*H,V+=.004}D*100>e==R<0?b=v:E=v}return(b+E)/2},p0=e=>{const r=e<1?e*e*(3-2*e):1;return O0+(X0-O0)*(.15*e+.85*r)},j0=new Float32Array(36),V0=new Float32Array(12),qt=X.sound,Y0=(e,r)=>{const a=e*2-1,c=1-r*2;return ct([xt[0]+(a*It[0]+c*Yt[0])*ve,xt[1]+(a*It[1]+c*Yt[1])*ve,xt[2]+(a*It[2]+c*Yt[2])*ve])},Z0=e=>{I=3,ht=0,oe[0]=e[0],oe[1]=e[1],oe[2]=e[2],qt.hit("snare",.3),qt.hit("hat",.45)},bo=e=>{if(Lt+=e,ht+=e,s0+=e,ee*=Math.exp(-e/.12),St=.35+(St-.35)*Math.exp(-e/.6),I===1||I===3){Ge+=e,xe+=e;let r=Math.floor(xe/tt);r>30?(r=30,xe=0):xe-=r*tt;for(let h=0;h<r;h++){const R=N[2];if(po(),me>0&&!l0&&R<-.01){const b=Math.min(1,-R/.3);ee=Math.max(ee,1.6*b),St+=.9*b;const E=Math.hypot(N[0],N[1],1);bt[0]=0,bt[1]=0,bt[2]=-1,qt.note(43+Math.round((.027-Z)*300),{dur:.9,vel:.25+.4*b,wave:"sine",cutoff:500+900*b}),b>.25&&qt.hit("kick",.25*b)}l0=me>0}const a=A[0]*100,c=A[1]*100,d=A[2]*100;I===1&&(a<K0[0]||a>K0[1]||c<-9||c>14||d>17||_0&&me>4||Ge>d0&&Math.hypot(N[0],N[2])<.05)&&Z0(ct([.3*Math.sin(Lt*7),-.4,.86])),I===3&&(G0=7.5*ht/Z,ht>xo&&(I=0,ht=0))}else if(I===0)ht>W0*q0*(H0?.05:1)&&(k0=_()*40,I0=de[0]*(.75+.5*_()),q0=.6+1.4*_(),d0=de[2]*(.45+.9*_()),_0=_()<.1,Re=(_()-.5)*.7,B0=Ro(v0+1+(_()-.5)*3.5),h0=H0?Oe*.2:Oe,I=2,ht=0,Xe=1,qt.hit("noise",.25,{cutoff:520,dur:1.4}));else if(I===2&&ht>h0){const r=p0(1),a=Math.hypot(ft,r)+r,c=a-w;A[0]=(Nt[0]+W[0]*c)/100,A[1]=(Nt[1]+W[1]*c)/100,A[2]=(Nt[2]+W[2]*c)/100;const d=B0,h=Math.cos(Re),R=Math.sin(Re);N[0]=(W[0]*h-W[1]*R)*d,N[1]=(W[0]*R+W[1]*h)*d,N[2]=W[2]*d-.02,P0(.11,W),I=1,ht=0,Ge=0,s0=0,l0=!1,xe=0,St+=.8,qt.note(55+Math.round((.027-Z)*300),{dur:.5,vel:.2,wave:"sine",cutoff:900})}},q=(e,r,a)=>{t.activeTexture(t.TEXTURE0+a),t.bindTexture(t.TEXTURE_2D,r),t.uniform1i(e,a)},u0=e=>{t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.bindVertexArray(l.vao);const r=I===1||I===3;if(r){for(let v=0;v<rt;v++)C0[v]=$[v]*100;t.bindTexture(t.TEXTURE_2D,l.tNR),t.texSubImage2D(t.TEXTURE_2D,0,0,0,32,12,t.RED,t.FLOAT,C0),t.bindFramebuffer(t.FRAMEBUFFER,l.shape.fb),t.viewport(0,0,64,64),t.useProgram(Pt.sim.p),q(x.sim.uNR,l.tNR,0),q(x.sim.uND,l.tND,1),q(x.sim.uS0,l.tST[0],2),q(x.sim.uS1,l.tST[1],3),q(x.sim.uS2,l.tST[2],4),q(x.sim.uT,ke[Jt].t,5),q(x.sim.uN,l.tN,6),t.uniform4f(x.sim.SU,w,1/(.115*.115),0,0),t.drawArrays(t.TRIANGLES,0,3)}let a=0,c=0;if(r)for(let v=0;v<rt;v++){const D=$[v];D>a&&(a=D);const M=U[v*3+2];if(M<-.25&&A[2]+D*M<n0){const P=D*Math.sqrt(1-M*M);P>c&&(c=P)}}const d=Math.max(0,Ge/d0-.55)*2.2;V0.set([Math.min(.05,We),Lt,de[1],Xe?1:0,St,ee,I0,k0,bt[0],bt[1],bt[2],d]),t.bindFramebuffer(t.FRAMEBUFFER,ke[1-Jt].fb),t.viewport(0,0,128,128),t.useProgram(Pt.sim.p),q(x.sim.uNR,l.tNR,0),q(x.sim.uND,l.tND,1),q(x.sim.uS0,l.tST[0],2),q(x.sim.uS1,l.tST[1],3),q(x.sim.uS2,l.tST[2],4),q(x.sim.uT,ke[Jt].t,5),q(x.sim.uN,l.tN,6),t.uniform4fv(x.sim.TU,V0),t.uniform4f(x.sim.SU,w,1,0,1),t.drawArrays(t.TRIANGLES,0,3),Jt=1-Jt,Xe&&Xe--;let h=0,R=0,b=0,E=1,L=1;if(I===2){const v=p0(ht/h0),D=Math.hypot(ft,v),M=D+v;h=Nt[0]+W[0]*v,R=Nt[1]+W[1]*v,b=Nt[2]+W[2]*v,E=D,L=Math.min(6,4*Math.PI*w*w/(2*Math.PI*D*M))}j0.set([A[0]*100,A[1]*100,A[2]*100,w,r?I:I===2?2:0,e,Lt,ue,h,R,b,E,oe[0],oe[1],oe[2],G0,s0,1.9,Math.min(1,me/20),L,a*101+.02,c*100,2*(ve*2*Vt/Y)/w/(Math.PI/512)*.7,io,Y,Pe,I===2?0:1,0,Qt[0],Qt[1],Qt[2],0,dt[0],dt[1],dt[2],0]),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,Y,Y),t.useProgram(Pt.comp.p),t.uniform4fv(x.comp.SC,j),t.uniform4fv(x.comp.U,j0),q(x.comp.uBP,N0.t,0),q(x.comp.uEnv,c0.t,1),q(x.comp.uSh,l.shape.t,2),q(x.comp.uTh,ke[Jt].t,3),q(x.comp.uN,l.tN,4),q(x.comp.uF,l.tF,5),t.drawArrays(t.TRIANGLES,0,3)};let We=0;for(let e=0;e<6;e++)We=.05,Lt+=.05,u0(0);return Lt=0,We=0,u0(0),(e,r)=>{r=Math.min(Math.max(r,0),.25);const a=X.input;for(const c of a.taps()){const d=Y0(c.x,c.y),h=[A[0]*100-z[0],A[1]*100-z[1],A[2]*100-z[2]],R=d[0]*h[0]+d[1]*h[1]+d[2]*h[2],b=h[0]*h[0]+h[1]*h[1]+h[2]*h[2]-R*R;if(I===1&&b<w*w*1.05){const E=R-Math.sqrt(Math.max(0,w*w-b));Z0(ct([z[0]+d[0]*E-A[0]*100,z[1]+d[1]*E-A[1]*100,z[2]+d[2]*E-A[2]*100]))}else if(I===1){const E=R,L=[z[0]+d[0]*E,z[1]+d[1]*E,z[2]+d[2]*E],v=[A[0]*100-L[0],A[1]*100-L[1],A[2]*100-L[2]],D=Math.hypot(v[0],v[1],v[2]),M=[v[0]/D,v[1]/D,v[2]/D],P=.065*Math.exp(-Math.max(0,D-w)/7);N[0]+=M[0]*P,N[1]+=M[1]*P,N[2]+=M[2]*P;for(let H=0;H<rt;H++){const V=-(U[H*3]*M[0]+U[H*3+1]*M[1]+U[H*3+2]*M[2]);V>0&&(at[H]-=5*P*V*V*V)}St+=4*P,ee=Math.max(ee,6*P),bt[0]=-M[0],bt[1]=-M[1],bt[2]=-M[2],qt.hit("noise",.2+P,{cutoff:1400,dur:.3})}}if(Rt[0]=-A0*(1+(Kt==="Window Draught"?.6*Math.sin(Lt*2.1)*Math.sin(Lt*.7):0)),Rt[1]=0,Rt[2]=0,Be=0,a.down&&a.inside?f0+=r:f0=0,f0>.2&&I===1){const c=Y0(a.x,a.y),d=[A[0]*100-z[0],A[1]*100-z[1],A[2]*100-z[2]],h=c[0]*d[0]+c[1]*d[1]+c[2]*d[2],R=[z[0]+c[0]*h,z[1]+c[1]*h,z[2]+c[2]*h],b=[d[0]+z[0]-R[0],d[1]+z[1]-R[1],d[2]+z[2]-R[2]],E=Math.hypot(b[0],b[1],b[2]),L=E<w*.8?xt:[b[0]/E,b[1]/E,b[2]/E],v=.3*Math.exp(-Math.max(0,E-w)/9);Rt[0]+=L[0]*v,Rt[1]+=L[1]*v,Rt[2]+=L[2]*v,te[0]=L[0],te[1]=L[1],te[2]=L[2],Be=1.5*Ie*v*v,St=Math.max(St,.35+2.5*v)}We=r/Dt,bo(r/Dt),u0(e)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
