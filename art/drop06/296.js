// Hundred Compasses: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/296.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Nt){Nt&&function(){"use strict";const Pt=new WeakMap,kt=4,ye=512,da=0,j=`#version 300 es
precision highp float;
precision highp int;
layout(std140) uniform S {
  mat4 uVP; vec4 uEye; vec4 uFwd; vec4 uRt; vec4 uUp;
  vec4 uL; vec4 uLu; vec4 uLv; vec4 uGr; vec4 uLc; vec4 uKey; vec4 uAmb; vec4 uFlr;
  vec4 uCoc; vec4 uLay; vec4 uMat; vec4 uBrs;
  vec4 uPos[100];
};
layout(std140) uniform D {
  vec4 uMp; vec4 uMa; vec4 uMb; vec4 uMr; vec4 uTm; vec4 uTa; vec4 uTb;
};
const float ZC=.33, ZN=.415, ZG=.555, HT=.625, RI=.85, PI=3.14159265;
`,Pe=`
uniform sampler2D uN;
vec3 env(vec3 d, float r){
  float u=clamp(d.z*.5+.5,0.,1.);
  vec3 c=mix(uFlr.rgb,uAmb.rgb,smoothstep(.42,.8,u));
  vec2 g=d.xy/(abs(d.z)+.45);
  float rm=textureLod(uN,g*.021+.3,2.+r*3.).r;
  float rb=textureLod(uN,vec2(g.x*.05,.37),1.+r*3.).g;
  c*=.45+1.1*rm*(.5+rb);
  float t=dot(d,uL.xyz);
  if(t>.03){
    vec2 q=vec2(dot(d,uLu.xyz),dot(d,uLv.xyz))/t;
    vec2 h=vec2(uLu.w,uLv.w);
    float e=.012+r*.9;
    vec3 add;
    if(uGr.w<.5){
      vec2 a=abs(q)-h;
      float box=smoothstep(e,-e,a.x)*smoothstep(e,-e,a.y);
      vec2 w=(q/h*.5+.5)*uGr.xy;
      vec2 f=abs(fract(w)-.5);
      vec2 bw=uGr.z*uGr.xy/h+e*uGr.xy/h*.5;
      float bar=(1.-smoothstep(.5-bw.x,.5-bw.x*.45,f.x))*(1.-smoothstep(.5-bw.y,.5-bw.y*.45,f.y));
      float sky=.72+.42*q.y/h.y;
      float tree=smoothstep(.1,.62,textureLod(uN,q*.045+.11,1.).b+.32*(-q.y/h.y)+.02);
      add=uLc.rgb*box*mix(bar,1.,clamp(r*2.2,0.,.9))*sky*mix(1.,.34,tree);
      add+=uLc.rgb*.016/(1.+dot(q/h,q/h)*.7);
    } else {
      float l=length(q)/h.x;
      add=uLc.rgb*(smoothstep(1.+e*3.,1.-e*3.,l)+.018/(1.+l*l*.4));
    }
    c+=add+uLc.rgb*.05*t*t*t;
  }
  return c;
}
void nb(vec3 p, vec3 r, float rough, int self, out float sh, out float ao, out vec4 hit){
  sh=1.; ao=1.; hit=vec4(0.);
  vec2 g=vec2(uLay.x*p.x+uLay.y*p.y,-uLay.y*p.x+uLay.x*p.y)/uLay.z;
  float gy=floor(g.y/uLay.w+4.5);
  float gx=floor(g.x+4.5);
  float best=1e3;
  for(int i=0;i<16;i++){
    int ix=int(gx)+(i&3)-1, iy=int(gy)+(i>>2)-1;
    int id=ix+iy*10;
    if(ix>=0&&ix<10&&iy>=0&&iy<10&&id!=self){
      vec2 c=uPos[id].xy, dp=c-p.xy;
      float h=max(HT-p.z,0.);
      vec2 sv=uL.xy/max(uL.z,.05)*h;
      float tt=clamp(dot(dp,sv)/max(dot(sv,sv),1e-4),0.,1.);
      float dd=length(dp-sv*tt)-1.01;
      float w=.015+tt*h*uL.w;
      sh*=smoothstep(-w,w,dd);
      float d0=max(length(dp)-1.,0.);
      ao*=1.-.42*exp(-d0*2.4)*max(1.-p.z*1.2,0.)-.3*exp(-d0*16.)*max(1.-p.z*3.,0.);
      vec2 o=-dp;
      float A=max(dot(r.xy,r.xy),1e-5),B=dot(o,r.xy),C=dot(o,o)-1.,Q=B*B-A*C;
      if(Q>-.25&&B<0.&&r.z>0.){
        float t=(-B-sqrt(max(Q,0.)))/A;
        float z=p.z+r.z*t;
        float sf=.015+rough*t*.75;
        float cov=smoothstep(-sf,sf,Q/max(A,.01))*smoothstep(HT+sf,HT-sf,z);
        if(cov>0.&&t<best){
          best=t;
          vec3 n=vec3(o+r.xy*t,0.);
          hit=vec4(clamp(dot(n,uL.xyz),0.,1.),z,t,cov);
        }
      }
    }
  }
}
vec3 fbmc(vec2 p){
  return texture(uN,p*.0039).rgb*.5+texture(uN,p*.0091+.37).gbr*.3+texture(uN,p*.0213+.71).brg*.2;
}
`,pa=j+`
out vec3 vP;
void main(){
  vec2 q=vec2((gl_VertexID&1)*2-1,(gl_VertexID&2)-1);
  vec3 p=vec3(q*vec2(160.,160.)+vec2(0.,100.),0.);
  vP=p; gl_Position=uVP*vec4(p,1.);
}`,xa=j+Pe+`
in vec3 vP; out vec4 o;
void main(){
  vec3 V=normalize(vP-uEye.xyz);
  vec2 p=vP.xy;
  int k=int(uMat.x+.5);
  vec3 alb, F0=vec3(.04); float rough; vec3 nn=vec3(0.,0.,1.);
  vec3 a=fbmc(p*14.), b=fbmc(p*3.3+7.), m=fbmc(p*.9+31.);
  vec3 h=texture(uN,p*.19).rgb, h2=texture(uN,p*.47+.2).rgb;
  float gloss=1.;
  if(k==0){
    // soapstone bench: talc veins, chalk smears, old scratches
    float vein=1.-abs(fbmc(p*.62+vec2(m.r*9.,m.g*7.)).r*2.-1.);
    vein=smoothstep(.93,.995,vein)*smoothstep(.3,.6,b.g);
    float cloud=fbmc(p*.45+21.).g;
    // grey-green, even in tone (no damp blotches), paler and waxier where hands have worn the middle
    float worn=exp(-dot(p,p)*.0035);
    alb=vec3(.044,.05,.047)*(.8+.28*b.r+.22*cloud)*(1.+.3*worn)+vec3(.15,.155,.15)*vein*.4;
    float chalk=smoothstep(.54,.75,fbmc(p*vec2(1.1,3.1)+3.).b)*smoothstep(.35,.6,a.g);
    alb+=vec3(.15,.155,.15)*chalk*.42;
    float sc=smoothstep(.985,1.,1.-abs(texture(uN,vec2(p.x*.005+p.y*.11,p.y*.005-p.x*.012)).r*2.-1.));
    alb+=vec3(.045)*sc*smoothstep(.45,.6,b.g);
    rough=.27+.3*m.b+.2*chalk-.08*worn; gloss=1.-.75*chalk;
    nn.xy+=(h.rg-.5)*.03+(h2.rg-.5)*.03;
  } else if(k==1){
    // waxed oak, grain along the plank
    float pl=floor(p.y/9.+.3);
    vec2 w=vec2(p.x*.5+pl*37.,p.y*7.+m.r*3.);
    float g=fbmc(w*1.2).r; float ring=.5+.5*sin(w.y*.9+g*14.+pl);
    float pore=smoothstep(.62,.8,texture(uN,vec2(p.x*.012+pl*.3,p.y*.31)).g)*(.4+.6*ring);
    alb=mix(vec3(.17,.075,.028),vec3(.33,.175,.07),ring*.55+g*.45)*(1.-pore*.55);
    alb*=.8+.28*fract(pl*.618)-.35*smoothstep(.09,.0,abs(fract(p.y/9.+.3)-.0));
    rough=.24+.18*g; nn.xy+=vec2(0.,(pore-.3)*.05)+(h.rg-.5)*.014;
  } else if(k==2){
    // billiard baize: fibres, a slight nap, chalk dust
    vec3 f=texture(uN,p*vec2(.9,1.3)).rgb, f2=texture(uN,p*vec2(1.9,1.5)+.1).rgb;
    alb=vec3(.022,.115,.075)*(.62+.8*f.r*f2.g+.3*m.g);
    alb+=vec3(.05,.07,.06)*smoothstep(.66,.8,fbmc(p*1.4+9.).r);
    rough=.96; gloss=.25; nn.xy+=(f.rg-.5)*.42+(f2.gb-.5)*.3;
  } else if(k==3){
    // zinc bench top: mottled, dull, beaten
    float mot=fbmc(p*1.1+5.).r;
    alb=vec3(.1,.105,.11)*(.8+.6*mot);
    F0=vec3(.42,.44,.46)*(.72+.5*mot+.2*a.r);
    float wip=smoothstep(.45,.6,fbmc(p*vec2(.8,6.)+3.).g);
    rough=.3+.2*wip+.18*m.r; nn.xy+=(m.gb-.5)*.05+(h.rg-.5)*.016;
  } else {
    // black plate glass
    alb=vec3(.006); F0=vec3(.07); rough=.015+.05*smoothstep(.55,.72,m.b);
    nn.xy+=(m.rg-.5)*.0025;
  }
  vec3 N=normalize(nn);
  vec3 R=reflect(V,N);
  float sh,ao; vec4 hit;
  nb(vP,R,rough,-1,sh,ao,hit);
  float back=smoothstep(uLay.z*5.6,uLay.z*5.6+.5,dot(p,vec2(-uLay.y,uLay.x)));
  float fall=exp(dot(p,normalize(uL.xy))*uBrs.w);
  float nl=max(dot(N,uL.xyz),0.);
  vec3 col=alb*(uKey.rgb*nl*sh*fall+uAmb.rgb*.9*ao+uFlr.rgb*.1);
  float nv=max(-dot(N,V),0.);
  vec3 F=F0+(1.-F0)*pow(1.-nv,5.)*gloss*(1.-rough)*(1.-rough);
  vec3 s=env(R,rough);
  vec3 brass=uBrs.rgb*(.05+hit.x*sh*uKey.rgb*.75)*mix(.6,1.1,clamp(hit.y/HT,0.,1.));
  s=mix(s*mix(.45+.55*sh,1.,.2),brass,hit.w*exp(-hit.z*rough*.45)*.92);
  col+=s*F*gloss*mix(.5,1.,ao)*(.35+.65*fall);
  // past the far edge of the bench the room falls away
  vec3 room=uAmb.rgb*.17*(.5+.9*m.g)*vec3(1.05,1.,.9)+uLc.rgb*(uGr.w>1.5?.0009:.0065)*(.35+.65*b.r)*smoothstep(28.,-26.,dot(p,normalize(vec2(-uL.x,0.))+vec2(.001,0.)));
  col=mix(col,room,back);
  float d=dot(vP-uEye.xyz,uFwd.xyz);
  float coc=clamp(uCoc.x*(d-uCoc.y)/d,-1.,1.);
  o=vec4(sqrt(col/(1.+col)),uCoc.x>0.?coc*.5+.5:clamp(vP.z/HT,0.,1.));
}`,It=j+`
layout(location=0) in vec3 aP; layout(location=1) in vec3 aN; layout(location=2) in vec2 aZ;
out vec3 vP; out vec3 vL; out vec3 vW; out vec2 vZ; flat out vec2 vS; flat out int vI;
void main(){
  vec4 q=uPos[gl_InstanceID];
  float c=cos(q.z), s=sin(q.z);
  vec3 lp=aP, ln=aN;
  if(aZ.x>5.5){
    // the bow: about a third stand up on the stem, leaning one way or the other; the rest lie swung aside
    float bs=fract(q.w*23.17), bt=fract(q.w*7.31);
    vec3 d=lp-vec3(1.05,0.,.213);
    float up=bs<.36?1.95+.4*bt:.1*bt, cu=cos(up), su=sin(up);
    d=vec3(d.x*cu-d.z*su,d.y,d.x*su+d.z*cu); ln=vec3(ln.x*cu-ln.z*su,ln.y,ln.x*su+ln.z*cu);
    float sd=bs<.36?(bt-.5)*1.2:(fract(q.w*3.7)-.5)*1.5, cd=cos(sd), sn=sin(sd);
    if(bs<.36){ d=vec3(d.x,d.y*cd-d.z*sn,d.y*sn+d.z*cd); ln=vec3(ln.x,ln.y*cd-ln.z*sn,ln.y*sn+ln.z*cd); }
    else { d=vec3(d.x*cd-d.y*sn,d.x*sn+d.y*cd,d.z); ln=vec3(ln.x*cd-ln.y*sn,ln.x*sn+ln.y*cd,ln.z); }
    lp=vec3(1.05,0.,.213)+d;
  }
  vec3 w=vec3(q.x+c*lp.x-s*lp.y,q.y+s*lp.x+c*lp.y,lp.z);
  vP=w; vL=lp; vW=vec3(c*ln.x-s*ln.y,s*ln.x+c*ln.y,ln.z);
  vZ=aZ; vS=vec2(q.w,q.z); vI=gl_InstanceID;
  gl_Position=uVP*vec4(w,1.);
}`,ba=j+Pe+`
uniform sampler2D uT;
in vec3 vP; in vec3 vL; in vec3 vW; in vec2 vZ; flat in vec2 vS; flat in int vI; out vec4 o;
void main(){
  vec3 V=normalize(vP-uEye.xyz);
  vec3 N=normalize(vW);
  vec3 l=vL; float r=length(l.xy), ang=atan(l.y,l.x);
  int z=int(vZ.x+.5);
  float seed=vS.x;
  vec3 col; float rough=.3;
  vec2 pn=l.xy+seed*61.;
  vec3 n1=fbmc(pn*5.), n2=fbmc(pn*19.+3.), hf=texture(uN,pn*.31+vec2(ang*.03,l.z*.2)).rgb;
  vec2 fd=vec2(cos(ang),sin(ang));
  float fall=exp(dot(vP.xy,normalize(uL.xy))*uBrs.w);
  float k=uMat.y, cs=1., cao=1., tar=0., cr=0.;
  vec3 paper=vec3(0.), F0=vec3(0.); float gN=0.;
  if(z==4){
    // the card: paper or metal, ring of ticks, no words
    float rr=r/RI;
    float fw=max(length(vec2(dFdx(rr),dFdy(rr))),.0012);
    float aa=ang+.0;
    float tk=abs(fract(aa/(2.*PI)*72.+.5)-.5)/72.*2.*PI*rr;
    float tm=abs(fract(aa/(2.*PI)*8.+.5)-.5)/8.*2.*PI*rr;
    float ink=smoothstep(.0052+fw,.0052-fw,tk)*smoothstep(.815-fw,.815+fw,rr)*smoothstep(.915+fw,.915-fw,rr);
    ink=max(ink,smoothstep(.012+fw,.012-fw,tm)*smoothstep(.73-fw,.73+fw,rr)*smoothstep(.915+fw,.915-fw,rr));
    ink=max(ink,smoothstep(.0045+fw,.0045-fw,abs(rr-.925)));
    ink=max(ink,smoothstep(.0035+fw,.0035-fw,abs(rr-.802)));
    float ink2=0.;
    if(k>.5&&k<1.5){
      // an eight-point rose, half of each point inked
      float a0=mod(aa+PI/8.,PI/4.)-PI/8.;
      float idx=mod(floor((aa+PI/8.)/(PI/4.))+8.,2.);
      float tip=idx<.5?.53:.36;
      vec2 pp=rr*vec2(cos(a0),abs(sin(a0)));
      vec2 w0=.145*vec2(cos(PI/8.),sin(PI/8.));
      vec2 e=normalize(vec2(tip,0.)-w0);
      float de=(pp.x-w0.x)*e.y+(pp.y-w0.y)*e.x;
      float inside=smoothstep(fw,-fw,de)*smoothstep(tip+fw,tip-fw,pp.x);
      ink2=inside*(a0>0.?.5:.08);
      ink=max(ink,smoothstep(.0035+fw,.0035-fw,abs(de))*smoothstep(tip+fw,tip-fw,pp.x)*.7);
      ink=max(ink,smoothstep(.003+fw,.003-fw,abs(rr-.26))*.55);
    }
    // N, E, S and W in serif capitals inside the ring, each upright to a reader at the rim
    {
      float qa=mod(aa+PI/4.,PI/2.)-PI/4., qi=mod(floor((aa+PI/4.)/(PI/2.))+4.,4.);
      float gh=k>.5&&k<1.5?.16:.2, gc=k>.5&&k<1.5?.625:.6;
      vec2 gq=vec2(-sin(qa)*rr/gh+.5,(cos(qa)*rr-gc)/gh+.5);
      float gin=step(0.,gq.x)*step(gq.x,1.)*step(0.,gq.y)*step(gq.y,1.);
      float gv=texture(uT,vec2((qi+clamp(gq.x,.01,.99))*.25,gq.y)).r*gin;
      ink=max(ink,gv*(qi<.5?0.:1.));
      gN=gv*(qi<.5?1.:0.);
    }
    float nw=.04*(rr-.74)/.19;
    float north=smoothstep(nw+fw,nw-fw,abs(aa)*rr)*smoothstep(.74,.745,rr)*smoothstep(.93,.925,rr);
    if(k<1.5){
      paper=mix(vec3(.6,.54,.41),vec3(.44,.36,.24),smoothstep(.45,.75,n1.r));
      paper*=.92+.14*n2.g+.1*(hf.r-.5);
      float fox=smoothstep(.72,.8,fbmc(pn*9.+9.).b);
      paper=mix(paper,vec3(.42,.28,.14),fox*.45);
      paper=mix(paper,vec3(.1,.075,.055),clamp(ink+ink2,0.,1.));
      paper=mix(paper,vec3(.42,.05,.04),max(north*.8,gN));
      rough=.8;
    } else if(k<2.5){
      paper=mix(vec3(.33,.33,.31),vec3(.22,.21,.19),n1.g)*(.9+.2*hf.g);
      paper=mix(paper,vec3(.015),clamp(max(ink,gN),0.,1.));
      rough=.42;
    } else {
      paper=vec3(.018,.018,.02)*(.8+.5*n2.r);
      paper=mix(paper,vec3(.62,.57,.42),clamp(max(ink,gN),0.,1.));
      rough=.5;
    }
    // shadow of the wall on the card: follow the sun up to the rim
    vec2 up=l.xy;
    
    vec2 lw=vec2(cos(vS.y)*uL.x+sin(vS.y)*uL.y,-sin(vS.y)*uL.x+cos(vS.y)*uL.y)/max(uL.z,.05);
    vec2 rim=up+lw*(HT-ZC);
    float pen=.012+uL.w*.3;
    cs=smoothstep(RI+.04+pen,RI+.04-pen,length(rim));
    cao=1.-.42*exp(-(RI-r)*7.);
    N=normalize(N+vec3((hf.rg-.5)*.03,0.));
  } else {
    // brass: warm, spun on top, reeded edge, tarnish in the corners
    float t=smoothstep(.34,.7,n1.g+.15*(n2.b-.5))*.85;
    cr=1.-vZ.y;
    tar=clamp(t*.42+cr*.8+(seed-.5)*.24,0.,1.);
    // about one case in ten is not like the rest: nickel silver, or an older, browner casting
    float vk=fract(seed*13.71);
    vec3 bc=vk<.055?vec3(.46,.46,.44):(vk<.13?uBrs.rgb*vec3(.8,.6,.42):uBrs.rgb);
    tar=vk<.055?tar*.5:(vk<.13?min(tar+.22,1.):tar);
    F0=mix(bc,bc*vec3(.34,.27,.2),tar);
    rough=mix(.19,.56,tar)+.1*n2.r;
    vec3 tn=vec3(0.);
    if(z==1){
      // spun rings on the bezel
      float g=texture(uN,vec2(r*7.,seed+ang*.003)).r-.5;
      float g2=texture(uN,vec2(r*23.,seed*3.+ang*.004)).g-.5;
      tn+=vec3(fd,0.)*(g*.07+g2*.075);
      rough=mix(rough,rough+.05,.5);
    } else if(z==2){
      // coin edge
      float a=ang*36.;
      float aw=fwidth(ang)*36.;
      float ramp=clamp(1.25-aw*2.6,0.,1.);
      float s=sin(a)*ramp, w=sin(l.z*2.+seed*9.)*.04;
      tn+=vec3(-fd.y,fd.x,0.)*(cos(a)*.34*ramp)+vec3(fd,0.)*(s*.05+w);
      F0*=.82+.18*(s*.5+.5);
    } else if(z==3){
      // dull inner wall, painted lamp black at the bottom
      F0*=.13; rough=.7; hf=vec3(.5);
    } else {
      tn+=vec3(0.,0.,(texture(uN,vec2(ang*.3+seed,l.z*.9)).r-.5)*.22);
    }
    tn+=vec3((hf.rg-.5)*.055,(hf.b-.5)*.05);
    float dent=smoothstep(.72,.8,fbmc(pn*2.+seed*9.).r);
    tn+=vec3(fd,0.)*dent*.03;
    N=normalize(N+tn);
  }
  vec3 R=reflect(V,N);
  float sh,ao; vec4 hit;
  nb(vP,R,rough,vI,sh,ao,hit);
  float nv=max(-dot(N,V),0.);
  vec3 s=env(R,rough);
  if(z==4){
    col=paper*(uKey.rgb*max(N.z*uL.z,.0)*1.35*cs*sh*fall+uAmb.rgb*1.1*cao+uBrs.rgb*.05*cao);
    if(k>1.5&&k<2.5) col+=paper*s*.34*cs;
    else col+=s*(.03+.5*pow(1.-nv,5.))*(k>2.5?1.:.3)*cs;
    // spirit tints what it fills
    if(uEye.w>.5) col*=vec3(1.,.93,.74);
  } else {
    vec3 F=F0+(1.-F0)*pow(1.-nv,5.);
    float slat=.6+.4*sh;
    vec3 br=uBrs.rgb*(.04+hit.x*sh*uKey.rgb*.5);
    s=mix(s*slat,br,hit.w*.92);
    float occ=vZ.y*mix(.6,1.,ao);
    col=s*F*occ;
    vec3 dif=mix(vec3(.11,.075,.035),vec3(.05,.042,.03),tar);
    col+=dif*(uKey.rgb*max(dot(N,uL.xyz),0.)*sh*fall+uAmb.rgb*.8)*occ;
    // verdigris in the crevices
    float vg=z==3?0.:smoothstep(.56,.72,n2.g+cr*.5-.26)*step(.001,cr)*smoothstep(.2,.8,cr);
    col=mix(col,vec3(.08,.16,.12)*(uKey.rgb*.5*sh*max(dot(N,uL.xyz),0.)+uAmb.rgb*.8+.05),vg*.55);
  }
  float d=dot(vP-uEye.xyz,uFwd.xyz);
  float coc=clamp(uCoc.x*(d-uCoc.y)/d,-1.,1.);
  o=vec4(sqrt(col/(1.+col)),uCoc.x>0.?coc*.5+.5:clamp(vP.z/HT,0.,1.));
}`,ya=j+Pe+`
in vec3 vP; in vec3 vL; in vec3 vW; in vec2 vZ; flat in vec2 vS; flat in int vI; out vec4 o;
void main(){
  vec3 V=normalize(vP-uEye.xyz);
  float seed=vS.x; vec2 l=vL.xy; float r=length(l)/RI;
  vec2 ti=vec2(cos(seed*91.),sin(seed*53.))*.012;
  vec2 lw=vec2(cos(vS.y)*l.x-sin(vS.y)*l.y,sin(vS.y)*l.x+cos(vS.y)*l.y);
  vec3 N=normalize(vec3(ti+lw*(.1+.55*r*r*r),1.));
  vec2 pn=l*1.3+seed*47.;
  vec3 sm=fbmc(pn*2.);
  // a thumb left a whorl on some of them
  vec2 fc=l-vec2(cos(seed*31.),sin(seed*17.))*.35;
  float fp=smoothstep(.62,.25,length(fc*vec2(1.,1.35)))*step(.55,fract(seed*7.3));
  float whorl=.5+.5*sin(length(fc*vec2(1.,1.35))*150.+atan(fc.y,fc.x)*2.+sm.r*12.);
  float smear=smoothstep(.46,.7,sm.g)*.55+fp*whorl*.6;
  vec3 R=reflect(V,N);
  float nv=max(-dot(N,V),0.);
  float F=.042+.958*pow(1.-nv,5.);
  vec3 c=env(R,.002+smear*.05)*F*.85;
  c+=(uAmb.rgb*1.2+uLc.rgb*.02)*F*smear;
  // dust lies on the glass and catches the light
  float sp=texture(uN,pn*.83).r*texture(uN,pn*.37+.3).g;
  float du=smoothstep(.56,.72,sp);
  float du2=smoothstep(.3,.5,fbmc(pn*.7+5.).b)*.012;
  c+=(uKey.rgb*.05+uAmb.rgb*.1)*du+(uKey.rgb*.2+uAmb.rgb)*du2*.8;
  // the cut edge of the disc catches and darkens
  float e=smoothstep(.955,1.,r);
  c+=(uKey.rgb*.05+.01)*e*e*(.4+.6*max(dot(normalize(l),normalize(uL.xy)),0.));
  // bubble of air under the crystal of a spirit-filled compass
  if(uEye.w>.5){
    vec2 bc=vec2(cos(seed*19.),sin(seed*29.))*.42;
    float bd=length(l-bc)/(.1+.06*fract(seed*5.));
    c+=(uKey.rgb*.11+uAmb.rgb*.3)*(smoothstep(.75,.95,bd)*smoothstep(1.05,.95,bd)+smoothstep(.34,.1,length((l-bc)/(.1)+.3))*.9);
  }
  o=vec4(sqrt(c/(1.+c)),1.);
}`,ke=`#version 300 es
void main(){ vec2 q=vec2((gl_VertexID<<1)&2,gl_VertexID&2); gl_Position=vec4(q*2.-1.,0.,1.); }`,wa=`#version 300 es
precision highp float;
uniform sampler2D uC, uS; uniform vec4 uR;
out vec4 o;
vec4 dec(vec4 c){ vec3 x=c.rgb*c.rgb; return vec4(x/(1.-min(x,vec3(.93))),c.a); }
void main(){
  ivec2 ip=ivec2(gl_FragCoord.xy);
  float c0=texelFetch(uS,ip,0).a*2.-1.;
  vec4 far=dec(texelFetch(uC,ip,0)); float fw=1.;
  float p0=abs(c0)*uR.y;
  fw=.32/max(p0*p0,1.);
  far*=fw;
  vec4 nr=vec4(0.); float na=0.;
  float rn=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))))*6.2832*uR.w;
  for(int i=0;i<64;i++){
    float q=(float(i)+.5)/64.;
    float r=q*uR.x, a=float(i)*2.39996+rn;
    vec2 off=vec2(cos(a),sin(a))*r;
    vec2 uv=(gl_FragCoord.xy+off)*uR.z;
    vec4 s=dec(textureLod(uC,uv,0.));
    float cs=textureLod(uS,uv,0.).a*2.-1.;
    float rs=abs(cs)*uR.y;
    float ar=2.*r*uR.x/64.;
    if(cs<c0-.02){
      // nearer than here: its blur lies over this pixel
      float e=smoothstep(r-.7,r+.7,rs)*(1.-.5*r*r/max(rs*rs,1.))*ar/(3.14*max(rs*rs,1.));
      nr+=s*e; na+=e;
    } else {
      float rr=min(rs,p0*1.3+.3);
      float e=smoothstep(r-.7,r+.7,rr)*(1.-.5*r*r/max(rr*rr,.25))*ar/(3.14*max(rr*rr,1.));
      far+=s*e; fw+=e;
    }
  }
  far/=fw;
  float cover=clamp(na*1.35,0.,1.);
  vec4 near=na>0.?nr/na:vec4(0.);
  vec4 m=mix(far,near,cover);
  m.rgb=sqrt(m.rgb/(1.+m.rgb));
  o=m;
}`,ga=j+`
uniform sampler2D uA, uG; out vec4 o;
vec3 tone(vec3 c){ c*=uCoc.w; c=(c*(2.51*c+.03))/(c*(2.43*c+.59)+.14); return pow(clamp(c,0.,1.),vec3(.4545)); }
void main(){
  ivec2 ip=ivec2(gl_FragCoord.xy);
  vec3 a=texelFetch(uA,ip,0).rgb, g=texelFetch(uG,ip,0).rgb;
  a*=a; g*=g; a=a/(1.-min(a,vec3(.97))); g=g/(1.-min(g,vec3(.97)));
  vec3 c=tone(a+g);
  vec2 v=gl_FragCoord.xy*uFwd.w-.5;
  c*=1.-.1*smoothstep(.26,.78,dot(v,v)*1.);
  // the height of what is seen here rides along in alpha, for the magnet's shadow
  o=vec4(c,texelFetch(uA,ip,0).a);
}`,Ea=j+Pe+`
layout(location=0) in vec2 aQ; layout(location=1) in vec4 aI; layout(location=2) in vec3 aE;
out vec2 vL; out vec3 vP; out vec3 vAp; out vec3 vAm; out vec3 vDp; out vec3 vDm;
flat out vec4 vC; flat out vec3 vE; flat out vec2 vO;
void main(){
  float L=uMat.z*aE.y, W=uMat.w;
  vec3 pc=vec3(aI.xy,ZN);
  float d=dot(pc-uEye.xyz,uFwd.xyz);
  float s=abs(clamp(uCoc.x*(d-uCoc.y)/d,-1.,1.))*uR2();
  float sw=s*d/uRt.w;
  vec2 q=aQ*vec2(L+sw*2.4+.4,W+sw*2.4+.4);
  vec2 ax=aI.zw, pe=vec2(-ax.y,ax.x);
  vec3 p=pc+vec3(ax*q.x+pe*q.y,0.);
  vL=q; vP=p;
  vec3 V=normalize(p-uEye.xyz);
  vec3 np=normalize(vec3(pe*.46,1.)), nm=normalize(vec3(-pe*.46,1.));
  vec3 Rp=reflect(V,np), Rm=reflect(V,nm);
  vAp=env(Rp,.05); vAm=env(Rm,.05);
  float fall=exp(dot(pc.xy,normalize(uL.xy))*uBrs.w);
  vec3 kd=uKey.rgb*fall;
  vDp=kd*max(dot(np,uL.xyz),0.)+uAmb.rgb; vDm=kd*max(dot(nm,uL.xyz),0.)+uAmb.rgb;
  vC=vec4(pc,s); vE=vec3(L,W,aE.x); vO=ax;
  gl_Position=uVP*vec4(p,1.);
}`.replace("uR2()","uTm.w"),Ra=j+`
uniform sampler2D uG;
in vec2 vL; in vec3 vP; in vec3 vAp; in vec3 vAm; in vec3 vDp; in vec3 vDm;
flat in vec4 vC; flat in vec3 vE; flat in vec2 vO; out vec4 o;
vec3 tone(vec3 c){ c*=uCoc.w; c=(c*(2.51*c+.03))/(c*(2.43*c+.59)+.14); return pow(clamp(c,0.,1.),vec3(.4545)); }
float cdf(float x){ return smoothstep(-1.,1.,x); }
float loz(vec2 q, float L, float W, float bu, float bv){
  float hw=W*pow(max(1.-abs(q.x)/L,0.),.85);
  return (cdf((q.y+hw)/bv)-cdf((q.y-hw)/bv))*cdf((L-abs(q.x))/bu);
}
void main(){
  vec4 G=texelFetch(uG,ivec2(gl_FragCoord.xy),0);
  if(G.a<.004) discard;
  vec2 q=vL; float L=vE.x, W=vE.y;
  float s=sqrt(vC.w*vC.w+.42);
  vec2 dx=dFdx(q), dy=dFdy(q);
  float gu=length(vec2(dx.x,dy.x)), gv=length(vec2(dx.y,dy.y));
  float bu=s*gu*1.1, bv=s*gv*1.1;
  float ang=abs(vE.z)*uTa.w;
  float bm=bv+ang*abs(q.x);
  float cov=loz(q,L,W,bu,bm);
  // energy of a moving needle is spread over the sweep
  float side=smoothstep(-bv*.8,bv*.8,q.y);
  vec3 sp=mix(vAm,vAp,side), dif=mix(vDm,vDp,side);
  float north=smoothstep(-bu,bu,q.x);
  float ridge=exp(-q.y*q.y/(bv*bv+.00004))*.25;
  vec3 steel=sp*vec3(.26,.32,.5)+dif*vec3(.012,.014,.03)+ridge*sp*.3;
  vec3 red=vec3(.8,.055,.035)*dif+sp*.05;
  vec3 col=mix(steel,red,north);
  // brass cap and a jewel on the pivot
  float rc=length(q);
  float cc=cdf((.078-rc)/max(bu,bv));
  vec2 cn=q/.078;
  float cz=sqrt(max(1.-dot(cn,cn),.0));
  vec3 cN=normalize(vec3(vO*cn.x+vec2(-vO.y,vO.x)*cn.y,cz+.35));
  vec3 H=normalize(uL.xyz-normalize(vP-uEye.xyz));
  float cs=pow(max(dot(cN,H),0.),60.);
  float cd=max(dot(cN,uL.xyz),0.);
  vec3 cap=uBrs.rgb*(uAmb.rgb*.8+uKey.rgb*cd*.34)+uKey.rgb*cs*.6;
  float jw=cdf((.023-rc)/max(bu,bv));
  cap=mix(cap,vec3(.3,.018,.03)*(uAmb.rgb+uKey.rgb*.5)+uKey.rgb*.8*pow(max(dot(cN,H),0.),200.),jw);
  float tot=max(cov,cc);
  col=mix(col,cap,cc);
  // shadow lands on the card: go down the ray, back up towards the light
  vec3 V=normalize(vP-uEye.xyz);
  vec3 ph=vP+V*((ZC-ZN)/V.z);
  vec2 sq=ph.xy+uL.xy/uL.z*(ZN-ZC)-vC.xy;
  vec2 lq=vec2(dot(sq,vO),dot(sq,vec2(-vO.y,vO.x)));
  float rad=length(ph.xy-vC.xy);
  float pen=uL.w*.2+.006;
  float sb=loz(lq,L,W,bu+pen,bm+pen);
  sb=max(sb,cdf((.09-length(lq))/(max(bu,bv)+pen))*.9);
  float sa=sb*.68*smoothstep(RI,RI-.03,rad);
  vec3 g=G.rgb*G.rgb; g=g/(1.-min(g,vec3(.97)));
  float a=tot;
  vec3 rgb=tone(col+g)*a;
  a=a+(1.-a)*sa;
  o=vec4(rgb,a)*min(G.a,1.);
}`,Fa=j+`
uniform sampler2D uG, uB; out vec4 o;
vec3 tone(vec3 c){ c*=uCoc.w; c=(c*(2.51*c+.03))/(c*(2.43*c+.59)+.14); return pow(clamp(c,0.,1.),vec3(.4545)); }
float sdb(vec2 p){
  vec2 a=abs(p-uMa.xy)-uMa.zw, b=abs(p-uMb.xy)-uMb.zw;
  float d1=length(max(a,0.))+min(max(a.x,a.y),0.);
  float d2=length(max(b,0.))+min(max(b.x,b.y),0.);
  return uMb.z>0.?min(d1,d2):d1;
}
void main(){
  vec2 nd=gl_FragCoord.xy*uFwd.w*2.-1.;
  vec3 V=normalize(uFwd.xyz*uUp.w+uRt.xyz*nd.x+uUp.xyz*nd.y);
  float c=cos(uMp.w), s=sin(uMp.w);
  vec4 g=texelFetch(uG,ivec2(gl_FragCoord.xy),0);
  vec3 P=uEye.xyz+V*((ZG-uEye.z)/V.z);
  // the shadow, softer the higher it hangs, on the crystal or on the bench
  vec4 b4=texelFetch(uB,ivec2(gl_FragCoord.xy),0);
  float zs=g.a>.5?ZG:(uCoc.x>0.?.06:b4.a*HT);
  vec3 Ps=uEye.xyz+V*((zs-uEye.z)/V.z);
  float hz=uMp.z-zs;
  vec2 q=Ps.xy+uL.xy/uL.z*hz-uMp.xy;
  float w=.07+hz*uL.w*1.5;
  float d=sdb(vec2(c*q.x+s*q.y,-s*q.x+c*q.y));
  float sh=smoothstep(w,-w,d)*.84/(1.+hz*hz*.02);
  // and the soft dark straight under it, where it hides the window and the room from what lies below
  vec2 q2=Ps.xy-uMp.xy;
  float d2=sdb(vec2(c*q2.x+s*q2.y,-s*q2.x+c*q2.y)), w2=.1+hz*.75;
  sh=1.-(1.-sh)*(1.-smoothstep(w2,-w2*.4,d2)*.6/(1.+hz*hz*.05));
  // the string's lowest stretch: a hair shadow out of the bar's band that blurs away within a hand's length
  vec2 sd=uTb.xy-uL.xy/uL.z, s0=-uL.xy/uL.z*uMr.w;
  float sk=clamp(dot(q-s0,sd)/dot(sd,sd),0.,4.);
  float wt=.008+(hz+uMr.w+sk)*uL.w*.25;
  vec2 sq=q-s0-sd*sk;
  sh=1.-(1.-sh)*(1.-exp(-dot(sq,sq)/(wt*wt))*min(.6,.03/wt)*smoothstep(1.6,.1,sk));
  // its mirror image in the crystal of each compass
  vec3 R=vec3(V.xy,-V.z);
  vec2 m=P.xy+R.xy*((uMp.z-.16-ZG)/R.z)-uMp.xy;
  vec2 ml=vec2(c*m.x+s*m.y,-s*m.x+c*m.y);
  float dd=sdb(ml);
  float cov=smoothstep(.1,-.1,dd)*g.a;
  float F=.042+.958*pow(1.-max(-V.z,0.),5.);
  vec3 refl=g.rgb*g.rgb; refl=refl/(1.-min(refl,vec3(.97)));
  vec3 mc=(ml.x>0.?uMr.rgb:uTa.rgb);
  vec3 mir=(mc*(uAmb.rgb*.8+.02))*F;
  vec3 b=b4.rgb;
  vec3 after=tone(mir);
  float lb=pow(max(b.g,.003),2.2);
  float frac=clamp(refl.g*uCoc.w*.75/lb,0.,.9);
  float rem=(1.-pow(1.-frac,.4545))*cov;
  float a=clamp(1.-(1.-sh)*(1.-rem),0.,1.);
  o=vec4(after*cov*.5,a);
}`,Ma=j+`
layout(location=0) in vec3 aP; layout(location=1) in vec3 aN; layout(location=2) in vec2 aU;
out vec3 vP; out vec3 vW; out vec2 vU; out vec3 vL;
void main(){
  float c=cos(uMp.w), s=sin(uMp.w);
  vec3 q=aP; q.z+=uTb.w*q.x;
  vec3 w=vec3(uMp.x+c*q.x-s*q.y,uMp.y+s*q.x+c*q.y,uMp.z+q.z);
  vP=w; vL=aP; vU=aU;
  vW=vec3(c*aN.x-s*aN.y,s*aN.x+c*aN.y,aN.z);
  vec4 k=uVP*vec4(w,1.);
  k.xy=(k.xy-k.w*(uTm.xy))/uTm.z;
  gl_Position=k;
}`,Aa=j+Pe+`
in vec3 vP; in vec3 vW; in vec2 vU; in vec3 vL; out vec4 o;
vec3 tone(vec3 c){ c*=uCoc.w; c=(c*(2.51*c+.03))/(c*(2.43*c+.59)+.14); return pow(clamp(c,0.,1.),vec3(.4545)); }
void main(){
  vec3 V=normalize(vP-uEye.xyz);
  vec3 N=normalize(vW);
  float x=vU.x, edge=vU.y;
  vec2 pn=mat2(.81,.59,-.59,.81)*vL.xy+vL.z*vec2(1.7,-2.3);
  pn+=(texture(uN,pn*.13).rg-.5)*.5;
  vec3 h=texture(uN,pn*.27).rgb, m=fbmc(pn*7.+13.), f=fbmc(pn*29.);
  int kind=int(uTb.z+.5);
  float gr=texture(uN,vec2(vL.x*.03,vL.y*2.3+vL.z*2.9)).r-.5;
  // paint zones
  float paint=kind==2?(x>.72?1.:0.):(kind==1?1.:(x>0.?1.:.0));
  float tip=smoothstep(.93,.945,abs(x));
  if(kind==1) tip=smoothstep(.885,.9,abs(x));
  float chip=smoothstep(.6,.66,.4*m.r+.62*edge*(f.g+.3*f.b)+tip*.6+.06*(f.b-.5));
  paint*=1.-chip; paint*=1.-tip;
  float painted=kind==2?0.:1.;
  float greyp=kind==3&&x<0.?(1.-tip)*(1.-chip*.8):0.;
  vec3 steelF=vec3(.5,.52,.56)*(.75+.45*f.r);
  vec3 F0=mix(steelF,vec3(.04),max(paint,greyp));
  float rough=mix(.24+.26*m.g,.2+.2*f.b,paint);
  rough=mix(rough,.4,greyp);
  if(kind==0&&x<0.){ F0=mix(vec3(.5,.52,.55),vec3(.13,.08,.05),smoothstep(.6,.8,m.b+.25*f.r-.1)); F0*=.82+.36*(gr+.5); rough=.3+.2*m.g+.3*smoothstep(.6,.8,m.b); }
  vec3 alb=mix(vec3(.02),mix(uMr.rgb,uTa.rgb,1.-paint),max(paint,greyp));
  if(kind==2&&paint<.5){ F0=mix(vec3(.5,.51,.54),vec3(.66,.67,.7),f.g); rough=.13+.1*m.g; }
  N=normalize(N+(h-.5)*.035+(1.-paint)*vec3(0.,gr*.2,gr*.2));
  // the string's own turns round the middle, pulled tight, the knot on top (the horseshoe: round the top of its arch;
  // the crossed bars: round both where they cross)
  vec3 lp=vL; vec3 ax=vec3(cos(uMp.w),sin(uMp.w),0.);
  float top=kind==1?2.45:(kind==2?.15:(kind==3?.51:.24));
  if(kind==3&&vL.z>.17){ lp.xy=vec2(vL.y,-vL.x); ax=vec3(-ax.y,ax.x,0.); }
  float tu=(lp.x-.03*lp.y)/.052, tf=fract(tu+.5)-.5;
  float tw=step(abs(tu),1.5)*(kind==1?step(1.8,vL.z):1.);
  float kn=smoothstep(.075,.055,length(vL.xy))*step(top-.03,vL.z);
  tw=max(tw,kn);
  if(tw>0.){
    N=normalize(mix(N,normalize(N+ax*tf*1.6),tw*(1.-kn)));
    alb=mix(alb,vec3(.26,.215,.14)*mix(.35,1.,smoothstep(.5,.3,abs(tf))*(1.-kn)+kn*(.8+.2*f.r)),tw);
    F0=mix(F0,vec3(.02),tw); rough=mix(rough,.9,tw);
  }
  vec3 R=reflect(V,N);
  float nv=max(-dot(N,V),0.);
  vec3 F=F0+(1.-F0)*pow(1.-nv,5.)*(1.-rough*.7);
  vec3 s=env(R,rough);
  float nl=max(dot(N,uL.xyz),0.);
  vec3 col=alb*(uKey.rgb*nl+uAmb.rgb*(.55+.45*N.z)+uFlr.rgb*.25)+s*F;
  col*=.7+.3*smoothstep(-1.,.2,N.z);
  o=vec4(tone(col),1.);
}`,Ta=j+`
uniform sampler2D uT; out vec4 o;
void main(){
  vec2 nd=gl_FragCoord.xy*uFwd.w*2.-1.;
  vec2 lo=uTm.xy-uTm.z, ext=vec2(2.*uTm.z);
  vec3 V=normalize(uFwd.xyz*uUp.w+uRt.xyz*nd.x+uUp.xyz*nd.y);
  vec3 P=uEye.xyz+V*((uMp.z-uEye.z)/V.z);
  float d=dot(P-uEye.xyz,uFwd.xyz);
  float s=abs(clamp(uCoc.x*(d-uCoc.y)/d,-1.,1.))*uTm.w;
  vec2 k=uFwd.w*2./ext;
  float lod=max(log2(max(s,1.)*.55*k.x*${ye}.),0.);
  float rn=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))))*6.2832;
  vec4 c=vec4(0.);
  if(uTm.w<.5){
    // stopped down: one sharp look
    vec2 u=(nd-lo)/ext;
    o=textureLod(uT,u,lod)*step(0.,u.x)*step(u.x,1.)*step(0.,u.y)*step(u.y,1.);
  } else {
    for(int i=0;i<14;i++){
      float q=sqrt((float(i)+.5)/14.);
      float a=float(i)*2.39996+rn;
      vec2 u=(nd+vec2(cos(a),sin(a))*q*s*uFwd.w*2.-lo)/ext;
      float e=step(0.,u.x)*step(u.x,1.)*step(0.,u.y)*step(u.y,1.);
      c+=textureLod(uT,u,lod)*e;
    }
    o=c/14.;
  }
}`,za=j+`
out float vX; out vec4 vR;
void main(){
  vec2 q=vec2((gl_VertexID&1)*2-1,(gl_VertexID>>1)*1);
  vec3 A=uTa.xyz, B=uTb.xyz;
  vec4 a=uVP*vec4(A,1.), b=uVP*vec4(B,1.);
  // clipped to the lens: an end behind the near distance comes along the string to where it crosses it, before the divide
  const float zn=.5;
  if(a.w<zn){ float t=(zn-a.w)/(b.w-a.w); a=mix(a,b,t); A=mix(A,B,t); }
  if(b.w<zn){ float t=(zn-b.w)/(a.w-b.w); b=mix(b,a,t); B=mix(B,A,t); }
  vec2 pa=a.xy/a.w, pb=b.xy/b.w;
  vec2 dir=normalize(pb-pa+vec2(1e-6,0.)), per=vec2(-dir.y,dir.x);
  float hq=uTm.x*2.4+1.;
  vec2 p=mix(pa,pb,q.y)+per*q.x*hq*uFwd.w*2.;
  float rw=1./mix(a.w,b.w,q.y);
  vX=q.x*hq; vR=vec4(mix(A,B,q.y)*rw,rw);
  gl_Position=max(a.w,b.w)<zn?vec4(2.,2.,2.,1.):vec4(p,0.,1.);
}`,_a=j+`
in float vX; in vec4 vR; out vec4 o;
vec3 tone(vec3 c){ c*=uCoc.w; c=(c*(2.51*c+.03))/(c*(2.43*c+.59)+.14); return pow(clamp(c,0.,1.),vec3(.4545)); }
void main(){
  // a matt cream thread lit by the room: its width from its distance (thinner than a pixel is fainter, never wider)
  float wt=uTa.w*vR.w, w=clamp(wt,uTb.w,uTm.x);
  float a=exp(-vX*vX/(w*w))*min(1.,wt/w)*uMr.w;
  vec3 P=vR.xyz/vR.w, T=normalize(uTb.xyz-uTa.xyz), V=normalize(P-uEye.xyz);
  vec3 Nv=normalize(T*dot(V,T)-V);
  float tl=dot(T,uL.xyz), dif=.45*sqrt(max(1.-tl*tl,0.))+.55*max(dot(Nv,uL.xyz),0.);
  float fall=exp(dot(P.xy,normalize(uL.xy))*uBrs.w);
  vec3 col=vec3(.26,.215,.14)*(uKey.rgb*dif*fall+uAmb.rgb*.9+uFlr.rgb*.2);
  o=vec4(tone(col)*a,a);
}`,La=`#version 300 es
precision highp float;
uniform sampler2D uF, uN; uniform vec4 uG;
out vec4 o;
void main(){
  vec3 c=texelFetch(uF,ivec2(gl_FragCoord.xy),0).rgb;
  float n=texture(uN,gl_FragCoord.xy*uG.z+uG.xy).r+texture(uN,gl_FragCoord.xy*uG.z*.73+uG.yx).g-1.;
  float l=dot(c,vec3(.3,.6,.1));
  c+=n*uG.w*(1.-l*.7);
  o=vec4(c,1.);
}`;function Na(t,e,r){const n=t.createProgram();for(const[w,v]of[[t.VERTEX_SHADER,e],[t.FRAGMENT_SHADER,r]]){const T=t.createShader(w);t.shaderSource(T,v),t.compileShader(T),t.attachShader(n,T),t.deleteShader(T)}return t.linkProgram(n),n}function Pa(t,e){da&&!t.getProgramParameter(e,t.LINK_STATUS)&&console.error("296 link",t.getProgramInfoLog(e));const r={};for(const v of["uN","uC","uS","uR","uA","uG","uB","uT","uF"])r[v]=t.getUniformLocation(e,v);const n=t.getUniformBlockIndex(e,"S"),w=t.getUniformBlockIndex(e,"D");return n!==t.INVALID_INDEX&&t.uniformBlockBinding(e,n,0),w!==t.INVALID_INDEX&&t.uniformBlockBinding(e,w,1),t.useProgram(e),{p:e,u:r}}function we(t,e,r,n){const w=t.createTexture();return t.bindTexture(t.TEXTURE_2D,w),t.texStorage2D(t.TEXTURE_2D,n?(Math.log2(e)|0)+1:1,t.RGBA8,e,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),w}function ge(t,e){const r=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),r}function ka(){const t=(s,m,i,p,R,b,L,F)=>{const d=[];for(let h=0;h<=b;h++){const g=(p+(R-p)*h/b)*Math.PI/180;d.push([s+i*Math.cos(g),m+i*Math.sin(g),L,F])}return d},e=[[.968,0,0,.28],[1,.03,0,.62],[1,.2,0,.95],[1,.385,0,.85],...t(1,.425,.042,-90,90,5,0,1),[.995,.468,2,.42],[.997,.474,2,.9],[.997,.553,2,.95],...t(.94,.558,.062,0,100,5,1,1),[.9,.612,1,1],[.872,.592,1,.9],[.856,.566,1,.6],[.85,.555,3,.42],[.85,.45,3,.34],[.85,.33,3,.24]],r=56,n=[],w=[],v=[];for(let s=0;s<e.length-1;s++){const m=e[s],i=e[s+1],p=i[0]-m[0],R=i[1]-m[1],b=Math.hypot(p,R)||1;v.push([R/b,-p/b])}for(let s=0;s<e.length-1;s++){const m=e[s],i=e[s+1],p=v[s],R=d=>{if(d<0||d>=v.length)return p;const h=v[d];if(p[0]*h[0]+p[1]*h[1]<.55)return p;const g=p[0]+h[0],z=p[1]+h[1],I=Math.hypot(g,z);return[g/I,z/I]},b=R(s-1),L=R(s+1),F=n.length/8;for(let d=0;d<=r;d++){const h=d/r*Math.PI*2,g=Math.cos(h),z=Math.sin(h);n.push(m[0]*g,m[0]*z,m[1],b[0]*g,b[0]*z,b[1],m[2],m[3]),n.push(i[0]*g,i[0]*z,i[1],L[0]*g,L[0]*z,L[1],m[2],i[3])}for(let d=0;d<r;d++){const h=F+d*2;w.push(h,h+2,h+1,h+1,h+2,h+3)}}const T=n.length/8;for(const[s,m]of[[0,1],[.5,1],[.85,.5]])for(let i=0;i<=r;i++){const p=i/r*Math.PI*2;n.push(s*Math.cos(p),s*Math.sin(p),Ia,0,0,1,4,m)}for(let s=0;s<2;s++)for(let m=0;m<r;m++){const i=T+s*(r+1)+m,p=i+r+1;w.push(i,i+1,p,p,i+1,p+1)}const k=(s,m,i,p,R,b)=>{const L=n.length/8,F=20,d=8;for(let h=0;h<=F;h++)for(let g=0;g<=d;g++){const z=h/F*Math.PI*2,I=g/d*Math.PI*2,Y=Math.cos(z),Q=Math.sin(z);let E=Y*Math.cos(I),O=Q*Math.cos(I),X=Math.sin(I);const Ee=Y*(i+p*Math.cos(I)),Re=Q*(i+p*Math.cos(I)),Fe=p*Math.sin(I),te=Math.cos(R),V=Math.sin(R);n.push(s+Ee*te-Fe*V,Re,m+Ee*V+Fe*te,E*te-X*V,O,E*V+X*te,b,.95)}for(let h=0;h<F;h++)for(let g=0;g<d;g++){const z=L+h*(d+1)+g,I=z+d+1;w.push(z,I,z+1,z+1,I,I+1)}};k(1+.16,.135,.135,.024,-.62,6),k(1.012,.25,.045,.022,1.2,0);const B=w.length,W=w.length,l=n.length/8;n.push(0,0,Bt,0,0,1,5,1);for(let s=0;s<=r;s++){const m=s/r*Math.PI*2;n.push(.852*Math.cos(m),.852*Math.sin(m),Bt,0,0,1,5,1)}for(let s=0;s<r;s++)w.push(l,l+1+s,l+2+s);return{v:new Float32Array(n),i:new Uint16Array(w),caseCount:B,glassStart:W,glassCount:w.length-W}}const Ia=.33,Bt=.555;function St(t,e,r,n,w,v){const k=[];for(let l=0;l<16;l++){const s=l/16*Math.PI*2,m=Math.cos(s),i=Math.sin(s),p=v?2:4.5,R=Math.sign(m)*Math.pow(Math.abs(m),2/p),b=Math.sign(i)*Math.pow(Math.abs(i),2/p),L=Math.hypot(Math.sign(m)*Math.pow(Math.abs(m),2-2/p),Math.sign(i)*Math.pow(Math.abs(i),2-2/p))||1;k.push([R,b,Math.sign(m)*Math.pow(Math.abs(m),2-2/p)/L,Math.sign(i)*Math.pow(Math.abs(i),2-2/p)/L,v?0:Math.abs(Math.abs(R)*Math.abs(b))])}const B=r.length,W=t.length/8;for(let l=0;l<B;l++){const s=r[l],m=r[Math.min(B-1,l+1)],i=r[Math.max(0,l-1)];let p=m[0]-i[0],R=m[2]-i[2];const b=Math.hypot(p,R)||1;p/=b,R/=b;const L=-R,F=p;for(let d=0;d<=16;d++){const h=k[d%16],g=s[4]||1;t.push(s[0]+L*h[1]*w*g,s[1]+h[0]*n*g,s[2]+F*h[1]*w*g,L*h[3],h[2],F*h[3],s[3],g<1?1:h[4])}}for(let l=0;l<B-1;l++)for(let s=0;s<16;s++){const m=W+l*17+s,i=m+16+1;e.push(m,i,m+1,m+1,i,i+1)}for(const l of[0,B-1]){const s=r[l],m=r[l===0?1:B-2];let i=s[0]-m[0],p=s[2]-m[2];const R=Math.hypot(i,p)||1;i/=R,p/=R;const b=-p,L=i,F=t.length/8;t.push(s[0],s[1],s[2],i,0,p,s[3],0);for(let d=0;d<=16;d++){const h=k[d%16],g=s[4]||1;t.push(s[0]+b*h[1]*w*g,s[1]+h[0]*n*g,s[2]+L*h[1]*w*g,i,0,p,s[3],.3)}for(let d=0;d<16;d++)e.push(F,F+1+d,F+2+d)}}function Ba(t){const e=[],r=[],n=(w,v,T,k,B)=>{const W=[],l=[-1,-.985,-.96,-.5,-.06,-.05,-.04,0,.04,.05,.06,.5,.96,.985,1];for(const s of l)W.push([s*w,0,v,s,Math.abs(s)>.999?.93:1]);St(e,r,W,T,k,B)};if(t===0)n(3.1,0,.3,.24,!1);else if(t===1){const w=[];w.push([-1,0,-.2,-1],[-1,0,-.2+.02,-.98]);for(let B=0;B<=18;B++){const W=Math.PI-B/18*Math.PI;w.push([Math.cos(W)*1,0,1.15+Math.sin(W)*1,(B/18*2-1)*.9])}w.push([1,0,-.2+.02,.98],[1,0,-.2,1]),St(e,r,w,.3,.3,!1)}else if(t===2)n(3.6,0,.15,.15,!0);else{n(2.2,0,.3,.17,!1);const w=e.length;n(2.2,.34,.3,.17,!1);for(let v=w;v<e.length;v+=8){const T=e[v],k=e[v+1],B=e[v+3],W=e[v+4];e[v]=-k,e[v+1]=T,e[v+3]=-W,e[v+4]=B}}return{v:new Float32Array(e),i:new Uint16Array(r)}}function Sa(t){let e=Pt.get(t);if(e)return e;e={};const r={table:[pa,xa],kase:[It,ba],glass:[It,ya],dof:[ke,wa],comp:[ke,ga],needle:[Ea,Ra],over:[ke,Fa],mag:[Ma,Aa],spr:[ke,Ta],line:[za,_a],final:[ke,La]},n={};for(const l in r)n[l]=Na(t,r[l][0],r[l][1]);t.flush();let w=2654435769;const v=()=>{w=w+1831565813|0;let l=Math.imul(w^w>>>15,1|w);return l=l+Math.imul(l^l>>>7,61|l)^l,(l^l>>>14)>>>0},T=new Uint8Array(256*256*4);for(let l=0;l<T.length;l+=4){const s=v();T[l]=s&255,T[l+1]=s>>>8&255,T[l+2]=s>>>16&255,T[l+3]=s>>>24}e.noise=t.createTexture(),t.bindTexture(t.TEXTURE_2D,e.noise),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,T),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);{const m=new Uint8Array(16384),i=(F,d,h,g,z)=>[F,d,h,g,z],p=(F,d,h,g,z,I,Y)=>{const Q=[];for(let E=0;E<Y;E++){const O=g+(z-g)*E/Y,X=g+(z-g)*(E+1)/Y;Q.push(i(F+h*Math.cos(O),d+h*Math.sin(O),F+h*Math.cos(X),d+h*Math.sin(X),I*(.55+.45*Math.abs(Math.sin((O+X)/2)))))}return Q},R=.14,b=.075,L=[[i(.24,.12,.24,.86,b),i(.76,.14,.76,.88,b),i(.24,.88,.76,.12,R),i(.13,.12,.35,.12,b),i(.13,.88,.3,.88,b),i(.65,.88,.87,.88,b)],[i(.08,.88,.3,.12,R),i(.3,.12,.5,.72,b),i(.5,.72,.7,.12,R),i(.7,.12,.92,.88,b),i(.02,.88,.18,.88,b),i(.82,.88,.98,.88,b)],[...p(.5,.685,.2,.35,4.71,R,12),...p(.5,.315,.2,1.57,-2.79,R,12),i(.72,.74,.72,.88,b),i(.28,.12,.28,.26,b)],[i(.27,.12,.27,.88,R),i(.16,.88,.78,.88,b),i(.27,.5,.64,.5,b),i(.16,.12,.8,.12,b),i(.78,.88,.78,.74,b),i(.8,.12,.8,.28,b),i(.64,.42,.64,.58,b)]];for(let F=0;F<4;F++)for(const[d,h,g,z,I]of L[F]){const Y=g-d,Q=z-h,E=Y*Y+Q*Q||1e-9,O=I*.5+1.5/64,X=Math.max(0,Math.floor((Math.min(d,g)-O)*64)),Ee=Math.min(63,Math.ceil((Math.max(d,g)+O)*64)),Re=Math.max(0,Math.floor((Math.min(h,z)-O)*64)),Fe=Math.min(63,Math.ceil((Math.max(h,z)+O)*64));for(let te=Re;te<=Fe;te++)for(let V=X;V<=Ee;V++){const ue=(V+.5)/64,N=(te+.5)/64,ae=Math.max(0,Math.min(1,((ue-d)*Y+(N-h)*Q)/E)),Ie=Math.max(0,Math.min(255,(.5-(Math.hypot(ue-d-Y*ae,N-h-Q*ae)-I*.5)*64)*255))|0,Be=te*256+F*64+V;Ie>m[Be]&&(m[Be]=Ie)}}e.glyph=t.createTexture(),t.bindTexture(t.TEXTURE_2D,e.glyph),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R8,256,64,0,t.RED,t.UNSIGNED_BYTE,m),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}for(const l in r)e[l]=Pa(t,n[l]);const k=ka();e.cm=k,e.caseVao=t.createVertexArray(),t.bindVertexArray(e.caseVao);const B=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,B),t.bufferData(t.ARRAY_BUFFER,k.v,t.STATIC_DRAW);const W=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,W),t.bufferData(t.ELEMENT_ARRAY_BUFFER,k.i,t.STATIC_DRAW);for(const[l,s,m]of[[0,3,0],[1,3,12],[2,2,24]])t.enableVertexAttribArray(l),t.vertexAttribPointer(l,s,t.FLOAT,!1,32,m);e.mags=[];for(let l=0;l<4;l++){const s=Ba(l),m=t.createVertexArray();t.bindVertexArray(m);const i=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,s.v,t.STATIC_DRAW);const p=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,p),t.bufferData(t.ELEMENT_ARRAY_BUFFER,s.i,t.STATIC_DRAW);for(const[R,b,L]of[[0,3,0],[1,3,12],[2,2,24]])t.enableVertexAttribArray(R),t.vertexAttribPointer(R,b,t.FLOAT,!1,32,L);e.mags.push({vao:m,n:s.i.length})}return e.empty=t.createVertexArray(),e.quad=t.createBuffer(),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,e.quad),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW),e.magT=we(t,ye,ye,!0),e.magF=ge(t,e.magT),e.magD=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,e.magD),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,ye,ye),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,e.magD),t.bindFramebuffer(t.FRAMEBUFFER,null),Pt.set(t,e),e}Nt.add({num:296,name:"Hundred Compasses",fam:"Worlds",recipe:"A hundred brass pocket compasses on a bench with a bar magnet hanging over them, and every needle really gets pulled by the earth, the magnet and its neighbours. The spacing, the layout, the light and the magnet change every mint. Drag to carry the magnet across, tap to flip it, or let go and it lifts away while the needles settle back to north or lock into patterns with each other.",interactive:"Drag to carry the magnet across the compasses, tap to flip it, let go and it lifts away while the needles settle back to north or lock into domains.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,r=t.size,n=Sa(e);let w=2166136261;for(let a=2;a<t.hash.length;a++)w^=t.hash.charCodeAt(a),w=Math.imul(w,16777619);const v=()=>{w=w+1831565813|0;let a=Math.imul(w^w>>>15,1|w);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},T=(a,c,f)=>{let x=0;for(const M of c)x+=M[1];let y=v()*x,u=0;for(;u<c.length-1&&y>=c[u][1];)y-=c[u][1],u++;return t.home&&(u=f),t.trait(a,c[u][0]),u},k=T("Array",[["Square ranks",50],["Staggered",25],["Close-set",18],["Scattered by hand",7]],0),B=T("Bench",[["Soapstone",40],["Waxed oak",25],["Green baize",18],["Zinc",14],["Black plate glass",3]],0),W=T("Light",[["North window",45],["Skylight",24],["One lamp at night",23],["Flash",8]],0),l=T("Magnet",[["Bar",50],["Horseshoe",30],["Steel rod",16],["Crossed bars",4]],0),s=T("Card",[["Ticks",40],["Rose",36],["Silvered",19],["Black dial",5]],0),m=T("Needle",[["Dry pivot",58],["Heavy",22],["Spirit-filled",20]],0),i=T("Latitude",[["Middle",68],["Strong north",16],["Near the pole",16]],0),p=T("Under the bench",[["Nothing",84],["Hidden iron",11],["Reversed needles",5]],0);let R=T("Lens",[["Close",50],["Long",28],["Low",22]],0),b=795581719;for(let a=2;a<t.hash.length;a++)b^=t.hash.charCodeAt(a),b=Math.imul(b,16777619);const L=()=>{b=b+1831565813|0;let a=Math.imul(b^b>>>15,1|b);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296};!t.home&&L()<.16&&(R=3,t.trait("Lens","From above"));const F=!t.home&&L()<.14;F&&(t.trait("Array","Rings round the magnet"),R=3,t.trait("Lens","From above"));let d=1779033703;for(let a=2;a<t.hash.length;a++)d^=t.hash.charCodeAt(a),d=Math.imul(d,16777619);const h=()=>{d=d+1831565813|0;let a=Math.imul(d^d>>>15,1|d);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296};!t.home&&R!==3&&h()<.1&&(R=3,t.trait("Lens","From above")),R===2&&(p===1||i===2)&&(R=1,t.trait("Lens","Long"));const g=[2.5,2.62,2.14,2.8][k],z=k===1?.88:k===2?.866:1,I=(k===3?-.2:-.32)+(v()-.5)*.16,Y=Math.cos(I),Q=Math.sin(I),E=100,O=new Float64Array(E),X=new Float64Array(E),Ee=new Float32Array(E),Re=new Float32Array(E);for(let a=0;a<10;a++)for(let c=0;c<10;c++){const f=c+a*10,x=k===3?.3:.045,y=(c-4.5+(k===1||k===2?a&1?.25:-.25:0))*g+(v()-.5)*2*x,u=(a-4.5)*g*z+(v()-.5)*2*x;O[f]=Y*y-Q*u,X[f]=Q*y+Y*u,Ee[f]=I+Math.PI/4+Math.floor(v()*4)*Math.PI/2+(v()-.5)*.7,Re[f]=v()}const Fe=F?(L()-.5)*3:0,te=F?-4.6+(L()-.5)*2.4:0;if(F){const a=g*1.04;let c=0;for(let f=0;c<E;f++){const x=(f+.55)*a,y=Math.floor(2*Math.PI*x/a),u=Math.min(y,E-c),M=L()*6.283;for(let q=0;q<u;q++,c++){const P=M+6.283*(q+(L()-.5)*.12)/u;O[c]=Fe+x*Math.cos(P),X[c]=te+x*Math.sin(P)}}}const V=[{e:[-4.5,-21,19],t:[-.3,-2.4,0],f:42,foc:1,k:0},{e:[-7,-30,27],t:[0,-.8,0],f:37,foc:1,k:0},{e:[-3.5,-16.5,4.2],t:[.6,-5.6,.6],f:44,foc:10.6,k:.42},{e:[-8.3,-14.6,27],t:[-1,-3,0],f:34,foc:32.5,k:0}][R],ue=g*Math.sqrt(z)/2.5,N=V.e.map(a=>a*ue),ae=V.t.map(a=>a*ue);if(!t.home&&R<2){const a=(h()-.5)*1.5,c=.9+h()*.25,f=Math.cos(a),x=Math.sin(a),y=N[0]-ae[0],u=N[1]-ae[1];N[0]=ae[0]+f*y-x*u,N[1]=ae[1]+x*y+f*u,N[2]=ae[2]+(N[2]-ae[2])*c}V.foc*=ue;const Ie=ae[0]-N[0],Be=ae[1]-N[1],Dt=ae[2]-N[2],ot=Math.hypot(Ie,Be,Dt),H=[Ie/ot,Be/ot,Dt/ot];let S=[H[1],-H[0],0];const Ut=Math.hypot(S[0],S[1]);S=[S[0]/Ut,S[1]/Ut,0];const ve=[S[1]*H[2]-S[2]*H[1],S[2]*H[0]-S[0]*H[2],S[0]*H[1]-S[1]*H[0]],Da=Math.tan(V.f*Math.PI/360),se=1/Da,He=.5,We=200,Se=(a,c)=>a[0]*c[0]+a[1]*c[1]+a[2]*c[2],D=new Float32Array(16);{const a=(We+He)/(We-He),c=-2*We*He/(We-He);for(let f=0;f<3;f++)D[f*4]=se*S[f],D[f*4+1]=se*ve[f],D[f*4+2]=a*H[f],D[f*4+3]=H[f];D[12]=-se*Se(S,N),D[13]=-se*Se(ve,N),D[14]=-a*Se(H,N)+c,D[15]=-Se(H,N)}const De=(a,c,f)=>{const x=D[3]*a+D[7]*c+D[11]*f+D[15];return[(D[0]*a+D[4]*c+D[8]*f+D[12])/x,(D[1]*a+D[5]*c+D[9]*f+D[13])/x,x]},Ua=(a,c,f)=>{const x=a*2-1,y=1-c*2,u=H[0]*se+S[0]*x+ve[0]*y,M=H[1]*se+S[1]*x+ve[1]*y,q=H[2]*se+S[2]*x+ve[2]*y,P=(f-N[2])/Math.min(q,-.02);return[N[0]+u*P,N[1]+M*P]},qt=a=>{const c=Math.hypot(a[0],a[1],a[2]);return[a[0]/c,a[1]/c,a[2]/c]},U=[{d:[-.64,.57,.4],hx:1.25,hy:.85,grid:[4,5],bar:.03,kind:0,lc:[6.2,7.4,8.8],key:[1.12,1.3,1.52],amb:[.042,.05,.062],flr:[.01,.01,.011],pen:.24,fall:.034},{d:[.12,.28,.95],hx:1.05,hy:.7,grid:[6,3],bar:.018,kind:0,lc:[2.1,2.3,2.5],key:[.88,.94,1],amb:[.1,.105,.11],flr:[.02,.02,.02],pen:.34,fall:.012},{d:[.58,.46,.67],hx:.1,hy:.1,grid:[1,1],bar:0,kind:1,lc:[8.4,5.8,3.4],key:[1.55,1.08,.68],amb:[.016,.012,.01],flr:[.006,.005,.004],pen:.1,fall:.065},{d:[.08,-.72,.69],hx:.035,hy:.035,grid:[1,1],bar:0,kind:2,lc:[64,62,58],key:[1.75,1.72,1.66],amb:[.018,.018,.02],flr:[.005,.005,.005],pen:.012,fall:-.035}][W],oe=qt(U.d),le=qt([oe[1],-oe[0],0]),Me=[le[1]*oe[2]-le[2]*oe[1],le[2]*oe[0]-le[0]*oe[2],le[0]*oe[1]-le[1]*oe[0]];Me[2]<0&&(Me[0]*=-1,Me[1]*=-1,Me[2]*=-1);const me=V.k>0?r*.036:0,rt=[[.96,.71,.33],[.95,.72,.36],[.96,.72,.42],[.92,.72,.4]][W],qa=[1.02,.86,1.05,.9][W]*[1,1.08,1.05,.9,1][B],Ca=[.74,.74,.74][m],Ga=[.095,.125,.095][m],Xe=new Float32Array(480);Xe.set(D,0);const K=(a,c)=>Xe.set(c,a);K(16,[N[0],N[1],N[2],m===2?1:0]),K(20,[H[0],H[1],H[2],1/r]),K(24,[S[0],S[1],S[2],r*.5*se]),K(28,[ve[0],ve[1],ve[2],se]),K(32,[oe[0],oe[1],oe[2],U.pen]),K(36,[le[0],le[1],le[2],U.hx]),K(40,[Me[0],Me[1],Me[2],U.hy]),K(44,[U.grid[0],U.grid[1],U.bar,U.kind]),K(48,[U.lc[0],U.lc[1],U.lc[2],0]),K(52,[U.key[0],U.key[1],U.key[2],0]),K(56,[U.amb[0],U.amb[1],U.amb[2],0]),K(60,[U.flr[0],U.flr[1],U.flr[2],0]),K(64,[V.k,V.foc,1,qa]),K(68,[Y,Q,g,z]),K(72,[B,s,Ca,Ga]),K(76,[rt[0],rt[1],rt[2],U.fall]);for(let a=0;a<E;a++)Xe.set([O[a],X[a],Ee[a],Re[a]],80+a*4);const nt=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,nt),e.bufferData(e.UNIFORM_BUFFER,Xe,e.STATIC_DRAW);const J=new Float32Array(28),Ze=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,Ze),e.bufferData(e.UNIFORM_BUFFER,J,e.DYNAMIC_DRAW),e.bindBufferBase(e.UNIFORM_BUFFER,0,nt),e.bindBufferBase(e.UNIFORM_BUFFER,1,Ze),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DITHER),e.colorMask(!0,!0,!0,!0),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.viewport(0,0,r,r);const $=(a,c)=>{e.activeTexture(e.TEXTURE0+a),e.bindTexture(e.TEXTURE_2D,c)},ie=V.k>0,Ue=we(e,r,r),Ke=we(e,r,r),ct=we(e,r,r),Ye=ie?we(e,r,r):null,st=ie?we(e,r,r):null,it=ie?we(e,r,r):null,Ct=ge(e,Ue),Gt=ge(e,Ke),Va=ge(e,ct),lt=ie?ge(e,Ye):null,Vt=ie?ge(e,st):null,Ot=ie?ge(e,it):null,ft=e.createRenderbuffer(),ut=e.createRenderbuffer(),je=e.createFramebuffer();e.bindRenderbuffer(e.RENDERBUFFER,ft),e.renderbufferStorageMultisample(e.RENDERBUFFER,kt,e.RGBA8,r,r),e.bindRenderbuffer(e.RENDERBUFFER,ut),e.renderbufferStorageMultisample(e.RENDERBUFFER,kt,e.DEPTH_COMPONENT24,r,r),e.bindFramebuffer(e.FRAMEBUFFER,je),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ft),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,ut),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,1),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),$(0,n.noise),e.bindVertexArray(n.empty),e.useProgram(n.table.p),e.uniform1i(n.table.u.uN,0),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindVertexArray(n.caseVao),e.useProgram(n.kase.p),e.uniform1i(n.kase.u.uN,0),e.uniform1i(n.kase.u.uT,1),$(1,n.glyph),e.drawElementsInstanced(e.TRIANGLES,n.cm.caseCount,e.UNSIGNED_SHORT,0,E);const Ht=a=>{e.bindFramebuffer(e.READ_FRAMEBUFFER,je),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,a),e.blitFramebuffer(0,0,r,r,0,0,r,r,e.COLOR_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,je)};Ht(Ct),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.depthMask(!1),e.useProgram(n.glass.p),e.uniform1i(n.glass.u.uN,0),e.drawElementsInstanced(e.TRIANGLES,n.cm.glassCount,e.UNSIGNED_SHORT,n.cm.glassStart*2,E),Ht(Gt),e.disable(e.DEPTH_TEST),e.depthMask(!0),e.bindVertexArray(n.empty),e.useProgram(n.dof.p),e.uniform1i(n.dof.u.uC,0),e.uniform1i(n.dof.u.uS,1);const Qe=(a,c,f,x)=>{e.bindFramebuffer(e.FRAMEBUFFER,a),$(0,c),$(1,Ue),e.uniform4f(n.dof.u.uR,f,me,1/r,x),e.drawArrays(e.TRIANGLES,0,3)};ie&&(Qe(lt,Ue,me,1),Qe(Vt,Ye,me*.4+1,0),Qe(lt,Ke,me,1),Qe(Ot,Ye,me*.4+1,0));const vt=ie?it:Ke;e.bindFramebuffer(e.FRAMEBUFFER,Va),e.useProgram(n.comp.p),e.uniform1i(n.comp.u.uA,0),e.uniform1i(n.comp.u.uG,1),$(0,ie?st:Ue),$(1,vt),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteRenderbuffer(ft),e.deleteRenderbuffer(ut),e.deleteFramebuffer(je);for(const a of[Ct,Gt,lt,Vt,Ot])a&&e.deleteFramebuffer(a);for(const a of[Ue,Ye,st,ie?Ke:it])a&&e.deleteTexture(a);const _e=new Float32Array(E*4),qe=new Float32Array(E*3),Wt=e.createVertexArray();e.bindVertexArray(Wt),e.bindBuffer(e.ARRAY_BUFFER,n.quad),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.vertexAttribDivisor(0,0);const Xt=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Xt),e.bufferData(e.ARRAY_BUFFER,_e.byteLength,e.DYNAMIC_DRAW),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,0,0),e.vertexAttribDivisor(1,1);const Zt=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Zt),e.bufferData(e.ARRAY_BUFFER,qe.byteLength,e.DYNAMIC_DRAW),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,3,e.FLOAT,!1,0,0),e.vertexAttribDivisor(2,1),e.bindVertexArray(null);const Kt=[1,1.7,.32][i],mt=I+(v()-.5)*.24,Yt=[1.2,.72,1.2][m],ht=2*Math.PI*Yt*(2*Math.PI*Yt),Oa=[.42,.3,11][m],jt=[.028,.02,.006][m],Ha=R===3?.2:.42,dt=new Float64Array(E),Le=new Float64Array(E),he=new Float64Array(E),de=new Float64Array(E),Qt=new Float64Array(E),$t=new Float64Array(E),$e=new Float64Array(E),Jt=new Float64Array(E),Je=new Float32Array(E);for(let a=0;a<E;a++)Je[a]=.94+v()*.1;const pt=[],ea=[],ta=[],aa=[],oa=[];for(let a=0;a<E;a++)for(let c=a+1;c<E;c++){const f=O[c]-O[a],x=X[c]-X[a],y=Math.hypot(f,x);y<g*2.3&&(pt.push(a),ea.push(c),ta.push(f/y),aa.push(x/y),oa.push(Ha*Math.pow(2.5/y,3)*Je[a]*Je[c]))}const Wa=pt.length,Xa=Int32Array.from(pt),Za=Int32Array.from(ea),Ka=Float64Array.from(ta),Ya=Float64Array.from(aa),ja=Float64Array.from(oa),Qa=(v()-.5)*14,$a=(v()-.5)*10-2,ra=v()*6.28,Ae=new Float64Array(E).fill(1);if(p===2)for(let a=0;a<E;a++)v()<.12&&(Ae[a]=-1);const na=[[[3.1,0,0,125],[-3.1,0,0,-125]],[[1,0,-.2,170],[-1,0,-.2,-170]],[[3.6,0,0,92],[-3.6,0,0,-92]],[[2.2,0,0,95],[-2.2,0,0,-95],[0,2.2,.34,95],[0,-2.2,.34,-95]]][l],et=[1.05,1.14,1.1,1.3][l],ca=[1.1,1.1,1,1.2][l];let xt=t.home?1.6:(v()-.5)*7,bt=t.home?-6.2:-6.5+(v()-.5)*4;R===2&&(xt=(.3+xt*.08)*ue,bt=(-6.9+bt*.02)*ue);const sa=F?Fe:xt,ia=F?te:bt,yt=et+130,wt=t.home?0:v(),gt=t.home?.55:l===1?Math.atan2(S[1],S[0])+(wt-.5)*1.1+(wt<.5?0:Math.PI):wt*6.28,o={x:sa+.5,y:ia-.3,z:et,vx:-.2,vy:.3,vz:0,yaw:gt,yt:gt,y0:gt,yv:0,lean:0,ax:sa,ay:ia,tw:0,kick:v()*6.28},A={m:0,t:0,down:!1,dn:0,sx:0,sy:0,moved:0,last:0,lift:0,sndT:0};let so=0;const Et=()=>{const a=Math.cos(o.yaw),c=Math.sin(o.yaw),f=Math.cos(mt)*Kt,x=Math.sin(mt)*Kt,y=p===1?Math.cos(ra):0,u=p===1?Math.sin(ra):0;for(let M=0;M<E;M++){let q=f,P=x;for(let C=0;C<na.length;C++){const G=na[C],ee=o.x+a*G[0]-c*G[1],Z=o.y+c*G[0]+a*G[1],fe=o.z+G[2]-.3,re=O[M]-ee,Te=X[M]-Z,Ge=-fe,Ve=re*re+Te*Te+Ge*Ge+.15,at=G[3]/(Ve*Math.sqrt(Ve));q+=re*at,P+=Te*at}if(p===1){const C=O[M]-Qa,G=X[M]-$a,ee=C*C+G*G+6,Z=1/Math.sqrt(ee),fe=(C*y+G*u)*Z,re=62*Z*Z*Z;q+=(3*fe*C*Z-y)*re,P+=(3*fe*G*Z-u)*re}Qt[M]=q,$t[M]=P}},pe=1/90,Rt=()=>{$e.fill(0);for(let a=0;a<Wa;a++){const c=Xa[a],f=Za[a],x=Ka[a],y=Ya[a],u=ja[a],M=he[c]*Ae[c],q=de[c]*Ae[c],P=he[f]*Ae[f],C=de[f]*Ae[f],G=M*x+q*y,ee=P*x+C*y,Z=M*y-q*x,fe=P*y-C*x,re=M*C-q*P;$e[f]+=u*(3*G*fe+re),$e[c]+=u*(3*ee*Z-re)}for(let a=0;a<E;a++){const c=he[a],f=de[a],x=Ae[a],y=($e[a]*x+c*$t[a]-f*Qt[a])*ht*x;let u=Le[a];if(!(u>.02||u<-.02)&&Math.abs(y)<jt*ht){Le[a]=0;continue}u+=pe*(y-Oa*u);const q=jt*ht*pe;u>0?(u-=q,u<0&&(u=0)):(u+=q,u>0&&(u=0)),Le[a]=u;const P=u*pe,C=P*P*.5,G=c*(1-C)-f*P,ee=f*(1-C)+c*P;he[a]=G,de[a]=ee}},Ft=()=>{for(let a=0;a<E;a++){const c=1/Math.hypot(he[a],de[a]);he[a]*=c,de[a]*=c}};let Ne=v()*40,tt=2.6+v()*1.2;const la=a=>{if(A.m===1){const c=Ua(t.input.x,t.input.y,ca),f=16.5,x=Math.max(-f,Math.min(f,c[0])),y=Math.max(-f-3,Math.min(f+1,c[1])),u=170,M=25;o.vx+=a*(u*(x-o.x)-M*o.vx),o.vy+=a*(u*(y-o.y)-M*o.vy),o.vz+=a*(70*(ca-o.z)-16*o.vz),o.z>7&&(o.x=x+(o.x-x)*.9,o.y=y+(o.y-y)*.9)}else if(A.m===0){Ne+=a;const c=2*Math.PI/3.4,f=.45+.3*Math.sin(Ne*.13+o.kick),x=Math.cos(Ne*.31+1.3*Math.sin(Ne*.07)+o.kick)*f,y=Math.sin(Ne*.23+1.1*Math.cos(Ne*.05))*f;if(o.vx+=a*(-c*c*(o.x-o.ax)-.16*o.vx+x),o.vy+=a*(-c*c*(o.y-o.ay)-.16*o.vy+y),o.vz+=a*(22*(et-o.z)-9*o.vz),tt-=a,tt<=0){const u=v()*6.283,M=.5+v()*.9;o.vx+=Math.cos(u)*M,o.vy+=Math.sin(u)*M,o.tw+=(v()<.5?-1:1)*(.12+v()*.3),tt=4+v()*9}o.tw*=1-a*.16,o.yt=o.y0+o.tw}else o.vz+=a*(32*(46-o.z)*.3-5*o.vz),o.vx+=a*(-.6*o.vx),o.vy+=a*(-.6*o.vy);o.x+=a*o.vx,o.y+=a*o.vy,o.z+=a*o.vz,o.yv+=a*(70*(o.yt-o.yaw)-9.5*o.yv),o.yaw+=a*o.yv,o.lean+=a*((o.vx*Math.cos(o.yaw)+o.vy*Math.sin(o.yaw))*-.02-o.lean)*6};for(let a=0;a<E;a++)dt[a]=mt+(v()-.5)*.3+(Ae[a]<0?Math.PI:0),Le[a]=0,he[a]=Math.cos(dt[a]),de[a]=Math.sin(dt[a]);{const a=[o.x,o.y,o.z,o.yaw],c=(v()-.5)*6,f=(v()-.5)*6,x=v()*6.28;for(let y=0;y<330;y++){if(y%3===0){const u=y/330;o.z=1.3+36*Math.max(0,u-.72)*Math.max(0,u-.72)*12,o.yaw=x+u*3,o.x=u<.36?-15+30*(u/.36):15-30*Math.min(1,(u-.36)/.36),o.y=(u<.36?c:f)+(u-.36)*8,Et(),Ft()}Rt()}o.x=a[0],o.y=a[1],o.z=a[2],o.yaw=a[3]}o.z=et+1.2,o.vz=0;for(let a=0;a<330;a++)a%3===0&&(la(pe*3),Et(),Ft()),Rt();tt=2.3+v()*.9;const Ja=[[0,0,3.1,.3,0,0,0,0],[-1,0,.3,.3,1,0,.3,.3],[0,0,3.6,.15,0,0,0,0],[0,0,2.2,.3,0,0,.3,2.2]][l],Mt=[[.46,.03,.022],[.42,.028,.02],[.03,.035,.06],[.46,.03,.022]][l],At=[[.05,.055,.07],[.38,.025,.02],[.03,.035,.06],[.05,.055,.07]][l];let Ce=0,fa=v()*100,eo=0;const to=[0,2,4,7,9],ua=(a,c)=>{const f=Math.min(c,.04)*.9;for(let _=0;_<E;_++)_e[_*4]=O[_],_e[_*4+1]=X[_],_e[_*4+2]=he[_],_e[_*4+3]=de[_],qe[_*3]=Le[_],qe[_*3+1]=Je[_],qe[_*3+2]=Re[_];e.bindBuffer(e.ARRAY_BUFFER,Xt),e.bufferSubData(e.ARRAY_BUFFER,0,_e),e.bindBuffer(e.ARRAY_BUFFER,Zt),e.bufferSubData(e.ARRAY_BUFFER,0,qe);const x=[3.25,1.4,3.8,2.4][l],y=[.36,.4,.2,2.4][l],u=[-.32,-.3,-.2,-.25][l],M=[.3,2.65,.2,.6][l],q=Math.cos(o.yaw),P=Math.sin(o.yaw);let C=9,G=-9,ee=9,Z=-9,fe=1e9;const re=o.lean;for(let _=-1;_<=1;_+=2)for(let ne=-1;ne<=1;ne+=2)for(let ce=0;ce<2;ce++){const xe=_*x,ze=ne*y,Lt=(ce?M:u)+re*xe,be=De(o.x+q*xe-P*ze,o.y+P*xe+q*ze,o.z+Lt);be[2]>0&&(C=Math.min(C,be[0]),G=Math.max(G,be[0]),ee=Math.min(ee,be[1]),Z=Math.max(Z,be[1]),fe=Math.min(fe,be[2]))}const Te=G>-1.2&&C<1.2&&Z>-1.2&&ee<1.2,Ge=Se([o.x-N[0],o.y-N[1],o.z-N[2]],H),Ve=Math.abs(Math.max(-1,Math.min(1,V.k*(Ge-V.foc)/Ge)))*me,at=(Ve*2.2+3)/r,Oe=Math.max(G-C,Z-ee)*.5+at+.02,Tt=(C+G)*.5,zt=(ee+Z)*.5;J.set([o.x,o.y,o.z,o.yaw],0),J.set(Ja,4);const va=[.27,2.48,.17,.54][l],_t=o.z+va,oo=(o.ax-o.x)/(yt-_t),ro=(o.ay-o.y)/(yt-_t);if(J.set([Mt[0],Mt[1],Mt[2],va],12),J.set([Tt,zt,Oe,me],16),J.set([At[0],At[1],At[2],f],20),J.set([oo,ro,l,o.lean],24),e.bindBufferBase(e.UNIFORM_BUFFER,0,nt),e.bindBufferBase(e.UNIFORM_BUFFER,1,Ze),e.bindBuffer(e.UNIFORM_BUFFER,Ze),e.bufferSubData(e.UNIFORM_BUFFER,0,J),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.DITHER),e.colorMask(!0,!0,!0,!0),e.depthMask(!0),$(0,n.noise),Te&&(e.bindFramebuffer(e.FRAMEBUFFER,n.magF),e.viewport(0,0,ye,ye),e.clearColor(0,0,0,0),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.disable(e.BLEND),e.useProgram(n.mag.p),e.uniform1i(n.mag.u.uN,0),e.bindVertexArray(n.mags[l].vao),e.drawElements(e.TRIANGLES,n.mags[l].n,e.UNSIGNED_SHORT,0),e.flush(),e.bindTexture(e.TEXTURE_2D,n.magT),e.generateMipmap(e.TEXTURE_2D),e.disable(e.DEPTH_TEST)),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,r,r),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.bindVertexArray(n.empty),e.useProgram(n.final.p),e.uniform1i(n.final.u.uF,0),e.uniform1i(n.final.u.uN,1),e.uniform4f(n.final.u.uG,fa,fa*1.37%1,1/256,.016),$(0,ct),$(1,n.noise),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(n.needle.p),e.uniform1i(n.needle.u.uN,0),e.uniform1i(n.needle.u.uG,1),$(0,n.noise),$(1,vt),e.bindVertexArray(Wt),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,E),Te||o.z<30){e.enable(e.SCISSOR_TEST);const _=Math.max(x,y)+o.z*1.3+2.4,ne=De(o.x+_,o.y,.4),ce=De(o.x,o.y-_,.4),xe=De(o.x,o.y+_,.4),ze=De(o.x-_,o.y,.4),Lt=Math.min(ne[0],ze[0],ce[0],xe[0]),be=Math.max(ne[0],ze[0],ce[0],xe[0]),no=Math.min(ne[1],ze[1],ce[1],xe[1]),co=Math.max(ne[1],ze[1],ce[1],xe[1],Z),ma=Math.max(0,(Lt*.5+.5)*r-4|0),ha=Math.max(0,(no*.5+.5)*r-4|0);e.scissor(ma,ha,Math.max(0,Math.min(r,(be*.5+.5)*r+6|0)-ma),Math.max(0,Math.min(r,(co*.5+.5)*r+6|0)-ha)),e.useProgram(n.over.p),e.uniform1i(n.over.u.uG,0),e.uniform1i(n.over.u.uB,1),$(0,vt),$(1,ct),e.bindVertexArray(n.empty),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.SCISSOR_TEST)}if(Te){e.bindVertexArray(n.empty),e.useProgram(n.spr.p),e.uniform1i(n.spr.u.uT,0),$(0,n.magT),e.enable(e.SCISSOR_TEST);const _=Math.max(0,((Tt-Oe)*.5+.5)*r-2|0),ne=Math.max(0,((zt-Oe)*.5+.5)*r-2|0);e.scissor(_,ne,Math.max(0,Math.min(r,((Tt+Oe)*.5+.5)*r+3|0)-_),Math.max(0,Math.min(r,((zt+Oe)*.5+.5)*r+3|0)-ne)),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.SCISSOR_TEST);const ce=Math.max(.55,r*.0013,Ve*.9);J.set([o.x,o.y,_t,.0125*se*r*.5],20),J.set([o.ax,o.ay,yt,ce],24),J.set([Math.max(ce,r*.0018),0,0,me],16),J[15]=1,e.bufferSubData(e.UNIFORM_BUFFER,0,J),e.useProgram(n.line.p),e.drawArrays(e.TRIANGLE_STRIP,0,4)}e.disable(e.BLEND),e.bindVertexArray(null)},ao=(a,c)=>{c=Math.min(c,.13);const f=t.input;f.taps(),f.down&&!A.down&&(A.down=!0,A.dn=a,A.sx=f.x,A.sy=f.y,A.moved=0),A.down&&f.down&&(A.moved=Math.max(A.moved,Math.hypot(f.x-A.sx,f.y-A.sy)),A.m!==1&&(A.moved>.03||a-A.dn>.24)&&(A.m=1,t.sound.hit("noise",.05,{cutoff:900,dur:.12}))),!f.down&&A.down&&(A.down=!1,A.m===1?(A.m=2,A.lift=a,t.sound.hit("noise",.05,{cutoff:500,dur:.3})):(o.yt+=Math.PI,o.y0+=Math.PI,A.m===2&&(A.m=0,o.vz=-2,o.x=o.ax+(f.x-.5)*2,o.y=o.ay),t.sound.hit("click",.4),t.sound.note(45,{dur:.3,vel:.06,wave:"sine",cutoff:500}))),A.m===2&&a-A.lift>11&&(A.m=0,o.x=o.ax+1.4,o.y=o.ay,o.vx=0,o.vy=0,o.z=30,o.vz=-6),Ce+=c;let x=0;for(;Ce>=pe&&x<13;)Ce-=pe,x++,eo++%3===0&&(la(pe*3),Et()),Rt();Ce>pe&&(Ce=0),Ft();let y=2;A.sndT-=c;for(let u=0;u<E;u++){const M=Math.abs(Le[u]),q=Jt[u];if(M>5.5&&q<=5.5&&y>0&&A.sndT<=0){y--,A.sndT=.06;const P=u/10|0;t.sound.note(79+to[u%5]+(9-P)*2,{dur:.05+.02*P,vel:.012+.012*Math.min(1,M/30),wave:"triangle",pan:u%10/4.5-1,cutoff:3600})}Jt[u]=M}ua(a,c)};return ua(0,1/30),ao}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
