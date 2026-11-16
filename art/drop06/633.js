// Fog Bow: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/633.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(nt){nt&&nt.add({num:633,name:"Fog Bow",fam:"Vistas",recipe:"A shingle spit on the Svalbard coast as the sea fog thins, with a huge white fogbow on the fog bank, grey water lapping the stones and broken icebergs half lost in the white. How high the sun is, the fog, the bow, the spit, what's standing in the fog, where you stand and the sea change every mint. Nothing to press, just watch the water creep up the stones.",gl:!0,music:!1,fps:30,seed:0,make(z){const e=z.gl,j=z.size,U=!!z.home;let J=6503182;for(let t=2;t<66;t+=8)J=Math.imul(J^parseInt(z.hash.slice(t,t+8),16),2246822507)^J>>>13;const Q=()=>{J=J+1831565813|0;let t=Math.imul(J^J>>>15,1|J);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<8;t++)Q();const me=t=>{let o=0;for(const n in t)o+=t[n];let a=Q()*o;for(const n in t)if(a-=t[n],a<0)return n;return Object.keys(t)[0]},g=Math.PI/180,B=(t,o,a)=>t<o?o:t>a?a:t,Z=(t,o,a)=>{const n=B((a-t)/(o-t),0,1);return n*n*(3-2*n)},Se=z.trait("Sun",U?"Morning":me({Morning:40,"Very low":28,Higher:24,"Midnight sun":8})),$=z.trait("Fog",U?"Thinning":me({Thinning:40,Thick:26,"Lying low":22,"Nearly gone":12})),Ct=z.trait("Bow",U?"Broad and white":me({"Broad and white":40,"A second band inside":26,"Faintly coloured":24,"Wide and pale":10})),ze=z.trait("In the fog",U?"A few bergs":me({"A few bergs":36,"One great berg":26,Growlers:22,"A far headland":16})),Ut=z.trait("Spit",U?"Running away right":me({"Running away right":40,"Running away left":26,"A low bar":20,"A wide beach":14})),Ne=z.trait("Light",U?"Pearl":me({Pearl:40,Pewter:28,"Cold blue":20,"Faint rose":12}));let ee=6502929;for(let t=2;t<66;t+=8)ee=Math.imul(ee^parseInt(z.hash.slice(t,t+8),16),2654435761)^ee>>>15;const st=()=>{ee=ee+1831565813|0;let t=Math.imul(ee^ee>>>15,1|ee);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<6;t++)st();const qe=t=>{let o=0;for(const n in t)o+=t[n];let a=st()*o;for(const n in t)if(a-=t[n],a<0)return n;return Object.keys(t)[0]};let pe=U?"On the spit":qe({"On the spit":50,"At the water's edge":18,"On the storm crest":14,"From the raised beach":11,"Facing open water":7});pe==="Facing open water"&&$==="Thick"&&(pe="At the water's edge");let te=6503469;for(let t=2;t<66;t+=8)te=Math.imul(te^parseInt(z.hash.slice(t,t+8),16),739982445)^te>>>14;const it=()=>{te=te+1831565813|0;let t=Math.imul(te^te>>>15,1|te);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<5;t++)it();{const t=it();!U&&pe==="On the spit"&&(pe=t<.2?"Down among the stones":t<.36?"Along the bow's foot":pe)}const oe=z.trait("Standpoint",pe),_e=z.trait("On the beach",U?"Bare shingle":qe({"Bare shingle":46,"Stranded ice":24,"Old snow":16,"A kelp wrack line":14})),xe=z.trait("Sea",U?"Glass":qe({Glass:46,"A long low swell":26,"Brash ice":18,"A skin of new ice":10})),De={Morning:10.5,"Very low":5,Higher:18,"Midnight sun":2.6}[Se]*g,Pe={Morning:.32,"Very low":.55,Higher:.12,"Midnight sun":.85}[Se],we={Thinning:[.0022,95,.0058,9,.13],Thick:[.006,150,.026,22,.06],"Lying low":[6e-4,60,.03,32,.1],"Nearly gone":[9e-4,80,.0042,10,.14]}[$],Bt=$==="Lying low"?120:0,Ht={Thinning:.6,Thick:0,"Lying low":.75,"Nearly gone":.9}[$],ke={"Broad and white":[15,.3,.17,.92],"A second band inside":[24,.13,.17,.95],"Faintly coloured":[36,.22,.16,.85],"Wide and pale":[9.5,.2,.22,.7]}[Ct];$==="Thick"&&(ke[2]*=.62);const y={Pearl:[[.6,.615,.635],[.7,.715,.735],[.43,.51,.63]],Pewter:[[.455,.475,.5],[.53,.55,.57],[.33,.38,.46]],"Cold blue":[[.5,.555,.63],[.58,.635,.7],[.33,.45,.66]],"Faint rose":[[.64,.61,.615],[.75,.71,.71],[.47,.5,.62]]}[Ne];if(Ne==="Cold blue"&&(y[0]=[.44,.53,.66],y[2]=[.22,.38,.72]),Ne==="Faint rose"&&(y[0]=[.7,.6,.6],y[1]=[.8,.7,.69]),Ne==="Pewter")for(let t=0;t<3;t++)y[0][t]*=.9;if($==="Thick")for(let t=0;t<2;t++)for(let o=0;o<3;o++)y[t][o]*=.8;$==="Nearly gone"&&(y[2]=[y[2][0]*.62,y[2][1]*.78,y[2][2]*1.02]);{const t={Morning:[1,1,1],"Very low":[1.03,.99,.95],Higher:[.99,1,1.02],"Midnight sun":[1.1,.95,.82]}[Se];for(let o=0;o<2;o++)for(let a=0;a<3;a++)y[o][a]*=t[a];for(let o=0;o<3;o++)y[2][o]*=.5+.5*t[o]}const H={"Running away right":[-2.7,.29,7.5,.82,1],"Running away left":[-2.6,.26,7,.8,-1],"A low bar":[-2.9,.16,3.6,.55,1],"A wide beach":[-2.2,.55,15,1.8,1]}[Ut];let Ie=ze==="A far headland"?1:U?.5:Q()<.5?.45:0;$==="Nearly gone"&&(Ie=Math.max(Ie,.85)),U||(H[0]+=(Q()-.5)*2.4,H[1]*=.72+Q()*.75,H[2]*=.75+Q()*.6,H[3]*=.8+Q()*.5);const Xe=Math.tan(37.5*g),A=H[4],se=t=>H[0]+H[1]*t+2.2*Math.sin(t*.047+.7)+.9*Math.sin(t*.16+1),ct=t=>{let o=H[2]*(1+-.5800000000000001*Z(0,220,t));return t<0&&(o+=o*1.6*Z(0,160,-t)),o},qt=t=>{let o=H[3]*Z(300,190,t);return t<0&&(o*=1+Z(0,200,-t)),o},Dt=(t,o)=>{const a=t*A-se(o),n=Math.max(ct(o),.6),i=(a-n)/n;return Math.max(qt(o)*(1-i*i)+Math.min(a,0)*.75+.16*B(a,-1,1),-2.4)};let ae=0,Ge=0,ie=1.55,L=0,ce=3.5*g,re=-7.5*g;oe==="At the water's edge"?(ae=A*(se(0)+.55),ie=.42,L=A*9*g,ce=10*g,re=L-A*4*g):oe==="On the storm crest"?(Ge=-6,ae=A*(se(-6)+ct(-6)),ie=1.6,L=A*(Math.atan(H[1])+3*g),ce=2.5*g,re=L-A*31*g):oe==="From the raised beach"?(Ge=-45,ae=A*(se(-45)+12),ie=8.5,L=-A*6*g,ce=-7*g,re=L):oe==="Facing open water"?(ae=A*(se(0)+.4),ie=1.05,L=-A*64*g,ce=4*g,re=L):oe==="Down among the stones"?(ae=A*(se(0)+.25),ie=.28,L=-A*2*g,ce=-6*g,re=L-A*6*g):oe==="Along the bow's foot"&&(ae=A*(se(0)+3.2),ie=1.5,re=-A*6*g,L=re-A*31*g,ce=6*g);const lt=re+Math.PI,ve=[Math.sin(lt)*Math.cos(De),Math.sin(De),Math.cos(lt)*Math.cos(De)],Oe=[-ve[0],-ve[1],-ve[2]],I=1536,Me=-700,Le=-460,le=1400,We=new Map,ft=new Float32Array(1),Pt=new Uint32Array(ft.buffer),It=t=>{ft[0]=t;const o=Pt[0],a=(o>>>23&255)-112;return a<=0?0:a>=31?31744:a<<10|o>>>13&1023},b=(()=>{let t=J^20973|0;return()=>{t=t+1831565813|0;let o=Math.imul(t^t>>>15,1|t);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}})(),to=(t,o,a)=>{let n=t*374761393+o*668265263+a*2147483647|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296},ge=(t,o,a)=>{const n=Math.floor(t),i=Math.floor(o),p=t-n,u=o-i,R=p*p*(3-2*p),F=u*u*(3-2*u),N=Math.imul(a,2147483647),s=Math.imul(n,374761393),E=Math.imul(n+1,374761393),f=Math.imul(i,668265263)+N|0,T=Math.imul(i+1,668265263)+N|0;let w=s+f|0,m=E+f|0,r=s+T|0,c=E+T|0;return w=Math.imul(w^w>>>13,1274126177),m=Math.imul(m^m>>>13,1274126177),r=Math.imul(r^r>>>13,1274126177),c=Math.imul(c^c>>>13,1274126177),(((w^w>>>16)>>>0)/4294967296*(1-R)+((m^m>>>16)>>>0)/4294967296*R)*(1-F)+(((r^r>>>16)>>>0)/4294967296*(1-R)+((c^c>>>16)>>>0)/4294967296*R)*F};let Fe=oe==="Facing open water"?L:0;const X=(t,o,a,n,i,p)=>{if(Fe){const M=Math.cos(Fe),C=Math.sin(Fe),P=t;t=B(P*M+o*C,-590,590),o=-P*C+o*M}const u=b()*1e6|0,R=Math.cos(b()*3),F=Math.sin(b()*3);let N=u^2654435769;const s=()=>{N=N+1831565813|0;let M=Math.imul(N^N>>>15,1|N);return M=M+Math.imul(M^M>>>7,61|M)^M,((M^M>>>14)>>>0)/4294967296};if(p<0){const M=s();p=M<.36?0:M<.7?1:2}const E=s()*6.283,f=Math.cos(E),T=Math.sin(E),w=.22+s()*.3,m=s()*6.283,r=Math.cos(m),c=Math.sin(m),l=.1+s()*.4,k=(s()-.5)*.6,d=(s()-.5)*.6,S=(s()-.5)*1.1,_=(s()-.5)*1.1,W=.45+s()*.35,G=p===3?.5:.28,O=4+(s()*3|0),Y=s()*6.283,q=Math.max(a,n)*1.5,ne=B((t-q-Me)/le*I|0,1,I-2),be=B((t+q-Me)/le*I|0,1,I-2),ot=B((o-q-Le)/le*I|0,1,I-2),at=B((o+q-Le)/le*I|0,1,I-2);for(let M=ot;M<=at;M++)for(let C=ne;C<=be;C++){const P=Me+(C+.5)/I*le-t,V=Le+(M+.5)/I*le-o,D=(P*R+V*F)/a,K=(-P*F+V*R)/n;if(D*D+K*K>1.75)continue;const Nt=Math.hypot(D,K);if(Nt>1.32)continue;const Ee=Nt+(ge(P*.022,V*.022,u+3)-.5)*.5+(ge(P*.08,V*.08,u+4)-.5)*.14;if(Ee>=1)continue;let He;if(p===0){const de=Math.atan2(K,D),Te=1+.07*Math.sin(de*O+Y)+.035*Math.sin(de*(O+3)+1.3);He=(.12*Z(1,.88,Ee)+.88*Math.pow(Math.max(1-Ee*Ee*Te,0),.75))*(1+.04*(ge(P*.06,V*.06,u+5)-.5))}else if(p===1){const de=D*f+K*T,Te=D*r+K*c;He=Z(1,.9,Ee)*B(.7+w*de-.3*Z(l,l+.08,Te),.15,1)+.05*(ge(P*.09,V*.09,u+5)-.5)}else{const de=Math.atan2(K,D),Te=1+.16*Math.sin(de*3+Y)+.09*Math.sin(de*5+O),Qt=Math.max(0,1-Math.hypot(D-k,K-d)*Te/.62),$t=Math.max(0,1-Math.hypot(D-S,K-_)*Te/.46),Ft=1+.12*(ge(P*.3,V*.3,u+6)-.5);He=Z(1,.88,Ee)*Math.max(G*B(1+.6*(D*f+K*T),.5,1.4),Math.pow(Qt,.55)*Ft,W*Math.pow($t,.55)*Ft)+.03*(ge(P*.18,V*.18,u+5)-.5)}const rt=It(i*Math.max(He,0));if(!rt)continue;const _t=(M>>6)*32+(C>>6);let Re=We.get(_t);Re||(Re=new Uint16Array(4096),We.set(_t,Re));const Lt=(M&63)*64+(C&63);rt>Re[Lt]&&(Re[Lt]=rt)}},Xt=()=>{if(ze==="A few bergs")if(U)X(-125,235,30,22,17,2),X(120,430,34,24,19,2),X(-330,520,62,36,21,0),X(-58,215,14,10,5,0);else{const t=3+(b()*2|0);for(let o=0;o<t;o++){const a=-420+b()*700,n=260+b()*340,i=26+b()*30,p=18+b()*18,u=8+b()*11;b(),X(a,n,i,p,u,-1)}}else if(ze==="One great berg")X(-90+b()*80*(b()<.5?1:-1),360+b()*70,92,54,34,3);else if(ze==="Growlers")for(let t=0;t<12;t++){const o=-1.05+b()*1.5,a=110+b()*340;X(Math.sin(o)*a,Math.cos(o)*a,7+b()*13,5+b()*8,2.5+b()*4,0)}if(Fe=0,oe==="Facing open water"){const t=Math.cos(L),o=Math.sin(L);for(let a=0;a<5;a++){const n=(b()-.5)*1.1,i=70+b()*160,p=Math.sin(n)*i,u=Math.cos(n)*i;X(ae+p*t+u*o,-p*o+u*t,4+b()*7,3+b()*5,1.6+b()*2.5,0)}}X(-175,40,40,26,14,1),X(235,95,46,30,18,2),X(180,-260,38,30,12,0),X(-280,-330,48,36,16,1)},Ae=`#version 300 es
precision highp float; precision highp int;
out vec2 vUv;
void main(){ vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2)); vUv=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,Ve=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,ut=`
uniform vec4 uSp,uSp2;
float sdn(float a,float b,float x){ return 1.-smoothstep(b,a,x); }
float WL(float z){ return uSp.x+uSp.y*z+2.2*sin(z*.047+.7)+.9*sin(z*.16+1.); }
`,ht=t=>Ve+"#define BEACH "+t+`
`+ut+`
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
}`,dt=t=>Ve+"#define SEAICE "+t+`
`+ut+`
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
}`,Gt=Ve+`
uniform sampler2D uA; uniform vec4 uG;
in vec2 vUv; layout(location=0) out vec4 o;
void main(){
  vec3 c=texture(uA,vUv).rgb;
  uvec2 v=uvec2(gl_FragCoord.xy)+uvec2(uint(uG.x*97.)); v=v*1597334677u+v.yx*3812015801u; v=(v^(v.yx>>9u))*2654435761u; float n=float(v.x>>8u)/16777216.-.5;
  o=vec4(c+n*uG.y,1.);
}`,mt=(t,o,a)=>{const n=e.createShader(t);return e.shaderSource(n,o),e.compileShader(n),n._tag=a,n},x=e.__c633||(e.__c633=(()=>{const t={},o=(s,E,f)=>{const T=e.createProgram();e.attachShader(T,mt(e.VERTEX_SHADER,E,s+" vs")),e.attachShader(T,mt(e.FRAGMENT_SHADER,f,s+" fs")),e.linkProgram(T),t[s]=T};o("scene0",Ae,ht(0)),o("comp0",Ae,dt(0)),o("blit",Ae,Gt),e.flush();const a=256,n=new Uint8Array(a*a*4);let i=5683;const p=()=>{i=i+1831565813|0;let s=Math.imul(i^i>>>15,1|i);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296};for(let s=0;s<4;s++){const E=new Float32Array(a*a);let f=1,T=0;for(let w=s===3?5:2;w<=(s===3?7:6);w++){const m=1<<w,r=new Float32Array(m*m);for(let l=0;l<m*m;l++)r[l]=p();const c=a/m;for(let l=0;l<a;l++)for(let k=0;k<a;k++){const d=k/c,S=l/c,_=d|0,W=S|0;let G=d-_,O=S-W;G=G*G*(3-2*G),O=O*O*(3-2*O);const Y=r[W%m*m+_%m],q=r[W%m*m+(_+1)%m],ne=r[(W+1)%m*m+_%m],be=r[(W+1)%m*m+(_+1)%m];E[l*a+k]+=f*(Y+(q-Y)*G+(ne-Y)*O+(Y-q-ne+be)*G*O)}T+=f,f*=.55}for(let w=0;w<a*a;w++)n[w*4+s]=B(E[w]/T,0,1)*255}const u=e.createTexture();e.bindTexture(e.TEXTURE_2D,u),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,a,a,0,e.RGBA,e.UNSIGNED_BYTE,n),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);const R=1901,F=new Float32Array(R);{let s=1,E=-Math.sqrt(8),f=-.02,T=8;const w=(r,c)=>r*c;for(let r=R-1;r>=0;r--){F[r]=s;const c=E,l=w(T,s),k=E+.5*f*l,d=w(T+.5*f,s+.5*f*c),S=E+.5*f*d,_=w(T+.5*f,s+.5*f*k),W=E+f*_,G=w(T+f,s+f*S);s+=f/6*(c+2*k+2*S+W),E+=f/6*(l+2*d+2*_+G),T+=f}const m=.35502805/F[Math.round(30/.02)];for(let r=0;r<R;r++)F[r]*=m}const N=e.createVertexArray();return{nTex:u,PR:t,prog:o,qVao:N,ai:F,checked:new Set,ul:new Map,bk:new Map}})()),je=_e==="Bare shingle"?"scene0":"scene1",Ze=xe==="Brash ice"||xe==="A skin of new ice"?"comp1":"comp0";x.PR[je]||x.prog(je,Ae,ht(1)),x.PR[Ze]||x.prog(Ze,Ae,dt(1)),e.flush();const Ce=z.hash+(U?"h":"");let fe=x.bk.get(Ce);if(fe)x.bk.delete(Ce),x.bk.set(Ce,fe);else{Xt(),fe={blk:We,bow:null},x.bk.set(Ce,fe);let t=0;for(const o of x.bk.values())t+=o.blk.size;for(const[o,a]of x.bk){if(x.bk.size<=1||x.bk.size<=8&&t<=384)break;t-=a.blk.size,x.bk.delete(o)}}const h=(t,o)=>{let a=x.ul.get(t);a||(a=new Map,x.ul.set(t,a));let n=a.get(o);return n===void 0&&(n=e.getUniformLocation(t,o),a.set(o,n)),n},ye=26*g,Ke=50*g,Ot=()=>{const o=new Float32Array(768),a=x.ai,n=r=>{const c=(r+30)/.02;if(c<=0)return a[0];if(c>=a.length-1)return 0;const l=c|0,k=c-l;return a[l]*(1-k)+a[l+1]*k},i=r=>1.3199+6878/(r*r)-1132e6/(r*r*r*r)+111e12/(r*r*r*r*r*r),p=[430,465,495,525,555,585,615,645,680],u=(r,c,l)=>Math.exp(-Math.pow((r-c)/l,2)),R=ke[0],F=ke[1];for(const r of p){const c=i(r),l=Math.sqrt((4-c*c)/3),k=4*Math.asin(l/c)-2*Math.asin(l),d=q=>4*Math.asin(q/c)-2*Math.asin(q),S=.002,_=Math.abs((d(l+S)-2*d(l)+d(l-S))/(S*S)),W=Math.cbrt(2/_),G=u(r,600,48),O=u(r,542,44),Y=u(r,452,38);for(let q=-3;q<=3;q++){const ne=q*.75,be=R*Math.exp(ne*F),ot=2*Math.PI*be*1e3/r,at=Math.exp(-ne*ne/2)*Math.pow(be,7/3)/Math.cbrt(r),M=Math.pow(ot,2/3)*W;for(let C=0;C<256;C++){const P=ye+(Ke-ye)*C/255,V=n((P-k)*M),D=V*V*at;o[C*3]+=D*G,o[C*3+1]+=D*O,o[C*3+2]+=D*Y}}}let N=0,s=0,E=0;for(const r of p)N+=u(r,600,48),s+=u(r,542,44),E+=u(r,452,38);let f=0,T=0;for(let r=0;r<256;r++){o[r*3]/=N,o[r*3+1]/=s,o[r*3+2]/=E;const c=o[r*3]*.3+o[r*3+1]*.55+o[r*3+2]*.15;c>f&&(f=c,T=r)}{let r=T;const c=d=>o[d*3]*.3+o[d*3+1]*.55+o[d*3+2]*.15;for(;r>1&&c(r-1)<c(r);)r--;let l=0;for(let d=0;d<r;d++)l=Math.max(l,c(d));const k=l>.28*f?.28*f/l:1;for(let d=0;d<r;d++){const S=k+(1-k)*Z(r-6,r,d);o[d*3]*=S,o[d*3+1]*=S,o[d*3+2]*=S}}const w=new Uint8Array(256*4),m=ke[3];for(let r=0;r<256;r++){let c=o[r*3]/f,l=o[r*3+1]/f,k=o[r*3+2]/f;const d=c*.3+l*.55+k*.15;c=d+(c-d)*m,l=d+(l-d)*m,k=d+(k-d)*m;const S=ye+(Ke-ye)*r/255,_=Z(44*g,26*g,S)*.07;w[r*4]=B(c+_,0,1)*255,w[r*4+1]=B(l+_,0,1)*255,w[r*4+2]=B(k+_,0,1)*255,w[r*4+3]=255}return w},Wt=(()=>{const o=fe.bow||(fe.bow=Ot()),a=e.createTexture();return e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),a})(),pt=e.createTexture();e.bindTexture(e.TEXTURE_2D,pt),e.pixelStorei(e.UNPACK_ALIGNMENT,2),e.texImage2D(e.TEXTURE_2D,0,e.R16F,I,I,0,e.RED,e.HALF_FLOAT,null);for(const[t,o]of fe.blk)e.texSubImage2D(e.TEXTURE_2D,0,t%32*64,(t/32|0)*64,64,64,e.RED,e.HALF_FLOAT,o);e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const xt=!!e.getExtension("EXT_color_buffer_float");e.getExtension("EXT_color_buffer_half_float");const wt=xt?e.RGBA16F:e.RGBA8,vt=xt?e.HALF_FLOAT:e.UNSIGNED_BYTE,Je=(t,o,a,n,i)=>{const p=e.createTexture();e.bindTexture(e.TEXTURE_2D,p),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,e.RGBA,n,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const u=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,u),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,p,0),{t:p,f:u,w:t,h:o}},gt=Je(j,j,wt,vt,e.NEAREST),yt=Math.max(128,j/2|0),bt=Je(yt,yt,wt,vt,e.LINEAR),Et=Je(j,j,e.RGBA8,e.UNSIGNED_BYTE,e.LINEAR),ue=(t,o,a)=>{e.activeTexture(e.TEXTURE0+o),e.bindTexture(e.TEXTURE_2D,a),e.uniform1i(t,o)},Tt=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!1)},Vt={yaw:0,pitch:0,x:0,y:0,z:0};let v=null,kt="",Ue=!0;const jt=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]],Mt=()=>{const t=z.view||Vt,o=[t.yaw||0,t.pitch||0,t.x||0,t.y||0,t.z||0].join(",");if(o===kt)return;kt=o,Ue=!0;const a=L+(t.yaw||0),n=B(ce+(t.pitch||0),-1.3,1.3),i=Math.cos(n),p=Math.sin(n),u=Math.cos(a),R=Math.sin(a),F=[R*i,p,u*i],N=[u,0,-R],s=jt(F,N),E=ae+(t.x||0)*u+(t.z||0)*R,f=Ge-(t.x||0)*R+(t.z||0)*u;v={fw:F,rt:N,up:s,pos:[E,Math.max(Dt(E,f),.12)+ie+(t.y||0),f]}},Ye=[1,.95-.18*Pe,.86-.34*Pe],Zt={Morning:.18,"Very low":.3,Higher:.05,"Midnight sun":.5}[Se],Kt=1.6,Qe=[xe==="A long low swell"?.014:.003,xe==="Brash ice"?1:xe==="A skin of new ice"?2:0,Bt],Be=[_e==="Stranded ice"?1:0,_e==="Old snow"?1:0,_e==="A kelp wrack line"?1:0,0],At=t=>{e.uniform4f(h(t,"uSC"),Ye[0],Ye[1],Ye[2],.016),e.uniform4f(h(t,"uS"),ve[0],ve[1],ve[2],.62+.3*Pe),e.uniform4f(h(t,"uHC"),y[1][0],y[1][1],y[1][2],0),e.uniform4f(h(t,"uZC"),y[2][0],y[2][1],y[2][2],0),e.uniform4f(h(t,"uSp"),H[0],H[1],H[2],H[3]),e.uniform4f(h(t,"uSp2"),A,Me*0+Me,Le,le)},Jt=7;let he=0;const Yt=t=>[(t+.5)*.7548776662%1-.5,(t+.5)*.569840291%1-.5],Rt=(t,o,a,n)=>{const i=x.PR[je];e.useProgram(i),e.bindFramebuffer(e.FRAMEBUFFER,t.f),e.viewport(0,0,t.w,t.h),At(i),e.uniform4f(h(i,"uCam"),v.pos[0],v.pos[1],v.pos[2],0),e.uniform4f(h(i,"uFw"),v.fw[0],v.fw[1],v.fw[2],0),e.uniform4f(h(i,"uRt"),v.rt[0],v.rt[1],v.rt[2],0),e.uniform4f(h(i,"uUp"),v.up[0],v.up[1],v.up[2],Xe),e.uniform4f(h(i,"uJ"),o*2/t.w,a*2/t.h,n?1:0,a*.42),e.uniform4f(h(i,"uFar"),Ie,Math.sin(.38)*.96*A,.82,.42),e.uniform4f(h(i,"uLp"),3,1,176,48),e.uniform4f(h(i,"uBe"),Be[0],Be[1],Be[2],Be[3]),ue(h(i,"uN"),0,x.nTex),ue(h(i,"uMap"),1,pt),e.bindVertexArray(x.qVao),e.drawArrays(e.TRIANGLES,0,3)},$e=()=>{Tt();const t=Yt(he);he===0&&Rt(bt,0,0,!0),he>0&&(e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.CONSTANT_ALPHA,e.ONE_MINUS_CONSTANT_ALPHA),e.blendColor(0,0,0,1/(he+1))),Rt(gt,t[0],t[1],!1),e.disable(e.BLEND),e.flush(),he++};for(const t in x.PR)x.checked.has(t)||(x.checked.add(t),e.getProgramParameter(x.PR[t],e.LINK_STATUS));Mt(),$e(),Ue=!1,e.bindFramebuffer(e.FRAMEBUFFER,null);const St=Q()*40,zt=t=>(Math.sin(t*.083+1.1)+.6*Math.sin(t*.041+.3))/1.6*we[4];let et=St;for(let t=0;t<40&&zt(4+et)<.1*we[4];t++)et+=3.7;const tt=[y[0][0]*.135,y[0][1]*.155,y[0][2]*.16];return(t,o)=>{Mt(),Ue?(Ue=!1,he=0,$e()):he<Jt&&$e();const a=t+St;Tt(),e.bindFramebuffer(e.FRAMEBUFFER,Et.f),e.viewport(0,0,j,j);const n=x.PR[Ze];e.useProgram(n),At(n);const i=zt(t+et);e.uniform4f(h(n,"uFC"),y[0][0],y[0][1],y[0][2],Zt),e.uniform4f(h(n,"uSea"),Qe[0],Qe[1],Qe[2],2*Xe/j),e.uniform4f(h(n,"uFg"),we[0],we[1],we[2],we[3]),e.uniform4f(h(n,"uTm"),a,i,1,Ht),e.uniform4f(h(n,"uCam"),v.pos[0],v.pos[1],v.pos[2],0),e.uniform4f(h(n,"uFw"),v.fw[0],v.fw[1],v.fw[2],0),e.uniform4f(h(n,"uRt"),v.rt[0],v.rt[1],v.rt[2],0),e.uniform4f(h(n,"uUp"),v.up[0],v.up[1],v.up[2],Xe),e.uniform4f(h(n,"uAnti"),Oe[0],Oe[1],Oe[2],0),e.uniform4f(h(n,"uBow"),ke[2]*Kt,ye,Ke-ye,5),e.uniform4f(h(n,"uDeep"),tt[0],tt[1],tt[2],xe==="A long low swell"?.075:.045),ue(h(n,"uA"),0,gt.t),ue(h(n,"uRf"),1,bt.t),ue(h(n,"uN"),2,x.nTex),ue(h(n,"uB"),3,Wt),e.bindVertexArray(x.qVao),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,j,j);const p=x.PR.blit;e.useProgram(p),ue(h(p,"uA"),0,Et.t),e.uniform4f(h(p,"uG"),t%7.13,.009,0,0),e.bindVertexArray(x.qVao),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
