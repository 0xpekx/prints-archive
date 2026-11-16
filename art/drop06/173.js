// Puffball: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/173.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ho){Ho&&function(){"use strict";const Cr="",Oo=new WeakMap,be=56,et=5,bt=512,Ur=128,Gr=200,le=40,gt=2.4,Xo=0,jo=Xo?{"9202696d":{species:"giant",view:"in close"},c3b94e83:{species:"giant",ripe:"unopened"},e57644ac:{species:"earthstar",ripe:"unopened"},ff0b6210:{species:"earthstar",ripe:"full",floor:"moss",view:"eye level",company:"a few behind"},cd930983:{lightK:"misty dawn",ripe:"unopened",company:"alone"},"8fae753a":{lightK:"dappled",ripe:"nearly spent",spore:"purple-brown"},"0f04f96d":{weather:"light rain",view:"from above",ripe:"full"},d46527f3:{floor:"rotten log",company:"a tight cluster",ripe:"full"},"12ee2211":{floor:"rotten log",company:"fairy ring",ripe:"full"},"531c20ed":{view:"from above",lightK:"low sun shaft",company:"a few behind",ripe:"full"},"02532251":{company:"fairy ring",lightK:"dappled",ripe:"full"},"093e4294":{ripe:"unopened",company:"a tight cluster",lightK:"low sun shaft"},"73d38d93":{ripe:"just ripe",company:"alone",view:"in close"},cecccbdf:{species:"pear",ripe:"unopened",floor:"moss",lightK:"low sun shaft",view:"in close",company:"alone"},a2d7cd37:{species:"earthstar",ripe:"full",company:"fairy ring"}}:null,P=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
`+Cr+`
`,Z=P+"layout(location=0) in vec2 a; out vec2 vP; void main(){ vP=a; gl_Position=vec4(a,0.,1.); }",tt=`
uniform vec4 uCam[4];
out float vD;
vec4 proj(vec3 P){ vec3 e=P-uCam[0].xyz; float d=dot(e,uCam[3].xyz),n=uCam[1].w,f=uCam[2].w; vD=d;
  return vec4(dot(e,uCam[1].xyz)/uCam[0].w,dot(e,uCam[2].xyz)/uCam[0].w,(f+n)/(f-n)*d-2.*f*n/(f-n),d); }
`,Ft=`
uvec4 pcg4(uvec4 v){ v=v*1664525u+1013904223u; v.x+=v.y*v.w; v.y+=v.z*v.x; v.z+=v.x*v.y; v.w+=v.y*v.z; v^=v>>16u; v.x+=v.y*v.w; v.y+=v.z*v.x; v.z+=v.x*v.y; v.w+=v.y*v.z; return v; }
vec4 h4(int i,int s){ return vec4(pcg4(uvec4(uint(i),uint(s),77u,13u)))/4294967295.; }
`,qe=`
uniform vec4 uL[6]; uniform vec4 uAm[2];
float shaftAt(vec3 P){
  vec3 q=P-uL[2].xyz;
  float s=dot(q,uL[1].xyz),g=dot(q,uL[3].xyz);
  // further from the gap in the leaves (down the beam) the edges soften
  float far=clamp((3.2-dot(q,uL[0].xyz))*.3,0.,2.5),sw=uL[0].w+.28*far*far*clamp(1.-uL[0].w*2.2,.15,1.);
  float n=textureLod(uN,vec2(s,g)*uL[3].w+vec2(.31,.77),0.).r;
  float e=abs(s+(n-.5)*sw*2.5);
  float m=1.-smoothstep(uL[1].w-sw,uL[1].w+sw,e);
  // fingers of light from several gaps, different widths, dark gaps between; the one on the ball is always open
  float fn=textureLod(uN,vec2(s*.17+.21,g*.02+.6),0.).b,fw=.06+.07*far;
  float sB=s-dot(uL[5].xyz-uL[2].xyz,uL[1].xyz);
  float fg=max(smoothstep(.5-fw,.5+fw,fn),exp(-sB*sB*.5));
#ifndef D_RAISED
  m*=mix(1.,mix(.06,1.,fg),clamp(1.-uL[0].w*2.6,0.,1.));
#else
  // seen from above, ruled fingers of light lay parallel stripes over the floor like furrows: only the leaf gobo
  m*=mix(1.,mix(.35,1.,fg),clamp(1.-uL[0].w*2.6,0.,1.)*.4);
#endif
  float h=textureLod(uN,vec2(s,g)*uL[3].w*2.7+vec2(.11,.43),0.).g*.65+textureLod(uN,vec2(s,g)*uL[3].w*.9+vec2(.47,.19),0.).r*.35;
  return m*mix(1.,smoothstep(.36,.64,h),uL[2].w)*smoothstep(-2.5,-.7,P.y+(n-.5)*1.5);
}
float ballSh(vec3 P){ vec3 o=P-uL[5].xyz; float b=dot(o,uL[0].xyz); float d=length(o-b*uL[0].xyz);
  return mix(smoothstep(uL[5].w*.94,uL[5].w*1.14,d),1.,step(0.,b)); }
