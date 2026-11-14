// Silver Photo: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/267.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(tt){tt&&tt.add({num:267,name:"Silver Photo",fam:"Worlds",recipe:"A small 1840s photo on a silver plate in an open leather case, which only looks like a picture while it reflects the dark room. The subject (a waterfall, ships at a quay, the pyramids, the moon or rarely an eclipse) and the tarnish change every mint. Drag to tilt it until the window catches it and it flips to a negative, tap to breathe on the glass, or hold to bring a candle close.",interactive:"Drag to tilt the plate until the window reflects in it and the picture flips to a ghostly negative, tap to breathe on the cover glass, hold to bring a candle close.",music:!0,gl:!0,fps:30,seed:0,make(m){const e=m.gl,A=m.size,c=!!m.home;let B=2522394;for(let o=2;o<66;o+=8)B=Math.imul(B^parseInt(m.hash.slice(o,o+8),16),2246822507)^B>>>13;const Y=o=>{let t=o|0;return()=>{t=t+1831565813|0;let s=Math.imul(t^t>>>15,1|t);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}},E=Y(B),go=(o,t)=>{let s=0;for(const l in t)s+=t[l];let n=o()*s;for(const l in t)if(n-=t[l],n<0)return l;return Object.keys(t)[0]},j=o=>{let t=0;for(const n in o)t+=o[n];let s=E()*t;for(const n in o)if(s-=o[n],s<0)return n;return Object.keys(o)[0]},G=Y(B^1249776446),be=G(),_t=m.trait("Plate",c||be<.4?"Waterfall":be<.62?"Harbour":be<.79?"The Pyramids":be<.95?"The Moon":"Eclipse"),oe=["Waterfall","The Moon","Eclipse","Harbour","The Pyramids"].indexOf(_t),Ce=oe===0,ge="sj"+oe,Be=(o,t)=>Ce?m.trait(o,t):t,jt=Be("Falls",c?"Tall fall":j({"Tall fall":34,"Tiered cascade":30,"Twin falls":24,"Thin veil":12})),Gt=m.trait("Mat",c?"Oval":j({Oval:40,"Arch top":34,Octagon:26})),It=m.trait("Tarnish",c?"Halo":j({Faint:26,Halo:46,Heavy:20,Peacock:8})),Wt=m.trait("Marks",c?"Buffing lines":j({"Buffing lines":40,"Wipe marks":30,Fingerprint:22,"Wiped and fingerprinted":8})),Zt=m.trait("Case",c?"Black morocco":j({"Black morocco":44,"Brown leather":40,"Red morocco":10,"Green morocco":6})),Vt=m.trait("Pad",c?"Plum velvet":j({"Plum velvet":36,"Crimson velvet":30,"Moss velvet":22,"Royal blue velvet":12})),Ot=m.trait("Window",c?"Sash window":j({"Sash window":50,"Leaded casement":34,"Bay window":16})),Kt=j({"Gold-toned":50,Untoned:50}),ot=m.trait("Toning",c?"Gold-toned":Y(B^1759714724)()<.09?"Solarised blue":Kt),st=Y(B^1597463007),Yt=Be("View",c||st()<.58?"Across the pool":"From the side"),ce=["Across the pool","From the side"].indexOf(Yt),he=st()<.5?-1:1,ye=Y(B^2214306163),H=ye(),Jt=Be("Place",c?"Gorge":H<.06?"Down the valley":H<.1?"Broad falls":H<.28?"Gorge":H<.36?"Rock bowl":H<.38?"Slot canyon":H<.4?"Under the fall":H<.54?"Slot canyon":H<.7?"Broad falls":H<.84?"Under the fall":"Down the valley"),I=["Gorge","Rock bowl","Slot canyon","Broad falls","Under the fall","Down the valley"].indexOf(Jt),S=[[1,0,1,0,1],[1.3,-.04,2.7,-.03,1.1],[.8,.06,.36,.16,.7],[1,0,3.3,-.12,1],[.42,-.08,1.25,0,1.35],[1.8,.1,.7,0,1]][I].slice(),se=[[0,0,0],[0,.7,0],[.8,0,0],[0,.5,0],[.6,0,0],[0,.55,0]][I],Ue=ye()<.5?-1:1,at=se[0]+se[1]+se[2]>0,de=at?I:0,W="sc"+(de||""),rt=ye(),Qt=c?0:rt<.2?1:rt>=.85?2:0,ke=ye(),qe=c||I>1?0:ke<.25?1:ke<.55?0:ke<.77?2:3;qe===1?(S[0]*=1.38,S[1]+=.06,S[2]*=1.5):qe===2&&(S[0]*=.76,S[1]-=.1,S[3]+=.1);const $t=Y(B^739982445),ft=$t(),eo=c||ft<.55?0:ft<.82?1:2,Te=["Tall fall","Tiered cascade","Twin falls","Thin veil"].indexOf(jt),nt=["Oval","Arch top","Octagon"].indexOf(Gt),Ee=["Faint","Halo","Heavy","Peacock"].indexOf(It),He=["Buffing lines","Wipe marks","Fingerprint","Wiped and fingerprinted"].indexOf(Wt),to=["Black morocco","Brown leather","Red morocco","Green morocco"].indexOf(Zt),oo=["Plum velvet","Crimson velvet","Moss velvet","Royal blue velvet"].indexOf(Vt),ze=["Sash window","Leaded casement","Bay window"].indexOf(Ot),Re=ot==="Gold-toned"?1:ot==="Solarised blue"?2:0,Pe=c?.37:E(),Ae=c?.61:E(),Xe=E(),lt=E(),Me=G(),Fe=G(),De=G(),ae=G(),_e=G(),je=G(),Ge=G()*40,it=oe===1?[[Ge,(Me-.5)*.07,.01+.03*Fe,.145+.045*De],[(38+50*ae)*Math.PI/180,_e<.5?-1:1,(je-.5)*.7,(Me-.5)*.8]]:oe===2?[[Ge,(Me-.5)*.05,.01+.03*Fe,.1+.02*De],[ae*6.2832,ae*6.2832+1.4+.8*_e,ae*6.2832+3.1+.4*je,ae*6.2832+4.6+.6*Fe]]:[[Ge,Me<.5?-1:1,Fe,De],[ae,_e,je,0]],f=e.__c267||(e.__c267=(()=>{const o=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,t=o+"const vec2 P[3]=vec2[3](vec2(-1,-1),vec2(3,-1),vec2(-1,3));out vec2 vU;void main(){vec2 p=P[gl_VertexID];vU=p*.5+.5;gl_Position=vec4(p,0,1);}",s=`uniform sampler2D uN;
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return textureLod(uN,(i+f+.5)*(1./256.),0.).r;}
float vg(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return textureLod(uN,(i+f+.5)*(1./256.),0.).g;}
float fb(vec2 p,int o){vec4 t=textureLod(uN,p*.125,0.);return o<4?t.a:t.b;}
float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float ang(vec2 v){float r=atan(abs(v.y)/max(abs(v.x),1e-6));r=v.x<0.?3.14159265-r:r;return v.y<0.?-r:r;}
float winD(vec2 m,float k){vec2 q=m-vec2(0.,.08);float d;
 if(k<.5){vec2 ab=vec2(2.7,3.3);d=(length(q/ab)-1.)*2.85;}
 else if(k<1.5){float s=1.2;vec2 qq=vec2(q.x,max(q.y-s,0.));d=max((length(qq/vec2(2.6,2.12))-1.)*2.3,max(abs(q.x)-2.6,-3.28-q.y));}
 else{d=max(max(abs(q.x)-2.66,abs(q.y)-3.3),(abs(q.x)+abs(q.y)-5.15)*.7071);}
 return d;}
`,n=`float h1(float x){return fract(sin(x*78.233+.31)*43758.5453);}
// a long exposure of falling water: a clear sheet at the lip that breaks into skeins, spreads and leans, gauze at the foot
float fall(vec2 p,float fx,float lip,float pool,float w0,float w1,float sd){
 float k=clamp((lip-p.y)/(lip-pool),0.,1.);
 float dx=p.x-fx-.012*(fract(sd*3.7)-.5)*k*k-.004*(fb(vec2(p.y*4.,sd),3)-.5);
 float hw=(w0*(1.+.2*k)+w1*k*k*.9+.35*w1*smoothstep(.45,.6,k)*step(.4,fract(sd*5.1)))*(.9+.2*vn(vec2(p.y*12.,sd*9.)));
 float xn=dx/hw,part=smoothstep(.04,.4,k);
 float sk=fb(vec2(xn*9.+sd*3.,k*1.1+sd),4);
 float fine=vn(vec2(xn*(26.+22.*k),p.y*4.+sd));
 float den=mix(.9+.1*fine,.42+.58*smoothstep(.36,.64,sk)+.2*(fine-.5),part);
 float edge=smoothstep(1.,.4,abs(xn)+.2*part*(.5-sk));
 float crest=smoothstep(lip+.004,lip-.003,p.y+.003*vn(vec2(dx*120.,sd)));
 return clamp(den,0.,1.)*edge*crest*step(pool-.01,p.y);}
float folia(vec2 p,float sc,float sd,float sun){
 float n1=fb(p*sc+sd,4),n2=fb((p+vec2(-.004*sun,-.006))*sc+sd,4);
 float sh=clamp(.5+(n1-n2)*12.,0.,1.),m=smoothstep(.3,.72,n1),cl=vn(p*sc*9.+sd);
 return .04+.22*m*sh+.1*cl*(.2+.8*sh);}
// the gorge seen from the bank: two side walls and a slightly curved back wall carrying the fall (back wall depth 1).
// returns (u along the walls, height H, depth D, side-wall weight)
vec4 geo(vec2 p,float fx,float vy,float sd){
 float dxr=p.x-fx,ad=abs(dxr);bool rs=dxr>0.;
 float Xs=((rs?.14+.03*h1(sd+1.):.16+.03*h1(sd))*uV.z+(rs==(uV.w>0.)?abs(uV.w):0.))*(1.+.1*(vn(vec2(p.y*10.,sd+(rs?3.:0.)))-.5)+.07*(h1(floor(p.y*34.+3.*vn(vec2(p.y*5.,sd)))+sd+(rs?5.:0.))-.5));
 float cv=.07+.12*max(uV.z-1.,0.),aq=min(ad/Xs,1.);
 float D=ad<Xs?1.-cv*aq*aq:(1.-cv)*Xs/ad;
 return vec4(ad<Xs?dxr:(rs?1.:-1.)*(Xs+1.-cv-D),(p.y-vy)*D,D,smoothstep(Xs*.9,Xs*1.1,ad));}
// shale relief: thin beds, now and then a hard bed standing out as a ledge, joints through several beds, blocks set
// back by different amounts, weathered roughness. returns (height toward the viewer, albedo)
`,l=o+s+`in vec2 vU;out vec4 o;uniform vec4 uA,uB,uV;
`+n+`vec2 rockH(vec2 p,float fx,float vy,float sd,vec2 pw){
 vec4 g=geo(p,fx,vy,sd);vec2 w=g.xy;
 // joints first: few, long, wandering, nearly vertical; the beds step a little at each one
 float jk=3.2+2.*fract(sd*2.3);
 float J=w.x*jk+.35*w.y+.4*(fb(vec2(w.y*5.,w.x*1.5+sd+6.),4)-.5),ji=floor(J),jf=fract(J);
 float stp=mix(h1(ji*4.3+sd),h1(ji*4.3+4.3+sd),smoothstep(.8,1.,jf));
 // bedding: packets of very unequal thickness that sag along the wall and step at the joints
 float wy=w.y+.016*(fb(vec2(w.x*1.6+sd,w.y*.6),4)-.5)+.005*(fb(vec2(w.x*5.,w.y*2.)+sd,4)-.5)+.012*w.x*(fract(sd*1.7)-.5)+.009*(stp-.5);
 float B=wy*19.+3.2*fb(vec2(wy*1.7,sd*.7),4)+1.1*vn(vec2(wy*9.,sd+4.));
 B+=.12*(vn(vec2(w.x*14.,B*2.))-.5)*smoothstep(.6,.2,pw.x*14.);float bi=floor(B),bf=fract(B);
 float ha=h1(bi+sd),hb=h1(bi*1.37+sd+3.);
 // a hard bed stands out as a ledge for a stretch, then thins out and is lost in the weathered slope
 float hard=smoothstep(.62,.7,ha+.45*(fb(vec2(w.x*2.4+bi*.37,bi*.71)+sd,4)-.5));
 float run=floor((B+5.*h1(ji*2.7+sd))/(3.+4.*h1(ji+sd*.3)));
 float jon=step(.6,h1(ji*1.9+run*5.3+sd));
 float jdd=min(jf,1.-jf)/jk;
 float jw=(.0008+.0026*fb(vec2(w.y*7.,ji+sd),4))*jon;
 float joint=1.-smoothstep(.0,jw+1e-5,jdd+.0018*(vn(w*vec2(40.,90.))-.5));
 float fad=smoothstep(.6,.1,pw.x*12.);
 // blocks between joints sit forward or back a little; now and then a soft one has fallen out (ragged alcove)
 float bk=h1(ji*3.1+bi*7.7+sd);
 float alc=(1.-hard)*step(.9,bk)*step(.5,jon)*smoothstep(.45,.6,fb(w*vec2(18.,26.)+sd+2.,4)+.3*min(min(jf,1.-jf)*4.,min(bf,1.-bf)*3.));
 // thin beds between the ledges have weathered back into one slope: a tone with no line in it
 float h=hard*(.013*smoothstep(.0,.1,bf)*smoothstep(1.,.88,bf))+.004*fb(vec2(w.x*.7,wy*6.)+sd+9.,4);
 h-=.008*alc*fad;
 h-=.004*joint*fad;
 h+=.003*(1.-g.z)*(vn(p*vec2(230.,300.)+sd)-.5)*smoothstep(.0,.3,1.-g.z);
 h+=.006*fb(w*vec2(7.,9.)+sd,4)+.0035*fb(w*vec2(23.,29.)+sd+5.,4)*smoothstep(.5,.15,pw.x*23.)+.0018*vn(w*vec2(120.,140.)+sd)*smoothstep(.6,.2,pw.x*120.);
 // tone: weathered faces stained in vertical streaks, dark where water seeps, pale where lime has dried
 float sk=fb(vec2(w.x*9.+sd,w.y*.9),4),sk2=fb(vec2(w.x*23.+sd+3.,w.y*1.6),4);
 float alb=mix(.33+.08*hb,.55+.14*hb,hard)*(.92+.16*bk);
 alb*=1.-.45*smoothstep(.5,.78,sk)-.25*smoothstep(.55,.8,sk2);
 alb*=1.+.2*smoothstep(.6,.85,fb(vec2(w.x*8.+sd+7.,w.y*1.4),4))*(1.-hard*.5);
 alb*=1.-.4*alc-.3*joint*fad;
 return vec2(h,alb);}
void main(){
 float sd=uA.y,fx=uA.w,vy=uB.y+.065;vec2 p=vec2((vU.x-.5)*.848,vU.y-.5)*uV.x+vec2(fx*(1.-uV.x)*.7,uV.y);
 vec4 g=geo(p,fx,vy,sd);vec2 r=rockH(p,fx,vy,sd,fwidth(g.xy));
 float hh=floor(clamp((r.x+.03)/.08,0.,1.)*65535.+.5),hi=floor(hh/256.);
 o=vec4(hi/255.,(hh-hi*256.)/255.,clamp(r.y,0.,1.),1);}`,h=o+s+`in vec2 vU;out vec4 o;uniform vec4 uA,uB,uC,uV,uF;uniform int uNF;uniform sampler2D uRk;
