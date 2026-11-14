// Lotus Leaf: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/171.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function($o){$o&&function(){"use strict";const Wr="",Jo=new WeakMap,h=92,se=128,U=1.25,ze=250,er=170,M=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
`+Wr+`
`,De=M+"layout(location=0) in vec2 a; out vec2 vP; void main(){ vP=a; gl_Position=vec4(a,0.,1.); }",tr=`
vec2 oct(vec3 d){
  float s=abs(d.x)+abs(d.y)+abs(d.z);
  vec2 p=d.xz/s;
  if(d.y<0.) p=(1.-abs(p.yx))*vec2(p.x<0.?-1.:1.,p.y<0.?-1.:1.);
  return p*.5+.5;
}`,or=`
vec3 tone(vec3 c){ c=c*(2.51*c+.03)/(c*(2.43*c+.59)+.14); return sqrt(clamp(c,0.,1.)); }`,Yr=M+`in vec2 vP; out vec4 o; uniform sampler2D uW;
vec4 s(vec2 p){ vec2 f=fract(p),i=floor(p); f=f*f*(3.-2.*f); return texture(uW,(i+f+.5)/256.); }
void main(){ vec2 u=(vP*.5+.5)*256.;
  vec4 c=s(u/32.)*.42+s(u/16.+7.)*.26+s(u/8.+19.)*.17+s(u/4.+3.)*.1+s(u/2.+31.)*.05;
  o=clamp((c-.5)*2.1+.5,0.,1.);
}`,Gr=M+`layout(location=0) in vec2 a; layout(location=1) in vec4 i; uniform vec2 uO; out vec2 vQ; out float vH;
void main(){ vQ=a; vH=i.w; gl_Position=vec4((i.xy+uO+a*i.z)*2.-1.,0.,1.); }`,Qr=M+`in vec2 vQ; in float vH; out vec4 o;
void main(){ float d=dot(vQ,vQ); o=vec4(sqrt(max(1.-d,0.))*vH,0.,0.,1.); }`,Zr=M+`in vec2 vP; out vec4 o; uniform sampler2D uH,uW;
void main(){ vec2 v=vP*.5+.5; float e=1./512.;
  float hx=texture(uH,v+vec2(e,0.)).r-texture(uH,v-vec2(e,0.)).r, hy=texture(uH,v+vec2(0.,e)).r-texture(uH,v-vec2(0.,e)).r;
  o=vec4(clamp(.5-vec2(hx,hy)*2.2,0.,1.),texture(uH,v).r,texture(uW,v*2.).a);
}`,jr=M+`in vec2 vP; out vec4 o; uniform sampler2D uN; uniform vec4 uK[7];
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
}`,$r=M+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec4 i1; layout(location=3) in vec4 i2; layout(location=4) in vec4 i3;
out vec2 vQ; out vec4 vT; out vec4 vB; out vec2 vS;
void main(){
  float py=i0.w<1.5?(a.y*.5+.5):a.y;
  vQ=vec2(a.x,py); vT=i2; vB=i3; vS=vec2(i1.z,i1.w);
  vec2 l=vec2(a.x*i1.x,py*i1.y); float c=cos(i0.z),s=sin(i0.z);
  gl_Position=vec4(i0.xy+vec2(c*l.x-s*l.y,s*l.x+c*l.y),0.,1.);
}`,Jr=M+`in vec2 vQ; in vec4 vT; in vec4 vB; in vec2 vS; out vec4 o; uniform sampler2D uN;
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
}`,ea=M+tr+`in vec2 vP; out vec4 o; uniform sampler2D uE; uniform vec4 uK[4]; uniform int uC;
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
}`,ta=M+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec4 i1; out vec2 vQ; out vec4 vC;
void main(){ vQ=a; vC=i1; gl_Position=vec4(i0.xy+a*i0.zw,0.,1.); }`,oa=M+`in vec2 vQ; in vec4 vC; out vec4 o; uniform vec2 uS;
void main(){ float d=length(vQ); float sd=dot(vQ,uS);
  float m=smoothstep(1.,.84,d)*(.5+.5*smoothstep(.4,.95,d)*(.55+.45*sd)+.18*sd); o=vec4(vC.rgb*m*vC.a,0.); }`,ra=M+`in vec2 vP; out vec4 o; uniform sampler2D uT,uN; uniform vec4 uK[12]; uniform int uR;
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
}`,aa=M+`in vec2 vP; out vec4 o; uniform sampler2D uN; uniform vec4 uK[2];
// 0 dust rgb,amount 1 eye xz..: y-scale,-
void main(){ vec2 n=vec2(vP.x*.8/(uK[1].x-vP.y),1./(uK[1].x-vP.y))*uK[1].y;
  float a=texture(uN,n).r*.6+texture(uN,n*3.1+.3).g*.4; a=smoothstep(.22,.82,a)*uK[0].w;
  a*=smoothstep(uK[1].z+.02,uK[1].z-.1,vP.y)*smoothstep(-.85,-.25,vP.y);
  o=vec4(uK[0].rgb*a,a);
}`,na=M+`layout(location=0) in vec2 a; layout(location=1) in vec4 i; out vec2 vQ; out vec2 vK;
void main(){ vQ=a*2.; vK=i.w>1.?vec2(i.w-2.,1.):vec2(i.w,0.); gl_Position=vec4(i.xy+a*i.z*2.,0.,1.); }`,sa=M+`in vec2 vQ; in vec2 vK; out vec4 o; uniform sampler2D uN; uniform vec4 uK[3];
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
}`,ca=M+`in vec2 vP; out vec4 o; uniform sampler2D uS; uniform vec4 uK[2]; uniform int uC;
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
}`,ia=M+"layout(location=0) in vec2 a; uniform mat3 uM; out vec3 vH; out vec2 vS; void main(){ vH=uM*vec3(a,1.); vS=a; gl_Position=vec4(a,0.,1.); }",ua=M+or+`in vec3 vH; in vec2 vS; out vec4 o; uniform sampler2D uBg,uL,uP,uK,uW; uniform vec4 uG;
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
}`,la=M+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec4 i1; uniform vec4 uC[5]; uniform vec4 uD[3];
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
}`,fa=M+`in vec2 vQ; in vec3 vM; out vec4 o; uniform vec4 uD[3];
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
}`,va=M+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec4 i1; uniform vec4 uC[7];
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
}`,da=M+tr+or+`in vec3 vRay; in vec3 vCn; in vec3 vAx; in vec4 vM; in float vPx; out vec4 o;
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
}`,ma=M+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec2 i1; uniform vec4 uC[5]; out vec2 vQ; out vec2 vS;
void main(){
  vec3 q=i0.xyz-uC[0].xyz; float zc=max(dot(q,uC[3].xyz),.5),TH=uC[0].w;
  vec2 cn=vec2(dot(q,uC[1].xyz),dot(q,uC[2].xyz))/(zc*TH);
  vQ=a; vS=i1; gl_Position=vec4(cn+a*max(i0.w/(zc*TH),uC[3].w*.8),0.,1.);
}`,pa=M+`in vec2 vQ; in vec2 vS; out vec4 o; uniform vec3 uC0;
void main(){ float d=length(vQ); float a=smoothstep(1.,.45,d)*vS.y; o=vec4(uC0*vS.x*a,a); }`,xa=M+`layout(location=0) in vec2 a; layout(location=1) in vec4 i0; layout(location=2) in vec2 i1; uniform vec4 uK[4];
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
}`,ha=M+`in vec2 vW; flat in vec4 vSeg; flat in vec3 vI; out vec4 o; uniform sampler2D uN;
void main(){
  vec2 pa=vW-vSeg.xy,ba=vSeg.zw-vSeg.xy;
  float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-6),0.,1.);
  float d=length(pa-ba*h)/vI.x;
  float n=texture(uN,vW*.31).r;
  float sf=vI.z;
  float a=smoothstep(1.+sf+.3*(n-.5),.62-min(sf,.6)+.3*(n-.5),d)*vI.y/(1.+sf*.8);
  o=vec4(0.,0.,0.,a);
}`,ya=M+"out vec4 o; uniform vec4 uC; void main(){ o=uC; }";function ba(d){let e=Jo.get(d);if(e)return e;e={P:{}};const O={noise:[De,Yr],dome:[Gr,Qr],tn:[De,Zr],env:[De,jr],spr:[$r,Jr],bg:[De,ea],disc:[ta,oa],leaf:[De,ra],haze:[De,aa],gr:[na,sa],blur:[De,ca],comp:[ia,ua],shd:[la,fa],drop:[va,da],spk:[ma,pa],st:[xa,ha],fill:[De,ya]},J={},v=(Y,k)=>{const G=Y+k;if(J[G])return J[G];const s=d.createShader(Y);return d.shaderSource(s,k),d.compileShader(s),J[G]=s,s};for(const Y in O){const k=d.createProgram();d.attachShader(k,v(d.VERTEX_SHADER,O[Y][0])),d.attachShader(k,v(d.FRAGMENT_SHADER,O[Y][1])),d.linkProgram(k),e.P[Y]={p:k,u:{}}}for(const Y in O){const k=e.P[Y],G=k.p;if(!d.getProgramParameter(G,d.LINK_STATUS)){console.error("171 link "+Y+": "+d.getProgramInfoLog(G));for(const z of d.getAttachedShaders(G)){const Q=d.getShaderInfoLog(z);Q&&console.error("171 "+Y+": "+Q)}}const s=d.getProgramParameter(G,d.ACTIVE_UNIFORMS)||0;for(let z=0;z<s;z++){const Q=d.getActiveUniform(G,z),Te=Q.name.replace(/\[0\]$/,"");k.u[Te]=d.getUniformLocation(G,Q.name)}}const ce=d.createBuffer();d.bindBuffer(d.ARRAY_BUFFER,ce),d.bufferData(d.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),d.STATIC_DRAW),e.quad=ce;const et=d.createVertexArray();return d.bindVertexArray(et),d.enableVertexAttribArray(0),d.vertexAttribPointer(0,2,d.FLOAT,!1,0,0),d.bindVertexArray(null),e.vq=et,Jo.set(d,e),e}const Ae=(d,e)=>{let O=0;for(const v of e)O+=v[1];let J=d()*O;for(const v of e)if(J-=v[1],J<=0)return v[0];return e[0][0]},L=(d,e)=>d[0]*e[0]+d[1]*e[1]+d[2]*e[2],to=(d,e)=>[d[1]*e[2]-d[2]*e[1],d[2]*e[0]-d[0]*e[2],d[0]*e[1]-d[1]*e[0]],Je=d=>{const e=Math.hypot(d[0],d[1],d[2])||1;return[d[0]/e,d[1]/e,d[2]/e]};$o.add({num:171,name:"Lotus Leaf",fam:"Worlds",recipe:"A close look at a lotus leaf at dawn, where water beads into round drops that hold the flower upside down and roll off almost without friction, picking up the pollen as they go. The leaf and how many drops there are change every mint. Tap to drop a bead of water, drag to tilt the leaf and send everything rolling, or hold for a light rain.",interactive:"Tap to drop a bead of water. Drag to tilt the leaf and send every drop rolling. Hold for a light rain.",music:!0,gl:!0,fps:30,seed:0,make(d){const e=d.gl,O=d.size,J=ba(e),v=J.P,ce=d.hash.replace(/^0x/,"");let et=parseInt(ce.slice(0,8),16)|0,Y=parseInt(ce.slice(8,16),16)|0,k=parseInt(ce.slice(16,24),16)|0,G=parseInt(ce.slice(24,32),16)|0;const s=()=>{et|=0,Y|=0,k|=0,G|=0;const t=(et+Y|0)+G|0;return G=G+1|0,et=Y^Y>>>9,Y=k+(k<<3)|0,k=k<<21|k>>>11,k=k+t|0,(t>>>0)/4294967296};for(let t=0;t<12;t++)s();const z=!!d.home;let Q=Ae(s,[["blue-green",52],["deep green",36],["young bronze-pink",12]]),Te=Ae(s,[["pink",55],["white",33],["none, reeds",12]]),Pt=Ae(s,[["dawn",55],["overcast",31],["after-storm",14]]),Pe=Ae(s,[["pollen gold",52],["dust grey",36],["ash",12]]),oo=Ae(s,[["leaf above water",55],["leaf on water",45]]),qe=Ae(s,[["scattered beads",50],["heavy dew",36],["one great pearl",14]]),ro=Ae(s,[["none",88],["a fallen petal",12]]);z&&(Q="blue-green",Te="pink",Pt="dawn",Pe="pollen gold",oo="leaf above water",qe="scattered beads",ro="none");const ge=t=>t[0].toUpperCase()+t.slice(1);d.trait("Leaf",ge(Q)),d.trait("Flower behind",ge(Te)),d.trait("Light",ge(Pt)),d.trait("Dust",ge(Pe)),d.trait("Pond",ge(oo)),d.trait("Dew",ge(qe)),d.trait("Petal",ge(ro));let _e=625341585;for(let t=0;t<ce.length;t++)_e^=ce.charCodeAt(ce.length-1-t),_e=Math.imul(_e,16777619);const Ne=()=>{_e=_e+1831565813|0;let t=Math.imul(_e^_e>>>15,1|_e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let pt=Ae(Ne,[["low in the dish",38],["pearl off-centre",24],["eye level with the bead",22],["looking down the veins",16]]);const wa=Ne()<.5?-1:1;z&&(pt="low in the dish");let ao=Ae(Ne,[["one pearl",68],["a cluster of pearls",32]]);z&&(ao="one pearl"),d.trait("View",ge(pt)),d.trait("Drops",ge(ao));const q=Pt==="overcast",X=Pt==="after-storm",rr=z?-.3:-.5+s(),no=q?.6:X?.1:.17,C=Je([Math.sin(rr)*Math.cos(no),Math.cos(rr)*Math.cos(no),Math.sin(no)]),P=q?[.36,.36,.4]:X?[3.2,1.75,.95]:[2.5,1.62,1.12],so=q?[.3,.31,.36]:X?[.1,.13,.22]:[.15,.17,.3],co=q?[.46,.43,.45]:X?[.62,.3,.16]:[.56,.32,.33],tt=oo==="leaf on water",io=tt?[.1,.15,.19]:[.008,.022,.026],uo=q?1.05:1,ee=q?[.46,.47,.5]:X?[.2,.2,.26]:[.42,.36,.42],ot=z?0:(s()-.5)*3.5,lo=z?6.3:5.5+s()*1.6,fo=pt==="looking down the veins",ar=pt==="eye level with the bead",Aa=pt==="pearl off-centre",y=fo?[ot,-22,lo*2.4]:ar?[ot,-27,lo*.55]:[ot,-30,lo],Ie=[ot*.6+(z?.7:(s()-.5)*8),0,2.4-.9+(z?0:(s()-.5)*1.4)];Aa&&(Ie[0]=ot*.6+wa*(6+Math.abs(Ie[0]-ot*.6)*.3)),fo?Ie[2]-=2.5:ar&&(Ie[2]+=.5);const K=.404,V=K*U,b=Je([Ie[0]-y[0],Ie[1]-y[1],Ie[2]-y[2]+1.5]),N=Je(to(b,[0,0,1])),B=to(N,b),vo=1/((t,o,r)=>(t-y[0])*b[0]+(o-y[1])*b[1]+(r-y[2])*b[2])(0,0,2),mo=3,nr=.0045,_t=L([0,0,1],b)===0?0:-b[2]/Math.hypot(b[0],b[1])/K,xt=60,sr=(t,o)=>(t*t+o*o)/(2*ze),fe=(t,o)=>{const r=b[0]+N[0]*t*K+B[0]*o*K,i=b[1]+N[1]*t*K+B[1]*o*K,a=b[2]+N[2]*t*K+B[2]*o*K;if(a>-.012)return[y[0]+r*180,150,0];const u=-y[2]/a;return[y[0]+r*u,y[1]+i*u,u]},ve=(t,o,r,i)=>{const a=e.createTexture();e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a);const u=i&&i.mip;u?e.texStorage2D(e.TEXTURE_2D,Math.floor(Math.log2(Math.max(t,o)))+1,e.RGBA8,t,o):e.texStorage2D(e.TEXTURE_2D,1,i&&i.fmt||e.RGBA8,t,o),r&&e.texSubImage2D(e.TEXTURE_2D,0,0,0,t,o,e.RGBA,e.UNSIGNED_BYTE,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,u?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const l=i&&i.rep?e.REPEAT:e.CLAMP_TO_EDGE;return e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,l),a},xe=t=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o},D=(t,o,r)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,o),r&&e.uniform1i(r,t)},he=()=>{e.bindVertexArray(J.vq),e.drawArrays(e.TRIANGLE_STRIP,0,4)},Be=(t,o,r)=>{const i=e.createVertexArray();return e.bindVertexArray(i),e.bindBuffer(e.ARRAY_BUFFER,J.quad),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,t),o.forEach((a,u)=>{e.enableVertexAttribArray(u+1),e.vertexAttribPointer(u+1,a[0],e.FLOAT,!1,r,a[1]),e.vertexAttribDivisor(u+1,1)}),e.bindVertexArray(null),i};e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0);const cr=new Uint8Array(256*256*4),ir=new Uint32Array(cr.buffer);{let t=s()*4294967296>>>0||1;for(let o=0;o<ir.length;o++)t^=t<<13,t^=t>>>17,t^=t<<5,ir[o]=t>>>0}const po=ve(256,256,cr,{rep:1}),ye=ve(256,256,null,{rep:1,mip:1});let Ue=xe(ye);e.viewport(0,0,256,256),e.useProgram(v.noise.p),D(0,po,v.noise.u.uW),he(),e.bindTexture(e.TEXTURE_2D,ye),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Ue);const Re=64,ht=new Float32Array(Re*Re*4);for(let t=0,o=0;t<Re;t++)for(let r=0;r<Re;r++)ht[o++]=(r+.5+(s()-.5)*.62+t%2*.5)/Re,ht[o++]=(t+.5+(s()-.5)*.62)/Re,ht[o++]=(.5+s()*.34)/Re,ht[o++]=.45+s()*.55;const xo=ve(512,512,null,{rep:1}),ho=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ho),e.bufferData(e.ARRAY_BUFFER,ht,e.STATIC_DRAW);const ur=Be(ho,[[4,0]],16);Ue=xe(xo),e.viewport(0,0,512,512),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(v.dome.p),e.enable(e.BLEND),e.blendEquation(e.MAX),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(ur);for(const t of[[0,0],[-1,0],[0,-1],[-1,-1]])e.uniform2f(v.dome.u.uO,t[0],t[1]),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Re*Re);e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND);const Nt=ve(512,512,null,{rep:1,mip:1}),ga=xe(Nt);e.useProgram(v.tn.p),D(0,xo,v.tn.u.uH),D(1,po,v.tn.u.uW),he(),D(0,Nt),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Ue),e.deleteFramebuffer(ga),e.deleteTexture(xo),e.deleteBuffer(ho),e.deleteVertexArray(ur);const yt=O>=500?1024:512,Bt=ve(yt,yt,null,{mip:1});Ue=xe(Bt),e.viewport(0,0,yt,yt),e.useProgram(v.env.p),D(0,ye,v.env.u.uN);const yo=q?[.5,.49,.5]:X?[.7,.36,.24]:[.6,.36,.36],bo=q?[.26,.27,.3]:X?[.1,.1,.14]:[.2,.17,.25];e.uniform4fv(v.env.u.uK,new Float32Array([C[0],C[1],C[2],0,so[0],so[1],so[2],q?.55:X?1:.55,co[0],co[1],co[2],tt?1:0,P[0],P[1],P[2],q?.7:.35,io[0],io[1],io[2],.075,yo[0],yo[1],yo[2],0,bo[0],bo[1],bo[2],0])),he();const wo=[],lr=(t,o)=>{const r=1/(1+Math.abs(t)+Math.abs(o));return[t*r,o*r,r]},rt=(t,o,r,i,a,u,l,c,f)=>{const p=lr(t,o);let n=p[0],m=p[1],x=r,w=a*p[2],R=u*p[2];if(i<1.5){const E=lr(t-Math.sin(r)*u,o+Math.cos(r)*u),g=E[0]-n,_=E[1]-m;x=Math.atan2(-g,_),R=Math.hypot(g,_),w=a*.5*(p[2]+E[2])}wo.push(n,m,x,i,w,R,s(),f===void 0?1:f,l[0],l[1],l[2],i,c[0],c[1],c[2],0)},Ao=q?.62:X?.85:1,St=(t,o,r,i,a,u,l,c)=>{const f=c?-1:1,p=(l||1)*Ao*(c?.55:1),n=u>.5?[[2,1.55,.74,.34,.62],[5,.95,.96,.34,.72],[5,.5,.92,.36,.86],[3,.15,.8,.36,.96],[5,.95,.5,.4,1.06]]:[[5,.32,1,.34,.85],[3,.15,1,.36,1]];c||rt(t,o,0,1,r*.042,-o-.5,[.13,.24,.12],[.06,.12,.07],p);for(let m=0;m<n.length;m++){const[x,w,R,E,g]=n[m];if(m===4&&u>.5){for(let _=0;_<18;_++){const $=(s()-.5)*1.5;rt(t+Math.sin($)*r*.12,o+r*.03*f,-$*f,1,r*.016,r*(.38+s()*.1)*f,[1.3,.92,.25],[.9,.62,.18],p*1.2)}rt(t,o+r*.4*f,0,3,r*.17,r*.08,[1.05,.88,.22],[.6,.62,.14],p*1.25)}for(let _=0;_<x;_++){const $=x>1?_/(x-1)*2-1:0,ue=$*w+(s()-.5)*.08,we=r*R*(.9+s()*.16)*(1-.12*Math.abs($));rt(t+Math.sin(ue)*r*.1,o+r*.02*f,-ue*f,0,r*E*R*(.9+s()*.2),we*f,i,a,p*g*(.74+s()*.32+.34*Math.sin(ue)*(C[0]<t?-1:1)))}}},Ra=(t,o,r,i,a)=>rt(t,o,0,2,r,i,[a[0]*1.7,a[1]*1.7,a[2]*1.7],a,Ao),Fa=[.04,.1,.085],Ea=tt?14:9;for(let t=0;t<Ea;t++){const o=(s()-.5)*1.5,r=s();Ra(o,tt?-.012-r*r*.22:-.03-r*r*.24,.07+r*r*.3,.011+r*r*.07,Fa)}const Ct=Te==="none, reeds",Ma=Ct?46:0;for(let t=0;t<Ma;t++){const o=Ct?(s()-.5)*1:(s()<.5?-1:1)*(.3+s()*.35),r=Ct?.28+s()*.36:.16+s()*.2,i=[.34,.4,.16],a=[.05,.1,.06];rt(o,-.03,(s()-.5)*.22,1,.0035+s()*.004,r,i,a,Ao*.9)}const fr=z?1:s()<.5?-1:1;if(Ct)St(fr*.34,.04,.05,[.7,.2,.34],[.85,.65,.58],0,.6);else{const t=Te==="pink"?[.7,.12,.3]:[.8,.74,.74],o=Te==="pink"?[.86,.52,.52]:[.14,.18,.11],r=fr*(z?.2:.12+s()*.16),i=.14;tt&&St(r,-.012-i,.54,t,o,1,.9,!0),St(r*-1.9,.05,.075,t,o,0,.75),St(r,i,.54,t,o,1,1)}const za=wo.length/16,go=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,go),e.bufferData(e.ARRAY_BUFFER,new Float32Array(wo),e.STATIC_DRAW);const vr=Be(go,[[4,0],[4,16],[4,32],[4,48]],64);e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.useProgram(v.spr.p),D(0,ye,v.spr.u.uN),e.bindVertexArray(vr),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,za),e.disable(e.BLEND),D(0,Bt),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Ue),e.deleteVertexArray(vr),e.deleteBuffer(go);const Kt=Math.max(128,Math.min(512,Math.round(O*.5))),dr=ve(Kt,Kt,null,{fmt:e.RGB10_A2}),Ro=[];for(let t=0;t<16;t++){const o=(s()-.5)*2.1,r=_t-.03-s()*s()*.22,i=.008+s()*s()*.03,a=s(),u=Math.abs(o*K-C[0]),l=Math.exp(-u*u*3.5)*(q?.25:1);Ro.push(o,r,i,i,P[0],P[1]*.9,P[2]*.8,(.003+.08*a*a*a)*l)}const Lt=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Lt),e.bufferData(e.ARRAY_BUFFER,new Float32Array(Ro),e.STATIC_DRAW);const Fo=Be(Lt,[[4,0],[4,16]],32);Ue=xe(dr),e.viewport(0,0,Kt,Kt),e.useProgram(v.bg.p),D(0,Bt,v.bg.u.uE),e.uniform1i(v.bg.u.uC,48),e.uniform4fv(v.bg.u.uK,new Float32Array([N[0],N[1],N[2],K,B[0],B[1],B[2],.135,b[0],b[1],b[2],yt>=1024?3:2,_t,3,0,0])),he(),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(v.disc.p);{const t=L(C,N),o=L(C,B),r=Math.hypot(t,o)||1;e.uniform2f(v.disc.u.uS,t/r,o/r)}e.bindVertexArray(Fo),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Ro.length/8),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Ue);const te=Math.round(O*U),de=Q==="blue-green"?[.026,.155,.15]:Q==="deep green"?[.02,.1,.03]:[.16,.088,.092],at=Q==="blue-green"?[.5,.8,.9]:Q==="deep green"?[.5,.68,.56]:[.8,.72,.86],Oe=Q==="blue-green"?[.26,.4,.26]:Q==="deep green"?[.18,.36,.1]:[.2,.3,.12],nt=Q==="young bronze-pink"?[.2,.19,.11]:[.13,.23,.13],Eo=19+Math.floor(s()*6),Mo=10+s()*5,mr=s(),bt=ve(te,te),st=ve(te,te),ct=xe(bt),wt=xe(st);e.bindFramebuffer(e.FRAMEBUFFER,ct),e.viewport(0,0,te,te),e.useProgram(v.leaf.p),D(0,Nt,v.leaf.u.uT),D(1,ye,v.leaf.u.uN),e.uniform1i(v.leaf.u.uR,6),e.uniform4fv(v.leaf.u.uK,new Float32Array([y[0],y[1],y[2],V,N[0],N[1],N[2],ze,B[0],B[1],B[2],xt,b[0],b[1],b[2],2*V/te,C[0],C[1],C[2],Eo,P[0],P[1],P[2],Mo,ee[0],ee[1],ee[2],1.25,de[0],de[1],de[2],mr,at[0],at[1],at[2],0,Oe[0],Oe[1],Oe[2],0,nt[0],nt[1],nt[2],0,(_t-(tt?.2:.07))/U,.3/U,.1*U,0])),he();const At=O>=500?512:256,zo=ve(At,At,null,{mip:1}),Da=xe(zo);if(e.viewport(0,0,At,At),D(0,Nt),D(1,ye),e.uniform4fv(v.leaf.u.uK,new Float32Array([0,0,250,.25,1,0,0,ze,0,1,0,xt,0,0,-1,2*.25/At,C[0],C[1],C[2],Eo,P[0],P[1],P[2],Mo,ee[0],ee[1],ee[2],1.25,de[0],de[1],de[2],mr,at[0],at[1],at[2],0,Oe[0],Oe[1],Oe[2],0,nt[0],nt[1],nt[2],0,9,0,0,0])),he(),D(0,zo),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Da),ro!=="none"){const t=s()<.5?-1:1,o=fe(t*(.6+s()*.22),-.58-s()*.2),r=(t>0?2.2:.94)+(s()-.5)*.8,i=10+s()*4,a=i*.3,u=(ue,we)=>{const Ee=[ue-y[0],we-y[1],sr(ue,we)+.3-y[2]],Me=Math.max(L(Ee,b),1);return[L(Ee,N)/(Me*V),L(Ee,B)/(Me*V)]},l=Math.cos(r),c=Math.sin(r),f=u(o[0],o[1]),p=u(o[0]+l*i,o[1]+c*i),n=u(o[0]+l*i*.45-c*a,o[1]+c*i*.45+l*a),m=u(o[0]+l*i*.45,o[1]+c*i*.45),x=p[0]-f[0],w=p[1]-f[1],R=Math.max(Math.hypot(n[0]-m[0],n[1]-m[1]),Math.hypot(x,w)*.16),E=Te==="white"?[[.44,.42,.41],[.34,.36,.24]]:[[.62,.1,.26],[.72,.5,.46]],g=[f[0],f[1],Math.atan2(-x,w),0,R,Math.hypot(x,w),s(),q?.5:.78,E[0][0],E[0][1],E[0][2],0,E[1][0],E[1][1],E[1][2],0],_=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,_),e.bufferData(e.ARRAY_BUFFER,new Float32Array(g),e.STATIC_DRAW);const $=Be(_,[[4,0],[4,16],[4,32],[4,48]],64);e.bindFramebuffer(e.FRAMEBUFFER,ct),e.viewport(0,0,te,te),e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.useProgram(v.spr.p),D(0,ye,v.spr.u.uN),e.bindVertexArray($),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,1),e.disable(e.BLEND),e.deleteVertexArray($),e.deleteBuffer(_)}const Do=t=>{const o=fe(0,t);return 1/Math.max(o[2],1)},pr=(Do(-.6)-Do(-1))/.4,Ta=Do(-1)+pr,kt=(t,o,r,i,a,u,l)=>{e.bindFramebuffer(e.FRAMEBUFFER,i),e.viewport(0,0,te,te),e.useProgram(v.blur.p),D(0,t,v.blur.u.uS),e.uniform1i(v.blur.u.uC,l),e.uniform4fv(v.blur.u.uK,new Float32Array([Ta,pr*U,vo,mo*.5/U,a,nr,.07,u])),he()};kt(bt,ct,st,wt,1,1,20),kt(st,wt,bt,ct,.36,1,14);const To=[];for(let t=0;t<24;t++){const o=(s()-.5)*2.4,r=t%3>0,i=r?_t-.08-s()*.3:-.72-s()*.5,a=s(),u=(r?.009+a*.014:.025+a*a*.11)/U,l=s(),c=Math.abs(o*K-C[0]),f=Math.exp(-c*c*3)*(q?.3:1);To.push(o/U,i/U,u,u,P[0],P[1]*.9,P[2]*.85,(r?.012*(.3+l*l*2.2):.004*(.5+l*l*2)*(.6+.4*Math.min(1,.05/u)))*f)}e.bindBuffer(e.ARRAY_BUFFER,Lt),e.bufferData(e.ARRAY_BUFFER,new Float32Array(To),e.STATIC_DRAW),e.bindFramebuffer(e.FRAMEBUFFER,ct),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.colorMask(!0,!0,!0,!1),e.useProgram(v.disc.p),e.bindVertexArray(Fo),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,To.length/8),e.colorMask(!0,!0,!0,!0),e.disable(e.BLEND);let Se=2654435769;for(let t=0;t<ce.length;t++)Se^=ce.charCodeAt(t),Se=Math.imul(Se,16777619);const H=()=>{Se=Se+1831565813|0;let t=Math.imul(Se^Se>>>15,1|Se);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},xr=z?1:H()<.5?-1:1,qt=z?1.02:.8+H()*.45,Z=z?fe(.42,-.32):fe(xr*(.3+H()*.3),-.2-H()*.16);{const t=Math.hypot(Z[0],Z[1]),o=Math.max(1,8/Math.max(t,.1));Z[0]*=o,Z[1]*=o}const It=fe(xr*1.22,z?-.2:-.1-H()*.14),Po=qt*1.25,me=[];for(let t=0;t<=48;t++){const o=t/48,r=(1-o)*(1-o),i=2*o*(1-o),a=o*o,u=(It[0]+Z[0])*.4,l=(It[1]+Z[1])*.4;me.push(r*It[0]+i*u+a*Z[0],r*It[1]+i*l+a*Z[1])}const Pa=(t,o)=>{const r=[t-y[0],o-y[1],sr(t,o)-y[2]],i=Math.max(L(r,b),1);return[L(r,N)/(i*V),L(r,B)/(i*V),1/(i*V)]},ie=Pe==="pollen gold"?[1,.66,.13]:Pe==="dust grey"?[.5,.47,.44]:[.27,.26,.26],Ut=ve(te,te),Ot=xe(Ut);e.bindFramebuffer(e.FRAMEBUFFER,Ot),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(v.haze.p),D(0,ye,v.haze.u.uN),e.uniform4fv(v.haze.u.uK,new Float32Array([ie[0]*.52,ie[1]*.52,ie[2]*.52,Pe==="ash"?.16:.11,.36,.55,.3,0])),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),he();const hr=15e3,yr=320,W=new Float32Array((hr*2+yr+1200)*4),_o=2/O/U,br=s()*9,wr=s()*9;let S=0,Ar=0,gr=0;for(let t=0;t<hr;t++){let o=(s()-.5)*2.5,r=t%5<3?-.3+(s()-s())*.42:-1.25+s()*s()*1.75;const i=t>0&&s()<.14;let a;if(i){a=[Ar+(s()-.5)*.9,gr+(s()-.5)*2.2];const f=[a[0]-y[0],a[1]-y[1],-y[2]],p=L(f,b);if(p<2)continue;o=L(f,N)/(p*K),r=L(f,B)/(p*K),a[2]=p}else a=fe(o,r);const u=.52+.48*Math.sin(a[0]*.17+br)*Math.sin(a[1]*.13+wr);if(s()>u+.24||s()<Math.min(.94,Math.max(0,(-.42-r)*2.2)))continue;Ar=a[0],gr=a[1];const l=(.016+s()*s()*.05)*(Pe==="ash"?1.25:1),c=Math.max(l/(a[2]*V),_o*.7);if(W[S*4]=o/U,W[S*4+1]=r/U,W[S*4+2]=c,W[S*4+3]=s(),S++,H()<.22)for(let f=1+Math.floor(H()*4);f>0;f--){const p=H()*6.283,n=c*(1.4+H()*1.6);W[S*4]=o/U+Math.cos(p)*n,W[S*4+1]=r/U+Math.sin(p)*n*.6,W[S*4+2]=c*(.45+H()*.4),W[S*4+3]=H(),S++}}for(let t=2;t<48;t++){const o=me[t*2],r=me[t*2+1],i=me[t*2+2]-o,a=me[t*2+3]-r,u=Math.hypot(i,a)||1;for(let l=0;l<22;l++){const c=l%2?1:-1,f=Po*(1.05+H()*H()*1.4),p=H(),n=Pa(o+i*p-a/u*f*c,r+a*p+i/u*f*c);W[S*4]=n[0],W[S*4+1]=n[1],W[S*4+2]=Math.max((.014+H()*H()*.036)*n[2],_o*.7),W[S*4+3]=H(),S++}}for(let t=0;t<yr;t++){const o=(s()-.5)*2.5,r=-1.25+s()*s()*1.72,i=fe(o,r),a=.03+s()*s()*s()*.2;W[S*4]=o/U,W[S*4+1]=r/U,W[S*4+2]=Math.max(a/(i[2]*V),_o*.7),W[S*4+3]=2+s()*.999,S++}const No=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,No),e.bufferData(e.ARRAY_BUFFER,W.subarray(0,S*4),e.STATIC_DRAW);const Rr=Be(No,[[4,0]],16);e.useProgram(v.gr.p),D(0,ye,v.gr.u.uN),e.uniform4fv(v.gr.u.uK,new Float32Array([ie[0]*.62,ie[1]*.62,ie[2]*.62,Pe==="ash"?.1:.42,P[0]*.55,P[1]*.55,P[2]*.55,Pe==="pollen gold"?.6:0,ee[0]*1.4,ee[1]*1.4,ee[2]*1.4,0])),e.bindVertexArray(Rr),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,S),e.disable(e.BLEND),kt(Ut,Ot,st,wt,1,0,16),kt(st,wt,Ut,Ot,.36,0,10),e.deleteVertexArray(Rr),e.deleteBuffer(No),e.deleteVertexArray(Fo),e.deleteBuffer(Lt),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(wt),e.deleteFramebuffer(ct),e.deleteFramebuffer(Ot),e.deleteTexture(st);const it=512,Fr=ve(it,it),Er=xe(Fr);e.clearColor(1,1,1,1),e.clear(e.COLOR_BUFFER_BIT);const Mr=e.createBuffer(),_a=Be(Mr,[[4,0],[2,16]],24),Bo=v.st.u;e.useProgram(v.st.p);const zr=new Float32Array([ze,b[0],b[1],b[2],y[0],y[1],y[2],vo,N[0],N[1],N[2],V,B[0],B[1],B[2],mo/U]);e.uniform4fv(Bo.uK,zr);const He=new Float32Array(h*6*2),Dr=(t,o)=>{e.bindFramebuffer(e.FRAMEBUFFER,Er),e.viewport(0,0,it,it),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ZERO,e.ONE_MINUS_SRC_ALPHA),e.useProgram(v.st.p),D(0,ye,Bo.uN),e.bindBuffer(e.ARRAY_BUFFER,Mr),e.bufferData(e.ARRAY_BUFFER,t.subarray(0,o*6),e.DYNAMIC_DRAW),e.bindVertexArray(_a),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,o)},So=z?3.25:qe==="one great pearl"?4.1:X?3+s()*.7:2+s()*1.5;{const t=z?5:3+Math.floor(s()*4),o=[];let r=1;for(let a=0;a<t;a++){const u=a===0,l=a===1?-.62:a===2?3.4:0;let c=u?-1.95+(z?0:(s()-.5)*1.2):l?l+(s()-.5)*.3:s()*6.283,f=u?26:l?15+s()*6:9+s()*18;const p=(s()-.5)*.014+(u?-.004:0),n=u?.72+s()*.2:l?.55+s()*.2:.3+s()*.34;let m=Math.cos(c)*f,x=Math.sin(c)*f;for(;f>1&&o.length<1400*6;){u&&(r=.75+.55*Math.min(1,f/12)),c+=p*(1+.4*Math.sin(f*.4+a)),f-=.4;const w=Math.cos(c)*f,R=Math.sin(c)*f;R>-17&&R<11&&o.push(m,x,w,R,r*n*(.86+.14*Math.sin(f*1.7+a*2)),.9),m=w,x=R}}o.push(0,0,.01,0,So*.72,1);for(let a=0;a<48;a++)o.push(me[a*2],me[a*2+1],me[a*2+2],me[a*2+3],Po*(.92+.1*Math.sin(a*.7)),1);const i=new Float32Array(o);Dr(i,i.length/6)}e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null);const F=new Float32Array(h),T=new Float32Array(h),I=new Float32Array(h),oe=new Float32Array(h),re=new Float32Array(h),ae=new Float32Array(h),A=new Float32Array(h),Ce=new Float32Array(h),Xe=new Float32Array(h),gt=new Float32Array(h),Rt=new Float32Array(h),ut=new Float32Array(h),Ft=new Float32Array(h),Et=new Float32Array(h),Mt=new Float32Array(h),Ke=new Float32Array(h),Tr=new Float32Array(h),Ve=new Float32Array(h),Ht=new Float32Array(h),j=new Uint8Array(h),We=new Float32Array(se),Le=new Float32Array(se),Ye=new Float32Array(se),ke=new Int16Array(se).fill(-1),Co=new Float32Array(se),ne=56,lt=new Float32Array(ne*ne).fill(1);for(let t=0;t<ne;t++)for(let o=0;o<ne;o++)lt[t*ne+o]=.55+.45*Math.sin(((o+.5)/ne*80-40)*.17+br)*Math.sin(((t+.5)/ne*80-40)*.13+wr);const Xt=300,Ko=1/60;let ft=0;const Ge=(t,o,r,i,a,u,l)=>{let c=-1;for(let f=0;f<h;f++)if(!j[f]){c=f;break}return c<0?-1:(j[c]=1,ft++,F[c]=t,T[c]=o,I[c]=i,oe[c]=re[c]=0,ae[c]=a,A[c]=r,Ce[c]=Xe[c]=gt[c]=Rt[c]=0,ut[c]=u,Ft[c]=t,Et[c]=o,Mt[c]=l||0,Ke[c]=0,Tr[c]=s()*6.28,Ve[c]=0,Ht[c]=0,c)},zt=t=>{for(let o=0;o<se;o++)if(ke[o]<0){const r=s()*2-1,i=s()*6.283,a=Math.sqrt(Math.max(0,1-r*r))*(.45+s()*.42);return We[o]=Math.cos(i)*a,Le[o]=Math.sin(i)*a,Ye[o]=r*.75,ke[o]=t,Co[o]=.55+s()*.5,o}return-1},Na=(t,o)=>fe(t,o),Vt=(t,o,r)=>{for(let i=0;i<h;i++)if(j[i]&&Math.hypot(F[i]-t,T[i]-o)<(A[i]+r)*1.25)return!1;return!0},Pr=Ge(0,0,So,0,0,0),Ba=z?9:4+Math.floor(s()*8);for(let t=0;t<Ba;t++)zt(Pr);const Sa=qe==="heavy dew"?38:qe==="one great pearl"?12:22,Ca=X?1.45:1,pe=(t,o,r,i)=>{const a=Na(t,o);return a[1]>58||!Vt(a[0],a[1],r)?-1:Ge(a[0],a[1],r,0,0,i,0)};if(z&&(pe(.42,-.32,1.02,40),pe(-.72,-.3,.78,34),pe(.68,-.12,.56,40),pe(-.5,-.5,.42,46),pe(.2,-.55,.34,46),pe(.92,-.72,.8,50),pe(-.74,.02,.9,32),pe(.46,.03,1,40),pe(.1,.12,.8,42),pe(-.32,.1,1.2,40)),ao!=="one pearl")for(let o=0,r=0;o<40&&r<7;o++){let i,a;const u=(.7+Ne()*Ne()*1.3)*(.85+Ne()*.3);{const l=Ne()*6.283,c=So+3.5+Ne()*10;i=Math.cos(l)*c,a=Math.sin(l)*c*.8}a>40||!Vt(i,a,u)||(Ge(i,a,u,0,0,400,0),r++)}for(let t=0;t<Sa;t++){const o=(s()-.5)*2.1,r=-.98+s()*s()*1.14,i=s();pe(o,r,(.13+i*i*i*(r<-.35?.34:.9))*Ca,6+s()*36)}for(let t=0;t<h;t++)if(j[t]&&t!==Pr){let o=1e9;for(let r=0;r<=48;r++)o=Math.min(o,Math.hypot(F[t]-me[r*2],T[t]-me[r*2+1]));o<Po+A[t]+qt*.6&&(j[t]=0,ft--)}if(Vt(Z[0],Z[1],qt)){const t=Ge(Z[0],Z[1],qt,0,0,z?26:12+H()*20);if(t>=0){Ft[t]=Z[0],Et[t]=Z[1];for(let o=0;o<7;o++)zt(t)}}const Lo=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Lo),e.bufferData(e.ARRAY_BUFFER,h*32,e.DYNAMIC_DRAW);const Ka=Be(Lo,[[4,0],[4,16]],32),ko=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ko),e.bufferData(e.ARRAY_BUFFER,se*24,e.DYNAMIC_DRAW);const La=Be(ko,[[4,0],[2,16]],24),Fe=new Float32Array(h*8),Qe=new Float32Array(se*6),Wt=new Float32Array(28),be=new Float32Array(9),_r=Je([-C[0],-C[1],0]),ka=q?.1:X?1.1:.95,vt=[ee[0]*1.1+.1,ee[1]*1.15+.1,ee[2]*1.2+.12];e.useProgram(v.shd.p);const Nr=new Float32Array([_r[0],_r[1],ka,.46,P[0]*.3,P[1]*.34,P[2]*.36,0,vt[0],vt[1],vt[2],ze]);e.uniform4fv(v.shd.u.uD,Nr);const qa=Math.max(C[2]*.55+.45,0),qo=q?.6:1,Io=[0,1,2].map(t=>(de[t]+(Oe[t]-de[t])*.72)*(P[t]*qa*.5+ee[t])),Uo=[de[0]*1.3+.02,de[1]*1.3+.02,de[2]*1.3+.02];e.useProgram(v.drop.p);const Br=new Float32Array([y[0],y[1],y[2],V,N[0],N[1],N[2],ze,B[0],B[1],B[2],xt,b[0],b[1],b[2],0,C[0],C[1],C[2],q?.1:X?2.2:1.6,P[0],P[1],P[2],uo,fo?1:0,Eo/6.2832,Mo,q?1:1.35,Io[0],Io[1],Io[2],0,vt[0]*qo,vt[1]*qo,vt[2]*qo,q?.9:X?2.2:1.8,Uo[0],Uo[1],Uo[2],0,1,.985,.975,0]);e.uniform4fv(v.drop.u.uD,Br),e.useProgram(v.spk.p),e.uniform3f(v.spk.u.uC0,ie[0]*.7,ie[1]*.7,ie[2]*.7),e.useProgram(v.comp.p),e.uniform4f(v.comp.u.uG,uo,.07,1/256,O>=500?.011:.008);const Oo={};J.owner=Oo;const Ia=()=>{J.owner=Oo,Ho=1e9,e.useProgram(v.st.p),e.uniform4fv(Bo.uK,zr),e.useProgram(v.shd.p),e.uniform4fv(v.shd.u.uD,Nr),e.useProgram(v.drop.p),e.uniform4fv(v.drop.u.uD,Br),e.useProgram(v.spk.p),e.uniform3f(v.spk.u.uC0,ie[0]*.7,ie[1]*.7,ie[2]*.7),e.useProgram(v.comp.p),e.uniform4f(v.comp.u.uG,uo,.07,1/256,O>=500?.011:.008)};let Ho=1e9,Sr=1e9;const Ua=(t,o)=>{if(Math.abs(t-Ho)+Math.abs(o-Sr)<1e-5)return;Ho=t,Sr=o;const r=Je([1,0,t]);let i=[0,1,o];const a=L(i,r);i=Je([i[0]-r[0]*a,i[1]-r[1]*a,i[2]-r[2]*a]);const u=to(r,i),l=$e=>[L($e,r),L($e,i),L($e,u)],c=l(y),f=l(N),p=l(B),n=l(b);Wt.set([c[0],c[1],c[2],K,f[0],f[1],f[2],mo,p[0],p[1],p[2],vo,n[0],n[1],n[2],2/O,r[0],r[1],r[2],nr,i[0],i[1],i[2],0,u[0],u[1],u[2],0]);const m=K*(c[0]*f[2]-c[2]*f[0]),x=K*(c[0]*p[2]-c[2]*p[0]),w=c[0]*n[2]-c[2]*n[0],R=K*(c[1]*f[2]-c[2]*f[1]),E=K*(c[1]*p[2]-c[2]*p[1]),g=c[1]*n[2]-c[2]*n[1],_=K*f[2],$=K*p[2],ue=n[2],we=[N[0]/V,N[1]/V,-L(y,N)/V],Ee=[B[0]/V,B[1]/V,-L(y,B)/V],Me=[b[0],b[1],-L(y,b)],le=($e,Va,Wa,Ya)=>$e[0]*Va+$e[1]*Wa+$e[2]*Ya;be[0]=le(we,m,R,_),be[3]=le(we,x,E,$),be[6]=le(we,w,g,ue),be[1]=le(Ee,m,R,_),be[4]=le(Ee,x,E,$),be[7]=le(Ee,w,g,ue),be[2]=le(Me,m,R,_),be[5]=le(Me,x,E,$),be[8]=le(Me,w,g,ue),e.useProgram(v.comp.p),e.uniformMatrix3fv(v.comp.u.uM,!1,be),e.useProgram(v.drop.p),e.uniform4fv(v.drop.u.uC,Wt),e.useProgram(v.shd.p),e.uniform4fv(v.shd.u.uC,Wt.subarray(0,20)),e.useProgram(v.spk.p),e.uniform4fv(v.spk.u.uC,Wt.subarray(0,20))};let Yt=0,Gt=0,Qt=0,Zt=0,Xo=0,Vo=0,Wo=0,Yo=0,Cr=!1,Go=0,jt=!1,Kr=0,Lr=0,Ze=null,$t=0,kr=9,dt=0,je=0,Dt=0,qr=0,Ir=0,Qo=0,Zo=0,jo=2+s()*5;const Oa=qe==="one great pearl"?4.9:3.8,mt=d.sound,ja={n:0},Ur=t=>{j[t]=0,ft--;for(let o=0;o<se;o++)ke[o]===t&&(ke[o]=-1)},Ha=(t,o)=>{const r=A[t]>=A[o]?t:o,i=r===t?o:t,a=A[r]**3,u=A[i]**3,l=a+u,c=Math.cbrt(l),f=F[i]-F[r],p=T[i]-T[r],n=Math.hypot(f,p)+1e-4,m=A[i]/A[r];F[r]=(F[r]*a+F[i]*u)/l,T[r]=(T[r]*a+T[i]*u)/l,oe[r]=(oe[r]*a+oe[i]*u)/l,re[r]=(re[r]*a+re[i]*u)/l;const x=I[r]>.001||I[i]>.001;ae[r]=(ae[r]*a+ae[i]*u)/l,I[r]=(I[r]*a+I[i]*u)/l,A[r]=c,ut[r]=0,Mt[r]=0;const w=Math.min(.2,.3*m*m+.03),R=Math.abs(f)>Math.abs(p)?1:-1;gt[r]=R*w,Rt[r]=0,Xe[r]+=-1.5*m,Ke[r]=Math.min(.05,Ke[r]+.02*m+.004),!x&&m>.46&&c<2.1&&(ae[r]=58*Math.sqrt(1/Math.max(c,.22))*(.55+m*.55),I[r]=.02,ae[r]>110&&(ae[r]=110));for(let g=0;g<se;g++)ke[g]===i&&(ke[g]=r);Ur(i);const E=Math.max(-1,Math.min(1,F[r]/14));return c>.5&&mt.note(0,{freq:1500/Math.pow(c,.6)*(1+s()*.1),dur:.08+c*.03,vel:Math.min(.32,.08+m*.25),wave:"sine",pan:E}),r},Xa=(t,o)=>{o[0]=F[t]/er+Qt,o[1]=T[t]/er+Zt},Tt=[0,0];function Or(t){let o=0,r=0,i=-1,a=0;for(let n=0;n<h;n++)if(j[n]){if(I[n]<=0){const m=A[n]*A[n]*A[n];o+=m*F[n],r+=m*T[n]}A[n]>a&&(a=A[n],i=n)}if(kr=a,dt===0&&a>=Oa){dt=1,je=0;const m=-1.57+(s()<.5?-1:1)*(.9+s()*.45);qr=Math.cos(m),Ir=Math.sin(m)}dt===1?(je+=t,Dt=Math.min(.34,Dt+t*(.05+je*.16)),(je>9||i<0||a<2.6)&&(dt=2,je=0)):dt===2&&(je+=t,Dt=0,je>3&&(dt=0));const u=.0035*Math.sin(Yt*.73)+.0024*Math.sin(Yt*1.91+1.3),l=Wo-qr*Dt-o*9e-7+u,c=Yo-Ir*Dt-r*9e-7+u*.6,f=7.5,p=.2;Xo+=(f*f*(l-Qt)-2*p*f*Xo)*t,Vo+=(f*f*(c-Zt)-2*p*f*Vo)*t,Qt+=Xo*t,Zt+=Vo*t;for(let n=0;n<h;n++){if(!j[n])continue;const m=A[n];if(Mt[n]>0&&(A[n]=m+Mt[n]*t,A[n]>1.3&&(Mt[n]=0)),I[n]>0||ae[n]>0){if(ae[n]-=Xt*t,I[n]+=ae[n]*t,F[n]+=oe[n]*t,T[n]+=re[n]*t,I[n]<=0){I[n]=0;const g=-ae[n];g>26?(ae[n]=g*.52,I[n]=.001,Xe[n]+=Math.min(5.5,g*.05)*Xr(m)/12,Ke[n]=Math.min(.05,Ke[n]+g*22e-5),m>.4&&mt.note(0,{freq:980/Math.pow(m,.55)*(1+s()*.12),dur:.06,vel:Math.min(.3,g*.002),wave:"sine",pan:Math.max(-1,Math.min(1,F[n]/14))})):(ae[n]=0,Xe[n]+=g*.05)}}else{Xa(n,Tt);const g=Math.hypot(Tt[0],Tt[1]),_=.05*(.85/m)*(.85/m),$=Math.hypot(oe[n],re[n]);if(ut[n]>0&&(ut[n]-=t,g>.15&&g>_&&(ut[n]=0)),ut[n]>0||$<.25&&g<_)oe[n]=0,re[n]=0;else{const ue=-Xt*.72*Tt[0],we=-Xt*.72*Tt[1];oe[n]+=ue*t,re[n]+=we*t;const Ee=(.32*Xt*Math.min(.5,_)+.85*Hr(oe[n],re[n]))*t,Me=Hr(oe[n],re[n]);if(Me>1e-5){const le=Math.max(0,1-Ee/Me);oe[n]*=le,re[n]*=le}F[n]+=oe[n]*t,T[n]+=re[n]*t}}const x=Xr(m),w=.13;Xe[n]+=(-x*x*Ce[n]-2*w*x*Xe[n])*t,Ce[n]+=Xe[n]*t,Rt[n]+=(-x*x*gt[n]-2*w*x*Rt[n])*t,gt[n]+=Rt[n]*t,Ce[n]>.3?Ce[n]=.3:Ce[n]<-.1&&(Ce[n]=-.1),Ke[n]*=1-2.6*t;const R=F[n],E=T[n];(Math.abs(R)>34||E<-21||R*R+E*E>xt*xt)&&(m>2&&(mt.note(0,{freq:110,dur:.5,vel:.7,wave:"sine",cutoff:500}),mt.hit("noise",.25),mt.note(0,{freq:240,dur:.22,vel:.3,wave:"sine",at:.06})),Ur(n))}for(let n=0;n<h;n++)if(j[n])for(let m=n+1;m<h;m++){if(!j[m])continue;const x=F[n]-F[m],w=T[n]-T[m],R=(Ve[n]||A[n])+(Ve[m]||A[m]);if(x*x+w*w>=R*R)continue;const E=I[n]-I[m];if(Math.abs(E)>Math.max(A[n],A[m])*1.9)continue;if(Ha(n,m)!==n)break}for(let n=0;n<h;n++)if(j[n]){const m=A[n],x=I[n]>.05?1:1/(1+.017*m*m),w=Math.exp(Ce[n]);Ve[n]=m*Math.pow(x,-1/3)*w,Ht[n]=m*Math.pow(x,2/3)/(w*w)}}function Hr(t,o){return Math.sqrt(t*t+o*o)}function Xr(t){return Math.min(30,20/Math.pow(t,.78))}const Jt=new Int16Array(h),eo=new Float32Array(h),Vr=()=>{J.owner!==Oo&&Ia(),Ua(Qt*.65,Zt*.65);let t=0;for(let a=0;a<h;a++){if(!j[a]||I[a]>.02)continue;const u=F[a]-Ft[a],l=T[a]-Et[a],c=u*u+l*l;if(c<.03)continue;const f=Math.sqrt(c),p=A[a];if(t<h){const x=t*6;He[x]=Ft[a],He[x+1]=Et[a],He[x+2]=F[a],He[x+3]=T[a],He[x+4]=Math.max(.1,p*.36+Ve[a]*.14),He[x+5]=.96,t++}const n=Math.floor((F[a]+40)/80*ne),m=Math.floor((T[a]+40)/80*ne);if(n>=0&&m>=0&&n<ne&&m<ne){const x=lt[m*ne+n];x>.08&&s()<x*f*Math.min(1.1,p)*.55&&zt(a),lt[m*ne+n]=x*(1-Math.min(.3,f*p*.07))}Ft[a]=F[a],Et[a]=T[a]}if(t&&(Dr(He,t),e.disable(e.BLEND)),Zo>1.2){Zo=0,e.bindFramebuffer(e.FRAMEBUFFER,Er),e.viewport(0,0,it,it),e.useProgram(v.fill.p),e.uniform4f(v.fill.u.uC,2/255,2/255,2/255,1),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ONE),he(),e.disable(e.BLEND);for(let a=0;a<lt.length;a++)lt[a]<1&&(lt[a]+=.005)}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,O,O),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),e.blendEquation(e.FUNC_ADD);const o=v.comp.u;e.useProgram(v.comp.p),D(0,dr,o.uBg),D(1,bt,o.uL),D(2,Ut,o.uP),D(3,Fr,o.uK),D(4,po,o.uW),he();let r=0;for(let a=0;a<h;a++)if(j[a]){const u=(F[a]-y[0])*b[0]+(T[a]-y[1])*b[1];let l=r++;for(;l>0&&eo[l-1]<u;)eo[l]=eo[l-1],Jt[l]=Jt[l-1],l--;eo[l]=u,Jt[l]=a}for(let a=0;a<r;a++){const u=Jt[a],l=a*8,c=Ve[u]||A[u],f=Ht[u]||A[u],p=gt[u];Fe[l]=F[u],Fe[l+1]=T[u],Fe[l+2]=(F[u]*F[u]+T[u]*T[u])/(2*ze)+I[u]+f*.965,Fe[l+3]=c*(1+p),Fe[l+4]=c*(1-p),Fe[l+5]=f,Fe[l+6]=Ke[u]+.0016/Math.max(1,3.4-A[u]),Fe[l+7]=Tr[u]+Yt*4.6}e.bindBuffer(e.ARRAY_BUFFER,Lo),e.bufferData(e.ARRAY_BUFFER,Fe.subarray(0,r*8),e.DYNAMIC_DRAW),e.enable(e.BLEND),e.blendFunc(e.ONE,e.SRC_ALPHA),e.useProgram(v.shd.p),e.bindVertexArray(Ka),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,r),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(v.drop.p),D(0,Bt,v.drop.u.uE),D(1,bt,v.drop.u.uL),D(2,zo,v.drop.u.uLT),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,r);let i=0;for(let a=0;a<se;a++){const u=ke[a];if(u<0||!j[u])continue;const l=i*6,c=Ve[u]||A[u],f=Ht[u]||A[u];Qe[l]=F[u]+We[a]*c*1.02,Qe[l+1]=T[u]+Le[a]*c*1.02,Qe[l+2]=(F[u]*F[u]+T[u]*T[u])/(2*ze)+I[u]+f*.965+Ye[a]*f*1.02,Qe[l+3]=.03+Co[a]*.022,Qe[l+4]=Co[a],Qe[l+5]=.9*(Le[a]<0?1:.45),i++}i&&(e.bindBuffer(e.ARRAY_BUFFER,ko),e.bufferData(e.ARRAY_BUFFER,Qe.subarray(0,i*6),e.DYNAMIC_DRAW),e.useProgram(v.spk.p),e.bindVertexArray(La),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,i)),e.disable(e.BLEND),e.bindVertexArray(null)};return Or(1e-4),Vr(),(t,o)=>{o=Math.min(o,.14),Yt+=o,Zo+=o;const r=d.input,i=r.taps();for(const c of i)Ze={x:c.x,y:c.y,age:0};if(r.down){Cr||(Kr=r.x,Lr=r.y,Go=0,jt=!1,$t=0),Go+=o;const c=r.x-Kr,f=r.y-Lr;if(!jt&&c*c+f*f>.0014&&(jt=!0,Ze=null),jt)Wo=Math.max(-.2,Math.min(.2,-c*.95)),Yo=Math.max(-.2,Math.min(.2,f*.95));else if(Go>.22)for(Ze=null,$t+=o*9;$t>1;){$t-=1;const p=fe((r.x-.5)*2+(s()-.5)*.75,(.5-r.y)*2+(s()-.5)*.55);p[1]<56&&ft<h-1&&Ge(p[0],p[1],.22+s()*s()*.42,24+s()*10,-40,0)}}else if(Wo=0,Yo=0,Ze){const c=fe((Ze.x-.5)*2,(.5-Ze.y)*2);if(ft<h){const f=Ge(c[0],Math.min(52,c[1]),(X?1.65:1.2)+s()*.4,30,-60,0);if(f>=0)for(let p=0;p<2;p++)s()<.3&&zt(f)}Ze=null}Cr=r.down,Qo+=o;const a=kr<2,u=(qe==="heavy dew"?.34:.46)*(a?.45:1);for(;Qo>u;)if(Qo-=u,ft<60){const c=a&&s()<.6?[(s()-.5)*26,(s()-.5)*22]:fe((s()-.5)*2.15,-.98+s()*s()*1.16);if(c[1]<56&&Vt(c[0],c[1],.14)){const f=Ge(c[0],c[1],.1+s()*.05,0,0,0,(.022+s()*.03)*(X?1.3:1)*(a?2.2:1));f>=0&&a&&s()<.3&&zt(f)}}Gt+=o;let l=0;for(;Gt>=Ko&&l<9;)Or(Ko),Gt-=Ko,l++;l===9&&(Gt=0);for(let c=0;c<se;c++){const f=ke[c];if(f<0)continue;const p=Math.max(.2,A[f]),n=-re[f]/p*.45*o,m=oe[f]/p*.45*o,x=(.12+Ke[f]*16)*o*(c%2?1:-1),w=We[c],R=Le[c],E=Ye[c];We[c]=w+m*E-x*R,Le[c]=R+x*w-n*E,Ye[c]=E+n*R-m*w;const g=We[c]*We[c]+Le[c]*Le[c]+Ye[c]*Ye[c];if(g>.78){const _=.883/Math.sqrt(g);We[c]*=_,Le[c]*=_,Ye[c]*=_}}if(jo-=o,jo<0){jo=5+s()*9;const c=2+Math.floor(s()*4),f=2200+s()*1600,p=(s()-.5)*1.4;for(let n=0;n<c;n++)mt.note(0,{freq:f*(1+.12*Math.sin(n*2.1)),dur:.07+s()*.06,vel:.06,wave:"sine",pan:p,at:n*.13})}Vr()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
