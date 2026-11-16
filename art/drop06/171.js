// Lotus Leaf: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/171.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(rr){rr&&function(){"use strict";const Vr="",ar=new WeakMap,Ze=new Map,F=92,he=128,J=1.25,ke=250,nr=170,S=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
`+Vr+`
`,qe=S+"layout(location=0) in vec2 a; out vec2 vP; void main(){ vP=a; gl_Position=vec4(a,0.,1.); }",sr=`
vec2 oct(vec3 d){
  float s=abs(d.x)+abs(d.y)+abs(d.z);
  vec2 p=d.xz/s;
  if(d.y<0.) p=(1.-abs(p.yx))*vec2(p.x<0.?-1.:1.,p.y<0.?-1.:1.);
  return p*.5+.5;
}`,cr=`
vec3 tone(vec3 c){ c=c*(2.51*c+.03)/(c*(2.43*c+.59)+.14); return sqrt(clamp(c,0.,1.)); }`,Wr=S+`in vec2 vP; out vec4 o; uniform sampler2D uW;
vec4 s(vec2 p){ vec2 f=fract(p),i=floor(p); f=f*f*(3.-2.*f); return texture(uW,(i+f+.5)/256.); }
void main(){ vec2 u=(vP*.5+.5)*256.;
  vec4 c=s(u/32.)*.42+s(u/16.+7.)*.26+s(u/8.+19.)*.17+s(u/4.+3.)*.1+s(u/2.+31.)*.05;
  o=clamp((c-.5)*2.1+.5,0.,1.);
}`,Yr=S+`layout(location=0) in vec2 a; layout(location=1) in vec4 i; uniform vec2 uO; out vec2 vQ; out float vH;
void main(){ vQ=a; vH=i.w; gl_Position=vec4((i.xy+uO+a*i.z)*2.-1.,0.,1.); }`,Gr=S+`in vec2 vQ; in float vH; out vec4 o;
void main(){ float d=dot(vQ,vQ); o=vec4(sqrt(max(1.-d,0.))*vH,0.,0.,1.); }`,Qr=S+`in vec2 vP; out vec4 o; uniform sampler2D uH,uW;
void main(){ vec2 v=vP*.5+.5; float e=1./512.;
  float hx=texture(uH,v+vec2(e,0.)).r-texture(uH,v-vec2(e,0.)).r, hy=texture(uH,v+vec2(0.,e)).r-texture(uH,v-vec2(0.,e)).r;
  o=vec4(clamp(.5-vec2(hx,hy)*2.2,0.,1.),texture(uH,v).r,texture(uW,v*2.).a);
}`,jr=S+`in vec2 vP; out vec4 o; uniform sampler2D uN; uniform vec4 uK[7];
// 0 sun dir,core 1 sky hi,cloud 2 sky low,on-water 3 sun rgb,mist 4 water rgb,treeline 5 cloud lit rgb,- 6 cloud dark,-
void main(){
  vec3 d=vec3(vP.x,1.-abs(vP.x)-abs(vP.y),vP.y);
  if(d.y<0.){ vec2 q=(1.-abs(d.zx))*vec2(d.x<0.?-1.:1.,d.z<0.?-1.:1.); d.x=q.x; d.z=q.y; }
  d=normalize(d);
  float under=step(d.z,0.);
  vec3 m=vec3(d.xy,abs(d.z));
  if(under>.5){ vec2 rp=d.xy/(m.z+.05)*.09; m.xy+=(texture(uN,rp).rg-.5)*.1*(.3+m.z); m=normalize(m); }
  float s=max(m.z,0.), h=pow(1.-s,3.2);
  vec3 sky=mix(uK[1].rgb,uK[2].rgb,h);
  float sd=max(dot(m,uK[0].xyz),0.);
  vec3 glow=uK[3].rgb*(pow(sd,5.)*.07+pow(sd,28.)*.17+pow(sd,300.)*.32);
  vec3 col=sky+glow;
  vec2 cu=m.xy/(m.z+.14)*.11;
  float cn=texture(uN,cu+.13).r*.62+texture(uN,cu*2.7+.4).g*.38;
  float cl=smoothstep(.42,.72,cn)*uK[1].w*smoothstep(.0,.1,s);
  vec3 cc=mix(uK[6].rgb,uK[5].rgb*(1.+glow),smoothstep(.45,.75,texture(uN,cu*1.3+.7).b)*.6+.3*h);
  col=mix(col,cc,cl);
  if(under>.5){
    float f=.12+.88*pow(1.-s,4.);
    col=col*f*.95+uK[4].rgb*(1.-f);
    float sp=smoothstep(.72,.8,texture(uN,d.xy/(m.z+.03)*.34).a);
    col+=uK[3].rgb*sp*pow(sd,18.)*.55;
  } else {
    float az=atan(d.x,d.y);
    float tl=uK[4].w*(.45+1.1*texture(uN,vec2(az*.31,.27)).r+.2*texture(uN,vec2(az*1.7,.61)).g);
    float tr=smoothstep(tl+.012,tl-.012,d.z);
    col=mix(col,mix(uK[6].rgb*.5+vec3(.012,.03,.03),sky*.8+glow*.25,uK[3].w),tr*.96);
  }
  o=vec4(sqrt(min(col*.25,1.)),1.);
}`,Zr=S+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec4 i1; layout(location=3) in vec4 i2; layout(location=4) in vec4 i3;
out vec2 vQ; out vec4 vT; out vec4 vB; out vec2 vS;
void main(){
  float py=i0.w<1.5?(a.y*.5+.5):a.y;
  vQ=vec2(a.x,py); vT=i2; vB=i3; vS=vec2(i1.z,i1.w);
  vec2 l=vec2(a.x*i1.x,py*i1.y); float c=cos(i0.z),s=sin(i0.z);
  gl_Position=vec4(i0.xy+vec2(c*l.x-s*l.y,s*l.x+c*l.y),0.,1.);
}`,Jr=S+`in vec2 vQ; in vec4 vT; in vec4 vB; in vec2 vS; out vec4 o; uniform sampler2D uN;
void main(){
  float k=vT.w,a; vec3 c;
  float u=vQ.x,v=vQ.y;
  float nz=texture(uN,vec2(u*.09,v*.3)+vS.x).r;
  if(k<.5){
    // a lotus petal: broad boat shape, widest below the middle, drawn out to a point; pale base deepening to the tip
    float pv=pow(clamp(v,0.001,.999),.8);
    float w=max(pow(sin(3.14159*pv),.75)*(1.-.4*v),.002);
    float sN=u/w; a=smoothstep(1.,.86,abs(sN))*step(.001,v)*step(v,.999);
    float cup=sqrt(max(1.-sN*sN,0.));
    float vn=sin(sN*31.+vS.x*40.+nz*3.)*.5+.5;
    c=mix(vB.rgb,vT.rgb,smoothstep(.3,1.,v+.22*abs(sN)));
    c*=(.42+.7*cup)*(.95+.07*vn)*(.92+.14*nz)*(.8+.25*v);
    c+=vT.rgb*.25*pow(1.-cup,3.);
  } else if(k<1.5){
    a=smoothstep(1.,.45,abs(u))*step(.001,v)*step(v,.999);
    c=mix(vB.rgb,vT.rgb,v)*(.62+.5*(1.-abs(u)))*(.85+.3*nz);
  } else if(k<2.5){
    float d=length(vec2(u,v));
    a=smoothstep(1.,.96,d);
    float th=atan(v,u);
    c=mix(vB.rgb,vT.rgb,d*d)*(.85+.2*sin(th*18.+vS.x*9.))*(.8+.4*nz);
    c+=vT.rgb*smoothstep(.86,.99,d)*.6;
  } else if(k>3.5){
    a=exp(-dot(vQ,vQ)*2.6)*.62; c=vec3(.002);
  } else {
    float d=length(vec2(u,v));
    a=smoothstep(1.,.86,d);
    float z=sqrt(max(1.-d*d,0.));
    c=mix(vB.rgb,vT.rgb,clamp(.5+.5*v-.2*u,0.,1.))*(.45+.8*z)*(.8+.5*nz);
    c+=vec3(.5,.42,.3)*pow(max(.3*v+.25*u+.9*z,0.),24.)*.5;
    a*=.93;
  }
  c*=vS.y;
  o=vec4(sqrt(min(c*.25,vec3(1.))),a);
}`,$r=S+sr+`in vec2 vP; out vec4 o; uniform sampler2D uE; uniform vec4 uK[4]; uniform int uC;
void main(){ vec3 c=vec3(0.); vec2 e=vec2(1.,0.); float TH=uK[0].w,rad=uK[1].w,lod=uK[2].w;
  vec2 vW=vec2(vP.x,vP.y-uK[3].x)*uK[3].y+vec2(0.,uK[3].x);
  for(int i=0;i<uC;i++){
    float rr=sqrt((float(i)+.5)/float(uC))*rad;
    e=mat2(-.7374,.6755,-.6755,-.7374)*e;
    vec2 n=vW+e*rr;
    vec3 rd=normalize(uK[2].xyz+uK[0].xyz*n.x*TH+uK[1].xyz*n.y*TH);
    vec3 s=textureLod(uE,oct(rd),lod).rgb; c+=s*s;
  }
  o=vec4(sqrt(c/float(uC)),1.);
}`,ea=S+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec4 i1; out vec2 vQ; out vec4 vC;
void main(){ vQ=a; vC=i1; gl_Position=vec4(i0.xy+a*i0.zw,0.,1.); }`,ta=S+`in vec2 vQ; in vec4 vC; out vec4 o; uniform vec2 uS;
void main(){ float d=length(vQ); float sd=dot(vQ,uS);
  float m=smoothstep(1.,.84,d)*(.5+.5*smoothstep(.4,.95,d)*(.55+.45*sd)+.18*sd); o=vec4(vC.rgb*m*vC.a,0.); }`,oa=S+`in vec2 vP; out vec4 o; uniform sampler2D uT,uN; uniform vec4 uK[12]; uniform int uR;