#ifndef PLC
#define PLC 0
#endif
#ifndef SCP
#define SCP 0
#endif
#if SCP>=2
uniform sampler2D uSv;
float dec(vec4 t){vec3 b=floor(t.rgb*255.+.5);return (b.r*65536.+b.g*256.+b.b)*(8./16777215.);}
#endif
#if SCP==1||SCP==2
vec4 enc(float v){float x=floor(clamp(v*.125,0.,1.)*16777215.+.5),hi=floor(x*(1./65536.)),md=floor((x-hi*65536.)*(1./256.));return vec4(hi,md,x-hi*65536.-md*256.,255.)*(1./255.);}
#endif
#ifdef FRAME
uniform vec4 uG;
// the near bank's edge along the bottom of the frame
float bankY(float sx,float sd){return -.5+uF.y*(.16+.14*fb(vec2(sx*2.2+sd,3.),4)+.08*smoothstep(-.3,.4,-sx))+.015*(vn(vec2(sx*30.,sd+2.))-.5);}
#endif
`+n+`float rubble(vec2 p,float sd,float sun){
 // fallen blocks of every size: big ones and small ones, each lit on its top facet and black beneath
 vec2 q=p*vec2(9.,13.)+sd;float a1=fb(q,4),a2=fb(q+vec2(-.04*sun,-.06),4);
 vec2 q2=p*vec2(34.,46.)+sd+3.;float b1=fb(q2,4),b2=fb(q2+vec2(-.1*sun,-.14),4);
 float v=.03+.05*vn(p*300.);
 v=mix(v,.05+.09*smoothstep(.42,.58,.5+(b1-b2)*8.),smoothstep(.48,.54,b1));
 v=mix(v,.04+.14*smoothstep(.4,.6,.5+(a1-a2)*10.)*(.8+.4*vn(q*3.)),smoothstep(.55,.59,a1));
 return v*(.85+.3*vn(p*600.));}
void main(){
 vec2 p=vec2((vU.x-.5)*.848,vU.y-.5)*uV.x+vec2(uA.w*(1.-uV.x)*.7,uV.y);
 float ft=uA.x,sd=uA.y,fx=uA.w,lip=uB.x,pool=uB.y,sun=uB.z>=0.?1.:-1.;
 float hc=.065,vy=pool+hc,pe=fwidth(p.y);
#if SCP!=3
 float dxr=p.x-fx,ad=abs(dxr);bool rs=dxr>0.;
 vec4 g=geo(p,fx,vy,sd);float u=g.x,H=g.y,D=g.z,side=g.w;
 vec2 pw=fwidth(vec2(u,H));
 float lit=mix(.5,(rs?-sun:sun)>0.?.95:.24,side);
 lit*=.45+.55*smoothstep(.2,.75,vn(vec2(u*11.+sd,H*2.5)));
 float wet=exp(-ad/.04)*(1.-side)+.5*smoothstep(.02,-.04,H+hc);
 // rim of the walls, notched where the stream comes over, and the trees on it
 float nt=exp(-pow(dxr/(ft>1.5&&ft<2.5?.06:.03),2.));
 float Hr=(lip-vy)+.04+.035*(fb(vec2(u*5.,sd+2.),4)-.5)+.018*(h1(floor(u*9.+2.*vn(vec2(u*3.,sd)))+sd)-.5)+.01*(vn(vec2(u*70.,sd))-.5)+.08*(1.-D);
 float isl=0.;
 // (PLC: the place, defined only in the framed forms of this program: 3 broad falls, 4 under the fall, 5 down the valley)
 // down the valley: the hillsides fall away toward the lens in spurs and meet the river; the broad falls: one long level
 // brink over the whole back wall, an island splitting it on twin falls
 #if PLC==5
 Hr+=.035*(fb(vec2(u*5.,sd+2.),4)-.5)+.018*(h1(floor(u*9.+2.*vn(vec2(u*3.,sd)))+sd)-.5)-1.2*(1.-D);
 #endif
 #if PLC==3
 {isl=ft>1.5&&ft<2.5?smoothstep(.04,.025,abs(u-uG.z*.17)+.012*(vn(vec2(H*40.,sd))-.5)):0.;nt=(1.-side)*(1.-isl);Hr=mix(Hr,lip-vy+.012+.012*fb(vec2(u*30.,sd),4),isl);}
 #endif
 Hr=mix(Hr,lip-vy,nt);
 float frg=.004*(fb(p*vec2(16.,12.)+sd+7.,4)-.5)+.002*(vn(p*vec2(260.,220.))-.5);
 float Ht=Hr+(.012+.05*pow(fb(vec2(u*7.,sd+5.),4),1.6)+.014*vn(vec2(u*70.,sd+1.))+.008*vn(vec2(u*190.,sd+3.)))*(1.-.7*nt)/max(D,.4)+frg*D;
 #if PLC==3
 Ht=mix(Ht,Hr+.45*(Ht-Hr),isl);
 #endif
 #if PLC==5
 Ht=Hr+.35*(Ht-Hr);
 #endif
 float Hd=Hr-.01-.025*smoothstep(.45,.8,fb(vec2(u*9.,sd+8.),4));
#endif
#if SCP<=1
 // sky: overexposed, blank
 float v=.985-.02*smoothstep(.45,.0,p.y-lip);
 // the far wooded ridge beyond the notch, pale with distance
 float yh=lip+.03+.012*fb(vec2(p.x*7.,sd+3.),4)+.006*pow(vn(vec2(p.x*90.,sd)),.7);
 #if PLC==5
 yh+=.06+.14*fb(vec2(p.x*2.4,sd+9.),4)+.03*fb(vec2(p.x*9.,sd+2.),4);
 #endif
 v=mix(v,.8+.08*fb(p*vec2(30.,40.)+sd+4.,4),smoothstep(yh+pe,yh-pe,p.y+frg*.3));
 // trees on the rims: dark lacy masses, sky showing through near their tops
 float ta=smoothstep(Ht+pw.y,Ht-pw.y,H);
 float sc=mix(18.,34.,1.-D);
 ta*=1.-smoothstep(.58,.66,fb(p*sc*1.6+sd+11.,4)+.15*vn(p*sc*12.))*smoothstep(Hr,Ht,H);
 float tv=folia(p,sc,sd,sun);
 tv=mix(tv,.6,.3*(1.-side)*(1.-nt)*(1.-isl));
 v=mix(v,tv,ta);
 // rock in relief, lit from the sun's side, with shrubs draping over its top edge
 vec2 r0=vec2(0),rx=vec2(0),ry=vec2(0);
 for(int i=0;i<uNF;i++){ivec2 q=min(ivec2(gl_FragCoord.xy)+ivec2(i==1?1:0,i==2?1:0),ivec2(uC.xy));vec4 t=texelFetch(uRk,q,0);
  vec2 r=vec2((t.r*65280.+t.g*255.)/65535.*.08-.03,t.b);if(i==0)r0=r;else if(i==1)rx=r;else ry=r;}
 vec3 nr=normalize(vec3(-(rx.x-r0.x)/pe,-(ry.x-r0.x)/pe,1.));
 vec3 ld=normalize(vec3(.5*sun,.72,.48));
 float rel=clamp(dot(nr,ld)/ld.z,0.,2.2);
 float ao=.62+.38*smoothstep(-.005,.008,r0.x);
 float rv=r0.y*(.05+lit*rel)*ao*(1.-.4*wet);
 rv+=wet*.7*smoothstep(.9,.98,vn(p*vec2(420.,300.)+sd))*smoothstep(1.,1.6,rel);
 float ra=smoothstep(Hr+pw.y,Hr-pw.y,H)*(1.-smoothstep(Hd-pw.y,Hd+pw.y,H)*smoothstep(.4,.6,fb(p*vec2(30.,22.)+sd+9.,4)));
 v=mix(v,rv,ra);
 // fallen rubble at the foot of the walls
 float Hq=-hc+(.012+.06*pow(fb(vec2(u*2.6,sd+6.),4),1.3))*smoothstep(.0,.6,side+(1.-exp(-ad/.09)));
 float qa=smoothstep(Hq+pw.y*1.5,Hq-pw.y*1.5,H+.004*(vn(p*vec2(300.,200.))-.5));
 v=mix(v,rubble(p,sd,sun)*(.55+.6*lit),qa);
 #if PLC==5
 v=mix(v,.78,smoothstep(.45,1.,D)*.3*max(max(ra,ta),qa));
 #endif
#endif
#if SCP==1
 o=enc(v);
#elif SCP!=3
#if SCP==2
 float v=dec(texelFetch(uSv,ivec2(gl_FragCoord.xy),0));
#endif
 // water
 float wa=0.;
 #if PLC==3
 {
  // a river-wide curtain: threads all of one fineness, whiter and thicker toward the foot
  float Hl=lip-vy,kk=clamp((Hl-H)/(Hl+hc),0.,1.);
  float th=.32+.68*smoothstep(.4,.75,fb(vec2(u*110.,kk*1.3+sd*4.),4))*(.7+.3*vn(vec2(u*380.,kk*5.)));
  th=mix(th,1.,.45*kk*kk);
  if(ft>2.5)th*=smoothstep(.48,.6,fb(vec2(u*24.,sd+5.),4)+.12*kk)*(.6+.4*smoothstep(.4,.6,fb(vec2(u*70.,sd+2.),4)));
  if(ft>.5&&ft<1.5){th*=1.-.75*smoothstep(.06,.0,abs(kk-.53));th=max(th,.95*exp(-pow((kk-.47)/.022,2.))*(.6+.4*vn(vec2(u*90.,sd))));}
  wa=th*(1.-isl)*smoothstep(Hl+.004,Hl-.004,H+.003*vn(vec2(u*120.,sd)))*step(-hc,H)*.93*(1.-side);
 }
 #else
 if(ft<2.5){
  int nf=ft<.5?1:ft<1.5?3:2;float l2=lip-.13,l3=lip-.25;
  for(int i=0;i<uNF;i++){if(i>=nf)break;
   vec4 q=ft<.5?vec4(fx,lip,pool,.026):ft<1.5?(i==0?vec4(fx,lip,l2,.016):i==1?vec4(fx+.004,l2,l3,.026):vec4(fx-.006,l3,pool,.034)):vec4(fx+(i==0?-.035:.03),lip-(i==0?0.:.02),pool,i==0?.02:.014);
   float w1=ft<.5?.05:ft<1.5?.025:.03;
   wa=max(wa,fall(p,q.x,q.y,q.z,q.w*uC.z,w1*uC.z,sd+float(i)*.3));
   if(ft>.5&&ft<1.5&&i>0)wa=max(wa,.85*exp(-pow((p.y-q.y+.003)/.008,2.))*smoothstep(.035+.03*float(i),.012+.015*float(i),abs(p.x-q.x))*(.6+.4*vn(vec2(p.x*90.,sd))));
  }
 }else{
  float k=clamp((lip-p.y)/(lip-pool),0.,1.);
  float hw=(.05+.06*k)*uC.z,dx=p.x-fx;
  float th=.3+.7*smoothstep(.4,.75,fb(vec2(dx*40.,p.y*1.2+sd*4.),4))*(.7+.3*vn(vec2(dx*260.,p.y*4.)));
  wa=smoothstep(hw,hw*.6,abs(dx))*th*smoothstep(lip+.004,lip-.004,p.y)*step(pool,p.y)*.9;
 }
 #endif
 v=mix(v,.97,wa*(1.-side));
 // the pool: dark glassy water, the sky and the fall mirrored and smoothed by the long exposure, foam drifting off
 float Hp=-hc+.003*(vn(vec2(u*30.,sd))-.5);
 float pa=smoothstep(Hp+pw.y,Hp-pw.y,H);
 // down the valley: the floor nearer than the fall's pool, and the river winding down it from the fall toward the lens,
 // narrow far off and wide near, swinging away from each spur's toe (the spurs are drawn over it below)
 #if PLC==5
 // (seen from higher up than the gorge's camera, so the floor opens out between the spurs: eye .15 over the pool)
 float sN=uF.w,hv=.15,vv=pool+hv,Zg=hv/max(vv-p.y,1e-3),lam=(.85/min(Zg,1.)-1.)/.45;
 float wr=(.022+.02*(1.-min(Zg,1.))+.03*smoothstep(.8,1.,Zg))/Zg;
 float xr=fx-sN*cos(3.14159*lam)*max(-.17+.24*smoothstep(1.,2.,lam)-.13*smoothstep(2.,3.,lam)-.04*smoothstep(3.,4.,lam)+1.1*wr,0.)*smoothstep(-.6,.2,lam);
 float rq=abs(p.x-xr+.2*wr*(fb(vec2(Zg*7.,sd+4.),4)-.5)),gm=smoothstep(pool+pe,pool-pe,p.y),Xg=(p.x-fx)*Zg;
 float fl=.12+.16*fb(vec2(Xg*30.,Zg*14.)+sd,4)+.05*vn(vec2(Xg*160.,Zg*60.));
 fl=mix(fl,.26+.1*vn(vec2(Xg*90.,Zg*40.)),smoothstep(2.,1.2,rq/wr));
 fl=mix(fl,.6,smoothstep(.5,1.,Zg)*.55);
 v=mix(v,fl,gm);
 pa=gm*smoothstep(wr+pe,wr-pe,rq);
 #endif
 if(pa>0.){
  float Zp=hc/max(vy-p.y,1e-3),X=dxr*Zp;
  #if PLC==5
  Zp=min(Zg,1.);X=(p.x-xr)*Zp;
  #endif
  float Hm=(vy-p.y)*D-2.*hc+.008*(vn(vec2(X*50.,Zp*7.))-.5);
  float rf=mix(.05+.3*lit,.22,smoothstep(Hr-.02,Hr+.02,Hm));
  rf=mix(rf,.95,smoothstep(Ht-.03,Ht+.03,Hm));
  rf=mix(rf,.85,smoothstep(.045,.01,ad)*smoothstep(lip-vy+.02,lip-vy-.02,Hm)*(1.-side));
  #if PLC==3
  rf=mix(rf,.75,smoothstep(lip-vy+.02,lip-vy-.02,Hm)*smoothstep(-hc+.01,-hc+.03,Hm)*(1.-side));
  #endif
  // foam drifting off the plunge in slow curving lines and eddies, drawn out by the long exposure
  float zz=1.-Zp,psi=X*(1.+1.4*zz)+.05*sin(zz*7.+sd)+.035*sin(X*11.-zz*6.+sd*2.)+.06*zz*zz*sin(X*4.+sd);
  vec2 fq=vec2(psi*34.+sd,zz*2.2+sd);
  float fm=fb(fq,4);
  float foam=smoothstep(.56,.74,fm)*(.25+.75*exp(-zz*2.5))*smoothstep(.0,.08,zz+.02);
  #if PLC==5
  foam=max(foam,smoothstep(.64,.74,fb(vec2(X*10.+sd,zz*4.),4))*smoothstep(.15,.5,zz)*(.6+.4*vn(vec2(X*80.,zz*20.))));
  #endif
  #if PLC==5
  rf=mix(.92,.3,smoothstep(.3,1.,rq/wr));
  #endif
  float pv=.03+.45*rf+.45*foam*(.75+.25*vn(fq*vec2(12.,40.)));
  #if PLC==5
  pv+=.2*rf;
  #endif
  v=mix(v,pv,pa);
 }
 // mist off the plunge
 float mi=exp(-pow(dxr/.13,2.)-pow((p.y-pool-.02)/.055,2.))*(.45+.55*fb(p*vec2(7.,11.)+sd+3.,4));
 mi+=.25*exp(-pow(dxr/.05,2.))*smoothstep(lip,pool,p.y)*fb(p*vec2(10.,4.)+sd,4);
 #if PLC==4
 mi*=.55;
 #endif
 #if PLC==3
 {mi=(1.-side)*exp(-pow((p.y-pool-.012)/.035,2.))*(.45+.55*fb(p*vec2(7.,11.)+sd+3.,4));
  float hy=max(p.y-pool,0.),xm=p.x+uG.z*.27;
  mi+=.8*exp(-pow(xm/(.05+.4*hy),2.))*smoothstep(lip+.1,pool,p.y)*(.35+.65*fb(vec2(xm*8.,p.y*5.)+sd+6.,4));}
 #endif
 v=mix(v,.9,clamp(mi*.85,0.,.8));
 #if PLC==5
 // the spurs, far to near: each a wooded hillside that comes in from one side, alternately left and right, its skyline
 // falling from high at the plate's edge to a toe past the middle, so each crosses in front of the one behind; crowns
 // lump its edge and mottle its face (bigger on nearer spurs); distance bleaches them, a thin haze lies at each foot
 for(int i=0;i<uNF+2;i++){float fi=float(i),t=fi*.25,Zi=.85/(1.+.45*fi),si=sN*(fract(fi*.5)<.25?1.:-1.),fr=step(fi,1.5);
  // the two farthest come down to the head's flanks at the height of its rim, so the fall's cliff stands between them;
  // their noses are steep and lumped sideways by the crowns on them
  float cs=mix(.012,.05,t),yg=vv-hv/Zi,ki=i<2?-.17:i==2?.07:i==3?-.06:-.1;
  float ex=si*(p.x-fx)+ki+fr*(.02*abs(2.*vn(vec2(p.y*50.,fi*3.+sd))-1.)+.01*abs(2.*vn(vec2(p.y*130.,fi*5.+sd))-1.)),uu=ex/(.8+ki);
  float y0=yg+max(lip+.075-yg,0.)*fr,top=(i==0?.38:i==1?.44:i==2?.46:i==3?.56:.66)+.06*(h1(fi+sd)-.5);
  float sk=y0+(top-y0)*pow(clamp(uu,0.,1.3),1.1)+min(ex,0.)*mix(1.5,3.,fr)-fr*40.*min(ex,0.)*min(ex,0.)+(.07*(fb(vec2(p.x*1.8+fi*3.1,sd+fi),4)-.5)+.025*(fb(vec2(p.x*6.+fi,sd+fi*2.),4)-.5))*smoothstep(.0,.25,uu)
   +cs*(.75*abs(2.*vn(vec2(p.x/cs,fi*7.+sd))-1.)+.35*abs(2.*vn(vec2(p.x/cs*2.3,fi*5.+sd+3.))-1.));
  float fy=yg-mix(.12,.6,t*t)*max(ex,0.)+.01*(vn(vec2(p.x*20.,fi+sd))-.5);
  float m=smoothstep(sk+pe,sk-pe,p.y)*smoothstep(fy-pe,fy+pe,p.y);
  float b=mix(.72,.06,pow(t,.7)),vs=max(b+mix(.18,1.1,t)*(folia(p,mix(110.,15.,t),sd+fi*3.7,sun)-.15),.015)*(.75+.5*fb(vec2(ex*7.+p.y*3.,p.y*1.2)+fi*4.1+sd,4));
  // volume: gullies running down the slope, and the nose rounding away into shade (or light, toward the sun)
  vs*=1.-.22*smoothstep(.5,.72,fb(vec2(ex*9.+p.y*2.5,p.y*.7)+fi*2.3+sd,4))-fr*.3*smoothstep(.08,.0,ex)*(sun*si>0.?-.5:1.);
  // the crowns along a far crest stand darker against the sky; the haze thickens down toward each foot
  vs*=1.-.18*(1.-t)*exp(-max(sk-p.y,0.)/.012);
  vs=mix(vs,min(b+.22,.86),.65*exp(-max(p.y-fy,0.)/(.015+.03*t+.09*fr)));
  v=mix(v,vs,m);
 }
 #endif
#endif
#if SCP==2
 o=enc(v);
#elif SCP==3
 float v=dec(texelFetch(uSv,ivec2(gl_FragCoord.xy),0));
#endif
#if SCP==0||SCP==3
 // boulders in the pool and against the wall feet: every one its own size, outline and lean, one near and cropped
 #if PLC!=5
 for(int k=0;k<uNF+2;k++){float fk=float(k),hA=h1(fk*3.1+sd),hB=h1(fk*5.3+sd+1.),hC=h1(fk*7.9+sd+2.);
  float Zk=k==0?.3:k==1?.36+.1*hA:.45+.5*hA,Xk=k==0?-.12:k==1?.085*(hB<.5?-1.:1.)*(.8+.3*hC):(hB-.5)*.25;
  float rk=(k==0?.04:k==1?.016:k==2?.032:k==3?.009:.018)*(.85+.3*hC);
  vec2 c0=vec2(fx+Xk/Zk,vy-hc/Zk);float s=rk/Zk;
  vec2 q=(p-c0)/s;q.x=q.x*(.75+.6*hB)+.25*(hA-.5)*q.y;
  float ex=1.3+2.6*hB,ht=.45+.45*hA;
  float yt=ht*(1.-pow(abs(q.x),ex))*(1.+.35*(vn(vec2(q.x*1.6+fk*3.7,sd))-.5))+.3*ht*(hC-.5)*q.x+.08*(vn(vec2(q.x*7.,fk*5.+sd))-.5);
  float e=pe/s*1.2;
  float ins=smoothstep(e,-e,abs(q.x)-1.+.18*vn(vec2(q.y*2.5,fk*4.1+sd)))*smoothstep(-e,e,yt-q.y)*smoothstep(-e,e,yt*.8+q.y);
  float ab=ins*smoothstep(-e,e,q.y);
  vec3 nb=normalize(vec3(q.x*1.1+.8*(vn(q*2.6+fk*7.)-.5),q.y/max(yt,.05)*.9+.7*(vn(q*2.6+fk*7.+9.)-.5),.45));
  float bl=.025+.3*pow(max(dot(nb,normalize(vec3(.5*sun,.8,.35))),0.),2.2);
  bl*=(.7+.6*vn(q*vec2(9.,13.)+fk*4.))*(1.-.5*smoothstep(.2,.0,q.y));
  float rim=exp(-pow(q.y/(2.*e+.05),2.))*smoothstep(1.2,.6,abs(q.x))*(.5+.5*vn(vec2(q.x*20.,fk)));
  v=mix(v,bl,ab);
  v=mix(v,.05+.2*bl,ins*(1.-ab)*.75);
  v=mix(v,.85,rim*.5*step(1.5,fk));
 }
 #endif
 // what stood near the camera (some places only): an overhang of rock with ferns across the top, or a bank along the
 // bottom: one dark silhouette with a few big stones on its edge, lit from the sun's side
 #ifdef FRAME
 {
  vec2 a=vU-.5;float pv=fwidth(vU.y)*1.5,sx=a.x*uF.w;
  #if PLC==2||PLC==4
  {float yo=.5-uF.x*(.12+.22*smoothstep(-.45,.45,sx))+.05*(fb(vec2(sx*5.,sd+1.),4)-.5)+.012*(vn(vec2(sx*40.,sd))-.5);
   float om=smoothstep(yo-pv,yo+pv,a.y);
   float hang=smoothstep(.0,.08,a.y-yo+.11*fb(vec2(sx*26.,a.y*2.+sd),4)*smoothstep(.15,.5,fb(vec2(sx*4.,sd+5.),4)));
   v=mix(v,.09+.1*fb(a*vec2(14.,10.)+sd,4),max(hang*.8,om*(.85+.15*vn(a*90.))));}
  #else
  {float yb=bankY(sx,sd);
   float bm=smoothstep(yb+pv,yb-pv,a.y);
   v=mix(v,.045+.05*fb(a*vec2(6.,5.)+sd,4),bm);
    for(int i=0;i<uNF+1;i++){float fi=float(i),hx=h1(fi*2.7+sd),hy=h1(fi*4.1+sd+1.);
     float cx=-.4+.25*fi+.08*hx,r=.022+.03*hy,cy=bankY(cx,sd)+.4*r;
     vec2 q=(vec2(sx,a.y)-vec2(cx,cy))/vec2(r*(1.2+.5*hx),r);
     float d=length(q)+.3*(vn(q*1.8+fi*5.)-.5)+.12*(vn(q*5.+fi)-.5);
     float sm=smoothstep(1.+pv/r,1.-pv/r,d)*step(-.6,q.y);
     float sl=dot(normalize(vec3(q.x*uF.w+.6*(vn(q*3.+fi*2.)-.5),q.y+.4,.7)),normalize(vec3(.5*sun*uF.w,.8,.4)));
     v=mix(v,(.035+.3*pow(max(sl,0.),1.5))*(.7+.6*vn(q*vec2(9.,6.)+fi)),sm);}
  }
  #endif
 }
 #endif
 o=vec4(clamp(v,0.,1.),0,0,1);
#endif
}
`,k=o+s+`in vec2 vU;out vec4 o;uniform vec4 uA,uB,uC;uniform int uNF;
float h1(float x){return fract(sin(x*78.233+.31)*43758.5453);}
#if SUBJ==1
// craters at one scale on the moon's (longitude, latitude): bowls with a raised rim, each its own size; returns the
// height's gradient and how much of the floor lies in the rim's shadow (sun along t, tan of its height te)
vec3 crat(vec2 s,float g,float pr,float sd,vec2 t,float te){
 vec2 c=s/g,ci=floor(c),gr=vec2(0.);float sh=0.;
 for(int j=0;j<uNF;j++)for(int i=0;i<uNF;i++){vec2 id=ci+vec2(float(i-1),float(j-1));
  float a=hs(id+sd),b=hs(id+sd+3.7),e=hs(id+sd+7.3),ex=step(a,pr);
  vec2 cc=id+.5+.5*(vec2(b,e)-.5);float r=.14+.34*b*b*b;
  vec2 q=(c-cc)/r;float x=length(q)*(1.+.12*(vn(q*2.3+id*7.1)-.5));
  float rm=exp(-pow((x-1.)*4.,2.))*(.7+.6*vn(q*4.+id));
  float dh=(x<1.?.44*x:0.)-2.4*rm*(x-1.);
  gr+=ex*dh*q/max(length(q),1e-4);
  float ot=dot(q,t),lam=-ot+sqrt(max(1.-dot(q,q)+ot*ot,0.)),dep=.22*(1.-x*x)+.06;
  sh=max(sh,ex*step(x,1.)*smoothstep(-.04,.04,dep-lam*te));}
 return vec3(gr,sh);}
