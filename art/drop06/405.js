// Sunbeam Dust: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/405.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(pe){pe&&pe.add({num:405,name:"Sunbeam Dust",fam:"Worlds",recipe:"A sharp beam of sun through a window across a dim room with a seat in it, and dust that rides the room's real air currents, shining brightest where you look toward the light. The window, the hour, the dust and the draught change every mint. Drag to wave the air and the dust swirls through the beam, or tap to clap and the motes scatter.",interactive:"Drag to wave the air: the dust swirls through the beam and the haze curls. Tap to clap: a puff of air bursts out and the motes scatter.",music:!0,gl:!0,fps:30,seed:0,make(I){const e=I.gl,j=I.size,st=I.hash.slice(2);let I0=parseInt(st.slice(0,8),16)|0,Yt=parseInt(st.slice(8,16),16)|0,xt=parseInt(st.slice(16,24),16)|0,v0=parseInt(st.slice(24,32),16)|0;const V=()=>{I0>>>=0,Yt>>>=0,xt>>>=0,v0>>>=0;let t=I0+Yt|0;return I0=Yt^Yt>>>9,Yt=xt+(xt<<3)|0,xt=xt<<21|xt>>>11,v0=v0+1|0,t=t+v0|0,xt=xt+t|0,(t>>>0)/4294967296};for(let t=0;t<12;t++)V();const mt=t=>{let o=0;for(const s of t)o+=s[1];let a=V()*o;for(const s of t)if(a-=s[1],a<0)return s[0];return t[t.length-1][0]};let Jt=mt([["Four Panes",32],["Six Over Six",34],["Two Panes",22],["Leaded Diamonds",12]]),G=mt([["Morning",46],["High Sun",38],["Last Light",16]]),O=mt([["Fine Haze",42],["Swept Up",32],["Lint",18],["Flour",8]]),et=mt([["Oak Boards",40],["Pine Boards",30],["Painted Boards",20],["Scrubbed Deal",10]]),ut=mt([["Still Air",40],["Leaky Sash",40],["Door Ajar",20]]),B0=mt([["Clear",52],["Old Crown",36],["Cracked Pane",12]]),Ct=mt([["Lime White",44],["Grey Green",30],["Oxblood",16],["Bare Plaster",10]]),k=mt([["Ladder-back Chair",46],["Spindle Chair",32],["Empty Room",22]]),Vt=parseInt(st.slice(32,40)||"9e3779b9",16)^1779033703,$t=parseInt(st.slice(40,48)||"7f4a7c15",16)^1013904242;const U=()=>(Vt=Math.imul(Vt^Vt>>>15,739982445)+$t|0,$t=Math.imul($t^$t>>>13,695872825)^Vt,Vt^=Vt>>>16,((Vt^$t>>>7)>>>0)/4294967296);U(),U();let Pt=(()=>{const t=U();return t<.36?"Standing":t<.69?"Crouched by the Light":"Wide from the Door"})();U()<.12&&(Jt="Louvred Shutter"),Pt==="Crouched by the Light"&&k==="Empty Room"&&G==="Last Light"&&(Pt="Standing");let Et=parseInt(st.slice(48,56)||"85ebca6b",16)^1359893119,t0=parseInt(st.slice(56,64)||"c2b2ae35",16)^528734635;const e0=()=>(Et=Math.imul(Et^Et>>>15,739982445)+t0|0,t0=Math.imul(t0^t0>>>13,695872825)^Et,Et^=Et>>>16,((Et^t0>>>7)>>>0)/4294967296);e0(),e0(),I.home&&(k="Ladder-back Chair",Jt="Six Over Six",G="Morning",O="Fine Haze",et="Oak Boards",ut="Leaky Sash",B0="Old Crown",Ct="Lime White",Pt="Standing");let Tt=parseInt(st.slice(48,56)||"85ebca6b",16)^2600822949,o0=parseInt(st.slice(56,64)||"c2b2ae35",16)^1541459225;const yt=()=>(Tt=Math.imul(Tt^Tt>>>15,739982445)+o0|0,o0=Math.imul(o0^o0>>>13,695872825)^Tt,Tt^=Tt>>>16,((Tt^o0>>>7)>>>0)/4294967296);yt(),yt();const b0=yt()*78,we=yt(),ge=b0<10?"Armchair":b0<18?"Tall Stool":b0<26?"Bench":"Child's Chair";!I.home&&k!=="Empty Room"&&b0<32&&!(ge==="Bench"&&Jt==="Louvred Shutter"&&Pt==="Wide from the Door")&&(k=ge);let At=I.home||k==="Empty Room"||we<.5?"three-quarter":we<.75?"to the window":"side on";k==="Bench"&&At==="side on"&&(At="three-quarter"),I.trait("Window",Jt),I.trait("Sun",G),I.trait("Dust",O),I.trait("Floor",et),I.trait("Draught",ut),I.trait("Glass",B0),I.trait("Walls",Ct),I.trait("Furniture",k),I.trait("View",Pt);const _t=1.55,ze=2.5,X0=5.2,H0=2.75,no=.3,io=.19,Lt=-1.95-.15*V(),Ve=1.12+.08*V(),vt=Lt-Ve,bt=.8+.06*V(),qt=bt+1.36+.08*V(),lo=(G==="Morning"?31:G==="High Sun"?44:19)+(V()-.5)*5,co=(G==="Last Light"?24:33)+(V()-.5)*10,p0=lo*Math.PI/180,j0=co*Math.PI/180,K=[Math.cos(p0)*Math.cos(j0),-Math.sin(p0),Math.cos(p0)*Math.sin(j0)],O0=G==="Morning"?[1,.84,.64]:G==="High Sun"?[1,.9,.76]:[1,.6,.33],G0=G==="Last Light"?[.62,.62,.78]:[.62,.74,1],Pe=G==="Last Light"?9:11,a0=(t,o)=>{const a=o/-K[1];return[-_t+K[0]*a,t+K[2]*a]},F=[a0(vt,bt),a0(Lt,bt),a0(Lt,qt),a0(vt,qt)],Ut=[-_t,(bt+qt)/2,(vt+Lt)/2],w0=a0((vt+Lt)/2,(bt+qt)/2),W0=[(Ut[0]+w0[0])/2,Ut[1]/2,(Ut[2]+w0[1])/2],It=[(F[0][0]+F[1][0])/2,(F[0][1]+F[1][1])/2],g0=[(F[0][0]+F[2][0])/2,(F[0][1]+F[2][1])/2],Ee=Math.hypot(g0[0]-It[0],g0[1]-It[1]),z0=[(g0[0]-It[0])/Ee,(g0[1]-It[1])/Ee],V0=[F[1][0]-F[0][0],F[1][1]-F[0][1]],P0=Math.hypot(V0[0],V0[1]),Te=.15+.25*V(),Ae=(V()-.5)*.5*P0*(k==="Bench"?.3:1);let rt=It[0]+z0[0]*Te+V0[0]/P0*Ae,nt=It[1]+z0[1]*Te+V0[1]/P0*Ae;const C=[.95+.2*(V()-.5),1.38+.12*(V()-.5),1.05+.3*(V()-.5)],s0=Pt==="Crouched by the Light",E0=Pt==="Wide from the Door";s0&&(C[0]=.55+.35*U(),C[1]=.26+.1*U()+(k==="Empty Room"?0:k==="Child's Chair"||k==="Bench"?.17:.34),C[2]=.35+.35*U()),E0&&(C[0]=1.75+.3*U(),C[1]=1.5+.12*U(),C[2]=2.5+.4*U());let W=E0?.42:.33;const Z0=(t,o)=>{const a=[Math.sin(t)*Math.cos(o),Math.sin(o),-Math.cos(t)*Math.cos(o)];let s=[-a[2],0,a[0]];const r=Math.hypot(s[0],s[2]);s=[s[0]/r,0,s[2]/r];const n=[s[1]*a[2]-s[2]*a[1],s[2]*a[0]-s[0]*a[2],s[0]*a[1]-s[1]*a[0]];return{f:a,r:s,u:n}},pt=(t,o)=>{const a=[o[0]-C[0],o[1]-C[1],o[2]-C[2]],s=a[0]*t.f[0]+a[1]*t.f[1]+a[2]*t.f[2];return[(a[0]*t.r[0]+a[1]*t.r[1]+a[2]*t.r[2])/(s*W),(a[0]*t.u[0]+a[1]*t.u[1]+a[2]*t.u[2])/(s*W),s]},Mt=[-.93+.05*V(),.5+.08*V()];let Q0=-.62-.06*V();s0&&(Mt[0]=-.62+.1*U(),Mt[1]=.6+.1*U(),Q0=-.5-.08*U()),E0&&(Mt[0]=-.72+.06*U(),Mt[1]=.3+.06*U(),Q0=-.5-.06*U());const r0=s0&&G==="Last Light"&&k!=="Empty Room",ot=[rt,k==="Tall Stool"?.67:k==="Child's Chair"?.28:.45,nt],fo=k==="Tall Stool"?.72:k==="Child's Chair"?.66:k==="Bench"?.47:k==="Armchair"?1.2:1.12,ft=(t,o,a)=>t<o?o-t:t>a?t-a:0;r0&&(Mt[0]=-1);const Le=(t,o)=>{const a=pt(t,ot);if(a[2]<.3)return 1e6;const s=pt(t,[ot[0]-t.r[0]*.32,ot[1],ot[2]-t.r[2]*.32]),r=pt(t,[ot[0]+t.r[0]*.32,ot[1],ot[2]+t.r[2]*.32]),n=pt(t,[ot[0],fo,ot[2]]),l=pt(t,[ot[0],0,ot[2]]);return o?ft(a[0],-.15,.45)**2+ft(a[1],-.35,.15)**2+ft(s[0],-.84,.84)**2+ft(r[0],-.84,.84)**2+ft(n[1],-1,.8)**2+ft(l[1],-.88,1)**2:ft(s[0],-.9,.9)+ft(r[0],-.9,.9)+ft(l[1],-.95,1)+(n[1]>1&&(n[1]-1)/(n[1]-l[1])>.06?1:0)};let K0,Y0=0,J0=0;const ho=s0?-.45:-.6,xo=s0?70:40,mo=r0?64:48,Me=()=>{K0=1e9;for(let t=0;t<mo;t++)for(let o=0;o<xo;o++){const a=-.9+t*.02,s=ho+o*.015,r=Z0(a,s),n=pt(r,Ut),l=pt(r,[w0[0],0,w0[1]]);let f=((n[0]-Mt[0])**2+(n[1]-Mt[1])**2)*(r0?.25:1)+(l[1]-Q0)**2*1.5;r0&&(f+=Le(r,!0)*2),f<K0&&(K0=f,Y0=a,J0=s)}};if(Me(),r0)for(;W<.399&&Le(Z0(Y0,J0),!1)>0;)W=Math.min(.4,W+.0175),Me();const D=Z0(Y0,J0),kt=(()=>{const t=Math.hypot(D.f[0],D.f[2]);return[D.f[0]/t,0,D.f[2]/t]})(),St=D.r,T0=(W0[0]-C[0])*kt[0]+(W0[2]-C[2])*kt[2],uo=pt(D,W0)[2],ke=-T0*W*1.35,n0=2*T0*W*1.35,Bt=H0,Nt=32768,Se=O==="Lint"?18e3:O==="Fine Haze"?26e3:32768,yo=O==="Flour"?.04:O==="Swept Up"?.016:O==="Lint"?.008:.011,vo=O==="Flour"?.05:O==="Swept Up"||O==="Lint"?.14:.12,bo=O==="Lint"?.22:.03,po=O==="Flour"?.65:O==="Lint"?1.15:1,wo=`#version 300 es
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}`,Xt=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
uniform vec4 V[64];
uniform sampler2D uN,uW;
#define CAM V[0].xyz
#define TANH V[0].w
#define FW V[1].xyz
#define ZF V[1].w
#define RT V[2].xyz
#define APER V[2].w
#define UPV V[3].xyz
#define SZ V[3].w
#define LS V[4].xyz
#define SUNE V[4].w
#define XL V[5].x
#define TRV V[5].y
#define TSH V[5].z
#define ZB V[5].w
float hg(float c,float g){float d=1.+g*g-2.*g*c;return (1.-g*g)/(d*sqrt(d));}
float rectS(vec2 q,float w){float d=min(min(q.x-V[6].x,V[6].y-q.x),min(q.y-V[6].z,V[6].w-q.y));return smoothstep(-w,w,d);}
// the sun's two baked maps (uW): the lower half holds the sash plane (pane distance, old glass's caustics, the crack),
// the upper half the chair seen from the sun (how near a ray passes it, and how deep along the sun it first meets it)
vec4 wM(vec2 q){return textureLod(uW,(q-V[6].xz)/(V[6].yw-V[6].xz)*vec2(1.,.5),0.);}
float winT(vec2 q,float w,float t){
  vec4 m=wM(q);float tr=smoothstep(-w,w,m.r*.25-.125),k=min(1.,t*.45);
  tr*=1.+k*(m.g-.15);
  float ac=m.b*.25-.125;tr*=1.-m.a*(.8*exp(-ac*ac/max(w*w*.6,1.5e-6))-.22*exp(-(ac-.0035)*(ac-.0035)/4e-6));
  return tr;
}
vec3 sunB1(){return normalize(cross(LS,vec3(0.,1.,0.)));}
float chairT(vec3 P){
  vec3 e1=sunB1(),e2=cross(e1,LS),q=P-V[55].xyz;
  vec2 uv=vec2(dot(q,e1),dot(q,e2))/V[55].w+.5;
  if(uv.x<=0.||uv.x>=1.||uv.y<=0.||uv.y>=1.)return 1.;
  uv.y=.5+uv.y*.5;
  vec2 m=textureLod(uW,uv,0.).rg;float dp=dot(q,LS),gp=m.r*.25-.125,dz=m.g*4.;
  return dp>dz+.011?smoothstep(-.002,.004+.0047*min(dp-dz,3.),gp):1.;
}
// direct sun at P: through the inner and outer faces of the opening and the sash, and past the chair
float vis(vec3 P){
  vec3 s=-LS;float tr=1.;
  if(V[23].x>.5)tr=chairT(P);
  float t1=(-XL-P.x)/s.x;
  if(t1>0.)tr*=rectS((P+s*t1).zy,.0047*t1+.0006);
  float t2=(-XL-TRV-P.x)/s.x;
  tr*=rectS((P+s*t2).zy,.0047*t2+.0006);
  float t3=(-XL-TSH-P.x)/s.x;
  if(t3>0.)tr*=winT((P+s*t3).zy,.0047*t3+.0006,t3);
  return max(tr,0.);
}
vec3 rayDir(vec2 fc){vec2 sc=fc/SZ*2.-1.;return normalize(FW+RT*sc.x*TANH+UPV*sc.y*TANH);}
`,Ne=`float barD(float x,float c,float hw){return abs(x-c)-hw;}
// signed distance (m) into the open glass at the sash plane: frame, bars and leads are negative
float paneD(vec2 q){
  float W=V[6].y-V[6].x,H=V[6].w-V[6].z,lz=q.x-V[6].x,ly=q.y-V[6].z,fb=.05;
  float d=min(min(lz-fb,W-fb-lz),min(ly-fb,H-fb-ly));
  float ty=V[7].z,b=1e3;
  if(ty<.5){b=min(barD(lz,W*.5,.016),barD(ly,H*.5,.016));}
  else if(ty<1.5){b=min(barD(ly,H*.5,.027),min(min(barD(lz,W/3.,.011),barD(lz,W*2./3.,.011)),min(barD(ly,H*.25,.011),barD(ly,H*.75,.011))));}
  else if(ty<2.5){b=barD(ly,H*.53,.03);}
  else if(ty>3.5){float sp=.062,s=fract(ly/sp);b=min(barD(lz,W*.5,.012),(abs(s-.5)-.31)*sp);}
  else{float du=lz/.118+ly/.178,dv=lz/.118-ly/.178,g=.0981;b=min(abs(fract(du)-.5),abs(fract(dv)-.5));b=(.5-b)*g;b=min(abs(fract(du+.5)-.5),abs(fract(dv+.5)-.5))*g-.0032;b=min(b,barD(ly,H*.5,.006));}
  return min(d,b);
}
// the chair: up to 19 parts in its own frame (V[24..53], V[56..63]). Each part is sheared about its own centre (x and
// z lean with height: raked back posts, fanned spindles) and is a box (0), a round part along y (1), z (2) or x (3),
// the seat (4: wider at the front) or a slat (5: arched top edge). Nearest hit, its normal, the part hit (gI), the
// closest miss (for soft shadows) and how deep along the ray that miss lies (gT)
int gI;float gT;
int pIx(int i){return 24+2*i+(i>14?2:0);}
float boxes(vec3 ro,vec3 rd,out vec3 nrm,out float gap){
  float cy=cos(V[22].w),sy=sin(V[22].w);
  vec3 o0=ro-vec3(V[22].y,0.,V[22].z);o0=vec3(cy*o0.x+sy*o0.z,o0.y,-sy*o0.x+cy*o0.z);
  vec3 d0=vec3(cy*rd.x+sy*rd.z,rd.y,-sy*rd.x+cy*rd.z);
  float tb=1e4;vec3 nb=vec3(0.,1.,0.);gap=1e4;gI=-1;gT=1e4;
  int nbx=int(V[23].x);
  for(int i=0;i<nbx;i++){
    int j=pIx(i);vec4 cw=V[j],hk=V[j+1];int ty=int(cw.w);float kx=fract(cw.w)-.5,kz=ty==4?0.:hk.w;vec3 h=hk.xyz;
    vec3 o=o0-cw.xyz,d=d0;o.xz+=vec2(kx,kz)*o.y;d.xz+=vec2(kx,kz)*d.y;
    d+=vec3(equal(d,vec3(0.)))*1e-6;
    float a,b,g,tm;vec3 n;
    if(ty>0&&ty<4){
      vec3 oa=ty==2?o.xzy:ty==3?o.yxz:o,da=ty==2?d.xzy:ty==3?d.yxz:d;
      vec2 dd=da.xz;float A=max(dot(dd,dd),1e-9),B=dot(oa.xz,dd),r=h.x,q=max(dot(oa.xz,oa.xz)-B*B/A,0.);tm=-B/A;
      float y0=(-h.y-oa.y)/da.y,y1=(h.y-oa.y)/da.y,ya=min(y0,y1),yb=max(y0,y1);
      float sq=sqrt(max(r*r-q,0.)/A),t0=tm-sq;a=max(t0,ya);b=min(tm+sq,yb);
      g=q<r*r?a-b:max(sqrt(q)-r,max(abs(oa.y+da.y*max(tm,0.))-h.y,0.));
      n=t0>=ya?vec3(oa.x+dd.x*a,0.,oa.z+dd.y*a)/r:vec3(0.,-sign(da.y),0.);n=ty==2?n.xzy:ty==3?n.yxz:n;
      if(q>=r*r)b=a-1.;
    }else{
      vec3 id=1./d,t1=(-h-o)*id,t2=(h-o)*id,tn=min(t1,t2),tf=max(t1,t2);
      a=max(max(tn.x,tn.y),tn.z);b=min(min(tf.x,tf.y),tf.z);
      n=-sign(d)*step(tn.yzx,tn.xyz)*step(tn.zxy,tn.xyz);
      if(ty==4){float s=hk.w*h.x/h.z;vec2 dn=vec2(d.x,-d.x)-s*d.z,tt=(h.x-vec2(o.x,-o.x)+s*o.z)/dn;
        if(dn.x<0.){if(tt.x>a){a=tt.x;n=vec3(1.,0.,-s);}}else b=min(b,tt.x);
        if(dn.y<0.){if(tt.y>a){a=tt.y;n=vec3(-1.,0.,-s);}}else b=min(b,tt.y);}
      if(ty==5){float ar=.9*h.y;
        float xa=(o.x+d.x*a)/h.x,xb=(o.x+d.x*b)/h.x,fa=o.y+d.y*a-h.y+ar*xa*xa,fb=o.y+d.y*b-h.y+ar*xb*xb;
        if(a<b&&fa>0.){if(fb>0.)b=a-.5*(fa+fb);else{a+=(b-a)*fa/(fa-fb);float xx=(o.x+d.x*a)/h.x;n=normalize(vec3(2.*ar*xx/h.x,1.,0.));}}
        else if(a<b&&fb>0.)b=a+(b-a)*fa/(fa-fb);}
      g=a-b;tm=.5*(a+b);
    }
    if(tm+abs(g)>0.&&g<gap){gap=g;gT=max(tm,0.);}
    if(a<b&&a>0.&&a<tb){tb=a;nb=normalize(vec3(n.x,n.y+kx*n.x+kz*n.z,n.z));gI=i;}
  }
  nrm=vec3(cy*nb.x-sy*nb.z,nb.y,sy*nb.x+cy*nb.z);
  return tb;
}
`,go=Xt+Ne+`
out vec4 o;
void main(){
  vec2 f=gl_FragCoord.xy/512.;
  if(f.y<1.){
    vec2 q=V[6].xz+f*(V[6].yw-V[6].xz);float gt=V[7].w,cr=0.,ac=1.,on=0.;
    if(gt>.5&&gt<1.5){float w0=textureLod(uN,vec2(q.x*.11+.13,q.y*.3),0.).b;float n1=1.-abs(2.*textureLod(uN,vec2(q.x*.05,q.y*.9+w0*.6),0.).g-1.),n2=1.-abs(2.*textureLod(uN,vec2(q.x*.09+.31,q.y*1.7+w0*.9+.17),0.).b-1.);
      cr=.3*(pow(n1,4.)+.6*pow(n2,5.))-.12;}
    if(gt>1.5){vec2 o=q-V[18].xy;vec2 dr=vec2(cos(V[18].z),sin(V[18].z));float al=dot(o,dr);ac=dot(o,vec2(-dr.y,dr.x));
      ac+=.012*(textureLod(uN,vec2(al*.9,.71),0.).g-.5)+.004*(textureLod(uN,vec2(al*4.,.23),0.).b-.5);
      on=step(abs(al-V[18].w*.5),V[18].w*.5);}
    o=vec4(clamp(paneD(q)*4.+.5,0.,1.),cr+.15,clamp(ac*4.+.5,0.,1.),on);
  }else{
    vec3 e1=sunB1(),e2=cross(e1,LS);vec2 uv=(f-vec2(0.,1.))-.5;
    vec3 ro=V[55].xyz+(e1*uv.x+e2*uv.y)*V[55].w;vec3 n;float gp;float t=boxes(ro,LS,n,gp);
    o=vec4(clamp(gp*4.+.5,0.,1.),(t<1e3?t:gT<1e3?gT:1.2)*.25,0.,1.);
  }
}`,$0=Xt+Ne+`
out vec4 o;
#ifdef CHAIR
uniform float uF;
#endif
float nz(vec2 uv,float fp){return textureLod(uN,uv,log2(max(fp*256.,1.))).g;}
float nzb(vec2 uv,float fp){return textureLod(uN,uv,log2(max(fp*256.,1.))).b;}
float h11(float x){return fract(sin(x*91.3458+V[19].w)*47453.5453);}
// floorboards: albedo and gloss
vec4 floorA(vec2 p,float fw){
  float ty=V[9].w;
  float bw=ty<.5?.122:ty<1.5?.178:ty<2.5?.145:.21;
  float bx=p.x/bw,id=floor(bx),fx=fract(bx),hb=h11(id);
  float bl=1.4+1.6*hb,zz=p.y+hb*9.,jd=floor(zz/bl),fz=fract(zz/bl),hj=h11(id*7.13+jd*3.71+.5);
  float tone=.86+.26*hj;
  // grain: tight lines across the board, long along it; figure: broader waves
  float gx=p.x*9.5+hj*13.,gz=zz*.085+hb*3.;
  float wv=nz(vec2(p.x*1.3+hb*7.,zz*.05),fw*1.3);
  float g=nz(vec2(gx+wv*1.8,gz),fw*9.5);
  float g2=nzb(vec2(p.x*24.+hj*5.,zz*.2),fw*24.);
  float fig=nz(vec2(p.x*2.2+hj*3.,zz*.11+hb),fw*2.2);
  vec3 wood;float gl=.9;
  if(ty<.5){wood=vec3(.40,.27,.16)*tone*(.72+.5*g)*(.9+.2*g2)*(.85+.3*fig);}
  else if(ty<1.5){wood=vec3(.55,.35,.17)*tone*(.75+.45*g)*(.9+.22*g2);
    vec2 kp=vec2((id+.3+.4*h11(id*3.3+jd))*bw,(jd+h11(jd*5.1+id))*bl-hb*9.);float kd=length((p-kp)*vec2(1.,.33));
    wood*=1.-.55*smoothstep(.025,.008,kd)-.18*smoothstep(.06,.03,kd)*sin(kd*260.);}
  else if(ty<2.5){wood=vec3(.42,.27,.15)*tone*(.75+.45*g);
    float wr=nz(p*vec2(.9,.35)+.37,fw*.9)*.7+nzb(p*4.+.11,fw*4.)*.3;
    float edge=smoothstep(.0,.14,min(fx,1.-fx));
    float paint=smoothstep(.5,.56,wr*(.6+.6*edge)+.18*(1.-smoothstep(-.6,.9,p.x)));
    vec3 pc=vec3(.29,.34,.31)*(.92+.16*g2);
    wood=mix(wood,pc,1.-paint);gl=mix(.55,1.,paint);}
  else{wood=vec3(.6,.53,.42)*(.88+.24*hj)*(.82+.3*g)*(.9+.2*g2);gl=.25;}
  // traffic wear: a paler, duller path; dust in the corners
  float wear=nz(p*.22+.13,fw*.22);
  wood*=1.+.12*smoothstep(.45,.8,wear);gl*=1.-.4*smoothstep(.4,.85,wear);
  // board edges and end joints: gaps with a dark line
  float dx=min(fx,1.-fx)*bw,dz=min(fz,1.-fz)*bl;
  float gap=smoothstep(.0011,.0011+fw*.8,dx)*smoothstep(.0009,.0009+fw*.8,dz);
  float bev=smoothstep(.0011,.006+fw,dx);
  wood*=mix(.12,1.,gap)*(.9+.1*bev);
  return vec4(wood,gl*gap);
}
// a turned part: radius scale s and its slope ds along it, u from its lower end, length L, radius r, centre height cy.
// Legs: a taper to the foot and one long swell above the stretchers; back posts (above the seat): a slight taper up to
// a turned finial; thin spindles and stretchers swell gently at the middle
vec2 turn(float u,float L,float r,float cy){
  float s=0.,ds=0.;
  if(r<.013){float f=3.14159/L;s=.28*sin(u*f);ds=.28*f*cos(u*f);}
  else if(cy>.3){float x=(u-L+.035)/.012,g=.32*exp(-x*x),y=(u-L+.062)/.006,k=-.12*exp(-y*y);
    s=g+k-.1*u/L;ds=-2.*x/.012*g-2.*y/.006*k-.1/L;}
  else{float x=(u-min(.36,L*.8))/.055,g=.2*exp(-x*x),tp=clamp(1.-u/.16,0.,1.);
    s=g-.2*tp*tp;ds=-2.*x/.055*g+.4*tp/.16;}
  return vec2(s,ds);
}
vec3 wallA(vec3 P,vec3 N,float fw){
  vec2 q=abs(N.x)>.5?P.zy:P.xy;
  float m=nz(q*.12+.21,fw*.12)*.6+nz(q*.6+.5,fw*.6)*.4;
  float f=nzb(q*7.+.3,fw*7.);
  vec3 wc=V[10].rgb*(.84+.3*m)*(.95+.1*f);
  if(V[10].w>2.5){float pt=smoothstep(.45,.62,nz(q*.33+.71,fw*.33));wc=mix(wc,vec3(.56,.42,.36)*(.85+.3*f),pt*.8);}
  return wc;
}
vec3 light(vec3 P,vec3 N,float sv){
  vec3 sc=V[8].rgb,kc=V[9].rgb;
  vec3 E=SUNE*sc*sv*max(0.,dot(N,-LS));
  // bounce from the sunlit patch on the floor (3 x 3 samples over its quad)
  float Lp=.3*SUNE*(-LS.y)*.78/3.14159;
  vec2 a=V[11].xy,b=V[11].zw,c=V[12].xy,d=V[12].zw;
  float area=.5*abs((c.x-a.x)*(d.y-b.y)-(d.x-b.x)*(c.y-a.y));
  vec3 Eb=vec3(0.);
  for(int i=0;i<9;i++){float u=(float(i%3)+.5)/3.,v=(float(i/3)+.5)/3.;vec2 s=mix(mix(a,b,u),mix(d,c,u),v);
    vec3 w=P-vec3(s.x,0.,s.y);float d2=dot(w,w)+.04,il=inversesqrt(d2);
    Eb+=vec3(max(0.,w.y*il)*max(0.,-dot(N,w)*il)/d2);}
  vec3 bt=V[63].rgb;  // the patch throws back the boards' own colour
  E+=Lp*sc*bt*V[19].z*Eb*area/9.;
  // skylight through the opening (2 x 2)
  vec3 Es=vec3(0.);
  for(int i=0;i<4;i++){vec3 W=vec3(-XL,mix(V[6].z,V[6].w,(float(i/2)+.5)/2.),mix(V[6].x,V[6].y,(float(i%2)+.5)/2.));
    vec3 w=P-W;float d2=dot(w,w)+.03,il=inversesqrt(d2);Es+=vec3(max(0.,w.x*il)*max(0.,-dot(N,w)*il)/d2);}
  E+=V[8].w*kc*Es*(V[6].y-V[6].x)*(V[6].w-V[6].z)*.25*.75;
  // everything else, a little
  E+=(Lp*area*.09*sc*vec3(.8,.87,1.)+V[8].w*.065*kc*vec3(.8,.95,1.25))*(.6+.4*N.y);
  return E;
}
void main(){
  vec3 d=rayDir(gl_FragCoord.xy),C=CAM;
  float pw=2.*TANH/SZ;
  float t=1e4;vec3 N=vec3(0,1,0);int id=0;
  if(d.y<0.){float tt=-C.y/d.y;if(tt<t){t=tt;N=vec3(0,1,0);id=1;}}
  if(d.y>0.){float tt=(V[7].y-C.y)/d.y;if(tt<t){t=tt;N=vec3(0,-1,0);id=2;}}
  if(d.z<0.){float tt=(-ZB-C.z)/d.z;if(tt<t){t=tt;N=vec3(0,0,1);id=2;}}
  if(d.x>0.){float tt=(V[7].x-C.x)/d.x;if(tt<t){t=tt;N=vec3(-1,0,0);id=2;}}
  if(d.x<0.){float tt=(-XL-C.x)/d.x;if(tt<t){vec3 P=C+d*tt;
    if(P.z>V[6].x&&P.z<V[6].y&&P.y>V[6].z&&P.y<V[6].w){
      t=(-XL-TSH-C.x)/d.x;N=vec3(1,0,0);id=6;
      if(d.y<0.){float ts=(V[6].z-C.y)/d.y;if(ts>tt&&ts<t){t=ts;N=vec3(0,1,0);id=5;}}
      if(d.y>0.){float ts=(V[6].w-C.y)/d.y;if(ts>tt&&ts<t){t=ts;N=vec3(0,-1,0);id=5;}}
      if(d.z<0.){float ts=(V[6].x-C.z)/d.z;if(ts>tt&&ts<t){t=ts;N=vec3(0,0,1);id=5;}}
      if(d.z>0.){float ts=(V[6].y-C.z)/d.z;if(ts>tt&&ts<t){t=ts;N=vec3(0,0,-1);id=5;}}
    }else{t=tt;N=vec3(1,0,0);id=2;}}}
  // the sill board: proud of the wall under the opening, with a rounded nosing
  {vec3 bn=vec3(-XL-.01,V[6].z-.042,V[6].x-.07),bx=vec3(-XL+.042,V[6].z+.004,V[6].y+.07),iv=1./(d+vec3(equal(d,vec3(0.)))*1e-6);
   vec3 t1=(bn-C)*iv,t2=(bx-C)*iv,tn=min(t1,t2),tf=max(t1,t2);float a=max(max(tn.x,tn.y),tn.z),b=min(min(tf.x,tf.y),tf.z);
   if(a<b&&a>0.&&a<t){t=a;N=-sign(d)*step(tn.yzx,tn.xyz)*step(tn.zxy,tn.xyz);id=7;}}
#ifdef CHAIR
  // the chair, 8 sub-rays (two rotated grids) for a clean edge
  float cov=0.,tC=1e4;vec3 NC=vec3(0,1,0),dC=d;int iC=0;
  {
    int nsr=int(V[54].w);
    for(int k=0;k<nsr;k++){float fk=float(k);vec2 of=fract(vec2(fk*.125+.0625,fk*.625+.3125))-.5;
      vec3 dk=rayDir(gl_FragCoord.xy+of);vec3 nk;float gp;float tk=boxes(C,dk,nk,gp);
      if(tk<t){cov+=1./V[54].w;if(tk<tC){tC=tk;NC=nk;dC=dk;iC=gI;}}}
  }
  vec3 col=vec3(0.);
  if(uF>.5){if(cov<.375)discard;}
  else{if(cov<=0.)discard;
  float wgt=cov;vec3 d=dC;float t=tC;vec3 N=NC;int id=8;
    vec3 P=C+d*t;float fw=t*pw;
    vec3 alb;float gloss=0.,glassF=0.;
    {float cy=cos(V[22].w),sy=sin(V[22].w);vec3 o=P-vec3(V[22].y,0.,V[22].z);o=vec3(cy*o.x+sy*o.z,o.y,-sy*o.x+cy*o.z);
      vec3 nl=vec3(cy*N.x+sy*N.z,N.y,-sy*N.x+cy*N.z),nn=nl;
      int j=pIx(iC);vec4 cw=V[j],hk=V[j+1];int ty=int(cw.w);float kx=fract(cw.w)-.5;vec3 h=hk.xyz,q=o-cw.xyz;
      if(ty!=4)q.xz+=vec2(kx,hk.w)*q.y;
      // wood: grain runs along each part
      vec3 ax=ty==2?vec3(0,0,1):ty==3||ty>3?vec3(1,0,0):ty==1?vec3(0,1,0):h.x>h.y?vec3(1,0,0):vec3(0,1,0);
      float al=dot(q,ax),ac=dot(q,vec3(1.)-ax);
      float g=nz(vec2(ac*9.+V[22].y,al*.7),fw*9.)*.7+nz(vec2(ac*2.3,al*.25+V[22].z),fw*2.3)*.3;
      alb=V[23].yzw*(.8+.4*g);gloss=.22;
      if(ty>0&&ty<4){
        // turned: one swell on legs, a taper to the foot, a finial on the back posts; spindles swell at the middle
        vec3 qa=ty==2?q.xzy:ty==3?q.yxz:q,na=ty==2?nl.xzy:ty==3?nl.yxz:nl;float rl=length(qa.xz);
        vec2 tn=turn(qa.y+h.y,2.*h.y,h.x,cw.y);vec3 rad=vec3(qa.x,0.,qa.z)/max(rl,1e-5);
        vec3 m=abs(na.y)>.5?normalize(na+rad*.8*smoothstep(.45*h.x,h.x,rl)):normalize(rad-vec3(0.,h.x*tn.y,0.));
        nn=ty==2?m.xzy:ty==3?m.yxz:m;alb*=.94+.12*clamp(tn.x,0.,1.);
      }else if(ty==4&&V[54].z>.5){
        // rush: four triangles of twisted coils, each wrapped round its own rail, meeting in a cross seam; matt straw
        float hw=h.x*(1.+hk.w*q.z/h.z),xr=abs(q.x)/hw,zr=abs(q.z)/h.z;bool sd=xr>zr;
        float u=abs(nl.y)>.5?(sd?q.z:q.x):abs(nl.z)>.5?q.x:q.z,v=sd?q.x:q.z,sp=.0115;
        float f=fract(u/sp),ci=floor(u/sp),pr=2.*f-1.,aa=smoothstep(1.1,.4,fw/sp);
        vec3 ua=abs(nl.y)>.5?(sd?vec3(0,0,1):vec3(1,0,0)):abs(nl.z)>.5?vec3(1,0,0):vec3(0,0,1);
        nn=normalize(nl*sqrt(max(1.-pr*pr,.04))+ua*pr*.8*aa);
        if(nl.y>.5)nn=normalize(nn-vec3(q.x/hw,0.,q.z/h.z)*.14);
        float tw=abs(fract(u/sp+v/(sp*3.1))-.5),ta=smoothstep(.9,.3,fw/sp);
        alb=vec3(.5,.39,.2)*(.82+.32*h11(ci+(sd?50.:0.)))*mix(1.,(.72+.28*sqrt(max(1.-pr*pr,0.)))*(1.-.1*ta*smoothstep(.16,.04,tw)),aa);
        if(nl.y>.5)alb*=mix(.55,1.,smoothstep(0.,.035+fw*3.,abs(xr-zr)))*(1.-.18*(1.-max(xr,zr)));
        gloss=0.;
      }else{
        // boards (slats, rails, a plank seat): edges eased within a few mm, so they turn softly into the light
        vec3 e=h-abs(q);float bv=min(.004,min(min(h.x,h.y),h.z)*.5);
        if(ty==5){float xx=q.x/h.x;e.y=h.y-.9*h.y*xx*xx-q.y;if(q.y<0.)e.y=h.y+q.y;}
        vec3 r=(1.-clamp(e/bv,0.,1.))*sign(q)*(vec3(1.)-abs(nl));nn=normalize(nl+r*.9);
      }
      N=normalize(vec3(cy*nn.x-sy*nn.z,nn.y,sy*nn.x+cy*nn.z));}
    // corner occlusion, and under the chair
    float cd=min(min(P.x+XL,V[7].x-P.x),min(P.z+ZB,1e3));
    float ao=id==1?mix(.45,1.,smoothstep(0.,.5,cd)):mix(.55,1.,smoothstep(0.,.45,P.y))*mix(.6,1.,smoothstep(0.,.5,abs(N.x)>.5?min(P.z+ZB,1e3):min(P.x+XL,V[7].x-P.x)));
    if(id>=5)ao=1.;
    if(V[23].x>.5&&(id==1||id==8)){float cy=cos(V[22].w),sy=sin(V[22].w);vec3 o=P-vec3(V[22].y,0.,V[22].z);o=vec3(cy*o.x+sy*o.z,o.y,-sy*o.x+cy*o.z);
      float sd=length(max(abs(o.xz)-vec2(.2,.19),0.));ao*=1.-.4*exp(-sd*sd/.02)*smoothstep(.6,.0,o.y);
      for(int i=0;i<4;i++){vec4 cw=V[26+2*i],hk=V[27+2*i];vec2 ft=cw.xz+vec2(fract(cw.w)-.5,hk.w)*cw.y;float ld=max(length(o.xz-ft)-hk.x,0.);ao*=1.-.6*exp(-ld*ld/.0004)*smoothstep(.12,0.,o.y);}}
    float sv=vis(P+N*.002);
    vec3 cl=alb*light(P,N,sv)/3.14159;
    cl*=mix(ao,1.,.25*sv);
    if(id==1||id==8){
      // varnish and oiled wood: the sun's sheen; the floor also takes the window's soft reflection
      vec3 h=normalize(-LS-d);float nh=max(dot(h,N),0.),r2=id==1?.09:.2;float D=r2/(3.14159*pow(nh*nh*(r2-1.)+1.,2.));
      float nv=max(-dot(d,N),.05),fr=.04+.96*pow(1.-nv,5.);
      vec3 sh=SUNE*V[8].rgb*sv*D*fr*gloss*.12/nv*max(0.,dot(N,-LS))*2.;
      cl+=sh*(1.1/(1.1+max(sh.r,max(sh.g,sh.b))));   // the sun's sheen, rolled off so the patch never burns
      vec3 rd=reflect(d,N);
      if(id==1&&rd.x<0.){float tw=(-XL-P.x)/rd.x;vec3 Q=P+rd*tw;float bl=.02+.12*tw;
        float wm=smoothstep(-bl,bl,min(min(Q.z-V[6].x,V[6].y-Q.z),min(Q.y-V[6].z,V[6].w-Q.y)));
        cl+=V[8].w*2.*mix(V[9].rgb,vec3(1.),.6)*wm*fr*gloss*.5;}
    }
    col+=cl*wgt;
  }
  o=uF>.5?vec4(0.,0.,0.,tC*V[21].y):vec4(col*V[21].x,cov);
}
#else
  vec3 col=vec3(0.);
  {float wgt=1.;
    vec3 P=C+d*t;float fw=t*pw;
    vec3 alb;float gloss=0.,glassF=0.,sideF=0.;vec3 slitL=vec3(0.);
    if(id==1){vec4 f=floorA(P.xz,fw);alb=f.rgb;gloss=f.a;}
    else if(id==6){
      // the bars are moulded wood ~32 mm deep: seen from the side, the ray meets their faces before the sash plane
      vec3 P1=C+d*((-XL-TSH+.032-C.x)/d.x),P2=C+d*((-XL-TSH+.016-C.x)/d.x);
      float g0=smoothstep(-fw,fw,wM(P.zy).r*.25-.125),g1=smoothstep(-fw,fw,wM(P1.zy).r*.25-.125),g2=smoothstep(-fw,fw,wM(P2.zy).r*.25-.125);
      glassF=g0*g1*g2;sideF=(1.-glassF)*g1;
      alb=vec3(.46,.43,.38)*(.9+.1*nz(P.zy*3.,fw*3.));}
    else{alb=wallA(P,N,fw);
      if(id==5&&N.y>.5)alb=vec3(.62,.6,.55)*(.85+.25*nz(P.zx*4.,fw*4.));
      if(id==7){float ex=-XL+.042-P.x,ey=V[6].z+.004-P.y,rr=.016;
        if(ex<rr&&ey<rr)N=normalize(vec3(rr-ex,rr-ey,0.));else if(ex<.008&&ey>.038)N=normalize(vec3(.008-ex,.038-ey,0.));
        alb=vec3(.6,.57,.5)*(.85+.25*nz(P.zx*5.,fw*5.))*(1.+.12*smoothstep(.6,.8,nzb(P.zx*31.,fw*31.))*step(.5,N.y));}
      float sk=abs(N.y)<.5?smoothstep(.15,.15-fw,P.y):0.;
      alb=mix(alb,V[10].rgb*.55+vec3(.17,.16,.14),sk);
      if(abs(N.y)<.5&&abs(P.y-.15)<.006)alb*=1.25;
#ifdef DOOR
      // the door in the back wall, a hand open: a dark leaf in its frame and a bright slit of the hall's daylight
      if(id==2&&N.z>.5&&P.x>V[60].z-.07&&P.x<V[60].w+.07&&P.y<2.07){
        bool fr=P.x<V[60].z||P.x>V[60].w||P.y>2.;
        alb=fr?V[10].rgb*.8+.05:vec3(.2,.15,.11)*(.85+.3*nz(vec2(P.x*2.,P.y*.3),fw*2.));
        if(!fr){float px=(P.x-V[60].z)/(V[60].w-V[60].z);alb*=1.-.35*smoothstep(.012,.0,min(abs(fract(px*2.)-.5)-.38,abs(fract(P.y*1.6)-.5)-.4)+.01);}
        if(!fr&&P.x>V[60].x){alb=vec3(0.);slitL=V[61].w*mix(vec3(.85,.93,1.1),vec3(1.),.3*smoothstep(1.6,.2,P.y));}}
#endif
      if(abs(N.y)<.5&&id==2){float pr=abs(P.y-2.08);alb*=1.-.35*smoothstep(.022+fw,.018,pr)+.3*smoothstep(.006+fw,.0,abs(P.y-2.1))-.25*smoothstep(.005+fw,0.,abs(P.y-2.06));}}
    // corner occlusion, and under the chair
    float cd=min(min(P.x+XL,V[7].x-P.x),min(P.z+ZB,1e3));
    float ao=id==1?mix(.45,1.,smoothstep(0.,.5,cd)):mix(.55,1.,smoothstep(0.,.45,P.y))*mix(.6,1.,smoothstep(0.,.5,abs(N.x)>.5?min(P.z+ZB,1e3):min(P.x+XL,V[7].x-P.x)));
    if(id>=5)ao=1.;
    if(V[23].x>.5&&(id==1||id==8)){float cy=cos(V[22].w),sy=sin(V[22].w);vec3 o=P-vec3(V[22].y,0.,V[22].z);o=vec3(cy*o.x+sy*o.z,o.y,-sy*o.x+cy*o.z);
      float sd=length(max(abs(o.xz)-vec2(.2,.19),0.));ao*=1.-.4*exp(-sd*sd/.02)*smoothstep(.6,.0,o.y);
      for(int i=0;i<4;i++){vec4 cw=V[26+2*i],hk=V[27+2*i];vec2 ft=cw.xz+vec2(fract(cw.w)-.5,hk.w)*cw.y;float ld=max(length(o.xz-ft)-hk.x,0.);ao*=1.-.6*exp(-ld*ld/.0004)*smoothstep(.12,0.,o.y);}}
    float sv=vis(P+N*.002);
    vec3 cl=alb*light(P,N,sv)/3.14159;
    cl*=mix(ao,1.,.25*sv);
#ifdef DOOR
    // the hall's light through the slit: a cool blade across the boards
    cl+=slitL;
    if(id==1){vec3 dl=V[61].xyz;float s=(-ZB-P.z)/dl.z;vec3 Q=P+dl*s;
      float bw=.01+.04*s;cl+=alb*V[61].w*.5*vec3(.85,.93,1.1)*smoothstep(-bw,bw,min(Q.x-V[60].x,V[60].w-Q.x))*smoothstep(-bw,bw,2.-Q.y)*max(0.,-dl.y);}
#endif
    if(id==1||id==8){
      // varnish and oiled wood: the sun's sheen; the floor also takes the window's soft reflection
      vec3 h=normalize(-LS-d);float nh=max(dot(h,N),0.),r2=id==1?.09:.2;float D=r2/(3.14159*pow(nh*nh*(r2-1.)+1.,2.));
      float nv=max(-dot(d,N),.05),fr=.04+.96*pow(1.-nv,5.);
      vec3 sh=SUNE*V[8].rgb*sv*D*fr*gloss*.12/nv*max(0.,dot(N,-LS))*2.;
      cl+=sh*(1.1/(1.1+max(sh.r,max(sh.g,sh.b))));   // the sun's sheen, rolled off so the patch never burns
      vec3 rd=reflect(d,N);
      if(id==1&&rd.x<0.){float tw=(-XL-P.x)/rd.x;vec3 Q=P+rd*tw;float bl=.02+.12*tw;
        float wm=smoothstep(-bl,bl,min(min(Q.z-V[6].x,V[6].y-Q.z),min(Q.y-V[6].z,V[6].w-Q.y)));
        cl+=V[8].w*2.*mix(V[9].rgb,vec3(1.),.35)*wm*fr*gloss*.32;}
    }
    if(id==6){
      float fol=smoothstep(.42,.7,textureLod(uN,d.zy*vec2(.55,.7)+vec2(.3,.1),1.5).b*.7+textureLod(uN,d.zy*2.+.4,1.).g*.3);
      // sky through old glass: bluer and darker up high, warmer and paler low down where dust and old rain have dried,
      // and in each pane a dirt fillet along its lower bar
      float H=V[6].w-V[6].z,ly=P.y-V[6].z,yy=clamp(ly/H,0.,1.),ty=V[7].z;
      float fy=ty<.5?fract(ly/(H*.5)):ty<1.5?fract(ly/(H*.25)):ty<2.5?(ly<H*.53?ly/(H*.53):(ly-H*.53)/(H*.47)):yy;
      vec3 tint=mix(vec3(1.05,.96,.83),vec3(.8,.88,1.05),smoothstep(.05,.95,yy));
      vec3 outside=V[8].w*.82*mix(tint,tint*V[9].rgb,.25)*(1.-.5*fol*smoothstep(.1,.45,d.y+.3));
      float sm=textureLod(uN,P.zy*vec2(2.2,1.5)+.31,0.).g*.65+textureLod(uN,P.zy*vec2(11.,7.)+.7,0.).b*.35;
      float pd=wM(P.zy).r*.25-.125;
      outside*=(.6+.32*sm)*(.55+.6*(1.-yy))*(.8+.32*(1.-fy)*(1.-fy))*(1.-.38*smoothstep(.04,.004,pd)*(1.-fy));
      // the bars: dark against the glass, the side the sun wraps round glows
      cl+=sideF*SUNE*V[8].rgb*.012*(1.+sm);
      cl=mix(cl,outside,glassF*.92);
    }
    col+=cl*wgt;
  }
  o=vec4(col*V[21].x,t*V[21].y);
}
#endif
`,Re=Xt+`
uniform sampler2D uA;
out vec4 o;
float slab(vec3 C,vec3 d,vec3 n,float ka,float kb,inout float ta,inout float tb){
  float k0=dot(n,C),dn=dot(n,d),lo=min(ka,kb)-.03,hi=max(ka,kb)+.03;
  if(abs(dn)<1e-6){if(k0<lo||k0>hi)tb=-1.;return 0.;}
  float a=(lo-k0)/dn,b=(hi-k0)/dn;ta=max(ta,min(a,b));tb=min(tb,max(a,b));return 0.;
}
void main(){
  vec3 d=rayDir(gl_FragCoord.xy),C=CAM;
  vec4 A=texelFetch(uA,ivec2(gl_FragCoord.xy),0);
  float tE=A.a/V[21].y;
  float coc=clamp(APER*abs(1./tE-1./ZF)*SZ*.6,0.,6.*SZ/1000.);
  vec3 col=A.rgb;float ws=1.;
  for(int i=0;i<12;i++){float an=float(i)*2.39996,rr=sqrt((float(i)+.5)/12.)*coc;
    vec2 of=vec2(cos(an),sin(an))*rr;vec4 s=texture(uA,(gl_FragCoord.xy+of)/SZ);
    float sc=clamp(APER*abs(1./(s.a/V[21].y)-1./ZF)*SZ*.6,0.,6.);float w=clamp(sc-rr+1.,0.,1.)*step(.6,coc);
    col+=s.rgb*w;ws+=w;}
  col/=ws;
  // the beam: clip the ray to the aperture's prism, then march its sun visibility
  vec3 n1=normalize(cross(vec3(0,0,1),LS)),n2=normalize(cross(vec3(0,1,0),LS));
  float ta=.12,tb=tE-.01;
  if(d.x<0.)tb=min(tb,(-XL-C.x)/d.x);
  slab(C,d,n1,dot(n1,vec3(-XL,V[6].z,0.)),dot(n1,vec3(-XL,V[6].w,0.)),ta,tb);
  slab(C,d,n2,dot(n2,vec3(-XL,0.,V[6].x)),dot(n2,vec3(-XL,0.,V[6].y)),ta,tb);
  float S=0.;
  if(tb>ta){float j=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));
    float dt=(tb-ta)/56.;
    for(int i=0;i<56;i++){vec3 P=C+d*(ta+(float(i)+j)*dt);S+=vis(P);}
    S*=dt;}
  float cs=dot(LS,-d);
  float ph=.75*hg(cs,.72)+.25*hg(cs,.15);
#ifdef DOOR
  {vec3 dl=V[61].xyz,m1=normalize(cross(vec3(0,1,0),dl)),m2=normalize(cross(vec3(1,0,0),dl));float da=.12,db=tE-.01;
    slab(C,d,m1,dot(m1,vec3(V[60].x,0.,-ZB)),dot(m1,vec3(V[60].w,0.,-ZB)),da,db);slab(C,d,m2,dot(m2,vec3(0.,0.,-ZB)),dot(m2,vec3(0.,2.,-ZB)),da,db);
    col+=max(db-da,0.)*V[61].w*.05*vec3(.85,.93,1.1)*V[21].x*(.4+.6*hg(dot(dl,-d),.6));}
#endif
  o=vec4(col,S*ph*V[21].z);
}`,zo=Xt+`
uniform sampler2D uP,uVel;
out vec4 o;
uint hs(uint x){x^=x>>16;x*=0x7feb352du;x^=x>>15;x*=0x846ca68bu;x^=x>>16;return x;}
float hf(uint x){return float(hs(x))*(1./4294967296.);}
void main(){
  ivec2 ip=ivec2(gl_FragCoord.xy);uint id=uint(ip.y*128+ip.x);
  vec4 s=texelFetch(uP,ip,0);
  vec3 bmn=V[16].xyz,bsz=V[17].xyz;vec3 P=bmn+s.xyz*bsz;
  float dt=V[19].x,T=V[15].z;uint fr=uint(V[15].w);
  float u1=hf(id*3u+1u),dm=V[20].w*6.*pow(1.-u1*.985,-.5);
  bool fib=hf(id*3u+2u)<V[16].w;
  float vs=fib?.008:1.6e-5*dm*dm;
  float a=dot(P-CAM,RT);
  vec2 g=vec2((a-V[13].w)/V[14].w,P.y/V[15].x);
  vec2 ve=texture(uVel,g).rg;
  vec3 v=RT*ve.x+vec3(0.,ve.y,0.);
  // small eddies the grid can't hold: smooth random velocity per mote
  float ha=hf(id*5u+7u)*256.,hb=hf(id*5u+9u)*256.;
  vec3 e=vec3(textureLod(uN,vec2(T*.6+ha,hb)/32.,0.).g,textureLod(uN,vec2(hb,T*.6+ha)/32.,0.).b,textureLod(uN,vec2(T*.6+hb,ha+.5)/32.,0.).g)-.5;
  v+=e*V[19].y;
  v.y-=vs;
  // Brownian jitter (only the finest motes notice)
  vec3 r=vec3(hf(id*977u+fr*3u),hf(id*977u+fr*3u+1u),hf(id*977u+fr*3u+2u))-.5;
  P+=v*dt+r*sqrt(dt)*.004*(6./dm);
  float age=s.w+dt;
  // walls reflect; the floor takes motes that settle and new ones drift in high up
  if(P.x<bmn.x)P.x=2.*bmn.x-P.x;if(P.x>bmn.x+bsz.x)P.x=2.*(bmn.x+bsz.x)-P.x;
  if(P.y>bmn.y+bsz.y)P.y=2.*(bmn.y+bsz.y)-P.y;
  if(P.z<bmn.z){P.z+=bsz.z;age=0.;}if(P.z>bmn.z+bsz.z){P.z-=bsz.z;age=0.;}
  if(P.y<bmn.y){P=bmn+bsz*vec3(hf(id*31u+fr),.45+.55*hf(id*37u+fr),hf(id*41u+fr));age=0.;}
  o=vec4(clamp((P-bmn)/bsz,0.,1.),min(age,60.));
}`,Vo=Xt+`
uniform sampler2D uP,uQ,uD;
out vec3 vC;flat out vec3 vH;flat out float vZ,vK;
uint hs(uint x){x^=x>>16;x*=0x7feb352du;x^=x>>15;x*=0x846ca68bu;x^=x>>16;return x;}
float hf(uint x){return float(hs(x))*(1./4294967296.);}
void main(){
  int iid=gl_VertexID;ivec2 ip=ivec2(iid&127,iid>>7);uint id=uint(iid);
  vec4 s=texelFetch(uP,ip,0),sq=texelFetch(uQ,ip,0);
  vec3 bmn=V[16].xyz,bsz=V[17].xyz;
  vec3 P=bmn+s.xyz*bsz,Pq=bmn+sq.xyz*bsz;
  if(distance(P,Pq)>.15)Pq=P;
  float T=V[15].z;
  float u1=hf(id*3u+1u),dm=V[20].w*6.*pow(1.-u1*.985,-.5);
  bool fib=hf(id*3u+2u)<V[16].w;
  float v=vis(P);
  vec3 rel=P-CAM;float z=dot(rel,FW);
  vec3 rq=Pq-CAM;float zq=max(dot(rq,FW),.1);
  vec2 b=(vec2(dot(rel,RT),dot(rel,UPV))/(max(z,.1)*TANH)*.5+.5)*SZ;
  vec2 a=(vec2(dot(rq,RT),dot(rq,UPV))/(zq*TANH)*.5+.5)*SZ;
  float cs=dot(LS,normalize(CAM-P));
  float g=fib?.6:mix(.62,.82,clamp((dm-6.)/30.,0.,1.));
  float ph=.8*hg(cs,g)+.2;
  // tumbling flakes glint; fibres flash as they turn broadside
  float w1=.7+2.3*hf(id*7u+3u),w2=.5+1.9*hf(id*7u+4u),p1=hf(id*7u+5u)*6.28,p2=hf(id*7u+6u)*6.28;
  float tw=fib?.25+2.2*pow(abs(sin(T*w1*.6+p1)),12.):.45+.55*sin(T*w1+p1)*sin(T*w2+p2)+1.6*pow(max(0.,sin(T*w1*1.3+p1)*cos(T*w2*.7+p2)),9.)*step(.55,hf(id*7u+8u));
  float fade=smoothstep(0.,1.2,s.w);
  float d10=dm*.1;
  vec2 gd=vec2((dot(P-CAM,RT)-V[13].w)/V[14].w,P.y/V[15].x);float cn=textureLod(uD,gd,0.).r*2.;
  bool spk=hf(id*13u+5u)<V[54].y;
  float E=SUNE*v*ph*d10*1.3*V[20].z*max(tw,0.)*fade*(fib?2.5:1.)*pow(cn,1.6)*(spk?4.:1.);
  // sizes: most motes a faint sub-pixel point, the middling ones small and sharp, a few (the larger grains) soft discs
  // with a brighter rim, as if nearer the lens than the focus
  float uc=hf(id*7u+9u);bool dsc=!fib&&uc<.1+.2*clamp((dm-8.)/24.,0.,1.);
  float rc=APER*(dsc?2.+2.5*hf(id*7u+10u):.3)*abs(1./max(z,.1)-1./ZF)*SZ;
  float r0=max(.55,(.55+.45*clamp((dm-7.)/22.,0.,1.))*SZ/1000.);
  float r=min(sqrt(rc*rc+r0*r0),40.*SZ/1000.);
  vec2 dv=b-a;float ln=length(dv);
  vK=0.;
  if(fib&&ln<.5){float fl=(4.+9.*hf(id*11u))*SZ/1000.,an=p1+T*(.12+.3*hf(id*11u+1u))*(p2>3.14?1.:-1.);dv=vec2(cos(an),sin(an))*fl;a=b-dv;ln=fl;vK=(hf(id*11u+2u)-.5)*.9;}
  float area=(r<1.6?1.5708*r*r:2.5*r*r)+2.*r*ln*(r<1.6?.886:1.);
  float pk=E*pow(SZ*1e-3,1.4)/area;pk=pk*1.25/(1.+(spk?.2:.75)*pk);
  float sz=min(2.*(r+1.5)+ln,V[22].x);
  bool cull=v<.003||z<.12||pk<(dsc?.0003:.0008);
  gl_Position=cull?vec4(2.,2.,2.,1.):vec4((a+b)/SZ-1.,0.,1.);
  gl_PointSize=cull?1.:sz;
  vC=V[8].rgb*(spk?vec3(1.):vec3(1.,.9,.72))*pk*V[21].w;vH=vec3(dv*.5,r);vZ=sz;
}`,Po=`#version 300 es
precision highp float;
in vec3 vC;flat in vec3 vH;flat in float vZ,vK;out vec4 o;
void main(){
  vec2 lp=vec2(gl_PointCoord.x-.5,.5-gl_PointCoord.y)*vZ;
  vec2 h=vH.xy;float t=clamp(dot(lp,h)/max(dot(h,h),1e-4),-1.,1.);
  float d=length(lp-h*t-vec2(-h.y,h.x)*vK*(1.-t*t)),r=vH.z;
  float k=r<1.6?exp(-d*d/(r*r*.5)):smoothstep(r,r*.72,d)*(.82+.3*smoothstep(.2*r,r,d));
  o=vec4(vC*k,1.);
}`,Eo=Xt+`
uniform sampler2D uB,uM,uD;
out vec4 o;
void main(){
  vec2 uv=gl_FragCoord.xy/SZ;
  vec4 B=texture(uB,uv);
  vec3 d=rayDir(gl_FragCoord.xy);
  float tp=V[15].y/max(dot(d,V[14].xyz),.05);vec3 P=CAM+d*tp;
  vec2 g=vec2((dot(P-CAM,RT)-V[13].w)/V[14].w,P.y/V[15].x);
  float cn=pow(texture(uD,g).r*2.,1.7);
  vec3 col=B.rgb/V[21].x+(B.a/V[21].z)*V[20].y*SUNE*cn*V[8].rgb+texture(uM,uv).rgb/V[21].w;
  col*=V[20].x;
  col=(col*(2.51*col+.03))/(col*(2.43*col+.59)+.14);
  col=pow(clamp(col,0.,1.),vec3(1./2.2));
  vec2 sc=uv*2.-1.;col*=1.-.05*pow(dot(sc,sc)*.5,1.4);
  float gr=texture(uN,gl_FragCoord.xy/256.).a-.5;
  col+=gr*(1.5/255.);
  o=vec4(col,1.);
}`;let z=e.__c405;if(!z){z=e.__c405={tgt:{}};const t=(d,v)=>{const x=e.createShader(d);return e.shaderSource(x,v),e.compileShader(x),x},o=t(e.VERTEX_SHADER,wo),a=(d,v)=>{const x=e.createProgram(),R=typeof d=="string"?t(e.VERTEX_SHADER,d):d,w=t(e.FRAGMENT_SHADER,v);return e.attachShader(x,R),e.attachShader(x,w),e.linkProgram(x),e.flush(),{p:x,f:w,v:R}},s=`#version 300 es
`;z.def=(d,v)=>d.replace(s,s+v);const r={w:a(o,go),a:a(o,$0),h:a(o,z.def($0,`#define CHAIR
`)),b:a(o,Re),u:a(o,zo),m:a(Vo,Po),c:a(o,Eo)};z.mk=a,z.vq=o,z.init=d=>{const v=r[d];if(v.V!==void 0)return;if(!e.getProgramParameter(v.p,e.LINK_STATUS))throw new Error("405 "+d+": "+e.getProgramInfoLog(v.p)+" "+e.getShaderInfoLog(v.f)+" "+e.getShaderInfoLog(v.v));e.useProgram(v.p);const x=(R,w)=>{const M=e.getUniformLocation(v.p,R);M&&e.uniform1i(M,w)};x("uA",0),x("uB",0),x("uP",1),x("uQ",2),x("uN",3),x("uVel",4),x("uD",5),x("uM",6),x("uW",8),v.V=e.getUniformLocation(v.p,"V"),v.F=e.getUniformLocation(v.p,"uF")},z.finish=()=>{for(const d in r)z.init(d);z.finish=null},z.ps=r,z.vao=e.createVertexArray(),z.maxPt=Math.max(1,e.getParameter(e.ALIASED_POINT_SIZE_RANGE)[1]||1),z.f32=!!e.getExtension("EXT_color_buffer_float"),z.f16=z.f32||!!e.getExtension("EXT_color_buffer_half_float");const n=256,l=new Uint8Array(n*n*4);let f=4218199;const h=()=>{f=f+1831565813|0;let d=Math.imul(f^f>>>15,1|f);return d=d+Math.imul(d^d>>>7,61|d)^d,(d^d>>>14)>>>0&255},c=32,i=new Float32Array(c*c),b=new Float32Array(c*c);for(let d=0;d<c*c;d++)i[d]=h()/255,b[d]=h()/255;const p=d=>d*d*(3-2*d),L=(d,v,x)=>{const R=Math.floor(v),w=Math.floor(x),M=p(v-R),q=p(x-w),H=(g,Q)=>d[(Q%c+c)%c*c+(g%c+c)%c];return(H(R,w)*(1-M)+H(R+1,w)*M)*(1-q)+(H(R,w+1)*(1-M)+H(R+1,w+1)*M)*q};for(let d=0;d<n;d++)for(let v=0;v<n;v++){const x=(d*n+v)*4;l[x]=h(),l[x+3]=h(),l[x+1]=Math.round(L(i,v/8,d/8)*255),l[x+2]=Math.round(L(b,v/8,d/8)*255)}z.noise=e.createTexture(),e.bindTexture(e.TEXTURE_2D,z.noise),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,n,n,0,e.RGBA,e.UNSIGNED_BYTE,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.generateMipmap(e.TEXTURE_2D)}const B=z.ps;ut==="Door Ajar"&&!B.aD&&(B.aD=z.mk(z.vq,z.def($0,`#define DOOR
`)),B.bD=z.mk(z.vq,z.def(Re,`#define DOOR
`)));const wt=(t,o,a,s,r,n,l)=>{const f=e.createTexture();return e.bindTexture(e.TEXTURE_2D,f),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,s,r,l||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),f},i0=t=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o},Ht=z.f16,dt=Ht?[e.RGBA16F,e.RGBA,e.HALF_FLOAT]:[e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE];let Y=z.tgt[j];Y||(Y=z.tgt[j]={},Y.a=wt(j,j,dt[0],dt[1],dt[2],e.LINEAR),Y.af=i0(Y.a),Y.m=wt(j,j,dt[0],dt[1],dt[2],e.NEAREST),Y.mf=i0(Y.m));const Fe=wt(j,j,dt[0],dt[1],dt[2],e.LINEAR),To=i0(Fe),jt=128,Ot=new Float32Array(Nt*4),Ao=Math.max(...F.map(t=>t[0])),Lo=Math.max(...F.map(t=>t[1])),De=Math.max(-X0+.02,vt-.45),Mo=Math.min(C[2]-.3,Lo+.45),ko=Math.min(ze-.01,Ao+.45),te=[-_t+.01,.004,De],ee=[ko+_t-.01,H0-.01,Mo-De];for(let t=0;t<Nt;t++){const o=t<16384?V:U;Ot[t*4]=o(),Ot[t*4+1]=o(),Ot[t*4+2]=o(),Ot[t*4+3]=2+o()*30}const Ce=Ht;let Gt;if(z.f32)Gt=[0,1].map(()=>wt(jt,Nt/jt,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,Ot));else{const t=new Uint16Array(Nt*4);for(let o=0;o<Nt*4;o++)t[o]=Rt(Ot[o]);Gt=[0,1].map(()=>wt(jt,Nt/jt,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST,t))}const So=Ce?Gt.map(i0):[null,null];e.bindFramebuffer(e.FRAMEBUFFER,null);function Rt(t){const o=Rt.f||(Rt.f=new Float32Array(1)),a=Rt.u||(Rt.u=new Uint32Array(o.buffer));o[0]=t;const s=a[0],r=s>>>16&32768;let n=(s>>>23&255)-112,l=s&8388607;return n<=0?r:n>=31?r|31744:r|n<<10|l+4096>>>13}const P=40,A=Math.round(40*Bt/n0),No=P*A,Ft=n0/P,it=Bt/A,m=P+2,Ro=A+2,J=m*Ro;let E=new Float32Array(J),T=new Float32Array(J),X=new Float32Array(J),oe=new Float32Array(J),ae=new Float32Array(J),se=new Float32Array(J);const N=new Float32Array(J),_e=new Float32Array(J),Wt=new Float32Array(J),_=72,Z=Math.round(72*Bt/n0),gt=_*Z;let $=new Float32Array(gt),re=new Float32Array(gt);const ne=new Float32Array(gt),qe=new Uint8Array(gt),ie=new Uint16Array(No*2),le=(t,o)=>(t-C[0])*St[0]+(o-C[2])*St[2],A0=t=>(t-ke)/Ft-.5,Ue=A0(Math.min(...F.map(t=>le(t[0],t[1])))),Ie=A0(Math.max(...F.map(t=>le(t[0],t[1])))),Fo=A0(le(-_t,(vt+Lt)/2)),ce=bt/it-.5,Do=qt/it-.5,Be=ut==="Leaky Sash",Co=ut==="Door Ajar",_o=.5+.4*V(),L0=new Float32Array(J),l0=new Float32Array(J),fe=new Float32Array(J);for(let t=0;t<A;t++)for(let o=0;o<P;o++){const a=(t+1)*m+o+1;t<=1&&o>=Ue&&o<=Ie&&(L0[a]=.9,l0[a]=1.5),Be&&o<=Math.max(1,Fo+1.5)&&t>=ce-1&&t<=ce+1.5&&(L0[a]=-1.2,l0[a]=1.5,fe[a]=.05),!Be&&o<=1&&t>=ce&&t<=Do&&(L0[a]=-.25,l0[a]=.4),Co&&o>=P-3&&t*it<_o+1.2&&t*it>.05&&(fe[a]=-.1)}const c0=[U()*6.28,U()*6.28,U()*6.28,.8+.5*U()],Xe=O==="Swept Up",He=O==="Flour";for(let t=0;t<Z;t++)for(let o=0;o<_;o++){const a=o/_,s=t/Z,r=.9*Math.sin(a*4.1+c0[0])+.7*Math.sin(s*5.3-a*2.2+c0[1]),n=.5+.5*Math.sin(s*37*c0[3]+2.6*Math.sin(a*6.3+1.1+r)+1.4*Math.sin(a*13.1-s*8.7+c0[2])),l=.5+.5*Math.sin(a*19-s*11+2.2*Math.sin(s*7.1+c0[2])+1.5*r),h=.38+.3*(Math.max(n*n*n,.7*l*l*l*l)*(He?.4:Xe?.35:1)+(Xe?.95*Math.exp(-s*4.2)*(.75+.25*l):0))+.06*Math.sin(a*9.1+s*4.3+1.3)*Math.sin(s*13.7-a*3.1)+.08*(V()-.5);ne[t*_+o]=Math.max(.08,Math.min(.95,h)),$[t*_+o]=ne[t*_+o]}const Qo=(t,o,a)=>{o+=1,a+=1,o=o<.5?.5:o>P+.499?P+.499:o,a=a<.5?.5:a>A+.499?A+.499:a;const s=o|0,r=a|0,n=o-s,l=a-r,f=r*m+s;return(t[f]*(1-n)+t[f+1]*n)*(1-l)+(t[f+m]*(1-n)+t[f+m+1]*n)*l},Ko=(t,o)=>{t=t<0?0:t>_-1.001?_-1.001:t,o=o<0?0:o>Z-1.001?Z-1.001:o;const a=t|0,s=o|0,r=t-a,n=o-s,l=s*_+a;return($[l]*(1-r)+$[l+1]*r)*(1-n)+($[l+_]*(1-r)+$[l+_+1]*r)*n},de=()=>{for(let t=1;t<=A;t++){const o=t*m;E[o]=-E[o+1],T[o]=T[o+1],X[o]=X[o+1],E[o+P+1]=-E[o+P],T[o+P+1]=T[o+P],X[o+P+1]=X[o+P]}for(let t=0;t<m;t++){const o=t,a=(A+1)*m+t;T[o]=-T[o+m],E[o]=E[o+m],X[o]=X[o+m],T[a]=-T[a-m],E[a]=E[a-m],X[a]=X[a-m]}},M0=[],k0=1/(2*Ft),S0=1/(2*it),je=1/(Ft*Ft),Oe=1/(it*it),qo=1/(2*je+2*Oe),Uo=t=>{for(let o=0;o<t;o++){for(let a=1;a<=A;a++){const s=a*m;N[s]=N[s+1],N[s+P+1]=N[s+P]}for(let a=1;a<=P;a++)N[a]=N[a+m],N[(A+1)*m+a]=N[A*m+a];for(let a=1;a<=A;a++)for(let s=a*m+1,r=s+P;s<r;s++){const n=N[s];N[s]=n+1.75*(((N[s-1]+N[s+1])*je+(N[s-m]+N[s+m])*Oe-_e[s])*qo-n)}}},Ge=(t,o)=>{o&&Qe(t);const a=.033*t,s=Math.exp(-t/25),r=Math.exp(-t*.06);for(let c=1;c<=A;c++)for(let i=c*m+1,b=i+P;i<b;i++)l0[i]>0&&(X[i]+=(L0[i]-X[i])*t*l0[i]),E[i]=(E[i]+fe[i]*t)*r,T[i]=(T[i]+a*X[i])*r,X[i]*=s;for(const c of M0){const i=A0(c.a),b=c.y/it-.5,p=c.r/Ft,L=Math.max(0,Math.floor(i-2.5*p)),d=Math.min(P-1,Math.ceil(i+2.5*p)),v=Math.max(0,Math.floor(b-2.5*p)),x=Math.min(A-1,Math.ceil(b+2.5*p));for(let R=v;R<=x;R++)for(let w=L;w<=d;w++){const M=(w-i)/p,q=(R-b)/p,H=Math.exp(-(M*M+q*q)),g=(R+1)*m+w+1;if(c.clap){const Q=Math.sqrt(M*M+q*q)+.3;E[g]+=c.p*H*M/Q,T[g]+=c.p*H*q/Q*.5}else E[g]+=(c.vx-E[g])*H*c.p,T[g]+=(c.vy-T[g])*H*c.p}}M0.length=0,de();for(let c=1;c<=A;c++)for(let i=c*m+1,b=i+P;i<b;i++)Wt[i]=(T[i+1]-T[i-1])*k0-(E[i+m]-E[i-m])*S0;const n=.12*Ft*t;for(let c=2;c<A;c++)for(let i=c*m+2,b=i+P-2;i<b;i++){const p=(Math.abs(Wt[i+1])-Math.abs(Wt[i-1]))*k0,L=(Math.abs(Wt[i+m])-Math.abs(Wt[i-m]))*S0,d=n*Wt[i]/(Math.sqrt(p*p+L*L)+1e-5);E[i]+=L*d,T[i]-=p*d}const l=t/Ft,f=t/it;for(let c=1;c<=A;c++)for(let i=1;i<=P;i++){const b=c*m+i;let p=i-1-E[b]*l+1,L=c-1-T[b]*f+1;p=p<.5?.5:p>P+.499?P+.499:p,L=L<.5?.5:L>A+.499?A+.499:L;const d=p|0,v=L|0,x=p-d,R=L-v,w=v*m+d,M=1-x,q=1-R;oe[b]=(E[w]*M+E[w+1]*x)*q+(E[w+m]*M+E[w+m+1]*x)*R,ae[b]=(T[w]*M+T[w+1]*x)*q+(T[w+m]*M+T[w+m+1]*x)*R,se[b]=(X[w]*M+X[w+1]*x)*q+(X[w+m]*M+X[w+m+1]*x)*R}let h=E;E=oe,oe=h,h=T,T=ae,ae=h,h=X,X=se,se=h,de();for(let c=1;c<=A;c++)for(let i=c*m+1,b=i+P;i<b;i++)_e[i]=(E[i+1]-E[i-1])*k0+(T[i+m]-T[i-m])*S0},We=()=>{Uo(9);for(let t=1;t<=A;t++){const o=t*m;N[o]=N[o+1],N[o+P+1]=N[o+P]}for(let t=1;t<=P;t++)N[t]=N[t+m],N[(A+1)*m+t]=N[A*m+t];for(let t=1;t<=A;t++)for(let o=t*m+1,a=o+P;o<a;o++){let s=E[o]-(N[o+1]-N[o-1])*k0,r=T[o]-(N[o+m]-N[o-m])*S0;E[o]=s>2?2:s<-2?-2:s,T[o]=r>2?2:r<-2?-2:r}de()},Io=t=>{Ge(t,!1),We()},Ze=new Int32Array(gt),N0=new Float64Array(gt*2),R0=new Float64Array(gt*2);for(let t=0;t<Z;t++)for(let o=0;o<_;o++){const a=t*_+o;let s=(o+.5)*(P/_)-.5,r=(t+.5)*(A/Z)-.5;s+=1,r+=1,s=s<.5?.5:s>P+.499?P+.499:s,r=r<.5?.5:r>A+.499?A+.499:r;const n=s|0,l=r|0,f=s-n,h=r-l;Ze[a]=l*m+n,N0[2*a]=1-f,N0[2*a+1]=f,R0[2*a]=1-h,R0[2*a+1]=h}const Qe=t=>{let o;const a=t/15,s=t*_/n0,r=t*Z/Bt;for(let n=0,l=0;n<Z;n++)for(let f=0;f<_;f++,l++){const h=Ze[l],c=N0[2*l],i=N0[2*l+1],b=R0[2*l],p=R0[2*l+1],L=(E[h]*c+E[h+1]*i)*b+(E[h+m]*c+E[h+m+1]*i)*p,d=(T[h]*c+T[h+1]*i)*b+(T[h+m]*c+T[h+m+1]*i)*p;let v=f-L*s,x=n-d*r;v=v<0?0:v>_-1.001?_-1.001:v,x=x<0?0:x>Z-1.001?Z-1.001:x;const R=v|0,w=x|0,M=v-R,q=x-w,H=w*_+R,g=($[H]*(1-M)+$[H+1]*M)*(1-q)+($[H+_]*(1-M)+$[H+_+1]*M)*q;re[l]=g+(ne[l]-g)*a}o=$,$=re,re=o};for(let t=1;t<=A;t++)for(let o=1;o<=P;o++)o-1>=Ue-1&&o-1<=Ie+1&&(X[t*m+o]=.5*Math.exp(-(t-1)*it/1.2));for(let t=0;t<10;t++)Io(.45),t>7&&Qe(.45);z.finish&&z.finish(),ut==="Door Ajar"&&(z.init("aD"),z.init("bD"));const Ke=ut==="Door Ajar"?B.aD:B.a,Ye=ut==="Door Ajar"?B.bD:B.b,Je=wt(P,A,e.RG16F,e.RG,e.HALF_FLOAT,e.LINEAR),he=wt(_,Z,e.R8,e.RED,e.UNSIGNED_BYTE,e.LINEAR),F0=t=>{if(e.activeTexture(e.TEXTURE7),e.pixelStorei(e.UNPACK_ALIGNMENT,1),t){for(let o=0;o<gt;o++){const a=$[o]*255;qe[o]=a<0?0:a>255?255:a}e.bindTexture(e.TEXTURE_2D,he),e.texSubImage2D(e.TEXTURE_2D,0,0,0,_,Z,e.RED,e.UNSIGNED_BYTE,qe),e.pixelStorei(e.UNPACK_ALIGNMENT,4);return}for(let o=0,a=0;o<A;o++)for(let s=(o+1)*m+1,r=s+P;s<r;s++,a+=2)ie[a]=Rt(E[s]),ie[a+1]=Rt(T[s]);e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,Je),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texSubImage2D(e.TEXTURE_2D,0,0,0,P,A,e.RG,e.HALF_FLOAT,ie),e.pixelStorei(e.UNPACK_ALIGNMENT,4)};F0(!1),F0(!0);const u=new Float32Array(64*4),xe=Ct==="Lime White"?[.66,.63,.57]:Ct==="Grey Green"?[.36,.42,.38]:Ct==="Oxblood"?[.36,.13,.1]:[.62,.5,.42];u.set([C[0],C[1],C[2],W],0),u.set([D.f[0],D.f[1],D.f[2],uo],4),u.set([D.r[0],D.r[1],D.r[2],.03],8),u.set([D.u[0],D.u[1],D.u[2],j],12),u.set([K[0],K[1],K[2],Pe],16),u.set([_t,no,io,X0],20),u.set([vt,Lt,bt,qt],24),u.set([ze,H0,["Four Panes","Six Over Six","Two Panes","Leaded Diamonds","Louvred Shutter"].indexOf(Jt),["Clear","Old Crown","Cracked Pane"].indexOf(B0)],28),u.set([O0[0],O0[1],O0[2],G==="Last Light"?.55:1],32),u.set([G0[0],G0[1],G0[2],["Oak Boards","Pine Boards","Painted Boards","Scrubbed Deal"].indexOf(et)],36),u.set([xe[0],xe[1],xe[2],["Lime White","Grey Green","Oxblood","Bare Plaster"].indexOf(Ct)],40),u.set([F[0][0],F[0][1],F[1][0],F[1][1]],44),u.set([F[2][0],F[2][1],F[3][0],F[3][1]],48),u.set([St[0],St[1],St[2],ke],52),u.set([kt[0],kt[1],kt[2],n0],56),u.set([Bt,T0,0,0],60),u.set([te[0],te[1],te[2],bo],64),u.set([ee[0],ee[1],ee[2],Se],68),u.set([vt+Ve*(.2+.3*V()),bt+.15+.35*V(),.3+.9*V(),.35+.3*V()],72);const Bo=et==="Scrubbed Deal"?1.8:et==="Pine Boards"?1.45:et==="Painted Boards"?1:1.05;u.set([1/30,.018,0,V()*100],76);const Xo=et==="Scrubbed Deal"?.55:et==="Pine Boards"?.4:.3,Ho=Pe*Math.sin(p0)/Math.PI*Xo*(G==="Last Light"?.7:1);u.set([1.25*Math.min(1,.7/(1.25*Ho)),yo*.8,vo,po],80),u[217]=He?0:.02,u.set(Ht?[1,1,1,1]:[.25,1/12,.25,.25],84),u[78]=Bo,u[88]=Math.min(z.maxPt,160);const Zt=[],y=(t,o,a,s,r,n,l,f,h)=>Zt.push([t,o,a,s,r,n,l||0,f||0,h||0]);let f0=k==="Ladder-back Chair"?1:0;const jo=V(),Oo=V(),Go=V();if(I.home){const t=.44+.02*jo,o=.019,a=.92+.08*Oo,s=-.07,r=.17,n=-.168,l=.172;y(0,t-.006,.002,.2,.025,.192,4,0,.1),y(-.195,t/2,l,o,t/2,o,1),y(.195,t/2,l,o,t/2,o,1),y(-.168,t/2,n+s*t/2,o,t/2+.01,o,1,0,s),y(.168,t/2,n+s*t/2,o,t/2+.01,o,1,0,s);const f=(t+a)/2,h=i=>n-r*(i-t);y(-.168,f,h(f),o*.94,(a-t)/2,o,1,0,r),y(.168,f,h(f),o*.94,(a-t)/2,o,1,0,r),y(-.181,.15,0,.0105,.172,.0105,2),y(.181,.15,0,.0105,.172,.0105,2),y(0,.24,l,.011,.196,.011,3),y(-.181,.29,0,.0095,.172,.0095,2),y(.181,.29,0,.0095,.172,.0095,2),y(0,.12,l,.0105,.196,.0105,3);const c=3+(Go<.4?1:0);for(let i=0;i<c;i++){const b=a-.05-i*(a-t-.15)/(c-.4),p=.03+(i===0?.012:0);y(0,b,h(b),.168,p,.0045,5,0,r)}}else if(k!=="Empty Room"){const t=[];for(let o=0;o<14;o++)t.push(yt());if(k==="Tall Stool"){const o=.62+.1*t[0],a=.15+.02*t[4],s=.017+.003*t[3],r=Math.tan((6+3*t[5])*Math.PI/180),n=a-.03,l=o-.03,f=p=>n+r*(l-p),h=l/2+.008;y(0,o-.015,0,a,.015,a,4,0,0);for(const[p,L]of[[-1,1],[1,1],[-1,-1],[1,-1]])y(p*f(h),h,L*f(h),s,h,s,1,p*r,L*r);const c=.11+.04*t[6],i=o*(.5+.08*t[7]),b=.0105;y(0,c-.025,f(c-.025),b,f(c-.025)+.006,b,3),y(0,c,-f(c),b,f(c)+.006,b,3),y(-f(c+.03),c+.03,0,b,f(c+.03)+.006,b,2),y(f(c+.03),c+.03,0,b,f(c+.03)+.006,b,2),y(-f(i),i,0,.0095,f(i)+.006,.0095,2),y(f(i),i,0,.0095,f(i)+.006,.0095,2),f0=0}else if(k==="Bench"){const o=.43+.04*t[0],a=Math.min(.5+.05*t[4],Math.max(.45,(P0*Math.cos(j0)-.06)/2)),s=.12+.02*t[5],r=Math.tan((5+3*t[6])*Math.PI/180),n=a-.1,l=o-.03,f=.1+.04*t[7],h=s-.012,c=p=>n+r*(l-p);y(0,o-.015,0,a,.015,s,0);for(const[p,L]of[[-1,1],[1,1],[-1,-1],[1,-1]])y(p*c(f/2),f/2,L*(h-.032),.013,f/2,.032,0,p*r);const i=(f+l)/2;y(-c(i),i,0,.013,(l-f)/2+.002,h,0,-r),y(c(i),i,0,.013,(l-f)/2+.002,h,0,r);const b=l-.042;y(0,b,0,c(b)+.02,.042,.011,0),f0=0}else{const o=k==="Armchair",a=k==="Child's Chair",s=k!=="Spindle Chair",r=a?.26+.03*t[0]:o?.42+.05*t[0]:.4+.08*t[0],n=a?.58+.06*t[1]:o?1.05+.1*t[1]:.84+.3*t[1],l=.12+.1*t[2],f=-.07,h=a?.014:o?.017+.003*t[3]:.016+.007*t[3],c=a?.145+.015*t[4]:o?.23+.02*t[4]:.18+.05*t[4],i=a?.74:o?1.04:.94+.1*t[5],b=c-.005,p=b-.027*(a?.8:1),L=-.168*i,d=.172*i,v=(b+p)/2,x=a?r/.42:r/.45;f0=a||t[7]<(o?.75:s?.7:.3)?1:0;const R=a?1:t[6]<.34?0:t[6]<.67?1:2,w=o?r+.22+.04*t[11]:r;y(0,r-.006,.002*i,c,f0?a?.02:.025:.016,.192*i,4,0,.1),y(-b,w/2,d,h,w/2,h,1),y(b,w/2,d,h,w/2,h,1),y(-p,r/2,L+f*r/2,h,r/2+.01,h,1,0,f),y(p,r/2,L+f*r/2,h,r/2+.01,h,1,0,f);const M=(r+n)/2,q=S=>L-l*(S-r),H=S=>L+f*(r-S);if(y(-p,M,q(M),h*.94,(n-r)/2,h,1,0,l),y(p,M,q(M),h*.94,(n-r)/2,h,1,0,l),o){const S=q(w),lt=d+.03,Dt=b-.005,ct=.026+.008*t[12];y(-Dt,w-.004,(lt+S)/2,ct,.011,(lt-S)/2,0),y(Dt,w-.004,(lt+S)/2,ct,.011,(lt-S)/2,0)}const g=a?.009:.0105,Q=(d-H(.15*x))/2+.004,ht=(d+H(.15*x))/2;if(R===0){const S=.18*x;y(-v,S,ht,g,Q,g,2),y(v,S,ht,g,Q,g,2),y(0,S+.03,d,g,b+.002,g,3),y(0,S+.03,H(S+.03),g,p+.002,g,3)}else if(R===1)y(-v,.15*x,ht,g,Q,g,2),y(v,.15*x,ht,g,Q,g,2),y(0,.24*x,d,g*1.05,b+.002,g*1.05,3),s&&(y(-v,.29*x,ht,g*.9,Q,g*.9,2),y(v,.29*x,ht,g*.9,Q,g*.9,2),y(0,.12*x,d,g,b+.002,g,3));else{const S=.16*x;y(-v,S,ht,g,Q,g,2),y(v,S,ht,g,Q,g,2),y(0,S,ht,g*.95,v,g*.95,3)}if(s){const S=a?2:o?3+(t[8]<.5?1:0):Math.max(2,Math.min(5,Math.round(2+3*(n-.84)/.3+(t[8]-.5)*.9))),lt=n-.05*(a?.8:1),Dt=r+.15*(a?.7:1);for(let ct=0;ct<S;ct++){const u0=S>1?lt-ct*(lt-Dt)/(S-.4):lt,y0=(a?.026:.024)+.018*(1-ct/Math.max(S-1,1))*(a?.6:1);y(0,u0,q(u0),p,y0,a?.0055:.0045,5,0,l)}}else{y(0,n-.04,q(n-.04),c*.95,.04,.011,5,0,l);const S=Math.min(5+Math.floor(t[8]*4),19-Zt.length),lt=.35+.4*t[9],Dt=p*.75,ct=.0085*Math.sqrt(6/S),u0=(r+n-.08)/2;for(let y0=0;y0<S;y0++){const ro=-Dt+2*Dt*y0/(S-1);y(ro,u0,q(u0),ct,(n-.08-r)/2+.01,ct,1,-ro*lt,l)}}}}u.set([rt-K[0]*1.5,.5-K[1]*1.5,nt-K[2]*1.5,1.6],220);const me=Math.atan2(-(C[0]-rt),C[2]-nt);u[89]=rt,u[90]=nt,u[91]=me+(V()<.5?-1:1)*(.35+.55*V()),I.home&&(u[91]=me+.6);let d0=V()<.7?[.25,.14,.075]:V()<.5?[.36,.25,.15]:[.5,.52,.47];if(!I.home&&k!=="Empty Room"){const t=yt(),o=yt(),a=Math.atan2(-(Ut[0]-rt),Ut[2]-nt),s=l=>l==="to the window"||k==="Bench"?a+(t-.5)*.6:l==="side on"?me+(o<.5?-1:1)*(1.35+.4*t):u[91],r=l=>{const f=Math.cos(l),h=Math.sin(l),c=C[0]-rt,i=C[2]-nt,b=f*c+h*i,p=-h*c+f*i;let L=1e9;for(const d of Zt){const v=Math.abs(d[7])*d[4]+.01,x=Math.hypot(Math.max(Math.abs(b-d[0])-d[3]-v,0),Math.max(Math.abs(C[1]-d[1])-d[4],0),Math.max(Math.abs(p-d[2])-d[5]-Math.abs(d[8])*d[4],0));L=Math.min(L,x)}return L};k==="Bench"?r(s(At))<.15&&(rt+=z0[0]*.3,nt+=z0[1]*.3,u[89]=rt,u[90]=nt,u.set([rt-K[0]*1.5,.5-K[1]*1.5,nt-K[2]*1.5],220)):At!=="three-quarter"&&r(s(At))<.15&&(At="three-quarter"),u[91]=s(At);const n=yt();d0=n<.3?[.25,.14,.075]:n<.44?[.2,.115,.085]:n<.6?[.36,.25,.15]:n<.74?[.28,.245,.2]:n<.86?[.5,.52,.47]:[.24,.115,.085],k==="Bench"&&E0&&(d0=n<1/3?[.36,.25,.15]:n<2/3?[.28,.245,.2]:[.5,.52,.47])}u.set([Zt.length,d0[0],d0[1],d0[2]],92),u[218]=f0,u[219]=8;{const t=-1.15+.45*e0(),o=t+.82,a=.07+.07*e0(),s=o-a/2;let r=rt-s,n=nt+X0;const l=Math.hypot(r,n);r/=l,n/=l;const f=(22+6*e0())*Math.PI/180;u.set([o-a,o,t,o,r*Math.cos(f),-Math.sin(f),n*Math.cos(f),(G==="Last Light"?.55:1)*.55],240)}u.set(et==="Painted Boards"?[1,1,.92]:et==="Scrubbed Deal"?[1.12,.98,.8]:[1.3,.92,.6],252),Zt.forEach((t,o)=>{const a=96+o*8+(o>14?8:0);u.set([t[0],t[1],t[2],t[6]+.5+t[7]],a),u.set([t[3],t[4],t[5],t[8]],a+4)});let D0=null;const ue=()=>{e.bindVertexArray(z.vao),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),e.depthMask(!1),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,z.noise),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,D0)},at=(t,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,o)};ue(),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,null),D0=wt(512,1024,Ht?e.RGBA16F:e.SRGB8_ALPHA8,e.RGBA,Ht?e.HALF_FLOAT:e.UNSIGNED_BYTE,e.LINEAR),mapF=i0(D0),e.bindTexture(e.TEXTURE_2D,null),e.viewport(0,0,512,1024),e.useProgram(B.w.p),e.uniform4fv(B.w.V,u),e.drawArrays(e.TRIANGLES,0,3),at(8,D0),e.bindFramebuffer(e.FRAMEBUFFER,Y.af),e.viewport(0,0,j,j),e.useProgram(Ke.p),e.uniform4fv(Ke.V,u),e.drawArrays(e.TRIANGLES,0,3),Zt.length&&(e.useProgram(B.h.p),e.uniform4fv(B.h.V,u),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.blendEquation(e.FUNC_ADD),e.colorMask(!0,!0,!0,!1),e.uniform1f(B.h.F,0),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND),e.colorMask(!1,!1,!1,!0),e.uniform1f(B.h.F,1),e.drawArrays(e.TRIANGLES,0,3),e.colorMask(!0,!0,!0,!0)),e.bindFramebuffer(e.FRAMEBUFFER,To),e.viewport(0,0,j,j),at(0,Y.a),e.useProgram(Ye.p),e.uniform4fv(Ye.V,u),e.drawArrays(e.TRIANGLES,0,3);let C0=0,_0=1,Wo=0,zt=0;const $e=t=>{if(!Ce)return;u[76]=t,u[63]=++Wo,e.bindFramebuffer(e.FRAMEBUFFER,So[_0]),e.viewport(0,0,jt,Nt/jt),at(1,Gt[C0]),at(4,Je),e.useProgram(B.u.p),e.uniform4fv(B.u.V,u),e.drawArrays(e.TRIANGLES,0,3);const o=C0;C0=_0,_0=o},to=()=>{u[62]=zt,ue(),e.bindFramebuffer(e.FRAMEBUFFER,Y.mf),e.viewport(0,0,j,j),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),at(1,Gt[C0]),at(2,Gt[_0]),at(5,he),e.useProgram(B.m.p),e.uniform4fv(B.m.V,u),e.drawArrays(e.POINTS,0,Se),e.disable(e.BLEND),e.flush(),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,j,j),at(0,Fe),at(5,he),at(6,Y.m),at(3,z.noise),e.useProgram(B.c.p),e.uniform4fv(B.c.V,u),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE0)};$e(1/30),to();const tt=I.input,q0=I.sound,eo=(t,o)=>{const a=2*t-1,s=1-2*o,r=[D.f[0]+D.r[0]*a*W+D.u[0]*s*W,D.f[1]+D.r[1]*a*W+D.u[1]*s*W,D.f[2]+D.r[2]*a*W+D.u[2]*s*W],n=T0/Math.max(.05,r[0]*kt[0]+r[2]*kt[2]);return[(r[0]*St[0]+r[2]*St[2])*n,Math.max(.02,Math.min(Bt-.02,C[1]+r[1]*n))]};let ye=!1,Qt=0,h0=0,ve=!1,x0=null,be=0,Kt=0,m0=0,oo=0,U0=0,ao=0,so=0;const Zo=[0,2,4,7,9];return(t,o)=>{o=Math.min(Math.max(o||0,0),.25),zt+=o,u[62]=zt;const a=tt.taps();if(tt.down){const r=eo(tt.x,tt.y);ve||(x0=r,be=zt,oo=zt,U0=0,ao=tt.x,so=tt.y),U0=Math.max(U0,Math.hypot(tt.x-ao,tt.y-so));const n=Math.max(.001,zt-be);if(n>.02&&x0){let l=(r[0]-x0[0])/n,f=(r[1]-x0[1])/n;const h=Math.hypot(l,f);h>3.5&&(l*=3.5/h,f*=3.5/h),h>.05&&M0.push({a:r[0],y:r[1],r:.2,vx:l*.8,vy:f*.8,p:.6}),Kt+=h*n,x0=r,be=zt}}else ve&&U0<.02&&zt-oo<.35&&a.push({x:tt.x,y:tt.y});ve=tt.down,Kt>.25&&(q0.hit("noise",Math.min(.5,Kt*.6),{cutoff:300+Kt*900,dur:.35,pan:(tt.x-.5)*.8}),Kt=0,m0+=2),Kt*=Math.exp(-o*2);for(const r of a.slice(0,2)){const n=eo(r.x,r.y);M0.push({a:n[0],y:n[1],r:.16,p:1.5,clap:!0}),q0.hit("snare",.55,{pan:(r.x-.5)*.8}),q0.hit("noise",.25,{cutoff:2600,dur:.5,at:.012}),m0+=5}Qt+=o,ue();for(let r=0,n=Qt>2/15?4:1;r<n;r++)if(ye)We(),F0(!1),ye=!1;else if(Qt>=1/15)Qt-=1/15,Ge(1/15,!0),F0(!0),ye=!0;else break;Qt>.5&&(Qt=0),h0+=o;let s=0;for(;h0>=1/30&&s<3;)$e(1/30),h0-=1/30,s++;h0>.3&&(h0=0),m0*=Math.exp(-o*1.2),m0>.4&&V()<m0*o*1.5&&q0.note(84+Zo[V()*5|0]+12*(V()<.3),{dur:.6,vel:.05+.04*V(),wave:"sine",pan:(V()-.5)*.6}),to()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
