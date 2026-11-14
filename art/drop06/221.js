// Car Wash: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/221.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Se){Se&&function(){"use strict";const De=new WeakMap,G=256,k=128,Zt=64,le=384,Kt=128,Y=420,Qt=300,ne=96,Ne=192,ke=96,ie=256,O=Math.PI,rt=(n,t,T)=>n<t?t:n>T?T:n,B=(n,t,T)=>{const d=rt((T-n)/(t-n),0,1);return d*d*(3-2*d)},A=`#version 300 es
precision highp int;
  void main(){ vec2 p=vec2(float((gl_VertexID&1)*2-1),float((gl_VertexID&2)-1)); gl_Position=vec4(p,0.,1.); }`,L=`#version 300 es
precision highp int;
  precision highp float; precision highp sampler2D;
  out vec4 o;
  `,At=`
  vec3 dec(vec3 x){ vec3 y=x*x; return y/(1.0005-y); }
  vec3 ENC(vec3 c){ return sqrt(c/(1.+c)); }
  vec3 TM(vec3 c){ c=c*(1.+c/14.)/(1.+c); return pow(c,vec3(.4545)); }
  `,mo=L+`
  uniform sampler2D tR;
  float vn(vec2 p,float seed){ float v=0., a=.5, sum=0., fq=4.;
    for(int i=0;i<5;i++){ vec2 g=p*fq, c=floor(g), f=g-c; vec2 w=f*f*f*(f*(f*6.-15.)+10.); float r=0.;
      for(int k=0;k<4;k++){ vec2 o_=vec2(float(k&1),float(k>>1)); vec2 ci=mod(c+o_,fq); vec2 h=textureLod(tR,(ci+vec2(seed,seed*1.7)+.5)/128.,0.).xy; float an=(h.x+h.y*.0037)*6.2831853*3.;
        vec2 gr=vec2(cos(an),sin(an)); float d=dot(gr,f-o_); vec2 wx=mix(1.-w,w,o_); r+=d*wx.x*wx.y; }
      v+=a*r; sum+=a; a*=.53; fq*=2.; }
    return v/sum*1.75+.5; }
  void main(){ vec2 p=gl_FragCoord.xy/256.;
    float a=vn(p,0.), b=vn(p,41.);
    float e=2./256.; float c0=vn(p,83.), cx=vn(p+vec2(e,0.),83.), cy=vn(p+vec2(0.,e),83.);
    o=vec4(clamp(a,0.,1.),clamp(b,0.,1.),clamp((cx-c0)*7.+.5,0.,1.),clamp((cy-c0)*7.+.5,0.,1.)); }`,uo=L+`
  uniform sampler2D tR; uniform int uZ;
  void main(){ vec2 p=gl_FragCoord.xy/512.; vec4 r=vec4(0.);
    for(int k=0;k<2+uZ;k++){ float fq=k==0?58.:150.; vec2 g=p*fq, c=floor(g); float d1=9.,d2=9.; vec2 best=vec2(0.); float id=0., wb=1.;
      for(int j=-2;j<=2+uZ;j++) for(int i=-2;i<=2+uZ;i++){ vec2 n=c+vec2(i,j); vec2 mn=mod(n,fq); vec4 h=textureLod(tR,(vec2(mn.x*3.+mn.y*17.,mn.y*5.+mn.x*11.)+.5)/128.+float(k)*vec2(.3671875,.1953125),0.);
        vec2 q=n+.5+(h.rg-.5)*1.25-g; float w=.42+1.5*h.b*h.b; float d=length(q)-w*.55;
        if(d<d1){d2=d1;d1=d;best=q/max(w,.1);id=h.a;wb=w;} else if(d<d2){d2=d;} }
      float bord=clamp((.03-d1)/.22,0.,1.)*clamp((d2-d1)*5.,0.,1.);
      if(k==0){ r.r=bord; r.g=id; float z=length(best+vec2(.13,.16)); r.a=smoothstep(.2,.03,z)*smoothstep(.0,.2,bord); } else r.b=bord; }
    o=r; }`,vo=L+`
  uniform sampler2D tR; uniform int uZ;
  void main(){ vec2 p=gl_FragCoord.xy/512.; float H=0.;
    for(int k=0;k<3+uZ;k++){ float fq=k==0?7.:(k==1?19.:47.); vec2 g=p*fq, c=floor(g); float best=0., sm=0.;
      for(int j=-2;j<=2+uZ;j++) for(int i=-2;i<=2+uZ;i++){ vec2 n=c+vec2(i,j); vec4 h=textureLod(tR,(mod(n,fq)*3.+.5)/128.+float(k)*.19+.003,0.);
        float rad=.55+.75*h.b; vec2 q=(g-(n+.5+(h.rg-.5)*.9))/rad; float d=dot(q,q); float dome=sqrt(max(1.-d,0.))*rad*(.6+.5*h.a);
        sm+=exp(9.*dome)-1.; }
      float v=log(1.+sm)/9.; H+=v*(k==0?.56:(k==1?.31:.13)); }
    o=vec4(H*.72); }`,xo=L+`
  uniform sampler2D tR;
  void main(){ vec2 p=gl_FragCoord.xy/512.; float e=1./512.; float h=textureLod(tR,p,0.).r;
    float hx=textureLod(tR,p+vec2(e,0.),0.).r-textureLod(tR,p-vec2(e,0.),0.).r, hy=textureLod(tR,p+vec2(0.,e),0.).r-textureLod(tR,p-vec2(0.,e),0.).r;
    o=vec4(clamp(vec2(hx,hy)*9.+.5,0.,1.),h,1.); }`,bo=L+`
  uniform sampler2D tR; uniform int uZ;
  void main(){ vec2 p=gl_FragCoord.xy/512.; vec4 r=vec4(.5,.5,0.,1.); float best=-1.;
    for(int k=0;k<2+uZ;k++){ float fq=k==0?29.:67.; vec2 g=p*fq, c=floor(g);
      for(int j=-2;j<=2+uZ;j++) for(int i=-2;i<=2+uZ;i++){ vec2 n=c+vec2(i,j); vec4 h=textureLod(tR,(mod(n,fq)*2.+.5)/128.+.11+float(k)*.23,0.);
        float rad=mix(.07,.62,h.b*h.b*h.b)*step(.18,h.g+float(1-k)); vec2 q=(g-(n+.5+(h.rg-.5)*1.9))/max(rad,.001); q.y*=.92+.3*h.g; float d=dot(q,q);
        if(d<1. && (1.-d)*rad>best){ best=(1.-d)*rad; float z=sqrt(1.-d); r=vec4(q*.5+.5,z,mix(.04,.75,h.a)); } } }
    o=r; }`,go=L+`
  uniform sampler2D tN; uniform vec4 U[4];
  float box(vec2 p,vec2 c,vec2 b,float r,float a){ p-=c; float s=sin(a),k=cos(a); p=vec2(k*p.x+s*p.y,-s*p.x+k*p.y); vec2 q=abs(p)-b+r; return length(max(q,0.))+min(max(q.x,q.y),0.)-r; }
  void main(){ vec2 p=gl_FragCoord.xy/1024.; if(U[3].x>.5) p.x=1.-p.x;
    float dashY=U[0].x, humpX=U[0].y, humpH=U[0].z, lean=U[0].w;
    vec4 nz=textureLod(tN,p*1.3,0.); vec4 nf=textureLod(tN,p*19.,0.);
    float grain=nf.r*.6+textureLod(tN,p*67.,0.).g*.4;
    float xP=-.03+lean*pow(max(p.y,0.),1.25);
    float yD=dashY-humpH*exp(-pow((p.x-humpX)/.2,2.))-.03*(p.x-.5);
    float yH=.006+.012*p.x+.004*sin(p.x*3.);
    float dP=p.x-xP, dD=yD-p.y, dH=p.y-yH;
    float glass=min(min(dP,dD),dH);
    // the ceramic band is only the last few millimetres, out of focus and fading, with no printed dots
    float frit=1.-smoothstep(.003,.012,glass);
    float R=.002+.004*grain, G=0., A=frit;
    // the mirror, its glass holding a dim smear of the tunnel behind
    float mir=box(p,U[1].xy,U[1].zw,.016,-.035);
    float stalk=box(p,vec2(U[1].x+.02,U[1].y*.5),vec2(.012,U[1].y*.55),.008,.05);
    float ms=1.-smoothstep(-.011,.011,mir), ss=1.-smoothstep(-.012,.012,stalk);
    float mIn=1.-smoothstep(-.03,-.008,mir);
    A=max(A,max(ms,ss)); R=mix(R,.012,max(ms,ss));
    float mgl=mIn*(.016+.1*exp(-pow((p.x-U[1].x-.06)/.07,2.)-pow((p.y-U[1].y+.008)/.022,2.))+.05*exp(-pow((p.x-U[1].x+.09)/.04,2.)-pow((p.y-U[1].y-.01)/.03,2.)));
    G=max(G,mgl);
    G=max(G,.022*(1.-smoothstep(0.,.008,abs(mir+.004))));
    // headlining and visor
    float hs=1.-smoothstep(-.008,.008,dH); A=max(A,hs); R=mix(R,.015+.012*grain,hs);
    // pillar: a soft trim, lit along the edge beside the glass
    float ps=1.-smoothstep(-.005,.005,dP); float pr=clamp(-dP/.13,0.,1.);
    A=max(A,ps); float pv=(.012+.09*exp(-pr*6.5)*(.55+.45*smoothstep(0.,.6,p.y)))*(.75+.5*grain);
    R=mix(R,pv,ps);
    // dash: leatherette catching the light through the glass, brightest at the far edge
    float ds=1.-smoothstep(-.004,.004,dD); float dr=clamp(-dD/.14,0.,1.);
    float dv=(.006+.05*exp(-dr*8.)*(.6+.8*nz.g))*(.55+.9*grain);
    float vent=smoothstep(.4,.46,p.x)*smoothstep(.97,.9,p.x)*(1.-smoothstep(.003,.012,abs(dD+.034)));
    dv*=1.-.55*vent;
    A=max(A,ds); R=mix(R,dv,ds);
    float hump=exp(-pow((p.x-humpX)/.21,2.))*(1.-smoothstep(0.,.02,abs(dD+.004)));
    G=max(G,ds*hump*.11);
    // wheel, near the lens and so out of focus
    vec2 wc=U[2].xy; float wr=length(p-wc)-U[2].z; float ws=1.-smoothstep(U[2].w-.016,U[2].w+.016,abs(wr));
    float wl=(.012+.075*smoothstep(U[2].w,-U[2].w,wr-U[2].w*.3)*smoothstep(.0,.3,p.x+.05))*(.8+.4*nz.r);
    A=max(A,ws); R=mix(R,wl,ws);
    G=mix(G,exp(-pow((wr-U[2].w*.72)/.012,2.))*.12*smoothstep(.0,.35,p.x)*smoothstep(.72,.2,p.x),ws);
    // the inner face of the glass: dust, a wiped arc from a cloth, the dash reflected
    float dust=pow(textureLod(tN,p*5.3,0.).g,3.)*.8+pow(textureLod(tN,p*31.,0.).r,6.)*3.;
    vec2 wa=p-vec2(.62,1.02); float arc=exp(-pow((length(wa)-.56)/.13,2.))*smoothstep(.35,.7,nz.r)*(.8+.2*sin(length(wa)*140.+nz.g*18.));
    float refl=smoothstep(.56,.88,p.y)*(.35+.45*textureLod(tN,vec2(p.x*1.2,p.y*.2),0.).r);
    float B=clamp(.05+.40*dust+.5*arc+.3*refl,0.,1.);
    // a stone chip, rare
    if(U[3].y>.5){ vec2 c=p-vec2(.70,.47); float ch=0.; float an=atan(c.y,c.x), rr=length(c);
      float ray=abs(fract(an*1.273+.13+.18*sin(an*3.))-.5); ch=(1.-smoothstep(.0,.03,ray*rr*9.))*smoothstep(.052,.0,rr*(1.+1.5*fract(floor(an*1.273)*.37)));
      ch=max(ch,smoothstep(.0085,.004,rr)); B=clamp(B+ch*.8,0.,1.); }
    o=vec4(R*4.,G,B,A); }`,wo=L+`
  uniform sampler2D tN; uniform vec4 U[2];
  float ring(vec2 q,vec2 c,float r,float w){ return exp(-pow((length(q-c)-r)/w,2.)); }
  void main(){ vec2 p=gl_FragCoord.xy/${ie}.; if(U[1].x>.5) p.x=1.-p.x;
    vec2 rc=U[0].xy, ic=U[0].zw; vec2 q=vec2(p.x,p.y); vec4 n=textureLod(tN,p*1.7+.2,0.);
    vec2 w=(q-rc)*vec2(1.,1.5); float hood=exp(-dot(w,w)/.016);
    float dial=ring(q,rc+vec2(-.062,.0),.042,.03)+ring(q,rc+vec2(.062,.004),.042,.03);
    float tell=exp(-dot(q-rc-vec2(.0,.03),q-rc-vec2(.0,.03))/.0005);
    vec3 c=vec3(1.,.60,.26)*(hood*.012+dial*.006)+vec3(.55,.82,1.)*(hood*.004+tell*.004);
    c*=.75+.5*n.r;
    float dashR=smoothstep(U[1].y-.33,U[1].y-.03,p.y)*(1.-smoothstep(U[1].y-.02,U[1].y+.01,p.y))*(.3+.7*n.g);
    c+=vec3(.012,.013,.016)*dashR;
    vec2 g=(q-ic)*vec2(1.,1.5); float glo=exp(-dot(g,g)/.008);
    o=vec4(c*5.,clamp(glo*.6,0.,1.)); }`,yo=L+`
  uniform sampler2D tN; uniform vec4 U[3];
  void main(){ vec2 p=gl_FragCoord.xy/${G}.; float cov=U[0].x; vec2 sd=U[0].yz;
    // U[2].y the form: 0 hangs from the top, 1 has slumped onto the blades (its top edge rolled and lobed), 2 is cut by lanes
    float slump=step(.5,U[2].y)*step(U[2].y,1.5), py=mix(p.y,1.-p.y,slump);
    // the edge is a field in x and y, not a profile along x: its rows are read at an x bent by the pixel's own height, and a
    // blob of 2D noise moves it, so tongues end in round heads, the gaps between them close in round arches and no side is plumb
    vec2 mq=vec2(p.x*2.1+sd.y,p.y*1.4+sd.x); vec4 nm=(textureLod(tN,mq+vec2(.02,.01),0.)+textureLod(tN,mq-vec2(.02,.01),0.)+textureLod(tN,mq+vec2(-.01,.02),0.)+textureLod(tN,mq-vec2(-.01,.02),0.))*.25; float x=p.x+.06*(nm.r-.5);
    vec4 n=textureLod(tN,p*.55+sd,0.), n2=textureLod(tN,vec2(x*2.3,p.y*.9)+sd*2.,0.), n3=textureLod(tN,p*5.+sd*3.,0.), n4=textureLod(tN,vec2(x*1.1+sd.y,.37),0.), n5=(textureLod(tN,vec2(x*1.9+sd.x-.035,.71),0.)+textureLod(tN,vec2(x*1.9+sd.x,.71),0.)+textureLod(tN,vec2(x*1.9+sd.x+.035,.71),0.))/3.;
    // the lower edge of the sheet thins out over a long way and hangs in drains; it is not a cut line
    float tg=clamp((n5.r-.33)/.4,0.,1.); float tongue=tg*(.55+.45*tg)*.24*(1.-.75*slump);
    float edge=cov+.26*(n4.g-.5)*(1.-.4*slump)+.30*(x-.5)*U[0].w+tongue+.11*(nm.g-.5)*(1.+slump)+.04*(n3.r-.5);
    float body=1.-smoothstep(edge-.24+.16*slump,edge+.03,py);
    float wf=n2.g*.42+n.r*.72-.03+(.4-py)*.22+(cov-.6)*.5;
    float win=smoothstep(mix(.06,.2,U[1].z),mix(.3,.47,U[1].z),wf); // the rinse mints keep the old, more open lather
    float mass=.30+.62*n.g*n.g+.2*n3.g;
    float grow=smoothstep(edge-.6,edge-.08,py);
    float head=exp(-pow((py-edge+.1)/.08,2.))*(.35+.6*n2.r);
    float F=body*win*mass*(.42+.5*grow+.5*n2.g*n3.g)+head*body*win*.55;
    float streak=textureLod(tN,vec2(x*2.9+sd.y,p.y*.17+sd.x),0.).r; float veil=1.-smoothstep(edge-.02,edge+.26+.12*n2.g,py); F+=(.02+.07*streak*streak)*veil*smoothstep(.1,.4,wf);
    // lanes: running water has cut three to six wandering clear strips from top to bottom
    float ln=fract(x*(3.+2.*sd.x)+(n2.r-.5)*.55+(n.g-.5)*.3+sd.y*3.); F*=1.-step(1.5,U[2].y)*(1.-smoothstep(.07,.11,abs(ln-.5)+.03*(n3.g-.5)));
    // drowned glass is never total: two or three thin places where a lamp comes through hard
    F*=1.-U[2].z*.9*smoothstep(.58,.7,n.r*.75+n2.g*.35);
    float us=x*U[1].x+.2*p.y+.5*(n.g-.5)+.12*(n3.r-.5)+U[1].y; float q=fract(us)*3.;
    float w1=smoothstep(.0,.4,q)*(1.-smoothstep(.6,1.,q)), w2=smoothstep(1.,1.4,q)*(1.-smoothstep(1.6,2.,q));
    float riv=smoothstep(.60,.70,textureLod(tN,vec2(x*7.3+sd.x,p.y*.3+sd.y),0.).r);
    o=vec4(F,.006+.02*pow(n3.r,3.)*step(p.y,.985)+.007*riv+U[2].x*(.75+.5*streak),F*w1,F*w2); }`,Uo=L+`
  uniform sampler2D tA,tN,tM,tL; uniform vec4 U[9];
  const float TX=1./${G}., PI=3.14159265, TAU=6.2831853;
  const vec2 D[4]=vec2[4](vec2(1.,0.),vec2(-1.,0.),vec2(0.,1.),vec2(0.,-1.));
  float mob(float F,float W,float y){ float e=max(F-y,0.); return min(.6,U[7].z*e*e*(1.+11.*W)); }
  void main(){ vec2 p=gl_FragCoord.xy*TX; vec4 C=textureLod(tA,p,0.); float t=U[1].z, K=U[5].w;
    vec4 n=textureLod(tN,p*.8+U[1].w,0.), n2=textureLod(tN,p*vec2(4.,2.)+U[1].w,0.);
    float y0=.07+.26*n.r*n.r+.05*n2.g;
    float mc=mob(C.r,C.g,y0);
    float m=U[6].x>0.?textureLod(tM,p,0.).r:0.;
    float wind=U[1].y*exp(-pow((p.y-U[1].x)/.16,2.));
    vec2 fan=normalize(p-vec2(.5,1.42)); vec2 g=vec2((n2.b-.5)*1.6,1.)+U[6].yz*m*6.+(fan*5.+vec2((n.g-.5)*1.6,0.))*wind;
    vec3 S=C.rba;
    for(int i=0;i<4;i++){ vec4 nb=textureLod(tA,p+D[i]*TX,0.);
      float gd=dot(g,D[i]), mn=mob(nb.r,nb.g,y0); float mm=(gd>0.?mc:mn)+m*.4+wind*.6*min(gd>0.?C.r:nb.r,1.);
      vec2 fp=p+D[i]*TX*.5; float open=1.;
      for(int b=0;b<2;b++){ vec4 PR=U[3+b]; vec2 q=(fp-PR.xy)*vec2(1.,K); float th=U[2][b*2+1]; vec2 e=vec2(cos(th),sin(th));
        float al=dot(q,e), cr=dot(q,vec2(-e.y,e.x));
        if(PR.w>PR.z && al>PR.z && al<PR.w && abs(cr)<1.1*TX) open=0.; }
      float ug=clamp(gd*mm,-.30,.30)*open, fd=.2*(C.r-nb.r)*min((.5*(mc+mn)+.1*step(.1,mc))/.5,1.)*open;
      vec3 up=ug>0.?C.rba:nb.rba, ud=fd>0.?C.rba:nb.rba; S-=ug*up+fd*ud/max(ud.x,1e-3); }
    // water jumps down its channels; the thicker the film, the more of it leaves each step
    float W=C.g; vec2 J=vec2((n.a-.5)*14.+(n2.a-.5)*5.,2.3+2.1*n2.r)*(1.-min(wind*1.6,1.))+(fan*(5.8+2.8*n2.r)+vec2((n2.g-.5)*2.4,0.))*min(wind*1.6,1.);
    float inW=textureLod(tA,p-J*TX,0.).g;
    float qC=clamp(W*W*150.+max(W-.018,0.)*7.+wind*1.2,0.,.96), qN=clamp(inW*inW*150.+max(inW-.018,0.)*7.+wind*1.2,0.,.96);
    W=W*(1.-qC)+inW*qN;
    W*=.99975;
    W+=.00045*C.r*step(.02,C.r);
    W+=.0007*smoothstep(.70,.76,textureLod(tN,vec2(p.x*5.3+U[1].w,p.y*.3+t*.021),0.).g);
    // bubbles burst in patches where the foam has drained thin, so holes open and spread
    float hn=textureLod(tN,p*vec2(3.1,1.7)+vec2(U[1].w,t*.0045),0.).g; float burst=.008*smoothstep(.64,.78,hn)*smoothstep(.42,.08,C.r); S*=1.-burst;
    // water eats foam, the foam goes thin and milky
    float er=clamp(.045*smoothstep(.03,.17,W)*U[7].w*(1.-.85*smoothstep(.1,.4,C.r)*clamp(2.-U[7].w,0.,1.)),0.,.5); S*=1.-er; W+=er*C.r*.2;
    // arches, which rise up the glass as the car moves forward under them
    // (the band is bent by the noise already read, the nozzles' fans are soft and sway, and spatter lands ahead of the front)
    float bend=(n.g-.5)*.16+(n2.r-.5)*.07;
    if(U[0].y>0.){ float b=exp(-pow((p.y-U[0].x-bend)/(.04+.05*n2.b),2.)); float jn=textureLod(tN,vec2(p.x*.83+U[1].w+.05*sin(t*.6+p.y*7.),t*.021+p.y*.35),0.).g; float jets=smoothstep(.30,.66,jn+(n2.g-.5)*.35);
      float spl=smoothstep(.68,.8,n2.g*.6+n.b*.6)*exp(-pow((p.y-U[0].x-bend+.13)/.09,2.));
      float dF=U[0].y*(b*jets+spl*.7)*.11;
      float us=p.x*U[6].w+.28*p.y+.9*(n.g-.5)+U[8].x; float q=fract(us)*3.;
      float w1=smoothstep(0.,.14,q)*(1.-smoothstep(.86,1.,q)), w2=smoothstep(1.,1.14,q)*(1.-smoothstep(1.86,2.,q));
      S+=vec3(dF,dF*w1,dF*w2); W+=dF*.05; }
    if(U[0].w>0.){ float b=exp(-pow((p.y-U[0].z-bend*1.3)/(.05+.06*n2.b),2.)); float jn=textureLod(tN,vec2(p.x*.77+.3+(n.r-.5)*.25,t*.05+p.y*.4),0.).r; W+=U[0].w*b*(.5+.7*smoothstep(.3,.7,jn))*.05; }
    // roller strips: they carry off foam, wet the glass and lay a thin streak back down
    if(U[6].x>0.){ float st=textureLod(tN,vec2(p.x*(.61+1.3*n.r)+p.y*.07,p.y*.21+t*.17),0.).r; float keep=.03+.42*st*st; float over=max(C.r-keep,0.)*.03*m; S*=1.-over/max(C.r,1e-3); W+=.0011*m; }
    // blades
    if(U[5].x>0.||U[5].y>0.) for(int i=0;i<2;i++){ vec4 PR=U[3+i];
      if(PR.w>PR.z){ vec2 q=(p-PR.xy)*vec2(1.,K); float r=length(q), s=(r-PR.z)/(PR.w-PR.z);
        if(s>-.03&&s<1.03){ float thp=U[2][i*2], thn=U[2][i*2+1]; float mid=.5*(thp+thn), hf=.5*abs(thn-thp);
          float a=atan(q.y,q.x); float da=mod(a-mid+PI,TAU)-PI;
          float wedge=U[5].x*(1.-smoothstep(0.,2.*TX,(abs(da)-hf)*r))*smoothstep(-.03,0.,s)*(1.-smoothstep(1.,1.03,s));
          vec4 lo=textureLod(tL,vec2(s,(float(i)+.5)*.5),0.);
          float st=textureLod(tN,vec2(s*2.1+float(i)*.37,.31),0.).g, st2=textureLod(tN,vec2(s*11.+float(i)*.21,.77),0.).r;
          float ch=textureLod(tN,vec2(a*3.3,.53),0.).r;
          float res=U[5].z*(.25+1.5*smoothstep(.45,.8,st)+2.5*smoothstep(.58,.8,st2)+U[8].y*7.*smoothstep(.5,.72,ch));
          res=clamp(res,0.,.95);
          S*=mix(1.,res,wedge); W*=mix(1.,clamp(res*1.6+.03,0.,1.),wedge);
          float sm=wedge*min(lo.r*2.5,.05)*(.35+1.3*st2)*(.3+7.*U[5].z); float lr=lo.r>.0005?1./lo.r:0.;
          S+=vec3(sm,sm*lo.g*lr,sm*lo.b*lr);
          if(U[5].y>0.){ float d2=(mod(a-thn+PI,TAU)-PI)*r*U[8][2+i]; float w=.006+.25*sqrt(lo.r);
            float band=smoothstep(-.006,.0,d2)*exp(-pow(max(d2,0.)/w,2.))/(w*1.77);
            S+=lo.rgb*band; W+=lo.a*band; } } } }
    S.x=max(S.x,0.); S.y=clamp(S.y,0.,S.x); S.z=clamp(S.z,0.,max(S.x-S.y,0.));
    if(p.y<TX*1.5) S*=.0;
    o=vec4(min(S.x,3.),clamp(W,0.,1.),S.y,S.z); }`,Ro=L+`
  uniform sampler2D tA,tL; uniform vec4 U[6];
  void main(){ float s=gl_FragCoord.x/${Zt}.; int i=int(gl_FragCoord.y); vec4 PR=U[3+i]; float K=U[5].w, r=PR.z+s*(PR.w-PR.z);
    float thp=U[2][i*2], thn=U[2][i*2+1], v=(float(i)+.5)*.5, tx=1./${Zt}.;
    vec4 c=textureLod(tL,vec2(s,v),0.), a=textureLod(tL,vec2(s-tx,v),0.), b=textureLod(tL,vec2(s+tx,v),0.);
    vec4 L=mix(c,.5*(a+b),.22)*.84+a*.08+c*.08; L*=1.-.006*smoothstep(.93,1.,s);
    vec4 g=vec4(0.);
    if(U[5].x>0.) for(int k=0;k<6;k++){ float th=mix(thp,thn,(float(k)+.5)/6.); vec2 pt=PR.xy+r*vec2(cos(th),sin(th)/K); vec4 S=textureLod(tA,pt,0.); g+=vec4(S.r,S.b,S.a,S.g); }
    L+=g/6.*r*abs(thn-thp)*U[5].x*(1.-U[5].z*2.);
    L*=.9985;
    if(U[5].y>0.) L*=0.;
    o=PR.w>PR.z?L:vec4(0.); }`,Lo=L+`
  uniform sampler2D tA,tN,tB; uniform vec4 U[1];
  void main(){ vec2 p=gl_FragCoord.xy/${k}.; vec4 C=textureLod(tA,p,0.); vec4 n=textureLod(tN,p*vec2(4.,2.)+U[0].x,0.), n0=textureLod(tN,p*.8+U[0].x,0.);
    float y0=.07+.26*n0.r*n0.r+.05*n.g; float e=max(C.r-y0,0.); float mo=min(.3,U[0].y*e*e*(1.+11.*C.g));
    vec2 v=vec2((n.b-.5)*1.6,1.)*min(mo,.3)/${G}.;
    vec2 uv=textureLod(tB,p-v,0.).rg;
    uv=mix(uv,p,.02); o=vec4(mix(uv,p,step(C.r,.006)),0.,1.); }`,To=L+`
  uniform sampler2D tA;
  void main(){ vec2 p=gl_FragCoord.xy/${G}.; float e=1./${G}.;
    float a=textureLod(tA,p+vec2(e,0.),0.).g, b=textureLod(tA,p-vec2(e,0.),0.).g, c=textureLod(tA,p+vec2(0.,e),0.).g, d=textureLod(tA,p-vec2(0.,e),0.).g;
    float q=7.*e, m=.75; float fx=0., fy=0.;
    for(int i=0;i<2;i++){ float k=float(i)+1.; float z=k*q*.5; fx+=(min(textureLod(tA,p+vec2(z,0.),0.).r,m)-min(textureLod(tA,p-vec2(z,0.),0.).r,m))/k; fy+=(min(textureLod(tA,p+vec2(0.,z),0.).r,m)-min(textureLod(tA,p-vec2(0.,z),0.).r,m))/k; }
    o=vec4(vec2(fx,fy)*8.,vec2(a-b,c-d)*${(G/2).toFixed(1)}); }`,Fo=L+`
  uniform sampler2D tN; uniform vec4 U[10];
  void main(){ vec2 p=gl_FragCoord.xy/${le}.; float zc=U[0].x, tm=U[0].y; vec2 vp=U[0].zw; vec3 tubeC=U[1].rgb, ledC=U[2].rgb, sod=U[7].rgb; float mist=U[1].w;
    vec3 d=vec3(p.x-vp.x,-(p.y-vp.y),.62), or_=vec3(U[2].w,0.,0.);
    const float W=1.35, HC=1.05, HF=.72, END=26.;
    float tx=(sign(d.x)*W-or_.x)/d.x, ty=(d.y>0.?HC:-HF)/d.y, T=min(min(tx,ty),END); vec3 P=or_+d*T; float zw=P.z+zc;
    vec3 col=vec3(0.);
    float sW=.035+.012*T, eW=.07/(.07+sW);
    float mouth=step(END-.001,T), isCeil=(1.-mouth)*step(ty,tx)*step(0.,d.y), isFloor=(1.-mouth)*step(ty,tx)*step(d.y,0.), isWall=(1.-mouth)*step(tx,ty);
    // white tubes in two broken rows on the ceiling, soft bars because the lens is focused on the glass
    float xr=abs(abs(P.x)-.52); float per=1.95, ci=floor(zw/per); float jit=textureLod(tN,vec2(ci*.137,.21),0.).g; float zr=abs(zw-(ci+.5+.5*(jit-.5))*per);
    float on=step(.24,jit);
    float tubeL=exp(-pow(xr/sW,2.))*(1.-smoothstep(.56-sW,.56+sW*1.8,zr))*on;
    vec4 ns=textureLod(tN,vec2(zw*.055,P.y*.035+P.x*.03),0.);
    col+=isCeil*(tubeC*tubeL*6.*eW+tubeC*.0035*(.5+ns.r)+tubeC*.012*exp(-pow(xr/.5,2.)));
    // the wet bay wall: ribbed panels, seams, runoff, tubes smeared along a gloss band, sodium bulkheads with long wet reflections
    float seam=abs(fract(zw/2.27+.1*sin(zw*.31))-.5)*2.27; float sm=smoothstep(.015+sW*.2,.05+sW*.6,seam);
    float streak=textureLod(tN,vec2(zw*.21,P.y*.021),0.).g; float streak2=textureLod(tN,vec2(zw*.93,P.y*.05),0.).r;
    float fall=exp(-(HC-P.y)*.7);
    float rib=.72+.28*cos(zw*23.)*exp(-T*.45);
    float refl=exp(-pow((P.y-.42-.12*(ns.g-.5))/(.2+.02*T),2.));
    float tz=abs(fract(zw/per+.5*(ns.r-.5)*.3)-.5)*per; float bandL=refl*(1.-smoothstep(.45,.5+sW*9.,tz));
    vec3 wl=tubeC*((.008+.05*streak*streak)*fall*(.45+1.4*streak2)*sm*rib+bandL*.13*(.4+.9*streak2));
    float lz=abs(fract(zw/3.1+.31)-.5)*3.1; float lyy=P.y-.68; float ls=(.13+.028*T);
    float lamp=exp(-(lz*lz+lyy*lyy)/(ls*ls));
    float lhal=exp(-(lz*lz+lyy*lyy)/(.9+ls*ls*3.));
    float lwet=exp(-pow(lz/(.2+.02*T),2.))*(1.-smoothstep(.55,.72,P.y))*exp(-(.6-P.y)*.45)*(.35+1.1*streak2)*(.5+streak);
    wl+=sod*(lamp*4.5+lhal*.08+lwet*.34);
    float ledy=abs(P.y+.18); wl+=ledC*exp(-pow(ledy/(.02+sW*.35),2.))*.10*(.75+.4*ns.g);
    float low=smoothstep(-.1,.28,P.y); wl*=.32+.68*low;
    col+=isWall*wl;
    // the floor: wet, mirrors the tubes and the wall lamps
    vec3 Q=or_+d*(T+ (HC/max(-d.y,1e-3))); float zq=Q.z+zc; vec2 rp=textureLod(tN,vec2(zw*.12,P.x*.11),0.).ba-.5;
    float xq=abs(abs(Q.x+rp.x*.5)-.52); float cq=floor((zq+rp.y*2.)/per); float jq=textureLod(tN,vec2(cq*.137,.21),0.).g; float zrq=abs(zq+rp.y*2.-(cq+.5+.5*(jq-.5))*per);
    float frs=.08+.8*pow(1.-clamp(-d.y/length(d)*2.4,0.,1.),4.);
    float rail=smoothstep(.02,.05+sW*.3,abs(abs(P.x-.0)-.42));
    vec3 fl=tubeC*exp(-pow(xq/(sW*2.2),2.))*(1.-smoothstep(.3,1.3,zrq))*step(.24,jq)*.9*frs+tubeC*.003*(.4+ns.g);
    fl*=rail; fl+=sod*.035*exp(-pow((abs(P.x)-1.25)/.22,2.))*(.2+1.4*ns.r*ns.g);
    col+=isFloor*fl;
    // the far end: the forecourt at night through the door, not a glowing rectangle
    float hz=exp(-pow((p.y-vp.y-.008)/.012,2.));
    vec2 mq=p-vp; float lampM=exp(-dot(mq-vec2(.018,-.012),mq-vec2(.018,-.012))/.00012)*1.2+exp(-dot(mq-vec2(-.028,.0),mq-vec2(-.028,.0))/.00006)*.6;
    col+=mouth*(vec3(.012,.016,.03)+sod*lampM+vec3(.8,.85,1.)*hz*.03);
    // by the door, the signal: red while the car is held, green otherwise
    vec2 sq=mq-vec2(-.04,.03); col+=mouth*mix(vec3(.08,1.,.35),vec3(1.,.1,.05),U[9].y)*(exp(-dot(sq,sq)/.000015)*1.4+exp(-dot(sq,sq)/.0004)*.06);
    // the stations ahead, the ones the programme brings to the glass next (G.x is the distance plus 16 times the kind):
    // 0 an arch of nozzles with its light strip, 1 a curtain of cloth strips, 2 a pair of wrap columns, 3 a bank of blowers
    for(int i=0;i<int(U[9].x);i++){ vec4 G=U[i<3?3+i:8]; float kd=floor(G.x/16.), g=G.x-kd*16.; if(g>.02&&g<T){ vec3 H=or_+d*g; float sf=.02+.016*g, eL=.03/(.03+sf);
        vec4 sn=textureLod(tN,vec2(H.x*(kd==1.?1.7:.21)+tm*.004*kd,g*.01+H.y*.05*kd),0.);
        float mm=max(max(abs(H.x)-W+.2,H.y-HC+.26),-1.), ring=0., rim=0.; vec3 gc=vec3(.010);
        if(kd<.5){ ring=smoothstep(-sf,sf,mm); gc+=tubeC*.03*(.5+.5*sin(H.y*38.))*exp(-g*.2);
          float ln=exp(-pow(mm/(.018+sf),2.))*eL*smoothstep(.2,.55,H.y); float noz=(.25+.75*smoothstep(.2,.8,sin(H.x*11.+2.*sin(H.x*3.))))*(.5+.5*smoothstep(.45,.6,sn.r));
          col+=G.yzw*(ln*noz*.7+.012*exp(-abs(mm)/.35)*smoothstep(-.5,.5,H.y)); }
        else if(kd<1.5){ float yl=.08+.22*sn.r+.05*sin(tm*1.3+H.x*2.3); float e=H.y-yl;
          ring=smoothstep(-sf,sf,e)*step(abs(H.x),W)*(.8+.2*sin(H.x*47.+sn.g*9.)); rim=exp(-pow((H.y-HC+.05)/.25,2.));
          gc=vec3(.008)+tubeC*.05*smoothstep(.2,1.,H.y)*(.6+.8*sn.g); }
        else if(kd<2.5){ float cx=abs(abs(H.x)-.84)-(.36+.1*(sn.r-.5)); float top=H.y-.9-.15*(sn.g-.5);
          ring=smoothstep(sf+.03,-sf-.03,max(cx,top)); rim=exp(-pow(cx/(.03+sf*.6),2.))*step(top,0.);
          gc=vec3(.009)+tubeC*.01*(.5+sn.g); }
        else { float cx=(floor(H.x*2.)+.5)*.5; float dd=length(vec2(H.x-cx,H.y-.6))-.19; float bar=abs(H.y-.86)-.1;
          ring=smoothstep(sf,-sf,min(dd,bar))*step(abs(H.x),1.); rim=exp(-pow(dd/(.02+sf*.8),2.))*step(abs(H.x),1.)*smoothstep(.45,.75,H.y);
          gc=vec3(.006); }
        col=mix(col,gc,ring); col+=tubeC*rim*.12*eL; } }
    // mist in the air, lit
    float nm=textureLod(tN,p*vec2(1.1,1.7)+vec2(tm*.012,-tm*.008),0.).r; float fog=1.-exp(-T*mist);
    col=mix(col,(tubeC*.014+sod*.012+ledC*.004)*(.2+1.3*nm),fog);
    col+=(tubeC*.0025+sod*.0025+ledC*.002+U[6].rgb*.05)*(.2+nm);
    // the top roller's drum and its dense inner strips, a soft dark mass
    if(abs(U[6].w)>.01){ float qd=U[6].w>0.?(p.y-U[7].w):(p.x-U[7].w); float q2=qd*qd/.029; float ext=exp(-q2*q2); col*=1.-.45*abs(U[6].w)*ext; }
    // the bonnet: a dark wet crown under the glass, mirroring the ceiling, soap sliding on it
    if(d.y<-.01){ const float YB=-.30; float Tb=YB/d.y; vec3 Bo=or_+d*Tb; float xb=Bo.x, crown=xb*xb*.16; float zf=.93-crown*1.5; float zb=Bo.z;
      float mask=(1.-smoothstep(zf-.03,zf+.03,zb))*(1.-smoothstep(.98,1.04,abs(xb)));
      if(mask>.001){ vec4 bn=textureLod(tN,vec2(xb*.31,zb*.27),0.); vec3 R=vec3(d.x+(bn.b-.5)*.09,-d.y,d.z); float Tr=(HC-YB)/(-d.y); vec3 Qb=Bo+R*Tr; float zr2=Qb.z+zc;
        float xr2=abs(abs(Qb.x)-.52), c2=floor(zr2/per), j2=textureLod(tN,vec2(c2*.137,.21),0.).g, zz2=abs(zr2-(c2+.5+.5*(j2-.5))*per);
        float refT=exp(-pow(xr2/.2,2.))*(1.-smoothstep(.2,1.25,zz2))*(.45+.55*step(.24,j2));
        float fr=.07+.75*pow(1.-clamp(-d.y/length(d)*2.,0.,1.),3.);
        float lzr=abs(fract(zr2/5.3+.31)-.5)*5.3; float refS=exp(-pow(lzr/.8,2.))*exp(-pow((abs(Qb.x)-1.3)/.4,2.));
        float soap=smoothstep(.56,.74,bn.g*.7+textureLod(tN,vec2(xb*1.3,zb*2.7),0.).r*.5);
        vec3 bc=vec3(.006)+(tubeC*refT*1.5+sod*refS*1.3)*fr*(.35+.9*bn.r)+tubeC*.06*fr;
        bc=mix(bc,(tubeC*.075+sod*.045)*(.5+bn.r),soap*.55);
        col=mix(col,bc,mask); } }
    vec3 y=col/(1.+col); o=vec4(sqrt(y),1.); }`,Ao=L+At+`
  uniform sampler2D tT; uniform vec4 U[1];
  void main(){ vec2 p=gl_FragCoord.xy/vec2(${Ne}.,${ke}.); vec2 dir=mix(vec2(0.,1.),normalize(p-vec2(.5,1.42)),U[0].x); vec3 s=vec3(0.); float ws=0.;
    for(int i=0;i<8;i++){ float k=(float(i)-3.5)/3.5; float w=1.-.8*k*k; s+=w*dec(textureLod(tT,clamp(p+dir*k*U[0].y,.002,.998),1.2).rgb); ws+=w; }
    o=vec4(ENC(s/ws),1.); }`,Eo=L+`
  uniform sampler2D tA;
  void main(){ vec2 p=gl_FragCoord.xy/${ne}.; vec4 s=vec4(0.); float e=5./${G}.;
    for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){ vec4 a=textureLod(tA,p+vec2(i,j)*e,0.); float k=min(1.,1.3/max(a.r,1e-3)); s+=vec4(a.r*k,a.g,a.b*k,a.a*k); }
    o=s/9.; }`,_o=`#version 300 es