// 0 eye,TH 1 rt,Rc 2 up,rim 3 fw,px 4 sun,veinK 5 sunC,fork 6 sky,pap 7 albedo,sharpseed 8 sheen,- 9 vein rgb,- 10 navel rgb,-
void main(){
  vec3 E=uK[0].xyz; float TH=uK[0].w,Rc=uK[1].w;
  vec3 rd=uK[3].xyz+uK[1].xyz*vP.x*TH+uK[2].xyz*vP.y*TH;
  float A=dot(rd.xy,rd.xy),B=2.*(dot(E.xy,rd.xy)-Rc*rd.z),C=dot(E.xy,E.xy)-2.*Rc*E.z;
  float t=(-B+sqrt(max(B*B-4.*A*C,0.)))/(2.*A);
  vec3 X=E+rd*t;
  vec3 V=-normalize(rd);
  float r=length(X.xy),th=atan(X.y,X.x);
  vec4 nA=texture(uN,X.xy/43.+uK[7].w),nB=texture(uN,X.xy/7.3+.31),nC=texture(uN,X.xy/1.9+.71);
  float rim=uK[2].w+(texture(uN,vec2(th*.7,.13)).r-.5)*3.;
  float alpha=smoothstep(rim+.4,rim-.4,r);
  float ye=uK[11].x+(texture(uN,vec2(vP.x*.09+uK[7].w,.37)).r-.5)*uK[11].y-uK[11].z*vP.x*vP.x;
  alpha*=smoothstep(ye+.015,ye-.015,vP.y);
  // radial veins that fork, as a lotus leaf does
  float thw=th+(nA.r-.5)*.1*smoothstep(0.,10.,r)+(nB.g-.5)*.014;
  float k=uK[4].w/6.2832,fr=uK[5].w;
  float fa=fract(thw*k)-.5,da=abs(fa)/k*r,wa=.085+.0062*r,v1=exp(-da*da/(wa*wa));
  float fb=fract(thw*k*2.+.5)-.5,db=abs(fb)/(k*2.)*r,wb=.06+.0044*r,v2=exp(-db*db/(wb*wb))*smoothstep(fr*.75,fr*1.3,r);
  float fc=fract(thw*k*4.+.25)-.5,dc=abs(fc)/(k*4.)*r,wc=.04+.003*r,v3=exp(-dc*dc/(wc*wc))*smoothstep(fr*1.5,fr*2.3,r);
  vec2 Tg=vec2(-sin(th),cos(th));
  vec2 gv=Tg*(sign(fa)*v1*da/wa+sign(fb)*v2*db/wb*.7+sign(fc)*v3*dc/wc*.45);
  // the areole network, a much larger reading of the same cells
  vec4 ar=textureGrad(uT,X.xy/83.+.17,dFdx(X.xy)/83.,dFdy(X.xy)/83.);
  float arL=smoothstep(.34,.1,ar.b);
  // the papillae: a short relief march, so near bumps hide those behind
  float px=t*uK[3].w;
  float gr=max(-V.z*0.+V.z,.05);
  vec2 ts=vec2(1.,.56)/7.5;
  float lod=max(.5*log2(px*ts.x*512.*px*ts.y*512./gr),0.);
  vec2 sl=(-V.xy/gr)*ts*.075;
  vec2 uv=X.xy*ts;
  vec2 uv0=uv-sl*.0;
  float layer=1.; float dl=1./float(uR);
  vec2 cur=uv0+sl*.5;
  for(int i=0;i<uR;i++){
    float hh=textureLod(uT,cur,lod).b;
    if(hh<layer){ layer-=dl; cur-=sl*dl; }
  }
  vec4 tt=textureLod(uT,cur,lod);
  vec2 g2=textureLod(uT,X.xy*ts*.31+.37,lod-1.6).rg-.5;
  vec3 N0=vec3(-X.xy/Rc,1.)+vec3((nA.gb-.5)*.05+(nB.rb-.5)*.03+gv*.8+(ar.rg-.5)*.14+g2*.22,0.);
  vec3 N=normalize(N0+vec3((tt.rg-.5)*uK[6].w,0.));
  vec3 L=uK[4].xyz;
  float nv=max(dot(N,V),0.),nl=dot(N,L);
  float ao=mix(.3,1.,smoothstep(.02,.8,tt.b));
  float bloom=smoothstep(.1,.9,nA.a*.5+nB.b*.3+nC.r*.2);
  float vein=clamp(v1+v2*.75+v3*.45+arL*.16,0.,1.);
  vec3 alb=mix(uK[7].rgb,uK[9].rgb,vein*.72);
  alb=mix(alb,uK[8].rgb*.3,bloom*.16);
  alb*=.86+.16*nB.r+.14*nC.g;
  vec3 sky=uK[6].rgb*(.58+.42*N.z);
  float wrap=max(nl*.55+.45,0.);
  vec3 col=alb*(uK[5].rgb*wrap*.5+sky)*ao;
  float sh=pow(1.-nv,2.4);
  col+=uK[8].rgb*(sky*.7+uK[5].rgb*vec3(.16,.1,.1))*sh*(.3+.7*bloom)*(.45+.55*tt.b)*.66;
  vec3 Hh=normalize(L+V);
  col+=uK[5].rgb*pow(max(dot(N,Hh),0.),260.)*.05*tt.b;
  float gl=smoothstep(.68,.92,tt.b)*smoothstep(.74,.95,tt.a);
  col+=(uK[5].rgb*.55+sky)*gl*.42*(.3+.7*bloom);
  // the navel where the stalk joins: a pale dimple the veins leave from
  float nv2=smoothstep(3.1,1.7,r+(nB.g-.5)*.8);
  col=mix(col,uK[10].rgb*(uK[5].rgb*.32+sky)*(.72+.5*nC.r)*(.75+.25*smoothstep(.2,1.4,r)),nv2);
  // the far rim glows as the low sun comes through it
  col+=alb*uK[5].rgb*.9*smoothstep(rim-9.,rim,r);
  o=vec4(sqrt(min(col*.25,vec3(1.))),alpha);
}`,ra=S+`in vec2 vP; out vec4 o; uniform sampler2D uN; uniform vec4 uK[2];
// 0 dust rgb,amount 1 eye xz..: y-scale,-
void main(){ vec2 n=vec2(vP.x*.8/(uK[1].x-vP.y),1./(uK[1].x-vP.y))*uK[1].y;
  float a=texture(uN,n).r*.6+texture(uN,n*3.1+.3).g*.4; a=smoothstep(.22,.82,a)*uK[0].w;
  a*=smoothstep(uK[1].z+.02,uK[1].z-.1,vP.y)*smoothstep(-.85,-.25,vP.y);
  o=vec4(uK[0].rgb*a,a);
}`,aa=S+`layout(location=0) in vec2 a; layout(location=1) in vec4 i; out vec2 vQ; out vec2 vK;
void main(){ vQ=a*2.; vK=i.w>1.?vec2(i.w-2.,1.):vec2(i.w,0.); gl_Position=vec4(i.xy+a*i.z*2.,0.,1.); }`,na=S+`in vec2 vQ; in vec2 vK; out vec4 o; uniform sampler2D uN; uniform vec4 uK[3];
// 0 grain rgb,glint 1 sun,- 2 sky,-
void main(){
  vec2 q=vQ; float r=length(q);
  float n=texture(uN,q*.07+vK.x*7.3).r, n2=texture(uN,q*.19+vK.x*3.1).g;
  if(vK.y<.5){
    float rr=r*(1.+(n-.5)*.42);
    float a=smoothstep(1.,.8,rr);
    vec2 sq=q-vec2(.1,-.42);
    float sh=exp(-dot(sq,sq)*1.5)*.5;
    vec3 N=vec3(q,sqrt(max(1.-r*r,.0)));
    float lit=dot(N,normalize(vec3(-.25,.8,.6)))*.5+.5;
    vec3 gc=uK[0].rgb*mix(vec3(1.),vec3(1.1,1.3,2.2),fract(vK.x*7.13)*uK[1].w);
    vec3 c=gc*(uK[2].rgb*.75+uK[1].rgb*lit*lit*.75)*(.62+.66*n2);
    c+=uK[1].rgb*pow(max(lit,0.),14.)*uK[0].w*step(.45,fract(vK.x*13.7));
    float al=a+(1.-a)*sh;
    o=vec4(c*a,al);
  } else {
    float a=smoothstep(1.,.86,r);
    float z=sqrt(max(1.-r*r,0.));
    float low=smoothstep(.1,-.8,q.y)*smoothstep(1.,.55,r);
    float edge=pow(1.-z,2.);
    vec3 c=uK[2].rgb*(.12+.62*low)+uK[1].rgb*.1*low;
    vec2 hq=q-vec2(-.3,.42);
    c+=(uK[2].rgb+uK[1].rgb)*smoothstep(.16,.09,length(hq))*1.1;
    o=vec4(c*a,a*(.3+.5*edge));
  }
}`,sa=S+`in vec2 vP; out vec4 o; uniform sampler2D uS; uniform vec4 uK[2]; uniform int uC;
// 0 idA,idB,idf,K 1 radius mul,dead,max,sq
void main(){ vec2 uv=vP*.5+.5; float sq=uK[1].w;
  float id=uK[0].x+uK[0].y*vP.y;
  float dd=id-uK[0].z,cf=sqrt(dd*dd+uK[1].y*uK[1].y)-uK[1].y;
  float coc=min(uK[0].w*cf,uK[1].z)*uK[1].x;
  vec3 c=vec3(0.); float al=0.; vec2 e=vec2(1.,0.);
  for(int i=0;i<uC;i++){
    float rr=sqrt((float(i)+.5)/float(uC))*coc;
    e=mat2(-.7374,.6755,-.6755,-.7374)*e;
    vec4 s=textureLod(uS,uv+e*rr,0.);
    if(sq>.5){ c+=s.rgb*s.rgb*s.a; al+=s.a; } else { c+=s.rgb; al+=s.a; }
  }
  if(sq>.5){ float ign=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715)))); o=vec4(sqrt(c/max(al,.001))+(ign-.5)/255.,al/float(uC)); }
  else o=vec4(c,al)/float(uC);
}`,ca=S+"layout(location=0) in vec2 a; uniform mat3 uM; out vec3 vH; out vec2 vS; void main(){ vH=uM*vec3(a,1.); vS=a; gl_Position=vec4(a,0.,1.); }",ia=S+cr+`in vec3 vH; in vec2 vS; out vec4 o; uniform sampler2D uBg,uL,uP,uK,uW; uniform vec4 uG;
void main(){
  vec2 b=vH.xy/vH.z*.5+.5;
  vec3 g=texture(uBg,vS*.5+.5).rgb; g=g*g*4.;
  vec4 l=texture(uL,b); vec4 p=texture(uP,b); float m=texture(uK,b).r;
  vec3 c=mix(g,l.rgb*l.rgb*4.,l.a);
  c=c*(1.-p.a*m)+p.rgb*m;
  c*=1.-(1.-m)*.2*smoothstep(-.98,-.4,vS.y)*smoothstep(.16,-.2,vS.y);
  c*=uG.x*(1.-uG.y*dot(vS,vS));
  c=tone(c);
  c+=(texture(uW,gl_FragCoord.xy*uG.z).a-.5)*uG.w;
  o=vec4(c,1.);
}`,la=S+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec4 i1; uniform vec4 uC[5]; uniform vec4 uD[3];
out vec2 vQ; out vec3 vM;
void main(){
  float ar=max(i0.w,i1.x), Rc=uD[2].w;
  float hz=dot(i0.xy,i0.xy)/(2.*Rc);
  float air=max(i0.z-hz-i1.y*.97,0.);
  vec2 sd=uD[0].xy;
  float ext=ar*(5.2+air*.6);
  vec2 wxy=i0.xy+sd*ar*(1.4+air*.25)+a*ext;
  vQ=(wxy-i0.xy-(-uD[1].zw)*0.)/ar;
  vec3 q=vec3(wxy,hz+dot(wxy-i0.xy,i0.xy)/Rc)-uC[0].xyz;
  float zc=dot(q,uC[3].xyz);
  float dd=1./max(zc,1.)-uC[2].w;
  float coc=uC[1].w*(sqrt(dd*dd+uC[4].w*uC[4].w)-uC[4].w);
  float rn=ar/(max(zc,1.)*uC[0].w);
  vM=vec3(min(air/(ar*2.+1.),1.),coc/rn,ar);
  gl_Position=vec4(dot(q,uC[1].xyz)/uC[0].w,dot(q,uC[2].xyz)/uC[0].w,0.,zc);
}`,ua=S+`in vec2 vQ; in vec3 vM; out vec4 o; uniform vec4 uD[3];
// 0 shadow dir xy,caustic,shadow 1 sun rgb,- 2 silver rgb,Rc
void main(){
  vec2 sd=uD[0].xy; float u=dot(vQ,sd),v=dot(vQ,vec2(-sd.y,sd.x)),r=length(vQ);
  float air=vM.x,s=1.+vM.y*.9+air*2.;
  float s2=s*s;
  float ct=exp(-r*r/(.1*s2))/s2;
  float aoo=exp(-r*r/(1.05*s2))/s;
  float body=exp(-v*v/(.62*s2))*smoothstep(-.7,.5,u)*exp(-max(u,0.)/3.1)/s;
  float cau=exp(-((u-1.5)*(u-1.5)/(.34*s2)+v*v/(.022*s2)))/s2;
  float cr=exp(-pow(u-1.02+.34*v*v,2.)/(.018*s2))*smoothstep(1.05,.25,abs(v))/s;
  float ring=exp(-pow(r-.43,2.)/(.0035*s2))/s;
  float mir=exp(-((u-.52)*(u-.52)/(.05*s2)+v*v/(.2*s2)))/s;
  float ground=1.-air;
  float fade=1./(1.+vM.y*vM.y*3.5);
  float a=1.-clamp(((.96*ct+.55*aoo)*ground+.7*body)*fade,0.,.97);
  vec3 c=uD[1].rgb*(cau*2.3+cr*.6)*uD[0].z*mix(1.,.45,air);
  c+=uD[2].rgb*(ring*.75+mir*.3)*ground/(1.+vM.y*5.);
  o=vec4(c*fade,a);
}`,fa=S+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec4 i1; uniform vec4 uC[7];
out vec3 vRay; out vec3 vCn; out vec3 vAx; out vec4 vM; out float vPx;
void main(){
  vec3 q=i0.xyz-uC[0].xyz; float zc=max(dot(q,uC[3].xyz),.5),TH=uC[0].w;
  vec2 cn=vec2(dot(q,uC[1].xyz),dot(q,uC[2].xyz))/(zc*TH);
  float mx=max(i0.w,max(i1.x,i1.y)),rn=mx/(zc*TH);
  float dd=1./zc-uC[2].w;
  float coc=uC[1].w*(sqrt(dd*dd+uC[4].w*uC[4].w)-uC[4].w),e=coc/rn;
  float ext=rn*(1.+e)*1.08+uC[3].w*2.;
  vec2 n=cn+a*ext;
  gl_Position=vec4(n,0.,1.);
  vRay=uC[3].xyz+uC[1].xyz*n.x*TH+uC[2].xyz*n.y*TH;
  vCn=i0.xyz; vAx=vec3(i0.w,i1.x,i1.y);
  vM=vec4(e,i1.z,i1.w,log2(1.+e*5.));
  vPx=uC[3].w/rn*.8;
}`,va=S+sr+cr+`in vec3 vRay; in vec3 vCn; in vec3 vAx; in vec4 vM; in float vPx; out vec4 o;
uniform sampler2D uE,uL,uLT; uniform vec4 uC[7]; uniform vec4 uD[11];
// uD 0 eye0,TH0 1 rt0,Rc 2 up0,rim 3 fw0,- 4 sun,core 5 sunC,exp 6 down view,veinK/2pi,fork,lens gain 7 vein rgb,- 8 air film,sky gain 9 leaf avg,- 10 water tint,-
vec3 toW(vec3 v){ return uC[4].xyz*v.x+uC[5].xyz*v.y+uC[6].xyz*v.z; }
void main(){
  vec3 rd=normalize(vRay);
  vec3 ro=uC[0].xyz-vCn;
  vec3 O=ro/vAx,D=rd/vAx;
  float A=dot(D,D),B=dot(O,D);
  vec3 Pc=O-D*(B/A);
  float rr=length(Pc),e=vM.x;
  float eo=max(vPx,e),ei=max(vPx,min(e,.98));
  float alpha=smoothstep(1.+eo,1.-ei,rr)/(1.+e*e*.42)*mix(1.,.5,smoothstep(.1,.5,e));
  if(rr>.992) Pc*=.992/rr;
  float hz=sqrt(max(1.-dot(Pc,Pc),0.));
  vec3 p1=Pc-D/sqrt(A)*hz;
  vec3 P1=p1*vAx;
  vec3 Np=p1/vAx;
  vec3 N=normalize(Np/length(Np)+vec3(sin(p1.y*7.+vM.z),sin(p1.x*6.-vM.z*1.3),0.)*vM.y);
  float ci=max(dot(-rd,N),0.);
  float F=.02+.98*pow(1.-ci,5.);
  vec3 d1=refract(rd,N,.7519);
  vec3 q=d1/vAx;
  float t2=-2.*dot(p1,q)/dot(q,q);
  vec3 P2=P1+d1*t2;
  vec3 N2=normalize(P2/(vAx*vAx));
  float c2=dot(d1,N2),kk=1.-1.7689*(1.-c2*c2);
  vec3 d2=kk<0.?reflect(d1,N2):normalize(1.33*d1+(sqrt(max(kk,0.))-1.33*c2)*N2);
  // where the ray goes after it leaves: the leaf dish, or the world
  float Rc=uD[1].w,rim=uD[2].w;
  vec3 X=vCn+P2+d2*.01;
  float qa=max(dot(d2.xy,d2.xy),1e-4),qb=2.*(dot(X.xy,d2.xy)-Rc*d2.z),qc=min(dot(X.xy,X.xy)-2.*Rc*X.z,-.01);
  float tl=(-qb+sqrt(max(qb*qb-4.*qa*qc,0.)))/(2.*qa);
  vec3 Xh=X+d2*tl;
  float onLeaf=smoothstep(rim+9.+e*60.,rim-9.-e*60.,length(Xh.xy));
  vec3 q0=Xh-uD[0].xyz;
  float z0=dot(q0,uD[3].xyz);
  vec2 n0=vec2(dot(q0,uD[1].xyz),dot(q0,uD[2].xyz))/(max(z0,.5)*uD[0].w);
  vec2 lu=n0*.5+.5;
  float inB=step(.5,z0)*smoothstep(1.,.97,max(abs(n0.x),abs(n0.y)));
  vec4 ls=textureLod(uL,lu,0.);
  float dn=uD[6].x;
  vec3 lt=textureLod(uLT,Xh.xy/125.+.5,vM.w+1.5*dn).rgb; lt=lt*lt*4.;
  vec3 lc=mix(uD[9].rgb,ls.rgb*ls.rgb*4.,inB*ls.a);
  // seen from above the lens magnifies the veins right behind it: drawn from where the ray lands
  float lr=length(Xh.xy),lth=atan(Xh.y,Xh.x),vk=uD[6].y;
  float fa=fract(lth*vk)-.5,da=abs(fa)/vk*lr,wa=.085+.0062*lr;
  float fb=fract(lth*vk*2.+.5)-.5,db=abs(fb)/(vk*2.)*lr,wb=.06+.0044*lr;
  float fc=fract(lth*vk*4.+.25)-.5,dc=abs(fc)/(vk*4.)*lr,wc=.04+.003*lr;
  float vv=exp(-da*da/(wa*wa))+.75*exp(-db*db/(wb*wb))*smoothstep(uD[6].z*.75,uD[6].z*1.3,lr)+.6*exp(-dc*dc/(wc*wc));
  vv*=smoothstep(1.7,3.1,lr)*smoothstep(8.*vAx.x,2.*vAx.x,tl)*dn;
  lt=mix(lt,uD[7].rgb,min(vv,1.)*.85);
  lt=mix(vec3(dot(lt,vec3(.3,.5,.2))),lt,.8)*mix(mix(.34,.85,dn),1.,smoothstep(0.,mix(6.,1.2,dn)*vAx.x,tl))*mix(1.,uD[6].w,dn);
  lc=mix(lt,lc,smoothstep(26.,80.,tl)*.5+.1);
  // the silver air film under the drop mirrors the sky when the ray meets it close by
  float near=exp(-tl/(mix(.3,1.,dn)*vAx.x))*onLeaf*step(d2.z,0.);
  vec3 dE=onLeaf*near>.02?vec3(d2.xy,abs(d2.z)):d2;
  vec3 dEw=toW(dE);
  vec3 ec=textureLod(uE,oct(dEw),vM.w+3.5*dn*step(.02,onLeaf*near)).rgb; ec=ec*ec*4.*(.5+.5*smoothstep(.0,.11,abs(dEw.z)));
  vec3 tc=mix(ec*.66,lc,onLeaf);
  tc=mix(tc,mix(ec,uD[8].xyz,.6*dn)*vec3(.9,.95,1.)*1.05,near*mix(.62,.35,dn));
  // the low sun, focused and inverted by the lens
  vec3 d2w=toW(d2),S=uD[4].xyz;
  tc+=uD[5].rgb*(pow(max(dot(d2w,S),0.),420.)*uD[4].w*(1.-onLeaf*.8));
  tc*=uD[10].rgb;
  float zn=p1.z;
  tc=mix(tc,mix(uD[9].rgb*mix(.82,1.25,dn),ec*.5+uD[10].rgb*.2,smoothstep(.12,-.7,zn)),smoothstep(.12,.55,e));
  // the surface itself: sky on the rim, a sharp window of light
  vec3 R=reflect(rd,N),Rw=toW(R);
  vec3 rc=textureLod(uE,oct(Rw),vM.w+.8).rgb; rc=rc*rc*4.;
  rc=mix(rc,uD[9].rgb*.9+rc*.1,smoothstep(.02,-.14,R.z));
  // the open sky mirrored as a pale crescent along the upper rim, brighter toward the sun; out of focus it widens and dims
  float es=.07+e*.7+vPx*.5,sw=max(dot(Rw,S),0.);
  float skyM=smoothstep(.05-es,.4+es,Rw.z)*(.5+.7*sw*sw);
  // seen from above, the sun's own image: a small hard point just inside the far rim, held round against the rim's foreshortening
  vec3 Hl=normalize(vec3(dot(uC[4].xyz,S),dot(uC[5].xyz,S),dot(uC[6].xyz,S))-rd);
  vec3 dg=P1-vAx*vAx*Hl/length(vAx*Hl); dg-=rd*dot(dg,rd);
  float sunP=exp(-dot(dg,dg)/(vAx.x*vAx.x*(.004+e*e*.5)));
  float sunG=(mix(pow(sw,60./(1.+e*30.))*.6,sunP*2.2,dn)+pow(sw,9.)*.11)*uD[4].w/(1.+e*14.);
  vec3 col=tc*(1.-F)+rc*F;
  col+=(rc*uD[8].w*skyM*F*(F*3.+.5)+uD[5].rgb*sunG*(F+.4))/(1.+e*e*1.6);
  col=tone(col*uD[5].w);
  o=vec4(col*alpha,alpha);
}`,da=S+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec2 i1; uniform vec4 uC[5]; out vec2 vQ; out vec2 vS;
void main(){
  vec3 q=i0.xyz-uC[0].xyz; float zc=max(dot(q,uC[3].xyz),.5),TH=uC[0].w;
  vec2 cn=vec2(dot(q,uC[1].xyz),dot(q,uC[2].xyz))/(zc*TH);
  vQ=a; vS=i1; gl_Position=vec4(cn+a*max(i0.w/(zc*TH),uC[3].w*.8),0.,1.);
}`,ma=S+`in vec2 vQ; in vec2 vS; out vec4 o; uniform vec3 uC0;
void main(){ float d=length(vQ); float a=smoothstep(1.,.45,d)*vS.y; o=vec4(uC0*vS.x*a,a); }`,pa=S+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec2 i1; uniform vec4 uK[4];
out vec2 vW; flat out vec4 vSeg; flat out vec3 vI;
void main(){
  vec2 d=i0.zw-i0.xy; float l=length(d); d=l>1e-4?d/l:vec2(1.,0.); vec2 n=vec2(-d.y,d.x);
  vec2 w0=(a.x<0.?i0.xy:i0.zw);
  float zc0=max(dot(vec3(w0,dot(w0,w0)/(2.*uK[0].x))-uK[1].xyz,vec3(uK[0].yzw)),1.);
  float dd=1./zc0-uK[1].w;
  float sfr=uK[3].w*(sqrt(dd*dd+.0000202)-.0045)/(i1.x/(zc0*uK[2].w));
  sfr=min(sfr,4.);
  vec2 w=w0+(d*a.x+n*a.y)*i1.x*(1.4+sfr*1.1);
  vW=w; vSeg=i0;
  vec3 q=vec3(w,dot(w,w)/(2.*uK[0].x))-uK[1].xyz;
  // uK 0 Rc,fw 1 eye,idf 2 rt,TO 3 up,coc scale
  float zc=dot(q,vec3(uK[0].yzw));
  vI=vec3(i1,sfr);
  gl_Position=vec4(dot(q,uK[2].xyz)/uK[2].w,dot(q,uK[3].xyz)/uK[2].w,0.,zc);
}`,ha=S+`in vec2 vW; flat in vec4 vSeg; flat in vec3 vI; out vec4 o; uniform sampler2D uN;
void main(){
  vec2 pa=vW-vSeg.xy,ba=vSeg.zw-vSeg.xy;
  float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-6),0.,1.);
  float d=length(pa-ba*h)/vI.x;
  float n=texture(uN,vW*.31).r;
  float sf=vI.z;
  float a=smoothstep(1.+sf+.3*(n-.5),.62-min(sf,.6)+.3*(n-.5),d)*vI.y/(1.+sf*.8);
  o=vec4(0.,0.,0.,a);
}`,xa=S+"out vec4 o; uniform vec4 uC; void main(){ o=uC; }";function ya(m){let e=ar.get(m);if(e)return e;e={P:{}};const Q={noise:[qe,Wr],dome:[Yr,Gr],tn:[qe,Qr],env:[qe,jr],spr:[Zr,Jr],bg:[qe,$r],disc:[ea,ta],leaf:[qe,oa],haze:[qe,ra],gr:[aa,na],blur:[qe,sa],comp:[ca,ia],shd:[la,ua],drop:[fa,va],spk:[da,ma],st:[pa,ha],fill:[qe,xa]},ae={},l=($,X)=>{const te=$+X;if(ae[te])return ae[te];const o=m.createShader($);return m.shaderSource(o,X),m.compileShader(o),ae[te]=o,o};for(const $ in Q){const X=m.createProgram();m.attachShader(X,l(m.VERTEX_SHADER,Q[$][0])),m.attachShader(X,l(m.FRAGMENT_SHADER,Q[$][1])),m.linkProgram(X),e.P[$]={p:X,u:{}}}m.flush(),e.ready=()=>{e.ready=null;for(const $ in Q){const X=e.P[$],te=X.p;if(!m.getProgramParameter(te,m.LINK_STATUS)){console.error("171 link "+$+": "+m.getProgramInfoLog(te));for(const C of m.getAttachedShaders(te)){const ce=m.getShaderInfoLog(C);ce&&console.error("171 "+$+": "+ce)}}const o=m.getProgramParameter(te,m.ACTIVE_UNIFORMS)||0;for(let C=0;C<o;C++){const ce=m.getActiveUniform(te,C),Ue=ce.name.replace(/\[0\]$/,"");X.u[Ue]=m.getUniformLocation(te,ce.name)}}};const xe=m.createBuffer();m.bindBuffer(m.ARRAY_BUFFER,xe),m.bufferData(m.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),m.STATIC_DRAW),e.quad=xe;const Ie=m.createVertexArray();return m.bindVertexArray(Ie),m.enableVertexAttribArray(0),m.vertexAttribPointer(0,2,m.FLOAT,!1,0,0),m.bindVertexArray(null),e.vq=Ie,ar.set(m,e),e}const Se=(m,e)=>{let Q=0;for(const l of e)Q+=l[1];let ae=m()*Q;for(const l of e)if(ae-=l[1],ae<=0)return l[0];return e[0][0]},G=(m,e)=>m[0]*e[0]+m[1]*e[1]+m[2]*e[2],vo=(m,e)=>[m[1]*e[2]-m[2]*e[1],m[2]*e[0]-m[0]*e[2],m[0]*e[1]-m[1]*e[0]],dt=m=>{const e=Math.hypot(m[0],m[1],m[2])||1;return[m[0]/e,m[1]/e,m[2]/e]};rr.add({num:171,name:"Lotus Leaf",fam:"Worlds",recipe:"A close look at a lotus leaf at dawn, where water beads into round drops that hold the flower upside down and roll off almost without friction, picking up the pollen as they go. The leaf and how many drops there are change every mint. Tap to drop a bead of water, drag to tilt the leaf and send everything rolling, or hold for a light rain.",interactive:"Tap to drop a bead of water. Drag to tilt the leaf and send every drop rolling. Hold for a light rain.",music:!0,gl:!0,fps:30,seed:0,make(m){const e=m.gl,Q=m.size,ae=ya(e),l=ae.P,xe=m.hash.replace(/^0x/,"");let Ie=parseInt(xe.slice(0,8),16)|0,$=parseInt(xe.slice(8,16),16)|0,X=parseInt(xe.slice(16,24),16)|0,te=parseInt(xe.slice(24,32),16)|0;const o=()=>{Ie|=0,$|=0,X|=0,te|=0;const t=(Ie+$|0)+te|0;return te=te+1|0,Ie=$^$>>>9,$=X+(X<<3)|0,X=X<<21|X>>>11,X=X+t|0,(t>>>0)/4294967296};for(let t=0;t<12;t++)o();const C=!!m.home;let ce=Se(o,[["blue-green",52],["deep green",36],["young bronze-pink",12]]),Ue=Se(o,[["pink",55],["white",33],["none, reeds",12]]),Xt=Se(o,[["dawn",55],["overcast",31],["after-storm",14]]),Oe=Se(o,[["pollen gold",52],["dust grey",36],["ash",12]]),mo=Se(o,[["leaf above water",55],["leaf on water",45]]),Je=Se(o,[["scattered beads",50],["heavy dew",36],["one great pearl",14]]),po=Se(o,[["none",88],["a fallen petal",12]]);C&&(ce="blue-green",Ue="pink",Xt="dawn",Oe="pollen gold",mo="leaf above water",Je="scattered beads",po="none");const Ce=t=>t[0].toUpperCase()+t.slice(1);m.trait("Leaf",Ce(ce)),m.trait("Flower behind",Ce(Ue)),m.trait("Light",Ce(Xt)),m.trait("Dust",Ce(Oe)),m.trait("Pond",Ce(mo)),m.trait("Dew",Ce(Je)),m.trait("Petal",Ce(po));let He=625341585;for(let t=0;t<xe.length;t++)He^=xe.charCodeAt(xe.length-1-t),He=Math.imul(He,16777619);const Xe=()=>{He=He+1831565813|0;let t=Math.imul(He^He>>>15,1|He);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let Pt=Se(Xe,[["low in the dish",38],["pearl off-centre",24],["eye level with the bead",22],["looking down the veins",16]]);const ba=Xe()<.5?-1:1;C&&(Pt="low in the dish");let ho=Se(Xe,[["one pearl",68],["a cluster of pearls",32]]);C&&(ho="one pearl"),m.trait("View",Ce(Pt)),m.trait("Drops",Ce(ho));const j=Xt==="overcast",oe=Xt==="after-storm",ir=C?-.3:-.5+o(),xo=j?.6:oe?.1:.17,V=dt([Math.sin(ir)*Math.cos(xo),Math.cos(ir)*Math.cos(xo),Math.sin(xo)]),k=j?[.36,.36,.4]:oe?[3.2,1.75,.95]:[2.5,1.62,1.12],yo=j?[.3,.31,.36]:oe?[.1,.13,.22]:[.15,.17,.3],bo=j?[.46,.43,.45]:oe?[.62,.3,.16]:[.56,.32,.33],mt=mo==="leaf on water",wo=mt?[.1,.15,.19]:[.008,.022,.026],Ao=j?1.05:1,le=j?[.46,.47,.5]:oe?[.2,.2,.26]:[.42,.36,.42],pt=C?0:(o()-.5)*3.5,go=C?6.3:5.5+o()*1.6,Ro=Pt==="looking down the veins",lr=Pt==="eye level with the bead",wa=Pt==="pearl off-centre",E=Ro?[pt,-22,go*2.4]:lr?[pt,-27,go*.55]:[pt,-30,go],$e=[pt*.6+(C?.7:(o()-.5)*8),0,2.4-.9+(C?0:(o()-.5)*1.4)];wa&&($e[0]=pt*.6+ba*(6+Math.abs($e[0]-pt*.6)*.3)),Ro?$e[2]-=2.5:lr&&($e[2]+=.5);const W=.404,re=W*J,M=dt([$e[0]-E[0],$e[1]-E[1],$e[2]-E[2]+1.5]),I=dt(vo(M,[0,0,1])),U=vo(I,M),Fo=1/((t,n,a)=>(t-E[0])*M[0]+(n-E[1])*M[1]+(a-E[2])*M[2])(0,0,2),Eo=3,ur=.0045,Vt=G([0,0,1],M)===0?0:-M[2]/Math.hypot(M[0],M[1])/W,_t=60,fr=(t,n)=>(t*t+n*n)/(2*ke),ge=(t,n)=>{const a=M[0]+I[0]*t*W+U[0]*n*W,f=M[1]+I[1]*t*W+U[1]*n*W,s=M[2]+I[2]*t*W+U[2]*n*W;if(s>-.012)return[E[0]+a*180,150,0];const i=-E[2]/s;return[E[0]+a*i,E[1]+f*i,i]};let Me=2654435769;for(let t=0;t<xe.length;t++)Me^=xe.charCodeAt(t),Me=Math.imul(Me,16777619);const ee=()=>{Me=Me+1831565813|0;let t=Math.imul(Me^Me>>>15,1|Me);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Aa=()=>{const t=new Uint8Array(262144),n=new Uint32Array(t.buffer);{let u=o()*4294967296>>>0||1;for(let v=0;v<n.length;v++)u^=u<<13,u^=u>>>17,u^=u<<5,n[v]=u>>>0}const a=64,f=new Float32Array(a*a*4);for(let u=0,v=0;u<a;u++)for(let d=0;d<a;d++)f[v++]=(d+.5+(o()-.5)*.62+u%2*.5)/a,f[v++]=(u+.5+(o()-.5)*.62)/a,f[v++]=(.5+o()*.34)/a,f[v++]=.45+o()*.55;const s=[],i=(u,v)=>{const d=1/(1+Math.abs(u)+Math.abs(v));return[u*d,v*d,d]},p=(u,v,d,b,A,D,T,q,Y)=>{const se=i(u,v);let pe=se[0],Be=se[1],Ne=d,je=A*se[2],ft=D*se[2];if(b<1.5){const we=i(u-Math.sin(d)*D,v+Math.cos(d)*D),vt=we[0]-pe,Ae=we[1]-Be;Ne=Math.atan2(-vt,Ae),ft=Math.hypot(vt,Ae),je=A*.5*(se[2]+we[2])}s.push(pe,Be,Ne,b,je,ft,o(),Y===void 0?1:Y,T[0],T[1],T[2],b,q[0],q[1],q[2],0)},c=j?.62:oe?.85:1,h=(u,v,d,b,A,D,T,q)=>{const Y=q?-1:1,se=(T||1)*c*(q?.55:1),pe=D>.5?[[2,1.55,.74,.34,.62],[5,.95,.96,.34,.72],[5,.5,.92,.36,.86],[3,.15,.8,.36,.96],[5,.95,.5,.4,1.06]]:[[5,.32,1,.34,.85],[3,.15,1,.36,1]];q||p(u,v,0,1,d*.042,-v-.5,[.13,.24,.12],[.06,.12,.07],se);for(let Be=0;Be<pe.length;Be++){const[Ne,je,ft,we,vt]=pe[Be];if(Be===4&&D>.5){for(let Ae=0;Ae<18;Ae++){const Le=(o()-.5)*1.5;p(u+Math.sin(Le)*d*.12,v+d*.03*Y,-Le*Y,1,d*.016,d*(.38+o()*.1)*Y,[1.3,.92,.25],[.9,.62,.18],se*1.2)}p(u,v+d*.4*Y,0,3,d*.17,d*.08,[1.05,.88,.22],[.6,.62,.14],se*1.25)}for(let Ae=0;Ae<Ne;Ae++){const Le=Ne>1?Ae/(Ne-1)*2-1:0,Tt=Le*je+(o()-.5)*.08,Wa=d*ft*(.9+o()*.16)*(1-.12*Math.abs(Le));p(u+Math.sin(Tt)*d*.1,v+d*.02*Y,-Tt*Y,0,d*we*ft*(.9+o()*.2),Wa*Y,b,A,se*vt*(.74+o()*.32+.34*Math.sin(Tt)*(V[0]<u?-1:1)))}}},y=(u,v,d,b,A)=>p(u,v,0,2,d,b,[A[0]*1.7,A[1]*1.7,A[2]*1.7],A,c),r=[.04,.1,.085],x=mt?14:9;for(let u=0;u<x;u++){const v=(o()-.5)*1.5,d=o();y(v,mt?-.012-d*d*.22:-.03-d*d*.24,.07+d*d*.3,.011+d*d*.07,r)}const g=Ue==="none, reeds",w=g?46:0;for(let u=0;u<w;u++){const v=g?(o()-.5)*1:(o()<.5?-1:1)*(.3+o()*.35),d=g?.28+o()*.36:.16+o()*.2,b=[.34,.4,.16],A=[.05,.1,.06];p(v,-.03,(o()-.5)*.22,1,.0035+o()*.004,d,b,A,c*.9)}const O=C?1:o()<.5?-1:1;if(g)h(O*.34,.04,.05,[.7,.2,.34],[.85,.65,.58],0,.6);else{const u=Ue==="pink"?[.7,.12,.3]:[.8,.74,.74],v=Ue==="pink"?[.86,.52,.52]:[.14,.18,.11],d=O*(C?.2:.12+o()*.16),b=.14;mt&&h(d,-.012-b,.54,u,v,1,.9,!0),h(d*-1.9,.05,.075,u,v,0,.75),h(d,b,.54,u,v,1,1)}const H=[];for(let u=0;u<16;u++){const v=(o()-.5)*2.1,d=Vt-.03-o()*o()*.22,b=.008+o()*o()*.03,A=o(),D=Math.abs(v*W-V[0]),T=Math.exp(-D*D*3.5)*(j?.25:1);H.push(v,d,b,b,k[0],k[1]*.9,k[2]*.8,(.003+.08*A*A*A)*T)}const N=19+Math.floor(o()*6),ne=10+o()*5,z=o();let R=null;if(po!=="none"){const u=o()<.5?-1:1,v=ge(u*(.6+o()*.22),-.58-o()*.2),d=(u>0?2.2:.94)+(o()-.5)*.8,b=10+o()*4,A=b*.3,D=(vt,Ae)=>{const Le=[vt-E[0],Ae-E[1],fr(vt,Ae)+.3-E[2]],Tt=Math.max(G(Le,M),1);return[G(Le,I)/(Tt*re),G(Le,U)/(Tt*re)]},T=Math.cos(d),q=Math.sin(d),Y=D(v[0],v[1]),se=D(v[0]+T*b,v[1]+q*b),pe=D(v[0]+T*b*.45-q*A,v[1]+q*b*.45+T*A),Be=D(v[0]+T*b*.45,v[1]+q*b*.45),Ne=se[0]-Y[0],je=se[1]-Y[1],ft=Math.max(Math.hypot(pe[0]-Be[0],pe[1]-Be[1]),Math.hypot(Ne,je)*.16),we=Ue==="white"?[[.44,.42,.41],[.34,.36,.24]]:[[.62,.1,.26],[.72,.5,.46]];R=[Y[0],Y[1],Math.atan2(-Ne,je),0,ft,Math.hypot(Ne,je),o(),j?.5:.78,we[0][0],we[0][1],we[0][2],0,we[1][0],we[1][1],we[1][2],0]}const P=[];for(let u=0;u<24;u++){const v=(o()-.5)*2.4,d=u%3>0,b=d?Vt-.08-o()*.3:-.72-o()*.5,A=o(),D=(d?.009+A*.014:.025+A*A*.11)/J,T=o(),q=Math.abs(v*W-V[0]),Y=Math.exp(-q*q*3)*(j?.3:1);P.push(v/J,b/J,D,D,k[0],k[1]*.9,k[2]*.85,(d?.012*(.3+T*T*2.2):.004*(.5+T*T*2)*(.6+.4*Math.min(1,.05/D)))*Y)}return{white:t,dome:f,spA:new Float32Array(s),nSp:s.length/16,discA:new Float32Array(H),nDisc:H.length/8,veinK:N,fork:ne,leafSeed:z,hsp:R&&new Float32Array(R),glintA:new Float32Array(P),nGlint:P.length/8}},vr=()=>{const t=C?1:ee()<.5?-1:1,n=C?1.02:.8+ee()*.45,a=C?ge(.42,-.32):ge(t*(.3+ee()*.3),-.2-ee()*.16);{const z=Math.hypot(a[0],a[1]),R=Math.max(1,8/Math.max(z,.1));a[0]*=R,a[1]*=R}const f=ge(t*1.22,C?-.2:-.1-ee()*.14),s=n*1.25,i=[];for(let z=0;z<=48;z++){const R=z/48,P=(1-R)*(1-R),u=2*R*(1-R),v=R*R,d=(f[0]+a[0])*.4,b=(f[1]+a[1])*.4;i.push(P*f[0]+u*d+v*a[0],P*f[1]+u*b+v*a[1])}const p=(z,R)=>{const P=[z-E[0],R-E[1],fr(z,R)-E[2]],u=Math.max(G(P,M),1);return[G(P,I)/(u*re),G(P,U)/(u*re),1/(u*re)]},c=15e3,h=320,y=new Float32Array((c*2+h+1200)*4),r=2/Q/J,x=o()*9,g=o()*9;let w=0,O=0,H=0;for(let z=0;z<c;z++){let R=(o()-.5)*2.5,P=z%5<3?-.3+(o()-o())*.42:-1.25+o()*o()*1.75;const u=z>0&&o()<.14;let v;if(u){v=[O+(o()-.5)*.9,H+(o()-.5)*2.2];const D=[v[0]-E[0],v[1]-E[1],-E[2]],T=G(D,M);if(T<2)continue;R=G(D,I)/(T*W),P=G(D,U)/(T*W),v[2]=T}else v=ge(R,P);const d=.52+.48*Math.sin(v[0]*.17+x)*Math.sin(v[1]*.13+g);if(o()>d+.24||o()<Math.min(.94,Math.max(0,(-.42-P)*2.2)))continue;O=v[0],H=v[1];const b=(.016+o()*o()*.05)*(Oe==="ash"?1.25:1),A=Math.max(b/(v[2]*re),r*.7);if(y[w*4]=R/J,y[w*4+1]=P/J,y[w*4+2]=A,y[w*4+3]=o(),w++,ee()<.22)for(let D=1+Math.floor(ee()*4);D>0;D--){const T=ee()*6.283,q=A*(1.4+ee()*1.6);y[w*4]=R/J+Math.cos(T)*q,y[w*4+1]=P/J+Math.sin(T)*q*.6,y[w*4+2]=A*(.45+ee()*.4),y[w*4+3]=ee(),w++}}for(let z=2;z<48;z++){const R=i[z*2],P=i[z*2+1],u=i[z*2+2]-R,v=i[z*2+3]-P,d=Math.hypot(u,v)||1;for(let b=0;b<22;b++){const A=b%2?1:-1,D=s*(1.05+ee()*ee()*1.4),T=ee(),q=p(R+u*T-v/d*D*A,P+v*T+u/d*D*A);y[w*4]=q[0],y[w*4+1]=q[1],y[w*4+2]=Math.max((.014+ee()*ee()*.036)*q[2],r*.7),y[w*4+3]=ee(),w++}}for(let z=0;z<h;z++){const R=(o()-.5)*2.5,P=-1.25+o()*o()*1.72,u=ge(R,P),v=.03+o()*o()*o()*.2;y[w*4]=R/J,y[w*4+1]=P/J,y[w*4+2]=Math.max(v/(u[2]*re),r*.7),y[w*4+3]=2+o()*.999,w++}const N=C?3.25:Je==="one great pearl"?4.1:oe?3+o()*.7:2+o()*1.5;let ne;{const z=C?5:3+Math.floor(o()*4),R=[];let P=1;for(let u=0;u<z;u++){const v=u===0,d=u===1?-.62:u===2?3.4:0;let b=v?-1.95+(C?0:(o()-.5)*1.2):d?d+(o()-.5)*.3:o()*6.283,A=v?26:d?15+o()*6:9+o()*18;const D=(o()-.5)*.014+(v?-.004:0),T=v?.72+o()*.2:d?.55+o()*.2:.3+o()*.34;let q=Math.cos(b)*A,Y=Math.sin(b)*A;for(;A>1&&R.length<1400*6;){v&&(P=.75+.55*Math.min(1,A/12)),b+=D*(1+.4*Math.sin(A*.4+u)),A-=.4;const se=Math.cos(b)*A,pe=Math.sin(b)*A;pe>-17&&pe<11&&R.push(q,Y,se,pe,P*T*(.86+.14*Math.sin(A*1.7+u*2)),.9),q=se,Y=pe}}R.push(0,0,.01,0,N*.72,1);for(let u=0;u<48;u++)R.push(i[u*2],i[u*2+1],i[u*2+2],i[u*2+3],s*(.92+.1*Math.sin(u*.7)),1);ne=new Float32Array(R)}return{lane:i,laneB:a,laneW:s,runR:n,grains:y,gn:w,pa:x,pb:g,pearlR0:N,segA:ne,st:[Ie,$,X,te,Me]}},Wt=m.hash+(C?" h ":" m ")+Q,ye=Ze.get(Wt);ye&&(Ze.delete(Wt),Ie=ye.B.st[0],$=ye.B.st[1],X=ye.B.st[2],te=ye.B.st[3],Me=ye.B.st[4]);const ze=ye?ye.A:Aa();let ht=ye?ye.B:ae.ready?vr():null;ae.ready&&ae.ready();const{white:ga,dome:Ra,veinK:Mo,fork:zo,leafSeed:dr}=ze,Re=(t,n,a,f)=>{const s=e.createTexture();e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s);const i=f&&f.mip;i?e.texStorage2D(e.TEXTURE_2D,Math.floor(Math.log2(Math.max(t,n)))+1,e.RGBA8,t,n):e.texStorage2D(e.TEXTURE_2D,1,f&&f.fmt||e.RGBA8,t,n),a&&e.texSubImage2D(e.TEXTURE_2D,0,0,0,t,n,e.RGBA,e.UNSIGNED_BYTE,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const p=f&&f.rep?e.REPEAT:e.CLAMP_TO_EDGE;return e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,p),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,p),s},De=t=>{const n=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),n},K=(t,n,a)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,n),a&&e.uniform1i(a,t)},Te=()=>{e.bindVertexArray(ae.vq),e.drawArrays(e.TRIANGLE_STRIP,0,4)},Ve=(t,n,a)=>{const f=e.createVertexArray();return e.bindVertexArray(f),e.bindBuffer(e.ARRAY_BUFFER,ae.quad),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,t),n.forEach((s,i)=>{e.enableVertexAttribArray(i+1),e.vertexAttribPointer(i+1,s[0],e.FLOAT,!1,a,s[1]),e.vertexAttribDivisor(i+1,1)}),e.bindVertexArray(null),f};e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0);const Do=Re(256,256,ga,{rep:1}),Pe=Re(256,256,null,{rep:1,mip:1});let et=De(Pe);e.viewport(0,0,256,256),e.useProgram(l.noise.p),K(0,Do,l.noise.u.uW),Te(),e.bindTexture(e.TEXTURE_2D,Pe),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(et);const mr=64,To=Re(512,512,null,{rep:1}),Po=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Po),e.bufferData(e.ARRAY_BUFFER,Ra,e.STATIC_DRAW);const pr=Ve(Po,[[4,0]],16);et=De(To),e.viewport(0,0,512,512),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(l.dome.p),e.enable(e.BLEND),e.blendEquation(e.MAX),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(pr);for(const t of[[0,0],[-1,0],[0,-1],[-1,-1]])e.uniform2f(l.dome.u.uO,t[0],t[1]),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,mr*mr);e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND);const Yt=Re(512,512,null,{rep:1,mip:1}),Fa=De(Yt);e.useProgram(l.tn.p),K(0,To,l.tn.u.uH),K(1,Do,l.tn.u.uW),Te(),K(0,Yt),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(et),e.deleteFramebuffer(Fa),e.deleteTexture(To),e.deleteBuffer(Po),e.deleteVertexArray(pr);const Bt=Q>=500?1024:512,Gt=Re(Bt,Bt,null,{mip:1});et=De(Gt),e.viewport(0,0,Bt,Bt),e.useProgram(l.env.p),K(0,Pe,l.env.u.uN);const _o=j?[.5,.49,.5]:oe?[.7,.36,.24]:[.6,.36,.36],Bo=j?[.26,.27,.3]:oe?[.1,.1,.14]:[.2,.17,.25];e.uniform4fv(l.env.u.uK,new Float32Array([V[0],V[1],V[2],0,yo[0],yo[1],yo[2],j?.55:oe?1:.55,bo[0],bo[1],bo[2],mt?1:0,k[0],k[1],k[2],j?.7:.35,wo[0],wo[1],wo[2],.075,_o[0],_o[1],_o[2],0,Bo[0],Bo[1],Bo[2],0])),Te();const Ea=ze.nSp,No=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,No),e.bufferData(e.ARRAY_BUFFER,ze.spA,e.STATIC_DRAW);const hr=Ve(No,[[4,0],[4,16],[4,32],[4,48]],64);e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.useProgram(l.spr.p),K(0,Pe,l.spr.u.uN),e.bindVertexArray(hr),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Ea),e.disable(e.BLEND),K(0,Gt),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(et),e.deleteVertexArray(hr),e.deleteBuffer(No);const Qt=Math.max(128,Math.min(512,Math.round(Q*.5))),xr=Re(Qt,Qt,null,{fmt:e.RGB10_A2}),jt=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,jt),e.bufferData(e.ARRAY_BUFFER,ze.discA,e.STATIC_DRAW);const So=Ve(jt,[[4,0],[4,16]],32);et=De(xr),e.viewport(0,0,Qt,Qt),e.useProgram(l.bg.p),K(0,Gt,l.bg.u.uE),e.uniform1i(l.bg.u.uC,48),e.uniform4fv(l.bg.u.uK,new Float32Array([I[0],I[1],I[2],W,U[0],U[1],U[2],.135,M[0],M[1],M[2],Bt>=1024?3:2,Vt,3,0,0])),Te(),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(l.disc.p);{const t=G(V,I),n=G(V,U),a=Math.hypot(t,n)||1;e.uniform2f(l.disc.u.uS,t/a,n/a)}e.bindVertexArray(So),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,ze.nDisc),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(et);const ue=Math.round(Q*J),Fe=ce==="blue-green"?[.026,.155,.15]:ce==="deep green"?[.02,.1,.03]:[.16,.088,.092],xt=ce==="blue-green"?[.5,.8,.9]:ce==="deep green"?[.5,.68,.56]:[.8,.72,.86],tt=ce==="blue-green"?[.26,.4,.26]:ce==="deep green"?[.18,.36,.1]:[.2,.3,.12],yt=ce==="young bronze-pink"?[.2,.19,.11]:[.13,.23,.13],Nt=Re(ue,ue),bt=Re(ue,ue),wt=De(Nt),St=De(bt);e.bindFramebuffer(e.FRAMEBUFFER,wt),e.viewport(0,0,ue,ue),e.useProgram(l.leaf.p),K(0,Yt,l.leaf.u.uT),K(1,Pe,l.leaf.u.uN),e.uniform1i(l.leaf.u.uR,6),e.uniform4fv(l.leaf.u.uK,new Float32Array([E[0],E[1],E[2],re,I[0],I[1],I[2],ke,U[0],U[1],U[2],_t,M[0],M[1],M[2],2*re/ue,V[0],V[1],V[2],Mo,k[0],k[1],k[2],zo,le[0],le[1],le[2],1.25,Fe[0],Fe[1],Fe[2],dr,xt[0],xt[1],xt[2],0,tt[0],tt[1],tt[2],0,yt[0],yt[1],yt[2],0,(Vt-(mt?.2:.07))/J,.3/J,.1*J,0])),Te();const Ct=Q>=500?512:256,Co=Re(Ct,Ct,null,{mip:1}),Ma=De(Co);if(e.viewport(0,0,Ct,Ct),K(0,Yt),K(1,Pe),e.uniform4fv(l.leaf.u.uK,new Float32Array([0,0,250,.25,1,0,0,ke,0,1,0,_t,0,0,-1,2*.25/Ct,V[0],V[1],V[2],Mo,k[0],k[1],k[2],zo,le[0],le[1],le[2],1.25,Fe[0],Fe[1],Fe[2],dr,xt[0],xt[1],xt[2],0,tt[0],tt[1],tt[2],0,yt[0],yt[1],yt[2],0,9,0,0,0])),Te(),K(0,Co),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Ma),ze.hsp){const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,ze.hsp,e.STATIC_DRAW);const n=Ve(t,[[4,0],[4,16],[4,32],[4,48]],64);e.bindFramebuffer(e.FRAMEBUFFER,wt),e.viewport(0,0,ue,ue),e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.useProgram(l.spr.p),K(0,Pe,l.spr.u.uN),e.bindVertexArray(n),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,1),e.disable(e.BLEND),e.deleteVertexArray(n),e.deleteBuffer(t)}const Ko=t=>{const n=ge(0,t);return 1/Math.max(n[2],1)},yr=(Ko(-.6)-Ko(-1))/.4,za=Ko(-1)+yr,Zt=(t,n,a,f,s,i,p)=>{e.bindFramebuffer(e.FRAMEBUFFER,f),e.viewport(0,0,ue,ue),e.useProgram(l.blur.p),K(0,t,l.blur.u.uS),e.uniform1i(l.blur.u.uC,p),e.uniform4fv(l.blur.u.uK,new Float32Array([za,yr*J,Fo,Eo*.5/J,s,ur,.07,i])),Te()};Zt(Nt,wt,bt,St,1,1,20),Zt(bt,St,Nt,wt,.36,1,14),e.bindBuffer(e.ARRAY_BUFFER,jt),e.bufferData(e.ARRAY_BUFFER,ze.glintA,e.STATIC_DRAW),e.bindFramebuffer(e.FRAMEBUFFER,wt),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.colorMask(!0,!0,!0,!1),e.useProgram(l.disc.p),e.bindVertexArray(So),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,ze.nGlint),e.colorMask(!0,!0,!0,!0),e.disable(e.BLEND);const be=Oe==="pollen gold"?[1,.66,.13]:Oe==="dust grey"?[.5,.47,.44]:[.27,.26,.26],Jt=Re(ue,ue),$t=De(Jt);e.bindFramebuffer(e.FRAMEBUFFER,$t),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(l.haze.p),K(0,Pe,l.haze.u.uN),e.uniform4fv(l.haze.u.uK,new Float32Array([be[0]*.52,be[1]*.52,be[2]*.52,Oe==="ash"?.16:.11,.36,.55,.3,0])),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),Te(),ht||(e.flush(),ht=vr()),ye?Ze.set(Wt,ye):(Ze.set(Wt,{A:ze,B:ht}),Ze.size>3&&Ze.delete(Ze.keys().next().value));const{lane:br,laneB:At,laneW:Da,runR:Lo,grains:Ta,gn:wr,pa:Pa,pb:_a,pearlR0:Ar}=ht,ko=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ko),e.bufferData(e.ARRAY_BUFFER,Ta.subarray(0,wr*4),e.STATIC_DRAW);const gr=Ve(ko,[[4,0]],16);e.useProgram(l.gr.p),K(0,Pe,l.gr.u.uN),e.uniform4fv(l.gr.u.uK,new Float32Array([be[0]*.62,be[1]*.62,be[2]*.62,Oe==="ash"?.1:.42,k[0]*.55,k[1]*.55,k[2]*.55,Oe==="pollen gold"?.6:0,le[0]*1.4,le[1]*1.4,le[2]*1.4,0])),e.bindVertexArray(gr),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,wr),e.disable(e.BLEND),Zt(Jt,$t,bt,St,1,0,16),Zt(bt,St,Jt,$t,.36,0,10),e.deleteVertexArray(gr),e.deleteBuffer(ko),e.deleteVertexArray(So),e.deleteBuffer(jt),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(St),e.deleteFramebuffer(wt),e.deleteFramebuffer($t),e.deleteTexture(bt);const gt=512,Rr=Re(gt,gt),Fr=De(Rr);e.clearColor(1,1,1,1),e.clear(e.COLOR_BUFFER_BIT);const Er=e.createBuffer(),Ba=Ve(Er,[[4,0],[2,16]],24),qo=l.st.u;e.useProgram(l.st.p);const Mr=new Float32Array([ke,M[0],M[1],M[2],E[0],E[1],E[2],Fo,I[0],I[1],I[2],re,U[0],U[1],U[2],Eo/J]);e.uniform4fv(qo.uK,Mr);const ot=new Float32Array(F*6*2),zr=(t,n)=>{e.bindFramebuffer(e.FRAMEBUFFER,Fr),e.viewport(0,0,gt,gt),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ZERO,e.ONE_MINUS_SRC_ALPHA),e.useProgram(l.st.p),K(0,Pe,qo.uN),e.bindBuffer(e.ARRAY_BUFFER,Er),e.bufferData(e.ARRAY_BUFFER,t.subarray(0,n*6),e.DYNAMIC_DRAW),e.bindVertexArray(Ba),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,n)};zr(ht.segA,ht.segA.length/6),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null);const B=new Float32Array(F),L=new Float32Array(F),Z=new Float32Array(F),fe=new Float32Array(F),ve=new Float32Array(F),de=new Float32Array(F),_=new Float32Array(F),We=new Float32Array(F),rt=new Float32Array(F),Kt=new Float32Array(F),Lt=new Float32Array(F),Rt=new Float32Array(F),kt=new Float32Array(F),qt=new Float32Array(F),It=new Float32Array(F),Ye=new Float32Array(F),Dr=new Float32Array(F),at=new Float32Array(F),eo=new Float32Array(F),ie=new Uint8Array(F),nt=new Float32Array(he),Ge=new Float32Array(he),st=new Float32Array(he),Qe=new Int16Array(he).fill(-1),Io=new Float32Array(he),me=56,Ft=new Float32Array(me*me).fill(1);for(let t=0;t<me;t++)for(let n=0;n<me;n++)Ft[t*me+n]=.55+.45*Math.sin(((n+.5)/me*80-40)*.17+Pa)*Math.sin(((t+.5)/me*80-40)*.13+_a);const to=300,Uo=1/60;let Et=0;const ct=(t,n,a,f,s,i,p)=>{let c=-1;for(let h=0;h<F;h++)if(!ie[h]){c=h;break}return c<0?-1:(ie[c]=1,Et++,B[c]=t,L[c]=n,Z[c]=f,fe[c]=ve[c]=0,de[c]=s,_[c]=a,We[c]=rt[c]=Kt[c]=Lt[c]=0,Rt[c]=i,kt[c]=t,qt[c]=n,It[c]=p||0,Ye[c]=0,Dr[c]=o()*6.28,at[c]=0,eo[c]=0,c)},Ut=t=>{for(let n=0;n<he;n++)if(Qe[n]<0){const a=o()*2-1,f=o()*6.283,s=Math.sqrt(Math.max(0,1-a*a))*(.45+o()*.42);return nt[n]=Math.cos(f)*s,Ge[n]=Math.sin(f)*s,st[n]=a*.75,Qe[n]=t,Io[n]=.55+o()*.5,n}return-1},Na=(t,n)=>ge(t,n),oo=(t,n,a)=>{for(let f=0;f<F;f++)if(ie[f]&&Math.hypot(B[f]-t,L[f]-n)<(_[f]+a)*1.25)return!1;return!0},Tr=ct(0,0,Ar,0,0,0),Sa=C?9:4+Math.floor(o()*8);for(let t=0;t<Sa;t++)Ut(Tr);const Ca=Je==="heavy dew"?38:Je==="one great pearl"?12:22,Ka=oe?1.45:1,Ee=(t,n,a,f)=>{const s=Na(t,n);return s[1]>58||!oo(s[0],s[1],a)?-1:ct(s[0],s[1],a,0,0,f,0)};if(C&&(Ee(.42,-.32,1.02,40),Ee(-.72,-.3,.78,34),Ee(.68,-.12,.56,40),Ee(-.5,-.5,.42,46),Ee(.2,-.55,.34,46),Ee(.92,-.72,.8,50),Ee(-.74,.02,.9,32),Ee(.46,.03,1,40),Ee(.1,.12,.8,42),Ee(-.32,.1,1.2,40)),ho!=="one pearl")for(let n=0,a=0;n<40&&a<7;n++){let f,s;const i=(.7+Xe()*Xe()*1.3)*(.85+Xe()*.3);{const p=Xe()*6.283,c=Ar+3.5+Xe()*10;f=Math.cos(p)*c,s=Math.sin(p)*c*.8}s>40||!oo(f,s,i)||(ct(f,s,i,0,0,400,0),a++)}for(let t=0;t<Ca;t++){const n=(o()-.5)*2.1,a=-.98+o()*o()*1.14,f=o();Ee(n,a,(.13+f*f*f*(a<-.35?.34:.9))*Ka,6+o()*36)}for(let t=0;t<F;t++)if(ie[t]&&t!==Tr){let n=1e9;for(let a=0;a<=48;a++)n=Math.min(n,Math.hypot(B[t]-br[a*2],L[t]-br[a*2+1]));n<Da+_[t]+Lo*.6&&(ie[t]=0,Et--)}if(oo(At[0],At[1],Lo)){const t=ct(At[0],At[1],Lo,0,0,C?26:12+ee()*20);if(t>=0){kt[t]=At[0],qt[t]=At[1];for(let n=0;n<7;n++)Ut(t)}}const Oo=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Oo),e.bufferData(e.ARRAY_BUFFER,F*32,e.DYNAMIC_DRAW);const La=Ve(Oo,[[4,0],[4,16]],32),Ho=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Ho),e.bufferData(e.ARRAY_BUFFER,he*24,e.DYNAMIC_DRAW);const ka=Ve(Ho,[[4,0],[2,16]],24),Ke=new Float32Array(F*8),it=new Float32Array(he*6),ro=new Float32Array(28),_e=new Float32Array(9),Pr=dt([-V[0],-V[1],0]),qa=j?.1:oe?1.1:.95,Mt=[le[0]*1.1+.1,le[1]*1.15+.1,le[2]*1.2+.12];e.useProgram(l.shd.p);const _r=new Float32Array([Pr[0],Pr[1],qa,.46,k[0]*.3,k[1]*.34,k[2]*.36,0,Mt[0],Mt[1],Mt[2],ke]);e.uniform4fv(l.shd.u.uD,_r);const Ia=Math.max(V[2]*.55+.45,0),Xo=j?.6:1,Vo=[0,1,2].map(t=>(Fe[t]+(tt[t]-Fe[t])*.72)*(k[t]*Ia*.5+le[t])),Wo=[Fe[0]*1.3+.02,Fe[1]*1.3+.02,Fe[2]*1.3+.02];e.useProgram(l.drop.p);const Br=new Float32Array([E[0],E[1],E[2],re,I[0],I[1],I[2],ke,U[0],U[1],U[2],_t,M[0],M[1],M[2],0,V[0],V[1],V[2],j?.1:oe?2.2:1.6,k[0],k[1],k[2],Ao,Ro?1:0,Mo/6.2832,zo,j?1:1.35,Vo[0],Vo[1],Vo[2],0,Mt[0]*Xo,Mt[1]*Xo,Mt[2]*Xo,j?.9:oe?2.2:1.8,Wo[0],Wo[1],Wo[2],0,1,.985,.975,0]);e.uniform4fv(l.drop.u.uD,Br),e.useProgram(l.spk.p),e.uniform3f(l.spk.u.uC0,be[0]*.7,be[1]*.7,be[2]*.7),e.useProgram(l.comp.p),e.uniform4f(l.comp.u.uG,Ao,.07,1/256,Q>=500?.011:.008);const Yo={};ae.owner=Yo;const Ua=()=>{ae.owner=Yo,Go=1e9,e.useProgram(l.st.p),e.uniform4fv(qo.uK,Mr),e.useProgram(l.shd.p),e.uniform4fv(l.shd.u.uD,_r),e.useProgram(l.drop.p),e.uniform4fv(l.drop.u.uD,Br),e.useProgram(l.spk.p),e.uniform3f(l.spk.u.uC0,be[0]*.7,be[1]*.7,be[2]*.7),e.useProgram(l.comp.p),e.uniform4f(l.comp.u.uG,Ao,.07,1/256,Q>=500?.011:.008)};let Go=1e9,Nr=1e9;const Oa=(t,n)=>{if(Math.abs(t-Go)+Math.abs(n-Nr)<1e-5)return;Go=t,Nr=n;const a=dt([1,0,t]);let f=[0,1,n];const s=G(f,a);f=dt([f[0]-a[0]*s,f[1]-a[1]*s,f[2]-a[2]*s]);const i=vo(a,f),p=b=>[G(b,a),G(b,f),G(b,i)],c=p(E),h=p(I),y=p(U),r=p(M);ro.set([c[0],c[1],c[2],W,h[0],h[1],h[2],Eo,y[0],y[1],y[2],Fo,r[0],r[1],r[2],2/Q,a[0],a[1],a[2],ur,f[0],f[1],f[2],0,i[0],i[1],i[2],0]);const x=W*(c[0]*h[2]-c[2]*h[0]),g=W*(c[0]*y[2]-c[2]*y[0]),w=c[0]*r[2]-c[2]*r[0],O=W*(c[1]*h[2]-c[2]*h[1]),H=W*(c[1]*y[2]-c[2]*y[1]),N=c[1]*r[2]-c[2]*r[1],ne=W*h[2],z=W*y[2],R=r[2],P=[I[0]/re,I[1]/re,-G(E,I)/re],u=[U[0]/re,U[1]/re,-G(E,U)/re],v=[M[0],M[1],-G(E,M)],d=(b,A,D,T)=>b[0]*A+b[1]*D+b[2]*T;_e[0]=d(P,x,O,ne),_e[3]=d(P,g,H,z),_e[6]=d(P,w,N,R),_e[1]=d(u,x,O,ne),_e[4]=d(u,g,H,z),_e[7]=d(u,w,N,R),_e[2]=d(v,x,O,ne),_e[5]=d(v,g,H,z),_e[8]=d(v,w,N,R),e.useProgram(l.comp.p),e.uniformMatrix3fv(l.comp.u.uM,!1,_e),e.useProgram(l.drop.p),e.uniform4fv(l.drop.u.uC,ro),e.useProgram(l.shd.p),e.uniform4fv(l.shd.u.uC,ro.subarray(0,20)),e.useProgram(l.spk.p),e.uniform4fv(l.spk.u.uC,ro.subarray(0,20))};let ao=0,no=0,so=0,co=0,Qo=0,jo=0,Zo=0,Jo=0,Sr=!1,$o=0,io=!1,Cr=0,Kr=0,lt=null,lo=0,Lr=9,zt=0,ut=0,Ot=0,kr=0,qr=0,er=0,tr=0,or=2+o()*5;const Ha=Je==="one great pearl"?4.9:3.8,Dt=m.sound,ja={n:0},Ir=t=>{ie[t]=0,Et--;for(let n=0;n<he;n++)Qe[n]===t&&(Qe[n]=-1)},Xa=(t,n)=>{const a=_[t]>=_[n]?t:n,f=a===t?n:t,s=_[a]**3,i=_[f]**3,p=s+i,c=Math.cbrt(p),h=B[f]-B[a],y=L[f]-L[a],r=Math.hypot(h,y)+1e-4,x=_[f]/_[a];B[a]=(B[a]*s+B[f]*i)/p,L[a]=(L[a]*s+L[f]*i)/p,fe[a]=(fe[a]*s+fe[f]*i)/p,ve[a]=(ve[a]*s+ve[f]*i)/p;const g=Z[a]>.001||Z[f]>.001;de[a]=(de[a]*s+de[f]*i)/p,Z[a]=(Z[a]*s+Z[f]*i)/p,_[a]=c,Rt[a]=0,It[a]=0;const w=Math.min(.2,.3*x*x+.03),O=Math.abs(h)>Math.abs(y)?1:-1;Kt[a]=O*w,Lt[a]=0,rt[a]+=-1.5*x,Ye[a]=Math.min(.05,Ye[a]+.02*x+.004),!g&&x>.46&&c<2.1&&(de[a]=58*Math.sqrt(1/Math.max(c,.22))*(.55+x*.55),Z[a]=.02,de[a]>110&&(de[a]=110));for(let N=0;N<he;N++)Qe[N]===f&&(Qe[N]=a);Ir(f);const H=Math.max(-1,Math.min(1,B[a]/14));return c>.5&&Dt.note(0,{freq:1500/Math.pow(c,.6)*(1+o()*.1),dur:.08+c*.03,vel:Math.min(.32,.08+x*.25),wave:"sine",pan:H}),a},Va=(t,n)=>{n[0]=B[t]/nr+so,n[1]=L[t]/nr+co},Ht=[0,0];function Ur(t){let n=0,a=0,f=-1,s=0;for(let r=0;r<F;r++)if(ie[r]){if(Z[r]<=0){const x=_[r]*_[r]*_[r];n+=x*B[r],a+=x*L[r]}_[r]>s&&(s=_[r],f=r)}if(Lr=s,zt===0&&s>=Ha){zt=1,ut=0;const x=-1.57+(o()<.5?-1:1)*(.9+o()*.45);kr=Math.cos(x),qr=Math.sin(x)}zt===1?(ut+=t,Ot=Math.min(.34,Ot+t*(.05+ut*.16)),(ut>9||f<0||s<2.6)&&(zt=2,ut=0)):zt===2&&(ut+=t,Ot=0,ut>3&&(zt=0));const i=.0035*Math.sin(ao*.73)+.0024*Math.sin(ao*1.91+1.3),p=Zo-kr*Ot-n*9e-7+i,c=Jo-qr*Ot-a*9e-7+i*.6,h=7.5,y=.2;Qo+=(h*h*(p-so)-2*y*h*Qo)*t,jo+=(h*h*(c-co)-2*y*h*jo)*t,so+=Qo*t,co+=jo*t;for(let r=0;r<F;r++){if(!ie[r])continue;const x=_[r];if(It[r]>0&&(_[r]=x+It[r]*t,_[r]>1.3&&(It[r]=0)),Z[r]>0||de[r]>0){if(de[r]-=to*t,Z[r]+=de[r]*t,B[r]+=fe[r]*t,L[r]+=ve[r]*t,Z[r]<=0){Z[r]=0;const N=-de[r];N>26?(de[r]=N*.52,Z[r]=.001,rt[r]+=Math.min(5.5,N*.05)*Hr(x)/12,Ye[r]=Math.min(.05,Ye[r]+N*22e-5),x>.4&&Dt.note(0,{freq:980/Math.pow(x,.55)*(1+o()*.12),dur:.06,vel:Math.min(.3,N*.002),wave:"sine",pan:Math.max(-1,Math.min(1,B[r]/14))})):(de[r]=0,rt[r]+=N*.05)}}else{Va(r,Ht);const N=Math.hypot(Ht[0],Ht[1]),ne=.05*(.85/x)*(.85/x),z=Math.hypot(fe[r],ve[r]);if(Rt[r]>0&&(Rt[r]-=t,N>.15&&N>ne&&(Rt[r]=0)),Rt[r]>0||z<.25&&N<ne)fe[r]=0,ve[r]=0;else{const R=-to*.72*Ht[0],P=-to*.72*Ht[1];fe[r]+=R*t,ve[r]+=P*t;const u=(.32*to*Math.min(.5,ne)+.85*Or(fe[r],ve[r]))*t,v=Or(fe[r],ve[r]);if(v>1e-5){const d=Math.max(0,1-u/v);fe[r]*=d,ve[r]*=d}B[r]+=fe[r]*t,L[r]+=ve[r]*t}}const g=Hr(x),w=.13;rt[r]+=(-g*g*We[r]-2*w*g*rt[r])*t,We[r]+=rt[r]*t,Lt[r]+=(-g*g*Kt[r]-2*w*g*Lt[r])*t,Kt[r]+=Lt[r]*t,We[r]>.3?We[r]=.3:We[r]<-.1&&(We[r]=-.1),Ye[r]*=1-2.6*t;const O=B[r],H=L[r];(Math.abs(O)>34||H<-21||O*O+H*H>_t*_t)&&(x>2&&(Dt.note(0,{freq:110,dur:.5,vel:.7,wave:"sine",cutoff:500}),Dt.hit("noise",.25),Dt.note(0,{freq:240,dur:.22,vel:.3,wave:"sine",at:.06})),Ir(r))}for(let r=0;r<F;r++)if(ie[r])for(let x=r+1;x<F;x++){if(!ie[x])continue;const g=B[r]-B[x],w=L[r]-L[x],O=(at[r]||_[r])+(at[x]||_[x]);if(g*g+w*w>=O*O)continue;const H=Z[r]-Z[x];if(Math.abs(H)>Math.max(_[r],_[x])*1.9)continue;if(Xa(r,x)!==r)break}for(let r=0;r<F;r++)if(ie[r]){const x=_[r],g=Z[r]>.05?1:1/(1+.017*x*x),w=Math.exp(We[r]);at[r]=x*Math.pow(g,-1/3)*w,eo[r]=x*Math.pow(g,2/3)/(w*w)}}function Or(t,n){return Math.sqrt(t*t+n*n)}function Hr(t){return Math.min(30,20/Math.pow(t,.78))}const uo=new Int16Array(F),fo=new Float32Array(F),Xr=()=>{ae.owner!==Yo&&Ua(),Oa(so*.65,co*.65);let t=0;for(let s=0;s<F;s++){if(!ie[s]||Z[s]>.02)continue;const i=B[s]-kt[s],p=L[s]-qt[s],c=i*i+p*p;if(c<.03)continue;const h=Math.sqrt(c),y=_[s];if(t<F){const g=t*6;ot[g]=kt[s],ot[g+1]=qt[s],ot[g+2]=B[s],ot[g+3]=L[s],ot[g+4]=Math.max(.1,y*.36+at[s]*.14),ot[g+5]=.96,t++}const r=Math.floor((B[s]+40)/80*me),x=Math.floor((L[s]+40)/80*me);if(r>=0&&x>=0&&r<me&&x<me){const g=Ft[x*me+r];g>.08&&o()<g*h*Math.min(1.1,y)*.55&&Ut(s),Ft[x*me+r]=g*(1-Math.min(.3,h*y*.07))}kt[s]=B[s],qt[s]=L[s]}if(t&&(zr(ot,t),e.disable(e.BLEND)),tr>1.2){tr=0,e.bindFramebuffer(e.FRAMEBUFFER,Fr),e.viewport(0,0,gt,gt),e.useProgram(l.fill.p),e.uniform4f(l.fill.u.uC,2/255,2/255,2/255,1),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ONE),Te(),e.disable(e.BLEND);for(let s=0;s<Ft.length;s++)Ft[s]<1&&(Ft[s]+=.005)}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,Q,Q),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),e.blendEquation(e.FUNC_ADD);const n=l.comp.u;e.useProgram(l.comp.p),K(0,xr,n.uBg),K(1,Nt,n.uL),K(2,Jt,n.uP),K(3,Rr,n.uK),K(4,Do,n.uW),Te();let a=0;for(let s=0;s<F;s++)if(ie[s]){const i=(B[s]-E[0])*M[0]+(L[s]-E[1])*M[1];let p=a++;for(;p>0&&fo[p-1]<i;)fo[p]=fo[p-1],uo[p]=uo[p-1],p--;fo[p]=i,uo[p]=s}for(let s=0;s<a;s++){const i=uo[s],p=s*8,c=at[i]||_[i],h=eo[i]||_[i],y=Kt[i];Ke[p]=B[i],Ke[p+1]=L[i],Ke[p+2]=(B[i]*B[i]+L[i]*L[i])/(2*ke)+Z[i]+h*.965,Ke[p+3]=c*(1+y),Ke[p+4]=c*(1-y),Ke[p+5]=h,Ke[p+6]=Ye[i]+.0016/Math.max(1,3.4-_[i]),Ke[p+7]=Dr[i]+ao*4.6}e.bindBuffer(e.ARRAY_BUFFER,Oo),e.bufferData(e.ARRAY_BUFFER,Ke.subarray(0,a*8),e.DYNAMIC_DRAW),e.enable(e.BLEND),e.blendFunc(e.ONE,e.SRC_ALPHA),e.useProgram(l.shd.p),e.bindVertexArray(La),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,a),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(l.drop.p),K(0,Gt,l.drop.u.uE),K(1,Nt,l.drop.u.uL),K(2,Co,l.drop.u.uLT),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,a);let f=0;for(let s=0;s<he;s++){const i=Qe[s];if(i<0||!ie[i])continue;const p=f*6,c=at[i]||_[i],h=eo[i]||_[i];it[p]=B[i]+nt[s]*c*1.02,it[p+1]=L[i]+Ge[s]*c*1.02,it[p+2]=(B[i]*B[i]+L[i]*L[i])/(2*ke)+Z[i]+h*.965+st[s]*h*1.02,it[p+3]=.03+Io[s]*.022,it[p+4]=Io[s],it[p+5]=.9*(Ge[s]<0?1:.45),f++}f&&(e.bindBuffer(e.ARRAY_BUFFER,Ho),e.bufferData(e.ARRAY_BUFFER,it.subarray(0,f*6),e.DYNAMIC_DRAW),e.useProgram(l.spk.p),e.bindVertexArray(ka),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,f)),e.disable(e.BLEND),e.bindVertexArray(null)};return Ur(1e-4),Xr(),(t,n)=>{n=Math.min(n,.14),ao+=n,tr+=n;const a=m.input,f=a.taps();for(const c of f)lt={x:c.x,y:c.y,age:0};if(a.down){Sr||(Cr=a.x,Kr=a.y,$o=0,io=!1,lo=0),$o+=n;const c=a.x-Cr,h=a.y-Kr;if(!io&&c*c+h*h>.0014&&(io=!0,lt=null),io)Zo=Math.max(-.2,Math.min(.2,-c*.95)),Jo=Math.max(-.2,Math.min(.2,h*.95));else if($o>.22)for(lt=null,lo+=n*9;lo>1;){lo-=1;const y=ge((a.x-.5)*2+(o()-.5)*.75,(.5-a.y)*2+(o()-.5)*.55);y[1]<56&&Et<F-1&&ct(y[0],y[1],.22+o()*o()*.42,24+o()*10,-40,0)}}else if(Zo=0,Jo=0,lt){const c=ge((lt.x-.5)*2,(.5-lt.y)*2);if(Et<F){const h=ct(c[0],Math.min(52,c[1]),(oe?1.65:1.2)+o()*.4,30,-60,0);if(h>=0)for(let y=0;y<2;y++)o()<.3&&Ut(h)}lt=null}Sr=a.down,er+=n;const s=Lr<2,i=(Je==="heavy dew"?.34:.46)*(s?.45:1);for(;er>i;)if(er-=i,Et<60){const c=s&&o()<.6?[(o()-.5)*26,(o()-.5)*22]:ge((o()-.5)*2.15,-.98+o()*o()*1.16);if(c[1]<56&&oo(c[0],c[1],.14)){const h=ct(c[0],c[1],.1+o()*.05,0,0,0,(.022+o()*.03)*(oe?1.3:1)*(s?2.2:1));h>=0&&s&&o()<.3&&Ut(h)}}no+=n;let p=0;for(;no>=Uo&&p<9;)Ur(Uo),no-=Uo,p++;p===9&&(no=0);for(let c=0;c<he;c++){const h=Qe[c];if(h<0)continue;const y=Math.max(.2,_[h]),r=-ve[h]/y*.45*n,x=fe[h]/y*.45*n,g=(.12+Ye[h]*16)*n*(c%2?1:-1),w=nt[c],O=Ge[c],H=st[c];nt[c]=w+x*H-g*O,Ge[c]=O+g*w-r*H,st[c]=H+r*O-x*w;const N=nt[c]*nt[c]+Ge[c]*Ge[c]+st[c]*st[c];if(N>.78){const ne=.883/Math.sqrt(N);nt[c]*=ne,Ge[c]*=ne,st[c]*=ne}}if(or-=n,or<0){or=5+o()*9;const c=2+Math.floor(o()*4),h=2200+o()*1600,y=(o()-.5)*1.4;for(let r=0;r<c;r++)Dt.note(0,{freq:h*(1+.12*Math.sin(r*2.1)),dur:.07+o()*.06,vel:.06,wave:"sine",pan:y,at:r*.13})}Xr()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
