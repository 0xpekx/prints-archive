// Fog Bow: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/633.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ae){ae&&ae.add({num:633,name:"Fog Bow",fam:"Vistas",recipe:"A shingle spit on the Svalbard coast as the sea fog thins, with a huge white fogbow on the fog bank, grey water lapping the stones and broken icebergs half lost in the white. How high the sun is, the fog, the bow, the spit, what's standing in the fog, where you stand and the sea change every mint. Nothing to press, just watch the water creep up the stones.",gl:!0,music:!1,fps:30,seed:0,make(_){const t=_.gl,V=_.size,q=!!_.home;let J=6503182;for(let e=2;e<66;e+=8)J=Math.imul(J^parseInt(_.hash.slice(e,e+8),16),2246822507)^J>>>13;const $=()=>{J=J+1831565813|0;let e=Math.imul(J^J>>>15,1|J);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<8;e++)$();const mt=e=>{let o=0;for(const a in e)o+=e[a];let r=$()*o;for(const a in e)if(r-=e[a],r<0)return a;return Object.keys(e)[0]},w=Math.PI/180,U=(e,o,r)=>e<o?o:e>r?r:e,j=(e,o,r)=>{const a=U((r-e)/(o-e),0,1);return a*a*(3-2*a)},Rt=_.trait("Sun",q?"Morning":mt({Morning:40,"Very low":28,Higher:24,"Midnight sun":8})),tt=_.trait("Fog",q?"Thinning":mt({Thinning:40,Thick:26,"Lying low":22,"Nearly gone":12})),Fe=_.trait("Bow",q?"Broad and white":mt({"Broad and white":40,"A second band inside":26,"Faintly coloured":24,"Wide and pale":10})),St=_.trait("In the fog",q?"A few bergs":mt({"A few bergs":36,"One great berg":26,Growlers:22,"A far headland":16})),Ce=_.trait("Spit",q?"Running away right":mt({"Running away right":40,"Running away left":26,"A low bar":20,"A wide beach":14})),zt=_.trait("Light",q?"Pearl":mt({Pearl:40,Pewter:28,"Cold blue":20,"Faint rose":12}));let et=6502929;for(let e=2;e<66;e+=8)et=Math.imul(et^parseInt(_.hash.slice(e,e+8),16),2654435761)^et>>>15;const ne=()=>{et=et+1831565813|0;let e=Math.imul(et^et>>>15,1|et);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<6;e++)ne();const Bt=e=>{let o=0;for(const a in e)o+=e[a];let r=ne()*o;for(const a in e)if(r-=e[a],r<0)return a;return Object.keys(e)[0]};let pt=q?"On the spit":Bt({"On the spit":50,"At the water's edge":18,"On the storm crest":14,"From the raised beach":11,"Facing open water":7});pt==="Facing open water"&&tt==="Thick"&&(pt="At the water's edge");let ot=6503469;for(let e=2;e<66;e+=8)ot=Math.imul(ot^parseInt(_.hash.slice(e,e+8),16),739982445)^ot>>>14;const se=()=>{ot=ot+1831565813|0;let e=Math.imul(ot^ot>>>15,1|ot);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<5;e++)se();{const e=se();!q&&pt==="On the spit"&&(pt=e<.2?"Down among the stones":e<.36?"Along the bow's foot":pt)}const rt=_.trait("Standpoint",pt),Nt=_.trait("On the beach",q?"Bare shingle":Bt({"Bare shingle":46,"Stranded ice":24,"Old snow":16,"A kelp wrack line":14})),xt=_.trait("Sea",q?"Glass":Bt({Glass:46,"A long low swell":26,"Brash ice":18,"A skin of new ice":10})),Dt={Morning:10.5,"Very low":5,Higher:18,"Midnight sun":2.6}[Rt]*w,Pt={Morning:.32,"Very low":.55,Higher:.12,"Midnight sun":.85}[Rt],wt={Thinning:[.0022,95,.0058,9,.13],Thick:[.006,150,.026,22,.06],"Lying low":[6e-4,60,.03,32,.1],"Nearly gone":[9e-4,80,.0042,10,.14]}[tt],Ue=tt==="Lying low"?120:0,He={Thinning:.6,Thick:0,"Lying low":.75,"Nearly gone":.9}[tt],Tt={"Broad and white":[15,.3,.17,.92],"A second band inside":[24,.13,.17,.95],"Faintly coloured":[36,.22,.16,.85],"Wide and pale":[9.5,.2,.22,.7]}[Fe];tt==="Thick"&&(Tt[2]*=.62);const v={Pearl:[[.6,.615,.635],[.7,.715,.735],[.43,.51,.63]],Pewter:[[.455,.475,.5],[.53,.55,.57],[.33,.38,.46]],"Cold blue":[[.5,.555,.63],[.58,.635,.7],[.33,.45,.66]],"Faint rose":[[.64,.61,.615],[.75,.71,.71],[.47,.5,.62]]}[zt];if(zt==="Cold blue"&&(v[0]=[.44,.53,.66],v[2]=[.22,.38,.72]),zt==="Faint rose"&&(v[0]=[.7,.6,.6],v[1]=[.8,.7,.69]),zt==="Pewter")for(let e=0;e<3;e++)v[0][e]*=.9;if(tt==="Thick")for(let e=0;e<2;e++)for(let o=0;o<3;o++)v[e][o]*=.8;tt==="Nearly gone"&&(v[2]=[v[2][0]*.62,v[2][1]*.78,v[2][2]*1.02]);{const e={Morning:[1,1,1],"Very low":[1.03,.99,.95],Higher:[.99,1,1.02],"Midnight sun":[1.1,.95,.82]}[Rt];for(let o=0;o<2;o++)for(let r=0;r<3;r++)v[o][r]*=e[r];for(let o=0;o<3;o++)v[2][o]*=.5+.5*e[o]}const H={"Running away right":[-2.7,.29,7.5,.82,1],"Running away left":[-2.6,.26,7,.8,-1],"A low bar":[-2.9,.16,3.6,.55,1],"A wide beach":[-2.2,.55,15,1.8,1]}[Ce];let It=St==="A far headland"?1:q?.5:$()<.5?.45:0;tt==="Nearly gone"&&(It=Math.max(It,.85)),q||(H[0]+=($()-.5)*2.4,H[1]*=.72+$()*.75,H[2]*=.75+$()*.6,H[3]*=.8+$()*.5);const Xt=Math.tan(37.5*w),k=H[4],st=e=>H[0]+H[1]*e+2.2*Math.sin(e*.047+.7)+.9*Math.sin(e*.16+1),ie=e=>{let o=H[2]*(1+-.5800000000000001*j(0,220,e));return e<0&&(o+=o*1.6*j(0,160,-e)),o},qe=e=>{let o=H[3]*j(300,190,e);return e<0&&(o*=1+j(0,200,-e)),o},Be=(e,o)=>{const r=e*k-st(o),a=Math.max(ie(o),.6),s=(r-a)/a;return Math.max(qe(o)*(1-s*s)+Math.min(r,0)*.75+.16*U(r,-1,1),-2.4)};let at=0,Gt=0,it=1.55,L=0,ct=3.5*w,nt=-7.5*w;rt==="At the water's edge"?(at=k*(st(0)+.55),it=.42,L=k*9*w,ct=10*w,nt=L-k*4*w):rt==="On the storm crest"?(Gt=-6,at=k*(st(-6)+ie(-6)),it=1.6,L=k*(Math.atan(H[1])+3*w),ct=2.5*w,nt=L-k*31*w):rt==="From the raised beach"?(Gt=-45,at=k*(st(-45)+12),it=8.5,L=-k*6*w,ct=-7*w,nt=L):rt==="Facing open water"?(at=k*(st(0)+.4),it=1.05,L=-k*64*w,ct=4*w,nt=L):rt==="Down among the stones"?(at=k*(st(0)+.25),it=.28,L=-k*2*w,ct=-6*w,nt=L-k*6*w):rt==="Along the bow's foot"&&(at=k*(st(0)+3.2),it=1.5,nt=-k*6*w,L=nt-k*31*w,ct=6*w);const ce=nt+Math.PI,vt=[Math.sin(ce)*Math.cos(Dt),Math.sin(Dt),Math.cos(ce)*Math.cos(Dt)],Ot=[-vt[0],-vt[1],-vt[2]],D=1536,At=-700,_t=-460,lt=1400,Wt=new Map,le=new Float32Array(1),De=new Uint32Array(le.buffer),Pe=e=>{le[0]=e;const o=De[0],r=(o>>>23&255)-112;return r<=0?0:r>=31?31744:r<<10|o>>>13&1023},g=(()=>{let e=J^20973|0;return()=>{e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}})(),Lt=(e,o,r)=>{let a=e*374761393+o*668265263+r*2147483647|0;return a=Math.imul(a^a>>>13,1274126177),((a^a>>>16)>>>0)/4294967296},gt=(e,o,r)=>{const a=Math.floor(e),s=Math.floor(o),m=e-a,l=o-s,z=m*m*(3-2*m),F=l*l*(3-2*l);return(Lt(a,s,r)*(1-z)+Lt(a+1,s,r)*z)*(1-F)+(Lt(a,s+1,r)*(1-z)+Lt(a+1,s+1,r)*z)*F};let Ft=rt==="Facing open water"?L:0;const P=(e,o,r,a,s,m)=>{if(Ft){const y=Math.cos(Ft),Z=Math.sin(Ft),N=e;e=U(N*y+o*Z,-590,590),o=-N*Z+o*y}const l=g()*1e6|0,z=Math.cos(g()*3),F=Math.sin(g()*3);let B=l^2654435769;const i=()=>{B=B+1831565813|0;let y=Math.imul(B^B>>>15,1|B);return y=y+Math.imul(y^y>>>7,61|y)^y,((y^y>>>14)>>>0)/4294967296};if(m<0){const y=i();m=y<.36?0:y<.7?1:2}const R=i()*6.283,h=Math.cos(R),S=Math.sin(R),b=.22+i()*.3,p=i()*6.283,T=Math.cos(p),n=Math.sin(p),c=.1+i()*.4,d=(i()-.5)*.6,A=(i()-.5)*.6,u=(i()-.5)*1.1,E=(i()-.5)*1.1,C=.45+i()*.35,I=m===3?.5:.28,X=4+(i()*3|0),Y=i()*6.283,Q=Math.max(r,a)*1.5,O=U((e-Q-At)/lt*D|0,1,D-2),ht=U((e+Q-At)/lt*D|0,1,D-2),Ht=U((o-Q-_t)/lt*D|0,1,D-2),oe=U((o+Q-_t)/lt*D|0,1,D-2);for(let y=Ht;y<=oe;y++)for(let Z=O;Z<=ht;Z++){const N=At+(Z+.5)/D*lt-e,K=_t+(y+.5)/D*lt-o,W=(N*z+K*F)/r,G=(-N*F+K*z)/a,ze=Math.hypot(W,G);if(ze>1.32)continue;const bt=ze+(gt(N*.022,K*.022,l+3)-.5)*.5+(gt(N*.08,K*.08,l+4)-.5)*.14;if(bt>=1)continue;let qt;if(m===0){const dt=Math.atan2(G,W),Et=1+.07*Math.sin(dt*X+Y)+.035*Math.sin(dt*(X+3)+1.3);qt=(.12*j(1,.88,bt)+.88*Math.pow(Math.max(1-bt*bt*Et,0),.75))*(1+.04*(gt(N*.06,K*.06,l+5)-.5))}else if(m===1){const dt=W*h+G*S,Et=W*T+G*n;qt=j(1,.9,bt)*U(.7+b*dt-.3*j(c,c+.08,Et),.15,1)+.05*(gt(N*.09,K*.09,l+5)-.5)}else{const dt=Math.atan2(G,W),Et=1+.16*Math.sin(dt*3+Y)+.09*Math.sin(dt*5+X),Ke=Math.max(0,1-Math.hypot(W-d,G-A)*Et/.62),Je=Math.max(0,1-Math.hypot(W-u,G-E)*Et/.46),Le=1+.12*(gt(N*.3,K*.3,l+6)-.5);qt=j(1,.88,bt)*Math.max(I*U(1+.6*(W*h+G*S),.5,1.4),Math.pow(Ke,.55)*Le,C*Math.pow(Je,.55)*Le)+.03*(gt(N*.18,K*.18,l+5)-.5)}const re=Pe(s*Math.max(qt,0));if(!re)continue;const Ne=(y>>6)*32+(Z>>6);let Mt=Wt.get(Ne);Mt||(Mt=new Uint16Array(4096),Wt.set(Ne,Mt));const _e=(y&63)*64+(Z&63);re>Mt[_e]&&(Mt[_e]=re)}};if(St==="A few bergs")if(q)P(-125,235,30,22,17,2),P(120,430,34,24,19,2),P(-330,520,62,36,21,0),P(-58,215,14,10,5,0);else{const e=3+(g()*2|0);for(let o=0;o<e;o++){const r=-420+g()*700,a=260+g()*340,s=26+g()*30,m=18+g()*18,l=8+g()*11;g(),P(r,a,s,m,l,-1)}}else if(St==="One great berg")P(-90+g()*80*(g()<.5?1:-1),360+g()*70,92,54,34,3);else if(St==="Growlers")for(let e=0;e<12;e++){const o=-1.05+g()*1.5,r=110+g()*340;P(Math.sin(o)*r,Math.cos(o)*r,7+g()*13,5+g()*8,2.5+g()*4,0)}if(Ft=0,rt==="Facing open water"){const e=Math.cos(L),o=Math.sin(L);for(let r=0;r<5;r++){const a=(g()-.5)*1.1,s=70+g()*160,m=Math.sin(a)*s,l=Math.cos(a)*s;P(at+m*e+l*o,-m*o+l*e,4+g()*7,3+g()*5,1.6+g()*2.5,0)}}P(-175,40,40,26,14,1),P(235,95,46,30,18,2),P(180,-260,38,30,12,0),P(-280,-330,48,36,16,1);const kt=`#version 300 es
precision highp float; precision highp int;
out vec2 vUv;
void main(){ vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2)); vUv=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,Vt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,fe=`
uniform vec4 uSp,uSp2;
float sdn(float a,float b,float x){ return 1.-smoothstep(b,a,x); }
float WL(float z){ return uSp.x+uSp.y*z+2.2*sin(z*.047+.7)+.9*sin(z*.16+1.); }
`,ue=e=>Vt+"#define BEACH "+e+`
`+fe+`
uniform sampler2D uN,uMap;
uniform vec4 uCam,uFw,uRt,uUp,uJ,uS,uHC,uZC,uFar,uSC,uLp,uBe;
in vec2 vUv; layout(location=0) out vec4 o;
float gIce,gNear,gU;
float CW(float z){ float a=uSp.z*(1.-.58*smoothstep(0.,220.,z)); if(z<0.) a+=a*1.6*smoothstep(0.,160.,-z); return a; }
float CH(float z){ float a=uSp.w*sdn(300.,190.,z); if(z<0.) a*=1.+smoothstep(0.,200.,-z); return a; }
float hMacro(vec2 p){
  float x=p.x*uSp2.x, z=p.y, u=x-WL(z), cw=max(CW(z),.6);
  float cz=fract(z*.14+.31*sin(z*.023))-.5; u+=.42*(8.*cz*cz-1.)*sdn(6.,1.,abs(u))*sdn(140.,60.,z); // beach cusps: rounded bays, pointed horns
  float t=(u-cw)/cw;
  float h=CH(z)*(1.-t*t)+min(u,0.)*(.3+.45*smoothstep(-2.,-5.,u))+.16*clamp(u,-1.,1.);
  float sh=smoothstep(-2.,1.,h);
  h+=.11*(textureLod(uN,p*.031,0.).r-.5)*sh+.05*sin(z*1.3+x*.2)*sdn(4.5,.4,abs(u))*sh;
  // the far end breaks into a chain of low stony humps and goes under
  float fe=smoothstep(170.,330.,z);
  h+=fe*(1.5*(textureLod(uN,vec2(z*.0045,u*.02)+.6,0.).r-.5)-.32)*sh;
  h=max(h,-2.4);
  gU=u; gNear=step(-6.,u)*step(u,2.*cw+6.)*step(30.,z);
  vec2 m=(p-uSp2.yz)/uSp2.w;
  float mh=textureLod(uMap,m,0.).r;
  gNear=max(gNear,step(.05,mh));
  if(mh>.8) mh+=(textureLod(uN,p*.07,0.).b-.5)*.9*smoothstep(.8,5.,mh);
  gIce=step(h,mh)*step(.6,mh);
  return mh>.6?max(h,mh-.02):h;
}
vec3 hf3(ivec2 c,uint s){ uvec3 v=uvec3(uvec2(c),s)*uvec3(1597334677u,3812015801u,2654435761u); v=(v^(v.yzx>>7))*1540483477u; v=(v^(v.zxy>>11))*1274126177u; v^=v.yzx>>16; return vec3(v)/4294967295.; }
// rounded stones in three size classes; the height is above the macro surface, in metres
// sorted by the sea: sv 0 at the water (gravel, few big stones), 1 on the storm crest (the big cobbles)
float stones(vec2 p,float rel,float sv,int nl,inout vec4 inf){
  float best=0.;
  inf=vec4(.3,0.,.3,1.);
  const int NR=1;
  for(int l=0;l<nl;l++){
    float s=l==0?5.4:(l==1?15.5:43.);
    vec2 q=p*s+vec2(float(l)*9.3,float(l)*3.7);
    ivec2 ic=ivec2(floor(q)); vec2 f=q-vec2(ic);
    float gate=l==0?mix(.28,.64,sv):(l==1?.78:mix(.96,.8,sv));
    for(int y=-NR;y<=NR;y++) for(int x=-NR;x<=NR;x++){
      vec3 r=hf3(ic+ivec2(x,y),uint(l)+1u);
      if(r.z<gate){
        vec3 r2=hf3(ic+ivec2(x,y),uint(l)+11u);
        vec2 cn=vec2(float(x),float(y))+.5+(r.xy-.5)*.78-f;
        vec2 dr=normalize(vec2(r2.x-.5,r.z/gate-.5)+vec2(1e-3,0.)); float ca=dr.x, sa=dr.y;
        float rad=l==0?mix(.42,.82,r2.y*r2.y)*mix(.6,1.1,sv):mix(.5,.84,r2.y);
        vec2 w=vec2(cn.x*ca+cn.y*sa,-cn.x*sa+cn.y*ca)/(rad*vec2(1.,mix(.58,.96,r2.z)));
        float wob=textureLod(uN,(cn+vec2(float(x),float(y))*.7)*.11+r.xy,0.).r-.5;
        float rho=dot(w,w)*(1.+wob*.9);
        if(rho<1.){
          float pr=sqrt(1.-rho);
          float hh=rad/s*(l==2?mix(.18,.3,r2.z):mix(.34,.52,r2.z))*pr*(.82+.18*pr)+(l==0?.012:0.);
          if(hh>best){ best=hh; inf=vec4(r.x,pr,r2.y,float(l)/2.); }
        }
      }
    }
  }
#if BEACH
  if(inf.w<.1&&uBe.x>.5&&inf.x>.9&&sv<.55){ inf.w=2.; best*=1.4; } // a lump of stranded ice instead of a cobble
#endif
  return best*rel;
}
vec3 envSky(vec3 r){ float e=r.y; vec3 c=mix(uHC.rgb*.7,uHC.rgb,smoothstep(-.25,.2,e)); return mix(c,uZC.rgb*1.05,smoothstep(.15,.95,e)); }
void main(){
  vec2 px=vUv*2.-1.+uJ.xy;
  vec3 rd=normalize(uFw.xyz+px.x*uUp.w*uRt.xyz+px.y*uUp.w*uUp.xyz);
  vec3 eye=uCam.xyz;
  float t0=.45;
  bool mirror=uJ.z>.5;
  if(mirror){
    if(rd.y>=-.0003){ o=vec4(envSky(rd),5e-5); return; }
    eye.y=-eye.y; rd.y=-rd.y; t0=(-eye.y)/rd.y+.02;
  }
  // one call site for the macro surface (Windows compiles every call site again): the march, its refinement, then
  // three more samples at the hit for the height, slope and ice of the ground there
  float t=t0,tp=t0,a=t0,b=t0; bool hit=false; int nb=0, ph=0;
  vec3 hp=eye; float es=.01, hm0=0.,hm1=0.,hm2=0., ice=0.;
  const int NM=180;
  for(int i=0;i<NM;i++){
    float tq=hit?.5*(a+b):t;
    vec3 p=ph>0?hp+vec3(ph==2?es:0.,0.,ph==3?es:0.):eye+rd*tq;
    float hm=hMacro(p.xz), d=p.y-hm;
    if(ph>0){ if(ph==1){ hm0=hm; ice=gIce; } else if(ph==2) hm1=hm; else { hm2=hm; break; } ph++; }
    else if(hit){ if(d<0.) b=tq; else a=tq; nb++; if(nb>7){ t=.5*(a+b); hp=eye+rd*t; es=max(.0035,t*.003); ph=1; } }
    else if(d<0.){ hit=true; a=tp; b=t; }
    else { tp=t; t+=clamp(d*.72,.02+t*mix(.055,.02,gNear),.22+t*.085)*(1.+uJ.w); if(t>2600.) break; }
  }
  if(hit&&ph<4){ if(ph==0){ t=.5*(a+b); hp=eye+rd*t; hm0=hp.y; } hm1=hm0; hm2=hm0; }
  vec2 gm=vec2(hm1-hm0,hm2-hm0)/es; vec2 h0xz=hp.xz;
  if(!hit){
    vec3 cFar=envSky(rd); float dFar=2e4;
    if(rd.y<.24&&uFar.x>.01){
      vec2 dd=rd.xz/(abs(rd.x)+abs(rd.z)+1e-5);
      for(int l=0;l<2;l++){
        vec2 uv=dd*(.42+float(l)*.34)+vec2(.13,float(l)*.41);
        float win=sdn(uFar.w,uFar.w*.35,length(dd-uFar.yz));
        vec2 uq=uv*256.-.5, fq=fract(uq); uq=(floor(uq)+fq*fq*(3.-2.*fq)+.5)/256.;
        float el=-.012+(.13+.09*float(1-l))*uFar.x*win*(.35+1.1*textureLod(uN,uq,0.).g+.6*textureLod(uN,uv*3.1,0.).r);
        if(rd.y<el&&dFar>1e4){
          float sn=textureLod(uN,uv*2.3+vec2(rd.y*6.1,rd.y*3.4)+.17,0.).r+rd.y*1.6;
          cFar=mix(vec3(.11,.115,.13),vec3(.62,.64,.68)+uSC.rgb*uS.w*.25,smoothstep(.56,.72,sn))*(1.-.2*float(l));
          dFar=l==0?2500.:4400.;
        }
      }
    }
    o=vec4(cFar,1./(dFar+1.));
    return;
  }
  float rel=(!mirror&&rd.y<-.003)?sdn(84.,40.,t):0.;
  int nS=t<30.?20:8;
  int nl=t<14.?int(uLp.x):(t<34.?2:1);
  float ry=max(-rd.y,.045);
  float ta=max(t-.14/ry,t*.55), tb=t+.2/ry, A=ta, B=tb, prev=ta;
  int stage=rel>0.?0:2, ns=0; float shd=1., sy0=0.;
  vec2 sxz=normalize(uS.xz+vec2(1e-4,0.)); float stn=uS.y/max(length(uS.xz),.05);
  float hh0=0.,hh1=0.,hh2=0.; vec4 inf=vec4(.3,0.,.3,1.), infH=inf;
  float ee=max(.0035,t*.0016);
  for(int i=0;i<48&&stage<4;i++){
    float tq=0.; vec2 q;
    if(stage==0){ tq=mix(ta,tb,float(ns)/float(nS)); q=(eye+rd*tq).xz; }
    else if(stage==1){ tq=.5*(A+B); q=(eye+rd*tq).xz; }
    else if(stage==2){ q=hp.xz+(ns==1?vec2(ee,0.):(ns==2?vec2(0.,ee):vec2(0.))); }
    else { tq=.022*float(ns+1)+.0085*float((ns+1)*(ns+1)); q=hp.xz+sxz*tq; }
    float H=hm0+dot(gm,q-h0xz);
    if(rel>0.) H+=stones(q,rel,smoothstep(.1,.8,H),nl,inf)*mix(.2,1.,smoothstep(-.2,.09,H));
    if(stage==0){
      vec3 p=eye+rd*tq;
      if(p.y<H){ stage=1; A=prev; B=tq; ns=0; }
      else { prev=tq; ns++; if(ns>nS){ stage=2; ns=0; t=tb; hp=eye+rd*t; } }
    } else if(stage==1){
      vec3 p=eye+rd*tq;
      if(p.y<H) B=tq; else A=tq;
      ns++; if(ns>5){ stage=2; ns=0; t=.5*(A+B); hp=eye+rd*t; }
    } else if(stage==2){
      if(ns==0){ hh0=H; infH=inf; sy0=H+.004; }
      else if(ns==1) hh1=H; else hh2=H;
      ns++; if(ns>2){ stage=(rel>.05&&t<60.)?3:4; ns=0; }
    } else {
      shd=min(shd,smoothstep(-.004,.01+.02*tq,sy0+stn*tq-H));
      ns++; if(ns>7) stage=4;
    }
  }
  vec3 n=normalize(vec3(hh0-hh1,ee,hh0-hh2));
  vec2 pxz=hp.xz;
  vec3 col;
  if(ice>.5){
    // glacier ice, front-lit by the sun behind the viewer: white tops and faces, blue in the cracks, a dirt band,
    // an older notch tilted where the berg has turned, and the dark notch the sea cuts at the waterline
    vec4 nz=textureLod(uN,pxz*.09+.3,0.);
    n=normalize(n+vec3(nz.g-.5,0.,nz.b-.5)*.22);
    float y=hp.y, steep=1.-smoothstep(.35,.8,n.y);
    float k=textureLod(uN,vec2((pxz.x+pxz.y)*.3,y*.015),0.).r;
    vec3 alb=vec3(.80,.84,.88)*(.92+.16*nz.a);
    alb=mix(alb,vec3(.34,.54,.72),steep*smoothstep(.58,.68,k));
    alb*=1.-.25*sdn(.6,.15,abs(y-5.-8.*(k-.5)))*steep;
    alb=mix(alb,alb*vec3(.45,.56,.66),sdn(.75,.2,y+.4*(nz.r-.5)));
    float sh=max(dot(n,uS.xyz),0.);
    float dn=mix(.55,1.,.5+.5*n.y);
    vec3 iam=mix(uHC.rgb,uZC.rgb*vec3(.7,.95,1.3),.45+.4*(1.-sh));
    col=alb*(iam*.5*dn+uSC.rgb*uS.w*1.55*sh);
  } else {
    float v=infH.x, pr=infH.y;
    float macroH=hh0-(rel>0.?.03:0.);
    // a stride-wide band of wet stones above the water, near black and glossy; dry stones above it a step lighter
    float wet=1.-smoothstep(.1,.25,macroH+.08*(textureLod(uN,pxz*.4,0.).g-.5));
    vec3 stone=mix(vec3(.032,.031,.032),vec3(.1,.092,.084),v*v*v);
    if(infH.z>.982) stone=mix(stone,vec3(.2,.17,.14),.8); // a pale granite erratic
    else if(infH.z>.972) stone=mix(stone,vec3(.12,.075,.055),.6); // red sandstone
    else if(infH.z>.89) stone=mix(stone,vec3(.12,.112,.10),.75);
    float mott=textureLod(uN,pxz*3.,0.).a;
    stone*=(.62+.8*mott)*(.68+.64*textureLod(uN,pxz*17.,0.).r);
    float pale=textureLod(uN,pxz*.08+.2,0.).b; // long dry patches and the old drift lines
    stone*=mix(.85,1.18,smoothstep(.46,.62,pale));
    // a pale salt bloom on the dry tops
    stone+=vec3(.05,.05,.048)*smoothstep(.55,.8,textureLod(uN,pxz*6.+.5,0.).g)*pr*(1.-wet)*rel;
    if(rel<1.){ float lod=1.-rel; vec3 far=vec3(.05,.05,.052)*(mix(.62,1.25,textureLod(uN,pxz*.21,0.).r)); stone=mix(stone,far,lod); }
    stone*=mix(1.,.4,wet);
    float irrA=.5+.5*n.y;
    // everything the sun does not strike is lit by the fog and the clearing sky: a cool blue-grey
    vec3 amb=mix(uHC.rgb,uZC.rgb,.6);
    vec3 irr=amb*mix(.16,.46,irrA*irrA);
    float ao=rel>0.?(pr<.01?.32:mix(.5,1.,smoothstep(0.,.72,pr))):.78;
    irr*=ao;
    // the warm key: the low sun behind the viewer on every face that looks back at us, shadowed by the stones behind
    float uw=smoothstep(.0,-.1,macroH);
    irr+=uSC.rgb*vec3(1.,.9,.74)*uS.w*2.7*max(dot(n,uS.xyz)+.06,0.)*shd*(1.-.35*wet)*(1.-.7*uw);
    col=stone*irr;
    // the wet stones reflect the white sky; the dry ones are matt, and no stone's rim runs to a white line
    vec3 nn=normalize(n+(vec3(textureLod(uN,pxz*7.,0.).r,0.,textureLod(uN,pxz*7.+.4,0.).g)-.5)*.1);
    vec3 v2=-rd; float cs=max(dot(n,v2),0.);
    float f=mix(.035,mix(.09,.5,wet),pow(1.-cs,5.))*(pr<.005?1.:smoothstep(0.,.4,pr))*(1.-uw); // under water: no sky on the stones
    vec3 rf=reflect(rd,nn); rf.y=abs(rf.y);
    float gls=mix(.25,1.25,fract(infH.z*37.)*.7+wet*.5);
    col+=envSky(rf)*f*mix(.5,1.,wet)*(.4+.6*ao)*(.6+.8*mott)*gls;
    // wet stones just above the water flash single hard points of the sun
    col+=uSC.rgb*uS.w*6.*pow(max(dot(reflect(rd,nn),uS.xyz),0.),180.)*wet*(1.-uw)*shd*step(.5,pr);
#if BEACH
    if(infH.w>1.5){
      // a lump of clear glacier ice stranded on the black stones: dark where the stones show through, a frosted core,
      // the white sky lying on its curves
      vec3 body=mix(vec3(.03,.05,.07),vec3(.3,.38,.43),.08+.5*pr*(.4+.9*mott))*(uHC.rgb*.7+uSC.rgb*uS.w*1.2*max(dot(n,uS.xyz),0.)*shd);
      col=body*mix(vec3(.75,.9,1.),vec3(1.),pr)+envSky(rf)*mix(.04,.5,pow(1.-cs,3.))*(.4+.6*smoothstep(0.,.3,pr));
    }
    vec4 bz=textureLod(uN,pxz*.11+.37,0.);
    if(uBe.y>.5){ // old snow lying among the stones on the higher ground
      float sn=smoothstep(.46,.52,bz.g+.16*smoothstep(.3,1.2,macroH)-.1*pr)*smoothstep(.18,.36,macroH);
      vec3 sa=vec3(.74,.75,.77)*(.8+.3*mott); // grey with blown grit, a dark melt edge
      col=mix(col,sa*(amb*mix(.45,.8,.5+.5*n.y)+uSC.rgb*uS.w*1.1*max(dot(n,uS.xyz),0.)*shd),sn)*(1.-.3*sn*(1.-sn)*4.);
    }
    if(uBe.z>.5){ // the wrack line the last high water left: kelp drying black-brown along one contour
      float kl=sdn(.26,.08,abs(macroH-.42-.16*(bz.r-.5)))*smoothstep(.3,.42,bz.b);
      col=mix(col,vec3(.07,.045,.018)*(.5+.9*mott)*(amb*.6+uSC.rgb*uS.w*1.2*max(dot(n,uS.xyz),0.))+envSky(rf)*.08*mott,kl);
    }
#endif
  }
  o=vec4(col,1./(t+1.));
}`,he=e=>Vt+"#define SEAICE "+e+`
`+fe+`
uniform sampler2D uA,uRf,uN,uB;
uniform vec4 uCam,uFw,uRt,uUp,uTm,uS,uSC,uHC,uZC,uFC,uFg,uAnti,uBow,uDeep,uSea;
in vec2 vUv; layout(location=0) out vec4 o;
float od(vec3 ro,vec3 rd,float L){
  float y0=clamp(ro.y,0.,500.),dy=rd.y; float k0=uFg.x,H0=uFg.y,k1=uFg.z,H1=uFg.w;
  if(abs(dy)<.0015) return (k0*exp(-y0/H0)+k1*exp(-y0/H1))*L;
  float y1=max(y0+dy*L,0.);
  return max(k0*H0*(exp(-y0/H0)-exp(-y1/H0))/dy,0.)+max(k1*H1*(exp(-y0/H1)-exp(-y1/H1))/dy,0.);
}
vec3 air(vec3 d){
  float h=max(d.y,0.), cs=max(dot(d,uS.xyz),0.);
  vec3 c=mix(uHC.rgb,uZC.rgb,pow(h,.68));
  c+=uSC.rgb*uS.w*(.09*pow(cs,8.)+.16*pow(cs,60.)+.28*pow(cs,700.));
  return c;
}
// the fog's in-scatter: the ambient, warming toward the sun's side
vec3 ins(vec3 d){
  float c1=dot(d,uS.xyz), cs=max(c1,0.);
  vec3 f=uFC.rgb*mix(vec3(1.),uSC.rgb,uFC.w*(.5+.5*c1));
  return f*(.95+.36*cs*cs+.16*pow(cs,14.))*uTm.z+uSC.rgb*uS.w*.09*pow(cs,40.);
}
vec3 bow(vec3 d){
  float th=acos(clamp(dot(d,uAnti.xyz),-1.,1.));
  float u=(th-uBow.y)/uBow.z;
  return textureLod(uB,vec2(u,.5),0.).rgb;
}
// banks and streamers of the thinning fog: long level bands that drift and part; 0 a gap, 1 a thick near bank
float bank(vec3 d,float t){
  vec2 dd=d.xz/(abs(d.x)+abs(d.z)+1e-5);
  vec2 bq=vec2(dd.x*.23+dd.y*.09+t*.0019,max(d.y,-.05)*.9+t*.0003);
  vec4 b=textureLod(uN,bq,1.);
  return smoothstep(.28,.74,b.g*.8+b.r*.2+(.05-.3*max(d.y,0.)));
}
// the bow is made in the nearest few hundred metres of fog: its weight saturates, so the crown keeps up with the feet
float bw(float tau){ return uBow.x*(1.-exp(-max(tau-.025,0.)*uBow.w)); }
float lapH(vec2 q,float t){
  return uDeep.w*(.55*sin(q.x*.21+q.y*.08-t*.55)+.32*sin(q.y*.37-q.x*.13-t*.41+1.9)+.2*sin(q.y*.9+q.x*.71-t*1.13));
}
// sets of small waves running up the stones: a slow noise speeds and stalls their clock, and each has its own size
vec3 swash(float z,float t){
  float ph=t*.15+3.2*textureLod(uN,vec2(t*.0017,.71),0.).r-z*.045;
  float k=floor(ph), f=ph-k;
  float A=fract(sin(k*91.7+3.1)*43758.5453); A=.25+.75*A*A;
  float up=smoothstep(0.,.2,f);
  float dr=exp(-max(f-.2,0.)*3.2);
  return vec3(A*up*dr,A*up,dr);
}
// a slow swell in three long trains, as slopes (deep-water periods 6.9, 5.4 and 8.9 s)
vec2 swell(vec2 q,float t){
  vec2 d1=vec2(.93,.37),d2=vec2(.6,.8),d3=vec2(.99,-.14);
  return uSea.x*(d1*.6*cos(dot(q,d1)*.085-t*.913+1.3)+d2*.35*cos(dot(q,d2)*.14-t*1.17+4.1)+d3*.4*cos(dot(q,d3)*.05-t*.70+.2));
}
void main(){
  vec2 s=vUv*2.-1.;
  vec3 rd=normalize(uFw.xyz+s.x*uUp.w*uRt.xyz+s.y*uUp.w*uUp.xyz), E=uCam.xyz;
  float tt=uTm.x;
  vec4 a=texture(uA,vUv);
  float d=1./max(a.a,1e-5)-1.; bool sky=d>1.5e4;
  vec3 hp=E+rd*d;
  vec2 dsk=rd.xz/(abs(rd.y)+.22);
  float nf=texture(uN,dsk*.08+vec2(.0014,.0009)*tt).r;
  float nf2=texture(uN,dsk*.031+vec2(-.0007,.0011)*tt+.3).g;
  float fm=(mix(.62,1.42,nf)+mix(.8,1.25,nf2)-1.)*(1.+uTm.y);
  float bk=bank(rd,tt); fm*=mix(1.-.35*uTm.w,1.+.2*uTm.w,bk);
  vec3 col;
  float L=0.,Lpk=0.,Lc,dry=0.; vec3 sw=vec3(0.);
  bool water=false; float tw=0.;
  if(rd.y<-.0002){
    vec2 q=(sky?E:hp).xz; sw=swash(q.y,tt); float lb=lapH(q,tt);
    L=lb+.05*sw.x; Lpk=lb+.05*sw.y; dry=sw.z;
    tw=(L-E.y)/rd.y; water=sky||hp.y<L+.0015;
  }
  Lc=water?tw:(sky?2e4:d);
  // a bank standing off the shore leaves the first uSea.z metres clear
  float c0=min(uSea.z,Lc);
  float tau=od(E+rd*c0,rd,Lc-c0)*fm, tauB=tau;
  if(water){
    vec3 pw=E+rd*tw;
    float dl=clamp(tw*.018,0.,1.);
    vec2 q0=pw.xz;
    float u=pw.x*uSp2.x-WL(pw.z);
    // cat's paws: long level bars where a breath of air roughens the glass, dull and a tone darker
    float cp=smoothstep(.52,.7,textureLod(uN,vec2(q0.x*.006,q0.y*.013)+vec2(.0011,.0004)*tt,0.).r)*smoothstep(.45,.62,textureLod(uN,vec2(q0.x*.011,q0.y*.02)+vec2(-.0006,.0009)*tt+.5,0.).b)*sdn(55.,14.,tw);
    vec2 g=swell(q0,tt)*(1.-dl*.5);
    float lp=exp(min(u,0.)*.6)*sdn(0.,-3.,u)*.12*sin(u*5.5-sw.y*9.)*sw.x;
    vec3 n=normalize(vec3(g.x+lp*uSp2.x,1.,g.y));
    float cs=max(dot(-rd,n),.02);
    float F=(.09+.91*pow(1.-cs,3.4))*(1.-.22*cp);
    vec3 r=reflect(rd,n); r.y=abs(r.y)+.0015;
    r=normalize(r);
    float sS=sin(q0.x*.045+q0.y*.012-tt*.21)+.6*sin(q0.x*.11-q0.y*.03-tt*.33+2.);
    vec2 ruv=clamp(vUv+n.xz*.5*(1.-dl*.7)+vec2(0.,.0035*sS*dl*(1.-.7*cp)),.002,.998);
    vec4 rf=textureLod(uRf,ruv,0.);
    float dr=1./max(rf.a,1e-5)-1.;
    vec3 refl=air(r); float trf=od(pw,r,dr>1.5e4?2e4:max(dr-tw,0.))*fm;
    if(dr<1.5e4) refl=rf.rgb;
    refl=mix(refl,ins(r),1.-exp(-trf));
    refl+=bow(r)*bw(trf)*.85*(1.-.85*cp)*mix(.3,1.15,bk)*smoothstep(.2,.03,-rd.y);
    refl=mix(refl,ins(r)*.9,cp*.5);
    // the shallows: the stones show through the first hand's depth, greenish, under the fog's white
    float depth=sky?4.:max(d-tw,0.), vdep=sky?4.:max(L-hp.y,0.);
    float tr=exp(-vdep*2.4-depth*.25);
    vec3 body=mix(uDeep.rgb,a.rgb*vec3(.62,.84,.74)+uDeep.rgb*vec3(.05,.12,.1),sky?0.:tr);
    col=body*(1.-F)+refl*F;
#if SEAICE
    if(uSea.y>.5){
      // brash: broken lumps gathered in wind rows; new ice: grey plates of nilas parted by black leads. Both drift slowly.
      bool pk=uSea.y>1.5;
      vec2 qd=q0+vec2(.21,.09)*tt;
      float fw=tw*uSea.w/max(-rd.y,.01);
      vec4 n1=textureLod(uN,qd*(pk?.006:.05)*vec2(1.,2.2),0.), n2=textureLod(uN,qd*(pk?.021:.31)+.3,0.);
      float on, sh;
      if(pk){
        float ld=abs(n2.r-.5)+.05*smoothstep(.3,3.,fw);
        on=smoothstep(.3,.36,n1.g)*smoothstep(.025,.045,ld);
        sh=.36+.1*n2.b+.14*(1.-smoothstep(.045,.08,ld));
      } else {
        float row=smoothstep(.45,.6,n1.r);
        vec4 n3=textureLod(uN,qd*.83+.6,0.);
        float lv=n3.g+.3*(n2.g-.5);
        float uwi=smoothstep(.5-.1*row,.6-.1*row,lv)*row;
        on=smoothstep(.62-.1*row,.65-.1*row,lv+.12*(n3.a-.5))*row;
        uwi=mix(uwi,row*.25,smoothstep(.08,.5,fw*3.)); on=mix(on,row*.12,smoothstep(.08,.5,fw*3.));
        col=mix(col,vec3(.22,.36,.33)*uHC.rgb*.9,uwi*.6*sdn(-.6,-1.6,u)); // the drowned part, green under the glass
        sh=.66+.26*n3.a;
      }
      vec3 ic=vec3(sh,sh*1.05,sh*1.12)*(uHC.rgb*.8+uSC.rgb*uS.w*.6);
      col=mix(col,ic,on*sdn(-.6,-1.6,u));
    }
#endif
  } else if(sky){
    col=air(rd);
    float an=acos(clamp(dot(rd,uS.xyz),-1.,1.));
    float disc=sdn(uSC.w*1.25,uSC.w*.8,an);
    col+=uSC.rgb*uS.w*disc*.9;
    tauB=tau;
    if(rd.y>0.) tau*=mix(1.,.72-.55*uTm.w*(1.-.5*bk),smoothstep(.1,.62,rd.y)); // thicker low than high: the sky opens overhead
    col=mix(col,ins(rd),1.-exp(-tau));
    if(rd.y>0.&&disc>0.) col=mix(col,uSC.rgb*1.15+col*.3,disc*min(1.,exp(-tau*.5)+.32));
  } else {
    col=a.rgb;
    if(rd.y<-.0002&&hp.y<Lpk+.5){
      // the wet edge, and the film a wave leaves as it drains back
      float wk=sdn(L+.085,L+.012,hp.y), fl=sdn(Lpk+.006,Lpk-.004,hp.y)*(1.-wk)*dry;
      col*=1.-.26*wk-.3*fl; col+=uHC.rgb*(.05*wk*wk+.03*fl);
    }
    // the far hills' feet are buried in the low fog
    tau+=3.*sdn(.035,0.,rd.y)*step(1800.,d);
  }
  bool skyB=sky&&!water;
  if(!skyB) col=mix(col,ins(rd),1.-exp(-tau));
  // strong where a bank is thick and near, weak or gone where a gap passes
  col+=bow(rd)*bw(tauB)*(.75+.3*nf2)*mix(.58,1.25,bk)*smoothstep(8.,90.,Lc);
  if(skyB) col*=1.+.08*(nf-.5)+.06*(bk-.5);
  col=pow(max(col,vec3(0.)),vec3(.4545));
  o=vec4(col,1.);
}`,Ie=Vt+`
uniform sampler2D uA; uniform vec4 uG;
in vec2 vUv; layout(location=0) out vec4 o;
void main(){
  vec3 c=texture(uA,vUv).rgb;
  uvec2 v=uvec2(gl_FragCoord.xy)+uvec2(uint(uG.x*97.)); v=v*1597334677u+v.yx*3812015801u; v=(v^(v.yx>>9u))*2654435761u; float n=float(v.x>>8u)/16777216.-.5;
  o=vec4(c+n*uG.y,1.);
}`,de=(e,o,r)=>{const a=t.createShader(e);return t.shaderSource(a,o),t.compileShader(a),a._tag=r,a},M=t.__c633||(t.__c633=(()=>{const e={},o=(i,R,h)=>{const S=t.createProgram();t.attachShader(S,de(t.VERTEX_SHADER,R,i+" vs")),t.attachShader(S,de(t.FRAGMENT_SHADER,h,i+" fs")),t.linkProgram(S),e[i]=S};o("scene0",kt,ue(0)),o("comp0",kt,he(0)),o("blit",kt,Ie),t.flush();const r=256,a=new Uint8Array(r*r*4);let s=5683;const m=()=>{s=s+1831565813|0;let i=Math.imul(s^s>>>15,1|s);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296};for(let i=0;i<4;i++){const R=new Float32Array(r*r);let h=1,S=0;for(let b=i===3?5:2;b<=(i===3?7:6);b++){const p=1<<b,T=new Float32Array(p*p);for(let c=0;c<p*p;c++)T[c]=m();const n=r/p;for(let c=0;c<r;c++)for(let d=0;d<r;d++){const A=d/n,u=c/n,E=A|0,C=u|0;let I=A-E,X=u-C;I=I*I*(3-2*I),X=X*X*(3-2*X);const Y=T[C%p*p+E%p],Q=T[C%p*p+(E+1)%p],O=T[(C+1)%p*p+E%p],ht=T[(C+1)%p*p+(E+1)%p];R[c*r+d]+=h*(Y+(Q-Y)*I+(O-Y)*X+(Y-Q-O+ht)*I*X)}S+=h,h*=.55}for(let b=0;b<r*r;b++)a[b*4+i]=U(R[b]/S,0,1)*255}const l=t.createTexture();t.bindTexture(t.TEXTURE_2D,l),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,r,r,0,t.RGBA,t.UNSIGNED_BYTE,a),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const z=1901,F=new Float32Array(z);{let i=1,R=-Math.sqrt(8),h=-.02,S=8;const b=(T,n)=>T*n;for(let T=z-1;T>=0;T--){F[T]=i;const n=R,c=b(S,i),d=R+.5*h*c,A=b(S+.5*h,i+.5*h*n),u=R+.5*h*A,E=b(S+.5*h,i+.5*h*d),C=R+h*E,I=b(S+h,i+h*u);i+=h/6*(n+2*d+2*u+C),R+=h/6*(c+2*A+2*E+I),S+=h}const p=.35502805/F[Math.round(30/.02)];for(let T=0;T<z;T++)F[T]*=p}const B=t.createVertexArray();return{nTex:l,PR:e,prog:o,qVao:B,ai:F,checked:new Set,ul:new Map}})()),jt=Nt==="Bare shingle"?"scene0":"scene1",Zt=xt==="Brash ice"||xt==="A skin of new ice"?"comp1":"comp0";M.PR[jt]||M.prog(jt,kt,ue(1)),M.PR[Zt]||M.prog(Zt,kt,he(1)),t.flush();const f=(e,o)=>{let r=M.ul.get(e);r||(r=new Map,M.ul.set(e,r));let a=r.get(o);return a===void 0&&(a=t.getUniformLocation(e,o),r.set(o,a)),a},yt=26*w,Kt=50*w,Xe=(()=>{const o=new Float32Array(768),r=M.ai,a=n=>{const c=(n+30)/.02;if(c<=0)return r[0];if(c>=r.length-1)return 0;const d=c|0,A=c-d;return r[d]*(1-A)+r[d+1]*A},s=n=>1.3199+6878/(n*n)-1132e6/(n*n*n*n)+111e12/(n*n*n*n*n*n),m=[430,465,495,525,555,585,615,645,680],l=(n,c,d)=>Math.exp(-Math.pow((n-c)/d,2)),z=Tt[0],F=Tt[1];for(const n of m){const c=s(n),d=Math.sqrt((4-c*c)/3),A=4*Math.asin(d/c)-2*Math.asin(d),u=O=>4*Math.asin(O/c)-2*Math.asin(O),E=.002,C=Math.abs((u(d+E)-2*u(d)+u(d-E))/(E*E)),I=Math.cbrt(2/C),X=l(n,600,48),Y=l(n,542,44),Q=l(n,452,38);for(let O=-3;O<=3;O++){const ht=O*.75,Ht=z*Math.exp(ht*F),oe=2*Math.PI*Ht*1e3/n,y=Math.exp(-ht*ht/2)*Math.pow(Ht,7/3)/Math.cbrt(n),Z=Math.pow(oe,2/3)*I;for(let N=0;N<256;N++){const K=yt+(Kt-yt)*N/255,W=a((K-A)*Z),G=W*W*y;o[N*3]+=G*X,o[N*3+1]+=G*Y,o[N*3+2]+=G*Q}}}let B=0,i=0,R=0;for(const n of m)B+=l(n,600,48),i+=l(n,542,44),R+=l(n,452,38);let h=0,S=0;for(let n=0;n<256;n++){o[n*3]/=B,o[n*3+1]/=i,o[n*3+2]/=R;const c=o[n*3]*.3+o[n*3+1]*.55+o[n*3+2]*.15;c>h&&(h=c,S=n)}{let n=S;const c=u=>o[u*3]*.3+o[u*3+1]*.55+o[u*3+2]*.15;for(;n>1&&c(n-1)<c(n);)n--;let d=0;for(let u=0;u<n;u++)d=Math.max(d,c(u));const A=d>.28*h?.28*h/d:1;for(let u=0;u<n;u++){const E=A+(1-A)*j(n-6,n,u);o[u*3]*=E,o[u*3+1]*=E,o[u*3+2]*=E}}const b=new Uint8Array(256*4),p=Tt[3];for(let n=0;n<256;n++){let c=o[n*3]/h,d=o[n*3+1]/h,A=o[n*3+2]/h;const u=c*.3+d*.55+A*.15;c=u+(c-u)*p,d=u+(d-u)*p,A=u+(A-u)*p;const E=yt+(Kt-yt)*n/255,C=j(44*w,26*w,E)*.07;b[n*4]=U(c+C,0,1)*255,b[n*4+1]=U(d+C,0,1)*255,b[n*4+2]=U(A+C,0,1)*255,b[n*4+3]=255}const T=t.createTexture();return t.bindTexture(t.TEXTURE_2D,T),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,1,0,t.RGBA,t.UNSIGNED_BYTE,b),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),T})(),me=t.createTexture();t.bindTexture(t.TEXTURE_2D,me),t.pixelStorei(t.UNPACK_ALIGNMENT,2),t.texImage2D(t.TEXTURE_2D,0,t.R16F,D,D,0,t.RED,t.HALF_FLOAT,null);for(const[e,o]of Wt)t.texSubImage2D(t.TEXTURE_2D,0,e%32*64,(e/32|0)*64,64,64,t.RED,t.HALF_FLOAT,o);t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const pe=!!t.getExtension("EXT_color_buffer_float");t.getExtension("EXT_color_buffer_half_float");const xe=pe?t.RGBA16F:t.RGBA8,we=pe?t.HALF_FLOAT:t.UNSIGNED_BYTE,Jt=(e,o,r,a,s)=>{const m=t.createTexture();t.bindTexture(t.TEXTURE_2D,m),t.texImage2D(t.TEXTURE_2D,0,r,e,o,0,t.RGBA,a,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const l=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,l),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,m,0),{t:m,f:l,w:e,h:o}},ve=Jt(V,V,xe,we,t.NEAREST),ge=Math.max(128,V/2|0),ye=Jt(ge,ge,xe,we,t.LINEAR),be=Jt(V,V,t.RGBA8,t.UNSIGNED_BYTE,t.LINEAR),ft=(e,o,r)=>{t.activeTexture(t.TEXTURE0+o),t.bindTexture(t.TEXTURE_2D,r),t.uniform1i(e,o)},Ee=()=>{t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.depthMask(!1)},Ge={yaw:0,pitch:0,x:0,y:0,z:0};let x=null,Te="",Ct=!0;const Oe=(e,o)=>[e[1]*o[2]-e[2]*o[1],e[2]*o[0]-e[0]*o[2],e[0]*o[1]-e[1]*o[0]],Ae=()=>{const e=_.view||Ge,o=[e.yaw||0,e.pitch||0,e.x||0,e.y||0,e.z||0].join(",");if(o===Te)return;Te=o,Ct=!0;const r=L+(e.yaw||0),a=U(ct+(e.pitch||0),-1.3,1.3),s=Math.cos(a),m=Math.sin(a),l=Math.cos(r),z=Math.sin(r),F=[z*s,m,l*s],B=[l,0,-z],i=Oe(F,B),R=at+(e.x||0)*l+(e.z||0)*z,h=Gt-(e.x||0)*z+(e.z||0)*l;x={fw:F,rt:B,up:i,pos:[R,Math.max(Be(R,h),.12)+it+(e.y||0),h]}},Yt=[1,.95-.18*Pt,.86-.34*Pt],We={Morning:.18,"Very low":.3,Higher:.05,"Midnight sun":.5}[Rt],Ve=1.6,Qt=[xt==="A long low swell"?.014:.003,xt==="Brash ice"?1:xt==="A skin of new ice"?2:0,Ue],Ut=[Nt==="Stranded ice"?1:0,Nt==="Old snow"?1:0,Nt==="A kelp wrack line"?1:0,0],ke=e=>{t.uniform4f(f(e,"uSC"),Yt[0],Yt[1],Yt[2],.016),t.uniform4f(f(e,"uS"),vt[0],vt[1],vt[2],.62+.3*Pt),t.uniform4f(f(e,"uHC"),v[1][0],v[1][1],v[1][2],0),t.uniform4f(f(e,"uZC"),v[2][0],v[2][1],v[2][2],0),t.uniform4f(f(e,"uSp"),H[0],H[1],H[2],H[3]),t.uniform4f(f(e,"uSp2"),k,At*0+At,_t,lt)},je=7;let ut=0;const Ze=e=>[(e+.5)*.7548776662%1-.5,(e+.5)*.569840291%1-.5],Me=(e,o,r,a)=>{const s=M.PR[jt];t.useProgram(s),t.bindFramebuffer(t.FRAMEBUFFER,e.f),t.viewport(0,0,e.w,e.h),ke(s),t.uniform4f(f(s,"uCam"),x.pos[0],x.pos[1],x.pos[2],0),t.uniform4f(f(s,"uFw"),x.fw[0],x.fw[1],x.fw[2],0),t.uniform4f(f(s,"uRt"),x.rt[0],x.rt[1],x.rt[2],0),t.uniform4f(f(s,"uUp"),x.up[0],x.up[1],x.up[2],Xt),t.uniform4f(f(s,"uJ"),o*2/e.w,r*2/e.h,a?1:0,r*.42),t.uniform4f(f(s,"uFar"),It,Math.sin(.38)*.96*k,.82,.42),t.uniform4f(f(s,"uLp"),3,1,176,48),t.uniform4f(f(s,"uBe"),Ut[0],Ut[1],Ut[2],Ut[3]),ft(f(s,"uN"),0,M.nTex),ft(f(s,"uMap"),1,me),t.bindVertexArray(M.qVao),t.drawArrays(t.TRIANGLES,0,3)},$t=()=>{Ee();const e=Ze(ut);ut===0&&Me(ye,0,0,!0),ut>0&&(t.enable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.CONSTANT_ALPHA,t.ONE_MINUS_CONSTANT_ALPHA),t.blendColor(0,0,0,1/(ut+1))),Me(ve,e[0],e[1],!1),t.disable(t.BLEND),t.flush(),ut++};for(const e in M.PR)M.checked.has(e)||(M.checked.add(e),t.getProgramParameter(M.PR[e],t.LINK_STATUS));Ae(),$t(),Ct=!1,t.bindFramebuffer(t.FRAMEBUFFER,null);const Re=$()*40,Se=e=>(Math.sin(e*.083+1.1)+.6*Math.sin(e*.041+.3))/1.6*wt[4];let te=Re;for(let e=0;e<40&&Se(4+te)<.1*wt[4];e++)te+=3.7;const ee=[v[0][0]*.135,v[0][1]*.155,v[0][2]*.16];return(e,o)=>{Ae(),Ct?(Ct=!1,ut=0,$t()):ut<je&&$t();const r=e+Re;Ee(),t.bindFramebuffer(t.FRAMEBUFFER,be.f),t.viewport(0,0,V,V);const a=M.PR[Zt];t.useProgram(a),ke(a);const s=Se(e+te);t.uniform4f(f(a,"uFC"),v[0][0],v[0][1],v[0][2],We),t.uniform4f(f(a,"uSea"),Qt[0],Qt[1],Qt[2],2*Xt/V),t.uniform4f(f(a,"uFg"),wt[0],wt[1],wt[2],wt[3]),t.uniform4f(f(a,"uTm"),r,s,1,He),t.uniform4f(f(a,"uCam"),x.pos[0],x.pos[1],x.pos[2],0),t.uniform4f(f(a,"uFw"),x.fw[0],x.fw[1],x.fw[2],0),t.uniform4f(f(a,"uRt"),x.rt[0],x.rt[1],x.rt[2],0),t.uniform4f(f(a,"uUp"),x.up[0],x.up[1],x.up[2],Xt),t.uniform4f(f(a,"uAnti"),Ot[0],Ot[1],Ot[2],0),t.uniform4f(f(a,"uBow"),Tt[2]*Ve,yt,Kt-yt,5),t.uniform4f(f(a,"uDeep"),ee[0],ee[1],ee[2],xt==="A long low swell"?.075:.045),ft(f(a,"uA"),0,ve.t),ft(f(a,"uRf"),1,ye.t),ft(f(a,"uN"),2,M.nTex),ft(f(a,"uB"),3,Xe),t.bindVertexArray(M.qVao),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,V,V);const m=M.PR.blit;t.useProgram(m),ft(f(m,"uA"),0,be.t),t.uniform4f(f(m,"uG"),e%7.13,.009,0,0),t.bindVertexArray(M.qVao),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