#endif
#if SUBJ==4
vec3 bary(vec2 p,vec2 a,vec2 b,vec2 c){vec2 v0=b-a,v1=c-a,v2=p-a;float d=v0.x*v1.y-v1.x*v0.y;float l1=(v2.x*v1.y-v1.x*v2.y)/d,l2=(v0.x*v2.y-v2.x*v0.y)/d;return vec3(1.-l1-l2,l1,l2);}
// the corners of pyramid k (0 the second, 1 the great): apex, left, front, right. Low and broad as the real ones seen
// three-quarters on (n14): the outline's edges at about 40 and 46 degrees, the height under half the width, the second
// the same slopes at .56 the size; the front corner is set so that the sun's face is always the wider (the shaded face
// 30 to 42 in 100 of the outline), the far corner of the wide face a little nearer
void pg(int k,float gy,float sf,float sd,out vec2 A,out vec2 L,out vec2 M,out vec2 Rr){float sc=k==0?.56:1.,B=(.56+.04*uB.y)*sc;
 A=k==0?vec2(.22+.04*uB.x,gy+.008+.47*B):vec2(.01+.05*(uB.x-.5),gy+.47*B);
 L=vec2(A.x-.55*B,gy+(k==0?.008:-.002));Rr=vec2(A.x+.45*B,gy+(k==0?.01:.008));
 float fM=.3+.12*h1(sd*1.7+4.+float(k));fM=sf>.5?fM:1.-fM;
 if(sf>.5)Rr.y-=.02*sc;else L.y-=.02*sc;
 M=vec2(mix(L.x,Rr.x,fM),gy-(k==0?.014:.06));}
// a pyramid of stepped courses seen three-quarters on: apex A, base corners L (left), M (front), Rr (right); the face
// toward the sun (sf: 0 left, 1 right) a light grey under the white sky, the other a middle grey a little filled from
// the sand below. From where the whole pyramid fits on a plate a course of its two hundred is a hairline (n14): the
// treads and risers fade to the face's plain tone once a course is under about two pixels, so the face is tone and
// weathering, a fine level grain, single blocks only a faint tooth along the outline and the arris; the faces scarred
// with pale chutes of rubble and weathered patches; heaps of fallen stone and drift climbing the foot at the corners
// and mid-face. cp: a smoother, paler cap of casing over the top fifth (the second pyramid)
float pyr(vec2 p,vec2 A,vec2 L,vec2 M,vec2 Rr,float sf,float ps,float v,float sd,float N,float cp){
 float bn=fb(p*vec2(22.,30.)+sd,4),rb=(.55+.6*vn(p*vec2(160.,640.)))*(.75+.4*fb(p*80.+sd,4)),Ht=A.y-.5*(L.y+Rr.y),r0=h1(sd+.3),cv=smoothstep(1.2,3.,Ht/(N*ps));
 for(int fc=0;fc<uNF-1;fc++){float ff=float(fc),sl=fc==int(sf)?1.:0.;vec2 E0=fc==0?L:M,E1=fc==0?M:Rr;
  vec3 b=bary(p,E0,E1,A);float h=b.z,W=length(E1-E0),cwd=W*(1.-h);
  float c=h*N+.18*sin(h*N*.9+ff*2.3+sd)+.12*sin(h*N*2.3+sd*1.7),ci=floor(c),cf=fract(c);
  float xa=b.y/max(b.x+b.y,1e-4)*cwd,xb=cwd-xa,bw=W/(130.+40.*h1(ci+sd)),u=xa/max(cwd,1e-4);
  // weathering in broad patches, and the chutes: pale streaks of spilled rubble running straight down the face from a
  // point high on it, widening toward the foot
  float mo=.5+.28*sin(u*6.1+h*3.3+sd+ff*2.)+.22*sin(u*3.7-h*7.9+sd*1.3+ff);
  float cu=xa/W*13.+ff*17.+sd*.7+.6*(mo-.5),cr=h1(floor(cu)+sd);
  float ch=step(.62,fract(cr*5.3))*smoothstep(.16+.3*(1.-h),.04+.1*(1.-h),abs(fract(cu)-.5))*smoothstep(.42+.4*cr,.3+.4*cr,h);
  float bi=floor((xa+h1(ci*1.7+sd)*bw)/bw),hb=hs(vec2(ci,bi)+sd);
  float cap=cp*step(.8+.04*(fract(hb*9.7)-.5)+.05*(mo-.5),h);
  float st=(1.-cf)*W/(2.*N)*(1.-cap);
  // the outer edge loses blocks; at the arris the left face's courses run on past it and the right face's stop short or
  // run over by a few blocks, so the meeting steps course by course
  float xo=fc==0?xa:xb,xi=fc==0?xb+4.*bw:xa-bw*(1.2*(2.*fract(hb*7.3)-1.)+3.*(mo-.5))+.5*st;
  float hole=step(fract(hb*13.1),.25)*step(xo,bw*(1.+1.5*fract(hb*3.7)));
  float top=.955+.02*fract(hb*11.3);
  float ins=smoothstep(-ps,ps,xo+st)*smoothstep(-ps,ps,xi)*smoothstep(-ps,ps,b.x+b.y)*step(h,top)*(1.-hole)*step(0.,h+.002);
  float lit=sl>.5?.68:.37;
  float bk=1.+.06*(hb-.5)*cv+.12*(bn-.5);
  float tr=smoothstep(.72,.8,cf),sh=smoothstep(.16,.04,cf);
  float t0=lit*bk*(1.+cv*((sl>.5?.07:.15)*tr-.15*sh));
  t0+=(1.-sl)*.07*smoothstep(.4,.0,h)+.15*(mo-.5)+.045*sin(h*47.+sd*3.+2.*sin(h*13.+ff))*(.5+.5*sin(u*5.+sd))+.08*(rb-.85);
  t0=mix(t0,(lit+.08)*(.85+.18*rb),ch*(.6-.35*cp));
  t0=mix(t0,(lit+.1)*(.95+.1*mo)*(.97+.06*bk),cap);
  v=mix(v,t0,ins);}
 // heaps of fallen stone and drifted sand against the foot, along the outline's base (one profile across both faces):
 // a tenth to a fifth of the height at the three corners and the middle of each face, ragged, a low skirt of rubble
 // everywhere between, sloping off past the outer corners and spilling out over the sand in front
 float w=Rr.x-L.x,uq=(p.x-L.x)/w,hj=.5+.5*sin(p.x*170.+sd)*sin(p.x*61.+sd*2.),hk=.5+.5*sin(p.x*97.+sd*1.3);
 bool lf=p.x<M.x;float by=mix(M.y,lf?L.y:Rr.y,clamp((p.x-M.x)/((lf?L.x:Rr.x)-M.x),0.,1.));
 float qf=uq*4.+.5,qi=floor(qf),qt=abs(fract(qf)-.5)*2.;
 float hh=max((.04+.07*fract(r0*(qi*7.13+3.1)))*(qi<.5||qi>3.5?.6:1.)*max(1.-qt*qt*2.4,0.)*step(-.5,qi)*step(qi,4.5)*smoothstep(-.02,.03,uq)*smoothstep(1.02,.97,uq),.02*step(0.,uq)*step(uq,1.))*(.75+.3*hj+.25*hk)*Ht,dep=(.012+.02*hk)*Ht*step(-.05,uq)*step(uq,1.05);
 float yh=(by+hh-p.y)/ps,hm=clamp(.5*yh+.5,0.,1.)*clamp(.5*(p.y-by+dep)/ps+.5,0.,1.)*step(.001,hh+dep),sl=lf==(sf>.5)?0.:1.;
 v=mix(v,(sl>.5?.6:.42)*(.84+.2*rb)*(1.+(.06+.08*sl)*clamp(1.-yh/8.,0.,1.)),hm);
 return v;}
