// Sand Circle: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/162.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ta){Ta&&function(){"use strict";const Ea=new WeakMap,ce=[],ma=`#version 300 es
out vec2 vP;
void main(){ vec2 a=vec2(float((gl_VertexID&1)<<2)-1.,float((gl_VertexID&2)<<1)-1.); vP=a; gl_Position=vec4(a,0.,1.); }`,Je=`#version 300 es
precision highp float;
precision highp sampler2D;
#define DEC(t) (dot((t).rg,vec2(63.7510,.249027))-32.)
#define HT(q) DEC(texture(uH,(q)/512.))
#define CAUO(v) sqrt(clamp((v)/.72,0.,1.))
// caustic intensity, gently compressed: the dim cells near 1, lines 2 to 3, knots a little more
#define CAUI(t) ((t).r<.94?(t).r*8.33:(t).g*33.3)*1.4/(1.+.4*((t).r<.94?(t).r*8.33:(t).g*33.3))
`,da=`
vec3 tone(vec3 c){ c=c*(1.+c*.111)/(1.+c); return pow(clamp(c,0.,1.),vec3(.4545)); }
`,oo=`#version 300 es
uniform vec4 uW[9]; uniform int uK; uniform float uG; out vec2 vO;
void main(){
  float g=float(gl_VertexID),r=uG+1.;
  float iy=floor(g/r),ix=g-iy*r;
  vec2 x=vec2(ix,iy)/uG*1.2-.1;
  vec2 d=vec2(0.);
  for(int i=0;i<uK;i++){ d+=uW[i].xy*uW[i].z*cos(dot(uW[i].xy,x)+uW[i].w); }
  vO=x;
  gl_Position=vec4((x+d)*2.-1.,0.,1.);
}`,no=`#version 300 es
precision highp float;
in vec2 vO; out vec4 o; uniform float uE;
void main(){
  vec2 a=dFdx(vO),b=dFdy(vO);
  float I=abs(a.x*b.y-a.y*b.x)*${256*256}.;
  o=vec4(min(I,8.)*.12,min(I,uE)*.03,0.,0.);
}`,so=Je+`
uniform sampler2D uH; uniform vec4 uL; uniform int uN; out vec4 o;
void main(){
  vec2 p=gl_FragCoord.xy;
  float best=-40.,dist=0.;
  float k=1.;
  for(int i=0;i<uN;i++){
    float c=HT(p+uL.xy*k)-k*uL.z;
    if(c>best){best=c;dist=k;}
    k=k*1.09+1.;
  }
  if(dist>3.){
    float a=(dist-1.)/1.09,b=dist*1.09+1.;
    for(int i=0;i<4;i++){
      float m1=a+(b-a)*.35,m2=a+(b-a)*.65;
      float c1=HT(p+uL.xy*m1)-m1*uL.z,c2=HT(p+uL.xy*m2)-m2*uL.z;
      if(c1>c2){b=m2; if(c1>best){best=c1;dist=m1;}} else {a=m1; if(c2>best){best=c2;dist=m2;}}
    }
  }
  float a0=0.;
  for(int i=0;i<uN/3;i++){
    float an=float(i)*2.39996,rr=3.+float(i)*2.1;
    a0+=HT(p+vec2(cos(an),sin(an))*rr);
  }
  a0/=float(uN/3);
  float v=floor(clamp((best+40.)/80.,0.,1.)*65535.),hi=floor(v/256.);
  o=vec4(hi/255.,(v-hi*256.)/255.,clamp(dist/80.,0.,1.),clamp((a0+32.)/64.,0.,1.));
}`,ro=Je+`
in vec2 vP; out vec4 o;
uniform sampler2D uH,uS,uR,uG; uniform vec4 uP[12]; uniform int uI;
void main(){
  vec3 C=uP[0].xyz,L=uP[4].xyz;
  vec3 rd=normalize(uP[3].xyz+(uP[1].xyz*vP.x+uP[2].xyz*vP.y)*uP[0].w);
  float t=(uP[3].w-C.z)/rd.z,a=t;
  float kk=1./(abs(rd.z)+length(rd.xy)*1.05);
  vec3 p=C+rd*t;
  for(int i=0;i<uI;i++){
    p=C+rd*t;
    float dz=p.z-HT(p.xy);
    if(dz<.03) break;
    a=t;
    t+=max(dz*kk,.35);
  }
  float b=t;
  for(int i=0;i<3;i++){ float m=.5*(a+b); p=C+rd*m; if(p.z<HT(p.xy)) b=m; else a=m; }
  t=.5*(a+b); p=C+rd*t;
  vec2 q=p.xy;
  bvec2 lo=lessThan(q,vec2(1.)),hi=greaterThan(q,vec2(511.));
  bool outside=any(lo)||any(hi);
  vec4 th=texture(uH,q/512.);
  vec4 nr=texture(uR,q/512.);
  float hl=HT(q-vec2(1.,0.)),hr=HT(q+vec2(1.,0.)),hd=HT(q-vec2(0.,1.)),hu=HT(q+vec2(0.,1.));
  vec3 n=vec3(hl-hr,hd-hu,2.);
  if(outside) n=vec3((.5-nr.gb)*6.375,2.);
  n=normalize(n);
  vec2 eg=min(q,512.-q);
  float edge=clamp(min(eg.x,eg.y)/36.,0.,1.);
  float F=mix(.5,th.b,edge),fr=outside?0.:th.a;
  vec4 s=texture(uS,q/512.);
  float Sz=dot(s.rg,vec2(79.688,.31129))-40.;
  float pen=.45+s.b*80.*uP[5].w;
  float vis=smoothstep(Sz-pen,Sz+pen*.45,p.z+.4);
  vis=mix(1.,vis,edge);
  // the open water above lights what the sun does not reach: less of it at the foot of a wall than on a valley floor
  float occ=max(s.a*64.-32.-p.z,0.);
  float sky=mix(1.,1./(1.+occ*.05),edge)*(.5+.5*n.z*n.z);
  // a rounded crest catches the light as a pale line (convex sand), a valley foot gathers a little shade
  float lap=(hl+hr+hd+hu-4.*DEC(th))*edge;
  // fine sand is smooth and pale; coarse sand is rough, darker and full of flecks
  vec4 g=textureLod(uG,q*uP[1].w,uP[2].w);
  vec4 g2=textureLod(uG,q*uP[1].w*.29+.37,uP[2].w);
  float cs=1.-F;
  vec2 gn=(g.rg-.5)*(.16+.24*cs)+(g2.rg-.5)*.12*cs;
  vec3 N=normalize(n+vec3(gn,0.));
  // the albedo as amounts of the two sand colours (coarse, fine), so the composite can light it from two sides
  float m=smoothstep(.12,.85,F+(nr.a-.5)*.45);
  float sp=uP[6].w;
  float bb=1.+(g.b-.5)*sp*(.4+.8*cs)+(g2.b-.5)*sp*cs*1.1;
  float id=mix(g.a,g2.a,cs*.6);
  bb*=1.-.6*smoothstep(.1,.03,id)*(.25+cs);
  vec2 k=vec2(1.-m,m)*bb;
  k.y+=.55*smoothstep(.93,.985,id)*(.15+cs);
  // fresh-cut sand is a shade paler and its grain shows more
  k*=(1.+.1*fr)*(.88+.24*nr.a)*mix(.84,1.,smoothstep(-9.,3.,p.z))*(1.+clamp(-lap*.35,-.12,.22));
  // what faces away from the sun is left to the water's blue
  float key=max(dot(N,L)-.12,0.)*1.14;
  key=key*(.92+.08*key)*vis;
  o=vec4(sqrt(clamp(k*.5,0.,1.)),sqrt(clamp(key/1.4,0.,1.)),sky);
}`,co=Je+da+`
in vec2 vP; out vec4 o;
uniform sampler2D uT,uH,uC; uniform vec4 uP[12]; uniform vec4 uTb,uCu;
void main(){
  vec4 T=texelFetch(uT,ivec2(gl_FragCoord.xy),0);
  vec3 rd=uP[3].xyz+(uP[1].xyz*vP.x+uP[2].xyz*vP.y)*uP[0].w;
  vec2 q=uP[0].xy-rd.xy*uP[0].z/rd.z;
  float h=HT(q);
  vec2 cq=(q+uP[4].xy*h/uP[4].w)/320.+.02*vec2(sin(q.y*.0093+1.),sin(q.x*.0107))+.009*vec2(sin(q.y*.0231+q.x*.008),sin(q.x*.0271-q.y*.011));
  float c1=CAUI(texture(uC,cq).rg),c2=CAUI(texture(uC,cq+vec2(.0011,.0007)).rg);
  vec3 ca=vec3(c1,.5*(c1+c2),c2);
  vec3 al=(uP[5].xyz*T.r*T.r+uP[6].xyz*T.g*T.g)*2.;
  float key=T.b*T.b*1.4;
  vec3 c=al*(uP[7].xyz*T.a*uCu.w+uP[8].xyz*key*(uP[7].w+uP[8].w*ca));
  float d=dot(q,uP[11].xy)-uP[11].z;
  float hx=max(d-uP[9].w,0.)/uP[10].w;
  float hz=1.-exp(-pow(hx,1.6));
  float shaft=CAUO(texture(uC,vec2(vP.x*.055+.3,vP.y*.006+.41)).r);
  vec3 w=mix(uP[9].xyz,uP[10].xyz,hz*(.5+.5*hz))*(1.+(shaft*shaft*6.-1.)*.07*hz);
  w*=1.-.28*smoothstep(.45,1.,vP.y);
  // the water between the lens and the sand: a thin veil near, deep blue at the far edge
  // red is lost first, so the far sand goes to the water's blue and keeps its blue-green light longest
  float veil=.03+.07*smoothstep(-260.,120.,d)+.84*hz;
  vec3 ve=1.-pow(vec3(1.-veil),vec3(1.3,1.,.78));
  c=mix(c,w*(1.+.1*ca.g*(1.-hz)),ve);
  // a surge: a low sheet of sand streaming along the bed in streaks, thickest in the troughs
  float sk=CAUO(texture(uC,vec2(dot(q,uCu.xy)*.0022-uCu.z,dot(q,vec2(-uCu.y,uCu.x))*.009+.3)).r);
  c=mix(c,uTb.xyz*(1.+.15*ca.g),min(.9,uTb.w*(.2+1.5*sk*sk)*(.55+.9*smoothstep(1.5,-2.5,h))));
  vec2 v=vP*vec2(.95,1.);
  c*=1.-.08*smoothstep(.75,1.7,dot(v,v))*(1.-hz);
  c=tone(c*uP[11].w);
  float n=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));
  o=vec4(c+(n-.5)/200.,1.);
}`,io=`#version 300 es
uniform vec4 uP[12]; uniform vec4 uA[3]; out vec2 vQ;
void main(){
  vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1));
  vec2 q=vec2(mix(uA[2].x,uA[2].y,c.x),(c.y*2.-1.)*uA[2].z);
  vQ=q;
  vec2 d=uA[1].xy,s=vec2(-d.y,d.x);
  vec3 w=vec3(uA[0].xy+(d*q.x+s*q.y)*uA[0].w,uA[0].z+q.x*uA[1].z*uA[0].w);
  vec3 v=w-uP[0].xyz;
  gl_Position=vec4(dot(v,uP[1].xyz)/uP[0].w,dot(v,uP[2].xyz)/uP[0].w,0.,dot(v,uP[3].xyz));
}`,lo=`#version 300 es
precision highp float;
in vec2 vQ; out vec4 o; uniform vec4 uF[6];
`+da+`
void main(){
  float x=vQ.x,g=uF[3].x;
  float tb=clamp((x+.62)/1.04,0.,1.),hx=max(x-.42,0.)/.6;
  float hw=x<.42?.062+(.31*g-.062)*(1.-pow(1.-tb,1.5)):.31*g*sqrt(max(1.-hx*hx,0.));
  if(uF[1].w>.5){
    // his soft shadow on the sand
    // a tight contact shadow where he presses on the sand, and a soft one round it
    float sw=hw+.03,sw2=hw+.12;
    float sh=(.6*exp(-vQ.y*vQ.y/(sw*sw)*2.2)*smoothstep(-.75,-.35,x)*(1.-smoothstep(.75,.98,x))+.4*exp(-vQ.y*vQ.y/(sw2*sw2)*1.2)*smoothstep(-1.,-.45,x)*(1.-smoothstep(.85,1.2,x)));
    o=vec4(uF[4].xyz*sh*.1,sh)*uF[3].w;
  }else{
    float y=vQ.y+uF[0].y*sin(uF[0].x+x*2.4)*(.9-x)*(.9-x)*.1;
    float ay=abs(y),aa=uF[5].x;
    float body=(1.-smoothstep(hw-aa,hw+aa,ay))*smoothstep(-.64-aa,-.6+aa,x);
    float ny=clamp(y/max(hw,.01),-1.,1.),nz=sqrt(max(1.-ny*ny,0.));
    vec3 Nn=normalize(vec3(hx*.7,ny*.85,nz+.2));
    // a fine dark network over the back, small pale spots in its cells, and broad darker blotches
    // (cells skewed and of two sizes, so the spots scatter instead of lining up in rows)
    vec2 sq=vec2(x*9.+y*3.1+.35*sin(y*13.+x*4.),y*10.5-x*2.3+.45*sin(x*11.))+uF[5].y;
    vec2 ip=floor(sq),fp=fract(sq)-.5;
    float hs=fract(sin(dot(ip,vec2(12.9898,78.233)))*43758.5453);
    float net=smoothstep(.3,.5,max(abs(fp.x),abs(fp.y))*.45+length(fp)*.55)*(.4+.6*fract(hs*7.3));
    float spot=(1.-smoothstep(.07,.17,length(fp-(vec2(fract(hs*17.13),fract(hs*41.7))-.5)*.55)))*step(.45,hs)*(.6+.4*fract(hs*3.7));
    float blotch=.5+.25*sin(x*7.3+y*5.1+uF[5].y)+.25*sin(y*12.-x*4.4+2.*uF[5].y);
    vec3 back=uF[2].xyz*(.5+.5*blotch)*(1.-.34*net)*(1.-.22*smoothstep(.2,.9,sin(x*8.2+1.3+ny*.8)));
    back=mix(back,vec3(.86,.84,.76),spot*uF[2].w*smoothstep(.25,.65,nz));
    vec3 col=mix(mix(back*1.3,vec3(.8,.79,.74),.45),back,smoothstep(.1,.45,nz));
    float lit=max(dot(Nn,uF[1].xyz),0.);
    vec3 sun=vec3(uF[3].y,uF[3].z,uF[4].w);
    vec3 c=col*(uF[4].xyz*(.8+.6*nz)+sun*lit*.9);
    // eyes, high on the head: dark, a faint glint
    vec2 ee=vec2(x-.62,ay-.17*g);
    float ed=length(ee);
    // eyes: small dark beads under a soft rim, a faint glint, never a hard black disc
    c=mix(c,c*.55,1.-smoothstep(.05,.085,ed));
    c=mix(c,c*.16+vec3(.012,.011,.01),1.-smoothstep(.022,.05,ed));
    c+=sun*.1*(1.-smoothstep(.006,.018,length(ee-uF[1].xy*vec2(.02,sign(y)*.02))));
    // pectoral fins beating too fast to see, and a small rounded tail
    vec2 pr=vec2((x-.3)/.12,(ay-.29*g)/(.1+.03*sin(uF[0].z)));
    float pm=exp(-dot(pr,pr)*1.6)*.2*uF[0].w;
    float tx=(-.58-x)/.33,tw=.05+.15*sqrt(clamp(tx,0.,1.));
    float tm=step(0.,tx)*(1.-smoothstep(.8,1.,tx+ay*ay/(tw*tw)*.18))*(1.-smoothstep(tw-aa,tw+aa,ay))*(.42+.08*sin(ay*60.));
    vec3 fc=vec3(.78,.74,.64)*(uF[4].xyz*1.5+sun*.6);
    float fa=max(pm,tm)*(1.-body);
    float a=body+fa;
    vec3 rc=mix(fc,c,body/max(a,.001));
    o=vec4(tone(rc*uF[5].z)*a,a);
  }
}`,uo=`#version 300 es
layout(location=0) in vec4 aA; layout(location=1) in vec4 aB;
uniform vec4 uP[12]; uniform sampler2D uS,uC;
out vec2 vQ; out vec4 vI; out vec3 vL;
void main(){
  vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;
  vec2 q=c*1.75; vQ=q;
  float cr=cos(aA.w),sr=sin(aA.w);
  vec2 l=vec2(cr*q.x-sr*q.y,sr*q.x+cr*q.y);
  vec3 w=vec3(aA.xy+l*aB.x,aA.z+l.y*aB.x*aB.w);
  vec3 v=w-uP[0].xyz;
  gl_Position=vec4(dot(v,uP[1].xyz)/uP[0].w,dot(v,uP[2].xyz)/uP[0].w,0.,dot(v,uP[3].xyz));
  vec4 s=texture(uS,aA.xy/512.);
  float Sz=dot(s.rg,vec2(79.688,.31129))-40.;
  float vis=smoothstep(Sz-.6,Sz+.4,aA.z+.6);
  float ca=texture(uC,aA.xy/320.).r*.139;
  vI=vec4(aB.y,aB.z,vis,uP[7].w+uP[8].w*ca*6.);
  vec2 ld=vec2(cr*uP[4].x+sr*uP[4].y,-sr*uP[4].x+cr*uP[4].y);
  vL=vec3(ld,uP[4].z);
}`,fo=Je+da+`
in vec2 vQ; in vec4 vI; in vec3 vL; out vec4 o; uniform vec4 uP[12];
float shape(vec2 q,float sd){
  float an=atan(q.y,q.x);
  float r0=.74+.18*sin(an*2.+sd*23.)+.13*sin(an*3.+sd*57.)+.07*sin(an*7.+sd*91.);
  return length(q)-r0;
}
void main(){
  float sd=vI.y;
  float d=shape(vQ,sd),ds=shape(vQ+vL.xy*.42,sd);
  float aa=.09;
  float m=1.-smoothstep(-aa,aa,d);
  float sh=(1.-smoothstep(-.35,.45,ds))*.62;
  // curved, ribbed surface
  vec2 rd=vec2(cos(sd*40.),sin(sd*40.));
  float u=dot(vQ,rd),v=dot(vQ,vec2(-rd.y,rd.x));
  float rib=sin((v/(1.25+u*.35))*11.+sd*9.);
  vec3 n=normalize(vec3(vQ*.75+vec2(-rd.y,rd.x)*rib*.32,1.));
  float nl=max(dot(n,vL),0.);
  float k=vI.x;
  // worn fragments: chalky off-white, dull rose coral tips, grey nacre with one small coloured glint
  vec3 pal=k<.5?vec3(.84,.79,.68):k<1.5?vec3(.74,.53,.5):vec3(.6,.61,.62);
  vec3 alb=pal*(.8+.2*rib)*(uP[6].x<.1?.5:1.);
  // half sunk: sand banked against one side
  float bank=smoothstep(-.4,-.02,d)*smoothstep(-.5,.7,dot(vQ,vec2(.6,.8)));
  alb=mix(alb,uP[6].xyz,bank*.85);
  float vis=vI.z,ca=vI.w;
  vec3 c=alb*(uP[7].xyz*1.6+uP[8].xyz*nl*vis*ca);
  vec3 hv=normalize(vL+vec3(0.,0.,1.));
  c+=uP[8].xyz*vis*ca*pow(max(dot(n,hv),0.),k>1.5?30.:40.)*(k>1.5?.5:.22)*(1.-bank);
  if(k>1.5) c+=uP[8].xyz*vis*.35*(1.-smoothstep(.0,.22,length(vQ-vec2(cos(sd*31.),sin(sd*31.))*.3)))*(.5+.5*cos(6.283*(u*.8+vec3(0.,.33,.67))));
  c=tone(c*(.5+.5*uP[11].w));
  float a=m+sh*(1.-m);
  o=vec4(c*m,a);
}`,ho=`#version 300 es
layout(location=0) in vec4 aA; layout(location=1) in float aB;
uniform vec4 uP[12]; uniform vec4 uD; uniform float uSz; out float vA;
void main(){
  vec3 w=aA.xyz;
  if(uD.w>.5){
    // snow drifts through a box above the sand and wraps
    w.xy=mod(w.xy+uD.xy+vec2(sin(uD.z*.21+w.z*.03),cos(uD.z*.17+w.x*.02))*8.,vec2(760.))-130.;
    w.z=mod(w.z-uD.z*1.5,520.)+6.;
  }
  vec3 v=w-uP[0].xyz;
  float wd=dot(v,uP[3].xyz);
  gl_Position=vec4(dot(v,uP[1].xyz)/uP[0].w,dot(v,uP[2].xyz)/uP[0].w,0.,wd);
  // a speck right at the lens would be a huge grey disc over the view: cap it and let it fade instead
  float ps=aA.w*uSz*900./max(wd,1.);
  gl_PointSize=clamp(ps,1.,60.*uSz);
  vA=aB*step(0.,wd)*min(1.,45.*uSz/ps);
}`,mo=`#version 300 es
precision highp float;
in float vA; out vec4 o; uniform vec4 uD; uniform vec3 uTint;
void main(){
  vec2 p=gl_PointCoord*2.-1.;
  float r=dot(p,p);
  float a=max(1.-r,0.); a*=a;
  o=vec4(uTint,1.)*a*vA;
}`;function vo(n,e,u){const f=.14285714285714285,d=511,M=u*512;let s=0;for(let x=-3;x<=3;x++)s+=n[M+(x<0?0:x)];for(let x=0;x<512;x++)e[M+x]=s*f,s+=n[M+(x+3+1>d?d:x+3+1)]-n[M+(x-3<0?0:x-3)]}function yo(n,e,u,m,f,d,M,s){const b=.14285714285714285,V=511,g=M*512,Nt=(M+3+1>V?V:M+3+1)*512,ut=(M-3<0?0:M-3)*512,pt=M-256;for(let E=0;E<512;E++){const D=g+E,U=d[E]*b;d[E]+=e[Nt+E]-e[ut+E];const z=E-256,T=m[D]>258.8?1:f[(z*z+pt*pt)*8+5];n[D]=s?T*u[D]+(1-T)*(U*.92+u[D]*.3):U}}function xo(n,e,u,m,f){const M=new Float64Array(512);for(let s=0;s<2;s++){for(let x=0;x<512;x++)vo(n,e,x);M.fill(0);for(let x=-3;x<=3;x++){const b=(x<0?0:x)*512;for(let V=0;V<512;V++)M[V]+=e[b+V]}for(let x=0;x<512;x++)yo(n,e,u,m,f,M,x,s===1)}}const ve=128;function Mo(n,e,u,m,f){const d=ve,M=d-1;let s=0;const x=u*d;for(let b=-m;b<=m;b++)s+=n[x+(b&M)];for(let b=0;b<d;b++)e[x+b]=s*f,s+=n[x+(b+m+1&M)]-n[x+(b-m&M)]}function po(n,e,u,m,f){const d=ve,M=d-1;let s=0;for(let x=-m;x<=m;x++)s+=n[(x&M)*d+u];for(let x=0;x<d;x++)e[x*d+u]=s*f,s+=n[(x+m+1&M)*d+u]-n[(x-m&M)*d+u]}function ye(n,e,u,m){const f=1/(2*u+1);for(let d=0;d<ve;d++)Mo(n,m,d,u,f);for(let d=0;d<ve;d++)po(m,e,d,u,f)}function wo(n,e,u){for(let m=0,f=ve*ve;m<f;m++){const d=(e[m]-u[m])*6;n[m]=d/(1+Math.abs(d))*1.2}}function Ao(n,e,u,m){for(let f=0;f<8;f++)ye(n,e,1,m),ye(e,e,1,m),ye(e,e,2,m),ye(n,u,3,m),ye(u,u,2,m),ye(u,u,2,m),wo(n,e,u);ye(n,n,1,m)}function bo(n,e,u){const m=u*512;for(let f=1;f<511;f++){const d=m+f;e[d]=(n[d]*4+n[d-1]+n[d+1]+n[d-512]+n[d+512])*.125}}function No(n,e,u){const m=u*512;for(let f=1;f<511;f++)n[m+f]=e[m+f]}function Sa(n,e,u,m){for(let f=u;f<=m;f++)bo(n,e,f);for(let f=u;f<=m;f++)No(n,e,f)}const ka=(n,e,u)=>{let m=(u-n)/(e-n);return m=m<0?0:m>1?1:m,m*m*(3-2*m)},Fo=(()=>{const n=new Int32Array(512),e=new Float64Array(512),u=new Int32Array(512),m=new Float64Array(512);for(let f=0;f<512;f++){const d=f/4,M=d|0,s=f/16,x=s|0;n[f]=M,e[f]=d-M,u[f]=x,m[f]=s-x}return{X2:n,TX2:e,X1:u,TX1:m}})();function Ro(n){va(n,257),va(n,1);for(let e=0;e<512;e++)e!==257&&e!==1&&va(n,e)}function va(n,e){const{RAD:u,ANG:m,rip:f,mi:d,lo:M,H:s,T:x,F:b,Fr:V,RL:g,jit:Nt,tDep:ut,hDep:pt,hA:E,hB:D,rOut:U,hat:z,mz:T,Q:_}=n,I=ka,{X2:ft,TX2:Lt,X1:ht,TX1:Tt}=Fo,ta=_[0],Ft=_[1],xe=_[2],Te=_[3],G=_[4],Rt=_[5],P=_[6],Ee=_[7],Se=_[8],Z=n.n,mt=2*Z,dt=-Z,Me=-mt,Wt=1024,qt=ve;{const te=e/16,j=te|0,vt=te-j,St=e/4,Yt=St|0,at=St-Yt;for(let Bt=0;Bt<512;Bt++){const lt=e*512+Bt,yt=u[lt],pe=ft[Bt],we=Lt[Bt],ke=Yt*129+pe,ie=(d[ke]*(1-we)+d[ke+1]*we)*(1-at)+(d[ke+129]*(1-we)+d[ke+130]*we)*at;if(yt>258.8){s[lt]=x[lt]=f[lt],b[lt]=.42+ie*.2;continue}const Qt=ht[Bt],ze=Tt[Bt],Ae=j*33+Qt,$=(M[Ae]*(1-ze)+M[Ae+1]*ze)*(1-vt)+(M[Ae+33]*(1-ze)+M[Ae+34]*ze)*vt,k=yt/205,be=Bt-256,Ve=e-256,ee=(be*be+Ve*Ve)*8;let et=(m[lt]-ta)*Ft+($-.5)*.2;if(et>=mt||et<=Me)et=(et%Z+Z)%Z;else{const st=et-Z,rt=et+Z;et=et>=Z?st:et<=dt?rt:et,et+=Z;const ct=et-Z;et=et>=Z?ct:et}const ya=Math.floor(et+.5);let ge=0,ea=0;if(k>.36)for(let st=-1;st<=1;st++){const rt=ya+st,ct=rt<0?rt+Z:rt>=Z?rt-Z:rt,fe=Math.abs(et-rt-Nt[ct])*2,gt=z[fe*256|0],_t=U[ct];let oe=k>_t-.07?1-I(_t-.07,_t+.02,k):1;if(ge+=gt*oe*ut[ct],pt[ct]>0){const At=E[ct],We=D[ct];ea+=z[Math.min(Wt,fe*xe*256|0)]*oe*pt[ct]*(k<=At?0:k>=We?1:I(At,We,k))}}const le=.265*3.14159*yt/Z*(.86+.28*ie)*Rt,aa=g[ee],xa=ge*le*aa,xt=ea*le*aa,Kt=g[ee+1]*(.75+.5*$),ae=g[ee+2]*(.8+.4*$),_e=g[ee+3];let Ie=0;if(_e>0){const st=(Bt-256+68+($-.5)*22)*.9,rt=(e-256+68+(ie-.5)*7+(M[Ae+34]-.5)*12)*.9;if(st>=0&&rt>=0&&st<qt-1&&rt<qt-1){const ct=st|0,fe=rt|0,gt=st-ct,_t=rt-fe,oe=fe*qt+ct;Ie=(T[oe]*(1-gt)+T[oe+1]*gt)*(1-_t)+(T[oe+qt]*(1-gt)+T[oe+qt+1]*gt)*_t}}const Ge=g[ee+4],A=Ie*1.35*_e+Ge,wt=g[ee+5],Mt=(ie-.5)*.7;x[lt]=wt*f[lt]+xa+ae+Kt+A+Mt*(1-wt);const ot=Math.max(wt,Te);s[lt]=ot*f[lt]+xt+ae*P+Kt*P+Ie*1.35*_e*Ee+Ge*P+Mt*(1-ot);const ue=-xt*20,X=ue<100?ue:100;V[lt]=xt<G?X:0;const kt=le>.01?Math.max(-1,Math.min(1,xt/le)):0,zt=g[ee+6]*Se;let Ot=.46-.3*kt+(ie-.5)*.28+($-.5)*.2;Ot=Ot+(.97-Ot)*zt,b[lt]=Math.max(.02,Math.min(1,Ot))}}}function Co(){const e=new Float64Array(536e3),u=Math.fround(.38),m=new Uint8Array(67e3);for(let f=0;f*f<67e3;f++)Po(e,m,f,u);return e}function Po(n,e,u,m){const f=ka,d=67e3;for(let M=0;M<=u;M++){const s=u*u+M*M;if(s>=d)break;if(e[s])continue;e[s]=1;const x=Math.fround(Math.sqrt(s))/205,b=(x-.37)/.038,V=(x-1.02)/.06,g=s*8;n[g]=f(.37,.5,x),n[g+1]=2.1*Math.exp(-b*b),n[g+2]=3.8*Math.exp(-V*V),n[g+3]=f(.355,.29,x),n[g+4]=-1.5*f(.42,.2,x)+.7*f(.16,0,x),n[g+5]=f(.98,1.2,x),n[g+6]=f(.43,.3,x),n[g+7]=f(m,m+.12,x)}}function To(n,e,u,m,f,d,M,s,x){for(let b=0;b<512;b++)Eo(n,e,u,m,f,d,M,s,x,b)}function Eo(n,e,u,m,f,d,M,s,x,b){const g=2*b,Nt=511-b,ut=2*b,pt=511+4*b,E=17*b,D=9*511+7*b,U=b,z=b*512;for(let T=0;T<512;T++){const _=1.05*u[T+g]+.9*m[2*T+Nt]+.55*f[3*T+ut]+.42*d[pt-T],ft=.5+.5*e[((M[4*T+E]+_*2.2)*512/6.283185307|0)&511],Lt=ft*ft*(1.6-.6*ft),ht=.24*e[((s[D-9*T]+_*1.1)*512/6.283185307|0)&511],Tt=.72+.28*e[((x[2*T+U]+_)*512/6.283185307|0)&511];n[z+T]=(Lt*2-.9+ht)*1.55*Tt}}function So(n,e,u,m){const f=new Int32Array(2048),d=new Float64Array(512*2);for(let M=0;M<512;M++){const s=M/128,x=s|0,b=s-x,V=M/32,g=V|0,Nt=V-g;f[M*4]=x%32,f[M*4+1]=(x+1)%32,f[M*4+2]=g%128,f[M*4+3]=(g+1)%128,d[M*2]=b*b*(3-2*b),d[M*2+1]=Nt}for(let M=0;M<512;M++)ko(n,e,u,m,f,d,M)}function ko(n,e,u,m,f,d,M){const s=M/128,x=s|0,b=s-x,V=M/32,g=V|0,Nt=V-g,ut=b*b*(3-2*b),pt=x*32%1024,E=(x+1)%32*32,D=g%128*128,U=(g+1)%128*128,z=M*512,T=(M+1&511)*512,_=(M-1&511)*512;for(let I=0;I<512;I++){const ft=z+I,Lt=ft*4,ht=I*4,Tt=I*2,ta=n[z+(I+1&511)]-n[z+(I-1&511)],Ft=n[T+I]-n[_+I],xe=f[ht],Te=f[ht+1],G=d[Tt],Rt=d[Tt+1],P=u[pt+xe],Ee=u[pt+Te],Se=u[E+xe],Z=u[E+Te],mt=(P*(1-G)+Ee*G)*(1-ut)+(Se*(1-G)+Z*G)*ut,dt=f[ht+2],Me=f[ht+3],Wt=m[D+dt],qt=m[D+Me],te=m[U+dt],j=m[U+Me],vt=(Wt*(1-Rt)+qt*Rt)*(1-Nt)+(te*(1-Rt)+j*Rt)*Nt;e[Lt]=128,e[Lt+1]=Math.max(0,Math.min(255,127.5+ta*40)),e[Lt+2]=Math.max(0,Math.min(255,127.5+Ft*40)),e[Lt+3]=(mt*.62+vt*.38)*255}}function zo(n,e){for(let u=0;u<=256;u++)go(n,e,u);for(let u=257;u<512;u++)_o(n,e,u)}function go(n,e,u){const m=u-256,f=u*512;for(let d=0;d<512;d++){const M=d-256;n[f+d]=Math.atan2(m,M),e[f+d]=Math.sqrt(M*M+m*m)}}function _o(n,e,u){const m=u*512,f=(2*256-u)*512;for(let d=0;d<512;d++)n[m+d]=-n[f+d],e[m+d]=e[f+d]}function Io(n,e){for(let u=0,m=n.length;u<m;u+=4){e^=e<<13,e^=e>>>17,e^=e<<5;const f=(e>>>0)/4294967296;e^=e<<13,e^=e>>>17,e^=e<<5;const d=(e>>>0)/4294967296;e^=e<<13,e^=e>>>17,e^=e<<5,n[u]=(e>>>0)/4294967296*255,e^=e<<13,e^=e>>>17,e^=e<<5,n[u+1]=(e>>>0)/4294967296*255,n[u+2]=(f*.6+d*.4)*255,e^=e<<13,e^=e>>>17,e^=e<<5,n[u+3]=(e>>>0)/4294967296*255}return e}function Pe(n,e,u,m,f,d,M){const s=n.createTexture();return n.bindTexture(n.TEXTURE_2D,s),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,M?n.LINEAR_MIPMAP_LINEAR:m),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,m),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,f),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,f),n.texImage2D(n.TEXTURE_2D,0,n.RGBA8,e,u,0,n.RGBA,n.UNSIGNED_BYTE,d||null),M&&n.generateMipmap(n.TEXTURE_2D),s}function Xo(n){let e=Ea.get(n);if(e)return e;e={};const u={cau:[oo,no],hor:[ma,so],shade:[ma,ro],comp:[ma,co],fish:[io,lo],shell:[uo,fo],pt:[ho.replace("${'SCALE'}","1."),mo]},m=[];for(const E in u){const D=n.createProgram();for(let U=0;U<2;U++){const z=n.createShader(U?n.FRAGMENT_SHADER:n.VERTEX_SHADER);n.shaderSource(z,u[E][U]),n.compileShader(z),n.attachShader(D,z)}n.linkProgram(D),m.push([E,D])}n.flush(),e.pend=m,e.ready=()=>{const E=e.pend;if(E){for(const[D,U]of E){if(!n.getProgramParameter(U,n.LINK_STATUS)){const _=n.getAttachedShaders(U);throw new Error("162 "+D+": "+n.getProgramInfoLog(U)+" "+n.getShaderInfoLog(_[0])+" "+n.getShaderInfoLog(_[1]))}const z={},T=n.getProgramParameter(U,n.ACTIVE_UNIFORMS);for(let _=0;_<T;_++){const I=n.getActiveUniform(U,_).name.replace("[0]","");z[I]=n.getUniformLocation(U,I)}e[D]={p:U,u:z}}e.pend=null}},e.vao=n.createVertexArray();const f=new Float32Array(512*512),d=6.283185307/512,M=new Uint8Array(512*512*4);let s=-1640531527;const x=()=>(s^=s<<13,s^=s>>>17,s^=s<<5,(s>>>0)/4294967296),b=new Float32Array(32*32);for(let E=0;E<1024;E++)b[E]=x();const V=new Float32Array(128*128);for(let E=0;E<16384;E++)V[E]=x();const g=new Float32Array(512);for(let E=0;E<512;E++)g[E]=Math.sin(E*d);const Nt=E=>g[(E*512/6.283185307|0)&511];{const D=(z,T,_)=>{const I=new Float32Array(T-z+1);for(let ft=z;ft<=T;ft++)I[ft-z]=Nt(d*ft+_);return I},U=(z,T)=>{const _=new Float64Array(T-z+1);for(let I=z;I<=T;I++)_[I-z]=d*I;return _};To(f,g,D(0,3*511,1),D(-511,2*511,2),D(0,5*511,4),D(-511,4*511,5),U(0,21*511),U(-9*511,7*511),U(0,3*511))}So(f,M,b,V),e.rip=f,e.ang=new Float32Array(512*512),e.rad=new Float32Array(512*512),zo(e.ang,e.rad),e.tR=Pe(n,512,512,n.LINEAR,n.REPEAT,M,!1);const ut=512,pt=new Uint8Array(ut*ut*4);s=Io(pt,s),e.tG=Pe(n,ut,ut,n.LINEAR,n.REPEAT,pt,!0),e.tC=Pe(n,256,256,n.LINEAR,n.REPEAT,null,!1),e.fC=n.createFramebuffer();{const D=new Uint16Array(24e4);for(let z=0,T=0;z<200;z++)for(let _=0;_<200;_++,T+=6){const I=z*201+_;D[T]=I,D[T+1]=I+1,D[T+2]=I+201,D[T+3]=I+201,D[T+4]=I+1,D[T+5]=I+201+1}e.cauVao=n.createVertexArray(),n.bindVertexArray(e.cauVao);const U=n.createBuffer();n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,U),n.bufferData(n.ELEMENT_ARRAY_BUFFER,D,n.STATIC_DRAW),n.bindVertexArray(null)}return n.bindFramebuffer(n.FRAMEBUFFER,e.fC),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e.tC,0),n.bindFramebuffer(n.FRAMEBUFFER,null),Ea.set(n,e),e}Ta.add({num:162,name:"Sand Circle",fam:"Worlds",recipe:"A tiny male pufferfish digs a round nest into the seabed while the current wears it down. How far along it is and the shells he decorates with change every mint, with a rare visiting female. Drag to cut a groove and he comes and repairs it, tap to drop a bit of shell and he sets it on a ridge, or hold for a current that smooths it out.",interactive:"Drag to cut a groove through the ridges: he comes over and repairs it, ridge by ridge. Tap to drop a shell fragment: he takes it and sets it on a ridge. Hold for a current surge: sand streams off the crests and they blur, and he works harder afterwards.",music:!0,gl:!0,fps:30,seed:0,make(n){const e=n.gl,u=n.size;let m=parseInt(n.hash.slice(2,10),16)|0,f=parseInt(n.hash.slice(10,18),16)|0,d=parseInt(n.hash.slice(18,26),16)|0,M=parseInt(n.hash.slice(26,34),16)|0;const s=()=>{m|=0,f|=0,d|=0,M|=0;const t=(m+f|0)+M|0;return M=M+1|0,m=f^f>>>9,f=d+(d<<3)|0,d=d<<21|d>>>11,d=d+t|0,(t>>>0)/4294967296};for(let t=0;t<40;t++)s();const x=t=>{let a=0;for(const r of t)a+=r[1];let o=s()*a,i=t[0][0];for(const r of t){if(o<r[1]){i=r[0];break}o-=r[1]}return i},b=n.home,V=x([["early spokes",28],["near complete",54],["finished, shell-decorated",18]]),g=x([["pale",50],["grey",38],["black volcanic",12]]),Nt=x([["clear blue",52],["soft green",36],["dusk",12]]),ut=x([["strong noon",55],["soft",45]]),pt=x([[20,32],[28,52],[40,16]]);x([["white spots",58],["dark saddles",32],["pale ghost",10]]);const E=x([["chalk cockle",60],["pink coral",30],["mother of pearl",10]]),D=x([["none",88],["a female visiting",12]]),U=b?"near complete":V,z=b?"pale":g,T=b?"clear blue":Nt,_=b?"strong noon":ut,I=b?28:pt,ft=b||z==="black volcanic"?"chalk cockle":E,Lt=b?"none":D;let ht=parseInt(n.hash.slice(34,42),16)^parseInt(n.hash.slice(50,58),16)^1540483477|1;const Tt=()=>(ht^=ht<<13,ht^=ht>>>17,ht^=ht<<5,(ht>>>0)/4294967296),Ft=b?"overhead":(t=>{let a=0;for(const r of t)a+=r[1];let o=Tt()*a,i=t[0][0];for(const r of t){if(o<r[1]){i=r[0];break}o-=r[1]}return i})([["overhead",35],["low and wide",30],["close on his run",27],["straight down",8]]),xe=!b&&Tt()<.5&&V==="near complete"&&ut==="soft",Te=xe?"old, worn by the current":U;n.trait("circle stage",Te),n.trait("sand",z),n.trait("water",T),n.trait("caustics",_),n.trait("ridges",String(I)),n.trait("shells",ft),n.trait("visitor",Lt),n.trait("view",Ft);const G=U==="early spokes"?0:U==="near complete"?1:2,Rt=_==="strong noon",P=Xo(e),Ee=s()*6.283185,Se=.86+s()*.04,Z=.265,mt=Math.sin(Ee),dt=Math.cos(Ee),Me=Ft==="low and wide"?.55+Tt()*.06:Ft==="straight down"?1.43:Ft==="close on his run"?Se+.1:Se,Wt=Ft==="low and wide"?960:Ft==="straight down"?860:Ft==="close on his run"?520+Tt()*60:905,qt=Math.cos(Me),te=Math.sin(Me),j=[mt*qt,dt*qt,-te],vt=[dt,-mt,0],St=[mt*te,dt*te,qt],Yt=Ft==="low and wide"?[256+mt*70,256+dt*70,0]:Ft==="straight down"?[256,256,0]:[256+mt*42,256+dt*42,0],at=[Yt[0]-j[0]*Wt,Yt[1]-j[1]*Wt,Wt*te],Bt=(s()<.5?2.42:.72)+(s()-.5)*.5,lt=b?2.3:Bt,yt=[vt[0]*Math.cos(lt)+mt*Math.sin(lt),vt[1]*Math.cos(lt)+dt*Math.sin(lt)],pe=Rt?.8:.72,we=Math.atan(pe),ke=Math.sin(we),ie=Math.cos(we),Qt=[yt[0]*ie,yt[1]*ie,ke],ze={pale:[[.45,.36,.235],[.77,.665,.485],.5],grey:[[.29,.28,.25],[.52,.5,.45],.55],"black volcanic":[[.028,.027,.03],[.068,.066,.072],.95]},Ae={"clear blue":{amb:[.07,.125,.2],sun:[1.4,1.42,1.28],near:[.11,.33,.52],deep:[.008,.075,.215]},"soft green":{amb:[.09,.145,.13],sun:[1.25,1.42,1.15],near:[.1,.34,.32],deep:[.01,.1,.1]},dusk:{amb:[.04,.05,.1],sun:[1.55,.85,.47],near:[.07,.09,.2],deep:[.006,.018,.07]}},$=ze[z],k=Ae[T],be=z==="black volcanic",Ve=1/(512*.62),ee=Math.max(0,Math.log2(1e3/u)),et=[mt,dt],ya=mt*256+dt*256,ge=be?1.5:T==="dusk"?1.2:1,ea=1.6,le=be?.42:1,aa=Rt?.4:.62,xa=Rt?.8:.4,xt=new Float32Array([at[0],at[1],at[2],Z,vt[0],vt[1],vt[2],Ve,St[0],St[1],St[2],ee,j[0],j[1],j[2],20,Qt[0],Qt[1],Qt[2],pe,$[0][0],$[0][1],$[0][2],Rt?.05:.09,$[1][0],$[1][1],$[1][2],$[2],k.amb[0],k.amb[1],k.amb[2],aa,k.sun[0],k.sun[1],k.sun[2],xa,k.near[0]*le,k.near[1]*le,k.near[2]*le,76,k.deep[0],k.deep[1],k.deep[2],165,et[0],et[1],ya,ge*.76]),Kt=8,ae=new Float32Array(Kt*4),_e=new Float32Array(Kt),Ie=new Float32Array(Kt);{const t=s()*6.283,a=Rt?2.15:1.55,o=[[7,2],[9,-3],[6,-5],[11,4],[13,-1],[10,7],[15,-6],[4,11]];let i=0;for(let r=0;r<Kt;r++){const c=Math.cos(t),l=Math.sin(t),v=Math.floor(t/1.5708)&3,y=o[r][0],h=o[r][1],w=v===0?y:v===1?-h:v===2?-y:h,C=v===0?h:v===1?y:v===2?-h:-y,N=6.283185*Math.hypot(w,C),F=1/Math.pow(Math.hypot(w,C),1.1)*(.8+s()*.4);ae[r*4]=6.283185*w,ae[r*4+1]=6.283185*C,ae[r*4+2]=F/(N*N),_e[r]=Math.sqrt(N/6.283185)*1.05*(r<6?1:-1)*(.95+s()*.1),Ie[r]=s()*6.283,i+=F}for(let r=0;r<Kt;r++)ae[r*4+2]*=a*2.05/i}const Ge=P.rip,A=new Float32Array(512*512),wt=new Float32Array(512*512),Mt=new Float32Array(512*512),ot=new Uint8Array(512*512),ue=new Uint8Array(512*512*4),X=I,kt=s()*6.283185,zt=X/6.283185307,Ot=new Float32Array(X),st=new Float32Array(X),rt=new Float32Array(X),ct=new Float32Array(X),fe=new Float32Array(X);let gt=-yt[1],_t=yt[0];gt*mt+_t*dt>0&&(gt=-gt,_t=-_t),gt-=mt*1.1,_t-=dt*1.1;const oe=Math.atan2(_t,gt),At=(Math.round((oe-kt)*zt)%X+X)%X;for(let t=0;t<X;t++){Ot[t]=(s()-.5)*.16,st[t]=.86+s()*.24,fe[t]=.94+s()*.07;const a=s(),o=s(),i=1-Math.min(Math.abs(t-At),X-Math.abs(t-At))/(X/2);rt[t]=G===2?st[t]:G===1?st[t]*(a<(b?.05:.14)?.42+o*.25:.82+o*.18):a<.3+.7*i*i?.9+o*.35:a<.45+.5*i?.35+o*.25:0,ct[t]=G===0?.3+o*.2:.38}if(Ot[At]=0,rt[At]=Math.max(rt[At],.98*st[At]),st[At]=Math.max(st[At],1),Ft==="close on his run"){const t=kt+At/zt,a=205*(.62+Tt()*.12);Yt[0]=256+Math.cos(t)*a,Yt[1]=256+Math.sin(t)*a,at[0]=Yt[0]-j[0]*Wt,at[1]=Yt[1]-j[1]*Wt,xt[0]=at[0],xt[1]=at[1],xt[7]=Ve*905/Wt,xt[46]=mt*Yt[0]+dt*Yt[1]-120}G===0&&(ct[At]=.34);const We=n.hash+(b?" home":""),Ct=ce.find(t=>t.key===We);let Ne,Fe;const It=(t,a)=>{t=t<0?0:t>512-1.001?512-1.001:t,a=a<0?0:a>512-1.001?512-1.001:a;const o=t|0,i=a|0,r=t-o,c=a-i,l=i*512+o;return(A[l]*(1-r)+A[l+1]*r)*(1-c)+(A[l+512]*(1-r)+A[l+512+1]*r)*c};if(Ct)ce[0]!==Ct&&(ce.splice(ce.indexOf(Ct),1),ce.unshift(Ct)),A.set(Ct.H),wt.set(Ct.T),Mt.set(Ct.F),ot.set(Ct.Fr),Ne=Ct.lo,Fe=Ct.mi,m=Ct.rs[0],f=Ct.rs[1],d=Ct.rs[2],M=Ct.rs[3];else{const a=new Float32Array(16384),o=P.ma||(P.ma=new Float32Array(128*128)),i=P.mb||(P.mb=new Float32Array(128*128)),r=P.mt||(P.mt=new Float32Array(128*128));for(let R=0;R<128*128;R++)a[R]=s()*2-1;Ao(a,o,i,r),Ne=new Float32Array(33*33),Fe=new Float32Array(129*129);for(let R=0;R<Ne.length;R++)Ne[R]=s();for(let R=0;R<Fe.length;R++)Fe[R]=s();const c=1024,l=new Float32Array(c+1);for(let R=0;R<=c;R++){const q=R/256;l[R]=q<1?-1+1.5*Math.pow(q,1.25):.5*Math.exp(-(q-1)*2.6)}const v=G===0?.36:G===1?.88:1,y=G===0?.08:G===1?.8:1,h=X===40?1.28:X===20?.86:1,w=P.rad,C=P.ang,N=P.rl||(P.rl=Co()),F=2*X,K=G===0?.35:G===1?.92:1,S=Math.fround(.38),H=ct.every(R=>R===S),J=new Float64Array(X),it=new Float64Array(X);for(let R=0;R<X;R++)J[R]=H?S:ct[R],it[R]=H?S+.12:ct[R]+.16;Ro({RAD:w,ANG:C,rip:Ge,mi:Fe,lo:Ne,H:A,T:wt,F:Mt,Fr:ot,RL:N,jit:Ot,tDep:st,hDep:rt,hA:J,hB:it,rOut:fe,hat:l,mz:a,n:X,Q:new Float64Array([kt,zt,G===0?1.5:1,G===0?.3:-1/0,G===0?-.8*.4:-1/0,h,v,y,K])});{const Y=P.mt2||(P.mt2=new Float32Array(262144));Sa(A,Y,1,510),Sa(wt,Y,1,510),xe&&xo(A,Y,Ge,w,P.rl)}const tt=(R,q,Y,Vt)=>{const Gt=Y*Y;for(let Ut=Math.max(1,q-Y|0);Ut<=Math.min(510,q+Y|0);Ut++)for(let me=Math.max(1,R-Y|0);me<=Math.min(510,R+Y|0);me++){const Ce=(me-R)*(me-R)+(Ut-q)*(Ut-q);if(Ce<Gt){const Pt=1-Ce/Gt;A[Ut*512+me]-=Vt*Pt*Pt}}};if(G===1)for(let R=0;R<7;R++){const q=205*(.5+s()*.42),Y=kt+(Math.floor(s()*X)+.5)/zt;tt(256+Math.cos(Y)*q,256+Math.sin(Y)*q,9+s()*7,2.5+s()*3)}const B=ce.length<2?{H:new Float32Array(512*512),T:new Float32Array(512*512),F:new Float32Array(512*512),Fr:new Uint8Array(512*512)}:ce.pop();B.H.set(A),B.T.set(wt),B.F.set(Mt),B.Fr.set(ot),B.key=We,B.lo=Ne,B.mi=Fe,B.rs=[m,f,d,M],ce.unshift(B)}const Xt=new Float32Array(150),Dt=new Float32Array(150),ne=new Float32Array(150),Ma=new Float32Array(150),za=new Float32Array(150),se=new Float32Array(150),oa=new Float32Array(150),re=new Uint8Array(150),Zt=new Float32Array(150*8),Do=ft==="chalk cockle"?0:ft==="pink coral"?1:2;let Ht=0,he=!0;const ga=(t,a)=>{const o=t-256,i=a-256,r=Math.hypot(o,i)||1,c=-i/r,l=o/r;let v=t,y=a,h=-99;for(let w=-14;w<=14;w+=2){const C=t+c*w,N=a+l*w,F=It(C,N);F>h&&(h=F,v=C,y=N)}return[v,y,h]},pa=(t,a,o,i)=>{let r=Ht;return Ht>=150?r=0:Ht++,Xt[r]=t,Dt[r]=a,ne[r]=o,Ma[r]=s()*6.283,za[r]=2.3+s()*s()*3.6,se[r]=s(),oa[r]=(s()-.5)*.7,re[r]=i,he=!0,r};{const t=G===2?2+(X<=28?1:0):0;let a=0;for(let o=0;o<X;o++){let i=t;G===1&&s()<.42&&(i=1);const r=Tt();a=r<.3?0:r<.55?Math.max(1,a):a+1;const c=G===2?Math.min(i,a===0?0:1+(r*7|0)%3):i;for(let l=0;l<i;l++){const v=kt+(o+.5+(Ot[o]+Ot[(o+1)%X])*.5+(s()-.5)*.06)/zt,y=s(),h=205*(.79+y*.17-l*.035),w=ga(256+Math.cos(v)*h,256+Math.sin(v)*h);pa(w[0],w[1],w[2]+.4,0),l>=c&&Ht--}}for(let o=0,i=G===2?3:6;o<i;o++){const r=s()*6.283,c=205*(.72+s()*.46),l=256+Math.cos(r)*c,v=256+Math.sin(r)*c;pa(l,v,It(l,v)+.2,1)}}const na=Pe(e,512,512,e.LINEAR,e.CLAMP_TO_EDGE,null,!1),wa=Pe(e,512,512,e.LINEAR,e.CLAMP_TO_EDGE,null,!1),_a=Pe(e,u,u,e.NEAREST,e.CLAMP_TO_EDGE,null,!1),Ia=e.createFramebuffer(),Xa=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,Ia),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,wa,0),e.bindFramebuffer(e.FRAMEBUFFER,Xa),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,_a,0),e.bindFramebuffer(e.FRAMEBUFFER,null);const Da=e.createBuffer(),Ua=e.createBuffer(),Uo=e.createBuffer(),La=e.createVertexArray(),qa=e.createVertexArray(),Ya=e.createVertexArray();e.bindVertexArray(La),e.bindBuffer(e.ARRAY_BUFFER,Da),e.bufferData(e.ARRAY_BUFFER,Zt,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(1,1);const Re=new Float32Array(420*5);e.bindVertexArray(qa),e.bindBuffer(e.ARRAY_BUFFER,Ua),e.bufferData(e.ARRAY_BUFFER,Re,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,20,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,1,e.FLOAT,!1,20,16);{const t=new Float32Array(320);for(let a=0;a<64;a++){const o=a<5;t[a*5]=s()*760,t[a*5+1]=s()*760,t[a*5+2]=o?380+s()*120:s()*400,t[a*5+3]=o?10+s()*10:1.4+s()*s()*3.4,t[a*5+4]=o?.035+s()*.03:.12+s()*.24}e.bindVertexArray(Ya),e.bindBuffer(e.ARRAY_BUFFER,Uo),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,20,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,1,e.FLOAT,!1,20,16)}e.bindVertexArray(null);const jt=(t,a,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,a),e.uniform1i(o,t)},Aa=()=>{e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.STENCIL_TEST),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(P.vao)},Lo=(t,a,o,i)=>{for(let r=a;r<=i;r++){let c=r*512+t,l=c*4;for(let v=t;v<=o;v++,c++,l+=4){let y=(A[c]+32)*1023.984;y=y<0?0:y>65535?65535:y|0,ue[l]=y>>8,ue[l+1]=y&255;const h=Mt[c];ue[l+2]=h<=0?0:h>=1?255:h*255,ue[l+3]=ot[c]}}e.bindTexture(e.TEXTURE_2D,na),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_ROW_LENGTH,512),e.pixelStorei(e.UNPACK_SKIP_ROWS,a),e.pixelStorei(e.UNPACK_SKIP_PIXELS,t),e.texSubImage2D(e.TEXTURE_2D,0,t,a,o-t+1,i-a+1,e.RGBA,e.UNSIGNED_BYTE,ue),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0)},Ba=30/pe,qo=(t,a,o)=>{const i=t-at[0],r=a-at[1],c=o-at[2],l=i*j[0]+r*j[1]+c*j[2];return(i*vt[0]+r*vt[1]+c*vt[2])/(l*Z)},Yo=(t,a,o)=>{const i=t-at[0],r=a-at[1],c=o-at[2],l=i*j[0]+r*j[1]+c*j[2];return(i*St[0]+r*St[1]+c*St[2])/(l*Z)},Oa=(t,a,o,i,r)=>{if(t=Math.max(0,t|0),a=Math.max(0,a|0),o=Math.min(511,o|0),i=Math.min(511,i|0),o<t||i<a)return;Lo(t,a,o,i);const c=yt[0]*Ba*Math.min(1,1),l=yt[1]*Ba,v=Math.max(0,Math.floor(t-22+Math.min(0,-c))),y=Math.min(511,Math.ceil(o+22+Math.max(0,-c))),h=Math.max(0,Math.floor(a-22+Math.min(0,-l))),w=Math.min(511,Math.ceil(i+22+Math.max(0,-l)));Aa(),e.enable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,Ia),e.viewport(0,0,512,512),e.scissor(v,h,y-v+1,w-h+1),e.useProgram(P.hor.p),jt(0,na,P.hor.u.uH),e.uniform4f(P.hor.u.uL,yt[0],yt[1],pe,0),e.uniform1i(P.hor.u.uN,19),e.drawArrays(e.TRIANGLES,0,3);let C=9,N=-9,F=9,K=-9;for(let tt=0;tt<8;tt++){const B=tt&1?y:v,R=tt&2?w:h,q=tt&4?20:-20,Y=qo(B,R,q),Vt=Yo(B,R,q);Y<C&&(C=Y),Y>N&&(N=Y),Vt<F&&(F=Vt),Vt>K&&(K=Vt)}const S=Math.max(0,Math.floor((C*.5+.5)*u)-2),H=Math.min(u,Math.ceil((N*.5+.5)*u)+2),J=Math.max(0,Math.floor((F*.5+.5)*u)-2),it=Math.min(u,Math.ceil((K*.5+.5)*u)+2);!r&&H>S&&it>J&&Ha(S,J,H-S,it-J),e.disable(e.SCISSOR_TEST)},Ha=(t,a,o,i)=>{e.bindFramebuffer(e.FRAMEBUFFER,Xa),e.viewport(0,0,u,u),e.enable(e.SCISSOR_TEST),e.scissor(t,a,o,i);const r=P.shade;e.useProgram(r.p),jt(0,na,r.u.uH),jt(1,wa,r.u.uS),jt(2,P.tR,r.u.uR),jt(3,P.tG,r.u.uG),e.uniform4fv(r.u.uP,xt),e.uniform1i(r.u.uI,12),e.drawArrays(e.TRIANGLES,0,3)};P.ready(),Oa(0,0,511,511,!0),Aa(),Ha(0,0,u,u),e.disable(e.SCISSOR_TEST);const Va=[[1e9,1e9,-1,-1],[1e9,1e9,-1,-1],[1e9,1e9,-1,-1]],sa=(t,a,o,i,r)=>{const c=Va[t];a<c[0]&&(c[0]=a),o<c[1]&&(c[1]=o),i>c[2]&&(c[2]=i),r>c[3]&&(c[3]=r)},ba=t=>{const a=Va[t];a[2]>=a[0]&&(Oa(a[0],a[1],a[2],a[3]),a[0]=a[1]=1e9,a[2]=a[3]=-1)},Qe=new Float32Array(420),Ke=new Float32Array(420),Xe=new Float32Array(420),De=new Float32Array(420),Ue=new Float32Array(420),Le=new Float32Array(420),qe=new Float32Array(420),Ze=new Float32Array(420),ra=new Float32Array(420),ca=new Float32Array(420);let nt=0;const Ye=(t,a,o,i,r,c,l,v,y)=>{let h=nt;nt>=420?h=s()*420|0:nt++,Qe[h]=t,Ke[h]=a,Xe[h]=o,De[h]=i,Ue[h]=r,Le[h]=c,qe[h]=0,Ze[h]=l,ra[h]=v,ca[h]=y},p={turb:0,t:0,frame:0,load:40,fine:0,runs:0,hurry:0,surge:0,snowX:0,snowY:0,notice:0,hiss:0,click:2,water:0,sweep:0,swIdx:0},Ga=s()*6.283,je=Math.cos(Ga),$e=Math.sin(Ga),$t=[];for(let t=0;t<8;t++)for(let a=0;a<8;a++){const o=a*64+32-256,i=t*64+32-256;o*o+i*i<280*280&&$t.push([a*64,t*64])}for(let t=$t.length-1;t>0;t--){const a=s()*(t+1)|0,o=$t[t];$t[t]=$t[a],$t[a]=o}const ia=t=>kt+(t+Ot[t])/zt,Et=[],Jt=ia(At),L={x:256+Math.cos(Jt)*205*1.04,y:256+Math.sin(Jt)*205*1.04,z:0,a:Jt+Math.PI,v:0,tail:0,flap:0,hover:2,act:null,carry:-1,wag:1,flapA:1},bt=Lt==="none"?null:{x:256+Math.cos(Jt+2.2)*205*1.3,y:256+Math.sin(Jt+2.2)*205*1.3,z:8,a:Jt+2.2+Math.PI,v:0,tail:1,flap:0,hover:9,stage:0,timer:0,away:60+s()*120,wag:1,flapA:1},Be=(t,a,o,i,r)=>{L.act={k:0,x:t,y:a,hover:o,v:i,then:r}},Na=(t,a)=>{L.act={k:2,time:t,then:a}},Wa=(t,a,o,i,r)=>{const c=ia(t),l=Math.cos(c),v=Math.sin(c),y=256+l*a,h=256+v*a;Be(y,h,i?6:9,(i?92:78)*(1+p.hurry*.5),()=>{L.act={k:1,ux:-l,uy:-v,an:c,rTo:o,rep:i,dmg:r,spoke:t,ramp:0}})},Bo=t=>{const a=ia(t),o=Math.cos(a),i=Math.sin(a);let r=0;for(let c=0;c<6;c++){const l=205*(.45+c*.1),v=256+o*l|0,y=256+i*l|0,h=y*512+v;r+=Math.max(0,A[h]-wt[h]);const w=l*3.14159/X,C=-i*w,N=o*w,F=(y+N|0)*512+(v+C|0),K=(y-N|0)*512+(v-C|0);r+=Math.max(0,wt[F]-A[F])+Math.max(0,wt[K]-A[K])}return r},Qa=()=>{let t=-1,a=1e12;for(let o=0;o<Ht;o++)if(re[o]===1){const i=(Xt[o]-L.x)**2+(Dt[o]-L.y)**2-(se[o]>2?1e7:0);i<a&&(a=i,t=o)}return t},Oo=()=>{const t=Math.atan2(L.y-256,L.x-256);let a=0,o=-1e9;for(let c=0;c<7;c++){const l=Math.floor((t-kt)*zt+(s()-.5)*10+X*8)%X;let v=0;const y=kt+(l+.5)/zt;for(let w=0;w<Ht;w++)if(re[w]===0){const C=Math.atan2(Dt[w]-256,Xt[w]-256);Math.abs((C-y+9.42477796)%6.2831853-3.14159265)<3.14/X&&v++}const h=-v-s()*.4;h>o&&(o=h,a=l)}const i=kt+(a+.5)/zt,r=205*(.52+s()*.42);return ga(256+Math.cos(i)*r,256+Math.sin(i)*r)},Oe=()=>{if(bt&&bt.stage===2){Be(bt.x+8,bt.y+4,5,90,()=>{L.act={k:4,time:9+s()*3,ang:s()*6.28},bt.stage=3});return}{const r=Qa();if(r>=0&&se[r]>2){Ka(r);return}}if(Et.length){let r=0,c=1e12;for(let N=0;N<Et.length;N++){const F=(Et[N].x-L.x)**2+(Et[N].y-L.y)**2;F<c&&(c=F,r=N)}const l=Et[r],v=l.x-256,y=l.y-256,h=Math.hypot(v,y);if(h<205*.38){Be(l.x,l.y,3,70,()=>{L.act={k:3,time:1.4,nextPuff:0,px:l.x,py:l.y,dmg:l}});return}const w=Math.atan2(y,v),C=(Math.round((w-kt)*zt)%X+X)%X;l.n++,Wa(C,Math.min(205*1,h+28),Math.max(205*.38,h-28),!0,l);return}const t=Qa();if(t>=0&&p.runs>=2){Ka(t);return}if(p.fine>22){const r=s()*6.283,c=205*s()*.3,l=256+Math.cos(r)*c,v=256+Math.sin(r)*c;Be(l,v,3,72,()=>{L.act={k:3,time:2.2+s()*1.6,nextPuff:0,px:l,py:v,dmg:null}});return}let a=0,o=-1e9;const i=Math.atan2(L.y-256,L.x-256);for(let r=0;r<X;r++){const c=ia(r),l=Math.abs((c-i+9.42477796)%6.2831853-3.14159265),v=Bo(r)*.35-l*1.6+s()*3;v>o&&(o=v,a=r)}Wa(a,205*.99,205*.4,!1,null)},Ka=t=>{p.runs=0,Be(Xt[t],Dt[t],2.5,80,()=>{Na(.45,()=>{if(re[t]!==1){Oe();return}re[t]=2,L.carry=t,he=!0,se[t]=se[t]%1,n.sound.hit("click",.25,{pan:(L.x-256)/400}),la(Xt[t],Dt[t],2,5);const a=Oo();Be(a[0],a[1],6,70,()=>{Na(.3,()=>{re[t]=0,L.carry=-1,Xt[t]=a[0],Dt[t]=a[1],ne[t]=It(a[0],a[1])+.4,he=!0,n.sound.hit("blip",.08,{freq:2200,pan:(L.x-256)/400}),la(a[0],a[1],a[2],3),Oe()})})})})},la=(t,a,o,i)=>{for(let r=0;r<i;r++){const c=s()*6.283,l=6+s()*14;Ye(t+s()*4-2,a+s()*4-2,o+1,Math.cos(c)*l,Math.sin(c)*l,6+s()*10,1+s()*1.4,8+s()*9,.17)}};L.act={k:2,time:.55,then:null},L.act.then=()=>{L.act={k:1,ux:-Math.cos(Jt),uy:-Math.sin(Jt),an:Jt,rTo:205*.4,rep:!1,dmg:null,spoke:At,ramp:0}},L.z=It(L.x,L.y)+2;const Ho=(t,a,o,i,r,c)=>{const l=Math.hypot(t-256,a-256),v=Math.max(5,3.14159*l/X),y=r?v*1.45:v*1.2,h=6.5,w=Math.ceil(Math.max(y,h)),C=Math.max(1,t-w|0),N=Math.min(510,t+w|0),F=Math.max(1,a-w|0),K=Math.min(510,a+w|0),S=(r?.34:.055)*c,H=r?1:Math.min(1,p.load/8);let J=0,it=0;for(let tt=F;tt<=K;tt++){const B=tt*512,R=tt-a;for(let q=C;q<=N;q++){const Y=q-t,Vt=Y*o+R*i,Gt=Y*-i+R*o,Ut=1-Vt*Vt/(h*h),me=1-Gt*Gt/(y*y);if(Ut<=0||me<=0)continue;const Ce=Ut*me,Pt=B+q;let de=(wt[Pt]-A[Pt])*S*Ce;const an=Math.exp(-Gt*Gt/7)*Ut;de-=an*.05*c*Math.max(0,Math.min(1,(A[Pt]-wt[Pt]+1.2)*1.5)),de<0?(A[Pt]+=de,J-=de,Mt[Pt]-=.012*Ce,p.fine-=de*.012*Mt[Pt]):(de*=H,A[Pt]+=de,it+=de,Mt[Pt]*=1-.012*Ce);const Pa=255*Ce;ot[Pt]<Pa&&Math.abs(Gt)<y*.75&&(ot[Pt]=Pa>255?255:Pa)}}p.load=Math.max(0,Math.min(200,p.load+J-it)),sa(0,C,F,N,K)},Za=(t,a,o)=>{const i=o?13:16,r=Math.max(1,t-i|0),c=Math.min(510,t+i|0),l=Math.max(1,a-i|0),v=Math.min(510,a+i|0),y=o?.1:.022;for(let h=l;h<=v;h++)for(let w=r;w<=c;w++){const C=(w-t)*(w-t)+(h-a)*(h-a);if(C>=i*i)continue;const N=1-C/(i*i),F=h*512+w;A[F]+=(wt[F]-A[F])*y*N,Mt[F]+=(.98-Mt[F])*.03*N,ot[F]<70*N&&(ot[F]=70*N)}p.fine=Math.max(0,p.fine-.06),sa(0,r,l,c,v)},ja=6.5,Vo=(t,a,o,i)=>{const r=Math.ceil(ja*2.1),c=Math.max(1,t-r|0),l=Math.min(510,t+r|0),v=Math.max(1,a-r|0),y=Math.min(510,a+r|0);let h=0,w=0;for(let H=-3;H<=3;H++)h+=It(t+H*7*-i,a+H*7*o),w++;h=h/w-3.2,h=Math.min(h,It(t,a)-1.6);const C=Ne[((a/16|0)*33+(t/16|0))%1089],N=Fe[((a/4|0)*129+(t/4|0))%16641],F=ja*(.72+.3*C+.26*N);let K=0,S=0;for(let H=v;H<=y;H++)for(let J=c;J<=l;J++){const it=J-t,tt=H-a,B=Math.abs(it*-i+tt*o);if(Math.abs(it*o+tt*i)>4||B>=r)continue;const q=H*512+J;if(B<F){const Y=B/F,Vt=Y*Y*(1.5-.5*Y),Gt=h+Vt*7;if(A[q]>Gt){const Ut=(A[q]-Gt)*.5;A[q]-=Ut,K+=Ut,Mt[q]+=(.32-Mt[q])*.1}ot[q]<170&&(ot[q]=170)}else S+=1-(B-F)/(r-F)}if(S>0){const H=K/S;for(let J=v;J<=y;J++)for(let it=c;it<=l;it++){const tt=it-t,B=J-a,R=Math.abs(tt*-i+B*o);if(Math.abs(tt*o+B*i)>4||R>=r||R<F)continue;const Y=J*512+it;A[Y]+=H*(1-(R-F)/(r-F)),ot[Y]<110&&(ot[Y]=110)}}Go(c,v,l,y),sa(1,c-1,v-1,l+1,y+1)},Go=(t,a,o,i)=>{for(let c=0;c<3;c++)for(let l=a;l<=i;l++)for(let v=t;v<=o;v++){const y=l*512+v;let h=A[y]-A[y+1];if(h>.62){const w=(h-.62)*.24;A[y]-=w,A[y+1]+=w}else if(h<-.62){const w=(-h-.62)*.24;A[y]+=w,A[y+1]-=w}if(h=A[y]-A[y+512],h>.62){const w=(h-.62)*.24;A[y]-=w,A[y+512]+=w}else if(h<-.62){const w=(-h-.62)*.24;A[y]+=w,A[y+512]-=w}}},$a=(t,a,o,i)=>{const r=Math.max(6,t),c=Math.min(505,t+63),l=Math.max(6,a),v=Math.min(505,a+63),y=Math.round(je*i),h=Math.round($e*i),w=h*512+y,C=o*.35;for(let N=l;N<=v;N++){const F=N*512;for(let K=r;K<=c;K++){const S=F+K,H=A[S],J=(A[S-4]+A[S+4]+A[S-4*512]+A[S+4*512])*.25,it=(A[S-1]+A[S+1]+A[S-512]+A[S+512])*.25,tt=H-J;let B=tt>0?tt*o*(.35+.65*Mt[S]):0;const R=S+w;A[S]=H-B+(it-H)*C,R>0&&R<512*512&&(A[R]+=B),B>.004&&(Mt[S]-=B*.05),ot[S]>0&&(ot[S]=ot[S]>3?ot[S]-3:0)}}sa(2,r-6,l-6,c+6+Math.abs(y),v+6+Math.abs(h))},He=1/30,Wo=(t,a)=>{const o=t.act;let i=t.hover;if(o.k===0){const r=o.x-t.x,c=o.y-t.y,l=Math.hypot(r,c);let y=(Math.atan2(c,r)-t.a+9.42477796)%6.2831853-3.14159265;t.a+=Math.max(-1,Math.min(1,y))*a*7.5;const h=o.v*Math.min(1,l/18+.2)*(.35+.65*Math.max(0,Math.cos(y)));if(t.v+=(h-t.v)*a*8,t.x+=Math.cos(t.a)*t.v*a,t.y+=Math.sin(t.a)*t.v*a,i=o.hover,t.wag=1,t.flapA=1,l<4.5&&Math.abs(y)<1.6||l<2){const w=o.then;o.then=null,w&&w()}}else if(o.k===1){o.ramp=Math.min(1,o.ramp+a*3);let c=(Math.atan2(o.uy,o.ux)-t.a+9.42477796)%6.2831853-3.14159265;t.a+=c*Math.min(1,a*9)+Math.sin(p.t*13)*.006;const l=1+p.hurry*.55,v=.68+.42*Math.sin(p.t*8.5)+.2*Math.sin(p.t*3.3+1);t.v+=((o.rep?26:32)*l*v*o.ramp-t.v)*a*7,t.x+=o.ux*t.v*a,t.y+=o.uy*t.v*a;const y=256+Math.cos(o.an)*Math.hypot(t.x-256,t.y-256),h=256+Math.sin(o.an)*Math.hypot(t.x-256,t.y-256);t.x+=(y-t.x)*a*3,t.y+=(h-t.y)*a*3,i=.55,t.wag=1.5,t.flapA=1;const w=Math.hypot(t.x-256,t.y-256);if(Ho(t.x-o.ux*2,t.y-o.uy*2,o.ux,o.uy,o.rep,Math.min(1,t.v/22)*(1+p.hurry*.3)),t.v>8){const C=Math.min(1,t.v/24);for(let N=0;N<3;N++){const F=(s()-.5)*6,K=s(),S=(s()-.5)*26;Ye(t.x-o.ux*(3+K*5)-o.uy*F,t.y-o.uy*(3+K*5)+o.ux*F,t.z-.6+s()*1.2,-o.ux*(2+s()*7)-o.uy*S,-o.uy*(2+s()*7)+o.ux*S,2+s()*7,1.5+s()*2,5+s()*5,.34*C)}if(s()<.7){const N=s()<.5?-1:1;Ye(t.x-o.ux*6-o.uy*N*4,t.y-o.uy*6+o.ux*N*4,t.z-.5,-o.uy*N*(6+s()*10)-o.ux*4,o.ux*N*(6+s()*10)-o.uy*4,4+s()*8,.5+s()*.7,1.2+s()*1.8,.45)}}if((p.hiss-=a)<0&&(p.hiss=.26+s()*.1,n.sound.hit("noise",.07+s()*.05,{cutoff:1600+s()*900,dur:.28,pan:(t.x-256)/500})),w<=o.rTo){const C=o.dmg;if(p.runs++,t.v*=.5,C){let N=0;for(let F=-2;F<=2;F++)for(let K=-2;K<=2;K++){const S=(C.y+K*4|0)*512+(C.x+F*4|0);if(S>0&&S<512*512){const H=Math.abs(wt[S]-A[S]);H>N&&(N=H)}}if(N<1.6||C.n>=5){const F=Et.indexOf(C);F>=0&&Et.splice(F,1)}}Na(s()<.18/(1+p.hurry*3)?.9+s()*1.8:.08+s()*.22/(1+p.hurry),Oe)}}else if(o.k===2){if(t.v*=1-a*6,t.x+=Math.cos(t.a)*t.v*a,t.y+=Math.sin(t.a)*t.v*a,o.time>.4&&(t.a+=Math.sin(p.t*1.7+t.tail*.05)*a*.9),t.wag=.55,t.flapA=1,o.time-=a,o.time<=0){const r=o.then;o.then=null,r&&r()}i=t.hover}else if(o.k===3){if(o.time-=a,t.a+=Math.sin(p.t*4)*.12,t.x+=Math.cos(t.a)*7*a*Math.sin(p.t*2.3),t.y+=Math.sin(t.a)*7*a*Math.sin(p.t*2.3),t.wag=.7,t.flapA=1.4,i=2,Za(t.x,t.y,!!o.dmg),o.nextPuff-=a,o.nextPuff<=0){o.nextPuff=.28+s()*.3;const r=s()<.5?1:-1,c=Math.cos(t.a),l=Math.sin(t.a);for(let v=0;v<3;v++)Ye(t.x-l*r*7,t.y+c*r*7,t.z+1,-l*r*(10+s()*16),c*r*(10+s()*16),5+s()*9,.8+s(),5+s()*6,.2);s()<.4&&n.sound.hit("noise",.03,{cutoff:2600,dur:.12})}if(o.time<=0){if(o.dmg){const r=Et.indexOf(o.dmg);r>=0&&Et.splice(r,1)}else p.fine=Math.max(0,p.fine-16);Oe()}}else if(o.k===4){o.time-=a,o.ang+=a*1.15*(1+.3*Math.sin(p.t*2));const r=bt.x+Math.cos(o.ang)*11,c=bt.y+Math.sin(o.ang)*11;t.x+=(r-t.x)*a*4.5,t.y+=(c-t.y)*a*4.5;let v=(o.ang+1.57-t.a+9.42477796)%6.2831853-3.14159265;t.a+=v*a*7,t.v=14,t.wag=1.6,t.flapA=1.3,i=2.2,Za(t.x,t.y,!1),s()<.12&&la(t.x,t.y,t.z,1),o.time<=0&&(bt.stage=4,bt.timer=0,Oe())}if(t.hover+=(i-t.hover)*a*5,t.z=It(t.x,t.y)+t.hover,t.tail+=a*(9+t.v*.32)*t.wag,t.flap+=a*(17+t.v*.12)*t.flapA,t.carry>=0){const r=t.carry;Xt[r]=t.x+Math.cos(t.a)*12,Dt[r]=t.y+Math.sin(t.a)*12,ne[r]=t.z+.6,he=!0}},Qo=(t,a)=>{if(t.stage===0){t.timer+=a;const o=256-t.x,i=256-t.y,r=Math.hypot(o,i);let c=(Math.atan2(i,o)-t.a+9.42477796)%6.2831853-3.14159265;t.a+=c*a*2+Math.sin(p.t*.9)*a*.2,t.v+=(30-t.v)*a*2,t.x+=Math.cos(t.a)*t.v*a,t.y+=Math.sin(t.a)*t.v*a,r<8&&(t.stage=2,t.v=0)}else if(t.stage===2||t.stage===3)t.a+=Math.sin(p.t*.7)*a*.25,t.hover+=(2-t.hover)*a*3;else if(t.stage===4){t.timer+=a,t.v+=(46-t.v)*a*1.5;let o=Jt+2.2,i=(o-t.a+9.42477796)%6.2831853-3.14159265;t.a+=i*a*2,t.x+=Math.cos(t.a)*t.v*a,t.y+=Math.sin(t.a)*t.v*a,t.hover+=(9-t.hover)*a*2,t.timer>t.away&&(t.stage=0,t.timer=0,t.away=50+s()*140,t.x=256+Math.cos(o)*205*1.5,t.y=256+Math.sin(o)*205*1.5,t.a=o+Math.PI)}t.z=It(t.x,t.y)+t.hover,t.tail+=a*(7+t.v*.3)*t.wag,t.flap+=a*13},Ko=t=>{p.t+=t,p.frame++,p.hurry=Math.max(0,p.hurry-t/30);const a=p.surge>0,o=a?42:2.4;p.turb+=((a?.2:0)-p.turb)*t*(a?1.6:.45),p.snowX+=je*o*t,p.snowY+=$e*o*t,Wo(L,t),bt&&Qo(bt,t),p.notice>0&&(p.notice-=t,p.notice<=0&&Et.length&&L.act.k!==4&&(L.v*=.4,L.carry<0&&Oe()));for(let c=0;c<Ht;c++)if(re[c]===3){const l=It(Xt[c],Dt[c])+.2;ne[c]-=t*62,Ma[c]+=t*3.4,oa[c]=Math.sin(p.t*5+c)*.7,Xt[c]+=Math.cos(p.t*3+c)*t*8,Dt[c]+=Math.sin(p.t*2.4+c)*t*8,ne[c]<=l&&(ne[c]=l,oa[c]*=.3,re[c]=1,se[c]+=3,la(Xt[c],Dt[c],l,4),n.sound.hit("click",.12),p.runs=9),he=!0}const i=Math.exp(-t*1.8),r=t*9;for(let c=0;c<nt;c++){if(qe[c]+=t,qe[c]>=Ze[c]||Xe[c]<-30){nt--,Qe[c]=Qe[nt],Ke[c]=Ke[nt],Xe[c]=Xe[nt],De[c]=De[nt],Ue[c]=Ue[nt],Le[c]=Le[nt],qe[c]=qe[nt],Ze[c]=Ze[nt],ra[c]=ra[nt],ca[c]=ca[nt],c--;continue}De[c]=De[c]*i+je*o*(1-i)*2,Ue[c]=Ue[c]*i+$e*o*(1-i)*2,Le[c]=Le[c]*i-r,Qe[c]+=De[c]*t,Ke[c]+=Ue[c]*t,Xe[c]+=Le[c]*t}if(a){for(let c=0;c<3;c++){const l=$t[p.swIdx++%$t.length];$a(l[0],l[1],.17,6)}for(let c=0;c<40;c++){const l=30+s()*452,v=30+s()*452,y=(v|0)*512+(l|0);if(A[y]>3&&A[y]-(A[y-5]+A[y+5]+A[y-5*512]+A[y+5*512])*.25>.7){const h=34+s()*50;Ye(l,v,A[y]+1,je*h+(s()-.5)*9,$e*h+(s()-.5)*9,2+s()*10,.9+s()*1.3,5+s()*8,.3)}}}else if(++p.sweep>=36){p.sweep=0;const c=$t[p.swIdx++%$t.length];$a(c[0],c[1],.016,2)}},O={cnt:0,was:!1,x:0,y:0,t0:0,sx:0,sy:0,moved:!1,lastX:0,lastY:0,held:0},Zo=(t,a)=>{const o=2*t-1,i=1-2*a,r=j[0]+(vt[0]*o+St[0]*i)*Z,c=j[1]+(vt[1]*o+St[1]*i)*Z,l=j[2]+(vt[2]*o+St[2]*i)*Z,v=-at[2]/l;return[at[0]+r*v,at[1]+c*v]},jo=(t,a)=>{if(!(Math.hypot(t-256,a-256)>205*1.04||Et.length>24)){for(const i of Et)if((i.x-t)**2+(i.y-a)**2<20*20)return;Et.push({x:t,y:a,n:0})}},$o=t=>{const a=n.input;a.taps();const o=a.inside&&a.down;if(o){const i=Zo(a.x,a.y);if(O.was||(O.t0=p.t,O.sx=i[0],O.sy=i[1],O.lastX=i[0],O.lastY=i[1],O.moved=!1,O.held=0),Math.hypot(i[0]-O.sx,i[1]-O.sy)>9&&(O.moved=!0),O.moved){p.surge=0;let c=i[0]-O.lastX,l=i[1]-O.lastY,v=Math.hypot(c,l);if(v>2.2){const y=c/v,h=l/v,w=Math.min(40,Math.floor(v/2.2));for(let C=1;C<=w;C++){const N=O.lastX+y*2.2*C,F=O.lastY+h*2.2*C;N>4&&F>4&&N<507&&F<507&&(Vo(N,F,y,h),++O.cnt%6===0&&jo(N,F),s()<.3&&Ye(N,F,It(N,F)+2,(s()-.5)*18,(s()-.5)*18,6+s()*9,.8+s()*.8,5+s()*7,.17))}O.lastX+=y*2.2*w,O.lastY+=h*2.2*w,s()<.5&&n.sound.hit("noise",.09,{cutoff:2100,dur:.14}),p.notice=Math.max(p.notice,.55),L.act.k===1&&!L.act.rep&&(p.notice=.55)}}else p.t-O.t0>.3&&(p.surge=Math.max(p.surge,.05),O.held+=t,p.hurry=Math.min(1,p.hurry+t*.28),(p.water-=t)<0&&(p.water=.5,n.sound.hit("noise",.16,{cutoff:1100,dur:.6})))}else if(O.was&&!O.moved&&p.t-O.t0<=.3){const i=O,r=i.sx,c=i.sy;if(r>8&&c>8&&r<504&&c<504){const l=pa(r,c,90,3);se[l]=se[l]%1}}O.was=o,p.surge>0&&(p.surge-=t)},Jo=()=>{for(let t=0;t<Ht;t++){const a=t*8;Zt[a]=Xt[t],Zt[a+1]=Dt[t],Zt[a+2]=ne[t],Zt[a+3]=Ma[t],Zt[a+4]=za[t],Zt[a+5]=Do,Zt[a+6]=se[t]%1,Zt[a+7]=oa[t]}},Fa=be?[.2,.17,.13]:[0,1,2].map(t=>($[0][t]*.5+$[1][t]*.5)*[1.08,.98,.82][t]),Ja=Fa.map(t=>Math.min(.9,t*1.22+.03)),tn=be?[.07,.07,.075]:[$[1][0]*.95,$[1][1]*.95,$[1][2]*.95],to=new Float32Array(3);{const t=T==="dusk"?.62:1;for(let a=0;a<3;a++)to[a]=Math.min(1,Math.pow(Math.min(1,tn[a]*(k.amb[a]*2.6+k.sun[a]*.62)*ge),.4545)*t*.98)}const Ra=[$[1][0]*k.amb[0]*4+k.near[0]*.6,$[1][1]*k.amb[1]*4+k.near[1]*.6,$[1][2]*k.amb[2]*4+k.near[2]*.6],W=new Float32Array(24),Q=new Float32Array(12),ua=(t,a,o,i,r,c,l)=>{const v=P.fish,y=Math.cos(t.a),h=Math.sin(t.a);if(a){const C=t.hover/pe;Q[0]=t.x-yt[0]*C,Q[1]=t.y-yt[1]*C,Q[2]=It(t.x-yt[0]*C,t.y-yt[1]*C)+.15,Q[3]=o,Q[4]=y,Q[5]=h,Q[6]=0,Q[7]=0,Q[8]=-1.5,Q[9]=1.5,Q[10]=1.05,Q[11]=0}else Q[0]=t.x,Q[1]=t.y,Q[2]=t.z+.55,Q[3]=o,Q[4]=y,Q[5]=h,Q[6]=t.hover<3?-.18:-.03,Q[7]=0,Q[8]=-1.15,Q[9]=1.06,Q[10]=.95,Q[11]=0;e.uniform4fv(v.u.uA,Q);const w=Math.max(.25,1-t.hover*.04);W[0]=t.tail,W[1]=t.wag,W[2]=t.flap,W[3]=t.flapA,W[4]=Qt[0]*y+Qt[1]*h,W[5]=-Qt[0]*h+Qt[1]*y,W[6]=Qt[2],W[7]=a,W[8]=c[0],W[9]=c[1],W[10]=c[2],W[11]=i,W[12]=r,W[13]=k.sun[0]*.75,W[14]=k.sun[1]*.75,W[15]=w*(Rt?.72:.55),W[16]=k.amb[0],W[17]=k.amb[1],W[18]=k.amb[2],W[19]=k.sun[2]*.75,W[20]=Math.max(.03,1.9/(o*u/470)),W[21]=l,W[22]=ge*1.1,W[23]=0,e.uniform4fv(v.u.uF,W),e.drawArrays(e.TRIANGLE_STRIP,0,4)},fa=11.5;let ha=0;const en=()=>{Aa(),e.bindFramebuffer(e.FRAMEBUFFER,P.fC),e.viewport(0,0,256,256);{const a=P.cau;e.useProgram(a.p);for(let o=0;o<Kt;o++)ae[o*4+3]=_e[o]*ha*.55+Ie[o];e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.uniform4fv(a.u.uW,ae),e.uniform1i(a.u.uK,Kt),e.uniform1f(a.u.uE,Rt?24:10),e.uniform1f(a.u.uG,200),e.bindVertexArray(P.cauVao),e.drawElements(e.TRIANGLES,200*200*6,e.UNSIGNED_SHORT,0),e.bindVertexArray(P.vao),e.disable(e.BLEND)}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,u,u);{const a=P.comp;e.useProgram(a.p),jt(0,_a,a.u.uT),jt(1,na,a.u.uH),jt(2,P.tC,a.u.uC),e.uniform4fv(a.u.uP,xt),e.uniform4f(a.u.uTb,Ra[0],Ra[1],Ra[2],p.turb),e.uniform4f(a.u.uCu,je,$e,ha*.09,ea),e.drawArrays(e.TRIANGLES,0,3)}e.enable(e.BLEND),e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);{const a=P.fish;e.useProgram(a.p),e.uniform4fv(a.u.uP,xt),ua(L,1,fa,.75,1,Fa,1.3),bt&&ua(bt,1,fa*1.12,.45,1.2,Ja,4.7)}if(he&&(Jo(),e.bindBuffer(e.ARRAY_BUFFER,Da),e.bufferData(e.ARRAY_BUFFER,Zt,e.DYNAMIC_DRAW),he=!1),Ht){const a=P.shell;e.useProgram(a.p),jt(0,wa,a.u.uS),jt(1,P.tC,a.u.uC),e.uniform4fv(a.u.uP,xt),e.bindVertexArray(La),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Ht),e.bindVertexArray(P.vao)}const t=P.pt;if(e.useProgram(t.p),e.uniform4fv(t.u.uP,xt),e.uniform1f(t.u.uSz,u/1e3*2),nt>0){for(let a=0;a<nt;a++){const o=a*5,i=qe[a]/Ze[a];Re[o]=Qe[a],Re[o+1]=Ke[a],Re[o+2]=Xe[a],Re[o+3]=ra[a]*(1+i*2),Re[o+4]=ca[a]*Math.min(1,i*40)*(1-i)*(1-i)}e.bindVertexArray(qa),e.bindBuffer(e.ARRAY_BUFFER,Ua),e.bufferData(e.ARRAY_BUFFER,Re.subarray(0,nt*5),e.DYNAMIC_DRAW),e.uniform4f(t.u.uD,0,0,0,0),e.uniform3fv(t.u.uTint,to),e.drawArrays(e.POINTS,0,nt)}{const a=P.fish;e.bindVertexArray(P.vao),e.useProgram(a.p),e.uniform4fv(a.u.uP,xt),bt&&ua(bt,0,fa*1.12,.45,1.2,Ja,4.7),ua(L,0,fa,.75,1,Fa,1.3)}e.bindVertexArray(Ya),e.useProgram(t.p),e.uniform4fv(t.u.uP,xt),e.uniform1f(t.u.uSz,u/1e3*2),e.uniform4f(t.u.uD,p.snowX,p.snowY,ha,1),e.uniform3f(t.u.uTint,.62+k.near[0],.66+k.near[1]*.5,.7+k.near[2]*.3),e.drawArrays(e.POINTS,0,64),e.bindVertexArray(null),e.disable(e.BLEND)};let Ca=0,eo=0;const ao=(t,a)=>{$o(a||0),Ca+=Math.min(a||0,.25);let o=0;for(;Ca>=He&&o<6;)Ca-=He,Ko(He),o++,ha+=He;if(o>0){if((p.frame&1||o>1)&&ba(0),ba(1),ba(2),++eo>=20){eo=0;for(let i=0;i<Ht;i++)if(re[i]<2){const r=It(Xt[i],Dt[i])+.25;Math.abs(r-ne[i])>.3&&(ne[i]=r,he=!0)}}p.t>2&&(p.click-=He*o)<0&&(p.click=1.8+s()*5.5,n.sound.hit("click",.04+s()*.05,{pan:s()*1.4-.7})),(p.water-=He*o)<0&&p.surge<=0&&(p.water=3.2,n.sound.note(36+(s()*3|0),{dur:3.8,vel:.16,wave:"sine",cutoff:180,attack:1}),n.sound.hit("noise",.05,{cutoff:380,dur:3}))}en()};return ao(0,0),ao}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
