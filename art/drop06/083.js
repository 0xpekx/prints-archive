// Peg Drop: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/083.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Xo){Xo&&function(){"use strict";function Yo(e,f,k,m,A,R,b,C,y,J,G,B,_,$,P,V0,s0,N,J0,E0,W0,Y,D){const E={N:e,BK:f,GX0:B,GY0:_,GW:$,GH:P,E_PIN:[.42,.5,.4,.4][f],E_BALL:[.3,.45,.15,.3][f],MU:[.05,.1,.35,.08][f],E_WALL:[.3,.35,.15,.3][f],IRREG:f===2?.8:.04,YL:k,YN:m,YNT:A,Y0:R,RH:b,XIN:C,YIN0:y,YIN1:J,RPIN:G,gS1:V0,gS2:s0,gP:N,SA:J0,pinXA:E0,pinYA:W0,pinOn:Y,px:new Float64Array(e),py:new Float64Array(e),vx:new Float64Array(e),vy:new Float64Array(e),ox:new Float64Array(e),oy:new Float64Array(e),ang:new Float32Array(e),wv:new Float32Array(e),sc:new Uint8Array(e),rad:new Float64Array(e),ppx:new Float64Array(e),ppy:new Float64Array(e),asleep:new Uint8Array(e),cStamp:new Int32Array(4e4),cS0:new Int32Array(4e4),cS1:new Int32Array(4e4),cntX:new Int32Array(40001),cntY:new Int32Array(40001),bX:new Int32Array(e),bY:new Int32Array(e),ord2:new Int32Array(e),occ:new Int32Array(e),cAw:new Uint16Array(4e4),cFall:new Uint8Array(4e4),cOf:new Int32Array(e),ord:new Int32Array(e),ctI:new Int32Array(8192),ctJ:new Int32Array(8192),ctN:new Float64Array(32768),EV:new Float32Array(1024),rs:new Int32Array(1),gxB:.5,gyB:.5,upx:.5,upy:.5,gL0:.5,gH0:.5,gCW:1,gCH:1,simT:.5,lastPass:.5,lastCheck:.5,knocked:.5,stickAt:.5,stickHold:.5,stepId:0,nev:0,nKnock:0,neckPass:0,jamK:0,stick:-1,stickBall:-1};return E.rs[0]=D,E.simT=0,E.lastPass=0,E.lastCheck=0,E.knocked=-9,E.stickAt=0,E.stickHold=30,E}function Ge(e,f,k,m){e.gxB=-1500*Math.sin(f),e.gyB=-1500*Math.cos(f);const b=e.upx=-e.gxB/1500,C=e.upy=-e.gyB/1500;let y=1e9,J=-1e9,G=1e9,B=-1e9;for(const[$,P]of[[-k,0],[k,0],[-k,m],[k,m]]){const V0=$*C-P*b,s0=$*b+P*C;y=Math.min(y,V0),J=Math.max(J,V0),G=Math.min(G,s0),B=Math.max(B,s0)}e.gL0=y-2,e.gH0=G-2;const _=e.gCW=Math.floor((J-y+4)*.5)+1;e.gCH=Math.min(Math.floor(4e4/_)-1,Math.floor((B-G+4)*.5)+1)}let Vo=!1;function ys(e,f,k,m){const R=Yo(48,e.BK,e.YL,e.YN,e.YNT,e.Y0,e.RH,e.XIN,e.YIN0,e.YIN1,e.RPIN,e.GX0,e.GY0,e.GW,e.GH,e.gS1,e.gS2,e.gP,e.SA,e.pinXA,e.pinYA,e.pinOn.slice(),625341585);Ge(R,0,f,k),R.lastCheck=-1,R.lastPass=-5;const b=(y,J,G,B,_,$,P)=>{R.px[y]=J,R.py[y]=G,R.vx[y]=B,R.vy[y]=_,R.rad[y]=1-.05*(y%3),R.asleep[y]=$,R.sc[y]=P},C=()=>{const y=R.YIN0,J=e.pinXA.length;b(0,0,y,0,0,1,0),b(1,.1,y+1.95,0,0,1,0),b(2,0,y+3.9,0,0,0,45),b(3,.2,y+8,0,-80,0,0),b(4,-8,y+1.5,0,-40,0,0),b(5,-8,y+3.6,0,0,1,0),b(6,8,y,.1,0,0,45),b(7,16,y,0,0,0,40),b(8,-1.1,R.YNT+30,30,0,0,0),b(9,1.1,R.YNT+29.8,-30,0,0,0),b(10,-16,y+1.9,0,0,0,0),b(11,-16,y+3.2,0,0,1,0),b(12,2.7,y+2,20,0,0,0);for(let G=13;G<48;G++){const B=G%3,_=at(R),$=at(R),P=Math.floor(at(R)*J);B===0?b(G,e.pinXA[P]+(_-.5)*.2,e.pinYA[P]+e.RPIN+1.02,0,0,0,0):B===1?b(G,e.pinXA[P]+(_-.5)*3,e.pinYA[P]+3+$*2,(_-.5)*30,-70,0,0):b(G,(_-.5)*R.XIN*1.6,R.YNT+2+$*20,($-.5)*20,-30*_,0,0)}};C();for(let y=0;y<6;y++)be(R);C(),R.stickBall=0;for(let y=0;y<10;y++)be(R);co(R,0,R.YL,30,22),Ge(R,Math.PI,f,k);for(let y=0;y<6;y++)be(R);Ge(R,.1,f,k);for(let y=0;y<4;y++)be(R)}function at(e){const f=e.rs,k=f[0]=f[0]+1831565813|0;let m=Math.imul(k^k>>>15,1|k);return m=m+Math.imul(m^m>>>7,61|m)^m,((m^m>>>14)>>>0)/4294967296}function Wo(e,f,k,m){const A=e.nev;if(A<256){const R=A*4,b=e.EV;b[R]=f,b[R+1]=e.px[k],b[R+2]=e.py[k],b[R+3]=m,e.nev=A+1}}function ce(e,f){return f===e.stick?!1:(e.asleep[f]=0,e.sc[f]=0,e.ox[f]=e.px[f],e.oy[f]=e.py[f],e.vx[f]=0,e.vy[f]=0,!0)}function ws(e,f,k,m){const A=e.px,R=e.py,b=e.vx,C=e.vy,y=e.rad,J=e.ppx,G=e.ppy,B=e.SA,_=e.GX0,$=e.GY0,P=e.GW,V0=e.GH;let s0=A[f],N=R[f];const J0=Math.floor(s0-_),E0=Math.floor(N-$);if(J0<0||E0<0||J0>=P||E0>=V0)return m;const W0=E0*P+J0;for(let D=0;D<2;D++){const t0=D?e.gS2[W0]:e.gS1[W0];if(t0<0)continue;const e0=t0*8,E=B[e0],X=B[e0+1],I=B[e0+2]-E,o0=B[e0+3]-X,b0=y[f]+B[e0+4],nt=I*I+o0*o0||1,v0=((s0-E)*I+(N-X)*o0)/nt;let y0,k0,z0;if(B[e0+7]&&v0>=0&&v0<=1){y0=B[e0+5],k0=B[e0+6];const N0=(s0-E)*y0+(N-X)*k0;if(N0>=b0)continue;z0=b0-N0}else{const N0=v0<0?0:v0>1?1:v0,ct=s0-E-I*N0,Jt=N-X-o0*N0,dt=ct*ct+Jt*Jt;if(dt>=b0*b0||dt<1e-12)continue;const Mt=Math.sqrt(dt);y0=ct/Mt,k0=Jt/Mt,z0=b0-Mt}if(s0+=y0*z0,N+=k0*z0,z0>.15&&(J[f]+=y0*(z0-.15),G[f]+=k0*(z0-.15)),k&&m<8192){e.ctI[m]=f,e.ctJ[m]=-1;const N0=m*4,ct=e.ctN;ct[N0]=y0,ct[N0+1]=k0,ct[N0+2]=b[f]*y0+C[f]*k0,ct[N0+3]=z0,m++}}const Y=e.gP[W0];if(Y>=0&&e.pinOn[Y]){const D=e.pinXA,t0=e.pinYA,e0=s0-D[Y],E=N-t0[Y],X=e0*e0+E*E,I=y[f]+e.RPIN;if(X<I*I&&X>1e-12){const o0=Math.sqrt(X),b0=e0/o0,nt=E/o0;if(s0+=b0*(I-o0),N+=nt*(I-o0),k&&m<8192){e.ctI[m]=f,e.ctJ[m]=-2-Y;const v0=m*4,y0=e.ctN;y0[v0]=b0,y0[v0+1]=nt,y0[v0+2]=b[f]*b0+C[f]*nt,y0[v0+3]=I-o0,m++}f===e.stickBall&&e.stick<0&&b0*e.upx+nt*e.upy>.93&&t0[Y]<e.Y0-e.RH*1.5&&(e.stick=f,e.stickAt=e.simT,e.stickHold=14+40*at(e),s0=D[Y]+e.upx*I,N=t0[Y]+e.upy*I,e.asleep[f]=1,b[f]=0,C[f]=0)}}return A[f]=s0,R[f]=N,m}function be(e){const f=e.px,k=e.py,m=e.vx,A=e.vy,R=e.ox,b=e.oy,C=e.asleep,y=e.rad,J=e.ppx,G=e.ppy,B=e.ord,_=e.cAw,$=e.cFall,P=e.cOf,V0=e.ctI,s0=e.ctJ,N=e.ctN,J0=e.sc,E0=e.wv,W0=e.ang,Y=e.upx,D=e.upy,t0=e.N,e0=e.BK,E=e.YL,X=e.YN,I=e.YNT,o0=e.XIN,b0=e.YIN0,nt=e.YIN1,v0=e.E_PIN,y0=e.E_BALL,k0=e.MU,z0=e.E_WALL,N0=e.IRREG,ct=e.GX0,Jt=e.GY0,dt=e.GW,Mt=e.GH,xt=e.SA,Qt=e.gS1,io=e.gS2,it=e.gP,De=e.pinOn,Tt=e.pinXA,i0=e.pinYA,ye=e.RPIN,we=2,l0=1/120,Ft=120,Et=110,pt=Et*Et,rt=20,$t=8192,lt=e.simT+=l0;let F=0;const ro=e.gxB*l0,zt=e.gyB*l0;for(let n=0;n<t0;n++){if(C[n])continue;let d=m[n]+ro,x=A[n]+zt;const U=d*d+x*x;if(U>pt){const Q=Et/Math.sqrt(U);d*=Q,x*=Q}m[n]=d,A[n]=x;const z=f[n],S=k[n];R[n]=z,b[n]=S,f[n]=z+d*l0,k[n]=S+x*l0}const L0=e.gCW,G0=e.gCH,Zt=e.gL0,Bt=e.gH0,qt=++e.stepId,_t=e.cStamp,Nt=e.cS0,ge=e.cS1,Ue=e.bX,He=e.bY,Xe=e.ord2,O0=e.occ,bt=e.cntX,yt=e.cntY;bt.fill(0,0,L0+1),yt.fill(0,0,G0+1);for(let n=0;n<t0;n++){const d=f[n],x=k[n];let U=(d*D-x*Y-Zt)*.5|0,z=(d*Y+x*D-Bt)*.5|0;U<0?U=0:U>=L0&&(U=L0-1),z<0?z=0:z>=G0&&(z=G0-1);const S=z*L0+U;P[n]=S,Ue[n]=U,He[n]=z,bt[U+1]++,yt[z+1]++,_t[S]!==qt&&(_t[S]=qt,_[S]=0,$[S]=0),C[n]||(_[S]++,m[n]*Y+A[n]*D<((D>0?x<E:x>I)?-30:-12)&&($[S]=1))}for(let n=0;n<L0;n++)bt[n+1]+=bt[n];for(let n=0;n<G0;n++)yt[n+1]+=yt[n];for(let n=0;n<t0;n++)Xe[bt[Ue[n]]++]=n;for(let n=0;n<t0;n++){const d=Xe[n];B[yt[He[d]]++]=d}let ie=0;for(let n=0,d=-1;n<t0;n++){const x=P[B[n]];x!==d&&(O0[ie++]=x,Nt[x]=n,d=x),ge[x]=n+1}const Ae=D>0;for(let n=0;n<we;n++)for(let d=0;d<ie;d++){const x=O0[d],U=Nt[x],z=ge[x];if(n===1){let O=!1;for(let u=U;u<z;u++){const h0=k[B[u]];if(Ae?h0<=I:h0>=E){O=!0;break}}if(!O)continue}const S=x/L0|0,Q=x-S*L0,B0=Q>0,C0=S>0,S0=C0?x-L0-(B0?1:0):0,wt=C0?x-L0+(Q+1<L0?1:0):0,Q0=B0&&_t[x-1]===qt,$0=Q0?Nt[x-1]:U;let ft=_[x]+(Q0?_[x-1]:0),f0=0,ut=0,g0=0;if(C0)for(let O=S0;O<=wt;O++)_t[O]===qt&&(ut===g0&&(ut=Nt[O]),g0=ge[O],ft+=_[O],f0|=$[O]);for(let O=U;O<z;O++){const u=B[O];let h0=C[u];if(n===1&&(Ae?k[u]>I:k[u]<E))continue;if(h0){if(n===0&&f0&&ce(e,u))h0=0;else if(ft===0)continue}let gt=f[u],Dt=k[u];const M=y[u];for(let m0=0;m0<3;m0++){const a0=m0===0?ut:m0===1?$0:U,n0=m0===0?g0:m0===1?B0?U:0:O;for(let R0=a0;R0<n0;R0++){const K=B[R0],Ct=gt-f[K],D0=Dt-k[K],Z0=Ct*Ct+D0*D0,P0=M+y[K];if(Z0>=P0*P0)continue;let d0=C[K];if(h0&&d0)continue;const V=Math.sqrt(Z0)||1e-6,W=Z0>1e-12?Ct/V:D,H=Z0>1e-12?D0/V:-Y,Z=P0-V<1?P0-V:1,x0=W*Y+H*D;let M0=0;n===0&&(M0=(m[u]-m[K])*W+(A[u]-A[K])*H,(M0<-30||Z>.2)&&(d0&&ce(e,K)&&(d0=0),h0&&ce(e,u)&&(h0=0)));const U0=Z>.15?Z-.15:0;if(d0||!h0&&x0>.3)gt+=W*Z,Dt+=H*Z,J[u]+=W*U0,G[u]+=H*U0;else if(h0||x0<-.3)f[K]-=W*Z,k[K]-=H*Z,J[K]-=W*U0,G[K]-=H*U0;else{const r0=Z*.5,K0=U0*.5;if(gt+=W*r0,Dt+=H*r0,f[K]-=W*r0,k[K]-=H*r0,J[u]+=W*K0,G[u]+=H*K0,J[K]-=W*K0,G[K]-=H*K0,Z>.12){const p0=(Z-.12)*.6;x0>=0?(gt+=Y*p0,Dt+=D*p0,J[u]+=Y*p0,G[u]+=D*p0):(f[K]+=Y*p0,k[K]+=D*p0,J[K]+=Y*p0,G[K]+=D*p0)}}if(n===0&&F<$t){V0[F]=u,s0[F]=K;const r0=F*4;N[r0]=W,N[r0+1]=H,N[r0+2]=M0,N[r0+3]=Z,F++}}}if(f[u]=gt,k[u]=Dt,!h0){const m0=n===0;let a0=gt,n0=Dt;const R0=Math.floor(a0-ct),K=Math.floor(n0-Jt);if(!(R0<0||K<0||R0>=dt||K>=Mt)){const Ct=K*dt+R0;for(let Z0=0;Z0<2;Z0++){const P0=Z0?io[Ct]:Qt[Ct];if(P0<0)continue;const d0=P0*8,V=xt[d0],W=xt[d0+1],H=xt[d0+2]-V,Z=xt[d0+3]-W,x0=M+xt[d0+4],M0=H*H+Z*Z||1,U0=((a0-V)*H+(n0-W)*Z)/M0;let r0,K0,p0;if(xt[d0+7]&&U0>=0&&U0<=1){r0=xt[d0+5],K0=xt[d0+6];const j0=(a0-V)*r0+(n0-W)*K0;if(j0>=x0)continue;p0=x0-j0}else{const j0=U0<0?0:U0>1?1:U0,ke=a0-V-H*j0,H0=n0-W-Z*j0,Le=ke*ke+H0*H0;if(Le>=x0*x0||Le<1e-12)continue;const St=Math.sqrt(Le);r0=ke/St,K0=H0/St,p0=x0-St}if(a0+=r0*p0,n0+=K0*p0,p0>.15&&(J[u]+=r0*(p0-.15),G[u]+=K0*(p0-.15)),m0&&F<$t){V0[F]=u,s0[F]=-1;const j0=F*4;N[j0]=r0,N[j0+1]=K0,N[j0+2]=m[u]*r0+A[u]*K0,N[j0+3]=p0,F++}}const D0=it[Ct];if(D0>=0&&De[D0]){const Z0=a0-Tt[D0],P0=n0-i0[D0],d0=Z0*Z0+P0*P0,V=M+ye;if(d0<V*V&&d0>1e-12){const W=Math.sqrt(d0),H=Z0/W,Z=P0/W;if(a0+=H*(V-W),n0+=Z*(V-W),m0&&F<$t){V0[F]=u,s0[F]=-2-D0;const x0=F*4;N[x0]=H,N[x0+1]=Z,N[x0+2]=m[u]*H+A[u]*Z,N[x0+3]=V-W,F++}u===e.stickBall&&e.stick<0&&H*Y+Z*D>.93&&i0[D0]<e.Y0-e.RH*1.5&&(e.stick=u,e.stickAt=lt,e.stickHold=14+40*at(e),a0=Tt[D0]+Y*V,n0=i0[D0]+D*V,C[u]=1,m[u]=0,A[u]=0)}}f[u]=a0,k[u]=n0}}}}for(let n=0;n<t0;n++){if(C[n])continue;ws(e,n,0,F);let d=f[n],x=k[n];d<-o0?d=-o0:d>o0&&(d=o0),x<b0?x=b0:x>nt&&(x=nt),f[n]=d,k[n]=x;let U=(d-R[n]-J[n])*Ft,z=(x-b[n]-G[n])*Ft;J[n]=0,G[n]=0;const S=U*U+z*z,Q=Math.max(m[n]*m[n]+A[n]*A[n],400);if(S>Q){const B0=Math.sqrt(Q/S);U*=B0,z*=B0}m[n]=U,A[n]=z}for(let n=0;n<F;n++){const d=V0[n],x=s0[n],U=n*4,z=N[U],S=N[U+1],Q=N[U+2],B0=k0*N[U+3]*Ft,C0=-S,S0=z;if(x<0){const wt=m[d]*z+A[d]*S,Q0=m[d]*C0+A[d]*S0;let $0=0;if(Q<-rt){const O=x===-1?z0:e0===2?v0*(.4+1.2*at(e)):v0,u=-O*Q;wt<u&&($0=u-wt),Q<-14&&Wo(e,x===-1?1:0,d,-Q)}const ft=Math.min(Math.abs(Q0),B0+k0*$0),f0=Q0<0?-ft:ft;let ut=z,g0=S;if(x<-1&&N0>.05&&$0>0){const O=(at(e)-.5)*N0,u=Math.cos(O),h0=Math.sin(O);ut=z*u-S*h0,g0=z*h0+S*u}m[d]+=ut*$0-C0*f0,A[d]+=g0*$0-S0*f0,E0[d]=E0[d]*.8+Q0*.2}else{const wt=m[d]-m[x],Q0=A[d]-A[x],$0=wt*z+Q0*S,ft=wt*C0+Q0*S0;let f0=0;if(Q<-rt){const gt=-y0*Q;$0<gt&&(f0=gt-$0),Q<-20&&Wo(e,2,d,-Q)}const ut=Math.min(Math.abs(ft),B0+k0*f0),g0=ft<0?-ut:ut,O=z*Y+S*D,u=C[d]||O<-.3&&m[d]*m[d]+A[d]*A[d]<100,h0=C[x]||O>.3&&m[x]*m[x]+A[x]*A[x]<100;h0&&!u?(m[d]+=z*f0-C0*g0,A[d]+=S*f0-S0*g0):u&&!h0?(m[x]-=z*f0-C0*g0,A[x]-=S*f0-S0*g0):u||(m[d]+=(z*f0-C0*g0)*.5,A[d]+=(S*f0-S0*g0)*.5,m[x]-=(z*f0-C0*g0)*.5,A[x]-=(S*f0-S0*g0)*.5)}}const w0=(X+I)*.5,re=D>0,Gt=e.stick;for(let n=0;n<t0;n++){if(C[n])continue;W0[n]+=E0[n]*l0;const d=k[n];d>E-2&&d<X&&Gt!==n?(J0[n]=0,m[n]*m[n]+A[n]*A[n]<4&&(m[n]+=(at(e)-.5)*1.5,A[n]+=(at(e)-.5)*1.5)):m[n]*m[n]+A[n]*A[n]<9?++J0[n]>45&&(C[n]=1,m[n]=0,A[n]=0):J0[n]=0,(re?d<w0&&b[n]>=w0&&A[n]<-8:d>w0&&b[n]<=w0&&A[n]>8)&&(e.neckPass++,e.lastPass=lt,e.jamK=0)}if(lt-e.lastCheck>.25&&(e.lastCheck=lt,lt-e.lastPass>.9&&lt-e.knocked>.9)){let n=0;for(let d=0;d<t0;d++){const x=k[d];Math.abs(f[d])<14&&(re?x>I-1&&x<I+14:x<X+1&&x>X-14)&&n++}(n>6||n>2&&e.jamK<4)&&(co(e,0,w0,16,22),e.jamK++)}}function co(e,f,k,m,A){const R=e.px,b=e.py,C=e.vx,y=e.vy,J=e.asleep,G=e.N;if(e.knocked=e.simT,e.nKnock++,e.stick>=0&&(R[e.stick]-f)**2+(b[e.stick]-k)**2<m*m){const B=e.stick;e.stick=-1,ce(e,B)}for(let B=0;B<G;B++){const _=R[B]-f,$=b[B]-k;if(_*_+$*$>m*m||J[B]&&!ce(e,B))continue;const P=A*(1-.6*Math.sqrt(_*_+$*$)/m);C[B]+=(at(e)-.5)*P,y[B]+=(at(e)-.3)*P*(e.upy>0?1:-1)}}Xo.add({num:83,name:"Peg Drop",fam:"Worlds",recipe:"An antique bean machine where hundreds of balls bounce through brass pins into bins and pile up into a bell curve. The balls and how many rows change every mint. Drag up or down to flip it like an hourglass, drag sideways to tilt it, tap a pin to pull it out or put it back, tap the case to knock it, or hold to slow time right down.",interactive:"Drag up or down to turn the board over like an hourglass and pour again. Drag sideways to tilt it and shift the curve. Tap a pin to pull it out or put it back; tap the case to knock it. Hold to slow time to a crawl.",music:!0,gl:!0,fps:30,seed:0,make(e){const f=e.size,k=Math.PI,m=k*2,A=Math.sqrt(3),R=(e.hash||"0x0").slice(2).padEnd(64,"0"),b=o=>parseInt(R.slice(o*8,o*8+8),16)>>>0,C=o=>{let s=o>>>0;return()=>{s=s+1831565813|0;let a=Math.imul(s^s>>>15,1|s);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}},y=C(b(0)^Math.imul(b(4),739982445)),J=C(b(1)^Math.imul(b(5),695872825)),G=C(b(2)^Math.imul(b(6),2654435761)),B=C(b(3)^Math.imul(b(7),2246822519)),_=(o,s,a)=>{let c=0;for(const p of a)c+=p;let i=o()*c,l=0;for(;i>=a[l]&&l<a.length-1;)i-=a[l++];return s[l]},$=["Steel shot","Glass marbles","Dried beans","Brass bells"],P=["Walnut and brass","Fairground paint","Clear acrylic","Giant"],V0=["Classic triangle","Dense field","Old quincunx"],s0=["Desk lamp","Window","Museum spotlight"],N=["None","Two-colour pour","Hourglass case","A balancing ball"];let J0=_(y,$,[44,28,21,7]),E0=_(y,P,[42,30,21,7]),W0=_(y,V0,[55,35,10]),Y=_(y,s0,[44,34,22]),D=_(y,[10,12,14],[30,45,25]),t0=_(y,N,[70,11,10,9]);e.home&&(J0="Steel shot",E0="Walnut and brass",W0="Classic triangle",Y="Desk lamp",D=12,t0="None"),E0==="Giant"&&(D=18);let e0=V0.indexOf(W0);const E=$.indexOf(J0),X=P.indexOf(E0),I=s0.indexOf(Y),o0=N.indexOf(t0);e.trait("Balls",J0),e.trait("Board",E0),e.trait("Pins",W0),e.trait("Rows",E0==="Giant"?"18":String(D)),e.trait("Light",Y),e.trait("Something rare",t0);const b0=["Straight on","Close on the bins","Close on the pins","Across the desk"],nt=C(b(6)^Math.imul(b(2),1640531527)^625341585);let v0=_(nt,b0,[46,20,20,14]);const y0=nt()<.5?1:-1;e.home&&(v0=b0[0]);let k0=b0.indexOf(v0);e.trait("Camera",v0);const z0=C((b(7)^Math.imul(b(3),73244475)^539493)>>>0),N0=z0(),ct=z0(),Jt=z0(),dt=!e.home&&N0<.36&&t0!=="A balancing ball"&&t0!=="Two-colour pour",Mt=!e.home&&Jt<.16&&E0!=="Giant"&&t0!=="Hourglass case";Mt&&(D=6,e.trait("Rows","6"),W0==="Dense field"&&(W0="Classic triangle",e0=0,e.trait("Pins",W0))),e.trait("Moment",dt?"The curve standing":"Pouring");const xt=dt&&k0===2;xt&&(k0=1,v0=b0[1],e.trait("Camera",v0));const Qt=z0(),io=z0();let it=I===0?Qt<.12?2:Qt<.47?1:0:I===1?Qt<.12?2:Qt<.52?4:3:Qt<.4?6:5;Mt&&I<2&&(it=2),e.home&&(it=0);const De=e.home||it===5?0:(Math.floor(io*256)+109)%256,Tt=(it===0||it===3||it===5)&&De===0?0:1+it,i0=D,ye=i0+1,we=Math.round((X===3?760:[330,290,270,240][E])*(Mt?.3:1)),l0=8,Ft=l0*A/2,Et=X===3?.45:.5,pt=E===2?4.3:E===0?4:3.9,rt=.32,$t=.34,lt=ye*l0,F=lt/2,ro=(()=>{let o=1;for(let s=1;s<=i0/2;s++)o*=(i0/2+s)/(s*4);return o})(),zt=Math.ceil(we*ro*(E===2?1.12:.92)*4/(l0-2*$t)*1.12+7),L0=zt+3.4,G0=L0+(i0-1)*Ft,Zt=G0+5.2,Bt=Zt+2.6,qt=.72,_t=(F-pt/2)*qt,Nt=Bt+_t,ge=we*4.4,Ue=_t*(lt+pt)/2,He=(F-pt/2)*(F-pt/2)*(qt-.2),Xe=Math.max(6,(ge+He-Ue)/lt+4),O0=Nt+Xe,bt=o0===2,yt=[],ie=(o,s,a,c,i,l)=>{const p=Math.hypot(a-o,c-s)||1,r=l||0;yt.push([o,s,a,c,i||rt,-(c-s)/p*r,(a-o)/p*r,r?1:0])},Ae=(o,s)=>{for(let a=0;a+1<o.length;a++)ie(o[a][0],o[a][1],o[a+1][0],o[a+1][1],rt,s)},w0=[];w0.push([F,0],[F,zt]);{const o=G0-Ft,s=l0/2+Et+3.1;w0.push([s,o]),w0.push([Et+rt+6.2,G0]),w0.push([pt/2,Zt])}if(w0.push([pt/2,Bt]),bt)for(let s=1;s<=10;s++){const a=s/10,c=pt/2+(F-pt/2)*a,i=Bt+_t*(a-.22*Math.sin(a*k));w0.push([c,i])}else w0.push([F,Nt]);w0.push([F,O0],[0,O0]),Ae(w0,1),Ae(w0.map(o=>[-o[0],o[1]]),-1),ie(-F,0,F,0,rt,1);const re=[];for(let o=0;o<i0;o++)re.push((o-(i0-1)/2)*l0);for(const o of re)ie(o,0,o,zt,$t,0);const Gt=[],n=[];if(e0===1){const s=5.4*A/2,a=Math.floor((G0-L0+2)/s)+1;for(let c=0;c<a;c++)for(let i=0;i<=c;i++)Gt.push((i-c/2)*5.4),n.push(G0-c*s)}else for(let o=0;o<i0;o++)for(let s=0;s<=o;s++)Gt.push((s-o/2)*l0),n.push(G0-o*Ft);const d=Gt.length,x=Float64Array.from(Gt),U=Float64Array.from(n),z=new Uint8Array(d).fill(1);if(e0===2)for(let o=3;o<d;o++)J()<.13&&(z[o]=0);const S=-F-4,Q=-4,B0=Math.ceil(lt+8),C0=Math.ceil(O0+8),S0=B0*C0,wt=new Int16Array(S0).fill(-1),Q0=new Int16Array(S0).fill(-1),$0=new Int16Array(S0).fill(-1),ft=new Float32Array(S0).fill(1e9),f0=new Float32Array(S0).fill(1e9),ut=new Float32Array(S0).fill(1e9),g0=yt.length,O=new Float64Array(g0*8);yt.forEach((o,s)=>{for(let a=0;a<8;a++)O[s*8+a]=o[a]});for(let o=0;o<g0;o++){const[s,a,c,i,l]=yt[o],p=l+2.6,r=Math.max(0,Math.floor(Math.min(s,c)-p-S)),g=Math.min(B0-1,Math.ceil(Math.max(s,c)+p-S)),q=Math.max(0,Math.floor(Math.min(a,i)-p-Q)),v=Math.min(C0-1,Math.ceil(Math.max(a,i)+p-Q)),w=c-s,T=i-a,L=w*w+T*T||1;for(let j=q;j<=v;j++)for(let u0=r;u0<=g;u0++){const F0=S+u0+.5,A0=Q+j+.5,jt=Math.max(0,Math.min(1,((F0-s)*w+(A0-a)*T)/L)),Rt=Math.hypot(F0-s-w*jt,A0-a-T*jt)-l;if(Rt>2.4)continue;const mt=j*B0+u0;Rt<ft[mt]?(f0[mt]=ft[mt],Q0[mt]=wt[mt],ft[mt]=Rt,wt[mt]=o):Rt<f0[mt]&&(f0[mt]=Rt,Q0[mt]=o)}}for(let o=0;o<d;o++){const s=Gt[o],a=n[o];for(let c=Math.floor(a-3-Q);c<=Math.ceil(a+3-Q);c++)for(let i=Math.floor(s-3-S);i<=Math.ceil(s+3-S);i++){if(c<0||i<0||c>=C0||i>=B0)continue;const l=Math.hypot(S+i+.5-s,Q+c+.5-a),p=c*B0+i;l<2.4&&l<ut[p]&&(ut[p]=l,$0[p]=o)}}const u=we,h0=F-rt-1,gt=rt+1,Dt=O0-rt-1,M=Yo(u,E,L0,Zt,Bt,G0,Ft,h0,gt,Dt,Et,S,Q,B0,C0,wt,Q0,$0,O,x,U,z,b(5)^2135587861),{px:m0,py:a0,vx:n0,vy:R0,ox:K,oy:Ct,ang:D0,wv:Z0,sc:P0,rad:d0,asleep:V,EV:W}=M,H=new Uint8Array(u),Z=new Float32Array(u),x0=1/120,M0=()=>at(M),U0=o=>ce(M,o),r0=()=>be(M),K0=(o,s,a,c)=>co(M,o,s,a,c);{const o=C(b(6)^1013904242);let s=0,a=0;for(let v=Bt+1.2;s<u&&a<400;v+=2,a++){let w=v<Nt?pt/2+(v-Bt)/qt:F;w-=rt+1.15;const T=o()*1.1;for(let L=-w+T;L<=w&&s<u;L+=2.08+o()*.12)m0[s]=L,a0[s]=v+(o()-.5)*.12,s++}for(let v=0;v<u;v++)d0[v]=1-o()*(E===2?.16:E===1?.08:.12),V[v]=0,Z[v]=o(),D0[v]=o()*m,H[v]=o0===1&&v>=u/2?1:0;const c=C(b(3)^1759714724),i=Math.round(u*(dt?X===3?.78:[.6,.55,.45,.6][E]-(i0<12?.05:0):[.08,.24,.06,.14][E]+(i0>12?.05:0))),l=new Int32Array(ye),p=new Int32Array(i),r=new Int32Array(i),g=e0===1?Math.floor((L0+(i0-1)*Ft-L0+2)/(5.4*A/2))+1:i0,q=e0===1?5.4:l0;for(let v=0;v<i;v++){const w=u-1-v;let T=0;for(let A0=0;A0<g;A0++)T+=c()<.5?1:0;const L=Math.max(0,Math.min(i0,Math.round((T-g/2)*q/l0+i0/2))),j=l[L]++,u0=Math.floor(j/5)*2+(j%5<3?0:1),F0=j%5<3?(j%5-1)*2.2:(j%5-3.5)*2.2;m0[w]=(L-i0/2)*l0+F0+(c()-.5)*.3,a0[w]=rt+1.02+u0*1.74+(c()-.5)*.05,n0[w]=0,R0[w]=0,V[w]=1,H[w]=0,p[v]=L,r[v]=u0}if(dt){const v=C(b(4)^1374496523),w=new Int32Array(ye);for(let T=0;T<i;T++)w[p[T]]=Math.max(w[p[T]],r[T]);for(let T=0;T<i;T++)if(r[T]>w[p[T]]-3){const L=u-1-T;m0[L]+=(v()-.5)*.7,a0[L]+=v()*.3,V[L]=0}}if(o0===1)for(let v=0;v<u-i;v++)H[v]=v<u/2-i?0:1}let p0=0;const j0=o=>{p0=o,Ge(M,o,F,O0)};j0(0),Vo||(Vo=!0,ys(M,F,O0,zt));const ke=()=>{for(let o=0;o<u;o++)V[o]&&o!==M.stick&&U0(o)},H0=X===3||Mt?4.6:6.4,Le=.9,St=-F-H0-.5,gs=F+H0+.5,Re=-H0-.5,As=O0+H0+.5,le=gs-St,Pt=As-Re,te=O0/2,It=Math.min(.872/Pt,.88/le),Ye=.045,ks=Ye+.032,Ve=(F+H0)*It,lo=(te+H0)*It,Me=(o,s)=>{const a=new Array(9);for(let c=0;c<3;c++)for(let i=0;i<3;i++)a[c*3+i]=o[c*3]*s[i]+o[c*3+1]*s[3+i]+o[c*3+2]*s[6+i];return a},fe=(o,s,a)=>{const c=o[6]*s+o[7]*a+o[8];return[(o[0]*s+o[1]*a+o[2])/c,(o[3]*s+o[4]*a+o[5])/c]},Oo=o=>{const[s,a,c,i,l,p,r,g,q]=o,v=l*q-p*g,w=-(i*q-p*r),T=i*g-l*r,L=s*v+a*w+c*T;return[v/L,-(a*q-c*g)/L,(a*p-c*l)/L,w/L,(s*q-c*r)/L,-(s*p-c*i)/L,T/L,-(s*g-a*r)/L,(s*l-a*i)/L]};let I0=[1,0,0,0,1,0,0,0,1],vt=I0,ue=1;if(k0>0){const o=xt?[15,-10,-2.5,1.3,.5,.2,.5,.36]:[null,[15,-10,-2.5,1.62,.4,.22,.5,.4],[-13,8,3,1.65,.57,.38,.5,.5],[28,-6,1.5,1.2,.5,.47,.5,.5]][k0],s=k/180,a=o[0]*y0*s,c=o[1]*s,i=o[2]*y0*s,l=1,p=.5+(o[4]-.5)*y0,r=[Math.cos(a),0,Math.sin(a),0,1,0,-Math.sin(a),0,Math.cos(a)],g=[1,0,0,0,Math.cos(c),-Math.sin(c),0,Math.sin(c),Math.cos(c)],q=[Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i),0,0,0,1],v=[1/l,0,-.5/l,0,1/l,-.5/l,0,0,1];for(let j=o[3],u0=0;u0<12;u0++,j*=1.04){let F0=Me([l*j,0,.5,0,l*j,.5,0,0,1],Me(q,Me(g,Me(r,v))));const A0=fe(F0,p,o[5]);F0=Me([1,0,o[6]-A0[0],0,1,o[7]-A0[1],0,0,1],F0);const jt=Oo(F0);let Rt=!0;for(const[mt,Qs]of[[0,0],[1,0],[0,1],[1,1],[.5,0],[.5,1],[0,.5],[1,.5]]){const no=fe(jt,mt,Qs);(no[0]<.004||no[0]>.996||no[1]<.004||no[1]>.996)&&(Rt=!1)}if(I0=F0,vt=jt,Rt)break}const w=fe(I0,p,o[5]),T=fe(I0,p+.01,o[5]),L=fe(I0,p,o[5]+.01);ue=Math.max(Math.hypot(T[0]-w[0],T[1]-w[1]),Math.hypot(L[0]-w[0],L[1]-w[1]))/.01}else{const o=X===3?1.12:bt?1.08:1.22,s=.03;I0=[o,0,.5-.5*o,0,o,s-s*o,0,0,1],vt=Oo(I0),ue=o}const Ls=new Float32Array([I0[0],I0[3],I0[6],I0[1],I0[4],I0[7],I0[2],I0[5],I0[8]]),fo=new Float32Array([vt[0],vt[3],vt[6],vt[1],vt[4],vt[7],vt[2],vt[5],vt[8]]),tt=[[-.52,.56,.64],[.66,.22,.72],[.12,.66,.74]][I];{const o=Math.hypot(...tt);for(let s=0;s<3;s++)tt[s]/=o}const Te=[[2.1,1.54,.96],[1.3,1.36,1.44],[2.7,2.42,2.1]][I],We=[[.16,.13,.11],[.3,.33,.38],[.05,.05,.06]][I],uo=(o,s)=>{const a=o+s,c=Math.abs(Math.cos(a))*lo+Math.abs(Math.sin(a))*Ve;return[.5-Math.sign(s)*(Ve-Ve*Math.cos(s))-lo*Math.sin(s),Ye+c,a]},Ko=C(b(7)^461845907),vo=E===0?[[.62,.63,.66],[.66,.42,.24]]:E===1?[[[.55,.78,.8],[.8,.55,.22],[.42,.66,.36],[.82,.84,.86]][Math.floor(Ko()*4)],[.7,.12,.1]]:E===2?[[[.62,.48,.34],[.5,.12,.1],[.82,.78,.68]][Math.floor(Ko()*3)],[.05,.045,.05]]:[[.95,.68,.3],[.78,.8,.84]];o0===1&&E===1&&(vo[1]=[.12,.2,.62]);const Rs=E===2&&o0!==1;if(o0===3){M.stickBall=0;let o=-1;for(let s=0;s<u;s++)a0[s]>o&&Math.abs(m0[s])<6&&(o=a0[s],M.stickBall=s);H[M.stickBall]=1}if(Rs)for(let o=0;o<u;o++)H[o]=2;if(E===1&&o0!==1)for(let o=0;o<u;o++)o!==M.stickBall&&(H[o]=3);const t=e.gl,et=`
`,jo=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),ho=jo?"#define HE(v) (v)"+et+"#define HD(v) (v)"+et:"#define HE(v) (clamp(((v) + vec4(0.5, 0.0, 0.0, 0.0)) / vec4(4.5, 5.0, 8.0, 1.0), 0.0, 1.0))"+et+"#define HD(v) ((v) * vec4(4.5, 5.0, 8.0, 1.0) - vec4(0.5, 0.0, 0.0, 0.0))"+et,mo="uniform mat3 uVw; vec4 VW(vec2 p){ vec3 h = uVw * vec3(p, 1.0); return vec4(h.xy * 2.0 - h.z, 0.0, h.z); }"+et,ot="#version 300 es"+et+"precision highp float;"+et,ee=ot+"layout(location=0) in vec2 aP; out vec2 vUv; void main(){ vUv = aP * 0.5 + 0.5; gl_Position = vec4(aP, 0.0, 1.0); }",Oe=`
vec3 tone(vec3 x){ x *= 0.92; vec3 y = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14); return pow(clamp(y, 0.0, 1.0), vec3(1.0 / 2.2)); }
float nz(vec2 p){ return texture(uNz, p).g; }
`,Jo=`
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
`,Ms=ot+ho+`in vec2 vUv; out vec4 o;
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
}`,Ts=ot+ho+`in vec2 vUv; out vec4 o;
uniform sampler2D uH; uniform sampler2D uNz; uniform vec4 uBox; uniform vec3 uL; uniform vec3 uLC; uniform vec3 uAmb; uniform vec4 uPool; uniform vec4 uSty; uniform vec2 uTx; uniform int uSt; uniform vec4 uG;
${Oe}
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
}`,Qo=ot+"uniform mat3 uVi;"+et+`in vec2 vUv; out vec4 o;
uniform sampler2D uNz; uniform vec4 uRm; uniform vec3 uLC; uniform vec3 uAmb; uniform int uLt;
${Oe}
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
}`,$o=o=>ot+"#define RM "+o+et+"uniform mat3 uVi;"+et+`in vec2 vUv; out vec4 o;
uniform sampler2D uNz; uniform vec4 uRm; uniform vec3 uLC; uniform vec3 uAmb; uniform int uLt;
${Oe}
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
}`,Fs=ot+`in vec2 vUv; out vec4 o; uniform sampler2D uH; uniform vec2 uTx;
void main(){ vec2 uv = (vUv - 0.5) * 1.5 + 0.5; float s = 0.0;
  for (int j = -2; j <= 2; j++) for (int i = -2; i <= 2; i++) { vec2 t = uv + vec2(float(i), float(j)) * uTx; s += all(greaterThan(t, vec2(0.0))) && all(lessThan(t, vec2(1.0))) ? texture(uH, t).a : 0.0; }
  o = vec4(s / 25.0); }`,Zo=o=>ot+(o?"#define ACR"+et:"")+ho+`in vec2 vUv; out vec4 o;
