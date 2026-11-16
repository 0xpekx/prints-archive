// Hundred Compasses: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/296.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(It){It&&function(){"use strict";const St=new WeakMap,Me=new Map,Bt=4,xe=512,ya=0,Z=`#version 300 es
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
`,De=`
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
`,wa=Z+`
out vec3 vP;
void main(){
  vec2 q=vec2((gl_VertexID&1)*2-1,(gl_VertexID&2)-1);
  vec3 p=vec3(q*vec2(160.,160.)+vec2(0.,100.),0.);
  vP=p; gl_Position=uVP*vec4(p,1.);
}`,ga=Z+De+`
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
}`,Dt=Z+`
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
}`,Ea=Z+De+`
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
}`,Ra=Z+De+`
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
}`,Ue=`#version 300 es
void main(){ vec2 q=vec2((gl_VertexID<<1)&2,gl_VertexID&2); gl_Position=vec4(q*2.-1.,0.,1.); }`,Fa=`#version 300 es
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
}`,Ma=Z+`
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
}`,Aa=Z+De+`
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
}`.replace("uR2()","uTm.w"),Ta=Z+`
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
}`,za=Z+`
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
}`,_a=Z+`
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
}`,La=Z+De+`
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
}`,Na=Z+`
uniform sampler2D uT; out vec4 o;
void main(){
  vec2 nd=gl_FragCoord.xy*uFwd.w*2.-1.;
  vec2 lo=uTm.xy-uTm.z, ext=vec2(2.*uTm.z);
  vec3 V=normalize(uFwd.xyz*uUp.w+uRt.xyz*nd.x+uUp.xyz*nd.y);
  vec3 P=uEye.xyz+V*((uMp.z-uEye.z)/V.z);
  float d=dot(P-uEye.xyz,uFwd.xyz);
  float s=abs(clamp(uCoc.x*(d-uCoc.y)/d,-1.,1.))*uTm.w;
  vec2 k=uFwd.w*2./ext;
  float lod=max(log2(max(s,1.)*.55*k.x*${xe}.),0.);
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
}`,Pa=Z+`
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
}`,ka=Z+`
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
}`,Ia={table:[wa,ga],kase:[Dt,Ea],glass:[Dt,Ra],dof:[Ue,Fa],comp:[Ue,Ma],needle:[Aa,Ta],over:[Ue,za],mag:[_a,La],spr:[Ue,Na],line:[Pa,ka],final:[Ue,`#version 300 es
precision highp float;
uniform sampler2D uF, uN; uniform vec4 uG;
out vec4 o;
void main(){
  vec3 c=texelFetch(uF,ivec2(gl_FragCoord.xy),0).rgb;
  float n=texture(uN,gl_FragCoord.xy*uG.z+uG.xy).r+texture(uN,gl_FragCoord.xy*uG.z*.73+uG.yx).g-1.;
  float l=dot(c,vec3(.3,.6,.1));
  c+=n*uG.w*(1.-l*.7);
  o=vec4(c,1.);
}`]};function Ut(t,e,r){const c=new Map;for(const d of r){const[u,B]=Ia[d],P=t.createProgram();let x=c.get(u);x||(x=t.createShader(t.VERTEX_SHADER),t.shaderSource(x,u),t.compileShader(x),c.set(u,x));const A=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(A,B),t.compileShader(A),t.attachShader(P,x),t.attachShader(P,A),t.deleteShader(A),t.linkProgram(P),e.raw[d]=P}for(const d of c.values())t.deleteShader(d);t.flush()}function Sa(t,e){for(const r in e.raw)e[r]=Ba(t,e.raw[r]),delete e.raw[r]}function Ba(t,e){ya&&!t.getProgramParameter(e,t.LINK_STATUS)&&console.error("296 link",t.getProgramInfoLog(e));const r={};for(const u of["uN","uC","uS","uR","uA","uG","uB","uT","uF"])r[u]=t.getUniformLocation(e,u);const c=t.getUniformBlockIndex(e,"S"),d=t.getUniformBlockIndex(e,"D");return c!==t.INVALID_INDEX&&t.uniformBlockBinding(e,c,0),d!==t.INVALID_INDEX&&t.uniformBlockBinding(e,d,1),t.useProgram(e),{p:e,u:r}}function Ae(t,e,r,c){const d=t.createTexture();return t.bindTexture(t.TEXTURE_2D,d),t.texStorage2D(t.TEXTURE_2D,c?(Math.log2(e)|0)+1:1,t.RGBA8,e,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,c?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),d}function Te(t,e){const r=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),r}function Da(){const t=(n,h,v,l,F,R,T,M)=>{const m=[];for(let p=0;p<=R;p++){const E=(l+(F-l)*p/R)*Math.PI/180;m.push([n+v*Math.cos(E),h+v*Math.sin(E),T,M])}return m},e=[[.968,0,0,.28],[1,.03,0,.62],[1,.2,0,.95],[1,.385,0,.85],...t(1,.425,.042,-90,90,5,0,1),[.995,.468,2,.42],[.997,.474,2,.9],[.997,.553,2,.95],...t(.94,.558,.062,0,100,5,1,1),[.9,.612,1,1],[.872,.592,1,.9],[.856,.566,1,.6],[.85,.555,3,.42],[.85,.45,3,.34],[.85,.33,3,.24]],r=56,c=[],d=[],u=[];for(let n=0;n<e.length-1;n++){const h=e[n],v=e[n+1],l=v[0]-h[0],F=v[1]-h[1],R=Math.hypot(l,F)||1;u.push([F/R,-l/R])}for(let n=0;n<e.length-1;n++){const h=e[n],v=e[n+1],l=u[n],F=m=>{if(m<0||m>=u.length)return l;const p=u[m];if(l[0]*p[0]+l[1]*p[1]<.55)return l;const E=l[0]+p[0],L=l[1]+p[1],k=Math.hypot(E,L);return[E/k,L/k]},R=F(n-1),T=F(n+1),M=c.length/8;for(let m=0;m<=r;m++){const p=m/r*Math.PI*2,E=Math.cos(p),L=Math.sin(p);c.push(h[0]*E,h[0]*L,h[1],R[0]*E,R[0]*L,R[1],h[2],h[3]),c.push(v[0]*E,v[0]*L,v[1],T[0]*E,T[0]*L,T[1],h[2],v[3])}for(let m=0;m<r;m++){const p=M+m*2;d.push(p,p+2,p+1,p+1,p+2,p+3)}}const B=c.length/8;for(const[n,h]of[[0,1],[.5,1],[.85,.5]])for(let v=0;v<=r;v++){const l=v/r*Math.PI*2;c.push(n*Math.cos(l),n*Math.sin(l),Ua,0,0,1,4,h)}for(let n=0;n<2;n++)for(let h=0;h<r;h++){const v=B+n*(r+1)+h,l=v+r+1;d.push(v,v+1,l,l,v+1,l+1)}const P=(n,h,v,l,F,R)=>{const T=c.length/8,M=20,m=8;for(let p=0;p<=M;p++)for(let E=0;E<=m;E++){const L=p/M*Math.PI*2,k=E/m*Math.PI*2,j=Math.cos(L),K=Math.sin(L);let g=j*Math.cos(k),te=K*Math.cos(k),Q=Math.sin(k);const ze=j*(v+l*Math.cos(k)),se=K*(v+l*Math.cos(k)),ie=l*Math.sin(k),le=Math.cos(F),H=Math.sin(F);c.push(n+ze*le-ie*H,se,h+ze*H+ie*le,g*le-Q*H,te,g*H+Q*le,R,.95)}for(let p=0;p<M;p++)for(let E=0;E<m;E++){const L=T+p*(m+1)+E,k=L+m+1;d.push(L,k,L+1,L+1,k,k+1)}};P(1+.16,.135,.135,.024,-.62,6),P(1.012,.25,.045,.022,1.2,0);const x=d.length,A=d.length,y=c.length/8;c.push(0,0,qt,0,0,1,5,1);for(let n=0;n<=r;n++){const h=n/r*Math.PI*2;c.push(.852*Math.cos(h),.852*Math.sin(h),qt,0,0,1,5,1)}for(let n=0;n<r;n++)d.push(y,y+1+n,y+2+n);return{v:new Float32Array(c),i:new Uint16Array(d),caseCount:x,glassStart:A,glassCount:d.length-A}}const Ua=.33,qt=.555;function Ct(t,e,r,c,d,u){const P=[];for(let y=0;y<16;y++){const n=y/16*Math.PI*2,h=Math.cos(n),v=Math.sin(n),l=u?2:4.5,F=Math.sign(h)*Math.pow(Math.abs(h),2/l),R=Math.sign(v)*Math.pow(Math.abs(v),2/l),T=Math.hypot(Math.sign(h)*Math.pow(Math.abs(h),2-2/l),Math.sign(v)*Math.pow(Math.abs(v),2-2/l))||1;P.push([F,R,Math.sign(h)*Math.pow(Math.abs(h),2-2/l)/T,Math.sign(v)*Math.pow(Math.abs(v),2-2/l)/T,u?0:Math.abs(Math.abs(F)*Math.abs(R))])}const x=r.length,A=t.length/8;for(let y=0;y<x;y++){const n=r[y],h=r[Math.min(x-1,y+1)],v=r[Math.max(0,y-1)];let l=h[0]-v[0],F=h[2]-v[2];const R=Math.hypot(l,F)||1;l/=R,F/=R;const T=-F,M=l;for(let m=0;m<=16;m++){const p=P[m%16],E=n[4]||1;t.push(n[0]+T*p[1]*d*E,n[1]+p[0]*c*E,n[2]+M*p[1]*d*E,T*p[3],p[2],M*p[3],n[3],E<1?1:p[4])}}for(let y=0;y<x-1;y++)for(let n=0;n<16;n++){const h=A+y*17+n,v=h+16+1;e.push(h,v,h+1,h+1,v,v+1)}for(const y of[0,x-1]){const n=r[y],h=r[y===0?1:x-2];let v=n[0]-h[0],l=n[2]-h[2];const F=Math.hypot(v,l)||1;v/=F,l/=F;const R=-l,T=v,M=t.length/8;t.push(n[0],n[1],n[2],v,0,l,n[3],0);for(let m=0;m<=16;m++){const p=P[m%16],E=n[4]||1;t.push(n[0]+R*p[1]*d*E,n[1]+p[0]*c*E,n[2]+T*p[1]*d*E,v,0,l,n[3],.3)}for(let m=0;m<16;m++)e.push(M,M+1+m,M+2+m)}}function qa(t){const e=[],r=[],c=(d,u,B,P,x)=>{const A=[],y=[-1,-.985,-.96,-.5,-.06,-.05,-.04,0,.04,.05,.06,.5,.96,.985,1];for(const n of y)A.push([n*d,0,u,n,Math.abs(n)>.999?.93:1]);Ct(e,r,A,B,P,x)};if(t===0)c(3.1,0,.3,.24,!1);else if(t===1){const d=[];d.push([-1,0,-.2,-1],[-1,0,-.2+.02,-.98]);for(let x=0;x<=18;x++){const A=Math.PI-x/18*Math.PI;d.push([Math.cos(A)*1,0,1.15+Math.sin(A)*1,(x/18*2-1)*.9])}d.push([1,0,-.2+.02,.98],[1,0,-.2,1]),Ct(e,r,d,.3,.3,!1)}else if(t===2)c(3.6,0,.15,.15,!0);else{c(2.2,0,.3,.17,!1);const d=e.length;c(2.2,.34,.3,.17,!1);for(let u=d;u<e.length;u+=8){const B=e[u],P=e[u+1],x=e[u+3],A=e[u+4];e[u]=-P,e[u+1]=B,e[u+3]=-A,e[u+4]=x}}return{v:new Float32Array(e),i:new Uint16Array(r)}}function Ca(t){let e=St.get(t);if(e)return e;e={raw:{}},Ut(t,e,["kase","table","needle","glass","mag","over","spr","line","comp","final"]);let r=2654435769;const c=()=>{r=r+1831565813|0;let x=Math.imul(r^r>>>15,1|r);return x=x+Math.imul(x^x>>>7,61|x)^x,(x^x>>>14)>>>0},d=new Uint8Array(256*256*4);for(let x=0;x<d.length;x+=4){const A=c();d[x]=A&255,d[x+1]=A>>>8&255,d[x+2]=A>>>16&255,d[x+3]=A>>>24}e.noise=t.createTexture(),t.bindTexture(t.TEXTURE_2D,e.noise),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,d),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);{const y=new Uint8Array(16384),n=(R,T,M,m,p)=>[R,T,M,m,p],h=(R,T,M,m,p,E,L)=>{const k=[];for(let j=0;j<L;j++){const K=m+(p-m)*j/L,g=m+(p-m)*(j+1)/L;k.push(n(R+M*Math.cos(K),T+M*Math.sin(K),R+M*Math.cos(g),T+M*Math.sin(g),E*(.55+.45*Math.abs(Math.sin((K+g)/2)))))}return k},v=.14,l=.075,F=[[n(.24,.12,.24,.86,l),n(.76,.14,.76,.88,l),n(.24,.88,.76,.12,v),n(.13,.12,.35,.12,l),n(.13,.88,.3,.88,l),n(.65,.88,.87,.88,l)],[n(.08,.88,.3,.12,v),n(.3,.12,.5,.72,l),n(.5,.72,.7,.12,v),n(.7,.12,.92,.88,l),n(.02,.88,.18,.88,l),n(.82,.88,.98,.88,l)],[...h(.5,.685,.2,.35,4.71,v,12),...h(.5,.315,.2,1.57,-2.79,v,12),n(.72,.74,.72,.88,l),n(.28,.12,.28,.26,l)],[n(.27,.12,.27,.88,v),n(.16,.88,.78,.88,l),n(.27,.5,.64,.5,l),n(.16,.12,.8,.12,l),n(.78,.88,.78,.74,l),n(.8,.12,.8,.28,l),n(.64,.42,.64,.58,l)]];for(let R=0;R<4;R++)for(const[T,M,m,p,E]of F[R]){const L=m-T,k=p-M,j=L*L+k*k||1e-9,K=E*.5+1.5/64,g=Math.max(0,Math.floor((Math.min(T,m)-K)*64)),te=Math.min(63,Math.ceil((Math.max(T,m)+K)*64)),Q=Math.max(0,Math.floor((Math.min(M,p)-K)*64)),ze=Math.min(63,Math.ceil((Math.max(M,p)+K)*64));for(let se=Q;se<=ze;se++)for(let ie=g;ie<=te;ie++){const le=(ie+.5)/64,H=(se+.5)/64,be=Math.max(0,Math.min(1,((le-T)*L+(H-M)*k)/j)),I=Math.max(0,Math.min(255,(.5-(Math.hypot(le-T-L*be,H-M-k*be)-E*.5)*64)*255))|0,ae=se*256+R*64+ie;I>y[ae]&&(y[ae]=I)}}e.glyph=t.createTexture(),t.bindTexture(t.TEXTURE_2D,e.glyph),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R8,256,64,0,t.RED,t.UNSIGNED_BYTE,y),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}const u=Da();e.cm=u,e.caseVao=t.createVertexArray(),t.bindVertexArray(e.caseVao);const B=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,B),t.bufferData(t.ARRAY_BUFFER,u.v,t.STATIC_DRAW);const P=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,P),t.bufferData(t.ELEMENT_ARRAY_BUFFER,u.i,t.STATIC_DRAW);for(const[x,A,y]of[[0,3,0],[1,3,12],[2,2,24]])t.enableVertexAttribArray(x),t.vertexAttribPointer(x,A,t.FLOAT,!1,32,y);e.mags=[];for(let x=0;x<4;x++){const A=qa(x),y=t.createVertexArray();t.bindVertexArray(y);const n=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,A.v,t.STATIC_DRAW);const h=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,h),t.bufferData(t.ELEMENT_ARRAY_BUFFER,A.i,t.STATIC_DRAW);for(const[v,l,F]of[[0,3,0],[1,3,12],[2,2,24]])t.enableVertexAttribArray(v),t.vertexAttribPointer(v,l,t.FLOAT,!1,32,F);e.mags.push({vao:y,n:A.i.length})}return e.empty=t.createVertexArray(),e.quad=t.createBuffer(),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,e.quad),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW),e.magT=Ae(t,xe,xe,!0),e.magF=Te(t,e.magT),e.magD=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,e.magD),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,xe,xe),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,e.magD),t.bindFramebuffer(t.FRAMEBUFFER,null),St.set(t,e),e}It.add({num:296,name:"Hundred Compasses",fam:"Worlds",recipe:"A hundred brass pocket compasses on a bench with a bar magnet hanging over them, and every needle really gets pulled by the earth, the magnet and its neighbours. The spacing, the layout, the light and the magnet change every mint. Drag to carry the magnet across, tap to flip it, or let go and it lifts away while the needles settle back to north or lock into patterns with each other.",interactive:"Drag to carry the magnet across the compasses, tap to flip it, let go and it lifts away while the needles settle back to north or lock into domains.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,r=t.size,c=Ca(e);let d=2166136261;for(let a=2;a<t.hash.length;a++)d^=t.hash.charCodeAt(a),d=Math.imul(d,16777619);const u=()=>{d=d+1831565813|0;let a=Math.imul(d^d>>>15,1|d);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},B=(a,s,i)=>{let b=0;for(const z of s)b+=z[1];let w=u()*b,f=0;for(;f<s.length-1&&w>=s[f][1];)w-=s[f][1],f++;return t.home&&(f=i),t.trait(a,s[f][0]),f},P=B("Array",[["Square ranks",50],["Staggered",25],["Close-set",18],["Scattered by hand",7]],0),x=B("Bench",[["Soapstone",40],["Waxed oak",25],["Green baize",18],["Zinc",14],["Black plate glass",3]],0),A=B("Light",[["North window",45],["Skylight",24],["One lamp at night",23],["Flash",8]],0),y=B("Magnet",[["Bar",50],["Horseshoe",30],["Steel rod",16],["Crossed bars",4]],0),n=B("Card",[["Ticks",40],["Rose",36],["Silvered",19],["Black dial",5]],0),h=B("Needle",[["Dry pivot",58],["Heavy",22],["Spirit-filled",20]],0),v=B("Latitude",[["Middle",68],["Strong north",16],["Near the pole",16]],0),l=B("Under the bench",[["Nothing",84],["Hidden iron",11],["Reversed needles",5]],0);let F=B("Lens",[["Close",50],["Long",28],["Low",22]],0),R=795581719;for(let a=2;a<t.hash.length;a++)R^=t.hash.charCodeAt(a),R=Math.imul(R,16777619);const T=()=>{R=R+1831565813|0;let a=Math.imul(R^R>>>15,1|R);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296};!t.home&&T()<.16&&(F=3,t.trait("Lens","From above"));const M=!t.home&&T()<.14;M&&(t.trait("Array","Rings round the magnet"),F=3,t.trait("Lens","From above"));let m=1779033703;for(let a=2;a<t.hash.length;a++)m^=t.hash.charCodeAt(a),m=Math.imul(m,16777619);const p=()=>{m=m+1831565813|0;let a=Math.imul(m^m>>>15,1|m);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296};!t.home&&F!==3&&p()<.1&&(F=3,t.trait("Lens","From above")),F===2&&(l===1||v===2)&&(F=1,t.trait("Lens","Long")),F===2&&!c.dof&&!c.raw.dof&&Ut(e,c,["dof"]);const E=[2.5,2.62,2.14,2.8][P],L=P===1?.88:P===2?.866:1,k=(P===3?-.2:-.32)+(u()-.5)*.16,j=Math.cos(k),K=Math.sin(k),g=100,te=new Float64Array(g),Q=new Float64Array(g),ze=new Float32Array(g),se=new Float32Array(g);for(let a=0;a<10;a++)for(let s=0;s<10;s++){const i=s+a*10,b=P===3?.3:.045,w=(s-4.5+(P===1||P===2?a&1?.25:-.25:0))*E+(u()-.5)*2*b,f=(a-4.5)*E*L+(u()-.5)*2*b;te[i]=j*w-K*f,Q[i]=K*w+j*f,ze[i]=k+Math.PI/4+Math.floor(u()*4)*Math.PI/2+(u()-.5)*.7,se[i]=u()}const ie=M?(T()-.5)*3:0,le=M?-4.6+(T()-.5)*2.4:0;if(M){const a=E*1.04;let s=0;for(let i=0;s<g;i++){const b=(i+.55)*a,w=Math.floor(2*Math.PI*b/a),f=Math.min(w,g-s),z=T()*6.283;for(let C=0;C<f;C++,s++){const S=z+6.283*(C+(T()-.5)*.12)/f;te[s]=ie+b*Math.cos(S),Q[s]=le+b*Math.sin(S)}}}const H=[{e:[-4.5,-21,19],t:[-.3,-2.4,0],f:42,foc:1,k:0},{e:[-7,-30,27],t:[0,-.8,0],f:37,foc:1,k:0},{e:[-3.5,-16.5,4.2],t:[.6,-5.6,.6],f:44,foc:10.6,k:.42},{e:[-8.3,-14.6,27],t:[-1,-3,0],f:34,foc:32.5,k:0}][F],be=E*Math.sqrt(L)/2.5,I=H.e.map(a=>a*be),ae=H.t.map(a=>a*be);if(!t.home&&F<2){const a=(p()-.5)*1.5,s=.9+p()*.25,i=Math.cos(a),b=Math.sin(a),w=I[0]-ae[0],f=I[1]-ae[1];I[0]=ae[0]+i*w-b*f,I[1]=ae[1]+b*w+i*f,I[2]=ae[2]+(I[2]-ae[2])*s}H.foc*=be;const Gt=ae[0]-I[0],Vt=ae[1]-I[1],Ot=ae[2]-I[2],st=Math.hypot(Gt,Vt,Ot),O=[Gt/st,Vt/st,Ot/st];let D=[O[1],-O[0],0];const Ht=Math.hypot(D[0],D[1]);D=[D[0]/Ht,D[1]/Ht,0];const ye=[D[1]*O[2]-D[2]*O[1],D[2]*O[0]-D[0]*O[2],D[0]*O[1]-D[1]*O[0]],Ga=Math.tan(H.f*Math.PI/360),fe=1/Ga,Ke=.5,Ze=200,qe=(a,s)=>a[0]*s[0]+a[1]*s[1]+a[2]*s[2],U=new Float32Array(16);{const a=(Ze+Ke)/(Ze-Ke),s=-2*Ze*Ke/(Ze-Ke);for(let i=0;i<3;i++)U[i*4]=fe*D[i],U[i*4+1]=fe*ye[i],U[i*4+2]=a*O[i],U[i*4+3]=O[i];U[12]=-fe*qe(D,I),U[13]=-fe*qe(ye,I),U[14]=-a*qe(O,I)+s,U[15]=-qe(O,I)}const Ce=(a,s,i)=>{const b=U[3]*a+U[7]*s+U[11]*i+U[15];return[(U[0]*a+U[4]*s+U[8]*i+U[12])/b,(U[1]*a+U[5]*s+U[9]*i+U[13])/b,b]},Va=(a,s,i)=>{const b=a*2-1,w=1-s*2,f=O[0]*fe+D[0]*b+ye[0]*w,z=O[1]*fe+D[1]*b+ye[1]*w,C=O[2]*fe+D[2]*b+ye[2]*w,S=(i-I[2])/Math.min(C,-.02);return[I[0]+f*S,I[1]+z*S]},Wt=a=>{const s=Math.hypot(a[0],a[1],a[2]);return[a[0]/s,a[1]/s,a[2]/s]},q=[{d:[-.64,.57,.4],hx:1.25,hy:.85,grid:[4,5],bar:.03,kind:0,lc:[6.2,7.4,8.8],key:[1.12,1.3,1.52],amb:[.042,.05,.062],flr:[.01,.01,.011],pen:.24,fall:.034},{d:[.12,.28,.95],hx:1.05,hy:.7,grid:[6,3],bar:.018,kind:0,lc:[2.1,2.3,2.5],key:[.88,.94,1],amb:[.1,.105,.11],flr:[.02,.02,.02],pen:.34,fall:.012},{d:[.58,.46,.67],hx:.1,hy:.1,grid:[1,1],bar:0,kind:1,lc:[8.4,5.8,3.4],key:[1.55,1.08,.68],amb:[.016,.012,.01],flr:[.006,.005,.004],pen:.1,fall:.065},{d:[.08,-.72,.69],hx:.035,hy:.035,grid:[1,1],bar:0,kind:2,lc:[64,62,58],key:[1.75,1.72,1.66],amb:[.018,.018,.02],flr:[.005,.005,.005],pen:.012,fall:-.035}][A],oe=Wt(q.d),he=Wt([oe[1],-oe[0],0]),_e=[he[1]*oe[2]-he[2]*oe[1],he[2]*oe[0]-he[0]*oe[2],he[0]*oe[1]-he[1]*oe[0]];_e[2]<0&&(_e[0]*=-1,_e[1]*=-1,_e[2]*=-1);const de=H.k>0?r*.036:0,it=[[.96,.71,.33],[.95,.72,.36],[.96,.72,.42],[.92,.72,.4]][A],Oa=[1.02,.86,1.05,.9][A]*[1,1.08,1.05,.9,1][x],Ha=[.74,.74,.74][h],Wa=[.095,.125,.095][h],Ye=new Float32Array(480);Ye.set(U,0);const X=(a,s)=>Ye.set(s,a);X(16,[I[0],I[1],I[2],h===2?1:0]),X(20,[O[0],O[1],O[2],1/r]),X(24,[D[0],D[1],D[2],r*.5*fe]),X(28,[ye[0],ye[1],ye[2],fe]),X(32,[oe[0],oe[1],oe[2],q.pen]),X(36,[he[0],he[1],he[2],q.hx]),X(40,[_e[0],_e[1],_e[2],q.hy]),X(44,[q.grid[0],q.grid[1],q.bar,q.kind]),X(48,[q.lc[0],q.lc[1],q.lc[2],0]),X(52,[q.key[0],q.key[1],q.key[2],0]),X(56,[q.amb[0],q.amb[1],q.amb[2],0]),X(60,[q.flr[0],q.flr[1],q.flr[2],0]),X(64,[H.k,H.foc,1,Oa]),X(68,[j,K,E,L]),X(72,[x,n,Ha,Wa]),X(76,[it[0],it[1],it[2],q.fall]);for(let a=0;a<g;a++)Ye.set([te[a],Q[a],ze[a],se[a]],80+a*4);const lt=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,lt),e.bufferData(e.UNIFORM_BUFFER,Ye,e.STATIC_DRAW);const $=new Float32Array(28),je=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,je),e.bufferData(e.UNIFORM_BUFFER,$,e.DYNAMIC_DRAW);const Xt=[1,1.7,.32][v],ft=k+(u()-.5)*.24,Kt=[1.2,.72,1.2][h],ut=2*Math.PI*Kt*(2*Math.PI*Kt),Xa=[.42,.3,11][h],Zt=[.028,.02,.006][h],Ka=F===3?.2:.42,Ge=new Float64Array(g),we=new Float64Array(g),ue=new Float64Array(g),ve=new Float64Array(g),Qe=new Float64Array(g),$e=new Float64Array(g),ke=new Float64Array(g),Yt=new Float64Array(g),Je=new Float32Array(g);for(let a=0;a<g;a++)Je[a]=.94+u()*.1;const vt=[],jt=[],Qt=[],$t=[],Jt=[];for(let a=0;a<g;a++)for(let s=a+1;s<g;s++){const i=te[s]-te[a],b=Q[s]-Q[a],w=Math.hypot(i,b);w<E*2.3&&(vt.push(a),jt.push(s),Qt.push(i/w),$t.push(b/w),Jt.push(Ka*Math.pow(2.5/w,3)*Je[a]*Je[s]))}const Za=vt.length,Ya=Int32Array.from(vt),ja=Int32Array.from(jt),Qa=Float64Array.from(Qt),$a=Float64Array.from($t),Ja=Float64Array.from(Jt),eo=(u()-.5)*14,to=(u()-.5)*10-2,ea=u()*6.28,Le=new Float64Array(g).fill(1);if(l===2)for(let a=0;a<g;a++)u()<.12&&(Le[a]=-1);const ta=[[[3.1,0,0,125],[-3.1,0,0,-125]],[[1,0,-.2,170],[-1,0,-.2,-170]],[[3.6,0,0,92],[-3.6,0,0,-92]],[[2.2,0,0,95],[-2.2,0,0,-95],[0,2.2,.34,95],[0,-2.2,.34,-95]]][y],et=[1.05,1.14,1.1,1.3][y],aa=[1.1,1.1,1,1.2][y];let mt=t.home?1.6:(u()-.5)*7,ht=t.home?-6.2:-6.5+(u()-.5)*4;F===2&&(mt=(.3+mt*.08)*be,ht=(-6.9+ht*.02)*be);const oa=M?ie:mt,ra=M?le:ht,dt=et+130,pt=t.home?0:u(),xt=t.home?.55:y===1?Math.atan2(D[1],D[0])+(pt-.5)*1.1+(pt<.5?0:Math.PI):pt*6.28,o={x:oa+.5,y:ra-.3,z:et,vx:-.2,vy:.3,vz:0,yaw:xt,yt:xt,y0:xt,yv:0,lean:0,ax:oa,ay:ra,tw:0,kick:u()*6.28},_={m:0,t:0,down:!1,dn:0,sx:0,sy:0,moved:0,last:0,lift:0,sndT:0};let vo=0;const bt=()=>{const a=Math.cos(o.yaw),s=Math.sin(o.yaw),i=Math.cos(ft)*Xt,b=Math.sin(ft)*Xt,w=l===1?Math.cos(ea):0,f=l===1?Math.sin(ea):0;for(let z=0;z<g;z++){let C=i,S=b;for(let G=0;G<ta.length;G++){const V=ta[G],ee=o.x+a*V[0]-s*V[1],W=o.y+s*V[0]+a*V[1],pe=o.z+V[2]-.3,re=te[z]-ee,Ne=Q[z]-W,We=-pe,Xe=re*re+Ne*Ne+We*We+.15,ct=V[3]/(Xe*Math.sqrt(Xe));C+=re*ct,S+=Ne*ct}if(l===1){const G=te[z]-eo,V=Q[z]-to,ee=G*G+V*V+6,W=1/Math.sqrt(ee),pe=(G*w+V*f)*W,re=62*W*W*W;C+=(3*pe*G*W-w)*re,S+=(3*pe*V*W-f)*re}Qe[z]=C,$e[z]=S}},ge=1/90,yt=()=>{ke.fill(0);for(let a=0;a<Za;a++){const s=Ya[a],i=ja[a],b=Qa[a],w=$a[a],f=Ja[a],z=ue[s]*Le[s],C=ve[s]*Le[s],S=ue[i]*Le[i],G=ve[i]*Le[i],V=z*b+C*w,ee=S*b+G*w,W=z*w-C*b,pe=S*w-G*b,re=z*G-C*S;ke[i]+=f*(3*V*pe+re),ke[s]+=f*(3*ee*W-re)}for(let a=0;a<g;a++){const s=ue[a],i=ve[a],b=Le[a],w=(ke[a]*b+s*$e[a]-i*Qe[a])*ut*b;let f=we[a];if(!(f>.02||f<-.02)&&Math.abs(w)<Zt*ut){we[a]=0;continue}f+=ge*(w-Xa*f);const C=Zt*ut*ge;f>0?(f-=C,f<0&&(f=0)):(f+=C,f>0&&(f=0)),we[a]=f;const S=f*ge,G=S*S*.5,V=s*(1-G)-i*S,ee=i*(1-G)+s*S;ue[a]=V,ve[a]=ee}},wt=()=>{for(let a=0;a<g;a++){const s=1/Math.hypot(ue[a],ve[a]);ue[a]*=s,ve[a]*=s}};let Ee=u()*40,Ie=2.6+u()*1.2;const na=a=>{if(_.m===1){const s=Va(t.input.x,t.input.y,aa),i=16.5,b=Math.max(-i,Math.min(i,s[0])),w=Math.max(-i-3,Math.min(i+1,s[1])),f=170,z=25;o.vx+=a*(f*(b-o.x)-z*o.vx),o.vy+=a*(f*(w-o.y)-z*o.vy),o.vz+=a*(70*(aa-o.z)-16*o.vz),o.z>7&&(o.x=b+(o.x-b)*.9,o.y=w+(o.y-w)*.9)}else if(_.m===0){Ee+=a;const s=2*Math.PI/3.4,i=.45+.3*Math.sin(Ee*.13+o.kick),b=Math.cos(Ee*.31+1.3*Math.sin(Ee*.07)+o.kick)*i,w=Math.sin(Ee*.23+1.1*Math.cos(Ee*.05))*i;if(o.vx+=a*(-s*s*(o.x-o.ax)-.16*o.vx+b),o.vy+=a*(-s*s*(o.y-o.ay)-.16*o.vy+w),o.vz+=a*(22*(et-o.z)-9*o.vz),Ie-=a,Ie<=0){const f=u()*6.283,z=.5+u()*.9;o.vx+=Math.cos(f)*z,o.vy+=Math.sin(f)*z,o.tw+=(u()<.5?-1:1)*(.12+u()*.3),Ie=4+u()*9}o.tw*=1-a*.16,o.yt=o.y0+o.tw}else o.vz+=a*(32*(46-o.z)*.3-5*o.vz),o.vx+=a*(-.6*o.vx),o.vy+=a*(-.6*o.vy);o.x+=a*o.vx,o.y+=a*o.vy,o.z+=a*o.vz,o.yv+=a*(70*(o.yt-o.yaw)-9.5*o.yv),o.yaw+=a*o.yv,o.lean+=a*((o.vx*Math.cos(o.yaw)+o.vy*Math.sin(o.yaw))*-.02-o.lean)*6},tt=t.hash+(t.home?"h":""),J=Me.get(tt);if(J)Me.delete(tt),Me.set(tt,J),Ge.set(J.th),we.set(J.om),ue.set(J.mx),ve.set(J.my),Qe.set(J.Bx),$e.set(J.By),ke.set(J.tq),Object.assign(o,J.mg),Ee=J.driveT,Ie=J.draftT,d=J.h0;else{for(let a=0;a<g;a++)Ge[a]=ft+(u()-.5)*.3+(Le[a]<0?Math.PI:0),we[a]=0,ue[a]=Math.cos(Ge[a]),ve[a]=Math.sin(Ge[a]);{const a=[o.x,o.y,o.z,o.yaw],s=(u()-.5)*6,i=(u()-.5)*6,b=u()*6.28;for(let w=0;w<330;w++){if(w%3===0){const f=w/330;o.z=1.3+36*Math.max(0,f-.72)*Math.max(0,f-.72)*12,o.yaw=b+f*3,o.x=f<.36?-15+30*(f/.36):15-30*Math.min(1,(f-.36)/.36),o.y=(f<.36?s:i)+(f-.36)*8,bt(),wt()}yt()}o.x=a[0],o.y=a[1],o.z=a[2],o.yaw=a[3]}o.z=et+1.2,o.vz=0;for(let a=0;a<330;a++)a%3===0&&(na(ge*3),bt(),wt()),yt();Me.set(tt,{th:Ge.slice(),om:we.slice(),mx:ue.slice(),my:ve.slice(),Bx:Qe.slice(),By:$e.slice(),tq:ke.slice(),mg:{...o},driveT:Ee,draftT:Ie,h0:d}),Me.size>24&&Me.delete(Me.keys().next().value)}Ie=2.3+u()*.9,Sa(e,c),e.bindBufferBase(e.UNIFORM_BUFFER,0,lt),e.bindBufferBase(e.UNIFORM_BUFFER,1,je),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DITHER),e.colorMask(!0,!0,!0,!0),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.viewport(0,0,r,r);const Y=(a,s)=>{e.activeTexture(e.TEXTURE0+a),e.bindTexture(e.TEXTURE_2D,s)},me=H.k>0,Ve=Ae(e,r,r),at=Ae(e,r,r),gt=Ae(e,r,r),ot=me?Ae(e,r,r):null,Et=me?Ae(e,r,r):null,Rt=me?Ae(e,r,r):null,ca=Te(e,Ve),sa=Te(e,at),ao=Te(e,gt),Ft=me?Te(e,ot):null,ia=me?Te(e,Et):null,la=me?Te(e,Rt):null,Mt=e.createRenderbuffer(),At=e.createRenderbuffer(),rt=e.createFramebuffer();e.bindRenderbuffer(e.RENDERBUFFER,Mt),e.renderbufferStorageMultisample(e.RENDERBUFFER,Bt,e.RGBA8,r,r),e.bindRenderbuffer(e.RENDERBUFFER,At),e.renderbufferStorageMultisample(e.RENDERBUFFER,Bt,e.DEPTH_COMPONENT24,r,r),e.bindFramebuffer(e.FRAMEBUFFER,rt),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Mt),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,At),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,1),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),Y(0,c.noise),e.bindVertexArray(c.empty),e.useProgram(c.table.p),e.uniform1i(c.table.u.uN,0),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindVertexArray(c.caseVao),e.useProgram(c.kase.p),e.uniform1i(c.kase.u.uN,0),e.uniform1i(c.kase.u.uT,1),Y(1,c.glyph),e.drawElementsInstanced(e.TRIANGLES,c.cm.caseCount,e.UNSIGNED_SHORT,0,g);const fa=a=>{e.bindFramebuffer(e.READ_FRAMEBUFFER,rt),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,a),e.blitFramebuffer(0,0,r,r,0,0,r,r,e.COLOR_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,rt)};fa(ca),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.depthMask(!1),e.useProgram(c.glass.p),e.uniform1i(c.glass.u.uN,0),e.drawElementsInstanced(e.TRIANGLES,c.cm.glassCount,e.UNSIGNED_SHORT,c.cm.glassStart*2,g),fa(sa),e.disable(e.DEPTH_TEST),e.depthMask(!0),e.bindVertexArray(c.empty);const nt=(a,s,i,b)=>{e.bindFramebuffer(e.FRAMEBUFFER,a),Y(0,s),Y(1,Ve),e.uniform4f(c.dof.u.uR,i,de,1/r,b),e.drawArrays(e.TRIANGLES,0,3)};me&&(e.useProgram(c.dof.p),e.uniform1i(c.dof.u.uC,0),e.uniform1i(c.dof.u.uS,1),nt(Ft,Ve,de,1),nt(ia,ot,de*.4+1,0),nt(Ft,at,de,1),nt(la,ot,de*.4+1,0));const Tt=me?Rt:at;e.bindFramebuffer(e.FRAMEBUFFER,ao),e.useProgram(c.comp.p),e.uniform1i(c.comp.u.uA,0),e.uniform1i(c.comp.u.uG,1),Y(0,me?Et:Ve),Y(1,Tt),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteRenderbuffer(Mt),e.deleteRenderbuffer(At),e.deleteFramebuffer(rt);for(const a of[ca,sa,Ft,ia,la])a&&e.deleteFramebuffer(a);for(const a of[Ve,ot,Et,me?at:Rt])a&&e.deleteTexture(a);const Se=new Float32Array(g*4),Oe=new Float32Array(g*3),ua=e.createVertexArray();e.bindVertexArray(ua),e.bindBuffer(e.ARRAY_BUFFER,c.quad),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.vertexAttribDivisor(0,0);const va=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,va),e.bufferData(e.ARRAY_BUFFER,Se.byteLength,e.DYNAMIC_DRAW),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,0,0),e.vertexAttribDivisor(1,1);const ma=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ma),e.bufferData(e.ARRAY_BUFFER,Oe.byteLength,e.DYNAMIC_DRAW),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,3,e.FLOAT,!1,0,0),e.vertexAttribDivisor(2,1),e.bindVertexArray(null);const oo=[[0,0,3.1,.3,0,0,0,0],[-1,0,.3,.3,1,0,.3,.3],[0,0,3.6,.15,0,0,0,0],[0,0,2.2,.3,0,0,.3,2.2]][y],zt=[[.46,.03,.022],[.42,.028,.02],[.03,.035,.06],[.46,.03,.022]][y],_t=[[.05,.055,.07],[.38,.025,.02],[.03,.035,.06],[.05,.055,.07]][y];let He=0,ha=u()*100,ro=0;const no=[0,2,4,7,9],da=(a,s)=>{const i=Math.min(s,.04)*.9;for(let N=0;N<g;N++)Se[N*4]=te[N],Se[N*4+1]=Q[N],Se[N*4+2]=ue[N],Se[N*4+3]=ve[N],Oe[N*3]=we[N],Oe[N*3+1]=Je[N],Oe[N*3+2]=se[N];e.bindBuffer(e.ARRAY_BUFFER,va),e.bufferSubData(e.ARRAY_BUFFER,0,Se),e.bindBuffer(e.ARRAY_BUFFER,ma),e.bufferSubData(e.ARRAY_BUFFER,0,Oe);const b=[3.25,1.4,3.8,2.4][y],w=[.36,.4,.2,2.4][y],f=[-.32,-.3,-.2,-.25][y],z=[.3,2.65,.2,.6][y],C=Math.cos(o.yaw),S=Math.sin(o.yaw);let G=9,V=-9,ee=9,W=-9,pe=1e9;const re=o.lean;for(let N=-1;N<=1;N+=2)for(let ne=-1;ne<=1;ne+=2)for(let ce=0;ce<2;ce++){const Re=N*b,Pe=ne*w,kt=(ce?z:f)+re*Re,Fe=Ce(o.x+C*Re-S*Pe,o.y+S*Re+C*Pe,o.z+kt);Fe[2]>0&&(G=Math.min(G,Fe[0]),V=Math.max(V,Fe[0]),ee=Math.min(ee,Fe[1]),W=Math.max(W,Fe[1]),pe=Math.min(pe,Fe[2]))}const Ne=V>-1.2&&G<1.2&&W>-1.2&&ee<1.2,We=qe([o.x-I[0],o.y-I[1],o.z-I[2]],O),Xe=Math.abs(Math.max(-1,Math.min(1,H.k*(We-H.foc)/We)))*de,ct=(Xe*2.2+3)/r,Be=Math.max(V-G,W-ee)*.5+ct+.02,Lt=(G+V)*.5,Nt=(ee+W)*.5;$.set([o.x,o.y,o.z,o.yaw],0),$.set(oo,4);const pa=[.27,2.48,.17,.54][y],Pt=o.z+pa,so=(o.ax-o.x)/(dt-Pt),io=(o.ay-o.y)/(dt-Pt);if($.set([zt[0],zt[1],zt[2],pa],12),$.set([Lt,Nt,Be,de],16),$.set([_t[0],_t[1],_t[2],i],20),$.set([so,io,y,o.lean],24),e.bindBufferBase(e.UNIFORM_BUFFER,0,lt),e.bindBufferBase(e.UNIFORM_BUFFER,1,je),e.bindBuffer(e.UNIFORM_BUFFER,je),e.bufferSubData(e.UNIFORM_BUFFER,0,$),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.DITHER),e.colorMask(!0,!0,!0,!0),e.depthMask(!0),Y(0,c.noise),Ne&&(e.bindFramebuffer(e.FRAMEBUFFER,c.magF),e.viewport(0,0,xe,xe),e.clearColor(0,0,0,0),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.disable(e.BLEND),e.useProgram(c.mag.p),e.uniform1i(c.mag.u.uN,0),e.bindVertexArray(c.mags[y].vao),e.drawElements(e.TRIANGLES,c.mags[y].n,e.UNSIGNED_SHORT,0),e.flush(),de===0&&o.z<I[2]-.5&&.55*xe/(r*Be)<.999||(e.bindTexture(e.TEXTURE_2D,c.magT),e.generateMipmap(e.TEXTURE_2D)),e.disable(e.DEPTH_TEST)),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,r,r),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.bindVertexArray(c.empty),e.useProgram(c.final.p),e.uniform1i(c.final.u.uF,0),e.uniform1i(c.final.u.uN,1),e.uniform4f(c.final.u.uG,ha,ha*1.37%1,1/256,.016),Y(0,gt),Y(1,c.noise),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(c.needle.p),e.uniform1i(c.needle.u.uN,0),e.uniform1i(c.needle.u.uG,1),Y(0,c.noise),Y(1,Tt),e.bindVertexArray(ua),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,g),Ne||o.z<30){e.enable(e.SCISSOR_TEST);const N=Math.max(b,w)+o.z*1.3+2.4,ne=Ce(o.x+N,o.y,.4),ce=Ce(o.x,o.y-N,.4),Re=Ce(o.x,o.y+N,.4),Pe=Ce(o.x-N,o.y,.4),kt=Math.min(ne[0],Pe[0],ce[0],Re[0]),Fe=Math.max(ne[0],Pe[0],ce[0],Re[0]),lo=Math.min(ne[1],Pe[1],ce[1],Re[1]),fo=Math.max(ne[1],Pe[1],ce[1],Re[1],W),xa=Math.max(0,(kt*.5+.5)*r-4|0),ba=Math.max(0,(lo*.5+.5)*r-4|0);e.scissor(xa,ba,Math.max(0,Math.min(r,(Fe*.5+.5)*r+6|0)-xa),Math.max(0,Math.min(r,(fo*.5+.5)*r+6|0)-ba)),e.useProgram(c.over.p),e.uniform1i(c.over.u.uG,0),e.uniform1i(c.over.u.uB,1),Y(0,Tt),Y(1,gt),e.bindVertexArray(c.empty),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.SCISSOR_TEST)}if(Ne){e.bindVertexArray(c.empty),e.useProgram(c.spr.p),e.uniform1i(c.spr.u.uT,0),Y(0,c.magT),e.enable(e.SCISSOR_TEST);const N=Math.max(0,((Lt-Be)*.5+.5)*r-2|0),ne=Math.max(0,((Nt-Be)*.5+.5)*r-2|0);e.scissor(N,ne,Math.max(0,Math.min(r,((Lt+Be)*.5+.5)*r+3|0)-N),Math.max(0,Math.min(r,((Nt+Be)*.5+.5)*r+3|0)-ne)),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.SCISSOR_TEST);const ce=Math.max(.55,r*.0013,Xe*.9);$.set([o.x,o.y,Pt,.0125*fe*r*.5],20),$.set([o.ax,o.ay,dt,ce],24),$.set([Math.max(ce,r*.0018),0,0,de],16),$[15]=1,e.bufferSubData(e.UNIFORM_BUFFER,0,$),e.useProgram(c.line.p),e.drawArrays(e.TRIANGLE_STRIP,0,4)}e.disable(e.BLEND),e.bindVertexArray(null)},co=(a,s)=>{s=Math.min(s,.13);const i=t.input;i.taps(),i.down&&!_.down&&(_.down=!0,_.dn=a,_.sx=i.x,_.sy=i.y,_.moved=0),_.down&&i.down&&(_.moved=Math.max(_.moved,Math.hypot(i.x-_.sx,i.y-_.sy)),_.m!==1&&(_.moved>.03||a-_.dn>.24)&&(_.m=1,t.sound.hit("noise",.05,{cutoff:900,dur:.12}))),!i.down&&_.down&&(_.down=!1,_.m===1?(_.m=2,_.lift=a,t.sound.hit("noise",.05,{cutoff:500,dur:.3})):(o.yt+=Math.PI,o.y0+=Math.PI,_.m===2&&(_.m=0,o.vz=-2,o.x=o.ax+(i.x-.5)*2,o.y=o.ay),t.sound.hit("click",.4),t.sound.note(45,{dur:.3,vel:.06,wave:"sine",cutoff:500}))),_.m===2&&a-_.lift>11&&(_.m=0,o.x=o.ax+1.4,o.y=o.ay,o.vx=0,o.vy=0,o.z=30,o.vz=-6),He+=s;let b=0;for(;He>=ge&&b<13;)He-=ge,b++,ro++%3===0&&(na(ge*3),bt()),yt();He>ge&&(He=0),wt();let w=2;_.sndT-=s;for(let f=0;f<g;f++){const z=Math.abs(we[f]),C=Yt[f];if(z>5.5&&C<=5.5&&w>0&&_.sndT<=0){w--,_.sndT=.06;const S=f/10|0;t.sound.note(79+no[f%5]+(9-S)*2,{dur:.05+.02*S,vel:.012+.012*Math.min(1,z/30),wave:"triangle",pan:f%10/4.5-1,cutoff:3600})}Yt[f]=z}da(a,s)};return da(0,1/30),co}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
