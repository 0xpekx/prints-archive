// Gas Burner: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/357.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ca){ca&&ca.add({num:357,name:"Gas Burner",fam:"Worlds",recipe:"A worn brass gas burner on an old lab bench, where the air collar sets how much air gets pulled in, from a sooty yellow flame to a sharp roaring blue cone. Push it and it lifts off the rim or strikes back down the tube with a pop. The bench changes every mint. Drag sideways to turn the air collar and up or down for the gas, or tap to shut it off and tap again to light it.",interactive:"Drag sideways to turn the air collar, up or down to open or close the gas. Full air on a low gas flow strikes the flame back down the tube with a pop. Tap to shut the gas, tap again to light it.",music:!0,gl:!0,fps:30,seed:0,make(y){const t=y.gl,I=y.size,u=y.home,ia=y.hash.slice(2);let zt=1374496675;for(let a=0;a<64;a+=8)zt=Math.imul(zt^parseInt(ia.slice(a,a+8),16),1540483477)+625341585|0;const l=()=>{zt=zt+1831565813|0;let a=Math.imul(zt^zt>>>15,1|zt);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},Q=a=>{let e=l()*a.reduce((r,s)=>r+s[1],0),o=a[0];for(const r of a)if(e-=r[1],e<0){o=r;break}return o[0]},Ht=a=>a.map(e=>Math.pow(e,2.2)),ht=Math.PI/180,la=u?"Soapstone":Q([["Soapstone",32],["Black epoxy",26],["Old teak",26],["Slate",16]]),Ae=u?"Worn brass":Q([["Worn brass",40],["Tarnished",28],["Bright brass",20],["Nickel-plated",12]]),fa=u?"Red rubber":Q([["Red rubber",46],["Black rubber",30],["Amber latex",24]]),Ft=u?"Bench lamp":Q([["Bench lamp",44],["Cold lamp",30],["North window",18],["Lamp off",8]]),Gt=u?"Natural gas":Q([["Natural gas",56],["Propane",30],["Town gas",14]]),Se=u?"Standard jet":Q([["Standard jet",56],["Wide jet",26],["Narrow jet",18]]),se=u?"Still air":Q([["Still air",50],["Slight draught",36],["Open window",14]]);let J=u?"Half air":Q([["Half air",40],["Safety flame",28],["Full air",24],["Lifted",8]]);Ft==="Lamp off"&&(J==="Full air"||J==="Lifted")&&(J="Safety flame");const ha=Q([["iron",74],["brass",26]]),Ca=u?"white":Q([["white",40],["green",34],["cream",26]]),L={"Natural gas":{rs:9.52,W:.422,eta:.15,xi:5.18,pk:1.075,lean:.5,rich:1.7,Qmax:19e-6,rmax:9.4,al:22e-6,sootPhi:1.6,smoke:0,ld:1},Propane:{rs:23.8,W:.446,eta:.12,xi:4.95,pk:1.08,lean:.55,rich:2.3,Qmax:78e-7,rmax:23.5,al:22e-6,sootPhi:1.35,smoke:1,ld:.9},"Town gas":{rs:4.4,W:.95,eta:.1,xi:3,pk:1.15,lean:.4,rich:3,Qmax:38e-6,rmax:4.5,al:45e-6,sootPhi:2.6,smoke:0,ld:.9}}[Gt],Ia={"Standard jet":1,"Wide jet":1.15,"Narrow jet":.72}[Se],Xa={"Standard jet":1,"Wide jet":1.3,"Narrow jet":.7}[Se],mt=.0055,ce=4,ke=.55,O=11,Wa=.33,Ha=.3,z0=.82,_t=1.05;function Ga(a){const e=Wa,o=Ha,r=.74*Math.abs(a);return r>=e+o?0:r<=e-o?1:(e*e*Math.acos((r*r+e*e-o*o)/(2*r*e))+o*o*Math.acos((r*r+o*o-e*e)/(2*r*o))-.5*Math.sqrt((-r+e+o)*(r+e-o)*(r-e+o)*(r+e+o)))/(Math.PI*o*o)}function Oa(a){const e=L;if(a<e.lean)return 0;let o=e.W*Math.pow(a,e.eta)*Math.exp(-e.xi*(a-e.pk)**2);o*=Math.min(1,(a-e.lean)/.1);const r=a>e.rich-.4?.11*Math.exp(-(a-(e.rich-.4))*1.6)*Math.max(0,Math.min(1,(e.rich+1.4-a)/.5)):0;return a>e.rich&&(o=0),Math.max(o,r)}const Y=new Float32Array(16);function $(a,e,o){const r=Math.max(.02,Ga(a)),s=.35,T=r/Math.sqrt(r*r+s*s)*Math.sqrt(1+s*s),w=Math.max(1e-9,e*L.Qmax*Xa),g=L.rmax*Ia*T*w+.01*L.rmax*L.Qmax*T,E=g/w,v=Math.min(60,L.rs/E),f=w+g,h=f/(Math.PI*mt*mt),p=h*(ce+2)/mt,x=Oa(v),S=.09*x*x/L.al,bt=.45*x*x/L.al*(1+25*Math.max(0,v-1)**2),Xt=Math.max(.02,(L.rs-E)/(1+E)),D=v>1?Math.min(19,776*f/Math.log(1+1/Xt)*100*L.ld):0;let G=0;if(x>.012){const At=Math.min(.25*mt,30*L.al/x),ft=mt-At,St=45;o&&Y.fill(0);let wt=0,n=15;for(let i=St-1;i>=0;i--){const m=ft*(i+.5)/St,c=h*(ce+2)/ce*(1-(m/mt)**ce);if(wt+=Math.sqrt(Math.max(0,c*c/(x*x)-1))*ft/St,o)for(;n>=0&&n/15*mt>=m;)Y[n]=n/15*mt>=ft?0:wt*100,n--}if(o)for(;n>=0;)Y[n]=wt*100,n--;if(G=wt*100,o){const i=(Y[3]-Y[5])/2*15/ke,m=4/15*ke,c=Y[4]+i*m/2;for(let R=0;R<4;R++)Y[R]=Y[4]+(c-Y[4])*(1-(R/4)**2);G=Y[0]}}const Bt=x>.012?Math.min(1,(x-.012)/.05)*(v>L.rich?Math.max(0,1-(v-L.rich)/1.2):1):0,gt=Math.max(0,Math.min(1,(v-L.sootPhi)/2.4))**.85;return{a:r,phi:v,U:h,Qm:f,gw:p,gF:S,gB:bt,S:x,H:G,Ld:D,prem:Bt,soot:gt,Re:h*.011/16e-6}}const ma=u?.74:.56+l()*.4;let F=_t,X=ma;const Ka=(a,e)=>$(a,e).phi;if(J==="Full air")F=0;else if(J==="Half air"){const a={"Natural gas":2.55,Propane:2.2,"Town gas":2.7}[Gt];let e=0,o=.85;for(let r=0;r<30;r++){const s=(e+o)/2;Ka(s,ma)<a?e=s:o=s}F=(e+o)/2}else if(J==="Lifted"){let a=-1;for(let e=.5;e<=1.45;e+=.02){const o=$(0,e);if(o.prem>.3&&o.gw>1.12*o.gB&&o.gw<1.4*o.gB){a=e;break}}a>0?(F=0,X=a+.03):(J="Full air",F=0)}for(let a=0;a<40;a++){const e=$(F,X);if(e.prem>.25&&e.gw<1.3*e.gF)X=Math.min(1.4,X+.05),X>=1.4&&(F=Math.min(_t,F+.06));else break}if(J!=="Lifted")for(let a=0;a<40;a++){const e=$(F,X);if(e.prem>.25&&e.phi<1.4&&e.gw>.95*e.gB)X-=.03;else break}let qe=-1;for(let a=.7;a>=.05;a-=.01){const e=$(0,a);if(e.prem>.3&&e.gw<e.gF){qe=a-.03;break}}const ie=(a,e)=>{for(let o=0;o<40;o++){const r=$(a,e);if(r.prem<.3||r.phi>=1.4||r.gw<1.3*r.gB)break;e-=.03}return e};let yt=795556893;for(let a=0;a<64;a+=8)yt=Math.imul(yt^parseInt(ia.slice(a,a+8),16),668265263)+374761393|0;const U=()=>{yt=yt+1831565813|0;let a=Math.imul(yt^yt>>>15,1|yt);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},Fe=U(),le=U(),Ot=U(),fe=U(),ja=U(),Za=U(),Va=U(),Ya=U(),he=!u&&Va<.04?Ya<.6?"sodium":"copper":"";y.trait("Bench",la),y.trait("Brass",Ae),y.trait("Hose",fa),y.trait("Light",Ft),y.trait("Gas",Gt+(he?" with a trace of "+he:"")),y.trait("Jet",Se),y.trait("Air",se),y.trait("Opening",J);let Mt=u||Fe<.45||Fe>=.8&&F<.2?"At the collar":Fe<.8?"Whole burner":"On the flame";!u&&ja<.3&&(Mt="From above"),y.trait("View",Mt);const Ut=F<.2;let me=(u?19:8+l()*26)*ht,Kt=u?13.4:Ut?9.5+l()*.7:10.4+l()*1.4,xe=u?6.3:Ut?5.5+l()*.6:4.8+l()*1.2,Lt=u?.8:Ut?.74+l()*.03:.77+l()*.06,ue=u?7.5:(Ut?9:8.8)+l()*.3,xt=(u?2.3:2+l()*.6)*(u||l()<.62?1:-1);Mt==="Whole burner"?(Kt=(Ut?19:25)+4*le,xe=6.5+2.5*Ot,ue=(Ut?10:11.5)+1.5*fe,Lt=.6,xt=Math.sign(xt)*(4+2*le)):Mt==="From above"?(Kt=12+4*le,xe=21+5*Ot,ue=5.5+2*fe,Lt=.66,xt=Math.sign(xt)*(5.5+3*Ot),me+=(fe-.5)*50*ht):Mt==="On the flame"&&(Kt=7+1.2*le,xe=O-1.2+.8*Ot,ue=O+2.4+.6*fe,Lt=.5,xt=Math.sign(xt)*(1.3+.5*Ot),me+=10*ht);let q=[Math.sin(me)*Kt,-Math.cos(me)*Kt,xe];const jt=a=>{const e=Math.hypot(a[0],a[1],a[2]);return[a[0]/e,a[1]/e,a[2]/e]},xa=(a,e)=>[a[1]*e[2]-a[2]*e[1],a[2]*e[0]-a[0]*e[2],a[0]*e[1]-a[1]*e[0]],tt=jt([-q[0],-q[1],ue-q[2]]),Pt=jt([q[0],q[1],0]),st=jt(xa(tt,[0,0,1])),Ct=xa(st,tt);q=[q[0]+st[0]*xt,q[1]+st[1]*xt,q[2]];const Qa=a=>{const e=[a[0]-q[0],a[1]-q[1],a[2]-q[2]],o=e[0]*tt[0]+e[1]*tt[1]+e[2]*tt[2];return[.5+.5*(e[0]*st[0]+e[1]*st[1]+e[2]*st[2])/(o*Lt),.5+.5*(e[0]*Ct[0]+e[1]*Ct[1]+e[2]*Ct[2])/(o*Lt)]},ua=(a,e,o,r,s,T,w)=>{let g=9,E=9,v=-9,f=-9;for(const h of[a,e])for(const p of[o,r])for(const x of[s,T]){const S=Qa([h,p,x]);g=Math.min(g,S[0]),E=Math.min(E,S[1]),v=Math.max(v,S[0]),f=Math.max(f,S[1])}return[g-w,E-w,v+w,f+w]},_e=Math.atan2(-Pt[1],-Pt[0])+Math.PI+(u?-118:-100-l()*40)*ht,ut=[Math.cos(_e),Math.sin(_e)],de=2.1,Tt=[];{const a=(u?.55:.2+l()*.7)*(l()<.5?1:-1)*0;let e=ut[0]*4,o=ut[1]*4,r=_e,s=0;const T=u?.07:.03+l()*.06,w=u||l()<.6?1:-1;for(let g=0;g<8;g++){const E=.6+(de-.6)*Math.max(0,1-s/5.5)**2*(1+0*a);Tt.push([e,o,E,.6]);const v=g<2?1.6:4.6;r+=w*T*v*(g<2?.4:1),e+=Math.cos(r)*v,o+=Math.sin(r)*v,s+=v}}const pe=[],Ja=u?2:Math.floor(l()*4);for(let a=0;a<Ja;a++){const e=(u?[-28,-8][a]:-60+l()*80)*ht+Math.atan2(-Pt[1],-Pt[0])+Math.PI,o=u?[5.3,6.6][a]:5+l()*4.5,r=4.4;let s=u?[.6,2.5][a]:l()*6.28;const T=Math.cos(e)*o,w=Math.sin(e)*o;if(a>0){const g=pe[a-1][8],E=Math.abs(((s-g)%Math.PI+Math.PI)%Math.PI);(E<.45||E>Math.PI-.45)&&(s+=1.1)}pe.push([T-Math.cos(s)*r/2,w-Math.sin(s)*r/2,.1,.1,T+Math.cos(s)*r/2,w+Math.sin(s)*r/2,.1,.1,s])}const da=0*(Mt!=="From above"&&(u||Za<.62)?1:0),pa=u?15:11+l()*9,va=u?21:14+l()*14,$a=u?27:23+l()*12,Ue={Soapstone:[[.25,.27,.26],.3,0],"Black epoxy":[[.13,.13,.135],.2,1],"Old teak":[[.47,.32,.2],.42,2],Slate:[[.25,.27,.3],.6,3]}[la],t0={white:[.62,.62,.6],green:[.42,.52,.45],cream:[.64,.58,.48]}[Ca],ve={"Red rubber":[[.5,.18,.13],0],"Black rubber":[[.1,.095,.09],1],"Amber latex":[[.78,.48,.2],2]}[fa],e0={iron:[.13,.13,.135],hammer:[.33,.36,.39],brass:[.8,.6,.3]}[ha],a0={"Worn brass":0,Tarnished:1,"Bright brass":2,"Nickel-plated":3}[Ae],o0={"Worn brass":.3,Tarnished:.8,"Bright brass":.12,"Nickel-plated":.3}[Ae],r0=u?.7:.25+l()*.7,n0=u?.75:.3+l()*.7;let A,Zt,dt,ba,ga,et,Et,Vt,Rt,Yt,s0=4.5;const Le=[-1,-4,4];Ft==="Bench lamp"?(A=[-46,-12,30],Zt=[1,.78,.55],dt=7e3,et=[.5,.8,.32],Et=[.38,.4,.44],Vt=.16,Rt=[.0085,.0079,.006],Yt=3):Ft==="Cold lamp"?(A=[-46,-2,33],Zt=[.8,.88,1],dt=6500,et=[.55,-.3,.4],Et=[.5,.42,.34],Vt=.22,Rt=[.006,.007,.009],Yt=3):Ft==="North window"?(A=[-50,-14,23],Zt=[0,0,0],dt=0,et=[.5,.75,.45],Et=[.62,.74,.95],Vt=1.3,Rt=[.034,.039,.05],Yt=2.5):(A=[-50,-14,23],Zt=[0,0,0],dt=0,et=[.5,.8,.32],Et=[.22,.3,.48],Vt=.05,Rt=[.0018,.002,.0028],Yt=5.2),u||(A=[A[0]+(l()-.5)*14,A[1]+(l()-.5)*10,A[2]+(l()-.5)*6]);{const a=Math.hypot(...et);et=et.map(e=>e/a)}const Pe=jt([Le[0]-A[0],Le[1]-A[1],Le[2]-A[2]]);ba=Math.cos(16*ht),ga=Math.cos(5*ht);const Qt=4.5,c0=dt/(A[0]**2+A[1]**2+A[2]**2),i0=`#version 300 es
out vec2 p; void main(){ vec2 q=vec2((gl_VertexID<<1)&2, gl_VertexID&2); p=q; gl_Position=vec4(q*2.-1.,0.,1.); }`,wa=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
in vec2 p; out vec4 o;
layout(std140) uniform U { vec4 uCam,uF,uR,uUp,uK,uKc,uKd,uWd,uWc,uAmb,uFl,uM0,uM1,uBc,uWlc,uHc,uBsc,uBarb,uRod,uT,uCol,uFbox,uPre,uPreC; vec4 uZc[4]; vec4 uDif,uDif2; vec4 uVx[3]; vec4 uFlL,uMisc,uMisc2; vec4 CA[16]; vec4 CB[16]; vec4 uWin,uEx; vec4 SG[20]; vec4 SM[20]; };
#define PI 3.14159265
#define ZR 11.0
vec3 dec(vec4 e){ return (exp2(e.rgb*14.)-1.)/200.; }
float dep(float a){ a=clamp(a*2.-1.,-.996,.996); return uF.w+18.*.5*log((1.+a)/(1.-a)); }
`,Ce=`
uniform sampler2D uN; uniform sampler2D uS;
float atn2(float y,float x){float ax=abs(x),ay=abs(y);float a=atan(min(ax,ay)/max(max(ax,ay),1e-6));if(ay>ax)a=1.5707963-a;if(x<0.)a=3.1415927-a;return y<0.?-a:a;}
float gFP;
vec4 NL(vec2 c, float s){ return textureLod(uN, c, log2(max(gFP*s*256., 1.))); }
vec4 SL(vec2 c, float s){ return textureLod(uS, c, log2(max(gFP*s*512., 1.))); }
float hT; vec3 hN; int hM; float hA;
float iCap(vec3 ro, vec3 rd, vec3 pa, vec3 pb, float r){
  vec3 ba=pb-pa, oa=ro-pa; float baba=dot(ba,ba), bard=dot(ba,rd), baoa=dot(ba,oa), rdoa=dot(rd,oa), oaoa=dot(oa,oa);
  float a=baba-bard*bard, b=baba*rdoa-baoa*bard, c=baba*oaoa-baoa*baoa-r*r*baba, h=b*b-a*c;
  float res=-1.;
  if(h>=0.){ float t=(-b-sqrt(h))/a; float y=baoa+t*bard; if(y>0.&&y<baba) res=t; else { vec3 oc=(y<=0.)?oa:ro-pb; b=dot(rd,oc); c=dot(oc,oc)-r*r; h=b*b-c; if(h>0.) res=-b-sqrt(h); } }
  return res;
}
vec3 nCap(vec3 q, vec3 a, vec3 b, float r){ vec3 ba=b-a, pa=q-a; float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); hA=h; return (pa-h*ba)/r; }
vec2 DIN;
// The burner is turned on a lathe: each part is a segment (r0,z0)-(r1,z1) swept about the tube's axis (a cylinder, a cone
// or a flat ring alike), and the gas inlet the same about its own axis: one quadratic in one rolled loop.
void scene(vec3 ro, vec3 rd){
  hT=1e9; hM=0;
  if(rd.z<0.){ hT=-ro.z/rd.z; hN=vec3(0.,0.,1.); hM=1; }
  { float dw=dot(rd.xy,uRod.xy), t=(uEx.z-dot(ro.xy,uRod.xy))/max(dw,1e-6); if(dw>0.&&t<hT){ hT=t; hN=vec3(-uRod.xy,0.); hM=2; } }
  vec2 v2=vec2(-DIN.y,DIN.x);
  vec3 roI=vec3(dot(ro.xy,v2),ro.z-uBarb.w,dot(ro.xy,DIN)), rdI=vec3(dot(rd.xy,v2),rd.z,dot(rd.xy,DIN));
  int NS=int(uWlc.w);
  for(int i=0;i<NS;i++){
    vec4 g=SG[i]; bool fr=SM[i].y>.5; vec3 o=fr?roI:ro, d=fr?rdI:rd;
    float dr=g.z-g.x, dz=g.w-g.y, w=dr*(o.z-g.y)+g.x*dz, wd=dr*d.z;
    float A=dz*dz*dot(d.xy,d.xy)-wd*wd, B=dz*dz*dot(o.xy,d.xy)-w*wd, C=dz*dz*dot(o.xy,o.xy)-w*w, h=B*B-A*C;
    if(abs(A)>1e-9&&h>-1e-6*B*B){
      h=sqrt(max(h,0.)); if(A<0.) h=-h;
      float il=1./(dr*dr+dz*dz), ta=(-B-h)/A, tb=(-B+h)/A;
      vec3 qa=o+d*ta, qb=o+d*tb;
      float sa=((length(qa.xy)-g.x)*dr+(qa.z-g.y)*dz)*il, sb=((length(qb.xy)-g.x)*dr+(qb.z-g.y)*dz)*il;
      bool oka=ta>1e-3&&sa>=0.&&sa<=1.&&(w+wd*ta)*dz>=0., okb=tb>1e-3&&sb>=0.&&sb<=1.&&(w+wd*tb)*dz>=0.;
      float t=oka?ta:(okb?tb:-1.);
      if(t>0.&&t<hT){
        vec3 q=oka?qa:qb; vec3 n=normalize(vec3(q.xy/max(length(q.xy),1e-5)*dz,-dr)); if(dot(n,d)>0.) n=-n;
        hT=t; hN=fr?vec3(v2*n.x+DIN*n.z,n.y):n; hM=int(SM[i].x+.5);
      }
    }
  }
  int NC=int(uEx.x);
  for(int i=5;i<NC;i++){ vec4 a=CA[i], b=CB[i]; if(a.w>0.&&(b.w==1.||b.w==4.||b.w==2.)){ float t=iCap(ro,rd,a.xyz,b.xyz,a.w); if(t>1e-3&&t<hT){ hT=t; hN=nCap(ro+rd*t,a.xyz,b.xyz,a.w); hM=b.w==1.?10:(b.w==2.?11:13); if(hM==13) hA+=float(i)*10.; } } }
}
float capVis(vec3 p, vec3 l, float D, vec3 a, vec3 b, float r, float k){
  vec3 v=b-a, w=p-a; float B=dot(l,v), C=dot(v,v), Dd=dot(l,w), E=dot(v,w);
  float den=C-B*B; float s=den>1e-6?clamp((B*E-C*Dd)/den,0.,D):0.;
  float qq=clamp((E+B*s)/C,0.,1.); s=clamp(dot(a+v*qq-p,l),0.,D); qq=clamp(dot(p+l*s-a,v)/C,0.,1.);
  float dist=length(p+l*s-a-v*qq)-r; float w2=max(k*s,.015);
  return smoothstep(-w2,w2,dist);
}
float shadowK(vec3 p, vec3 l, float D, float k, bool hose){
  float v=1.; int NC=int(uEx.x);
  for(int i=0;i<NC;i++){ vec4 a=CA[i], b=CB[i]; if(a.w>0.&&b.w!=3.&&(hose||b.w!=1.)) v*=capVis(p,l,D,a.xyz,b.xyz,a.w,k); }
  if(p.z<1.4&&l.z>0.){
    vec2 q=p.xy+l.xy*(.45-p.z)/l.z; float w=max(.03,abs(.45-p.z)/l.z*k); if(p.z<.45) v*=smoothstep(-w,w,length(q)-3.98);
    q=p.xy+l.xy*(1.1-p.z)/l.z; w=max(.03,abs(1.1-p.z)/l.z*k); if(p.z<1.1) v*=smoothstep(-w,w,length(q)-2.35);
  }
  return v;
}
struct Mt { vec3 alb; vec3 f0; float rx; float ry; vec3 tx; float wrap; float ao; };
float Dan(vec3 h, vec3 n, vec3 tx, vec3 ty, float ax, float ay){ float x=dot(h,tx)/ax, y=dot(h,ty)/ay, z=dot(h,n); float d=x*x+y*y+z*z; return 1./(PI*ax*ay*d*d); }
vec3 shadeL(Mt m, vec3 n, vec3 v, vec3 l, vec3 E, float ang){
  float nl=dot(n,l); float ndl=max(nl,0.);
  vec3 diff=m.alb*(1./PI)*max((nl+m.wrap)/(1.+m.wrap),0.);
  vec3 spec=vec3(0);
  if(ndl>0.){
    vec3 h=normalize(l+v); float ax=sqrt(m.rx*m.rx+ang*ang*.6), ay=sqrt(m.ry*m.ry+ang*ang*.6);
    vec3 ty=normalize(cross(n,m.tx)); vec3 tx=cross(ty,n);
    float D=Dan(h,n,tx,ty,ax,ay); float a2=ax*ay;
    float nv=max(dot(n,v),1e-3); float vis=.5/(ndl*sqrt(nv*nv*(1.-a2)+a2)+nv*sqrt(ndl*ndl*(1.-a2)+a2)+1e-4);
    vec3 F=m.f0+(1.-m.f0)*pow(1.-max(dot(h,v),0.),5.);
    spec=min(D*vis,600.)*F*ndl;
  }
  return (diff+spec)*E;
}
vec3 env(vec3 R, float ro){
  float s=.1+ro*.7;
  vec3 room=uAmb.rgb*(1.3+1.5*smoothstep(-.1,.9,R.z));
  vec3 ground=uBc.rgb*(uAmb.rgb*1.6+uKc.rgb*uEx.w*.18);
  vec3 c=mix(ground, room, smoothstep(-s,s,R.z+.03));
  vec2 wd=normalize(uWd.xy); float ha=atn2(R.x*wd.y-R.y*wd.x, dot(R.xy,wd)); float el=asin(clamp(R.z,-1.,1.));
  float win=smoothstep(uWin.x+s,uWin.x-s,abs(ha))*smoothstep(uWin.y-s,uWin.y+s,el)*smoothstep(uWin.z+s,uWin.z-s,el);
  float bar=min(smoothstep(.0,.02+s*.6,abs(ha-.05)), smoothstep(.0,.02+s*.6,abs(el-mix(uWin.y,uWin.z,.58))));
  bar=min(bar, smoothstep(.0,.015+s*.6,abs(ha+uWin.x*.62)));
  c+=uWc.rgb*uWd.w*win*(.25+.75*bar)*(.7+.5*smoothstep(uWin.y,uWin.z,el));
  return c;
}
float tri(float x){ return abs(fract(x)-.5)*2.; }
vec3 gBN;
void brassMat(inout Mt m, vec3 q, float region){
  float ang=atn2(q.y,q.x), z=q.z; float rr=region>3.5?length(q.xy):.7;
  vec2 au=vec2(ang*rr, z);
  vec4 nA=NL(au*vec2(.13,.07)+region*.31,.13);
  vec4 nB=NL(au*.16+.17,.16);
  vec4 sc=SL(au*vec2(.05,.019)+region*.2,.05);
  vec4 sc2=SL(au*vec2(.021,.06)+region*.37+.5,.06);
  float lath=NL(vec2(region*.1+ang*.01, z*.9),.9).w;
  float T=clamp(uM1.w+(nA.x-.5)*2.4+(nB.y-.5)*.8,0.,1.);
  // turned, handled and knocked about: a slow wobble in the surface bends the reflections
  gBN=vec3(-q.y,q.x,0.)/max(length(q.xy),.01)*(nB.z-.5)*.09+vec3(0,0,(nA.w-.5)*.07);
  if(region>.5&&region<1.5) T*=.35;             // the collar is handled, so it stays bright
  if(region>2.5) T*=.7;
  T=clamp(T+sc.b*.35*(1.-T),0.,1.);
  float scr=clamp(sc.r*1.3+sc2.r*.9,0.,1.);
  T*=1.-.75*scr;                                  // scratches cut through the tarnish to bright metal
  vec3 br=vec3(.86,.64,.30), tn=mix(vec3(.30,.22,.11),vec3(.20,.17,.10),nB.w);
  vec3 f0=mix(br,tn,T*T*(3.-2.*T));
  if(uM0.w>2.5){ // nickel plating, worn through to brass where handled and on edges
    float wear=smoothstep(.62,.8,nA.y+(region>.5&&region<1.5?.3:0.)+sc.r*.6);
    f0=mix(vec3(.60,.58,.54)*(1.-.25*T), br*(1.-.3*T), wear);
  }
  float ry=mix(.22,.5,T)+lath*.1, rx=mix(.035,.2,T);
  rx+=scr*.1; ry+=scr*.05;
  gBN+=vec3(-q.y,q.x,0.)/max(length(q.xy),.01)*(sc.r-sc2.r)*.09+vec3(0.,0.,(lath-.5)*.1);
  // heat colours and soot near the mouth
  // heat tint: thin oxide films in temper colours, straw low down, then bronze, purple and blue towards the mouth
  float hh=clamp((z-(ZR-3.3))/3.+(nA.y-.5)*.3+(nB.x-.5)*.14,0.,1.)*uM1.z*step(region,.5)*1.25;
  vec3 ht=mix(f0, vec3(.95,.76,.40), smoothstep(.0,.26,hh));
  ht=mix(ht, vec3(.78,.46,.22), smoothstep(.28,.48,hh));
  ht=mix(ht, vec3(.60,.30,.44), smoothstep(.5,.66,hh));
  ht=mix(ht, vec3(.34,.44,.74), smoothstep(.68,.84,hh));
  ht=mix(ht, vec3(.56,.58,.60), smoothstep(.88,1.1,hh));
  float hz=smoothstep(.0,.12,hh)*(1.-scr*.5);
  f0=mix(f0, ht, hz); ry=mix(ry,ry+.1,hz);
  float so=smoothstep(ZR-.25-uM1.y*.9-nB.x*.4,ZR,z)*uM1.y*step(region,.5);
  m.f0=mix(f0,vec3(.03),so); m.alb=mix(vec3(.0),vec3(.02,.018,.016),so)+f0*.03*T;
  m.rx=mix(rx,.8,so); m.ry=mix(ry,.85,so);
  m.tx=normalize(vec3(-q.y,q.x,0.));
}
vec3 benchMat(inout Mt m, vec3 q, inout vec3 n){
  vec2 x=q.xy; vec3 a=uBc.rgb; float rough=uBc.w;
  vec4 n1=NL(x*.011,.011), n2=NL(x*.043+.3,.043), n3=NL(x*.19,.19);
  vec4 sc=SL(x*.034,.034), sc2=SL(x*.0091+.5,.0091);
  sc.r*=smoothstep(.3,.75,NL(x*.006+.7,.006).z);
  float r=length(x);
  float t=uM0.x;
  if(t<.5||t>2.5){ // soapstone and slate: mottled, veins (soapstone only), pale scratches, water rings, sheen
    a*=.55+.95*n1.x*n1.x+.3*n2.y;
    float vein=smoothstep(.012,.0,abs(n1.y-.5)+n3.z*.012)*step(t,.5)*smoothstep(.45,.75,n2.w); a=mix(a, vec3(.30,.33,.31), vein*.35);
    if(t>2.5) n=normalize(n+vec3((n3.xy-.5)*.07,0.));
    a=mix(a, vec3(.36,.38,.36), sc.r*.10);
    a=mix(a, vec3(.30,.32,.30), sc2.g*.1);
    rough=clamp(rough+(n2.x-.5)*.3+sc.r*.12+sc2.g*.04,.12,.9);
  } else if(t<1.5){ // black epoxy resin: smooth, swirled, etched spots, stains
    a*=.8+.4*n1.x;
    float etch=smoothstep(.62,.7,n2.w*.7+n1.z*.5); a=mix(a, vec3(.28,.28,.27), etch*.6+sc2.g*.45);
    a=mix(a, vec3(.3), sc.r*.12);
    rough=clamp(rough+sc.r*.45+etch*.4+sc2.g*.3+n3.x*.08,.08,.9);
  } else if(t<2.5){ // old teak planks along x
    float pw=11.3, id=floor((x.y+3.)/pw), fy=fract((x.y+3.)/pw);
    float gr=NL(vec2(x.x*.004+id*.37, x.y*.42),.42).x, gr2=NL(vec2(x.x*.012+id*.71, x.y*1.4),1.4).y;
    a*=.62+.55*gr+.3*(gr2-.5)+.18*(fract(id*.618)-.5);
    a=mix(a, a*.35, smoothstep(.04,.0,min(fy,1.-fy)));
    a=mix(a, vec3(.07,.045,.03), sc2.g*.7);
    a=mix(a, a*1.5+.05, sc.r*.35);
    rough=clamp(rough+(gr2-.5)*.2+sc.r*.3,.2,.9);
    n=normalize(n+vec3(0., (gr2-.5)*.06, 0.));
  }
  // a scorched ring where the burner has stood before, and soot dust near the base
  float ring=exp(-pow((r-5.2-n2.y*1.2)/1.1,2.))*(.35+.5*n1.w)*(.2+.8*smoothstep(.15,.95,.5+.5*dot(x/max(r,.01),vec2(.8,.6))+(n2.z-.5)*.7));
  a*=1.-ring*(t>1.5&&t<2.5?.7:.45);
  m.alb=a; m.f0=vec3(.04); m.rx=rough; m.ry=rough; m.tx=vec3(1,0,0);
  return a;
}
#ifdef K_GB
uniform int uGo;
vec2 octE(vec3 n){ n/=abs(n.x)+abs(n.y)+abs(n.z); vec2 e=n.xy; if(n.z<0.) e=(1.-abs(n.yx))*vec2(n.x>=0.?1.:-1.,n.y>=0.?1.:-1.); return e; }
uvec4 gPk(vec3 n, Mt m, float ao, vec3 rf){
  if(uGo==0) return uvec4(floatBitsToUint(hT), packSnorm2x16(octE(n)), packHalf2x16(vec2(m.rx,m.ry)), packHalf2x16(vec2(ao,float(hM))));
  return uvec4(packHalf2x16(m.alb.rg), packHalf2x16(vec2(m.alb.b,m.f0.r)), packHalf2x16(m.f0.gb), packHalf2x16(rf.xy));
}
#endif
#ifdef LP
uniform highp usampler2D uG0; uniform highp usampler2D uG1;
vec3 octD(vec2 e){ vec3 v=vec3(e,1.-abs(e.x)-abs(e.y)); if(v.z<0.) v.xy=(1.-abs(v.yx))*vec2(v.x>=0.?1.:-1.,v.y>=0.?1.:-1.); return normalize(v); }
void main(){
  DIN=uBarb.xy;
  vec3 ro=uCam.xyz; vec3 rd=normalize(uF.xyz+(p.x*2.-1.)*uCam.w*uR.xyz+(p.y*2.-1.)*uCam.w*uUp.xyz);
  ivec2 pc=ivec2(gl_FragCoord.xy); uvec4 g0=texelFetch(uG0,pc,0), g1=texelFetch(uG1,pc,0);
  hT=uintBitsToFloat(g0.x); vec2 ah=unpackHalf2x16(g0.w); hM=int(ah.y+.5);
  float mode=uWc.w;
  vec3 col=vec3(0); float dd=hT;
  if(hM>0){
    vec3 q=ro+rd*hT, n=octD(unpackSnorm2x16(g0.y)), v=-rd;
    vec2 rr=unpackHalf2x16(g0.z), ga=unpackHalf2x16(g1.x), gb=unpackHalf2x16(g1.y), gf=unpackHalf2x16(g1.z), rf=unpackHalf2x16(g1.w);
    Mt m; m.alb=vec3(ga,gb.x); m.f0=vec3(gb.y,gf); m.rx=rr.x; m.ry=rr.y; m.wrap=hM==10?uHc.w:0.; m.ao=1.; m.tx=vec3(1,0,0);
    // tangents as the materials set them: turned brass round the tube, the inlet along its axis, the wire from its normal
    if((hM>=4&&hM<=7)||hM==9||(hM==3&&uM0.z>1.5)) m.tx=normalize(vec3(-q.y,q.x,0.));
    if(hM==9) m.tx=normalize(vec3(-DIN.y,DIN.x,0.));
    if(hM==11) m.tx=normalize(vec3(-n.y,n.x,1e-4));
    float ao=ah.x, specOcc=hM==8?exp(-(ZR-q.z)*2.):1.;
    vec3 refl=hM==1?vec3(rf,1.):vec3(-1.);
    float nv=max(dot(n,v),0.);
    int NL=int(uEx.y);
    for(int i=0;i<NL;i++){
      vec3 l; vec3 E; float ang, D, aw=1.;
      if(mode<.5){
        if(i==0){ vec3 lp=uK.xyz-q; D=length(lp); l=lp/D; float ca=dot(-l,uKd.xyz); float spot=max(smoothstep(uKc.w,uKd.w,ca),uWin.w*3.*pow(max(ca,0.),3.)); E=uKc.rgb*spot/(D*D); ang=uK.w/D; }
        else if(i==1){ l=uWd.xyz; D=80.; E=uWc.rgb*uWd.w*.55; ang=.35; }
        else break;
      } else {
        float fz=ZR+uFl.w*(i==0?.12:(i==1?.42:.78)); float wi=i==0?.45:(i==1?.35:.2);
        vec3 lp=vec3(q.xy/max(length(q.xy),1e-3)*(i==0?1.:.8),fz)-q; D=length(lp); l=lp/D; E=vec3(wi*30.)/(D*D+4.)*(hM==1?1.25:(hM==2?1.6:(hM>=4&&hM<=9?(hM==7?.3:.05):1.))); ang=.9/D; aw=mix(ao,1.,.5);
        if(hM==8) aw*=exp(-(ZR-q.z)*1.1);
      }
      if(max(E.r,max(E.g,E.b))>1e-6&&dot(n,l)>-.4) col+=shadeL(m,n,v,l,E,ang)*shadowK(q+n*.03,l,D,ang,true)*aw;
    }
    if(mode<.5){
      vec3 ambC=uAmb.rgb*(.45+.55*clamp(n.z*.5+.5,0.,1.))+uKc.rgb*uEx.w*.012*clamp(.5-n.z*.5,0.,1.);
      col+=m.alb*ambC*ao;
      vec3 R=reflect(rd,n);
      vec3 F=m.f0+(1.-m.f0)*pow(1.-nv,5.)*(1.-max(m.rx,m.ry)*.7);
      vec3 e=env(R,sqrt(m.rx*m.ry))*(hM==1?.3:1.);
      if(refl.z>0.){ vec3 brassR=vec3(.86,.64,.30)*(uKc.rgb*uEx.w*.05+uAmb.rgb*2.); vec3 hoseR=uHc.rgb*(uKc.rgb*uEx.w*.06+uAmb.rgb); e=mix(mix(e,hoseR,refl.y),brassR,refl.x); }
      col+=F*e*specOcc*mix(ao,1.,.4);
    }
  }
  float e0=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));
  vec3 enc=log2(1.+max(col,0.)*200.)/14.+(e0-.5)/255.;
  o=vec4(enc, .5+.5*tanh(clamp((dd-uF.w)/18.,-40.,40.)));
}
#else
void main(){
  DIN=uBarb.xy;
  vec2 jit=vec2(0);
  vec3 ro=uCam.xyz; vec3 rd=normalize(uF.xyz+(p.x*2.-1.)*uCam.w*uR.xyz+(p.y*2.-1.)*uCam.w*uUp.xyz);
  scene(ro,rd);
  if(!(OWN)) discard;
  float mode=uWc.w;
  vec3 col=vec3(0); float dd=hT;
  if(hM>0){
    vec3 q=ro+rd*hT, n=hN, v=-rd;
    gFP=hT*2.*uCam.w/uUp.w/max(abs(dot(n,rd)),.25);
    Mt m; m.alb=vec3(.1); m.f0=vec3(.04); m.rx=.5; m.ry=.5; m.tx=vec3(1,0,0); m.wrap=0.; m.ao=1.;
    float ao=1., specOcc=1.; bool hoseSh=true;
    vec3 refl=vec3(-1.);
#ifdef K_BENCH
    if(hM==1){
      benchMat(m,q,n);
      float r=length(q.xy);
      ao*=1.-.62*exp(-max(r-4.,0.)/.45);
      int NC=int(uEx.x);
      for(int i=5;i<NC;i++){ vec4 ca=CA[i], cb=CB[i]; if(ca.w>0.&&(cb.w==1.||cb.w==4.)){ vec3 a=ca.xyz, b=cb.xyz; vec3 ba=b-a; float h=clamp(dot(q-a,ba)/dot(ba,ba),0.,1.); float d=length(q-a-ba*h)-ca.w; ao*=1.-(cb.w==1.?.8:.55)*exp(-max(d,0.)/(ca.w*(cb.w==1.?.3:.45))); } }
      // a glossy top mirrors the burner, blurred by its roughness
      vec3 Rb=reflect(rd,n);
      float k=m.rx*.5+.01;
      float occB=1., occH=1.;
      for(int i=0;i<NC-4;i++){ vec4 ca=CA[i], cb=CB[i]; if(ca.w>0.&&cb.w!=2.){ float vv=capVis(q,Rb,60.,ca.xyz,cb.xyz,ca.w,k); if(cb.w==1.) occH*=vv; else occB*=vv; } }
      refl=vec3(1.-occB, 1.-occH, 1.);
    }
#endif
#ifdef K_MISC
    if(hM==2){
      // glazed subway tiles in running bond
      vec2 WT=vec2(uRod.y,-uRod.x);
      vec2 w=vec2(dot(q.xy,WT), q.z); float th=9.4, tw=9.4; float row=floor(w.y/th); vec2 cell=vec2(floor(w.x/tw), row);
      vec2 f=vec2(fract(w.x/tw)*tw, fract(w.y/th)*th);
      vec4 rn=NL(cell*.0731+.13,0.);
      float gd=min(min(f.x,tw-f.x),min(f.y,th-f.y));
      float grout=smoothstep(.32,.18,gd);
      vec3 a=uWlc.rgb*(.86+.28*rn.x)*(1.-.1*NL(w*.03,.03).y);
      vec4 sc=SL(w*.03+cell*.17,.03);
      a=mix(a, a*.75, sc.g*.6);
      a=mix(a, a*.55+vec3(.03,.028,.024), grout);
      float edge=smoothstep(.9,.25,gd)*(1.-grout);
      float nx=(rn.y-.5)*.04+(f.x<1.?-1.:(f.x>tw-1.?1.:0.))*edge*.25;
      n=normalize(vec3(WT*nx-uRod.xy, (rn.z-.5)*.04+(f.y<1.?-1.:(f.y>th-1.?1.:0.))*edge*.25));
      m.alb=a; m.f0=vec3(.045); m.rx=mix(.08+sc.r*.25,.8,grout); m.ry=m.rx;
      ao*=.9+.1*smoothstep(0.,6.,q.z);
    }
#endif
#ifdef K_BASE
    if(hM==3){
      float aq=atn2(q.y,q.x); vec4 nn=NL(vec2(aq*.3, length(q.xy)*.08+q.z*.2),.2);
      vec4 sc=SL(q.xy*.07+q.z*.11,.1);
      float edge=smoothstep(.36,.56,q.z)*step(length(q.xy),4.05);
      if(q.z<.56&&length(q.xy)>3.95) n=normalize(n+vec3(0,0,edge*1.4));
      { vec4 cg=NL(q.xy*2.1+q.z*.7,2.1), cg2=NL(q.xy*.7-q.z,.7); n=normalize(n+((cg.xyz-.5)*.32+(cg2.xyz-.5)*.12)*(1.-edge*.5)); }
      if(uM0.z<.5){ // painted cast iron, chipped on the edge
        float rim=smoothstep(3.55,3.9,length(q.xy));
        float chip=smoothstep(.68,.76,nn.w*.55+nn.y*.6)*rim;
        // black japan gone brown at the edges and where hands and water have been
        vec3 jp=mix(uBsc.rgb*(.8+.4*nn.y), vec3(.075,.045,.028), smoothstep(.45,.85,rim*.6+nn.w*.55));
        m.alb=mix(jp, vec3(.05,.047,.044), chip); m.f0=mix(vec3(.04), vec3(.075,.072,.068), chip); m.rx=mix(.6+nn.z*.2,.42,chip); m.ry=m.rx;
        m.alb=mix(m.alb, vec3(.16,.08,.04), smoothstep(.58,.9,nn.x)*(1.-chip)*.35); // broad stain blooms (the wear map's G rings drew loops on the iron)
      }
      m.alb*=1.+.2*sc.b;
      ao*=.55+.45*smoothstep(0.,.35,q.z);
      ao*=1.-.35*exp(-max(length(q.xy)-1.1,0.)/.25)*step(.9,q.z);
    }
#endif
#ifdef K_BRASS
    float reg=hM==4?2.:(hM==5?0.:(hM==6?1.:(hM==7?0.:(hM==9?3.:(hM==3&&uM0.z>1.5?4.:-1.)))));
    if(reg>=0.){
      gBN=vec3(0); brassMat(m,q,reg); if(hM!=7&&hM!=3) n=normalize(n+gBN);
      // turned edges are chamfered and catch the light
      float zt=hM==6?5.:(hM==4?2.78:(hM==5?ZR:-9.)), zb2=hM==6?3.:(hM==4?1.5:-9.);
      if(zt>0.){ n=normalize(n+vec3(0,0,1.1*smoothstep(.07,.0,zt-q.z)-1.1*smoothstep(.07,.0,q.z-zb2))); }
      if(hM==4){ ao*=1.-.4*exp(-abs(q.z-2.78)/.12); ao*=1.-.35*exp(-abs(q.z-1.6)/.08); }
      if(hM==5){ ao*=1.-.45*exp(-max(abs(q.z-4.)-1.,0.)/.12); ao*=1.-.3*exp(-(q.z-2.78)/.1); }
#ifdef K_KNURL
      if(hM==6){
        float u=atn2(q.y,q.x)*.82, v=q.z, pk=.105, a1=(u+v)/pk, a2=(u-v)/pk;
        float band=smoothstep(3.08,3.14,v)*smoothstep(3.62,3.56,v)+smoothstep(4.38,4.44,v)*smoothstep(4.92,4.86,v);
        float fade=band*smoothstep(.75,.3,gFP/pk);
        float s1=sign(fract(a1)-.5), s2=sign(fract(a2)-.5), hk=tri(a1)+tri(a2);
        vec3 tg=normalize(vec3(-q.y,q.x,0.));
        n=normalize(n-(tg*(s1+s2)+vec3(0,0,1)*(s1-s2))*.42*fade);
        m.f0*=1.-fade*.35*smoothstep(.9,.2,hk); ao*=1.-fade*.45*smoothstep(.8,.1,hk);
        m.rx+=fade*.15; m.ry+=fade*.15;
        n=normalize(n+vec3(0,0,.5*(smoothstep(.06,0.,abs(v-3.6))-smoothstep(.06,0.,abs(v-4.4)))));
      }
#endif
      if(hM==7){ m.f0*=vec3(.5,.4,.36)*(1.-.6*uM1.y); m.alb=vec3(.02); m.rx=.5; m.ry=.5; }
      if(hM==9){ m.tx=normalize(vec3(-DIN.y,DIN.x,0.)); float along=dot(q.xy,DIN); float sr=fract(along*2.2); if(along>3.2) n=normalize(n+vec3(DIN*(sr-.5)*.8,0.)); }
      if(hM==3){ m.f0*=.95; ao*=.55+.45*smoothstep(0.,.35,q.z); }
    }
    if(hM==8){ float dz=ZR-q.z; m.alb=vec3(.018,.016,.014); m.f0=vec3(.03); m.rx=.8; m.ry=.8; ao*=exp(-dz*1.6); specOcc=exp(-dz*2.); }
#endif
#ifdef K_MISC
    if(hM==10){
      vec4 nn=NL(q.xy*.2+q.z*.3,.3); vec4 sc=SL(q.xy*.05+q.z*.03,.05);
      vec4 nf=NL(q.xy*1.9+q.z*1.3,1.9);
      float seam=smoothstep(.05,.0,abs(n.z-.62)); m.alb=uHc.rgb*(.7+.4*nn.x)*(1.-.3*seam); m.f0=vec3(.018); m.rx=.74+.16*nn.y; m.ry=m.rx; m.wrap=uHc.w;
      float dust=smoothstep(-.3,.85,n.z)*(.35+.65*smoothstep(.3,.8,nn.z))+sc.g*.5;
      m.alb=mix(m.alb, vec3(.34,.32,.29), clamp(dust*.5+nf.w*.14,0.,.75)); m.rx=mix(m.rx,.95,dust*.6); m.ry=m.rx;
      n=normalize(n+(nf.xyz-.5)*.16+vec3(0.,0.,seam*.5));
      ao*=.45+.55*smoothstep(-.9,.2,n.z);
    }
    else if(hM==11){ m.alb=vec3(.015); m.f0=vec3(.5,.51,.52); m.rx=.14; m.ry=.34; m.tx=normalize(vec3(-n.y,n.x,1e-4)); }
    else if(hM==13){
      float h=hA-floor(hA/10.)*10.;
      vec4 nn=NL(q.xy*2.3,2.3);
      float ch=smoothstep(.55,.92,h+nn.x*.1);
      m.alb=mix(vec3(.62,.46,.28)*(.85+.3*nn.y), vec3(.025,.02,.018), ch); m.f0=vec3(.035); m.rx=.6; m.ry=.6;
      ao*=.6+.4*smoothstep(-.6,.6,n.z);
    }
#endif
#ifdef K_GB
    o=gPk(n,m,ao,refl); return;
  }
  o=uvec4(uGo==0?floatBitsToUint(hT):0u,0u,0u,0u);
}
#else
    float nv=max(dot(n,v),0.);
    int NL=int(uEx.y);
    for(int i=0;i<NL;i++){
      vec3 l; vec3 E; float ang, D, aw=1.;
      if(mode<.5){
        if(i==0){ vec3 lp=uK.xyz-q; D=length(lp); l=lp/D; float ca=dot(-l,uKd.xyz); float spot=max(smoothstep(uKc.w,uKd.w,ca),uWin.w*3.*pow(max(ca,0.),3.)); E=uKc.rgb*spot/(D*D); ang=uK.w/D; }
        else if(i==1){ l=uWd.xyz; D=80.; E=uWc.rgb*uWd.w*.55; ang=.35; }
        else break;
      } else {
        float fz=ZR+uFl.w*(i==0?.12:(i==1?.42:.78)); float wi=i==0?.45:(i==1?.35:.2);
        vec3 lp=vec3(q.xy/max(length(q.xy),1e-3)*(i==0?1.:.8),fz)-q; D=length(lp); l=lp/D; E=vec3(wi*30.)/(D*D+4.)*(hM==1?1.25:(hM==2?1.6:(hM>=4&&hM<=9?(hM==7?.3:.05):1.))); ang=.9/D; aw=mix(ao,1.,.5);
        if(hM==8) aw*=exp(-(ZR-q.z)*1.1);
      }
      if(max(E.r,max(E.g,E.b))>1e-6&&dot(n,l)>-.4) col+=shadeL(m,n,v,l,E,ang)*shadowK(q+n*.03,l,D,ang,true)*aw;
    }
    if(mode<.5){
      vec3 ambC=uAmb.rgb*(.45+.55*clamp(n.z*.5+.5,0.,1.))+uKc.rgb*uEx.w*.012*clamp(.5-n.z*.5,0.,1.);
      col+=m.alb*ambC*ao;
      vec3 R=reflect(rd,n);
      vec3 F=m.f0+(1.-m.f0)*pow(1.-nv,5.)*(1.-max(m.rx,m.ry)*.7);
      vec3 e=env(R,sqrt(m.rx*m.ry))*(hM==1?.3:1.);
      if(refl.z>0.){ vec3 brassR=vec3(.86,.64,.30)*(uKc.rgb*uEx.w*.05+uAmb.rgb*2.); vec3 hoseR=uHc.rgb*(uKc.rgb*uEx.w*.06+uAmb.rgb); e=mix(mix(e,hoseR,refl.y),brassR,refl.x); }
      col+=F*e*specOcc*mix(ao,1.,.4);
    }
  }
  float e0=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));
  vec3 enc=log2(1.+max(col,0.)*200.)/14.+(e0-.5)/255.;
  o=vec4(enc, .5+.5*tanh(clamp((dd-uF.w)/18.,-40.,40.)));
}
#endif
#endif
`,l0=`
uniform sampler2D uSrc;
float cocOf(float d){ return uR.w*(d-uF.w)/d*uUp.w/1000.; }
void main(){
  vec2 px=1./vec2(uUp.w);
  vec4 c0=texelFetch(uSrc,ivec2(gl_FragCoord.xy),0); float d0=dep(c0.a), k0=cocOf(d0);
  float CM=uR.w*.55*uUp.w/1000.;
  float w0=1./max(k0*k0,1.);
  vec3 acc=dec(c0)*w0; float ws=w0;
  for(int i=0;i<48;i++){
    float fi=float(i)+.5; float rr=sqrt(fi/48.)*CM; float an=fi*2.39996;
    vec2 off=vec2(cos(an),sin(an))*rr;
    ivec2 ip=clamp(ivec2(gl_FragCoord.xy+off),ivec2(0),ivec2(int(uUp.w)-1)); vec4 s=texelFetch(uSrc,ip,0); float ds=dep(s.a), ks=abs(cocOf(ds));
    float reach=ds<d0-1.?ks:min(ks,abs(k0));
    float w=smoothstep(rr-.8,rr+.8,reach)/max(reach*reach,1.);
    acc+=dec(s)*w; ws+=w;
  }
  vec3 col=acc/ws;
  float e0=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));
  o=vec4(log2(1.+col*200.)/14.+(e0-.5)/255., c0.a);
}`,f0=`
uniform sampler2D uA; uniform sampler2D uB; uniform sampler2D uN;
float wrapA(float x){ return x-2.*PI*floor((x+PI)/(2.*PI)); }
float zcAt(int i){ vec4 v=uZc[i>>2]; return dot(v, vec4(equal(ivec4(i&3), ivec4(0,1,2,3)))); }
vec2 zcSeg(float r){ float x=clamp(r/uPre.z,0.,.9999)*15.; int i=int(floor(x)); float a=zcAt(i), b=zcAt(i+1); return vec2(mix(a,b,x-float(i)), (b-a)*15./uPre.z); }
vec2 sway(float zz){ float s=pow(max(zz,0.)/10.,1.5); return uDif2.xy*s; }
vec2 cylRange(vec3 ro, vec3 rd, vec2 c, float r){
  vec2 o2=ro.xy-c; float a=dot(rd.xy,rd.xy), b=dot(o2,rd.xy), cc=dot(o2,o2)-r*r, h=b*b-a*cc;
  if(h<0.) return vec2(1.,-1.); h=sqrt(h); return vec2((-b-h)/a,(-b+h)/a);
}
float R0(float ze){ return uDif2.w*(.74+.62*sin(min(max(ze,0.),.5)*PI))*pow(max(1.-ze,0.),.62); }
float flick(float ze){ float s=0.; for(int k=0;k<3;k++){ vec4 v=uVx[k]; float x=(ze-v.x)/.085; s+=v.y*(-x)*exp(-x*x)*1.7; x=(ze-v.z)/.085; s+=v.w*(-x)*exp(-x*x)*1.7; } return s; }
void main(){
  vec3 ro=uCam.xyz; vec3 rd=normalize(uF.xyz+(p.x*2.-1.)*uCam.w*uR.xyz+(p.y*2.-1.)*uCam.w*uUp.xyz);
  float t=uT.x, zb=uPre.x, Ld=uDif.x;
  vec2 uv=p;
  // heat shimmer: the hot column above the flame bends what lies behind it
  if(uFlL.w>.001){
    vec2 cr=cylRange(ro,rd,vec2(0),4.);
    if(cr.y>cr.x){
      float tm=.5*(cr.x+cr.y); vec3 q=ro+rd*tm; float zz=q.z-zb;
      vec2 so=sway(zz); vec2 o2=q.xy-so; float d2=length(o2); float Rp=.7+.16*max(zz,0.);
      float s=uFlL.w*smoothstep(Rp,0.,d2)*smoothstep(-.5,2.5,zz-Ld*.6)*smoothstep(28.,18.,zz);
      if(s>0.){ vec4 nn=texture(uN, vec2(o2.x*.05+.3, (zz-t*120.)*.009)); vec4 nm=texture(uN, vec2(o2.x*.11, (zz-t*170.)*.021)+.5); uv+=((nn.xy-.5)*1.3+(nm.zw-.5))*s*3.2/uUp.w; }
    }
  }
  vec4 ea=texture(uA,uv), eb=texture(uB,uv);
  vec3 col=dec(ea)+dec(eb)*uFlL.rgb;
  float dS=dep(texture(uA,p).a)/dot(rd,uF.xyz)*1.;
  dS=dep(texture(uA,p).a);
  // the air collar: its hole slides over the tube's hole
  if(p.x>uCol.x&&p.x<uCol.z&&p.y>uCol.y&&p.y<uCol.w){
    float a=dot(rd.xy,rd.xy), b=dot(ro.xy,rd.xy), cc=dot(ro.xy,ro.xy)-.6724, h=b*b-a*cc;
    if(h>0.){
      float tc=(-b-sqrt(h))/a; vec3 q=ro+rd*tc;
      if(q.z>3.&&q.z<5.&&tc<dS+.5){
        float th=atan(q.y,q.x), dz=q.z-4.;
        {
          float hc=uT.w+uT.y;
          float da=.82*wrapA(th-hc); float d=length(vec2(da,dz));
          float aa=max(fwidth(d),.004);
          float inH=smoothstep(.33+aa,.33-aa,d);
          if(inH>0.){
            float ht=uT.w; float dt2=length(vec2(.65*wrapA(th-ht),dz));
            float inT=smoothstep(.30+aa,.30-aa,dt2);
            float fl=.5+.5*sin(t*37.+sin(t*23.)*2.)*sin(t*13.7); vec3 gl=uMisc.x*(vec3(.10,.34,.9)*(.7+.3*fl)+vec3(.9,.38,.08)*.45*fl)*smoothstep(.33,.06,dt2)*(.6+.4*texture(uN,vec2(th*.3,q.z*.4-t*2.)).x);
            vec3 inner=mix(col*vec3(.26,.22,.17), vec3(.004,.003,.002)+gl, inT);
            float wall=smoothstep(.22,.31,d);
            vec3 wc=col*(dz<0.?1.25:.22);
            col=mix(col, mix(inner,wc,wall*(1.-inT*.5)), inH);
            col+=uMisc.x*vec3(.35,.45,1.)*.05*exp(-d*d/.12)*(1.-inH*.6);
          }
        }
      }
    }
  }
  // the flame
  vec3 em=vec3(0); float tr=1.;
  if(p.x>uFbox.x&&p.x<uFbox.z&&p.y>uFbox.y&&p.y<uFbox.w){
    // premixed inner cone: a thin luminous sheet where the flow meets the flame speed
    float H=uPre.w;
    if(uPre.y>0.&&H>.02){
      float rb=uPre.z+.06;
      vec2 cr=cylRange(ro,rd,sway(H*.6)*.5,rb+abs(sway(H).x)+abs(sway(H).y));
      float tz0=(zb-.02-ro.z)/rd.z, tz1=(zb+H+.1-ro.z)/rd.z; float ta=max(cr.x,min(tz0,tz1)), tb=min(min(cr.y,max(tz0,tz1)),dS);
      if(ta<tb){
        // a hollow sheet a hair thick: bright where the eye runs along it (the limbs and the rounded tip), nearly clear
        // through the middle, a dark gap between its foot and the rim; lean and fast it wrinkles and shivers
        int NCS=int(uFl.x); float dt=(tb-ta)/float(NCS); float jc=fract(sin(dot(gl_FragCoord.xy,vec2(39.346,11.135)))*43758.5453);
        float wS=.048, wr=uPreC.w;
        for(int i=0;i<=NCS;i++){
          float tt=ta+dt*(float(i)+jc-.5); vec3 q=ro+rd*tt; float zz=q.z-zb; vec2 xy=q.xy-sway(zz)*.6; float r=length(xy);
          vec2 zs=zcSeg(r); float f=zz-zs.x+wr*sin(zz*7.3-t*47.+xy.x*9.)*sin(xy.y*8.-t*31.)*smoothstep(.2,1.,zz);
          float dn=f/sqrt(1.+zs.y*zs.y);
          em+=uPreC.rgb*uPre.y*exp(-dn*dn/(wS*wS))*smoothstep(.06,.4,zz)*(.55+.9*clamp(zz/H,0.,1.))*dt*(1./wS);
        }
      }
    }
    // outer flame: the diffusion sheet and the soot inside it. Buoyant waves carry the centreline sideways as they rise,
    // the section twists into a ribbon, and the edge is torn by turbulence that grows with height; the soot glows as a
    // shell just inside the sheet, in streaks drawn out by the flow, and goes dull, broken and smoky at the tip.
    if(Ld>.05){
      vec2 sw=sway(Ld*1.1); float wA=uDif2.z*2.4*uDif2.w; float rmax=uDif2.w*2.4+.4+length(sw)+wA*1.6;
      vec2 cr=cylRange(ro,rd,sw*.5,rmax);
      float ztop=zb+Ld*1.12+uMisc2.x*8.;
      float tz0=(zb-ro.z)/rd.z, tz1=(ztop-ro.z)/rd.z; float ta=max(cr.x,min(tz0,tz1)), tb=min(min(cr.y,max(tz0,tz1)),dS);
      if(ta<tb){
        int NS=int(uFl.y);
        float dt=(tb-ta)/float(NS); float fp=0.;
        float j=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
        float soot=uDif.z, ze0=uDif.w, sootV=soot*smoothstep(.15,.5,soot);
        for(int i=0;i<=NS;i++){
          float tt=ta+dt*(float(i)+(i==0?0.:j-.5)); vec3 q=ro+rd*tt; float zz=q.z-zb; float ze=zz/Ld;
          float zc=clamp(ze,0.,1.25);
          float ph=zz*.62-t*38.+uT.z, ph2=zz*1.37-t*61.+uT.z*1.7;
          vec2 wb=wA*pow(zc,1.4)*vec2(sin(ph)+.42*sin(ph2+1.7), .55*cos(ph*.83+.9)+.3*sin(ph2*1.1));
          vec2 xy=q.xy-sway(zz)-wb*smoothstep(.08,.35,soot); float r=length(xy);
          float th=atan(xy.y,xy.x)*.15915;
          vec4 nn=textureLod(uN, vec2(th+zz*.013, (zz-t*52.)*.085),0.);
          float tw=zz*.31-t*2.3+uT.z;
          float rag=smoothstep(.08,.35,soot)*((nn.y-.5)*1.7*smoothstep(.35,.9,ze)+(nn.x-.5)*.7*zc*smoothstep(.2,.7,ze)+.24*zc*cos(6.2832*2.*th-2.*tw));
          float Rd=R0(ze)*(1.+flick(ze)*smoothstep(0.,.3,ze))*(1.+rag);
          float f=r-max(Rd,0.);
          if(ze<1.){
            if(i>0&&f*fp<0.){
              vec2 dir=xy/max(r,1e-4); float cs=abs(dot(rd.xy,dir));
              float mz=(1.-smoothstep(ze0-.12,ze0+.08,ze)*min(1.,soot*2.6)*.96)*smoothstep(0.,.05,ze)*(1.-smoothstep(.6,1.,ze)*.85);
              mz*=mix(.35,1.,smoothstep(.08,.3,soot))*(1.+2.2*soot*(1.-smoothstep(ze0-.06,ze0+.06,ze)));
              em+=tr*uDif.y*mz*mix(vec3(.16,.26,1.),vec3(.40,.26,.95),smoothstep(.05,.6,ze))/max(cs,mix(.75,.3,smoothstep(.08,.3,soot)));
            }
            if(uBsc.w>.5&&f<0.){ float sd=smoothstep(.15,.9,dot(xy,vec2(.71,.71))/max(r,1e-3))*smoothstep(.3,.95,r/max(Rd,.01)); em+=tr*(uBsc.w>1.5?vec3(.12,.85,.3):vec3(1.,.48,.05))*sd*(.3+1.4*nn.x*nn.x)*smoothstep(.0,.1,ze)*(1.-ze)*.11*dt; }
            // the faint outer mantle of a blue flame is a soft violet volume, not a line
            if(f<0.&&soot<.3) em+=tr*uDif.y*(1.-soot*3.3)*1.5*smoothstep(0.,.08,ze)*(1.-ze)*(1.-ze)*smoothstep(0.,.3,-f)*(.75+.5*nn.z)*mix(vec3(.22,.3,1.),vec3(.42,.27,.95),smoothstep(.1,.7,ze))*dt;
            if(f<.25&&soot>.001&&Rd>.01){
              float rn=r/Rd;
              float sz=smoothstep(ze0,ze0+.22,ze);
              float shell=smoothstep(.38,.9,rn)*smoothstep(1.2,.84,rn);
              float sr=mix(shell, smoothstep(1.1,.6,rn), smoothstep(ze0+.1,.9,ze)*.6);
              vec4 n2=textureLod(uN, vec2(th*2.+rn*.07, (zz-t*66.)*.012),0.);
              float tip=smoothstep(.7,1.,ze);
              float streak=.5+1.*n2.y*n2.y+.3*(nn.w-.5);
              float brk=mix(1., smoothstep(.42,.62,n2.x+nn.y*.35-.1), tip);
              float s=soot*sz*sr*streak*brk*(1.-.55*tip);
              // hottest low in the middle (clean yellow-white), deep orange at the tips, red-brown where it tears
              float heat=clamp(1.-1.1*smoothstep(.1,.72,ze)+.3*(streak-.8)-.45*max(rn-.55,0.),0.,1.);
              vec3 sc=mix(vec3(1.,.24,.02), vec3(1.35,.78,.22), smoothstep(0.,.55,heat));
              sc=mix(sc, vec3(1.5,1.22,.66), smoothstep(.55,1.,heat));
              sc=mix(sc, vec3(.7,.14,.02), tip*.7);
              em+=tr*s*sc*uMisc2.w*dt*.75;
              tr*=exp(-s*.05*dt);
            }
          } else if(uMisc2.x>0.){
            float rr=r/(.3+.12*(zz-Ld));
            float sm=uMisc2.x*exp(-rr*rr)*smoothstep(.3,.8,textureLod(uN, vec2(xy.x*.2+th*.3, (zz-t*40.)*.03),0.).y)*smoothstep(1.,1.06,ze)*smoothstep(1.4,1.15,ze);
            tr*=exp(-sm*1.6*dt);
            em+=tr*sm*vec3(.5,.1,.01)*smoothstep(1.2,1.,ze)*dt*uMisc2.w*.05;
          }
          fp=f;
        }
      }
    }
    // ignition kernel and the flashback pop: small, eased
    if(uMisc.z>0.){ vec3 cc=vec3(0,0,ZR+.3+uMisc.y*1.4); vec3 oc=cc-ro; float tq=dot(oc,rd); float d=length(oc-rd*tq); float rk=max(uMisc.y,.1); em+=uMisc.z*exp(-d*d/(rk*rk))*vec3(.6,.62,1.)*(1.+.5*sin(d*3.)); }
    if(uMisc.w>0.){ vec3 cc=vec3(0,0,ZR+.2); vec3 oc=cc-ro; float tq=dot(oc,rd); float d=length(oc-rd*tq); em+=uMisc.w*exp(-d*d/.5)*vec3(1.,.62,.4); }
  }
  col=col*tr+em;
  col*=uAmb.w;
  col=(col*(2.51*col+.03))/(col*(2.43*col+.59)+.14);
  vec2 dv=p-vec2(.45,.55); col*=1.-.16*dot(dv,dv);
  float g=texture(uN, p*uUp.w/256.+fract(vec2(.37,.71)*floor(t*24.))).w-.5;
  col=clamp(col,0.,1.);
  col=pow(col,vec3(1./2.2));
  col+=g*.016*(1.-col*.7);
  o=vec4(col,1.);
}`,h0=()=>{const a=(...s)=>s.map(T=>"#define K_"+T+`
`).join(""),e=s=>"#define OWN "+s+`
`,o="(hM==2||hM>=10||(hM==3&&uM0.z<.5))";let r=!1;try{const s=t.getExtension("WEBGL_debug_renderer_info");r=/Direct3D/.test(String(t.getParameter(t.RENDERER))+(s?t.getParameter(s.UNMASKED_RENDERER_WEBGL):""))}catch{r=!1}return r?[a("GB","BENCH")+e("(hM<2)"),a("GB","MISC","BASE")+e(o),a("GB","BRASS","KNURL")+e("(hM==4||hM==6)"),a("GB","BRASS","BASE")+e("(hM>1&&hM!=4&&hM!=6&&!"+o+")")]:[a("BENCH","MISC","BRASS","BASE","KNURL")+e("true")]};function m0(){const a=(n,i)=>{const m=t.createShader(n);return t.shaderSource(m,i),t.compileShader(m),m},e=(n,i=wa)=>{const m=a(t.VERTEX_SHADER,i0),c=a(t.FRAGMENT_SHADER,i+n),R=t.createProgram();return t.attachShader(R,m),t.attachShader(R,c),t.linkProgram(R),{P:R,v:m,f:c}},o=h0(),r=o.length>1,s=wa.replace("out vec4 o;","out uvec4 o;"),T=o.map(n=>r?e(n+Ce,s):e(n+Ce)),w=r?e(`#define LP
`+Ce):null,g=e(l0),E=e(f0);t.flush();const v=(n,i)=>{if(!t.getProgramParameter(n.P,t.LINK_STATUS))throw new Error("357 link: "+t.getProgramInfoLog(n.P)+" "+t.getShaderInfoLog(n.f));const m=t.getUniformBlockIndex(n.P,"U");m!==t.INVALID_INDEX&&t.uniformBlockBinding(n.P,m,0),t.useProgram(n.P),i.forEach((c,R)=>{const N=t.getUniformLocation(n.P,c);N&&t.uniform1i(N,R)})},f=(n,i,m)=>{const c=t.createTexture();return t.bindTexture(t.TEXTURE_2D,c),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,n,n,0,t.RGBA,t.UNSIGNED_BYTE,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,m),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,m),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.generateMipmap(t.TEXTURE_2D),c};let h=625341585;const p=()=>(h^=h<<13,h>>>=0,h^=h>>>17,h^=h<<5,h>>>=0,h/4294967296),x=256,S=new Float32Array(x*x*4),bt=new Uint8Array(x*x*4),Xt=[[[4,.5],[8,.3],[16,.15],[32,.08]],[[8,.5],[16,.3],[32,.15],[64,.08]],[[16,.45],[32,.3],[64,.25]],[[64,.4],[128,.6]]];for(let n=0;n<4;n++)for(const[i,m]of Xt[n]){const c=new Float32Array(i*i);for(let N=0;N<c.length;N++)c[N]=p();const R=i/x;for(let N=0;N<x;N++){const _=N*R,k=Math.floor(_),Z=_-k,kt=Z*Z*(3-2*Z),V=k%i*i,Wt=(k+1)%i*i;for(let qt=0;qt<x;qt++){const _a=qt*R,na=Math.floor(_a),sa=_a-na,Ua=sa*sa*(3-2*sa),Be=na%i,La=(na+1)%i,Pa=c[V+Be]+(c[V+La]-c[V+Be])*Ua,w0=c[Wt+Be]+(c[Wt+La]-c[Wt+Be])*Ua;S[(N*x+qt)*4+n]+=(Pa+(w0-Pa)*kt)*m}}}for(let n=0;n<4;n++){let i=9,m=-9;for(let c=n;c<S.length;c+=4)i=Math.min(i,S[c]),m=Math.max(m,S[c]);for(let c=n;c<S.length;c+=4)bt[c]=Math.round(255*(S[c]-i)/(m-i))}const D=512,G=new Float32Array(D*D*4),Bt=new Uint8Array(D*D*4),gt=(n,i,m,c)=>{const R=Math.floor(n),N=Math.floor(i),_=n-R,k=i-N,Z=D-1,kt=R&Z,V=R+1&Z,Wt=(N&Z)*D,qt=(N+1&Z)*D;G[(Wt+kt)*4+m]+=c*(1-_)*(1-k),G[(Wt+V)*4+m]+=c*_*(1-k),G[(qt+kt)*4+m]+=c*(1-_)*k,G[(qt+V)*4+m]+=c*_*k};for(let n=0;n<380;n++){let i=p()*D,m=p()*D,c=[.35,1.95,2.7][n%3]+(p()-.5)*.5;const R=6+p()*p()*160,N=.2+p()*.8,_=(p()-.5)*8e-4;for(let k=0;k<R;k+=.5)gt(i,m,0,N*(.6+.4*Math.sin(k*.3+n))),i+=Math.cos(c)*.5,m+=Math.sin(c)*.5,c+=_}for(let n=0;n<22;n++){const i=p()*D,m=p()*D,c=10+p()*50,R=.3+p()*.6,N=p()*6.283,_=3+p()*3.3;for(let k=0;k<_*c;k+=.5){const Z=N+k/c,kt=c+Math.sin(Z*3+n)*1.5;for(let V=-2;V<=2;V++)gt(i+Math.cos(Z)*(kt+V*.7),m+Math.sin(Z)*(kt+V*.7),1,R*(1-Math.abs(V)/3)*.3)}}for(let n=0;n<40;n++){const i=p()*D,m=p()*D,c=4+p()*16,R=.2+p()*.4;for(let N=-c;N<=c;N++)for(let _=-c;_<=c;_++){const k=Math.hypot(_,N)/c;k<1&&gt(i+_,m+N,2,R*(1-k*k)*(.6+.4*Math.sin((_*.8+N*.3)*1.7)))}}for(let n=0;n<D*D;n++)G[n*4+3]=p()<.04?p():0;for(let n=0;n<G.length;n++)Bt[n]=Math.min(255,Math.round(Math.min(1.5,G[n])*200));const At=f(x,bt,t.REPEAT),ft=f(D,Bt,t.REPEAT),St=t.createVertexArray();T.forEach(n=>{v(n,["uN","uS"]),n.go=t.getUniformLocation(n.P,"uGo")}),w&&v(w,["uN","uS","uG0","uG1"]),v(g,["uSrc"]),v(E,["uA","uB","uN"]);const wt=t.createBuffer();return{pBs:T,pLt:w,pL:g,pO:E,tN:At,tS:ft,vao:St,ubo:wt,tg:{},bk:new Map}}const b=t.__c357||(t.__c357=m0());b.bk||(b.bk=new Map);const Ie=()=>{const a=t.createTexture();t.bindTexture(t.TEXTURE_2D,a),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,I,I,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const e=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,e),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,a,0),{t:a,f:e}};b.tg[I]||(b.tg[I]={raw:Ie()});const za=I+"|"+y.hash;let P=b.bk.get(za),x0=!!P;P||(P={raw:b.tg[I].raw,A:Ie(),B:Ie()},b.bk.set(za,P),b.bk.size>8&&b.bk.delete(b.bk.keys().next().value));const u0=110,z=new Float32Array(u0*4),d=(a,e,o,r,s)=>{z[a*4]=e,z[a*4+1]=o,z[a*4+2]=r,z[a*4+3]=s},d0=Math.hypot(q[0],q[1],q[2]-(Mt==="On the flame"?O+.8:6.5))-.4;d(0,q[0],q[1],q[2],Lt),d(1,tt[0],tt[1],tt[2],d0),d(2,st[0],st[1],st[2],17),d(3,Ct[0],Ct[1],Ct[2],I),d(4,A[0],A[1],A[2],s0);const Xe=Ht(Zt);d(5,Xe[0]*dt,Xe[1]*dt,Xe[2]*dt,ba),d(6,Pe[0],Pe[1],Pe[2],ga),d(7,et[0],et[1],et[2],Vt),d(8,Et[0],Et[1],Et[2],0),d(9,Rt[0],Rt[1],Rt[2],Yt),d(10,30,40,O,9),d(11,Ue[2],0,{iron:0,brass:2}[ha],a0),d(12,ve[1],r0,n0,o0);const We=Ht(Ue[0]);d(13,We[0],We[1],We[2],Ue[1]);const He=Ht(t0),ya=[[4,0,4,.36,3,0],[4,.36,3.86,.54,3,0],[3.86,.54,3.3,.6,3,0],[3.3,.6,1.36,1.62,3,0],[1.36,1.62,1.1,1.62,3,0],[1.1,1.5,1.1,2.71,4,0],[1.1,2.71,1.03,2.78,4,0],[1.03,2.78,.64,2.78,4,0],[.65,2.78,.65,O,5,0],[.65,O,.55,O,7,0],[.55,O,.55,O-9,8,0],[.82,3,.82,5,6,0],[.82,5,.64,5,6,0],[.36,.9,.36,4.3,9,1],[.6,2.3,.665,2.62,10,1],[.665,2.62,.6,2.95,10,1],[.6,2.95,.665,3.27,10,1],[.665,3.27,.6,3.6,10,1],[.6,3.6,.6,4.1,10,1],[.6,2.3,.36,2.3,10,1]];ya.forEach((a,e)=>{d(70+e,a[0],a[1],a[2],a[3]),d(90+e,a[4],a[5],0,0)}),d(14,He[0],He[1],He[2],ya.length);const Ge=Ht(ve[0][0]!==void 0?ve[0]:[.5,.2,.1]);d(15,Ge[0],Ge[1],Ge[2],ve[1]===2?.6:.25);const Oe=Ht(e0);d(16,Oe[0],Oe[1],Oe[2],he==="sodium"?1:he==="copper"?2:0),d(17,ut[0],ut[1],0,de);{const a=jt([tt[0],tt[1],0]);d(18,a[0],a[1],da,0)}{const a=[[0,0,2.6,.65,0,0,O-.5,0],[0,0,3.6,.82,0,0,4.4,0],[0,0,1.9,1.1,0,0,2.4,0],[0,0,.3,3.4,0,0,.3,3],[ut[0],ut[1],de,.5,ut[0]*4,ut[1]*4,de,0]];for(let e=0;e<7;e++)a.push([Tt[e][0],Tt[e][1],Tt[e][2],.6,Tt[e+1][0],Tt[e+1][1],Tt[e+1][2],1]);a.push([pa,va,0,da?.55:-1,pa,va,90,2]);for(let e=0;e<3;e++){const o=pe[e];a.push(o?[o[0],o[1],o[2],.1,o[4],o[5],o[6],4]:[0,0,0,-1,0,0,0,4])}a.forEach((e,o)=>{d(36+o,e[0],e[1],e[2],e[3]),d(52+o,e[4],e[5],e[6],e[7])}),z[69*4]=a.length}d(68,.36,.2,.7,Ft==="Cold lamp"?.022:.02),d(69,16,3,$a,c0>0?1/Math.max(1,Math.hypot(A[0],A[1],A[2]))**2:0);const p0=Math.atan2(-Pt[1],-Pt[0])+Math.PI-34*ht,be=ua(-.9,.9,-.9,.9,2.95,5.05,.01);d(20,be[0],be[1],be[2],be[3]);const Jt=(a,e)=>{t.bindFramebuffer(t.FRAMEBUFFER,e),t.viewport(0,0,I,I),t.useProgram(a.P),t.bindVertexArray(b.vao),t.bindBufferBase(t.UNIFORM_BUFFER,0,b.ubo),t.drawArrays(t.TRIANGLES,0,3)},Ma=()=>{t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0)};function v0(){if(Ma(),b.pLt){const a=[0,1].map(()=>{const e=t.createTexture();t.bindTexture(t.TEXTURE_2D,e),t.texStorage2D(t.TEXTURE_2D,1,t.RGBA32UI,I,I),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const o=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),{t:e,f:o}});z[8*4+3]=0,t.bindBuffer(t.UNIFORM_BUFFER,b.ubo),t.bufferData(t.UNIFORM_BUFFER,z,t.DYNAMIC_DRAW),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,b.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,b.tS),t.bindVertexArray(b.vao),t.bindBufferBase(t.UNIFORM_BUFFER,0,b.ubo);for(let e=0;e<2;e++){t.bindFramebuffer(t.FRAMEBUFFER,a[e].f),t.viewport(0,0,I,I);for(const o of b.pBs)t.useProgram(o.P),t.uniform1i(o.go,e),t.drawArrays(t.TRIANGLES,0,3)}for(const e of[0,1])z[8*4+3]=e,t.bindBuffer(t.UNIFORM_BUFFER,b.ubo),t.bufferData(t.UNIFORM_BUFFER,z,t.DYNAMIC_DRAW),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,b.tN),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,a[0].t),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,a[1].t),Jt(b.pLt,P.raw.f),t.flush(),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,P.raw.t),Jt(b.pL,e?P.B.f:P.A.f),t.flush();t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null),a.forEach(e=>{t.deleteFramebuffer(e.f),t.deleteTexture(e.t)})}else for(const a of[0,1]){z[8*4+3]=a,t.bindBuffer(t.UNIFORM_BUFFER,b.ubo),t.bufferData(t.UNIFORM_BUFFER,z,t.DYNAMIC_DRAW),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,b.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,b.tS);for(const e of b.pBs)Jt(e,P.raw.f);t.flush(),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,P.raw.t),Jt(b.pL,a?P.B.f:P.A.f),t.flush()}t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,null)}x0?z[8*4+3]=1:v0();let ct=F,pt=X,W=F,at=X,K=X,M=0,it=!0,H=1,ot=0,rt=!1,C=0,$t=9,It=9,nt=-1,ge=0,j=0,lt=0,te=0,we=2,y0=0,vt=0,ee=0,ze=0,ye=0,Me=0;{const a=$(ct,pt,!0);ge=Math.min(a.H,9,a.Ld>0?a.Ld*.85:9),j=a.Ld,lt=a.soot,te=a.prem,we=a.phi,J==="Lifted"&&(rt=!0,ot=.5)}const Nt=[];let Ke=0,je=1/12.5;for(let a=0;a<4;a++)Nt.push({z:.15+a*.22,a:.6+.4*l()});const Ta={"Still air":.12,"Slight draught":.55,"Open window":1.4}[se],Ze=l()*6.28,Ea=l()*6.28,Ra=l()*6.28,Na=(l()-.5)*1.2;let Te=0,Ve=2+l()*4,Ye=9+l()*20,Da=0,Qe=0,Je=0,ae=!1,Ee=0,Re=!1,$e=0,ta=0,Ne=0,oe=[],De=0,Ba=ct,Dt=19088743,ea=0,aa=0,oa=0,ra=0,Aa=0;const B={phase:-1,T:0,next:60+120*U(),st:null,from:[0,0]},b0=()=>{const a=Math.abs(W-F)>.15||Math.abs(at-X)>.12,e=U();let o;if(a&&e<.4)o={psi:F,g:ie(F,X)};else if(qe>.04&&e<.55)o={psi:0,g:Math.max(.03,qe-.08),fbk:!0};else if(e<.8){let r=U()*_t;Math.abs(r-W)<.3&&(r=W>.5?r*.4:_t-r*.3),o={psi:r,g:ie(r,at)}}else{const r=Math.min(1.35,Math.max(.35,at+(U()<.5?-1:1)*(.15+.2*U())));o={psi:W,g:ie(W,r)}}o.ramp=2+U(),B.st=o,B.phase=0,B.T=0,B.from=[W,at]},re=()=>{it=!1,y.sound.hit("click",.3)};let Sa=0;const ka=()=>{{const a=$(W,Math.max(at,.05));if(a.prem>.25&&a.gw<a.gF*1.15){W=_t,nt=Sa+.5;return}}it=!0,pt=Math.max(pt,.05),K=pt,M=0,It=0,H=0,rt=!1,ot=0,C=0,y.sound.hit("kick",.35),y.sound.hit("noise",.25),y.sound.note(38,{dur:.25,vel:.15,wave:"sine"})};let ne=$(ct,pt,!0);function qa(a,e){ct+=(W-ct)*(1-Math.exp(-e/.1)),pt+=(at-pt)*(1-Math.exp(-e/.16)),Ye-=e,Je-=e,Ye<0&&(Ye=7+l()*24,Da=.04+.07*l(),Je=.8+1.8*l()),Qe+=((Je>0?Da:0)-Qe)*(1-Math.exp(-e/.5));const o=1+.03*Math.sin(.37*a+Ze)+.02*Math.sin(.113*a+Ra)-Qe;K+=((it?pt*o:0)-K)*(1-Math.exp(-e/.09)),Math.abs(ct-Ba)>.07&&(Ba=ct,De++);const r=ne=$(ct,Math.max(.004,K),!0);if(M===0){K<.03&&!it&&(M=2),C===0&&r.prem>.25&&r.gw<r.gF&&K>.02&&(C=1e-4),C>0&&(C+=e/.12,C>=1&&(C=0,M=1,$t=0,y.sound.hit("kick",.9),y.sound.hit("snare",.45),y.sound.note(31,{dur:.3,vel:.3,wave:"sine"}))),C===0&&M===0&&r.prem>.25&&r.phi<1.4&&r.gw>1.55*r.gB&&(M=3,y.sound.hit("noise",.3)),C===0&&M===0&&K>.02&&H>.5&&r.prem<.04&&r.Ld<.3&&(M=3,y.sound.hit("noise",.15)),r.prem>.25&&r.phi<1.4?(!rt&&r.gw>r.gB&&(rt=!0),rt&&r.gw<.85*r.gB&&(rt=!1)):rt=!1;const g=rt?Math.min(1.3,.25+2.6*Math.max(0,r.gw/r.gB-.85)):0;ot+=(g-ot)*(1-Math.exp(-e/.12)),H+=((K>.02?1:0)-H)*(1-Math.exp(-e/(It<.3?.05:.08)))}else H+=(0-H)*(1-Math.exp(-e/.05)),ot+=(0-ot)*(1-Math.exp(-e/.2)),!it&&K<.03&&(M=2);vt+=((M===1&&K>.02?Math.min(1,.4+K):0)-vt)*(1-Math.exp(-e/.15)),nt>0&&a>=nt&&(nt=-1,ka());const s=1-Math.exp(-e/.07),T=r.prem>.01?Math.min(r.H,9.5,r.Ld>0?Math.max(r.Ld*.8,.3):9.5):0;ge+=(T-ge)*s,j+=(r.Ld-j)*s,lt+=(r.soot-lt)*s,te+=(r.prem-te)*s,we+=(r.phi-we)*s,It+=e,$t+=e,Ke+=e,Ke>=je&&(Ke-=je,je=1/(12.5*(.88+.24*l())),Nt.push({z:.12,a:.75+.5*l()}),Nt.length>6&&Nt.shift());const w=Math.max(1,j);for(const g of Nt){const E=45+150*Math.sqrt(Math.max(0,g.z)*w/10);g.z+=E*e/w}return Ve-=e,Ve<0&&(Ve=1.5+l()*5,Te=(l()-.3)*(se==="Open window"?1.6:se==="Slight draught"?.6:.15)),r}function g0(a){const e=ne,o=Ta*(1+.6*Math.abs(Te)),r=o*(.55*Math.sin(.73*a+Ze)+.3*Math.sin(1.91*a+Ea)+.18*Math.sin(3.37*a+Ra))+Te*Ta*.8,s=o*.35*Math.sin(.51*a+Ea+1),T=Math.cos(Na),w=Math.sin(Na);d(29,r*T-s*w,r*w+s*T,0,0);const g=O+ot-C*.6,E=te*H*(M===0?1:0),v=ge*(1-C)*(1-C)*(rt?.8:1),f=1+.4*ot,h=we,p=Math.max(0,Math.min(1,(h-.85)/.6)),x=[.16-.04*p+.25*Math.max(0,.9-h),.3+.55*p,1-.2*p];Gt==="Town gas"&&(x[0]=.2+.1*x[0],x[1]=.62+.1*p,x[2]=.5);const S=.0095*E*Math.min(1.3,Math.sqrt(Math.max(0,ne.S)/.35))*(h>1.6?Math.max(.25,1-(h-1.6)*.5):1)*(1+.6*C);d(22,g,S,ke*f,v),d(23,x[0],x[1],x[2],.035*Math.min(1,Math.max(0,(ne.Re-900)/1500))*Math.max(0,1.2-h)*2.5*(1+ot));for(let i=0;i<16;i++)z[24*4+i]=Y[i]*(v/Math.max(.01,e.H||1))*(e.H>0?1:0);const bt=j*H*(M===0?1:0)*(1-C),Xt=.007*(h>1?Math.min(1,Math.sqrt(1-1/h)):.25)*H*(Gt==="Town gas"?.5:1),D=lt*H,G=.62-.5*Math.min(1,lt*2.2),Bt=Math.max(bt,h<=1.05&&E>0?v*3.2:0);d(28,Bt,Xt,D,G);const gt=Math.min(1,j/11)*(.16+.24*lt)*(1+.5*Math.abs(Te))*(rt?1.6:1);z[29*4+2]=gt,z[29*4+3]=(.56+.022*Math.min(14,j))*f;for(let i=0;i<6;i++){const m=Nt[Nt.length-1-i],c=m?m.z:9,R=m?m.a*gt*Math.min(1.5,Math.pow(Math.max(0,c)/.7,2.4)):0;z[(30+(i>>1))*4+(i&1)*2]=c,z[(30+(i>>1))*4+(i&1)*2+1]=R}const At=D*Math.min(1.4,bt/9)*3.6*Qt,ft=(E*.2*Math.min(1,v/2.5)+Xt*2.4)*Qt,St=At*1+ft*.3+vt*.1,wt=At*.56+ft*.45+vt*.12,n=At*.22+ft*1+vt*.18;return[St,wt,n,D*Math.min(1.3,bt/9),g,Bt]}function Fa(a,e){const o=g0(a),r=1-Math.exp(-Math.max(e,.001)/.28);if(e<=0)ee=o[0],ze=o[1],ye=o[2],Me=o[3];else{const h=o[0]<ee?1-Math.exp(-Math.max(e,.001)/.07):r;ee+=(o[0]-ee)*h,ze+=(o[1]-ze)*h,ye+=(o[2]-ye)*h,Me+=(o[3]-Me)*h}const s=$t<.4?.6*Math.exp(-$t/.07)*Math.min(1,$t/.015):0;d(33,ee+s*.15,ze+s*.1,ye+s*.08,Math.min(1,H*(.25+.6*Math.min(1,j/8))+vt*.6));const T=It<.35?Math.sin(Math.min(1,It/.35)*Math.PI)*.12:0;d(34,vt*1.5,Math.min(1.4,.3+It*6),T,s),z[33*4]+=T*Qt*5,z[33*4+1]+=T*Qt*4.4,z[33*4+2]+=T*Qt*3.6,d(35,Math.max(L.smoke&&lt>.85&&j>12&&M===0?Math.min(1,(j-12)/4)*.9:0,M===0?.3*lt*H*Math.min(1,j/5):0),Me*.1,pe.length,1),d(19,a,ct,Ze,p0);const w=o[4],g=o[5],E=Math.hypot(z[29*4],z[29*4+1])*Math.pow(Math.max(g,3)*1.15/10,1.5),v=z[29*4+3]*2.5+.55+E+z[29*4+2]*2.4*z[29*4+3]*1.6,f=ua(-v-1.5,v+1.5,-v-1.5,v+1.5,Math.min(w,O)-1.2,w+Math.max(g*1.15+z[35*4]*8,z[22*4+3]+.3,3.2)+.5,.01);d(21,f[0],f[1],f[2],f[3]),Ma(),t.bindBuffer(t.UNIFORM_BUFFER,b.ubo),t.bufferData(t.UNIFORM_BUFFER,z,t.DYNAMIC_DRAW),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,P.A.t),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,P.B.t),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,b.tN),Jt(b.pO,null)}return qa(0,1/30),Fa(0,0),(a,e)=>{e=Math.min(Math.max(e,0),.25),Sa=a;const o=y.input,r=o.taps();if(r.length&&oe.push(...r),o.down)if(!Re)Re=!0,$e=o.x,ta=o.y,Ne=0;else{const f=o.x-$e,h=o.y-ta;$e=o.x,ta=o.y,Ne+=Math.abs(f)+Math.abs(h),Ne>.02&&(ae=!0,oe.length=0,W=Math.min(_t,Math.max(0,W-f*2.2)),at=Math.min(1.45,Math.max(.03,at-h*2.4)))}else Re&&(Re=!1,Ne>.02&&(oe.length=0));if(!o.down&&oe.length&&(ae=!0,oe.length=0,M===0&&it?re():M===1||M===3?(re(),nt=a+.8):nt<0&&ka()),Ee=o.down||r.length?0:Ee+e,ae&&Ee>18&&(ae=!1,B.phase=-1,B.next=a+60+120*U(),(M!==0||!it)&&(it&&re(),nt=a+.6)),!ae){if(B.phase<0)a>B.next&&Ee>6.5&&b0();else{const f=B.st;B.T+=e;const h=Math.min(1,B.T/f.ramp),p=h*h*(3-2*h);W=B.from[0]+(f.psi-B.from[0])*p,at=B.from[1]+(f.g-B.from[1])*p,f.fbk&&M===1&&!f.hit&&(f.hit=B.T),(f.fbk?f.hit?B.T>f.hit+3+2*h:B.T>f.ramp+4:B.T>f.ramp)&&(f.fbk&&(M===1||M===3)&&(re(),nt=a+.9,W=F,at=ie(F,X)),B.phase=-1,B.next=a+60+120*U())}M===3&&nt<0&&(re(),nt=a+1)}const s=Math.max(1,Math.min(8,Math.ceil(e/(1/60))));for(let f=0;f<s;f++)qa(a-e+e*(f+1)/s,e/s);De&&(y.sound.hit("click",.06+.03*Math.min(3,De)),De=0);const T=ne,w=M===0?H:0,g=w*te*Math.min(1.5,Math.max(0,(T.Re-400)/1600))*(1+1.5*Math.min(1,ot))*.55+vt*.45,E=w*lt*Math.min(1,j/10)*.35,v=(M===3||M===2&&it?1:0)*K*.12;if(g+E+v>.004){const f=Math.min(900,Math.round(e*8e3)),h=new Float32Array(f),p=.1+.22*Math.min(1,g)+(M===1?.15:0);for(let x=0;x<f;x++){Dt^=Dt<<13,Dt^=Dt>>>17,Dt^=Dt<<5;const S=(Dt>>>0)/4294967296-.5;ea+=(S-ea)*p,aa+=(ea-aa)*p,oa+=(S-oa)*.03,ra+=(S-ra)*.5,Aa+=12.5*2*Math.PI/8e3,h[x]=aa*g*5+oa*E*9*(.6+.4*Math.sin(Aa))+(S-ra)*v*1.2}y.sound.pcm(h,8e3,{vel:.6})}Fa(a,e)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
