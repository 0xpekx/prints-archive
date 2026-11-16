// Coffee Ring: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/386.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(a0){a0&&a0.add({num:386,name:"Coffee Ring",fam:"Worlds",recipe:"A spilled drop of coffee drying on a glazed saucer. As it thins, the grounds get carried out to the edge and pack into a dark ring, sometimes with inner rings where the edge slipped, and any cracks in the glaze drink it up. The brew, the spill, the cracks and old stains change every mint. Tap to spill another drop, or hold to blow across it and dry it faster.",interactive:"Tap the saucer to spill another drop. Hold anywhere to blow across it and dry it faster.",music:!0,gl:!0,fps:30,seed:0,make(I){const t=I.gl,_t=I.size,i=128,_=72,B=_/i,ut=128,lt=768,Yt=128,Bt=I.hash.slice(2);let Mt=parseInt(Bt.slice(0,8),16)|0,ct=parseInt(Bt.slice(8,16),16)|0,tt=parseInt(Bt.slice(16,24),16)|0,vt=parseInt(Bt.slice(24,32),16)|0;const w=()=>{Mt>>>=0,ct>>>=0,tt>>>=0,vt>>>=0;let e=Mt+ct|0;return Mt=ct^ct>>>9,ct=tt+(tt<<3)|0,tt=tt<<21|tt>>>11,vt=vt+1|0,e=e+vt|0,tt=tt+e|0,(e>>>0)/4294967296};for(let e=0;e<12;e++)w();const zt=e=>{let a=0;for(const r of e)a+=r[1];let o=w()*a;for(const r of e)if(o-=r[1],o<0)return r[0];return e[e.length-1][0]};let de=zt([["Filter Coffee",34],["Espresso",22],["Black Tea",20],["Milky Coffee",14],["Turkish Grounds",10]]),me=zt([["Capillary",60],["Mixed",26],["Marangoni Eddy",14]]),Qt=zt([["Single Ring",30],["Two Rings",36],["Stick-Slip",26],["Tree Rings",8]]),pe=zt([["Round",28],["Lobed",32],["Splash",22],["Twin",18]]),Ae=zt([["Cream Porcelain",34],["Bone White",26],["Celadon",18],["Ironstone",14],["Speckled Stoneware",8]]),xt=zt([["Faint",34],["Network",42],["Tea-Stained",24]]),ue=zt([["North Window",40],["Morning Sun",32],["Lamp at Night",16],["Overcast",12]]),bt=zt([["Clean",28],["One Old Ring",46],["Many Old Rings",26]]);{let e=parseInt(Bt.slice(-8),16)^1540483477|0;const a=()=>{e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296};a()<.2&&(bt="Cup Ring"),a()<.17&&(pe="Drip Trail")}let At=(parseInt(Bt.slice(-8),16)^739982445)+902|0;const et=()=>{At=At+1831565813|0;let e=Math.imul(At^At>>>15,1|At);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<4;e++)et();const ve=I.home?"Low Across the Well":(()=>{const e=et();return e<.5?"Low Across the Well":e<.76?"From Above":"Close on the Edge"})();I.home&&(de="Filter Coffee",me="Capillary",Qt="Two Rings",pe="Lobed",Ae="Cream Porcelain",xt="Network",ue="North Window",bt="One Old Ring"),I.trait("Brew",de),I.trait("Flow",me),I.trait("Pinning",Qt),I.trait("Spill",pe),I.trait("Glaze",Ae),I.trait("Crazing",xt),I.trait("Light",ue),I.trait("Old Stains",bt),I.trait("Standpoint",ve);const W0=`#version 300 es
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}`,xe=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
`,r0=`
uniform vec4 W[8];
vec3 env(vec3 d,float rough){
 vec3 c=W[3].rgb*(.45+.55*clamp(d.z*.6+.5,0.,1.))*(1.+2.2*smoothstep(-.2,-.9,d.y)*smoothstep(-.3,.4,d.z));
 float z=dot(d,W[0].xyz);
 if(z>.05){
  vec2 a=vec2(dot(d,W[1].xyz),dot(d,W[2].xyz))/z;
  vec2 hs=vec2(W[0].w,W[0].w*W[1].w);
  float sf=rough*1.4+.003;
  vec2 bx=smoothstep(-sf,sf,hs-abs(a));
  float win=bx.x*bx.y;
  // bars: n panes across, a transom at 62% height, each bar a little uneven
  float nb=W[5].w;
  float px=(a.x/hs.x*.5+.5)*nb;float dxb=abs(px-floor(px+.5))*2.*hs.x/nb;
  float py=a.y/hs.y-.24;float dyb=abs(py)*hs.y;
  float bw=.016*hs.x+.004;
  float bar=step(1.5,nb)*max(1.-smoothstep(bw-sf,bw+sf,dxb),1.-smoothstep(bw*1.2-sf,bw*1.2+sf,dyb));
  float vy=clamp(a.y/hs.y*.5+.5,0.,1.);vec3 sky=mix(W[5].rgb*.55,W[4].rgb*1.06,vy*(1.6-.6*vy))*(.3+.7*smoothstep(.0,.07,vy));
  float tl=-.15+.35*texture(uN,vec2(a.x*.35+.2,.37)).g+.12*texture(uN,vec2(a.x*1.4+.6,.71)).b;
  float fol=1.-smoothstep(tl*hs.y-sf*2.-.02,tl*hs.y+sf*2.+.02,a.y);
  float leaf=texture(uN,a*vec2(1.3,1.6)+.4).g;
  sky*=mix(1.,.2+.25*leaf,fol*W[4].w*(1.-min(rough*60.,.85)));
  c=mix(c,sky*W[3].w,win*(1.-bar));
  c=mix(c,W[3].rgb*2.4+W[5].rgb*.2,win*bar);
 }
 if(W[2].w>.5){
  float ca=dot(d,W[6].xyz);float ang=sqrt(max(0.,2.-2.*ca));
  float sz=W[6].w,sf=rough*1.6+.004;
  c+=W[7].rgb*(1.-smoothstep(sz-sf,sz+sf,ang));
  c+=W[7].rgb*.04*exp(-ang*ang/(.09+rough));
 }
 return c;
}`,s0=`
uniform vec4 C[4];
vec3 rayDir(vec2 q){vec2 s=vec2(q.x*2.-1.,1.-q.y*2.);return normalize(C[1].xyz+C[0].w*(s.x*C[2].xyz+s.y*C[3].xyz));}
vec2 proj(vec3 P){vec3 v=P-C[0].xyz;float z=dot(v,C[1].xyz);return vec2(dot(v,C[2].xyz)/z/C[0].w*.5+.5,.5-dot(v,C[3].xyz)/z/C[0].w*.5);}
`,H0=xe+"uniform sampler2D uN;uniform vec4 B[12];out vec4 o;"+s0+r0+`
float prof(float r){return 10.5*smoothstep(42.,69.,r)+.9*exp(-(r-70.)*(r-70.)/3.)-17.4*smoothstep(70.5,76.,r);}
float hgt(vec2 p){return prof(length(p));}
float trace(vec3 E,vec3 d){
 float t=(12.-E.z)/d.z;
 float prev=t;
 for(int i=0;i<110;i++){vec3 p=E+t*d;float h=p.z-hgt(p.xy);if(h<0.)break;prev=t;t+=max(.06,h*.35/(-d.z));}
 float a=prev,b=t;
 for(int i=0;i<8;i++){float m=.5*(a+b);vec3 p=E+m*d;if(p.z-hgt(p.xy)<0.)b=m;else a=m;}
 return .5*(a+b);
}
float coc(float t,vec3 d){float z=t*dot(d,C[1].xyz);return C[2].w*abs(1.-C[3].w/z);}
`+`
vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return fract(sin(p)*43758.5453);}
float vbord(vec2 x){
 vec2 n=floor(x),f=fract(x),mg=vec2(0.),mr=vec2(0.);float md=8.;
 int I1=int(B[11].x+.5),I2=int(B[11].y+.5);   // uniform bounds keep the loops rolled (faster HLSL compile)
 for(int j=-I1;j<=I1;j++)for(int i=-I1;i<=I1;i++){vec2 g=vec2(i,j);vec2 r=g+h2(n+g)*.9+.05-f;float d=dot(r,r);if(d<md){md=d;mr=r;mg=g;}}
 md=8.;
 for(int j=-I2;j<=I2;j++)for(int i=-I2;i<=I2;i++){vec2 g=mg+vec2(i,j);vec2 r=g+h2(n+g)*.9+.05-f;vec2 e=r-mr;if(dot(e,e)>1e-5)md=min(md,dot(.5*(mr+r),normalize(e)));}
 return md;
}
float nz(vec2 p){return texture(uN,p).g;}
void main(){
 vec2 q=vec2(gl_FragCoord.x,C[1].w-gl_FragCoord.y)/C[1].w;
 vec3 E=C[0].xyz,d=rayDir(q);
 float t=trace(E,d);vec3 P=E+t*d;
 float r=length(P.xy);
 float pf=2.*C[0].w*t/C[1].w/sqrt(max(-d.z,.15));            // pixel footprint, mm
 // normal from the profile
 float e=.05;float dz=(prof(r+e)-prof(r-e))/(2.*e)-.5*(r-27.3)*exp(-(r-27.3)*(r-27.3)/.5);vec2 rd=P.xy/max(r,1e-3);
 vec3 n=normalize(vec3(-dz*rd,1.));
 bool table=r>75.9;
 vec3 L=normalize(B[0].xyz);
 // rim shadow: march toward the light over the profile
 float sh=1.;
 {float k1=table?.5:.45,a1=table?.08:.06,b1=table?.4:.3;
  for(int i=1;i<14;i++){float s=float(i)*float(i)*k1;vec3 p=P+L*s;float hh=(table&&length(p.xy)>=75.9?-9.:hgt(p.xy))-p.z;sh=min(sh,clamp(1.-hh/(a1*s+b1),0.,1.));}}
 vec3 alb;float spec=0.,rough;vec3 nn=n;
 if(!table){
  // glaze: thickness, pooling at the foot of the rim, orange peel
  vec2 g=P.xy;
  float th=nz(g/600.)*.6+nz(g/150.+.3)*.4;
  float pool=exp(-(r-45.)*(r-45.)/30.)+.5*exp(-(r-71.)*(r-71.)/4.);
  alb=B[1].rgb*(.96+.06*th);
  alb=mix(alb,B[2].rgb,clamp(pool*.55+B[2].w*(th-.5),0.,1.));
  vec2 op=vec2(nz(g/26.+.11)-nz(g/26.+.61),nz(g/26.+.37)-nz(g/26.+.83));
  nn=normalize(n+vec3(op*.012,0.));
  // crazing: two generations of cracks, slightly wandering
  vec2 w=g+vec2(nz(g/120.+.2),nz(g/120.+.7))*1.6+vec2(nz(g/22.+.4),nz(g/22.+.9))*.1;
  float cs=B[3].w;
  float dv[2];for(int q=0;q<int(B[11].z+.5);q++){float sq=q==0?cs:cs*.42;dv[q]=vbord(w/sq+float(q)*17.3)*sq;}
  float d1=dv[0],d2=dv[1];
  float hw=(.018+.016*nz(g/40.))*B[1].w;
  float pw=max(pf,2.*hw);
  float c1=(2.*hw/pw)*(1.-smoothstep(0.,pw,d1));
  float c2=(1.6*hw/pw)*(1.-smoothstep(0.,pw,d2))*smoothstep(.25,.6,nz(g/9.+.5));
  float crk=clamp(c1*smoothstep(.2,.5,nz(g/(cs*28.)+.7))+c2*.5*smoothstep(.35,.65,nz(g/(cs*16.)+.2)),0.,1.)*B[4].w*(.55+.45*nz(g/70.))*(.6+.4*smoothstep(.25,.7,nz(g/500.+.4)));
  alb=mix(alb,alb*B[4].rgb,crk);
  // specks and pinholes
  vec2 sc=floor(g/.9);vec2 sh2=h2(sc+3.1);
  float sp=step(1.-B[5].w,sh2.x);vec2 sd=(g/.9-sc)-(.2+.6*h2(sc+9.7));
  // stoneware: iron spots of unequal size, a dark core and a soft bled edge, in a satin glaze
  float big=step(.05,B[5].w);
  float rq=length(sd)*(1.+sh2.y)/(1.+big*(.6+2.6*fract(sh2.y*7.3)*fract(sh2.x*3.1)));
  float spk=sp*(1.-smoothstep(.04,.12,rq));
  alb=mix(alb,B[5].rgb,spk*.8+sp*big*.3*(1.-smoothstep(.08,.3,rq)));
  alb*=1.-.45*big*sp*(1.-smoothstep(.0,.06,rq));
  vec2 pc=floor(g/2.6);vec2 ph=h2(pc+7.7);vec2 pd=(g/2.6-pc)-(.2+.6*h2(pc+1.3));
  float pin=step(.965,ph.x)*(1.-smoothstep(.015,.035,length(pd)));
  alb*=1.-pin*.45;
  vec2 dc=floor(g/1.7);vec2 dh=h2(dc+21.3);vec2 dd=(g/1.7-dc)-(.15+.7*h2(dc+5.9));
  float dust=step(.93,dh.x)*(1.-smoothstep(.006,.02+.03*dh.y,length(dd)*1.7));
  alb=mix(alb,dh.y>.6?vec3(.97,.96,.94):alb*.55,dust*.7);
  // cup-foot wear: a faint dull band where cups sat, fine circular scratches
  float wear=exp(-(r-26.5)*(r-26.5)/2.2);
  float scr=texture(uN,vec2(atan(g.y,g.x)*9.,r*1.9)/vec2(64.,6.)).r;
  vec2 fp=(g-vec2(-30.,40.))*mat2(.8,.6,-.6,.8)/vec2(7.,9.);float fpr=length(fp);
  float fpm=(1.-smoothstep(.6,1.,fpr+.15*nz(g/4.)))*(.5+.5*sin(fpr*44.+nz(g/2.)*5.));
  rough=.01+.04*wear+.008*th+.05*fpm+.06*big;
  float f0=.04,ct=clamp(dot(-d,nn),0.,1.);
  float fr=f0+(1.-f0)*pow(1.-ct,5.);
  spec=fr*(1.-crk*.7)*(1.-.35*big)*(1.-pin)*(1.-.35*wear*scr)*(1.-.3*fpm);
  alb*=1.-.05*wear*scr;
 }else{
  // a dark oiled walnut table
  vec2 g=P.xy;float gr=nz(vec2(g.x/90.,g.y/3.5)+.1)*.7+nz(vec2(g.x/25.,g.y/1.2))*.3;
  alb=B[6].rgb*(.6+.7*gr);rough=.22;
  float ct=clamp(dot(-d,n),0.,1.);spec=(.035+.96*pow(1.-ct,5.))*.6;
 }
 vec3 Lc=B[0].w*B[7].rgb*(B[7].w>.5?1.5*exp(-dot(P.xy-vec2(-8.,11.),P.xy-vec2(-8.,11.))/(2.*14.*14.))*(1.-.15*(P.z/10.)):(1.+.5*clamp(dot(P.xy-vec2(-12.,14.),normalize(B[0].xy))/45.,-1.,1.)));
 float ao=table?smoothstep(73.,95.,r):1.-.25*smoothstep(38.,46.,r)*(1.-smoothstep(52.,62.,r));
 vec3 dif=alb*(Lc*max(dot(nn,L),0.)*sh+B[8].rgb*ao*(.6+.4*nn.z)+B[8].rgb*vec3(1.,.85,.65)*.9*clamp(1.-nn.z,0.,1.));
 vec3 sr=env(reflect(d,nn),rough)*mix(.35,1.,sh);
 float sl=dot(sr,vec3(.3,.5,.2))*spec;
 o=vec4(sqrt(clamp(dif*.5,0.,1.)),sqrt(clamp(sl*.25,0.,1.)))+(h2(gl_FragCoord.xy*.37).x-.5)*2./255.;   // dithered before 8 bits
}`,n0=`
vec4 bsF(sampler2D T,int k,vec2 uv,float yo){
 vec2 p=uv*128.-.5;vec2 i=floor(p),f=p-i;vec2 f2=f*f,f3=f2*f;
 vec2 w0=(1.-3.*f+3.*f2-f3)/6.,w1=(4.-6.*f2+3.*f3)/6.,w2=(1.+3.*f+3.*f2-3.*f3)/6.,w3=f3/6.;
 vec2 g0=w0+w1,g1=w2+w3;
 vec2 a=clamp(i-.5+w1/g0,.5,127.5),b=clamp(i+1.5+w3/g1,.5,127.5);
 vec2 base=vec2(float(k)*128.,yo);
 vec4 A=textureLod(T,(base+a)/256.,0.),Bv=textureLod(T,(base+vec2(b.x,a.y))/256.,0.),Cv=textureLod(T,(base+vec2(a.x,b.y))/256.,0.),D=textureLod(T,(base+b)/256.,0.);
 return g0.y*(g0.x*A+g1.x*Bv)+g1.y*(g0.x*Cv+g1.x*D);
}`,K0=xe+"uniform sampler2D uS,uF,uD;uniform vec4 U[9];out vec4 o;"+n0+`
vec4 rn(uvec2 p,uint s){uvec4 v=uvec4(p,s,p.x^(p.y*7u));v=v*1664525u+1013904223u;v.x+=v.y*v.w;v.y+=v.z*v.x;v.z+=v.x*v.y;v.w+=v.y*v.z;v^=v>>16u;v.x+=v.y*v.w;v.y+=v.z*v.x;v.z+=v.x*v.y;v.w+=v.y*v.z;return vec4(v&0xffffu)/65535.;}
void main(){
 ivec2 pix=ivec2(gl_FragCoord.xy);int k=pix.x>>7;
 vec4 st=texelFetch(uS,pix,0);
 vec4 A=k==0?U[1]:U[5],Bq=k==0?U[2]:U[6],Cq=k==0?U[3]:U[7],Dq=k==0?U[4]:U[8];
 float typ=floor(st.w*.5+.01),stuck=st.w-2.*typ;
 if(A.w>.5&&stuck<.5){
  float Lm=U[0].x,dt=U[0].y;
  vec2 p=st.xy;float z=st.z;
  vec4 rr=rn(uvec2(pix),uint(U[0].z));
  vec4 rq=rn(uvec2(pix)+uvec2(911u,377u),uint(U[0].z)+5u);
  bool stk=A.w>1.5;
  vec4 f=bsF(uF,k,p,0.);
  float H=f.x-A.y;vec2 gF=f.yz;float g2=dot(gF,gF);
  if(!stk){
   if(H<=0.){
    // the line has passed: swept along by the receding meniscus, or left behind
    if(rr.x<(typ>1.5?.3:Bq.w)||g2<1e-5)stk=true;
    else{vec2 np=p+(A.y+.012-f.x)*gF/g2/Lm;float H2=bsF(uF,k,np,0.).x-A.y;if(H2>0.)p=np;else stk=true;}
   }else{
    float h=A.x*H;
    vec4 qf=bsF(uF,k,p,128.);
    vec2 ub=A.z*qf.xy/max(H,U[0].w)*(Bq.w>.1?1.:.3);
    float phi=1.5*(2.*z-z*z);
    vec2 u=ub*phi*(typ>1.5?Dq.w:typ>.5?Dq.x:1.);
    vec2 inw=gF*inversesqrt(g2+1e-6);
    u+=Bq.y*h*(1.5*z*z-z)*inw;
    vec2 dp=u*dt+(rr.yz-.5)*Cq.w*sqrt(dt);
    float lp=length(dp);if(lp>1.2)dp*=1.2/lp;
    p+=dp/Lm;
    // height in the film: diffusion, settling, the Marangoni roll (up at the edge, down in the middle)
    float hr=clamp(H/Cq.z,0.,1.);
    z+=(rq.x+rq.y-1.)*Dq.y*sqrt(dt);
    z-=Bq.z*(abs(typ-1.)<.5?1.:.15)*dt/max(h,.02);
    z+=Bq.y*1.2*(.4-hr)*z*(1.-z)*dt*4.;
    z=abs(z);z=1.-abs(1.-z);z=clamp(z,0.,1.);
    vec4 f3=bsF(uF,k,p,0.);float H3=f3.x-A.y;
    float dep=texture(uD,p).r;
    float a=Bq.x*(abs(typ-1.)<.5?3.:1.);
    if(H3<=0.){float g3=dot(f3.yz,f3.yz);if(g3>1e-5)p+=(A.y+min(a/A.x,.05)*.5-f3.x)*f3.yz/g3/Lm;stk=true;}
    else if(A.x*H3<a&&(Bq.w>.1||rq.z<.04))stk=true;
    else if(dep>Cq.y*(Cq.x+(1.-Cq.x)*exp(-H3*inversesqrt(dot(f3.yz,f3.yz)+1e-4)/.2))&&rq.z<.6)stk=true;
    else if(abs(typ-1.)<.5&&z<.04&&rq.w<Dq.z*dt)stk=true;
    else if(typ>1.5&&rq.w<Dq.z*.04*dt*(1.-hr))stk=true;
   }
  }
  // what the receding line and the last of the liquid leave is a soft film, not grains: mark it
  st=vec4(p,stk&&(A.w>1.5||Bq.w<.1)?5.:z,typ*2.+(stk?1.:0.));
 }
 o=st;
}`,Y0=`#version 300 es
precision highp float;precision highp sampler2D;
uniform sampler2D uS;uniform vec4 P[3];out float vM;out float vS;out float vK;out float vR;
void main(){
 int id=gl_VertexID;ivec2 pix=ivec2(id&255,id>>8);int k=pix.x>>7;
 vec4 st=texelFetch(uS,pix,0);
 float typ=floor(st.w*.5+.01),stuck=st.w-2.*typ;
 vec4 S=k==0?P[1]:P[2];
 bool co=abs(typ-1.)<.5;
 int mode=int(P[0].x+.5);
 bool on=false;float sz=2.5,m=S.x;
 float gs=fract(float(id)*.6180339);
 // grounds: irregular flecks of all sizes; filter fines: specks at the limit of sight
 float gq=gs*gs;
 float dz=co?mix(1.+1.4*gq*gq,1.4+5.*gq*gs,S.w):typ>1.5?12.:st.z>4.?12.:4.;
 vR=co?fract(float(id)*.7548777):-1.;
 if(mode==0){on=S.y>.5&&(stuck>.5||co);sz=dz;m=S.x*(co?S.z*(.3+1.4*gq):1.);}
 else if(mode==1){on=S.y>.5&&!co;sz=P[0].z;}
 else{on=float(k)==P[0].w&&stuck>.5;sz=dz;m=S.x*(co?S.z*(.3+1.4*gq):1.);}
 vK=mode==1&&stuck>.5?1.:0.;
 float sg=sz*.25;
 vM=m*P[0].y/(6.2832*sg*sg);vS=sz;
 gl_Position=on?vec4(st.xy*2.-1.,0.,1.):vec4(3.,3.,3.,1.);
 gl_PointSize=sz;
}`,Q0=xe+`in float vM;in float vS;in float vK;in float vR;out vec4 o;
void main(){vec2 d=(gl_PointCoord-.5)*vS;float sg=vS*.25;
if(vR>=0.){float a=vR*6.2832,ca=cos(a),sa=sin(a);d=vec2(ca*d.x-sa*d.y,sa*d.x+ca*d.y)*vec2(1.+1.6*fract(vR*13.7),.85);}float v=vM*exp(-dot(d,d)/(2.*sg*sg));o=vK>.5?vec4(0.,v,0.,1.):vec4(v,0.,0.,1.);}`,J0=xe+"uniform sampler2D uB,uF,uD,uL,uT,uN;uniform vec4 V[18];out vec4 o;"+s0+r0+n0+`
vec4 dec(vec4 v){return vec4(v.rgb*v.rgb*2.,v.a*v.a*4.);}
void liquid(vec2 P,out float h,out vec2 gh,out float sd){
 vec2 uv=(P-V[0].xy)/V[0].z+.5;
 h=0.;gh=vec2(0.);sd=-1e3;
 for(int k=0;k<2;k++){
  vec4 S=V[2+k],bb=V[4+k];
  if(S.z>.5&&uv.x>bb.x&&uv.y>bb.y&&uv.x<bb.z&&uv.y<bb.w){
   vec4 f=bsF(uF,k,uv,0.);float H=f.x-S.y;
   float s=H*inversesqrt(dot(f.yz,f.yz)+1e-4);
   if(s>sd){sd=s;h=S.x*max(H,0.);gh=S.x*f.yz;}
  }
 }
}
float ab(vec2 uv,float r){
 float a=texture(uT,uv).r+texture(uD,uv).r;
 if(r>.0004){vec2 e=vec2(r,0.),f=vec2(0.,r);a=a*.4+.15*(texture(uT,uv+e).r+texture(uD,uv+e).r+texture(uT,uv-e).r+texture(uD,uv-e).r+texture(uT,uv+f).r+texture(uD,uv+f).r+texture(uT,uv-f).r+texture(uD,uv-f).r);}
 return a;
}
void main(){
 vec2 fc=gl_FragCoord.xy;
 vec2 q=vec2(fc.x,C[1].w-fc.y)/C[1].w;
 vec3 d=rayDir(q),E=C[0].xyz;
 float t0=-E.z/d.z;vec3 P0=E+t0*d;
 // a macro lens stopped down: the well is sharp, only the far rim and the table soften (read from the bake's mips)
 float czl=min(C[2].w*abs(1.-C[3].w/(t0*dot(d,C[1].xyz))),5.)*C[1].w/1000.;
 float lod=log2(max(czl*1.4,1.));
 vec4 bk=dec(textureLod(uB,vec2(q.x,1.-q.y),lod));
 vec3 spT=V[8].rgb;
 vec3 col=bk.rgb+bk.a*spT;
 float rr=length(P0.xy);
 vec2 uv0=(P0.xy-V[0].xy)/V[0].z+.5;
 float fl=1.-smoothstep(39.,43.,rr);
 float inb=smoothstep(0.,.03,min(min(uv0.x,uv0.y),min(1.-uv0.x,1.-uv0.y)));
 float msk=fl*inb;
 if(msk>0.){
  float pf=2.*C[0].w*t0/C[1].w/sqrt(max(-d.z,.15));
  float br=czl*pf/V[0].z*.6;
  // liquid surface: find where the ray meets it (two parallax steps)
  float h=0.,sd=-1e3;vec2 gh=vec2(0.);
  vec3 Ps=P0;
  for(int i=0;i<int(V[0].w+.5);i++){   // one call site, rolled: the HLSL compiler pays for each copy
   if(i>0&&h>0.){float t=(h-E.z)/d.z;Ps=E+t*d;}
   if(i==0||h>0.)liquid(Ps.xy,h,gh,sd);
  }
  float wn=(texture(uN,Ps.xy/9.).g-.5)*.07+(texture(uN,Ps.xy/2.7+.3).b-.5)*.035;
  float wet=smoothstep(-pf*.7-czl*pf*.5,pf*.7+czl*pf*.5,sd+wn);
  // wind ripples while someone blows across the film (capillary waves need some depth)
  vec2 rp=Ps.xy*vec2(1./15.,1./64.)+vec2(V[1].y*.3,0.);
  float r0=texture(uN,rp).b;vec2 rg=vec2(texture(uN,rp+vec2(.004,0.)).b-r0,texture(uN,rp+vec2(0.,.004)).b-r0)*6.;
  vec3 n=normalize(vec3(-gh+rg*V[1].z*.1*smoothstep(0.,.3,h),1.));
  vec3 td=refract(d,n,.7519);
  vec2 Pb=mix(P0.xy,Ps.xy+td.xy*(h/max(-td.z,.25)),wet);
  vec2 qb=proj(vec3(Pb,0.));
  vec4 bb=dec(textureLod(uB,vec2(qb.x,1.-qb.y),lod));
  vec2 uvb=(Pb-V[0].xy)/V[0].z+.5;
  // craze lines drink: under a drop and round every old stain the cracks fill with coffee and stay brown
  {
   float l0=dot(bb.rgb,vec3(.3,.5,.2)),l1=dot(dec(textureLod(uB,vec2(qb.x,1.-qb.y),lod+2.3)).rgb,vec3(.3,.5,.2));
   float ck=clamp((l1-l0)/max(l1,.02)*5.,0.,1.);
   float r3=.022;
   float stn=texture(uT,uvb).r+texture(uT,uvb+vec2(r3,0.)).r+texture(uT,uvb-vec2(r3,0.)).r+texture(uT,uvb+vec2(0.,r3)).r+texture(uT,uvb-vec2(0.,r3)).r;
   float dr=max(smoothstep(0.,.8,stn),smoothstep(-2.5,0.,sd));
   bb.rgb*=mix(vec3(1.),vec3(.5,.34,.2),ck*dr*V[8].w);
  }
  float As=ab(uvb,br);
  float Al=texture(uL,uvb).r*wet;
  vec3 ill=bb.rgb/V[9].rgb;
  {
   vec3 Lx=normalize(V[10].xyz);float hs=0.,sds=-1e3;vec2 ghs=vec2(0.);
   {  // the drop's shadow and tint on the glaze: a plain bilinear look-up is enough here
    vec2 ul=(Pb+Lx.xy/Lx.z*.4-V[0].xy)/V[0].z+.5;
    for(int k=0;k<2;k++){
     vec4 S=V[2+k];
     if(S.z>.5){vec4 f=texture(uF,(vec2(float(k)*128.,0.)+clamp(ul,0.,1.)*128.)/256.);float H=f.x-S.y;float s=H*inversesqrt(dot(f.yz,f.yz)+1e-4);if(s>sds){sds=s;hs=S.x*max(H,0.);ghs=S.x*f.yz;}}
    }
   }
   vec2 pe=Pb+Lx.xy/Lx.z*max(hs,.0);
   float ws=smoothstep(-.05,.05,sds);
   vec2 ue=(pe-V[0].xy)/V[0].z+.5;
   float ae=texture(uL,ue).r;
   vec3 ts=exp(-V[6].rgb*ae*1.3);
   vec3 sf=mix(vec3(1.),ts*(1.-.6*smoothstep(.06,.4,length(ghs))*vec3(1.,1.06,1.15)),ws*.85);
   sf*=1.+.9*step(0.,sd)*exp(-max(sd,0.)/.25)*smoothstep(.2,.8,dot(-gh*inversesqrt(dot(gh,gh)+1e-8),-normalize(Lx.xy)));
   bb.rgb*=sf;ill*=sf;
  }
  // dried deposit: absorbs, then turns into its own brown film where thick; a little relief and sheen on the ring
  float e1=2./768.;
  float a1=ab(uvb+vec2(e1,0.),0.),a2=ab(uvb-vec2(e1,0.),0.),a3=ab(uvb+vec2(0.,e1),0.),a4=ab(uvb-vec2(0.,e1),0.);
  float ax=a1-a2,ay=a3-a4,Am=(a1+a2+a3+a4+As)*.2;
  vec3 nd=normalize(vec3(-vec2(ax,ay)*.003,1.));
  // the packed line is dark, what the rest of the patch keeps is a faint even wash
  float Ad=As*mix(.15,1.,smoothstep(.9,2.8,Am));
  float op=1.-exp(-V[7].w*Ad);
  vec3 Td=exp(-mix(V[6].rgb,vec3(1.,1.05,1.1),.45)*Ad);
  vec3 dry=bb.rgb*Td*(1.-op)+op*V[7].rgb*ill*(.75+.5*clamp(dot(nd,normalize(V[10].xyz)),0.,1.));
  float rs=smoothstep(.6,4.,As);
  vec3 dsp=W[4].rgb*W[3].w*.3*(.03+.25*pow(1.-clamp(dot(-d,nd),0.,1.),5.))*rs;
  dry+=bb.a*spT*mix(1.,.12,smoothstep(0.,.7,Ad))+dsp*.25;   // a coffee film dulls the glaze's own gloss
  // the wet drop: column mass through the film, milk scatters, the surface reflects the room
  float pth=.5*(1./max(-td.z,.3)+1.15);
  vec3 Tl=exp(-V[6].rgb*(As*.85+Al)*pth);
  float mo=1.-exp(-V[11].w*(Al+As*.4)*pth);
  vec3 sub=bb.rgb*Tl*(1.-mo)+mo*V[11].rgb*ill;
  float ct=clamp(dot(-d,n),0.,1.);
  float R=.02+.98*pow(1.-ct,5.);
  vec3 rd=reflect(d,normalize(vec3(-gh*smoothstep(.05,.24,length(gh))+rg*V[1].z*.1*smoothstep(0.,.3,h),1.)));
  vec2 aw=vec2(dot(rd,V[13].xyz),dot(rd,V[14].xyz))/max(dot(rd,V[12].xyz),.05)*V[12].w;
  vec3 rf=env(normalize(V[15].xyz+aw.x*V[16].xyz+aw.y*V[17].xyz),.0025+czl*.004);
  vec2 on=-gh*inversesqrt(dot(gh,gh)+1e-8);
  float rim=exp(-max(sd,0.)/.08),nearS=clamp(dot(on,-normalize(C[1].xy)),0.,1.),winS=clamp(dot(on,normalize(W[0].xy)),0.,1.);
  float edge=rim*(.28+.6*nearS*nearS);
  vec3 wc=sub*(1.-R)*(1.-edge)+R*rf*vec3(9.,9.6,10.)+bb.a*spT*.12*(1.-R)+W[4].rgb*W[3].w*.06*winS*winS*exp(-max(sd,0.)/.035)*smoothstep(-.02,.02,sd);
  vec3 sc=mix(dry,wc,wet);
  col=mix(col,sc,msk);
 }
 // tone, a trace of lens falloff, a dither below sight
 col*=V[9].w;
 vec2 vq=q-.5;col*=1.-.06*dot(vq,vq);
 col=(col*(2.51*col+.03))/(col*(2.43*col+.59)+.14);
 col=pow(clamp(col,0.,1.),vec3(.4545));
 uvec2 ui=uvec2(fc)*uvec2(1973u,9277u)+uvec2(26699u);uint hs=(ui.x^ui.y)*668265261u;hs^=hs>>15u;
 float gr=float(hs&1023u)/1023.-.5;
 col+=gr*V[1].w*(.6+.4*(1.-col));
 o=vec4(col,1.);
}`;let C=t.__c386;if(!C){C=t.__c386={},C.f32=!!t.getExtension("EXT_color_buffer_float"),C.f16=C.f32||!!t.getExtension("EXT_color_buffer_half_float");const e=(n,f)=>{const x=t.createShader(n);return t.shaderSource(x,f),t.compileShader(x),x},a=e(t.VERTEX_SHADER,W0),o=e(t.VERTEX_SHADER,Y0),r=(n,f)=>{const x=t.createProgram(),F=e(t.FRAGMENT_SHADER,f);return t.attachShader(x,n),t.attachShader(x,F),t.linkProgram(x),{p:x,f:F,v:n}},c={bake:r(a,H0),sim:r(a,K0),spl:r(o,Q0),comp:r(a,J0)};t.flush(),C.pend=c,C.ps=c,C.vao=t.createVertexArray();const d=256,s=new Uint8Array(d*d*4);let l=3697679;const v=()=>{l=l+1831565813|0;let n=Math.imul(l^l>>>15,1|l);return n=n+Math.imul(n^n>>>7,61|n)^n,(n^n>>>14)>>>0&255},m=32,y=new Float32Array(m*m),g=new Float32Array(m*m);for(let n=0;n<m*m;n++)y[n]=v()/255,g[n]=v()/255;const u=n=>n*n*(3-2*n),p=(n,f,x)=>{const F=Math.floor(f),N=Math.floor(x),q=u(f-F),P=u(x-N),E=(D,z)=>n[(z%m+m)%m*m+(D%m+m)%m];return(E(F,N)*(1-q)+E(F+1,N)*q)*(1-P)+(E(F,N+1)*(1-q)+E(F+1,N+1)*q)*P};for(let n=0;n<d;n++)for(let f=0;f<d;f++){const x=(n*d+f)*4;s[x]=v(),s[x+3]=v(),s[x+1]=Math.round((p(y,f/8,n/8)*.7+p(g,f/3,n/3)*.3)*255),s[x+2]=Math.round(p(g,f/8,n/8)*255)}C.noise=t.createTexture(),t.bindTexture(t.TEXTURE_2D,C.noise),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,d,d,0,t.RGBA,t.UNSIGNED_BYTE,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.generateMipmap(t.TEXTURE_2D),C.tmp={}}const gt=C.ps,Z0=()=>{const e=C.pend;if(e){C.pend=null;for(const a in e){const o=e[a];if(!t.getProgramParameter(o.p,t.LINK_STATUS))throw new Error("386 "+a+": "+t.getProgramInfoLog(o.p)+" "+t.getShaderInfoLog(o.f)+" "+t.getShaderInfoLog(o.v));t.useProgram(o.p);const r=(c,d)=>{const s=t.getUniformLocation(o.p,c);s&&t.uniform1i(s,d)};r("uS",0),r("uF",1),r("uD",2),r("uN",3),r("uB",4),r("uL",5),r("uT",6);for(const c of["U","P","V","B","C","W"])o[c]=t.getUniformLocation(o.p,c)}}},O=C.f16,Lt=(e,a,o,r,c,d,s)=>{const l=t.createTexture();return t.bindTexture(t.TEXTURE_2D,l),t.texImage2D(t.TEXTURE_2D,0,o,e,a,0,r,c,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,d),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,d),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,s),l},Jt=e=>{const a=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),a},Ct=t.CLAMP_TO_EDGE,Zt=t.LINEAR,$0=t.NEAREST,Re=Lt(_t,_t,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,Zt,Ct),G0=Jt(Re);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR);const to=O&&C.f32?t.RGBA32F:t.RGBA16F,l0=()=>{const e=Lt(256,ut,to,t.RGBA,C.f32?t.FLOAT:t.HALF_FLOAT,$0,Ct);return{t:e,f:O?Jt(e):null}},$t=[l0(),l0()];let Ut=0;const Pt=Lt(256,256,t.RGBA16F,t.RGBA,t.HALF_FLOAT,Zt,Ct),ke=Lt(lt,lt,O?t.R16F:t.R8,t.RED,O?t.HALF_FLOAT:t.UNSIGNED_BYTE,Zt,Ct),Se=Lt(Yt,Yt,O?t.RG16F:t.RG8,t.RG,O?t.HALF_FLOAT:t.UNSIGNED_BYTE,Zt,Ct),c0=Lt(lt,lt,O?t.R16F:t.R8,t.RED,O?t.HALF_FLOAT:t.UNSIGNED_BYTE,Zt,Ct),eo=O?Jt(ke):null,oo=O?Jt(Se):null,i0=O?Jt(c0):null;t.bindFramebuffer(t.FRAMEBUFFER,null);const It=(()=>{const e=new Float32Array(1),a=new Uint32Array(e.buffer);return o=>{e[0]=o;const r=a[0],c=r>>16&32768,d=(r>>23&255)-112,s=r&8388607;return d<=0?c:d>=31?c|31743:c|d<<10|s>>13}})(),Y=[-11,19],Gt=ve==="From Above"?{T:[-10,16],el:1.36,az:-.1,D:175,th:.2}:ve==="Close on the Edge"?{T:[Y[0]-.1*_-2.6,Y[1]-.14*_-5.4],el:.62,az:.45,D:100,th:.2}:{T:[-12,14],el:.9,az:-.13,D:135,th:.215},f0=Gt.T,_e=Gt.el,h0=Gt.az,be=Gt.D,ge=Gt.th,Q=[Math.sin(h0)*Math.cos(_e),Math.cos(h0)*Math.cos(_e),-Math.sin(_e)],yt=[f0[0]-Q[0]*be,f0[1]-Q[1]*be,-Q[2]*be];let $=[Q[1],-Q[0],0];const d0=Math.hypot($[0],$[1]);$=[$[0]/d0,$[1]/d0,0];const Nt=[$[1]*Q[2]-0*Q[1],0*Q[0]-$[0]*Q[2],$[0]*Q[1]-$[1]*Q[0]],m0=new Float32Array(16);m0.set([yt[0],yt[1],yt[2],ge,Q[0],Q[1],Q[2],_t,$[0],$[1],$[2],10,Nt[0],Nt[1],Nt[2],be]);const Rt=e=>{const a=Math.hypot(e[0],e[1],e[2]);return[e[0]/a,e[1]/a,e[2]/a]},G={"Cream Porcelain":{a:[.86,.82,.74],p:[.8,.74,.62],pv:.25,sp:[.45,.32,.22],sd:.004,cs:5.5},"Bone White":{a:[.9,.89,.86],p:[.82,.83,.82],pv:.15,sp:[.4,.38,.36],sd:.002,cs:4.2},Celadon:{a:[.7,.8,.72],p:[.52,.68,.58],pv:.6,sp:[.35,.36,.3],sd:.003,cs:6.5},Ironstone:{a:[.84,.81,.76],p:[.74,.7,.64],pv:.35,sp:[.4,.3,.22],sd:.01,cs:3.4},"Speckled Stoneware":{a:[.77,.74,.68],p:[.66,.62,.55],pv:.45,sp:[.4,.2,.09],sd:.1,cs:7.5}}[Ae],ye=xt==="Faint"?{t:[.6,.58,.56],s:.55}:xt==="Network"?{t:[.36,.3,.25],s:.9}:{t:[.24,.14,.07],s:1},ao=G.cs*(xt==="Faint"?1.3:1)*(.85+.3*w()),R={"North Window":{dir:[-.5,.74,.42],sky:[.84,.92,1.05],skyB:[.76,.8,.86],b:13,room:[.045,.036,.028],amb:[.16,.135,.105],li:1.22,lc:[.93,.96,1],fol:.8,nb:3,hw:.42,asp:1.35,exp:.5,lamp:0},"Morning Sun":{dir:[-.58,.68,.38],sky:[1.15,1,.8],skyB:[1.05,.88,.66],b:14,room:[.05,.04,.03],amb:[.13,.1,.075],li:1.6,lc:[1.15,.98,.76],fol:.6,nb:2,hw:.36,asp:1.5,exp:.5,lamp:0},"Lamp at Night":{dir:[.18,.62,.76],sky:[.04,.05,.08],skyB:[.03,.035,.05],b:1,room:[.02,.014,.01],amb:[.012,.01,.009],li:1.05,lc:[1.2,.9,.6],fol:0,nb:3,hw:.7,asp:.9,exp:.85,lamp:1},Overcast:{dir:[-.35,.75,.5],sky:[.9,.92,.95],skyB:[.86,.87,.88],b:4.2,room:[.07,.066,.06],amb:[.28,.265,.245],li:.75,lc:[.92,.93,.96],fol:.4,nb:1,hw:.95,asp:.8,exp:.54,lamp:0}}[ue],st=Rt(R.dir),it=R.lamp?Rt([-.5,.8,.36]):st;let qt=Rt([it[1],-it[0],0]);const Ue=Rt([qt[1]*it[2],-qt[0]*it[2],qt[0]*it[1]-qt[1]*it[0]]),p0=new Float32Array(32);p0.set([it[0],it[1],it[2],R.hw,qt[0],qt[1],qt[2],R.asp,Ue[0],Ue[1],Ue[2],R.lamp,R.room[0],R.room[1],R.room[2],R.b,R.sky[0],R.sky[1],R.sky[2],R.fol,R.skyB[0],R.skyB[1],R.skyB[2],R.nb,st[0],st[1],st[2],R.lamp?.11:.2,9,6.6,4.4,0]);const u0=new Float32Array(48);u0.set([st[0],st[1],st[2],R.li,G.a[0],G.a[1],G.a[2],xt==="Tea-Stained"?1.7:xt==="Faint"?.85:1,G.p[0],G.p[1],G.p[2],G.pv,0,0,0,ao,ye.t[0],ye.t[1],ye.t[2],ye.s,G.sp[0],G.sp[1],G.sp[2],G.sd,.16,.09,.05,0,R.lc[0],R.lc[1],R.lc[2],R.lamp,R.amb[0],R.amb[1],R.amb[2],0,0,0,0,0,0,0,0,0,1,2,2,0]);const qe=(()=>{const e=R.lamp?R.lc:R.sky,a=e[0]*.3+e[1]*.5+e[2]*.2;return[e[0]/a,e[1]/a,e[2]/a]})(),te=()=>{t.bindVertexArray(C.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0)},v0=e=>{t.uniform4fv(e.C,m0),e.W&&t.uniform4fv(e.W,p0),e.B&&t.uniform4fv(e.B,u0)},W={"Filter Coffee":{sig:[.42,.85,1.6],A0:2.6,alb:[.3,.16,.075],opk:.12,ms:0,mc:[0,0,0],fc:1/260,cm:.5,sed:.004,cv:.9,sf:.12,sv:.16},Espresso:{sig:[.5,.95,1.6],A0:5,alb:[.2,.11,.055],opk:.14,ms:0,mc:[0,0,0],fc:1/160,cm:.6,sed:.006,cv:.85,sf:.16,sv:.14},"Black Tea":{sig:[.4,.92,1.75],A0:1.6,alb:[.42,.19,.06],opk:.1,ms:0,mc:[0,0,0],fc:1/300,cm:.6,sed:.002,cv:1,sf:.08,sv:.2},"Milky Coffee":{sig:[.3,.55,.95],A0:2.6,alb:[.56,.4,.26],opk:.28,ms:2.4,mc:[.42,.29,.18],fc:1/160,cm:.5,sed:.002,cv:1,sf:.55,sv:.1},"Turkish Grounds":{sig:[.5,.95,1.6],A0:3.6,alb:[.19,.105,.05],opk:.15,ms:0,mc:[0,0,0],fc:1/5,cm:3,sed:.12,cv:.35,sf:.14,sv:.15}}[de],ro=me==="Capillary"?0:me==="Mixed"?.16:.55,ee=Qt==="Single Ring"?{n:0,rs:.5,rf:.06,reb:.85}:Qt==="Two Rings"?{n:1,rs:.6,rf:.08,reb:.9}:Qt==="Stick-Slip"?{n:3,rs:.72,rf:.15,reb:.92}:{n:7,rs:.84,rf:.2,reb:.95},so=2.7*2.7,no=1/so,De=.24,lo=(e,a,o,r,c,d,s,l,v)=>{const m=e*a,y=new Float32Array(m),g=new Uint8Array(m),u=d*d;for(let n=0;n<a;n++)for(let f=0;f<e;f++){const x=n*e+f,F=o[x];if(F<=0)continue;let N=s?0:4+c*u,q=0;for(let P=0;P<4;P++){const E=P===0?f>0?o[x-1]:-1:P===1?f<e-1?o[x+1]:-1:P===2?n>0?o[x-e]:-1:n<a-1?o[x+e]:-1;if(E>0)q|=1<<P,s&&(N+=1);else if(!s){const D=Math.max(.08,Math.min(1,F/(F-E)));N+=1/D-1}}y[x]=N,g[x]=q|16}const p=1.82;for(let n=0;n<v;n++)for(let f=0;f<a;f++)for(let x=0;x<e;x++){const F=f*e+x,N=g[F];if(!N)continue;let q=0;if(N&1&&(q+=l[F-1]),N&2&&(q+=l[F+1]),N&4&&(q+=l[F-e]),N&8&&(q+=l[F+e]),s){if(y[F]<1)continue;q-=u*r[F]}else q+=u;l[F]+=p*(q/y[F]-l[F])}},x0=(e,a,o,r,c,d,s,l)=>{const v=new Float32Array(e*a);if(e>18&&a>18){const m=e+1>>1,y=a+1>>1,g=new Float32Array(m*y),u=s?new Float32Array(m*y):null,p=new Float32Array(m*y);for(let f=0;f<a;f++)for(let x=0;x<e;x++){const F=(f>>1)*m+(x>>1);g[F]+=o[f*e+x],p[F]++,s&&(u[F]+=r[f*e+x])}for(let f=0;f<m*y;f++)g[f]/=p[f],s&&(u[f]/=p[f]);const n=x0(m,y,g,u,c,d*2,s,l+1);for(let f=0;f<a;f++)for(let x=0;x<e;x++)v[f*e+x]=n[(f>>1)*m+(x>>1)]}return lo(e,a,o,r,c,d,s,v,l===0?36:26),v},b0=(e,a)=>{const o=(s,l)=>{let v=e,m=-1,y=e,g=-1;for(let u=0;u<e;u++)for(let p=0;p<e;p++)s[u*e+p]>0&&(p<v&&(v=p),p>m&&(m=p),u<y&&(y=u),u>g&&(g=u));return m<0?null:[Math.max(1,v-l),Math.min(e-2,m+l),Math.max(1,y-l),Math.min(e-2,g+l)]},r=(s,l,v,m,y)=>{const[g,u,p,n]=y,f=u-g+1,x=n-p+1,F=new Float32Array(f*x),N=m?new Float32Array(f*x):null;for(let E=0;E<x;E++)for(let D=0;D<f;D++)F[E*f+D]=s[(E+p)*e+D+g],m&&(N[E*f+D]=l[(E+p)*e+D+g]);const q=x0(f,x,F,N,v,a,m,0),P=new Float32Array(e*e);for(let E=0;E<x;E++)for(let D=0;D<f;D++)P[(E+p)*e+D+g]=q[E*f+D];return P},c=s=>{const l=new Int32Array(e*e).fill(-1);let v=0;const m=[];for(let y=0;y<e*e;y++)if(!(s[y]<=0||l[y]>=0)){for(l[y]=v,m.push(y);m.length;){const g=m.pop(),u=g%e,p=g/e|0;for(let n=0;n<4;n++){const f=n===0?u>0?g-1:-1:n===1?u<e-1?g+1:-1:n===2?p>0?g-e:-1:p<e-1?g+e:-1;f>=0&&s[f]>0&&l[f]<0&&(l[f]=v,m.push(f))}}v++}return{lab:l,nl:v}};return{bboxOf:o,solveBox:r,label:c,flowCore:s=>{const l=o(s,3),v=new Float32Array(e*e*2);if(!l)return v;const m=r(s,null,0,!1,l),{lab:y,nl:g}=c(s),u=new Float32Array(g),p=new Float32Array(g),n=new Float32Array(g);for(let z=0;z<e*e;z++)y[z]>=0&&(u[y[z]]=Math.max(u[y[z]],m[z]));const f=new Float32Array(e*e),x=new Float32Array(e*e);for(let z=0;z<e*e;z++){const H=y[z];H<0||(f[z]=1/Math.sqrt(Math.max(m[z]/Math.max(u[H],1e-6),.004)),p[H]+=s[z],n[H]+=f[z])}for(let z=0;z<e*e;z++){const H=y[z];H<0||(x[z]=f[z]*p[H]/Math.max(n[H],1e-6)-s[z])}const F=r(s,x,0,!0,l),[N,q,P,E]=l;for(let z=P;z<=E;z++)for(let H=N;H<=q;H++){const k=z*e+H;if(s[k]<=0)continue;const ot=s[k-1]>0,at=s[k+1]>0,ft=s[k-e]>0,ht=s[k+e]>0;v[k*2]=ot&&at?(F[k+1]-F[k-1])/(2*a):at?(F[k+1]-F[k])/a:ot?(F[k]-F[k-1])/a:0,v[k*2+1]=ft&&ht?(F[k+e]-F[k-e])/(2*a):ht?(F[k+e]-F[k])/a:ft?(F[k]-F[k-e])/a:0}const D=new Uint8Array(e*e);for(let z=0;z<e*e;z++)D[z]=s[z]>0?1:0;for(let z=0;z<2;z++){const H=[];for(let k=P;k<=E;k++)for(let ot=N;ot<=q;ot++){const at=k*e+ot;if(D[at])continue;let ft=0,ht=0,Ft=0;for(let dt=0;dt<4;dt++){const Ht=at+(dt===0?-1:dt===1?1:dt===2?-e:e);D[Ht]&&(ft+=v[Ht*2],ht+=v[Ht*2+1],Ft++)}Ft&&H.push([at,ft/Ft,ht/Ft])}for(const[k,ot,at]of H)v[k*2]=ot,v[k*2+1]=at,D[k]=1}return v}}},co=b0(i,B),io=b0(i/2,B*2),{bboxOf:fo,solveBox:ho}=co,g0=(e,a)=>{const o=i/2,r=new Float32Array(o*o);for(let s=0;s<o;s++)for(let l=0;l<o;l++){const v=2*s*i+2*l;r[s*o+l]=.25*(e[v]+e[v+1]+e[v+i]+e[v+i+1])-a}const c=io.flowCore(r),d=new Float32Array(i*i*2);for(let s=0;s<i;s++)for(let l=0;l<i;l++){const v=Math.max(0,Math.min(o-1.001,(l+.5)/2-.5)),m=Math.max(0,Math.min(o-1.001,(s+.5)/2-.5)),y=Math.floor(v),g=Math.floor(m),u=v-y,p=m-g,n=g*o+y;for(let f=0;f<2;f++)d[(s*i+l)*2+f]=(c[n*2+f]*(1-u)+c[(n+1)*2+f]*u)*(1-p)+(c[(n+o)*2+f]*(1-u)+c[(n+o+1)*2+f]*u)*p}return d},U=[0,1].map(()=>({act:0})),Be=(e,a,o,r,c,d)=>{const s=new Uint16Array(i*i*4);if(a){for(let l=0;l<i*i;l++)s[l*4]=It(a[l]),s[l*4+1]=It(o[l]),s[l*4+2]=It(r[l]);d&&(d.aF=s.slice()),t.bindTexture(t.TEXTURE_2D,Pt),t.texSubImage2D(t.TEXTURE_2D,0,e*128,0,i,i,t.RGBA,t.HALF_FLOAT,s)}if(c){s.fill(0);for(let l=0;l<i*i;l++)s[l*4]=It(c[l*2]),s[l*4+1]=It(c[l*2+1]);d&&(d.aQ=s.slice()),t.bindTexture(t.TEXTURE_2D,Pt),t.texSubImage2D(t.TEXTURE_2D,0,e*128,128,i,i,t.RGBA,t.HALF_FLOAT,s)}};let Vt=0,y0=!0;const Xt=C.memo||(C.memo=new Map),Le=I.hash+(I.home?"h":"");let oe=Xt.get(Le);oe?Xt.delete(Le):oe=new Map,Xt.set(Le,oe);for(const e of Xt.keys()){if(Xt.size<=2)break;Xt.delete(e)}const T0=(e,a)=>{const o=$t[Ut];if(t.bindTexture(t.TEXTURE_2D,o.t),C.f32)t.texSubImage2D(t.TEXTURE_2D,0,e*128,0,ut,ut,t.RGBA,t.FLOAT,a);else{const r=new Uint16Array(a.length);for(let c=0;c<a.length;c++)r[c]=It(a[c]);t.texSubImage2D(t.TEXTURE_2D,0,e*128,0,ut,ut,t.RGBA,t.HALF_FLOAT,r)}},w0=e=>Object.assign({},e,{F:e.F.slice(),Itab:e.Itab.slice(),Atab:e.Atab.slice(),eb:e.eb.slice(),bbG:e.bbG.slice(),bb:e.bb.slice()}),E0=(e,a,o,r,c)=>{const[d,s,l,v]=a,m=r.length-1,y=[];for(let n=l;n<=v;n++)for(let f=d;f<=s;f++){const x=e[n*i+f];x>0&&y.push(x)}const g=Float32Array.from(y).sort();let u=g.length-1,p=0;for(let n=m;n>=0;n--){const f=o*n/m;for(;u>=0&&g[u]>f;)p+=g[u],u--;const x=g.length-1-u;r[n]=(p-x*f)*B*B,c[n]=x*B*B}},F0=e=>{const a=U[e],o=a.F,[r,c,d,s]=a.eb,l=2.4*a.R*a.R;for(let g=d;g<=s;g++)for(let u=r;u<=c;u++){const p=g*i+u,n=(u+.5)*B-a.ox,f=(g+.5)*B-a.oy;o[p]>0&&(o[p]*=1+.8*Math.max(0,1-(n*n+f*f)/l))}const v=new Float32Array(i*i),m=new Float32Array(i*i);let y=0;for(let g=d-1;g<=s+1;g++)for(let u=r-1;u<=c+1;u++){const p=g*i+u;v[p]=(o[p+1]-o[p-1])/(2*B),m[p]=(o[p+i]-o[p-i])/(2*B),o[p]>y&&(y=o[p])}a.Fm=y,E0(o,a.bbG,y,a.Itab,a.Atab),Be(e,o,v,m,null)},Te=(e,a,o,r,c,d)=>{const s=y0?[e,a,o,r,c,d,Mt,ct,tt,vt,At,Vt].join():null,l=s&&oe.get(s);if(l){t.bindTexture(t.TEXTURE_2D,Pt),t.texSubImage2D(t.TEXTURE_2D,0,e*128,0,i,i,t.RGBA,t.HALF_FLOAT,l.aF),t.bindTexture(t.TEXTURE_2D,Pt),t.texSubImage2D(t.TEXTURE_2D,0,e*128,128,i,i,t.RGBA,t.HALF_FLOAT,l.aQ),T0(e,l.st),[Mt,ct,tt,vt,At,Vt]=l.after,Object.assign(U[e],w0(l.so));return}const v=s?{}:null,m=[],y=h=>{const T=[];for(let b=2;b<=7;b++)T.push([b,h*(.4+w())/Math.pow(b,.9),w()*6.283]);return T};if(c==="Twin"){const h=w()*6.283,T=r*.78,b=r*(.5+.2*w()),S=(T+b)*.78;m.push({x:a-Math.cos(h)*S*.4,y:o-Math.sin(h)*S*.4,r:T,h:y(.09)}),m.push({x:a+Math.cos(h)*S*.6,y:o+Math.sin(h)*S*.6,r:b,h:y(.09)})}else if(c==="Mug")m.push({x:a,y:o,r,h:y(.012)});else if(c==="Drip Trail"){let h=Math.atan2(_*.56-o,_*.6-a)+(w()-.5)*.9,T=(w()-.5)*.5,b=a,S=o,M=r*.66;for(let L=0;L<7;L++){m.push({x:b,y:S,r:M,h:y(.07)});const V=M*(.7+.12*w()),K=M+V+(L<1?-.4*V:1.2+3.2*w());h+=T+(w()-.5)*.25,b+=Math.cos(h)*K,S+=Math.sin(h)*K,M=Math.max(V,1.1)}}else if(m.push({x:a,y:o,r,h:y(c==="Round"?.03:c==="Lobed"?.2:.12)}),c==="Lobed")for(let h=0;h<2;h++){const T=w()*6.283,b=r*(.3+.2*w());m.push({x:a+Math.cos(T)*r*.85,y:o+Math.sin(T)*r*.85,r:b,h:y(.1)})}const g=[],u=d?c==="Splash"?9+Math.floor(w()*8):Math.floor(w()*4):0;for(let h=0;h<u;h++){const T=w()*6.283,b=r*(1.12+.7*w()*w());g.push({x:a+Math.cos(T)*b,y:o+Math.sin(T)*b,r:.55+1.3*w()*w()})}for(const h of m){h.hc=new Float32Array(8),h.hs=new Float32Array(8);for(const[T,b,S]of h.h)h.hc[T]=b*Math.cos(S),h.hs[T]=-b*Math.sin(S)}const p=(h,T)=>{let b=0;for(const M of m){const L=h-M.x,V=T-M.y,K=Math.hypot(L,V)+1e-6,j=L/K,J=V/K;let mt=1,rt=j,pt=J;for(let St=2;St<=7;St++){const Ao=rt*j-pt*J,Ro=pt*j+rt*J;rt=Ao,pt=Ro,mt+=M.hc[St]*rt+M.hs[St]*pt}b+=Math.exp((M.r*mt-K)/1.4)}let S=1.4*Math.log(Math.max(b,1e-30));for(const M of g)S=Math.max(S,M.r-Math.hypot(h-M.x,T-M.y));return c==="Mug"&&(S=Math.min(S,Math.hypot(h-a,T-o)-(r-1.6))),S};let n=r*1.6+3;for(const h of g)n=Math.max(n,Math.hypot(h.x-a,h.y-o)+h.r+3);for(const h of m)n=Math.max(n,Math.hypot(h.x-a,h.y-o)+h.r*1.6+3);const f=Math.max(0,Math.floor((a-n)/B)),x=Math.min(i-1,Math.ceil((a+n)/B)),F=Math.max(0,Math.floor((o-n)/B)),N=Math.min(i-1,Math.ceil((o+n)/B)),q=new Float32Array(i*i).fill(-n);for(let h=F;h<=N;h++)for(let T=f;T<=x;T++)q[h*i+T]=Math.min(p((T+.5)*B,(h+.5)*B),(Math.min(T,h,i-1-T,i-1-h)-3)*B);const P=fo(q,4),E=ho(q,null,no,!1,P),D=new Uint8Array(i*i);for(let h=0;h<i*i;h++)D[h]=q[h]>0?1:0;const z=[1,-1,i,-i],H=new Int32Array(i*i),k=new Float32Array(i*i),ot=Math.max(2,P[0]-5),at=Math.min(i-3,P[1]+5),ft=Math.max(2,P[2]-5),ht=Math.min(i-3,P[3]+5);for(let h=0;h<4;h++){let T=0;for(let b=ft;b<=ht;b++)for(let S=ot;S<=at;S++){const M=b*i+S;if(D[M])continue;let L=0,V=0;for(let K=0;K<4;K++){const j=z[K],J=M+j,mt=M+2*j;if(D[J]){if(h===0){const rt=Math.max(.08,Math.min(1,q[J]/(q[J]-q[M])));L+=E[J]*(rt-1)/rt}else D[mt]?L+=2*E[J]-E[mt]:L+=E[J]-.5;V++}}V&&(H[T]=M,k[T++]=L/V)}for(let b=0;b<T;b++)E[H[b]]=Math.max(k[b],-12),D[H[b]]=1}for(let h=0;h<i*i;h++)D[h]||(E[h]=-12);let Ft=0,dt=0;{let h=0;for(let M=0;M<i*i;M++)E[M]>h&&(h=E[M]);const T=[];for(let M=0;M<5;M++){const L=et()*6.283,V=6.283/(3.5+6*et());T.push([Math.cos(L)*V,Math.sin(L)*V,et()*6.283])}const b=et()*6.283,S=.14*h;Ft=Math.cos(b)*r*.35,dt=Math.sin(b)*r*.35;for(let M=ft;M<=ht;M++)for(let L=ot;L<=at;L++){const V=M*i+L,K=(L+.5)*B-a,j=(M+.5)*B-o;let J=0;for(const pt of T)J+=Math.cos(pt[0]*K+pt[1]*j+pt[2]);const mt=Math.min(4,Math.max(.35,Math.exp(.55*J))),rt=E[V];E[V]=rt*(1+(mt-1)*Math.exp(-Math.max(rt,0)/S))*(1+.12*Math.max(-1,1-((K-Ft)*(K-Ft)+(j-dt)*(j-dt))/(2.2*r*r)))}}const Ht=new Float32Array(i*i),P0=new Float32Array(i*i);let se=0;for(let h=ft-1;h<=ht+1;h++)for(let T=ot-1;T<=at+1;T++){const b=h*i+T;Ht[b]=(E[b+1]-E[b-1])/(2*B),P0[b]=(E[b+i]-E[b-i])/(2*B),E[b]>se&&(se=E[b])}const Ge=160,ze=new Float32Array(Ge+1),t0=new Float32Array(Ge+1),[I0,N0,V0,X0]=P;E0(E,P,se,ze,t0);const bo=g0(E,0);Be(e,E,Ht,P0,bo,v);const e0=ut*ut,Kt=new Float32Array(e0*4),go=(h,T)=>{const b=h/B-.5,S=T/B-.5,M=Math.max(0,Math.min(i-2,Math.floor(b))),L=Math.max(0,Math.min(i-2,Math.floor(S))),V=b-M,K=S-L,j=L*i+M;return(E[j]*(1-V)+E[j+1]*V)*(1-K)+(E[j+i]*(1-V)+E[j+i+1]*V)*K},j0=[],ne=[];{let h=0;for(let T=V0;T<=X0;T++)for(let b=I0;b<=N0;b++){const S=E[T*i+b];S>0&&(h+=S,j0.push(T*i+b),ne.push(h))}}const yo=ne[ne.length-1],To=Int32Array.from(j0),wo=Float64Array.from(ne),Eo=ne.length-1,Fo=W.fc,Mo=W.fc+W.sf;let nt=Mt,X=ct,A=tt,Z=vt,le=0,ce=0,ie=0,fe=0,he=0;for(let h=0;h<e0;h++){let T=a,b=o;for(let L=0;L<6;L++){le=nt+X|0,nt=X^X>>>9,X=A+(A<<3)|0,A=A<<21|A>>>11,Z=Z+1|0,le=le+Z|0,A=A+le|0;const K=(le>>>0)/4294967296*yo;let j=0,J=Eo;for(;j<J;){const St=j+J>>1;wo[St]<K?j=St+1:J=St}const mt=To[j];ce=nt+X|0,nt=X^X>>>9,X=A+(A<<3)|0,A=A<<21|A>>>11,Z=Z+1|0,ce=ce+Z|0,A=A+ce|0;const rt=(ce>>>0)/4294967296;T=(mt%i+rt)*B,ie=nt+X|0,nt=X^X>>>9,X=A+(A<<3)|0,A=A<<21|A>>>11,Z=Z+1|0,ie=ie+Z|0,A=A+ie|0;const pt=(ie>>>0)/4294967296;if(b=((mt/i|0)+pt)*B,go(T,b)>.02)break}fe=nt+X|0,nt=X^X>>>9,X=A+(A<<3)|0,A=A<<21|A>>>11,Z=Z+1|0,fe=fe+Z|0,A=A+fe|0;const S=(fe>>>0)/4294967296;Kt[h*4]=T/_,Kt[h*4+1]=b/_,Kt[h*4+2]=S,he=nt+X|0,nt=X^X>>>9,X=A+(A<<3)|0,A=A<<21|A>>>11,Z=Z+1|0,he=he+Z|0,A=A+he|0;const M=(he>>>0)/4294967296;Kt[h*4+3]=M<Fo?2:M<Mo?4:0}Mt=nt,ct=X,tt=A,vt=Z,T0(e,Kt);const o0=De*ze[0];Vt||(Vt=o0/(44*Math.sqrt(t0[0])));const zo=W.A0/se*ze[0]/e0,O0={act:1,F:E,Fm:se,Itab:ze,Atab:t0,NB:Ge,eb:[ot,at,ft,ht],bbG:P,ox:a+Ft,oy:o+dt,V:o0,s:De,sStart:De,d:0,dFrom:0,dTo:0,jumpT:0,stage:0,mode:0,dryT:0,ap:zo,V0:o0,rate:0,jit:.9+.2*w(),bb:[Math.max(0,(I0-3)/i),Math.max(0,(V0-3)/i),Math.min(1,(N0+4)/i),Math.min(1,(X0+4)/i)],cx:a,cy:o,R:r,wetT:0};Object.assign(U[e],O0),v&&(v.st=Kt,v.after=[Mt,ct,tt,vt,At,Vt],v.so=w0(O0),oe.set(s,v))},we=(e,a)=>{const o=Math.max(0,Math.min(e.NB,a/e.Fm*e.NB)),r=Math.min(e.NB-1,Math.floor(o)),c=o-r;return e.Itab[r]*(1-c)+e.Itab[r+1]*c},M0=(e,a)=>{const o=Math.max(0,Math.min(e.NB,a/e.Fm*e.NB)),r=Math.min(e.NB-1,Math.floor(o)),c=o-r;return e.Atab[r]*(1-c)+e.Atab[r+1]*c},z0=(e,a)=>{let o=0,r=e.Fm;for(let c=0;c<30;c++){const d=.5*(o+r);we(e,d)>a?o=d:r=d}return .5*(o+r)},kt=[],Ce=(e,a)=>{const o=U[e];if(!o.act)return;if(o.mode===3){o.dryT+=a,o.rate=0;return}if(o.spr>0&&o.spr<1){o.spr=Math.min(1,o.spr+a/.45);const d=o.spr,s=1-(1-d)*(1-d)*Math.cos(4.5*d);o.d=o.Fm*.88*(1-Math.min(s,1))-Math.max(0,s-1)*o.Fm*.3,o.s=o.V/Math.max(we(o,Math.max(o.d,0))+M0(o,0)*Math.max(-o.d,0),1e-6),o.spr>=1&&(o.d=0,o.s=o.V/o.Itab[0]),o.rate=0;return}const r=Vt*Math.sqrt(Math.max(M0(o,o.d),.01))*a,c=o.V;if(o.V=Math.max(0,o.V-r),o.rate=-(r/a)/Math.max(c,1e-6),o.wetT+=a,o.mode===1){o.jumpT+=a;const d=Math.min(1,o.jumpT/.4),s=d*d*(3-2*d);o.d=o.dFrom+(o.dTo-o.dFrom)*s,o.s=o.V/Math.max(we(o,o.d),1e-6),d>=1&&(o.mode=0,o.sStart=o.s,o.jit=.82+.3*w())}else if(o.mode===0){if(o.s=o.V/Math.max(we(o,o.d),1e-6),o.s<o.sStart*(o.stage<ee.n?ee.rs*o.jit:ee.rf))if(o.stage<ee.n){const d=o.sStart*ee.reb*(.96+.08*w()),s=z0(o,o.V/d);s<o.Fm*.78?(o.stage++,o.mode=1,o.jumpT=0,o.dFrom=o.d,o.dTo=s,Be(e,null,null,null,g0(o.F,s)),kt.push(["slip",e])):(o.mode=2,o.sR=o.s,F0(e),kt.push(["recede",e]))}else o.mode=2,o.sR=o.s,F0(e),kt.push(["recede",e])}else o.mode===2&&(o.s=o.sR,o.d=z0(o,o.V/o.sR),(o.V<o.V0*.004||o.d>o.Fm*.985)&&(o.mode=3,o.dryT=0,kt.push(["dry",e])))},jt=new Float32Array(36),Pe=new Float32Array(12);let mo=0;const A0=_/lt*(_/lt),po=_/Yt*(_/Yt),uo=()=>{for(let e=0;e<2;e++){const a=U[e],o=4+e*16,r=a.act&&!(a.spr>0&&a.spr<1)?a.mode===3?2:1:0;jt.set([a.s||0,a.d||0,a.rate||0,r],o),jt.set([.0035,ro,W.sed,a.mode===2?.012:.2],o+4),jt.set([.12,30,Math.max((a.Fm||1)-(a.d||0),.05),.012],o+8),jt.set([W.cv,.22,.6,W.sv],o+12)}},Ee=e=>{jt.set([_,e,mo++*7919%1000003,.02],0),uo(),t.bindFramebuffer(t.FRAMEBUFFER,$t[1-Ut].f),t.viewport(0,0,256,ut),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,$t[Ut].t),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,Pt),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,ke),t.useProgram(gt.sim.p),t.uniform4fv(gt.sim.U,jt),t.drawArrays(t.TRIANGLES,0,3),Ut=1-Ut},Ie=(e,a,o,r,c,d)=>{t.bindFramebuffer(t.FRAMEBUFFER,a),t.viewport(0,0,o,o),e!==2&&(t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT)),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),Pe.set([e,1/r,c,d||0],0);for(let s=0;s<2;s++)Pe.set([U[s].ap||0,U[s].act&&(e===1||!(U[s].spr>0&&U[s].spr<1))?1:0,W.cm,de==="Turkish Grounds"?1:0],4+s*4);t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,$t[Ut].t),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,e===1?null:Se),t.useProgram(gt.spl.p),t.uniform4fv(gt.spl.P,Pe),t.drawArrays(t.POINTS,0,256*ut),t.disable(t.BLEND)},Ot=()=>{Ie(1,oo,Yt,po,6.5),Ie(0,eo,lt,A0,2.6)},R0=e=>{Ie(2,i0,lt,A0,2.6,e),U[e].act=0,U[e].mode=0},k0=(e,a)=>[Y[0]+(e-.5)*_,Y[1]+(a-.5)*_],Tt=new Float32Array(18*4);Tt.set([Y[0],Y[1],_,3,0,0,0,.02],0),Tt.set([W.sig[0],W.sig[1],W.sig[2],0,W.alb[0],W.alb[1],W.alb[2],W.opk,qe[0],qe[1],qe[2],xt==="Tea-Stained"?1:xt==="Faint"?.6:.75,G.a[0],G.a[1],G.a[2],R.exp],24),Tt.set([st[0],st[1],st[2],0,W.mc[0],W.mc[1],W.mc[2],W.ms],40);{const e=k0(.4,.36),a=[e[0]-3.5,e[1]+3,0],o=Rt([a[0]-yt[0],a[1]-yt[1],a[2]-yt[2]]),r=[o[0],o[1],-o[2]],c=Rt([r[1],-r[0],0]),d=[c[1]*r[2],-c[0]*r[2],c[0]*r[1]-c[1]*r[0]],s=R.lamp?st:it,l=Rt([s[1],-s[0],0]),v=[l[1]*s[2],-l[0]*s[2],l[0]*s[1]-l[1]*s[0]];Tt.set([...r,(R.lamp?9:ue==="Overcast"?30:16)*(ve==="Close on the Edge"?1.5:1),...c,0,...d,0,...s,0,...l,0,...v,0],48)}let Dt=0,Wt=0;const S0=()=>{te(),t.flush();for(let e=0;e<2;e++){const a=U[e];Tt.set([a.s||0,a.d||0,a.act&&a.mode!==3?1:0,0],8+e*4),Tt.set(a.act?a.bb:[0,0,0,0],16+e*4)}t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,_t,_t),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,Pt),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,ke),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,C.noise),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,Re),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,Se),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,c0),Tt[5]=Dt,Tt[6]=Wt,t.useProgram(gt.comp.p),v0(gt.comp),t.uniform4fv(gt.comp.V,Tt),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE0)},Ne=k0,_0=(e,a,o)=>{for(let r=0;r<o&&U[e].act;r++){if(Ce(e,a),U[e].mode===3){Ee(a),Ot(),R0(e);break}Ee(a),r%4===0&&Ot()}};O&&(t.bindFramebuffer(t.FRAMEBUFFER,i0),t.viewport(0,0,lt,lt),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT));const Ve=Ne(.4,.36),vo=I.home?10.5:8+4*w(),U0=I.home?Ve:[Ve[0]+(w()-.5)*8,Ve[1]+(w()-.5)*6];te(),Te(0,U0[0]-Y[0]+_/2,U0[1]-Y[1]+_/2,vo,pe,!0);const q0=bt==="Clean"?0:bt==="One Old Ring"?1:bt==="Cup Ring"?0:3,xo=[[.86,.66],[.2,.86],[.78,.2]],D0=e=>{const a=I.home&&e===0?[.715,.635]:xo[e],o=e===0?9+3*w():4+4*w(),r=Ne(a[0]+(w()-.5)*.06,a[1]+(w()-.5)*.06);Te(1,r[0]-Y[0]+_/2,r[1]-Y[1]+_/2,o,w()<.5?"Round":"Lobed",w()<.5)},B0=()=>{if(bt==="Cup Ring"){const e=Ne(.66+(w()-.5)*.06,.6+(w()-.5)*.06);Te(1,e[0]-Y[0]+_/2,e[1]-Y[1]+_/2,18+3*w(),"Mug",!1)}else D0(0)},L0=O&&(bt==="Cup Ring"||q0>0),Xe=L0&&!!C.pend;if(Xe&&B0(),Z0(),te(),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,C.noise),t.bindFramebuffer(t.FRAMEBUFFER,G0),t.viewport(0,0,_t,_t),t.useProgram(gt.bake.p),v0(gt.bake),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,Re),t.generateMipmap(t.TEXTURE_2D),Xe&&t.bindTexture(t.TEXTURE_2D,$t[Ut].t),t.flush(),L0&&!Xe&&B0(),O&&bt==="Cup Ring"&&_0(1,1.1,200),O)for(let e=0;e<q0;e++)e>0&&D0(e),_0(1,1.1,200);te(),kt.length=0;const je=et();if(O){const e=U[0];let a=-1,o=0;const r=I.home?2.5:je<.3?-1:je<.75?2+6*et():1e9,c=I.home?70:je<.3?8+10*et():70;for(;o<c*3&&(Ce(0,1/3),Ee(1/3),o%6===5&&Ot(),a<0&&(e.stage>0&&e.mode===0||e.mode===2)&&(a=0),a>=0&&(a+=1/3),!(r>=0&&a>r||e.V<e.V0*.08||e.mode>=2&&e.V<e.V0*.12&&r>100));o++);Ot()}kt.length=0,S0();const wt=I.input,Et=I.sound;let Oe=0,We=0,Fe=!1,He=0,Ke=0,Ye=0,ae=0,Qe=0,re=0;const Me=[];let Je=!0,Ze=1e9;const C0=(e,a)=>{const o=e*2-1,r=1-a*2,c=Rt([Q[0]+ge*(o*$[0]+r*Nt[0]),Q[1]+ge*(o*$[1]+r*Nt[1]),Q[2]+ge*(o*$[2]+r*Nt[2])]),d=-yt[2]/c[2];return[yt[0]+d*c[0],yt[1]+d*c[1]]},$e=(e,a)=>{let o=e[0],r=e[1];const c=Math.hypot(o,r),d=37-a;c>d&&(o*=d/c,r*=d/c),o=Math.max(Y[0]-_/2+a+4,Math.min(Y[0]+_/2-a-4,o)),r=Math.max(Y[1]-_/2+a+4,Math.min(Y[1]+_/2-a-4,r));let s=U[0].act?U[1].act?-1:1:0;if(s<0){Me.push([o,r,a]);return}Te(s,o-Y[0]+_/2,r-Y[1]+_/2,a,w()<.35?"Round":w()<.6?"Lobed":"Splash",w()<.6),U[s].spr=1e-4,Et.hit("noise",.32,{cutoff:900,dur:.22}),Et.note(79+Math.floor(w()*5),{dur:.25,vel:.12,wave:"sine",attack:.004}),Et.note(67+Math.floor(w()*5),{dur:.5,vel:.06,wave:"sine",attack:.01})};return y0=!1,(e,a)=>{a=Math.min(Math.max(a||0,0),.25),Dt+=a;const o=wt.taps();let r=null;wt.down?(Fe||(He=Dt,Ke=wt.x,Ye=wt.y,ae=0),ae=Math.max(ae,Math.hypot(wt.x-Ke,wt.y-Ye))):Fe&&Dt-He<.35&&ae<.03&&(r=[Ke,Ye]),!r&&!Fe&&!wt.down&&o.length&&(r=[o[0].x,o[0].y]);const c=wt.down&&(Dt-He>.35||ae>.03);Fe=wt.down,Wt+=((c?1:0)-Wt)*Math.min(1,a*4),We+=a*Wt,We>.22&&(We=0,Et.hit("noise",.06*Wt,{cutoff:500+300*w(),dur:.35})),r&&$e(C0(r[0],r[1]),4+4.5*w());const d=U[0].act||U[1].act;d?Je=!0:Je&&(Je=!1,Ze=Dt+14+30*et()*(1+Qe)),!d&&Qe<3&&Dt>Ze&&(Qe++,$e(C0(.14+.72*et(),.4+.48*et()),4+6*et()),Ze=1e9);const s=U[0].act&&U[1].act,l=1+4*Wt;Oe+=a*12;let v=Math.floor(Oe);Oe-=v,v>3&&(v=3);const m=l/12*(s&&Me.length?4:1);if(te(),O)for(let u=0;u<v;u++){for(let p=0;p<2;p++)Ce(p,m);Ee(Math.min(m,.35));for(let p=0;p<2;p++)if(U[p].act&&U[p].mode===3&&U[p].dryT>.6&&(Ot(),R0(p),Me.length)){const n=Me.shift();$e([n[0],n[1]],n[2])}}for(O&&Ot();kt.length;){const[u,p]=kt.shift(),n=U[p].cx?U[p].cx/_-.5:0;u==="slip"?(Et.hit("click",.16,{pan:n}),Et.note(86,{dur:.08,vel:.05,wave:"triangle"})):u==="recede"?Et.note(74,{dur:.4,vel:.04,wave:"sine",attack:.02}):u==="dry"&&Et.hit("blip",.08,{freq:1400,pan:n})}let y=0;for(const u of U)u.act&&u.mode!==3&&(y+=Math.min(1.5,-u.rate*12));re+=y*a*6*l;let g=0;for(;re>1&&g<4;)re-=1+w(),g++,Et.hit(w()<.6?"click":"hat",.02+.05*w()*w(),{at:w()*.05});re>4&&(re=4),S0()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
