// Twisting Spring: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/225.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(We){We&&function(){"use strict";const He=new WeakMap,ft=7,c=20,at=1/720,re=-.095,se=-.104,Fo=.13,ne=`#version 300 es
  precision highp float; precision highp int; precision highp sampler2D;
  layout(location=0) in vec3 aP; layout(location=1) in vec3 aN; layout(location=2) in vec4 aA;
  layout(std140) uniform U { mat4 VP; vec4 Q[37]; };
  uniform sampler2D tD; uniform int uS; uniform int uM;
  out vec3 vP; out vec3 vN; out vec3 vL; out vec3 vT; flat out int vPart; flat out vec4 vB;
  invariant gl_Position;
  void main(){
    if(uM==2){ vec2 q=vec2(float((gl_VertexID&1)*4-1),float((gl_VertexID&2)*2-1)); gl_Position=vec4(q,0.,1.); vP=vec3(0.);vN=vec3(0.);vL=vec3(0.);vT=vec3(0.);vPart=0;vB=vec4(0.); return; }
    int part=int(aA.z+.5);
    bool fx=part==5; if(fx) part=4;   // 5: the head the spring hangs from, fixed under the top board
    vec3 p,n,t=vec3(0.,1.,0.);
    float NF=Q[5].y;
    vec4 last=texelFetch(tD,ivec2(int(NF),uS),0);
    vec3 bob=vec3(last.z,last.x-Q[5].z,last.w);
    if(part==0){
      float s=mix(Q[5].x,1.,aP.x), f=s*NF, fi=min(floor(f),NF-1.), u=f-fi;
      int i=int(fi), N=int(NF);
      vec4 a=texelFetch(tD,ivec2(max(i-1,0),uS),0), b=texelFetch(tD,ivec2(i,uS),0), c=texelFetch(tD,ivec2(i+1,uS),0), d=texelFetch(tD,ivec2(min(i+2,N),uS),0);
      vec4 m1=(c-a)*.5, m2=(d-b)*.5; float u2=u*u,u3=u2*u;
      vec4 g=(2.*u3-3.*u2+1.)*b+(u3-2.*u2+u)*m1+(-2.*u3+3.*u2)*c+(u3-u2)*m2;
      vec4 dg=(6.*u2-6.*u)*b+(3.*u2-4.*u+1.)*m1+(-6.*u2+6.*u)*c+(3.*u2-2.*u)*m2;
      float C=Q[4].x, R=Q[4].y, hand=Q[4].w;
      float cn=s*C;
      g.x+=(sin(cn*.73)*.5+sin(cn*1.91+1.)*.35+sin(cn*3.3+2.)*.2)*.00028;
      R*=1.+(sin(cn*.41+.5)+sin(cn*1.27))*.006;
      float ang=hand*6.28318*C*s+g.y;
      float e=(1.-s)*C;                // coils from the bottom end
      R*=smoothstep(.0,1.25,e)*.92+.08*smoothstep(.0,.12,e);
      R*=mix(1.,smoothstep(.0,1.25,s*C)*.85+.15,Q[20].z);   // the top end gathers into the head's jaws (the whole instrument)
      vec3 er=vec3(cos(ang),0.,-sin(ang));
      vec3 et=vec3(-sin(ang),0.,-cos(ang));
      float da=(hand*6.28318*C/NF+dg.y)*R;
      t=normalize(et*da+vec3(0.,dg.x,0.));
      vec3 bn=normalize(cross(t,er));
      n=normalize(aP.y*er+aP.z*bn);
      float wr=uM==1?max(Q[4].z,Q[26].x):Q[4].z;
      // where the coils fall under 3 px apart the helix fades into a shaded tube: each turn's section grows along the axis
      // to meet the next, drawn as thin as the wire's true cover (FS), so no bands crawl along it as it bounces
      float tb=uM==1?0.:Q[20].y;
      p=vec3(g.z,g.x,g.w)+er*R+(aP.y*er*wr+aP.z*bn*mix(wr,abs(dg.x)*NF/C*.5,tb));
      n=normalize(mix(n,er,tb));
      vL=vec3(s*C,atan(aP.z,aP.y),dot(n,er));
      if(uM==1) vL.x=Q[4].z/wr;
    } else {
      p=aP; n=aN; vL=aP;
      if(fx) p.y+=Q[20].x; else {
      if(part==2){ float cr=cos(aA.w), sr=sin(aA.w); vL=vec3(cr*aP.x-sr*aP.z,aP.y,sr*aP.x+cr*aP.z); }
      float ry=last.y+Q[21].y, ra0=aA.w+ry; t=vec3(cos(ra0),0.,-sin(ra0));
      if(part==3){
        float cs=cos(Q[6].x), sn=sin(Q[6].x);
        p=vec3(p.x,cs*p.y-sn*p.z,sn*p.y+cs*p.z); n=vec3(n.x,cs*n.y-sn*n.z,sn*n.y+cs*n.z);
        p.x+=Q[5].w;
        cs=cos(aA.w); sn=sin(aA.w);
        p=vec3(cs*p.x+sn*p.z,p.y,-sn*p.x+cs*p.z); n=vec3(cs*n.x+sn*n.z,n.y,-sn*n.x+cs*n.z);
      }
      float cs=cos(ry), sn=sin(ry);
      p=vec3(cs*p.x+sn*p.z,p.y,-sn*p.x+cs*p.z); n=vec3(cs*n.x+sn*n.z,n.y,-sn*n.x+cs*n.z);
      vec2 tl=last.zw*2.1;
      p+=vec3(tl.x*p.y,-tl.x*p.x-tl.y*p.z,tl.y*p.y);
      p+=bob;
      }
    }
    vP=p; vN=n; vT=t; vPart=part; vB=vec4(bob,last.y);
    if(uM==1){
      if(part!=0) vL.x=1.;
      vec3 q=p-Q[3].xyz;
      gl_Position=vec4(dot(q,Q[1].xyz)*Q[1].w,dot(q,Q[2].xyz)*Q[1].w,0.,1.);
    } else {
      vec4 cl=VP*vec4(p,1.);
      vec4 j=Q[29+uS];
      cl.xy+=j.xy*cl.w+j.zw*(cl.w-Q[2].w);
      gl_Position=cl;
    }
  }`,go=`#version 300 es
  precision highp float; in vec3 vL; out vec4 o; void main(){ o=vec4(vL.x); }`,Mo=`#version 300 es
  precision highp float; precision highp int; precision highp sampler2D;
  layout(std140) uniform U { mat4 VP; vec4 Q[37]; };
  uniform sampler2D tN;
  in vec3 vP; in vec3 vN; in vec3 vL; in vec3 vT; flat in int vPart; flat in vec4 vB; out vec4 o;
  vec3 room(vec3 r,float g,float ws){
    vec3 c=mix(Q[14].rgb,Q[13].rgb,smoothstep(-.55,.05+g,r.y));
    c=mix(c,Q[15].rgb,smoothstep(.15-g,.85,r.y));
    c=mix(c,Q[13].rgb*vec3(1.05,1.,.92)*1.6,smoothstep(.15-g,-.75,r.z)*smoothstep(-.6,.1,r.y));
    // behind the camera the room is dark and warm: old cupboards, a floor
    c=mix(c,vec3(.040,.028,.020)+vec3(.05,.03,.015)*smoothstep(-.5,.4,r.y),smoothstep(.1-g,.6,r.z));
    c*=.7+.5*smoothstep(-.6,.5,r.x);
    float w=dot(r,Q[9].xyz);
    if(w>.05){
      vec2 q=vec2(dot(r,Q[10].xyz),dot(r,Q[11].xyz))/w;
      float e=.012+g*.9;
      vec2 hw=vec2(Q[10].w,Q[11].w)*ws;
      vec2 ab=abs(q)-hw;
      float box=smoothstep(e,-e,ab.x)*smoothstep(e,-e,ab.y);
      vec2 cell=fract((q+hw)/(hw*2.)*vec2(3.,3.)+.5)-.5;
      vec2 mb=abs(cell)*hw*2./3.;
      float mu=smoothstep(Q[12].w-e,Q[12].w+e,mb.x)*smoothstep(Q[12].w-e,Q[12].w+e,mb.y);
      mu=1.-(1.-mu)*smoothstep(.0,.25,1.-g*2.2);
      float grad=.7+.55*smoothstep(-.6,.5,q.y);
      c=mix(c,Q[12].rgb*Q[9].w*grad*max(mu,.03),box);
    }
    float l=dot(r,Q[16].xyz);
    float sg=Q[16].w+g*g*1.6;
    c+=Q[17].rgb*exp((l-1.)/sg)*.09/(sg*12.+.09);
    return c;
  }
  void main(){
    vec3 N=normalize(vN), V=normalize(Q[0].xyz-vP);
    if(dot(N,V)<0.) N=-N;
    vec3 F=Q[7].rgb, axis=vec3(0.,1.,0.), diffC=vec3(0.);
    float rough=.05, spread=.04, cov=0., ao=1., dark=1.;
    float px=Q[3].w, cv=1.;
    vec3 bob=vB.xyz;
    float cs=cos(vB.w), sn=sin(vB.w);
    vec3 up=vec3(0.,1.,0.);
    if(vPart==0){
      vec2 q=vec2(vL.x*.31,vL.y*.05);
      vec4 n0=textureLod(tN,q,0.), n1=textureLod(tN,q*vec2(.13,1.),0.);
      F=Q[8].rgb;
      axis=normalize(vT);
      cv=mix(1.,clamp(Q[4].z*4./Q[20].w/max(abs(dot(N,V)),.4),0.,1.),Q[20].y);
      rough=.07+.1*n0.g;
      spread=.02;
      float inner=smoothstep(.5,-.7,vL.z);
      ao=1.-.52*inner;
      float grime=smoothstep(.56,.76,n1.r);
      F*=1.-.6*grime*Q[8].w;
      rough+=.12*grime;
      cov=smoothstep(.72,.82,n0.r)*Q[8].w*.7;
      diffC=vec3(.20,.10,.05);
      N=normalize(N+axis*(n0.b-.5)*.12);
    } else if(vPart==1||vPart==4){
      float ang=atan(vL.z,vL.x);
      float nh=vPart==4&&vL.z>Q[6].z-.001&&length(vL.xy)<.0042?0.:1.;   // 0 on the set screw's head: no turning rings, hairlines or prints there
      float prof=vL.y+length(vL.xz)*1.3;   // runs along the lathe's profile, so turning marks are rings on every face
      vec2 q=vec2(ang*.09,prof*2.2);
      vec4 n0=textureLod(tN,q,0.), n1=textureLod(tN,q*3.1+.37,0.), nf=textureLod(tN,vec2(ang*.021,prof*7.),0.);
      float rings=textureLod(tN,vec2(.37,prof*3.3),0.).a+textureLod(tN,vec2(.71,prof*.9),0.).g-1.;
      float tarn=smoothstep(.38,.72,n0.r+(n1.r-.5)*.34)*Q[7].w;
      F=mix(Q[7].rgb,Q[7].rgb*vec3(.42,.31,.21),tarn);
      rough=.016+.1*tarn+.035*nf.g*nf.g;
      axis=vec3(0.,1.,0.);
      spread=.012+.05*tarn;
      N=normalize(N+axis*rings*.022*nh);
      // the fingerprints: greasy ovals of slightly finer ridges
      vec2 fp=vec2(ang+1.15,vL.y*30.)+vec2(.0,-.25);
      float fd=dot(fp*vec2(3.2,1.),fp*vec2(3.2,1.));
      float fm=smoothstep(1.,.25,fd);
      rough+=.09*fm*(.6+.4*sin(sqrt(fd)*70.+fp.x*9.))*nh;
      F*=1.-.08*fm;
      // scribed scratches, thin and sparse
      float sc=smoothstep(.77,.8,textureLod(tN,vec2(ang*.6+vL.y*5.,vL.y*.5-ang*.03),0.).b);
      sc*=nh; F*=1.+.5*sc; rough+=.05*sc;
      // hairlines from decades of handling, and small dings
      float Ra=length(vL.xz)+.001;
      vec2 hq=vec2(ang*Ra,vL.y)*15.6;
      float h1=textureLod(tN,vec2(hq.x*.82+hq.y*.57,-hq.x*.57+hq.y*.82),0.).b, h2=textureLod(tN,vec2(hq.x*.34-hq.y*.94,hq.x*.94+hq.y*.34)+.41,0.).b;
      float hair=smoothstep(.925,.965,max(h1,h2))*smoothstep(.35,.6,n1.g)*nh;
      float pit=smoothstep(.972,.992,textureLod(tN,vec2(ang*.35,prof*4.),0.).a);
      F*=1.-.55*pit-.22*hair;
      rough+=.04*hair;
      // the set-screw's witness mark runs up the body
      float wm=smoothstep(.009,.005,abs(ang-1.5708));
      if(vPart==1) F*=1.-.28*wm*smoothstep(.024,.0245,length(vL.xz));
      // dust: a soft grey bloom on the flat top, thicker toward the middle, and a little in the hollows
      cov=smoothstep(.4,.95,N.y)*((.02+.12*n1.g*n1.g)*(.35+1.3*smoothstep(.45,.7,n0.g))+.24*smoothstep(.025,.011,length(vL.xz))*step(.0295,vL.y)*(.75+.5*n1.g));
      diffC=vec3(.50,.46,.38);
      float fin=Q[28].w, grv=0.;
      if(Q[13].w>.5&&abs(vL.y)<.024){ grv=1.-smoothstep(Q[6].z-.0011,Q[6].z-.0003,length(vL.xz)); ao*=mix(1.,.28,grv); }
      if(fin>.5&&fin<1.5){
        // verdigris: pale matt powder in the grooves, round the screw and sockets and on the undersides; the high places stay metal
        float low=max(grv,.45*smoothstep(-.5,-.95,vN.y));
        vec4 v0=textureLod(tN,vec2(ang*.33,vL.y*13.)+.21,0.), v1=textureLod(tN,vec2(ang*1.4,vL.y*55.)+.63,0.);
        float vg=smoothstep(.58,.82,v0.r+(v1.g-.5)*.55+low*.55)*(.55+.45*smoothstep(.3,.7,v1.b+low));
        float pw=.75+.5*nf.r;
        cov=max(cov,vg); rough=mix(rough,.5,vg); diffC=mix(diffC,vec3(.34,.47,.40)*pw,vg);
      } else if(fin>1.5&&fin<2.5){
        // nickel: a cool mirror, worn through to the brass on the turned corners where hands go
        float cn=smoothstep(.25,.5,abs(vN.y))*smoothstep(.92,.6,abs(vN.y));
        float wr=smoothstep(.55,.8,n0.g+cn*.35+(n1.r-.5)*.4);
        F=mix(F,vec3(.86,.6,.28),wr); rough+=.03*wr; cov*=.5;
      } else if(fin>2.5){ rough*=.55; cov*=.35; }
      if(vPart==4){ F*=vec3(1.04,1.03,1.); rough*=.8;
        if(vL.z>Q[6].z-.001&&length(vL.xy)<.0042){ float sl=smoothstep(.0009,.0005,abs(vL.x*.8+vL.y*.6)); F*=1.-.92*sl; ao*=1.-.7*sl; } }
    } else if(vPart==2){
      float an=atan(vL.z,vL.y);
      float t=vL.x/.0015*6.28318+an;
      float amp=smoothstep(.45,1.,1./(px*Q[21].x))*.7;
      vec2 q=vec2(vL.x*2.3,an*.1);
      vec4 n0=textureLod(tN,q,0.);
      F=mix(Q[7].rgb*.9,Q[7].rgb*vec3(.5,.42,.32),smoothstep(.4,.7,n0.r)*Q[7].w);
      rough=.1+.1*n0.g;
      axis=normalize(vT);
      spread=.045;
      float s1=sin(t), c1=cos(t);
      N=normalize(N+axis*c1*2.3*amp);
      ao*=mix(1.,.55+.45*smoothstep(-1.,.6,s1),amp);
    } else if(vPart==3){
      vec2 q=vec2(vL.x*7.+vL.y*3.,vL.z*7.)*9.;
      vec4 n0=textureLod(tN,q*.5,0.), nf=textureLod(tN,q*3.,0.);
      float tarn=smoothstep(.4,.75,n0.r+(nf.r-.5)*.3)*Q[7].w*.6;
      F=mix(Q[7].rgb*1.02,Q[7].rgb*vec3(.46,.35,.24),tarn);
      rough=.05+.12*tarn+.05*nf.g;
      axis=normalize(vT);
      spread=.03;
      if(Q[27].w>.5&&abs(vL.x)<.0052){
        // a real knurl: a diamond cut about 0.9 mm across at 45 degrees. Where a diamond is smaller than a pixel or two it
        // fades to its mean, a matt grey-gold band with a soft sparkle; the polished chamfers each side stay mirror
        float an=atan(vL.z,vL.y);
        vec2 kp=vec2(an*68.+vL.x*6981.,an*68.-vL.x*6981.);
        float kf=1.-smoothstep(.3,.8,max(fwidth(kp.x),fwidth(kp.y))/6.28318);
        float kn=sin(kp.x)*sin(kp.y);
        float sp=textureLod(tN,kp*.0011,0.).a;
        N=normalize(N+cross(N,axis)*(kn*.45*kf+(sp-.5)*.5*(1.-kf)));
        F*=vec3(.9,.88,.86); rough+=.05; spread=.03+.05*(1.-kf);
        ao*=.9+.1*kf*kn;
      }
      cov=smoothstep(.45,.95,N.y)*(.02+.1*nf.g*nf.g);
      diffC=vec3(.46,.44,.40);
    }
    // what the metal sees
    vec3 env=vec3(0.);
    float ws=vPart==2||vPart==3?1.6:1.;
    for(int i=0;i<3;i++){
      vec3 n2=normalize(N+axis*(float(i)-1.)*spread);
      env+=room(reflect(-V,n2),rough,ws);
    }
    env/=3.;
    // what the tops of the body see is the cabinet's dim upper shade, closer to grey than the wall's green
    if(vPart==1) env=mix(env,vec3(dot(env,vec3(.3,.45,.25))),.65*smoothstep(.3,.8,N.y));
    // handled nuts and threads are satin: each holds the window broadly on the face turned to it
    if(vPart==2||vPart==3) env+=Q[12].rgb*mix(vec3(1.),Q[7].rgb,.7)*(pow(max(dot(N,normalize(Q[18].xyz+V)),0.),14.)*Q[17].w*(vPart==3?1.-.75*abs(dot(N,axis)):1.));   // end faces stay mirror, not satin
    vec3 R=reflect(-V,N);
    // near reflections: the arms and weights in the polished body, the body in the arms and weights
    vec3 oc=vP-bob;
    float Rb=Q[6].z;
    float vis=1.;
    if(vPart==1||vPart==4){
      for(int i=0;i<int(Q[6].y);i++){
        float ra=Q[27].x+float(i)*6.28318/Q[6].y+vB.w;
        vec3 A=vec3(cos(ra),0.,-sin(ra));
        float dAB=dot(A,R), dO=dot(A,oc), dR=dot(R,oc), den=1.-dAB*dAB;
        float tr=max((dAB*dO-dR)/max(den,1e-3),0.);
        float sa=dO+dAB*tr;
        float dd=length(oc+R*tr-A*sa);
        float nutd=abs(sa-Q[5].w);
        float rr=mix(.0032,.0105,smoothstep(.009,.0065,nutd));
        float ht=smoothstep(rr+.0012,rr-.0012,dd)*step(Rb*.8,sa)*step(sa,Q[6].w);
        env=mix(env,Q[7].rgb*(.07+.26*max(-R.x,0.)+.1*R.y),ht*.6);
      }
    } else if(vPart!=0||vPart==0){
      vec2 ro=oc.xz, rd=R.xz;
      float a=dot(rd,rd), b=dot(ro,rd), c=dot(ro,ro)-Rb*Rb, h2=b*b-a*c;
      if(b<0.&&h2>0.&&a>1e-5){
        float tt=(-b-sqrt(h2))/a;
        float yy=oc.y+R.y*tt;
        float m=smoothstep(.033,.028,abs(yy));
        vec2 hit=(ro+rd*tt)/Rb;
        env=mix(env,Q[7].rgb*(.16+.9*max(-hit.x*.6+.5*hit.y,0.)),m);
      }
      // the body's shadow from the window on arms, weights and the lowest coils
      vec2 lxz=Q[18].xz;
      float la=dot(lxz,lxz), lb=dot(ro,lxz);
      float cross2=abs(ro.x*lxz.y-ro.y*lxz.x)/sqrt(la);
      float side=lb<0.?1.:0.;
      vis=1.-.75*side*smoothstep(Rb+.002,Rb-.003,cross2);
      float rb=length(ro);
      if(vPart!=0) ao*=.62+.38*smoothstep(Rb+.0005,Rb+.011,rb);
    }
    // film of tarnish, oil and dust seen as a dull diffuse skin
    float nl=max(dot(N,Q[18].xyz),0.);
    vec3 dif=diffC*(Q[18].w*nl*vis+mix(Q[13].rgb,vec3(dot(Q[13].rgb,vec3(.3,.45,.25)))*vec3(1.1,1.,.84),.75)*(.55+.45*N.y));
    float fres=pow(1.-max(dot(N,V),0.),5.);
    vec3 metal=(F+(vec3(1.)-F)*fres)*env;
    vec3 col=mix(metal*mix(1.,vis,.5),dif,clamp(cov,0.,1.))*ao;
    o=vec4(col,1.)*(cv*Q[0].w/Q[27].z);
  }`,Bo=`#version 300 es
  precision highp float; precision highp int; precision highp sampler2D;
  layout(std140) uniform U { mat4 VP; vec4 Q[37]; };
  uniform sampler2D tB; uniform sampler2D tL; uniform sampler2D tS; uniform sampler2D tN;
  out vec4 o;
  void main(){
    vec2 uv=gl_FragCoord.xy*Q[26].z;
    vec2 ndc=uv*2.-1.;
    vec4 b=texture(tB,uv);
    vec3 bg=b.rgb*b.rgb*1.6;
    vec3 ro=Q[0].xyz;
    vec3 dir=normalize(Q[25].xyz+ndc.x*Q[19].xyz+ndc.y*Q[28].xyz);
    float tw=(${re.toFixed(4)}-ro.z)/dir.z, ts=(${se.toFixed(4)}-ro.y)/dir.y;
    float tt=(dir.y<0.&&ts<tw)?ts:tw;
    vec3 P=ro+dir*tt-Q[3].xyz;
    vec2 q=vec2(dot(P,Q[1].xyz),dot(P,Q[2].xyz))*Q[1].w*.5+.5;
    float sh=0.;
    float sr=Q[26].w;
    for(int i=0;i<6;i++){
      float a=float(i)*2.39996+.7, r=sqrt((float(i)+.5)/6.)*sr;
      sh+=textureLod(tS,q+vec2(cos(a),sin(a))*r,Q[15].w).r;
    }
    sh/=6.;
    bg*=1.-min(b.a*Q[27].y,1.)*min(sh*1.25,1.);
    vec4 l=texture(tL,uv);
    vec3 col=l.rgb*Q[27].z/max(l.a*Q[27].z,1.)+bg*(1.-min(l.a*Q[27].z,1.));
    // tone and film
    col*=1.05;
    col=col*(1.+col*.16)/(1.+col*(.86+col*.16));
    col=pow(col,vec3(.4545));
    col=mix(col,col*col*(3.-2.*col),.55);
    float vg=dot(ndc,ndc);
    col*=1.-.08*vg*vg;
    vec4 gr=textureLod(tN,gl_FragCoord.xy*.0039*Q[3].w+Q[25].w*vec2(.37,.71),0.);
    col+=(gr.a-.5)*.022*(1.15-col);
    o=vec4(col,1.);
  }`,zo=`#version 300 es
  precision highp float; uniform sampler2D tS; uniform vec2 uI; out vec4 o; void main(){ o=textureLod(tS,gl_FragCoord.xy*uI.x,1.5); }`,Ze=`#version 300 es
  void main(){ vec2 p=vec2(float((gl_VertexID&1)*4-1),float((gl_VertexID&2)*2-1)); gl_Position=vec4(p,0.,1.); }`,Lo=`#version 300 es
  precision highp float; precision highp int; precision highp sampler2D;
  uniform vec4 B[17]; uniform vec4 Ix[6]; uniform vec4 Iy[6]; uniform sampler2D tN; uniform int uZ; out vec4 o;
  const float WZ=${re.toFixed(4)}, SY=${se.toFixed(4)}, SZ=${Fo.toFixed(4)};
  float fbm(vec2 p){ float a=.5,s=0.; for(int i=0;i<4+uZ;i++){ s+=a*textureLod(tN,p,0.).r; p=p*2.07+.31; a*=.5; } return s/.9375; }
  // one lookup of the many-octave channel, scaled to fbm's spread: for broad stains and blurred things (each fbm call site
  // is compiled again, and on Windows this bake program is the long pole of the first make)
  float nz(vec2 p){ return .5+(textureLod(tN,p,0.).r-.5)*.62; }
  float win(vec3 P){
    vec3 L=B[3].xyz;
    vec2 q=P.xy+L.xy/L.z*(B[4].w-P.z)-B[4].xy;
    vec2 hs=B[5].xy;
    float e=B[5].z;
    if(B[5].w<=0.&&hs.x<1.){ float d2=dot(q,q)/(hs.x*hs.x); return exp(-d2)*.86+.14/(1.+d2*d2*.6); }
    if(hs.x>=1.) return 1.;
    // a side window: its uprights lean a little, its bars fall to the right
    q=vec2(q.x+.14*q.y,q.y+.3*q.x);
    vec2 ab=abs(q)-hs;
    float box=smoothstep(e,-e,ab.x)*smoothstep(e,-e,ab.y);
    vec2 cell=fract((q+hs)/(hs*2.)*vec2(2.,5.)+.5)-.5;
    vec2 mb=abs(cell)*hs*2./vec2(2.,5.);
    float m=smoothstep(B[5].w-e,B[5].w+e*.8,mb.x)*smoothstep(B[5].w-e,B[5].w+e*.8,mb.y);
    return box*(.1+.9*m);
  }
  void main(){
    vec2 uv=gl_FragCoord.xy*B[0].w;
    vec2 nd=uv*2.-1.;
    vec3 ro=B[0].xyz;
    vec3 rd=normalize(B[1].xyz+nd.x*B[2].xyz+nd.y*B[6].xyz);
    float tw=(WZ-ro.z)/rd.z, ts=(SY-ro.y)/rd.y;
    vec3 L=B[3].xyz, A=B[7].rgb;
    float kind=B[8].x;
    vec3 Pw=ro+rd*tw, Ps=ro+rd*ts;
    bool shelf=rd.y<0.&&ts<tw;
    vec3 P=shelf?Ps:Pw;
    vec3 N=vec3(0.,0.,1.);
    vec3 alb=vec3(.5);
    float aoo=1., spec=0.;
    float isFront=0.;
    // clutter at the back of the shelf: graduated weights in a block, and a bottle. Vertical capped cylinders
    float tBest=shelf?ts:tw;
    vec3 itN=vec3(0.); vec3 itC=vec3(0.); float itS=0.; float hitIt=0.; vec3 itP=vec3(0.);
    { // the wooden block under the weights
      vec3 bc=vec3(Ix[1].x,SY+.005,Ix[1].z+.001), bh=vec3(.035,.005,.015);
      vec3 iv=1./rd, t0=(bc-bh-ro)*iv, t1=(bc+bh-ro)*iv, tn=min(t0,t1), tf=max(t0,t1);
      float ta=max(max(tn.x,tn.y),tn.z), tb=min(min(tf.x,tf.y),tf.z);
      if(ta<tb&&ta>0.&&ta<tBest){ tBest=ta; hitIt=2.; itP=ro+rd*ta; itN=-sign(rd)*step(vec3(ta),tn); }
    }
    for(int i=0;i<6+uZ;i++){
      vec3 c=Ix[i].xyz; float r=Ix[i].w, h=Iy[i].w;
      vec2 oc=ro.xz-c.xz;
      float a=dot(rd.xz,rd.xz), b=dot(oc,rd.xz), cc=dot(oc,oc)-r*r, dd=b*b-a*cc;
      if(dd>0.){
        float t=(-b-sqrt(dd))/a;
        float y=ro.y+rd.y*t-c.y;
        vec3 n=vec3(0.);
        if(y>0.&&y<h&&t<tBest){ n=vec3((oc+rd.xz*t)/r,0.); n=vec3(n.x,0.,n.y); }
        else if(rd.y<0.){
          float tc=(c.y+h-ro.y)/rd.y;
          vec2 pp=oc+rd.xz*tc;
          if(tc<tBest&&dot(pp,pp)<r*r){ t=tc; n=vec3(0.,1.,0.); }
        }
        if(dot(n,n)>.5){ tBest=t; itN=n; itC=Iy[i].xyz; itS=float(i); hitIt=1.; itP=ro+rd*t; }
      }
    }
    vec3 col;
    float direct;
    if(hitIt>.5){
      float nl=max(dot(itN,L),0.);
      vec3 rf=reflect(rd,itN);
      float glint=pow(max(dot(rf,L),0.),30.)*2.2+pow(max(dot(rf,L),0.),6.)*.3;
      float amb=.26+.2*itN.y;
      // the turned brass weights, darker and warmer than the bob, the window in each as one thin upright line and a dull
      // lit top; or the dark old wood of the block they stand in (one fbm call site for both: each is compiled again)
      float blk=step(1.5,hitIt);
      float tone=.75+.5*nz(mix(itP.xy*vec2(1.2,.9)+itS*.2,itP.xz*vec2(4.,14.),blk));
      float kw=win(itP);
      direct=kw*B[3].w;
      float ln=max(dot(normalize(rf.xz+1e-4),normalize(L.xz)),0.);
      float line=exp((ln-1.)*60.)*(1.-itN.y)*(1.-blk);
      vec3 c0=mix(itC,vec3(.048,.0256,.0112),blk);
      col=c0*tone*(amb*A*2.+direct*nl*B[9].rgb*mix(.9,1.75,blk))+(vec3(.8,.46,.16)*line*(.6+.5*direct)+itC*glint*.15)*(1.-blk);
      col=mix(col,vec3(.2,.17,.12)*(amb*A+direct*nl),.18*smoothstep(.5,.9,itN.y)*(1.-blk));
      direct=clamp(direct*nl/(direct*nl+amb+.01),0.,1.)*.3;
    } else if(shelf&&P.z>SZ){
      vec3 Pf=ro+rd*((SZ-ro.z)/rd.z);
      float gr=nz(vec2(Pf.x*.9,Pf.y*16.));
      alb=mix(vec3(.11,.058,.028),vec3(.19,.11,.055),gr);
      col=alb*(A*.55+.12);
      float ed=smoothstep(SY-.003,SY,Pf.y);
      col+=vec3(.2,.16,.12)*ed*nz(vec2(Pf.x*3.,.5));
      direct=0.1;
    } else if(shelf){
      // the oak shelf: varnish worn at the front, dust at the back
      float wob=nz(P.xz*vec2(1.3,3.))*.05;
      float gr=fbm(vec2(P.x*1.2,(P.z+wob)*11.)+.3), gf=textureLod(tN,vec2(P.x*.7,(P.z+wob)*36.),0.).g;
      float pore=smoothstep(.7,.86,textureLod(tN,vec2((P.z+wob)*60.,P.x*2.3),0.).b)*smoothstep(.3,.6,gr);
      alb=mix(vec3(.038,.016,.006),vec3(.25,.115,.04),smoothstep(.25,.75,gr*.75+gf*.25));
      alb*=.8+.4*nz(P.xz*vec2(.8,2.));
      alb*=1.-.22*pore;
      float wear=smoothstep(SZ-.04,SZ,P.z)*smoothstep(.35,.75,nz(P.xz*vec2(2.,4.)));
      alb=mix(alb,vec3(.30,.20,.11),wear*.6);
      float d0=smoothstep(.0,.09,P.z-WZ);
      float dust=(1.-d0)*.22;
      alb=mix(alb,vec3(.5,.49,.46),dust*(.5+.5*nz(P.xz*9.)));
      float kw=win(P);
      float nl=max(L.y,0.);
      direct=kw*B[3].w*nl;
      float corner=smoothstep(.0,.05,P.z-WZ);
      float amb=(.2+.5*corner);
      col=alb*(amb*A+direct*1.1*B[9].rgb);
      vec3 rv=reflect(rd,vec3(0.,1.,0.));
      float fr=.04+.8*pow(1.-max(rd.y*-1.,0.),5.);
      col+=fr*.22*vec3(.5,.42,.32)*(.5+.5*gf)*smoothstep(.65,.2,wear)*(.6+.4*kw);
      direct=clamp(direct*1.1/(direct*1.1+amb*.9+1e-3),0.,1.);
    } else {
      // the cabinet's back: boards under old paint
      float h0=0.,hx=0.,hy=0.;
      vec3 paint=B[7].rgb*0.;
      float chipM=0.,crk=0.,stain=0.,bid=0.,grooveM=0.,woodg=0.;
      for(int i=0;i<3+uZ;i++){
        vec2 p=P.xy+(i==1?vec2(.0006,0.):i==2?vec2(0.,.0006):vec2(0.));
        float bw=.074;
        float bx=(p.x+B[8].w)/bw;
        float wob=(nz(vec2(p.y*.35,.2))-.5)*.05;
        bx+=wob;
        float id=floor(bx), fx=fract(bx);
        float gd=min(fx,1.-fx)*bw;
        float gv=smoothstep(.0022,.0004,gd);
        float brush=textureLod(tN,vec2(p.x*2.1+id*.37,p.y*.11),0.).b;
        float big=nz(p*vec2(1.1,.9)+B[8].yz);
        float ch=fbm(p*vec2(13.,17.)+B[8].zy+.5)+.34*(nz(p*vec2(.9,1.2)+B[8].yz)-.5)+.09*smoothstep(.009,.0,gd);
        float cm=smoothstep(.75,.755,ch);
        float cr=fbm(vec2(p.x*7.,p.y*.5)+id);
        float cl=smoothstep(.012,.0,abs(cr-.5))*smoothstep(.5,.62,nz(p*vec2(.9,1.6)+3.));
        float hh=(brush-.5)*.32+(1.-gv)*.9-cm*.45-cl*.25+ (textureLod(tN,p*vec2(3.3,5.2),0.).a-.5)*.09;
        if(i==0){ h0=hh; chipM=cm; crk=cl; bid=id; grooveM=gv; stain=big; woodg=fbm(vec2(p.x*11.,p.y*.8)+id*.7); }
        else if(i==1) hx=hh; else hy=hh;
      }
      vec2 gg=vec2(hx-h0,hy-h0);
      N=normalize(vec3(-gg*.055/.0006*.019,1.));
      float tone=.86+.34*textureLod(tN,vec2(bid*.137,.31),0.).g;
      if(kind<.5){
        alb=B[16].rgb*tone*(.82+.42*stain);
        alb*=1.-.1*smoothstep(.55,.8,nz(P.xy*vec2(1.7,.5)+7.));
        alb=mix(alb,alb*vec3(.86,.78,.6),smoothstep(.45,.8,nz(P.xy*.8+11.))*.55);
        // a pale ghost where an instrument hung for decades
        vec2 gh=abs(P.xy-B[10].xy)-B[10].zw;
        float gm=smoothstep(.004,-.004,max(gh.x,gh.y));
        alb*=1.+.13*gm;
        vec3 wood=mix(B[7].rgb*0.+vec3(.40,.36,.26),vec3(.2,.13,.07),smoothstep(.55,.72,woodg));
        alb=mix(alb,wood,chipM);
        alb*=1.-.3*crk;
        float cz=fbm(P.xy*vec2(11.,8.)+B[8].yz);
        alb*=1.-.26*smoothstep(.012,.002,abs(cz-.5))*smoothstep(.42,.62,stain);
        alb*=1.-.6*grooveM;
      } else if(kind<1.5){
        alb=mix(vec3(.09,.047,.02),vec3(.24,.135,.06),woodg*.8+.2*tone);
        alb*=.8+.5*stain;
        alb*=1.-.7*grooveM;
      } else {
        float nap=textureLod(tN,P.xy*vec2(9.,9.),0.).a;
        alb=vec3(.010,.009,.011)*(.6+.9*nap)*(.7+.7*stain);
        N=vec3(0.,0.,1.);
      }
      // the rule screwed to the back: a scale for reading the bounce, ticks and no figures
      vec2 rq=P.xy-B[11].xy;
      if(abs(rq.x)<B[11].z&&rq.y>-.082 RTOP){
        vec3 rc=B[12].rgb*(.82+.3*nz(vec2(rq.x*.6,rq.y*1.9)+2.));
        float tk=fract(rq.y/.005+.5)-.5;
        float major=step(abs(fract(rq.y/.05+.5)-.5),.05);
        float len=mix(.35,.8,step(abs(fract(rq.y/.025+.5)-.5),.1));
        len=mix(len,1.,major);
        float mark=smoothstep(.13,.07,abs(tk))*step(-B[11].z*.95+B[11].z*1.9*(1.-len),rq.x+0.)*0.+smoothstep(.13,.07,abs(tk))*step(rq.x,-B[11].z+B[11].z*1.7*len);
        alb=rc*(1.-.82*mark);
        N=vec3(0.,0.,1.);
        float sc=smoothstep(.0009,.0003,abs(abs(rq.x)-B[11].z+.0008));
        alb*=1.-.3*sc;
        aoo=1.;
        spec=.25;
      }
      float rx=rq.x*(L.x<0.?1.:-1.);
      float rsh=rq.y>-.082 RTOP?smoothstep(B[11].z+.0034,B[11].z+.0004,rx)*step(B[11].z,rx):0.;
      aoo*=1.-.2*rsh;
      float kw=win(P);
      float nl=max(dot(N,L),0.)/max(L.z,.01);
      float cornerS=smoothstep(.0,.042,P.y-SY);
      float topS=smoothstep(.0,.13,B[9].w-P.y);
      float rightF=1.-.4*smoothstep(-.1,.2,P.x);
      float amb=(.34*cornerS+.13)*(.45+.55*topS)*rightF;
      direct=kw*B[3].w*nl*L.z*topS;
      // the clutter's soft shadow on the wall
      float cs0=1.;
      for(int i=0;i<6+uZ;i++){
        vec3 c=Ix[i].xyz; float r=Ix[i].w, h=Iy[i].w;
        float tx=(c.z-P.z)/L.z;
        vec3 Q=P+L*tx;
        float dx=abs(Q.x-c.x)-r, dy=abs(Q.y-c.y-h*.5)-h*.5;
        cs0=min(cs0,smoothstep(-.004,.016,max(dx,dy)));
      }
      direct*=cs0*(1.-.8*rsh);
      col=alb*aoo*(amb*A+direct*.86*B[9].rgb);
      col+=spec*vec3(.7,.7,.72)*(direct*.25+.04);
      direct=clamp(direct*.86/(direct*.86+amb*A.g+1e-3),0.,1.);
    }
#ifdef WHOLE
    { // the cabinet's top board, 2 cm thick: its front edge catches the window, its underside is dark, the room above is darker
      const float SZB=.12;
      float tf=(SZB-ro.z)/rd.z, yf=ro.y+rd.y*tf, tb=(B[9].w-ro.y)/rd.y;
      if(yf>B[9].w+.02){
        col=vec3(.030,.022,.016)*(.8+.4*nz(rd.xy*3.)); direct=0.;
      } else if(yf>B[9].w){
        float u=(yf-B[9].w)/.02, xf=ro.x+rd.x*tf;
        vec3 wd=mix(vec3(.10,.055,.025),vec3(.22,.13,.06),nz(vec2(xf*1.1,u*.6)));
        col=wd*(A*.5+B[3].w*max(L.z,0.)*.55*B[9].rgb*smoothstep(.0,.3,u))+vec3(.16,.12,.08)*B[3].w*smoothstep(.3,.0,u)*max(L.z,0.)*.5;
        direct=0.;
      } else if(rd.y>0.&&tb<tw){
        col=vec3(.05,.03,.016)*A*.6; direct=0.;
      }
    }
#endif
    // the door's stile, near and soft, at the frame's right edge
    float st=uv.x+(uv.y-.5)*B[13].y;
    float sd=smoothstep(B[13].x-.022,B[13].x+.012,st);
    if(sd>0.){
      float g=nz(vec2(uv.x*2.,uv.y*.3)+.4);
      vec3 sc=mix(vec3(.018,.009,.005),vec3(.075,.040,.018),g)*(.7+.9*smoothstep(.0,.9,uv.y));
      float lit=smoothstep(B[13].x+.03,B[13].x+.0,st);
      sc+=vec3(.12,.075,.04)*lit*.55;
      col=mix(col,sc,sd); direct*=1.-sd;
    }
    o=vec4(sqrt(max(col,0.)/1.6),direct);
  }`,Po=`#version 300 es
  precision highp float; precision highp int; precision highp sampler2D;
  uniform vec4 B[17]; uniform sampler2D tI; uniform int uZ; out vec4 o;
  void main(){
    vec2 uv=gl_FragCoord.xy*B[0].w;
    vec2 nd=uv*2.-1.;
    vec3 rd=normalize(B[1].xyz+nd.x*B[2].xyz+nd.y*B[6].xyz);
    vec3 ro=B[0].xyz;
    float tw=(${re.toFixed(4)}-ro.z)/rd.z, ts=(${se.toFixed(4)}-ro.y)/rd.y;
    float tt=(rd.y<0.&&ts<tw)?ts:tw;
    vec3 P=ro+rd*tt;
    float dz=abs(dot(P-B[14].xyz,B[15].xyz));
    float coc=B[14].w*dz;
    float stile=smoothstep(B[13].x-.05,B[13].x,uv.x+(uv.y-.5)*B[13].y);
    coc=max(coc,stile*.018);
    vec4 s=vec4(0.); float w=0.;
    for(int i=0;i<28+uZ;i++){
      float a=float(i)*2.39996, r=sqrt((float(i)+.5)/28.);
      float k=1.-.55*r*r;
      vec4 c=textureLod(tI,uv+vec2(cos(a),sin(a))*r*coc,0.);
      s+=vec4(c.rgb*c.rgb,c.a)*k; w+=k;
    }
    s/=w;
    // the faintest dither so a long gradient keeps its grain through 8 bits
    float dh=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.55)+fract(sin(dot(gl_FragCoord.xy,vec2(39.35,11.13)))*24634.63)-1.;
    o=vec4(sqrt(s.rgb)+dh/255.,s.a);
  }`;function Ut(t,e,a){const w=t.createProgram();for(const[n,l]of[[t.VERTEX_SHADER,e],[t.FRAGMENT_SHADER,a]]){const E=t.createShader(n);t.shaderSource(E,l),t.compileShader(E),t.attachShader(w,E),w["s"+n]=E}return t.linkProgram(w),w}function Lt(t,e,a){if(!t.getProgramParameter(e,t.LINK_STATUS)){console.error("225 "+a+": "+t.getProgramInfoLog(e));for(const w of Object.keys(e))if(w[0]==="s"){const n=t.getShaderInfoLog(e[w]);n&&console.error(n.slice(0,1500))}}}function Ye(t,e,a,w){let n=e.scenes.get(a);if(!n){const l=a?a.split(",").map(g=>"#define "+g+`
