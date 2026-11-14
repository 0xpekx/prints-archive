// Hose Rainbow: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/414.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(io){io&&io.add({num:414,name:"Hose Rainbow",fam:"Worlds",recipe:"A hose nozzle on a garden stake, or sometimes a soaker hose, sprays across a shaded wall with the low sun at your back, and the rainbow sits where a real one would, with a faint second bow outside it. The spray, the wall and the breeze change every mint. Drag to swing the nozzle (or roll the soaker hose) and the bow holds its place, or tap to twist the nozzle from shower to mist to fog to jet, or turn the soaker's tap up.",interactive:"Drag to swing the nozzle, or on a soaker hose to roll it and lean every jet: the spray moves but the bow holds its angle in the sky. Tap to twist the nozzle to its next spray, from a coarse shower to fine mist and fog, or to turn the soaker's tap up a step.",music:!0,gl:!0,fps:30,seed:0,make(F){const t=F.gl,at=F.size,z=Math.PI/180,Et=F.hash.slice(2);let Ge=parseInt(Et.slice(0,8),16)|0,jt=parseInt(Et.slice(8,16),16)|0,xt=parseInt(Et.slice(16,24),16)|0,ce=parseInt(Et.slice(24,32),16)|0;const N=()=>{Ge>>>=0,jt>>>=0,xt>>>=0,ce>>>=0;let e=Ge+jt|0;return Ge=jt^jt>>>9,jt=xt+(xt<<3)|0,xt=xt<<21|xt>>>11,ce=ce+1|0,e=e+ce|0,xt=xt+e|0,(e>>>0)/4294967296};for(let e=0;e<12;e++)N();const zt=e=>{let o=0;for(const i of e)o+=i[1];let f=N()*o;for(const i of e)if(f-=i[1],f<0)return i[0];return e[e.length-1][0]},Te=["Shower","Mist","Fog","Jet Fan"];let st=zt([["Shower",40],["Mist",30],["Jet Fan",20],["Fog",10]]),Ft=zt([["Old Brick",50],["Tarred Boards",25],["Old Render",25]]),ut=zt([["Evening",45],["Morning",40],["Last Light",15]]),Ee=zt([["Clear",88],["Polariser",12]]),bt=zt([["Still",35],["Light Air",45],["Gusty",20]]),ie=zt([["Brass",50],["Green Plastic",30],["Chrome",20]]),Dt=zt([["Gravel",50],["Flagstones",35],["Moss",15]]),Ht=parseInt(Et.slice(48,56),16)^94421985|0;const Io=()=>{Ht=Ht+1831565813|0;let e=Math.imul(Ht^Ht>>>15,1|Ht);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},E=Array.from({length:32},Io),Wt=F.home||Et.startsWith("589ae5dc"),D=!Wt&&(st==="Shower"||st==="Mist")&&E[0]<.23;D&&(st="Soaker Hose"),F.home&&(st="Shower",Ft="Old Brick",ut="Evening",Ee="Clear",bt="Light Air",ie="Brass",Dt="Gravel"),F.trait("Spray",st),F.trait("Wall",Ft),F.trait("Sun",ut),F.trait("Lens",Ee),F.trait("Breeze",bt),F.trait("Fitting",D?"None":ie),F.trait("Ground",Dt);const ze=Ft==="Old Brick"?0:Ft==="Tarred Boards"?1:2,Ct=Dt==="Gravel"?0:Dt==="Flagstones"?1:2,j=F.home?1:N()<.45?-1:1;let ke=F.home?.82:.76+N()*.22,Ae=(F.home?1.5:-1+N()*5)*z;Wt||(ke=.87+(ke-.87)*1.5,Ae=1.5*z+(Ae-1.5*z)*1.5);let Vt=parseInt(Et.slice(40,48),16)^68468958|0;const Zt=()=>{Vt=Vt+1831565813|0;let e=Math.imul(Vt^Vt>>>15,1|Vt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let nt=(()=>{const e=Zt();return e<.5?"Crouched":e<.72?"Standing over it":e<.9?"Stepped back":"Down in the wet"})();F.home&&(nt="Crouched"),!F.home&&nt==="Crouched"&&Zt()<.3&&(nt="Along the wall");const it=!Wt&&(D?E[1]<.5:(st==="Mist"||st==="Fog")&&E[1]<.2);it&&(nt="The whole bow"),D&&nt==="Standing over it"&&(nt="Crouched"),F.trait("View",nt);const le=!Wt&&E[24]<.24&&nt!=="Stepped back"&&!it;F.trait("Wall Feature",le?"Garden Door":"Plain");const qe="w"+ze+(le?"d":""),wt=it?[.36+E[2]*.12,6+E[3]*5,0,44+E[4]*3]:nt==="Standing over it"?[1.42,-13-Zt()*4,-.55,31.5]:nt==="Down in the wet"?[.26,9+Zt()*4,.1,31.5]:nt==="Stepped back"?[.7,-2-Zt()*3,-1.9,31.5]:null,q=wt?[0,wt[0],wt[2]]:[0,ke,0],Kt=wt?wt[1]*z:Ae,ht=Math.tan((wt?wt[3]:31.5)*z),R=[0,Math.sin(Kt),Math.cos(Kt)],H=[1,0,0],et=[0,Math.cos(Kt),-Math.sin(Kt)],lo=nt==="Along the wall",he=it&&st==="Fog",Re=(ut==="Evening"?18:ut==="Morning"?23:7)*z+(N()-.5)*2*z,fe=j*(-28+(N()-.5)*5)*z,ft=[Math.sin(fe)*Math.cos(Re),-Math.sin(Re),Math.cos(fe)*Math.cos(Re)],Le=ut==="Evening"?[1,.86,.7]:ut==="Morning"?[.97,.97,.95]:[1,.56,.27],Oo=ut==="Morning"?1.15:ut==="Last Light"?.8:1,de=j*(14+N()*16)*z,Xo=3+N()*.8,W=[-Math.sin(de),0,Math.cos(de)],dt=[Math.cos(de),0,Math.sin(de)],V=[0,0,Xo],L=[j*(-.3+(N()-.5)*.3),.36+N()*.2,1.12+N()*.3];if(F.home&&(L[0]=-.28,L[1]=.44,L[2]=1.2),!Wt&&!D&&!it&&E[5]<1/3&&(L[2]=2+E[6]*.6),lo){const e=j*19*z,o=-2*z,f=1.45;R[0]=Math.sin(e)*Math.cos(o),R[1]=Math.sin(o),R[2]=Math.cos(e)*Math.cos(o),H[0]=Math.cos(e),H[1]=0,H[2]=-Math.sin(e),et[0]=-Math.sin(e)*Math.sin(o),et[1]=Math.cos(o),et[2]=-Math.cos(e)*Math.sin(o);const i=[L[0]+j*.55,.72,L[2]+.5];q[0]=i[0]-R[0]*f,q[1]=i[1]-R[1]*f,q[2]=i[2]-R[2]*f}if(it){const e=fe,o=Kt;if(R[0]=Math.sin(e)*Math.cos(o),R[1]=Math.sin(o),R[2]=Math.cos(e)*Math.cos(o),H[0]=Math.cos(e),H[1]=0,H[2]=-Math.sin(e),et[0]=-Math.sin(e)*Math.sin(o),et[1]=Math.cos(o),et[2]=-Math.cos(e)*Math.sin(o),!D){const f=(E[22]-.5)*.5;L[0]=Math.sin(e)*1.25+Math.cos(e)*f,L[2]=Math.cos(e)*1.25-Math.sin(e)*f}if(he){const f=1.3+E[22]*.3,i=-j*f*ht*1.2;L[0]=Math.sin(e)*f+Math.cos(e)*i,L[2]=Math.cos(e)*f-Math.sin(e)*i}}const ho=.0098,gt=[L[0]-j*(.28+N()*.14),ho,L[2]+.38+N()*.2],Nt=[L[0]-j*(.7+N()*.3),gt[2]-.05+N()*.15],_t=[L[0]-j*1.5,L[2]-.7],jo=7+Math.floor(N()*7);let fo=null,vo=0;if(D){const e=Math.hypot(R[0],R[2]),o=[R[0]/e,R[2]/e],f=[o[1],-o[0]],i=ft[0]*f[0]+ft[2]*f[1]<0?-1:1,y=it?1.55+E[7]*.4:nt==="Stepped back"?2.5+E[7]*.4:1.6+E[7]*.8;it&&(q[0]=-o[0]*y,q[2]=1.5-o[1]*y);const u=y*ht,h=(n,G)=>{const x=q[0]+f[0]*n+o[0]*G,w=q[2]+f[1]*n+o[1]*G,M=(x-V[0])*W[0]+(w-V[2])*W[2],rt=M>-.7?(M+.7)/Math.max(o[0]*W[0]+o[1]*W[2],.3):0;return[x-o[0]*rt,w-o[1]*rt]},d=h(i*u*(1.3+.25*E[8]),y+(E[9]-.5)*.6),T=h(-i*u*(.45+.6*E[10]),y+(E[11]-.5)*.6),s=h(i*u*(E[12]-.5)*.8,y+(E[13]-.5)*1.1);gt[0]=d[0],gt[2]=d[1],Nt[0]=s[0],Nt[1]=s[1],_t[0]=T[0],_t[1]=T[1];let l=0;for(let n=0;n<24;n++){const G=M=>[(1-M)*(1-M)*d[0]+2*(1-M)*M*s[0]+M*M*T[0],(1-M)*(1-M)*d[1]+2*(1-M)*M*s[1]+M*M*T[1]],x=G(n/24),w=G((n+1)/24);l+=Math.hypot(w[0]-x[0],w[1]-x[1])}vo=Math.round(l/.025),fo=[.1+E[14]*.3,(E[15]<.5?-1:1)*(.5+.6*E[17]),.55+E[18]*.35,(E[19]<.5?-1:1)*(.3+.6*E[20])]}const ct=bt==="Still"?[.03*j,0,.02]:bt==="Light Air"?[.25*j,.02,.1]:[.55*j,.05,.22],Ho=bt==="Gusty"?1:bt==="Light Air"?.35:.08,Wo=Ee==="Polariser"?(N()<.5?.35:1.25)+N()*.3:-10,Se=N()*100,Vo=[22e-6,7e-5,22e-5,65e-5],ve=[.055,.42,1.75,4.6],Fe=ve.map(e=>e/9.81),mt=[4e3,6e3,16e3,6e3],po=mt.reduce((e,o)=>e+o),Zo=mt[2]+mt[3],Ko={Shower:[.05,.35,1,.7],Mist:[.35,1,.25,.04],Fog:[1,.25,.02,0],"Jet Fan":[0,.1,.8,1]},De={Shower:[10,.26,.13,4.5],Mist:[7,.22,.2,6],Fog:[5.5,.3,.28,6.5],"Jet Fan":[10.5,.24,.035,3.5]};let r=t.__c414;const J=512,yt=4*z,Ce=86*z,Yo=()=>{const i=Math.round(12e3)+1,y=new Float64Array(i),u=new Float64Array(i);let h=8,d=2/3*Math.pow(h,1.5),T=Math.exp(-d)/(2*Math.sqrt(Math.PI)),s=T/Math.pow(h,.25)*(1-5/(72*d)+385/(10368*d*d)),l=-Math.pow(h,.25)*T*(1+7/(72*d)-455/(10368*d*d));const n=-.004;for(let c=0;c<i;c++){y[c]=s*s;const p=l,b=h*s,O=l+.5*n*b,X=(h+.5*n)*(s+.5*n*p),A=l+.5*n*X,K=(h+.5*n)*(s+.5*n*O),U=l+n*K,Lt=(h+n)*(s+n*A);s+=n/6*(p+2*O+2*A+U),l+=n/6*(b+2*X+2*K+Lt),h+=n}for(let c=1;c<i;c++)u[c]=u[c-1]+.5*(y[c]+y[c-1])*.004;const G=c=>{if(c<=-8)return 0;const p=(c- -8)/.004,b=Math.floor(p),O=p-b;return u[b]+(u[b+1]-u[b])*O},x=u[i-1],w=Math.sqrt(40),M=2/3*40*w+Math.PI/4,rt=c=>{if(c<=40)return G(c);const p=Math.sqrt(c),b=2/3*c*p+Math.PI/4;return x+(p-w)/Math.PI-(Math.sin(2*b)/c-Math.sin(2*M)/40)/(4*Math.PI)},P=new Float64Array(J+1),S=(c,p,b,O)=>{const X=(c-p)/(c<p?b:O);return Math.exp(-.5*X*X)},Z=12,qt=5,Rt=[-1.4,-.7,0,.7,1.4],It=[];let Gt=0,se=0,a=0;const m=(c,p,b)=>[3.2406*c-1.5372*p-.4986*b,-.9689*c+1.8758*p+.0415*b,.0557*c-.204*p+1.057*b];for(let c=0;c<Z;c++){const p=395+310*(c+.5)/Z,b=1.056*S(p,599.8,37.9,31)+.362*S(p,442,16,26.7)-.065*S(p,501.1,20.4,26.2),O=.821*S(p,568.8,46.9,40.5)+.286*S(p,530.9,16.3,31.1),X=1.217*S(p,437,11.8,36)+.681*S(p,459,26,13.8),A=p*1e-9,K=1/(Math.pow(A,5)*(Math.exp(.014388/(A*6504))-1)),U=m(b*K,O*K,X*K);It.push([p,U[0],U[1],U[2]]),Gt+=U[0],se+=U[1],a+=U[2]}for(const c of It)c[1]/=Gt,c[2]/=se,c[3]/=a;const g=(c,p)=>{const b=Math.sqrt(Math.max(0,1-c*c)),O=Math.sqrt(Math.max(0,1-b*b/(p*p))),X=(c-p*O)/(c+p*O),A=(p*c-O)/(p*c+O);return[X*X,A*A]},k=new Float32Array(J*8*4),C=(Ce-yt)/J;for(let c=0;c<4;c++){let p=0;for(let b=0;b<qt;b++)p+=Math.exp(2*.42*Rt[b]);for(let b=0;b<qt;b++){const O=Vo[c]*Math.exp(.42*Rt[b]),X=Math.exp(2*.42*Rt[b])/p;for(const A of It){const K=A[0],U=1.324+3046/(K*K),Lt=2*Math.PI*O/(K*1e-9);for(let Y=1;Y<=2;Y++){const re=Math.sqrt((U*U-1)/(Y*(Y+2))),Tt=Math.sqrt(1-re*re),St=$=>2*Math.asin($)-2*(Y+1)*Math.asin($/U)+Y*Math.PI,oo=St(Tt),ye=1e-4,v0=(St(Tt+ye)-2*oo+St(Tt-ye))/(ye*ye),Uo=Y===1?Math.PI-oo:oo-Math.PI,Bo=v0/2,ao=Math.pow(Lt,2/3)/Math.cbrt(Bo),Ot=g(re,U),so=(1-Ot[0])*(1-Ot[0])*Math.pow(Ot[0],Y),ro=(1-Ot[1])*(1-Ot[1])*Math.pow(Ot[1],Y),p0=2*Tt*Math.cbrt(Lt)/Math.cbrt(Bo)*.5*X;for(let $=0;$<=J;$++){const ne=yt+$*C,Me=Y===1?(Uo-ne)*ao:(ne-Uo)*ao;P[$]=Me<-8?0:rt(Me)}const u0=C*ao;for(let $=0;$<J;$++){const ne=Y===1?P[$]-P[$+1]:P[$+1]-P[$];if(ne<=0)continue;const Me=yt+($+.5)*C,Xt=ne/u0*p0/Math.max(Math.sin(Me),.12),no=(c*2*J+$)*4,co=((c*2+1)*J+$)*4;k[no]+=Xt*so*A[1],k[no+1]+=Xt*so*A[2],k[no+2]+=Xt*so*A[3],k[co]+=Xt*ro*A[1],k[co+1]+=Xt*ro*A[2],k[co+2]+=Xt*ro*A[3]}}}}for(let b=0;b<J;b++){const O=yt+(b+.5)*C,X=g(Math.cos(O/2),1.333),A=(c*2*J+b)*4,K=((c*2+1)*J+b)*4;for(let U=0;U<3;U++)k[A+U]+=.5*X[0]/(4*Math.PI),k[K+U]+=.5*X[1]/(4*Math.PI)}}const Q=[1.1,.5,.6,.65],tt=new Float32Array(J*4);for(let c=0;c<8;c++){const p=Q[c>>1]*z/C,b=Math.ceil(p*2.6),O=[];let X=0;for(let A=-b;A<=b;A++){const K=Math.exp(-.5*A*A/(p*p));O.push(K),X+=K}for(let A=0;A<J;A++){let K=0,U=0,Lt=0;for(let Y=-b;Y<=b;Y++){const re=A+Y<0?0:A+Y>=J?J-1:A+Y,Tt=(c*J+re)*4,St=O[Y+b];K+=k[Tt]*St,U+=k[Tt+1]*St,Lt+=k[Tt+2]*St}tt[A*4]=K/X,tt[A*4+1]=U/X,tt[A*4+2]=Lt/X}k.set(tt,c*J*4)}return k},Jo=(()=>{const e=new Float32Array(1),o=new Uint32Array(e.buffer);return f=>{e[0]=f;const i=o[0],y=i>>>16&32768;let u=(i>>>23&255)-112,h=i&8388607;return u<=0?y:u>=31?y|31743:y|u<<10|h>>>13}})(),$o=`#version 300 es
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}`,Mt=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
uniform vec4 G[21];
uint hh(uint x){x^=x>>16;x*=0x7feb352du;x^=x>>15;x*=0x846ca68bu;x^=x>>16;return x;}
float h1(uint x){return float(hh(x)>>8)*(1./16777216.);}
vec3 gam(vec3 c,float k){float l=max(dot(c,vec3(.2126,.7152,.0722)),0.);float mn=min(min(c.r,c.g),c.b);if(mn<0.)c=mix(vec3(l),c,l/(l-mn+1e-6));return mix(vec3(l),c,k);}
vec3 rayDir(vec2 uv){return normalize(G[1].xyz+(2.*uv.x-1.)*G[0].w*G[2].xyz+(2.*uv.y-1.)*G[0].w*G[3].xyz);}
`,Qo=(e,o)=>Mt+`#define PASS ${e}
#define WALLT ${e===0?o:-1}
#define GT ${e===1?o:-1}

uniform sampler2D uN;
#define NU int(G[13].y)
out vec4 o;
float vn(vec2 p){return textureLod(uN,p*.03125,0.).g;}
uniform sampler2D uF;
float fb(vec2 p){return textureLod(uF,p*.03125,0.).r;}
float hc(vec2 c,float k){return h1(uint(int(c.x)+8192)*2654435761u^uint(int(c.y)+8192)*40503u^uint(k));}
// sun-flecks: the low sun through gaps in the tree's leaves, each a soft ellipse; one per cell, no neighbour search
float fleck(vec2 g){vec2 c=floor(g);vec2 f=g-c-.5-(vec2(hc(c,31.),hc(c,37.))-.5)*.45;float r=.07+.14*hc(c,41.);return step(.6,hc(c,43.))*smoothstep(r,0.,length(f));}
#if PASS==0
// wall surface: height (m) and albedo

float JM;
vec4 brick(vec2 q){
 vec3 col;float ht;float jm=0.;
#if WALLT==0
  // old handmade bricks in garden wall bond: courses wander, every brick a little long or short, high or low,
  // tilted in its bed, arrises worn round and chipped; the lime mortar raked out by weather and crumbling back
  float ch=.0765;
  float yy=q.y+.006*(vn(vec2(q.x*.9,7.))-.5)+.003*(vn(vec2(q.x*3.1,3.))-.5);
  float row=floor(yy/ch),by=yy-row*ch;
  bool hrow=mod(row+floor(G[11].w),4.)==0.;
  float bl=hrow?.1125:.225;
  float x=q.x+(hrow?0.:mod(row,2.)*.1125)+.04*(hc(vec2(row,5.),1.)-.5);
  float cell=floor(x/bl);
  float x0=cell*bl+.018*(hc(vec2(cell,row),21.)-.5),x1=(cell+1.)*bl+.018*(hc(vec2(cell+1.,row),21.)-.5);
  if(x<x0){cell-=1.;x1=x0;x0=cell*bl+.018*(hc(vec2(cell,row),21.)-.5);}
  else if(x>x1){cell+=1.;x0=x1;x1=(cell+1.)*bl+.018*(hc(vec2(cell+1.,row),21.)-.5);}
  vec2 id=vec2(cell,row);
  float r=hc(id,7.),r2=hc(id,11.),r3=hc(id,13.),r4=hc(id,17.),r5=hc(id,29.);
  float bx=x-x0,bw=x1-x0;
  float ex=min(bx-.004-.003*r,bw-.004-.003*r2-bx),ey=min(by-.0035-.005*r3,ch-.0035-.005*r4-by);
  float rr=.006+.004*r5;
  vec2 wv=vec2(rr-ex,rr-ey);
  float e=rr-length(max(wv,0.))-min(max(wv.x,wv.y),0.);
  e+=.0035*(fb(q*95.+id*1.3)-.5)+.004*(fb(q*24.+id*2.1)-.5)*(.4+r2);
  float face=.0016*(r-.5)+(bx/bw-.5)*.003*(r2-.5)+(by/ch-.5)*.0025*(r4-.5)
   +.0012*(fb(q*240.+id)-.5)+.0005*(vn(q*800.)-.5)-.004*pow(textureLod(uN,q*2.3+id*.071,0.).r,10.);
  float arr=smoothstep(0.,.008,e);face-=.0045*(1.-arr)*(1.-arr);
  float spall=step(.88,r2)*smoothstep(.38,.62,fb(q*22.+id*3.));
  face-=spall*.008*(.6+.4*vn(q*180.));
  float ero=fb(q*6.+3.)*.65+.35*fb(q*48.);
  float mort=-.005-.013*smoothstep(.3,.75,ero)-.004*fb(q*150.)-.003*pow(textureLod(uN,q*4.1,0.).a,6.);
  ht=mix(mort,face,smoothstep(-.0004,.003,e));
  jm=1.-smoothstep(0.,.002,e);
  // stocks, reds, a few overfired purples and pale buffs; headers burnt darker; fire flash along some
  vec3 bc=r5<.44?vec3(.40,.19,.11):r5<.7?vec3(.34,.15,.095):r5<.82?vec3(.25,.13,.11):r5<.88?vec3(.42,.30,.19):r5<.96?vec3(.31,.21,.15):vec3(.20,.13,.12);
  bc*=(.84+.3*r)*.68;
  bc*=mix(1.,.6+.2*r3,smoothstep(.2,1.,r4>.5?bx/bw:1.-bx/bw)*step(.55,r2));
  if(hrow)bc=mix(bc,vec3(.15,.09,.09),.25+.45*r2);
  bc*=.7+.6*fb(q*15.+id*1.7);bc=mix(bc,vec3(dot(bc,vec3(.33))),.15);
  bc*=.86+.28*textureLod(uN,q*3.+id*.13,0.).r;
  bc=mix(bc,vec3(.13,.11,.10),smoothstep(.75,.95,textureLod(uN,q*1.7+id*.3,0.).a)*.5);
  bc=mix(bc,vec3(.42,.28,.19),spall*.65);
  vec3 mc=vec3(.44,.42,.37)*(.68+.45*fb(q*40.))*(.82+.36*textureLod(uN,q*5.,0.).r);
  mc=mix(mc,vec3(.17,.15,.13),smoothstep(.45,.85,ero)*.55);
  col=mix(mc,bc,smoothstep(0.,.002,e));
#elif WALLT==1
  // featheredge boards, tarred and weathered, each lapping the next
  float bwid=.15,cell=floor(q.x/bwid),fx=q.x/bwid-cell;
  float r=hc(vec2(cell,1.),3.);
  ht=-.012*fx-.003*smoothstep(.0,.04,fx)+.012;
  float grain=fb(vec2(q.x*160.+r*30.,q.y*6.))+.5*fb(vec2(q.x*600.,q.y*20.+r*9.));
  ht+=.0006*grain;
  col=vec3(.08,.066,.055)*(.75+.5*grain);
  float worn=smoothstep(.55,.8,fb(vec2(q.x*30.+r*5.,q.y*2.5))+.25*(1.-smoothstep(0.,.5,q.y)));
  col=mix(col,vec3(.16,.13,.105)*(.6+.6*grain),worn*.7);
  col*=.85+.3*r;
  col*=.5+.5*smoothstep(0.,.07,fx);col+=vec3(.05,.045,.04)*smoothstep(.9,1.,fx);
  float nail=length(vec2((fx-.15)*bwid,mod(q.y,.48)-.24-.01*r));
  col=mix(vec3(.12,.06,.03),col,smoothstep(.0028,.0042,nail));
#else
  // old lime render, limewashed long ago: hairline cracks, and patches fallen away to the brick beneath
  col=vec3(.36,.34,.29)*(.72+.38*fb(q*2.6))*(.88+.18*fb(q*38.));
  col=mix(col,vec3(.36,.36,.30),smoothstep(.55,.75,fb(q*1.3+9.))*.5);
  ht=.0018*fb(q*22.)+.0007*fb(q*130.);
  float pm=fb(q*3.1+3.)+.07*fb(q*24.)+.08*(1.-smoothstep(0.,.8,q.y))-.03;
  float pch=smoothstep(.635,.645,pm);
  float rim=smoothstep(.62,.635,pm)*(1.-pch);
  // the render's broken top edge has a thickness that shades the brick below it; damp stains run down from each gap
  float f0=fb(q*3.1+3.);
  float pmU=pm+fb((q+vec2(0.,.014))*3.1+3.)-f0;
  float esh=pch*(1.-smoothstep(.635,.645,pmU));
  float pmS=pm+fb((q+vec2(0.,.05+.12*fb(vec2(q.x*16.,2.))))*3.1+3.)-f0;
  float stn=(1.-pch)*smoothstep(.6,.66,pmS)*(.5+.5*fb(vec2(q.x*40.,q.y*2.)));
  float row=floor(q.y/.076);float bx=fract((q.x+mod(row,2.)*.1125)/.225),by=fract(q.y/.076);
  float jt=min(min(bx,1.-bx)*.225,min(by,1.-by)*.076);
  vec3 bk=mix(vec3(.24,.22,.19),mix(vec3(.23,.13,.09),vec3(.29,.17,.12),hc(floor(vec2((q.x+mod(row,2.)*.1125)/.225,row)),3.))*(.75+.4*fb(q*30.)),smoothstep(.003,.007,jt));
  col*=1.-.3*stn;
  col=mix(col,bk,pch);col*=1.-.35*rim;col*=1.-.6*esh;
  ht=mix(ht,-.012+.004*smoothstep(.003,.007,jt),pch)+.0015*rim;
  vec2 cw=q*2.2+vec2(fb(q*3.),fb(q*3.+5.))*.7;vec2 ci=floor(cw);float b1=9.,b2=9.;
  for(int j=-1;j<=NU;j++)for(int i=-1;i<=NU;i++){vec2 c=ci+vec2(i,j);vec2 pp=c+vec2(hc(c,1.),hc(c,2.));float d=length(cw-pp);if(d<b1){b2=b1;b1=d;}else if(d<b2)b2=d;}
  float crk=(1.-smoothstep(.0,.025,b2-b1))*smoothstep(.45,.6,fb(q*4.+1.))*(1.-pch);
  col*=1.-.6*crk;ht-=.0015*crk;
#endif
 JM=jm;
 return vec4(col,ht);
}
// weather over any wall, applied once per sample (not in the slope taps): grime run down from above, damp and algae
// at the foot, lichen spots, lime bloom
vec3 weather(vec2 q,vec3 col,float jm){
 float run=fb(vec2(q.x*9.,q.y*.6))*smoothstep(.5,2.8,q.y);
 col*=1.-.25*smoothstep(.45,.8,run);
 float damp=1.-smoothstep(.05,.5+.25*fb(q*3.),q.y);
 col=mix(col,col*.55,damp);
 float alg=damp*smoothstep(.45,.7,fb(q*22.+3.));
 col=mix(col,vec3(.05,.075,.025)*(.6+.8*fb(q*180.)),alg*.85);
 float lich=smoothstep(.62,.7,fb(q*14.+11.))*step(.3,q.y);
 col=mix(col,vec3(.30,.31,.24)*(.7+.5*vn(q*300.)),lich*.6*smoothstep(.5,.9,vn(q*90.)));
 float bloom=smoothstep(.6,.85,fb(q*5.+21.))*(1.-smoothstep(.3,1.4,q.y));
 col=mix(col,vec3(.45,.43,.4),bloom*.35);
 // efflorescence: salts drawn out of the mortar dry white on the faces, heaviest along the joints and low down
 float eff=smoothstep(.55,.85,fb(q*vec2(1.6,2.4)+41.)+.32*(1.-smoothstep(.1,1.1,q.y))+.15*jm)*(.55+.45*fb(q*9.+9.));
 col=mix(col,vec3(.52,.51,.48)*(.9+.2*vn(q*400.)),eff*.45);
 // moss at the foot: cushions in the joints first, spilling over the lowest bricks
 float mz=1.-smoothstep(.03,.22+.16*fb(q*vec2(3.,1.)+5.),q.y);
 float moss=mz*smoothstep(.42,.62,fb(q*16.+7.)+.35*jm+.25*mz);
 float mt=fb(q*420.);
 col=mix(col,mix(vec3(.05,.10,.025),vec3(.17,.21,.05),smoothstep(.45,.8,mt))*(.55+.7*vn(q*900.)),moss*.92);
 // the patch the spray reaches: dark wet brick with runs down from it
 vec2 wq=(q-G[17].xy)/G[17].z;
 float wet=smoothstep(1.,.55,length(wq*vec2(.8,1.))+.45*(fb(q*2.5+17.)-.5))*G[17].w;
 float rn=smoothstep(.55,.75,fb(vec2(q.x*30.,q.y*1.2)+3.))*step(q.y,G[17].y)*smoothstep(1.4,.3,abs(wq.x))*G[17].w;
 wet=max(wet,rn*.7);
 col=mix(col,pow(col,vec3(1.18))*.62,wet);
 col*=.8+.35*fb(q*.35+2.);
 float st=fb(q*vec2(.9,.5)+13.);col*=1.-.4*smoothstep(.5,.75,st);
 col=mix(col,col*vec3(.8,.85,.75),smoothstep(.45,.7,fb(q*.7+31.)));
 return col;
}
#else
// ground: gravel, flagstones or moss
vec4 grd(vec2 p,out float occ){
 vec3 col;float ht;occ=1.;
#if GT==0
  // washed pea shingle and flint: rounded stones of mixed size and colour, packed on a bed of grit
  vec2 g=p*24.;vec2 gi=floor(g);float best=9.,sec=9.;vec2 bid=vec2(0);vec2 bp=vec2(0);
  for(int j=-1;j<=NU;j++)for(int i=-1;i<=NU;i++){vec2 c=gi+vec2(i,j);vec2 q=c+.15+.7*vec2(hc(c,1.),hc(c,2.));float d=length(g-q);if(d<best){sec=best;best=d;bid=c;bp=q;}else if(d<sec)sec=d;}
  float r=hc(bid,4.),rr=hc(bid,6.),r3=hc(bid,8.);
  vec2 dv=g-bp;float an=r3*6.283;dv=mat2(cos(an),sin(an),-sin(an),cos(an))*dv;dv.x*=1.+.7*rr;
  float dd=length(dv)/(.13+.5*pow(r,1.4));
  float dome=sqrt(max(0.,1.-dd*dd));
  float sk=smoothstep(.0,.12,sec-best);
  float hs=dome*sk;
  // grit between
  vec2 id2=floor(p*170.);
  float gd=smoothstep(.3,.85,textureLod(uN,p*2.,0.).g)*.8;
  float hb=.009*pow(hs,.8)*(.55+.6*rr);
  ht=max(hb,.0045*gd)+.0007*(fb(p*260.+bid)-.5);
  bool big=hb>.0045*gd;
  float pc=hc(big?bid:id2,9.);
  col=pc<.35?vec3(.42,.35,.26):pc<.6?vec3(.33,.30,.27):pc<.75?vec3(.50,.40,.27):pc<.86?vec3(.24,.22,.21):pc<.97?vec3(.40,.25,.15):vec3(.55,.53,.5);
  col*=(.78+.4*fb(p*(big?90.:300.)+bid*3.))*.76;col=mix(col,vec3(dot(col,vec3(.33))),.25);
  col*=.9+.2*textureLod(uN,p*7.,0.).r;
  // the fines between: sandy grit, darker in the gaps
  if(!big)col=mix(col,vec3(.26,.22,.17),.5)*(.5+.25*gd);
  occ=mix(.4,1.,smoothstep(.0,.0045,ht));
#elif GT==1
  // old York stone slabs of uneven length, each settled at its own tilt; joints full of grit and moss
  vec2 g=p/vec2(.6,.45);g+=vec2(.025,.035)*(vec2(vn(p*3.1),vn(p*2.7+9.))-.5);float row=floor(g.y);g.x+=hc(vec2(row,0.),2.)*.9;
  vec2 gi=floor(g),f=fract(g);
  float r=hc(gi,3.),r2=hc(gi,5.);
  float e=min(min(f.x,1.-f.x)*.6,min(f.y,1.-f.y)*.45);
  e+=.008*(fb(p*60.+gi)-.5)+.007*(fb(p*14.)-.5)-.003;
  float tilt=(f.x-.5)*.005*(r-.5)+(f.y-.5)*.005*(r2-.5);
  float slab=.002*fb(p*25.+gi)+.0008*vn(p*400.)+tilt-.0015*smoothstep(.5,.8,fb(p*6.+gi));
  ht=mix(-.006,slab,smoothstep(.0,.01,e));
  col=mix(vec3(.22,.2,.17),vec3(.29,.26,.21),r)*(.65+.55*fb(p*10.+gi*3.))*(.8+.3*fb(p*1.3));
  col*=.85+.25*textureLod(uN,p*6.,0.).r;
  col=mix(col,vec3(.13,.12,.10),smoothstep(.5,.75,fb(p*3.+gi))*.5);
  col=mix(col,vec3(.34,.34,.29),smoothstep(.72,.8,fb(p*34.+gi*7.))*smoothstep(.5,.7,fb(p*2.+gi))*.45);
  vec3 jc=mix(vec3(.16,.135,.10),vec3(.07,.11,.035),smoothstep(.45,.65,fb(p*30.)));
  col=mix(jc*(.6+.8*fb(p*200.)),col,smoothstep(.0,.01,e));
  occ=mix(.65,1.,smoothstep(.0,.01,e));
#else
  float m=fb(p*60.),m2=fb(p*400.);
  ht=.004*m+.0015*m2;
  col=mix(vec3(.05,.09,.02),vec3(.13,.17,.04),m)*(.6+.7*m2);
  col=mix(col,vec3(.2,.17,.11),smoothstep(.6,.75,fb(p*8.))*.6);
  occ=.7+.3*m2;
#endif
 return vec4(col,ht);
}
// the hose lying on the ground: a quadratic curve from where it lands behind the stake, out of frame
vec2 hq(float t){vec2 a=G[18].xz,b=G[19].xy,c=G[19].zw;float s=1.-t;return s*s*a+2.*s*t*b+t*t*c;}
float hdist(vec2 p,out vec2 cl){float d=9.;vec2 a=hq(0.);cl=a;for(int i=1;i<=12*NU;i++){vec2 b=hq(float(i)/12.);vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);vec2 c=a+ba*h;float e=length(p-c);if(e<d){d=e;cl=c;}a=b;}return d;}
float wetG(vec2 p){return smoothstep(1.,.45,length((p-G[16].xy)/G[16].z)+.4*(fb(p*2.2+11.)-.5))*G[16].w;}
#endif
void main(){
 vec2 uv=gl_FragCoord.xy/G[2].w;
 float HR=G[18].y;
 int N1=int(G[13].y);
 vec3 sunD=-G[4].xyz;
 vec3 skyC=vec3(.5,.66,1.)*G[5].w;
 // one of four sub-pixel samples per draw (the four draws add up): no sample loop round the whole shader
 {int s=int(G[20].w);
  vec2 jo=vec2(float(s&1),float(s>>1))*.5-.25+vec2(.125,-.125)*float((s&1)*2-1);
  vec3 d=rayDir(uv+jo/G[2].w);
  vec3 C=G[0].xyz;
  float tw=dot(G[9].xyz-C,G[10].xyz)/dot(d,G[10].xyz);
  float tg=d.y<0.?-C.y/d.y:1e9;
  vec3 col;
  bool isW=tw<tg;
#if PASS==0
  if(!isW)discard;
  vec3 p=C+d*tw;
  vec2 q=vec2(dot(p-G[9].xyz,G[11].xyz)+20.,p.y);
  vec4 v0,v1,v2;float jm0=0.;
  for(int j=0;j<3*N1;j++){
   vec2 o=j==0?vec2(0):j==1?vec2(.0012,0.):vec2(0.,.0012);
   vec4 v=brick(q+o);
   if(j==0){v0=v;jm0=JM;}else if(j==1)v1=v;else v2=v;
  }
  v0.rgb=weather(q,v0.rgb,jm0);
  float dhx=(v1.w-v0.w)/.0012,dhy=(v2.w-v0.w)/.0012;
  vec3 n=normalize(-G[10].xyz-G[11].xyz*dhx-vec3(0,1,0)*dhy);
#if WALLT==0
  float ao=clamp(1.+v0.w*55.,.42,1.);
#else
  float ao=clamp(1.+v0.w*25.,.6,1.);
#endif
  // in the shade of a tree: sky from above (a little less high up, under the canopy), warm bounce from the sunlit
  // garden in front, and here and there a fleck of sun through the leaves, thickest low down by the shade's edge
  vec3 L=vec3(.42,.6,1.1)*G[5].w*.175*(.5+.5*n.y)*(1.04-.1*smoothstep(.5,3.5,p.y))+vec3(1.,.8,.55)*G[5].xyz*.05*max(0.,dot(n,normalize(vec3(-.3,-.15,-1.))))*(1.+.6*(1.-smoothstep(0.,1.2,p.y)));
  float fk=fleck(q*vec2(4.2,2.6)+vec2(3.,0.))*smoothstep(.62,.85,fb(q*.45+vec2(5.,1.))+.3*(1.-smoothstep(.2,1.6,p.y)));
  L+=G[5].xyz*G[4].w*max(0.,dot(n,sunD))*fk*.3/3.1416;
  col=v0.rgb*L*ao;
#else
  if(isW)discard;
  vec3 p=C+d*tg;
  // where the ray passes the hose's axis height: the hose lies there if that point is within its radius of the curve
  vec2 qa=(C+d*((C.y-HR)/max(-d.y,1e-4))).xz;
  float hH=1.,wgH=0.;vec2 hC=vec2(0);
  vec2 q=p.xz;
  // five taps of the ground: the point, two for its slope, two toward the sun for the stones' own shadows
  vec2 sxz=normalize(sunD.xz);float tEl=sunD.y/length(sunD.xz);
  vec4 v0,v1,v2;float occ=1.,ssh=1.;
  for(int j=0;j<5*N1;j++){
   float sd=j==3?.006:.014;
   vec2 o=j==0?vec2(0):j==1?vec2(.0012,0.):j==2?vec2(0.,.0012):sxz*sd;
   float oc=1.;
   vec4 v=grd(q+o,oc);
   if(j==0){v0=v;occ=oc;}else if(j==1)v1=v;else if(j==2)v2=v;
   else ssh=min(ssh,1.-smoothstep(.0,.0012,v.w-v0.w-sd*tEl));
  }
  float dhx=(v1.w-v0.w)/.0012,dhy=(v2.w-v0.w)/.0012;
  {
   vec3 n=normalize(vec3(-dhx,1.,-dhy));
   // the tree's shade reaches out from the wall with a broken edge: flecks of sun inside it, boughs' shadows beyond
   float dw=dot(p-G[9].xyz,-G[10].xyz);
   float sh=smoothstep(1.25,1.45,dw+.5*fb(q*1.7+5.)+.18*fb(q*9.));
   sh=max(sh,fleck(q*vec2(3.2,4.4))*smoothstep(.3,1.1,dw));
   float bough=smoothstep(.035,.0,abs(fb(q*vec2(.55,.9)+vec2(dw*.35,7.))-.5))*smoothstep(1.3,1.8,dw)*smoothstep(3.2,2.,dw);
   sh*=1.-.8*bough;
   vec2 ah=normalize(G[4].xz);
   vec2 rel=q-G[6].xz;float al=dot(rel,ah),ac=abs(rel.x*ah.y-rel.y*ah.x);
   float sl=G[6].y/tan(asin(-G[4].y));
   float pen=.004+al*.0093;
   float stk=(1.-smoothstep(.003,.003+pen,ac))*step(0.,al)*(1.-smoothstep(sl-.05,sl+.05,al));
   sh*=1.-.85*stk;
   float ndl=max(0.,dot(n,sunD))*ssh;
   vec3 L;
   // the hose's contact: occlusion hugging it and its shadow thrown away from the sun
   vec2 sH=normalize(sunD.xz);float kk=HR/tan(asin(-G[4].y));
   float hao=1.,hsh=1.;
   for(int i=0;i<5*NU;i++){vec2 c2;float hd=hdist(i==0?qa:q+sH*kk*(float(i-1)*.65-.3)*float(i>1),c2);
    if(i==0){hH=hd;hC=c2;}else if(i==1)hao=mix(.3,1.,smoothstep(HR*.4,HR*3.,hd));else hsh=min(hsh,smoothstep(HR*.6,HR*1.2,hd));}
   L=G[5].xyz*G[4].w*ndl*sh*hsh*mix(.5,1.,occ)/3.1416+skyC*.14*(.5+.5*n.y)*occ*hao;
   col=v0.rgb*L;
   // damp darker strip at the wall foot
   col*=mix(.6,1.,smoothstep(.0,.25,dw));
   // wet where the spray falls: darker stones, each with a hard glint of the sun on its wet cap, and the low places
   // between them holding water that mirrors the shaded wall
   float wg=max(wetG(q),G[17].w*.8*smoothstep(.5,.0,dw)*smoothstep(.9,.3,abs(dot(p-G[9].xyz,G[11].xyz)+20.-G[17].x)));wgH=wg;
   col=mix(col,pow(col,vec3(1.1))*.3,wg);
   vec3 hv=normalize(sunD-d);
   col+=G[5].xyz*G[4].w*sh*hsh*ssh*pow(max(dot(n,hv),0.),90.)*wg*1.1*smoothstep(.002,.005,v0.w);
   float pud=wg*smoothstep(.0028,.0008,v0.w)*smoothstep(.4,.7,fb(q*5.+2.));
   float fr=.02+.98*pow(1.-max(-d.y,0.),5.);
   col=mix(col,vec3(.018,.017,.016)+skyC*.05*fr,pud*.85);
  }
  if(hH<HR){
   vec2 rr=(qa-hC)/HR;vec3 n=normalize(vec3(rr.x,sqrt(max(1.-dot(rr,rr),0.)),rr.y));
   vec3 hp=vec3(qa.x,HR,qa.y)+n*HR;
   float dw=dot(hp-G[9].xyz,-G[10].xyz);
   float sh=smoothstep(1.25,1.45,dw+.5*fb(hp.xz*1.7+5.)+.18*fb(hp.xz*9.));
   // an old hose gone dull in the sun: faded, scuffed, dried mud on its underside, damp where it lies in the wet
   vec3 hb=vec3(.05,.085,.04)*(.85+.25*fb(hp.xz*30.));
   float dirt=clamp(smoothstep(.2,-.7,n.y)*.8+smoothstep(.55,.85,fb(hp.xz*9.+3.))*.5,0.,.9);
   hb=mix(hb,vec3(.15,.125,.09)*(.7+.5*fb(hp.xz*120.)),dirt);
   float wh=wgH;hb*=mix(1.,.6,wh);
   float ndl=max(dot(n,sunD),0.);
   vec3 R=reflect(d,n);
   col=hb*(G[5].xyz*G[4].w*ndl*sh/3.1416+skyC*.14*(.5+.5*n.y))+G[5].xyz*G[4].w*sh*pow(max(dot(R,sunD),0.),10.)*.02*(1.-dirt)
      +skyC*.08*smoothstep(0.,.6,R.y)*(.04+.2*wh);
  }
#endif
  o=vec4(pow(col/(1.+col),vec3(1./2.2))*.25,1.);
 }
}`,t0=`
float dmask(vec2 q){vec2 d=q-vec2(G[20].x,0.);float w=abs(G[20].y)*.5,h=mod(G[20].z,10.);
 return step(abs(d.x-.0045*d.y),w+.13)*step(d.y,h+.17)*max(step(abs(d.x),w+.07)*step(d.y,.11),step(abs(d.x-.0045*d.y),w+(d.y>h?.13:.0)));}
float JM;`,e0=`
 {vec2 d=q-vec2(G[20].x,0.);float w=abs(G[20].y)*.5,h=mod(G[20].z,10.),pi=floor(G[20].z/10.),hs=sign(G[20].y);
  float x=d.x-.0045*d.y;                       // the jamb leans half a degree
  float ins=w-abs(x);
  float sill=step(abs(d.x),w+.07)*(1.-step(.1,d.y));
#if WALLT!=1
  // the lintel: one weathered stone slab, a little ragged at its ends
  float lt=step(h,d.y)*step(d.y,h+.15+.01*(fb(q*9.)-.5))*step(abs(x),w+.12+.02*(fb(q*7.+3.)-.5));
  if(lt>.5){col=vec3(.34,.32,.28)*(.75+.4*fb(q*30.))*(.85+.25*fb(q*4.));col*=1.-.35*smoothstep(.02,.0,h+.15-d.y);ht=.001*fb(q*90.);jm=0.;}
#endif
  if(ins>0.&&d.y<h&&d.y>.1-.0){
   // five or six boards of unlike widths, gaps opening toward the foot; the paint worn to grey wood at the latch and
   // along the bottom, flaking elsewhere; a ragged, rotted bottom edge
   float u=(x+w)/(2.*w)*5.6,fu=u+.21*sin(u*2.1+G[11].w);float bi=floor(fu),bf=fract(fu);
   float bh=hc(vec2(bi,9.),4.),gp=.025+.05*(1.-smoothstep(.05,.6,d.y))*(.6+.8*bh);
   float gap=1.-smoothstep(gp,gp+.03,min(bf,1.-bf));
   vec3 pc=pi<.5?vec3(.12,.18,.13):pi<1.5?vec3(.075,.074,.07):vec3(.21,.26,.29);
   float grain=fb(vec2(x*55.+bi*7.,d.y*2.5))*.6+.4*fb(vec2(x*190.+bi*3.,d.y*9.));
   vec3 wood=vec3(.37,.34,.29)*(.7+.45*grain);
   vec3 pnt=pc*(.82+.3*bh)*(.85+.3*grain);
   float lx=-hs*(w-.11);
   float wear=smoothstep(.55,.15,length((vec2(x,d.y)-vec2(lx,1.02))*vec2(1.,.8)))+smoothstep(.3,.12,d.y)*.8;
   wear=clamp(wear+.7*smoothstep(.55,.75,fb(vec2(x*14.,d.y*5.)+bi*2.3))-.3*fb(q*20.),0.,1.);
   col=mix(pnt,wood,smoothstep(.35,.7,wear));
   float bot=.12+.04*fb(vec2(x*16.,1.))+.03*bh;
   col=mix(col,vec3(.02),gap*.85);col*=mix(1.,.06,smoothstep(bot,bot-.012,d.y));
   ht=-.002-.006*gap;jm=0.;
   // two strap hinges from the hinge side, tapering, with their bolts; a rusted thumb latch on the other
   float hx=hs*x+w;
   for(int k=0;k<2;k++){float hy=k==0?.32:h-.36;float tp=.022-.008*clamp(hx/(1.3*w),0.,1.);
    float st=smoothstep(.004,0.,abs(d.y-hy)-tp)*step(hx,1.3*w+.02*bh)*step(-.01,hx);
    col=mix(col,vec3(.07,.045,.035)*(.7+.6*fb(q*60.)),st*.92);ht+=.002*st;}
   float lch=step(abs(x-lx),.016)*step(abs(d.y-1.02),.07)+step(abs(x-lx-hs*.05),.05)*step(abs(d.y-1.0),.008);
   col=mix(col,vec3(.09,.05,.03)*(.8+.5*fb(q*80.)),min(lch,1.)*.95);
   // the opening's reveal: the jamb's return on one side, the shadow down the other and under the head
   float rv=smoothstep(.05,.0,ins)*step(0.,x*G[7].w);col=mix(col,vec3(.18,.13,.10)*(.7+.4*fb(q*40.)),rv*.9);
   col*=1.-.55*smoothstep(.045,.0,ins)*step(x*G[7].w,0.)-.5*smoothstep(.06,.0,h-d.y);
  }
  if(sill>.5){
   // a worn stone step with a dip in the middle, damp at its foot
   float dip=exp(-pow(d.x/(w*.6),2.));
   col=vec3(.36,.34,.30)*(.8+.35*fb(q*25.))*(1.-.25*dip*smoothstep(.1,.04,d.y))*(1.-.4*smoothstep(.04,0.,d.y));
   col*=1.-.5*smoothstep(.012,0.,abs(d.y-.1));ht=.0005*fb(q*70.);jm=0.;
  }
 }
 JM=jm;`,uo=(e,o,f)=>{const i=Qo(e,o),y=(h,d)=>{const T=u.split(h);if(T.length!==2)throw new Error("414 door "+h);u=T.join(d)};let u=i;return!f||e?i:(y(`
float JM;`,t0),y(`
 JM=jm;`,e0),y("vec3 weather(vec2 q,vec3 col,float jm){",`vec3 weather(vec2 q,vec3 col,float jm){
 vec3 c0=col;`),y(" // the patch the spray reaches",` col=mix(col,c0*(.9+.2*fb(q*3.)),dmask(q)*.85);
 // the patch the spray reaches`),u)},kt=`
uniform sampler2D uRing;uniform sampler2D uN;
uniform vec4 CP[4];uniform vec4 CW[4];uniform vec4 CS[4];
uniform ivec4 CN;
int CLS;float W;float RAD;vec3 DV;
float hc1(float k){return h1(uint(k)*977u+13u)-.5;}
vec3 dropAt(int id,float age,uint sd,vec4 ring){
 int cl=CLS;vec4 cp=CP[cl];vec4 cs=CS[int(ring.z+.5)];
 float yaw=ring.x,pit=ring.y;
 vec3 ax=vec3(sin(yaw)*cos(pit),sin(pit),cos(yaw)*cos(pit));
 vec3 sx=normalize(cross(ax,vec3(0,1,0))),sy=cross(sx,ax);
 float ps=6.2832*h1(sd*5u+1u),pr=sqrt(h1(sd*5u+2u));
 // the shower face is a ring of small ports: most water leaves in separate jets that break up as they fly
 if(int(ring.z+.5)==0&&h1(sd*5u+4u)<.82){float np=G[6].w,k=floor(h1(sd*5u+1u)*np);
  ps=6.2832*(k+.5+.22*(h1(sd*5u+6u)-.5)*(1.+2.*age))/np+.4*hc1(k);pr=.7+.3*h1(sd*5u+2u)*(.4+age);}
 vec3 dir=normalize(ax+sx*cos(ps)*pr*cs.y+sy*sin(ps)*pr*cs.z);
 float v0=cs.x*(.65+.5*h1(sd*5u+3u))*cp.w;
 float tau=cp.x,vt=cp.y;
 vec3 u=G[8].xyz*(1.+G[8].w*(textureLod(uN,vec2(G[1].w*.013,float(id&63)*.0157),0.).g-.5)*1.6);
 vec3 term=u+vec3(0,-vt,0);
 float e=exp(-age/tau);
 vec3 tip=G[6].xyz+ax*.103;
 vec3 P=tip+term*age+(dir*v0-term)*tau*(1.-e);
 float beta=1./(1.+tau*14.);
 float s0=.05,sa=sqrt(s0*s0+2.*cs.w*s0*age)-s0;
 P+=dir*sa*beta;
 // the drop's own flight velocity (without the turbulent spread): what the shutter smears it along
 DV=term+(dir*v0-term)*e+dir*beta*cs.w*s0/(sa+s0);
 vec3 rn=vec3(h1(sd*7u+1u),h1(sd*7u+2u),h1(sd*7u+3u))-.5;
 P+=rn*(.18*beta+.03)*sqrt(age);
 vec4 nw=textureLod(uN,P.xz*.35+vec2(G[1].w*.05,P.y*.3),0.)-.5;
 P+=vec3(nw.g,nw.b*.5,nw.r)*.28*beta*min(age,1.5);
 return P;
}
bool dropSetup(int id,float t,out float age,out uint sd,out vec4 ring){
 CLS=id<CN.x?0:id<CN.y?1:id<CN.z?2:3;
 vec4 cp=CP[CLS];
 float L=cp.z*(.75+.5*h1(uint(id)*3u+7u));
 float tt=t+h1(uint(id)*3u+2u)*L;
 float cyc=floor(tt/L);age=tt-cyc*L;
 sd=hh(uint(id)^(uint(cyc)*0x9E3779B9u));
 float launch=t-age;
 int slot=int(floor(launch*60.));slot=((slot%512)+512)%512;
 ring=texelFetch(uRing,ivec2(slot,0),0);
 W=CW[int(ring.z+.5)][CLS]*ring.w;
 return W>.02;
}
bool visible(vec3 P){return P.y>0.&&dot(P-G[9].xyz,G[10].xyz)<0.;}
vec3 toCam(vec3 P){vec3 q=P-G[0].xyz;return vec3(dot(q,G[2].xyz),dot(q,G[3].xyz),dot(q,G[1].xyz));}
`,o0=kt.slice(0,kt.indexOf("vec3 dropAt("))+`
vec2 hq(float t){vec2 a=G[18].xz,b=G[19].xy,c=G[19].zw;float s=1.-t;return s*s*a+2.*s*t*b+t*t*c;}
bool ROOT;vec3 RP0;
vec3 dropAt(int id,float age,uint sd,vec4 ring){
 int cl=CLS;vec4 cp=CP[cl];vec4 cs=CS[int(ring.z+.5)];
 // a few shower parcels are the jets' glassy roots: each keeps one hole and draws its jet from the hole to where it beads
 ROOT=cl==2&&h1(uint(id)*13u+5u)<.035;
 float rh=h1(uint(id)*13u+9u);if(ROOT)age=.005+.016*rh;
 float nh=G[18].w,hk=floor(h1(ROOT?uint(id)*13u+7u:sd*5u+1u)*nh*3.);uint hu=uint(hk);
 float t=clamp((floor(hk/3.)+.5+.5*(h1(hu*7u+3u)-.5))/nh,0.,1.);
 vec2 hp=hq(t),tg=normalize(hq(min(t+.01,1.))-hq(max(t-.01,0.))),nm=vec2(-tg.y,tg.x);
 float tw=G[20].y*exp(-pow((t-G[20].x)*8.,2.))+G[20].w*exp(-pow((t-G[20].z)*8.,2.));
 // the rows fan across the hose; a twisted stretch turns its fan round toward the hose's own line, so jets cross
 float phi=tw*1.3+(h1(hu*7u+9u)-.5)*.9,a=(mod(hk,3.)-1.)*.3+(h1(hu*7u+5u)-.5)*.22+tw*.6;
 vec3 lh=vec3(nm.x,0.,nm.y)*cos(phi)+vec3(tg.x,0.,tg.y)*sin(phi);
 vec3 ax=normalize(vec3(0,cos(a),0)+lh*sin(a)+vec3(tg.x,0.,tg.y)*(h1(hu*7u+13u)-.5)*.3);
 ax=normalize(ax*cos(ring.x)+G[2].xyz*sin(ring.x));
 vec3 sx=normalize(cross(ax,vec3(tg.x,0.,tg.y)+vec3(0,.01,0))),sy=cross(sx,ax);
 float ps=6.2832*h1(sd*5u+2u),pr=ROOT?0.:sqrt(h1(sd*5u+4u));
 vec3 dir=normalize(ax+sx*cos(ps)*pr*cs.y+sy*sin(ps)*pr*cs.z);
 float v0=cs.x*(1.-.3*t)*(ROOT?1.:.9+.2*h1(sd*5u+3u))*cp.w*(1.-.35*min(abs(tw),1.));
 float tau=cp.x,vt=cp.y;
 vec3 u=G[8].xyz*(1.+G[8].w*(textureLod(uN,vec2(G[1].w*.013,float(id&63)*.0157),0.).g-.5)*1.6);
 vec3 term=u+vec3(0,-vt,0);
 float e=exp(-age/tau);
 vec3 tip=vec3(hp.x,G[18].y*1.8,hp.y);RP0=tip;
 vec3 P=tip+term*age+(dir*v0-term)*tau*(1.-e);
 float beta=1./(1.+tau*14.);
 float s0=.05,sa=sqrt(s0*s0+2.*cs.w*s0*age)-s0;
 P+=dir*sa*beta;
 DV=term+(dir*v0-term)*e+dir*beta*cs.w*s0/(sa+s0);
 vec3 rn=vec3(h1(sd*7u+1u),h1(sd*7u+2u),h1(sd*7u+3u))-.5;
 P+=rn*(.18*beta+.03)*sqrt(age)*(ROOT?.2:1.);
 vec4 nw=textureLod(uN,P.xz*.35+vec2(G[1].w*.05,P.y*.3),0.)-.5;
 P+=vec3(nw.g,nw.b*.5,nw.r)*.28*beta*min(age,1.5);
 return P;
}
`+kt.slice(kt.indexOf("bool dropSetup(")),mo=Mt+kt+`
out vec4 vA;
void main(){
 int id=gl_VertexID;float age;uint sd;vec4 ring;
 gl_PointSize=0.;gl_Position=vec4(2.,2.,0.,1.);vA=vec4(0);
 if(dropSetup(id,G[1].w,age,sd,ring)){
  vec3 P=dropAt(id,age,sd,ring);
  vec3 q=toCam(P);
  if(visible(P)&&q.z>.15){
   float ND=G[15].x,pix=2.*G[0].w/ND;
   float rp=.006+.034*sqrt(age)*(CLS<2?1.6:.5)+.25*age*CS[int(ring.z+.5)].y*float(CLS<2);
   float s=max(rp/q.z/pix,.8);
   float sz=min(s*4.8,40.);s=sz/4.8;
   gl_PointSize=sz;
   gl_Position=vec4(q.x/(q.z*G[0].w),q.y/(q.z*G[0].w),0.,1.);
   float sig=CP[CLS].w*0.+W*G[14][CLS];
   float a=sig/(q.z*q.z*pix*pix*6.2832*s*s);
   // young parcels are still a coherent sheet: they fade in as they break up
   a*=smoothstep(.0,.06,age)*(CLS<2?1.:.55);
   vA=vec4(CLS==0,CLS==1,CLS==2,CLS==3)*a;
  }
 }
}`,xo=`#version 300 es
precision highp float;in vec4 vA;out vec4 o;
void main(){vec2 d=gl_PointCoord*2.-1.;float r2=dot(d,d);if(r2>1.)discard;o=vA*exp(-r2*5.76*.5);}`,bo=Mt+kt+`
out vec4 vA;out vec2 vC;flat out int vK;flat out float vG;
void main(){
 int id=CN.y+gl_InstanceID;int v=gl_VertexID;float age;uint sd;vec4 ring;
 gl_Position=vec4(2.,2.,0.,1.);vA=vec4(0);vC=vec2(0);vK=0;vG=0.;
 if(dropSetup(id,G[1].w,age,sd,ring)&&CLS>1&&h1(sd*3u+9u)<G[15].z){
  float hg=h1(sd*3u+11u);
  bool gli=CLS==3?hg<.07:(CLS==2?hg<.012:false);
  // each drop catches the light for its own part of the exposure: streaks of every length
  float lv=h1(sd*3u+13u),fr=.45+.9*lv;
  float sh=G[15].y*fr;
  vec3 P1=dropAt(id,age,sd,ring),P0=P1-DV*min(sh,age);
  vec3 a=toCam(P0),b=toCam(P1);
  if(visible(P1)&&a.z>.2&&b.z>.2){
   vec2 A=a.xy/(a.z*G[0].w),B=b.xy/(b.z*G[0].w);
   float px=2./G[2].w;
   float blur=abs(1./b.z-1./1.8)*1.6;
   float w=((CLS==1?.35:CLS==2?.5:.65)+blur*2.2)*px*G[2].w/1000.;w=max(w,.7*px);
   if(gli)w*=1.9;
   vec2 dd=B-A;float L=length(dd);vec2 t=L>1e-6?dd/L:vec2(1,0);vec2 n=vec2(-t.y,t.x);
   float sx=float(v&1),sy=float(v>>1)*2.-1.;
   vec2 p=mix(A-t*w,B+t*w,sx)+n*w*sy*1.5;
   gl_Position=vec4(p,0.,1.);
   vC=vec2(sx,sy*1.5);
   float rr=G[14][CLS]*(CLS==1?.2:.45);
   float hb=h1(sd*3u+5u);
   vA=vec4(1.)*W*rr/(b.z*b.z)/max((L+2.*w)*1.19*w*G[0].w*G[0].w,1e-12)*(.3+1.4*hb*hb)*sqrt(fr);
   vA*=smoothstep(.0,.03,age);
   // the bigger drops wobble as they fly and flash the sun back now and then
   if(gli){float tw=.5+.5*sin(G[1].w*(7.+20.*fract(hg*97.))+hg*300.);vA*=2.+6.*tw*tw*tw;vG=1.;}
   vK=CLS;
  }
 }
}`,wo=Mt+`
uniform sampler2D uL;uniform sampler2D uZ;
in vec4 vA;in vec2 vC;flat in int vK;flat in float vG;out vec4 o;
void main(){
 vec2 uv=gl_FragCoord.xy/G[2].w;
 vec3 d=rayDir(uv);
 float g=acos(clamp(dot(d,G[4].xyz),-1.,1.));
 float x=(g-${yt.toFixed(6)})/${(Ce-yt).toFixed(6)};
 vec3 s=textureLod(uL,vec2(x,(float(vK*2)+.5)/8.),0.).rgb,p=textureLod(uL,vec2(x,(float(vK*2)+1.5)/8.),0.).rgb;
 // a polariser turned to pass the bow's own (tangential) polarisation: the bow keeps its light, the rest loses half
 bool pol=G[3].w>-5.;
 vec3 ph=pol?(s*.97+p*.03)*1.45:s+p;
 ph=gam(ph,.76);
 // single drops read mostly as sunlit water: only a hint of the bow's colour in each
 float lu=dot(ph,vec3(.2126,.7152,.0722));
 ph=mix(vec3(lu),ph,vG>.5?.45:.6);
 float f=exp(-vC.y*vC.y*(vG>.5?3.:2.2));
 vec4 nz=texture(uZ,(uv-G[12].xy)/G[12].zw);
 float occ=all(greaterThan(uv,G[12].xy))&&all(lessThan(uv,G[12].xy+G[12].zw))?1.-nz.a:1.;
 // every drop also scatters the skylight, so the spray stays faintly seen outside the bow
 o=vec4((ph*G[5].xyz*G[4].w+vec3(.42,.52,.72)*G[5].w*(pol?.035:.048))*vA.x*f*occ,0.);
}`,a0=Mt+`
uniform sampler2D uN;
out vec4 o;
float MAT;
float sdCyl(vec3 p,float r,float z0,float z1){vec2 d=vec2(length(p.xy)-r,abs(p.z-(z0+z1)*.5)-(z1-z0)*.5);return min(max(d.x,d.y),0.)+length(max(d,0.));}
float sdCap(vec3 p,vec3 a,vec3 b,float r){vec3 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h)-r;}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
vec3 AX,SX,SY;
vec3 bez(float t){vec3 q0=G[6].xyz-AX*.066,q1=q0-AX*.11-vec3(0,.1,0),q3=G[18].xyz;vec2 gd=normalize(G[19].xy-G[18].xz);vec3 q2=q3+vec3(-gd.x*.36,.004,-gd.y*.36);float s=1.-t;return s*s*s*q0+3.*s*s*t*q1+3.*s*t*t*q2+t*t*t*q3;}
float map(vec3 w){
 vec3 r=w-G[6].xyz;vec3 p=vec3(dot(r,SX),dot(r,SY),dot(r,AX));
 // nozzle: hex coupling, body, knurled sleeve, tip
 vec2 hp=abs(p.xy);hp-=2.*min(dot(vec2(-.8660254,.5),hp),0.)*vec2(-.8660254,.5);
 float hx=max(hp.y-.0118,abs(p.z+.053)-.012);
 float body=sdCyl(p,.0102,-.042,.04);
 float slv=sdCyl(p,.0146,.036,.08)-.0006;
 float tz=clamp((p.z-.08)/.023,0.,1.);
 float tip=max(sdCyl(p,mix(.0128,.0068,tz),.079,.103),-(length(p.xy)-.0022));
 float clamp_=length(vec2(length(p.xy)-.0122,p.z+.006))-.0034;
 float nz=min(min(hx,body),min(slv,tip));
 float d=min(nz,clamp_);MAT=nz<clamp_?1.:3.;
 if(slv<d+.0001&&slv<=nz)MAT=1.5;
 // stake and its knuckle
 vec3 kn=G[6].xyz-vec3(0,.017,0);
 float st=min(sdCap(w,vec3(G[6].x,-.3,G[6].z),kn,.0058),length(w-kn)-.0085);
 st=smin(st,clamp_,.004);
 if(st<d){d=st;MAT=3.;}
 // hose
 float ho=1e9;vec3 a=bez(0.);
 for(int i=1;i<=10*int(G[13].y);i++){vec3 b=bez(float(i)/10.);ho=min(ho,sdCap(w,a,b,.0098));a=b;}
 float cf=sdCap(w,G[6].xyz-AX*.06,G[6].xyz-AX*.085,.0112);
 ho=min(ho,cf);
 if(ho<d){d=ho;MAT=cf<=ho+.0001?1.:2.;}
 return d;
}
vec3 env(vec3 r){
 vec3 sky=mix(vec3(.55,.66,.86),vec3(.32,.45,.78),clamp(r.y,0.,1.))*.9;
 vec3 gr=vec3(.2,.2,.08)*.8;
 vec3 e=mix(gr,sky,smoothstep(-.08,.08,r.y));
 // the shaded wall ahead is dark
 e=mix(e,vec3(.03,.025,.022),smoothstep(.2,.7,r.z)*smoothstep(.5,-.1,r.y));
 return e;
}
void main(){
 vec2 lo=gl_FragCoord.xy/G[15].w;
 vec2 uv=G[12].xy+lo*G[12].zw;
 AX=G[7].xyz;SX=normalize(cross(AX,vec3(0,1,0)));SY=cross(SX,AX);
 vec3 ro=G[0].xyz,rd=rayDir(uv);
 float t=.7+G[20].x,mind=1e9,tm=0.;bool hit=false;
 float pixA=2.*G[0].w*G[12].z/G[15].w;
 int N1=int(G[13].y);
 vec3 L=-G[4].xyz;
 // one loop and one call of map(): the march, then four taps for the normal and one for the cavity, then the walk
 // toward the sun for the soft shadow (FXC compiles every call site of map again)
 int ph=0,kt=0;vec3 p=vec3(0),n=vec3(0);float m=0.,ao=1.,sh=1.,ts=.003;
 for(int i=0;i<130*N1;i++){
  vec3 e=kt==0?vec3(0):kt==1?vec3(1,-1,-1):kt==2?vec3(-1,-1,1):kt==3?vec3(-1,1,-1):kt==4?vec3(1):-rd*20.8;
  vec3 x=ph==0?ro+rd*t:ph==1?p+e*.00012:p+L*ts;
  float d=map(x);
  if(ph==0){
   float rr=d/(t*pixA);if(rr<mind){mind=rr;tm=t;}
   bool stop=d<.00015*t;
   if(stop)hit=true;
   if(!stop){t+=d*.9;if(t>2.2+G[20].y||(G[20].z>0.&&(ro+rd*t).y<-.002)||i>=89)stop=true;}
   if(stop){
    if(!hit){if(smoothstep(0.,1.,mind)>.996)break;t=tm;}
    p=ro+rd*t;ph=1;
   }
  }else if(ph==1){
   if(kt==0)m=MAT;else if(kt<5)n+=e*d;else ao=clamp(d/.0025,0.,1.);
   kt++;if(kt>5)ph=2;
  }else{
   sh=min(sh,14.*d/ts);ts+=clamp(d,.002,.03);if(sh<.01||ts>.6)break;
  }
 }
 if(ph==0){o=vec4(0);return;}
 n=normalize(n);
 vec3 r0=p-G[6].xyz;vec3 lp=vec3(dot(r0,SX),dot(r0,SY),dot(r0,AX));
 vec3 base;float rough,metal;
 float fit=G[13].x;
 // cavity from the distance field: crevices hold tarnish, verdigris and dirt; proud edges are worn bright
 float ang=atan(lp.y,lp.x);
 vec2 cy=vec2(ang*.159,lp.z*6.);
 float n2=textureLod(uN,cy*vec2(.25,.8)+.3,0.).g,n3=textureLod(uN,cy*vec2(.5,1.6)+.7,0.).b,n4=textureLod(uN,cy*vec2(2.,7.),0.).g;
 if(m<1.7){
  float knurl=0.;
  if(m>1.2){
   float k1=sin(ang*28.+lp.z*1050.),k2=sin(ang*28.-lp.z*1050.);
   vec3 tg=normalize(cross(AX,n));
   float kz=smoothstep(.037,.04,lp.z)*smoothstep(.079,.076,lp.z);
   n=normalize(n+(tg*(k1+k2)*.13+AX*(k1-k2)*.05)*kz);
   knurl=kz*clamp(.5+.25*(k1+k2),0.,1.);
  }
  float tn=clamp(smoothstep(.3,.75,n2)*.75+(1.-ao)*.7-knurl*.5,0.,1.);
  if(fit<.5){
   // old brass: dark brown patina, rubbed back to bright metal on the knurl and the edges, green in the cracks
   base=mix(vec3(.88,.64,.36),vec3(.34,.23,.12),tn*.85);rough=.22+.4*tn+.12*n4;metal=1.-.35*tn;
   float vg=(1.-ao)*smoothstep(.45,.7,n3)*step(lp.z,.035);
   base=mix(base,vec3(.22,.38,.31),vg*.8);rough=mix(rough,.85,vg);metal=mix(metal,0.,vg);
  }else if(fit<1.5){base=m>1.2?vec3(.62,.42,.04)*(.85+.25*n2):vec3(.10,.30,.11)*(.8+.3*n2);rough=.6+.2*tn;metal=0.;base=mix(base,vec3(.13,.12,.09),tn*.3);}
  else{base=mix(vec3(.85,.85,.87),vec3(.45,.43,.4),tn*.5);rough=.12+.35*tn+.1*n4;metal=1.;}
  // hard water: a chalky crust round the outlet, scaled into the knurl
  float lime=smoothstep(.088,.1,lp.z)*smoothstep(.5,.7,n3)*.6+(1.-ao)*smoothstep(.72,.86,n2)*.3;
  base=mix(base,vec3(.58,.56,.5),clamp(lime,0.,.8));rough=mix(rough,.9,clamp(lime,0.,.8));metal=mix(metal,0.,clamp(lime,0.,1.));
  // wet near the outlet
  rough*=mix(1.,.6,smoothstep(.06,.1,lp.z));
 }else if(m<2.5){
  // a cheap hose gone dull in the sun: faded green, scuffed, mud dried on its underside
  base=vec3(.05,.085,.04)*(.9+.15*n4);rough=.5;metal=0.;
  float dirt=clamp(smoothstep(.1,-.7,n.y)*.8+smoothstep(.6,.85,textureLod(uN,p.xz*9.+p.y*4.,0.).g)*.3,0.,.9);
  base=mix(base,vec3(.15,.125,.09)*(.7+.5*n4),dirt*smoothstep(.75,.2,p.y));
 }else if(m<3.5){
  // a bamboo cane gone grey-straw in the weather, dark rings at its nodes, soil splashed up its foot;
  // the tie is garden twine wound round the cane and the nozzle's neck
  float fib=textureLod(uN,vec2((p.x+p.z)*60.,p.y*2.),0.).r;
  base=mix(vec3(.26,.22,.13),vec3(.40,.36,.25),textureLod(uN,vec2((p.x+p.z)*9.,p.y*.7),0.).g)*(.85+.25*fib);
  float nd=abs(fract((p.y+.07)/.15)-.5)*.15;
  base*=1.-.62*smoothstep(.0045,.0008,nd);base=mix(base,vec3(.45,.40,.27),smoothstep(.009,.0045,nd)*.35);
  rough=.62;metal=0.;
  base=mix(base,vec3(.14,.11,.08),smoothstep(.3,.0,p.y)*.6);
  vec3 kn=G[6].xyz-vec3(0,.017,0);
  if(length(p-kn)<.0102||length(vec2(length(lp.xy)-.0122,lp.z+.006))<.0042){
   float tw=sin(dot(p,vec3(1500.,2300.,900.)));
   base=vec3(.38,.31,.20)*(.7+.3*tw)*(.8+.35*n4);rough=.92;
  }
 }else{
  base=vec3(.06,.06,.065)*(.8+.4*n2);rough=.6;metal=0.;
 }
 vec3 V=-rd,H=normalize(L+V);
 sh=clamp(sh,0.,1.);
 float nl=max(dot(n,L),0.),nh=max(dot(n,H),0.),nv=max(dot(n,V),.001);
 float a2=max(rough*rough,.002);a2*=a2;
 float D=a2/(3.1416*pow(nh*nh*(a2-1.)+1.,2.));
 vec3 F0=mix(vec3(.04),base,metal);
 vec3 F=F0+(1.-F0)*pow(1.-max(dot(H,V),0.),5.);
 float k=(rough+1.)*(rough+1.)/8.;
 float Gs=nl/(nl*(1.-k)+k)*nv/(nv*(1.-k)+k);
 vec3 spec=D*F*Gs/max(4.*nl*nv,.001);
 vec3 dif=(1.-metal)*base/3.1416;
 vec3 sunE=G[5].xyz*G[4].w;
 vec3 col=(dif+spec)*sunE*nl*sh;
 vec3 R=reflect(rd,n);
 vec3 Fe=F0+(1.-F0)*pow(1.-nv,5.)*(1.-rough);
 col+=env(R)*Fe*(1.-rough*.6)*.35*mix(.4,1.,ao)+ao*dif*3.1416*(vec3(.4,.48,.6)*.22*(.6+.4*n.y)+vec3(.25,.2,.12)*.18*max(0.,-n.y));
 float cov=hit?1.:1.-smoothstep(0.,1.,mind);
 o=vec4(col*cov,cov);
}`,s0=Mt+`
uniform sampler2D uB;uniform sampler2D uD;uniform sampler2D uL;uniform sampler2D uZ;uniform sampler2D uN;uniform sampler2D uWt;
out vec4 o;
void main(){
 vec2 uv=gl_FragCoord.xy/G[2].w;
 // focus is on the spray: the wall and the gravel behind it fall softly out of focus
 vec3 d0=rayDir(uv);
 float tw=dot(G[9].xyz-G[0].xyz,G[10].xyz)/dot(d0,G[10].xyz),tg=d0.y<0.?-G[0].y/d0.y:1e9;
 float coc=abs(1./min(tw,tg)-1./1.8)*12.;
 float rad=max(coc,.6)/1000.;float lod=log2(max(rad*float(textureSize(uB,0).x)*.6,1.));
 vec3 bg=vec3(0);for(int i=0;i<8;i++){float a=float(i)*2.39996+.3;float r=sqrt((float(i)+.5)/8.);bg+=textureLod(uB,uv+vec2(cos(a),sin(a))*rad*r*1.3,lod).rgb;}
 bg=pow(bg/8.,vec3(2.2));bg=bg/max(1.-bg,.02);
 // the yard remembers the water: where the spray has fallen in the last half minute the ground and the wall are
 // dark with wet (a map the frame loop keeps, drying as it goes), and where the big drops land now each throws a ring
 {bool onW=tw<tg;vec3 hp=G[0].xyz+d0*min(tw,tg);
  vec2 wc=onW?vec2((dot(hp-G[9].xyz,G[11].xyz)+3.)/6.,(64.+clamp(hp.y,.03,1.97)*16.)/96.):vec2((hp.x+3.)/6.,clamp(hp.z,0.,5.9)/9.);
  vec2 wt=texture(uWt,wc).rg;float wx=max(wt.r-wt.g,0.);
  bg=mix(bg,bg*(onW?.5:.4),wx);
  vec2 rq=(hp.xz-G[16].xy)/G[16].z;float inz=onW?0.:smoothstep(1.,.35,length(rq))*G[16].w;
  if(inz>.01){
   vec2 cg=hp.xz*11.;vec2 ci=floor(cg);
   float hr=h1(uint(int(ci.x)+4096)*73856093u^uint(int(ci.y)+4096)*19349663u);
   float per=.45+.9*hr,ts=G[1].w/per+hr*7.,cy=floor(ts),ag=(ts-cy)*per;
   float h2=h1(uint(int(ci.x)+4096)*2654435761u^uint(int(cy)+int(hr*999.))*40503u);
   vec2 ctr=ci+.2+.6*vec2(h2,fract(h2*37.1));float rr=length(cg-ctr)/11.;
   float ring=exp(-pow((rr-.004-.1*ag)/(.003+.01*ag),2.))*smoothstep(.28,.0,ag)*smoothstep(.0,.03,ag)*step(.35,fract(h2*91.7))*(.4+.6*fract(h2*13.3));
   bg+=(vec3(.5,.62,.8)*G[5].w*.12+G[5].xyz*G[4].w*.03)*ring*inz;
  }
 }
 vec3 d=rayDir(uv);
 float g=acos(clamp(dot(d,G[4].xyz),-1.,1.));
 float x=(g-${yt.toFixed(6)})/${(Ce-yt).toFixed(6)};
 vec4 tau=max(texture(uD,uv),0.);
 // fine drops come in wisps and threads, drifting with the air
 vec2 wv=uv*vec2(9.,7.)+vec2(-.06,.05)*G[1].w;
 float wn=texture(uN,mat2(.83,.56,-.56,.83)*wv*.11).g*.65+texture(uN,mat2(.62,-.78,.78,.62)*wv*.37+.5).b*.35;
 float wm=texture(uN,uv*1.9+vec2(.02,-.03)*G[1].w).r;
 tau.xy*=.45+1.15*wn*wn+.15*wm;
 // the finest drops shed by the spray hang in the air as one continuous veil that drifts downwind and thins: the
 // density at wide, fixed blur levels (mipmaps of the density target), carried with the breeze and torn by slow
 // gusts, lit through the same table, so the arc is drawn on through clear air past the water as an unbroken band
 vec2 dw=vec2(-.045*G[7].w,-.03)*(1.+.6*G[8].w);
 vec4 hz=vec4(0);
 for(int i=0;i<4;i++){float f=float(i)*1.2+.3;hz+=textureLod(uD,uv+dw*f+vec2(.03,.05)*(wm-.5)*f,3.5+float(i)*.8)*(1.-float(i)*.1);}
 // and a wide, faint cloud of it round the whole spray, risen a little above the crest
 hz+=textureLod(uD,uv-vec2(.015*G[7].w,.085),6.)*3.;
 float hzt=dot(hz,vec4(1.,1.,.45,.3))*.6;
 // the veil's own wisps: large, slow, drifting with the air; a gust thins it in one place and piles it in another
 vec2 vq=uv*vec2(2.2,1.6)+vec2(.035*G[7].w,-.012)*G[1].w;
 float vw=texture(uN,vq*.09).g*.7+texture(uN,mat2(.8,.6,-.6,.8)*vq*.23+.3).b*.3;
 hzt*=(.35+1.3*vw*vw+.25*wn)*G[13].z;
 tau.x+=hzt*G[13].w;tau.y+=hzt*(1.-G[13].w);
 bool pol=G[3].w>-5.;
 vec3 m=vec3(0);
 for(int k=0;k<4;k++){
  vec3 s=textureLod(uL,vec2(x,(float(k*2)+.5)/8.),0.).rgb,p=textureLod(uL,vec2(x,(float(k*2)+1.5)/8.),0.).rgb;
  vec3 b=pol?(s*.97+p*.03)*1.45:(s+p);
  // fog-sized drops: a broad, nearly white bow, its fringes only faintly coloured
  if(k==0)b=mix(vec3(dot(b,vec3(.2126,.7152,.0722))),b,.4);
  m+=tau[k]*b;
 }
 // the bow is the one saturated thing: its colours kept at full strength (only brought into gamut)
 m=gam(m,.97);
 float tt=tau.x+tau.y+tau.z+tau.w;
 float ex=tt>1e-4?(1.-exp(-tt))/tt:1.;
 vec3 sky=vec3(.42,.52,.72)*G[5].w*(pol?.73:1.);
 float ms=1.-exp(-tt);
 vec3 col=bg*(pol?.73:1.)*exp(-tt*.9)+(m*G[5].xyz*G[4].w+sky*tt*.06)*ex+G[5].xyz*G[4].w*ms*ms*.006;
 if(all(greaterThan(uv,G[12].xy))&&all(lessThan(uv,G[12].xy+G[12].zw))){
  vec4 nz=texture(uZ,(uv-G[12].xy)/G[12].zw);
  col=col*(1.-nz.a)+nz.rgb;
 }
 o=vec4(col,1.);
}`,r0=Mt+`
uniform sampler2D uC;uniform sampler2D uN;
out vec4 o;
void main(){
 vec2 uv=gl_FragCoord.xy/G[2].w;
 vec3 c=texture(uC,uv).rgb;
 // a little lens glow around the brightest spray
 vec2 px=1./vec2(textureSize(uC,0));
 vec3 gl=vec3(0);for(int i=0;i<8;i++){float a=float(i)*.785+.39;gl+=texture(uC,uv+vec2(cos(a),sin(a))*px*7.).rgb;}
 c+=max(gl/8.-.9,0.)*.12;
 c*=G[15].x*0.+1.65;
  vec3 a=c*(2.51*c+.03),b=c*(2.43*c+.59)+.14;c=clamp(a/b,0.,1.);
 c=pow(c,vec3(1./2.2));
 // a fixed dither against banding in the dark wall
 c+=(texture(uN,gl_FragCoord.xy/256.).a-.5)/255.*1.5;
 o=vec4(c,1.);
}`,Ne=()=>{for(const e of(D?["comp","fin","splatS","streakS"]:["noz","comp","fin","splat","streak"]).concat(r.NF?["res"]:[]))if(!r.ps[e]){const o=r.src[e]();r.ps[e]=r.mk(o[0],o[1])}r.bake[qe]||(r.bake[qe]=r.mk(uo(0,ze,le))),r.bake["g"+Ct]||(r.bake["g"+Ct]=r.mk(uo(1,Ct)))};if(!r){r=t.__c414={};const e=(a,m)=>{const g=t.createShader(a);return t.shaderSource(g,m),t.compileShader(g),g},o=e(t.VERTEX_SHADER,$o),f=(a,m)=>{const g=t.createProgram(),k=e(t.FRAGMENT_SHADER,a),C=m?e(t.VERTEX_SHADER,m):o;return t.attachShader(g,C),t.attachShader(g,k),t.linkProgram(g),t.flush(),{p:g,f:k,vv:C}};r.mk=f,r.prep=(a,m)=>{if(!t.getProgramParameter(a.p,t.LINK_STATUS))throw new Error("414 "+m+": "+t.getProgramInfoLog(a.p)+" "+t.getShaderInfoLog(a.f)+" "+t.getShaderInfoLog(a.vv));t.useProgram(a.p);const g=(k,C)=>{const Q=t.getUniformLocation(a.p,k);Q&&t.uniform1i(Q,C)};g("uN",0),g("uB",1),g("uD",2),g("uL",3),g("uZ",4),g("uRing",5),g("uC",6),g("uF",7),g("uWt",8),a.G=t.getUniformLocation(a.p,"G"),a.CP=t.getUniformLocation(a.p,"CP"),a.CW=t.getUniformLocation(a.p,"CW"),a.CS=t.getUniformLocation(a.p,"CS"),a.CN=t.getUniformLocation(a.p,"CN"),a.ok=!0},r.NF=!1;const i=(a,m,g)=>{if(!r.NF)return a;if(a.split(m).length<2)throw new Error("414 NF "+m);return a.split(m).join(g)},y=()=>i(xo,"o=vA*exp(-r2*5.76*.5);}","uint q=floatBitsToUint(gl_PointCoord.x)^floatBitsToUint(gl_PointCoord.y)*0x9E3779B9u^floatBitsToUint(dot(vA,vec4(1.)))*0x85EBCA6Bu;vec4 r=vec4(hq(q),hq(q+1u),hq(q+2u),hq(q+3u))*(1./4294967296.);o=floor(vA*exp(-r2*5.76*.5)*127.5+r)/255.;}"),u=()=>r.NF?y().replace("precision highp float;",`precision highp float;precision highp int;
uint hq(uint x){x^=x>>16;x*=0x7feb352du;x^=x>>15;x*=0x846ca68bu;x^=x>>16;return x;}
`):xo,h=a=>a.split(kt).join(o0),d=(a,m,g)=>{if(a.split(m).length!==2)throw new Error("414 soak "+m);return a.split(m).join(g)},T=a=>d(d(d(h(a),"&&h1(sd*3u+9u)<G[15].z){","&&(h1(sd*3u+9u)<G[15].z||h1(uint(id)*13u+5u)<.035)){"),"P0=P1-DV*min(sh,age);","P0=P1-DV*min(sh,age);if(ROOT)P0=RP0;"),"vA*=smoothstep(.0,.03,age);","vA*=ROOT?.8+2.4*h1(uint(id)*13u+11u):smoothstep(.0,.03,age);");if(r.src={noz:()=>[i(a0,"o=vec4(col*cov,cov);","o=vec4(col*cov*.5,cov);")],comp:()=>[i(i(i(i(s0,"texture(uD,","2.*texture(uD,"),"textureLod(uD,","2.*textureLod(uD,"),"o=vec4(col,1.);","o=vec4(col*.5,1.);"),"+nz.rgb;","+nz.rgb*(1./.5);")],fin:()=>[i(r0,"texture(uC,","(1./.5)*texture(uC,")],splat:()=>[u(),mo],splatS:()=>[u(),h(mo)],streak:()=>[i(wo,"*vA.x*f*occ,0.);","*vA.x*f*occ*.5,0.);"),bo],streakS:()=>[d(i(wo,"*vA.x*f*occ,0.);","*vA.x*f*occ*.5,0.);"),"ph*G[5].xyz*G[4].w","ph*mix(G[5].xyz,vec3(1.,.93,.86)*dot(G[5].xyz,vec3(1./3.)),.75)*G[4].w"),T(bo)],res:()=>[Mt+"uniform sampler2D uD;out vec4 o;void main(){o=texelFetch(uD,ivec2(gl_FragCoord.xy),0);}"]},r.ps={},r.bake={},Ne(),r.vao=t.createVertexArray(),r.f32=!!t.getExtension("EXT_color_buffer_float"),r.f16=r.f32||!!t.getExtension("EXT_color_buffer_half_float"),!r.f16){r.NF=!0;for(const a in r.ps){const m=r.ps[a];t.deleteProgram(m.p),t.deleteShader(m.f),m.vv!==o&&t.deleteShader(m.vv)}r.ps={},Ne()}const s=256,l=new Uint8Array(s*s*4);let n=16717;const G=()=>{n=n+1831565813|0;let a=Math.imul(n^n>>>15,1|n);return a=a+Math.imul(a^a>>>7,61|a)^a,(a^a>>>14)>>>0&255},x=32,w=new Float32Array(x*x),M=new Float32Array(x*x);for(let a=0;a<x*x;a++)w[a]=G()/255,M[a]=G()/255;const rt=a=>a*a*(3-2*a),P=(a,m,g)=>{const k=Math.floor(m),C=Math.floor(g),Q=rt(m-k),tt=rt(g-C),c=(p,b)=>a[(b%x+x)%x*x+(p%x+x)%x];return(c(k,C)*(1-Q)+c(k+1,C)*Q)*(1-tt)+(c(k,C+1)*(1-Q)+c(k+1,C+1)*Q)*tt};for(let a=0;a<s;a++)for(let m=0;m<s;m++){const g=(a*s+m)*4;l[g]=G(),l[g+3]=G(),l[g+1]=Math.round(P(w,m/8,a/8)*255),l[g+2]=Math.round(P(M,m/8,a/8)*255)}const S=(a,m,g,k,C,Q,tt,c)=>{const p=t.createTexture();return t.bindTexture(t.TEXTURE_2D,p),t.texImage2D(t.TEXTURE_2D,0,g,a,m,0,k,C,Q),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,tt),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,tt===t.LINEAR_MIPMAP_LINEAR?t.LINEAR:tt),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,c),p};r.tex=S,r.noise=S(s,s,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,l,t.LINEAR_MIPMAP_LINEAR,t.REPEAT),t.generateMipmap(t.TEXTURE_2D);const Z=new Uint8Array(s*s*4),qt=[[w,0,0],[M,7.3,3.1],[w,2.9,11.5],[M,5.7,4.2]];for(let a=0;a<s;a++)for(let m=0;m<s;m++){let g=0,k=.5;for(let tt=0;tt<4;tt++){const c=8>>tt,p=qt[tt];g+=k*P(p[0],m/c+p[1],a/c+p[2]),k*=.5}const C=Math.round(Math.min(1,g*1.07)*255),Q=(a*s+m)*4;Z[Q]=Z[Q+1]=Z[Q+2]=C,Z[Q+3]=255}r.fbm=S(s,s,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,Z,t.LINEAR,t.REPEAT);const Rt=Yo(),It=new Uint16Array(Rt.length);for(let a=0;a<Rt.length;a++)It[a]=Jo(Rt[a]);r.lut=S(J,8,t.RGBA16F,t.RGBA,t.HALF_FLOAT,It,t.LINEAR,t.CLAMP_TO_EDGE);const Gt=256,se=(a,m,g)=>{const k=r.f16?S(a,m,t.RGBA16F,t.RGBA,t.HALF_FLOAT,null,g,t.CLAMP_TO_EDGE):S(a,m,t.SRGB8_ALPHA8,t.RGBA,t.UNSIGNED_BYTE,null,g,t.CLAMP_TO_EDGE),C=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,C),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,k,0),{t:k,f:C,w:a,h:m}};if(r.rt=se,r.ND=Gt,r.dens=se(Gt,Gt,t.LINEAR_MIPMAP_LINEAR),t.bindTexture(t.TEXTURE_2D,r.dens.t),t.generateMipmap(t.TEXTURE_2D),!r.f16){const a=S(Gt,Gt,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.NEAREST,t.CLAMP_TO_EDGE),m=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,m),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,a,0),r.d8={t:a,f:m}}r.frames={},t.bindFramebuffer(t.FRAMEBUFFER,null)}Ne();const _e=r.bake[qe],Pe=r.bake["g"+Ct];for(const e in r.ps)r.ps[e].ok||r.prep(r.ps[e],e);_e.ok||r.prep(_e,"wall"),Pe.ok||r.prep(Pe,"ground");const Pt=r.ps,Ue=r.ND;r.frames[at]||(r.frames[at]=r.rt(at,at,t.LINEAR));const go=r.frames[at],Yt=at>600?1024:512,Jt=at>600?384:160,Be=r.tex(Yt,Yt,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR_MIPMAP_LINEAR,t.CLAMP_TO_EDGE),yo=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,yo),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Be,0);const Mo=r.rt(Jt,Jt,t.LINEAR),Ut=new Float32Array(512*4),Go=r.tex(512,1,t.RGBA32F,t.RGBA,t.FLOAT,null,t.NEAREST,t.CLAMP_TO_EDGE),_=64,vt=96,pt=new Float32Array(_*vt),pe=new Uint8Array(_*vt*2),To=r.tex(_,vt,t.RG8,t.RG,t.UNSIGNED_BYTE,null,t.LINEAR,t.CLAMP_TO_EDGE),v=new Float32Array(84);v.set([q[0],q[1],q[2],ht,R[0],R[1],R[2],0,H[0],H[1],H[2],at,et[0],et[1],et[2],Wo]),v.set([ft[0],ft[1],ft[2],3.2,Le[0],Le[1],Le[2],Oo],16),v.set([L[0],L[1],L[2],jo],24),v[31]=j,v.set([ct[0],ct[1],ct[2],Ho],32),v.set([V[0],V[1],V[2],Ft==="Old Brick"?0:Ft==="Tarred Boards"?1:2],36),v.set([W[0],W[1],W[2],Dt==="Gravel"?0:Dt==="Flagstones"?1:2],40),v.set([dt[0],dt[1],dt[2],Se],44),v.set([ie==="Brass"?0:ie==="Green Plastic"?1:2,1,0,0],52);const Ie=[55e-6,55e-6,28e-6,26e-6];v.set(Ie,56),v.set([Ue,1/250,.5,Jt],60);const ue=D&&ut==="Last Light";if(ue&&(v[61]=1/500,v[62]=.2),wt||lo){const e=Math.hypot(L[0]-q[0],L[1]-q[1],L[2]-q[2])-1.29;v.set([Math.max(e,-.5),e+.4,1,0],80)}const Eo=D?[.5,.6,.75].map(e=>e*(it?2:1)*(ue?1.5:1)):[1,1.5,he?2.4:1.2,.6],zo=bt==="Still"?.75:bt==="Gusty"?1.2:1;let ot=D?it||E[21]>=.5?2:1:Te.indexOf(st);v[54]=Eo[ot]*zo;const ko=D?[.15,.2,.25]:[.3,.35,.92,.25];v[55]=ko[ot];const me=new Float32Array(16),Oe=new Float32Array(16),$t=new Float32Array(16),n0=[4.6,3.6,1.7,1.4],Xe=[.75,.85,1,1.05];for(let e=0;e<4;e++)me.set([Fe[e],ve[e],n0[e],Xe[e]],e*4);Te.forEach((e,o)=>{Oe.set(Ko[e],o*4),$t.set(De[e],o*4)}),he&&($t[9]*=1.5,$t[10]*=1.5,me[2]*=1.45),D&&([[6.2,.04,.04,1.5],[8.6,.045,.045,2],[11,.05,.05,2.5]].forEach((e,o)=>$t.set(e,o*4)),[[0,.16,1,.4],[.02,.22,1,.3],[.04,.3,.9,.2]].forEach((e,o)=>Oe.set(e,o*4)),me[15]=.68);const c0=new Int32Array([mt[0],mt[0]+mt[1],mt[0]+mt[1]+mt[2],po]),x0=1e3/at,je=e=>{const o=[e[0]-q[0],e[1]-q[1],e[2]-q[2]],f=o[0]*R[0]+o[1]*R[1]+o[2]*R[2];return[.5+.5*(o[0]*H[0]+o[1]*H[1]+o[2]*H[2])/(f*ht),.5+.5*(o[0]*et[0]+o[1]*et[1]+o[2]*et[2])/(f*ht)]},He=je(L);let We=null;if(le){const e=(s,l)=>[s[1]*l[2]-s[2]*l[1],s[2]*l[0]-s[0]*l[2],s[0]*l[1]-s[1]*l[0]],f=(s=>{const l=Math.hypot(s[0],s[1],s[2]);return s.map(n=>n/l)})(e(ft,[0,1,0])),i=e(f,ft),y=Math.cos(42*z),u=Math.sin(42*z);let h=null,d=1e9;for(let s=0;s<180;s++){const l=s/180*2*Math.PI,n=[0,1,2].map(P=>ft[P]*y+(f[P]*Math.cos(l)+i[P]*Math.sin(l))*u),G=n[0]*W[0]+n[2]*W[2];if(G<=.001)continue;const x=((V[0]-q[0])*W[0]+(V[2]-q[2])*W[2])/G,w=[q[0]+n[0]*x,q[1]+n[1]*x,q[2]+n[2]*x];if(w[1]<.6||w[1]>1.4)continue;const M=je(w);if(M[0]<.2||M[0]>.8||M[1]<0||M[1]>1)continue;const rt=Math.abs(M[0]-.5);rt<d&&(d=rt,h=w)}if(!h){const s=((V[0]-q[0])*W[0]+(V[2]-q[2])*W[2])/(R[0]*W[0]+R[2]*W[2]);h=[q[0]+R[0]*s,1,q[2]+R[2]*s]}We=[(h[0]-V[0])*dt[0]+(h[2]-V[2])*dt[2]+20+(E[29]-.5)*.3,(E[28]<.5?-1:1)*(.85+.1*E[25]),1.9+.2*E[26]+10*(ze===1?2:Math.floor(E[27]*3))]}const Ao=je(gt),xe=Math.min(1,Math.max(He[1]+.17,.3)),i0=Math.max(0,Math.min(j>0?Math.min(He[0]-.2,Ao[0]-.06):Math.max(He[0]+.2,Ao[0]+.06)-xe,1-xe));v.set([i0,0,xe,xe],48),D&&(v.set([-5,-5,.001,.001],48),v[24]=99,v[25]=0,v[26]=99),v.set([gt[0],ho,gt[2],vo,Nt[0],Nt[1],_t[0],_t[1]],72);let B=j*(36+(N()-.5)*30)*z,I=(44+(N()-.5)*16)*z;F.home&&(B=30*z,I=52*z),it&&!D&&(B=fe-(E[22]-.5)*.15,I=(54+E[23]*8)*z),he&&(B=Math.atan2(j*dt[0],j*dt[2]),I=(25+E[23]*10)*z);const qo=(e,o)=>{const f=[Math.sin(e)*Math.cos(o),Math.sin(o),Math.cos(e)*Math.cos(o)],i=De[st][0]*.9*Xe[2],y=Fe[2],u=[ct[0],ct[1]-ve[2],ct[2]];let h=180,d=0;for(let T=.03;T<3;T+=.03){const s=1-Math.exp(-T/y),l=[0,1,2].map(M=>L[M]+f[M]*.103+u[M]*T+(f[M]*i-u[M])*y*s);if(l[1]<0||(l[0]-V[0])*W[0]+(l[2]-V[2])*W[2]>0)break;const n=[l[0]-q[0],l[1]-q[1],l[2]-q[2]],G=Math.hypot(n[0],n[1],n[2]);if((n[0]*R[0]+n[1]*R[1]+n[2]*R[2])/G<.86)continue;const w=Math.acos((n[0]*ft[0]+n[1]*ft[1]+n[2]*ft[2])/G)/z;h=Math.min(h,w),d=Math.max(d,w)}return[h,d]};if(!F.home&&!D&&!it&&st!=="Fog"&&qo(B,I)[1]<44){let e=null,o=1e9;for(let f=-6;f<=20;f+=2)for(let i=-12;i<=45;i+=3){const y=B+j*i*z,u=I+f*z,h=qo(y,u),d=i*i+f*f;h[1]>=44&&h[1]<=52&&d<o&&(o=d,e=[y,u])}e&&(B=e[0],I=e[1])}const be=(e,o,f,i,y)=>{const u=[Math.sin(o)*Math.cos(f),Math.sin(f),Math.cos(o)*Math.cos(f)],h=[L[0]+u[0]*.103,L[1]+u[1]*.103,L[2]+u[2]*.103],d=De[i][0]*.9*Xe[e],T=Fe[e],s=[ct[0],ct[1]-ve[e],ct[2]];let l=h,n=!1;for(let G=y;G<4;G+=y){const x=1-Math.exp(-G/T);if(l=[0,1,2].map(w=>h[w]+s[w]*G+(u[w]*d-s[w])*T*x),(l[0]-V[0])*W[0]+(l[2]-V[2])*W[2]>0){n=!0;break}if(l[1]<0)break}return[l,n]},Ro={Shower:1,Mist:.7,Fog:.4,"Jet Fan":1},Lo=e=>[(1-e)*(1-e)*gt[0]+2*(1-e)*e*Nt[0]+e*e*_t[0],(1-e)*(1-e)*gt[2]+2*(1-e)*e*Nt[1]+e*e*_t[1]],Ve=(e,o,f,i)=>{const y=e/22;for(let d=0;d<_*64;d++)pt[d]=Math.max(0,pt[d]-y);const u=[.6,1,1.4][i],h=Math.hypot(H[0],H[2]);for(let d=0;d<28;d++){const T=(d+.5)/28,s=Lo(T),l=Math.sin(d*12.9898+Se)*43758.5453%1,n=s[0]+ct[0]*(.5+.3*u)+H[0]/h*Math.sin(o)*u*.9,G=s[1]+ct[2]*(.5+.3*u)+H[2]/h*Math.sin(o)*u*.9,x=(.26+.12*u+.08*Math.abs(l))*(1-.3*T)*(_/6),w=(n+3)/6*_-.5,M=G*vt/9-.5,rt=e/2.5*f*(Ct===2?.5:1);for(let P=Math.max(0,Math.floor(M-x));P<=Math.min(63,Math.ceil(M+x));P++)for(let S=Math.max(0,Math.floor(w-x));S<=Math.min(_-1,Math.ceil(w+x));S++){const Z=((S-w)**2+(P-M)**2)/(x*x);Z<1&&(pt[P*_+S]=Math.min(1.2,pt[P*_+S]+rt*(1-Z*Z)))}}};if(D){B=0,I=0;const e=Lo(.5);v.set([e[0]+ct[0]*.8,e[1]+ct[2]*.8,.9,0],64),v.set([0,0,1,0],68),Ve(4,0,1,ot),Ve(4,0,1,ot)}else{const e=Ro[st],[o]=be(2,B,I,st,.02),[f,i]=be(3,B,I,st,.02);v.set([o[0],o[2],.85,.95*e],64);const y=(f[0]-V[0])*dt[0]+(f[2]-V[2])*dt[2]+20;v.set([y,i?Math.max(f[1],.25):.3,i?.55:.4,(i?.9:.35)*e],68);const u=(h,d,T)=>{const s=Math.min(1,Math.max(0,(T-h)/(d-h)));return s*s*(3-2*s)};for(let h=0;h<vt;h++)for(let d=0;d<_;d++){const T=-3+6*(d+.5)/_;let s;if(h<64){const l=9*(h+.5)/vt;s=u(1,.45,Math.hypot(T-o[0],l-o[2])/.85)*.95*e}else{const l=(h-64+.5)/16;s=u(1,.55,Math.hypot((T+20-v[68])/v[70]*.8,(l-v[69])/v[70]))*v[71]}pt[h*_+d]=s,pe[(h*_+d)*2+1]=Math.round(Math.min(1,s)*255)}}let Ze=B,Ke=I,Qt=1;const l0=()=>[Math.sin(B)*Math.cos(I),Math.sin(I),Math.cos(B)*Math.cos(I)];for(let e=0;e<512;e++)Ut.set([B,I,ot,1],e*4);let te=-1;const So=()=>{t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0),t.depthMask(!1),t.bindVertexArray(r.vao)},ee=()=>{t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,r.noise),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,Be),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,r.dens.t),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,r.lut),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,Mo.t),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,Go),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,go.t),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,r.fbm),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,To)},At=e=>{t.useProgram(e.p),t.uniform4fv(e.G,v),e.CP&&(t.uniform4fv(e.CP,me),t.uniform4fv(e.CW,Oe),t.uniform4fv(e.CS,$t),t.uniform4iv(e.CN,c0))};So(),t.bindFramebuffer(t.FRAMEBUFFER,yo),t.viewport(0,0,Yt,Yt),v[11]=Yt,ee(),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,null),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD);const h0=v.slice(80,83);We&&v.set(We,80);for(const e of[_e,Pe])for(let o=0;o<4;o++)v[83]=o,At(e),t.drawArrays(t.TRIANGLES,0,3);v[83]=0,v.set(h0,80),t.disable(t.BLEND),D&&(v.set(fo,80),v[67]=.3),v[11]=at,t.bindTexture(t.TEXTURE_2D,Be),t.generateMipmap(t.TEXTURE_2D);const Fo=()=>{for(let e=0;e<_*vt;e++)pe[e*2]=Math.round(Math.min(1,pt[e])*255);t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,To),t.texSubImage2D(t.TEXTURE_2D,0,0,0,_,vt,t.RG,t.UNSIGNED_BYTE,pe)},f0=(e,o,f,i,y)=>{const u=e/22;for(let n=0;n<_*vt;n++)pt[n]=Math.max(pe[n*2+1]/255,pt[n]-u);const[h]=be(2,o,f,i,.04),[d,T]=be(3,o,f,i,.04),s=Ro[i]*y;v[64]=h[0],v[65]=h[2],v[66]=.5,v[67]=s*(i==="Fog"?.2:i==="Mist"?.5:1)*(Ct===2?.3:1);const l=(n,G,x,w,M,rt,P)=>{for(let S=Math.max(M,Math.floor(G-w));S<=Math.min(rt,Math.ceil(G+w));S++)for(let Z=Math.max(0,Math.floor(n-x));Z<=Math.min(_-1,Math.ceil(n+x));Z++){const qt=((Z-n)/x)**2+((S-G)/w)**2;qt<1&&(pt[S*_+Z]=Math.min(1.2,pt[S*_+Z]+P*(1-qt)))}};if(l((h[0]+3)/6*_-.5,h[2]*vt/9-.5,4.5,4.5,0,63,e/2.5*s),T){const n=(d[0]-V[0])*dt[0]+(d[2]-V[2])*dt[2];l((n+3)/6*_-.5,64+Math.max(d[1],.1)*16-.5,4,6,64,95,e/3*s)}};Fo();let Ye=!0;const d0=()=>{const e=l0();v[28]=e[0],v[29]=e[1],v[30]=e[2],t.bindFramebuffer(t.FRAMEBUFFER,Mo.f),t.viewport(0,0,Jt,Jt),ee(),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,null),At(Pt.noz),t.drawArrays(t.TRIANGLES,0,3),Ye=!1},Do=e=>{if(So(),v[7]=e,t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,Go),t.texSubImage2D(t.TEXTURE_2D,0,0,0,512,1,t.RGBA,t.FLOAT,Ut),Ye&&!D&&d0(),t.bindFramebuffer(t.FRAMEBUFFER,r.d8?r.d8.f:r.dens.f),t.viewport(0,0,Ue,Ue),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),ee(),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),At(Pt[D?"splatS":"splat"]),t.drawArrays(t.POINTS,0,po),t.disable(t.BLEND),r.d8&&(t.bindFramebuffer(t.FRAMEBUFFER,r.dens.f),t.bindTexture(t.TEXTURE_2D,r.d8.t),At(Pt.res),t.drawArrays(t.TRIANGLES,0,3)),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,r.dens.t),t.generateMipmap(t.TEXTURE_2D),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,go.f),t.viewport(0,0,at,at),ee(),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,null),At(Pt.comp),t.drawArrays(t.TRIANGLES,0,3),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),ue)for(let o=56;o<60;o++)v[o]=Ie[o-56]*.6;At(Pt[D?"streakS":"streak"]),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,Zo),ue&&v.set(Ie,56),t.disable(t.BLEND),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,at,at),ee(),At(Pt.fin),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE0)};Do(0);const lt=F.input,we=F.sound;let Bt=0,Je=!1,$e=0,Co=0,No=0,oe=0,_o=-10,ae=1044+(Se*1e3|0),ge=0,Qe=0,to=0;const eo=()=>{ae=ae+1831565813|0;let e=Math.imul(ae^ae>>>15,1|ae);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Po=new Float32Array(400);return(e,o)=>{if(o=Math.min(Math.max(o||0,0),.25),Bt+=o,lt.taps(),lt.down&&lt.inside){if(Je||($e=Bt,Co=lt.x,No=lt.y,oe=0),oe=Math.max(oe,Math.hypot(lt.x-Co,lt.y-No)),oe>.02||Bt-$e>.3){const s=2*lt.x-1,l=1-2*lt.y,n=[R[0]+s*ht*H[0]+l*ht*et[0],R[1]+s*ht*H[1]+l*ht*et[1],R[2]+s*ht*H[2]+l*ht*et[2]],G=Math.hypot(n[0],n[1],n[2]),x=2.3,w=[q[0]+n[0]/G*x-L[0],q[1]+n[1]/G*x-L[1],q[2]+n[2]/G*x-L[2]];Ze=j>0?Math.max(-60*z,Math.min(100*z,Math.atan2(w[0],w[2]))):Math.max(-100*z,Math.min(60*z,Math.atan2(w[0],w[2]))),Ke=Math.max(-12*z,Math.min(62*z,Math.atan2(w[1],Math.hypot(w[0],w[2]))+10*z)),D&&(Ze=Math.max(-1,Math.min(1,(lt.x-.5)*2.4))*35*z,Ke=0)}}else Je&&oe<.02&&Bt-$e<.35&&(ot=(ot+1)%(D?3:4),_o=Bt,we.hit("click",.5),we.note(84+ot*2,{dur:.05,vel:.12,wave:"triangle"}));Je=lt.down&&lt.inside;const f=1-Math.exp(-o*9),i=B,y=I;ge+=o,B+=(Ze-B)*f,I+=(Ke-I)*f;const u=.004*Math.sin(ge*7.3)+.003*Math.sin(ge*12.9+1),h=.003*Math.sin(ge*9.1+2);Math.abs(B-i)+Math.abs(I-y)>2e-4&&(Ye=!0);const d=Bt-_o;Qt=d<.25?.15+.85*Math.abs(d-.12)/.13:1;const T=Math.floor(e*60);(te<0||T-te>512)&&(te=T-1);for(let s=te+1;s<=T;s++){const l=(s%512+512)%512*4;Ut[l]=B+u,Ut[l+1]=I+h,Ut[l+2]=ot,Ut[l+3]=Qt}if(te=T,v[54]+=(Eo[ot]*zo-v[54])*(1-Math.exp(-o*.8)),v[55]+=(ko[ot]-v[55])*(1-Math.exp(-o*.8)),o>0&&(D?Ve(o,B,Qt,ot):f0(o,B,I,Te[ot],Qt),Fo()),Do(e),we.on!==!1){const s=Math.min(400,Math.round(o*8e3)),l=[.35,.6,.75,.25][ot],n=.25*Qt;for(let G=0;G<s;G++)Qe+=(eo()-.5-Qe)*l,to*=.93,eo()<[.004,.0015,3e-4,.006][ot]&&(to+=(eo()-.3)*.8),Po[G]=Qe*n+to*.3;s>0&&we.pcm(Po.subarray(0,s),8e3,{vel:.4})}}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