#endif
#if SUBJ>=3
// a rope or spar from a to b, sagging by sg of its length, its width wandering and now and then lost (br); returns its
// cover of the pixel (ps: the pixel in the same units), so a line finer than a pixel is drawn faint, not thick
float rope(vec2 p,vec2 a,vec2 b,float sg,float wd,float ps,float k,float br){
 vec2 ba=b-a;float t=clamp(dot(p-a,ba)/dot(ba,ba),0.,1.);
 float d=length(p-a-ba*t+vec2(0.,sg*4.*t*(1.-t)*length(ba)));
 float w=wd*1.7*(1.+.15*sin(t*7.3+k*3.1)+.1*sin(t*17.9+k*5.3));
 return min(w/ps,1.)*smoothstep(ps*1.1+w*.5,w*.25,d)*step(.07*br,h1(floor(t*23.+k*7.7)));}
#endif
#if SUBJ==3
vec4 vn4(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return textureLod(uN,(i+f+.5)*(1./256.),0.);}
// a full-rigged ship seen three-quarters from the side at slack water, in hull lengths (bow toward +x, the waterline
// at 0): the dark hull with its pale strake and ports, three raked masts with tops and crosstrees, the yards crossed
// with the sails furled on them in pale rolls, the standing rigging, the bowsprit, the spanker's boom and gaff
float ship(vec2 q,float ps,float v,float sd){
 float u=q.x,w=q.y;
 for(int m=0;m<uNF;m++){float fm=float(m),u0=m==0?.27:m==1?.01:-.25,Hm=(m==0?1.:m==1?1.08:.82)*(.96+.08*h1(fm+sd));
  float hT=.43*Hm,hX=.72*Hm,sh0=.11;
  vec2 B=vec2(u0,sh0),T=vec2(u0-.035*hT,hT),X=vec2(u0-.035*hX,hX),Hd=vec2(u0-.035*Hm,Hm);
  float pu=m==1?.27:.01,pH=m==1?1.:1.08;vec2 PT=vec2(pu-.035*.43*pH,.43*pH),PX=vec2(pu-.035*.72*pH,.72*pH);
  // the sails furled on the yards in pale lumpy rolls lit from above (the yards themselves are drawn with the rigging)
  for(int j=0;j<uNF+1;j++){float fj=float(j),hy=(j==0?.34:j==1?.54:j==2?.75:.89)*Hm;
   float hl=(j==0?.19:j==1?.155:j==2?.11:.075)*Hm*.6*(m==2?.82:1.)*(.92+.16*h1(fj+fm*4.+sd));
   if(m==2&&j==0)hl*=.0;
   vec2 c=vec2(u0-.035*hy,hy),a=c-vec2(hl,-.006),b=c+vec2(hl,-.006);
   float t=clamp((u-a.x)/(b.x-a.x),0.,1.),yl=mix(a.y,b.y,t)+.006*t*(1.-t)*4.;
   float th=(.013+.0024*sin(t*31.+fj*3.1+fm*5.+sd)+.0016*sin(t*73.+fj+sd))*(1.-.35*fj/3.)*smoothstep(.0,.08,t*(1.-t)),dy=w-yl;
   float sl=smoothstep(-ps,ps,dy+.001)*smoothstep(th+ps,th-ps,dy)*step(u,b.x)*step(a.x,u)*step(.001,hl);
   v=mix(v,.5+.3*clamp(dy/max(th,1e-4),0.,1.)+.06*hs(floor(vec2(u*300.,w*200.))),sl);}
  // standing rigging (shrouds fanning down to the chain plates, backstays, the stays forward), then the mast in three
  // pieces, the top and the crosstrees, and on the fore the bowsprit and jib-boom, on the mizzen the spanker's boom and
  // gaff, and the yards: one loop and one call, so the program stays small
  for(int k=0;k<uNF*8+2;k++){float fk=float(k);vec2 a,b;float wd=.0022,sg=.01,tn=.13,br=1.;
   if(k<4){a=vec2(u0-.1+.036*fk,sh0+.005);b=T;}
   else if(k<7){a=T+vec2(-.03+.02*(fk-4.),0.);b=X;wd=.0017;}
   else if(k<9){a=X+vec2(-.012+.024*(fk-7.),0.);b=Hd-vec2(0.,.04*Hm);wd=.0013;}
   else if(k<11){a=vec2(u0-.16-.06*(fk-9.),sh0);b=fk<9.5?X:Hd;wd=.0015;sg=.02;}
   else if(k==11){a=T;b=m==0?vec2(.66,.2):vec2(pu+.02,sh0+.01);sg=.025;}
   else if(k==12){a=X;b=m==0?vec2(.8,.23):PT;sg=.02;wd=.0018;}
   else if(k==13){a=Hd;b=m==0?vec2(.86,.245):PX;sg=.02;wd=.0014;}
   else if(k==14){a=T+vec2(.02,.01);b=m==0?vec2(.58,.16):PT+vec2(0.,-.1);wd=.0012;sg=.04;}
   else if(k>21){float fj=fk-22.,hy=(k==22?.34:k==23?.54:k==24?.75:.89)*Hm;
    float hl=(k==22?.19:k==23?.155:k==24?.11:.075)*Hm*.6*(m==2?.82:1.)*(.92+.16*h1(fj+fm*4.+sd))*(m==2&&k==22?0.:1.);
    vec2 c=vec2(u0-.035*hy,hy);a=c-vec2(hl,-.006);b=c+vec2(hl,-.006);sg=0.;br=0.;wd=.0045*(1.-.3*fj/3.);tn=.12;}
   else{sg=0.;br=0.;
    if(k==15){a=B;b=T+vec2(0.,.02);wd=.013;tn=.09;}
    else if(k==16){a=T-vec2(0.,.02);b=X+vec2(0.,.015);wd=.009;tn=.1;}
    else if(k==17){a=X-vec2(0.,.015);b=Hd;wd=.0055;tn=.11;}
    else if(k==18){a=T+vec2(-.035,0.);b=T+vec2(.03,.003);wd=.006;tn=.12;}
    else if(k==19){a=X+vec2(-.022,0.);b=X+vec2(.02,.002);wd=.004;tn=.12;}
    else if(k==20){a=m==0?vec2(.42,.13):vec2(-.27,.2);b=m==0?vec2(.68,.22):vec2(-.62,.165);wd=m==0?.008:m==2?.005:0.;tn=.1;}
    else{a=m==0?vec2(.6,.17):vec2(-.26,.4);b=m==0?vec2(.87,.25):vec2(-.52,.31);wd=m==1?0.:.004;tn=.11;}}
   v=mix(v,tn,rope(q,a,b,sg,wd,ps,k>21?fk-22.+fm*7.+sd:fk+fm*20.+sd*br,br));}
 }
 // the spanker's sail furled on its boom
 vec4 hn=vn4(q*vec2(30.,220.));
 v=mix(v,.6,smoothstep(.006+ps,.002,abs(w-.176-.035*(u+.27)/(-.35)-.005-.003*hn.a))*step(-.6,u)*step(u,-.3));
 // the hull: sheer rising to the ends, raked stern, the bow curving forward; dark paint, a pale strake with ports,
 // the rail catching the light, planking and weather
 float sh=.1+.05*pow(abs(2.*u),2.)+.012*u;
 float hm=smoothstep(-ps,ps,sh-w)*smoothstep(-ps,ps,w)*smoothstep(-ps,ps,u+.5-.15*w)*smoothstep(-ps,ps,.47+.45*w-u);
 float stk=smoothstep(-ps,ps,w-sh+.036)*smoothstep(-ps,ps,sh-.017-w);
 float pf=fract(u/.042+.3);
 float port=smoothstep(.4,.46,pf)*smoothstep(.95,.89,pf)*step(abs(u),.36)*smoothstep(-ps,ps,w-sh+.031)*smoothstep(-ps,ps,sh-.022-w);
 float ht=(.06+.06*hn.r+.02*hn.g)*(.85+.3*smoothstep(-.4,.4,u))+.12*smoothstep(sh-.007,sh-.002,w);
 ht=mix(ht,.62+.1*hn.b-.08*smoothstep(-.3,.3,-u),stk*(1.-port*.85));
 return mix(v,ht,hm);}
