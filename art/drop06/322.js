// Tintype Sea: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/322.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Kt){Kt&&Kt.add({num:322,name:"Tintype Sea",fam:"Worlds",recipe:"A wet-plate photo of a rocky coast on a small black iron plate, with the swirly blur of an old brass lens. The spot (rocks in the surf, a cove, an island in the mist, tide flats, a breakwater) and the flaws change every mint. Tap to pour the developer and watch the picture rise, drag to set up a new plate on another bit of coast, or hold to tilt it into the window light so it flips to a negative.",interactive:"Tap to pour the developer where you touch and watch the picture rise, drag to set up another plate on a new stretch of coast, hold to tilt the plate into the window light (move while holding to rock it) so the silver flips to a negative",music:!0,gl:!0,fps:30,seed:0,make(L){const t=L.gl,qt=L.size,F=!!L.home;let Y=52601333;for(let s=2;s<66;s+=8)Y=Math.imul(Y^parseInt(L.hash.slice(s,s+8),16),2246822507)^Y>>>13;const ft=s=>{let a=s|0;return()=>{a=a+1831565813|0;let e=Math.imul(a^a>>>15,1|a);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}},bt=ft(Y),it=s=>{let a=0;for(const n in s)a+=s[n];let e=bt()*a;for(const n in s)if(e-=s[n],e<0)return n;return Object.keys(s)[0]},kt=F?"Rocks and mist":it({"Rocks and mist":36,Pier:18,"Sea stacks":20,"Breaking waves":18,Lighthouse:8}),It=ft(Y^29418919),xe=It(),me=It(),Ut=It(),Xt=L.trait("Scene",F||kt!=="Rocks and mist"&&kt!=="Sea stacks"?kt:xe<.286?"Cliff and cove":Ut>=.55?kt:Ut/.55*6%1<8/22?"Tide flats":Ut/.55*6%1<15/22?"Breakwater":"Island"),ve=L.trait("Plate",F?"Tintype":it({Tintype:62,Ambrotype:30,"Peeling tintype":8})),Jt=F?"Single":it({Single:92,"Stereo pair":8}),Wt=ft(Y^6240796),Vt=Wt(),$t=["Rocks and mist","Pier","Sea stacks","Breaking waves","Lighthouse"].indexOf(kt),Zt=L.trait("Format",Jt!=="Single"?Jt:F?"Quarter plate":Vt<.26?"Sixth plate":Vt<.5&&$t!==1&&$t!==3?"Upright quarter plate":"Quarter plate"),be=L.trait("Artefacts",F?"Some":it({Few:30,Some:45,Many:25})),we=L.trait("Developer",F?"Warm":it({Warm:55,Cool:45})),ye=L.trait("Horizon",F?"High":Xt==="Tide flats"||Xt==="Breakwater"?(it({High:58,Low:42}),"High"):it({High:58,Low:42})),ke=L.trait("Varnish",F?"Yellowed and crazed":it({Clear:25,Yellowed:35,"Yellowed and crazed":40})),ge=L.trait("Lens",F?"Petzval wide open":it({"Petzval wide open":62,"Stopped down":38})),te=L.trait("Exposure",!F&&Xt!=="Breaking waves"&&me<.18?"Instantaneous":"Long")==="Instantaneous",g=["Rocks and mist","Pier","Sea stacks","Breaking waves","Lighthouse","Cliff and cove","Tide flats","Island","Breakwater"].indexOf(Xt),gt=["Tintype","Ambrotype","Peeling tintype"].indexOf(ve),wt=Zt==="Stereo pair"?1:0,lt=["Few","Some","Many"].indexOf(be),Le=we==="Warm"?1:0,ze=ye==="High",Nt=["Clear","Yellowed","Yellowed and crazed"].indexOf(ke),Ht=ge==="Petzval wide open"?1:.12,Lt=Zt==="Upright quarter plate",jt=Zt==="Sixth plate",dt=wt?1.95:Lt?1/1.31:1.31,Bt=wt?1.07:Lt?.74:jt?.8:1,ht=Bt/dt,ee=Lt?.036:.028,oe=Lt?.028:.036,se=jt?(Wt()-.5)*.36:0,ae=jt?(Wt()-.5)*.3:0,zt=dt*(1-2*ee)/(1-2*oe),c=32,v=24,D=c*v,h=t.__c322||(t.__c322=(()=>{const s=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,a=s+"const vec2 P[3]=vec2[3](vec2(-1,-1),vec2(3,-1),vec2(-1,3));out vec2 vU;void main(){vec2 p=P[gl_VertexID];vU=p*.5+.5;gl_Position=vec4(p,0,1);}",e=`uniform sampler2D uN;uniform int uO;uniform int uZ;
float vn(vec2 p){return texture(uN,p*(1./256.)).r;}
float fb(vec2 p){float s=0.,a=.5,t=0.;for(int i=0;i<uO;i++){s+=a*texture(uN,p*(1./256.)).r;t+=a;p=p*2.03+vec2(17.3,9.1);a*=.5;}return s/t;}
`,n=`in vec2 vU;out vec4 o;uniform vec4 uA,uB,uC,uG;uniform int uR;
float hs(float n){return fract(sin(n*91.71+uA.w*7.13)*43758.5453);}
void main(){
 vec2 q=vU;float A=uA.z,eye=0.;
 if(uB.z>.5){eye=q.x<.5?-1.:1.;q.x=fract(q.x*2.);A*=.5;}
 float hz=uA.y,sd=uA.w,sc=uA.x,sh=uB.w;
 vec2 p=vec2((q.x-.5)*A,q.y);
 float L=1.04+.10*(p.y-hz)+.03*(fb(p*vec2(1.6,5.)+sd)-.5),dep=0.;
 if(p.y<hz){
  float ys=clamp((hz-p.y)/hz,0.,1.);
  float z=.05/(hz-p.y+.004),lz=log2(z);vec2 w=vec2(p.x*z*2.,z);
#ifndef XW
  if(sh<.5){
   // a long exposure smooths the sea to a step below the burnt-out sky, with two or three long pale swells leading in
   L=mix(.76,.48,pow(ys,.65))+.045*(fb(vec2(p.x*2.5,p.y*26.)+sd)-.5)*(1.-.5*ys)+.03*exp(-(hz-p.y)*70.);
   L+=.07*pow(.5+.5*sin(lz*5.3+2.5*vn(vec2(w.x*.6,4.5))),14.)*smoothstep(.3,.8,ys)*(.4+.8*vn(vec2(w.x*1.3,8.5)));
  }
#else
  {
   // breaking waves under a long exposure: no bands, a white veil where the wash ran to and fro, streaked along the
   // wash and thinning seaward, and one or two soft crest lines of unequal weight, broken here and there
   float stv=fb(vec2(w.x*2.2,lz*.35)+sd);
   float veil=smoothstep(-1.2,-3.,lz)*(.16+.34*stv*stv);
   float c1=exp(-pow((lz+1.25+.35*(vn(vec2(w.x*.5,3.5))-.5))/.12,2.))*smoothstep(.25,.6,vn(vec2(w.x*1.4,9.5)));
   float c2=exp(-pow((lz+.35+.3*(vn(vec2(w.x*.7,13.5))-.5))/.08,2.))*smoothstep(.35,.65,vn(vec2(w.x*2.,17.5)));
   L=mix(.72,.40,pow(ys,.6))+veil+.2*c1+.09*c2+.04*(stv-.5)*ys+.04*exp(-(hz-p.y)*70.);
  }
#endif
  L-=.025*exp(-abs(p.y-hz+.002)/.003);
  dep=smoothstep(.55,1.,ys)*.25;
 }
 // headland
 float s=uB.y,len=uC.w,xs=p.x*s,ed=A*.5,t=(xs-(ed-len))/len,hH=uC.z;
 if(t>-.1){
  float pr=hH*(.3+.7*smoothstep(0.,.7,t))*(1.+.25*(fb(vec2(p.x*5.,3.)+sd)-.5))+.004*(fb(vec2(p.x*45.,7.)+sd)-.5);
  pr=pr*smoothstep(-.008,.02,t)*(.72+.28*smoothstep(.15,.19,t))+hH*(.12*(vn(vec2(p.x*7.,3.5))-.5)-.28*smoothstep(.07,0.,abs(t-.45-.12*(hs(95.)-.5))));
  float top=hz+pr,wl=hz-.003;
  float al=smoothstep(.0012,-.0012,p.y-top)*smoothstep(wl-.004,wl+.002,p.y);
  float Lh=.58+.10*(fb(p*vec2(26.,34.)+sd)-.5)-.10*smoothstep(.4,1.,fb(vec2(p.x*12.,p.y*3.)+sd+5.));
  L+=.16*exp(-abs(p.y-hz)/.007)*smoothstep(-.05,.1,t)*(1.-sh)*(1.-al);
  L=mix(L,Lh,al);
 }
#ifdef XP
 // pier
 if(sc>.5&&sc<1.5){
  float vx=uC.x,hc=.075,hd=.062,z0=.16,sp=.07,zE=2.8,dx=p.x-vx,ps=uB.x;
  for(int r=0;r<2+uZ;r++){
   float X=ps*((r==0?-.045:.045)+.08),z=X/dx;
   if(z>.08&&z<zE+.4){
    float i0=floor((z-z0)/sp);
    for(int k=-1;k<=1+uZ;k++){
     float i=i0+float(k);
     if(i>=0.&&z0+i*sp<zE){
      float Zi=z0+(i+.5+(hs(i*3.7+float(r))-.5)*.25)*sp,sx=vx+X/Zi,w=(.006+.002*hs(i+.3))/Zi;
      float yw=hz-hc/Zi,yd=hz-(hc-hd)/Zi,xx=p.x-sx-(hs(i*1.9+float(r)*5.)-.5)*.05*(p.y-yw);
      float cv=smoothstep(w*.5,w*.5-.0012,abs(xx))*smoothstep(yw-.012/Zi,yw+.003/Zi,p.y)*step(p.y,yd);
      float Lp=.03+.05*fb(vec2(xx/w*3.,p.y*Zi*40.)+i)+.04*smoothstep(0.,w*.5,-xx)+.09*smoothstep(yw+.02/Zi,yw+.035/Zi,p.y);
      if(r==0){vec2 ba=vec2(ps*.09/Zi,(hd-.016)/Zi),pa=p-vec2(sx,yw+.012/Zi);float hb=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
       cv=max(cv,smoothstep(.0012/Zi+.0007,.0004/Zi,length(pa-ba*hb))*step(hs(i*2.1+.7),.75));
       cv=max(cv,smoothstep(w*.32,w*.32-.001,abs(xx))*step(yd,p.y)*step(p.y,yd+.032/Zi));}
      Lp=mix(Lp,.86,smoothstep(.35,zE,Zi)*.85);
      float g=exp(-abs(p.y-yw)*Zi/.006)*smoothstep(w*2.5,0.,abs(xx))*.25*(1.-sh);
      L+=g*(1.-cv);L=mix(L,Lp,cv);
     }
    }
   }
  }
  if(p.y<hz){
   float Zd=(hc-hd)/(hz-p.y),xa=vx+ps*.035/Zd,xb=vx+ps*.125/Zd;
   if(Zd>z0-.02&&Zd<zE+sp*.5&&p.x>min(xa,xb)&&p.x<max(xa,xb)){
    float Ld=(.34+.18*fb(vec2(p.x*Zd*60.,Zd*25.)))*(.6+.4*smoothstep(0.,.12,abs(fract(Zd*38.+.3*vn(vec2(p.x*Zd*9.,5.5)))-.5)));
    L=mix(Ld,.86,smoothstep(.35,zE,Zd)*.85);
   }
   float Zf=ps*.035/dx,ydf=hz-(hc-hd)/Zf;
   if(Zf>z0-.02&&Zf<zE&&p.y<ydf&&p.y>ydf-.02/Zf)L=mix(.05,.86,smoothstep(.35,zE,Zf)*.85);
   if(Zf>z0&&Zf<zE)L=mix(L,mix(.07,.86,smoothstep(.35,zE,Zf)*.85),smoothstep(.0011/Zf+.0005,.0003/Zf,abs(p.y-ydf-.03/Zf)));
  }
 }
#endif
#ifndef XP
 // rocks, far to near (the last one is the foreground ledge when uC.x != 0). Each is a bedded block: an angular skyline
 // stepped along one dip shared by the group, ledge tops pale under the sky, black under overhangs and in the joints,
 // faces of unequal tone, a barnacle band and dark weed at the foot, and a soft dark smear of reflection in the mist.
 float nR=float(uR),fgOn=uC.x!=0.&&!(sc>.5&&sc<1.5)?1.:0.,dp=(hs(91.)-.5)*.9,ls=hs(93.)<.5?-1.:1.;
 for(int k=0;k<uR;k++){
  float fk=float(k);bool fg=fgOn>0.&&k==uR-1;
  float r1=hs(fk*3.1+1.),r2=hs(fk*5.7+2.),r3=hs(fk*1.3+3.);
  float lt=(uC.y>.5&&k==0)?1.:0.;
  float f=fg?1.:lt>0.?.42:(k==0?.1+.2*r1:k==1?.45+.15*r1:.82+.18*(fk-2.)/max(nR-3.-fgOn,1.));
  float stk=(sc>1.5&&sc<2.5&&!fg)?1.:0.,nd=stk*step(.5,abs(fk-1.)*-1.+1.)*step(.35,r2);
  float dz=fg?0.:mix(.9,.3,f);
  float base=fg?-.05:hz-(hz-.06)*mix(.12,.7,f*f);
  float scl=fg?1.:mix(.35,1.,f);
  float w=fg?.26+.08*r1:(.06+.13*r1)*scl*(stk>0.?.62:1.)*(1.-.5*nd)*(1.+.6*lt);
  float h=fg?.2+.09*r2:w*(stk>0.?2.3+1.6*r2:lt>0.?.38:.6+.7*r2)*(1.+.5*nd);
  float cx=fg?uC.x:(stk>0.?(r3-.5)*A*.75:uB.x+(r3-.5)*(k==0?.7:k==1?.45:.3)*min(uA.z/1.24,1.));
  // the camera dollied in toward the group (uG.x of the nearest distance): a rock grows by d/(d-x), nearer ones more
  float gD=1./(1.-uG.x*min((hz-base)/((hz-.06)*.7),1.));base=hz-(hz-base)*gD;w*=gD*uG.y;h*=gD*uG.y;scl*=gD;cx=uB.x+(cx-uB.x)*gD*uG.z;
  cx+=eye*.006*(1.-dz)*(fg?2.:1.);
  float x=(p.x-cx)/w;
  if(abs(x)<1.6){
   float yb=max(p.y-base,0.),uc=stk*.2*exp(-yb/(.12*h+.001));
   vec2 rp=vec2(p.x-cx,p.y-base)/w;
   float xk=(x+.3*(r2-.5)*x*x+.3*(vn(vec2(yb/(h+.001)*(stk>0.?3.:5.)+fk*7.,23.5))-.5)*sign(x)+.3*(r1-.5)*stk*yb/h)/(1.-uc)/(1.-stk*.42*min(yb/h,1.))/(1.+stk*.3*exp(-yb/(.2*h+.001)));
   float j1=vn(vec2(rp.x*1.6+fk*7.3,fk*3.+.5))-.5,j2=vn(vec2(rp.x*4.1+fk*5.,fk*2.+30.5))-.5,j3=vn(vec2(rp.x*16.+fk*3.,9.+fk))-.5;
   float env=clamp((1.-abs(xk))*(stk>0.?6.:2.2+2.*r3),0.,1.);
   float lh=h*(stk>0.?.12:fg?.14:.22)*(.8+.4*r3),ds=dp*(p.x-cx)*(stk>0.?.4:1.);
   float tt=h*env*(stk>0.?.86+.22*j1+.1*j2+.6*(r2-.5)*xk:lt>0.?.75+.2*j2:.82+.6*j1+.3*j2+.25*(r3-.5)*xk);
   float tq=(floor((tt-ds)/lh)+smoothstep(.5,.95,fract((tt-ds)/lh)))*lh+ds;
   float top=base+mix(tt,max(tq,0.),(.25+.35*r1+.25*stk)*env)+h*.025*j3*env-.002;
   float e=.0005+(fg?.002:0.)+.0007*dz;
   float al=smoothstep(e,-e,p.y-top)*step(abs(xk),1.);
#if !defined(XW)&&!defined(XL)
   if(stk>0.&&nd<.5&&abs(fk-floor(hs(97.)*3.))<.5&&r1>.55){vec2 ad=(p-vec2(cx+.42*w*(r2<.5?-1.:1.),base-.01))/vec2(.2*w,.3*h);al*=smoothstep(.9,1.05,length(ad));}
#endif
   float bn=(vn(vec2(p.x*30.,fk*4.+.5))-.5)*.02*scl;
   al*=fg?1.:smoothstep(base-.04*scl,base-.01*scl,p.y+bn);
   float mi=fg?0.:(sh<.5?1.-smoothstep(base-.02*scl,base+.05*scl,p.y+bn):1.-smoothstep(base-.004,base+.006,p.y+bn*.3));
   // bedding, joints and faces
   float bq=(p.y-base-ds)/lh,bu=bq+.9*(vn(vec2(bq*.7,fk+70.5))-.5)+.3*(vn(vec2(rp.x*2.6,fk*5.+60.5))-.5),li=floor(bu),fu=fract(bu),lr=hs(li*1.7+fk*5.3);
   float jx=rp.x*(stk>0.?2.4:fg?2.6:1.7)+.4*(vn(vec2(bu*.8+fk*4.,7.5))-.5)+(stk>0.?0.:li*.41),bi=floor(jx),fj=fract(jx);
   float b1=hs(bi*2.3+li*7.1+fk*3.7),b2=hs(bi*5.9+li*1.3+fk*8.1),gr=vn(rp*vec2(19.,27.)+fk*7.),g1=fb(rp*vec2(4.,6.)+fk*13.);
   float face=(.03+.13*b1*b1)*(.35+.5*gr+1.2*g1*g1)*(1.+.9*(b2-.5+.4*ls)*(fj-.5)*2.);
   float led=step(lr,.55)*smoothstep(.86,.94,fu)*smoothstep(1.,.97,fu)*step(.45,b2),ovh=step(.55,lr)*smoothstep(.55,.98,fu);
   float clf=max(smoothstep(.06,0.,fj),smoothstep(.96,1.,fj)*.6)*smoothstep(.3,.6,b2+.2*stk),lip=smoothstep(.06,.09,fj)*smoothstep(.16,.09,fj);
   float crest=exp(-max(top-p.y,0.)/(.003+.035*h))*(.6+.5*stk);
   vec2 rq=rp*vec2(8.,12.)+fk*3.;float rl=max(vn(rq+vec2(.05,.12))-vn(rq),0.);
   float Lr=face*(1.-.85*ovh)*(1.-.9*clf)+(.12+.3*gr)*led+.1*lip*b2+.42*crest*(.6+.6*gr)+.9*rl*(.3+face*6.);
#if !defined(XW)&&!defined(XL)
   if(stk>0.)Lr+=.25*smoothstep(.06*h,.0,top-p.y)*smoothstep(.4,.7,vn(rp*vec2(9.,20.)+fk));
#endif
   if(fg)Lr+=1.6*smoothstep(.8,.9,vn(rp*vec2(30.,42.)+fk*9.))*smoothstep(.3,.6,vn(rp*vec2(3.,4.)+31.))*(led+.6*crest+.5*lip+3.*rl+.2);
   float ty=(p.y-base)/(.07*scl+.002);
   if(!fg){Lr*=mix(1.,.45,smoothstep(.5,.25,ty));Lr+=.07*smoothstep(.35,.5,ty)*smoothstep(.85,.6,ty)*(.5+gr);}
   // the lighthouse stands on the first rock: whitewashed tapering tower, gallery, dark lantern, cap
#ifdef XL
   if(lt>0.){float th_=.17,tb=base+h*.55,tyy=(p.y-tb)/th_,tx=p.x-cx-.12*w,tw=mix(.013,.008,clamp(tyy,0.,1.));
    float tw_=step(0.,tyy)*step(tyy,.8)*smoothstep(tw,tw-.0012,abs(tx));
    float Lt_=.62+.16*ls*clamp(tx/tw,-1.,1.)-.08*tyy;
    float gal=step(.8,tyy)*step(tyy,.83)*smoothstep(.0125,.011,abs(tx));
    float lan=step(.83,tyy)*step(tyy,.93)*smoothstep(.0072,.006,abs(tx));
    float cap=smoothstep(1.,.85,length(vec2(tx/.0078,(tyy-.93)/.05)))*step(.93,tyy);
    float tl_=max(tw_,max(gal,max(lan,cap)));
    L=mix(L,mix(Lt_,.2+.15*step(.88,tyy)*step(tyy,.9),max(gal,max(lan,cap))),tl_);}
#endif
   Lr=mix(Lr,.86,dz*dz*.62);
   float gl=0.;
   if(!fg){
    L*=1.-.3*smoothstep(1.,.3,abs(x))*exp(-max(base-p.y,0.)/(.3*h+.004))*step(p.y,base+.002)*(1.-.6*sh)*(1.-dz*.8);
#ifndef XW
    gl=(.30*exp(-abs(p.y-base-.003)/(.016*scl+.003))+.12*exp(-max(p.y-base,0.)/(.07*scl)))*smoothstep(1.5,.5,abs(x))*(.65+.5*fb(vec2(p.x*24.,fk+sd)));
#else
    gl=.55*smoothstep(.45,.75,fb(rp*vec2(5.,4.)+fk*3.+sd))*exp(-max(p.y-top,0.)/(h*.35+.004))*smoothstep(1.3,.4,abs(x))*smoothstep(base-.01,base+.02,p.y)
       +.5*exp(-abs(p.y-base)/.006)*smoothstep(1.4,.6,abs(x))*smoothstep(.4,.7,vn(vec2(p.x*60.,p.y*90.)));
#endif
   }
   L+=gl*(1.-al);Lr=mix(Lr,L+gl*.5,mi);L=mix(L,Lr,al);
   if(fg)dep=max(dep,al*.07);
  }
 }
#endif
 o=vec4(pow(clamp(L/1.6,0.,1.),1./2.2),dep,0,1);
}`,f=`   float stv=fb(vec2(w.x*2.2,lz*.35)+sd);
   float veil=smoothstep(-1.2,-3.,lz)*(.05+.13*stv*stv);
   // the swell lines lie at a slant, bend in round the group and break into lengths; half their old weight
   float sl=(hs(77.)-.5)*1.6*p.x-.45*exp(-pow((p.x-uB.x)/.3,2.));
   float c1=exp(-pow((lz+1.25+sl+.5*(vn(vec2(w.x*2.,3.5))-.5))/.12,2.))*smoothstep(.45,.7,vn(vec2(w.x*6.,9.5)));
   float c2=exp(-pow((lz+.35+sl*.6+.4*(vn(vec2(w.x*2.6,13.5))-.5))/.08,2.))*smoothstep(.5,.72,vn(vec2(w.x*8.,17.5)));
   L=mix(.72,.40,pow(ys,.6))+veil+.1*c1+.045*c2+.04*(stv-.5)*ys+.04*exp(-(hz-p.y)*70.);`,d=`    // surf under a long exposure: white smoke round the foot, as light as the sky, twice as wide on the weather side,
    // streaked along the wash and thinning seaward; on the rock it wets only the lowest sixth (h runs about 1.5 times
    // short of the drawn height), and broken water mirrors
    // nothing, so no reflection
    float wx=p.x-cx,rc=w*(.6+.6*step(0.,wx*ls)),ex=max(abs(wx)-.75*w,0.)/rc,ey=(p.y-base)/(p.y<base?.8*w+.015:.25*w+.006);
    float str=.8+.5*(vn(vec2(p.x*7./w,p.y*160.)+fk*9.)-.5)+.3*(vn(vec2(p.x*2.,p.y*50.)+fk*5.)-.5);
    L=mix(L,1.08,clamp(exp(-2.*(ex*ex+ey*ey))*str,0.,1.)*wv*(1.-al));
    Lr=mix(Lr,1.04,smoothstep(base+h*(.08+.17*vn(vec2(rp.x*2.6,fk*5.+.5))),base+.004,p.y)*smoothstep(.25,.6,str));`,u=`
