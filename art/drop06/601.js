// Sand Rooms: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/601.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ft){Ft&&function(){"use strict";const oo={yaw:0,pitch:0,x:0,y:0,z:0},j=(o,t,n)=>o<t?t:o>n?n:o,Ko=(o,t,n)=>{const s=j((n-o)/(t-o),0,1);return s*s*(3-2*s)},Qo=(o,t,n)=>o+(t-o)*n;let Xe=null,tt=null;function no(){if(Xe)return;let o=1612348174;const t=64,n=new Float32Array(t*t*t),s=new Float32Array(t*t*t);for(let u=0;u<n.length;u++){o=o+1831565813|0;let m=Math.imul(o^o>>>15,1|o);m=m+Math.imul(m^m>>>7,61|m)^m,n[u]=((m^m>>>14)>>>0)/4294967296}const h=[1/16,4/16,6/16,4/16,1/16],w=(u,m,S,R,E)=>{for(let x=0;x<t;x++)for(let P=0;P<t;P++)for(let d=0;d<t;d++){let me=0;for(let i=-2;i<=2;i++)me+=h[i+2]*u[(d+i*S&63)+64*((P+i*R&63)+64*(x+i*E&63))];m[d+64*(P+64*x)]=me}};w(n,s,1,0,0),w(s,n,0,1,0),w(n,s,0,0,1),Xe=new Float32Array(t*t*t),tt=new Uint16Array(t*t*t);const y=new Float32Array(1),D=new Uint32Array(y.buffer);for(let u=0;u<s.length;u++){const m=j(.5+(s[u]-.5)*3.2,0,1);y[0]=m;const S=D[0],R=(S>>>23&255)-112,E=R<=0?0:R<<10|(S&8388607)>>>13;tt[u]=E;const x=E>>10,P=E&1023;Xe[u]=x===0?0:Math.pow(2,x-15)*(1+P/1024)}}function ao(o,t,n){o=o*64-.5,t=t*64-.5,n=n*64-.5;const s=Math.floor(o),h=Math.floor(t),w=Math.floor(n),y=o-s,D=t-h,u=n-w;let m=0;for(let S=0;S<2;S++)for(let R=0;R<2;R++)for(let E=0;E<2;E++)m+=(E?y:1-y)*(R?D:1-D)*(S?u:1-u)*Xe[(s+E&63)+64*((h+R&63)+64*(w+S&63))];return m}const ne=(o,t,n,s)=>ao(o/s/16,t/s/16,n/s/16),ot=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,pe=`
uniform vec4 uP[22];
uniform sampler3D uN;
#ifdef E8
uniform sampler2D uD,uS,uV,uB;
uniform highp usampler2D uT,uA,uE,uGv;
uvec4 pk(vec4 v){return uvec4(packHalf2x16(vec2(v.x,0.)),packHalf2x16(vec2(v.y,0.)),packHalf2x16(vec2(v.z,0.)),packHalf2x16(vec2(v.w,0.)));}
vec4 uk(uvec4 u){return vec4(unpackHalf2x16(u.x).x,unpackHalf2x16(u.y).x,unpackHalf2x16(u.z).x,unpackHalf2x16(u.w).x);}
#else
uniform sampler2D uD,uS,uGv,uT,uA,uE,uV,uB;
#endif
#ifdef NL
vec4 sL(vec2 uv){ivec2 m=textureSize(uS,0)-1;vec2 q=uv*vec2(m+1)-.5,f=fract(q);ivec2 i=ivec2(floor(q));
  vec4 a=texelFetch(uS,clamp(i,ivec2(0),m),0),b=texelFetch(uS,clamp(i+ivec2(1,0),ivec2(0),m),0),c=texelFetch(uS,clamp(i+ivec2(0,1),ivec2(0),m),0),d=texelFetch(uS,clamp(i+1,ivec2(0),m),0);
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
#endif
#define NR int(uP[8].w)
#define TMAX 280.
float n3(vec3 p){return textureLod(uN,p,0.).r;}
#define NS(p,m) n3((p)/(m)/16.)
vec4 Dt(int r,int k){return texelFetch(uD,ivec2(k,r),0);}
float boxD(vec3 p,vec3 a,vec3 b){vec3 d=max(a-p,p-b);return length(max(d,vec3(0)))+min(max(d.x,max(d.y,d.z)),0.);}
int roomAt(float z){int i=0;int n=NR;for(int k=0;k<n-1;k++){if(z>.5*(Dt(k,0).w+Dt(k+1,0).z))i=k+1;}return i;}
float h21(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
#ifdef NL
vec3 sandT(vec2 xz){vec2 uv=(xz-uP[10].xy)/(uP[10].zw-uP[10].xy);return sL(uv).rgb;}
#else
vec3 sandT(vec2 xz){vec2 uv=(xz-uP[10].xy)/(uP[10].zw-uP[10].xy);return textureLod(uS,uv,0.).rgb;}
#endif
float sandH(vec2 xz){
  vec2 uv=(xz-uP[10].xy)/(uP[10].zw-uP[10].xy);
  float o=max(abs(uv.x-.5),abs(uv.y-.5))*2.;
  float out_=1.05+.45*(NS(vec3(xz,.4),9.)-.5)+1.3*(NS(vec3(xz,.8),38.)-.5);
  // one big dune off the main opening's side: a long windward back and a steep slip face with a sharp crest
  vec2 dq=xz-uP[17].xy;float u=dot(dq,uP[16].zw)+3.*(NS(vec3(xz,1.9),14.)-.5)*uP[17].w*.4;
  out_+=max(uP[17].w-(u<0.?.24*(-u):.66*u),0.)*smoothstep(1.,.2,abs(dot(dq,vec2(-uP[16].w,uP[16].z)))/(uP[17].z+.01));
  if(o>=1.)return out_;
#ifdef NL
  float inn=sL(uv).r;
#else
  float inn=textureLod(uS,uv,0.).r;
#endif
  return mix(inn,out_,smoothstep(.86,1.,o));
}
float rag(vec3 q){float j=h21(vec2(floor(q.y/.078),7.1));float m=smoothstep(.5,.72,NS(q,.55));return .2*(NS(q,.38)-.5)+.07*(NS(q.zyx+3.1,.09)-.5)+.012*(NS(q+1.7,.025)-.5)+m*.05*(j-.3);}
// the sun's line through the house: 1 where it gets through (penumbra grows with distance)
float openMask(vec2 q,vec4 r,float s,float rg){float e=min(min(q.x-r.x,r.y-q.x),min(q.y-r.z,r.w-q.y))-rg;return smoothstep(-s,s,e);}
// glazing bars of a sash: nb columns, rows about .42 m; distance to the nearest bar
float barD(vec2 q,vec4 c,float nb){
float wa=(c.y-c.x)/nb,y0=max(c.z,0.),nr=max(floor((c.w-y0)/.56+.5),1.),wy=(c.w-y0)/nr;
  float da=abs(mod(q.x-c.x+.5*wa,wa)-.5*wa),dy=abs(mod(q.y-y0+.5*wy,wy)-.5*wy);return min(da,dy);}
float sunVis(vec3 p,int r0){
  vec3 L=uP[4].xyz; int r=r0; float mult=1.,res=0.; bool go=true;
  // a point at the foot of a wall is kept inside its room, so no sun leaks along the seam
  vec4 R0=Dt(r0,0); p.x=clamp(p.x,R0.x+.01,R0.y-.01); p.z=clamp(p.z,R0.z+.01,R0.w-.01);
  for(int hop=0;hop<NR&&go;hop++){
    vec4 R=Dt(r,0); float h=Dt(r,1).x;
    float tx=L.x<0.?(R.x-p.x)/min(L.x,-1e-4):(R.y-p.x)/max(L.x,1e-4);
    float tz=L.z<0.?(R.z-p.z)/L.z:(R.w-p.z)/max(L.z,1e-4);
    float ty=(h-p.y)/max(L.y,1e-4);
    go=false;
    if(ty<tx&&ty<tz){vec3 q=p+L*ty; float v=0.,sf=.012+ty*.012; for(int k=0;k<3;k++){vec4 c=Dt(r,5+k);if(c.y>c.x)v=max(v,openMask(q.xz,c,sf,rag(q)));}
      // rafters over the holes cut the light into stripes
      float zr=abs(mod(q.z+L.z/L.y*.2,1.1)-.55);v*=smoothstep(.03-sf,.03+sf+.01,zr);
      res=v*mult;}
    else{
      bool xw=tx<tz; float t=xw?tx:tz; vec3 q=p+L*t; vec2 a=xw?q.zy:q.xy; vec4 c=vec4(0); bool hopz=false;
      float nb=0.;
      if(xw){c=L.x<0.?Dt(r,3):Dt(r,4);nb=L.x<0.?Dt(r,12).x:Dt(r,12).y;}
      else if(L.z<0.){if(r==0){c=vec4(uP[11].xy,-1.,uP[11].z);}else{vec4 d=Dt(r-1,2);c=vec4(d.xy,-1.,d.z);hopz=true;}}
      else{vec4 d=Dt(r,2);c=vec4(d.xy,-1.,d.z);hopz=r<NR-1;}
      float sf=.012+t*.012;
      float v=c.y>c.x?openMask(a,c,sf,0.):0.;
      // the opening's far face too: a grazing ray that slips in at the inner face meets the reveal (the bright seam)
      vec3 q2=q+L*(uP[11].w/max(abs(xw?L.x:L.z),1e-3));v*=openMask(xw?q2.zy:q2.xy,c,sf,0.);
      if(nb>.5)v*=smoothstep(.016-sf*.7,.016+sf*.7+.004,barD(a,c,nb));
      if(hopz){if(v>0.){mult*=v;r+=L.z<0.?-1:1;go=true;}}else res=v*mult;
    }
  }
  return res;
}
vec3 skyC(vec3 d){
  float y=max(d.y,0.);
  vec3 c=mix(uP[7].rgb,uP[6].rgb,sqrt(y));
  c+=uP[5].rgb*.12*pow(max(dot(d,uP[4].xyz),0.),5.);
  return c;
}
vec3 outsideRad(vec3 d){
  if(d.y>0.)return skyC(d);
  float e=uP[5].r*uP[4].y; return uP[13].rgb*(uP[5].rgb*uP[4].y+vec3(.7,.8,.95)*.4)/3.1416;
}
// ambient cube lookup (filtered by hand)
ivec3 gn(){return ivec3(uP[14].xyz);}
#ifdef E8
vec3 giFetch(ivec3 c,int f){ivec3 n=gn();c=clamp(c,ivec3(0),n-1);return uk(texelFetch(uGv,ivec2(c.x+c.y*n.x,c.z+f*n.z),0)).rgb;}
#else
vec3 giFetch(ivec3 c,int f){ivec3 n=gn();c=clamp(c,ivec3(0),n-1);return texelFetch(uGv,ivec2(c.x+c.y*n.x,c.z+f*n.z),0).rgb;}
#endif
vec3 giCube(ivec3 c,vec3 n){vec3 s=n*n;
  return s.x*giFetch(c,n.x>0.?0:1)+s.y*giFetch(c,n.y>0.?2:3)+s.z*giFetch(c,n.z>0.?4:5);}
vec3 giEval(vec3 p,vec3 n){
  ivec3 N=gn();
  vec3 v=(p-uP[8].xyz)/(uP[9].xyz-uP[8].xyz)*vec3(N)-.5;
  v=clamp(v,vec3(0),vec3(N)-1.001);
  ivec3 i=ivec3(floor(v));vec3 f=v-vec3(i);
  vec3 s=vec3(0);
  for(int k=0;k<int(uP[19].z);k++){ivec3 o=ivec3(k&1,(k>>1)&1,(k>>2)&1);
    vec3 w=mix(1.-f,f,vec3(o));s+=w.x*w.y*w.z*giCube(i+o,n);}
  return s;
}
`,co="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",ro=`
#ifdef E8
vec4 oC;out highp uvec4 oU;
#else
out vec4 oC;
#endif
vec3 lookupPrev(vec3 q,vec3 n){
  ivec3 N=gn();
  vec3 v=(q-uP[8].xyz)/(uP[9].xyz-uP[8].xyz)*vec3(N)-.5;
  ivec3 c=ivec3(floor(v+.5));
  return giCube(c,n);
}
vec3 shadeHit(vec3 q,vec3 n,vec3 alb,int r){
  float nl=max(dot(n,uP[4].xyz),0.);
  vec3 E=uP[5].rgb*nl*(nl>0.?sunVis(q,r):0.)*smoothstep(0.,.5,uP[15].y)+(uP[15].y>.5?lookupPrev(q+n*.16,n):vec3(0));
  return alb*E/3.1416;
}
vec3 wallAlb(int r){return Dt(r,8).rgb;}
vec3 trace(vec3 o,vec3 d,int r0){
  vec3 res=vec3(0),p=o,hq=vec3(0),hn=vec3(0,1,0),ha=vec3(0); int r=r0; bool live=true,hit=false;
  for(int hop=0;hop<5&&live;hop++){
    vec4 R=Dt(r,0); float h=Dt(r,1).x;
    float tx=d.x>0.?(R.y-p.x)/d.x:d.x<0.?(R.x-p.x)/d.x:1e4;
    float tz=d.z>0.?(R.w-p.z)/d.z:d.z<0.?(R.z-p.z)/d.z:1e4;
    float ty=d.y>0.?(h-p.y)/d.y:1e4;
    float tE=min(tx,min(ty,tz)),tS=-1.;
    if(d.y<.12){for(int j=1;j<=6;j++){float t=tE*float(j)/6.;vec3 q=p+d*t;if(q.y<sandT(q.xz).r){tS=t;break;}}}
    live=false;
    if(tS>0.){vec3 q=p+d*tS;vec3 g=sandT(q.xz);hn=normalize(vec3(-g.y,1.,-g.z));hq=vec3(q.x,g.r,q.z)+hn*.02;ha=uP[13].rgb;hit=true;}
    else if(ty<=tx&&ty<=tz){vec3 q=p+d*ty;bool hole=false;for(int k=0;k<3;k++){vec4 c=Dt(r,5+k);if(q.x>c.x&&q.x<c.y&&q.z>c.z&&q.z<c.w)hole=true;}
      if(hole)res=skyC(d);else{hq=q-vec3(0,.02,0);hn=vec3(0,-1,0);ha=Dt(r,1).yzw;hit=true;}}
    else if(tx<=tz){vec3 q=p+d*tx;vec4 c=d.x<0.?Dt(r,3):Dt(r,4);
      if(c.y>c.x&&q.z>c.x&&q.z<c.y&&q.y>c.z&&q.y<c.w)res=outsideRad(d);
      else{hq=q-vec3(sign(d.x)*.02,0.,0.);hn=vec3(-sign(d.x),0.,0.);ha=wallAlb(r);hit=true;}}
    else{vec3 q=p+d*tz;bool fw=d.z>0.;
      vec4 dr=fw?Dt(r,2):(r>0?Dt(r-1,2):uP[11]);
      bool open=dr.y>dr.x&&q.x>dr.x&&q.x<dr.y&&q.y<dr.z;
      if(open){
        if(fw?r<NR-1:r>0){r+=fw?1:-1;vec4 Rn=Dt(r,0);float tn=((fw?Rn.z:Rn.w)-q.z)/d.z;p=q+d*tn;live=true;}
        else res=outsideRad(d);
      }else{hq=q-vec3(0.,0.,sign(d.z)*.02);hn=vec3(0.,0.,-sign(d.z));ha=wallAlb(r);hit=true;}
    }
  }
  if(hit)res=shadeHit(hq,hn,ha,r);
  return res;
}
#ifdef E8
void mainS(){
#else
void main(){
#endif
  ivec2 c=ivec2(gl_FragCoord.xy);
  ivec3 N=gn();
  int ix=c.x%N.x,iy=c.x/N.x,iz=c.y%N.z,f=c.y/N.z;
  vec3 p=uP[8].xyz+(vec3(ix,iy,iz)+.5)/vec3(N)*(uP[9].xyz-uP[8].xyz);
  // pushed into the room it belongs to and out of the sand
  int r=roomAt(p.z); vec4 R=Dt(r,0); float h=Dt(r,1).x;
  p.x=clamp(p.x,R.x+.08,R.y-.08); p.z=clamp(p.z,R.z+.08,R.w-.08); p.y=clamp(p.y,sandH(p.xz)+.08,h-.08);
  vec3 a=f==0?vec3(1,0,0):f==1?vec3(-1,0,0):f==2?vec3(0,1,0):f==3?vec3(0,-1,0):f==4?vec3(0,0,1):vec3(0,0,-1);
  vec3 T=normalize(abs(a.y)>.5?vec3(1,0,0):cross(a,vec3(0,1,0)));
  vec3 B=cross(a,T);
  float jit=h21(vec2(float(ix+iy*37+iz*113)+float(f)*7.13,.7));
  int M=int(uP[14].w);
  vec3 sum=vec3(0);
  for(int k=0;k<M;k++){
    float u=(float(k)+.5)/float(M),v=fract(float(k)*.618034+jit);
    float s=sqrt(u),c0=sqrt(max(1.-u,0.)),ph=6.28318*v;
    vec3 d=normalize(T*cos(ph)*s+B*sin(ph)*s+a*c0);
    sum+=trace(p,d,r);
  }
  oC=vec4(sum/float(M)*3.1416,1.);
}
#ifdef E8
void main(){mainS();oU=pk(oC);}
#endif
`,io=`
#ifdef E8
vec4 oC;out highp uvec4 oU;
#else
out vec4 oC;
#endif
#ifdef E8
void mainS(){
#else
void main(){
#endif
  ivec2 c=ivec2(gl_FragCoord.xy);
  ivec3 N=gn();
  int ix=c.x%N.x,iy=c.x/N.x,iz=c.y%N.z,f=c.y/N.z;
  vec3 s=giFetch(ivec3(ix,iy,iz),f)*2.;float w=2.;
  float zc=uP[8].z+(float(iz)+.5)/float(N.z)*(uP[9].z-uP[8].z);int r=roomAt(zc);
  for(int k=0;k<6;k++){ivec3 o=k==0?ivec3(1,0,0):k==1?ivec3(-1,0,0):k==2?ivec3(0,1,0):k==3?ivec3(0,-1,0):k==4?ivec3(0,0,1):ivec3(0,0,-1);
    ivec3 q=ivec3(ix,iy,iz)+o;
    if(q.x<0||q.y<0||q.z<0||q.x>=N.x||q.y>=N.y||q.z>=N.z)continue;
    float z2=uP[8].z+(float(q.z)+.5)/float(N.z)*(uP[9].z-uP[8].z);
    if(roomAt(z2)!=r)continue;
    s+=giFetch(q,f);w+=1.;}
  oC=vec4(s/w,1.);
}
#ifdef E8
void main(){mainS();oU=pk(oC);}
#endif
`,nt=`
float bandSeed(float x){return h21(vec2(floor(x/.15),3.7));}
// distance to the air of openings around room r (no roughness)
float aperD(vec3 p,int r){
  vec4 R=Dt(r,0); float a=1e3;
  vec4 d;
  float tw=uP[11].w; vec4 hb=uP[12];
  d=Dt(r,2); if(d.y>d.x)a=min(a,boxD(p,vec3(d.x,-1.,R.w-.1),vec3(d.y,d.z,R.w+tw+.1)));
  if(r>0){d=Dt(r-1,2); if(d.y>d.x)a=min(a,boxD(p,vec3(d.x,-1.,R.z-tw-.1),vec3(d.y,d.z,R.z+.1)));}
  if(r==0){d=uP[11]; a=min(a,boxD(p,vec3(d.x,-1.,hb.z-.5),vec3(d.y,d.z,R.z+.1)));}
#ifdef FALLEN
  // a fallen wall (uP[0].w) breaks along its brick courses, the gap wider toward the top
  float rg=r==0?uP[0].w*(.3*(h21(vec2(floor(p.y/.078),5.3))-.5)+.12*h21(vec2(floor(p.y/.31),1.7))-.26*(p.y-1.2)):0.;
  d=Dt(r,3); if(d.y>d.x)a=min(a,boxD(p,vec3(hb.x-.5,d.z,d.x),vec3(R.x+.1,d.w,d.y))+rg);
  d=Dt(r,4); if(d.y>d.x)a=min(a,boxD(p,vec3(R.y-.1,d.z,d.x),vec3(hb.y+.5,d.w,d.y))+rg);
#else
  d=Dt(r,3); if(d.y>d.x)a=min(a,boxD(p,vec3(hb.x-.5,d.z,d.x),vec3(R.x+.1,d.w,d.y)));
  d=Dt(r,4); if(d.y>d.x)a=min(a,boxD(p,vec3(R.y-.1,d.z,d.x),vec3(hb.y+.5,d.w,d.y)));
#endif
  return a;
}
// joinery: frames with architraves on both faces, glazing bars, one door leaf ajar
float joinD(vec3 p,int r){
  // four openings per room from a table: (along0, along1, y0, y1) and (wall0, wall1, axis is x, bars)
  float d=1e3;
  int n=int(uP[19].x);
  for(int k=0;k<n;k++){
    vec4 c=Dt(r,13+k),w=Dt(r,17+k);
    vec3 q=w.z>.5?p.zyx:p;
    float o=boxD(q,vec3(c.x-.085,max(c.z-.085,-1.),w.x-.026),vec3(c.y+.085,c.w+.085,w.y+.026))-.004;
    float i=boxD(q,vec3(c.x,c.z,w.x-1.),vec3(c.y,c.w,w.y+1.));
    float f=max(o,-i);
    if(w.w>.5)f=min(f,max(max(barD(q.xy,c,w.w)-.016,abs(q.z-.5*(w.x+w.y))-.024),i));
    d=min(d,c.y>c.x?f:1e3);
  }
  return d;
}
float leafD(vec3 p,int r){
  vec4 dr=Dt(r,2),R=Dt(r,0);float an=Dt(r,10).w,d=1e3;
  if(an>0.&&dr.y>dr.x){vec2 dir=vec2(cos(an),-sin(an)),q=p.xz-vec2(dr.x+.03,R.w-.03);
    d=boxD(vec3(dot(q,dir),p.y,dot(q,vec2(-dir.y,dir.x))),vec3(0.,-1.,-.02),vec3(dr.y-dr.x-.06,dr.z-.02,.02))-.003;}
  return d;
}
float gJ=1e3,gL=1e3,gF=1e3;
float mapHouse(vec3 p){
  int r=roomAt(p.z);
  vec4 R=Dt(r,0); float h=Dt(r,1).x; vec4 hb=uP[12];
  float a=boxD(p,vec3(R.x,-1.,R.z),vec3(R.y,h,R.w)),lf=leafD(p,r);
#ifdef FAST
  if(a<-.36)return min(-a-.31,lf); // open air: nothing rough within reach (the march only; shading needs true distance)
#endif
  a=min(a,aperD(p,r)-.035);
  // ceiling holes: board ends break the outline
  if(p.y>h-.3){for(int k=0;k<3;k++){vec4 c=Dt(r,5+k);if(c.y>c.x){
    float j=bandSeed(p.x)*.5-.25;
    a=min(a,boxD(p,vec3(c.x,h-.06,c.z+j),vec3(c.y,h+.7,c.w-j))+.018*(NS(p,.05)-.3));}}}
  a=min(a,-boxD(p,vec3(hb.x,-3.,hb.z),vec3(hb.y,h+.1,hb.w)));
  // plaster relief on all walls
  a+=.012*(NS(p,.12)-.5)+.006*(NS(p+2.,.03)-.5);
  float jn=joinD(p,r);gJ=jn;gL=lf;
  float d=min(-a,min(jn,lf));
  // rafters over the ceiling holes
  if(p.y>h&&p.x>hb.x&&p.x<hb.y&&p.z>hb.z&&p.z<hb.w){float zr=mod(p.z,1.1)-.55;d=min(d,length(vec2(max(abs(zr)-.03,0.),max(abs(p.y-h-.2)-.05,0.)))-.006);}
  // ruined veranda behind the house
  if(p.z<hb.z+.2){float zv=p.z-(hb.z-2.1),xv=mod(p.x+.5,2.3)-1.15;
    float top=2.0+.5*h21(vec2(floor((p.x+.5)/2.3),1.3));
    float wob=.015*(NS(p,.2)-.5);
    d=min(d,max(max(abs(xv)-.075,abs(zv)-.075),p.y-top)+wob);
    float lean=(p.x+3.)*.04;
    d=min(d,max(abs(p.z-(hb.z-2.1))-.06,abs(p.y-(2.35+lean))-.07)+wob);}
  return d;
}
float mapSand(vec3 p){return (p.y-sandH(p.xz))*.78;}
// one house of the town standing in the sand outside, a gable toward us
float farH(vec3 p){
vec4 f=uP[18];vec3 q=p-vec3(f.x,0.,f.y);
  return max(boxD(q,vec3(-f.z,-2.,-f.w),vec3(f.z,7.,f.w)),(q.y-3.4-.55*(f.w-abs(q.z)))*.87);}
float map(vec3 p){float f=farH(p);gF=f;return min(min(mapHouse(p),mapSand(p)),f);}
`,so=`
#ifdef E8
vec4 oC;out highp uvec4 oU;
#else
out vec4 oC;
#endif
#ifdef E8
void mainS(){
#else
void main(){
#endif
  vec2 uv=gl_FragCoord.xy/uP[3].w*2.-1.;
  vec3 rd=normalize(uP[1].xyz+uP[1].w*(uv.x*uP[2].xyz+uv.y*uP[3].xyz)),p=uP[0].xyz;
  float t=.02;int mode=0,left=4;
  for(int i=0;i<154;i++){
    vec3 pq=p+rd*t;float d=map(pq);
    bool oS=pq.x<uP[12].x-.6||pq.x>uP[12].y+.6||pq.z<uP[12].z-.6||pq.z>uP[12].w+.6;
    if(mode==0){if(d<.0005+t*.0006+(oS?t*.0016:0.)){mode=1;}else{t+=max(d*.9,oS?t*.011:0.);if(t>TMAX){t=TMAX;break;}if(i==149&&rd.y>.03)t=TMAX;else if(i==149)mode=1;}}
    if(mode==1){t+=d*.6;left--;if(left==0)break;}
    if(t>=TMAX)break;
  }
  oC=vec4(t,0,0,1);
}
#ifdef E8
void main(){mainS();oU=floatBitsToUint(oC);}
#endif
`,_t=`
#ifdef E8
vec4 oC;out highp uvec4 oU;
#else
out vec4 oC;
#endif
vec2 wUV(vec3 p,vec3 n){return abs(n.y)>.6?p.xz:abs(n.z)>abs(n.x)?p.xy:p.zy;}
// layers: x top coat, y undercoat, z plaster (0 where lost), w plaster-crack. Three independent noises, so the edges of
// paint, undercoat and plaster cross each other instead of nesting as one contour three times.
vec4 layers(vec2 uv,float s,float low,float edge){
  vec2 v=uv;
  float dec=uP[7].w;
  // where the distemper gives up: broad soft areas, more low down (scoured), round openings and at the cracks
  float dmg=NS(vec3(v*vec2(.8,1.3),s+4.),.42)+.3*(NS(vec3(v,s+8.),.12)-.5)+.34*low+.12*edge-.12+(dec>1.5?.16*low:dec>.5?-.1:0.);
  dmg=smoothstep(.3,.72,dmg);
  float c1=.62*NS(vec3(v,s),.075)+.38*NS(vec3(v,s+7.),.026);
  float c2=.65*NS(vec3(v,s+9.),.11)+.35*NS(vec3(v,s+3.),.035);
  float c3=NS(vec3(v,s+11.),.16);
  float tT=.2+.55*dmg,tU=tT-.15,tP=-.1+.5*max(edge*.5,low*.8)+.25*dmg;
  float top=smoothstep(tT-.008,tT+.008,c1),und=smoothstep(tU-.01,tU+.01,c2),pl=smoothstep(tP-.012,tP+.012,c3);
  float cr=1.5*abs(NS(vec3(uv*vec2(1.,.7),s+13.),.1)-.5);
  return vec4(top,und,pl,smoothstep(.018,.0,cr));
}
float bricksH(vec2 uv,float s){
  float row=floor(uv.y/.078+s*3.);
  float x=uv.x+row*.13+s;
  float jx=floor(x/.26);
  vec2 f=vec2(fract(x/.26),fract(uv.y/.078+s*3.));
  float e=min(min(f.x,1.-f.x)*.26,min(f.y,1.-f.y)*.078);
  return smoothstep(.0,.012,e)*(.7+.3*h21(vec2(jx,row)));
}
vec3 wallMat(vec3 p,vec3 n,int r,out float hOut,out vec3 pBump){
  bool flat_=abs(n.y)>.6;
  float sA=flat_?2.:max(p.y-sandT(p.xz).r,0.);
  float low=flat_?0.:(1.-smoothstep(.05,1.1,sA+.3*(NS(p,.15)-.5)));
  float fromTop=Dt(r,1).x-p.y;
  float stainC=smoothstep(.9,.0,fromTop+.3*(NS(p,.4)-.5));
  float edgeF=flat_?0.:1.-smoothstep(.0,.45,aperD(p,r)-.12+.18*(NS(p,.2)-.5));
  // each wall its own pattern (facing walls share a uv plane)
  float s=float(r)*1.37+uP[9].w+n.z*2.1+n.x*4.3;
  vec2 uv=wUV(p,n);
  vec2 e=vec2(.0032,0.);
  vec4 l0=vec4(0);float h0=0.,gx=0.,gy=0.;
  for(int k=0;k<int(uP[19].y);k++){vec4 l=layers(uv+(k==1?e.xy:k==2?e.yx:e.yy),s,low,edgeF);float hh=l.x*.0024+l.y*.0016+l.z*.008;
    if(k==0){l0=l;h0=hh;}else if(k==1)gx=(hh-h0)/e.x;else gy=(hh-h0)/e.x;}
  bool ceilW=n.y<-.6&&fromTop<.22;
  float c2=NS(p,.3),c3=NS(p+1.5,.07);
  vec3 pl=vec3(.74,.70,.60)*(.82+.34*c2)*(1.-.1*l0.w);
  float brickFine=NS(vec3(uv*vec2(1.,2.5),s+2.),.012);
  vec3 brick;
  float lath=step(.5,fract(uv.y/.033));
  if(ceilW){brick=mix(vec3(.22,.15,.09),vec3(.48,.36,.22),lath)*(.8+.4*NS(p,.1));}
  else{float bh=bricksH(uv,s*1.7);brick=mix(vec3(.25,.22,.19),vec3(.52,.3,.2)*(.75+.5*brickFine),bh);}
  vec3 m=mix(brick,pl,l0.z);
  float ageTop=.75+.3*c3;
  // the scheme: a darker dado below a painted line, a stencilled border over it, the field above, a frieze under the ceiling
  vec3 c0=Dt(r,8).rgb,cD=Dt(r,9).rgb,cU=Dt(r,10).rgb,cA=Dt(r,11).rgb;
  float yD=Dt(r,11).w,by=p.y-yD;
  float fx=(fract(uv.x/.2)-.5)*.2,fy=by-.064;
  float mot=Dt(r,12).z<.5?max(step(abs(fx)/.056+abs(fy)/.034,1.),step(length(vec2(abs(fx)-.1,fy)),.012))
    :max(step(.017,length(vec2(fx,fy)))*step(length(vec2(fx,fy)),.031),step(length(vec2(abs(fx)-.1,fy)),.011));
  float fx2=(fract(uv.x/.3+.25)-.5)*.3,fy2=fromTop-.33;
  float mot2=step(abs(fy2)+.45*abs(fx2),.05)*step(.012,abs(fy2)+.45*abs(fx2))+step(abs(abs(fy2)-.075),.005);
  vec3 tc=by<0.?cD:c0;
  tc=mix(tc,mix(c0*1.07,cA,mot),step(.016,by)*step(by,.112));
  tc=mix(tc,cA*.85,step(abs(by),.007)+step(abs(by-.12),.004));
  tc=mix(tc,mix(c0*1.06,cA,min(mot2,1.)),step(.22,fromTop)*step(fromTop,.43)*Dt(r,12).w);
  if(ceilW)tc=vec3(.66,.61,.5);
  vec3 mid2=(ceilW?vec3(.42,.32,.21):cU)*mix(.78,1.05,c2);
  m=mix(m,mid2*ageTop,l0.y*l0.z);
  vec3 top2=tc*mix(.8,1.06,c2)*ageTop;
  // chalky fade and dust
  top2=mix(top2,vec3(dot(top2,vec3(.33)))*1.1,.18+.25*NS(p,.5));
  m=mix(m,top2,l0.x*l0.z*l0.y);
  m*=mix(.9,1.06,smoothstep(.3,.72,NS(vec3(uv.x*1.3,uv.y*.2,s+8.),.5)+.35*(NS(vec3(uv,s+2.5),.8)-.5)));
  // sand-blasted lower wall: paint gives way to pale scoured plaster
  m=mix(m,pl*vec3(.98,.93,.84),low*smoothstep(.25,.8,c2+.3*NS(p,.04))*(uP[7].w>1.5?1.:.6));
  // damp: from the top down in long stains, rising salts low
  float streak=NS(vec3(uv.x*2.5,uv.y*.12,s),.5);
  float damp=stainC*smoothstep(.45,.68,streak+.25*(NS(vec3(uv,s+5.),.6)-.5));
  m*=mix(vec3(1.),vec3(.55,.5,.42),min(damp*(abs(uP[7].w-1.)<.5?1.9:.8),1.));
  m=mix(m,vec3(.78,.75,.68),.35*low*smoothstep(.55,.7,NS(p*vec3(1.,.4,1.),.09)));
  if(ceilW){float bx=fract(p.x/.14+.13*(NS(p,.3)-.5));m*=mix(.62,1.,smoothstep(.0,.035,min(bx,1.-bx)));}
  hOut=0.;
  pBump=vec3(gx,gy,0.);
  return m;
}
#ifdef E8
void mainS(){
#else
void main(){
#endif
  ivec2 c=ivec2(gl_FragCoord.xy);
#ifdef E8
  float t=uintBitsToFloat(texelFetch(uT,c,0).r);
#else
  float t=texelFetch(uT,c,0).r;
#endif
  vec2 uv=gl_FragCoord.xy/uP[3].w*2.-1.;
  vec3 rd=normalize(uP[1].xyz+uP[1].w*(uv.x*uP[2].xyz+uv.y*uP[3].xyz));
  float mode=uP[15].x;
  if(t>=TMAX*.99){oC=mode<.5?vec4(skyC(rd)*.27,t):vec4(0.);return;}
  vec3 p=uP[0].xyz+rd*t;
  int r=roomAt(p.z);
  vec4 hb=uP[12];
  bool outside=p.x<hb.x||p.x>hb.y||p.z<hb.z||p.z>hb.w;
  float dS=mapSand(p),m0=1e3,ao=1.,mJ=1e3,mL=1e3,mF=1e3;
  vec3 gN=vec3(0);
  float nE=max(.0028,t*uP[1].w*2./uP[3].w*1.4);
  for(int k=0;k<(mode>.5?5:7);k++){
    vec3 kv=k>=1&&k<=4?2.*vec3(float(((k+2)>>1)&1),float(((k-1)>>1)&1),float((k-1)&1))-1.:vec3(0);
    float e=k==5?.06:.22;
    vec3 q=k==0?p:k<=4?p+kv*nE:p+normalize(gN)*e;
    float d=map(q);
    if(k==0){m0=d;mJ=min(gJ,gL);mL=gL;mF=gF;}else if(k<=4)gN+=kv*d;else{float v=clamp(d/e,0.,1.);ao*=k==5?v:sqrt(v);}
  }
  bool isSand=abs(m0-dS)<.006+t*.0012&&dS<.02+t*.002;
  // the walls program shades painted walls and ceilings; the other one everything else
  bool wallPx=!isSand&&mJ>=.012&&mF>=.05&&!(outside&&p.z<hb.z);
#ifdef PS
  if(wallPx)discard;
#endif
#ifdef PW
  if(!wallPx)discard;
#endif
  gN=normalize(gN);
  ao=mix(.4,1.,ao);
  vec3 n;vec3 alb;
  float px=t*uP[1].w*2./uP[3].w;
  if(isSand){
#ifndef PW
    vec3 g=sandT(p.xz);
    vec2 uvS=(p.xz-uP[10].xy)/(uP[10].zw-uP[10].xy);
    bool farS=outside||max(abs(uvS.x-.5),abs(uvS.y-.5))>.46;
    if(farS)n=normalize(mix(gN,vec3(0,1,0),smoothstep(5.,14.,t)));else n=normalize(vec3(-g.y,1.,-g.z));
    float slope=length(g.yz);
    // wind ripples across the wind on the gentle ramps only (none on the slip faces); the local wavelength wanders,
    // so they branch and end instead of ruling parallel lines
    float ph=dot(p.xz,uP[15].zw)*(6.2832/.07)+9.*NS(vec3(p.xz,.4),.6)+3.*NS(vec3(p.xz,1.7),.16);
    float rM=smoothstep(.46,.16,slope)*(.35+.65*smoothstep(.3,.62,NS(vec3(p.xz,.9),1.1)))*(1.-smoothstep(.04,.0,g.r));
    float wv=cos(ph+.7*sin(ph));
#ifdef FALLEN
    float rdh=.28*rM*wv*(1.-.45*uP[4].w);
#else
    float rdh=.28*rM*wv;
#endif
    vec3 nR=normalize(n+vec3(uP[15].z,0,uP[15].w)*rdh);
    // grain: fine speckle close up, coloured quartz and darker minerals
    vec2 gp=p.xz/.0028;float grain=h21(floor(gp));float gf=smoothstep(.009,.0018,px);
    float gm=NS(vec3(p.xz,.2),.012)+(grain-.5)*gf;
    alb=uP[13].rgb*(.88+.26*NS(vec3(p.xz,.5),1.5))*(1.+.3*(gm-.5));
    alb=mix(alb,alb*vec3(.72,.55,.42),smoothstep(.975,1.,grain)*gf*.7);
    // slip faces: grooves of avalanched sand running straight down the slope
    vec2 gd=g.yz/max(slope,1e-3);float lee=smoothstep(.3,.5,slope);
    float av=n3(vec3(dot(p.xz,vec2(-gd.y,gd.x))*.16,dot(p.xz,gd)*.014,.31));
    alb*=1.+.22*lee*(av-.5);
    // ripple troughs hold a little shade, so they read out of the sun too
    alb*=1.-.2*rM*(.5-.5*cos(ph+.7*sin(ph)+1.2));
    // bare floorboards where the drift thins out
    float fb=smoothstep(.03,.004,g.r)*(outside?0.:1.);
    if(fb>0.){float bx=fract(p.x/.15+.5*h21(vec2(floor(p.x/.15),2.)));
      vec3 bd=vec3(.34,.25,.16)*(.65+.5*NS(vec3(p.x*6.,p.z*.25,3.),.2))*mix(.45,1.,smoothstep(.0,.06,min(bx,1.-bx)));
      alb=mix(alb,mix(bd,uP[13].rgb*.9,smoothstep(.012,.026,g.r)),fb);}
    n=normalize(n+(vec3(0,1,0)*.0+vec3(grain-.5,0,h21(floor(gp+9.))-.5)*gf*.25));
    n=normalize(mix(n,nR,.55));
    if(mode>.5){n=nR;}
#endif
  } else {
    n=gN;
    if(abs(n.y)>.6&&Dt(r,1).x-p.y>.22){n=normalize(vec3(n.x+1e-3,n.y*.25,n.z));}
#ifndef PW
    if(mF<.05){vec3 q=p-vec3(uP[18].x,0.,uP[18].y);
      alb=vec3(.56,.43,.3)*(.8+.4*NS(p,.6));
      float wz=abs(abs(q.z)-.95*uP[18].w*.55),wx=abs(fract(q.x/2.2)-.5)*2.2;
      if(abs(n.x)>.5&&wz<.32&&abs(q.y-1.9)<.62)alb=vec3(.05,.04,.035);
      if(abs(n.z)>.5&&wx<.32&&abs(q.y-1.9)<.62&&abs(q.x)<uP[18].z-.6)alb=vec3(.05,.04,.035);}
    else if(mJ<.012){
      // painted joinery: the paint split along the grain down to grey wood
      vec3 g3=abs(n.y)>.6?p:abs(n.x)>.5?vec3(p.y,p.z*.03,p.x):vec3(p.y,p.x*.03,p.z);
      float gr=NS(vec3(g3.x*.08,g3.y*12.,g3.z*12.),.05);
      vec3 wood=vec3(.36,.32,.27)*(.7+.5*gr);
      float pt=smoothstep(.5,.56,NS(vec3(g3.x*.3,g3.y*4.,g3.z*4.),.06)+.3*(NS(p,.3)-.5)+.12*(1.-smoothstep(.0,.9,p.y-sandT(p.xz).r)));
      alb=mix(wood,uP[20].rgb*(.85+.2*gr),pt);
      // panels on the door leaf: a sunk field with a shaded and a lit edge
      if(mL<.012){vec4 dr=Dt(r,2);vec2 dir=vec2(cos(Dt(r,10).w),-sin(Dt(r,10).w));float u=dot(p.xz-vec2(dr.x+.03,Dt(r,0).w-.03),dir);
        float W=dr.y-dr.x-.06,mr=dr.z*.45;
        float ex=min(min(u-.1,W-.1-u),abs(u-.5*W)-.045),ey=min(min(p.y-.18,dr.z-.14-p.y),abs(p.y-mr)-.07);
        float pe=min(ex,ey);
        alb*=pe>0.?.9:1.;alb*=1.-.35*smoothstep(.014,.0,abs(pe));
        n=normalize(n+.6*smoothstep(.014,.0,abs(pe))*(ex<ey?vec3(dir.x,0.,dir.y)*sign(u-.5*W):vec3(0.,sign(p.y-mr),0.)));}
    }
    else if(outside&&p.z<hb.z){alb=vec3(.3,.24,.17)*(.7+.6*NS(p,.1));}
#endif
#ifndef PS
#ifndef PW
    else
#endif
    {
      float hh;vec3 bp;
      alb=wallMat(p,n,r,hh,bp);
      vec3 t1=abs(n.y)>.6?vec3(1,0,0):abs(n.z)>abs(n.x)?vec3(1,0,0):vec3(0,0,1);
      vec3 b1=abs(n.y)>.6?vec3(0,0,1):vec3(0,1,0);
      n=normalize(n-t1*bp.x-b1*bp.y);
      if(abs(n.y)>.6&&Dt(r,1).x-p.y>.22)alb=mix(alb,vec3(.42,.37,.3),.6);
    }
#endif
  }
  float hz=exp(-max(t-8.,0.)*.012);
  if(mode>.5){oC=vec4(sqrt(alb*max(dot(n,uP[4].xyz),0.)*hz*(outside?.42:1.)),1.);return;}
  vec3 E;
  if(outside){E=.38*3.1416*(mix(uP[6].rgb,uP[7].rgb,.4)*(.6+.4*n.y)+uP[13].rgb*uP[5].rgb*uP[4].y*.1*(.5-.5*n.y));}
  else E=giEval(p+n*.12,n);
  vec3 col=alb*E/3.1416*ao;
  oC=vec4(outside?mix(uP[7].rgb*.36,col,hz):col,t);
}
#ifdef E8
void main(){mainS();oU=pk(oC);}
#endif
`,fo=`
out vec4 oC;
void main(){
  ivec2 c=ivec2(gl_FragCoord.xy);
#ifdef E8
  float t=uk(texelFetch(uA,c,0)).a;
#else
  float t=texelFetch(uA,c,0).a;
#endif
  if(t>=TMAX*.99){oC=vec4(0);return;}
  vec2 uv=gl_FragCoord.xy/uP[3].w*2.-1.;
  vec3 rd=normalize(uP[1].xyz+uP[1].w*(uv.x*uP[2].xyz+uv.y*uP[3].xyz)),p=uP[0].xyz+rd*t;
  vec4 hb=uP[12];
  float v;
  if(p.x<hb.x||p.x>hb.y||p.z<hb.z||p.z>hb.w){
    vec3 L=uP[4].xyz;
    // house shadow on the sand outside
    vec3 inv=1./L; vec3 ta=(vec3(hb.x,0.,hb.z)-p)*inv,tb=(vec3(hb.y,3.4,hb.w)-p)*inv;
    vec3 mi=min(ta,tb),ma=max(ta,tb);
    float t0=max(mi.x,max(mi.y,mi.z)),t1=min(ma.x,min(ma.y,ma.z));
    v=(t1>max(t0,0.))?0.:1.;
  } else v=sunVis(p,roomAt(p.z));
  oC=vec4(v,v,v,1);
}`,lo=`
out vec4 oC;
void main(){
  ivec2 c=ivec2(gl_FragCoord.xy);
  float S=uP[3].w,R=floor(S*.5);
#ifdef E8
  float t=uk(texelFetch(uA,ivec2(vec2(c)/R*S),0)).a;
#else
  float t=texelFetch(uA,ivec2(vec2(c)/R*S),0).a;
#endif
  vec2 uv=(gl_FragCoord.xy)/R*2.-1.;
  vec3 ro=uP[0].xyz,rd=normalize(uP[1].xyz+uP[1].w*(uv.x*uP[2].xyz+uv.y*uP[3].xyz));
  int nB=int(uP[2].w);float T=min(t,12.),st=T/float(nB);
  float j=fract(52.9829189*fract(.06711056*float(c.x)+.00583715*float(c.y)));
  vec3 sum=vec3(0);
  float g=dot(rd,uP[4].xyz);
  float phase=.5+2.2*pow(max(g,0.),6.)+.25*max(-g,0.);
  for(int i=0;i<nB;i++){
    float s=(float(i)+j)*st;
    vec3 q=ro+rd*s;
    vec4 hb=uP[12];
    if(q.x>hb.x&&q.x<hb.y&&q.z>hb.z&&q.z<hb.w){
      float d=NS(q,.5)+.5*NS(q+vec3(1.3,0,2.),.14);
      d=smoothstep(.45,.95,d);
      vec3 p=q;
      float vv=sunVis(p,roomAt(p.z));
      sum+=uP[5].rgb*vv*(.05+d)*st;
    }
  }
#ifdef E8
  vec3 bv=max(sum*phase*.013*uP[6].w,0.);oC=vec4(sqrt(bv/(bv+1.)),1.);
#else
  oC=vec4(sum*phase*.013*uP[6].w,1.);
#endif
}`,Lt=`
out vec4 oC;
vec3 aces(vec3 x){return clamp(x*(2.51*x+.03)/(x*(2.43*x+.59)+.14),0.,1.);}
void main(){
  ivec2 c=ivec2(gl_FragCoord.xy);
  float S=uP[3].w;
  vec2 u=gl_FragCoord.xy/S;
#ifdef E8
  vec4 A=uk(texelFetch(uA,c,0));
  vec3 E=clamp(uk(texelFetch(uE,c,0)).rgb,0.,1.);
#else
  vec4 A=texelFetch(uA,c,0);
  vec3 E=texelFetch(uE,c,0).rgb;
#endif
  float v=texelFetch(uV,c,0).r;
  vec3 col=A.rgb*1.25+uP[5].rgb*E*E*v;
  float tm=uP[5].w;
  vec2 q=(u-.5);
  vec2 bt=vec2(1.)/(S*.5);
  vec3 bm=.4*texture(uB,u).rgb+.15*(texture(uB,u+bt).rgb+texture(uB,u-bt).rgb+texture(uB,u+bt*vec2(1,-1)).rgb+texture(uB,u-bt*vec2(1,-1)).rgb);
#ifdef E8
  bm*=bm;bm/=max(1.-bm,1e-5);
#endif
  col+=bm;
#if defined(MOON)||defined(STORM)
  vec3 rd=normalize(uP[1].xyz+uP[1].w*((u.x*2.-1.)*uP[2].xyz+(u.y*2.-1.)*uP[3].xyz));
#endif
#ifdef MOON
  // moonlight: stars through the roof
  if(uP[19].w>.5&&A.a>=TMAX*.99&&rd.y>.05){vec2 g=rd.xz/rd.y*70.,ce=floor(g);float hv=h21(ce);
    if(hv>.965){vec2 o=vec2(h21(ce+3.1),h21(ce+7.7))*.6+.2;col+=vec3(.6,.66,.8)*(hv-.965)*9.*smoothstep(.12,.0,length(g-ce-o));}}
#endif
#ifdef STORM
  // a sandstorm: sheets of sand stream over the drift with the wind
  if(uP[16].x>.5&&A.a<TMAX*.99){vec3 p=uP[0].xyz+rd*A.a;float hg=p.y-sandT(p.xz).r;
    if(abs(hg)<.06){vec2 w=uP[15].zw,a=vec2(dot(p.xz,w),dot(p.xz,vec2(-w.y,w.x)));
      float d=NS(vec3(a.x*.22-tm*.9,a.y,tm*.04),.28)+.5*NS(vec3(a.x*.3-tm*1.3,a.y*1.8,3.3),.09);
      col=mix(col,uP[21].rgb*1.3,.3*smoothstep(.7,1.4,d)*smoothstep(.06,.0,abs(hg)));}}
#endif
  // air: blowing sand or coast fog thickens with distance (sky counts as far)
  col=mix(col,uP[21].rgb,1.-exp(-uP[21].w*min(A.a,40.)));
  col*=uP[13].w;
  col*=1.-.18*dot(q,q);
  col=aces(col);
  col=pow(col,vec3(.4545));
  col+=(h21(vec2(c))-.5)*.008;
  oC=vec4(col,1.);
}`,xo="out vec4 oC;void main(){oC=texelFetch(uA,ivec2(gl_FragCoord.xy),0);}",uo=`
out vec3 vC;
out float vS;
uniform vec4 uQ[2];
void main(){
  int id=gl_VertexID;
  float a=h21(vec2(float(id),1.3)),b=h21(vec2(float(id),2.1)),c=h21(vec2(float(id),3.7)),d=h21(vec2(float(id),5.9));
  float t=uP[5].w;
  float lx=uQ[0].x,lz=uQ[0].y,wx=uQ[0].z,wz=uQ[0].w;
  vec3 p=vec3(lx+wx*a,.6+2.5*b,lz+wz*c);
  p.x+=.09*sin(t*.07+d*20.)+uQ[1].y*mod(t*(.3+.4*c)+a*9.,9.);p.y+=.06*sin(t*.05+a*30.);p.z+=.08*sin(t*.06+b*20.)+uQ[1].z*mod(t*(.3+.4*c)+a*9.,9.);
  float bright=sunVis(p,roomAt(p.z));
  vec3 w=p-uP[0].xyz;
  float zv=dot(w,uP[1].xyz);
  vec3 cs=vec3(dot(w,uP[2].xyz),dot(w,uP[3].xyz),zv);
  float S=uP[3].w;
  float px=(cs.x/zv/uP[1].w)*.5+.5,py=(cs.y/zv/uP[1].w)*.5+.5;
#ifdef E8
  float dep=uk(texelFetch(uA,ivec2(clamp(vec2(px,py),vec2(.001),vec2(.999))*S),0)).a;
#else
  float dep=texelFetch(uA,ivec2(clamp(vec2(px,py),vec2(.001),vec2(.999))*S),0).a;
#endif
  vC=uP[5].rgb*bright;
  if(zv<.4||length(w)>dep||bright<.02){gl_Position=vec4(2,2,2,1);gl_PointSize=1.;vS=0.;return;}
  float sz=(.008+.016*d*d)/zv/uP[1].w*S;
  gl_PointSize=clamp(sz,.7,3.2)+.3;
  vS=.045;
  gl_Position=vec4(cs.x/zv/uP[1].w,cs.y/zv/uP[1].w,0.,1.);
}`,vo=`
in vec3 vC;in float vS;out vec4 oC;
void main(){vec2 d=gl_PointCoord-.5;float r=dot(d,d);if(r>.25)discard;oC=vec4(vC*vS*(1.-r*4.),1.);}`,ho={"":"",F:`#define FALLEN
`},qt={"":"",M:`#define MOON
`,S:`#define STORM
`};function po(o,t,n){let s=o.__c601;const h=(m,S)=>{const R=o.createShader(m);return o.shaderSource(R,S),o.compileShader(R),R},w=(m,S,R)=>{const E=(s.e8?`#define E8
`:"")+(s.nl?`#define NL
`:""),x=h(o.FRAGMENT_SHADER,ot+E+m),P=S?h(o.VERTEX_SHADER,ot+E+pe+S):R,d=o.createProgram();return o.attachShader(d,P),o.attachShader(d,x),o.linkProgram(d),{p:d,v:P,f:x}},y=!s;if(y){o.getExtension("KHR_parallel_shader_compile");const m=!!o.getExtension("EXT_color_buffer_float"),S=!m&&!!o.getExtension("EXT_color_buffer_half_float"),R=!!o.getExtension("OES_texture_float_linear"),E=h(o.VERTEX_SHADER,ot+co),x=o.getExtension("WEBGL_debug_renderer_info"),P=/Direct3D|D3D1/i.test(String(o.getParameter(x?x.UNMASKED_RENDERER_WEBGL:o.RENDERER)));s=o.__c601={P:{},V:{},C:{},vsF:E,d3d:P,flt:m,half:S,e8:!m&&!S,nl:!R,vEmpty:o.createVertexArray(),tN:null,linked:!1,pool:new Map}}const D={gi:[ro],gb:[io],v:[fo],b:[lo],k:[xo],p:[vo,uo]},u=m=>{s.P[m]=w((m==="k"?"uniform sampler2D uA;":pe)+D[m][0],D[m][1],s.vsF)};if(y&&(u("gi"),u("gb")),!s.V[t]){const m=ho[t],S={};S.m=w(pe+m+`#define FAST
`+nt+so,null,s.vsF),S.s=w(pe+m+(s.d3d?`#define PS
`:"")+nt+_t,null,s.vsF),y&&(u("v"),u("b")),s.C[n]||(s.C[n]=w(pe+qt[n]+Lt,null,s.vsF)),y&&(u("k"),u("p")),s.d3d&&(S.w=w(pe+m+`#define PW
`+nt+_t,null,s.vsF)),S.linked=!1,s.V[t]=S}return s.C[n]||(s.C[n]=w(pe+qt[n]+Lt,null,s.vsF)),o.flush(),no(),s}function mo(o,t,n,s){const h=(y,D)=>{const{p:u,v:m,f:S}=y[D];if(!o.getProgramParameter(u,o.LINK_STATUS))throw new Error("601 "+D+": "+(o.getShaderInfoLog(m)||"")+(o.getShaderInfoLog(S)||"")+o.getProgramInfoLog(u));o.useProgram(u),["uN","uD","uS","uGv","uT","uA","uE","uV","uB"].forEach((R,E)=>{const x=o.getUniformLocation(u,R);x&&o.uniform1i(x,E)}),y[D]={p:u,uP:o.getUniformLocation(u,"uP"),uQ:o.getUniformLocation(u,"uQ")}};if(!t.linked){for(const D in t.P)h(t.P,D);const y=o.createTexture();o.bindTexture(o.TEXTURE_3D,y),o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.texImage3D(o.TEXTURE_3D,0,o.R16F,64,64,64,0,o.RED,o.HALF_FLOAT,tt),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MAG_FILTER,o.LINEAR);for(const D of[o.TEXTURE_WRAP_S,o.TEXTURE_WRAP_T,o.TEXTURE_WRAP_R])o.texParameteri(o.TEXTURE_3D,D,o.REPEAT);o.pixelStorei(o.UNPACK_ALIGNMENT,4),t.tN=y,t.linked=!0}const w=t.V[n];if(!w.linked){for(const y of["m","s","w"])w[y]&&h(w,y);w.linked=!0}return t.C[s].f&&h(t.C,s),Object.assign({},t.P,{m:w.m,s:w.s,w:w.w,c:t.C[s]})}function xe(o,t,n,s,h){const w=o.createTexture();o.bindTexture(o.TEXTURE_2D,w),t.e8&&h==="r32"?o.texImage2D(o.TEXTURE_2D,0,o.R32UI,n,s,0,o.RED_INTEGER,o.UNSIGNED_INT,null):t.e8&&h==="f"?o.texImage2D(o.TEXTURE_2D,0,o.RGBA16UI,n,s,0,o.RGBA_INTEGER,o.UNSIGNED_SHORT,null):h==="r32"?o.texImage2D(o.TEXTURE_2D,0,t.flt?o.R32F:t.half?o.R16F:o.RGBA8,n,s,0,t.flt||t.half?o.RED:o.RGBA,t.flt?o.FLOAT:t.half?o.HALF_FLOAT:o.UNSIGNED_BYTE,null):h==="f"?o.texImage2D(o.TEXTURE_2D,0,t.flt||t.half?o.RGBA16F:o.RGBA8,n,s,0,o.RGBA,t.flt||t.half?o.HALF_FLOAT:o.UNSIGNED_BYTE,null):o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,n,s,0,o.RGBA,o.UNSIGNED_BYTE,null);const y=h==="r32"||t.e8&&h==="f"?o.NEAREST:o.LINEAR;o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,y),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,y),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);const D=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,D),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,w,0),o.bindFramebuffer(o.FRAMEBUFFER,null),{tex:w,fb:D,w:n,h:s}}const Ee=new Map,zo=6;function yo(o,t,n,s){const{dom:u}=t,m=(u.x1-u.x0)/127,S=(u.z1-u.z0)/255;let R=Ee.get(s);for(R?Ee.delete(s):R=bo(o,t,128,256,m,S),Ee.set(s,R);Ee.size>zo;)Ee.delete(Ee.keys().next().value);return wo(R,128,256,256,512,m,S)}function bo(o,t,n,s,h,w){const{dom:y,tw:D}=t,u=new Float32Array(n*s),m=new Uint8Array(n*s),S=(i,c)=>{for(let z=0;z<o.length;z++){const r=o[z];if(i>r.x0&&i<r.x1&&c>r.z0&&c<r.z1)return z}return-1},R=(i,c)=>{for(let v=0;v<o.length;v++){const b=o[v],g=b.door;if(g&&i>g.x0&&i<g.x1&&c>=b.z1-.01&&c<=b.z1+D+.01)return!0}const z=o[0],r=t.back;if(i>r.x0&&i<r.x1&&c>=z.z0-D-.01&&c<=z.z0+.01)return!0;for(const v of o){const b=v.win;if(b&&b.y0<.3&&c>b.z0&&c<b.z1&&i<=v.x0+.01&&i>t.hx0-.01)return!0;const g=v.east;if(g&&g.y0<.3&&c>g.z0&&c<g.z1&&i>=v.x1-.01&&i<t.hx1+.01)return!0}return!1};for(let i=0;i<s;i++){const c=y.z0+w*i;for(let z=0;z<n;z++){const r=y.x0+h*z,v=S(r,c),b=A=>A+z+i*n;let g;if(r<t.hx0||r>t.hx1||c<t.hz0||c>t.hz1)g=1.05+.45*(ne(r,c,.4,9)-.5)+1.3*(ne(r,c,.8,38)-.5);else if(v>=0){const A=o[v];g=A.base+A.bAmp*(ne(r,c,1.3,1.1)-.5)+.35*A.bAmp*(ne(r,c,3.1,.3)-.5)}else R(r,c)?g=1:(m[b(0)]=1,g=0);u[b(0)]=g}}const E=(i,c,z,r,v)=>{const b=Math.max(0,(i-v-y.x0)/h|0),g=Math.min(n-1,(i+v-y.x0)/h+1|0),A=Math.max(0,(c-v-y.z0)/w|0),F=Math.min(s-1,(c+v-y.z0)/w+1|0);for(let _=A;_<=F;_++)for(let U=b;U<=g;U++){const O=y.x0+h*U-i,ae=y.z0+w*_-c,B=Math.sqrt(O*O+ae*ae)*(1+.22*(ne(y.x0+h*U,y.z0+w*_,2.3,.7)-.5)),X=z-r*B;X>u[U+_*n]&&(u[U+_*n]=X)}};for(const i of t.cones)E(i.x,i.z,i.top,i.s,i.rad);const x=t.repose;for(const i of t.tongues)for(let c=0;c<s;c++)for(let z=0;z<n;z++){const r=y.x0+h*z-i.x,v=y.z0+w*c-i.z,b=r*i.dx+v*i.dz,g=Math.abs(-r*i.dz+v*i.dx);if(b<-1.5||b>i.len+4)continue;const A=i.len*(1+.35*(ne(y.x0+h*z,y.z0+w*c,5.1,1.3)-.5)),F=i.hw*(1-.35*j(b/A,0,1))+.3*j(b/A,0,1),_=i.top-.17*j(b,0,A)-x*Math.max(b-A,0)-x*.8*Math.max(g-F,0);_>u[z+c*n]&&(u[z+c*n]=_)}const P=t.repose;for(const i of o){const c=(r,v)=>{for(let b=0;b<s;b++){const g=y.z0+w*b;if(!(g<i.z0-.4||g>i.z1+.4))for(let A=0;A<n;A++){const F=y.x0+h*A;if(F<i.x0-.4||F>i.x1+.4)continue;const _=v(F,g);if(_<0)continue;const O=r(F,g)-P*_;O>u[A+b*n]&&(u[A+b*n]=O)}}},z=i.bank;c((r,v)=>z.w*(.35+1.1*ne(r,v,7.7,.7)),(r,v)=>r-i.x0),c((r,v)=>z.e*(.35+1.1*ne(r,v,8.8,.7)),(r,v)=>i.x1-r),c((r,v)=>z.s*(.35+1.1*ne(r,v,9.9,.7)),(r,v)=>v-i.z0),c((r,v)=>z.n*(.35+1.1*ne(r,v,6.6,.7)),(r,v)=>i.z1-v)}const d=Math.sqrt(h*h+w*w);(()=>{for(let i=0;i<2;i++){const c=i===0,z=c?1:-1;for(let r=c?1:s-2;c?r<s-1:r>=1;r+=z)for(let v=c?1:n-2;c?v<n-1:v>=1;v+=z){const b=v+r*n;if(m[b])continue;let g=u[b];const A=(F,_)=>{if(!m[F]){const U=u[F]+P*_;U<g&&(g=U)}};A(b-z,h),A(b-z*n,w),A(b-z*n-z,d),A(b-z*n+z,d),u[b]=g}}})();for(let i=0;i<n*s;i++)!m[i]&&u[i]<0&&(u[i]=0);for(let i=0;i<3;i++)for(let c=1;c<s-1;c++)for(let z=1;z<n-1;z++){const r=z+c*n;if(!m[r])continue;let v=0,b=0;for(const g of[r-1,r+1,r-n,r+n])m[g]!==2&&(!m[g]||i>0)&&(v+=u[g],b++);b&&(u[r]=v/b)}return u}function wo(o,t,n,s,h,w,y){const D=new Float32Array(s*h*4),u=new Int32Array(s*4),m=new Float64Array(s);for(let E=0;E<s;E++){const x=E/(s-1)*(t-1),P=Math.min(t-2,x|0);m[E]=x-P,u[E*4]=j(P-1,0,t-1),u[E*4+1]=j(P,0,t-1),u[E*4+2]=j(P+1,0,t-1),u[E*4+3]=j(P+2,0,t-1)}const S=2*w,R=2*y;for(let E=0;E<h;E++){const x=E/(h-1)*(n-1),P=Math.min(n-2,x|0),d=x-P,me=j(P-1,0,n-1)*t,i=j(P,0,n-1)*t,c=j(P+1,0,n-1)*t,z=j(P+2,0,n-1)*t;for(let r=0;r<s;r++){const v=m[r],b=u[r*4],g=u[r*4+1],A=u[r*4+2],F=u[r*4+3],_=o[g+i],U=o[A+i],O=o[g+c],ae=o[A+c];let B=_+(U-_)*v,X=O+(ae-O)*v;const W=B+(X-B)*d,J=o[F+i],N=o[F+c],Ne=o[b+i],Fe=o[b+c];B=U+(J-U)*v,X=ae+(N-ae)*v;const I=B+(X-B)*d;B=Ne+(_-Ne)*v,X=Fe+(O-Fe)*v;const $=B+(X-B)*d,_e=(I-$)/S,ee=o[g+z],ze=o[A+z],ce=o[g+me],ge=o[A+me];B=O+(ae-O)*v,X=ee+(ze-ee)*v;const at=B+(X-B)*d;B=ce+(ge-ce)*v,X=_+(U-_)*v;const He=B+(X-B)*d,p=(at-He)/R,de=(r+E*s)*4;D[de]=W,D[de+1]=_e,D[de+2]=p,D[de+3]=1}}return{T:D,W:s,H:h,A:o,w:t,h:n,dx:w,dz:y}}Ft.add({num:601,name:"Sand Rooms",fam:"Vistas",recipe:"Inside an abandoned house in an old diamond mining town, mostly late in the afternoon, with pale sand drifted through the doorways in sharp ridges and each room beyond lit its own way. Some mints come at white noon, by moonlight or in a sandstorm, and some are a long passage of doorways. No controls, just look.",gl:!0,fps:30,seed:0,make(o){const t=o.gl,n=o.size;let s=parseInt(o.hash.slice(2,10),16)^1014915099|0;const h=()=>{s=s+1831565813|0;let e=Math.imul(s^s>>>15,1|s);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},w=e=>{let a=0;for(const l of e)a+=l[1];let f=h()*a;for(const l of e)if(f-=l[1],f<=0)return l[0];return e[0][0]},y=w([["rooms",59],["corridor",12],["stair",8],["bay",8],["hall",6],["fallen",7]]),D=w([["old",81],["noon",9],["blue",7],["moon",3]]),u=h()<.05,m=h(),S=h(),R=h(),E=h(),x=o.home||y==="stair"||y==="bay"?"rooms":y;let P=parseInt(o.hash.slice(2,10),16)|0;const d=()=>{P=P+1831565813|0;let e=Math.imul(P^P>>>15,1|P);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},me=e=>e[d()*e.length|0],i=e=>{let a=0;for(const l of e)a+=l[1];let f=d()*a;for(const l of e)if(f-=l[1],f<=0)return l[0];return e[0][0]},c=o.home;let z=parseInt(o.hash.slice(2,10),16)^1512900109|0;const r=()=>{z=z+1831565813|0;let e=Math.imul(z^z>>>15,1|z);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},v=e=>{let a=0;for(const l of e)a+=l[1];let f=r()*a;for(const l of e)if(f-=l[1],f<=0)return l[0];return e[0][0]},b=v([["In the Corner",16],["Down the Rooms",27],["Low on the Sand",19],["Facing the Window",19],["From the Next Room",19]]),g=v([["Over the Shoulder",40],["From the Right",34],["Into the Light",26]]),A=r()<.06,F=c?"Late Gold":i([["Late Gold",5],["Last Sun",3],["Long Afternoon",3],["Copper Dusk",1]]),_=c?"Teal First":i([["Teal First",4],["Ochre First",3],["Rose First",3],["Limewash",1]]),U=c?"Knee Deep":i([["Ankle Deep",3],["Knee Deep",5],["Waist Deep",3],["Door Buried",1]]),O=c?"Slits of Sky":i([["Slits of Sky",5],["Fallen Boards",3],["Open Roof",1]]),ae=c?"Flaking":i([["Flaking",5],["Stained",3],["Scoured",3]]),B=c?"Four Rooms":i([["Three Rooms",4],["Four Rooms",5]]),X=c?"Still Air":i([["Still Air",5],["Dusty",3],["Hanging Sand",1]]),W=!c&&u,J=!c&&A&&!W,N=c||J||W&&D!=="noon"?"old":D,Ne=x==="fallen"?"F":"",Fe=N==="moon"?"M":W?"S":"",I=po(t,Ne,Fe),$=c?"In the Corner":x==="fallen"?"Through the Gap":x==="corridor"?b==="Low on the Sand"?b:"Down the Passage":x==="hall"?b==="Low on the Sand"?b:"Across the Hall":b,_e=J?"Behind Fog":c?"Over the Shoulder":g;o.trait("Hour",J?"Coast Fog":N==="noon"?"White Noon":N==="blue"?"Blue Hour":N==="moon"?"Moonlight":F==="Copper Dusk"?"Last Minutes":F),o.trait("First Room",_),o.trait("Drift",U),o.trait("Ceiling",O),o.trait("Walls",ae),o.trait("House",x==="corridor"?"A Long Passage":x==="hall"?"The Town Hall":x==="fallen"?"A Fallen Wall":B),o.trait("Air",W?"Sandstorm":J?"Sea Fog":X),o.trait("Standpoint",$),o.trait("Sun",_e);const ee=_e==="From the Right",ze=_e==="Into the Light",ce=x==="corridor"?4:x==="hall"?3:B==="Four Rooms"?4:3,ge={teal:[.2,.37,.36],duck:[.34,.48,.47],ochre:[.6,.42,.17],pink:[.56,.32,.29],sage:[.34,.4,.28],cream:[.62,.56,.43],white:[.72,.69,.6],blue:[.27,.36,.44]},at={"Teal First":["teal","ochre","pink","duck"],"Ochre First":["ochre","teal","blue","pink"],"Rose First":["pink","sage","ochre","teal"],Limewash:["white","duck","ochre","white"]},He=2.15+(c?.1:d()*.4),p=[];let de=0;const Q=.36,Le=c?.2:-.1+d()*.7;for(let e=0;e<ce;e++){const a=e===0?5.3+(c?.1:d()*.6):(e===1?4:3.6)+d()*.6,f=He+(e?(d()-.5)*.35:0),l=He+(e?(d()-.5)*.35:0),k=3.25+d()*.3+(e===0?.1:0),H=at[_],M=ge[H[e]],K=ge[H[(e+2)%4]],C={x0:-f,x1:l,z0:de,z1:de+a,h:k,main:M,mid:K};de=C.z1+Q,C.door=e<ce-1?(()=>{const le=e===0?Le:Le*.5+(d()-.5)*.3+.25,ke=.56+d()*.1;return{x0:le-ke,x1:le+ke,top:2.15+d()*.25}})():null,p.push(C)}if(x==="corridor"||x==="hall"){const e=x==="hall",a=e?4.1+m*.8:.98+m*.16,f=e?5.7+S*.6:3.15+S*.25;let l=0;p.forEach((k,H)=>{const M=e?4.6+h()*.8:4.1+h()*1.1;Object.assign(k,{x0:-a,x1:a,z0:l,z1:l+M,h:f,main:p[0].main,mid:p[0].mid}),l=k.z1+Q,k.door&&(k.door=e?{x0:-a+.02,x1:a-.02,top:f-.5}:{x0:-a+.14,x1:a-.14,top:f-.55-h()*.25})}),p[ce-1].door=e?{x0:-.85,x1:.85,top:2.9,far:!0}:{x0:-.5,x1:.5,top:2.2,far:!0}}const Eo={"Late Gold":.34,"Last Sun":.23,"Long Afternoon":.62,"Copper Dusk":.075}[F],Mt=(N==="noon"?1.12:N==="blue"?.03:N==="moon"?.5:Eo)*(ze&&N!=="noon"?.7:1)+(c?0:(d()-.5)*.05),Ct=c?.515:.42+d()*.24,Ut=(e,a)=>{const f=(a-.5)*.6,l=ze?[-Math.cos(e)*Math.sin(f),Math.sin(e),Math.cos(e)*Math.cos(f)]:[-Math.cos(e)*Math.cos(a),Math.sin(e),-Math.cos(e)*Math.sin(a)];return ee&&(l[0]=-l[0]),l},ct=Ut(Mt,Ct),rt=N==="noon"?[1,.95,.88]:N==="blue"?[1,.42,.22]:N==="moon"?[.62,.72,1]:{"Late Gold":[1,.77,.54],"Last Sun":[1,.68,.42],"Long Afternoon":[1,.86,.68],"Copper Dusk":[1,.36,.16]}[F],T=p[0];if(T.win=(()=>{const e=3.45+(c?0:(d()-.5)*.5),a=.6+(c?.05:d()*.1);return{z0:e-a,z1:e+a,y0:-1,y1:2.72+(c?0:d()*.2)}})(),T.east={z0:0,z1:0,y0:0,y1:0},p[1]){const e=p[1],a=(e.z0+e.z1)*.5+(d()-.5)*.7,f=.4+d()*.15;e.win={z0:a-f,z1:a+f,y0:1.05,y1:2.45};const l=e.z0+.8+d()*(e.z1-e.z0-1.6);e.east=d()<.5?{z0:l-.35,z1:l+.35,y0:1.1,y1:2.35}:{z0:0,z1:0,y0:0,y1:0}}if(p[2]){const e=p[2],a=(e.z0+e.z1)*.5+(d()-.5),f=.5+d()*.2;e.win=d()<.5?{z0:a-f,z1:a+f,y0:-1,y1:2.2}:{z0:a-f,z1:a+f,y0:1,y1:2.5},e.east={z0:0,z1:0,y0:0,y1:0}}if(p[3]){const e=p[3],a=(e.z0+e.z1)*.5,f=.45;e.win={z0:a-f,z1:a+f,y0:1.1,y1:2.4},e.east={z0:a-.3,z1:a+.3,y0:1.1,y1:2.3}}for(const e of p)e.win=e.win||{z0:0,z1:0,y0:0,y1:0},e.east=e.east||{z0:0,z1:0,y0:0,y1:0};x==="corridor"&&p.forEach((e,a)=>{const f=e.z1-e.z0,l=e.z0+.9+h()*(f-1.8),k=.46+h()*.08,H=e.z0+.8+(l-e.z0+.5*f)%(f-1.6),M=h()<.75;e.win={z0:l-k,z1:l+k,y0:-1,y1:2.1+h()*.2},e.east=M?{z0:H-.45,z1:H+.45,y0:-1,y1:2.1+h()*.2}:{z0:0,z1:0,y0:0,y1:0}}),x==="hall"&&p.forEach(e=>{const a=(e.z0+e.z1)*.5+(h()-.5)*.4,f=.58+h()*.08;e.win={z0:a-f,z1:a+f,y0:1.05,y1:e.h-1.25},e.east={z0:0,z1:0,y0:0,y1:0}}),x==="fallen"&&(T.win={z0:T.z0+.75+R*.7,z1:T.z1-.65-E*.6,y0:-1,y1:T.h+.7});const it={"Slits of Sky":[2,.16,.35],"Fallen Boards":[3,.3,.7],"Open Roof":[3,.6,1.3]}[O];if(p.forEach((e,a)=>{e.holes=[];let f=it[0];a===2&&O==="Slits of Sky"&&(f=3);for(let l=0;l<f;l++){const k=e.x1-e.x0,H=e.z1-e.z0,M=e.x0+.3+d()*(k-.6),K=e.z0+.5+d()*(H-1),C=(it[1]+d()*it[2])*(a===2?1.5:1),le=.08+d()*.3+(O==="Slits of Sky"?0:.3);e.holes.push({x0:M-le,x1:M+le,z0:K-C,z1:K+C})}}),c){const e=p[0];e.holes=[{x0:-.9,x1:-.62,z0:1.8,z1:3.9},{x0:.42,x1:.62,z0:3.1,z1:4.8},{x0:-1.8,x1:-1.1,z0:.6,z1:1.05}]}x==="fallen"&&(T.holes[0]={x0:T.x0-.3,x1:T.x0+.8+m*.7,z0:T.win.z0+.2,z1:T.win.z1-.3});let Te=Math.min(...p.map(e=>e.x0))-Q,Se=Math.max(...p.map(e=>e.x1))+Q;const Oe=-Q,je=p[ce-1].z1+Q,te={x0:-.7+(c?.05:d()*.4),x1:.35+(c?.1:d()*.3),top:2.3+d()*.2},G={x0:Te-2.2,x1:Se+2.2,z0:Oe-3,z1:je+2},ie={"Ankle Deep":.4,"Knee Deep":.82,"Waist Deep":1.1,"Door Buried":1.5}[U];p.forEach((e,a)=>{e.base=.34*ie+d()*.14-(U==="Ankle Deep"?.26:0),e.bAmp=.3+d()*.2;const f=.7*ie;e.bank={w:f*(.8+d()*.7),e:f*(.7+d()*.8),s:f*(.5+d()*.7),n:f*(.7+d()*.6)}}),T.bank.e=.82*ie*(.85+d()*.35),T.bank.n=.95*ie,($==="Down the Rooms"||ze)&&x==="rooms"&&p.forEach((e,a)=>{if(e.door&&a>0){const f=(e.door.x1-e.door.x0)/2,l=Le+(r()-.5)*.14;e.door.x0=l-f,e.door.x1=l+f}}),ze&&x!=="corridor"&&x!=="hall"&&(p[ce-1].door={x0:Le-.56,x1:Le+.56,top:2.3,far:!0});const go=c?1:v([[-1,28],[0,18],[1,36],[2,18]]),To=c?.95:.5+r()*.75;p.forEach((e,a)=>{e.leaf=a===go&&e.door&&(x==="rooms"||x==="fallen")?To:0}),T.wBars=c?4:r()<.7?Math.max(2,Math.round((T.win.z1-T.win.z0)/.32)):0,T.eBars=0,(x==="corridor"||x==="fallen")&&(T.wBars=0),p.forEach((e,a)=>{x==="hall"?(e.wBars=Math.max(3,Math.round((e.win.z1-e.win.z0)/.3)),e.eBars=0):a&&(e.wBars=e.win.y0>0&&r()<.75?Math.max(2,Math.round((e.win.z1-e.win.z0)/.3)):0,e.eBars=e.east.y0>0&&r()<.75?2:0)});const st=[[.42,.13,.1],[.12,.24,.17],[.16,.2,.42],[.32,.2,.11],[.45,.3,.1]],So=["cream","ochre","duck","pink","white","sage"];p.forEach((e,a)=>{e.under=ge[So[r()*6|0]],e.acc=st[r()*5|0],e.dado=1.08+r()*.34,e.sty=r()<.5?0:1,e.frz=r()<.55?1:0,e.dadoC=e.main.map((f,l)=>f*.62+e.acc[l]*.22)}),c&&(p[0].under=ge.cream,p[0].acc=st[0],p[0].dado=1.22,p[0].sty=0,p[0].frz=1,p[0].dadoC=p[0].main.map((e,a)=>e*.62+st[0][a]*.22)),(x==="corridor"||x==="hall")&&p.forEach((e,a)=>{a&&Object.assign(e,{under:T.under,acc:T.acc,dado:T.dado,sty:T.sty,frz:T.frz,dadoC:T.dadoC})});const ft=x==="corridor"||x==="hall"?[[.42,.35,.27],[.36,.4,.38],[.46,.42,.36]][h()*3|0]:c?[.7,.66,.56]:[[.7,.66,.56],[.76,.75,.7],[.4,.48,.53],[.43,.48,.4],[.34,.24,.15]][r()*5|0],qe=[],ue=[],It=(T.win.z0+T.win.z1)/2,Bt=c?.3:(r()-.5)*.9;ue.push({x:T.x0-.3,z:It,dx:Math.cos(Bt),dz:Math.sin(Bt),top:1*ie+.12,len:c?2.3:1.4+r()*1.6,hw:(T.win.z1-T.win.z0)*.5+.15}),x==="fallen"&&Object.assign(ue[0],{top:1.25*ie+.35,len:2.6+S*1.2,hw:(T.win.z1-T.win.z0)*.5-.1}),qe.push({x:(te.x0+te.x1)/2,z:T.z0,top:.82*ie+.12,s:.6,rad:3}),p.forEach((e,a)=>{e.door&&qe.push({x:(e.door.x0+e.door.x1)/2,z:e.z1,top:(U==="Door Buried"?1.6:.62*ie)+.3*(e.door.far?r():d()),s:.58,rad:2.8}),a&&e.win&&e.win.y0<0&&e.win.z1>e.win.z0&&qe.push({x:e.x0,z:(e.win.z0+e.win.z1)/2,top:1.05*ie,s:.6,rad:3.2})});const ve=(()=>{const e=T.x0- -.55,a=It+.1-1.2,f=Math.hypot(e,a);return[e/f,a/f]})(),Xt=c?28:22+r()*12,Ht=c?-2:(r()-.5)*6,Re=[-.55+ve[0]*Xt-ve[1]*Ht,1.2+ve[1]*Xt+ve[0]*Ht,c?2.6:2.2+r()*1.4,c?2.4:2+r()*1],Ot=c?66:55+r()*25,Ge=[-.55+ve[0]*Ot,1.2+ve[1]*Ot],Ro=c?8:5+r()*6,Ve=[-ve[0],-ve[1]];if(ee){for(const e of p){const a=e.x0;if(e.x0=-e.x1,e.x1=-a,e.door){const l=e.door.x0;e.door.x0=-e.door.x1,e.door.x1=-l}let f=e.win;e.win=e.east,e.east=f,f=e.bank.w,e.bank.w=e.bank.e,e.bank.e=f,f=e.wBars,e.wBars=e.eBars,e.eBars=f,e.holes.forEach(l=>{const k=l.x0;l.x0=-l.x1,l.x1=-k})}{const e=te.x0;te.x0=-te.x1,te.x1=-e}{const e=Te;Te=-Se,Se=-e}{const e=G.x0;G.x0=-G.x1,G.x1=-e}qe.forEach(e=>{e.x=-e.x}),ue.forEach(e=>{e.x=-e.x,e.dx=-e.dx}),Re[0]=-Re[0],Ge[0]=-Ge[0],Ve[0]=-Ve[0]}const ye=yo(p,{dom:G,tw:Q,back:te,hx0:Te,hx1:Se,hz0:Oe,hz1:je,cones:qe,tongues:ue,repose:.625},d,o.hash+(c?"h":"")),lt=21,Me=new Float32Array(lt*4*ce*4),q=(e,a,f,l,k,H)=>{const M=(e*lt+a)*4;Me[M]=f,Me[M+1]=l,Me[M+2]=k,Me[M+3]=H};p.forEach((e,a)=>{q(a,0,e.x0,e.x1,e.z0,e.z1),q(a,1,e.h,.55,.48,.37);const f=e.door||{x0:0,x1:0,top:0};q(a,2,f.x0,f.x1,f.top,1);const l=e.win;q(a,3,l.z0,l.z1,l.y0,l.y1);const k=e.east;q(a,4,k.z0,k.z1,k.y0,k.y1);for(let K=0;K<3;K++){const C=e.holes[K];C?q(a,5+K,C.x0,C.x1,C.z0,C.z1):q(a,5+K,0,0,0,0)}q(a,8,e.main[0],e.main[1],e.main[2],0),q(a,9,e.dadoC[0],e.dadoC[1],e.dadoC[2],0),q(a,10,e.under[0],e.under[1],e.under[2],e.leaf),q(a,11,e.acc[0],e.acc[1],e.acc[2],e.dado),q(a,12,e.wBars,e.eBars,e.sty,e.frz);const H=e.door||{x0:0,x1:0,top:0},M=a?p[a-1].door||{x0:0,x1:0,top:0}:te;q(a,13,H.x0,H.x1,-1,H.top),q(a,17,e.z1,e.z1+Q,0,0),q(a,14,M.x0,M.x1,-1,M.top),q(a,18,e.z0-Q,e.z0,0,0),x==="fallen"&&a===0&&!ee?q(a,15,0,0,0,0):q(a,15,l.z0,l.z1,l.y0,l.y1),q(a,19,e.x0-Q,e.x0,1,e.wBars),x==="fallen"&&a===0&&ee?q(a,16,0,0,0,0):q(a,16,k.z0,k.z1,k.y0,k.y1),q(a,20,e.x1,e.x1+Q,1,e.eBars)});const jt=t.createTexture();t.bindTexture(t.TEXTURE_2D,jt),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,lt,4,0,t.RGBA,t.FLOAT,Me),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const Gt=t.createTexture();t.bindTexture(t.TEXTURE_2D,Gt),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,ye.W,ye.H,0,t.RGBA,t.FLOAT,ye.T),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,I.nl?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,I.nl?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const V=mo(t,I,Ne,Fe),re=new Float32Array(22*4),L=(e,a,f,l,k)=>{re[e*4]=a,re[e*4+1]=f,re[e*4+2]=l,re[e*4+3]=k},Po=1.1+(c?.05:d()*.3),Do=-.55+(c?0:d()*.3),ko=(e,a)=>{const f=j((e-G.x0)/(G.x1-G.x0),0,1)*(ye.W-1),l=j((a-G.z0)/(G.z1-G.z0),0,1)*(ye.H-1);return ye.T[((f|0)+(l|0)*ye.W)*4]},xt=(J?0:N==="noon"?3.3:N==="blue"?1.6:N==="moon"?.45:F==="Copper Dusk"?4.6:6.4)*(W?.4:1),dt=[rt[0]*xt,rt[1]*xt,rt[2]*xt];L(4,ct[0],ct[1],ct[2],0),L(5,dt[0],dt[1],dt[2],0);const ut=W?[.95,.72,.48]:N==="noon"?[.6,.8,1.3]:N==="blue"?[.26,.34,.64]:N==="moon"?[.1,.15,.32]:J?[1.5,1.52,1.5]:F==="Copper Dusk"?[.36,.52,1.3]:[.56,.78,1.26],vt=W?[1.45,1.04,.64]:N==="noon"?[1.75,1.78,1.75]:N==="blue"?[.5,.51,.64]:N==="moon"?[.15,.19,.33]:J?[1.7,1.68,1.6]:F==="Copper Dusk"?[.8,.82,1.15]:F==="Long Afternoon"?[2,1.85,1.6]:[2.2,1.75,1.35];L(6,ut[0],ut[1],ut[2],W?4:{"Still Air":1,Dusty:1.7,"Hanging Sand":2.6}[X]),L(7,vt[0],vt[1],vt[2],{Flaking:0,Stained:1,Scoured:2}[ae]);const ht=[Te-.1,0,Oe-.1],pt=[Se+.1,Math.max(3.75,...p.map(e=>e.h+.15)),je+.1],Pe=[24,10,60];L(8,ht[0],ht[1],ht[2],ce),L(9,pt[0],pt[1],pt[2],parseInt(o.hash.slice(10,14),16)/65536*40),L(10,G.x0,G.z0,G.x1,G.z1),L(11,te.x0,te.x1,te.top,Q),L(12,Te,Se,Oe,je);const mt=[.74,.615,.44],Ao=(x==="fallen"?.72:1)*(W?1.1:N==="noon"?.78:N==="blue"?1.8:N==="moon"?2.4:J?1.25:F==="Copper Dusk"?1.3:F==="Last Sun"?1.05:.95)*(ze?1.2:1)*($==="From the Next Room"?1.4:1);L(13,mt[0],mt[1],mt[2],Ao),L(16,W?4:0,0,Ve[0],Ve[1]),L(17,Ge[0],Ge[1],70,Ro),L(18,Re[0],Re[1],Re[2],Re[3]),L(19,4,3,8,N==="moon"?1:0),L(20,ft[0],ft[1],ft[2],0);const zt=N==="moon"?.1:N==="blue"?.35:1,We=W?[.52,.36,.21,.055]:J?[.66,.67,.66,.016]:X==="Hanging Sand"?[.66,.46,.28,.024]:X==="Dusty"?[.62,.5,.36,.006]:[0,0,0,0];L(21,We[0]*zt,We[1]*zt,We[2]*zt,We[3]),L(14,Pe[0],Pe[1],Pe[2],10);const No=d()*6.28,Fo=ue[0].dx,_o=ue[0].dz;L(15,0,0,Fo,_o);const Ke=Pe[0]*Pe[1],Qe=Pe[2]*6,Je=xe(t,I,Ke,Qe,"f"),Ce=xe(t,I,Ke,Qe,"f");for(const e of[Je,Ce])t.bindTexture(t.TEXTURE_2D,e.tex),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);t.bindVertexArray(I.vEmpty),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE);const be=e=>{for(const a of e)t.activeTexture(t.TEXTURE0+a[0]),t.bindTexture(a[2]?t.TEXTURE_3D:t.TEXTURE_2D,a[1])},we=[[0,I.tN,!0],[1,jt],[2,Gt]],Y=(e,a,f,l)=>{t.bindFramebuffer(t.FRAMEBUFFER,a),t.viewport(0,0,f,l),t.useProgram(e.p),t.uniform4fv(e.uP,re),t.bindVertexArray(I.vEmpty)};for(let e=0;e<3;e++)re[15*4+1]=e===0?.4:1,re[15*4+1]=e===0?.49:1,be([...we,[3,(e%2===0?Ce:Je).tex]]),Y(V.gi,(e%2===0?Je:Ce).fb,Ke,Qe),t.drawArrays(t.TRIANGLES,0,3);be([...we,[3,Je.tex]]),Y(V.gb,Ce.fb,Ke,Qe),t.drawArrays(t.TRIANGLES,0,3);const Ue=Ce;let De=I.pool.get(n);De||(De={T:xe(t,I,n,n,"r32")},I.pool.set(n,De));const Ie=xe(t,I,n,n,"f"),Be=xe(t,I,n,n,I.e8?"f":"b"),Ye=xe(t,I,n,n,"b"),yt=xe(t,I,n>>1,n>>1,I.e8?"b":"f"),bt=xe(t,I,n,n,"b"),Vt=x==="fallen"?0:460,Lo=0,se=new Float32Array(8);se[0]=T.x0+.1,se[1]=1.5,se[2]=T.x1-T.x0-.2,se[3]=T.z1-1.5-.1;const Wt=W?1.1:X==="Hanging Sand"&&!J?.45:0;se[4]=Vt,se[5]=ue[0].dx*Wt,se[6]=ue[0].dz*Wt,se[7]=0;let qo=0,wt=0,Kt=1e9,Qt=1e9,Jt=1e9,Yt=1e9,Zt=1e9;const Mo=c?-.11:-.06-d()*.1,Co=c?-.03:-.08+d()*.1,Et=ee?-1:1,$t=p[0].door,Ze=Et*($t.x0+$t.x1)/2,gt=p[0].z1;let Z=Do,oe=Po,fe=Mo,he=Co,$e=1.42;const et=r(),Tt=r(),eo=r();if($==="Down the Rooms"?(Z=Ze+(et-.5)*.1,oe=.5,fe=(Tt-.5)*.06,he=-.05):$==="Low on the Sand"?(Z=-.6+et*.9,oe=1.5+Tt*1.1,$e=.45,fe=Math.atan2(Ze-Z,gt-oe)+(eo-.5)*.5,he=.03):$==="Facing the Window"?(Z=(ee?-p[0].x0:p[0].x1)-.6,oe=.65,fe=-.95-et*.25,he=-.1):$==="From the Next Room"&&(Z=Ze+.45+et*.4,oe=gt+Q+1.5+Tt*.7,fe=Math.atan2(Ze-Z,gt-oe)+(eo-.5)*.2,he=-.07),x==="corridor"){const e=$==="Low on the Sand";Z=(R-.5)*.5*p[0].x1,oe=.55,$e=e?.5:1.42,fe=(E-.5)*.14,he=e?.03:-.03}else if(x==="hall"){const e=$==="Low on the Sand";Z=(p[0].x1-p[0].x0)/2*(.45+R*.2),oe=.9,$e=e?.55:1.5,fe=-.4-E*.22,he=e?.1:.07}else if(x==="fallen"){const e=ee?-p[0].x0:p[0].x1,a=ee?p[0].east:p[0].win;Z=e-.55,oe=(a.z0+a.z1)*.5-.5+(R-.5)*.6,fe=-.98-E*.3,he=-.01}Z*=Et,fe*=Et;const Uo=ko(Z,oe)+$e,Io=Ct,Bo=Mt,Xo=Math.tan(34.5*Math.PI/180);function to(e,a){const f=o.view||oo,l=fe+(f.yaw||0),k=he+(f.pitch||0),H=Z+(f.x||0),M=Uo+(f.y||0),K=oe+(f.z||0),C=l!==Kt||k!==Qt||H!==Jt||M!==Zt||K!==Yt;C&&(Kt=l,Qt=k,Jt=H,Zt=M,Yt=K);const le=Math.cos(k),ke=Math.sin(k),St=Math.cos(l),Rt=Math.sin(l),Pt=[Rt*le,ke,St*le],Dt=[St,0,-Rt],kt=[-Rt*ke,le,-St*ke];L(0,H,M,K,x==="fallen"?1:0),L(1,Pt[0],Pt[1],Pt[2],Xo),L(2,Dt[0],Dt[1],Dt[2],C?9:22),L(3,kt[0],kt[1],kt[2],n);const At=Math.sin(e*.0011),Ho=Io+.18*At,Oo=Bo-.025*At*At,Nt=Ut(Oo,Ho);L(4,Nt[0],Nt[1],Nt[2],x==="fallen"?1:0),re[5*4+3]=e,be([...we,[3,Ue.tex]]),t.disable(t.SCISSOR_TEST),C&&(Y(V.m,De.T.fb,n,n),t.drawArrays(t.TRIANGLES,0,3),be([...we,[3,Ue.tex],[4,De.T.tex]]),re[15*4]=0,Y(V.s,Ie.fb,n,n),t.drawArrays(t.TRIANGLES,0,3),V.w&&(Y(V.w,Ie.fb,n,n),t.drawArrays(t.TRIANGLES,0,3)),re[15*4]=1,Y(V.s,Be.fb,n,n),t.drawArrays(t.TRIANGLES,0,3),V.w&&(Y(V.w,Be.fb,n,n),t.drawArrays(t.TRIANGLES,0,3))),be([...we,[3,Ue.tex],[5,Ie.tex],[6,Be.tex],[7,Ye.tex]]);const Jo=C?1:8,jo=C?0:Math.floor(wt%8*n/8),Go=C?n:Math.ceil(n/8);t.enable(t.SCISSOR_TEST),t.scissor(0,jo,n,Go),Y(V.v,Ye.fb,n,n),t.drawArrays(t.TRIANGLES,0,3);const Ae=n>>1,Vo=C?0:Math.floor((wt&15)*Ae/16),Wo=C?Ae:Math.ceil(Ae/16);t.scissor(0,Vo,Ae,Wo),be([...we,[3,Ue.tex],[4,De.T.tex],[5,Ie.tex],[6,Be.tex],[7,Ye.tex],[8,yt.tex]]),Y(V.b,yt.fb,Ae,Ae),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.SCISSOR_TEST),be([...we,[3,Ue.tex],[5,Ie.tex],[6,Be.tex],[7,Ye.tex],[8,yt.tex]]),Y(V.c,bt.fb,n,n),t.drawArrays(t.TRIANGLES,0,3),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),Y(V.p,bt.fb,n,n),t.uniform4fv(V.p.uQ,se),t.drawArrays(t.POINTS,0,Vt+Lo),t.disable(t.BLEND),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,bt.tex),Y(V.k,null,n,n),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null),qo++,wt++}return to(0,0),to}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