#endif
void main(){
 vec2 p=vec2((vU.x-.5)*.848,vU.y-.5);float sd=uA.x,pe=fwidth(p.x);
 // the bare mirror where nothing exposed it, faintly fogged
 float v=.018+.012*vn(p*40.+sd);
#if SUBJ==1
 // the moon, after the Harvard plates of 1851: lit as bright at the limb as in the middle, the seas one joined chain of
 // soft grey provinces, craters standing out only near the terminator, where the sun is low on them
 vec2 q=(p-uA.yz)/uA.w;float ca=cos(uB.z),sa=sin(uB.z);q=mat2(ca,sa,-sa,ca)*q;
 float r2=dot(q,q),rr=sqrt(r2),ew=pe*1.2/uA.w,disc=smoothstep(1.+ew,1.-ew,rr);
 vec3 n=vec3(q,sqrt(max(1.-r2,0.)));
 vec3 L=vec3(sin(uB.x)*uB.y,0.,cos(uB.x));float mu=dot(n,L);
 float cl=sqrt(max(1.-n.y*n.y,1e-4));
 vec2 s=vec2(asin(clamp(n.x/cl,-1.,1.)),asin(clamp(n.y,-1.,1.)));
 vec3 ea=vec3(n.z/cl,0.,-n.x/cl),no=vec3(-n.y*n.x/cl,cl,-n.y*n.z/cl);
 vec2 t=vec2(dot(L,ea),dot(L,no));t/=max(length(t),1e-4);float te=max(mu,0.)/sqrt(max(1.-mu*mu,1e-4));
 vec3 cr=vec3(0.);
 for(int k=1;k<uNF;k++){float g=k==1?.13:.045;vec3 c1=crat(s,g,k==1?.4:.42,sd+float(k)*9.,t,te);cr.xy+=c1.xy*(k==1?1.:.8);cr.z=max(cr.z,c1.z);}
 vec3 N=normalize(n-(cr.x/cl)*.55*ea-cr.y*.55*no);float mu2=dot(N,L);
 // the seas: grey provinces of every size joined into one irregular spread over one side of the disc, their edges
 // ragged (a noise field, not drawn shapes), wrinkled inside
 vec2 sw=s+.18*vec2(fb(s*1.7+sd+2.,4),fb(s*1.7+sd+6.,4));
 float bias=.18*dot(sw,uB.y*vec2(-.55,.6))+.1;
 float mf=fb(sw*.9+sd,4)+.35*fb(sw*2.4+sd+3.,4)+bias;
 float mare=smoothstep(.72,.79,mf)*(.8+.2*fb(s*9.+sd+1.,4));
 // a young rayed crater in the south, its pale streaks reaching a third of the way across, each its own length
 vec2 o2=(s-vec2(uB.w,-.6))*vec2(cl,1.);float d2=length(o2);vec2 dn=o2/max(d2,1e-4);
 float rl=.25+.6*vn(dn*3.1+sd+5.);
 float ray=smoothstep(.7,.95,vn(dn*11.+sd)+.3*vn(dn*31.+sd+2.))*smoothstep(rl,rl*.3,d2)*smoothstep(.03,.07,d2)*(.5+.5*vn(vec2(d2*40.,sd)+dn*20.));
 float hal=exp(-pow(d2/.05,2.))*(.7+.3*vn(o2*90.));
 // bright young rims and darker old floors over the highlands, seen at any sun (albedo, not relief)
 vec2 sc=s/.06,si=floor(sc),sf=fract(sc)-.5-.3*(vec2(hs(si+sd),hs(si+sd+1.))-.5);float sr=.12+.25*hs(si+sd+2.);
 float ab=smoothstep(.35,.0,abs(length(sf)/sr-1.))*step(.72,hs(si+sd+3.));
 float A=mix(.84,.56,mare)*(.88+.22*fb(s*4.+sd+3.,4))*(.93+.14*vn(s*55.))*(.95+.1*fb(s*16.+sd,4));
 A+=(.13*ray+.14*hal+.08*ab)*(1.-.4*mare);
 float F=smoothstep(-.02,.3,mu2)*smoothstep(-.07,.0,mu);
 F*=1.-.88*cr.z*smoothstep(.5,.2,mu);
 float mv=A*F*.95+.08*smoothstep(.88,1.,rr)*smoothstep(.05,.35,mu);
 v=mix(v,mv,disc);
#elif SUBJ==2
 // the total eclipse, after the Konigsberg plate of 28 July 1851: the moon's black disc, the corona pearly and uneven,
 // brightest in a thin ring at the limb and streaming out in a few broad unequal plumes that bend as they go, and small
 // bright prominences on the limb
 vec2 q=(p-uA.yz)/uA.w;float r=length(q);vec2 dn=q/max(r,1e-4);
 float ew=pe*1.2/uA.w,disc=smoothstep(1.+ew,1.-ew,r),x=max(r-1.,0.);
 float w=.1+.05*vn(dn*3.+sd);
 for(int k=0;k<4;k++){float fk=float(k),ak=uB[k],bd=(h1(fk+sd)-.5)*1.2*x;
  vec2 d2=vec2(cos(ak+bd),sin(ak+bd));float sg=.06+.16*h1(fk*3.+sd);
  w+=(.35+.9*h1(fk*5.+sd+1.))*exp((dot(dn,d2)-1.)/sg)*(fk<3.5?1.:.6);}
 float fil=.75+.5*vn(vec2(dot(dn,vec2(.6,.8))*7.+x*4.,dot(dn,vec2(-.8,.6))*7.-x*3.)+sd);
 float cor=.9*exp(-x/w)/(1.+.5*x)*fil*(.7+.6*vn(dn*2.2+sd+3.))+.3*exp(-x/.045)*(.85+.3*vn(dn*6.+sd))+.03*exp(-x/2.);
 for(int k=0;k<4;k++){float fk=float(k),ap=6.2832*h1(fk*7.+sd+2.),on=step(fk,1.+2.*h1(sd+9.));
  vec2 d3=vec2(cos(ap),sin(ap));float tg=dot(dn,vec2(-d3.y,d3.x))*r,ht=x;
  float pr=exp(-pow(tg/(.025+.02*h1(fk+sd+5.)),2.)-pow((ht-.02)/(.02+.03*h1(fk+sd)),2.))*step(0.,dot(dn,d3))*(.6+.6*vn(vec2(tg*60.,ht*60.)+fk*7.));
  cor+=.5*pr*on;}
 v=mix(min(v+1.-exp(-1.5*cor),.97),.012,disc);
#elif SUBJ==3
 // ships at a quay at slack water (the long exposure stills the water into a pale sheet and draws the hulls' reflections
 // down into soft smears, the masts' lost a little way below), a low far shore of sheds pale in haze, a blank sky
 float sS=uA.y,hy=-.05+.06*uA.z,pw=pe;
 v=.975-.035*smoothstep(.45,.0,p.y-hy);
 float hl=hy+.006+.022*fb(vec2(p.x*2.6+sd,1.),4)*smoothstep(-.1,.3,p.x*sS);
 float cw=.03+.02*h1(floor(p.x*9.+sd)),cx=p.x/cw+sd,ci=floor(cx),cf=fract(cx);
 float bh=hy+(.004+.014*h1(ci)*step(.3,h1(ci+5.)))*(.6+.4*smoothstep(.3,-.2,p.x*sS))+.007*(1.-abs(2.*cf-1.))*step(.55,h1(ci+2.));
 float ry=p.y>hy?p.y:2.*hy-p.y+.002*(vn(vec2(p.x*80.,p.y*400.))-.5);
 float shore=mix(.9,mix(.86,.72+.06*vn(vec2(p.x*500.,ry*300.))+.06*step(.6,fract(cx*3.+h1(ci))),smoothstep(bh+pw,bh-pw,ry)),smoothstep(hl+pw,hl-pw,ry));
 v=mix(v,shore,smoothstep(hl+pw,hl-pw,ry)+step(ry,bh+pw));
 if(p.y<hy){float dw=hy-p.y;
  float wat=.88-.14*smoothstep(0.,.45,dw)+.012*(vn(vec2(p.x*3.,p.y*240.))-.5)+.008*(vn(vec2(p.x*40.,p.y*900.))-.5);
  v=mix(wat,v*.95+.04,exp(-dw/.012)*.8);}
 for(int i=0;i<uNF;i++){float fi=float(i),on=i==0&&uA.w<.4?0.:1.;
  float Lh=(i==0?.17:i==1?.27:.44)*(.93+.14*h1(fi+sd)),yw=hy-(i==0?.03:i==1?.075:.2)-.01*h1(fi+sd+2.);
  float xc=(i==0?.17:i==1?-.13:.1)*sS+.04*(h1(fi+sd+4.)-.5),fs=i==1?sS:-sS,hz=i==0?.45:i==1?.2:0.;
  vec2 q=vec2((p.x-xc)*fs,p.y-yw)/Lh;float ps=pw/Lh,dq=-q.y;bool rf=dq>0.;
  vec2 qq=rf?vec2(q.x+.006*(vn(vec2(dq*60.,fi))-.5),dq*1.04):q;
  float vs=ship(qq,rf?ps*2.5+.006:ps,v,sd+fi*11.);
  v=mix(v,rf?vs*.8+.12:vs,on*(1.-hz)*(rf?.85*(dq<.13?1.:exp(-(dq-.13)/.1)):1.));
 }
#elif SUBJ==4
 // the pyramids at Giza from the edge of the cultivation (after the plates of the 1840s and 50s), in five planes, each
 // paler than the one before: rough stony ground at the lens, the pale plain, a low dark grove of date palms at one side
 // a kilometre in front of the stone, the great pyramid three-quarters on with one face in sun and one in shade, the
 // second behind it in haze; a bleached sky
 float vS=uB.z<.5?-1.:1.,sS=uA.y;vec2 pp=vec2(p.x*vS,p.y);
 float gy=-.11+.04*uA.z,pw=pe,sf=sS*vS>0.?1.:0.;
 v=.975-.04*smoothstep(.3,.0,p.y-gy);
 // the desert: a stony plateau a clear step under the sky in long low swells, darker, rougher and stonier toward the
 // lens, with a low broken scarp across it
 float dg=gy-p.y,hn=fb(vec2(p.x*5.,sd),4),R0=h1(sd+7.);
 float fd=fb(vec2(p.x*6.,dg*40./(dg+.05))+sd,4),sv=vn(p*vec2(300.,500.)),nr=smoothstep(.1,.4,dg);
 float sand=.57-.27*smoothstep(0.,.42,dg)+.12*(fd-.5)+(.05+.06*nr)*(sv-.5);
 float y2=gy-.13-.07*fract(R0*7.3)+.025*(hn-.5)+.008*(fd-.5);
 sand*=1.-.06*smoothstep(y2+pw,y2-pw,p.y)*smoothstep(.3,.45,hn);
 // stones: dark lumps with a pale top toward the sun and a short shadow on the ground away from it, sparse and small out
 // on the plain, larger and crowded toward the lens (a noise laid out in perspective, its edges roughened by the grain)
 vec2 ld=vec2(sf>.5?.3:-.3,.4),gq=vec2(pp.x*24./max(dg,.01),log(max(dg,.01))*42.)+sd*7.+.6*(sv-.5);
 float s0=vn(gq),s1=vn(gq+ld),st=mix(.92,.76,nr),sw=.03,on=smoothstep(.04,.1,dg);
 float m0=smoothstep(st,st+sw,s0)*on,m1=smoothstep(st,st+sw,s1)*on;
 sand*=1.-.35*m1*(1.-m0);
 sand=mix(sand,sand*(.6+.75*smoothstep(-.01,.06,s0-s1)),m0);
 float hz=gy+.004+.006*hn;
 v=mix(v,sand,smoothstep(hz+pw,hz-pw,p.y));
 // the second pyramid behind and to one side, pale with distance; then the great one, first throwing its shadow away
 // from the sun across the sand: a dark wedge from the shaded face's foot, soft at its far end
 vec2 A,L,M,Rr;
 for(int k=0;k<uNF-1;k++){float fk=float(k);pg(k,gy,sf,sd,A,L,M,Rr);
  // (the shadow is laid from the great one's corners just before it is drawn: one call site of pg)
  if(k==1){vec2 Cs=sf>.5?L:Rr;
   float sln=(.15+.12*R0)*(A.y-gy);vec2 Ts=mix(Cs,M,.5)+vec2((sf>.5?-.15:.15)*sln,-sln);
   vec3 sb=bary(pp,Cs,M,Ts);float sz=clamp(sb.z,0.,1.),se=min(min(sb.x,sb.y),sb.z)+.1*(fd-.5)*(sz+.3);
   v*=1.-.45*clamp(se/(.012+.1*sz)+.5,0.,1.)*clamp(3.3-3.3*sb.z,0.,1.)*step(p.y,hz);}
  float vp=pyr(pp,A,L,M,Rr,sf,pw,v,sd+fk*13.,k==0?77.:140.,k==0?1.:0.);
  v=k==0?mix(v,mix(vp,.9,.45),step(.001,abs(vp-v))):vp;}
 // a grove of date palms on the edge of the cultivation at one side: a low ragged understory of young palms and scrub,
 // over it two rows of crowded crowns at unequal heights, each wider than tall, its fronds drooping at the sides and
 // ragged at the tips, on a hair of a trunk; broken into clumps, smaller and paler toward its far end
 float ws=-sS*vS,gx=pp.x*ws,g0=-.16+.2*uA.w,ge=clamp((gx-g0)/(.43-g0),0.,1.),gz=.5+.5*ge;
 float gf=gy-.075-.035*ge+.004*(hn-.5);
 float cl=smoothstep(.27,.4,fb(vec2(gx*16.,sd+3.),4))*smoothstep(g0,g0+.04,gx);
 float ut=gf+(.004+.004*ge)*cl*(.6+.8*sv)*(.75+.25*sin(gx*400.+sd));
 float gc=smoothstep(ut+pw,ut-pw,p.y)*step(gf-pw,p.y)*step(.05,cl),tk=0.;
 for(int k=0;k<uNF-1;k++){float fk=float(k),cw=(.009+.007*ge)*(1.+.37*fk),cx=gx/cw+sd*(1.+.7*fk)+.5*fk,r=h1(floor(cx)+sd*3.1+fk*17.);
  float ht=(.004+.014*fract(r*7.3)*fract(r*7.3))*gz,wc=cw*(.62+.15*fract(r*3.1)),hc=.75*wc,ln=.25*(fract(r*9.1)-.5);
  float dx=(fract(cx)-.5-.2*(r-.5))*cw,qx=(dx-ln*ht)/wc,qy=(p.y-gf-ht)/hc,a=pw/hc,on=step(.1,r)*step(.25,cl);
  float spk=abs(sin(qx*4.7+r*11.)),yt=.75*sqrt(max(1.-qx*qx,0.))-.35*spk,yb=-.45-.6*qx*qx-.4*spk;
  gc=max(gc,on*step(abs(qx),1.)*smoothstep(yt+a,yt-a,qy)*smoothstep(yb-a,yb+a,qy));
  float tx=dx-ln*(p.y-gf);
  tk=max(tk,on*step(fk,.5)*step(.009*gz,ht)*clamp(1.-abs(tx)/(.5*pw+.0003*gz),0.,1.)*step(gf,p.y)*step(p.y,gf+ht));}
 float gt=.17+.07*(1.-ge)+.03*(sv-.5);
 v=mix(v,mix(gt,.2+.05*(1.-ge),tk*(1.-gc)),max(gc,.8*tk));
#endif
 o=vec4(clamp(v,0.,1.),0,0,1);
}`,L=o+s+`in vec2 vU;out vec4 o;uniform sampler2D uS;uniform vec4 uA,uB,uC;uniform int uT;
void main(){
 vec2 uv=vU;vec2 m=(uv-.5)*vec2(7.24,8.54);
 vec2 q=(m-vec2(0.,.08))/vec2(2.9,3.5);float r=length(q);
 float rb=.0004+.003*pow(smoothstep(.8,1.2,r),2.);
 float acc=0.,wt=0.;
 for(int i=0;i<uT;i++){float fi=float(i)+.5;float a=fi*2.39996;float rr=sqrt(fi/float(uT));
  vec2 d=vec2(cos(a),sin(a))*rr*rb*vec2(1.,.848);float w=1.-.6*rr*rr;acc+=w*texture(uS,uv+d).r;wt+=w;}
 float v=acc/wt;
 v*=1.-.3*r*r;
 float dens=.006+.93*pow(v,1.5);float dw0=winD(m,uA.x);
 // heavy tarnish: a broad brown-black frame creeping in over the picture's edges
 dens*=1.-uC.y*.75*exp(-max(-dw0,0.)/(.28+.2*fb(m*.5+uA.w*5.,4)));
 // tarnish: a sulphide film creeping in from the mat window edge
 float dw=dw0,din=max(-dw,0.);
 float wv=(.3+.22*fb(m*.6+uA.w*7.,4))*uA.y;
 float tau=uA.z*exp(-din/wv)*(.88+.24*fb(m*2.6+uA.w,3));
 tau+=.022*uA.z*fb(m*.7+uA.w*3.,3);
 // corrosion specks with small halos
 vec2 cg=m*7.;vec2 ci=floor(cg),cf=fract(cg)-.5;float h=hs(ci+uA.w*13.);
 // of every size from a pin-prick to a lentil, crowding toward the mat's edge where the air got in; few with a halo
 vec2 jt=(vec2(hs(ci+1.3),hs(ci+7.1))-.5)*.7;float dd=length(cf-jt)*(1.+.35*(vn(cf*7.+ci*3.1)-.5));
 float on=step(1.-uC.x*(.35+2.6*exp(-din/.5)),h)*step(.3,fb(m*.9+uA.w,2));
 float sz=hs(ci+3.),rs=.012+.12*sz*sz*sz;float spk=on*smoothstep(rs,rs*.35,dd);
 tau+=on*step(.72,hs(ci+5.3))*.07*exp(-dd*5./(.4+sz));
 // fingerprint: ridges of tarnish in a loop (they come in from one side, bend once round an off-centre core and go back
 // out, over a straight flow below; a triangle where the two meet), warped, broken into dashes, pressed harder on one side
 float fp=0.;
 if(uB.z>.5){vec2 e=m-uB.xy;e=mat2(.87,.5,-.5,.87)*e;float re=length(e/vec2(.75,1.)),fm=exp(-re*re*1.6)*smoothstep(.0,.3,fb(e*2.+3.,3));
  vec2 w=e+.05*vec2(fb(e*1.7+5.,3),fb(e*1.7+9.,3)),q=w-vec2(.14,.12);
  float ph=mix(w.y+.3,q.y>0.?length(q):abs(q.x),smoothstep(-.1,.15,q.y+.35-abs(q.x)*.5));
  fp=fm*smoothstep(.15,.6,.5+.5*sin(ph*140.))*smoothstep(.3,.55,vn(w*vec2(38.,30.)))*smoothstep(-.7,.5,e.x+.4*e.y);tau+=.06*fp*uC.w;}
 // wipe arcs and buffing hairlines
 float dmg=.12*pow(vn(vec2(m.x*.35+m.y*.4,m.y*70.)),9.)*smoothstep(.3,.7,vn(m*.8+5.))+.08*pow(vg(vec2(m.x*1.1+3.,m.y*120.)),10.);
 if(uB.w>.5){
  for(int k=0;k<3;k++){float fk=float(k);vec2 cc=vec2(hs(vec2(fk,uA.w))*6.-3.,hs(vec2(uA.w,fk+2.))*7.-3.5)+vec2(0.,-5.);
   float rk=5.+2.*hs(vec2(fk,7.));vec2 e=m-cc;float rho=length(e)-rk;float an=ang(e)-1.5708-(hs(vec2(fk+5.,uA.w))-.5)*.8;
   float band=exp(-rho*rho/.09)*smoothstep(.35,.1,abs(an));
   dmg+=band*pow(vn(vec2(rho*34.,an*6.+fk*9.)),5.)*1.6;}
 }
 o=vec4(dens,clamp(tau/.6,0.,1.),clamp(dmg,0.,1.),spk);
}`,u=o+s+`in vec2 vU;out vec4 o;uniform vec4 uE,uX,uY,uZ,uC,uM;uniform int uI,uNL;
float sdRB(vec3 p,vec3 b,float r){vec3 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.)-r;}
float rect2(vec2 p,vec2 b){vec2 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,q.y),0.);}
float map(vec3 p){
 float base=sdRB(p-vec3(0,0,.4),vec3(4.1,4.75,.4),.24);
 base=max(base,-sdRB(p-vec3(0,0,.98),vec3(3.62,4.27,.36),.05));
 float lid=sdRB(p-vec3(-8.36,0,.3),vec3(4.1,4.75,.3),.24);
 lid=max(lid,-sdRB(p-vec3(-8.36,0,.84),vec3(3.6,4.25,.36),.08));
 vec2 lq=p.xy-vec2(-8.36,0.);float pe=-rect2(lq,vec2(3.6,4.25));
 float pz=.47+.09*smoothstep(0.,.9,pe)-.02*smoothstep(.3,1.6,length(lq*vec2(.9,.7)))*0.;
 float padd=max(p.z-pz,-pe-.02);
 float sp=sdRB(p-vec3(-4.18,0,.2),vec3(.12,4.62,.2),.1);
 float pr=length(vec2(rect2(p.xy,vec2(3.5,4.15)),p.z-.64))-.055;
 return min(min(min(base,lid),min(padd*.8,sp)),min(pr,p.z));}
