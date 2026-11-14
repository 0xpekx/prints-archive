// Night Pool: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/209.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Xt){Xt&&function(){"use strict";const Ut=new WeakMap,L=`
`,E="#version 300 es"+L+"precision highp float;"+L+"precision highp int;"+L+"precision highp sampler2D;"+L+"#ifdef NOFLOAT"+L+"#define SD(g) vec4(0.,0.,((g).ba-.5))"+L+"#define ATS 8."+L+"#define WK 4."+L+"#else"+L+"#define SD(g) (g)"+L+"#define ATS 1."+L+"#define WK 1."+L+"#endif"+L+"#define TX(s,c) textureLod(s,c,0.)"+L,se=256,fe=228,_e=145,ee=433,ve=900,ue=640,ze=192,ke=512,De=384,Ae=1/30,ye=-2.4,it=3.2,we=-1.8,lt=3.2,Ot=1.7,_a=1.15,Ie=.42,ka=3.35,He=24*Math.PI/180,Da=-Math.sin(He),Ia=-Math.cos(He),Ca=Math.cos(He),Ba=-Math.sin(He),C=.24,Wt=-.027,Ht=5.55,ft=.12,Ce=(t,e,s,i,d,h,M,l,b,T,A)=>({key:t,CX:e,CY:s,CZ:i,FX:-Math.sin(d),FZ:-Math.cos(d),RX:Math.cos(d),RZ:-Math.sin(d),SYC:h,SMC:M,SMY:l,FOC:b||Ht,AOF:T??.4,ASP:A||.85}),vt={key:"home",CX:_a,CY:Ie,CZ:ka,FX:Da,FZ:Ia,RX:Ca,RZ:Ba,SYC:Wt,SMC:-.255,SMY:.225,FOC:Ht,AOF:.4,ASP:.85},Xa=Ce("side",3.35,Ie,1,70*Math.PI/180,Wt,-.255,.225),U=Ce("down",1.15,1.15,3.35,24*Math.PI/180,-.3,-.4,.26,4.3),Vt=Ce("net",1.15,Ie,3.35,18*Math.PI/180,.06,-.255,.225,5.4,-.12,.7),ut=Ce("along",-1.6,Ie,3.35,15*Math.PI/180,0,-.5,.47,3.2,0,1.05),Zt=Ce("corner",3,Ie,3.35,46.4*Math.PI/180,.024,-.255,.225,7.3,.1,.6),Ua=`const float SH=${C}, SMX=.27, COCK=${ft};
#define FOC u[6].w
#define CAM u[26].xyz
#define FWD u[27].xyz
#define RGT u[28].xyz
#define SYC u[26].w
#define SMY u[27].w
#define SMC u[28].w`,V=`layout(std140) uniform U { vec4 u[31]; };
`,Q=`
${Ua}
const float X0=-2.4, X1=3.2, Z0=-1.8, Z1=3.2, DEPTH=1.7;
const vec2 PMIN=vec2(X0,Z0), PSIZE=vec2(X1-X0,Z1-Z0);
#define AK vec2(1./(SH*1.12),1./(SH*u[8].w))
#define AO vec2(0.,-(SYC+u[7].w*SH))
const vec2 LF0=vec2(-1.,.2), LFS=vec2(4.4,3.6);
const vec3 KW=vec3(0.42,0.075,0.028);
vec3 atlasClip(vec3 P){ vec3 p=P-CAM; float w=dot(p,FWD); return vec3((dot(p,RGT)+AO.x*w)*AK.x,(p.y+AO.y*w)*AK.y,w); }
vec2 atlasUV(vec3 P){ vec3 c=atlasClip(P); return c.xy/max(c.z,1e-3)*.5+.5; }
vec2 unfoldUV(vec2 s){ return (s-vec2(-4.1,-3.5))/vec2(7.3,6.7); }
float cocOf(float w){ return COCK*abs(1./max(w,.2)-1./FOC); }
`,$=E+"out vec2 vN; void main(){ vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2)); vN=p*2.-1.; gl_Position=vec4(vN,0.,1.); }",Oa=E+V+`uniform sampler2D uS, uN; out vec4 o;
const vec2 TX=vec2(1./${se}.,1./${fe}.);
const float DX=${(5.6/se).toFixed(6)};
const vec2 RO[5]=vec2[5](vec2(1.,1.),vec2(2.5,0.),vec2(3.,3.),vec2(8.,0.),vec2(10.,10.));
const float RW[5]=float[5](0.5882,0.1592,0.0738,0.0573,0.1503);
void main(){
  if(u[1].w<-.5){ // the first state: a sea already moving
    vec2 c=gl_FragCoord.xy/256., q=u[0].zw;
    float a=textureLod(uN,c*.085+q,0.).r-.5, b=textureLod(uN,c*.19+q.yx,0.).g-.5, g=textureLod(uN,c*.03+q*1.7,0.).b-.5;
    o=vec4((a*.0032+b*.002+g*.0006)*u[1].y,0.,0.,0.); return; }
  vec2 uv=gl_FragCoord.xy*TX;
  vec4 c=texture(uS,uv);
  vec2 l=textureLod(uS,uv-vec2(TX.x,0.),0.).rg, r=textureLod(uS,uv+vec2(TX.x,0.),0.).rg, d=textureLod(uS,uv-vec2(0.,TX.y),0.).rg, t=textureLod(uS,uv+vec2(0.,TX.y),0.).rg;
  float K=1.1729*(c.r-.25*(l.r+r.r+d.r+t.r));
  float lv=l.g+r.g+d.g+t.g-4.*c.g;
  for(int i=0;i<5;i++){ vec2 a=RO[i]*TX; vec2 b=vec2(-RO[i].y,RO[i].x)*TX;
    float m=.25*(textureLod(uS,uv+a,0.).r+textureLod(uS,uv-a,0.).r+textureLod(uS,uv+b,0.).r+textureLod(uS,uv-b,0.).r);
    K+=RW[i]*(c.r-m); }
  float dt=u[0].y;
  vec2 nu=uv*vec2(${se}.,${fe}.)/256.;
  // wind on the water: band-limited pressure noise, white in time, under slow drifting gusts
  float g=textureLod(uN,nu*.013+vec2(u[0].x*.0041,-u[0].x*.0023),0.).r*.6+textureLod(uN,nu*.031+vec2(-u[0].x*.0067,u[0].x*.0031),0.).a*.4;
  g=smoothstep(.36,.68,g);
  float f=(textureLod(uN,nu*.085+u[2].xy,0.).g-.5)+.9*(textureLod(uN,nu*.19+u[2].zw,0.).b-.5)+.55*(textureLod(uN,nu*.41+u[2].yx,0.).a-.5);
  float v=c.g+dt*(-${(9.81/(5.6/se)).toFixed(2)}*K+u[1].x*(.22+.78*g)*f*6.)+.035*lv;
  v*=1.-dt*.34;
  // stones, fingers, drops: zero-mean kicks
  int n=int(u[1].w);
  vec2 w=uv*vec2(5.6,5.)+vec2(-2.4,-1.8);
  for(int i=0;i<n;i++){ vec4 s=u[19+i]; vec2 e=w-s.xy; float r2=dot(e,e)/(s.w*s.w);
    v+=s.z*(1.-r2)*exp(-r2); }
  float h=(c.r+dt*v)*(1.-dt*.35);  // the mean level has no restoring force of its own: hold it
  o=vec4(h,v,(r.r-l.r)/(2.*DX),(t.r-d.r)/(2.*DX));
}`,Wa=E+V+`uniform sampler2D uN; out vec4 o; in vec2 vN;
void main(){ vec2 c=(vN*.5+.5)*.9, q=vec2(u[0].x*.003,-u[0].x*.0021);
  vec2 a=textureLod(uN,c*.2+q,0.).rg-.5, b=textureLod(uN,c*.45-q*1.3,0.).gb-.5;
  o=vec4(.5,.5,(a+b*.5)*.3+.5); }`,jt=E+V+Q+`uniform sampler2D uS; uniform int uL; out vec2 vS; out float vF;
`,Ha=`vec4 simAt(vec2 xz){ return SD(textureLod(uS,(xz-PMIN)/PSIZE,0.)); }
`,Va=`vec4 simAt(vec2 xz){ vec2 c=(xz-PMIN)/PSIZE, e=.5/vec2(${se}.,${fe}.), f=vec2(e.x,-e.y); return SD(.25*(textureLod(uS,c+e,0.)+textureLod(uS,c-e,0.)+textureLod(uS,c+f,0.)+textureLod(uS,c-f,0.))); }
`,Za=jt+Va+`out vec2 vV;
vec3 trace(int i,int j,out vec2 xz,out float vF){
  vec4 L=u[3+uL], Th=u[5];
  float s=float(i)/${_e-1}., a=mix(Th[uL*2],Th[uL*2+1],float(j)/${ee-1}.);
  float r=L.w*(1.-pow(1.-s,1.7));
  xz=clamp(L.xz+r*vec2(cos(a),sin(a)),PMIN,PMIN+PSIZE);
  vec4 g=simAt(xz);
  vec3 Q=vec3(xz.x,g.r,xz.y), n=normalize(vec3(-g.b,1.,-g.a));
  vec3 I=Q-L.xyz; float d2=dot(I,I); I/=sqrt(d2);
  float ci=dot(I,n), eta=1.333, k=1.-eta*eta*(1.-ci*ci);
  float ct=sqrt(max(k,0.));
  vec3 T=eta*I+(ct-eta*ci)*n;
  float rs=(eta*ci-ct)/(eta*ci+ct), rp=(eta*ct-ci)/(eta*ct+ci);
  float R=k>0.?.5*(rs*rs+rp*rp):1.;
  vF=(1.-R)*max(ci,0.)/d2*(.55+.45*max(dot(I,u[6+uL].xyz),0.));
  float fj=float(j)/${ee-1}.;
  vF*=smoothstep(0.,.07,fj)*(1.-smoothstep(.93,1.,fj))*(1.-smoothstep(.93,1.,s));
  float tx=T.x<0.?(X0-Q.x)/min(T.x,-1e-4):1e4, tz=T.z<0.?(Z0-Q.z)/min(T.z,-1e-4):1e4, ty=(5.2-Q.y)/max(T.y,1e-3);
  vec3 P=Q+T*min(ty,min(tx,tz));
  return atlasClip(P);
}
void main(){
  int j=gl_VertexID%${ee}, i=gl_VertexID/${ee};
  vec3 c=vec3(0.,0.,1.); vec2 x0=vec2(0.),x1=vec2(0.),x2=vec2(0.),n0=vec2(0.),n1=vec2(0.),n2=vec2(0.); float f=0.;
  for(int k=0;k<3+int(u[12].z);k++){
    int ii=i+(k==1?(i<${_e-1}?1:-1):0), jj=j+(k==2?(j<${ee-1}?1:-1):0);
    vec2 xz; float vf; vec3 ck=trace(ii,jj,xz,vf); vec2 nk=ck.xy/max(ck.z,1e-4);
    if(k==0){ c=ck; f=vf; x0=xz; n0=nk; } else if(k==1){ x1=xz; n1=nk; } else { x2=xz; n2=nk; }
  }
  vec2 e1=n1-n0, e2=n2-n0, d1=x1-x0, d2=x2-x0;
  // the signed spread (drawn area over source area): it passes through nought on a fold's edge, so interpolated
  // across a cell and inverted it gives the bright edge and the graded band between
  float sa=e1.x*e2.y-e1.y*e2.x, aa=d1.x*d2.y-d1.y*d2.x;
  // held finite: an infinite spread at one corner of a cell, interpolated, made the whole cell NaN, which the halo blur
  // spread into a black block on the wall and white blots in its mirror on squally water
  vV=vec2(clamp(sa/(abs(aa)>1e-12?aa:1e-12),-1e6,1e6),max(length(e1*vec2(${ve/2}.,${ue/2}.)),length(e2*vec2(${ve/2}.,${ue/2}.))));
  vF=f; vS=x0;
  gl_Position=vec4(c.xy,0.,c.z);
}`,ja=jt+Ha+`
void main(){
  int j=gl_VertexID%${ee}, i=gl_VertexID/${ee};
  vec4 L=u[3+uL];
  vec2 xz=PMIN+PSIZE*vec2(float(j)/${ee-1}.,float(i)/${_e-1}.);
  vec4 g=simAt(xz);
  vec3 Q=vec3(xz.x,g.r,xz.y), n=normalize(vec3(-g.b,1.,-g.a));
  vec3 I=Q-L.xyz; float d2=dot(I,I), dl=sqrt(d2); I/=dl;
  float ci=dot(I,n), eta=1.333, k=1.-eta*eta*(1.-ci*ci), ct=sqrt(max(k,0.));
  float rs=(eta*ci-ct)/(eta*ci+ct), rp=(eta*ct-ci)/(eta*ct+ci);
  float R=k>0.?.5*(rs*rs+rp*rp):1.;
  vec3 T=I-2.*ci*n;
  float tf=(-DEPTH-Q.y)/min(T.y,-1e-3);
  float tx=T.x<0.?(X0-Q.x)/min(T.x,-1e-4):(X1-Q.x)/max(T.x,1e-4), tz=T.z<0.?(Z0-Q.z)/min(T.z,-1e-4):(Z1-Q.z)/max(T.z,1e-4);
  float t=min(tf,min(tx,tz));
  vec3 P=Q+T*t;
  vec2 s_=vec2(P.x,P.z);
  if(tx<=t&&T.x<0.) s_.x=X0-(P.y+DEPTH); if(tz<=t&&T.z<0.) s_.y=Z0-(P.y+DEPTH);
  vF=R*max(ci,0.)/d2*(.55+.45*max(dot(I,u[6+uL].xyz),0.));
  vS=xz;
  gl_Position=vec4(unfoldUV(s_)*2.-1.,0.,1.);
}`,Ga=E+`in vec2 vS; in float vF; out vec4 o; uniform vec2 uK;
void main(){ vec2 a=dFdx(vS), b=dFdy(vS); float A=abs(a.x*b.y-a.y*b.x)*uK.x; o=vec4(vF*min(A,uK.y)/ATS); o.a=1.; }`,Ya=E+`in vec2 vS; in float vF; in vec2 vV; out vec4 o; uniform vec2 uK;
void main(){ vec2 a=dFdx(vS), b=dFdy(vS); float A=min(abs(a.x*b.y-a.y*b.x)*uK.x,uK.y);
  o=vec4(vF*mix(A,inversesqrt(vV.x*vV.x+.004),smoothstep(2.5,7.,vV.y))/ATS); o.a=1.; }`,Ka=E+`uniform sampler2D uA; uniform vec4 uP; in vec2 vN; out vec4 o;