`).join(""):"",E=Lo.replace(`#version 300 es
`,`#version 300 es
`+l+(a.includes("WHOLE")?`#define RTOP &&rq.y<.418
`:`#define RTOP
`));n={p:Ut(t,Ze,E),u:null},e.scenes.set(a,n),w&&(Lt(t,n.p,"scene "+a),n.u={B:t.getUniformLocation(n.p,"B"),Ix:t.getUniformLocation(n.p,"Ix"),Iy:t.getUniformLocation(n.p,"Iy"),tN:t.getUniformLocation(n.p,"tN")})}return n}function No(t,e){const a={bakes:new Map,bakesT:new Map,meshes:new Map,tgts:new Map,tgtsT:new Map};a.pFlat=Ut(t,ne,go),a.pMetal=Ut(t,ne,Mo),a.pComp=Ut(t,ne,Bo),a.pBlit=Ut(t,ne,zo),a.scenes=new Map;const w=Ye(t,a,e,!1);a.pLens=Ut(t,Ze,Po),Lt(t,a.pFlat,"flat"),Lt(t,a.pMetal,"metal"),Lt(t,a.pComp,"comp"),Lt(t,a.pBlit,"blit"),Lt(t,w.p,"scene"),Lt(t,a.pLens,"lens");const n=(v,i)=>{const s={};for(const f of i)s[f]=t.getUniformLocation(v,f);return s};a.uFlat=n(a.pFlat,["tD","uS","uM"]),a.uMetal=n(a.pMetal,["tD","uS","uM","tN"]),a.uComp=n(a.pComp,["tD","uS","uM","tB","tL","tS","tN"]),a.uBlit=n(a.pBlit,["tD","uS","uM","tS","uI"]),w.u=n(w.p,["B","Ix","Iy","tN"]),a.uLens=n(a.pLens,["B","tI"]);for(const v of[a.pFlat,a.pMetal,a.pComp,a.pBlit])t.uniformBlockBinding(v,t.getUniformBlockIndex(v,"U")>>>0===4294967295?0:t.getUniformBlockIndex(v,"U"),0);a.ubo=t.createBuffer(),t.bindBuffer(t.UNIFORM_BUFFER,a.ubo),t.bufferData(t.UNIFORM_BUFFER,41*16,t.DYNAMIC_DRAW),t.bindBuffer(t.UNIFORM_BUFFER,null),a.emptyVao=t.createVertexArray(),a.hf=!!(t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float"));const l=256,E=new Uint8Array(l*l*4);let g=35985809;const I=()=>{g=g+1831565813|0;let v=Math.imul(g^g>>>15,1|g);return v=v+Math.imul(v^v>>>7,61|v)^v,((v^v>>>14)>>>0)/4294967296},A=v=>{const i=new Float32Array(v*v);for(let s=0;s<i.length;s++)i[s]=I();return i},x=(v,i,s)=>{const f=A(i),M=i/l;for(let L=0;L<l;L++){const q=L*M,O=q|0,k=q-O,D=k*k*(3-2*k),B=O%i,R=(O+1)%i;for(let h=0;h<l;h++){const N=h*M,P=N|0,S=N-P,G=S*S*(3-2*S),W=P%i,st=(P+1)%i,X=f[B*i+W],ut=f[B*i+st],Zt=f[R*i+W],Yt=f[R*i+st];v[L*l+h]+=s*(X+(ut-X)*G+(Zt-X)*D+(X-ut-Zt+Yt)*G*D)}}},p=[new Float32Array(l*l),new Float32Array(l*l),new Float32Array(l*l),new Float32Array(l*l)];x(p[0],8,.5),x(p[0],16,.25),x(p[0],32,.13),x(p[0],64,.07),x(p[0],128,.05),x(p[1],64,.5),x(p[1],128,.3),x(p[1],256,.2);{const v=A(128);for(let i=0;i<l;i++)for(let s=0;s<l;s++){const f=v[(i>>4)%8*128+(s>>1)],M=v[((i>>4)+1)%8*128+(s>>1)],L=(i&15)/16;p[2][i*l+s]=f+(M-f)*L*L*(3-2*L)}}for(let v=0;v<l*l;v++)p[3][v]=I();for(let v=0;v<l*l;v++){const i=v*4;E[i]=Math.min(255,p[0][v]*255),E[i+1]=Math.min(255,p[1][v]*255),E[i+2]=Math.min(255,p[2][v]*255),E[i+3]=p[3][v]*255}return a.tN=t.createTexture(),t.bindTexture(t.TEXTURE_2D,a.tN),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,l,l,0,t.RGBA,t.UNSIGNED_BYTE,E),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),a.tD=t.createTexture(),t.bindTexture(t.TEXTURE_2D,a.tD),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,c+1,ft,0,t.RGBA,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.bindTexture(t.TEXTURE_2D,null),a.fbo=t.createFramebuffer(),a}function Wt(t,e,a,w,n,l,E){const g=t.createTexture();t.bindTexture(t.TEXTURE_2D,g),t.texImage2D(t.TEXTURE_2D,0,w,a,a,0,n,l,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const I=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,I),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,g,0);let A=null;return E&&(A=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,A),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,a,a),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,A)),{t:g,f:I,d:A,w:a}}function Ht(t,e){t.deleteTexture(e.t),t.deleteFramebuffer(e.f),e.d&&t.deleteRenderbuffer(e.d)}function Ao(){const t=[],e=[];return{V:t,I:e,lathe:(l,E,g,I,A)=>{const x=[];for(let s=0;s<l.length;s++){const f=l[s];if(s===0||s===l.length-1||f[2]){x.push(f);continue}const M=l[s-1],L=l[s+1];let q=M[0]-f[0],O=M[1]-f[1],k=L[0]-f[0],D=L[1]-f[1];const B=Math.hypot(q,O),R=Math.hypot(k,D),h=Math.min(35e-5,B*.33,R*.33);q/=B,O/=B,k/=R,D/=R,x.push([f[0]+q*h,f[1]+O*h],[f[0]+(q+k)*h*.3,f[1]+(O+D)*h*.3],[f[0]+k*h,f[1]+D*h])}const p=[];for(let s=0;s<x.length-1;s++){const f=x[s+1][0]-x[s][0],M=x[s+1][1]-x[s][1],L=Math.hypot(f,M)||1;p.push([-M/L,f/L])}const v=s=>Math.hypot(x[s+1][0]-x[s][0],x[s+1][1]-x[s][1]),i=(s,f,M)=>{if(s<0||f>=p.length)return M;const L=v(s)>.0011,q=v(f)>.0011;return L&&!q?p[s]:q&&!L?p[f]:p[s][0]*p[f][0]+p[s][1]*p[f][1]>(L?.955:.3)?[p[s][0]+p[f][0],p[s][1]+p[f][1]]:M};for(let s=0;s<x.length-1;s++){const f=p[s],M=i(s-1,s,f),L=i(s,s+1,f),q=t.length/10;for(let O=0;O<2;O++){const k=x[s+O],D=O?L:M,B=Math.hypot(D[0],D[1])||1;for(let R=0;R<=E;R++){const h=R/E*Math.PI*2,N=Math.cos(h),P=Math.sin(h);A(k[0]*N,k[1],k[0]*P,t,D[0]/B*N,D[1]/B,D[0]/B*P),t.push(R/E,k[1],g,I)}}for(let O=0;O<E;O++){const k=q+O,D=k+1,B=k+E+1,R=B+1;e.push(k,D,B,D,R,B)}}},yUp:(l,E,g,I,A,x,p)=>I.push(l,E,g,A,x,p),alongRod:l=>{const E=Math.cos(l),g=Math.sin(l);return(I,A,x,p,v,i,s)=>p.push(E*A+g*x,I,-g*A+E*x,E*i+g*s,v,-g*i+E*s)}}}function So(t,e,a,w){const{V:n,I:l}=t,E=a/Math.cos(Math.PI/6),g=[-w/2,-w/2+4e-4,-w/2+9e-4,-w/2+.0016,-w*.2,w*.2,w/2-.0016,w/2-9e-4,w/2-4e-4,w/2],I=x=>a*1+(w/2-Math.abs(x))/.0016*(E-a)*1.05,A=7;for(let x=0;x<6;x++){const p=x*Math.PI/3,v=n.length/10;for(let i=0;i<g.length;i++){const s=g[i],f=I(s);for(let M=0;M<=A;M++){const L=(M/A-.5)*Math.PI/3,q=a/Math.cos(L),O=q<f,k=Math.min(q,f),D=p+L,B=Math.cos(D),R=Math.sin(D);if(n.push(s,k*B,k*R),O)n.push(0,Math.cos(p),Math.sin(p));else{const h=s<0?-1:1,N=Math.hypot(1,.42);n.push(h*.42/N,B/N,R/N)}n.push(M/A,s,3,e)}}for(let i=0;i<g.length-1;i++)for(let s=0;s<A;s++){const f=v+i*(A+1)+s,M=f+1,L=f+A+1,q=L+1;l.push(f,M,L,M,q,L)}}for(const x of[-1,1]){const p=n.length/10,v=24;for(const i of[.0034,a*1.001])for(let s=0;s<=v;s++){const f=s/v*Math.PI*2;n.push(x*w/2,i*Math.cos(f),i*Math.sin(f),x,0,0,s/v,x*w/2,3,e)}for(let i=0;i<v;i++){const s=p+i,f=s+1,M=s+v+1,L=M+1;l.push(s,f,M,f,L,M)}}}function _o(t,e,a,w){const n=Ao(),{lathe:l,yUp:E,alongRod:g}=n,I=40,A=w?84:44,x=12,p=7;{const{V:R,I:h}=n,N=A*x;for(let P=0;P<=N;P++)for(let S=0;S<=p;S++){const G=S/p*Math.PI*2;R.push(P/N,Math.cos(G),Math.sin(G),0,0,0,S/p,P/N,0,0)}for(let P=0;P<N;P++)for(let S=0;S<p;S++){const G=P*(p+1)+S,W=G+1,st=G+p+1,X=st+1;h.push(G,W,st,W,X,st)}}const v=n.I.length;let i,s,f;if(e==="Brass Ball"){s=.029,f=.041,i=[[0,.041],[.0058,.041],[.0066,.0395],[.0066,.0365],[.0095,.036],[.0105,.0345],[.0105,.0322]];for(let R=3;R<=28;R++){const h=R/30*Math.PI;i.push([s*Math.sin(h),s*Math.cos(h)])}i.push([.0048,-.0312],[.004,-.0345],[.0023,-.0362],[0,-.0365])}else if(e==="Waisted"){s=.0215,f=.046,i=[[0,.046],[.0058,.046],[.0066,.0445],[.0066,.0415],[.0095,.041],[.0105,.0395],[.0105,.0378],[.0125,.036],[.0235,.036],[.0272,.0345],[.0282,.0315],[.0272,.0285],[.0245,.027]];for(let R=0;R<=12;R++){const h=R/12,N=.024-h*.048;i.push([.0245-.0058*Math.sin(h*Math.PI),N])}i.push([.0272,-.027],[.0285,-.0305],[.0285,-.0345],[.0265,-.0368],[.012,-.038],[.0075,-.039],[.006,-.042],[.003,-.0435],[0,-.0438])}else e==="Flywheel"?(s=.0185,f=.027,i=[[0,.027],[.0058,.027],[.0066,.0255],[.0066,.0225],[.0095,.022],[.0105,.0205],[.0105,.017],[.016,.0145],[.0185,.0125],[.0185,.009],[.021,.0075],[.036,.0065],[.04,.0088],[.0465,.0105],[.049,.009],[.0496,.006],[.0496,-.006],[.049,-.009],[.0465,-.0105],[.04,-.0088],[.036,-.0065],[.021,-.0075],[.0185,-.009],[.0185,-.0125],[.016,-.0145],[.009,-.017],[.0065,-.0195],[.003,-.0212],[0,-.0215]]):(s=.026,f=.041,i=[[0,.041],[.0058,.041],[.0066,.0395],[.0066,.036],[.0095,.0355],[.0105,.034],[.0105,.0322],[.012,.031],[.021,.031],[.0225,.0302],[.0245,.0288],[.0255,.0268],[.026,.0238],[.026,.0162],[.0246,.0156],[.0246,.0137],[.026,.0131],[.026,-.0131],[.0246,-.0137],[.0246,-.0156],[.026,-.0162],[.026,-.0238],[.0255,-.0268],[.024,-.029],[.012,-.0302],[.0095,-.0315],[.0085,-.0345],[.0055,-.0385],[.002,-.0405],[0,-.0408]]);l(i,I+8,1,0,E);const M=e==="Four Arm Cross"?4:2,L=.094+(e==="Flywheel"?.012:0),q=e==="Flywheel"?.0496:s;for(let R=0;R<M;R++){const h=R*Math.PI*2/M;l([[0,L],[.0018,L],[.0027,L-.001],[.0029,L-.0016],[.0029,q*.6]],10,2,h,g(h));const N=q;l([[.003,N+.0098],[.0052,N+.0094],[.0056,N+.0078],[.0056,N+.0042],[.0066,N+.0032],[.0072,N+.0016],[.0086,N+5e-4],[.0086,N-.0022]],18,4,h,g(h))}{const R=Math.PI/2,h=s;e!=="Flywheel"&&l([[0,h+.0028],[.0032,h+.0028],[.0037,h+.0023],[.0037,h+3e-4],[.0042,h-.001]],14,4,0,(N,P,S,G,W,st,X)=>G.push(N,S,P,W,X,st))}w&&(l([[0,0],[.011,0],[.011,-.003],[.0095,-.0045],[.0066,-.005],[.0066,-.0145],[.0058,-.016],[.0035,-.0172],[.0012,-.0178],[0,-.018]],28,5,0,E),l([[0,.0118],[.0029,.0118],[.0033,.0113],[.0033,.0088],[.0016,.0086],[.0016,.006]],12,5,0,(R,h,N,P,S,G,W)=>P.push(h,R-.0098,N,G,S,W)));const O=n.I.length;for(let R=0;R<M;R++){const h=R*Math.PI*2/M,N=(P,S,G,W,st,X,ut)=>W.push(S,P,G,X,st,ut);if(a==="Knurled")l([[.0032,.0065],[.008,.0065],[.0092,.0058],[.0098,.0052],[.0098,-.0052],[.0092,-.0058],[.008,-.0065],[.0032,-.0065]],28,3,h,N);else if(a==="Ball Weights"){const P=[[.0032,.0104]];for(let S=1;S<13;S++){const G=S/13*Math.PI;P.push([.0112*Math.sin(G),.0112*Math.cos(G)])}P.push([.0032,-.0104]),l(P,24,3,h,N)}else So(n,h,.0092,.0118)}const k=t.createBuffer(),D=t.createBuffer(),B=t.createVertexArray();return t.bindVertexArray(B),t.bindBuffer(t.ARRAY_BUFFER,k),t.bufferData(t.ARRAY_BUFFER,new Float32Array(n.V),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,D),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(n.I),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,40,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,3,t.FLOAT,!1,40,12),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,4,t.FLOAT,!1,40,24),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null),{vao:B,n:n.I.length,Rb:q,axisR:s,topH:f,bot:-i[i.length-1][1],L,nRods:M,verts:n.V.length/10,rods:M,buf:k,ibuf:D}}function Io(t,e,a,w){const n=(I,A,x)=>{t.activeTexture(t.TEXTURE0+x),t.bindTexture(t.TEXTURE_2D,I),t.uniform1i(A,x)},l=Wt(t,e,w,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,!1),E=Wt(t,e,w,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,!1);t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(e.emptyVao),t.viewport(0,0,w,w),t.bindFramebuffer(t.FRAMEBUFFER,l.f);const g=Ye(t,e,a.key,!0);return t.useProgram(g.p),t.uniform4fv(g.u.B,a.B),t.uniform4fv(g.u.Ix,a.Ix),t.uniform4fv(g.u.Iy,a.Iy),n(e.tN,g.u.tN,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,E.f),t.useProgram(e.pLens),t.uniform4fv(e.uLens.B,a.B),n(l.t,e.uLens.tI,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),Ht(t,l),E}We.add({num:225,name:"Twisting Spring",fam:"Worlds",recipe:"A brass bob on a long spring in an old cabinet, where the bounce really drains into a twist and back. The bob, the weights and the light change every mint. Drag up or down to pull it or sideways to twist it, tap beside a weight to move it and tune it until the bounce dies completely, or tap the wall to open a long exposure.",interactive:"Drag up or down to pull the bob, sideways to twist it, then let go. Tap beside a weight to walk it along its arm and tune the exchange until the bounce dies completely. Tap the wall to open a long exposure.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl;let a=null,w=-2128612852;for(let o=2;o<t.hash.length;o++)w^=t.hash.charCodeAt(o),w=Math.imul(w,16777619);const n=()=>{w=w+1831565813|0;let o=Math.imul(w^w>>>15,1|w);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},l=o=>{let r=0;for(const m of o)r+=m[1];let u=n()*r;for(const m of o)if(u-=m[1],u<=0)return m[0];return o[0][0]};let E=l([["Turned Drum",5],["Waisted",3],["Brass Ball",2.5],["Flywheel",1],["Four Arm Cross",.8]]),g=l([["Hex Nuts",5],["Knurled",3],["Ball Weights",1.2]]),I=l([["Old Brass",5],["Bright Lacquer",2.5],["Nickel Plate",1],["Verdigris",.7]]),A=l([["Right-Hand Steel",4],["Left-Hand Steel",3],["Blued Steel",1.6],["Phosphor Bronze",1]]),x=l([["Moderate",5],["Slow",2.5],["Quick",2]]),p=l([["In Tune",6],["A Little Off",3],["Far Off",1]]),v=l([["Sage Paint",4],["Cream Paint",3],["Slate Paint",2],["Bare Oak",2],["Black Velvet",.7]]),i=l([["North Window",7],["Night Lamp",1.5],["Magnesium Flash",.8]]),s=l([["Short",8],["Time Exposure",1]]);t.home&&(E="Turned Drum",g="Hex Nuts",I="Old Brass",A="Right-Hand Steel",x="Moderate",p="In Tune",v="Sage Paint",i="North Window",s="Short"),t.trait("Bob",E),t.trait("Weights",g),t.trait("Finish",I),t.trait("Spring",A),t.trait("Exchange",x),t.trait("Tuning",p),t.trait("Cabinet",v),t.trait("Light",i),t.trait("Exposure",s);let f=2051098305;for(let o=2;o<t.hash.length;o++)f^=t.hash.charCodeAt(o),f=Math.imul(f,16777619);const M=()=>{f=f+1831565813|0;let o=Math.imul(f^f>>>15,1|f);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},L=M(),q=M(),O=M(),k=M();let D=t.home||L<.72?"At the bob":L<.88?"The whole instrument":"From above";D==="The whole instrument"&&i==="Night Lamp"&&(D="At the bob"),!t.home&&i==="North Window"&&q<.15&&v!=="Black Velvet"&&(i="Evening Sun"),t.trait("Light",i),t.trait("View",D);const B=D==="The whole instrument",R=D==="From above",h=i==="Evening Sun",N=B?"WHOLE":"";a=He.get(e),a||(a=No(e,N),He.set(e,a));const P=t.size,S=P>512,G=S?1024:512,W=S?512:256,st=E+"|"+g+(B?"|w":"");let X=a.meshes.get(st);X||(X=_o(e,E,g,B),a.meshes.set(st,X));const ut=X.nRods,Zt=X.Rb,Yt=X.topH,je=X.L,$e=A==="Left-Hand Steel"?-1:1,Ke=x==="Quick"?.09:x==="Slow"?.04:.06,Pt=x==="Quick"?48:x==="Slow"?84:64,Nt=.028-(x==="Quick"?-.003:x==="Slow"?.002:0),ie=28e-5+Math.pow(20*8*Nt*Nt*Nt*Pt/79e9,.25)*.75,jt=.5,yt=20,ce=7850*Math.PI*Nt*Pt*Math.PI*ie*ie/4,Je=4*ce*Nt*Nt/4,Do=Pt*ie*1.7,to=yt/(jt+ce/3),ko=.05*2/ut,Uo=E==="Flywheel"?54e-5:E==="Brass Ball"?16e-5:E==="Four Arm Cross"?13e-5:11e-5,eo=Zt+.0185,oo=.003,$t=Math.floor((je-.0075-eo)/oo),le=Math.max(2,Math.min($t-2,Math.round($t*(.4+.25*n())))),ye=o=>eo+o*oo,we=o=>Uo+ut*ko*o*o,fe=to*(we(ye(le))+Je/3),Qo=$e*2*Ke*Math.sqrt(yt*fe),Ee=p==="In Tune"?0:p==="A Little Off"?3:7;let gt=le;if(Ee){const o=n()<.5?-1:1;gt=le+o*Ee,(gt<0||gt>$t)&&(gt=le-o*Ee),gt=Math.max(0,Math.min($t,gt))}let he=gt,nt=ye(gt),de=nt,ue=n()*6,ve=we(nt);t.home&&(ue=0);const $=new Float64Array(c+1),K=new Float64Array(c+1),J=new Float64Array(c+1),tt=new Float64Array(c+1),me=new Float64Array(c),xe=new Float64Array(c),Mt=new Float64Array(c+1);{const o=Yt,r=yt*c;Mt[c]=o;for(let u=c-1;u>=0;u--){const m=(jt+ce*(c-1-u+.5)/c)*9.81;Mt[u]=Mt[u+1]+(Do/c+m/r)}}const Te=Mt[0]-Mt[c],Co=yt*c,qo=fe*c,ao=Qo*c,ro=ce/c,so=Je/c,Qt=t.home?.052:.04+n()*.018;let Kt=625341552;for(let o=2;o<t.hash.length;o++)Kt^=t.hash.charCodeAt(o),Kt=Math.imul(Kt,16777619);const no=((Kt^Kt>>>15)>>>0)%9973/9973,io=Math.sqrt(to),i0=Ke*io*.5,Oo=Math.sqrt(yt/fe)*io*Qt,Re=(o,r=1)=>{for(let u=0;u<=c;u++)$[u]=r*Qt*Math.cos(o)*u/c,K[u]=0,J[u]=0,tt[u]=-r*Math.sin(o)*Oo*.7*u/c};let Fe=t.home?0:no*Math.PI;Re(Fe);let wt=(n()-.5)*.002,Et=(n()-.5)*.002,Bt=(n()-.5)*.006,At=(n()-.5)*.006;const co=9.81/(Te+.05),Xo=.5*yt*Qt*Qt;let rt=null;const ge=()=>{for(let d=0;d<c;d++){const T=$[d+1]-$[d],b=J[d+1]-J[d];me[d]=Co*T+ao*b,xe[d]=qo*b+ao*T}for(let d=1;d<c;d++)K[d]+=at*(me[d]-me[d-1])/ro,tt[d]+=at*(xe[d]-xe[d-1])/so;{let d=0,T=0;for(let b=1;b<c;b++){const y=K[b],z=tt[b];K[b]=y+.05*(d-2*y+K[b+1]),tt[b]=z+.05*(T-2*z+tt[b+1]),d=y,T=z}}let o=-me[c-1],r=-xe[c-1];rt&&(o+=-400*($[c]-rt.d)-28*K[c],r+=-.5*(J[c]-rt.th)-.028*tt[c]),K[c]+=at*o/(jt+ro/2),tt[c]+=at*r/(ve+so/2);const m=.5*yt*$[c]*$[c]+.5*jt*K[c]*K[c]+.5*ve*tt[c]*tt[c]+.5*fe*J[c]*J[c]>Xo*.45?1-at*.03:1;for(let d=1;d<=c;d++)K[d]*=m,$[d]+=at*K[d],tt[d]*=m,J[d]+=at*tt[d];Bt+=at*(-co*wt),At+=at*(-co*Et),Bt*=1-at*.05,At*=1-at*.05,wt+=at*Bt,Et+=at*At};let Jt=-1640531624;for(let o=2;o<t.hash.length;o++)Jt^=t.hash.charCodeAt(o),Jt=Math.imul(Jt,16777619);const lo=((Jt^Jt>>>13)>>>0)%10007/10007,Tt=!t.home&&lo<.2&&D==="At the bob"&&!h;if(s==="Time Exposure"&&(p==="Far Off"||Tt||B||R)&&(s="Short",t.trait("Exposure",s)),s==="Time Exposure"&&!t.home){const o=[wt,Et,Bt,At];let r=1e9,u=0;for(let d=0;d<8;d++){const T=(d+no)*Math.PI/8;Re(T);let b=0;for(let y=0;y<2880;y++)ge(),y>=2160&&(b+=yt*$[c]*$[c]+jt*K[c]*K[c]);b<r&&(r=b,u=T)}const m=r/(720*yt*Qt*Qt);Fe=u,Re(Fe,Math.max(.35,Math.min(1,Math.sqrt(.03/Math.max(m,1e-6))))),[wt,Et,Bt,At]=o}const zt=Math.PI/180,Me=(t.home?24:19+9*n())*zt;let et=1,V=E==="Flywheel"?.145:.116;const Vo=t.home||n()<.5?1:-1,Go=t.home?42:25+30*n(),Be=B&&O<.5,St=Tt?(52+10*(lo*5%1))*zt:B?(Be?-1:1)*(10+18*k)*zt:Me;Tt&&t.trait("Cabinet",v+", along the wall");const _=[Math.cos(St),0,-Math.sin(St)];let F,ot,it,_t=0;if(B){_t=Mt[0]+.018;const o=-.074-X.bot,r=_t+.024;V=(r-o)/2/.9;const u=(6+4*(O*7%1))*zt,m=1.25,d=(Be?-1:1)*V/3;it=[_[0]*d,(r+o)/2,_[2]*d];const T=[it[0]+Math.sin(St)*Math.cos(u)*m,Math.sin(u)*m,it[2]+Math.cos(St)*Math.cos(u)*m],b=[it[0]-T[0],it[1]-T[1],it[2]-T[2]];et=Math.hypot(b[0],b[1],b[2]),F=[b[0]/et,b[1]/et,b[2]/et],ot=T}else{const o=(R?38+10*k:Tt?8:16)*zt;F=[-Math.sin(St)*Math.cos(o),-Math.sin(o),-Math.cos(St)*Math.cos(o)],h&&!Tt&&(V*=1.08),R&&(V*=1.35);const r=R?.004:E==="Flywheel"?Tt?-.02:.012:Tt?-.034:h?.05:.03,u=R?-.004:Tt?.03:.021,m=[_[1]*F[2]-_[2]*F[1],_[2]*F[0]-_[0]*F[2],_[0]*F[1]-_[1]*F[0]];it=[_[0]*r+m[0]*u,_[1]*r+m[1]*u,_[2]*r+m[2]*u],ot=[it[0]-F[0]*et,it[1]-F[1]*et,it[2]-F[2]*et]}const ct=[_[1]*F[2]-_[2]*F[1],_[2]*F[0]-_[0]*F[2],_[0]*F[1]-_[1]*F[0]];let pe=Vo*Go;if(!t.home){const o=[$.slice(),K.slice(),J.slice(),tt.slice(),wt,Et,Bt,At];let r=0;for(let y=1;y<=5040;y++)ge(),y===2880&&(r=J[c]);const u=J[c];$.set(o[0]),K.set(o[1]),J.set(o[2]),tt.set(o[3]),[wt,Et,Bt,At]=o.slice(4);const m=ut===4?Math.PI/2:Math.PI,d=(y,z)=>{const Y=((Me+y*zt+z-St)%m+m)%m;return Math.min(Y,m-Y)/zt};let T=pe,b=1e9;for(let y=-80;y<=80;y+=.5){const z=d(y,r),Y=d(y,u);if(z>30)continue;const j=Math.abs(y)>=25&&Math.abs(y)<=55,Z=Math.abs(y-pe)+(j?0:200)+(Y>40?400:0);Z<b&&(b=Z,T=y)}pe=T}const fo=Me+pe*zt,ho=t.home?0:fo,mt=et/V,xt=.4,pt=2,be=(o,r)=>o[0]*r[0]+o[1]*r[1]+o[2]*r[2],te=new Float32Array([mt*_[0],mt*ct[0],-(pt+xt)/(pt-xt)*-F[0]*-1,F[0],mt*_[1],mt*ct[1],-(pt+xt)/(pt-xt)*-F[1]*-1,F[1],mt*_[2],mt*ct[2],-(pt+xt)/(pt-xt)*-F[2]*-1,F[2],-mt*be(_,ot),-mt*be(ct,ot),0,-be(F,ot)]);{const o=(pt+xt)/(pt-xt),r=-2*pt*xt/(pt-xt);te[2]=o*F[0],te[6]=o*F[1],te[10]=o*F[2],te[14]=o*-be(F,ot)+r}const uo=(o,r,u)=>{const m=o-ot[0],d=r-ot[1],T=u-ot[2],b=m*F[0]+d*F[1]+T*F[2],y=(m*_[0]+d*_[1]+T*_[2])*mt/b,z=(m*ct[0]+d*ct[1]+T*ct[2])*mt/b;return[y*.5+.5,.5-z*.5]},Q=i==="Night Lamp",C=i==="Magnesium Flash",It=Be?-1:1,H=bt(C?[.12,.25,.96]:Q?[.42,-.28,.86]:h?[-.62*It,.23,.95]:[-.46*It,.52,.72]);function bt(o){const r=Math.hypot(o[0],o[1],o[2]);return[o[0]/r,o[1]/r,o[2]/r]}const Rt=bt([H[2],0,-H[0]]),ze=[H[1]*Rt[2]-H[2]*Rt[1],H[2]*Rt[0]-H[0]*Rt[2],H[0]*Rt[1]-H[1]*Rt[0]],Ct=v==="Sage Paint"?[.205,.285,.205]:v==="Cream Paint"?[.58,.52,.38]:v==="Slate Paint"?[.135,.185,.225]:[.4,.3,.2],Le=v==="Bare Oak"?1:v==="Black Velvet"?2:0,Wo=C?1.15:1,Pe=C?[.05,.05,.06]:Q?[.036,.019,.008]:h?B?[.23,.27,.33]:[.15,.18,.23]:[.5,.55,.59],Ne=C?[1,1,1]:Q?[1,.6,.27]:h?[1,.8,.55]:[.97,1,1.04],Ae=I==="Bright Lacquer"?[1,.8,.42]:I==="Nickel Plate"?[.8,.78,.71]:I==="Verdigris"?[.62,.45,.25]:[.93,.67,.3],Ho=I==="Bright Lacquer"?.1:I==="Nickel Plate"?.08:I==="Verdigris"?1:.8,Se=A==="Blued Steel"?[.1,.14,.28]:A==="Phosphor Bronze"?[.72,.5,.32]:[.55,.56,.58],Zo=A==="Blued Steel"?.25:A==="Phosphor Bronze"?.3:.55,lt=new Float32Array(41*4);lt.set(te,0);const U=(o,r,u,m,d)=>{const T=16+o*4;lt[T]=r,lt[T+1]=u,lt[T+2]=m,lt[T+3]=d},_e=B?[.05*It,_t*.45-.06,-.03]:h?[.09,-.03,-.03]:[.05,-.02,-.03],Ie=1/(B?_t*.62+.1:h?.25:.21);U(0,ot[0],ot[1],ot[2],1/ft),U(1,Rt[0],Rt[1],Rt[2],Ie),U(2,ze[0],ze[1],ze[2],et),U(3,_e[0],_e[1],_e[2],Math.max(1,1e3/P));const Yo=B?0:Math.max(.25,1-43/Pt);U(4,Pt,Nt/2,ie/2,$e),U(5,Yo,c,Yt,nt),U(6,ue,ut,Zt,je),U(7,Ae[0],Ae[1],Ae[2],Ho),U(8,Se[0],Se[1],Se[2],Zo);const jo=Te/Pt*P/(2*V);U(20,_t,B?Math.min(1,Math.max(0,(4.2-jo)/1.4)):0,B?1:0,Te/Pt),U(21,B?V/.116:1,ho,0,0);const vt=C?bt([.12,-.12,1]):Q||h?H:bt([-.7*It,-.06,.62]),Ft=bt([vt[2],0,-vt[0]]),De=[vt[1]*Ft[2]-vt[2]*Ft[1],vt[2]*Ft[0]-vt[0]*Ft[2],vt[0]*Ft[1]-vt[1]*Ft[0]];U(9,vt[0],vt[1],vt[2],C?3.6:Q?9:h?4.4:3.5),U(10,Ft[0],Ft[1],Ft[2],C?.22:Q?.075:.42),U(11,De[0],De[1],De[2],C?.22:Q?.09:.62);const ke=C?[1.05,1.02,1]:Q?[1.2,.86,.52]:h?[1.3,1,.64]:[.86,.95,1.1];U(12,ke[0],ke[1],ke[2],C||Q?0:.03);const $o=Le===2?.35:1,Dt=C?.4:Q?.2:1,Ue=.55*$o*Dt*(C||Q?1:.8);U(13,Ct[0]*Ue,Ct[1]*Ue,Ct[2]*Ue,E==="Turned Drum"||E==="Four Arm Cross"?1:0),U(14,.17*Dt,.095*Dt,.045*Dt,0),U(15,.06*Dt,.045*Dt,.03*Dt,C?S?.5:0:(Q?1.8:2.6)-(S?0:.5));const Qe=Q||C?bt([-.7,-.12,.6]):h?H:bt([.6*It,-.18,.78]);U(16,Qe[0],Qe[1],Qe[2],.022);const Ce=C?[.5,.46,.42]:Q?[.22,.15,.08]:h?[2.6,1.9,1.05]:[2.2,1.45,.8];U(17,Ce[0],Ce[1],Ce[2],C?.7:Q?3:4.6),U(18,H[0],H[1],H[2],Wo*1.3),U(19,_[0]*V,_[1]*V,_[2]*V,0),U(25,F[0]*et,F[1]*et,F[2]*et,0);const Ko=(C?.002:Q?.005:h?.0026:.0095)*Ie*.5;U(26,2.2/(Ie*W),0,1/P,Ko),U(27,fo,C?.92:Q?.85:h?.9:.72,a.hf?1:4,g==="Knurled"?1:0),U(28,ct[0]*V,ct[1]*V,ct[2]*V,I==="Verdigris"?1:I==="Nickel Plate"?2:I==="Bright Lacquer"?3:0);const vo=t.hash+(t.home?"h":""),Jo=(()=>{const o=new Float32Array(68),r=(kt,Vt,Gt,Xe,Ve)=>o.set([Vt,Gt,Xe,Ve],kt*4);r(0,ot[0],ot[1],ot[2],1/G),r(1,F[0]*et,F[1]*et,F[2]*et,0),r(2,_[0]*V,_[1]*V,_[2]*V,0),r(3,H[0],H[1],H[2],C?1.3:Q?2.6:h?1.5:1.12);{const kt=C?[0,0]:Q?[Tt?-.11:-.004,-.03]:B?[.1*It,_t-.29]:h?[.085,-.02]:[.055,.025],Vt=.7,Gt=Vt-re;r(4,kt[0]+H[0]/H[2]*Gt,kt[1]+H[1]/H[2]*Gt,0,Vt)}r(5,C?2:Q?.04:h?.125:.087,C?2:Q?.26:h?.25:.3,C?.001:Q?.006:h?8e-4:.013,C||Q?0:h?.006:.011),r(6,ct[0]*V,ct[1]*V,ct[2]*V,0),r(7,Pe[0],Pe[1],Pe[2],0),r(8,Le,n()*20,n()*20,n()*.1);const u=.178+.018*n();r(9,Ne[0],Ne[1],Ne[2],B?_t:u);const m=-.15+n()*.06;r(10,m,.1+n()*.04,.028+n()*.02,.05+n()*.025);const d=Le<2,T=.083+n()*.012;r(11,d?B?.2*It:T:9,-.03,.0058,0);const b=v==="Slate Paint"?[.3,.25,.16]:[.2,.145,.07];r(12,b[0],b[1],b[2],0),r(13,1.08-(t.home?.1:n()*.1),-.02,0,0),B?r(14,it[0],it[1],it[2],.046*.116/V*.8):r(14,0,0,0,h?.03:.046),r(15,F[0],F[1],F[2],0),r(16,Ct[0],Ct[1],Ct[2],0);const y=new Float32Array(24),z=new Float32Array(24),Y=-.122-n()*.015,j=-.072,Z=(kt,Vt,Gt,Xe,Ve,n0,Ge)=>{y.set([Vt,Gt,Xe,Ve],kt*4),z.set([Ge[0],Ge[1],Ge[2],n0],kt*4)},Ot=[.44,.21,.055],Xt=se+.01;return Z(0,Y-.024,Xt,j-.006,.0105,.024,Ot),Z(1,Y-.0015,Xt,j,.0082,.019,Ot),Z(2,Y+.0175,Xt,j+.006,.006,.014,Ot),Z(3,Y-.024,Xt+.024,j-.006,.0048,.0055,Ot),Z(4,Y-.0015,Xt+.019,j,.0039,.0045,Ot),Z(5,Y+.0175,Xt+.014,j+.006,.0029,.0035,Ot),{B:o,Ix:y,Iy:z,key:N}})(),mo=(o,r,u,m,d)=>{let T=o.get(r);if(!T&&(T=m(),o.set(r,T),o.size>u)){const b=o.keys().next().value;b!==r&&(d(o.get(b)),o.delete(b))}return T},t0=S?a.bakes:a.bakesT,xo=()=>mo(t0,vo,S?2:14,()=>Io(e,a,Jo,G),o=>Ht(e,o));xo();const e0=P+"|"+vo,po=a.hf?e.RGBA16F:e.RGBA8,bo=a.hf?e.HALF_FLOAT:e.UNSIGNED_BYTE,o0=S?a.tgts:a.tgtsT,a0=()=>mo(o0,e0,S?1:14,()=>{const o={L:Wt(e,a,P,po,e.RGBA,bo,!0),S1:Wt(e,a,W,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,!1),S2:Wt(e,a,W>>1,po,e.RGBA,bo,!1),fresh:!0};return e.bindTexture(e.TEXTURE_2D,o.S1.t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),o},o=>{Ht(e,o.L),Ht(e,o.S1),Ht(e,o.S2)}),ee=new Float32Array((c+1)*ft*4),yo=o=>{let r=o*(c+1)*4;for(let u=0;u<=c;u++){const m=u/c;ee[r++]=Mt[u]-$[u],ee[r++]=J[u],ee[r++]=wt*m,ee[r++]=Et*m}};for(let o=0;o<ft;o++)yo(o);let oe=0,qe=!1,qt=s==="Time Exposure"&&a.hf?1.1:.001,Oe=qt;const wo=o=>{const r=a0(),u=xo();oe++;const m=.09,d=oe*2.39996,T=2/P;for(let z=0;z<ft;z++){const Y=z*2.39996+d,j=Math.sqrt((z+.5)/ft),Z=16+(29+z)*4;lt[Z]=((z*.618+oe*.381)%1-.5)*T,lt[Z+1]=((z*.755+oe*.569)%1-.5)*T,lt[Z+2]=Math.cos(Y)*j*m,lt[Z+3]=Math.sin(Y)*j*m}const b=r.fresh||oe===1?1:1-Math.exp(-Math.max(o,.001)/qt);r.fresh=!1,lt[19]=b/ft,lt[16+6*4]=ue,lt[16+5*4+3]=nt,e.bindVertexArray(X.vao),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.bindBuffer(e.UNIFORM_BUFFER,a.ubo),e.bufferSubData(e.UNIFORM_BUFFER,0,lt),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,0,a.ubo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,c+1,ft,e.RGBA,e.FLOAT,ee),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.depthMask(!1),e.bindFramebuffer(e.FRAMEBUFFER,r.S1.f),e.viewport(0,0,W,W),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(a.pFlat),e.uniform1i(a.uFlat.tD,0),e.uniform1i(a.uFlat.uM,1),e.uniform1i(a.uFlat.uS,ft-1),e.enable(e.BLEND),e.blendEquation(e.MAX),e.drawElements(e.TRIANGLES,X.n,e.UNSIGNED_SHORT,0),e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,r.S1.t),e.generateMipmap(e.TEXTURE_2D);const y=qt>.08;y||(qe=!1),y&&(e.bindFramebuffer(e.FRAMEBUFFER,r.S2.f),e.viewport(0,0,W>>1,W>>1),e.enable(e.BLEND),e.blendFunc(e.CONSTANT_ALPHA,e.ONE_MINUS_CONSTANT_ALPHA),e.blendColor(0,0,0,qe?b:1),qe=!0,e.useProgram(a.pBlit),e.uniform1i(a.uBlit.uM,2),e.uniform1i(a.uBlit.tD,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,r.S1.t),e.uniform1i(a.uBlit.tS,1),e.uniform2f(a.uBlit.uI,2/W,0),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND)),e.bindFramebuffer(e.FRAMEBUFFER,r.L.f),e.viewport(0,0,P,P),b>.995?(e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)):(e.enable(e.BLEND),e.blendFunc(e.ZERO,e.CONSTANT_ALPHA),e.blendColor(0,0,0,1-b),e.useProgram(a.pFlat),e.uniform1i(a.uFlat.uM,2),e.drawArrays(e.TRIANGLES,0,3)),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,a.tN),e.enable(e.DEPTH_TEST),e.useProgram(a.pMetal),e.uniform1i(a.uMetal.tD,0),e.uniform1i(a.uMetal.tN,1),e.uniform1i(a.uMetal.uM,0),e.useProgram(a.pFlat),e.uniform1i(a.uFlat.uM,0);for(let z=0;z<ft;z++)e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.depthFunc(e.LESS),e.colorMask(!1,!1,!1,!1),e.disable(e.BLEND),e.useProgram(a.pFlat),e.uniform1i(a.uFlat.uS,z),e.drawElements(e.TRIANGLES,X.n,e.UNSIGNED_SHORT,0),e.colorMask(!0,!0,!0,!0),e.depthMask(!1),e.depthFunc(e.LEQUAL),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(a.pMetal),e.uniform1i(a.uMetal.uS,z),e.drawElements(e.TRIANGLES,X.n,e.UNSIGNED_SHORT,0);e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.depthMask(!0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,P,P),e.useProgram(a.pComp),e.uniform1i(a.uComp.uM,2),e.uniform1i(a.uComp.tD,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,u.t),e.uniform1i(a.uComp.tB,1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,r.L.t),e.uniform1i(a.uComp.tL,2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,y?r.S2.t:r.S1.t),e.uniform1i(a.uComp.tS,3),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,a.tN),e.uniform1i(a.uComp.tN,4),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE0),e.bindVertexArray(null),e.useProgram(null)};wo(1/30);const ht=t.input,ae=t.sound;let dt=null,Eo=0,To=0,r0=0;const s0=o=>{const r=[];for(let u=0;u<ut;u++){const m=ho+u*Math.PI*2/ut+J[c],d=Math.cos(m),T=-Math.sin(m),b=Mt[c]-$[c]-Yt;r.push(uo(wt+d*nt,b,Et+T*nt).concat(uo(wt,b,Et)))}return r},Ro=(o,r)=>{const u=s0();let m=null,d=9;for(const y of u){const z=Math.hypot(y[0]-o,y[1]-r);z<d&&(d=z,m=y)}const T=(o-m[2])/(Math.abs(nt)/(V*2)+.07),b=(r-m[3])/(Math.abs(nt)/(V*2)*.45+.07);if(d<.11||T*T+b*b<1){const y=m[0]-m[2],z=m[1]-m[3],Y=Math.hypot(y,z)||1;let Z=((o-m[0])*y+(r-m[1])*z)/Y<-.006?-1:1;(he+Z>$t||he+Z<0)&&(Z=-Z),he+=Z,de=ye(he),ae.hit("click",.35)}else Oe=Oe>.1||!a.hf?.001:1.1,ae.hit("click",.2)};return(o,r)=>{r=Math.min(r||1/30,.25);const u=ht.taps();if(ht.down&&!dt&&(dt={x:ht.x,y:ht.y,t:o,moved:!1}),dt)if(ht.down){const y=ht.x-dt.x,z=ht.y-dt.y;!dt.moved&&(Math.hypot(y,z)>.022||o-dt.t>.3)&&(dt.moved=!0,rt={d:$[c],th:J[c],d0:$[c],th0:J[c],x:ht.x,y:ht.y}),rt&&(rt.d=Math.max(-.07,Math.min(.072,rt.d0+(ht.y-rt.y)*Math.min(V,.145)*2)),rt.th=rt.th0+(ht.x-rt.x)*6.28*1.1)}else dt.moved?rt&&(Bt+=(ht.x-rt.x)*.02):Ro(dt.x,dt.y),dt=null,rt=null;else u.length&&Ro(u[u.length-1].x,u[u.length-1].y);if(Math.abs(de-nt)>1e-5){const y=Math.sign(de-nt)*Math.min(Math.abs(de-nt),r*.012);nt+=y,ue+=y/.0015*6.28318;const z=we(nt);tt[c]*=ve/z,ve=z,++r0%4===0&&ae.hit("click",.1)}qt+=(Oe-qt)*Math.min(1,r*3);let m=Math.max(1,Math.round(r/at));m>150&&(m=150);let d=0;const T=qt>.08?0:Math.floor(m*.8),b=Math.max(1,m-T);for(let y=0;y<m;y++){if(ge(),y>=T)for(;d<ft&&(y-T+1)*ft>=(d+1)*b;)yo(d++);const z=K[c],Y=tt[c];if(Eo>0&&z<=0){const j=Math.abs($[c])/.05;j>.07&&ae.note(40,{dur:.5,vel:Math.min(.5,j*.34),wave:"triangle",cutoff:500})}if(To>0&&Y<=0){const j=Math.abs(J[c])/1.5;j>.07&&ae.note(47,{dur:.5,vel:Math.min(.5,j*.34),wave:"sine",cutoff:900})}Eo=z,To=Y}wo(r)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