vec3 nrm(vec3 p){vec3 n=vec3(0);for(int i=0;i<uNL;i++){vec3 e=.004*(vec3((((i+3)>>1)&1),((i>>1)&1),(i&1))*2.-1.);n+=e*map(p+e);}return normalize(n);}
// stamped mat: the sight edge turned into the window, a row of fine beads, an engraved line, a stippled ground and in
// each spandrel a chased scroll with leaves, raised and burnished. returns (height, burnish)
float scroll(vec2 c,float dir){
 float r=length(c),a=ang(c)*dir;
 float s=a/6.2832-log(max(r,.02)/.07)/1.75,t=min(fract(s),1.-fract(s))*r*1.75;
 float arm=smoothstep(.034,.014,t)*smoothstep(.03,.07,r)*smoothstep(.62,.45,r);
 float t2=min(fract(s+.5),1.-fract(s+.5))*r*1.75;
 float lf=smoothstep(.07,.02,t2+.05*(.5+.5*cos(a*9.+r*14.)))*smoothstep(.1,.16,r)*smoothstep(.5,.34,r);
 float ros=smoothstep(.075,.04,r)*(.6+.4*smoothstep(.0,.6,cos(a*6.)));
 return max(arm,max(lf*.75,ros));}
float gFp=0.;
vec2 matH(vec2 m,float wk){
 float dw=winD(m,wk),ed=-rect2(m,vec2(3.5,4.15));
 float h=.22*smoothstep(-.01,.06,dw)+.05*smoothstep(.22,.3,dw);
 vec2 q=m-vec2(0.,.08);float an=ang(q/vec2(1.,1.2));
 float nb=uC.y>.5?200.:96.,pb=uC.y>.5?.048:.09;
 float bp=(fract(an*nb/6.2832)-.5)*pb*2.,bd2=(bp*bp+(dw-.13)*(dw-.13))/(pb*pb*.85);
 float bead=.2*sqrt(max(1.-bd2,0.));
 h+=bead-.07*exp(-pow((dw-.22)/.014,2.));
 h+=.22*smoothstep(.1,.18,ed)-.06*exp(-pow((ed-.3)/.014,2.))-.05*exp(-pow((ed-.37)/.012,2.));
 vec2 c=abs(m);
 float mo=0.;for(int k=0;k<uNL-2;k++){bool b=k>0;vec2 cc=c-(b?vec2(2.5,3.74):vec2(3.,3.28));mo=max(mo,scroll(b?cc.yx:cc,b?-1.:1.)*(b?.9:1.));}
 mo*=smoothstep(.3,.45,dw)*smoothstep(.38,.48,ed);
 // the stipple cannot be seen at arm's length: it fades with the pixel's footprint into a dull satin ground
 float peb=(.035*vn(m*70.)+.03*vg(m*130.))*(1.-smoothstep(.022,.04,gFp));
 float fld=smoothstep(.26,.34,dw)*smoothstep(.2,.3,ed);
 h+=.16*mo+peb*fld*(1.-mo);
 return vec2(h,max(max(mo,smoothstep(.3,.0,dw)),bead*4.));}
void main(){
 vec2 s=vU*2.-1.;vec3 rd=normalize(uZ.xyz+(s.x*uX.xyz+s.y*uY.xyz)*uE.w);vec3 ro=uE.xyz;
#ifdef GBM
 {vec2 q8=ro.xy+rd.xy*((.8-ro.z)/rd.z);if(rd.z<0.&&(abs(q8.x)>3.9||abs(q8.y)>4.55))discard;}
#endif
 float t=(1.3-ro.z)/rd.z;float d;vec3 p;
 for(int i=0;i<96;i++){p=ro+rd*t;d=map(p);if(d<.0015||t>200.)break;t+=d;}
 p=ro+rd*t;gFp=t*uC.z;
#ifdef GBM
 if(!(p.z>=.012&&!(p.x<-4.06&&p.z>.2)&&abs(p.x)<3.64&&abs(p.y)<4.29&&p.z<.76))discard;
#endif
 vec3 n=nrm(p);
 float ao=1.;{float a=0.,w=1.;for(int i=1;i<5;i++){float hh=.06*float(i);a+=w*(hh-map(p+n*hh));w*=.6;}ao=clamp(1.-a*2.2,0.,1.);}
 int id=1;vec3 al=vec3(0);float ro2=.5;
 vec3 lc=uM.x<.5?vec3(.03,.026,.024):uM.x<1.5?vec3(.12,.065,.032):uM.x<2.5?vec3(.2,.035,.03):vec3(.035,.075,.045);
 vec3 vc=uM.y<.5?vec3(.15,.035,.085):uM.y<1.5?vec3(.28,.03,.04):uM.y<2.5?vec3(.06,.11,.045):vec3(.035,.05,.2);
 bool inner=abs(p.x)<3.64&&abs(p.y)<4.29&&p.z<.76;
 vec2 tn=vec2(0);
 if(p.z<.012){id=0;
#ifndef GBM
  // the table: polished mahogany, a green leather writing top with a gilt tooled line, or green baize
  vec2 tq=mat2(.96,.28,-.28,.96)*p.xy;
  if(uM.z<.5){float gr=fb(vec2(tq.x*.9,tq.y*.05)+uC.w,4),fl=fb(vec2(tq.x*5.+3.*gr,tq.y*.3),4);
   al=.75*mix(vec3(.075,.028,.014),vec3(.16,.065,.03),smoothstep(.3,.75,gr+.35*(fl-.5)))*(.88+.24*vn(vec2(tq.x*60.,tq.y*2.)));
   ro2=.2+.16*smoothstep(.5,.8,fb(p.xy*.4+7.,3));tn=.015*vec2(vn(vec2(tq.x*20.,tq.y))-.5,0.);}
  else if(uM.z<1.5){float ty2=abs(abs(tq.y-.6)-6.5);float gl2=exp(-pow(ty2/.045,2.))+.7*exp(-pow((ty2-.22)/.025,2.));
   al=vec3(.035,.06,.032)*(.8+.4*fb(p.xy*.7+uC.w,4))*(.85+.3*vn(p.xy*90.));
   al=mix(al,vec3(.42,.3,.12),gl2*.8);al*=1.-.15*smoothstep(.62,.8,fb(p.xy*1.3+11.,3));ro2=mix(.45,.25,gl2);}
  else{float fade=smoothstep(.3,-.3,max(abs(tq.x-9.)-6.,abs(tq.y+1.)-5.5));
   al=vec3(.05,.1,.05)*(.85+.3*fb(p.xy*.5+uC.w,4))*(.75+.5*vn(p.xy*160.))*(.95+.1*vg(p.xy*vec2(9.,60.)))*(1.+.35*fade);
   al*=1.-.5*smoothstep(.93,.97,vn(p.xy*7.+3.));ro2=.9;}
#endif
 }else if(p.x<-4.06&&p.z>.2){
#ifndef GBM
  vec2 lq=p.xy-vec2(-8.36,0.);
  if(abs(lq.x)<3.62&&abs(lq.y)<4.27&&p.z<.62){id=2;
   float nap=fb(p.xy*vec2(.9,.7)+uC.w*3.,4);
   vec2 e=lq*vec2(1.,.92);float rr=length(e/vec2(1.7,2.15)),an=ang(e);
   float lf=fract(an*5.73+.5*step(1.,rr)+3.*rr),lw=.5-abs(lf-.5);
   float wr=smoothstep(.1,.05,abs(rr-1.)-.07*sin(lf*3.1416))*smoothstep(.0,.15,lw);
   float ros=smoothstep(.34,.26,length(lq)*(1.-.18*cos(an*6.)));
   float bd=-rect2(lq,vec2(3.62,4.27)),brd=exp(-pow((bd-.42)/.05,2.))+exp(-pow((bd-.58)/.03,2.));
   float gh=exp(-pow(winD(vec2(-lq.x,lq.y)*1.0,uC.x)/.22,2.));
   float pr=max(max(wr,ros),brd*.8);
   tn=vec2(dFdx(pr),dFdy(pr))*2.8+.06*vec2(vn(p.xy*2.)-.5,vg(p.xy*2.)-.5);
   float bald=smoothstep(.55,.8,nap)*smoothstep(2.2,.6,length(lq*vec2(.8,.6)));
   float brush=vn(vec2(lq.x*9.+3.*nap,lq.y*90.+lq.x*14.));
   al=vc*(.8+.4*nap)*(1.+.22*pr)*(1.+1.1*gh)*(1.+.6*bald)*(.9+.2*brush)*(.92+.16*vn(p.xy*160.))*(.88+.5*smoothstep(1.2,4.2,lq.y));ro2=.5+.35*pr;
  }else id=1;
#endif
 }else if(inner){
#ifdef GBM
  float pre=-rect2(p.xy,vec2(3.5,4.15));
  if(pre<.1&&p.z>.6){id=4;
   bool vx=abs(abs(p.x)-3.5)<abs(abs(p.y)-4.15);float ss=vx?p.y:p.x,ph=ss*9.;
   float cb=cos(ph*6.2832),hol=smoothstep(.2,-.6,cb);
   vec2 ad2=vx?vec2(0.,1.):vec2(1.,0.);tn=ad2*.16*sin(ph*6.2832)+.04*vec2(vn(p.xy*9.)-.5,vg(p.xy*9.)-.5);
   float rub=smoothstep(.6,.85,fb(p.xy*1.1+uC.w,3));
   al=mix(vec3(.62,.44,.2),vec3(.2,.16,.08),hol*(1.-rub));al=mix(al,vec3(.14,.2,.13),hol*.35*(1.-rub));ro2=.26+.12*hol-.1*rub;}
  else{float dw=winD(p.xy,uC.x);
   if(dw<0.){id=5;al=vec3(.7);ro2=0.;}
   else{id=3;
    float e=.012;vec2 h0=vec2(0),hx=h0,hy=h0;for(int i=0;i<uNL-1;i++){vec2 h=matH(p.xy+vec2(i==1?e:0.,i==2?e:0.),uC.x);if(i==0)h0=h;else if(i==1)hx=h;else hy=h;}
    tn=-vec2(hx.x-h0.x,hy.x-h0.x)/e*.045;
    float tr=fb(p.xy*1.7+uC.w*4.,4);
    float dark=smoothstep(.45,.75,tr)*.6+.25*smoothstep(.3,.0,dw)*0.;
    al=mix(vec3(.62,.45,.22),vec3(.3,.21,.11),dark);
    float vd=smoothstep(.72,.9,fb(p.xy*9.+uC.w,3))*smoothstep(.6,.05,-rect2(p.xy,vec2(3.5,4.15)));
    al=mix(al,vec3(.18,.3,.22),vd*.8);
    al*=mix(.82,1.08,clamp(h0.y,0.,1.));ro2=mix(.4,.09,clamp(h0.y,0.,1.))+.18*dark+.12*smoothstep(.022,.04,gFp)*(1.-clamp(h0.y,0.,1.));
   }
  }
#else
  id=5;
#endif
 }
#ifndef GBM
 if(id==1){
  // morocco grain, tooled lines on the rims, worn edges
  vec2 g=n.z>.6?p.xy:abs(n.x)>abs(n.y)?vec2(p.y,p.z):vec2(p.x,p.z);
  float gr=1.-abs(vn(g*26.)*2.-1.);float gr2=1.-abs(vg(g*55.+3.)*2.-1.);
  float gh=gr*gr*.6+gr2*gr2*.4;
  float ge=.01,gx=1.-abs(vn((g+vec2(ge,0))*26.)*2.-1.),gy=1.-abs(vn((g+vec2(0,ge))*26.)*2.-1.);
  vec2 gg=vec2(gx*gx-gr*gr,gy*gy-gr*gr)/ge*.0035;
  float tool=0.;
  if(n.z>.8){vec2 cq=p.x<-4.1?p.xy-vec2(-8.36,0.):p.xy;float od=-rect2(cq,vec2(4.1,4.75));
   tool=exp(-pow((od-.17)/.018,2.))+.7*exp(-pow((od-.25)/.012,2.))+(p.x<-4.1?0.:.0);}
  float wear=smoothstep(.95,.55,n.z)*smoothstep(.0,.35,n.z)+.6*smoothstep(.0,.6,length(n.xy))*smoothstep(.98,.6,n.z);
  float sc=smoothstep(.6,.8,fb(p.xy*5.+p.z*3.+uC.w,3));
  vec3 wc=uM.x<.5?vec3(.13,.08,.05):lc*1.9+.02;
  al=mix(lc*(.8+.4*gh),wc,clamp(wear*(.35+.6*sc),0.,1.));
  al*=1.-.55*tool;
  tn=gg+vec2(tool*.0)*0.;ro2=.42-.12*wear+.2*tool;
 }
 if(p.x<-4.0&&p.x>-4.36&&p.z<.5&&id==1){id=6;al=lc*.5;}
#endif
 n=normalize(n+vec3(tn,0.)*(1.-abs(n.z)*.0));
 if(uI==0){float hq=clamp(floor(p.z/1.05*31.+.5),0.,31.);o=vec4(sqrt(clamp(al,0.,1.)),(float(id)*32.+hq)/255.);}
 else o=vec4(n.xy*.5+.5,ro2,ao);
}`,v=o+s+`in vec2 vU;out vec4 o;uniform sampler2D uG0,uG1,uP,uF;uniform vec4 uE,uX,uY,uZ,uW,uWd,uCd,uK,uTn;uniform mat3 uR;uniform int uNL;
vec3 room(vec3 d,float bl){
 vec3 r=uR*d;
 float tx=(r.x>0.?2.0:2.3)/max(abs(r.x),1e-4),ty=(r.y>0.?uW.w:2.8)/max(abs(r.y),1e-4),tz=(r.z>0.?2.2:.78)/max(abs(r.z),1e-4);
 float t=min(tx,min(ty,tz));vec3 h=r*t;float bw=bl*t+.0015;
 float glow=exp(-(uW.w-h.y)*.8)*(.4+.6*exp(-abs(h.x-uW.y)*.7));
 vec3 L=vec3(.009,.0075,.006)*(.5+1.6*glow);
 if(tz<=tx&&tz<=ty){
  if(r.z>0.){L=vec3(.012,.011,.0095)*(.3+1.*glow);float cor=smoothstep(.06+bw,.03,uW.w-h.y);L*=1.-.25*cor;
   float beam=smoothstep(bw+.01,0.,abs(fract(h.x*1.1+.3)-.5)-.04);L*=1.-.15*beam;}
  else L=vec3(.012,.009,.007);
 }else if(ty<=tx){
  if(r.y>0.){
   vec2 w=vec2(h.x-uW.y,h.z);
   float wo=.6*(vn(w*vec2(7.,5.))-.5)*.012;vec2 wg=w+vec2(wo,.6*(vg(w*vec2(5.,7.))-.5)*.012);
   float hw=uW.x>1.5?.95:.55,zb=.02,zt=uW.z;
   float op=smoothstep(-bw,bw,hw-abs(w.x))*smoothstep(-bw,bw,min(w.y-zb,zt-w.y));
   float k=clamp((w.y-zb)/(zt-zb),0.,1.);
   vec3 sky=mix(vec3(2.7,2.85,3.),vec3(3.9,4.,4.1),k);
   float tree=smoothstep(.04,-.04,wg.y-(.16+.12*fb(vec2(wg.x*2.5+uK.w,1.),4)))*(.6+.4*vn(wg*9.));
   sky=mix(sky,vec3(.6,.62,.6),tree*.8);
   float bar;
   if(uW.x<.5){vec2 pc=vec2((wg.x+hw)/(2.*hw)*3.,k*4.);vec2 fd=abs(fract(pc+.5)-.5)*vec2(2.*hw/3.,(zt-zb)/4.);
    float bwid=abs(pc.y-2.)<.5?.03:.016;bar=1.-smoothstep(bwid-bw,bwid+bw,min(fd.x,fd.y));}
   else if(uW.x<1.5){vec2 pc=vec2(wg.x+wg.y*.55,wg.x-wg.y*.55)*7.;vec2 fd=abs(fract(pc)-.5)/7.;
    bar=1.-smoothstep(.004-bw,.004+bw,min(fd.x,fd.y));float mul=abs(wg.x);bar=max(bar,1.-smoothstep(.03-bw,.03+bw,mul));}
   else{float sx=(wg.x+hw)/(2.*hw)*3.;float fd=abs(fract(sx+.5)-.5)*(2.*hw/3.);float fz=abs(fract(k*4.+.5)-.5)*((zt-zb)/4.);
    bar=1.-smoothstep(.012-bw,.012+bw,min(fd,fz));bar=max(bar,1.-smoothstep(.05-bw,.05+bw,fd));}
   vec3 wl=mix(sky,vec3(.13,.12,.11),bar);
   L=mix(L,wl,op);
   float cx=abs(w.x)-hw+.1;
   float cu=smoothstep(-bw-.01,bw+.01,cx)*smoothstep(hw+.6,hw+.5,abs(w.x))*step(-.15,w.y);
   float fold=.5+.5*sin(w.x*48.+3.*vn(vec2(w.x*3.,w.y*.6)));
   vec3 cc=vec3(.016,.01,.008)*(.25+.9*fold)*(.4+1.6*exp(-max(cx,0.)*6.));
   L=mix(L,cc,cu);
  }else L*=.6;
 }else{float wain=step(h.z,.18);L*=mix(1.,.6,wain);L*=1.-.4*smoothstep(bw+.012,0.,abs(h.z-.18));}
 return L;}