vec3 ambAt(vec3 N){ return mix(uAm[1].rgb,uAm[0].rgb,N.z*.5+.5); }
`,Ko=`
#ifdef D_RAISED
float cont(vec3 P){ return 1.-.72*(1.-smoothstep(.85,1.9,length(P.xy-uL[5].xy)/uL[5].w)); }
#endif
`,Rt=`
uniform vec4 uG;
float gh(vec2 p){
  float a=textureLod(uN,p*.037+uG.z,0.).r,b=textureLod(uN,p*.11+uG.z*1.7,0.).g,c=textureLod(uN,p*.31+uG.z*.6,0.).b;
#ifdef D_RAISED
  float h=(a-.5)*1.5+(b-.5)*.32+(c-.5)*(uG.x>.5?.1:.3);
#else
  float h=(a-.5)*1.7+(b-.5)*1.1+(c-.5)*(uG.x>.5?.14:.62);
#endif
  float d=length(p);
  h=mix(.03+(c-.5)*.2,h,smoothstep(.55,1.9,d));
  if(uG.x>1.5){ float y=p.y/2.5; h=-1.15+1.2*sqrt(max(1.-y*y,.02))+(c-.5)*.1+(b-.5)*.2; }
  h+=smoothstep(3.,16.,p.y)*1.6;
  return min(h,.1+.34*smoothstep(-5.4,-3.,p.y));
}
`,Qo=`
uniform float uT;
vec3 dirOf(vec2 v){ float rr=length(v),th=rr*uT; return vec3(v/max(rr,1e-5)*sin(th),cos(th)); }
`,Yo=P+`
in vec2 vP; out vec4 o; uniform sampler2D uN; uniform vec4 uW; uniform vec2 uE; uniform int uI; uniform vec4 uS0;
`+Ft+Qo+`
void main(){
  // cells laid on the shaped body (head and stalk), so warts don't stretch down the stalk
  vec3 p=dirOf(vP); float tt=clamp((length(vP)*uT-1.45)/(uT-1.45),0.,1.); 
#ifdef D_NECK
  p=vec3(p.xy*(1.-abs(uS0.x)*tt*tt*(3.-2.*tt)),p.z*uS0.z-uS0.y*tt*tt);
#else
  p=vec3(p.xy*(1.-uS0.x*tt*tt),p.z*uS0.z-uS0.y*tt*tt);
#endif

  p+=(textureLod(uN,vP*.31+.3,0.).rgb-.5)*uW.w+(textureLod(uN,vP*1.1+.7,0.).rgb-.5)*uW.w*.3;
  float f1=9.,f2=9.,id=0.; vec4 r=vec4(0.);
  for(int i=0;i<uI;i++){
    int j=i%8;
    if(j==0&&i>0){ r.rg=vec2(mix(sqrt(f1),sqrt(f2)-sqrt(f1),uE.x),id); f1=9.; f2=9.; }
    float sc=i<8?uW.x:uW.y;
    vec3 g=p*sc+uW.z*(1.+float(i/8)),ip=floor(g),c=vec3(float(j&1),float((j>>1)&1),float((j>>2)&1));
    vec4 h=h4(int(ip.x+8192.)*4099+int(ip.y+8192.)*61+int(ip.z+8192.)+j*131+(i/8),3);
    vec3 e=ip+c+(h.xyz-.5)*.55-g;
    float d=dot(e,e);
    if(d<f1){ f2=f1; f1=d; id=h.w; } else if(d<f2) f2=d;
  }
  r.ba=vec2(mix(sqrt(f1),sqrt(f2)-sqrt(f1),uE.y),id);
  o=r;
}`,$o=P+`
in vec2 vP; out vec4 o; uniform sampler2D uA,uC,uN; uniform vec4 uS[3]; uniform float uT;
void main(){
  vec2 uv=vP*.5+.5; float rr=length(vP),th=rr*uT; vec2 rad=vP/max(rr,1e-4);
  vec4 wa=textureLod(uA,uv,0.),cr=textureLod(uC,uv,0.);
  vec2 s0=uv+uS[2].w;
  vec4 n1=textureLod(uN,s0*1.7,0.),n2=textureLod(uN,s0*5.3,0.),n3=textureLod(uN,s0*17.,0.),n4=textureLod(uN,s0*47.,0.);
  float zone=smoothstep(.35,1.5,th);
  float ex=step(wa.g,uS[0].x*(1.-.4*zone));
  float rW=.2+.08*fract(wa.g*37.);
  float sx=clamp(1.-wa.r/rW,0.,1.);
  float spine=ex*sx*sx*(3.-2.*sx);
  float scar=(1.-ex)*smoothstep(.06,.0,abs(wa.r-rW*.75))*(1.-zone*.6);
  float sm=clamp(1.-wa.b/.4,0.,1.);
  float small=sm*sm*(3.-2.*sm)*(.5+.5*fract(wa.a*91.))*step(wa.a,.9);
  float h=spine*uS[0].y+small*uS[0].z-scar*uS[2].y*.008;
  // folds of paper: they run toward the pore at the apex and wander lower down
  vec2 rc=rad*(1.9+n1.r*.8)+th*.22;
  float rw=1.-2.*abs(textureLod(uN,rc*.41+uS[2].w,0.).g-.5);
  float rid=1.-2.*abs(n2.b-.5);
  float fold=mix(rw,rid,smoothstep(.2,1.,th));
  float wrk=pow(max(fold,0.),2.5);
  // map-space noise stretches along the stalk: fade it out there
  float stk=1.-.85*smoothstep(1.35,1.95,th);
  h+=((textureLod(uN,s0*.61,0.).r-.5)*.06+(n1.g-.5)*.02)*clamp(uS[0].w*2.,.3,1.)*stk;
  h+=stk*uS[0].w*(wrk*.022*mix(.4,1.,smoothstep(.3,.9,th))+(n1.b-.5)*.025+(n2.g-.5)*.01+(n3.g-.5)*.005+(n4.g-.5)*.002);
  // cracks and peeling plates
  float cw=.035+.05*n2.r;
  float crack=(1.-smoothstep(0.,cw,cr.r+(n3.b-.5)*.03))*uS[1].x*smoothstep(.1,.7,n1.g+.25);
  float plateE=1.-smoothstep(0.,.05+.04*n2.a,cr.b+(n3.r-.5)*.02);
  float pid=cr.a;
  float plate=uS[1].y*((pid-.5)*.05+(1.-plateE)*.03+smoothstep(.0,.28,cr.b)*.03*(pid>.5?1.:-.5));
  h+=plate-crack*.055-uS[1].y*plateE*.045;
  // the torn pore
  vec4 rn=textureLod(uN,rad*.13+.5,0.),rn2=textureLod(uN,rad*.47+.2,0.);
  float edge=uS[1].z*(1.+uS[1].w*((rn.r-.5)*2.1+(rn2.g-.5)*1.2));
  float e=th-edge;
  float inside=1.-smoothstep(-.012,.012,e);
  float lip=exp(-e*e/(.0022+.0022*rn2.b));
  float tear=(1.-smoothstep(0.,.12,abs(fract(atan(rad.y,rad.x)*1.91+rn.g*2.)-.5)-.0))*exp(-max(e,0.)*11.)*step(0.,e);
  h+=lip*(.035+.05*(rn2.a-.35));
  h+=uS[2].z<.5?.018*exp(-th*th/.03):0.;
  h-=tear*.02;
  float pit=uS[2].x*smoothstep(.0,.1,-e);
  h=mix(h,h*.15-pit,inside);
  float ao=(.45+.55*smoothstep(-.03,.05,h-(n1.b-.5)*.04*uS[0].w));
  ao*=1.-crack*.75; ao*=1.-uS[1].y*plateE*.7;
  float mask=max(inside,crack*.75);
  float alb=(n2.r-.5)*.45+(n3.a-.5)*.18+spine*.09+small*.05-scar*.25*uS[2].y-lip*.25*(1.-inside);
  o=vec4(h,ao,mask,alb);
}`,Jo=Qo+`
uniform vec4 uS0; // taper (negative: a young pear's hollow neck), stem, flatten, displacement
vec3 shapeAt(vec2 v,float h){
  vec3 d=dirOf(v);
  float th=length(v)*uT,t=clamp((th-1.45)/(uT-1.45),0.,1.);
#ifdef D_NECK
  return vec3(d.xy*(1.-abs(uS0.x)*t*t*(3.-2.*t)),d.z*uS0.z-uS0.y*t*t)+d*h*uS0.w;
#else
  return vec3(d.xy*(1.-uS0.x*t*t),d.z*uS0.z-uS0.y*t*t)+d*h*uS0.w;
#endif
}
`,Zo=P+`
in vec2 vP; out vec4 o; uniform sampler2D uH; uniform vec3 uLo; uniform float uPx; uniform int uI;
`+Jo+`
void main(){
  vec2 uv=vP*.5+.5,dx=vec2(uPx,0.),dy=vec2(0.,uPx);
  float h0=textureLod(uH,uv,0.).r;
  vec3 pxp=shapeAt(vP+dx*2.,textureLod(uH,uv+dx,0.).r),pxm=shapeAt(vP-dx*2.,textureLod(uH,uv-dx,0.).r);
  vec3 pyp=shapeAt(vP+dy*2.,textureLod(uH,uv+dy,0.).r),pym=shapeAt(vP-dy*2.,textureLod(uH,uv-dy,0.).r);
  vec3 N=normalize(cross(pxp-pxm,pyp-pym)); vec3 d=dirOf(vP); if(dot(N,d)<0.) N=-N;
  float rr=max(length(vP),1e-4),th=rr*uT; vec2 ra=vP/rr,ta=vec2(-ra.y,ra.x);
  vec3 et=vec3(ra*cos(th),-sin(th)),ef=vec3(ta,0.);
  float a=dot(uLo,et),b=dot(uLo,ef),sE=dot(uLo,d);
  float cE=max(length(vec2(a,b)),.03);
  vec2 stp=(ra*a/uT+ta*b*rr/max(sin(th),.05))/cE;
  float vis=1.,hA=h0*uS0.w;
  for(int k=1;k<=uI;k++){
    float t=float(k)*float(k)*.0016+.003;
    float hk=textureLod(uH,uv+stp*t*.5,0.).r*uS0.w;
    vis=min(vis,smoothstep(-.035,.09,(hA+t*sE/cE-hk)));
  }
  o=vec4(N,.3+.7*vis);
}`,Wr=P+`
uniform sampler2D uH; uniform vec4 uB0,uB1; uniform mat3 uRot;
`+Jo+tt+`
out vec2 vM; out vec3 vW;
void main(){
  float u=float(gl_VertexID/2)/uB1.x*6.2831853;
  float r=(float(gl_InstanceID)+float(gl_VertexID&1))/uB1.y;
  vec2 v=vec2(cos(u),sin(u))*r;
  vM=v*.5+.5;
  float h=textureLod(uH,vM,0.).r;
  vW=uB0.xyz+uRot*shapeAt(v,h)*uB0.w;
  gl_Position=proj(vW);
}`,qr=P+`
in vec2 vM; in vec3 vW; in float vD; out vec4 o;
uniform sampler2D uH,uK,uN; uniform mat3 uRot; uniform vec4 uPal[4]; uniform float uT; uniform vec3 uCam0;
`+qe+`
void main(){
  vec4 s=texture(uH,vM),nn=texture(uK,vM);
  vec3 No=nn.xyz;
  vec4 f=texture(uN,vM*23.),g=texture(uN,vM*71.);
  float th=length(vM-.5)*2.*uT,stk=1.-.8*smoothstep(1.35,1.95,th);
  No=normalize(No+((f.rgb-.5)*.05+(g.rgb-.5)*.025)*stk);
  vec3 N=uRot*No;
  float mott=texture(uN,vM*3.1).r-.5;
  float m2=texture(uN,vM*9.3).g-.5;
  vec3 alb=mix(uPal[2].rgb,uPal[1].rgb,smoothstep(.1,1.2,th+mott*1.3+m2*.5));
  alb=mix(alb,uPal[0].rgb,smoothstep(1.15,1.85,th+mott*.5));
  alb*=max(1.+s.a*uPal[3].w,.2);
  alb*=mix(vec3(1.),vec3(1.05,.86,.68),smoothstep(-.1,.28,mott+m2*.6));
  alb*=.92+.16*mix(.5,f.a,stk);
  // spore dust around the pore, sifted over the warts
  float dust=(1.-smoothstep(.2,.85,th+mott*.5))*smoothstep(.35,.62,g.r*.5+f.r*.5+.12);
  alb=mix(alb,uPal[3].rgb*.42,dust*.6);
  alb=mix(alb,uPal[3].rgb*.035,s.b);
  vec3 L=uL[0].xyz;
  // the hero's own shading comes from its normals and baked self-shadow; ballSh is only for what stands behind it
  float nl=dot(N,L),sun=shaftAt(vW)*mix(1.,ballSh(vW),step(uL[5].w*1.45,length(vW-uL[5].xyz)))*nn.a;
  float dif=max(nl,0.);
  float wrap=max(nl*.72+.28,0.)*.26;
  vec3 V=normalize(uCam0-vW),H=normalize(L+V);
  float sp=pow(max(dot(N,H),0.),26.)*.12*sun*(1.-s.b)*smoothstep(.0,.2,nl);
  float sheen=pow(1.-max(dot(N,V),0.),4.)*.5;
  float fill=max(dot(N,normalize(vec3(.62,-.62,.3))),0.);
  float rimS=pow(1.-max(dot(N,V),0.),5.)*smoothstep(-.35,.25,dot(N,L));
#ifdef D_RAISED
  alb*=1.-.55*(1.-smoothstep(.1,1.3,vW.z-uL[2].z+2.2));
#endif
#ifdef D_ASUN
  // against the sun: the face is in its own shade, the outline toward the sun catches it through the cones
  fill*=.55; rimS=pow(1.-max(dot(N,V),0.),2.6)*smoothstep(-.2,.45,dot(N,L))*uPal[0].w;
#endif
  vec3 c=alb*(ambAt(N)*s.g*(1.-.7*s.b)*(.62+1.45*fill*fill)+uL[4].rgb*sun*(dif*.9+wrap))+uL[4].rgb*sp+alb*ambAt(N)*sheen+alb*uL[4].rgb*shaftAt(vW)*rimS*.42;
  o=vec4(c,vD/${le}.);
}`,Vr=P+`
uniform sampler2D uN; uniform vec2 uGr;
`+Rt+tt+`
out vec3 vW;
void main(){
  float u=float(gl_VertexID/2)/uGr.x,v=(float(gl_InstanceID)+float(gl_VertexID&1))/uGr.y;
#ifdef D_STEP
  float y=-8.9+v*v*34.;
  vec2 p=vec2((u*2.-1.)*(1.6+(y+9.6)*.5),y);
#else
  float y=-4.9+v*v*30.;
  vec2 p=vec2((u*2.-1.)*(1.+(y+5.2)*.62),y);
#endif
  vW=vec3(p,gh(p));
  gl_Position=proj(vW);
}`,Hr=P+`
in vec3 vW; in float vD; out vec4 o;
uniform sampler2D uN; uniform vec3 uGc;
`+qe+Ko+Rt+`
void main(){
  vec2 p=vW.xy;
  vec3 N=normalize(cross(dFdx(vW),dFdy(vW))); if(N.z<0.) N=-N;
  vec4 a=texture(uN,p*vec2(.21,.55)),b=texture(uN,p*vec2(.9,3.1)),c=texture(uN,p*vec2(3.,7.));
  vec3 alb=uGc*(.45+1.1*a.r);
  if(uG.x>1.5){
    float gr=1.-2.*abs(b.r-.5); gr=pow(gr,3.);
    alb*=.42+.9*(1.-gr)*(.5+c.g);
    N=normalize(N+vec3(0.,(b.g-.5)*1.2,0.));
  } else if(uG.x>.5){
    alb*=.5+c.g*.9;
  } else alb*=.4;
  float sun=shaftAt(vW)*ballSh(vW)*max(dot(N,uL[0].xyz),.05);
#ifdef D_RAISED
  o=vec4(alb*(ambAt(N)*.6+uL[4].rgb*sun*.8)*cont(vW),vD/${le}.);
#else
  o=vec4(alb*(ambAt(N)*.6+uL[4].rgb*sun*.8),vD/${le}.);
#endif
}`,er=`
uniform vec2 uMr; uniform float uMc;
vec3 shootBase(int i,out float sz,out vec4 r){
  r=h4(i,1);
  float sx=r.x*2.3-1.15,sy=mix(uMr.x,uMr.y,pow(r.y,.8));
  vec3 rd=normalize(uCam[3].xyz+(uCam[1].xyz*sx+uCam[2].xyz*sy)*uCam[0].w);
  float t=rd.z<-.012?min((.16-uCam[0].z)/rd.z,34.):34.;
  vec3 b=uCam[0].xyz+rd*t; b.z=gh(b.xy);
  sz=.13+.11*r.z;
  return b;
}
`,Or=P+`
uniform sampler2D uN; uniform vec4 uM;
`+Ft+Rt+tt+er+`
centroid out vec3 vW; centroid out vec3 vN; centroid out vec4 vC; centroid out vec2 vU;
const vec2 C9[9]=vec2[9](vec2(0.,-1.),vec2(0.,1.),vec2(.5,1.),vec2(0.,-1.),vec2(.5,1.),vec2(.5,-1.),vec2(.5,-1.),vec2(.5,1.),vec2(1.,0.));
void main(){
  int inst=gl_InstanceID,vid=gl_VertexID,L=vid/9;
  vec2 cr=C9[vid%9];
  float sz; vec4 r; vec3 b=shootBase(inst,sz,r);
  vec4 r2=h4(inst,2),rl=h4(inst*31+L,5);
  float patch1=textureLod(uN,b.xy*.13+uG.z,0.).g*.7+textureLod(uN,b.xy*.47,0.).r*.3;
  float keep=step(1.-uG.y,patch1+.08*(r2.x-.5)+.35);
  vec3 lean=vec3((r2.zw-.5)*.75,1.),up=normalize(lean);
  float H=sz*(1.25+1.1*r.w);
  vec3 P; vec3 N;
  if(uM.z<.5){
    float s=(float(L)+.5)/uM.y;
    vec3 stem=b+up*H*s+vec3(lean.xy,0.)*H*s*s*.5;
    float az=float(L)*2.39996+r.z*6.283;
    vec3 ra=vec3(cos(az),sin(az),0.);
    float el=mix(.1,1.2,s*s)+(rl.x-.5)*.4;
    vec3 dir=normalize(ra*cos(el)+up*sin(el)),side=normalize(cross(dir,up)+vec3(1e-4));
    float len=sz*(1.05-.5*s)*(.75+.5*rl.y);
    P=stem+dir*len*cr.x-vec3(0.,0.,len*.34*cr.x*cr.x);
    P+=side*cr.y*len*(.1+.03*rl.z)*(cr.x<.25?.55:1.);
    N=normalize(cross(side,dir)+vec3(0.,0.,.3)); if(N.z<0.) N=-N;
    vC=vec4(rl.z,r2.y,s,rl.w);
  } else {
    // a sporophyte: a thin red stalk
    float u=(float(L)+cr.x)/3.;
    vec3 tip=vec3((r2.zw-.5)*.5,1.)*sz*(2.1+1.3*r2.x);
    P=b+vec3(tip.xy*u*u,tip.z*u);
    vec3 dir=normalize(vec3(tip.xy*2.*u,tip.z));
    vec3 side=normalize(cross(dir,uCam[3].xyz));
    P+=side*cr.y*.011*(1.3-.5*u);
    N=normalize(cross(side,dir));
    vC=vec4(.5,r2.y,1.5+u,.5);
  }
  if(uM.z>.5&&b.y<-1.25) keep=0.;
  if(length(b.xy)<uG.w) keep=0.;
  vU=cr;
  vW=P;
  gl_Position=keep>.5?proj(P):vec4(2.,2.,2.,1.);
}`,Xr=P+`
centroid in vec3 vW; centroid in vec3 vN; centroid in vec4 vC; centroid in vec2 vU; in float vD; out vec4 o;
uniform sampler2D uN; uniform vec4 uMp[3]; uniform vec3 uCam0;
`+qe+Ko+`
void main(){
  vec3 N=normalize(vN+vec3(0.,0.,1e-4));
  float s=vC.z;
  vec3 c;
  if(s<1.2){
    c=mix(uMp[0].rgb,uMp[1].rgb,vC.x*.7+smoothstep(.45,1.,s)*.6);
    c=mix(c,uMp[2].rgb,smoothstep(.72,1.,vU.x*.5+s*.6)*vC.y*.9);
    c*=.74+.5*vC.w;
    c*=1.-.32*abs(vU.y)*abs(vU.y);
    if(vU.y*vU.y<.03) c*=1.25;
  } else c=mix(vec3(.2,.045,.012),vec3(.42,.14,.03),(s-1.5));
  vec3 L=uL[0].xyz;
  float ao=s<1.2?mix(.1,1.,pow(s,1.3)):.8;
  float sun=shaftAt(vW)*ballSh(vW)*mix(.25,1.,ao);
  float nl=dot(N,L);
  vec3 V=normalize(uCam0-vW);
  float tr=max(-nl,0.)*.3*(1.+pow(max(dot(-V,L),0.),3.));
  float dif=max(nl,0.);
  vec3 H=normalize(L+V);
  float sp=pow(max(abs(dot(N,H)),0.),40.)*.35*uMp[0].w;
  vec3 col=c*(ambAt(N)*ao+uL[4].rgb*sun*(dif*.62+tr))+uL[4].rgb*sun*sp*.2;
#ifdef D_RAISED
  col*=cont(vW);
#endif
  o=vec4(col,vD/${le}.);
}`,jr=P+`
uniform sampler2D uN; uniform vec4 uM;
`+Ft+Rt+tt+er+`
centroid out vec2 vQ; out vec3 vW; out float vR; out vec4 vX;
const vec2 Q6[6]=vec2[6](vec2(-1.,-1.),vec2(1.,-1.),vec2(1.,1.),vec2(-1.,-1.),vec2(1.,1.),vec2(-1.,1.));
void main(){
  int i=gl_InstanceID;
  vec4 p=h4(i,7);
  int k=int(p.x*uMc);
  float sz; vec4 r; vec3 b=shootBase(k,sz,r);
  vec4 r2=h4(k,2);
  vec3 c; vec2 sc=vec2(1.);
  if(uM.z<.5){
    vec3 lean=vec3((r2.zw-.5)*.75,1.),up=normalize(lean);
    c=b+up*sz*(1.25+1.1*r.w)*(.65+.45*p.y)+vec3(lean.xy,0.)*sz*.5+vec3(cos(p.z*9.),sin(p.z*9.),0.)*sz*.22;
    vR=.012+.042*p.w*p.w*p.w;
  } else {
    b=shootBase(i,sz,r);
    r2=h4(i,2);
    vec3 tip=vec3((r2.zw-.5)*.5,1.)*sz*(2.1+1.3*r2.x);
    c=b+tip;
    vR=.024+.01*p.y;
    sc=vec2(.78,1.55);
  }
  float d=dot(c-uCam[0].xyz,uCam[3].xyz);
  float patch1=textureLod(uN,b.xy*.13+uG.z,0.).g*.7+textureLod(uN,b.xy*.47,0.).r*.3;
  float keep=step(1.-uG.y,patch1+.08*(r2.x-.5)+.35)*step(uG.w,length(b.xy));
  vec2 q=Q6[gl_VertexID%6];
  vQ=q; vW=c; vX=vec4(p.yz,0.,0.);
  vec3 P=c+(uCam[1].xyz*q.x*sc.x+uCam[2].xyz*q.y*sc.y)*vR;
  gl_Position=(d>.4&&keep>.5&&(uM.z<.5||b.y>-1.25))?proj(P):vec4(2.,2.,2.,1.);
}`,Kr=P+`
centroid in vec2 vQ; in vec3 vW; in float vR; in vec4 vX; in float vD; out vec4 o;
uniform sampler2D uN; uniform vec4 uBp; uniform vec3 uLs;
`+qe+`
void main(){
  float r2=dot(vQ,vQ); if(r2>1.) discard;
  float nz=sqrt(1.-r2);
  float sun=shaftAt(vW)*ballSh(vW);
  vec3 col;
  if(uBp.x<.5){
    // water: the world upside down, sun as a hard glint on top and a caustic on the far side
    vec2 l=uLs.xy;
    vec3 lo=uAm[0].rgb*.75,hi=uAm[1].rgb*.15;
    col=mix(hi,lo,smoothstep(-.9,.9,vQ.y));
    col*=.5+.8*(1.-nz*.5);
    float rim=pow(1.-nz,3.);
    col*=1.-rim*.8;
    float ca=exp(-dot(vQ+l*.56,vQ+l*.56)*9.);
    col+=uL[4].rgb*(ca*.26*sun);
    vec2 g=vQ-l*.48;
    col+=uL[4].rgb*(exp(-dot(g,g)*260.)*1.6*sun);
    col+=vec3(.5,.6,.55)*exp(-dot(g,g)*150.)*.025;
      } else {
    float k=vX.x;
    vec3 N=vec3(vQ,nz);
    col=mix(vec3(.16,.075,.03),vec3(.3,.16,.05),k)*(uAm[0].rgb*.8+uL[4].rgb*sun*max(dot(N.xy,uLs.xy)*.6+.42,0.));
    col*=.7+.3*nz;
    col+=uL[4].rgb*sun*.5*exp(-dot(vQ-uLs.xy*.45,vQ-uLs.xy*.45)*40.)*.3;
  }
  o=vec4(col,vD/${le}.);
}`,Qr=P+`
layout(location=1) in vec4 i0; layout(location=2) in vec4 i1; layout(location=3) in vec4 i2;
`+tt+`
out vec3 vW; out vec2 vU; out vec4 vI;
const vec2 C6[6]=vec2[6](vec2(0.,0.),vec2(1.,0.),vec2(1.,1.),vec2(0.,0.),vec2(1.,1.),vec2(0.,1.));
void main(){
  int NU=26,NV=14,q=gl_VertexID/6;
  vec2 c=C6[gl_VertexID%6];
  float u=(float(q%NU)+c.x)/float(NU)*2.-1.,v=(float(q/NU)+c.y)/float(NV)*2.-1.;
  float s=i1.x,cl=i1.y,cw=i1.z,rat=i2.w;
  float a=cl*u,b=cw*v;
  float lx=abs(cl)<.01?u:sin(a)/cl,lz=abs(cl)<.01?0.:(1.-cos(a))/cl;
  float ly=abs(cw)<.01?v:sin(b)/cw,lz2=abs(cw)<.01?0.:(1.-cos(b))/cw;
  float rip=sin(u*7.+i2.z*9.)*.016+sin(v*9.+u*3.+i2.z*5.)*.014;
  vec3 p=vec3(lx*s,ly*s*rat,(lz+rip)*s+lz2*s*rat);
  float cp=cos(i2.x),sp=sin(i2.x);
  p=vec3(p.x*cp-p.z*sp,p.y,p.x*sp+p.z*cp);
  float cy=cos(i0.w),sy=sin(i0.w);
  p=vec3(p.x*cy-p.y*sy,p.x*sy+p.y*cy,p.z);
  vW=i0.xyz+p; vU=vec2(u,v); vI=vec4(i1.w,i2.y,i2.z,0.);
  gl_Position=proj(vW);
}`,Yr=P+`
in vec3 vW; in vec2 vU; in vec4 vI; in float vD; out vec4 o;
uniform sampler2D uN; uniform vec3 uCam0; uniform vec3 uStar;
`+qe+`
void main(){
  float u=vU.x,v=vU.y,w;
  bool ray=vI.y>.5;
  float tx=vI.z*7.;
  vec4 n=texture(uN,vU*vec2(.31,.17)+tx),n2=texture(uN,vU*vec2(.9,.6)+tx*1.3),n3=texture(uN,vU*vec2(2.7,1.9)+tx*.7);
  if(ray){ float k=u*.5+.5; w=pow(max(1.-k,0.),.72)*1.05; }
  else { float k=u*.5+.5; w=pow(max(sin(3.14159*pow(k,.75)),0.),.72)*(1.+.035*sin(u*38.+tx)); }
  w+=(n2.g-.5)*.12;
  if(abs(v)>w) discard;
  if(!ray&&n.b>.8) discard;
  vec3 N=normalize(cross(dFdx(vW),dFdy(vW)));
  vec3 V=normalize(uCam0-vW); bool back=dot(N,V)<0.; if(back) N=-N;
  vec3 c;
  if(ray){
    float cr=1.-smoothstep(.0,.07,abs(n2.r-.5)+abs(n3.g-.5)*.2);
    c=uStar*(.5+.7*n.r);
    c=mix(c,c*.32,smoothstep(.15,.75,u*.5+.5+(n2.b-.5)*.5));
    c*=1.-cr*.7;
    N=normalize(N+(n3.rgb-.5)*.5);
  } else {
    float t=vI.x;
    c=mix(vec3(.2,.115,.06),vec3(.4,.27,.135),t)*(.55+.9*n.r);
    c=mix(c,vec3(.08,.045,.022),smoothstep(.55,.75,n2.r)*.5);
    float mid=1.-smoothstep(.0,.035,abs(v));
    float sv=abs(fract(u*5.5+abs(v)*2.6+.1)-.5);
    float sid=(1.-smoothstep(.0,.05,sv))*(1.-abs(v)/w*.5);
    float vein=max(mid,sid*.75);
    c=mix(c,c*1.55+.012,vein*.65);
    N=normalize(N+(n3.rgb-.5)*.35+vec3(0.,0.,0.));
    if(back) c*=1.25;
  }
  vec3 L=uL[0].xyz;
  float nl=dot(N,L),sun=shaftAt(vW)*ballSh(vW);
  float tr=max(-nl,0.)*(ray?.1:.5);
  o=vec4(c*(ambAt(N)*.9+uL[4].rgb*sun*(max(nl,0.)*.55+tr*.6)),vD/${le}.);
}`,$r=P+`
in vec2 vP; out vec4 o;
uniform sampler2D uN; uniform vec4 uBg; uniform vec3 uC0,uC1,uC2; uniform int uI;
#ifdef D_ASUN
uniform vec4 uGl;
#endif
`+Ft+`
void main(){
  vec2 uv=vP*.5+.5;
  vec4 a=textureLod(uN,uv*vec2(.22,.08)+uBg.y,0.),b=textureLod(uN,uv*vec2(.7,.3)+uBg.y,0.);
  float ca=smoothstep(.34,.72,a.r+.28*(uv.y-.55));
  vec3 c=mix(uC0,uC1,ca*ca*(.7+.6*b.g));
  // trunks
  float tr=smoothstep(.42,.56,textureLod(uN,vec2(uv.x*.42+uBg.y,.5+uv.y*.012),0.).g);
  float tr2=smoothstep(.5,.6,textureLod(uN,vec2(uv.x*1.1+uBg.y*1.7,.2+uv.y*.02),0.).r);
  tr=max(tr,tr2*.8);
  c*=1.-.6*tr*smoothstep(.2,.6,uv.y);
  c=mix(c,uC2,uBg.x*(.35+.65*smoothstep(.75,.25,uv.y))*(1.-.45*tr));
#ifdef D_ASUN
  vec2 gv=(uv-uGl.xy)/uGl.z; float gl2=dot(gv,gv);
  c+=vec3(1.,.8,.52)*uGl.w*(exp(-gl2*1.6)*.8+exp(-gl2*9.)*.9+exp(-gl2*.35)*.12)*(1.-.35*tr);
#endif
  vec2 sv=uv-vec2(-.05,1.08);
  c+=vec3(.017,.024,.012)*uBg.z*exp(-dot(sv,sv)*2.4)*(.3+1.2*a.g*b.r);
  // light through far leaves, wide open discs
  for(int i=0;i<uI;i++){
    vec4 h=h4(i,int(uBg.w)+9);
    vec2 q=vec2(pow(h.x,1.6)*1.15-.06,.4+pow(h.y,.8)*.66);
    float r=.014+.042*h.z*h.z,d=length(uv-q)/r;
    float e=(1.-smoothstep(.62,1.,d))*(1.-.25*tr);
#ifdef D_ASUN
    vec2 dq=(q-uGl.xy)/uGl.z;
    c+=mix(uC1*1.1,vec3(.075,.066,.026),h.w)*e*(.015+.6*h.w*h.w*h.w)*(uBg.z*(1.3-q.x)*smoothstep(.3,.55,q.y)+uGl.w*9.*exp(-dot(dq,dq)*1.2));
#else
    c+=mix(uC1*1.1,vec3(.075,.066,.026),h.w)*e*(.015+.6*h.w*h.w*h.w)*uBg.z*(1.3-q.x)*smoothstep(.3,.55,q.y);
#endif
  }
  o=vec4(c,${le-1}./${le}.);
}`,Jr=P+`
in vec2 vP; out vec4 o;
uniform sampler2D uT; uniform vec4 uD; uniform vec3 uR; uniform int uI;
float coc(float a){ float d=a*${le}.; return clamp(uD.x*abs(1./uD.y-1./d)-uD.z,0.,uD.w); }
void main(){
  vec2 uv=vP*.5+.5;
  vec4 c=textureLod(uT,uv,0.);
  if(!(c.r+c.g+c.b+c.a<1e5)) c=vec4(0.,0.,0.,.5);
  float cc=coc(c.a);
  vec4 s=c; float w=1.;
  for(int i=0;i<uI;i++){
    float rr=sqrt((float(i)+.5)/float(uI))*uR.x,a=float(i)*2.39996;
    vec4 t=textureLod(uT,uv+vec2(cos(a),sin(a))*rr*uR.y,0.);
    float sc=coc(t.a);
    if(t.a>c.a) sc=min(sc,cc*1.6+.4);
    float wt=smoothstep(rr-1.,rr+1.,sc);
    if(t.r+t.g+t.b+t.a<1e5){ s+=t*wt; w+=wt; }
  }
  o=s/w;
}`,Zr=P+`
in vec2 vP; out vec4 o; uniform sampler2D uT;
void main(){ vec4 c=textureLod(uT,vP*.5+.5,0.); float d=c.a*${le}.; o=vec4(c.rgb,smoothstep(1.7,4.1,d)); }`,ea=P+`
in vec2 vP; out vec4 o;
uniform vec4 uB[${be}]; uniform vec4 uF[4]; uniform int uI;
void main(){
  vec2 p=vP*.5+.5,u=vec2(0.),c=uF[0].xy,e; float R2=uF[0].z*uF[0].z,gy=uF[0].w,k;
  for(int i=0;i<uI;i++){
    vec4 b=uB[i];
    e=p-b.xy; k=b.z/(dot(e,e)+b.w); u+=k*vec2(-e.y,e.x);
    e=p-vec2(b.x,2.*gy-b.y); k=-b.z/(dot(e,e)+b.w); u+=k*vec2(-e.y,e.x);
    vec2 rb=b.xy-c; e=p-(c+rb*R2/max(dot(rb,rb),R2*.3)); k=-b.z/(dot(e,e)+b.w); u+=k*vec2(-e.y,e.x);
  }
  e=p-uF[1].xy;
  float al=dot(e,uF[1].zw),pe=dot(e,vec2(uF[1].w,-uF[1].z));
  u+=uF[2].z*e/(dot(e,e)+.0006);
  float zg=smoothstep(-.012,.012,al)*exp(-al*al/(uF[2].w*uF[2].w))*exp(-pe*pe/(uF[2].y*uF[2].y));
  u+=uF[1].zw*uF[2].x*zg;
  u+=uF[3].xy*smoothstep(gy-.01,gy+.09,p.y);
  o=vec4(u*uF[3].w+.5*step(uF[3].w,.5),0.,1.);
}`,ta=P+`
in vec2 vP; out vec4 o;
uniform sampler2D uD,uV,uN; uniform vec4 uF[7]; uniform int uI;
vec3 cr(vec2 p){
  float res=uF[5].x,ir=uF[5].y;
  vec2 st=p*res-.5,i=floor(st),f=st-i;
  vec2 w0=f*(-.5+f*(1.-.5*f)),w1=1.+f*f*(-2.5+1.5*f),w2=f*(.5+f*(2.-1.5*f)),w3=f*f*(-.5+.5*f);
  vec2 w12=w1+w2,t12=w2/w12,t0=(i-.5)*ir,t3=(i+2.5)*ir,tc=(i+.5+t12)*ir;
  vec3 s=textureLod(uD,vec2(tc.x,t0.y),0.).rgb*w12.x*w0.y+textureLod(uD,vec2(t0.x,tc.y),0.).rgb*w0.x*w12.y
    +textureLod(uD,tc,0.).rgb*w12.x*w12.y+textureLod(uD,vec2(t3.x,tc.y),0.).rgb*w3.x*w12.y+textureLod(uD,vec2(tc.x,t3.y),0.).rgb*w12.x*w3.y;
  return s/(w12.x*w0.y+w0.x*w12.y+w12.x*w12.y+w3.x*w12.y+w12.x*w3.y);
}
vec2 vel(vec2 p){ vec2 v=textureLod(uV,p,0.).xy; return uF[1].w>.5?v:(v-.5)*4.; }
void main(){
  vec2 p=vP*.5+.5;
  float dt=uF[0].x,tt=uF[1].z;
  // small air the blobs can't carry
  vec2 tu=(textureLod(uN,p*.9+vec2(.13,-.07)*tt*.05,0.).rg-.5)+(textureLod(uN,p*2.7+vec2(-.11,.09)*tt*.09,0.).rg-.5)*.55;
  tu+=(textureLod(uN,p*7.3+vec2(.17,.12)*tt*.14,0.).rg-.5)*.4;
  tu=vec2(tu.y,-tu.x)*uF[0].w;
  vec2 v0=vel(p);
  vec2 g=vec2(0.,-uF[0].y)+tu;
  vec3 m=cr(p-dt*(v0+g));
  float dx=p.x-uF[1].x,z=uF[1].y,r=sqrt(dx*dx+z*z);
  vec2 vs=vel(vec2(uF[1].x+sign(dx)*r,p.y));
  vs.x*=abs(dx)/r;
  vec3 sl=textureLod(uD,p-dt*(vs+g),0.).rgb;
  vec2 bk=p-dt*(v0+g);float kr=uF[5].y*2.2;
  vec3 av=(textureLod(uD,bk+vec2(kr,0.),0.).rgb+textureLod(uD,bk-vec2(kr,0.),0.).rgb+textureLod(uD,bk+vec2(0.,kr),0.).rgb+textureLod(uD,bk-vec2(0.,kr),0.).rgb)*.25;
  vec3 d=vec3(mix(m.r,av.r,.09),mix(sl.g,av.g,.3),mix(sl.b,av.b,.3));
  d=max(d,vec3(0.));
  for(int i=0;i<uI;i++){
    vec4 s=uF[2+i];
    vec2 e=p-s.xy;
    float a=exp(-dot(e,e)/(s.w*s.w))*s.z*dt;
    vec4 en=textureLod(uN,p*5.1+vec2(tt*.71,tt*-.43),0.),en2=textureLod(uN,p*17.+vec2(tt*-1.3,tt*.9),0.);
    float mo=smoothstep(.35,.8,en.r*.55+en2.g*.55);
    d+=vec3(a*mo*3.,a*(.4+1.6*smoothstep(.3,.75,en.g)),a*(.4+1.6*smoothstep(.3,.75,en.b)));
  }
  d=max(d*uF[0].z-vec3(uF[5].w)*dt,vec3(0.));
  vec2 bq=(p-uF[6].xy)/uF[6].zw;
  d*=1.-.22*(1.-smoothstep(.88,1.,length(bq)));
  vec2 ed=min(p,1.-p);
  float f=smoothstep(.0,.035,min(ed.x,ed.y))*smoothstep(uF[5].z-.02,uF[5].z+.03,p.y);
  o=vec4(min(d*mix(.94,1.,f),vec3(.85)),1.);
}`,oa=P+`
in vec2 vP; out vec4 o;
uniform sampler2D uD,uN; uniform vec4 uF[2]; uniform vec4 uCam[4]; uniform int uI;
`+qe+`
void main(){
  vec2 p=vP*.5+.5;
  vec3 rd=normalize(uCam[3].xyz+(uCam[1].xyz*vP.x+uCam[2].xyz*vP.y)*uCam[0].w);
  vec3 W=uCam[0].xyz+rd*(-uCam[0].y/rd.y);
  float tS=0.;
  for(int i=0;i<uI;i++){
    float t=(float(i)+.7)*uF[0].z;
    vec3 d=textureLod(uD,p+uF[0].xy*t,0.).rgb;
    tS+=d.r+.45*(d.g+d.b);
  }
  float tA=dot(textureLod(uD,p+vec2(0.,.05),0.).rgb,vec3(.5))+dot(textureLod(uD,p+vec2(.03,.11),0.).rgb,vec3(.5));
  float sf=shaftAt(W);
  o=vec4(sf*exp(-tS*uF[0].w),exp(-tA*uF[1].x),sf,1.);
}`,ra=P+`
in vec2 vP; out vec4 o;
uniform sampler2D uSc,uD,uLt,uN; uniform vec4 uF[13]; uniform vec4 uCam[4]; uniform vec3 uLs;
uvec2 pcg2(uvec2 v){ v=v*1597334677u; v.x^=v.y*3812015801u; v.y^=v.x*1664525u; v^=v>>16u; v*=2531011u; return v; }
void main(){
  vec2 uv=vP*.5+.5;
  vec2 b=(uv-uF[1].xy)/uF[1].zw;
  float rb=length(b),m=1.-smoothstep(.92,1.3,rb);
  vec2 q=uv,sl=vec2(0.); float sh=0.,dk=0.;
  for(int i=0;i<2;i++){
    vec4 D=uF[2+i];
    if(D.z>.0005){
      vec2 e=uv-D.xy;
      vec2 cn=textureLod(uN,uv*3.1+D.xy,0.).rg-.5;
      e+=cn*D.w*.14;
      float g=exp(-dot(e,e)/(D.w*D.w));
      g=g*g*(3.-2.*g);
      vec2 inw=normalize(uF[1].xy-D.xy+vec2(1e-4,0.));
      q-=inw*D.z*g*m*.18;
      q+=(textureLod(uN,uv*9.,0.).rg-.5)*D.z*g*(1.-g)*m*.6;
      q+=normalize(e+vec2(1e-5,0.))*D.z*g*(1.-g)*m*.45;
      sl+=-2.*e/(D.w*D.w)*D.z*g;
      dk+=g*min(D.z/D.w*2.2,1.);
      sh+=g*(1.-g)*4.*min(D.z/D.w*2.6,1.)*(.4+1.2*textureLod(uN,uv*13.,0.).b);
    }
  }
  // the whole sac drops as it squeezes, and sags as it empties
  float up=clamp(b.y*.5+.5,0.,1.);
  q.y+=m*(uF[4].y+uF[4].x*.36*uF[1].w*up*up)*up;
  q.x+=m*b.x*(uF[4].x*.025*uF[1].z)*up*(1.-up)*2.+(textureLod(uN,uv*4.3,0.).rg.x-.5)*uF[4].x*.035*m*up;
  vec4 sc=textureLod(uSc,q,0.);
  float sd=dot(sl,-uLs.xy*.8);
  float mk=(1.-smoothstep(.86,1.02,rb));
  float cre=sh;
  sc.rgb*=1.+mk*clamp(sd*2.6,-.36,1.1);
  sc.rgb*=1.-mk*min(dk,1.)*.2;
  sc.rgb*=1.-mk*cre*.22;
  sc.rgb*=1.-mk*uF[4].x*.42*up*up*(.45+1.1*textureLod(uN,uv*2.7,0.).b);
  vec2 pe=(uv-uF[12].xy)/vec2(uF[12].w,uF[12].w*.45);
  float pr=length(pe)+(textureLod(uN,uv*31.,0.).r-.5)*.7;
  sc.rgb*=1.-uF[12].z*(.9*(1.-smoothstep(.45,.85,pr/max(uF[12].z,.01)))+.3*exp(-(pr-1.)*(pr-1.)*10.));
  // spores
  float par=uF[11].x;
  vec2 wq=uv+(textureLod(uN,uv*3.7+vec2(uF[0].x*.009,uF[0].x*-.013),0.).rg-.5)*.016+(textureLod(uN,uv*13.+vec2(uF[0].x*-.017,uF[0].x*.021),0.).ba-.5)*.0075;
  vec3 d0=textureLod(uD,wq,0.).rgb;
  float dF=textureLod(uD,wq+vec2(0.,par),0.).g,dB=textureLod(uD,wq-vec2(0.,par),0.).b;
  vec4 lt=textureLod(uLt,uv,0.);
  float fine=textureLod(uN,uv*5.3+vec2(uF[0].x*.004,-uF[0].x*.007),0.).r;
  uvec2 hp=pcg2(uvec2(gl_FragCoord.xy)+uvec2(uint(uF[0].x*30.)&3u,0u)*17u);
  float wn=float(hp.x&1023u)/1023.;
  float tau=(d0.r+.72*dF+.72*dB)*uF[5].w; tau=tau/(1.+.45*tau);
  float tauF=tau*(.62+.76*fine)*(1.+(wn-.5)*.14);
  float vis=mix(.28,1.,sc.a);
  float al=1.-exp(-tauF*vis);
  vec3 rd=normalize(uCam[3].xyz+(uCam[1].xyz*vP.x+uCam[2].xyz*vP.y)*uCam[0].w);
  float cs=dot(rd,uLs);
  float g1=.72,ph=(1.-g1*g1)/pow(1.+g1*g1-2.*g1*cs,1.5)*.2;
  float phase=mix(.28,ph,uF[6].w);
  vec3 sc2=mix(uF[6].rgb,vec3(dot(uF[6].rgb,vec3(.5,.35,.15))),.14);
  // the smoke is a volume, so the edge of light on it wanders with the air: never the shaft's ruled side
  float ltS=.5*(lt.r+textureLod(uLt,uv+(wq-uv)*4.,0.).r);
  vec3 sun=sc2*(pow(ltS,1.5)*1.1+.05*lt.b)*phase*.31;
  float dR=textureLod(uD,wq+uLs.xz*.012,0.).r;
  float rim=clamp((d0.r-dR)*1.,-.45,.5);
  vec3 thick=mix(vec3(1.2,1.08,.9),uF[5].rgb*.85+.12,1.-exp(-tau*.55))*(1.+rim*.6);
  vec3 scat=uF[5].rgb*thick*sun+mix(uF[5].rgb,vec3(.42,.55,.6),.55)*uF[7].rgb*lt.g*.36;
  vec3 c=sc.rgb;
  c*=1.-uF[7].w*(1.-exp(-tau*.6))*(1.-sc.a*.7);
  // air in the shaft
  float sh0=lt.b;
  vec2 lp=vec2(-uLs.z,uLs.x)/length(uLs.xz);
  float dust=textureLod(uN,vec2(dot(uv,lp)*1.4,dot(uv,uLs.xz)*.13)+vec2(uF[0].x*.002,-uF[0].x*.004),0.).g;
  c+=uF[6].rgb*sh0*phase*uF[4].w*(.5+.9*dust*dust);
  c=c*(1.-al)+scat*al;
  // single spores turning in the sun
  vec2 gc=(wq+vec2(.0017,.0046)*uF[0].x)*29.,id=floor(gc),f=gc-id-.5;
  uvec2 h=pcg2(uvec2(id+4096.));
  vec2 hh=vec2(h&65535u)/65535.;
  float hz=float((h.x>>16u)&1023u)/1023.,hw=float((h.y>>16u)&1023u)/1023.;
  vec2 fo=(f-(hh-.5)*.7)*uF[0].y/29.;
  float mr=(.6+1.2*hz*hz)*uF[0].y/1000.,mR=max(mr,.65);
  float mote=step(hw,.085)*exp(-dot(fo,fo)/(mR*mR))*(mr*mr)/(mR*mR)*(.34+.66*hz);
  float tSp=clamp(tau*3.,0.,1.);
  c+=uF[6].rgb*mix(uF[5].rgb,vec3(.9,.8,.62),.5)*lt.r*lt.r*phase*mote*uF[4].z*(.3+.7*tSp);
  // raindrops falling
  for(int i=0;i<int(uF[11].y);i++){
    vec4 r=uF[8+i];
    vec2 e=(uv-r.xy)/vec2(.0022,r.z);
    float s=exp(-dot(e,e))*r.w;
    c+=vec3(.6,.62,.6)*s*.11+uF[6].rgb*sh0*s*.04;
  }
  // film
  c*=uF[0].z;
  vec2 vg=uv-.5; c*=1.-dot(vg,vg)*.38;
  c=(c*(2.51*c+.03))/(c*(2.43*c+.59)+.14);
  c=pow(clamp(c,0.,1.),vec3(.4545));
  c+=(wn-.5)*uF[0].w;
  o=vec4(c,1.);
}`;function tr(u,e){const d=(E,i)=>{const q=u.createShader(E);return u.shaderSource(q,i),u.compileShader(q),q},b=new Map,S={};for(const E in e){const[i,q]=e[E],x=u.createProgram();let M=b.get(i);M||(M=d(u.VERTEX_SHADER,i),b.set(i,M)),u.attachShader(x,M);const h=d(u.FRAGMENT_SHADER,q);u.attachShader(x,h),u.linkProgram(x),S[E]={p:x,fs:h,vs:M}}return S}function jt(u,e){for(const d in e){const b=e[d];if(!u.getProgramParameter(b.p,u.LINK_STATUS))throw new Error("173 "+d+": "+u.getProgramInfoLog(b.p)+" "+u.getShaderInfoLog(b.fs)+" "+u.getShaderInfoLog(b.vs));b.u={};for(let S=0,E=u.getProgramParameter(b.p,u.ACTIVE_UNIFORMS);S<E;S++){const i=u.getActiveUniform(b.p,S).name.replace("[0]","");b.u[i]=u.getUniformLocation(b.p,i)}}return e}function aa(u){const d=new Uint8Array(262144);let b=49734321;const S=()=>{b=b+1831565813|0;let h=Math.imul(b^b>>>15,1|b);return h=h+Math.imul(h^h>>>7,61|h)^h,((h^h>>>14)>>>0)/4294967296},E=64,i=new Float32Array(E*E),q=h=>h*h*(3-2*h),x=new Float32Array(256*256);for(let h=0;h<4;h++){for(let m=0;m<E*E;m++)i[m]=S();x.fill(0);let w=1e9,oe=-1e9;for(let m=0,g=8,j=1;m<5;m++,g*=2,j*=.55){const K=m*7+h*13&63;for(let G=0;G<256;G++){const Ee=G/256*g,Q=Ee|0,re=q(Ee-Q);for(let Y=0;Y<256;Y++){const Le=Y/256*g,V=Le|0,ve=q(Le-V),Ve=V%g+K&63,Nt=(V+1)%g+K&63,Et=Q%g+K&63,Lt=(Q+1)%g+K&63,_e=i[Et*E+Ve],ae=i[Et*E+Nt],$=i[Lt*E+Ve],Pe=i[Lt*E+Nt];x[G*256+Y]+=j*(_e+(ae-_e)*ve+($-_e)*re+(_e-ae-$+Pe)*ve*re)}}}for(let m=0;m<256*256;m++)x[m]<w&&(w=x[m]),x[m]>oe&&(oe=x[m]);for(let m=0;m<256*256;m++)d[m*4+h]=255*(x[m]-w)/(oe-w)+.5|0}const M=u.createTexture();return u.bindTexture(u.TEXTURE_2D,M),u.texImage2D(u.TEXTURE_2D,0,u.RGBA8,256,256,0,u.RGBA,u.UNSIGNED_BYTE,d),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.REPEAT),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.REPEAT),M}const Kt={cell:[Z,Yo],skinH:[Z,$o],skinN:[Z,Zo],body:[Wr,qr],ground:[Vr,Hr],moss:[Or,Xr],bill:[jr,Kr],leaf:[Qr,Yr],bg:[Z,$r],dof:[Z,Jr],fin:[Z,Zr],vel:[Z,ea],dens:[Z,ta],light:[Z,oa],comp:[Z,ra]},ot=(u,e)=>{const d=e.filter(b=>u.includes(b));return d.length?u.replace(`#version 300 es
`,`#version 300 es
`+d.map(b=>"#define "+b+`
`).join("")):u};function ua(u,e){let d=Oo.get(u);const b=!d;b&&(d={pc:new Map,pn:new Map});const S={},E={};for(const g in Kt){const j=ot(Kt[g][0],e),K=ot(Kt[g][1],e),G=j+K,Ee=d.pc.get(G);Ee?S[g]=Ee:E[g]=[j,K,G]}const i=Object.keys(E).length?tr(u,E):null;if(u.flush(),!b){if(i)for(const g in jt(u,i))d.pc.set(E[g][2],i[g]),S[g]=i[g];return{C:d,P:S}}const q=aa(u);jt(u,i);const x=u.createVertexArray(),M=u.createBuffer();u.bindVertexArray(x),u.bindBuffer(u.ARRAY_BUFFER,M),u.bufferData(u.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),u.STATIC_DRAW),u.enableVertexAttribArray(0),u.vertexAttribPointer(0,2,u.FLOAT,!1,0,0);const h=u.createVertexArray();u.bindVertexArray(null);const w=!!u.getExtension("EXT_color_buffer_float"),oe=!!u.getExtension("EXT_color_buffer_half_float"),m=!!u.getExtension("OES_texture_float_linear");Object.assign(d,{vao:x,empty:h,noise:q,fl:w,hf:oe,fll:m}),Oo.set(u,d);for(const g in i)d.pc.set(E[g][2],i[g]),S[g]=i[g];return{C:d,P:S}}Ho.add({num:173,name:"Puffball",fam:"Worlds",recipe:"A ripe puffball on the forest floor, and pressing it puffs out spore smoke that rolls into rings. The species and how ripe it is (some haven't opened yet) change every mint, and a rare one is a fairy ring seen from above. Tap it to puff, hold for a long slow squeeze (long enough splits an unopened one), or drag through the air to stir the cloud.",interactive:"Tap the puffball to make it puff, hold it for a long slow squeeze (a long one splits an unopened ball), drag through the air to stir the smoke.",music:!0,gl:!0,fps:30,seed:0,make(u){const e=u.gl,d=u.size,b=d/1e3;let S=0;const E=u.hash.slice(2);for(let t=0;t<16;t++)S=Math.imul(S^parseInt(E.slice(t*4,t*4+4),16),2654435761)+374761393|0;const i=()=>{S=S+1831565813|0;let t=Math.imul(S^S>>>15,1|S);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},q=(t,o)=>{let a=i()*o.reduce((c,n)=>c+n,0);for(let c=0;c<t.length;c++)if(a-=o[c],a<=0)return t[c];return t[0]};let x=q(["warted","pear","giant","earthstar"],[46,30,11,13]),M=q(["just ripe","full","nearly spent"],[30,50,20]),h=q(["moss","leaf litter","rotten log"],[50,30,20]),w=q(["low sun shaft","dappled","misty dawn"],[55,32,13]),oe=q(["brown","olive","purple-brown"],[52,34,14]),m=q(["dry","drips","light rain"],[36,48,16]);u.home&&(x="warted",M="full",h="moss",w="low sun shaft",oe="brown",m="drips");const g=i(),j=i();let K=668265263;for(let t=0;t<16;t++)K=Math.imul(K^parseInt(E.slice(t*4,t*4+4),16),2246822519)+1013904242|0;const G=()=>{K=K+1831565813|0;let t=Math.imul(K^K>>>15,1|K);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ee=(t,o)=>{let a=G()*o.reduce((c,n)=>c+n,0);for(let c=0;c<t.length;c++)if(a-=o[c],a<=0)return t[c];return t[0]};let Q=u.home?"eye level":Ee(["eye level","in close","from above"],[46,30,24]),re=u.home?"a few behind":Ee(["a few behind","a tight cluster","alone","fairy ring"],[44,28,18,10]);const Y=G()<.5?1:-1,Le=G(),V=[G(),G(),G(),G(),G(),G()];!u.home&&G()<.22&&(M="unopened");let ve=4248325001;for(let t=0;t<16;t++)ve=Math.imul(ve^parseInt(E.slice(t*4,t*4+4),16),2246822519)+1013904242|0;const Ve=()=>{ve=ve+1831565813|0;let t=Math.imul(ve^ve>>>15,1|ve);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Nt=Ve(),Et=Ve(),Lt=Ve();!u.home&&w==="low sun shaft"&&Nt<.3&&(w="against the sun"),!u.home&&Q==="eye level"&&Lt<.35&&(Q="a step back"),!u.home&&m==="dry"&&Et<.35&&(m="a breeze"),Xo&&jo[E.slice(0,8)]&&({species:x=x,ripe:M=M,floor:h=h,lightK:w=w,spore:oe=oe,weather:m=m,view:Q=Q,company:re=re}=jo[E.slice(0,8)]),x==="earthstar"&&M==="unopened"&&(M="just ripe"),re==="fairy ring"&&(Q="from above"),u.trait("Species",x==="warted"?"common warted":x==="pear"?"smooth pear":x==="giant"?"giant":"earthstar"),u.trait("Ripeness",M),u.trait("Forest floor",h),u.trait("Light",w),u.trait("Spores",oe),u.trait("Weather",m),u.trait("View",Q),u.trait("Company",re);const _e=(t,o)=>[t[0]-o[0],t[1]-o[1],t[2]-o[2]],ae=(t,o)=>t[0]*o[0]+t[1]*o[1]+t[2]*o[2],$=t=>{const o=Math.hypot(t[0],t[1],t[2]);return[t[0]/o,t[1]/o,t[2]/o]},Pe=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]],na=h==="rotten log"?1:0,ee=Q==="from above"&&(re==="fairy ring"||M==="unopened"),Ae=w==="against the sun",At=Q==="a step back",W=na?.06:0,N=[0,-5.2,.62+W],ne=[0,0,1.98+W];Q==="in close"?(N[0]=Y*(.4+Le*.15),N[1]=-3.95,N[2]=.6+W,ne[0]=-Y*(.55+Le*.15),ne[2]=1.78+W):Q==="from above"&&!ee?(N[0]=Y*(.45+Le*.2),N[1]=-4.45,N[2]=1.75+W,ne[0]=-Y*.45,ne[1]=.2,ne[2]=1.05+W):At?(N[0]=Y*(.8+Le*.4),N[1]=-9.6,N[2]=2.05+W,ne[0]=-Y*.25,ne[2]=2.15+W):ee&&(N[0]=Y*(1.1+Le*.6),N[1]=-4.6,N[2]=6.2+W,ne[0]=-Y*.1,ne[1]=1.5,ne[2]=1.2+W);const He=$(_e(ne,N)),ze=$(Pe(He,[0,0,1])),Ie=Pe(ze,He),zt=.43,sa=.3,ia=60,Be=new Float32Array([N[0],N[1],N[2],zt,ze[0],ze[1],ze[2],sa,Ie[0],Ie[1],Ie[2],ia,He[0],He[1],He[2],0]),Oe=t=>{const o=_e(t,N),a=ae(o,He);return[ae(o,ze)/(a*zt)*.5+.5,ae(o,Ie)/(a*zt)*.5+.5,a]},l={warted:{R:1,z:1.36,taper:.78,stem:1.25,flat:.95,wd:.92,wa:.03,sa:.016,wr:.3,cr:.03,pl:0,pore:.085,rag:.35,pit:.16,scar:1,sc:[15,36]},pear:{R:.94,z:1.6,taper:.8,stem:1.6,flat:1,wd:0,wa:0,sa:.009,wr:.4,cr:.07,pl:0,pore:.08,rag:.35,pit:.15,scar:0,sc:[13,40]},giant:{R:1.55,z:1.38,taper:.12,stem:.1,flat:.92,wd:0,wa:0,sa:.002,wr:.25,cr:.16,pl:.1,pore:.12,rag:.8,pit:.14,scar:0,sc:[9,40]},earthstar:{R:.76,z:1.3,taper:.34,stem:.1,flat:1.02,wd:0,wa:0,sa:.003,wr:.6,cr:.1,pl:0,pore:.1,rag:.22,pit:.14,scar:0,sc:[12,36]}}[x],Te=M==="unopened",se=M==="nearly spent",ke=M==="just ripe"||Te;Te&&l.taper>.5&&(l.taper=-(l.taper*.9));const rt=[ee&&"D_RAISED",l.taper<0&&"D_NECK",Ae&&"D_ASUN",At&&"D_STEP"].filter(Boolean),{C:D,P:k}=ua(e,rt),R=x==="giant"?[[.78,.75,.66],[.72,.68,.58],[.56,.5,.4]]:x==="earthstar"?[[.33,.25,.17],[.25,.18,.115],[.11,.075,.05]]:x==="pear"?[[.5,.38,.23],[.33,.21,.105],[.14,.085,.045]]:[[.74,.62,.44],[.56,.42,.25],[.24,.155,.085]];ke&&(R[1]=R[1].map((t,o)=>t*.62+R[0][o]*.4),R[2]=R[2].map((t,o)=>t*.7+R[1][o]*.4)),Te&&(R[0]=R[0].map(t=>t*.4+.52),R[1]=R[1].map(t=>t*.5+.4),R[2]=R[2].map(t=>t*.6+.22)),se&&x==="giant"&&(R[0]=[.62,.52,.36],R[1]=[.56,.45,.3],R[2]=[.44,.34,.21]),se&&(R[0]=R[0].map(t=>t*.62),R[1]=R[1].map(t=>t*.55),R[2]=R[2].map(t=>t*.55));const Xe=oe==="olive"?[.46,.46,.28]:oe==="purple-brown"?[.42,.26,.3]:[.66,.47,.27],me=[0,0,l.z+W],ge=$([-.08,-.3,.95]),z=$(Pe([0,0,1],ge)),Tt=ge[2],je=Math.hypot(ge[0],ge[1]),Fe=1-Tt,de=new Float32Array([Fe*z[0]*z[0]+Tt,Fe*z[0]*z[1]+je*z[2],Fe*z[0]*z[2]-je*z[1],Fe*z[0]*z[1]-je*z[2],Fe*z[1]*z[1]+Tt,Fe*z[1]*z[2]+je*z[0],Fe*z[0]*z[2]+je*z[1],Fe*z[1]*z[2]-je*z[0],Fe*z[2]*z[2]+Tt]),ca=[me[0]+ge[0]*l.R*l.flat,me[1]+ge[1]*l.R*l.flat,me[2]+ge[2]*l.R*l.flat],Dt=Oe(ca),I=Oe(me),T=l.R/(I[2]*zt)*.5,or=Oe([0,12,.25+W])[1],fa=$([-.44,.7,.56]),ue=$(w==="misty dawn"?[-.5,.2,.66]:w==="dappled"?[-.42,.46,.78]:Ae?[-.25,.75,.45]:[-.6,-.02,.8]),St=$(Pe(ue,[0,1,0])),Qt=Pe(ue,St),Yt=Ae?ue:fa,la=w==="dappled"?3.6:w==="misty dawn"?1.75:Ae?3.4:1.35,va=w==="misty dawn"?.34:Ae?.2:.045,$t=w==="misty dawn"?2.4:w==="dappled"?6.5:4.6,Jt=w==="misty dawn"?[1,.8,.62]:[1,.72,.43],at=new Float32Array([ue[0],ue[1],ue[2],va,St[0],St[1],St[2],la,1,0,2.2+W,w==="dappled"?1:0,Qt[0],Qt[1],Qt[2],w==="dappled"?.13:.03,Jt[0]*$t,Jt[1]*$t,Jt[2]*$t,ee?1:0,me[0],me[1],me[2],l.R]),Ke=w==="misty dawn"?1.9:w==="dappled"?1.5:1,ma=.3,Zt=Ae?4:0,rr=new Float32Array([.12*Ke,.14*Ke,.125*Ke,0,.06*Ke,.06*Ke,.03*Ke,0]),ar=ae(ue,ze),ur=ae(ue,Ie),nr=Math.hypot(ar,ur),ut=[ar/nr,ur/nr],nt=D.fl||D.hf?[e.RGBA16F,e.RGBA,e.HALF_FLOAT]:[e.RGBA8,e.RGBA,e.UNSIGNED_BYTE],sr=D.fl&&D.fll?[e.RGBA32F,e.RGBA,e.FLOAT]:nt,pe=(t,o,a)=>{const c=e.createTexture();e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,o[0],t,t,0,o[1],o[2],null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const n=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,c,0),{t:c,f:n,w:t}},eo=t=>{e.deleteFramebuffer(t.f),e.deleteTexture(t.t)},Ce=!D.fl&&!D.hf,to=rt.join();if(Ce&&!D.pn.has(to)){const t=o=>{const a=o.lastIndexOf("}");return o.replace("out vec4 o;","out uvec4 oU;vec4 o;").slice(0,a+20-11)+"oU=floatBitsToUint(o);}"};D.pn.set(to,jt(e,tr(e,{cell:[Z,t(ot(Yo,rt))],skinH:[Z,t(ot($o,rt))],skinN:[Z,t(ot(Zo,rt))]})))}const Mt=Ce?D.pn.get(to):k,_t=Ce?[e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT]:nt,st=Ce?[e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE]:nt,Pt=t=>{if(!Ce)return;const o=new Uint32Array(t.w*t.w*4);e.bindFramebuffer(e.FRAMEBUFFER,t.f),e.readPixels(0,0,t.w,t.w,e.RGBA_INTEGER,e.UNSIGNED_INT,o),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,t.t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,t.w,t.w,0,e.RGBA,e.FLOAT,new Float32Array(o.buffer)),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0)},B=(t,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,o)},ie=(t,o)=>(e.bindFramebuffer(e.FRAMEBUFFER,o?o.f:null),e.viewport(0,0,o?o.w:d,o?o.w:d),e.useProgram(t.p),e.bindVertexArray(D.vao),t.u);e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!0);const it=d>=700?1024:640,ct=pe(it,_t),It=pe(it,_t),ft=pe(it,_t),Bt=Ce?pe(it,_t):ct;B(0,D.noise);let r=ie(Mt.cell,ct);e.uniform1i(r.uN,0),e.uniform1f(r.uT,gt),e.uniform1i(r.uI,16),e.uniform4f(r.uW,l.sc[0],l.sc[1],3+g*9,.07),e.uniform2f(r.uE,0,0),e.uniform4f(r.uS0,l.taper,l.stem,l.flat,1),e.drawArrays(e.TRIANGLES,0,3),r=ie(Mt.cell,It),e.uniform4f(r.uW,x==="giant"?3.1:4.6,x==="giant"?3.6:3.4,5+j*9,.22),e.uniform2f(r.uE,1,1),e.drawArrays(e.TRIANGLES,0,3),Pt(ct),Pt(It),r=ie(Mt.skinH,ft),B(1,ct.t),B(2,It.t),e.uniform1i(r.uN,0),e.uniform1i(r.uA,1),e.uniform1i(r.uC,2),e.uniform1f(r.uT,gt);const da=l.wr*(se?1.7:ke?.6:1);e.uniform4fv(r.uS,new Float32Array([l.wd,l.wa,l.sa,da,l.cr*(se?1.6:ke?.3:1)*(Te?0:1),l.pl*(ke?0:se?1.3:1),l.pore*(se?3.1:ke?.7:1)*(Te?0:1),l.rag,l.pit,l.scar,se?1:0,g])),e.drawArrays(e.TRIANGLES,0,3),Pt(ft),Ce&&eo(ct),eo(It);const oo=(t=>[de[0]*t[0]+de[1]*t[1]+de[2]*t[2],de[3]*t[0]+de[4]*t[1]+de[5]*t[2],de[6]*t[0]+de[7]*t[1]+de[8]*t[2]])(ue);r=ie(Mt.skinN,Bt),B(0,ft.t),e.uniform1i(r.uH,0),e.uniform1f(r.uT,gt),e.uniform1f(r.uPx,1/it),e.uniform3f(r.uLo,oo[0],oo[1],oo[2]),e.uniform1i(r.uI,10),e.uniform4f(r.uS0,l.taper,l.stem,l.flat,1),e.drawArrays(e.TRIANGLES,0,3),Pt(Bt);const lt=pe(d,st),ro=pe(d,st),ir=ro,ao=e.createRenderbuffer(),uo=e.createRenderbuffer(),no=e.createFramebuffer(),so="s"+st[0];D[so]===void 0&&(D[so]=Math.min(4,e.getInternalformatParameter(e.RENDERBUFFER,st[0],e.SAMPLES)[0]||0));const cr=D[so];e.bindRenderbuffer(e.RENDERBUFFER,ao),e.renderbufferStorageMultisample(e.RENDERBUFFER,cr,st[0],d,d),e.bindRenderbuffer(e.RENDERBUFFER,uo),e.renderbufferStorageMultisample(e.RENDERBUFFER,cr,e.DEPTH_COMPONENT24,d,d),e.bindFramebuffer(e.FRAMEBUFFER,no),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ao),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,uo),e.viewport(0,0,d,d),e.clearColor(0,0,0,1),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const pa=w==="misty dawn"?.75:0;if(e.useProgram(k.bg.p),e.bindVertexArray(D.vao),r=k.bg.u,B(0,D.noise),e.uniform1i(r.uN,0),e.uniform4f(r.uBg,pa,j,w==="dappled"?1.4:w==="misty dawn"?.35:.85,j*90|0),e.uniform3f(r.uC0,.0028,.0068,.0038),e.uniform3f(r.uC1,.0062,.0145,.0078),e.uniform3f(r.uC2,.12,.125,.105),e.uniform1i(r.uI,w==="misty dawn"?14:46),Ae){const t=Oe([N[0]+ue[0]*40,N[1]+ue[1]*40,N[2]+ue[2]*40]);e.uniform4f(r.uGl,t[0],t[1],.42,ma)}e.drawArrays(e.TRIANGLES,0,3),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.bindVertexArray(D.empty);const vt=t=>{e.uniform4fv(t.uL,at),e.uniform4fv(t.uAm,rr)},io=h==="moss"?0:h==="leaf litter"?1:2,co=h==="moss"?1:h==="leaf litter"?.34:.22,fo=g*3.1;e.useProgram(k.ground.p),r=k.ground.u,e.uniform1i(r.uN,0),e.uniform4fv(r.uCam,Be),e.uniform4f(r.uG,io,co,fo,0),vt(r),e.uniform2f(r.uGr,240,220),e.uniform3fv(r.uGc,h==="rotten log"?[.065,.043,.026]:h==="leaf litter"?[.075,.045,.022]:[.03,.035,.014]),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,482,220);const kt=Math.round(15e3*Math.max(.4,b)),fr=15,xa=m==="dry"||m==="a breeze"?.3:m==="drips"?1:1.6,Ct=[-1.08,or*2-1+.2];e.useProgram(k.moss.p),r=k.moss.u,e.uniform1i(r.uN,0),e.uniform4fv(r.uCam,Be),e.uniform4f(r.uG,io,co,fo,x==="earthstar"?2.3:0),vt(r),e.uniform2f(r.uMr,Ct[0],Ct[1]),e.uniform1f(r.uMc,kt),e.uniform3f(r.uCam0,N[0],N[1],N[2]),e.uniform4f(r.uM,kt,fr,0,0);const lo=h==="rotten log"?[[.035,.06,.014],[.09,.13,.026],[.22,.27,.055]]:[[.026,.052,.013],[.066,.11,.027],[.16,.205,.05]];e.uniform4fv(r.uMp,new Float32Array([...lo[0],xa,...lo[1],0,...lo[2],0])),e.drawArraysInstanced(e.TRIANGLES,0,9*fr,kt);const vo=x==="giant"?60:130;e.uniform4f(r.uM,vo,3,1,0),e.drawArraysInstanced(e.TRIANGLES,0,27,vo);const mo=[],mt=(t,o,a,c,n,v,f,s,y,U,_,A)=>mo.push(t,o,a,c,n,v,f,s,y,U,_,A),ha=(h==="leaf litter"?70:h==="moss"?9:14)+(ee?34:0);for(let t=0;t<ha;t++){const o=i(),a=i()*2-1,c=-1.5+o*o*14,n=a*(1.1+(c+5.2)*.55);Math.hypot(n,c)<1.15&&t>1||mt(n,c,.04+i()*.12,i()*6.28,.55+i()*.55,(i()-.5)*2.4,(i()-.3)*2,i(),(i()-.5)*.34,0,i(),.52)}if(mt(-1.95,-1.25,.2,.5+g,1,1.3,1.9,.55+j*.4,.35,0,g,.55),mt(1.95,.75,.22,-.9+j,1,.9,1.05,.5+g*.35,-.2,0,j,.56),mt(-2.55,1.9,.55,-.6,1.2,-1.1,1.5,.3+g*.5,.3,0,j,.52),x==="earthstar"){const t=6+(i()*3|0);for(let o=0;o<t;o++){const a=-1.5708+(o+.5)/t*6.283+(i()-.5)*.35,c=.72+i()*.25;mt(Math.cos(a)*(c*.95+.2),Math.sin(a)*(c*.95+.2),.62+W,a,c*1.4,-1.55,.55,.5,0,1,i(),.5)}}const lr=e.createBuffer(),vr=e.createVertexArray();e.bindVertexArray(vr),e.bindBuffer(e.ARRAY_BUFFER,lr),e.bufferData(e.ARRAY_BUFFER,new Float32Array(mo),e.STATIC_DRAW);for(let t=0;t<3;t++)e.enableVertexAttribArray(1+t),e.vertexAttribPointer(1+t,4,e.FLOAT,!1,48,t*16),e.vertexAttribDivisor(1+t,1);e.useProgram(k.leaf.p),r=k.leaf.u,e.uniform1i(r.uN,0),e.uniform4fv(r.uCam,Be),vt(r),e.uniform3f(r.uCam0,N[0],N[1],N[2]),e.uniform3f(r.uStar,.5,.4,.29),e.drawArraysInstanced(e.TRIANGLES,0,26*14*6,mo.length/12),e.bindVertexArray(D.empty),e.useProgram(k.body.p),r=k.body.u,B(0,D.noise),B(1,ft.t),B(2,Bt.t),e.uniform1i(r.uN,0),e.uniform1i(r.uH,1),e.uniform1i(r.uK,2),e.uniform1f(r.uT,gt),e.uniform4fv(r.uCam,Be),vt(r),e.uniform3f(r.uCam0,N[0],N[1],N[2]),e.uniform4f(r.uS0,l.taper,l.stem,l.flat,1),e.uniformMatrix3fv(r.uRot,!1,de),e.uniform4fv(r.uPal,new Float32Array([...R[0],Zt,...R[1],0,...R[2],0,...Xe,.34]));const mr=Math.round(Math.max(.3,b)*1e3),dr=Math.round(Math.max(.3,b)*420);e.uniform4f(r.uB0,me[0],me[1],me[2],l.R),e.uniform4f(r.uB1,mr,dr,0,0),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,2*mr+2,dr);const ce=[],ya=2+(i()*3|0);for(let t=0;t<ya;t++){const o=t%2?1:-1,a=2.2+i()*3.4,c=o*(1.55+i()*1.5+a*.12),n=(x==="giant"?.5:.55)+i()*.35;ce.push([c,a,n*l.z+.05,n])}if(u.home&&(ce.length=0,ce.push([-1.75,2.1,.78,.64],[2.3,3.9,.95,.78],[-3.2,5.4,.86,.7])),re==="alone")ce.length=0;else if(re==="fairy ring"){ce.length=0;const t=-Y*(.7+V[1]*1.3),o=2.6+V[0]*1.2,a=Math.hypot(t,o),c=Math.atan2(-o,-t),n=Math.round(a*4.3);for(let v=1;v<n;v++){const f=c+v/n*Math.PI*2+(V[v%6]-.5)*.12,s=a*(1+(V[(v+2)%6]-.5)*.08),y=t+Math.cos(f)*s,U=o+Math.sin(f)*s,_=.36+V[(v+3)%6]*.22*(.6+.4*Math.sin(v*2.3));Math.hypot(y,U)<l.R+_+.25||U<-2.4||ce.push([y,U,_*l.z+.05,_])}}e.uniform4f(r.uB1,260,110,0,0),e.uniformMatrix3fv(r.uRot,!1,new Float32Array([1,0,0,0,.94,.34,0,-.34,.94]));{const t=re==="fairy ring"?.72:.5;e.uniform4fv(r.uPal,new Float32Array([...R[0].map(o=>o*t),Zt,...R[1].map(o=>o*t),0,...R[2].map(o=>o*t),0,...Xe,.34]))}for(const t of ce)e.uniform4f(r.uB0,t[0],t[1],t[2]+W,t[3]),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,522,110);if(re==="a tight cluster"){const t=V[0]<.5?1:-1,o=[],a=.58+V[1]*.16,c=.42+V[2]*.14;o.push([t*l.R*(1+a*.92),.5+V[3]*.4,a]),o.push([-t*l.R*(1+c*.88),1+V[4]*.5,c]),V[5]<.5&&o.push([t*l.R*.55,1.75+V[3]*.4,.36+V[1]*.12]),e.uniform4f(r.uB1,520,220,0,0),e.uniform4fv(r.uPal,new Float32Array([...R[0].map(n=>n*.86),Zt,...R[1].map(n=>n*.86),0,...R[2].map(n=>n*.86),0,...Xe,.34]));for(const n of o){const v=-n[0]*.12,f=Math.cos(v),s=Math.sin(v);e.uniformMatrix3fv(r.uRot,!1,new Float32Array([f,s,0,-s*.94,f*.94,.34,s*.34,-f*.34,.94])),e.uniform4f(r.uB0,n[0],n[1],n[2]*l.z+.03+W,n[2]*l.R),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,1042,220),ce.push([n[0],n[1],n[2]*l.z+.03,n[2]*l.R])}}e.useProgram(k.bill.p),r=k.bill.u,B(0,D.noise),e.uniform1i(r.uN,0),e.uniform4fv(r.uCam,Be),e.uniform4f(r.uG,io,co,fo,x==="earthstar"?2.3:0),vt(r),e.uniform2f(r.uMr,Ct[0],Ct[1]),e.uniform1f(r.uMc,kt),e.uniform3f(r.uLs,ut[0],ut[1],0);const wa=Math.round(m==="dry"||m==="a breeze"?24:m==="drips"?170:320);e.uniform4f(r.uM,0,0,0,0),e.uniform4f(r.uBp,0,0,0,0),e.drawArraysInstanced(e.TRIANGLES,0,6,wa),e.uniform4f(r.uM,0,0,1,0),e.uniform4f(r.uBp,1,0,0,0),e.drawArraysInstanced(e.TRIANGLES,0,6,vo),e.disable(e.DEPTH_TEST),e.bindFramebuffer(e.READ_FRAMEBUFFER,no),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,lt.f),e.blitFramebuffer(0,0,d,d,0,0,d,d,e.COLOR_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.deleteFramebuffer(no),e.deleteRenderbuffer(ao),e.deleteRenderbuffer(uo);const pr=84*b*(ee?1.9:1),xr=I[2]-l.R*.62,hr=.9*b,Ut=36*b;r=ie(k.dof,ro),B(0,lt.t),e.uniform1i(r.uT,0),e.uniform4f(r.uD,pr,xr,hr,Ut),e.uniform3f(r.uR,Ut,1/d,0),e.uniform1i(r.uI,96),e.drawArrays(e.TRIANGLES,0,3),r=ie(k.dof,lt),B(0,ro.t),e.uniform1i(r.uT,0),e.uniform4f(r.uD,pr*.6,xr,hr,Ut),e.uniform3f(r.uR,Ut*.16,1/d,0),e.uniform1i(r.uI,14),e.drawArrays(e.TRIANGLES,0,3),r=ie(k.fin,ir),B(0,lt.t),e.uniform1i(r.uT,0),e.drawArrays(e.TRIANGLES,0,3);for(const t of[ft,Bt,lt])eo(t);e.deleteBuffer(lr),e.deleteVertexArray(vr);const yr=pe(Ur,nt),wr=nt[2]===e.UNSIGNED_BYTE?.5:1;let Qe=pe(bt,sr),Gt=pe(bt,sr);const po=pe(Gr,[e.RGBA8,e.RGBA,e.UNSIGNED_BYTE]);for(const t of[Qe,Gt,po])e.bindFramebuffer(e.FRAMEBUFFER,t.f),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);const Ye=(ee?Oe([0,-1.2,W])[1]:or)-.012,F={x:Dt[0],y:Dt[1],dx:0,dy:1};{const t=$([ge[0],0,Math.max(ge[2],.3)]),o=Math.hypot(ae(t,ze),ae(t,Ie));F.dx=ae(t,ze)/o,F.dy=ae(t,Ie)/o,F.y+=T*.03}const Re=(At?.6:1)*.03*(x==="giant"?1.4:x==="earthstar"?.8:1)*(se?1.6:ke?.8:1),fe=new Float32Array(be*4),Wt=new Float32Array(be);let dt=et;for(let t=0;t<et;t++)fe[t*4]=i(),fe[t*4+1]=Ye+.1+i()*(.95-Ye-.1),fe[t*4+2]=(t%2?1:-1)*(.0011+i()*9e-4),fe[t*4+3]=.012+i()*.012;let Ne=[I[0],I[1]-T*.12],De=Math.max(Math.hypot(F.x-Ne[0],F.y-Ne[1])-.012,T*.5);ee&&(De=T*.6,Ne=[F.x-F.dx*(De+.012),F.y-F.dy*(De+.012)]);let H=0,pt=Te?0:se?.2:ke?.86:1,J=pt,qt=0,xe=Te,Vt=0,xo=2.2,Ht=[0,0],ho=0,br=3+i()*6;const gr=w==="misty dawn"?.006:.012,ba=ee?-.04:0,yo=m==="a breeze"?.036*(Ae?.6:1)*(ut[0]<0?-1:1):0,he=[{x:I[0],y:I[1],d:0,v:0,r:T*.5},{x:I[0],y:I[1],d:0,v:0,r:T*.2}];let wo=1,xt=0,$e=0,ht=0,bo=0,Ue=0,go=0,yt=0,Ge=!1;const We=[],ga=m==="dry"||m==="a breeze"?13:m==="drips"?5.5:2.2;let Fo=m==="dry"||m==="a breeze"?7+i()*16:3,Fr=!0,Ro=5+i()*10,No=2.5+i()*5,wt=null,Eo=0;const Je=(t,o,a,c)=>{let n=-1;if(dt<be)n=dt++;else{let v=1e9;for(let f=et;f<be;f++){const s=Math.abs(fe[f*4+2]);s<v&&(v=s,n=f)}}fe[n*4]=t,fe[n*4+1]=o,fe[n*4+2]=a,fe[n*4+3]=c,Wt[n]=0},Fa=t=>{const o=fe,a=dt,c=Ne[0],n=Ne[1],v=De*De,f=Ye,s=gr*(Math.sin(H*.23+g*6)+.6*Math.sin(H*.61+j*6))*(yo?2.2:1)+ho*(yo?1.8:1)+yo,y=gr*.35*Math.sin(H*.37+j*4)+ba;Ht[0]=s,Ht[1]=y;const U=Ra,_=Na;for(let p=0;p<a;p++){const C=o[p*4],O=o[p*4+1];let te=s,ye=y;for(let we=0;we<a;we++){const Mo=o[we*4],_o=o[we*4+1],Po=o[we*4+2],Io=o[we*4+3];if(p!==we){const qo=C-Mo,Vo=O-_o,kr=Po/(qo*qo+Vo*Vo+Io);te-=kr*Vo,ye+=kr*qo}const Bo=C-Mo,ko=O-(2*f-_o),Pr=-Po/(Bo*Bo+ko*ko+Io);te-=Pr*ko,ye+=Pr*Bo;const Co=Mo-c,Uo=_o-n,Sa=Math.max(Co*Co+Uo*Uo,v*.3),Ir=v/Sa,Go=C-(c+Co*Ir),Wo=O-(n+Uo*Ir),Br=-Po/(Go*Go+Wo*Wo+Io);te-=Br*Wo,ye+=Br*Go}const Se=C-F.x,Me=O-F.y,Mr=Se*Se+Me*Me+6e-4;te+=ht*Se/Mr,ye+=ht*Me/Mr;const So=Se*F.dx+Me*F.dy,_r=Se*F.dy-Me*F.dx;if(So>-.012&&$e>0){const we=Math.exp(-So*So/.0025-_r*_r/(Re*Re*2));te+=F.dx*$e*we,ye+=F.dy*$e*we}U[p]=te,_[p]=ye}let A=et;for(let p=0;p<a;p++){let C=o[p*4]+U[p]*t,O=o[p*4+1]+_[p]*t;O<f+.004&&(O=f+.004);const te=C-c,ye=O-n,Se=te*te+ye*ye;if(Se<v*1.02){const Me=Math.sqrt(v*1.02/Math.max(Se,1e-6));C=c+te*Me,O=n+ye*Me}if(o[p*4]=C,o[p*4+1]=O,p<et){C<-.08?o[p*4]=1.06:C>1.08&&(o[p*4]=-.06),O>1.08&&(o[p*4+1]=1.06);continue}Wt[p]+=t,o[p*4+2]*=Math.exp(-t/3.3),o[p*4+3]+=t*16e-5,Math.abs(o[p*4+2])>12e-5&&C>-.15&&C<1.15&&O<1.2&&(A!==p&&(o[A*4]=o[p*4],o[A*4+1]=o[p*4+1],o[A*4+2]=o[p*4+2],o[A*4+3]=o[p*4+3],Wt[A]=Wt[p]),A++)}dt=A},Ra=new Float32Array(be),Na=new Float32Array(be),Lo=t=>{let o=0;for(let s=0;s<2;s++){const y=he[s],U=s===0?26:90,_=s===0?7.5:14;let A=0;s===0&&Ge&&(A=yt);const p=U*(A-y.d)-(y.v<0?_*4.5:_)*y.v,C=y.d;y.v+=p*t,y.d+=y.v*t,y.d<0&&(y.d=0,y.v=Math.max(y.v,0)),o+=(y.d-C)/t*(s===0?1:.45)}Ge&&(yt=Math.min(1,yt+t*.3));const a=Math.max(o,0),c=.21;if(xt+=a*t,xe)xt=Math.min(xt,.55),o=0,Ge&&yt>.62&&(xe=!1,pt=.9,J=.9,X&&(X.hit("click",.35),X.hit("noise",.2,{cutoff:900,dur:.5})));else{const s=xt/c;xt-=s*t,(o>=0||s>.05)&&(o=s)}!xe&&Vt<1&&(Vt=Math.min(1,Vt+t*2.5));const n=Math.max(J,0),v=Math.pow(n,.55),f=.35+.65*Math.pow(n,.4);if(o>0){const s=.72*Math.pow(o/5,.4)*f;if($e=s,ht=.12*s*Re,bo=7*Math.pow(o,.52)*v,J=Math.max(.012,J-o*t*.11),Ue+=s*s*.5*t/6.283*3.3,go+=t,Ue>wo*42e-5&&go>.012||Ue>wo*.0011){const y=F.dy,U=-F.dx,_=F.x+F.dx*.018,A=F.y+F.dy*.018;Je(_+y*Re,A+U*Re,-Ue,22e-5),Je(_-y*Re,A-U*Re,Ue,22e-5),Ue=0,go=0,wo=.55+1.1*i()}}else $e=o*.02,ht=Math.max(o,-3)*12e-5,bo=0,Ue=0;qt+=((xe?0:(1-J/1)*(se?1:.9))-qt)*Math.min(1,t*1.6),J=Math.min(pt,J+t*.0012),H>br&&(ho=(i()-.5)*.05*(m==="light rain"?1.6:1),br=H+5+i()*11),ho*=Math.exp(-t/2.2)},Rr=new Float32Array(be*4),Nr=new Float32Array(16),L=new Float32Array(28),Er=t=>{Fa(t);for(let n=0;n<be*4;n++)Rr[n]=fe[n];let o=ie(k.vel,yr);e.uniform4fv(o.uB,Rr),e.uniform1i(o.uI,dt),Nr.set([Ne[0],Ne[1],De,Ye,F.x,F.y,F.dx,F.dy,$e,Re*1.15,ht,.05,Ht[0],Ht[1],0,wr===1?1:.25]),e.uniform4fv(o.uF,Nr),e.drawArrays(e.TRIANGLES,0,3),o=ie(k.dens,Gt),B(0,Qe.t),B(1,yr.t),B(2,D.noise),e.uniform1i(o.uD,0),e.uniform1i(o.uV,1),e.uniform1i(o.uN,2);const a=wt&&H<Eo?1:0;L[0]=t,L[1]=ee?.03:.012,L[2]=Math.pow(.9985,t*30),L[3]=.16,L[4]=F.x,L[5]=.022,L[6]=H,L[7]=wr===1?1:0,L[8]=F.x+F.dx*.022,L[9]=F.y+F.dy*.022,L[10]=bo*2.8*(ee?1.8:At?2.4:1),L[11]=Re*.55,a?(L[12]=wt[0],L[13]=wt[1],L[14]=xo,L[15]=.012):(L[14]=0,L[15]=.01),L[20]=bt,L[21]=1/bt,L[22]=Ye,L[23]=.0016,L[24]=Ne[0],L[25]=Ne[1],L[26]=De,L[27]=De,e.uniform4fv(o.uF,L),e.uniform1i(o.uI,2),e.drawArrays(e.TRIANGLES,0,3);const c=Qe;Qe=Gt,Gt=c},Ot=(t,o,a,c,n)=>{const v=he[t];v.x=o,v.y=a,v.v+=c,v.r=n},Ao=(t,o)=>Math.hypot(t-I[0],o-I[1])/T,X=u.sound,Ea=(t,o,a)=>{const c=Math.min(Ao(t,o),1),n=1-c*c;Ot(0,t,o,a*(2.4+5.6*n)*(xe?.5:1),T*(.26+.2*n)*(xe?.8:1)),xe&&(wt=[t,o+T*.04],Eo=H+.14,xo=.45),X&&J>.02&&X.hit("noise",.1+.22*n*Math.sqrt(J),{cutoff:520+700*Math.sqrt(J),dur:.22+.3*J})},La=(t,o,a)=>{Ot(1,t,o,(a?3.2:2.3)*(xe?.45:1),T*.17),X&&(X.note(90+(i()*6|0),{dur:.07,vel:.18,wave:"sine"}),X.hit("noise",.05+.06*Math.sqrt(J),{cutoff:700,dur:.18}))},Lr=2.1,Aa=()=>{const t=(i()-.5)*1.5,o=I[0]+Math.sin(t)*T*.72,a=I[1]+Math.cos(t)*T*.72;if(We.push({x:o,y0:1.06,tx:o,ty:a,t:0,T:(1.06-a)/Lr,hit:!0}),m==="light rain"){const c=i(),n=Ye+i()*.03;Math.abs(c-I[0])>T*1.1&&We.push({x:c,y0:1.06,tx:c,ty:n,t:0,T:(1.06-n)/Lr,hit:!1})}};((t,o)=>{const a=Math.round(t/o);for(let c=0;c<a;c++)c===2&&Ot(0,I[0]+T*.08,I[1]+T*.28,7.2*(xe?.45:1),T*.4),c===16&&Ot(1,I[0]-T*.25,I[1]+T*.62,2.6*(xe?.45:1),T*.17),Lo(o),Er(o),H+=o})(u.home?1.5:1.1+g*1.6,1/30),J=pt,qt=se?.75:0;for(let t=0;t<12;t++)Lo(1/30);J=pt,H=0;let Ar=!1,zo=0,To=0,Do=0,zr=!1,Tr=0,Dr=0,Xt=!1;const za=new Float32Array(52),Ze=new Float32Array(8),Ta=1.05*(w==="misty dawn"?.9:1),Da=w==="misty dawn"?.032:w==="dappled"?.002:.0085,Sr=t=>{let o=ie(k.light,po);B(0,Qe.t),B(1,D.noise),e.uniform1i(o.uD,0),e.uniform1i(o.uN,1),e.uniform4fv(o.uCam,Be),e.uniform4fv(o.uL,at),e.uniform4fv(o.uAm,rr),Ze[0]=ut[0],Ze[1]=ut[1],Ze[2]=.016,Ze[3]=.9,Ze[4]=2.2,e.uniform4fv(o.uF,Ze),e.uniform1i(o.uI,12),e.drawArrays(e.TRIANGLES,0,3),o=ie(k.comp,null),B(0,ir.t),B(1,Qe.t),B(2,po.t),B(3,D.noise),e.uniform1i(o.uSc,0),e.uniform1i(o.uD,1),e.uniform1i(o.uLt,2),e.uniform1i(o.uN,3),e.uniform4fv(o.uCam,Be),e.uniform3f(o.uLs,Yt[0],Yt[1],Yt[2]);const a=za;a[0]=t,a[1]=d,a[2]=1.25,a[3]=.012,a[4]=I[0],a[5]=I[1],a[6]=T,a[7]=T*1.06;for(let v=0;v<2;v++){const f=he[v],s=8+v*4;a[s]=f.x,a[s+1]=f.y,a[s+2]=f.d*f.r*(v?.9:1)*.62,a[s+3]=f.r}a[16]=qt,a[17]=he[0].d*.036+he[1].d*.006,a[18]=.8,a[19]=Da,a[20]=Xe[0],a[21]=Xe[1],a[22]=Xe[2],a[23]=Ta;{const v=w==="dappled"?.62:1;a[24]=at[16]*v,a[25]=at[17]*v,a[26]=at[18]*v}a[27]=ee?.3:.92;const c=(w==="misty dawn"?.32:.085)*(ee?3.2:1);a[28]=c*.8,a[29]=c,a[30]=c*.75,a[31]=.4;let n=0;for(let v=We.length-1;v>=0&&n<3;v--){const f=We[v],s=Math.min(f.t/f.T,1),y=32+n*4;a[y]=f.x,a[y+1]=f.y0+(f.ty-f.y0)*s,a[y+2]=.026,a[y+3]=1,n++}a[44]=.0065,a[45]=n,a[46]=0,a[47]=0,a[48]=Dt[0],a[49]=Dt[1],a[50]=Te?Vt:0,a[51]=T*.085,e.uniform4fv(o.uF,a),e.drawArrays(e.TRIANGLES,0,3)};return Sr(0),(t,o)=>{o=Math.min(o,.12);const a=u.input,c=a.taps();for(const f of c){const s=f.x,y=1-f.y;if(Ao(s,y)<1.1)Ea(s,y,1);else{const U=s-I[0],_=y-I[1],A=Math.hypot(U,_)||1,p=U/A,C=_/A;Je(s+C*.025,y-p*.025,-.0024,4e-4),Je(s-C*.025,y+p*.025,.0024,4e-4)}}if(a.down){const f=a.x,s=1-a.y;Ar||(zr=Ao(f,s)<1.05,Tr=H,Do=0,zo=f,To=s,Xt=!1,yt=0);const y=(f-zo)/Math.max(o,.001),U=(s-To)/Math.max(o,.001),_=Math.hypot(y,U);if(Do+=_*o,Do>.03&&(Xt=!0,Ge=!1),zr&&!Xt&&H-Tr>.2&&!Ge){Ge=!0;const A=he[0];A.x=f,A.y=s,A.r=T*.46,X&&X.hit("noise",.09,{cutoff:380,dur:1.2})}if(Xt&&_>.05&&H-Dr>.04){const A=_||1,p=U/A,C=-y/A,O=.028,te=Math.min(.0058,.0024*_);Je(f+p*O,s+C*O,-te,6e-4),Je(f-p*O,s-C*O,te,6e-4),Dr=H}zo=f,To=s}else Ge=!1;Ar=a.down,Fo-=o,Fo<=0&&(Aa(),Fo=ga*(.5+i()));for(let f=We.length-1;f>=0;f--){const s=We[f];s.t+=o,s.t>=s.T&&(s.hit?(La(s.tx,s.ty,m==="light rain"),Fr&&(Fr=!1,he[0].x=s.tx,he[0].y=s.ty,he[0].r=T*.36,he[0].v+=6.2)):X&&X.note(84+(i()*8|0),{dur:.05,vel:.05,wave:"sine"}),We.splice(f,1))}if(No-=o,No<=0&&(No=4+i()*9,ce.length)){const f=ce[i()*ce.length|0],s=Oe([f[0],f[1],f[2]+f[3]+W]);wt=[s[0],s[1]],Eo=H+.45,xo=2.2}if(Ro-=o,Ro<=0&&(Ro=9+i()*18,X)){const f=86+(i()*7|0),s=i()*1.2-.6;X.note(f,{dur:.14,vel:.045,wave:"sine",pan:s}),X.note(f+3,{dur:.1,vel:.035,wave:"sine",pan:s,at:.17}),X.note(f-2,{dur:.2,vel:.03,wave:"sine",pan:s,at:.32})}const n=Math.max(1,Math.min(3,Math.round(o*30))),v=o/n;e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0);for(let f=0;f<n;f++)Lo(v),Er(v),H+=v;Sr(H)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
