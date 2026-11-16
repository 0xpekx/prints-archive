// Foggy Mirror: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/276.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Lo){Lo&&function(){"use strict";const Ct=`#version 300 es
precision highp float;
precision highp sampler2D;
`,be=Ct+"out vec2 v;void main(){vec2 p=vec2(float((gl_VertexID&1)<<2),float((gl_VertexID&2)<<1));v=p*.5;gl_Position=vec4(p-1.,0.,1.);}",Ie=`uniform sampler2D uN;
float nz(vec2 p){return textureLod(uN,p*(1./256.),0.).r;}
float fbm(vec2 p){p*=1./256.;return .5*textureLod(uN,p,0.).r+.25*textureLod(uN,p*2.03+.37,0.).g+.125*textureLod(uN,p*4.07+.71,0.).b+.125*textureLod(uN,p*8.13+.13,0.).a;}
vec4 hsh(vec2 c){return texelFetch(uN,ivec2(mod(c,256.)),0);}
vec3 dec(vec3 e){return e/max(1.-e,vec3(.004));}
vec4 enc(vec3 x){x=max(x,vec3(0.));return vec4(x/(1.+x),1.);}
`,xa=`uniform vec4 eC,eR,eU,eF,eRm,eRm2,eL1,eL1c,eL2,eL2c,eTa,eTb,eTw,eTwc,eSt,eMr,eMw;uniform int eMode;
`,pa=`
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
`,ua=`in vec2 v;out vec4 o;
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
}`,ba=`uniform sampler2D uT;uniform vec4 uB;uniform int uM;
vec3 dec(vec3 e){return e/max(1.-e,vec3(.004));}
in vec2 v;out vec4 o;
void main(){
 vec3 s=vec3(0.);float w=0.;
 if(uM==0){for(int i=-7;i<=7;i++){float fi=float(i);float k=exp(-fi*fi/22.);s+=dec(textureLod(uT,v+uB.xy*fi,0.).rgb)*k;w+=k;}}
 else if(uM==1){for(int i=0;i<48;i++){float fi=float(i)+.5;float r=sqrt(fi/48.);float a=fi*2.3999632;float k=1.-.45*r*r;
  s+=min(dec(textureLod(uT,v+vec2(cos(a),sin(a))*r*uB.z,0.).rgb),vec3(60.))*k;w+=k;}}
 else{for(int j=0;j<4;j++)for(int i=0;i<4;i++){s+=dec(textureLod(uT,v+uB.xy*(vec2(float(i),float(j))-1.5),0.).rgb);w+=1.;}}
 s/=w;o=vec4(s/(1.+s),1.);
}`,wa=`uniform sampler2D uP,uGr;
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
}`,ya=Ct+`layout(location=0) in vec4 aA;layout(location=1) in vec4 aB;
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
}`,Ma=`in vec2 q;flat in vec4 vA;flat in vec4 vB;out vec4 o;
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
}`,ga=`uniform sampler2D uSim,uDrop,uEnv,uDof,uScat,uScW,uWall,uGr;
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
}`;let Ce={n:0};const Ra=a=>{if(Ce.n<a){const r=new Float32Array(a),pt=new Float32Array(a),q=new Float32Array(a);for(let ut=0;ut<a;ut++){const St=(ut*40503>>>0)%628/100;r[ut]=Math.cos(St),pt[ut]=Math.sin(St),q[ut]=1+.18*((ut*2654435761>>>0)%100)/100}Ce={n:a,c:r,s:pt,e:q}}return Ce};function Fa(a){const r=[],pt=(x,F)=>{const b=a.createProgram(),V=a.createShader(a.VERTEX_SHADER),j=a.createShader(a.FRAGMENT_SHADER);return a.shaderSource(V,x),a.compileShader(V),a.shaderSource(j,F),a.compileShader(j),a.attachShader(b,V),a.attachShader(b,j),a.linkProgram(b),b.a=V,b.b=j,r.push(b),b},q=pt(be,Ct+xa+Ie+pa+ua),ut=q,St=pt(be,Ct+ba),Yt=pt(be,Ct+Ie+wa),we=pt(ya,Ct+Ma),Ht=pt(be,Ct+""+Ie+ga);for(const x of r)a.getProgramParameter(x,a.LINK_STATUS)||console.error("276 link",a.getProgramInfoLog(x),a.getShaderInfoLog(x.a),a.getShaderInfoLog(x.b)),a.deleteShader(x.a),a.deleteShader(x.b);const Tt=(x,F)=>a.getUniformLocation(x,F),O=(x,F)=>{a.useProgram(x);for(const b in F)a.uniform1i(Tt(x,b),F[b])};O(q,{uN:0}),O(St,{uT:0}),O(Yt,{uN:0,uP:1,uGr:2}),O(Ht,{uN:0,uSim:1,uDrop:2,uEnv:3,uDof:4,uScat:5,uScW:6,uWall:7,uGr:8}),a.uniformBlockBinding(Yt,a.getUniformBlockIndex(Yt,"S"),0),a.uniformBlockBinding(Ht,a.getUniformBlockIndex(Ht,"F"),1);const je=["eC","eR","eU","eF","eRm","eRm2","eL1","eL1c","eL2","eL2c","eTa","eTb","eTw","eTwc","eSt","eMr","eMw"],So={env:je.map(x=>Tt(q,x)),wall:je.map(x=>Tt(q,x)),eMode:Tt(q,"eMode"),bB:Tt(St,"uB"),bM:Tt(St,"uM"),dM:Tt(we,"uM")},P=(x,F,b,V,j,At,zt,Fe)=>{const Bt=a.createTexture();return a.bindTexture(a.TEXTURE_2D,Bt),a.texImage2D(a.TEXTURE_2D,0,b,x,F,0,V,j,Fe||null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,At),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,At===a.NEAREST?a.NEAREST:a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,zt),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,zt),Bt},Q=x=>{const F=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,F),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,x,0),F};a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1);const Kt=new Uint8Array(256*256*4);{let x=1511925601;for(let F=0;F<Kt.length;F++)x^=x<<13,x^=x>>>17,x^=x<<5,Kt[F]=x&255}const ye=P(256,256,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR_MIPMAP_LINEAR,a.REPEAT,Kt);a.generateMipmap(a.TEXTURE_2D);const Z=a.RGBA,at=a.UNSIGNED_BYTE,tt=a.LINEAR,X=a.CLAMP_TO_EDGE,re=P(128,128,a.RGBA8,Z,at,tt,X),Me=Q(re),ge=P(128,128,a.RGBA8,Z,at,tt,X),Oe=Q(ge),Re=P(32,32,a.RGBA8,Z,at,tt,X),Ve=Q(Re),We=P(32,32,a.RGBA8,Z,at,tt,X),To=Q(We),C=x=>{const F=P(x,x,a.RGBA8,Z,at,tt,X),b=Q(F),V=a.createRenderbuffer();return a.bindRenderbuffer(a.RENDERBUFFER,V),a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_COMPONENT24,x,x),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,V),{DM:x,tD:F,fD:b,rD:V}},ce=!!(a.getExtension("EXT_color_buffer_float")||a.getExtension("EXT_color_buffer_half_float")),qt=a.createBuffer();a.bindBuffer(a.UNIFORM_BUFFER,qt),a.bufferData(a.UNIFORM_BUFFER,101*16,a.DYNAMIC_DRAW);const Zt=a.createBuffer();a.bindBuffer(a.UNIFORM_BUFFER,Zt),a.bufferData(a.UNIFORM_BUFFER,13*16,a.DYNAMIC_DRAW);const Gt=3400,bt=a.createBuffer(),jt=a.createVertexArray();a.bindVertexArray(jt),a.bindBuffer(a.ARRAY_BUFFER,bt),a.bufferData(a.ARRAY_BUFFER,Gt*32,a.DYNAMIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,4,a.FLOAT,!1,32,0),a.vertexAttribDivisor(0,1),a.enableVertexAttribArray(1),a.vertexAttribPointer(1,4,a.FLOAT,!1,32,16),a.vertexAttribDivisor(1,1),a.bindVertexArray(null);const i=a.createVertexArray(),rt=ce?[a.RGBA16F,a.HALF_FLOAT]:[a.RGBA8,at],ft={newSet:(x,F)=>{const b={tWall:null,fWall:null};if(b.tEnv=P(512,512,a.RGBA8,Z,at,tt,X),b.fEnv=Q(b.tEnv),b.tDof=P(512,512,a.RGBA8,Z,at,tt,X),b.fDof=Q(b.tDof),b.tScat=P(128,128,a.RGBA8,Z,at,tt,X),b.fScat=Q(b.tScat),b.tScW=P(32,32,a.RGBA8,Z,at,tt,X),b.fScW=Q(b.tScW),b.tS0=P(512,512,rt[0],Z,rt[1],tt,X),b.tS1=P(512,512,rt[0],Z,rt[1],tt,X),b.fS0=Q(b.tS0),b.fS1=Q(b.tS1),b.tGr=P(256,256,a.RGBA8,Z,at,tt,X),x){const V=F?512:1024;b.tWall=P(V,V,a.RGBA8,Z,at,tt,X),b.fWall=Q(b.tWall)}return b}};return ft.fr=typeof FinalizationRegistry=="function"?new FinalizationRegistry(x=>{const F=x();if(!(!F||a.isContextLost())){for(const b of["tEnv","tDof","tScat","tScW","tS0","tS1","tGr","tWall"])F[b]&&a.deleteTexture(F[b]);for(const b of["fEnv","fDof","fScat","fScW","fS0","fS1","fWall"])F[b]&&a.deleteFramebuffer(F[b]);F.D&&(a.deleteTexture(F.D.tD),a.deleteFramebuffer(F.D.fD),a.deleteRenderbuffer(F.D.rD))}}):null,{K:ft,dropMap:C,pEnv:q,pWall:ut,pBlur:St,pSim:Yt,pDrop:we,pComp:Ht,loc:So,tex:P,fbo:Q,tN:ye,tA128:re,fA128:Me,tB128:ge,fB128:Oe,tA32:Re,fA32:Ve,tB32:We,fB32:To,floatOK:ce,uboS:qt,uboF:Zt,MAXI:Gt,vbI:bt,vaI:jt,vaE:i}}Lo.add({num:276,name:"Foggy Mirror",fam:"Worlds",recipe:"A close look at a bathroom mirror while a hot shower runs. The fog is made of real tiny droplets that grow and merge until big ones run down leaving clear trails, and the room behind you shows in every clear patch and upside down in every drop. The tiles, the light and the old wipe change every mint. Drag to wipe it, tap to dab, or hold to warm a clear spot.",interactive:"Drag to wipe the mirror; beads gather at the edge of the stroke and run down it. Tap to dab, hold to warm a clear spot.",music:!0,gl:!0,fps:30,seed:0,make(a){const r=a.gl,pt=a.size,q=r.__c276||(r.__c276=Fa(r)),{pEnv:ut,pWall:St,pBlur:Yt,pSim:we,pDrop:Ht,pComp:Tt,loc:O,tex:je,fbo:So,tN:P,floatOK:Q,uboS:Kt,uboF:ye,MAXI:Z,vbI:at,vaI:tt,vaE:X}=q,re=q.dropMap(a.tile?512:1024),{DM:Me,tD:ge,fD:Oe}=re,Re=r.RGBA,Ve=r.UNSIGNED_BYTE,We=r.LINEAR,To=r.CLAMP_TO_EDGE,C=(t,e)=>{r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D,e)},ce=()=>{r.disable(r.DEPTH_TEST),r.disable(r.CULL_FACE),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.colorMask(!0,!0,!0,!0),r.depthMask(!1)},qt=a.hash.slice(2);let Zt=parseInt(qt.slice(0,8),16)|0,Gt=parseInt(qt.slice(8,16),16)|0,bt=parseInt(qt.slice(16,24),16)|0,jt=parseInt(qt.slice(24,32),16)|0;const i=()=>{Zt|=0,Gt|=0,bt|=0,jt|=0;const t=(Zt+Gt|0)+jt|0;return jt=jt+1|0,Zt=Gt^Gt>>>9,Gt=bt+(bt<<3)|0,bt=bt<<21|bt>>>11,bt=bt+t|0,(t>>>0)/4294967296};for(let t=0;t<12;t++)i();const rt=t=>{let e=0;for(const c of t)e+=c[1];let o=i()*e;for(const c of t)if(o-=c[1],o<=0)return c[0];return t[0][0]},Ft=a.home;let ft=41328926;for(let t=2;t<qt.length+2;t+=8)ft=Math.imul(ft^parseInt(a.hash.slice(t,t+8)||"0",16),668265263)^ft>>>15;const x=()=>{ft=ft+1831565813|0;let t=Math.imul(ft^ft>>>15,1|ft);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},F=Ft?"sage zellige":rt([["white subway",30],["sage zellige",20],["terracotta",14],["black hexagon",12],["blush square",12],["grey marble",7]]),b=Ft?"warm globe":rt([["warm globe",40],["cool morning",26],["bare bulb",22],["candles",8]]),V=Ft?"ochre":rt([["white",26],["ochre",20],["teal",18],["rust",16],["charcoal",12],["none",8]]),j=Ft?"steady":rt([["steady",46],["light",24],["heavy",30]]),At=Ft?"one swipe":rt([["one swipe",34],["two fingers",22],["porthole",15],["zigzag",14],["untouched",15]]),zt=Ft?"clean":rt([["clean",50],["cloth swirls",30],["ghost doodle",10],["antique silver",10]]),Fe=Ft?"none":rt([["none",88],["demister pad",12]]);let Bt=Ft?"edge in view":rt([["close",46],["edge in view",40],["corner",14]]);zt==="antique silver"&&Bt==="close"&&(Bt="edge in view"),a.trait("Tiles",F),a.trait("Light",b),a.trait("Towel",V),a.trait("Steam",j),a.trait("Old wipe",At),a.trait("Glass",zt),a.trait("Heater",Fe),a.trait("Framing",Bt);const Et={"white subway":{ty:0,a:[.8,.8,.77],g:[.5,.5,.48],gl:1,s:.15,v:.035},"sage zellige":{ty:1,a:[.3,.45,.36],g:[.66,.64,.58],gl:1.3,s:.1,v:.16},terracotta:{ty:2,a:[.5,.24,.14],g:[.58,.55,.49],gl:.25,s:.15,v:.15},"black hexagon":{ty:3,a:[.032,.034,.038],g:[.6,.6,.57],gl:1.1,s:.055,v:.12},"blush square":{ty:4,a:[.78,.55,.54],g:[.86,.84,.8],gl:1,s:.1,v:.05},"grey marble":{ty:5,a:[.8,.8,.78],g:[.72,.72,.7],gl:.9,s:.6,v:.04}}[F],A={"warm globe":{s:[1,.7,.4],si:.32,sr:.062,kind:0,cc:[1,.86,.7],ci:.16,amb:.04,ex:1.25,grade:1,fall:1.5,fog:[.08,.089,.089],wall:[.75,.075]},"cool morning":{s:[.95,.93,.9],si:.1,sr:.055,kind:0,cc:[.78,.87,1],ci:1.7,amb:.14,ex:1,grade:1,fall:0},"bare bulb":{s:[1,.74,.42],si:.2,sr:.03,kind:2,cc:[1,.8,.6],ci:.12,amb:.03,ex:1.15,grade:1,fall:0},candles:{s:[1,.58,.24],si:.16,sr:.016,kind:2,cc:[1,.62,.32],ci:.16,amb:.03,ex:1.9,grade:1,fall:0}}[b],Aa={white:[.8,.78,.74],ochre:[.7,.44,.13],teal:[.08,.33,.35],rust:[.5,.17,.1],charcoal:[.1,.1,.11],none:[0,0,0]},Ut={light:{S:.7,kG:.03,drip:.5},steady:{S:1,kG:.042,drip:1},heavy:{S:1.3,kG:.055,drip:1.7}}[j],zo=(33+7*i())*Math.PI/180,Xe=(5+7*i())*Math.PI/180,ne=.3+.05*i(),Bo=(i()-.5)*.05,ie=[0,0,0],W=[ie[0]+ne*Math.sin(zo)*Math.cos(Xe),ie[1]+ne*Math.sin(Xe),ne*Math.cos(zo)*Math.cos(Xe)],Ye=t=>{const e=Math.hypot(t[0],t[1],t[2]);return[t[0]/e,t[1]/e,t[2]/e]},Do=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],et=Ye([ie[0]-W[0],ie[1]-W[1],ie[2]-W[2]]);let Y=Ye(Do(et,[0,1,0])),J=Do(Y,et);{const t=Math.cos(Bo),e=Math.sin(Bo),o=Y.map((n,l)=>n*t+J[l]*e),c=J.map((n,l)=>-Y[l]*e+n*t);Y=o,J=c}const wt=.25,He=2,ko=(t,e)=>{const o=2*t-1,c=2*e-1;return Ye([et[0]+o*wt*Y[0]+c*wt*J[0],et[1]+o*wt*Y[1]+c*wt*J[1],et[2]+o*wt*Y[2]+c*wt*J[2]])},mt=(t,e)=>{const o=ko(t,e),c=-W[2]/o[2];return[(W[0]+o[0]*c)*1e3,(W[1]+o[1]*c)*1e3]};let Ae=1e9,Ee=1e9,Le=-1e9,Se=-1e9;for(const[t,e]of[[0,0],[1,0],[0,1],[1,1],[.5,0],[.5,1],[0,.5],[1,.5]]){const o=mt(t,e);Ae=Math.min(Ae,o[0]),Ee=Math.min(Ee,o[1]),Le=Math.max(Le,o[0]),Se=Math.max(Se,o[1])}const E=Math.max(Le-Ae,Se-Ee)+16,D=(Ae+Le)/2-E/2,k=(Ee+Se)/2-E/2;let Pt=[-5e3,-5e3,5e3,5e3];if(Bt!=="close"){const t=mt(.09+.1*i(),.5);Pt[0]=t[0]}if(Bt==="corner"){const t=mt(.5,.86+.06*i());Pt[3]=t[1]}const Ea=t=>[t[0],t[1],-t[2]],le=1.5+.4*i(),La=-(le*1.25+.4),Sa=1.3,Ta=-1.45,_o=.95,It=.3+.38*i(),Ot=.6+.17*i(),Te=Ea(ko(It,Ot)),No=mt(It,Ot),Ke=(le-(A.kind===2?.3:.1))/Te[2],yt=[No[0]/1e3+Te[0]*Ke,No[1]/1e3+Te[1]*Ke,Te[2]*Ke];b==="candles"&&(yt[1]-=.25);const Ze=i()<.5?-1:1,qo=yt[1]-.4-.12*i(),Go=.5+.15*i(),Jt=Ze>0?yt[0]+.22+.2*i():yt[0]-.22-.2*i()-Go,Je=Jt+Go,Uo=i()<.7,Po=Ze>0?yt[0]-.3-.3*i():Jt-.15,za=.8+.2*i(),Ba=i()<.55,Io=Ze>0?Je+.25+.3*i():Uo?Po-1.2:Jt-1.2,$t=[.15,_o-.03,.55],ze=V==="none"?0:.5+.12*i(),$e=Aa[V],Lt={eC:[W[0],W[1],-W[2],wt*He],eR:[Y[0],Y[1],-Y[2],0],eU:[J[0],J[1],-J[2],0],eF:[et[0],et[1],-et[2],0],eRm:[La,Sa,Ta,_o],eRm2:[le,Et.ty,Po,za],eL1:[yt[0],yt[1],yt[2],A.sr],eL1c:[A.s[0]*A.si,A.s[1]*A.si,A.s[2]*A.si,A.fall],eL2:[$t[0],$t[1],$t[2],0],eL2c:[A.cc[0]*A.ci,A.cc[1]*A.ci,A.cc[2]*A.ci,0],eTa:[Et.a[0],Et.a[1],Et.a[2],Et.gl],eTb:[Et.g[0],Et.g[1],Et.g[2],Et.s],eTw:[Jt,V==="none"&&i()<.5?Jt:Je,qo,b==="cool morning"?1:0],eTwc:[$e[0],$e[1],$e[2],ze],eSt:[.07+.06*Ut.S,A.amb,Uo?1:0,Et.v],eMr:Ba?[Io,Io+.8,0,0]:[0,0,0,0],eMw:Pt};A.kind===2&&(Lt.eSt[2]+=2);const Be=Bt!=="close",Co=512,Qe=q.K,fe=Qe.newSet(Be,!!a.tile);fe.D=re;let{tEnv:to,fEnv:Da,tDof:jo,fDof:ka,tScat:Oo,fScat:_a,tScW:Na,fScW:qa,tS0:De,tS1:Vo,fS0:Wo,fS1:eo,tGr:oo}=fe,Ga=Be?fe.tWall:q.tA32;const T=256,ao=new Float32Array(T*T);let so=T,ro=-1,co=T,no=-1;const me=(t,e,o,c)=>{const n=(t-D)/E*T,l=(e-k)/E*T,s=o/E*T,f=Math.max(0,Math.floor(n-s-1)),h=Math.min(T-1,Math.ceil(n+s+1)),m=Math.max(0,Math.floor(l-s-1)),d=Math.min(T-1,Math.ceil(l+s+1));f<so&&(so=f),h>ro&&(ro=h),m<co&&(co=m),d>no&&(no=d);const u=1/(s*s);for(let y=m;y<=d;y++){const p=(y-l)*(y-l);for(let L=f;L<=h;L++){const R=((L-n)*(L-n)+p)*u;if(R<1){const v=y*T+L,g=c*(1-R);g>ao[v]&&(ao[v]=g)}}}};if(zt==="cloth swirls")for(let t=0;t<9;t++){const e=D+E*(.15+.7*i()),o=k+E*(.15+.7*i()),c=25+40*i(),n=1+2*i(),l=i()*6.28,s=2.2+2.2*x(),f=2.2/(c*n*6.28),h=.6+.3*x(),m=(x()-.5)*.5;for(let d=0;d<1;d+=f){const u=l+d*n*6.28,y=c*(1+.25*Math.sin(d*9)+m*d);me(e+y*Math.cos(u),o+y*Math.sin(u)*.8,s*(.7+.5*Math.sin(d*23+l)),h)}}if(zt==="ghost doodle"){const t=mt(.42+.16*i(),.42+.16*i());if(i()<.5)for(let o=0;o<1;o+=.002){const c=o*6.28*2.6,n=6+48*o;me(t[0]+n*Math.cos(c),t[1]+n*Math.sin(c),4.2,.95)}else for(let o=0;o<1;o+=.002){const c=o*6.28,n=42*(1+.18*Math.sin(c*5));me(t[0]+n*Math.cos(c),t[1]+n*Math.sin(c),4.2,.95)}}{const t=3+Math.floor(i()*4);for(let e=0;e<t;e++){const o=D+E*i(),c=k+E*i();for(let n=0;n<14;n++)me(o+(i()-.5)*10,c+(i()-.5)*12,5+3*i(),.25*i())}}const io=new Uint8Array(T*T*4);if(zt==="antique silver"){const t=new Float32Array(T*T),e=(c,n,l,s)=>{const f=(c-D)/E*T,h=(n-k)/E*T,m=l/E*T;for(let d=Math.max(0,Math.floor(h-m-1));d<=Math.min(T-1,Math.ceil(h+m+1));d++)for(let u=Math.max(0,Math.floor(f-m-1));u<=Math.min(T-1,Math.ceil(f+m+1));u++){const y=Math.hypot(u-f,d-h)/m;y<1&&(t[d*T+u]=Math.max(t[d*T+u],s*Math.min(1,(1-y)*3)))}},o=110+Math.floor(i()*60);for(let c=0;c<o;c++){const n=i()<.75;let l,s;n&&Pt[0]>-4e3?(l=Pt[0]+Math.pow(i(),2.2)*45,s=k+E*i()):n&&Pt[3]<4e3?(s=Pt[3]-Math.pow(i(),2.2)*45,l=D+E*i()):(l=D+E*i(),s=k+E*i());const f=n?.7+4.5*Math.pow(i(),2):.4+1.1*i();if(e(l,s,f,.55+.45*i()),n&&i()<.4)for(let h=0;h<5;h++)e(l+(i()-.5)*f*3,s+(i()-.5)*f*3,f*(.3+.5*i()),.5+.4*i())}for(let c=0;c<T*T;c++)io[c*4+1]=Math.min(255,t[c]*255)}const he=[],Dt=[],as=mt(It,Ot),ss=(t,e)=>{for(let o=0;o+1<t.length;o++)Dt.push([t[o][0],t[o][1],t[o+1][0],t[o+1][1],e])},lo=[W[0],W[1],-W[2]],fo=[Y[0],Y[1],-Y[2]],mo=[J[0],J[1],-J[2]],ho=[et[0],et[1],-et[2]],ct=(t=>{const e=[t[0]-lo[0],t[1]-lo[1],t[2]-lo[2]],o=e[0]*ho[0]+e[1]*ho[1]+e[2]*ho[2];return[.5+.5*(e[0]*fo[0]+e[1]*fo[1]+e[2]*fo[2])/o/wt,.5+.5*(e[0]*mo[0]+e[1]*mo[1]+e[2]*mo[2])/o/wt]})([(Jt+Je)/2,qo-ze*.4,le-.1]),ke=!Ft&&x()<.45&&At!=="zigzag";let _e=It,de=Ot;ke&&(ze>0&&ct[0]>.15&&ct[0]<.85&&ct[1]>.15&&ct[1]<.7&&Math.hypot(ct[0]-It,ct[1]-Ot)>.25&&x()<.6?(_e=ct[0],de=ct[1]+.04):(_e=It+(It<.5?1:-1)*(.24+.14*x()),de=Ot-.2-.2*x()));const Ne=mt(_e,de),w=(()=>{let t=ft^1374496707;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}})(),Ua=(t,e)=>{const o=[];for(let c=0;c<=e;c++){const n=c/e*(t.length-1),l=Math.min(t.length-2,Math.floor(n)),s=n-l,f=s*s,h=f*s,m=t[Math.max(0,l-1)],d=t[l],u=t[l+1],y=t[Math.min(t.length-1,l+2)];o.push([0,1].map(p=>.5*(2*d[p]+(u[p]-m[p])*s+(2*m[p]-5*d[p]+4*u[p]-y[p])*f+(3*d[p]-m[p]-3*u[p]+y[p])*h)))}return o},vo=[],qe=[],Ge=(t,e,o,c,n)=>{const l=n.n||30,s=Ua(t,l),f=[w()*6.28,w()*6.28,w()*6.28],h=n.wander??1,m=s.map((v,g)=>{const _t=s[Math.max(0,g-1)],ae=s[Math.min(l,g+1)],xt=ae[0]-_t[0],U=ae[1]-_t[1],N=Math.hypot(xt,U)||1;return[-U/N,xt/N]});for(let v=0;v<=l;v++){const g=v/l,_t=h*(2.4*Math.sin(g*5.1+f[0])+1.2*Math.sin(g*13.7+f[1]));s[v][0]+=m[v][0]*_t,s[v][1]+=m[v][1]*_t}const d=n.lift??1,u=n.land??0,y=v=>(.8+.2*Math.min(1,Math.max(0,(v-u)/.06)))*(1+.22*Math.sin(v*7.3+f[2])+.1*Math.sin(v*19+f[0]))*(v>d-.24?Math.max(.3,1-Math.pow((v-d+.24)/.3,1.5)):1),p=[],L=e>2,R=[];for(let v=0;v<e;v++){const g=v-(e-1)/2,_t=d-.03*Math.abs(g)-.025*w(),ae=c*(.9+.2*w()),xt=v===0||v===e-1;if(L&&!xt)continue;let U=null;for(let N=0;N<=l;N++){const S=N/l;if(S<u-.001||S>_t){U=null;continue}const it=y(S),Nt=o*(.62+.38*Math.min(it,1))*(1+.07*Math.sin(S*9+v*2.1)),lt=ae*it*(.68+.64*w()),Eo=(xt?2.6:.9)*(Math.sin(S*31+v*1.7+f[1])+.6*Math.sin(S*71+v*2.9+f[2])),se=[s[N][0]+m[N][0]*(g*Nt+Eo),s[N][1]+m[N][1]*(g*Nt+Eo)];U&&Dt.push([U[0],U[1],se[0],se[1],(U[2]+lt)*.5,xt?1:0]),U=[se[0],se[1],lt],v===0&&(p[N]=(e-1)/2*Nt+lt,R[N]=(e-1)/2*Nt+.2*lt)}}if(L){const v=d-.015;for(let g=1;g<=l;g++)g/l>v||!R[g]||!R[g-1]||Dt.push([s[g-1][0],s[g-1][1],s[g][0],s[g][1],(R[g-1]+R[g])*.5,0])}for(let v=2;v<=l;v+=2){const g=v/l;g<u||g>d||!p[v]||!p[v-2]||vo.push([s[v-2][0],s[v-2][1],s[v][0],s[v][1],Math.max(p[v-2],p[v-1]||0,p[v])+n.bord*(.6+.8*w())])}for(let v=1;v<l;v++)if(p[v]&&v/l<d-.3){const g=m[v][1]>0?-1:1;qe.push([s[v][0]+m[v][0]*p[v]*g,s[v][1]+m[v][1]*p[v]*g,p[v]])}};if(At==="one swipe"){let t=(ct[1]-(Ot-.03))/(ct[0]-It||.001);ze>0&&ct[0]>.05&&ct[0]<.95&&ct[1]>.08||(t=(i()-.5)*.25),t=Math.max(-1.1,Math.min(1.1,t));const o=de-.03-.02*i()-(ke?.12:0),c=ke?t*.4:t,n=.02+.04*i(),l=[];for(let h=0;h<=8;h++){const m=-.08+1.16*h/8;l.push(mt(m,o+c*(m-_e)-n*4*(m-.5)*(m-.5)+n))}const s=15+5*i(),f=s*2/4;Ge(l,4,f*1.02,f*.56,{n:22,lift:.88+.08*w(),bord:3.5})}else if(At==="two fingers"){const t=-.5+i()*.5,e=Math.cos(t),o=Math.sin(t),c=[];for(let n=0;n<=8;n++){const l=-150+300*n/8;c.push([Ne[0]+e*l+o*18+4*Math.sin(n*.9),Ne[1]+o*l-e*18])}Ge(c,2,22,10.6,{land:.06+.1*w(),lift:.8+.14*w(),bord:3})}else if(At==="porthole"){const t=34+10*i(),e=Ne[0]+(i()-.5)*20,o=Ne[1]-14,c=2+Math.floor(x()*2),n=x()*6.28,l=[[e,o]];for(let s=0;s<c;s++){const f=n+s*6.28/c+x(),h=t*(.3+.15*x());l.push([e+h*Math.cos(f),o+h*Math.sin(f)]),x()}for(const[s,f]of l){const h=t*(.26+.12*w()),m=[];for(let d=0;d<=9;d++){const u=d/9*6.6+w()*.3;m.push([s+h*Math.cos(u),f+h*Math.sin(u)*.92])}Ge(m,1,0,t*(.5+.1*w()),{n:16,wander:.6,lift:1.4,bord:3})}}else if(At==="zigzag"){const t=[],e=4+Math.floor(i()*2);for(let o=0;o<=e;o++){const c=-.05+1.1*o/e;t.push(mt(c,de-.08-(ke?.08:0)+(o%2?-.17:.05)+(i()-.5)*.04))}Ge(t,2,9.5,5.2,{n:30,lift:.9+.06*w(),bord:3})}for(const t of Dt)he.push([t[0],t[1],t[2],t[3],t[4],2,0,t[5]?.9:0]);for(const t of vo)he.push([t[0],t[1],t[2],t[3],t[4],2,.42,0]);const Pa=1,G=64,ht=E/G,st=new Float32Array(G*G),Mt=new Float32Array(G*G),xo=j==="light"?.55:j==="heavy"?1:.95;st.fill(xo);const gt=4.7,I=Math.ceil(E/gt),_=I*I,B=new Float32Array(_),z=new Float32Array(_),Vt=new Float32Array(_),Wt=new Float32Array(_),M=new Float32Array(_),Xo=new Float32Array(_),Yo=new Float32Array(_),Ue=new Float32Array(_),Ho=1.44,dt=t=>Math.cbrt(Math.max(t,0)/Ho),Xt=t=>Ho*t*t*t,Ia=j==="light"?.62:j==="heavy"?1.2:1,ve=[x()*6.28,x()*6.28,x()*6.28,.015+.01*x()],Ca=(t,e)=>Math.max(.35,1+.3*Math.sin(t*ve[3]+ve[0])*Math.sin(e*ve[3]*.8+ve[1])+.2*Math.sin((t-e)*.041+ve[2]));for(let t=0;t<I;t++)for(let e=0;e<I;e++){const o=t*I+e;Vt[o]=B[o]=D+(e+.2+.6*i())*gt,Wt[o]=z[o]=k+(t+.2+.6*i())*gt,Xo[o]=1.75+.9*i()*i()+.3*i(),Yo[o]=Math.exp((i()-.5)*1.6),Ue[o]=.6+.5*i();const c=i();M[o]=Xt(Math.min(2.4,1.75*Ia*Ca(B[o],z[o])*Math.pow(c,2.6)))}const po=(t,e)=>{const o=Math.floor((t-D)/ht),c=Math.floor((e-k)/ht);return o<0||c<0||o>=G||c>=G?-1:c*G+o},Ko=(t,e,o,c,n,l)=>{const s=n-o,f=l-c,h=s*s+f*f;let m=h>1e-6?((t-o)*s+(e-c)*f)/h:0;m=m<0?0:m>1?1:m;const d=t-o-s*m,u=e-c-f*m;return Math.sqrt(d*d+u*u)},Zo=(t,e)=>1+.2*Math.sin(t*.093+e*.061)+.11*Math.sin(t*.037-e*.052+2)+.07*Math.sin(t*.21+e*.17+4),Jo=new Float32Array(_);for(let t=0;t<_;t++)Jo[t]=Zo(Vt[t],Wt[t]);const Qt=(t,e,o,c,n,l,s)=>{const f=Math.min(t,o)-n*1.9,h=Math.max(t,o)+n*1.9,m=Math.min(e,c)-n*1.9,d=Math.max(e,c)+n*1.9;let u=0;const y=Math.max(0,Math.floor((f-D)/ht)),p=Math.min(G-1,Math.floor((h-D)/ht)),L=Math.max(0,Math.floor((m-k)/ht)),R=Math.min(G-1,Math.floor((d-k)/ht));for(let U=L;U<=R;U++)for(let N=y;N<=p;N++)if(Ko(D+(N+.5)*ht,k+(U+.5)*ht,t,e,o,c)<n*.85){const it=U*G+N;u+=st[it]*ht*ht*.025,st[it]=l===2?Math.min(st[it],s):0,Mt[it]=l===1?.6:l===2?s<.05?Pa:Mt[it]:.9}const v=Math.max(0,Math.floor((f-D)/gt)-1),g=Math.min(I-1,Math.floor((h-D)/gt)+1),_t=Math.max(0,Math.floor((m-k)/gt)-1),ae=Math.min(I-1,Math.floor((d-k)/gt)+1),xt=[];for(let U=_t;U<=ae;U++)for(let N=v;N<=g;N++){const S=U*I+N,it=Ko(B[S],z[S],t,e,o,c),Nt=l===1?n:n*(B[S]===Vt[S]&&z[S]===Wt[S]?Jo[S]:Zo(B[S],z[S]));it<Nt*.92?(u+=M[S],M[S]=l===2&&s>.05?M[S]*.15*s:0,B[S]=Vt[S],z[S]=Wt[S]):l!==1&&it<Nt*1.3&&xt.push(S)}if(xt.length&&l!==1){const U=o-t,N=c-e;let S=0;const it=xt.map(lt=>{const se=((B[lt]-t)*-N+(z[lt]-e)*U)*(U>=0?1:-1)<0||Math.abs(U)<.001&&z[lt]<(e+c)/2,da=l===2?w:i,va=(se?2.2:.45)*(.15+1.85*da()*da());return S+=va,va}),Nt=u*(l===2?.8:1.8);for(let lt=0;lt<xt.length;lt++)M[xt[lt]]+=Nt*it[lt]/S}return u};for(const t of vo)Qt(t[0],t[1],t[2],t[3],t[4],2,.42);for(const t of Dt)Qt(t[0],t[1],t[2],t[3],t[4],2,0);const $o=(t,e,o,c,n)=>{const l=Math.max(2,Math.min(8,Math.round(o/14+w()*2)));let s=(w()-.5)*.3;const f=Math.min(.8,.3+.55*c),h=.03+.4*c;for(let d=0;d<l;d++){const u=e-o/l*(.6+.8*w());let y=t+s*(e-u);w()<.55&&(y+=(w()-.5)*n*1.8,s+=(w()-.5)*.35);const p=(d+.5)/l,L=n*(d===0?.4:d===1?.75:.85+.3*w()),R=f+(h-f)*p;if(he.push([t,e,y,u,L,2,R,0]),Qt(t,e,y,u,L,2,R),d>0&&w()<.85){const v=w(),g=xe(t+(y-t)*v,e+(u-e)*v);g>=0&&(M[g]=Xt(.3+.6*w()*w()+.3*p),B[g]=t+(y-t)*v+(w()-.5)*L*.7,z[g]=e+(u-e)*v)}t=y,e=u}const m=xe(t,e-1);m>=0&&(M[m]=Xt((1.4+.5*w())*(1-.2*c)),B[m]=t,z[m]=e-1)},ja=(At==="untouched"?7:4)+Math.floor(w()*3)+(j==="heavy"?1:j==="light"?-2:0);for(let t=0;t<ja;t++){const e=w();$o(D+E*(.06+.88*w()),k+E*(.25+.62*Math.sqrt(w())),E*(.08+.5*w()*(.4+.6*w())),e,(1.3+1.3*w())*(1-.35*e))}if(qe.length){const t=3+Math.floor(w()*3);for(let e=0;e<t;e++){const o=qe[Math.floor(w()*qe.length)];o[0]<D+4||o[0]>D+E-4||$o(o[0]+(w()-.5)*3,o[1]-.5,E*(.015+.13*Math.pow(w(),1.6)),.15*w(),.8+.6*w())}}for(const t of Dt)me((t[0]+t[2])*.5,(t[1]+t[3])*.5,t[4]*1.3,.5);for(let t=co;t<=no;t++)for(let e=t*T+so,o=t*T+ro;e<=o;e++)io[e*4]=Math.min(255,ao[e]*255);function xe(t,e){const o=Math.floor((t-D)/gt),c=Math.floor((e-k)/gt);return o<0||c<0||o>=I||c>=I?-1:c*I+o}const uo=()=>{for(let t=0;t<I;t++)for(let e=0;e<I;e++){const o=t*I+e,c=kt[o];if(!(c<.45||M[o]<=0))for(let n=0;n<4;n++){const l=e+(n===0?1:n===1?0:n===2?1:-1),s=t+(n===0?0:1);if(l<0||l>=I||s>=I)continue;const f=s*I+l,h=kt[f];if(M[f]<=0||h<=0)continue;const m=B[o]-B[f],d=z[o]-z[f],u=(c+h)*.95;if(m*m+d*d<u*u){const y=M[o]>=M[f]?o:f,p=y===o?f:o,L=M[o]+M[f],R=M[y]/L;if(B[y]=B[y]*R+B[p]*(1-R),z[y]=z[y]*R+z[p]*(1-R),M[y]=L,M[p]=0,B[p]=Vt[p],z[p]=Wt[p],kt[y]=dt(L),kt[p]=0,y===f)break}}}},kt=new Float32Array(_),bo=Ra(_),Oa=bo.c,Va=bo.s,Wa=bo.e;for(let t=0;t<_;t++)kt[t]=dt(M[t]);uo(),uo();const $=[],Qo=40,wo=(t,e,o,c)=>{if($.length>=Qo)return null;const n={x:t,y:e,px:t,py:e,gx:t,gy:e,V:o,wait:c,sl:(i()-.5)*.25,nextPin:2+i()*10,nextBead:2+i()*4,sp:0,seed:i()};return $.push(n),n};if(Dt.length){const t=2+Math.floor(i()*3);for(let e=0;e<t;e++){const o=Dt[Math.floor(i()*Dt.length)],c=i();let n=o[0]+(o[2]-o[0])*c,l=o[1]+(o[3]-o[1])*c;if(o[4]>30){const s=i()*3;n=o[0]+Math.cos(s)*o[4],l=o[1]+Math.sin(s)*o[4]}else l+=o[4]*1.05;n>D+5&&n<D+E-5&&l>k+10&&l<k+E&&wo(n,l,Xt(2+.4*i()),.3+2.6*i())}}{const t=(j==="light"?1:2)+Math.floor(x()*3)+(j==="heavy"?2:0);for(let e=0;e<t;e++)wo(D+E*(.08+.84*x()),k+E*(.45+.5*x()),Xt(2+.7*x()),x()*2.5)}let Rt=[0,0,-1,-1];if(Fe==="demister pad"){const t=mt(.5+(i()-.5)*.2,.5+(i()-.5)*.2),e=42+14*i(),o=30+10*i();Rt=[t[0]-e,t[1]-o,t[0]+e,t[1]+o]}const ta=5.5+2.5*i(),Xa=ta*Math.abs(1/(le*1.3)-1/ne)/1e3/He;(()=>{ce(),r.bindVertexArray(X),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),C(0,oo),r.texSubImage2D(r.TEXTURE_2D,0,0,0,T,T,Re,Ve,io),C(0,P);const t=(o,c)=>{const n=["eC","eR","eU","eF","eRm","eRm2","eL1","eL1c","eL2","eL2c","eTa","eTb","eTw","eTwc","eSt","eMr","eMw"];for(let l=0;l<n.length;l++)r.uniform4fv(o[l],Lt[n[l]]);r.uniform1i(O.eMode,c)};if(r.useProgram(ut),t(O.env,0),r.bindFramebuffer(r.FRAMEBUFFER,Da),r.viewport(0,0,512,512),r.drawArrays(r.TRIANGLES,0,3),r.bindTexture(r.TEXTURE_2D,to),r.generateMipmap(r.TEXTURE_2D),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),C(0,P),Be){const o=fe.fWall;r.useProgram(St),t(O.wall,1),r.uniform4fv(O.wall[0],[W[0],W[1],W[2],wt]),r.uniform4fv(O.wall[1],[...Y,0]),r.uniform4fv(O.wall[2],[...J,0]),r.uniform4fv(O.wall[3],[...et,0]),A.wall&&(r.uniform4fv(O.wall[7],[Lt.eL1c[0],Lt.eL1c[1],Lt.eL1c[2],0]),r.uniform4fv(O.wall[9],[A.cc[0]*A.wall[0],A.cc[1]*A.wall[0],A.cc[2]*A.wall[0],0]),r.uniform4fv(O.wall[14],[Lt.eSt[0],A.wall[1],Lt.eSt[2],Lt.eSt[3]])),r.bindFramebuffer(r.FRAMEBUFFER,o),r.viewport(0,0,a.tile?512:1024,a.tile?512:1024),r.drawArrays(r.TRIANGLES,0,3)}r.useProgram(Yt);const e=(o,c,n,l,s,f,h)=>{C(0,o),r.bindFramebuffer(r.FRAMEBUFFER,c),r.viewport(0,0,n,n),r.uniform1i(O.bM,l),r.uniform4f(O.bB,s,f,h,0),r.drawArrays(r.TRIANGLES,0,3)};e(to,ka,512,1,0,0,Xa*.3),e(jo,q.fA128,128,2,1/512,1/512,0),e(q.tA128,q.fB128,128,0,2.2/128,0,0),e(q.tB128,_a,128,0,0,2.2/128,0),e(Oo,q.fA32,32,2,1/128,1/128,0),e(q.tA32,q.fB32,32,0,1.6/32,0,0),e(q.tB32,qa,32,0,0,1.6/32,0),C(0,P)})();const H=new Float32Array(101*4),ot=new Float32Array(13*4);H.set([D,k,E,1/30],0),H.set([0,0,0,0],4),H.set([Rt[0],Rt[1],Rt[2],Rt[3]],12),H.set([Ut.kG,1.6,Q?.09:-.09,xo],16),ot.set([W[0],W[1],W[2],wt],0),ot.set([Y[0],Y[1],Y[2],He],4),ot.set([J[0],J[1],J[2],0],8),ot.set([et[0],et[1],et[2],A.ex],12),ot.set([D,k,E,ta],16),ot.set(Pt,20),ot.set([yt[0],yt[1],yt[2],b==="cool morning"?-1:A.sr],24),ot.set(Lt.eL1c,28),ot.set([$t[0],$t[1],$t[2],0],32),ot.set(Lt.eL2c,36),ot.set([ne,zt==="antique silver"?1:0,Be?1:0,.05+.04*Ut.S],40),ot.set([.93,.935,.94,A.grade],44);const Ya=A.amb*.45,yo=A.fog||A.cc.map(t=>t*Ya);ot.set([yo[0],yo[1],yo[2],j==="light"?1:j==="heavy"?-1:0],48);const ea=t=>{const e=Math.min(t.length,48);for(let o=0;o<e;o++){const c=t[o],n=20+o*8;for(let l=0;l<8;l++)H[n+l]=c[l]}H[6]=e},oa=()=>{r.bindBuffer(r.UNIFORM_BUFFER,Kt),r.bufferSubData(r.UNIFORM_BUFFER,0,H),r.bindBufferBase(r.UNIFORM_BUFFER,0,Kt),r.useProgram(we),r.bindVertexArray(X),C(0,P),C(1,De),C(2,oo),r.bindFramebuffer(r.FRAMEBUFFER,eo),r.viewport(0,0,Co,Co),r.drawArrays(r.TRIANGLES,0,3);let t=De;De=Vo,Vo=t,t=Wo,Wo=eo,eo=t};(()=>{for(let t=0;t<Math.max(he.length,1);t+=48)ea(he.slice(t,t+48)),H[4]=Ut.S,H[7]=t?0:1,H[3]=0,oa();H[7]=0,H[6]=0,H[3]=1/30})();const te=1/30;let Pe=0,pe=0,nt=null,aa=0,ee=0,Mo=0,go=0,Ro=0,sa=1;const oe=[],K=new Float32Array(Z*8);let vt=[0,0,0,0];const Fo=95+30*i(),ra=50+15*i(),ca=(t,e,o)=>{const c=Math.min(1,Math.max(0,(o-t)/(e-t)));return c*c*(3-2*c)},na=t=>{const e=t%Fo,o=1-.88*(ca(ra,ra+8,e)-ca(Fo-10,Fo,e));return Ut.S*o*(.85+.12*Math.sin(t*.071+1.3)+.08*Math.sin(t*.23+.4))};for(let t=0;t<_;t++)kt[t]=dt(M[t]);const ia=new Float32Array(_).fill(NaN),la=new Float64Array(_),fa=new Float32Array(_).fill(NaN),ma=new Float32Array(_).fill(NaN),ha=new Int32Array(_),Ha=(t,e)=>{for(let o=0;o<G;o++){const c=t*(.7+.45*(o+.5)/G),n=c*.95-.3,l=o*G,s=l+G,f=e*.09;if(n>0){const h=e*Ut.kG*n*1.45;for(let m=l;m<s;m++){const d=Mt[m],u=st[m],y=d<.03?1:d>.28?0:1-(d-.03)/.25;st[m]=Math.min(1,u+h*y*(1-.779*u/xo)),Mt[m]=Math.max(0,d-f)}}else{const h=e*.5*n*(.4+.9*(o+.5)/G);for(let m=l;m<s;m++){const d=st[m];st[m]=Math.max(0,d+h*(1.3-d)),Mt[m]=Math.max(0,Mt[m]-f)}}}},Ka=t=>{for(let e=0;e<_;e++)M[e]>0&&(M[e]=Math.max(0,M[e]*(1-t*.015)-t*.006))},Za=t=>{for(let e=0;e<_;e++){const o=B[e],c=z[e];let n;if(o===fa[e]&&c===ma[e]?n=ha[e]:(n=po(o,c),fa[e]=o,ma[e]=c,ha[e]=n),n<0)continue;if(M[e]<=0&&st[n]<Ue[e]){kt[e]=0;continue}const l=st[n],s=M[e];let f;s===ia[e]?f=la[e]:(f=dt(s),ia[e]=s,la[e]=f),l>=Ue[e]&&(M[e]=s+t*Yo[e]*(.25+f)*(l-Ue[e]+.1)),kt[e]=f,f>Xo[e]&&wo(B[e],z[e],M[e],0)&&(M[e]=0,B[e]=Vt[e],z[e]=Wt[e],a.sound.hit("blip",.03,{freq:1500+600*i()}))}},Ja=()=>{const t=te;for(let e=$.length-1;e>=0;e--){const o=$[e];let c=dt(o.V);if(o.wait>0){o.wait-=t;continue}if(c<1.25){const p=xe(o.x,o.y);p>=0&&(M[p]+=o.V,B[p]=o.x,z[p]=o.y),$.splice(e,1);continue}const n=po(o.x,o.y),l=n>=0?Mt[n]:0;let s=Math.min(45,5+22*(c-1.3))*(1+.6*Math.min(l*2,1));o.sp+=(s-o.sp)*.25;let f=o.sp*t;if(o.nextPin-=f,o.nextPin<0){o.nextPin=1+i()*8;const p=i()*1.1*Math.pow(2.1/c,3);p>.08&&(o.wait=Math.min(p,2.5),o.sp=0)}o.sl+=(i()-.5)*.08*f,o.sl*=.985;let h=0;if(n>=0){const p=n%G,L=p>0?Mt[n-1]:0;h=((p<G-1?Mt[n+1]:0)-L)*.6}const m=(o.sl+h)*f;o.x+=m,o.y-=f;const d=po(o.x,o.y);d>=0&&(o.V+=.02*st[d]*2*c*f);const u=Math.floor((o.x-D)/gt),y=Math.floor((o.y-k)/gt);for(let p=y-1;p<=y+1;p++)for(let L=u-1;L<=u+1;L++){if(L<0||p<0||L>=I||p>=I)continue;const R=p*I+L;M[R]<=0||Math.hypot(B[R]-o.x,z[R]-o.y)<c+dt(M[R])&&(o.V+=M[R],M[R]=0,B[R]=Vt[R],z[R]=Wt[R])}if(o.nextBead-=f,o.nextBead<0){o.nextBead=2+i()*6;const p=o.x+(i()-.5)*c*.8,L=o.y+c*1.6+i()*2,R=xe(p,L);if(R>=0&&M[R]<=0){const v=Xt(.25+.45*i()*i());M[R]=v,B[R]=p,z[R]=L,o.V-=v}}if(o.V>21&&(o.V=21),c=dt(o.V),d>=0&&(st[d]=0,Mt[d]=Math.max(Mt[d],.6)),o.y<k-6){$.splice(e,1);continue}}},$a=(t,e,o)=>{const c=na(t);if(Ha(c,e),vt[3]>0){for(let s=0;s<G;s++)for(let f=0;f<G;f++)Math.hypot(D+(f+.5)*ht-vt[0],k+(s+.5)*ht-vt[1])<vt[2]&&(st[s*G+f]=Math.max(0,st[s*G+f]-e*1.6*vt[3]));for(let s=0;s<_;s++)M[s]>0&&Math.hypot(B[s]-vt[0],z[s]-vt[1])<vt[2]*.8&&(M[s]*=1-e*.9*vt[3])}if(Rt[2]>Rt[0]){for(let s=0;s<_;s++)if(M[s]>0){const f=Math.min(B[s]-Rt[0],Rt[2]-B[s],z[s]-Rt[1],Rt[3]-z[s])+6;f>0&&(M[s]*=1-e*.3*Math.min(f/22,1))}}const n=.06*c*Ut.drip,l=e*n;c<.32&&Ka(e),Za(l),sa++,sa%3===0&&uo();for(let s=0;s<o;s++)Ja();for(let s=0;s<$.length;s++)for(let f=s+1;f<$.length;f++){const h=$[s],m=$[f];if(Math.hypot(h.x-m.x,h.y-m.y)<(dt(h.V)+dt(m.V))*.8){const d=h.y<m.y?h:m,u=d===h?m:h;d.V+=u.V,u.V=0,u.wait=0}}for(let s=$.length-1;s>=0;s--)$[s].V<=0&&$.splice(s,1)},Qa=()=>{let t=0;for(let e=0;e<_&&t<Z-Qo;e++){const o=kt[e];if(o<.3||M[e]<=0)continue;const c=t*8;K[c]=B[e],K[c+1]=z[e],K[c+2]=o,K[c+3]=Wa[e],K[c+4]=Oa[e],K[c+5]=Va[e],K[c+6]=0,K[c+7]=1,t++}return t},ue=8.5,Ao=(t,e)=>{e=Math.min(Math.max(e||0,0),.1);const o=a.input;oe.length=0;const c=o.taps?o.taps():[];for(const s of c){const f=mt(s.x,1-s.y),h=f[0]+3.5,m=f[1]-2.5;oe.push([f[0],f[1],h,m,6.2,0,.5,0]),Qt(f[0],f[1],h,m,6.2,0,0),a.sound.hit("click",.12)}if(o.down&&o.inside){const s=mt(o.x,1-o.y);nt||(nt=s,aa=0,ee=0,Mo=0,oe.push([s[0],s[1],s[0]+.01,s[1],ue,0,.5,0]),Qt(s[0],s[1],s[0]+.01,s[1],ue,0,0));const f=Math.hypot(s[0]-nt[0],s[1]-nt[1]);if(aa+=e,f>.4){oe.push([nt[0],nt[1],s[0],s[1],ue,0,.5,0]),Qt(nt[0],nt[1],s[0],s[1],ue,0,0),Mo+=f,ee=0;const h=f/Math.max(e,.016);go+=e*Math.min(h/60,14),go>1&&(go=0,a.sound.note(88+Math.floor(i()*7),{dur:.045+.04*i(),vel:Math.min(.2,.04+h/1500),wave:"triangle",pan:o.x*2-1})),nt=s}else ee+=e;vt=ee>.35?[s[0],s[1],4.5+Math.min(ee-.35,5)*.8,Math.min((ee-.35)*.7,1)]:[0,0,0,0]}else{if(nt&&Mo>3){const s=xe(nt[0],nt[1]-ue*1.1);s>=0&&(M[s]+=Xt(1.4+.6*i()))}nt=null,vt=[0,0,0,0]}Pe+=e;let n=0;for(const s of $)s.gx=s.x,s.gy=s.y;for(;Pe>=te&&n<3;)Pe-=te,n++;n===3&&(Pe=0),n&&($a(pe,n*te,n),pe+=n*te);for(const s of $)(s.gx!==s.x||s.gy!==s.y)&&oe.push([s.gx,s.gy,s.x,s.y+dt(s.V)*.3,Math.min(dt(s.V)*.92,2.1),1,.6,0]);if(a.sound.on&&t>Ro-.3){const f=new Float32Array(4e3);let h=0,m=0;for(let d=0;d<4e3;d++){const u=i()*2-1;h=h*.9+u*.1,m=m*.995+u*.005,f[d]=(h*.5+m*3)*.07*Ut.S*Math.min(1,Math.min(d,4e3-d)/200)}a.sound.pcm(f,8e3),Ro=Math.max(Ro,t)+.5}ce(),H[4]=na(pe),H[5]=pe,H.set(vt,8),n&&(ea(oe),H[3]=n*te,oa());let l=Qa();for(const s of $){const f=dt(s.V),h=l*8,m=s.wait>0?0:Math.min(s.sp/40,1),d=s.sl,u=Math.hypot(d,1);K[h]=s.x,K[h+1]=s.y,K[h+2]=f,K[h+3]=1+.12*m,K[h+4]=d/u,K[h+5]=-1/u,K[h+6]=.25+.45*m,K[h+7]=1.05,l++}r.bindFramebuffer(r.FRAMEBUFFER,Oe),r.viewport(0,0,Me,Me),r.clearColor(.5,.5,0,0),r.clearDepth(1),r.depthMask(!0),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),l&&(r.enable(r.DEPTH_TEST),r.depthFunc(r.LESS),r.useProgram(Ht),r.uniform4f(O.dM,D,k,E,0),r.bindVertexArray(tt),r.bindBuffer(r.ARRAY_BUFFER,at),r.bufferSubData(r.ARRAY_BUFFER,0,K,0,l*8),r.drawArraysInstanced(r.TRIANGLE_STRIP,0,4,l),r.disable(r.DEPTH_TEST)),r.depthMask(!1),ot[11]=pe,r.bindBuffer(r.UNIFORM_BUFFER,ye),r.bufferSubData(r.UNIFORM_BUFFER,0,ot),r.bindBufferBase(r.UNIFORM_BUFFER,1,ye),r.flush(),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,pt,pt),r.useProgram(Tt),r.bindVertexArray(X),C(0,P),C(1,De),C(2,ge),C(3,to),C(4,jo),C(5,Oo),C(6,Na),C(7,Ga),C(8,oo),r.drawArrays(r.TRIANGLES,0,3),r.bindVertexArray(null)};return Ao(0,0),Qe.fr&&Qe.fr.register(Ao,()=>fe),Ao}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