precision highp int;
  uniform vec4 U[6]; out vec3 vL; out vec3 vI; out vec3 vS;
  float h1(float n){ uint x=uint(n*4099.+17.); x=(x^(x>>16u))*0x7feb352du; x=(x^(x>>15u))*0x846ca68bu; x=x^(x>>16u); return float(x&0xffffffu)/16777216.; }
  void main(){ const float N=${Qt}.; int j=gl_InstanceID; float sg=(j&1)==0?1.:-1., k=float((j+1)/2);
    float wt=U[0].x, ax=U[0].y, Yc=U[1].x, Zc=U[1].y, R=U[1].z, Ln=U[1].w;
    float kO=U[0].z; float idx=mod(kO+sg*k+N*4.,N);
    float phi=6.2831853*idx/N+wt;
    float a=h1(idx), b=h1(idx+.37), c=h1(idx+.71);
    float X=-.25+1.5*a;
    int row=gl_VertexID/2; float side=float(gl_VertexID&1)*2.-1.; float u=float(row)/10.;
    float L=Ln*(.62+.62*b), dl=L/10.;
    float zp=Zc+R*cos(phi), yp=Yc+R*sin(phi), dr=U[0].w>-1.?U[2].w:1.; float cont=0., ct=1., st=0.;
    float tflap=U[3].x;
    // walk the strip out from the drum; once it reaches the glass it lies flat and slides along it
    for(int i=0;i<row;i++){ float fu=float(i)/10.; float ang=phi-.9*fu+.16*sin(tflap*9.+idx*1.7+fu*3.)*fu; ct=cos(ang); st=sin(ang);
      float nz=zp+dl*ct; if(nz<=0.){ yp+=dl*dr*(.75+.25*abs(st)); zp=0.; cont=1.; } else { yp+=dl*st; zp=nz; } }
    float Z=zp; float contact=cont*(1.-smoothstep(0.,.02,Z));
    float w=(.011+.017*c)*(1.+.3*u);
    vec2 vp=U[2].xy; float pf=1./(1.+Z*.95);
    float blur=clamp(Z*.05,0.,.05)+ax*.007;
    float wv=X+(a-.5)*.03*u+.007*sin(u*5.+idx*2.3+tflap*2.)*u; vec2 pl=vec2(wv,yp); if(ax>.5) pl=vec2(yp,wv+(yp-Yc)*(c-.5)*.95); // a wrap brush's fingers fan out
    vec2 sd=ax>.5?vec2(0.,1.):vec2(1.,0.);
    vec2 s=vp+(pl-vp)*pf+sd*side*(w*pf+blur);
    float lit=clamp(.45+.55*(st*-.7+ct*.7),0.,1.);
    vL=vec3((side*.5+.5),u,lit);
    vI=vec3(a,b,idx/N);
    vS=vec3(contact,(w*pf)/(w*pf+blur),exp(-Z*.8));
    gl_Position=vec4(s.x*2.-1.,(1.-s.y*2.)*U[2].z,0.,1.); }`,zo=L+At+`
  in vec3 vL; in vec3 vI; in vec3 vS; uniform sampler2D tN; uniform vec4 U[6];
  void main(){ float xc=abs(vL.x*2.-1.); float sf=max(1.-vS.y,.3);
    float fib=textureLod(tN,vec2(vL.x*.95+vI.x*7.,vL.y*.05+vI.y),0.).r, fr=textureLod(tN,vec2(vL.x*.9+vI.y*5.,vL.y*.5+vI.x),0.).g;
    float a=1.-smoothstep(1.-sf,1.,xc+(fr-.5)*.22);
    a*=(1.-smoothstep(.3,1.,vL.y+(fr-.5)*.7+(fib-.5)*.4))*smoothstep(.0,.3,vL.y+(fr-.5)*.25+(vI.y-.5)*.12);
    // the mask: R every strip in contact (the simulation's), G the one finger in four that lies flat on the glass and is seen sharp
    if(U[4].w>.5){ o=vec4(vS.x*a,vS.x*a*step(.74,fract(vI.x*7.3+vI.y*3.1)),0.,0.); return; }
    a*=U[3].w;
    vec3 base=mix(U[4].rgb,U[5].rgb,step(.72,vI.y));
    float weave=.45+1.1*fib;
    float fold=.62+.38*cos(xc*1.55+vI.x*3.);
    float light=U[3].y*.85*(.2+.95*vL.z)*(.3+1.3*vI.x*vI.x);
    vec3 c=base*light*weave*fold;
    // wet: a long soft sheen near the top of the strip, the rest falls away into shadow
    c+=mix(vec3(.75,.85,1.),base*3.,.3)*U[3].y*.09*pow(fib,2.)*vL.z*fold*(1.-.6*vL.y)*(.4+1.2*vI.y);
    c+=vec3(.8,.86,1.)*.06*smoothstep(.35,.95,xc)*(1.-vL.y*.45)*(.35+1.1*vI.y);
    c*=mix(.45,1.,vS.z);
    c*=.5+.5*smoothstep(.0,.5,1.-vL.y);
    c*=mix(1.,.8,vS.x);
    c+=vec3(.8,.86,1.)*.3*U[3].y*vS.x*smoothstep(.7,.97,xc)*mix(1.,.33*smoothstep(.75,.9,vL.y),U[0].y);
    o=vec4(ENC(c)*a,a); }`,So=L+At+`
  uniform sampler2D tA,tD,tB,tT,tL,tBub,tBead,tLump,tN,tH,tS,tRf,tM; uniform vec4 U[12];
  void main(){ vec2 f=gl_FragCoord.xy/U[0].x; vec2 p=vec2(f.x,1.-f.y); float lod=U[0].y, K=U[5].w;
    vec2 uv=textureLod(tB,p,0.).rg;
    vec4 lb=textureLod(tLump,uv*.57+.61,lod+1.4);
    // the front is read through a small warp so no contour stays a clean line
    vec4 S=textureLod(tA,p+(lb.xy-.5)*.018,0.); vec4 G=textureLod(tD,p,0.); vec4 Hh=textureLod(tH,p,0.);
    float F=S.r, rid=0.; vec2 ruv=vec2(0.);
    for(int i=0;i<2;i++){ vec4 PR=U[3+i]; if(PR.w>PR.z){ vec2 q=(p-PR.xy)*vec2(1.,K); float th=U[2][i]; vec2 e=vec2(cos(th),sin(th)); float al=dot(q,e), cr=dot(q,vec2(-e.y,e.x))*U[2][2+i];
        float s=(al-PR.z)/(PR.w-PR.z);
        if(s>0.&&s<1.&&cr>-.012){ vec4 lo=textureLod(tL,vec2(s,(float(i)+.5)*.5),0.); float w=.006+.25*sqrt(lo.r); float h=lo.r/(w*1.77)*exp(-pow(max(cr,0.)/w,2.))*smoothstep(-.012,-.003,cr);
          F+=h; G.xy+=-vec2(-e.y,e.x)*U[2][2+i]*2.*h*max(cr,0.)/(w*w)*.35; rid+=h; ruv=vec2(al,cr); } } }
    if(rid>.01) uv=mix(uv,ruv*vec2(.7,1.)+.37,smoothstep(.01,.08,rid));
    // thickness at the scale light scatters over
    // (a small mass keeps its own edge: the blurred load adds only where there is lather, not a halo round it)
    float Fs=mix(F,min(Hh.r,1.3),.58*smoothstep(.0,.12,F));
    // where a roller strip lies on the glass (the contact mask the simulation reads) it is seen sharp through a thin film,
    // with squeezed lather piled along its side
    float mC=smoothstep(.2,.6,textureLod(tM,p,0.).g)*U[0].w, mR=clamp(textureLod(tM,p+vec2(.012,-.005),0.).g*U[0].w-mC,0.,1.);
    vec3 bW=dec(textureLod(tT,p,5.8).rgb);
    vec3 lightC=mix(U[9].rgb/max(max(U[9].r,U[9].g),U[9].b),vec3(1.,.97,.92),.35);
    // a line of running water is a path in the glass's wetting: an iso-line of a stretched noise, thin, lit only where the film is wet
    // (read down the stretched axis through a smoothed texel step, so the path bends in curves and never kinks at a texel row)
    float ry=p.y*40.96+78.86, fy=fract(ry); ry=(floor(ry)+fy*fy*(3.-2.*fy)+.5)/256.;
    vec4 rp=textureLod(tN,vec2(p.x*2.6+.13+.009*sin(p.y*13.+p.x*17.),ry),0.);
    float rl=abs(rp.r-.5), rW=smoothstep(.002,.009,S.g)*smoothstep(.47,.6,rp.g);
    float riv=(1.-smoothstep(.007,.026,rl))*rW;
    vec3 fc=vec3(0.); float aF=0.;
    if(Fs>.002){
      // the bubbles are a grain bound to the glass, not to the stretch of the advected map; the map's stretch shows as drag streaks
      vec2 buv=p+(uv-p)*.3; vec4 bub=textureLod(tBub,buv*3.1,lod), bc=textureLod(tBub,buv*2.3+.37,lod);
      vec4 lu=textureLod(tLump,uv*1.75+.3,lod+1.3);
      vec4 rb=textureLod(tN,uv*vec2(3.7,.42)+.2,0.), rb2=textureLod(tN,uv*vec2(13.,1.3)+.6,0.);
      float big=textureLod(tN,p*.71+.41,0.).g;
      float h=lu.b, hb=lb.b;
      // long streaks where it is sliding and draining; there the foam is thinner and brighter
      float drain=smoothstep(.28,.74,rb2.g*.6+rb.g*.55);
      float bil=smoothstep(.22,.68,hb*.75+h*.25);
      float tau=Fs*(1.3+1.4*bil)*(1.15-.5*drain);
      float Td=exp(-tau*1.7);
      // a mass of bubbles lets through a blur of the lights behind it, wider and dimmer the thicker it is: every lamp is a bloom,
      // brightest where the lather is thin; the light it does not let through it scatters, so the mass itself glows
      vec3 bN=dec(textureLod(tT,p+(lb.xy-.5)*.04,mix(2.6,5.,smoothstep(.0,.8,tau))).rgb);
      vec3 thru=(bN*(1.6*Td+.35)+bW*(.45+.7*(1.-Td))+bW*bW*2.)*U[11].w*(.45+.55*smoothstep(.03,.25,Fs));
      thru+=mix(lightC,vec3(1.),.5)*U[1].w*(1.-Td*.7); // under a drum the lather still takes the ceiling's light: pale, not grey
      vec2 kd=(p-U[1].xy)*vec2(.75,1.); float kg=U[11].z*(.16+.5*exp(-dot(kd,kd)/.16))*(.86+.28*big);
      vec2 bmp=((lu.xy-.5)*1.1+(lb.xy-.5)*4.4)*smoothstep(.08,.3,Fs);
      float bump=dot(bmp,U[10].xy)+clamp(dot(G.xy,U[10].xy)*.3,-.5,.5);
      float crease=mix(.62,1.1,smoothstep(.16,.56,hb*.8+h*.2));
      vec3 side=lightC*kg*max(.62+1.05*bump,.08)*crease*(1.-Td*.62);
      // tint: soft, and only in places, unless this is a real triple-foam arch
      vec3 cw=vec3(Hh.b,Hh.a,max(Hh.r-Hh.b-Hh.a,0.))/max(Hh.r,1e-3);
      vec3 sig=cw.x*U[6].xyz+cw.y*U[7].xyz+cw.z*U[8].xyz;
      float place=mix(.55+.45*smoothstep(.3,.7,big+(rb.r-.5)*.3),1.,U[11].x);
      vec3 pig=exp(-sig*place*(.45+.5*min(tau,2.)));
      // bubble structure against the glass: fine and packed in the mass, coarse and open at the thin edge
      float coarse=(1.-smoothstep(.05,.42,Fs))*smoothstep(.5,2.,length(G.xy)); // open cells only along a draining edge
      float bigB=smoothstep(.0,.30,bc.r), medB=smoothstep(.0,.26,bub.r), smB=smoothstep(.0,.30,bub.b);
      // (the tile's R and B are 1 inside a bubble's contact disc and fall to 0 in the liquid borders between them)
      float wall=mix((1.-medB)*.6+(1.-smB)*.4,(1.-bigB)*.8+(1.-medB)*.2,coarse);
      float detail=(1.-(.09+.43*coarse)*wall)*(1.+.04*medB*(1.-coarse));
      // a lamp behind lather is bright but not blank: the light is shouldered by its brightest channel (so a sodium bloom stays
      // orange to its centre) before the bubble walls are laid over it, so they show as dark cells against the glow
      vec3 fb=pig*(thru+side+U[9].rgb*1.1); float fl=max(max(fb.r,fb.g),fb.b);
      fb*=(fl>1.8?1.8+1.*(1.-exp(1.8-fl)):fl)/max(fl,1e-4);
      fc=fb*detail;
      fc*=1.-U[5].z*exp(-pow((mix(p.y,p.x,U[5].y)-U[5].x)/.26,2.));
      // small hard glints where a bubble's wall catches a tube, sparse
      fc+=(bW*U[11].w*.9+lightC*kg*.4)*(bub.a*smoothstep(.72,.9,bub.g)*(.25+.5*coarse)+bc.a*smoothstep(.55,.8,bc.g)*.35*coarse);
      // coverage: thins continuously, then breaks cell by cell; holes open a bubble at a time as the thickness falls
      float cov=1.-exp(-Fs*(6.+16.*Fs));
      float fill=smoothstep(.0,.42,Fs*12.-.45*bub.g-.2*smB), fillB=smoothstep(.0,.3,Fs*22.-1.25*bc.g);
      float laceA=(1.-(1.-fill)*medB*.82)*(1.-(1.-fillB)*bigB*.7);
      aF=cov*mix(laceA,1.,max(smoothstep(.10,.26,Fs),1.-coarse));
      aF*=mix(1.,.45+.75*drain,(1.-smoothstep(.08,.3,Fs))*(1.-coarse)); // thin scrubbed lather is a streaked film
      aF*=1.-.92*mC; fc=mix(fc,fc*1.2+lightC*kg*.3,mR); aF=max(aF,.85*mR*smoothstep(.0,.04,Fs));
      // soap film left on the glass round the mass, thin enough to see through
      aF=max(aF,smoothstep(.003,.07,Hh.r)*(.15+.22*drain));
      // the wall of a bubble at the edge carries light round it
      fc*=1.+coarse*.18*(1.-medB*bigB);
      aF*=1.-riv*.32;
    }
    vec3 wc=vec3(0.);
    if(aF<.995){
      // water: sheets smear the lights into streaks, rivulets lens them, thin films stand up into beads
      float W=S.g; vec4 tb=textureLod(tBead,p*1.45+.13,lod);
      float wv=W*U[10].w; float W2=mix(W,Hh.g,.7); float sheet=smoothstep(.14,.4,W2)*(1.-mC); float pres=smoothstep(tb.a,tb.a+.09,wv*30.)*smoothstep(.0,.1,tb.b)*U[10].z*(1.-sheet)*(1.-riv)*smoothstep(.03,.2,tb.b+Hh.r*2.-.05);
      vec2 rv=rp.ba-.5; float lens=sign(rp.r-.5)*rl/.026;
      vec2 refr=clamp(G.zw*(.00025+.0012*sheet),-.015,.015)+rv*vec2(.05,.016)*smoothstep(.06,.3,W2)+vec2(lens*.028*riv,0.)-(tb.rg-.5)*.17*pres;
      vec3 bgS=dec(textureLod(tT,clamp(p+refr,.002,.998),.35+.9*sheet).rgb);
      vec3 bgV=dec(textureLod(tS,clamp(p+refr*1.7,.002,.998),0.).rgb);
      float wetV=max(sheet,riv);
      wc=mix(bgS,bgV*1.25,wetV);
      wc*=1.-.45*mC; wc+=lightC*.05*mC*(1.-mC)*4.; // a finger on the glass: its colour deepened by the water, a thread of light at its edge
      float limb=smoothstep(.72,.05,tb.b);
      wc*=1.-pres*limb*.62;
      // a rivulet is a thin lens: a bright core, dark at its two edges, with slugs of water sliding down it
      float slug=textureLod(tN,vec2(p.x*.9+.37,p.y*.55-U[1].z*.11),0.).r;
      wc*=1.-.55*riv*smoothstep(.25,.95,rl/.026);
      wc+=riv*(1.-smoothstep(.0,.5,rl/.026))*(bgS*.6+bgV*.45+bW*.2)*(.6+.8*slug);
      vec2 ng=clamp(G.zw*.09,-1.2,1.2)+(tb.rg-.5)*2.2*pres; vec3 nrm=normalize(vec3(ng,1.));
      float sp=pow(max(dot(nrm,normalize(vec3(U[10].xy*.7,.9))),0.),60.);
      wc+=(lightC*.09+bW*2.)*sp*(sheet*.25+pres*.5)*smoothstep(.0,.03,W);
      wc+=sheet*bW*.14;
      // wax leaves a thin interference sheen on the film
      if(U[11].y>0.){ float ph=W*90.+(G.z+G.w)*.5+p.y*2.2; wc+=U[11].y*smoothstep(.0,.05,W)*(.5+.5*cos(ph*vec3(1.,1.23,1.51)))*bW*.12; }
    }
    vec3 col=mix(wc,fc,aF);
    // what the cabin puts on the inside of the glass
    col+=textureLod(tRf,p,0.).rgb*.32;
    o=vec4(TM(col),1.); }`,Do=`#version 300 es