#ifdef XI
 // an instantaneous plate, exposed for the sky with the lens toward a low sun behind cloud: two or three long banks,
 // dark-bellied with burning upper edges; the sky palest round the sun and darkening to the corners
 {vec2 sn=uJ.xy;float ds=length((p-sn)*vec2(1.,1.5));
  float c1=fb(vec2(p.x*1.1,p.y*11.)+sd*1.7),c2=fb(vec2(p.x*1.1,(p.y+.007)*11.)+sd*1.7),y1=p.y-sn.y,y2=y1+.007;
  float b1=exp(-pow((y1-.035)/.05,2.))+exp(-pow((y1-.17)/.055,2.))+.9*exp(-pow((y1+.05)/.035,2.));
  float b2=exp(-pow((y2-.035)/.05,2.))+exp(-pow((y2-.17)/.055,2.))+.9*exp(-pow((y2+.05)/.035,2.));
  float cd=smoothstep(.3,.46,c1*min(b1,1.)),cu=smoothstep(.3,.46,c2*min(b2,1.));
  L=.26+.9*exp(-ds/.2)+.04*(1.-p.y);
  L=mix(L,.14+.3*exp(-ds/.25),cd*.92);
  L+=max(cd-cu,0.)*(.4+2.2*exp(-ds/.3))+1.3*exp(-ds*ds/.0012)*(1.-.55*cd);}
#endif`,p=`  {
   // the sea stopped and near black, a road of glitter under the sun: narrow at the horizon, wide toward the camera,
   // short level dashes, crowded far off and sparse and long near by
   float sx=p.x-uJ.x,dh=hz-p.y,rw=.012+.45*dh;
   float cone=exp(-sx*sx/(rw*rw))*smoothstep(.15,.55,vn(vec2(w.x*2.5,z*5.)+40.5));
   float gt=smoothstep(.52,.8,vn(vec2(w.x*40.,lz*26.)));
   gt=mix(gt,.25,smoothstep(.07,.025,dh));
   L=.11+.06*vn(vec2(w.x*3.,z*12.))*(1.-.5*ys)+2.*gt*cone+.5*exp(-dh/.006)*exp(-sx*sx/.006);
  }`,z=`#ifdef XI
   Lr=mix(Lr*.1,.3,dz*dz*.6)+.8*exp(-max(top-p.y,0.)/.0025)*smoothstep(-.2,.9,(p.x-cx)/w*sign(uJ.x-cx+1e-4));mi=0.;