uniform sampler2D uRoom; uniform sampler2D uA; uniform sampler2D uB; uniform sampler2D uH; uniform sampler2D uCov; uniform sampler2D uNz;
uniform mat3 uVi; uniform vec4 uF[3]; uniform vec4 uBox; uniform vec2 uPC; uniform vec4 uW; uniform vec3 uWc; uniform vec3 uLC; uniform int uLt; uniform float uGl;
${Jo}
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
}`,Es=ot+mo+`layout(location=0) in vec2 aP; layout(location=1) in vec4 aI;
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
}`,zs=ot+`in vec2 vQ; in vec3 vK; out vec4 o; uniform vec4 uSc;
void main(){
  vec2 q = vQ; q.x = max(abs(q.x) - vK.x, 0.0);
  float d = length(q) / vK.y;
  float s = vK.z > 0.5 ? (1.0 - smoothstep(0.4, 1.9, d)) * 0.75 : (1.0 - smoothstep(0.2, 1.75, d)) * 0.8;
  o = vec4(mix(vec3(1.0), uSc.rgb, s * uSc.a), 1.0);
}`,Bs=ot+mo+`layout(location=0) in vec2 aP; layout(location=1) in vec4 aI;
uniform vec4 uF[3]; uniform vec2 uPC; uniform float uR; out vec2 vQ; out float vR;
void main(){
  vec2 b = aI.xy - uPC, w = uF[0].xy + vec2(b.x * uF[0].z - b.y * uF[0].w, b.x * uF[0].w + b.y * uF[0].z) * uF[1].x;
  float r = uR * 1.3 * uF[1].x; vR = r; vQ = aP * (r + 1.5 / 1000.0);
  gl_Position = VW(w + vQ);
}`,Cs=ot+`in vec2 vQ; in float vR; out vec4 o; uniform vec3 uL; uniform vec3 uLC; uniform vec3 uAmb; uniform vec3 uPc; uniform float uPx;
vec3 tone(vec3 x){ x *= 0.92; vec3 y = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14); return pow(clamp(y, 0.0, 1.0), vec3(1.0 / 2.2)); }
void main(){
  float d = length(vQ) / vR; float a = clamp((1.0 - d) * vR / uPx + 0.5, 0.0, 1.0); if (a <= 0.0) discard;
  vec2 q = vQ / vR; float z = sqrt(max(1.0 - dot(q, q) * 0.85, 0.05));
  vec3 N = normalize(vec3(q * 0.9, z)), L = normalize(uL), H = normalize(L + vec3(0.0, 0.0, 1.0));
  vec3 col = uPc * (uLC * max(dot(N, L), 0.0) * 0.9 + uAmb * 1.8) + uLC * pow(max(dot(N, H), 0.0), 30.0) * 1.4 * uPc;
  col *= 0.85 + 0.15 * smoothstep(1.0, 0.75, d);
  o = vec4(tone(col), a);
}`,Ss=ot+mo+`layout(location=0) in vec2 aP; layout(location=1) in vec4 aI; layout(location=2) in vec4 aJ;
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
}`,Is=ot+"uniform mat3 uVi; uniform float uAz; vec2 VSI(vec2 q){ vec3 h = uVi * vec3(q, 1.0); return h.xy / h.z; }"+et+`in vec2 vQ; in vec4 vJ; in vec3 vK; in vec2 vTb; out vec4 o;
uniform vec3 uL; uniform vec3 uLC; uniform vec3 uAmb; uniform vec3 uC0; uniform vec3 uC1; uniform int uKind; uniform sampler2D uA; uniform sampler2D uB; uniform vec4 uF[3]; uniform sampler2D uNz; uniform int uLt; uniform vec4 uBox; uniform float uGl; uniform vec2 uRes;
${Oe}
${Jo}
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
}`,T0=t.__p083||(t.__p083={progs:null,room:[],comp:[],owner:null,bake:new Map}),Po={},xo=(o,s)=>{const a=t.createProgram();for(const[c,i]of[[t.VERTEX_SHADER,o],[t.FRAGMENT_SHADER,s]]){const l=t.createShader(c);t.shaderSource(l,i),t.compileShader(l),t.attachShader(a,l),a["s"+c]=l}return a},po=(o,s)=>{if(!t.getProgramParameter(o,t.LINK_STATUS)){const a=t.getProgramInfoLog(o)+" "+t.getShaderInfoLog(o["s"+t.VERTEX_SHADER])+" "+t.getShaderInfoLog(o["s"+t.FRAGMENT_SHADER]);throw new Error("083 shader "+s+": "+a.split(et).slice(0,6).join(" | "))}};let Ut=T0.progs;if(Ut||(Ut=[[ee,Ms],[ee,Ts],[ee,Tt?$o(it):Qo],[ee,Fs],[ee,Zo(X===2)],[Es,zs],[Bs,Cs],[Ss,Is]].map(([o,s])=>xo(o,s)),Ut.forEach(o=>t.linkProgram(o)),Ut.forEach(po),T0.progs=Ut,T0.room[Tt]=Ut[2],T0.comp[+(X===2)]=Ut[4]),!T0.room[Tt]){const o=xo(ee,Tt?$o(it):Qo);t.linkProgram(o),po(o,2),T0.room[Tt]=o}if(!T0.comp[+(X===2)]){const o=xo(ee,Zo(X===2));t.linkProgram(o),po(o,4),T0.comp[+(X===2)]=o}const[Ht,ht,,bo,,oe,At,c0]=Ut,se=T0.room[Tt],X0=T0.comp[+(X===2)],h=(o,s)=>{const a=o.__u||(o.__u=new Map);let c=a.get(s);return c===void 0&&(c=t.getUniformLocation(o,s),a.set(s,c)),c},ts=e.hash+"|"+f,Fe=T0.bake.get(ts),Xt=128,Ee=Fe?null:new Uint8Array(Xt*Xt*4);if(!Fe){const o=C(b(7)^5369127),s=[];for(let c=0;c<8;c++){const i=new Float32Array(1024);for(let l=0;l<1024;l++)i[l]=o();s.push(i)}const a=(c,i,l,p)=>{const r=Math.floor(i),g=Math.floor(l),q=i-r,v=l-g,w=q*q*(3-2*q),T=v*v*(3-2*v),L=(j,u0)=>c[(j%p+p)%p*32+(u0%p+p)%p];return(L(r,g)*(1-w)+L(r+1,g)*w)*(1-T)+(L(r,g+1)*(1-w)+L(r+1,g+1)*w)*T};for(let c=0;c<Xt;c++)for(let i=0;i<Xt;i++){const l=(c*Xt+i)*4;let p=0,r=0,g=.5,q=0;for(let v=0;v<4;v++){const w=4<<v,T=w/Xt;p+=a(s[v],i*T,c*T,w)*g,r+=a(s[v+4],i*T,c*T,w)*g,q+=g,g*=.5}Ee[l]=o()*255,Ee[l+1]=p/q*255,Ee[l+2]=r/q*255,Ee[l+3]=255}}const ae=(o,s,a,c,i,l,p)=>{const r=t.createTexture();return t.bindTexture(t.TEXTURE_2D,r),t.texImage2D(t.TEXTURE_2D,0,a,o,s,0,t.RGBA,i,l||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,c===t.LINEAR_MIPMAP_LINEAR?t.LINEAR:c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,p||t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,p||t.CLAMP_TO_EDGE),r};t.activeTexture(t.TEXTURE0);const es=Math.min(ue,k0===0?1.1:1.45),yo=Math.min(1200*es/Pt,It*f*1.15*es),Yt=Math.ceil(le*yo),Vt=Math.ceil(Pt*yo),Ke=f,wo=Math.ceil(Yt/3),go=Math.ceil(Vt/3);let ze,ve,Be,Ce,he,Se,Ao,ko,Lo,Ro,Mo;if(Fe)({texNz:ze,texH:ve,texA:Be,texB:Ce,texV:he,texRoom:Se}=Fe);else{ze=ae(Xt,Xt,t.RGBA8,t.LINEAR,t.UNSIGNED_BYTE,Ee,t.REPEAT),ve=jo?ae(Yt,Vt,t.RGBA16F,t.LINEAR,t.HALF_FLOAT):ae(Yt,Vt,t.RGBA8,t.LINEAR,t.UNSIGNED_BYTE),Be=ae(Yt,Vt,t.RGBA8,t.LINEAR,t.UNSIGNED_BYTE),Ce=ae(Yt,Vt,t.RGBA8,t.LINEAR,t.UNSIGNED_BYTE),he=ae(wo,go,t.RGBA8,t.LINEAR_MIPMAP_LINEAR,t.UNSIGNED_BYTE),Se=ae(Ke,Ke,t.RGBA8,t.LINEAR,t.UNSIGNED_BYTE);const o=s=>{const a=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,s,0),a};Ao=o(ve),ko=o(Be),Lo=o(Ce),Ro=o(he),Mo=o(Se),t.bindFramebuffer(t.FRAMEBUFFER,null),T0.bake.set(ts,{texNz:ze,texH:ve,texA:Be,texB:Ce,texV:he,texRoom:Se}),T0.bake.size>2&&T0.bake.delete(T0.bake.keys().next().value)}const os=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,os),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);const je=(o,s,a)=>{const c=t.createVertexArray();if(t.bindVertexArray(c),t.bindBuffer(t.ARRAY_BUFFER,os),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,0),o){t.bindBuffer(t.ARRAY_BUFFER,o);for(let i=0;i<s;i++)t.enableVertexAttribArray(1+i),t.vertexAttribPointer(1+i,4,t.FLOAT,!1,a,i*16),t.vertexAttribDivisor(1+i,1)}return t.bindVertexArray(null),c},ss=t.createBuffer(),as=t.createBuffer(),ns=t.createBuffer(),cs=je(null),is=je(ss,1,16),qs=je(as,2,32),_s=je(ns,1,16),Ie=new Float32Array(d*4),kt=new Float32Array(u*8),qe=new Float32Array(u*4);let me=0;const rs=()=>{me=0;for(let o=0;o<d;o++)if(z[o]){const s=me*4;Ie[s]=x[o],Ie[s+1]=U[o],Ie[s+2]=0,Ie[s+3]=0,me++}t.bindBuffer(t.ARRAY_BUFFER,ss),t.bufferData(t.ARRAY_BUFFER,Ie.subarray(0,me*4),t.STATIC_DRAW)},ls=()=>{t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.DEPTH_TEST),t.depthMask(!1),t.colorMask(!0,!0,!0,!0),t.disable(t.BLEND)},To=new Float32Array(80);w0.forEach((o,s)=>{s<40&&(To[s*2]=o[0],To[s*2+1]=o[1])});const Je=e0===1?[G0,5.4*A/2,5.4,Math.floor((G0-L0+2)/(5.4*A/2))+1]:[G0,Ft,l0,i0],Qe=X===3?0:X,fs=[[.34,.72],[.5,.6],[.5,.52]][I],Ns=[.82,2,.5][I]/It,Gs=[.66,.15,.75][I],Ds=(o,s,a)=>{const[c,i]=uo(a,0),l=(o-c)/It,p=(s-i)/It,r=Math.cos(a),g=Math.sin(a);return[l*r+p*g,-l*g+p*r+te]};function Us(){ls(),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,ze),t.bindVertexArray(cs),t.bindFramebuffer(t.FRAMEBUFFER,Ao),t.viewport(0,0,Yt,Vt),t.useProgram(Ht),t.uniform4f(h(Ht,"uBox"),St,Re,le,Pt),t.uniform2fv(h(Ht,"uHalf"),To),t.uniform1i(h(Ht,"uNH"),Math.min(40,w0.length)),t.uniform4f(h(Ht,"uG"),F,O0,zt,H0),t.uniform4f(h(Ht,"uG2"),l0,$t,i0,Et),t.uniform4f(h(Ht,"uPin"),Je[0],Je[1],Je[2],Je[3]),t.uniform4f(h(Ht,"uG3"),bt?1:0,Le,1/yo,Qe===0&&!bt?1:0),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.useProgram(ht),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,ve),t.uniform1i(h(ht,"uH"),1),t.uniform1i(h(ht,"uNz"),0),t.uniform4f(h(ht,"uBox"),St,Re,le,Pt),t.uniform2f(h(ht,"uTx"),1/Yt,1/Vt),t.uniform3fv(h(ht,"uLC"),Te),t.uniform3fv(h(ht,"uAmb"),We),t.uniform4f(h(ht,"uSty"),Qe,Math.floor(y()*3),bt?1:0,0),t.uniform1i(h(ht,"uSt"),f>600?16:12),t.uniform4f(h(ht,"uG"),F,Zt,zt,l0);for(const[o,s]of[[ko,0],[Lo,k]]){t.bindFramebuffer(t.FRAMEBUFFER,o),t.viewport(0,0,Yt,Vt);const a=Math.cos(s),c=Math.sin(s);t.uniform3f(h(ht,"uL"),tt[0]*a+tt[1]*c,-tt[0]*c+tt[1]*a,tt[2]);const i=Ds(fs[0],fs[1],s);t.uniform4f(h(ht,"uPool"),i[0],i[1],Ns,Gs),t.drawArrays(t.TRIANGLE_STRIP,0,4)}t.bindFramebuffer(t.FRAMEBUFFER,Ro),t.viewport(0,0,wo,go),t.useProgram(bo),t.uniform1i(h(bo,"uH"),1),t.uniform2f(h(bo,"uTx"),1.4/wo,1.4/go),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,he),t.generateMipmap(t.TEXTURE_2D),t.bindFramebuffer(t.FRAMEBUFFER,Mo),t.viewport(0,0,Ke,Ke),t.useProgram(se),t.uniformMatrix3fv(h(se,"uVi"),!1,fo),t.uniform1i(h(se,"uNz"),0),t.uniform4f(h(se,"uRm"),Ye,ks,X===3?1:0,Tt?it*256+De:0),t.uniform3fv(h(se,"uLC"),Te),t.uniform3fv(h(se,"uAmb"),We),t.uniform1i(h(se,"uLt"),I),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.bindFramebuffer(t.FRAMEBUFFER,null);for(const o of[Ao,ko,Lo,Ro,Mo])t.deleteFramebuffer(o)}function Hs(){T0.owner=Po;const o=[-tt[0]/tt[2],-tt[1]/tt[2]];t.useProgram(X0),t.uniform1i(h(X0,"uRoom"),3),t.uniform1i(h(X0,"uA"),4),t.uniform1i(h(X0,"uB"),5),t.uniform1i(h(X0,"uH"),1),t.uniform1i(h(X0,"uCov"),2),t.uniform4f(h(X0,"uBox"),St,Re,le,Pt),t.uniform2f(h(X0,"uPC"),0,te),t.uniform3fv(h(X0,"uWc"),I===1?[.62,.5,.34]:[.36,.24,.13]),t.useProgram(oe),t.uniform2f(h(oe,"uPC"),0,te),t.uniform4f(h(oe,"uSh"),o[0],o[1],Et,1);const s=[[.42,.3,.22,.85],[.5,.48,.5,.6],[.3,.26,.24,.9]][I];t.uniform4fv(h(oe,"uSc"),s),t.useProgram(At),t.uniform2f(h(At,"uPC"),0,te),t.uniform1f(h(At,"uR"),Et),t.uniform3fv(h(At,"uL"),tt),t.uniform3fv(h(At,"uLC"),Te),t.uniform3fv(h(At,"uAmb"),We),t.uniform3fv(h(At,"uPc"),Qe===2?[.6,.62,.66]:[.75,.52,.22]),t.uniform1f(h(At,"uPx"),1/(f*ue)),t.useProgram(c0),t.uniform2f(h(c0,"uPC"),0,te),t.uniform4f(h(c0,"uBox"),St,Re,le,Pt),t.uniform1i(h(c0,"uA"),4),t.uniform1i(h(c0,"uB"),5),t.uniform1i(h(c0,"uNz"),0),t.uniform3fv(h(c0,"uL"),tt),t.uniform3fv(h(c0,"uLC"),Te),t.uniform3fv(h(c0,"uAmb"),We),t.uniform1i(h(c0,"uKind"),E),t.uniform1i(h(c0,"uLt"),I),t.uniform3fv(h(c0,"uC0"),vo[0]),t.uniform3fv(h(c0,"uC1"),vo[1]),t.uniform1f(h(c0,"uPx"),1/(f*ue));for(const a of[X0,c0])t.useProgram(a),t.uniform1i(h(a,"uNz"),0),t.uniform3fv(h(a,"uLC"),Te),t.uniform1i(h(a,"uLt"),I),t.uniform1f(h(a,"uGl"),Qe===2?1.3:1);t.useProgram(c0),t.uniform2f(h(c0,"uRes"),f,f),t.uniformMatrix3fv(h(c0,"uVi"),!1,fo),t.uniform1f(h(c0,"uAz"),ue);for(const a of[oe,At,c0])t.useProgram(a),t.uniformMatrix3fv(h(a,"uVw"),!1,Ls);t.useProgram(X0),t.uniformMatrix3fv(h(X0,"uVi"),!1,fo)}Fe||Us(),rs();const q0=new Float32Array(12);let us=0,vs=0,Fo=0;const Eo=[[.05,-.055,.6],[-.07,-.02,.5],[-.012,-.06,.75]][I];let st=0,zo=0,$e=0,Wt=-1,Y0=0,Bo=0;const Xs=1.5;function hs(o){T0.owner!==Po&&Hs();const[s,a,c]=uo(st,Y0),i=Math.cos(c),l=Math.sin(c),p=.5-.5*Math.cos(st),r=Math.max(0,1-Math.abs(Math.sin(st))*6);if(q0[0]=s+Bo*Math.sin(o*90),q0[1]=a,q0[2]=i,q0[3]=l,q0[4]=It,q0[5]=p,q0[6]=r,q0[7]=o,q0[8]=Eo[0],q0[9]=Eo[1],q0[10]=Eo[2],q0[11]=Ye+.034,Math.abs(Y0)>.004&&Math.abs(Math.sin(st))<.02){const v=Y0>0?1:-1,w=v*Ve,T=-lo,L=Math.cos(Y0),j=Math.sin(Y0);us=s+w*L-T*j,vs=a+w*j+T*L,Fo=Math.abs(Math.tan(Y0))}else Fo=0;const g=1/150,q=M.stick;for(let v=0;v<u;v++){const w=v*8;kt[w]=m0[v]+(v===q?.07*Math.sin(o*5.3+2*Math.sin(o*1.7))*(.6+.4*Math.sin(o*.43)):0),kt[w+1]=a0[v],n0[v]*n0[v]+R0[v]*R0[v]>900&&!V[v]?(kt[w+2]=n0[v]*g*.5,kt[w+3]=R0[v]*g*.5):(kt[w+2]=0,kt[w+3]=0),kt[w+4]=D0[v],kt[w+5]=Z[v],kt[w+6]=H[v],kt[w+7]=0;const L=v*4;qe[L]=m0[v],qe[L+1]=a0[v],qe[L+2]=1,qe[L+3]=0}ls(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,f,f),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,ze),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,ve),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,he),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,Se),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,Be),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,Ce),t.useProgram(X0),t.uniform4fv(h(X0,"uF"),q0),t.uniform4f(h(X0,"uW"),us,vs,Fo,Y0>0?-1:1),t.bindVertexArray(cs),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.bindBuffer(t.ARRAY_BUFFER,ns),t.bufferData(t.ARRAY_BUFFER,qe,t.STREAM_DRAW),t.bindBuffer(t.ARRAY_BUFFER,as),t.bufferData(t.ARRAY_BUFFER,kt,t.STREAM_DRAW),t.enable(t.BLEND),t.blendFunc(t.DST_COLOR,t.ZERO),t.useProgram(oe),t.uniform4fv(h(oe,"uF"),q0),t.bindVertexArray(is),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,me),t.bindVertexArray(_s),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,u),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.useProgram(At),t.uniform4fv(h(At,"uF"),q0),t.bindVertexArray(is),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,me),t.useProgram(c0),t.uniform4fv(h(c0,"uF"),q0),t.bindVertexArray(qs),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,u),t.disable(t.BLEND),t.bindVertexArray(null)}const Ze=22050,de=64,Ot=new Float32Array(de*2),Pe=new Float32Array(de),_0=new Float32Array(de*4),to=new Int32Array(de),eo=new Float32Array(de);let Lt=0;const _e=new Float32Array(4096);let Co=0,So=0;const oo=[{pin:[3200,5e3,.005],ov:2.76,bb:[2800,5200,.0025],bin:[1500,2600,.003]},{pin:[4200,6800,.008],ov:2.4,bb:[5200,7800,.006],bin:[2600,4200,.004]},{pin:[1100,1900,.0025],ov:2.1,bb:[700,1300,.002],bin:[450,800,.003]},{pin:[4600,6400,.07],ov:2.7,bb:[5e3,7200,.05],bin:[3800,5200,.03]}][E];function ms(o,s,a,c,i){if(Lt>=de||c<.004)return;const l=o*m/Ze,p=Math.exp(-1/(a*Ze)),r=Math.min(3,l*s),g=Math.pow(p,1.6);Ot[Lt*2]=2*p*Math.cos(l),Ot[Lt*2+1]=2*g*Math.cos(r),Pe[Lt]=p*p,eo[Lt]=g*g;const q=Lt*4;_0[q]=c*Math.sin(l),_0[q+1]=0,_0[q+2]=c*.4*Math.sin(r),_0[q+3]=0,to[Lt]=i,Lt++}function Ys(o){const s=Math.min(4096,Math.round(o*Ze));if(s<=0||!e.sound.on){M.nev=0;return}const a=M.nev,c=Math.min(a,40),i=a>40?Math.sqrt(40/a):1;for(let r=0;r<c;r++){const g=a>40?Math.floor(M0()*a):r,q=g*4,v=W[q],w=W[q+2],T=W[q+3],L=Math.min(1,T/100)*.42*i,j=Math.floor(M0()*s),u0=M0(),F0=M.upy>0?w<zt+1:w>Bt,A0=v===0?oo.pin:v===1?null:F0?oo.bin:oo.bb;A0?ms(A0[0]+(A0[1]-A0[0])*u0,oo.ov,A0[2],L*(v===0?1:F0?.6:.75),j):ms(650+450*u0,2.3,.006,L*.7,j)}M.nev=0,_e.fill(0,0,s);for(let r=0;r<Lt;r++){const g=r*4,q=Ot[r*2],v=Pe[r],w=Ot[r*2+1],T=eo[r];let L=_0[g],j=_0[g+1],u0=_0[g+2],F0=_0[g+3];for(let A0=to[r];A0<s;A0++){const jt=q*L-v*j,Rt=w*u0-T*F0;_e[A0]+=jt+Rt,j=L,L=jt,F0=u0,u0=Rt}_0[g]=L,_0[g+1]=j,_0[g+2]=u0,_0[g+3]=F0,to[r]=0}let l=0;for(let r=0;r<Lt;r++)if(Math.abs(_0[r*4])+Math.abs(_0[r*4+1])>8e-4){if(l!==r){Ot[l*2]=Ot[r*2],Ot[l*2+1]=Ot[r*2+1],Pe[l]=Pe[r],eo[l]=eo[r];for(let g=0;g<4;g++)_0[l*4+g]=_0[r*4+g]}to[l]=0,l++}Lt=l;let p=0;for(let r=0;r<u;r+=4)!V[r]&&n0[r]*n0[r]+R0[r]*R0[r]>100&&p++;Co+=(Math.min(1,p/(u/4)*1.6)*(Wt>=0?.09:.035)-Co)*.25;for(let r=0;r<s;r++)So=So*.93+(M0()-.5)*Co,_e[r]=Math.tanh(_e[r]*.9+So*1.4);e.sound.pcm(_e.subarray(0,s),Ze,{vel:.9})}let xe=-1,Io=0,qo=0,Kt=0,ds=0,_o=1,No=1,so=-1,ao=-1,$s=0;const xs=[0,.12,0,-.1,.05,0];let Go=0,Do=0,ps=0,pe=0,bs=0,ne=-1;function Uo(o,s,a){Wt>=0||(ne=-1,zo=st,$e=Math.round((st+o*k)/k)*k,Wt=s,ao=-1,pe=0,Go=Y0,Do=Math.cos($e)>0&&a||0)}function Vs(o,s){const[a,c,i]=uo(st,Y0),[l,p]=fe(vt,o,1-s),r=(l-a)/It,g=(p-c)/It,q=Math.cos(i),v=Math.sin(i);return[r*q+g*v,-r*v+g*q+te]}function Ws(o,s,a){const[c,i]=Vs(o,s);let l=-1,p=e0===1?2.8:4;for(let r=0;r<d;r++){const g=Math.hypot(x[r]-c,U[r]-i);g<p&&(p=g,l=r)}if(l>=0){z[l]=z[l]?0:1,rs();for(let r=0;r<u;r++)V[r]&&Math.hypot(m0[r]-c,a0[r]-i)<4&&U0(r);M.stick>=0&&Math.hypot(m0[M.stick]-c,a0[M.stick]-i)<4&&(M.stick=-1),e.sound.on&&e.sound.note(z[l]?88:76,{dur:.08,vel:.25,wave:"triangle",cutoff:3e3})}else c>-F-H0&&c<F+H0&&i>-H0&&i<O0+H0&&(K0(c,i,90,42),Bo=.0025,e.sound.on&&e.sound.hit("kick",.35))}function Os(o){const s=e.input;if(s.taps(),s.inside&&s.down){xe<0&&(xe=o,Io=s.x,qo=s.y,Kt=0,ds=Y0);const a=s.x-Io,c=s.y-qo;!Kt&&Math.hypot(a,c)>.035&&(Kt=Math.abs(c)>Math.abs(a)?2:1),Kt===1&&Wt<0&&Math.cos(st)>.99&&(Y0=Math.max(-.14,Math.min(.14,ds-a*.6))),Kt===2&&Math.abs(c)>.1&&(Uo(c<0?1:-1,o),Kt=3),!Kt&&o-xe>.3&&(No=.06),so=o}else xe>=0&&(!Kt&&o-xe<=.3&&Ws(Io,qo,o),xe=-1,No=1,so=o)}function Ks(o){if(Wt>=0)return;const s=Math.cos(st)<0;let a=0;for(let l=0;l<u;l+=3)!V[l]&&n0[l]*n0[l]+R0[l]*R0[l]>900&&a++;const c=Math.min(.12,Math.max(0,o-bs));if(bs=o,a<=1+u/450&&M.simT-M.lastPass>1||o-ps>30?pe+=c:pe=Math.max(0,pe-c*3),pe<=0)return;ao=o-pe;const i=o-so;ne<0&&(ne=s?1.2+2.5*M0():7+16*M0()*M0()+4*M0()),s&&o-ao>ne?(ne=-1,Uo(1,o,so<0?xs[Math.floor(M0()*xs.length)]:0)):!s&&o-ao>ne&&i>10&&(ne=-1,Uo(M0()<.5?1:-1,o))}let Ho=0;function js(o){if(Wt>=0){const a=Math.min(1,(o-Wt)/Xs),c=a*a*(3-2*a);st=zo+($e-zo)*c,Y0=Go+(Do-Go)*c,a>=1&&(st=$e,Y0=Do,Wt=-1,ps=o,e.sound.on&&e.sound.hit("kick",.5))}const s=st+Y0;Math.abs(s-Ho)>1e-5&&(j0(s),ke(),M.stick>=0&&Math.abs(s-Ho)>.002&&(M.stick=-1),Ho=s)}for(let o=0;o<150;o++)r0();M.nev=0;let Ne=0;hs(0);const Js={ox:K,oy:Ct,sc:P0,N:u,px:m0,py:a0,vx:n0,vy:R0,asleep:V,step:r0,setGravity:j0,HB:zt,YN:Zt,YNT:Bt,YR:O0,XW:F,WB:lt,NR:i0,SP:l0,divX:re,pinX:Gt,pinY:n,pinOn:z,segs:yt,EV:W,get nev(){return M.nev},set nev(o){M.nev=o},get neckPass(){return M.neckPass},get lastPass(){return M.lastPass},get simT(){return M.simT},get thF(){return st},get thT(){return Y0},get stick(){return M.stick},get nKnock(){return M.nKnock}};return e.__dbg&&e.__dbg(Js),(o,s)=>{s=Math.max(0,Math.min(.12,s||0)),Os(o),_o+=(No-_o)*Math.min(1,s*6),js(o),Ks(o),Bo*=Math.pow(.002,s),Ne+=s*_o;let a=0;for(;Ne>=x0&&a<13;)r0(),Ne-=x0,a++;if(M.stick>=0&&M.simT-M.stickAt>M.stickHold){const c=M.stick;M.stick=-1,U0(c),n0[c]=M0()<.5?-4:4}Ne>x0&&(Ne=x0),Ys(s),hs(o)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
