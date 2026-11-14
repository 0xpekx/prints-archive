// Cave Jungle: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/577.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ye){ye&&function(){"use strict";const Pa={yaw:0,pitch:0,x:0,y:0,z:0},Ge=0,He=Ge?[]:null,Z=(o,e,i)=>o<e?e:o>i?i:o,g=(o,e,i)=>o+(e-o)*i,C=(o,e,i)=>{const l=Z((i-o)/(e-o),0,1);return l*l*(3-2*l)};let Kt=null,be=null;const Xe=new Float32Array(1),Ta=new Uint32Array(Xe.buffer);function Ve(o){Xe[0]=o;const e=Ta[0],i=e>>>16&32768,l=(e>>>23&255)-112;return l<=0?i:l>=31?i|31743:i|l<<10|(e&8388607)>>>13}function ka(){if(Kt)return;let o=1467746846;const e=64,i=new Float32Array(e*e*e),l=new Float32Array(e*e*e);for(let d=0;d<i.length;d++){o=o+1831565813|0;let v=Math.imul(o^o>>>15,1|o);v=v+Math.imul(v^v>>>7,61|v)^v,i[d]=((v^v>>>14)>>>0)/4294967296}const w=[1/16,4/16,6/16,4/16,1/16],p=(d,v,c,E,q)=>{for(let _=0;_<e;_++)for(let B=0;B<e;B++)for(let j=0;j<e;j++){let xt=0;for(let H=-2;H<=2;H++)xt+=w[H+2]*d[(j+H*c&63)+64*((B+H*E&63)+64*(_+H*q&63))];v[j+64*(B+64*_)]=xt}};p(i,l,1,0,0),p(l,i,0,1,0),p(i,l,0,0,1),Kt=new Float32Array(e*e*e),be=new Uint16Array(e*e*e);for(let d=0;d<l.length;d++){const v=Ve(Z(.5+(l[d]-.5)*3.2,0,1));be[d]=v;const c=v>>10,E=v&1023;Kt[d]=c===0?0:Math.pow(2,c-15)*(1+E/1024)}}function tt(o,e,i){o=o*64-.5,e=e*64-.5,i=i*64-.5;const l=Math.floor(o),w=Math.floor(e),p=Math.floor(i),d=o-l,v=e-w,c=i-p;let E=0;for(let q=0;q<2;q++)for(let _=0;_<2;_++)for(let B=0;B<2;B++)E+=(B?d:1-d)*(_?v:1-v)*(q?c:1-c)*Kt[(l+B&63)+64*((w+_&63)+64*(p+q&63))];return E}const ge=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,Oe=`
uniform vec4 uP[27];
uniform sampler3D uN;
uniform sampler2D uM, uD, uA, uB, uG, uO, uV;
#define TIME uP[0].w
#define CAM uP[0].xyz
#define LS uP[4].xyz
#define NH int(uP[6].w)
#define NS int(uP[12].x)
#define FLT (uP[14].w<.5)
#define K4 int(uP[23].y)
#define K2 int(uP[23].z)
float sst(float a,float b,float x){float t=clamp((x-a)/(b-a),0.,1.);return t*t*(3.-2.*t);}
float n3(vec3 p){return textureLod(uN,p,0.).r;}
vec4 D(int x,int y){return texelFetch(uD,ivec2(x,y),0);}
vec3 h3(vec2 i){uvec3 v=uvec3(ivec3(int(floor(i.x)),int(floor(i.y)),577));v=v*1664525u+1013904223u;v.x+=v.y*v.z;v.y+=v.z*v.x;v.z+=v.x*v.y;v^=v>>16u;v.x+=v.y*v.z;v.y+=v.z*v.x;v.z+=v.x*v.y;return vec3(v)*(1./4294967296.);}
float decT(float a){return FLT?a:a*2000.;}
vec3 decC(vec3 c){return FLT?c:c/max(1.-c,.004);}
vec4 sA(vec2 uv){return textureLod(uA,min(uv,vec2(.999))*uP[20].w,0.);}
vec2 hmD(int i,vec4 a,vec4 b,vec2 xz){vec2 u=clamp((xz-a.xz)/(2.*b.z)+.5,.004,.996);return textureLod(uM,vec2((u.x+float(i))*.333333,u.y),0.).rg;}
vec2 hm(int i,vec2 xz){return hmD(i,D(i,0),D(i,1),xz);}
vec3 ray(vec2 uv){return normalize(uP[1].xyz+((uv.x*2.-1.)*uP[2].xyz+(uv.y*2.-1.)*uP[3].xyz)*uP[1].w);}
vec3 holeRad(int i){return uP[6].rgb*uP[5].w*D(i,1).w;}
// the chamber's cross-section along z: centre x, base y, half width, half height
vec4 sec(float z){
  float ch=sst(-150.,-50.,z)*(1.-sst(440.,540.,z));
  vec4 C=uP[11];
  return vec4(mix(C.x,C.y,ch)+16.*sin(z*.0105+1.3)+7.*sin(z*.031),mix(40.,-12.,ch),mix(72.,C.z,ch)*(1.+.1*sin(z*.019+.4)),mix(128.,C.w,ch));
}
float floorB(vec2 q){
  vec4 s=sec(q.y); float z=q.y;
  float y=mix(96.,74.,sst(-170.,-15.,z))-40.*sst(2.,50.,z)-42.*sst(40.,190.,z)+50.*sst(270.,470.,z);
  y+=75.*sst(.42,1.,abs(q.x-s.x)/s.z);
  vec2 dm=q-uP[9].xy; y+=uP[9].w*exp(-dot(dm,dm)/(uP[9].z*uP[9].z));
  y+=14.*(n3(vec3(q*.0016,.31))-.5)+6.*(n3(vec3(q*.0058,.77))-.5);
  return y;
}
float surfH(vec2 q){return uP[23].x-75.*(1.-sst(-300.,-90.,q.y))+22.*(n3(vec3(q*.0035,.41))-.5)+7.*(n3(vec3(q*.031,.9))-.5);}
// fallen blocks: faceted slabs, flat-ish tops, fracture faces of different slopes
float stones(vec2 q,float sc,float hk,float sd){
  vec2 g=q/sc,b=floor(g),o=step(.5,g-b)-1.;
  float h=0.;
  for(int k=0;k<K4;k++){
    vec2 c=b+o+vec2(float(k&1),float(k>>1));
    vec3 r=h3(c+sd);
    vec2 d=q-(c+.2+.6*r.xy)*sc;
    float a=r.z*6.2832; vec2 e=vec2(cos(a),sin(a));
    float rr=sc*(.33+.22*fract(r.x*13.7));
    float a1=abs(dot(d,e))/rr, a2=abs(dot(d,vec2(-e.y,e.x)))/(rr*(.55+.45*fract(r.z*5.3)));
    float m=mix(max(a1,a2),length(vec2(a1,a2)),.3);
    float top=hk*sc*(.3+.7*fract(r.y*7.1));
    h=max(h,top*sst(1.,.6,m)-.2*top*a1*fract(r.y*3.3));
  }
  return h;
}
float crowns(vec2 q,out float id){
  vec2 g=q/8.,b=floor(g),o=step(.5,g-b)-1.;
  float h=-1e3; id=0.;
  for(int k=0;k<K4;k++){
    vec2 c=b+o+vec2(float(k&1),float(k>>1));
    vec3 r=h3(c+311.);
    vec2 d=q-(c+.15+.7*r.xy)*8.;
    float rad=(4.+3.6*r.z)*uP[21].w;
    float fr=fract(r.x*7.3+r.z*3.1);
    float em=step(.88,fr);
    rad*=1.+.35*em;
    float top=uP[21].x*(.8+.12*fr+.3*em);
    float u=dot(d,d)/(rad*rad);
    float v=top-rad*.45+rad*.95*sqrt(max(1.-u,0.))-max(u-1.,0.)*rad*1.1;
    if(v>h){h=v;id=r.z;}
  }
  h+=1.8*(n3(vec3(q*.09,id))-.5)+.9*(n3(vec3(q*.27,.37))-.5);
  return max(h,uP[21].x*.55+3.*n3(vec3(q*.05,.6)));
}
// x height, y canopy depth, z boulder height, w crown id
vec4 groundH(vec2 q,float fb){
  float jm=1.-sst(.68,1.04,length(q-uP[21].yz)/uP[12].z+.3*(n3(vec3(q*.0026,.53))-.5));
  vec4 cb=uP[22]; vec2 dq=q-cb.xy;
  float bl=0.;
  for(int s=0;s<K2;s++){bool a=s==0; bl=max(bl,stones(q,a?17.:6.,a?.3:.32,a?0.:57.)*(a?.25+.75*sst(10.,45.,length(dq)):1.-.8*jm));}
  dq=vec2(dq.x*.8+dq.y*.6,-dq.x*.6+dq.y*.8);
  bl=max(bl,cb.z-fb-2.4*length(max(abs(dq)-vec2(1.5,1.),0.))-.02*dot(dq,dq));
  float h=fb+bl+.9*(n3(vec3(q*.09,.21))-.5)-.25*abs(n3(vec3(q*.21,.67))-.5)-.1*abs(n3(vec3(q*.9,.3))-.5)+.03*n3(vec3(q*3.,.8));
  float id=0.,cr=0.;
  if(jm>.002) cr=crowns(q,id)*jm;
  return vec4(h+cr,cr,bl,id);
}
// limestone beds: gently dipping, 6.3 m thick; notch() opens the bedding plane between two beds
float bedY(vec3 p){float y=p.y+10.*(n3(p*vec3(.0022,.0012,.0022)+.15)-.5)+.04*p.x-.02*p.z;return y+2.*sin(y*.21+1.);}
float notch(float yb){float f=fract(yb/6.3);return (1.-sst(0.,.16,f)*(1.-sst(.8,1.,f)))*(.15+.85*sst(.25,.75,h3(vec2(floor(yb/6.3+.5),5.)).x));}
// each bed stands out or back by its own amount: ledges and overhangs along the bedding
float bedS(float yb){float u=yb/6.3,i=floor(u);return mix(h3(vec2(i,7.)).y,h3(vec2(i+1.,7.)).y,sst(.88,1.,u-i))-.5;}
float flowF(vec3 p){return sst(.5,.8,n3(vec3(p.x*.0055,p.y*.0017,p.z*.0055)+.6))*uP[10].w;}
float air(vec3 p){
  vec4 s=sec(p.z);
  vec2 d=vec2((p.x-s.x)/s.z,(p.y-s.y)/s.w);
  float r=22.*(n3(p*vec3(.0021,.0016,.0021))-.5)+1.5-6.*abs(n3(p*vec3(.0058,.0074,.0058)+.3)-.5)+2.4*n3(vec3(p.x*.003,p.y*.013,p.z*.003)+.7);
  float fl=flowF(p);
  r+=fl*(2.+.7*n3(vec3(p.x*.035,p.y*.005,p.z*.035)+.2));
  float bk=(1.-min(fl,1.))*(.5+.7*n3(p*.004+.8));
  float yb=bedY(p); r+=bk*(3.*bedS(yb)-1.05*notch(yb));
  float fu=n3(vec3(p.x*.0075,p.y*.0012,p.z*.0075)+.4);
  r-=(1.-.8*min(fl,1.))*1.*(1.-sst(0.,.25,abs(fu-.5)))+.25-1.1*abs(n3(vec3(p.x*.033,p.y*.011,p.z*.033))-.5);
  return (1.-length(d))*min(s.z,s.w)*.9-r;
}
float funnel(vec3 p){
  float f=-1e4;
  for(int i=0;i<NH;i++){
    vec4 a=D(i,0);
    if(p.y>a.y-40.){
      vec2 w=vec2(n3(p*.006+.1),n3(p*.006+.55))-.5;
      vec2 m=hmD(i,a,D(i,1),p.xz+7.*w);
      float k=clamp((p.y-a.y)/(a.w-a.y),0.,1.);
      f=max(f,min(mix(m.x,m.y,k)-(3.+4.*k)*(n3(p*.03+float(i)*.3)-.5)+1.2*notch(bedY(p)),p.y-a.y+30.));
    }
  }
  return f;
}
float stal(vec3 p){
  float d=1e4;
  for(int j=0;j<NS;j++){
    vec4 a=D(j,2),b=D(j,3);
    vec2 q=p.xz-a.xy; float hy=p.y-b.w;
    float bd=length(q)-a.z*1.7;
    if(bd<6.&&hy<a.w+4.){
      float h=clamp(hy/a.w,0.,1.);
      q-=b.yz*h*h*a.w;
      float r=a.z*(.1+.9*pow(1.-h,.5))*(.84+.22*abs(sin(hy/(a.z*.55)+b.x*9.+2.*n3(p*.021)))+.06*sin(hy/(a.z*.16)+b.x*3.));
      r*=1.+.5*(n3(vec3(p.x*.035,p.y*.012,p.z*.035)+b.x)-.5)+.12*(n3(vec3(p.x*.15,p.y*.05,p.z*.15))-.5);
      d=min(d,max((length(q)-r)*.6,hy-a.w-a.z*.1));
    } else d=min(d,max(bd,hy-a.w-a.z*.1));
  }
  return d;
}
// lianas hanging from the cave roof round the opening
#ifdef NOVINE
vec3 gRo, gRd, gCid=vec3(-1e9); float gPa, gVc=0., gVt=0., gVT=1., gCv=0.; bool gAc=false;
#endif
vec2 fw(vec3 p){return 7.*(vec2(n3(p*.006+.1),n3(p*.006+.55))-.5);}
float vines(vec3 p){
  float d=1e4;
  for(int i=0;i<NH;i++){
    vec4 a=D(i,0), b=D(i,1);
    float y0=a.y+5.;
    float by=max(p.y-y0-3.,y0-55.-p.y);
    float band=by<0.?max(abs(hmD(i,a,b,p.xz).x+3.)-11.,by):by;
    if(band<0.){
      vec2 c=floor(p.xz/2.4)+.5; vec3 r=h3(c+vec2(float(i)*31.+7.,3.));
      vec2 cp=(c+(r.xy-.5)*.55)*2.4;
      float mc=hmD(i,a,b,cp+fw(vec3(cp.x,y0,cp.y))).x;
      float L=(2.+uP[22].w*(4.+17.*r.z*r.z*r.z))*sst(-9.,-2.,mc)*(1.-sst(0.,3.,mc))*step(.5,fract(r.x*7.7));
      float yb=y0-L;
      float th=(.06+.3*sst(.35,.8,n3(vec3(cp*.31,p.y*.11))))*sst(yb-.5,yb+4.,p.y);
      vec2 wv=vec2(sin(p.y*.21+r.x*9.),cos(p.y*.17+r.y*7.))*.35*(y0-p.y)/max(L,1.);
      d=min(d,min(max(length(p.xz-cp-wv)-th,yb-p.y),1.1));
#ifdef NOVINE
      if(L>.5){
        // the ray's closest approach to this strand's axis, across the view: coverage of a pixel footprint by the strand
        vec2 w=cp+wv-gRo.xz; float l2=max(length(gRd.xz),1e-4); vec2 r2=gRd.xz/l2;
        float tc=dot(w,r2)/l2, ax=abs(w.x*r2.y-w.y*r2.x), yc=gRo.y+gRd.y*tc, h=.5*gPa*tc;
        // strands in front of each other add up (each strand counted once, at its best sample, while marching)
        if(gAc&&tc>1.&&yc>yb&&yc<y0+3.){
          float cv=clamp((min(ax+th,h)-max(ax-th,-h))/(2.*h),0.,1.);
          vec3 id=vec3(c,float(i)); if(id!=gCid){gVT*=1.-gCv; gCv=0.; gCid=id;}
          if(cv>gCv){gCv=cv; if(cv>gVc){gVc=cv;gVt=tc;}}
        }
      }
#endif
    } else d=min(d,max(band,1.));
  }
  return d;
}
// the trees on the doline's lip: a crown mass leaning out over the void, its underside hanging ragged
float rimT(vec3 p){
  float d=1e4;
  for(int i=0;i<NH;i++){
    vec4 a=D(i,0);
    if(abs(p.y-a.w-6.)<30.){
      float m=hmD(i,a,D(i,1),p.xz+fw(vec3(p.x,a.w,p.z))).y;
      float sh=surfH(p.xz);
      float nb=n3(vec3(p.xz*.03,.13)), nc=n3(vec3(p.xz*.07,.71));
      float reach=2.+7.*nb*nb;
      float top=sh+3.+6.*nb+2.5*nc, bot=sh+mix(-1.,2.+5.*(1.-nc),sst(-2.,2.,m));
      d=min(d,max(max(max(p.y-top,bot-p.y),m-reach),-22.-m)*.5);
    }
  }
  return d;
}
// scene() also leaves the material it found in gM (0 rock, 1 talus, 2 canopy, 3 stalagmite, 4 vine, 6 lip forest)
// and a detail value in gX (canopy crown id or block height)
int gM; float gX, gV;
float scene(vec3 p){
  float fb=floorB(p.xz), gd, gy=fb; vec4 g=vec4(0);
  bool nearG=p.y-fb<=50.;
  if(!nearG) gd=p.y-fb-42.;
  else{g=groundH(p.xz,fb); gy=g.x; gd=(p.y-gy)*(g.y>.5?.3:.38);}
  float sd=max(min(air(p),gd),funnel(p)), sh=-1e4;
  if(p.y>150.){sh=p.y-surfH(p.xz); sd=min(max(sh,sd),rimT(p));}
  float st=stal(p), vn=vines(p);
#ifdef NOVINE
  sd=min(sd,st); gV=vn; vn=1e4;
#else
  sd=min(sd,min(st,vn));
#endif
  gM=vn<.25?4:st<.4?3:(nearG&&abs(p.y-gy)*.6<.5)?(g.y>.4?2:1):sh>-1.5?6:0;
  gX=gM==2?g.w:g.z;
  return sd;
}
float sunVis(vec3 p){
  float v=0.;
  for(int i=0;i<NH;i++){
    vec4 a=D(i,0), b=D(i,1);
    float s=1.;
    if(p.y<a.y){vec3 q=p+LS*((a.y-p.y)/LS.y); float w=.3+.009*(a.y-p.y); s=sst(-w,w,hmD(i,a,b,q.xz).x);}
    if(p.y<a.w){vec3 q=p+LS*((a.w-p.y)/LS.y); float w=.3+.009*(a.w-p.y)+(p.y>a.y-2.?4.:0.); s*=sst(-w,w,hmD(i,a,b,q.xz).y);}
    v=max(v,s);
  }
  return v;
}
// shadow of the cloud in the doline mouth on everything below it
float cloudTA(vec3 p,vec4 a){
  float yc=a.y-12.;
  if(p.y>yc) return 1.;
  vec3 q=p+LS*((yc-p.y)/LS.y); vec3 w=uP[7].xyz*1.6;
  vec3 qc=vec3(q.x,yc,q.z)-w;
  float kr=uP[18].w;
  float c=sst(mix(.36,.47,kr),mix(.66,.53,kr),n3(qc*vec3(.0055,.01,.0055)*uP[24].y+.2))*(.35+1.3*n3(qc*vec3(.023,.03,.023)));
  return exp(-4.2*uP[8].y*c);
}
float cloudT(vec3 p){return cloudTA(p,D(0,0));}
`,Ea="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",za=`
out vec4 o;
vec2 oct(vec3 n){n/=abs(n.x)+abs(n.y)+abs(n.z);vec2 q=n.xy;if(n.z<0.)q=(1.-abs(n.yx))*vec2(n.x>=0.?1.:-1.,n.y>=0.?1.:-1.);return q;}
void main(){
  vec2 uv=gl_FragCoord.xy/uP[3].w;
  vec3 ro=CAM, rd=ray(uv), p=ro, n=vec3(0);
  gRo=ro; gRd=rd; gPa=2.*uP[1].w/uP[3].w;
  float t=.05, e=0., mm=-1., mx=0., bc=1., bt=0., bm=0., bx=0., ec=1.;
  int st=0, N=int(uP[14].x)+4;
  if(uP[23].w>.5){
    bool hit=false;
    for(int i=0;i<NH;i++){vec4 a=D(i,0),b=D(i,1); vec3 c=vec3(a.x,.5*(a.y+a.w)-12.,a.z)-ro; float k=dot(c,rd), R=b.z+.5*(a.w-a.y)+45.; if(dot(c,c)-k*k<R*R&&(k>0.||dot(c,c)<R*R)) hit=true;}
    if(!hit) N=0;
  }
  for(int i=0;i<N;i++){
    int j=st-1;
    vec3 k=vec3(float(((j+3)>>1)&1),float((j>>1)&1),float(j&1))*2.-1.;
    vec3 q=st==0?ro+rd*t:p+k*e;
    gAc=st==0;
    float d=scene(q);
    if(st==0){
      float th=.0011*t+.002;
      if(d<th||i>=N-5){p=q;e=.002*t+.003+(gM==2||gM==6?0.:sst(150.,250.,t)*gPa*t*1.5);mm=float(gM);mx=gX;st=1;}
      else{
        float c=(d-th)/(gPa*t); if(c<bc){bc=c;bt=t;bm=float(gM);bx=gX;}
        t+=min(d,max(gV,.5))*.8;
        if(t>1400.||q.y>380.){
          if(bc<1.&&(ro+rd*t).y>215.){t=bt;p=ro+rd*t;e=.002*t+.003+sst(150.,250.,t)*gPa*t*1.5;mm=bm;mx=bx;ec=1.-bc;st=1;}
          else break;
        }
      }
    } else {n+=k*d;st++;if(st>4)break;}
  }
  float vf=min(gVt,1999.)/2000.*255.;
  vec3 vv=vec3(1.-gVT*(1.-gCv),floor(vf)/255.,fract(vf));
  if(mm>=0.&&st<5&&ec<1.){mm=-1.;t=1400.;}
  if(mm<0.){vec3 pe=ro+rd*t;t=pe.y>215.?1900.:min(t,1300.);o=uP[23].w>.5?vec4(vv,N==0?1.:0.):FLT?vec4(0,0,t,pe.y>215.?-1.:-2.):vec4(0,0,0,t/2000.);return;}
  vec2 on=oct(normalize(n));
  o=FLT?vec4(on,t,mm+clamp(mx,0.,.99)):vec4(on*.5+.5,mm/8.,t/2000.);
  if(uP[23].w>.5) o=vec4(vv,ec);
}
`,je=`
out vec4 o;
vec3 unoct(vec2 e){vec3 n=vec3(e,1.-abs(e.x)-abs(e.y));if(n.z<0.)n.xy=(1.-abs(n.yx))*vec2(n.x>=0.?1.:-1.,n.y>=0.?1.:-1.);return normalize(n);}
void gbuf(out float t,out vec3 n,out int m,out float gx){
  vec4 gb=texelFetch(uO,ivec2(gl_FragCoord.xy*uP[12].w),0);
  if(FLT){t=gb.z;m=int(floor(gb.w));gx=fract(gb.w);n=unoct(gb.xy);if(gb.w<-1.5)m=-2;else if(gb.w<0.)m=-1;}
  else{t=gb.w*2000.;m=gb.z>.99?-1:int(gb.z*8.+.5);gx=.5;n=unoct(gb.xy*2.-1.);if(gb.x==0.&&gb.y==0.)m=t>1500.?-1:-2;}
}
// light L: 0 the sun through the openings, 1.. each opening as a disc of sky
void lightL(int L,vec3 p,vec3 n,int m,float sv,out vec3 dir,out vec3 rad,out float lim,out float k){
  vec3 sunC=uP[5].rgb*uP[4].w;
  if(L==0){
    dir=LS; float nl=dot(n,LS);
    rad=sunC*sv*(max(nl,0.)+(m==2||m==6?.2*max(-nl,0.)+.04:0.))*(m==4?.12:1.); lim=120.; k=12.;
  } else {
    vec4 a=D(L-1,0),b=D(L-1,1);
    vec3 l=vec3(a.x,a.y+8.,a.z)-p; float dl=length(l); dir=l/dl;
    // the opening as a disc of sky: no wrap (the rock round the mouth lit from every side read as cumulus), and capped
    // near the mouth, where the disc stops being a point
    rad=holeRad(L-1)*3.1416*b.x*b.x/(dl*dl+4.*b.x*b.x)*max(dir.y,0.)*max(dot(n,dir)*.97+.03,0.);
    lim=dl-6.; k=4.;
  }
}
`,Aa=`
void main(){
  vec2 uv=gl_FragCoord.xy/uP[3].w;
  vec3 rd=ray(uv);
  float t; vec3 n; int m; float gx;
  gbuf(t,n,m,gx);
  if(m<0){o=vec4(1);return;}
  vec3 p=CAM+rd*t;
  float sv=sunVis(p), ao=0., sc=1., hA=0., res=1., ts=0., lim=0., kk=0.;
  vec3 dir=vec3(0), rad=vec3(0), S=vec3(1);
  int L=-1, ai=1, cnt=0, NL=NH+1, MS=int(uP[14].z);
  float F=m==2||m==6?0.:sst(150.,250.,t)*t*2.*uP[1].w/uP[3].w/max(dot(n,-rd),.25); // not on the crowns: it dims the sunlit jungle
  bool nx=false;
  for(int i=0;i<4+NL*MS;i++){
    if(nx){
      for(int z=0;z<K4;z++){if(L>=NL)break; lightL(L,p,n,m,sv,dir,rad,lim,kk); if(max(rad.r,max(rad.g,rad.b))>1e-4)break; L++;}
      if(L>=NL)break;
      res=1.; ts=.25+.002*t; cnt=0; nx=false;
    }
    if(L<0) hA=.5*float(ai*ai)*(1.+t*.006);
    vec3 q=L<0?p+n*hA:p+n*(.15+.003*t)+dir*ts;
    float h=scene(q);
    if(L<0){ao+=sc*max(hA-h,0.)/hA;sc*=.65;ai++;if(ai>4){L=0;nx=true;}}
    else{
      res=min(res,F>0.?h/max(ts/kk,F):kk*h/ts); ts+=clamp(h,.25+ts*.03,40.); cnt++;
      if(res<.02||ts>lim||cnt>=MS){float s=clamp(res,0.,1.); if(L==0)S.x=s; else if(L==1)S.y=s; else S.z=min(S.z,s); L++; nx=true;}
    }
  }
  o=vec4(clamp(1.-ao*.5,0.,1.),S);
}
`,Ra=`
// the sky seen through an opening: blue with its own cloud, held below clipping (the light it gives is holeRad's)
vec3 skyC(vec3 r){
  vec3 s=uP[6].rgb*uP[5].w;
  vec3 c=s*mix(vec3(.5,.74,1.25),vec3(.95,1.,1.08),1.-sst(.2,.9,r.y))*.04;
  vec2 q=r.xz/max(r.y,.08)*700.+uP[7].xz*4.;
  float cn=.7*n3(vec3(q*.0007,.37))+.3*n3(vec3(q*.0024,.81));
  float cv=sst(.62-.3*uP[24].z,.8-.2*uP[24].z,cn);
  vec3 cc=s*.12*(.7+.5*sst(.25,.75,n3(vec3(q*.0016,.12))));
  c=mix(c,cc,cv);
  float m=max(dot(r,LS),0.);
  return c+uP[5].rgb*uP[4].w*(.01*pow(m,8.)+3.*pow(m,3000.))*(1.-.7*cv);
}
// a liana seen across a pixel: dark green, lit by the openings above it and by the sun where it reaches
vec3 vineC(vec3 p){
  vec3 E=uP[17].rgb*.8+uP[5].rgb*uP[4].w*sunVis(p)*.04;
  for(int i=0;i<NH;i++){vec4 a=D(i,0),b=D(i,1); vec3 l=vec3(a.x,a.y+8.,a.z)-p; float dl=length(l); E+=holeRad(i)*3.1416*b.x*b.x/(dl*dl+b.x*b.x)*max(l.y/dl,0.)*.4;}
  return vec3(.025,.04,.018)*(.7+.6*n3(p*.11))*E/3.1416;
}
void main(){
  vec2 uv=gl_FragCoord.xy/uP[3].w;
  vec3 ro=CAM, rd=ray(uv);
  float t; vec3 n; int m; float gx;
  gbuf(t,n,m,gx);
  vec4 vv=texelFetch(uV,ivec2(gl_FragCoord.xy*uP[12].w),0);
  vec3 col=vec3(0);
  if(m==-1) col=skyC(rd);
  else if(m>=0){
    vec3 p=ro+rd*t;
    vec4 A0=D(0,0); vec4 pc=uP[15];
    // ---- material ----
    vec3 al; float wet=.25, gls=60., sk=1.;
    vec3 rk=uP[10].rgb;
    float lod=sst(40.,220.,t);
    float nb=n3(p*.013+.4), nf=mix(n3(p*.11),.5,lod);
    // distance to the shaft (its axis from the opening to the jungle): moss, ferns and the light all fall off with it
    vec3 ab=pc.xyz-A0.xyz; float hb=clamp(dot(p-A0.xyz,ab)/dot(ab,ab),0.,1.);
    vec3 cl=A0.xyz+ab*hb-p; float dc=length(cl);
    if(m==0||m==3){
      float yb=bedY(p), fb=fract(yb/6.3);
      vec3 bh=h3(vec2(floor(yb/6.3),9.));
      float fl=min(flowF(p),1.);
      al=rk*(.72+.55*nb)*(.66+.68*bh.x)*(1.-.45*notch(yb));
      al*=.9+.2*n3(vec3(p.x*.03,p.y*.15,p.z*.03)+bh.y); // thin laminae inside each bed
      al=mix(al,vec3(.58,.5,.39)*(.8+.4*n3(vec3(p.x*.05,p.y*.006,p.z*.05))),fl*.75);
      float ws=sst(.56,.8,n3(vec3(p.x*.02,p.y*.0017,p.z*.02)+.7))*(1.-.6*fl);
      al*=1.-.6*ws; // dark wet streaks down from the cracks
      wet=.05+.45*ws+.2*fl; gls=25.;
      if(m==3){al=mix(al,vec3(.5,.46,.4),.35);wet=.4;}
      // moss and ferns only near the light: on ledges and in the wet streaks, thinning with distance from the shaft
      float near=sst(uP[16].z>0.?150.:85.,12.,dc)+sst(-30.,5.,p.y-A0.y)*sst(-30.,0.,hm(0,p.xz).y+20.);
      float grow=clamp(near,0.,1.)*clamp(sst(.3,.75,n.y)+.3*ws,0.,1.)*sst(.3,.6,nb+.25*nf);
      al=mix(al,mix(vec3(.05,.1,.025),vec3(.1,.13,.035),nf)*(.6+.6*nb),grow*.9);
      wet*=1.-.6*grow;
      sk=mix(1.,mix(.2,1.,grow),sst(A0.y-80.,A0.y-120.,p.y)); // bare rock low in the chamber, as on the talus below
      if(p.y>A0.y-5.) wet*=.3;
    } else if(m==1){
      float jm=1.-sst(.55,1.,length(p.xz-uP[21].yz)/uP[12].z);
      al=rk*vec3(.85,.88,.9)*(.55+.6*nb)*(.88+.24*nf);
      float gap=1.-sst(.2,1.4,gx*2.+.4*(nf-.5));
      al=mix(al,vec3(.12,.10,.08),gap*.6); // mud between blocks
      wet=.35+.5*gap+.2*nf;
      float moss=clamp(jm*1.6+.5*sst(.6,.8,nb)*(1.-sst(0.,60.,p.y)),0.,1.)*sst(0.,.6,n.y);
      al=mix(al,vec3(.06,.10,.03)*(.6+.8*nf),moss);
      sk=mix(.18,1.,moss); gls=22.; // bare talus in the sun (hold): at the jungle's exposure its 3x albedo clipped to white; keep it near the sunlit jungle's level
      al*=1.-.4*wet;
    } else if(m==2||m==6){
      float id=m==2?gx:fract(nb*7.);
      vec3 a1=vec3(.045,.075,.02),a2=vec3(.11,.14,.03),a3=vec3(.06,.085,.045),a4=vec3(.13,.13,.05);
      float ci=fract(id*5.3);
      al=ci<.4?mix(a1,a2,ci*1.5):ci<.75?mix(a3,a1,(ci-.4)*2.):mix(a2,a4,(ci-.75)*4.);
      al*=.7+.6*nf;
      al=mix(al,vec3(.24,.06,.045)*(.75+.5*nf),uP[16].y*step(.8,fract(id*11.1))*(.55+.45*sst(.3,.7,nf)));
      if(m==2) al*=mix(.3,1.,sst(uP[12].z*1.1,uP[12].z*.3,length(p.xz-pc.xz))); // crowns away from the light go to silhouette
      wet=.08; gls=12.;
    }
    else { al=vec3(.025,.04,.018)*(.7+.6*nf); wet=.05; }
    // ---- occlusion and shadows from A2 ----
    vec4 SH=texelFetch(uB,ivec2(gl_FragCoord.xy),0);
    float ao=SH.x, sv=sunVis(p), sh1=SH.z, lim, kk;
    vec3 E=vec3(0), dir, rad;
    for(int L=0;L<NH+1;L++){lightL(L,p,n,m,sv,dir,rad,lim,kk); E+=rad*(L==0?SH.y*sk:L==1?SH.z:SH.w);}
    // the sunlit jungle as an upward area light, the glowing shaft as a line light, the chamber's multi-bounce
    vec3 sunC=uP[5].rgb*uP[4].w;
    vec3 l=uP[13].xyz-p; float dl=length(l); l/=dl;
    E+=sunC*uP[25].rgb*(m==2?.07:.26)*uP[13].w*pc.w*pc.w/(dl*dl+pc.w*pc.w)*max(-l.y+.4,0.)*max(dot(n,l)*.8+.2,0.)*ao*uP[8].w;
    E+=sunC*uP[16].x*max(dot(n,cl/dc)*.85+.15,0.)*150./(dc+150.)*mix(ao,1.,.3);
    E+=uP[17].rgb*ao*(.6+.4*n.y);
    // your own headlamp on the nearest rock: warm, falling off within a few metres
    vec3 lsp=vec3(0);
    if(uP[24].x>0.){vec3 lp=CAM+vec3(.2,.3,0.)-p; float d2=dot(lp,lp), d1=sqrt(d2); E+=vec3(1.,.74,.48)*uP[24].x*.35*max(dot(n,lp/d1),0.)*(1.-sst(5.,15.,d1))/(d2+2.)*mix(ao,1.,.5); lsp=vec3(1.,.8,.6)*uP[24].x*(wet+.08)*.3*pow(max(dot(n,-rd),0.),24.)/(d2+2.)*(1.-sst(4.,12.,d1));}
    if(m==2) E+=uP[6].rgb*uP[5].w*.06*ao*(.4+.6*n.y);
    col=al*E/3.1416+lsp;
    // wet sheen: the opening and the shaft mirrored in wet stone
    gls=mix(gls,5.,sst(12.,90.,t)); wet*=mix(1.,.35,sst(12.,90.,t));
    vec3 r=reflect(rd,n);
    vec3 hd=normalize(vec3(A0.x,A0.y+15.,A0.z)-p);
    vec3 bd=normalize(A0.xyz+ab*.6-p);
    float fr=.07+.6*pow(1.-max(dot(n,-rd),0.),5.);
    float om=3.1416*D(0,1).x*D(0,1).x/max(dot(A0.xyz-p,A0.xyz-p),1.);
    vec3 env=holeRad(0)*min(1.,om*(gls+2.)/6.283)*pow(max(dot(r,hd),0.),gls)*sh1*1.5+sunC*uP[16].x*.15*pow(max(dot(r,bd),0.),gls*.4);
    col+=wet*fr*env*ao*uP[25].w;
    if(vv.a<1.) col=mix(skyC(rd),col,vv.a);
  }
  float vt=(vv.g*255.+vv.b)*(2000./255.);
  if(vv.r>0.&&(m<0||vt<t)){col=mix(col,vineC(ro+rd*vt),vv.r); if(vv.r>.5) t=vt;} // the mist is marched to the strand
  if(!(col.r>=0.&&col.g>=0.&&col.b>=0.&&col.r+col.g+col.b<6e4)) col=vec3(0);
  if(FLT) o=vec4(col,t); else {vec3 c=col/(1.+col); o=vec4(c,t/2000.);}
}
`,La=`
out vec4 o;
float fogD(vec3 p,vec4 a,vec4 b0){
  vec3 w=uP[7].xyz;
  float base=uP[7].w*(.45+.9*exp(-max(p.y-20.,0.)*.012));
  float b=.72*n3((p-w)*vec3(.0045,.008,.0045))+.28*n3((p-w*1.4)*.016+.5);
  float banks=uP[8].x*sst(.38,.85,b)*sst(0.,70.,p.y)*(1.-sst(70.,140.,p.y+30.*(b-.5)));
  float cl=0.;
  if(p.y>a.y-95.){
    // the cave's own cloud: a sheet with a ragged flat base hanging in the mouth, thin over the middle so the sky shows,
    // pouring down in long torn veils (not round puffs)
    float m=hmD(0,a,b0,p.xz).x; vec3 q=p-w*1.6;
    float sheet=sst(a.y-42.,a.y-14.,p.y+16.*(n3(q*vec3(.011,.004,.011)+.7)-.5))*(1.-sst(a.y+15.,a.y+45.,p.y))*sst(.4,.62,n3(q*vec3(.0065,.0028,.0065)+.2));
    float veil=sst(.6,.82,n3(vec3(q.x*.07,q.y*.004,q.z*.07)+.3))*sst(a.y-95.,a.y-40.,p.y)*(1.-sst(a.y-30.,a.y-12.,p.y));
    cl=uP[8].y*.003*sst(-14.,6.,m)*(1.-.7*sst(8.,26.,m))*(sheet+.6*veil);
  }
  vec4 cs=uP[18];
  float sea=cs.z>0.?cs.z*(1.-sst(cs.x-cs.y*.4,cs.x+cs.y,p.y+22.*(n3((p-w)*vec3(.008,.02,.008))-.5))):0.;
  vec3 dp=p-uP[13].xyz;
  float pl=0.;
  if(dot(dp.xz,dp.xz)<uP[15].w*uP[15].w*7.&&abs(dp.y-53.)<67.) pl=uP[16].w*uP[13].w*exp(-dot(dp.xz,dp.xz)/(uP[15].w*uP[15].w*1.7))*sst(-14.,4.,dp.y)*(1.-sst(8.,120.,dp.y))*sst(.38,.78,n3((p-w*.5-vec3(0.,TIME*1.3,0.))*vec3(.013,.007,.013)+.4));
  return base+banks+cl+sea+pl;
}
void main(){
  vec2 uv=gl_FragCoord.xy/uP[20].y;
  vec3 ro=CAM, rd=ray(uv);
  float tE=min(decT(sA(uv).a),1200.);
  if(rd.y>.05) tE=min(tE,(uP[23].x+12.-ro.y)/rd.y); // the cave's mist ends at the ground surface: above it is the sky (skyC)
  if(uP[26].y>.5&&rd.y<0.) tE=min(tE,(uP[26].x-ro.y)/rd.y); // and at the lake
  int N=int(uP[14].y);
  float jit=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715)))+uP[2].w*.618034);
  float dt=tE/float(N);
  float mu=dot(rd,LS), g=.62;
  float ph=.7*(1.-g*g)/(12.566*pow(1.+g*g-2.*g*mu,1.5))+.3/12.566;
  vec3 sunC=uP[5].rgb*uP[4].w*uP[8].w;
  vec4 pc=uP[15];
  vec3 acc=vec3(0); float T=1.;
  vec4 a0=D(0,0), b0=D(0,1);
  for(int i=0;i<N;i++){
    vec3 p=ro+rd*((float(i)+jit)*dt);
    float de=fogD(p,a0,b0);
    vec3 S=uP[17].rgb*.5;
    float sv=0.;
    for(int k=0;k<NH;k++){
      vec4 a=D(k,0),b=D(k,1); vec3 d=vec3(a.x,a.y+10.,a.z)-p; S+=uP[6].rgb*uP[5].w*b.w*b.x*b.x/(dot(d,d)+b.x*b.x)*.065;
      float s=1.;
      if(p.y<a.y){vec3 q=p+LS*((a.y-p.y)/LS.y); float w=.3+.009*(a.y-p.y); s=sst(-w,w,hmD(k,a,b,q.xz).x);}
      if(p.y<a.w){vec3 q=p+LS*((a.w-p.y)/LS.y); float w=.3+.009*(a.w-p.y)+(p.y>a.y-2.?4.:0.); s*=sst(-w,w,hmD(k,a,b,q.xz).y);}
      sv=max(sv,s);
    }
    vec3 d=uP[13].xyz-p; S+=sunC*uP[25].rgb*vec3(.97,1.14,1.)*.009*uP[13].w*pc.w*pc.w/(dot(d,d)+pc.w*pc.w);
    // seen along the shaft the cloud's shadow pattern is met end-on and read as cotton puffs: there it evens out
    if(sv>0.) S+=sunC*sv*mix(cloudTA(p,a0),.45,sst(.4,.8,abs(mu)))*ph;
    float a=exp(-de*dt);
    acc+=T*S*(1.-a); T*=a;
  }
  if(!(acc.r>=0.&&acc.g>=0.&&acc.b>=0.&&acc.r<6e4&&T>=0.)){acc=vec3(0);T=1.;}
  o=vec4(acc,T);
}
`,_a=`
out vec4 o;
vec3 comp(vec2 uv){vec4 a=sA(uv),b=textureLod(uB,uv,0.);vec3 v=decC(a.rgb)*b.a+b.rgb;return (v.r>=0.&&v.g>=0.&&v.b>=0.&&v.r+v.g+v.b<6e4)?v:vec3(0);}
void main(){
  vec2 uv=gl_FragCoord.xy/96.; vec3 s=vec3(0);
  for(int i=0;i<K4*3;i++){float a=float(i)*2.39996; float r=sqrt((float(i)+.5)/12.)*.03; s+=comp(uv+r*vec2(cos(a),sin(a)));}
  o=vec4(s/12.,1.);
}
`,Sa=`
out vec4 o;
void main(){
  vec2 uv=gl_FragCoord.xy/uP[3].w;
  vec2 e=vec2(.7/uP[20].y,0.);
  vec4 a=sA(uv), b=.25*(textureLod(uB,uv+e.xy,0.)+textureLod(uB,uv-e.xy,0.)+textureLod(uB,uv+e.yx,0.)+textureLod(uB,uv-e.yx,0.));
  vec3 col=decC(a.rgb); float t=decT(a.a);
  bool lake=false;
  if(uP[26].y>.5){
    vec3 rd=ray(uv); float W=uP[26].x, tw=(W-CAM.y)/rd.y;
    if(rd.y<0.&&tw<t){
      // the flooded floor: still black water, a mirror of the lit frame (the reflected ray marched against its depth)
      lake=true; vec3 P=CAM+rd*tw; vec3 nw=vec3(0,1,0);
      // slow rings where drips land: each drip at a new place (no loop)
      for(int k=0;k<K2+1;k++){
        float pk=4.1+1.7*float(k), ph=TIME/pk+float(k)*.37, ag=fract(ph)*pk;
        vec3 hr=h3(vec2(floor(ph)*1.37+float(k)*17.,float(k)+3.));
        vec2 dq=P.xz-CAM.xz-uP[1].xz*(8.+60.*hr.z)-(hr.xy-.5)*vec2(50.,50.);
        float dd=length(dq)+1e-3, x=dd-ag*.9;
        nw.xz+=dq/dd*sin(x*7.)*exp(-x*x*3.)*exp(-ag*.45)*.035;
      }
      nw=normalize(nw);
      vec3 rr=reflect(rd,nw); float L=.8+.02*tw, ed=1.; vec2 su=vec2(0); bool hit=false;
      for(int i=0;i<int(uP[26].z);i++){
        vec3 d=P+rr*L-CAM; float z=dot(d,uP[1].xyz);
        su=vec2(dot(d,uP[2].xyz),dot(d,uP[3].xyz))/(max(z,.01)*uP[1].w)*.5+.5;
        if(z<.5||su.y>1.||su.x<0.||su.x>1.||su.y<0.) break;
        if(length(d)>decT(sA(su).a)+.4+.03*L){hit=true;break;}
        L*=1.32;
      }
      if(hit){float l0=L/1.32,l1=L; for(int i=0;i<K4;i++){float lm=.5*(l0+l1); vec3 d=P+rr*lm-CAM; vec2 sv2=vec2(dot(d,uP[2].xyz),dot(d,uP[3].xyz))/(max(dot(d,uP[1].xyz),.01)*uP[1].w)*.5+.5; if(length(d)>decT(sA(sv2).a)+.4+.03*lm){l1=lm;su=sv2;}else l0=lm;}}
      // off the top of the frame: the roof, and the sky where the reflected ray finds an opening
      vec3 rc=uP[17].rgb*.25;
      for(int i=0;i<NH;i++){vec4 h=D(i,0); if(rr.y>.05){vec3 q=P+rr*((h.y-P.y)/rr.y); rc=mix(rc,uP[6].rgb*uP[5].w*.05,sst(-3.,3.,hm(i,q.xz).x));}}
      if(hit){ed=sst(1.,.9,su.y)*sst(0.,.05,su.x)*sst(1.,.95,su.x); vec4 bb=textureLod(uB,su,0.); rc=mix(rc,decC(sA(su).rgb)*bb.a+bb.rgb,ed);}
      float fr=.03+.97*pow(1.-max(dot(-rd,nw),0.),5.);
      col=rc*mix(.3,.8,fr)+col*.03;
      t=tw;
    }
  }
  if(t<1500.&&!lake){
    vec3 p=CAM+ray(uv)*t;
    // the lake's mark on what stands out of it: dark and wet just above the water, a pale lime tide line
    if(uP[26].y>.5){float hw=p.y-uP[26].x; float lm=dot(col,vec3(.3,.5,.2)); col*=mix(.4,1.,sst(.1,.5,hw)); col=mix(col,vec3(lm)*vec3(1.2,1.3,.85)*1.7,.5*sst(.42,.5,hw)*sst(.62,.54,hw));}
    float sv=sunVis(p);
    if(sv>0.) col*=mix(1.,cloudT(p)*uP[8].w,.92*sv);
    if(p.y>uP[17].w&&p.y<uP[19].w) for(int k=0;k<int(uP[12].y);k++){
      vec4 L=D(k,4); vec3 d=p-L.xyz;
      col+=uP[19].rgb*exp(-dot(d.xz,d.xz)/(L.w*L.w))*(1.-sst(1.,5.,abs(d.y)))*sst(8.,40.,t); // a pool near you would clip
    }
  }
  col=col*b.a+b.rgb;
  vec3 gw=vec3(0);
  for(int i=0;i<K2*3;i++){float an=float(i)*1.0472+.4; gw+=textureLod(uG,uv+.06*vec2(cos(an),sin(an)),0.).rgb;}
  col+=uP[20].z*(textureLod(uG,uv,0.).rgb*.7+gw*.05);
  col*=uP[20].x;
  col+=.3*col*exp(-col*40.);
  col=max(col,0.); col=(col*(2.51*col+.03))/(col*(2.43*col+.59)+.14);
  col=pow(col,vec3(.4545));
  col=col*.975+vec3(.004,.007,.012);
  float gr=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5; // still grain, keyed to the pixel
  col+=gr*.008;
  vec2 q=uv-.5; col*=1.-.07*dot(q,q);
  o=vec4(col,1.);
}
`,Da="out vec4 o; void main(){o=texelFetch(uO,ivec2(gl_FragCoord.xy),0);}",Fa=`
layout(location=0) in vec4 aP;
out vec4 vC; out float vK; out vec2 vF;
void main(){
  vec3 p=aP.xyz; float kind=floor(aP.w), sd=fract(aP.w);
  vK=kind; vC=vec4(0); vF=vec2(0);
  vec3 d=p-CAM; float z=dot(d,uP[1].xyz);
  vec2 sc=vec2(dot(d,uP[2].xyz),dot(d,uP[3].xyz))/(max(z,.01)*uP[1].w);
  gl_Position=vec4(sc,0.,1.); gl_PointSize=1.;
  if(z<1.||aP.w<0.||(uP[26].y>.5&&p.y<uP[26].x+1.)){gl_Position=vec4(3.,3.,0.,1.);return;}
  float dist=length(d);
  vec2 uv=sc*.5+.5;
  float dA=decT(sA(uv).a);
  float Tf=textureLod(uB,uv,0.).a;
  float Tp=pow(max(Tf,.002),clamp(dist/max(dA,1.),0.,1.));
  float px=uP[3].w/1000.;
  if(dist>dA+2.){gl_Position=vec4(3.,3.,0.,1.);return;}
  if(kind<.5){
    float sv=sunVis(p)*cloudT(p)*uP[8].w;
    float fl=sin(TIME*(17.+9.*sd)+sd*40.)*step(.45,fract(TIME*.3+sd*7.));
    vec3 lit=uP[5].rgb*min(uP[4].w,40.)*.06*sv*(.85+.15*fl);
    vC=vec4(lit*Tp*1.6,0.);
    vF=vec2(0.,fl);
    gl_PointSize=clamp(px*900./dist,1.5,3.);
    if(sv<.02){gl_Position=vec4(3.,3.,0.,1.);return;}
  } else if(kind<1.5){
    float on=.8+.2*sin(TIME*.37+sd*31.)*sin(TIME*.23+sd*17.);
    vC=vec4(vec3(1.,.74,.42)*Tp*on*1.7,0.);
    gl_PointSize=max(2.5,px*8.);
  } else {
    vC=vec4(vec3(1.,.55,.22)*Tp*.8,0.);
    gl_PointSize=max(3.,px*13.);
  }
}
`,Na=`
in vec4 vC; in float vK; in vec2 vF;
out vec4 o;
void main(){
  vec2 q=gl_PointCoord*2.-1.; float r2=dot(q,q);
  if(vK<.5){
    // a swift crossing the beam: a lit fleck, no shape
    float s=1.-sst(.3,1.,r2);
    o=vec4(vC.rgb*s,0.);
  }
  else {float s=exp(-r2*14.)*1.3+exp(-r2*4.)*.1; o=vec4(vC.rgb*s,0.);}
}
`;function Ca(o){if(o.__c577)return o.__c577;const e=!!o.getExtension("EXT_color_buffer_float"),i=!e&&!!o.getExtension("EXT_color_buffer_half_float"),l=o.getExtension("KHR_parallel_shader_compile");l&&l.maxShaderCompilerThreadsKHR&&l.maxShaderCompilerThreadsKHR(4294967295);const w=(E,q)=>{const _=o.createShader(E);return o.shaderSource(_,q),o.compileShader(_),_},p=w(o.VERTEX_SHADER,ge+Ea),d=w(o.VERTEX_SHADER,ge+Oe+Fa),v={a1:[p,za,`#define NOVINE
`],a2:[p,je+Aa],a3:[p,je+Ra],b:[p,La],g:[p,_a],c:[p,Sa],k:[p,Da],m:[d,Na]},c={};for(const E in v){const q=o.createProgram(),_=w(o.FRAGMENT_SHADER,ge+(v[E][2]||"")+Oe+v[E][1]);o.attachShader(q,v[E][0]),o.attachShader(q,_),o.linkProgram(q),c[E]={p:q,v:v[E][0],f:_}}return o.flush(),ka(),o.__c577={P:c,flt:e,half:i,tN:null,vEmpty:o.createVertexArray(),slots:new Map,linked:!1}}function qa(o,e,i){if(e.linked)return;const l=e.P,w=o.createTexture();o.bindTexture(o.TEXTURE_3D,w),o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.texImage3D(o.TEXTURE_3D,0,o.R16F,64,64,64,0,o.RED,o.HALF_FLOAT,be),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MAG_FILTER,o.LINEAR);for(const d of[o.TEXTURE_WRAP_S,o.TEXTURE_WRAP_T,o.TEXTURE_WRAP_R])o.texParameteri(o.TEXTURE_3D,d,o.REPEAT);o.pixelStorei(o.UNPACK_ALIGNMENT,4),e.tN=w;const p={k:null,g:i.Gl,c:i.O,b:i.B,m:i.O,a3:i.A,a1:i.Gb,a2:i.Sh};o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST);for(const d of["k","g","c","b","m","a3","a1","a2"]){const{p:v,v:c,f:E}=l[d];if(!o.getProgramParameter(v,o.LINK_STATUS))throw new Error("577 "+d+": "+(o.getShaderInfoLog(c)||"")+(o.getShaderInfoLog(E)||"")+o.getProgramInfoLog(v));o.useProgram(v),["uN","uM","uD","uA","uB","uG","uO","uV"].forEach((q,_)=>{const B=o.getUniformLocation(v,q);B&&o.uniform1i(B,_)}),l[d]={p:v,uP:o.getUniformLocation(v,"uP")},o.bindFramebuffer(o.FRAMEBUFFER,p[d]?p[d].fb:null),o.viewport(0,0,1,1),d==="m"?(o.bindVertexArray(i.va),o.drawArrays(o.POINTS,0,1)):(o.bindVertexArray(e.vEmpty),o.drawArrays(o.TRIANGLES,0,3)),o.flush()}o.bindVertexArray(null),e.linked=!0}function mt(o,e,i,l,w){const p=o.createTexture();o.bindTexture(o.TEXTURE_2D,p),w==="g"&&e.flt?o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,i,l,0,o.RGBA,o.FLOAT,null):(w==="f"||w==="g")&&(e.flt||e.half)?o.texImage2D(o.TEXTURE_2D,0,o.RGBA16F,i,l,0,o.RGBA,o.HALF_FLOAT,null):o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,i,l,0,o.RGBA,o.UNSIGNED_BYTE,null);const d=w==="g"||w==="s"?o.NEAREST:o.LINEAR;o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,d),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,d),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);const v=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,v),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,p,0),o.bindFramebuffer(o.FRAMEBUFFER,null),{tex:p,fb:v,w:i,h:l}}ye.add({num:577,name:"Cave Jungle",fam:"Vistas",recipe:"Deep in a huge cave, with sunlight falling from a collapsed hole in the roof onto a little jungle on the floor, headlamps crossing the boulders and swifts flicking through the beam. The light, the shape of the hole, where you stand and the cave cloud change every mint. Drag to push the cloud across the hole so the beam breaks up and comes back, or hold to move the hour on slowly.",interactive:"Drag to push the cave cloud across the doline: the shaft breaks into rays and reforms. Hold to move the hour on slowly: the sun slides across the opening until the beam leaves the rim; under an overcast the sun breaks through, and at dusk night comes on.",music:!0,gl:!0,fps:30,seed:0,make(o){const e=o.gl,i=o.size,l=Ca(e),w=l.P;let p=o.hash;if(Ge){for(let t=0;t<He.length;t++)if(p===ye.hashFor(576,1e3+t)){p=He[t];break}}const d=o.home;let v=2654435769;for(let t=2;t<p.length;t+=8)v=Math.imul(v^parseInt(p.slice(t,t+8),16),2246822507)>>>0;const c=()=>{v=v+1831565813|0;let t=Math.imul(v^v>>>15,1|v);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},E=t=>{let a=0;for(const n in t)a+=t[n];let s=c()*a;for(const n in t)if(s-=t[n],s<0)return n;return Object.keys(t)[0]};let q=E({"Great doline":56,"Narrow shaft":32,"Twin dolines":12}),_=E({"High noon":58,"Slanting sun":31,"Passing clouds":11}),B=E({"Thin mist":42,"Fog banks":44,"Cloud sea":14}),j=E({Rainforest:56,"Ferns and saplings":30,"Red-flowering crowns":14}),xt=E({"Headlamp line":50,"Two climbers":32,"Camp below":18}),H=E({"Giant stalagmite":50,"Stalagmite forest":35,"Bare chamber":15}),Pt=E({"Grey limestone":50,"Ochre flowstone":36,"Green algae":14}),Yt=E({Swifts:60,"Few swifts":28,"Great flock":12});d&&(q="Great doline",_="High noon",B="Fog banks",j="Rainforest",xt="Headlamp line",H="Giant stalagmite",Pt="Grey limestone",Yt="Swifts");let pt=1467619301;for(let t=2;t<p.length;t+=8)pt=Math.imul(pt^parseInt(p.slice(t,t+8),16),668265263)>>>0;const Ke=()=>{pt=pt+1831565813|0;let t=Math.imul(pt^pt>>>15,1|pt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let Wt="Boulder slope";{const t=Ke();Wt=t<.55?"Boulder slope":t<.86?"Across the chamber":"Passage mouth"}d&&(Wt="Boulder slope");let yt=1467203806;for(let t=2;t<p.length;t+=8)yt=Math.imul(yt^parseInt(p.slice(t,t+8),16),374761393)>>>0;const Ba=()=>{yt=yt+1831565813|0;let t=Math.imul(yt^yt>>>15,1|yt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},D=[];for(let t=0;t<16;t++)D.push(Ba());const Ye=(t,a)=>{let s=0;for(const n in t)s+=t[n];a*=s;for(const n in t)if(a-=t[n],a<0)return n;return Object.keys(t)[0]};let y=Ye({"Noon beam":42,"Skylight only":17,"Beam on the wall":14,"Many rays":12,Dusk:11,Moonlight:4},D[0]),h=D[3]<.5?Wt:Ye({"Under the doline":34,"High ledge":33,"Long lens":33},D[4]);h==="Long lens"&&(y==="Skylight only"||y==="Dusk")&&(h="Under the doline");let Jt=D[5]<.22?"Long rift":"Round shaft",we=y==="Dusk"||y==="Moonlight"||D[6]<.45,bt=1467261214;for(let t=2;t<p.length;t+=8)bt=Math.imul(bt^parseInt(p.slice(t,t+8),16),739982445)>>>0;const Ua=()=>{bt=bt+1831565813|0;let t=Math.imul(bt^bt>>>15,1|bt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},U=[];for(let t=0;t<12;t++)U.push(Ua());U[2]<.09&&(y="Gold beam");const st=U[1]<.12;st&&(B="Flooded floor"),h==="Long lens"&&y==="Beam on the wall"?h=H!=="Bare chamber"?"Stalagmite foot":"Boulder slope":!st&&H!=="Bare chamber"&&U[0]<.13&&(h="Stalagmite foot"),st&&(h="Boulder slope"),h==="Under the doline"&&Jt==="Long rift"&&(h="Across the chamber"),!st&&(y==="Dusk"||y==="Skylight only")&&(h==="Across the chamber"||h==="Passage mouth")&&(h=H!=="Bare chamber"?"Stalagmite foot":"Boulder slope"),d&&(y="Noon beam",h="Boulder slope",Jt="Round shaft",we=!1);const Ia=y==="Noon beam"||y==="Many rays"||y==="Beam on the wall"||y==="Moonlight"||y==="Gold beam";o.trait("Doline",q),o.trait("Light",y==="Noon beam"?_:y),o.trait("Cave cloud",B),o.trait("Jungle",j),o.trait("Expedition",xt),o.trait("Stalagmites",H),o.trait("Rock",Pt),o.trait("Swifts",Yt),o.trait("Vantage",h),o.trait("Opening",Jt),o.trait("Your lamp",we?"Lit":"Off");const S=new Float32Array(27*4),b=(t,a,s,n,f)=>{S[t*4]=a,S[t*4+1]=s,S[t*4+2]=n,S[t*4+3]=f},W=[10+(c()-.5)*20,-20+(c()-.5)*16,185+(c()-.5)*20,240+(c()-.5)*20];d&&(W[0]=10,W[1]=-20,W[2]=185,W[3]=240);const We=262,V=t=>{const a=C(-150,-50,t)*(1-C(440,540,t));return[g(W[0],W[1],a)+16*Math.sin(t*.0105+1.3)+7*Math.sin(t*.031),g(40,-12,a),g(72,W[2],a)*(1+.1*Math.sin(t*.019+.4)),g(128,W[3],a)]},K=[0,0,88,30],et=(t,a)=>{const s=V(a);let n=g(96,74,C(-170,-15,a))-40*C(2,50,a)-42*C(40,190,a)+50*C(270,470,a);n+=75*C(.42,1,Math.abs(t-s[0])/s[2]);const f=t-K[0],R=a-K[1];return n+=K[3]*Math.exp(-(f*f+R*R)/(K[2]*K[2])),n+=14*(tt(t*.0016,a*.0016,.31)-.5)+6*(tt(t*.0058,a*.0058,.77)-.5),n},gt=t=>t-Math.floor(t),Ga=(t,a)=>{let s=Math.imul(Math.floor(t)|0,1664525)+1013904223>>>0,n=Math.imul(Math.floor(a)|0,1664525)+1013904223>>>0,f=Math.imul(577,1664525)+1013904223>>>0;return s=s+Math.imul(n,f)>>>0,n=n+Math.imul(f,s)>>>0,f=f+Math.imul(s,n)>>>0,s=(s^s>>>16)>>>0,n=(n^n>>>16)>>>0,f=(f^f>>>16)>>>0,s=s+Math.imul(n,f)>>>0,n=n+Math.imul(f,s)>>>0,f=f+Math.imul(s,n)>>>0,[s/4294967296,n/4294967296,f/4294967296]},Je=(t,a,s,n,f)=>{const R=t/s,F=a/s,P=Math.floor(R),A=Math.floor(F),Q=(R-P>=.5?1:0)-1,ot=(F-A>=.5?1:0)-1;let lt=0;for(let ht=0;ht<4;ht++){const L=P+Q+(ht&1),vt=A+ot+(ht>>1),Y=Ga(L+f,vt+f),Xt=t-(L+.2+.6*Y[0])*s,Vt=a-(vt+.2+.6*Y[1])*s,ue=Y[2]*6.2832,Ot=Math.cos(ue),de=Math.sin(ue),he=s*(.33+.22*gt(Y[0]*13.7)),J=Math.abs(Xt*Ot+Vt*de)/he,jt=Math.abs(-Xt*de+Vt*Ot)/(he*(.55+.45*gt(Y[2]*5.3))),Be=g(Math.max(J,jt),Math.hypot(J,jt),.3),ve=n*s*(.3+.7*gt(Y[1]*7.1));lt=Math.max(lt,ve*C(1,.6,Be)-.2*ve*J*gt(Y[1]*3.3))}return lt};let Zt=[0,0,1],Me=[0,0];const Ha=(t,a)=>{const s=1-C(.68,1.04,Math.hypot(t-Zt[0],a-Zt[1])/Zt[2]+.3*(tt(t*.0026,a*.0026,.53)-.5));return et(t,a)+Math.max(Je(t,a,17,.3,0)*(.25+.75*C(10,45,Math.hypot(t-Me[0],a-Me[1]))),Je(t,a,6,.32,57)*(1-.8*s))},Xa=(t,a)=>We-75*(1-C(-300,-90,a))+22*(tt(t*.0035,a*.0035,.41)-.5)+7*(tt(t*.031,a*.031,.9)-.5),Va=(t,a)=>{const s=V(a),n=(t-s[0])/s[2];return s[1]+s[3]*Math.sqrt(Math.max(0,1-n*n))};let Qt=(_==="Slanting sun"?52:64)*Math.PI/180+(d?0:(c()-.5)*.06),$t=-75*Math.PI/180+(d?0:(c()-.5)*.3);d||($t=(y==="Beam on the wall"?(D[1]<.5?-1:1)*(60+50*D[2]):D[1]*360-180)*Math.PI/180),y==="Beam on the wall"&&(Qt=(29+6*D[7])*Math.PI/180),y==="Gold beam"&&(Qt=(50+8*U[3])*Math.PI/180);const Pe=(t,a)=>[Math.cos(t)*Math.sin(a),Math.sin(t),Math.cos(t)*Math.cos(a)],te=Pe(Qt,$t),ee=Ia&&y!=="Beam on the wall"?te:Pe(78*Math.PI/180,$t),Tt=[],Te=(t,a,s,n,f,R)=>{const F=Va(t,a)-12,P=Math.max(Xa(t,a)-4,F+25),A=s*n;Tt.push({x:t,z:a,y0:F,y1:P,r0:s,r1:A,ext:A*1.5+12,pow:f,rough:R,ax:1+(c()-.5)*.3,az:1+(c()-.5)*.3,ox:(c()-.5)*s*.5,oz:(c()-.5)*s*.5,sx:c(),sy:c()})},Dt=q!=="Narrow shaft",Ze=d?-15:-15+(c()-.5)*36,Qe=d?235:235+(c()-.5)*40;if(Te(Ze,Qe,Dt?36+(d?0:(c()-.5)*8):21,Dt?2:1.8,.9,Dt?.32:.26),Jt==="Long rift"){const t=Tt[0];t.ax=1.65,t.az=.34,t.ext=t.r1*1.5*1.65+12}q==="Twin dolines"&&Te(Ze+(D[8]<.5?-1:1)*74,Qe+30,24,1.5,.5,.3);{const t=V(-230);Te(t[0]+8,-230,24,1.45,.8,.34)}const Oa=Tt.length,u=Tt[0];let T=u.x,z=u.z,O=30;for(let t=0;t<3;t++){const a=(u.y0-O)/ee[1];if(T=u.x-ee[0]*a,z=u.z-ee[2]*a,t===0)if(d)K[0]=T-8,K[1]=z+48;else{const s=T-V(0)[0]-52,n=z,f=Math.hypot(s,n)||1;K[0]=T+48*s/f,K[1]=z+48*n/f}O=et(T,z)+(j==="Ferns and saplings"?6:17)}const ke=j==="Ferns and saplings"?8:21,nt=Dt?52:40,ja=V(0),it=ja[0]+52,Ee=0;let ae=Math.tan(37*Math.PI/180),M=it,k=Ee,ft=-.2,kt=.05,$e=0;if(h==="Across the chamber"||h==="Passage mouth"){const t=h==="Across the chamber",a=V(t?-10:-125);k=t?-10:-125,M=a[0]+(t?-.52:.12)*a[2]}else if(h==="Under the doline"){const t=T-u.x,a=z-u.z,s=Math.hypot(t,a)||1;M=u.x-t/s*44,k=u.z-a/s*44;const n=V(k);M=Z(M,n[0]-.55*n[2],n[0]+.55*n[2])}else if(h==="Forest edge"){const t=Math.atan2(it-T,Ee-z)+(D[9]-.5)*1.2;M=T+Math.sin(t)*(nt+46),k=z+Math.cos(t)*(nt+46);const a=V(k);M=Z(M,a[0]-.6*a[2],a[0]+.6*a[2])}else if(h==="High ledge"){const t=g(60,150,D[9]),a=V(t),s=T>a[0]?-1:1;k=t,M=a[0]+s*.66*a[2],$e=58+18*D[10]}const Ka=g(u.x,T,.6),ta=g(u.z,z,.6);if(h==="Stalagmite foot"){const t=U[4]<.62?-1:1;k=Z(ta+t*(150+30*U[5]),40,395);const a=V(k);M=a[0]+(U[6]-.5)*.5*a[2]}let Ft=-1e3;if(st){Ft=O-(j==="Ferns and saplings"?6:17)-5+8*U[7];const t=T-M,a=z-k,s=Math.hypot(t,a);for(let n=0;n<120&&et(M,k)>Ft+1.2&&Math.hypot(T-M,z-k)>140;n++)M+=t/s*2,k+=a/s*2;Ft=Math.min(Math.max(Ft,et(M,k)-1.4),O-(j==="Ferns and saplings"?6:17)+9)}const ea=et(M,k)+1.25,oe=ea+1.62+$e,Ya=h==="Passage mouth"?1.7:h==="Under the doline"?.32:1,wt=(t,a,s)=>{ft=Math.atan2(t-M,s-k),kt=Math.atan2(a-oe,Math.hypot(t-M,s-k))};if(h==="Across the chamber"||h==="Passage mouth"){const t=g(u.x,T,.45)-M,a=g(u.y0,O,.45)-oe,s=g(u.z,z,.45)-k,n=h==="Across the chamber";ft=Math.atan2(t,s)+(n?.2:-.22)+(Wt===h?(Ke()-.5)*.08:0),kt=Math.atan2(a,Math.hypot(t,s))+(n?-.08:.04)}else h==="Boulder slope"&&!d?(wt(g(u.x,T,.5),g(u.y0,O,.42),g(u.z,z,.5)),ft+=(D[11]-.5)*.2):h==="Under the doline"?(wt(u.x,u.y0,u.z),kt=1.08+.2*D[10]):h==="Forest edge"?(wt(T,O+ke*.4+30,z),ft+=(D[11]-.5)*.3):h==="High ledge"?(wt(T,O,z),ft+=(D[11]-.5)*.25,kt+=.1):h==="Long lens"?(ae=Math.tan(17*Math.PI/180),wt(g(u.x,T,.42),g(u.y0,O,.42),g(u.z,z,.42)),ft+=(D[11]-.5)*.12):h==="Stalagmite foot"&&(ae=Math.tan(40*Math.PI/180),wt(Ka,g(u.y0,O,.62),ta));st&&(ae=Math.tan(42*Math.PI/180),wt(g(u.x,T,.5),oe,g(u.z,z,.5)),kt=.05+.05*U[8]);const Nt=[],ze=(t,a,s,n)=>Nt.push([t,a,s,n,c(),(c()-.5)*.08,(c()-.5)*.08,et(t,a)-5]),Wa=(t,a)=>{for(let s=0;s<200;s+=20){const n=(u.y0-s)/te[1];if(Math.hypot(t-(u.x-te[0]*n),a-(u.z-te[2]*n))<u.r1*1.1+15)return!0}return!1},Ja=(t,a)=>{const s=V(a);return Math.abs(t-s[0])/s[2]<.85&&!Wa(t,a)&&Math.hypot(t-T,a-z)>nt*.75&&Math.hypot(t-it,a-Ee)>45&&(h==="Boulder slope"||Math.hypot(t-M,a-k)>45)};H==="Giant stalagmite"&&ze(it-120+(d?0:(c()-.5)*30),150+(d?0:(c()-.5)*30),15,82);const Za=H==="Stalagmite forest"?15:H==="Giant stalagmite"?6:2;for(let t=0,a=0;t<Za&&a<200;a++){const s=30+c()*420,n=V(s),f=n[0]+(c()*2-1)*n[2]*.8;if(!Ja(f,s))continue;const R=H==="Bare chamber"?8+c()*8:12+c()*c()*45;ze(f,s,R*(.16+c()*.1),R),t++}for(let t=0;t<3;t++){const a=-120-c()*260,s=V(a),n=9+c()*20,f=s[0]+(c()*2-1)*s[2]*.7;(h==="Boulder slope"||Math.hypot(f-M,a-k)>35)&&ze(f,a,n*.2,n)}if(h==="Long lens"||h==="Forest edge"||h==="High ledge"||h==="Stalagmite foot"||st)for(const t of Nt){const a=T-M,s=z-k,n=Math.hypot(a,s),f=Z(((t[0]-M)*a+(t[1]-k)*s)/(n*n),0,1),R=M+a*f-t[0],F=k+s*f-t[1],P=Math.hypot(R,F),A=t[2]*1.8+(h==="Long lens"?70:14);if(f>0&&P<A){const Q=(A-P)/(P||1);t[0]-=R*Q*1.1,t[1]-=F*Q*1.1,P||(t[0]+=A),t[7]=et(t[0],t[1])-5}}if(h==="Stalagmite foot"){const t=U[9]<.5?-1:1,a=ft+t*(.4+.08*U[10]),s=36+8*U[11],n=M+Math.sin(a)*s,f=k+Math.cos(a)*s,R=54+16*U[5];Nt.push([n,f,8.5+2.5*U[6],R,U[10],(U[11]-.5)*.06,(U[9]-.5)*.06,et(n,f)-5])}const Qa=Nt.length,aa=new Float32Array(32*6*4),se=(t,a,s)=>aa.set(s,(t+32*a)*4);Tt.forEach((t,a)=>{se(a,0,[t.x,t.y0,t.z,t.y1]),se(a,1,[t.r0,t.r1,t.ext,t.pow])}),Nt.forEach((t,a)=>{se(a,2,[t[0],t[1],t[2],t[3]]),se(a,3,[t[4],t[5],t[6],t[7]])});const at=128,oa=new Uint16Array(at*3*at*2);Tt.forEach((t,a)=>{for(let s=0;s<at;s++)for(let n=0;n<at;n++){const f=((n+.5)/at*2-1)*t.ext,R=((s+.5)/at*2-1)*t.ext;for(let F=0;F<2;F++){const P=f-(F?t.ox:0),A=R-(F?t.oz:0),Q=Math.hypot(P,A)+1e-6,ot=P/Q,lt=A/Q,ht=tt(ot*.11+t.sx,lt*.11+t.sy,F*.25+.1)+.5*tt(ot*.37+t.sy,lt*.37+t.sx,F*.5+.3)+.45*tt(ot*1.2+t.sx,lt*1.2+t.sy,.7),L=(F?t.r1:t.r0)*(1+t.rough*(ht-.9)),vt=Math.hypot(P/t.ax,A/t.az),Y=4.5*(tt(f*.07+a,R*.07,F*.4+.2)-.5)*2+1.2*(tt(f*.21,R*.21+a,.9)-.5)*2;oa[(s*at*3+a*at+n)*2+F]=Ve(L-vt+Y)}}});const Et=[];if(xt==="Headlamp line"){const t=.42+c()*.1,a=d?.62:.45+c()*.4;for(let s=0;s<7;s++)Et.push({p:[it-90,175,it+110,55],s:a-s*.045-c()*.01,v:t/233,kind:1,h:1.65})}else if(xt==="Two climbers")for(let t=0;t<2;t++)Et.push({p:[it-20,40,it-70,120],s:.25-t*.06,v:.3/95,kind:1,h:1.65});else{const t=T-nt*.6,a=z-nt*.55;for(let s=0;s<3;s++)Et.push({p:[t+s*4.5-4,a+(s&1)*3,t+s*4.5-4,a+(s&1)*3],s:0,v:0,kind:2,h:.9});for(let s=0;s<3;s++)Et.push({p:[t-30+s*9,a-15,t+25-s*7,a+10],s:c(),v:.25/55,kind:1,h:1.65,wob:c()*6})}const zt=Et.length,sa=Yt==="Few swifts"?12:Yt==="Great flock"?110:36,na=[];for(let t=0;t<sa;t++)na.push({y:g(u.y0-20,85,Math.pow(c(),.8)),r:8+c()*38*(Dt?1:.6),w:(c()<.5?-1:1)*(11+c()*7),ph:c()*6.283,e:.7+c()*.5,f1:.2+c()*.3,f2:.5+c()*.7,sd:c()});const $a=sa+zt,At=new Float32Array($a*4),Ae=Pt==="Ochre flowstone"?[.36,.3,.23]:Pt==="Green algae"?[.27,.29,.26]:[.3,.3,.29],to=B==="Thin mist"?.55:1,N={"Noon beam":{sky:[.78,.88,1.08],skyE:7.5,sun:1,amb:1,exp:1,cf:1,cov:.35,bn:[.62,.7,.42]},"Many rays":{sky:[.74,.86,1.1],skyE:6.5,sun:1.1,amb:.9,exp:1,cf:1.6,cov:.55,bn:[.62,.7,.42]},"Beam on the wall":{sky:[.66,.8,1.12],skyE:6,sun:1.2,amb:1,exp:1.15,cf:1,cov:.25,bn:[.85,.72,.55]},"Skylight only":{sky:[.94,.97,1.03],skyE:10,sun:0,amb:1.5,exp:2.6,cf:1,cov:1,bn:[.62,.7,.42]},Dusk:{sky:[.2,.3,.75],skyE:2.2,sun:0,amb:.45,exp:4,cf:1,cov:.2,bn:[.62,.7,.42]},Moonlight:{sky:[.07,.09,.17],skyE:.25,sun:.05,amb:.1,exp:7,cf:1,cov:.3,bn:[.62,.7,.42]},"Gold beam":{sky:[.84,.88,1.02],skyE:5.5,sun:1.05,amb:.85,exp:1.1,cf:1,cov:.3,bn:[.7,.62,.36]}}[y];b(6,N.sky[0],N.sky[1],N.sky[2],Oa),b(7,0,0,0,5e-4+4e-4*to),b(9,K[0],K[1],K[2],K[3]),b(10,Ae[0],Ae[1],Ae[2],Pt==="Ochre flowstone"?1.4:1),b(11,W[0],W[1],W[2],W[3]),b(12,Qa,zt,nt,0);let Ct=null,ra=NaN;b(15,T,O,z,u.r0/ee[1]*.9),b(16,y==="Beam on the wall"?.004:.0085,j==="Red-flowering crowns"?1:0,Pt==="Green algae"?1:0,y==="Beam on the wall"?0:.0055),b(17,.008*N.amb,.0094*N.amb,.0115*N.amb*(N.sun?1:1.15),0),y==="Gold beam"&&b(17,.0062*N.amb,.0098*N.amb,.0102*N.amb,0),b(24,we?50/N.exp*(st?.08:1):0,N.cf,N.cov,y==="Moonlight"?1:0),b(25,N.bn[0],N.bn[1],N.bn[2],N.sun?1:.35),b(18,0,0,0,0),B==="Cloud sea"&&b(18,O-ke*.45,12,.008,0),S[18*4+3]=y==="Many rays"?1:0,b(19,.2,.125,.055,0),b(21,ke,T-14,z+6,j==="Ferns and saplings"?.6:1),b(22,M,k,ea,1),Zt=[S[21*4+1],S[21*4+2],nt],Me=[M,k],b(23,We,4,2,0),b(26,Ft,st?1:0,28,0);const qt=i>400,ne=p+i,X=qt?Math.round(i*.72):i,ut=Math.round(qt?i*.4:i*.5),Re=(X*X*32+ut*ut*16+96*96*8+i*i*4)/1048576,ca=t=>{l.slots.delete(t.key),t.key=null,l.slotMB-=t.mb;for(const a of["Gb","Sh","A","B","Gl","O","V"])e.deleteTexture(t[a].tex),e.deleteFramebuffer(t[a].fb);e.deleteTexture(t.D),e.deleteTexture(t.M),e.deleteBuffer(t.vb),e.deleteVertexArray(t.va)};let m=null;const la=()=>{const t=l.tick=l.tick||0;if(l.slotMB=l.slotMB||0,m=l.slots.get(ne),!m){for(const a of l.slots.values())l.slots.size>8&&t-a.use>64&&ca(a);for(;l.slots.size&&(l.slots.size>=16||l.slotMB+Re>160);){let a=null;for(const s of l.slots.values())(!a||s.use<a.use)&&(a=s);if(a.S===i){l.slots.delete(a.key),m=a;break}ca(a)}}if(!m){const a={Gb:mt(e,l,X,X,"g"),Sh:mt(e,l,X,X,"s"),A:mt(e,l,X,X,"f"),B:mt(e,l,ut,ut,"f"),Gl:mt(e,l,96,96,"f"),O:mt(e,l,i,i,"u"),V:mt(e,l,X,X,"s"),D:e.createTexture(),M:e.createTexture(),vb:e.createBuffer(),va:e.createVertexArray()};a.S=i,a.mb=Re,l.slotMB+=Re,m=a}m.key=ne,m.use=t,l.slots.set(ne,m),e.bindTexture(e.TEXTURE_2D,m.D),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,32,6,0,e.RGBA,e.FLOAT,aa),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.bindTexture(e.TEXTURE_2D,m.M),e.texImage2D(e.TEXTURE_2D,0,e.RG16F,at*3,at,0,e.RG,e.HALF_FLOAT,oa),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindVertexArray(m.va),e.bindBuffer(e.ARRAY_BUFFER,m.vb),e.bufferData(e.ARRAY_BUFFER,At.byteLength,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,16,0),e.bindVertexArray(null)};la(),qa(e,l,m);let dt=0,Bt=!0,Ut=!0,ia="",fa="",ua=!1,re=1,Le=X,rt=0,ce=1,le=0,_e=0,Se=0,It=!1,da=!1;const ie=[0,0,0],Rt=[1.1,0,.5],ha=[1.1,0,.5];let De=.72,Gt=.72,Fe=99,Ne=1.5+c()*3,Ce=1+c()*2,qe=0;const fe=o.sound,Ht=new Float32Array(8*4),Mt=t=>{const a=[l.tN,m.M,m.D,t[0],t[1],t[2],t[3],t[4]];for(let s=0;s<8;s++)e.activeTexture(e.TEXTURE0+s),s===0?e.bindTexture(e.TEXTURE_3D,a[0]):e.bindTexture(e.TEXTURE_2D,a[s]||null)},ct=(t,a,s,n)=>{e.bindFramebuffer(e.FRAMEBUFFER,a?a.fb:null),e.viewport(0,0,s,n),e.useProgram(t.p),e.uniform4fv(t.uP,S)},va=t=>{const a=Math.floor(t),s=t-a,n=gt(Math.sin(a*127.1+D[13]*311.7)*43758.5453),f=gt(Math.sin((a+1)*127.1+D[13]*311.7)*43758.5453);return g(n,f,s*s*(3-2*s))},eo=t=>_!=="Passing clouds"||y!=="Noon beam"?1:1-.82*C(.45,.7,.6*va(t*.045+3)+.4*va(t*.13+11))*C(5,9,t);function ma(t,a){a=Math.min(a||0,.1),m.key!==ne&&(la(),dt=0,Bt=Ut=!0),m.use=l.tick=l.tick+1;const s=o.input,n=o.view||Pa,f=[M+Z(n.x||0,-2,2),oe+Z(n.y||0,-.6,.8),k+Z(n.z||0,-2,2)],R=ft+(n.yaw||0),F=Z(kt+(n.pitch||0),-1.3,1.3),P=[Math.sin(R)*Math.cos(F),Math.sin(F),Math.cos(R)*Math.cos(F)],A=[Math.cos(R),0,-Math.sin(R)],Q=[P[1]*A[2]-P[2]*A[1],P[2]*A[0]-P[0]*A[2],P[0]*A[1]-P[1]*A[0]];if(s.down){le===0&&(_e=s.x,Se=s.y,It=!1),le+=a;const r=s.x-_e,x=s.y-Se;if(!It&&Math.hypot(r,x)>.035&&(It=!0),It){Rt[0]+=A[0]*r*260,Rt[2]+=A[2]*r*260,Rt[1]+=-x*260*.25;const G=Math.hypot(r,x);Gt=Math.min(2.2,Gt+G*6),Fe=0,G>.01&&fe.hit("noise",Math.min(.15+G*4,.6),{cutoff:300+G*3e3,dur:.5}),_e=s.x,Se=s.y}!It&&le>.3&&(da=!0,rt=Math.min(rt+a*.034,1.15),qe-=a,qe<0&&(qe=1.1,fe.note(43+Math.round(4*Math.cos(rt*2)),{dur:1.6,vel:.12,wave:"sine",attack:.4})))}else le=0,da=!1;const ot=Math.abs(rt),lt=Qt-.42*Math.pow(ot,1.1),ht=$t+.8*rt,L=Pe(Math.max(lt,.05),ht),vt=1-C(.8,1.12,ot),Y=Math.max(C(.35,1.1,ot),y==="Beam on the wall"?.5:y==="Gold beam"?1:0),Xt=eo(t),Vt=N.sun+(y==="Skylight only"?.9*C(.15,.6,rt):0),ue=30*vt*Vt,Ot=y==="Dusk"?1-.8*C(.05,1,rt):1;Fe+=a;const de=Math.exp(-a/3.5);for(let r=0;r<3;r++)Rt[r]=ha[r]+(Rt[r]-ha[r])*de,ie[r]+=Rt[r]*a;const he=(y==="Many rays"?1.1:.62)+.3*Math.sin(t*.041+1.1)*Math.sin(t*.0173+.4)+.12*Math.sin(t*.11);if(Fe>1.2&&(Gt+=(he-Gt)*Math.min(a/5,1)),De+=(Gt-De)*Math.min(a*1.5,1),rt!==ra){ra=rt;let r=T,x=O,I=z;if(L[1]>.75)for(let G=0;G<2;G++){const $=(u.y0-x)/Math.max(L[1],.2);r=u.x-L[0]*$,I=u.z-L[2]*$,x=et(r,I)+10}else{r=u.x,x=u.y0,I=u.z;for(let G=0;G<160;G++){r-=L[0]*4,x-=L[1]*4,I-=L[2]*4;const $=V(I),_t=(r-$[0])/$[2],St=(x-$[1])/$[3];if(_t*_t+St*St>.8||x<et(r,I)+8)break}r+=L[0]*12,x+=L[1]*12,I+=L[2]*12}Ct=[r,x,I,L[1]>.75?.25+.75*C(nt*1.5,nt*.6,Math.hypot(r-T,I-z)):.8]}b(13,Ct[0],Ct[1],Ct[2],Ct[3]*vt);let J=0;const jt=(r,x,I,G)=>{At[J*4]=r,At[J*4+1]=x,At[J*4+2]=I,At[J*4+3]=G,J++},Be=r=>u.x-L[0]*(u.y0-r)/L[1],ve=r=>u.z-L[2]*(u.y0-r)/L[1],ao=14*Math.sin(t*.031+1.7)*Math.sin(t*.0113+.3),oo=1+.35*Math.sin(t*.043+2.1)*Math.sin(t*.017);for(const r of na){const x=r.y+ao+9*Math.sin(t*r.f1*.4+r.ph)+4*Math.sin(t*r.f2*.5+r.ph*2),I=r.ph+t*r.w/r.r+.9*Math.sin(t*r.f2*.23+r.ph)+.5*Math.sin(t*r.f1*.37+r.sd*9),G=r.r*oo*(1+.3*Math.sin(t*r.f1*.61+r.ph*3));jt(Be(x)+Math.cos(I)*G*r.e,x,ve(x)+Math.sin(I)*G/r.e,r.sd*.99)}let Ue=1e4,Ie=-1e4;for(let r=0;r<zt;r++){const x=Et[r],I=gt(D[12]*(r+1)*7.31+r*.37),G=x.s+x.v*t*(.78+.4*I)*(r===zt-1&&zt>2?.7:1)-.02*I,$=Z(G,0,1),_t=g(x.p[0],x.p[2],$),St=g(x.p[1],x.p[3],$)+3*Math.sin($*23+r)+(x.wob?x.wob*Math.sin(t*.1+r):0),pe=Ha(_t,St)+.4;jt(_t,pe-.4+x.h,St,x.kind+.3+r*.07),Ht[r*4]=_t,Ht[r*4+1]=pe,Ht[r*4+2]=St,Ht[r*4+3]=x.kind===2?3.5:2.4,Ue=Math.min(Ue,pe),Ie=Math.max(Ie,pe)}if(Ne-=a,Ne<0&&(Ne=2+c()*5,fe.note(86+Math.floor(c()*7),{dur:.14,vel:.08,wave:"sine"})),Ce-=a,Ce<0){Ce=1.2+c()*3;const r=2+Math.floor(c()*3);for(let x=0;x<r;x++)fe.hit("blip",.08,{freq:3400+c()*1200,at:x*.07})}const xa=(u.x+T)*.5-f[0],pa=(u.y0+O)*.5-f[1],ya=(u.z+z)*.5-f[2],so=Math.hypot(xa,pa,ya),no=C(.6,.92,(P[0]*xa+P[1]*pa+P[2]*ya)/so),ba=Ya*1.8*(h==="Under the doline"?Math.sqrt(N.exp):N.exp)*(h==="Under the doline"?1:g(3.1,1,no))/(.45+.55*vt*Math.min(Vt,1)*(.4+.6*Xt))/Math.sqrt(Ot);ce+=(ba-ce)*Math.min(a*.8,1),dt===0&&(ce=ba);const Lt=[g(1,1,Y),g(.93,.66,Y),g(.82,.38,Y)];b(0,f[0],f[1],f[2],t),b(1,P[0],P[1],P[2],ae),b(2,A[0],A[1],A[2],dt%64),b(3,Q[0],Q[1],Q[2],X),b(4,L[0],L[1],L[2],ue),y==="Moonlight"&&(Lt[0]=.72,Lt[1]=.82,Lt[2]=1),b(5,Lt[0],Lt[1],Lt[2],N.skyE*Ot*(1-.45*C(1.1,1.6,ot))),b(7,ie[0],ie[1],ie[2],S[7*4+3]),b(8,B==="Thin mist"?9e-4:.002,De,0,Xt),b(14,qt?300:220,qt?34:26,16,l.flt||l.half?0:1),b(19,S[19*4],S[19*4+1],S[19*4+2],Ie+5.5),S[17*4+3]=Ue-5.5,b(20,ce,ut,.08,re);const ga=f.join()+P.join(),wa=L.join(),Ma=ga!==ia,ro=wa!==fa,me=Ma||ro;ia=ga,fa=wa;const xe=me&&dt>0;if(Ma&&(Bt=!0),me&&(Ut=!0),!xe&&ua&&(Ut=!0,Le!==X&&(Bt=!0)),ua=xe,e.bindTexture(e.TEXTURE_2D,m.D),zt&&e.texSubImage2D(e.TEXTURE_2D,0,0,4,8,1,e.RGBA,e.FLOAT,Ht),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.DEPTH_TEST),e.bindVertexArray(l.vEmpty),Ut){const r=xe?Math.round(X*.5):X;re=r/X,S[3*4+3]=r,S[20*4+3]=re,xe&&(S[14*4]=qt?110:90,S[14*4+2]=10),Bt&&(Mt([null,null,null,null]),ct(w.a1,m.Gb,r,r),e.drawArrays(e.TRIANGLES,0,3),S[23*4+3]=1,ct(w.a1,m.V,r,r),e.drawArrays(e.TRIANGLES,0,3),S[23*4+3]=0,Le=r,Bt=!1),S[12*4+3]=Le/r,Mt([null,null,null,m.Gb.tex]),ct(w.a2,m.Sh,r,r),e.drawArrays(e.TRIANGLES,0,3),Mt([null,m.Sh.tex,null,m.Gb.tex,m.V.tex]),ct(w.a3,m.A,r,r),e.drawArrays(e.TRIANGLES,0,3),Ut=!1}S[20*4+3]=re,S[20*4+1]=ut,(dt<2||(dt&1)===0||me)&&(Mt([m.A.tex,null,null,null]),ct(w.b,m.B,ut,ut),dt>0&&(e.enable(e.BLEND),e.blendColor(0,0,0,me?.6:.3),e.blendFunc(e.CONSTANT_ALPHA,e.ONE_MINUS_CONSTANT_ALPHA)),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND)),Mt([m.A.tex,m.B.tex,null,null]),ct(w.g,m.Gl,96,96),e.drawArrays(e.TRIANGLES,0,3),S[3*4+3]=i,Mt([m.A.tex,m.B.tex,m.Gl.tex,null]),ct(w.c,m.O,i,i),e.drawArrays(e.TRIANGLES,0,3),J&&(e.bindBuffer(e.ARRAY_BUFFER,m.vb),e.bufferSubData(e.ARRAY_BUFFER,0,At.subarray(0,J*4)),e.bindVertexArray(m.va),ct(w.m,m.O,i,i),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.drawArrays(e.POINTS,0,J),e.disable(e.BLEND),e.bindVertexArray(l.vEmpty)),Mt([null,null,null,m.O.tex]),ct(w.k,null,i,i),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),dt++}return ma(0,0),ma}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
