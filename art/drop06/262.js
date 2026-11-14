// Light Pillars: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/262.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(U0){U0&&U0.add({num:262,name:"Light Pillars",fam:"Worlds",recipe:"A long exposure on a freezing night toward a snowy town, where ice crystals in the air throw a pillar of light above every lamp, tall for near lamps and short for far ones. The town and the lamps change every mint, and rare ones get an aurora. Drag to pan, tap to send a breath of wind through so the pillars smear and settle, or hold to let the ice cloud thicken.",interactive:"Drag to pan along the horizon; tap to send a breath of wind through the crystals, so the pillars swell and smear and then settle back; hold to let the crystal cloud thicken and drift",music:!0,gl:!0,fps:30,seed:0,make(W){const a=W.gl,dt=W.size,S=!!W.home;let tt=640356775;for(let t=2;t<66;t+=8)tt=Math.imul(tt^parseInt(W.hash.slice(t,t+8),16),2246822507)^tt>>>13;const e=()=>{tt=tt+1831565813|0;let t=Math.imul(tt^tt>>>15,1|tt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},bt=t=>{let o=0;for(const l in t)o+=t[l];let n=e()*o;for(const l in t)if(n-=t[l],n<0)return l;return Object.keys(t)[0]},m0=Math.PI/180,N=()=>e()-.5;!a.__c262&&!a.__c262pre&&(a.__c262pre=(()=>{const t=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
`,o=t+"void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",n=`
#ifdef GP
out uvec4 o;
#else
out vec4 o;
uniform highp usampler2D uG;
#endif
uniform sampler2D uN;uniform sampler2D uS;uniform sampler2D uL;uniform sampler2D uT;uniform sampler2D uP;
layout(std140) uniform P{vec4 u[22];};
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
  uvec4 gb=texelFetch(uG,ivec2(gl_FragCoord.xy),0);
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
}`,l=(f,h)=>{const u=a.createShader(h);return a.shaderSource(u,f),a.compileShader(u),u},s=a.getParameter(a.MAX_TEXTURE_SIZE),r=s<4096?`#define FOLD
`:"",c=l(o,a.VERTEX_SHADER),i=a.createProgram(),x=l(t+r+n,a.FRAGMENT_SHADER);a.attachShader(i,c),a.attachShader(i,x),a.linkProgram(i);const w=a.createProgram(),p=l(t+r+`#define GP
`+n,a.FRAGMENT_SHADER);return a.attachShader(w,c),a.attachShader(w,p),a.linkProgram(w),a.flush(),{p:i,a:c,b:x,pg:w,bg:p,MT:r?s:0}})());const pa=W.trait("Scene",S?"Town across a field":bt({"Town across a field":38,"Harbour on sea ice":24,"Forest road":26,"Single lamp":6,"Industrial site":6})),xa=W.trait("Lamps",S?"Mixed":bt({"Sodium old town":38,Mixed:34,"LED new town":28})),wa=W.trait("Crystal wobble",S?"Steady":bt({Needles:22,Steady:34,Wobbling:28,"Soft flames":16})),pt=W.trait("Crystal layer",S?"Low and deep":bt({"Low and thin":28,"Low and deep":44,Lifted:28})),Ma=W.trait("Moon",S?"No moon":bt({"No moon":60,Moonlit:40})),L0=W.trait("Sky",S?"Clear":bt({Clear:78,"High haze":14,Aurora:8})),Ta=W.trait("Lens",S?"50 mm":bt({"35 mm":30,"50 mm":44,"85 mm":26}));let at=2082364051;for(let t=2;t<66;t+=8)at=Math.imul(at^parseInt(W.hash.slice(t,t+8),16),2654435761)^at>>>15;const k=()=>{at=at+1831565813|0;let t=Math.imul(at^at>>>15,1|at);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let et=1000148033;for(let t=2;t<66;t+=8)et=Math.imul(et^parseInt(W.hash.slice(t,t+8),16),3266489909)^et>>>14;const z=()=>{et=et+1831565813|0;let t=Math.imul(et^et>>>15,1|et);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},F0={"Eye level":58,"Low horizon":30,"From a rise":12};let Pt="Eye level";if(!S){let t=k()*100;for(const o in F0)if(t-=F0[o],t<0){Pt=o;break}}Pt=W.trait("View",Pt);const st={"Town across a field":0,"Harbour on sea ice":1,"Forest road":2,"Single lamp":3,"Industrial site":4}[pa],yt={"35 mm":.5,"50 mm":.36,"85 mm":.22}[Ta],Ea=[.45,1,1.8,3];let Bt={Needles:0,Steady:1,Wobbling:2,"Soft flames":3}[wa],I0=Ea[Bt]*m0;const N0=Pt==="From a rise"?9+7*k():0,B=(st===1?2.4:1.6)+N0;let zt=0,Ut=200,Jt=1/30;pt==="Low and thin"?(zt=0,Ut=26+22*e(),Jt=1/16):pt==="Low and deep"?(zt=2.2,Ut=S?62:46+50*e()):(zt=30+22*e(),Ut=zt+22+26*e(),Jt=0),st===3&&(zt=0,Ut=Math.max(Ut,140)),Jt*=[.6,1,1.6,2.6][Bt];const Ct=pt==="Lifted"&&st!==3,ga=Ct?Bt===0?.35:.62:0,va=Ct?7:0,ba=Ct?Math.min([.6,1,1.6,2.6][Bt]/30,.75/(zt-6)):0,ya=Pt==="Low horizon"?.15+.05*k():Pt==="From a rise"?.4+.05*k():.33,d0=()=>{const t=e();return[1,.4+.08*t,.09+.06*t]},X0=()=>{const t=e();return[.68+.14*t,.8+.08*t,1]},p0=[.16,1,.34],x0=[1,.05,.03],Fa=[1,.2,.66],za=[.25,.8,1],S0=[.6,.92,.85],Da={"Sodium old town":.1,Mixed:.45,"LED new town":.85}[xa],Q=()=>e()<Da?X0():d0(),_=4096,ot=new Float32Array(_).fill(-1),Dt=new Float32Array(_).fill(9e3),G0=new Float32Array(_),Lt=new Float32Array(_),Y=t=>(t+1)*.5*_-.5,Ht=t=>-1+2*(t+.5)/_,Rt=[],W0=[],_t=[],qt=(t,o)=>{let n=Math.imul(t*73856093^o*19349663,668265261);return n^=n>>>15,n=Math.imul(n,739982445),((n^n>>>13)>>>0)/4294967296},V=(t,o,n,l,s,r,c)=>{Rt.push({az:t,D:o,halfM:n,base:l,fn:s,pt:r,wall:c});const i=n/o;let x=Math.max(0,Math.ceil(Y(t-i))),w=Math.min(_-1,Math.floor(Y(t+i)));w<x&&(x=w=Math.max(0,Math.min(_-1,Math.round(Y(t)))));for(let p=x;p<=w;p++){const f=s((Ht(p)-t)*o);if(f<=0)continue;const h=(l+f-B)/o;h>ot[p]&&(ot[p]=h),o<Dt[p]&&(Dt[p]=o)}},G=(t,o)=>{const n=Math.floor(t),l=t-n,s=c=>{let i=Math.imul(c+o*7919^1540483477,668265261);return i^=i>>>15,i=Math.imul(i,739982445),((i^i>>>12)>>>0)/4294967296},r=l*l*(3-2*l);return s(n)*(1-r)+s(n+1)*r},Ot=(t,o)=>{const n=Math.floor(t),l=t-n,s=l*l*(3-2*l);return qt(n,o)*(1-s)+qt(n+1,o)*s},$t=(t,o,n)=>{let l=.03*Math.exp(-n*.7);if(t.lI){const s=o-t.lx,r=n-t.lh,c=s*s+t.ldz*t.ldz+r*r;l+=.15*t.lI/(1+c/500)*(.4+.6*(t.ldz+1)/Math.sqrt(c+1))}return Math.min(.13,l)},w0=()=>z()<.14?.85+.15*z():.45*z(),Z=(t,o,n,l,s,r,c)=>{const i={az:t+n/o,D:o,w:l,y:s,b:r,c:c??w0(),h:1.1};return W0.push(i),i};let t0=!1;const B0=26+34*k(),M0=(t,o,n,l)=>{const s=7+6*e(),r=5.5+3.5*e(),c=r-1.6-1.6*e(),i=e()<.5,x=e()<.6?(e()-.5)*s*.6:99,w=.45+.4*k(),p=k()<.5?-1:1,f=(t*9973|0)&4095,h=l.length;if(V(t,o,s/2+.6,n,u=>{const m=Math.abs(u)/(s/2);if(m>1)return-1;let E=i?c+(r-c)*(1-m):m<.62?r:r-(r-c)*(m-.62)/.38;return Math.abs(u-x)<.35&&(E=Math.max(E,r+.6-.4*Math.abs(x)/s)),E+.12*(G(u*3+t*999,3)-.5)},(u,m,E,D)=>{if(Math.abs(u-x)<.35&&m>r-.2)return m>E-.25?.5:.02;if(m<.72&&m<.5+.22*Ot(u*1.7,f))return .3;const R=Math.abs(u)/(s/2),A=i?E-.55-.3*R*R:c-.16;return m>A||m>A-.1&&m>A-.1*Ot(u*2.6,f+1)?w*(i?.62+.38*Math.min(1,Math.max(0,u*p*2.5+.5)):R<.62?.8:u*p>0?1:.62)*(m<A+.08?.75:1):m>A-.55?$t(D,u,m)*.35:$t(D,u,m)},1),x!==99&&_t.length<12&&o<2600&&k()<.55&&_t.push([t+x/o,o,n+r+.6,B0+n,.5+.7*k(),.45,0]),l&&e()<.55){const u=1+(e()*3|0);for(let m=0;m<u;m++)e()<.6&&Z(t,o,(e()-.5)*s*.7,1+.4*e(),n+(e()<.75?1.6:Math.min(4.2,c-.8)),.3+.7*e())}if(l){const u=k()*3|0;for(let m=0;m<u;m++)Z(t,o,(k()-.5)*s*.75,.9+.5*k(),n+1.4+(k()<.3?2.6:0),.25+.6*k())}if(l&&t0){const u=c>4.2&&z()<.6?2:1,m=w0();for(let E=0;E<u;E++){const D=1+(z()*3.4|0),R=n+1.3+E*2.5;for(let A=0;A<D;A++)z()<.72&&Z(t,o,((A+.5)/D-.5)*s*.8,.8+.4*z(),R,.35+.65*z(),z()<.8?m:w0())}if(z()<.1){const E=s*(.4+.3*z());Z(t,o,(z()-.5)*(s-E),E,n+.6,.75,.3+.2*z()).h=1.9}}for(let u=h;u<l.length;u++)l[u].base=n};let T0=1e9;const Ft=(t,o,n,l)=>{l=Math.min(l,T0*o);const s=e()*1e6|0,r=l*(.09+.05*e());C0(t,o,n,l,s,r,.7+.5*k(),k()<.5?-1:1)},C0=(t,o,n,l,s,r,c,i)=>{V(t,o,r*1.2+.6,n,x=>{const w=l*(1-Math.abs(x)/(r*1.2));return w>0?w:-1},(x,w)=>{const p=w/l,f=w/c+s*.37,h=Math.floor(f),u=f-h,m=x>0?1:0,E=.62+.38*qt(h*2+m+s,s&1023),D=.3+.7*Math.sqrt(1-u)*(1-.25*u),R=1.2*r*Math.max(0,1-p)*E*D*(.92+.08*Math.sin(w*5.3+s+m*2.1)),A=Math.abs(x);return A>Math.max(R,.09)?-1:(u>.14&&R-A<.18+.3*u&&Math.sin(A*3.7+h*2.3+s)>-.35?.42:.045)*(x*i>0?1:.5)*(.6+.4*u)})},E0=(t,o,n,l)=>{l=Math.min(l,T0*o/1.2);const s=e()*1e6|0,r=l*(.28+.14*e());if(t0){C0(t,o,n,l*1.2,s,r*.36,.7+.5*z(),z()<.5?-1:1);return}V(t,o,r+.6,n,c=>{const i=c/r;return Math.abs(i)>1?Math.abs(c)<.3?l*.35:-1:l*(.35+.65*Math.sqrt(1-i*i))*(.86+.24*G(c*2.2+s,s)*G(c*7+s,s+2))},(c,i,x)=>{const w=.6/Math.max(.4,o*.0024);return Math.abs(c)<.3||i<l*.3||G(c*w+s,s+3)*G(i*w+s*.7,s+4)<.3+.25*(i/x)**2?.05:-1})},Ra=(t,o,n)=>V(t,o,.8,0,l=>n*(1-.003*Math.abs(l))),H0=(t,o,n=0)=>{const l=3.2+e(),s=16+6*e(),r=14+10*e(),c=9+4*e(),i=7,x=12,w=(e()<.5?-1:1)*(c+l),p=qt(t*1e4|0,5)<.5?-1:1;V(t,o,l+.5,n,f=>Math.abs(f)/l>1?-1:s+r*Math.max(0,1-Math.abs(f)/(l*.8)),(f,h,u,m)=>{if(h>s+.3){const D=l*.8*(1-(h-s)/r);return f*p>D*.55-.3*Ot(h*1.3,77)?.5:.08+.12*(f>0)}if(h>s-.5-.15*Ot(f*2,78))return .45;const E=$t(m,f,h)*1.3+.045*Math.exp(-h/9);return h>s-3.8&&h<s-1.3&&Math.abs(Math.abs(f)-l*.5)<.38?(h-s+1.3)%.5>-.16?.002:E*1.3:E},1),V(t+w/o,o+8,c+.5,n,f=>{const h=Math.abs(f)/c;return h>1?-1:i+(x-i)*(1-h)},(f,h,u,m)=>h>u-.6-.12*Ot(f*2,79)?.55:$t(m,f,h),1),Z(t+w/o,o+8,-c*.3,1.2,n+2.5,.35),Z(t+w/o,o+8,c*.3,1.2,n+2.5,.3),t0&&(Z(t,o,0,1.3,n+s-3.2,.7,.4).h=1.3,Z(t,o,0,1.6,n+.2,.8,.2).h=2.4)},Qt=(t,o,n)=>{for(let r=0;r<_;r++){const c=Ht(r);Lt[r]=(t+o*(.6*G(c*5+n,n)+.3*G(c*17+n,n+1)+.1*G(c*60,n+2))-B)/8e3}const l=1800+1400*z(),s=Lt.slice();for(let r=-1;r<1;){if(r+=(1.5+10*z()*z())/l,G(r*7+n,n+5)<.3)continue;const c=(5+17*z()*z())*(.55+.7*G(r*2.5+n,n+6)),i=c*(.14+.08*z()),x=Math.max(0,Math.ceil(Y(r-i/l))),w=Math.min(_-1,Math.floor(Y(r+i/l)));for(let p=x;p<=w;p++){const f=s[p]+c*(1-Math.abs(Ht(p)-r)*l/i)/l;f>Lt[p]&&(Lt[p]=f)}}},H=[],Kt=(t,o,n,l,s,r={})=>{H.length<64&&H.push({az:Math.atan2(t,o),D:Math.hypot(t,o),h:n,I:l,col:s,up:r.up??.45+.5*e(),kind:r.kind||0,arm:r.arm||0,ph:e()*9})},q=(t,o,n,l,s,r)=>Kt(Math.sin(t)*o,Math.cos(t)*o,n,l,s,r),g0=.36/yt,C=Math.max(1,g0),Yt=(t,o)=>{const n=Math.round(t*(C-1));if(n<=0)return;const l=tt,s=at,r=et;tt^=1597463007+t,at^=461845907+t,et^=1759714724+t;for(let c=0;c<n;c++)o();tt=l,at=s,et=r},q0=pt==="Low and thin"?.6:1,O0=pt==="Low and thin"?.45:1;let it=0,P=S?1:e()<.5?-1:1,g=0,b=.3,Q0=1;const a0=t=>it+Math.atan((t-.5)*2*yt);let y=null,I={n:0,x:0,z:0,dx:0,dz:1,sp:4,h:1.2,w:.1,lean:.08,jit:.15,kind:0},xt=[0,0,0,0],e0=[0,0,0,0],K0=0,o0=1;const n0=(t,o,n,l,s)=>{const r=a0(t);q(r,o,n,1,l,{up:.7,arm:s}),y=H[0]};if(st===0){let t=(S?330:270+240*e())*(q0<1?.8:1);!S&&g0>=1&&(t=Math.max(t,270)),t*=C,!S&&g0>=1&&(C>1||q0<1)&&(T0=.14*yt),g=a0(S?.38:.36+.12*N()-P*.04),b=(.17+.08*e())*(yt/.36)**.4*1.3;const o=.05+.05*z(),n=z()<.5?-1:1,l=9+9*z(),s=(T,d)=>l*Math.tanh(Math.max(0,T-t+40*C)/C*o/l)*(.6+.8*(.5+.5*Math.tanh(n*(d-g)/b*2)));t0=!0,n0(P>0?.8+.04*N():.2+.04*N(),S?55:45+30*e(),7.5+e(),Q(),-P*(1.2+.4*e())),Qt(70,70,e()*99|0);const r=70+(e()*40|0),c=()=>{const T=g+(e()*2-1)*b*1.5,d=t+(160+260*e())*C;e()<.75?Ft(T,d,s(d,T),10+12*e()):E0(T,d,s(d,T),9+7*e())};for(let T=0;T<r;T++)c();const i=26+(e()*20|0),x=()=>{const T=(e()+e()+e())/1.5-1,d=g+T*b,M=t+(e()-.4)*230*C;M0(d,M,s(M,d),!0)};for(let T=0;T<i;T++)x();const w=()=>{const T=e()+e()-1,d=g+T*b*1.1,M=t+(e()-.3)*210*C;e()<.6?Ft(d,M,s(M,d),7+11*e()):E0(d,M,s(M,d),7+8*e())};for(let T=0;T<30;T++)w();if(Yt(r,c),Yt(i,x),Yt(30,w),S||e()<.75){const T=g+N()*b;H0(T,t+60*C,s(t+60*C,T))}if(S||e()<.6){const T=g+(S?.7:N()*1.6)*b,d=2600+1500*e(),M=80+50*e();Ra(T,d,M),q(T,d,M,.22,x0,{kind:1,up:1}),q(T,d,M*.55,.12,x0,{kind:1,up:1})}const p=2+(e()*2|0);for(let T=0;T<p;T++){const d=g+(e()*2-1)*b*.85,M=t+(-150+200*e())*C,v=d+(e()-.5)*2.2,F=(32+14*e())*C,K=3+(e()*3|0),vt=Q(),ct=Math.sin(d)*M,j=Math.cos(d)*M;for(let A0=0;A0<K;A0++){const da=A0*F*(.85+.3*e()),k0=ct+Math.sin(v)*da,P0=j+Math.cos(v)*da;Kt(k0,P0,7+2*e()+s(Math.hypot(k0,P0),Math.atan2(k0,P0)),.55+.7*e(),e()<.8?vt:Q())}}for(let T=0;T<4+(e()*5|0);T++){const d=g+(e()*2-1)*b,M=t+(e()-.4)*290*C;q(d,M,5+4*e()+s(M,d),.3+.8*e(),e()<.12?S0:Q())}(S||e()<.7)&&q(g+N()*b,t-40*C,5.5,.35,p0,{up:1});const f=Math.sin(g+P*b*.5)*(t-80*C),h=Math.cos(g+P*b*.5)*(t-80*C),u=Math.sin(y.az)*y.D+P*3.2,m=Math.cos(y.az)*y.D,E=(f-u)/(h-m);xt=[u-E*m,E,0,3];const D=3+(e()*3|0),R=y.col;for(let T=1;T<=D;T++){const d=m+(h-m)*(T/(D+.6))*(.9+.2*e());Kt(xt[0]+E*d-P*3.2,d,7.5+e(),.95,R,{arm:-P*1.3})}I={n:20,x:-P*(2.5+3*e()),z:7,dx:-P*(.08+.12*e()),dz:1,sp:4+1.2*e(),h:1.25,w:.11,lean:.09,jit:.12,kind:0};{const T=Math.sin(y.az)*y.D-P*(3+3*z())-I.x,d=Math.cos(y.az)*y.D+4+8*z()-I.z;I.dx=T/d,I.n=Math.min(24,Math.ceil(Math.hypot(T,d)/I.sp)+3)}e0=[P*(.6+1.5*e()),-P*(.03+.05*e()),P*4e-4*e(),1]}else if(st===1){const t=(1200+900*e())*O0;g=a0(.42+.12*N()),b=.25+.08*e(),n0(P>0?.8:.2,65+30*e(),6.5,Q(),P*.25),Qt(150,110,e()*99|0);const o=f=>{const h=(f-g)/(b*1.6);return Math.abs(h)<1.4?8+45*Math.exp(-h*h*2)*(.7+.5*G(f*30,7)):-1};for(let f=0;f<_;f++){const h=Ht(f),u=o(h);if(u>0){const m=(u-B)/(t+500);m>ot[f]&&(ot[f]=m),Dt[f]=Math.min(Dt[f],t+30)}}Rt.push({az:g,D:t+500,halfM:b*2.3*(t+500),base:0,fn:f=>o(g+f/(t+500)),pt:(f,h,u)=>{const m=G(f*.03+h*.05,11)+.3*G(f*.2,12);return h>u-1.2?.12:m>.62?.06:.3+.12*G(f*.5+h,13)}});const n=(f,h)=>Math.max(0,(f-t)*.09)*Math.exp(-(((h-g)/b)**2));for(let f=0;f<45;f++){const h=(e()+e()+e())/1.5-1,u=g+h*b,m=t+20+450*e()*e();M0(u,m,n(m,u),!0),e()<.5&&Ft(u+N()*.01,m+30,n(m,u),8+8*e())}e()<.7&&H0(g+N()*b,t+260);const l=9+(e()*6|0),s=Q();for(let f=0;f<l;f++){const h=g+(f/(l-1)-.5)*b*1.5+N()*.012,u=t+10+15*e();q(h,u,7+e(),.9,e()<.8?s:Q())}for(let f=0;f<12+(e()*8|0);f++){const h=e()+e()-1,u=g+h*b,m=t+60+420*e();q(u,m,n(m,u)+6+3*e(),.6+.5*e(),Q())}const r=g+(e()-.5)*b,c=t-40,i=60+30*e();V(r,c,i/2+2,0,f=>{const h=Math.abs(f)/(i/2);return h>1?-1:6-1.2*h*h+(Math.abs(f+i*.15)<i*.18?7:0)+(Math.abs(f+i*.15)<.6?8:0)+(Math.abs(f-i*.3)<.3?9:0)},(f,h,u)=>h>u-.4&&Math.abs(f+i*.15)>.6?.5:0),Z(r,c,-i*.2,1,9.2,.6),Z(r,c,-i*.09,1,9.2,.5),Z(r,c,i*.05,.8,4.3,.4),q(r-i*.15/c,c,21,.3,[1,.95,.85],{up:1}),q(r+i*.3/c,c,7,.22,p0,{up:1}),q(r-i*.05/c,c,12,.5,d0(),{}),q(r+i*.15/c,c,9,.4,d0(),{});const x=4,w=Math.sin(y.az)*y.D,p=Math.cos(y.az)*y.D;for(let f=1;f<=x;f++){const h=f/(x+1);Kt(w*(1-h)+Math.sin(g+P*b*.7)*t*h,p*(1-h)+Math.cos(g+P*b*.7)*t*h,6.5,.9,y.col,{arm:.25})}I={n:14,x:-P*4,z:10,dx:-P*.1+.05*N(),dz:1,sp:11+4*e(),h:1.7,w:.045,lean:.12,jit:.4,kind:1}}else if(st===2){it=0;const t=P,o=t*(32e-5+16e-5*e()),n=t*(.02+.03*e());xt=[-t*2.4,n,o,3.2];const l=h=>xt[0]+n*h+o*h*h,s=t*5.5,r=42+8*e(),c=Q();let i=62+14*e();const x=(380+220*e())*C;for(let h=0;h<16&&i<1100;h++)(h<2||e()>.18)&&Kt(l(i)+s,i,8+.6*e(),1,e()<.9?c:Q(),{arm:-t*1.6}),i+=r*(.75+.6*e())*(1+i/900);y=H[0];const w=H[Math.min(H.length-1,5)].az;it=.5*(y.az+w)+t*.04,g=w,b=.25,Qt(120,90,e()*99|0);const p=260,f=()=>{const h=-.95+1.9*e(),u=x*(.9+.5*e())/Math.max(.35,Math.cos(h*.7)),m=Math.cos(h)*u,E=Math.sin(h)*u;Math.abs(E-l(m))<9+4*e()||G(h*14,5)<.22||(e()<.82?Ft(h,u,0,9+14*e()*e()+6*G(h*6,9)):E0(h,u,0,8+7*e()))};for(let h=0;h<p;h++)f();Yt(p,f);for(let h=0;h<2+(e()*3|0);h++){const u=-.6+1.2*e(),m=700+1200*e();q(u,m,5+3*e(),.5,Q()),M0(u+.006,m+10,0,!0)}I={n:22,x:0,z:30,dx:0,dz:1,sp:30,h:2,w:.035,lean:.04,jit:0,kind:2},o0=1.2}else if(st===3){it=0,g=0,b=.5,Q0=.35,n0(.6+.08*N(),30+10*e(),7,Q(),-1.4),Qt(80,60,e()*99|0);const t=()=>{const o=-.9+1.8*e(),n=(300+500*e())*C;G(o*9,4)>.45&&Ft(o,n,0,8+12*e())};for(let o=0;o<26;o++)t();Yt(26,t);for(let o=0;o<4+(e()*4|0);o++)q(-.6+1.2*e(),2500+2500*e(),6+3*e(),.7,Q());I={n:7,x:-2.5,z:6,dx:-.6,dz:1,sp:4.5,h:1.2,w:.11,lean:.12,jit:.2,kind:0},K0=1,o0=1.6}else{const t=(800+500*e())*O0;g=a0(.42+.1*N()),b=.22+.06*e(),n0(P>0?.82:.18,80+30*e(),8,Q(),-P*1.3),Qt(90,60,e()*99|0);for(let s=0;s<7;s++){const r=g+N()*2*b,c=t+200*N(),i=8+10*e(),x=12+10*e();V(r,c,i+1,0,w=>{const p=Math.abs(w)/i;return p>1?-1:x+2.5*Math.sqrt(Math.max(0,1-p*p))},(w,p,f)=>p>f-.7?.6*(.5+.5*(w>0)):.03+.03*(Math.round(p*.8)%2))}for(let s=0;s<6;s++){const r=g+N()*2*b,c=t+250*N(),i=20+30*e(),x=8+10*e(),w=e()<.5;V(r,c,i+1,0,p=>Math.abs(p)>i?-1:x+(w?2*(1-Math.abs(p)/i):0)+(Math.abs(p-i*.3)<2?5:0),(p,f,h)=>f>h-.35?.5:0),k()<.6&&Z(r,c,i*(k()-.5),2+4*k(),2.2+3*k(),.5),k()<.7&&_t.push([r+i*.3/c,c,x+5,x+B0*1.4,.5+.4*k(),1,0])}for(let s=0;s<3;s++){const r=g+N()*1.6*b,c=t+100*N(),i=55+45*e();V(r,c,3.5,0,x=>Math.abs(x)<2.6-.8*Math.abs(x)/2.6?i-Math.abs(x)*.3:-1,(x,w,p)=>Math.abs(w-i*.8)<1.2?.25:.02),q(r,c,i,.18,x0,{kind:1,up:1}),_t.push([r,c,i,i+70+90*k(),.7+.4*k(),1.6,0])}for(let s=0;s<30;s++){const r=g+(e()*2-1)*b*1.5,c=t+300+300*e();Ft(r,c,0,10+10*e())}for(let s=0;s<6;s++){const r=g+(e()*2-1)*b,c=t+150*N();q(r,c,24+12*e(),1.8,e()<.6?X0():S0,{up:.5});const i=H[H.length-1];i&&V(i.az,i.D,2.5,0,x=>Math.abs(x)<2?i.h+.6:-1,(x,w)=>Math.abs(x)<.3||w>i.h-.1?.03:-1)}for(let s=0;s<12;s++)q(g+(e()*2-1)*b,t+200*N(),7+4*e(),.8,e()<.25?za:e()<.2?p0:Q());const o=g+(e()-.5)*b,n=t-200,l=60+40*e();V(o,n,l/2,0,s=>Math.abs(s)>l/2?-1:6+1.5*(1-Math.abs(s)/(l/2)),(s,r,c)=>r>c-.4?.55:0),Z(o,n,-l*.2,4,.4,.8);for(let s=0;s<11;s++)s%3?e():q(o+(s/10-.5)*l/n,n,8.5,.7,[1,.47,.12],{up:.6});I={n:16,x:-P*3,z:5,dx:-P*.15,dz:1,sp:3.2,h:1.6,w:.06,lean:.03,jit:.05,kind:0}}const v0=H.length;for(const t of H){const o=Math.max(0,Math.min(_-1,Math.round(Y(t.az))));t.vis=(t.h-B)/t.D>ot[o]+4e-4||t.D<=Dt[o]+5?1:0}if(y.vis=1,y.arm){const t=y.D,o=y.h,n=y.arm,l=n<0?-1:1,s=o*(.4+.3*z()),r=Math.min(0,n)-.6,c=Math.max(0,n)+.6,i=(r+c)/2,x=(c-r)/2,w=y.az+i/t;Rt.push({az:w,D:t,halfM:x,base:0,lamp:1,fn:()=>o+.36,pt:(u,m)=>{const E=u+i,D=E-n,R=.07+.05*(1-m/o)+(m<.28?.09:0);if(Math.abs(D)<.34&&m<.16-1.3*D*D)return .5;if(Math.abs(D)<R&&m<o+.05)return D*l>R*.15&&m>.3&&m<s?.4:.015;const A=E/n,T=o+.16+.25*A*(1-A);return A>-.05&&A<1.05&&Math.abs(m-T)<.05||Math.abs(E)<.4-.12*Math.min(1,Math.max(0,(m-o-.04)*6))&&Math.abs(m-o-.12)<.09?.015:Math.abs(E)<.36&&Math.abs(m-o-.24)<.09-.75*E*E?.5:-1}});const p=x/t,f=Math.max(0,Math.ceil(Y(w-p))),h=Math.min(_-1,Math.floor(Y(w+p)));for(let u=f;u<=h;u++)ot[u]=Math.max(ot[u],(o+.36-B)/t)}{const t=[];for(let n=1;n<v0;n++)H[n].kind===0&&t.push(n);for(let n=t.length-1;n>0;n--){const l=z()*(n+1)|0,s=t[n];t[n]=t[l],t[l]=s}t.sort((n,l)=>H[l].vis-H[n].vis);const o=3+(z()<.5?1:0);t.forEach((n,l)=>{H[n].I*=l<o?2.3:l<o+12?1:.42})}let L=1,At=-1,rt=_,wt=-1;for(const t of Rt)L=Math.min(L,(t.base-B)/t.D);for(let t=0;t<_;t++)ot[t]>At&&(At=ot[t]);L-=.0015,At=Math.max(L+.02,Math.min(At+.002,L+.5));let O=_,Mt=-1;for(const t of Rt){const o=t.halfM/t.D;O=Math.min(O,Math.ceil(Y(t.az-o))),Mt=Math.max(Mt,Math.floor(Y(t.az+o)))}O=Math.max(0,O-1),Mt=Math.min(_-1,Math.max(O+1,Mt+1));const ht=Mt-O+1,b0=500/yt,Y0=(At-L)*b0,J=Y0>224?Math.min(640,_*320/ht|0,Math.ceil(Y0/1.2)):160,nt=new Uint8Array(ht*J*4),s0=new Float32Array(ht*J).fill(1e9),Tt=J/(At-L),_a=2/_*b0,Aa=b0/Tt;for(const t of Rt){if(!t.wall)continue;let o=45;for(let n=1;n<v0;n++){const l=H[n];if(l.kind)continue;const s=(l.az-t.az)*t.D,r=t.D-l.D;if(r<-1)continue;const c=Math.hypot(s,r);c<o&&(o=c,t.lx=s,t.ldz=Math.max(0,r),t.lh=l.h-t.base,t.lI=Math.sqrt(Math.min(1.5,l.I))*(1-c*c/2025))}}for(const t of Rt){const o=t.halfM/t.D,n=Math.max(0,Math.ceil(Y(t.az-o))),l=Math.min(_-1,Math.floor(Y(t.az+o)));for(let s=n;s<=l;s++){const r=(Ht(s)-t.az)*t.D,c=t.fn(r);if(c<=0)continue;const i=Math.max(0,Math.floor(((t.base-B)/t.D-L)*Tt)),x=Math.min(J-1,Math.floor(((t.base+c-B)/t.D-L)*Tt));for(let w=i;w<=x;w++){const p=w*ht+s-O;if(t.D>=s0[p])continue;const f=B+(L+(w+.5)/Tt)*t.D-t.base,h=t.pt?t.pt(r,Math.max(0,f),c,t):0;h<0||(s0[p]=t.D,nt[p*4]=255,s<rt&&(rt=s),s>wt&&(wt=s),nt[p*4+1]=Math.min(255,h*255),nt[p*4+3]=t.lamp?255:0)}}}for(const t of W0){const o=Math.round(Y(t.az-t.w/2/t.D)),n=Math.max(o,Math.round(Y(t.az+t.w/2/t.D))),l=Math.round(((t.y-B)/t.D-L)*Tt),s=Math.max(l,Math.round(((t.y+t.h-B)/t.D-L)*Tt)),r=n-o+1,c=s-l+1,i=r*_a,x=i>=3.5,w=t.h>1.5||t.w>2.5,p=i>=6&&c*Aa>=4,f=qt(o,l)<.5,h=o+(r>>1),u=l+Math.round(c*.62),m=Math.max(3,Math.round(r/Math.max(2,Math.round(t.w/1.3))));for(let d=Math.max(O,o);d<=Math.min(Mt,n);d++)for(let M=Math.max(0,l);M<=Math.min(J-1,s);M++){let v=t.b;x&&(M-l<c/3&&(v*=.7),d-o<r/2===f&&(v*=.8)),p&&(w?(d-o)%m===m-1&&d<n||M===s:d===h||M===u)&&(v=Math.max(.055,v*.2));const F=M*ht+d-O;Math.abs(s0[F]-t.D)<1.5&&v*255>nt[F*4+2]&&(nt[F*4+2]=v*255,nt[F*4+3]=t.c*255)}if(t.base===void 0)continue;const E=Math.max(0,Math.floor(((t.base-B)/t.D-L)*Tt)),D=Math.min(J-1,l-1,Math.ceil(((t.base+.72-B)/t.D-L)*Tt)),R=(o+n)/2,A=Math.max(1,r*.9),T=t.b*(t.y-t.base<2.2?.4:.15);for(let d=Math.max(O,Math.floor(R-2*A));d<=Math.min(Mt,Math.ceil(R+2*A));d++){const M=Math.exp(-(((d-R)/A)**2))*T;if(!(M<.01))for(let v=E;v<=D;v++){const F=v*ht+d-O;Math.abs(s0[F]-t.D)<1.5&&nt[F*4+3]===0&&(nt[F*4+1]=Math.min(255,nt[F*4+1]+M*255))}}}const r0=Math.min(_t.length,12),$=1024,Et=96,j0=new Float32Array($*Et),Z0=new Uint8Array($*Et);let gt=L+.01;for(let t=0;t<r0;t++){const o=_t[t];gt=Math.max(gt,(o[3]+4*(2+.04*(o[3]-o[2]))-B)/o[1])}gt=Math.min(gt,L+.4);for(let t=0;t<r0;t++){const[o,n,l,s,r,c,i]=_t[t],x=2+.04*(s-l),w=(c*3+40+.25*(s-l))*3/n,p=Math.max(0,Math.floor((o-w+1)*.5*$)),f=Math.min($-1,Math.ceil((o+w+1)*.5*$)),h=Math.max(0,Math.floor(((l-B)/n-L)/(gt-L)*Et)),u=Math.min(Et-1,Math.ceil(((s+4*x-B)/n-L)/(gt-L)*Et)),m=new Float32Array(f-p+1);for(let E=p;E<=f;E++)m[E-p]=G(((E+.5)/$*2-1-o)*n*.25+t*7,17+t);for(let E=h;E<=u;E++){const D=B+(L+(E+.5)/Et*(gt-L))*n,R=D-l;if(R<-.5)continue;const A=.8*G(R*.15+t*3,29+t),T=c+.09*R,d=T*3+16+.25*R,M=Math.min(1,(R+.5)/2)*(1-Math.min(1,Math.max(0,(D-s+8)/10))),v=Math.exp(-(D-s)*(D-s)/(2*x*x))*.03,F=v>3e-4?9:3.2*T/n;for(let K=Math.max(p,Math.floor((o-F+1)*.5*$)),vt=Math.min(f,Math.ceil((o+F+1)*.5*$));K<=vt;K++){const ct=((K+.5)/$*2-1-o)*n-i*R,j=Math.exp(-ct*ct/(2*T*T))*M*c/T+v*Math.exp(-ct*ct/(2*d*d));j>.002&&(j0[E*$+K]+=r*j*(.6+m[K-p]*A)/(1+R*.05))}}}for(let t=0;t<$*Et;t++)Z0[t]=Math.min(255,j0[t]*255/3);let ft=[0,0,0];for(const t of H){const o=t.col[2]<.3?1.7:1;for(let n=0;n<3;n++)ft[n]+=t.col[n]*t.I*o}const ka=Math.max(ft[0],ft[1],ft[2]);ft=ft.map(t=>t/ka);const U=a.__c262||(a.__c262=(()=>{const{p:t,a:o,b:n,pg:l,bg:s}=a.__c262pre;for(const[d,M]of[[l,s],[t,n]]){if(!a.getProgramParameter(d,a.LINK_STATUS))throw new Error("262: "+(a.getShaderInfoLog(M)||a.getShaderInfoLog(o)||a.getProgramInfoLog(d)));a.useProgram(d),["uN","uS","uL","uT","uP","uG"].forEach((v,F)=>a.uniform1i(a.getUniformLocation(d,v),F)),a.uniformBlockBinding(d,a.getUniformBlockIndex(d,"P"),0)}a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_ALIGNMENT,1);const r=256,c=new Float32Array(r*r),i=new Float32Array(r*r),x=new Float32Array(r*r),w=new Uint8Array(r*r*4),p=(d,M,v,F)=>{for(let K=0;K<r;K++){const vt=K*F;let ct=0;for(let j=-2;j<=2;j++)ct+=d[vt+(j+r&255)*v];for(let j=0;j<r;j++)M[vt+j*v]=ct*.2,ct+=d[vt+(j+3&255)*v]-d[vt+(j-2+r&255)*v]}};let f=2498737;for(let d=0;d<2;d++){for(let M=0;M<r*r;M++)f=Math.imul(f^f>>>15,739982445)+1831565813|0,c[M]=(f>>>8&65535)/65535-.5;p(c,i,1,r),p(i,c,1,r),p(c,i,1,r),p(i,c,r,1),p(c,i,r,1),p(i,c,r,1);for(let M=0;M<r*r;M++){const v=Math.max(0,Math.min(1,.5+c[M]*4.8));d===0?x[M]=v:w[M*4+3]=v*255}}for(let d=0;d<r;d++)for(let M=0;M<r;M++){const v=d*r+M,F=x[d*r+(M+1&255)]-x[d*r+(M+255&255)],K=x[(d+1&255)*r+M]-x[(d+255&255)*r+M];w[v*4]=x[v]*255,w[v*4+1]=Math.max(0,Math.min(255,127.5+F*1100)),w[v*4+2]=Math.max(0,Math.min(255,127.5+K*1100))}const h=a.createTexture();a.bindTexture(a.TEXTURE_2D,h),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,r,r,0,a.RGBA,a.UNSIGNED_BYTE,w),a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.REPEAT),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.REPEAT);let u=_;for(;u>a.getParameter(a.MAX_TEXTURE_SIZE);)u>>=1;const m=a.createTexture();a.bindTexture(a.TEXTURE_2D,m),a.texImage2D(a.TEXTURE_2D,0,a.RGBA16F,u,1,0,a.RGBA,a.HALF_FLOAT,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);const E=a.createTexture();a.bindTexture(a.TEXTURE_2D,E),a.texImage2D(a.TEXTURE_2D,0,a.RGBA32F,64,3,0,a.RGBA,a.FLOAT,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.bindTexture(a.TEXTURE_2D,null);const D=a.createBuffer();a.bindBuffer(a.UNIFORM_BUFFER,D),a.bufferData(a.UNIFORM_BUFFER,22*16,a.DYNAMIC_DRAW),a.bindBuffer(a.UNIFORM_BUFFER,null);const R=new Float32Array(1),A=new Uint32Array(R.buffer),T=d=>{R[0]=d;const M=A[0],v=M>>>16&32768;let F=(M>>>23&255)-112;const K=M&8388607;return F<=0?v:F>=31?v|31743:v|F<<10|K>>>13};return{p:t,pg:l,tN:h,tS:m,tL:E,NW:u,ubo:D,vao:a.createVertexArray(),f2h:T,MT:a.__c262pre.MT}})()),jt=U.NW,ut=new Uint16Array(jt*4);if(jt===_)for(let t=0;t<_;t++)ut[t*4]=U.f2h(ot[t]),ut[t*4+1]=U.f2h(Dt[t]),ut[t*4+2]=U.f2h(G0[t]),ut[t*4+3]=U.f2h(Math.max(Lt[t],.0025));else{const t=_/jt;for(let o=0;o<jt;o++){let n=-1,l=9e3,s=0,r=-1;for(let c=o*t;c<o*t+t;c++)n=Math.max(n,ot[c]),l=Math.min(l,Dt[c]),s=s||G0[c],r=Math.max(r,Lt[c]);ut[o*4]=U.f2h(n),ut[o*4+1]=U.f2h(l),ut[o*4+2]=U.f2h(s),ut[o*4+3]=U.f2h(Math.max(r,.0025))}}const l0=new Float32Array(64*3*4);H.forEach((t,o)=>{l0.set([t.az,t.D,t.h,t.I],o*4),l0.set([t.col[0],t.col[1],t.col[2],t.vis],(64+o)*4),l0.set([t.up,t.ph,t.kind,t.arm],(128+o)*4)});const V0={},J0=()=>{U.own=V0,a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.bindTexture(a.TEXTURE_2D,U.tS),a.texSubImage2D(a.TEXTURE_2D,0,0,0,jt,1,a.RGBA,a.HALF_FLOAT,ut),a.bindTexture(a.TEXTURE_2D,U.tL),a.texSubImage2D(a.TEXTURE_2D,0,0,0,64,3,a.RGBA,a.FLOAT,l0),a.bindTexture(a.TEXTURE_2D,null)};J0();const $0=a.createTexture();a.bindTexture(a.TEXTURE_2D,$0),a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.texImage2D(a.TEXTURE_2D,0,a.R8,$,Et,0,a.RED,a.UNSIGNED_BYTE,Z0),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);const y0=a.createTexture();a.bindTexture(a.TEXTURE_2D,y0),a.texImage2D(a.TEXTURE_2D,0,a.RGBA32UI,dt,dt,0,a.RGBA_INTEGER,a.UNSIGNED_INT,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST);const ta=a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,ta),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,y0,0),a.bindFramebuffer(a.FRAMEBUFFER,null);let aa=NaN;const ea=a.createTexture();a.bindTexture(a.TEXTURE_2D,ea),wt<rt&&(rt=O,wt=O+1),rt=Math.max(O,rt-1),wt=Math.min(Mt,wt+1);const It=wt-rt+1,Zt=U.MT?Math.ceil((It-1)/(U.MT-1)):1,kt=U.MT?Math.ceil((It-1)/Zt)+1:It;if(U.MT){const t=new Uint8Array(kt*Zt*J*4);for(let o=0;o<Zt;o++)for(let n=0;n<J;n++){const l=rt+o*(kt-1),s=Math.min(kt,wt-l+1),r=(o*J+n)*kt*4;t.set(nt.subarray((n*ht+l-O)*4,(n*ht+l-O+s)*4),r);for(let c=s;c<kt;c++)t.copyWithin(r+c*4,r+(s-1)*4,r+s*4)}a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,kt,Zt*J,0,a.RGBA,a.UNSIGNED_BYTE,t)}else a.pixelStorei(a.UNPACK_ROW_LENGTH,ht),a.pixelStorei(a.UNPACK_SKIP_PIXELS,rt-O),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,It,J,0,a.RGBA,a.UNSIGNED_BYTE,nt),a.pixelStorei(a.UNPACK_ROW_LENGTH,0),a.pixelStorei(a.UNPACK_SKIP_PIXELS,0);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.bindTexture(a.TEXTURE_2D,null);const Nt=new Float32Array(88),X=(t,o,n,l,s)=>Nt.set([o,n,l,s],t*4),c0=Ma==="Moonlit",oa=it+(e()<.5?-1:1)*(.9+.9*e()),z0=(14+16*e())*m0,Xt=L0==="High haze";X(4,Math.sin(oa)*Math.cos(z0),Math.sin(z0),Math.cos(oa)*Math.cos(z0),c0?.085+.03*e():0),X(5,Xt?1.5:c0?1.6:1,Q0*(Xt?.045:.03)*(pt==="Lifted"&&!Ct?.7:1)*(st===4?1.5:1),g,b*(Xt?2.8:1.6)),X(6,ft[0],ft[1],ft[2],(Xt?.25:1)*(c0?.3:1)*.035),X(7,L0==="Aurora"?1:0,.2+.08*e(),e()*9,.034*(c0?.7:1));const Pa=Math.sin(y.az)*y.D,Ua=Math.cos(y.az)*y.D;X(8,Pa,Ua,y.h,y.I),X(9,y.col[0],y.col[1],y.col[2],o0*(pt==="Lifted"&&!Ct?.35:pt==="Low and thin"?1.3:1)),X(10,st,I.n,K0,2);const na=Math.hypot(I.dx,I.dz);X(11,I.x,I.z,I.dx/na,I.dz/na),X(12,I.sp,I.h,I.w,I.lean),X(13,xt[0],xt[1],xt[2],xt[3]),X(16,I.jit,I.kind,N0>0?1:0,J),X(17,e0[0],e0[1],e0[2],Bt===0?.4:1),X(18,L,1/(At-L),r0,0),X(19,(Xt?.25:.35)*(st===4?3:6),0,0,r0?gt:-9);const sa=(.45+.6*k())*(k()<.5?-1:1)+it;X(20,Math.sin(sa),Math.cos(sa),rt/_,_/It),U.MT&&(Nt[75]=Zt,Nt[77]=It,Nt[78]=kt,Nt[83]=_);const D0=[(.8+1.2*e())*(e()<.5?-1:1),.4*N()],i0=[e()*4e3,e()*4e3],La=Xt?1/5e3:1/9e3;let Vt=it,St=1,ra=1,Gt=I0,h0=1,la=0;const f0=[0,0],ca=D0[0]<0?-1:1,ia=t=>{X(0,yt,Vt,ya,dt),X(1,B,v0,Gt,.16),X(2,zt,Ut,St,t),X(3,i0[0],i0[1],.02*Math.sqrt(dt/1e3)+.006,la&1023),X(14,1.25,La,ga,.5+6*Gt),X(15,ba/(1+.45*(St-1)),(W.hash.charCodeAt(5)*131+W.hash.charCodeAt(9))%9973,va,Gt*2.2+.012),X(21,f0[0],f0[1],Jt/(1+.45*(St-1)),ca*Math.min(1,mt)),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),U.own!==V0&&J0(),a.bindBuffer(a.UNIFORM_BUFFER,U.ubo),a.bufferSubData(a.UNIFORM_BUFFER,0,Nt),a.bindBufferBase(a.UNIFORM_BUFFER,0,U.ubo),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,U.tN),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,U.tS),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,U.tL),a.activeTexture(a.TEXTURE3),a.bindTexture(a.TEXTURE_2D,ea),a.activeTexture(a.TEXTURE4),a.bindTexture(a.TEXTURE_2D,$0),a.bindVertexArray(U.vao),Vt!==aa&&(aa=Vt,a.activeTexture(a.TEXTURE5),a.bindTexture(a.TEXTURE_2D,null),a.bindFramebuffer(a.FRAMEBUFFER,ta),a.viewport(0,0,dt,dt),a.useProgram(U.pg),a.drawArrays(a.TRIANGLES,0,3)),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,dt,dt),a.activeTexture(a.TEXTURE5),a.bindTexture(a.TEXTURE_2D,y0),a.useProgram(U.p),a.drawArrays(a.TRIANGLES,0,3),a.bindVertexArray(null),a.activeTexture(a.TEXTURE0)},u0=W.sound;let Wt=!1,lt="",R0=0,ha=0,fa=0,ua=0,_0=0,mt=0;const ma=()=>{mt=Math.min(1.8,mt+1),u0.hit("noise",.14,{dur:1.8,cutoff:600+300*mt})};return ia(0),(t,o)=>{o=Math.min(o||0,.1),la++;const n=W.input,l=n.taps();!n.down&&!Wt&&l.length&&ma(),n.down&&!Wt&&(Wt=!0,R0=n.x,ha=n.y,fa=Vt,ua=t,lt="tap"),n.down?(lt!=="drag"&&lt!=="hold"&&Math.hypot(n.x-R0,n.y-ha)>.012&&(lt="drag"),lt==="tap"&&t-ua>.35&&(lt="hold",u0.hit("noise",.2,{dur:2.5,cutoff:900}),u0.note(50,{dur:3.5,vel:.12,wave:"sine",attack:1})),lt==="drag"&&(Vt=Math.max(it-.45,Math.min(it+.45,fa-(n.x-R0)*2*Math.atan(yt))))):Wt&&(Wt=!1,lt==="tap"&&ma(),lt="");const s=Wt&&lt==="hold";ra=s?2.4:1,St+=(ra-St)*Math.min(1,o*(s?.45:.12)),h0+=((s?14:1)-h0)*Math.min(1,o*1.5),i0[0]+=D0[0]*o*h0,i0[1]+=D0[1]*o*h0,mt*=Math.exp(-o/3.2),f0[1]+=o*.006*(1+.6*mt),f0[0]+=o*ca*.02*mt,Gt+=(I0*(1+2.6*mt)+1.2*m0*mt-Gt)*Math.min(1,o*3),ia(t),_0+=o*(.25+Gt*25)*St*o0,_0>1+e()*2&&(_0=0,u0.note(88+(e()*12|0),{dur:.5,vel:.03+.03*e(),wave:"sine",pan:P*(.3+.4*e())}))}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