vec3 flame(vec3 P,vec3 R){
 vec3 v=uCd.xyz+vec3(0,0,.35)-P;float tp=dot(v,R);if(tp<0.)return vec3(0);
 vec3 pp=v-R*tp;vec3 q=pp/vec3(.16,.16,.42);
 return uCd.w*(vec3(4.,2.4,.9)*exp(-dot(q,q)*1.4)*1.6+vec3(.5,.22,.07)*exp(-length(pp)*1.1)*.18);}
vec3 irr(vec3 N,vec3 P){
 vec3 n=uR*N;
 float wd=max(dot(n,uWd.xyz)*.8+.2,0.);
 vec3 E=vec3(.62,.64,.66)*uWd.w*wd*wd*clamp(1.+.055*dot(P.xy,vec2(-.45,.89)),.5,1.5);
 E+=vec3(.05,.045,.038)*(.5+.5*n.z);
 vec3 l=uCd.xyz+vec3(0,0,.35)-P;float d2=dot(l,l);
 E+=vec3(1.,.55,.22)*uCd.w*28.*max(dot(N,l*inversesqrt(d2)),0.)/d2;
 return E;}
vec3 cspec(vec3 N,vec3 V,vec3 P,float r){
 vec3 l=uCd.xyz+vec3(0,0,.35)-P;float d2=dot(l,l);l*=inversesqrt(d2);vec3 h=normalize(l+V);
 float e=2./max(r*r,.002);return vec3(1.,.55,.22)*uCd.w*28./d2*pow(max(dot(N,h),0.),e)*(e+8.)/25.*max(dot(N,l),0.);}