void main(){ vec2 uv=vN*.5+.5, e=uP.xy; 
  o=.227*texture(uA,uv)+.316*(texture(uA,uv+e*1.385)+texture(uA,uv-e*1.385))+.0705*(texture(uA,uv+e*3.23)+texture(uA,uv-e*3.23)); }`,Qa=E+`in vec2 vN; out vec4 o;
void main(){ vec2 p=vN*.5+.5, s=vec2(0.);
  for(int i=0;i<56;i++){ float f=float(i), m=5.+1.2*f*(1.+f*.012), a=f*2.39996+.7;
    vec2 k=floor(m*vec2(cos(a),sin(a))+.5); float ph=fract(f*.61803)*6.2832;
    s+=k*sin(dot(k,p)*6.2832+ph)*pow(m,-1.75); }
  o=vec4(clamp(s*.42+.5,0.,1.),.5,1.); }`,dt=`
uniform int uZ;
float nz(vec2 p){ return textureLod(uN,p/256.,0.).r; }
float fb(vec2 p){ float a=.5,s=0.; for(int i=0;i<4+uZ;i++){ s+=a*textureLod(uN,p/256.,0.)[i]; a*=.5; p=p*2.03+vec2(17.3,9.1);} return s/.9375; }
float hs(float n){ return texelFetch(uN,ivec2(int(n*17.)&255,int(n*5.+11.)&255),0).g; }
float hs2(vec2 n){ int a=int(floor(n.x)), b=int(floor(n.y)); return texelFetch(uN,ivec2((a*37+b*11+(a*b&63)*3)&255,(a*13+b*71+(a^b)*5)&255),0).b; }
`,Gt=`
void intWorld(vec2 uv,out vec3 P,out vec3 N,out float wall){
  vec2 s=uv*vec2(7.3,6.7)+vec2(-4.1,-3.5);
  P=vec3(s.x,-DEPTH,s.y); N=vec3(0.,1.,0.); wall=0.;
  if(s.x<X0){ P=vec3(X0,-DEPTH+(X0-s.x),s.y); N=vec3(1.,0.,0.); wall=1.; }
  if(s.y<Z0){ P=vec3(s.x,-DEPTH+(Z0-s.y),Z0); N=vec3(0.,0.,1.); wall=2.; }
  if(s.x<X0&&s.y<Z0){ P=vec3(X0,-DEPTH+max(X0-s.x,Z0-s.y),Z0); N=vec3(.7,0.,.7); wall=3.; }
}
`,Yt=E+"#define BT 1"+L+V+Q+"uniform sampler2D uN; in vec2 vN; out vec4 o;"+dt+Gt+`
void main(){
  vec3 P,N; float w; intWorld(vN*.5+.5,P,N,w);
  vec2 q=w<.5?P.xz:(w<1.5?vec2(P.z,P.y):vec2(P.x,P.y));
  vec3 a;
  float m=fb(q*9.), mm=fb(q*1.3+3.);
#if BT==0
  { // plaster: pale, mottled, with lime tide marks
    a=vec3(.70,.80,.82)*(.86+.24*m)*(.88+.2*mm);
    a*=1.-.16*smoothstep(.62,.8,fb(q*3.1+9.));
    a=mix(a,vec3(.5,.57,.56),.5*pow(nz(q*60.),4.));
#ifdef DV
    // the trowel's sweeps: overlapping arcs a hand long, each a shade lighter or darker at its edge
    vec2 tc=q/.32, ti=floor(tc), tf=fract(tc)-.5;
    for(int k=0;k<4;k++){ vec2 o=vec2(k&1,k>>1)-.5+(vec2(hs2(ti+vec2(k&1,k>>1)),hs2(ti.yx+vec2(k>>1,k&1)+7.))-.5)*.6;
      float rr=length(tf-o)*.32, e=abs(rr-.13-.04*hs2(ti*3.+float(k)));
      a*=1.-.07*smoothstep(.012,.0,e)*smoothstep(.0,.2,tf.y-o.y+.1)+.04*smoothstep(.03,.0,e); }
#endif
  }
#elif BT==1
  { // small glass mosaic on a darker grout
    vec2 c=q/.05, f=fract(c)-.5, id=floor(c);
    float t=hs2(id*vec2(3.,7.)+11.), t2=hs2(id.yx*vec2(5.,3.)+40.);
    a=mix(vec3(.30,.58,.68),vec3(.40,.70,.78),t);
    if(t2>.9) a=vec3(.56,.78,.82); if(t2<.06) a=vec3(.2,.44,.58);
    float g=smoothstep(.5,.43,max(abs(f.x),abs(f.y)));
#ifdef DV
    // seen close, the grout is the pale cement it is, a little wider
    g=smoothstep(.5,.4,max(abs(f.x),abs(f.y)));
    a=mix(vec3(.62,.66,.64)*(.85+.3*nz(q*80.)),a,g)*(.9+.2*mm);
#else
    a=mix(vec3(.3,.4,.42),a,g)*(.9+.2*mm);
#endif
  }
#elif BT==2
  { // honed black stone
#ifdef DV
    // seen close: slabs laid tight in courses of mixed lengths, each its own stone; the joints a dark wet grout, the
    // lamp set in the floor rakes the lippage: a broken pale arris on each edge that faces it, a hairline of shadow on
    // each edge that faces away, both gone a stride and a half from it
    float cy=floor(q.y/.6), hl=hs2(vec2(cy,57.)), ln=hl<.33?.6:hl<.67?.9:1.2;
    vec2 c=vec2(q.x/ln+.5*mod(cy,2.)+hl*3.,q.y/.6), fs=fract(c)-.5, f=abs(fs), id=floor(c), sz=vec2(ln,.6), lp=fs*sz;
    float sl=hs2(id*vec2(7.,3.)+21.), s2=hs2(id.yx*vec2(5.,9.)+3.), s3=hs2(id*vec2(11.,2.)+40.), s4=hs2(id*vec2(13.,5.)+77.);
    vec2 gd=vec2(cos(s2*3.1416),sin(s2*3.1416)), pd=vec2(-gd.y,gd.x);
    float gr=fb(vec2(dot(q,gd)*(14.+26.*s3),dot(q,pd)*1.6)+id*13.);
    a=vec3(.075,.084,.094)*(.5+1.2*sl+.16*(mod(id.x+id.y,2.)-.5))*(.66+.52*m)*(.5+gr)*(1.+vec3(.07,0.,-.07)*(s3-.5));
    a+=vec3(.09)*pow(nz(q*70.),10.);
    // one slab in four has a figure: a thin wandering pale vein, or a clouded half
    if(s4<.12){ float vv=abs(dot(lp,pd)+(s3-.5)*.3*sz.y+.07*(nz(q*2.3+id*5.)-.5)+.012*(nz(q*11.)-.5));
      a=mix(a,vec3(.2,.2,.19)*(.7+.6*nz(q*24.)),smoothstep(.007,.0015,vv)*.8); }
    else if(s4<.25) a*=1.+.7*smoothstep(-.12,.12,dot(lp,gd)+.25*(mm-.5));
    vec3 lw=(abs(u[3].y+DEPTH)<.1||(abs(u[4].y+DEPTH)>=.1&&length(u[3].xyz-P)<length(u[4].xyz-P))?u[3].xyz:u[4].xyz)-P;
    vec2 lq=w<.5?lw.xz:(w<1.5?lw.zy:lw.xy), ex=(.5-f)*sz, fc=step(0.,lq*sign(fs));
    float near=smoothstep(1.5,.25,length(lw)), nn=smoothstep(.25,.5,nz(q*31.+id*7.));
    float ab=max(fc.x*smoothstep(.0095,.0065,ex.x),fc.y*smoothstep(.0095,.0065,ex.y));
    float ad=max((1.-fc.x)*smoothstep(.0065,.0045,ex.x),(1.-fc.y)*smoothstep(.0065,.0045,ex.y));
    a=mix(a,vec3(.3,.305,.31)*(.8+.4*m),.9*ab*nn*near);
    a*=1.-.6*ad*near;
    float jn=smoothstep(-.005,-.002,-min(ex.x,ex.y));
    a=mix(a,min(a*.5,vec3(.02,.022,.024))*(.8+.4*nz(q*55.)),jn);
#else
    // slabs laid in courses, each cut from its own part of the block, so their tones differ; open joints with pale lime in them
    vec2 c=q/vec2(.9,.6); c.x+=.5*mod(floor(c.y),2.); vec2 f=abs(fract(c)-.5), id=floor(c);
    float sl=hs2(id*vec2(7.,3.)+21.), s2=hs2(id.yx*vec2(5.,9.)+3.), s3=hs2(id*vec2(11.,2.)+40.);
    // each slab its own value, warmth and grain: the grain runs along it at its own angle and fineness
    vec2 gd=vec2(cos(s2*3.1416),sin(s2*3.1416));
    float gr=fb(vec2(dot(q,gd)*(14.+26.*s3),dot(q,vec2(-gd.y,gd.x))*1.6)+id*13.);
    a=vec3(.075,.084,.094)*(.42+1.5*sl*sl)*(.66+.52*m)*(.5+gr)*(1.+vec3(.07,0.,-.07)*(s3-.5));
    a+=vec3(.09)*pow(nz(q*70.),10.);
    // faint wear on the arrises: a paler, broken line a finger wide along each edge
    vec2 ed=(.5-f)*vec2(.9,.6); float wr=smoothstep(.022,.006,min(ed.x,ed.y))*smoothstep(.35,.75,nz(q*31.+id*7.));
    a=mix(a,vec3(.17,.175,.18)*(.8+.4*m),.5*wr);
    float jn=smoothstep(-.012,-.006,max((f.x-.5)*.9,(f.y-.5)*.6));
    a=mix(a,vec3(.28,.29,.27)*(.7+.6*nz(q*55.)),jn);
#endif
  }
#else
  { // terrazzo: pale chips
    a=vec3(.62,.66,.64)*(.92+.14*mm);
    vec2 c=q/.028; vec2 id=floor(c);
    float t=hs2(id*vec2(3.,7.)+3.), l=length(fract(c)-.5);
    float chip=smoothstep(.5,.34,l+(nz(q*90.)-.5)*.5);
    vec3 ch=t<.4?vec3(.2,.22,.24):t<.7?vec3(.8,.78,.72):t<.9?vec3(.45,.33,.24):vec3(.2,.42,.4);
    a=mix(a,ch,chip*step(.25,hs2(id.yx*vec2(5.,11.))));
  }
#endif
  if(w<.5){ // lane line and drain
    vec2 dr=abs(P.xz-vec2(.7,.5)); float g=step(max(dr.x,dr.y),.17);
    if(g>0.){ a=vec3(.25,.27,.28); a*=.35+.65*smoothstep(.2,.45,abs(fract(P.x/.024)-.5)*2.); }
    float rim=step(max(dr.x,dr.y),.185)-g; a=mix(a,vec3(.62),rim);
  }
  // lamps set in their walls: a steel ring around a dark niche (looking down into it the water draws them)
#ifndef DV
  for(int i=0;i<2;i++){ vec3 e=P-u[3+i].xyz; float dn=dot(u[6+i].xyz,N);
    if(dn>.5&&abs(dot(e,N))<.05){ float d=length(e);
      a=mix(a,vec3(.75,.78,.78),smoothstep(.17,.16,d));
      a=mix(a,vec3(.3),smoothstep(.135,.125,d));
      a*=.5+.5*smoothstep(.17,.25,d); } }
#endif
  o=vec4(sqrt(clamp(a,0.,1.)),1.);
}`,$a=E+V+Q+"uniform sampler2D uN; in vec2 vN; out vec4 o;"+Gt+`
void main(){
  vec3 P,N; float w; intWorld(vN*.5+.5,P,N,w);
  vec3 E=vec3(0.);
  for(int i=0;i<2;i++){ vec3 l=u[3+i].xyz-P; float d2=dot(l,l)+.02, d=sqrt(d2); l/=d;
    vec3 c=u[8+i].xyz;
    float lobe=.45+.55*max(dot(-l,u[6+i].xyz),0.);
    float ndl=max(dot(N,l),0.);
    E+=c*exp(-KW*d)*(ndl*lobe/d2+.075*exp(-d*.45)); }
  // corners and seams see less of the basin
  vec2 ed=min(P.xz-PMIN,PMIN+PSIZE-P.xz);
  float ao=w<.5?(.55+.45*smoothstep(0.,.5,min(ed.x,ed.y))):(.55+.45*smoothstep(0.,.5,P.y+DEPTH));
  o=vec4(E*ao/ATS,1.);
}`,Ja=`
float jacAt(vec3 P,vec3 N){ vec3 p=P-CAM; float d2=dot(p,p),d=sqrt(d2); vec3 l=-p/d; float w=max(dot(p,FWD)/d,.2);
  return AK.x*AK.y*max(dot(N,l),0.)/(d2*w*w*w); }