#endif
   `,E=`#ifdef XC
 {
 // the coast seen along itself from the shingle at the back of a cove: the cliff one bedded mass on side uH.x, its
 // beds dipping one way; the headlands step out to sea behind it, each lower, paler and softer than the one in front
 float cs=uH.x,a2=A*.5,u=cs*p.x+cs*eye*.012,dip=(hs(41.)-.5)*.5,lh=.04+.02*hs(43.);
 float yS=mix(.07+.05*hs(45.),min(hz-.07,.3+.06*hs(46.)),pow(smoothstep(-a2,a2*.5,u),1.5))+.035*(fb(vec2(p.x*3.5,44.5)+sd)-.5)+.012*(vn(vec2(p.x*9.,41.5))-.5);
 if(p.y<hz){
  float dS=p.y-yS;
  // wet shingle, dark and graded, with the sky lying on it in a sheen where the wash has just left; then the wash, a
  // white smoke along the curved shore
  if(dS<0.)L=.05+.06*fb(vec2(p.x*24.,p.y*70.)+sd+3.)+.03*p.y/max(yS,.01)+.5*smoothstep(.08,0.,-dS)*smoothstep(.3,.7,vn(vec2(p.x*5.,p.y*30.)+5.5))*smoothstep(a2*.3,-a2*.5,u);
  else L=mix(L,1.,smoothstep(.025+.03*vn(vec2(p.x*3.,9.5)),0.,dS)*(.7+.5*(vn(vec2(p.x*7.,dS*90.))-.5)));
 }
 int nH=int(uH.y+.5);
 for(int k=0;k<nH;k++){
  float fk=float(nH-k),d=fk/(uH.y+.7);
  float bk=hz-.003-.045*(1.-d)*(1.-d),tp=a2-A*(.34+.15*fk)+.04*A*(hs(fk*3.3)-.5),hk=(.25-.055*fk)*(.75+.5*hs(fk*5.1))*min(1.,(1.-hz)*2.4);
  float t=clamp((u-tp)/(A*.2),0.,1.),lq=hk*.16;
  float top=bk+hk*(.2+.8*t*t*(3.-2.*t))*(1.+.4*(fb(vec2(p.x*3.,fk*7.)+sd)-.5))+hk*.07*(vn(vec2(p.x*16.,fk*3.))-.5)+.003*(vn(vec2(p.x*80.,fk*5.))-.5);
  float fc=tp+(p.y-bk)*(.2+.4*hs(fk*7.7))+.008*(vn(vec2(p.y*60.,fk*9.))-.5),eg=.0012+.0018*d;
  float ak=smoothstep(eg,-eg,p.y-top)*smoothstep(fc-eg,fc+eg,u)*step(bk-.002,p.y);
  float Lk=.06+.08*fb(p*vec2(28.,36.)+fk*11.)+.1*smoothstep(.82,.95,fract((p.y-bk+dip*u)/lq*1.7))*smoothstep(.45,.7,vn(vec2(p.x*20.,fk*7.+p.y*9.)));
#ifdef XI
  Lk=mix(Lk,.36,.2+.55*d);
#else
  Lk=mix(Lk,.98,.38+.5*d);
#endif
  L=mix(L,Lk,ak);
  L=mix(L,.97,exp(-abs(p.y-bk)/.0025)*smoothstep(fc-.004,fc+.03,u)*(1.-ak)*(1.-d)*.7);
 }
 // the near land: the cove's cliff from the plate's foot to its top, stepped bed by bed
 float bq=(p.y+dip*u)/lh,bi=floor(bq),bf=fract(bq);
 float Wc=A*(.27+.12*hs(47.))*(1.+uH.z*(p.y-.5)*.6);
 // buttresses and bays at large scale, then each bed set out or back a little, some ending in an overhanging lip
 float ue=a2-Wc+.07*A*(fb(vec2(p.y*2.2,3.5)+sd)-.5)+.016*A*(mix(hs(bi*1.7+3.),hs(bi*1.7+4.7),smoothstep(.5,.95,bf))-.5)-.012*A*step(.5,hs(bi*2.3+1.))*smoothstep(.6,.97,bf)+.012*A*(vn(vec2(p.y*24.,3.5))-.5)+.004*(vn(vec2(p.y*150.,8.5))-.5);
 float sol=smoothstep(-.0012,.0012,u-ue);
 {
  // fallen blocks at the cliff's foot, lying on the shingle
  for(int k=0;k<2+uZ;k++){float fk=float(k);
   float bw=A*(.035+.025*hs(fk*3.+50.)),bh=bw*(.6+.5*hs(fk*5.+51.));
   vec2 q=vec2(u-(a2-A*(.3+.12*hs(47.))-bw*(.5+1.6*fk)),p.y-(.03+.05*fk+.03*hs(fk+52.)));
   float tb=bh*(.8+.4*(vn(vec2(q.x/bw*1.6+fk*7.,52.5))-.5))-.25*bh*step(.5,fract(q.x/bw*.9+hs(fk+54.)));
   sol=max(sol,smoothstep(.0012,-.0012,abs(q.x)-bw*(1.-.15*q.y/bh)-.005*(vn(vec2(q.y*90.,fk))-.5))*smoothstep(.0012,-.0012,q.y-tb)*step(-.002,q.y));
  }
 }
 if(sol>0.){
  float jx=u*(15.+8.*hs(65.))+.4*(vn(vec2(bq*.8,7.5))-.5)+bi*.41,ji=floor(jx),fj=fract(jx);
  float b1=hs(ji*2.3+bi*7.1),b2=hs(ji*5.9+bi*1.3),lr=hs(bi*1.7+5.3);
  float gr=vn(p*vec2(150.,200.)),g1=fb(p*vec2(8.,12.)+sd+21.);
  float face=(.03+.11*b1*b1)*(.4+.5*gr+1.1*g1*g1);
  float led=step(lr,.55)*smoothstep(.86,.94,bf)*smoothstep(1.,.97,bf)*step(.4,b2)*smoothstep(.4,.7,vn(vec2(u*14.,bi*3.1))),ovh=step(.55,lr)*smoothstep(.55,.98,bf);
  float Lc=face*(1.-.85*ovh)*(1.-.9*smoothstep(.06,0.,fj)*smoothstep(.3,.6,b2))+(.12+.28*gr)*led;
#ifdef XI
  Lc=Lc*.1+.4*exp(-abs(u-ue)/.003)*step(ue,u);
#else
  Lc+=.12*exp(-abs(u-ue)/.005)*step(ue,u);
#endif
  L=mix(L,Lc,sol);dep=mix(dep,.03,sol);
 }
 }
#endif
`,i=`#ifdef XT
vec3 chT(float D){float s=pow(D,.7),am=uJ.z*.3*pow(D,.72),t1=1.7*s+uH.y,t2=3.9*s+uH.z;
 return vec3(am*(sin(t1)+.42*sin(t2)+.5*(vn(vec2(s*.9,64.5)+uA.w)-.5)+.22*(vn(vec2(s*3.3,68.5)+uA.w)-.5)),uJ.w*.28*(1.+.7*(vn(vec2(s*1.3,65.5)+uA.w)-.5))*(.45+.55*exp(-D/12.)),(2.89*sin(t1)+6.39*sin(t2))/9.28);}
#endif
`,b=`#ifdef XT
 {
 // the far shore a low dark line on the horizon, the sea a hairline of white under it
 float fsT=hz+.003+.008*fb(vec2(p.x*4.,61.5)+sd)+.006*smoothstep(.55,.85,vn(vec2(p.x*9.,62.5)));
 if(p.y>hz-.003)L=mix(L,.4+.12*smoothstep(hz,fsT+.01,p.y)+.06*vn(vec2(p.x*120.,p.y*300.)),smoothstep(fsT+.0012,fsT-.0012,p.y)*smoothstep(hz-.003,hz-.0005,p.y));
 if(p.y<hz-.001){
  float dh=hz-p.y,D=1./dh,X=p.x*D-eye*.04;
  float De=46.*(1.+.5*(fb(vec2(p.x*2.2,63.5)+sd)-.5)),fz=smoothstep(3.,De,D);
  float mu=fb(vec2(X*1.2,D*2.4)+sd+9.);
  vec3 c=chT(D);
  // the channel in ground units: a scarp of dark mud on the outside of each bend, bitten and slumped, hanging dark in
  // the water; everywhere else the water thins over shelving sand and ends in tongues, runnels and puddles
  float n=(X-c.x)/c.y,sg=n<0.?-1.:1.,pn=.0012*D/c.y,fa=fb(vec2(pow(D,.7)*2.2,sg*7.+66.5)+sd);
  float vb=vn(vec2(X*7.,D*11.)+sg*11.+sd),an=abs(n)+.35*(fa-.5)+.1*(vn(vec2(pow(D,.7)*14.,sg*5.+67.5))-.5)+.05*(vb-.5);
  float ou=step(0.,sg*c.z),bd=smoothstep(.1,.75,abs(c.z)),cb=smoothstep(.15,.45,ou*bd);
  float ac=an-.09*smoothstep(.6,.7,vb)+.1*smoothstep(.36,.28,vb)*step(.86,an),ec=ac-1.;
  float vr=vn(vec2(n*9.,D*2.6/c.y)+sd*1.7+31.5),vp=smoothstep(.25,.75,vr),w=.25+.35*fa,h=(1.-an)/w+.5;
  float wat=smoothstep(-pn,pn,mix((h-1.3*vp)*w,-ec,cb)),hb=.08+.12*(1.-fa),bw=min(hb/c.y*.25,.22);
  // the water mirrors the bright low sky far off and higher, greyer sky near, the bed showing where it thins; long
  // streaks of current; under a scarp its dark image
  float Lw=mix(.6,.9,smoothstep(2.5,20.,D))+.06*smoothstep(20.,De,D)+.045*(vr-.5)*(1.-fz)-.04*n*n;
  Lw*=mix(1.,mix(.72,1.,smoothstep(.15,.9,h)),1.-cb);
  Lw*=1.-.66*cb*smoothstep(bw+.06,bw-.06,-ec+.06*(vr-.5)+.08*(vb-.5))*step(ec,.02)*(1.-fz*.7);
#ifdef XI
  Lw=max(L,.26)+.08;
#endif
  float tg=max((1.-cb)*smoothstep(-.3-.3*bd,.1,h-.3*vp),smoothstep(1.02,.9,an))*(1.-wat);
  // the mud, near black, with level streaks of sheen where water still lies in the ripples, paler with distance
  float Lm=.04+.07*mu*mu;
  Lm+=.5*smoothstep(.62,.84,vn(vec2(X*.3,D*4.2)+sd))*smoothstep(.35,.65,vn(vec2(X*1.4,D*.8)+21.5))*(1.-.6*fz)*smoothstep(2.,4.5,D);
  // ripple marks near the lens: level lines a hand apart that waver, cut into dashes, water in their troughs; gone
  // where their spacing falls under a few pixels so the far flats keep their even tone
  float sw=hb/c.y*.4+pn*2.,rq=.07/(D*D),rv=mu;
  float rp=smoothstep(.3,.9,.5+.5*sin(6.283*(D/.07+4.*rv+.6*vr)));
  Lm+=.24*rp*smoothstep(.003,.0055,rq)*smoothstep(.32,.58,vb)*(1.-cb*smoothstep(sw,0.,ec));
  Lm=mix(Lm,.36+.1*mu,fz*.6);
  // the mud's top beside a scarp a shade lighter than the scarp's dark face
  Lm+=.03*cb*smoothstep(2.5,1.2,an);
  Lm*=1.-.6*cb*smoothstep(sw,sw*.5,ec)*step(0.,ec);
  Lm=mix(Lm,.24+.26*smoothstep(-.3,.15,h)-.1*vp+.06*mu,tg*.85);
#ifdef XI
  Lm*=.35;
#endif
  // side creeks join it as short pale forks
  for(int k=0;k<2+uZ;k++){float fk=float(k),sk=hs(fk+71.)<.5?-1.:1.;
   float Dk=2.6+fk*3.4+2.*hs(fk+70.);vec3 ck=chT(Dk);
   vec2 dv=normalize(vec2(sk*(1.+hs(fk+72.)),.3+.9*hs(fk+73.))),Q=vec2(X,D)-vec2(ck.x+sk*ck.y*.6,Dk);
   float lk=ck.y*(3.+4.*hs(fk+74.)),tk=dot(Q,dv)/lk,ok=dot(Q,vec2(-dv.y,dv.x))-lk*.1*sin(tk*5.+fk*2.)*tk;
   float wk=ck.y*.22*(1.-.9*clamp(tk,0.,1.))+.0006*D;
   wat=max(wat,smoothstep(wk+.0012*D,wk-.0012*D,abs(ok))*step(0.,tk)*smoothstep(1.,.85,tk));}
#ifdef XI
  L=mix(mix(Lm,Lw,wat),L,smoothstep(De*.9,De,D));
#else
  L=mix(mix(Lm,Lw,wat),.95,smoothstep(De*.9,De,D));
#endif
  // withies: thin crooked stakes marking one bank, no two leaning alike, each with a faint streak of reflection
  for(int k=0;k<13+uZ;k++){float fk=float(k);
   if(fk<uH.w){
    float Di=3.8*pow(10.,(fk+.4*hs(fk+80.))/max(uH.w-1.,1.));vec3 ci=chT(Di);
    float sx=(ci.x+uH.x*ci.y*(.62+.3*hs(fk+81.))+eye*.04)/Di,yb=hz-1./Di,yt=hz-(1.-.5-.35*hs(fk+82.))/Di,ww=(.02+.012*hs(fk+83.))/Di;
    float ln=fract(fk*.618+hs(84.))-.5;ln=.45*ln+.05*sign(ln);
    float yy=p.y-yb,xx=p.x-sx-ln*yy-ww*1.3*(vn(vec2(yy*Di*9.,fk*5.+85.5))-.5);
    float tp=yt+ww*2.*(vn(vec2(xx/ww*1.5,fk*3.+86.5))-.5);
    float ms=smoothstep(ww*.5+.0006,ww*.5-.0006,abs(xx))*step(-.0005,yy)*smoothstep(tp+.0007,tp-.0007,p.y);
    float xr=p.x-sx+ln*yy+ww*1.3*(vn(vec2(yy*Di*9.,fk*5.+85.5))-.5);
    L*=1.-.3*smoothstep(ww,ww*.2,abs(xr))*step(yy,0.)*smoothstep((yb-yt)*.7,0.,-yy)*smoothstep(.3,.7,L);
    L=mix(L,.04+.05*vn(vec2(p.y*700.,fk*7.))+.18*smoothstep(-.1,.45,xx/ww*uH.x),ms);
   }
  }
 }
 }
