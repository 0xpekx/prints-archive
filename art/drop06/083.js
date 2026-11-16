// Peg Drop: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/083.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Uo){Uo&&function(){"use strict";function Ho(e,u,R,m,A,M,b,B,w,J,G,C,q,Z,P,V0,s0,N,J0,F0,W0,Y,D){const F={N:e,BK:u,GX0:C,GY0:q,GW:Z,GH:P,E_PIN:[.42,.5,.4,.4][u],E_BALL:[.3,.45,.15,.3][u],MU:[.05,.1,.35,.08][u],E_WALL:[.3,.35,.15,.3][u],IRREG:u===2?.8:.04,YL:R,YN:m,YNT:A,Y0:M,RH:b,XIN:B,YIN0:w,YIN1:J,RPIN:G,gS1:V0,gS2:s0,gP:N,SA:J0,pinXA:F0,pinYA:W0,pinOn:Y,px:new Float64Array(e),py:new Float64Array(e),vx:new Float64Array(e),vy:new Float64Array(e),ox:new Float64Array(e),oy:new Float64Array(e),ang:new Float32Array(e),wv:new Float32Array(e),sc:new Uint8Array(e),rad:new Float64Array(e),ppx:new Float64Array(e),ppy:new Float64Array(e),asleep:new Uint8Array(e),cStamp:new Int32Array(4e4),cS0:new Int32Array(4e4),cS1:new Int32Array(4e4),cntX:new Int32Array(40001),cntY:new Int32Array(40001),bX:new Int32Array(e),bY:new Int32Array(e),ord2:new Int32Array(e),occ:new Int32Array(e),cAw:new Uint16Array(4e4),cFall:new Uint8Array(4e4),cOf:new Int32Array(e),ord:new Int32Array(e),ctI:new Int32Array(8192),ctJ:new Int32Array(8192),ctN:new Float64Array(32768),EV:new Float32Array(1024),rs:new Int32Array(1),gxB:.5,gyB:.5,upx:.5,upy:.5,gL0:.5,gH0:.5,gCW:1,gCH:1,simT:.5,lastPass:.5,lastCheck:.5,knocked:.5,stickAt:.5,stickHold:.5,stepId:0,nev:0,nKnock:0,neckPass:0,jamK:0,stick:-1,stickBall:-1};return F.rs[0]=D,F.simT=0,F.lastPass=0,F.lastCheck=0,F.knocked=-9,F.stickAt=0,F.stickHold=30,F}function ze(e,u,R,m){e.gxB=-1500*Math.sin(u),e.gyB=-1500*Math.cos(u);const b=e.upx=-e.gxB/1500,B=e.upy=-e.gyB/1500;let w=1e9,J=-1e9,G=1e9,C=-1e9;for(const[Z,P]of[[-R,0],[R,0],[-R,m],[R,m]]){const V0=Z*B-P*b,s0=Z*b+P*B;w=Math.min(w,V0),J=Math.max(J,V0),G=Math.min(G,s0),C=Math.max(C,s0)}e.gL0=w-2,e.gH0=G-2;const q=e.gCW=Math.floor((J-w+4)*.5)+1;e.gCH=Math.min(Math.floor(4e4/q)-1,Math.floor((C-G+4)*.5)+1)}let Xo=!1;function ds(e,u,R,m){const M=Ho(48,e.BK,e.YL,e.YN,e.YNT,e.Y0,e.RH,e.XIN,e.YIN0,e.YIN1,e.RPIN,e.GX0,e.GY0,e.GW,e.GH,e.gS1,e.gS2,e.gP,e.SA,e.pinXA,e.pinYA,e.pinOn.slice(),625341585);ze(M,0,u,R),M.lastCheck=-1,M.lastPass=-5;const b=(w,J,G,C,q,Z,P)=>{M.px[w]=J,M.py[w]=G,M.vx[w]=C,M.vy[w]=q,M.rad[w]=1-.05*(w%3),M.asleep[w]=Z,M.sc[w]=P},B=()=>{const w=M.YIN0,J=e.pinXA.length;b(0,0,w,0,0,1,0),b(1,.1,w+1.95,0,0,1,0),b(2,0,w+3.9,0,0,0,45),b(3,.2,w+8,0,-80,0,0),b(4,-8,w+1.5,0,-40,0,0),b(5,-8,w+3.6,0,0,1,0),b(6,8,w,.1,0,0,45),b(7,16,w,0,0,0,40),b(8,-1.1,M.YNT+30,30,0,0,0),b(9,1.1,M.YNT+29.8,-30,0,0,0),b(10,-16,w+1.9,0,0,0,0),b(11,-16,w+3.2,0,0,1,0),b(12,2.7,w+2,20,0,0,0);for(let G=13;G<48;G++){const C=G%3,q=at(M),Z=at(M),P=Math.floor(at(M)*J);C===0?b(G,e.pinXA[P]+(q-.5)*.2,e.pinYA[P]+e.RPIN+1.02,0,0,0,0):C===1?b(G,e.pinXA[P]+(q-.5)*3,e.pinYA[P]+3+Z*2,(q-.5)*30,-70,0,0):b(G,(q-.5)*M.XIN*1.6,M.YNT+2+Z*20,(Z-.5)*20,-30*q,0,0)}};B();for(let w=0;w<6;w++)de(M);B(),M.stickBall=0;for(let w=0;w<10;w++)de(M);oo(M,0,M.YL,30,22),ze(M,Math.PI,u,R);for(let w=0;w<6;w++)de(M);ze(M,.1,u,R);for(let w=0;w<4;w++)de(M)}function at(e){const u=e.rs,R=u[0]=u[0]+1831565813|0;let m=Math.imul(R^R>>>15,1|R);return m=m+Math.imul(m^m>>>7,61|m)^m,((m^m>>>14)>>>0)/4294967296}function Yo(e,u,R,m){const A=e.nev;if(A<256){const M=A*4,b=e.EV;b[M]=u,b[M+1]=e.px[R],b[M+2]=e.py[R],b[M+3]=m,e.nev=A+1}}function ce(e,u){return u===e.stick?!1:(e.asleep[u]=0,e.sc[u]=0,e.ox[u]=e.px[u],e.oy[u]=e.py[u],e.vx[u]=0,e.vy[u]=0,!0)}function ps(e,u,R,m){const A=e.px,M=e.py,b=e.vx,B=e.vy,w=e.rad,J=e.ppx,G=e.ppy,C=e.SA,q=e.GX0,Z=e.GY0,P=e.GW,V0=e.GH;let s0=A[u],N=M[u];const J0=Math.floor(s0-q),F0=Math.floor(N-Z);if(J0<0||F0<0||J0>=P||F0>=V0)return m;const W0=F0*P+J0;for(let D=0;D<2;D++){const t0=D?e.gS2[W0]:e.gS1[W0];if(t0<0)continue;const e0=t0*8,F=C[e0],X=C[e0+1],I=C[e0+2]-F,o0=C[e0+3]-X,y0=w[u]+C[e0+4],nt=I*I+o0*o0||1,v0=((s0-F)*I+(N-X)*o0)/nt;let w0,L0,z0;if(C[e0+7]&&v0>=0&&v0<=1){w0=C[e0+5],L0=C[e0+6];const N0=(s0-F)*w0+(N-X)*L0;if(N0>=y0)continue;z0=y0-N0}else{const N0=v0<0?0:v0>1?1:v0,ct=s0-F-I*N0,Qt=N-X-o0*N0,xt=ct*ct+Qt*Qt;if(xt>=y0*y0||xt<1e-12)continue;const kt=Math.sqrt(xt);w0=ct/kt,L0=Qt/kt,z0=y0-kt}if(s0+=w0*z0,N+=L0*z0,z0>.15&&(J[u]+=w0*(z0-.15),G[u]+=L0*(z0-.15)),R&&m<8192){e.ctI[m]=u,e.ctJ[m]=-1;const N0=m*4,ct=e.ctN;ct[N0]=w0,ct[N0+1]=L0,ct[N0+2]=b[u]*w0+B[u]*L0,ct[N0+3]=z0,m++}}const Y=e.gP[W0];if(Y>=0&&e.pinOn[Y]){const D=e.pinXA,t0=e.pinYA,e0=s0-D[Y],F=N-t0[Y],X=e0*e0+F*F,I=w[u]+e.RPIN;if(X<I*I&&X>1e-12){const o0=Math.sqrt(X),y0=e0/o0,nt=F/o0;if(s0+=y0*(I-o0),N+=nt*(I-o0),R&&m<8192){e.ctI[m]=u,e.ctJ[m]=-2-Y;const v0=m*4,w0=e.ctN;w0[v0]=y0,w0[v0+1]=nt,w0[v0+2]=b[u]*y0+B[u]*nt,w0[v0+3]=I-o0,m++}u===e.stickBall&&e.stick<0&&y0*e.upx+nt*e.upy>.93&&t0[Y]<e.Y0-e.RH*1.5&&(e.stick=u,e.stickAt=e.simT,e.stickHold=14+40*at(e),s0=D[Y]+e.upx*I,N=t0[Y]+e.upy*I,e.asleep[u]=1,b[u]=0,B[u]=0)}}return A[u]=s0,M[u]=N,m}function de(e){const u=e.px,R=e.py,m=e.vx,A=e.vy,M=e.ox,b=e.oy,B=e.asleep,w=e.rad,J=e.ppx,G=e.ppy,C=e.ord,q=e.cAw,Z=e.cFall,P=e.cOf,V0=e.ctI,s0=e.ctJ,N=e.ctN,J0=e.sc,F0=e.wv,W0=e.ang,Y=e.upx,D=e.upy,t0=e.N,e0=e.BK,F=e.YL,X=e.YN,I=e.YNT,o0=e.XIN,y0=e.YIN0,nt=e.YIN1,v0=e.E_PIN,w0=e.E_BALL,L0=e.MU,z0=e.E_WALL,N0=e.IRREG,ct=e.GX0,Qt=e.GY0,xt=e.GW,kt=e.GH,dt=e.SA,Zt=e.gS1,so=e.gS2,it=e.gP,Ce=e.pinOn,Tt=e.pinXA,i0=e.pinYA,pe=e.RPIN,be=2,l0=1/120,Et=120,Ft=110,pt=Ft*Ft,rt=20,$t=8192,lt=e.simT+=l0;let E=0;const ao=e.gxB*l0,zt=e.gyB*l0;for(let n=0;n<t0;n++){if(B[n])continue;let x=m[n]+ao,p=A[n]+zt;const U=x*x+p*p;if(U>pt){const Q=Ft/Math.sqrt(U);x*=Q,p*=Q}m[n]=x,A[n]=p;const z=u[n],S=R[n];M[n]=z,b[n]=S,u[n]=z+x*l0,R[n]=S+p*l0}const M0=e.gCW,G0=e.gCH,Pt=e.gL0,Ct=e.gH0,qt=++e.stepId,Nt=e.cStamp,Gt=e.cS0,ye=e.cS1,Be=e.bX,Se=e.bY,Ie=e.ord2,O0=e.occ,bt=e.cntX,yt=e.cntY;bt.fill(0,0,M0+1),yt.fill(0,0,G0+1);for(let n=0;n<t0;n++){const x=u[n],p=R[n];let U=(x*D-p*Y-Pt)*.5|0,z=(x*Y+p*D-Ct)*.5|0;U<0?U=0:U>=M0&&(U=M0-1),z<0?z=0:z>=G0&&(z=G0-1);const S=z*M0+U;P[n]=S,Be[n]=U,Se[n]=z,bt[U+1]++,yt[z+1]++,Nt[S]!==qt&&(Nt[S]=qt,q[S]=0,Z[S]=0),B[n]||(q[S]++,m[n]*Y+A[n]*D<((D>0?p<F:p>I)?-30:-12)&&(Z[S]=1))}for(let n=0;n<M0;n++)bt[n+1]+=bt[n];for(let n=0;n<G0;n++)yt[n+1]+=yt[n];for(let n=0;n<t0;n++)Ie[bt[Be[n]]++]=n;for(let n=0;n<t0;n++){const x=Ie[n];C[yt[Se[x]]++]=x}let ie=0;for(let n=0,x=-1;n<t0;n++){const p=P[C[n]];p!==x&&(O0[ie++]=p,Gt[p]=n,x=p),ye[p]=n+1}const we=D>0;for(let n=0;n<be;n++)for(let x=0;x<ie;x++){const p=O0[x],U=Gt[p],z=ye[p];if(n===1){let O=!1;for(let f=U;f<z;f++){const h0=R[C[f]];if(we?h0<=I:h0>=F){O=!0;break}}if(!O)continue}const S=p/M0|0,Q=p-S*M0,C0=Q>0,B0=S>0,S0=B0?p-M0-(C0?1:0):0,wt=B0?p-M0+(Q+1<M0?1:0):0,Q0=C0&&Nt[p-1]===qt,Z0=Q0?Gt[p-1]:U;let ft=q[p]+(Q0?q[p-1]:0),f0=0,ut=0,A0=0;if(B0)for(let O=S0;O<=wt;O++)Nt[O]===qt&&(ut===A0&&(ut=Gt[O]),A0=ye[O],ft+=q[O],f0|=Z[O]);for(let O=U;O<z;O++){const f=C[O];let h0=B[f];if(n===1&&(we?R[f]>I:R[f]<F))continue;if(h0){if(n===0&&f0&&ce(e,f))h0=0;else if(ft===0)continue}let gt=u[f],Ut=R[f];const k=w[f];for(let m0=0;m0<3;m0++){const a0=m0===0?ut:m0===1?Z0:U,n0=m0===0?A0:m0===1?C0?U:0:O;for(let k0=a0;k0<n0;k0++){const K=C[k0],Bt=gt-u[K],D0=Ut-R[K],$0=Bt*Bt+D0*D0,P0=k+w[K];if($0>=P0*P0)continue;let x0=B[K];if(h0&&x0)continue;const V=Math.sqrt($0)||1e-6,W=$0>1e-12?Bt/V:D,H=$0>1e-12?D0/V:-Y,$=P0-V<1?P0-V:1,d0=W*Y+H*D;let T0=0;n===0&&(T0=(m[f]-m[K])*W+(A[f]-A[K])*H,(T0<-30||$>.2)&&(x0&&ce(e,K)&&(x0=0),h0&&ce(e,f)&&(h0=0)));const U0=$>.15?$-.15:0;if(x0||!h0&&d0>.3)gt+=W*$,Ut+=H*$,J[f]+=W*U0,G[f]+=H*U0;else if(h0||d0<-.3)u[K]-=W*$,R[K]-=H*$,J[K]-=W*U0,G[K]-=H*U0;else{const r0=$*.5,K0=U0*.5;if(gt+=W*r0,Ut+=H*r0,u[K]-=W*r0,R[K]-=H*r0,J[f]+=W*K0,G[f]+=H*K0,J[K]-=W*K0,G[K]-=H*K0,$>.12){const p0=($-.12)*.6;d0>=0?(gt+=Y*p0,Ut+=D*p0,J[f]+=Y*p0,G[f]+=D*p0):(u[K]+=Y*p0,R[K]+=D*p0,J[K]+=Y*p0,G[K]+=D*p0)}}if(n===0&&E<$t){V0[E]=f,s0[E]=K;const r0=E*4;N[r0]=W,N[r0+1]=H,N[r0+2]=T0,N[r0+3]=$,E++}}}if(u[f]=gt,R[f]=Ut,!h0){const m0=n===0;let a0=gt,n0=Ut;const k0=Math.floor(a0-ct),K=Math.floor(n0-Qt);if(!(k0<0||K<0||k0>=xt||K>=kt)){const Bt=K*xt+k0;for(let $0=0;$0<2;$0++){const P0=$0?so[Bt]:Zt[Bt];if(P0<0)continue;const x0=P0*8,V=dt[x0],W=dt[x0+1],H=dt[x0+2]-V,$=dt[x0+3]-W,d0=k+dt[x0+4],T0=H*H+$*$||1,U0=((a0-V)*H+(n0-W)*$)/T0;let r0,K0,p0;if(dt[x0+7]&&U0>=0&&U0<=1){r0=dt[x0+5],K0=dt[x0+6];const j0=(a0-V)*r0+(n0-W)*K0;if(j0>=d0)continue;p0=d0-j0}else{const j0=U0<0?0:U0>1?1:U0,ge=a0-V-H*j0,H0=n0-W-$*j0,Ae=ge*ge+H0*H0;if(Ae>=d0*d0||Ae<1e-12)continue;const St=Math.sqrt(Ae);r0=ge/St,K0=H0/St,p0=d0-St}if(a0+=r0*p0,n0+=K0*p0,p0>.15&&(J[f]+=r0*(p0-.15),G[f]+=K0*(p0-.15)),m0&&E<$t){V0[E]=f,s0[E]=-1;const j0=E*4;N[j0]=r0,N[j0+1]=K0,N[j0+2]=m[f]*r0+A[f]*K0,N[j0+3]=p0,E++}}const D0=it[Bt];if(D0>=0&&Ce[D0]){const $0=a0-Tt[D0],P0=n0-i0[D0],x0=$0*$0+P0*P0,V=k+pe;if(x0<V*V&&x0>1e-12){const W=Math.sqrt(x0),H=$0/W,$=P0/W;if(a0+=H*(V-W),n0+=$*(V-W),m0&&E<$t){V0[E]=f,s0[E]=-2-D0;const d0=E*4;N[d0]=H,N[d0+1]=$,N[d0+2]=m[f]*H+A[f]*$,N[d0+3]=V-W,E++}f===e.stickBall&&e.stick<0&&H*Y+$*D>.93&&i0[D0]<e.Y0-e.RH*1.5&&(e.stick=f,e.stickAt=lt,e.stickHold=14+40*at(e),a0=Tt[D0]+Y*V,n0=i0[D0]+D*V,B[f]=1,m[f]=0,A[f]=0)}}u[f]=a0,R[f]=n0}}}}for(let n=0;n<t0;n++){if(B[n])continue;ps(e,n,0,E);let x=u[n],p=R[n];x<-o0?x=-o0:x>o0&&(x=o0),p<y0?p=y0:p>nt&&(p=nt),u[n]=x,R[n]=p;let U=(x-M[n]-J[n])*Et,z=(p-b[n]-G[n])*Et;J[n]=0,G[n]=0;const S=U*U+z*z,Q=Math.max(m[n]*m[n]+A[n]*A[n],400);if(S>Q){const C0=Math.sqrt(Q/S);U*=C0,z*=C0}m[n]=U,A[n]=z}for(let n=0;n<E;n++){const x=V0[n],p=s0[n],U=n*4,z=N[U],S=N[U+1],Q=N[U+2],C0=L0*N[U+3]*Et,B0=-S,S0=z;if(p<0){const wt=m[x]*z+A[x]*S,Q0=m[x]*B0+A[x]*S0;let Z0=0;if(Q<-rt){const O=p===-1?z0:e0===2?v0*(.4+1.2*at(e)):v0,f=-O*Q;wt<f&&(Z0=f-wt),Q<-14&&Yo(e,p===-1?1:0,x,-Q)}const ft=Math.min(Math.abs(Q0),C0+L0*Z0),f0=Q0<0?-ft:ft;let ut=z,A0=S;if(p<-1&&N0>.05&&Z0>0){const O=(at(e)-.5)*N0,f=Math.cos(O),h0=Math.sin(O);ut=z*f-S*h0,A0=z*h0+S*f}m[x]+=ut*Z0-B0*f0,A[x]+=A0*Z0-S0*f0,F0[x]=F0[x]*.8+Q0*.2}else{const wt=m[x]-m[p],Q0=A[x]-A[p],Z0=wt*z+Q0*S,ft=wt*B0+Q0*S0;let f0=0;if(Q<-rt){const gt=-w0*Q;Z0<gt&&(f0=gt-Z0),Q<-20&&Yo(e,2,x,-Q)}const ut=Math.min(Math.abs(ft),C0+L0*f0),A0=ft<0?-ut:ut,O=z*Y+S*D,f=B[x]||O<-.3&&m[x]*m[x]+A[x]*A[x]<100,h0=B[p]||O>.3&&m[p]*m[p]+A[p]*A[p]<100;h0&&!f?(m[x]+=z*f0-B0*A0,A[x]+=S*f0-S0*A0):f&&!h0?(m[p]-=z*f0-B0*A0,A[p]-=S*f0-S0*A0):f||(m[x]+=(z*f0-B0*A0)*.5,A[x]+=(S*f0-S0*A0)*.5,m[p]-=(z*f0-B0*A0)*.5,A[p]-=(S*f0-S0*A0)*.5)}}const g0=(X+I)*.5,re=D>0,Dt=e.stick;for(let n=0;n<t0;n++){if(B[n])continue;W0[n]+=F0[n]*l0;const x=R[n];x>F-2&&x<X&&Dt!==n?(J0[n]=0,m[n]*m[n]+A[n]*A[n]<4&&(m[n]+=(at(e)-.5)*1.5,A[n]+=(at(e)-.5)*1.5)):m[n]*m[n]+A[n]*A[n]<9?++J0[n]>45&&(B[n]=1,m[n]=0,A[n]=0):J0[n]=0,(re?x<g0&&b[n]>=g0&&A[n]<-8:x>g0&&b[n]<=g0&&A[n]>8)&&(e.neckPass++,e.lastPass=lt,e.jamK=0)}if(lt-e.lastCheck>.25&&(e.lastCheck=lt,lt-e.lastPass>.9&&lt-e.knocked>.9)){let n=0;for(let x=0;x<t0;x++){const p=R[x];Math.abs(u[x])<14&&(re?p>I-1&&p<I+14:p<X+1&&p>X-14)&&n++}(n>6||n>2&&e.jamK<4)&&(oo(e,0,g0,16,22),e.jamK++)}}function oo(e,u,R,m,A){const M=e.px,b=e.py,B=e.vx,w=e.vy,J=e.asleep,G=e.N;if(e.knocked=e.simT,e.nKnock++,e.stick>=0&&(M[e.stick]-u)**2+(b[e.stick]-R)**2<m*m){const C=e.stick;e.stick=-1,ce(e,C)}for(let C=0;C<G;C++){const q=M[C]-u,Z=b[C]-R;if(q*q+Z*Z>m*m||J[C]&&!ce(e,C))continue;const P=A*(1-.6*Math.sqrt(q*q+Z*Z)/m);B[C]+=(at(e)-.5)*P,w[C]+=(at(e)-.3)*P*(e.upy>0?1:-1)}}Uo.add({num:83,name:"Peg Drop",fam:"Worlds",recipe:"An antique bean machine where hundreds of balls bounce through brass pins into bins and pile up into a bell curve. The balls and how many rows change every mint. Drag up or down to flip it like an hourglass, drag sideways to tilt it, tap a pin to pull it out or put it back, tap the case to knock it, or hold to slow time right down.",interactive:"Drag up or down to turn the board over like an hourglass and pour again. Drag sideways to tilt it and shift the curve. Tap a pin to pull it out or put it back; tap the case to knock it. Hold to slow time to a crawl.",music:!0,gl:!0,fps:30,seed:0,make(e){const u=e.size,R=Math.PI,m=R*2,A=Math.sqrt(3),M=(e.hash||"0x0").slice(2).padEnd(64,"0"),b=o=>parseInt(M.slice(o*8,o*8+8),16)>>>0,B=o=>{let s=o>>>0;return()=>{s=s+1831565813|0;let a=Math.imul(s^s>>>15,1|s);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}},w=B(b(0)^Math.imul(b(4),739982445)),J=B(b(1)^Math.imul(b(5),695872825)),G=B(b(2)^Math.imul(b(6),2654435761)),C=B(b(3)^Math.imul(b(7),2246822519)),q=(o,s,a)=>{let c=0;for(const d of a)c+=d;let i=o()*c,l=0;for(;i>=a[l]&&l<a.length-1;)i-=a[l++];return s[l]},Z=["Steel shot","Glass marbles","Dried beans","Brass bells"],P=["Walnut and brass","Fairground paint","Clear acrylic","Giant"],V0=["Classic triangle","Dense field","Old quincunx"],s0=["Desk lamp","Window","Museum spotlight"],N=["None","Two-colour pour","Hourglass case","A balancing ball"];let J0=q(w,Z,[44,28,21,7]),F0=q(w,P,[42,30,21,7]),W0=q(w,V0,[55,35,10]),Y=q(w,s0,[44,34,22]),D=q(w,[10,12,14],[30,45,25]),t0=q(w,N,[70,11,10,9]);e.home&&(J0="Steel shot",F0="Walnut and brass",W0="Classic triangle",Y="Desk lamp",D=12,t0="None"),F0==="Giant"&&(D=18);let e0=V0.indexOf(W0);const F=Z.indexOf(J0),X=P.indexOf(F0),I=s0.indexOf(Y),o0=N.indexOf(t0);e.trait("Balls",J0),e.trait("Board",F0),e.trait("Pins",W0),e.trait("Rows",F0==="Giant"?"18":String(D)),e.trait("Light",Y),e.trait("Something rare",t0);const y0=["Straight on","Close on the bins","Close on the pins","Across the desk"],nt=B(b(6)^Math.imul(b(2),1640531527)^625341585);let v0=q(nt,y0,[46,20,20,14]);const w0=nt()<.5?1:-1;e.home&&(v0=y0[0]);let L0=y0.indexOf(v0);e.trait("Camera",v0);const z0=B((b(7)^Math.imul(b(3),73244475)^539493)>>>0),N0=z0(),ct=z0(),Qt=z0(),xt=!e.home&&N0<.36&&t0!=="A balancing ball"&&t0!=="Two-colour pour",kt=!e.home&&Qt<.16&&F0!=="Giant"&&t0!=="Hourglass case";kt&&(D=6,e.trait("Rows","6"),W0==="Dense field"&&(W0="Classic triangle",e0=0,e.trait("Pins",W0))),e.trait("Moment",xt?"The curve standing":"Pouring");const dt=xt&&L0===2;dt&&(L0=1,v0=y0[1],e.trait("Camera",v0));const Zt=z0(),so=z0();let it=I===0?Zt<.12?2:Zt<.47?1:0:I===1?Zt<.12?2:Zt<.52?4:3:Zt<.4?6:5;kt&&I<2&&(it=2),e.home&&(it=0);const Ce=e.home||it===5?0:(Math.floor(so*256)+109)%256,Tt=(it===0||it===3||it===5)&&Ce===0?0:1+it,i0=D,pe=i0+1,be=Math.round((X===3?760:[330,290,270,240][F])*(kt?.3:1)),l0=8,Et=l0*A/2,Ft=X===3?.45:.5,pt=F===2?4.3:F===0?4:3.9,rt=.32,$t=.34,lt=pe*l0,E=lt/2,ao=(()=>{let o=1;for(let s=1;s<=i0/2;s++)o*=(i0/2+s)/(s*4);return o})(),zt=Math.ceil(be*ao*(F===2?1.12:.92)*4/(l0-2*$t)*1.12+7),M0=zt+3.4,G0=M0+(i0-1)*Et,Pt=G0+5.2,Ct=Pt+2.6,qt=.72,Nt=(E-pt/2)*qt,Gt=Ct+Nt,ye=be*4.4,Be=Nt*(lt+pt)/2,Se=(E-pt/2)*(E-pt/2)*(qt-.2),Ie=Math.max(6,(ye+Se-Be)/lt+4),O0=Gt+Ie,bt=o0===2,yt=[],ie=(o,s,a,c,i,l)=>{const d=Math.hypot(a-o,c-s)||1,r=l||0;yt.push([o,s,a,c,i||rt,-(c-s)/d*r,(a-o)/d*r,r?1:0])},we=(o,s)=>{for(let a=0;a+1<o.length;a++)ie(o[a][0],o[a][1],o[a+1][0],o[a+1][1],rt,s)},g0=[];g0.push([E,0],[E,zt]);{const o=G0-Et,s=l0/2+Ft+3.1;g0.push([s,o]),g0.push([Ft+rt+6.2,G0]),g0.push([pt/2,Pt])}if(g0.push([pt/2,Ct]),bt)for(let s=1;s<=10;s++){const a=s/10,c=pt/2+(E-pt/2)*a,i=Ct+Nt*(a-.22*Math.sin(a*R));g0.push([c,i])}else g0.push([E,Gt]);g0.push([E,O0],[0,O0]),we(g0,1),we(g0.map(o=>[-o[0],o[1]]),-1),ie(-E,0,E,0,rt,1);const re=[];for(let o=0;o<i0;o++)re.push((o-(i0-1)/2)*l0);for(const o of re)ie(o,0,o,zt,$t,0);const Dt=[],n=[];if(e0===1){const s=5.4*A/2,a=Math.floor((G0-M0+2)/s)+1;for(let c=0;c<a;c++)for(let i=0;i<=c;i++)Dt.push((i-c/2)*5.4),n.push(G0-c*s)}else for(let o=0;o<i0;o++)for(let s=0;s<=o;s++)Dt.push((s-o/2)*l0),n.push(G0-o*Et);const x=Dt.length,p=Float64Array.from(Dt),U=Float64Array.from(n),z=new Uint8Array(x).fill(1);if(e0===2)for(let o=3;o<x;o++)J()<.13&&(z[o]=0);const S=-E-4,Q=-4,C0=Math.ceil(lt+8),B0=Math.ceil(O0+8),S0=C0*B0,wt=new Int16Array(S0).fill(-1),Q0=new Int16Array(S0).fill(-1),Z0=new Int16Array(S0).fill(-1),ft=new Float32Array(S0).fill(1e9),f0=new Float32Array(S0).fill(1e9),ut=new Float32Array(S0).fill(1e9),A0=yt.length,O=new Float64Array(A0*8);yt.forEach((o,s)=>{for(let a=0;a<8;a++)O[s*8+a]=o[a]});for(let o=0;o<A0;o++){const[s,a,c,i,l]=yt[o],d=l+2.6,r=Math.max(0,Math.floor(Math.min(s,c)-d-S)),y=Math.min(C0-1,Math.ceil(Math.max(s,c)+d-S)),_=Math.max(0,Math.floor(Math.min(a,i)-d-Q)),v=Math.min(B0-1,Math.ceil(Math.max(a,i)+d-Q)),g=c-s,T=i-a,L=g*g+T*T||1;for(let j=_;j<=v;j++)for(let u0=r;u0<=y;u0++){const E0=S+u0+.5,R0=Q+j+.5,Jt=Math.max(0,Math.min(1,((E0-s)*g+(R0-a)*T)/L)),Mt=Math.hypot(E0-s-g*Jt,R0-a-T*Jt)-l;if(Mt>2.4)continue;const mt=j*C0+u0;Mt<ft[mt]?(f0[mt]=ft[mt],Q0[mt]=wt[mt],ft[mt]=Mt,wt[mt]=o):Mt<f0[mt]&&(f0[mt]=Mt,Q0[mt]=o)}}for(let o=0;o<x;o++){const s=Dt[o],a=n[o];for(let c=Math.floor(a-3-Q);c<=Math.ceil(a+3-Q);c++)for(let i=Math.floor(s-3-S);i<=Math.ceil(s+3-S);i++){if(c<0||i<0||c>=B0||i>=C0)continue;const l=Math.hypot(S+i+.5-s,Q+c+.5-a),d=c*C0+i;l<2.4&&l<ut[d]&&(ut[d]=l,Z0[d]=o)}}const f=be,h0=E-rt-1,gt=rt+1,Ut=O0-rt-1,k=Ho(f,F,M0,Pt,Ct,G0,Et,h0,gt,Ut,Ft,S,Q,C0,B0,wt,Q0,Z0,O,p,U,z,b(5)^2135587861),{px:m0,py:a0,vx:n0,vy:k0,ox:K,oy:Bt,ang:D0,wv:$0,sc:P0,rad:x0,asleep:V,EV:W}=k,H=new Uint8Array(f),$=new Float32Array(f),d0=1/120,T0=()=>at(k),U0=o=>ce(k,o),r0=()=>de(k),K0=(o,s,a,c)=>oo(k,o,s,a,c);{const o=B(b(6)^1013904242);let s=0,a=0;for(let v=Ct+1.2;s<f&&a<400;v+=2,a++){let g=v<Gt?pt/2+(v-Ct)/qt:E;g-=rt+1.15;const T=o()*1.1;for(let L=-g+T;L<=g&&s<f;L+=2.08+o()*.12)m0[s]=L,a0[s]=v+(o()-.5)*.12,s++}for(let v=0;v<f;v++)x0[v]=1-o()*(F===2?.16:F===1?.08:.12),V[v]=0,$[v]=o(),D0[v]=o()*m,H[v]=o0===1&&v>=f/2?1:0;const c=B(b(3)^1759714724),i=Math.round(f*(xt?X===3?.78:[.6,.55,.45,.6][F]-(i0<12?.05:0):[.08,.24,.06,.14][F]+(i0>12?.05:0))),l=new Int32Array(pe),d=new Int32Array(i),r=new Int32Array(i),y=e0===1?Math.floor((M0+(i0-1)*Et-M0+2)/(5.4*A/2))+1:i0,_=e0===1?5.4:l0;for(let v=0;v<i;v++){const g=f-1-v;let T=0;for(let R0=0;R0<y;R0++)T+=c()<.5?1:0;const L=Math.max(0,Math.min(i0,Math.round((T-y/2)*_/l0+i0/2))),j=l[L]++,u0=Math.floor(j/5)*2+(j%5<3?0:1),E0=j%5<3?(j%5-1)*2.2:(j%5-3.5)*2.2;m0[g]=(L-i0/2)*l0+E0+(c()-.5)*.3,a0[g]=rt+1.02+u0*1.74+(c()-.5)*.05,n0[g]=0,k0[g]=0,V[g]=1,H[g]=0,d[v]=L,r[v]=u0}if(xt){const v=B(b(4)^1374496523),g=new Int32Array(pe);for(let T=0;T<i;T++)g[d[T]]=Math.max(g[d[T]],r[T]);for(let T=0;T<i;T++)if(r[T]>g[d[T]]-3){const L=f-1-T;m0[L]+=(v()-.5)*.7,a0[L]+=v()*.3,V[L]=0}}if(o0===1)for(let v=0;v<f-i;v++)H[v]=v<f/2-i?0:1}let p0=0;const j0=o=>{p0=o,ze(k,o,E,O0)};j0(0),Xo||(Xo=!0,ds(k,E,O0,zt));const ge=()=>{for(let o=0;o<f;o++)V[o]&&o!==k.stick&&U0(o)},H0=X===3||kt?4.6:6.4,Ae=.9,St=-E-H0-.5,bs=E+H0+.5,Re=-H0-.5,ys=O0+H0+.5,le=bs-St,te=ys-Re,ee=O0/2,It=Math.min(.872/te,.88/le),_e=.045,ws=_e+.032,qe=(E+H0)*It,no=(ee+H0)*It,Le=(o,s)=>{const a=new Array(9);for(let c=0;c<3;c++)for(let i=0;i<3;i++)a[c*3+i]=o[c*3]*s[i]+o[c*3+1]*s[3+i]+o[c*3+2]*s[6+i];return a},fe=(o,s,a)=>{const c=o[6]*s+o[7]*a+o[8];return[(o[0]*s+o[1]*a+o[2])/c,(o[3]*s+o[4]*a+o[5])/c]},Vo=o=>{const[s,a,c,i,l,d,r,y,_]=o,v=l*_-d*y,g=-(i*_-d*r),T=i*y-l*r,L=s*v+a*g+c*T;return[v/L,-(a*_-c*y)/L,(a*d-c*l)/L,g/L,(s*_-c*r)/L,-(s*d-c*i)/L,T/L,-(s*y-a*r)/L,(s*l-a*i)/L]};let I0=[1,0,0,0,1,0,0,0,1],vt=I0,ue=1;if(L0>0){const o=dt?[15,-10,-2.5,1.3,.5,.2,.5,.36]:[null,[15,-10,-2.5,1.62,.4,.22,.5,.4],[-13,8,3,1.65,.57,.38,.5,.5],[28,-6,1.5,1.2,.5,.47,.5,.5]][L0],s=R/180,a=o[0]*w0*s,c=o[1]*s,i=o[2]*w0*s,l=1,d=.5+(o[4]-.5)*w0,r=[Math.cos(a),0,Math.sin(a),0,1,0,-Math.sin(a),0,Math.cos(a)],y=[1,0,0,0,Math.cos(c),-Math.sin(c),0,Math.sin(c),Math.cos(c)],_=[Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i),0,0,0,1],v=[1/l,0,-.5/l,0,1/l,-.5/l,0,0,1];for(let j=o[3],u0=0;u0<12;u0++,j*=1.04){let E0=Le([l*j,0,.5,0,l*j,.5,0,0,1],Le(_,Le(y,Le(r,v))));const R0=fe(E0,d,o[5]);E0=Le([1,0,o[6]-R0[0],0,1,o[7]-R0[1],0,0,1],E0);const Jt=Vo(E0);let Mt=!0;for(const[mt,js]of[[0,0],[1,0],[0,1],[1,1],[.5,0],[.5,1],[0,.5],[1,.5]]){const eo=fe(Jt,mt,js);(eo[0]<.004||eo[0]>.996||eo[1]<.004||eo[1]>.996)&&(Mt=!1)}if(I0=E0,vt=Jt,Mt)break}const g=fe(I0,d,o[5]),T=fe(I0,d+.01,o[5]),L=fe(I0,d,o[5]+.01);ue=Math.max(Math.hypot(T[0]-g[0],T[1]-g[1]),Math.hypot(L[0]-g[0],L[1]-g[1]))/.01}else{const o=X===3?1.12:bt?1.08:1.22,s=.03;I0=[o,0,.5-.5*o,0,o,s-s*o,0,0,1],vt=Vo(I0),ue=o}const gs=new Float32Array([I0[0],I0[3],I0[6],I0[1],I0[4],I0[7],I0[2],I0[5],I0[8]]),co=new Float32Array([vt[0],vt[3],vt[6],vt[1],vt[4],vt[7],vt[2],vt[5],vt[8]]),tt=[[-.52,.56,.64],[.66,.22,.72],[.12,.66,.74]][I];{const o=Math.hypot(...tt);for(let s=0;s<3;s++)tt[s]/=o}const Me=[[2.1,1.54,.96],[1.3,1.36,1.44],[2.7,2.42,2.1]][I],Ne=[[.16,.13,.11],[.3,.33,.38],[.05,.05,.06]][I],io=(o,s)=>{const a=o+s,c=Math.abs(Math.cos(a))*no+Math.abs(Math.sin(a))*qe;return[.5-Math.sign(s)*(qe-qe*Math.cos(s))-no*Math.sin(s),_e+c,a]},Wo=B(b(7)^461845907),ro=F===0?[[.62,.63,.66],[.66,.42,.24]]:F===1?[[[.55,.78,.8],[.8,.55,.22],[.42,.66,.36],[.82,.84,.86]][Math.floor(Wo()*4)],[.7,.12,.1]]:F===2?[[[.62,.48,.34],[.5,.12,.1],[.82,.78,.68]][Math.floor(Wo()*3)],[.05,.045,.05]]:[[.95,.68,.3],[.78,.8,.84]];o0===1&&F===1&&(ro[1]=[.12,.2,.62]);const As=F===2&&o0!==1;if(o0===3){k.stickBall=0;let o=-1;for(let s=0;s<f;s++)a0[s]>o&&Math.abs(m0[s])<6&&(o=a0[s],k.stickBall=s);H[k.stickBall]=1}if(As)for(let o=0;o<f;o++)H[o]=2;if(F===1&&o0!==1)for(let o=0;o<f;o++)o!==k.stickBall&&(H[o]=3);const t=e.gl,et=`
`,Oo=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),lo=Oo?"#define HE(v) (v)"+et+"#define HD(v) (v)"+et:"#define HE(v) (clamp(((v) + vec4(0.5, 0.0, 0.0, 0.0)) / vec4(4.5, 5.0, 8.0, 1.0), 0.0, 1.0))"+et+"#define HD(v) ((v) * vec4(4.5, 5.0, 8.0, 1.0) - vec4(0.5, 0.0, 0.0, 0.0))"+et,fo="uniform mat3 uVw; vec4 VW(vec2 p){ vec3 h = uVw * vec3(p, 1.0); return vec4(h.xy * 2.0 - h.z, 0.0, h.z); }"+et,ot="#version 300 es"+et+"precision highp float;"+et,oe=ot+"layout(location=0) in vec2 aP; out vec2 vUv; void main(){ vUv = aP * 0.5 + 0.5; gl_Position = vec4(aP, 0.0, 1.0); }",Ge=`
vec3 tone(vec3 x){ x *= 0.92; vec3 y = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14); return pow(clamp(y, 0.0, 1.0), vec3(1.0 / 2.2)); }
float nz(vec2 p){ return texture(uNz, p).g; }
`,Ko=`
vec3 glassR(vec2 w, vec2 p){
  vec3 r;
  if (uLt == 0) { vec2 d = (w - vec2(0.36, 0.78)) * vec2(1.0, 1.5); r = uLC * (0.14 * exp(-dot(d, d) * 9.0) + 0.012) + vec3(0.005); }
  else if (uLt == 1) { vec2 q = w - vec2(0.7, 0.66); float win = smoothstep(0.02, 0.0, max(abs(q.x) - 0.17, abs(q.y) - 0.24)) * smoothstep(0.004, 0.012, abs(q.x)) * smoothstep(0.004, 0.012, abs(q.y + 0.03)); r = uLC * (0.022 + 0.05 * win * (0.7 + 0.3 * w.y)); }
  else { vec2 d = w - vec2(0.5, 0.97); r = uLC * (0.03 * exp(-dot(d, d) * 18.0) + 0.002); }
  float sm = texture(uNz, p * 0.021 + 0.3).g * 0.6 + texture(uNz, p * 0.09).g * 0.4;
  r *= 0.8 + 0.4 * smoothstep(0.45, 0.8, sm);
  r += uLC * 0.004 * smoothstep(0.72, 0.9, sm);
  return r * uGl;
}
float glassM(vec4 hv){ return hv.a * (1.0 - smoothstep(1.5, 1.9, hv.g) * (1.0 - smoothstep(2.1, 2.5, hv.g))) * (1.0 - smoothstep(4.3, 4.7, hv.g)); }
`,Rs=ot+lo+`in vec2 vUv; out vec4 o;
uniform vec4 uBox; uniform vec2 uHalf[40]; uniform int uNH; uniform vec4 uG; uniform vec4 uG2; uniform vec4 uPin; uniform vec4 uG3;
float segD(vec2 p, vec2 a, vec2 b){ vec2 e = b - a; float t = clamp(dot(p - a, e) / max(dot(e, e), 1e-6), 0.0, 1.0); return length(p - a - e * t); }
void main(){
  vec2 p = uBox.xy + vUv * uBox.zw, q = vec2(abs(p.x), p.y);
  // the channel: inside test (crossings) and distance to its walls
  float dmin = 1e9; bool inside = false; vec2 a = vec2(0.0);
  for (int i = 0; i < 40; i++) {
    if (i >= uNH) break;
    vec2 b = uHalf[i];
    dmin = min(dmin, segD(q, a, b));
    if ((a.y > q.y) != (b.y > q.y) && q.x < a.x + (q.y - a.y) * (b.x - a.x) / (b.y - a.y)) inside = !inside;
    a = b;
  }
  if ((a.y > q.y) != (0.0 > q.y) && q.x < a.x + (q.y - a.y) * (0.0 - a.x) / (0.0 - a.y + 1e-6)) inside = !inside;
  float sd = inside ? dmin : -dmin; // > 0 in the channel
  float XW = uG.x, YR = uG.y, HB = uG.z, FT = uG.w;
  // the case
  float dCase, dGlass;
  if (uG3.x > 0.5) { dCase = -sd - FT; dGlass = -sd - uG3.y; }
  else {
    vec2 c = vec2(0.0, YR * 0.5), hb = vec2(XW + FT, YR * 0.5 + FT);
    vec2 d = abs(p - c) - hb + 2.2; dCase = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - 2.2;
    vec2 d2 = abs(p - c) - vec2(XW + uG3.y, YR * 0.5 + uG3.y); dGlass = max(d2.x, d2.y);
  }
  float px = uG3.z; // one texel in board units
  float cov = clamp(0.5 - dCase / px, 0.0, 1.0);
  float h, mat, ex = 0.0;
  if (dGlass > 0.0) { // the frame: a rounded outer edge, a flat top, a small step down to the glass
    float e = -dCase, f = dGlass;
    h = 2.7 + 0.75 * sqrt(clamp(e / 1.6, 0.0, 1.0)) - 0.32 * (1.0 - smoothstep(0.0, 0.9, f)) + 0.1 * smoothstep(0.9, 1.3, f) * (1.0 - smoothstep(1.3, 1.6, f));
    mat = 2.0; ex = f;
    if (uG3.w > 0.5) { // brass corner caps and a blank plaque on the bottom rail
      vec2 cc = vec2(XW + FT, -FT); vec2 r = vec2(abs(p.x), p.y < YR * 0.5 ? p.y : YR - p.y);
      float m = (cc.x - r.x) + (r.y - cc.y);
      vec2 rs = r - (cc + vec2(-2.1, 2.1)), pq = vec2(abs(p.x) - min(9.0, XW * 0.28) + 1.3, p.y + FT * 0.5);
      vec2 pl = abs(p - vec2(0.0, -FT * 0.5)) - vec2(min(9.0, XW * 0.28), FT * 0.24);
      float bp = m < 7.0 ? 7.0 - m : -max(pl.x, pl.y); // inside a brass plate: distance in from its edge
      if (bp > 0.0) {                                   // bevelled plates, each held by domed screws with a slot
        mat = 5.0; h += 0.1 + 0.14 * smoothstep(0.0, 0.7, bp);
        vec2 sq = m < 7.0 ? rs : pq; float ds = length(sq) / 0.62;
        if (ds < 1.0) h += 0.22 * sqrt(1.0 - ds * ds) - 0.18 * smoothstep(0.16, 0.08, abs(sq.x * 0.8 + sq.y * 0.6));
      }
    }
  } else if (sd > 0.0) {
    h = 0.0; mat = 0.0; ex = sd;
    // dividers
    if (p.y < HB + 0.3) {
      float n = uG2.z, k = clamp(floor(p.x / uG2.x + (n - 1.0) * 0.5 + 0.5), 0.0, n - 1.0), xd = (k - (n - 1.0) * 0.5) * uG2.x;
      float dd = length(vec2(p.x - xd, max(p.y - (HB - uG2.y), 0.0)));
      if (dd < uG2.y) { h = 2.25; mat = 3.0; ex = dd / uG2.y; }
    }
    // drilled pin holes at every lattice site
    float j = floor((uPin.x - p.y) / uPin.y + 0.5);
    if (j >= 0.0 && j < uPin.w) {
      float i = floor(p.x / uPin.z + j * 0.5 + 0.5);
      if (i >= 0.0 && i <= j) {
        vec2 c = vec2((i - j * 0.5) * uPin.z, uPin.x - j * uPin.y); float dh = length(p - c);
        if (dh < uG2.w * 1.25) { h = -0.45; mat = 4.0; }
        else if (dh < uG2.w * 1.25 + 0.25) h = -0.12 * (1.0 - (dh - uG2.w * 1.25) / 0.25);
      }
    }
  } else { // the solid fill beside the channel, its edge a short rounded wall
    float u = clamp(-sd / 0.45, 0.0, 1.0);
    h = 2.25 * (1.0 - (1.0 - u) * (1.0 - u)); mat = 1.0; ex = -sd;
  }
  o = HE(vec4(h, mat, ex, cov));
}`,Ls=ot+lo+`in vec2 vUv; out vec4 o;
uniform sampler2D uH; uniform sampler2D uNz; uniform vec4 uBox; uniform vec3 uL; uniform vec3 uLC; uniform vec3 uAmb; uniform vec4 uPool; uniform vec4 uSty; uniform vec2 uTx; uniform int uSt; uniform vec4 uG;
${Ge}
float H(vec2 uv){ return HD(texture(uH, uv)).r; }
float at2(float y, float x){ float ax = abs(x), ay = abs(y), a = atan(min(ax, ay) / max(max(ax, ay), 1e-20)); a = ay > ax ? 1.5707963 - a : a; a = x < 0.0 ? 3.1415927 - a : a; return y < 0.0 ? -a : a; }
float wood(vec2 p, float along){ // streaky figure along the grain, with slow rings
  vec2 g = along > 0.5 ? p.yx : p;
  float n1 = nz(vec2(g.x * 0.011, g.y * 0.18)), n2 = nz(vec2(g.x * 0.003 + 0.37, g.y * 0.05));
  float ring = sin(g.y * 0.9 + n2 * 14.0 + n1 * 3.0) * 0.5 + 0.5;
  return clamp(0.55 * ring + 0.45 * n1, 0.0, 1.0);
}
void main(){
  vec4 hv = HD(texture(uH, vUv)); float h = hv.r, mat = floor(hv.g + 0.5), ex = hv.b;
  vec2 p = uBox.xy + vUv * uBox.zw;
  float hx = H(vUv + vec2(uTx.x, 0.0)) - H(vUv - vec2(uTx.x, 0.0)), hy = H(vUv + vec2(0.0, uTx.y)) - H(vUv - vec2(0.0, uTx.y));
  vec3 N = normalize(vec3(-hx, -hy, 2.0 * uTx.x * uBox.z));
  // soft shadow: march toward the light over the relief
  vec2 ld = normalize(uL.xy + 1e-5); float slope = uL.z / max(length(uL.xy), 1e-3), sh = 1.0;
  for (int k = 1; k < 64; k++) {
    if (k >= uSt) break;
    float t = float(k) * 0.32; vec2 uv = vUv + ld * t / uBox.zw;
    float d = H(uv) - (h + 0.03 + t * slope);
    sh = min(sh, clamp(1.0 - d * 3.0 / (0.3 + t * 0.35), 0.0, 1.0));
  }
  // ambient occlusion from the relief around
  float ao = 0.0;
  for (int k = 0; k < 8; k++) { float a = float(k) * 0.785 + 0.3; vec2 dv = vec2(cos(a), sin(a));
    ao += max(H(vUv + dv * 1.1 / uBox.zw) - h, 0.0) / 1.1 * 0.5 + max(H(vUv + dv * 3.2 / uBox.zw) - h, 0.0) / 3.2 * 0.5; }
  ao = clamp(1.0 - ao * 0.32, 0.25, 1.0);
  // materials
  int sty = int(uSty.x + 0.5);
  vec3 alb; float gl = 30.0, sk = 0.05, op = 1.0;
  float n = nz(p * 0.05), n2 = nz(p * 0.31 + 3.7);
  if (mat < 0.5) { // the back panel
    if (sty == 2) alb = vec3(0.23, 0.27, 0.26) * (0.97 + 0.03 * n2); // clear: the wall seen through it, a little darker and greener
    else {
      alb = (sty == 1 ? vec3(0.86, 0.76, 0.56) : vec3(0.74, 0.66, 0.5)) * (0.95 + 0.05 * n + 0.04 * n2);
      alb *= 1.0 - 0.035 * smoothstep(0.5, 0.8, nz(p * 0.006 + 1.3)); // age
      alb = mix(alb, vec3(0.55, 0.38, 0.2), 0.16 * smoothstep(0.66, 0.74, nz(p * 0.043 + 9.0)) * smoothstep(0.4, 0.7, nz(p * 0.007 + 5.0))); // foxing
      if (sty == 1) { vec2 d = p - vec2(0.0, uG.y); float a = at2(d.x, -d.y); float s = smoothstep(0.2, 0.0, abs(fract(a * 6.0) - 0.5) - 0.25); alb = mix(alb, vec3(0.78, 0.36, 0.26), 0.16 * s * step(uG.z, p.y)); }
    }
    // bin marks: fine engraved ticks up the back of each bin
    if (p.y < uG.z && p.y > 2.0) { float t = abs(fract(p.y / 10.0 + 0.5) - 0.5) * 10.0; float bx = abs(fract(p.x / uG.w + 0.5) - 0.5) * uG.w; alb *= 1.0 - 0.32 * smoothstep(0.16, 0.05, t) * smoothstep(1.4, 1.0, bx); }
    gl = 18.0; sk = sty == 2 ? 0.08 : 0.03;
  } else if (mat < 1.5) { // the fill beside the channel
    if (sty == 1) {
      vec3 g0 = uSty.y < 0.5 ? vec3(0.04, 0.11, 0.075) : uSty.y < 1.5 ? vec3(0.035, 0.045, 0.11) : vec3(0.03, 0.025, 0.025);
      vec2 dq = vec2(p.x / 7.0 + p.y / 11.0, p.x / 7.0 - p.y / 11.0); vec2 fq = fract(dq) - 0.5;
      float hq = mod(floor(dq.x) + floor(dq.y), 2.0);
      alb = g0 * (0.82 + 0.3 * hq) * (0.92 + 0.12 * n);
      float le = min(0.5 - abs(fq.x), 0.5 - abs(fq.y)) + (nz(p * 0.04 + 2.0) - 0.5) * 0.03;               // hand-lined gold between the lozenges
      alb = mix(alb, vec3(0.62, 0.43, 0.14), smoothstep(0.022, 0.008, le) * (0.6 + 0.4 * nz(p * 0.11)));
      alb = mix(alb, vec3(0.75, 0.52, 0.16), smoothstep(0.07, 0.03, length(fq)) * 0.8 * step(0.5, mod(floor(dq.x) + floor(dq.y) * 3.0, 4.0) * 0.5)); // a few studs, not every lozenge
      alb *= 1.0 - 0.25 * smoothstep(0.02, 0.0, abs(nz(p * 0.021 + 4.1) - 0.5)) * smoothstep(0.45, 0.75, nz(p * 0.004 + 1.0)); // crazing in the old enamel
      alb = mix(alb, vec3(0.75, 0.52, 0.16), smoothstep(0.16, 0.05, abs(ex - 1.3)) + smoothstep(0.1, 0.03, abs(ex - 1.75))); // pinstripes
      float wear = smoothstep(0.55, 0.72, nz(p * 0.08 + 7.0)) * smoothstep(3.0, 0.5, ex);
      alb = mix(alb, vec3(0.3, 0.2, 0.12), wear * 0.7);
      gl = 40.0; sk = 0.09;
    }
    else if (sty == 2) { alb = vec3(0.2, 0.235, 0.23) * (0.96 + 0.04 * n2); gl = 12.0; sk = 0.04; }
    else { float w = wood(p * vec2(1.0, 1.0), 1.0); alb = mix(vec3(0.07, 0.035, 0.018), vec3(0.24, 0.13, 0.07), w); gl = 60.0; sk = 0.14; }
    if (ex < 0.45) { alb *= 0.85; } // the routed wall face
  } else if (mat < 2.5) { // the frame
    float horiz = step(uG.x + 0.5, abs(p.x)); // stiles run along y, rails along x
    if (sty == 1 && uSty.z < 0.5) { alb = vec3(0.24, 0.04, 0.028) * (0.9 + 0.15 * n); alb = mix(alb, vec3(0.7, 0.49, 0.15), (smoothstep(0.2, 0.06, abs(ex - 2.3)) + smoothstep(0.14, 0.04, abs(ex - 2.75))) * (0.75 + 0.25 * n2));
      alb = mix(alb, vec3(0.32, 0.2, 0.11) * (0.8 + 0.3 * n2), smoothstep(0.58, 0.7, nz(p * 0.07 + 3.0)) * smoothstep(5.2, 6.4, ex)); gl = 28.0; sk = 0.07; } // paint worn to the wood on the edge
    else if (sty == 2) { float eg = smoothstep(0.9, 0.0, ex) + smoothstep(5.4, 6.4, ex); alb = mix(vec3(0.5, 0.58, 0.6), vec3(0.8, 1.0, 0.9), eg); gl = 160.0; sk = 0.55; op = 0.32 + 0.5 * eg + 0.1 * smoothstep(4.0, 6.0, ex); } // acrylic shows in its edges, which glow green-white
    else { float w = wood(p, horiz); alb = mix(vec3(0.05, 0.022, 0.012), vec3(0.2, 0.1, 0.05), w); gl = 90.0; sk = 0.2; }
  } else if (mat < 3.5) { // dividers
    if (sty == 1) { alb = vec3(0.75, 0.52, 0.16); gl = 60.0; sk = 0.3; }
    else if (sty == 2) { alb = vec3(0.6, 0.66, 0.68); gl = 120.0; sk = 0.4; }
    else { alb = mix(vec3(0.07, 0.035, 0.02), vec3(0.2, 0.11, 0.06), nz(p * vec2(0.4, 0.02))); gl = 60.0; sk = 0.14; }
  } else if (mat < 4.5) { alb = vec3(0.02, 0.015, 0.01); sk = 0.0; }
  else { alb = vec3(0.62, 0.42, 0.16) * (0.85 + 0.2 * n2); gl = 80.0; sk = 0.9; }
  // light: a pool from the lamp, spot or window, falling off across the board
  float pool = mix(1.0, smoothstep(uPool.z * 1.15, uPool.z * 0.15, length(p - uPool.xy)), uPool.w);
  vec3 L = normalize(uL), V = vec3(0.0, 0.0, 1.0), Hh = normalize(L + V);
  float df = max(dot(N, L), 0.0) * sh * pool;
  float sp = pow(max(dot(N, Hh), 0.0), gl) * sh * pool * (gl + 8.0) / 40.0;
  vec3 col = alb * (uLC * df + uAmb * ao * (0.6 + 0.4 * N.z)) + uLC * sp * sk;
  if (mat > 4.5) col += alb * uAmb * 0.6 * (1.0 - N.z); // brass catches the room
  // a = light reaching a ball here (shadow and pool) inside; opacity on the frame
  o = vec4(tone(col), mat > 1.5 && mat < 2.5 ? op : sh * pool);
}`,jo=ot+"uniform mat3 uVi;"+et+`in vec2 vUv; out vec4 o;
uniform sampler2D uNz; uniform vec4 uRm; uniform vec3 uLC; uniform vec3 uAmb; uniform int uLt;
${Ge}
void main(){
  vec3 wh = uVi * vec3(vUv, 1.0); vec2 w = wh.xy / wh.z; float ydb = uRm.y, yd = uRm.x;
  vec3 col;
  float n = nz(w * vec2(3.0, 3.0)), n2 = nz(w * 23.0 + 1.7);
  if (w.y > ydb) { // the wall
    vec3 base = uLt == 0 ? vec3(0.09, 0.075, 0.06) : uLt == 1 ? vec3(0.42, 0.44, 0.46) : vec3(0.025, 0.025, 0.03);
    base *= 0.93 + 0.1 * n + 0.04 * n2;
    vec3 lit = vec3(0.0);
    if (uLt == 0) {
      vec2 d = (w - vec2(0.3, 0.78)) * vec2(1.0, 1.15); lit = uLC * 0.55 * exp(-dot(d, d) * 3.2) + uLC * 0.08;
      // a bookcase behind, well out of focus
      float sy = (w.y - ydb + 0.03) / 0.215, row = floor(sy), fy = fract(sy);
      float cx = w.x * 38.0 + row * 7.31 + 2.2 * sin(w.x * 7.0 + row * 2.1) + 1.3 * sin(w.x * 23.0 + row), ci = floor(cx);
      float h0 = texture(uNz, (vec2(ci + 23.0, row * 3.0 + 41.0) + 0.5) / 128.0).r;
      cx -= (fy - 0.12) * step(0.86, h0) * (h0 - 0.93) * 9.0; ci = floor(cx); float fx = fract(cx); // a few lean on their neighbours
      float h1 = texture(uNz, (vec2(ci, row * 3.0) + 0.5) / 128.0).r, h2 = texture(uNz, (vec2(ci + 61.0, row * 3.0 + 17.0) + 0.5) / 128.0).r;
      float bh = 0.12 + 0.6 * (0.55 + 0.45 * h1);
      float bl = 0.45;
      float book = smoothstep(-bl, bl, (bh - fy) * 2.5) * smoothstep(-0.1, bl, fx) * smoothstep(1.1, 1.0 - bl, fx) * step(0.1, h2);
      vec3 bc = h2 < 0.3 ? vec3(0.11, 0.03, 0.025) : h2 < 0.48 ? vec3(0.035, 0.06, 0.045) : h2 < 0.62 ? vec3(0.035, 0.04, 0.07) : h2 < 0.8 ? vec3(0.15, 0.1, 0.06) : vec3(0.03, 0.025, 0.02);
      bc *= (0.7 + 0.5 * h1) * (0.8 + 0.35 * smoothstep(0.0, 0.5, fx) * smoothstep(1.0, 0.6, fx));       // round spines
      bc += vec3(0.5, 0.36, 0.14) * 0.22 * step(0.55, h1) * (smoothstep(0.05, 0.0, abs(fy - bh * 0.84)) + smoothstep(0.035, 0.0, abs(fy - 0.3))) * smoothstep(0.1, 0.4, fx) * smoothstep(0.9, 0.6, fx); // gilt titles, soft
      if (h2 < 0.1 && fy < 0.36) { float sl = floor(fy * 16.0); book = smoothstep(0.38, 0.3, fy); bc = vec3(0.09, 0.04, 0.03) * (0.6 + 0.8 * fract(sl * 0.618 + h1)); } // a stack lying flat in a gap
      float board = smoothstep(0.12, 0.02, fy) + smoothstep(0.96, 1.0, fy) * 0.5;
      base = mix(mix(vec3(0.016, 0.011, 0.008), bc, book * 0.85), vec3(0.11, 0.06, 0.035), clamp(board, 0.0, 1.0));
      base += vec3(0.16, 0.1, 0.05) * smoothstep(0.03, 0.0, abs(fy - 0.1)) * 0.6;                         // the shelf's front edge catches the lamp
      base *= 0.55 * (0.75 + 0.25 * smoothstep(bh + 0.25, bh - 0.05, fy));
    }
    else if (uLt == 1) { // a window's light across the wall, with the shadow of its bars
      vec2 q = vec2(w.x + (w.y - 0.5) * 0.35, w.y);
      float win = smoothstep(0.045, -0.01, max(abs(q.x - 0.16) - 0.13, abs(q.y - 0.62) - 0.24));                 // soft: the sky through a pane, not a lamp
      float bars = 0.35 + 0.65 * smoothstep(0.003, 0.014, abs(q.x - 0.16)) * smoothstep(0.003, 0.014, abs(q.y - 0.6));
      lit = uLC * (0.32 + 0.5 * win * bars) * (0.75 + 0.25 * w.y);
    } else { vec2 d = (w - vec2(0.5, 0.52)) * vec2(1.25, 0.8); lit = uLC * 0.5 * smoothstep(0.62, 0.15, length(d)) + uLC * 0.015; }
    col = base * (lit + uAmb);
    col *= 1.0 - 0.35 * smoothstep(0.03, 0.0, w.y - ydb); // the corner where wall meets desk
    if (uRm.z > 0.5 && w.y < ydb + 0.045) { // a big board stands on the floor: a skirting board along the wall
      float u = (w.y - ydb) / 0.045;
      vec3 sk = (uLt == 0 ? vec3(0.08, 0.06, 0.045) : uLt == 1 ? vec3(0.62, 0.6, 0.56) : vec3(0.03, 0.03, 0.032)) * (0.95 + 0.05 * n2);
      col = sk * (lit + uAmb) * (0.8 + 0.3 * smoothstep(0.9, 0.97, u) - 0.25 * smoothstep(0.97, 1.0, u));
    }
  } else { // the desk top, receding toward the wall
    float z = (ydb - w.y) / ydb; float u = 1.0 / (0.25 + z * 3.0);
    vec2 g = vec2(w.x * 2.2 * (0.5 + 0.5 * u) + u * 0.0, u * 0.6);
    float plank = abs(fract(g.y * 2.5) - 0.5);
    float fig = nz(vec2(g.x * 0.25, g.y * 3.0)) * 0.7 + nz(vec2(g.x * 0.06, g.y * 0.7)) * 0.3;
    vec3 wd = uLt == 0 ? mix(vec3(0.06, 0.028, 0.014), vec3(0.17, 0.08, 0.035), fig) : uLt == 1 ? mix(vec3(0.3, 0.19, 0.1), vec3(0.52, 0.36, 0.2), fig) : vec3(0.05, 0.05, 0.055) * (0.9 + 0.2 * n2);
    if (uRm.z > 0.5) { wd = mix(vec3(0.16, 0.11, 0.07), vec3(0.3, 0.21, 0.13), fig); plank = abs(fract(g.y * 1.2) - 0.5); }
    if (uLt < 2) wd *= 1.0 - 0.4 * smoothstep(0.02, 0.0, plank);
    vec3 lit = uLt == 0 ? uLC * (0.25 + 0.35 * exp(-pow((w.x - 0.36) * 2.2, 2.0))) : uLt == 1 ? uLC * 0.55 : uLC * 0.4 * smoothstep(0.5, 0.05, abs(w.x - 0.5));
    col = wd * (lit + uAmb) + uLC * 0.05 * smoothstep(0.5, 1.0, fig) * (uLt == 2 ? 0.2 : 1.0) * (1.0 - z);
  }
  o = vec4(tone(col), 1.0);
}`,Jo=o=>ot+"#define RM "+o+et+"uniform mat3 uVi;"+et+`in vec2 vUv; out vec4 o;
uniform sampler2D uNz; uniform vec4 uRm; uniform vec3 uLC; uniform vec3 uAmb; uniform int uLt;
${Ge}
float box(vec2 p, vec2 c, vec2 h, float s){ vec2 d = abs(p - c) - h; return smoothstep(s, -s, max(d.x, d.y)); }
void main(){
  vec3 wh = uVi * vec3(vUv, 1.0); vec2 w = wh.xy / wh.z; float ydb = uRm.y;
  float sq = mod(uRm.w, 256.0), sf = sq / 256.0, sg = fract(sq * 0.618034);
  vec3 col;
  float n = nz(w * vec2(3.0, 3.0)), n2 = nz(w * 23.0 + 1.7);
  if (w.y > ydb) { // the wall
    vec3 base = uLt == 0 ? vec3(0.09, 0.075, 0.06) : uLt == 1 ? vec3(0.42, 0.44, 0.46) : vec3(0.025, 0.025, 0.03);
    base *= 0.93 + 0.1 * n + 0.04 * n2;
    vec3 lit, add = vec3(0.0);
    if (uLt == 0) { vec2 d = (w - vec2(0.3, 0.78)) * vec2(1.0, 1.15); lit = uLC * 0.55 * exp(-dot(d, d) * 3.2) + uLC * 0.08; }
    else if (uLt == 1) lit = uLC * (RM == 4 ? 0.2 + 0.06 * w.y : 0.32 * (0.75 + 0.25 * w.y));
    else { vec2 d = (w - vec2(0.5, 0.52)) * vec2(1.25, 0.8); lit = uLC * 0.5 * smoothstep(0.62, 0.15, length(d)) + uLC * 0.015; }
#if RM == 0
    { // the bookcase, its shelves, books and a bay's upright moved by the seed
      float P = 0.215 + 0.05 * sin(sq * 2.4), o0 = 0.03 + 0.09 * fract(sq * 0.382);
      float sy = (w.y - ydb + o0) / P, row = floor(sy), fy = fract(sy), rk = row * 3.0 + sq * 5.0;
      float cx = w.x * (38.0 + 7.0 * sin(sq * 0.7)) + row * 7.31 + sq * 3.7 + 2.2 * sin(w.x * 7.0 + row * 2.1 + sq) + 1.3 * sin(w.x * 23.0 + row), ci = floor(cx);
      float h0 = texture(uNz, (vec2(ci + 23.0, rk + 41.0) + 0.5) / 128.0).r;
      cx -= (fy - 0.12) * step(0.86, h0) * (h0 - 0.93) * 9.0; ci = floor(cx); float fx = fract(cx);
      float h1 = texture(uNz, (vec2(ci, rk) + 0.5) / 128.0).r, h2 = texture(uNz, (vec2(ci + 61.0, rk + 17.0) + 0.5) / 128.0).r;
      float bh = 0.12 + 0.6 * (0.55 + 0.45 * h1);
      float book = smoothstep(-0.45, 0.45, (bh - fy) * 2.5) * smoothstep(-0.1, 0.45, fx) * smoothstep(1.1, 0.55, fx) * step(0.1, h2);
      vec3 bc = h2 < 0.3 ? vec3(0.11, 0.03, 0.025) : h2 < 0.48 ? vec3(0.035, 0.06, 0.045) : h2 < 0.62 ? vec3(0.035, 0.04, 0.07) : h2 < 0.8 ? vec3(0.15, 0.1, 0.06) : vec3(0.03, 0.025, 0.02);
      bc *= (0.7 + 0.5 * h1) * (0.8 + 0.35 * smoothstep(0.0, 0.5, fx) * smoothstep(1.0, 0.6, fx));
      bc += vec3(0.5, 0.36, 0.14) * 0.22 * step(0.55, h1) * (smoothstep(0.05, 0.0, abs(fy - bh * 0.84)) + smoothstep(0.035, 0.0, abs(fy - 0.3))) * smoothstep(0.1, 0.4, fx) * smoothstep(0.9, 0.6, fx);
      if (h2 < 0.1 && fy < 0.36) { float sl = floor(fy * 16.0); book = smoothstep(0.38, 0.3, fy); bc = vec3(0.09, 0.04, 0.03) * (0.6 + 0.8 * fract(sl * 0.618 + h1)); }
      float board = smoothstep(0.12, 0.02, fy) + smoothstep(0.96, 1.0, fy) * 0.5;
      base = mix(mix(vec3(0.016, 0.011, 0.008), bc, book * 0.85), vec3(0.11, 0.06, 0.035), clamp(board, 0.0, 1.0));
      base += vec3(0.16, 0.1, 0.05) * smoothstep(0.03, 0.0, abs(fy - 0.1)) * 0.6;
      base *= 0.55 * (0.75 + 0.25 * smoothstep(bh + 0.25, bh - 0.05, fy));
      float up = abs(w.x - (sg < 0.5 ? 0.04 + 0.2 * sg : 0.86 + 0.2 * (sg - 0.5)));
      base = mix(base, vec3(0.1, 0.055, 0.032) * (0.8 + 0.3 * n2), smoothstep(0.024, 0.014, up));
    }
#elif RM == 1
    { // a panelled room: dark wainscot to a rail, a deep green or oxblood wall, gilt frames
      float yr = ydb + 0.2 + 0.06 * sg;
      vec3 wall = (fract(sq * 0.371) < 0.5 ? vec3(0.03, 0.05, 0.037) : vec3(0.072, 0.03, 0.026)) * (0.88 + 0.16 * n + 0.05 * n2);
      vec2 c1 = vec2(0.09 + 0.05 * sg, yr + 0.26 + 0.07 * sf), h1 = vec2(0.065 + 0.03 * fract(sq * 0.27), 0.085 + 0.05 * sg);
      vec2 c2 = vec2(0.9 - 0.04 * sf, yr + 0.3 - 0.06 * sg), h2 = vec2(0.055 + 0.03 * sg, 0.1 - 0.03 * sf);
      float on2 = step(0.3, fract(sq * 0.43));
      wall *= 1.0 - 0.45 * (box(w, c1 + vec2(0.012, -0.018), h1, 0.02) + on2 * box(w, c2 + vec2(0.012, -0.018), h2, 0.02)); // each frame's soft shadow, away from the lamp
      for (int k = 0; k < 2; k++) { // gold moulding round a dark varnished canvas
        vec2 c = k == 0 ? c1 : c2, h = k == 0 ? h1 : h2; float on = k == 0 ? 1.0 : on2;
        float fo = box(w, c, h, 0.011) * on, fi = box(w, c, h - 0.014, 0.009);
        vec3 gilt = vec3(0.3, 0.21, 0.09) * (0.75 + 0.3 * nz(w * 40.0 + float(k)) + 0.3 * smoothstep(-0.01, 0.02, (w.y - c.y) - (w.x - c.x) * 0.6));
        vec3 cv = mix(vec3(0.03, 0.03, 0.018), vec3(0.09, 0.08, 0.05), smoothstep(c.y - h.y * 0.4, c.y + h.y, w.y) * (0.7 + 0.3 * nz(w * 9.0 + sq))); // an old dark landscape: paler sky over dark ground
        wall = mix(wall, mix(gilt, cv, fi), fo);
      }
      // the wainscot: raised panels between stiles, their bevels catching the lamp from the upper left
      float pw = 0.15 + 0.05 * sf, u = fract((w.x + 0.07 * sq) / pw), v = (w.y - ydb) / (yr - ydb);
      vec3 wd = mix(vec3(0.05, 0.026, 0.014), vec3(0.11, 0.06, 0.032), nz(vec2(w.x * 3.0, w.y * 60.0)) * 0.6 + nz(vec2(w.x * 30.0, w.y * 4.0)) * 0.4);
      float pin = smoothstep(0.1, 0.16, u) * smoothstep(0.9, 0.84, u) * smoothstep(0.1, 0.18, v) * smoothstep(0.88, 0.8, v);
      float bev = smoothstep(0.1, 0.17, u) * smoothstep(0.24, 0.17, u) + smoothstep(0.8, 0.86, v) * smoothstep(0.9, 0.86, v);
      float bvd = smoothstep(0.9, 0.83, u) * smoothstep(0.76, 0.83, u) + smoothstep(0.1, 0.16, v) * smoothstep(0.22, 0.16, v);
      wd *= (0.85 + 0.15 * pin) * (1.0 + 0.6 * bev * pin - 0.35 * bvd * pin);
      float rl = (w.y - yr) / 0.018;
      base = w.y < yr ? wd : wall;
      base = mix(base, vec3(0.12, 0.065, 0.035) * (0.9 + 0.2 * n2) * (0.8 + 0.5 * smoothstep(0.6, 0.95, rl)), smoothstep(-0.25, 0.0, rl) * smoothstep(1.25, 1.0, rl)); // the rail
      base *= 1.0 - 0.3 * smoothstep(-0.2, -0.6, rl) * smoothstep(-2.4, -0.6, rl);                                                       // its shadow on the panels
    }
#elif RM == 2
    { // a schoolroom blackboard: slate never clean, chalk along the ledge, a wooden frame
      vec3 paint = uLt == 0 ? vec3(0.085, 0.09, 0.06) : vec3(0.38, 0.44, 0.33);
      float yb = ydb + 0.1 + 0.04 * sf, yt = 0.76 + 0.12 * sg, xl = mix(-0.25, 0.1, fract(sq * 0.41)), xr = mix(0.9, 1.25, fract(sq * 0.73));
      vec2 bc = vec2((xl + xr) * 0.5, (yb + yt) * 0.5), bh = vec2((xr - xl) * 0.5, (yt - yb) * 0.5);
      vec3 sl = sf < 0.6 ? vec3(0.011, 0.036, 0.026) : vec3(0.012, 0.026, 0.044);
      vec2 ac = vec2(0.5 + 0.7 * (sg - 0.5), yb - 0.15); float ar = length((w - ac) * vec2(1.0, 1.35));
      float wipe = smoothstep(0.2, 0.8, 0.5 + 0.5 * sin(ar * 21.0 + nz(w * 3.0 + sq) * 6.0)) * smoothstep(0.3, 0.7, nz(w * vec2(1.4, 2.2) + 3.1 + sf));
      float haze = 0.4 * nz(w * 1.7 + 5.0 + sq) + 0.6 * wipe;
      float dust = smoothstep(yb + 0.09, yb + 0.004, w.y) * (0.55 + 0.45 * nz(vec2(w.x * 26.0, w.y * 5.0)));
      vec3 slate = mix(sl, vec3(0.47, 0.52, 0.47), 0.07 * haze + 0.14 * dust) * (0.92 + 0.12 * n2);
      vec3 fw = vec3(0.13, 0.075, 0.04) * (0.8 + 0.3 * nz(vec2(w.x * 30.0, w.y * 2.0)));
      float inF = box(w, bc, bh + 0.022, 0.004), inS = box(w, bc, bh, 0.003);
      base = mix(paint, mix(fw, slate, inS), inF);
      base *= 1.0 - 0.35 * box(w, bc + vec2(0.01, -0.012), bh + 0.022, 0.02) * (1.0 - inF); // the board stands off the wall
      // the chalk ledge: a lit top, a dark front, dust and a few stubs on it, its shadow below
      float lt = smoothstep(yb - 0.03, yb - 0.022, w.y) * smoothstep(yb - 0.006, yb - 0.012, w.y), lf = smoothstep(yb - 0.044, yb - 0.04, w.y) * smoothstep(yb - 0.022, yb - 0.026, w.y);
      float onL = smoothstep(xl - 0.03, xl - 0.02, w.x) * smoothstep(xr + 0.03, xr + 0.02, w.x);
      base = mix(base, vec3(0.16, 0.1, 0.055) * (0.85 + 0.2 * n2), lt * onL); base = mix(base, vec3(0.05, 0.03, 0.017), lf * onL);
      base = mix(base, vec3(0.3, 0.3, 0.28), lt * onL * smoothstep(0.2, 0.9, nz(vec2(w.x * 16.0, 0.3)) * 0.6 + nz(vec2(w.x * 60.0, 0.7)) * 0.4) * 0.5);
      for (int k = 0; k < 3; k++) { vec2 sc = vec2(fract(sq * 0.31 + float(k) * 0.37) * 0.24 + (k == 1 ? 0.76 : 0.0), yb - 0.009);
        base = mix(base, vec3(0.62, 0.62, 0.58), box(w, sc, vec2(0.009 + 0.004 * float(k), 0.0035), 0.0025) * onL); }
      base *= 1.0 - 0.3 * smoothstep(yb - 0.044, yb - 0.05, w.y) * smoothstep(yb - 0.09, yb - 0.05, w.y) * onL;
    }
#elif RM == 3
    { // the blank wall, the window's shadow moved by the seed
      float sl = 0.35 + 0.2 * sin(sq * 1.3), cw = 0.16 + 0.12 * sin(sq * 0.9), cy = 0.62 + 0.06 * sin(sq * 2.1), sz = 1.0 + 0.25 * sin(sq * 3.1);
      vec2 q = vec2(w.x + (w.y - 0.5) * sl, w.y);
      float win = smoothstep(0.045, -0.01, max(abs(q.x - cw) - 0.13 * sz, abs(q.y - cy) - 0.24 * sz));
      float bars = 0.35 + 0.65 * smoothstep(0.003, 0.014, abs(q.x - cw)) * smoothstep(0.003, 0.014, abs(q.y - cy + 0.02 * sz));
      lit = uLC * (0.32 + 0.5 * win * bars) * (0.75 + 0.25 * w.y);
    }
#elif RM == 4
    { // the window itself at the right: tall blown-out panes, dark glazing bars, a deep sill, a curtain's edge
      float x0 = 0.8 + 0.07 * sg, ys = ydb + 0.2 + 0.08 * sf; base *= vec3(1.12, 1.0, 0.78); // warm plaster in the cool daylight
      float pane = box(w, vec2(x0 + 0.25, ys + 0.7), vec2(0.25, 0.7), 0.009);
      float bx = abs(fract((w.x - x0) / 0.105 + 0.5) - 0.5) * 0.105, by = abs(fract((w.y - ys) / 0.17 + 0.5) - 0.5) * 0.17;
      float bar = max(smoothstep(0.012, 0.003, bx), smoothstep(0.011, 0.002, by)) * 0.85;
      vec3 sky = uLC * (1.5 + 0.7 * smoothstep(ys, ys + 0.6, w.y)) * (0.96 + 0.06 * n);
      float jamb = smoothstep(x0 - 0.03, x0 - 0.026, w.x) * smoothstep(x0 + 0.002, x0 - 0.002, w.x) * step(ys - 0.03, w.y);
      base = mix(base, vec3(0.5, 0.5, 0.47), jamb * 0.8); lit += uLC * 0.5 * jamb;
      float sill = smoothstep(ys - 0.034, ys - 0.03, w.y) * smoothstep(ys + 0.004, ys, w.y) * smoothstep(x0 - 0.06, x0 - 0.05, w.x);
      float sillF = smoothstep(ys - 0.05, ys - 0.046, w.y) * smoothstep(ys - 0.03, ys - 0.034, w.y) * smoothstep(x0 - 0.06, x0 - 0.05, w.x);
      base *= 1.0 - 0.35 * smoothstep(ys - 0.05, ys - 0.056, w.y) * smoothstep(ys - 0.11, ys - 0.056, w.y) * smoothstep(x0 - 0.07, x0 - 0.04, w.x);
      base = mix(base, vec3(0.6, 0.6, 0.56), sill); base = mix(base, vec3(0.3, 0.3, 0.28), sillF);
      lit += uLC * 0.55 * sill;
      // the curtain, drawn back to the left of the panes: soft folds, lit from the window's side
      float cl = x0 - 0.08 - 0.035 * sf, cv = smoothstep(cl - 0.004, cl + 0.004, w.x) * smoothstep(x0 + 0.02, x0 + 0.012, w.x) * step(ys - 0.12, w.y);
      float fold = 0.5 + 0.5 * sin((w.x - cl) * 150.0 + 1.5 * sin(w.y * 6.0 + sq) + 2.0 * nz(vec2(w.x * 8.0, 0.2 + sf)));
      vec3 cc = (sf < 0.4 ? vec3(0.5, 0.45, 0.36) : sf < 0.75 ? vec3(0.3, 0.33, 0.27) : vec3(0.42, 0.27, 0.22)) * (0.5 + 0.5 * fold) * (0.6 + 0.4 * smoothstep(cl, x0 + 0.01, w.x));
      base = mix(base, cc, cv); lit += uLC * 0.25 * cv;
      add = (mix(sky, vec3(0.03, 0.03, 0.032), bar) - base * (lit + uAmb)) * pane * (1.0 - cv);
    }
#else
    { // a gallery: the dark wall, another exhibit lit far off as one soft pool, the glints of other spot lamps
      base *= vec3(0.7, 0.9, 1.6); // a deep blue-grey gallery wall
      float sd = sf < 0.5 ? 1.0 : -1.0; vec2 pc = vec2(0.5 - sd * (0.4 + 0.05 * sg), 0.46 + 0.06 * sf);
      vec2 dp = (w - pc) / vec2(0.075, 0.14); float pool = exp(-dot(dp, dp));
      lit += uLC * 1.6 * pool;
      base = mix(base, vec3(0.06, 0.045, 0.03) * (0.8 + 0.3 * nz(w * 14.0 + sq)), box(w, pc + vec2(0.0, 0.015), vec2(0.03, 0.042), 0.006) * (0.4 + 0.6 * pool)); // the far picture, too far to read
      for (int k = 0; k < 3; k++) { vec2 gc = vec2(k == 0 ? 0.05 + 0.1 * sg : k == 1 ? 0.83 + 0.12 * fract(sq * 0.29) : pc.x + 0.03, 0.765 + 0.025 * fract(sq * 0.53 + float(k) * 0.31));
        vec2 dg = w - gc; float r2 = dot(dg, dg); add += uLC * (0.9 * exp(-r2 / 0.000016) + 0.05 * exp(-r2 / 0.0006)) * (k == 2 ? 0.7 : 1.0); }
    }
#endif
    col = base * (lit + uAmb) + add;
    col *= 1.0 - 0.35 * smoothstep(0.03, 0.0, w.y - ydb);
    if (uRm.z > 0.5 && w.y < ydb + 0.045) {
      float u = (w.y - ydb) / 0.045;
      vec3 sk = (uLt == 0 ? vec3(0.08, 0.06, 0.045) : uLt == 1 ? vec3(0.62, 0.6, 0.56) : vec3(0.03, 0.03, 0.032)) * (0.95 + 0.05 * n2);
      col = sk * (lit + uAmb) * (0.8 + 0.3 * smoothstep(0.9, 0.97, u) - 0.25 * smoothstep(0.97, 1.0, u));
    }
  } else { // the desk top, as in the first room
    float z = (ydb - w.y) / ydb; float u = 1.0 / (0.25 + z * 3.0);
    vec2 g = vec2(w.x * 2.2 * (0.5 + 0.5 * u), u * 0.6);
    float plank = abs(fract(g.y * 2.5) - 0.5);
    float fig = nz(vec2(g.x * 0.25, g.y * 3.0)) * 0.7 + nz(vec2(g.x * 0.06, g.y * 0.7)) * 0.3;
    vec3 wd = uLt == 0 ? mix(vec3(0.06, 0.028, 0.014), vec3(0.17, 0.08, 0.035), fig) : uLt == 1 ? mix(vec3(0.3, 0.19, 0.1), vec3(0.52, 0.36, 0.2), fig) : vec3(0.05, 0.05, 0.055) * (0.9 + 0.2 * n2);
    if (uRm.z > 0.5) { wd = mix(vec3(0.16, 0.11, 0.07), vec3(0.3, 0.21, 0.13), fig); plank = abs(fract(g.y * 1.2) - 0.5); }
    if (uLt < 2) wd *= 1.0 - 0.4 * smoothstep(0.02, 0.0, plank);
    vec3 lit = uLt == 0 ? uLC * (0.25 + 0.35 * exp(-pow((w.x - 0.36) * 2.2, 2.0))) : uLt == 1 ? uLC * 0.55 : uLC * 0.4 * smoothstep(0.5, 0.05, abs(w.x - 0.5));
    col = wd * (lit + uAmb) + uLC * 0.05 * smoothstep(0.5, 1.0, fig) * (uLt == 2 ? 0.2 : 1.0) * (1.0 - z);
  }
  o = vec4(tone(col), 1.0);
}`,Ms=ot+`in vec2 vUv; out vec4 o; uniform sampler2D uH; uniform vec2 uTx;
void main(){ vec2 uv = (vUv - 0.5) * 1.5 + 0.5; float s = 0.0;
  for (int j = -2; j <= 2; j++) for (int i = -2; i <= 2; i++) { vec2 t = uv + vec2(float(i), float(j)) * uTx; s += all(greaterThan(t, vec2(0.0))) && all(lessThan(t, vec2(1.0))) ? texture(uH, t).a : 0.0; }
  o = vec4(s / 25.0); }`,Qo=o=>ot+(o?"#define ACR"+et:"")+lo+`in vec2 vUv; out vec4 o;
