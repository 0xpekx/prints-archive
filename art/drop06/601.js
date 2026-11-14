// Sand Rooms: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/601.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(kt){kt&&function(){"use strict";const to={yaw:0,pitch:0,x:0,y:0,z:0},ne=(o,t,c)=>o<t?t:o>c?c:o,jo=(o,t,c)=>{const u=ne((c-o)/(t-o),0,1);return u*u*(3-2*u)},G=(o,t,c)=>o+(t-o)*c;let Ce=null,Ze=null;function oo(){if(Ce)return;let o=1612348174;const t=64,c=new Float32Array(t*t*t),u=new Float32Array(t*t*t);for(let S=0;S<c.length;S++){o=o+1831565813|0;let h=Math.imul(o^o>>>15,1|o);h=h+Math.imul(h^h>>>7,61|h)^h,c[S]=((h^h>>>14)>>>0)/4294967296}const T=[1/16,4/16,6/16,4/16,1/16],k=(S,h,y,E,A)=>{for(let d=0;d<t;d++)for(let X=0;X<t;X++)for(let x=0;x<t;x++){let ye=0;for(let W=-2;W<=2;W++)ye+=T[W+2]*S[(x+W*y&63)+64*((X+W*E&63)+64*(d+W*A&63))];h[x+64*(X+64*d)]=ye}};k(c,u,1,0,0),k(u,c,0,1,0),k(c,u,0,0,1),Ce=new Float32Array(t*t*t),Ze=new Uint16Array(t*t*t);const F=new Float32Array(1),b=new Uint32Array(F.buffer);for(let S=0;S<u.length;S++){const h=ne(.5+(u[S]-.5)*3.2,0,1);F[0]=h;const y=b[0],E=(y>>>23&255)-112,A=E<=0?0:E<<10|(y&8388607)>>>13;Ze[S]=A;const d=A>>10,X=A&1023;Ce[S]=d===0?0:Math.pow(2,d-15)*(1+X/1024)}}function no(o,t,c){o=o*64-.5,t=t*64-.5,c=c*64-.5;const u=Math.floor(o),T=Math.floor(t),k=Math.floor(c),F=o-u,b=t-T,S=c-k;let h=0;for(let y=0;y<2;y++)for(let E=0;E<2;E++)for(let A=0;A<2;A++)h+=(A?F:1-F)*(E?b:1-b)*(y?S:1-S)*Ce[(u+A&63)+64*((T+E&63)+64*(k+y&63))];return h}const te=(o,t,c,u)=>no(o/u/16,t/u/16,c/u/16),$e=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,ve=`
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
`,ao="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",co=`
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
`,ro=`
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
`,et=`
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
`,Nt=`
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
`,so=`
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
}`,fo=`
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
}`,Ft=`
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
}`,lo="out vec4 oC;void main(){oC=texelFetch(uA,ivec2(gl_FragCoord.xy),0);}",xo=`
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
}`,uo=`
in vec3 vC;in float vS;out vec4 oC;
void main(){vec2 d=gl_PointCoord-.5;float r=dot(d,d);if(r>.25)discard;oC=vec4(vC*vS*(1.-r*4.),1.);}`,vo={"":"",F:`#define FALLEN
`},_t={"":"",M:`#define MOON
`,S:`#define STORM
`};function ho(o,t,c){let u=o.__c601;const T=(h,y)=>{const E=o.createShader(h);return o.shaderSource(E,y),o.compileShader(E),E},k=(h,y,E)=>{const A=(u.e8?`#define E8
`:"")+(u.nl?`#define NL
`:""),d=T(o.FRAGMENT_SHADER,$e+A+h),X=y?T(o.VERTEX_SHADER,$e+A+ve+y):E,x=o.createProgram();return o.attachShader(x,X),o.attachShader(x,d),o.linkProgram(x),{p:x,v:X,f:d}},F=!u;if(F){o.getExtension("KHR_parallel_shader_compile");const h=!!o.getExtension("EXT_color_buffer_float"),y=!h&&!!o.getExtension("EXT_color_buffer_half_float"),E=!!o.getExtension("OES_texture_float_linear"),A=T(o.VERTEX_SHADER,$e+ao),d=o.getExtension("WEBGL_debug_renderer_info"),X=/Direct3D|D3D1/i.test(String(o.getParameter(d?d.UNMASKED_RENDERER_WEBGL:o.RENDERER)));u=o.__c601={P:{},V:{},C:{},vsF:A,d3d:X,flt:h,half:y,e8:!h&&!y,nl:!E,vEmpty:o.createVertexArray(),tN:null,linked:!1,pool:new Map}}const b={gi:[co],gb:[ro],v:[so],b:[fo],k:[lo],p:[uo,xo]},S=h=>{u.P[h]=k((h==="k"?"uniform sampler2D uA;":ve)+b[h][0],b[h][1],u.vsF)};if(F&&(S("gi"),S("gb")),!u.V[t]){const h=vo[t],y={};y.m=k(ve+h+`#define FAST
`+et+io,null,u.vsF),y.s=k(ve+h+(u.d3d?`#define PS
`:"")+et+Nt,null,u.vsF),F&&(S("v"),S("b")),u.C[c]||(u.C[c]=k(ve+_t[c]+Ft,null,u.vsF)),F&&(S("k"),S("p")),u.d3d&&(y.w=k(ve+h+`#define PW
`+et+Nt,null,u.vsF)),y.linked=!1,u.V[t]=y}return u.C[c]||(u.C[c]=k(ve+_t[c]+Ft,null,u.vsF)),o.flush(),oo(),u}function po(o,t,c,u){const T=(F,b)=>{const{p:S,v:h,f:y}=F[b];if(!o.getProgramParameter(S,o.LINK_STATUS))throw new Error("601 "+b+": "+(o.getShaderInfoLog(h)||"")+(o.getShaderInfoLog(y)||"")+o.getProgramInfoLog(S));o.useProgram(S),["uN","uD","uS","uGv","uT","uA","uE","uV","uB"].forEach((E,A)=>{const d=o.getUniformLocation(S,E);d&&o.uniform1i(d,A)}),F[b]={p:S,uP:o.getUniformLocation(S,"uP"),uQ:o.getUniformLocation(S,"uQ")}};if(!t.linked){for(const b in t.P)T(t.P,b);const F=o.createTexture();o.bindTexture(o.TEXTURE_3D,F),o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.texImage3D(o.TEXTURE_3D,0,o.R16F,64,64,64,0,o.RED,o.HALF_FLOAT,Ze),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MAG_FILTER,o.LINEAR);for(const b of[o.TEXTURE_WRAP_S,o.TEXTURE_WRAP_T,o.TEXTURE_WRAP_R])o.texParameteri(o.TEXTURE_3D,b,o.REPEAT);o.pixelStorei(o.UNPACK_ALIGNMENT,4),t.tN=F,t.linked=!0}const k=t.V[c];if(!k.linked){for(const F of["m","s","w"])k[F]&&T(k,F);k.linked=!0}return t.C[u].f&&T(t.C,u),Object.assign({},t.P,{m:k.m,s:k.s,w:k.w,c:t.C[u]})}function fe(o,t,c,u,T){const k=o.createTexture();o.bindTexture(o.TEXTURE_2D,k),t.e8&&T==="r32"?o.texImage2D(o.TEXTURE_2D,0,o.R32UI,c,u,0,o.RED_INTEGER,o.UNSIGNED_INT,null):t.e8&&T==="f"?o.texImage2D(o.TEXTURE_2D,0,o.RGBA16UI,c,u,0,o.RGBA_INTEGER,o.UNSIGNED_SHORT,null):T==="r32"?o.texImage2D(o.TEXTURE_2D,0,t.flt?o.R32F:t.half?o.R16F:o.RGBA8,c,u,0,t.flt||t.half?o.RED:o.RGBA,t.flt?o.FLOAT:t.half?o.HALF_FLOAT:o.UNSIGNED_BYTE,null):T==="f"?o.texImage2D(o.TEXTURE_2D,0,t.flt||t.half?o.RGBA16F:o.RGBA8,c,u,0,o.RGBA,t.flt||t.half?o.HALF_FLOAT:o.UNSIGNED_BYTE,null):o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,c,u,0,o.RGBA,o.UNSIGNED_BYTE,null);const F=T==="r32"||t.e8&&T==="f"?o.NEAREST:o.LINEAR;o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,F),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,F),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);const b=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,b),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,k,0),o.bindFramebuffer(o.FRAMEBUFFER,null),{tex:k,fb:b,w:c,h:u}}function mo(o,t,c){const{dom:b,tw:S}=t,h=(b.x1-b.x0)/127,y=(b.z1-b.z0)/255,E=new Float32Array(128*256),A=new Uint8Array(128*256),d=(a,v)=>{for(let f=0;f<o.length;f++){const s=o[f];if(a>s.x0&&a<s.x1&&v>s.z0&&v<s.z1)return f}return-1},X=(a,v)=>{for(let p=0;p<o.length;p++){const z=o[p],l=z.door;if(l&&a>l.x0&&a<l.x1&&v>=z.z1-.01&&v<=z.z1+S+.01)return!0}const f=o[0],s=t.back;if(a>s.x0&&a<s.x1&&v>=f.z0-S-.01&&v<=f.z0+.01)return!0;for(const p of o){const z=p.win;if(z&&z.y0<.3&&v>z.z0&&v<z.z1&&a<=p.x0+.01&&a>t.hx0-.01)return!0;const l=p.east;if(l&&l.y0<.3&&v>l.z0&&v<l.z1&&a>=p.x1-.01&&a<t.hx1+.01)return!0}return!1};for(let a=0;a<256;a++){const v=b.z0+y*a;for(let f=0;f<128;f++){const s=b.x0+h*f,p=d(s,v),z=g=>g+f+a*128;let l;if(s<t.hx0||s>t.hx1||v<t.hz0||v>t.hz1)l=1.05+.45*(te(s,v,.4,9)-.5)+1.3*(te(s,v,.8,38)-.5);else if(p>=0){const g=o[p];l=g.base+g.bAmp*(te(s,v,1.3,1.1)-.5)+.35*g.bAmp*(te(s,v,3.1,.3)-.5)}else X(s,v)?l=1:(A[z(0)]=1,l=0);E[z(0)]=l}}const x=(a,v,f,s,p)=>{const z=Math.max(0,(a-p-b.x0)/h|0),l=Math.min(127,(a+p-b.x0)/h+1|0),g=Math.max(0,(v-p-b.z0)/y|0),j=Math.min(255,(v+p-b.z0)/y+1|0);for(let M=g;M<=j;M++)for(let _=z;_<=l;_++){const U=b.x0+h*_-a,N=b.z0+y*M-v,Ue=Math.sqrt(U*U+N*N)*(1+.22*(te(b.x0+h*_,b.z0+y*M,2.3,.7)-.5)),De=f-s*Ue;De>E[_+M*128]&&(E[_+M*128]=De)}};for(const a of t.cones)x(a.x,a.z,a.top,a.s,a.rad);const ye=t.repose;for(const a of t.tongues)for(let v=0;v<256;v++)for(let f=0;f<128;f++){const s=b.x0+h*f-a.x,p=b.z0+y*v-a.z,z=s*a.dx+p*a.dz,l=Math.abs(-s*a.dz+p*a.dx);if(z<-1.5||z>a.len+4)continue;const g=a.len*(1+.35*(te(b.x0+h*f,b.z0+y*v,5.1,1.3)-.5)),j=a.hw*(1-.35*ne(z/g,0,1))+.3*ne(z/g,0,1),M=a.top-.17*ne(z,0,g)-ye*Math.max(z-g,0)-ye*.8*Math.max(l-j,0);M>E[f+v*128]&&(E[f+v*128]=M)}const W=t.repose;for(const a of o){const v=(s,p)=>{for(let z=0;z<256;z++){const l=b.z0+y*z;if(!(l<a.z0-.4||l>a.z1+.4))for(let g=0;g<128;g++){const j=b.x0+h*g;if(j<a.x0-.4||j>a.x1+.4)continue;const M=p(j,l);if(M<0)continue;const U=s(j,l)-W*M;U>E[g+z*128]&&(E[g+z*128]=U)}}},f=a.bank;v((s,p)=>f.w*(.35+1.1*te(s,p,7.7,.7)),(s,p)=>s-a.x0),v((s,p)=>f.e*(.35+1.1*te(s,p,8.8,.7)),(s,p)=>a.x1-s),v((s,p)=>f.s*(.35+1.1*te(s,p,9.9,.7)),(s,p)=>p-a.z0),v((s,p)=>f.n*(.35+1.1*te(s,p,6.6,.7)),(s,p)=>a.z1-p)}const w=Math.sqrt(h*h+y*y);(()=>{for(let a=0;a<2;a++){const v=a===0,f=v?1:-1;for(let s=v?1:254;v?s<255:s>=1;s+=f)for(let p=v?1:126;v?p<127:p>=1;p+=f){const z=p+s*128;if(A[z])continue;let l=E[z];const g=(j,M)=>{if(!A[j]){const _=E[j]+W*M;_<l&&(l=_)}};g(z-f,h),g(z-f*128,y),g(z-f*128-f,w),g(z-f*128+f,w),E[z]=l}}})();for(let a=0;a<128*256;a++)!A[a]&&E[a]<0&&(E[a]=0);for(let a=0;a<3;a++)for(let v=1;v<255;v++)for(let f=1;f<127;f++){const s=f+v*128;if(!A[s])continue;let p=0,z=0;for(const l of[s-1,s+1,s-128,s+128])A[l]!==2&&(!A[l]||a>0)&&(p+=E[l],z++);z&&(E[s]=p/z)}const P=new Float32Array(256*512*4),L=(a,v)=>(a=ne(a,0,127),v=ne(v,0,255),E[a+v*128]);for(let a=0;a<512;a++){const v=a/511*255,f=Math.min(254,v|0),s=v-f;for(let p=0;p<256;p++){const z=p/255*127,l=Math.min(126,z|0),g=z-l,j=G(G(L(l,f),L(l+1,f),g),G(L(l,f+1),L(l+1,f+1),g),s),M=(G(G(L(l+1,f),L(l+2,f),g),G(L(l+1,f+1),L(l+2,f+1),g),s)-G(G(L(l-1,f),L(l,f),g),G(L(l-1,f+1),L(l,f+1),g),s))/(2*h),_=(G(G(L(l,f+1),L(l+1,f+1),g),G(L(l,f+2),L(l+1,f+2),g),s)-G(G(L(l,f-1),L(l+1,f-1),g),G(L(l,f),L(l+1,f),g),s))/(2*y),U=(p+a*256)*4;P[U]=j,P[U+1]=M,P[U+2]=_,P[U+3]=1}}return{T:P,W:256,H:512,A:E,w:128,h:256,dx:h,dz:y}}kt.add({num:601,name:"Sand Rooms",fam:"Vistas",recipe:"Inside an abandoned house in an old diamond mining town, mostly late in the afternoon, with pale sand drifted through the doorways in sharp ridges and each room beyond lit its own way. Some mints come at white noon, by moonlight or in a sandstorm, and some are a long passage of doorways. No controls, just look.",gl:!0,fps:30,seed:0,make(o){const t=o.gl,c=o.size;let u=parseInt(o.hash.slice(2,10),16)^1014915099|0;const T=()=>{u=u+1831565813|0;let e=Math.imul(u^u>>>15,1|u);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},k=e=>{let n=0;for(const i of e)n+=i[1];let r=T()*n;for(const i of e)if(r-=i[1],r<=0)return i[0];return e[0][0]},F=k([["rooms",59],["corridor",12],["stair",8],["bay",8],["hall",6],["fallen",7]]),b=k([["old",81],["noon",9],["blue",7],["moon",3]]),S=T()<.05,h=T(),y=T(),E=T(),A=T(),d=o.home||F==="stair"||F==="bay"?"rooms":F;let X=parseInt(o.hash.slice(2,10),16)|0;const x=()=>{X=X+1831565813|0;let e=Math.imul(X^X>>>15,1|X);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},ye=e=>e[x()*e.length|0],W=e=>{let n=0;for(const i of e)n+=i[1];let r=x()*n;for(const i of e)if(r-=i[1],r<=0)return i[0];return e[0][0]},w=o.home;let we=parseInt(o.hash.slice(2,10),16)^1512900109|0;const P=()=>{we=we+1831565813|0;let e=Math.imul(we^we>>>15,1|we);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},L=e=>{let n=0;for(const i of e)n+=i[1];let r=P()*n;for(const i of e)if(r-=i[1],r<=0)return i[0];return e[0][0]},a=L([["In the Corner",16],["Down the Rooms",27],["Low on the Sand",19],["Facing the Window",19],["From the Next Room",19]]),v=L([["Over the Shoulder",40],["From the Right",34],["Into the Light",26]]),f=P()<.06,s=w?"Late Gold":W([["Late Gold",5],["Last Sun",3],["Long Afternoon",3],["Copper Dusk",1]]),p=w?"Teal First":W([["Teal First",4],["Ochre First",3],["Rose First",3],["Limewash",1]]),z=w?"Knee Deep":W([["Ankle Deep",3],["Knee Deep",5],["Waist Deep",3],["Door Buried",1]]),l=w?"Slits of Sky":W([["Slits of Sky",5],["Fallen Boards",3],["Open Roof",1]]),g=w?"Flaking":W([["Flaking",5],["Stained",3],["Scoured",3]]),j=w?"Four Rooms":W([["Three Rooms",4],["Four Rooms",5]]),M=w?"Still Air":W([["Still Air",5],["Dusty",3],["Hanging Sand",1]]),_=!w&&S,U=!w&&f&&!_,N=w||U||_&&b!=="noon"?"old":b,Ue=d==="fallen"?"F":"",De=N==="moon"?"M":_?"S":"",H=ho(t,Ue,De),ae=w?"In the Corner":d==="fallen"?"Through the Gap":d==="corridor"?a==="Low on the Sand"?a:"Down the Passage":d==="hall"?a==="Low on the Sand"?a:"Across the Hall":a,tt=U?"Behind Fog":w?"Over the Shoulder":v;o.trait("Hour",U?"Coast Fog":N==="noon"?"White Noon":N==="blue"?"Blue Hour":N==="moon"?"Moonlight":s==="Copper Dusk"?"Last Minutes":s),o.trait("First Room",p),o.trait("Drift",z),o.trait("Ceiling",l),o.trait("Walls",g),o.trait("House",d==="corridor"?"A Long Passage":d==="hall"?"The Town Hall":d==="fallen"?"A Fallen Wall":j),o.trait("Air",_?"Sandstorm":U?"Sea Fog":M),o.trait("Standpoint",ae),o.trait("Sun",tt);const le=tt==="From the Right",Ae=tt==="Into the Light",he=d==="corridor"?4:d==="hall"?3:j==="Four Rooms"?4:3,Be={teal:[.2,.37,.36],duck:[.34,.48,.47],ochre:[.6,.42,.17],pink:[.56,.32,.29],sage:[.34,.4,.28],cream:[.62,.56,.43],white:[.72,.69,.6],blue:[.27,.36,.44]},zo={"Teal First":["teal","ochre","pink","duck"],"Ochre First":["ochre","teal","blue","pink"],"Rose First":["pink","sage","ochre","teal"],Limewash:["white","duck","ochre","white"]},Lt=2.15+(w?.1:x()*.4),m=[];let ot=0;const J=.36,ke=w?.2:-.1+x()*.7;for(let e=0;e<he;e++){const n=e===0?5.3+(w?.1:x()*.6):(e===1?4:3.6)+x()*.6,r=Lt+(e?(x()-.5)*.35:0),i=Lt+(e?(x()-.5)*.35:0),D=3.25+x()*.3+(e===0?.1:0),O=zo[p],B=Be[O[e]],Q=Be[O[(e+2)%4]],I={x0:-r,x1:i,z0:ot,z1:ot+n,h:D,main:B,mid:Q};ot=I.z1+J,I.door=e<he-1?(()=>{const se=e===0?ke:ke*.5+(x()-.5)*.3+.25,Se=.56+x()*.1;return{x0:se-Se,x1:se+Se,top:2.15+x()*.25}})():null,m.push(I)}if(d==="corridor"||d==="hall"){const e=d==="hall",n=e?4.1+h*.8:.98+h*.16,r=e?5.7+y*.6:3.15+y*.25;let i=0;m.forEach((D,O)=>{const B=e?4.6+T()*.8:4.1+T()*1.1;Object.assign(D,{x0:-n,x1:n,z0:i,z1:i+B,h:r,main:m[0].main,mid:m[0].mid}),i=D.z1+J,D.door&&(D.door=e?{x0:-n+.02,x1:n-.02,top:r-.5}:{x0:-n+.14,x1:n-.14,top:r-.55-T()*.25})}),m[he-1].door=e?{x0:-.85,x1:.85,top:2.9,far:!0}:{x0:-.5,x1:.5,top:2.2,far:!0}}const yo={"Late Gold":.34,"Last Sun":.23,"Long Afternoon":.62,"Copper Dusk":.075}[s],qt=(N==="noon"?1.12:N==="blue"?.03:N==="moon"?.5:yo)*(Ae&&N!=="noon"?.7:1)+(w?0:(x()-.5)*.05),Mt=w?.515:.42+x()*.24,Ct=(e,n)=>{const r=(n-.5)*.6,i=Ae?[-Math.cos(e)*Math.sin(r),Math.sin(e),Math.cos(e)*Math.cos(r)]:[-Math.cos(e)*Math.cos(n),Math.sin(e),-Math.cos(e)*Math.sin(n)];return le&&(i[0]=-i[0]),i},nt=Ct(qt,Mt),at=N==="noon"?[1,.95,.88]:N==="blue"?[1,.42,.22]:N==="moon"?[.62,.72,1]:{"Late Gold":[1,.77,.54],"Last Sun":[1,.68,.42],"Long Afternoon":[1,.86,.68],"Copper Dusk":[1,.36,.16]}[s],R=m[0];if(R.win=(()=>{const e=3.45+(w?0:(x()-.5)*.5),n=.6+(w?.05:x()*.1);return{z0:e-n,z1:e+n,y0:-1,y1:2.72+(w?0:x()*.2)}})(),R.east={z0:0,z1:0,y0:0,y1:0},m[1]){const e=m[1],n=(e.z0+e.z1)*.5+(x()-.5)*.7,r=.4+x()*.15;e.win={z0:n-r,z1:n+r,y0:1.05,y1:2.45};const i=e.z0+.8+x()*(e.z1-e.z0-1.6);e.east=x()<.5?{z0:i-.35,z1:i+.35,y0:1.1,y1:2.35}:{z0:0,z1:0,y0:0,y1:0}}if(m[2]){const e=m[2],n=(e.z0+e.z1)*.5+(x()-.5),r=.5+x()*.2;e.win=x()<.5?{z0:n-r,z1:n+r,y0:-1,y1:2.2}:{z0:n-r,z1:n+r,y0:1,y1:2.5},e.east={z0:0,z1:0,y0:0,y1:0}}if(m[3]){const e=m[3],n=(e.z0+e.z1)*.5,r=.45;e.win={z0:n-r,z1:n+r,y0:1.1,y1:2.4},e.east={z0:n-.3,z1:n+.3,y0:1.1,y1:2.3}}for(const e of m)e.win=e.win||{z0:0,z1:0,y0:0,y1:0},e.east=e.east||{z0:0,z1:0,y0:0,y1:0};d==="corridor"&&m.forEach((e,n)=>{const r=e.z1-e.z0,i=e.z0+.9+T()*(r-1.8),D=.46+T()*.08,O=e.z0+.8+(i-e.z0+.5*r)%(r-1.6),B=T()<.75;e.win={z0:i-D,z1:i+D,y0:-1,y1:2.1+T()*.2},e.east=B?{z0:O-.45,z1:O+.45,y0:-1,y1:2.1+T()*.2}:{z0:0,z1:0,y0:0,y1:0}}),d==="hall"&&m.forEach(e=>{const n=(e.z0+e.z1)*.5+(T()-.5)*.4,r=.58+T()*.08;e.win={z0:n-r,z1:n+r,y0:1.05,y1:e.h-1.25},e.east={z0:0,z1:0,y0:0,y1:0}}),d==="fallen"&&(R.win={z0:R.z0+.75+E*.7,z1:R.z1-.65-A*.6,y0:-1,y1:R.h+.7});const ct={"Slits of Sky":[2,.16,.35],"Fallen Boards":[3,.3,.7],"Open Roof":[3,.6,1.3]}[l];if(m.forEach((e,n)=>{e.holes=[];let r=ct[0];n===2&&l==="Slits of Sky"&&(r=3);for(let i=0;i<r;i++){const D=e.x1-e.x0,O=e.z1-e.z0,B=e.x0+.3+x()*(D-.6),Q=e.z0+.5+x()*(O-1),I=(ct[1]+x()*ct[2])*(n===2?1.5:1),se=.08+x()*.3+(l==="Slits of Sky"?0:.3);e.holes.push({x0:B-se,x1:B+se,z0:Q-I,z1:Q+I})}}),w){const e=m[0];e.holes=[{x0:-.9,x1:-.62,z0:1.8,z1:3.9},{x0:.42,x1:.62,z0:3.1,z1:4.8},{x0:-1.8,x1:-1.1,z0:.6,z1:1.05}]}d==="fallen"&&(R.holes[0]={x0:R.x0-.3,x1:R.x0+.8+h*.7,z0:R.win.z0+.2,z1:R.win.z1-.3});let be=Math.min(...m.map(e=>e.x0))-J,Ee=Math.max(...m.map(e=>e.x1))+J;const Ie=-J,Xe=m[he-1].z1+J,$={x0:-.7+(w?.05:x()*.4),x1:.35+(w?.1:x()*.3),top:2.3+x()*.2},V={x0:be-2.2,x1:Ee+2.2,z0:Ie-3,z1:Xe+2},ce={"Ankle Deep":.4,"Knee Deep":.82,"Waist Deep":1.1,"Door Buried":1.5}[z];m.forEach((e,n)=>{e.base=.34*ce+x()*.14-(z==="Ankle Deep"?.26:0),e.bAmp=.3+x()*.2;const r=.7*ce;e.bank={w:r*(.8+x()*.7),e:r*(.7+x()*.8),s:r*(.5+x()*.7),n:r*(.7+x()*.6)}}),R.bank.e=.82*ce*(.85+x()*.35),R.bank.n=.95*ce,(ae==="Down the Rooms"||Ae)&&d==="rooms"&&m.forEach((e,n)=>{if(e.door&&n>0){const r=(e.door.x1-e.door.x0)/2,i=ke+(P()-.5)*.14;e.door.x0=i-r,e.door.x1=i+r}}),Ae&&d!=="corridor"&&d!=="hall"&&(m[he-1].door={x0:ke-.56,x1:ke+.56,top:2.3,far:!0});const wo=w?1:L([[-1,28],[0,18],[1,36],[2,18]]),bo=w?.95:.5+P()*.75;m.forEach((e,n)=>{e.leaf=n===wo&&e.door&&(d==="rooms"||d==="fallen")?bo:0}),R.wBars=w?4:P()<.7?Math.max(2,Math.round((R.win.z1-R.win.z0)/.32)):0,R.eBars=0,(d==="corridor"||d==="fallen")&&(R.wBars=0),m.forEach((e,n)=>{d==="hall"?(e.wBars=Math.max(3,Math.round((e.win.z1-e.win.z0)/.3)),e.eBars=0):n&&(e.wBars=e.win.y0>0&&P()<.75?Math.max(2,Math.round((e.win.z1-e.win.z0)/.3)):0,e.eBars=e.east.y0>0&&P()<.75?2:0)});const rt=[[.42,.13,.1],[.12,.24,.17],[.16,.2,.42],[.32,.2,.11],[.45,.3,.1]],Eo=["cream","ochre","duck","pink","white","sage"];m.forEach((e,n)=>{e.under=Be[Eo[P()*6|0]],e.acc=rt[P()*5|0],e.dado=1.08+P()*.34,e.sty=P()<.5?0:1,e.frz=P()<.55?1:0,e.dadoC=e.main.map((r,i)=>r*.62+e.acc[i]*.22)}),w&&(m[0].under=Be.cream,m[0].acc=rt[0],m[0].dado=1.22,m[0].sty=0,m[0].frz=1,m[0].dadoC=m[0].main.map((e,n)=>e*.62+rt[0][n]*.22)),(d==="corridor"||d==="hall")&&m.forEach((e,n)=>{n&&Object.assign(e,{under:R.under,acc:R.acc,dado:R.dado,sty:R.sty,frz:R.frz,dadoC:R.dadoC})});const it=d==="corridor"||d==="hall"?[[.42,.35,.27],[.36,.4,.38],[.46,.42,.36]][T()*3|0]:w?[.7,.66,.56]:[[.7,.66,.56],[.76,.75,.7],[.4,.48,.53],[.43,.48,.4],[.34,.24,.15]][P()*5|0],Ne=[],de=[],Ut=(R.win.z0+R.win.z1)/2,Bt=w?.3:(P()-.5)*.9;de.push({x:R.x0-.3,z:Ut,dx:Math.cos(Bt),dz:Math.sin(Bt),top:1*ce+.12,len:w?2.3:1.4+P()*1.6,hw:(R.win.z1-R.win.z0)*.5+.15}),d==="fallen"&&Object.assign(de[0],{top:1.25*ce+.35,len:2.6+y*1.2,hw:(R.win.z1-R.win.z0)*.5-.1}),Ne.push({x:($.x0+$.x1)/2,z:R.z0,top:.82*ce+.12,s:.6,rad:3}),m.forEach((e,n)=>{e.door&&Ne.push({x:(e.door.x0+e.door.x1)/2,z:e.z1,top:(z==="Door Buried"?1.6:.62*ce)+.3*(e.door.far?P():x()),s:.58,rad:2.8}),n&&e.win&&e.win.y0<0&&e.win.z1>e.win.z0&&Ne.push({x:e.x0,z:(e.win.z0+e.win.z1)/2,top:1.05*ce,s:.6,rad:3.2})});const xe=(()=>{const e=R.x0- -.55,n=Ut+.1-1.2,r=Math.hypot(e,n);return[e/r,n/r]})(),It=w?28:22+P()*12,Xt=w?-2:(P()-.5)*6,Te=[-.55+xe[0]*It-xe[1]*Xt,1.2+xe[1]*It+xe[0]*Xt,w?2.6:2.2+P()*1.4,w?2.4:2+P()*1],Ht=w?66:55+P()*25,He=[-.55+xe[0]*Ht,1.2+xe[1]*Ht],To=w?8:5+P()*6,Oe=[-xe[0],-xe[1]];if(le){for(const e of m){const n=e.x0;if(e.x0=-e.x1,e.x1=-n,e.door){const i=e.door.x0;e.door.x0=-e.door.x1,e.door.x1=-i}let r=e.win;e.win=e.east,e.east=r,r=e.bank.w,e.bank.w=e.bank.e,e.bank.e=r,r=e.wBars,e.wBars=e.eBars,e.eBars=r,e.holes.forEach(i=>{const D=i.x0;i.x0=-i.x1,i.x1=-D})}{const e=$.x0;$.x0=-$.x1,$.x1=-e}{const e=be;be=-Ee,Ee=-e}{const e=V.x0;V.x0=-V.x1,V.x1=-e}Ne.forEach(e=>{e.x=-e.x}),de.forEach(e=>{e.x=-e.x,e.dx=-e.dx}),Te[0]=-Te[0],He[0]=-He[0],Oe[0]=-Oe[0]}const pe=mo(m,{dom:V,tw:J,back:$,hx0:be,hx1:Ee,hz0:Ie,hz1:Xe,cones:Ne,tongues:de,repose:.625},x),st=21,Fe=new Float32Array(st*4*he*4),C=(e,n,r,i,D,O)=>{const B=(e*st+n)*4;Fe[B]=r,Fe[B+1]=i,Fe[B+2]=D,Fe[B+3]=O};m.forEach((e,n)=>{C(n,0,e.x0,e.x1,e.z0,e.z1),C(n,1,e.h,.55,.48,.37);const r=e.door||{x0:0,x1:0,top:0};C(n,2,r.x0,r.x1,r.top,1);const i=e.win;C(n,3,i.z0,i.z1,i.y0,i.y1);const D=e.east;C(n,4,D.z0,D.z1,D.y0,D.y1);for(let Q=0;Q<3;Q++){const I=e.holes[Q];I?C(n,5+Q,I.x0,I.x1,I.z0,I.z1):C(n,5+Q,0,0,0,0)}C(n,8,e.main[0],e.main[1],e.main[2],0),C(n,9,e.dadoC[0],e.dadoC[1],e.dadoC[2],0),C(n,10,e.under[0],e.under[1],e.under[2],e.leaf),C(n,11,e.acc[0],e.acc[1],e.acc[2],e.dado),C(n,12,e.wBars,e.eBars,e.sty,e.frz);const O=e.door||{x0:0,x1:0,top:0},B=n?m[n-1].door||{x0:0,x1:0,top:0}:$;C(n,13,O.x0,O.x1,-1,O.top),C(n,17,e.z1,e.z1+J,0,0),C(n,14,B.x0,B.x1,-1,B.top),C(n,18,e.z0-J,e.z0,0,0),d==="fallen"&&n===0&&!le?C(n,15,0,0,0,0):C(n,15,i.z0,i.z1,i.y0,i.y1),C(n,19,e.x0-J,e.x0,1,e.wBars),d==="fallen"&&n===0&&le?C(n,16,0,0,0,0):C(n,16,D.z0,D.z1,D.y0,D.y1),C(n,20,e.x1,e.x1+J,1,e.eBars)});const Ot=t.createTexture();t.bindTexture(t.TEXTURE_2D,Ot),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,st,4,0,t.RGBA,t.FLOAT,Fe),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const Wt=t.createTexture();t.bindTexture(t.TEXTURE_2D,Wt),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,pe.W,pe.H,0,t.RGBA,t.FLOAT,pe.T),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,H.nl?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,H.nl?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const K=po(t,H,Ue,De),oe=new Float32Array(22*4),q=(e,n,r,i,D)=>{oe[e*4]=n,oe[e*4+1]=r,oe[e*4+2]=i,oe[e*4+3]=D},go=1.1+(w?.05:x()*.3),Ro=-.55+(w?0:x()*.3),So=(e,n)=>{const r=ne((e-V.x0)/(V.x1-V.x0),0,1)*(pe.W-1),i=ne((n-V.z0)/(V.z1-V.z0),0,1)*(pe.H-1);return pe.T[((r|0)+(i|0)*pe.W)*4]},ft=(U?0:N==="noon"?3.3:N==="blue"?1.6:N==="moon"?.45:s==="Copper Dusk"?4.6:6.4)*(_?.4:1),lt=[at[0]*ft,at[1]*ft,at[2]*ft];q(4,nt[0],nt[1],nt[2],0),q(5,lt[0],lt[1],lt[2],0);const dt=_?[.95,.72,.48]:N==="noon"?[.6,.8,1.3]:N==="blue"?[.26,.34,.64]:N==="moon"?[.1,.15,.32]:U?[1.5,1.52,1.5]:s==="Copper Dusk"?[.36,.52,1.3]:[.56,.78,1.26],xt=_?[1.45,1.04,.64]:N==="noon"?[1.75,1.78,1.75]:N==="blue"?[.5,.51,.64]:N==="moon"?[.15,.19,.33]:U?[1.7,1.68,1.6]:s==="Copper Dusk"?[.8,.82,1.15]:s==="Long Afternoon"?[2,1.85,1.6]:[2.2,1.75,1.35];q(6,dt[0],dt[1],dt[2],_?4:{"Still Air":1,Dusty:1.7,"Hanging Sand":2.6}[M]),q(7,xt[0],xt[1],xt[2],{Flaking:0,Stained:1,Scoured:2}[g]);const ut=[be-.1,0,Ie-.1],vt=[Ee+.1,Math.max(3.75,...m.map(e=>e.h+.15)),Xe+.1],ge=[24,10,60];q(8,ut[0],ut[1],ut[2],he),q(9,vt[0],vt[1],vt[2],parseInt(o.hash.slice(10,14),16)/65536*40),q(10,V.x0,V.z0,V.x1,V.z1),q(11,$.x0,$.x1,$.top,J),q(12,be,Ee,Ie,Xe);const ht=[.74,.615,.44],Po=(d==="fallen"?.72:1)*(_?1.1:N==="noon"?.78:N==="blue"?1.8:N==="moon"?2.4:U?1.25:s==="Copper Dusk"?1.3:s==="Last Sun"?1.05:.95)*(Ae?1.2:1)*(ae==="From the Next Room"?1.4:1);q(13,ht[0],ht[1],ht[2],Po),q(16,_?4:0,0,Oe[0],Oe[1]),q(17,He[0],He[1],70,To),q(18,Te[0],Te[1],Te[2],Te[3]),q(19,4,3,8,N==="moon"?1:0),q(20,it[0],it[1],it[2],0);const pt=N==="moon"?.1:N==="blue"?.35:1,We=_?[.52,.36,.21,.055]:U?[.66,.67,.66,.016]:M==="Hanging Sand"?[.66,.46,.28,.024]:M==="Dusty"?[.62,.5,.36,.006]:[0,0,0,0];q(21,We[0]*pt,We[1]*pt,We[2]*pt,We[3]),q(14,ge[0],ge[1],ge[2],10);const Do=x()*6.28,Ao=de[0].dx,ko=de[0].dz;q(15,0,0,Ao,ko);const je=ge[0]*ge[1],Ge=ge[2]*6,Ve=fe(t,H,je,Ge,"f"),_e=fe(t,H,je,Ge,"f");for(const e of[Ve,_e])t.bindTexture(t.TEXTURE_2D,e.tex),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);t.bindVertexArray(H.vEmpty),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE);const me=e=>{for(const n of e)t.activeTexture(t.TEXTURE0+n[0]),t.bindTexture(n[2]?t.TEXTURE_3D:t.TEXTURE_2D,n[1])},ze=[[0,H.tN,!0],[1,Ot],[2,Wt]],Y=(e,n,r,i)=>{t.bindFramebuffer(t.FRAMEBUFFER,n),t.viewport(0,0,r,i),t.useProgram(e.p),t.uniform4fv(e.uP,oe),t.bindVertexArray(H.vEmpty)};for(let e=0;e<3;e++)oe[15*4+1]=e===0?.4:1,oe[15*4+1]=e===0?.49:1,me([...ze,[3,(e%2===0?_e:Ve).tex]]),Y(K.gi,(e%2===0?Ve:_e).fb,je,Ge),t.drawArrays(t.TRIANGLES,0,3);me([...ze,[3,Ve.tex]]),Y(K.gb,_e.fb,je,Ge),t.drawArrays(t.TRIANGLES,0,3);const Le=_e;let Re=H.pool.get(c);Re||(Re={T:fe(t,H,c,c,"r32")},H.pool.set(c,Re));const qe=fe(t,H,c,c,"f"),Me=fe(t,H,c,c,H.e8?"f":"b"),Ke=fe(t,H,c,c,"b"),mt=fe(t,H,c>>1,c>>1,H.e8?"b":"f"),zt=fe(t,H,c,c,"b"),jt=d==="fallen"?0:460,No=0,re=new Float32Array(8);re[0]=R.x0+.1,re[1]=1.5,re[2]=R.x1-R.x0-.2,re[3]=R.z1-1.5-.1;const Gt=_?1.1:M==="Hanging Sand"&&!U?.45:0;re[4]=jt,re[5]=de[0].dx*Gt,re[6]=de[0].dz*Gt,re[7]=0;let Fo=0,yt=0,Vt=1e9,Kt=1e9,Qt=1e9,Jt=1e9,Yt=1e9;const _o=w?-.11:-.06-x()*.1,Lo=w?-.03:-.08+x()*.1,wt=le?-1:1,Zt=m[0].door,Qe=wt*(Zt.x0+Zt.x1)/2,bt=m[0].z1;let Z=Ro,ee=go,ie=_o,ue=Lo,Je=1.42;const Ye=P(),Et=P(),$t=P();if(ae==="Down the Rooms"?(Z=Qe+(Ye-.5)*.1,ee=.5,ie=(Et-.5)*.06,ue=-.05):ae==="Low on the Sand"?(Z=-.6+Ye*.9,ee=1.5+Et*1.1,Je=.45,ie=Math.atan2(Qe-Z,bt-ee)+($t-.5)*.5,ue=.03):ae==="Facing the Window"?(Z=(le?-m[0].x0:m[0].x1)-.6,ee=.65,ie=-.95-Ye*.25,ue=-.1):ae==="From the Next Room"&&(Z=Qe+.45+Ye*.4,ee=bt+J+1.5+Et*.7,ie=Math.atan2(Qe-Z,bt-ee)+($t-.5)*.2,ue=-.07),d==="corridor"){const e=ae==="Low on the Sand";Z=(E-.5)*.5*m[0].x1,ee=.55,Je=e?.5:1.42,ie=(A-.5)*.14,ue=e?.03:-.03}else if(d==="hall"){const e=ae==="Low on the Sand";Z=(m[0].x1-m[0].x0)/2*(.45+E*.2),ee=.9,Je=e?.55:1.5,ie=-.4-A*.22,ue=e?.1:.07}else if(d==="fallen"){const e=le?-m[0].x0:m[0].x1,n=le?m[0].east:m[0].win;Z=e-.55,ee=(n.z0+n.z1)*.5-.5+(E-.5)*.6,ie=-.98-A*.3,ue=-.01}Z*=wt,ie*=wt;const qo=So(Z,ee)+Je,Mo=Mt,Co=qt,Uo=Math.tan(34.5*Math.PI/180);function eo(e,n){const r=o.view||to,i=ie+(r.yaw||0),D=ue+(r.pitch||0),O=Z+(r.x||0),B=qo+(r.y||0),Q=ee+(r.z||0),I=i!==Vt||D!==Kt||O!==Qt||B!==Yt||Q!==Jt;I&&(Vt=i,Kt=D,Qt=O,Yt=B,Jt=Q);const se=Math.cos(D),Se=Math.sin(D),Tt=Math.cos(i),gt=Math.sin(i),Rt=[gt*se,Se,Tt*se],St=[Tt,0,-gt],Pt=[-gt*Se,se,-Tt*Se];q(0,O,B,Q,d==="fallen"?1:0),q(1,Rt[0],Rt[1],Rt[2],Uo),q(2,St[0],St[1],St[2],I?9:22),q(3,Pt[0],Pt[1],Pt[2],c);const Dt=Math.sin(e*.0011),Bo=Mo+.18*Dt,Io=Co-.025*Dt*Dt,At=Ct(Io,Bo);q(4,At[0],At[1],At[2],d==="fallen"?1:0),oe[5*4+3]=e,me([...ze,[3,Le.tex]]),t.disable(t.SCISSOR_TEST),I&&(Y(K.m,Re.T.fb,c,c),t.drawArrays(t.TRIANGLES,0,3),me([...ze,[3,Le.tex],[4,Re.T.tex]]),oe[15*4]=0,Y(K.s,qe.fb,c,c),t.drawArrays(t.TRIANGLES,0,3),K.w&&(Y(K.w,qe.fb,c,c),t.drawArrays(t.TRIANGLES,0,3)),oe[15*4]=1,Y(K.s,Me.fb,c,c),t.drawArrays(t.TRIANGLES,0,3),K.w&&(Y(K.w,Me.fb,c,c),t.drawArrays(t.TRIANGLES,0,3))),me([...ze,[3,Le.tex],[5,qe.tex],[6,Me.tex],[7,Ke.tex]]);const Go=I?1:8,Xo=I?0:Math.floor(yt%8*c/8),Ho=I?c:Math.ceil(c/8);t.enable(t.SCISSOR_TEST),t.scissor(0,Xo,c,Ho),Y(K.v,Ke.fb,c,c),t.drawArrays(t.TRIANGLES,0,3);const Pe=c>>1,Oo=I?0:Math.floor((yt&15)*Pe/16),Wo=I?Pe:Math.ceil(Pe/16);t.scissor(0,Oo,Pe,Wo),me([...ze,[3,Le.tex],[4,Re.T.tex],[5,qe.tex],[6,Me.tex],[7,Ke.tex],[8,mt.tex]]),Y(K.b,mt.fb,Pe,Pe),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.SCISSOR_TEST),me([...ze,[3,Le.tex],[5,qe.tex],[6,Me.tex],[7,Ke.tex],[8,mt.tex]]),Y(K.c,zt.fb,c,c),t.drawArrays(t.TRIANGLES,0,3),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),Y(K.p,zt.fb,c,c),t.uniform4fv(K.p.uQ,re),t.drawArrays(t.POINTS,0,jt+No),t.disable(t.BLEND),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,zt.tex),Y(K.k,null,c,c),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null),Fo++,yt++}return eo(0,0),eo}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