#endif
`,A=`#ifdef XS
 {
 // lopsided: a sheer cliff on side uH.y, a long stepped slope on the other, a notch and a second summit on the skyline;
 // pale in the haze and darkest at its foot, cut from the sea by a band of mist so it floats, and a long soft smear
 // of its reflection on the calm sea
 float iw=uH.z,Hi=uH.w,u=(p.x-uH.x)/iw*uH.y,us=.15+.25*hs(51.),un=us+.22+.18*hs(52.);
 float sx=clamp((u+1.)/(us+1.),0.,1.),sp=pow(sx*sx*(3.-2.*sx),.75+.3*hs(53.)),nt=3.+2.*hs(54.);
 sp=mix(sp,(floor(sp*nt)+smoothstep(.5,.95,fract(sp*nt)))/nt,.45);
 float pl=1.-.16*clamp((u-us)/(1.-us),0.,1.)-(.1+.08*hs(55.))*exp(-pow((u-un)/.09,2.))+.04*exp(-pow((u-un-.17)/.08,2.));
 float uc=u+.05*(vn(vec2((p.y-hz)/Hi*4.,56.5))-.5)+.025*(vn(vec2((p.y-hz)/Hi*22.,57.5))-.5);
 float pf=(u<us?sp:pl)*smoothstep(1.,.88-.06*hs(58.),uc);
 pf=max(pf+(.06*(fb(vec2(p.x/iw*2.2,59.5)+sd)-.5)+.018*(vn(vec2(p.x/iw*16.,60.5))-.5))*smoothstep(-1.,-.85,u),0.);
 float top=hz+Hi*pf,yi=(p.y-hz)/Hi;
 float ai=smoothstep(.0011,-.0011,p.y-top)*step(hz-.001,p.y)*step(.004,pf);
 float Li=.5+.12*yi-.06*smoothstep(.7,.95,uc)*(.6+.6*vn(vec2(u*30.,yi*2.)))+.07*(vn(vec2(u*3.,yi*4.)+sd)-.5)+.035*(vn(vec2(u*9.,yi*11.)+sd)-.5)+.02*(vn(vec2(u*26.,yi*30.))-.5);
#ifdef XI
 Li=.07+.04*vn(vec2(u*20.,yi*6.))+.55*exp(-max(top-p.y,0.)/.0025)*smoothstep(-.3,.8,(p.x-uH.x)/iw*sign(uJ.x-uH.x+1e-4));
#else
 Li=mix(Li,.97,smoothstep(.06+.14*vn(vec2(p.x/iw*3.,62.5)),0.,yi)*.8);
#endif
 L=mix(L,Li,ai);
#ifndef XI
 if(p.y<hz)L-=.17*min(pf*1.6,1.)*smoothstep(1.05,.8,abs(u))*exp(-(hz-p.y)/(.8*hz))*(.8+.4*vn(vec2(p.x*60.,p.y*3.)))*smoothstep(.0,.006,hz-p.y);
#endif
 // two skerries in front of it at one side: low, dark, their tops stepped along a shared dip, a soft white wash at
 // the foot and a dark smear under them
 for(int k=0;k<2+uZ;k++){float fk=float(k),bk=hz-.015-.045*fk-.02*hs(fk+90.),gk=(hz-bk)/(hz-.05)*1.6+.9;
  float wk=(.035+.025*hs(fk+91.))*gk,hk=wk*(.45+.35*hs(fk+92.)),xk=(p.x-uB.x-(fk-.5)*.09*gk*uH.y)/wk;
  float tt=hk*clamp(1.-pow(abs(xk+.25*xk*xk*uH.y),1.6),0.,1.)*(.8+.4*vn(vec2(xk*2.,fk*5.+93.5)));
  float lq=hk*.3,dq=.25*hk*xk*uH.y,tq=(floor((tt-dq)/lq)+smoothstep(.5,.95,fract((tt-dq)/lq)))*lq+dq;
  float tk=bk+mix(tt,max(tq,0.),.5)+.06*hk*(vn(vec2(xk*9.,fk+94.5))-.5);
  float ak=smoothstep(.0008,-.0008,p.y-tk)*step(bk-.002,p.y)*step(abs(xk),1.);
  float Lk=.05+.07*vn(vec2(xk*8.,(p.y-bk)/hk*5.+fk*3.))+.25*exp(-max(tk-p.y,0.)/(.08*hk+.0005));
#ifdef XI
  Lk=.04+.5*exp(-max(tk-p.y,0.)/.0015)*smoothstep(0.,.8,xk*sign(uJ.x-uB.x+1e-4));
#else
  L=mix(L,1.,.5*exp(-abs(p.y-bk)/.004)*smoothstep(1.4,.6,abs(xk))*(1.-ak));
  if(p.y<bk)L*=1.-.3*smoothstep(1.,.3,abs(xk))*exp(-(bk-p.y)/(.6*hk+.003));
#endif
  L=mix(L,Lk,ak);
 }
 }
#endif
`,U=`#ifdef XB
 {
 // the walkway of worn setts, pale where wet; the harbour face sheer and coursed, weed below a sharp tide line; the
 // seaward face battered; squat bollards along the harbour edge, a squat beacon at the end; inside the curve the
 // water dead flat and holding the wall's reflection, outside it the long-exposure veil
 float bs=uH.x,Rr=uH.y,te=uH.z,wwB=.5,hwB=.55,ri=Rr-wwB,ro=Rr+wwB;
 vec2 dB=vec2(p.x,1.),cB=vec2(bs*(wwB+.15-Rr)-eye*.05,0.);
 float aB=dot(dB,dB),bB=dot(dB,cB),qB=bB*bB-aB*(dot(cB,cB)-ri*ri),tF=(bB+sqrt(max(qB,0.)))/aB;
 vec2 vF=dB*tF-cB;float thF=acos(clamp(bs*vF.x/ri,-1.,1.))*sign(vF.y+1e-5),sF=thF*ri;
 // the round head at the end: a drum of the walkway's width
 vec2 eB=cB+Rr*vec2(bs*cos(te),sin(te)),tgB=vec2(-bs*sin(te),cos(te));
 float bE=dot(dB,eB),qE=bE*bE-aB*(dot(eB,eB)-wwB*wwB),tE=(bE-sqrt(max(qE,0.)))/aB;
 if(qE>0.&&dot(dB*tE-eB,tgB)>0.&&(thF>te||tE<tF)){tF=tE;thF=te;sF=te*ri+dot(dB*tE-eB,tgB);}
 if(p.y<hz){
  float dh=hz-p.y,Zw=(1.-hwB)/dh,Zs=1./dh;
  vec2 vW=dB*Zw-cB;float rW=length(vW),thW=acos(clamp(bs*vW.x/rW,-1.,1.))*sign(vW.y+1e-5);
  float eN=.035*(vn(vec2(thW*Rr*2.5,71.5))-.5)+.012*(vn(vec2(thW*Rr*18.,72.5))-.5);
  float onW=max(step(ri+eN,rW)*step(rW,ro+eN)*step(thW,te),step(length(dB*Zw-eB),wwB+eN)*step(0.,dot(dB*Zw-eB,tgB)));
  float hF=1.-dh*tF,topF=hwB-.01*vn(vec2(sF*4.,73.5))-.012*smoothstep(.75,.85,vn(vec2(sF*7.,74.5)));
  float onF=step(thF,te+1e-4)*step(0.,hF)*step(hF,topF);
  vec2 vS=dB*Zs-cB;float rS=length(vS),thS=acos(clamp(bs*vS.x/rS,-1.,1.))*sign(vS.y+1e-5);
  float onO=step(ro+eN,rS)*step(rS,ro+.3)*step(thS,te)*(1.-onW);
  float fz=smoothstep(2.,14.,Zw);
  if(onW>.5){
   // the top of an old mole: a coping of long dressed stones along both lips; between them setts in rough courses
   // across the mole, courses of unequal width, stones of unequal length with joints broken course to course;
   // each stone worn, lighter in its middle and dark at its rounded corners; joints open and
   // dark, nearly rubbed out down a worn middle track; wet patches take whole stones, sunken ones first
   float uW=thW*Rr,vi=rW-ri-eN,vo=ro+eN-rW,cq=uW/.045,cw=1./(1.+.249*cos(cq*1.13)+.271*cos(cq*2.71+1.));
   cq+=.22*sin(cq*1.13)+.1*sin(cq*2.71+1.);
   float ci=floor(cq),cf=fract(cq),sv=vi/.075+3.7*hs(ci*1.37),ph=ci*1.7,sl=1./(1.+.575*cos(sv*2.3+ph)+.255*cos(sv*5.1+ph*.6));
   sv+=.25*sin(sv*2.3+ph)+.05*sin(sv*5.1+ph*.6);
   float sf=fract(sv),sid=floor(sv)*1.7+ci*5.3,du=min(cf,1.-cf)*.045*cw,dv=min(sf,1.-sf)*.075*sl,uc=uW-(cf-.5)*.045*cw,vc=vi-(sf-.5)*.075*sl;
   float cpg=min(vi,vo);
   if(cpg<.08){float cu=uW/.28+(vi<vo?.3:.8),cuf=fract(cu+.18*sin(cu*1.7));sid=floor(cu)*2.9+(vi<vo?.1:.6);du=min(cuf,1.-cuf)*.28;dv=.08-cpg;uc=uW-(cuf-.5)*.28;vc=vi;}
   float rr=.017,dd=rr-length(max(vec2(rr)-vec2(du,dv),0.)),jw=.0015+.008*vn(vec2(uW*9.,vi*9.)+3.5);
   float tr=smoothstep(.3,.38,vi)*smoothstep(.7,.62,vi)*step(.08,cpg),jt=mix(.45,1.,smoothstep(jw,jw+.005,dd));
   jt=mix(jt,1.,.5*tr);
   float sk=step(hs(sid*2.7+.3),.12),wet=smoothstep(.48,.8,vn(vec2(uc*1.2,vc*2.5)+sd)+.25*sk);
   float Ls=(.3+.2*hs(sid*1.13+.7)+.05*vn(vec2(uW*4.,rW*5.))+.04*tr+.03*step(cpg,.08))*(.72+.28*smoothstep(0.,.03,dd))+.12*smoothstep(.012,0.,vi);
   float Lw=Ls*mix(jt,1.,fz)+.32*wet*mix(mix(jt,1.,.5),1.,fz);
#ifdef XI
   Lw=(.17+.06*hs(sid*1.13+.7)+.28*wet)*mix(jt,1.,fz)+.6*wet*jt*exp(-pow((p.x-uJ.x)/(.03+.12*dh),2.));
#endif
   L=mix(Lw,mix(L,.7,.3),fz*.5);
  }else if(onF>.5){
   // the harbour face: courses following the curve, closing up with distance, every block edge nicked
   float cH=hwB/9.,cq=hF/cH+.25*(vn(vec2(sF*6.,75.5))-.5),ci=floor(cq),cf=fract(cq);
   float bq=sF/(.28+.08*hs(ci*1.3))+.5*ci+.2*(vn(vec2(hF*30.,ci+76.5))-.5),bi=floor(bq),bf=fract(bq);
   float jn=smoothstep(.0,.07,cf)*smoothstep(1.,.93,cf)*smoothstep(.0,.04,bf)*smoothstep(1.,.96,bf);
   float tdl=hwB*(.3+.12*hs(77.))+.01*(vn(vec2(sF*12.,78.5))-.5);
   float Lf=(.17+.12*hs(bi*2.3+ci*7.1)+.06*vn(vec2(sF*20.,hF*30.)))*(.35+.65*jn);
   Lf=mix(Lf,.035+.03*vn(vec2(sF*30.,hF*80.)),smoothstep(tdl+.004,tdl-.004,hF));
#ifdef XI
   Lf*=.25;
#endif
   L=mix(Lf,mix(L,.8,.4),smoothstep(4.,18.,tF)*.6);
   dep=max(dep,.03);
  }else if(onO>.5){
   // the seaward face, battered, seen past the walkway's edge: dark, weed toward the water
   float ho=hwB*(1.-(rS-ro-eN)/.3);
   float Lo=(.07+.06*vn(vec2(thS*Rr*5.,ho*40.)))*mix(.4,1.,smoothstep(.1,.25,ho));
#ifdef XI
   Lo*=.3;
#endif
   L=mix(Lo,L,smoothstep(4.,18.,Zs)*.5);
  }else if(rS<ri&&thS<te+.1){
   // dead flat water inside the curve: the wall's face hangs in it upside down, broken by a faint stir
   vec2 dR=vec2(p.x+.003*(vn(vec2(p.x*30.,p.y*260.))-.5),1.);
   float aR=dot(dR,dR),bR=dot(dR,cB),tR=(bR+sqrt(max(bR*bR-aR*(dot(cB,cB)-ri*ri),0.)))/aR,hR=-1.+dh*tR;
   vec2 vR=dR*tR-cB;float thR=acos(clamp(bs*vR.x/ri,-1.,1.))*sign(vR.y+1e-5);
   float rf=step(0.,hR)*smoothstep(hwB+.01,hwB-.01,hR)*step(thR,te);
#ifdef XI
   L=mix(L,.03,rf*.9);
#else
   L=mix(.86+.06*vn(vec2(p.x*8.,p.y*40.)),.12+.08*smoothstep(hwB*.45,hwB,hR),rf*.85);
#endif
  }
 }
 // squat stone bollards along the harbour edge, then the beacon at the end: a stone stump with a lantern cage and a
 // flat cap
 for(int k=0;k<4+uZ;k++){float fk=float(k);
  if(fk<uJ.z){
   float tk=te*(.22+.19*fk+.06*hs(fk+79.));vec2 Pk=cB+(ri+.14)*vec2(bs*cos(tk),sin(tk));
   float Zk=Pk.y,xk=Pk.x/Zk,yb=hz-(1.-hwB)/Zk,ht=(.065+.015*hs(fk+80.))/Zk,wk=(.04+.008*hs(fk+81.))/Zk;
   float xx=p.x-xk,yy=p.y-yb,ch=wk*.25;
   float m=step(-.0005,yy)*step(yy,ht)*step(abs(xx),wk-ch*smoothstep(ht-ch,ht,yy));
   L=mix(L,(.07+.18*smoothstep(ht-wk*.35,ht,yy))*(.75-.35*clamp(xx*bs/wk,-1.,1.)),m*(1.-smoothstep(10.,20.,Zk)*.5));
  }
 }
 {vec2 Pb=cB+Rr*vec2(bs*cos(te),sin(te));float Zb=Pb.y,xb=Pb.x/Zb,yb=hz-(1.-hwB)/Zb,u=(p.x-xb)*Zb,v=(p.y-yb)*Zb;
  float st_=step(0.,v)*step(v,.17)*step(abs(u),.14-.03*v/.17);
  float cg=step(.17,v)*step(v,.27)*step(abs(u),.08)*max(step(.65,fract(u/.04+.5)),step(.255,v));
  float cp=step(.27,v)*step(v,.3)*step(abs(u),.11);
  float mb=max(st_,max(cg,cp));
#ifdef XI
  L=mix(L,.04+.4*exp(-abs(u-.1*sign(uJ.x-xb))/.02)*step(v,.3),mb);
#else
  L=mix(L,.08+.06*step(.17,v)*step(v,.27)+.05*step(0.,-u*bs),mb);
#endif
 }
 }
