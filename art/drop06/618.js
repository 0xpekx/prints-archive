// Oil Rig: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/618.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ua){ua&&function(){"use strict";const A1={yaw:0,pitch:0,x:0,y:0,z:0},go=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,_1="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",g1=`
uniform vec4 uP[11];
uniform vec4 uK[132];
uniform sampler2D uPr;
uniform sampler3D uN;
out vec4 oC;
#define SIG uP[4].x
#define CY uP[4].y
float sat(float x){return clamp(x,0.,1.);}
float h21(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
#define NS(p,m) textureLod(uN,(p)/(m)*.0625,0.).r
float capI(vec3 ro,vec3 rd,vec3 pa,vec3 pb,float r){
  // in the capsule's own unit frame, so long thin members far off keep their precision
  vec3 ba=pb-pa,oa=ro-pa;float L=length(ba);vec3 u=ba/L;
  float ud=dot(u,rd),uo=dot(u,oa);
  vec3 pe=oa-u*uo,rp=rd-u*ud;
  float a=dot(rp,rp),b=dot(pe,rp),c=dot(pe,pe)-r*r,h=b*b-a*c,res=-1.;
  if(h>=0.){
    float t=(-b-sqrt(h))/a,y=uo+t*ud;
    if(y>0.&&y<L){res=t;}
    else{vec3 oc=y<=0.?oa:ro-pb;float bb=dot(rd,oc),cc=dot(oc,oc)-r*r,hh=bb*bb-cc;if(hh>0.)res=-bb-sqrt(hh);}
  }
  return res;
}
// the whole deck structure's skin: tiers of dark plating with lit walkway recesses, seen as big masses
vec3 facade(vec3 P,vec3 N,float mat,float t,inout vec3 Em){
  vec2 fc=abs(N.x)>.5?vec2(P.z,P.y):(abs(N.z)>.5?vec2(P.x,P.y):P.xz);
  float lod=sat(1.6-t/420.);
  float LH=mat>3.5&&mat<4.5?4.6:6.5;
  float lv=floor(fc.y/LH),fv=fract(fc.y/LH);
  float bay=floor(fc.x/9.3+lv*.37);
  float hb=h21(vec2(bay,lv+mat*7.));
  float big=NS(vec3(fc*.13,lv*.3+mat),1.2);
  float mid=NS(vec3(fc*vec2(.9,.22),lv),.8);
  float str=NS(vec3(fc.x*1.6,fc.y*.05,mat*3.),.7);
  vec3 alb=vec3(.1,.105,.11)*(.45+1.1*big)*(.7+.5*hb);
  // salt and rust streaks
  alb=mix(alb,vec3(.16,.1,.07)*(.6+.9*mid),smoothstep(.55,.78,str)*.5);
  if(abs(N.y)<.5&&mat<5.5){
    // plate seams and stiffeners, fading with distance
    float sx=smoothstep(.0,.06,abs(fract(fc.x/3.1)-.5)),sy=smoothstep(.0,.05,abs(fract(fc.y/2.2)-.5));
    alb*=mix(1.,.75+.25*sx*sy,lod);
    // each tier: a deep dark walkway recess under the slab, lit by its row of lamps
    float rec=smoothstep(.56,.64,fv)*smoothstep(1.,.965,fv);
    float bayc=abs(fract(fc.x/9.3+lv*.37)-.5)*2.;
        alb*=mix(1.,.3,rec);
    // cladding panels, uneven, only seen where light falls on them
    float pnl=h21(vec2(floor(fc.x/3.7+lv*.5),lv+mat*3.));
    alb*=mix(1.,.8+.4*pnl,.8*lod);
    // tall pipe risers and cable trays at wide spacing, read as vertical dark bands
    float rs=abs(fract(fc.x/23.+.37)-.5)*23.;
    alb*=mix(1.,.4,smoothstep(1.4,.6,rs)*lod);
  }else if(N.y<0.){
    // the underside: deep steel girders, dark, with lamp pools between them
    float gx=abs(fract(P.x/8.)-.5)*8.,gz=abs(fract(P.z/8.)-.5)*8.;
    float beam=smoothstep(.5,1.9,min(gx,gz));
    alb*=.34+.66*beam;
    vec2 cc=floor(P.xz/8.);
    float hc=h21(cc+3.);
    float rr=length(fract(P.xz/8.)-.5);
    float lit=step(.45,hc);
    alb*=.75+.5*lit*exp(-rr*rr*4.);
  }
  return alb;
}
vec3 pipeSkin(vec3 P,float t){
  float big=NS(vec3(P.x+P.z,P.y*.3,P.x-P.z)*.2,1.2),str=NS(vec3((P.x+P.z)*1.4,P.y*.06,P.z),.7);
  vec3 alb=vec3(.12,.115,.1)*(.5+big);
  alb=mix(alb,vec3(.16,.09,.05),smoothstep(.45,.75,str)*.7);
  // the splash zone on legs: rust-black with marine growth up to a few metres, a pale salt line above it
  float gz=NS(vec3(P.x*.7,P.y*2.,P.z*.7),.5);
  alb=mix(alb,vec3(.13,.12,.1),smoothstep(7.,8.5,P.y)*smoothstep(11.,9.,P.y)*.6);
  alb=mix(alb,mix(vec3(.03,.035,.025),vec3(.07,.06,.035),gz),smoothstep(8.,5.5+gz*2.,P.y));
  return alb;
}
void main(){
  vec3 o=uP[0].xyz,d;
  float md=uP[0].w;
  vec2 res=uP[6].xy;
  if(md<.5){
    vec2 ndc=(gl_FragCoord.xy+vec2(uP[2].w,uP[3].w))/res*2.-1.;
    d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  }else{
    vec2 q=gl_FragCoord.xy/res;
    float az=(q.x-.5)*6.28318,el=mix(-.07,1.57,q.y);
    d=vec3(sin(az)*cos(el),sin(el),cos(az)*cos(el));
  }
  d+=vec3(1e-5,2e-5,-1.5e-5);
  vec3 inv=1./d;
  float best=1e7;
  vec3 N=vec3(0);
  float mat=-1.,hitI=-1.;
  int ng=int(uP[4].z);
  for(int g=0;g<ng;g++){
    vec4 gm=texelFetch(uPr,ivec2(2,g),0),gx=texelFetch(uPr,ivec2(3,g),0);
    vec3 t1=(gm.xyz-o)*inv,t2=(gx.xyz-o)*inv;
    vec3 t3=min(t1,t2),t4=max(t1,t2);
    float tn=max(max(t3.x,t3.y),t3.z),tf=min(min(t4.x,t4.y),t4.z);
    if(tf>max(tn,0.)&&tn<best){
      int s=int(gm.w),e=int(gx.w);
      for(int i=s;i<e;i++){
        vec4 a=texelFetch(uPr,ivec2(0,i),0),b=texelFetch(uPr,ivec2(1,i),0);
        if(a.w<0.){
          vec3 m=inv*(o-a.xyz),k=abs(inv)*b.xyz,p1=-m-k,p2=-m+k;
          float nn=max(max(p1.x,p1.y),p1.z),ff=min(min(p2.x,p2.y),p2.z);
          if(nn<ff&&ff>0.&&nn<best&&nn>0.){best=nn;mat=b.w;hitI=float(i);N=nn==p1.x?vec3(-sign(d.x),0.,0.):(nn==p1.y?vec3(0.,-sign(d.y),0.):vec3(0.,0.,-sign(d.z)));}
        }else{
          float t=capI(o,d,a.xyz,b.xyz,a.w);
          if(t>0.&&t<best){best=t;mat=b.w;hitI=float(i);
            vec3 ba=b.xyz-a.xyz,P=o+d*t-a.xyz;float h=clamp(dot(P,ba)/dot(ba,ba),0.,1.);N=normalize(P-ba*h);}
        }
      }
    }
  }
  // the ceiling or the sea plane at the far end of the ray
  float tE=best;
  float kind=mat<-.5?0.:1.;  // 0 open air, 1 rig
  float tSea=d.y<-.001?(-3.-o.y)/d.y:1e7;
  float cover=0.;
  if(d.y>.001&&kind<.5){
    float tc=(CY-o.y)/d.y;
    if(tc<14000.){tE=tc;kind=2.;}
  }
  if(tSea<tE){tE=tSea;kind=3.;}
  if(tE>9000.)tE=9000.;
  vec3 P=o+d*tE;
  // the medium: rain and sea air, closed-form in-scatter from the key lights (flare first)
  vec3 scat=vec3(0),flscat=vec3(0),E=vec3(0),flE=vec3(0);
  vec3 sN=kind<1.5?N:vec3(0,-1,0);
  int nk=int(uP[4].w);
  for(int i=0;i<nk;i++){
    vec4 lp=uK[3*i],lc=uK[3*i+1],ld=uK[3*i+2];
    vec3 ol=lp.xyz-o;
    float bl=dot(ol,d);
    vec3 cr=ol-d*bl;
    float c2=dot(cr,cr),s=sqrt(c2+lp.w);
    float integ=(atan((tE-bl)/s)+atan(bl/s))/s;
    float at=exp(-SIG*(max(bl,0.)*.7+sqrt(c2)));if(i==0)at*=exp(-sqrt(c2)*.0075);
    // at night the rain glows only near each lamp (uP[6].w: how fast its glow dies off the ray; 0 far off)
    else at*=exp(-sqrt(c2)*uP[6].w*(ld.w>1.5?.3:1.));
    float sg=length(ld.xyz);
    vec3 sc=lc.rgb*integ*at*sg;
    if(i==0)flscat+=sc;else scat+=sc;
    if(kind>0.5&&kind<2.5){
      vec3 L=lp.xyz-P;float d2=dot(L,L),il=1./sqrt(d2);L*=il;
      float wr=mat>7.5&&mat<8.5?.45:.2;
      float nl=kind>1.5?max(dot(L,vec3(0,-1,0)),0.)*(1.+.25*d2/(d2+90000.)):max((dot(sN,L)+wr)/(1.+wr),0.);
      vec3 e=lc.rgb*nl/(d2+lc.a)*exp(-SIG*sqrt(d2));
      if(i>0){
        // a fixture lights only what is near it, inside its cone
        float rw=sat(1.-d2/(lc.a*34.));rw*=rw;
        float cn=ld.w;
        e*=rw*(cn>1.5?0.:(cn<-1.5?1.:smoothstep(cn,cn+.4,dot(-L,ld.xyz/sg))));
      }
      if(i==0)flE+=e;else E+=e;
    }
  }
  if(kind>.5&&kind<1.5){E*=.35+1.5*(NS(P*.05,1.)*.6+NS(P*.16+3.1,1.)*.4);}
  scat*=.00011;flscat*=.0000034;
  float T=exp(-SIG*tE);
  // the night air's own faint light, by the ray's length (uP[8]); the steel keeps the old floor (uP[6].z)
  vec3 FOGC=uP[8].xyz;
  vec3 hazeAmb=FOGC*(1.-T);
  vec3 col=vec3(0);
  vec3 Em=vec3(0);
  float ff=0.;
  if(kind<.5||kind>2.5){
    // open air: only what the medium gives
  }else if(kind<1.5){
    vec3 alb;
    vec3 Pw=P;
    if(mat>2.5&&mat<3.5)alb=pipeSkin(Pw,tE);
    else if(mat>6.5){
      // painted steel: lattice (8), lifeboat orange (7), crane yellow (9), all salted and grimy
      float g1=NS(Pw*.35,1.),g2=NS(Pw*vec3(1.7,.3,1.7)+5.,.6);
      alb=mat<7.5?vec3(.42,.12,.03):(mat<8.5?vec3(.2,.19,.17):vec3(.36,.27,.06));
      alb*=(.55+.7*g1)*(.75+.4*g2);
      alb=mix(alb,vec3(.15,.09,.05),smoothstep(.6,.8,g2)*.6);
    }
    else alb=facade(Pw,N,mat,tE,Em);
    if(P.y<0.){alb=vec3(0);Em=vec3(0);}
    vec3 amb=vec3(.0056,.0049,.0046)*uP[6].z*.4*(.5+.5*sat(N.y+.5));
    vec3 lit=alb*(E*.34*uP[5].w+amb)+Em*alb*3.8;
    vec3 fl=alb*flE*.12;
    float l0=dot(lit+fl,vec3(.3,.5,.2)),l1=dot(fl,vec3(.3,.5,.2));
    ff=l1/(l0+1e-4);
    col=(lit+fl)*T;
  }else if(kind<2.5){
    // the ceiling: dark rolling cloud base catching the flare from below
    vec2 q=P.xz;
    float n1=NS(vec3(q*.0026,.3),1.),n2=NS(vec3(q*.0085+7.,.7),1.),n3=NS(vec3(q*.031+n2*.3,1.1),1.),n4=NS(vec3(q*.1+n3*.2,1.9),1.);
    float bump=n1*.5+n2*.28+n3*.15+n4*.07;
    vec3 alb=vec3(.28,.26,.24)*(.5+1.*bump)*mix(vec3(1.),vec3(.84,.95,1.12),uP[10].w);
    float pocket=smoothstep(.42,.62,bump);
    vec3 lit=alb*(E*1.4+vec3(.024,.016,.012)*(.08+2.4*pocket*pocket)+uP[9].rgb*uP[8].w);
    vec3 fl=alb*flE*.26*(.015+2.6*pocket*pocket);
    float l0=dot(lit+fl,vec3(.3,.5,.2)),l1=dot(fl,vec3(.3,.5,.2));
    ff=l1/(l0+1e-4);
    col=(lit+fl)*exp(-SIG*tE*.4)*uP[5].w; // near the rig the lit cloud keeps its strength over the darker air
    // the far ceiling melts into the rain
    float fade=smoothstep(.0,.16,d.y);
    col*=mix(.3,1.,fade);
  }
  col+=hazeAmb+scat;
  // a faint low band of light all round the sea's horizon: far platforms and lit cloud, very dim
  if(kind!=1.){
    float hz=exp(-abs(d.y)/.045);
    float az=NS(vec3(d.xz*3.+11.,2.2),.7)*.6+NS(vec3(d.xz*9.,4.1),.7)*.4;
    col+=vec3(1.,.5,.2)*hz*hz*(.0036+.013*smoothstep(.38,.7,az))*uP[10].x;
    // last light (uP[9], 0 at night): a cold band low over the side away from the flare
    float aw=.25+.75*sat(.5+.5*dot(normalize(d.xz+vec2(1e-4)),uP[10].yz));
    col+=uP[9].rgb*exp(-abs(d.y)*uP[9].w)*aw*aw*(.75+.5*az);
  }
  float L2=dot(col+flscat,vec3(.3,.5,.2)),Lf=dot(flscat,vec3(.3,.5,.2));
  col+=flscat;
  ff=sat(ff*(1.-Lf/(L2+1e-4))+Lf/(L2+1e-4));
  oC=vec4(col,ff);
}
`,L1=`
uniform vec4 uB[5];
uniform vec4 uBX[64];
uniform vec4 uBP;
uniform sampler2D uEnvS;
uniform sampler3D uN;
out vec4 oC;
float sat(float x){return clamp(x,0.,1.);}
#define NS(p,m) textureLod(uN,(p)/(m)*.0625,0.).r
float atan1(float y,float x){float a=abs(x)>1e-5?atan(y/x):1.5708*sign(y);if(x<0.)a+=y>=0.?3.14159:-3.14159;return a;}
void main(){
  vec2 ndc=(gl_FragCoord.xy+uBP.xy)/uBP.z*2.-1.;
  vec3 o=uB[0].xyz;
  vec3 d=normalize(uB[1].xyz+(ndc.x*uB[2].xyz+ndc.y*uB[3].xyz)*uB[1].w);
  vec3 inv=1./d;
  float best=1e7;vec3 N=vec3(0,1,0);float mat=-1.;vec4 ha=vec4(0),hb=vec4(1);
  vec3 ca=vec3(uB[4].x,0.,uB[4].y),cb=vec3(-uB[4].y,0.,uB[4].x);
  int n=int(uBP.w);
  for(int i=0;i<n;i++){
    vec4 a=uBX[2*i],b=uBX[2*i+1];
    // box in the boat's frame
    vec3 ro=vec3(dot(o-a.xyz,ca),o.y-a.y,dot(o-a.xyz,cb)),rd=vec3(dot(d,ca),d.y,dot(d,cb));
    vec3 ri=1./rd,m=ri*ro,k=abs(ri)*b.xyz,p1=-m-k,p2=-m+k;
    float nn=max(max(p1.x,p1.y),p1.z),ff=min(min(p2.x,p2.y),p2.z);
    if(nn<ff&&ff>0.&&nn<best&&nn>0.){
      best=nn;mat=a.w;ha=a;hb=b;
      vec3 ln=nn==p1.x?vec3(-sign(rd.x),0.,0.):(nn==p1.y?vec3(0.,-sign(rd.y),0.):vec3(0.,0.,-sign(rd.z)));
      N=ca*ln.x+vec3(0,ln.y,0)+cb*ln.z;
    }
  }
  if(mat<-.5){oC=vec4(0);return;}
  vec3 P=o+d*best;
  float along=dot(P,ca),acr=dot(P,cb);
  // where on its box the ray landed, -1 to 1 on each axis (along, up, across)
  vec3 lp=clamp(vec3(dot(P-ha.xyz,ca),P.y-ha.y,dot(P-ha.xyz,cb))/hb.xyz,-1.,1.);
  float n1=NS(P*vec3(.8,2.,.8),.7),n2=NS(P*vec3(4.,1.5,4.),.5);
  // wet oxide-red paint, rust bleeding through in streaks
  vec3 alb=mix(vec3(.09,.034,.026),vec3(.16,.075,.038),smoothstep(.5,.72,n1)*.8)*(.6+.6*n2);
  float wet=.5+.5*smoothstep(.3,.6,NS(P*vec3(.7,1.,.7)+9.,1.4));
  vec3 nn=normalize(N+(vec3(NS(P*5.,.4),0.,NS(P*5.+3.,.4))-vec3(.5,0.,.5))*.12*wet);
  float boost=.7;
  if(mat>1.5&&mat<2.5){
    // the capping: a rolled rail, round in section, so it holds each light as one long unbroken line
    nn=normalize(vec3(0,1,0)*sqrt(max(1.-lp.z*lp.z,0.))+cb*lp.z);
    wet=1.;boost=1.6;alb=vec3(.05,.042,.045);
  }else if(mat>3.5){
    // stanchions and rails: round tubes
    nn=hb.x<hb.y?normalize(N*sqrt(max(1.-lp.x*lp.x,0.))+ca*lp.x):normalize(N*sqrt(max(1.-lp.y*lp.y,0.))+vec3(0,lp.y,0));
    wet=1.;boost=1.1;alb*=1.3;
  }else if(mat<.5){
    // the deck: planks fore and aft with dark seams; standing water lies in the low places as flat mirrors
    float pl=abs(fract(acr/.24)-.5)*.24,seam=smoothstep(.004,.014,pl);
    float pud=smoothstep(.58,.62,NS(vec3(P.xz*vec2(.6,1.1),.4),1.)*.8+n2*.2);
    nn=normalize(mix(nn+vec3(n2-.5,0.,n1-.5)*.08,vec3(0,1,0),pud));
    wet=mix(.2,1.,pud);boost=mix(.3,.75,pud)*mix(.3,1.,max(seam,pud));alb=vec3(.07,.05,.034)*(.7+.5*n2)*mix(.4,1.,seam);
  }
  vec3 r=reflect(d,nn);
  // the flare itself in the wet paint: a broad glossy lobe, so the round capping carries one long orange line
  float fs=pow(sat(dot(r,normalize(vec3(uB[0].w,.62,uB[4].z)))),14.)*(mat>1.5&&mat<2.5?1.:mat>3.5?.5:.12);
  r.y=abs(r.y);
  vec2 uvE=vec2(atan1(r.x,r.z)/6.28318+.5,(asin(clamp(r.y,0.,1.))+.07)/1.64);
  vec3 env=texture(uEnvS,uvE).rgb;
  float cv=sat(dot(-d,nn));
  float F=.05+.95*pow(1.-cv,5.);
  vec3 col=env*F*(.5+1.2*wet)*boost+vec3(1.,.48,.15)*fs*.09*uB[4].w;
  if(mat>2.5&&mat<3.5){
    // deck house: dark wet plate, a few dim yellow ports
    vec2 fc=abs(N.y)>.5?vec2(0.):vec2(acr+along,P.y);
    float wy=abs(fract((fc.y+.5)/2.5)-.5)*2.5,wx=abs(fract(fc.x/2.1)-.5)*2.1;
    float win=smoothstep(.16,.0,max(wx-.34,wy-.26))*step(1.2,P.y)*step(.42,fract(sin(floor(fc.x/2.1)*12.9+floor((fc.y+.5)/2.5)*78.2)*437.5));
    col+=vec3(1.,.66,.3)*win*.16*sat(1.-abs(N.y)*2.)*(.4+.8*n2);
  }
  if(mat>.5&&mat<1.5&&abs(N.y)<.5){
    // rust running down from the capping, and scuffed paint
    float st=NS(vec3(along*2.6,P.y*.1,1.7),.5);
    float rs=smoothstep(.56,.8,st)*smoothstep(.0,1.,P.y-1.);
    col*=1.-.45*rs;alb=mix(alb,vec3(.2,.08,.03),rs);
    // the stiffeners behind the plating: narrow shadowed ribs, each with a hard wet glint on its edge
    float sp=fract(along/1.45+.3),sy=smoothstep(.95,1.2,P.y)*smoothstep(2.15,1.9,P.y);
    col*=1.-.55*smoothstep(.0,.02,sp)*smoothstep(.07,.05,sp)*sy;col+=env*.5*smoothstep(.066,.074,sp)*smoothstep(.09,.078,sp)*sy;
  }
  // the flare's dull orange falling on anything that faces up and out
  vec3 Fd=normalize(vec3(uB[0].w,1.,uB[4].z));
  col+=alb*vec3(1.,.45,.12)*.05*sat(dot(N,Fd))*uB[4].w;
  // the night's own cold light: the boat is never a neutral black hole
  col+=alb*vec3(.05,.045,.065)+vec3(.0056,.005,.0078);
  oC=vec4(pow(max(col,vec3(0.)),vec3(1./2.2)),1.);
}
`,N1=`
uniform vec4 uC[5];
uniform sampler2D uD;
out vec2 vQ;out vec3 vC;out float vK;out float vM;
float atan1(float y,float x){float a=abs(x)>1e-5?atan(y/x):1.5708*sign(y);if(x<0.)a+=y>=0.?3.14159:-3.14159;return a;}
void main(){
  vec4 a=texelFetch(uD,ivec2(0,gl_InstanceID),0),b=texelFetch(uD,ivec2(1,gl_InstanceID),0);
  vec2 q=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;
  vQ=q;vC=b.rgb;vK=b.a;vM=uC[0].w*uC[4].y;
  vec3 v=a.xyz-uC[0].xyz;
  float dd=length(v),sz=a.w;
  vec2 ndc;vec2 ext;
  if(uC[0].w<.5){
    float z=dot(v,uC[1].xyz),tn=uC[1].w;
    if(z<.5){gl_Position=vec4(0,0,-3,1);return;}
    ndc=vec2(dot(v,uC[2].xyz),dot(v,uC[3].xyz))/(z*tn);
    ext=vec2(sz/tn);
  }else{
    vec3 w=v/dd;
    float az=atan1(w.x,w.z);
    float el=asin(clamp(w.y,-1.,1.));
    ndc=vec2(az/3.14159,(el+.07)/1.64*2.-1.);
    ext=vec2(sz/3.14159,sz/.82)*max(cos(el),.2);
    if(el>1.45)ext.x=0.;
  }
  gl_Position=vec4(ndc+q*ext*uC[4].x,0.,1.);
}
`,S1=`
in vec2 vQ;in vec3 vC;in float vK;in float vM;
out vec4 oC;
void main(){
  float r2=dot(vQ,vQ);
  if(r2>1.)discard;
  // a hot point, a tight bloom and a broad rain halo; the edge eases to zero
  float e=1.-r2;
  float core=exp(-r2*1500.)*17.,tight=exp(-r2*380.)*1.05,halo=exp(-r2*20.)*.16*e;
  float wide=exp(-r2*2.5)*.034*e*e;
  // in the reflection map a strong lamp is a broader hot patch: the swell's facets find it and draw its column
  if(vM>.5)tight+=exp(-r2*45.)*1.6*vK*vK*vK;
  oC=vec4(vC*(core*vK+tight+halo+wide),0.);
}
`,k1=`
uniform sampler2D uA;uniform vec4 uQ;
out vec4 oC;
void main(){
  vec2 uv=gl_FragCoord.xy*uQ.xy;
  vec4 s=vec4(0);float w=0.;
  for(int i=-10;i<=10;i++){float f=float(i)/10.;float g=exp(-f*f*3.2);s+=texture(uA,uv+uQ.zw*f)*g;w+=g;}
  oC=s/w;
}
`,C1=`
uniform vec4 uW[28];uniform vec4 uQ;
out vec4 oC;
void main(){
  vec2 p=gl_FragCoord.xy*uQ.x;float n=uQ.y,t=uQ.z;
  vec3 s=vec3(0);
  for(int i=0;i<28;i++){
    if(float(i)>=n)break;
    vec4 w=uW[i];
    float ph=dot(w.xy,p)-w.w*t;
    float si=sin(ph),co=cos(ph);
    s.xy+=w.xy*w.z*co;s.z+=w.z*si;
  }
  oC=vec4(s,1.);
}
`,U1=`
uniform vec4 uF[8];
uniform sampler3D uN;
out vec4 oC;
float sat(float x){return clamp(x,0.,1.);}
vec3 ramp(float x){
  vec3 lo=mix(vec3(.5,.06,.01),vec3(1.,.28,.03),sat(x*2.));
  vec3 hi=mix(vec3(1.,.47,.09),vec3(1.,.9,.62),pow(sat(x*2.-1.),2.2));
  return mix(lo,hi,step(.5,x))*(.5+x*x*x*9.);
}
void main(){
  vec2 uv=gl_FragCoord.xy*vec2(uF[3].w,uF[4].w);
  uv=uv*uF[0].zw+uF[0].xy;
  vec2 ndc=uv*2.-1.;
  vec3 o=uF[1].xyz;float T=uF[1].w;
  vec3 d=normalize(uF[2].xyz+(ndc.x*uF[3].xyz+ndc.y*uF[4].xyz)*uF[2].w);
  vec3 tip=uF[5].xyz;float L=uF[5].w;vec3 W=uF[6].xyz;vec3 Wb=uF[7].xyz;
  vec3 C=tip+W*L*.58;float Rb=L*.86;
  vec3 oc=o-C;float b=dot(oc,d),c=dot(oc,oc)-Rb*Rb,h=b*b-c;
  vec3 acc=vec3(0);float tr=1.;
  if(h>0.){
    h=sqrt(h);float t0=-b-h,t1=-b+h;
    const int ST=26;
    float dt=(t1-t0)/float(ST),jit=.38+.24*fract(52.9829*fract(dot(gl_FragCoord.xy,vec2(.06711,.00584))));
    float gw=uF[6].w,kS=uF[7].w;
    for(int i=0;i<ST;i++){
      vec3 P=o+d*(t0+dt*(float(i)+jit));
      vec3 q=P-tip;
      float s=dot(q,W)/L;
      vec3 ax=W*s*L+Wb*s*s*L*.34+Wb*sin(T*.7+s*4.)*.02*L*s;
      float r=length(q-ax)/L;
      // tearing turbulence rising along the flame
      vec3 nq=(P/L)-W*T*.55-Wb*T*.18;
      float n1=textureLod(uN,nq*.19,0.).r;
      float n2=textureLod(uN,nq*.52+(n1-.5)*.22,0.).r;
      float n3=textureLod(uN,nq*1.36+vec3(n2-.5)*.12,0.).r;
      float fb=(n1*.5+n2*.34+n3*.16)-.5;
      // the jet pinches at the tip, swells and tears apart further up
      float Rp=mix(.04,.19*kS,smoothstep(.0,.3,s))*mix(1.,.72,smoothstep(.55,1.05,s))*(1.+.35*gw);
      float base=smoothstep(-.1,.06,s);
      float f=(1.-r/Rp)*base+fb*(2.8+s*3.4)*base*smoothstep(1.35,.9,s);
      if(f>0.){
        float dens=smoothstep(.0,.3,f);
        // temperature: hot along the jet core, cooler up and out
        float core=sat(1.-r/(Rp*.42))*sat(1.1-s*1.15);
        float temp=sat(mix(f*.8,1.,core)*(1.-sat(s-.15)*.6));
        vec3 em=ramp(temp)*dens;
        // soot rims and the dark smoke the flame sheds at its top
        float soot=dens*(1.-sat(temp*2.4))*(smoothstep(.2,.8,s)+.2);
        float ds=dt/L;
        acc+=tr*em*ds*24.;
        tr*=exp(-(soot*26.+dens*2.2)*ds);
      }
      // rolling smoke torn off the top, lit from inside by the flame beneath it
      float sm=sat((fb+.1)*3.2)*smoothstep(.5,.95,s)*smoothstep(1.45,1.05,s)*sat(1.-r/(Rp*2.8));
      if(sm>0.){float ds=dt/L;acc+=tr*vec3(.5,.17,.04)*sm*exp(-(s-.55)*3.)*ds*5.;tr*=exp(-sm*7.*ds);}
    }
  }
  oC=vec4(acc,tr);
}
`,D1=`
uniform vec4 uC[6];uniform vec4 uCa[4];uniform vec4 uB[3];uniform vec4 uSw[4];uniform vec4 uFr;uniform vec4 uLg[28];
uniform sampler2D uA,uEnv,uEnvS,uBl,uW1,uW2,uFl,uBo,uRn;uniform sampler3D uN;
out vec4 oC;
float sat(float x){return clamp(x,0.,1.);}
float hs(vec2 p){float h=0.;for(int i=0;i<4;i++){vec4 s=uSw[i];h+=s.z*sin(dot(s.xy,p)+s.w);}return h;}
float atan1(float y,float x){float a=abs(x)>1e-5?atan(y/x):1.5708*sign(y);if(x<0.)a+=y>=0.?3.14159:-3.14159;return a;}
void main(){
  vec2 uv0=gl_FragCoord.xy*uC[0].x;
  vec2 ndc=uv0*2.-1.;
  vec3 o=uCa[0].xyz;
  vec3 d=normalize(uCa[1].xyz+(ndc.x*uCa[2].xyz+ndc.y*uCa[3].xyz)*uCa[1].w);
  float flick=uC[0].w,T0=uC[0].y,SIG=uC[1].z;
  float fw=dot(d,uB[0].xyz);
  vec2 tb=vec2(dot(d,uB[1].xyz),dot(d,uB[2].xyz))/(max(fw,.05)*uB[0].w)+vec2(uB[1].w,uB[2].w);
  vec2 ub=.5+.5*tb;
  vec4 a=texture(uA,ub);
  vec3 col=a.rgb*mix(1.,flick,a.a);
  bool water=false;float t=0.;
  if(d.y<-.0002){
    float HM=uC[1].x;
    float tA=max((HM-o.y)/d.y,0.),tB=min((-HM-o.y)/d.y,3200.);
    float pT=tA;float pD=(o+d*tA).y-hs((o+d*tA).xz);
    for(int i=1;i<=9;i++){
      float f=float(i)/9.,tt=tA+(tB-tA)*f*f;
      vec3 P=o+d*tt;float dd=P.y-hs(P.xz);
      if(dd<0.){
        for(int j=0;j<3;j++){float tm=pT+(tt-pT)*pD/(pD-dd);vec3 Q=o+d*tm;float dm=Q.y-hs(Q.xz);if(dm>0.){pT=tm;pD=dm;}else{tt=tm;dd=dm;}}
        t=tt;water=true;break;
      }
      pT=tt;pD=dd;
    }
    if(!water){t=-o.y/d.y;water=true;}
  }
  if(water){
    vec3 P=o+d*t;
    float fp=t*t/(max(o.y,1.)*uC[2].x),fx=t*uC[2].y;
    float lodA=sat(1.4-max(fp,fx)/9.),lodB=sat(1.4-max(fp,fx)/2.4);
    vec2 g=vec2(0);
    for(int i=0;i<4;i++){vec4 s=uSw[i];g+=s.xy*s.z*cos(dot(s.xy,P.xz)+s.w);}
    float sb=dot(g,normalize(d.xz+1e-5));float swf=1.+clamp(sb*9.,-.55,.85);
    vec4 c1=texture(uW1,P.xz*uC[2].z),c2=texture(uW2,P.xz*uC[2].w);
    g+=c1.xy*lodA+c2.xy*lodB;
    // small wind ripple and rain pitting the surface near the boat
    float nr=sat(1.-t/uC[1].w);
    if(nr>0.){
      vec2 q=P.xz*.075;float z=T0*.5,e=.012;
      vec2 r1=vec2(textureLod(uN,vec3(q+vec2(e,0.),z),0.).r-textureLod(uN,vec3(q-vec2(e,0.),z),0.).r,textureLod(uN,vec3(q+vec2(0.,e),z),0.).r-textureLod(uN,vec3(q-vec2(0.,e),z),0.).r);
      vec2 q2=P.xz*.23+vec2(.13,.71);e=.006;z=T0*.95;
      vec2 r2=vec2(textureLod(uN,vec3(q2+vec2(e,0.),z),0.).r-textureLod(uN,vec3(q2-vec2(e,0.),z),0.).r,textureLod(uN,vec3(q2+vec2(0.,e),z),0.).r-textureLod(uN,vec3(q2-vec2(0.,e),z),0.).r);
      g+=(r1*uC[3].z*.32+r2*uC[3].z*.16*(1.+uC[3].x*20.))*nr*nr;
    }
    vec3 n=normalize(vec3(-g.x,1.,-g.y));
    float cv=sat(dot(-d,n));
    float F=.022+.978*pow(1.-cv,5.);
    vec3 r=reflect(d,n);r.y=abs(r.y)+.003;
    // parallax-corrected lookup: a sphere about the platform's distance
    vec3 oc=P-o;float b=dot(oc,r),cc=dot(oc,oc)-uC[1].y*uC[1].y;
    vec3 q=normalize(oc+r*(-b+sqrt(max(b*b-cc,0.))));
    vec2 uvE=vec2(atan1(q.x,q.z)/6.28318+.5,(asin(clamp(q.y,0.,1.))+.07)/1.64);
    vec4 e=texture(uEnv,uvE),es=texture(uEnvS,uvE);
    float sm=sat(.32+t/170.);
    vec3 rf=mix(e.rgb*mix(1.,flick,e.a),es.rgb*mix(1.,flick,es.a),sm);
    rf=max(rf-.04,vec3(0.));rf=rf*rf/(rf+.2)*2.4;
    float T=exp(-SIG*1.5*t);
    // the far surface's long streaks broken by the swell's fine structure
    if(t>60.){float br=textureLod(uN,vec3(P.xz*vec2(.012,.05),T0*.06),0.).r;rf*=mix(1.,.45+1.2*br,sat((t-60.)/240.));}
    // a heavy swell breaks a path into fewer, larger dashes with black between: only the swells' faces turned to
    // the light carry it (uC[5].w; 0 on every other mint)
    rf*=mix(1.,smoothstep(.6,1.7,swf)*1.7,uC[5].w);
    vec3 body=vec3(.0015,.003,.004);
    col=(rf*swf*F*uC[3].y+body)*T+a.rgb*mix(1.,flick,a.a);
  }else if(uFr.z>0.){
    vec2 fq=(ub-uFr.xy)/uFr.zw;
    if(fq.x>0.&&fq.x<1.&&fq.y>0.&&fq.y<1.){vec4 f=texture(uFl,fq);col=col*f.a+f.rgb*flick;}
  }
  // white water: the swell surging up each leg and lacing the sea round it, lit from the decks above
  float fo=0.,fT=1.;
  int nl=d.y<.012?int(uLg[0].x):0;
  for(int i=0;i<nl;i++){
    // per leg: position, radius and the sea's height there; the run-up top, ring width and strength (set per frame)
    vec4 l=uLg[2+2*i],m=uLg[3+2*i];
    float h=l.w;
    vec2 oc=o.xz-l.xy;float a2=dot(d.xz,d.xz),tl=-dot(oc,d.xz)/max(a2,1e-6);
    vec3 Q=o+d*tl;float rr=length(Q.xz-l.xy);
    if(tl>0.&&rr<l.z+1.4&&(!water||tl<t+l.z)){
      float nz=textureLod(uN,vec3((Q.x+Q.z)*.028,Q.y*.035-T0*.05,T0*.02+float(i)*.37),0.).r;
      float top=m.x-nz*2.6;
      float f=smoothstep(top,top-.9,Q.y)*smoothstep(h-1.2,h-.2,Q.y)*smoothstep(l.z+1.2,l.z*.4,rr)*smoothstep(.22,.6,nz);
      if(f>fo){fo=f;fT=exp(-SIG*tl);}
    }
    // the foam ring is drawn out down-swell into a ragged tail
    vec3 Pw=o+d*t;vec2 rq=Pw.xz-l.xy,sd=normalize(uSw[0].xy);float ra=dot(rq,sd),rb=dot(rq,vec2(-sd.y,sd.x));
    float dl=length(vec2(ra>0.?ra*.33:ra,rb))-l.z;
    if(water&&dl<m.y*4.){
      vec3 P=Pw;
      float nz=textureLod(uN,vec3(P.xz*.025,T0*.03+float(i)*.37),0.).r;
      float nz2=textureLod(uN,vec3(P.xz*.06,T0*.05+float(i)*.21),0.).r;
      float f=exp(-max(dl,0.)/m.y)*smoothstep(.45,.85,nz*.6+nz2*.4+m.z)*m.w;
      if(f>fo){fo=f;fT=exp(-SIG*t);}
    }
  }
  if(fo>0.){vec3 fc=uLg[1].rgb*fT*flick;col=mix(col,fc,sat(fo)*.9);}
  // the lens's wide bloom, and the flare's halo in the wet air
  col+=texture(uBl,ub).rgb*uC[4].x;
  float fd=dot(d,uC[5].xyz);
  if(fd>.8){float e2=fd*fd,e4=e2*e2,e8=e4*e4,e16=e8*e8;float g=uC[4].y*flick*(e16*.012+e16*e16*e16*.06);col+=vec3(1.,.42,.1)*g;}
  // the boat's rail and deck, fixed to the camera
  vec4 bo=texture(uBo,uv0);
  if(bo.a>0.){vec3 bc=pow(bo.rgb/max(bo.a,.002),vec3(2.2))*bo.a;col=col*(1.-bo.a)+bc*mix(1.,flick,.5);}
  // rain: long soft streaks that only show where there is light to catch
  float rain=uC[4].z;
  if(rain>0.){
    float sl=uC[4].w;
    vec2 q=vec2(ndc.x+ndc.y*sl,ndc.y)*vec2(1.,.9);
    float a1=texture(uRn,q*vec2(1.5,1.1)+vec2(T0*.07,T0*5.2)).r;
    float a2=texture(uRn,q*vec2(3.1,1.9)+vec2(-T0*.05,T0*8.)).r;
    float a3=texture(uRn,q*vec2(6.3,3.1)+vec2(T0*.03,T0*11.8)).r;
    float st=max(a1-.75,0.)*1.5+max(a2-.8,0.)*1.1+max(a3-.84,0.)*.7;
    float lum=dot(col,vec3(.4,.45,.15));
    col+=st*rain*vec3(.7,.75,.85)*(.13+1.5*lum);
  }
  // long-exposure curtains of rain in the lit air
  float cu=textureLod(uN,vec3(ndc*.21+vec2(T0*.016,0.),T0*.008),0.).r+textureLod(uN,vec3(ndc.yx*.6+vec2(-T0*.024,T0*.01),T0*.02),0.).r*.6-.8;
  col*=1.+cu*.34*(1.-sat(dot(col,vec3(.3,.5,.2))*1.4));
  // exposure and a photographic shoulder
  col*=uC[3].w;
  vec3 x=col;
  col=x*(1.+x/144.)/(1.+x);
  col=pow(clamp(col,0.,1.),vec3(1./2.2));
  col=mix(col,col*col*(3.-2.*col),.42);
  float gg=fract(sin(dot(gl_FragCoord.xy+T0,vec2(12.9898,78.233)))*43758.5453);
  col+=(gg-.5)*.014;
  float v=dot(ndc,ndc);col*=1.-v*.1;
  oC=vec4(col,1.);
}
`,B1=(s,o)=>{const z=(E,Z,i)=>{if(E.indexOf(Z)<0)throw new Error("618 NF "+s+" "+Z);return E.split(Z).join(i)},y="0.0625",Y=E=>z(E,"out vec4 oC;","layout(location=0) out vec4 oC;layout(location=1) out vec4 oC2;");return s==="scene"?z(Y(o),"oC=vec4(col,ff);","oC=vec4(col*"+y+",ff);oC2=vec4(col,ff);"):s==="lamp"?z(Y(o),"oC=vec4(vC*(core*vK+tight+halo+wide),0.);","oC2=vec4(vC*(core*vK+tight+halo+wide),0.);oC=vec4(oC2.rgb*"+y+",0.);"):s==="flame"?z(z(o,"out vec4 oC;","out uvec4 oC;"),"oC=vec4(acc,tr);","oC=uvec4(packHalf2x16(vec2(acc.r,0.)),packHalf2x16(vec2(acc.g,0.)),packHalf2x16(vec2(acc.b,0.)),packHalf2x16(vec2(tr,0.)));"):s==="boat"?z(o,"vec3 env=texture(uEnvS,uvE).rgb;","vec3 env=texture(uEnvS,uvE).rgb/"+y+";"):s==="wave"?z(z(o,"out vec4 oC;","out uvec4 oC;"),"oC=vec4(s,1.);","oC=uvec4(packHalf2x16(vec2(s.x,0.)),packHalf2x16(vec2(s.y,0.)),packHalf2x16(vec2(s.z,0.)),15360u);"):s==="comp"?(o=z(o,"uniform sampler2D uA,uEnv,uEnvS,uBl,uW1,uW2,uFl,uBo,uRn;",`uniform sampler2D uA,uAl,uEnv,uEnvS,uBl,uBo,uRn;uniform highp usampler2D uW1,uW2,uFl,uFl2;
vec4 nfH(uvec4 u){return vec4(unpackHalf2x16(u.x).x,unpackHalf2x16(u.y).x,unpackHalf2x16(u.z).x,unpackHalf2x16(u.w).x);}
vec4 nfW(highp usampler2D s,vec2 uv){ivec2 m=textureSize(s,0)-1;vec2 p=uv*vec2(m+1)-.5,q=floor(p),f=p-q;ivec2 i=ivec2(q);return mix(mix(nfH(texelFetch(s,i&m,0)),nfH(texelFetch(s,(i+ivec2(1,0))&m,0)),f.x),mix(nfH(texelFetch(s,(i+ivec2(0,1))&m,0)),nfH(texelFetch(s,(i+1)&m,0)),f.x),f.y);}
vec4 nfF2(ivec2 i,ivec2 m){i=clamp(i,ivec2(0),m);vec4 a=nfH(texelFetch(uFl,i,0)),b=nfH(texelFetch(uFl2,i,0));return vec4(b.rgb+a.rgb*b.a,a.a*b.a);}
vec4 nfF(vec2 uv){ivec2 m=textureSize(uFl,0)-1;vec2 p=uv*vec2(m+1)-.5,q=floor(p),f=p-q;ivec2 i=ivec2(q);return mix(mix(nfF2(i,m),nfF2(i+ivec2(1,0),m),f.x),mix(nfF2(i+ivec2(0,1),m),nfF2(i+1,m),f.x),f.y);}`),o=z(o,"vec4 a=texture(uA,ub);","vec4 a=texture(uA,ub),al=texture(uAl,ub);a.rgb=mix(al.rgb,a.rgb/"+y+",step(.9,al.rgb));"),o=z(o,"vec4 c1=texture(uW1,P.xz*uC[2].z),c2=texture(uW2,P.xz*uC[2].w);","vec4 c1=nfW(uW1,P.xz*uC[2].z),c2=nfW(uW2,P.xz*uC[2].w);"),o=z(o,"vec4 e=texture(uEnv,uvE),es=texture(uEnvS,uvE);","vec4 e=texture(uEnv,uvE),es=texture(uEnvS,uvE);e.rgb/="+y+";es.rgb/="+y+";"),o=z(o,"vec4 f=texture(uFl,fq);","vec4 f=nfF(fq);"),z(o,"col+=texture(uBl,ub).rgb*uC[4].x;","col+=texture(uBl,ub).rgb/"+y+"*uC[4].x;")):o};function X1(s){if(s.__c618)return s.__c618;s.getExtension("KHR_parallel_shader_compile");const o=!!s.getExtension("EXT_color_buffer_float"),z=!!s.getExtension("EXT_color_buffer_half_float")||o;s.getExtension("OES_texture_float_linear");const y=(N,K)=>{const et=s.createShader(N);return s.shaderSource(et,K),s.compileShader(et),et},Y={},E=y(s.VERTEX_SHADER,go+_1),Z=y(s.VERTEX_SHADER,go+N1),i=(N,K,et)=>{const T=y(s.FRAGMENT_SHADER,go+(z?K:B1(N,K))),q=s.createProgram();s.attachShader(q,et),s.attachShader(q,T),s.linkProgram(q),s.flush(),Y[N]={p:q,f:T}};i("scene",g1,E),i("boat",L1,E),i("lamp",S1,Z),i("blur",k1,E),i("wave",C1,E),i("flame",U1,E),i("comp",D1,E);let M=1636465422;const C=64,G=new Float32Array(C*C*C),U=new Float32Array(C*C*C);for(let N=0;N<G.length;N++){M=M+1831565813|0;let K=Math.imul(M^M>>>15,1|M);K=K+Math.imul(K^K>>>7,61|K)^K,G[N]=((K^K>>>14)>>>0)/4294967296}const gt=(N,K,et)=>{for(let T=0;T<C;T++)for(let q=0;q<C;q++)for(let Tt=0;Tt<C;Tt++){const Lt=Tt+64*(q+64*T),Jt=et===1?Tt:et===64?q:T,ue=Lt-Jt*et;K[Lt]=.25*N[ue+(Jt+63&63)*et]+.5*N[Lt]+.25*N[ue+(Jt+1&63)*et]}};gt(G,U,1),gt(U,G,64),gt(G,U,4096);let at=1e9,Me=-1e9;for(let N=0;N<U.length;N++)U[N]<at&&(at=U[N]),U[N]>Me&&(Me=U[N]);const bt=new Uint8Array(C*C*C),Je=255/(Me-at);for(let N=0;N<U.length;N++)bt[N]=(U[N]-at)*Je;const Wt=128,B=256,Gt=new Uint8Array(Wt*B);for(let N=0;N<300;N++){M=M+1831565813|0;const K=(M^M>>>11)>>>0,et=K%Wt,T=(K>>>8)%B,q=12+(K>>>20)%40,Tt=90+(K>>>24)%165;for(let Lt=0;Lt<q;Lt++){const Jt=T+Lt&B-1,ue=Math.sin(Lt/q*3.14159);Gt[et+Jt*Wt]=Math.max(Gt[et+Jt*Wt],Tt*ue)}}return s.__c618={P:Y,flt:z,vao:s.createVertexArray(),tN:null,tS:null,linked:!1,u8:bt,rs:Gt,R:Wt,RH:B}}function I1(s,o){if(o.linked)return;const z=o.P,y=["uN","uPr","uA","uEnv","uEnvS","uBl","uW1","uW2","uFl","uBo","uRn","uD"],Y=["uP","uLg","uK","uB","uBX","uBP","uC","uQ","uW","uF","uCa","uSw","uFr"];for(const i in z){const{p:M,f:C}=z[i];if(!s.getProgramParameter(M,s.LINK_STATUS))throw new Error("618 "+i+": "+(s.getShaderInfoLog(C)||"")+s.getProgramInfoLog(M));s.useProgram(M),y.forEach((U,gt)=>{const at=s.getUniformLocation(M,U);at&&s.uniform1i(at,gt)});const G={p:M};for(const U of Y)G[U]=s.getUniformLocation(M,U);z[i]=G}const E=s.createTexture();s.bindTexture(s.TEXTURE_3D,E),s.pixelStorei(s.UNPACK_ALIGNMENT,1),s.texImage3D(s.TEXTURE_3D,0,s.R8,64,64,64,0,s.RED,s.UNSIGNED_BYTE,o.u8),s.texParameteri(s.TEXTURE_3D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_3D,s.TEXTURE_MAG_FILTER,s.LINEAR);for(const i of[s.TEXTURE_WRAP_S,s.TEXTURE_WRAP_T,s.TEXTURE_WRAP_R])s.texParameteri(s.TEXTURE_3D,i,s.REPEAT);const Z=s.createTexture();s.bindTexture(s.TEXTURE_2D,Z),s.texImage2D(s.TEXTURE_2D,0,s.R8,o.R,o.RH,0,s.RED,s.UNSIGNED_BYTE,o.rs),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.REPEAT),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.REPEAT),s.pixelStorei(s.UNPACK_ALIGNMENT,4),o.flt||(s.useProgram(z.comp.p),s.uniform1i(s.getUniformLocation(z.comp.p,"uFl2"),12),s.uniform1i(s.getUniformLocation(z.comp.p,"uAl"),13)),o.tN=E,o.tS=Z,o.u8=null,o.rs=null,o.linked=!0}function _t(s,o,z,y,Y,E,Z){const i=s.createTexture();s.bindTexture(s.TEXTURE_2D,i);const M=Y==="u"&&!o.flt;Y&&o.flt?s.texImage2D(s.TEXTURE_2D,0,s.RGBA16F,z,y,0,s.RGBA,s.HALF_FLOAT,null):M?s.texImage2D(s.TEXTURE_2D,0,s.RGBA16UI,z,y,0,s.RGBA_INTEGER,s.UNSIGNED_SHORT,null):Y?s.texImage2D(s.TEXTURE_2D,0,s.SRGB8_ALPHA8,z,y,0,s.RGBA,s.UNSIGNED_BYTE,null):s.texImage2D(s.TEXTURE_2D,0,s.RGBA8,z,y,0,s.RGBA,s.UNSIGNED_BYTE,null),M&&(E=s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,E),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,E),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,Z||s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,Z===s.REPEAT?s.REPEAT:s.CLAMP_TO_EDGE);const C=s.createFramebuffer();return s.bindFramebuffer(s.FRAMEBUFFER,C),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,i,0),M?s.clearBufferuiv(s.COLOR,0,new Uint32Array(4)):(s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT)),s.bindFramebuffer(s.FRAMEBUFFER,null),{tex:i,fb:C,w:z,h:y}}ua.add({num:618,name:"Oil Rig",fam:"Vistas",recipe:"Low on a boat in a long swell beside an oil platform in the rain, with hundreds of work lights shining in broken columns on the black water and the flare lighting up the cloud overhead. The rain, the flare, the swell and where the boat sits change every mint, and a few are at last light with the rig black against the sky. No controls, just look.",gl:!0,music:!1,fps:30,seed:0,make(s){const o=s.gl,z=s.size,y=X1(o);let Y=parseInt(s.hash.slice(2,10),16)|0;const E=()=>{Y=Y+1831565813|0;let t=Math.imul(Y^Y>>>15,1|Y);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let Z=Math.imul((parseInt(s.hash.slice(2,10),16)|0)^3807169,739982445)|0;const i=()=>{Z=Z+1831565813|0;let t=Math.imul(Z^Z>>>15,1|Z);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},M=(t,e)=>t+i()*(e-t),C=t=>{let e=0;for(const r of t)e+=r[1];let a=E()*e;for(const r of t)if(a-=r[1],a<=0)return r[0];return t[0][0]},G=s.home,U=G?"Steady":C([["Steady",5],["Driving",3],["Drizzle",3],["Squall",1]]),gt=G?"Full burn":C([["Full burn",5],["Roaring",2],["Low flame",3],["Twin tips",1]]),at=G?"Long swell":C([["Long swell",5],["Heavy swell",3],["Oily calm",2]]),Me=G?"Mixed floods":C([["Sodium",5],["Mixed floods",3],["White floods",2],["Old amber",2]]);let bt=G?"Jacket":C([["Jacket",5],["Semi-sub",3],["Tall jacket",2]]);const Je=G?"Starboard":C([["Starboard",3],["Port",2]]),Wt=G?"Low ceiling":C([["Low ceiling",5],["Very low",2],["High",2]]);let B=G?"Alongside":C([["Alongside",5],["Standing off",3],["Close in",2]]),Gt=Math.imul((parseInt(s.hash.slice(2,10),16)|0)^7281198,1540483477)|0;const N=()=>{Gt=Gt+1831565813|0;let t=Math.imul(Gt^Gt>>>15,1|Gt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},K=N(),et=N();!G&&K<.2&&(bt="Jack-up"),!G&&et<.17&&(B="Far off"),s.trait("Rain",U),s.trait("Flare",gt),s.trait("Swell",at),s.trait("Lamps",Me),s.trait("Platform",bt),s.trait("Side",Je),s.trait("Cloud",Wt),s.trait("Lying",B);const T=Je==="Port"?-1:1,q=B==="Far off";let Tt=Math.imul((parseInt(s.hash.slice(2,10),16)|0)^2842259,73244475)|0;const Lt=()=>{Tt=Tt+1831565813|0;let t=Math.imul(Tt^Tt>>>15,1|Tt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Jt=Lt(),ue=G?0:Math.min(2,Math.floor(Jt*3)),q1=[5.4,3,9][ue];let Ie=Math.imul((parseInt(s.hash.slice(2,10),16)|0)^5116835,461845907)|0;const Ct=()=>{Ie=Ie+1831565813|0;let t=Math.imul(Ie^Ie>>>15,1|Ie);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ha=Ct(),xa=Ct(),O1=Ct(),Lo=Ct(),H1=Ct(),W1=Ct(),G1=Ct(),da=Ct(),K1=Ct(),Q1=Ct();let Kt=G||B==="Far off"||ha<.38?"Abeam":ha<.74?"Off the corner":"Under the boom",qe=G||B==="Close in"||xa<.55?"One platform":xa<.77?"Flare tower":"Bridge-linked";Kt==="Under the boom"&&qe!=="One platform"&&(Kt="Off the corner");const ma=G||O1<.78?"Dead of night":"Last light",Fe=qe!=="One platform",ht=qe==="Bridge-linked",$e=ma==="Last light",A={Sodium:{a:[1,.5,.12],b:[1,.68,.36],w:.15},"Mixed floods":{a:[1,.52,.14],b:[.72,.86,1],w:.42},"White floods":{a:[.8,.88,1],b:[1,.86,.62],w:.35},"Old amber":{a:[1,.62,.22],b:[1,.4,.1],w:.4}}[Me],Oe=(U==="Driving"?.0052:U==="Drizzle"?.0021:U==="Squall"?.0078:.0034)*(B==="Far off"?.45:1),No=Kt==="Under the boom"&&(U==="Squall"||U==="Driving"),to=Kt==="Under the boom"?Math.min(Oe,.0034):Oe,So=U==="Driving"?1.3:U==="Drizzle"?.35:U==="Squall"?1.9:.8,He=Wt==="Very low"?175:Wt==="High"?360:235,u=B==="Standing off"?190:B==="Close in"?68:B==="Far off"?560:105,m=-6,v=108,F=82,x=bt==="Tall jacket"?62:bt==="Semi-sub"?38:bt==="Jack-up"?30:46,Nt=[],We=[];let eo=0;const w=(t,e,a,r,n,c,l)=>Nt.push([t*T,e,a,r,n,c,0,l]),Pn=(t,e,a,r,n,c,l)=>Nt.push([t*T,e,a,r*T,n,c,1,l]),Q=()=>{if(Nt.length===eo)return;const t=[1e9,1e9,1e9,-1e9,-1e9,-1e9];for(let e=eo;e<Nt.length;e++){const a=Nt[e];let r,n;if(a[6]<.5)r=[a[0]-a[3],a[1]-a[4],a[2]-a[5]],n=[a[0]+a[3],a[1]+a[4],a[2]+a[5]];else{const c=a[7];r=[Math.min(a[0],a[3])-c,Math.min(a[1],a[4])-c,Math.min(a[2],a[5])-c],n=[Math.max(a[0],a[3])+c,Math.max(a[1],a[4])+c,Math.max(a[2],a[5])+c]}for(let c=0;c<3;c++)r[c]<t[c]&&(t[c]=r[c]),n[c]>t[c+3]&&(t[c+3]=n[c])}We.push(t.concat([eo,Nt.length])),eo=Nt.length},R=(t,e,a,r,n,c,l,f)=>Nt.push([t*T,e,a,r*T,n,c,1,l,f]),O=(t,e,a,r)=>R(t[0],t[1],t[2],e[0],e[1],e[2],a,r),ko=(t,e,a)=>[t[0]+(e[0]-t[0])*a,t[1]+(e[1]-t[1])*a,t[2]+(e[2]-t[2])*a],va=t=>{const e=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/e,t[1]/e,t[2]/e]},ba=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],$t=(t,e,a,r,n,c,l,f,d,p,P)=>{const L=va([e[0]-t[0],e[1]-t[1],e[2]-t[2]]),D=va(ba(L,p)),W=ba(D,L),S=(V,Mt)=>{const it=(a+(r-a)*Mt)*(c===4?1.414:1),j=c===4?V*1.5708+.7854:V*2.0944+1.5708,vt=ko(t,e,Mt),qt=Math.cos(j)*it,Ot=Math.sin(j)*it;return[vt[0]+D[0]*qt+W[0]*Ot,vt[1]+D[1]*qt+W[1]*Ot,vt[2]+D[2]*qt+W[2]*Ot]};for(let V=0;V<c;V++)O(S(V,0),S(V,1),l,d);for(let V=0;V<n;V++){const Mt=V/n,it=(V+1)/n;for(let j=0;j<c;j++){const vt=(j+1)%c;(V+j)%2===0?O(S(j,Mt),S(vt,it),f,d):O(S(vt,Mt),S(j,it),f,d),P&&V>0&&O(S(j,Mt),S(vt,Mt),f*.9,d)}}},he=(t,e,a,r)=>{w((t+e)*.5,a,r,Math.abs(e-t)*.5,.045,.045,8),w((t+e)*.5,a-.5,r,Math.abs(e-t)*.5,.03,.03,8)},oo=(t,e,a,r)=>{w(t,r,(e+a)*.5,.045,.045,Math.abs(a-e)*.5,8),w(t,r-.5,(e+a)*.5,.03,.03,Math.abs(a-e)*.5,8)},Co=(t,e,a,r,n)=>{for(const[f,d]of[[-1.3,-1.1],[1.3,-1.1],[-1.3,1.1],[1.3,1.1]])R(t+f,a,e+d,t+f,r,e+d,.1,8);const c=Math.max(1,Math.round((r-a)/3.6)),l=(r-a)/c;for(let f=0;f<c;f++){const d=a+l*f,p=d+l,P=f%2?1:-1;w(t,p,e,1.35,.06,1.15,8),R(t-1.1*P,d+.2,e-.55,t+1.1*P,p,e-.55,.22,8),n.push([t+.6*P,p+.9,e-1.3])}},pa=[],Ea=[],V1=[m+6,m+v*.36,m+v*.64,m+v-6],j1=[u+3,u+F*.5,u+F-4],ao=[],xe=[],ya=[];if(bt==="Jack-up"){const t=[[m+5,u+3],[m+v-5,u+3],[m+v*.5,u+F-3]];for(const[e,a]of t)$t([e,-6,a],[e,x+78,a],6,6,30,3,.6,.26,8,[0,0,1],!0),w(e,x+3.5,a,9,4.5,9,0),xe.push([e*T,a,6.5,a<u+20?1.1:.8]),Q();w(m+v*.5,x-4,u+F*.5,v*.5+3,4.5,F*.5+2,1),Q()}else if(bt==="Semi-sub"){const t=[m+10,m+v*.5,m+v-10];for(const e of[u+12,u+F-12]){for(const a of t)w(a,x*.5-2,e,8.5,x*.5+3,8.5,6),xe.push([a*T,e,9.5,e<u+20?1.1:.8]);w(m+v*.5,-1.5,e,v*.5,2.3,7.6,6)}Q();for(const e of[u+12,u+F-12])R(t[0],9,e,t[2],9,e,1.3,3),R(t[0],x-6,e,t[2],x-6,e,1,3);for(const e of t)R(e,9,u+12,e,9,u+F-12,1.1,3),R(e,9,u+20,e,x-6,u+F-20,.9,3);for(let e=0;e<2;e++){const a=t[e]+8.5,r=t[e+1]-8.5;R(a,12,u+12,r,x-7,u+12,.8,3),R(r,12,u+12,a,x-7,u+12,.8,3)}for(let e=0;e<4;e++){const a=m+30+e*9;R(a,x-2,u+4,a+1,8,u-2-e,.35,3),R(a+1,8,u-2-e,a+1.6,-4,u-8-e*2,.35,3)}Co(t[0]+10,u+4,3,x-2,ao),Q()}else{const t=x+1,e=(c,l,f)=>{const d=(f+6)/(t+6),p=(c===0?1:c===3?-1:0)*5,P=(l===0?1:l===2?-1:0)*3.4;return[V1[c]+p*(1-d),f,j1[l]+P*(1-d)]},a=[6,x*.5,t];for(let c=0;c<3;c++)for(let l=0;l<4;l++){const f=e(l,c,0);xe.push([f[0]*T,f[2],1.9,c===0?1:c===1?.8:.6])}const r=[-6,6,x*.5,t];for(let c=0;c<3;c++){for(let l=0;l<4;l++){O(e(l,c,-6),e(l,c,t+1),1.75,3);for(const f of a)O(e(l,c,f-1.4),e(l,c,f+1.4),2.15,3)}for(const l of a)for(let f=0;f<3;f++)O(e(f,c,l),e(f+1,c,l),.5,3);for(let l=0;l<3;l++)for(let f=0;f<3;f++){const d=r[l],p=r[l+1];c!==1?(O(e(f,c,d),e(f+1,c,p),.45,3),O(e(f+1,c,d),e(f,c,p),.45,3)):(f+l)%2?O(e(f,c,d),e(f+1,c,p),.42,3):O(e(f+1,c,d),e(f,c,p),.42,3)}if(c<2){for(let l=0;l<4;l++){for(const f of a)O(e(l,c,f),e(l,c+1,f),.5,3);for(let f=0;f<3;f++){const d=r[f],p=r[f+1];l===0||l===3?(O(e(l,c,d),e(l,c+1,p),.45,3),O(e(l,c+1,d),e(l,c,p),.45,3)):(f+c)%2&&O(e(l,c,d),e(l,c+1,p),.42,3)}}for(const l of a)O(e(0,c,l),e(3,c+1,l),.4,3)}Q()}for(let c=0;c<14;c++){const l=(c%7-3)*2.2,f=u+24+Math.floor(c/7)*3.2;R(m+v*.5+l,-6,f,m+v*.5+l+M(-.3,.3),x+1,f,.42,3)}for(const c of a)w(m+v*.5,c,u+25.6,8.5,.3,2.6,8);for(let c=0;c<4;c++){const l=e(1+(c>>1),0,-6),f=e(1+(c>>1),0,x),d=(c%2?1:-1)*2.6;R(l[0]+d,-6,l[2]-2.4,f[0]+d,x,f[2]-2.4,.38,3)}const n=e(0,0,4);w(n[0]+1,4.2,n[2]-4.6,5,.22,2.4,8),he(n[0]-4,n[0]+6,5.3,n[2]-7);for(let c=0;c<4;c++)R(n[0]-3.5+c*3,1.5,n[2]-6.9,n[0]-3.5+c*3,5.4,n[2]-6.9,.14,8);Co(n[0]+3.5,n[2]-4.2,4.4,x,ao),ao.push([n[0]+1,6.4,n[2]-6.4]),Q()}if(bt!=="Semi-sub"&&bt!=="Jack-up")for(let t=0;t<6;t++)M(-.5,.5),i();const Uo=m+v*.5,Do=u+F*.5;w(Uo,x+1,Do,v*.5+6,1,F*.5+5,1),w(Uo,x+16.6,Do,v*.5+2,.7,F*.5+1,1),w(Uo+4,x+9,Do+6,v*.5-4,7,F*.5-5,1),w(m+v*(.42+M(-.05,.05)),x-4.4,u+F*.46,v*.34,4.6,F*.3,1);const Pe=m-4+i()*20,no=Pe+v*(.35+i()*.3);w((Pe+no)*.5,x+8.6,u+2,(no-Pe)*.5,.22,6.5,8),Q();for(let t=0;t<=12;t++){const e=m-5+t*(v+10)/12;R(e,x+2,u-4.6,e,x+16,u-4.6,.38,8),t<12&&t%3===1&&R(e,x+2.2,u-4.6,e+(v+10)/12,x+15.8,u-4.6,.26,8)}for(let t=0;t<=9;t++){const e=u-4+t*(F+8)/9;R(m-5.4,x+2,e,m-5.4,x+16,e,.38,8),t<9&&t%3===2&&R(m-5.4,x+2.2,e,m-5.4,x+15.8,e+(F+8)/9,.26,8)}he(m-6,m+v+6,x+3.1,u-5.2),he(m-2,m+v+2,x+18.4,u-1.2),he(Pe,no,x+9.9,u-4.3),oo(m-6.2,u-5,u+F+5,x+3.1),oo(m-2.2,u-1,u+F+1,x+18.4);const Y1=m+v*(.52+i()*.12);for(let t=0;t<3;t++){const e=Y1+t*12;R(e,x+12.6,u-7.4,e+7.4,x+12.6,u-7.4,1.45,7),R(e+.4,x+16.2,u-4.8,e+.4,x+14.4,u-7.4,.2,8),R(e+7,x+16.2,u-4.8,e+7,x+14.4,u-7.4,.2,8),Ea.push([e+3.7,x+15.6,u-6.6])}Q();for(let t=0;t<4;t++){const e=m+4+t*v*.23+i()*8,a=6+i()*5,r=1.2+i()*.8,n=(t%2?x+8.8:x+2)+r+.3;R(e,n,u+1.5+i()*2,e+a,n,u+1.5+i()*2,r,8)}for(let t=0;t<4;t++){const e=m+10+i()*(v-20),a=2+i()*3,r=1.5+i()*2.5;w(e,x+2+r,u+1.5+i()*2,a,r,2+i(),0)}for(let t=0;t<3;t++){const e=m+8+i()*(v-16),a=1+i()*.8;R(e,x+2+a,u+3,e,x+9+i()*5,u+3,a,3)}for(let t=0;t<3;t++){const e=u+10+t*18+i()*8,a=5+i()*4;R(m-1,x+3.6+t%2*7,e,m-1,x+3.6+t%2*7,e+a,1.3+i()*.5,8)}Q();for(let t=0;t<12;t++){const e=x+M(2.8,15.5),a=u-3.4+i()*5.5,r=i()*.7,n=r+.15+i()*.45;R(m-4+(v+8)*r,e,a,m-4+(v+8)*Math.min(n,1),e,a,.16+i()*.3,3)}for(let t=0;t<7;t++){const e=m+v*(.05+i()*.9),a=u-2.6-i()*1.4;R(e,x+2,a,e,x+16,a,.14+i()*.22,3)}for(let t=0;t<6;t++){const e=x+M(3,15),a=m-3.6+i()*2;R(a,e,u-3+i()*20,a,e,u+20+i()*50,.15+i()*.25,3)}Q();const te=[],Ta=5,Bo=4;for(let t=0;t<Ta;t++)for(let e=0;e<Bo;e++){if(E()<.12)continue;const a=v/Ta,r=F/Bo,n=1-e/(Bo-1),c=Lt(),l=9+E()*12+(1-n)*14+(t===1||t===2?6:0)+(q?0:(c-.5)*8+(t>=3?3.5:0)),f=m+(t+.5)*a+(E()-.5)*4,d=u+(e+.5)*r+(E()-.5)*4,p=a*(.3+E()*.2)+1,P=r*(.3+E()*.22)+1,L=x+17;if(w(f,L+l*.5,d,p,l*.5,P,0),te.push({x:f,y:L+l,z:d,hw:p,hd:P,y0:L}),E()<.65){const D=5+E()*11,W=p*(.4+E()*.45),S=P*(.4+E()*.45);w(f+(E()-.5)*p,L+l+D*.5,d+(E()-.5)*P,W,D*.5,S,0),te.push({x:f,y:L+l+D,z:d,hw:W,hd:S,y0:L+l})}}Q();for(const t of te){const e=t.y-t.y0,a=e>13?2:1;for(let n=0;n<a;n++){const c=t.y0+e*(n+1)/(a+1)+M(-1.2,1.2),l=M(-.8,.8),f=M(-.8,.8),d=t.hw+1.2+i()*3,p=t.hd+1.2+i()*3;i(),w(t.x+l,c,t.z+f,d,.18,p,8),he(t.x+l-d,t.x+l+d,c+1.1,t.z+f-p+.1),oo(t.x+l-d+.1,t.z+f-p,t.z+f+p,c+1.1)}if(i()<.7){const n=t.hw+.9+i();w(t.x,t.y+.4,t.z,n,.55,t.hd+.9+i(),2),he(t.x-n,t.x+n,t.y+1.9,t.z-t.hd-.6)}const r=1+Math.floor(i()*2);for(let n=0;n<r;n++)i()<.6?w(t.x+M(-.7,.7)*t.hw,t.y0+e*M(.25,.85),t.z-t.hd-.2,M(1.8,5.5),M(1.6,5),.24,0):w(t.x-t.hw-.2,t.y0+e*M(.25,.85),t.z+M(-.7,.7)*t.hd,.24,M(1.6,5),M(1.8,5.5),0)}Q();for(let t=0;t<4;t++)i();for(let t=0;t<8;t++){const e=x+19.4+t%4*.9,a=u+1.2+Math.floor(t/4)*1.6,r=i()*.4;R(m+v*r,e,a,m+v*(r+.3+i()*.5),e,a,.22+i()*.3,3)}for(let t=0;t<9;t++){const e=m+4+t*(v-8)/8;R(e,x+17.3,u+2,e,x+22.6,u+2,.2,8),w(e,x+22.6,u+2,.2,.15,1.6,8)}for(let t=0;t<3;t++){const e=u+3+t*4,a=x+20;w(m+6+i()*8,a,e,.8,1.1,7,2)}Q();for(const t of te){const e=1+Math.floor(E()*3);for(let a=0;a<e;a++){const r=t.x+(E()-.5)*t.hw*1.6,n=t.z+(E()-.5)*t.hd*1.6,c=1.5+E()*5;w(r,t.y+c*.5,n,1.2+E()*2.4,c*.5,1.2+E()*2.4,2)}if(E()<.3){const a=t.x+(E()-.5)*t.hw,r=t.z+(E()-.5)*t.hd;R(a,t.y,r,a+E()*1.2,t.y+9+E()*12,r,.5+E()*.4,3)}}const wa=[];for(let t=0;t<3;t++){const e=te[Math.floor(i()*te.length)],a=e.x+M(-.5,.5)*e.hw,r=Math.max(e.z,u+F*.4)+M(0,6),n=e.y+16+i()*16,c=1.6+i()*.9;R(a,e.y,r,a+i()*.8,n,r,c,3),w(a+.4,n,r,c+.5,.5,c+.5,2),wa.push([a,n+1,r])}Q();for(let t=0;t<4;t++){const e=m+8+E()*(v-16),a=u-1.5-E()*2;t<3&&Co(e,a-1,x+17,x+17+12+t*7,pa)}Q();const nt=m+v*.46,rt=u+F*.62,de=bt==="Tall jacket"?72:60,xt=x+44,Ge=qe==="Flare tower"&&G1<.5;Ge||($t([nt,x+17,rt],[nt,xt,rt],7.5,6.8,4,4,.7,.34,8,[0,0,1],!0),w(nt,xt+.6,rt,9.5,.6,9.5,2),w(nt-4,xt+3.5,rt-5,3,2.5,2.2,0),$t([nt,xt+1,rt],[nt,xt+de,rt],6,1.5,12,4,.42,.17,8,[0,0,1],!0),w(nt,xt+de*.58,rt,4.2,.15,4.2,8),w(nt,xt+de+1.2,rt,2.6,1.2,2.6,2),Q());const Ra=[m+16,m+v-14],Z1=[.45,-.35],za=[46,42],ro=[];for(let t=0;t<2;t++){const e=Ra[t],a=u+3,r=x+44;R(e,x+18,a,e,r,a,1.7,9),w(e,r+2,a,3.4,2.6,3.4,2);const n=Z1[t],c=e+Math.sin(n)*za[t]*.8,l=a-Math.cos(n)*za[t]*.55,f=r+30;$t([e,r+1.5,a],[c,f,l],1.1,.35,11,4,.2,.09,9,[0,1,0],!1),w(e,x+20.4,a,4.4,2.2,3.8,2),w(e,r+3.1,a+2.4,2.4,2.1,1.5,2);const d=e+(i()<.5?1:-1)*1.8;R(e-2.2,r+3,a,d,r+11,a+1.6,.32,9),R(e+2.2,r+3,a,d,r+11,a+1.6,.32,9),R(d,r+11,a+1.6,c,f+.6,l,.05,3),R(d+.4,r+11,a+1.6,c+.4,f+.6,l,.05,3);const p=8+i()*12;R(c,f,l,c,f-p,l,.04,3),w(c,f-p-.6,l,.45,.6,.3,9),ro.push([c,f+.8,l]),Q()}const St=m+v+9,wt=u+6,Rt=x+56;w(St,Rt,wt,13,.35,13,5),w(St,Rt-.2,wt-13.9,14.5,.06,1,8),w(St,Rt-.2,wt+13.9,14.5,.06,1,8),w(St-13.9,Rt-.2,wt,1,.06,13,8),w(St+13.9,Rt-.2,wt,1,.06,13,8);for(const[t,e]of[[-12,-12],[12,-12],[-12,12],[12,12],[0,-12],[0,12]])R(St+t,Rt-.4,wt+e,m+v-2,Rt-18-Math.abs(t)*.6,wt+e*.3,.32,8);for(const t of[-12,0,12])R(St-12,Rt-.5,wt+t,St+12,Rt-.5,wt+t,.28,8);for(const t of[-12,0,12])R(St+t,Rt-.5,wt-12,St+t,Rt-.5,wt+12,.28,8);Q();const me=Kt==="Off the corner"&&Lo>=.5?-1:1,Ma=Kt==="Under the boom",Fa=me>0?m:m+v,Pa=[Fa+2*me,x+40,Ma?u+F*.16:u+F*.84],Xo=gt==="Roaring",Io=gt==="Low flame",ve=gt==="Twin tips",ct=m+v+78+da*36,st=u+22+da*24,J=29,k=13,pt=ht?ct:me>0?m-12:m+v+12,dt=ht?st:u+F*.62,Ut=ht?J+1:x+1,b=Fe?[pt,Math.min(He-30,Ut+(ht?92:72)+Q1*26),dt]:[Fa-70*me,Math.min(He-30,x+140),Ma?u-85:u+F+85];if(!Fe)$t(Pa,[b[0],b[1]-3,b[2]],2.8,1.2,18,3,.5,.2,8,[0,1,0],!0);else{const t=b[1]-3-Ut,e=Math.round(t/7);$t([pt,Ut,dt],[pt,b[1]-3,dt],7.5,1.7,e,3,.6,.26,8,[0,0,1],!0);for(let a=1;a<=3;a++){const r=a/3.6,n=Ut+t*r,c=7.5+(1.7-7.5)*r;w(pt,n,dt,c*.62+1.2,.14,c*.62+1.2,8)}if(R(pt-.9,Ut,dt-7.2,pt-.9,b[1]-3,dt-1.4,.12,8),!ht){w(pt+3*me,Ut-.5,dt,10.5,.5,9,8);for(const a of[-7,7])R(pt-5*me,Ut-1,dt+a,me>0?m+4:m+v-4,x-16,dt+a*.6,.45,8)}if(ht){const a=(c,l,f)=>{const d=(f+6)/(J+6),p=3*(1-d);return[ct+(c?1:-1)*(k-1.5+p),f,st+(l?1:-1)*(k-1.5+p)]};for(let c=0;c<2;c++)for(let l=0;l<2;l++){O(a(c,l,-6),a(c,l,J),1.3,3);const f=a(c,l,0);ya.push([f[0]*T,f[2],1.5,.9])}for(const c of[3,J-3])O(a(0,0,c),a(1,0,c),.4,3),O(a(0,1,c),a(1,1,c),.4,3),O(a(0,0,c),a(0,1,c),.4,3),O(a(1,0,c),a(1,1,c),.4,3);for(const[c,l]of[[[0,0],[1,0]],[[0,1],[1,1]],[[0,0],[0,1]],[[1,0],[1,1]]])O(a(c[0],c[1],3),a(l[0],l[1],J-3),.36,3),O(a(l[0],l[1],3),a(c[0],c[1],J-3),.36,3);w(ct,J,st,k+1,.7,k+1,1),w(ct+5,J+3.5,st+4,4,2.8,3.5,0),he(ct-k-1,ct+k+1,J+1.8,st-k-.9),oo(ct-k-.9,st-k-1,st+k+1,J+1.8),Q();const r=[m+v-6,J-1,u+F*.5],n=[ct-k,J-1,st-2];$t(r,n,1.7,1.7,Math.round(Math.hypot(n[0]-r[0],n[2]-r[2])/5),4,.28,.13,8,[0,1,0],!1),O([r[0],r[1]-1.1,r[2]],[n[0],n[1]-1.1,n[2]],.5,8)}}R(b[0],b[1]-3,b[2],b[0],b[1]+.5,b[2],1,3),ve&&($t([b[0],b[1]-3,b[2]],[b[0]-15,b[1]-3,b[2]+13],1.2,.9,4,3,.3,.14,8,[0,1,0],!0),R(b[0]-15,b[1]-3,b[2]+13,b[0]-15,b[1]-.5,b[2]+13,.8,3)),w(b[0],b[1]-3.4,b[2],2.6,.25,2.6,8),Q();const ot=Math.tan(34*Math.PI/180),Aa=B==="Standing off"?.05:B==="Close in"?.24:B==="Far off"?-.02:.15,be=B==="Standing off"?.13:B==="Far off"?.3:B==="Close in"?.2:.252,co=(Xo?118:Io?54:88)*(ve?.8:1),Ae=[-.42,.86,-.2],qo=Math.hypot(Ae[0],Ae[1],Ae[2]),_a=[0,.3,.58,.85,1].map(t=>[b[0]+Ae[0]/qo*co*t,b[1]+Ae[1]/qo*co*t,b[2]+Ae[2]/qo*co*t]),Oo=(t,e,a,r)=>{const n=r[0]-t[0],c=r[1]-4.2,l=r[2]-t[1],f=Math.cos(a),d=Math.sin(a),p=Math.cos(e),P=Math.sin(e),L=n*P*f+c*d+l*p*f;return[(n*p-l*P)/(L*ot),(-n*P*d+c*f-l*p*d)/(L*ot),L]},so=(t,e,a)=>{for(let r=0;r<4;r++){let n=9,c=-9,l=-9;for(const f of _a){const d=Oo(t,e[0],e[1],f),p=co*.22/Math.max(d[2],1)/ot;n=Math.min(n,d[0]-p),c=Math.max(c,d[0]+p),l=Math.max(l,d[1]+p)}n<-.92?e[0]+=Math.atan(n*ot)-Math.atan(-.92*ot):c>.92&&(e[0]+=Math.atan(c*ot)-Math.atan(.92*ot)),l>.9&&(e[1]=Math.min(a,e[1]+Math.atan(l*ot)-Math.atan(.9*ot)))}return e},ga=(t,e,a)=>{for(let r=0;r<16;r++){const n=so(t,e.slice(),9);if(n[1]<=a)return e[0]=n[0],e[1]=n[1],e;t[0]-=Math.sin(e[0])*12,t[1]-=Math.cos(e[0])*12}return so(t,e,a)},lo=(t,e,a)=>Math.atan2(e-t[0],a-t[1]),La=t=>{let e=9,a=-9;for(const[r,n]of[[m-4,u],[m-4,u+F],[m+v,u],[m+v,u+F],[ct+k+6,st-k],[ct+k+6,st+k],[ct-k,st-k]]){const c=lo(t,r,n);e=Math.min(e,c),a=Math.max(a,c)}return[e,a]},Na=(t,e)=>{const[a,r]=La(t),n=Math.atan(.9*ot);e[0]=r-a<2*n?(a+r)*.5:r-n},Sa=(t,e)=>{Na(t,e);for(let a=0;a<14;a++){const[r,n]=La(t);if(n-r<=2*Math.atan(.84*ot))break;t[0]-=Math.sin(e[0])*12,t[1]-=Math.cos(e[0])*12,Na(t,e)}},ka=(t,e,a)=>{const r=Ge?ro:ro.concat([[nt,xt+de+2.4,rt]]);for(let n=0;n<4;n++){let c=-9;for(const f of r)c=Math.max(c,Oo(t,e[0],e[1],f)[1]);if(c<=.9)return;const l=e[1]+Math.atan(c*ot)-Math.atan(.9*ot);if(l<=a){e[1]=l;continue}e[1]=a,t[0]-=Math.sin(e[0])*12,t[1]-=Math.cos(e[0])*12}};let H=[0,0],$=[Aa,be];if(Kt==="Off the corner"){const t=(35+20*H1)*Math.PI/180,e=!ht&&Lo<.5,a=u*(B==="Close in"?1.25:1.05),r=e?m:m+v;H=[r+(e?-1:1)*a*Math.sin(t),u-a*Math.cos(t)],$=[lo(H,r,u)-Math.atan(ot/3),be+(B==="Close in"?.06:0)],ht&&Sa(H,$),ga(H,$,be+.12),ht&&ka(H,$,be+.12)}else if(Kt==="Under the boom"){const t=m+v*.5,e=u+F*.5,a=b[0]-t,r=b[2]-e,n=Math.hypot(a,r),c=a/n,l=r/n,f=Lo<.5?1:-1,d=40+30*W1,p=B==="Close in"?-.66:B==="Standing off"?-.46:-.56;for(let P=0;P<=400&&(H=[b[0]+c*P+l*d*f,b[2]+l*P-c*d*f],$=so(H,[lo(H,t,e),.05],1.1),!(Math.tan(-$[1])/ot>=p));P+=10);}else if(q){const t=ht?(m+ct+k)*.5:m+v*.5,e=ht?(u+st)*.5:u+F*.5;$=[lo(H,t,e)-Math.atan((K1-.5)*ot),be],so(H,$,.5)}else Fe&&(ht&&Sa(H,$),ga(H,$,be+.08),ht&&ka(H,$,be+.08));const Dt=H[0]*T,Bt=H[1],Ca=($[0]-Aa)*T,io=Math.cos(Ca),fo=Math.sin(Ca),Ua=Math.hypot(Math.max(m-H[0],0,H[0]-m-v),Math.max(u-H[1],0,H[1]-u-F)),Ho=(t,e)=>[Dt+t*io+e*fo,Bt-t*fo+e*io];s.trait("Bearing",Kt),s.trait("Field",qe),s.trait("Hour",ma);const Wo=Ho(-760*T,-1020),pe=Wo[1],J1=66,uo=Wo[0]*T,Da=Wo[0],Ba=(uo+J1)*T,Xa=104;w(uo,42,pe,56,16,36,0),w(uo-18,64,pe+6,18,12,18,0),w(uo,16,pe,40,18,32,2),Q();const $1=Nt.length,tn=We.length,Ia=Math.max($1,tn),X=new Float32Array(Ia*16);Nt.forEach((t,e)=>{const a=e*16;t[6]<.5?(X[a]=t[0],X[a+1]=t[1],X[a+2]=t[2],X[a+3]=-1,X[a+4]=t[3],X[a+5]=t[4],X[a+6]=t[5],X[a+7]=t[7]):(X[a]=t[0],X[a+1]=t[1],X[a+2]=t[2],X[a+3]=t[7],X[a+4]=t[3],X[a+5]=t[4],X[a+6]=t[5],X[a+7]=t[8]===void 0?3:t[8])}),We.forEach((t,e)=>{const a=e*16+8;X[a]=t[0],X[a+1]=t[1],X[a+2]=t[2],X[a+3]=t[6],X[a+4]=t[3],X[a+5]=t[4],X[a+6]=t[5],X[a+7]=t[7]});const qa=o.createTexture();o.bindTexture(o.TEXTURE_2D,qa),o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,4,Ia,0,o.RGBA,o.FLOAT,X),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),I1(o,y);const ee=[];let oe=!1;const Xt=(t,e,a,r,n,c,l,f,d,p,P,L)=>{if(oe||ee.length/12>=44)return;const D=Math.hypot(f,d,p)||1,W=L===void 0?1:Math.max(L,1e-4);ee.push(t*T,e,a,r,n[0]*c,n[1]*c,n[2]*c,l,f/D*T*W,d/D*W,p/D*W,P)},Go=Math.hypot(H[0]-m-v*.5,H[1]-u-F*.5),en=No?Math.exp(-(Oe-to)*Go*.5):1,ho=(Xo?1.6:Io?.5:1)*(ve?1.15:1);Xt(b[0]-14,Math.min(b[1]+34,He-14),b[2]-6,60,[1,.4,.09],6e5*ho*en,2e3,1,0,0,-2,1),Xt(b[0],b[1]+5,b[2],12,[1,.6,.25],26e3*ho,120,1,0,0,-2,.25);const Ko=[],Qt=()=>i()<A.w?A.b:A.a,Qo=No?Math.min(1,170/(Go+60)):u>300?170/(u+60):1,mt=(t,e,a,r,n,c,l)=>{if(oe)return;const f=c*Math.exp(-Oe*Math.hypot(t*T-Dt,e-4,a-Bt)*.35);Ko.push([t*T,e,a,Qo<1?Math.max(r*Qo,Math.min(r,.0065)):r,n[0]*f,n[1]*f,n[2]*f,l])},_e=(t,e)=>t+(e-t)*Math.pow(i(),2.3),Oa=[],ae=(t,e,a,r,n,c,l,f,d,p,P)=>{Xt(t,e,a,14+n*.012,r,n,c,l,f,d,p,P),Oa.push([t,e,a,r])},Ha=(t,e,a,r,n,c,l)=>{mt(t,e,a,n,r,c,1),Xt(t,e,a,26+l*.01,r,l,44,0,-1,0,-2,.55+i()*.5),Oa.push([t,e,a,r])};for(let t=0;t<5;t++){const e=i(),a=1+Math.floor(i()*i()*4);for(let r=0;r<a;r++){const n=Math.min(1,Math.max(0,e+(i()-.5)*.08));ae(m+n*v,x+3+i()*12,u-3.6-i()*1.6,t%2?A.b:A.a,_e(180,3400),12+i()*22,(i()-.5)*.3,-.85,.55,.3+i()*.2,.45)}}for(let t=0;t<3;t++)ae(m-4.5,x+3+i()*13,u+8+i()*i()*52,Qt(),_e(300,2e3),30,.55,-.8,(i()-.5)*.3,.3,.35);const on=3+Math.floor(i()*2),an=u+4,nn=40;for(let t=0;t<on;t++){const e=m+v*(.12+i()*.76),a=an+i()*nn,r=1+Math.floor(i()*i()*5);for(let n=0;n<r;n++)ae(e+(i()-.5)*15,x-9-i()*6,a+(i()-.5)*12,Qt(),_e(600,3800),22+i()*36,0,1,0,-2,.16)}const rn=te.slice().sort(()=>i()-.5).slice(0,9);for(const t of rn){const e=t.y-t.y0,a=t.y0+e*(.45+i()*.5);i()<.62?ae(t.x+(i()-.5)*t.hw*1.3,a,t.z-t.hd-3.6,Qt(),_e(180,2800),14+i()*24,(i()-.5)*.3,-.82,.55,.22+i()*.2,.4):ae(t.x-t.hw-3.6,a,t.z+(i()-.5)*t.hd*1.3,Qt(),_e(240,1800),26,.6,-.8,(i()-.5)*.3,.25,.4)}const Wa=3+Math.floor(i()*2),Ga=B==="Far off"?1:.6;for(let t=0;t<Wa;t++){const e=(t+.15+i()*.7)/Wa;Ha(m+e*v*.92+2,x+19+i()*3,u-2-i()*3,Qt(),(.14+i()*.07)*Ga,1.4+i()*1.8,1600+i()*2600)}oe=Ge,ae(nt-11,xt+8+i()*12,rt-9,A.a,2600,90,0,1,0,-2,.75),ae(nt+3,xt+24+i()*22,rt-10,A.b,1100,60,0,1,0,-2,.5),i()<.7&&Ha(nt-9,xt+34,rt-8,A.b,.11*Ga,1.1,1200),oe=!1;for(let t=0;t<2;t++)ae(Ra[t]+4,x+46,u-3,A.a,_e(700,2200),44,0,-1,0,-2,.45);oe=Ge,mt(nt,xt+de+4,rt,.045,[1,.08,.05],2.2,1),oe=!1;for(let t=0;t<16;t++){const e=t>>2,a=((t&3)+.5)/4*2-1,r=e<2?a*13:e===2?-13.2:13.2,n=e<2?e?13.2:-13.2:a*13;mt(St+r,Rt+.5,wt+n,.007,[.45,1,.55],.5,.4)}const cn=q?1:1.35,Ee=(t,e,a,r,n,c,l,f)=>{const d=Math.floor(c/l);for(let p=0;p<=d;p++){if(i()<.14)continue;const P=p*l+(i()-.5)*l*.35,L=t+r*P,D=a+n*P,W=Math.hypot(L*T-Dt,e-4,D-Bt),S=.005+.005*Math.min(1.6,140/W)+i()*i()*.007;mt(L,e,D,S,Qt(),f*cn*(.7+i()*1.2),.3+i()*.5)}};Ee(m-6,x+2.6,u-5.8,1,0,v+12,6.5,.9),Ee(m-6.8,x+2.6,u-5,0,1,F+10,7,.8),Ee(m-4,x-.7,u-3,1,0,v+6,9,.7),Ee(Pe,x+10.3,u-4.8,1,0,no-Pe,6,.8),Ee(m-2,x+18.9,u-1.8,1,0,v+4,6,.9),Ee(m-2.8,x+18.9,u-1,0,1,F+2,7,.8);for(const t of te)i()<.15||Ee(t.x-t.hw,t.y0+(t.y-t.y0)*(.4+i()*.3),t.z-t.hd-1.7,1,0,t.hw*2,5+i()*3,.7);for(const t of pa.concat(ao,Ea))i()<.85&&mt(t[0],t[1],t[2],.008+i()*.005,i()<.6?A.b:A.a,.8+i()*.6,.4);oe=Ge;for(let t=1;t<8;t++){const e=t/8,a=6-4.5*e+.7;mt(nt-a,xt+de*e,rt-a,.008,A.b,.7+i()*.5,.4),i()<.6&&mt(nt+a,xt+de*e+2,rt-a,.007,A.a,.6,.3)}oe=!1;const sn=Fe?[pt,Ut,dt-6]:Pa,ln=Fe?[pt,b[1]+1,dt-1.5]:b;for(let t=1;t<12;t++){const e=ko(sn,ln,(t+i()*.4)/12.5);mt(e[0],e[1]-4.2,e[2],.011,A.a,1.3+i()*.8,.5)}if(Fe){const t=b[1]-3-Ut;for(let e=1;e<=3;e++){const a=e/3.6,r=Ut+t*a+.6,n=(7.5+(1.7-7.5)*a)*.62+1;mt(pt-n,r,dt-n,.013,A.b,1.6,.6),mt(pt+n,r,dt-n,.011,A.a,1.3,.5)}mt(pt+2.5,b[1]-5,dt-2,.014,[1,.1,.06],1.6,1)}if(ht){const t=[m+v-6,J-1,u+F*.5],e=[ct-k,J-1,st-2],a=Math.hypot(e[0]-t[0],e[2]-t[2]),r=Math.floor(a/5.5);for(let n=1;n<r;n++){const c=ko(t,e,n/r);mt(c[0],c[1]+1.2,c[2],.009,n%4?A.a:A.b,1.3,.55)}for(const[n,c]of[[-k,-k],[k,-k],[-k,k],[0,-k],[k,k]])mt(ct+n,J+2.4,st+c,.014,A.a,1.5,.7);Xt(ct-4,J+6,st-k-3,20,A.a,1400,30,0,-1,.3,.3,.5),Xt((t[0]+e[0])*.5,J+3,(t[2]+e[2])*.5,24,A.a,700,40,0,-1,0,-2,.4)}for(const t of ro.concat(wa))mt(t[0],t[1],t[2],.012,[1,.1,.06],1.6,1);Xt(m+v*.5,x+26,u+F*.25,900,A.a,400,4e3,1,0,0,2,1),Xt(m+v*.22,x+8,u-4,700,A.a,260,4e3,1,0,0,2,1),Xt(m+v*.76,x+16,u+8,700,A.b,240,4e3,1,0,0,2,.9),Xt(m+v*.5,x-12,u+F*.42,800,A.a,300,4e3,1,0,0,2,1);const ge=(t,e,a,r,n,c)=>Ko.push([t,e,a,r,n[0]*c,n[1]*c,n[2]*c,1]);for(let t=0;t<46;t++){const e=i();ge(Da+(i()-.5)*150*(e<.25?.35:1),10+i()*58,pe+(i()-.5)*60,.008+i()*.006,Qt(),.8+i()*i()*3.4)}ge(Ba,Xa,pe,.026,[1,.46,.1],7),ee.push(Da,38,pe,2600,A.a[0]*8e4,A.a[1]*8e4,A.a[2]*8e4,4e4,1,0,0,2),ee.push(Ba,Xa+8,pe,1800,1*8e4,.42*8e4,.09*8e4,4e4,1,0,0,2);const Ka=Ho(-3300*T,1250),Qa=Ka[0],Va=Ka[1];for(let t=0;t<26;t++)ge(Qa+(i()-.5)*100,10+i()*50,Va+(i()-.5)*60,.0045+i()*.004,Qt(),.6+i()*2);ge(Qa-40*T,96,Va,.012,[1,.4,.07],5);const ja=Ho(620*T,-430),Vo=ja[0],jo=ja[1];for(let t=0;t<11;t++){const e=i();ge(Vo+(i()-.5)*46,3+i()*9,jo+(i()-.5)*12,.008+i()*.006,t<2?[.9,.3,.22]:e<.3?A.b:[1,.78,.5],.8+i()*i()*3)}ge(Vo+14*T,12,jo,.011,[.9,.95,1],3.6),ee.push(Vo,9,jo,500,1*9e3,.68*9e3,.4*9e3,9e3,1,0,0,2);const xo=[Dt,4.2,Bt],fn=(t,e,a)=>{const r=xo[0],n=xo[1],c=xo[2];let l=t-r,f=e-n,d=a-c;const p=Math.hypot(l,f,d)-.3,P=1/(p+.3);l*=P,f*=P,d*=P;const L=1/(l||1e-9),D=1/(f||1e-9),W=1/(d||1e-9);for(const S of We){const V=(S[0]-r)*L,Mt=(S[3]-r)*L,it=(S[1]-n)*D,j=(S[4]-n)*D,vt=(S[2]-c)*W,qt=(S[5]-c)*W,Ot=Math.max(Math.min(V,Mt),Math.min(it,j),Math.min(vt,qt));if(!(Math.min(Math.max(V,Mt),Math.max(it,j),Math.max(vt,qt))<Math.max(Ot,0)||Ot>p))for(let Re=S[6];Re<S[7];Re++){const _=Nt[Re];if(_[6]<.5){const ft=(_[0]-_[3]-r)*L,Ft=(_[0]+_[3]-r)*L,Pt=(_[1]-_[4]-n)*D,At=(_[1]+_[4]-n)*D,le=(_[2]-_[5]-c)*W,ie=(_[2]+_[5]-c)*W,fe=Math.max(Math.min(ft,Ft),Math.min(Pt,At),Math.min(le,ie));if(Math.min(Math.max(ft,Ft),Math.max(Pt,At),Math.max(le,ie))>Math.max(fe,0)&&fe<p&&fe>0)return!0}else{const ft=_[3]-_[0],Ft=_[4]-_[1],Pt=_[5]-_[2],At=r-_[0],le=n-_[1],ie=c-_[2],fe=ft*ft+Ft*Ft+Pt*Pt,ze=ft*l+Ft*f+Pt*d,Ye=At*l+le*f+ie*d,Zt=At*ft+le*Ft+ie*Pt,fa=fe-ze*ze,Xe=Math.min(1,Math.max(0,(Zt-ze*Ye)/Math.max(fa,1e-6))),ut=_[0]+ft*Xe,Ht=_[1]+Ft*Xe,_o=_[2]+Pt*Xe,Ze=(ut-r)*l+(Ht-n)*f+(_o-c)*d,M1=r+l*Ze-ut,F1=n+f*Ze-Ht,P1=c+d*Ze-_o;if(M1*M1+F1*F1+P1*P1<_[7]*_[7]&&Ze>0&&Ze<p)return!0}}}return!1},mo=Ko.filter(t=>!fn(t[0],t[1],t[2])),vo=mo.length,bo=240;mo.push([b[0]*T,b[1]+30,b[2],.32,44,16,3,q?.3:.75]);for(let t=0;t<bo;t++){const e=i(),a=e<.3?x-1-i()*3:e<.55?x+i()*17:x+18+i()*i()*42,r=Qt(),n=.5+i()*i()*1.4;mo.push([(m+i()*v)*T,a,u-6-i()*4,(.06+i()*.05)*Qo,r[0]*n,r[1]*n,r[2]*n,1])}const Vt=new Float32Array((vo+1+bo)*8);mo.forEach((t,e)=>{Vt[e*8]=t[0],Vt[e*8+1]=t[1],Vt[e*8+2]=t[2],Vt[e*8+3]=t[3],Vt[e*8+4]=t[4],Vt[e*8+5]=t[5],Vt[e*8+6]=t[6],Vt[e*8+7]=t[7]});const Ya=o.createTexture();o.bindTexture(o.TEXTURE_2D,Ya),o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,2,vo+1+bo,0,o.RGBA,o.FLOAT,Vt),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);const un=H[0]===0&&H[1]===0?ee.length/12:Math.min(ee.length/12,44),hn=new Float32Array(ee),Za=1.11,po=Math.tan(34*Math.PI/180),It=po*Za,ne=Math.round(z*Za),re=_t(o,y,ne,ne,!0,o.LINEAR),Yo=_t(o,y,z,z,!1,o.LINEAR),Ja=_t(o,y,160,160,!0,o.LINEAR),$a=_t(o,y,160,160,!0,o.LINEAR),t1=1024,e1=256,Eo=_t(o,y,t1,e1,!0,o.LINEAR,o.REPEAT),ce=512,Le=128,Ke=_t(o,y,ce,Le,!0,o.LINEAR,o.REPEAT),yo=_t(o,y,ce,Le,!0,o.LINEAR,o.REPEAT),ye=256,o1=_t(o,y,ye,ye,"u",o.LINEAR,o.REPEAT),a1=_t(o,y,ye,ye,"u",o.LINEAR,o.REPEAT),Qe=z>600?320:140,To=Qe,n1=_t(o,y,Qe,To,"u",o.LINEAR),Te=y.flt?null:_t(o,y,Qe,To,"u",o.LINEAR);if(!y.flt){const t=re.lo=o.createTexture();o.bindTexture(o.TEXTURE_2D,t),o.texImage2D(o.TEXTURE_2D,0,o.SRGB8_ALPHA8,ne,ne,0,o.RGBA,o.UNSIGNED_BYTE,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.bindFramebuffer(o.FRAMEBUFFER,re.fb),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT1,o.TEXTURE_2D,t,0),o.drawBuffers([o.COLOR_ATTACHMENT0,o.COLOR_ATTACHMENT1])}Te&&(o.bindFramebuffer(o.FRAMEBUFFER,Te.fb),o.clearBufferuiv(o.COLOR,0,new Uint32Array([0,0,0,15360])),o.bindFramebuffer(o.FRAMEBUFFER,null));const xn=at==="Heavy swell"?1.5:at==="Oily calm"?.4:1,wo=[];for(let t=0;t<4;t++){const e=[185,122,76,47][t]*(.9+E()*.2),a=-.9+t*.55+E()*.35,r=6.28318/e,n=[1.35,.8,.38,.17][t]*xn*(.85+E()*.3);wo.push({kx:Math.cos(a)*r,kz:Math.sin(a)*r,a:n,om:Math.sqrt(9.81*r),ph:E()*6.28})}const r1=wo.reduce((t,e)=>t+e.a,0)+.5,c1=(t,e,a)=>{let r=0,n=0,c=0;for(const l of wo){const f=l.kx*t+l.kz*e-l.om*a+l.ph;r+=l.a*Math.sin(f);const d=Math.cos(f)*l.a;n+=l.kx*d,c+=l.kz*d}return[r,n,c]},s1=(t,e,a,r)=>{const n=new Float32Array(112),c=.6;for(let l=0;l<e;l++){const f=1+Math.floor(Math.pow(E(),1.6)*r),d=c+(E()-.5)*2.6*(E()<.25?1.6:1),p=Math.round(Math.cos(d)*f),P=Math.round(Math.sin(d)*f)||(E()<.5?1:-1),L=p*6.28318/t,D=P*6.28318/t,W=Math.hypot(L,D),S=a/(W*Math.pow(W*t/6.28318+2,.55)*Math.sqrt(e));n[l*4]=L,n[l*4+1]=D,n[l*4+2]=S*(.6+E()*.8),n[l*4+3]=Math.sqrt(9.81*W)}return n},Zo=118,Jo=26.7,l1=at==="Oily calm"?.5:1.05,dn=s1(Zo,28,.22*l1,26),mn=s1(Jo,28,.13*l1,24),Ro=new Float32Array(4);function i1(t,e,a,r){const n=y.P.wave;o.useProgram(n.p),o.bindVertexArray(y.vao),o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,t.fb),o.viewport(0,0,ye,ye),o.uniform4fv(n.uW,e),Ro[0]=a/ye,Ro[1]=28,Ro[2]=r,o.uniform4fv(n.uQ,Ro),o.drawArrays(o.TRIANGLES,0,3)}const zo={Drizzle:[.06,.7],Steady:[.04,1],Driving:[.03,1.45],Squall:[.022,1.9]}[U],vn=q?0:zo[0],Ve=q?[.0056,.0049,.0046]:[.0017*zo[1],.0021*zo[1],.004*zo[1]],bn=Oo(H,$[0],$[1],_a[2])[0],f1=$[0]+(bn>0?-.6:.6),Mo=$e?[.044,.073,.102,1.6*(No?Math.exp(-(Oe-to)*Math.hypot(Go,He)*.4):1)]:[0,0,0,0],u1=[Math.sin(f1)*T,Math.cos(f1)];if($e)for(let t=0;t<3;t++)Ve[t]=Ve[t]*.6+[.0016,.0036,.0068][t]*(q?.8:1);const $o=xo[1],h1=$[0]*T,x1=$[1],h={F:[0,0,1,It],R:[1,0,0,0],U:[0,1,0,0],o:[0,0,0],yaw:1e9,pitch:1e9},Ne=new Float32Array(11*4),kt=(t,e,a,r,n)=>{Ne[t*4]=e,Ne[t*4+1]=a,Ne[t*4+2]=r,Ne[t*4+3]=n},tt=new Float32Array(5*4),Fo=[[.25,.25],[-.25,-.25],[.25,-.25],[-.25,.25]];function d1(t,e,a,r,n,c){const l=y.P.scene;o.useProgram(l.p),o.bindVertexArray(y.vao),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_3D,y.tN),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,qa),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,t.fb),o.viewport(0,0,n,c),kt(0,h.o[0],h.o[1],h.o[2],e),kt(1,h.F[0],h.F[1],h.F[2],It),kt(2,h.R[0],h.R[1],h.R[2],a),kt(3,h.U[0],h.U[1],h.U[2],r),kt(4,to,He,We.length,un),kt(5,b[0]*T,b[1],b[2],q?1:1.35),kt(6,n,c,1,vn),kt(7,A.a[0],A.a[1],A.a[2],A.w),kt(8,Ve[0],Ve[1],Ve[2],Mo[3]),kt(9,Mo[0],Mo[1],Mo[2],1/.075),kt(10,$e?.3:1,u1[0],u1[1],$e?1:0),o.uniform4fv(l.uP,Ne),o.uniform4fv(l.uK,hn),o.drawArrays(o.TRIANGLES,0,3)}function m1(t,e,a,r){const n=y.P.lamp;o.useProgram(n.p),o.bindVertexArray(y.vao),o.activeTexture(o.TEXTURE11),o.bindTexture(o.TEXTURE_2D,Ya),o.bindFramebuffer(o.FRAMEBUFFER,t.fb),o.viewport(0,0,t.w,t.h),o.enable(o.BLEND),o.blendFuncSeparate(o.ONE,o.ONE,o.ZERO,o.ONE),tt[0]=h.o[0],tt[1]=h.o[1],tt[2]=h.o[2],tt[3]=e,tt[4]=h.F[0],tt[5]=h.F[1],tt[6]=h.F[2],tt[7]=It,tt[8]=h.R[0],tt[9]=h.R[1],tt[10]=h.R[2],tt[12]=h.U[0],tt[13]=h.U[1],tt[14]=h.U[2],tt[16]=r,tt[17]=q?0:1,o.uniform4fv(n.uC,tt),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,a),o.disable(o.BLEND)}const Se=(t,e,a,r,n,c)=>{const l=y.P.blur;o.useProgram(l.p),o.bindVertexArray(y.vao),o.disable(o.BLEND),o.activeTexture(o.TEXTURE2),o.bindTexture(o.TEXTURE_2D,t.tex),o.bindFramebuffer(o.FRAMEBUFFER,e.fb),o.viewport(0,0,a,r),o.uniform4f(l.uQ,1/a,1/r,n,c),o.drawArrays(o.TRIANGLES,0,3)},v1=Math.hypot(.68,.73),b1=-.68*T/v1,p1=.73/v1,ta=b1*io+p1*fo,ea=-b1*fo+p1*io,se=new Float32Array(64*4);let jt=0;const zt=(t,e,a,r,n,c,l)=>{const f=Dt+ta*t-ea*a,d=Bt+ea*t+ta*a;se[jt*8]=f,se[jt*8+1]=e,se[jt*8+2]=d,se[jt*8+3]=l,se[jt*8+4]=r,se[jt*8+5]=n,se[jt*8+6]=c,jt++};{const t=q1,e=$o-3.1,a=-T*t,r=T;zt(0,e-.25,a+r*7,34,.25,7,0),zt(-13.75,e+.68,a,20.25,.37,.07,1),zt(-20,e+.08,a,14,.23,.07,1);for(let n=-6;n<6;n+=2.1)zt(n+.55,e+.08,a,.55,.23,.07,1);for(let n=0;n<=9;n++)zt(6.5+n*1.5,e+.5,a,.05,.52,.05,4);zt(13.25,e+.52,a,6.75,.03,.03,4),zt(13.25,e+.06,a,6.75,.06,.025,4),zt(27,e+.45,a,7,.6,.07,1),zt(0,e+1.11,a,34,.08,.12,2),zt(0,e+.4,a+r*14,34,.55,.14,1),zt(-34,e+.4,a+r*7,.2,.85,7,1),ue!==2&&zt(34,e+3,a+r*7,3,3.5,6.5,3)}function pn(t,e,a){const r=y.P.boat;o.useProgram(r.p),o.bindVertexArray(y.vao),o.disable(o.DEPTH_TEST),o.disable(o.SCISSOR_TEST),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_3D,y.tN),o.activeTexture(o.TEXTURE4),o.bindTexture(o.TEXTURE_2D,Ke.tex),o.bindFramebuffer(o.FRAMEBUFFER,Yo.fb),o.viewport(0,0,z,z);const n=new Float32Array(5*4);n[0]=h.o[0],n[1]=h.o[1],n[2]=h.o[2],n[3]=(b[0]*T-h.o[0])/Math.hypot(b[0]*T-Dt,b[2]-Bt),n[4]=h.F[0],n[5]=h.F[1],n[6]=h.F[2],n[7]=po,n[8]=h.R[0],n[9]=h.R[1],n[10]=h.R[2],n[12]=h.U[0],n[13]=h.U[1],n[14]=h.U[2],n[16]=ta,n[17]=ea,n[18]=(b[2]-h.o[2])/Math.hypot(b[0]*T-Dt,b[2]-Bt),n[19]=ho,o.uniform4fv(r.uB,n),o.uniform4fv(r.uBX,se),o.uniform4f(r.uBP,t,e,a,jt),o.drawArrays(o.TRIANGLES,0,3)}function En(t){const e=Math.cos(h.pitch),a=Math.sin(h.pitch),r=Math.cos(h.yaw),n=Math.sin(h.yaw);h.F=[n*e,a,r*e],h.R=[r,0,-n],h.U=[-n*a,e,-r*a],o.bindFramebuffer(o.FRAMEBUFFER,re.fb),o.viewport(0,0,ne,ne),o.disable(o.BLEND),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT);const c=Math.max(1,Math.min(t,4));o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE);for(let f=0;f<c;f++)Ne[3]=0,yn(f,c);o.disable(o.BLEND),Se(re,$a,160,160,.06,0),Se($a,Ja,160,160,0,.06),m1(re,0,vo,1),o.bindFramebuffer(o.FRAMEBUFFER,Yo.fb),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE);const l=Math.min(t,2);for(let f=0;f<l;f++)Tn(f,l);o.disable(o.BLEND)}function yn(t,e){o.blendColor(1/e,1/e,1/e,1/e),o.blendFunc(o.CONSTANT_COLOR,o.ONE),d1(re,0,Fo[t][0]*2,Fo[t][1]*2,ne,ne)}function Tn(t,e){o.blendColor(1/e,1/e,1/e,1/e),o.blendFunc(o.CONSTANT_COLOR,o.ONE),pn(Fo[t][0]*2,Fo[t][1]*2,z)}function wn(){d1(Eo,1,0,0,t1,e1),m1(Eo,1,vo+1+bo,1),Se(Eo,yo,ce,Le,2/ce,0),Se(yo,Ke,ce,Le,0,.12),Se(Ke,yo,ce,Le,0,.32),Se(yo,Ke,ce,Le,1.2/ce,0)}const ke=(Xo?118:Io?54:88)*(ve?.8:1),Ce=[-.42*T,.86,-.2],oa=Math.hypot(Ce[0],Ce[1],Ce[2]),Ue=[Ce[0]/oa,Ce[1]/oa,Ce[2]/oa],aa=[-.9*T,-.1,-.42],g=new Float32Array(8*4),we=[b[0]*T,b[1],b[2]],Rn=[we[0]-15*T,we[1]-3,we[2]+13];function E1(t,e,a,r,n){const c=y.P.flame;o.useProgram(c.p),o.bindVertexArray(y.vao),o.disable(o.DEPTH_TEST),o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,n&&Te?Te.fb:n1.fb),o.viewport(0,0,Qe,To),n&&!Te?(o.enable(o.BLEND),o.blendFuncSeparate(o.ONE,o.SRC_ALPHA,o.ZERO,o.SRC_ALPHA)):o.disable(o.BLEND),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_3D,y.tN),g[0]=e[0],g[1]=e[1],g[2]=e[2],g[3]=e[3],g[4]=h.o[0],g[5]=h.o[1],g[6]=h.o[2],g[7]=t,g[8]=h.F[0],g[9]=h.F[1],g[10]=h.F[2],g[11]=It,g[12]=h.R[0],g[13]=h.R[1],g[14]=h.R[2],g[15]=1/Qe,g[16]=h.U[0],g[17]=h.U[1],g[18]=h.U[2],g[19]=1/To,g[20]=a[0],g[21]=a[1],g[22]=a[2],g[23]=ke,g[24]=Ue[0],g[25]=Ue[1],g[26]=Ue[2],g[27]=r,g[28]=aa[0],g[29]=aa[1],g[30]=aa[2],g[31]=ve?1.15:1,o.uniform4fv(c.uF,g),o.drawArrays(o.TRIANGLES,0,3),o.disable(o.BLEND)}function zn(){const t=[we[0]+Ue[0]*ke*.58,we[1]+Ue[1]*ke*.58,we[2]+Ue[2]*ke*.58],e=t[0]-h.o[0],a=t[1]-h.o[1],r=t[2]-h.o[2],n=e*h.F[0]+a*h.F[1]+r*h.F[2];if(n<10)return null;const c=ke*(ve?1.3:.95)/n,l=(e*h.R[0]+a*h.R[1]+r*h.R[2])/n/It,f=(e*h.U[0]+a*h.U[1]+r*h.U[2])/n/It,d=c/It;return Math.abs(l)>1+d||Math.abs(f)>1+d?null:[.5+(l-d)*.5,.5+(f-d)*.5,d,d]}xe.splice(Math.min(xe.length,9),0,...ya);const Et=new Float32Array(28*4),y1=Math.min(xe.length,13),na=q?1:1.45;Et[0]=y1,Et[4]=(A.a[0]*.24+.2)*na,Et[5]=(A.a[1]*.24+.18)*na,Et[6]=(A.a[2]*.24+.16)*na;const Mn=at==="Oily calm"?.45:at==="Heavy swell"?1.4:1,Fn=t=>{for(let e=0;e<y1;e++){const a=xe[e],r=8+e*8,n=c1(a[0],a[1],t)[0],c=Math.min(1,Math.max(0,n/r1*1.4+.45)),l=a[3]*Mn;Et[r]=a[0],Et[r+1]=a[1],Et[r+2]=a[2],Et[r+3]=n,Et[r+4]=n+.6+l*(1+3*c),Et[r+5]=2.2+4*c,Et[r+6]=c*.35,Et[r+7]=.75*l}},I=new Float32Array(6*4),yt=new Float32Array(3*4),je=new Float32Array(4*4),lt=new Float32Array(4*4),De=new Float32Array(4);let ra=1e9,ca=1e9,sa=1e9,la=1e9,ia=1e9,Po=99,T1=!1,Yt=null,w1=!1;const R1=(t,e)=>{let a=Math.imul(t^Math.imul(e,668265261),739982445)^1560;return a=Math.imul(a^a>>>15,695872825),a^=a>>>13,(a>>>0)/4294967296},Be=(t,e)=>{const a=Math.floor(t),r=t-a,n=r*r*(3-2*r);return R1(a,e)*(1-n)+R1(a+1,e)*n};function z1(t,e){const a=s.view||A1,r=c1(Dt,Bt,t),n=r[0]*.85,c=-r[2]*.55,l=r[1]*.6+.016*T,f=h1+(a.yaw||0)+(Be(t*.05,1)-.5)*.026,d=x1+(a.pitch||0)+c,p=Dt+(a.x||0),P=Bt+(a.z||0),L=$o+n+(a.y||0),D=h1+(a.yaw||0),W=x1+(a.pitch||0),S=Math.abs(D-ra)+Math.abs(W-ca)>.004||Math.abs((a.x||0)-sa)+Math.abs((a.y||0)-la)+Math.abs((a.z||0)-ia)>.05;if(S||Po===5){S&&(ra=D,ca=W,sa=a.x||0,la=a.y||0,ia=a.z||0),h.o=[Dt+sa,$o+la,Bt+ia],h.yaw=ra,h.pitch=ca,T1||(h.F=[0,0,1],h.R=[1,0,0],h.U=[0,1,0],wn(),T1=!0);const ut=S&&t>0?1:4;(S||!w1)&&(En(ut),w1=ut===4),Yt=zn(),Po=S?0:6}else Po<6&&Po++;i1(o1,dn,Zo,t),i1(a1,mn,Jo,t*1.07+3.7);const V=Be(t*.16,2)*.65+Be(t*.55,3)*.35,Mt=1+((Be(t*.9,4)-.5)*.11+(Be(t*2.6,5)-.5)*.07+(Be(t*.27,6)-.5)*.14)*(gt==="Low flame"?1.5:1);Yt&&(E1(t,Yt,we,V,!1),ve&&E1(t*1.13+7.3,Yt,Rn,1-V,!0));const it=Math.cos(l),j=Math.sin(l),vt=Math.cos(d),qt=Math.sin(d),Ot=Math.cos(f),Ao=Math.sin(f),Re=[Ao*vt,qt,Ot*vt],_=[Ot,0,-Ao],ft=[-Ao*qt,vt,-Ot*qt],Ft=[_[0]*it+ft[0]*j,_[1]*it+ft[1]*j,_[2]*it+ft[2]*j],Pt=[ft[0]*it-_[0]*j,ft[1]*it-_[1]*j,ft[2]*it-_[2]*j];lt[0]=p,lt[1]=L,lt[2]=P,lt[3]=0,lt[4]=Re[0],lt[5]=Re[1],lt[6]=Re[2],lt[7]=po,lt[8]=Ft[0],lt[9]=Ft[1],lt[10]=Ft[2],lt[12]=Pt[0],lt[13]=Pt[1],lt[14]=Pt[2];const At=[p-h.o[0],L-h.o[1],P-h.o[2]],le=Ua+75;yt[0]=h.F[0],yt[1]=h.F[1],yt[2]=h.F[2],yt[3]=It,yt[4]=h.R[0],yt[5]=h.R[1],yt[6]=h.R[2],yt[7]=(At[0]*h.R[0]+At[1]*h.R[1]+At[2]*h.R[2])/(le*It),yt[8]=h.U[0],yt[9]=h.U[1],yt[10]=h.U[2],yt[11]=(At[0]*h.U[0]+At[1]*h.U[1]+At[2]*h.U[2])/(le*It);for(let ut=0;ut<4;ut++){const Ht=wo[ut];je[ut*4]=Ht.kx,je[ut*4+1]=Ht.kz,je[ut*4+2]=Ht.a,je[ut*4+3]=Ht.ph-Ht.om*t}const ie=b[0]*T-p,fe=b[1]+ke*.45-L,ze=b[2]-P,Ye=Math.hypot(ie,fe,ze),Zt=y.P.comp;o.useProgram(Zt.p),o.bindVertexArray(y.vao),o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,z,z);const fa=[[0,y.tN,1],[2,re.tex],[3,Eo.tex],[4,Ke.tex],[5,Ja.tex],[6,o1.tex],[7,a1.tex],[8,n1.tex],[9,Yo.tex],[10,y.tS]];for(const[ut,Ht,_o]of fa)o.activeTexture(o.TEXTURE0+ut),o.bindTexture(_o?o.TEXTURE_3D:o.TEXTURE_2D,Ht);Te&&(o.activeTexture(o.TEXTURE12),o.bindTexture(o.TEXTURE_2D,Te.tex),o.activeTexture(o.TEXTURE13),o.bindTexture(o.TEXTURE_2D,re.lo)),I[0]=1/z,I[1]=t,I[2]=0,I[3]=Mt,I[4]=r1,I[5]=Ua+65,I[6]=to,I[7]=110;const Xe=z/(2*po);I[8]=Xe,I[9]=1/Xe,I[10]=1/Zo,I[11]=1/Jo,I[12]=.025*So,I[13]=2.5,I[14]=1.45,I[15]=1.05,I[16]=.36,I[17]=.85*ho,I[18]=So,I[19]=.18+So*.12,I[20]=ie/Ye,I[21]=fe/Ye,I[22]=ze/Ye,I[23]=at==="Heavy swell"&&!q?.75:0,o.uniform4fv(Zt.uC,I),o.uniform4fv(Zt.uCa,lt),o.uniform4fv(Zt.uB,yt),o.uniform4fv(Zt.uSw,je),Yt?(De[0]=Yt[0],De[1]=Yt[1],De[2]=Yt[2],De[3]=Yt[3]):De[2]=0,o.uniform4fv(Zt.uFr,De),Fn(t),o.uniform4fv(Zt.uLg,Et),o.drawArrays(o.TRIANGLES,0,3),o.bindVertexArray(null)}return z1(0,0),z1}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
