// Twisting Spring: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/225.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(We){We&&function(){"use strict";const He=new WeakMap,ft=7,c=20,at=1/720,re=-.095,se=-.104,go=.13,ne=`#version 300 es
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
  }`,Bo=`#version 300 es
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
  }`,zo=`#version 300 es
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
  }`,Lo=`#version 300 es
  precision highp float; uniform sampler2D tS; uniform vec2 uI; out vec4 o; void main(){ o=textureLod(tS,gl_FragCoord.xy*uI.x,1.5); }`,Ze=`#version 300 es
  void main(){ vec2 p=vec2(float((gl_VertexID&1)*4-1),float((gl_VertexID&2)*2-1)); gl_Position=vec4(p,0.,1.); }`,Po=`#version 300 es
  precision highp float; precision highp int; precision highp sampler2D;
  uniform vec4 B[17]; uniform vec4 Ix[6]; uniform vec4 Iy[6]; uniform sampler2D tN; uniform int uZ; out vec4 o;
  const float WZ=${re.toFixed(4)}, SY=${se.toFixed(4)}, SZ=${go.toFixed(4)};
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
  }`,No=`#version 300 es
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
  }`;function kt(t,e,o){const b=t.createProgram();for(const[n,l]of[[t.VERTEX_SHADER,e],[t.FRAGMENT_SHADER,o]]){const w=t.createShader(n);t.shaderSource(w,l),t.compileShader(w),t.attachShader(b,w),b["s"+n]=w}return t.linkProgram(b),b}function Lt(t,e,o){if(!t.getProgramParameter(e,t.LINK_STATUS)){console.error("225 "+o+": "+t.getProgramInfoLog(e));for(const b of Object.keys(e))if(b[0]==="s"){const n=t.getShaderInfoLog(e[b]);n&&console.error(n.slice(0,1500))}}}function Ye(t,e,o,b){let n=e.scenes.get(o);if(!n){const l=o?o.split(",").map(F=>"#define "+F+`