#endif
`,P=(m,w)=>{const x=(ot,st)=>{if(!m.includes(ot))throw new Error("322 patch: "+ot.slice(0,50));m=m.split(ot).join(st)},M=w.includes("XW"),Z=w.includes("XC"),N=w.includes("XI"),rt=w.includes("XT"),et=w.includes("XS"),yt=w.includes("XB");if((Z||N||rt||et||yt)&&x("uniform int uR;","uniform int uR;uniform vec4 uH,uJ;"),M){const ot=(st,l)=>m.slice(m.indexOf(st),m.indexOf(l)+l.length);x(ot("   float stv=fb(","+.04*exp(-(hz-p.y)*70.);"),f),x(`    L*=1.-.3*smoothstep(1.,.3,abs(x))*exp(-max(base-p.y,0.)/(.3*h+.004))*step(p.y,base+.002)*(1.-.6*sh)*(1.-dz*.8);
`,""),x(ot("    gl=.55*smoothstep(.45,.75,","smoothstep(.4,.7,vn(vec2(p.x*60.,p.y*90.)));"),d),x(" for(int k=0;k<uR;k++){"," float wv=1.;for(int k=0;k<uR;k++){"),x("  if(abs(x)<1.6){","  if(abs(x)<2.8){"),x("   float Lr=face*",`   led*=smoothstep(.35,.6,vn(vec2(rp.x*3.,bu*1.3)+fk*4.));
   float Lr=face*`),x(`L=mix(L,Lr,al);
   if(fg)`,`L=mix(L,Lr,al);wv*=1.-al;
   if(fg)`)}if(N){x(`,dep=0.;
`,",dep=0.;"+u+`
`),x(`#ifndef XW
  if(sh<.5){`,`#ifdef XI
`+p+`
#elif !defined(XW)
  if(sh<.5){`),x(`   float gl=0.;
`,z+`float gl=0.;
`),x(`#endif
   }
   L+=gl*(1.-al);`,`#endif
    gl=0.;
   }
   L+=gl*(1.-al);`),x("float Lt_=.62+.16*ls*clamp(tx/tw,-1.,1.)-.08*tyy;","float Lt_=.035+.3*smoothstep(.55,1.,clamp(tx/tw,-1.,1.)*sign(uJ.x-cx+1e-4));");for(const[ot,st]of[["Lp=mix(Lp,.86,","Lp=mix(Lp,.3,"],["L=mix(Ld,.86,","L=mix(Ld,.3,"],["float Ld=(.34+.18*","float Ld=(.05+.05*"],["L=mix(.05,.86,","L=mix(.05,.3,"],["mix(.07,.86,","mix(.07,.3,"],["float g=exp(-abs(p.y-yw)","float g=0.*exp(-abs(p.y-yw)"],["float Lh=.58+","float Lh=.24+"]])x(ot,st)}else Z&&x("float Lh=.58+","float Lh=.7+");return Z&&(x(`#ifndef XP
 // rocks`,`#if !defined(XP)&&!defined(XC)
 // rocks`),x(`#ifdef XP
 // pier`,E+`#ifdef XP
 // pier`)),rt&&(x(`#ifndef XP
 // rocks`,`#if 0
 // rocks`),x(`#ifdef XP
 // pier`,b+`#ifdef XP
 // pier`),x("void main(){",i+"void main(){"),x(" if(t>-.1){"," if(t>-.1&&uC.z>0.){")),et&&(x(`#ifndef XP
 // rocks`,`#if 0
 // rocks`),x(`#ifdef XP
 // pier`,A+`#ifdef XP
 // pier`),x(" if(t>-.1){"," if(t>-.1&&uC.z>0.){")),yt&&(x(`#ifndef XP
 // rocks`,`#if 0
 // rocks`),x(`#ifdef XP
 // pier`,U+`#ifdef XP
 // pier`),x(" if(t>-.1){"," if(t>-.1&&uC.z>0.){")),m},K=s+e+`in vec2 vU;out vec4 o;uniform sampler2D uS,uM,uD;uniform vec4 uA,uB,uC,uE,uF,uG;uniform int uT,uI;
vec4 bc(vec2 uv){vec2 sz=vec2(32.,24.);vec2 st=uv*sz-.5,i=floor(st),f=fract(st);
 vec2 w0=(1.-f)*(1.-f)*(1.-f)/6.,w1=(4.-6.*f*f+3.*f*f*f)/6.,w3=f*f*f/6.,w2=1.-w0-w1-w3;
 vec2 s0=w0+w1,s1=w2+w3,t0=(i-.5+w1/s0)/sz,t1=(i+1.5+w3/s1)/sz;
 return mix(mix(texture(uM,t0),texture(uM,vec2(t1.x,t0.y)),s1.x),mix(texture(uM,vec2(t0.x,t1.y)),texture(uM,t1),s1.x),s1.y);}
vec2 cn(float i){return vec2((i==1.||i==2.)?1.:0.,i>=2.?1.:0.);}
float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7))+uB.w)*43758.5453);}
float hI(vec2 p,float k){uvec3 q=uvec3(ivec3(int(p.x)+65536,int(p.y)+65536,int(k+uB.w*17.)));q=q*1664525u+1013904223u;q.x+=q.y*q.z;q.y+=q.z*q.x;q.z+=q.x*q.y;q^=q>>16u;q.x+=q.y*q.z;return float(q.x>>8)*(1./16777216.);}
void main(){
 vec2 pu=vU;float PA=uA.x;vec2 pp=pu*vec2(PA,1.);
 vec4 M=bc(pu);float th0=M.r*2.,tz=M.g;
 float dE=min(min(pu.x,1.-pu.x)*PA,min(pu.y,1.-pu.y));
 float e=uC.y,dpe=e==0.?pu.y:e==1.?(1.-pu.x)*PA:e==2.?1.-pu.y:pu.x*PA,alg=mod(e,2.)==0.?pp.x:pp.y;
 float th=th0+uC.z*exp(-dpe/.03)*(.5+.9*fb(vec2(alg*14.,dpe*30.)))+.3*exp(-dE/.007);
 vec2 dc=cn(uE.z);float rd=length((pu-dc)*vec2(PA,1.));
 float osm=smoothstep(.34,.06,rd)*smoothstep(.4,.8,tz);
 float ph=tz*uC.w+2.2*fb(pp*6.)+.6*fb(pp*19.),fr=fract(ph);
 float rdg=smoothstep(0.,.12,fr)*smoothstep(1.,.35,fr);
 th*=1.+.8*osm*(rdg-.45);
 vec2 tq=(pu-uG.xy)*vec2(PA,1.);float tr=length(tq*vec2(1.,1.25))+.012*(fb(pp*40.)-.5);
 float cov=smoothstep(.03,.1,th0)*smoothstep(uG.z-.012,uG.z+.01,tr);
 vec2 m=uA.yz,iu=(pu-m)/(1.-2.*m);float A=PA*(1.-2.*m.x)/(1.-2.*m.y);
 float bx=min(min(iu.x,1.-iu.x)*A,min(iu.y,1.-iu.y))*(1.-2.*m.y);
 float hold=smoothstep(0.,.004,bx+.032*(fb(pp*2.6+uB.w)-.5)+.022*(vn(pp*9.+uB.w)-.5)+.008*(vn(pp*26.+uB.w)-.5)+.004*(fb(pp*50.)-.5)+.05*exp(-dpe/.04)*(.5+fb(vec2(alg*9.,3.)+uB.w)));
 vec2 lc=vec2(.5),lo=vec2(0.,1.);float Rm=sqrt(A*A*.25+.25);
 if(uA.w>.5){float hf=step(.5,iu.x);lc.x=.25+.5*hf;lo=vec2(.5*hf,.5*hf+.5);Rm=sqrt(A*A/16.+.25);hold*=smoothstep(.006,.012,abs(iu.x-.5)*A);}
 vec2 q=clamp(iu,0.,1.),d=(q-lc)*vec2(A,1.);float rl=length(d),rn=rl/Rm;
 float b=uB.x*.05*pow(smoothstep(.25,1.05,rn),2.);
 float bi=textureLod(uS,q,2.).g*.012;
 float nT=float(uT),acc=0.,ws=0.,ir=1./max(rl,.03);
 float lod=clamp(log2(max(max(b,bi),1e-4)*uF.x/sqrt(nT)*1.6)-.4,0.,6.);
 for(int i=0;i<uT;i++){float fi=float(i)+.5,rr=sqrt(fi/nT),an=fi*2.39996;vec2 cs=vec2(cos(an),sin(an))*rr;
  float a=cs.x*b*ir,ca=cos(a),sa=sin(a);
  vec2 dd=vec2(d.x*ca-d.y*sa,d.x*sa+d.y*ca)*(1.+cs.y*b*.3*ir)+cs*bi;
  vec2 qq=lc+dd/vec2(A,1.);qq=vec2(clamp(qq.x,lo.x+.001,lo.y-.001),clamp(qq.y,.001,.999));
  float w=1.-.55*rr*rr;acc+=w*pow(textureLod(uS,qq,lod).r,2.2);ws+=w;}
 float Ls=acc/ws*1.6,gw=pow(textureLod(uS,q,5.).r,2.2)*1.6;
 float V=1./pow(1.+rn*rn*.26*uF.z,2.)*mix(1.,smoothstep(1.5,.8,rn),uF.y);
 float E=(Ls+.035*gw)*V*uB.y;
 float lE=mix(-10.,log2(max(E,1e-4))+log2(.3+.9*smoothstep(0.,1.1,th)),hold);
 float Dm=(.45+1.1*smoothstep(.2,1.6,th))*cov*(1.+.5*exp(-pow((tr-uG.z-.016)/.007,2.)));
 float fg=.008+uE.x*.07*smoothstep(.7,.85,fb(pp*16.+uB.w))+.02*exp(-dE/.02);
 float stn=exp(-rd/.06)*smoothstep(.35,.7,fb(vec2(dot(pp,vec2(.7)),dot(pp,vec2(-.7,.7))*12.)+uB.w));
 vec2 g=pp*170.,gi=floor(g);float hp=hI(gi,1.),clr=0.;
 if(hp<uE.y*1.3*smoothstep(.3,.7,fb(pp*3.+uB.w))*(.3+1.7*exp(-dpe/.2))*(.45+.55*smoothstep(.12,.42,length(pp-vec2(PA*.5,.5))))){vec2 o2=vec2(hI(gi,2.),hI(gi,3.))*.5+.25;float hz2=hI(gi,4.),sz=.22+1.5*hz2*hz2*hz2*hz2;clr=smoothstep(.2*sz+.09,.2*sz-.05,length(fract(g)-o2))*min(1.,.3+sz);}
 for(int k=0;k<uI;k++){vec4 c0=texelFetch(uD,ivec2(k,0),0)*255.,c1=texelFetch(uD,ivec2(k,1),0);
  vec2 cp=vec2(c0.r*256.+c0.g,c0.b*256.+c0.a)/65535.,cd=normalize(c1.rg*2.-1.+1e-4);float cl=.007+c1.b*.028,cw=.0007+c1.a*.0011;
  vec2 r2=(pu-cp)*vec2(PA,1.);float a=dot(r2,cd),bb=dot(r2,vec2(-cd.y,cd.x)),wd=cw*(1.+2.*clamp(a/cl,0.,1.));
  float tl=smoothstep(-cw,cw,a)*smoothstep(cl,cl*.2,a)*exp(-bb*bb/(wd*wd)),hd=exp(-dot(r2,r2)/(cw*cw*1.2));
  clr=max(clr,max(tl*.5,hd*.8));fg+=.08*tl*smoothstep(.3,1.,abs(bb)/wd);}
 clr=max(clr,.6*stn);
 o=vec4(clamp((lE+10.)/12.+(h21(gl_FragCoord.xy)-.5)/255.,0.,1.),Dm*.5,clamp(fg,0.,1.),1.-clr);
}`,G=s+e+`in vec2 vU;out vec4 o;uniform vec4 uA,uB;
vec2 h22(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)))+uA.w)*43758.5453);}
vec2 cn(float i){return vec2((i==1.||i==2.)?1.:0.,i>=2.?1.:0.);}
void main(){vec2 pu=vU;float PA=uA.x;vec2 pp=pu*vec2(PA,1.);
 float dE=min(min(pu.x,1.-pu.x)*PA,min(pu.y,1.-pu.y)),cz=0.;
 if(uA.y>.5){
  float ba=uA.w*.7;vec2 bd=vec2(cos(ba),sin(ba));
  vec2 cq=vec2(dot(pp,bd)*11.,dot(pp,vec2(-bd.y,bd.x))*72.)+vec2(fb(pp*2.5+uA.w),fb(pp*2.5+uA.w+37.))*vec2(3.,9.),ci=floor(cq),cf=fract(cq),id1=vec2(0),id2=vec2(0);float F1=9.,F2=9.;
  for(int j=-1;j<=1+uZ;j++)for(int i=-1;i<=1+uZ;i++){vec2 gg=vec2(i,j),r=gg+h22(ci+gg)-cf;float dd=dot(r,r);
   if(dd<F1){F2=F1;id2=id1;F1=dd;id1=ci+gg;}else if(dd<F2){F2=dd;id2=ci+gg;}}
  float ed=sqrt(F2)-sqrt(F1),kp=step(.4,h22(id1+id2).x),wdt=.03+.04*fb(pp*30.);
  cz=(1.-smoothstep(wdt*.4,wdt,ed))*kp*(.55+.45*fb(pp*60.));
  cz*=smoothstep(.62,.74,fb(pp*2.2+uA.w+9.)+.25*exp(-length((pu-cn(uB.y))*vec2(PA,1.))/.25))*(uA.y>1.5?1.:0.);
 }
 float vt=.55+.35*fb(pp*1.6+uA.w+3.)+.5*exp(-length((pu-cn(uB.y))*vec2(PA,1.))/.3)+.25*smoothstep(.6,.8,fb(vec2(pp.x*3.,pp.y*.6)+11.))+.3*(vn(vec2(pp.x*1.2+uA.w,pp.y*85.))-.5);
 float rs=0.;
 if(uB.z!=1.){
  for(int k=0;k<3+uZ;k++){float fk=float(k);vec2 hk=h22(vec2(fk,3.));float sd_=floor(hk.x*4.),tp=.08+.84*hk.y,ins=.002+.006*h22(vec2(fk,5.)).x;
   vec2 bc=sd_<1.?vec2(tp,ins):sd_<2.?vec2(1.-ins/PA,tp):sd_<3.?vec2(tp,1.-ins):vec2(ins/PA,tp);
   vec2 dq=(pu-bc)*vec2(PA,1.);float dc=length(dq*(mod(sd_,2.)<.5?vec2(.4,1.):vec2(1.,.4))),R=(.006+.012*h22(vec2(fk,9.)).y)*uA.z*step(fk,uB.w+.5);
   float rr_=dc-R*(.3+1.4*vn(pp*55.+fk*7.)*vn(pp*17.+fk*13.));rs=max(rs,max(smoothstep(.0015,-.0015,rr_)*(.8+.2*smoothstep(R*.5,0.,dc)),.4*smoothstep(R*1.6+.004,0.,rr_)*step(.001,R)));}
  rs=max(rs,.3*smoothstep(.004,0.,dE-.006*fb(pp*30.)*uA.z)*smoothstep(.5,.7,fb(pp*12.)));
  float bl=fb(pp*28.+uA.w*2.);rs=max(rs,(smoothstep(.84,.87,bl)*.8+.4*smoothstep(.79,.84,bl))*uA.z*(uB.w>1.5||uB.x>.5?1.:smoothstep(.08,.02,dE)));
 }
 float pl=0.;
 if(uB.x>.5){
  // the image lifts in angular scales: two rotated grids of flakes, each lost when the damage at its own centre passes
  // the threshold (damage starts at the edges and at dents); a stain of rust spreads round each loss
  vec2 f1=floor(mat2(.8,.6,-.6,.8)*pp*26.),f2=floor(mat2(.5,-.87,.87,.5)*pp*19.);
  float pn=fb(pp*3.5+uA.w+5.)*.75+.45*exp(-dE/.1);
  pl=max(step(.62+.09*h22(f1).x,pn),step(.64+.09*h22(f2+40.).y,pn));rs=max(rs,.32*smoothstep(.52,.62,pn)*(1.-pl));}
 o=vec4(cz,clamp(vt*.6,0.,1.),rs,pl);
}`,J=s+e+`in vec2 vU;out vec4 o;uniform sampler2D uP1,uP2,uM;uniform vec4 uQ0,uQ1,uQ2,uQ3,uT,uK,uL,uW;
const vec3 WC=vec3(-.55,1.3,1.3);
vec2 env(vec3 P,vec3 r,float r1,float r2){
 float L=.004+.006*max(r.z,0.)+.012*max(r.y,0.);vec2 R=vec2(L);
 if(r.y>.02){float t=(WC.y-P.y)/r.y;vec2 w=vec2(P.x+r.x*t,P.z+r.z*t)-WC.xz,a=abs(w);
  float tl=-.28+.22*vn(vec2(w.x*9.,3.))+.1*vn(vec2(w.x*31.,5.));
  for(int k=0;k<2+uZ;k++){float s=.012+(k==0?r1:r2)*t;
   float fr=smoothstep(s,-s,max(a.x-.75,a.y-.8)),fo=smoothstep(s,-s,max(a.x-.87,a.y-.92))-fr;
   float br=max(max(smoothstep(.032+s,.032-s,a.x),smoothstep(.028+s,.028-s,abs(w.y-.18))),max(smoothstep(.012+s,.012-s,abs(a.x-.43)),max(smoothstep(.012+s,.012-s,abs(w.y+.36)),smoothstep(.012+s,.012-s,abs(w.y-.6)))));
   float ou=mix(.8+.4*vn(w*40.),4.+1.5*clamp(w.y,0.,1.),smoothstep(-s-.01,s+.01,w.y-tl));
   float v=L+fr*(1.-br)*ou+fo*.22+fr*br*.12;if(k==0)R.x=v;else R.y=v;}}
 R+=.012*smoothstep(.74,.95,dot(r,normalize(WC-P)));
 return R;}