precision highp int;
  layout(location=0) in vec4 aB; uniform sampler2D tA; uniform float uS; out vec2 vQ; out vec2 vC; out float vA;
  void main(){ vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;
    float F=textureLod(tA,aB.xy,0.).r; vA=aB.w*(1.-smoothstep(.02,.08,F));
    float r=aB.z*(vA>.002?1.:0.);
    vec2 q=c*1.08; vQ=q; vC=aB.xy;
    vec2 s=aB.xy+q*r*vec2(.97,1.05+.25*smoothstep(.006,.02,aB.z)); gl_Position=vec4(s.x*2.-1.,1.-s.y*2.,0.,1.); }`,No=L+At+`
  in vec2 vQ; in vec2 vC; in float vA; uniform sampler2D tT; uniform vec4 U[1];
  void main(){ float d=dot(vQ,vQ); if(d>1.1||vA<.002) discard; float a=1.-smoothstep(.86,1.,d); float z=sqrt(max(1.-d,0.));
    vec2 uvb=vC-vQ*.22; vec3 bg=dec(textureLod(tT,clamp(uvb,.002,.998),.8).rgb);
    float limb=smoothstep(.35,.9,d); vec3 c=bg*(1.-limb*.45);
    vec3 n=normalize(vec3(vQ,z+.12));
    float sp=pow(max(dot(n,normalize(vec3(U[0].xy*.8,.65))),0.),90.);
    c+=U[0].z*vec3(1.)*sp*1.5;
    c+=dec(textureLod(tT,clamp(vC+vQ*.03,.002,.998),3.).rgb)*.4*smoothstep(.35,.85,vQ.y)*(1.-smoothstep(.7,1.,d));
    float al=a*min(vA,1.); o=vec4(TM(c)*al,al); }`,ko=`#version 300 es
