// Sweating Glass: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/446.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Re){Re&&Re.add({num:446,name:"Sweating Glass",fam:"Worlds",recipe:"A glass of iced water on a table by the window, going from fog to beads to drops that run down and make a wet ring. The glass, the ice, the light and how long it's been sitting change every mint. Drag to wipe a stripe and watch it fog up again, hold to clear a patch with a warm fingertip, or tap to flick the glass and knock the big drops loose.",interactive:"Drag across the glass to wipe a stripe through the condensation and watch it fog and bead up again. Hold to clear a patch with a warm fingertip. Tap to flick the glass and shake the big drops loose.",music:!0,gl:!0,fps:30,seed:0,make(A){const t=A.gl,B=A.size,Pt=A.hash.slice(2);let de=parseInt(Pt.slice(0,8),16)|0,Nt=parseInt(Pt.slice(8,16),16)|0,mt=parseInt(Pt.slice(16,24),16)|0,Zt=parseInt(Pt.slice(24,32),16)|0;const c=()=>{de>>>=0,Nt>>>=0,mt>>>=0,Zt>>>=0;let e=de+Nt|0;return de=Nt^Nt>>>9,Nt=mt+(mt<<3)|0,mt=mt<<21|mt>>>11,Zt=Zt+1|0,e=e+Zt|0,mt=mt+e|0,(e>>>0)/4294967296};for(let e=0;e<12;e++)c();const vt=e=>{let o=0;for(const n of e)o+=n[1];let a=c()*o;for(const n of e)if(a-=n[1],a<0)return n[0];return e[e.length-1][0]};let J=vt([["Just Poured",20],["Sweating",48],["Left Standing",25],["Forgotten",7]]),Z=vt([["Dry",20],["Humid",52],["Muggy",23],["Tropical",5]]),k=vt([["Tumbler",50],["Highball",28],["Rocks",22]]),$t=vt([["Full",38],["Two Thirds",42],["Half",20]]),j=vt([["Three Cubes",40],["Two Cubes",26],["Four Cubes",18],["Ice Sphere",9],["No Ice",7]]),St=vt([["Oak",36],["Walnut",32],["Teak",22],["Pale Ash",10]]),Ut=vt([["Late Sun",50],["Morning",34],["Golden Hour",16]]),te=vt([["Clean",58],["One Old Ring",32],["Ring Stains",10]]);A.home&&(J="Sweating",Z="Humid",k="Tumbler",$t="Two Thirds",j="Three Cubes",St="Oak",Ut="Late Sun",te="One Old Ring"),k==="Rocks"&&j==="Four Cubes"&&(j="Three Cubes"),k==="Highball"&&j==="Ice Sphere"&&(j="Two Cubes"),A.trait("Standing",J),A.trait("Air",Z),A.trait("Glass",k),A.trait("Water",$t),A.trait("Ice",j),A.trait("Table",St),A.trait("Light",Ut),A.trait("Old Rings",te);let Wt=parseInt(Pt.slice(40,48),16)^1147970533|0;const Ae=()=>{Wt=Wt+1831565813|0;let e=Math.imul(Wt^Wt>>>15,1|Wt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},H=A.trait("Camera",A.home?"Eye Level":(e=>e<.3?"From Above":e<.54?"Low and Close":"Eye Level")(Ae())),ke=Ae(),y=k==="Tumbler"?{R0:3,R1:3.62,H:9.6,tw:.24,bt:1}:k==="Highball"?{R0:2.8,R1:3,H:14.4,tw:.2,bt:1.3}:{R0:3.95,R1:4.3,H:8,tw:.33,bt:1.7},ee=(y.R1-y.R0)/y.H,oe=e=>y.R0+ee*e,so=$t==="Full"?.86:$t==="Two Thirds"?.66:.47,tt=y.bt+so*(y.H-y.bt),Xt=Math.min(tt+.8,y.H-.05),ae=oe(tt*.5),Fe=Z==="Dry"?y.bt+(tt-y.bt)*.55:tt,R=Math.PI*ae,X=Xt,co=k==="Rocks"?.42:k==="Highball"?.3:.36,_e=.16+.06*c(),he=H==="From Above"?.6+.16*ke:H==="Low and Close"?.07+.05*ke:co,De=H==="Low and Close"?_e+.25:_e,ct=Math.tan(11.5*Math.PI/180);let At=(k==="Tumbler"?33:k==="Highball"?39:34)*(H==="Low and Close"?.62:H==="From Above"?1.05:1);const lo=(e,o,a)=>[e,o,a],Le=(e,o)=>[e[0]-o[0],e[1]-o[1],e[2]-o[2]],re=(e,o)=>e[0]*o[0]+e[1]*o[1]+e[2]*o[2],xt=e=>{const o=Math.hypot(e[0],e[1],e[2]);return[e[0]/o,e[1]/o,e[2]/o]},Ve=(e,o)=>[e[1]*o[2]-e[2]*o[1],e[2]*o[0]-e[0]*o[2],e[0]*o[1]-e[1]*o[0]];let ut=lo(0,y.H*.45,0),_,S,V,et;const Ie=()=>{_=[ut[0]+At*Math.sin(De)*Math.cos(he),ut[1]+At*Math.sin(he),ut[2]+At*Math.cos(De)*Math.cos(he)],S=xt(Le(ut,_)),V=xt(Ve(S,[0,1,0])),et=Ve(V,S)},Ct=e=>{const o=Le(e,_),a=re(o,S);return[.5+.5*re(o,V)/(a*ct),.5-.5*re(o,et)/(a*ct)]},Pe=H==="From Above"?.57:H==="Low and Close"?.64:k==="Rocks"?.62:.61,io=H==="From Above"?.8:H==="Low and Close"?1:k==="Highball"?.9:k==="Rocks"?.87:.86,Ne=()=>{for(let e=0;e<6;e++){Ie();const o=Math.atan2(_[0],_[2]),a=Ct([0,y.H*.5,0]),n=Ct([Math.sin(o)*y.R0,0,Math.cos(o)*y.R0]),s=2*At*ct;ut=[ut[0]+(a[0]-Pe)*s*V[0],ut[1]+(io-n[1])*s*.98,ut[2]+(a[0]-Pe)*s*V[2]]}Ie()};if(Ne(),H==="From Above"&&k==="Highball"){const e=()=>{const o=Math.atan2(_[0],_[2]);return Ct([-Math.sin(o)*y.R1,y.H,-Math.cos(o)*y.R1])[1]};for(let o=0;o<16&&e()<.035;o++)At*=1.03,Ne()}const Tt=Math.atan2(_[0],_[2]),C=Ut==="Late Sun"?{L:xt([-.84,.4,-.36]),col:[1,.79,.57],I:3.3,amb:[.16,.135,.11]}:Ut==="Morning"?{L:xt([.8,.5,-.32]),col:[1,.93,.83],I:3,amb:[.15,.15,.15]}:{L:xt([-.92,.165,-.26]),col:[1,.53,.25],I:4.6,amb:[.14,.1,.075]},ot=C.L,pe=ot[0]<0?-72:72,Se=pe/ot[0],me=Se*ot[1],ve=Se*ot[2],fo=ve-40-10*c(),ho=ve+34+10*c(),po=me-22-6*c(),mo=me+60,vo=ve+(c()<.5?-1:1)*(8+10*c()),xo=me+14+8*c(),uo=.35+.4*c(),at=St==="Oak"?{k:0,pw:14.5,rf:80,wp:4,a:[.4,.285,.175],b:[.25,.165,.095]}:St==="Walnut"?{k:1,pw:17,rf:90,wp:9,a:[.19,.11,.065],b:[.08,.045,.026]}:St==="Teak"?{k:2,pw:9.5,rf:120,wp:3,a:[.34,.19,.09],b:[.21,.105,.045]}:{k:3,pw:12,rf:150,wp:5,a:[.6,.5,.38],b:[.42,.32,.21]},Ue=e=>oe(e)-y.tw,Ot=[];if(j==="Ice Sphere"){const e=Math.min(Ue(tt)-.35,2.9);Ot.push({c:[.2*(c()-.5),tt-e*.62,.2*(c()-.5)],he:[e,e,e],rr:e,M:[[1,0,0],[0,1,0],[0,0,1]],core:0})}else if(j!=="No Ice"){const e=j==="Two Cubes"?2:j==="Three Cubes"?3:4,o=k==="Rocks"?1.45:k==="Highball"?1.05:1.15;for(let a=0;a<e;a++){const n=o*(.88+.2*c())*(J==="Forgotten"?.5:1),s=n*(.28+.12*c())*(J==="Forgotten"?1.5:1),r=k==="Highball"?a:Math.floor(k==="Rocks"?a/3:a/2),h=k==="Highball"?0:k==="Rocks"?a%3:a%2,m=k==="Highball"?1:k==="Rocks"?Math.min(3,e):Math.min(2,e-r*2);let w=h/m*Math.PI*2+c()*.8+r*1.3;const i=m===1?.25*c():(Ue(tt)-n*1.45)*(.75+.25*c()),v=tt-n*.84-r*n*1.75-(r?.3*c():0),b=c()*6.28,u=(c()-.5)*.5,T=(c()-.5)*.5,g=Math.cos(b),d=Math.sin(b),x=Math.cos(u),p=Math.sin(u),M=Math.cos(T),z=Math.sin(T),E=[[g*M+d*p*z,-g*z+d*p*M,d*x],[x*z,x*M,-p],[-d*M+g*p*z,d*z+g*p*M,g*x]],W=[[E[0][0],E[1][0],E[2][0]],[E[0][1],E[1][1],E[2][1]],[E[0][2],E[1][2],E[2][2]]];Ot.push({c:[Math.cos(w)*i,Math.max(y.bt+n*.9,v),Math.sin(w)*i],he:[n,n*(.92+.1*c()),n*(.95+.1*c())],rr:s,M:W,core:.7+.3*c()})}}const qt=[],We=te==="Clean"?0:te==="One Old Ring"?1:3;for(let e=0;e<We;e++){const o=(e===0?-.6:c()*6.28)+(c()-.5)*.8,a=y.R0*(1.6+1.4*c())+e*2;qt.push([Math.sin(Tt+o)*a,Math.cos(Tt+o)*a,3+.8*c(),.5+.5*c()])}if(We===1){const e=qt[0],o=c()*6.28;qt.push([e[0]+Math.sin(o)*e[2]*1.1,e[1]+Math.cos(o)*e[2]*1.1,e[2]*(.95+.1*c()),e[3]*.55])}const zt=J==="Just Poured"?{rmax:.075,trails:0,pool:.05,cond:.25,fogOp:.95}:J==="Sweating"?{rmax:.19,trails:4,pool:.32,cond:.45,fogOp:.85}:J==="Left Standing"?{rmax:.235,trails:9,pool:.95,cond:.55,fogOp:.75}:{rmax:.3,trails:15,pool:2.6,cond:.6,fogOp:.2},Ht=Z==="Dry"?{g:18e-5,fog:.6,tau:5.5,nuc:.5,dens:.75}:Z==="Humid"?{g:45e-5,fog:.85,tau:3,nuc:1,dens:1}:Z==="Muggy"?{g:7e-4,fog:1,tau:2.2,nuc:1.4,dens:1.1}:{g:.0012,fog:1,tau:1.5,nuc:1.9,dens:1.15},go=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}`,Xe=`
float coneHit(vec3 o,vec3 d,float a,float b,float y0,float y1,float side){
 float A=d.x*d.x+d.z*d.z-b*b*d.y*d.y;float ra=a+b*o.y;
 float Bq=o.x*d.x+o.z*d.z-b*d.y*ra;float C=o.x*o.x+o.z*o.z-ra*ra;float D=Bq*Bq-A*C;float t=-1.;
 if(D>0.){float tt=(-Bq+side*sqrt(D))/A;float y=o.y+tt*d.y;if(tt>2e-4&&y>=y0&&y<=y1)t=tt;}
 return t;}