float sg(float x){return 1./(1.+exp(-x));}
float rr2(vec2 q,vec2 b,float r){vec2 d=abs(q)-b+r;float c=.035+.035*fract(sin(dot(sign(q),vec2(3.1,7.7)))*43.7);return max(length(max(d,0.))+min(max(d.x,d.y),0.)-r,(abs(q.x)+abs(q.y)-b.x-b.y+c)*.7071);}
void main(){
 vec2 sp=vU*2.-1.;vec3 C=vec3(0,0,4),d=normalize(vec3(sp*.29,-1.));
 vec3 O=uQ0.xyz,ex=uQ1.xyz,ey=uQ2.xyz,n=uQ3.xyz;float hw=uQ0.w,hh=uQ1.w,PA=uQ2.w,px=uQ3.w;
 float tp=dot(O-C,n)/dot(d,n);vec3 P=C+tp*d,rl=P-O;
 vec2 pq=vec2(dot(rl,ex),dot(rl,ey));
 float sdf=rr2(pq,vec2(hw,hh),.03)+.005*(vn(pq*7.)-.5)+.0018*(vn(pq*70.)-.5)+.0012*(vn(pq*190.)-.5);
 float inP=smoothstep(px*.8,-px*.8,sdf);
 vec3 Pt=C+(-C.z/d.z)*d,Lt=normalize(WC-Pt);
 float irT=.62*max(Lt.z,0.)/(1.+.12*dot(WC-Pt,WC-Pt))+.035;
 float dn=dot(Lt,n),sh=0.;
 if(abs(dn)>1e-3){float s=dot(O-Pt,n)/dn;if(s>0.){vec3 Hh=Pt+s*Lt-O;sh=smoothstep(.004+.45*s,-.004-.45*s,rr2(vec2(dot(Hh,ex),dot(Hh,ey)),vec2(hw,hh),.03));}}
 vec3 rt=Pt-O;float sdt=rr2(vec2(dot(rt,ex),dot(rt,ey)),vec2(hw,hh),.03),hgt=max(dot(O-Pt,n)/max(n.z,.2),0.);
 float ao=1.-.6*exp(-max(sdt,0.)/.016)*smoothstep(.12,0.,hgt);
 vec3 alb;
 if(uW.y<.5){vec2 w=vec2(Pt.x*.98+Pt.y*.2,Pt.y*.98-Pt.x*.2);float g=fb(vec2(w.x*.7,w.y*5.)),ring=.5+.5*sin(w.y*70.+g*22.),fi=fb(vec2(w.x*6.,w.y*160.));
  float po=smoothstep(.62,.8,vn(vec2(w.x*40.,w.y*700.)));alb=vec3(.25,.16,.10)*(.12+.035*ring*ring+.06*fi)*(.75+.5*fb(w*2.))*(1.-.5*po);}
 else alb=vec3(.010,.010,.011)*(.8+.5*fb(Pt.xy*300.));
 // the window's light lies across the bench in a soft pool, crossed by the shadow of the glazing bars; it swells
 // and sinks as cloud passes outside (uW.w)
 vec2 wq=Pt.xy-vec2(-1.32,1.27);float wu=dot(wq,vec2(.97,-.24))/1.45,wv=dot(wq,vec2(.41,-.91))/.8,sq=.04+.07*wv;
 float pool=smoothstep(-sq,sq,min(min(wu,1.-wu),min(wv,1.-wv))*1.2)*(1.-.75*max(smoothstep(.022+sq,.022-sq,abs(wu-.5)),smoothstep(.022+sq,.022-sq,abs(wv-.46))));
 pool*=uW.w;irT*=1.+1.1*pool;
 vec3 col=alb*irT*(1.-.8*sh)*ao;
 if(inP>0.){
  vec2 pu=pq/vec2(hw,hh)*.5+.5,pp=pu*vec2(PA,1.);
  vec4 A1=texture(uP1,pu),B1=texture(uP2,pu),M=texture(uM,pu);
  float tx=uL.z,tm=uL.w;
  float gx=texture(uP1,pu+vec2(tx,0)).g-texture(uP1,pu-vec2(tx,0)).g,gy=texture(uP1,pu+vec2(0,tx)).g-texture(uP1,pu-vec2(0,tx)).g;
  float lE=A1.r*12.-10.,Dm=A1.g*2.,fog=A1.b,kp=A1.a,cz=B1.r,vt=B1.g,rs=B1.b,pl=B1.a;
  float jit=(fb(pp*8.)-.5)*.14+(vn(pp*90.)-.5)*.03;
  float td=uT.x-(M.r+jit)*uT.y,dd=clamp(td/uT.z,0.,1.),dv=dd*(2.-dd);
  vec2 gM=vec2(texture(uM,pu+vec2(tm,0)).r-texture(uM,pu-vec2(tm,0)).r,texture(uM,pu+vec2(0,tm)).r-texture(uM,pu-vec2(0,tm)).r)+1e-5;
  vec2 fd=normalize(gM);
  float strk=fb(vec2(dot(pp,vec2(-fd.y,fd.x))*40.,dot(pp,fd)*2.5))-.5,wav=sin(M.r*60.+fb(pp*4.)*5.);
  float D=Dm*sg(3.*(lE+1.15*log2(max(dv,.004))+.38));
  D*=1.+uK.w*(.26*strk+.02*wav)*dv+.14*M.b*dv;
  D=(D+fog*dv)*kp*(1.-pl);
  float s=1.-exp(-1.7*D);
  float tf=uT.x-uT.w-(M.g+jit*.8)*uL.x,cov=smoothstep(.02,.25,Dm);
  float cr=(1.-smoothstep(0.,uL.y,tf))*cov*(1.-pl);
  float wet=exp(-td*td*60.)*cov*(1.-pl);
  vec3 nn=normalize(n-(clamp(gx,-.01,.01)*ex+clamp(gy,-.01,.01)*ey)*2.5+((vn(pp*2.2)-.5)*ex+(vn(pp*2.2+40.)-.5)*ey)*.12+cz*(vn(pp*400.)-.5)*.2*ex);
  float tin=uK.x==1.?0.:1.;
  vec3 sil=mix(vec3(.64,.65,.66),vec3(.70,.625,.465),uK.y),bas=mix(vec3(.026,.026,.028),vec3(.009,.0068,.005),tin);
  vec3 dif=mix(bas,sil,s),crm=vec3(.68,.61,.45)*(.55+.3*min(Dm,1.4));
  dif=mix(dif,crm*(1.-.62*s)+sil*s*.1,cr);
  float rc=smoothstep(.45,.6,rs);dif*=1.-.6*smoothstep(.05,.38,rs)*(1.-rc);dif=mix(dif,mix(vec3(.15,.062,.026),vec3(.24,.10,.035),smoothstep(.9,1.,rs)*smoothstep(.45,.8,fb(pp*90.)))*(.55+.9*fb(pp*70.)),rc);
  dif*=mix(vec3(1),vec3(1.,.84,.60),clamp(vt*uK.z*.55,0.,1.))*mix(vec3(1),vec3(.94,.97,1.03),uW.z);
  dif*=1.-.18*cz;
  float scr=(1.-smoothstep(0.,.0035,abs(vn(vec2(dot(pp,vec2(.8,.6))*.9,dot(pp,vec2(-.6,.8))*.12)+33.)-.5)))*smoothstep(.7,.76,vn(pp*3.1+5.))
   +(1.-smoothstep(0.,.003,abs(vn(vec2(dot(pp,vec2(.2,.98))*1.1,dot(pp,vec2(-.98,.2))*.1)+71.)-.5)))*smoothstep(.72,.78,vn(pp*2.6+19.));
  dif=mix(dif,vec3(.06,.055,.05),min(scr,1.)*.45);
  float rim=smoothstep(.1,.35,pl)*smoothstep(.75,.45,pl);
  // peeled collodion: the flake's lifted lip catches the window on one side and throws a hair of shadow on the other;
  // the iron under it is black-brown going to rust
  vec4 qx=texture(uP2,pu+vec2(tx,0))-texture(uP2,pu-vec2(tx,0)),qy=texture(uP2,pu+vec2(0,tx))-texture(uP2,pu-vec2(0,tx));
  vec2 pg=vec2(qx.a,qy.a)+1e-5,wd2=normalize(vec2(dot(vec2(-.55,1.3),ex.xy),dot(vec2(-.55,1.3),ey.xy)));
  float plit=.5+.5*dot(normalize(pg),wd2),chl=max(dot(vec2(qx.r,qy.r),wd2),0.);
  // under a lost flake: rough rust, orange-brown, darker toward the lip
  float rv=vn(pp*45.);dif=mix(dif,vec3(.10,.045,.022)*(.3+1.2*rv*rv)*(.5+.5*smoothstep(.3,.7,vn(pp*9.))),smoothstep(.55,.95,pl));
  dif=mix(dif,sil*.5,rim*.9*plit*plit*plit);dif*=1.-.75*rim*(1.-plit);
  vec3 Lw=normalize(WC-P);
  float ir=.62*max(dot(nn,Lw),0.)/(1.+.12*dot(WC-P,WC-P))*(1.+.5*pool)+.02;
  vec3 r=reflect(d,nn);
  float fr=.04+.96*pow(1.-max(dot(-d,nn),0.),5.);
  vec2 e=env(P,r,.2,.26);
  float gb=(tin*.06+.03)*(1.-s)*(1.-cr)*(1.-rc);
  vec3 pc=dif*ir+vec3(fr*(.5+.7*uW.z)*(1.-.8*cz)+gb)*e.x*mix(vec3(1),vec3(1.,.9,.75),clamp(vt*uK.z*.4,0.,1.))*mix(vec3(1),vec3(1.,.9,.78),tin*(1.-s))+.006*s*(1.-cr)*e.y*sil;
  pc+=sil*min(chl,.25)*.3*(ir+.4*e.x);
  float ge=smoothstep(-.005,-.0008,sdf);
  if(tin<.5)pc=mix(pc,vec3(.10,.16,.13)*ir+.12*e.x,ge*.8);
  else pc=mix(pc,vec3(.05,.035,.025)*ir+.05*e.x,ge*.5);
  pc+=wet*.05*(ir+e.x);
  vec2 oq=pq/vec2(hw,hh),on=sign(oq)*pow(abs(oq),vec2(10.));on/=length(on)+1e-5;
  float hl=smoothstep(-.0045,-.0015,sdf)*smoothstep(.0003,-.001,sdf)*max(dot(on.x*ex.xy+on.y*ey.xy,normalize(vec2(-.55,1.3)-P.xy)),0.);
  pc+=vec3(.95,.9,.8)*hl*.08;
  col=mix(col,pc,inP);
 }
 col*=uW.x;
 col=col*col/(col+.01);col=1.-exp(-col*1.1);
 o=vec4(pow(col,vec3(1./2.2))+(vn(gl_FragCoord.xy*.73)-.5)/255.,1);
}`,X={},_=[],C=(m,w,x)=>{const M=t.createProgram(),Z=t.createShader(t.VERTEX_SHADER),N=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(Z,w),t.shaderSource(N,x),t.compileShader(Z),t.compileShader(N),t.attachShader(M,Z),t.attachShader(M,N),t.linkProgram(M),_.push([m,M,Z,N]),X[m]=M},W=s+e+n;C("sc",a,W),C("p1",a,K),C("p2",a,G),C("co",a,J);const T={},xt=()=>{for(const[m,w,x,M]of _)if(!t.getProgramParameter(w,t.LINK_STATUS))throw new Error("322 "+m+": "+(t.getShaderInfoLog(M)||t.getShaderInfoLog(x)||t.getProgramInfoLog(w)));for(const m in X){T[m]={};for(const w of["uN","uO","uA","uB","uC","uE","uF","uR","uT","uI","uS","uM","uD","uP1","uP2","uQ0","uQ1","uQ2","uQ3","uK","uL","uW","uG"])T[m][w]=t.getUniformLocation(X[m],w)}t.useProgram(X.sc),t.uniform1i(T.sc.uN,0),t.uniform1i(T.sc.uO,5),t.useProgram(X.p1),t.uniform1i(T.p1.uN,0),t.uniform1i(T.p1.uS,1),t.uniform1i(T.p1.uM,2),t.uniform1i(T.p1.uD,3),t.uniform1i(T.p1.uO,4),t.uniform1i(T.p1.uT,28),t.useProgram(X.p2),t.uniform1i(T.p2.uN,0),t.uniform1i(T.p2.uO,4),t.useProgram(X.co),t.uniform1i(T.co.uN,0),t.uniform1i(T.co.uP1,1),t.uniform1i(T.co.uP2,2),t.uniform1i(T.co.uM,3),t.uniform1i(T.co.uO,4),Ct.fin=null},mt=m=>{if(X[m])return;const w=m.split("_");C(m,a,s+w.map(et=>"#define "+et+`
`).join("")+e+P(n,w));const[x,M,Z,N]=_.pop();if(!t.getProgramParameter(M,t.LINK_STATUS))throw new Error("322 "+m+": "+(t.getShaderInfoLog(N)||t.getShaderInfoLog(Z)||t.getProgramInfoLog(M)));const rt=T[m]={};for(const et of["uA","uB","uC","uG","uR","uN","uO","uH","uJ"])rt[et]=t.getUniformLocation(M,et);t.useProgram(M),t.uniform1i(rt.uN,0),t.uniform1i(rt.uO,5)};t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1);const pt=(m,w,x,M,Z)=>{const N=t.createTexture();return t.bindTexture(t.TEXTURE_2D,N),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,m,w,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,Z||x),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,x),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,M),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,M),N},V=m=>{const w=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,w),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,m,0),w};let $=322;const tt=new Uint8Array(256*256*4);for(let m=0;m<tt.length;m++)$=Math.imul($^$>>>15,739982445)+1831565813|0,tt[m]=$>>>24&255;const Ot=pt(256,256,t.LINEAR,t.REPEAT);t.texSubImage2D(t.TEXTURE_2D,0,0,0,256,256,t.RGBA,t.UNSIGNED_BYTE,tt);const Gt=t.createVertexArray(),Q=m=>new Float32Array(m),Ct={P:X,U:T,fin:xt,full:mt,tex:pt,fbo:V,tN:Ot,vao:Gt,pools:{},h:Q(D),hn:Q(D),ph:Q(D),mu:Q(D),tf:Q(D),ux:Q(D),uy:Q(D),Fx:Q(D),Fy:Q(D),bk:new Uint8Array(D),T:Q(D),sl:Q(D),lut:(()=>{const m=Q(256);for(let w=0;w<256;w++)m[w]=Math.exp(7*w/255);return m})(),C8:new Uint8Array(D*4),A8:new Uint8Array(D*4),D8:new Uint8Array(16*2*4)};return Ct})()),S=h.U,Mt=qt>400,ne=Mt?"b":"s",ut=h.pools[ne]||(h.pools[ne]={list:[],next:0});let R;if(ut.list.length<(Mt?2:9)){const s=Mt?896:256,a=Mt?896:320,e=h.tex(s,s,t.LINEAR,t.CLAMP_TO_EDGE,t.LINEAR_MIPMAP_LINEAR);t.generateMipmap(t.TEXTURE_2D);const n=h.tex(a,a,t.LINEAR,t.CLAMP_TO_EDGE),f=h.tex(a,a,t.LINEAR,t.CLAMP_TO_EDGE),d=h.tex(c,v,t.LINEAR,t.CLAMP_TO_EDGE),u=h.tex(c,v,t.LINEAR,t.CLAMP_TO_EDGE),p=h.tex(16,2,t.NEAREST,t.CLAMP_TO_EDGE);R={tS:e,tP1:n,tP2:f,tC:d,tA:u,tD:p,fS:h.fbo(e),fP1:h.fbo(n),fP2:h.fbo(f),sres:s,pres:a},ut.list.push(R)}else R=ut.list[ut.next],ut.next=(ut.next+1)%ut.list.length;const Dt=(s,a,e)=>{let n=Math.imul(s*374761393+a*668265263+e*2147483647|0,1274126177);return n^=n>>>13,n=Math.imul(n,1274126177),((n^n>>>16)>>>0)/4294967296},Te=(s,a,e)=>{const n=Math.floor(s),f=Math.floor(a),d=s-n,u=a-f,p=d*d*(3-2*d),z=u*u*(3-2*u);return(Dt(n,f,e)*(1-p)+Dt(n+1,f,e)*p)*(1-z)+(Dt(n,f+1,e)*(1-p)+Dt(n+1,f+1,e)*p)*z},Tt=[0,c,c,0],Et=[0,0,v,v],Ee=(s,a,e)=>{const n=h.h,f=h.hn,d=h.ph,u=h.mu,p=h.tf,z=h.ux,E=h.uy,i=h.bk,b=h.Fx,A=h.Fy,U=h.lut,P=dt*v/c,K=a===0||a===3?1:-1,G=a<2?1:-1,J=Tt[a]+K*(1.1+1*s())/P,X=Et[a]+G*(1.1+1*s()),_=1.6+1*s(),C=s()*6;for(let l=0;l<v;l++)for(let H=0;H<c;H++){const I=l*c+H,at=(H+.5-J)*P,nt=(l+.5-X)*(1+.25*Math.sin(H*1.7+C));n[I]=0,d[I]=1,p[I]=-1,z[I]=0,E[I]=0,b[I]=0,A[I]=0,u[I]=1,i[I]=at*at+nt*nt<_*_?1:0}const W=(a+2)%4,T=e===(a+1)%4?1:3,xt=[W,(W+T)%4,(W+2*T)%4,e],mt=c/2+(Tt[W]-c/2)*(.25+.25*s()),pt=v/2+(Et[W]-v/2)*(.25+.25*s()),V=.25,$=.6,tt=.0022*(.8+.4*s()),Ot=18+10*s(),Gt=[50,46,46,170],Q=D*1/24,Ct=Tt[e]?1:-1,m=Et[e]?1:-1,w=Tt[e]?c-1:0,x=Et[e]?v-1:0;let M=0,Z=0,N=0;for(let l=0;l<v;l++)for(let H=0;H<c;H++){const I=(H+.5-mt)*P,at=l+.5-pt,nt=I*I+at*at;nt<12&&(N+=Math.exp(-nt/4))}for(let l=0;l<4;l++){const H=xt[l],I=l===3?3.4:3;let at=(Tt[H]-c/2)*P,nt=Et[H]-v/2;const de=Math.hypot(at,nt);at/=de,nt/=de;for(let Rt=0;Rt<Gt[l];Rt++,Z++){const ue=Math.min(1,(Rt+4)/12);let Qt=at*I*ue,Yt=nt*I*ue;if(l===3){const y=Math.sin(6.2832*Rt/Ot)*.7*Math.min(1,Rt/24);Qt+=-nt*I*y,Yt+=at*I*y}if(Z<24)for(let y=0;y<v;y++)for(let k=0;k<c;k++){const r=y*c+k,B=(k+.5-mt)*P,j=y+.5-pt,q=B*B+j*j;q<12&&!i[r]&&(n[r]+=Q*Math.exp(-q/4)/N)}for(let y=0;y<v;y++)for(let k=0;k<c-1;k++){const r=y*c+k,B=r+1;if(i[r]||i[B]){b[r]=0;continue}const j=Qt-$*(n[B]-n[r])/P,q=j>0?n[r]:n[B],ct=.24*q*P/V,vt=q*q*q/(Math.max(u[r],u[B])*(1+q*q))*j;b[r]=vt>ct?ct:vt<-ct?-ct:vt}for(let y=0;y<v-1;y++)for(let k=0;k<c;k++){const r=y*c+k,B=r+c;if(i[r]||i[B]){A[r]=0;continue}const j=Yt-$*(n[B]-n[r]),q=j>0?n[r]:n[B],ct=.24*q*P/V,vt=P*q*q*q/(Math.max(u[r],u[B])*(1+q*q))*j;A[r]=vt>ct?ct:vt<-ct?-ct:vt}for(let y=0;y<v;y++)for(let k=0;k<c;k++){const r=y*c+k;let B=0;k<c-1&&(B+=b[r]),k>0&&(B-=b[r-1]),y<v-1&&(B+=A[r]),y>0&&(B-=A[r-c]),f[r]=n[r]-V*B/P}if(l===3){const y=(Qt*Ct+Yt*m)*.7071;if(y>0)for(let k=0;k<v;k++)for(let r=0;r<c;r++){if((r-w)*(r-w)+(k-x)*(k-x)>7)continue;const j=k*c+r,q=f[j];f[j]=Math.max(0,q-Math.min(.5*q,V*2*q*q*q/(u[j]*(1+q*q))*y/P))}}for(let y=0;y<v;y++)for(let k=0;k<c;k++){const r=y*c+k,B=f[r];if(n[r]=B,B>.002){const j=Math.max(0,d[r]-V*tt/(B+.03));d[r]=j,u[r]=U[(1-j)*255|0],p[r]<0&&(u[r]>60?p[r]=M:(z[r]=z[r]*.9+.1*(b[r]+(k>0?b[r-1]:0)),E[r]=E[r]*.9+.1*(A[r]+(y>0?A[r-c]:0))))}}M+=V}}let rt=0,et=0,yt=0;for(let l=0;l<D;l++)n[l]>.01&&(rt+=n[l],et++);const ot=rt/Math.max(1,et);for(let l=0;l<D;l++)p[l]<0&&(p[l]=n[l]>.002?M+Math.max(0,.585-(1-d[l]))*(n[l]+.03)/tt:0),p[l]>yt&&(yt=p[l]);const st=h.C8;for(let l=0;l<D;l++){const H=Math.hypot(z[l],E[l])+1e-9;st[l*4]=Math.min(255,n[l]/ot*.5*255),st[l*4+1]=p[l]/yt*255,st[l*4+2]=128+z[l]/H*126,st[l*4+3]=128+E[l]/H*126}return[J/c,X/v,_/v*.62]},fe=(s,a,e,n)=>{const f=h.T,d=h.sl,u=dt*v/c,p=1e9;for(let i=0;i<v;i++)for(let b=0;b<c;b++){const A=i*c+b;d[A]=1/(.65+.7*Te(b*.22,i*.22,e))*(h.bk[A]?1.6:1);const U=Math.hypot((b+.5-s)*u,i+.5-a);f[A]=U<1.6?U*d[A]:p}for(let i=0;i<2;i++)for(let b=0;b<4;b++){const A=b&1,U=b>>1;for(let P=0;P<v;P++){const K=U?v-1-P:P;for(let G=0;G<c;G++){const J=A?c-1-G:G,X=K*c+J,_=Math.min(J>0?f[X-1]:p,J<c-1?f[X+1]:p),C=Math.min(K>0?f[X-c]:p,K<v-1?f[X+c]:p),W=d[X];let T=Math.min(_+W*u,C+W);if(_<p&&C<p){const xt=1/(u*u),mt=xt+1,pt=-2*(_*xt+C),V=_*_*xt+C*C-W*W,$=pt*pt-4*mt*V;if($>=0){const tt=(-pt+Math.sqrt($))/(2*mt);tt>=Math.max(_,C)-1e-6&&tt<T&&(T=tt)}}T<f[X]&&(f[X]=T)}}}let z=0;for(let i=0;i<D;i++)f[i]<p&&f[i]>z&&(z=f[i]);const E=h.A8;for(let i=0;i<D;i++){const b=Math.min(1,f[i]/z);E[i*4+n]=b*255,n===0&&(E[i*4+2]=Math.max(0,1-b*4)*255,E[i*4+3]=255)}},Pe=s=>{const a=ft(Y^Math.imul(s+7,739982445)),e={hz:ze?.62+.07*a():.34+.07*a(),side:a()<.5?-1:1,seed:a()*200,hlen:.3+.35*a(),hH:.035+.06*a()};e.gX=-e.side*(.14+.18*a())*(wt?.6:Math.min(1,zt/1.24)),a(),e.fgX=0,e.pv=e.side*(.05+.15*a()),F&&s===0&&(e.hz=.665,e.side=-1,e.gX=.24,e.fgX=0,e.hlen=.42,e.hH=.05);const n=ft(Y^Math.imul(s+11,2146121005)^246505);e.dol=(.22+.2*n())*(g===2?.6:1),e.dsz=1.08+.17*n(),e.dsp=.6,F&&s===0&&(e.dol=.3,e.dsz=1.16);const f=ft(Y^Math.imul(s+19,374761393)^508129),d=wt?zt*.5:zt;e.cs=f()<.5?-1:1,e.nH=f()<.55?3:2,e.lean=(f()-.5)*1.2;const u=f();e.sunY=Math.min(.88,e.hz+.11+.1*f()),e.sunX=g===5?-e.cs*d*(.06+.22*u):(u-.5)*.55*d;const p=ft(Y^Math.imul(s+29,461845907)^385447);e.tS=p()<.5?-1:1,e.tP1=p()*6.283,e.tP2=p()*6.283,e.tN=7+(p()*7|0),e.tA=.8+.4*p(),e.tW=.85+.3*p(),e.iW=d*(Lt?.19+.08*p():.125+.075*p()),e.iH=Math.min(e.hz>.5?.1+.08*p():.62+.06*p()-e.hz,e.iW*1.15),e.iS=p()<.5?-1:1,e.iX=(p()-.5)*d*.4,te&&Math.abs(e.iX-e.sunX)<e.iW*1.15&&(e.iX=e.sunX+(e.iX<e.sunX?-1:1)*e.iW*1.15),e.iX=Math.max(-d*.5+e.iW*.6,Math.min(d*.5-e.iW*.6,e.iX)),e.iG=e.iX-e.iS*e.iW*(1.2+.3*p()),e.bS=p()<.5?-1:1,e.bR=7+4*p(),e.bN=3+(p()<.5?1:0);const z=-(.12+.14*p())*d,E=e.bS*(.65-e.bR);e.bT=1.4;for(let i=.2;i<1.4;i+=.01){const b=E+e.bR*e.bS*Math.cos(i),A=e.bR*Math.sin(i);if(e.bS*b/A<z){e.bT=i;break}}return e};let ie=0,Pt=0,O=null;const pe=()=>{const s=Pe(ie),a=ft(Y^Math.imul(Pt+3,2654435769)^20973);let e=a()*4|0,n=(e+(a()<.5?1:3))%4;F&&Pt===0&&(e=3,n=2),O={hc:e,dr:n,pe:n===(e+1)%4?e:n,expo:.95+.25*a(),seed:a()*300,rz:F&&Pt===0?-.035:(a()-.5)*.09};const f=Ee(a,e,n);O.thu=f[0],O.thv=f[1],O.thr=f[2];const d=[1,3,6][lt],u=h.D8,p=h.C8;for(let A=0;A<d;A++){let U=.5,P=.5,K=1,G=0;for(let C=0;C<12;C++){U=.1+.8*a(),P=.1+.8*a();const W=Math.min(v-1,P*v|0)*c+Math.min(c-1,U*c|0);if(K=p[W*4+2]-128,G=p[W*4+3]-128,p[W*4]>40)break}const J=Math.hypot(K,G)||1,X=Math.round(U*65535),_=Math.round(P*65535);u.set([X>>8,X&255,_>>8,_&255],A*4),u.set([128+K/J*126,128+G/J*126,a()*255,a()*255],(16+A)*4)}h.fin&&h.fin(),t.bindTexture(t.TEXTURE_2D,R.tC),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texSubImage2D(t.TEXTURE_2D,0,0,0,c,v,t.RGBA,t.UNSIGNED_BYTE,h.C8),t.bindTexture(t.TEXTURE_2D,R.tD),t.texSubImage2D(t.TEXTURE_2D,0,0,0,16,2,t.RGBA,t.UNSIGNED_BYTE,u),St(),t.bindFramebuffer(t.FRAMEBUFFER,R.fS),t.viewport(0,0,R.sres,R.sres);const z=g===1?"XP":g===3?"XW":g===4?"XL":g===5?"XC":g===6?"XT":g===7?"XS":g===8?"XB":"",E=te?z?z+"_XI":"XI":z;E&&h.full(E);const i=E?S[E]:S.sc;t.useProgram(E?h.P[E]:h.P.sc);const b=g===1||g>=5?0:(g===2?3:g===3?4:5)+(s.fgX?1:0);t.uniform4f(i.uA,g===4?0:g,s.hz,zt,s.seed),t.uniform4f(i.uB,g===1?-s.side:g===7?s.iG:s.gX,g===5?s.cs:s.side,wt,g===3?1:0),t.uniform4f(i.uC,g===1?s.pv:s.fgX,g===4?1.6:0,g===4?s.hH*1.4:g>=6?0:s.hH,s.hlen*Math.min(1,zt/1.24)),t.uniform4f(i.uG,g===1?0:s.dol,s.dsz,s.dsp,0),t.uniform1i(i.uR,b),g===6?(t.uniform4f(i.uH,s.tS,s.tP1,s.tP2,s.tN),t.uniform4f(i.uJ,s.sunX,s.sunY,s.tA,s.tW)):g===7?(t.uniform4f(i.uH,s.iX,s.iS,s.iW,s.iH),t.uniform4f(i.uJ,s.sunX,s.sunY,0,0)):g===8?(t.uniform4f(i.uH,s.bS,s.bR,s.bT,0),t.uniform4f(i.uJ,s.sunX,s.sunY,s.bN,0)):(t.uniform4f(i.uH,s.cs,s.nH,s.lean,0),t.uniform4f(i.uJ,s.sunX,s.sunY,0,0)),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,h.tN),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,R.tS),t.generateMipmap(t.TEXTURE_2D),St(),t.bindFramebuffer(t.FRAMEBUFFER,R.fP1),t.viewport(0,0,R.pres,R.pres),t.useProgram(h.P.p1),t.uniform4f(S.p1.uA,dt,ee,oe,wt),t.uniform4f(S.p1.uB,Ht*(g===3?.5:1),O.expo,0,O.seed),t.uniform4f(S.p1.uC,lt,O.pe,.35+.25*lt,7+3*bt()),t.uniform4f(S.p1.uE,.3+.5*lt,[.0015,.004,.009][lt],n,e),t.uniform4f(S.p1.uF,R.sres,Ht>.5?.8:0,Ht>.5?1:.3,0),t.uniform4f(S.p1.uG,O.thu,O.thv,O.thr,0),t.uniform1i(S.p1.uI,d),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,h.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,R.tS),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,R.tC),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,R.tD),t.drawArrays(t.TRIANGLES,0,3),St(),t.bindFramebuffer(t.FRAMEBUFFER,R.fP2),t.viewport(0,0,R.pres,R.pres),t.useProgram(h.P.p2),t.uniform4f(S.p2.uA,dt,Nt,gt===1?0:.6+.4*lt,O.seed*.37),t.uniform4f(S.p2.uB,gt===2?1:0,n,gt,lt),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,h.tN),t.drawArrays(t.TRIANGLES,0,3),Pt++},St=()=>{t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(h.vao)},o={mode:"dev",ox:0,oy:0,al:0,be:0,alT:0,beT:0,down:!1,dT:0,x0:0,y0:0,drag:!1,hold:!1,hT:0,hx:0,hy:0,tPour:.12,poured:!0,lastIn:-99,vx:0,vy:0,inS:0,fx:0,fy:0,pend:null,waitT:0,flip:!1,fixSnd:!1,wasDrag:!1,dv:0},Ft=(s,a,e)=>{const n=(Y^Pt*977)&65535;fe(s*c,a*v,n,0),fe(s*c,a*v,n+31,1),t.bindTexture(t.TEXTURE_2D,R.tA),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texSubImage2D(t.TEXTURE_2D,0,0,0,c,v,t.RGBA,t.UNSIGNED_BYTE,h.A8),o.tPour=e,o.poured=!0,o.fixSnd=!1,L.sound.hit("noise",.32,{dur:1.3,cutoff:650}),L.sound.hit("noise",.12,{dur:.5,cutoff:2400,at:.05}),L.sound.note(45,{dur:1.6,vel:.05,wave:"sine",at:.1})};pe(),Ft(F?.16:.1+.8*bt(),F?.2:bt()<.5?.12:.88,.12),o.tPour=.12;const Ae=1.15,Re=.9,re=1.75,qe=.9,Xe=.45,At={O:[0,0,0],ex:[1,0,0],ey:[0,1,0],n:[0,0,1]},Be=()=>{const s=O.rz,a=Math.cos(s),e=Math.sin(s),n=Math.cos(o.al),f=Math.sin(o.al),d=Math.cos(o.be),u=Math.sin(o.be),p=[a,e,0],z=[-e,a,0],E=[z[0]*n,z[1]*n,-f],i=[z[0]*f,z[1]*f,n],b=[p[0]*d+i[0]*u,p[1]*d+i[1]*u,i[2]*u],A=[i[0]*d-p[0]*u,i[1]*d-p[1]*u,i[2]*d],U=[o.ox+se+z[0]*ht-E[0]*ht,o.oy+ae+z[1]*ht-E[1]*ht,-E[2]*ht];let P=9;for(const K of[-1,1])for(const G of[-1,1])P=Math.min(P,U[2]+K*b[2]*Bt+G*E[2]*ht);U[2]-=P,At.O=U,At.ex=b,At.ey=E,At.n=A},_t=ft(Y^27661),Me=_t()*6.28,De=_t()*6.28,Se=_t()*6.28,Fe=.6+.3*_t(),_e=s=>Math.min(1,Math.max(0,Fe+.32*Math.sin(s*.11+Me)+.2*Math.sin(s*.047+De)+.12*Math.sin(s*.23+Se))),ce=s=>{Be(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,qt,qt),St(),t.useProgram(h.P.co);const a=At;t.uniform4f(S.co.uQ0,a.O[0],a.O[1],a.O[2],Bt),t.uniform4f(S.co.uQ1,a.ex[0],a.ex[1],a.ex[2],ht),t.uniform4f(S.co.uQ2,a.ey[0],a.ey[1],a.ey[2],dt),t.uniform4f(S.co.uQ3,a.n[0],a.n[1],a.n[2],2.32/qt),t.uniform4f(S.co.uT,o.poured?s-o.tPour:-1,Ae,Re,re),t.uniform4f(S.co.uK,gt,Le,[0,.9,1][Nt],.35+.45*lt),t.uniform4f(S.co.uL,qe,Xe,1.5/R.pres,1/c);const e=Math.min(1,Math.max(0,(o.al-.12)/.22)),n=_e(s);t.uniform4f(S.co.uW,3*(1-.58*e*e*(3-2*e))*(.94+.09*n),gt===1?1:0,Nt===0?1:0,.2+.8*n*n*(3-2*n)),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,h.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,R.tP1),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,R.tP2),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,R.tA),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)};ce(0);const Ce=(s,a)=>{const e=(s*2-1)*1.16-o.ox-se,n=(1-a*2)*1.16-o.oy-ae,f=Math.cos(O.rz),d=Math.sin(O.rz),u=(e*f+n*d)/Bt*.5+.5,p=(-e*d+n*f)/ht*.5+.5;return[Math.min(.97,Math.max(.03,u)),Math.min(.97,Math.max(.03,p))]},le=(s,a)=>{o.mode="out",o.vx=s,o.vy=a,L.sound.hit("noise",.2,{dur:.28,cutoff:1800})},Ie=(s,a)=>{const e=L.input,n=e.taps?e.taps():[];if(e.down&&!o.down&&(o.down=!0,o.dT=s,o.x0=e.x,o.y0=e.y,o.drag=!1,o.hold=!1,o.wasDrag=!1),e.down){o.lastIn=s;const f=e.x-o.x0,d=e.y-o.y0;if(o.mode==="dev"&&!o.hold&&!o.drag&&Math.hypot(f,d)>.035&&s-o.dT<.4&&(o.drag=!0),o.mode==="dev"&&!o.drag&&!o.hold&&s-o.dT>.3&&(o.hold=!0,o.hT=s,o.hx=e.x,o.hy=e.y,L.sound.hit("noise",.08,{dur:.2,cutoff:900})),o.drag&&(o.ox=f*2.32,o.oy=-d*2.32),o.hold){const u=Math.min(1,(s-o.hT)/1.4);o.alT=Math.min(.46,Math.max(0,.36*u*(2-u)+(e.y-o.hy)*.9)),o.beT=Math.min(.32,Math.max(-.32,(e.x-o.hx)*1.2))}}else if(o.down){if(o.down=!1,o.drag){o.wasDrag=!0;const f=Math.hypot(o.ox,o.oy);f>.3&&(le(o.ox/f*6,o.oy/f*6),o.dv=Math.abs(o.ox)>Math.abs(o.oy)?o.ox<0?1:-1:1)}else!o.hold&&s-o.dT<.35&&he(o.x0,o.y0,s);o.drag=!1,o.hold=!1,o.alT=0,o.beT=0}else n.length&&he(n[0].x,n[0].y,s)},he=(s,a,e)=>{{if(o.mode!=="dev")return;const[n,f]=Ce(s,a);o.poured?e-o.tPour>3.4?(o.pend=[n,f],o.dv=0,le(0,-6)):L.sound.hit("noise",.1,{dur:.15,cutoff:1200}):Ft(n,f,e)}},Ue=(s,a)=>{if(o.mode==="out")o.ox+=o.vx*a,o.oy+=o.vy*a,(Math.abs(o.ox)>2.75||Math.abs(o.oy)>2.4)&&(ie+=o.dv,pe(),o.fx=o.vx?-Math.sign(o.vx)*2.75:0,o.fy=o.vy?-Math.sign(o.vy)*2.4:0,!o.vx&&!o.vy&&(o.fy=2.4),o.mode="in",o.inS=s,o.poured=!1,o.al=o.be=0);else if(o.mode==="in"){const n=Math.min(1,(s-o.inS)/.55),f=(1-n)**3;o.ox=o.fx*f,o.oy=o.fy*f,n>=1&&(o.mode="dev",o.waitT=s,L.sound.hit("click",.35),L.sound.hit("noise",.1,{dur:.08,cutoff:3e3}),o.pend&&(Ft(o.pend[0],o.pend[1],s),o.pend=null))}else if(!o.drag){const n=Math.min(1,a*9);o.ox-=o.ox*n,o.oy-=o.oy*n,!o.poured&&s-o.waitT>2.4&&Ft(.1+.8*bt(),bt()<.5?.12:.88,s)}const e=Math.min(1,a*4.5);o.al+=(o.alT-o.al)*e,o.be+=(o.beT-o.be)*e,!o.flip&&o.al>.28&&(o.flip=!0,L.sound.note(83,{dur:1.4,vel:.05,wave:"sine"}),L.sound.note(90,{dur:1.2,vel:.03,wave:"sine",at:.06})),o.flip&&o.al<.2&&(o.flip=!1),o.poured&&!o.fixSnd&&s-o.tPour>re&&(o.fixSnd=!0,L.sound.hit("noise",.18,{dur:1,cutoff:1100}),L.sound.note(76,{dur:2,vel:.035,wave:"sine",at:.3}),L.sound.note(81,{dur:2,vel:.025,wave:"sine",at:.7})),ce(s)};return(s,a)=>{a=Math.min(.1,Math.max(0,a||0)),Ie(s,a),Ue(s,a)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