`).join(""):"",w=Po.replace(`#version 300 es
`,`#version 300 es
`+l+(o.includes("WHOLE")?`#define RTOP &&rq.y<.418
`:`#define RTOP
`));n={p:kt(t,Ze,w),u:null},e.scenes.set(o,n),b&&(Lt(t,n.p,"scene "+o),n.u={B:t.getUniformLocation(n.p,"B"),Ix:t.getUniformLocation(n.p,"Ix"),Iy:t.getUniformLocation(n.p,"Iy"),tN:t.getUniformLocation(n.p,"tN")})}return n}function Ao(t,e){const o={meshes:new Map};o.pFlat=kt(t,ne,Bo),o.pMetal=kt(t,ne,Mo),o.pComp=kt(t,ne,zo),o.pBlit=kt(t,ne,Lo),o.scenes=new Map;const b=Ye(t,o,e,!1);o.pLens=kt(t,Ze,No),Lt(t,o.pFlat,"flat"),Lt(t,o.pMetal,"metal"),Lt(t,o.pComp,"comp"),Lt(t,o.pBlit,"blit"),Lt(t,b.p,"scene"),Lt(t,o.pLens,"lens");const n=(d,i)=>{const r={};for(const f of i)r[f]=t.getUniformLocation(d,f);return r};o.uFlat=n(o.pFlat,["tD","uS","uM"]),o.uMetal=n(o.pMetal,["tD","uS","uM","tN"]),o.uComp=n(o.pComp,["tD","uS","uM","tB","tL","tS","tN"]),o.uBlit=n(o.pBlit,["tD","uS","uM","tS","uI"]),b.u=n(b.p,["B","Ix","Iy","tN"]),o.uLens=n(o.pLens,["B","tI"]);for(const d of[o.pFlat,o.pMetal,o.pComp,o.pBlit])t.uniformBlockBinding(d,t.getUniformBlockIndex(d,"U")>>>0===4294967295?0:t.getUniformBlockIndex(d,"U"),0);o.ubo=t.createBuffer(),t.bindBuffer(t.UNIFORM_BUFFER,o.ubo),t.bufferData(t.UNIFORM_BUFFER,41*16,t.DYNAMIC_DRAW),t.bindBuffer(t.UNIFORM_BUFFER,null),o.emptyVao=t.createVertexArray(),o.hf=!!(t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float"));const l=256,w=new Uint8Array(l*l*4);let F=35985809;const _=()=>{F=F+1831565813|0;let d=Math.imul(F^F>>>15,1|F);return d=d+Math.imul(d^d>>>7,61|d)^d,((d^d>>>14)>>>0)/4294967296},A=d=>{const i=new Float32Array(d*d);for(let r=0;r<i.length;r++)i[r]=_();return i},x=(d,i,r)=>{const f=A(i),g=i/l;for(let L=0;L<l;L++){const q=L*g,O=q|0,U=q-O,I=U*U*(3-2*U),B=O%i,T=(O+1)%i;for(let h=0;h<l;h++){const N=h*g,P=N|0,D=N-P,G=D*D*(3-2*D),W=P%i,st=(P+1)%i,X=f[B*i+W],ut=f[B*i+st],Ht=f[T*i+W],Zt=f[T*i+st];d[L*l+h]+=r*(X+(ut-X)*G+(Ht-X)*I+(X-ut-Ht+Zt)*G*I)}}},p=[new Float32Array(l*l),new Float32Array(l*l),new Float32Array(l*l),new Float32Array(l*l)];x(p[0],8,.5),x(p[0],16,.25),x(p[0],32,.13),x(p[0],64,.07),x(p[0],128,.05),x(p[1],64,.5),x(p[1],128,.3),x(p[1],256,.2);{const d=A(128);for(let i=0;i<l;i++)for(let r=0;r<l;r++){const f=d[(i>>4)%8*128+(r>>1)],g=d[((i>>4)+1)%8*128+(r>>1)],L=(i&15)/16;p[2][i*l+r]=f+(g-f)*L*L*(3-2*L)}}for(let d=0;d<l*l;d++)p[3][d]=_();for(let d=0;d<l*l;d++){const i=d*4;w[i]=Math.min(255,p[0][d]*255),w[i+1]=Math.min(255,p[1][d]*255),w[i+2]=Math.min(255,p[2][d]*255),w[i+3]=p[3][d]*255}return o.tN=t.createTexture(),t.bindTexture(t.TEXTURE_2D,o.tN),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,l,l,0,t.RGBA,t.UNSIGNED_BYTE,w),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),o.tD=t.createTexture(),t.bindTexture(t.TEXTURE_2D,o.tD),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,c+1,ft,0,t.RGBA,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.bindTexture(t.TEXTURE_2D,null),o.fbo=t.createFramebuffer(),o}function Wt(t,e,o,b,n,l,w){const F=t.createTexture();t.bindTexture(t.TEXTURE_2D,F),t.texImage2D(t.TEXTURE_2D,0,b,o,o,0,n,l,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const _=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,_),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,F,0);let A=null;return w&&(A=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,A),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,o,o),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,A)),{t:F,f:_,d:A,w:o}}function je(t,e){t.deleteTexture(e.t),t.deleteFramebuffer(e.f),e.d&&t.deleteRenderbuffer(e.d)}const $e=typeof FinalizationRegistry=="function"?new FinalizationRegistry(t=>{const[e,o]=t();try{for(const b of o)je(e,b)}catch{}}):null;function So(){const t=[],e=[];return{V:t,I:e,lathe:(l,w,F,_,A)=>{const x=[];for(let r=0;r<l.length;r++){const f=l[r];if(r===0||r===l.length-1||f[2]){x.push(f);continue}const g=l[r-1],L=l[r+1];let q=g[0]-f[0],O=g[1]-f[1],U=L[0]-f[0],I=L[1]-f[1];const B=Math.hypot(q,O),T=Math.hypot(U,I),h=Math.min(35e-5,B*.33,T*.33);q/=B,O/=B,U/=T,I/=T,x.push([f[0]+q*h,f[1]+O*h],[f[0]+(q+U)*h*.3,f[1]+(O+I)*h*.3],[f[0]+U*h,f[1]+I*h])}const p=[];for(let r=0;r<x.length-1;r++){const f=x[r+1][0]-x[r][0],g=x[r+1][1]-x[r][1],L=Math.hypot(f,g)||1;p.push([-g/L,f/L])}const d=r=>Math.hypot(x[r+1][0]-x[r][0],x[r+1][1]-x[r][1]),i=(r,f,g)=>{if(r<0||f>=p.length)return g;const L=d(r)>.0011,q=d(f)>.0011;return L&&!q?p[r]:q&&!L?p[f]:p[r][0]*p[f][0]+p[r][1]*p[f][1]>(L?.955:.3)?[p[r][0]+p[f][0],p[r][1]+p[f][1]]:g};for(let r=0;r<x.length-1;r++){const f=p[r],g=i(r-1,r,f),L=i(r,r+1,f),q=t.length/10;for(let O=0;O<2;O++){const U=x[r+O],I=O?L:g,B=Math.hypot(I[0],I[1])||1;for(let T=0;T<=w;T++){const h=T/w*Math.PI*2,N=Math.cos(h),P=Math.sin(h);A(U[0]*N,U[1],U[0]*P,t,I[0]/B*N,I[1]/B,I[0]/B*P),t.push(T/w,U[1],F,_)}}for(let O=0;O<w;O++){const U=q+O,I=U+1,B=U+w+1,T=B+1;e.push(U,I,B,I,T,B)}}},yUp:(l,w,F,_,A,x,p)=>_.push(l,w,F,A,x,p),alongRod:l=>{const w=Math.cos(l),F=Math.sin(l);return(_,A,x,p,d,i,r)=>p.push(w*A+F*x,_,-F*A+w*x,w*i+F*r,d,-F*i+w*r)}}}function _o(t,e,o,b){const{V:n,I:l}=t,w=o/Math.cos(Math.PI/6),F=[-b/2,-b/2+4e-4,-b/2+9e-4,-b/2+.0016,-b*.2,b*.2,b/2-.0016,b/2-9e-4,b/2-4e-4,b/2],_=x=>o*1+(b/2-Math.abs(x))/.0016*(w-o)*1.05,A=7;for(let x=0;x<6;x++){const p=x*Math.PI/3,d=n.length/10;for(let i=0;i<F.length;i++){const r=F[i],f=_(r);for(let g=0;g<=A;g++){const L=(g/A-.5)*Math.PI/3,q=o/Math.cos(L),O=q<f,U=Math.min(q,f),I=p+L,B=Math.cos(I),T=Math.sin(I);if(n.push(r,U*B,U*T),O)n.push(0,Math.cos(p),Math.sin(p));else{const h=r<0?-1:1,N=Math.hypot(1,.42);n.push(h*.42/N,B/N,T/N)}n.push(g/A,r,3,e)}}for(let i=0;i<F.length-1;i++)for(let r=0;r<A;r++){const f=d+i*(A+1)+r,g=f+1,L=f+A+1,q=L+1;l.push(f,g,L,g,q,L)}}for(const x of[-1,1]){const p=n.length/10,d=24;for(const i of[.0034,o*1.001])for(let r=0;r<=d;r++){const f=r/d*Math.PI*2;n.push(x*b/2,i*Math.cos(f),i*Math.sin(f),x,0,0,r/d,x*b/2,3,e)}for(let i=0;i<d;i++){const r=p+i,f=r+1,g=r+d+1,L=g+1;l.push(r,f,g,f,L,g)}}}function Io(t,e,o,b){const n=So(),{lathe:l,yUp:w,alongRod:F}=n,_=40,A=b?84:44,x=12,p=7;{const{V:T,I:h}=n,N=A*x;for(let P=0;P<=N;P++)for(let D=0;D<=p;D++){const G=D/p*Math.PI*2;T.push(P/N,Math.cos(G),Math.sin(G),0,0,0,D/p,P/N,0,0)}for(let P=0;P<N;P++)for(let D=0;D<p;D++){const G=P*(p+1)+D,W=G+1,st=G+p+1,X=st+1;h.push(G,W,st,W,X,st)}}const d=n.I.length;let i,r,f;if(e==="Brass Ball"){r=.029,f=.041,i=[[0,.041],[.0058,.041],[.0066,.0395],[.0066,.0365],[.0095,.036],[.0105,.0345],[.0105,.0322]];for(let T=3;T<=28;T++){const h=T/30*Math.PI;i.push([r*Math.sin(h),r*Math.cos(h)])}i.push([.0048,-.0312],[.004,-.0345],[.0023,-.0362],[0,-.0365])}else if(e==="Waisted"){r=.0215,f=.046,i=[[0,.046],[.0058,.046],[.0066,.0445],[.0066,.0415],[.0095,.041],[.0105,.0395],[.0105,.0378],[.0125,.036],[.0235,.036],[.0272,.0345],[.0282,.0315],[.0272,.0285],[.0245,.027]];for(let T=0;T<=12;T++){const h=T/12,N=.024-h*.048;i.push([.0245-.0058*Math.sin(h*Math.PI),N])}i.push([.0272,-.027],[.0285,-.0305],[.0285,-.0345],[.0265,-.0368],[.012,-.038],[.0075,-.039],[.006,-.042],[.003,-.0435],[0,-.0438])}else e==="Flywheel"?(r=.0185,f=.027,i=[[0,.027],[.0058,.027],[.0066,.0255],[.0066,.0225],[.0095,.022],[.0105,.0205],[.0105,.017],[.016,.0145],[.0185,.0125],[.0185,.009],[.021,.0075],[.036,.0065],[.04,.0088],[.0465,.0105],[.049,.009],[.0496,.006],[.0496,-.006],[.049,-.009],[.0465,-.0105],[.04,-.0088],[.036,-.0065],[.021,-.0075],[.0185,-.009],[.0185,-.0125],[.016,-.0145],[.009,-.017],[.0065,-.0195],[.003,-.0212],[0,-.0215]]):(r=.026,f=.041,i=[[0,.041],[.0058,.041],[.0066,.0395],[.0066,.036],[.0095,.0355],[.0105,.034],[.0105,.0322],[.012,.031],[.021,.031],[.0225,.0302],[.0245,.0288],[.0255,.0268],[.026,.0238],[.026,.0162],[.0246,.0156],[.0246,.0137],[.026,.0131],[.026,-.0131],[.0246,-.0137],[.0246,-.0156],[.026,-.0162],[.026,-.0238],[.0255,-.0268],[.024,-.029],[.012,-.0302],[.0095,-.0315],[.0085,-.0345],[.0055,-.0385],[.002,-.0405],[0,-.0408]]);l(i,_+8,1,0,w);const g=e==="Four Arm Cross"?4:2,L=.094+(e==="Flywheel"?.012:0),q=e==="Flywheel"?.0496:r;for(let T=0;T<g;T++){const h=T*Math.PI*2/g;l([[0,L],[.0018,L],[.0027,L-.001],[.0029,L-.0016],[.0029,q*.6]],10,2,h,F(h));const N=q;l([[.003,N+.0098],[.0052,N+.0094],[.0056,N+.0078],[.0056,N+.0042],[.0066,N+.0032],[.0072,N+.0016],[.0086,N+5e-4],[.0086,N-.0022]],18,4,h,F(h))}{const T=Math.PI/2,h=r;e!=="Flywheel"&&l([[0,h+.0028],[.0032,h+.0028],[.0037,h+.0023],[.0037,h+3e-4],[.0042,h-.001]],14,4,0,(N,P,D,G,W,st,X)=>G.push(N,D,P,W,X,st))}b&&(l([[0,0],[.011,0],[.011,-.003],[.0095,-.0045],[.0066,-.005],[.0066,-.0145],[.0058,-.016],[.0035,-.0172],[.0012,-.0178],[0,-.018]],28,5,0,w),l([[0,.0118],[.0029,.0118],[.0033,.0113],[.0033,.0088],[.0016,.0086],[.0016,.006]],12,5,0,(T,h,N,P,D,G,W)=>P.push(h,T-.0098,N,G,D,W)));const O=n.I.length;for(let T=0;T<g;T++){const h=T*Math.PI*2/g,N=(P,D,G,W,st,X,ut)=>W.push(D,P,G,X,st,ut);if(o==="Knurled")l([[.0032,.0065],[.008,.0065],[.0092,.0058],[.0098,.0052],[.0098,-.0052],[.0092,-.0058],[.008,-.0065],[.0032,-.0065]],28,3,h,N);else if(o==="Ball Weights"){const P=[[.0032,.0104]];for(let D=1;D<13;D++){const G=D/13*Math.PI;P.push([.0112*Math.sin(G),.0112*Math.cos(G)])}P.push([.0032,-.0104]),l(P,24,3,h,N)}else _o(n,h,.0092,.0118)}const U=t.createBuffer(),I=t.createBuffer(),B=t.createVertexArray();return t.bindVertexArray(B),t.bindBuffer(t.ARRAY_BUFFER,U),t.bufferData(t.ARRAY_BUFFER,new Float32Array(n.V),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,I),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(n.I),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,40,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,3,t.FLOAT,!1,40,12),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,4,t.FLOAT,!1,40,24),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null),{vao:B,n:n.I.length,Rb:q,axisR:r,topH:f,bot:-i[i.length-1][1],L,nRods:g,verts:n.V.length/10,rods:g,buf:U,ibuf:I}}function Do(t,e,o,b){const n=(_,A,x)=>{t.activeTexture(t.TEXTURE0+x),t.bindTexture(t.TEXTURE_2D,_),t.uniform1i(A,x)},l=Wt(t,e,b,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,!1),w=Wt(t,e,b,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,!1);t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(e.emptyVao),t.viewport(0,0,b,b),t.bindFramebuffer(t.FRAMEBUFFER,l.f);const F=Ye(t,e,o.key,!0);return t.useProgram(F.p),t.uniform4fv(F.u.B,o.B),t.uniform4fv(F.u.Ix,o.Ix),t.uniform4fv(F.u.Iy,o.Iy),n(e.tN,F.u.tN,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,w.f),t.useProgram(e.pLens),t.uniform4fv(e.uLens.B,o.B),n(l.t,e.uLens.tI,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),je(t,l),w}We.add({num:225,name:"Twisting Spring",fam:"Worlds",recipe:"A brass bob on a long spring in an old cabinet, where the bounce really drains into a twist and back. The bob, the weights and the light change every mint. Drag up or down to pull it or sideways to twist it, tap beside a weight to move it and tune it until the bounce dies completely, or tap the wall to open a long exposure.",interactive:"Drag up or down to pull the bob, sideways to twist it, then let go. Tap beside a weight to walk it along its arm and tune the exchange until the bounce dies completely. Tap the wall to open a long exposure.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl;let o=null,b=-2128612852;for(let a=2;a<t.hash.length;a++)b^=t.hash.charCodeAt(a),b=Math.imul(b,16777619);const n=()=>{b=b+1831565813|0;let a=Math.imul(b^b>>>15,1|b);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},l=a=>{let s=0;for(const v of a)s+=v[1];let m=n()*s;for(const v of a)if(m-=v[1],m<=0)return v[0];return a[0][0]};let w=l([["Turned Drum",5],["Waisted",3],["Brass Ball",2.5],["Flywheel",1],["Four Arm Cross",.8]]),F=l([["Hex Nuts",5],["Knurled",3],["Ball Weights",1.2]]),_=l([["Old Brass",5],["Bright Lacquer",2.5],["Nickel Plate",1],["Verdigris",.7]]),A=l([["Right-Hand Steel",4],["Left-Hand Steel",3],["Blued Steel",1.6],["Phosphor Bronze",1]]),x=l([["Moderate",5],["Slow",2.5],["Quick",2]]),p=l([["In Tune",6],["A Little Off",3],["Far Off",1]]),d=l([["Sage Paint",4],["Cream Paint",3],["Slate Paint",2],["Bare Oak",2],["Black Velvet",.7]]),i=l([["North Window",7],["Night Lamp",1.5],["Magnesium Flash",.8]]),r=l([["Short",8],["Time Exposure",1]]);t.home&&(w="Turned Drum",F="Hex Nuts",_="Old Brass",A="Right-Hand Steel",x="Moderate",p="In Tune",d="Sage Paint",i="North Window",r="Short"),t.trait("Bob",w),t.trait("Weights",F),t.trait("Finish",_),t.trait("Spring",A),t.trait("Exchange",x),t.trait("Tuning",p),t.trait("Cabinet",d),t.trait("Light",i),t.trait("Exposure",r);let f=2051098305;for(let a=2;a<t.hash.length;a++)f^=t.hash.charCodeAt(a),f=Math.imul(f,16777619);const g=()=>{f=f+1831565813|0;let a=Math.imul(f^f>>>15,1|f);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},L=g(),q=g(),O=g(),U=g();let I=t.home||L<.72?"At the bob":L<.88?"The whole instrument":"From above";I==="The whole instrument"&&i==="Night Lamp"&&(I="At the bob"),!t.home&&i==="North Window"&&q<.15&&d!=="Black Velvet"&&(i="Evening Sun"),t.trait("Light",i),t.trait("View",I);const B=I==="The whole instrument",T=I==="From above",h=i==="Evening Sun",N=B?"WHOLE":"";o=He.get(e),o||(o=Ao(e,N),He.set(e,o));const P=t.size,D=P>512,G=D?1024:512,W=D?512:256,st=w+"|"+F+(B?"|w":"");let X=o.meshes.get(st);X||(X=Io(e,w,F,B),o.meshes.set(st,X));const ut=X.nRods,Ht=X.Rb,Zt=X.topH,Ke=X.L,Je=A==="Left-Hand Steel"?-1:1,to=x==="Quick"?.09:x==="Slow"?.04:.06,Pt=x==="Quick"?48:x==="Slow"?84:64,Nt=.028-(x==="Quick"?-.003:x==="Slow"?.002:0),ie=28e-5+Math.pow(20*8*Nt*Nt*Nt*Pt/79e9,.25)*.75,Yt=.5,yt=20,ce=7850*Math.PI*Nt*Pt*Math.PI*ie*ie/4,eo=4*ce*Nt*Nt/4,Uo=Pt*ie*1.7,oo=yt/(Yt+ce/3),ko=.05*2/ut,Qo=w==="Flywheel"?54e-5:w==="Brass Ball"?16e-5:w==="Four Arm Cross"?13e-5:11e-5,ao=Ht+.0185,ro=.003,jt=Math.floor((Ke-.0075-ao)/ro),le=Math.max(2,Math.min(jt-2,Math.round(jt*(.4+.25*n())))),ye=a=>ao+a*ro,we=a=>Qo+ut*ko*a*a,fe=oo*(we(ye(le))+eo/3),Co=Je*2*to*Math.sqrt(yt*fe),Ee=p==="In Tune"?0:p==="A Little Off"?3:7;let gt=le;if(Ee){const a=n()<.5?-1:1;gt=le+a*Ee,(gt<0||gt>jt)&&(gt=le-a*Ee),gt=Math.max(0,Math.min(jt,gt))}let he=gt,nt=ye(gt),de=nt,ue=n()*6,me=we(nt);t.home&&(ue=0);const $=new Float64Array(c+1),K=new Float64Array(c+1),J=new Float64Array(c+1),tt=new Float64Array(c+1),ve=new Float64Array(c),xe=new Float64Array(c),Bt=new Float64Array(c+1);{const a=Zt,s=yt*c;Bt[c]=a;for(let m=c-1;m>=0;m--){const v=(Yt+ce*(c-1-m+.5)/c)*9.81;Bt[m]=Bt[m+1]+(Uo/c+v/s)}}const Te=Bt[0]-Bt[c],qo=yt*c,Oo=fe*c,so=Co*c,no=ce/c,io=eo/c,Qt=t.home?.052:.04+n()*.018;let $t=625341552;for(let a=2;a<t.hash.length;a++)$t^=t.hash.charCodeAt(a),$t=Math.imul($t,16777619);const co=(($t^$t>>>15)>>>0)%9973/9973,lo=Math.sqrt(oo),s0=to*lo*.5,Xo=Math.sqrt(yt/fe)*lo*Qt,Re=(a,s=1)=>{for(let m=0;m<=c;m++)$[m]=s*Qt*Math.cos(a)*m/c,K[m]=0,J[m]=0,tt[m]=-s*Math.sin(a)*Xo*.7*m/c};let Fe=t.home?0:co*Math.PI;Re(Fe);let wt=(n()-.5)*.002,Et=(n()-.5)*.002,Mt=(n()-.5)*.006,At=(n()-.5)*.006;const fo=9.81/(Te+.05),Vo=.5*yt*Qt*Qt;let rt=null;const ge=()=>{for(let u=0;u<c;u++){const M=$[u+1]-$[u],E=J[u+1]-J[u];ve[u]=qo*M+so*E,xe[u]=Oo*E+so*M}for(let u=1;u<c;u++)K[u]+=at*(ve[u]-ve[u-1])/no,tt[u]+=at*(xe[u]-xe[u-1])/io;{let u=0,M=0;for(let E=1;E<c;E++){const y=K[E],z=tt[E];K[E]=y+.05*(u-2*y+K[E+1]),tt[E]=z+.05*(M-2*z+tt[E+1]),u=y,M=z}}let a=-ve[c-1],s=-xe[c-1];rt&&(a+=-400*($[c]-rt.d)-28*K[c],s+=-.5*(J[c]-rt.th)-.028*tt[c]),K[c]+=at*a/(Yt+no/2),tt[c]+=at*s/(me+io/2);const v=.5*yt*$[c]*$[c]+.5*Yt*K[c]*K[c]+.5*me*tt[c]*tt[c]+.5*fe*J[c]*J[c]>Vo*.45?1-at*.03:1;for(let u=1;u<=c;u++)K[u]*=v,$[u]+=at*K[u],tt[u]*=v,J[u]+=at*tt[u];Mt+=at*(-fo*wt),At+=at*(-fo*Et),Mt*=1-at*.05,At*=1-at*.05,wt+=at*Mt,Et+=at*At};let Kt=-1640531624;for(let a=2;a<t.hash.length;a++)Kt^=t.hash.charCodeAt(a),Kt=Math.imul(Kt,16777619);const ho=((Kt^Kt>>>13)>>>0)%10007/10007,Tt=!t.home&&ho<.2&&I==="At the bob"&&!h;if(r==="Time Exposure"&&(p==="Far Off"||Tt||B||T)&&(r="Short",t.trait("Exposure",r)),r==="Time Exposure"&&!t.home){const a=[wt,Et,Mt,At];let s=1e9,m=0;for(let u=0;u<8;u++){const M=(u+co)*Math.PI/8;Re(M);let E=0;for(let y=0;y<2880;y++)ge(),y>=2160&&(E+=yt*$[c]*$[c]+Yt*K[c]*K[c]);E<s&&(s=E,m=M)}const v=s/(720*yt*Qt*Qt);Fe=m,Re(Fe,Math.max(.35,Math.min(1,Math.sqrt(.03/Math.max(v,1e-6))))),[wt,Et,Mt,At]=a}const zt=Math.PI/180,Be=(t.home?24:19+9*n())*zt;let et=1,V=w==="Flywheel"?.145:.116;const Go=t.home||n()<.5?1:-1,Wo=t.home?42:25+30*n(),Me=B&&O<.5,St=Tt?(52+10*(ho*5%1))*zt:B?(Me?-1:1)*(10+18*U)*zt:Be;Tt&&t.trait("Cabinet",d+", along the wall");const S=[Math.cos(St),0,-Math.sin(St)];let R,ot,it,_t=0;if(B){_t=Bt[0]+.018;const a=-.074-X.bot,s=_t+.024;V=(s-a)/2/.9;const m=(6+4*(O*7%1))*zt,v=1.25,u=(Me?-1:1)*V/3;it=[S[0]*u,(s+a)/2,S[2]*u];const M=[it[0]+Math.sin(St)*Math.cos(m)*v,Math.sin(m)*v,it[2]+Math.cos(St)*Math.cos(m)*v],E=[it[0]-M[0],it[1]-M[1],it[2]-M[2]];et=Math.hypot(E[0],E[1],E[2]),R=[E[0]/et,E[1]/et,E[2]/et],ot=M}else{const a=(T?38+10*U:Tt?8:16)*zt;R=[-Math.sin(St)*Math.cos(a),-Math.sin(a),-Math.cos(St)*Math.cos(a)],h&&!Tt&&(V*=1.08),T&&(V*=1.35);const s=T?.004:w==="Flywheel"?Tt?-.02:.012:Tt?-.034:h?.05:.03,m=T?-.004:Tt?.03:.021,v=[S[1]*R[2]-S[2]*R[1],S[2]*R[0]-S[0]*R[2],S[0]*R[1]-S[1]*R[0]];it=[S[0]*s+v[0]*m,S[1]*s+v[1]*m,S[2]*s+v[2]*m],ot=[it[0]-R[0]*et,it[1]-R[1]*et,it[2]-R[2]*et]}const ct=[S[1]*R[2]-S[2]*R[1],S[2]*R[0]-S[0]*R[2],S[0]*R[1]-S[1]*R[0]];let pe=Go*Wo;if(!t.home){const a=[$.slice(),K.slice(),J.slice(),tt.slice(),wt,Et,Mt,At];let s=0;for(let y=1;y<=5040;y++)ge(),y===2880&&(s=J[c]);const m=J[c];$.set(a[0]),K.set(a[1]),J.set(a[2]),tt.set(a[3]),[wt,Et,Mt,At]=a.slice(4);const v=ut===4?Math.PI/2:Math.PI,u=(y,z)=>{const Y=((Be+y*zt+z-St)%v+v)%v;return Math.min(Y,v-Y)/zt};let M=pe,E=1e9;for(let y=-80;y<=80;y+=.5){const z=u(y,s),Y=u(y,m);if(z>30)continue;const j=Math.abs(y)>=25&&Math.abs(y)<=55,Z=Math.abs(y-pe)+(j?0:200)+(Y>40?400:0);Z<E&&(E=Z,M=y)}pe=M}const uo=Be+pe*zt,mo=t.home?0:uo,vt=et/V,xt=.4,pt=2,be=(a,s)=>a[0]*s[0]+a[1]*s[1]+a[2]*s[2],Jt=new Float32Array([vt*S[0],vt*ct[0],-(pt+xt)/(pt-xt)*-R[0]*-1,R[0],vt*S[1],vt*ct[1],-(pt+xt)/(pt-xt)*-R[1]*-1,R[1],vt*S[2],vt*ct[2],-(pt+xt)/(pt-xt)*-R[2]*-1,R[2],-vt*be(S,ot),-vt*be(ct,ot),0,-be(R,ot)]);{const a=(pt+xt)/(pt-xt),s=-2*pt*xt/(pt-xt);Jt[2]=a*R[0],Jt[6]=a*R[1],Jt[10]=a*R[2],Jt[14]=a*-be(R,ot)+s}const vo=(a,s,m)=>{const v=a-ot[0],u=s-ot[1],M=m-ot[2],E=v*R[0]+u*R[1]+M*R[2],y=(v*S[0]+u*S[1]+M*S[2])*vt/E,z=(v*ct[0]+u*ct[1]+M*ct[2])*vt/E;return[y*.5+.5,.5-z*.5]},Q=i==="Night Lamp",C=i==="Magnesium Flash",It=Me?-1:1,H=bt(C?[.12,.25,.96]:Q?[.42,-.28,.86]:h?[-.62*It,.23,.95]:[-.46*It,.52,.72]);function bt(a){const s=Math.hypot(a[0],a[1],a[2]);return[a[0]/s,a[1]/s,a[2]/s]}const Rt=bt([H[2],0,-H[0]]),ze=[H[1]*Rt[2]-H[2]*Rt[1],H[2]*Rt[0]-H[0]*Rt[2],H[0]*Rt[1]-H[1]*Rt[0]],Ct=d==="Sage Paint"?[.205,.285,.205]:d==="Cream Paint"?[.58,.52,.38]:d==="Slate Paint"?[.135,.185,.225]:[.4,.3,.2],Le=d==="Bare Oak"?1:d==="Black Velvet"?2:0,Ho=C?1.15:1,Pe=C?[.05,.05,.06]:Q?[.036,.019,.008]:h?B?[.23,.27,.33]:[.15,.18,.23]:[.5,.55,.59],Ne=C?[1,1,1]:Q?[1,.6,.27]:h?[1,.8,.55]:[.97,1,1.04],Ae=_==="Bright Lacquer"?[1,.8,.42]:_==="Nickel Plate"?[.8,.78,.71]:_==="Verdigris"?[.62,.45,.25]:[.93,.67,.3],Zo=_==="Bright Lacquer"?.1:_==="Nickel Plate"?.08:_==="Verdigris"?1:.8,Se=A==="Blued Steel"?[.1,.14,.28]:A==="Phosphor Bronze"?[.72,.5,.32]:[.55,.56,.58],Yo=A==="Blued Steel"?.25:A==="Phosphor Bronze"?.3:.55,lt=new Float32Array(41*4);lt.set(Jt,0);const k=(a,s,m,v,u)=>{const M=16+a*4;lt[M]=s,lt[M+1]=m,lt[M+2]=v,lt[M+3]=u},_e=B?[.05*It,_t*.45-.06,-.03]:h?[.09,-.03,-.03]:[.05,-.02,-.03],Ie=1/(B?_t*.62+.1:h?.25:.21);k(0,ot[0],ot[1],ot[2],1/ft),k(1,Rt[0],Rt[1],Rt[2],Ie),k(2,ze[0],ze[1],ze[2],et),k(3,_e[0],_e[1],_e[2],Math.max(1,1e3/P));const jo=B?0:Math.max(.25,1-43/Pt);k(4,Pt,Nt/2,ie/2,Je),k(5,jo,c,Zt,nt),k(6,ue,ut,Ht,Ke),k(7,Ae[0],Ae[1],Ae[2],Zo),k(8,Se[0],Se[1],Se[2],Yo);const $o=Te/Pt*P/(2*V);k(20,_t,B?Math.min(1,Math.max(0,(4.2-$o)/1.4)):0,B?1:0,Te/Pt),k(21,B?V/.116:1,mo,0,0);const mt=C?bt([.12,-.12,1]):Q||h?H:bt([-.7*It,-.06,.62]),Ft=bt([mt[2],0,-mt[0]]),De=[mt[1]*Ft[2]-mt[2]*Ft[1],mt[2]*Ft[0]-mt[0]*Ft[2],mt[0]*Ft[1]-mt[1]*Ft[0]];k(9,mt[0],mt[1],mt[2],C?3.6:Q?9:h?4.4:3.5),k(10,Ft[0],Ft[1],Ft[2],C?.22:Q?.075:.42),k(11,De[0],De[1],De[2],C?.22:Q?.09:.62);const Ue=C?[1.05,1.02,1]:Q?[1.2,.86,.52]:h?[1.3,1,.64]:[.86,.95,1.1];k(12,Ue[0],Ue[1],Ue[2],C||Q?0:.03);const Ko=Le===2?.35:1,Dt=C?.4:Q?.2:1,ke=.55*Ko*Dt*(C||Q?1:.8);k(13,Ct[0]*ke,Ct[1]*ke,Ct[2]*ke,w==="Turned Drum"||w==="Four Arm Cross"?1:0),k(14,.17*Dt,.095*Dt,.045*Dt,0),k(15,.06*Dt,.045*Dt,.03*Dt,C?D?.5:0:(Q?1.8:2.6)-(D?0:.5));const Qe=Q||C?bt([-.7,-.12,.6]):h?H:bt([.6*It,-.18,.78]);k(16,Qe[0],Qe[1],Qe[2],.022);const Ce=C?[.5,.46,.42]:Q?[.22,.15,.08]:h?[2.6,1.9,1.05]:[2.2,1.45,.8];k(17,Ce[0],Ce[1],Ce[2],C?.7:Q?3:4.6),k(18,H[0],H[1],H[2],Ho*1.3),k(19,S[0]*V,S[1]*V,S[2]*V,0),k(25,R[0]*et,R[1]*et,R[2]*et,0);const Jo=(C?.002:Q?.005:h?.0026:.0095)*Ie*.5;k(26,2.2/(Ie*W),0,1/P,Jo),k(27,uo,C?.92:Q?.85:h?.9:.72,o.hf?1:4,F==="Knurled"?1:0),k(28,ct[0]*V,ct[1]*V,ct[2]*V,_==="Verdigris"?1:_==="Nickel Plate"?2:_==="Bright Lacquer"?3:0);const i0=t.hash+(t.home?"h":""),t0=(()=>{const a=new Float32Array(68),s=(Ut,Vt,Gt,Xe,Ve)=>a.set([Vt,Gt,Xe,Ve],Ut*4);s(0,ot[0],ot[1],ot[2],1/G),s(1,R[0]*et,R[1]*et,R[2]*et,0),s(2,S[0]*V,S[1]*V,S[2]*V,0),s(3,H[0],H[1],H[2],C?1.3:Q?2.6:h?1.5:1.12);{const Ut=C?[0,0]:Q?[Tt?-.11:-.004,-.03]:B?[.1*It,_t-.29]:h?[.085,-.02]:[.055,.025],Vt=.7,Gt=Vt-re;s(4,Ut[0]+H[0]/H[2]*Gt,Ut[1]+H[1]/H[2]*Gt,0,Vt)}s(5,C?2:Q?.04:h?.125:.087,C?2:Q?.26:h?.25:.3,C?.001:Q?.006:h?8e-4:.013,C||Q?0:h?.006:.011),s(6,ct[0]*V,ct[1]*V,ct[2]*V,0),s(7,Pe[0],Pe[1],Pe[2],0),s(8,Le,n()*20,n()*20,n()*.1);const m=.178+.018*n();s(9,Ne[0],Ne[1],Ne[2],B?_t:m);const v=-.15+n()*.06;s(10,v,.1+n()*.04,.028+n()*.02,.05+n()*.025);const u=Le<2,M=.083+n()*.012;s(11,u?B?.2*It:M:9,-.03,.0058,0);const E=d==="Slate Paint"?[.3,.25,.16]:[.2,.145,.07];s(12,E[0],E[1],E[2],0),s(13,1.08-(t.home?.1:n()*.1),-.02,0,0),B?s(14,it[0],it[1],it[2],.046*.116/V*.8):s(14,0,0,0,h?.03:.046),s(15,R[0],R[1],R[2],0),s(16,Ct[0],Ct[1],Ct[2],0);const y=new Float32Array(24),z=new Float32Array(24),Y=-.122-n()*.015,j=-.072,Z=(Ut,Vt,Gt,Xe,Ve,r0,Ge)=>{y.set([Vt,Gt,Xe,Ve],Ut*4),z.set([Ge[0],Ge[1],Ge[2],r0],Ut*4)},Ot=[.44,.21,.055],Xt=se+.01;return Z(0,Y-.024,Xt,j-.006,.0105,.024,Ot),Z(1,Y-.0015,Xt,j,.0082,.019,Ot),Z(2,Y+.0175,Xt,j+.006,.006,.014,Ot),Z(3,Y-.024,Xt+.024,j-.006,.0048,.0055,Ot),Z(4,Y-.0015,Xt+.019,j,.0039,.0045,Ot),Z(5,Y+.0175,Xt+.014,j+.006,.0029,.0035,Ot),{B:a,Ix:y,Iy:z,key:N}})(),xo=Do(e,o,t0,G),po=o.hf?e.RGBA16F:e.RGBA8,bo=o.hf?e.HALF_FLOAT:e.UNSIGNED_BYTE,te={L:Wt(e,o,P,po,e.RGBA,bo,!0),S1:Wt(e,o,W,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,!1),S2:Wt(e,o,W>>1,po,e.RGBA,bo,!1),fresh:!0};e.bindTexture(e.TEXTURE_2D,te.S1.t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR);const e0=[xo,te.L,te.S1,te.S2],ee=new Float32Array((c+1)*ft*4),yo=a=>{let s=a*(c+1)*4;for(let m=0;m<=c;m++){const v=m/c;ee[s++]=Bt[m]-$[m],ee[s++]=J[m],ee[s++]=wt*v,ee[s++]=Et*v}};for(let a=0;a<ft;a++)yo(a);let oe=0,qe=!1,qt=r==="Time Exposure"&&o.hf?1.1:.001,Oe=qt;const wo=a=>{const s=te,m=xo;oe++;const v=.09,u=oe*2.39996,M=2/P;for(let z=0;z<ft;z++){const Y=z*2.39996+u,j=Math.sqrt((z+.5)/ft),Z=16+(29+z)*4;lt[Z]=((z*.618+oe*.381)%1-.5)*M,lt[Z+1]=((z*.755+oe*.569)%1-.5)*M,lt[Z+2]=Math.cos(Y)*j*v,lt[Z+3]=Math.sin(Y)*j*v}const E=s.fresh||oe===1?1:1-Math.exp(-Math.max(a,.001)/qt);s.fresh=!1,lt[19]=E/ft,lt[16+6*4]=ue,lt[16+5*4+3]=nt,e.bindVertexArray(X.vao),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.bindBuffer(e.UNIFORM_BUFFER,o.ubo),e.bufferSubData(e.UNIFORM_BUFFER,0,lt),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,0,o.ubo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,o.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,c+1,ft,e.RGBA,e.FLOAT,ee),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.depthMask(!1),e.bindFramebuffer(e.FRAMEBUFFER,s.S1.f),e.viewport(0,0,W,W),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(o.pFlat),e.uniform1i(o.uFlat.tD,0),e.uniform1i(o.uFlat.uM,1),e.uniform1i(o.uFlat.uS,ft-1),e.enable(e.BLEND),e.blendEquation(e.MAX),e.drawElements(e.TRIANGLES,X.n,e.UNSIGNED_SHORT,0),e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,s.S1.t),e.generateMipmap(e.TEXTURE_2D);const y=qt>.08;y||(qe=!1),y&&(e.bindFramebuffer(e.FRAMEBUFFER,s.S2.f),e.viewport(0,0,W>>1,W>>1),e.enable(e.BLEND),e.blendFunc(e.CONSTANT_ALPHA,e.ONE_MINUS_CONSTANT_ALPHA),e.blendColor(0,0,0,qe?E:1),qe=!0,e.useProgram(o.pBlit),e.uniform1i(o.uBlit.uM,2),e.uniform1i(o.uBlit.tD,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,s.S1.t),e.uniform1i(o.uBlit.tS,1),e.uniform2f(o.uBlit.uI,2/W,0),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND)),e.bindFramebuffer(e.FRAMEBUFFER,s.L.f),e.viewport(0,0,P,P),E>.995?(e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)):(e.enable(e.BLEND),e.blendFunc(e.ZERO,e.CONSTANT_ALPHA),e.blendColor(0,0,0,1-E),e.useProgram(o.pFlat),e.uniform1i(o.uFlat.uM,2),e.drawArrays(e.TRIANGLES,0,3)),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,o.tN),e.enable(e.DEPTH_TEST),e.useProgram(o.pMetal),e.uniform1i(o.uMetal.tD,0),e.uniform1i(o.uMetal.tN,1),e.uniform1i(o.uMetal.uM,0),e.useProgram(o.pFlat),e.uniform1i(o.uFlat.uM,0);for(let z=0;z<ft;z++)e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.depthFunc(e.LESS),e.colorMask(!1,!1,!1,!1),e.disable(e.BLEND),e.useProgram(o.pFlat),e.uniform1i(o.uFlat.uS,z),e.drawElements(e.TRIANGLES,X.n,e.UNSIGNED_SHORT,0),e.colorMask(!0,!0,!0,!0),e.depthMask(!1),e.depthFunc(e.LEQUAL),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(o.pMetal),e.uniform1i(o.uMetal.uS,z),e.drawElements(e.TRIANGLES,X.n,e.UNSIGNED_SHORT,0);e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.depthMask(!0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,P,P),e.useProgram(o.pComp),e.uniform1i(o.uComp.uM,2),e.uniform1i(o.uComp.tD,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,m.t),e.uniform1i(o.uComp.tB,1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,s.L.t),e.uniform1i(o.uComp.tL,2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,y?s.S2.t:s.S1.t),e.uniform1i(o.uComp.tS,3),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,o.tN),e.uniform1i(o.uComp.tN,4),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE0),e.bindVertexArray(null),e.useProgram(null)};wo(1/30);const ht=t.input,ae=t.sound;let dt=null,Eo=0,To=0,o0=0;const a0=a=>{const s=[];for(let m=0;m<ut;m++){const v=mo+m*Math.PI*2/ut+J[c],u=Math.cos(v),M=-Math.sin(v),E=Bt[c]-$[c]-Zt;s.push(vo(wt+u*nt,E,Et+M*nt).concat(vo(wt,E,Et)))}return s},Ro=(a,s)=>{const m=a0();let v=null,u=9;for(const y of m){const z=Math.hypot(y[0]-a,y[1]-s);z<u&&(u=z,v=y)}const M=(a-v[2])/(Math.abs(nt)/(V*2)+.07),E=(s-v[3])/(Math.abs(nt)/(V*2)*.45+.07);if(u<.11||M*M+E*E<1){const y=v[0]-v[2],z=v[1]-v[3],Y=Math.hypot(y,z)||1;let Z=((a-v[0])*y+(s-v[1])*z)/Y<-.006?-1:1;(he+Z>jt||he+Z<0)&&(Z=-Z),he+=Z,de=ye(he),ae.hit("click",.35)}else Oe=Oe>.1||!o.hf?.001:1.1,ae.hit("click",.2)},Fo=(a,s)=>{s=Math.min(s||1/30,.25);const m=ht.taps();if(ht.down&&!dt&&(dt={x:ht.x,y:ht.y,t:a,moved:!1}),dt)if(ht.down){const y=ht.x-dt.x,z=ht.y-dt.y;!dt.moved&&(Math.hypot(y,z)>.022||a-dt.t>.3)&&(dt.moved=!0,rt={d:$[c],th:J[c],d0:$[c],th0:J[c],x:ht.x,y:ht.y}),rt&&(rt.d=Math.max(-.07,Math.min(.072,rt.d0+(ht.y-rt.y)*Math.min(V,.145)*2)),rt.th=rt.th0+(ht.x-rt.x)*6.28*1.1)}else dt.moved?rt&&(Mt+=(ht.x-rt.x)*.02):Ro(dt.x,dt.y),dt=null,rt=null;else m.length&&Ro(m[m.length-1].x,m[m.length-1].y);if(Math.abs(de-nt)>1e-5){const y=Math.sign(de-nt)*Math.min(Math.abs(de-nt),s*.012);nt+=y,ue+=y/.0015*6.28318;const z=we(nt);tt[c]*=me/z,me=z,++o0%4===0&&ae.hit("click",.1)}qt+=(Oe-qt)*Math.min(1,s*3);let v=Math.max(1,Math.round(s/at));v>150&&(v=150);let u=0;const M=qt>.08?0:Math.floor(v*.8),E=Math.max(1,v-M);for(let y=0;y<v;y++){if(ge(),y>=M)for(;u<ft&&(y-M+1)*ft>=(u+1)*E;)yo(u++);const z=K[c],Y=tt[c];if(Eo>0&&z<=0){const j=Math.abs($[c])/.05;j>.07&&ae.note(40,{dur:.5,vel:Math.min(.5,j*.34),wave:"triangle",cutoff:500})}if(To>0&&Y<=0){const j=Math.abs(J[c])/1.5;j>.07&&ae.note(47,{dur:.5,vel:Math.min(.5,j*.34),wave:"sine",cutoff:900})}Eo=z,To=Y}wo(s)};return $e&&$e.register(Fo,()=>[e,e0]),Fo}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