vec4 pack2(vec2 v){ v=clamp(v,0.,.9999); vec2 h=floor(v*255.)/255.; vec2 l=fract(v*255.); return vec4(h.x,l.x,h.y,l.y); }
`,Kt=`
vec3 wallHit(vec2 n,float mir,out vec3 d,out float t,out float side){
  d=mir>.5?FWD+RGT*n.x*SMX+vec3(0.,SMC+n.y*SMY,0.):FWD+RGT*n.x*SH+vec3(0.,SYC+n.y*SH,0.);
  vec3 ro=CAM;
  if(mir>.5){ ro.y=-ro.y; d.y=-d.y; }
  float tz=d.z<0.?(Z0-ro.z)/d.z:1e5, tx=d.x<0.?(X0-ro.x)/d.x:1e5;
  t=min(tz,tx); side=tx<tz?1.:0.;
  return ro+d*t;
}
`,Qt=E+"#define WT 0"+L+V+Q+"uniform sampler2D uN; uniform vec4 uM; in vec2 vN; out vec4 o;"+dt+Kt+`
vec3 ALB; float BAND, GLZ;
float surf(vec2 q,float side){
  float wt=u[12].y, h=0.; vec3 a;
  float wh=u[12].w;
#if WT==0
  { // board-marked concrete
    float bw=.158, yy=q.y+.012*sin(q.x*.7+side*3.), row=floor(yy/bw), fy=fract(yy/bw);
    float rn=hs(row+side*31.), rn2=hs(row*1.7+50.+side*9.);
    float joints=floor(q.x/2.44+rn*7.);
    float g=fb(q*vec2(4.,75.)+vec2(rn*80.,rn2*40.)), g2=fb(q*vec2(1.5,5.)+7.);
    float sw=.022+.03*nz(vec2(q.x*5.+rn*90.,row*3.));
    float fin=smoothstep(.75,.45,fb(vec2(q.x*7.,row*9.+side*5.)));
    float sm=smoothstep(sw,.0,fy)+smoothstep(1.-sw,1.,fy);
    // the print of sawn boards: a grout fin along each joint (lit below, a dark hair of shadow above, since the light
    // comes up from the water), one plank sitting a little proud of the next, the grain of the wood in the face
    float sy=(fy<.5?fy:fy-1.)*bw;
    h=rn*.0012+(g-.5)*.0022+(.0016+.0024*fin)*exp(-sy*sy/(.0045*.0045));
    h-=.0005*smoothstep(.85,.97,nz(q*vec2(117.,126.)+vec2(q.y*37.,0.)));
    a=vec3(.37,.365,.345)*(.95+.1*hs2(vec2(row*7.+side*29.,joints*5.)))*(.93+.14*rn2)*(.62+.8*g2)*(.9+.2*g)*(.8+.4*fb(q*19.+vec2(side*17.,3.)));
    a*=.96+.04*smoothstep(.3,.7,fract(q.x/2.44+rn*7.));
    a*=.94+.12*nz(q*vec2(97.,89.));
    a*=1.-.22*smoothstep(.002,.012,sy)*smoothstep(.022,.012,sy);
    // tie holes: a cone a thumb wide, dark inside, its upper lip lit from below, a rust tear running down from it
    vec2 th=vec2(q.x/1.22+.25*side,yy/(bw*3.)); vec2 tf=(fract(th)-.5)*vec2(1.22,bw*3.); float td=length(tf);
    h-=.009*max(1.-td/.017,0.); a*=.45+.55*smoothstep(.004,.015,td); a*=1.+.5*smoothstep(.013,.017,td)*smoothstep(.023,.017,td)*smoothstep(.0,.012,tf.y);
    float run=smoothstep(.0,.35,-tf.y)*smoothstep(.012,.0,abs(tf.x)+(nz(q*vec2(50.,4.))-.5)*.016)*smoothstep(.012,.02,-tf.y);
    a=mix(a,vec3(.36,.2,.1)*(.7+.6*nz(q*vec2(40.,6.))),.45*run);
    // run-off from the cap, lime and dark at the waterline
    float st=nz(vec2(q.x*11.+side*40.,q.y*.5))*.6+nz(vec2(q.x*31.,q.y*1.3))*.4;
    a*=1.-.55*smoothstep(.46,.78,st)*smoothstep(wh-.9,wh,q.y);
    a=mix(a,vec3(.56,.55,.5),.55*smoothstep(.56,.74,st)*smoothstep(.56,.26,q.y)*smoothstep(.16,.24,q.y));
    float mo=fb(q*2.3+vec2(4.+side,9.))*.8+nz(q*40.)*.2;
    float mk=smoothstep(.58,.86,mo+.3*(fb(q*33.)-.5))*smoothstep(.5,.16,q.y);
    a=mix(a,vec3(.05,.065,.035)*(.6+1.*nz(q*190.)),mk*.6);
    h+=.002*mk*nz(q*110.);
  }
#elif WT==1
  { // old limewash on rough render
    float r=fb(q*vec2(6.,7.)), r2=fb(q*38.);
    h=(r-.5)*.012+(r2-.5)*.0028;
    a=vec3(.46,.455,.43)*(.8+.3*r);
    float fl=fb(q*vec2(2.1,2.9)+11.)*.75+r2*.25;
    float pl=smoothstep(.6,.72,fl)*smoothstep(1.1,.3,q.y);
    h-=.006*pl; a=mix(a,vec3(.33,.3,.26)*(.7+.5*r2),pl);
    float st=nz(vec2(q.x*14.+side*40.,q.y*.5)); a*=1.-.3*smoothstep(.5,.8,st)*smoothstep(wh-.9,wh,q.y);
    a*=1.-.34*smoothstep(.6,.16,q.y)*smoothstep(.3,.6,fb(q*vec2(5.,2.)));
  }
#elif WT==2
  { // weathered brick in running bond
    float bh=.075, row=floor(q.y/bh), fx=q.x/.225+.5*mod(row,2.)+side*.3, col=floor(fx);
    vec2 f=vec2(fract(fx),fract(q.y/bh));
    float rn=hs2(vec2(col*3.,row*7.)+side*19.), rn2=hs2(vec2(col*5.,row*3.)+50.);
    float m=smoothstep(.0,.05,min(f.x,1.-f.x))*smoothstep(.0,.13,min(f.y,1.-f.y));
    float r=fb(q*44.);
    h=m*(.008+rn*.003)+(r-.5)*.002;
    vec3 bc=mix(vec3(.36,.17,.11),vec3(.5,.31,.2),rn)*(.7+.6*r);
    if(rn2>.9) bc*=.5;
    a=mix(vec3(.43,.41,.36)*(.8+.3*r),bc,m);
    a=mix(a,vec3(.5,.5,.46),.45*smoothstep(.5,.7,fb(q*vec2(3.,1.5)+5.))*smoothstep(.7,.2,q.y));
  }
#else
  { // rusted steel plates
    float r=fb(q*11.), r2=fb(q*70.);
    vec2 pl=vec2(q.x/1.6+side*.3,q.y/1.3); vec2 f=abs(fract(pl)-.5);
    float seam=smoothstep(.5,.495,max(f.x,f.y));
    h=(r2-.5)*.0026+(r-.5)*.003-(1.-seam)*.006;
    a=mix(vec3(.25,.105,.05),vec3(.42,.2,.08),r)*(.7+.6*r2);
    a=mix(a,vec3(.1,.07,.06),.6*smoothstep(.52,.7,fb(q*vec2(3.,.6)+vec2(side*7.,1.)))*.9);
    a*=.6+.4*seam;
  }
#endif
  // a cast course along the top of the wall, its underside catching the light from below
  // it overhangs a finger: a bevelled drip edge under it faces down into the light
  float capy=wh-.085;
  h+=.012*smoothstep(capy-.014,capy,q.y);
  float capc=smoothstep(capy-.6*uM.z,capy+.6*uM.z,q.y);
  if(capc>0.){ h+=.002*capc; float cn=fb(q*vec2(26.,40.)+vec2(side*9.,2.)); a=mix(a,vec3(.40,.39,.37)*(.72+.5*cn)*(.92+.16*nz(q*vec2(311.,287.))),capc); h+=(cn-.5)*.002*capc; }
  // the glazed waterline band: small glass tile on real grout, a dark scum at the water, a chalk line above it
  float bd=.118; BAND=0.; GLZ=0.;
#ifdef BB
  // the waterline finished in the basin's own material (BB: 0 white plaster, 2 black stone, 3 terrazzo)
  float sw=q.y+.012*(nz(vec2(q.x*9.,side*5.))-.5);
#if BB==0
  { // no band: the render runs into the water under a ragged tide line of lime a hand above it
    float tl=sw-.13-.025*(fb(vec2(q.x*3.,side*7.))-.5);
    float li=exp(-tl*tl/(.0001+.0004*nz(vec2(q.x*20.,3.))))*smoothstep(.3,.6,fb(q*vec2(14.,40.)+2.));
    a=mix(a,vec3(.6,.6,.55)*(.8+.4*nz(q*200.)),.55*li); h+=.0005*li;
    a*=1.-.35*smoothstep(.13,.0,sw);
  }
#else
  if(q.y<bd){
    float jw=BB==2?.62:.75, jx=q.x/jw+side*.37+(BB==2?.5*step(.06,q.y):0.), jf=abs(fract(jx)-.5)*jw;
    float jt=smoothstep(.002,.004,jf)*smoothstep(.002,.005,abs(q.y-bd+.003)), r=fb(q*vec2(30.,60.)+side*4.);
#if BB==2
    a=vec3(.04,.043,.047)*(.75+.5*r)*(.85+.3*hs(floor(jx)+side*9.)); // dark slate courses, cleft faces
#else
    a=vec3(.6,.62,.58)*(.85+.25*r)*(.93+.12*hs(floor(jx)+side*9.)); // a honed course of the floor's terrazzo
    a=mix(a,vec3(.25,.24,.22),.5*smoothstep(.5,.34,length(fract(q/.022)-.5))*step(.6,hs2(floor(q/.022))));
#endif
#if BB==2
    a=mix(a*.35,a,jt); // the slate's joints are dark recesses
#else
    a=mix(vec3(.2,.2,.19),a,jt);
#endif
    h=.0012*jt-.0015*(1.-jt)+.0008*(r-.5);
    a*=1.-.45*smoothstep(.05,.0,sw); // wet above the water
    BAND=1.;
  } else { a*=1.-.5*(1.-smoothstep(bd,bd+.12,q.y)); h-=.004*(1.-smoothstep(bd,bd+.006,q.y)); }
#endif
#else
  if(q.y<bd){
    float ts=.0195; vec2 c=q/ts; vec2 id=floor(c), f=abs(fract(c)-.5);
    float gd=max(f.x,f.y), aa=max(uM.z/ts*.6,.02);
    float g=1.-smoothstep(.453-aa,.453+aa,gd);
    float t=hs2(id*vec2(3.,7.)+side*13.), t2=hs2(id.yx*vec2(5.,3.)), t3=hs2(id*vec2(7.,2.)+9.);
    vec3 tc=u[11].xyz*(.8+.32*t)*(.93+.14*nz(q*140.));
    if(t2>.95) tc*=.72;
    vec3 gr=vec3(.33,.32,.285)*(.6+.7*fb(q*230.));
    a=mix(gr,tc,g);
    h=g*(.0015-.0011*gd*gd*4.)+.0007*(t-.5)-(1.-g)*.0012;
    GLZ=g*pow(t3,7.)*(.75+.25*(1.-4.*gd*gd));
    float sn=fb(q*vec2(42.,70.)), sY=q.y+.02*(sn-.5)+.012*(nz(vec2(q.x*7.,side*3.))-.5);
    float sc=1.-smoothstep(.004,.022,sY);
    a=mix(a,vec3(.03,.036,.022)*(.6+1.1*nz(q*170.)),.4*sc); GLZ*=1.-.5*sc;
    float li=smoothstep(.026,.036,sY)*(1.-smoothstep(.036,.05,sY))*smoothstep(.35,.7,fb(q*vec2(26.,90.)+5.));
    a=mix(a,vec3(.62,.6,.53)*(.75+.5*nz(q*230.)),.62*li); GLZ*=1.-.8*li; h+=.0006*li;
    BAND=1.;
  } else { a*=1.-.5*(1.-smoothstep(bd,bd+.12,q.y)); h-=.004*(1.-smoothstep(bd,bd+.006,q.y)); }
#endif
  ALB=a;
  return h;
}
void main(){
  vec3 d; float t,side; vec3 P=wallHit(vN,uM.y,d,t,side);
  float h=surf(vec2(side>.5?P.z:P.x,P.y),side);
#ifdef NOFLOAT
  o=vec4(sqrt(clamp(ALB,0.,1.)),clamp(h*12.+.5,0.,1.));
#else
  o=vec4(sqrt(clamp(ALB,0.,1.)),h);
#endif
}`,eo=E+V+Q+"uniform sampler2D uN, uWall; uniform vec4 uM, uP; in vec2 vN; out vec4 o;"+dt+Ja+Kt+`
float hOf(vec4 w){
#ifdef NOFLOAT
  return (w.a-.5)/12.;
#else
  return w.a;
#endif
}
void main(){
  float mir=uM.y;
  vec3 d; float t,side; vec3 P=wallHit(vN,mir,d,t,side);
  vec3 N=side>.5?vec3(1.,0.,0.):vec3(0.,0.,1.);
  vec2 q=vec2(side>.5?P.z:P.x,P.y);
  float wh=u[12].w;
  float kind=0.;              // 0 wall, 2 sky, 3 water
  if(P.y<-.11&&mir<.5) kind=3.;
  float below=(P.y<0.&&mir<.5)?1.:0.;
  float wj=wh+.0012*(nz(vec2(q.x*7.,side*11.))-.5);
  float pxw=uM.z*t/FOC, cov=smoothstep(wj-.5*pxw,wj+.5*pxw,P.y);  // the wall's top edge, antialiased against the sky
  if(cov>.999) kind=2.;
  vec3 alb=vec3(.3), base=vec3(0.); float jac=0.; float mask=1.; vec2 auv=vec2(.5);
  if(kind<.5){
    // relief from the baked material: the next pixel along and the next pixel up
    ivec2 pc=ivec2(gl_FragCoord.xy), lim=ivec2(uP.zw)-1;
    vec4 w0=texelFetch(uWall,pc,0), wx=texelFetch(uWall,min(pc+ivec2(1,0),lim),0), wy=texelFetch(uWall,min(pc+ivec2(0,1),lim),0);
    vec3 dx_,dy_; float tx_,ty_,sx_,sy_;
    vec3 Px=wallHit(vN+vec2(uP.x,0.),mir,dx_,tx_,sx_), Py=wallHit(vN+vec2(0.,uP.y),mir,dy_,ty_,sy_);
    float dqx=(side>.5?Px.z:Px.x)-q.x, dqy=Py.y-P.y;
    float sgx=sx_==side&&abs(dqx)>1e-5?(hOf(w0)-hOf(wx))/dqx:0., sgy=abs(dqy)>1e-5?(hOf(w0)-hOf(wy))/dqy:0.;
    vec3 T=side>.5?vec3(0.,0.,1.):vec3(1.,0.,0.), B=vec3(0.,1.,0.);
    float br=.3+.7*nz(vec2(q.x*6.,floor(q.y/.158)*7.+side*3.));
    vec3 Nn=normalize(N+T*clamp(sgx,-.5,.5)+B*clamp(sgy,-.28,.28)*br);
    alb=w0.rgb*w0.rgb;
    // a few glass tiles in the band are glossier than the rest
    float gz=0.;
    if(q.y<.118&&u[12].x==1.){ vec2 tc=q/.0195, tf=abs(fract(tc)-.5); gz=step(max(tf.x,tf.y),.44)*pow(hs2(floor(tc)*vec2(7.,2.)+9.),7.)*smoothstep(.02,.045,q.y)*.85; }
    if(q.y<.118&&u[12].x==2.) gz=.35*smoothstep(.0,.03,q.y); // wet slate
    // the light rakes up the wall from the water: relief decides how much of the net each patch takes
    vec3 Lp=normalize(N*.72+vec3(0.,-.69,0.));
    float rel=mix(1.,clamp(max(dot(Nn,Lp),0.)/dot(N,Lp),0.,2.6),.55);
    jac=jacAt(P,N)*rel*(1.+gz*2.);
    // the pool's soft glow from below and a cold sky from above
    float gl=exp(-P.y*1.7)*1.9+.1*exp(-P.y*.5);
    base=alb*(u[14].xyz*gl*2.4*(.35+.65*rel*.6)+vec3(.035,.05,.075)*(.5+.5*Nn.y)*u[10].w);
    base+=(u[14].xyz*gl*.5+vec3(.012,.016,.022)*u[10].w)*(.12+gz);
    base+=alb*u[14].xyz*gl*u[30].y*(.75+.35*sin(q.x*1.9+q.y*1.3+side*2.)); // along the wall: light thrown back off the lit pool (0 elsewhere)
    float cor=min(side>.5?(P.x-X0):(P.z-Z0),1.);
    base*=.55+.45*smoothstep(0.,.8,cor);
    auv=atlasUV(P);
  }
  if(kind>.5&&kind<2.5||cov>.001){
    float y=d.y/length(d);
    float c=fb(d.xz/max(d.y+.4,.1)*.35+vec2(3.,1.));
    // the night: dark with stars, a cloud base lit from below by the town, or a moon behind thin cloud
    vec3 sk=mix(u[29].yzw*1.5,u[29].yzw*.6,smoothstep(0.,.3,y))*(.75+.5*c);
    if(mir<.5){
      vec2 mq=(vN-u[25].xy)*vec2(1.,1.15); float md=length(mq);
      sk+=u[25].z*(vec3(.5,.55,.6)*exp(-md*md*90.)+vec3(.05,.06,.075)*exp(-md*3.5))*(.7+.6*c);
      vec2 sc=vN*70., id=floor(sc), f=fract(sc)-.5-(vec2(hs2(id+3.),hs2(id.yx+5.))-.5)*.6;
      float hz=hs2(id*vec2(1.,3.)+7.), pr=length(f)/70./uM.w;
      sk+=u[25].w*step(.94,hz)*(hz-.9)*vec3(.7,.75,.85)*exp(-pr*pr*1.6)*(1.-c);
    }
    base=mix(base,sk,cov); alb*=1.-cov; jac*=1.-cov;
    if(kind>.5) auv=vec2(.001);
  }
  if(kind>2.5) mask=0.;
  if(below>.5) mask=0.;
  if(mir>.5&&P.y<0.) { base=vec3(0.); jac=0.; }
  if(uM.x<.5) o=pack2(auv);
  else if(uM.x<1.5) o=vec4(sqrt(clamp(alb,0.,1.)),sqrt(clamp(jac/2.,0.,1.)));
  else o=vec4(sqrt(clamp(base,0.,1.)),mask);
}`,to=E+V+Q+`
layout(location=0) in vec4 a0; layout(location=1) in vec4 a1; layout(location=2) in vec4 a2;
out vec2 vC; out vec2 vP; flat out vec4 vD; flat out vec3 vU;
vec2 prj(vec3 P){ vec3 e=P-CAM; float w=max(dot(e,FWD),.2); return vec2(dot(e,RGT)/(w*SH),(e.y/w-SYC)/SH); }
void main(){
  vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;
  vec3 A=a0.xyz-a1.xyz, B=a0.xyz+a1.xyz;
  vec2 na=prj(A), nb=prj(B), ax=(nb-na)*.5; float L=length(ax); ax=L>1e-5?ax/L:vec2(1.,0.);
  float wm=max(dot(a0.xyz-CAM,FWD),.2), wid=a0.w>.5?a2.x:length(a2.xyz);
  float W=wid/(wm*SH), R=cocOf(wm)+.003;
  float pk=min(1.,L*W/max((L+.42*R)*(W+.42*R),1e-6))*.98;
  float ex=R+W;
  vC=vec2(c.x*(L+ex),c.y*ex);
  vec2 pos=(na+nb)*.5+ax*vC.x+vec2(-ax.y,ax.x)*vC.y;
  vP=pos; vD=vec4(L,W,R,pk);
  vU=vec3((a0.xz-LF0)/LFS,a0.w>.5?.2:(.3+.7*a2.w));
  gl_Position=vec4(pos,0.,1.);
}`,ao=E+V+Q+`uniform vec4 uM; in vec2 vC; in vec2 vP; flat in vec4 vD; flat in vec3 vU; out vec4 o;
void main(){
  float L=vD.x, W=vD.y, R=vD.z;
  float tp=L>1e-5?clamp(vC.x/L,-1.,1.):0.;
  vec2 q=vec2(max(abs(vC.x)-L,0.),vC.y);
  float dist=length(q)-W*(1.-.6*tp*tp);
  float a=vD.w*(1.-smoothstep(-R,R,dist));
  { // beyond the wall: only over it, baked into the sky
    vec3 d=FWD+RGT*vP.x*SH+vec3(0.,SYC+vP.y*SH,0.);
    float t=min(d.x<0.?(X0-CAM.x)/d.x:1e5,d.z<0.?(Z0-CAM.z)/d.z:1e5);
    if(CAM.y+d.y*t<u[12].w+.006) a=0.;
    vec3 c=u[13].xyz*(.5+.9*vU.z)*(u[14].xyz*1.3+vec3(.035,.05,.075)*.5*u[10].w);
    o=vec4(sqrt(c)*a,a);
  }
}`,$t=`
vec3 lit(vec2 au,vec4 b,vec4 c){
  vec2 e=(au-vec2(.5,.3))*.0012;
  vec2 hl=TX(uH,au).rg;
  // the lamp is a hand wide: lines are crisp at the water and soften as they climb the wall
  float hf=clamp((CAM.y+((au.y*2.-1.)/AK.y-AO.y)*5.2)*.55,0.,.6);
  vec2 hh=hl*(hf+.2), l0=TX(uA,au+e).rg*(1.-hf), l1=TX(uA,au-e).rg*(1.-hf);
  vec2 k0=1./(1.+(l0+hh)*.03), k1=1./(1.+(l1+hh)*.03); l0*=k0; l1*=k1; hh*=.5*(k0+k1);
  // a warm lamp: its soft light between the lines has come the long way through the water and is the water's colour
  vec3 tq=mix(vec3(1.),vec3(.45,.92,1.45),u[17].w);
  vec3 caust=u[17].xyz*(vec3(l0.r,.5*(l0.r+l1.r),l1.r)+hh.r*tq)+u[18].xyz*(vec3(l0.g,.5*(l0.g+l1.g),l1.g)+hh.g*tq);
  float j=b.a*b.a*2.;
  return b.rgb*b.rgb*caust*j*ATS+c.rgb*c.rgb;
}
`,oo=E+V+Q+"uniform sampler2D uA, uH, uT0, uT1, uT2; out vec4 o; in vec2 vN;"+$t+`
void main(){ vec2 uv=vN*.5+.5; vec4 a=TX(uT0,uv); o=vec4(lit(vec2(a.r+a.g/255.,a.b+a.a/255.),TX(uT1,uv),TX(uT2,uv)),1.); }`,Jt=E+V+Q+`uniform sampler2D uS, uR, uB, uAlb, uLit, uTM; in vec2 vN; out vec4 o;
void main(){
  vec3 col=vec3(0.);
  vec3 d=FWD+RGT*vN.x*SH+vec3(0.,SYC+vN.y*SH,0.);
  float tw=min(d.x<0.?(X0-CAM.x)/d.x:1e4,d.z<0.?(Z0-CAM.z)/d.z:1e4), tp=CAM.y/max(-d.y,1e-3);
  if(tp<tw*1.3){
    float t=u[0].x, tq=min(tp,tw);
    vec3 Q=CAM+d*tq; Q.y=0.;
    float dist=length(Q-CAM);
    vec3 V=normalize(Q-CAM);
    vec4 g=SD(TX(uS,(Q.xz-PMIN)/PSIZE));
    float rl=clamp(log2(.57*tq*tq+.25),0.,5.);
    vec2 r0=textureLod(uR,Q.xz*.83+vec2(t*.041,-t*.033),rl).rg-.5, r1=textureLod(uR,vec2(.8*Q.x-.6*Q.z,.6*Q.x+.8*Q.z)*1.37+vec2(-t*.057,t*.046),rl).rg-.5;
    vec2 sl=g.ba+(r0+r1)*u[1].z*.045;
    vec3 n=normalize(vec3(-sl.x,1.,-sl.y));
    float cv=max(-dot(V,n),.015);
    float fr=.02+.98*pow(1.-cv,5.);
    // down through the surface
    // looking down into it the floor is seen through the long swell, the fine chop bends it less (u[30].x)
    vec3 r=refract(V,normalize(vec3(-sl.x*u[30].x,1.,-sl.y*u[30].x)),.75);
    float tf=(-DEPTH)/min(r.y,-.05);
    float tx=r.x<0.?(X0-Q.x)/min(r.x,-1e-4):(X1-Q.x)/max(r.x,1e-4);
    float tz=r.z<0.?(Z0-Q.z)/min(r.z,-1e-4):(Z1-Q.z)/max(r.z,1e-4);
    float tt=min(tf,min(tx,tz));
    vec3 P=Q+r*tt;
    vec2 s=P.xz;
    if(tx<=tt&&r.x<0.) s.x=X0-(P.y+DEPTH);
    if(tz<=tt&&r.z<0.) s.y=Z0-(P.y+DEPTH);
    vec2 ui=unfoldUV(s);
    vec3 alb=textureLod(uAlb,ui,clamp(dist*u[9].w-.8,0.,3.5)).rgb; alb*=alb;
    vec3 E=TX(uLit,ui).rgb*ATS*u[13].w;
    vec2 b0=TX(uB,ui).rg;
    E+=(u[8].xyz*b0.r+u[9].xyz*b0.g)*vec3(.6,.92,1.)*u[18].w*ATS;
#ifdef DV
    // the lamps seen down through the water: a steel bezel round the pressed glass. The glass burns out only in its
    // middle and falls to about half at its rim, showing its grid of small squares; its glare spills over the steel
    // and the first hand of floor, so nothing traces it. The swell and the fine chop tear its outline (not in a dead
    // calm); the steel is darker than the floor, with a short glint on its far inner slope and one on its near crown,
    // and the near rim hides the recess in a soft dark crescent. Its light pools on the slabs round it (u[30].w)
    vec3 em=vec3(0.), sfl=vec3(0.), eg=vec3(0.);
    float tear=smoothstep(.4,.9,u[1].z), bs=step(1.5,u[12].x)*step(u[12].x,2.5);
    vec2 ch=(r0+r1)*u[1].z*u[30].y+g.ba*u[1].z*.015*tear, vd=normalize(V.xz);
    // the small wavelets running over it tear the bright outline into moving slivers
    ch+=tear*u[1].z*.014*vec2(sin(dot(Q.xz,vec2(37.,23.))+t*3.1+6.*r0.x),sin(dot(Q.xz,vec2(-21.,41.))+t*2.7+6.*r1.y));
    for(int i=0;i<2;i++){
      vec3 lc=u[8+i].xyz, e3=P-u[3+i].xyz; e3.xz+=ch;
      float on=step(.001,lc.x+lc.y), dl=length(e3);
      vec2 dir=e3.xz/max(length(e3.xz),1e-3);
      // which side of the ring faces the lens: the chop tilts the view a little, so its glints slide round the steel
      float far=.5+.5*dot(dir,normalize(vd+(r0+r1)*u[1].z*.8)), nr=1.-far, f4=far*far*far*far, n4=nr*nr*nr*nr;
      f4*=f4; f4*=f4; f4*=f4; n4*=n4; n4*=n4; n4*=n4;
      float rim=smoothstep(.176,.17,dl)*on, ub=clamp((dl-.108)/.062,0.,1.), crown=.4+.6*sin(3.1416*ub);
      float nic=smoothstep(.125,.095,dl)*smoothstep(.45,.85,nr)*on;
      alb=mix(alb,(alb*.45+vec3(.0012,.0013,.0014))*crown,rim*smoothstep(1.,.7,ub));
      alb=mix(alb,alb*.15+.002,nic);
      float b1=(ub-.28)/.1, b2=(ub-.68)/.085;
      em+=lc*rim*(1.-nic)*(exp(-b1*b1)*3.*f4+exp(-b2*b2)*1.2*n4)*u[30].z*8.;
      // the glass in the lamp's own colour as the wall gets it: a white core with a straw shoulder on a halogen
      vec3 gc=u[17+i].xyz*(lc.x+lc.y+lc.z)/max(u[17+i].x+u[17+i].y+u[17+i].z,1e-4)*u[14].w*on;
      vec2 gf=fract(e3.xz/.016)-.5; float px=(1.-4.*gf.x*gf.x)*(1.-4.*gf.y*gf.y);
      float gs=smoothstep(.104,.086,dl), hot=exp(-dl*dl*700.);
      eg+=gc*(gs*(1.+.66*tear*(r0.x-r1.y))*.055*(1.6-6.*dl)*(1.-.45*smoothstep(.03,.07,dl)*(1.-px))+2.*hot+.05*exp(-max(dl-.09,0.)/.016)*(1.-gs));
      // its glow in the water round it, soft and wide
      float g2=1.+dl*dl*25.;
      em+=lc*on*u[30].z*(.6/(g2*g2)+.45*exp(-dl*4.5));
      float p2=1.+dl*dl*28.;
      em+=alb*lc*u[30].w*(1.-rim*(1.-ub*ub*ub))*(1./(p2*p2)+bs*.025/(1.+dl*dl*1.2));
      vec2 dq=Q.xz-u[3+i].xz;
      sfl+=lc*u[30].z*exp(-dot(dq,dq)*5.)*smoothstep(.12,.45,length(r0+r1));
    }
    vec3 under=(alb*E+em)*exp(-KW*tt)+eg;
#else
    vec3 under=alb*E*exp(-KW*tt);
#endif
    // light scattered in the water on the way, and the lamps' glow seen up through it
    for(int i=0;i<2;i++){
      vec3 e=u[3+i].xyz-Q; float ta=dot(e,r), h2=max(dot(e,e)-ta*ta,1e-4), h=sqrt(h2);
      float gl=(atan((tt-ta)/h)+atan(ta/h))/h;
      vec3 lc=u[8+i].xyz*exp(-KW*length(e))*vec3(.5,.78,1.);
      under+=lc*(gl*u[11].w);
      float q2=1.+h2*u[15+i].y;
      under+=lc*(u[15+i].x/(q2*q2)+u[15+i].z/(1.+h2*5.));
      // the lamp's own glass where the ray lands on it: a small disc with a hard rim
#ifndef DV
      under+=u[8+i].xyz*exp(-KW*tt)*u[14].w*smoothstep(.1,.088,length(P-u[3+i].xyz));
#endif
    }
#ifdef DV
    { // over the floor lamp the light stands in the water: a pale column, seen from the edge as a plume leaning up the frame
      bool f0=u[3].y<.1-DEPTH; vec3 Lf=f0?u[3].xyz:u[4].xyz;
      vec2 lq=Q.xz-Lf.xz; float sc=clamp(-dot(lq,r.xz)/max(dot(r.xz,r.xz),1e-6),0.,tt); vec2 dd=lq+r.xz*sc;
      float hc=max(Q.y+r.y*sc-Lf.y,0.);
      under+=(f0?u[8].xyz:u[9].xyz)*exp(-KW*length(Lf-Q))*vec3(.5,.78,1.)*u[30].z*.22*exp(-dot(dd,dd)*40.-hc*1.2)*step(Lf.y,.1-DEPTH); }
#endif
    // back up off the surface, onto whatever the tilted ray meets: the wall or the dark above it
    vec3 rf=reflect(V,n);
    rf.y=max(rf.y,.012);
    float t2x=rf.x<0.?(X0-Q.x)/min(rf.x,-1e-4):1e3, t2z=rf.z<0.?(Z0-Q.z)/min(rf.z,-1e-4):1e3;
    float t2=min(min(t2x,t2z),14.);
    vec3 Pr=Q+rf*t2;
    vec3 e=vec3(Pr.x,-Pr.y,Pr.z)-CAM; float w=max(dot(e,FWD),.2);
    vec2 ur=vec2(dot(e,RGT)/(w*SMX),(e.y/w-SMC)/SMY)*.5+.5;
    float sg=.006+.02*smoothstep(.1,.02,cv);
    vec3 refl=.3*(TX(uTM,ur+vec2(0.,sg*.5))+TX(uTM,ur-vec2(0.,sg*.5))).rgb+.2*(TX(uTM,ur+vec2(0.,sg*1.6))+TX(uTM,ur-vec2(0.,sg*1.6))).rgb;
    col=mix(under,refl,fr);
#ifdef DV
    col+=sfl;
#endif
  }
  o=vec4(min(col,vec3(9.))/WK,1.);
}`,so=(()=>{let t="";for(let s=0;s<14;s++){const i=s*2.39996+.4,d=Math.sqrt((s+.5)/14);t+=(s?",":"")+"vec2("+(Math.cos(i)*d).toFixed(4)+","+(Math.sin(i)*d).toFixed(4)+")"}return t})(),no=E+V+Q+`uniform sampler2D uA, uH, uT1, uT2, uS, uN, uW; in vec2 vN; out vec4 o;
const vec2 TP[14]=vec2[14](${so});`+$t+`
vec3 tone(vec3 c){ c*=u[10].x; vec3 m=c*(2.51*c+.03)/(c*(2.43*c+.59)+.14); return m; }
void main(){
  vec2 uv=vN*.5+.5;
  float t=u[0].x;
  vec3 d=FWD+RGT*vN.x*SH+vec3(0.,SYC+vN.y*SH,0.);
  // the waterline climbs and falls on the wall as the waves arrive
  float tw=min(d.x<0.?(X0-CAM.x)/d.x:1e4,d.z<0.?(Z0-CAM.z)/d.z:1e4);
  vec3 PW=CAM+d*tw;
  vec4 c=TX(uT2,uv);
  float wet=0., wk=c.a<.5?1.:0., film=0., men=0.;
  if(abs(PW.y)<.11){ float hw=SD(TX(uS,(PW.xz-PMIN)/PSIZE)).r*.3, px=tw*u[15].w; wk=1.-smoothstep(hw-px,hw+px,PW.y); wet=1.-smoothstep(0.,.05,PW.y-hw);
    // where a wave climbs the band the water is a thin clear sheet over the tiles, with a bright line at its edge
    film=wk*smoothstep(-.03,0.,PW.y); float mq=(PW.y-hw)/px; men=exp(-mq*mq)*(.3+.9*TX(uN,vec2((PW.x+PW.z)*.21,.37)).r); }
  vec3 col=vec3(0.);
  vec2 au=vec2(vN.x/1.12,(vN.y-u[7].w)/u[8].w)*.5+.5;
  if(wk<.999||film>.001){
    // the wall falls slightly out of focus toward its ends
    float cw=cocOf(tw)*.3; int n=cw>u[15].w*1.2?3:1;
    for(int i=0;i<n;i++){ vec2 q=vec2(i==0?0.:(i==1?cw:-cw),0.); col+=lit(au+q/vec2(1.12,.85),TX(uT1,uv+q),TX(uT2,uv+q)); }
    col*=(1.-.4*wet)/float(n);
  }
  if(wk>.001){
    float dv=CAM.y/max(-d.y,1e-3), cc=d.y<-1e-3?cocOf(dv)*.5*u[29].x:0.;
    // each tap reads a level as wide as the gap between taps, so a glint opens into one soft even disc, not a screen of copies
    float lv=clamp(log2(max(cc*float(textureSize(uW,0).x)*.42,1.)),0.,4.);
    vec3 s=vec3(0.);
    for(int i=0;i<14;i++) s+=textureLod(uW,uv+TP[i]*cc,lv).rgb;
    s*=WK/14.;
    col=mix(col,mix(s,col*vec3(.42,.78,.84)+s*.3,film),wk);
  }
  col+=men*u[14].xyz*18.;
  // a little veil from the brightest lines in the lens
  vec2 hv=TX(uH,au).rg;
  col+=(u[17].xyz*hv.r+u[18].xyz*hv.g)*.004*ATS;
  vec2 vg=vN*vec2(.92,.88);
  col*=1.-.06*dot(vg,vg);
  vec3 m=tone(col);
  m=sqrt(m);
  // a fine dither against banding in the dark
  vec2 gc=gl_FragCoord.xy;
  vec4 n0=TX(uN,(gc+.5)/256.+u[10].yz), n1=TX(uN,gc/512.+u[10].zy);
  float lum=dot(m,vec3(.3,.55,.15)), amp=mix(.012,.005,sqrt(clamp(lum,0.,1.)))*u[16].w;
  float g=(n0.a-.5)*.55+(n1.r+n1.g-1.)*.8;
  m+=amp*(g+vec3(n1.b-.5,(.5-n1.b)*.5+(n0.r-.5)*.4,n1.a-.5)*.42);
  o=vec4(m,1.);
}`,ro=E+V+Q+`uniform sampler2D uS;
layout(location=0) in vec4 a0; layout(location=1) in vec4 a1;
out vec2 vC; flat out vec4 vI; out vec3 vTint;
void main(){
  vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;
  vec3 P=a0.xyz; float kind=a1.x, r=a0.w;
  vec3 tint=vec3(1.);
  if(P.y<0.){ // seen through the surface: apparent depth, wobbling with the slope above it
    vec4 g=SD(textureLod(uS,(P.xz-PMIN)/PSIZE,0.));
    float dp=-P.y;
    tint=exp(-KW*dp*1.3)*vec3(.32,.8,.9);
    if(kind<.5){ // a sunk stone: only what the surface lets through, the water's colour over it growing with depth
      vec3 e0=vec3(P.x,0.,P.z)-CAM; float cv=CAM.y/length(e0);
      tint=exp(-KW*dp*.8)*(1.-(.02+.98*pow(1.-cv,5.))); }
    P.y=-dp/1.333; P.xz+=-g.ba*dp*.25;
  }
  vec3 e=P-CAM; float w=max(dot(e,FWD),.2);
  vec2 ndc=vec2(dot(e,RGT)/(w*SH),(e.y/w-SYC)/SH);
  float s0=r/(w*SH), R=cocOf(w), s=sqrt(s0*s0+R*R);
  vec2 q=c; float ln=0.;
  if(a1.y!=0.||a1.z!=0.){ // a drop, or a stone in the air, is drawn along its motion
    vec2 vel=a1.yz; vec2 ax=normalize(vel); ln=length(vel);
    q=ax*c.y*(1.+ln)+vec2(-ax.y,ax.x)*c.x; }
  if(kind>2.5) q=c*vec2(1.,.45); // a bubble breaking the surface, seen nearly edge on
  vC=c; vI=vec4(kind,a1.w,s0/s,ln); vTint=tint;
  gl_Position=vec4(ndc+q*s,0.,1.);
}`,co=E+V+Q+`uniform sampler2D uN; in vec2 vC; flat in vec4 vI; in vec3 vTint; out vec4 o;
float at2(float y,float x){ float ax=abs(x), ay=abs(y); float a=atan(min(ax,ay)/max(max(ax,ay),1e-6)); if(ay>ax) a=1.5707963-a; if(x<0.) a=3.1415927-a; return y<0.?-a:a; }
void main(){
  float kind=vI.x, r2=dot(vC,vC), sharp=vI.z, soft=exp(-r2*3.2)*sharp*sharp;
  vec3 glow=u[14].xyz*14.+vec3(.05);
  if(kind<.5&&vI.w>0.){ // a stone in the air, one frame's travel: what a disc sweeps over the exposure, lit grey from the pool below
    float ln=vI.w, ay=vC.y*(1.+ln), ch=sqrt(max(1.-vC.x*vC.x,0.));
    float cover=clamp((min(ln,ay+ch)-max(-ln,ay-ch))/(2.*ln),0.,1.);
    float a=cover*smoothstep(1.,.62,abs(vC.x))*mix(.8,1.,sharp);
    float n=textureLod(uN,vec2(vC.x*.3+vI.y*17.,ay*.05+vI.y*9.),0.).r;
    vec3 cc=vec3(.2,.2,.19)*(.8+.4*n)*(glow*.75+.03);
    o=vec4(sqrt(cc)*a,a);
  } else if(kind<.5){ // a stone under the water, looking down into it
    float ang=at2(vC.y,vC.x), rr=sqrt(r2);
    float n=textureLod(uN,vec2(vC.x+vI.y*17.,vC.y+vI.y*9.)*.03,0.).r, n2=textureLod(uN,vec2(vC.x+vI.y*5.,vC.y)*.11,0.).g;
    float edge=.8+.16*sin(ang*2.+vI.y*40.)+.1*sin(ang*3.+vI.y*90.)+.1*(n-.5);
    float a=mix(soft,1.-smoothstep(edge-.14,edge,rr),smoothstep(.45,.9,sharp));
    float sh=clamp(.5-vC.y*.55+.5*(n2-.5),0.,1.);
    // matt grey-green, lit from above by the pool's own light; the surface's share and the water's depth fade it into the water
    vec3 cc=vec3(.42,.45,.4)*(.6+.6*n)*(glow*1.3*(.7+.6*(1.-sh))+.06);
    float tr=dot(vTint,vec3(.2,.5,.3));
    a*=clamp(tr*1.25,0.,.85);
    cc*=vTint/max(tr,1e-3);
    o=vec4(sqrt(cc)*a,a);
  } else if(kind<1.5){ // a drop, lit from the pool below
    float a=exp(-r2*2.6)*.95*sharp*sharp;
    vec3 cc=glow*vec3(.8,1.,1.)*1.2+.22;
    o=vec4(sqrt(min(cc,vec3(1.)))*a,a);
  } else if(kind>2.5){ // a bubble breaking the surface: a short bright arc on its top, gone in a moment
    float rr=sqrt(r2), up=smoothstep(-.1,.5,vC.y);
    float a=smoothstep(.45,.8,rr)*smoothstep(1.,.86,rr)*up*(1.-vI.y)*sharp;
    vec3 cc=glow*.9+.18;
    o=vec4(sqrt(min(cc,vec3(1.)))*a,a*.7);
  } else { // a bubble: a bright rim and a highlight
    float rr=sqrt(r2); float a=1.-smoothstep(.86,1.,rr);
    float rim=(smoothstep(.55,.95,rr)*.55+.75*exp(-dot(vC-vec2(-.3,.35),vC-vec2(-.3,.35))*18.))*sharp*sharp;
    vec3 cc=(glow*.65+.3)*vTint;
    o=vec4(sqrt(min(cc,vec3(1.)))*rim*a,rim*a*.8);
  }
}`,io=E+V+Q+`uniform vec4 uP; out vec2 vC; flat out vec3 vL; void main(){ vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;
  float dv=step(u[30].x,.99); vec2 e=uP.xy-u[3].xz; vL=vec3(e/max(length(e),1e-3)*smoothstep(.1,.6,length(e))*dv,1.9+1.3*dv);
  vC=c; gl_Position=vec4(unfoldUV(uP.xy+c*uP.z*vL.z)*2.-1.,0.,1.); }`,lo=E+`uniform sampler2D uN; uniform vec4 uP; in vec2 vC; flat in vec3 vL; out vec4 o;
