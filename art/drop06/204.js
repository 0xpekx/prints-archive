// Gold Crystals: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/204.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Xe){Xe&&function(){"use strict";const E=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
`,z=`layout(std140) uniform B{vec4 U[20];};
#define uT U[0].x
#define uDt U[0].y
#define uFlame U[0].z
#define uTb U[0].w
#define uOm U[1].x
#define uPh U[1].y
#define uX U[1].z
#define uBed U[1].w
#define uPtr U[2]
#define uC U[3].xy
#define uRr U[3].z
#define uLvl U[3].w
#define uL U[4].xyz
#define uBW U[4].w
#define uBO U[5].xyz
#define uFoc U[5].w
#define uGold U[6].rgb
#define uFilm U[6].w
#define uTilt U[7].x
#define uDip U[7].y
#define uInit U[7].z
#define uTop U[7].w
#define uA0 U[8].x
#define uFall U[8].y
#define uVL U[8].z
#define uSeed U[8].w
#define uFlW U[9].x
#define uFlX U[9].y
#define uQs U[9].z
#define uQc U[9].w
#define uPx U[10].x
#define uFB U[10].y
#define uGlow U[10].z
#define uHz U[10].w
#define uFlC U[11].rgb
#define uFlM U[11].w
#define uWall U[12].x
#define uWallB U[12].y
#define uGz U[12].z
#define uFine U[12].w
#define uCam U[14].xyz
#define uTan U[14].w
#define uRt U[15].xyz
#define uTh U[15].w
#define uUp U[16].xyz
#define uYf U[16].w
#define uFw U[17].xyz
#define uFd U[17].w
#define uAp U[18].x
#define uIt U[18].y
#define uMode U[18].z
#define uZb U[18].w
#define uWd U[19].xyz
#define uWinL U[19].w
`,ee="uniform sampler2D tProf;float prof(float y){return textureLod(tProf,vec2(.5,(y+1.05)/2.7),0.).r;}",ne="vec3 enc(vec3 c){return sqrt(c/(1.+c));}vec3 dec(vec3 e){vec3 x=e*e;return x/max(1.-x,.004);}",We="float xeq(float T){return clamp(1.-(exp(4.*T)-1.8221)/(13.4637-1.8221),0.,1.);}",we=`float beam(vec3 p){vec3 d=p-uBO;float al=dot(d,-uL);vec3 pp=d+uL*al;float t=clamp(al*.5+.5,0.,1.),k=1.-.58*t;
float r=length(pp)/(uBW*k);return (smoothstep(1.,.86,r)*.95+.05*exp(-r*r*.55))/(k*k)*.8;}`,je=`float veil(vec3 P){float y=P.y+uT*.034;
vec4 a=textureLod(tN,vec2(P.x*.045+P.z*.012+uSeed*.31,y*.011+P.x*.004),0.),b=textureLod(tN,vec2(P.x*.11-P.z*.03+.43,y*.03+.61),0.);
float v=smoothstep(.36,.66,a.r*.62+b.g*.38);return mix(1.,.16+1.3*v,1.-smoothstep(.6,2.4,abs(uOm)));}`,U=E+"out vec2 v;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);v=p;gl_Position=vec4(p*2.-1.,0.,1.);}",ut=E+z+ee+We+`in vec2 v;out vec4 o;uniform sampler2D tS,tN;
const float h=2./64.;const int M=63;
vec4 bl(vec2 uv){vec2 g=uv*64.-.5,f=g-floor(g);ivec2 i=ivec2(floor(g));
vec4 a=texelFetch(tS,clamp(i,ivec2(0),ivec2(M)),0),b=texelFetch(tS,clamp(i+ivec2(1,0),ivec2(0),ivec2(M)),0),
c=texelFetch(tS,clamp(i+ivec2(0,1),ivec2(0),ivec2(M)),0),d=texelFetch(tS,clamp(i+ivec2(1,1),ivec2(0),ivec2(M)),0);
return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
void main(){ivec2 ij=ivec2(gl_FragCoord.xy);vec2 p=v*2.-1.;
float r=prof(p.y),m=step(abs(p.x),r)*step(p.y,uLvl);
vec4 s=texelFetch(tS,ij,0),E=texelFetch(tS,min(ij+ivec2(1,0),ivec2(M)),0),W=texelFetch(tS,max(ij-ivec2(1,0),ivec2(0)),0),
Nn=texelFetch(tS,min(ij+ivec2(0,1),ivec2(M)),0),So=texelFetch(tS,max(ij-ivec2(0,1),ivec2(0)),0);
vec4 q;
if(uInit>.5){vec4 n=textureLod(tN,p*.012+uSeed,0.);q=vec4((n.r-.5)*10.,0.,-.05+(n.g-.5)*.2,uX*(.7+.6*n.b));}
else{
vec2 vel=vec2(Nn.g-So.g,-(E.g-W.g))/(2.*h);
q=bl(v-uDt*vel*.5);
float wd=max(r-abs(p.x),0.),sd=max(uLvl-p.y,0.),by=p.y+sqrt(max(1.-p.x*p.x,0.))*.98;
vec4 nz=textureLod(tN,p*.05+vec2(uT*.013,-uT*.021)+uSeed,0.);
// temperature: burner patch under the base, walls and surface shed heat in proportion to how hot the flask is
vec4 nw=textureLod(tN,vec2(uT*.0037,uT*.0021)+uSeed,0.);
float xf=abs(p.x+(nw.r-.5)*.36)-uFlX;
float heat=uFlame*2.6*exp(-xf*xf/(uFlW*uFlW))*exp(-max(by,0.)/.11);
float cool=max(uTb-.1,0.)*(uQc*exp(-wd/.09)+uQs*exp(-sd/.07)*(.5+nz.r));
float th=q.b+uDt*(heat-cool-q.b*.42);
th+=uDt*.14*(s.b*-4.+E.b+W.b+Nn.b+So.b);
th=clamp(th,-1.,1.6);
// vorticity: buoyancy, the spin's bottom layer (slow liquid near the floor can't hold the pressure, so it flows inward)
float d=max(by,0.),e=exp(-d/.16),Oy=uOm*(1.-e);
float w=q.r+uDt*(1.5*(E.b-W.b)/(2.*h)-p.x*2.*Oy*uOm*e/.16*.8);
vec4 nt=textureLod(tN,p*.035+vec2(uT*.041,-uT*.067)+uSeed*.7,0.);
w+=uDt*(nt.g-.5)*(1.5+70.*min(abs(th),.5));
w+=uDt*.03/(h*h)*.05*(E.r+W.r+Nn.r+So.r-4.*s.r);
w*=exp(-uDt*.22);
w=clamp(w,-30.,30.);
// the finger: a velocity kick written straight into both fields so it answers at once
vec2 dp=p-uPtr.xy;float s2=.075,gg=exp(-dot(dp,dp)/s2),L=uPtr.z*dp.y-uPtr.w*dp.x;
float psi=q.g*0.+s.g+L*gg;
w-=L*gg*(4.*dot(dp,dp)/(s2*s2)-8./s2);
// haze: fine crystal grows where it's cold enough, melts where it isn't, and sinks
float tgt=xeq(uTb+th*.34);
float c=mix(q.a,Nn.a,clamp(uDt*.035/h,0.,1.));
c+=uDt*(tgt>c?.3:2.2)*(tgt-c);
q=vec4(w,psi,th,c);}
o=q*m;}`,xt=E+z+ee+`in vec2 v;out vec4 o;uniform sampler2D tS;uniform float uRB;
const int M=63;const float h=2./64.;
void main(){ivec2 ij=ivec2(gl_FragCoord.xy);vec2 p=v*2.-1.;
vec4 s=texelFetch(tS,ij,0);
float m=step(abs(p.x),prof(p.y))*step(p.y,uLvl);
if(mod(float(ij.x+ij.y)+uRB,2.)<.5){
float E=texelFetch(tS,min(ij+ivec2(1,0),ivec2(M)),0).g,W=texelFetch(tS,max(ij-ivec2(1,0),ivec2(0)),0).g,
Nn=texelFetch(tS,min(ij+ivec2(0,1),ivec2(M)),0).g,So=texelFetch(tS,max(ij-ivec2(0,1),ivec2(0)),0).g;
s.g=mix(s.g,.25*(E+W+Nn+So+h*h*s.r),1.82);}
s.g*=m;o=s;}`,ht=E+z+`in vec2 v;out vec4 o;uniform sampler2D tS;const int M=63;const float h=2./64.;
void main(){ivec2 ij=ivec2(gl_FragCoord.xy);
vec4 s=texelFetch(tS,ij,0),E=texelFetch(tS,min(ij+ivec2(1,0),ivec2(M)),0),W=texelFetch(tS,max(ij-ivec2(1,0),ivec2(0)),0),
Nn=texelFetch(tS,min(ij+ivec2(0,1),ivec2(M)),0),So=texelFetch(tS,max(ij-ivec2(0,1),ivec2(0)),0);
vec2 vel=vec2(Nn.g-So.g,-(E.g-W.g))/(2.*h);
float sp=length(vel);vec2 dir=vel/max(sp,.01);
float a=dot(dir,normalize(uL.xy+vec2(.001)));
float sheen=(1.-a*a)*min(abs(s.r)*.16,1.2);
o=vec4(vel,s.a*(1.+1.6*sheen),s.b);}`,He=`vec4 rnd(ivec2 ij,int k){uvec4 v=uvec4(uint(ij.x),uint(ij.y),uint(k),uint(uSeed*65536.));v=v*1664525u+1013904223u;
v.x+=v.y*v.w;v.y+=v.z*v.x;v.z+=v.x*v.y;v.w+=v.y*v.z;v^=v>>16u;v.x+=v.y*v.w;v.y+=v.z*v.x;v.z+=v.x*v.y;v.w+=v.y*v.z;
return vec4(v)/4294967296.;}
float amax(vec4 r){float x2=r.x*r.x,x6=x2*x2*x2,x24=x6*x6;x24*=x24;x24*=x6*x6*x2;float a=uA0*(.26+.5*r.x+.45*x6+1.1*x24);return r.y<uFine?a*.45:a;}`,pt=E+z+ee+We+He+`in vec2 v;out vec4 o;uniform sampler2D tA,tD;
vec3 spawn(vec4 q,float wall){float y=mix(-.92,uLvl-.03,1.-pow(q.x,mix(1.,3.2,uTop)));
float r=max(prof(y)-.03,.02)*mix(sqrt(q.y),.8+.19*q.y,wall),an=q.z*6.2832;return vec3(r*cos(an),y,r*sin(an));}
void main(){ivec2 ij=ivec2(gl_FragCoord.xy);
vec4 R1=rnd(ij,0),R2=rnd(ij,1);vec4 s=texelFetch(tA,ij,0);float am=amax(R1);vec4 res;
float wallB=step(.5,R2.w)*(1.-uTop);
if(uInit>.5){vec4 R3=rnd(ij,2);
float f=R1.z,gs=pow(uX,.33);
if(f<uBed*.75){float r=.84*sqrt(R3.y),an=R3.z*6.2832,wl=max(-.955,-sqrt(max(1.-r*r,0.))+.018);
float hgt=-.972+uBed*.82*(1.-.82*r*r);float y=max(mix(wl,hgt,pow(R3.x,.42)),wl);
res=vec4(r*cos(an),y,r*sin(an),-am*gs);}
else if(f<.93){vec3 P=spawn(vec4(pow(R3.x,mix(1.,.45,uTop)),R3.y,R3.z,0.),wallB*.3);res=vec4(P,am*gs*(.5+.5*R3.w));}
else res=vec4(0.,0.,0.,0.);}
else{
vec3 P=s.xyz;float sa=s.w,a=abs(sa);bool rest=sa<0.;
float dt=uDt;
float ry=max(prof(P.y),.04),rz=sqrt(max(ry*ry-P.z*P.z,.0016))/ry;
vec2 q=vec2(clamp(P.x/max(rz,.3),-1.,1.),P.y);
vec4 d=textureLod(tD,q*.5+.5,0.);
float xl=xeq(uTb+d.a*.34);
float nuc=mix(.02,.92,R1.w);
if(a<=0.){
if(xl>nuc){vec4 R4=rnd(ij,3+int(uT*3.));P=spawn(R4,wallB);a=am*.1;rest=false;}
}else{
float tg=xl<nuc*.8?0.:am*pow(xl,.33);
a+=dt*(tg>a?.9:3.4)*(tg-a);
if(a<am*.06&&tg<a){a=0.;rest=false;}
}
if(a>0.){
float k=min(a/uA0,2.);
if(rest){float sp=length(d.xy)+abs(uOm)*length(P.xz)*.35;
if(sp>.16+.55*R2.z)rest=false;
if(rnd(ij,7+int(mod(uT*30.,4093.))).x<dt*.045){a=0.;rest=false;}
}else{
float ph=uPh*(1.+2.2*R2.x)+6.2832*R2.y;
float vs=uFall*(.25+.9*k)*(.72+.42*sin(ph*2.));
vec3 vv=vec3(d.x*rz,d.y-vs,0.);
vv.xz+=vec2(cos(ph),sin(ph*.83+1.))*vs*.55;
vv.z+=.022*sin(uT*.31+R2.z*40.)+d.y*.1*cos(R2.y*40.);
P+=vv*dt;
float e=exp(-max(P.y+.97,0.)/.16),ang=uOm*(1.-e)*dt,ca=cos(ang),sa2=sin(ang);
P.xz=vec2(ca*P.x+sa2*P.z,-sa2*P.x+ca*P.z);
float ys=uLvl-.015;if(P.y>ys)P.y=ys;
float rm=max(prof(P.y)-.018,.01),rr=length(P.xz);if(rr>rm)P.xz*=rm/rr;
float top=-.972+uBed*.82*(1.-.82*dot(P.xz,P.xz))*(.55+.45*R2.z);
if(P.y<top&&uFB<.5){P.y=max(P.y,-.975);rest=true;}
if(P.y<-.975)P.y=-.975;
}}
res=vec4(P,rest?-a:a);}
o=res;}`,bt=E+z+ee+He+`uniform float uGP;uniform sampler2D tA,tM,tN;out vec3 vC;out vec2 vQ;out vec2 vS;flat out vec2 vD;flat out float vR;out vec2 vU;flat out vec3 vK;flat out vec4 vG;
void main(){vR=0.;vU=vec2(.5);ivec2 ij=ivec2(gl_InstanceID%256,gl_InstanceID/256);
vec4 s=texelFetch(tA,ij,0);float a=abs(s.w);bool rest=s.w<0.;
vec4 R1=rnd(ij,0),R2=rnd(ij,1),R5=rnd(ij,4);
vec3 P=s.xyz;
if(uFB>.5){P.y=mod(P.y-uT*.05*(R1.x+.3)+.95,uLvl+.95)-.95;a*=pow(uX,.33);}
vec2 q=vec2(float(gl_VertexID&1)*2.-1.,float(gl_VertexID>>1)*2.-1.);
gl_Position=vec4(2.,2.,2.,1.);vC=vec3(0.);vQ=q;vS=vec2(1.);vD=vec2(0.);vK=vec3(0.);vG=vec4(0.);
if(a>1e-4){
float ph=uPh*(.55+1.2*R2.x)+6.2832*R2.y;
float tumb=step(R5.x,.82);
float a1=mix(sin(ph)*(.35+.9*R5.y)+.2*(R5.z-.5),ph+R5.z*6.28,tumb),a2=R5.w*6.2832+ph*.37;
vec3 n=vec3(sin(a1)*cos(a2),cos(a1),sin(a1)*sin(a2));
if(rest){vec2 j=(R5.yz-.5)*4.2;vec2 ra=P.xz/max(length(P.xz),.05);float nw=smoothstep(.5,.95,length(P)/.98);n=normalize(vec3(j.x+ra.x*nw*1.6,1.,j.y+ra.y*nw*1.6));}
vec3 t1=normalize(cross(n,abs(n.y)<.9?vec3(0.,1.,0.):vec3(1.,0.,0.))),t2=cross(n,t1);
vec3 O=vec3(0.,P.y*(1.-uVL),0.);float rr=mix(max(prof(P.y),.03),1.,uVL);
vec3 cc=(uCam-O)/rr,pr=(P-O)/rr;float Dd=length(cc);vec3 ez=cc/Dd;float ze=dot(pr,ez);vec3 lat=pr-ez*ze;float rho=length(lat);vec3 el=lat/max(rho,1e-4);
float b=min(rho,.99),dl=0.;
for(int i=0;i<3;i++){float cb=sqrt(1.-b*b),th=asin(b),ai=th+atan(b,Dd-cb),rf=asin(min(sin(ai)*.75,.999));dl=th-rf;b=clamp(rho+(cb-ze)*tan(dl),0.,.995);}
vec3 S=O+rr*(el*b+ez*sqrt(1.-b*b));
vec3 V=normalize(ez*cos(dl)+el*sin(dl));
vec3 wv=S-uCam;float zd=dot(wv,uFw),sc=.5/(zd*uTan);
vec2 ap=.5+vec2(dot(wv,uRt),dot(wv,uUp))*sc;
float m=clamp(.5*(1.+b/max(rho,.02)),1.,1.7);
float vis=textureLod(tM,ap,0.).a;
vec3 H=normalize(uL+V);
float nh=abs(dot(n,H)),pw=mix(48.,300.,R5.y);
float spec=exp(-(1.-nh)*pw),sheen=exp(-(1.-nh)*42.);
float lb=beam(P),dif=abs(dot(n,uL));
vec3 Hw=normalize(uWd+V);float win=exp(-(1.-abs(dot(n,Hw)))*150.);
float thick=R5.z+R5.w*.3;
vec3 film=.5+.5*cos(6.2832*(thick*2.2+nh*1.1+vec3(0.,.33,.6)));
vec3 gold=mix(uGold,uGold*(.25+1.5*film),uFilm);
float att=exp(-length(P-S)*.22);
float fl=uFlame*exp(-max(P.y+.95,0.)*2.2);
vec3 gl2=mix(gold,vec3(1.,.86,.38),.35);float vl=rest?1.:veil(P);vec3 col=(gold*lb*(.06+.13*dif*dif+.22*sheen)*att+gl2*(.012+.022*dif+fl*.5)*att)*vl;
if(rest)col=gold*(.55+1.1*R5.w*R5.w)*(lb*(.11+.34*dif+.6*sheen)+.17+.2*dif+.2*sheen+fl*.6)*att+vec3(.8,.78,.7)*gold*win*uWinL*.05*att;
float sg=dot(n,H)<0.?-1.:1.;vec2 dl0=vec2(dot(H,t1),dot(H,t2))*sg;float kp=sqrt(pw*.5);vec3 kc=(gold*.93+vec3(.07,.06,.04))*(rest?lb*3.+.5:lb*5.)*att*vl+(gold*.93+vec3(.07,.06,.04))*fl*1.2*att*vl;
col+=vec3(.75,.8,.82)*gold*win*uWinL*.012*att;
col*=vis;kc*=vis;
float Zp=dot(P-uCam,uFw);
float coc=min(uAp*abs(Zp-uFd)/Zp,.021);
float pr2=.75*uPx;
vec2 e1=vec2(dot(t1,uRt),dot(t1,uUp))*a*m*sc,e2=vec2(dot(t2,uRt),dot(t2,uUp))*a*m*sc*(.68+.5*R1.x);
float ar=abs(e1.x*e2.y-e1.y*e2.x)+a*a*sc*sc*.05,ex=coc+pr2,big=length(e1)+length(e2)+1e-5;
float en=ar/(ar+ex*ex*1.3+ex*big*.9);
col*=pow(en,.46);kc*=pow(en,.3);
if(uGP<.5){
float bend=.09+.14*R5.x,kf=kp*mix(.38,.8,smoothstep(.007,.026,a));vG=vec4(dl0*kf,bend*kf,0.);vK=kc;
if(dot(col,vec3(.33))+dot(kc,vec3(.33))*.02>.00035){
vec2 sp=ap+e1*q.x+e2*q.y+q*ex;
vQ=q;vS=vec2(clamp(ex/(ex+big*.5),.06,1.),rest?min(en*1.2,.55)*mix(.4,1.,smoothstep(-.55,.15,P.z))*vis:min(en,.75)*.16);vU=sp;vD=(R5.xy-.5)*3.2;vC=col;vR=rest?1.:0.;
gl_Position=vec4(sp*2.-1.,0.,1.);}
}else{
float f=spec*(lb*1.7+fl*.3)*pow(en,.3)*vis*vl*smoothstep(1.9,1.1,big/uPx);
if(f>.32){f=min(f,1.3);float rad=(.0045+.007*f)*(1.+R5.z*.3);vec2 sp=ap+q*rad;vQ=q;vS=vec2(0.,0.);vU=sp;vD=vec2(cos(R5.w*.4+.5),sin(R5.w*.4+.5));vC=(gold*.85+.15)*f*f*.13;gl_Position=vec4(sp*2.-1.,0.,1.);}
}
}}`,wt=E+z+`in vec3 vC;in vec2 vQ;in vec2 vS;flat in vec2 vD;flat in float vR;in vec2 vU;flat in vec3 vK;flat in vec4 vG;out vec4 o;uniform sampler2D tM;
void main(){
if(vS.x<.01){float r2=dot(vQ,vQ);vec2 sr=vec2(dot(vQ,vD),dot(vQ,vec2(-vD.y,vD.x)));
float st=exp(-abs(sr.x)*7.-sr.y*sr.y*900.)+exp(-abs(sr.y)*7.-sr.x*sr.x*900.);
float g=exp(-r2*90.)+exp(-r2*22.)*.12+st*.1;g*=smoothstep(1.,.6,r2);o=vec4(vC*g,0.);}
else{
vec2 p=abs(vQ);float d=max(p.x*.866+p.y*.5,p.y);d=max(d,dot(vQ,vD)*.62-.12);
if(uA0>.016){vec2 e=vec2(-vD.y,vD.x);d=max(d,max(dot(vQ,e)*.75+.18*vD.x,-dot(vQ,vD)*.5+.05*vD.y+.35*abs(dot(vQ,e))));}float w=max(vS.x,.1);
float m=1.-smoothstep(1.-w,1.,d*(1.+w*.15));
float sh=1.-smoothstep(.2,.7,w);
float ta=dot(vQ,vD);
float ter=.82+.26*step(.5,fract(ta*1.1+vD.x*3.));
float rim=smoothstep(.74,.96,d);
float wm=texture(tM,vU).a;m*=wm;
vec2 gq=vG.xy-vG.z*vQ;float gl=exp(-dot(gq,gq));
o=vec4((vC*max(1.+.42*ta*(1.-.6*vR),.55)*mix(1.,ter*mix(.9+.36*rim,1.08-.6*rim,vR),sh)+vK*gl)*m,vS.y*m);}}`,Ve=`float nz(vec2 p){return textureLod(tN,p,0.).r;}
float fbm(vec2 p){return nz(p)*.5+nz(p*2.03+.3)*.3+nz(p*4.1+.6)*.2;}
float soft(float d,float w){return smoothstep(w,-w,d);}
float box(vec2 p,vec2 c,vec2 h){vec2 q=abs(p-c)-h;return length(max(q,0.))+min(max(q.x,q.y),0.);}
float ln(float u,float p,float w,float fw){float f=abs(fract(u/p)-.5)*p,a=smoothstep(w*.5+fw,w*.5-fw,.5*p-f);return mix(a,w/p,smoothstep(.25,.9,fw/p));}
`,yt=E+z+ne+`in vec2 v;out vec4 o;uniform sampler2D tN;
`+Ve+`// the lab behind, in frame units on a far plane: everything here is already out of focus
vec3 backdrop(vec2 f){
float w=uWall,sd=uSeed;
float dw=length((f-vec2(-1.15,1.3))*vec2(.6,.78));
vec3 c=mix(vec3(.0048,.0062,.0078),vec3(.03,.038,.048),exp(-dw*dw*.9));
c*=.7+.6*fbm(f*.03+sd*.17);
if(w<.5)c*=.42;else if(w>1.5&&w<2.5)c*=vec3(.72,.82,1.)*.7;
c+=vec3(.071,.035,.01)*exp(-dot(f-vec2(1.,-.45),f-vec2(1.,-.45))*.9)*step(.5,w);
if(w>.5){
bool nw=w>2.5;
vec2 wc=nw?vec2(-.4,.72):vec2(-.72,1.06),wh=nw?vec2(.86,.74):vec2(.27,.56);
float a=soft(box(f,wc,wh),.07);
vec2 u=(f-wc)/wh;
float mu=smoothstep(.015,.17,abs(u.x))*smoothstep(.015,.15,abs(u.y+.14));
vec3 sky=nw?vec3(.006,.012,.03)*(.8+.5*u.y):vec3(.1,.15,.22)*(.55+.45*smoothstep(-1.,1.,u.y));
c=mix(c,sky*mix(.22,1.,mu),a);
if(nw)for(int i=0;i<int(uIt*.06+.5);i++){vec4 h=texelFetch(tN,ivec2(i*23+int(sd*200.),41),0);vec2 pc=wc+(h.xy-.5)*wh*1.9;float rr=.022+.035*h.z;
c+=mix(vec3(.09,.05,.018),vec3(.03,.05,.09),h.w)*soft(length(f-pc)-rr,.012)*a*mu*(.3+h.w);}
}
if(w>.5&&w<2.5){
float ys=.08;
c*=1.-.62*soft(ys-.02-f.y,-.22)*smoothstep(-.32,ys,f.y)*step(f.y,ys);
for(int i=0;i<int(uIt*.06+.5);i++){vec4 h=texelFetch(tN,ivec2(i*31+int(sd*97.),113),0);
float x=-2.15+float(i)*.27+(h.x-.5)*.14,bw=.038+.05*h.y,bh=.09+.13*h.z;
float dd=min(box(f,vec2(x,ys+.02+bh),vec2(bw,bh))-.016,box(f,vec2(x,ys+.02+bh*2.+.03),vec2(bw*.42,.045)));
float a=soft(dd,.024);
vec3 tint=h.w<.5?vec3(.011,.012,.013):h.w<.8?vec3(.012,.015,.018):vec3(.0035,.0065,.026);
float prox=exp(-dot(f-vec2(-.72,.5),f-vec2(-.72,.5))*.8);
float streak=exp(-pow((f.x-x+bw*.45)/(bw*.26),2.))*smoothstep(ys,ys+bh,f.y)*(.3+.7*prox);
c=mix(c,tint*(.45+.9*prox)+vec3(.05,.058,.066)*streak,a*.92);}
float bd=abs(f.y-ys)-.016;c=mix(c,vec3(.012,.0105,.009)+vec3(.018,.02,.022)*exp(-dot(f-vec2(-.72,ys),f-vec2(-.72,ys))*1.6),soft(bd,.017));
}
float yb=-.6;
vec3 be=vec3(.0042,.004,.0038)*(.7+.7*fbm(f*vec2(.025,.2)+.4));
be+=vec3(.03,.034,.038)*exp(-pow((f.y-yb)/.055,2.))*exp(-dot(f-vec2(-.8,yb),f-vec2(-.8,yb))*.6)*step(.5,w);
be+=vec3(.012,.014,.017)*exp(-pow((f.y-yb+.34)/.22,2.))*exp(-pow((f.x+.72)/.42,2.))*step(.5,w);
c=mix(c,be,soft(f.y-yb,.022));
// a stand behind the flask and glassware on the bench, each softer the closer it is to the lens
if(w>.25){
vec2 rd=vec2(-.5,-.2);
float rod=abs(f.x-rd.x)-.017,rm=soft(max(rod,max(yb-.02-f.y,f.y-1.3)),.024);
c=mix(c,vec3(.0035,.0035,.0038)+vec3(.05,.056,.064)*exp(-pow((f.x-rd.x+.012)/.012,2.))*smoothstep(-.2,.7,f.y),rm);
float arm=max(abs(f.y-.66)-.012,max(rd.x-f.x,f.x-.2));c=mix(c,vec3(.004)+vec3(.022,.025,.03)*exp(-pow((f.y-.668)/.008,2.))*smoothstep(.2,-.45,f.x),soft(arm,.018));
c=mix(c,vec3(.0035),soft(box(f,vec2(rd.x,yb-.0),vec2(.19,.022))-.01,.022));
for(int i=0;i<int(uIt*.0267+.5);i++){vec4 h=texelFetch(tN,ivec2(i*53+int(sd*61.),201),0);float x=-1.08+float(i)*.28+(h.x-.5)*.12,bw=.045+.05*h.y,bh=.1+.2*h.z;
vec2 pc=vec2(x,yb+.0+bh);float dd=box(f,pc,vec2(bw,bh));float a=soft(dd,.02);
float ed=exp(-pow((abs(f.x-x)-bw*.9)/(bw*.24),2.));
float lq=soft(f.y-(yb+bh*(.5+.9*h.w)),.014);
vec3 g=vec3(.0035,.0042,.0048)+vec3(.05,.06,.066)*ed*(.3+.7*smoothstep(yb,yb+2.*bh,f.y))+lq*(h.w<.5?vec3(.006,.0065,.007):vec3(.003,.009,.014));
c=mix(c,g,a*.88);}
}
for(int i=0;i<int(uIt*.0467+.5);i++){vec4 h=texelFetch(tN,ivec2(i*17+int(sd*151.),7),0);vec2 pc=vec2(-2.1+1.9*h.x,h.y<.55?.16+.3*h.z:-.5+.16*h.z);float rr=.022+.03*h.z;
float dk=length(f-pc)-rr;float ring=soft(dk,.007)*(.72+.28*smoothstep(rr*.55,rr,length(f-pc)));
c+=mix(vec3(.022,.024,.028),vec3(.018,.028,.042),h.w)*ring*step(.5,w)*(.12+.4*h.w*h.w);}
return c*vec3(.22,.27,.38);}
void main(){vec2 f=(v*2.-1.)*2.4;o=vec4(enc(backdrop(f)*16.)+(texelFetch(tN,ivec2(gl_FragCoord.xy)&255,0).b-.5)*.004,1.);}`,Qe=E+z+ne+we+`in vec2 v;out vec4 o;uniform sampler2D tProf,tN;
`+Ve+`uniform sampler2D tBk;
float g_l=1.;
// what the skin of the glass mirrors: one window behind the camera, the lamp, a dim ceiling
vec3 envR(vec3 p,vec3 d){
vec3 c=mix(vec3(.0007,.0008,.0011),vec3(.0026,.0032,.0048),smoothstep(-.5,.9,d.y));
c+=vec3(.012,.0105,.008)*smoothstep(.4,1.,dot(d,normalize(uL+vec3(0.,.2,0.))));
float dn=dot(d,uWd);
if(dn>.2){vec3 ax=normalize(cross(vec3(0.,1.,0.),uWd)),ay=cross(uWd,ax);float t=7./dn;vec3 h=p+d*t;vec2 u=vec2(dot(h,ax),dot(h,ay))/vec2(.86,1.3);u.x+=.16*u.y*u.y-.08;
float a=smoothstep(1.,.62,pow(abs(u.x),2.4)+pow(abs(u.y*(1.+.18*u.x)),2.4));
float mu=1.;
float sky=.5+.5*smoothstep(-1.,1.,u.y)-.3*smoothstep(-.3,-.75,u.y);
vec3 wc=uWall>2.5?vec3(.16,.26,.62)*(.25+.3*smoothstep(-1.,1.,u.y))+vec3(1.,.62,.25)*1.5*(exp(-dot(u-vec2(-.26,-.62),u-vec2(-.26,-.62))*900.)+exp(-dot(u-vec2(.68,-.7),u-vec2(.68,-.7))*1400.)):vec3(.032,.046,.075)*sky;
c+=wc*uWinL*a*mu;}
float l=dot(d,uL);
c+=g_l*vec3(1.,.87,.68)*(exp((l-1.)/.00022)*3.2+exp((l-1.)/.006)*.08);
return c;}
// the near things on the bench: gauze with a ceramic heart on an iron tripod, the burner, then the far lab
float g_z=-1.;
vec3 scene(vec3 o,vec3 d,float fw,bool prim){
float dF=dot(d,uFw);
vec3 c;
if(dF>.03){float t=(uZb-dot(o-uCam,uFw))/dF;vec3 h=o+d*t-uCam;c=dec(textureLod(tBk,vec2(dot(h,uRt),dot(h,uUp))/(uZb*uTan)/4.8+.5,0.).rgb)/16.;}
else c=mix(vec3(.0007,.0008,.0011),vec3(.0022,.003,.0045),smoothstep(-.4,.9,d.y));
vec3 lamp=vec3(1.,.87,.68);
// burner barrel and legs: closest approach of the ray to each iron bar
for(int i=0;i<int(uIt*.0267+.5);i++){
vec3 a0,e;float wd;
if(i==3){a0=vec3(0.,-3.,0.);e=vec3(0.,1.615,0.);wd=.11;}
else{float an=.55+float(i)*2.094;vec3 u=vec3(cos(an),0.,sin(an));a0=u*1.12+vec3(0.,-1.01,0.);e=u*.75+vec3(0.,-3.6,0.);wd=.042;}
vec3 w0=o-a0;float A=dot(d,e),B=dot(e,e),C=dot(d,w0),De=dot(e,w0),dn=B-A*A;
float sc=clamp((B*0.+ (De-A*C))/max(dn,1e-4),0.,1.);float tc=max(dot(a0+e*sc-o,d),0.);
vec3 pa=o+d*tc-(a0+e*sc);float dd=length(pa);
float cc=uAp*abs(dot(o+d*tc-uCam,uFw)-uFd)/max(dot(o+d*tc-uCam,uFw),.5);
float wf=max(fw*tc,cc*uZb*.25*uTan);
float m=soft(dd-wd,wf+.002);
vec3 nb=pa/max(dd,1e-4);
float sh=(.25+.9*max(dot(nb,uL),0.));
vec3 ir=(i==3?vec3(.05,.031,.012):vec3(.006,.0058,.0058))*sh*(.6+.8*fbm(vec2(sc*.6,tc*.04+float(i)*.1)))+lamp*.05*pow(max(dot(nb,normalize(uL-d)),0.),30.)*(i==3?2.:1.);
c=mix(c,ir,m);}
if(d.y<-.001){float t=(-.982-o.y)/d.y;
if(t>0.){vec3 h=o+d*t;vec2 x=mat2(.956,.292,-.292,.956)*h.xz;
float ez=fw*t/max(-d.y,.12),ex=fw*t;
float cp=uAp*abs(dot(h-uCam,uFw)-uFd)/max(dot(h-uCam,uFw),.5)*uZb*.25*uTan*.0;
vec2 ab=abs(x);float q=max(ab.x,ab.y);
vec2 fray=x;
float mk=smoothstep(1.26+ez,1.26-ez,q);
if(mk>0.){
float wire=.0058,pt=.028;
float lx=ln(fray.x,pt,wire,max(ex,.0006)),lz=ln(fray.y,pt,wire,max(ez,.0006));
float cv=1.-(1.-lx)*(1.-lz);
float frame=smoothstep(.02+ez,.012-ez,abs(q-1.235));cv=clamp(cv+frame,0.,1.);
float rr=length(h.xz);
float rs=fbm(h.xz*.12+.5);
float lit=.016+.07*exp(-dot(h.xz-uL.xz*-.9,h.xz-uL.xz*-.9)*.7)+.3*beam(h)+.03*max(dot(normalize(vec2(-1.,.4)),h.xz),0.);
float wv=fbm(x*.42+.2),sp=.09*exp(-max(rr-.8,0.)*5.5);vec3 wc=vec3(.05,.068,.11)*.022*(.6+.6*rs)+vec3(.3,.19,.09)*(.25+1.1*rs*wv*wv)*(max(lit-.016,0.)+sp);
float gx=nz(floor(x/pt)*.37+.11);wc+=vec3(.9,.7,.42)*lx*(1.-lz)*smoothstep(.9,.99,gx)*(max(lit-.016,0.)+sp+.006)*3.5*(1.-smoothstep(.0,pt*.6,max(ex,ez)));
wc=mix(wc,vec3(.1,.05,.03)*lit,smoothstep(.3,.8,fbm(h.xz*.05+.2))*.7*smoothstep(1.2,.3,rr));
float ce=fbm(h.xz*.55+.1);float disc=smoothstep(.74+ez,.74-ez,rr+(ce-.5)*.11);
vec3 ceram=vec3(.2,.17,.13)*lit*(.6+.75*fbm(h.xz*1.3))*(1.-.75*smoothstep(.55,.2,rr)*fbm(h.xz*.25+.7));
ceram*=1.-.4*smoothstep(.55,.72,nz(h.xz*.9+.3));
vec3 mesh=mix(c*.22,wc,cv);
vec3 g=mix(mesh,ceram,disc);
g*=1.-.8*exp(-rr*rr/.1);
c=mix(c,g,mk);
if(prim)g_z=dot(h-uCam,uFw);
}}}
if(prim){vec3 w0=uCam-uBO;float A=dot(d,uL),C=dot(d,w0),De=dot(uL,w0),sc=(De-A*C)/max(1.-A*A,1e-4);
if(sc>1.05){vec3 pa=uCam+d*max(C*-1.+A*sc,0.)-(uBO+uL*sc);float dd=length(pa);
c+=vec3(.0085,.0066,.004)*smoothstep(uBW*1.35,uBW*.55,dd)*smoothstep(1.05,1.5,sc)*exp(-(sc-1.)*.3);}}
return c;}
// beads and mist on the inside of the empty wall: x,y tilt the surface, z veils it
vec4 drops(vec2 u,float hgt){
vec4 r=vec4(0.);
float dens=smoothstep(.05,.32,hgt);
float tc=floor(u.x/.17);vec4 ht=texelFetch(tN,ivec2(mod(tc+77.,256.),91),0);
float tx=u.x-(tc+.5+(ht.r-.5)*.6)*.17,ye=.06+.45*ht.g,on=step(ht.b,.33+.0*uSeed);
float trk=on*smoothstep(.008,.0035,abs(tx))*smoothstep(ye-.01,ye+.03,hgt);
vec2 eb=vec2(tx/.013,(hgt-ye+.004)/.017);float de=dot(eb,eb);
vec2 g=u/.07;vec2 id=floor(g);vec4 h=texelFetch(tN,ivec2(mod(id+vec2(19.,43.),256.)),0);
if(h.a<.03+.16*dens*dens){vec2 fp=fract(g)-.5-(h.rg-.5)*.5;float rd=.05+.2*h.b*h.b;float dd=length(fp*vec2(1.,.85))/rd;
if(dd<1.){r.xy=fp/rd*.42;r.w=1.;}}
if(on>.5&&de<1.){r.xy=eb*.45;r.w=1.;}
float n=fbm(u*vec2(.07,.05)+.31);
r.z=(.55+.45*smoothstep(.2,.75,n))*dens*(1.-trk)*(1.-r.w)*.36;
return r;}
void main(){
vec2 nd=v*2.-1.;vec3 d=normalize(uFw+uTan*(nd.x*uRt+nd.y*uUp));
vec3 p=uCam,col=vec3(0.),thr=vec3(1.),lo=vec3(0.),ld=vec3(0.,0.,-1.);
int s=0,ev=0,gr=0,N=int(uIt);bool liq=false,got=false;float W=0.,zh=-1.,fw=uPx*2.*uTan,tg=0.;bool viaS=false;
for(int i=0;i<N;i++){
float rad=length(p.xz),yt=(p.y+1.05)/2.7;vec4 q=textureLod(tProf,vec2(.5,yt),0.);
float fo=max(rad-q.r,max(-.972-p.y,p.y-1.335)),fi=max(rad-q.g,max(uYf-p.y,p.y-1.4));
float dist=s==0?fo:(s==1?min(-fo,fi):-fi);
if(s==0&&dist>.02&&dot(p,d)>0.)break;
float st=max(dist*(s==1?.9:.62),gr>0?.0028:.0002);
bool pl=false;float wl=1.;
if(s==2&&abs(d.y)>1e-4&&liq==(d.y>0.)){float tp=(uLvl-p.y)/d.y;if(tp>.0004&&tp<=st){st=tp;pl=true;}}
if(pl||(dist<.0008&&gr==0)){
if(pl)p+=d*st;
float rs=max(rad,1e-4);vec3 n;float n1,n2;int ns;bool nl=liq;float hm=.015;
if(pl){float men=exp(-max(q.g-rs,0.)/.02);vec2 ra=p.xz/rs;n=normalize(vec3(-ra.x*men*1.15,1.,-ra.y*men*1.15));n1=liq?1.33:1.;n2=liq?1.:1.33;ns=2;nl=!liq;
float fl0=max(dot(ra,normalize(uL.xz)),0.);wl=.2+1.7*fl0*fl0;col+=thr*(vec3(.11,.085,.055)*men*men*(.04+1.1*fl0*fl0)+vec3(.0009,.001,.0013));}
else{
bool outer=s==0||(s==1&&-fo<fi);
n=normalize(vec3(p.x/rs,clamp(-(outer?q.b:q.a),-5.,5.),p.z/rs));
if((outer&&p.y<-.968)||(!outer&&p.y<uYf+.004))n=vec3(0.,-1.,0.);
if(!outer){float yl=p.y-uLvl;float bd=exp(-pow((yl-hm*.42)/(hm*.42),2.));vec2 ra=p.xz/rs;float fl1=max(dot(ra,normalize(uL.xz)),0.);col+=thr*vec3(.085,.065,.04)*bd*(.05+1.1*fl1*fl1);}
if(s==0){n1=1.;n2=1.5;ns=1;}
else if(s==1&&outer){n1=1.5;n2=1.;ns=0;}
else if(s==1){nl=p.y<uLvl+hm;n1=1.5;n2=nl?1.33:1.;ns=2;}
else{n1=liq?1.33:1.;n2=1.5;ns=1;}
}
vec3 fn=dot(n,d)>0.?-n:n;
if(!pl&&s!=0&&!(s==1&&-fo<fi)&&!liq&&!nl&&p.y>uLvl+.03){
float az=atan(p.x/max(abs(p.z),1e-5));if(p.z<0.)az=(p.x<0.?-3.14159:3.14159)-az;vec2 u=vec2(az*max(rs,.2),p.y);vec4 dr=drops(u,p.y-uLvl);
vec3 t1=normalize(cross(vec3(0.,1.,0.),n)),t2=cross(n,t1);fn=normalize(fn+t1*dr.x+t2*dr.y);
if(dr.w>0.)col+=thr*vec3(1.,.87,.68)*pow(max(dot(d+2.*max(-dot(d,fn),0.)*fn,uL),0.),260.)*.3;
if(dr.z>0.){col+=thr*dr.z*(vec3(.0012,.0015,.0022)+vec3(.009,.007,.0048)*max(dot(n,uL),0.)+vec3(.001,.0013,.002)*smoothstep(.2,.9,p.y-uLvl));thr*=1.-dr.z*.3;}
}
if(-dot(d,fn)<.03)fn=normalize(fn-d*(.06+dot(d,fn)));
float eta=n1/n2,ci=-dot(d,fn),k=1.-eta*eta*(1.-ci*ci);
float R0=(n1-n2)/(n1+n2);R0*=R0;float cm=k>0.?(n1>n2?sqrt(k):ci):0.;float F=k>0.?R0+(1.-R0)*pow(clamp(1.-cm,0.,1.),5.):1.;
vec3 rd=d+2.*ci*fn;
float wg=ev==0?1.:(pl?.28*wl:(k<0.?0.:(got?.03:.12)));

#ifndef TG
g_l=ev==0?1.:0.;col+=thr*F*wg*envR(p,rd);
#endif

if(ev==0){zh=dot(p-uCam,uFw);col+=thr*vec3(.18,.135,.08)*beam(p)*.012*(.5+fbm(p.xy*.3));}
if(k<0.){d=rd;}
else{d=eta*d+(eta*ci-sqrt(k))*fn;thr*=1.-F;s=ns;liq=nl;}
if(!got&&s==2&&liq){lo=p;ld=d;got=true;tg=dot(thr,vec3(.33));viaS=pl;}
p+=d*.0015;ev++;gr=2;
}else{
if(gr>0)gr--;
if(s==2&&liq){st=min(st,.085);W+=beam(p+d*st*.5)*st;thr*=exp(-st*vec3(.006,.009,.02));}
else if(s==1)thr*=exp(-st*vec3(.52,.2,.4));
p+=d*st;
}}
#ifndef TG
vec3 cbk=scene(p,d,fw,ev==0);
col+=thr*cbk*(got?.3:1.);
if(ev==0)zh=g_z;
{float coc=zh>0.?uAp*abs(zh-uFd)/zh:0.;if(ev==0&&zh>0.)coc=max(coc,.0034);
o=vec4(enc(col)+(texelFetch(tN,ivec2(gl_FragCoord.xy)&255,0).r-.5)*.0055,(ev==0?.51:0.)+.49*min(coc/.021,1.));}
#else
if(uMode<1.5){float tm=clamp(-lo.z/(abs(ld.z)>.02?ld.z:-.02),0.,3.);vec2 qm=clamp((lo+ld*tm).xy,vec2(-1.2),vec2(1.2));
o=vec4(qm*.35+.5,W*.25,got?min(tg*1.25,1.):0.);}
else{vec2 pf=lo.xz,sl=vec2(0.);if(ld.y<-.03){sl=clamp(ld.xz/ld.y,vec2(-6.),vec2(6.));pf=lo.xz+sl*(-.85-lo.y);}
if(viaS){pf=vec2(3.);sl=vec2(0.);}
o=uFB>.5?vec4(pf*.2+.5,sl*.08+.5):vec4(pf,sl);}
#endif
}`,Tt=E+z+ne+`in vec2 v;out vec4 o;uniform sampler2D tB,tM;
void main(){vec4 cc=texture(tB,v);float onB=step(.505,cc.a);float r=max((cc.a-onB*.51)/.49*.021,.8*uPx);vec3 sum=dec(cc.rgb);float wt=1.;
for(int i=0;i<16;i++){float fi=float(i)+.5,rr=sqrt(fi/16.),an=fi*2.39996;vec2 uvp=v+vec2(cos(an),sin(an))*rr*r;
vec4 t=textureLod(tB,uvp,0.);float k=exp(-rr*rr*1.6);sum+=min(dec(t.rgb),vec3(4.))*k;wt+=k;}
vec3 c=sum/wt;
vec2 nd=v*2.-1.;vec3 d=normalize(uFw+uTan*(nd.x*uRt+nd.y*uUp));
float cau=0.;
if(d.y<-.001){float t=(-.982-uCam.y)/d.y;vec2 h=uCam.xz+d.xz*t;vec2 du=h-(-uL.xz)*1.12;
cau=exp(-dot(du,du)*2.4)*.6;
cau*=onB;}
vec2 vg=v-.5;c*=1.-.12*dot(vg,vg);
o=vec4(enc(c)+(texelFetch(tN0,ivec2(gl_FragCoord.xy+17.)&255,0).g-.5)*.0055,cau);}`.replace("uniform sampler2D tB,tM;","uniform sampler2D tB,tM,tN0;"),Rt=E+z+ee+ne+we+`in vec2 v;out vec4 o;uniform sampler2D tPl,tM,tM2,tD,tN;
`+je+`
float bedH(vec2 x,float B){return -.972+B*(1.-.82*dot(x,x));}
void main(){
vec2 Pi=(v-uC)/uRr;
float dys=Pi.y-uLvl;
vec2 uv=v;uv.y-=(uTilt*Pi.x-uDip*(.55-1.2*Pi.x*Pi.x))*exp(-dys*dys/.05)*uRr;
vec4 pl=texture(tPl,uv);vec3 c=dec(pl.rgb);
c+=pl.a*uGold*uGold*(.02+.3*uGlow);
vec4 m1=texture(tM,uv);
if(m1.a>.003){
vec4 m2=texture(tM2,uv);
vec2 pf=m2.xy,sl=m2.zw;if(uFB>.5){pf=(pf-.5)/.2;sl=(sl-.5)/.08;}
float W=m1.b*4.;
vec2 q=(m1.xy-.5)/.35;
vec2 fu=q*.5+.5;vec4 d0=textureLod(tD,fu,0.);
vec4 tx=textureLod(tD,fu+vec2(.035,0.),0.),ty=textureLod(tD,fu+vec2(0.,.035),0.);
vec2 sls=vec2(tx.a,ty.a)-d0.a;
vec4 d=textureLod(tD,fu+sls*.16,0.);
d.b=(d.b+d0.b+tx.b+ty.b)*.25;
float ph=fract(uT*.19),ph2=fract(ph+.5),bl=abs(2.*ph-1.);
vec2 fl=d.xy*1.6;
vec4 n1=texture(tN,(q-fl*ph)*.021+.07),n2=texture(tN,(q-fl*ph2)*.021+.57);
float silk=mix(n1.g,n2.g,bl);
vec4 nb=texture(tN,vec2(q.x*.014+uPh*.012,q.y*.24+.3));vec4 nb4=texture(tN,vec2(q.x*.033-uPh*.021,q.y*.71+.7));
float spn=min(abs(uOm)*.42,1.);
float band=mix(1.,pow(nb.r*1.25,3.)*2.2+pow(nb4.g*1.2,4.)*2.,spn);
float vq=veil(vec3(q,0.));float hz=max(d.b,0.)*(.62+.8*silk)*band*mix(1.,vq,.55);
vec3 gld=mix(uGold*uGold,uGold,.42);
vec3 add=gld*W*(.0012+.032*hz*uHz);
// the finest crystal: a shimmer of sparks too small to draw as plates, each cell flashing on its own clock as it falls
float cs=max(.00303/uPx,1.6);vec2 gp=gl_FragCoord.xy/cs;float col0=floor(gp.x);vec4 hc=texelFetch(tN,ivec2(mod(col0,256.),7),0);
gp.y+=uT*(1.2+2.6*hc.r)+hc.g*256.;vec2 gid=floor(gp);vec4 hg=texelFetch(tN,ivec2(mod(gid,256.)),0);
vec2 gl=(fract(gp)-.5-(hg.rg-.5)*.6)*cs;float wq=smoothstep(.45,.97,abs(q.x)/max(prof(q.y),.05));
float osh=uTop>.9?.25+1.5*smoothstep(-.75,uLvl,q.y):uTop<.1?.2+1.7*wq:.35+1.3*smoothstep(.45,.75,n1.b*.5+n2.r*.5);
float dens=clamp(max(d.b,0.)*(.5+.7*silk)*W*1.15*osh*vq,0.,.62);
float tw=pow(.5+.5*sin(uT*(1.3+3.1*hg.b)+hg.a*40.),36.),ks=smoothstep(.0013,.0036,uPx);
add+=mix(uGold*uGold,uGold,.6)*step(hg.a*mix(6.,1.8,ks),dens)*exp(-dot(gl,gl)*mix(.5,1.6,ks))*mix(tw*.7+.01,tw*3.+.085,ks)*W*uHz;
// the bed: where this ray lands on the pile, then that spot's own plate in the lamp
float Pq=dot(pf,pf);
if(uBed>.001&&Pq<4.){
float Bb=uBed*.82*(1.+.34*(texture(tN,pf*.017+.17).r-.5)+.18*(texture(tN,pf*.05+.41).g-.5)),Sq=dot(sl,sl),Qq=dot(pf,sl);
float wa=Sq+1.,wb=2.*Qq-1.7,wc=Pq-.2775,wd=wb*wb-4.*wa*wc;
float we=Sq>1e-5?(-wb+sqrt(max(wd,0.)))/(2.*wa):.85-sqrt(max(1.-Pq,0.));
vec2 ex0=pf+sl*we;float ey=we-.85;
bool onWall=wd>0.&&ey<bedH(ex0,Bb)&&ey<-.3;
float aq=.82*Bb*Sq,bq=1.+1.64*Bb*Qq,cq=.122-Bb+.82*Bb*Pq,dq=bq*bq-4.*aq*cq;
float uh=dq>0.?-2.*cq/(bq+sqrt(dq)):-9.;
vec2 hx=onWall?ex0:pf+sl*uh;float yb=onWall?ey:uh-.85;
float rq=dot(hx,hx)+yb*yb;
if(onWall||(dq>0.&&rq<.985&&dot(hx,hx)<1.)){
float thick=onWall?1.:bedH(hx,Bb)+sqrt(max(1.-dot(hx,hx),0.));
vec4 bn=texture(tN,hx*.9+.31);
float cov=smoothstep(-.01,.03,thick+(bn.r-.5)*.05)*(onWall?.75:smoothstep(0.,.06,dq/max(bq*bq,1e-5)));
vec3 hb=vec3(hx.x,yb,hx.y);
float lb=beam(hb+vec3(0.,.1,0.));
float amb=.01+.05*uFlame*exp(-max(hb.y+.95,0.)*3.);
// a drift of glitter: every cell of the pile is a facet at its own angle, a few of them at the lamp's mirror angle
float bcs=.0062;vec2 bg=hx/bcs;vec2 bid=floor(bg);vec4 bh=texelFetch(tN,ivec2(mod(bid+vec2(31.,5.),256.)),0);
vec3 fn=normalize(vec3((bh.r-.5)*3.4+.08*sin(uT*.5+bh.a*40.),1.,(bh.g-.5)*3.4+.08*cos(uT*.43+bh.b*40.)));
vec3 Hh=normalize(uL+normalize(uCam-hb));float fs=pow(max(dot(fn,Hh),0.),50.);
vec2 bl=(fract(bg)-.5-(bh.ba-.5)*.5)*bcs*uRr/uPx*1.3;float bpt=exp(-dot(bl,bl)*.7);
vec3 lem=mix(uGold,vec3(1.,.88,.42),.3);
vec3 bc=mix(uGold*uGold,lem,.4)*(amb*(.8+.5*bn.g)+lb*.011*(.4+bn.b)*(.5+bh.b))+lem*fs*bpt*(lb*2.6+amb*5.)*(onWall?.03:.08);
add=mix(add,bc,cov*.9);c=mix(c,vec3(.0015,.001,.0004),cov*.94*m1.a);
}}
vec2 ex=uBO.xy+uL.xy*1.02;float ed2=dot(Pi-ex,Pi-ex);add+=gld*(.0009+.012*max(d0.b,0.)*uHz)*exp(-ed2/.03)*1.2+mix(gld,vec3(1.,.9,.7),.5)*.11*exp(-ed2/.00012);
c+=add*m1.a;
}
c=1.-exp(-c*2.25);c=pow(c,vec3(.4545));
c=mix(c,c*c*(3.-2.*c),.3);
c+=(texelFetch(tN,ivec2(gl_FragCoord.xy)&255,0).a-.5)*.007;
o=vec4(c,1.);}`,Et=E+z+`in vec2 v;out vec4 o;uniform sampler2D tN,tM;
void main(){vec2 nd=v*2.-1.;vec3 d=normalize(uFw+uTan*(nd.x*uRt+nd.y*uUp));
vec3 nh=normalize(vec3(uCam.x,0.,uCam.z));float tp=-dot(uCam,nh)/dot(d,nh);vec3 ph=uCam+d*tp;vec2 P=vec2(dot(ph,vec3(nh.z,0.,-nh.x)),ph.y);
float yb=-1.385,ln=.42*(.86+.14*uFlame),s=(P.y-yb)/ln;
float x0=abs(P.x)-uFlX;
vec4 n=texture(tN,vec2(P.x*.11,P.y*.07-uT*.45));vec4 n2=texture(tN,vec2(P.x*.27,P.y*.17-uT*.9)+.3);
float xx=x0+(n.r-.5)*.1*smoothstep(0.,1.,s)+(n2.g-.5)*.05*s;
float ss=clamp(s,0.,1.);
float wo=mix(.098,.03,pow(ss,1.2))*(1.+1.4*smoothstep(.72,1.05,s));
float body=exp(-xx*xx/(wo*wo))*smoothstep(-.02,.03,s)*smoothstep(1.13,.8,s);
vec3 col;
if(uFlM<.5){
float iw=mix(.082,.0,pow(clamp(s/.46,0.,1.),.9));
float core=exp(-xx*xx/(iw*iw*.75+.00025))*smoothstep(.5,.34,s)*smoothstep(-.01,.03,s);
float ed=exp(-pow(abs(abs(xx)-iw*.72)/.02,2.))*smoothstep(.48,.3,s)*smoothstep(-.01,.03,s);
col=vec3(.2,.14,.62)*body*.34*(.6+.5*n2.b)+vec3(.25,.55,1.)*core*.5+vec3(.5,.82,1.)*ed*.42;
}else{
float w2=mix(.07,.012,pow(ss,1.4))*(1.+.8*sin(ss*3.14));float b2=exp(-xx*xx/(w2*w2))*smoothstep(-.02,.1,s)*smoothstep(.98,.5,s);
col=uFlC*b2*(.65+.5*n.b)+vec3(.05,.14,.5)*body*.35*smoothstep(.3,0.,s);
}
col*=uFlame;
// the mesh goes red over the flame, through the gauze's own wires
float mk=1.-texture(tM,v).a;
col*=.35+.65*mk;
float tg=(-.982-uCam.y)/min(d.y,-.001);vec2 gh=uCam.xz+d.xz*tg,gx=mat2(.956,.292,-.292,.956)*gh;
float xg=abs(gh.x)-uFlX,zw=gh.y;
float gs=exp(-xg*xg/.16-zw*zw/.3);
float pwr=smoothstep(.0,.3,abs(fract(gx.x/.042)-.5)*.84/.42)*0.+smoothstep(.36,.46,abs(fract(gx.x/.028)-.5))+smoothstep(.36,.46,abs(fract(gx.y/.028)-.5));
float dsc=smoothstep(.74,.7,length(gh));
col+=vec3(.95,.3,.06)*gs*mix(.3+.7*min(pwr,1.),.5,dsc)*uGz*.42*step(max(abs(gx.x),abs(gx.y)),1.26)*mk*step(d.y,0.);
// and the flask's foot, lit from under
float r2=length((P-vec2(0.,-.98))*vec2(.85,1.4));
col+=uFlC*.06*exp(-r2*r2/.28)*uFlame;
col+=vec3(.9,.3,.06)*.05*exp(-r2*r2/.42)*uGz;
o=vec4(col,0.);}`;function g(e,t,m){const i=e.createProgram();for(const[d,p]of[[e.VERTEX_SHADER,t],[e.FRAGMENT_SHADER,m]]){const l=e.createShader(d);e.shaderSource(l,p),e.compileShader(l),e.attachShader(i,l),e.deleteShader(l)}return e.linkProgram(i),i.__vs=t,i.__fs=m,i}function Ft(e){if(e.__c204)return e.__c204;const t={sim:g(e,U,ut),sor:g(e,U,xt),disp:g(e,U,ht),part:g(e,U,pt),flake:g(e,bt.replace("uniform float uGP;",we+"uniform float uGP;").replace("void main(){vR=0.;",je+`
void main(){vR=0.;`),wt),trace:g(e,U,Qe),traceG:g(e,U,Qe.replace(`#version 300 es
`,`#version 300 es
#define TG
`)),bk:g(e,U,yt),dof:g(e,U,Tt),comp:g(e,U,Rt),flame:g(e,U,Et)};for(const x in t)if(!e.getProgramParameter(t[x],e.LINK_STATUS)){const u=e.getProgramInfoLog(t[x]);let w="";for(const[V,Q]of[[e.VERTEX_SHADER,t[x].__vs],[e.FRAGMENT_SHADER,t[x].__fs]]){const F=e.createShader(V);e.shaderSource(F,Q),e.compileShader(F),w+=e.getShaderInfoLog(F)||"",e.deleteShader(F)}throw new Error("204 "+x+": "+u+" "+w)}const m={sim:["tProf","tS","tN"],sor:["tProf","tS"],disp:["tS"],part:["tProf","tA","tD"],flake:["tProf","tA","tM","tN"],trace:["tProf","tN","tBk"],traceG:["tProf","tN","tBk"],bk:["tN"],dof:["tB","tM","tN0"],comp:["tProf","tPl","tM","tD","tN","tM2"],flame:["tN","tM"]},i={P:t,rb:e.getUniformLocation(t.sor,"uRB"),gp:e.getUniformLocation(t.flake,"uGP"),sets:[],bgs:{},vao:e.createVertexArray(),ubo:e.createBuffer(),noise:null};for(const x in t){e.useProgram(t[x]),m[x].forEach((w,V)=>e.uniform1i(e.getUniformLocation(t[x],w),V));const u=e.getUniformBlockIndex(t[x],"B");u!==e.INVALID_INDEX&&e.uniformBlockBinding(t[x],u,0)}e.bindBuffer(e.UNIFORM_BUFFER,i.ubo),e.bufferData(e.UNIFORM_BUFFER,20*16,e.DYNAMIC_DRAW);const d=256,p=new Uint8Array(d*d*4);let l=759140775;for(let x=0;x<p.length;x++){l=l+1831565813|0;let u=Math.imul(l^l>>>15,1|l);u=u+Math.imul(u^u>>>7,61|u)^u,p[x]=(u^u>>>14)>>>24}const y=e.createTexture();return e.bindTexture(e.TEXTURE_2D,y),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,d,d,0,e.RGBA,e.UNSIGNED_BYTE,p),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),i.noise=y,i.fl32=!!e.getExtension("EXT_color_buffer_float"),i.fl16=i.fl32||!!e.getExtension("EXT_color_buffer_half_float"),e.__c204=i,i}function P(e,t,m,i,d,p,l,y){const x=e.createTexture();e.bindTexture(e.TEXTURE_2D,x),e.texImage2D(e.TEXTURE_2D,0,i,t,m,0,d,p,y||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const u=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,u),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,x,0),{t:x,f:u,w:t,h:m}}function le(e){const t=new Float32Array(1),m=new Uint32Array(t.buffer);t[0]=e;const i=m[0],d=i>>16&32768,p=(i>>23&255)-112,l=i&8388607;return p<=0?d:d|p<<10|l>>13}function zt(e,t,m){let i=t.sets.find(d=>d.size===m&&!d.live)||null;if(!i&&t.sets.length>=8&&(i=t.sets.shift(),i.size!==m&&(e.deleteTexture(i.plate.t),e.deleteFramebuffer(i.plate.f),i.plate=null,i.size=m),t.sets.push(i)),!i){const d=e.UNSIGNED_BYTE,p=e.HALF_FLOAT,l=e.FLOAT,y=t.fl32,x=t.fl16;i={size:m,live:!1};const u=y?e.RGBA32F:e.RGBA16F,w=y?l:p;x?(i.s0=P(e,64,64,u,e.RGBA,w,e.NEAREST),i.s1=P(e,64,64,u,e.RGBA,w,e.NEAREST),i.d=P(e,64,64,e.RGBA16F,e.RGBA,p,e.LINEAR),i.a0=P(e,256,256,u,e.RGBA,w,e.NEAREST),i.a1=P(e,256,256,u,e.RGBA,w,e.NEAREST),i.m=P(e,384,384,e.RGBA16F,e.RGBA,p,e.LINEAR),i.m2=P(e,384,384,e.RGBA16F,e.RGBA,p,e.LINEAR)):(i.m=P(e,384,384,e.RGBA8,e.RGBA,d,e.LINEAR),i.m2=P(e,384,384,e.RGBA8,e.RGBA,d,e.LINEAR)),t.sets.push(i)}return i.plate||(i.plate=P(e,m,m,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR)),t.bgs[m]||(t.bgs[m]=P(e,m,m,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR)),i.bgT=t.bgs[m],i}Xe.add({num:204,name:"Gold Crystals",fam:"Worlds",recipe:"A flask of hot clear solution in a dark lab. As it cools, thin gold plates form and drift down, dark until they catch the lamp and flash, settling into a glittering bed. The flask, the lamp, the crystal size and the colour of the gold change every mint. Hold to light the burner and melt them away (let go and they form again), or drag to swirl the flask.",interactive:"Hold to light the burner and dissolve the rain. Drag to swirl the flask.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,m=e.size,i=Ft(t),d=i.P;let p=0;for(let o=2;o+8<=e.hash.length;o+=8)p=Math.imul(p^parseInt(e.hash.slice(o,o+8),16),2654435761)+2135587861|0;const l=()=>{p=p+1831565813|0;let o=Math.imul(p^p>>>15,1|p);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296};l(),l(),l();const y=o=>{let a=0;for(const f of o)a+=f[1];let r=l()*a;for(const f of o)if(r-=f[1],r<=0)return f[0];return o[0][0]},x=e.trait("Flask",e.home?"Round":y([["Round",50],["Conical",32],["Pear",18]])),u=e.trait("Lamp",e.home?"Raking left":y([["Raking left",40],["Raking right",25],["High slit",22],["From behind",13]])),w=e.trait("Crystals",e.home?"Plates":y([["Plates",50],["Fine silk",28],["Great plates",16],["Mica shards",6]])),V=e.trait("Fill",e.home?"Two thirds":y([["Two thirds",50],["Half",26],["To the shoulder",24]])),Q=e.trait("Burner",e.home?"Bunsen":y([["Bunsen",62],["Spirit lamp",28],["Twin jets",10]])),F=e.trait("Wall",e.home?"Glazed tile":y([["Glazed tile",34],["Soot black",30],["Slate",26],["Night window",10]])),te=e.trait("Gold",e.home?"Deep gold":y([["Deep gold",46],["Lemon",30],["Copper",15],["Oil film",9]])),K=e.trait("Onset",e.home?"From the surface":y([["From the surface",48],["Down the walls",36],["Everywhere",16]])),Ke=l();let O=-2126716991;for(let o=2;o<e.hash.length;o++)O=Math.imul(O^e.hash.charCodeAt(o),16777619);O=O+1831565813|0;let k=Math.imul(O^O>>>15,1|O);k=k+Math.imul(k^k>>>7,61|k)^k;const Ze=((k^k>>>14)>>>0)/4294967296,Ye=e.trait("View",e.home?"Across the flask":Ze<.3?"From below":Ze<.5?"On the bench":"Across the flask"),$e=Ye==="From below",ye=Ye==="On the bench",A=512,M=new Float32Array(A),Te=o=>-1.05+2.7*o/(A-1),Re=(o,a,r)=>{const f=Math.min(1,Math.max(0,(r-o)/(a-o)));return f*f*(3-2*f)};for(let o=0;o<A;o++){const a=Te(o);let r=0;if(a>=-.972&&a<=1.335){const f=.255+.015*Re(1.16,1.3,a)+.028*Re(1.3,1.325,a);if(x==="Round"){const h=Math.sqrt(Math.max(1-a*a,0));r=a<0?h:Math.pow(Math.pow(h,5)+Math.pow(f,5),.2)}else if(x==="Conical"){const R=.95-(a- -.972)*(.95-f)/1.62;if(r=a<.65?R:f,r=Math.max(r,f),a>.5){const _=Re(.5,.8,a);r=r*(1-_)+f*_}if(a<-.972+.1){const _=(-.872-a)/.1;r=R-.1+.1*Math.sqrt(Math.max(1-_*_,0))}}else if(a<-.2)r=Math.sqrt(Math.max(.8*.8-(a- -.2)*(a- -.2)*(.8*.8/(.772*.772)),0));else{const N=Math.min((a- -.2)/1.05,1),R=N*N*(3-2*N);r=.8*(1-R)+f*R,a>.85&&(r=Math.max(r,f))}}M[o]=r}const fe=.036,Ee=new Float32Array(A),ve=2.7/(A-1);let X=-9,Fe=0;for(let o=1;o<A-1;o++){if(M[o]<=0)continue;const a=((M[o+1]>0?M[o+1]:M[o])-(M[o-1]>0?M[o-1]:M[o]))/(2*ve),r=Math.hypot(1,a),f=Math.max(M[o]-fe/r,0),h=Te(o)+fe*a/r;if(h>X&&X>-9){const b=Math.ceil((X+1.05)/ve),N=Math.floor((h+1.05)/ve);for(let R=Math.max(b,0);R<=N&&R<A;R++){const _=(Te(R)-X)/(h-X);Ee[R]=Fe+(f-Fe)*_}}h>X&&(X=h,Fe=f)}const gt=-.972+fe*1.15,oe=new Uint16Array(A*4),Je=(o,a)=>{const f=Math.max(a-3,0),h=Math.min(a+3,A-1);return o[f]>0&&o[h]>0?(o[h]-o[f])/((h-f)*ve):0};for(let o=0;o<A;o++)oe[o*4]=le(M[o]),oe[o*4+1]=le(Ee[o]),oe[o*4+2]=le(Je(M,o)),oe[o*4+3]=le(Je(Ee,o));const ze=V==="Half"?-.08:V==="Two thirds"?.26:.62,Pt=x==="Round"?1:x==="Pear"?.7:0,B=u==="Raking right"?-1:1,L={sub:(o,a)=>[o[0]-a[0],o[1]-a[1],o[2]-a[2]],dot:(o,a)=>o[0]*a[0]+o[1]*a[1]+o[2]*a[2],cross:(o,a)=>[o[1]*a[2]-o[2]*a[1],o[2]*a[0]-o[0]*a[2],o[0]*a[1]-o[1]*a[0]],norm:o=>{const a=Math.hypot(...o);return o.map(r=>r/a)}},Z=$e?[-.66*B,-.42,3]:ye?[-1.45*B,1.02,4.45]:[-.72*B,.84,3.05],At=$e?[-.3*B,-.05,0]:ye?[-.16*B,.4,0]:[-.34*B,-.2,0],de=ye?.335:.305,et=-.042*B,Y=L.norm(L.sub(At,Z));let I=L.norm(L.cross(Y,[0,1,0])),W=L.cross(I,Y);{const o=Math.cos(et),a=Math.sin(et),r=I.map((h,b)=>o*h+a*W[b]),f=W.map((h,b)=>o*h-a*I[b]);I=r,W=f}const tt=o=>{const a=L.sub(o,Z),r=L.dot(a,Y);return[.5+.5*L.dot(a,I)/(r*de),.5+.5*L.dot(a,W)/(r*de),r]},ge=tt([0,0,0]),ot=Math.hypot(...Z),at=ge[0],ct=ge[1],Pe=.5/(Math.sqrt(ot*ot-1)*de);let D;u==="Raking left"?D=[-.9,.3,.3]:u==="Raking right"?D=[.9,.26,.34]:u==="High slit"?D=[-.34,.92,.22]:D=[-.62,.3,-.72];const Mt=Math.hypot(...D);D=D.map(o=>o/Mt);const St=u==="High slit"?.3:u==="From behind"?.62:.4,Ae=u==="High slit"?[-.18*B,0,.12]:[0,-.3+(ze-.26)*.4,.16];let j=-1640539656;for(let o=2;o<e.hash.length;o++)j=Math.imul(j^e.hash.charCodeAt(o),16777619);const st=()=>{j=j+1831565813|0;let o=Math.imul(j^j>>>15,1|j);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},it=e.home?.5:st(),Nt=e.home?.5:st(),Me=L.norm([(-.6+(it-.5)*.7)*B,.5+.4*Nt,.4+(it-.5)*.3]),Se=te==="Lemon"?[1,.77,.3]:te==="Copper"?[1,.47,.11]:te==="Oil film"?[1,.7,.28]:[1,.67,.15],_t=te==="Oil film"?.75:te==="Copper"?.15:.1,rt=w==="Fine silk"?.0032:w==="Great plates"?.0135:w==="Mica shards"?.0175:.0082,Ut=w==="Fine silk"?.5:w==="Mica shards"?.6:.4,Lt=w==="Fine silk"?1.55:w==="Mica shards"?.55:1,Dt=K==="From the surface"?1:K==="Down the walls"?0:.35,qt=K==="From the surface"?3.4:K==="Down the walls"?.6:1.7,Gt=K==="Down the walls"?3.2:K==="From the surface"?.9:1.5,Bt=Q==="Twin jets"?.24:.34,kt=Q==="Twin jets"?.42:0,Ne=Q==="Spirit lamp"?[1,.6,.17]:[.11,.24,.95],It=Q==="Spirit lamp"?1:0,Ct=F==="Glazed tile"?1:F==="Slate"?2:F==="Night window"?3:0,Ot=F==="Soot black"?.55:F==="Slate"?.95:1,me=o=>Math.min(1,Math.max(0,1-(Math.exp(4*o)-1.8221)/(13.4637-1.8221))),s={Tb:.335+l()*.02,om:.34*(l()<.5?-1:1),ph:l()*20,bed:.46,flame:0,gz:.7,tilt:0,tiltV:0,acc:0,t:0},c=new Float32Array(20*4),q=1/20,Xt=Math.min(1,tt([0,-.45,0])[1]+.04);let _e=0;const ue=!i.fl16,C=(o,a,r)=>{const f=me(s.Tb);c[0]=o,c[1]=a,c[2]=s.flame,c[3]=s.Tb,c[4]=s.om,c[5]=s.ph,c[6]=f,c[7]=s.bed,c[8]=r?r[0]:9,c[9]=r?r[1]:9,c[10]=r?r[2]:0,c[11]=r?r[3]:0,c[12]=at,c[13]=ct,c[14]=Pe,c[15]=ze,c[16]=D[0],c[17]=D[1],c[18]=D[2],c[19]=St,c[20]=Ae[0],c[21]=Ae[1],c[22]=Ae[2],c[23]=.16,c[24]=Se[0],c[25]=Se[1],c[26]=Se[2],c[27]=_t,c[28]=s.tilt,c[29]=Math.min(.09,.0028*s.om*s.om),c[30]=s.init?1:0,c[31]=Dt,c[32]=rt,c[33]=.058,c[34]=Pt,c[35]=Ke,c[36]=Bt,c[37]=kt,c[38]=qt,c[39]=Gt,c[40]=1/m,c[41]=ue?1:0,c[42]=s.glow||0,c[43]=Lt,c[44]=Ne[0],c[45]=Ne[1],c[46]=Ne[2],c[47]=It,c[48]=Ct,c[49]=Ot,c[50]=s.gz,c[51]=Ut,c[56]=Z[0],c[57]=Z[1],c[58]=Z[2],c[59]=de,c[60]=I[0],c[61]=I[1],c[62]=I[2],c[63]=fe,c[64]=W[0],c[65]=W[1],c[66]=W[2],c[67]=gt,c[68]=Y[0],c[69]=Y[1],c[70]=Y[2],c[71]=ge[2]-.42,c[72]=.022,c[73]=150,c[74]=_e,c[75]=9,c[76]=Me[0],c[77]=Me[1],c[78]=Me[2],c[79]=(F==="Soot black"?0:F==="Night window"?.9:1)*(x==="Round"?3.6:2),t.bindBufferBase(t.UNIFORM_BUFFER,0,i.ubo),t.bindBuffer(t.UNIFORM_BUFFER,i.ubo),t.bufferSubData(t.UNIFORM_BUFFER,0,c)},n=zt(t,i,m);n.live=!0,t.bindVertexArray(i.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),n.prof&&t.deleteTexture(n.prof);const G=n.prof=t.createTexture();t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,G),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,1,A,0,t.RGBA,t.HALF_FLOAT,oe),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const v=(o,a)=>{t.activeTexture(t.TEXTURE0+o),t.bindTexture(t.TEXTURE_2D,a)},S=(o,a,r,f)=>{t.useProgram(o),t.bindFramebuffer(t.FRAMEBUFFER,a),t.viewport(0,0,r,f)};for(let o=0;o<6;o++)v(o,null);C(0,q,null),S(d.bk,n.plate.f,m,m),v(0,i.noise),t.drawArrays(t.TRIANGLES,0,3);for(let o=0;o<3;o++){_e=o,C(0,q,null);const a=o===0?n.bgT:o===1?n.m:n.m2;S(o===0?d.trace:d.traceG,a.f,a.w,a.h),v(0,G),v(1,i.noise),v(2,n.plate.t),t.drawArrays(t.TRIANGLES,0,3)}_e=0,C(0,q,null),v(2,null),S(d.dof,n.plate.f,m,m),v(0,n.bgT.t),v(1,n.m.t),v(2,i.noise),t.drawArrays(t.TRIANGLES,0,3);let ae;if(ue){n.a0&&(t.deleteTexture(n.a0.t),t.deleteTexture(ae));const o=new Float32Array(256*256*4);for(let r=0;r<256*256;r++){const f=l()*6.283,h=-.9+l()*(ze+.85),b=Math.sqrt(Math.max(1-h*h,.01))*Math.sqrt(l())*.95;o[r*4]=b*Math.cos(f),o[r*4+1]=h,o[r*4+2]=b*Math.sin(f),o[r*4+3]=rt*(.4+1.6*l()*l())}n.a0={t:t.createTexture()},t.bindTexture(t.TEXTURE_2D,n.a0.t),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,256,256,0,t.RGBA,t.FLOAT,o),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const a=new Uint16Array(16);for(let r=0;r<4;r++)a[r*4+2]=14336;ae={t:t.createTexture()},t.bindTexture(t.TEXTURE_2D,ae.t),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,2,2,0,t.RGBA,t.HALF_FLOAT,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR)}else{s.init=!0,C(0,q,null),S(d.sim,n.s0.f,64,64),v(0,G),v(1,n.s1.t),v(2,i.noise),t.drawArrays(t.TRIANGLES,0,3);for(let o=0;o<40;o++){S(d.sor,n.s1.f,64,64),t.uniform1f(i.rb,o&1),v(0,G),v(1,n.s0.t),t.drawArrays(t.TRIANGLES,0,3);const a=n.s0;n.s0=n.s1,n.s1=a}S(d.part,n.a0.f,256,256),v(0,G),v(1,n.a1.t),v(2,n.d.t),t.drawArrays(t.TRIANGLES,0,3),s.init=!1,ae=n.d}const Wt=(o,a)=>{C(a,q,o),S(d.sim,n.s1.f,64,64),v(0,G),v(1,n.s0.t),v(2,i.noise),t.drawArrays(t.TRIANGLES,0,3);let r=n.s0;n.s0=n.s1,n.s1=r;for(let f=0;f<4;f++)S(d.sor,n.s1.f,64,64),t.uniform1f(i.rb,f&1),v(0,G),v(1,n.s0.t),t.drawArrays(t.TRIANGLES,0,3),r=n.s0,n.s0=n.s1,n.s1=r;S(d.disp,n.d.f,64,64),v(0,n.s0.t),t.drawArrays(t.TRIANGLES,0,3)},nt=(o,a)=>{C(a,o,null),S(d.part,n.a1.f,256,256),v(0,G),v(1,n.a0.t),v(2,n.d.t),t.drawArrays(t.TRIANGLES,0,3);const r=n.a0;n.a0=n.a1,n.a1=r},Ue=o=>{C(o,q,null),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,m,m),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.useProgram(d.comp),v(0,G),v(1,n.plate.t),v(2,n.m.t),v(3,ae.t),v(4,i.noise),v(5,n.m2.t),t.drawArrays(t.TRIANGLES,0,3),t.enable(t.BLEND),t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE),t.useProgram(d.flake),v(0,G),v(1,n.a0.t),v(2,n.m.t),v(3,i.noise),t.uniform1f(i.gp,0),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,256*256),t.blendFuncSeparate(t.ONE,t.ONE,t.ZERO,t.ONE),t.uniform1f(i.gp,1),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,256*256),(s.flame>.004||s.gz>.004)&&(t.blendFuncSeparate(t.ONE,t.ONE,t.ZERO,t.ONE),t.enable(t.SCISSOR_TEST),t.scissor(0,0,m,Math.ceil(m*Xt)),t.useProgram(d.flame),v(0,i.noise),v(1,n.m.t),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.SCISSOR_TEST)),t.disable(t.BLEND)};ue||(S(d.disp,n.d.f,64,64),C(0,q,null),v(0,n.s0.t),t.drawArrays(t.TRIANGLES,0,3),nt(.001,0)),s.glow=me(s.Tb),Ue(0);let lt=0,ft=0,Le=!1,xe=0,De=0,$t=0,qe=!1,Jt=0,$=0,he=1,vt=1,ce=22+l()*30,se=0,ie=0,Ge=9,dt=9,Be=0,mt=[76,79,81,83,86,88,91,93],ke=0,Ie=0;const H=e.input;return(o,a)=>{a=Math.min(a,.12),a<=0&&(a=1/30);const r=!!H.down&&H.inside!==!1,f=(H.x-at)/Pe,h=(1-H.y-ct)/Pe;let b=0,N=0;if(r){Le&&(b=f-lt,N=h-ft);const T=Math.hypot(b,N);if(T>.006?xe=0:xe+=a,De=0,Le&&T>0){se+=b,ie+=N,Ge=f,dt=h;const be=Math.abs(b)>.002?Math.sign(b):Math.sign(s.om)||1;s.om+=b*3.1+be*Math.abs(N)*.9,s.tiltV+=b*.8}lt=f,ft=h}else xe=0,De+=a;const R=H.taps?H.taps():[];Le=r;let _=0;if(De>5||!H.inside){if(ce-=a,ce<=0&&$<=0){const T=l();he=$=1.8+9*T*T,vt=.4+.6*l(),ce=he+26+70*l()*l()}}else ce=Math.max(ce,14);if($>0){$=Math.max(0,$-a);const T=1-$/he;_=vt*Math.pow(Math.sin(Math.PI*T),.6)*(.85+.15*Math.sin(o*2.3+he))}const J=r&&xe>.09,Ce=J||_>.06;Ce&&!qe&&(e.sound.hit("noise",J?.55:.3,{cutoff:1400,dur:.35}),J&&e.sound.hit("kick",.16)),!Ce&&qe&&e.sound.hit("noise",.16,{cutoff:500,dur:.25}),qe=Ce;const pe=J?1:_,jt=1-Math.exp(-a*(pe>s.flame?J?16:3:J?11:3));s.flame+=(pe-s.flame)*jt,s.gz+=(pe-s.gz)*(1-Math.exp(-a*(pe>s.gz?1.7:.42)));const Ht=me(s.Tb);s.flame>.05&&(s.Tb+=a*.27*s.flame*(1-s.Tb)*(s.Tb<.74?1:.15)),s.Tb+=a*-.2*(s.Tb-.14);const re=me(s.Tb);s.bed+=a*(re*.52-s.bed)/17,s.bed=Math.max(0,Math.min(s.bed-a*s.bed*Math.min(Math.abs(s.om)*.06,.45),re)),s.om*=Math.exp(-a/6);const Vt=.16*Math.sin(o*.07+Ke*20);if(s.om+=(Vt-s.om)*Math.min(1,a*.03),s.om=Math.max(-9,Math.min(9,s.om)),s.tiltV+=(-s.tilt*42-s.tiltV*2.3)*a,s.tilt+=s.tiltV*a,s.tilt=Math.max(-.09,Math.min(.09,s.tilt)),s.ph+=a*(.5+.55*Math.abs(s.om)+s.flame*.5),s.glow+=(re-s.glow)*Math.min(1,a*.8),ue){Ue(o);return}const Qt=re-Ht;if(Be+=Math.max(Qt,0)*34+a*.03*re+Math.abs(s.om)*a*.18,Be>1){Be=0;const T=mt[Math.floor(l()*mt.length)];e.sound.note(T,{dur:.55+l()*.7,vel:.1+l()*.1,wave:"sine",pan:l()*1.2-.6})}s.flame>.5&&(ke-=a,ke<=0&&(ke=.3,e.sound.hit("noise",.1*s.flame,{cutoff:520,dur:.45}))),Ie-=a*(Math.abs(s.om)*2.2),Ie<=0&&(Ie=.8+l(),Math.abs(s.om)>.7&&e.sound.hit("hat",Math.min(.22,Math.abs(s.om)*.05)));for(const T of R)e.sound.note(84,{dur:.22,vel:.12,wave:"sine"});s.acc+=a;let Oe=0;for(;s.acc>=q&&Oe<2;){s.acc-=q,Oe++;const T=3.2,be=Math.min(1,.65/Math.max(1e-6,Math.hypot(se,ie)*T));Wt(Ge<8&&(se||ie)?[Ge,dt,se*T*be,ie*T*be]:null,o),se=0,ie=0}Oe===2&&(s.acc=Math.min(s.acc,q)),nt(a,o),Ue(o)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