uniform sampler2D uRoom; uniform sampler2D uA; uniform sampler2D uB; uniform sampler2D uH; uniform sampler2D uCov; uniform sampler2D uNz;
uniform mat3 uVi; uniform vec4 uF[3]; uniform vec4 uBox; uniform vec2 uPC; uniform vec4 uW; uniform vec3 uWc; uniform vec3 uLC; uniform int uLt; uniform float uGl;
${Ko}
vec2 toBoard(vec2 w){ vec2 d = (w - uF[0].xy) / uF[1].x; return vec2(d.x * uF[0].z + d.y * uF[0].w, -d.x * uF[0].w + d.y * uF[0].z) + uPC; }
void main(){
  vec3 wh = uVi * vec3(vUv, 1.0); vec2 w = wh.xy / wh.z;
  vec3 col = texture(uRoom, vUv).rgb;
  // a wooden wedge under the raised foot when the board is tilted
  if (uW.z > 0.0) {
    float s = sign(uW.w), u = (w.x - uW.x) * s;               // along the board's bottom, from the raised corner inward
    float top = uW.y + (w.x - uW.x) * uW.z * -s;            // the board's lower edge above this point
    if (u > -0.012 && u < 0.075 && w.y > uF[2].w - 0.034 && w.y < top) {
      float g = texture(uRoom, vec2(w.x * 0.3, 0.02)).r;
      float face = smoothstep(-0.012, -0.009, u);
      col = uWc * (0.75 + 0.3 * fract(w.x * 160.0 + w.y * 30.0) * 0.3) * mix(0.55, 1.0, face) * (0.8 + 0.2 * smoothstep(top - 0.01, top, w.y));
    }
  }
  // its shadow on the wall (and a tighter one on the desk), from the blurred coverage
  bool desk = w.y < uF[2].w;
  vec2 so = desk ? uF[2].xy * vec2(0.6, 0.25) : uF[2].xy;
  vec2 tbs = ((toBoard(w - so) - uBox.xy) / uBox.zw - 0.5) / 1.5 + 0.5;
  float cs = textureLod(uCov, tbs, desk ? 1.2 : 2.2).r;
  col *= 1.0 - uF[2].z * cs;
  if (desk) { vec2 tc = ((toBoard(w + vec2(0.0, 0.007)) - uBox.xy) / uBox.zw - 0.5) / 1.5 + 0.5; col *= 1.0 - 0.55 * textureLod(uCov, tc, 0.8).r * uF[1].z; }
  vec2 tb = (toBoard(w) - uBox.xy) / uBox.zw;
  if (all(greaterThan(tb, vec2(0.0))) && all(lessThan(tb, vec2(1.0)))) {
    vec4 hv = HD(texture(uH, tb));
    vec4 bc = uF[1].y < 0.002 ? texture(uA, tb) : uF[1].y > 0.998 ? texture(uB, tb) : mix(texture(uA, tb), texture(uB, tb), uF[1].y);
    float fr = smoothstep(1.6, 1.9, hv.g) * (1.0 - smoothstep(2.1, 2.4, hv.g));
    float op = mix(1.0, bc.a, fr);
#ifdef ACR
    bc.rgb = mix(bc.rgb, col * vec3(0.9, 0.97, 0.95) + bc.rgb * 0.15, 0.6 * (1.0 - smoothstep(1.4, 1.6, hv.g))); // clear acrylic: the room seen through its face and routed fill
#endif
    col = mix(col, bc.rgb, hv.a * op);
    col += glassR(w, toBoard(w)) * glassM(hv);
  }
  o = vec4(col, 1.0);
}`,ks=ot+fo+`layout(location=0) in vec2 aP; layout(location=1) in vec4 aI;
uniform vec4 uF[3]; uniform vec2 uPC; uniform vec4 uSh; out vec2 vQ; out vec3 vK;
void main(){
  vec2 b = aI.xy - uPC, w = uF[0].xy + vec2(b.x * uF[0].z - b.y * uF[0].w, b.x * uF[0].w + b.y * uF[0].z) * uF[1].x;
  float pin = step(aI.z, 0.5), r = (pin > 0.5 ? uSh.z : uSh.w) * uF[1].x;
  vec2 off = (pin > 0.5 ? uSh.xy * 2.3 : uSh.xy * 1.0) * uF[1].x;
  vec2 a0 = w + (pin > 0.5 ? vec2(0.0) : off), a1 = w + off;
  vec2 ax = a1 - a0; float L = length(ax); vec2 u = L > 1e-6 ? ax / L : vec2(1.0, 0.0), v = vec2(-u.y, u.x);
  float pad = r * 2.2;
  vec2 pos = (a0 + a1) * 0.5 + u * aP.x * (L * 0.5 + pad) + v * aP.y * pad;
  vQ = vec2(aP.x * (L * 0.5 + pad), aP.y * pad); vK = vec3(L * 0.5, r, pin);
  gl_Position = VW(pos);
}`,Ts=ot+`in vec2 vQ; in vec3 vK; out vec4 o; uniform vec4 uSc;
void main(){
  vec2 q = vQ; q.x = max(abs(q.x) - vK.x, 0.0);
  float d = length(q) / vK.y;
  float s = vK.z > 0.5 ? (1.0 - smoothstep(0.4, 1.9, d)) * 0.75 : (1.0 - smoothstep(0.2, 1.75, d)) * 0.8;
  o = vec4(mix(vec3(1.0), uSc.rgb, s * uSc.a), 1.0);
}`,Es=ot+fo+`layout(location=0) in vec2 aP; layout(location=1) in vec4 aI;
uniform vec4 uF[3]; uniform vec2 uPC; uniform float uR; out vec2 vQ; out float vR;
void main(){
  vec2 b = aI.xy - uPC, w = uF[0].xy + vec2(b.x * uF[0].z - b.y * uF[0].w, b.x * uF[0].w + b.y * uF[0].z) * uF[1].x;
  float r = uR * 1.3 * uF[1].x; vR = r; vQ = aP * (r + 1.5 / 1000.0);
  gl_Position = VW(w + vQ);
}`,Fs=ot+`in vec2 vQ; in float vR; out vec4 o; uniform vec3 uL; uniform vec3 uLC; uniform vec3 uAmb; uniform vec3 uPc; uniform float uPx;
vec3 tone(vec3 x){ x *= 0.92; vec3 y = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14); return pow(clamp(y, 0.0, 1.0), vec3(1.0 / 2.2)); }
void main(){
  float d = length(vQ) / vR; float a = clamp((1.0 - d) * vR / uPx + 0.5, 0.0, 1.0); if (a <= 0.0) discard;
  vec2 q = vQ / vR; float z = sqrt(max(1.0 - dot(q, q) * 0.85, 0.05));
  vec3 N = normalize(vec3(q * 0.9, z)), L = normalize(uL), H = normalize(L + vec3(0.0, 0.0, 1.0));
  vec3 col = uPc * (uLC * max(dot(N, L), 0.0) * 0.9 + uAmb * 1.8) + uLC * pow(max(dot(N, H), 0.0), 30.0) * 1.4 * uPc;
  col *= 0.85 + 0.15 * smoothstep(1.0, 0.75, d);
  o = vec4(tone(col), a);
}`,zs=ot+fo+`layout(location=0) in vec2 aP; layout(location=1) in vec4 aI; layout(location=2) in vec4 aJ;
uniform vec4 uF[3]; uniform vec2 uPC; uniform vec4 uBox; uniform sampler2D uA; uniform sampler2D uB;
out vec2 vQ; out vec4 vJ; out vec3 vK; out vec2 vTb;
float at2(float y, float x){ float ax = abs(x), ay = abs(y), a = atan(min(ax, ay) / max(max(ax, ay), 1e-20)); a = ay > ax ? 1.5707963 - a : a; a = x < 0.0 ? 3.1415927 - a : a; return y < 0.0 ? -a : a; } // one-argument atan compiles far faster
void main(){
  vec2 b = aI.xy - uPC, w = uF[0].xy + vec2(b.x * uF[0].z - b.y * uF[0].w, b.x * uF[0].w + b.y * uF[0].z) * uF[1].x;
  vec2 st = vec2(aI.z * uF[0].z - aI.w * uF[0].w, aI.z * uF[0].w + aI.w * uF[0].z); // streak half-vector (board units), turned to the screen
  float L = length(st); vec2 u = L > 1e-4 ? st / L : vec2(1.0, 0.0), v = vec2(-u.y, u.x);
  float pad = 1.0 + 2.0 / (uF[1].x * 1000.0);
  vec2 q = vec2(aP.x * (L + pad), aP.y * pad);
  vQ = q; vK = vec3(L, uF[1].x, 0.0);
  vec2 tb = (aI.xy - uBox.xy) / uBox.zw; vTb = tb;
  vJ = aJ; vJ.w = mix(textureLod(uA, tb, 0.0).a, textureLod(uB, tb, 0.0).a, uF[1].y);
  vec2 pos = w + (u * q.x + v * q.y) * uF[1].x;
  // pass the screen-space frame so the fragment shader can light in world space
  vK.z = at2(u.y, u.x); vJ.x = aJ.x + at2(uF[0].w, uF[0].z) - vK.z;
  gl_Position = VW(pos);
}`,Cs=ot+"uniform mat3 uVi; uniform float uAz; vec2 VSI(vec2 q){ vec3 h = uVi * vec3(q, 1.0); return h.xy / h.z; }"+et+`in vec2 vQ; in vec4 vJ; in vec3 vK; in vec2 vTb; out vec4 o;
uniform vec3 uL; uniform vec3 uLC; uniform vec3 uAmb; uniform vec3 uC0; uniform vec3 uC1; uniform int uKind; uniform sampler2D uA; uniform sampler2D uB; uniform vec4 uF[3]; uniform sampler2D uNz; uniform int uLt; uniform vec4 uBox; uniform float uGl; uniform vec2 uRes;
${Ge}
${Ko}
vec3 env(vec3 r){ // the room as a polished ball sees it
  vec3 L = normalize(uL);
  vec3 c = mix(uAmb * 0.8 + vec3(0.015), uAmb * 1.5 + uLC * 0.05, smoothstep(-0.3, 0.6, r.y));
  c = mix(c, (uLt == 1 ? vec3(0.35, 0.26, 0.17) : vec3(0.17, 0.1, 0.055)) * (uLC * 0.4 + uAmb), smoothstep(-0.05, -0.3, r.y) * smoothstep(-0.95, -0.55, r.y)); // the desk below: a warm band
  float s = max(dot(r, L), 0.0);
  c += uLC * (pow(s, 700.0) * 12.0 + pow(s, 40.0) * 0.35);
  if (uLt == 1) { vec3 wd = normalize(vec3(0.75, 0.25, 0.6)); vec3 sd = normalize(cross(wd, vec3(0.0, 1.0, 0.0))); vec3 d = r - wd * dot(r, wd);
    float win = step(abs(d.y), 0.2) * step(abs(dot(d, sd)), 0.15) * step(0.0, dot(r, wd)) * step(0.012, abs(d.y + 0.02)) * step(0.012, abs(dot(d, sd))); c += uLC * win * 1.6; }
  return c;
}
void main(){
  // q is in the streak's frame (x along the motion), in ball radii. A moving ball is what a 1/150 s exposure records:
  // across the motion its edge stays sharp; along it each pixel holds the share of the exposure the ball covered it
  // (the disc's chord at this height slid from -L to L), so the two ends fade over the distance travelled. It is shaded
  // as the one ball drawn out over that path (dq: the body's coordinates), so no flat middle and no straight tone line.
  vec2 q = vQ; float L = vK.x, xp = 1.0;
  if (L > 0.02) { float h = sqrt(max(1.0 - q.y * q.y, 0.0)); xp = clamp((min(q.x + L, h) - max(q.x - L, -h)) / (2.0 * L), 0.0, 1.0); }
  vec2 dq = vec2(q.x / (1.0 + L), q.y);
  float ca = cos(vK.z), sa = sin(vK.z);
  vec2 n2;            // the surface normal's screen xy
  float d;            // 1 at the outline
  vec2 lq = dq;       // body coordinates (beans, bells)
  if (uKind == 2) {
    float a = vJ.x; lq = vec2(dq.x * cos(a) + dq.y * sin(a), -dq.x * sin(a) + dq.y * cos(a));
    lq.y += 0.08 * (1.0 - lq.x * lq.x);           // the kidney's curve
    vec2 e = lq / vec2(1.14, 0.86); d = length(e);
    vec2 nb = vec2(e.x / 1.14, e.y / 0.86); nb *= d / max(length(nb), 1e-4);
    vec2 ns = vec2(nb.x * cos(a) - nb.y * sin(a), nb.x * sin(a) + nb.y * cos(a));
    n2 = vec2(ns.x * ca - ns.y * sa, ns.x * sa + ns.y * ca);
  } else { d = length(dq); n2 = vec2(dq.x * ca - dq.y * sa, dq.x * sa + dq.y * ca); }
  float aa = vK.y * 1000.0 * uAz; // pixels per ball radius at 1000 px (times the camera's zoom)
  float cov = clamp((1.0 - d) * aa * 0.9 + 0.5, 0.0, 1.0);
  if (cov <= 0.0) discard;
  float nzz = sqrt(max(1.0 - dot(n2, n2), 0.0));
  vec3 N = normalize(vec3(n2, nzz + 0.03)), V = vec3(0.0, 0.0, 1.0), Ld = normalize(uL), Hh = normalize(Ld + V);
  float vis = vJ.w;                                    // light reaching this spot of the board (its shadows, the pool)
  vec3 base = vJ.z > 0.5 ? uC1 : uC0;
  float ndl = max(dot(N, Ld), 0.0);
  float occ = 0.38 + 0.62 * smoothstep(-0.9, 0.25, n2.y); // darker underneath, where it rests on others
  vec3 col;
  vec3 R = reflect(-V, N);
  if (uKind == 0 || uKind == 3) { // steel shot or brass bells: small mirrors of the room
    float fr = 0.6 + 0.4 * pow(1.0 - nzz, 3.0);
    vec3 e = env(R); e = mix(e * 0.5, e, vis * 0.8 + 0.2);
    vec3 bk = pow(mix(texture(uA, vTb).rgb, texture(uB, vTb).rgb, uF[1].y), vec3(2.2)); // the lit board behind, seen in the rim
    e = mix(e, mix(bk, vec3(dot(bk, vec3(0.33))), 0.4) * 1.1, smoothstep(0.2, -0.45, R.z) * (0.35 + 0.45 * occ) * (1.0 - 0.8 * smoothstep(0.02, 0.12, L))); // the board in the rim, cooled by the steel (smeared away on a ball in flight: it read as a pale ring)
    float tone2 = 0.92 + 0.16 * fract(vJ.y * 13.7);  // shot varies a little, some duller
    col = base * e * fr * occ * 1.3 * tone2;
    float hl = max(dot(N, Hh), 0.0);
    col += uLC * (pow(hl, 110.0) * 5.0 + pow(hl, 22.0) * 0.4) * (0.25 + 0.75 * vis) * (uKind == 3 ? base * 1.4 : vec3(1.0)); // one small hard highlight, the same on every ball
    if (uKind == 3) { // the bell's slit and its two sound holes, turned with the bell
      float a = vJ.x + vK.z; vec2 r = vec2(n2.x * cos(a) + n2.y * sin(a), -n2.x * sin(a) + n2.y * cos(a));
      float slit = smoothstep(0.11, 0.05, abs(r.y + 0.1)) * step(abs(r.x), 0.6) + smoothstep(0.2, 0.12, length(r - vec2(0.6, -0.1))) + smoothstep(0.2, 0.12, length(r + vec2(0.6, 0.1)));
      col *= 1.0 - 0.88 * clamp(slit, 0.0, 1.0);
    }
  } else if (uKind == 1) { // glass: the board behind, turned over by the lens and tinted, dark at the rim; the room on its skin
    if (vJ.z > 2.5) { float k = fract(vJ.y * 5.13); base = k < 0.24 ? vec3(0.3, 0.72, 0.78) : k < 0.44 ? vec3(0.88, 0.5, 0.12) : k < 0.62 ? vec3(0.3, 0.66, 0.3) : k < 0.78 ? vec3(0.2, 0.32, 0.88) : vec3(0.9, 0.92, 0.95); }
    vec2 nb = vec2(n2.x * uF[0].z + n2.y * uF[0].w, -n2.x * uF[0].w + n2.y * uF[0].z);
    vec2 tb = vTb - nb * 1.1 / uBox.zw;
    vec3 bh = pow(mix(texture(uA, tb).rgb, texture(uB, tb).rgb, uF[1].y), vec3(2.2));
    float rim = smoothstep(0.4, 1.0, length(n2));
    vec3 tint = mix(vec3(1.0), base, 0.7 + 0.3 * rim);
    col = bh * tint * (1.0 - 0.78 * rim) * 0.9;
    vec2 ldir = Ld.xy / max(length(Ld.xy), 1e-3);
    col += base * uLC * 0.55 * vis * smoothstep(0.25, 0.75, dot(n2, -ldir)) * smoothstep(1.0, 0.7, length(n2)); // light focused on the far side
    float fr = 0.04 + 0.96 * pow(1.0 - nzz, 4.0);
    col = mix(col, env(R) * 0.8, fr * 0.7);
    float hl = max(dot(N, Hh), 0.0);
    col += uLC * (pow(hl, 400.0) * 9.0 + pow(hl, 60.0) * 0.25) * vis;
  } else { // beans: matt, a soft sheen; the soup mix has speckled, black, red and white ones
    vec3 b = base;
    if (vJ.z > 1.5) { float k = fract(vJ.y * 7.31); b = k < 0.3 ? vec3(0.6, 0.45, 0.3) : k < 0.5 ? vec3(0.05, 0.04, 0.045) : k < 0.75 ? vec3(0.42, 0.08, 0.07) : vec3(0.78, 0.74, 0.64);
      if (k < 0.3) b = mix(b, vec3(0.2, 0.09, 0.05), smoothstep(0.5, 0.58, nz(lq * 0.2 + vJ.y * 9.0))); }
    float sh = pow(max(dot(N, Hh), 0.0), 30.0) * (b.r < 0.1 ? 0.5 : 0.18);
    col = b * (uLC * ndl * vis + uAmb * 1.3) * occ + uLC * sh * vis;
  }
  o = vec4(tone(col) + glassR(VSI(gl_FragCoord.xy / uRes), vTb * uBox.zw + uBox.xy), cov * xp);
}`,b0=t.__p083||(t.__p083={progs:null,room:[],comp:[],owner:null,nz:new Map}),Zo={},uo=(o,s)=>{const a=t.createProgram();for(const[c,i]of[[t.VERTEX_SHADER,o],[t.FRAGMENT_SHADER,s]]){const l=t.createShader(c);t.shaderSource(l,i),t.compileShader(l),t.attachShader(a,l),a["s"+c]=l}return a},vo=(o,s)=>{if(!t.getProgramParameter(o,t.LINK_STATUS)){const a=t.getProgramInfoLog(o)+" "+t.getShaderInfoLog(o["s"+t.VERTEX_SHADER])+" "+t.getShaderInfoLog(o["s"+t.FRAGMENT_SHADER]);throw new Error("083 shader "+s+": "+a.split(et).slice(0,6).join(" | "))}};let Ht=b0.progs;if(Ht||(Ht=[[oe,Rs],[oe,Ls],[oe,Tt?Jo(it):jo],[oe,Ms],[oe,Qo(X===2)],[ks,Ts],[Es,Fs],[zs,Cs]].map(([o,s])=>uo(o,s)),Ht.forEach(o=>t.linkProgram(o)),Ht.forEach(vo),b0.progs=Ht,b0.room[Tt]=Ht[2],b0.comp[+(X===2)]=Ht[4]),!b0.room[Tt]){const o=uo(oe,Tt?Jo(it):jo);t.linkProgram(o),vo(o,2),b0.room[Tt]=o}if(!b0.comp[+(X===2)]){const o=uo(oe,Qo(X===2));t.linkProgram(o),vo(o,4),b0.comp[+(X===2)]=o}const[Xt,ht,,ho,,se,At,c0]=Ht,ae=b0.room[Tt],X0=b0.comp[+(X===2)],h=(o,s)=>{const a=o.__u||(o.__u=new Map);let c=a.get(s);return c===void 0&&(c=t.getUniformLocation(o,s),a.set(s,c)),c},Yt=128;let _t=b0.nz.get(e.hash);if(_t)b0.nz.delete(e.hash),b0.nz.set(e.hash,_t);else{_t=new Uint8Array(Yt*Yt*4);const o=B(b(7)^5369127),s=[];for(let c=0;c<8;c++){const i=new Float32Array(1024);for(let l=0;l<1024;l++)i[l]=o();s.push(i)}const a=(c,i,l,d)=>{const r=Math.floor(i),y=Math.floor(l),_=i-r,v=l-y,g=_*_*(3-2*_),T=v*v*(3-2*v),L=(j,u0)=>c[(j%d+d)%d*32+(u0%d+d)%d];return(L(r,y)*(1-g)+L(r+1,y)*g)*(1-T)+(L(r,y+1)*(1-g)+L(r+1,y+1)*g)*T};for(let c=0;c<Yt;c++)for(let i=0;i<Yt;i++){const l=(c*Yt+i)*4;let d=0,r=0,y=.5,_=0;for(let v=0;v<4;v++){const g=4<<v,T=g/Yt;d+=a(s[v],i*T,c*T,g)*y,r+=a(s[v+4],i*T,c*T,g)*y,_+=y,y*=.5}_t[l]=o()*255,_t[l+1]=d/_*255,_t[l+2]=r/_*255,_t[l+3]=255}b0.nz.set(e.hash,_t),b0.nz.size>4&&b0.nz.delete(b0.nz.keys().next().value)}const Bs=(o,s,a,c,i,l,d)=>{const r=t.createTexture();return t.bindTexture(t.TEXTURE_2D,r),t.texImage2D(t.TEXTURE_2D,0,a,o,s,0,t.RGBA,i,l||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,c===t.LINEAR_MIPMAP_LINEAR?t.LINEAR:c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,d||t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,d||t.CLAMP_TO_EDGE),r};t.activeTexture(t.TEXTURE0);const $o=Math.min(ue,L0===0?1.1:1.45),mo=Math.min(1200*$o/te,It*u*1.15*$o),Vt=Math.ceil(le*mo),Wt=Math.ceil(te*mo),De=u,Ue=Math.ceil(Vt/3),He=Math.ceil(Wt/3);let xo,Xe,po,bo,Ye,yo,wo,go,Ao,Ro,Lo;{xo=Bs(Yt,Yt,t.RGBA8,t.LINEAR,t.UNSIGNED_BYTE,_t,t.REPEAT);const o=(c,i,l,d,r)=>{const y=t.createTexture();return t.bindTexture(t.TEXTURE_2D,y),t.texStorage2D(t.TEXTURE_2D,r||1,l,c,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,d),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,d===t.LINEAR_MIPMAP_LINEAR?t.LINEAR:d),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),y};Xe=Oo?o(Vt,Wt,t.RGBA16F,t.LINEAR):o(Vt,Wt,t.RGBA8,t.LINEAR),po=o(Vt,Wt,t.RGBA8,t.LINEAR),bo=o(Vt,Wt,t.RGBA8,t.LINEAR),Ye=o(Ue,He,t.RGBA8,t.LINEAR_MIPMAP_LINEAR,Math.floor(Math.log2(Math.max(Ue,He)))+1),yo=o(De,De,t.RGBA8,t.LINEAR);const s=new Float32Array(4);t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0);const a=c=>{const i=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,i),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,c,0),t.clearBufferfv(t.COLOR,0,s),i};wo=a(Xe),go=a(po),Ao=a(bo),Ro=a(Ye),Lo=a(yo),t.bindFramebuffer(t.FRAMEBUFFER,null)}const Po=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,Po),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);const Ve=(o,s,a)=>{const c=t.createVertexArray();if(t.bindVertexArray(c),t.bindBuffer(t.ARRAY_BUFFER,Po),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,0),o){t.bindBuffer(t.ARRAY_BUFFER,o);for(let i=0;i<s;i++)t.enableVertexAttribArray(1+i),t.vertexAttribPointer(1+i,4,t.FLOAT,!1,a,i*16),t.vertexAttribDivisor(1+i,1)}return t.bindVertexArray(null),c},ts=t.createBuffer(),es=t.createBuffer(),os=t.createBuffer(),ss=Ve(null),as=Ve(ts,1,16),Ss=Ve(es,2,32),Is=Ve(os,1,16),ke=new Float32Array(x*4),Rt=new Float32Array(f*8),Te=new Float32Array(f*4);let ve=0;const ns=()=>{ve=0;for(let o=0;o<x;o++)if(z[o]){const s=ve*4;ke[s]=p[o],ke[s+1]=U[o],ke[s+2]=0,ke[s+3]=0,ve++}t.bindBuffer(t.ARRAY_BUFFER,ts),t.bufferData(t.ARRAY_BUFFER,ke.subarray(0,ve*4),t.STATIC_DRAW)},cs=()=>{t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.DEPTH_TEST),t.depthMask(!1),t.colorMask(!0,!0,!0,!0),t.disable(t.BLEND)},Mo=new Float32Array(80);g0.forEach((o,s)=>{s<40&&(Mo[s*2]=o[0],Mo[s*2+1]=o[1])});const We=e0===1?[G0,5.4*A/2,5.4,Math.floor((G0-M0+2)/(5.4*A/2))+1]:[G0,Et,l0,i0],Oe=X===3?0:X,is=[[.34,.72],[.5,.6],[.5,.52]][I],_s=[.82,2,.5][I]/It,qs=[.66,.15,.75][I],Ns=(o,s,a)=>{const[c,i]=io(a,0),l=(o-c)/It,d=(s-i)/It,r=Math.cos(a),y=Math.sin(a);return[l*r+d*y,-l*y+d*r+ee]};function Gs(){cs(),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,xo),t.bindVertexArray(ss),t.bindFramebuffer(t.FRAMEBUFFER,wo),t.viewport(0,0,Vt,Wt),t.useProgram(Xt),t.uniform4f(h(Xt,"uBox"),St,Re,le,te),t.uniform2fv(h(Xt,"uHalf"),Mo),t.uniform1i(h(Xt,"uNH"),Math.min(40,g0.length)),t.uniform4f(h(Xt,"uG"),E,O0,zt,H0),t.uniform4f(h(Xt,"uG2"),l0,$t,i0,Ft),t.uniform4f(h(Xt,"uPin"),We[0],We[1],We[2],We[3]),t.uniform4f(h(Xt,"uG3"),bt?1:0,Ae,1/mo,Oe===0&&!bt?1:0),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.useProgram(ht),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,Xe),t.uniform1i(h(ht,"uH"),1),t.uniform1i(h(ht,"uNz"),0),t.uniform4f(h(ht,"uBox"),St,Re,le,te),t.uniform2f(h(ht,"uTx"),1/Vt,1/Wt),t.uniform3fv(h(ht,"uLC"),Me),t.uniform3fv(h(ht,"uAmb"),Ne),t.uniform4f(h(ht,"uSty"),Oe,Math.floor(w()*3),bt?1:0,0),t.uniform1i(h(ht,"uSt"),u>600?16:12),t.uniform4f(h(ht,"uG"),E,Pt,zt,l0);for(const[o,s]of[[go,0],[Ao,R]]){t.bindFramebuffer(t.FRAMEBUFFER,o),t.viewport(0,0,Vt,Wt);const a=Math.cos(s),c=Math.sin(s);t.uniform3f(h(ht,"uL"),tt[0]*a+tt[1]*c,-tt[0]*c+tt[1]*a,tt[2]);const i=Ns(is[0],is[1],s);t.uniform4f(h(ht,"uPool"),i[0],i[1],_s,qs),t.drawArrays(t.TRIANGLE_STRIP,0,4)}t.bindFramebuffer(t.FRAMEBUFFER,Ro),t.viewport(0,0,Ue,He),t.useProgram(ho),t.uniform1i(h(ho,"uH"),1),t.uniform2f(h(ho,"uTx"),1.4/Ue,1.4/He),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,Ye),t.generateMipmap(t.TEXTURE_2D),t.bindFramebuffer(t.FRAMEBUFFER,Lo),t.viewport(0,0,De,De),t.useProgram(ae),t.uniformMatrix3fv(h(ae,"uVi"),!1,co),t.uniform1i(h(ae,"uNz"),0),t.uniform4f(h(ae,"uRm"),_e,ws,X===3?1:0,Tt?it*256+Ce:0),t.uniform3fv(h(ae,"uLC"),Me),t.uniform3fv(h(ae,"uAmb"),Ne),t.uniform1i(h(ae,"uLt"),I),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.bindFramebuffer(t.FRAMEBUFFER,null);for(const o of[wo,go,Ao,Ro,Lo])t.deleteFramebuffer(o)}function Ds(){b0.owner=Zo;const o=[-tt[0]/tt[2],-tt[1]/tt[2]];t.useProgram(X0),t.uniform1i(h(X0,"uRoom"),3),t.uniform1i(h(X0,"uA"),4),t.uniform1i(h(X0,"uB"),5),t.uniform1i(h(X0,"uH"),1),t.uniform1i(h(X0,"uCov"),2),t.uniform4f(h(X0,"uBox"),St,Re,le,te),t.uniform2f(h(X0,"uPC"),0,ee),t.uniform3fv(h(X0,"uWc"),I===1?[.62,.5,.34]:[.36,.24,.13]),t.useProgram(se),t.uniform2f(h(se,"uPC"),0,ee),t.uniform4f(h(se,"uSh"),o[0],o[1],Ft,1);const s=[[.42,.3,.22,.85],[.5,.48,.5,.6],[.3,.26,.24,.9]][I];t.uniform4fv(h(se,"uSc"),s),t.useProgram(At),t.uniform2f(h(At,"uPC"),0,ee),t.uniform1f(h(At,"uR"),Ft),t.uniform3fv(h(At,"uL"),tt),t.uniform3fv(h(At,"uLC"),Me),t.uniform3fv(h(At,"uAmb"),Ne),t.uniform3fv(h(At,"uPc"),Oe===2?[.6,.62,.66]:[.75,.52,.22]),t.uniform1f(h(At,"uPx"),1/(u*ue)),t.useProgram(c0),t.uniform2f(h(c0,"uPC"),0,ee),t.uniform4f(h(c0,"uBox"),St,Re,le,te),t.uniform1i(h(c0,"uA"),4),t.uniform1i(h(c0,"uB"),5),t.uniform1i(h(c0,"uNz"),0),t.uniform3fv(h(c0,"uL"),tt),t.uniform3fv(h(c0,"uLC"),Me),t.uniform3fv(h(c0,"uAmb"),Ne),t.uniform1i(h(c0,"uKind"),F),t.uniform1i(h(c0,"uLt"),I),t.uniform3fv(h(c0,"uC0"),ro[0]),t.uniform3fv(h(c0,"uC1"),ro[1]),t.uniform1f(h(c0,"uPx"),1/(u*ue));for(const a of[X0,c0])t.useProgram(a),t.uniform1i(h(a,"uNz"),0),t.uniform3fv(h(a,"uLC"),Me),t.uniform1i(h(a,"uLt"),I),t.uniform1f(h(a,"uGl"),Oe===2?1.3:1);t.useProgram(c0),t.uniform2f(h(c0,"uRes"),u,u),t.uniformMatrix3fv(h(c0,"uVi"),!1,co),t.uniform1f(h(c0,"uAz"),ue);for(const a of[se,At,c0])t.useProgram(a),t.uniformMatrix3fv(h(a,"uVw"),!1,gs);t.useProgram(X0),t.uniformMatrix3fv(h(X0,"uVi"),!1,co)}Gs(),ns();const _0=new Float32Array(12);let rs=0,ls=0,ko=0;const To=[[.05,-.055,.6],[-.07,-.02,.5],[-.012,-.06,.75]][I];let st=0,Eo=0,Ke=0,Ot=-1,Y0=0,Fo=0;const Us=1.5;function fs(o){b0.owner!==Zo&&Ds();const[s,a,c]=io(st,Y0),i=Math.cos(c),l=Math.sin(c),d=.5-.5*Math.cos(st),r=Math.max(0,1-Math.abs(Math.sin(st))*6);if(_0[0]=s+Fo*Math.sin(o*90),_0[1]=a,_0[2]=i,_0[3]=l,_0[4]=It,_0[5]=d,_0[6]=r,_0[7]=o,_0[8]=To[0],_0[9]=To[1],_0[10]=To[2],_0[11]=_e+.034,Math.abs(Y0)>.004&&Math.abs(Math.sin(st))<.02){const v=Y0>0?1:-1,g=v*qe,T=-no,L=Math.cos(Y0),j=Math.sin(Y0);rs=s+g*L-T*j,ls=a+g*j+T*L,ko=Math.abs(Math.tan(Y0))}else ko=0;const y=1/150,_=k.stick;for(let v=0;v<f;v++){const g=v*8;Rt[g]=m0[v]+(v===_?.07*Math.sin(o*5.3+2*Math.sin(o*1.7))*(.6+.4*Math.sin(o*.43)):0),Rt[g+1]=a0[v],n0[v]*n0[v]+k0[v]*k0[v]>900&&!V[v]?(Rt[g+2]=n0[v]*y*.5,Rt[g+3]=k0[v]*y*.5):(Rt[g+2]=0,Rt[g+3]=0),Rt[g+4]=D0[v],Rt[g+5]=$[v],Rt[g+6]=H[v],Rt[g+7]=0;const L=v*4;Te[L]=m0[v],Te[L+1]=a0[v],Te[L+2]=1,Te[L+3]=0}cs(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,u,u),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,xo),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,Xe),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,Ye),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,yo),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,po),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,bo),t.useProgram(X0),t.uniform4fv(h(X0,"uF"),_0),t.uniform4f(h(X0,"uW"),rs,ls,ko,Y0>0?-1:1),t.bindVertexArray(ss),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.bindBuffer(t.ARRAY_BUFFER,os),t.bufferData(t.ARRAY_BUFFER,Te,t.STREAM_DRAW),t.bindBuffer(t.ARRAY_BUFFER,es),t.bufferData(t.ARRAY_BUFFER,Rt,t.STREAM_DRAW),t.enable(t.BLEND),t.blendFunc(t.DST_COLOR,t.ZERO),t.useProgram(se),t.uniform4fv(h(se,"uF"),_0),t.bindVertexArray(as),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,ve),t.bindVertexArray(Is),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,f),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.useProgram(At),t.uniform4fv(h(At,"uF"),_0),t.bindVertexArray(as),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,ve),t.useProgram(c0),t.uniform4fv(h(c0,"uF"),_0),t.bindVertexArray(Ss),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,f),t.disable(t.BLEND),t.bindVertexArray(null)}const je=22050,he=64,Kt=new Float32Array(he*2),Je=new Float32Array(he),q0=new Float32Array(he*4),Qe=new Int32Array(he),Ze=new Float32Array(he);let Lt=0;const Ee=new Float32Array(4096);let zo=0,Co=0;const $e=[{pin:[3200,5e3,.005],ov:2.76,bb:[2800,5200,.0025],bin:[1500,2600,.003]},{pin:[4200,6800,.008],ov:2.4,bb:[5200,7800,.006],bin:[2600,4200,.004]},{pin:[1100,1900,.0025],ov:2.1,bb:[700,1300,.002],bin:[450,800,.003]},{pin:[4600,6400,.07],ov:2.7,bb:[5e3,7200,.05],bin:[3800,5200,.03]}][F];function us(o,s,a,c,i){if(Lt>=he||c<.004)return;const l=o*m/je,d=Math.exp(-1/(a*je)),r=Math.min(3,l*s),y=Math.pow(d,1.6);Kt[Lt*2]=2*d*Math.cos(l),Kt[Lt*2+1]=2*y*Math.cos(r),Je[Lt]=d*d,Ze[Lt]=y*y;const _=Lt*4;q0[_]=c*Math.sin(l),q0[_+1]=0,q0[_+2]=c*.4*Math.sin(r),q0[_+3]=0,Qe[Lt]=i,Lt++}function Hs(o){const s=Math.min(4096,Math.round(o*je));if(s<=0||!e.sound.on){k.nev=0;return}const a=k.nev,c=Math.min(a,40),i=a>40?Math.sqrt(40/a):1;for(let r=0;r<c;r++){const y=a>40?Math.floor(T0()*a):r,_=y*4,v=W[_],g=W[_+2],T=W[_+3],L=Math.min(1,T/100)*.42*i,j=Math.floor(T0()*s),u0=T0(),E0=k.upy>0?g<zt+1:g>Ct,R0=v===0?$e.pin:v===1?null:E0?$e.bin:$e.bb;R0?us(R0[0]+(R0[1]-R0[0])*u0,$e.ov,R0[2],L*(v===0?1:E0?.6:.75),j):us(650+450*u0,2.3,.006,L*.7,j)}k.nev=0,Ee.fill(0,0,s);for(let r=0;r<Lt;r++){const y=r*4,_=Kt[r*2],v=Je[r],g=Kt[r*2+1],T=Ze[r];let L=q0[y],j=q0[y+1],u0=q0[y+2],E0=q0[y+3];for(let R0=Qe[r];R0<s;R0++){const Jt=_*L-v*j,Mt=g*u0-T*E0;Ee[R0]+=Jt+Mt,j=L,L=Jt,E0=u0,u0=Mt}q0[y]=L,q0[y+1]=j,q0[y+2]=u0,q0[y+3]=E0,Qe[r]=0}let l=0;for(let r=0;r<Lt;r++)if(Math.abs(q0[r*4])+Math.abs(q0[r*4+1])>8e-4){if(l!==r){Kt[l*2]=Kt[r*2],Kt[l*2+1]=Kt[r*2+1],Je[l]=Je[r],Ze[l]=Ze[r];for(let y=0;y<4;y++)q0[l*4+y]=q0[r*4+y]}Qe[l]=0,l++}Lt=l;let d=0;for(let r=0;r<f;r+=4)!V[r]&&n0[r]*n0[r]+k0[r]*k0[r]>100&&d++;zo+=(Math.min(1,d/(f/4)*1.6)*(Ot>=0?.09:.035)-zo)*.25;for(let r=0;r<s;r++)Co=Co*.93+(T0()-.5)*zo,Ee[r]=Math.tanh(Ee[r]*.9+Co*1.4);e.sound.pcm(Ee.subarray(0,s),je,{vel:.9})}let me=-1,Bo=0,So=0,jt=0,vs=0,Io=1,_o=1,Pe=-1,to=-1,Js=0;const hs=[0,.12,0,-.1,.05,0];let qo=0,No=0,ms=0,xe=0,xs=0,ne=-1;function Go(o,s,a){Ot>=0||(ne=-1,Eo=st,Ke=Math.round((st+o*R)/R)*R,Ot=s,to=-1,xe=0,qo=Y0,No=Math.cos(Ke)>0&&a||0)}function Xs(o,s){const[a,c,i]=io(st,Y0),[l,d]=fe(vt,o,1-s),r=(l-a)/It,y=(d-c)/It,_=Math.cos(i),v=Math.sin(i);return[r*_+y*v,-r*v+y*_+ee]}function Ys(o,s,a){const[c,i]=Xs(o,s);let l=-1,d=e0===1?2.8:4;for(let r=0;r<x;r++){const y=Math.hypot(p[r]-c,U[r]-i);y<d&&(d=y,l=r)}if(l>=0){z[l]=z[l]?0:1,ns();for(let r=0;r<f;r++)V[r]&&Math.hypot(m0[r]-c,a0[r]-i)<4&&U0(r);k.stick>=0&&Math.hypot(m0[k.stick]-c,a0[k.stick]-i)<4&&(k.stick=-1),e.sound.on&&e.sound.note(z[l]?88:76,{dur:.08,vel:.25,wave:"triangle",cutoff:3e3})}else c>-E-H0&&c<E+H0&&i>-H0&&i<O0+H0&&(K0(c,i,90,42),Fo=.0025,e.sound.on&&e.sound.hit("kick",.35))}function Vs(o){const s=e.input;if(s.taps(),s.inside&&s.down){me<0&&(me=o,Bo=s.x,So=s.y,jt=0,vs=Y0);const a=s.x-Bo,c=s.y-So;!jt&&Math.hypot(a,c)>.035&&(jt=Math.abs(c)>Math.abs(a)?2:1),jt===1&&Ot<0&&Math.cos(st)>.99&&(Y0=Math.max(-.14,Math.min(.14,vs-a*.6))),jt===2&&Math.abs(c)>.1&&(Go(c<0?1:-1,o),jt=3),!jt&&o-me>.3&&(_o=.06),Pe=o}else me>=0&&(!jt&&o-me<=.3&&Ys(Bo,So,o),me=-1,_o=1,Pe=o)}function Ws(o){if(Ot>=0)return;const s=Math.cos(st)<0;let a=0;for(let l=0;l<f;l+=3)!V[l]&&n0[l]*n0[l]+k0[l]*k0[l]>900&&a++;const c=Math.min(.12,Math.max(0,o-xs));if(xs=o,a<=1+f/450&&k.simT-k.lastPass>1||o-ms>30?xe+=c:xe=Math.max(0,xe-c*3),xe<=0)return;to=o-xe;const i=o-Pe;ne<0&&(ne=s?1.2+2.5*T0():7+16*T0()*T0()+4*T0()),s&&o-to>ne?(ne=-1,Go(1,o,Pe<0?hs[Math.floor(T0()*hs.length)]:0)):!s&&o-to>ne&&i>10&&(ne=-1,Go(T0()<.5?1:-1,o))}let Do=0;function Os(o){if(Ot>=0){const a=Math.min(1,(o-Ot)/Us),c=a*a*(3-2*a);st=Eo+(Ke-Eo)*c,Y0=qo+(No-qo)*c,a>=1&&(st=Ke,Y0=No,Ot=-1,ms=o,e.sound.on&&e.sound.hit("kick",.5))}const s=st+Y0;Math.abs(s-Do)>1e-5&&(j0(s),ge(),k.stick>=0&&Math.abs(s-Do)>.002&&(k.stick=-1),Do=s)}for(let o=0;o<150;o++)r0();k.nev=0;let Fe=0;fs(0);const Ks={ox:K,oy:Bt,sc:P0,N:f,px:m0,py:a0,vx:n0,vy:k0,asleep:V,step:r0,setGravity:j0,HB:zt,YN:Pt,YNT:Ct,YR:O0,XW:E,WB:lt,NR:i0,SP:l0,divX:re,pinX:Dt,pinY:n,pinOn:z,segs:yt,EV:W,get nev(){return k.nev},set nev(o){k.nev=o},get neckPass(){return k.neckPass},get lastPass(){return k.lastPass},get simT(){return k.simT},get thF(){return st},get thT(){return Y0},get stick(){return k.stick},get nKnock(){return k.nKnock}};return e.__dbg&&e.__dbg(Ks),(o,s)=>{s=Math.max(0,Math.min(.12,s||0)),Vs(o),Io+=(_o-Io)*Math.min(1,s*6),Os(o),Ws(o),Fo*=Math.pow(.002,s),Fe+=s*Io;let a=0;for(;Fe>=d0&&a<13;)r0(),Fe-=d0,a++;if(k.stick>=0&&k.simT-k.stickAt>k.stickHold){const c=k.stick;k.stick=-1,U0(c),n0[c]=T0()<.5?-4:4}Fe>d0&&(Fe=d0),Hs(s),fs(o)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
