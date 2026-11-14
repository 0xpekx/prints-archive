// Oil Rig: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/618.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ha){ha&&function(){"use strict";const A1={yaw:0,pitch:0,x:0,y:0,z:0},Lo=`#version 300 es
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
vec4 nfF(vec2 uv){ivec2 m=textureSize(uFl,0)-1;vec2 p=uv*vec2(m+1)-.5,q=floor(p),f=p-q;ivec2 i=ivec2(q);return mix(mix(nfF2(i,m),nfF2(i+ivec2(1,0),m),f.x),mix(nfF2(i+ivec2(0,1),m),nfF2(i+1,m),f.x),f.y);}`),o=z(o,"vec4 a=texture(uA,ub);","vec4 a=texture(uA,ub),al=texture(uAl,ub);a.rgb=mix(al.rgb,a.rgb/"+y+",step(.9,al.rgb));"),o=z(o,"vec4 c1=texture(uW1,P.xz*uC[2].z),c2=texture(uW2,P.xz*uC[2].w);","vec4 c1=nfW(uW1,P.xz*uC[2].z),c2=nfW(uW2,P.xz*uC[2].w);"),o=z(o,"vec4 e=texture(uEnv,uvE),es=texture(uEnvS,uvE);","vec4 e=texture(uEnv,uvE),es=texture(uEnvS,uvE);e.rgb/="+y+";es.rgb/="+y+";"),o=z(o,"vec4 f=texture(uFl,fq);","vec4 f=nfF(fq);"),z(o,"col+=texture(uBl,ub).rgb*uC[4].x;","col+=texture(uBl,ub).rgb/"+y+"*uC[4].x;")):o};function X1(s){if(s.__c618)return s.__c618;s.getExtension("KHR_parallel_shader_compile");const o=!!s.getExtension("EXT_color_buffer_float"),z=!!s.getExtension("EXT_color_buffer_half_float")||o;s.getExtension("OES_texture_float_linear");const y=(k,G)=>{const T=s.createShader(k);return s.shaderSource(T,G),s.compileShader(T),T},Y={},E=y(s.VERTEX_SHADER,Lo+_1),Z=y(s.VERTEX_SHADER,Lo+N1),i=(k,G,T)=>{const j=y(s.FRAGMENT_SHADER,Lo+(z?G:B1(k,G))),ot=s.createProgram();s.attachShader(ot,T),s.attachShader(ot,j),s.linkProgram(ot),s.flush(),Y[k]={p:ot,f:j}};i("scene",g1,E),i("boat",L1,E),i("lamp",S1,Z),i("blur",k1,E),i("wave",C1,E),i("flame",U1,E),i("comp",D1,E);let M=1636465422;const C=64,W=new Float32Array(C*C*C),U=new Float32Array(C*C*C);for(let k=0;k<W.length;k++){M=M+1831565813|0;let G=Math.imul(M^M>>>15,1|M);G=G+Math.imul(G^G>>>7,61|G)^G,W[k]=((G^G>>>14)>>>0)/4294967296}const Gt=[.25,.5,.25],ft=(k,G,T,j,ot)=>{for(let Kt=0;Kt<C;Kt++)for(let gt=0;gt<C;gt++)for(let Ct=0;Ct<C;Ct++){let Fe=0;for(let yt=-1;yt<=1;yt++)Fe+=Gt[yt+1]*k[(Ct+yt*T&63)+64*((gt+yt*j&63)+64*(Kt+yt*ot&63))];G[Ct+64*(gt+64*Kt)]=Fe}};ft(W,U,1,0,0),ft(U,W,0,1,0),ft(W,U,0,0,1);let ue=1e9,ut=-1e9;for(let k=0;k<U.length;k++)U[k]<ue&&(ue=U[k]),U[k]>ut&&(ut=U[k]);const qe=new Uint8Array(C*C*C),Oe=255/(ut-ue);for(let k=0;k<U.length;k++)qe[k]=(U[k]-ue)*Oe;const D=128,kt=256,Me=new Uint8Array(D*kt);for(let k=0;k<300;k++){M=M+1831565813|0;const G=(M^M>>>11)>>>0,T=G%D,j=(G>>>8)%kt,ot=12+(G>>>20)%40,Kt=90+(G>>>24)%165;for(let gt=0;gt<ot;gt++){const Ct=j+gt&kt-1,Fe=Math.sin(gt/ot*3.14159);Me[T+Ct*D]=Math.max(Me[T+Ct*D],Kt*Fe)}}return s.__c618={P:Y,flt:z,vao:s.createVertexArray(),tN:null,tS:null,linked:!1,u8:qe,rs:Me,R:D,RH:kt}}function I1(s,o){if(o.linked)return;const z=o.P,y=["uN","uPr","uA","uEnv","uEnvS","uBl","uW1","uW2","uFl","uBo","uRn","uD"],Y=["uP","uLg","uK","uB","uBX","uBP","uC","uQ","uW","uF","uCa","uSw","uFr"];for(const i in z){const{p:M,f:C}=z[i];if(!s.getProgramParameter(M,s.LINK_STATUS))throw new Error("618 "+i+": "+(s.getShaderInfoLog(C)||"")+s.getProgramInfoLog(M));s.useProgram(M),y.forEach((U,Gt)=>{const ft=s.getUniformLocation(M,U);ft&&s.uniform1i(ft,Gt)});const W={p:M};for(const U of Y)W[U]=s.getUniformLocation(M,U);z[i]=W}const E=s.createTexture();s.bindTexture(s.TEXTURE_3D,E),s.pixelStorei(s.UNPACK_ALIGNMENT,1),s.texImage3D(s.TEXTURE_3D,0,s.R8,64,64,64,0,s.RED,s.UNSIGNED_BYTE,o.u8),s.texParameteri(s.TEXTURE_3D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_3D,s.TEXTURE_MAG_FILTER,s.LINEAR);for(const i of[s.TEXTURE_WRAP_S,s.TEXTURE_WRAP_T,s.TEXTURE_WRAP_R])s.texParameteri(s.TEXTURE_3D,i,s.REPEAT);const Z=s.createTexture();s.bindTexture(s.TEXTURE_2D,Z),s.texImage2D(s.TEXTURE_2D,0,s.R8,o.R,o.RH,0,s.RED,s.UNSIGNED_BYTE,o.rs),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.REPEAT),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.REPEAT),s.pixelStorei(s.UNPACK_ALIGNMENT,4),o.flt||(s.useProgram(z.comp.p),s.uniform1i(s.getUniformLocation(z.comp.p,"uFl2"),12),s.uniform1i(s.getUniformLocation(z.comp.p,"uAl"),13)),o.tN=E,o.tS=Z,o.u8=null,o.rs=null,o.linked=!0}function _t(s,o,z,y,Y,E,Z){const i=s.createTexture();s.bindTexture(s.TEXTURE_2D,i);const M=Y==="u"&&!o.flt;Y&&o.flt?s.texImage2D(s.TEXTURE_2D,0,s.RGBA16F,z,y,0,s.RGBA,s.HALF_FLOAT,null):M?s.texImage2D(s.TEXTURE_2D,0,s.RGBA16UI,z,y,0,s.RGBA_INTEGER,s.UNSIGNED_SHORT,null):Y?s.texImage2D(s.TEXTURE_2D,0,s.SRGB8_ALPHA8,z,y,0,s.RGBA,s.UNSIGNED_BYTE,null):s.texImage2D(s.TEXTURE_2D,0,s.RGBA8,z,y,0,s.RGBA,s.UNSIGNED_BYTE,null),M&&(E=s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,E),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,E),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,Z||s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,Z===s.REPEAT?s.REPEAT:s.CLAMP_TO_EDGE);const C=s.createFramebuffer();return s.bindFramebuffer(s.FRAMEBUFFER,C),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,i,0),M?s.clearBufferuiv(s.COLOR,0,new Uint32Array(4)):(s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT)),s.bindFramebuffer(s.FRAMEBUFFER,null),{tex:i,fb:C,w:z,h:y}}ha.add({num:618,name:"Oil Rig",fam:"Vistas",recipe:"Low on a boat in a long swell beside an oil platform in the rain, with hundreds of work lights shining in broken columns on the black water and the flare lighting up the cloud overhead. The rain, the flare, the swell and where the boat sits change every mint, and a few are at last light with the rig black against the sky. No controls, just look.",gl:!0,music:!1,fps:30,seed:0,make(s){const o=s.gl,z=s.size,y=X1(o);let Y=parseInt(s.hash.slice(2,10),16)|0;const E=()=>{Y=Y+1831565813|0;let t=Math.imul(Y^Y>>>15,1|Y);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let Z=Math.imul((parseInt(s.hash.slice(2,10),16)|0)^3807169,739982445)|0;const i=()=>{Z=Z+1831565813|0;let t=Math.imul(Z^Z>>>15,1|Z);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},M=(t,e)=>t+i()*(e-t),C=t=>{let e=0;for(const r of t)e+=r[1];let a=E()*e;for(const r of t)if(a-=r[1],a<=0)return r[0];return t[0][0]},W=s.home,U=W?"Steady":C([["Steady",5],["Driving",3],["Drizzle",3],["Squall",1]]),Gt=W?"Full burn":C([["Full burn",5],["Roaring",2],["Low flame",3],["Twin tips",1]]),ft=W?"Long swell":C([["Long swell",5],["Heavy swell",3],["Oily calm",2]]),ue=W?"Mixed floods":C([["Sodium",5],["Mixed floods",3],["White floods",2],["Old amber",2]]);let ut=W?"Jacket":C([["Jacket",5],["Semi-sub",3],["Tall jacket",2]]);const qe=W?"Starboard":C([["Starboard",3],["Port",2]]),Oe=W?"Low ceiling":C([["Low ceiling",5],["Very low",2],["High",2]]);let D=W?"Alongside":C([["Alongside",5],["Standing off",3],["Close in",2]]),kt=Math.imul((parseInt(s.hash.slice(2,10),16)|0)^7281198,1540483477)|0;const Me=()=>{kt=kt+1831565813|0;let t=Math.imul(kt^kt>>>15,1|kt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},k=Me(),G=Me();!W&&k<.2&&(ut="Jack-up"),!W&&G<.17&&(D="Far off"),s.trait("Rain",U),s.trait("Flare",Gt),s.trait("Swell",ft),s.trait("Lamps",ue),s.trait("Platform",ut),s.trait("Side",qe),s.trait("Cloud",Oe),s.trait("Lying",D);const T=qe==="Port"?-1:1,j=D==="Far off";let ot=Math.imul((parseInt(s.hash.slice(2,10),16)|0)^2842259,73244475)|0;const Kt=()=>{ot=ot+1831565813|0;let t=Math.imul(ot^ot>>>15,1|ot);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},gt=Kt(),Ct=W?0:Math.min(2,Math.floor(gt*3)),Fe=[5.4,3,9][Ct];let yt=Math.imul((parseInt(s.hash.slice(2,10),16)|0)^5116835,461845907)|0;const Ut=()=>{yt=yt+1831565813|0;let t=Math.imul(yt^yt>>>15,1|yt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},xa=Ut(),da=Ut(),q1=Ut(),No=Ut(),O1=Ut(),H1=Ut(),W1=Ut(),ma=Ut(),G1=Ut(),K1=Ut();let Qt=W||D==="Far off"||xa<.38?"Abeam":xa<.74?"Off the corner":"Under the boom",He=W||D==="Close in"||da<.55?"One platform":da<.77?"Flare tower":"Bridge-linked";Qt==="Under the boom"&&He!=="One platform"&&(Qt="Off the corner");const va=W||q1<.78?"Dead of night":"Last light",Pe=He!=="One platform",ht=He==="Bridge-linked",to=va==="Last light",A={Sodium:{a:[1,.5,.12],b:[1,.68,.36],w:.15},"Mixed floods":{a:[1,.52,.14],b:[.72,.86,1],w:.42},"White floods":{a:[.8,.88,1],b:[1,.86,.62],w:.35},"Old amber":{a:[1,.62,.22],b:[1,.4,.1],w:.4}}[ue],We=(U==="Driving"?.0052:U==="Drizzle"?.0021:U==="Squall"?.0078:.0034)*(D==="Far off"?.45:1),So=Qt==="Under the boom"&&(U==="Squall"||U==="Driving"),eo=Qt==="Under the boom"?Math.min(We,.0034):We,ko=U==="Driving"?1.3:U==="Drizzle"?.35:U==="Squall"?1.9:.8,Ge=Oe==="Very low"?175:Oe==="High"?360:235,u=D==="Standing off"?190:D==="Close in"?68:D==="Far off"?560:105,m=-6,v=108,F=82,x=ut==="Tall jacket"?62:ut==="Semi-sub"?38:ut==="Jack-up"?30:46,Lt=[],Ke=[];let oo=0;const w=(t,e,a,r,n,c,l)=>Lt.push([t*T,e,a,r,n,c,0,l]),Fn=(t,e,a,r,n,c,l)=>Lt.push([t*T,e,a,r*T,n,c,1,l]),K=()=>{if(Lt.length===oo)return;const t=[1e9,1e9,1e9,-1e9,-1e9,-1e9];for(let e=oo;e<Lt.length;e++){const a=Lt[e];let r,n;if(a[6]<.5)r=[a[0]-a[3],a[1]-a[4],a[2]-a[5]],n=[a[0]+a[3],a[1]+a[4],a[2]+a[5]];else{const c=a[7];r=[Math.min(a[0],a[3])-c,Math.min(a[1],a[4])-c,Math.min(a[2],a[5])-c],n=[Math.max(a[0],a[3])+c,Math.max(a[1],a[4])+c,Math.max(a[2],a[5])+c]}for(let c=0;c<3;c++)r[c]<t[c]&&(t[c]=r[c]),n[c]>t[c+3]&&(t[c+3]=n[c])}Ke.push(t.concat([oo,Lt.length])),oo=Lt.length},R=(t,e,a,r,n,c,l,f)=>Lt.push([t*T,e,a,r*T,n,c,1,l,f]),q=(t,e,a,r)=>R(t[0],t[1],t[2],e[0],e[1],e[2],a,r),Co=(t,e,a)=>[t[0]+(e[0]-t[0])*a,t[1]+(e[1]-t[1])*a,t[2]+(e[2]-t[2])*a],ba=t=>{const e=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/e,t[1]/e,t[2]/e]},pa=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],$t=(t,e,a,r,n,c,l,f,d,p,P)=>{const L=ba([e[0]-t[0],e[1]-t[1],e[2]-t[2]]),B=ba(pa(L,p)),H=pa(B,L),S=(Q,zt)=>{const lt=(a+(r-a)*zt)*(c===4?1.414:1),V=c===4?Q*1.5708+.7854:Q*2.0944+1.5708,vt=Co(t,e,zt),Ot=Math.cos(V)*lt,Ht=Math.sin(V)*lt;return[vt[0]+B[0]*Ot+H[0]*Ht,vt[1]+B[1]*Ot+H[1]*Ht,vt[2]+B[2]*Ot+H[2]*Ht]};for(let Q=0;Q<c;Q++)q(S(Q,0),S(Q,1),l,d);for(let Q=0;Q<n;Q++){const zt=Q/n,lt=(Q+1)/n;for(let V=0;V<c;V++){const vt=(V+1)%c;(Q+V)%2===0?q(S(V,zt),S(vt,lt),f,d):q(S(vt,zt),S(V,lt),f,d),P&&Q>0&&q(S(V,zt),S(vt,zt),f*.9,d)}}},he=(t,e,a,r)=>{w((t+e)*.5,a,r,Math.abs(e-t)*.5,.045,.045,8),w((t+e)*.5,a-.5,r,Math.abs(e-t)*.5,.03,.03,8)},ao=(t,e,a,r)=>{w(t,r,(e+a)*.5,.045,.045,Math.abs(a-e)*.5,8),w(t,r-.5,(e+a)*.5,.03,.03,Math.abs(a-e)*.5,8)},Uo=(t,e,a,r,n)=>{for(const[f,d]of[[-1.3,-1.1],[1.3,-1.1],[-1.3,1.1],[1.3,1.1]])R(t+f,a,e+d,t+f,r,e+d,.1,8);const c=Math.max(1,Math.round((r-a)/3.6)),l=(r-a)/c;for(let f=0;f<c;f++){const d=a+l*f,p=d+l,P=f%2?1:-1;w(t,p,e,1.35,.06,1.15,8),R(t-1.1*P,d+.2,e-.55,t+1.1*P,p,e-.55,.22,8),n.push([t+.6*P,p+.9,e-1.3])}},Ea=[],ya=[],Q1=[m+6,m+v*.36,m+v*.64,m+v-6],V1=[u+3,u+F*.5,u+F-4],no=[],xe=[],Ta=[];if(ut==="Jack-up"){const t=[[m+5,u+3],[m+v-5,u+3],[m+v*.5,u+F-3]];for(const[e,a]of t)$t([e,-6,a],[e,x+78,a],6,6,30,3,.6,.26,8,[0,0,1],!0),w(e,x+3.5,a,9,4.5,9,0),xe.push([e*T,a,6.5,a<u+20?1.1:.8]),K();w(m+v*.5,x-4,u+F*.5,v*.5+3,4.5,F*.5+2,1),K()}else if(ut==="Semi-sub"){const t=[m+10,m+v*.5,m+v-10];for(const e of[u+12,u+F-12]){for(const a of t)w(a,x*.5-2,e,8.5,x*.5+3,8.5,6),xe.push([a*T,e,9.5,e<u+20?1.1:.8]);w(m+v*.5,-1.5,e,v*.5,2.3,7.6,6)}K();for(const e of[u+12,u+F-12])R(t[0],9,e,t[2],9,e,1.3,3),R(t[0],x-6,e,t[2],x-6,e,1,3);for(const e of t)R(e,9,u+12,e,9,u+F-12,1.1,3),R(e,9,u+20,e,x-6,u+F-20,.9,3);for(let e=0;e<2;e++){const a=t[e]+8.5,r=t[e+1]-8.5;R(a,12,u+12,r,x-7,u+12,.8,3),R(r,12,u+12,a,x-7,u+12,.8,3)}for(let e=0;e<4;e++){const a=m+30+e*9;R(a,x-2,u+4,a+1,8,u-2-e,.35,3),R(a+1,8,u-2-e,a+1.6,-4,u-8-e*2,.35,3)}Uo(t[0]+10,u+4,3,x-2,no),K()}else{const t=x+1,e=(c,l,f)=>{const d=(f+6)/(t+6),p=(c===0?1:c===3?-1:0)*5,P=(l===0?1:l===2?-1:0)*3.4;return[Q1[c]+p*(1-d),f,V1[l]+P*(1-d)]},a=[6,x*.5,t];for(let c=0;c<3;c++)for(let l=0;l<4;l++){const f=e(l,c,0);xe.push([f[0]*T,f[2],1.9,c===0?1:c===1?.8:.6])}const r=[-6,6,x*.5,t];for(let c=0;c<3;c++){for(let l=0;l<4;l++){q(e(l,c,-6),e(l,c,t+1),1.75,3);for(const f of a)q(e(l,c,f-1.4),e(l,c,f+1.4),2.15,3)}for(const l of a)for(let f=0;f<3;f++)q(e(f,c,l),e(f+1,c,l),.5,3);for(let l=0;l<3;l++)for(let f=0;f<3;f++){const d=r[l],p=r[l+1];c!==1?(q(e(f,c,d),e(f+1,c,p),.45,3),q(e(f+1,c,d),e(f,c,p),.45,3)):(f+l)%2?q(e(f,c,d),e(f+1,c,p),.42,3):q(e(f+1,c,d),e(f,c,p),.42,3)}if(c<2){for(let l=0;l<4;l++){for(const f of a)q(e(l,c,f),e(l,c+1,f),.5,3);for(let f=0;f<3;f++){const d=r[f],p=r[f+1];l===0||l===3?(q(e(l,c,d),e(l,c+1,p),.45,3),q(e(l,c+1,d),e(l,c,p),.45,3)):(f+c)%2&&q(e(l,c,d),e(l,c+1,p),.42,3)}}for(const l of a)q(e(0,c,l),e(3,c+1,l),.4,3)}K()}for(let c=0;c<14;c++){const l=(c%7-3)*2.2,f=u+24+Math.floor(c/7)*3.2;R(m+v*.5+l,-6,f,m+v*.5+l+M(-.3,.3),x+1,f,.42,3)}for(const c of a)w(m+v*.5,c,u+25.6,8.5,.3,2.6,8);for(let c=0;c<4;c++){const l=e(1+(c>>1),0,-6),f=e(1+(c>>1),0,x),d=(c%2?1:-1)*2.6;R(l[0]+d,-6,l[2]-2.4,f[0]+d,x,f[2]-2.4,.38,3)}const n=e(0,0,4);w(n[0]+1,4.2,n[2]-4.6,5,.22,2.4,8),he(n[0]-4,n[0]+6,5.3,n[2]-7);for(let c=0;c<4;c++)R(n[0]-3.5+c*3,1.5,n[2]-6.9,n[0]-3.5+c*3,5.4,n[2]-6.9,.14,8);Uo(n[0]+3.5,n[2]-4.2,4.4,x,no),no.push([n[0]+1,6.4,n[2]-6.4]),K()}if(ut!=="Semi-sub"&&ut!=="Jack-up")for(let t=0;t<6;t++)M(-.5,.5),i();const Do=m+v*.5,Bo=u+F*.5;w(Do,x+1,Bo,v*.5+6,1,F*.5+5,1),w(Do,x+16.6,Bo,v*.5+2,.7,F*.5+1,1),w(Do+4,x+9,Bo+6,v*.5-4,7,F*.5-5,1),w(m+v*(.42+M(-.05,.05)),x-4.4,u+F*.46,v*.34,4.6,F*.3,1);const Ae=m-4+i()*20,ro=Ae+v*(.35+i()*.3);w((Ae+ro)*.5,x+8.6,u+2,(ro-Ae)*.5,.22,6.5,8),K();for(let t=0;t<=12;t++){const e=m-5+t*(v+10)/12;R(e,x+2,u-4.6,e,x+16,u-4.6,.38,8),t<12&&t%3===1&&R(e,x+2.2,u-4.6,e+(v+10)/12,x+15.8,u-4.6,.26,8)}for(let t=0;t<=9;t++){const e=u-4+t*(F+8)/9;R(m-5.4,x+2,e,m-5.4,x+16,e,.38,8),t<9&&t%3===2&&R(m-5.4,x+2.2,e,m-5.4,x+15.8,e+(F+8)/9,.26,8)}he(m-6,m+v+6,x+3.1,u-5.2),he(m-2,m+v+2,x+18.4,u-1.2),he(Ae,ro,x+9.9,u-4.3),ao(m-6.2,u-5,u+F+5,x+3.1),ao(m-2.2,u-1,u+F+1,x+18.4);const j1=m+v*(.52+i()*.12);for(let t=0;t<3;t++){const e=j1+t*12;R(e,x+12.6,u-7.4,e+7.4,x+12.6,u-7.4,1.45,7),R(e+.4,x+16.2,u-4.8,e+.4,x+14.4,u-7.4,.2,8),R(e+7,x+16.2,u-4.8,e+7,x+14.4,u-7.4,.2,8),ya.push([e+3.7,x+15.6,u-6.6])}K();for(let t=0;t<4;t++){const e=m+4+t*v*.23+i()*8,a=6+i()*5,r=1.2+i()*.8,n=(t%2?x+8.8:x+2)+r+.3;R(e,n,u+1.5+i()*2,e+a,n,u+1.5+i()*2,r,8)}for(let t=0;t<4;t++){const e=m+10+i()*(v-20),a=2+i()*3,r=1.5+i()*2.5;w(e,x+2+r,u+1.5+i()*2,a,r,2+i(),0)}for(let t=0;t<3;t++){const e=m+8+i()*(v-16),a=1+i()*.8;R(e,x+2+a,u+3,e,x+9+i()*5,u+3,a,3)}for(let t=0;t<3;t++){const e=u+10+t*18+i()*8,a=5+i()*4;R(m-1,x+3.6+t%2*7,e,m-1,x+3.6+t%2*7,e+a,1.3+i()*.5,8)}K();for(let t=0;t<12;t++){const e=x+M(2.8,15.5),a=u-3.4+i()*5.5,r=i()*.7,n=r+.15+i()*.45;R(m-4+(v+8)*r,e,a,m-4+(v+8)*Math.min(n,1),e,a,.16+i()*.3,3)}for(let t=0;t<7;t++){const e=m+v*(.05+i()*.9),a=u-2.6-i()*1.4;R(e,x+2,a,e,x+16,a,.14+i()*.22,3)}for(let t=0;t<6;t++){const e=x+M(3,15),a=m-3.6+i()*2;R(a,e,u-3+i()*20,a,e,u+20+i()*50,.15+i()*.25,3)}K();const te=[],wa=5,Xo=4;for(let t=0;t<wa;t++)for(let e=0;e<Xo;e++){if(E()<.12)continue;const a=v/wa,r=F/Xo,n=1-e/(Xo-1),c=Kt(),l=9+E()*12+(1-n)*14+(t===1||t===2?6:0)+(j?0:(c-.5)*8+(t>=3?3.5:0)),f=m+(t+.5)*a+(E()-.5)*4,d=u+(e+.5)*r+(E()-.5)*4,p=a*(.3+E()*.2)+1,P=r*(.3+E()*.22)+1,L=x+17;if(w(f,L+l*.5,d,p,l*.5,P,0),te.push({x:f,y:L+l,z:d,hw:p,hd:P,y0:L}),E()<.65){const B=5+E()*11,H=p*(.4+E()*.45),S=P*(.4+E()*.45);w(f+(E()-.5)*p,L+l+B*.5,d+(E()-.5)*P,H,B*.5,S,0),te.push({x:f,y:L+l+B,z:d,hw:H,hd:S,y0:L+l})}}K();for(const t of te){const e=t.y-t.y0,a=e>13?2:1;for(let n=0;n<a;n++){const c=t.y0+e*(n+1)/(a+1)+M(-1.2,1.2),l=M(-.8,.8),f=M(-.8,.8),d=t.hw+1.2+i()*3,p=t.hd+1.2+i()*3;i(),w(t.x+l,c,t.z+f,d,.18,p,8),he(t.x+l-d,t.x+l+d,c+1.1,t.z+f-p+.1),ao(t.x+l-d+.1,t.z+f-p,t.z+f+p,c+1.1)}if(i()<.7){const n=t.hw+.9+i();w(t.x,t.y+.4,t.z,n,.55,t.hd+.9+i(),2),he(t.x-n,t.x+n,t.y+1.9,t.z-t.hd-.6)}const r=1+Math.floor(i()*2);for(let n=0;n<r;n++)i()<.6?w(t.x+M(-.7,.7)*t.hw,t.y0+e*M(.25,.85),t.z-t.hd-.2,M(1.8,5.5),M(1.6,5),.24,0):w(t.x-t.hw-.2,t.y0+e*M(.25,.85),t.z+M(-.7,.7)*t.hd,.24,M(1.6,5),M(1.8,5.5),0)}K();for(let t=0;t<4;t++)i();for(let t=0;t<8;t++){const e=x+19.4+t%4*.9,a=u+1.2+Math.floor(t/4)*1.6,r=i()*.4;R(m+v*r,e,a,m+v*(r+.3+i()*.5),e,a,.22+i()*.3,3)}for(let t=0;t<9;t++){const e=m+4+t*(v-8)/8;R(e,x+17.3,u+2,e,x+22.6,u+2,.2,8),w(e,x+22.6,u+2,.2,.15,1.6,8)}for(let t=0;t<3;t++){const e=u+3+t*4,a=x+20;w(m+6+i()*8,a,e,.8,1.1,7,2)}K();for(const t of te){const e=1+Math.floor(E()*3);for(let a=0;a<e;a++){const r=t.x+(E()-.5)*t.hw*1.6,n=t.z+(E()-.5)*t.hd*1.6,c=1.5+E()*5;w(r,t.y+c*.5,n,1.2+E()*2.4,c*.5,1.2+E()*2.4,2)}if(E()<.3){const a=t.x+(E()-.5)*t.hw,r=t.z+(E()-.5)*t.hd;R(a,t.y,r,a+E()*1.2,t.y+9+E()*12,r,.5+E()*.4,3)}}const Ra=[];for(let t=0;t<3;t++){const e=te[Math.floor(i()*te.length)],a=e.x+M(-.5,.5)*e.hw,r=Math.max(e.z,u+F*.4)+M(0,6),n=e.y+16+i()*16,c=1.6+i()*.9;R(a,e.y,r,a+i()*.8,n,r,c,3),w(a+.4,n,r,c+.5,.5,c+.5,2),Ra.push([a,n+1,r])}K();for(let t=0;t<4;t++){const e=m+8+E()*(v-16),a=u-1.5-E()*2;t<3&&Uo(e,a-1,x+17,x+17+12+t*7,Ea)}K();const at=m+v*.46,nt=u+F*.62,de=ut==="Tall jacket"?72:60,xt=x+44,Qe=He==="Flare tower"&&W1<.5;Qe||($t([at,x+17,nt],[at,xt,nt],7.5,6.8,4,4,.7,.34,8,[0,0,1],!0),w(at,xt+.6,nt,9.5,.6,9.5,2),w(at-4,xt+3.5,nt-5,3,2.5,2.2,0),$t([at,xt+1,nt],[at,xt+de,nt],6,1.5,12,4,.42,.17,8,[0,0,1],!0),w(at,xt+de*.58,nt,4.2,.15,4.2,8),w(at,xt+de+1.2,nt,2.6,1.2,2.6,2),K());const za=[m+16,m+v-14],Y1=[.45,-.35],Ma=[46,42],co=[];for(let t=0;t<2;t++){const e=za[t],a=u+3,r=x+44;R(e,x+18,a,e,r,a,1.7,9),w(e,r+2,a,3.4,2.6,3.4,2);const n=Y1[t],c=e+Math.sin(n)*Ma[t]*.8,l=a-Math.cos(n)*Ma[t]*.55,f=r+30;$t([e,r+1.5,a],[c,f,l],1.1,.35,11,4,.2,.09,9,[0,1,0],!1),w(e,x+20.4,a,4.4,2.2,3.8,2),w(e,r+3.1,a+2.4,2.4,2.1,1.5,2);const d=e+(i()<.5?1:-1)*1.8;R(e-2.2,r+3,a,d,r+11,a+1.6,.32,9),R(e+2.2,r+3,a,d,r+11,a+1.6,.32,9),R(d,r+11,a+1.6,c,f+.6,l,.05,3),R(d+.4,r+11,a+1.6,c+.4,f+.6,l,.05,3);const p=8+i()*12;R(c,f,l,c,f-p,l,.04,3),w(c,f-p-.6,l,.45,.6,.3,9),co.push([c,f+.8,l]),K()}const Nt=m+v+9,Tt=u+6,wt=x+56;w(Nt,wt,Tt,13,.35,13,5),w(Nt,wt-.2,Tt-13.9,14.5,.06,1,8),w(Nt,wt-.2,Tt+13.9,14.5,.06,1,8),w(Nt-13.9,wt-.2,Tt,1,.06,13,8),w(Nt+13.9,wt-.2,Tt,1,.06,13,8);for(const[t,e]of[[-12,-12],[12,-12],[-12,12],[12,12],[0,-12],[0,12]])R(Nt+t,wt-.4,Tt+e,m+v-2,wt-18-Math.abs(t)*.6,Tt+e*.3,.32,8);for(const t of[-12,0,12])R(Nt-12,wt-.5,Tt+t,Nt+12,wt-.5,Tt+t,.28,8);for(const t of[-12,0,12])R(Nt+t,wt-.5,Tt-12,Nt+t,wt-.5,Tt+12,.28,8);K();const me=Qt==="Off the corner"&&No>=.5?-1:1,Fa=Qt==="Under the boom",Pa=me>0?m:m+v,Aa=[Pa+2*me,x+40,Fa?u+F*.16:u+F*.84],Io=Gt==="Roaring",qo=Gt==="Low flame",ve=Gt==="Twin tips",rt=m+v+78+ma*36,ct=u+22+ma*24,J=29,N=13,bt=ht?rt:me>0?m-12:m+v+12,dt=ht?ct:u+F*.62,Dt=ht?J+1:x+1,b=Pe?[bt,Math.min(Ge-30,Dt+(ht?92:72)+K1*26),dt]:[Pa-70*me,Math.min(Ge-30,x+140),Fa?u-85:u+F+85];if(!Pe)$t(Aa,[b[0],b[1]-3,b[2]],2.8,1.2,18,3,.5,.2,8,[0,1,0],!0);else{const t=b[1]-3-Dt,e=Math.round(t/7);$t([bt,Dt,dt],[bt,b[1]-3,dt],7.5,1.7,e,3,.6,.26,8,[0,0,1],!0);for(let a=1;a<=3;a++){const r=a/3.6,n=Dt+t*r,c=7.5+(1.7-7.5)*r;w(bt,n,dt,c*.62+1.2,.14,c*.62+1.2,8)}if(R(bt-.9,Dt,dt-7.2,bt-.9,b[1]-3,dt-1.4,.12,8),!ht){w(bt+3*me,Dt-.5,dt,10.5,.5,9,8);for(const a of[-7,7])R(bt-5*me,Dt-1,dt+a,me>0?m+4:m+v-4,x-16,dt+a*.6,.45,8)}if(ht){const a=(c,l,f)=>{const d=(f+6)/(J+6),p=3*(1-d);return[rt+(c?1:-1)*(N-1.5+p),f,ct+(l?1:-1)*(N-1.5+p)]};for(let c=0;c<2;c++)for(let l=0;l<2;l++){q(a(c,l,-6),a(c,l,J),1.3,3);const f=a(c,l,0);Ta.push([f[0]*T,f[2],1.5,.9])}for(const c of[3,J-3])q(a(0,0,c),a(1,0,c),.4,3),q(a(0,1,c),a(1,1,c),.4,3),q(a(0,0,c),a(0,1,c),.4,3),q(a(1,0,c),a(1,1,c),.4,3);for(const[c,l]of[[[0,0],[1,0]],[[0,1],[1,1]],[[0,0],[0,1]],[[1,0],[1,1]]])q(a(c[0],c[1],3),a(l[0],l[1],J-3),.36,3),q(a(l[0],l[1],3),a(c[0],c[1],J-3),.36,3);w(rt,J,ct,N+1,.7,N+1,1),w(rt+5,J+3.5,ct+4,4,2.8,3.5,0),he(rt-N-1,rt+N+1,J+1.8,ct-N-.9),ao(rt-N-.9,ct-N-1,ct+N+1,J+1.8),K();const r=[m+v-6,J-1,u+F*.5],n=[rt-N,J-1,ct-2];$t(r,n,1.7,1.7,Math.round(Math.hypot(n[0]-r[0],n[2]-r[2])/5),4,.28,.13,8,[0,1,0],!1),q([r[0],r[1]-1.1,r[2]],[n[0],n[1]-1.1,n[2]],.5,8)}}R(b[0],b[1]-3,b[2],b[0],b[1]+.5,b[2],1,3),ve&&($t([b[0],b[1]-3,b[2]],[b[0]-15,b[1]-3,b[2]+13],1.2,.9,4,3,.3,.14,8,[0,1,0],!0),R(b[0]-15,b[1]-3,b[2]+13,b[0]-15,b[1]-.5,b[2]+13,.8,3)),w(b[0],b[1]-3.4,b[2],2.6,.25,2.6,8),K();const et=Math.tan(34*Math.PI/180),_a=D==="Standing off"?.05:D==="Close in"?.24:D==="Far off"?-.02:.15,be=D==="Standing off"?.13:D==="Far off"?.3:D==="Close in"?.2:.252,so=(Io?118:qo?54:88)*(ve?.8:1),_e=[-.42,.86,-.2],Oo=Math.hypot(_e[0],_e[1],_e[2]),ga=[0,.3,.58,.85,1].map(t=>[b[0]+_e[0]/Oo*so*t,b[1]+_e[1]/Oo*so*t,b[2]+_e[2]/Oo*so*t]),Ho=(t,e,a,r)=>{const n=r[0]-t[0],c=r[1]-4.2,l=r[2]-t[1],f=Math.cos(a),d=Math.sin(a),p=Math.cos(e),P=Math.sin(e),L=n*P*f+c*d+l*p*f;return[(n*p-l*P)/(L*et),(-n*P*d+c*f-l*p*d)/(L*et),L]},lo=(t,e,a)=>{for(let r=0;r<4;r++){let n=9,c=-9,l=-9;for(const f of ga){const d=Ho(t,e[0],e[1],f),p=so*.22/Math.max(d[2],1)/et;n=Math.min(n,d[0]-p),c=Math.max(c,d[0]+p),l=Math.max(l,d[1]+p)}n<-.92?e[0]+=Math.atan(n*et)-Math.atan(-.92*et):c>.92&&(e[0]+=Math.atan(c*et)-Math.atan(.92*et)),l>.9&&(e[1]=Math.min(a,e[1]+Math.atan(l*et)-Math.atan(.9*et)))}return e},La=(t,e,a)=>{for(let r=0;r<16;r++){const n=lo(t,e.slice(),9);if(n[1]<=a)return e[0]=n[0],e[1]=n[1],e;t[0]-=Math.sin(e[0])*12,t[1]-=Math.cos(e[0])*12}return lo(t,e,a)},io=(t,e,a)=>Math.atan2(e-t[0],a-t[1]),Na=t=>{let e=9,a=-9;for(const[r,n]of[[m-4,u],[m-4,u+F],[m+v,u],[m+v,u+F],[rt+N+6,ct-N],[rt+N+6,ct+N],[rt-N,ct-N]]){const c=io(t,r,n);e=Math.min(e,c),a=Math.max(a,c)}return[e,a]},Sa=(t,e)=>{const[a,r]=Na(t),n=Math.atan(.9*et);e[0]=r-a<2*n?(a+r)*.5:r-n},ka=(t,e)=>{Sa(t,e);for(let a=0;a<14;a++){const[r,n]=Na(t);if(n-r<=2*Math.atan(.84*et))break;t[0]-=Math.sin(e[0])*12,t[1]-=Math.cos(e[0])*12,Sa(t,e)}},Ca=(t,e,a)=>{const r=Qe?co:co.concat([[at,xt+de+2.4,nt]]);for(let n=0;n<4;n++){let c=-9;for(const f of r)c=Math.max(c,Ho(t,e[0],e[1],f)[1]);if(c<=.9)return;const l=e[1]+Math.atan(c*et)-Math.atan(.9*et);if(l<=a){e[1]=l;continue}e[1]=a,t[0]-=Math.sin(e[0])*12,t[1]-=Math.cos(e[0])*12}};let O=[0,0],$=[_a,be];if(Qt==="Off the corner"){const t=(35+20*O1)*Math.PI/180,e=!ht&&No<.5,a=u*(D==="Close in"?1.25:1.05),r=e?m:m+v;O=[r+(e?-1:1)*a*Math.sin(t),u-a*Math.cos(t)],$=[io(O,r,u)-Math.atan(et/3),be+(D==="Close in"?.06:0)],ht&&ka(O,$),La(O,$,be+.12),ht&&Ca(O,$,be+.12)}else if(Qt==="Under the boom"){const t=m+v*.5,e=u+F*.5,a=b[0]-t,r=b[2]-e,n=Math.hypot(a,r),c=a/n,l=r/n,f=No<.5?1:-1,d=40+30*H1,p=D==="Close in"?-.66:D==="Standing off"?-.46:-.56;for(let P=0;P<=400&&(O=[b[0]+c*P+l*d*f,b[2]+l*P-c*d*f],$=lo(O,[io(O,t,e),.05],1.1),!(Math.tan(-$[1])/et>=p));P+=10);}else if(j){const t=ht?(m+rt+N)*.5:m+v*.5,e=ht?(u+ct)*.5:u+F*.5;$=[io(O,t,e)-Math.atan((G1-.5)*et),be],lo(O,$,.5)}else Pe&&(ht&&ka(O,$),La(O,$,be+.08),ht&&Ca(O,$,be+.08));const Bt=O[0]*T,Xt=O[1],Ua=($[0]-_a)*T,fo=Math.cos(Ua),uo=Math.sin(Ua),Da=Math.hypot(Math.max(m-O[0],0,O[0]-m-v),Math.max(u-O[1],0,O[1]-u-F)),Wo=(t,e)=>[Bt+t*fo+e*uo,Xt-t*uo+e*fo];s.trait("Bearing",Qt),s.trait("Field",He),s.trait("Hour",va);const Go=Wo(-760*T,-1020),pe=Go[1],Z1=66,ho=Go[0]*T,Ba=Go[0],Xa=(ho+Z1)*T,Ia=104;w(ho,42,pe,56,16,36,0),w(ho-18,64,pe+6,18,12,18,0),w(ho,16,pe,40,18,32,2),K();const J1=Lt.length,$1=Ke.length,qa=Math.max(J1,$1),X=new Float32Array(qa*16);Lt.forEach((t,e)=>{const a=e*16;t[6]<.5?(X[a]=t[0],X[a+1]=t[1],X[a+2]=t[2],X[a+3]=-1,X[a+4]=t[3],X[a+5]=t[4],X[a+6]=t[5],X[a+7]=t[7]):(X[a]=t[0],X[a+1]=t[1],X[a+2]=t[2],X[a+3]=t[7],X[a+4]=t[3],X[a+5]=t[4],X[a+6]=t[5],X[a+7]=t[8]===void 0?3:t[8])}),Ke.forEach((t,e)=>{const a=e*16+8;X[a]=t[0],X[a+1]=t[1],X[a+2]=t[2],X[a+3]=t[6],X[a+4]=t[3],X[a+5]=t[4],X[a+6]=t[5],X[a+7]=t[7]});const Oa=o.createTexture();o.bindTexture(o.TEXTURE_2D,Oa),o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,4,qa,0,o.RGBA,o.FLOAT,X),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),I1(o,y);const ee=[];let oe=!1;const It=(t,e,a,r,n,c,l,f,d,p,P,L)=>{if(oe||ee.length/12>=44)return;const B=Math.hypot(f,d,p)||1,H=L===void 0?1:Math.max(L,1e-4);ee.push(t*T,e,a,r,n[0]*c,n[1]*c,n[2]*c,l,f/B*T*H,d/B*H,p/B*H,P)},Ko=Math.hypot(O[0]-m-v*.5,O[1]-u-F*.5),tn=So?Math.exp(-(We-eo)*Ko*.5):1,xo=(Io?1.6:qo?.5:1)*(ve?1.15:1);It(b[0]-14,Math.min(b[1]+34,Ge-14),b[2]-6,60,[1,.4,.09],6e5*xo*tn,2e3,1,0,0,-2,1),It(b[0],b[1]+5,b[2],12,[1,.6,.25],26e3*xo,120,1,0,0,-2,.25);const Qo=[],Vt=()=>i()<A.w?A.b:A.a,Vo=So?Math.min(1,170/(Ko+60)):u>300?170/(u+60):1,mt=(t,e,a,r,n,c,l)=>{if(oe)return;const f=c*Math.exp(-We*Math.hypot(t*T-Bt,e-4,a-Xt)*.35);Qo.push([t*T,e,a,Vo<1?Math.max(r*Vo,Math.min(r,.0065)):r,n[0]*f,n[1]*f,n[2]*f,l])},ge=(t,e)=>t+(e-t)*Math.pow(i(),2.3),Ha=[],ae=(t,e,a,r,n,c,l,f,d,p,P)=>{It(t,e,a,14+n*.012,r,n,c,l,f,d,p,P),Ha.push([t,e,a,r])},Wa=(t,e,a,r,n,c,l)=>{mt(t,e,a,n,r,c,1),It(t,e,a,26+l*.01,r,l,44,0,-1,0,-2,.55+i()*.5),Ha.push([t,e,a,r])};for(let t=0;t<5;t++){const e=i(),a=1+Math.floor(i()*i()*4);for(let r=0;r<a;r++){const n=Math.min(1,Math.max(0,e+(i()-.5)*.08));ae(m+n*v,x+3+i()*12,u-3.6-i()*1.6,t%2?A.b:A.a,ge(180,3400),12+i()*22,(i()-.5)*.3,-.85,.55,.3+i()*.2,.45)}}for(let t=0;t<3;t++)ae(m-4.5,x+3+i()*13,u+8+i()*i()*52,Vt(),ge(300,2e3),30,.55,-.8,(i()-.5)*.3,.3,.35);const en=3+Math.floor(i()*2),on=u+4,an=40;for(let t=0;t<en;t++){const e=m+v*(.12+i()*.76),a=on+i()*an,r=1+Math.floor(i()*i()*5);for(let n=0;n<r;n++)ae(e+(i()-.5)*15,x-9-i()*6,a+(i()-.5)*12,Vt(),ge(600,3800),22+i()*36,0,1,0,-2,.16)}const nn=te.slice().sort(()=>i()-.5).slice(0,9);for(const t of nn){const e=t.y-t.y0,a=t.y0+e*(.45+i()*.5);i()<.62?ae(t.x+(i()-.5)*t.hw*1.3,a,t.z-t.hd-3.6,Vt(),ge(180,2800),14+i()*24,(i()-.5)*.3,-.82,.55,.22+i()*.2,.4):ae(t.x-t.hw-3.6,a,t.z+(i()-.5)*t.hd*1.3,Vt(),ge(240,1800),26,.6,-.8,(i()-.5)*.3,.25,.4)}const Ga=3+Math.floor(i()*2),Ka=D==="Far off"?1:.6;for(let t=0;t<Ga;t++){const e=(t+.15+i()*.7)/Ga;Wa(m+e*v*.92+2,x+19+i()*3,u-2-i()*3,Vt(),(.14+i()*.07)*Ka,1.4+i()*1.8,1600+i()*2600)}oe=Qe,ae(at-11,xt+8+i()*12,nt-9,A.a,2600,90,0,1,0,-2,.75),ae(at+3,xt+24+i()*22,nt-10,A.b,1100,60,0,1,0,-2,.5),i()<.7&&Wa(at-9,xt+34,nt-8,A.b,.11*Ka,1.1,1200),oe=!1;for(let t=0;t<2;t++)ae(za[t]+4,x+46,u-3,A.a,ge(700,2200),44,0,-1,0,-2,.45);oe=Qe,mt(at,xt+de+4,nt,.045,[1,.08,.05],2.2,1),oe=!1;for(let t=0;t<16;t++){const e=t>>2,a=((t&3)+.5)/4*2-1,r=e<2?a*13:e===2?-13.2:13.2,n=e<2?e?13.2:-13.2:a*13;mt(Nt+r,wt+.5,Tt+n,.007,[.45,1,.55],.5,.4)}const rn=j?1:1.35,Ee=(t,e,a,r,n,c,l,f)=>{const d=Math.floor(c/l);for(let p=0;p<=d;p++){if(i()<.14)continue;const P=p*l+(i()-.5)*l*.35,L=t+r*P,B=a+n*P,H=Math.hypot(L*T-Bt,e-4,B-Xt),S=.005+.005*Math.min(1.6,140/H)+i()*i()*.007;mt(L,e,B,S,Vt(),f*rn*(.7+i()*1.2),.3+i()*.5)}};Ee(m-6,x+2.6,u-5.8,1,0,v+12,6.5,.9),Ee(m-6.8,x+2.6,u-5,0,1,F+10,7,.8),Ee(m-4,x-.7,u-3,1,0,v+6,9,.7),Ee(Ae,x+10.3,u-4.8,1,0,ro-Ae,6,.8),Ee(m-2,x+18.9,u-1.8,1,0,v+4,6,.9),Ee(m-2.8,x+18.9,u-1,0,1,F+2,7,.8);for(const t of te)i()<.15||Ee(t.x-t.hw,t.y0+(t.y-t.y0)*(.4+i()*.3),t.z-t.hd-1.7,1,0,t.hw*2,5+i()*3,.7);for(const t of Ea.concat(no,ya))i()<.85&&mt(t[0],t[1],t[2],.008+i()*.005,i()<.6?A.b:A.a,.8+i()*.6,.4);oe=Qe;for(let t=1;t<8;t++){const e=t/8,a=6-4.5*e+.7;mt(at-a,xt+de*e,nt-a,.008,A.b,.7+i()*.5,.4),i()<.6&&mt(at+a,xt+de*e+2,nt-a,.007,A.a,.6,.3)}oe=!1;const cn=Pe?[bt,Dt,dt-6]:Aa,sn=Pe?[bt,b[1]+1,dt-1.5]:b;for(let t=1;t<12;t++){const e=Co(cn,sn,(t+i()*.4)/12.5);mt(e[0],e[1]-4.2,e[2],.011,A.a,1.3+i()*.8,.5)}if(Pe){const t=b[1]-3-Dt;for(let e=1;e<=3;e++){const a=e/3.6,r=Dt+t*a+.6,n=(7.5+(1.7-7.5)*a)*.62+1;mt(bt-n,r,dt-n,.013,A.b,1.6,.6),mt(bt+n,r,dt-n,.011,A.a,1.3,.5)}mt(bt+2.5,b[1]-5,dt-2,.014,[1,.1,.06],1.6,1)}if(ht){const t=[m+v-6,J-1,u+F*.5],e=[rt-N,J-1,ct-2],a=Math.hypot(e[0]-t[0],e[2]-t[2]),r=Math.floor(a/5.5);for(let n=1;n<r;n++){const c=Co(t,e,n/r);mt(c[0],c[1]+1.2,c[2],.009,n%4?A.a:A.b,1.3,.55)}for(const[n,c]of[[-N,-N],[N,-N],[-N,N],[0,-N],[N,N]])mt(rt+n,J+2.4,ct+c,.014,A.a,1.5,.7);It(rt-4,J+6,ct-N-3,20,A.a,1400,30,0,-1,.3,.3,.5),It((t[0]+e[0])*.5,J+3,(t[2]+e[2])*.5,24,A.a,700,40,0,-1,0,-2,.4)}for(const t of co.concat(Ra))mt(t[0],t[1],t[2],.012,[1,.1,.06],1.6,1);It(m+v*.5,x+26,u+F*.25,900,A.a,400,4e3,1,0,0,2,1),It(m+v*.22,x+8,u-4,700,A.a,260,4e3,1,0,0,2,1),It(m+v*.76,x+16,u+8,700,A.b,240,4e3,1,0,0,2,.9),It(m+v*.5,x-12,u+F*.42,800,A.a,300,4e3,1,0,0,2,1);const Le=(t,e,a,r,n,c)=>Qo.push([t,e,a,r,n[0]*c,n[1]*c,n[2]*c,1]);for(let t=0;t<46;t++){const e=i();Le(Ba+(i()-.5)*150*(e<.25?.35:1),10+i()*58,pe+(i()-.5)*60,.008+i()*.006,Vt(),.8+i()*i()*3.4)}Le(Xa,Ia,pe,.026,[1,.46,.1],7),ee.push(Ba,38,pe,2600,A.a[0]*8e4,A.a[1]*8e4,A.a[2]*8e4,4e4,1,0,0,2),ee.push(Xa,Ia+8,pe,1800,1*8e4,.42*8e4,.09*8e4,4e4,1,0,0,2);const Qa=Wo(-3300*T,1250),Va=Qa[0],ja=Qa[1];for(let t=0;t<26;t++)Le(Va+(i()-.5)*100,10+i()*50,ja+(i()-.5)*60,.0045+i()*.004,Vt(),.6+i()*2);Le(Va-40*T,96,ja,.012,[1,.4,.07],5);const Ya=Wo(620*T,-430),jo=Ya[0],Yo=Ya[1];for(let t=0;t<11;t++){const e=i();Le(jo+(i()-.5)*46,3+i()*9,Yo+(i()-.5)*12,.008+i()*.006,t<2?[.9,.3,.22]:e<.3?A.b:[1,.78,.5],.8+i()*i()*3)}Le(jo+14*T,12,Yo,.011,[.9,.95,1],3.6),ee.push(jo,9,Yo,500,1*9e3,.68*9e3,.4*9e3,9e3,1,0,0,2);const mo=[Bt,4.2,Xt],ln=(t,e,a)=>{const r=mo[0],n=mo[1],c=mo[2];let l=t-r,f=e-n,d=a-c;const p=Math.hypot(l,f,d)-.3,P=1/(p+.3);l*=P,f*=P,d*=P;const L=1/(l||1e-9),B=1/(f||1e-9),H=1/(d||1e-9);for(const S of Ke){const Q=(S[0]-r)*L,zt=(S[3]-r)*L,lt=(S[1]-n)*B,V=(S[4]-n)*B,vt=(S[2]-c)*H,Ot=(S[5]-c)*H,Ht=Math.max(Math.min(Q,zt),Math.min(lt,V),Math.min(vt,Ot));if(!(Math.min(Math.max(Q,zt),Math.max(lt,V),Math.max(vt,Ot))<Math.max(Ht,0)||Ht>p))for(let Re=S[6];Re<S[7];Re++){const _=Lt[Re];if(_[6]<.5){const it=(_[0]-_[3]-r)*L,Mt=(_[0]+_[3]-r)*L,Ft=(_[1]-_[4]-n)*B,Pt=(_[1]+_[4]-n)*B,le=(_[2]-_[5]-c)*H,ie=(_[2]+_[5]-c)*H,fe=Math.max(Math.min(it,Mt),Math.min(Ft,Pt),Math.min(le,ie));if(Math.min(Math.max(it,Mt),Math.max(Ft,Pt),Math.max(le,ie))>Math.max(fe,0)&&fe<p&&fe>0)return!0}else{const it=_[3]-_[0],Mt=_[4]-_[1],Ft=_[5]-_[2],Pt=r-_[0],le=n-_[1],ie=c-_[2],fe=it*it+Mt*Mt+Ft*Ft,ze=it*l+Mt*f+Ft*d,Je=Pt*l+le*f+ie*d,Jt=Pt*it+le*Mt+ie*Ft,ua=fe-ze*ze,Ie=Math.min(1,Math.max(0,(Jt-ze*Je)/Math.max(ua,1e-6))),At=_[0]+it*Ie,Wt=_[1]+Mt*Ie,go=_[2]+Ft*Ie,$e=(At-r)*l+(Wt-n)*f+(go-c)*d,M1=r+l*$e-At,F1=n+f*$e-Wt,P1=c+d*$e-go;if(M1*M1+F1*F1+P1*P1<_[7]*_[7]&&$e>0&&$e<p)return!0}}}return!1},vo=Qo.filter(t=>!ln(t[0],t[1],t[2])),bo=vo.length,po=240;vo.push([b[0]*T,b[1]+30,b[2],.32,44,16,3,j?.3:.75]);for(let t=0;t<po;t++){const e=i(),a=e<.3?x-1-i()*3:e<.55?x+i()*17:x+18+i()*i()*42,r=Vt(),n=.5+i()*i()*1.4;vo.push([(m+i()*v)*T,a,u-6-i()*4,(.06+i()*.05)*Vo,r[0]*n,r[1]*n,r[2]*n,1])}const jt=new Float32Array((bo+1+po)*8);vo.forEach((t,e)=>{jt[e*8]=t[0],jt[e*8+1]=t[1],jt[e*8+2]=t[2],jt[e*8+3]=t[3],jt[e*8+4]=t[4],jt[e*8+5]=t[5],jt[e*8+6]=t[6],jt[e*8+7]=t[7]});const Za=o.createTexture();o.bindTexture(o.TEXTURE_2D,Za),o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,2,bo+1+po,0,o.RGBA,o.FLOAT,jt),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);const fn=O[0]===0&&O[1]===0?ee.length/12:Math.min(ee.length/12,44),un=new Float32Array(ee),Ja=1.11,Eo=Math.tan(34*Math.PI/180),qt=Eo*Ja,ne=Math.round(z*Ja),re=_t(o,y,ne,ne,!0,o.LINEAR),Zo=_t(o,y,z,z,!1,o.LINEAR),$a=_t(o,y,160,160,!0,o.LINEAR),t1=_t(o,y,160,160,!0,o.LINEAR),e1=1024,o1=256,yo=_t(o,y,e1,o1,!0,o.LINEAR,o.REPEAT),ce=512,Ne=128,Ve=_t(o,y,ce,Ne,!0,o.LINEAR,o.REPEAT),To=_t(o,y,ce,Ne,!0,o.LINEAR,o.REPEAT),ye=256,a1=_t(o,y,ye,ye,"u",o.LINEAR,o.REPEAT),n1=_t(o,y,ye,ye,"u",o.LINEAR,o.REPEAT),je=z>600?320:140,wo=je,r1=_t(o,y,je,wo,"u",o.LINEAR),Te=y.flt?null:_t(o,y,je,wo,"u",o.LINEAR);if(!y.flt){const t=re.lo=o.createTexture();o.bindTexture(o.TEXTURE_2D,t),o.texImage2D(o.TEXTURE_2D,0,o.SRGB8_ALPHA8,ne,ne,0,o.RGBA,o.UNSIGNED_BYTE,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.bindFramebuffer(o.FRAMEBUFFER,re.fb),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT1,o.TEXTURE_2D,t,0),o.drawBuffers([o.COLOR_ATTACHMENT0,o.COLOR_ATTACHMENT1])}Te&&(o.bindFramebuffer(o.FRAMEBUFFER,Te.fb),o.clearBufferuiv(o.COLOR,0,new Uint32Array([0,0,0,15360])),o.bindFramebuffer(o.FRAMEBUFFER,null));const hn=ft==="Heavy swell"?1.5:ft==="Oily calm"?.4:1,Ro=[];for(let t=0;t<4;t++){const e=[185,122,76,47][t]*(.9+E()*.2),a=-.9+t*.55+E()*.35,r=6.28318/e,n=[1.35,.8,.38,.17][t]*hn*(.85+E()*.3);Ro.push({kx:Math.cos(a)*r,kz:Math.sin(a)*r,a:n,om:Math.sqrt(9.81*r),ph:E()*6.28})}const c1=Ro.reduce((t,e)=>t+e.a,0)+.5,s1=(t,e,a)=>{let r=0,n=0,c=0;for(const l of Ro){const f=l.kx*t+l.kz*e-l.om*a+l.ph;r+=l.a*Math.sin(f);const d=Math.cos(f)*l.a;n+=l.kx*d,c+=l.kz*d}return[r,n,c]},l1=(t,e,a,r)=>{const n=new Float32Array(112),c=.6;for(let l=0;l<e;l++){const f=1+Math.floor(Math.pow(E(),1.6)*r),d=c+(E()-.5)*2.6*(E()<.25?1.6:1),p=Math.round(Math.cos(d)*f),P=Math.round(Math.sin(d)*f)||(E()<.5?1:-1),L=p*6.28318/t,B=P*6.28318/t,H=Math.hypot(L,B),S=a/(H*Math.pow(H*t/6.28318+2,.55)*Math.sqrt(e));n[l*4]=L,n[l*4+1]=B,n[l*4+2]=S*(.6+E()*.8),n[l*4+3]=Math.sqrt(9.81*H)}return n},Jo=118,$o=26.7,i1=ft==="Oily calm"?.5:1.05,xn=l1(Jo,28,.22*i1,26),dn=l1($o,28,.13*i1,24),zo=new Float32Array(4);function f1(t,e,a,r){const n=y.P.wave;o.useProgram(n.p),o.bindVertexArray(y.vao),o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,t.fb),o.viewport(0,0,ye,ye),o.uniform4fv(n.uW,e),zo[0]=a/ye,zo[1]=28,zo[2]=r,o.uniform4fv(n.uQ,zo),o.drawArrays(o.TRIANGLES,0,3)}const Mo={Drizzle:[.06,.7],Steady:[.04,1],Driving:[.03,1.45],Squall:[.022,1.9]}[U],mn=j?0:Mo[0],Ye=j?[.0056,.0049,.0046]:[.0017*Mo[1],.0021*Mo[1],.004*Mo[1]],vn=Ho(O,$[0],$[1],ga[2])[0],u1=$[0]+(vn>0?-.6:.6),Fo=to?[.044,.073,.102,1.6*(So?Math.exp(-(We-eo)*Math.hypot(Ko,Ge)*.4):1)]:[0,0,0,0],h1=[Math.sin(u1)*T,Math.cos(u1)];if(to)for(let t=0;t<3;t++)Ye[t]=Ye[t]*.6+[.0016,.0036,.0068][t]*(j?.8:1);const ta=mo[1],x1=$[0]*T,d1=$[1],h={F:[0,0,1,qt],R:[1,0,0,0],U:[0,1,0,0],o:[0,0,0],yaw:1e9,pitch:1e9},Se=new Float32Array(11*4),St=(t,e,a,r,n)=>{Se[t*4]=e,Se[t*4+1]=a,Se[t*4+2]=r,Se[t*4+3]=n},tt=new Float32Array(5*4),Po=[[.25,.25],[-.25,-.25],[.25,-.25],[-.25,.25]];function m1(t,e,a,r,n,c){const l=y.P.scene;o.useProgram(l.p),o.bindVertexArray(y.vao),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_3D,y.tN),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,Oa),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,t.fb),o.viewport(0,0,n,c),St(0,h.o[0],h.o[1],h.o[2],e),St(1,h.F[0],h.F[1],h.F[2],qt),St(2,h.R[0],h.R[1],h.R[2],a),St(3,h.U[0],h.U[1],h.U[2],r),St(4,eo,Ge,Ke.length,fn),St(5,b[0]*T,b[1],b[2],j?1:1.35),St(6,n,c,1,mn),St(7,A.a[0],A.a[1],A.a[2],A.w),St(8,Ye[0],Ye[1],Ye[2],Fo[3]),St(9,Fo[0],Fo[1],Fo[2],1/.075),St(10,to?.3:1,h1[0],h1[1],to?1:0),o.uniform4fv(l.uP,Se),o.uniform4fv(l.uK,un),o.drawArrays(o.TRIANGLES,0,3)}function v1(t,e,a,r){const n=y.P.lamp;o.useProgram(n.p),o.bindVertexArray(y.vao),o.activeTexture(o.TEXTURE11),o.bindTexture(o.TEXTURE_2D,Za),o.bindFramebuffer(o.FRAMEBUFFER,t.fb),o.viewport(0,0,t.w,t.h),o.enable(o.BLEND),o.blendFuncSeparate(o.ONE,o.ONE,o.ZERO,o.ONE),tt[0]=h.o[0],tt[1]=h.o[1],tt[2]=h.o[2],tt[3]=e,tt[4]=h.F[0],tt[5]=h.F[1],tt[6]=h.F[2],tt[7]=qt,tt[8]=h.R[0],tt[9]=h.R[1],tt[10]=h.R[2],tt[12]=h.U[0],tt[13]=h.U[1],tt[14]=h.U[2],tt[16]=r,tt[17]=j?0:1,o.uniform4fv(n.uC,tt),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,a),o.disable(o.BLEND)}const ke=(t,e,a,r,n,c)=>{const l=y.P.blur;o.useProgram(l.p),o.bindVertexArray(y.vao),o.disable(o.BLEND),o.activeTexture(o.TEXTURE2),o.bindTexture(o.TEXTURE_2D,t.tex),o.bindFramebuffer(o.FRAMEBUFFER,e.fb),o.viewport(0,0,a,r),o.uniform4f(l.uQ,1/a,1/r,n,c),o.drawArrays(o.TRIANGLES,0,3)},b1=Math.hypot(.68,.73),p1=-.68*T/b1,E1=.73/b1,ea=p1*fo+E1*uo,oa=-p1*uo+E1*fo,se=new Float32Array(64*4);let Yt=0;const Rt=(t,e,a,r,n,c,l)=>{const f=Bt+ea*t-oa*a,d=Xt+oa*t+ea*a;se[Yt*8]=f,se[Yt*8+1]=e,se[Yt*8+2]=d,se[Yt*8+3]=l,se[Yt*8+4]=r,se[Yt*8+5]=n,se[Yt*8+6]=c,Yt++};{const t=Fe,e=ta-3.1,a=-T*t,r=T;Rt(0,e-.25,a+r*7,34,.25,7,0),Rt(-13.75,e+.68,a,20.25,.37,.07,1),Rt(-20,e+.08,a,14,.23,.07,1);for(let n=-6;n<6;n+=2.1)Rt(n+.55,e+.08,a,.55,.23,.07,1);for(let n=0;n<=9;n++)Rt(6.5+n*1.5,e+.5,a,.05,.52,.05,4);Rt(13.25,e+.52,a,6.75,.03,.03,4),Rt(13.25,e+.06,a,6.75,.06,.025,4),Rt(27,e+.45,a,7,.6,.07,1),Rt(0,e+1.11,a,34,.08,.12,2),Rt(0,e+.4,a+r*14,34,.55,.14,1),Rt(-34,e+.4,a+r*7,.2,.85,7,1),Ct!==2&&Rt(34,e+3,a+r*7,3,3.5,6.5,3)}function bn(t,e,a){const r=y.P.boat;o.useProgram(r.p),o.bindVertexArray(y.vao),o.disable(o.DEPTH_TEST),o.disable(o.SCISSOR_TEST),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_3D,y.tN),o.activeTexture(o.TEXTURE4),o.bindTexture(o.TEXTURE_2D,Ve.tex),o.bindFramebuffer(o.FRAMEBUFFER,Zo.fb),o.viewport(0,0,z,z);const n=new Float32Array(5*4);n[0]=h.o[0],n[1]=h.o[1],n[2]=h.o[2],n[3]=(b[0]*T-h.o[0])/Math.hypot(b[0]*T-Bt,b[2]-Xt),n[4]=h.F[0],n[5]=h.F[1],n[6]=h.F[2],n[7]=Eo,n[8]=h.R[0],n[9]=h.R[1],n[10]=h.R[2],n[12]=h.U[0],n[13]=h.U[1],n[14]=h.U[2],n[16]=ea,n[17]=oa,n[18]=(b[2]-h.o[2])/Math.hypot(b[0]*T-Bt,b[2]-Xt),n[19]=xo,o.uniform4fv(r.uB,n),o.uniform4fv(r.uBX,se),o.uniform4f(r.uBP,t,e,a,Yt),o.drawArrays(o.TRIANGLES,0,3)}function pn(t){const e=Math.cos(h.pitch),a=Math.sin(h.pitch),r=Math.cos(h.yaw),n=Math.sin(h.yaw);h.F=[n*e,a,r*e],h.R=[r,0,-n],h.U=[-n*a,e,-r*a],o.bindFramebuffer(o.FRAMEBUFFER,re.fb),o.viewport(0,0,ne,ne),o.disable(o.BLEND),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT);const c=Math.max(1,Math.min(t,4));o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE);for(let f=0;f<c;f++)Se[3]=0,En(f,c);o.disable(o.BLEND),ke(re,t1,160,160,.06,0),ke(t1,$a,160,160,0,.06),v1(re,0,bo,1),o.bindFramebuffer(o.FRAMEBUFFER,Zo.fb),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE);const l=Math.min(t,2);for(let f=0;f<l;f++)yn(f,l);o.disable(o.BLEND)}function En(t,e){o.blendColor(1/e,1/e,1/e,1/e),o.blendFunc(o.CONSTANT_COLOR,o.ONE),m1(re,0,Po[t][0]*2,Po[t][1]*2,ne,ne)}function yn(t,e){o.blendColor(1/e,1/e,1/e,1/e),o.blendFunc(o.CONSTANT_COLOR,o.ONE),bn(Po[t][0]*2,Po[t][1]*2,z)}function Tn(){m1(yo,1,0,0,e1,o1),v1(yo,1,bo+1+po,1),ke(yo,To,ce,Ne,2/ce,0),ke(To,Ve,ce,Ne,0,.12),ke(Ve,To,ce,Ne,0,.32),ke(To,Ve,ce,Ne,1.2/ce,0)}const Ce=(Io?118:qo?54:88)*(ve?.8:1),Ue=[-.42*T,.86,-.2],aa=Math.hypot(Ue[0],Ue[1],Ue[2]),De=[Ue[0]/aa,Ue[1]/aa,Ue[2]/aa],na=[-.9*T,-.1,-.42],g=new Float32Array(8*4),we=[b[0]*T,b[1],b[2]],wn=[we[0]-15*T,we[1]-3,we[2]+13];function y1(t,e,a,r,n){const c=y.P.flame;o.useProgram(c.p),o.bindVertexArray(y.vao),o.disable(o.DEPTH_TEST),o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,n&&Te?Te.fb:r1.fb),o.viewport(0,0,je,wo),n&&!Te?(o.enable(o.BLEND),o.blendFuncSeparate(o.ONE,o.SRC_ALPHA,o.ZERO,o.SRC_ALPHA)):o.disable(o.BLEND),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_3D,y.tN),g[0]=e[0],g[1]=e[1],g[2]=e[2],g[3]=e[3],g[4]=h.o[0],g[5]=h.o[1],g[6]=h.o[2],g[7]=t,g[8]=h.F[0],g[9]=h.F[1],g[10]=h.F[2],g[11]=qt,g[12]=h.R[0],g[13]=h.R[1],g[14]=h.R[2],g[15]=1/je,g[16]=h.U[0],g[17]=h.U[1],g[18]=h.U[2],g[19]=1/wo,g[20]=a[0],g[21]=a[1],g[22]=a[2],g[23]=Ce,g[24]=De[0],g[25]=De[1],g[26]=De[2],g[27]=r,g[28]=na[0],g[29]=na[1],g[30]=na[2],g[31]=ve?1.15:1,o.uniform4fv(c.uF,g),o.drawArrays(o.TRIANGLES,0,3),o.disable(o.BLEND)}function Rn(){const t=[we[0]+De[0]*Ce*.58,we[1]+De[1]*Ce*.58,we[2]+De[2]*Ce*.58],e=t[0]-h.o[0],a=t[1]-h.o[1],r=t[2]-h.o[2],n=e*h.F[0]+a*h.F[1]+r*h.F[2];if(n<10)return null;const c=Ce*(ve?1.3:.95)/n,l=(e*h.R[0]+a*h.R[1]+r*h.R[2])/n/qt,f=(e*h.U[0]+a*h.U[1]+r*h.U[2])/n/qt,d=c/qt;return Math.abs(l)>1+d||Math.abs(f)>1+d?null:[.5+(l-d)*.5,.5+(f-d)*.5,d,d]}xe.splice(Math.min(xe.length,9),0,...Ta);const pt=new Float32Array(28*4),T1=Math.min(xe.length,13),ra=j?1:1.45;pt[0]=T1,pt[4]=(A.a[0]*.24+.2)*ra,pt[5]=(A.a[1]*.24+.18)*ra,pt[6]=(A.a[2]*.24+.16)*ra;const zn=ft==="Oily calm"?.45:ft==="Heavy swell"?1.4:1,Mn=t=>{for(let e=0;e<T1;e++){const a=xe[e],r=8+e*8,n=s1(a[0],a[1],t)[0],c=Math.min(1,Math.max(0,n/c1*1.4+.45)),l=a[3]*zn;pt[r]=a[0],pt[r+1]=a[1],pt[r+2]=a[2],pt[r+3]=n,pt[r+4]=n+.6+l*(1+3*c),pt[r+5]=2.2+4*c,pt[r+6]=c*.35,pt[r+7]=.75*l}},I=new Float32Array(6*4),Et=new Float32Array(3*4),Ze=new Float32Array(4*4),st=new Float32Array(4*4),Be=new Float32Array(4);let ca=1e9,sa=1e9,la=1e9,ia=1e9,fa=1e9,Ao=99,w1=!1,Zt=null;const R1=(t,e)=>{let a=Math.imul(t^Math.imul(e,668265261),739982445)^1560;return a=Math.imul(a^a>>>15,695872825),a^=a>>>13,(a>>>0)/4294967296},Xe=(t,e)=>{const a=Math.floor(t),r=t-a,n=r*r*(3-2*r);return R1(a,e)*(1-n)+R1(a+1,e)*n};function z1(t,e){const a=s.view||A1,r=s1(Bt,Xt,t),n=r[0]*.85,c=-r[2]*.55,l=r[1]*.6+.016*T,f=x1+(a.yaw||0)+(Xe(t*.05,1)-.5)*.026,d=d1+(a.pitch||0)+c,p=Bt+(a.x||0),P=Xt+(a.z||0),L=ta+n+(a.y||0),B=x1+(a.yaw||0),H=d1+(a.pitch||0),S=Math.abs(B-ca)+Math.abs(H-sa)>.004||Math.abs((a.x||0)-la)+Math.abs((a.y||0)-ia)+Math.abs((a.z||0)-fa)>.05;S||Ao===5?(S&&(ca=B,sa=H,la=a.x||0,ia=a.y||0,fa=a.z||0),h.o=[Bt+la,ta+ia,Xt+fa],h.yaw=ca,h.pitch=sa,w1||(h.F=[0,0,1],h.R=[1,0,0],h.U=[0,1,0],Tn(),w1=!0),pn(S&&t>0?1:4),Zt=Rn(),Ao=S?0:6):Ao<6&&Ao++,f1(a1,xn,Jo,t),f1(n1,dn,$o,t*1.07+3.7);const Q=Xe(t*.16,2)*.65+Xe(t*.55,3)*.35,zt=1+((Xe(t*.9,4)-.5)*.11+(Xe(t*2.6,5)-.5)*.07+(Xe(t*.27,6)-.5)*.14)*(Gt==="Low flame"?1.5:1);Zt&&(y1(t,Zt,we,Q,!1),ve&&y1(t*1.13+7.3,Zt,wn,1-Q,!0));const lt=Math.cos(l),V=Math.sin(l),vt=Math.cos(d),Ot=Math.sin(d),Ht=Math.cos(f),_o=Math.sin(f),Re=[_o*vt,Ot,Ht*vt],_=[Ht,0,-_o],it=[-_o*Ot,vt,-Ht*Ot],Mt=[_[0]*lt+it[0]*V,_[1]*lt+it[1]*V,_[2]*lt+it[2]*V],Ft=[it[0]*lt-_[0]*V,it[1]*lt-_[1]*V,it[2]*lt-_[2]*V];st[0]=p,st[1]=L,st[2]=P,st[3]=0,st[4]=Re[0],st[5]=Re[1],st[6]=Re[2],st[7]=Eo,st[8]=Mt[0],st[9]=Mt[1],st[10]=Mt[2],st[12]=Ft[0],st[13]=Ft[1],st[14]=Ft[2];const Pt=[p-h.o[0],L-h.o[1],P-h.o[2]],le=Da+75;Et[0]=h.F[0],Et[1]=h.F[1],Et[2]=h.F[2],Et[3]=qt,Et[4]=h.R[0],Et[5]=h.R[1],Et[6]=h.R[2],Et[7]=(Pt[0]*h.R[0]+Pt[1]*h.R[1]+Pt[2]*h.R[2])/(le*qt),Et[8]=h.U[0],Et[9]=h.U[1],Et[10]=h.U[2],Et[11]=(Pt[0]*h.U[0]+Pt[1]*h.U[1]+Pt[2]*h.U[2])/(le*qt);for(let At=0;At<4;At++){const Wt=Ro[At];Ze[At*4]=Wt.kx,Ze[At*4+1]=Wt.kz,Ze[At*4+2]=Wt.a,Ze[At*4+3]=Wt.ph-Wt.om*t}const ie=b[0]*T-p,fe=b[1]+Ce*.45-L,ze=b[2]-P,Je=Math.hypot(ie,fe,ze),Jt=y.P.comp;o.useProgram(Jt.p),o.bindVertexArray(y.vao),o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,z,z);const ua=[[0,y.tN,1],[2,re.tex],[3,yo.tex],[4,Ve.tex],[5,$a.tex],[6,a1.tex],[7,n1.tex],[8,r1.tex],[9,Zo.tex],[10,y.tS]];for(const[At,Wt,go]of ua)o.activeTexture(o.TEXTURE0+At),o.bindTexture(go?o.TEXTURE_3D:o.TEXTURE_2D,Wt);Te&&(o.activeTexture(o.TEXTURE12),o.bindTexture(o.TEXTURE_2D,Te.tex),o.activeTexture(o.TEXTURE13),o.bindTexture(o.TEXTURE_2D,re.lo)),I[0]=1/z,I[1]=t,I[2]=0,I[3]=zt,I[4]=c1,I[5]=Da+65,I[6]=eo,I[7]=110;const Ie=z/(2*Eo);I[8]=Ie,I[9]=1/Ie,I[10]=1/Jo,I[11]=1/$o,I[12]=.025*ko,I[13]=2.5,I[14]=1.45,I[15]=1.05,I[16]=.36,I[17]=.85*xo,I[18]=ko,I[19]=.18+ko*.12,I[20]=ie/Je,I[21]=fe/Je,I[22]=ze/Je,I[23]=ft==="Heavy swell"&&!j?.75:0,o.uniform4fv(Jt.uC,I),o.uniform4fv(Jt.uCa,st),o.uniform4fv(Jt.uB,Et),o.uniform4fv(Jt.uSw,Ze),Zt?(Be[0]=Zt[0],Be[1]=Zt[1],Be[2]=Zt[2],Be[3]=Zt[3]):Be[2]=0,o.uniform4fv(Jt.uFr,Be),Mn(t),o.uniform4fv(Jt.uLg,pt),o.drawArrays(o.TRIANGLES,0,3),o.bindVertexArray(null)}return z1(0,0),z1}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
