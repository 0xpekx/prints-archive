// Foggy Mirror: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/276.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(_o){_o&&function(){"use strict";const Ct=`#version 300 es
precision highp float;
precision highp sampler2D;
`,Me=Ct+"out vec2 v;void main(){vec2 p=vec2(float((gl_VertexID&1)<<2),float((gl_VertexID&2)<<1));v=p*.5;gl_Position=vec4(p-1.,0.,1.);}",Oe=`uniform sampler2D uN;
float nz(vec2 p){return textureLod(uN,p*(1./256.),0.).r;}
float fbm(vec2 p){p*=1./256.;return .5*textureLod(uN,p,0.).r+.25*textureLod(uN,p*2.03+.37,0.).g+.125*textureLod(uN,p*4.07+.71,0.).b+.125*textureLod(uN,p*8.13+.13,0.).a;}
vec4 hsh(vec2 c){return texelFetch(uN,ivec2(mod(c,256.)),0);}
vec3 dec(vec3 e){return e/max(1.-e,vec3(.004));}
vec4 enc(vec3 x){x=max(x,vec3(0.));return vec4(x/(1.+x),1.);}
`,Ea=`uniform vec4 eC,eR,eU,eF,eRm,eRm2,eL1,eL1c,eL2,eL2c,eTa,eTb,eTw,eTwc,eSt,eMr,eMw;uniform int eMode;
`,La=`
float aoF(float d){return d<.003?1.:mix(.48,1.,smoothstep(0.,.5,d));}
float aoP(vec3 p){return aoF(p.x-eRm.x)*aoF(eRm.y-p.x)*aoF(p.y-eRm.z)*aoF(eRm.w-p.y)*aoF(eRm2.x-p.z)*aoF(p.z);}
vec3 lit(vec3 p,vec3 n,vec3 alb,float gl,vec3 rd,float sh){
 float ao=aoP(p);
 vec3 c=alb*eSt.y*ao*(.75+.25*n.y);
 vec3 L=eL1.xyz-p;float d2=max(dot(L,L),.012+.02*eL1c.w);vec3 l=L*inversesqrt(d2);
 float fr=.04+.96*pow(1.-clamp(dot(n,-rd),0.,1.),5.);
 c+=(alb*max(dot(n,l),0.)+gl*fr*pow(max(dot(n,normalize(l-rd)),0.),400.)*5.)*eL1c.rgb/(d2*(1.+eL1c.w*d2));
 L=eL2.xyz-p;d2=max(dot(L,L),.05);l=L*inversesqrt(d2);
 c+=(alb*max(dot(n,l),0.)+gl*fr*pow(max(dot(n,normalize(l-rd)),0.),90.)*7.)*eL2c.rgb/d2*sh*mix(.6,1.,ao);
 c+=gl*fr*eSt.y*1.4*ao;
 return c;
}
vec3 tileAt(vec2 w,out vec2 b,out float gl,out float cav){
 float ty=eRm2.y,s=eTb.w,e;vec2 f,id,dir;
 if(ty>2.5&&ty<3.5){
  vec2 p=w/s;const vec2 k=vec2(1.,1.7320508);
  vec4 hc=floor(vec4(p,p-vec2(.5,1.))/k.xyxy)+.5;
  vec2 a=p-hc.xy*k,bb=p-(hc.zw+.5)*k;
  bool A=dot(a,a)<dot(bb,bb);f=A?a:bb;id=A?hc.xy:hc.zw+.5;
  vec2 af=abs(f);float dg=dot(af,vec2(.5,.8660254));
  e=(.5-max(af.x,dg))*s;
  dir=af.x>dg?vec2(sign(f.x),0.):normalize(sign(f)*vec2(.5,.8660254));
 }else{
  vec2 sz=(ty<.5||ty>4.5)?vec2(s,s*.5):vec2(s);
  vec2 q=w/sz;if(ty<.5||ty>4.5)q.x+=.5*mod(floor(q.y),2.);
  id=floor(q);f=fract(q)-.5;
  vec2 em=(.5-abs(f))*sz;e=min(em.x,em.y);
  dir=em.x<em.y?vec2(sign(f.x),0.):vec2(0.,sign(f.y));
 }
 vec4 h=hsh(id*vec2(7.,13.)+vec2(31.,5.));
 float gw=ty>4.5?.0007:.0017;
 cav=mix(.5,1.,smoothstep(gw*.4,gw*1.6,e));
 float gm=1.-smoothstep(gw*.7,gw*1.25,e);
 float bev=1.-smoothstep(gw,gw+.004,e);
 b=dir*bev*.6;
 vec3 alb=eTa.rgb*(1.+eSt.w*(h.x-.5)*2.)*(1.+eSt.w*.6*(h.y-.5)*vec3(1.,-.3,-.6));
 if(ty>.5&&ty<1.5){b+=(vec2(fbm(w*40.+h.zw*90.),fbm(w*40.+h.wz*90.+5.))-.5)*.25;alb*=.9+.2*fbm(w*30.+h.xy*40.);}
 if(ty>1.5&&ty<2.5){alb*=.8+.35*fbm(w*120.+h.zw*60.);}
 if(ty>4.5){float vn=fbm(w*9.+id*3.1)+.45*fbm(w*31.+id);float vein=1.-smoothstep(.0,.05,abs(fract(vn*2.6)-.5));alb=mix(alb,vec3(.30,.31,.33),vein*.55);}
 alb*=.94+.12*fbm(w*500.);
 alb=mix(alb,eTb.rgb*(.8+.35*fbm(w*300.)),gm);
 gl=eTa.w*(1.-gm*.9);
 return alb;
}
vec3 wallAt(vec3 p,vec3 n,vec3 T,vec2 w,vec3 rd,float sh){
 vec2 b;float gl,cav;vec3 alb=tileAt(w,b,gl,cav);
 vec3 nn=normalize(n+T*b.x+cross(n,T)*b.y);
 return lit(p,nn,alb,gl,rd,sh)*cav;
}
`,Ta=`in vec2 v;out vec4 o;
void main(){
 vec3 rd=normalize(eF.xyz+(2.*v.x-1.)*eC.w*eR.xyz+(2.*v.y-1.)*eC.w*eU.xyz);
 vec3 ro=eC.xyz;ro+=rd*(-ro.z/(abs(rd.z)>1e-5?rd.z:1e-5));
 bool wm=eMode==1;
 float XL=eRm.x,XR=eRm.y,YF=eRm.z,YC=eRm.w,ZF=eRm2.x;
 float tx=rd.x<0.?(XL-ro.x)/rd.x:(XR-ro.x)/max(rd.x,1e-5);
 float ty=rd.y<0.?(YF-ro.y)/rd.y:(YC-ro.y)/max(rd.y,1e-5);
 float tz=(ZF-ro.z)/max(rd.z,1e-5);
 float t=min(tx,min(ty,tz));vec3 p=ro+rd*t;
 float ra=eTw.x,rb=eTw.y,ry=eTw.z,rz=ZF-.07;float hemY=ry-eTwc.w;
 // pick the surface first, shade it once
 vec3 n=vec3(0.,0.,-1.),T=vec3(-1.,0.,0.),alb=vec3(.78,.77,.74),emis=vec3(0.);vec2 w=p.xy;
 float sh=1.,gls=0.,tsc=1.,mul=1.;bool tile=true,lit1=true;
 vec2 mm=ro.xy*1000.;
 if(wm){
  // the tiled wall round the mirror, in focus: the mirror plate shades it a little
  t=0.;p=vec3(ro.xy,0.);n=vec3(0.,0.,1.);T=vec3(1.,0.,0.);w=ro.xy+vec2(.031,.017);
  vec2 sm=mm+vec2(1.5,3.5);
  float dOut=max(max(eMw.x-sm.x,sm.x-eMw.z),max(eMw.y-sm.y,sm.y-eMw.w));
  sh=mix(.3,1.,smoothstep(0.,9.,dOut));mul=mix(.55,1.,smoothstep(0.,6.,dOut));
 }else if(t==tz){
  if(eTwc.w>0.&&p.x>ra&&p.x<rb)sh=mix(.5,1.,smoothstep(0.,.35,hemY-p.y))*mix(1.,.75,step(p.y,ry));
  vec2 bp=p.xy-eL1.xy;
  if(eTw.w>.5){
   // a tall frosted window with glazing bars: the morning's only light
   vec2 wq=bp-vec2(0.,.08);vec2 aw=abs(wq);
   if(aw.x<.33&&aw.y<.5){tile=false;lit1=false;
    float fr=max(step(.29,aw.x),step(.46,aw.y));float bar=max(step(aw.x,.012),step(abs(wq.y-.14),.012));
    vec3 day=eL1c.rgb*vec3(.92,.98,1.1)*17.*(.82+.3*fbm(wq*vec2(60.,25.)))*(.85+.3*smoothstep(-.5,.5,wq.y));
    emis=mix(day,vec3(.05,.052,.055)+eL2c.rgb*.02,max(fr,bar));}
  }
  else if(length(bp)<eL1.w*.6&&eL1.w>.04){tile=false;n=normalize(vec3(bp*3.,-1.));alb=vec3(.035,.03,.026);gls=.2;mul=.35;}
  if(eMr.x<eMr.y){
   float ex=max(eMr.x-p.x,p.x-eMr.y),ey=p.y-(YF+2.03);float e=max(ex,ey);
   if(e<.055){tile=false;alb=vec3(.74,.72,.68);gls=.5;mul=mix(.75,1.,smoothstep(.0,.01,abs(e)));
    if(e>0.)n=normalize(vec3(ex>ey?sign(p.x-(eMr.x+eMr.y)*.5)*.25:0.,ey>ex?.25:0.,-1.));}
   if(e<0.){
    float tj=(rd.x<0.?eMr.x-ro.x:eMr.y-ro.x)/rd.x;vec3 qj=ro+rd*tj;
    if(qj.z<ZF+.13&&qj.z>ZF){p=qj;n=vec3(-sign(rd.x),0.,0.);alb=vec3(.7,.68,.64);gls=.4;mul=.55;}
    else{lit1=false;float tt=(ZF+1.4-ro.z)/rd.z;vec3 q=ro+rd*tt;
     emis=vec3(.012,.011,.01)+eL1c.rgb*.03*smoothstep(1.5,0.,length(q.xy-vec2(eMr.x,YF+1.)))+eL2c.rgb*.02*smoothstep(-1.,1.,q.y);}
   }
  }
 }else if(t==tx){n=vec3(-sign(rd.x),0.,0.);T=vec3(0.,0.,sign(rd.x)*-1.);w=p.zy;}
 else if(rd.y<0.){n=vec3(0.,1.,0.);T=vec3(1.,0.,0.);w=p.xz*.5;tsc=.55;}
 else{tile=false;n=vec3(0.,-1.,0.);}
 // towel rail (chrome), along the far wall
 if(rb>ra&&!wm){
  vec2 oc=ro.yz-vec2(ry,rz);float a=dot(rd.yz,rd.yz),b=dot(oc,rd.yz),cc=dot(oc,oc)-.011*.011;float di=b*b-a*cc;
  if(di>0.){float tt=(-b-sqrt(di))/a;vec3 q=ro+rd*tt;
   if(tt>0.&&tt<t&&q.x>ra-.06&&q.x<rb+.06){t=tt;p=q;vec3 nn=vec3(0.,(q.yz-vec2(ry,rz))/.011);vec3 rr=reflect(rd,nn);
    lit1=false;emis=(vec3(.05)+eL1c.rgb*.5*max(rr.y+.3,0.)+eTa.rgb*eSt.y*2.+eL1c.rgb*pow(max(dot(rr,normalize(eL1.xyz-q)),0.),60.)*30.+eL2c.rgb*pow(max(dot(rr,normalize(eL2.xyz-q)),0.),30.)*4.)*.8;}}
 }
 // a towel hanging over it
 if(eTwc.w>0.&&!wm){
  float tt=(rz-.026-ro.z)/rd.z;vec3 q=ro+rd*tt;
  float hm=hemY+.012*sin(q.x*31.)+.007*sin(q.x*71.+1.);
  if(tt>0.&&tt<t&&q.x>ra+.03&&q.x<rb-.03&&q.y>hm&&q.y<ry+.016){
   t=tt;p=q;tile=false;lit1=true;sh=1.;mul=1.;gls=.05;
   float u=q.x*30.+2.5*fbm(q.xy*vec2(9.,3.))+3.*q.y;
   float top=smoothstep(ry-.025,ry+.016,q.y);
   n=normalize(vec3(-.55*cos(u)*(1.-top),top*1.6,-1.));
   alb=eTwc.rgb*(.82+.3*fbm(q.xy*900.))*(.6+.4*(.5+.5*sin(u)));
   alb*=mix(.7,1.,smoothstep(0.,.03,q.y-hm));
   float fh=ry-eTwc.w*.52+.008*sin(q.x*23.+1.7);
   alb*=q.y<fh?.78*mix(.55,1.,smoothstep(0.,.035,fh-q.y)):mix(.8,1.,smoothstep(0.,.012,q.y-fh));
   if(q.y>fh&&q.y<fh+.012)n=normalize(n+vec3(0.,-.8,0.));
   alb*=smoothstep(0.,.03,min(q.x-ra-.03,rb-.03-q.x))*.35+.65;
  }
 }
 // the lamp: an opal globe or a bare bulb
 if(!wm&&eTw.w<.5){vec3 oc=ro-eL1.xyz;float b=dot(oc,rd),cc=dot(oc,oc)-eL1.w*eL1.w;float di=b*b-cc;
  if(di>0.){float tt=-b-sqrt(di);if(tt>0.&&tt<t){t=tt;vec3 q=ro+rd*tt;float mu=clamp(dot(normalize(q-eL1.xyz),-rd),0.,1.);lit1=false;
   emis=eL1c.rgb/(3.14159*eL1.w*eL1.w)*(eSt.z>1.5?.55+.6*smoothstep(.2,.9,mu):.035+.05*mu+.3*pow(mu,8.))*mix(vec3(1.),vec3(1.,.82,.62),(1.-mu)*(1.-mu));}}}
 float cav=1.;
 if(tile&&lit1){vec2 b;float g;alb=tileAt(w,b,g,cav)*tsc;gls=g*(tsc<1.?.6:1.);n=normalize(n+T*b.x+cross(n,T)*b.y);}
 vec3 col=lit1?lit(p,n,alb,gls,rd,sh)*cav*mul:emis;
 if(wm){
  // condensation on the glaze too: a veil and small beads catching the lamps
  vec2 qc=mm/1.3;vec2 ip=floor(qc),fp=fract(qc);float best=0.;vec2 bv=vec2(0.);
  for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){vec2 oo=vec2(float(i),float(j));vec4 hh=hsh(ip+oo+77.);
   float r=(.1+.33*hh.w*hh.w)*step(.25,hh.z);vec2 dv=fp-oo-(.2+.6*hh.xy);float b2=(1.-length(dv)/max(r,1e-3))*r;if(b2>best){best=b2;bv=dv/max(r,1e-3);}}
  float m=smoothstep(.55,.8,textureLod(uN,mm/(.6*256.),0.).a);
  col=col*(1.-.1*m)+.012*m;
  vec3 nb=normalize(vec3(bv*.85,sqrt(max(1.-dot(bv,bv)*.72,.05))));
  float gb=pow(max(dot(nb,normalize(normalize(eL2.xyz-p)-rd)),0.),160.)*1.5+pow(max(dot(nb,normalize(normalize(eL1.xyz-p)-rd)),0.),160.)*.6;
  col=mix(col,col*.75+(eL2c.rgb+eL1c.rgb*.3)*gb*.4,clamp(best*30.,0.,1.));
  o=enc(col);return;
 }
 // a steamed glass shower screen, square to the far wall
 if(mod(eSt.z,2.)>.5&&rd.x<0.){
  float tt=(eRm2.z-ro.x)/rd.x;vec3 q=ro+rd*tt;
  if(tt>0.&&tt<t&&q.z>ZF-eRm2.w&&q.y<YF+1.95){
   float edge=smoothstep(.014,.0,q.z-(ZF-eRm2.w));
   vec3 L=eL1.xyz-q,L2=eL2.xyz-q;
   vec3 glow=eL1c.rgb/max(dot(L,L),.05)*.16+eL2c.rgb/max(dot(L2,L2),.1)*.18+vec3(eSt.y)*.5;
   float drip=pow(nz(vec2(q.z*420.,q.y*2.5)),7.)*smoothstep(YF+1.95,YF+1.1,q.y);
   float fogS=.5+.35*fbm(q.zy*vec2(14.,6.));
   col=col*(1.-fogS)*.9+glow*fogS+glow*drip*2.5;
   col=mix(col,vec3(.08)+eL2c.rgb*.4+eL1c.rgb*.3,edge*.9);
  }
 }
 // steam in the air: extinction plus the lamps' glow
 float sg=eSt.x;float Tr=exp(-sg*t);
 vec3 ins=(1.-Tr)*(vec3(eSt.y)*.8+eL2c.rgb*.04);
 vec3 lc=eL1.xyz-ro;float tc=dot(lc,rd);float hh=max(length(lc-rd*tc),.03);
 ins+=eL1c.rgb*sg*(atan((t-tc)/hh)-atan(-tc/hh))/hh*.08;
 lc=eL2.xyz-ro;tc=dot(lc,rd);hh=max(length(lc-rd*tc),.1);
 ins+=eL2c.rgb*sg*(atan((t-tc)/hh)-atan(-tc/hh))/hh*.2;
 o=enc(col*Tr+ins);
}`,Sa=`uniform sampler2D uT;uniform vec4 uB;uniform int uM;
vec3 dec(vec3 e){return e/max(1.-e,vec3(.004));}
in vec2 v;out vec4 o;
void main(){
 vec3 s=vec3(0.);float w=0.;
 if(uM==0){for(int i=-7;i<=7;i++){float fi=float(i);float k=exp(-fi*fi/22.);s+=dec(textureLod(uT,v+uB.xy*fi,0.).rgb)*k;w+=k;}}
 else if(uM==1){for(int i=0;i<48;i++){float fi=float(i)+.5;float r=sqrt(fi/48.);float a=fi*2.3999632;float k=1.-.45*r*r;
  s+=min(dec(textureLod(uT,v+vec2(cos(a),sin(a))*r*uB.z,0.).rgb),vec3(60.))*k;w+=k;}}
 else{for(int j=0;j<4;j++)for(int i=0;i<4;i++){s+=dec(textureLod(uT,v+uB.xy*(vec2(float(i),float(j))-1.5),0.).rgb);w+=1.;}}
 s/=w;o=vec4(s/(1.+s),1.);
}`,za=`uniform sampler2D uP,uGr;
layout(std140) uniform S{vec4 sG0,sG1,sG2,sG3,sG4;vec4 sC[96];};
in vec2 v;out vec4 o;
void main(){
 vec2 mm=sG0.xy+v*sG0.z;float px=1./512.;
 vec4 s=texture(uP,v);
 float hN=.25*(texture(uP,v+vec2(px,0.)).r+texture(uP,v-vec2(px,0.)).r+texture(uP,v+vec2(0.,px)).r+texture(uP,v-vec2(0.,px)).r);
 float gr=texture(uGr,v).r;
 float dt=sG0.w;
 if(sG1.w>.5){s=vec4(sG4.w*(.9+.14*(fbm(mm*.05)-.5))*(.93+.07*v.y),0.,0.,0.);hN=s.r;}
 float S=sG1.x*(.7+.45*clamp(v.y,0.,1.))*(.6+.8*fbm(mm*.012+vec2(sG1.y*.9,-sG1.y*1.7)));
 float blk=1.-smoothstep(.03,.28,s.g);
 float nuc=(1.-.4*gr)*(.75+.5*nz(mm*.9));
 float sup=S-.3;
 if(sup>0.){s.r+=dt*sG4.x*sup*1.45*nuc*blk*(1.-.779*s.r/max(sG4.w,.5));s.r+=dt*sG4.y*max(hN-s.r,0.)*blk;}
 else{s.r=max(s.r+dt*.5*sup*(.4+.9*v.y)*(.6+.8*nz(mm*.04+5.))*(1.3-s.r),0.);s.g=max(s.g+dt*sup,0.);s.b=max(s.b+dt*.3*sup,0.);}
 s.g=max(s.g-dt*abs(sG4.z)*(.55+.9*fbm(mm*.08+vec2(0.,sG1.y*.3))),0.);
 s.b=max(s.b-dt*.003,0.);
 // a warm fingertip held on the glass
 if(sG2.w>0.){float d=length(mm-sG2.xy);float k=1.-smoothstep(sG2.z*.1,sG2.z,d+4.*(nz(mm*.5)-.5)+3.*(nz(mm*1.7+9.)-.5));
  s.r=max(s.r-dt*1.6*k*sG2.w,0.);s.g=max(s.g-dt*.25*k,0.);s.b=max(s.b-dt*.5*k*sG2.w,0.);}
 // a heated demister pad behind the glass
 if(sG3.z>sG3.x){vec2 c=(sG3.xy+sG3.zw)*.5,hs=(sG3.zw-sG3.xy)*.5;vec2 q=max(abs(mm-c)-hs+12.,0.);float d=length(q)-12.;
  float k=1.-smoothstep(-6.,14.,d+3.*(fbm(mm*.06)-.5)*6.);
  s.r=max(s.r-dt*.9*k,0.);s.g=max(s.g-dt*.4*k,0.);s.b=max(s.b-dt*.5*k,0.);}
 int n=int(sG1.z);
 float iF=0.,bF=0.,fF=0.,iR=0.,fR=0.,i2=0.,b2=0.,h2=1.,f2=0.,aF=-1.,a2=-1.;
 float hwn=1.+.2*sin(mm.x*.093+mm.y*.061)+.11*sin(mm.x*.037-mm.y*.052+2.)+.07*sin(mm.x*.21+mm.y*.17+4.)+.08*(nz(mm*.3)-.5);
 for(int i=0;i<48;i++){
  if(i>=n)break;
  vec4 A=sC[2*i],B=sC[2*i+1];
  vec2 a=A.xy,ab=A.zw-A.xy;float l2=max(dot(ab,ab),1e-6);
  float tt=clamp(dot(mm-a,ab)/l2,0.,1.);float d=length(mm-a-ab*tt);
  float hw=B.x*hwn;
  // most caps are far from most texels: skip the rest of the work (the init stamps up to ~150 of them)
  if(d>hw*1.3)continue;
  float ins=1.-smoothstep(hw*.8,hw,d);
  float band=smoothstep(hw*.9,hw*1.03,d)*(1.-smoothstep(hw*1.03,hw*1.28,d));
  float ang=fract(atan(ab.y,ab.x)/3.14159265+1.);
  float core=smoothstep(hw,hw*.25,d);
  float stv=.7+.6*nz(vec2(dot(mm,vec2(-ab.y,ab.x))/sqrt(l2)*1.4,0.));
  if(B.y<.5){
   if(ins>iF){iF=ins;if(ins>.5&&l2>.01)aF=ang;}
   bF=max(bF,band);fF=max(fF,ins*B.z*(.12+.88*core)*stv);
  }else if(B.y<1.5){iR=max(iR,ins);fR=max(fR,ins*B.z);
  }else{
   if(ins>i2){i2=ins;h2=B.z;if(ins>.5)a2=ang;}
   b2=max(b2,band*B.w);f2=max(f2,ins*(B.z<.05?1.:0.)*(.6+.4*core)*stv);
  }
 }
 s.b=min(s.b+bF*(1.-iF)*s.r*.45,1.);s.b=max(s.b,b2*(1.-i2));
 s.r=mix(s.r,min(s.r,h2),i2);s.r*=1.-max(iF,iR);
 s.b*=1.-max(max(iF,iR),i2);
 s.g=max(s.g,max(fF,max(fR,f2)));
 if(a2>=0.)s.a=a2;if(aF>=0.)s.a=aF;if(iR>.5)s.a=.5;
 s.r=clamp(s.r,0.,1.);
 if(sG4.z<0.){vec4 q=floor(s*255.+nz(gl_FragCoord.xy*1.7+sG1.y*97.));s=q/255.;}
 o=s;
}`,Ba=Ct+`layout(location=0) in vec4 aA;layout(location=1) in vec4 aB;
uniform vec4 uM;
out vec2 q;flat out vec4 vA;flat out vec4 vB;
void main(){
 vec2 c=vec2(float(gl_VertexID&1),float(gl_VertexID>>1))*2.-1.;
 float ex=aA.z>.6?1.5:1.05;
 vec2 ax=aB.xy,ay=vec2(-ax.y,ax.x);
 float lx=c.x<0.?-ex*(aA.w+aB.z):ex*aA.w;
 q=vec2(lx,c.y*ex);
 vec2 p=aA.xy+(ax*q.x+ay*q.y)*aA.z;
 vA=aA;vB=aB;
 gl_Position=vec4((p-uM.xy)/uM.z*2.-1.,0.,1.);
}`,ka=`in vec2 q;flat in vec4 vA;flat in vec4 vB;out vec4 o;
void main(){
 float sx=q.x<0.?vA.w+vB.z:vA.w;
 vec2 l=vec2(q.x/sx,q.y);float s=length(l);
 if(s>1.7)discard;
 if(s<1.){
  float st=.9;
  vec2 nl=vec2(l.x/sx,l.y)*st;
  vec2 n=vB.xy*nl.x+vec2(-vB.y,vB.x)*nl.y;
  float h=vA.z*(sqrt(1./(st*st)-s*s)-sqrt(1./(st*st)-1.))*vB.w;
  o=vec4(n*.5+.5,clamp(h/3.,0.,1.),1.);
  gl_FragDepth=.5-.45*clamp(h/3.,0.,1.);
 }else{
  float hal=1.-smoothstep(1.12,1.7,s);
  o=vec4(.5,.5,0.,hal);
  gl_FragDepth=.97-.04*hal;
 }
}`,_a=`uniform sampler2D uSim,uDrop,uEnv,uDof,uScat,uScW,uWall,uGr;
layout(std140) uniform F{vec4 cP,cR,cU,cF,m0,m1,l1,l1c,l2,l2c,g0,g1,g2;};
in vec2 v;out vec4 o;
vec2 pj(vec3 d){
 vec3 R2=vec3(cR.xy,-cR.z),U2=vec3(cU.xy,-cU.z),F2=vec3(cF.xy,-cF.z);
 float z=max(dot(d,F2),.1);
 return vec2(dot(d,R2),dot(d,U2))/(z*cP.w*cR.w*2.);
}
vec3 envS(vec2 e){vec2 m=min(e,1.-e);float k=smoothstep(0.,.07,min(m.x,m.y));return mix(dec(textureLod(uScW,clamp(e,vec2(0.),vec2(1.)),0.).rgb)*.8,dec(textureLod(uDof,clamp(e,vec2(.002),vec2(.998)),0.).rgb),k);}
vec3 dr0(vec3 d){return vec3(d.xy,-d.z);}
vec3 drop(vec3 n,vec3 d,vec3 P0,float lod,vec2 e0,vec2 pjr,vec3 H1,vec3 H2,float i1,float i2,vec3 sv,vec3 sc,float ge,vec3 cl){
 float cs=clamp(dot(n,-d),0.,1.);float Fr=.02+.98*pow(1.-cs,5.);
 vec3 r1=reflect(d,n);
 vec3 c=Fr*envS(e0+pj(r1)-pjr);
 // through the lens and back off the silver: the room round it, small, sharp and upside down
 float nl=length(n.xy);
 vec3 t3=normalize(dr0(d)-vec3(n.xy*.36,0.));
 vec2 ei=e0+pj(t3)-pjr;vec2 em=min(ei,1.-ei);
 vec3 im=mix(dec(textureLod(uScW,clamp(ei,vec2(0.),vec2(1.)),0.).rgb)*.8,dec(textureLod(uEnv,clamp(ei,vec2(.002),vec2(.998)),lod).rgb),smoothstep(-.03,.05,min(em.x,em.y)));
 vec2 lxy=normalize((l1.xyz-P0).xy+1e-4);float sd=dot(n.xy,lxy)/max(nl,1e-3);
 // the steep edge away from the light is a dark hairline; the flank toward it carries the fog's glow
 float rim=smoothstep(.72,.9,nl)*clamp(.7-.5*sd,.2,1.);
 im+=sc*.6*smoothstep(.35,.9,nl)*max(sd,0.);
 // the lamp lands in it as one hard bright point
 if(l1.w>0.){vec3 Lp=l1.xyz-P0;float lL=length(Lp);float la=max(l1.w/lL,.075);
  float spk=smoothstep(cos(la),cos(la*.35),dot(t3,Lp/lL));
  im+=spk*l1c.rgb/(3.14159*l1.w*l1.w)*.3;}
 im+=l1c.rgb*i1*2.*smoothstep(.35,.8,nl)*(1.-rim)*pow(max(-sd,0.),3.);
 c+=(1.-Fr)*(1.-Fr)*.95*sv*im*(1.-.8*rim);
 c+=(l1c.rgb*i1*pow(max(dot(n,H1),0.),ge)+l2c.rgb*i2*pow(max(dot(n,H2),0.),ge*.7))*ge*.025;
 // never darker than the clear glass round it
 return max(c,cl*(.8-.6*rim));
}
void main(){
 vec3 d=normalize(cF.xyz+(2.*v.x-1.)*cP.w*cR.xyz+(2.*v.y-1.)*cP.w*cU.xyz);
 float tm=-cP.z/d.z;vec3 P=cP.xyz+d*tm;vec2 mm=P.xy*1000.;
 vec2 su=(mm-m0.xy)/m0.z;
 vec2 e0=.5+(v-.5)/cR.w;
 vec3 dr=vec3(d.xy,-d.z);vec2 pjr=pj(dr);
 float pxm=max(length(dFdx(mm)),length(dFdy(mm)));
 float coc=m0.w*abs(1./tm-1./g0.x);
 float det=clamp(1.5-coc*.35,0.,1.);
 vec4 S=texture(uSim,su);float gr=texture(uGr,su).r;
 vec4 D=texture(uDrop,su);
 float h=S.r,f=S.g,w=S.b,hE=h+w*.75;
 vec3 L1=l1.xyz-P,L2=l2.xyz-P;float i1=1./max(dot(L1,L1),.05),i2=1./max(dot(L2,L2),.05);L1=normalize(L1);L2=normalize(L2);
 vec3 H1=normalize(L1-d),H2=normalize(L2-d);
 // silver, with desilvered spots on an old mirror
 float ed=min(min(mm.x-m1.x,m1.z-mm.x),min(mm.y-m1.y,m1.w-mm.y));
 vec3 sv=g1.rgb;
 float spot=0.;
 if(g0.y>0.){spot=texture(uGr,su).g;
  sv*=mix(vec3(1.),vec3(.16,.13,.10),spot);sv*=mix(vec3(1.),vec3(.9,.82,.7),smoothstep(50.,0.,ed)*.5);}
 // the film a wipe leaves: streaks along the stroke
 float an=S.a*3.14159265;vec2 sd=vec2(cos(an),sin(an)),sp=vec2(-sd.y,sd.x);
 float stk=nz(vec2(dot(mm,sp)*1.25,dot(mm,sd)*.05))*.65+.35*nz(vec2(dot(mm,sp)*4.1,dot(mm,sd)*.11));
 vec2 off=(sp*(nz(vec2(dot(mm,sp)*.3,dot(mm,sd)*.03))-.5)+sd*(nz(vec2(dot(mm,sd)*.08,dot(mm,sp)*.05)+9.)-.5)*.6)*min(f,.6)*.012/cR.w;
 vec3 clr=dec(texture(uDof,e0+off).rgb)*sv;
 // light scattered by droplets too small to see
 vec3 sc=(dec(texture(uScat,e0).rgb)*.6+dec(texture(uScW,e0).rgb)*.5)*mix(sv,vec3(.8),.4)*(1.-.6*spot);
 sc+=l2c.rgb*i2*(.2+.42*pow(max(dot(dr,L2),0.),3.))+l1c.rgb*i1*.35;
 // the fog takes its light from the lamp: a wide soft halo, and a faint coloured ring a few lamp-widths out
 float cd=max(dot(dr,normalize(l1.xyz-P)),0.);float th1=sqrt(max(2.-2.*cd,0.));
 vec3 rg=exp(-pow((vec3(th1)-vec3(.088,.080,.072))/.011,vec3(2.)));
 sc*=.42;sc+=l1c.rgb*i1*(.9*pow(cd,10.)+8.*pow(cd,50.)+20.*pow(cd,260.)+.5*rg);
 sc+=g2.rgb;sc*=.9*mix(vec3(1.),vec3(.88,.95,1.08),max(g2.w,0.));
 float co=clamp(fbm(mm*.006+3.7)*1.6-.55+.35*(1.-su.y),0.,1.);
 float haze=.5*smoothstep(.02,.5,hE)*(1.-.78*gr)*(1.-.4*co);
 float cov=.55*smoothstep(.1,.7,hE)*(1.-.65*gr);
 float mn=textureLod(uN,mm/(.42*256.),0.).a;
 float micS=smoothstep(1.-cov-.3,1.-cov+.3,mn);
 float mic=mix(cov,micS,.3*det*smoothstep(.55,.2,pxm));
 // breath-figure drops: one per cell of a jittered lattice, each born at its own water level
 vec2 qc=mm/1.45;vec2 ip=floor(qc),fp=fract(qc);
 float best=-1.,br=0.,hal2=0.;vec2 bv=vec2(0.);
 for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
  vec2 oo=vec2(float(i),float(j));vec4 hh=hsh(ip+oo);
  float st=.22+.5*hh.z+.45*gr;
  float g=clamp((hE-st)*3.,0.,1.);
  float r=(.12+.32*hh.w*hh.w)*(1.+.9*gr)*(1.+.35*w)*(1.+.3*co)*mix(.45,1.,g)*step(.001,g);
  vec2 dv=fp-oo-(.18+.64*hh.xy);
  float sN=length(dv)/max(r,1e-3);
  float b2=(1.-sN)*r;
  if(b2>best){best=b2;bv=dv/max(r,1e-3);br=r;}
  hal2=max(hal2,(1.-smoothstep(1.05,1.5,sN))*step(.001,r));
 }
 float res=smoothstep(.35,1.1,br*1.45/pxm)*det;
 float mA=clamp(best*1.45/pxm*1.2,0.,1.)*res;
 float hal=D.a*(1.-smoothstep(0.,.02,D.b));
 float phi=1.-(1.-haze)*(1.-mic*.75);
 float rv=det*smoothstep(.35,1.1,.42/pxm);
 phi=1.-(1.-phi)*(1.-(1.-rv)*.32*smoothstep(.3,.9,hE)*(1.-.6*gr));
 phi*=1.-.3*max(g2.w,0.);phi=1.-(1.-phi)*(1.-.4*max(-g2.w,0.)*phi);
 phi*=1.-.75*max(hal,hal2*res*.6);
 #ifdef ROOMONLY
 phi=0.;
 #endif
 vec3 col=mix(clr,sc,phi);
 // glitter of the micro drops that happen to face a lamp
 float gl=smoothstep(.9,.985,textureLod(uN,mm/(.3*256.)+.5,0.).b)*micS*det;
 col+=gl*(l2c.rgb*i2*pow(max(dot(dr,L2),0.),2.)+l1c.rgb*i1*.3)*.5;
 col+=min(f,.6)*(stk-.42)*.05*sc;
 float dA=smoothstep(.002,.02,D.b);
 float aD=max(dA,mA);
 #ifdef ROOMONLY
 aD=0.;
 #endif
 if(aD>0.){vec2 nx=dA>=mA?D.xy*2.-1.:bv*.88;vec3 n=vec3(nx,sqrt(max(1.-dot(nx,nx),0.)));col=mix(col,drop(n,d,P,log2(max(40.*pxm,1.)),e0,pjr,H1,H2,i1,i2,sv,sc,dA>=mA?700.:220.,clr),aD);}
 // the mirror's ground edge and the tiled wall round it
 if(g0.z>0.){
  // the polished edge seen through the glass: bottle green, deepest at the back, its arris catching the lamps
  float eb=smoothstep(2.6,1.9,ed);
  vec3 ec=vec3(.26,.44,.37)*(sc*.75+.04)*(.55+.45*smoothstep(0.,2.2,ed))+l2c.rgb*i2*.12*smoothstep(1.7,.6,ed);
  ec+=(l1c.rgb*i1*.9+l2c.rgb*i2*.25)*exp(-pow((ed-2.15)/.22,2.));
  col=mix(col,ec,eb*.9);
  float ins=smoothstep(-pxm*.7,pxm*.7,ed);
  col=mix(dec(texture(uWall,v).rgb),col,ins);
 }
 // a breath of steam drifting in front of the glass
 float vl=nz(v*vec2(90.,60.)+vec2(cU.w*2.1,-cU.w*5.))*nz(v*vec2(40.,30.)-vec2(0.,cU.w*2.));
 col+=g0.w*smoothstep(.15,.5,vl)*(l2c.rgb*.06+g2.rgb*2.);
 col*=1.-.32*dot(v-.5,v-.5)*2.;
 col=1.-exp(-col*cF.w);
 col=pow(col,vec3(.4545))*g1.w+(1.-g1.w)*col;
 col+=(hsh(gl_FragCoord.xy).r-.5)*(2./255.);
 o=vec4(col,1.);
}`;let Ve={n:0};const Na=s=>{if(Ve.n<s){const r=new Float32Array(s),wt=new Float32Array(s),U=new Float32Array(s);for(let yt=0;yt<s;yt++){const St=(yt*40503>>>0)%628/100;r[yt]=Math.cos(St),wt[yt]=Math.sin(St),U[yt]=1+.18*((yt*2654435761>>>0)%100)/100}Ve={n:s,c:r,s:wt,e:U}}return Ve};function Da(s){const r=[],wt=(b,x)=>{const L=s.createProgram(),R=s.createShader(s.VERTEX_SHADER),$=s.createShader(s.FRAGMENT_SHADER);return s.shaderSource(R,b),s.compileShader(R),s.shaderSource($,x),s.compileShader($),s.attachShader(L,R),s.attachShader(L,$),s.linkProgram(L),L.a=R,L.b=$,r.push(L),L},U=wt(Me,Ct+Ea+Oe+La+Ta),yt=U,St=wt(Me,Ct+Sa),Yt=wt(Me,Ct+Oe+za),ge=wt(Ba,Ct+ka),Ht=wt(Me,Ct+""+Oe+_a);for(const b of r)s.getProgramParameter(b,s.LINK_STATUS)||console.error("276 link",s.getProgramInfoLog(b),s.getShaderInfoLog(b.a),s.getShaderInfoLog(b.b)),s.deleteShader(b.a),s.deleteShader(b.b);const zt=(b,x)=>s.getUniformLocation(b,x),V=(b,x)=>{s.useProgram(b);for(const L in x)s.uniform1i(zt(b,L),x[L])};V(U,{uN:0}),V(St,{uT:0}),V(Yt,{uN:0,uP:1,uGr:2}),V(Ht,{uN:0,uSim:1,uDrop:2,uEnv:3,uDof:4,uScat:5,uScW:6,uWall:7,uGr:8}),s.uniformBlockBinding(Yt,s.getUniformBlockIndex(Yt,"S"),0),s.uniformBlockBinding(Ht,s.getUniformBlockIndex(Ht,"F"),1);const We=["eC","eR","eU","eF","eRm","eRm2","eL1","eL1c","eL2","eL2c","eTa","eTb","eTw","eTwc","eSt","eMr","eMw"],No={env:We.map(b=>zt(U,b)),wall:We.map(b=>zt(U,b)),eMode:zt(U,"eMode"),bB:zt(St,"uB"),bM:zt(St,"uM"),dM:zt(ge,"uM")},C=(b,x,L,R,$,Bt,Ke,dt)=>{const Ze=s.createTexture();return s.bindTexture(s.TEXTURE_2D,Ze),s.texImage2D(s.TEXTURE_2D,0,L,b,x,0,R,$,dt||null),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,Bt),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,Bt===s.NEAREST?s.NEAREST:s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,Ke),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,Ke),Ze},et=b=>{const x=s.createFramebuffer();return s.bindFramebuffer(s.FRAMEBUFFER,x),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,b,0),x};s.pixelStorei(s.UNPACK_ALIGNMENT,1),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1);const Kt=new Uint8Array(256*256*4);{let b=1511925601;for(let x=0;x<Kt.length;x++)b^=b<<13,b^=b>>>17,b^=b<<5,Kt[x]=b&255}const Re=C(256,256,s.RGBA8,s.RGBA,s.UNSIGNED_BYTE,s.LINEAR_MIPMAP_LINEAR,s.REPEAT,Kt);s.generateMipmap(s.TEXTURE_2D);const Z=s.RGBA,rt=s.UNSIGNED_BYTE,ot=s.LINEAR,X=s.CLAMP_TO_EDGE,ne=C(128,128,s.RGBA8,Z,rt,ot,X),Xe=et(ne),Fe=C(128,128,s.RGBA8,Z,rt,ot,X),Ye=et(Fe),Ae=C(32,32,s.RGBA8,Z,rt,ot,X),Do=et(Ae),He=C(32,32,s.RGBA8,Z,rt,ot,X),O=et(He),ie=b=>{const x=C(b,b,s.RGBA8,Z,rt,ot,X),L=et(x),R=s.createRenderbuffer();return s.bindRenderbuffer(s.RENDERBUFFER,R),s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_COMPONENT24,b,b),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,R),{DM:b,tD:x,fD:L}},qt=!!(s.getExtension("EXT_color_buffer_float")||s.getExtension("EXT_color_buffer_half_float")),Zt=s.createBuffer();s.bindBuffer(s.UNIFORM_BUFFER,Zt),s.bufferData(s.UNIFORM_BUFFER,101*16,s.DYNAMIC_DRAW);const Gt=s.createBuffer();s.bindBuffer(s.UNIFORM_BUFFER,Gt),s.bufferData(s.UNIFORM_BUFFER,13*16,s.DYNAMIC_DRAW);const Mt=3400,jt=s.createBuffer(),i=s.createVertexArray();s.bindVertexArray(i),s.bindBuffer(s.ARRAY_BUFFER,jt),s.bufferData(s.ARRAY_BUFFER,Mt*32,s.DYNAMIC_DRAW),s.enableVertexAttribArray(0),s.vertexAttribPointer(0,4,s.FLOAT,!1,32,0),s.vertexAttribDivisor(0,1),s.enableVertexAttribArray(1),s.vertexAttribPointer(1,4,s.FLOAT,!1,32,16),s.vertexAttribDivisor(1,1),s.bindVertexArray(null);const Lt=s.createVertexArray(),ct=qt?[s.RGBA16F,s.HALF_FLOAT]:[s.RGBA8,rt],J=[],q=b=>{const x={own:0,use:0,tWall:null,fWall:null,tl:b};return x.tEnv=C(512,512,s.RGBA8,Z,rt,ot,X),x.fEnv=et(x.tEnv),x.tDof=C(512,512,s.RGBA8,Z,rt,ot,X),x.fDof=et(x.tDof),x.tScat=C(128,128,s.RGBA8,Z,rt,ot,X),x.fScat=et(x.tScat),x.tScW=C(32,32,s.RGBA8,Z,rt,ot,X),x.fScW=et(x.tScW),x.tS0=C(512,512,ct[0],Z,ct[1],ot,X),x.tS1=C(512,512,ct[0],Z,ct[1],ot,X),x.fS0=et(x.tS0),x.fS1=et(x.tS1),x.tGr=C(256,256,s.RGBA8,Z,rt,ot,X),J.push(x),x},ht={pool:J,tick:0,ids:0};return ht.take=(b,x,L)=>{let R=null;for(const $ of J)$.tl===L&&(!R||$.use<R.use)&&(R=$);if((!R||ht.tick-R.use<=90&&J.length<6)&&(R=q(L)),x&&!R.tWall){const $=L?512:1024;R.tWall=C($,$,s.RGBA8,Z,rt,ot,X),R.fWall=et(R.tWall)}return R.own=b,R.use=ht.tick,R},ht.fr=typeof FinalizationRegistry=="function"?new FinalizationRegistry(b=>{const x=b.s;if(!x||x.own!==b.id||s.isContextLost())return;const L=J.indexOf(x);L>=0&&J.splice(L,1);for(const R of["tEnv","tDof","tScat","tScW","tS0","tS1","tGr","tWall"])x[R]&&s.deleteTexture(x[R]);for(const R of["fEnv","fDof","fScat","fScW","fS0","fS1","fWall"])x[R]&&s.deleteFramebuffer(x[R])}):null,{K:ht,drops:b=>b?ht.dropT||(ht.dropT=ie(512)):ht.dropB||(ht.dropB=ie(1024)),pEnv:U,pWall:yt,pBlur:St,pSim:Yt,pDrop:ge,pComp:Ht,loc:No,tex:C,fbo:et,tN:Re,tA128:ne,fA128:Xe,tB128:Fe,fB128:Ye,tA32:Ae,fA32:Do,tB32:He,fB32:O,floatOK:qt,uboS:Zt,uboF:Gt,MAXI:Mt,vbI:jt,vaI:i,vaE:Lt}}_o.add({num:276,name:"Foggy Mirror",fam:"Worlds",recipe:"A close look at a bathroom mirror while a hot shower runs. The fog is made of real tiny droplets that grow and merge until big ones run down leaving clear trails, and the room behind you shows in every clear patch and upside down in every drop. The tiles, the light and the old wipe change every mint. Drag to wipe it, tap to dab, or hold to warm a clear spot.",interactive:"Drag to wipe the mirror; beads gather at the edge of the stroke and run down it. Tap to dab, hold to warm a clear spot.",music:!0,gl:!0,fps:30,seed:0,make(s){const r=s.gl,wt=s.size,U=r.__c276||(r.__c276=Da(r)),{pEnv:yt,pWall:St,pBlur:Yt,pSim:ge,pDrop:Ht,pComp:zt,loc:V,tex:We,fbo:No,tN:C,floatOK:et,uboS:Kt,uboF:Re,MAXI:Z,vbI:rt,vaI:ot,vaE:X}=U,{DM:ne,tD:Xe,fD:Fe}=U.drops(!!s.tile),Ye=r.RGBA,Ae=r.UNSIGNED_BYTE,Do=r.LINEAR,He=r.CLAMP_TO_EDGE,O=(t,e)=>{r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D,e)},ie=()=>{r.disable(r.DEPTH_TEST),r.disable(r.CULL_FACE),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.colorMask(!0,!0,!0,!0),r.depthMask(!1)},qt=s.hash.slice(2);let Zt=parseInt(qt.slice(0,8),16)|0,Gt=parseInt(qt.slice(8,16),16)|0,Mt=parseInt(qt.slice(16,24),16)|0,jt=parseInt(qt.slice(24,32),16)|0;const i=()=>{Zt|=0,Gt|=0,Mt|=0,jt|=0;const t=(Zt+Gt|0)+jt|0;return jt=jt+1|0,Zt=Gt^Gt>>>9,Gt=Mt+(Mt<<3)|0,Mt=Mt<<21|Mt>>>11,Mt=Mt+t|0,(t>>>0)/4294967296};for(let t=0;t<12;t++)i();const Lt=t=>{let e=0;for(const c of t)e+=c[1];let o=i()*e;for(const c of t)if(o-=c[1],o<=0)return c[0];return t[0][0]},ct=s.home;let J=41328926;for(let t=2;t<qt.length+2;t+=8)J=Math.imul(J^parseInt(s.hash.slice(t,t+8)||"0",16),668265263)^J>>>15;const q=()=>{J=J+1831565813|0;let t=Math.imul(J^J>>>15,1|J);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ht=ct?"sage zellige":Lt([["white subway",30],["sage zellige",20],["terracotta",14],["black hexagon",12],["blush square",12],["grey marble",7]]),Jt=ct?"warm globe":Lt([["warm globe",40],["cool morning",26],["bare bulb",22],["candles",8]]),b=ct?"ochre":Lt([["white",26],["ochre",20],["teal",18],["rust",16],["charcoal",12],["none",8]]),x=ct?"steady":Lt([["steady",46],["light",24],["heavy",30]]),L=ct?"one swipe":Lt([["one swipe",34],["two fingers",22],["porthole",15],["zigzag",14],["untouched",15]]),R=ct?"clean":Lt([["clean",50],["cloth swirls",30],["ghost doodle",10],["antique silver",10]]),$=ct?"none":Lt([["none",88],["demister pad",12]]);let Bt=ct?"edge in view":Lt([["close",46],["edge in view",40],["corner",14]]);R==="antique silver"&&Bt==="close"&&(Bt="edge in view"),s.trait("Tiles",ht),s.trait("Light",Jt),s.trait("Towel",b),s.trait("Steam",x),s.trait("Old wipe",L),s.trait("Glass",R),s.trait("Heater",$),s.trait("Framing",Bt);const dt={"white subway":{ty:0,a:[.8,.8,.77],g:[.5,.5,.48],gl:1,s:.15,v:.035},"sage zellige":{ty:1,a:[.3,.45,.36],g:[.66,.64,.58],gl:1.3,s:.1,v:.16},terracotta:{ty:2,a:[.5,.24,.14],g:[.58,.55,.49],gl:.25,s:.15,v:.15},"black hexagon":{ty:3,a:[.032,.034,.038],g:[.6,.6,.57],gl:1.1,s:.055,v:.12},"blush square":{ty:4,a:[.78,.55,.54],g:[.86,.84,.8],gl:1,s:.1,v:.05},"grey marble":{ty:5,a:[.8,.8,.78],g:[.72,.72,.7],gl:.9,s:.6,v:.04}}[ht],A={"warm globe":{s:[1,.7,.4],si:.32,sr:.062,kind:0,cc:[1,.86,.7],ci:.16,amb:.04,ex:1.25,grade:1,fall:1.5,fog:[.08,.089,.089],wall:[.75,.075]},"cool morning":{s:[.95,.93,.9],si:.1,sr:.055,kind:0,cc:[.78,.87,1],ci:1.7,amb:.14,ex:1,grade:1,fall:0},"bare bulb":{s:[1,.74,.42],si:.2,sr:.03,kind:2,cc:[1,.8,.6],ci:.12,amb:.03,ex:1.15,grade:1,fall:0},candles:{s:[1,.58,.24],si:.16,sr:.016,kind:2,cc:[1,.62,.32],ci:.16,amb:.03,ex:1.9,grade:1,fall:0}}[Jt],qa={white:[.8,.78,.74],ochre:[.7,.44,.13],teal:[.08,.33,.35],rust:[.5,.17,.1],charcoal:[.1,.1,.11],none:[0,0,0]},Ut={light:{S:.7,kG:.03,drip:.5},steady:{S:1,kG:.042,drip:1},heavy:{S:1.3,kG:.055,drip:1.7}}[x],qo=(33+7*i())*Math.PI/180,Je=(5+7*i())*Math.PI/180,le=.3+.05*i(),Go=(i()-.5)*.05,fe=[0,0,0],W=[fe[0]+le*Math.sin(qo)*Math.cos(Je),fe[1]+le*Math.sin(Je),le*Math.cos(qo)*Math.cos(Je)],$e=t=>{const e=Math.hypot(t[0],t[1],t[2]);return[t[0]/e,t[1]/e,t[2]/e]},Uo=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],at=$e([fe[0]-W[0],fe[1]-W[1],fe[2]-W[2]]);let Y=$e(Uo(at,[0,1,0])),Q=Uo(Y,at);{const t=Math.cos(Go),e=Math.sin(Go),o=Y.map((n,l)=>n*t+Q[l]*e),c=Q.map((n,l)=>-Y[l]*e+n*t);Y=o,Q=c}const gt=.25,Qe=2,Po=(t,e)=>{const o=2*t-1,c=2*e-1;return $e([at[0]+o*gt*Y[0]+c*gt*Q[0],at[1]+o*gt*Y[1]+c*gt*Q[1],at[2]+o*gt*Y[2]+c*gt*Q[2]])},vt=(t,e)=>{const o=Po(t,e),c=-W[2]/o[2];return[(W[0]+o[0]*c)*1e3,(W[1]+o[1]*c)*1e3]};let Ee=1e9,Le=1e9,Te=-1e9,Se=-1e9;for(const[t,e]of[[0,0],[1,0],[0,1],[1,1],[.5,0],[.5,1],[0,.5],[1,.5]]){const o=vt(t,e);Ee=Math.min(Ee,o[0]),Le=Math.min(Le,o[1]),Te=Math.max(Te,o[0]),Se=Math.max(Se,o[1])}const E=Math.max(Te-Ee,Se-Le)+16,_=(Ee+Te)/2-E/2,N=(Le+Se)/2-E/2;let Pt=[-5e3,-5e3,5e3,5e3];if(Bt!=="close"){const t=vt(.09+.1*i(),.5);Pt[0]=t[0]}if(Bt==="corner"){const t=vt(.5,.86+.06*i());Pt[3]=t[1]}const Ga=t=>[t[0],t[1],-t[2]],me=1.5+.4*i(),Ua=-(me*1.25+.4),Pa=1.3,Ia=-1.45,Io=.95,It=.3+.38*i(),Ot=.6+.17*i(),ze=Ga(Po(It,Ot)),Co=vt(It,Ot),to=(me-(A.kind===2?.3:.1))/ze[2],Rt=[Co[0]/1e3+ze[0]*to,Co[1]/1e3+ze[1]*to,ze[2]*to];Jt==="candles"&&(Rt[1]-=.25);const eo=i()<.5?-1:1,jo=Rt[1]-.4-.12*i(),Oo=.5+.15*i(),$t=eo>0?Rt[0]+.22+.2*i():Rt[0]-.22-.2*i()-Oo,oo=$t+Oo,Vo=i()<.7,Wo=eo>0?Rt[0]-.3-.3*i():$t-.15,Ca=.8+.2*i(),ja=i()<.55,Xo=eo>0?oo+.25+.3*i():Vo?Wo-1.2:$t-1.2,Qt=[.15,Io-.03,.55],Be=b==="none"?0:.5+.12*i(),ao=qa[b],Tt={eC:[W[0],W[1],-W[2],gt*Qe],eR:[Y[0],Y[1],-Y[2],0],eU:[Q[0],Q[1],-Q[2],0],eF:[at[0],at[1],-at[2],0],eRm:[Ua,Pa,Ia,Io],eRm2:[me,dt.ty,Wo,Ca],eL1:[Rt[0],Rt[1],Rt[2],A.sr],eL1c:[A.s[0]*A.si,A.s[1]*A.si,A.s[2]*A.si,A.fall],eL2:[Qt[0],Qt[1],Qt[2],0],eL2c:[A.cc[0]*A.ci,A.cc[1]*A.ci,A.cc[2]*A.ci,0],eTa:[dt.a[0],dt.a[1],dt.a[2],dt.gl],eTb:[dt.g[0],dt.g[1],dt.g[2],dt.s],eTw:[$t,b==="none"&&i()<.5?$t:oo,jo,Jt==="cool morning"?1:0],eTwc:[ao[0],ao[1],ao[2],Be],eSt:[.07+.06*Ut.S,A.amb,Vo?1:0,dt.v],eMr:ja?[Xo,Xo+.8,0,0]:[0,0,0,0],eMw:Pt};A.kind===2&&(Tt.eSt[2]+=2);const ke=Bt!=="close",Yo=512,he=U.K,so=++he.ids,Ho={s:null,id:so};let te,_e,Ko,ro,Zo,co,Jo,$o,Qo,ta,de,no,io,Ne,De;const Oa=()=>{te=Ho.s=he.take(so,ke,!!s.tile),{tEnv:_e,fEnv:Ko,tDof:ro,fDof:Zo,tScat:co,fScat:Jo,tScW:$o,fScW:Qo,tS0:de,tS1:no,fS0:io,fS1:Ne,tGr:De}=te,ta=ke?te.tWall:U.tA32},z=256,lo=new Float32Array(z*z);let fo=z,mo=-1,ho=z,vo=-1;const ve=(t,e,o,c)=>{const n=(t-_)/E*z,l=(e-N)/E*z,a=o/E*z,f=Math.max(0,Math.floor(n-a-1)),h=Math.min(z-1,Math.ceil(n+a+1)),m=Math.max(0,Math.floor(l-a-1)),d=Math.min(z-1,Math.ceil(l+a+1));f<fo&&(fo=f),h>mo&&(mo=h),m<ho&&(ho=m),d>vo&&(vo=d);const u=1/(a*a);for(let y=m;y<=d;y++){const p=(y-l)*(y-l);for(let T=f;T<=h;T++){const F=((T-n)*(T-n)+p)*u;if(F<1){const v=y*z+T,g=c*(1-F);g>lo[v]&&(lo[v]=g)}}}};if(R==="cloth swirls")for(let t=0;t<9;t++){const e=_+E*(.15+.7*i()),o=N+E*(.15+.7*i()),c=25+40*i(),n=1+2*i(),l=i()*6.28,a=2.2+2.2*q(),f=2.2/(c*n*6.28),h=.6+.3*q(),m=(q()-.5)*.5;for(let d=0;d<1;d+=f){const u=l+d*n*6.28,y=c*(1+.25*Math.sin(d*9)+m*d);ve(e+y*Math.cos(u),o+y*Math.sin(u)*.8,a*(.7+.5*Math.sin(d*23+l)),h)}}if(R==="ghost doodle"){const t=vt(.42+.16*i(),.42+.16*i());if(i()<.5)for(let o=0;o<1;o+=.002){const c=o*6.28*2.6,n=6+48*o;ve(t[0]+n*Math.cos(c),t[1]+n*Math.sin(c),4.2,.95)}else for(let o=0;o<1;o+=.002){const c=o*6.28,n=42*(1+.18*Math.sin(c*5));ve(t[0]+n*Math.cos(c),t[1]+n*Math.sin(c),4.2,.95)}}{const t=3+Math.floor(i()*4);for(let e=0;e<t;e++){const o=_+E*i(),c=N+E*i();for(let n=0;n<14;n++)ve(o+(i()-.5)*10,c+(i()-.5)*12,5+3*i(),.25*i())}}const xo=new Uint8Array(z*z*4);if(R==="antique silver"){const t=new Float32Array(z*z),e=(c,n,l,a)=>{const f=(c-_)/E*z,h=(n-N)/E*z,m=l/E*z;for(let d=Math.max(0,Math.floor(h-m-1));d<=Math.min(z-1,Math.ceil(h+m+1));d++)for(let u=Math.max(0,Math.floor(f-m-1));u<=Math.min(z-1,Math.ceil(f+m+1));u++){const y=Math.hypot(u-f,d-h)/m;y<1&&(t[d*z+u]=Math.max(t[d*z+u],a*Math.min(1,(1-y)*3)))}},o=110+Math.floor(i()*60);for(let c=0;c<o;c++){const n=i()<.75;let l,a;n&&Pt[0]>-4e3?(l=Pt[0]+Math.pow(i(),2.2)*45,a=N+E*i()):n&&Pt[3]<4e3?(a=Pt[3]-Math.pow(i(),2.2)*45,l=_+E*i()):(l=_+E*i(),a=N+E*i());const f=n?.7+4.5*Math.pow(i(),2):.4+1.1*i();if(e(l,a,f,.55+.45*i()),n&&i()<.4)for(let h=0;h<5;h++)e(l+(i()-.5)*f*3,a+(i()-.5)*f*3,f*(.3+.5*i()),.5+.4*i())}for(let c=0;c<z*z;c++)xo[c*4+1]=Math.min(255,t[c]*255)}const xe=[],kt=[],ns=vt(It,Ot),is=(t,e)=>{for(let o=0;o+1<t.length;o++)kt.push([t[o][0],t[o][1],t[o+1][0],t[o+1][1],e])},po=[W[0],W[1],-W[2]],uo=[Y[0],Y[1],-Y[2]],bo=[Q[0],Q[1],-Q[2]],wo=[at[0],at[1],-at[2]],it=(t=>{const e=[t[0]-po[0],t[1]-po[1],t[2]-po[2]],o=e[0]*wo[0]+e[1]*wo[1]+e[2]*wo[2];return[.5+.5*(e[0]*uo[0]+e[1]*uo[1]+e[2]*uo[2])/o/gt,.5+.5*(e[0]*bo[0]+e[1]*bo[1]+e[2]*bo[2])/o/gt]})([($t+oo)/2,jo-Be*.4,me-.1]),qe=!ct&&q()<.45&&L!=="zigzag";let Ge=It,pe=Ot;qe&&(Be>0&&it[0]>.15&&it[0]<.85&&it[1]>.15&&it[1]<.7&&Math.hypot(it[0]-It,it[1]-Ot)>.25&&q()<.6?(Ge=it[0],pe=it[1]+.04):(Ge=It+(It<.5?1:-1)*(.24+.14*q()),pe=Ot-.2-.2*q()));const Ue=vt(Ge,pe),w=(()=>{let t=J^1374496707;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}})(),Va=(t,e)=>{const o=[];for(let c=0;c<=e;c++){const n=c/e*(t.length-1),l=Math.min(t.length-2,Math.floor(n)),a=n-l,f=a*a,h=f*a,m=t[Math.max(0,l-1)],d=t[l],u=t[l+1],y=t[Math.min(t.length-1,l+2)];o.push([0,1].map(p=>.5*(2*d[p]+(u[p]-m[p])*a+(2*m[p]-5*d[p]+4*u[p]-y[p])*f+(3*d[p]-m[p]-3*u[p]+y[p])*h)))}return o},yo=[],Pe=[],Ie=(t,e,o,c,n)=>{const l=n.n||30,a=Va(t,l),f=[w()*6.28,w()*6.28,w()*6.28],h=n.wander??1,m=a.map((v,g)=>{const Nt=a[Math.max(0,g-1)],re=a[Math.min(l,g+1)],bt=re[0]-Nt[0],I=re[1]-Nt[1],G=Math.hypot(bt,I)||1;return[-I/G,bt/G]});for(let v=0;v<=l;v++){const g=v/l,Nt=h*(2.4*Math.sin(g*5.1+f[0])+1.2*Math.sin(g*13.7+f[1]));a[v][0]+=m[v][0]*Nt,a[v][1]+=m[v][1]*Nt}const d=n.lift??1,u=n.land??0,y=v=>(.8+.2*Math.min(1,Math.max(0,(v-u)/.06)))*(1+.22*Math.sin(v*7.3+f[2])+.1*Math.sin(v*19+f[0]))*(v>d-.24?Math.max(.3,1-Math.pow((v-d+.24)/.3,1.5)):1),p=[],T=e>2,F=[];for(let v=0;v<e;v++){const g=v-(e-1)/2,Nt=d-.03*Math.abs(g)-.025*w(),re=c*(.9+.2*w()),bt=v===0||v===e-1;if(T&&!bt)continue;let I=null;for(let G=0;G<=l;G++){const S=G/l;if(S<u-.001||S>Nt){I=null;continue}const ft=y(S),Dt=o*(.62+.38*Math.min(ft,1))*(1+.07*Math.sin(S*9+v*2.1)),mt=re*ft*(.68+.64*w()),ko=(bt?2.6:.9)*(Math.sin(S*31+v*1.7+f[1])+.6*Math.sin(S*71+v*2.9+f[2])),ce=[a[G][0]+m[G][0]*(g*Dt+ko),a[G][1]+m[G][1]*(g*Dt+ko)];I&&kt.push([I[0],I[1],ce[0],ce[1],(I[2]+mt)*.5,bt?1:0]),I=[ce[0],ce[1],mt],v===0&&(p[G]=(e-1)/2*Dt+mt,F[G]=(e-1)/2*Dt+.2*mt)}}if(T){const v=d-.015;for(let g=1;g<=l;g++)g/l>v||!F[g]||!F[g-1]||kt.push([a[g-1][0],a[g-1][1],a[g][0],a[g][1],(F[g-1]+F[g])*.5,0])}for(let v=2;v<=l;v+=2){const g=v/l;g<u||g>d||!p[v]||!p[v-2]||yo.push([a[v-2][0],a[v-2][1],a[v][0],a[v][1],Math.max(p[v-2],p[v-1]||0,p[v])+n.bord*(.6+.8*w())])}for(let v=1;v<l;v++)if(p[v]&&v/l<d-.3){const g=m[v][1]>0?-1:1;Pe.push([a[v][0]+m[v][0]*p[v]*g,a[v][1]+m[v][1]*p[v]*g,p[v]])}};if(L==="one swipe"){let t=(it[1]-(Ot-.03))/(it[0]-It||.001);Be>0&&it[0]>.05&&it[0]<.95&&it[1]>.08||(t=(i()-.5)*.25),t=Math.max(-1.1,Math.min(1.1,t));const o=pe-.03-.02*i()-(qe?.12:0),c=qe?t*.4:t,n=.02+.04*i(),l=[];for(let h=0;h<=8;h++){const m=-.08+1.16*h/8;l.push(vt(m,o+c*(m-Ge)-n*4*(m-.5)*(m-.5)+n))}const a=15+5*i(),f=a*2/4;Ie(l,4,f*1.02,f*.56,{n:22,lift:.88+.08*w(),bord:3.5})}else if(L==="two fingers"){const t=-.5+i()*.5,e=Math.cos(t),o=Math.sin(t),c=[];for(let n=0;n<=8;n++){const l=-150+300*n/8;c.push([Ue[0]+e*l+o*18+4*Math.sin(n*.9),Ue[1]+o*l-e*18])}Ie(c,2,22,10.6,{land:.06+.1*w(),lift:.8+.14*w(),bord:3})}else if(L==="porthole"){const t=34+10*i(),e=Ue[0]+(i()-.5)*20,o=Ue[1]-14,c=2+Math.floor(q()*2),n=q()*6.28,l=[[e,o]];for(let a=0;a<c;a++){const f=n+a*6.28/c+q(),h=t*(.3+.15*q());l.push([e+h*Math.cos(f),o+h*Math.sin(f)]),q()}for(const[a,f]of l){const h=t*(.26+.12*w()),m=[];for(let d=0;d<=9;d++){const u=d/9*6.6+w()*.3;m.push([a+h*Math.cos(u),f+h*Math.sin(u)*.92])}Ie(m,1,0,t*(.5+.1*w()),{n:16,wander:.6,lift:1.4,bord:3})}}else if(L==="zigzag"){const t=[],e=4+Math.floor(i()*2);for(let o=0;o<=e;o++){const c=-.05+1.1*o/e;t.push(vt(c,pe-.08-(qe?.08:0)+(o%2?-.17:.05)+(i()-.5)*.04))}Ie(t,2,9.5,5.2,{n:30,lift:.9+.06*w(),bord:3})}for(const t of kt)xe.push([t[0],t[1],t[2],t[3],t[4],2,0,t[5]?.9:0]);for(const t of yo)xe.push([t[0],t[1],t[2],t[3],t[4],2,.42,0]);const Wa=1,P=64,xt=E/P,nt=new Float32Array(P*P),Ft=new Float32Array(P*P),Mo=x==="light"?.55:x==="heavy"?1:.95;nt.fill(Mo);const At=4.7,j=Math.ceil(E/At),D=j*j,k=new Float32Array(D),B=new Float32Array(D),Vt=new Float32Array(D),Wt=new Float32Array(D),M=new Float32Array(D),ea=new Float32Array(D),oa=new Float32Array(D),Ce=new Float32Array(D),aa=1.44,pt=t=>Math.cbrt(Math.max(t,0)/aa),Xt=t=>aa*t*t*t,Xa=x==="light"?.62:x==="heavy"?1.2:1,ue=[q()*6.28,q()*6.28,q()*6.28,.015+.01*q()],Ya=(t,e)=>Math.max(.35,1+.3*Math.sin(t*ue[3]+ue[0])*Math.sin(e*ue[3]*.8+ue[1])+.2*Math.sin((t-e)*.041+ue[2]));for(let t=0;t<j;t++)for(let e=0;e<j;e++){const o=t*j+e;Vt[o]=k[o]=_+(e+.2+.6*i())*At,Wt[o]=B[o]=N+(t+.2+.6*i())*At,ea[o]=1.75+.9*i()*i()+.3*i(),oa[o]=Math.exp((i()-.5)*1.6),Ce[o]=.6+.5*i();const c=i();M[o]=Xt(Math.min(2.4,1.75*Xa*Ya(k[o],B[o])*Math.pow(c,2.6)))}const go=(t,e)=>{const o=Math.floor((t-_)/xt),c=Math.floor((e-N)/xt);return o<0||c<0||o>=P||c>=P?-1:c*P+o},sa=(t,e,o,c,n,l)=>{const a=n-o,f=l-c,h=a*a+f*f;let m=h>1e-6?((t-o)*a+(e-c)*f)/h:0;m=m<0?0:m>1?1:m;const d=t-o-a*m,u=e-c-f*m;return Math.sqrt(d*d+u*u)},ra=(t,e)=>1+.2*Math.sin(t*.093+e*.061)+.11*Math.sin(t*.037-e*.052+2)+.07*Math.sin(t*.21+e*.17+4),ca=new Float32Array(D);for(let t=0;t<D;t++)ca[t]=ra(Vt[t],Wt[t]);const ee=(t,e,o,c,n,l,a)=>{const f=Math.min(t,o)-n*1.9,h=Math.max(t,o)+n*1.9,m=Math.min(e,c)-n*1.9,d=Math.max(e,c)+n*1.9;let u=0;const y=Math.max(0,Math.floor((f-_)/xt)),p=Math.min(P-1,Math.floor((h-_)/xt)),T=Math.max(0,Math.floor((m-N)/xt)),F=Math.min(P-1,Math.floor((d-N)/xt));for(let I=T;I<=F;I++)for(let G=y;G<=p;G++)if(sa(_+(G+.5)*xt,N+(I+.5)*xt,t,e,o,c)<n*.85){const ft=I*P+G;u+=nt[ft]*xt*xt*.025,nt[ft]=l===2?Math.min(nt[ft],a):0,Ft[ft]=l===1?.6:l===2?a<.05?Wa:Ft[ft]:.9}const v=Math.max(0,Math.floor((f-_)/At)-1),g=Math.min(j-1,Math.floor((h-_)/At)+1),Nt=Math.max(0,Math.floor((m-N)/At)-1),re=Math.min(j-1,Math.floor((d-N)/At)+1),bt=[];for(let I=Nt;I<=re;I++)for(let G=v;G<=g;G++){const S=I*j+G,ft=sa(k[S],B[S],t,e,o,c),Dt=l===1?n:n*(k[S]===Vt[S]&&B[S]===Wt[S]?ca[S]:ra(k[S],B[S]));ft<Dt*.92?(u+=M[S],M[S]=l===2&&a>.05?M[S]*.15*a:0,k[S]=Vt[S],B[S]=Wt[S]):l!==1&&ft<Dt*1.3&&bt.push(S)}if(bt.length&&l!==1){const I=o-t,G=c-e;let S=0;const ft=bt.map(mt=>{const ce=((k[mt]-t)*-G+(B[mt]-e)*I)*(I>=0?1:-1)<0||Math.abs(I)<.001&&B[mt]<(e+c)/2,Fa=l===2?w:i,Aa=(ce?2.2:.45)*(.15+1.85*Fa()*Fa());return S+=Aa,Aa}),Dt=u*(l===2?.8:1.8);for(let mt=0;mt<bt.length;mt++)M[bt[mt]]+=Dt*ft[mt]/S}return u};for(const t of yo)ee(t[0],t[1],t[2],t[3],t[4],2,.42);for(const t of kt)ee(t[0],t[1],t[2],t[3],t[4],2,0);const na=(t,e,o,c,n)=>{const l=Math.max(2,Math.min(8,Math.round(o/14+w()*2)));let a=(w()-.5)*.3;const f=Math.min(.8,.3+.55*c),h=.03+.4*c;for(let d=0;d<l;d++){const u=e-o/l*(.6+.8*w());let y=t+a*(e-u);w()<.55&&(y+=(w()-.5)*n*1.8,a+=(w()-.5)*.35);const p=(d+.5)/l,T=n*(d===0?.4:d===1?.75:.85+.3*w()),F=f+(h-f)*p;if(xe.push([t,e,y,u,T,2,F,0]),ee(t,e,y,u,T,2,F),d>0&&w()<.85){const v=w(),g=be(t+(y-t)*v,e+(u-e)*v);g>=0&&(M[g]=Xt(.3+.6*w()*w()+.3*p),k[g]=t+(y-t)*v+(w()-.5)*T*.7,B[g]=e+(u-e)*v)}t=y,e=u}const m=be(t,e-1);m>=0&&(M[m]=Xt((1.4+.5*w())*(1-.2*c)),k[m]=t,B[m]=e-1)},Ha=(L==="untouched"?7:4)+Math.floor(w()*3)+(x==="heavy"?1:x==="light"?-2:0);for(let t=0;t<Ha;t++){const e=w();na(_+E*(.06+.88*w()),N+E*(.25+.62*Math.sqrt(w())),E*(.08+.5*w()*(.4+.6*w())),e,(1.3+1.3*w())*(1-.35*e))}if(Pe.length){const t=3+Math.floor(w()*3);for(let e=0;e<t;e++){const o=Pe[Math.floor(w()*Pe.length)];o[0]<_+4||o[0]>_+E-4||na(o[0]+(w()-.5)*3,o[1]-.5,E*(.015+.13*Math.pow(w(),1.6)),.15*w(),.8+.6*w())}}for(const t of kt)ve((t[0]+t[2])*.5,(t[1]+t[3])*.5,t[4]*1.3,.5);for(let t=ho;t<=vo;t++)for(let e=t*z+fo,o=t*z+mo;e<=o;e++)xo[e*4]=Math.min(255,lo[e]*255);function be(t,e){const o=Math.floor((t-_)/At),c=Math.floor((e-N)/At);return o<0||c<0||o>=j||c>=j?-1:c*j+o}const Ro=()=>{for(let t=0;t<j;t++)for(let e=0;e<j;e++){const o=t*j+e,c=_t[o];if(!(c<.45||M[o]<=0))for(let n=0;n<4;n++){const l=e+(n===0?1:n===1?0:n===2?1:-1),a=t+(n===0?0:1);if(l<0||l>=j||a>=j)continue;const f=a*j+l,h=_t[f];if(M[f]<=0||h<=0)continue;const m=k[o]-k[f],d=B[o]-B[f],u=(c+h)*.95;if(m*m+d*d<u*u){const y=M[o]>=M[f]?o:f,p=y===o?f:o,T=M[o]+M[f],F=M[y]/T;if(k[y]=k[y]*F+k[p]*(1-F),B[y]=B[y]*F+B[p]*(1-F),M[y]=T,M[p]=0,k[p]=Vt[p],B[p]=Wt[p],_t[y]=pt(T),_t[p]=0,y===f)break}}}},_t=new Float32Array(D),Fo=Na(D),Ka=Fo.c,Za=Fo.s,Ja=Fo.e;for(let t=0;t<D;t++)_t[t]=pt(M[t]);Ro(),Ro();const tt=[],ia=40,Ao=(t,e,o,c)=>{if(tt.length>=ia)return null;const n={x:t,y:e,px:t,py:e,gx:t,gy:e,V:o,wait:c,sl:(i()-.5)*.25,nextPin:2+i()*10,nextBead:2+i()*4,sp:0,seed:i()};return tt.push(n),n};if(kt.length){const t=2+Math.floor(i()*3);for(let e=0;e<t;e++){const o=kt[Math.floor(i()*kt.length)],c=i();let n=o[0]+(o[2]-o[0])*c,l=o[1]+(o[3]-o[1])*c;if(o[4]>30){const a=i()*3;n=o[0]+Math.cos(a)*o[4],l=o[1]+Math.sin(a)*o[4]}else l+=o[4]*1.05;n>_+5&&n<_+E-5&&l>N+10&&l<N+E&&Ao(n,l,Xt(2+.4*i()),.3+2.6*i())}}{const t=(x==="light"?1:2)+Math.floor(q()*3)+(x==="heavy"?2:0);for(let e=0;e<t;e++)Ao(_+E*(.08+.84*q()),N+E*(.45+.5*q()),Xt(2+.7*q()),q()*2.5)}let Et=[0,0,-1,-1];if($==="demister pad"){const t=vt(.5+(i()-.5)*.2,.5+(i()-.5)*.2),e=42+14*i(),o=30+10*i();Et=[t[0]-e,t[1]-o,t[0]+e,t[1]+o]}const la=5.5+2.5*i(),$a=la*Math.abs(1/(me*1.3)-1/le)/1e3/Qe,fa=()=>{Oa(),ie(),r.bindVertexArray(X),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),O(0,De),r.texSubImage2D(r.TEXTURE_2D,0,0,0,z,z,Ye,Ae,xo),O(0,C);const t=(o,c)=>{const n=["eC","eR","eU","eF","eRm","eRm2","eL1","eL1c","eL2","eL2c","eTa","eTb","eTw","eTwc","eSt","eMr","eMw"];for(let l=0;l<n.length;l++)r.uniform4fv(o[l],Tt[n[l]]);r.uniform1i(V.eMode,c)};if(r.useProgram(yt),t(V.env,0),r.bindFramebuffer(r.FRAMEBUFFER,Ko),r.viewport(0,0,512,512),r.drawArrays(r.TRIANGLES,0,3),r.bindTexture(r.TEXTURE_2D,_e),r.generateMipmap(r.TEXTURE_2D),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),O(0,C),ke){const o=te.fWall;r.useProgram(St),t(V.wall,1),r.uniform4fv(V.wall[0],[W[0],W[1],W[2],gt]),r.uniform4fv(V.wall[1],[...Y,0]),r.uniform4fv(V.wall[2],[...Q,0]),r.uniform4fv(V.wall[3],[...at,0]),A.wall&&(r.uniform4fv(V.wall[7],[Tt.eL1c[0],Tt.eL1c[1],Tt.eL1c[2],0]),r.uniform4fv(V.wall[9],[A.cc[0]*A.wall[0],A.cc[1]*A.wall[0],A.cc[2]*A.wall[0],0]),r.uniform4fv(V.wall[14],[Tt.eSt[0],A.wall[1],Tt.eSt[2],Tt.eSt[3]])),r.bindFramebuffer(r.FRAMEBUFFER,o),r.viewport(0,0,s.tile?512:1024,s.tile?512:1024),r.drawArrays(r.TRIANGLES,0,3)}r.useProgram(Yt);const e=(o,c,n,l,a,f,h)=>{O(0,o),r.bindFramebuffer(r.FRAMEBUFFER,c),r.viewport(0,0,n,n),r.uniform1i(V.bM,l),r.uniform4f(V.bB,a,f,h,0),r.drawArrays(r.TRIANGLES,0,3)};e(_e,Zo,512,1,0,0,$a*.3),e(ro,U.fA128,128,2,1/512,1/512,0),e(U.tA128,U.fB128,128,0,2.2/128,0,0),e(U.tB128,Jo,128,0,0,2.2/128,0),e(co,U.fA32,32,2,1/128,1/128,0),e(U.tA32,U.fB32,32,0,1.6/32,0,0),e(U.tB32,Qo,32,0,0,1.6/32,0),O(0,C)};fa();const H=new Float32Array(101*4),st=new Float32Array(13*4);H.set([_,N,E,1/30],0),H.set([0,0,0,0],4),H.set([Et[0],Et[1],Et[2],Et[3]],12),H.set([Ut.kG,1.6,et?.09:-.09,Mo],16),st.set([W[0],W[1],W[2],gt],0),st.set([Y[0],Y[1],Y[2],Qe],4),st.set([Q[0],Q[1],Q[2],0],8),st.set([at[0],at[1],at[2],A.ex],12),st.set([_,N,E,la],16),st.set(Pt,20),st.set([Rt[0],Rt[1],Rt[2],Jt==="cool morning"?-1:A.sr],24),st.set(Tt.eL1c,28),st.set([Qt[0],Qt[1],Qt[2],0],32),st.set(Tt.eL2c,36),st.set([le,R==="antique silver"?1:0,ke?1:0,.05+.04*Ut.S],40),st.set([.93,.935,.94,A.grade],44);const Qa=A.amb*.45,Eo=A.fog||A.cc.map(t=>t*Qa);st.set([Eo[0],Eo[1],Eo[2],x==="light"?1:x==="heavy"?-1:0],48);const ma=t=>{const e=Math.min(t.length,48);for(let o=0;o<e;o++){const c=t[o],n=20+o*8;for(let l=0;l<8;l++)H[n+l]=c[l]}H[6]=e},ha=()=>{r.bindBuffer(r.UNIFORM_BUFFER,Kt),r.bufferSubData(r.UNIFORM_BUFFER,0,H),r.bindBufferBase(r.UNIFORM_BUFFER,0,Kt),r.useProgram(ge),r.bindVertexArray(X),O(0,C),O(1,de),O(2,De),r.bindFramebuffer(r.FRAMEBUFFER,Ne),r.viewport(0,0,Yo,Yo),r.drawArrays(r.TRIANGLES,0,3);let t=de;de=no,no=t,t=io,io=Ne,Ne=t},da=()=>{for(let t=0;t<Math.max(xe.length,1);t+=48)ma(xe.slice(t,t+48)),H[4]=Ut.S,H[7]=t?0:1,H[3]=0,ha();H[7]=0,H[6]=0,H[3]=1/30};da();const oe=1/30;let je=0,we=0,lt=null,va=0,ae=0,Lo=0,To=0,So=0,xa=1;const se=[],K=new Float32Array(Z*8);let ut=[0,0,0,0];const zo=95+30*i(),pa=50+15*i(),ua=(t,e,o)=>{const c=Math.min(1,Math.max(0,(o-t)/(e-t)));return c*c*(3-2*c)},ba=t=>{const e=t%zo,o=1-.88*(ua(pa,pa+8,e)-ua(zo-10,zo,e));return Ut.S*o*(.85+.12*Math.sin(t*.071+1.3)+.08*Math.sin(t*.23+.4))};for(let t=0;t<D;t++)_t[t]=pt(M[t]);const wa=new Float32Array(D).fill(NaN),ya=new Float64Array(D),Ma=new Float32Array(D).fill(NaN),ga=new Float32Array(D).fill(NaN),Ra=new Int32Array(D),ts=(t,e)=>{for(let o=0;o<P;o++){const c=t*(.7+.45*(o+.5)/P),n=c*.95-.3,l=o*P,a=l+P,f=e*.09;if(n>0){const h=e*Ut.kG*n*1.45;for(let m=l;m<a;m++){const d=Ft[m],u=nt[m],y=d<.03?1:d>.28?0:1-(d-.03)/.25;nt[m]=Math.min(1,u+h*y*(1-.779*u/Mo)),Ft[m]=Math.max(0,d-f)}}else{const h=e*.5*n*(.4+.9*(o+.5)/P);for(let m=l;m<a;m++){const d=nt[m];nt[m]=Math.max(0,d+h*(1.3-d)),Ft[m]=Math.max(0,Ft[m]-f)}}}},es=t=>{for(let e=0;e<D;e++)M[e]>0&&(M[e]=Math.max(0,M[e]*(1-t*.015)-t*.006))},os=t=>{for(let e=0;e<D;e++){const o=k[e],c=B[e];let n;if(o===Ma[e]&&c===ga[e]?n=Ra[e]:(n=go(o,c),Ma[e]=o,ga[e]=c,Ra[e]=n),n<0)continue;if(M[e]<=0&&nt[n]<Ce[e]){_t[e]=0;continue}const l=nt[n],a=M[e];let f;a===wa[e]?f=ya[e]:(f=pt(a),wa[e]=a,ya[e]=f),l>=Ce[e]&&(M[e]=a+t*oa[e]*(.25+f)*(l-Ce[e]+.1)),_t[e]=f,f>ea[e]&&Ao(k[e],B[e],M[e],0)&&(M[e]=0,k[e]=Vt[e],B[e]=Wt[e],s.sound.hit("blip",.03,{freq:1500+600*i()}))}},as=()=>{const t=oe;for(let e=tt.length-1;e>=0;e--){const o=tt[e];let c=pt(o.V);if(o.wait>0){o.wait-=t;continue}if(c<1.25){const p=be(o.x,o.y);p>=0&&(M[p]+=o.V,k[p]=o.x,B[p]=o.y),tt.splice(e,1);continue}const n=go(o.x,o.y),l=n>=0?Ft[n]:0;let a=Math.min(45,5+22*(c-1.3))*(1+.6*Math.min(l*2,1));o.sp+=(a-o.sp)*.25;let f=o.sp*t;if(o.nextPin-=f,o.nextPin<0){o.nextPin=1+i()*8;const p=i()*1.1*Math.pow(2.1/c,3);p>.08&&(o.wait=Math.min(p,2.5),o.sp=0)}o.sl+=(i()-.5)*.08*f,o.sl*=.985;let h=0;if(n>=0){const p=n%P,T=p>0?Ft[n-1]:0;h=((p<P-1?Ft[n+1]:0)-T)*.6}const m=(o.sl+h)*f;o.x+=m,o.y-=f;const d=go(o.x,o.y);d>=0&&(o.V+=.02*nt[d]*2*c*f);const u=Math.floor((o.x-_)/At),y=Math.floor((o.y-N)/At);for(let p=y-1;p<=y+1;p++)for(let T=u-1;T<=u+1;T++){if(T<0||p<0||T>=j||p>=j)continue;const F=p*j+T;M[F]<=0||Math.hypot(k[F]-o.x,B[F]-o.y)<c+pt(M[F])&&(o.V+=M[F],M[F]=0,k[F]=Vt[F],B[F]=Wt[F])}if(o.nextBead-=f,o.nextBead<0){o.nextBead=2+i()*6;const p=o.x+(i()-.5)*c*.8,T=o.y+c*1.6+i()*2,F=be(p,T);if(F>=0&&M[F]<=0){const v=Xt(.25+.45*i()*i());M[F]=v,k[F]=p,B[F]=T,o.V-=v}}if(o.V>21&&(o.V=21),c=pt(o.V),d>=0&&(nt[d]=0,Ft[d]=Math.max(Ft[d],.6)),o.y<N-6){tt.splice(e,1);continue}}},ss=(t,e,o)=>{const c=ba(t);if(ts(c,e),ut[3]>0){for(let a=0;a<P;a++)for(let f=0;f<P;f++)Math.hypot(_+(f+.5)*xt-ut[0],N+(a+.5)*xt-ut[1])<ut[2]&&(nt[a*P+f]=Math.max(0,nt[a*P+f]-e*1.6*ut[3]));for(let a=0;a<D;a++)M[a]>0&&Math.hypot(k[a]-ut[0],B[a]-ut[1])<ut[2]*.8&&(M[a]*=1-e*.9*ut[3])}if(Et[2]>Et[0]){for(let a=0;a<D;a++)if(M[a]>0){const f=Math.min(k[a]-Et[0],Et[2]-k[a],B[a]-Et[1],Et[3]-B[a])+6;f>0&&(M[a]*=1-e*.3*Math.min(f/22,1))}}const n=.06*c*Ut.drip,l=e*n;c<.32&&es(e),os(l),xa++,xa%3===0&&Ro();for(let a=0;a<o;a++)as();for(let a=0;a<tt.length;a++)for(let f=a+1;f<tt.length;f++){const h=tt[a],m=tt[f];if(Math.hypot(h.x-m.x,h.y-m.y)<(pt(h.V)+pt(m.V))*.8){const d=h.y<m.y?h:m,u=d===h?m:h;d.V+=u.V,u.V=0,u.wait=0}}for(let a=tt.length-1;a>=0;a--)tt[a].V<=0&&tt.splice(a,1)},rs=()=>{let t=0;for(let e=0;e<D&&t<Z-ia;e++){const o=_t[e];if(o<.3||M[e]<=0)continue;const c=t*8;K[c]=k[e],K[c+1]=B[e],K[c+2]=o,K[c+3]=Ja[e],K[c+4]=Ka[e],K[c+5]=Za[e],K[c+6]=0,K[c+7]=1,t++}return t},ye=8.5,Bo=(t,e)=>{e=Math.min(Math.max(e||0,0),.1);const o=s.input;se.length=0;const c=o.taps?o.taps():[];for(const a of c){const f=vt(a.x,1-a.y),h=f[0]+3.5,m=f[1]-2.5;se.push([f[0],f[1],h,m,6.2,0,.5,0]),ee(f[0],f[1],h,m,6.2,0,0),s.sound.hit("click",.12)}if(o.down&&o.inside){const a=vt(o.x,1-o.y);lt||(lt=a,va=0,ae=0,Lo=0,se.push([a[0],a[1],a[0]+.01,a[1],ye,0,.5,0]),ee(a[0],a[1],a[0]+.01,a[1],ye,0,0));const f=Math.hypot(a[0]-lt[0],a[1]-lt[1]);if(va+=e,f>.4){se.push([lt[0],lt[1],a[0],a[1],ye,0,.5,0]),ee(lt[0],lt[1],a[0],a[1],ye,0,0),Lo+=f,ae=0;const h=f/Math.max(e,.016);To+=e*Math.min(h/60,14),To>1&&(To=0,s.sound.note(88+Math.floor(i()*7),{dur:.045+.04*i(),vel:Math.min(.2,.04+h/1500),wave:"triangle",pan:o.x*2-1})),lt=a}else ae+=e;ut=ae>.35?[a[0],a[1],4.5+Math.min(ae-.35,5)*.8,Math.min((ae-.35)*.7,1)]:[0,0,0,0]}else{if(lt&&Lo>3){const a=be(lt[0],lt[1]-ye*1.1);a>=0&&(M[a]+=Xt(1.4+.6*i()))}lt=null,ut=[0,0,0,0]}je+=e;let n=0;for(const a of tt)a.gx=a.x,a.gy=a.y;for(;je>=oe&&n<3;)je-=oe,n++;n===3&&(je=0),n&&(ss(we,n*oe,n),we+=n*oe);for(const a of tt)(a.gx!==a.x||a.gy!==a.y)&&se.push([a.gx,a.gy,a.x,a.y+pt(a.V)*.3,Math.min(pt(a.V)*.92,2.1),1,.6,0]);if(s.sound.on&&t>So-.3){const f=new Float32Array(4e3);let h=0,m=0;for(let d=0;d<4e3;d++){const u=i()*2-1;h=h*.9+u*.1,m=m*.995+u*.005,f[d]=(h*.5+m*3)*.07*Ut.S*Math.min(1,Math.min(d,4e3-d)/200)}s.sound.pcm(f,8e3),So=Math.max(So,t)+.5}te.own!==so&&(fa(),da()),te.use=++he.tick,ie(),H[4]=ba(we),H[5]=we,H.set(ut,8),n&&(ma(se),H[3]=n*oe,ha());let l=rs();for(const a of tt){const f=pt(a.V),h=l*8,m=a.wait>0?0:Math.min(a.sp/40,1),d=a.sl,u=Math.hypot(d,1);K[h]=a.x,K[h+1]=a.y,K[h+2]=f,K[h+3]=1+.12*m,K[h+4]=d/u,K[h+5]=-1/u,K[h+6]=.25+.45*m,K[h+7]=1.05,l++}r.bindFramebuffer(r.FRAMEBUFFER,Fe),r.viewport(0,0,ne,ne),r.clearColor(.5,.5,0,0),r.clearDepth(1),r.depthMask(!0),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),l&&(r.enable(r.DEPTH_TEST),r.depthFunc(r.LESS),r.useProgram(Ht),r.uniform4f(V.dM,_,N,E,0),r.bindVertexArray(ot),r.bindBuffer(r.ARRAY_BUFFER,rt),r.bufferSubData(r.ARRAY_BUFFER,0,K,0,l*8),r.drawArraysInstanced(r.TRIANGLE_STRIP,0,4,l),r.disable(r.DEPTH_TEST)),r.depthMask(!1),st[11]=we,r.bindBuffer(r.UNIFORM_BUFFER,Re),r.bufferSubData(r.UNIFORM_BUFFER,0,st),r.bindBufferBase(r.UNIFORM_BUFFER,1,Re),r.flush(),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,wt,wt),r.useProgram(zt),r.bindVertexArray(X),O(0,C),O(1,de),O(2,Xe),O(3,_e),O(4,ro),O(5,co),O(6,$o),O(7,ta),O(8,De),r.drawArrays(r.TRIANGLES,0,3),r.bindVertexArray(null)};return Bo(0,0),he.fr&&he.fr.register(Bo,Ho),Bo}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
