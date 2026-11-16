// Jar Aurora: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/465.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ee){ee&&(()=>{const H=new Map,Be=4,Fe=s=>{const t=H.get(s);return t&&(H.delete(s),H.set(s,t)),t},De=(s,t)=>{for(H.set(s,t);H.size>Be;)H.delete(H.keys().next().value)};ee.add({num:465,name:"Jar Aurora",fam:"Worlds",recipe:"A magnetised ball in a glass vacuum jar gathers a glow into two rings round its poles, and sometimes into a belt round its middle like a planet's rings. Which way the magnet points and the gas and its colour (violet air, blue argon, orange neon) change every mint. Drag to turn the ball, tap to pulse the voltage so the rings flare and ripple, or hold to let gas in so the glow spreads into a haze.",interactive:"Drag to turn the sphere so the ovals tilt, tap to pulse the voltage so the ovals flare and the curtains ripple, hold to let gas in so the glow spreads into a haze.",music:!0,gl:!0,fps:30,seed:0,make(s){const t=s.gl,ct=s.size,Ne=0,C=128,qt=C*C,w=360,it=1/60,oe=.2,I=s.hash.slice(2);let lt=parseInt(I.slice(0,8),16)|0,J=parseInt(I.slice(8,16),16)|0,A=parseInt(I.slice(16,24),16)|0,$=parseInt(I.slice(24,32),16)|0;const m=()=>{lt|=0,J|=0,A|=0,$|=0;const e=(lt+J|0)+$|0;return $=$+1|0,lt=J^J>>>9,J=A+(A<<3)|0,A=A<<21|A>>>11,A=A+e|0,(e>>>0)/4294967296};for(let e=0;e<12;e++)m();const Z=(e,o)=>{let r=0;for(const a of o)r+=a[1];let u=m()*r;for(const a of o)if(u-=a[1],u<=0)return s.trait(e,a[0]);return s.trait(e,o[0][0])},z=s.home;let ft=parseInt(I.slice(48,56),16)^Math.imul(parseInt(I.slice(56,64),16),2246822507)^4608017|0;const dt=()=>{ft=ft+1831565813|0;let e=Math.imul(ft^ft>>>15,1|ft);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},re=e=>{let o=dt()*100;for(const r of e)if(o-=r[1],o<0)return r[0];return e[0][0]},_e=re([["air",42],["argon",14],["neon",12],["helium",16],["carbon dioxide",16]]),Tt=re([["upright",46],["leaning",22],["on its side",20],["toward you",12]]),qe=dt()<16/56,ne=dt()<.5?-1:1,mt=dt(),Q=dt(),pt=z?s.trait("Setup","lone sphere"):Z("Setup",[["lone sphere",6],["sun and earth",3],["ringed sphere",1],["tipped magnet",.8]]);z||Z("Gas",[["air",8],["argon",1.5],["neon",.8]]);const Pe=s.trait("Gas",z?"air":_e),G=z?s.trait("Voltage","medium"):Z("Voltage",[["low",3],["medium",4],["high",3]]),Et=z?s.trait("Pressure","medium"):Z("Pressure",[["thin",3],["medium",4],["dense",3]]),St=z?s.trait("Sphere","aluminium"):Z("Sphere",[["aluminium",5],["copper",3],["blackened",2]]),ue=z?s.trait("Room","dark"):Z("Room",[["dark",6],["red safelight",2],["lab lamp",2]]),h=!z&&pt==="lone sphere"&&qe,co=h?s.trait("Setup","ring current"):pt,L=pt==="lone sphere"?0:pt==="sun and earth"?1:pt==="ringed sphere"?2:3,Ie=ue==="dark"?0:ue==="red safelight"?1:2,Rt=G==="low"?8:G==="medium"?5.1:3.2,Ue=G==="low"?.6:G==="medium"?1:1.3,ke=G==="low"?2.4:G==="medium"?3:3.7,Pt={air:[[.5,.3,1],[.95,.4,.92],1],argon:[[.8,.5,.86],[.2,.38,1],1],neon:[[.8,.44,.07],[.52,.09,.035],1],helium:[[.64,.5,.3],[.66,.33,.24],1.4],"carbon dioxide":[[.71,.89,.84],[.28,.58,.37],.7]}[Pe],It=Pt[0],Ut=Pt[1],ae=Pt[2],se=Math.min((Et==="thin"?.55:Et==="medium"?1:1.75)*ae,1.9),kt=St==="aluminium"?[.72,.72,.75]:St==="copper"?[.86,.5,.36]:[.05,.045,.05],Ve=St==="aluminium"?.06:St==="copper"?.08:.5,x=z?1:m()<.45?-1:1,Xe=.2,He=.22,Je=(h?G==="low"?3:G==="medium"?5:7:G==="low"?.2:G==="medium"?1:1.8)*(Et==="thin"?.55:Et==="medium"?1:1.5)*ae,v=L===1?[3.75*x,.1,-3.1,.95]:[4.25*x,-.5,-2.4,.5],Ct=L===2?[1.42,1.86]:[0,0],_=L===3?[.05,-.16,.22]:[0,0,0];let ht=parseInt(I.slice(32,40),16)^Math.imul(parseInt(I.slice(40,48),16),2654435761)|0;const ce=()=>{ht=ht+1831565813|0;let e=Math.imul(ht^ht>>>15,1|ht);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Oe=(()=>{const e=[["jar view",56],["close on the oval",26],["high angle",12],["grazing",6]];let o=ce()*100;for(const r of e)if(o-=r[1],o<0)return r[0];return e[0][0]})(),At=s.trait("View",z?"jar view":Oe),Gt=ce()-.5,Bt={"jar view":[[-.25*x,1.15,7.3],[1.05*x,-.12,-.5],2.75],"close on the oval":[[(-.55+.3*Gt)*x,1.75,4.6],[.95*x,.3,0],2.6,.1*x],"high angle":[[(-.4+.4*Gt)*x,5,4.4],[1.35*x,-.55,-.3],2.8,-.08*x],grazing:[[-.9*x,-.35,2.75],[1.25*x,1.05,0],2.2,(.3+.15*Gt)*x]}[At];let f=Bt[0],Vt=Bt[1];const ie=Bt[2],xt=Bt[3]||0,je=[Math.sin(xt),Math.cos(xt),0],le=(e,o)=>[e[0]-o[0],e[1]-o[1],e[2]-o[2]],S=e=>{const o=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/o,e[1]/o,e[2]/o]},tt=(e,o)=>[e[1]*o[2]-e[2]*o[1],e[2]*o[0]-e[0]*o[2],e[0]*o[1]-e[1]*o[0]];let E=S(le(Vt,f)),g=S(tt(E,je)),O=tt(g,E),U=.5+(z?0:(m()-.55)*.75),et=x*(-.35+(z?0:(m()-.5)*1.6));const vt=s.trait("Axis",z||At==="grazing"?"upright":h&&Tt==="on its side"?"leaning":h&&Tt==="toward you"?"upright":L===2&&Tt==="toward you"?"leaning":L===3?"upright":Tt);if(vt!=="upright"||h){const e=S([-f[0],-f[1],-f[2]]),o=g[0]*e[0]+g[1]*e[1]+g[2]*e[2],r=S([g[0]-e[0]*o,g[1]-e[1]*o,g[2]-e[2]*o]),u=tt(r,e),a=At==="close on the oval"?x:ne,[d,l]=vt==="upright"?[(mt-.5)*.3,.14+.2*Q]:vt==="leaning"?[a*(.87+.35*mt),h?.12+.18*Q:.26+.26*Q]:vt==="on its side"?[ne*(1.5708+(mt-.5)*.5),(Q-.5)*.12]:[mt*6.2832,1.5708-(.21+.14*Q)],y=Math.cos(d)*Math.cos(l),M=Math.sin(d)*Math.cos(l),T=Math.sin(l),V=S([u[0]*y+r[0]*M-e[0]*T,u[1]*y+r[1]*M-e[1]*T,u[2]*y+r[2]*M-e[2]*T]);U=Math.acos(Math.max(-1,Math.min(1,V[1]))),et=Math.atan2(V[0],V[2])}const We=Math.min(-1.35,U),Ke=Math.max(1.35,U);let Xt=U,fe=et;const b=new Float32Array(9),ot=[0,0,1],Ht=(e,o)=>{const r=[];for(let u=0;u<3;u++)for(let a=0;a<3;a++){let d=0;for(let l=0;l<3;l++)d+=e[u*3+l]*o[l*3+a];r.push(d)}return r},Ft=L===3?1.03:0,Ye=[1,0,0,0,Math.cos(Ft),-Math.sin(Ft),0,Math.sin(Ft),Math.cos(Ft)];let gt=0;const de=()=>{const e=Math.cos(U),o=Math.sin(U),r=Math.cos(et),u=Math.sin(et),a=[1,0,0,0,0,1,0,-1,0],d=[1,0,0,0,e,-o,0,o,e],l=[r,0,u,0,1,0,-u,0,r],y=Ht(l,Ht(d,a)),M=Ht(y,Ye);ot[0]=y[2],ot[1]=y[5],ot[2]=y[8];for(let D=0;D<3;D++)for(let N=0;N<3;N++)b[N*3+D]=M[D*3+N];const T=S(v),V=M[0]*T[0]+M[3]*T[1]+M[6]*T[2],K=M[1]*T[0]+M[4]*T[1]+M[7]*T[2];gt=Math.atan2(K,V)};if(de(),At==="grazing"){let e=[b[6],b[7],b[8]];e[1]<0&&(e=[-e[0],-e[1],-e[2]]);const o=f[0]*e[0]+f[1]*e[1]+f[2]*e[2],r=S([f[0]-e[0]*o,f[1]-e[1]*o,f[2]-e[2]*o]),u=1.66+.08*Gt,a=Math.cos(u),d=Math.sin(u);f=[(e[0]*a+r[0]*d)*2.6,(e[1]*a+r[1]*d)*2.6,(e[2]*a+r[2]*d)*2.6],Vt=[e[0]*1.3-r[0]*.1,e[1]*1.3-r[1]*.1,e[2]*1.3-r[2]*.1],E=S(le(Vt,f));const l=S(tt(E,e)),y=[e[0]+l[0]*xt*.5,e[1]+l[1]*xt*.5,e[2]+l[2]*xt*.5];g=S(tt(E,y)),O=tt(g,E)}const io=e=>[b[0]*e[0]+b[3]*e[1]+b[6]*e[2],b[1]*e[0]+b[4]*e[1]+b[7]*e[2],b[2]*e[0]+b[5]*e[1]+b[8]*e[2]],j=(L===1?`#define STREAM
`:"")+(L===2?`#define RING
`:"")+(h?`#define BELT
`:"")+(vt==="toward you"?`#define MK0 .917
#define MK .083
`:`#define MK0 .75
#define MK .25
`);let n=t.__c465;if(!n){n=t.__c465={},n.f32=!!t.getExtension("EXT_color_buffer_float"),n.f16=n.f32||!!t.getExtension("EXT_color_buffer_half_float");const e=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
`,o=e+"out vec2 v;void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));v=p;gl_Position=vec4(p*2.-1.,0.,1.);}",r="uint hh(uint x){x^=x>>16;x*=0x7feb352du;x^=x>>15;x*=0x846ca68bu;x^=x>>16;return x;}",u=e+`uniform sampler2D uS;uniform vec4 uA,uB,uC,uD;in vec2 v;out vec4 o;
${r}
uint sd;float rn(){sd=hh(sd);return float(sd>>8)/16777216.;}
float bra(float la){float s=sin(la),c=cos(la),c2=c*c;return sqrt(1.+3.*s*s)/(c2*c2*c2);}
float rip(float p,float t){return .55*sin(5.*p+.9*t+1.7*sin(2.*p-.31*t))+.3*sin(11.*p-1.7*t+2.3+.8*sin(3.*p+.5*t))+.15*sin(23.*p+2.9*t);}
void main(){ivec2 ij=ivec2(gl_FragCoord.xy);vec4 st=texelFetch(uS,ij,0);
 int id=ij.x+ij.y*128;sd=hh(uint(id)*747796405u+uint(uC.x)*2891336453u+1u);
 float dt=uA.x,t=uA.y,P=uA.w;
 float L=st.x,ph=st.y,la=st.z,m=abs(st.w),sg=st.w<0.?-1.:1.;
 float spd=uA.z*(.55+.9*fract(float(id)*.6180339));
 bool dead=L<1.05;
 if(!dead){
  float cl=cos(la),sl=sin(la);
  float q=1.-m*bra(la);
  float vp=spd*sqrt(max(q,.004));
  float ln=la+sg*vp*dt/(L*cl*sqrt(1.+3.*sl*sl));
  if(m*bra(ln)>1.)sg=-sg;else{
   if(uC.w>0.&&ln*la<0.&&L>uC.w&&L<uD.w)dead=true;
   la=ln;}
  ph+=.035*L*spd*spd*(1.-.5*max(q,0.))*dt;
  if(rn()<.55*P*dt){if(rn()<.4)dead=true;float lc=.92/(L*L*L*sqrt(4.-3./L));m=m<lc?min(m*(.5+1.1*rn()),lc):min(m*(.6+.8*rn()),1.);L=max(1.2,L+(rn()-.5)*.25*P);}
  float c2=cos(la);vec3 pl=vec3(L*c2*c2*c2*cos(ph),L*c2*c2*c2*sin(ph),L*c2*c2*sin(la))+uD.xyz;
  if(length(pl)<1.)dead=true;
  if(rn()<dt*(m>.03?1.6:.5))dead=true;
  if(abs(la)>1.5||L>30.||(L>8.&&m>.03))dead=true;
 }
 if(dead){
  float u=rn(),lw=rn();
  ph=uC.z>0.&&rn()<.6?uB.z+(u+rn()+rn()-1.5)*1.5:u*6.2832;
  L=uB.x*(1.+.1*cos(ph-uB.z))+uB.y*rip(ph,t)+(rn()-.5)*(.35+.4*P);
  sg=rn()<.5?-1.:1.;
  if(rn()<uB.w){float ri=1.08+uC.y*.45*min(-log(max(rn(),1e-4)),5.);if(rn()<.04){L*=1.25+1.2*pow(rn(),1.5);ri=1.05+.4*rn();}la=sg*acos(sqrt(min(ri/L,1.)));m=(.04+.88*rn())/(L*L*L*sqrt(4.-3./L));}
  else{la=(rn()-.5)*.36;m=1.-pow(rn(),2.);}
  if(lw<.16){L=1.4+1.9*rn()*rn();la=(rn()-.5)*.6;m=(1.08+1.6*rn()*rn())*.92/(L*L*L*sqrt(4.-3./L));}
 }
 o=vec4(L,mod(ph,6.2831853),la,sg*max(m,.0015));}`,a=e+`uniform sampler2D uS;uniform mat3 uM;uniform vec4 uC0,uC1,uC2,uC3,uW,uS2,uX,uY;out vec3 vC;
void main(){int id=gl_VertexID>>2,j=gl_VertexID&3;float fk=float((j+1)>>1)*.5-.5;vec4 st=texelFetch(uS,ivec2(id&127,id>>7),0);
 float L=st.x,ph=st.y,la=st.z,m=abs(st.w);
 float lc=.92/(L*L*L*sqrt(4.-3./L));bool fa=m<lc*1.05;
 float c0=cos(la),r0=L*c0*c0;bool sh=!fa&&L<3.4;
 float aw=.3+1.4*pow(.5+.5*sin(2.*ph+uX.z*.12+1.7*sin(ph-uX.z*.05)),2.);
 float Ld=L,phd=ph,s0=sin(la),lf=acos(sqrt(min(1./Ld,1.)));
 float lad=clamp(la+fk*(fa?.22:.34-uY.z)/(Ld*c0*sqrt(1.+3.*s0*s0)),-lf,lf);
 float cl=cos(lad),r=Ld*cl*cl;
 vec3 pw=uM*(vec3(r*cl*cos(phd),r*cl*sin(phd),r*sin(lad))+uW.xyz);
 vec3 d=pw-uC0.xyz;float dl=length(d);vec3 rd=d/dl;
 vec3 oc=uC0.xyz;float b=dot(oc,rd),h=b*b-dot(oc,oc)+1.;bool occ=h>0.&&-b-sqrt(h)<dl;
 oc=uC0.xyz-uS2.xyz;b=dot(oc,rd);h=b*b-dot(oc,oc)+uS2.w*uS2.w;occ=occ||(h>0.&&-b-sqrt(h)<dl);
 float rs=length(pw),z=dot(d,uC3.xyz);
 if(L<1.05||z<.05){gl_Position=vec4(2.,2.,2.,1.);vC=vec3(0.);return;}
 gl_Position=vec4(vec2(dot(d,uC1.xyz),dot(d,uC2.xyz))/z*uC0.w,0.,1.);
 float nb=exp(-(rs-1.)/.06),fr=smoothstep(1.25,2.4,rs);
 float eo=abs(dot(uM*vec3(-sin(ph),cos(ph),0.),normalize(uC0.xyz))),sl=sin(lad),q=3.*sl*sl-1.;
 float fo=abs(dot(normalize(uM*vec3(q*cos(ph),q*sin(ph),-3.*sl*cl)),rd));
 float ew=fa?.55*(1.-uY.w)*(.45+.9*smoothstep(-.6,.9,sin(3.*ph+uX.z*.6+2.*sin(2.*ph-uX.z*.3))*.6+sin(7.*ph-uX.z*1.1)*.4))*.4/(.4+fo)*exp(-max(rs-1.1,0.)/uY.x):sh?.4*uX.x*aw*mix(.1+.9*smoothstep(.35,.9,eo),1.,uX.w)*exp(-max(rs-1.1,0.)/.3-(Ld-1.4)/.6-lad*lad*uY.y):.25*exp(-max(rs-1.2,0.)/.3);
 vC=(occ||rs<.99)?vec3(0.):uW.w*ew*(1.-1.6*fk*fk)*(fa?vec3(uX.y*nb,(.7-.4*nb)*(1.-fr),.8*fr):vec3(0.,0.,1.));}`,d=e+"in vec3 vC;out vec4 o;void main(){o=vec4(vC,0.);}",l=e+`uniform sampler2D uSrc;uniform vec4 uB;in vec2 v;out vec4 o;
void main(){vec2 e=uB.xy;vec3 a;if(uB.w>0.)a=(texture(uSrc,v+e).rgb+texture(uSrc,v-e).rgb+texture(uSrc,v+vec2(e.x,-e.y)).rgb+texture(uSrc,v-vec2(e.x,-e.y)).rgb)*.25;else{
 a=texture(uSrc,v).rgb*.227;a+=(texture(uSrc,v+uB.xy*1.385).rgb+texture(uSrc,v-uB.xy*1.385).rgb)*.316;a+=(texture(uSrc,v+uB.xy*3.23).rgb+texture(uSrc,v-uB.xy*3.23).rgb)*.0703;a*=uB.z;}o=vec4(a,1.);}`,y=e+`uniform sampler2D uE,uB1,uB2,uN,uVt;uniform mat3 uM;
uniform vec4 uC0,uC1,uC2,uC3,uS2,uG0,uG1,uH,uL0,uL1,uL2,uL3,uT0,uT1,uT2,uJ,uR,uV;in vec2 v;out vec4 o;
${r}
vec2 proj(vec3 p){vec3 d=p-uC0.xyz;float z=max(dot(d,uC3.xyz),.05);return vec2(dot(d,uC1.xyz),dot(d,uC2.xyz))/z*uC0.w*.5+.5;}
float sph(vec3 ro,vec3 rd,vec3 c,float r){vec3 oc=ro-c;float b=dot(oc,rd),h=b*b-dot(oc,oc)+r*r;return h<0.?-1.:-b-sqrt(h);}
float cyl(vec3 ro,vec3 rd,vec2 cx,float r,float y0,float y1){vec2 oo=ro.xz-cx,d=rd.xz;float a=dot(d,d),b=dot(oo,d),h=b*b-a*(dot(oo,oo)-r*r);
 if(h<0.)return -1.;float t=(-b-sqrt(h))/a;float y=ro.y+rd.y*t;return y>y0&&y<y1?t:-1.;}
vec3 glw(sampler2D s,vec3 p){vec3 e=textureLod(s,proj(p),0.).rgb;return e.r*uG0.rgb+e.g*uG1.rgb;}
float halo(vec3 ro,vec3 rd,vec3 c,float r,float hh,float th){vec3 oc=c-ro;float tc=dot(oc,rd);float b=length(oc-rd*tc);
 float g=sqrt(6.28*hh*r)*.5;
 if(th>0.){vec3 p=ro+rd*th;float mu=max(dot(normalize(p-c),-rd),.05);return min(hh*.3/mu,g);}
 return exp(-(b-r)/hh)*sqrt(6.28*hh*b)*.5;}
#ifdef RING
// the ring current: a thin sheet of glowing gas in the magnetic equator, clear of the metal across a dark gap; light, not a
// surface: crisp bright inner edge, fading outward to nothing, brightest where the eye runs along it, with drifting knots
vec3 rlit(vec3 ro,vec3 rd,float tmax){
 vec3 sp=uL0.xyz;float dn=dot(rd,sp),tp=-dot(ro,sp)/(abs(dn)>1e-4?dn:1e-4);
 vec3 p=ro+rd*tp;float r=length(p);vec2 e=vec2(dot(p,uM[0]),dot(p,uM[1]))/max(r,1e-4);
 vec2 a=vec2(e.x*uT0.x-e.y*uT0.y,e.x*uT0.y+e.y*uT0.x),b=vec2(e.x*uT0.z-e.y*uT0.w,e.x*uT0.w+e.y*uT0.z);
 float a2=a.x*a.x,b2=b.x*b.x,c2=b.y*b.y,n=uT1.x*a.x*(a2-3.*a.y*a.y)+uT1.y*b.x*(b2*b2-10.*b2*c2+5.*c2*c2);
 float x=r-uL3.x*(1.+.035*n),k=.45+2.55*smoothstep(.1,.85,n);
 float pr=step(0.,tp)*step(tp,tmax)*smoothstep(0.,.02,x)*exp(-max(x,0.)/.16)*(1.-smoothstep(uL3.x+.12,uL3.y,r));
 return uH.x*(1.+.8*uL3.z)*1.6*pr*k/max(abs(dn),.12)*mix(uG0.rgb,uG1.rgb,smoothstep(0.,.25,x));}
#endif
void main(){
 vec2 q=v*2.-1.;vec3 ro=uC0.xyz;vec3 rd=normalize(uC3.xyz*uC0.w+uC1.xyz*q.x+uC2.xyz*q.y);
 vec4 nz=texture(uN,v*1.7+.13),nz2=texture(uN,v*.31+.5);
 float t1=sph(ro,rd,vec3(0.),1.),t2=sph(ro,rd,uS2.xyz,uS2.w);
 float tr1=cyl(ro,rd,vec2(0.),.062,-3.6,-.97),tc1=cyl(ro,rd,vec2(0.),.1,-1.42,-1.18);
 float tr2=cyl(ro,rd,uS2.xz,.052,-3.6,uS2.y-uS2.w*.96),tc2=cyl(ro,rd,uS2.xz,.085,uS2.y-uS2.w-.42,uS2.y-uS2.w-.2);
 float tg=-1.;vec3 sp=uL0.xyz;
 float tt=1e9;int id=0;
 if(t1>0.&&t1<tt){tt=t1;id=1;} if(t2>0.&&t2<tt){tt=t2;id=2;}
 if(tr1>0.&&tr1<tt){tt=tr1;id=3;} if(tc1>0.&&tc1<tt){tt=tc1;id=3;}
 if(tr2>0.&&tr2<tt){tt=tr2;id=4;} if(tc2>0.&&tc2<tt){tt=tc2;id=4;}
 if(tg>0.&&tg<tt){tt=tg;id=5;}
 {float tb=(-3.6-ro.y)/min(rd.y,-1e-4);vec3 pb=ro+rd*tb;if(rd.y<0.&&tb<tt&&length(pb.xz-uJ.xy)<uJ.z+.25){tt=tb;id=6;}}
 float hz=uH.z,P=uG1.w;
 mat3 iM=transpose(uM);
 vec3 E=texture(uE,v).rgb,b1=texture(uB1,v).rgb,b2=texture(uB2,v).rgb;
 vec3 em=(E.r+.08*b1.r+.03*b2.r)*uG0.rgb+((E.g+(.04+.06*P)*b1.g+.04*b2.g)*uG1.rgb+((.6+.12*P)*b1.b+.4*b2.b)*uG1.rgb*vec3(.85,.42,.62))*(.3+.7*min(P,1.6));
#ifdef BELT
 em+=(E.b*.14*mix(uG0.rgb,uG1.rgb,.4)+b1.b*.5*uG1.rgb)*(.3+.7*min(P,1.6));
#endif
 // diffuse cathode glow, brighter toward the magnetic poles
 vec3 cp=id==1?ro+rd*t1:ro+rd*max(dot(-ro,rd),0.);vec3 lc=transpose(uM)*cp-uL2.xyz;float s2=lc.z*lc.z/max(dot(lc,lc),1e-4);
#ifdef BELT
 s2=0.;
#endif
 float h1=halo(ro,rd,vec3(0.),1.,hz,id==1?t1:-1.)*(.45+.6*s2)*(1.-.8*smoothstep(sin(uL3.w)*sin(uL3.w)-.02,sin(uL3.w)*sin(uL3.w)+.06,s2))*uH.x;
 vec3 c2p=id==2?ro+rd*t2:ro+rd*max(dot(uS2.xyz-ro,rd),0.);float h2=halo(ro,rd,uS2.xyz,uS2.w,hz*.8,id==2?t2:-1.)*uH.y*(id==2?.45:1.)*(.35+.9*max(dot(normalize(c2p-uS2.xyz),-normalize(uS2.xyz)),0.));
 if(id>2)h1*=.6;
 em+=h1*mix(uG1.rgb,uG0.rgb,.3)*(.85+.3*nz2.g)+h2*uG1.rgb;
 {vec3 oc=-ro;float tc=dot(oc,rd);float bb=length(oc-rd*tc);em+=uH.x*uG1.rgb*(.04+.28*P)*exp(-max(bb-.9,0.)/(.2+.33*P))*(.75+.5*nz2.b)*(id==1?.2:1.);}
 // the stream from the sun sphere (sun-and-earth)
#ifdef STREAM
 if(uT1.w>0.){float acc=0.;for(float i=0.;i<uT2.w;i+=1.){float s=(i+.5)/uT2.w;vec3 p=mix(mix(uT0.xyz,uT1.xyz,s),mix(uT1.xyz,uT2.xyz,s),s);
   vec3 w=p-ro;float tp=dot(w,rd);float dd=length(w-rd*tp);float fl=.5+textureLod(uN,vec2(s*.09-uC1.w*.031,.37+uC1.w*.007),0.).r;float wd=uT0.w*(.25+1.4*s+3.2*s*s*s*s)*(.85+.3*fl);
   acc+=(exp(-dd*dd/(wd*wd))*.55+exp(-dd*dd/(wd*wd*.06))*.25*fl)*fl*(tp<tt?1.:.0)*(1.6*exp(-s*9.)+.22+1.1*smoothstep(.72,1.,s))*mix(1.,uT0.w/wd,.6);}
  em+=acc*uT1.w*mix(uG1.rgb,uG0.rgb,.4)/uT2.w*26.;}
#endif
 vec3 col=vec3(.0012,.001,.0015)*(.7+.6*nz2.r);
 float lumG=dot(texture(uB2,vec2(.35,.5)).rgb,vec3(.4));
 // the room: far wall catching the glow, rare safelight or lamp
 col+=b2.r*uG0.rgb*.02+b2.g*uG1.rgb*.025;
 if(uL1.w==1.)col+=vec3(.03,.003,.001)*exp(-length(v-vec2(1.1,.95))/.28);
 if(uL1.w==2.)col+=vec3(.014,.012,.009)*exp(-length(v-vec2(-.1,.9))/.25);
 if(id>0){vec3 p=ro+rd*tt;vec3 n;vec3 base=uL1.rgb;float rough=.5,cer=0.;
  if(id==1)n=p;else if(id==2)n=(p-uS2.xyz)/uS2.w;else if(id==5)n=sp*sign(-dot(rd,sp));else if(id==6){n=vec3(0.,1.,0.);base=vec3(.22,.21,.2);}
  else{vec2 cx=id==3?vec2(0.):uS2.xz;n=vec3(p.x-cx.x,0.,p.z-cx.y);n=normalize(n);
   cer=step((id==3?-.97:uS2.y-uS2.w*.96)-.7,p.y);base=mix(vec3(.4,.29,.13),vec3(.62,.58,.54),cer);}
  vec3 wn=textureLod(uN,(id==1?vec2(dot(n,uC1.xyz),dot(n,uC2.xyz)):p.xy)*.28+.3,0.).rgb;
  float smudge=smoothstep(.35,.75,textureLod(uN,p.xy*.21+p.z*.17,0.).g);
  rough=.4+.3*smudge+.12*wn.r;
  vec3 rr=reflect(rd,n);float mu=max(dot(n,-rd),0.);
  vec3 F=base+(1.-base)*pow(1.-mu,5.);
  vec3 irr=glw(uB1,p+n*.2)*1.4+glw(uB2,p+n*.7)*.8;
#ifdef BELT
  irr+=textureLod(uB1,proj(p+n*.15),0.).b*uG1.rgb*1.2;
#endif
  vec3 gA=glw(uB1,p+rr*(id==1?.28:.45)),gB=glw(uB2,p+rr*(id==1?1.4:1.1));
  float capS=smoothstep(sin(uL3.w)-.01,sin(uL3.w)+.04,abs(dot(n,sp)));
  vec3 ql=iM*(p+rr*.12);float aq=abs(ql.z)/length(ql);
  vec3 spec=id==1?(uV.x*mix(uG0.rgb,vec3(.8,.86,1.),.3)*(1.5*exp(-abs(aq-sin(uL3.w))/.02)+2.*exp(-max(aq-sin(uL3.w),0.)/.06)*step(sin(uL3.w)-.02,aq))*(.2+.8*pow(1.-mu,1.5))+gA*(.03+.5*pow(1.-mu,2.2))+gB*.2*(1.-mu))*smoothstep(-.05,.35,mu)*(MK0+MK*sin(dot(n,sp)*260.+4.*sin(dot(n,sp)*31.))):mix(gA,gB,rough)*1.3;
  if(id==1){vec3 nl=transpose(uM)*n;float la=asin(clamp(nl.z,-1.,1.)),al=abs(la);
   vec2 e=nl.xy/max(length(nl.xy),1e-4);float sec=(.5+.8*smoothstep(-.5,1.,dot(e,uR.xy)))*(1.-.85*smoothstep(.93,.995,dot(e,uR.zw)));
   irr+=uH.x*(.45+.5*s2)*uG1.rgb*.5;spec+=uH.x*uG0.rgb*2.2*exp(-abs(uL3.w-al)/.14)*sec*(.25+.75*pow(1.-mu,1.5));
   em+=uV.x*mix(uG0.rgb,vec3(.8,.86,1.),.45)*2.4*exp(-abs(al-uL3.w)/(.0045+.004*P))*sec;}
  if(id==6)irr+=(uH.x*uG1.rgb*6.*exp(-length(p.xz)/1.1)+uH.y*uG1.rgb*4.*exp(-length(p.xz-uS2.xz)/.8))*(.6+.8*wn.b)*smoothstep(uJ.z+.25,uJ.z-.6,length(p.xz-uJ.xy));
  if(id==2){vec3 tm=-normalize(uS2.xyz);irr+=uH.y*uG1.rgb*(.15+3.*pow(max(dot(n,tm),0.),3.)+.5*max(n.y,0.));
   float u=(1.-dot(rr,normalize(sp*1.05-p)))/.007;
   spec+=uV.x*mix(uG0.rgb,vec3(.8,.86,1.),.45)*(.9*exp(-(u-1.)*(u-1.)*.35)+.3*exp(-u*.2))+uH.x*(uG1.rgb*.6+uG0.rgb*.4)*14.*pow(1.-mu,2.)*max(dot(n,tm),0.);}
#ifdef RING
  if(id==1){float eb=abs(dot(n,sp));spec+=uH.x*mix(uG0.rgb,uG1.rgb,.6)*(2.*exp(-eb/.22)*(.3+.7*pow(1.-mu,2.))+3.*exp(-eb/.025));irr+=uH.x*mix(uG0.rgb,uG1.rgb,.5)*1.2*(1.-smoothstep(0.,.34,eb));}
#endif
  if(uL1.w==2.){vec3 ld=normalize(vec3(-.8,.5,.3));spec+=vec3(.5,.42,.3)*pow(max(dot(rr,ld),0.),mix(900.,200.,rough))+vec3(.02,.017,.012)*pow(max(dot(rr,ld),0.),6.);irr+=vec3(.03,.026,.02)*max(dot(n,ld),0.);}
  if(uL1.w==1.){vec3 ld=normalize(vec3(.9,.25,.2));spec+=vec3(.3,.03,.01)*pow(max(dot(rr,ld),0.),mix(500.,120.,rough))+vec3(.02,.002,0.)*pow(max(dot(rr,ld),0.),5.);irr+=vec3(.05,.005,.002)*max(dot(n,ld),0.);}
  F=mix(F,vec3(.03+.4*pow(1.-mu,5.)),cer);
  vec3 sc=base*irr*(id==5?.45:mix(uH.w,.8,cer))*(1.-.12*wn.g)+F*spec*(1.-.2*smudge);
  if(id==1){vec3 ax=sp;float eq=abs(dot(n,ax));sc*=mix(.25,1.,smoothstep(.004,.012,eq));
   sc+=F*spec*.15*smoothstep(.02,.012,eq)*smoothstep(.006,.012,eq)*step(0.,dot(n,uC2.xyz)+.3);}
  col=sc;
  em*=id==5?.5:id>2?.75:1.-.5*capS;}
 col+=em+texelFetch(uVt,ivec2(gl_FragCoord.xy),0).rgb;
#ifdef RING
 col+=rlit(ro,rd,tt);
#endif
 // the jar: faint curved highlights on the near wall, its glass catching the glow; dust
 float lamp=uL1.w==2.?1.:0.;
 {vec2 oo=ro.xz-uJ.xy,d=rd.xz;float a=max(dot(d,d),1e-5),b=dot(oo,d),h=b*b-a*(dot(oo,oo)-uJ.z*uJ.z);
  if(h>0.){float sq=sqrt(h),tf=(-b+sq)/a,tn=(-b-sq)/a;vec3 pf=ro+rd*tf;vec3 nf=vec3(uJ.x-pf.x,0.,uJ.y-pf.z)/uJ.z;
   vec3 dc=vec3(uJ.x,uJ.w,uJ.y);
   if(pf.y>uJ.w){vec3 oc=ro-dc;float bs=dot(oc,rd),hs=bs*bs-dot(oc,oc)+uJ.z*uJ.z;tf=-bs+sqrt(max(hs,0.));pf=ro+rd*tf;nf=(dc-pf)/uJ.z;}
   if(pf.y>-3.6&&tf<tt){float mu=abs(dot(nf,rd));float F=.95*pow(1.-mu,5.)+.1*pow(1.-mu,2.5);vec3 rr=reflect(rd,nf);
        col+=F*smoothstep(.0,.2,mu)*(lumG*1.1*mix(uG1.rgb,vec3(.8,.75,.9),.3)*(.6+.4*nz2.r))*(.55+.45*smoothstep(-3.6,-1.,pf.y))*(.8+.4*nz.g);
    if(lamp>0.){col+=vec3(.5,.42,.3)*pow(max(dot(rr,normalize(vec3(-.8,.5,.3))),0.),300.)*F*3.;}
   }
   vec3 pn=ro+rd*tn;
   if(tn>0.&&lamp>0.&&pn.y>-3.6&&tn<tt){vec3 nn=normalize(vec3(pn.x-uJ.x,0.,pn.z-uJ.y));if(pn.y>uJ.w)nn=normalize(pn-dc);vec3 rn=reflect(rd,nn);
    float lh=max(dot(normalize(rn.xz),normalize(vec2(-.8,.3))),0.);col+=vec3(.6,.5,.36)*(pow(lh,3000.)*.05+pow(lh,60.)*.006)*exp(-(rn.y-.3)*(rn.y-.3)*9.)*(.7+.3*nz.b);}
  }}
 float dust=smoothstep(.9,.99,texture(uN,v*.55+.71).a*texture(uN,v*.37+.29).b*1.25);
 col+=dust*(b1.r*uG0.rgb+b1.g*uG1.rgb+vec3(lamp*.01))*.35;
 // exposure, curve, grain
 col*=uG0.w;
 uint s=hh(uint(gl_FragCoord.x)+uint(gl_FragCoord.y)*4096u+12345u);
 float g1=float(s>>8)/16777216.-.5;s=hh(s);float g2=float(s>>8)/16777216.-.5;
 float lum=dot(col,vec3(.3,.5,.2));
 col+=vec3(g1+g2*.2,g1,g1-g2*.2)*sqrt(lum*.0022);
 vec3 c2=1.-exp(-max(col,0.)*1.25);
 c2=mix(c2,vec3(dot(c2,vec3(.3,.5,.2))),.12*smoothstep(.5,1.,lum));
 c2=max(c2,0.);c2=c2*c2/(c2+.012);
 o=vec4(pow(c2,vec3(1./2.05)),1.);}`,M=e+`uniform sampler2D uN;uniform mat3 uM;uniform vec4 uC0,uC1,uC2,uC3,uS2,uG0,uG1,uL0,uL3,uR,uV;in vec2 v;out vec4 o;
float sph(vec3 ro,vec3 rd,vec3 c,float r){vec3 oc=ro-c;float b=dot(oc,rd),h=b*b-dot(oc,oc)+r*r;return h<0.?-1.:-b-sqrt(h);}
float cyl(vec3 ro,vec3 rd,vec2 cx,float r,float y0,float y1){vec2 oo=ro.xz-cx,d=rd.xz;float a=dot(d,d),b=dot(oo,d),h=b*b-a*(dot(oo,oo)-r*r);
 if(h<0.)return -1.;float t=(-b-sqrt(h))/a;float y=ro.y+rd.y*t;return y>y0&&y<y1?t:-1.;}
// the auroral ovals: where the electrons land, a hair-thin ring on the metal at the footprint latitude; from it a thin
// veil stands up along the field line (a cone tangent to it), striped by upright rays that drift round the ring,
// brightest seen edge-on, with a bright sector toward the other electrode and a thin gap opposite. o, d: sphere frame
vec3 veil(vec3 o,vec3 d,float tm){
 float s0=sin(uL3.w),c0=cos(uL3.w);vec2 ab=normalize(vec2(3.*c0*c0*s0,2.*c0*s0*s0-c0*c0*c0));float k=ab.x/ab.y;
 // both cones at once (north, south), both roots of each: no loop, no indexed write
 vec2 oz=vec2(o.z,-o.z),dz=vec2(d.z,-d.z),mm=c0+k*(oz-s0),nn=k*dz;
 vec2 A=dot(d.xy,d.xy)-nn*nn,B=dot(o.xy,d.xy)-mm*nn,D=B*B-A*(dot(o.xy,o.xy)-mm*mm);
 vec2 sq=sqrt(max(D,0.)),Aa=mix(vec2(1e-5),A,step(1e-5,abs(A)));
 vec4 t=(-B.xxyy+vec4(-1.,1.,-1.,1.)*sq.xxyy)/Aa.xxyy,s=(oz.xxyy+dz.xxyy*t-s0)/ab.y;
 vec4 m=vec4(greaterThan(D.xxyy,vec4(0.)))*vec4(greaterThan(t,vec4(0.)))*vec4(lessThan(t,vec4(tm)))*vec4(greaterThan(s,vec4(0.)))*vec4(lessThan(s,vec4(.5)));
 vec4 px=o.x+d.x*t,py=o.y+d.y*t,il=1./max(sqrt(px*px+py*py),vec4(1e-4)),ex=px*il,ey=py*il;
 vec4 gv=m*(.5+.8*smoothstep(-.5,1.,ex*uR.x+ey*uR.y))*(1.-.85*smoothstep(.93,.995,ex*uR.z+ey*uR.w))/(.22+abs(ex*d.x+ey*d.y-k*d.z*vec4(1.,1.,-1.,-1.))/sqrt(1.+k*k));
 vec4 sv=mix(vec4(1.),s,m);
 float gm=max(max(gv.x,gv.y),max(gv.z,gv.w));vec4 sel=step(gm,gv);vec2 eb=vec2(dot(sel,ex),dot(sel,ey));
 float cr=cos(uV.y),sr=sin(uV.y);
 vec4 nz=texture(uN,vec2(eb.x*cr-eb.y*sr,eb.x*sr+eb.y*cr)*.075+vec2(.3,.6));
 float ry=.15+2.2*nz.r*nz.r*nz.r,hg=uV.z*(.3+.9*nz.g);
 vec4 w=gv*(ry*exp(-sv/hg)+1.6*exp(-sv/(.012+.01*uG1.w))),a=smoothstep(0.,.05,sv),b=smoothstep(.05,.35,sv);
 vec3 lcol=mix(uG0.rgb,vec3(.8,.86,1.),.45);
 return (lcol*dot(w,(1.-a)*(1.-b))+uG0.rgb*dot(w,a*(1.-b))+uG1.rgb*dot(w,b))*uV.x;}
void main(){vec2 q=v*2.-1.;vec3 ro=uC0.xyz;vec3 rd=normalize(uC3.xyz*uC0.w+uC1.xyz*q.x+uC2.xyz*q.y);
 float t1=sph(ro,rd,vec3(0.),1.),t2=sph(ro,rd,uS2.xyz,uS2.w),r1=cyl(ro,rd,vec2(0.),.062,-3.6,-.97),c1=cyl(ro,rd,vec2(0.),.1,-1.42,-1.18),tm=t1>0.?t1+.004:1e9;
 if(t2>0.)tm=min(tm,t2);if(r1>0.)tm=min(tm,r1);if(c1>0.)tm=min(tm,c1);
 if(uL3.x>0.){float dn=dot(rd,uL0.xyz);float tp=-dot(ro,uL0.xyz)/(abs(dn)>1e-4?dn:1e-4);float rr=length(ro+rd*tp);if(tp>0.&&rr>uL3.x&&rr<uL3.y)tm=min(tm,tp);}
 mat3 iM=transpose(uM);o=vec4(veil(iM*ro,iM*rd,tm),1.);}`,T=(c,p)=>{const Y=t.createProgram();for(const[X,Lt]of[[t.VERTEX_SHADER,c],[t.FRAGMENT_SHADER,p]]){const Mt=t.createShader(X);t.shaderSource(Mt,Lt),t.compileShader(Mt),t.attachShader(Y,Mt)}return Y},V=c=>c.replace("uniform sampler2D uS;","precision highp usampler2D;uniform usampler2D uS;").replace(/texelFetch\(uS,([^;]*?),0\)/g,"uintBitsToFloat(texelFetch(uS,$1,0))").replace("out vec4 o;","out uvec4 o;").replace(" o=vec4(L,"," o=floatBitsToUint(vec4(L,").replace("max(m,.0015));}","max(m,.0015)));}");n.u32=!n.f16;const K=[[o,n.u32?V(u):u],[n.u32?V(a):a,d],[o,l],[o,M]].map(c=>T(c[0],c[1]));n.mkComp=c=>{const p=T(o,y.replace(`precision highp sampler2D;
`,`precision highp sampler2D;
`+c));return t.linkProgram(p),t.flush(),p},n.comps={},n.compKey=null,K.forEach(c=>t.linkProgram(c)),n.first=n.mkComp(j),n.firstKey=j,t.flush();const D=n.U=(c,p)=>{if(Ne&&!t.getProgramParameter(c,t.LINK_STATUS)){const X=t.getAttachedShaders(c);console.error("465 link",t.getProgramInfoLog(c),X.map(Lt=>t.getShaderInfoLog(Lt)).join(`
`))}const Y={p:c};for(const X of p)Y[X]=t.getUniformLocation(c,X);return Y};n.compU=c=>D(c,["uE","uB1","uB2","uN","uVt","uM","uC0","uC1","uC2","uC3","uS2","uG0","uG1","uH","uL0","uL1","uL2","uL3","uT0","uT1","uT2","uJ","uR","uV"]),n.ready=()=>{n.sim=D(K[0],["uS","uA","uB","uC","uD"]),n.spl=D(K[1],["uS","uM","uC0","uC1","uC2","uC3","uW","uS2","uX","uY"]),n.blur=D(K[2],["uSrc","uB"]),n.veil=D(K[3],["uN","uM","uC0","uC1","uC2","uC3","uS2","uG0","uG1","uL0","uL3","uR","uV"]),n.comps[n.firstKey]=n.compU(n.first),n.ready=null},n.vao=t.createVertexArray(),n.tex=(c,p,Y,X,Lt,Mt,Ce,Ae)=>{const Ge=t.createTexture();return t.bindTexture(t.TEXTURE_2D,Ge),t.texImage2D(t.TEXTURE_2D,0,Y,c,p,0,X,Lt,Mt||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,Ce),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,Ce),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,Ae),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,Ae),Ge};let N=1180307918;const te=new Uint8Array(256*256*4);for(let c=0;c<te.length;c++){N=N+1831565813|0;let p=Math.imul(N^N>>>15,1|N);p=p+Math.imul(p^p>>>7,61|p)^p,te[c]=(p^p>>>14)>>>0&255}n.noise=n.tex(256,256,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,te,t.LINEAR,t.REPEAT)}const me=n.comps[j]||j===n.firstKey?null:n.mkComp(j),W=(e,o,r,u,a,d)=>{const l=n.tex(e,o,r,t.RGBA,u,d,a,t.CLAMP_TO_EDGE),y=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,y),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,l,0),{t:l,f:y,w:e,h:o}},pe=n.f32?t.RGBA32F:t.RGBA16F,bt=n.f16?t.RGBA16F:t.SRGB8_ALPHA8,yt=n.f16?t.HALF_FLOAT:t.UNSIGNED_BYTE,rt=1,he=s.hash+(z?"h":""),nt=Fe(he);let q;if(nt)q=nt.init,lt=nt.s[0],J=nt.s[1],A=nt.s[2],$=nt.s[3];else{q=new Float32Array(qt*4);for(let e=0;e<qt;e++){const o=(h?1.4:Rt)+(m()-.5)*1.2,r=Math.acos(Math.sqrt(1/o)),u=m()<.5;q[e*4]=o,q[e*4+1]=m()*6.2832,q[e*4+2]=(m()*2-1)*r*(u?.95:.4),q[e*4+3]=(m()<.5?-1:1)*(u?.002+.03*m():1-m()*m())}De(he,{init:q,s:[lt,J,A,$]})}const xe=e=>{const o=n.tex(C,C,t.RGBA32UI,t.RGBA_INTEGER,t.UNSIGNED_INT,e,t.NEAREST,t.CLAMP_TO_EDGE),r=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0),{t:o,f:r,w:C,h:C}},Jt=n.u32?[xe(new Uint32Array(q.buffer)),xe(null)]:[W(C,C,pe,t.FLOAT,t.NEAREST,q),W(C,C,pe,t.FLOAT,t.NEAREST,null)],wt=W(w,w,bt,yt,t.LINEAR,null),ve=W(w/2,w/2,bt,yt,t.LINEAR,null),Ot=W(w/2,w/2,bt,yt,t.LINEAR,null),ge=W(w/4,w/4,bt,yt,t.LINEAR,null),be=W(ct,ct,bt,yt,t.NEAREST,null);t.bindFramebuffer(t.FRAMEBUFFER,wt.f),t.viewport(0,0,w,w),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),n.ready&&n.ready(),me&&(n.comps[j]=n.compU(me));const $e=n.comps[j],Ze=!0;let zt=0,ye=0,Dt=0;const R=(e,o)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,o)},ut=e=>{t.bindFramebuffer(t.FRAMEBUFFER,e.f),t.viewport(0,0,e.w,e.h)},we=()=>{t.bindVertexArray(n.vao),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0)};let i=0,B=se,Nt=1,jt=0;const Qe=.1;let ze=0,Le=0,Me=0,F=0,Wt=mt*6.2832,Kt=Q*6.2832;const to=e=>{F+=e,ze+=e*(.05+.9*i)*(1+.5*Math.sin(F*.137+1.1)),Le+=e*(.2*Math.sin(F*.083+.4)+.13*Math.sin(F*.231)+2.6*i),Me=.7*Math.sin(F*.061+2)+.35*Math.sin(F*.173+.5),Wt+=e*(.21+.08*Math.sin(F*.05)+.6*i),Kt-=e*(.13+.05*Math.sin(F*.083+2))},Te=e=>{if(!Ze)return;const o=n.sim;t.useProgram(o.p),t.disable(t.BLEND),ut(Jt[1-zt]),R(0,Jt[zt].t),t.uniform1i(o.uS,0),t.uniform4f(o.uA,e,Dt,ke*(1+.9*i),B),h?t.uniform4f(o.uB,1.25+.15*i,.06+.3*i,gt,.03):t.uniform4f(o.uB,Rt-1.3*i,.4+1.2*i,gt,Math.min(.985,.955+.03*i)),t.uniform4f(o.uC,ye,.75+1.1*i,L===1?1:0,Ct[0]),t.uniform4f(o.uD,_[0],_[1],_[2],Ct[1]),t.drawArrays(t.TRIANGLES,0,3),zt=1-zt,ye++,Dt+=e},eo=(1-Math.exp(-it/oe))*.55*rt*Xe,oo=e=>{const o=n.spl;t.useProgram(o.p),ut(wt),t.enable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ONE),R(0,Jt[zt].t),t.uniform1i(o.uS,0),t.uniformMatrix3fv(o.uM,!1,b),t.uniform4f(o.uC0,f[0],f[1],f[2],ie),t.uniform4f(o.uC1,g[0],g[1],g[2],0),t.uniform4f(o.uC2,O[0],O[1],O[2],0),t.uniform4f(o.uC3,E[0],E[1],E[2],0),t.uniform4f(o.uW,_[0],_[1],_[2],e),t.uniform4f(o.uS2,v[0],v[1],v[2],v[3]),t.uniform4f(o.uX,Je,2.2,Dt*(h?3:1),h?1.8:0),t.uniform4f(o.uY,He*(1+.6*i)*(.75+.25*B),h?14:0,h?.3:0,h?1:0),t.drawArrays(t.LINES,0,qt*4),t.disable(t.BLEND)},ro=e=>{const o=n.blur;t.useProgram(o.p),ut(wt),R(0,n.noise),t.uniform1i(o.uSrc,0),t.uniform4f(o.uB,0,0,0,0),t.enable(t.BLEND),t.blendFunc(t.ZERO,t.CONSTANT_COLOR),t.blendColor(e,e,e,e),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.BLEND)},no=()=>{const e=n.blur;t.useProgram(e.p),t.uniform1i(e.uSrc,0);const o=(r,u,a,d)=>{ut(u),R(0,r.t),t.uniform4f(e.uB,a,d,1,0),t.drawArrays(t.TRIANGLES,0,3)};o(wt,ve,1.6/w,0),o(ve,Ot,0,1.6/(w/2)),ut(ge),R(0,Ot.t),t.uniform4f(e.uB,1.7/(w/2),1.7/(w/2),1,1),t.drawArrays(t.TRIANGLES,0,3)};let Ee=0;const uo=()=>{if(L!==1)return[0,0,0,0,0,0,0,0,0,0,0,0];const e=S(v),o=[v[0]-e[0]*v[3]*1.02,v[1]-e[1]*v[3]*1.02,v[2]-e[2]*v[3]*1.02],r=[e[0]*1.5,e[1]*1.5,e[2]*1.5],u=[(o[0]+r[0])/2,(o[1]+r[1])/2+.25,(o[2]+r[2])/2];return[o[0],o[1],o[2],.09+.05*B,u[0],u[1],u[2],.32*(1+i)*Nt,r[0],r[1],r[2],30]},Se=e=>{t.uniformMatrix3fv(e.uM,!1,b),t.uniform4f(e.uC0,f[0],f[1],f[2],ie),t.uniform4f(e.uC1,g[0],g[1],g[2],Dt),t.uniform4f(e.uC2,O[0],O[1],O[2],1/ct),t.uniform4f(e.uC3,E[0],E[1],E[2],Ee%4096),t.uniform4f(e.uS2,v[0],v[1],v[2],v[3]),t.uniform4f(e.uG0,It[0],It[1],It[2],1.5*(1+.9*i)*Nt/rt*Ue),t.uniform4f(e.uG1,Ut[0],Ut[1],Ut[2],B),t.uniform4f(e.uL0,ot[0],ot[1],ot[2],L),t.uniform4f(e.uL3,Ct[0],Ct[1],i,Math.acos(Math.sqrt(1/(Rt-1.2*i))));const o=gt+Le,r=gt+Math.PI+Me;t.uniform4f(e.uR,Math.cos(o),Math.sin(o),Math.cos(r),Math.sin(r)),t.uniform4f(e.uV,h?0:Qe*rt,ze,.05+.025*B,0)},ao=()=>{const e=n.veil;t.useProgram(e.p),ut(be),t.disable(t.BLEND),R(3,n.noise),t.uniform1i(e.uN,3),Se(e),L===2&&t.uniform4f(e.uL3,0,0,i,Math.acos(Math.sqrt(1/(Rt-1.2*i)))),t.drawArrays(t.TRIANGLES,0,3)},so=()=>{const e=$e;t.useProgram(e.p),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,ct,ct),t.disable(t.BLEND),R(0,wt.t),R(1,Ot.t),R(2,ge.t),R(3,n.noise),R(4,be.t),t.uniform1i(e.uE,0),t.uniform1i(e.uB1,1),t.uniform1i(e.uB2,2),t.uniform1i(e.uN,3),t.uniform1i(e.uVt,4),Se(e),t.uniform4f(e.uH,.055*(.5+.5*B)*(1+.5*i)*rt,(L===1?.2:.075)*rt,.13+.1*B,Ve),t.uniform4f(e.uL1,kt[0],kt[1],kt[2],Ie),t.uniform4f(e.uL2,_[0],_[1],_[2],Nt);const o=uo();t.uniform4f(e.uT0,o[0],o[1],o[2],o[3]),t.uniform4f(e.uT1,o[4],o[5],o[6],o[7]*rt),t.uniform4f(e.uT2,o[8],o[9],o[10],o[11]),t.uniform4f(e.uJ,2*x,-1.4,3.5,1.8),L===2&&(t.uniform4f(e.uT0,Math.cos(Wt),Math.sin(Wt),Math.cos(Kt),Math.sin(Kt)),t.uniform4f(e.uT1,.5+.15*Math.sin(F*.11),.5+.15*Math.sin(F*.07+1),0,0)),t.drawArrays(t.TRIANGLES,0,3)},Re=(e,o)=>{we(),ro(Math.exp(-e*it/oe));const r=e<=2?1:Math.ceil(e/2);for(let u=0;u<r;u++)Te(e*it/r),oo(eo*e/r);o&&(no(),h||ao(),so(),Ee++)};we();for(let e=0;e<90;e++)Te(it);Re(36,!0);const at=s.sound;let k=null,st=!1,P=!1,Yt=0,$t=0,Zt=0,Qt=0,_t=0;return(e,o)=>{const r=s.input,u=r.taps();o=Math.min(Math.max(o,0),.25);let a=!1;r.down&&r.inside?(k||(k={x:r.x,y:r.y,t:e},st=!1,P=!1,Yt=r.x,$t=r.y),!P&&Math.hypot(r.x-k.x,r.y-k.y)>.02&&(st=!0),!st&&!P&&e-k.t>.35&&(P=!0),st&&(fe+=(r.x-Yt)*4.2,Xt=Math.max(We,Math.min(Ke,Xt+(r.y-$t)*3.2)),Yt=r.x,$t=r.y)):k&&(!st&&!P&&(a=!0),k=null,st=!1,P=!1),!k&&u.length&&(a=!0),a&&(i=Math.min(1.2,i+.9),at.hit("noise",.45,{cutoff:5200,dur:.22}),at.hit("click",.5),at.note(55,{wave:"sawtooth",dur:.9,vel:.12,cutoff:900})),i*=Math.exp(-o/1.1),B+=((P?4:se)-B)*Math.min(1,o*(P?.9:.35)),P&&(Qt-=o,Qt<=0&&(Qt=.3,at.hit("noise",.12,{cutoff:700+300*B,dur:.45}))),U+=(Xt-U)*Math.min(1,o*6),et+=(fe-et)*Math.min(1,o*6),de(),to(o),_t+=o,m()<o*.7&&(jt+=(m()-.4)*.12,m()<.5&&at.hit("click",.12+m()*.15)),jt*=Math.exp(-o/.25),Nt=1+.04*Math.sin(_t*2.3+1)+.025*Math.sin(_t*5.1+2*Math.sin(_t*.7))+jt,Zt-=o,Zt<=0&&(Zt=1.9,at.note(31,{dur:2.2,vel:.06+.05*i,wave:"sawtooth",cutoff:180+200*i}));const l=Math.max(1,Math.min(8,Math.round(o/it)));Re(l,!0)}}})})()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
