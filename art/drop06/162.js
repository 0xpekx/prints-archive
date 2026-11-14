// Sand Circle: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/162.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Pa){Pa&&function(){"use strict";const Ta=new WeakMap,ie=[],da=`#version 300 es
out vec2 vP;
void main(){ vec2 a=vec2(float((gl_VertexID&1)<<2)-1.,float((gl_VertexID&2)<<1)-1.); vP=a; gl_Position=vec4(a,0.,1.); }`,Qe=`#version 300 es
precision highp float;
precision highp sampler2D;
#define DEC(t) (dot((t).rg,vec2(63.7510,.249027))-32.)
#define HT(q) DEC(texture(uH,(q)/512.))
#define CAUO(v) sqrt(clamp((v)/.72,0.,1.))
// caustic intensity, gently compressed: the dim cells near 1, lines 2 to 3, knots a little more
#define CAUI(t) ((t).r<.94?(t).r*8.33:(t).g*33.3)*1.4/(1.+.4*((t).r<.94?(t).r*8.33:(t).g*33.3))
`,va=`
vec3 tone(vec3 c){ c=c*(1.+c*.111)/(1.+c); return pow(clamp(c,0.,1.),vec3(.4545)); }
`,ao=`#version 300 es
uniform vec4 uW[9]; uniform int uK; uniform float uG; out vec2 vO;
void main(){
  float g=float(gl_VertexID),r=uG+1.;
  float iy=floor(g/r),ix=g-iy*r;
  vec2 x=vec2(ix,iy)/uG*1.2-.1;
  vec2 d=vec2(0.);
  for(int i=0;i<uK;i++){ d+=uW[i].xy*uW[i].z*cos(dot(uW[i].xy,x)+uW[i].w); }
  vO=x;
  gl_Position=vec4((x+d)*2.-1.,0.,1.);
}`,oo=`#version 300 es
precision highp float;
in vec2 vO; out vec4 o; uniform float uE;
void main(){
  vec2 a=dFdx(vO),b=dFdy(vO);
  float I=abs(a.x*b.y-a.y*b.x)*${256*256}.;
  o=vec4(min(I,8.)*.12,min(I,uE)*.03,0.,0.);
}`,no=Qe+`
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
}`,so=Qe+`
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
}`,ro=Qe+va+`
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
}`,co=`#version 300 es
uniform vec4 uP[12]; uniform vec4 uA[3]; out vec2 vQ;
void main(){
  vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1));
  vec2 q=vec2(mix(uA[2].x,uA[2].y,c.x),(c.y*2.-1.)*uA[2].z);
  vQ=q;
  vec2 d=uA[1].xy,s=vec2(-d.y,d.x);
  vec3 w=vec3(uA[0].xy+(d*q.x+s*q.y)*uA[0].w,uA[0].z+q.x*uA[1].z*uA[0].w);
  vec3 v=w-uP[0].xyz;
  gl_Position=vec4(dot(v,uP[1].xyz)/uP[0].w,dot(v,uP[2].xyz)/uP[0].w,0.,dot(v,uP[3].xyz));
}`,io=`#version 300 es
precision highp float;
in vec2 vQ; out vec4 o; uniform vec4 uF[6];
`+va+`
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
}`,lo=`#version 300 es
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
}`,uo=Qe+va+`
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
}`,fo=`#version 300 es
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
}`,ho=`#version 300 es
precision highp float;
in float vA; out vec4 o; uniform vec4 uD; uniform vec3 uTint;
void main(){
  vec2 p=gl_PointCoord*2.-1.;
  float r=dot(p,p);
  float a=max(1.-r,0.); a*=a;
  o=vec4(uTint,1.)*a*vA;
}`;function mo(r,e,y){const A=.14285714285714285,x=511,P=y*512;let i=0;for(let M=-3;M<=3;M++)i+=r[P+(M<0?0:M)];for(let M=0;M<512;M++)e[P+M]=i*A,i+=r[P+(M+3+1>x?x:M+3+1)]-r[P+(M-3<0?0:M-3)]}function vo(r,e,y,p,A,x,P,i){const k=.14285714285714285,ut=511,At=P*512,Tt=(P+3+1>ut?ut:P+3+1)*512,Et=(P-3<0?0:P-3)*512,St=P-256;for(let d=0;d<512;d++){const R=At+d,g=x[d]*k;x[d]+=e[Tt+d]-e[Et+d];const X=d-256,z=p[R]>258.8?1:A[(X*X+St*St)*8+5];r[R]=i?z*y[R]+(1-z)*(g*.92+y[R]*.3):g}}function xo(r,e,y,p,A){const P=new Float64Array(512);for(let i=0;i<2;i++){for(let M=0;M<512;M++)mo(r,e,M);P.fill(0);for(let M=-3;M<=3;M++){const k=(M<0?0:M)*512;for(let ut=0;ut<512;ut++)P[ut]+=e[k+ut]}for(let M=0;M<512;M++)vo(r,e,y,p,A,P,M,i===1)}}const ve=128;function yo(r,e,y,p,A){const x=ve,P=x-1;let i=0;const M=y*x;for(let k=-p;k<=p;k++)i+=r[M+(k&P)];for(let k=0;k<x;k++)e[M+k]=i*A,i+=r[M+(k+p+1&P)]-r[M+(k-p&P)]}function po(r,e,y,p,A){const x=ve,P=x-1;let i=0;for(let M=-p;M<=p;M++)i+=r[(M&P)*x+y];for(let M=0;M<x;M++)e[M*x+y]=i*A,i+=r[(M+p+1&P)*x+y]-r[(M-p&P)*x+y]}function xe(r,e,y,p){const A=1/(2*y+1);for(let x=0;x<ve;x++)yo(r,p,x,y,A);for(let x=0;x<ve;x++)po(p,e,x,y,A)}function Mo(r,e,y){for(let p=0,A=ve*ve;p<A;p++){const x=(e[p]-y[p])*6;r[p]=x/(1+Math.abs(x))*1.2}}function wo(r,e,y,p){for(let A=0;A<8;A++)xe(r,e,1,p),xe(e,e,1,p),xe(e,e,2,p),xe(r,y,3,p),xe(y,y,2,p),xe(y,y,2,p),Mo(r,e,y);xe(r,r,1,p)}function Ao(r,e,y){const p=y*512;for(let A=1;A<511;A++){const x=p+A;e[x]=(r[x]*4+r[x-1]+r[x+1]+r[x-512]+r[x+512])*.125}}function bo(r,e,y){const p=y*512;for(let A=1;A<511;A++)r[p+A]=e[p+A]}function Ea(r,e,y,p){for(let A=y;A<=p;A++)Ao(r,e,A);for(let A=y;A<=p;A++)bo(r,e,A)}const No=(r,e,y)=>{let p=(y-r)/(e-r);return p=p<0?0:p>1?1:p,p*p*(3-2*p)};function Fo(r){xa(r,257),xa(r,1);for(let e=0;e<512;e++)e!==257&&e!==1&&xa(r,e)}function xa(r,e){const{RAD:y,ANG:p,rip:A,mi:x,lo:P,H:i,T:M,F:k,Fr:ut,RL:At,jit:Tt,tDep:Et,hDep:St,hA:d,hB:R,rOut:g,hat:X,mz:z,Q:q}=r,dt=No,vt=q[0],Re=q[1],bt=q[2],Qt=q[3],Ke=q[4],pt=q[5],_t=q[6],ye=q[7],Q=q[8],L=r.n,T=2*L,Ce=-L,Pe=-T,Kt=1024,nt=ve;{const st=e/16,le=st|0,Bt=st-le,ue=e/4,ae=ue|0,J=ue-ae;for(let tt=0;tt<512;tt++){const V=e*512+tt,It=y[V],rt=tt/4,Ze=rt|0,oe=rt-Ze,xt=ae*129+Ze,Ot=(x[xt]*(1-oe)+x[xt+1]*oe)*(1-J)+(x[xt+129]*(1-oe)+x[xt+130]*oe)*J;if(It>258.8){i[V]=M[V]=A[V],k[V]=.42+Ot*.2;continue}const Ue=tt/16,je=Ue|0,pe=Ue-je,Nt=le*33+je,Me=(P[Nt]*(1-pe)+P[Nt+1]*pe)*(1-Bt)+(P[Nt+33]*(1-pe)+P[Nt+34]*pe)*Bt,fe=It/205,ft=tt-256,I=e-256,Dt=(ft*ft+I*I)*8;let ot=(p[V]-vt)*Re+(Me-.5)*.2;if(ot>=T||ot<=Pe)ot=(ot%L+L)%L;else{const j=ot-L,et=ot+L;ot=ot>=L?j:ot<=Ce?et:ot,ot+=L;const Ct=ot-L;ot=ot>=L?Ct:ot}const $e=Math.floor(ot+.5);let qe=0,Je=0;if(fe>.36)for(let j=-1;j<=1;j++){const et=($e+j+L)%L,Ct=$e+j,jt=Math.abs(ot-Ct-Tt[et])*2,Xt=X[jt*256|0],ne=g[et];let kt=fe>ne-.07?1-dt(ne-.07,ne+.02,fe):1;if(qe+=Xt*kt*Et[et],St[et]>0){const me=d[et],oa=R[et];Je+=X[Math.min(Kt,jt*bt*256|0)]*kt*St[et]*(fe<=me?0:fe>=oa?1:dt(me,oa,fe))}}const he=.265*3.14159*It/L*(.86+.28*Ot)*pt,ta=At[Dt],Ye=qe*he*ta,Te=Je*he*ta,ea=At[Dt+1]*(.75+.5*Me),Ft=At[Dt+2]*(.8+.4*Me),Ht=At[Dt+3];let Zt=0;if(Ht>0){const j=(tt-256+68+(Me-.5)*22)*.9,et=(e-256+68+(Ot-.5)*7+(P[Nt+34]-.5)*12)*.9;if(j>=0&&et>=0&&j<nt-1&&et<nt-1){const Ct=j|0,jt=et|0,Xt=j-Ct,ne=et-jt,kt=jt*nt+Ct;Zt=(z[kt]*(1-Xt)+z[kt+1]*Xt)*(1-ne)+(z[kt+nt]*(1-Xt)+z[kt+nt+1]*Xt)*ne}}const Be=At[Dt+4],aa=Zt*1.35*Ht+Be,Ee=At[Dt+5],w=(Ot-.5)*.7;M[V]=Ee*A[V]+Ye+Ft+ea+aa+w*(1-Ee);const Rt=Math.max(Ee,Qt);i[V]=Rt*A[V]+Te+Ft*_t+ea*_t+Zt*1.35*Ht*ye+Be*_t+w*(1-Rt);const yt=-Te*20,ht=yt<100?yt:100;ut[V]=Te<Ke?ht:0;const we=he>.01?Math.max(-1,Math.min(1,Te/he)):0,_=At[Dt+6]*Q;let Mt=.46-.3*we+(Ot-.5)*.28+(Me-.5)*.2;Mt=Mt+(.97-Mt)*_,k[V]=Math.max(.02,Math.min(1,Mt))}}}function Fe(r,e,y,p,A,x,P){const i=r.createTexture();return r.bindTexture(r.TEXTURE_2D,i),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,P?r.LINEAR_MIPMAP_LINEAR:p),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,p),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,A),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,A),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,e,y,0,r.RGBA,r.UNSIGNED_BYTE,x||null),P&&r.generateMipmap(r.TEXTURE_2D),i}function Ro(r){let e=Ta.get(r);if(e)return e;e={};const y={cau:[ao,oo],hor:[da,no],shade:[da,so],comp:[da,ro],fish:[co,io],shell:[lo,uo],pt:[fo.replace("${'SCALE'}","1."),ho]},p=[];for(const d in y){const R=r.createProgram();for(let g=0;g<2;g++){const X=r.createShader(g?r.FRAGMENT_SHADER:r.VERTEX_SHADER);r.shaderSource(X,y[d][g]),r.compileShader(X),r.attachShader(R,X)}r.linkProgram(R),p.push([d,R])}for(const[d,R]of p){if(!r.getProgramParameter(R,r.LINK_STATUS)){const z=r.getAttachedShaders(R);throw new Error("162 "+d+": "+r.getProgramInfoLog(R)+" "+r.getShaderInfoLog(z[0])+" "+r.getShaderInfoLog(z[1]))}const g={},X=r.getProgramParameter(R,r.ACTIVE_UNIFORMS);for(let z=0;z<X;z++){const q=r.getActiveUniform(R,z).name.replace("[0]","");g[q]=r.getUniformLocation(R,q)}e[d]={p:R,u:g}}e.vao=r.createVertexArray();const A=new Float32Array(512*512),x=6.283185307/512,P=new Uint8Array(512*512*4);let i=-1640531527;const M=()=>(i^=i<<13,i^=i>>>17,i^=i<<5,(i>>>0)/4294967296),k=new Float32Array(32*32);for(let d=0;d<1024;d++)k[d]=M();const ut=new Float32Array(128*128);for(let d=0;d<16384;d++)ut[d]=M();const At=new Float32Array(512);for(let d=0;d<512;d++)At[d]=Math.sin(d*x);const Tt=d=>At[(d*512/6.283185307|0)&511];for(let d=0;d<512;d++)for(let R=0;R<512;R++){const g=1.05*Tt(x*(R+2*d)+1)+.9*Tt(x*(2*R-d)+2)+.55*Tt(x*(3*R+2*d)+4)+.42*Tt(x*(-R+4*d)+5),z=.5+.5*Tt(x*(4*R+17*d)+g*2.2),q=z*z*(1.6-.6*z),dt=.24*Tt(x*(-9*R+7*d)+g*1.1),vt=.72+.28*Tt(x*(2*R+d)+g);A[d*512+R]=(q*2-.9+dt)*1.55*vt}for(let d=0;d<512;d++){const R=d/128,g=R|0,X=R-g,z=d/32,q=z|0,dt=z-q;for(let vt=0;vt<512;vt++){const Re=d*512+vt,bt=Re*4,Qt=A[d*512+(vt+1&511)]-A[d*512+(vt-1&511)],Ke=A[(d+1&511)*512+vt]-A[(d-1&511)*512+vt],pt=vt/128,_t=pt|0,ye=pt-_t,Q=vt/32,L=Q|0,T=Q-L,Ce=k[g*32%1024+_t%32],Pe=k[g*32%1024+(_t+1)%32],Kt=k[(g+1)%32*32+_t%32],nt=k[(g+1)%32*32+(_t+1)%32],st=ye*ye*(3-2*ye),le=X*X*(3-2*X),Bt=(Ce*(1-st)+Pe*st)*(1-le)+(Kt*(1-st)+nt*st)*le,ue=ut[q%128*128+L%128],ae=ut[q%128*128+(L+1)%128],J=ut[(q+1)%128*128+L%128],tt=ut[(q+1)%128*128+(L+1)%128],V=(ue*(1-T)+ae*T)*(1-dt)+(J*(1-T)+tt*T)*dt;P[bt]=128,P[bt+1]=Math.max(0,Math.min(255,127.5+Qt*40)),P[bt+2]=Math.max(0,Math.min(255,127.5+Ke*40)),P[bt+3]=(Bt*.62+V*.38)*255}}e.rip=A,e.ang=new Float32Array(512*512),e.rad=new Float32Array(512*512);for(let d=0;d<512;d++)for(let R=0;R<512;R++){const g=R-256,X=d-256;e.ang[d*512+R]=Math.atan2(X,g),e.rad[d*512+R]=Math.sqrt(g*g+X*X)}e.tR=Fe(r,512,512,r.LINEAR,r.REPEAT,P,!1);const Et=512,St=new Uint8Array(Et*Et*4);for(let d=0;d<Et*Et*4;d+=4){const R=M(),g=M();St[d]=M()*255,St[d+1]=M()*255,St[d+2]=(R*.6+g*.4)*255,St[d+3]=M()*255}e.tG=Fe(r,Et,Et,r.LINEAR,r.REPEAT,St,!0),e.tC=Fe(r,256,256,r.LINEAR,r.REPEAT,null,!1),e.fC=r.createFramebuffer();{const R=new Uint16Array(24e4);for(let X=0,z=0;X<200;X++)for(let q=0;q<200;q++,z+=6){const dt=X*201+q;R[z]=dt,R[z+1]=dt+1,R[z+2]=dt+201,R[z+3]=dt+201,R[z+4]=dt+1,R[z+5]=dt+201+1}e.cauVao=r.createVertexArray(),r.bindVertexArray(e.cauVao);const g=r.createBuffer();r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,g),r.bufferData(r.ELEMENT_ARRAY_BUFFER,R,r.STATIC_DRAW),r.bindVertexArray(null)}return r.bindFramebuffer(r.FRAMEBUFFER,e.fC),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e.tC,0),r.bindFramebuffer(r.FRAMEBUFFER,null),Ta.set(r,e),e}Pa.add({num:162,name:"Sand Circle",fam:"Worlds",recipe:"A tiny male pufferfish digs a round nest into the seabed while the current wears it down. How far along it is and the shells he decorates with change every mint, with a rare visiting female. Drag to cut a groove and he comes and repairs it, tap to drop a bit of shell and he sets it on a ridge, or hold for a current that smooths it out.",interactive:"Drag to cut a groove through the ridges: he comes over and repairs it, ridge by ridge. Tap to drop a shell fragment: he takes it and sets it on a ridge. Hold for a current surge: sand streams off the crests and they blur, and he works harder afterwards.",music:!0,gl:!0,fps:30,seed:0,make(r){const e=r.gl,y=r.size;let p=parseInt(r.hash.slice(2,10),16)|0,A=parseInt(r.hash.slice(10,18),16)|0,x=parseInt(r.hash.slice(18,26),16)|0,P=parseInt(r.hash.slice(26,34),16)|0;const i=()=>{p|=0,A|=0,x|=0,P|=0;const t=(p+A|0)+P|0;return P=P+1|0,p=A^A>>>9,A=x+(x<<3)|0,x=x<<21|x>>>11,x=x+t|0,(t>>>0)/4294967296};for(let t=0;t<40;t++)i();const M=t=>{let a=0;for(const n of t)a+=n[1];let o=i()*a,c=t[0][0];for(const n of t){if(o<n[1]){c=n[0];break}o-=n[1]}return c},k=r.home,ut=M([["early spokes",28],["near complete",54],["finished, shell-decorated",18]]),At=M([["pale",50],["grey",38],["black volcanic",12]]),Tt=M([["clear blue",52],["soft green",36],["dusk",12]]),Et=M([["strong noon",55],["soft",45]]),St=M([[20,32],[28,52],[40,16]]);M([["white spots",58],["dark saddles",32],["pale ghost",10]]);const d=M([["chalk cockle",60],["pink coral",30],["mother of pearl",10]]),R=M([["none",88],["a female visiting",12]]),g=k?"near complete":ut,X=k?"pale":At,z=k?"clear blue":Tt,q=k?"strong noon":Et,dt=k?28:St,vt=k||X==="black volcanic"?"chalk cockle":d,Re=k?"none":R;let bt=parseInt(r.hash.slice(34,42),16)^parseInt(r.hash.slice(50,58),16)^1540483477|1;const Qt=()=>(bt^=bt<<13,bt^=bt>>>17,bt^=bt<<5,(bt>>>0)/4294967296),pt=k?"overhead":(t=>{let a=0;for(const n of t)a+=n[1];let o=Qt()*a,c=t[0][0];for(const n of t){if(o<n[1]){c=n[0];break}o-=n[1]}return c})([["overhead",35],["low and wide",30],["close on his run",27],["straight down",8]]),_t=!k&&Qt()<.5&&ut==="near complete"&&Et==="soft",ye=_t?"old, worn by the current":g;r.trait("circle stage",ye),r.trait("sand",X),r.trait("water",z),r.trait("caustics",q),r.trait("ridges",String(dt)),r.trait("shells",vt),r.trait("visitor",Re),r.trait("view",pt);const Q=g==="early spokes"?0:g==="near complete"?1:2,L=q==="strong noon",T=Ro(e),Ce=i()*6.283185,Pe=.86+i()*.04,Kt=.265,nt=Math.sin(Ce),st=Math.cos(Ce),le=pt==="low and wide"?.55+Qt()*.06:pt==="straight down"?1.43:pt==="close on his run"?Pe+.1:Pe,Bt=pt==="low and wide"?960:pt==="straight down"?860:pt==="close on his run"?520+Qt()*60:905,ue=Math.cos(le),ae=Math.sin(le),J=[nt*ue,st*ue,-ae],tt=[st,-nt,0],V=[nt*ae,st*ae,ue],It=pt==="low and wide"?[256+nt*70,256+st*70,0]:pt==="straight down"?[256,256,0]:[256+nt*42,256+st*42,0],rt=[It[0]-J[0]*Bt,It[1]-J[1]*Bt,Bt*ae],Ze=(i()<.5?2.42:.72)+(i()-.5)*.5,oe=k?2.3:Ze,xt=[tt[0]*Math.cos(oe)+nt*Math.sin(oe),tt[1]*Math.cos(oe)+st*Math.sin(oe)],Ot=L?.8:.72,Ue=Math.atan(Ot),je=Math.sin(Ue),pe=Math.cos(Ue),Nt=[xt[0]*pe,xt[1]*pe,je],Me={pale:[[.45,.36,.235],[.77,.665,.485],.5],grey:[[.29,.28,.25],[.52,.5,.45],.55],"black volcanic":[[.028,.027,.03],[.068,.066,.072],.95]},fe={"clear blue":{amb:[.07,.125,.2],sun:[1.4,1.42,1.28],near:[.11,.33,.52],deep:[.008,.075,.215]},"soft green":{amb:[.09,.145,.13],sun:[1.25,1.42,1.15],near:[.1,.34,.32],deep:[.01,.1,.1]},dusk:{amb:[.04,.05,.1],sun:[1.55,.85,.47],near:[.07,.09,.2],deep:[.006,.018,.07]}},ft=Me[X],I=fe[z],Dt=X==="black volcanic",ot=1/(512*.62),$e=Math.max(0,Math.log2(1e3/y)),qe=[nt,st],Je=nt*256+st*256,he=Dt?1.5:z==="dusk"?1.2:1,ta=1.6,Ye=Dt?.42:1,Te=L?.4:.62,ea=L?.8:.4,Ft=new Float32Array([rt[0],rt[1],rt[2],Kt,tt[0],tt[1],tt[2],ot,V[0],V[1],V[2],$e,J[0],J[1],J[2],20,Nt[0],Nt[1],Nt[2],Ot,ft[0][0],ft[0][1],ft[0][2],L?.05:.09,ft[1][0],ft[1][1],ft[1][2],ft[2],I.amb[0],I.amb[1],I.amb[2],Te,I.sun[0],I.sun[1],I.sun[2],ea,I.near[0]*Ye,I.near[1]*Ye,I.near[2]*Ye,76,I.deep[0],I.deep[1],I.deep[2],165,qe[0],qe[1],Je,he*.76]),Ht=8,Zt=new Float32Array(Ht*4),Be=new Float32Array(Ht),aa=new Float32Array(Ht);{const t=i()*6.283,a=L?2.15:1.55,o=[[7,2],[9,-3],[6,-5],[11,4],[13,-1],[10,7],[15,-6],[4,11]];let c=0;for(let n=0;n<Ht;n++){const s=Math.cos(t),l=Math.sin(t),f=Math.floor(t/1.5708)&3,h=o[n][0],u=o[n][1],v=f===0?h:f===1?-u:f===2?-h:u,C=f===0?u:f===1?h:f===2?-u:-h,b=6.283185*Math.hypot(v,C),N=1/Math.pow(Math.hypot(v,C),1.1)*(.8+i()*.4);Zt[n*4]=6.283185*v,Zt[n*4+1]=6.283185*C,Zt[n*4+2]=N/(b*b),Be[n]=Math.sqrt(b/6.283185)*1.05*(n<6?1:-1)*(.95+i()*.1),aa[n]=i()*6.283,c+=N}for(let n=0;n<Ht;n++)Zt[n*4+2]*=a*2.05/c}const Ee=T.rip,w=new Float32Array(512*512),Rt=new Float32Array(512*512),yt=new Float32Array(512*512),ht=new Uint8Array(512*512),we=new Uint8Array(512*512*4),_=dt,Mt=i()*6.283185,j=_/6.283185307,et=new Float32Array(_),Ct=new Float32Array(_),jt=new Float32Array(_),Xt=new Float32Array(_),ne=new Float32Array(_);let kt=-xt[1],me=xt[0];kt*nt+me*st>0&&(kt=-kt,me=-me),kt-=nt*1.1,me-=st*1.1;const oa=Math.atan2(me,kt),Lt=(Math.round((oa-Mt)*j)%_+_)%_;for(let t=0;t<_;t++){et[t]=(i()-.5)*.16,Ct[t]=.86+i()*.24,ne[t]=.94+i()*.07;const a=i(),o=i(),c=1-Math.min(Math.abs(t-Lt),_-Math.abs(t-Lt))/(_/2);jt[t]=Q===2?Ct[t]:Q===1?Ct[t]*(a<(k?.05:.14)?.42+o*.25:.82+o*.18):a<.3+.7*c*c?.9+o*.35:a<.45+.5*c?.35+o*.25:0,Xt[t]=Q===0?.3+o*.2:.38}if(et[Lt]=0,jt[Lt]=Math.max(jt[Lt],.98*Ct[Lt]),Ct[Lt]=Math.max(Ct[Lt],1),pt==="close on his run"){const t=Mt+Lt/j,a=205*(.62+Qt()*.12);It[0]=256+Math.cos(t)*a,It[1]=256+Math.sin(t)*a,rt[0]=It[0]-J[0]*Bt,rt[1]=It[1]-J[1]*Bt,Ft[0]=rt[0],Ft[1]=rt[1],Ft[7]=ot*905/Bt,Ft[46]=nt*It[0]+st*It[1]-120}Q===0&&(Xt[Lt]=.34);const Sa=r.hash+(k?" home":""),Pt=ie.find(t=>t.key===Sa);let Ae,be;const Ut=(t,a)=>{t=t<0?0:t>512-1.001?512-1.001:t,a=a<0?0:a>512-1.001?512-1.001:a;const o=t|0,c=a|0,n=t-o,s=a-c,l=c*512+o;return(w[l]*(1-n)+w[l+1]*n)*(1-s)+(w[l+512]*(1-n)+w[l+512+1]*n)*s};if(Pt)ie[0]!==Pt&&(ie.splice(ie.indexOf(Pt),1),ie.unshift(Pt)),w.set(Pt.H),Rt.set(Pt.T),yt.set(Pt.F),ht.set(Pt.Fr),Ae=Pt.lo,be=Pt.mi,p=Pt.rs[0],A=Pt.rs[1],x=Pt.rs[2],P=Pt.rs[3];else{const a=new Float32Array(16384),o=T.ma||(T.ma=new Float32Array(128*128)),c=T.mb||(T.mb=new Float32Array(128*128)),n=T.mt||(T.mt=new Float32Array(128*128));for(let F=0;F<128*128;F++)a[F]=i()*2-1;wo(a,o,c,n),Ae=new Float32Array(33*33),be=new Float32Array(129*129);for(let F=0;F<Ae.length;F++)Ae[F]=i();for(let F=0;F<be.length;F++)be[F]=i();const s=1024,l=new Float32Array(s+1);for(let F=0;F<=s;F++){const E=F/256;l[F]=E<1?-1+1.5*Math.pow(E,1.25):.5*Math.exp(-(E-1)*2.6)}const f=Q===0?.36:Q===1?.88:1,h=Q===0?.08:Q===1?.8:1,u=(F,E,U)=>{let K=(U-F)/(E-F);return K=K<0?0:K>1?1:K,K*K*(3-2*K)},v=_===40?1.28:_===20?.86:1,C=T.rad,b=T.ang,N=T.rl||(T.rl=(()=>{const E=new Float64Array(536e3),U=Math.fround(.38);for(let K=0;K<67e3;K++){const lt=Math.fround(Math.sqrt(K))/205,Gt=(lt-.37)/.038,zt=(lt-1.02)/.06,Z=K*8;E[Z]=u(.37,.5,lt),E[Z+1]=2.1*Math.exp(-Gt*Gt),E[Z+2]=3.8*Math.exp(-zt*zt),E[Z+3]=u(.355,.29,lt),E[Z+4]=-1.5*u(.42,.2,lt)+.7*u(.16,0,lt),E[Z+5]=u(.98,1.2,lt),E[Z+6]=u(.43,.3,lt),E[Z+7]=u(U,U+.12,lt)}return E})()),G=2*_,S=Q===0?.35:Q===1?.92:1,Y=Math.fround(.38),at=Xt.every(F=>F===Y),mt=new Float64Array(_),$=new Float64Array(_);for(let F=0;F<_;F++)mt[F]=at?Y:Xt[F],$[F]=at?Y+.12:Xt[F]+.16;Fo({RAD:C,ANG:b,rip:Ee,mi:be,lo:Ae,H:w,T:Rt,F:yt,Fr:ht,RL:N,jit:et,tDep:Ct,hDep:jt,hA:mt,hB:$,rOut:ne,hat:l,mz:a,n:_,Q:new Float64Array([Mt,j,Q===0?1.5:1,Q===0?.3:-1/0,Q===0?-.8*.4:-1/0,v,f,h,S])});{const U=T.mt2||(T.mt2=new Float32Array(262144));Ea(w,U,1,510),Ea(Rt,U,1,510),_t&&xo(w,U,Ee,C,T.rl)}const it=(F,E,U,K)=>{const lt=U*U;for(let Gt=Math.max(1,E-U|0);Gt<=Math.min(510,E+U|0);Gt++)for(let zt=Math.max(1,F-U|0);zt<=Math.min(510,F+U|0);zt++){const Z=(zt-F)*(zt-F)+(Gt-E)*(Gt-E);if(Z<lt){const Wt=1-Z/lt;w[Gt*512+zt]-=K*Wt*Wt}}};if(Q===1)for(let F=0;F<7;F++){const E=205*(.5+i()*.42),U=Mt+(Math.floor(i()*_)+.5)/j;it(256+Math.cos(U)*E,256+Math.sin(U)*E,9+i()*7,2.5+i()*3)}const W=ie.length<2?{H:new Float32Array(512*512),T:new Float32Array(512*512),F:new Float32Array(512*512),Fr:new Uint8Array(512*512)}:ie.pop();W.H.set(w),W.T.set(Rt),W.F.set(yt),W.Fr.set(ht),W.key=Sa,W.lo=Ae,W.mi=be,W.rs=[p,A,x,P],ie.unshift(W)}const qt=new Float32Array(150),Yt=new Float32Array(150),se=new Float32Array(150),ya=new Float32Array(150),ka=new Float32Array(150),re=new Float32Array(150),na=new Float32Array(150),ce=new Uint8Array(150),$t=new Float32Array(150*8),Co=vt==="chalk cockle"?0:vt==="pink coral"?1:2;let Vt=0,de=!0;const ga=(t,a)=>{const o=t-256,c=a-256,n=Math.hypot(o,c)||1,s=-c/n,l=o/n;let f=t,h=a,u=-99;for(let v=-14;v<=14;v+=2){const C=t+s*v,b=a+l*v,N=Ut(C,b);N>u&&(u=N,f=C,h=b)}return[f,h,u]},pa=(t,a,o,c)=>{let n=Vt;return Vt>=150?n=0:Vt++,qt[n]=t,Yt[n]=a,se[n]=o,ya[n]=i()*6.283,ka[n]=2.3+i()*i()*3.6,re[n]=i(),na[n]=(i()-.5)*.7,ce[n]=c,de=!0,n};{const t=Q===2?2+(_<=28?1:0):0;let a=0;for(let o=0;o<_;o++){let c=t;Q===1&&i()<.42&&(c=1);const n=Qt();a=n<.3?0:n<.55?Math.max(1,a):a+1;const s=Q===2?Math.min(c,a===0?0:1+(n*7|0)%3):c;for(let l=0;l<c;l++){const f=Mt+(o+.5+(et[o]+et[(o+1)%_])*.5+(i()-.5)*.06)/j,h=i(),u=205*(.79+h*.17-l*.035),v=ga(256+Math.cos(f)*u,256+Math.sin(f)*u);pa(v[0],v[1],v[2]+.4,0),l>=s&&Vt--}}for(let o=0,c=Q===2?3:6;o<c;o++){const n=i()*6.283,s=205*(.72+i()*.46),l=256+Math.cos(n)*s,f=256+Math.sin(n)*s;pa(l,f,Ut(l,f)+.2,1)}}const sa=Fe(e,512,512,e.LINEAR,e.CLAMP_TO_EDGE,null,!1),Ma=Fe(e,512,512,e.LINEAR,e.CLAMP_TO_EDGE,null,!1),za=Fe(e,y,y,e.NEAREST,e.CLAMP_TO_EDGE,null,!1),_a=e.createFramebuffer(),Ia=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,_a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Ma,0),e.bindFramebuffer(e.FRAMEBUFFER,Ia),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,za,0),e.bindFramebuffer(e.FRAMEBUFFER,null);const Da=e.createBuffer(),Xa=e.createBuffer(),Po=e.createBuffer(),La=e.createVertexArray(),Ua=e.createVertexArray(),qa=e.createVertexArray();e.bindVertexArray(La),e.bindBuffer(e.ARRAY_BUFFER,Da),e.bufferData(e.ARRAY_BUFFER,$t,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(1,1);const Ne=new Float32Array(420*5);e.bindVertexArray(Ua),e.bindBuffer(e.ARRAY_BUFFER,Xa),e.bufferData(e.ARRAY_BUFFER,Ne,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,20,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,1,e.FLOAT,!1,20,16);{const t=new Float32Array(320);for(let a=0;a<64;a++){const o=a<5;t[a*5]=i()*760,t[a*5+1]=i()*760,t[a*5+2]=o?380+i()*120:i()*400,t[a*5+3]=o?10+i()*10:1.4+i()*i()*3.4,t[a*5+4]=o?.035+i()*.03:.12+i()*.24}e.bindVertexArray(qa),e.bindBuffer(e.ARRAY_BUFFER,Po),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,20,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,1,e.FLOAT,!1,20,16)}e.bindVertexArray(null);const Jt=(t,a,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,a),e.uniform1i(o,t)},wa=()=>{e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.STENCIL_TEST),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(T.vao)},To=(t,a,o,c)=>{for(let n=a;n<=c;n++){let s=n*512+t,l=s*4;for(let f=t;f<=o;f++,s++,l+=4){let h=(w[s]+32)*1023.984;h=h<0?0:h>65535?65535:h|0,we[l]=h>>8,we[l+1]=h&255;const u=yt[s];we[l+2]=u<=0?0:u>=1?255:u*255,we[l+3]=ht[s]}}e.bindTexture(e.TEXTURE_2D,sa),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_ROW_LENGTH,512),e.pixelStorei(e.UNPACK_SKIP_ROWS,a),e.pixelStorei(e.UNPACK_SKIP_PIXELS,t),e.texSubImage2D(e.TEXTURE_2D,0,t,a,o-t+1,c-a+1,e.RGBA,e.UNSIGNED_BYTE,we),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0)},Ya=30/Ot,Eo=(t,a,o)=>{const c=t-rt[0],n=a-rt[1],s=o-rt[2],l=c*J[0]+n*J[1]+s*J[2];return(c*tt[0]+n*tt[1]+s*tt[2])/(l*Kt)},So=(t,a,o)=>{const c=t-rt[0],n=a-rt[1],s=o-rt[2],l=c*J[0]+n*J[1]+s*J[2];return(c*V[0]+n*V[1]+s*V[2])/(l*Kt)},Ba=(t,a,o,c,n)=>{if(t=Math.max(0,t|0),a=Math.max(0,a|0),o=Math.min(511,o|0),c=Math.min(511,c|0),o<t||c<a)return;To(t,a,o,c);const s=xt[0]*Ya*Math.min(1,1),l=xt[1]*Ya,f=Math.max(0,Math.floor(t-22+Math.min(0,-s))),h=Math.min(511,Math.ceil(o+22+Math.max(0,-s))),u=Math.max(0,Math.floor(a-22+Math.min(0,-l))),v=Math.min(511,Math.ceil(c+22+Math.max(0,-l)));wa(),e.enable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,_a),e.viewport(0,0,512,512),e.scissor(f,u,h-f+1,v-u+1),e.useProgram(T.hor.p),Jt(0,sa,T.hor.u.uH),e.uniform4f(T.hor.u.uL,xt[0],xt[1],Ot,0),e.uniform1i(T.hor.u.uN,19),e.drawArrays(e.TRIANGLES,0,3);let C=9,b=-9,N=9,G=-9;for(let $=0;$<8;$++){const it=$&1?h:f,W=$&2?v:u,F=$&4?20:-20,E=Eo(it,W,F),U=So(it,W,F);E<C&&(C=E),E>b&&(b=E),U<N&&(N=U),U>G&&(G=U)}const S=Math.max(0,Math.floor((C*.5+.5)*y)-2),Y=Math.min(y,Math.ceil((b*.5+.5)*y)+2),at=Math.max(0,Math.floor((N*.5+.5)*y)-2),mt=Math.min(y,Math.ceil((G*.5+.5)*y)+2);!n&&Y>S&&mt>at&&Oa(S,at,Y-S,mt-at),e.disable(e.SCISSOR_TEST)},Oa=(t,a,o,c)=>{e.bindFramebuffer(e.FRAMEBUFFER,Ia),e.viewport(0,0,y,y),e.enable(e.SCISSOR_TEST),e.scissor(t,a,o,c);const n=T.shade;e.useProgram(n.p),Jt(0,sa,n.u.uH),Jt(1,Ma,n.u.uS),Jt(2,T.tR,n.u.uR),Jt(3,T.tG,n.u.uG),e.uniform4fv(n.u.uP,Ft),e.uniform1i(n.u.uI,12),e.drawArrays(e.TRIANGLES,0,3)};Ba(0,0,511,511,!0),wa(),Oa(0,0,y,y),e.disable(e.SCISSOR_TEST);const Ha=[[1e9,1e9,-1,-1],[1e9,1e9,-1,-1],[1e9,1e9,-1,-1]],ra=(t,a,o,c,n)=>{const s=Ha[t];a<s[0]&&(s[0]=a),o<s[1]&&(s[1]=o),c>s[2]&&(s[2]=c),n>s[3]&&(s[3]=n)},Aa=t=>{const a=Ha[t];a[2]>=a[0]&&(Ba(a[0],a[1],a[2],a[3]),a[0]=a[1]=1e9,a[2]=a[3]=-1)},Oe=new Float32Array(420),He=new Float32Array(420),Se=new Float32Array(420),ke=new Float32Array(420),ge=new Float32Array(420),ze=new Float32Array(420),_e=new Float32Array(420),Ve=new Float32Array(420),ca=new Float32Array(420),ia=new Float32Array(420);let ct=0;const Ie=(t,a,o,c,n,s,l,f,h)=>{let u=ct;ct>=420?u=i()*420|0:ct++,Oe[u]=t,He[u]=a,Se[u]=o,ke[u]=c,ge[u]=n,ze[u]=s,_e[u]=0,Ve[u]=l,ca[u]=f,ia[u]=h},m={turb:0,t:0,frame:0,load:40,fine:0,runs:0,hurry:0,surge:0,snowX:0,snowY:0,notice:0,hiss:0,click:2,water:0,sweep:0,swIdx:0},Va=i()*6.283,Ge=Math.cos(Va),We=Math.sin(Va),te=[];for(let t=0;t<8;t++)for(let a=0;a<8;a++){const o=a*64+32-256,c=t*64+32-256;o*o+c*c<280*280&&te.push([a*64,t*64])}for(let t=te.length-1;t>0;t--){const a=i()*(t+1)|0,o=te[t];te[t]=te[a],te[a]=o}const la=t=>Mt+(t+et[t])/j,gt=[],ee=la(Lt),D={x:256+Math.cos(ee)*205*1.04,y:256+Math.sin(ee)*205*1.04,z:0,a:ee+Math.PI,v:0,tail:0,flap:0,hover:2,act:null,carry:-1,wag:1,flapA:1},wt=Re==="none"?null:{x:256+Math.cos(ee+2.2)*205*1.3,y:256+Math.sin(ee+2.2)*205*1.3,z:8,a:ee+2.2+Math.PI,v:0,tail:1,flap:0,hover:9,stage:0,timer:0,away:60+i()*120,wag:1,flapA:1},De=(t,a,o,c,n)=>{D.act={k:0,x:t,y:a,hover:o,v:c,then:n}},ba=(t,a)=>{D.act={k:2,time:t,then:a}},Ga=(t,a,o,c,n)=>{const s=la(t),l=Math.cos(s),f=Math.sin(s),h=256+l*a,u=256+f*a;De(h,u,c?6:9,(c?92:78)*(1+m.hurry*.5),()=>{D.act={k:1,ux:-l,uy:-f,an:s,rTo:o,rep:c,dmg:n,spoke:t,ramp:0}})},ko=t=>{const a=la(t),o=Math.cos(a),c=Math.sin(a);let n=0;for(let s=0;s<6;s++){const l=205*(.45+s*.1),f=256+o*l|0,h=256+c*l|0,u=h*512+f;n+=Math.max(0,w[u]-Rt[u]);const v=l*3.14159/_,C=-c*v,b=o*v,N=(h+b|0)*512+(f+C|0),G=(h-b|0)*512+(f-C|0);n+=Math.max(0,Rt[N]-w[N])+Math.max(0,Rt[G]-w[G])}return n},Wa=()=>{let t=-1,a=1e12;for(let o=0;o<Vt;o++)if(ce[o]===1){const c=(qt[o]-D.x)**2+(Yt[o]-D.y)**2-(re[o]>2?1e7:0);c<a&&(a=c,t=o)}return t},go=()=>{const t=Math.atan2(D.y-256,D.x-256);let a=0,o=-1e9;for(let s=0;s<7;s++){const l=Math.floor((t-Mt)*j+(i()-.5)*10+_*8)%_;let f=0;const h=Mt+(l+.5)/j;for(let v=0;v<Vt;v++)if(ce[v]===0){const C=Math.atan2(Yt[v]-256,qt[v]-256);Math.abs((C-h+9.42477796)%6.2831853-3.14159265)<3.14/_&&f++}const u=-f-i()*.4;u>o&&(o=u,a=l)}const c=Mt+(a+.5)/j,n=205*(.52+i()*.42);return ga(256+Math.cos(c)*n,256+Math.sin(c)*n)},Xe=()=>{if(wt&&wt.stage===2){De(wt.x+8,wt.y+4,5,90,()=>{D.act={k:4,time:9+i()*3,ang:i()*6.28},wt.stage=3});return}{const n=Wa();if(n>=0&&re[n]>2){Qa(n);return}}if(gt.length){let n=0,s=1e12;for(let b=0;b<gt.length;b++){const N=(gt[b].x-D.x)**2+(gt[b].y-D.y)**2;N<s&&(s=N,n=b)}const l=gt[n],f=l.x-256,h=l.y-256,u=Math.hypot(f,h);if(u<205*.38){De(l.x,l.y,3,70,()=>{D.act={k:3,time:1.4,nextPuff:0,px:l.x,py:l.y,dmg:l}});return}const v=Math.atan2(h,f),C=(Math.round((v-Mt)*j)%_+_)%_;l.n++,Ga(C,Math.min(205*1,u+28),Math.max(205*.38,u-28),!0,l);return}const t=Wa();if(t>=0&&m.runs>=2){Qa(t);return}if(m.fine>22){const n=i()*6.283,s=205*i()*.3,l=256+Math.cos(n)*s,f=256+Math.sin(n)*s;De(l,f,3,72,()=>{D.act={k:3,time:2.2+i()*1.6,nextPuff:0,px:l,py:f,dmg:null}});return}let a=0,o=-1e9;const c=Math.atan2(D.y-256,D.x-256);for(let n=0;n<_;n++){const s=la(n),l=Math.abs((s-c+9.42477796)%6.2831853-3.14159265),f=ko(n)*.35-l*1.6+i()*3;f>o&&(o=f,a=n)}Ga(a,205*.99,205*.4,!1,null)},Qa=t=>{m.runs=0,De(qt[t],Yt[t],2.5,80,()=>{ba(.45,()=>{if(ce[t]!==1){Xe();return}ce[t]=2,D.carry=t,de=!0,re[t]=re[t]%1,r.sound.hit("click",.25,{pan:(D.x-256)/400}),ua(qt[t],Yt[t],2,5);const a=go();De(a[0],a[1],6,70,()=>{ba(.3,()=>{ce[t]=0,D.carry=-1,qt[t]=a[0],Yt[t]=a[1],se[t]=Ut(a[0],a[1])+.4,de=!0,r.sound.hit("blip",.08,{freq:2200,pan:(D.x-256)/400}),ua(a[0],a[1],a[2],3),Xe()})})})})},ua=(t,a,o,c)=>{for(let n=0;n<c;n++){const s=i()*6.283,l=6+i()*14;Ie(t+i()*4-2,a+i()*4-2,o+1,Math.cos(s)*l,Math.sin(s)*l,6+i()*10,1+i()*1.4,8+i()*9,.17)}};D.act={k:2,time:.55,then:null},D.act.then=()=>{D.act={k:1,ux:-Math.cos(ee),uy:-Math.sin(ee),an:ee,rTo:205*.4,rep:!1,dmg:null,spoke:Lt,ramp:0}},D.z=Ut(D.x,D.y)+2;const zo=(t,a,o,c,n,s)=>{const l=Math.hypot(t-256,a-256),f=Math.max(5,3.14159*l/_),h=n?f*1.45:f*1.2,u=6.5,v=Math.ceil(Math.max(h,u)),C=Math.max(1,t-v|0),b=Math.min(510,t+v|0),N=Math.max(1,a-v|0),G=Math.min(510,a+v|0),S=(n?.34:.055)*s,Y=n?1:Math.min(1,m.load/8);let at=0,mt=0;for(let $=N;$<=G;$++){const it=$*512,W=$-a;for(let F=C;F<=b;F++){const E=F-t,U=E*o+W*c,K=E*-c+W*o,lt=1-U*U/(u*u),Gt=1-K*K/(h*h);if(lt<=0||Gt<=0)continue;const zt=lt*Gt,Z=it+F;let Wt=(Rt[Z]-w[Z])*S*zt;const Vo=Math.exp(-K*K/7)*lt;Wt-=Vo*.05*s*Math.max(0,Math.min(1,(w[Z]-Rt[Z]+1.2)*1.5)),Wt<0?(w[Z]+=Wt,at-=Wt,yt[Z]-=.012*zt,m.fine-=Wt*.012*yt[Z]):(Wt*=Y,w[Z]+=Wt,mt+=Wt,yt[Z]*=1-.012*zt);const Ca=255*zt;ht[Z]<Ca&&Math.abs(K)<h*.75&&(ht[Z]=Ca>255?255:Ca)}}m.load=Math.max(0,Math.min(200,m.load+at-mt)),ra(0,C,N,b,G)},Ka=(t,a,o)=>{const c=o?13:16,n=Math.max(1,t-c|0),s=Math.min(510,t+c|0),l=Math.max(1,a-c|0),f=Math.min(510,a+c|0),h=o?.1:.022;for(let u=l;u<=f;u++)for(let v=n;v<=s;v++){const C=(v-t)*(v-t)+(u-a)*(u-a);if(C>=c*c)continue;const b=1-C/(c*c),N=u*512+v;w[N]+=(Rt[N]-w[N])*h*b,yt[N]+=(.98-yt[N])*.03*b,ht[N]<70*b&&(ht[N]=70*b)}m.fine=Math.max(0,m.fine-.06),ra(0,n,l,s,f)},Za=6.5,_o=(t,a,o,c)=>{const n=Math.ceil(Za*2.1),s=Math.max(1,t-n|0),l=Math.min(510,t+n|0),f=Math.max(1,a-n|0),h=Math.min(510,a+n|0);let u=0,v=0;for(let Y=-3;Y<=3;Y++)u+=Ut(t+Y*7*-c,a+Y*7*o),v++;u=u/v-3.2,u=Math.min(u,Ut(t,a)-1.6);const C=Ae[((a/16|0)*33+(t/16|0))%1089],b=be[((a/4|0)*129+(t/4|0))%16641],N=Za*(.72+.3*C+.26*b);let G=0,S=0;for(let Y=f;Y<=h;Y++)for(let at=s;at<=l;at++){const mt=at-t,$=Y-a,it=Math.abs(mt*-c+$*o);if(Math.abs(mt*o+$*c)>4||it>=n)continue;const F=Y*512+at;if(it<N){const E=it/N,U=E*E*(1.5-.5*E),K=u+U*7;if(w[F]>K){const lt=(w[F]-K)*.5;w[F]-=lt,G+=lt,yt[F]+=(.32-yt[F])*.1}ht[F]<170&&(ht[F]=170)}else S+=1-(it-N)/(n-N)}if(S>0){const Y=G/S;for(let at=f;at<=h;at++)for(let mt=s;mt<=l;mt++){const $=mt-t,it=at-a,W=Math.abs($*-c+it*o);if(Math.abs($*o+it*c)>4||W>=n||W<N)continue;const E=at*512+mt;w[E]+=Y*(1-(W-N)/(n-N)),ht[E]<110&&(ht[E]=110)}}Io(s,f,l,h),ra(1,s-1,f-1,l+1,h+1)},Io=(t,a,o,c)=>{for(let s=0;s<3;s++)for(let l=a;l<=c;l++)for(let f=t;f<=o;f++){const h=l*512+f;let u=w[h]-w[h+1];if(u>.62){const v=(u-.62)*.24;w[h]-=v,w[h+1]+=v}else if(u<-.62){const v=(-u-.62)*.24;w[h]+=v,w[h+1]-=v}if(u=w[h]-w[h+512],u>.62){const v=(u-.62)*.24;w[h]-=v,w[h+512]+=v}else if(u<-.62){const v=(-u-.62)*.24;w[h]+=v,w[h+512]-=v}}},ja=(t,a,o,c)=>{const n=Math.max(6,t),s=Math.min(505,t+63),l=Math.max(6,a),f=Math.min(505,a+63),h=Math.round(Ge*c),u=Math.round(We*c),v=u*512+h,C=o*.35;for(let b=l;b<=f;b++){const N=b*512;for(let G=n;G<=s;G++){const S=N+G,Y=w[S],at=(w[S-4]+w[S+4]+w[S-4*512]+w[S+4*512])*.25,mt=(w[S-1]+w[S+1]+w[S-512]+w[S+512])*.25,$=Y-at;let it=$>0?$*o*(.35+.65*yt[S]):0;const W=S+v;w[S]=Y-it+(mt-Y)*C,W>0&&W<512*512&&(w[W]+=it),it>.004&&(yt[S]-=it*.05),ht[S]>0&&(ht[S]=ht[S]>3?ht[S]-3:0)}}ra(2,n-6,l-6,s+6+Math.abs(h),f+6+Math.abs(u))},Le=1/30,Do=(t,a)=>{const o=t.act;let c=t.hover;if(o.k===0){const n=o.x-t.x,s=o.y-t.y,l=Math.hypot(n,s);let h=(Math.atan2(s,n)-t.a+9.42477796)%6.2831853-3.14159265;t.a+=Math.max(-1,Math.min(1,h))*a*7.5;const u=o.v*Math.min(1,l/18+.2)*(.35+.65*Math.max(0,Math.cos(h)));if(t.v+=(u-t.v)*a*8,t.x+=Math.cos(t.a)*t.v*a,t.y+=Math.sin(t.a)*t.v*a,c=o.hover,t.wag=1,t.flapA=1,l<4.5&&Math.abs(h)<1.6||l<2){const v=o.then;o.then=null,v&&v()}}else if(o.k===1){o.ramp=Math.min(1,o.ramp+a*3);let s=(Math.atan2(o.uy,o.ux)-t.a+9.42477796)%6.2831853-3.14159265;t.a+=s*Math.min(1,a*9)+Math.sin(m.t*13)*.006;const l=1+m.hurry*.55,f=.68+.42*Math.sin(m.t*8.5)+.2*Math.sin(m.t*3.3+1);t.v+=((o.rep?26:32)*l*f*o.ramp-t.v)*a*7,t.x+=o.ux*t.v*a,t.y+=o.uy*t.v*a;const h=256+Math.cos(o.an)*Math.hypot(t.x-256,t.y-256),u=256+Math.sin(o.an)*Math.hypot(t.x-256,t.y-256);t.x+=(h-t.x)*a*3,t.y+=(u-t.y)*a*3,c=.55,t.wag=1.5,t.flapA=1;const v=Math.hypot(t.x-256,t.y-256);if(zo(t.x-o.ux*2,t.y-o.uy*2,o.ux,o.uy,o.rep,Math.min(1,t.v/22)*(1+m.hurry*.3)),t.v>8){const C=Math.min(1,t.v/24);for(let b=0;b<3;b++){const N=(i()-.5)*6,G=i(),S=(i()-.5)*26;Ie(t.x-o.ux*(3+G*5)-o.uy*N,t.y-o.uy*(3+G*5)+o.ux*N,t.z-.6+i()*1.2,-o.ux*(2+i()*7)-o.uy*S,-o.uy*(2+i()*7)+o.ux*S,2+i()*7,1.5+i()*2,5+i()*5,.34*C)}if(i()<.7){const b=i()<.5?-1:1;Ie(t.x-o.ux*6-o.uy*b*4,t.y-o.uy*6+o.ux*b*4,t.z-.5,-o.uy*b*(6+i()*10)-o.ux*4,o.ux*b*(6+i()*10)-o.uy*4,4+i()*8,.5+i()*.7,1.2+i()*1.8,.45)}}if((m.hiss-=a)<0&&(m.hiss=.26+i()*.1,r.sound.hit("noise",.07+i()*.05,{cutoff:1600+i()*900,dur:.28,pan:(t.x-256)/500})),v<=o.rTo){const C=o.dmg;if(m.runs++,t.v*=.5,C){let b=0;for(let N=-2;N<=2;N++)for(let G=-2;G<=2;G++){const S=(C.y+G*4|0)*512+(C.x+N*4|0);if(S>0&&S<512*512){const Y=Math.abs(Rt[S]-w[S]);Y>b&&(b=Y)}}if(b<1.6||C.n>=5){const N=gt.indexOf(C);N>=0&&gt.splice(N,1)}}ba(i()<.18/(1+m.hurry*3)?.9+i()*1.8:.08+i()*.22/(1+m.hurry),Xe)}}else if(o.k===2){if(t.v*=1-a*6,t.x+=Math.cos(t.a)*t.v*a,t.y+=Math.sin(t.a)*t.v*a,o.time>.4&&(t.a+=Math.sin(m.t*1.7+t.tail*.05)*a*.9),t.wag=.55,t.flapA=1,o.time-=a,o.time<=0){const n=o.then;o.then=null,n&&n()}c=t.hover}else if(o.k===3){if(o.time-=a,t.a+=Math.sin(m.t*4)*.12,t.x+=Math.cos(t.a)*7*a*Math.sin(m.t*2.3),t.y+=Math.sin(t.a)*7*a*Math.sin(m.t*2.3),t.wag=.7,t.flapA=1.4,c=2,Ka(t.x,t.y,!!o.dmg),o.nextPuff-=a,o.nextPuff<=0){o.nextPuff=.28+i()*.3;const n=i()<.5?1:-1,s=Math.cos(t.a),l=Math.sin(t.a);for(let f=0;f<3;f++)Ie(t.x-l*n*7,t.y+s*n*7,t.z+1,-l*n*(10+i()*16),s*n*(10+i()*16),5+i()*9,.8+i(),5+i()*6,.2);i()<.4&&r.sound.hit("noise",.03,{cutoff:2600,dur:.12})}if(o.time<=0){if(o.dmg){const n=gt.indexOf(o.dmg);n>=0&&gt.splice(n,1)}else m.fine=Math.max(0,m.fine-16);Xe()}}else if(o.k===4){o.time-=a,o.ang+=a*1.15*(1+.3*Math.sin(m.t*2));const n=wt.x+Math.cos(o.ang)*11,s=wt.y+Math.sin(o.ang)*11;t.x+=(n-t.x)*a*4.5,t.y+=(s-t.y)*a*4.5;let f=(o.ang+1.57-t.a+9.42477796)%6.2831853-3.14159265;t.a+=f*a*7,t.v=14,t.wag=1.6,t.flapA=1.3,c=2.2,Ka(t.x,t.y,!1),i()<.12&&ua(t.x,t.y,t.z,1),o.time<=0&&(wt.stage=4,wt.timer=0,Xe())}if(t.hover+=(c-t.hover)*a*5,t.z=Ut(t.x,t.y)+t.hover,t.tail+=a*(9+t.v*.32)*t.wag,t.flap+=a*(17+t.v*.12)*t.flapA,t.carry>=0){const n=t.carry;qt[n]=t.x+Math.cos(t.a)*12,Yt[n]=t.y+Math.sin(t.a)*12,se[n]=t.z+.6,de=!0}},Xo=(t,a)=>{if(t.stage===0){t.timer+=a;const o=256-t.x,c=256-t.y,n=Math.hypot(o,c);let s=(Math.atan2(c,o)-t.a+9.42477796)%6.2831853-3.14159265;t.a+=s*a*2+Math.sin(m.t*.9)*a*.2,t.v+=(30-t.v)*a*2,t.x+=Math.cos(t.a)*t.v*a,t.y+=Math.sin(t.a)*t.v*a,n<8&&(t.stage=2,t.v=0)}else if(t.stage===2||t.stage===3)t.a+=Math.sin(m.t*.7)*a*.25,t.hover+=(2-t.hover)*a*3;else if(t.stage===4){t.timer+=a,t.v+=(46-t.v)*a*1.5;let o=ee+2.2,c=(o-t.a+9.42477796)%6.2831853-3.14159265;t.a+=c*a*2,t.x+=Math.cos(t.a)*t.v*a,t.y+=Math.sin(t.a)*t.v*a,t.hover+=(9-t.hover)*a*2,t.timer>t.away&&(t.stage=0,t.timer=0,t.away=50+i()*140,t.x=256+Math.cos(o)*205*1.5,t.y=256+Math.sin(o)*205*1.5,t.a=o+Math.PI)}t.z=Ut(t.x,t.y)+t.hover,t.tail+=a*(7+t.v*.3)*t.wag,t.flap+=a*13},Lo=t=>{m.t+=t,m.frame++,m.hurry=Math.max(0,m.hurry-t/30);const a=m.surge>0,o=a?42:2.4;m.turb+=((a?.2:0)-m.turb)*t*(a?1.6:.45),m.snowX+=Ge*o*t,m.snowY+=We*o*t,Do(D,t),wt&&Xo(wt,t),m.notice>0&&(m.notice-=t,m.notice<=0&&gt.length&&D.act.k!==4&&(D.v*=.4,D.carry<0&&Xe()));for(let s=0;s<Vt;s++)if(ce[s]===3){const l=Ut(qt[s],Yt[s])+.2;se[s]-=t*62,ya[s]+=t*3.4,na[s]=Math.sin(m.t*5+s)*.7,qt[s]+=Math.cos(m.t*3+s)*t*8,Yt[s]+=Math.sin(m.t*2.4+s)*t*8,se[s]<=l&&(se[s]=l,na[s]*=.3,ce[s]=1,re[s]+=3,ua(qt[s],Yt[s],l,4),r.sound.hit("click",.12),m.runs=9),de=!0}const c=Math.exp(-t*1.8),n=t*9;for(let s=0;s<ct;s++){if(_e[s]+=t,_e[s]>=Ve[s]||Se[s]<-30){ct--,Oe[s]=Oe[ct],He[s]=He[ct],Se[s]=Se[ct],ke[s]=ke[ct],ge[s]=ge[ct],ze[s]=ze[ct],_e[s]=_e[ct],Ve[s]=Ve[ct],ca[s]=ca[ct],ia[s]=ia[ct],s--;continue}ke[s]=ke[s]*c+Ge*o*(1-c)*2,ge[s]=ge[s]*c+We*o*(1-c)*2,ze[s]=ze[s]*c-n,Oe[s]+=ke[s]*t,He[s]+=ge[s]*t,Se[s]+=ze[s]*t}if(a){for(let s=0;s<3;s++){const l=te[m.swIdx++%te.length];ja(l[0],l[1],.17,6)}for(let s=0;s<40;s++){const l=30+i()*452,f=30+i()*452,h=(f|0)*512+(l|0);if(w[h]>3&&w[h]-(w[h-5]+w[h+5]+w[h-5*512]+w[h+5*512])*.25>.7){const u=34+i()*50;Ie(l,f,w[h]+1,Ge*u+(i()-.5)*9,We*u+(i()-.5)*9,2+i()*10,.9+i()*1.3,5+i()*8,.3)}}}else if(++m.sweep>=36){m.sweep=0;const s=te[m.swIdx++%te.length];ja(s[0],s[1],.016,2)}},B={cnt:0,was:!1,x:0,y:0,t0:0,sx:0,sy:0,moved:!1,lastX:0,lastY:0,held:0},Uo=(t,a)=>{const o=2*t-1,c=1-2*a,n=J[0]+(tt[0]*o+V[0]*c)*Kt,s=J[1]+(tt[1]*o+V[1]*c)*Kt,l=J[2]+(tt[2]*o+V[2]*c)*Kt,f=-rt[2]/l;return[rt[0]+n*f,rt[1]+s*f]},qo=(t,a)=>{if(!(Math.hypot(t-256,a-256)>205*1.04||gt.length>24)){for(const c of gt)if((c.x-t)**2+(c.y-a)**2<20*20)return;gt.push({x:t,y:a,n:0})}},Yo=t=>{const a=r.input;a.taps();const o=a.inside&&a.down;if(o){const c=Uo(a.x,a.y);if(B.was||(B.t0=m.t,B.sx=c[0],B.sy=c[1],B.lastX=c[0],B.lastY=c[1],B.moved=!1,B.held=0),Math.hypot(c[0]-B.sx,c[1]-B.sy)>9&&(B.moved=!0),B.moved){m.surge=0;let s=c[0]-B.lastX,l=c[1]-B.lastY,f=Math.hypot(s,l);if(f>2.2){const h=s/f,u=l/f,v=Math.min(40,Math.floor(f/2.2));for(let C=1;C<=v;C++){const b=B.lastX+h*2.2*C,N=B.lastY+u*2.2*C;b>4&&N>4&&b<507&&N<507&&(_o(b,N,h,u),++B.cnt%6===0&&qo(b,N),i()<.3&&Ie(b,N,Ut(b,N)+2,(i()-.5)*18,(i()-.5)*18,6+i()*9,.8+i()*.8,5+i()*7,.17))}B.lastX+=h*2.2*v,B.lastY+=u*2.2*v,i()<.5&&r.sound.hit("noise",.09,{cutoff:2100,dur:.14}),m.notice=Math.max(m.notice,.55),D.act.k===1&&!D.act.rep&&(m.notice=.55)}}else m.t-B.t0>.3&&(m.surge=Math.max(m.surge,.05),B.held+=t,m.hurry=Math.min(1,m.hurry+t*.28),(m.water-=t)<0&&(m.water=.5,r.sound.hit("noise",.16,{cutoff:1100,dur:.6})))}else if(B.was&&!B.moved&&m.t-B.t0<=.3){const c=B,n=c.sx,s=c.sy;if(n>8&&s>8&&n<504&&s<504){const l=pa(n,s,90,3);re[l]=re[l]%1}}B.was=o,m.surge>0&&(m.surge-=t)},Bo=()=>{for(let t=0;t<Vt;t++){const a=t*8;$t[a]=qt[t],$t[a+1]=Yt[t],$t[a+2]=se[t],$t[a+3]=ya[t],$t[a+4]=ka[t],$t[a+5]=Co,$t[a+6]=re[t]%1,$t[a+7]=na[t]}},Na=Dt?[.2,.17,.13]:[0,1,2].map(t=>(ft[0][t]*.5+ft[1][t]*.5)*[1.08,.98,.82][t]),$a=Na.map(t=>Math.min(.9,t*1.22+.03)),Oo=Dt?[.07,.07,.075]:[ft[1][0]*.95,ft[1][1]*.95,ft[1][2]*.95],Ja=new Float32Array(3);{const t=z==="dusk"?.62:1;for(let a=0;a<3;a++)Ja[a]=Math.min(1,Math.pow(Math.min(1,Oo[a]*(I.amb[a]*2.6+I.sun[a]*.62)*he),.4545)*t*.98)}const Fa=[ft[1][0]*I.amb[0]*4+I.near[0]*.6,ft[1][1]*I.amb[1]*4+I.near[1]*.6,ft[1][2]*I.amb[2]*4+I.near[2]*.6],O=new Float32Array(24),H=new Float32Array(12),fa=(t,a,o,c,n,s,l)=>{const f=T.fish,h=Math.cos(t.a),u=Math.sin(t.a);if(a){const C=t.hover/Ot;H[0]=t.x-xt[0]*C,H[1]=t.y-xt[1]*C,H[2]=Ut(t.x-xt[0]*C,t.y-xt[1]*C)+.15,H[3]=o,H[4]=h,H[5]=u,H[6]=0,H[7]=0,H[8]=-1.5,H[9]=1.5,H[10]=1.05,H[11]=0}else H[0]=t.x,H[1]=t.y,H[2]=t.z+.55,H[3]=o,H[4]=h,H[5]=u,H[6]=t.hover<3?-.18:-.03,H[7]=0,H[8]=-1.15,H[9]=1.06,H[10]=.95,H[11]=0;e.uniform4fv(f.u.uA,H);const v=Math.max(.25,1-t.hover*.04);O[0]=t.tail,O[1]=t.wag,O[2]=t.flap,O[3]=t.flapA,O[4]=Nt[0]*h+Nt[1]*u,O[5]=-Nt[0]*u+Nt[1]*h,O[6]=Nt[2],O[7]=a,O[8]=s[0],O[9]=s[1],O[10]=s[2],O[11]=c,O[12]=n,O[13]=I.sun[0]*.75,O[14]=I.sun[1]*.75,O[15]=v*(L?.72:.55),O[16]=I.amb[0],O[17]=I.amb[1],O[18]=I.amb[2],O[19]=I.sun[2]*.75,O[20]=Math.max(.03,1.9/(o*y/470)),O[21]=l,O[22]=he*1.1,O[23]=0,e.uniform4fv(f.u.uF,O),e.drawArrays(e.TRIANGLE_STRIP,0,4)},ha=11.5;let ma=0;const Ho=()=>{wa(),e.bindFramebuffer(e.FRAMEBUFFER,T.fC),e.viewport(0,0,256,256);{const a=T.cau;e.useProgram(a.p);for(let o=0;o<Ht;o++)Zt[o*4+3]=Be[o]*ma*.55+aa[o];e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.uniform4fv(a.u.uW,Zt),e.uniform1i(a.u.uK,Ht),e.uniform1f(a.u.uE,L?24:10),e.uniform1f(a.u.uG,200),e.bindVertexArray(T.cauVao),e.drawElements(e.TRIANGLES,200*200*6,e.UNSIGNED_SHORT,0),e.bindVertexArray(T.vao),e.disable(e.BLEND)}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,y,y);{const a=T.comp;e.useProgram(a.p),Jt(0,za,a.u.uT),Jt(1,sa,a.u.uH),Jt(2,T.tC,a.u.uC),e.uniform4fv(a.u.uP,Ft),e.uniform4f(a.u.uTb,Fa[0],Fa[1],Fa[2],m.turb),e.uniform4f(a.u.uCu,Ge,We,ma*.09,ta),e.drawArrays(e.TRIANGLES,0,3)}e.enable(e.BLEND),e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);{const a=T.fish;e.useProgram(a.p),e.uniform4fv(a.u.uP,Ft),fa(D,1,ha,.75,1,Na,1.3),wt&&fa(wt,1,ha*1.12,.45,1.2,$a,4.7)}if(de&&(Bo(),e.bindBuffer(e.ARRAY_BUFFER,Da),e.bufferData(e.ARRAY_BUFFER,$t,e.DYNAMIC_DRAW),de=!1),Vt){const a=T.shell;e.useProgram(a.p),Jt(0,Ma,a.u.uS),Jt(1,T.tC,a.u.uC),e.uniform4fv(a.u.uP,Ft),e.bindVertexArray(La),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Vt),e.bindVertexArray(T.vao)}const t=T.pt;if(e.useProgram(t.p),e.uniform4fv(t.u.uP,Ft),e.uniform1f(t.u.uSz,y/1e3*2),ct>0){for(let a=0;a<ct;a++){const o=a*5,c=_e[a]/Ve[a];Ne[o]=Oe[a],Ne[o+1]=He[a],Ne[o+2]=Se[a],Ne[o+3]=ca[a]*(1+c*2),Ne[o+4]=ia[a]*Math.min(1,c*40)*(1-c)*(1-c)}e.bindVertexArray(Ua),e.bindBuffer(e.ARRAY_BUFFER,Xa),e.bufferData(e.ARRAY_BUFFER,Ne.subarray(0,ct*5),e.DYNAMIC_DRAW),e.uniform4f(t.u.uD,0,0,0,0),e.uniform3fv(t.u.uTint,Ja),e.drawArrays(e.POINTS,0,ct)}{const a=T.fish;e.bindVertexArray(T.vao),e.useProgram(a.p),e.uniform4fv(a.u.uP,Ft),wt&&fa(wt,0,ha*1.12,.45,1.2,$a,4.7),fa(D,0,ha,.75,1,Na,1.3)}e.bindVertexArray(qa),e.useProgram(t.p),e.uniform4fv(t.u.uP,Ft),e.uniform1f(t.u.uSz,y/1e3*2),e.uniform4f(t.u.uD,m.snowX,m.snowY,ma,1),e.uniform3f(t.u.uTint,.62+I.near[0],.66+I.near[1]*.5,.7+I.near[2]*.3),e.drawArrays(e.POINTS,0,64),e.bindVertexArray(null),e.disable(e.BLEND)};let Ra=0,to=0;const eo=(t,a)=>{Yo(a||0),Ra+=Math.min(a||0,.25);let o=0;for(;Ra>=Le&&o<6;)Ra-=Le,Lo(Le),o++,ma+=Le;if(o>0){if((m.frame&1||o>1)&&Aa(0),Aa(1),Aa(2),++to>=20){to=0;for(let c=0;c<Vt;c++)if(ce[c]<2){const n=Ut(qt[c],Yt[c])+.25;Math.abs(n-se[c])>.3&&(se[c]=n,de=!0)}}m.t>2&&(m.click-=Le*o)<0&&(m.click=1.8+i()*5.5,r.sound.hit("click",.04+i()*.05,{pan:i()*1.4-.7})),(m.water-=Le*o)<0&&m.surge<=0&&(m.water=3.2,r.sound.note(36+(i()*3|0),{dur:3.8,vel:.16,wave:"sine",cutoff:180,attack:1}),r.sound.hit("noise",.05,{cutoff:380,dur:3}))}Ho()};return eo(0,0),eo}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
