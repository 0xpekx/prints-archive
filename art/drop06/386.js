// Coffee Ring: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/386.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Xe){Xe&&Xe.add({num:386,name:"Coffee Ring",fam:"Worlds",recipe:"A spilled drop of coffee drying on a glazed saucer. As it thins, the grounds get carried out to the edge and pack into a dark ring, sometimes with inner rings where the edge slipped, and any cracks in the glaze drink it up. The brew, the spill, the cracks and old stains change every mint. Tap to spill another drop, or hold to blow across it and dry it faster.",interactive:"Tap the saucer to spill another drop. Hold anywhere to blow across it and dry it faster.",music:!0,gl:!0,fps:30,seed:0,make(P){const t=P.gl,yt=P.size,i=128,S=72,D=S/i,nt=128,ot=768,Lt=128,At=P.hash.slice(2);let pe=parseInt(At.slice(0,8),16)|0,Ct=parseInt(At.slice(8,16),16)|0,pt=parseInt(At.slice(16,24),16)|0,Yt=parseInt(At.slice(24,32),16)|0;const y=()=>{pe>>>=0,Ct>>>=0,pt>>>=0,Yt>>>=0;let e=pe+Ct|0;return pe=Ct^Ct>>>9,Ct=pt+(pt<<3)|0,pt=pt<<21|pt>>>11,Yt=Yt+1|0,e=e+Yt|0,pt=pt+e|0,(e>>>0)/4294967296};for(let e=0;e<12;e++)y();const mt=e=>{let a=0;for(const r of e)a+=r[1];let o=y()*a;for(const r of e)if(o-=r[1],o<0)return r[0];return e[e.length-1][0]};let Qt=mt([["Filter Coffee",34],["Espresso",22],["Black Tea",20],["Milky Coffee",14],["Turkish Grounds",10]]),Jt=mt([["Capillary",60],["Mixed",26],["Marangoni Eddy",14]]),Pt=mt([["Single Ring",30],["Two Rings",36],["Stick-Slip",26],["Tree Rings",8]]),Zt=mt([["Round",28],["Lobed",32],["Splash",22],["Twin",18]]),me=mt([["Cream Porcelain",34],["Bone White",26],["Celadon",18],["Ironstone",14],["Speckled Stoneware",8]]),lt=mt([["Faint",34],["Network",42],["Tea-Stained",24]]),$t=mt([["North Window",40],["Morning Sun",32],["Lamp at Night",16],["Overcast",12]]),wt=mt([["Clean",28],["One Old Ring",46],["Many Old Rings",26]]);{let e=parseInt(At.slice(-8),16)^1540483477|0;const a=()=>{e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296};a()<.2&&(wt="Cup Ring"),a()<.17&&(Zt="Drip Trail")}let Nt=(parseInt(At.slice(-8),16)^739982445)+902|0;const J=()=>{Nt=Nt+1831565813|0;let e=Math.imul(Nt^Nt>>>15,1|Nt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<4;e++)J();const Gt=P.home?"Low Across the Well":(()=>{const e=J();return e<.5?"Low Across the Well":e<.76?"From Above":"Close on the Edge"})();P.home&&(Qt="Filter Coffee",Jt="Capillary",Pt="Two Rings",Zt="Lobed",me="Cream Porcelain",lt="Network",$t="North Window",wt="One Old Ring"),P.trait("Brew",Qt),P.trait("Flow",Jt),P.trait("Pinning",Pt),P.trait("Spill",Zt),P.trait("Glaze",me),P.trait("Crazing",lt),P.trait("Light",$t),P.trait("Old Stains",wt),P.trait("Standpoint",Gt);const w0=`#version 300 es
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}`,te=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
`,je=`
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
}`,We=`
uniform vec4 C[4];
vec3 rayDir(vec2 q){vec2 s=vec2(q.x*2.-1.,1.-q.y*2.);return normalize(C[1].xyz+C[0].w*(s.x*C[2].xyz+s.y*C[3].xyz));}
vec2 proj(vec3 P){vec3 v=P-C[0].xyz;float z=dot(v,C[1].xyz);return vec2(dot(v,C[2].xyz)/z/C[0].w*.5+.5,.5-dot(v,C[3].xyz)/z/C[0].w*.5);}
`,T0=te+"uniform sampler2D uN;uniform vec4 B[12];out vec4 o;"+We+je+`
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
}`,He=`
vec4 bsF(sampler2D T,int k,vec2 uv,float yo){
 vec2 p=uv*128.-.5;vec2 i=floor(p),f=p-i;vec2 f2=f*f,f3=f2*f;
 vec2 w0=(1.-3.*f+3.*f2-f3)/6.,w1=(4.-6.*f2+3.*f3)/6.,w2=(1.+3.*f+3.*f2-3.*f3)/6.,w3=f3/6.;
 vec2 g0=w0+w1,g1=w2+w3;
 vec2 a=clamp(i-.5+w1/g0,.5,127.5),b=clamp(i+1.5+w3/g1,.5,127.5);
 vec2 base=vec2(float(k)*128.,yo);
 vec4 A=textureLod(T,(base+a)/256.,0.),Bv=textureLod(T,(base+vec2(b.x,a.y))/256.,0.),Cv=textureLod(T,(base+vec2(a.x,b.y))/256.,0.),D=textureLod(T,(base+b)/256.,0.);
 return g0.y*(g0.x*A+g1.x*Bv)+g1.y*(g0.x*Cv+g1.x*D);
}`,E0=te+"uniform sampler2D uS,uF,uD;uniform vec4 U[9];out vec4 o;"+He+`
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
}`,z0=`#version 300 es
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
}`,M0=te+`in float vM;in float vS;in float vK;in float vR;out vec4 o;
void main(){vec2 d=(gl_PointCoord-.5)*vS;float sg=vS*.25;
if(vR>=0.){float a=vR*6.2832,ca=cos(a),sa=sin(a);d=vec2(ca*d.x-sa*d.y,sa*d.x+ca*d.y)*vec2(1.+1.6*fract(vR*13.7),.85);}float v=vM*exp(-dot(d,d)/(2.*sg*sg));o=vK>.5?vec4(0.,v,0.,1.):vec4(v,0.,0.,1.);}`,F0=te+"uniform sampler2D uB,uF,uD,uL,uT,uN;uniform vec4 V[18];out vec4 o;"+We+je+He+`
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
}`;let N=t.__c386;if(!N){N=t.__c386={};const e=(n,l)=>{const m=t.createShader(n);return t.shaderSource(m,l),t.compileShader(m),m},a=e(t.VERTEX_SHADER,w0),o=e(t.VERTEX_SHADER,z0),r=(n,l)=>{const m=t.createProgram(),w=e(t.FRAGMENT_SHADER,l);return t.attachShader(m,n),t.attachShader(m,w),t.linkProgram(m),{p:m,f:w,v:n}},f={bake:r(a,T0),sim:r(a,E0),spl:r(o,M0),comp:r(a,F0)};t.flush(),N.pend=f,N.ps=f,N.vao=t.createVertexArray(),N.f32=!!t.getExtension("EXT_color_buffer_float"),N.f16=N.f32||!!t.getExtension("EXT_color_buffer_half_float");const h=256,s=new Uint8Array(h*h*4);let d=3697679;const g=()=>{d=d+1831565813|0;let n=Math.imul(d^d>>>15,1|d);return n=n+Math.imul(n^n>>>7,61|n)^n,(n^n>>>14)>>>0&255},b=32,E=new Float32Array(b*b),u=new Float32Array(b*b);for(let n=0;n<b*b;n++)E[n]=g()/255,u[n]=g()/255;const v=n=>n*n*(3-2*n),p=(n,l,m)=>{const w=Math.floor(l),z=Math.floor(m),U=v(l-w),K=v(m-z),B=(C,M)=>n[(M%b+b)%b*b+(C%b+b)%b];return(B(w,z)*(1-U)+B(w+1,z)*U)*(1-K)+(B(w,z+1)*(1-U)+B(w+1,z+1)*U)*K};for(let n=0;n<h;n++)for(let l=0;l<h;l++){const m=(n*h+l)*4;s[m]=g(),s[m+3]=g(),s[m+1]=Math.round((p(E,l/8,n/8)*.7+p(u,l/3,n/3)*.3)*255),s[m+2]=Math.round(p(u,l/8,n/8)*255)}N.noise=t.createTexture(),t.bindTexture(t.TEXTURE_2D,N.noise),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,h,h,0,t.RGBA,t.UNSIGNED_BYTE,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.generateMipmap(t.TEXTURE_2D),N.tmp={}}const ct=N.ps,A0=()=>{const e=N.pend;if(e){N.pend=null;for(const a in e){const o=e[a];if(!t.getProgramParameter(o.p,t.LINK_STATUS))throw new Error("386 "+a+": "+t.getProgramInfoLog(o.p)+" "+t.getShaderInfoLog(o.f)+" "+t.getShaderInfoLog(o.v));t.useProgram(o.p);const r=(f,h)=>{const s=t.getUniformLocation(o.p,f);s&&t.uniform1i(s,h)};r("uS",0),r("uF",1),r("uD",2),r("uN",3),r("uB",4),r("uL",5),r("uT",6);for(const f of["U","P","V","B","C","W"])o[f]=t.getUniformLocation(o.p,f)}}},W=N.f16,Rt=(e,a,o,r,f,h,s)=>{const d=t.createTexture();return t.bindTexture(t.TEXTURE_2D,d),t.texImage2D(t.TEXTURE_2D,0,o,e,a,0,r,f,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,h),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,h),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,s),d},Vt=e=>{const a=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),a},kt=t.CLAMP_TO_EDGE,It=t.LINEAR,R0=t.NEAREST,ue=Rt(yt,yt,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,It,kt),k0=Vt(ue);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR);const S0=W&&N.f32?t.RGBA32F:t.RGBA16F,Oe=()=>{const e=Rt(256,nt,S0,t.RGBA,N.f32?t.FLOAT:t.HALF_FLOAT,R0,kt);return{t:e,f:W?Vt(e):null}},ee=[Oe(),Oe()];let St=0;const oe=Rt(256,256,t.RGBA16F,t.RGBA,t.HALF_FLOAT,It,kt),ve=Rt(ot,ot,W?t.R16F:t.R8,t.RED,W?t.HALF_FLOAT:t.UNSIGNED_BYTE,It,kt),xe=Rt(Lt,Lt,W?t.RG16F:t.RG8,t.RG,W?t.HALF_FLOAT:t.UNSIGNED_BYTE,It,kt),Ke=Rt(ot,ot,W?t.R16F:t.R8,t.RED,W?t.HALF_FLOAT:t.UNSIGNED_BYTE,It,kt),_0=W?Vt(ve):null,U0=W?Vt(xe):null,Ye=W?Vt(Ke):null;t.bindFramebuffer(t.FRAMEBUFFER,null);const _t=(()=>{const e=new Float32Array(1),a=new Uint32Array(e.buffer);return o=>{e[0]=o;const r=a[0],f=r>>16&32768,h=(r>>23&255)-112,s=r&8388607;return h<=0?f:h>=31?f|31743:f|h<<10|s>>13}})(),H=[-11,19],Xt=Gt==="From Above"?{T:[-10,16],el:1.36,az:-.1,D:175,th:.2}:Gt==="Close on the Edge"?{T:[H[0]-.1*S-2.6,H[1]-.14*S-5.4],el:.62,az:.45,D:100,th:.2}:{T:[-12,14],el:.9,az:-.13,D:135,th:.215},Qe=Xt.T,be=Xt.el,Je=Xt.az,ae=Xt.D,re=Xt.th,O=[Math.sin(Je)*Math.cos(be),Math.cos(Je)*Math.cos(be),-Math.sin(be)],it=[Qe[0]-O[0]*ae,Qe[1]-O[1]*ae,-O[2]*ae];let Y=[O[1],-O[0],0];const Ze=Math.hypot(Y[0],Y[1]);Y=[Y[0]/Ze,Y[1]/Ze,0];const Ut=[Y[1]*O[2]-0*O[1],0*O[0]-Y[0]*O[2],Y[0]*O[1]-Y[1]*O[0]],$e=new Float32Array(16);$e.set([it[0],it[1],it[2],re,O[0],O[1],O[2],yt,Y[0],Y[1],Y[2],10,Ut[0],Ut[1],Ut[2],ae]);const ut=e=>{const a=Math.hypot(e[0],e[1],e[2]);return[e[0]/a,e[1]/a,e[2]/a]},Q={"Cream Porcelain":{a:[.86,.82,.74],p:[.8,.74,.62],pv:.25,sp:[.45,.32,.22],sd:.004,cs:5.5},"Bone White":{a:[.9,.89,.86],p:[.82,.83,.82],pv:.15,sp:[.4,.38,.36],sd:.002,cs:4.2},Celadon:{a:[.7,.8,.72],p:[.52,.68,.58],pv:.6,sp:[.35,.36,.3],sd:.003,cs:6.5},Ironstone:{a:[.84,.81,.76],p:[.74,.7,.64],pv:.35,sp:[.4,.3,.22],sd:.01,cs:3.4},"Speckled Stoneware":{a:[.77,.74,.68],p:[.66,.62,.55],pv:.45,sp:[.4,.2,.09],sd:.1,cs:7.5}}[me],se=lt==="Faint"?{t:[.6,.58,.56],s:.55}:lt==="Network"?{t:[.36,.3,.25],s:.9}:{t:[.24,.14,.07],s:1},q0=Q.cs*(lt==="Faint"?1.3:1)*(.85+.3*y()),R={"North Window":{dir:[-.5,.74,.42],sky:[.84,.92,1.05],skyB:[.76,.8,.86],b:13,room:[.045,.036,.028],amb:[.16,.135,.105],li:1.22,lc:[.93,.96,1],fol:.8,nb:3,hw:.42,asp:1.35,exp:.5,lamp:0},"Morning Sun":{dir:[-.58,.68,.38],sky:[1.15,1,.8],skyB:[1.05,.88,.66],b:14,room:[.05,.04,.03],amb:[.13,.1,.075],li:1.6,lc:[1.15,.98,.76],fol:.6,nb:2,hw:.36,asp:1.5,exp:.5,lamp:0},"Lamp at Night":{dir:[.18,.62,.76],sky:[.04,.05,.08],skyB:[.03,.035,.05],b:1,room:[.02,.014,.01],amb:[.012,.01,.009],li:1.05,lc:[1.2,.9,.6],fol:0,nb:3,hw:.7,asp:.9,exp:.85,lamp:1},Overcast:{dir:[-.35,.75,.5],sky:[.9,.92,.95],skyB:[.86,.87,.88],b:4.2,room:[.07,.066,.06],amb:[.28,.265,.245],li:.75,lc:[.92,.93,.96],fol:.4,nb:1,hw:.95,asp:.8,exp:.54,lamp:0}}[$t],tt=ut(R.dir),at=R.lamp?ut([-.5,.8,.36]):tt;let Tt=ut([at[1],-at[0],0]);const ge=ut([Tt[1]*at[2],-Tt[0]*at[2],Tt[0]*at[1]-Tt[1]*at[0]]),Ge=new Float32Array(32);Ge.set([at[0],at[1],at[2],R.hw,Tt[0],Tt[1],Tt[2],R.asp,ge[0],ge[1],ge[2],R.lamp,R.room[0],R.room[1],R.room[2],R.b,R.sky[0],R.sky[1],R.sky[2],R.fol,R.skyB[0],R.skyB[1],R.skyB[2],R.nb,tt[0],tt[1],tt[2],R.lamp?.11:.2,9,6.6,4.4,0]);const t0=new Float32Array(48);t0.set([tt[0],tt[1],tt[2],R.li,Q.a[0],Q.a[1],Q.a[2],lt==="Tea-Stained"?1.7:lt==="Faint"?.85:1,Q.p[0],Q.p[1],Q.p[2],Q.pv,0,0,0,q0,se.t[0],se.t[1],se.t[2],se.s,Q.sp[0],Q.sp[1],Q.sp[2],Q.sd,.16,.09,.05,0,R.lc[0],R.lc[1],R.lc[2],R.lamp,R.amb[0],R.amb[1],R.amb[2],0,0,0,0,0,0,0,0,0,1,2,2,0]);const ye=(()=>{const e=R.lamp?R.lc:R.sky,a=e[0]*.3+e[1]*.5+e[2]*.2;return[e[0]/a,e[1]/a,e[2]/a]})(),jt=()=>{t.bindVertexArray(N.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0)},e0=e=>{t.uniform4fv(e.C,$e),e.W&&t.uniform4fv(e.W,Ge),e.B&&t.uniform4fv(e.B,t0)},X={"Filter Coffee":{sig:[.42,.85,1.6],A0:2.6,alb:[.3,.16,.075],opk:.12,ms:0,mc:[0,0,0],fc:1/260,cm:.5,sed:.004,cv:.9,sf:.12,sv:.16},Espresso:{sig:[.5,.95,1.6],A0:5,alb:[.2,.11,.055],opk:.14,ms:0,mc:[0,0,0],fc:1/160,cm:.6,sed:.006,cv:.85,sf:.16,sv:.14},"Black Tea":{sig:[.4,.92,1.75],A0:1.6,alb:[.42,.19,.06],opk:.1,ms:0,mc:[0,0,0],fc:1/300,cm:.6,sed:.002,cv:1,sf:.08,sv:.2},"Milky Coffee":{sig:[.3,.55,.95],A0:2.6,alb:[.56,.4,.26],opk:.28,ms:2.4,mc:[.42,.29,.18],fc:1/160,cm:.5,sed:.002,cv:1,sf:.55,sv:.1},"Turkish Grounds":{sig:[.5,.95,1.6],A0:3.6,alb:[.19,.105,.05],opk:.15,ms:0,mc:[0,0,0],fc:1/5,cm:3,sed:.12,cv:.35,sf:.14,sv:.15}}[Qt],B0=Jt==="Capillary"?0:Jt==="Mixed"?.16:.55,Wt=Pt==="Single Ring"?{n:0,rs:.5,rf:.06,reb:.85}:Pt==="Two Rings"?{n:1,rs:.6,rf:.08,reb:.9}:Pt==="Stick-Slip"?{n:3,rs:.72,rf:.15,reb:.92}:{n:7,rs:.84,rf:.2,reb:.95},D0=2.7*2.7,L0=1/D0,we=.24,C0=(e,a,o,r,f,h,s,d,g)=>{const b=e*a,E=new Float32Array(b),u=new Uint8Array(b),v=h*h;for(let n=0;n<a;n++)for(let l=0;l<e;l++){const m=n*e+l,w=o[m];if(w<=0)continue;let z=s?0:4+f*v,U=0;for(let K=0;K<4;K++){const B=K===0?l>0?o[m-1]:-1:K===1?l<e-1?o[m+1]:-1:K===2?n>0?o[m-e]:-1:n<a-1?o[m+e]:-1;if(B>0)U|=1<<K,s&&(z+=1);else if(!s){const C=Math.max(.08,Math.min(1,w/(w-B)));z+=1/C-1}}E[m]=z,u[m]=U|16}const p=1.82;for(let n=0;n<g;n++)for(let l=0;l<a;l++)for(let m=0;m<e;m++){const w=l*e+m,z=u[w];if(!z)continue;let U=0;if(z&1&&(U+=d[w-1]),z&2&&(U+=d[w+1]),z&4&&(U+=d[w-e]),z&8&&(U+=d[w+e]),s){if(E[w]<1)continue;U-=v*r[w]}else U+=v;d[w]+=p*(U/E[w]-d[w])}},o0=(e,a,o,r,f,h,s,d)=>{const g=new Float32Array(e*a);if(e>18&&a>18){const b=e+1>>1,E=a+1>>1,u=new Float32Array(b*E),v=s?new Float32Array(b*E):null,p=new Float32Array(b*E);for(let l=0;l<a;l++)for(let m=0;m<e;m++){const w=(l>>1)*b+(m>>1);u[w]+=o[l*e+m],p[w]++,s&&(v[w]+=r[l*e+m])}for(let l=0;l<b*E;l++)u[l]/=p[l],s&&(v[l]/=p[l]);const n=o0(b,E,u,v,f,h*2,s,d+1);for(let l=0;l<a;l++)for(let m=0;m<e;m++)g[l*e+m]=n[(l>>1)*b+(m>>1)]}return C0(e,a,o,r,f,h,s,g,d===0?36:26),g},a0=(e,a)=>{const o=(s,d)=>{let g=e,b=-1,E=e,u=-1;for(let v=0;v<e;v++)for(let p=0;p<e;p++)s[v*e+p]>0&&(p<g&&(g=p),p>b&&(b=p),v<E&&(E=v),v>u&&(u=v));return b<0?null:[Math.max(1,g-d),Math.min(e-2,b+d),Math.max(1,E-d),Math.min(e-2,u+d)]},r=(s,d,g,b,E)=>{const[u,v,p,n]=E,l=v-u+1,m=n-p+1,w=new Float32Array(l*m),z=b?new Float32Array(l*m):null;for(let B=0;B<m;B++)for(let C=0;C<l;C++)w[B*l+C]=s[(B+p)*e+C+u],b&&(z[B*l+C]=d[(B+p)*e+C+u]);const U=o0(l,m,w,z,g,a,b,0),K=new Float32Array(e*e);for(let B=0;B<m;B++)for(let C=0;C<l;C++)K[(B+p)*e+C+u]=U[B*l+C];return K},f=s=>{const d=new Int32Array(e*e).fill(-1);let g=0;const b=[];for(let E=0;E<e*e;E++)if(!(s[E]<=0||d[E]>=0)){for(d[E]=g,b.push(E);b.length;){const u=b.pop(),v=u%e,p=u/e|0;for(let n=0;n<4;n++){const l=n===0?v>0?u-1:-1:n===1?v<e-1?u+1:-1:n===2?p>0?u-e:-1:p<e-1?u+e:-1;l>=0&&s[l]>0&&d[l]<0&&(d[l]=g,b.push(l))}}g++}return{lab:d,nl:g}};return{bboxOf:o,solveBox:r,label:f,flowCore:s=>{const d=o(s,3),g=new Float32Array(e*e*2);if(!d)return g;const b=r(s,null,0,!1,d),{lab:E,nl:u}=f(s),v=new Float32Array(u),p=new Float32Array(u),n=new Float32Array(u);for(let M=0;M<e*e;M++)E[M]>=0&&(v[E[M]]=Math.max(v[E[M]],b[M]));const l=new Float32Array(e*e),m=new Float32Array(e*e);for(let M=0;M<e*e;M++){const V=E[M];V<0||(l[M]=1/Math.sqrt(Math.max(b[M]/Math.max(v[V],1e-6),.004)),p[V]+=s[M],n[V]+=l[M])}for(let M=0;M<e*e;M++){const V=E[M];V<0||(m[M]=l[M]*p[V]/Math.max(n[V],1e-6)-s[M])}const w=r(s,m,0,!0,d),[z,U,K,B]=d;for(let M=K;M<=B;M++)for(let V=z;V<=U;V++){const k=M*e+V;if(s[k]<=0)continue;const Z=s[k-1]>0,$=s[k+1]>0,rt=s[k-e]>0,xt=s[k+e]>0;g[k*2]=Z&&$?(w[k+1]-w[k-1])/(2*a):$?(w[k+1]-w[k])/a:Z?(w[k]-w[k-1])/a:0,g[k*2+1]=rt&&xt?(w[k+e]-w[k-e])/(2*a):xt?(w[k+e]-w[k])/a:rt?(w[k]-w[k-e])/a:0}const C=new Uint8Array(e*e);for(let M=0;M<e*e;M++)C[M]=s[M]>0?1:0;for(let M=0;M<2;M++){const V=[];for(let k=K;k<=B;k++)for(let Z=z;Z<=U;Z++){const $=k*e+Z;if(C[$])continue;let rt=0,xt=0,zt=0;for(let et=0;et<4;et++){const Mt=$+(et===0?-1:et===1?1:et===2?-e:e);C[Mt]&&(rt+=g[Mt*2],xt+=g[Mt*2+1],zt++)}zt&&V.push([$,rt/zt,xt/zt])}for(const[k,Z,$]of V)g[k*2]=Z,g[k*2+1]=$,C[k]=1}return g}}},P0=a0(i,D),N0=a0(i/2,D*2),{bboxOf:V0,solveBox:I0}=P0,r0=(e,a)=>{const o=i/2,r=new Float32Array(o*o);for(let s=0;s<o;s++)for(let d=0;d<o;d++){const g=2*s*i+2*d;r[s*o+d]=.25*(e[g]+e[g+1]+e[g+i]+e[g+i+1])-a}const f=N0.flowCore(r),h=new Float32Array(i*i*2);for(let s=0;s<i;s++)for(let d=0;d<i;d++){const g=Math.max(0,Math.min(o-1.001,(d+.5)/2-.5)),b=Math.max(0,Math.min(o-1.001,(s+.5)/2-.5)),E=Math.floor(g),u=Math.floor(b),v=g-E,p=b-u,n=u*o+E;for(let l=0;l<2;l++)h[(s*i+d)*2+l]=(f[n*2+l]*(1-v)+f[(n+1)*2+l]*v)*(1-p)+(f[(n+o)*2+l]*(1-v)+f[(n+o+1)*2+l]*v)*p}return h},_=[0,1].map(()=>({act:0})),Te=(e,a,o,r,f)=>{const h=new Uint16Array(i*i*4);if(a){for(let s=0;s<i*i;s++)h[s*4]=_t(a[s]),h[s*4+1]=_t(o[s]),h[s*4+2]=_t(r[s]);t.bindTexture(t.TEXTURE_2D,oe),t.texSubImage2D(t.TEXTURE_2D,0,e*128,0,i,i,t.RGBA,t.HALF_FLOAT,h)}if(f){h.fill(0);for(let s=0;s<i*i;s++)h[s*4]=_t(f[s*2]),h[s*4+1]=_t(f[s*2+1]);t.bindTexture(t.TEXTURE_2D,oe),t.texSubImage2D(t.TEXTURE_2D,0,e*128,128,i,i,t.RGBA,t.HALF_FLOAT,h)}};let Ee=0;const s0=(e,a,o,r,f)=>{const[h,s,d,g]=a,b=r.length-1,E=[];for(let n=d;n<=g;n++)for(let l=h;l<=s;l++){const m=e[n*i+l];m>0&&E.push(m)}const u=Float32Array.from(E).sort();let v=u.length-1,p=0;for(let n=b;n>=0;n--){const l=o*n/b;for(;v>=0&&u[v]>l;)p+=u[v],v--;const m=u.length-1-v;r[n]=(p-m*l)*D*D,f[n]=m*D*D}},n0=e=>{const a=_[e],o=a.F,[r,f,h,s]=a.eb,d=2.4*a.R*a.R;for(let u=h;u<=s;u++)for(let v=r;v<=f;v++){const p=u*i+v,n=(v+.5)*D-a.ox,l=(u+.5)*D-a.oy;o[p]>0&&(o[p]*=1+.8*Math.max(0,1-(n*n+l*l)/d))}const g=new Float32Array(i*i),b=new Float32Array(i*i);let E=0;for(let u=h-1;u<=s+1;u++)for(let v=r-1;v<=f+1;v++){const p=u*i+v;g[p]=(o[p+1]-o[p-1])/(2*D),b[p]=(o[p+i]-o[p-i])/(2*D),o[p]>E&&(E=o[p])}a.Fm=E,s0(o,a.bbG,E,a.Itab,a.Atab),Te(e,o,g,b,null)},ne=(e,a,o,r,f,h)=>{const s=[],d=c=>{const T=[];for(let x=2;x<=7;x++)T.push([x,c*(.4+y())/Math.pow(x,.9),y()*6.283]);return T};if(f==="Twin"){const c=y()*6.283,T=r*.78,x=r*(.5+.2*y()),A=(T+x)*.78;s.push({x:a-Math.cos(c)*A*.4,y:o-Math.sin(c)*A*.4,r:T,h:d(.09)}),s.push({x:a+Math.cos(c)*A*.6,y:o+Math.sin(c)*A*.6,r:x,h:d(.09)})}else if(f==="Mug")s.push({x:a,y:o,r,h:d(.012)});else if(f==="Drip Trail"){let c=Math.atan2(S*.56-o,S*.6-a)+(y()-.5)*.9,T=(y()-.5)*.5,x=a,A=o,F=r*.66;for(let q=0;q<7;q++){s.push({x,y:A,r:F,h:d(.07)});const L=F*(.7+.12*y()),I=F+L+(q<1?-.4*L:1.2+3.2*y());c+=T+(y()-.5)*.25,x+=Math.cos(c)*I,A+=Math.sin(c)*I,F=Math.max(L,1.1)}}else if(s.push({x:a,y:o,r,h:d(f==="Round"?.03:f==="Lobed"?.2:.12)}),f==="Lobed")for(let c=0;c<2;c++){const T=y()*6.283,x=r*(.3+.2*y());s.push({x:a+Math.cos(T)*r*.85,y:o+Math.sin(T)*r*.85,r:x,h:d(.1)})}const g=[],b=h?f==="Splash"?9+Math.floor(y()*8):Math.floor(y()*4):0;for(let c=0;c<b;c++){const T=y()*6.283,x=r*(1.12+.7*y()*y());g.push({x:a+Math.cos(T)*x,y:o+Math.sin(T)*x,r:.55+1.3*y()*y()})}for(const c of s){c.hc=new Float32Array(8),c.hs=new Float32Array(8);for(const[T,x,A]of c.h)c.hc[T]=x*Math.cos(A),c.hs[T]=-x*Math.sin(A)}const E=(c,T)=>{let x=0;for(const F of s){const q=c-F.x,L=T-F.y,I=Math.hypot(q,L)+1e-6,j=q/I,G=L/I;let Ft=1,st=j,gt=G;for(let de=2;de<=7;de++){const $0=st*j-gt*G,G0=gt*j+st*G;st=$0,gt=G0,Ft+=F.hc[de]*st+F.hs[de]*gt}x+=Math.exp((F.r*Ft-I)/1.4)}let A=1.4*Math.log(Math.max(x,1e-30));for(const F of g)A=Math.max(A,F.r-Math.hypot(c-F.x,T-F.y));return f==="Mug"&&(A=Math.min(A,Math.hypot(c-a,T-o)-(r-1.6))),A};let u=r*1.6+3;for(const c of g)u=Math.max(u,Math.hypot(c.x-a,c.y-o)+c.r+3);for(const c of s)u=Math.max(u,Math.hypot(c.x-a,c.y-o)+c.r*1.6+3);const v=Math.max(0,Math.floor((a-u)/D)),p=Math.min(i-1,Math.ceil((a+u)/D)),n=Math.max(0,Math.floor((o-u)/D)),l=Math.min(i-1,Math.ceil((o+u)/D)),m=new Float32Array(i*i).fill(-u);for(let c=n;c<=l;c++)for(let T=v;T<=p;T++)m[c*i+T]=Math.min(E((T+.5)*D,(c+.5)*D),(Math.min(T,c,i-1-T,i-1-c)-3)*D);const w=V0(m,4),z=I0(m,null,L0,!1,w),U=new Uint8Array(i*i);for(let c=0;c<i*i;c++)U[c]=m[c]>0?1:0;const K=[1,-1,i,-i],B=new Int32Array(i*i),C=new Float32Array(i*i),M=Math.max(2,w[0]-5),V=Math.min(i-3,w[1]+5),k=Math.max(2,w[2]-5),Z=Math.min(i-3,w[3]+5);for(let c=0;c<4;c++){let T=0;for(let x=k;x<=Z;x++)for(let A=M;A<=V;A++){const F=x*i+A;if(U[F])continue;let q=0,L=0;for(let I=0;I<4;I++){const j=K[I],G=F+j,Ft=F+2*j;if(U[G]){if(c===0){const st=Math.max(.08,Math.min(1,m[G]/(m[G]-m[F])));q+=z[G]*(st-1)/st}else U[Ft]?q+=2*z[G]-z[Ft]:q+=z[G]-.5;L++}}L&&(B[T]=F,C[T++]=q/L)}for(let x=0;x<T;x++)z[B[x]]=Math.max(C[x],-12),U[B[x]]=1}for(let c=0;c<i*i;c++)U[c]||(z[c]=-12);let $=0,rt=0;{let c=0;for(let F=0;F<i*i;F++)z[F]>c&&(c=z[F]);const T=[];for(let F=0;F<5;F++){const q=J()*6.283,L=6.283/(3.5+6*J());T.push([Math.cos(q)*L,Math.sin(q)*L,J()*6.283])}const x=J()*6.283,A=.14*c;$=Math.cos(x)*r*.35,rt=Math.sin(x)*r*.35;for(let F=k;F<=Z;F++)for(let q=M;q<=V;q++){const L=F*i+q,I=(q+.5)*D-a,j=(F+.5)*D-o;let G=0;for(const gt of T)G+=Math.cos(gt[0]*I+gt[1]*j+gt[2]);const Ft=Math.min(4,Math.max(.35,Math.exp(.55*G))),st=z[L];z[L]=st*(1+(Ft-1)*Math.exp(-Math.max(st,0)/A))*(1+.12*Math.max(-1,1-((I-$)*(I-$)+(j-rt)*(j-rt))/(2.2*r*r)))}}const xt=new Float32Array(i*i),zt=new Float32Array(i*i);let et=0;for(let c=k-1;c<=Z+1;c++)for(let T=M-1;T<=V+1;T++){const x=c*i+T;xt[x]=(z[x+1]-z[x-1])/(2*D),zt[x]=(z[x+i]-z[x-i])/(2*D),z[x]>et&&(et=z[x])}const Mt=160,he=new Float32Array(Mt+1),Ne=new Float32Array(Mt+1),[v0,x0,b0,g0]=w;s0(z,w,et,he,Ne);const Y0=r0(z,0);Te(e,z,xt,zt,Y0);const Ve=nt*nt,bt=new Float32Array(Ve*4),Q0=(c,T)=>{const x=c/D-.5,A=T/D-.5,F=Math.max(0,Math.min(i-2,Math.floor(x))),q=Math.max(0,Math.min(i-2,Math.floor(A))),L=x-F,I=A-q,j=q*i+F;return(z[j]*(1-L)+z[j+1]*L)*(1-I)+(z[j+i]*(1-L)+z[j+i+1]*L)*I},y0=[],Kt=[];{let c=0;for(let T=b0;T<=g0;T++)for(let x=v0;x<=x0;x++){const A=z[T*i+x];A>0&&(c+=A,y0.push(T*i+x),Kt.push(c))}}const J0=Kt[Kt.length-1];for(let c=0;c<Ve;c++){let T=a,x=o;for(let A=0;A<6;A++){const F=y()*J0;let q=0,L=Kt.length-1;for(;q<L;){const j=q+L>>1;Kt[j]<F?q=j+1:L=j}const I=y0[q];if(T=(I%i+y())*D,x=((I/i|0)+y())*D,Q0(T,x)>.02)break}bt[c*4]=T/S,bt[c*4+1]=x/S,bt[c*4+2]=y();{const A=y();bt[c*4+3]=A<X.fc?2:A<X.fc+X.sf?4:0}}{const c=ee[St];if(t.bindTexture(t.TEXTURE_2D,c.t),N.f32)t.texSubImage2D(t.TEXTURE_2D,0,e*128,0,nt,nt,t.RGBA,t.FLOAT,bt);else{const T=new Uint16Array(bt.length);for(let x=0;x<bt.length;x++)T[x]=_t(bt[x]);t.texSubImage2D(t.TEXTURE_2D,0,e*128,0,nt,nt,t.RGBA,t.HALF_FLOAT,T)}}const Ie=we*he[0];Ee||(Ee=Ie/(44*Math.sqrt(Ne[0])));const Z0=X.A0/et*he[0]/Ve;Object.assign(_[e],{act:1,F:z,Fm:et,Itab:he,Atab:Ne,NB:Mt,eb:[M,V,k,Z],bbG:w,ox:a+$,oy:o+rt,V:Ie,s:we,sStart:we,d:0,dFrom:0,dTo:0,jumpT:0,stage:0,mode:0,dryT:0,ap:Z0,V0:Ie,rate:0,jit:.9+.2*y(),bb:[Math.max(0,(v0-3)/i),Math.max(0,(b0-3)/i),Math.min(1,(x0+4)/i),Math.min(1,(g0+4)/i)],cx:a,cy:o,R:r,wetT:0})},le=(e,a)=>{const o=Math.max(0,Math.min(e.NB,a/e.Fm*e.NB)),r=Math.min(e.NB-1,Math.floor(o)),f=o-r;return e.Itab[r]*(1-f)+e.Itab[r+1]*f},l0=(e,a)=>{const o=Math.max(0,Math.min(e.NB,a/e.Fm*e.NB)),r=Math.min(e.NB-1,Math.floor(o)),f=o-r;return e.Atab[r]*(1-f)+e.Atab[r+1]*f},c0=(e,a)=>{let o=0,r=e.Fm;for(let f=0;f<30;f++){const h=.5*(o+r);le(e,h)>a?o=h:r=h}return .5*(o+r)},vt=[],ze=(e,a)=>{const o=_[e];if(!o.act)return;if(o.mode===3){o.dryT+=a,o.rate=0;return}if(o.spr>0&&o.spr<1){o.spr=Math.min(1,o.spr+a/.45);const h=o.spr,s=1-(1-h)*(1-h)*Math.cos(4.5*h);o.d=o.Fm*.88*(1-Math.min(s,1))-Math.max(0,s-1)*o.Fm*.3,o.s=o.V/Math.max(le(o,Math.max(o.d,0))+l0(o,0)*Math.max(-o.d,0),1e-6),o.spr>=1&&(o.d=0,o.s=o.V/o.Itab[0]),o.rate=0;return}const r=Ee*Math.sqrt(Math.max(l0(o,o.d),.01))*a,f=o.V;if(o.V=Math.max(0,o.V-r),o.rate=-(r/a)/Math.max(f,1e-6),o.wetT+=a,o.mode===1){o.jumpT+=a;const h=Math.min(1,o.jumpT/.4),s=h*h*(3-2*h);o.d=o.dFrom+(o.dTo-o.dFrom)*s,o.s=o.V/Math.max(le(o,o.d),1e-6),h>=1&&(o.mode=0,o.sStart=o.s,o.jit=.82+.3*y())}else if(o.mode===0){if(o.s=o.V/Math.max(le(o,o.d),1e-6),o.s<o.sStart*(o.stage<Wt.n?Wt.rs*o.jit:Wt.rf))if(o.stage<Wt.n){const h=o.sStart*Wt.reb*(.96+.08*y()),s=c0(o,o.V/h);s<o.Fm*.78?(o.stage++,o.mode=1,o.jumpT=0,o.dFrom=o.d,o.dTo=s,Te(e,null,null,null,r0(o.F,s)),vt.push(["slip",e])):(o.mode=2,o.sR=o.s,n0(e),vt.push(["recede",e]))}else o.mode=2,o.sR=o.s,n0(e),vt.push(["recede",e])}else o.mode===2&&(o.s=o.sR,o.d=c0(o,o.V/o.sR),(o.V<o.V0*.004||o.d>o.Fm*.985)&&(o.mode=3,o.dryT=0,vt.push(["dry",e])))},qt=new Float32Array(36),Me=new Float32Array(12);let X0=0;const i0=S/ot*(S/ot),j0=S/Lt*(S/Lt),W0=()=>{for(let e=0;e<2;e++){const a=_[e],o=4+e*16,r=a.act&&!(a.spr>0&&a.spr<1)?a.mode===3?2:1:0;qt.set([a.s||0,a.d||0,a.rate||0,r],o),qt.set([.0035,B0,X.sed,a.mode===2?.012:.2],o+4),qt.set([.12,30,Math.max((a.Fm||1)-(a.d||0),.05),.012],o+8),qt.set([X.cv,.22,.6,X.sv],o+12)}},ce=e=>{qt.set([S,e,X0++*7919%1000003,.02],0),W0(),t.bindFramebuffer(t.FRAMEBUFFER,ee[1-St].f),t.viewport(0,0,256,nt),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,ee[St].t),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,oe),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,ve),t.useProgram(ct.sim.p),t.uniform4fv(ct.sim.U,qt),t.drawArrays(t.TRIANGLES,0,3),St=1-St},Fe=(e,a,o,r,f,h)=>{t.bindFramebuffer(t.FRAMEBUFFER,a),t.viewport(0,0,o,o),e!==2&&(t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT)),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),Me.set([e,1/r,f,h||0],0);for(let s=0;s<2;s++)Me.set([_[s].ap||0,_[s].act&&(e===1||!(_[s].spr>0&&_[s].spr<1))?1:0,X.cm,Qt==="Turkish Grounds"?1:0],4+s*4);t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,ee[St].t),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,e===1?null:xe),t.useProgram(ct.spl.p),t.uniform4fv(ct.spl.P,Me),t.drawArrays(t.POINTS,0,256*nt),t.disable(t.BLEND)},Bt=()=>{Fe(1,U0,Lt,j0,6.5),Fe(0,_0,ot,i0,2.6)},f0=e=>{Fe(2,Ye,ot,i0,2.6,e),_[e].act=0,_[e].mode=0},h0=(e,a)=>[H[0]+(e-.5)*S,H[1]+(a-.5)*S],ft=new Float32Array(18*4);ft.set([H[0],H[1],S,3,0,0,0,.02],0),ft.set([X.sig[0],X.sig[1],X.sig[2],0,X.alb[0],X.alb[1],X.alb[2],X.opk,ye[0],ye[1],ye[2],lt==="Tea-Stained"?1:lt==="Faint"?.6:.75,Q.a[0],Q.a[1],Q.a[2],R.exp],24),ft.set([tt[0],tt[1],tt[2],0,X.mc[0],X.mc[1],X.mc[2],X.ms],40);{const e=h0(.4,.36),a=[e[0]-3.5,e[1]+3,0],o=ut([a[0]-it[0],a[1]-it[1],a[2]-it[2]]),r=[o[0],o[1],-o[2]],f=ut([r[1],-r[0],0]),h=[f[1]*r[2],-f[0]*r[2],f[0]*r[1]-f[1]*r[0]],s=R.lamp?tt:at,d=ut([s[1],-s[0],0]),g=[d[1]*s[2],-d[0]*s[2],d[0]*s[1]-d[1]*s[0]];ft.set([...r,(R.lamp?9:$t==="Overcast"?30:16)*(Gt==="Close on the Edge"?1.5:1),...f,0,...h,0,...s,0,...d,0,...g,0],48)}let Et=0,Dt=0;const d0=()=>{jt(),t.flush();for(let e=0;e<2;e++){const a=_[e];ft.set([a.s||0,a.d||0,a.act&&a.mode!==3?1:0,0],8+e*4),ft.set(a.act?a.bb:[0,0,0,0],16+e*4)}t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,yt,yt),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,oe),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,ve),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,N.noise),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,ue),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,xe),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,Ke),ft[5]=Et,ft[6]=Dt,t.useProgram(ct.comp.p),e0(ct.comp),t.uniform4fv(ct.comp.V,ft),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE0)},Ae=h0,p0=(e,a,o)=>{for(let r=0;r<o&&_[e].act;r++){if(ze(e,a),_[e].mode===3){ce(a),Bt(),f0(e);break}ce(a),r%4===0&&Bt()}};W&&(t.bindFramebuffer(t.FRAMEBUFFER,Ye),t.viewport(0,0,ot,ot),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT));const Re=Ae(.4,.36),H0=P.home?10.5:8+4*y(),m0=P.home?Re:[Re[0]+(y()-.5)*8,Re[1]+(y()-.5)*6];jt(),ne(0,m0[0]-H[0]+S/2,m0[1]-H[1]+S/2,H0,Zt,!0),A0(),jt(),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,N.noise),t.bindFramebuffer(t.FRAMEBUFFER,k0),t.viewport(0,0,yt,yt),t.useProgram(ct.bake.p),e0(ct.bake),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,ue),t.generateMipmap(t.TEXTURE_2D),t.flush();const O0=wt==="Clean"?0:wt==="One Old Ring"?1:wt==="Cup Ring"?0:3;if(W&&wt==="Cup Ring"){const e=Ae(.66+(y()-.5)*.06,.6+(y()-.5)*.06);ne(1,e[0]-H[0]+S/2,e[1]-H[1]+S/2,18+3*y(),"Mug",!1),p0(1,1.1,200)}const K0=[[.86,.66],[.2,.86],[.78,.2]];if(W)for(let e=0;e<O0;e++){const a=P.home&&e===0?[.715,.635]:K0[e],o=e===0?9+3*y():4+4*y(),r=Ae(a[0]+(y()-.5)*.06,a[1]+(y()-.5)*.06);ne(1,r[0]-H[0]+S/2,r[1]-H[1]+S/2,o,y()<.5?"Round":"Lobed",y()<.5),p0(1,1.1,200)}jt(),vt.length=0;const ke=J();if(W){const e=_[0];let a=-1,o=0;const r=P.home?2.5:ke<.3?-1:ke<.75?2+6*J():1e9,f=P.home?70:ke<.3?8+10*J():70;for(;o<f*3&&(ze(0,1/3),ce(1/3),o%6===5&&Bt(),a<0&&(e.stage>0&&e.mode===0||e.mode===2)&&(a=0),a>=0&&(a+=1/3),!(r>=0&&a>r||e.V<e.V0*.08||e.mode>=2&&e.V<e.V0*.12&&r>100));o++);Bt()}vt.length=0,d0();const ht=P.input,dt=P.sound;let Se=0,_e=0,ie=!1,Ue=0,qe=0,Be=0,Ht=0,De=0,Ot=0;const fe=[];let Le=!0,Ce=1e9;const u0=(e,a)=>{const o=e*2-1,r=1-a*2,f=ut([O[0]+re*(o*Y[0]+r*Ut[0]),O[1]+re*(o*Y[1]+r*Ut[1]),O[2]+re*(o*Y[2]+r*Ut[2])]),h=-it[2]/f[2];return[it[0]+h*f[0],it[1]+h*f[1]]},Pe=(e,a)=>{let o=e[0],r=e[1];const f=Math.hypot(o,r),h=37-a;f>h&&(o*=h/f,r*=h/f),o=Math.max(H[0]-S/2+a+4,Math.min(H[0]+S/2-a-4,o)),r=Math.max(H[1]-S/2+a+4,Math.min(H[1]+S/2-a-4,r));let s=_[0].act?_[1].act?-1:1:0;if(s<0){fe.push([o,r,a]);return}ne(s,o-H[0]+S/2,r-H[1]+S/2,a,y()<.35?"Round":y()<.6?"Lobed":"Splash",y()<.6),_[s].spr=1e-4,dt.hit("noise",.32,{cutoff:900,dur:.22}),dt.note(79+Math.floor(y()*5),{dur:.25,vel:.12,wave:"sine",attack:.004}),dt.note(67+Math.floor(y()*5),{dur:.5,vel:.06,wave:"sine",attack:.01})};return(e,a)=>{a=Math.min(Math.max(a||0,0),.25),Et+=a;const o=ht.taps();let r=null;ht.down?(ie||(Ue=Et,qe=ht.x,Be=ht.y,Ht=0),Ht=Math.max(Ht,Math.hypot(ht.x-qe,ht.y-Be))):ie&&Et-Ue<.35&&Ht<.03&&(r=[qe,Be]),!r&&!ie&&!ht.down&&o.length&&(r=[o[0].x,o[0].y]);const f=ht.down&&(Et-Ue>.35||Ht>.03);ie=ht.down,Dt+=((f?1:0)-Dt)*Math.min(1,a*4),_e+=a*Dt,_e>.22&&(_e=0,dt.hit("noise",.06*Dt,{cutoff:500+300*y(),dur:.35})),r&&Pe(u0(r[0],r[1]),4+4.5*y());const h=_[0].act||_[1].act;h?Le=!0:Le&&(Le=!1,Ce=Et+14+30*J()*(1+De)),!h&&De<3&&Et>Ce&&(De++,Pe(u0(.14+.72*J(),.4+.48*J()),4+6*J()),Ce=1e9);const s=_[0].act&&_[1].act,d=1+4*Dt;Se+=a*12;let g=Math.floor(Se);Se-=g,g>3&&(g=3);const b=d/12*(s&&fe.length?4:1);if(jt(),W)for(let v=0;v<g;v++){for(let p=0;p<2;p++)ze(p,b);ce(Math.min(b,.35));for(let p=0;p<2;p++)if(_[p].act&&_[p].mode===3&&_[p].dryT>.6&&(Bt(),f0(p),fe.length)){const n=fe.shift();Pe([n[0],n[1]],n[2])}}for(W&&Bt();vt.length;){const[v,p]=vt.shift(),n=_[p].cx?_[p].cx/S-.5:0;v==="slip"?(dt.hit("click",.16,{pan:n}),dt.note(86,{dur:.08,vel:.05,wave:"triangle"})):v==="recede"?dt.note(74,{dur:.4,vel:.04,wave:"sine",attack:.02}):v==="dry"&&dt.hit("blip",.08,{freq:1400,pan:n})}let E=0;for(const v of _)v.act&&v.mode!==3&&(E+=Math.min(1.5,-v.rate*12));Ot+=E*a*6*d;let u=0;for(;Ot>1&&u<4;)Ot-=1+y(),u++,dt.hit(y()<.6?"click":"hat",.02+.05*y()*y(),{at:y()*.05});Ot>4&&(Ot=4),d0()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