vec3 thin(float t){vec3 ph=6.2832*3.8*t/vec3(.63,.54,.46);vec3 c=1.-.6*(.5-.5*cos(ph));return c*(1.-.3*smoothstep(.0,.5,t));}
void main(){
 ivec2 ip=ivec2(gl_FragCoord.xy);
 vec4 g0=texelFetch(uG0,ip,0),g1=texelFetch(uG1,ip,0);
 float a8=floor(g0.a*255.+.5);float idf=floor(a8/32.);float hz=(a8-idf*32.)/31.*1.05;int id=int(idf);
 vec2 s=vU*2.-1.;vec3 rd=normalize(uZ.xyz+(s.x*uX.xyz+s.y*uY.xyz)*uE.w);
 vec3 P=uE.xyz+rd*((hz-uE.z)/rd.z);
 vec2 nx=g1.xy*2.-1.;vec3 N=vec3(nx,sqrt(max(1.-dot(nx,nx),0.)));
 vec3 V=-rd;vec3 al=g0.rgb*g0.rgb;float rg=g1.b,ao=g1.a;
 vec3 col;
 vec2 uvp=vec2(0);float cov=0.,dg=0.;
 bool hg=id>=3&&id<=5;
 if(hg){vec3 Pg=uE.xyz+rd*((.66-uE.z)/rd.z);uvp=Pg.xy/vec2(7.24,8.54)+.5;
  float fv=texture(uF,uvp).r*1.7,th=.1+.3*fb(uvp*vec2(6.,7.)+uK.w,4)+.12*(vn(uvp*vec2(150.,170.))-.5);
  dg=vn(uvp*vec2(560.,650.)+uK.w);cov=smoothstep(.0,1.5,fv+.08*(th-.25));cov*=cov*(3.-2.*cov);cov*=mix(1.,smoothstep(.3,.75,dg),smoothstep(.45,.12,fv)*.8);}
 // one shading point, normal and reflection per pixel (keeps the program small)
 vec3 Ps=P,Ns=N;float bl=.5,rsp=max(rg,.25);
 vec4 pl=vec4(0);float bf=0.;
 if(id==5){Ps=uE.xyz+rd*((.61-uE.z)/rd.z);vec2 u=Ps.xy/vec2(7.24,8.54)+.5;
  pl=textureLod(uP,u,cov*3.);
  vec2 bow=vec2(.012*(u.x-.5)*(u.y-.5)*4.+uTn.w*.006*(u.x-.5),.006*(u.y-.5)*(u.y-.5)*4.);
  bf=.006*(vn(vec2(u.x*(2.+3.*vg(vec2(u.y*37.,2.))),u.y*240.))-.5);
  Ns=normalize(vec3(bow.x,bow.y+bf,1.));bl=.0012;rsp=.25;}
 else if(id==3||id==4){bl=rg*rg*1.4+.006;rsp=max(rg,.06);}
 else if(id<=1||id==6){bl=rg*.9;}
 else if(id==2){rsp=.6;}
 vec3 R=reflect(rd,Ns);if(id==0)R=R*uR;
 vec3 Ed=irr(Ns,Ps);
 vec3 Cs=cspec(id==5?normalize(vec3(bf*30.,0.,1.)):Ns,V,Ps,rsp);
 vec3 Pg=uE.xyz+rd*((.66-uE.z)/rd.z);
 vec3 Ng=normalize(vec3(.01*(vn(Pg.xy*.9)-.5),.01*(vg(Pg.xy*.9+5.)-.5),1.));
 vec3 Rg=reflect(rd,Ng);
 vec3 Lr=vec3(0),Lg=vec3(0);
 int nl=hg?2:(id<=1||id==6)?1:0;
 for(int i=0;i<uNL;i++){if(i>=nl)break;bool g=i>0;vec3 L=room(g?Rg:R,g?.0015+cov*.25:bl)+flame(g?Pg:Ps,g?Rg:R);if(g)Lg=L;else Lr=L;}
 if(id==5){
  float dens=pl.r*(1.-.5*pl.b),tau=pl.g*.6;
  vec3 frost=mix(vec3(.82,.9,1.04),vec3(1.,.9,.76),min(uK.y,1.));
  frost=mix(frost,vec3(.62,.78,1.08),smoothstep(.8,.97,pl.r)*(.25+.75*step(1.5,uK.y)));
  col=thin(tau)*(uTn.rgb*pow(max(1.-1.04*dens,.02),1.4)*Lr*Lr/(Lr+.04)+frost*dens*.85*Ed);
  col+=pl.b*(.12*Ed+Cs*.4);
  col=mix(col,col*vec3(.18,.15,.12)+vec3(.006,.005,.003),pl.a);
 }else if(id==3||id==4){
  col=al*Lr*(1.-.4*rg)*ao+al*.07*Ed*ao+al*Cs;
 }else if(id==2){
  float nv=max(dot(N,V),0.);
  col=al*Ed*(.55+1.6*pow(1.-nv,3.))*ao*.6+al*Cs*.5;
 }else if(id==1||id==6){
  float F=.04+.5*pow(1.-max(dot(N,V),0.),5.);
  col=al*Ed*ao*.6+F*Lr*ao*(1.-rg)+Cs*.06*ao;
 }else{
  float F=.03+.6*pow(1.-max(dot(N,V),0.),5.);
  col=al*Ed*ao*.6+F*Lr*ao*(1.-rg)*.8;
 }
 if(hg){
  float F=.04+.96*pow(1.-max(dot(V,Ng),0.),5.);
  col=col*(1.-F)+F*Lg*(1.-.6*cov);
  float dust=smoothstep(.82,.95,vn(Pg.xy*70.+uK.w*11.))*.04;
  col+=dust*Ed*.3;
  // breath fog: fine droplets scatter the light falling on the glass into a milky veil over a blurred image
  col=col*(1.-.35*cov)+cov*(Ed*vec3(.07,.072,.075)+Lg*.75)*(.92+.16*dg);
 }
 col*=uK.z;
 col=1.-exp(-col);
 col=pow(col,vec3(.95,.97,1.)/2.2);
 float vg2=length(s*vec2(1.,.95));col*=1.-.22*vg2*vg2;
 o=vec4(col+(vn(gl_FragCoord.xy*.71)-.5)/255.,1);
}`,x={},q=[],p=(r,i)=>{const w=e.createProgram(),z=e.createShader(e.VERTEX_SHADER),b=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(z,t),e.shaderSource(b,i),e.compileShader(z),e.compileShader(b),e.attachShader(w,z),e.attachShader(w,b),e.linkProgram(w),q.push([r,w,z,b]),x[r]=w},P=(r,i)=>h.replace(`precision highp sampler2D;
`,`precision highp sampler2D;
`+(r?`#define FRAME
#define PLC `+r+`
`:"")+"#define SCP "+i+`
`),Se=r=>k.replace(`precision highp sampler2D;
`,`precision highp sampler2D;
#define SUBJ `+r+`
`);Ce?(p("rk",l),p(W,P(de,1)),p(W+"b",P(de,2)),p(W+"c",P(de,3))):p(ge,Se(oe)),p("pl",L),p("gb",u),p("gm",u.replace(`precision highp sampler2D;
`,`precision highp sampler2D;
#define GBM
`)),p("co",v),e.flush();const d={},ue=()=>{for(const[r,i,w,z]of q)if(!e.getProgramParameter(i,e.LINK_STATUS))throw new Error("267 "+r+": "+(e.getShaderInfoLog(z)||e.getShaderInfoLog(w)||e.getProgramInfoLog(i)));for(const r in x){d[r]={};for(const i of["uN","uA","uB","uC","uS","uT","uE","uX","uY","uZ","uM","uI","uG0","uG1","uP","uF","uW","uWd","uCd","uK","uTn","uR","uNL","uNF","uRk","uV","uG","uSv"])d[r][i]=e.getUniformLocation(x[r],i)}x.rk&&(e.useProgram(x.rk),e.uniform1i(d.rk.uN,0));for(const r in x)r.startsWith("s")&&(e.useProgram(x[r]),e.uniform1i(d[r].uN,0),e.uniform1i(d[r].uRk,2),e.uniform1i(d[r].uSv,1));e.useProgram(x.pl),e.uniform1i(d.pl.uN,0),e.uniform1i(d.pl.uS,1),e.useProgram(x.gb),e.uniform1i(d.gb.uN,0),e.useProgram(x.gm),e.uniform1i(d.gm.uN,0),e.useProgram(x.co),e.uniform1i(d.co.uN,0),e.uniform1i(d.co.uG0,1),e.uniform1i(d.co.uG1,2),e.uniform1i(d.co.uP,3),e.uniform1i(d.co.uF,4),St.fin=null};e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1);const N=(r,i,w,z,b,U)=>{const O=e.createTexture();return e.bindTexture(e.TEXTURE_2D,O),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,w,r,i,0,z,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,U||b),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,b),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),O},ne=r=>{const i=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),i};let C=267;const te=new Uint8Array(256*256*4);for(let r=0;r<te.length;r++)C=Math.imul(C^C>>>15,739982445)+1831565813|0,te[r]=C>>>24&255;{const r=new Float32Array(65536),i=new Float32Array(65536);let w=0,z=0;for(let b=0,U=8,O=1;b<5;b++,U*=2,O*=.5){const le=new Float32Array(U*U);for(let _=0;_<le.length;_++)C=Math.imul(C^C>>>15,739982445)+1831565813|0,le[_]=(C>>>8)/16777216;const Nt=U/256;w+=O,b<3&&(z+=O);for(let _=0;_<256;_++){const Ct=_*Nt,et=Ct|0;let ie=Ct-et;ie=ie*ie*(3-2*ie);const Bt=et*U,Ut=(et+1)%U*U;for(let we=0;we<256;we++){const Ht=we*Nt,Ne=Ht|0;let K=Ht-Ne;K=K*K*(3-2*K);const Xt=(Ne+1)%U,Dt=(le[Bt+Ne]*(1-K)+le[Bt+Xt]*K)*(1-ie)+(le[Ut+Ne]*(1-K)+le[Ut+Xt]*K)*ie;r[_*256+we]+=O*Dt,b<3&&(i[_*256+we]+=O*Dt)}}}for(let b=0;b<65536;b++)te[b*4+2]=Math.min(255,Math.max(0,r[b]/w)*255)|0,te[b*4+3]=Math.min(255,Math.max(0,i[b]/z)*255)|0}const xe=e.createTexture();e.bindTexture(e.TEXTURE_2D,xe),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,te),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);const Lt=r=>{q.length=0;for(const i of r){const w=x[i];if(!e.getProgramParameter(w,e.LINK_STATUS))throw new Error("267 "+i+": "+(e.getProgramInfoLog(w)||""));d[i]={};for(const z of["uN","uA","uB","uC","uV","uF","uG","uNF","uRk","uSv"])d[i][z]=e.getUniformLocation(w,z);e.useProgram(w),e.uniform1i(d[i].uN,0),e.uniform1i(d[i].uRk,2),e.uniform1i(d[i].uSv,1)}},St={P:x,U:d,fin:ue,addSc:r=>{const i="sc"+(r||"");q.length=0,x.rk||p("rk",l),p(i,P(r,1)),p(i+"b",P(r,2)),p(i+"c",P(r,3)),e.flush(),Lt(q.map(w=>w[0]))},addSj:r=>{q.length=0,p("sj"+r,Se(r)),e.flush(),Lt(["sj"+r])},tex:N,fbo:ne,tN:xe,vao:e.createVertexArray(),pools:{},tmp:{}};return St})()),pe=A>400,X=pe?720:256,D=pe?848:302,M=40,Z=48,J=f.pools[A]||(f.pools[A]={list:[],next:0});let R;if(J.list.length<(pe?2:10)){const o=f.tex(A,A,e.RGBA8,e.RGBA,e.NEAREST),t=f.tex(A,A,e.RGBA8,e.RGBA,e.NEAREST),s=f.tex(X,D,e.RGBA8,e.RGBA,e.LINEAR,e.LINEAR_MIPMAP_LINEAR);e.generateMipmap(e.TEXTURE_2D);const n=f.tex(M,Z,e.R8,e.RED,e.LINEAR);R={g0:o,g1:t,tP:s,tF:n,f0:f.fbo(o),f1:f.fbo(t),fP:f.fbo(s)},J.list.push(R)}else R=J.list[J.next],J.next=(J.next+1)%J.list.length;const ct=X+"x"+D,Q=f.tmp[ct]||(f.tmp[ct]=(()=>{const o=f.tex(X,D,e.RGBA8,e.RGBA,e.LINEAR),t=f.tex(X,D,e.RGBA8,e.RGBA,e.NEAREST);return{t:o,f:f.fbo(o),r:t,fr:f.fbo(t)}})()),$=[[60,24,[-1.05,.25,.55],34,-.12,0,1],[64,14,[0,.1,.6],23,-.12,-.08,1.1],[48,40,[-1,.2,.3],40,-.015,.14,1]][Qt],Ie=($[0]+(c?0:(Xe-.5)*4))*Math.PI/180,ht=($[1]+(c?0:(lt-.5)*8))*Math.PI/180,re=$[2],We=$[3],fe=.148,g=[re[0]+We*Math.sin(ht)*Math.cos(Ie),re[1]-We*Math.cos(ht)*Math.cos(Ie),re[2]+We*Math.sin(Ie)],ve=o=>{const t=Math.hypot(o[0],o[1],o[2]);return[o[0]/t,o[1]/t,o[2]/t]},T=ve([re[0]-g[0],re[1]-g[1],re[2]-g[2]]);let y=ve([T[1],-T[0],0]),F=[y[1]*T[2]-y[2]*T[1],y[2]*T[0]-y[0]*T[2],y[0]*T[1]-y[1]*T[0]];const dt=-.03;{const o=Math.cos(dt),t=Math.sin(dt),s=y.map((l,h)=>l*o+F[h]*t),n=F.map((l,h)=>l*o-y[h]*t);y=s,F=n}const Ze=(()=>{const o=ve([-g[0],-g[1],.61-g[2]]);return[o[0],o[1],-o[2]]})(),pt=[];for(let o=0;o<5;o++)for(let t=0;t<5;t++){const s=ve([(t-2)*1.05-g[0],(o-2)*1.3+.08-g[1],.61-g[2]]);pt.push([s[0],s[1],-s[2]])}const vt=(o,t,s)=>{const n=o*2-1,l=1-t*2,h=[T[0]+(n*y[0]+l*F[0])*fe,T[1]+(n*y[1]+l*F[1])*fe,T[2]+(n*y[2]+l*F[2])*fe],k=(s-g[2])/h[2];return[g[0]+h[0]*k,g[1]+h[1]*k]},Ve=qe===3?(ce===1?he:Ue)*(.14+.06*(ke-.77)/.23):I===3?.02*(ce===1?he:1):ce===1?he*(.1+.03*Pe):.06+(c?0:(Pe-.5)*.1),so=Te===1?.2:Te===3?.13:.1+(c?0:(Ae-.5)*.05),mt=so+S[3],ut=-.2,xt=I===4&&Te===1?0:Te,wt=qe===3?Ve>0?.01:-.01:(Ae-.5)*.04,bt=[S[0],S[1],S[2],ce===1&&I<3?-he*.14:0],ao=[.07,.14,.125,.27][Ee],ro=[.45,.6,2.6,1.1][Ee],gt=c?-.72:Math.max(-.78,-.72+(E()-.5)*.3)+(ze===2?.3:0),yt=gt+.3,Oe=ze===1?1.85:1.78,kt=E(),qt=-Math.PI/2+(kt<.5?-1:1)*(.44+.4*Math.abs(kt-.5)*2),Tt=.82+.3*E(),fo=2.7*Math.cos(qt)*Tt,no=3.3*Math.sin(qt)*Tt+.08,lo=He===1||He===3?1:0,io=He>=2?1:0,co=.03+.06*E()+(Ee>=2?.05:0),ho=(E()-.5)*2,po=$[4],vo=$[5],me=Y(B^461845907),Ke=new Float32Array(64);for(let o=0;o<64;o++)Ke[o]=me()*2-1;const V=o=>{const t=Math.floor(o),s=o-t,n=s*s*(3-2*s),l=Ke[t&63],h=Ke[t+1&63];return l+(h-l)*n},mo=c||me()<.5?-1:1,uo=c?-.045:-.025-.03*me(),xo=mo*(c?.3:.28+.05*me())*$[6],Le=me()*40,wo=o=>[uo+.022*V(o*.11+Le)+.01*V(o*.29+Le+17),xo+.07*V(o*.083+Le+31)+.025*V(o*.23+Le+47)];(()=>{if(f.fin&&f.fin(),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.bindVertexArray(f.vao),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,f.tN),Ce){f.P[W]||f.addSc(de),e.bindFramebuffer(e.FRAMEBUFFER,Q.fr),e.viewport(0,0,X,D),e.useProgram(f.P.rk);const t=f.U.rk;e.uniform4f(t.uA,xt,Pe*10,0,Ve),e.uniform4f(t.uV,...bt),e.uniform4f(t.uB,mt,ut,wt,(Xe-.5)*.04),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,Q.f),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Q.r),e.activeTexture(e.TEXTURE0);for(const s of[W,W+"b",W+"c"]){if(s!==W){const l=s.endsWith("b");e.bindFramebuffer(e.FRAMEBUFFER,l?R.fP:Q.f),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,l?Q.t:R.tP),e.activeTexture(e.TEXTURE0)}e.useProgram(f.P[s]);const n=f.U[s];e.uniform4f(n.uA,xt,Pe*10,0,Ve),e.uniform4f(n.uV,...bt),e.uniform1i(n.uNF,3),e.uniform4f(n.uB,mt,ut,wt,(Xe-.5)*.04),e.uniform4f(n.uC,X-1,D-1,S[4],0),e.uniform4f(n.uF,se[0],se[1],se[2],Ue),at&&e.uniform4f(n.uG,I,0,ce===1?he:Ue,0),e.drawArrays(e.TRIANGLES,0,3)}}else{f.P[ge]||f.addSj(oe),e.bindFramebuffer(e.FRAMEBUFFER,Q.f),e.viewport(0,0,X,D),e.useProgram(f.P[ge]);const t=f.U[ge];e.uniform1i(t.uNF,3),e.uniform4f(t.uA,...it[0]),e.uniform4f(t.uB,...it[1]),e.uniform4f(t.uC,X-1,D-1,0,0),e.drawArrays(e.TRIANGLES,0,3)}e.bindFramebuffer(e.FRAMEBUFFER,R.fP),e.viewport(0,0,X,D),e.useProgram(f.P.pl);const o=f.U.pl;e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Q.t),e.uniform4f(o.uA,nt,ro,ao,lt*10),e.uniform4f(o.uB,fo,no,io,lo),e.uniform4f(o.uC,co,Ee===2?1:0,0,1),e.uniform1i(o.uT,pe?8:5),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,R.tP),e.generateMipmap(e.TEXTURE_2D);for(const t of["gb","gm"]){e.useProgram(f.P[t]);const s=f.U[t];e.uniform4f(s.uE,g[0],g[1],g[2],fe),e.uniform4f(s.uX,y[0],y[1],y[2],0),e.uniform4f(s.uY,F[0],F[1],F[2],0),e.uniform4f(s.uZ,T[0],T[1],T[2],0),e.uniform4f(s.uC,nt,pe?1:0,2.8*fe/A,Ae*10),e.uniform1i(s.uNL,4),e.uniform4f(s.uM,to,oo,eo,0)}e.viewport(0,0,A,A);for(let t=0;t<2;t++){e.bindFramebuffer(e.FRAMEBUFFER,t?R.f1:R.f0);for(const s of["gb","gm"])e.useProgram(f.P[s]),e.uniform1i(f.U[s].uI,t),e.drawArrays(e.TRIANGLES,0,3)}e.flush()})();const ee=new Float32Array(M*Z),Et=new Uint8Array(M*Z),Ye=new Float32Array(M*Z);{const o=[E()*6.28,E()*6.28,E()*6.28,E()*6.28];for(let t=0;t<Z;t++)for(let s=0;s<M;s++)Ye[t*M+s]=.5+.25*Math.sin(s*.41+t*.17+o[0])*Math.sin(t*.33-s*.12+o[1])+.25*Math.sin(s*.93-t*.71+o[2])*Math.sin(t*1.07+s*.29+o[3])}let Je=!1,Qe=!0;const zt=(o,t)=>{const s=vt(o,t,.66),n=Math.min(1.1,Math.max(-.1,s[0]/7.24+.5)),l=Math.min(1.1,Math.max(-.1,s[1]/8.54+.5));for(let h=0;h<Z;h++)for(let k=0;k<M;k++){const L=(k+.5)/M-n,u=((h+.5)/Z-l)*1.18,v=(L*L+u*u)/.032;ee[h*M+k]=Math.min(1.5,ee[h*M+k]+1.25*(.85+.3*Ye[h*M+k])*Math.exp(-v*v*.6-v*.5))}Je=!0,m.sound.hit("noise",.25,{dur:.7,cutoff:700}),m.sound.hit("noise",.08,{dur:.5,cutoff:2200,at:.05})},a={tx:0,ty:0,gx:0,gy:0,down:!1,sx:0,sy:0,t0:0,mode:"",bx:0,by:0,cand:0,cx:.75,cy:.12,ccx:.75,ccy:.12,neg:!1,lastT:0,crk:0,exw:0};E(),E();const $e=(()=>{const o=gt,t=Oe*.5+.02;return ve([o,1.6,t])})();let Rt=1,Pt=0,At=0,Mt=0;const Ft=o=>{e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,A,A),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.bindVertexArray(f.vao),e.useProgram(f.P.co);const t=f.U.co;e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,f.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,R.g0),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,R.g1),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,R.tP),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,R.tF),Qe&&(Qe=!1,e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texSubImage2D(e.TEXTURE_2D,0,0,0,M,Z,e.RED,e.UNSIGNED_BYTE,Et)),e.uniform4f(t.uE,g[0],g[1],g[2],fe),e.uniform4f(t.uX,y[0],y[1],y[2],0),e.uniform4f(t.uY,F[0],F[1],F[2],0),e.uniform4f(t.uZ,T[0],T[1],T[2],0);const s=wo(o),n=po+a.ty+s[0],l=vo+a.tx+s[1],h=Math.cos(n),k=Math.sin(n),L=Math.cos(l),u=Math.sin(l),v=[L,k*u,-h*u,0,h,k,u,-k*L,h*L];{let P=0;const Se=ze===2?.95:.55;for(let d=0;d<5;d++)for(let ue=0;ue<5;ue++){const N=pt[d*5+ue],ne=[v[0]*N[0]+v[3]*N[1]+v[6]*N[2],v[1]*N[0]+v[4]*N[1]+v[7]*N[2],v[2]*N[0]+v[5]*N[1]+v[8]*N[2]];if(ne[1]>.05){const C=1.6/ne[1],te=ne[0]*C-yt,xe=ne[2]*C;P+=Math.min(1,Math.max(0,(Oe+.1-xe)/.2))*Math.min(1,Math.max(0,(Se+.1-Math.abs(te))/.2))*Math.min(1,Math.max(0,xe/.1))/25}}a.exw+=(P-a.exw)*Math.min(1,Mt*6)}e.uniformMatrix3fv(t.uR,!1,v),e.uniform1i(t.uNL,2),e.uniform4f(t.uW,ze,yt,Oe,1.6),e.uniform4f(t.uWd,$e[0],$e[1],$e[2],.9);const x=vt(a.ccx,a.ccy,.61),q=6.5+12*(1-a.cand),p=[x[0]*.75+Ze[0]*q,x[1]*.75+Ze[1]*q,.61+Ze[2]*q];e.uniform4f(t.uCd,p[0],p[1],p[2],a.cand*a.cand*Rt*1),e.uniform4f(t.uK,o,Re,3.4/(1+44*Math.max(a.exw-.06,0)**2),Ae*10),e.uniform4f(t.uTn,Re?.9:.8,Re?.82:.86,Re?.74:.95,ho),e.drawArrays(e.TRIANGLES,0,3)},bo=(o,t)=>{t=Math.min(Math.max(t||0,0),.1);const s=m.input,n=s.taps();if(s.down&&!a.down&&(a.down=!0,a.sx=s.x,a.sy=s.y,a.t0=o,a.mode="press",a.bx=a.gx,a.by=a.gy),a.down&&s.down){const u=s.x-a.sx,v=s.y-a.sy;a.mode==="press"&&Math.hypot(u,v)>.02&&(a.mode="drag",m.sound.hit("noise",.06,{dur:.25,cutoff:500})),a.mode==="press"&&o-a.t0>.32&&(a.mode="hold",m.sound.hit("noise",.1,{dur:.3,cutoff:3e3}),m.sound.hit("click",.12)),a.mode==="drag"&&(a.gx=Math.max(-.5,Math.min(.5,a.bx+u*2)),a.gy=Math.max(-.45,Math.min(.4,a.by-v*3.2))),a.mode==="hold"&&(a.cx=s.x,a.cy=s.y,Math.hypot(u,v)>.06&&(a.mode="drag",a.sx=s.x,a.sy=s.y))}if(!s.down&&a.down)a.mode==="press"?zt(a.sx,a.sy):a.lastT=o,a.down=!1,a.mode="";else if(!s.down&&!a.down&&n.length&&o-a.lastT>.3)for(const u of n)zt(u.x,u.y);if(!a.down){const u=1-Math.exp(-t*.8);a.gx-=a.gx*u,a.gy-=a.gy*u}const l=1-Math.exp(-t*10);a.tx+=(a.gx-a.tx)*l,a.ty+=(a.gy-a.ty)*l;const h=a.mode==="hold"?1:0;a.cand+=(h-a.cand)*(1-Math.exp(-t*(h?1.6:1.1)));const k=1-Math.exp(-t*4);if(a.ccx+=(a.cx-a.ccx)*k,a.ccy+=(a.cy-a.ccy)*k,Pt=V(o*7.3+11)*.6+V(o*17.9+23)*.4,At=Math.max(0,V(o*.9+5)-.55)*2.2,Rt=.9+.07*Pt-.16*At*(.6+.4*V(o*23+3)),a.cand>.3&&o-a.crk>.4+.5*Math.abs(Math.sin(o*5.3))&&(a.crk=o,m.sound.hit("noise",.03*a.cand,{dur:.05,cutoff:4e3})),Je){let u=!1;const v=Math.max(1,Math.round(t/.02)),x=t/v;for(let q=0;q<v;q++)for(let p=0;p<ee.length;p++){const P=ee[p];P>0&&(ee[p]=Math.max(0,P-x*(.26+.14*P)*(1.15-.3*Ye[p])),u=!0)}for(let q=0;q<ee.length;q++)Et[q]=Math.min(255,ee[q]*170)|0;Je=u,Qe=!0}const L=a.ty<-.12&&Math.abs(a.tx)<.3;L!==a.neg&&(a.neg=L,L&&(m.sound.note(81,{dur:1.6,vel:.04,wave:"sine"}),m.sound.note(88,{dur:1.2,vel:.025,wave:"sine",at:.07}))),Mt=t,Ft(o)};return Ft(0),bo}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