precision highp int;
  uniform vec4 U[4]; out vec2 vP; flat out float vM;
  void main(){ vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1)); int m=1-(gl_InstanceID&1), i=gl_InstanceID>>1; vec4 PR=U[i]; float th=U[2][i], K=U[2].w;
    vec2 e=vec2(cos(th),sin(th)); vec2 nrm=vec2(-e.y,e.x); float up=1.; if(nrm.y>0.){ nrm=-nrm; up=-1.; }
    float a0=m==0?PR.z-.012:.0, a1=m==0?PR.w+.012:mix(PR.z,PR.w,.5), hw=m==0?.018:.011;
    float al=mix(a0,a1,c.x), cr=(c.y*2.-1.)*hw;
    vec2 q=e*al+vec2(-e.y,e.x)*cr;
    if(m==1) q+=nrm*.034*(1.-c.x);
    vec2 s=PR.xy+q/vec2(1.,K);
    // d is +1 on the blade's screen-upper side whatever the layout, so the rubber is always its lower line
    vP=vec2((al-PR.z)/(PR.w-PR.z),(c.y*2.-1.)*up); if(m==1) vP.x=c.x; vM=float(m); gl_Position=vec4(s.x*2.-1.,1.-s.y*2.,0.,1.); }`,Co=L+At+`
  in vec2 vP; flat in float vM; uniform sampler2D tN,tA; uniform vec4 U[4];
  void main(){ float s=vP.x, d=vP.y; vec3 lc=U[3].rgb; float nz=textureLod(tN,vec2(s*3.7,.4),0.).r, nf=textureLod(tN,vec2(s*19.,d*.2),0.).g;
    float sl=.4+.9*exp(-pow((s-U[2].z)/.3,2.)); // the tubes' long highlight slides along as the car moves
    vec2 g=vec2(gl_FragCoord.x,U[3].w-gl_FragCoord.y)/U[3].w; float F=textureLod(tA,g,0.).r;
    if(vM<.5){ // the blade: a thin rubber line on the glass, over it a slim bow thickest at the middle with round ends, and the hook block
      float sc=clamp(s,0.,1.), tip=sqrt(clamp(min(s,1.-s)/.03,0.,1.));
      float bw=(.15+.40*pow(sin(3.14159*sc),.7))*tip, bd=abs(d-.06);
      float bow=1.-smoothstep(bw-.06,bw+.03,bd);
      float rub=(1.-smoothstep(.06,.12,abs(d+.52)))*sqrt(clamp(min(s+.01,1.01-s)/.012,0.,1.));
      float jt=(1.-smoothstep(.028,.04,abs(s-.5)))*(1.-smoothstep(.62,.72,abs(d-.2)));
      float b=max(max(bow,rub),jt);
      vec3 c=vec3(.0026)+vec3(.0035)*nf;
      c+=lc*(.15*exp(-pow((d-.06-bw*.55)/.09,2.))*(.35+1.1*nz)*sl+.02*nz)*max(bow,jt);
      c+=lc*.05*jt*smoothstep(.0,.7,d);
      c=mix(c,vec3(.0012),rub*(1.-max(bow,jt)));
      // lather that has run down onto the parked blade sits on its upper side
      b*=1.-.85*smoothstep(.08,.45,F)*smoothstep(-.3,.5,d);
      float sh=(1.-b)*.3*(1.-smoothstep(.3,1.,abs(d)))*tip;
      float al=max(b,sh); o=vec4(TM(c)*b,al);
    } else { // the arm: a narrower pressed strip, wider toward the pivot and its spring cap; it stands off the glass, so lather hides it
      float ta=.30+.36*(1.-s)+.32*exp(-pow(s/.07,2.)); float cv=1.-smoothstep(ta-.12,ta+.04,abs(d)); cv*=smoothstep(1.,.97,s)*smoothstep(-.02,.02,s);
      vec3 c=vec3(.004)+lc*(.10*exp(-pow((d-ta*.45)/.13,2.))*(.5+.8*nz)*sl+.012);
      cv*=exp(-F*2.6);
      o=vec4(TM(c)*cv,cv); } }`,Po=L+At+`
  uniform sampler2D tI,tT,tR,tRf; uniform vec4 U[4];
  void main(){ vec2 f=gl_FragCoord.xy/U[0].x; vec2 p=vec2(f.x,1.-f.y); vec4 I=textureLod(tI,p,U[0].y);
    vec3 lit=U[1].rgb, rim=U[2].rgb; vec3 back=dec(textureLod(tT,p,5.).rgb);
    vec3 gr=textureLod(tR,gl_FragCoord.xy/128.+U[0].zw,0.).rgb-.5;
    float sw=exp(-pow((p.x-U[1].w)/.2,2.))+exp(-pow((p.x-U[1].w+.8)/.2,2.)); vec3 surf=I.r*.25*lit*(.7+1.5*sw)+I.g*rim*(.8+.8*sw);
    surf+=vec3(1.,.56,.24)*textureLod(tRf,p,0.).a*.05*I.a;
    vec2 ld=(p-U[3].xy); float led=exp(-dot(ld,ld)/U[3].z);
    surf+=vec3(1.,.42,.1)*led*.3*I.a;
    vec3 hz=(I.b*I.b*.4)*(back*.32+rim*.004)*(1.-I.a);
    vec3 c=TM(surf)+hz*.9;
    c+=(gr-.5)*.006;
    o=vec4(max(c,0.),I.a); }`;function ce(n,t,T){const d=n.createShader(t);return n.shaderSource(d,T),n.compileShader(d),d}const $t=["load","drop","cloth"];function Bo(n,t){const T={noise:[A,mo],bub:[A,uo],bead:[A,bo],int:[A,go],init:[A,yo],sim:[A,Uo],load:[A,Ro],lump:[A,vo],lumpn:[A,xo],uv:[A,Lo],der:[A,To],tun:[A,Fo],smear:[A,Ao],halo:[A,Eo],ref:[A,wo],cloth:[_o,zo],comp:[A,So],drop:[Do,No],blade:[ko,Co],fin:[A,Po]},d={},Z=[],ft={},dt=ce(n,n.VERTEX_SHADER,A),lt=v=>{const U=n.createProgram(),ht=T[v][0]===A?dt:ce(n,n.VERTEX_SHADER,T[v][0]),pt=ce(n,n.FRAGMENT_SHADER,T[v][1]);return n.attachShader(U,ht),n.attachShader(U,pt),n.linkProgram(U),n.flush(),[v,U,ht,pt]},M=([v,U,ht,pt])=>{if(!n.getProgramParameter(U,n.LINK_STATUS))throw new Error("221 "+v+": "+n.getProgramInfoLog(U)+" "+n.getShaderInfoLog(pt)+" "+n.getShaderInfoLog(ht));const nt={};let yt=0;const it=n.getProgramParameter(U,n.ACTIVE_UNIFORMS),Et=n.getParameter(n.CURRENT_PROGRAM);n.useProgram(U);for(let at=0;at<it;at++){const Jt=n.getActiveUniform(U,at);Jt.type===n.SAMPLER_2D&&(nt[Jt.name]=yt,n.uniform1i(n.getUniformLocation(U,Jt.name),yt),yt++)}return n.useProgram(Et),{p:U,units:nt,U:n.getUniformLocation(U,"U"),uS:n.getUniformLocation(U,"uS")}};for(const v in T)$t.includes(v)||Z.push(lt(v));for(const v of Z)d[v[0]]=M(v);for(const v of $t)Object.defineProperty(d,v,{configurable:!0,enumerable:!0,get(){const U=M(ft[v]||(ft[v]=lt(v)));return Object.defineProperty(d,v,{value:U,enumerable:!0}),U}});let K=!t;return d.later=()=>{for(const v of $t)if(!ft[v]){ft[v]=lt(v);return}if(!K){for(const v of $t)if(Object.getOwnPropertyDescriptor(d,v).get){n.getProgramParameter(ft[v][1],t.COMPLETION_STATUS_KHR)&&d[v];return}K=!0}},d}function Io(n){let t=De.get(n);if(t)return t;const T=!!n.getExtension("EXT_color_buffer_float"),d=!!n.getExtension("EXT_color_buffer_half_float");return t={P:Bo(n,n.getExtension("KHR_parallel_shader_compile")),hasF:T||d,vao:n.createVertexArray()},De.set(n,t),t}Se.add({num:221,name:"Car Wash",fam:"Worlds",recipe:"The view from the driver's seat at night as an automatic car wash passes over the windscreen, from thick foam to the brushes, the rinse and the dryers. The foam colour, the bay lights, the car, the brushes and which part of the wash you start on change every mint. Drag to swing the wipers through the foam and leave a pile where you stop, then let go and they park.",interactive:"Drag to work the wipers across the glass; let go and they park.",music:!0,gl:!0,fps:30,seed:0,make(n){const t=n.gl,T=Io(t),d=T.P,Z=n.size,ft=Math.log2(Math.max(1,1e3/Z));let dt=0;for(let e=2;e<n.hash.length;e++)dt=Math.imul(dt,31)+n.hash.charCodeAt(e)>>>0;let lt=dt^2654435769;const M=()=>{lt=lt+1831565813|0;let e=Math.imul(lt^lt>>>15,1|lt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},K=(e,l)=>{let s=0;for(const b of l)s+=b[1];let r=M()*s,p=l[0];for(const b of l)if(r-=b[1],r<=0){p=b;break}return p[0]};let v=K("",[["Pearl",38],["Blush",20],["Ice",18],["Lemon",14],["Triple foam",10]]),U=K("",[["Mixed",34],["Cold tubes",26],["Sodium",24],["Blue LEDs",16]]),ht=K("",[["Left seat",60],["Right seat",40]]),pt=K("",[["Saloon",50],["Van",25],["Low coupe",25]]),nt=K("",[["Tandem",62],["Opposed",28],["Single arm",10]]),yt=K("",[["New rubber",50],["Worn rubber",38],["Perished rubber",12]]),it=K("",[["Waxed",62],["Bare",28],["Stone chip",10]]),Et=K("",[["Blue felt",38],["Red and grey",28],["Charcoal",24],["Touchless",10]]),at=K("",[["Heavy",52],["Thin",36],["Drowned",12]]);n.home&&(v="Blush",U="Mixed",ht="Left seat",pt="Saloon",nt="Tandem",yt="Worn rubber",it="Waxed",Et="Blue felt",at="Heavy"),n.trait("Foam",v),n.trait("Tunnel",U),n.trait("Seat",ht),n.trait("Cabin",pt),n.trait("Wipers",nt),n.trait("Glass",it),n.trait("Rollers",Et);const fe={Pearl:[[.985,.98,.96],[.965,.975,.995],[.99,.985,.965]],Blush:[[.965,.82,.86],[.99,.965,.975],[.965,.89,.92]],Ice:[[.74,.85,.985],[.97,.985,1],[.82,.9,.985]],Lemon:[[.985,.93,.66],[.985,.985,.92],[.96,.96,.78]],"Triple foam":[[.97,.74,.81],[.74,.83,.98],[.985,.93,.7]]}[v].map(e=>e.map(l=>-Math.log(l)*1.15)),g={Mixed:{tube:[.86,.93,1],sod:[1,.5,.15],led:[.03,.02,.05],amb:[.022,.021,.022],gLed:[[.9,.55,.5],[.5,.6,.9],[.9,.8,.6]]},"Cold tubes":{tube:[.84,.94,1],sod:[.1,.13,.16],led:[.06,.05,.16],amb:[.018,.023,.03],gLed:[[.8,.5,.6],[.4,.55,.9],[.8,.75,.6]]},Sodium:{tube:[1,.6,.24],sod:[1,.46,.12],led:[.2,.07,.02],amb:[.035,.022,.012],gLed:[[1,.4,.2],[1,.6,.25],[1,.75,.45]]},"Blue LEDs":{tube:[.3,.44,1],sod:[.14,.22,.7],led:[.3,.06,.7],amb:[.012,.016,.045],gLed:[[.7,.25,.8],[.2,.5,1],[.6,.35,.9]]}}[U],Q=ht==="Right seat",st={Saloon:{dash:.935,hx:.2,hh:.075,lean:.15,mir:[.86,.062,.19,.052],wheel:[.15,1.385,.49,.04],led:[.53,.972]},Van:{dash:.962,hx:.24,hh:.045,lean:.075,mir:[.72,.03,.2,.05],wheel:[.2,1.47,.53,.036],led:[.58,.985]},"Low coupe":{dash:.885,hx:.22,hh:.095,lean:.25,mir:[.88,.115,.17,.045],wheel:[.2,1.28,.445,.042],led:[.56,.94]}}[pt],qo=e=>Q?1-e:e,_t=1.12,te=-O+.135,Mo=1.92,X=nt==="Tandem"?[{p:[.93,.925],r0:.17,r1:.9,b:te,sg:1},{p:[.47,.955],r0:.1,r1:.53,b:te,sg:1}]:nt==="Opposed"?[{p:[.97,.95],r0:.17,r1:.84,b:te,sg:1},{p:[.03,.96],r0:.17,r1:.62,b:-.075,sg:-1}]:[{p:[.58,1],r0:.1,r1:.88,b:te,sg:1,big:1},{p:[0,0],r0:0,r1:0,b:0,sg:1}];if(nt==="Single arm"&&(X[0].sweepK=1.5),Q)for(const e of X)e.p[0]=1-e.p[0],e.b=O-e.b,e.sg=-e.sg;const ee=nt==="Single arm"?2.75:Mo,Ce={"New rubber":.004,"Worn rubber":.02,"Perished rubber":.055}[yt],Ho={"New rubber":0,"Worn rubber":.012,"Perished rubber":.04}[yt],de=it==="Bare"?.35:1,zt={"Blue felt":[[.05,.14,.42],[.06,.12,.3]],"Red and grey":[[.2,.05,.055],[.07,.07,.08]],Charcoal:[[.11,.1,.1],[.16,.22,.04]],Touchless:[[0,0,0],[0,0,0]]}[Et],ot=Et!=="Touchless",he={Heavy:.46,Thin:.34,Drowned:1.25}[at],pe=1.25+M()*.9,me=M(),St=M(),oe=v==="Pearl"?1.25:1.45;let Ht=dt^1540483477;const Pe=()=>{Ht=Ht+1831565813|0;let e=Math.imul(Ht^Ht>>>15,1|Ht);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Be=Pe(),ue=Pe();let Wt=dt^668265263;const ve=()=>{Wt=Wt+1831565813|0;let e=Math.imul(Wt^Wt>>>15,1|Wt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Gt=ve(),Dt=ve(),Ie=ve();let $="Lathered";n.home||(Be<.3&&ot?$="Drum on the glass":Be>.78?$=Gt<.43?"Rinse arch":"Sheeting":$=Gt<.356?"Lathered":Gt<.554?"Foam arch":Gt<.693?ot?"Wrap brush":"Foam arch":Gt<.851?"Beaded":"Under the dryers");const qe=$!=="Lathered"||n.home||at==="Drowned"||Ie<.4?0:Ie<.75?1:2;let mt=n.home?-9:-10+3*ue,Ut=he,Nt=0,Me=qe,xe=0;$==="Drum on the glass"?mt=9.5+2.5*ue:$==="Rinse arch"?(mt=42.4+1.2*ue,Ut=he*.35,xe=1):$==="Foam arch"?(mt=23.2+Dt,Ut=.4+.06*Dt,Me=1,Nt=.05):$==="Wrap brush"?(mt=30+4*Dt,Ut=Math.max(he,.62),Nt=.02):$==="Sheeting"?(mt=47+3*Dt,Ut=.06,Nt=.32,xe=1):$==="Beaded"?(mt=56+4*Dt,Ut=-1,Nt=.022):$==="Under the dryers"&&(mt=64+4*Dt,Ut=-1,Nt=.022),n.trait("Lather",at+["",", slumped",", in lanes"][qe]),n.trait("Opens on",$);const be=T.hasF,ut=be?t.RGBA16F:t.RGBA8,vt=be?t.HALF_FLOAT:t.UNSIGNED_BYTE,He=(e,l,s,r,p,b,R)=>{const y=t.createTexture();return t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,y),t.texImage2D(t.TEXTURE_2D,0,s,e,l,0,t.RGBA,r,R||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,p),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,b),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,b),y},j=t.CLAMP_TO_EDGE,kt=t.REPEAT,H=t.LINEAR,Ot=t.LINEAR_MIPMAP_LINEAR,Wo=e=>{const l=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,l),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),l},_=(e,l,s,r,p,b)=>{const R=He(e,l,s,r,p,b);return{t:R,f:Wo(R),w:e,h:l}},ge=new Uint8Array(128*128*4);for(let e=0;e<ge.length;e++)ge[e]=M()*256;const Xt=He(128,128,t.RGBA8,t.UNSIGNED_BYTE,H,kt,ge);t.bindVertexArray(T.vao),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.STENCIL_TEST),t.colorMask(!0,!0,!0,!0);const xt=(e,l)=>{t.useProgram(e.p);for(const s in l){const r=e.units[s];r!==void 0&&(t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,l[s]))}},D=(e,l,s,r)=>{xt(e,s),t.bindFramebuffer(t.FRAMEBUFFER,l.f),t.viewport(0,0,l.w,l.h),r&&e.U&&t.uniform4fv(e.U,r),t.drawArrays(t.TRIANGLE_STRIP,0,4)};t.disable(t.BLEND);const We=_(256,256,t.RGBA8,t.UNSIGNED_BYTE,H,kt);D(d.noise,We,{tR:Xt});const V=We.t,we=_(512,512,t.RGBA8,t.UNSIGNED_BYTE,Ot,kt);D(d.bub,we,{tR:Xt}),t.bindTexture(t.TEXTURE_2D,we.t),t.generateMipmap(t.TEXTURE_2D);const Ge=_(512,512,t.RGBA8,t.UNSIGNED_BYTE,H,kt);D(d.lump,Ge,{tR:Xt});const ye=_(512,512,t.RGBA8,t.UNSIGNED_BYTE,Ot,kt);D(d.lumpn,ye,{tR:Ge.t}),t.bindTexture(t.TEXTURE_2D,ye.t),t.generateMipmap(t.TEXTURE_2D);const Ue=_(512,512,t.RGBA8,t.UNSIGNED_BYTE,Ot,kt);D(d.bead,Ue,{tR:Xt}),t.bindTexture(t.TEXTURE_2D,Ue.t),t.generateMipmap(t.TEXTURE_2D);const Re=_(1024,1024,t.RGBA8,t.UNSIGNED_BYTE,Ot,j);D(d.int,Re,{tN:V},new Float32Array([st.dash,st.hx,st.hh,st.lean,...st.mir,...st.wheel,Q?1:0,it==="Stone chip"?1:0,0,0])),t.bindTexture(t.TEXTURE_2D,Re.t),t.generateMipmap(t.TEXTURE_2D);const Le=_(ie,ie,t.RGBA8,t.UNSIGNED_BYTE,H,j);{const e=st.wheel[0]+.06,l=st.dash;D(d.ref,Le,{tN:V},new Float32Array([e,l-.165,e,l+.05,Q?1:0,l,0,0]))}const Oe=_(ne,ne,ut,vt,H,j),Xe=_(Ne,ke,t.RGBA8,t.UNSIGNED_BYTE,H,j);let C=_(G,G,ut,vt,H,j),Ct=_(G,G,ut,vt,H,j),ct=_(k,k,ut,vt,H,j),bt=_(k,k,ut,vt,H,j);const je=_(G,G,ut,vt,H,j);let Rt=_(Zt,2,ut,vt,H,j),ae=_(Zt,2,ut,vt,H,j);const jt=_(Kt,Kt,t.RGBA8,t.UNSIGNED_BYTE,H,j),Pt=_(le,le,t.RGBA8,t.UNSIGNED_BYTE,Ot,j);for(const e of[Rt,ae,jt])t.bindFramebuffer(t.FRAMEBUFFER,e.f),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT);{const e=(M()<.5?-1:1)*(.5+M());D(d.init,C,{tN:V},new Float32Array([Ut,St*.7,St*.31+.2,n.home?Q?1.3:-1.3:e,pe,me,xe,0,Nt,Me,at==="Drowned"?1:0,0]))}for(const e of[ct,bt])xt(d.uv,{tA:C.t,tN:V,tB:e.t}),t.bindFramebuffer(t.FRAMEBUFFER,e.f),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT);const Bt={x:new Float32Array(Y),y:new Float32Array(Y),r:new Float32Array(Y),rt:new Float32Array(Y),v:new Float32Array(Y),u:new Float32Array(Y),d:new Float32Array(Y)};for(let e=0;e<Y;e++){Bt.x[e]=M(),Bt.y[e]=M()*.96;const l=M();Bt.rt[e]=(.0024+.0105*l*l*l+(l>.93?.006:0))*(it==="Bare"?.7:1),Bt.d[e]=M(),Bt.r[e]=0}const It=new Float32Array(Y*4),se=new Int16Array(26*26),Ve=new Int16Array(Y),Ye=t.createBuffer(),Ze=t.createVertexArray();t.bindVertexArray(Ze),t.bindBuffer(t.ARRAY_BUFFER,Ye),t.bufferData(t.ARRAY_BUFFER,It,t.DYNAMIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,4,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,1),t.bindVertexArray(T.vao);const a={w:mt,realT:0,hold:0,red:0,hi:0,si:0,sense:0,th:0,om:0,target:0,dump:0,sign:1,moved:0,still:1,lastTouch:-99,sim:0,acc:0,thp:0,loadOn:0,beadsOn:!1,beadCount:0},f=new Float32Array(36),Ke=new Float32Array(24),h=new Float32Array(48),w=new Float32Array(40),qt=new Float32Array(4),Qe=new Float32Array(24),N=new Float32Array(16),z=new Float32Array(16),re=new Float32Array(4),Te=new Float32Array(4),o={yF:2,sF:0,yR:2,sR:0,yD:2,sD:0,wax:0,beadUp:0,wt:0,zc:0,axis:0,rdir:-1,Yc:2,Zc:3,brush:0,dirx:0,diry:0,gl:[0,0,0],ga:new Float32Array(16)},gt=(e,l)=>X[l].b+X[l].sg*e,$e=.34,Go=(e,l)=>{let s=(dt^625341585)+Math.imul(e+1,2654435761)+Math.imul(l+1,2246822507)|0;return s=Math.imul(s^s>>>16,2146121005),s=Math.imul(s^s>>>15,2221713035),((s^s>>>16)>>>0)/4294967296},Vt=[],Lt=[],Je=[],Mt=[];let Oo=0,Fe=0;function Xo(){const e=Oo++;let l=0;const s=()=>Go(e,l++);let r=Fe;const p=(y,c,u,x)=>{const m=Object.assign({k:y,t0:c,t1:u},x||{});return Vt.push(m),m};let b,R;if(e===0)p("roller",-3,24,{a:0}),p("foam",26,32,{c:0}),p("roller",31,41,{a:1}),p("rinse",43,51,{c:1}),p("wax",53,57,{c:1}),p("dry",67,75,{c:2}),b=51,R=75,Mt.push(48+s()*2.5),r=75;else{r+=7+15*s();const y=5+3*s();if(p("foam",r,r+y,{c:0}),r+=y+1+2*s(),ot){const x=21+9*s();p("roller",r-3,r+x,{a:0}),s()<.4&&Lt.push({w:r+x*(.5+.2*s()),d:1.5+2.5*s(),red:0}),r+=x+1}if(s()<.75){const x=5+3*s();p("foam",r,r+x,{c:s()<.5?0:2}),r+=x-1}if(ot&&s()<.7){const x=8+4*s();p("roller",r,r+x,{a:1}),r+=x+1}s()<.35&&(Lt.push({w:r+.5,d:4+5*s(),red:1}),r+=1);const c=6+4*s();if(p("rinse",r+1,r+1+c,{c:1}),s()<.55&&Mt.push(r+1+c*(.25+.5*s())),r+=1+c,b=r,s()<.7){const x=3+2*s();p("wax",r+1.5,r+1.5+x,{c:1}),r+=1.5+x}r+=5+9*s();const u=7+3*s();p("dry",r,r+u,{c:2}),r+=u,R=r}Je.push([b+1,R]),Fe=r}function Ae(){const e=a.w;for(;Fe<e+40;)Xo();for(;Vt.length&&Vt[0].t1<e-12;)Vt.shift();o.sF=0,o.sR=0,o.sD=0,o.brush=0,o.yF=o.yR=o.yD=2;let l=0,s=0;for(const[c,u]of Je)c>e+9||u<e-9||(l=Math.max(l,B(c,c+3,e)*(1-B(u-5,u,e))),s=Math.max(s,B(c,c+6,e)*(1-B(u-1,u+3,e))));o.wax=l*(it==="Bare"?.3:1),o.beadUp=s*de,o.wt=a.realT*7.5,o.zc=e*$e;let r=0;const p=o.ga;for(let c=0;c<16;c++)p[c]=0;let b=.3*a.red,R=.025*a.red,y=.02*a.red;for(const c of Vt){const u=c.t0+(c.t1-c.t0)*.4,x=u-e;if(x>=-6){const F=x*$e,W=c.k==="dry"?3:c.k==="roller"?ot?1+c.a:-1:0;if(W>=0&&F>(W===1||W===2?1.2:.05)&&F<11&&r<4){const q=c.c!==void 0?g.gLed[c.c]:[0,0,0];p[r*4]=F+16*W,p[r*4+1]=q[0],p[r*4+2]=q[1],p[r*4+3]=q[2],r++}if(c.c!==void 0){const q=Math.exp(-F*F*.9)*.3,tt=g.gLed[c.c];b+=q*tt[0],R+=q*tt[1],y+=q*tt[2]}}if(e<c.t0-7||e>c.t1+.5)continue;const m=(e-c.t0)/(c.t1-c.t0),I=1.08-1.2*m,J=B(0,.03,m)*(1-B(.97,1,m));if(c.k==="foam")o.yF=I,o.sF=J*(v==="Pearl"?1.2:1)*(at==="Thin"?.6:1);else if(c.k==="rinse")o.yR=I,o.sR=J;else if(c.k==="wax")o.yR=I,o.sR=J*.14;else if(c.k==="dry")o.yD=I,o.sD=J;else if(c.k==="roller"&&ot){if(o.axis=c.a,c.a===0){const W=B(0,.44,m),q=rt((m-.44)/(1-.44),0,1);o.Yc=m<.44?.4+(.97-.4)*W:.97-1.42*q,o.Zc=m<.44?1.75-1.5*W+1.6*rt(-m*8,0,1):.25-.035*Math.sin(q*O),o.diry=-1,o.dirx=0,o.rdir=-1}else{const F=Q?-1:1;o.Yc=F>0?1.42-1.9*m:-.42+1.9*m;const W=Q?o.Yc:1-o.Yc;o.Zc=.32-.14*Math.sin(m*O)+1*(1-B(.5,.68,W)),o.dirx=-F,o.diry=.2,o.rdir=-F}o.brush=B(-.13,-.02,m)*(1-B(.95,1,m))}}o.gl[0]=b,o.gl[1]=R,o.gl[2]=y}function to(e){if(!(o.brush>.01&&ot))return!1;const s=.085,r=.62,p=o.wt,b=Math.floor((O-0-p+O)/(2*O)*Qt);return Qe.set([p,o.axis,b,0,o.Yc,o.Zc,s,r,wt[0],wt[1],-1,o.rdir,a.time,2.6,.8,o.brush*B(2.6,1.75,o.Zc),zt[0][0],zt[0][1],zt[0][2],e?1:0,zt[1][0],zt[1][1],zt[1][2],0]),t.useProgram(d.cloth.p),t.uniform4fv(d.cloth.U,Qe),!0}const wt=[Q?.455:.545,.5];function jo(e,l){if(a.realT=e,a.hold>0)a.hold-=l;else{const E=a.w+l;for(;a.hi<Lt.length&&Lt[a.hi].w<=E;)Lt[a.hi].w>a.w&&(a.hold=Lt[a.hi].d,a.redOn=Lt[a.hi].red),a.hi++;a.w=E}a.red+=((a.hold>0&&a.redOn?1:0)-a.red)*Math.min(1,l*1.5),Ae();const s=n.input,r=X[0];if(s.inside&&s.down){const E=s.x-r.p[0],Ft=(s.y-r.p[1])*_t;let et=(Math.atan2(Ft,E)-r.b)*r.sg;for(;et<-O;)et+=2*O;for(;et>O;)et-=2*O;et<-.8&&(et=ee),a.target=rt(et,0,ee),a.lastTouch=e}else{for(;a.si<Mt.length&&Mt[a.si]<a.w-1.1;)a.si++;const E=a.si<Mt.length&&a.w>Mt[a.si]&&e-a.lastTouch>8;a.target=E?ee:0}const b=a.target-a.th,R=4.6;a.om+=(rt(b*15,-R,R)-a.om)*Math.min(1,l*16),a.thp=a.th,a.th=rt(a.th+a.om*l,0,ee);const y=a.th-a.thp,c=Math.abs(y)>1e-4;let u=0;if(c){const E=Math.sign(y);E!==a.sign&&a.moved&&(u=1),a.moved=1,a.still=0,u||(a.sign=E)}else a.still+=l,a.moved&&a.still>.12&&(u=1,a.moved=0);const x=c?1:0,m=X[0],I=X[1],J=gt(a.thp,0),F=gt(a.th,0),W=gt(a.thp,1),q=gt(a.th,1),tt=a.sign*m.sg,Tt=a.sign*I.sg;f[0]=o.yF,f[1]=o.sF,f[2]=o.yR,f[3]=o.sR,f[4]=o.yD,f[5]=o.sD,f[6]=e,f[7]=St,f[8]=J,f[9]=F,f[10]=W,f[11]=q,f[12]=m.p[0],f[13]=m.p[1],f[14]=m.r0,f[15]=m.r1,f[16]=I.p[0],f[17]=I.p[1],f[18]=I.r0,f[19]=I.r1,f[20]=x,f[21]=u,f[22]=Ce,f[23]=_t,f[24]=o.brush,f[25]=o.dirx,f[26]=o.diry,f[27]=pe,f[28]=a.time||0,f[29]=0,f[30]=oe,f[31]=1+1.2*rt(o.sR*2,0,1),f[32]=me+e*.004,f[33]=Ho,f[34]=tt,f[35]=Tt,t.disable(t.BLEND),o.brush>.01&&ot&&(t.bindFramebuffer(t.FRAMEBUFFER,jt.f),t.viewport(0,0,Kt,Kt),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendEquation(t.MAX),t.blendFunc(t.ONE,t.ONE),a.time=e,to(!0),xt(d.cloth,{tN:V}),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,22,Qt),t.blendEquation(t.FUNC_ADD),t.disable(t.BLEND));const Yt=x||u||a.loadOn;if(Yt){for(let E=0;E<24;E++)Ke[E]=f[E];D(d.load,ae,{tA:C.t,tL:Rt.t},Ke),a.loadOn=x?40:Math.max(0,a.loadOn-1)}if(D(d.sim,Ct,{tA:C.t,tN:V,tM:jt.t,tL:Rt.t},f),Yt){const E=Rt;Rt=ae,ae=E}let i=C;C=Ct,Ct=i,qt[0]=St,qt[1]=oe,D(d.uv,bt,{tA:C.t,tN:V,tB:ct.t},qt),i=ct,ct=bt,bt=i,oo(e,l,c,J,F,W,q),a.wipeV=Math.abs(a.om),u&&(a.dumped=1)}function eo(e,l,s,r,p){if(!(e.r1>e.r0))return!1;const b=r-e.p[0],R=(p-e.p[1])*_t,y=Math.hypot(b,R);if(y<e.r0||y>e.r1)return!1;const c=Math.atan2(R,b),u=.5*(l+s);let x=c-u;return x-=Math.round(x/(2*O))*2*O,Math.abs(x)<.5*Math.abs(s-l)+.01/y}function oo(e,l,s,r,p,b,R){const y=o.beadUp;if(y<.002&&!a.beadsOn)return;a.beadsOn=y>.002;const{x:c,y:u,r:x,rt:m,v:I,u:J,d:F}=Bt,W=o.yD,q=o.sD;let tt=0;const Tt=26,Yt=(a.sim&3)===0;Yt&&se.fill(-1);for(let i=0;i<Y;i++){if(m[i]<=0)continue;const E=B(F[i]*.7,F[i]*.7+.3,y/de),Ft=y>.002?m[i]*E:0;if(x[i]=Ft,Ft<=0)continue;const et=q*Math.exp(-((u[i]-W)**2)/.03)*(Ft/.0035);let ro=Math.max(0,(Ft/.0125)**2-1)*.05;const lo=c[i]-.5,no=u[i]-1.42,io=Math.hypot(lo,no),co=et*.46*(1+.5*Math.sin(e*7+i));et>.35&&(ro+=co*no/io);const Jo=et>.35?co*lo/io+.02*Math.sin(e*3+i*1.3)*et:0;if(I[i]+=(ro-I[i])*.25,J[i]+=(Jo-J[i])*.25,c[i]+=J[i]*l,u[i]+=I[i]*l,u[i]<-.02||u[i]>1.02||c[i]<-.02||c[i]>1.02||s&&(eo(X[0],r,p,c[i],u[i])||eo(X[1],b,R,c[i],u[i]))){s&&(a.swept=(a.swept||0)+1),m[i]=-1,x[i]=0;continue}if(Yt){const ta=rt(c[i]*Tt|0,0,Tt-1),ea=rt(u[i]*Tt|0,0,Tt-1),_e=ta+ea*Tt;let P=se[_e],ze=!1;for(;P>=0&&!ze;){const fo=c[i]-c[P],ho=u[i]-u[P],po=x[i]+x[P];if(fo*fo+ho*ho<po*po*.7){const oa=Math.cbrt(m[i]**3+m[P]**3);c[P]=(c[i]*m[i]+c[P]*m[P])/(m[i]+m[P]),u[P]=(u[i]*m[i]+u[P]*m[P])/(m[i]+m[P]),m[P]=oa,m[i]=-1,x[i]=0,ze=!0}P=Ve[P]}if(ze)continue;Ve[i]=se[_e],se[_e]=i}It[tt*4]=c[i],It[tt*4+1]=u[i],It[tt*4+2]=Ft,It[tt*4+3]=Math.min(1,E*2),tt++}if(a.beadCount=tt,y<.002){for(let i=0;i<Y;i++)m[i]=(.0024+.0105*F[i]**3+(F[i]>.93?.006:0))*(it==="Bare"?.7:1),c[i]=(c[i]*7.13+F[i])%1,c[i]<0&&(c[i]+=1),u[i]=(F[i]*17.3+i*.618)%.96,I[i]=0,J[i]=0;a.beadCount=0}a.beadDirty=1}function Vo(){for(let e=0;e<26;e++)a.time=-1,Yo(e)}function Yo(e){Ae(),o.brush=0,o.sF=0,f.fill(0),f[0]=2,f[2]=2,f[4]=2,f[6]=0,f[7]=St,f[8]=f[9]=gt(0,0),f[10]=f[11]=gt(0,1);const l=X[0],s=X[1];f[12]=l.p[0],f[13]=l.p[1],f[14]=l.r0,f[15]=l.r1,f[16]=s.p[0],f[17]=s.p[1],f[18]=s.r0,f[19]=s.r1,f[22]=Ce,f[23]=_t,f[27]=pe,f[30]=oe*.7,f[31]=1,f[32]=me,D(d.sim,Ct,{tA:C.t,tN:V,tM:jt.t,tL:Rt.t},f);let r=C;C=Ct,Ct=r,qt[0]=St,qt[1]=oe*.7,D(d.uv,bt,{tA:C.t,tN:V,tB:ct.t},qt),r=ct,ct=bt,bt=r}Zo();function Zo(){const e=new Uint16Array(k*k*4);if(be){for(let l=0;l<k;l++)for(let s=0;s<k;s++){const r=(s+l*k)*4;e[r]=Ee((s+.5)/k),e[r+1]=Ee((l+.5)/k),e[r+3]=Ee(1)}t.bindTexture(t.TEXTURE_2D,ct.t),t.texSubImage2D(t.TEXTURE_2D,0,0,0,k,k,t.RGBA,t.HALF_FLOAT,e),t.bindTexture(t.TEXTURE_2D,bt.t),t.texSubImage2D(t.TEXTURE_2D,0,0,0,k,k,t.RGBA,t.HALF_FLOAT,e)}}function Ee(e){if(e<=0)return 0;const l=Math.floor(Math.log2(e)),s=e/2**l-1;return l+15<<10|Math.round(s*1024)}Vo(),o.beadUp>.002&&oo(0,0,!1,0,0,0,0),a.time=0;const S={brush:0,rumble:0,hiss:0,clunk:1.3,sq:0,tick:0};function Ko(e,l){const s=n.sound;if(!s)return;if(S.clunk-=l,S.brush-=l,S.rumble-=l,S.hiss-=l,S.sq-=l,S.clunk<0&&(s.hit("kick",.14),S.clunk=1.7+(Math.sin(e*13.7)+1)*.9),o.brush>.05&&o.Zc<.6){if(S.brush<0){const p=Math.sin(e*31.7)*.7;s.hit("snare",.22+.25*(.5+.5*Math.sin(e*91.3)),{pan:p}),Math.sin(e*57.1)>.2&&s.hit("kick",.28,{pan:p}),S.brush=.07+.09*(.5+.5*Math.sin(e*43.1))}S.rumble<0&&(s.hit("noise",.6,{cutoff:260,dur:.7}),S.rumble=.5)}S.hiss<0&&(o.sF>.05?(s.hit("noise",.3,{cutoff:1500,dur:.45,pan:Math.sin(e*2.1)*.5}),S.hiss=.32):o.sR>.3?(s.hit("noise",.55,{cutoff:5200,dur:.5,pan:Math.sin(e*3.1)*.5}),S.hiss=.3):o.sD>.05?(s.hit("noise",.8,{cutoff:2300,dur:.6}),S.hiss=.32):S.hiss=.2);const r=Math.abs(a.om);r>.3&&S.sq<0&&(s.note(33+r*2,{wave:"sawtooth",dur:.1,vel:.22,cutoff:340}),s.hit("noise",.1+r*.05,{cutoff:1200+r*700,dur:.1,pan:(Q?1:-1)*.2}),S.sq=.085),a.dumped&&(r<.5&&s.hit("kick",.24),a.dumped=0),a.swept&&(s.hit("click",Math.min(.5,a.swept*.05)),a.swept=0)}function ao(){t.bindVertexArray(T.vao),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.STENCIL_TEST),t.disable(t.DITHER),t.disable(t.RASTERIZER_DISCARD),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.disable(t.SAMPLE_COVERAGE),t.colorMask(!0,!0,!0,!0),t.blendEquation(t.FUNC_ADD)}function Qo(e){w[0]=o.zc,w[1]=e,w[2]=wt[0],w[3]=wt[1],w[4]=g.tube[0],w[5]=g.tube[1],w[6]=g.tube[2],w[7]=.025+.03*(o.sD+o.sR),w[8]=g.led[0],w[9]=g.led[1],w[10]=g.led[2],w[11]=Q?.3:-.3;for(let l=0;l<12;l++)w[12+l]=o.ga[l];for(let l=0;l<4;l++)w[32+l]=o.ga[12+l];w[36]=4,w[37]=a.red,w[24]=o.gl[0],w[25]=o.gl[1],w[26]=o.gl[2],w[28]=g.sod[0],w[29]=g.sod[1],w[30]=g.sod[2];{const l=o.brush>.01&&ot?o.brush:0,s=1/(1+o.Zc*.95),r=o.axis>.5?wt[0]:wt[1];w[27]=(o.axis>.5?-1:1)*l*B(0,1,1.6-o.Zc),w[31]=r+(o.Yc+.14-r)*s}t.disable(t.BLEND),D(d.tun,Pt,{tN:V},w),o.brush>.01&&ot&&(t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),a.time=e,to(!1),xt(d.cloth,{tN:V}),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,22,Qt),t.disable(t.BLEND)),t.bindFramebuffer(t.FRAMEBUFFER,null),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Pt.t),t.generateMipmap(t.TEXTURE_2D),Te[0]=Math.min(1,o.sD*1.6),Te[1]=.22,D(d.smear,Xe,{tT:Pt.t},Te)}function so(e){ao(),Qo(e),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,Z,Z),D(d.der,je,{tA:C.t}),D(d.halo,Oe,{tA:C.t}),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,Z,Z);const l=o.brush>.01&&ot,s=X[0],r=X[1],p=gt(a.th,0),b=gt(a.th,1),R=a.sign*s.sg,y=a.sign*r.sg;h[0]=Z,h[1]=ft,h[4]=wt[0]+(Q?-.09:.09),h[5]=.24;{const c=l?o.brush*B(1,.3,o.Zc):0;h[3]=c,h[7]=1.3*c*(o.axis>.5?.5:1)}h[8]=p,h[9]=b,h[10]=R,h[11]=y,h[12]=s.p[0],h[13]=s.p[1],h[14]=s.r0,h[15]=s.r1,h[16]=r.p[0],h[17]=r.p[1],h[18]=r.r0,h[19]=r.r1,h[20]=o.Yc,h[21]=o.axis,h[22]=l?.3*o.brush*B(1.5,.3,o.Zc):0,h[23]=_t,h.set(fe[0],24),h.set(fe[1],28),h.set(fe[2],32),h[36]=g.amb[0]+o.gl[0]*.05,h[37]=g.amb[1]+o.gl[1]*.05,h[38]=g.amb[2]+o.gl[2]*.05,h[40]=Q?.55:-.55,h[41]=-.8,h[42]=Math.max(o.beadUp,.95*de),h[43]=1,h[44]=v==="Triple foam"?1:0,h[45]=o.wax,h[46]=1.5,h[47]=11,h[6]=e%512,h[2]=wt[0],xt(d.comp,{tA:C.t,tD:je.t,tB:ct.t,tT:Pt.t,tL:Rt.t,tBub:we.t,tBead:Ue.t,tN:V,tLump:ye.t,tH:Oe.t,tS:Xe.t,tRf:Le.t,tM:jt.t}),t.uniform4fv(d.comp.U,h),t.disable(t.BLEND),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),a.beadCount>0&&(t.useProgram(d.drop.p),xt(d.drop,{tT:Pt.t,tA:C.t}),t.uniform1f(d.drop.uS,Z),re[0]=h[40],re[1]=-.8,re[2]=.6+(g.tube[0]+g.tube[1]+g.tube[2])*.3,t.uniform4fv(d.drop.U,re),t.bindVertexArray(Ze),t.bindBuffer(t.ARRAY_BUFFER,Ye),a.beadDirty&&(t.bufferSubData(t.ARRAY_BUFFER,0,It.subarray(0,a.beadCount*4)),a.beadDirty=0),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,a.beadCount),t.bindVertexArray(T.vao)),N[0]=s.p[0],N[1]=s.p[1],N[2]=s.r0,N[3]=s.r1,N[4]=r.p[0],N[5]=r.p[1],N[6]=r.r0,N[7]=r.r1,N[8]=p,N[9]=b,N[10]=o.zc/1.95%1*1.6-.2,N[11]=_t,N[12]=g.tube[0]+o.gl[0]*.5,N[13]=g.tube[1]+o.gl[1]*.5,N[14]=g.tube[2]+o.gl[2]*.5,N[15]=Z,xt(d.blade,{tN:V,tA:C.t}),t.uniform4fv(d.blade.U,N),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,r.r1>r.r0?4:2),z[0]=Z,z[1]=ft,z[2]=0,z[3]=0,z[4]=g.tube[0]*.4+g.sod[0]*.12+.3*o.gl[0],z[5]=g.tube[1]*.4+g.sod[1]*.12+.3*o.gl[1],z[6]=g.tube[2]*.4+g.sod[2]*.12+.3*o.gl[2],z[7]=o.zc/1.95%1*1.6-.2,z[8]=z[4],z[9]=z[5],z[10]=z[6],z[12]=qo(st.led[0]),z[13]=st.led[1],z[14]=12e-6,xt(d.fin,{tI:Re.t,tT:Pt.t,tR:Xt,tRf:Le.t}),t.uniform4fv(d.fin.U,z),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.disable(t.BLEND)}return Ae(),so(0),(e,l)=>{d.later(),ao(),a.acc=Math.min(a.acc+l,.1);const s=1/30;let r=0;for(;a.acc>=s&&r<3;)a.sim++,jo(e-a.acc+s,s),a.acc-=s,r++;Ko(e,l),so(e)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