vec3 coneN(vec3 p,float a,float b){return normalize(vec3(p.x,-b*(a+b*p.y),p.z));}
float at2(float y,float x){float a=atan(abs(y)/max(abs(x),1e-6));a=x<0.?3.14159265-a:a;return y<0.?-a:a;}
float h12(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
`,Ce=`#version 300 es
precision highp float;precision highp sampler2D;
uniform sampler2D uN,uA,uE;uniform vec4 B[42];uniform vec4 X;out vec4 o_;
${Xe}
#define LD B[6].xyz
vec4 nzl(vec2 p,float l){return textureLod(uN,p,l);}
float LOD(float fp,float sc){return max(0.,log2(fp*256.*sc));}
float fres(float c,float f0){return f0+(1.-f0)*pow(clamp(1.-c,0.,1.),5.);}

`,bo=Ce+`
// the window opening, mullion and transom on the side wall, and leaves outside, at a point Q on that wall
float winMask(vec2 zy,float pen){
 float a=smoothstep(B[12].y-pen,B[12].y+pen,zy.x)*smoothstep(B[12].z+pen,B[12].z-pen,zy.x)*smoothstep(B[13].x-pen,B[13].x+pen,zy.y)*smoothstep(B[13].y+pen,B[13].y-pen,zy.y);
 a*=smoothstep(1.7-pen,1.7+pen,abs(zy.x-B[12].w));a*=smoothstep(1.3-pen,1.3+pen,abs(zy.y-B[13].z));
 return a;}
float sunAt(vec3 P,float bl){
 float t=(B[12].x-P.x)/LD.x;vec3 Q=P+LD*t;float pen=.25+t*.011+bl;
 float a=winMask(Q.zy,pen);
 float lv=nzl(Q.zy*.0045+vec2(.37,.11),1.5+log2(1.+pen)).g*.6+nzl(Q.zy*.011+vec2(.7,.2),1.+log2(1.+pen)).b*.4;
 a*=mix(1.,smoothstep(.36,.62,lv),B[13].w);
 return a;}
vec3 env(vec3 d){
 vec3 c=mix(vec3(.06,.05,.042),vec3(.20,.18,.155),smoothstep(-.4,.7,d.y))*B[8].rgb/vec3(.16,.135,.11);
 c+=B[7].rgb*.05*smoothstep(-.1,-.6,d.y);   // the sunlit table below
 float sd=sign(B[12].x);
 if(d.x*sd>0.){vec2 zy=vec2(d.z,d.y)/(d.x*sd)*abs(B[12].x);
  float m=winMask(zy,1.5);
  float lv=nzl(zy*.0045+vec2(.37,.11),1.).g*.6+nzl(zy*.011+vec2(.7,.2),.5).b*.4;
  vec3 sky=mix(vec3(1.5,1.65,1.85),vec3(2.2,2.1,1.9),smoothstep(0.,1.,d.y));
  vec3 lf=vec3(.12,.15,.07)*(1.+B[7].rgb*1.5*smoothstep(.55,.75,lv));
  vec3 out_=mix(sky,lf,smoothstep(.34,.6,lv)*B[13].w*1.3);
  c=mix(c,out_,m);
  c+=B[7].rgb*B[6].w*60.*pow(max(dot(d,LD),0.),3000.)*m;}
 // a second, softer window behind the camera
 vec3 fd=B[36].xyz;float fc=dot(d,fd);
 if(fc>0.){vec3 rr=normalize(cross(fd,vec3(0.,1.,0.))),uu=cross(rr,fd);vec3 pp=d/fc-fd;vec2 w=vec2(dot(pp,rr),dot(pp,uu));
  float m2=smoothstep(.36,.3,abs(w.x))*smoothstep(.62,.56,abs(w.y))*smoothstep(.006,.02,abs(w.x-.04))*smoothstep(.006,.02,abs(w.y+.1));
  c=mix(c,vec3(.95,.98,1.04)*B[36].w*(.85+.3*smoothstep(-.6,.6,w.y)),m2);}
 return c;}
// glass shadow and its caustic on the table
float glassShade(vec3 P){
 vec2 Lh=LD.xz;float lh=length(Lh);vec2 Ld=Lh/lh;vec2 w=P.xz;
 float tc=-dot(w,Ld);float res=1.;
 float yc=tc*LD.y/lh;float R=B[4].x+B[4].y*clamp(yc,0.,B[4].z);
 float b=w.x*Ld.y-w.y*Ld.x;float u=b/R;
 if(tc>0.&&yc<B[4].z&&abs(u)<1.){
  if(yc>B[5].x&&yc<B[5].y){
   float f=2.05*R;float m=1.-tc/f;float am=max(abs(m),.13);
   float b0=u/(sign(m)*am);
   res=.8*smoothstep(1.,.78,abs(b0))/am;
   res*=1.-.55*exp(-pow((1.-abs(u))/.06,2.));
   float ic=nzl(P.xz*.035+vec2(.1,.6),1.).g;
   res*=mix(1.,.45+1.1*ic,B[34].z*smoothstep(B[5].y-3.,B[5].y-.3,yc));
   res=mix(res,.5,B[34].w*.5);
  }else if(yc>=B[5].y){
   res=.82-.65*exp(-pow((1.-abs(u))/.05,2.))+.25*exp(-pow((1.-abs(u)-.08)/.03,2.));
   res*=1.-.5*smoothstep(B[4].z-.3,B[4].z,yc)*smoothstep(.8,1.,abs(u));
  }else{
   res=.38+.6*exp(-pow((abs(u)-.75)/.12,2.));
  }
 }
 return res;}
vec3 woodAlb(vec2 P,float fp,out float gls){
 float pw=B[9].y;float zz=P.y+pw*.37;float id=floor(zz/pw),fz=fract(zz/pw);
 float hs=h12(vec2(id,3.7)),hs2=h12(vec2(id,9.1));
 vec2 W=vec2(P.x*.01+hs*5.3,P.y*.01+hs2*2.9);
 float fpm=fp*.01;
 float wv=nzl(vec2(W.x*.17,W.y*.6),LOD(fpm,.6)).g,w2=nzl(vec2(W.x*.5+.3,W.y*2.1),LOD(fpm,2.1)).b;
 float ring=fract(W.y*B[9].z+wv*B[9].w+w2*1.4);
 float band=smoothstep(0.,.8,ring)*smoothstep(1.,.93,ring);
 float late=smoothstep(.55,.9,ring)*smoothstep(1.,.95,ring);
 float heart=nzl(vec2(W.x*.5,W.y*9.),LOD(fpm,9.)).r,drift=nzl(vec2(W.x*.3,W.y*2.6)+.17,LOD(fpm,2.6)).r;
 float fib=nzl(vec2(W.x*1.5,W.y*24.),LOD(fpm,24.)).r;
 float pore=smoothstep(.62,.86,nzl(vec2(W.x*3.,W.y*34.),LOD(fpm,34.)).a);
 float k=B[9].x;
 vec3 alb=mix(B[10].rgb,B[11].rgb,clamp(.55*late+.25*band+.3*heart*(1.-.5*step(2.5,k))+.25*drift-.2,0.,1.));
 alb*=(.8+.38*fib)*(1.-(k<.5?.32:.2)*pore*mix(1.,late+.3,step(.5,k)*step(k,1.5)));
 if(k<.5){float fl=smoothstep(.82,.9,nzl(vec2(W.x*1.1,W.y*40.)+.3,LOD(fpm,40.)).g)*smoothstep(.5,.8,nzl(vec2(W.x*.2,W.y*3.)+.6,LOD(fpm,3.)).b);alb*=1.+.35*fl;}
 alb*=.86+.28*hs+.1*(hs2-.5);
 float sd=min(fz,1.-fz)*pw;float sw=.07+fp*.7;
 alb*=1.-.8*smoothstep(sw,0.,sd)*min(1.,.07/max(fp,.07));
 alb*=1.+.14*smoothstep(.25+fp,0.,abs(sd-.12))*step(.06,sd);
 gls=.55+.45*fib;
 return alb;}
// a soft glossy lobe toward the window, for the table's satin finish (no texture work)
float winLobe(vec3 R){vec3 w=normalize(vec3(sign(B[12].x),.45,(B[12].y+B[12].z)*.5/abs(B[12].x)));return pow(max(dot(R,w),0.),6.)*smoothstep(-.1,.3,R.y);}
vec3 table(vec3 P,vec3 rd,float fp,float bl){
 float gls;vec3 alb=woodAlb(P.xz,fp*(1.+bl),gls);
 // old dried rings
 // a water mark: a band a few mm wide, broken, heavier on one side; cloudy pale on dark wood, grey-brown on pale wood
 for(int k=0;k<int(B[17].y);k++){vec4 rg=B[15+k];vec2 dv=P.xz-rg.xy;float r=length(dv);vec2 u=dv/max(r,.01);
  float ln=nzl(u*.035+vec2(.13+float(k)*.21,.57),0.).g,l2=nzl(u*.11+vec2(.71,.3+float(k)*.17),0.).b;
  float rr=rg.z*(1.+.035*(ln-.5)+.025*(l2-.5));
  float side=.55+.45*dot(u,normalize(vec2(.6,-.8)+rg.xy*.01));
  float bw=.1+.11*ln*side;
  float on=smoothstep(.3,.45,l2+.3*side-.1)*rg.w;
  float band=exp(-pow((r-rr)/(bw+fp),2.))*on,edge=exp(-pow((r-rr-bw*.8)/(.02+fp),2.))*on;
  float dk=smoothstep(.24,.08,dot(alb,vec3(.33)));
  alb=mix(alb,mix(alb*.68,alb*.88+vec3(.035,.032,.03),dk),band*.9);
  alb*=1.-.22*edge*(1.-dk);alb+=.025*edge*dk;
  alb*=1.-.05*smoothstep(rr+.1,rr-.6,r)*ln*rg.w;}
 float r=length(P.xz);float g0=max(r-B[4].x,0.);
 float ao=1.-.5*exp(-g0/.3)-.2*exp(-g0/2.2);
 float sa=sunAt(P,bl);
 float sun=sa*glassShade(P)*max(LD.y,0.);
 float eb=smoothstep(.6+fp*3.,0.,P.z+B[14].x);
 vec3 col=alb*(B[7].rgb*B[6].w*sun+B[8].rgb*ao*(1.+.6*eb));
 vec3 R=reflect(rd,vec3(0.,1.,0.));float F=fres(max(-rd.y,0.),.035);
 col+=B[7].rgb*(.25+B[6].w*.12*sa)*winLobe(R)*F*gls*ao;
 col+=B[7].rgb*B[6].w*.06*eb*sa;
 // under the glass's thick foot: seen through it, wet at the contact
 float ug=smoothstep(B[4].x+.02,B[4].x-.05,r);
 col=mix(col,alb*(B[8].rgb*.7+B[7].rgb*B[6].w*.12*max(LD.y,0.))*vec3(.78,.86,.8)+B[7].rgb*B[6].w*.12*exp(-pow((r-B[4].x*.85)/.2,2.)),ug);
 return col;}
vec3 wall(vec3 Q,float fp){
 vec3 alb=vec3(.56,.5,.42)*(.9+.12*nzl(Q.xy*.02,2.).g+.06*nzl(Q.xy*.2,LOD(fp,.2)).b);
 float sd=sign(B[12].x);
 float g=.55+.45*smoothstep(-90.,60.,-sd*Q.x)+.5*exp(-max(Q.y,0.)/30.);
 return alb*B[8].rgb*g*1.25;}
vec3 bg(vec3 o,vec3 d,float fp,float bl,out float dep){
 vec3 col;dep=200.;
 float tT=d.y<0.?-o.y/d.y:1e9;vec3 P=o+d*tT;
 if(d.y<0.&&P.z>-B[14].x){col=table(P,d,fp*tT,bl);dep=tT;}
 else if(d.z<0.){float tw=(-B[14].y-o.z)/d.z;vec3 Q=o+d*tw;dep=tw;
  col=wall(Q,fp*tw);
  if(Q.y<0.)col*=.35;
 }else col=env(d);
 return col;}
`+`
void main(){
 vec2 q=gl_FragCoord.xy/X.x;vec3 ro,rd;float fp,bl=0.;
 if(X.z>.5){
  vec2 p=q*2.-1.;vec3 d=vec3(p.x,1.-abs(p.x)-abs(p.y),p.y);
  if(d.y<0.)d.xz=(1.-abs(d.zx))*vec2(d.x>=0.?1.:-1.,d.z>=0.?1.:-1.);
  rd=normalize(d);ro=vec3(0.,B[5].y*.5,0.);fp=.012;bl=.8;
 }else{vec2 ndc=q*2.-1.;ro=B[0].xyz;rd=normalize(B[3].xyz+(ndc.x*B[1].xyz+ndc.y*B[2].xyz)*B[0].w);fp=2.*B[0].w/X.x;}
 float dd;vec3 col=bg(ro,rd,fp,bl,dd);
 if(X.y>.5)o_=vec4(sqrt(col/(1.+col)),1.);else o_=vec4(min(col,vec3(60.)),dd);
}`,yo=Ce+`
// a cheap analytic room for reflections inside the glass
vec3 envC(vec3 d){
 vec3 c=mix(vec3(.06,.05,.042),vec3(.20,.18,.155),smoothstep(-.4,.7,d.y))*B[8].rgb/vec3(.16,.135,.11);
 vec3 w=normalize(vec3(sign(B[12].x),.45,(B[12].y+B[12].z)*.5/abs(B[12].x)));
 c+=vec3(1.7,1.75,1.8)*smoothstep(.8,.93,dot(d,w));
 c+=vec3(.95,.98,1.04)*B[36].w*smoothstep(.88,.95,dot(d,B[36].xyz));
 return c;}
// ice: rounded boxes in their own frames
// ray onto a rounded box (half size b of the flat core, corner radius ra), from outside: analytic, no march
float rbI(vec3 ro,vec3 rd,vec3 b,float ra){
 vec3 m=1./rd,n=m*ro,kk=abs(m)*(b+ra),t1=-n-kk,t2=-n+kk;
 float tN=max(max(t1.x,t1.y),t1.z),tF=min(min(t2.x,t2.y),t2.z),res=-1.;
 if(tN<=tF&&tF>=0.){
  vec3 pos=ro+tN*rd;vec3 sg=vec3(pos.x<0.?-1.:1.,pos.y<0.?-1.:1.,pos.z<0.?-1.:1.);
  ro*=sg;rd*=sg;pos*=sg;pos-=b;pos=max(pos.xyz,pos.yzx);
  if(min(min(pos.x,pos.y),pos.z)<0.)res=tN;
  else{
   vec3 oc=ro-b,dd=rd*rd,oo=oc*oc,od=oc*rd;float r2=ra*ra,t=1e20;
   {float bb=od.x+od.y+od.z,c=oo.x+oo.y+oo.z-r2,h=bb*bb-c;if(h>0.)t=-bb-sqrt(h);}
   for(int e=0;e<int(B[17].z);e++){vec3 sel=vec3(e==0?0.:1.,e==1?0.:1.,e==2?0.:1.);
    float a=dot(dd,sel),bb=dot(od,sel),c=dot(oo,sel)-r2,h=bb*bb-a*c;
    if(h>0.){h=(-bb-sqrt(h))/a;float ax=dot(ro+rd*h,vec3(1.)-sel),bx=dot(b,vec3(1.)-sel);if(h>0.&&h<t&&abs(ax)<bx)t=h;}}
   res=t>1e19?-1.:t;}}
 return res;}
// onto ice k along d: in from outside (sg=1), or out from inside (sg=-1: in from beyond the far side, backwards)
float iceMarch(int k,vec3 o,vec3 d,float sg){
 vec4 c0=B[18+k*4];vec3 r0=B[19+k*4].xyz,r1=B[20+k*4].xyz,r2=B[21+k*4].xyz;
 vec3 he=vec3(B[19+k*4].w,B[20+k*4].w,B[21+k*4].w);
 vec3 q=o-c0.xyz,lo=vec3(dot(q,r0),dot(q,r1),dot(q,r2)),ld=vec3(dot(d,r0),dot(d,r1),dot(d,r2));
 float T=sg>0.?0.:2.*length(he)+.2;
 float th=rbI(lo+ld*T,ld*sg,he-c0.w,c0.w);
 float t=th<0.?-1.:(sg>0.?th:max(T-th,.01));
 return sg>0.&&t<1e-3?-1.:t;}
vec3 nI(int k,vec3 p){vec4 c0=B[18+k*4];vec3 r0=B[19+k*4].xyz,r1=B[20+k*4].xyz,r2=B[21+k*4].xyz;vec3 q=p-c0.xyz;q=vec3(dot(q,r0),dot(q,r1),dot(q,r2));
 vec3 he=vec3(B[19+k*4].w,B[20+k*4].w,B[21+k*4].w);vec3 a=abs(q)-he+c0.w;vec3 m=max(a,0.);
 vec3 nl=dot(m,m)>1e-8?sign(q)*m:sign(q)*step(max(a.x,max(a.y,a.z))-.0001,a);
 nl=normalize(nl);return normalize(nl.x*r0+nl.y*r1+nl.z*r2);}
float coreLen(int k,vec3 o,vec3 d,float tl){
 vec4 c0=B[18+k*4];vec3 q=o-c0.xyz;vec3 lo=vec3(dot(q,B[19+k*4].xyz),dot(q,B[20+k*4].xyz),dot(q,B[21+k*4].xyz));
 vec3 ld=vec3(dot(d,B[19+k*4].xyz),dot(d,B[20+k*4].xyz),dot(d,B[21+k*4].xyz));
 vec3 he=vec3(B[19+k*4].w,B[20+k*4].w,B[21+k*4].w)*vec3(.36,.5,.36);
 vec3 inv=1./ld;vec3 t0=(-he-lo)*inv,t1=(he-lo)*inv;vec3 mn=min(t0,t1),mx=max(t0,t1);
 float a=max(max(mn.x,mn.y),max(mn.z,0.)),b=min(min(mx.x,mx.y),min(mx.z,tl));
 return max(b-a,0.);}
vec3 sA(vec2 uv){vec4 e=textureLod(uA,uv,0.);if(X.y>.5){vec3 y=e.rgb*e.rgb;return y/max(1.-y,.002);}return e.rgb;}
vec3 sE(vec3 d){d/=abs(d.x)+abs(d.y)+abs(d.z);vec2 p=d.xz;if(d.y<0.)p=(1.-abs(p.yx))*vec2(p.x>=0.?1.:-1.,p.y>=0.?1.:-1.);vec4 e=textureLod(uE,p*.5+.5,0.);if(X.y>.5){vec3 y=e.rgb*e.rgb;return y/max(1.-y,.002);}return e.rgb;}
// where a ray leaving the glass meets the room: the wall always from the room as seen from the glass (the octahedral map,
// along the line from its eye point), the table from the camera's picture where it holds it
vec3 bgL(vec3 o,vec3 d){
 vec3 C=vec3(0.,B[5].y*.5,0.);float k=1.,wl=0.;
 float tT=d.y<0.?-o.y/d.y:-1.;vec3 P=o+d*tT;
 if(tT<0.||P.z<-B[14].x){wl=1.;tT=d.z<0.?(-B[14].y-o.z)/d.z:-1.;P=o+d*tT;if(tT>0.&&P.y<0.)k=.35;P.y=max(P.y,3.);}
 vec3 r=sE(tT>0.?P-C:d)*k;
 if(tT>0.&&wl<.5){vec3 v=P-B[0].xyz;float z=dot(v,B[3].xyz);
  vec2 sp=vec2(dot(v,B[1].xyz),dot(v,B[2].xyz))/(max(z,1e-3)*B[0].w);float m=max(abs(sp.x),abs(sp.y));
  if(z>0.&&m<.998)r=mix(sA(sp*.5+.5),r,smoothstep(.85,.998,m));}
 return r;}
void main(){
 vec2 q=gl_FragCoord.xy/X.x;vec2 ndc=q*2.-1.;
 vec3 ro=B[0].xyz,rd=normalize(B[3].xyz+(ndc.x*B[1].xyz+ndc.y*B[2].xyz)*B[0].w);
 float fp=2.*B[0].w/X.x;
 float a=B[4].x,kk=B[4].y,H=B[4].z,tw=B[4].w,bt=B[5].x,hW=B[5].y;
 float a_in=a-tw;int nI_=int(B[17].x);
 float tO=coneHit(ro,rd,a,kk,0.,H,-1.);
 float tTop=rd.y<0.?(H-ro.y)/rd.y:-1.;vec3 pT=ro+rd*tTop;float rT=length(pT.xz);
 float rOH=a+kk*H;
 vec3 acc=vec3(0.),thr=vec3(1.),o=ro,d=rd,eD=vec3(0.,1.,0.),eW=vec3(0.),fD=vec3(0.,1.,0.),fW=vec3(0.),o0=ro;
 int mode=1;float inW=0.,bl=0.,dep=-1.,fpd=fp,cnd=0.,sp=0.;
 if(tTop>0.&&rT<rOH&&(tO<0.||tTop<tO)){
  dep=tTop;fpd=fp*tTop;o=pT;o0=pT;
  if(rT>rOH-tw){
   float u=(rT-(rOH-tw*.5))/(tw*.5);vec3 n=normalize(vec3(0.,1.,0.)*sqrt(max(1.-u*u,0.))+vec3(pT.x,0.,pT.z)/rT*u);
   float F=fres(max(dot(-rd,n),0.),.04);fD=reflect(rd,n);fW=vec3(F);thr=vec3((1.-F)*.75);bl=.5;
   acc+=B[7].rgb*B[6].w*.25*pow(max(dot(fD,LD),0.),30.);
  }else mode=0;
 }else if(tO>0.){
  dep=tO;fpd=fp*tO;vec3 p=ro+rd*tO;vec3 n=coneN(p,a,kk);
  float c1=max(dot(-rd,n),0.);float F=fres(c1,.04);
  fD=reflect(rd,n);fW=vec3(F);thr=vec3(1.-F);o0=p;
  vec3 dg=refract(rd,n,1./1.5);
  if(p.y<bt){o=p;d=dg;bl=.6;thr*=mix(vec3(1.),vec3(.8,.9,.86),smoothstep(.6,.1,c1));}
  else{
   float ti=coneHit(p,dg,a_in,kk,bt,H,-1.);
   if(ti<0.){
    float te=coneHit(p,dg,a,kk,0.,H,1.);vec3 p2=p+dg*max(te,0.);vec3 n2=coneN(p2,a,kk);
    vec3 dO=refract(dg,-n2,1.5);if(dot(dO,dO)<.5)dO=reflect(dg,-n2);
    o=p2;d=dO;bl=1.;thr*=vec3(.62,.74,.68);
   }else{
    vec3 p1=p+dg*ti;vec3 n1=coneN(p1,a_in,kk);
    inW=step(p1.y,hW);float nm=inW>.5?1.333:1.;
    vec3 d1=refract(dg,n1,1.5/nm);
    o=p1+d1*.002;d=d1;mode=0;thr*=exp(-ti*vec3(.12,.05,.09));
    float ml=p1.y-hW;
    thr*=1.-.5*exp(-pow((ml+.03)/.03,2.));acc+=B[8].rgb*1.6*exp(-pow((ml-.02)/.025,2.));
   }
  }
 }
 if(mode==0){
  int NIT=int(X.z);int inI=-1;
  for(int it=0;it<NIT;it++){if(mode==0){
   acc+=eW*envC(eD);eW=vec3(0.);
   float tWl=coneHit(o,d,a_in,kk,bt-.5,H+.5,1.);if(tWl<0.)tWl=1e9;
   float tWs=abs(d.y)>1e-5?(hW-o.y)/d.y:-1.;if(tWs<2e-4)tWs=1e9;
   float tB=d.y<0.?(bt-o.y)/d.y:1e9;float tT=d.y>0.?(H-o.y)/d.y:1e9;
   float tI=1e9;int ki=-1;
   for(int k=0;k<nI_;k++){if(inI<0||k==inI){float t=iceMarch(k,o,d,inI<0?1.:-1.);if(t>0.&&t<tI){tI=t;ki=k;}}}
   if(inI>=0&&ki<0){tI=.01;ki=inI;}
   float tm=inI>=0?tI:min(min(tWl,tWs),min(min(tB,tT),tI));
   vec3 p=o+d*tm;float nm=inW>.5?1.333:1.;
   if(tm>1e8||tm==tT){mode=1;}
   else if(ki>=0&&tm==tI){
    // one path for in and out: the cloudy core is collected on the way out
    vec3 n=nI(ki,p);bool ent=inI<0;
    float above=step(hW,p.y);
    vec3 nb=normalize(n+above*.1*(vec3(nzl(p.xz*.5,0.).g,nzl(p.yz*.5,0.).b,nzl(p.xy*.5,0.).g)-.5));
    if(!ent){
     float cl=coreLen(ki,o,d,tm);
     float cn=nzl(o.xz*.6+o.y*.3,0.).g;
     float op=(1.-exp(-cl*.6*B[34].z*(.25+cn)))*smoothstep(0.,.4,cl);
     vec3 glow=(B[8].rgb*1.25+B[7].rgb*B[6].w*.12)*vec3(.95,.97,1.);
     acc+=thr*op*glow;thr*=1.-op*.85;
     float bub=smoothstep(.9,.99,nzl((o.xz+o.y*.7)*.35,0.).r)*smoothstep(.2,.8,cl);
     acc+=thr*bub*glow*.4;
    }
    vec3 nn=ent?nb:-n;float eta=ent?nm/1.31:1.31/(above>.5?1.:1.333);
    float F=fres(max(dot(-d,nn),0.),above>.5?.018:.012)*(ent?1.:0.);
    eD=reflect(d,nn);eW=thr*F*(above>.5?1.:.6);thr*=1.-F;
    vec3 dr=refract(d,nn,eta);if(dot(dr,dr)<.5)dr=reflect(d,nn);
    o=ent?p:p+dr*.003;d=dr;inW=ent?inW:1.-above;inI=ent?ki:-1;
   }else if(tm==tWs){
    float rr=length(p.xz);float rw=a_in+kk*hW;float m=clamp(1.-(rw-rr)/.35,0.,1.);
    vec3 n=normalize(vec3((nzl(p.xz*.15,0.).g-.5)*.05,1.,(nzl(p.xz*.15+.4,0.).b-.5)*.05)-vec3(p.x,0.,p.z)/max(rr,.01)*m*m*1.6);
    if(inW>.5){
     vec3 t=refract(d,-n,1.333);
     if(dot(t,t)<.5){d=reflect(d,-n);o=p+d*.002;}
     else{float F=fres(dot(t,n),.02);thr*=1.-F;d=t;o=p+d*.002;inW=0.;}
    }else{
     float F=fres(max(dot(-d,n),0.),.02);eD=reflect(d,n);eW=thr*F;thr*=1.-F;
     d=refract(d,n,1./1.333);o=p+d*.002;inW=1.;
    }
   }else if(tm==tB){d=refract(d,vec3(0.,1.,0.),nm/1.5);o=p;bl=.6;mode=1;}
   else{
    vec3 n=coneN(p,a_in,kk);
    vec3 dO=refract(d,-n,nm);
    if(dot(dO,dO)<.5){d=reflect(d,-n);o=p+d*.002;}
    else{
     float F=fres(dot(dO,n),.04);thr*=(1.-F)*mix(vec3(1.),vec3(.86,.92,.89),.35);
     o=p+n*tw;d=dO;bl=1.4;mode=1;
     cnd=smoothstep(B[35].y,B[35].y-.6,p.y)*B[35].x;
     float u_=dot(p.xz,B[1].xz);sp=nzl(vec2(u_*.136,p.y*.15),0.).r;
     float bub=smoothstep(.975,.995,nzl(vec2(u_,p.y)*.09,0.).r)*step(p.y,hW-.2)*B[35].z;
     acc+=thr*bub*(B[8].rgb+B[7].rgb*.4)*1.5;
    }
   }
  }}
  if(mode==0){thr*=.4;}
  acc+=eW*envC(eD);
 }
 // the room: the pending reflection, then where the ray ends (the room pass itself where the glass was missed)
 vec3 col=acc+fW*bgL(o0,fD);
 vec4 a0=textureLod(uA,q,0.);
 vec3 bc=dep<0.?sA(q):bgL(o,d);if(dep<0.)dep=a0.a;
 bc=mix(bc,bc*(.75+.5*sp)+B[8].rgb*.2,cnd*.55);col+=thr*bc;
 if(X.y>.5)o_=vec4(sqrt(col/(1.+col)),1.);else o_=vec4(min(col,vec3(60.)),dep);
}`,wo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;uniform sampler2D uA;uniform vec4 X;out vec4 o;
uniform vec4 F;float coc(float d){return min(X.z*abs(d-F.x)/max(d,1.),X.w);}
void main(){
 vec2 uv=gl_FragCoord.xy/X.x;vec4 c0=texture(uA,uv);float d0=c0.a,r0=coc(d0);
 vec3 acc=c0.rgb;float ws=1.;
 float rot=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))))*6.2831853;
 float RG=max(r0,X.w*.33),soft=1./(.12*RG+.0006);
 int NT=int(X.y);for(int i=0;i<NT;i++){float fi=float(i)+.5,rr=sqrt(fi/float(NT))*RG,a=fi*2.39996+rot;
  vec4 s=texture(uA,uv+vec2(cos(a),sin(a))*rr);vec3 sc=min(s.rgb,vec3(12.));
  float d=s.a,rs=coc(d),reach=d>d0?min(rs,r0):rs;float w=clamp((reach-rr)*soft+.5,0.,1.);
  acc+=sc*w;ws+=w;}
 vec3 c=acc/ws;o=vec4(sqrt(c/(1.+c)),1.);
}`,To=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
layout(location=0) in vec4 aA;layout(location=1) in vec4 aB;
uniform vec4 W;out vec2 vL;out vec4 vA;out vec4 vBb;
void main(){
 vec2 cr=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;
 float r=aA.z,e=aB.x;float ext=r*(1.65+3.2*e)+W.z*1.5;
 vec2 off=cr*ext;vL=off;vA=aA;vBb=aB;
 vec2 P=aA.xy+off;
 gl_Position=vec4(P.x/W.x*2.,P.y/W.y*2.-1.,0.,1.);
 if(r<=0.)gl_Position=vec4(2.,2.,2.,1.);
}`,zo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;in vec2 vL;in vec4 vA;in vec4 vBb;uniform vec4 W,W2;out vec4 o;
void main(){
 float r=vA.z,e=vBb.x,an=vBb.y;
 float ca=cos(an),sa=sin(an);
 vec2 l=vec2(ca*vL.x+sa*vL.y,-sa*vL.x+ca*vL.y);   // l.y along the drop's long axis (a runner's head toward -y)
 float ph=atan(abs(l.y)/max(abs(l.x),1e-6));ph=l.x<0.?3.14159265-ph:ph;ph=l.y<0.?-ph:ph;
 float irr=1.+(vBb.z+W2.x*sin(W2.y+vBb.w*5.))*(.6*cos(2.*(ph-vBb.w))+.4*cos(3.*(ph-1.7*vBb.w))+.25*cos(5.*ph+vBb.w*3.));
 float d,d2=9.,nu=0.;
 float sa_=.79,ca_=.62;   // contact angle about 52 degrees
 if(vA.w>.5){
  // a runner: a rounded head, a little wider than long, and behind it a straight-sided neck of water that ends
  // square in its wet stripe (no taper, no point)
  float Lt=r*(.9+1.7*e);float ly=-l.y;
  d=length(vec2(l.x*.93,max(ly,0.)*(1.12+.1*e)+min(ly,0.)*.9))/r;
  nu=clamp(-ly/Lt,0.,1.);vec2 nk=vec2(abs(l.x)/(r*(.42+.06*sin(vBb.w))),max(max(-ly/Lt-.4,0.)/.6,3.*ly/r));
  d2=pow(pow(nk.x,3.)+pow(nk.y,3.),1./3.);
 }else{
  // a bead on an upright wall sags: thin and nearly flat across the top, wider and fuller below
  vec2 g=vL;float sg=.32*smoothstep(.035,.2,r);
  g.y*=g.y>0.?1.+sg*(1.+.6*g.y/r):1.-.28*sg;
  g=vec2(ca*g.x+sa*g.y,-sa*g.x+ca*g.y);
  vec2 m=vec2(g.x*(1.-.5*e),g.y*(1.+e));
  d=length(m)/r*irr;
 }
 float z=d<1.?(sqrt(1.-d*d*sa_*sa_)-ca_)/(1.-ca_):0.;
 float z2=d2<1.?.3*(sqrt(1.-d2*d2*sa_*sa_)-ca_)/(1.-ca_)*(1.-.65*nu):0.;
 z=max(z,z2)+.25*z*z2;
 z*=r*.48/W.w;
 float dd=min(d,d2);
 float aa=W.z/r;
 float cov=max(smoothstep(1.,1.-aa*1.2,d),smoothstep(1.,1.-aa*1.2,d2)*(1.-.7*nu));
 // the fog cleared round each bead: its width varies bead to bead, so no two moats match
 float halo=smoothstep(1.15+.4*fract(vBb.w*2.37),1.,dd)*smoothstep(.015,.05,r);
 o=vec4(z,halo,cov,1.);
}`,Mo=`#version 300 es
precision highp float;precision highp sampler2D;
uniform sampler2D uS,uD,uF,uN;uniform vec4 V[36];out vec4 o;
${Xe}
vec3 dec(vec4 e){vec3 y=e.rgb*e.rgb;return y/max(1.-y,.002);}
vec3 SC(vec2 q,float l){return dec(textureLod(uS,q,l));}
void main(){
 float S=V[0].x;vec2 q=gl_FragCoord.xy/S;
 vec3 col=SC(q,0.);
 vec2 ndc=q*2.-1.;
 vec3 ro=V[1].xyz,rd=normalize(V[4].xyz+(ndc.x*V[2].xyz+ndc.y*V[3].xyz)*V[1].w);
 float a=V[5].x,kk=V[5].y,H=V[5].z;
 vec3 L=V[7].xyz;vec3 sunC=V[8].rgb*V[7].w;
 float t=coneHit(ro,rd,a,kk,0.,H,-1.);
 vec4 gr=texture(uN,gl_FragCoord.xy/256.+vec2(.713,.371));
 if(t>0.){
  vec3 p=ro+rd*t;
  vec2 cd_=vec2(sin(V[6].w),cos(V[6].w));float th=atan(dot(p.xz,vec2(cd_.y,-cd_.x))/max(dot(p.xz,cd_),1e-4));
  float s=th*V[6].z;vec2 uv=vec2(s/V[0].z+.5,p.y/V[0].w);
  vec3 ng=coneN(p,a,kk);
  if(uv.y<1.&&abs(uv.x-.5)<.5){
   vec2 tx=V[9].xy;
   vec4 dc=texture(uD,uv);
   float hx=texture(uD,uv+vec2(tx.x,0.)).r-texture(uD,uv-vec2(tx.x,0.)).r;
   float hy=texture(uD,uv+vec2(0.,tx.y)).r-texture(uD,uv-vec2(0.,tx.y)).r;
   vec2 sl=vec2(hx*V[9].w/(2.*tx.x*V[0].z),hy*V[9].w/(2.*tx.y*V[0].w));
   vec3 ts=normalize(vec3(p.z,0.,-p.x));vec3 tv=normalize(cross(ng,ts));
   vec3 nd=normalize(ng-ts*sl.x-tv*sl.y);
   float cov=dc.b;
   // fog: a skin of droplets too small to see, a diffusing veil: what is behind shows through it soft and paled
   vec2 fx_=vec2(V[9].z,V[9].z*V[0].z/V[0].w);
   float fgv=(texture(uF,uv).r*2.+texture(uF,uv+vec2(fx_.x,fx_.y*.5)).r+texture(uF,uv-vec2(fx_.x,fx_.y*.5)).r+texture(uF,uv+vec2(-fx_.x*.5,fx_.y)).r+texture(uF,uv-vec2(-fx_.x*.5,fx_.y)).r)/6.;
   vec4 fn=texture(uN,uv*vec2(V[0].z,V[0].w)*V[28].x);
   float fl=texture(uN,uv*vec2(V[0].z,V[0].w)*.012+.3).g;
   float tn=texture(uN,vec2(uv.x*V[0].z*.06,p.y*.05)+.61).g*.7+texture(uN,vec2(uv.x*V[0].z*.2,p.y*.2)+.17).b*.3;
   float top=V[14].w+.2+.6*(tn-.5);
   // close up (V[28].y) the fog is droplets you can nearly count: a stipple with dark glass between them, and a
   // track's side goes from fog to clear at once, ragged at droplet size; a track that fogged again is a thinner frost
   float cdv=clamp((V[14].w+.45-p.y)/.6,0.,1.),fz=fgv/max(cdv,.02)+.25*(fn.r-.5);
   float fgc=smoothstep(.1,.17,fz)*min(fz*1.2,.5+.5*smoothstep(.62,.72,fz))*cdv*(1.+.6*(smoothstep(.25,.75,fn.r)-.5)*(.55+.45*smoothstep(.55,.9,fz)));
   float fg=mix(fgv,fgc,V[28].y)*(1.-V[28].w*dc.g)*V[10].x*(.85+.25*fn.r+.3*(fl-.5));
   fg*=smoothstep(top+.3,top-.45,p.y)*mix(.5,1.,smoothstep(V[6].y-.3,V[6].y+.6,p.y));
   // a warm fingertip's clear patch
   vec2 dw=(uv-V[11].xy)*vec2(V[0].z,V[0].w);fg*=smoothstep(V[11].z*.7,V[11].z+.15,length(dw))*(V[11].z>0.?1.:0.)+(V[11].z>0.?0.:1.);
   float lit=clamp(dot(ng,L)*1.6+.35,0.,1.);
   vec3 fogC=SC(q,3.2)*.6+V[12].rgb*(2.2+1.2*lit)+sunC*.11*lit+sunC*.07*pow(max(dot(rd,L),0.),3.);
   fogC*=.93+.14*fn.g;
   fogC+=sunC*.5*lit*smoothstep(.985,1.,fn.a)*V[11].w;
   col=mix(col,fogC,clamp(fg,0.,1.)*V[10].y);
   // beads: tiny lenses
   if(cov>.001){
    vec3 rt=refract(rd,nd,1./1.333),rf0=refract(rd,ng,1./1.333);
    vec3 dv=rt-rf0;
    // a bead is a short lens: what lies behind it shows small and upside down (the table along its top, the pale
    // wall along its bottom), looked up on the glass only
    vec2 off=vec2(dot(dv,V[2].xyz)*2.,dot(dv,V[3].xyz)*3.5)*V[10].z;
    off=clamp(q+off,V[29].xy,V[29].zw)-q;
    float sl2=dot(sl,sl);
    vec3 thru=SC(q+off,1.2+1.5*smoothstep(.05,.6,sl2));
    // a little darker only in its outer fifth, with a dark hairline just inside the upper edge
    // the lens takes in a wide field, the lit room and window beyond the frosted wall: on average as light as the fog
    thru=mix(thru,fogC*1.05,V[28].z);
    thru*=1.-.3*smoothstep(.7,1.3,sl2)-.3*smoothstep(1.,1.5,sl2)*smoothstep(.1,.6,-sl.y/max(length(sl),1e-3));
    float c1=max(dot(-rd,nd),0.);float F=.02+.98*pow(1.-c1,5.);
    vec3 R=reflect(rd,nd);
    vec3 room=mix(V[12].rgb*.6,V[12].rgb*1.6,smoothstep(-.3,.6,R.y));
    // the catchlight: the window, with its bar, small and sharp on the window side
    vec3 wx=normalize(vec3(V[13].z,0.,-V[13].x)),wy=cross(wx,V[13].xyz);float wc=max(dot(R,V[13].xyz),1e-3);
    vec2 wa=vec2(dot(R,wx),dot(R,wy))/wc;
    float wv=smoothstep(.13,.1,abs(wa.x))*smoothstep(.18,.14,abs(wa.y))*step(0.,dot(R,V[13].xyz))
     *(1.-.85*smoothstep(.016,.008,abs(wa.x-.02)))*(1.-.85*smoothstep(.014,.007,abs(wa.y-.05)));
    vec3 dcol=thru*(1.-F)+F*room+V[14].rgb*wv*(.3+.7*F)*V[10].w;
    // the light the bead focuses: a bright crescent on its far side from the window
    vec2 l2=normalize(vec2(dot(V[13].xyz,ts),V[13].y));
    float cr=smoothstep(.3,.9,dot(sl,l2)/max(length(sl),1e-3))*smoothstep(.15,.7,sl2)*(1.-smoothstep(.9,1.4,sl2));
    dcol+=V[14].rgb*.05*cr+V[12].rgb*.6*cr;
    // the sun itself in a bead, where the outside of the glass is in sun
    float glint=pow(max(dot(R,L),0.),900.)*step(0.,dot(nd,L));
    dcol+=sunC*glint*30.*V[11].w;
    // light through the bead from the sunlit glass behind it
    dcol+=sunC*.35*pow(max(dot(rt,L),0.),24.)*V[11].w*smoothstep(-.2,.3,-dot(ng,L));
    col=mix(col,dcol,cov);
   }
   // the wet foot: water gathers where the glass meets the wood
   float ft=smoothstep(.22,.0,p.y)*V[10].x;
   col=mix(col,col*.75+SC(q+vec2(0.,.004),2.)*.35,ft*.6);
   col+=V[12].rgb*.5*exp(-pow((p.y-.05)/.035,2.))*V[10].x;
  }
 }else if(rd.y<0.){
  float tt=-ro.y/rd.y;vec3 P=ro+rd*tt;
  if(P.z>-V[6].x){
   float r=length(P.xz);
   if(r<V[5].x+4.5){
    float ph=at2(P.x,P.z);float bi=(ph/6.2831853+.5)*48.-.5;
    float i0=floor(bi),fr=bi-i0;int jm=int(mod(i0-1.,48.)),j0=int(mod(i0,48.)),j1=int(mod(i0+1.,48.)),j2=int(mod(i0+2.,48.));
    float wm=V[16+jm/4][jm%4],w0=V[16+j0/4][j0%4],w1=V[16+j1/4][j1%4],w2=V[16+j2/4][j2%4];
    float w=max(w0+.5*fr*(w1-wm+fr*(2.*wm-5.*w0+4.*w1-w2+fr*(3.*(w0-w1)+w2-wm))),0.);
    float pp=ph+V[6].w;float en=.5+.22*sin(3.*pp+1.3)+.14*sin(5.*pp+4.1)+.08*sin(9.*pp+2.2)+.05*sin(16.*pp+.7)+.03*sin(29.*pp+5.);
    float re=V[5].x+.04+w*(.7+.6*en);
    re+=w*.25*(abs(P.x)/max(r,.01));   // wicks a little along the grain
    float wet=smoothstep(re+.015,re-.05,r)*step(.005,w)*.85;
    if(wet>0.){
     vec3 wc=col*vec3(.42,.37,.33);
     // a thin sheet of water: mirror of the glass foot, the window across it
     float cx=(q.x-V[15].x)/V[15].z;float yb=V[15].y-V[15].w*sqrt(max(1.-cx*cx,0.));
     vec2 qm=vec2(q.x,2.*yb-q.y);
     vec3 mir=SC(qm,1.);
     float F=.02+.98*pow(1.-abs(rd.y),5.);
     wc=mix(wc,mir*.9,min(1.,F*1.1));
     float ed=exp(-pow((r-re+.03)/.03,2.));
     wc*=1.-.35*ed;wc+=sunC*.025*V[11].w*smoothstep(.2,.8,dot(normalize(P.xz),normalize(L.xz)))*exp(-pow((r-re+.075)/.03,2.));
     wc*=1.-.12*exp(-pow((r-re+.08)/.05,2.));
     wc+=(V[12].rgb*.8+sunC*.004)*(.4+en)*exp(-pow((r-re+.015)/.02,2.));
     col=mix(col,wc,wet);
    }
    // the dark fillet line right at the foot
    col*=1.-.4*exp(-pow((r-V[5].x)/.05,2.))*(1.-wet*.5);
   }
  }
 }
 col*=V[0].w*0.+V[13].w;
 vec2 vg=q-.5;col*=1.-.06*dot(vg,vg);
 col=col*(2.51*col+.03)/(col*(2.43*col+.59)+.14);
 col=pow(clamp(col,0.,1.),vec3(1./2.2));
 col+=(gr.a-.5)*.012;
 o=vec4(col,1.);
}`;let f=t.__c446;if(!f){f=t.__c446={},t.getExtension("KHR_parallel_shader_compile");const e=(d,x)=>{const p=t.createShader(d);return t.shaderSource(p,x),t.compileShader(p),p},o=e(t.VERTEX_SHADER,go),a=e(t.VERTEX_SHADER,To),n=(d,x)=>{const p=t.createProgram(),M=e(t.FRAGMENT_SHADER,x);return t.attachShader(p,d),t.attachShader(p,M),t.linkProgram(p),{p,f:M,vs:d}},s={scA:n(o,bo),sc:n(o,yo),dof:n(o,wo),drop:n(a,zo),comp:n(o,Mo)};t.flush(),f.ps=s,f.vao=t.createVertexArray(),f.f16=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float");const r=256,h=new Uint8Array(r*r*4);let m=4484415;const w=()=>{m=m+1831565813|0;let d=Math.imul(m^m>>>15,1|m);return d=d+Math.imul(d^d>>>7,61|d)^d,((d^d>>>14)>>>0)/4294967296},i=d=>{const x=new Float32Array(d*d);for(let p=0;p<x.length;p++)x[p]=w();return x},v=i(64),b=i(16),u=i(32),T=d=>d*d*(3-2*d),g=(d,x,p,M)=>{const z=Math.floor(p),E=Math.floor(M),W=T(p-z),N=T(M-E),K=($,Kt)=>d[(Kt%x+x)%x*x+($%x+x)%x];return(K(z,E)*(1-W)+K(z+1,E)*W)*(1-N)+(K(z,E+1)*(1-W)+K(z+1,E+1)*W)*N};for(let d=0;d<r;d++)for(let x=0;x<r;x++){const p=(d*r+x)*4;h[p]=w()*255|0,h[p+3]=w()*255|0,h[p+1]=Math.round((g(v,64,x/4,d/4)*.65+g(u,32,x/8,d/8)*.35)*255),h[p+2]=Math.round((g(b,16,x/16,d/16)*.6+g(v,64,x/4+17,d/4+5)*.4)*255)}f.noise=t.createTexture(),t.bindTexture(t.TEXTURE_2D,f.noise),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,r,r,0,t.RGBA,t.UNSIGNED_BYTE,h),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.generateMipmap(t.TEXTURE_2D),f.ibuf=t.createBuffer(),f.dvao=t.createVertexArray(),t.bindVertexArray(f.dvao),t.bindBuffer(t.ARRAY_BUFFER,f.ibuf),t.bufferData(t.ARRAY_BUFFER,3700*32,t.DYNAMIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,4,t.FLOAT,!1,32,0),t.vertexAttribDivisor(0,1),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,16),t.vertexAttribDivisor(1,1),t.bindVertexArray(null),f.tex={}}const I=f.ps,lt=(e,o,a,n,s,r,h)=>{const m=t.createTexture();return t.bindTexture(t.TEXTURE_2D,m),t.texImage2D(t.TEXTURE_2D,0,a,e,o,0,n,s,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,h?t.LINEAR_MIPMAP_LINEAR:r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),m},Gt=e=>{const o=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),o};f.envT||(f.EN=384,f.envT=f.f16?lt(f.EN,f.EN,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR,!1):lt(f.EN,f.EN,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,!1),f.envF=Gt(f.envT),t.bindFramebuffer(t.FRAMEBUFFER,null));const it=B>600?1024:512;let P=f.tex[B];P||(P=f.tex[B]={},f.f16&&(P.hdr=lt(B,B,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR,!1),P.hdrF=Gt(P.hdr)),P.room=f.f16?lt(B,B,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR,!1):lt(B,B,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,!1),P.roomF=Gt(P.room),P.drop=f.f16?lt(it,it,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR,!1):lt(it,it,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,!1),P.dropF=Gt(P.drop),t.bindFramebuffer(t.FRAMEBUFFER,null));const xe=B+"|"+A.hash;f.scenes=f.scenes||new Map,f.tick=f.tick||0;let Y=f.scenes.get(xe),Oe=null;const qe=()=>{if(Y=f.scenes.get(xe),!Y){for(const[e,o]of f.scenes){if(f.scenes.size<2)break;f.tick-o.last<300||(t.deleteFramebuffer(o.sceneF),t.deleteTexture(o.scene),o.dead=!0,f.scenes.delete(e))}Y={scene:lt(B,B,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,!0),last:f.tick},Y.sceneF=Gt(Y.scene),t.bindFramebuffer(t.FRAMEBUFFER,null),f.scenes.set(xe,Y),Oe()}},D=160,O=160;f.fogT||(f.fogT=lt(D,O,t.R8,t.RED,t.UNSIGNED_BYTE,t.LINEAR,!1));const He={},rt=3600,l=new Float32Array(rt*8),Q=new Float32Array(rt),ft=new Float32Array(rt),gt=new Float32Array(rt),kt=new Float32Array(rt);let q=0;const bt=.2,G=new Float32Array(D*O),Ge=new Uint8Array(D*O),Ft=e=>Math.max(0,Math.min(1,(Fe+.45-e)/.6)),dt=48,ue=new Float32Array(dt*dt);for(let e=0;e<ue.length;e++)ue[e]=c();const ne=(e,o)=>{const a=Math.floor(e),n=Math.floor(o);let s=e-a,r=o-n;s=s*s*(3-2*s),r=r*r*(3-2*r);const h=(m,w)=>ue[(w%dt+dt)%dt*dt+(m%dt+dt)%dt];return(h(a,n)*(1-s)+h(a+1,n)*s)*(1-r)+(h(a,n+1)*(1-s)+h(a+1,n+1)*s)*r},Bo=(e,o)=>.25+.75*Math.min(1,Math.max(0,(ne(e*2.2+7,o*2.2)-.25)*1.8)),U=.25,ht=Math.ceil(R/U)+1,jt=Math.ceil(X/U)+1,_t=new Int32Array(ht*jt),se=new Int32Array(rt);let Dt=.05;const pt=()=>{_t.fill(-1),Dt=.03;for(let e=0;e<q;e++){const o=l[e*8+2];if(o<=0)continue;l[e*8+3]<.5&&o>Dt&&(Dt=o);const a=Math.max(0,Math.min(ht-1,Math.floor((l[e*8]+R/2)/U))),s=Math.max(0,Math.min(jt-1,Math.floor(l[e*8+1]/U)))*ht+a;se[e]=_t[s],_t[s]=e}},ge=(e,o)=>{const a=Math.max(0,Math.min(D-1,Math.floor((e/R+.5)*D))),n=Math.max(0,Math.min(O-1,Math.floor(o/X*O)));return G[n*D+a]},be=(e,o,a,n)=>{const s=(e/R+.5)*D,r=o/X*O,h=a/R*D+.7,m=a/X*O+.7,w=Math.max(0,Math.floor(s-h)),i=Math.min(D-1,Math.ceil(s+h)),v=Math.max(0,Math.floor(r-m)),b=Math.min(O-1,Math.ceil(r+m));for(let u=v;u<=b;u++)for(let T=w;T<=i;T++){const g=(T+.5-s)/h,d=(u+.5-r)/m,x=g*g+d*d;if(x<1){const p=u*D+T,M=Math.min(1,(1-x)*2.5);G[p]=G[p]*(1-M)+Math.min(G[p],n)*M}}},Lt=(e,o,a,n)=>{if(q>=rt)return-1;const s=q++,r=s*8;return l[r]=e,l[r+1]=o,l[r+2]=a,l[r+3]=n,l[r+4]=0,l[r+5]=0,l[r+6]=.03+.06*c(),l[r+7]=c()*6.28,Q[s]=bt*(.82+.4*c()),ft[s]=0,gt[s]=0,kt[s]=.65+.7*c(),s},Yt=e=>{l[e*8+2]=0,l[e*8+3]=-1},ye=()=>{let e=0;for(let o=0;o<q;o++)l[o*8+2]<=0||(o!==e&&(l.copyWithin(e*8,o*8,o*8+8),Q[e]=Q[o],ft[e]=ft[o],gt[e]=gt[o],kt[e]=kt[o]),e++);q=e},we=(e,o,a,n,s)=>{const r=a+Dt+s,h=Math.max(0,Math.floor((e-r+R/2)/U)),m=Math.min(ht-1,Math.floor((e+r+R/2)/U)),w=Math.max(0,Math.floor((o-r)/U)),i=Math.min(jt-1,Math.floor((o+r)/U));for(let v=w;v<=i;v++)for(let b=h;b<=m;b++)for(let u=_t[v*ht+b];u>=0;u=se[u]){if(u===n)continue;const T=u*8,g=l[T+2];if(g<=0)continue;const d=l[T]-e,x=l[T+1]-o,p=a+g+s;if(d*d+x*x<p*p)return u}return-1},yt=new Float32Array(48),Eo=Z==="Tropical"?2.1:Z==="Muggy"?1.5:Z==="Dry"?.6:1;for(let e=0;e<48;e++)yt[e]=Eo*zt.pool*(.75+.5*ne(e*.18,3.3))+(zt.pool>.1?.04:0);let ce=0;const Ro=(e,o)=>{const a=e/ae+Tt;let n=Math.round(((a/(2*Math.PI)+.5)%1+1)%1*48-.5);n=(n%48+48)%48;const s=o*3.2/Math.max(.25,y.R0*.13*Math.max(.3,yt[n]+.15));for(let r=-4;r<=4;r++)yt[(n+r+48)%48]+=s*.16*Math.exp(-r*r/5)};let Ao=1;const je=(e,o)=>{const a=e*8;let n=l[a],s=l[a+1],r=l[a+2];const h=bt*.62,m=Bo(n,s),w=Math.max(0,Math.min(9,16*(r-h*(1.25-.5*m))/bt))*m;ft[e]+=(w-ft[e])*Math.min(1,o*7);const i=ft[e];if(i<.03&&r<bt*.85)return l[a+3]=0,Q[e]=Math.max(r*1.15,bt*(.9+.3*c())),l[a+4]=.25,!0;const v=ge(n-r*1.4,s-r),b=ge(n+r*1.4,s-r);let u=(ne(n*1.6+31,s*1.3)-.5)*.12+(v-b)*.2;u=Math.max(-.1,Math.min(.1,u));const T=i*o,g=Math.max(1,Math.ceil(T/(r*.5)));for(let d=0;d<g;d++){const x=T/g;s-=x,n+=u*x,n<-R/2+r&&(n=-R/2+r),n>R/2-r&&(n=R/2-r);const p=r+Dt,M=Math.max(0,Math.floor((n-p+R/2)/U)),z=Math.min(ht-1,Math.floor((n+p+R/2)/U)),E=Math.max(0,Math.floor((s-p)/U)),W=Math.min(jt-1,Math.floor((s+p)/U));for(let N=E;N<=W;N++)for(let K=M;K<=z;K++)for(let $=_t[N*ht+K];$>=0;$=se[$]){if($===e)continue;const Kt=$*8,Jt=l[Kt+2];if(Jt<=0)continue;const ao=l[Kt]-n,ro=l[Kt+1]-s,no=r*1.05+Jt;ao*ao+ro*ro<no*no&&(r=Math.cbrt(r*r*r+Jt*Jt*Jt),Yt($))}if(be(n,s+r*.3,r*1.08,0),gt[e]+=x,gt[e]>.05+.12*c()){gt[e]=0;const N=r*(.1+.22*c()*c())*(r>.28?1.4:1),K=r*r*r-N*N*N;r=Math.cbrt(Math.max(K,1e-6));const $=Lt(n+(c()-.5)*r*.9,s+r*(1+.6*c()),N,0);$>=0&&(Q[$]=bt*1.2,kt[$]*=.6)}if(s<r*.55)return Ro(n,r*r*r),Yt(e),ce<6&&(ce++,A.sound.note(88+Math.round(c()*7),{dur:.05,vel:.05+.25*Math.min(1,r*4),wave:"sine",pan:n/R*1.6})),!1}return l[a]=n,l[a+1]=s,l[a+2]=r,l[a+4]=Math.min(1.1,i*.16+.12),l[a+5]=Math.atan2(u,1)*.8,!0},ko=(e,o,a,n)=>{const s=e*8;let r=l[s+2];if(r<=0)return;const h=l[s],m=l[s+1],w=Ft(m);if(r+=Ht.g*w*kt[e]*o/(r+.015),w<.2&&(r-=.004*o),a>0){const v=h-ie,b=m-fe,u=v*v+b*b,T=Rt+.3;u<T*T&&(r-=o*.06*(1-Math.sqrt(u)/T)*a)}if(r<.008){Yt(e);return}l[s+2]=r,l[s+4]*=n;const i=we(h,m,r,e,0);if(i>=0){const v=i*8,u=l[v+2]>r?i:e,T=u===e?i:e,g=u*8,d=T*8,x=l[g+2],p=l[d+2],M=x*x*x,z=p*p*p,E=Math.cbrt(M+z),W=l[d]-l[g],N=l[d+1]-l[g+1];l[g]+=W*z/(M+z),l[g+1]+=N*z/(M+z),l[g+2]=E,l[g+3]<.5&&(l[g+4]=Math.min(.5,l[g+4]+.6*z/(M+z)),l[g+5]=Math.atan2(W,N),l[g+6]=Math.min(.2,l[g+6]+.02*c())),Yt(T)}l[s+2]>0&&l[s+3]<.5&&l[s+2]>Q[e]*Ao&&(l[s+3]=1,ft[e]=.3,gt[e]=0)},Ye=e=>{for(let o=0;o<e&&q<rt-40;o++){const a=(c()-.5)*R*.99,n=c()*X;if(ge(a,n)<.6||Ft(n)<.4)continue;const s=.016+.014*c();we(a,n,s,-1,.008)>=0||Lt(a,n,s,0)}};for(let e=0;e<G.length;e++){const o=Math.floor(e/D);G[e]=Ft((o+.5)/O*X)*1}const Fo=R*Math.min(X,tt),_o=7;pt();for(let e=0;e<_o&&q<rt-200;e++){const o=zt.rmax*Math.pow(.7,e)*Ht.dens;if(o<.028||J==="Forgotten"&&e>2)break;const n=Math.min(5e3,Math.floor(Fo*(J==="Forgotten"?e===0?.3:.22:e===0?.16:.4)/(Math.PI*o*o)*2.6));for(let s=0;s<n&&q<rt-200;s++){const r=(c()-.5)*R,h=c()*X,m=Ft(h);if(m<.5&&c()>m*.3||J==="Just Poured"&&ne(r*2.3+11,h*2.3+3)<.42+.3*c())continue;const w=o*(J==="Just Poured"?.45+1.1*c()*c()+.2*c():.75+.5*c())*(.75+.25*m);if(we(r,h,w,-1,o*.1+.008)>=0)continue;const i=Lt(r,h,w,0);i>=0&&(l[i*8+6]=Math.min(.2,w*.6*c()),w>Q[i]*.94&&(Q[i]=w/(.9+.06*c()))),s%64===0&&pt()}pt()}const Do=zt.trails+(Z==="Tropical"?6:Z==="Muggy"?3:0)-(Z==="Dry"?2:0);for(let e=0;e<Math.max(0,Do);e++){const o=(c()-.5)*R*.8,a=Math.min(tt-.2,X*(.45+.5*c())),n=Lt(o,a,bt*(1.05+.25*c()),1);if(n<0)break;ft[n]=2,pt();for(let r=0;r<400&&!(!je(n,1/30)||l[n*8+3]<.5);r++);ye(),pt();const s=c();for(let r=0;r<G.length;r++)G[r]<.5&&(G[r]=Math.max(G[r],Math.min(s*.9,.5)*Ft((Math.floor(r/D)+.5)/O*X)))}const Qe=J==="Just Poured"?0:2+Math.floor(c()*3);for(let e=0;e<Qe;e++){let o=-1,a=0;for(let n=0;n<30;n++){const s=Math.floor(c()*q),r=l[s*8+2];l[s*8+3]<.5&&r>a&&l[s*8+1]>X*.4&&(a=r,o=s)}o>=0&&(l[o*8+2]=Q[o]*(.93+.05*e/Math.max(1,Qe)),kt[o]=1.6)}pt();for(let e=0;e<30;e++)Ye(40);ye(),pt();const Lo=1/Ht.tau;if(!f.ready){for(const e in I){const o=I[e];if(!t.getProgramParameter(o.p,t.LINK_STATUS))throw new Error("446 "+e+": "+t.getProgramInfoLog(o.p)+" "+t.getShaderInfoLog(o.f)+" "+t.getShaderInfoLog(o.vs));t.useProgram(o.p);const a=(n,s)=>{const r=t.getUniformLocation(o.p,n);r&&t.uniform1i(r,s)};a("uN",0),a("uA",1),a("uS",1),a("uD",2),a("uE",2),a("uF",3),o.B=t.getUniformLocation(o.p,"B"),o.X=t.getUniformLocation(o.p,"X"),o.V=t.getUniformLocation(o.p,"V"),o.W=t.getUniformLocation(o.p,"W"),o.F=t.getUniformLocation(o.p,"F"),o.W2=t.getUniformLocation(o.p,"W2")}f.ready=!0}const Mt=new Float32Array(42*4),F=(e,o,a,n,s)=>{Mt[e*4]=o,Mt[e*4+1]=a,Mt[e*4+2]=n,Mt[e*4+3]=s};F(0,_[0],_[1],_[2],ct),F(1,V[0],V[1],V[2],0),F(2,et[0],et[1],et[2],0),F(3,S[0],S[1],S[2],0),F(4,y.R0,ee,y.H,y.tw),F(5,y.bt,tt,0,0),F(6,ot[0],ot[1],ot[2],C.I),F(7,C.col[0],C.col[1],C.col[2],0),F(8,C.amb[0],C.amb[1],C.amb[2],0),F(9,at.k,at.pw,at.rf,at.wp),F(10,at.a[0],at.a[1],at.a[2],0),F(11,at.b[0],at.b[1],at.b[2],0),F(12,pe,fo,ho,vo),F(13,po,mo,xo,uo),F(14,27+6*c(),75,0,0);for(let e=0;e<3;e++){const o=qt[e];o?F(15+e,o[0],o[1],o[2],o[3]):F(15+e,0,0,0,0)}F(17,Ot.length,qt.length,3,0),Ot.forEach((e,o)=>{F(18+o*4,e.c[0],e.c[1],e.c[2],e.rr);for(let a=0;a<3;a++)F(19+o*4+a,e.M[a][0],e.M[a][1],e.M[a][2],e.he[a])}),F(34,0,0,j==="Ice Sphere"||j==="No Ice"?0:1,zt.cond),F(35,zt.cond*1.5,Xt,j==="No Ice"?1:.6,0);const Te=xt([Math.sin(Tt+.55)*.85,.42,Math.cos(Tt+.55)*.85]);F(36,Te[0],Te[1],Te[2],Ut==="Morning"?3.2:2.6);const Bt=(e,o)=>t.viewport(0,0,e,o),ze=()=>{t.bindVertexArray(f.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0)};Oe=()=>{ze(),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,f.noise);const e=f.f16?0:1;if(t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null),t.useProgram(I.scA.p),t.uniform4fv(I.scA.B,Mt),t.bindFramebuffer(t.FRAMEBUFFER,f.envF),Bt(f.EN,f.EN),t.uniform4f(I.scA.X,f.EN,e,1,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,P.roomF),Bt(B,B),t.uniform4f(I.scA.X,B,e,0,0),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(I.sc.p),t.uniform4fv(I.sc.B,Mt),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,P.room),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,f.envT),f.f16){t.bindFramebuffer(t.FRAMEBUFFER,P.hdrF),Bt(B,B),t.uniform4f(I.sc.X,B,0,9,20),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,Y.sceneF),Bt(B,B),t.useProgram(I.dof.p),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,P.hdr);const o=Math.hypot(_[0],_[1]-y.H*.4,_[2]);t.uniform4f(I.dof.X,B,44,.034,.019),t.uniform4f(I.dof.F,o,0,0,0),t.drawArrays(t.TRIANGLES,0,3)}else t.bindFramebuffer(t.FRAMEBUFFER,Y.sceneF),Bt(B,B),t.uniform4f(I.sc.X,B,1,9,20),t.drawArrays(t.TRIANGLES,0,3);t.bindFramebuffer(t.FRAMEBUFFER,null),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,Y.scene),t.generateMipmap(t.TEXTURE_2D),t.flush()},Y||qe();const Vo=(e,o)=>{const a=e*2-1,n=1-2*o;return xt([S[0]+(a*V[0]+n*et[0])*ct,S[1]+(a*V[1]+n*et[1])*ct,S[2]+(a*V[2]+n*et[2])*ct])},Io=(e,o)=>{const a=Vo(e,o),n=_,s=ee,r=y.R0,h=a[0]*a[0]+a[2]*a[2]-s*s*a[1]*a[1],m=r+s*n[1],w=n[0]*a[0]+n[2]*a[2]-s*a[1]*m,i=n[0]*n[0]+n[2]*n[2]-m*m,v=w*w-h*i;if(v<0)return null;const b=(-w-Math.sqrt(v))/h,u=n[1]+b*a[1];if(b<0||u<0||u>y.H)return null;const T=n[0]+b*a[0],g=n[2]+b*a[2];let d=Math.atan2(T,g)-Tt;return d-=2*Math.PI*Math.floor((d+Math.PI)/(2*Math.PI)),{s:d*ae,v:u}};let Qt=!1,nt="",Me=0,Ke=0,Je=0,Et=null,wt=0,le=0,Be=0,ie=0,fe=0,Rt=0,st=0,Ze=-9;const Po=(e,o)=>{const a=o.s-e.s,n=o.v-e.v,s=Math.hypot(a,n),r=Math.max(1,Math.ceil(s/.12)),h=k==="Highball"?.5:.6,m=s>1e-4?-n/s:0,w=s>1e-4?a/s:1;for(let i=1;i<=r;i++){const v=e.s+a*i/r,b=e.v+n*i/r;be(v,b,h,0);const u=h+Dt,T=Math.max(0,Math.floor((v-u+R/2)/U)),g=Math.min(ht-1,Math.floor((v+u+R/2)/U)),d=Math.max(0,Math.floor((b-u)/U)),x=Math.min(jt-1,Math.floor((b+u)/U));for(let p=d;p<=x;p++)for(let M=T;M<=g;M++)for(let z=_t[p*ht+M];z>=0;z=se[z]){const E=z*8,W=l[E+2];if(W<=0)continue;const N=l[E]-v,K=l[E+1]-b;N*N+K*K<h*h&&(wt+=W*W*W,Yt(z))}if(le+=s/r,le>.28&&wt>1e-4){le=0;for(const p of[-1,1]){const M=wt*(.35+.15*c());wt-=M;const z=Math.min(.32,Math.cbrt(M+.0025*c())),E=Lt(v+p*m*(h+z*.9),b+p*w*(h+z*.9),z,0);E>=0&&(l[E*8+6]=.15,Q[E]=bt*(.8+.3*c()))}}}Be+=s,Be>.7&&(Be=0,A.sound.note(79+Math.round(c()*5),{dur:.06,vel:.06,wave:"triangle",cutoff:2600,pan:e.s/R}))},Vt=new Float32Array(36*4),L=(e,o,a,n,s)=>{Vt[e*4]=o,Vt[e*4+1]=a,Vt[e*4+2]=n,Vt[e*4+3]=s};L(1,_[0],_[1],_[2],ct),L(2,V[0],V[1],V[2],0),L(3,et[0],et[1],et[2],0),L(4,S[0],S[1],S[2],0),L(5,y.R0,ee,y.H,y.tw),L(6,Mt[14*4],y.bt,ae,Tt),L(7,ot[0],ot[1],ot[2],C.I),L(8,C.col[0],C.col[1],C.col[2],0);const $e=.36*.48;L(9,(f.f16?1:2)/it,(f.f16?1:2)/it,1/D,$e),L(10,Ht.fog,zt.fogOp,1.5/(2*ct*At),1),L(12,C.amb[0]*1.3,C.amb[1]*1.3,C.amb[2]*1.3,0);{const e=re([pe,0,0],V)>0?1:-1,o=xt([-S[0]*.75+V[0]*e*.6,-S[1]*.75+V[1]*e*.6+.4,-S[2]*.75+V[2]*e*.6]);L(13,o[0],o[1],o[2],.9)}L(14,7,7.1,7.4,Fe);{let e=1,o=0,a=0,n=1;for(let r=0;r<64;r++){const h=r/64*6.2832,m=Ct([Math.sin(h)*y.R0,0,Math.cos(h)*y.R0]);e=Math.min(e,m[0]),o=Math.max(o,m[0]),a=Math.max(a,m[1]),n=Math.min(n,m[1])}L(15,(e+o)/2,1-(a+n)/2,(o-e)/2,(a-n)/2);for(let r=0;r<64;r++){const h=r/64*6.2832,m=Ct([Math.sin(h)*oe(Xt),Xt,Math.cos(h)*oe(Xt)]);e=Math.min(e,m[0]),o=Math.max(o,m[0]),a=Math.max(a,m[1]),n=Math.min(n,m[1])}const s=(o-e)*.04;L(29,Math.max(.002,e+s),Math.max(.002,1-a),Math.min(.998,o-s),Math.min(.998,1-n))}L(28,H==="Low and Close"?.3:1.1,H==="Low and Close"?1:0,H==="Low and Close"?.13:.02,H==="Low and Close"?.7:.75),L(11,0,0,0,1);const to=e=>{if(Y.dead&&qe(),Y.last=f.tick=f.tick+1,ze(),t.bindFramebuffer(t.FRAMEBUFFER,P.dropF),Bt(it,it),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),q>0){t.enable(t.BLEND),t.blendEquation(t.MAX),t.blendFunc(t.ONE,t.ONE),t.useProgram(I.drop.p),t.uniform4f(I.drop.W,R,X,R/it,$e);const o=e-Ze;t.uniform4f(I.drop.W2,o<1.5?.18*Math.exp(-4*o):0,o*52,0,0),t.bindVertexArray(f.dvao),t.bindBuffer(t.ARRAY_BUFFER,f.ibuf),t.bufferSubData(t.ARRAY_BUFFER,0,l,0,q*8),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,q),t.disable(t.BLEND),t.blendEquation(t.FUNC_ADD)}t.flush(),ze(),t.bindFramebuffer(t.FRAMEBUFFER,null),Bt(B,B),t.useProgram(I.comp.p),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,f.noise),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,Y.scene),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,P.drop),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,f.fogT),L(0,B,e,R,X),L(11,st>0?ie/R+.5:0,st>0?fe/X:0,st>0?Rt:0,1);for(let o=0;o<48;o++)Vt[64+o]=yt[o];t.uniform4fv(I.comp.V,Vt),t.drawArrays(t.TRIANGLES,0,3)},eo=(e,o)=>{f.fogOwner!==He&&(f.fogOwner=He,e=0,o=O);for(let a=e*D,n=o*D;a<n;a++){const s=G[a]*255;Ge[a]=s>=255?255:s>0?s|0:0}t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,f.fogT),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texSubImage2D(t.TEXTURE_2D,0,0,e,D,o-e,t.RED,t.UNSIGNED_BYTE,Ge,e*D)};eo(0,O),to(0);let It=0,oo=0,Ee=1+3*c();return(e,o)=>{o=Math.min(.1,Math.max(.001,o||1/30)),It+=o,oo++,ce=Math.max(0,ce-o*3);const a=A.input;if(a.down&&a.inside){const i=Io(a.x,a.y);Qt||(nt="",Me=It,Ke=a.x,Je=a.y,Et=i,wt=0,le=0),!nt&&Math.hypot(a.x-Ke,a.y-Je)>.012&&(nt="wipe"),!nt&&It-Me>.28&&(nt="hold"),nt==="wipe"&&(i&&Et&&(pt(),Po(Et,i)),Et=i),nt==="hold"&&i&&(ie=i.s,fe=i.v,Rt=Math.min(1.4,Rt+o*.5),st=1,be(ie,fe,Rt,0)),Qt=!0}else{if(Qt&&!nt&&It-Me<.35){Ze=It;const i=[];for(let v=0;v<q;v++)l[v*8+3]<.5&&l[v*8+2]>Q[v]*.7&&i.push(v);i.sort((v,b)=>l[b*8+2]/Q[b]-l[v*8+2]/Q[v]);for(let v=0,b=Math.min(i.length,5+Math.floor(c()*6));v<b;v++){const u=i[v];l[u*8+3]=1,ft[u]=.7+.9*c(),gt[u]=0}A.sound.note(93+Math.round(c()*2),{dur:1.4,vel:.14,wave:"sine"}),A.sound.note(100,{dur:.9,vel:.06,wave:"sine",at:.004}),A.sound.hit("blip",.22,{freq:2400+900*c(),at:.03}),A.sound.hit("blip",.14,{freq:3100+600*c(),at:.09}),A.sound.hit("click",.2,{at:.12})}if(Qt&&nt==="wipe"&&wt>1e-4&&Et){const i=Math.min(.34,Math.cbrt(wt));Lt(Et.s,Et.v-.3,i,0),wt=0}Qt=!1,nt="",st>0&&(st=Math.max(0,st-o*1.5),Rt*=Math.exp(-o*1.2),st<=0&&(Rt=0))}const n=oo%4,s=Math.floor(O*n/4),r=Math.floor(O*(n+1)/4),h=o*4;for(let i=s;i<r;i++){const v=Ft((i+.5)/O*X),b=(1-Math.exp(-h*Lo))*v,u=i*D,T=.5*v;for(let g=0;g<D;g++){const d=u+g;G[d]<T&&(G[d]+=(T-G[d])*b)}}pt();const m=st>0?st:0,w=Math.exp(-h*3);for(let i=n;i<q;i+=4)l[i*8+3]<.5&&l[i*8+2]>0&&ko(i,h,m,w);for(let i=0;i<q;i++)l[i*8+3]>.5&&l[i*8+2]>0&&je(i,o);Ye(Math.round(24*Ht.nuc*o*30)),ye();for(let i=0;i<48;i++){const v=yt[(i+47)%48],b=yt[(i+1)%48];yt[i]+=((v+b)*.5-yt[i])*Math.min(1,o*.5)}eo(s,r),Ee-=o,Ee<0&&Ot.length&&(Ee=1.5+6*c(),A.sound.hit("click",.03+.06*c(),{pan:(c()-.5)*.6})),to(It)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
