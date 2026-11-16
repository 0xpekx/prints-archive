// Light Pillars: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/262.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(W0){W0&&W0.add({num:262,name:"Light Pillars",fam:"Worlds",recipe:"A long exposure on a freezing night toward a snowy town, where ice crystals in the air throw a pillar of light above every lamp, tall for near lamps and short for far ones. The town and the lamps change every mint, and rare ones get an aurora. Drag to pan, tap to send a breath of wind through so the pillars smear and settle, or hold to let the ice cloud thicken.",interactive:"Drag to pan along the horizon; tap to send a breath of wind through the crystals, so the pillars swell and smear and then settle back; hold to let the crystal cloud thicken and drift",music:!0,gl:!0,fps:30,seed:0,make(W){const t=W.gl,gt=W.size,B=!!W.home;let nt=640356775;for(let e=2;e<66;e+=8)nt=Math.imul(nt^parseInt(W.hash.slice(e,e+8),16),2246822507)^nt>>>13;const a=()=>{nt=nt+1831565813|0;let e=Math.imul(nt^nt>>>15,1|nt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},zt=e=>{let o=0;for(const c in e)o+=e[c];let s=a()*o;for(const c in e)if(s-=e[c],s<0)return c;return Object.keys(e)[0]},b0=Math.PI/180,G=()=>a()-.5;!t.__c262&&!t.__c262pre&&(t.__c262pre=(()=>{const e=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
`,o=e+"void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",s=`
#ifdef GP
out uvec4 o;
#else
out vec4 o;
uniform highp usampler2D uG;
#endif
uniform sampler2D uN;uniform sampler2D uS;uniform sampler2D uL;uniform sampler2D uT;uniform sampler2D uP;
layout(std140) uniform P{vec4 u[23];};
uint hu(uint x){x^=x>>16;x*=0x7feb352du;x^=x>>15;x*=0x846ca68bu;x^=x>>16;return x;}
vec4 h4(uint a){a=hu(a);return vec4(a&255u,(a>>8)&255u,(a>>16)&255u,a>>24)/255.;}
uint hc2(ivec2 c,uint s){return hu(uint(c.x)*1973u+hu(uint(c.y)*9277u+s));}
#define TF u[0].x
#define YAW u[0].y
#define HZ u[0].z
#define SZ u[0].w
#define HC u[1].x
#define SIG u[1].z
#define WING u[1].w
#define HB u[2].x
#define HT u[2].y
#define DM u[2].z
#define TT u[2].w
float dens(float h,float s,float az,float fp){
  vec2 q=vec2(sin(az),cos(az))*s+u[3].xy;
  float tv=textureLod(uN,q*(1./900.)+vec2(.11,.83),log2(max(fp,1.)/3.5)).r;
  // the layer is densest at its foot and thins upward (scale 1/u[21].z), so a pillar is brightest just above its lamp,
  // fades evenly and goes out with a feathered end; one top for the whole layer, so the nearer lamp has the taller pillar
  float ht=HT*(.88+.24*tv),T=ht-HB;
  // a lifted layer keeps a foot on the ground (u[14].z, thinning upward by u[15].x): each pillar stands on its lamp and the
  // band is a brighter knot higher in the same stem, its foot blended over ~20 m (u[15].z) so no line crosses the column
  float pr=exp(-max(h-HB,0.)*u[21].z)*(1.-smoothstep(ht-.45*T,ht,h))*max(u[14].z*exp(-max(h-6.,0.)*u[15].x),smoothstep(HB-.5-.1*T-u[15].z,HB+.03*T+u[15].z,h));
  // one layer seen in a long exposure: broad knots that are mostly a function of height, so lamps at one distance share them
  float n1=textureLod(uN,q*(1./12000.)+vec2(h*(1./900.)+.37,h*(1./2600.)+.13),0.).a;
  float v=.3+1.15*n1;
  return pr*DM*v*v*.6;
}
vec3 sky(float az,float a,float pa){
  float e=max(a,0.);
  vec3 c=mix(vec3(.0068,.0086,.0155),vec3(.0011,.0019,.0058),smoothstep(0.,.5,e))*u[5].x;
  float dz=(az-u[5].z)/u[5].w;
  c+=u[6].rgb*u[5].y*exp(-dz*dz*.5)*(exp(-e/.03)*1.3+exp(-e/.09)*.4+exp(-e/.3)*.3)*(.4+.6*DM);
  c+=vec3(.035,.06,.12)*u[4].w*(1.-.5*smoothstep(0.,.6,e));
  vec2 sg=vec2(az,a)*(1./.0095);ivec2 ci=ivec2(floor(sg));vec4 h=h4(hc2(ci,77u));
  if(h.x<.3){
    float rs=max(pa*.6,.00028);
    vec2 d=(fract(sg)-.2-.6*h.yz)*.0095/rs;
    float m=pow(h.w,9.)*1.4+.025*h.w;
    vec3 sc=mix(vec3(1.,.82,.62),vec3(.75,.85,1.),fract(h.y*7.3));
    c+=sc*m*exp(-.5*dot(d,d))*u[6].w*(pa*pa)/(rs*rs)*smoothstep(.04+.1*(DM-1.),.3+.15*(DM-1.),e);
  }
  if(u[7].x>.5){
    float ab=u[7].y+.035*sin(az*2.3+u[7].z)+.018*sin(az*5.3-u[7].z*1.7+TT*.015);
    float da=a-ab;
    if(da>-.03){
      float ry=textureLod(uN,vec2(az*1.7+TT*.002,.13),0.).a;ry*=ry;
      float fi=textureLod(uN,vec2(az*7.3,.71+TT*.003),0.).r;
      float v=smoothstep(-.03,.006,da)*(.25+1.6*ry*(.5+.7*fi));
      c+=(vec3(.05,.42,.17)*exp(-max(da,0.)/.07)+vec3(.16,.04,.09)*smoothstep(.04,.16,da)*exp(-max(da-.16,0.)/.1))*v*u[7].w;
    }
  }
  return c;
}
vec3 lamps(float az,float a,float hcam,float occ,float vb,float pa,bool refl,inout float pole){
  vec3 acc=vec3(0);
  float sw=SIG*3.+.018;
  int n=int(u[1].y);
  for(int i=0;i<n;i++){
    vec4 A=texelFetch(uL,ivec2(i,0),0);
    float D=A.y,l=(A.z-hcam)/D,ph=az-A.x,dA=a-l;
    float wp=A.z/D;
    if(abs(ph)>max(5.*(sw*abs(dA)+pa+wp),D<180.?.09:.016)) continue;
    vec4 B=texelFetch(uL,ivec2(i,1),0);
    vec4 C=texelFetch(uL,ivec2(i,2),0);
    float I=A.w*exp(-D*u[14].y);
    if(C.z>.5) I*=.15+.85*smoothstep(.25,.0,abs(fract(TT*.5+C.y)-.2));
    float w0=.12/D,ww=w0*w0+pa*pa*.3;
    float hP=hcam+D*(a+l)*.5;
    float W0=sqrt(SIG*SIG*dA*dA+ww),W1=sqrt(sw*sw*dA*dA+ww);
    float g1=ph*ph/(2.*W1*W1),W2=sqrt(W1*W1+wp*wp);
    if(ph*ph/(2.*W2*W2)<14.&&(hP>=A.z||hP<=hcam)&&hP>=0.){
      float s=D*(a+l)/(2.*a);
      if(s<occ&&s>0.){
        float nd=dens(hP,s,az,abs(D*l/(2.*a*a))*pa+.05*s*pa);
        float ga=abs(a)*inversesqrt(1.+a*a);
        float F=.018+.982*pow(1.-ga,5.);
        float em=mix(C.x,1.,exp(-abs(a)*5.));
        float g0=ph*ph/(2.*W0*W0);
        float pil=(1.-WING)*exp(-g0)/W0+WING*exp(-g1)/W1;
        // the lit snow under the lamp is a wide second source: a broader, softer column around the needle
        pil+=u[17].w*exp(-ph*ph/(2.*W2*W2))/W2*smoothstep(-.01,.12,abs(a))*smoothstep(0.,.1,abs(dA));
        // the eye above the lamp: the upper pillar begins at the lamp's mirror line (plates just over the eye); fade it in
        // there instead of starting at full strength along a level edge across the sky
        if(l<0.&&a>0.) pil*=smoothstep(0.,.08,a+l);
        float fl=.8+.4*textureLod(uN,vec2(TT*.011+C.y,C.y*.3+hP*.0002),0.).a;
        acc+=B.rgb*(I*nd*F*em*pil*fl*.3/D);
      }
    }
    if(B.w>.5){
      float rc=max(.1/D,pa*.55),ry=max(.04/D,pa*.55),rv=ry+vb;
      float q2=ph*ph/(rc*rc)+dA*dA/(rv*rv);
      float r2=ph*ph+dA*dA*(rc*rc)/(rv*rv);
      float e2=I*(.35+.65*C.x)/(D*D);
      float k=D<occ?.5*exp(-.5*q2)/(rc*rv):0.;
      float t1=r2+.0000064,t2=r2+.0009*(.6+.4*DM);
      k+=.2*.0025/(6.283*t1*sqrt(t1))+.4*.03*sqrt(.6+.4*DM)/(6.283*t2*sqrt(t2));
      acc+=B.rgb*e2*k;
      // the lit snow under a lamp: a thin smear at its foot
      float ag=-hcam/D,tv=A.z*abs(hcam)/(D*D)*.8,pv=max(pa*.6,tv);
      if(!refl&&D<occ+40.){float xg=ph*D/(A.z*1.1),yg=(a-ag)/pv;acc+=B.rgb*I*5.*exp(-xg*xg-yg*yg)/(A.z*A.z)*(tv/pv);}
    }
    // the town and road lamps' poles (the near lamp's is painted into the town map)
    if(!refl&&i>0&&abs(C.w)>.001&&D<occ){
      float xm=ph*D,ym=hcam+a*D,fw=D*pa*.8;
      float hw=.075+.04*(1.-ym/A.z);
      float cv=clamp((hw-abs(xm-C.w))/fw+.5,0.,1.)*step(0.,ym)*clamp((A.z+.05-ym)/fw+.5,0.,1.);
      float ax=xm/C.w;float ay=A.z+.12+.25*ax*(1.-ax)-ym;
      cv=max(cv,clamp((.07-abs(ay))/fw+.5,0.,1.)*step(-.05,ax)*step(ax,1.05));
      pole=max(pole,cv);
    }
  }
  return acc;
}
void main(){
  float pa=2.*TF/SZ;
  vec2 uv=gl_FragCoord.xy/SZ;
  float X=(uv.x-.5)*2.*TF,Y=(uv.y-HZ)*2.*TF;
  float ix=inversesqrt(1.+X*X);
  float az=YAW+atan(X),a=Y*ix;
  vec4 sil=texture(uS,vec2((az+1.)*.5,.5));
  float top=sil.r,dst=sil.g,far=sil.a;
  float rg=a<0.?HC/(-a):1e9;
  int kind;float occ;
#ifdef FOLD
  // a device whose MAX_TEXTURE_SIZE is under 4096: the town map is folded into u[18].w segments of u[19].z texels (one shared
  // seam column), stacked as rows; texel-space clamps stand in for CLAMP_TO_EDGE
  float ts=clamp(((az+1.)*.5-u[20].z)*u[20].w,.5,u[19].y-.5),tk=min(floor((ts-.5)/(u[19].z-1.)),u[18].w-1.);
  float tt=clamp((a-u[18].x)*u[18].y*u[16].w,.5,u[16].w-.5);
  vec4 T=textureLod(uT,vec2((ts-tk*(u[19].z-1.))/u[19].z,(tk*u[16].w+tt)/(u[18].w*u[16].w)),0.);
#else
  vec4 T=texture(uT,vec2(((az+1.)*.5-u[20].z)*u[20].w,(a-u[18].x)*u[18].y));
#endif
  float lD=length(u[8].xy);
  if(T.a>.9&&T.b<.05&&T.r>.5&&a<top&&rg>lD){kind=2;occ=lD;}   // the near lamp's pole, painted into the town map
  else if(rg<min(dst,8000.)){kind=3;occ=rg;}
  else if(a<top&&T.r>.5){kind=2;occ=dst;}
  else if(u[16].z>.5&&rg<8000.){kind=3;occ=rg;}
  else if(a<far){kind=1;occ=8000.;}
  else{kind=0;occ=1e7;}
  vec3 Lw=vec3(u[8].x,u[8].z,u[8].y);
#ifdef GP
  // ----- the ground layer (snow, fence, town): static for a view, baked by its own program -----
  vec3 col=vec3(0);
  float gloss=0.,rough=0.;
  vec2 Q=vec2(sin(az),cos(az))*min(rg,9000.);
  // ----- posts: coverage on this pixel, shadows on the ground point -----
  float pc=0.,shL=1.,shM=1.;vec3 pcol=vec3(0);
  int np=int(u[10].y);
  if(a<.03){
    float bestD=1e9;
    vec2 ld=normalize(u[11].zw),lp=vec2(-ld.y,ld.x);
    for(int k=0;k<np;k++){
      vec4 h=h4(uint(k)*2654435761u+911u);
      if(u[16].y<.5&&h.x<.08&&k>1) continue;   // a post gone from the old fence
      float sk=u[12].x*(float(k)+.35*(h.x-.5));
      vec2 Pp=u[11].xy+ld*sk+lp*(h.y-.5)*u[16].x;
      if(u[16].y>1.5){float zz=30.+float(k/2)*u[12].x+8.*h.x;Pp=vec2(u[13].x+u[13].y*zz+u[13].z*zz*zz+(float(k&1)*2.-1.)*(u[13].w+1.1),zz);}
      if(Pp.y<.8) continue;
      float Dp=length(Pp),azp=atan(Pp.x/Pp.y);
      float hp=u[12].y*(.74+.42*h.z),hw=u[12].z*.5*(.8+.4*h.y),ln=(h.w-.5)*u[12].w;
      float xm=(az-azp)*Dp,ym=HC+a*Dp,fw=max(Dp*pa*.7,.002);
      float dx=xm-ln*ym;
      float tp=hp+.04*sin(xm*60.+h.x*9.);
      float cv=clamp((hw-abs(dx))/fw+.5,0.,1.)*clamp((tp-ym)/fw+.5,0.,1.)*step(-hw,ym);
      if(cv>0.&&Dp<bestD&&Dp<occ+1.){
        bestD=Dp;pc=cv;
        vec3 Pw=vec3(Pp.x,ym,Pp.y),tl=Lw-Pw;float d2=dot(tl,tl);tl*=inversesqrt(d2);
        float sd=sign(dot(tl.xz,vec2(cos(azp),-sin(azp))));
        float lit=smoothstep(-hw,hw*.8,dx*sd)*.8+.2;
        float cap=smoothstep(tp-.1,tp-.06,ym);
        vec3 alb=mix(vec3(.06,.05,.045)*(.7+.6*h.z),vec3(.8,.84,.9),cap);
        if(u[16].y>1.5) alb=mix(alb,vec3(.35,.04,.02),step(hp-.3,ym)*(1.-cap));
        pcol=alb*(u[9].rgb*u[8].w*14.*lit*max(.2,cap+.4*abs(tl.x))/d2+vec3(.55,.68,1.)*u[4].w*(.4+.6*cap)+vec3(.02,.026,.046)*(.3+.7*cap)+u[6].rgb*u[5].y*1.5*(.5+.5*sign(dx*sin(u[5].z-azp))));
      }
      if(kind==3){
        vec2 G=Pp,Lg=Lw.xz,ds=G-Lg;float lg=length(ds);ds/=lg;
        float len=hp*lg/max(Lw.y-hp,.3),al=dot(Q-G,ds),pr=abs(dot(Q-G,vec2(-ds.y,ds.x)));
        if(al>0.&&al<len) shL*=1.-.85*smoothstep(hw+.02+.05*al/len*hw*10.,hw*.5,pr)*smoothstep(len,len*.8,al);
        if(u[4].w>0.){vec2 md=-normalize(u[4].xz);float lm=hp*length(u[4].xz)/u[4].y,am=dot(Q-G,md),pm=abs(dot(Q-G,vec2(-md.y,md.x)));
          if(am>0.&&am<lm) shM*=1.-.8*smoothstep(hw+.03,hw*.4,pm)*smoothstep(lm,lm*.85,am);}
      }
    }
    // three hoar-thick wires sagging between the posts of the field fence
    if(u[16].y<.5&&np>0){
      vec2 rd=vec2(sin(az),cos(az)),P0=u[11].xy;
      float dt=ld.x*rd.y-rd.x*ld.y;
      float sw=(rd.x*P0.y-rd.y*P0.x)/dt,tw=(ld.x*P0.y-ld.y*P0.x)/dt;
      if(abs(dt)>1e-4&&sw>0.&&sw<u[12].x*(float(np)-1.)&&tw>.8&&tw<min(occ+1.,bestD)){
        float f=fract(sw/u[12].x),ym=HC+a*tw,fw=max(tw*pa*.7,.002),sg=.36*f*(1.-f)*u[12].y;
        float dw=min(min(abs(ym-u[12].y*.38+sg),abs(ym-u[12].y*.62+sg)),abs(ym-u[12].y*.84+sg*.8));
        float cw=min(1.,.016/fw)*exp(-2.*dw*dw/max(fw*fw,.0001));
        if(cw>pc){
          vec3 Pw=vec3(rd.x*tw,ym,rd.y*tw),tl=Lw-Pw;float d2=dot(tl,tl);
          pcol=vec3(.16,.17,.19)*(u[9].rgb*u[8].w*9./d2+vec3(.55,.68,1.)*u[4].w*.8+vec3(.02,.026,.046)+u[6].rgb*u[5].y);
          pc=cw*.85;
        }
      }
    }
  }
  if(kind==2){
    // the town from its baked map: dark walls, snow-loaded roofs and spruce catching the street light, lit windows
    col=vec3(.0011,.0014,.0024);
    col+=u[6].rgb*u[5].y*.06*(1.-exp(-dst/5000.));
    col+=T.g*(u[6].rgb*u[5].y*1.3+vec3(.55,.68,1.)*u[4].w*.6+vec3(.003,.0045,.009));
    col+=T.b*mix(mix(vec3(1.,.42,.1),vec3(1.,.7,.36),min(T.a*2.2,1.)),vec3(.6,.75,1.)*.8,smoothstep(.6,.8,T.a))*.34;
  }else if(kind==1){
    col=vec3(.0021,.0027,.0045)*u[5].x+u[6].rgb*u[5].y*.08+vec3(.004,.007,.015)*u[4].w;
  }else if(kind==3){
    float r=rg;
    // wind-packed snow: long drift tails and sastrugi, all lying along the wind, modelled only where it can resolve
    vec2 wd=u[20].xy,wp=vec2(-wd.y,wd.x),Wq=vec2(dot(Q,wd),dot(Q,wp));
    vec4 n0=texture(uN,Wq*vec2(.0019,.0105)+.17);
    vec4 n1=texture(uN,Wq*vec2(.019,.11)+.53);
    vec4 n2=texture(uN,Q*.6+.31);
    float fd=smoothstep(170.,20.,r),fs=smoothstep(50.,5.,r);
    float sr=1.-abs(n1.r*2.-1.);
    vec2 gW=(n0.gb-.5)*vec2(.25,.75)*fd+(n1.gb-.5)*vec2(.35,1.25)*(.3+sr)*fs*(.25+1.3*smoothstep(.3,.8,n0.a));
    // drift crests across the wind: a long windward ramp and a short steep lee face, in patches
    float cf=fract(Wq.x*.028+3.6*n0.r+1.3*n1.a),lee=smoothstep(.9,.965,cf)*(1.-smoothstep(.985,1.,cf));
    gW.x+=smoothstep(.5,.7,n0.a)*smoothstep(.35,.6,n1.r)*smoothstep(110.,12.,r)*(.12-1.8*lee);
    vec2 gx=wd*gW.x+wp*gW.y;
    vec3 nr=vec3(-gx.x-(n2.g-.5)*.3*fs,1.,-gx.y-(n2.b-.5)*.3*fs);
    vec3 alb=vec3(.8,.84,.9)*(.9+.1*n0.a+.06*n2.a);
    float sc=u[10].x;
    if(sc<.5){
      float ut=Q.x-(u[17].x+u[17].y*Q.y+u[17].z*Q.y*Q.y)-.22*sin(Q.y*.047+1.3)-.09*sin(Q.y*.13);
      float vis=smoothstep(.06,.015,r*pa)*step(1.,Q.y);
      float d1=(abs(ut)-.105)/.026,g=exp(-d1*d1)*vis;
      nr.x+=sign(ut)*d1*g*1.4;alb*=1.-.12*g;
      // pole pricks beside the grooves
      vec2 pp=vec2((abs(ut)-.52)/.035,(fract(Q.y*.8+step(0.,ut)*.5)-.5)/.04);
      alb*=1.-.45*exp(-dot(pp,pp))*smoothstep(25.,6.,r);
    }
    if(sc<.5||sc>1.5){
      float ur=Q.x-(u[13].x+u[13].y*Q.y+u[13].z*Q.y*Q.y),au=abs(ur),hw=u[13].w;
      if(u[13].w>0.){
        float bank=smoothstep(hw-.3,hw+.6,au)*smoothstep(hw+2.6,hw+1.2,au);
        nr.x+=sign(ur)*(smoothstep(hw-.3,hw+.5,au)-smoothstep(hw+1.,hw+2.4,au))*.9;
        float rd=1.-smoothstep(hw-.4,hw,au);
        float rut=exp(-pow((abs(au-.95)-.0)/.32,2.))*rd;
        alb=mix(alb,vec3(.52,.55,.6)*(.9+.2*n2.a),rd*.75);alb*=1.-.35*rut+.08*bank;
        gloss=rd*(.12+.35*rut)*smoothstep(.3,.7,n1.a)*(sc<.5?.2:1.);rough=.6;
      }
    }
    if(sc>.5&&sc<1.5){
      float m=smoothstep(.58,.68,texture(uN,Wq*vec2(.0016,.013)+.7).a+.06*n1.r+.04*n2.a);
      alb=mix(alb,vec3(.16,.19,.24)*(.8+.4*n2.r),m);gloss=m*.55;rough=.5;nr.xz*=1.-.8*m;
    }
    nr=normalize(nr);
    vec3 P=vec3(Q.x,0.,Q.y),tl=Lw-P;float d2=dot(tl,tl);tl*=inversesqrt(d2);
    // a street lamp throws its light out sideways (a wide batwing), so its pool is broad and the posts' shadows long
    float bw=1.-tl.y*tl.y,beam=(.25+3.5*bw*bw)*smoothstep(.02,.14,tl.y);
    vec3 E=u[9].rgb*u[8].w*90.*max(dot(nr,tl),0.)/d2*beam*shL;
    E+=vec3(.55,.68,1.)*u[4].w*max(dot(nr,u[4].xyz),0.)*shM;
    vec2 tw=vec2(sin(u[5].z),cos(u[5].z));
    // the night's blue-grey near the lens, the town's orange cast on the far field
    E+=vec3(.02,.026,.046)*u[5].x*(.45+.55*nr.y)*(1.-.4*smoothstep(30.,260.,r))+u[6].rgb*u[5].y*(2.6*max(dot(nr,normalize(vec3(tw.x,.25,tw.y))),0.)+5.5*(.5+.5*nr.y))*smoothstep(30.,320.,r);
    float tz=(az-u[5].z)/u[5].w;
    E+=u[6].rgb*u[5].y*.5*exp(-tz*tz*.5)*(1.-exp(-r/90.));
    col=alb*E;
    // snow glitter close to the camera
    if(r<14.){
      vec2 gq=Q*28.;ivec2 gi=ivec2(floor(gq));vec4 h=h4(hc2(gi,5u));
      if(h.x>.975){
        vec2 d=(fract(gq)-.2-.6*h.yz)/28.;
        float fx=r*pa,fz=fx*r/HC;
        vec2 dd=vec2(dot(d,vec2(cos(az),-sin(az)))/fx,dot(d,vec2(sin(az),cos(az)))/fz);
        float k=exp(-.5*dot(dd,dd))*smoothstep(14.,6.,r)*pow(h.w,4.);
        vec3 sp=.55+.45*cos(6.283*(h.y+vec3(0.,.33,.67)));
        col+=(u[9].rgb*u[8].w*14./d2*.6+vec3(.6,.7,1.)*u[4].w*1.5+.006)*k*6.*mix(vec3(1.),sp,.7);
      }
    }
    float ga=-a*inversesqrt(1.+a*a);gloss*=.02+.98*pow(1.-ga,5.);
    col*=1.-gloss*.5;
  }
  o=uvec4(packHalf2x16(col.rg),packHalf2x16(vec2(col.b,gloss)),packHalf2x16(pcol.rg),packHalf2x16(vec2(pcol.b,pc)));
#else
  uvec4 gb=uvec4(0u);
  if(gl_FragCoord.y<u[22].x) gb=texelFetch(uG,ivec2(gl_FragCoord.xy),0);
  vec2 g0=unpackHalf2x16(gb.x),g1=unpackHalf2x16(gb.y),g2=unpackHalf2x16(gb.z),g3=unpackHalf2x16(gb.w);
  vec3 col=vec3(g0,g1.x),pcol=vec3(g2,g3.x);float gloss=g1.y,pc=g3.y,rough=u[10].x>.5&&u[10].x<1.5?.5:.6;
  // ----- pillars, lamps, sky; a second pass for what glossy ice reflects -----
  float pole=0.;vec3 acc=vec3(0),rf=vec3(0);
  int npass=gloss>.001?2:1;
  for(int p=0;p<npass;p++){
    bool r=p==1;
    float aa=r?-a:a,hcam=r?-HC:HC,oc=r?1e7:occ,vb=r?(.003+.4*abs(a))*rough:0.;
    vec3 s=vec3(0);
    if(r||kind==0) s=sky(az,aa,pa);
    if(!r&&kind==0) col=s;
    vec3 ls=lamps(az,aa,hcam,oc,vb,pa,r,pole);
    if(r) rf=(s+ls)*gloss; else acc=ls;
  }
  // chimney and stack steam from its baked map, lit from below by the town
  if(a<u[19].w&&kind!=3){float pv=(a-u[18].x)/(u[19].w-u[18].x);acc+=u[6].rgb*textureLod(uP,vec2((az+1.)*.5,pv),0.).r*u[19].x*(kind==2?.4:1.)*smoothstep(1.,.8,pv);}
  col=col*(1.-pole)+vec3(.002,.0022,.003)*pole+acc+rf;
  // ----- diamond dust: the near lamp's cone of lit air, and the crystals falling through it -----
  {
    float D0=length(Lw.xz),az0=atan(Lw.x/Lw.z),l0=(Lw.y-HC)/D0;
    float xm=(az-az0)*D0,ym=HC+a*D0,dy=Lw.y-ym;
    if(occ>D0-12.){
      float cone=smoothstep(1.5,.55,abs(xm)/(max(dy,0.)+.3))*step(0.,dy)*smoothstep(-.3,.3,ym);
      col+=u[9].rgb*u[8].w*DM*u[9].w*(.01/(xm*xm+dy*dy+.7)+.2*cone/(.5*xm*xm+.25*dy*dy+1.))*(occ<D0+.5?.4:1.);
    }
    bool rgn=u[10].z>.5||(abs(az-az0)<.32&&a<l0+.34);
    if(rgn){
      float ws=u[15].w;
      for(int k=0;k<int(u[10].w);k++){
        // cells taller than wide: each crystal is a short falling dash in the long exposure
        vec2 cA=k==0?vec2(.0022,.0078):vec2(.011);
        vec2 g=(vec2(az,a)+(k==0?u[21].xy:u[21].xy*.3))/cA;
        g.y+=fract(floor(g.x)*.6180339);ivec2 ci=ivec2(floor(g));
        vec4 h=h4(hc2(ci,uint(k)*7919u+uint(u[15].y)));
        vec4 h2=h4(hc2(ci,uint(k)*7919u+313u));
        float pd=(k==0?.95:.12)*u[9].w*min(DM,1.6);
        if(h.x<pd){
          vec2 cp=k==0?vec2(.2+.6*h.y,.42+.16*h.z):.2+.6*h.yz;vec2 da=(vec2(ci)+cp-vec2(0.,fract(float(ci.x)*.6180339)))*cA-(k==0?u[21].xy:u[21].xy*.3);
          float s=k==0?D0+(h.w-.6)*14.:2.5+h.w*14.;
          if(s<occ&&s>1.){
            vec3 P=vec3(sin(da.x)*s,HC+da.y*s,cos(da.x)*s);
            vec3 tl=Lw-P;float dl=length(tl);tl/=dl;
            // inside the beam under the lamp, or one of a thin few outside it
            float rh=length(P.xz-Lw.xz),dc=Lw.y-P.y;
            float inC=k==0?max(smoothstep(.9*dc+.6,.6*dc+.15,rh)*step(-.1,dc),.04):1.;
            // each plate flashes as its rocking brings it to the mirror angle: often when it rocks hard
            float om=(.6+2.4*h2.x)*u[14].w,cb=sin(TT*om+h2.w*6.283)*cos(TT*om*.71+h2.z*9.);
            float sp=pow(abs(cb),mix(60.,8.,clamp(ws*12.,0.,1.)));
            float bm=.06+.94*smoothstep(.1,.7,tl.y);
            float E=u[8].w*bm/(dl*dl+2.)*(.3+h2.x)*inC;
            // a soft dash, never a hard pixel: at least about a pixel across, 3 to 9 px long, slanting with the gust
            float rs=max(pa*(k==0?.8:1.1),k==0?.0004:min(.012,.004*(4./s)));
            vec2 d=(g-vec2(ci)-cp)*cA/rs;d.y*=k==0?.6:1.;
            if(k==0){d.x-=d.y*u[21].w*.9;float L=.5+1.1*h2.z;d.y=max(abs(d.y)-L,0.);}
            float gl=k==0?(.22*h2.w*h2.w*h2.w+sp*1.2):sp;
            col+=u[9].rgb*E*gl*exp(-.5*dot(d,d))*(pa*pa)/(rs*rs)*(k==0?9.:26.);
          }
        }
      }
    }
  }
  col=mix(col,pcol,pc);
  // ----- the camera -----
  col*=u[14].x;
  vec2 nd=(uv-.5)*2.;float vg=1./(1.+.12*dot(nd,nd));col*=vg*vg;
  col=1.-exp(-col);
  col=pow(col,vec3(.4545));
  uvec2 ip=uvec2(gl_FragCoord.xy);uint hh=hu(ip.x*1973u+hu(ip.y*9277u+uint(u[3].w)));
  float gn=float(hh&65535u)/65535.-.5+float(hh>>16)/65535.-.5;
  col+=gn*u[3].z*(.35+sqrt(col.g));
  o=vec4(clamp(col,0.,1.),1.);
#endif
}`,c=(u,f)=>{const m=t.createShader(f);return t.shaderSource(m,u),t.compileShader(m),m},r=t.getParameter(t.MAX_TEXTURE_SIZE),n=r<4096?`#define FOLD
`:"",i=c(o,t.VERTEX_SHADER),h=t.createProgram(),w=c(e+n+s,t.FRAGMENT_SHADER);t.attachShader(h,i),t.attachShader(h,w),t.linkProgram(h);const M=t.createProgram(),p=c(e+n+`#define GP
`+s,t.FRAGMENT_SHADER);return t.attachShader(M,i),t.attachShader(M,p),t.linkProgram(M),t.flush(),{p:h,a:i,b:w,pg:M,bg:p,MT:n?r:0}})());const De=W.trait("Scene",B?"Town across a field":zt({"Town across a field":38,"Harbour on sea ice":24,"Forest road":26,"Single lamp":6,"Industrial site":6})),_e=W.trait("Lamps",B?"Mixed":zt({"Sodium old town":38,Mixed:34,"LED new town":28})),Re=W.trait("Crystal wobble",B?"Steady":zt({Needles:22,Steady:34,Wobbling:28,"Soft flames":16})),Et=W.trait("Crystal layer",B?"Low and deep":zt({"Low and thin":28,"Low and deep":44,Lifted:28})),Ae=W.trait("Moon",B?"No moon":zt({"No moon":60,Moonlit:40})),H0=W.trait("Sky",B?"Clear":zt({Clear:78,"High haze":14,Aurora:8})),ke=W.trait("Lens",B?"50 mm":zt({"35 mm":30,"50 mm":44,"85 mm":26}));let st=2082364051;for(let e=2;e<66;e+=8)st=Math.imul(st^parseInt(W.hash.slice(e,e+8),16),2654435761)^st>>>15;const U=()=>{st=st+1831565813|0;let e=Math.imul(st^st>>>15,1|st);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let rt=1000148033;for(let e=2;e<66;e+=8)rt=Math.imul(rt^parseInt(W.hash.slice(e,e+8),16),3266489909)^rt>>>14;const R=()=>{rt=rt+1831565813|0;let e=Math.imul(rt^rt>>>15,1|rt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},q0={"Eye level":58,"Low horizon":30,"From a rise":12};let Ft="Eye level";if(!B){let e=U()*100;for(const o in q0)if(e-=q0[o],e<0){Ft=o;break}}Ft=W.trait("View",Ft);const ht={"Town across a field":0,"Harbour on sea ice":1,"Forest road":2,"Single lamp":3,"Industrial site":4}[De],ft={"35 mm":.5,"50 mm":.36,"85 mm":.22}[ke],Pe=[.45,1,1.8,3];let Yt={Needles:0,Steady:1,Wobbling:2,"Soft flames":3}[Re],O0=Pe[Yt]*b0;const Q0=Ft==="From a rise"?9+7*U():0,q=(ht===1?2.4:1.6)+Q0;let Dt=0,It=200,i0=1/30;Et==="Low and thin"?(Dt=0,It=26+22*a(),i0=1/16):Et==="Low and deep"?(Dt=2.2,It=B?62:46+50*a()):(Dt=30+22*a(),It=Dt+22+26*a(),i0=0),ht===3&&(Dt=0,It=Math.max(It,140)),i0*=[.6,1,1.6,2.6][Yt];const jt=Et==="Lifted"&&ht!==3,Ue=jt?Yt===0?.35:.62:0,Le=jt?7:0,Fe=jt?Math.min([.6,1,1.6,2.6][Yt]/30,.75/(Dt-6)):0,K0=Ft==="Low horizon"?.15+.05*U():Ft==="From a rise"?.4+.05*U():.33,y0=()=>{const e=a();return[1,.4+.08*e,.09+.06*e]},Y0=()=>{const e=a();return[.68+.14*e,.8+.08*e,1]},z0=[.16,1,.34],D0=[1,.05,.03],je=[1,.2,.66],Ie=[.25,.8,1],j0=[.6,.92,.85],Ne={"Sodium old town":.1,Mixed:.45,"LED new town":.85}[_e],j=()=>a()<Ne?Y0():y0(),k=4096,et=new Float32Array(k).fill(-1),_t=new Float32Array(k).fill(9e3),Z0=new Float32Array(k),Rt=new Float32Array(k),V=e=>(e+1)*.5*k-.5,Zt=e=>-1+2*(e+.5)/k,At=[],V0=[],kt=[],Vt=(e,o)=>{let s=Math.imul(e*73856093^o*19349663,668265261);return s^=s>>>15,s=Math.imul(s,739982445),((s^s>>>13)>>>0)/4294967296},at=(e,o,s,c,r,n,i)=>{At.push({az:e,D:o,halfM:s,base:c,fn:r,pt:n,wall:i});const h=s/o;let w=Math.max(0,Math.ceil(V(e-h))),M=Math.min(k-1,Math.floor(V(e+h)));M<w&&(w=M=Math.max(0,Math.min(k-1,Math.round(V(e)))));for(let p=w;p<=M;p++){const u=r((Zt(p)-e)*o);if(u<=0)continue;const f=(c+u-q)/o;f>et[p]&&(et[p]=f),o<_t[p]&&(_t[p]=o)}},H=(e,o)=>{const s=Math.floor(e),c=e-s,r=i=>{let h=Math.imul(i+o*7919^1540483477,668265261);return h^=h>>>15,h=Math.imul(h,739982445),((h^h>>>12)>>>0)/4294967296},n=c*c*(3-2*c);return r(s)*(1-n)+r(s+1)*n},Jt=(e,o)=>{const s=Math.floor(e),c=e-s,r=c*c*(3-2*c);return Vt(s,o)*(1-r)+Vt(s+1,o)*r},h0=(e,o,s)=>{let c=.03*Math.exp(-s*.7);if(e.lI){const r=o-e.lx,n=s-e.lh,i=r*r+e.ldz*e.ldz+n*n;c+=.15*e.lI/(1+i/500)*(.4+.6*(e.ldz+1)/Math.sqrt(i+1))}return Math.min(.13,c)},_0=()=>R()<.14?.85+.15*R():.45*R(),J=(e,o,s,c,r,n,i)=>{const h={az:e+s/o,D:o,w:c,y:r,b:n,c:i??_0(),h:1.1};return V0.push(h),h};let f0=!1;const J0=26+34*U(),R0=(e,o,s,c)=>{const r=7+6*a(),n=5.5+3.5*a(),i=n-1.6-1.6*a(),h=a()<.5,w=a()<.6?(a()-.5)*r*.6:99,M=.45+.4*U(),p=U()<.5?-1:1,u=(e*9973|0)&4095,f=c.length;if(at(e,o,r/2+.6,s,m=>{const d=Math.abs(m)/(r/2);if(d>1)return-1;let E=h?i+(n-i)*(1-d):d<.62?n:n-(n-i)*(d-.62)/.38;return Math.abs(m-w)<.35&&(E=Math.max(E,n+.6-.4*Math.abs(w)/r)),E+.12*(H(m*3+e*999,3)-.5)},(m,d,E,y)=>{if(Math.abs(m-w)<.35&&d>n-.2)return d>E-.25?.5:.02;if(d<.72&&d<.5+.22*Jt(m*1.7,u))return .3;const I=Math.abs(m)/(r/2),N=h?E-.55-.3*I*I:i-.16;return d>N||d>N-.1&&d>N-.1*Jt(m*2.6,u+1)?M*(h?.62+.38*Math.min(1,Math.max(0,m*p*2.5+.5)):I<.62?.8:m*p>0?1:.62)*(d<N+.08?.75:1):d>N-.55?h0(y,m,d)*.35:h0(y,m,d)},1),w!==99&&kt.length<12&&o<2600&&U()<.55&&kt.push([e+w/o,o,s+n+.6,J0+s,.5+.7*U(),.45,0]),c&&a()<.55){const m=1+(a()*3|0);for(let d=0;d<m;d++)a()<.6&&J(e,o,(a()-.5)*r*.7,1+.4*a(),s+(a()<.75?1.6:Math.min(4.2,i-.8)),.3+.7*a())}if(c){const m=U()*3|0;for(let d=0;d<m;d++)J(e,o,(U()-.5)*r*.75,.9+.5*U(),s+1.4+(U()<.3?2.6:0),.25+.6*U())}if(c&&f0){const m=i>4.2&&R()<.6?2:1,d=_0();for(let E=0;E<m;E++){const y=1+(R()*3.4|0),I=s+1.3+E*2.5;for(let N=0;N<y;N++)R()<.72&&J(e,o,((N+.5)/y-.5)*r*.8,.8+.4*R(),I,.35+.65*R(),R()<.8?d:_0())}if(R()<.1){const E=r*(.4+.3*R());J(e,o,(R()-.5)*(r-E),E,s+.6,.75,.3+.2*R()).h=1.9}}for(let m=f;m<c.length;m++)c[m].base=s};let A0=1e9;const Nt=(e,o,s,c)=>{c=Math.min(c,A0*o);const r=a()*1e6|0,n=c*(.09+.05*a());$0(e,o,s,c,r,n,.7+.5*U(),U()<.5?-1:1)},$0=(e,o,s,c,r,n,i,h)=>{at(e,o,n*1.2+.6,s,w=>{const M=c*(1-Math.abs(w)/(n*1.2));return M>0?M:-1},(w,M)=>{const p=M/c,u=M/i+r*.37,f=Math.floor(u),m=u-f,d=w>0?1:0,E=.62+.38*Vt(f*2+d+r,r&1023),y=.3+.7*Math.sqrt(1-m)*(1-.25*m),I=1.2*n*Math.max(0,1-p)*E*y*(.92+.08*Math.sin(M*5.3+r+d*2.1)),N=Math.abs(w);return N>Math.max(I,.09)?-1:(m>.14&&I-N<.18+.3*m&&Math.sin(N*3.7+f*2.3+r)>-.35?.42:.045)*(w*h>0?1:.5)*(.6+.4*m)})},k0=(e,o,s,c)=>{c=Math.min(c,A0*o/1.2);const r=a()*1e6|0,n=c*(.28+.14*a());if(f0){$0(e,o,s,c*1.2,r,n*.36,.7+.5*R(),R()<.5?-1:1);return}at(e,o,n+.6,s,i=>{const h=i/n;return Math.abs(h)>1?Math.abs(i)<.3?c*.35:-1:c*(.35+.65*Math.sqrt(1-h*h))*(.86+.24*H(i*2.2+r,r)*H(i*7+r,r+2))},(i,h,w)=>{const M=.6/Math.max(.4,o*.0024);return Math.abs(i)<.3||h<c*.3||H(i*M+r,r+3)*H(h*M+r*.7,r+4)<.3+.25*(h/w)**2?.05:-1})},Xe=(e,o,s)=>at(e,o,.8,0,c=>s*(1-.003*Math.abs(c))),te=(e,o,s=0)=>{const c=3.2+a(),r=16+6*a(),n=14+10*a(),i=9+4*a(),h=7,w=12,M=(a()<.5?-1:1)*(i+c),p=Vt(e*1e4|0,5)<.5?-1:1;at(e,o,c+.5,s,u=>Math.abs(u)/c>1?-1:r+n*Math.max(0,1-Math.abs(u)/(c*.8)),(u,f,m,d)=>{if(f>r+.3){const y=c*.8*(1-(f-r)/n);return u*p>y*.55-.3*Jt(f*1.3,77)?.5:.08+.12*(u>0)}if(f>r-.5-.15*Jt(u*2,78))return .45;const E=h0(d,u,f)*1.3+.045*Math.exp(-f/9);return f>r-3.8&&f<r-1.3&&Math.abs(Math.abs(u)-c*.5)<.38?(f-r+1.3)%.5>-.16?.002:E*1.3:E},1),at(e+M/o,o+8,i+.5,s,u=>{const f=Math.abs(u)/i;return f>1?-1:h+(w-h)*(1-f)},(u,f,m,d)=>f>m-.6-.12*Jt(u*2,79)?.55:h0(d,u,f),1),J(e+M/o,o+8,-i*.3,1.2,s+2.5,.35),J(e+M/o,o+8,i*.3,1.2,s+2.5,.3),f0&&(J(e,o,0,1.3,s+r-3.2,.7,.4).h=1.3,J(e,o,0,1.6,s+.2,.8,.2).h=2.4)},$t=(e,o,s)=>{for(let n=0;n<k;n++){const i=Zt(n);Rt[n]=(e+o*(.6*H(i*5+s,s)+.3*H(i*17+s,s+1)+.1*H(i*60,s+2))-q)/8e3}const c=1800+1400*R(),r=Rt.slice();for(let n=-1;n<1;){if(n+=(1.5+10*R()*R())/c,H(n*7+s,s+5)<.3)continue;const i=(5+17*R()*R())*(.55+.7*H(n*2.5+s,s+6)),h=i*(.14+.08*R()),w=Math.max(0,Math.ceil(V(n-h/c))),M=Math.min(k-1,Math.floor(V(n+h/c)));for(let p=w;p<=M;p++){const u=r[p]+i*(1-Math.abs(Zt(p)-n)*c/h)/c;u>Rt[p]&&(Rt[p]=u)}}},Q=[],t0=(e,o,s,c,r,n={})=>{Q.length<64&&Q.push({az:Math.atan2(e,o),D:Math.hypot(e,o),h:s,I:c,col:r,up:n.up??.45+.5*a(),kind:n.kind||0,arm:n.arm||0,ph:a()*9})},K=(e,o,s,c,r,n)=>t0(Math.sin(e)*o,Math.cos(e)*o,s,c,r,n),P0=.36/ft,O=Math.max(1,P0),e0=(e,o)=>{const s=Math.round(e*(O-1));if(s<=0)return;const c=nt,r=st,n=rt;nt^=1597463007+e,st^=461845907+e,rt^=1759714724+e;for(let i=0;i<s;i++)o();nt=c,st=r,rt=n},ee=Et==="Low and thin"?.6:1,ae=Et==="Low and thin"?.45:1;let pt=0,L=B?1:a()<.5?-1:1,v=0,b=.3,oe=1;const u0=e=>pt+Math.atan((e-.5)*2*ft);let z=null,X={n:0,x:0,z:0,dx:0,dz:1,sp:4,h:1.2,w:.1,lean:.08,jit:.15,kind:0},vt=[0,0,0,0],m0=[0,0,0,0],ne=0,d0=1;const p0=(e,o,s,c,r)=>{const n=u0(e);K(n,o,s,1,c,{up:.7,arm:r}),z=Q[0]};if(ht===0){let e=(B?330:270+240*a())*(ee<1?.8:1);!B&&P0>=1&&(e=Math.max(e,270)),e*=O,!B&&P0>=1&&(O>1||ee<1)&&(A0=.14*ft),v=u0(B?.38:.36+.12*G()-L*.04),b=(.17+.08*a())*(ft/.36)**.4*1.3;const o=.05+.05*R(),s=R()<.5?-1:1,c=9+9*R(),r=(g,x)=>c*Math.tanh(Math.max(0,g-e+40*O)/O*o/c)*(.6+.8*(.5+.5*Math.tanh(s*(x-v)/b*2)));f0=!0,p0(L>0?.8+.04*G():.2+.04*G(),B?55:45+30*a(),7.5+a(),j(),-L*(1.2+.4*a())),$t(70,70,a()*99|0);const n=70+(a()*40|0),i=()=>{const g=v+(a()*2-1)*b*1.5,x=e+(160+260*a())*O;a()<.75?Nt(g,x,r(x,g),10+12*a()):k0(g,x,r(x,g),9+7*a())};for(let g=0;g<n;g++)i();const h=26+(a()*20|0),w=()=>{const g=(a()+a()+a())/1.5-1,x=v+g*b,l=e+(a()-.4)*230*O;R0(x,l,r(l,x),!0)};for(let g=0;g<h;g++)w();const M=()=>{const g=a()+a()-1,x=v+g*b*1.1,l=e+(a()-.3)*210*O;a()<.6?Nt(x,l,r(l,x),7+11*a()):k0(x,l,r(l,x),7+8*a())};for(let g=0;g<30;g++)M();if(e0(n,i),e0(h,w),e0(30,M),B||a()<.75){const g=v+G()*b;te(g,e+60*O,r(e+60*O,g))}if(B||a()<.6){const g=v+(B?.7:G()*1.6)*b,x=2600+1500*a(),l=80+50*a();Xe(g,x,l),K(g,x,l,.22,D0,{kind:1,up:1}),K(g,x,l*.55,.12,D0,{kind:1,up:1})}const p=2+(a()*2|0);for(let g=0;g<p;g++){const x=v+(a()*2-1)*b*.85,l=e+(-150+200*a())*O,T=x+(a()-.5)*2.2,D=(32+14*a())*O,_=3+(a()*3|0),A=j(),C=Math.sin(x)*l,P=Math.cos(x)*l;for(let mt=0;mt<_;mt++){const dt=mt*D*(.85+.3*a()),$=C+Math.sin(T)*dt,Y=P+Math.cos(T)*dt;t0($,Y,7+2*a()+r(Math.hypot($,Y),Math.atan2($,Y)),.55+.7*a(),a()<.8?A:j())}}for(let g=0;g<4+(a()*5|0);g++){const x=v+(a()*2-1)*b,l=e+(a()-.4)*290*O;K(x,l,5+4*a()+r(l,x),.3+.8*a(),a()<.12?j0:j())}(B||a()<.7)&&K(v+G()*b,e-40*O,5.5,.35,z0,{up:1});const u=Math.sin(v+L*b*.5)*(e-80*O),f=Math.cos(v+L*b*.5)*(e-80*O),m=Math.sin(z.az)*z.D+L*3.2,d=Math.cos(z.az)*z.D,E=(u-m)/(f-d);vt=[m-E*d,E,0,3];const y=3+(a()*3|0),I=z.col;for(let g=1;g<=y;g++){const x=d+(f-d)*(g/(y+.6))*(.9+.2*a());t0(vt[0]+E*x-L*3.2,x,7.5+a(),.95,I,{arm:-L*1.3})}X={n:20,x:-L*(2.5+3*a()),z:7,dx:-L*(.08+.12*a()),dz:1,sp:4+1.2*a(),h:1.25,w:.11,lean:.09,jit:.12,kind:0};{const g=Math.sin(z.az)*z.D-L*(3+3*R())-X.x,x=Math.cos(z.az)*z.D+4+8*R()-X.z;X.dx=g/x,X.n=Math.min(24,Math.ceil(Math.hypot(g,x)/X.sp)+3)}m0=[L*(.6+1.5*a()),-L*(.03+.05*a()),L*4e-4*a(),1]}else if(ht===1){const e=(1200+900*a())*ae;v=u0(.42+.12*G()),b=.25+.08*a(),p0(L>0?.8:.2,65+30*a(),6.5,j(),L*.25),$t(150,110,a()*99|0);const o=u=>{const f=(u-v)/(b*1.6);return Math.abs(f)<1.4?8+45*Math.exp(-f*f*2)*(.7+.5*H(u*30,7)):-1};for(let u=0;u<k;u++){const f=Zt(u),m=o(f);if(m>0){const d=(m-q)/(e+500);d>et[u]&&(et[u]=d),_t[u]=Math.min(_t[u],e+30)}}At.push({az:v,D:e+500,halfM:b*2.3*(e+500),base:0,fn:u=>o(v+u/(e+500)),pt:(u,f,m)=>{const d=H(u*.03+f*.05,11)+.3*H(u*.2,12);return f>m-1.2?.12:d>.62?.06:.3+.12*H(u*.5+f,13)}});const s=(u,f)=>Math.max(0,(u-e)*.09)*Math.exp(-(((f-v)/b)**2));for(let u=0;u<45;u++){const f=(a()+a()+a())/1.5-1,m=v+f*b,d=e+20+450*a()*a();R0(m,d,s(d,m),!0),a()<.5&&Nt(m+G()*.01,d+30,s(d,m),8+8*a())}a()<.7&&te(v+G()*b,e+260);const c=9+(a()*6|0),r=j();for(let u=0;u<c;u++){const f=v+(u/(c-1)-.5)*b*1.5+G()*.012,m=e+10+15*a();K(f,m,7+a(),.9,a()<.8?r:j())}for(let u=0;u<12+(a()*8|0);u++){const f=a()+a()-1,m=v+f*b,d=e+60+420*a();K(m,d,s(d,m)+6+3*a(),.6+.5*a(),j())}const n=v+(a()-.5)*b,i=e-40,h=60+30*a();at(n,i,h/2+2,0,u=>{const f=Math.abs(u)/(h/2);return f>1?-1:6-1.2*f*f+(Math.abs(u+h*.15)<h*.18?7:0)+(Math.abs(u+h*.15)<.6?8:0)+(Math.abs(u-h*.3)<.3?9:0)},(u,f,m)=>f>m-.4&&Math.abs(u+h*.15)>.6?.5:0),J(n,i,-h*.2,1,9.2,.6),J(n,i,-h*.09,1,9.2,.5),J(n,i,h*.05,.8,4.3,.4),K(n-h*.15/i,i,21,.3,[1,.95,.85],{up:1}),K(n+h*.3/i,i,7,.22,z0,{up:1}),K(n-h*.05/i,i,12,.5,y0(),{}),K(n+h*.15/i,i,9,.4,y0(),{});const w=4,M=Math.sin(z.az)*z.D,p=Math.cos(z.az)*z.D;for(let u=1;u<=w;u++){const f=u/(w+1);t0(M*(1-f)+Math.sin(v+L*b*.7)*e*f,p*(1-f)+Math.cos(v+L*b*.7)*e*f,6.5,.9,z.col,{arm:.25})}X={n:14,x:-L*4,z:10,dx:-L*.1+.05*G(),dz:1,sp:11+4*a(),h:1.7,w:.045,lean:.12,jit:.4,kind:1}}else if(ht===2){pt=0;const e=L,o=e*(32e-5+16e-5*a()),s=e*(.02+.03*a());vt=[-e*2.4,s,o,3.2];const c=f=>vt[0]+s*f+o*f*f,r=e*5.5,n=42+8*a(),i=j();let h=62+14*a();const w=(380+220*a())*O;for(let f=0;f<16&&h<1100;f++)(f<2||a()>.18)&&t0(c(h)+r,h,8+.6*a(),1,a()<.9?i:j(),{arm:-e*1.6}),h+=n*(.75+.6*a())*(1+h/900);z=Q[0];const M=Q[Math.min(Q.length-1,5)].az;pt=.5*(z.az+M)+e*.04,v=M,b=.25,$t(120,90,a()*99|0);const p=260,u=()=>{const f=-.95+1.9*a(),m=w*(.9+.5*a())/Math.max(.35,Math.cos(f*.7)),d=Math.cos(f)*m,E=Math.sin(f)*m;Math.abs(E-c(d))<9+4*a()||H(f*14,5)<.22||(a()<.82?Nt(f,m,0,9+14*a()*a()+6*H(f*6,9)):k0(f,m,0,8+7*a()))};for(let f=0;f<p;f++)u();e0(p,u);for(let f=0;f<2+(a()*3|0);f++){const m=-.6+1.2*a(),d=700+1200*a();K(m,d,5+3*a(),.5,j()),R0(m+.006,d+10,0,!0)}X={n:22,x:0,z:30,dx:0,dz:1,sp:30,h:2,w:.035,lean:.04,jit:0,kind:2},d0=1.2}else if(ht===3){pt=0,v=0,b=.5,oe=.35,p0(.6+.08*G(),30+10*a(),7,j(),-1.4),$t(80,60,a()*99|0);const e=()=>{const o=-.9+1.8*a(),s=(300+500*a())*O;H(o*9,4)>.45&&Nt(o,s,0,8+12*a())};for(let o=0;o<26;o++)e();e0(26,e);for(let o=0;o<4+(a()*4|0);o++)K(-.6+1.2*a(),2500+2500*a(),6+3*a(),.7,j());X={n:7,x:-2.5,z:6,dx:-.6,dz:1,sp:4.5,h:1.2,w:.11,lean:.12,jit:.2,kind:0},ne=1,d0=1.6}else{const e=(800+500*a())*ae;v=u0(.42+.1*G()),b=.22+.06*a(),p0(L>0?.82:.18,80+30*a(),8,j(),-L*1.3),$t(90,60,a()*99|0);for(let r=0;r<7;r++){const n=v+G()*2*b,i=e+200*G(),h=8+10*a(),w=12+10*a();at(n,i,h+1,0,M=>{const p=Math.abs(M)/h;return p>1?-1:w+2.5*Math.sqrt(Math.max(0,1-p*p))},(M,p,u)=>p>u-.7?.6*(.5+.5*(M>0)):.03+.03*(Math.round(p*.8)%2))}for(let r=0;r<6;r++){const n=v+G()*2*b,i=e+250*G(),h=20+30*a(),w=8+10*a(),M=a()<.5;at(n,i,h+1,0,p=>Math.abs(p)>h?-1:w+(M?2*(1-Math.abs(p)/h):0)+(Math.abs(p-h*.3)<2?5:0),(p,u,f)=>u>f-.35?.5:0),U()<.6&&J(n,i,h*(U()-.5),2+4*U(),2.2+3*U(),.5),U()<.7&&kt.push([n+h*.3/i,i,w+5,w+J0*1.4,.5+.4*U(),1,0])}for(let r=0;r<3;r++){const n=v+G()*1.6*b,i=e+100*G(),h=55+45*a();at(n,i,3.5,0,w=>Math.abs(w)<2.6-.8*Math.abs(w)/2.6?h-Math.abs(w)*.3:-1,(w,M,p)=>Math.abs(M-h*.8)<1.2?.25:.02),K(n,i,h,.18,D0,{kind:1,up:1}),kt.push([n,i,h,h+70+90*U(),.7+.4*U(),1.6,0])}for(let r=0;r<30;r++){const n=v+(a()*2-1)*b*1.5,i=e+300+300*a();Nt(n,i,0,10+10*a())}for(let r=0;r<6;r++){const n=v+(a()*2-1)*b,i=e+150*G();K(n,i,24+12*a(),1.8,a()<.6?Y0():j0,{up:.5});const h=Q[Q.length-1];h&&at(h.az,h.D,2.5,0,w=>Math.abs(w)<2?h.h+.6:-1,(w,M)=>Math.abs(w)<.3||M>h.h-.1?.03:-1)}for(let r=0;r<12;r++)K(v+(a()*2-1)*b,e+200*G(),7+4*a(),.8,a()<.25?Ie:a()<.2?z0:j());const o=v+(a()-.5)*b,s=e-200,c=60+40*a();at(o,s,c/2,0,r=>Math.abs(r)>c/2?-1:6+1.5*(1-Math.abs(r)/(c/2)),(r,n,i)=>n>i-.4?.55:0),J(o,s,-c*.2,4,.4,.8);for(let r=0;r<11;r++)r%3?a():K(o+(r/10-.5)*c/s,s,8.5,.7,[1,.47,.12],{up:.6});X={n:16,x:-L*3,z:5,dx:-L*.15,dz:1,sp:3.2,h:1.6,w:.06,lean:.03,jit:.05,kind:0}}const U0=Q.length;for(const e of Q){const o=Math.max(0,Math.min(k-1,Math.round(V(e.az))));e.vis=(e.h-q)/e.D>et[o]+4e-4||e.D<=_t[o]+5?1:0}if(z.vis=1,z.arm){const e=z.D,o=z.h,s=z.arm,c=s<0?-1:1,r=o*(.4+.3*R()),n=Math.min(0,s)-.6,i=Math.max(0,s)+.6,h=(n+i)/2,w=(i-n)/2,M=z.az+h/e;At.push({az:M,D:e,halfM:w,base:0,lamp:1,fn:()=>o+.36,pt:(m,d)=>{const E=m+h,y=E-s,I=.07+.05*(1-d/o)+(d<.28?.09:0);if(Math.abs(y)<.34&&d<.16-1.3*y*y)return .5;if(Math.abs(y)<I&&d<o+.05)return y*c>I*.15&&d>.3&&d<r?.4:.015;const N=E/s,g=o+.16+.25*N*(1-N);return N>-.05&&N<1.05&&Math.abs(d-g)<.05||Math.abs(E)<.4-.12*Math.min(1,Math.max(0,(d-o-.04)*6))&&Math.abs(d-o-.12)<.09?.015:Math.abs(E)<.36&&Math.abs(d-o-.24)<.09-.75*E*E?.5:-1}});const p=w/e,u=Math.max(0,Math.ceil(V(M-p))),f=Math.min(k-1,Math.floor(V(M+p)));for(let m=u;m<=f;m++)et[m]=Math.max(et[m],(o+.36-q)/e)}{const e=[];for(let s=1;s<U0;s++)Q[s].kind===0&&e.push(s);for(let s=e.length-1;s>0;s--){const c=R()*(s+1)|0,r=e[s];e[s]=e[c],e[c]=r}e.sort((s,c)=>Q[c].vis-Q[s].vis);const o=3+(R()<.5?1:0);e.forEach((s,c)=>{Q[s].I*=c<o?2.3:c<o+12?1:.42})}let L0=.03;for(let e=0;e<k;e++)L0=Math.max(L0,et[e],Rt[e]);const F0=Math.max(1,Math.min(gt,Math.ceil(((L0+.002)*Math.sqrt(1+ft*ft)/(2*ft)+K0)*gt)+1)),I0=t.createTexture();t.bindTexture(t.TEXTURE_2D,I0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32UI,gt,F0,0,t.RGBA_INTEGER,t.UNSIGNED_INT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.bindTexture(t.TEXTURE_2D,null);const se=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,se),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,I0,0),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.clearBufferuiv(t.COLOR,0,new Uint32Array(4)),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush();const bt=t.__c262b||(t.__c262b=new Map),a0=W.hash+(B?"h":"");let Xt=bt.get(a0);if(Xt?(bt.delete(a0),bt.set(a0,Xt)):Xt=(()=>{let e=1,o=-1,s=k,c=-1;for(const l of At)e=Math.min(e,(l.base-q)/l.D);for(let l=0;l<k;l++)et[l]>o&&(o=et[l]);e-=.0015,o=Math.max(e+.02,Math.min(o+.002,e+.5));let r=k,n=-1;for(const l of At){const T=l.halfM/l.D;r=Math.min(r,Math.ceil(V(l.az-T))),n=Math.max(n,Math.floor(V(l.az+T)))}r=Math.max(0,r-1),n=Math.min(k-1,Math.max(r+1,n+1));const i=n-r+1,h=500/ft,w=(o-e)*h,M=w>224?Math.min(640,k*320/i|0,Math.ceil(w/1.2)):160,p=new Uint8Array(i*M*4),u=new Float32Array(i*M).fill(1e9),f=M/(o-e),m=2/k*h,d=h/f;for(const l of At){if(!l.wall)continue;let T=45;for(let D=1;D<U0;D++){const _=Q[D];if(_.kind)continue;const A=(_.az-l.az)*l.D,C=l.D-_.D;if(C<-1)continue;const P=Math.hypot(A,C);P<T&&(T=P,l.lx=A,l.ldz=Math.max(0,C),l.lh=_.h-l.base,l.lI=Math.sqrt(Math.min(1.5,_.I))*(1-P*P/2025))}}for(const l of At){const T=l.halfM/l.D,D=Math.max(0,Math.ceil(V(l.az-T))),_=Math.min(k-1,Math.floor(V(l.az+T)));for(let A=D;A<=_;A++){const C=(Zt(A)-l.az)*l.D,P=l.fn(C);if(P<=0)continue;const mt=Math.max(0,Math.floor(((l.base-q)/l.D-e)*f)),dt=Math.min(M-1,Math.floor(((l.base+P-q)/l.D-e)*f));for(let $=mt;$<=dt;$++){const Y=$*i+A-r;if(l.D>=u[Y])continue;const Ut=q+(e+($+.5)/f)*l.D-l.base,Qt=l.pt?l.pt(C,Math.max(0,Ut),P,l):0;Qt<0||(u[Y]=l.D,p[Y*4]=255,A<s&&(s=A),A>c&&(c=A),p[Y*4+1]=Math.min(255,Qt*255),p[Y*4+3]=l.lamp?255:0)}}}for(const l of V0){const T=Math.round(V(l.az-l.w/2/l.D)),D=Math.max(T,Math.round(V(l.az+l.w/2/l.D))),_=Math.round(((l.y-q)/l.D-e)*f),A=Math.max(_,Math.round(((l.y+l.h-q)/l.D-e)*f)),C=D-T+1,P=A-_+1,mt=C*m,dt=mt>=3.5,$=l.h>1.5||l.w>2.5,Y=mt>=6&&P*d>=4,Ut=Vt(T,_)<.5,Qt=T+(C>>1),C0=_+Math.round(P*.62),r0=Math.max(3,Math.round(C/Math.max(2,Math.round(l.w/1.3))));for(let Z=Math.max(r,T);Z<=Math.min(n,D);Z++)for(let it=Math.max(0,_);it<=Math.min(M-1,A);it++){let tt=l.b;dt&&(it-_<P/3&&(tt*=.7),Z-T<C/2===Ut&&(tt*=.8)),Y&&($?(Z-T)%r0===r0-1&&Z<D||it===A:Z===Qt||it===C0)&&(tt=Math.max(.055,tt*.2));const ot=it*i+Z-r;Math.abs(u[ot]-l.D)<1.5&&tt*255>p[ot*4+2]&&(p[ot*4+2]=tt*255,p[ot*4+3]=l.c*255)}if(l.base===void 0)continue;const lt=Math.max(0,Math.floor(((l.base-q)/l.D-e)*f)),Kt=Math.min(M-1,_-1,Math.ceil(((l.base+.72-q)/l.D-e)*f)),ct=(T+D)/2,l0=Math.max(1,C*.9),Lt=l.b*(l.y-l.base<2.2?.4:.15);for(let Z=Math.max(r,Math.floor(ct-2*l0));Z<=Math.min(n,Math.ceil(ct+2*l0));Z++){const it=Math.exp(-(((Z-ct)/l0)**2))*Lt;if(!(it<.01))for(let tt=lt;tt<=Kt;tt++){const ot=tt*i+Z-r;Math.abs(u[ot]-l.D)<1.5&&p[ot*4+3]===0&&(p[ot*4+1]=Math.min(255,p[ot*4+1]+it*255))}}}const E=Math.min(kt.length,12),y=1024,I=96,N=new Float32Array(y*I),g=new Uint8Array(y*I);let x=e+.01;for(let l=0;l<E;l++){const T=kt[l];x=Math.max(x,(T[3]+4*(2+.04*(T[3]-T[2]))-q)/T[1])}x=Math.min(x,e+.4);for(let l=0;l<E;l++){const[T,D,_,A,C,P,mt]=kt[l],dt=2+.04*(A-_),$=(P*3+40+.25*(A-_))*3/D,Y=Math.max(0,Math.floor((T-$+1)*.5*y)),Ut=Math.min(y-1,Math.ceil((T+$+1)*.5*y)),Qt=Math.max(0,Math.floor(((_-q)/D-e)/(x-e)*I)),C0=Math.min(I-1,Math.ceil(((A+4*dt-q)/D-e)/(x-e)*I)),r0=new Float32Array(Ut-Y+1);for(let lt=Y;lt<=Ut;lt++)r0[lt-Y]=H(((lt+.5)/y*2-1-T)*D*.25+l*7,17+l);for(let lt=Qt;lt<=C0;lt++){const Kt=q+(e+(lt+.5)/I*(x-e))*D,ct=Kt-_;if(ct<-.5)continue;const l0=.8*H(ct*.15+l*3,29+l),Lt=P+.09*ct,Z=Lt*3+16+.25*ct,it=Math.min(1,(ct+.5)/2)*(1-Math.min(1,Math.max(0,(Kt-A+8)/10))),tt=Math.exp(-(Kt-A)*(Kt-A)/(2*dt*dt))*.03,ot=tt>3e-4?9:3.2*Lt/D;for(let c0=Math.max(Y,Math.floor((T-ot+1)*.5*y)),Ye=Math.min(Ut,Math.ceil((T+ot+1)*.5*y));c0<=Ye;c0++){const v0=((c0+.5)/y*2-1-T)*D-mt*ct,ze=Math.exp(-v0*v0/(2*Lt*Lt))*it*P/Lt+tt*Math.exp(-v0*v0/(2*Z*Z));ze>.002&&(N[lt*y+c0]+=C*ze*(.6+r0[c0-Y]*l0)/(1+ct*.05))}}}for(let l=0;l<y*I;l++)g[l]=Math.min(255,N[l]*255/3);return{aLo:e,aHi:o,cA:s,cB:c,X0:r,X1:n,NX:i,TH:M,tex:p,nPl:E,PW:y,PH:I,stB:g,aPl:x}})(),!bt.has(a0))for(bt.set(a0,Xt);bt.size>2;)bt.delete(bt.keys().next().value);const{aLo:re,aHi:Se,X0:St,X1:Ge,NX:N0,TH:Gt,tex:le,nPl:ce,PW:Be,PH:Ce,stB:We,aPl:He}=Xt;let{cA:yt,cB:Bt}=Xt,xt=[0,0,0];for(const e of Q){const o=e.col[2]<.3?1.7:1;for(let s=0;s<3;s++)xt[s]+=e.col[s]*e.I*o}const qe=Math.max(xt[0],xt[1],xt[2]);xt=xt.map(e=>e/qe);const F=t.__c262||(t.__c262=(()=>{const{p:e,a:o,b:s,pg:c,bg:r}=t.__c262pre;for(const[x,l]of[[c,r],[e,s]]){if(!t.getProgramParameter(x,t.LINK_STATUS))throw new Error("262: "+(t.getShaderInfoLog(l)||t.getShaderInfoLog(o)||t.getProgramInfoLog(x)));t.useProgram(x),["uN","uS","uL","uT","uP","uG"].forEach((T,D)=>t.uniform1i(t.getUniformLocation(x,T),D)),t.uniformBlockBinding(x,t.getUniformBlockIndex(x,"P"),0)}t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1);const n=256,i=new Float32Array(n*n),h=new Float32Array(n*n),w=new Float32Array(n*n),M=new Uint8Array(n*n*4),p=(x,l,T,D)=>{for(let _=0;_<n;_++){const A=_*D;let C=0;for(let P=-2;P<=2;P++)C+=x[A+(P+n&255)*T];for(let P=0;P<n;P++)l[A+P*T]=C*.2,C+=x[A+(P+3&255)*T]-x[A+(P-2+n&255)*T]}};let u=2498737;for(let x=0;x<2;x++){for(let l=0;l<n*n;l++)u=Math.imul(u^u>>>15,739982445)+1831565813|0,i[l]=(u>>>8&65535)/65535-.5;p(i,h,1,n),p(h,i,1,n),p(i,h,1,n),p(h,i,n,1),p(i,h,n,1),p(h,i,n,1);for(let l=0;l<n*n;l++){const T=Math.max(0,Math.min(1,.5+i[l]*4.8));x===0?w[l]=T:M[l*4+3]=T*255}}for(let x=0;x<n;x++)for(let l=0;l<n;l++){const T=x*n+l,D=w[x*n+(l+1&255)]-w[x*n+(l+255&255)],_=w[(x+1&255)*n+l]-w[(x+255&255)*n+l];M[T*4]=w[T]*255,M[T*4+1]=Math.max(0,Math.min(255,127.5+D*1100)),M[T*4+2]=Math.max(0,Math.min(255,127.5+_*1100))}const f=t.createTexture();t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,n,n,0,t.RGBA,t.UNSIGNED_BYTE,M),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);let m=k;for(;m>t.getParameter(t.MAX_TEXTURE_SIZE);)m>>=1;const d=t.createTexture();t.bindTexture(t.TEXTURE_2D,d),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,m,1,0,t.RGBA,t.HALF_FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const E=t.createTexture();t.bindTexture(t.TEXTURE_2D,E),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,64,3,0,t.RGBA,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.bindTexture(t.TEXTURE_2D,null);const y=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,23*16,t.DYNAMIC_DRAW),t.bindBuffer(t.UNIFORM_BUFFER,null);const I=new Float32Array(1),N=new Uint32Array(I.buffer),g=x=>{I[0]=x;const l=N[0],T=l>>>16&32768;let D=(l>>>23&255)-112;const _=l&8388607;return D<=0?T:D>=31?T|31743:T|D<<10|_>>>13};return{p:e,pg:c,tN:f,tS:d,tL:E,NW:m,ubo:y,vao:t.createVertexArray(),f2h:g,MT:t.__c262pre.MT}})()),o0=F.NW,Mt=new Uint16Array(o0*4);if(o0===k)for(let e=0;e<k;e++)Mt[e*4]=F.f2h(et[e]),Mt[e*4+1]=F.f2h(_t[e]),Mt[e*4+2]=F.f2h(Z0[e]),Mt[e*4+3]=F.f2h(Math.max(Rt[e],.0025));else{const e=k/o0;for(let o=0;o<o0;o++){let s=-1,c=9e3,r=0,n=-1;for(let i=o*e;i<o*e+e;i++)s=Math.max(s,et[i]),c=Math.min(c,_t[i]),r=r||Z0[i],n=Math.max(n,Rt[i]);Mt[o*4]=F.f2h(s),Mt[o*4+1]=F.f2h(c),Mt[o*4+2]=F.f2h(r),Mt[o*4+3]=F.f2h(Math.max(n,.0025))}}const x0=new Float32Array(64*3*4);Q.forEach((e,o)=>{x0.set([e.az,e.D,e.h,e.I],o*4),x0.set([e.col[0],e.col[1],e.col[2],e.vis],(64+o)*4),x0.set([e.up,e.ph,e.kind,e.arm],(128+o)*4)});const ie={},he=()=>{F.own=ie,t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.bindTexture(t.TEXTURE_2D,F.tS),t.texSubImage2D(t.TEXTURE_2D,0,0,0,o0,1,t.RGBA,t.HALF_FLOAT,Mt),t.bindTexture(t.TEXTURE_2D,F.tL),t.texSubImage2D(t.TEXTURE_2D,0,0,0,64,3,t.RGBA,t.FLOAT,x0),t.bindTexture(t.TEXTURE_2D,null)};he();const fe=t.createTexture();t.bindTexture(t.TEXTURE_2D,fe),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R8,Be,Ce,0,t.RED,t.UNSIGNED_BYTE,We),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);let ue=NaN;const me=t.createTexture();t.bindTexture(t.TEXTURE_2D,me),Bt<yt&&(yt=St,Bt=St+1),yt=Math.max(St,yt-1),Bt=Math.min(Ge,Bt+1);const Ct=Bt-yt+1,n0=F.MT?Math.ceil((Ct-1)/(F.MT-1)):1,Pt=F.MT?Math.ceil((Ct-1)/n0)+1:Ct;if(F.MT){const e=new Uint8Array(Pt*n0*Gt*4);for(let o=0;o<n0;o++)for(let s=0;s<Gt;s++){const c=yt+o*(Pt-1),r=Math.min(Pt,Bt-c+1),n=(o*Gt+s)*Pt*4;e.set(le.subarray((s*N0+c-St)*4,(s*N0+c-St+r)*4),n);for(let i=r;i<Pt;i++)e.copyWithin(n+i*4,n+(r-1)*4,n+r*4)}t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,Pt,n0*Gt,0,t.RGBA,t.UNSIGNED_BYTE,e)}else t.pixelStorei(t.UNPACK_ROW_LENGTH,N0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,yt-St),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,Ct,Gt,0,t.RGBA,t.UNSIGNED_BYTE,le),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.bindTexture(t.TEXTURE_2D,null);const wt=new Float32Array(92),S=(e,o,s,c,r)=>{const n=e*4;wt[n]=o,wt[n+1]=s,wt[n+2]=c,wt[n+3]=r},M0=Ae==="Moonlit",de=pt+(a()<.5?-1:1)*(.9+.9*a()),X0=(14+16*a())*b0,Wt=H0==="High haze";S(4,Math.sin(de)*Math.cos(X0),Math.sin(X0),Math.cos(de)*Math.cos(X0),M0?.085+.03*a():0),S(5,Wt?1.5:M0?1.6:1,oe*(Wt?.045:.03)*(Et==="Lifted"&&!jt?.7:1)*(ht===4?1.5:1),v,b*(Wt?2.8:1.6)),S(6,xt[0],xt[1],xt[2],(Wt?.25:1)*(M0?.3:1)*.035),S(7,H0==="Aurora"?1:0,.2+.08*a(),a()*9,.034*(M0?.7:1));const Oe=Math.sin(z.az)*z.D,Qe=Math.cos(z.az)*z.D;S(8,Oe,Qe,z.h,z.I),S(9,z.col[0],z.col[1],z.col[2],d0*(Et==="Lifted"&&!jt?.35:Et==="Low and thin"?1.3:1)),S(10,ht,X.n,ne,2);const pe=Math.hypot(X.dx,X.dz);S(11,X.x,X.z,X.dx/pe,X.dz/pe),S(12,X.sp,X.h,X.w,X.lean),S(13,vt[0],vt[1],vt[2],vt[3]),S(16,X.jit,X.kind,Q0>0?1:0,Gt),S(17,m0[0],m0[1],m0[2],Yt===0?.4:1),S(18,re,1/(Se-re),ce,0),S(19,(Wt?.25:.35)*(ht===4?3:6),0,0,ce?He:-9);const xe=(.45+.6*U())*(U()<.5?-1:1)+pt;S(20,Math.sin(xe),Math.cos(xe),yt/k,k/Ct),S(22,F0,0,0,0),F.MT&&(wt[75]=n0,wt[77]=Ct,wt[78]=Pt,wt[83]=k);const S0=[(.8+1.2*a())*(a()<.5?-1:1),.4*G()],w0=[a()*4e3,a()*4e3],Ke=Wt?1/5e3:1/9e3;let s0=pt,Ht=1,Me=1,qt=O0,T0=1,we=0;const g0=[0,0],Te=S0[0]<0?-1:1,ge=e=>{S(0,ft,s0,K0,gt),S(1,q,U0,qt,.16),S(2,Dt,It,Ht,e),S(3,w0[0],w0[1],.02*Math.sqrt(gt/1e3)+.006,we&1023),S(14,1.25,Ke,Ue,.5+6*qt),S(15,Fe/(1+.45*(Ht-1)),(W.hash.charCodeAt(5)*131+W.hash.charCodeAt(9))%9973,Le,qt*2.2+.012),S(21,g0[0],g0[1],i0/(1+.45*(Ht-1)),Te*Math.min(1,Tt)),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),F.own!==ie&&he(),t.bindBuffer(t.UNIFORM_BUFFER,F.ubo),t.bufferSubData(t.UNIFORM_BUFFER,0,wt),t.bindBufferBase(t.UNIFORM_BUFFER,0,F.ubo),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,F.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,F.tS),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,F.tL),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,me),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,fe),t.bindVertexArray(F.vao),s0!==ue&&(ue=s0,t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,se),t.viewport(0,0,gt,F0),t.useProgram(F.pg),t.drawArrays(t.TRIANGLES,0,3)),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,gt,gt),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,I0),t.useProgram(F.p),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null),t.activeTexture(t.TEXTURE0)},E0=W.sound;let Ot=!1,ut="",G0=0,Ee=0,ve=0,be=0,B0=0,Tt=0;const ye=()=>{Tt=Math.min(1.8,Tt+1),E0.hit("noise",.14,{dur:1.8,cutoff:600+300*Tt})};return ge(0),(e,o)=>{o=Math.min(o||0,.1),we++;const s=W.input,c=s.taps();!s.down&&!Ot&&c.length&&ye(),s.down&&!Ot&&(Ot=!0,G0=s.x,Ee=s.y,ve=s0,be=e,ut="tap"),s.down?(ut!=="drag"&&ut!=="hold"&&Math.hypot(s.x-G0,s.y-Ee)>.012&&(ut="drag"),ut==="tap"&&e-be>.35&&(ut="hold",E0.hit("noise",.2,{dur:2.5,cutoff:900}),E0.note(50,{dur:3.5,vel:.12,wave:"sine",attack:1})),ut==="drag"&&(s0=Math.max(pt-.45,Math.min(pt+.45,ve-(s.x-G0)*2*Math.atan(ft))))):Ot&&(Ot=!1,ut==="tap"&&ye(),ut="");const r=Ot&&ut==="hold";Me=r?2.4:1,Ht+=(Me-Ht)*Math.min(1,o*(r?.45:.12)),T0+=((r?14:1)-T0)*Math.min(1,o*1.5),w0[0]+=S0[0]*o*T0,w0[1]+=S0[1]*o*T0,Tt*=Math.exp(-o/3.2),g0[1]+=o*.006*(1+.6*Tt),g0[0]+=o*Te*.02*Tt,qt+=(O0*(1+2.6*Tt)+1.2*b0*Tt-qt)*Math.min(1,o*3),ge(e),B0+=o*(.25+qt*25)*Ht*d0,B0>1+a()*2&&(B0=0,E0.note(88+(a()*12|0),{dur:.5,vel:.03+.03*a(),wave:"sine",pan:L*(.3+.4*a())}))}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