float at2(float y,float x){ float ax=abs(x), ay=abs(y); float a=atan(min(ax,ay)/max(max(ax,ay),1e-6)); if(ay>ax) a=1.5707963-a; if(x<0.) a=3.1415927-a; return y<0.?-a:a; }
void main(){ vec2 v=vC*vL.z; float s=uP.w;
  float ang=at2(v.y,v.x), rr=length(v);
  vec2 e=v; float n=textureLod(uN,(v+s*40.)*.09,0.).r, n2=textureLod(uN,(v+s*19.)*.31,0.).g, n3=textureLod(uN,(v+s*7.)*.8,0.).b;
  float edge=.86+.17*sin(ang*2.+s*40.)+.09*sin(ang*3.+s*90.)+.13*(n-.5);
  float a=smoothstep(edge,edge-.07,rr);
  // a soft contact shadow all round, and the long one cast away from the lamp lying low on the floor
  vec2 sv=v-vL.xy*1.3; float sa=dot(sv,vL.xy), sp=sv.x*vL.y-sv.y*vL.x;
  float sh=clamp(exp(-max(rr-edge*.75,0.)*2.1)*.62+.6*exp(-(sa*sa/4.+sp*sp/.8)*1.2)*length(vL.xy),0.,1.);
  float hg=sqrt(max(1.-rr*rr/(edge*edge),0.));
  float lt=.35+.65*hg*(.65+.35*(v.y+.4*v.x))+.3*(n2-.5);
  vec3 sc=mix(vec3(.3,.29,.27),vec3(.55,.53,.48),s)*(.55+.6*n2)*(.85+.3*n3)*max(lt,.12);
  float oa=max(a,sh);
  vec3 cc=a>0.01?sqrt(sc)*a/max(oa,1e-3):vec3(0.);
  o=vec4(cc,oa); }`,fo={uS:0,uN:1,uA:2,uB:3,uT0:4,uT1:5,uT2:6,uAlb:7,uLit:8,uTM:9,uH:10,uW:13,uWall:14,uR:15};function Ve(t,e,s,i){return ta(t,ea(t,e,s,i))}function ea(t,e,s,i){const d={};for(const h in s){if(i&&!i(h))continue;const M=t.createProgram(),l=[];s[h].forEach((b,T)=>{const A=t.createShader(T?t.FRAGMENT_SHADER:t.VERTEX_SHADER);t.shaderSource(A,e.float?b:b.replace("precision highp float","#define NOFLOAT"+L+"precision highp float")),t.compileShader(A),t.attachShader(M,A),l.push(A)}),t.linkProgram(M),t.flush(),d[h]={p:M,sh:l}}return d}function ta(t,e){const s=fo,i={};for(const d in e){const{p:h,sh:M}=e[d];if(!t.getProgramParameter(h,t.LINK_STATUS)){const b=M.map(T=>t.getShaderInfoLog(T)).join(" ")+t.getProgramInfoLog(h);throw new Error("209 "+d+": "+b)}M.forEach(b=>{t.detachShader(h,b),t.deleteShader(b)}),t.useProgram(h);const l=t.getUniformBlockIndex(h,"U");l!==t.INVALID_INDEX&&t.uniformBlockBinding(h,l,0);for(const b in s){const T=t.getUniformLocation(h,b);T&&t.uniform1i(T,s[b])}i[d]={p:h,uL:t.getUniformLocation(h,"uL"),uK:t.getUniformLocation(h,"uK"),uM:t.getUniformLocation(h,"uM"),uP:t.getUniformLocation(h,"uP")}}return i}const aa=t=>t?Jt.replace("uniform sampler2D uS,","#define DV 1"+L+"uniform sampler2D uS,"):Jt;function vo(t,e){let s=Ut.get(t);if(s)return s;s={};const i=t.getExtension("EXT_color_buffer_float"),d=t.getExtension("EXT_color_buffer_half_float");if(s.float=!!(i||d),s.float){const T=t.createTexture(),A=t.createFramebuffer();t.bindTexture(t.TEXTURE_2D,T),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,4,4,0,t.RGBA,t.HALF_FLOAT,null),t.bindFramebuffer(t.FRAMEBUFFER,A),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,T,0),s.float=t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE,t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(A),t.deleteTexture(T)}const h={sim:[$,s.float?Oa:Wa],up:[Za,Ya],dn:[ja,Ga],alb:[$,Yt],lit:[$,$a],wall:[$,Qt],scene:[$,eo],splat:[to,ao],rip:[$,Qa],blur:[$,Ka],mir:[$,oo],water:[$,aa(e)],comp:[$,no],part:[ro,co],stamp:[io,lo]};s.src=h,s.p=Ve(t,s,h,T=>T!=="part"),s.wall=[s.p.wall],s.alb=[],s.alb[1]=s.p.alb,s.water=[],s.water[e]=s.p.water;const M=new Uint8Array(256*256*4);let l=49734321;for(let T=0;T<M.length;T++)l^=l<<13,l^=l>>>17,l^=l<<5,M[T]=l&255;s.noise=t.createTexture(),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,s.noise),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,M),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const b=(T,A)=>{const O=new Uint16Array(Math.floor((_e-1)/T)*Math.floor((ee-1)/A)*6);let P=0;for(let Z=0;Z+T<_e;Z+=T)for(let f=0;f+A<ee;f+=A){const m=Z*ee+f,te=m+A,J=(Z+T)*ee+f,v=J+A;O[P++]=m,O[P++]=J,O[P++]=te,O[P++]=te,O[P++]=J,O[P++]=v}const ne=t.createVertexArray();t.bindVertexArray(ne);const ie=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,ie),t.bufferData(t.ELEMENT_ARRAY_BUFFER,O,t.STATIC_DRAW),{vao:ne,n:P}};return s.fine=b(1,1),s.coarse=b(2,3),s.emptyVao=t.createVertexArray(),t.bindVertexArray(null),s.rip=F(t,256,256,t.RGBA8,t.LINEAR,!0),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.useProgram(s.p.rip.p),t.bindFramebuffer(t.FRAMEBUFFER,s.rip.fb),t.viewport(0,0,256,256),t.bindVertexArray(s.emptyVao),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,s.rip.t),t.generateMipmap(t.TEXTURE_2D),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindVertexArray(null),Ut.set(t,s),s}function F(t,e,s,i,d,h){const M=t.createTexture();t.bindTexture(t.TEXTURE_2D,M);const l=h?Math.floor(Math.log2(Math.max(e,s)))+1:1;t.texStorage2D(t.TEXTURE_2D,l,i,e,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,h?t.LINEAR_MIPMAP_LINEAR:d),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,d),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const b=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,b),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,M,0),{t:M,fb:b,w:e,h:s}}function ht(t){let e=parseInt(t.slice(2,10),16)>>>0,s=parseInt(t.slice(10,18),16)>>>0,i=parseInt(t.slice(18,26),16)>>>0,d=parseInt(t.slice(26,34),16)>>>0;return()=>{e|=0,s|=0,i|=0,d|=0;const h=(e+s|0)+d|0;return d=d+1|0,e=s^s>>>9,s=i+(i<<3)|0,i=i<<21|i>>>11,i=i+h|0,(h>>>0)/4294967296}}const de=(t,e)=>{let s=0;for(const d of e)s+=d[1];let i=t()*s;for(const d of e)if(i-=d[1],i<=0)return d[0];return e[0][0]},uo=(t,e,s,i)=>[i.CX+i.FX*s+i.RX*t*C*s,i.CY+(i.SYC+e*C)*s,i.CZ+i.FZ*s+i.RZ*t*C*s];function ho(t,e,s,i){const{CX:d,CY:h,CZ:M,FX:l,FZ:b,RX:T,RZ:A,SYC:O}=i,P=[],ne=(v,p,q,g,z,G,N,Y,W,ae,he,D)=>{P.push(v,p,q,g,z,G,N,Y,W,ae,he,D)},ie=(v,p,q,g)=>ne((v[0]+p[0])/2,(v[1]+p[1])/2,(v[2]+p[2])/2,g||1,(p[0]-v[0])/2,(p[1]-v[1])/2,(p[2]-v[2])/2,t(),q,0,0,0),Z=v=>{const p=Math.hypot(v[0],v[1],v[2])||1;return[v[0]/p,v[1]/p,v[2]/p]},f=(v,p)=>[v[1]*p[2]-v[2]*p[1],v[2]*p[0]-v[0]*p[2],v[0]*p[1]-v[1]*p[0]],m={olive:{back:90,bough:7,per:3,seg:5,leaves:3,len:.04,wid:.0115,step:.075,droop:.55},myrtle:{back:100,bough:7,per:3,seg:5,leaves:3,len:.026,wid:.014,step:.06,droop:.2},laurel:{back:60,bough:6,per:2,seg:5,leaves:2,len:.072,wid:.027,step:.085,droop:.35},bamboo:{back:0,bough:6,per:2,seg:4,leaves:4,len:.085,wid:.012,step:.09,droop:.9},bare:{back:24,bough:8,per:3,seg:7,leaves:0,len:.04,wid:.01,step:.085,droop:.1}}[e],te=(v,p,q)=>{let g=v,z=Z(p);for(let G=0;G<m.seg;G++){const N=[g[0]+z[0]*m.step,g[1]+z[1]*m.step,g[2]+z[2]*m.step];q>0&&ie(g,N,Math.max(.0024,q*(1-G/m.seg)));for(let Y=0;Y<m.leaves;Y++){const W=1+(t()-.5)*.55,ae=m.len*W,he=m.wid*W,D=Y%2?1:-1,H=Z(f(z,[t()-.5,1,t()-.5])),I=Z([z[0]*.6+H[0]*D*.75+(t()-.5)*.35,z[1]*.6+H[1]*D*.75-m.droop*(.35+t()*.7),z[2]*.6+H[2]*D*.75+(t()-.5)*.35]),oe=Z(f(I,Z([(t()-.5)*1.25,1,(t()-.5)*1.25]))),Ee=t(),Me=[g[0]+(N[0]-g[0])*Ee,g[1]+(N[1]-g[1])*Ee,g[2]+(N[2]-g[2])*Ee];ne(Me[0]+I[0]*ae,Me[1]+I[1]*ae,Me[2]+I[2]*ae,0,I[0]*ae,I[1]*ae,I[2]*ae,t(),oe[0]*he,oe[1]*he,oe[2]*he,t())}g=N,z=Z([z[0]+(t()-.5)*.34,z[1]-.12*(1+m.droop)+(t()-.5)*.24,z[2]+(t()-.5)*.34])}};if(e==="bamboo"){const v=26+Math.floor(t()*12);for(let p=0;p<v;p++){let q=-3.6+t()*5,g=s-.5,z=-2.1-t()*1.6;const G=.018+t()*.02,N=(t()-.5)*.05;for(let Y=0;Y<5;Y++){const W=[q+N,g+.42,z+.03];ie([q,g,z],W,G*(1-Y*.04),2),te(W,[t()-.5,.2,t()-.5],0),q=W[0],g=W[1],z=W[2]}}}for(let v=0;v<m.back;v++){const p=[-4.4+t()*6.2,s-.05+Math.pow(t(),.7)*1.5,-2.05-t()*2],q=t()*6.28;te(p,[Math.cos(q),(t()-.5)*.9,Math.sin(q)],t()<.3?.004:0)}const J=[];for(let v=0;v<P.length;v+=12){const p=P[v]-d,q=P[v+1]-h,g=P[v+2]-M,z=p*l+g*b;if(z<.5)continue;const G=(p*T+g*A)/(z*C),N=(q/z-O)/C,Y=1.15+ft*Math.abs(1/z-1/i.FOC)+.25/z;if(!(Math.abs(G)>Y||Math.abs(N)>Y)&&!(z<4.6))for(let W=0;W<12;W++)J.push(P[v+W])}return{far:new Float32Array(J)}}Xt.add({num:209,name:"Night Pool",fam:"Worlds",recipe:"A little walled pool at night shot with a long lens, where real waves bend the light from the underwater lamps into a moving net on the walls. The lamps, the basin, the tree and the wind change every mint. Tap to drop a stone and watch the net break up, or drag to stir the water.",interactive:"Tap to drop a stone, drag to stir the water",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,s=ht(t.hash),i=t.size,d=ht("0x"+t.hash.slice(42)+t.hash.slice(2,10)+"5bd1e995"),h=d(),M=t.home?"Far wall":h<.14?"Side wall":h<.255?"The net":h<.34?"Along the wall":h<.6?"Into the water":h<.665?"Along the wall":h<.755?"Across the corner":"Far wall",l={"Side wall":Xa,"Into the water":U,"The net":Vt,"Along the wall":ut,"Across the corner":Zt}[M]||vt,{CX:b,CY:T,CZ:A,FX:O,FZ:P,RX:ne,RZ:ie,SYC:Z}=l,f=vo(e,l===U?1:0),m=f.p,te=t.home?"Warm halogen":de(s,[["Warm halogen",46],["Cold LED",28],["Warm and cold",16],["Sodium",6],["Sea green",4]]),J=t.home?"Far wall":de(s,[["Floor and side",40],["Both sides",26],["Far wall",24],["One floor lamp",10]]),v=t.home?"Mosaic":de(s,[["Mosaic",34],["White plaster",34],["Terrazzo",20],["Black stone",12]]),p=t.home?"Board concrete":de(s,[["Board concrete",44],["Limewash",28],["Old brick",20],["Rusted steel",8]]),q={"Board concrete":0,Limewash:1,"Old brick":2,"Rusted steel":3}[p],g=t.home?"Olive":de(s,[["Olive",30],["Myrtle",26],["Laurel",20],["Bamboo",18],["Bare branches",6]]),z=t.home?"Breeze":de(s,[["Light air",46],["Dead calm",20],["Breeze",28],["Squalls",6]]),G=t.home?3:de(s,[[0,40],[3,30],[8,20],[30,10]]),N=de(s,[["Moonless",60],["Thin cloud",30],["Moonlit",10]]);t.trait("Lamps",te),t.trait("Lamp places",J),t.trait("Basin",v),t.trait("Walls",p),t.trait("Tree",g),t.trait("Wind",z);const Y=d(),W=d(),ae=d(),he=!t.home&&Y<.3;t.trait("Stones on the bottom",(G===0?"None":G===3?"A few":G===8?"A handful":"Years of them")+(he?", one going in":"")),t.trait("Night",N),t.trait("View",M);const D={w:[1,.84,.58],c:[.6,.88,1],s:[1,.66,.26],g:[.5,1,.72]},H=te==="Warm halogen"?D.w:te==="Cold LED"?D.c:te==="Warm and cold"?D.w:te==="Sodium"?D.s:D.g,I=te==="Warm and cold"?D.c:H,oe=7.5+s()*1.5,Ee=()=>-(.95+s()*.22),Me=o=>[ye+.02,Ee(),o,1,0],mo=o=>[o,Ee(),we+.02,0,1],xo=l===Vt||l===ut||l===Zt,Be=(o,n)=>{const a=uo(o,0,n,l);return xo&&(a[0]=Math.max(ye+.5,Math.min(it-.5,a[0])),a[2]=Math.max(we+.5,Math.min(lt-.7,a[2]))),[a[0],-Ot+.03,a[2],0,0]},mt=J==="Floor and side"?[Be(-.55+s()*.8,3.9+s()*.7),Me(-.9+s()*1.1)]:J==="Both sides"?[Me(-1.1+s()*.8),Be(.3+s()*.55,3.7+s()*.6)]:J==="Far wall"?[Be(-.5+s()*.4,4.1+s()*.5),mo(-1.5+s()*1)]:[Be(-.45+s()*.7,4+s()*.6),Be(0,4)],Pe=J==="One floor lamp",u=new Float32Array(31*4),R=(o,n,a,r,c)=>{u[o*4]=n,u[o*4+1]=a,u[o*4+2]=r,u[o*4+3]=c};R(26,b,T,A,Z),R(27,O,0,P,l.SMY),R(28,ne,0,ie,l.SMC),mt.forEach((o,n)=>{R(3+n,o[0],o[1],o[2],-o[1]*Math.tan(Math.asin(1/1.333))*1.05);const a=o[3]||o[4]?.22:1,r=Math.hypot(o[3],a,o[4]);R(6+n,o[3]/r,a/r,o[4]/r,0)});const oa=o=>{const n=O+ne*o*C,a=P+ie*o*C,r=n<0?(ye-b)/n:1e5,c=a<0?(we-A)/a:1e5,x=Math.min(r,c);return[b+n*x,A+a*x]},sa=l===vt?[.6,-1.8]:oa(1.25),na=l===vt?[-2.4,-.9]:oa(-1.25),ra=o=>{const n=Math.atan2(sa[1]-o[2],sa[0]-o[0]),a=Math.atan2(na[1]-o[2],na[0]-o[0]),r=Math.atan2(Math.sin(n)+Math.sin(a),Math.cos(n)+Math.cos(a)),c=Math.abs(Math.atan2(Math.sin(n-a),Math.cos(n-a)))/2+.4;return[r-c,r+c]},ca=ra(mt[0]),ia=ra(mt[1]);R(5,ca[0],ca[1],ia[0],ia[1]);const Re=Pe?0:oe*(J==="Far wall"?.7:1);R(8,H[0]*oe,H[1]*oe,H[2]*oe,0),R(9,I[0]*Re,I[1]*Re,I[2]*Re,0);const la=o=>[.42,.075,.028].map(n=>Math.exp(-n*(o===D.w?.72:2.2))),Ze=2.7,xt=la(H),pt=la(I),yt=H===D.w?Ze*.9:Ze,wt=I===D.w?Ze*.9:Ze;R(17,H[0]*oe*xt[0]*yt,H[1]*oe*xt[1]*yt,H[2]*oe*xt[2]*yt*(H===D.w?.8:1),H===D.w?.85:0),R(18,I[0]*Re*pt[0]*wt,I[1]*Re*pt[1]*wt,I[2]*Re*pt[2]*wt*(I===D.w?.8:1),0);const bt=v==="Mosaic"?-1:v==="White plaster"?0:v==="Black stone"?2:3,Tt=q+4*(bt+1),gt={Mosaic:1,"White plaster":0,"Black stone":2,Terrazzo:3}[v];f.wall[Tt]||(f.wall[Tt]=Ve(e,f,{wall:[$,Qt.replace("#define WT 0","#define WT "+q+(bt>=0?L+"#define BB "+bt:""))]}).wall);const zt=gt+(l===U?4:0);f.alb[zt]||(f.alb[zt]=Ve(e,f,{alb:[$,Yt.replace("#define BT 1","#define BT "+gt+(l===U?L+"#define DV 1":""))]}).alb);const je=l===U?1:0;f.water[je]||(f.water[je]=Ve(e,f,{water:[$,aa(je)]}).water);const po=f.water[je],fa=1.26+s()*.22;R(12,gt,q,0,fa);const At=g==="Olive"?[.2,.25,.15]:g==="Myrtle"?[.12,.19,.075]:g==="Bamboo"?[.2,.28,.09]:[.085,.16,.065];R(13,At[0],At[1],At[2],l===U?.16:.13*.08);const yo=N==="Moonless"?.7:N==="Thin cloud"?1.15:2.6,wo=d(),bo=d();R(29,l===U?1/3:.5,...N==="Moonless"?[.018,.024,.042]:N==="Thin cloud"?[.052,.054,.066]:[.06,.08,.118]),R(25,-.7+1.4*wo,.78+.14*bo,N==="Moonlit"?1:0,N==="Moonless"?1:N==="Thin cloud"?0:.25);const Et=(v==="Black stone"?.35:1)*.05,Mt=[0,1,2].map(o=>(H[o]+I[o])*.5);R(14,Mt[0]*.25*Et,Mt[1]*.75*Et,Mt[2]*.85*Et,0),R(10,.52,0,0,yo);const Pt=s()<.6?[.08,.25,.32]:s()<.6?[.36,.42,.42]:[.07,.13,.21];R(11,Pt[0],Pt[1],Pt[2],(v==="Black stone"?.002:.0032)*(l===U?1:.5));const Ge=l===U?.04:.007,va=l===U?9:24,ua=l===U?.3:.22;if(R(15,ua,va,Ge,2*C/i),R(16,Pe?0:ua,va,Pe?0:Ge,Math.min(1,.55+.45*i/1e3)),l===U){const o={"White plaster":.35,Mosaic:.22,Terrazzo:.26,"Black stone":.08}[v];u[47]*=o,u[60]=.08*o,u[61]=40,u[62]=Ge*o,u[64]=Pe?0:.08*o,u[65]=40,u[66]=Pe?0:Ge*o,u[121]=.025,u[122]=.02,u[123]=Math.sqrt(.08/o)}const Ye={"Dead calm":.32,"Light air":.9,Breeze:1.15,Squalls:2.6}[z];R(0,0,Ae,s(),s()),R(1,Ye*.62,Math.sqrt(Ye)*1.25,Ye,0),u[27]=l.FOC,u[31]=l.AOF,u[35]=l.ASP,u[39]=.5,u[59]=0,u[75]=.018,u[120]=1,l===U&&(u[39]=.22,u[59]=1.6,u[75]=.25,u[120]=.15),l===ut&&(u[121]=6);const Ke=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,Ke),e.bufferData(e.UNIFORM_BUFFER,u,e.DYNAMIC_DRAW);const Rt=()=>{e.bindBufferBase(e.UNIFORM_BUFFER,0,Ke),e.bufferSubData(e.UNIFORM_BUFFER,0,u)};Rt();const Qe=i>=600,Se=l===U?Qe?2048:1024:Qe?768:512,Xe=F(e,Se,Se,e.RGBA8,e.LINEAR,!0),St=f.float?e.RGBA16F:e.RGBA8,Lt=f.float?e.RGBA16F:e.SRGB8_ALPHA8,$e=F(e,Qe?256:128,Qe?256:128,Lt,e.LINEAR),da=F(e,i,i,e.RGBA8,e.LINEAR),Nt=F(e,i,i,e.RGBA8,e.LINEAR),ha=F(e,ke,De,e.RGBA8,e.NEAREST),ma=F(e,ke,De,e.RGBA8,e.LINEAR),xa=F(e,ke,De,e.RGBA8,e.LINEAR),pa=F(e,ke,De,Lt,e.LINEAR),Je=Math.min(i,l===U?900:600),Ft=F(e,Je,Je,Lt,e.LINEAR,!0),Le=f.float?e.RG16F:e.SRGB8_ALPHA8,Ne=F(e,ve,ue,Le,e.LINEAR),et=F(e,ze,ze,Le,e.LINEAR),tt=F(e,ve>>2,ue>>2,Le,e.LINEAR),at=F(e,ve>>2,ue>>2,Le,e.LINEAR);f.atTemp||(f.atTemp=F(e,ve,ue,Le,e.LINEAR),f.bTemp=F(e,ze,ze,Le,e.LINEAR));const To=F(e,se,fe,St,e.LINEAR),go=F(e,se,fe,St,e.LINEAR);let Fe=To,Ue=go;e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!0);const w=(o,n)=>{e.activeTexture(e.TEXTURE0+o),e.bindTexture(e.TEXTURE_2D,n)},K=(o,n,a)=>{e.bindFramebuffer(e.FRAMEBUFFER,o),e.viewport(0,0,n,a)},re=()=>{e.bindVertexArray(f.emptyVao),e.drawArrays(e.TRIANGLES,0,3)};w(1,f.noise),e.useProgram(f.alb[zt].p),K(Xe.fb,Se,Se),re(),e.useProgram(m.lit.p),K($e.fb,$e.w,$e.h),re();const ya=(o,n,a,r)=>{K(Xe.fb,Se,Se),e.useProgram(m.stamp.p),e.uniform4f(m.stamp.uP,o,n,a,r),e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),w(1,f.noise),e.bindVertexArray(f.emptyVao),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.disable(e.BLEND)};w(7,null);for(let o=0;o<G;o++)ya(ye+.3+s()*4.9,we+.25+s()*3.2,.035+s()*s()*.065,s());w(7,Xe.t),e.generateMipmap(e.TEXTURE_2D);const wa=(o,n,a,r)=>{const c=n.w,x=n.h,_=2*C*l.FOC/c,k=F(e,c,x,St,e.NEAREST),B=f.wall[Tt];K(k.fb,c,x),e.useProgram(B.p),e.uniform4f(B.uM,0,r,_,2/c),re(),w(14,k.t),[o,n,a].forEach((X,S)=>{X&&(K(X.fb,c,x),e.useProgram(m.scene.p),e.uniform4f(m.scene.uM,S,r,_,2/c),e.uniform4f(m.scene.uP,2/c,2/x,c,x),re())}),w(14,null),e.deleteFramebuffer(k.fb),e.deleteTexture(k.t)};wa(null,da,Nt,0),wa(ha,ma,xa,1);const zo=ho(s,g==="Bare branches"?"bare":g.toLowerCase(),fa,l),ba=e.createVertexArray(),Ta=e.createBuffer(),Ao=(o,n)=>{e.bindVertexArray(ba),e.bindBuffer(e.ARRAY_BUFFER,Ta),e.bufferData(e.ARRAY_BUFFER,o,e.STATIC_DRAW);for(let a=0;a<3;a++)e.enableVertexAttribArray(a),e.vertexAttribPointer(a,4,e.FLOAT,!1,48,a*16),e.vertexAttribDivisor(a,1);e.useProgram(m.splat.p),e.uniform4f(m.splat.uM,n,0,0,0),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,o.length/12)};e.enable(e.BLEND),e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA),e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),K(Nt.fb,i,i),Ao(zo.far,1),e.disable(e.BLEND),e.bindVertexArray(null),e.deleteBuffer(Ta),e.deleteVertexArray(ba),u[7]=-1,Rt(),w(0,Ue.t),e.useProgram(m.sim.p),K(Fe.fb,se,fe),re(),u[7]=0,K(Ue.fb,se,fe),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);const ga=72,ce=new Float32Array(ga*8),za=e.createVertexArray(),Aa=e.createBuffer();e.bindVertexArray(za),e.bindBuffer(e.ARRAY_BUFFER,Aa),e.bufferData(e.ARRAY_BUFFER,ce.byteLength,e.DYNAMIC_DRAW);for(let o=0;o<2;o++)e.enableVertexAttribArray(o),e.vertexAttribPointer(o,4,e.FLOAT,!1,32,o*16),e.vertexAttribDivisor(o,1);e.bindVertexArray(null);const be=[],me=[],xe=[],ot=[],Te=[],Oe=[],y=ht("0x"+t.hash.slice(10)+"00000000"),We=(o,n)=>{const a=o*2-1,r=1-n*2,c=Z+r*C,x=O+ne*a*C,_=P+ie*a*C,k=x<0?(ye-b)/x:1e5,B=_<0?(we-A)/_:1e5,X=Math.min(k,B),S=c<-.001?T/-c:1e5,ge=Math.min(S,X);return[Math.max(ye+.14,Math.min(it-.14,b+x*ge)),Math.max(we+.14,Math.min(lt-.14,A+_*ge))]},qe=(o,n,a,r)=>{Oe.length<24&&Oe.push(o,n,a,r)},pe=o=>Math.max(-1,Math.min(1,(o-.4)/3)),qt=l===U,_t=(o,n)=>{const a=.02+.02*y()*y(),r=.29+.06*y(),c=Math.max((o-b)*O+(n-A)*P,.5),x=Math.max(T+c*(Z+C),.3),_=ft*Math.abs(1/c-1/l.FOC)*c*C;let k=x+.05,B=0;for(let X=0;X<3;X++)B=(k-4.905*r*r)/r,k=x+1.4*(Math.hypot(a,_)+(B+9.81/30)/60)+.02;B=(k-4.905*r*r)/r,be.push({x:o,z:n,y:k,vy:-B,r:a,s:y(),wet:!1})},Eo=()=>{let o=0;const n=(a,r,c,x,_,k,B,X)=>{if(o>=ga)return;const S=o*8;ce[S]=a,ce[S+1]=r,ce[S+2]=c,ce[S+3]=x,ce[S+4]=_,ce[S+5]=k,ce[S+6]=B,ce[S+7]=X,o++};if(qt)for(const a of xe)n(a.x,a.y,a.z,a.r,2,0,0,a.s);for(const a of Te)n(a.x,a.r*.25,a.z,a.r*1.5,3,0,0,a.t/a.life);for(const a of be){if(a.wet){qt&&n(a.x,a.y,a.z,a.r*.95,0,0,0,a.s);continue}const r=(a.x-b)*O+(a.z-A)*P,c=1/(r*C);n(a.x,a.y,a.z,a.r,0,0,a.vy*c*(1/30)*.5/Math.max(a.r*c,1e-4)-1e-4,a.s)}for(const a of me){const r=(a.x-b)*O+(a.z-A)*P,c=1/(r*C),x=Ae*.55/Math.max(a.r*c,1e-4)*c;n(a.x,a.y,a.z,a.r,1,(a.vx*ne+a.vz*ie)*x,a.vy*x+1e-4,0)}return o},Mo=o=>{for(let n=be.length-1;n>=0;n--){const a=be[n];if(a.wet){const r=-(.75+2.2*a.r);a.vy+=(r-a.vy)*Math.min(1,o*4.5),a.y+=a.vy*o,a.x+=Math.sin(a.y*7+a.s*30)*o*.03,a.z+=Math.cos(a.y*5+a.s*20)*o*.03,a.y<=-Ot+a.r*.7&&(ya(a.x,a.z,a.r,a.s),w(7,Xe.t),e.generateMipmap(e.TEXTURE_2D),t.sound.hit("click",.12,{pan:pe(a.x)}),be.splice(n,1))}else if(a.vy-=9.81*o,a.y+=a.vy*o,a.y<=0){a.wet=!0,a.y=-.01;const r=1,c=Math.min(1.4,Math.sqrt(a.r/.03)),x=.55,_=1.5;qe(a.x,a.z,-2*x,.11+.05*r),qe(a.x,a.z,-1.25*_,.2+.07*r),ot.push({t:.1,x:a.x,z:a.z,a:2.3*x,r:.1+.05*r},{t:.2,x:a.x,z:a.z,a:1*_,r:.22+.07*r},{t:.3,x:a.x,z:a.z,a:-1.6*x,r:.12+.05*r},{t:.46,x:a.x,z:a.z,a:-.7*_,r:.24+.07*r});const k=10+Math.floor(y()*12*c);for(let S=0;S<k&&me.length<40;S++){const ge=y()*6.283,Fa=(.45+y()*1.2)*c,Po=(1.1+y()*2.1)*c,qa=.045+y()*.09;me.push({x:a.x+Math.cos(ge)*qa,y:.012,z:a.z+Math.sin(ge)*qa,vx:Math.cos(ge)*Fa,vy:Po,vz:Math.sin(ge)*Fa,r:.0075+y()*.0095})}const B=6+Math.floor(y()*8);for(let S=0;S<B&&xe.length<28;S++)xe.push({x:a.x+(y()-.5)*.09,y:-.05-y()*.32,z:a.z+(y()-.5)*.09,r:.006+y()*y()*.017,s:y()*6.28,w:.6+y()*.9});t.sound.hit("noise",.34+.3*c,{cutoff:2100,dur:.22,pan:pe(a.x)}),t.sound.hit("kick",.28*c,{pan:pe(a.x)});const X=70+y()*9-8*a.r/.03;t.sound.note(X,{wave:"sine",dur:.11,vel:.26,pan:pe(a.x)}),t.sound.note(X+5,{wave:"sine",dur:.09,vel:.2,at:.07,pan:pe(a.x)}),t.sound.note(X+9,{wave:"sine",dur:.1,vel:.13,at:.14,pan:pe(a.x)})}}for(let n=me.length-1;n>=0;n--){const a=me[n];a.vy-=9.81*o,a.x+=a.vx*o,a.y+=a.vy*o,a.z+=a.vz*o,a.y<=0&&(a.x>ye&&a.x<it&&a.z>we&&a.z<lt&&(qe(a.x,a.z,-.55*Math.min(1,a.r/.012),.03),t.sound.hit("click",.05,{pan:pe(a.x)})),me.splice(n,1))}for(let n=xe.length-1;n>=0;n--){const a=xe[n];a.y+=(.14+9*a.r)*o*a.w*1.8,a.x+=Math.sin(a.y*30+a.s)*o*.045,a.z+=Math.cos(a.y*26+a.s)*o*.045,a.y>-.01&&(qe(a.x,a.z,-.1,.025),xe.splice(n,1),qt||Te.push({x:a.x,z:a.z,r:a.r,s:a.s,t:0,life:.18+.05*(a.s%4)}))}for(let n=Te.length-1;n>=0;n--){const a=Te[n];a.t+=o,a.t>=a.life&&Te.splice(n,1)}};let kt=0,Ea=0,st=0;const Ma=()=>{Ea+=Ae,u[0]=Ea,u[1]=Ae,u[8]=y(),u[9]=y(),u[10]=y(),u[11]=y();const o=Math.min(6,Oe.length/4);u[7]=o;for(let a=0;a<o*4;a++)u[19*4+a]=Oe[a];Oe.splice(0,o*4),Rt();const n=Ue;Ue=Fe,Fe=n,e.useProgram(m.sim.p),K(Fe.fb,se,fe),w(0,Ue.t),w(1,f.noise),re()},Pa=()=>{e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),w(0,Fe.t);const o=(a,r,c,x)=>{K(r.fb,r.w,r.h),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(a.p),e.uniform2f(a.uK,r.w*r.h/4,x),e.bindVertexArray(c.vao),e.colorMask(!0,!1,!1,!1),e.uniform1i(a.uL,0),e.drawElements(e.TRIANGLES,c.n,e.UNSIGNED_SHORT,0),Pe||(e.colorMask(!1,!0,!1,!1),e.uniform1i(a.uL,1),e.drawElements(e.TRIANGLES,c.n,e.UNSIGNED_SHORT,0))};o(m.up,Ne,f.fine,45),o(m.dn,et,f.coarse,500),e.colorMask(!0,!0,!0,!0),e.disable(e.BLEND);const n=(a,r,c,x)=>{K(r.fb,r.w,r.h),w(2,a.t),e.uniform4f(m.blur.uP,c,x,0,0),re(),w(2,null)};e.useProgram(m.blur.p),n(Ne,f.atTemp,.85/ve,0),n(f.atTemp,Ne,0,.85/ue),n(et,f.bTemp,1.4/ze,0),n(f.bTemp,et,0,1.4/ze),n(Ne,at,1.2/ve,1.2/ue),n(at,tt,1.2/tt.w,0),n(tt,at,0,1.2/tt.h)},Ra=e.getExtension("KHR_parallel_shader_compile"),Sa=o=>{m.part||!f.partMade&&(f.partMade=ea(e,f,{part:f.src.part}),!o)||(o||!Ra||e.getProgramParameter(f.partMade.part.p,Ra.COMPLETION_STATUS_KHR))&&(m.part=ta(e,f.partMade).part,f.partMade=null)};let nt=0;const La=()=>{w(2,Ne.t),w(10,at.t),e.useProgram(m.mir.p),K(pa.fb,ke,De),w(4,ha.t),w(5,ma.t),w(6,xa.t),re(),e.useProgram(po.p),K(Ft.fb,Je,Je),w(0,Fe.t),w(3,et.t),w(7,Xe.t),w(8,$e.t),w(9,pa.t),w(15,f.rip.t),re(),w(13,Ft.t),e.generateMipmap(e.TEXTURE_2D),w(2,Ne.t),e.useProgram(m.comp.p),K(null,i,i),w(1,f.noise),w(5,da.t),w(6,Nt.t),w(13,Ft.t),re();const o=be.length||me.length||xe.length||Te.length?Eo():0;o&&(e.bindBuffer(e.ARRAY_BUFFER,Aa),e.bufferSubData(e.ARRAY_BUFFER,0,ce,0,o*8),m.part||Sa(!0),e.useProgram(m.part.p),e.enable(e.BLEND),e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.bindVertexArray(za),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,o),e.disable(e.BLEND)),e.bindVertexArray(null)};e.bindBufferBase(e.UNIFORM_BUFFER,0,Ke),Ma(),Pa(),La();const le=t.input;let j=null,rt=0,ct=0,Na=!1,Dt=!1,It=0,Ct=1+s()*3,Bt=he?2.2+.4*ae:1e9;return(o,n)=>{n=Math.min(n,.12);const a=le.taps();for(const r of a){if(j){const c=We(j.x,j.y);_t(c[0],c[1])}j={x:r.x,y:r.y,born:o},rt=r.x,ct=r.y,Dt=!1}if(le.down){const r=Math.hypot(le.x-(j?j.x:rt),le.y-(j?j.y:ct));if(j&&r>.018&&(j=null,Dt=!0),Dt||!j&&Na){const c=We(rt,ct),x=We(le.x,le.y),_=Math.hypot(x[0]-c[0],x[1]-c[1]);if(_>.002){const k=Math.min(3.2,_/Math.max(n,.01)),B=Math.min(3,1+Math.floor(_/.1));for(let X=0;X<B;X++){const S=(X+1)/B;qe(c[0]+(x[0]-c[0])*S,c[1]+(x[1]-c[1])*S,-.42*Math.min(1.4,k)/B*1.6,.07)}It+=_,It>.55&&(It=0,t.sound.hit("noise",.1+.12*Math.min(1,k/2),{cutoff:900+k*500,dur:.25,pan:pe(x[0])}))}rt=le.x,ct=le.y}}else if(j){const r=We(j.x,j.y);_t(r[0],r[1]),j=null}if(Na=le.down,Bt-=n,Bt<=0){const r=We(.3+.4*W,.62+.12*ae);_t(r[0],r[1]),y(),Bt=1e9}e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),e.depthMask(!1),!m.part&&++nt>=4&&(nt===4||nt%8===0)&&Sa(nt>=60),e.bindBufferBase(e.UNIFORM_BUFFER,0,Ke),(be.length||me.length||xe.length||Te.length)&&Mo(n);for(let r=ot.length-1;r>=0;r--){const c=ot[r];c.t-=n,c.t<=0&&(qe(c.x,c.z,c.a,c.r),ot.splice(r,1))}for(Ct-=n,Ct<0&&(Ct=.9+y()*4.6,t.sound.hit("noise",.03+.05*Ye*y(),{cutoff:380+y()*500,dur:.4+y()*.5,pan:y()*1.6-.8})),u[41]=y(),u[42]=y(),kt+=n,st=0;kt>=Ae&&st<4;)kt-=Ae,Ma(),st++;st?Pa():e.bufferSubData(e.UNIFORM_BUFFER,0,u),La()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
