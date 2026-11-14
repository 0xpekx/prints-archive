// Spinning Tops: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/079.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ce){Ce&&function(){"use strict";const se=new WeakMap,t0=Math.PI*2,T0=(o,e,i)=>o<e?e:o>i?i:o,Wo=(o,e,i)=>o+(e-o)*i;function R0(o,e){const i=o.replace(/^0x/,"").padEnd(64,"0");let c=parseInt(i.slice(0,8),16)^e,n=parseInt(i.slice(8,16),16)^Math.imul(e,7919),d=parseInt(i.slice(16,24),16)^parseInt(i.slice(48,56),16),u=parseInt(i.slice(24,32),16)^parseInt(i.slice(32,40),16)^parseInt(i.slice(56,64),16);const m=()=>{c>>>=0,n>>>=0,d>>>=0,u>>>=0;let v=c+n|0;return c=n^n>>>9,n=d+(d<<3)|0,d=d<<21|d>>>11,u=u+1|0,v=v+u|0,d=d+v|0,(v>>>0)/4294967296};for(let v=0;v<20;v++)m();return m}const L0=(o,e)=>{let i=0;for(const n of e)i+=n[1];let c=o()*i;for(const n of e)if(c-=n[1],c<0)return n[0];return e[e.length-1][0]},E0={mul(o,e){const i=new Float32Array(16);for(let c=0;c<4;c++)for(let n=0;n<4;n++){let d=0;for(let u=0;u<4;u++)d+=o[u*4+n]*e[c*4+u];i[c*4+n]=d}return i},persp(o,e,i){const c=1/Math.tan(o/2),n=new Float32Array(16);return n[0]=c,n[5]=c,n[10]=(i+e)/(e-i),n[11]=-1,n[14]=2*i*e/(e-i),n},ortho(o,e,i,c,n,d){const u=new Float32Array(16);return u[0]=2/(e-o),u[5]=2/(c-i),u[10]=-2/(d-n),u[12]=-(e+o)/(e-o),u[13]=-(c+i)/(c-i),u[14]=-(d+n)/(d-n),u[15]=1,u},look(o,e,i){let c=o[0]-e[0],n=o[1]-e[1],d=o[2]-e[2],u=Math.hypot(c,n,d);c/=u,n/=u,d/=u;let m=i[1]*d-i[2]*n,v=i[2]*c-i[0]*d,b=i[0]*n-i[1]*c;u=Math.hypot(m,v,b),m/=u,v/=u,b/=u;const w=n*b-d*v,x=d*m-c*b,f=c*v-n*m;return new Float32Array([m,w,c,0,v,x,n,0,b,f,d,0,-(m*o[0]+v*o[1]+b*o[2]),-(w*o[0]+x*o[1]+f*o[2]),-(c*o[0]+n*o[1]+d*o[2]),1])},inv(o){const e=new Float32Array(16),i=o[0]*o[5]-o[1]*o[4],c=o[0]*o[6]-o[2]*o[4],n=o[0]*o[7]-o[3]*o[4],d=o[1]*o[6]-o[2]*o[5],u=o[1]*o[7]-o[3]*o[5],m=o[2]*o[7]-o[3]*o[6],v=o[8]*o[13]-o[9]*o[12],b=o[8]*o[14]-o[10]*o[12],w=o[8]*o[15]-o[11]*o[12],x=o[9]*o[14]-o[10]*o[13],f=o[9]*o[15]-o[11]*o[13],g=o[10]*o[15]-o[11]*o[14],p=1/(i*g-c*f+n*x+d*w-u*b+m*v);return e[0]=(o[5]*g-o[6]*f+o[7]*x)*p,e[1]=(o[2]*f-o[1]*g-o[3]*x)*p,e[2]=(o[13]*m-o[14]*u+o[15]*d)*p,e[3]=(o[10]*u-o[9]*m-o[11]*d)*p,e[4]=(o[6]*w-o[4]*g-o[7]*b)*p,e[5]=(o[0]*g-o[2]*w+o[3]*b)*p,e[6]=(o[14]*n-o[12]*m-o[15]*c)*p,e[7]=(o[8]*m-o[10]*n+o[11]*c)*p,e[8]=(o[4]*f-o[5]*w+o[7]*v)*p,e[9]=(o[1]*w-o[0]*f-o[3]*v)*p,e[10]=(o[12]*u-o[13]*n+o[15]*i)*p,e[11]=(o[9]*n-o[8]*u-o[11]*i)*p,e[12]=(o[5]*b-o[4]*x-o[6]*v)*p,e[13]=(o[0]*x-o[1]*b+o[2]*v)*p,e[14]=(o[13]*c-o[12]*d-o[14]*i)*p,e[15]=(o[8]*d-o[9]*c+o[10]*i)*p,e}},me=(o,e,i)=>{const c=E0.look(o,e,[0,1,0]),n=E0.persp(i*Math.PI/180,.03,6),d=E0.mul(n,c),u=E0.inv(d);return{EYE:o,VP:d,project:(b,w,x)=>{const f=d,g=f[0]*b+f[4]*w+f[8]*x+f[12],p=f[1]*b+f[5]*w+f[9]*x+f[13],E=f[3]*b+f[7]*w+f[11]*x+f[15];return[.5+.5*g/E,.5-.5*p/E,E]},floorAt:(b,w,x)=>{const f=b*2-1,g=1-w*2,p=u,E=(D,M,k)=>{const U=p[3]*D+p[7]*M+p[11]*k+p[15];return[(p[0]*D+p[4]*M+p[8]*k+p[12])/U,(p[1]*D+p[5]*M+p[9]*k+p[13])/U,(p[2]*D+p[6]*M+p[10]*k+p[14])/U]},F=E(f,g,-1),_=E(f,g,1),q=(F[1]-(x||0))/(F[1]-_[1]);return q>0?[F[0]+(_[0]-F[0])*q,F[2]+(_[2]-F[2])*q]:[F[0]+(_[0]-F[0])*.99,-2]}}},so=[me([0,.1,.55],[0,.045,0],28),me([0,.6,.34],[0,0,-.035],25),me([.012,.052,.66],[0,.034,-.12],19)],D0=0,n0=1,f0=2,V0=3,s0=4,h0=5,io=(o,e,i,c,n,d)=>{const u=[];for(let m=0;m<=d;m++){const v=c+(n-c)*m/d;u.push([e+Math.sin(v)*i,o+Math.cos(v)*i])}return u},De=(o,e)=>{const i=[[0,0],[0,o*.35],[0,o*.7]];for(const c of io(o,e,e,-Math.PI/2,Math.PI/2,12))i.push(c);return i.push([2*e,o*.7],[2*e,o*.35],[2*e,0]),i},co=()=>{const e=[[0,0]];for(let i=1;i<=26;i++){const c=.037000000000000005*i/26;e.push([c,Math.sqrt(Math.max(0,.02*.02-(c-.02)**2))])}return e.push([.037,.0068],[.0372,.0042],[.038,.0036],[.0436,.0035],[.045,.003],[.0457,.002],[.046,0]),e},j=[];j[D0]={prof:[[0,0],[6e-4,9e-4],[.0015,.0016],[.003,.0021],[.0036,.0036],[.006,.0052],[.01,.009],[.014,.0128],[.018,.0166],[.022,.0204],[.025,.023],[.028,.0253],[.031,.0269],[.033,.0277],[.035,.0281],[.037,.028],[.0385,.0274],[.04,.0262],[.042,.0238],[.0438,.0205],[.0452,.0165],[.0462,.012],[.0468,.0075],[.0472,.0052],[.0478,.0044],[.05,.0042],[.06,.004],[.065,.0039],[.0668,.0034],[.0676,.0022],[.068,0]],rho:700,prims:[.002,0,.002,.01,.009,0,.025,.023,0,.0355,.0271,.001,.042,.0238,0,.0465,.01,0,.0655,0,.0025],mu:.3,e:.35,rp:1e-4,crr:.002,air:.003,R:.028,Hc:.034,mat:"wood"},j[n0]={prof:[[0,0],[5e-4,7e-4],[.0012,.0011],[.0024,.0021],[.0035,.0045],[.0055,.009],[.0075,.014],[.009,.018],[.01,.02],[.0107,.021],[.0112,.0213],[.014,.0213],[.0146,.0208],[.0158,.0192],[.0175,.0165],[.0195,.0125],[.0212,.008],[.0222,.0048],[.023,.0034],[.0255,.0032],[.0262,.0037],[.0336,.0037],[.0342,.0033],[.0355,.0029],[.0363,.0018],[.0366,0]],rho:8500,prims:[.0012,0,.0012,.0055,.009,0,.0126,.0208,5e-4,.0175,.0165,0,.0212,.008,0,.0339,0,.0028],mu:.22,e:.45,rp:2e-4,crr:.001,air:.003,R:.021,Hc:.012,mat:"metal"},j[f0]={prof:De(.03,.005),rho:2300,prims:[.005,.03,.005],mu:.4,e:.3,rp:3e-4,crr:5e-5,air:.002,R:.035,Hc:.005,mat:"ceramic"},j[V0]={prof:[[0,0],[.001,.0012],[.003,.003],[.007,.0075],[.012,.0135],[.017,.019],[.021,.0228],[.025,.025],[.028,.0255],[.031,.0248],[.034,.0225],[.037,.018],[.039,.012],[.0405,.0065],[.041,.0042],[.043,.0038],[.056,.0036],[.0585,.003],[.0598,.0018],[.06,0]],rho:2500,prims:[.0015,0,.0015,.012,.0135,0,.0265,.025,5e-4,.035,.021,0,.0585,0,.0025],mu:.25,e:.4,rp:1e-4,crr:.002,air:.003,R:.0255,Hc:.027,mat:"glass"},j[s0]={prof:co(),rho:700,prims:[.02,0,.02,.037,.0105,5e-4,.0425,0,.0035],mu:.3,e:.3,rp:5e-5,crr:.001,air:.004,R:.02,Hc:.02,mat:"wood",tippe:!0},j[h0]={prof:De(.031,.0065),rho:7800,prims:[.0065,.031,.0065],mu:.4,e:.3,rp:5e-5,crr:2e-5,air:.001,R:.0375,Hc:.0065,mat:"metal"};for(const o of j){let e=0,i=0,c=0,n=0;const d=o.prof,u=16,m=w=>{for(let x=0;x<d.length-1;x++){const[f,g]=d[x],[p,E]=d[x+1];if(!(p<=f))for(let F=0;F<u;F++){const _=(F+.5)/u,q=f+(p-f)*_,D=g+(E-g)*_,M=(p-f)/u;w(q,D,M)}}};m((w,x,f)=>{const g=Math.PI*x*x*f;e+=g,i+=g*w,c+=Math.PI*x**4/2*f,n+=Math.PI*x**4/4*f});const v=i/e;let b=0;if(m((w,x,f)=>{b+=Math.PI*x*x*f*(w-v)**2}),o.m=e*o.rho,o.C=c*o.rho,o.A=(n+b)*o.rho,o.hcm=v,o.H=d[d.length-1][0],o.tippe&&(o.m=.018,o.hcm=.02*.7,o.C=.5*o.m*.02*.02,o.A=o.C/.95),o.prof[1][0]===0){const w=o.prims[1],x=o.prims[2],f=w+x,g=2*x;o.m=Math.PI*f*f*g*o.rho*.93,o.C=.5*o.m*f*f*.95,o.A=o.m*(3*f*f+g*g)/12*.95,o.hcm=x,o.H=g}}const A0=9.81,P0=1/1e3,X0=12,a0=new Float64Array(X0*3),xe=new Float64Array(X0),u0=new Float64Array(X0),Q0=new Float64Array(X0),J0=new Uint8Array(X0);function lo(o,e,i,c){const n=j[o],d=e*e,u=d*d*e,m={kind:o,s:e,m:n.m*d*e,C:n.C*u,A:n.A*u,hcm:n.hcm*e,H:n.H*e,R:n.R*e,Hc:n.Hc*e,mu:n.mu*i.mu,e:n.e,rp:n.rp*e*i.rp,crr:n.crr*e,air:n.air,vsT:.3,vsR:.003,prims:[]};for(let v=0;v<n.prims.length;v+=3)m.prims.push((n.prims[v]-n.hcm)*e,n.prims[v+1]*e,n.prims[v+2]*e);return c&&Object.assign(m,c),m}function i0(o){const e=o.b,i=o.ax*o.Lx+o.ay*o.Ly+o.az*o.Lz,c=(1/e.C-1/e.A)*i;o.wx=o.Lx/e.A+c*o.ax,o.wy=o.Ly/e.A+c*o.ay,o.wz=o.Lz/e.A+c*o.az}function Ie(o){const e=o.qw,i=o.qx,c=o.qy,n=o.qz;o.ax=2*(i*c-e*n),o.ay=1-2*(i*i+n*n),o.az=2*(c*n+e*i)}function ve(o,e,i,c,n){const d=n*.5,u=Math.sin(d),m=Math.cos(d),v=e*u,b=i*u,w=c*u,x=o.qw,f=o.qx,g=o.qy,p=o.qz;o.qw=m*x-v*f-b*g-w*p,o.qx=m*f+v*x+b*p-w*g,o.qy=m*g-v*p+b*x+w*f,o.qz=m*p+v*g-b*f+w*x;const E=1/Math.sqrt(o.qw*o.qw+o.qx*o.qx+o.qy*o.qy+o.qz*o.qz);o.qw*=E,o.qx*=E,o.qy*=E,o.qz*=E}function fo(o,e,i){const c=o.b;Ie(o),i0(o),o.vy-=A0*e;let n=0;const d=o.ax,u=o.ay,m=o.az;for(let E=0;E<c.prims.length;E+=3){const F=c.prims[E],_=c.prims[E+1],q=c.prims[E+2],D=d*F,M=o.y+u*F,k=m*F;if(_===0){const U=q-M;U>-.002&&n<X0&&(a0[n*3]=D,a0[n*3+1]=M-q-o.y,a0[n*3+2]=k,xe[n]=U,J0[n]=0,n++)}else{const U=d*u,C=u*u-1,A=m*u,O=Math.sqrt(U*U+C*C+A*A);let J=1,Z=0,G=0;O>1e-6?(J=U/O,Z=C/O,G=A/O):Math.abs(d)>.9&&(J=0,G=1);const d0=O<.35?3:1,p0=u*G-m*Z,v0=m*J-d*G,c0=d*Z-u*J;for(let P=0;P<d0;P++){const H=P===0?1:-.5,W=P===0?0:P===1?.8660254:-.8660254,r0=D+_*(H*J+W*p0),z0=M+_*(H*Z+W*v0)-q,$=k+_*(H*G+W*c0),K=-z0;K>-.002&&n<X0&&(a0[n*3]=r0,a0[n*3+1]=z0-o.y,a0[n*3+2]=$,xe[n]=K,J0[n]=1,n++)}}}let v=0,b=0,w=0,x=0;if(n){const E=1/c.A,F=1/c.C-1/c.A,_=1/c.m;for(let M=0;M<n;M++)u0[M]=0,Q0[M]=o.vy+(o.wz*a0[M*3]-o.wx*a0[M*3+2]);const q=n>1?8:3;for(let M=0;M<q;M++)for(let k=0;k<n;k++){const U=a0[k*3],C=a0[k*3+2],A=o.vy+(o.wz*U-o.wx*C),O=-C,J=U,Z=d*O+m*J,G=O*E+F*Z*d,d0=J*E+F*Z*m,p0=_+(d0*U-G*C),v0=xe[k];let c0=v0>0?Math.min(.3,.25*Math.max(0,v0-2e-4)/e):v0/e;Q0[k]<-.12&&(c0=Math.max(c0,-c.e*Q0[k]));let P=(c0-A)/p0;const H=Math.max(0,u0[k]+P);P=H-u0[k],u0[k]=H,P!==0&&(o.vy+=P*_,o.Lx+=O*P,o.Lz+=J*P,i0(o))}for(let M=0;M<(n>1?2:1);M++)for(let k=0;k<n;k++){if(u0[k]<=0)continue;const U=a0[k*3],C=a0[k*3+1],A=a0[k*3+2],O=o.vx+(o.wy*A-o.wz*C),J=o.vz+(o.wx*C-o.wy*U),Z=Math.sqrt(O*O+J*J);if(Z<1e-9)continue;const G=O/Z,d0=J/Z,p0=C*d0,v0=A*G-U*d0,c0=-C*G,P=d*p0+u*v0+m*c0,H=p0*E+F*P*d,W=v0*E+F*P*u,r0=c0*E+F*P*m,z0=_+((W*A-r0*C)*G+(H*C-W*U)*d0),$=J0[k]?c.vsR:c.vsT;let K=c.mu*u0[k]*Math.min(1,Z/$)/(M?2:1);K=Math.min(K,Z/z0);const b0=-K*G,m0=-K*d0;o.vx+=b0*_,o.vz+=m0*_,o.Lx+=C*m0,o.Ly+=A*b0-U*m0,o.Lz+=-C*b0,i0(o)}let D=0;for(let M=0;M<n;M++)v+=u0[M],J0[M]&&(D+=u0[M]),b+=u0[M]*a0[M*3],w+=u0[M]*a0[M*3+2],x+=u0[M],Q0[M]<-.06&&u0[M]>0&&i&&i(1,o,-Q0[M]);if(v>0){const M=1/(E+F*u*u),k=c.rp*c.mu*v,U=-o.wy*M;o.Ly+=Math.max(-k,Math.min(k,U));const C=c.crr*D,A=Math.sqrt(o.wx*o.wx+o.wz*o.wz);if(C>0&&A>1e-6){const O=Math.min(C,A*c.A*.5);o.Lx-=o.wx/A*O,o.Lz-=o.wz/A*O}i0(o)}}o.nC=n,o.rimC=0;for(let E=0;E<n;E++)J0[E]&&u0[E]>0&&o.rimC++;x>0&&(o.cx=o.x+b/x,o.cz=o.z+w/x);const f=1-c.air*e;o.Lx*=f,o.Ly*=f,o.Lz*=f,o.vx*=1-.05*e,o.vz*=1-.05*e,o.x+=o.vx*e,o.y+=o.vy*e,o.z+=o.vz*e;const g=(1/c.C-1/c.A)*(o.ax*o.Lx+o.ay*o.Ly+o.az*o.Lz);ve(o,o.ax,o.ay,o.az,g*e);const p=Math.sqrt(o.Lx*o.Lx+o.Ly*o.Ly+o.Lz*o.Lz);p>1e-12&&ve(o,o.Lx/p,o.Ly/p,o.Lz/p,p/c.A*e)}function H0(o,e,i,c,n,d,u){const m=o.b,v=e-o.x,b=i-o.y,w=c-o.z;o.vx+=n/m.m,o.vy+=d/m.m,o.vz+=u/m.m,o.Lx+=b*u-w*d,o.Ly+=w*n-v*u,o.Lz+=v*d-b*n,o.sleep=0,o.still=0}function ie(o,e,i,c,n,d,u){const m=o.b,v=i*u-c*d,b=c*n-e*u,w=e*d-i*n,x=o.ax*v+o.ay*b+o.az*w,f=1/m.C-1/m.A,g=v/m.A+f*x*o.ax,p=b/m.A+f*x*o.ay,E=w/m.A+f*x*o.az;return 1/m.m+((p*c-E*i)*n+(E*e-g*c)*d+(g*i-p*e)*u)}function ho(o,e,i,c){const n=o.b.Hc-o.b.hcm,d=e.b.Hc-e.b.hcm,u=o.x+o.ax*n,m=o.y+o.ay*n,v=o.z+o.az*n,b=e.x+e.ax*d,w=e.y+e.ay*d,x=e.z+e.az*d;let f=b-u,g=w-m,p=x-v;const E=Math.sqrt(f*f+g*g+p*p),F=o.b.R+e.b.R;if(E>=F||E<1e-6)return;f/=E,g/=E,p/=E;const _=u+f*o.b.R,q=m+g*o.b.R,D=v+p*o.b.R,M=_-o.x,k=q-o.y,U=D-o.z,C=_-e.x,A=q-e.y,O=D-e.z,J=o.vx+(o.wy*U-o.wz*k),Z=o.vy+(o.wz*M-o.wx*U),G=o.vz+(o.wx*k-o.wy*M),d0=e.vx+(e.wy*O-e.wz*A),p0=e.vy+(e.wz*C-e.wx*O),v0=e.vz+(e.wx*A-e.wy*C);let c0=d0-J,P=p0-Z,H=v0-G;const W=c0*f+P*g+H*p,r0=F-E;if(W>.02&&r0<.001)return;const z0=ie(o,M,k,U,f,g,p)+ie(e,C,A,O,f,g,p),$=Math.max(W<-.05?-.55*W:0,.2*r0/i*.1),K=Math.max(0,($-W)/z0);if(K<=0)return;H0(o,_,q,D,-f*K,-g*K,-p*K),H0(e,_,q,D,f*K,g*K,p*K),i0(o),i0(e);const b0=c0-W*f,m0=P-W*g,V=H-W*p,k0=Math.sqrt(b0*b0+m0*m0+V*V);if(k0>1e-6){const Y=b0/k0,U0=m0/k0,Q=V/k0,le=ie(o,M,k,U,Y,U0,Q)+ie(e,C,A,O,Y,U0,Q),N0=Math.min(.3*K,k0/le);H0(o,_,q,D,Y*N0,U0*N0,Q*N0),H0(e,_,q,D,-Y*N0,-U0*N0,-Q*N0),i0(o),i0(e)}c&&W<-.03&&c(2,o,-W,e)}function qe(o,e,i,c,n,d,u){const m=Math.sin(c)*Math.cos(n),v=Math.cos(c),b=Math.sin(c)*Math.sin(n),w=Math.hypot(b,m);if(w<1e-9)o.qw=1,o.qx=o.qy=o.qz=0;else{const g=Math.sin(c/2);o.qw=Math.cos(c/2),o.qx=b/w*g,o.qy=0,o.qz=-m/w*g}ve(o,m,v,b,o.phase0||0),Ie(o);const x=o.b;o.Lx=o.ax*d*x.C,o.Ly=o.ay*d*x.C,o.Lz=o.az*d*x.C,o.x=e,o.z=i,o.vx=o.vy=o.vz=0;let f=1e9;for(let g=0;g<x.prims.length;g+=3){const p=x.prims[g],E=x.prims[g+1],F=x.prims[g+2];f=Math.min(f,o.ay*p-E*Math.sqrt(Math.max(0,1-o.ay*o.ay))-F)}o.y=-f+(u||0),o.cx=e,o.cz=i,i0(o)}function uo(o,e){const i=o.b,c=o.ay,n=-e*c*o.ax,d=e*(1-c*o.ay),u=-e*c*o.az,m=o.ax*n+o.ay*d+o.az*u;o.Lx=i.A*n+(i.C-i.A)*m*o.ax,o.Ly=i.A*d+(i.C-i.A)*m*o.ay,o.Lz=i.A*u+(i.C-i.A)*m*o.az,i0(o)}function $o(o,e){const i=o.b,c=[o.ax,o.ay,o.az],n=c[1]*e;o.Lx=i.A*0+(i.C-i.A)*n*c[0],o.Ly=i.A*e+(i.C-i.A)*n*c[1],o.Lz=(i.C-i.A)*n*c[2],i0(o)}const _0=`#version 300 es
precision highp float; precision highp int; precision highp sampler2DShadow;
layout(std140) uniform Scene { mat4 uVP; mat4 uLM; vec4 uEye; vec4 uL; vec4 uLCol; vec4 uLPos; vec4 uLDir; vec4 uAmbUp; vec4 uAmbDn; vec4 uFocus; vec4 uGobo; vec4 uGobo2; vec4 uRoom; vec4 uFl; vec4 uFl2; vec4 uFlUV; vec4 uT[48]; };
`,Z0=`
uniform sampler2DShadow uShadow; uniform sampler2D uFloorT; uniform sampler2D uRoomT;
// on the tops (SOFT): a window or lamp is a source with size, so a body's own shadow edge is soft (a wider filter,
// a wrapped terminator), and the lit boards throw their own colour back up into its shadow side
#ifdef SOFT
const float gSoft = 5.0;
#else
const float gSoft = 1.0;
#endif
float gobo(vec4 lc) {
  vec2 q = lc.xy * uGobo2.zw - uGobo2.xy;
  vec2 f = fract(q / uGobo.xy) * uGobo.xy;
  float m = smoothstep(uGobo.z * 0.5 - uGobo.w, uGobo.z * 0.5 + uGobo.w, min(f.x, uGobo.x - f.x));
  m *= smoothstep(uGobo.z * 0.5 - uGobo.w, uGobo.z * 0.5 + uGobo.w, min(f.y, uGobo.y - f.y));
  return mix(0.08, 1.0, m);
}
vec3 keyLight(vec3 P, vec3 N, out vec3 L) {
  float att = 1.0;
  if (uL.w < 0.5) L = uL.xyz;
  else {
    vec3 d = uLPos.xyz - P; float dd = dot(d, d); L = d * inversesqrt(dd); att = 1.0 / dd;
    if (uL.w > 1.5) att *= smoothstep(uLPos.w, uLPos.w + uLDir.w, dot(-L, uLDir.xyz));
  }
  vec4 lc = uLM * vec4(P + N * 0.0006, 1.0);
  vec3 q = lc.xyz / lc.w * 0.5 + 0.5;
  float sh = 1.0;
  if (q.x > 0.0 && q.y > 0.0 && q.x < 1.0 && q.y < 1.0 && q.z < 1.0) {
    vec2 tx = vec2(uLCol.w) * gSoft; float z = q.z - 0.00025 * gSoft;
    sh = texture(uShadow, vec3(q.xy + tx * vec2(-0.9, -0.4), z)) + texture(uShadow, vec3(q.xy + tx * vec2(0.4, -0.9), z))
       + texture(uShadow, vec3(q.xy + tx * vec2(0.9, 0.4), z)) + texture(uShadow, vec3(q.xy + tx * vec2(-0.4, 0.9), z));
#ifdef SOFT
      sh += texture(uShadow, vec3(q.xy + tx * vec2(-0.35, -0.2), z)) + texture(uShadow, vec3(q.xy + tx * vec2(0.2, -0.35), z))
          + texture(uShadow, vec3(q.xy + tx * vec2(0.35, 0.2), z)) + texture(uShadow, vec3(q.xy + tx * vec2(-0.2, 0.35), z));
      sh *= 0.125;
#else
      sh *= 0.25;
#endif
  }
  if (uL.w < 0.5) sh *= gobo(lc);
  return uLCol.rgb * att * sh;
}
vec3 env(vec3 P, vec3 R, float rough) {
  if (R.y < -0.01) {
    float t = -P.y / R.y; vec2 xz = P.xz + R.xz * t;
    vec3 a = pow(textureLod(uFloorT, (xz - uFlUV.xy) / uFlUV.z, 2.5).rgb, vec3(2.2));
    return a * (uAmbUp.rgb + uLCol.rgb * (uL.w < 0.5 ? 0.3 : 0.6 / (0.1 + dot(uLPos.xyz, uLPos.xyz))));
  }
  float t = (uRoom.x - P.z) / min(R.z, -0.08);
  vec3 H = P + R * t;
  vec2 uv = vec2(H.x / uRoom.y + 0.5, (H.y - uRoom.z) / uRoom.w);
  vec3 room = pow(textureLod(uRoomT, uv, 1.5).rgb, vec3(2.2)) * 4.0;
  float back = smoothstep(-0.1, 0.4, -R.z);
  vec3 dR = R - (uL.w < 0.5 ? uL.xyz : normalize(uLPos.xyz - P));
  float card = exp(-(dR.x * dR.x + dR.z * dR.z) * 26.0 / (1.0 + rough * 14.0) - dR.y * dR.y * 5.0);
  return mix(mix(uAmbDn.rgb, uAmbUp.rgb, clamp(R.y * 2.0, 0.0, 1.0)) * 2.6, room, back)
    + uLCol.rgb * card * (uL.w < 0.5 ? 0.8 : 1.3 / (0.1 + dot(uLPos.xyz, uLPos.xyz))) / (1.0 + rough * 5.0);
}
vec3 shade(vec3 P, vec3 N, vec3 V, vec3 alb, float rough, float spec, float metal, float ao) {
  vec3 L; vec3 Li = keyLight(P, N, L);
  float nl = dot(N, L), ndl = max(nl, 0.0);
#ifdef SOFT
  float ndw = clamp((nl + 0.22) / 1.22, 0.0, 1.0); ndw *= ndw * (3.0 - 2.0 * ndw);
#else
  float ndw = ndl;
#endif
  vec3 H = normalize(L + V);
  float nh = max(dot(N, H), 0.0), a = rough * rough, a2 = a * a, dn = nh * nh * (a2 - 1.0) + 1.0;
  float D = a2 / (3.14159 * dn * dn);
  float vh = max(dot(V, H), 0.0), nv = max(dot(N, V), 0.0);
  vec3 F0 = mix(vec3(0.04), alb, metal);
  vec3 F = F0 + (1.0 - F0) * pow(1.0 - vh, 5.0);
  vec3 sp = Li * ndl * D * F * 0.25 * spec / max(0.2, nv * 0.5 + 0.5);
  vec3 amb = mix(uAmbDn.rgb, uAmbUp.rgb, N.y * 0.5 + 0.5) * ao;
#ifdef SOFT
  // light back from the lit boards: strongest on faces turned down and near the floor
  vec3 Lf = uL.w < 0.5 ? uLCol.rgb * uL.y : uLCol.rgb * uLPos.y / pow(dot(uLPos.xyz, uLPos.xyz), 1.5);
  amb += Lf * pow(textureLod(uFloorT, vec2(0.5), 12.0).rgb, vec3(2.2)) * 0.45 * (0.62 - 0.38 * N.y) * exp(-P.y * 22.0);
#endif
  vec3 Fe = F0 + (max(vec3(1.0 - rough), F0) - F0) * pow(1.0 - nv, 5.0);
  vec3 e = env(P, reflect(-V, N), rough) * mix(ao, 1.0, 0.4);
  return alb * (1.0 - metal) * (Li * ndw + amb) + sp + e * Fe * spec;
}
vec4 finish(vec3 col, vec3 P) {
  col *= uEye.w;
  col = col * (2.51 * col + 0.03) / (col * (2.43 * col + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
  float d = length(P - uEye.xyz);
  float coc = clamp((d - uFocus.x) / d * uFocus.y, -1.0, 1.0);
  return vec4(col, coc * 0.5 + 0.5);
}
`,Be=`${_0}
layout(location=0) in vec3 aP; layout(location=1) in vec3 aN; layout(location=2) in vec2 aHR;
uniform int uBase; uniform float uMir;
out vec3 vP; out vec3 vN; out vec3 vB; out vec2 vHR; flat out int vI;
void main() {
  int i = uBase + gl_InstanceID;
  vec4 c0 = uT[i * 6], c1 = uT[i * 6 + 1], c2 = uT[i * 6 + 2], c3 = uT[i * 6 + 3];
  mat3 R = mat3(c0.xyz, c1.xyz, c2.xyz);
  vec3 P = c3.xyz + R * (aP * c0.w);
  vP = P; vN = R * aN; vB = aP; vHR = aHR; vI = i;
  gl_Position = uMir > 1.5 ? uLM * vec4(P, 1.0) : uVP * vec4(P.x, P.y * uMir, P.z, 1.0);
}`,ce=`
uniform float uMir; uniform sampler2D uNoise;
in vec3 vP; in vec3 vN; in vec3 vB; in vec2 vHR; flat in int vI;
out vec4 o;
vec3 unpack(float f) { return vec3(floor(f / 65536.0), mod(floor(f / 256.0), 256.0), mod(f, 256.0)) / 255.0; }
vec3 lin(vec3 c) { return c * c * (0.3 + 0.7 * c); }
// box-filtered square wave: share of [x - w/2, x + w/2] lying in the first d of each period
float sqw(float x, float w, float d) {
  float a = x - 0.5 * w, b = x + 0.5 * w;
  return ((floor(b) * d + min(fract(b), d)) - (floor(a) * d + min(fract(a), d))) / w;
}
float sinc(float x) { return abs(x) < 1e-3 ? 1.0 : sin(x) / x; }
float ang2(float y, float x) { float a = atan(abs(y) / max(abs(x), 1e-7)); if (x < 0.0) a = 3.14159265 - a; return y < 0.0 ? -a : a; }
float ring(float h, float h0, float w) { float aa = fwidth(h) + 1e-6; return 1.0 - smoothstep(w * 0.5 - aa, w * 0.5 + aa, abs(h - h0)); }
vec4 outCol(vec3 col, vec3 P) {
  if (uMir < 0.0) { col *= uEye.w; return vec4(col / (1.0 + col), clamp(P.y / 0.12, 0.0, 1.0)); }
  return finish(col, P);
}
void fade(float a) { if (a < 0.999) { float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453); if (n > a) discard; } }
vec3 viewDir() { vec3 e = uEye.xyz; if (uMir < 0.0) e.y = -e.y; return normalize(e - vP); }
float aoTop() { return 0.55 + 0.45 * smoothstep(0.0, 0.012, vP.y); }
`,po=`${_0}#define SOFT 1
${Z0}${ce}
void main() {
  vec4 T1 = uT[vI * 6 + 1], T2 = uT[vI * 6 + 2], T3 = uT[vI * 6 + 3], T4 = uT[vI * 6 + 4];
  fade(T3.w);
  vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;
  float blur = T1.w, phi = ang2(vB.z, vB.x), h = vHR.x, r = vHR.y;
  int design = int(T2.w); float seed = fract(T2.w);
  vec3 cA = lin(unpack(T4.x)), cB = lin(unpack(T4.y)), cC = lin(unpack(T4.z));
  bool tippe = T4.w > 3.5;
  float px = fwidth(phi) * 0.5 + 1e-4;
  // wood: side grain along the axis, averaged over the sweep (sinc of each harmonic)
  float g = 0.0;
  g += 0.45 * sin(phi * 9.0 + h * 140.0 + seed * 20.0) * sinc(9.0 * blur * 0.5);
  g += 0.30 * sin(phi * 23.0 + h * 310.0 + seed * 7.0) * sinc(23.0 * blur * 0.5);
  g += 0.25 * sin(phi * 51.0 - h * 520.0) * sinc(51.0 * blur * 0.5);
  float rings = sin(h * 900.0 + seed * 30.0) * 0.5 + 0.5;
  vec3 wood = mix(vec3(0.62, 0.42, 0.24), vec3(0.78, 0.58, 0.36), 0.5 + 0.35 * g) * (0.92 + 0.08 * rings);
  vec3 alb = wood; float rough = 0.13, spec = 1.0, metal = 0.0;
  float wd = blur;
  if (design == 4) {
    // ebony and silver: very dark wood, inlaid silver rings, a silver peg
    vec3 eb = vec3(0.035, 0.028, 0.024) * (1.0 + 0.6 * g);
    alb = eb; rough = 0.12;
    float sil = max(max(ring(h, 0.031, 0.0012), ring(h, 0.040, 0.0012)), ring(h, 0.0352, 0.0026)) + step(h, 0.003) + step(0.0472, h) * ring(h, 0.058, 0.004);
    sil = clamp(sil, 0.0, 1.0);
    float dots = sqw(phi / 6.2832 * 12.0 - 0.25, max(blur * 12.0 / 6.2832, px * 2.0), 0.18) * ring(h, 0.0352, 0.0026);
    alb = mix(alb, vec3(0.86, 0.86, 0.88), sil); metal = sil; rough = mix(rough, 0.16, sil);
    alb = mix(alb, vec3(0.03), dots);
  } else if (tippe) {
    // the tippe top: a painted lower half, segmented upper half, a natural stem
    float k = 6.0, x = phi / 6.2832 * k + h * 160.0 * (seed - 0.5), w = max(blur * k / 6.2832, px * k / 6.2832 * 2.0);
    vec3 up = mix(cB, cC, sqw(x, w, 0.5));
    alb = h < 0.016 ? cA : (h < 0.0385 ? up : wood);
    float ln = max(ring(h, 0.016, 0.0012), ring(h, 0.0385, 0.0008));
    alb = mix(alb, vec3(0.02), ln * 0.9);
    alb = mix(alb, cA, ring(h, 0.008, 0.003));
  } else {
    float tip = step(h, 0.003);
    float cone = step(0.003, h) * step(h, 0.031), belly = step(0.031, h) * step(h, 0.040), sh = step(0.040, h) * step(h, 0.0472), stem = step(0.0472, h);
    float K1 = 6.0 + floor(seed * 4.0) * 2.0;
    float x1 = phi / 6.2832 * K1, w1 = max(blur * K1 / 6.2832, px * K1 / 6.2832 * 2.0);
    vec3 cCone = cA, cBelly = cB, cSh = cA, cStem = wood;
    if (design == 0) {
      cBelly = mix(cB, cC, sqw(x1, w1, 0.5));
      cSh = mix(cA, cC, sqw(x1 + 0.25, w1, 0.3));
    } else if (design == 1) {
      cCone = mix(wood, cA, max(step(0.016, h) * step(h, 0.024), step(0.0075, h) * step(h, 0.0105)));
      // a ring of dots round the belly
      float K2 = 10.0, x2 = phi / 6.2832 * K2, w2 = max(blur * K2 / 6.2832, px * K2 / 6.2832 * 2.0);
      float dr = 0.0034, hw = sqrt(max(dr * dr - (h - 0.0355) * (h - 0.0355), 0.0)) / (6.2832 * max(r, 0.004) / K2);
      cBelly = mix(cA, cC, hw > 0.0 ? sqw(x2 - 0.5 + hw, w2, 2.0 * hw) : 0.0);
      cSh = mix(cB, wood, sqw(x1, w1, 0.5));
    } else if (design == 2) {
      // twisted stripes running up the cone and belly
      float tw = (seed < 0.5 ? 1.0 : -1.0) * 34.0, K3 = 5.0;
      float x3 = phi / 6.2832 * K3 + h * tw, w3 = max(blur * K3 / 6.2832, px * K3 / 6.2832 * 2.0);
      vec3 sw = mix(cA, cB, sqw(x3, w3, 0.5));
      cCone = mix(wood, sw, step(0.006, h)); cBelly = sw; cSh = cC; cStem = cC;
    } else {
      // petals on the shoulder, bands on the cone
      float x4 = phi / 6.2832 * 8.0, w4 = max(blur * 8.0 / 6.2832, px * 8.0 / 6.2832 * 2.0);
      float petal = sqw(x4, w4, clamp((h - 0.040) / 0.0072, 0.0, 1.0) * 0.6 + 0.15);
      cSh = mix(cA, cB, petal);
      // the cone is left as bare wood between two dyed bands
      cCone = mix(mix(wood, cC, step(0.0055, h) * step(h, 0.0115)), cB, step(0.0155, h) * step(h, 0.0225)); cBelly = cA;
    }
    // stems: dyed to the tip, or bare with a dyed finial
    if (design == 0) cStem = mix(wood, cC, step(0.052, h));
    else if (design == 1) cStem = mix(wood, cA, step(0.0605, h));
    alb = tip * vec3(0.5, 0.47, 0.42) + cone * cCone + belly * cBelly + sh * cSh + stem * cStem;
    if (design != 2) {
      alb = mix(alb, cC, ring(h, 0.0125, 0.0013) * cone);
      alb = mix(alb, cB, ring(h, 0.0235, 0.0018) * cone);
      alb = mix(alb, cC, ring(h, 0.0437, 0.0009) * sh);
      // more rings put on at the lathe: they stay sharp at any spin
      alb = mix(alb, cB, ring(h, 0.0284, 0.0008) * cone);
      alb = mix(alb, cA, ring(h, 0.0417, 0.0011) * sh);
      alb = mix(alb, cC, ring(h, 0.0452, 0.0007) * sh);
      alb = mix(alb, cB, ring(h, 0.0562, 0.0011) * stem);
    }
    metal = tip; rough = mix(rough, 0.3, tip);
    // scorched lines between the zones (a wire held against the turning wood)
    float ln = max(max(ring(h, 0.031, 0.0007), ring(h, 0.040, 0.0007)), max(ring(h, 0.0472, 0.0006), ring(h, 0.0185, 0.0005)));
    alb = mix(alb, vec3(0.06, 0.035, 0.022), ln * (1.0 - tip) * (design == 2 ? 0.0 : 0.75));
    alb = mix(alb, cStem * 0.6, stem * ring(h, 0.062, 0.0012));
    // turning marks: tone and gloss vary in fine rings; the dye soaks the wood, so the grain shows through a still top
    float lod = uFlUV.w > 0.0007 ? 1.6 : 0.0;
    float lt = textureLod(uNoise, vec2(h * 3.3 + seed, seed * 5.0), 0.0).r * 0.6 + textureLod(uNoise, vec2(h * 11.0, seed * 9.0 + 0.3), lod).g * 0.4;
    float bare = 1.0 - clamp(length(alb - wood) * 6.0, 0.0, 1.0);
    alb *= (0.8 + 0.4 * lt) * mix(0.78 + 0.5 * (0.5 + 0.35 * g), 1.0, max(bare, tip));
    // wear: the widest ring is rubbed back to the wood wherever the top has rolled; fingers darken the stem
    float wn = mix(textureLod(uNoise, vec2(phi / 6.2832 + seed, h * 6.0), 3.0).b, 0.5, clamp(blur * 0.6, 0.0, 1.0));
    float wear = ring(h, 0.0355, 0.0054) * smoothstep(0.36, 0.6, wn + 0.3 * (lt - 0.5));
    alb = mix(alb, wood * 0.9, wear * 0.7);
    // chips knocked through the dye to the pale wood where tops hit each other (the belly ring, the shoulder's lip);
    // they turn with the body, so a fast top shows them only as a faint ring
    float cz = clamp(ring(h, 0.0355, 0.008) + ring(h, 0.0466, 0.0024), 0.0, 1.0);
    float cn = texture(uNoise, vec2(phi / 6.2832 + seed, h * 5.0 + seed * 3.0)).a;
    float chip = cz * smoothstep(0.84, 0.9, cn) * mix(1.0, 0.2, clamp(blur * 0.8, 0.0, 1.0)) * (1.0 - tip);
    alb = mix(alb, wood * 1.1, chip);
    // the dye soaks deeper into the end grain at the point
    alb *= mix(0.7, 1.0, smoothstep(0.0035, 0.012, h));
    alb *= mix(vec3(1.0), vec3(0.74, 0.64, 0.52), stem * smoothstep(0.047, 0.066, h) * 0.85);
    rough = mix(mix(0.17 + 0.12 * lt, 0.42, max(wear, bare * 0.7)), rough, tip);
    spec = mix(1.0, 0.55, max(wear, bare * 0.7) * (1.0 - tip));
    // fine tool lines: they bend the light into a bright thread that stays in one place while the top turns
    float tln = sin(h * 5400.0 + seed * 40.0) * clamp(1.0 - fwidth(h) * 2200.0, 0.0, 1.0) * (1.0 - stem);
    N = normalize(N + T1.xyz * ((lt - 0.5) * 0.2 + tln * 0.06));
  }
  vec3 V = viewDir();
  vec3 col = shade(vP, N, V, alb, rough, spec, metal, aoTop());
  o = outCol(col, vP);
}`,mo=`${_0}#define SOFT 1
${Z0}${ce}
void main() {
  vec4 T1 = uT[vI * 6 + 1], T2 = uT[vI * 6 + 2], T3 = uT[vI * 6 + 3], T4 = uT[vI * 6 + 4];
  fade(T3.w);
  vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;
  float blur = T1.w, phi = ang2(vB.z, vB.x), h = vHR.x, r = vHR.y;
  int design = int(T2.w); float seed = fract(T2.w);
  bool steel = T4.w > 4.5;
  vec3 alb; float rough;
  // lathe grooves: fine rings that bend the highlight
  float gr = sin((steel ? r : h) * (steel ? 4200.0 : 6200.0));
  vec3 Nb = normalize(N + vec3(0.0, gr * (steel ? 0.01 : 0.035), 0.0));
  if (steel) {
    alb = vec3(0.78, 0.79, 0.81); rough = 0.07;
  } else {
    alb = design == 1 ? vec3(0.8, 0.58, 0.3) : vec3(0.98, 0.74, 0.40);
    rough = design == 1 ? 0.3 : 0.13;
    // knurled grip: a diamond pattern that blurs into a dull band as it spins
    float kn = step(0.026, h) * step(h, 0.034);
    float d1 = sin(phi * 30.0 + h * 2600.0) * sinc(30.0 * blur * 0.5), d2 = sin(phi * 30.0 - h * 2600.0) * sinc(30.0 * blur * 0.5);
    float knurl = kn * (0.55 + 0.45 * d1 * d2);
    alb *= mix(1.0, knurl, kn); rough = mix(rough, 0.32, kn);
    // the hardened steel ball at the tip
    float tip = step(h, 0.0024);
    alb = mix(alb, vec3(0.7, 0.71, 0.73), tip); rough = mix(rough, 0.1, tip);
    // a ring cut in the flywheel
    alb *= 1.0 - 0.6 * ring(h, 0.0126, 0.0004) - 0.4 * ring(h, 0.0185, 0.0003);
    if (design == 1) { float pat = texture(uNoise, vec2(phi * 0.3, h * 8.0) + seed).r; alb *= 0.8 + 0.3 * pat; }
  }
  vec3 V = viewDir();
  vec3 col = shade(vP, Nb, V, alb, rough, 1.0, 1.0, aoTop());
  o = outCol(col, vP);
}`,xo=`${_0}#define SOFT 1
${Z0}${ce}
void main() {
  vec4 T1 = uT[vI * 6 + 1], T2 = uT[vI * 6 + 2], T3 = uT[vI * 6 + 3], T4 = uT[vI * 6 + 4];
  fade(T3.w);
  vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;
  float blur = T1.w, phi = ang2(vB.z, vB.x), h = vHR.x, r = length(vB.xz);
  int design = int(T2.w); float seed = fract(T2.w);
  vec3 cA = lin(unpack(T4.x)), cB = lin(unpack(T4.y)), cC = lin(unpack(T4.z));
  float px = fwidth(phi) * 0.5 + 1e-4;
  vec3 base = cA; float rough = design == 2 ? 0.3 : 0.07;
  float onFace = step(r, 0.0295);
  // painted bands at fixed radii and a radial motif that blurs into rings
  float K = 8.0 + floor(seed * 3.0) * 4.0, x = phi / 6.2832 * K, w = max(blur * K / 6.2832, px * K / 6.2832 * 2.0);
  float rr = r / 0.03;
  float bands = max(ring(rr, 0.92, 0.07), ring(rr, 0.3, 0.05));
  float petal = sqw(x + rr * (seed - 0.5) * 2.0, w, mix(0.15, 0.55, smoothstep(0.35, 0.85, rr))) * step(0.36, rr) * step(rr, 0.86);
  float dotc = step(rr, 0.2) * 0.9;
  float paint = clamp(bands + petal * 0.9 + dotc, 0.0, 1.0) * onFace;
  float edge = 1.0 - onFace;
  vec3 alb = mix(base, cB, paint);
  alb = mix(alb, cC, edge * 0.7 * step(0.5, fract(seed * 7.0)));
  if (design == 1) alb = mix(base, base * 0.55, paint * 0.8);
  vec3 V = viewDir();
  vec3 col = shade(vP, N, V, alb, rough, 1.0, 0.0, aoTop());
  o = outCol(col, vP);
}`,vo=`${_0}#define SOFT 1
${Z0}${ce}
void main() {
  vec4 T1 = uT[vI * 6 + 1], T2 = uT[vI * 6 + 2], T3 = uT[vI * 6 + 3], T4 = uT[vI * 6 + 4];
  fade(T3.w);
  vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;
  float blur = T1.w, phi = ang2(vB.z, vB.x), h = vHR.x, r = vHR.y;
  int design = int(T2.w); float seed = fract(T2.w);
  vec3 cA = lin(unpack(T4.x)), cB = lin(unpack(T4.y)), cC = lin(unpack(T4.z));
  vec3 V = viewDir();
  float nv = max(dot(N, V), 0.0);
  float px = fwidth(phi) * 0.5 + 1e-4;
  vec3 tint = design == 1 ? vec3(0.6, 0.58, 0.55) : (design == 2 ? vec3(0.95, 0.66, 0.3) : vec3(0.88, 0.96, 0.93));
  // what is seen through the body: the lit floor (sharp, refracted and flipped) or the room
  vec3 Rt = refract(-V, N, 0.66);
  vec3 Q = vP + Rt * 0.03;
  vec3 N2 = reflect(N, Rt), Ro = refract(Rt, -N2, 1.5);
  Rt = dot(Ro, Ro) < 0.5 ? reflect(Rt, -N2) : Ro;
  vec3 behind;
  if (Rt.y < -0.02) {
    float tq = -Q.y / Rt.y; vec2 xz = Q.xz + Rt.xz * min(tq, 0.25);
    vec3 fa = pow(textureLod(uFloorT, (xz - uFlUV.xy) / uFlUV.z, 0.5).rgb, vec3(2.2));
    vec3 Lf; vec3 Lif = keyLight(vec3(xz.x, 0.0, xz.y), vec3(0.0, 1.0, 0.0), Lf);
    behind = fa * (Lif * max(Lf.y, 0.0) + uAmbUp.rgb);
  } else behind = env(Q, Rt, 0.05);
  behind *= pow(tint, vec3(1.0 / (nv + 0.35)));
  // ribbons twisted round the core, seen most where the surface faces us
  float K = 4.0, x = phi / 6.2832 * K + h * 55.0 * (seed < 0.5 ? 1.0 : -1.0), w = max(blur * K / 6.2832, px * K / 6.2832 * 2.0);
  float rib = sqw(x, w, 0.34);
  float core = smoothstep(0.25, 0.75, nv) * step(0.004, h) * step(h, 0.04);
  vec3 ribC = mix(cA, cB, step(0.5, fract(x * 0.5 + 0.25)) * (1.0 - smoothstep(0.3, 1.0, w)) + 0.5 * smoothstep(0.3, 1.0, w));
  vec3 L; vec3 Li = keyLight(vP, N, L);
  vec3 inner = mix(behind, ribC * (Li * 0.7 * max(dot(N, L), 0.25) + uAmbUp.rgb * 2.0 + 0.02), rib * core * 0.9);
  float F = 0.04 + 0.96 * pow(1.0 - nv, 5.0);
  vec3 R = reflect(-V, N);
  vec3 H = normalize(L + V);
  float sp = pow(max(dot(N, H), 0.0), 600.0) * 60.0 + pow(max(dot(N, H), 0.0), 60.0) * 2.0;
  vec3 col = inner * (1.0 - F) + env(vP, R, 0.03) * F + Li * sp * 0.25;
  o = outCol(col, vP);
}`,bo=`#version 300 es
precision mediump float; out vec4 o; void main() { o = vec4(1.0); }`,go=`${_0}
layout(location=0) in vec2 aP; out vec3 vP;
void main() { vP = vec3(aP.x, 0.0, aP.y); gl_Position = uVP * vec4(vP, 1.0); }`,wo=`${_0}${Z0}
uniform sampler2D uRefl; uniform vec4 uRS;
in vec3 vP; out vec4 o;
void main() {
  vec2 uv = (vP.xz - uFlUV.xy) / uFlUV.z;
  vec4 a = texture(uFloorT, uv);
  float hx = texture(uFloorT, uv + vec2(uFlUV.w, 0.0)).a - a.a, hz = texture(uFloorT, uv + vec2(0.0, uFlUV.w)).a - a.a;
  vec3 N = normalize(vec3(-hx * uFl.z, 1.0, -hz * uFl.z));
  vec3 alb = pow(a.rgb, vec3(2.2));
  float rough = uFl.x, F0 = uFl.y, blurK = uRS.z;
  if (uFl.w > 0.5) {
    // a mirror lying on the table: silvered glass with a bevelled edge
    vec2 q = abs(vP.xz - vec2(0.0, uFl2.y)) - vec2(uFl2.x, uFl2.z);
    float dEdge = max(q.x, q.y);
    float inM = 1.0 - smoothstep(-0.0005, 0.0005, dEdge);
    float bev = smoothstep(-0.012, -0.002, dEdge) * inM;
    N = normalize(mix(N, vec3(0.0, 1.0, 0.0), inM));
    vec2 gq = sign(vP.xz - vec2(0.0, uFl2.y)) * step(vec2(q.y, q.x), q);
    N = normalize(mix(N, normalize(vec3(gq.x * 0.25, 1.0, gq.y * 0.25)), bev));
    alb = mix(alb, vec3(0.012, 0.014, 0.013), inM);
    rough = mix(rough, 0.015, inM); F0 = mix(F0, 0.82, inM * (1.0 - bev * 0.7)); blurK = mix(blurK, 0.0, inM);
  }
  // the tops darken the floor round their contacts and under their bodies; glass ones focus light
  float ao = 1.0; vec3 caus = vec3(0.0);
  int n = int(uFocus.w);
  for (int i = 0; i < n; i++) {
    vec4 c3 = uT[i * 6 + 3], c5 = uT[i * 6 + 5];
    float dc = length(vP.xz - c5.xz), db = length(vP.xz - c3.xz);
    float rad = c5.w, hgt = c5.y;
    ao *= 1.0 - 0.55 * c3.w * exp(-dc * dc / (rad * rad * 0.012));
    ao *= 1.0 - 0.35 * c3.w * exp(-db * db / (rad * rad * (0.5 + hgt * 40.0))) / (1.0 + hgt * 25.0);
    if (uT[i * 6 + 4].w > 2.5 && uT[i * 6 + 4].w < 3.5) {
      vec3 Ld = uL.w < 0.5 ? uL.xyz : normalize(uLPos.xyz - c3.xyz);
      vec2 sp = c3.xz - Ld.xz / max(Ld.y, 0.15) * c3.y;
      float ds = length(vP.xz - sp);
      caus += uLCol.rgb * (uL.w < 0.5 ? 1.0 : 1.0 / dot(uLPos.xyz - c3.xyz, uLPos.xyz - c3.xyz)) * 0.9 * exp(-ds * ds / (rad * rad * 0.03)) * c3.w;
    }
  }
  vec3 V = normalize(uEye.xyz - vP);
  vec3 L; vec3 Li = keyLight(vP, N, L);
  float ndl = max(dot(N, L), 0.0);
  vec3 H = normalize(L + V);
  float nh = max(dot(N, H), 0.0), ra = max(rough, 0.03), a2 = ra * ra * ra * ra, dn = nh * nh * (a2 - 1.0) + 1.0;
  float D = a2 / (3.14159 * dn * dn);
  float nv = max(dot(N, V), 0.0);
  float F = F0 + (1.0 - F0) * pow(1.0 - nv, 5.0) * (1.0 - rough);
  // reflected scene (rendered mirrored into uRefl), blurred by gloss and by the height of what it shows
  vec2 su = gl_FragCoord.xy * uRS.xy + N.xz * vec2(0.03, -0.03);
  vec4 r0 = texture(uRefl, su);
  vec3 refl = r0.rgb;
  if (blurK > 0.0) {
    float rad = blurK * (0.025 + r0.a * 1.2);
    float ang = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) * 6.2832;
    for (int k = 0; k < 6; k++) {
      float fk = float(k) + 0.5, rr = sqrt(fk / 6.0) * rad, aa = ang + fk * 2.39996;
      refl += textureLod(uRefl, su + vec2(cos(aa), sin(aa)) * rr * vec2(1.0, 0.5), 0.0).rgb;
    }
    refl /= 7.0;
  }
  refl = refl / max(vec3(1.0) - refl, vec3(0.02)) / uEye.w;
  vec3 diff = alb * (Li * ndl + caus + mix(uAmbDn.rgb, uAmbUp.rgb, 0.8) * ao) * (1.0 - F);
  vec3 col = diff * mix(1.0, ao, 0.5) + refl * F * mix(1.0, ao, 0.35) + Li * ndl * D * 0.25 * F * 4.0;
  // far off, the boards run into the room's own light: no seam where the room begins
  vec3 rb = pow(textureLod(uRoomT, vec2(vP.x / uRoom.y + 0.5, (0.015 - uRoom.z) / uRoom.w), 3.0).rgb, vec3(2.2)) * 4.0;
  col = mix(col, rb, (1.0 - smoothstep(uRoom.x, uRoom.x * 0.6, vP.z)) * 0.55);
  o = finish(col, vP);
}`,yo=`${_0}
layout(location=0) in vec2 aP; uniform float uMir; out vec3 vP; out vec2 vU;
void main() { vP = vec3(aP.x, aP.y, uRoom.x); vU = vec2(aP.x / uRoom.y + 0.5, (aP.y - uRoom.z) / uRoom.w); gl_Position = uVP * vec4(vP.x, vP.y * uMir, vP.z, 1.0); }`,To=`${_0}
uniform sampler2D uRoomT; uniform float uMir; in vec3 vP; in vec2 vU; out vec4 o;
void main() {
  vec3 col = pow(texture(uRoomT, vU).rgb, vec3(2.2)) * 4.0 * uEye.w;
  if (uMir < 0.0) { o = vec4(col / (1.0 + col), 1.0); return; }
  col = col * (2.51 * col + 0.03) / (col * (2.43 * col + 0.59) + 0.14);
  o = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
}`,be=`#version 300 es
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
out vec2 vU; void main() { vU = P[gl_VertexID] * 0.5 + 0.5; gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }`,Ro=`#version 300 es
precision highp float;
uniform sampler2D uC; uniform vec4 uD; uniform vec4 uG;
in vec2 vU; out vec4 o;
void main() {
  vec4 c0 = texture(uC, vU);
  float k0 = (c0.a * 2.0 - 1.0) * uD.z;
  vec3 acc = c0.rgb; float ws = 1.0;
  int N = int(uD.w);
  float j = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) * 6.2832;
  for (int i = 0; i < N; i++) {
    float fi = float(i) + 0.5, r = sqrt(fi / uD.w) * uD.z, a = fi * 2.39996 + j;
    vec4 s = textureLod(uC, vU + vec2(cos(a), sin(a)) * r * uD.xy, 0.0);
    float ks = (s.a * 2.0 - 1.0) * uD.z;
    float w = clamp(abs(ks) - r + 1.0, 0.0, 1.0);
    if (ks > k0 + 0.5) w *= clamp(abs(k0) - r + 1.0, 0.0, 1.0);
    acc += s.rgb * w; ws += w;
  }
  vec3 col = acc / ws;
  vec2 q = vU - 0.5;
  col *= 1.0 - dot(q, q) * uG.x;
  col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, uG.y);
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(41.31, 17.73))) * 24634.63) - 0.5) * uG.z;
  o = vec4(col, 1.0);
}`,Eo=o=>`#version 300 es
precision highp float;
#define SURF ${o}
uniform sampler2D uNoise; uniform vec4 uK; uniform vec4 uC1; uniform vec4 uC2; uniform vec4 uC3; uniform vec4 uMap;
in vec2 vU; out vec4 o;
float n2(vec2 p) { return texture(uNoise, p / 256.0).r; }
float h1(float x) { return fract(sin(x * 127.1 + 3.7) * 43758.5453); }
float fbm(vec2 p) { return n2(p) * 0.5 + n2(p * 2.03 + 17.0) * 0.25 + n2(p * 4.07 + 31.0) * 0.125 + n2(p * 8.1 + 5.0) * 0.0625; }
void main() {
  vec2 p = uMap.xy + vU * uMap.z;   // world x, z in metres
  vec3 col; float ht = 1.0;
#if SURF == 0 || SURF == 2
  // oak boards running away from the eye, flat-sawn figure, a hard polish
  float bw = uK.x, col_i = floor((p.x + uK.y) / bw), xl = fract((p.x + uK.y) / bw);
  float len = 1.1 + h1(col_i) * 0.9, off = h1(col_i + 7.0) * len;
  float row = floor((p.y + off) / len), zl = fract((p.y + off) / len);
  float id = h1(col_i * 13.1 + row * 7.7);
  float depth = 0.02 + 0.05 * id + 0.015 * sin(p.y * 1.7 + id * 40.0) + 0.03 * fbm(vec2(p.y * 3.0, col_i * 9.0 + id * 70.0));
  float acr = (xl - 0.25 - 0.5 * h1(col_i * 3.3 + row)) * bw;
  float d = length(vec2(acr, depth));
  float wob = fbm(vec2(p.y * 14.0 + id * 30.0, p.x * 160.0)) * 0.9;
  float ringv = fract(d * uK.w + wob + id * 9.0);
  float late = smoothstep(0.5, 0.9, ringv) * (1.0 - smoothstep(0.9, 1.0, ringv));
  float streak = n2(vec2(p.y * 9.0 + id * 50.0, p.x * 900.0)) * 0.55 + n2(vec2(p.y * 26.0 + id * 9.0, p.x * 2600.0)) * 0.45;
  float pores = smoothstep(0.6, 0.9, n2(vec2(p.y * 160.0, p.x * 3800.0) + id * 91.0));
  float rays = smoothstep(0.82, 0.95, n2(vec2(p.y * 40.0, p.x * 700.0) + id * 33.0)) * 0.5;
  col = mix(uC1.rgb, uC2.rgb, id * 0.7 + 0.3 * h1(col_i + row * 3.0));
  col *= 0.86 + 0.22 * streak;
  col = mix(col, uC3.rgb, late * 0.32 + pores * 0.12);
  col = mix(col, uC1.rgb * 1.12, rays);
  col *= 0.94 + 0.12 * fbm(p * vec2(40.0, 4.0) + id * 13.0);
  float eg = min(min(xl, 1.0 - xl) * bw, min(zl, 1.0 - zl) * len);
  ht = smoothstep(0.0003, 0.0011, eg);
  col *= mix(0.35, 1.0, ht);
  ht = ht * (0.985 + 0.015 * streak);
#if SURF == 2
  col *= 0.5;
#endif
#elif SURF == 1
  // slate flags: cleft layers, rust stains, mica glints, dark grout
  vec2 g = p / uK.x; float rowi = floor(g.y); g.x += h1(rowi) * 0.6;
  vec2 cell = floor(g), f = fract(g);
  float id = h1(cell.x * 17.3 + cell.y * 5.1);
  float eg = min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y)) * uK.x;
  float ang = id * 6.2832; vec2 dir = vec2(cos(ang), sin(ang));
  float lay = fbm(vec2(dot(p, dir) * 30.0, dot(p, vec2(-dir.y, dir.x)) * 3.0) + id * 40.0);
  float cleft = smoothstep(0.35, 0.65, fbm(p * 22.0 + id * 9.0 + lay * 2.0));
  float fine = n2(p * 900.0 + id * 9.0);
  col = mix(uC1.rgb, uC2.rgb, clamp(id * 0.8 + lay * 0.6 - 0.3, 0.0, 1.0));
  col *= 0.8 + 0.3 * cleft + 0.08 * fine;
  float rust = smoothstep(0.62, 0.8, fbm(p * 6.0 + id * 21.0)) * uK.z;
  col = mix(col, uC3.rgb, rust * 0.55);
  ht = smoothstep(0.001, 0.005, eg) * (0.6 + 0.4 * cleft) * (0.9 + 0.1 * lay);
  col = mix(vec3(0.05, 0.05, 0.055), col, smoothstep(0.0, 0.003, eg));
#else
  // tatami: woven rush (weft ridges, warp threads), a cloth border band
  float wf = p.y / 0.0021, wl = fract(wf), wi = floor(wf);
  float ridge = sin(wl * 3.14159);
  float warp = smoothstep(0.86, 1.0, abs(sin(p.x / 0.018 * 3.14159)));
  float fib = n2(vec2(p.x * 90.0, p.y * 40.0)) * 0.6 + n2(vec2(p.x * 260.0, p.y * 90.0)) * 0.4;
  float tone = h1(wi) * 0.15 + 0.85 * n2(vec2(p.x * 8.0, p.y * 3.0));
  col = mix(uC1.rgb, uC2.rgb, tone * 0.7 + fib * 0.3);
  col *= 0.82 + 0.2 * ridge;
  col = mix(col, col * 0.86, warp);
  ht = 0.5 + 0.35 * ridge * (1.0 - warp * 0.5) + 0.1 * fib;
  // border (heri): a dark woven band along z
  float bx = abs(p.x - uK.x) - 0.014;
  float band = 1.0 - smoothstep(-0.0004, 0.0004, bx);
  float bpat = 0.85 + 0.15 * sin((p.x + p.y) * 2600.0) * sin((p.x - p.y) * 2600.0);
  col = mix(col, uC3.rgb * bpat, band);
  ht = mix(ht, 0.95 + 0.03 * bpat, band);
  float seam = 1.0 - smoothstep(0.0, 0.0008, abs(p.y - uK.y));
  col *= 1.0 - seam * 0.6;
  ht *= 1.0 - seam * 0.8;
#endif
  o = vec4(clamp(col, 0.0, 1.0), clamp(ht, 0.0, 1.0));
}`,zo=o=>`#version 300 es
precision highp float;
#define LIGHT ${o}
uniform sampler2D uNoise; uniform vec4 uK; uniform vec4 uW;
in vec2 vU; out vec4 o;
float n2(vec2 p) { return texture(uNoise, p / 256.0).r; }
float box(vec2 p, vec2 a, vec2 b, float s) { vec2 q = smoothstep(a - s, a + s, p) * (1.0 - smoothstep(b - s, b + s, p)); return q.x * q.y; }
float seg(float x, float a, float b, float s) { return smoothstep(a - s, a + s, x) * (1.0 - smoothstep(b - s, b + s, x)); }
void main() {
  vec2 p = vec2((vU.x - 0.5) * uK.x, uK.y + vU.y * uK.z);  // wall metres: x, y (0 = table height)
  vec3 c;
#if LIGHT == 0
  // the back wall in the warm shade the window does not reach; at the left an open doorway onto a sunlit room, only a
  // soft bright field at this distance, its light spilling along the wall; a chair against the wall at the right as a
  // soft dark mass; the skirting a soft paler band. Nothing ruled: the lens has all of it far out of focus.
  float lf = smoothstep(1.2, -1.0, p.x);
  vec3 wall = vec3(0.135, 0.105, 0.075) * (0.62 + 0.5 * lf) * (0.85 + 0.25 * smoothstep(1.0, 0.0, p.y)) * (0.95 + 0.1 * n2(p * 3.0));
  float sk = (1.0 - smoothstep(0.07, 0.12, p.y)) * smoothstep(-0.02, 0.03, p.y);
  c = mix(wall, wall * 1.25 + vec3(0.01, 0.008, 0.006), sk);
  c *= mix(vec3(1.0), vec3(0.85, 0.66, 0.5), uK.w);
  float cx = p.x - 0.5;
  float chair = max(box(vec2(cx, p.y), vec2(-0.2, 0.36), vec2(0.2, 0.46), 0.04), box(vec2(cx, p.y), vec2(-0.21, 0.0), vec2(0.21, 0.42), 0.07) * 0.3);
  chair = max(chair, max(box(vec2(cx, p.y), vec2(-0.2, -0.05), vec2(-0.15, 0.4), 0.03), box(vec2(cx, p.y), vec2(0.15, -0.05), vec2(0.2, 0.4), 0.03)) * 0.85);
  chair = max(chair, box(vec2(cx, p.y), vec2(-0.18, 0.46), vec2(0.18, 0.95), 0.05) * 0.55);
  c = mix(c, vec3(0.045, 0.031, 0.02) * (0.8 + 0.4 * smoothstep(0.25, -0.25, cx)), chair * 0.85);
  float door = box(p, vec2(uW.x, -0.02), vec2(uW.z, 2.05), 0.05);
  vec3 sun = mix(vec3(0.95, 0.92, 0.86), vec3(1.0, 0.6, 0.3), uK.w);
  float gl0 = (0.55 + 0.45 * smoothstep(0.7, 0.0, p.y)) * (0.72 + 0.28 * smoothstep(uW.x, uW.z, p.x));
  float sunp = box(vec2(p.x - uW.z + 0.3 - (p.y - 0.3) * 0.5, p.y), vec2(0.0, 0.1), vec2(0.26, uW.w + 0.6), 0.07);
  c = mix(c, sun * (0.29 * gl0 + 0.15 * sunp) * mix(1.0, 0.8, uK.w), door);
  c += sun * 0.045 * exp(-pow(max(p.x - uW.z, 0.0) * 2.0, 2.0)) * smoothstep(1.4, 0.0, p.y) * (1.0 - door);
  // at evening the bright points of the room (a door handle, a glass on a sill, the chair's lacquered rail) swell into discs
  float dk = smoothstep(0.075, 0.06, length(p - vec2(uW.z + 0.16, 0.5))) + 0.8 * smoothstep(0.06, 0.047, length(p - vec2(0.68, 0.44)))
           + 0.6 * smoothstep(0.085, 0.068, length(p - vec2(-0.08, 0.62)));
  c += vec3(0.32, 0.2, 0.1) * dk * uK.w;
  c *= mix(0.5, 1.0, smoothstep(-0.6, 0.0, p.y));
#elif LIGHT == 1
  // a dim room in lamp light: a standard lamp against the wall at the right (its stem and foot; the linen shade is
  // above the picture and shows only in reflections), its light pooled on the wall, a sofa's bulk at the left, the
  // window behind it blue with dusk, and the room's bright points swollen into soft discs by the lens
  vec2 q = p - vec2(uW.x, 0.8);
  float pool = 1.0 / (1.0 + dot(q * vec2(1.0, 0.8), q * vec2(1.0, 0.8)) * 8.0);
  float cone = smoothstep(0.2, 0.9, abs(q.y) / (abs(q.x) + 0.12));
  vec3 wall = vec3(0.21, 0.12, 0.055) * pool * (0.3 + 0.7 * cone) * (0.9 + 0.2 * n2(p * 3.0)) + vec3(0.011, 0.008, 0.006);
  float sk = (1.0 - smoothstep(0.07, 0.12, p.y)) * smoothstep(-0.02, 0.03, p.y);
  c = mix(wall, wall * 1.4 + 0.003, sk);
  c = mix(c, vec3(0.028, 0.04, 0.075), box(p, vec2(-1.25, 0.3), vec2(-0.62, 1.5), 0.07));
  float hw = 0.15 - q.y * 0.18;
  float shd = (1.0 - smoothstep(hw - 0.03, hw + 0.03, abs(q.x))) * seg(q.y, -0.1, 0.12, 0.03);
  vec2 qb = q + vec2(0.0, 0.03);
  c = mix(c, vec3(0.8, 0.47, 0.2) * (0.22 + 0.78 * exp(-dot(qb, qb) * 60.0)) * (1.0 - 0.5 * smoothstep(0.7, 1.0, abs(q.x) / hw)), shd);
  float stand = max((1.0 - smoothstep(0.004, 0.03, abs(q.x))) * smoothstep(-0.08, -0.13, q.y), (1.0 - smoothstep(0.08, 0.13, abs(q.x))) * (1.0 - smoothstep(0.0, 0.05, p.y))) * smoothstep(-0.03, 0.01, p.y);
  c = mix(c, vec3(0.1, 0.065, 0.028) * (0.25 + pool * 2.0) * (0.6 + 0.8 * smoothstep(0.03, -0.03, q.x)), stand);
  float sofa = max(box(p, vec2(-1.6, 0.115), vec2(-0.2, 0.7), 0.05), (1.0 - smoothstep(0.02, 0.05, abs(p.x + 0.29))) * (1.0 - smoothstep(0.1, 0.16, p.y)) * smoothstep(-0.03, 0.01, p.y));
  c = mix(c, vec3(0.016, 0.012, 0.01) + vec3(0.07, 0.04, 0.02) * pool * smoothstep(-0.6, -0.2, p.x), sofa);
  float dk = smoothstep(0.07, 0.056, length(p - vec2(uW.x - 0.3, 0.46))) + 0.7 * smoothstep(0.06, 0.047, length(p - vec2(uW.x + 0.26, 0.2)))
           + 0.5 * smoothstep(0.08, 0.064, length(p - vec2(-0.5, 0.82))) + 0.6 * smoothstep(0.055, 0.044, length(p - vec2(0.05, 0.36)));
  c += vec3(0.3, 0.18, 0.08) * dk * (0.5 + pool);
#else
  // a dark room: a little haze where the beam falls
  c = vec3(0.004, 0.004, 0.005) + vec3(0.03, 0.03, 0.035) * exp(-pow(length(p - vec2(0.05, 0.4)), 2.0) * 2.0);
#endif
  c *= 0.97 + 0.06 * n2(p * 40.0);
  o = vec4(pow(clamp(c / 4.0, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
}`;function Fo(o,e,i){const c=o.length,n=[],d=[];for(let b=0;b<c;b++){const w=o[Math.max(0,b-1)],x=o[Math.min(c-1,b+1)];let f=x[0]-w[0],g=x[1]-w[1];const p=Math.hypot(f,g)||1;let E=f/p,F=-g/p;o[b][1]===0&&(E=0,F=b===0?-1:1),n.push(E),d.push(F)}const u=new Float32Array(c*i*8),m=new Uint16Array((c-1)*i*6);let v=0;for(let b=0;b<c;b++)for(let w=0;w<i;w++){const x=w/i*t0,f=Math.cos(x),g=Math.sin(x),p=o[b][1],E=o[b][0];u.set([p*f,E-e,p*g,n[b]*f,d[b],n[b]*g,E,p],v),v+=8}v=0;for(let b=0;b<c-1;b++)for(let w=0;w<i;w++){const x=b*i+w,f=b*i+(w+1)%i,g=x+i,p=f+i;m[v++]=x,m[v++]=g,m[v++]=f,m[v++]=f,m[v++]=g,m[v++]=p}return{v:u,idx:m}}const y0=o=>parseInt(o.slice(1),16),Mo={"Folk red":["#b0221b","#e8b425","#1d3a2a","#efe6cf","#121212","#2a6b3a"],"Sea blue":["#1d4f8a","#f1ece0","#c0392b","#6fa8c9","#14263f","#e3c46a"],Meadow:["#3f7d3a","#f0c83c","#e07a3a","#d75a7a","#f2ead2","#2f5aa0"],"Black and gold":["#161412","#c9a24a","#8a1c1c","#e9dcc0","#c9a24a","#2c2a28"]},Lo={"Folk red":[["#178a4e","#c8102e","#ecc74a"],["#c8102e","#1d8a50","#e8b425"],["#5b2a8e","#e8b425","#c8102e"],["#d6301c","#178a4e","#e8b425"],["#b00f3c","#22357a","#e9c24a"]],"Sea blue":[["#1d4f9a","#e8b425","#c0392b"],["#156f8f","#f1ece0","#1d2f6b"],["#2a3a8a","#c0392b","#e3c46a"],["#3b8fc2","#14263f","#f1ece0"],["#c0392b","#1d4f9a","#f1ece0"]],Meadow:[["#2f8a3a","#f0c83c","#d75a7a"],["#5a9a22","#e07a3a","#2f5aa0"],["#e8b820","#2f8a3a","#c0392b"],["#d75a7a","#2f7d3a","#f0c83c"],["#e07a3a","#2f5aa0","#f0c83c"]],"Black and gold":[["#171412","#c9a24a","#8a1c1c"],["#1e1a17","#8a1c1c","#c9a24a"],["#c9a24a","#171412","#8a1c1c"],["#2c2724","#c9a24a","#e9dcc0"],["#8a1c1c","#171412","#c9a24a"]]};Ce.add({num:79,name:"Spinning Tops",fam:"Worlds",recipe:"Real spinning tops on polished boards in window light, each one circling, nodding, standing still upright, wobbling out and rattling to rest like the real thing. The tops (wood, brass, ceramic, glass or tippe tops), the surface, the light, how many and the view change every mint. Flick a quick curl to spin a new one (faster flick, faster spin), tap one to nudge it, or hold to blow on them gently.",interactive:"Drag a quick curl to spin a new top (the faster the flick, the faster the spin). Tap a top to nudge it. Hold to blow gently on the tops.",music:!0,gl:!0,fps:30,seed:0,make(o){const e=o.gl,i=o.size,c=R0(o.hash,79),n={};n.tops=L0(c,[["Painted folk tops",38],["Brass tops",22],["Ceramic discs",16],["Glass tops",15],["Tippe tops",9]]),n.surface=L0(c,[["Polished oak",42],["Slate",26],["Mirror",22],["Tatami",10]]),n.light=L0(c,[["Window daylight",48],["Warm lamp",30],["Spotlight",22]]),n.count=L0(c,[["A crowd of five",60],["One master top",40]]),n.rare=L0(c,[["None",72],["A tippe top",9],["A steel disc",10],["A long sleeper",9]]),n.paint=L0(c,[["Folk red",34],["Sea blue",26],["Meadow",26],["Black and gold",14]]),n.finish=L0(c,[["Polished",70],["Aged",30]]),n.glass=L0(c,[["Clear",55],["Smoky",25],["Amber",20]]),n.glaze=L0(c,[["Cobalt on white",45],["Celadon",30],["Black slip",25]]);const d=R0(o.hash,7901);let u=n.light==="Window daylight"&&d()<.3&&!o.home;if(u&&(n.light="Evening sun"),o.home&&(n.tops="Painted folk tops",n.surface="Polished oak",n.light="Window daylight",n.count="A crowd of five",n.rare="None",n.paint="Folk red"),0&&!o.home){const a=[["Painted folk tops","Polished oak","Spotlight","One master top","None","From above"],["Glass tops","Mirror","Spotlight","One master top","None","Low and close"],["Ceramic discs","Tatami","Evening sun","A crowd of five","None","Low and close"],["Painted folk tops","Slate","Warm lamp","A crowd of five","None","Along the boards","Black and gold"],["Tippe tops","Polished oak","Window daylight","A crowd of five","None","Low and close"],["Painted folk tops","Polished oak","Window daylight","A crowd of five","None","Low and close","Sea blue"],["Painted folk tops","Polished oak","Window daylight","A crowd of five","A steel disc","From above","Meadow"]][(se.dbg=(se.dbg??-1)+1)%7];[n.tops,n.surface,n.light,n.count,n.rare,n.forceView]=a,a[6]&&(n.paint=a[6]),u=n.light==="Evening sun"}n.tops==="Tippe tops"&&n.rare==="A tippe top"&&(n.rare="None");const b=R0(o.hash,7907)();n.view=o.home||b<.6?"Low and close":b<.8?"From above":"Along the boards",n.forceView&&(n.view=n.forceView),n.view==="From above"&&n.surface==="Mirror"&&(n.view="Low and close");const w={"Low and close":0,"From above":1,"Along the boards":2}[n.view],x=so[w],f=x.EYE,g=x.VP,p=x.project,E=x.floorAt,F={"Painted folk tops":D0,"Brass tops":n0,"Ceramic discs":f0,"Glass tops":V0,"Tippe tops":s0}[n.tops],_={"Polished oak":0,Slate:1,Mirror:2,Tatami:3}[n.surface],q={"Window daylight":0,"Evening sun":0,"Warm lamp":1,Spotlight:2}[n.light],D=n.count==="A crowd of five";o.trait("Tops",n.tops),o.trait("Surface",n.surface),o.trait("Light",n.light),o.trait("Count",n.count);const M=F===n0?"Finish":F===V0?"Glass":F===f0?"Glaze":"Paint",k=F===n0?n.finish:F===V0?n.glass:F===f0?n.glaze:n.paint;o.trait(M,k),o.trait("Something rare",n.rare),o.trait("View",n.view);const U=[{mu:1,rp:1},{mu:1.15,rp:1.3},{mu:.75,rp:.8},{mu:1.4,rp:2.2}][_],C=8,A=[],O=Mo[n.paint].map(y0);let J=0;const Z=(a,s)=>{const r={design:0,seed:s(),cols:[0,0,0]};if(a===D0||a===s0){const t=J++;r.design=(t+Math.floor(s()*4))%4;let h=0;for(let R=5;R>0;R--){const y=s();R===5&&(h=y)}const l=Lo[n.paint],z=l[(D?t:Math.floor(h*5))%5];r.cols=z.map(y0)}else if(a===n0)r.design=n.finish==="Aged"?1:0;else if(a===V0){r.design={Clear:0,Smoky:1,Amber:2}[n.glass];const t=O.slice(),h=Math.floor(s()*6);r.cols=[t[h],t[(h+2)%6],t[(h+3)%6]]}else a===f0&&(r.design={"Cobalt on white":0,Celadon:1,"Black slip":2}[n.glaze],r.cols=r.design===0?[y0("#e9e6dc"),y0("#1f3f8f"),y0("#1f3f8f")]:r.design===1?[y0("#9fb8a2"),y0("#5e7a66"),y0("#c8d4c4")]:[y0("#a4562e"),y0("#141110"),y0("#e0c9a0")]);return r},G=(a,s,r,t)=>{const h=t.rr||c,l=t.s||(.88+h()*.24)*[1,1.25,1,1.05,1.15,1][a],z=t.sleeper?{rp:j[a].rp*l*.12,air:7e-4}:null,R=lo(a,l,U,z),y={b:R,kind:a,x:0,y:0,z:0,vx:0,vy:0,vz:0,Lx:0,Ly:0,Lz:0,qw:1,qx:0,qy:0,qz:0,ax:0,ay:1,az:0,wx:0,wy:0,wz:0,nC:0,rimC:0,cx:s,cz:r,still:0,sleep:0,fade:1,dying:!1,leaving:!1,kicked:0,born:P,hum:0,ph:0,az0:0,cphase:0,look:t.look||Z(a,h),sleeper:!!t.sleeper};if(t.sleeper&&(y.look={design:4,seed:h(),cols:[0,0,0]}),y.phase0=h()*t0,a===f0||a===h0){const B=t.tilt??.45+h()*.3;qe(y,s,r,B,t.ph??h()*t0,0,t.lift||0),uo(y,Math.sqrt(4*A0/(R.R*Math.sin(B)))*(t.dir||1)*(t.boost||1))}else qe(y,s,r,t.tilt??.08+h()*.22,t.ph??h()*t0,(t.w??200)*(t.dir||1),t.lift||0);return t.vx&&(y.vx=t.vx,y.vz=t.vz),A.push(y),y},d0=(a,s,r)=>{for(const t of A)if(!t.dying&&Math.hypot(t.x-a,t.z-s)<t.b.R+r+.012)return!1;return!0};let p0=.2;const v0=w===1?.14:.32,c0=(a,s,r)=>{const t=p(a,0,s),h=p(a,r,s);return t[0]>p0&&t[0]<1-p0&&t[1]<.86&&h[1]>v0};let P=0;const H=R0(o.hash,501),W=R0(o.hash,7903),r0=n.rare==="A tippe top"?s0:n.rare==="A steel disc"?h0:-1,z0=a=>a===s0?320:a===n0?210+H()*50:a===f0||a===h0?38+H()*14:170+H()*70;if(D){const a=[F,F,F,F,F];r0>=0&&(a[2]=r0);let s=0;for(let r=0;r<300&&s<5;r++){r===150&&(p0=.12);let t=-.16+H()*.28,h=(H()-.5)*(.2+(.2-t)*.3);w===2&&(h=.004+h*.1+(s&1?.012:-.012),t=.13-s*.12+(t+.02)*.12);const l=a[s],z=j[l].R*1.1;if(!c0(h,t,j[l].H)||!d0(h,t,z+(l===s0?.035:.012)))continue;const R=s===3&&l!==s0&&l!==h0,y=n.rare==="A long sleeper"&&s===2,S={rr:H,w:R?128:z0(l),sleeper:y,tilt:l===f0||l===h0?R?.25:void 0:l===s0?.006:.06+H()*.25},B=l===D0||l===n0||l===V0;B&&!y&&s===3&&(S.w=(l===n0?92:122)+W()*6,S.tilt=.22),B&&!y&&s===0&&(S.w=(l===n0?30:60)+W()*8,S.tilt=.4),G(y?D0:l,h,t,S),s++}p0=.2}else{const a=r0>=0?r0:F;G(n.rare==="A long sleeper"?D0:a,.004,a===s0?-.04:.05,{rr:H,s:a===h0||a===s0?1.2:a===n0?1.5:1.3,w:z0(a),sleeper:n.rare==="A long sleeper",tilt:a===f0||a===h0?void 0:a===s0?.006:.16})}const $=[],K={0:1250,1:2350,2:1900,3:3100,4:1150,5:2700},b0=(a,s,r,t)=>{if(!o.sound.on)return;const h=K[s.kind]/Math.sqrt(s.b.s);a===1?$.length<24&&$.push({f:h*(.9+.2*(s.cphase*7.3%1)),a:Math.min(.5,r*.9),d:Math.exp(-1/(22050*(s.kind===n0||s.kind===h0?.09:.025))),p:0}):a===2&&$.length<22?($.push({f:h,a:Math.min(.8,r*1.4),d:Math.exp(-1/(22050*.05)),p:0}),$.push({f:K[t.kind]*1.07,a:Math.min(.7,r*1.2),d:Math.exp(-1/(22050*.05)),p:0})):a===3&&$.length<24&&$.push({f:h*.5,a:Math.min(.25,r),d:Math.exp(-1/(22050*.012)),p:0})};let m0=!1,V=null,k0=-99,Y=null;const U0=R0(o.hash,777),Q=[],le=(a,s)=>{let r=null,t=.07;for(const h of A){if(h.dying)continue;const l=p(h.x,h.y+h.b.R*.3,h.z),z=Math.hypot(l[0]-a,l[1]-s);z<t&&(t=z,r=h)}return r},N0=a=>{const s=a.x-f[0],r=a.z-f[2],t=Math.hypot(s,r)||1,h=a.y+a.b.R*.4,l=a.b.m*(.22+.08*U0());H0(a,a.x-s/t*a.b.R,h,a.z-r/t*a.b.R,s/t*l,.02*l,r/t*l),i0(a),b0(3,a,.4)},ge=a=>{let s=0;for(const t of A)!t.dying&&!t.leaving&&s++;if(s<C-1&&!a)return!0;let r=null;for(const t of A)!t.dying&&!t.leaving&&(t.sleep||ee(t)<20)&&(!r||Math.hypot(t.x*2,t.z)>Math.hypot(r.x*2,r.z))&&(r=t);if(!r)for(const t of A)!t.dying&&!t.leaving&&(!r||t.born<r.born)&&(r=t);return r&&(r.leaving=!0,Oe(r)),!0},ee=a=>Math.abs(a.wx*a.ax+a.wy*a.ay+a.wz*a.az),Oe=a=>{const s=p(a.x,0,a.z)[0]<.5?-1:1,r=a.b.m;a.sleep=0,a.still=0,a.kicked=P,H0(a,a.x,a.y+a.b.R*.3,a.z,s*r*1.15,r*.22,(U0()-.5)*r*.3),i0(a),b0(3,a,.5)},Ao=()=>F,Ve=(a,s,r,t,h,l,z)=>{const[R,y]=E(T0(a,.05,.95),T0(s,.35,.97),0);if(y<-.7||y>.3)return null;ge();const S=z??Ao(),B=S===f0||S===h0;return G(S,R,y,{rr:U0,w:S===s0?Math.max(r,300):r,dir:t,lift:.004,tilt:B?T0(.9-r/500,.3,.8):S===s0?.006:.05+U0()*.18,vx:h,vz:l})},Po=()=>{const a=o.input,s=a.taps();if(!a.inside&&!s.length&&!m0){Y=null;return}if(a.down&&!m0&&(V={x:a.x,y:a.y,t:P,moved:!1},Q.length=0,Q.push([a.x,a.y,P]),k0=P),a.down&&V){k0=P;const r=Q[Q.length-1];if(Math.hypot(a.x-r[0],a.y-r[1])>.004&&Q.push([a.x,a.y,P]),!V.moved&&Math.hypot(a.x-V.x,a.y-V.y)>.03&&(V.moved=!0),!V.moved&&P-V.t>.3){const[t,h]=E(a.x,T0(a.y,.3,1),0);Y={x:t,z:h,sx:a.x,sy:a.y,k:Math.min(1,(P-V.t-.3)*2)}}else Y=null}if(!a.down&&m0&&V){const r=P-V.t;if(!V.moved&&r<.3){const t=le(V.x,V.y);t?N0(t):Ve(V.x,V.y,150,1,0,0)}else if(V.moved&&Q.length>2){let t=0,h=0,l=0,z=0;for(let o0=1;o0<Q.length;o0++){const S0=Q[o0-1],x0=Q[o0];if(t+=Math.hypot(x0[0]-S0[0],x0[1]-S0[1]),l+=x0[0],z+=x0[1],o0>1){const ne=Q[o0-2],Ne=Math.atan2(S0[1]-ne[1],S0[0]-ne[0]);let C0=Math.atan2(x0[1]-S0[1],x0[0]-S0[0])-Ne;for(;C0>Math.PI;)C0-=t0;for(;C0<-Math.PI;)C0+=t0;h+=C0}}const R=Q.length-1;l/=R,z/=R;const y=Q[R],S=Q[Math.max(0,R-3)],B=Math.max(1/60,y[2]-S[2]),l0=t/Math.max(.05,r),w0=T0(90+l0*160,100,320),X=(y[0]-S[0])/B,F0=(y[1]-S[1])/B;Ve(Math.abs(h)>2?l:y[0],Math.abs(h)>2?z:y[1],w0,h>=0?-1:1,T0(X*.05,-.15,.15),T0(F0*.08,-.15,.15))}V=null,Y=null}else if(!a.down&&!m0&&s.length)for(const r of s){const t=le(r.x,r.y);t&&N0(t)}m0=a.down},e0=R0(o.hash,902);let we=6+e0()*4;const _o=()=>{if(P-k0<10||P<we)return;let a=0;for(const t of A)!t.dying&&ee(t)>30&&t.rimC<2&&a++;if(a>=(D?3:1)){we=P+2;return}let r=!1;for(let t=0;t<30;t++){const h=-.12+e0()*.3,l=(e0()-.5)*(.18+(.2-h)*.28);if(!c0(l,h,.06)||!d0(l,h,.045))continue;const z=M0=>A.some(O0=>!O0.dying&&Math.abs(O0.z-h)<O0.b.R+.05&&(O0.x-l)*M0>-.03);let R=l<0?-1:1;z(R)&&(R=-R),z(R)&&(R=0),ge();let y=F;r0>=0&&e0()<(D?.3:.5)&&(y=r0);const S=n.rare==="A long sleeper"&&e0()<.3,B=y===f0||y===h0,l0=R?R*((.55-h)*.2493+.05):l,w0=Math.max(.07,Math.abs(l0-l)),X=R?B?.006:.012:.003,F0=Math.sqrt(2*X/A0),o0=j[y].mu*U.mu,S0=j[y].e,x0=B?.003:.3,ne=o0*(1+S0)*A0*F0/(1-S0),Ne=M0=>1.5*F0*(M0+ne)+(M0>x0?(M0*M0-x0*x0)/(2*o0*A0)+x0*x0/(o0*A0):M0*x0/(o0*A0));let Se=0,C0=1.4;for(let M0=0;M0<12;M0++){const O0=(Se+C0)/2;Ne(O0)<w0?Se=O0:C0=O0}const Go=R?C0+ne:0;G(S?D0:y,l0,h,{rr:e0,s:D?void 0:y===n0?1.5:1.3,w:z0(y),lift:X,sleeper:S,dir:e0()<.5?1:-1,tilt:y===s0?.006:B?void 0:.03+e0()*.08,vx:-R*Go,vz:(e0()-.5)*.12*Math.abs(R)}),r=!0;break}!r&&!a&&ge(!0),we=P+(D?2.5+e0()*e0()*16:4+e0()*6)};let ye=0,ko=0;const G0=[e0()*t0,e0()*t0,e0()*t0,9e-4+e0()*4e-4],Uo=(a,s)=>[G0[3]*(Math.cos(a*19+G0[0])*.7+Math.cos((a-s)*27+G0[2])*.4),G0[3]*(Math.cos(s*17+G0[1])*.7+Math.cos((a+s)*25+G0[2])*.4)],No=a=>{ye+=a;let s=Math.floor(ye/P0);ye-=s*P0,s=Math.min(s,120);const r=A.length;for(let t=0;t<s;t++){for(let h=0;h<r;h++){const l=A[h];if(l.sleep&&Y&&Y.k*Math.exp(-((l.x-Y.x)**2+(l.z-Y.z)**2)/.012)>.2&&(l.sleep=0,l.still=0),l.sleep)continue;const z=Uo(l.x,l.z);if(l.vx-=A0*z[0]*P0,l.vz-=A0*z[1]*P0,Y){const R=l.x-Y.x,y=l.z-Y.z,S=R*R+y*y,B=Y.k*Math.exp(-S/.012);if(B>.01){const l0=l.x-f[0],w0=l.z-f[2],X=Math.hypot(l0,w0)||1,o0=1.2*(l.b.R*l.b.H)*11*B;H0(l,l.x,l.y+l.b.R*.7,l.z,(l0/X*.8+R*3)*o0*P0,0,(w0/X*.8+y*3)*o0*P0)}}fo(l,P0,b0)}for(let h=0;h<r;h++)for(let l=h+1;l<r;l++){const z=A[h],R=A[l];z.sleep&&R.sleep||Math.abs(z.x-R.x)>z.b.R+R.b.R+.06||Math.abs(z.z-R.z)>z.b.R+R.b.R+.06||ho(z,R,P0,b0)}}ko+=s*P0;for(const t of A){const h=Math.hypot(t.vx,t.vy,t.vz)+Math.hypot(t.wx,t.wy,t.wz)*.03;t.sleep||(h<.004&&t.rimC+(t.nC>1?1:0)>=2?t.still+=a:t.still=0,t.still>.8&&(t.sleep=1,t.vx=t.vy=t.vz=0,t.Lx=t.Ly=t.Lz=0,i0(t))),t.leaving&&!t.dying&&(t.sleep||P-t.kicked>3)&&Oe(t),t.dying&&(t.fade-=a*2.5);const l=p(t.x,0,t.z);!t.dying&&P-t.born>1.5&&(l[0]<-.15||l[0]>1.15||l[1]>1.3||t.z<-1||t.y<-.2)&&(t.dying=!0),(t.x!==t.x||t.qw!==t.qw)&&(t.dying=!0,t.fade=0,t.x=0,t.y=0,t.z=0,t.qw=1,t.qx=t.qy=t.qz=0,t.Lx=t.Ly=t.Lz=0,t.sleep=1)}for(let t=A.length-1;t>=0;t--)A[t].fade<=0&&A.splice(t,1)},oe=22050,I0=new Float32Array(4096);let Te=0,W0=22222,$0=0;const So=a=>{if(!o.sound.on){$.length=0;return}Te+=a*oe;let s=Math.floor(Te);if(Te-=s,s=Math.min(s,I0.length),!(s<=0)){I0.fill(0,0,s);for(const r of A){if(r.fade<.05)continue;const t=ee(r),l=r.nC>0&&r.rimC<2?Math.min(1,t/160)*(r.kind===n0?.16:r.kind===V0?.14:.12)*r.fade:0,z=Math.acos(T0(Math.abs(r.ay),0,1)),R=55+t*.95*(r.kind===n0?1.25:1),y=t0*R/oe,S=Math.atan2(r.az,r.ax);let B=r.hum;const l0=l,w0=Math.min(.8,z*3);for(let X=0;X<s;X++){const F0=B+(l0-B)*X/s;r.ph+=y,r.ph>t0&&(r.ph-=t0),W0=W0*1103515245+12345&2147483647;const o0=W0/2147483647-.5;$0+=(o0-$0)*.08,I0[X]+=F0*(Math.sin(r.ph)*.6+Math.sin(r.ph*2)*.25+$0*1.4*Math.min(1,t/200))*(1-w0*.5+w0*.5*Math.sin(S+r.ph*.02))}if(r.hum=l0,(r.kind===f0||r.kind===h0)&&r.nC===1&&r.rimC===1&&z<.6){let X=S-r.az0;for(;X>Math.PI;)X-=t0;for(;X<-Math.PI;)X+=t0;for(r.az0=S,r.cphase+=Math.abs(X)/Math.PI;r.cphase>1;)r.cphase-=1,$.length<24&&$.push({f:K[r.kind]*(.7+z),a:.06+.25*(1-z/.6),d:Math.exp(-1/(oe*.008)),p:0})}else r.az0=Math.atan2(r.az,r.ax)}if(Y)for(let r=0;r<s;r++)W0=W0*1103515245+12345&2147483647,$0+=(W0/2147483647-.5-$0)*.05,I0[r]+=$0*.5*Y.k;for(let r=$.length-1;r>=0;r--){const t=$[r],h=t0*t.f/oe;for(let l=0;l<s;l++)I0[l]+=t.a*(Math.sin(t.p)+.3*Math.sin(t.p*2.76)),t.p+=h,t.a*=t.d;t.a<.002&&$.splice(r,1)}for(let r=0;r<s;r++)I0[r]=Math.tanh(I0[r]);o.sound.pcm(I0.subarray(0,s),oe,{vel:.6})}},T={},q0=R0(o.hash,333);if(q===0){const a=(.4+q0()*.08)*(u?.46:1),s=-2.75+(q0()-.5)*.3;T.dir=[Math.cos(a)*Math.cos(s),Math.sin(a),Math.cos(a)*Math.sin(s)],T.col=u?[6.2,3.7,1.7]:[3,3.08,3.2],T.up=u?[.13,.16,.25]:[.17,.16,.15],T.dn=u?[.1,.07,.05]:[.13,.095,.062],T.exp=u?1.05:.95,T.type=0}else if(q===1)T.pos=[.3+q0()*.06,.26,-.08],T.col=[.62,.4,.19],T.up=[.012,.022,.06],T.dn=[.016,.011,.007],T.exp=2,T.type=1;else{T.pos=[.04,.82,.22],T.col=[2.3,2.15,1.95],T.up=[.006,.006,.008],T.dn=[.004,.004,.004],T.exp=1.15,T.type=2;const a=[0-T.pos[0],-T.pos[1],0-T.pos[2]],s=Math.hypot(...a);T.sdir=a.map(r=>r/s)}let Re;if(T.type===0){const a=[0,.02,-.15],s=[a[0]+T.dir[0],a[1]+T.dir[1],a[2]+T.dir[2]],r=E0.look(s,a,[0,1,0]);let t=1e9,h=-1e9,l=1e9,z=-1e9,R=1e9,y=-1e9;for(const S of[-.35,.35])for(const B of[0,.1])for(const l0 of[-.75,.3]){const w0=r[0]*S+r[4]*B+r[8]*l0+r[12],X=r[1]*S+r[5]*B+r[9]*l0+r[13],F0=r[2]*S+r[6]*B+r[10]*l0+r[14];t=Math.min(t,w0),h=Math.max(h,w0),l=Math.min(l,X),z=Math.max(z,X),R=Math.min(R,F0),y=Math.max(y,F0)}Re=E0.mul(E0.ortho(t,h,l,z,-y-.05,-R+.05),r),T.half=[(h-t)/2,(z-l)/2]}else{const a=E0.look(T.pos,[0,0,-.12],[0,1,0]);Re=E0.mul(E0.persp(T.type===2?.75:1.6,.05,3),a),T.half=[1,1]}let K0=se.get(e);K0||(K0={progs:new Map},se.set(e,K0));const fe=new Set([F]);r0>=0&&fe.add(r0),n.rare==="A long sleeper"&&fe.add(D0);const Co={wood:po,metal:mo,ceramic:xo,glass:vo},Y0={sh:[Be,bo],floor:[go,wo],room:[yo,To],dof:[be,Ro],bakeF:[be,Eo(_===2?2:_)],bakeR:[be,zo(q)]};for(const a of fe)Y0["m_"+j[a].mat]=[Be,Co[j[a].mat]];const N={},Ee=[];for(const a in Y0){const s=Y0[a][0]+""+Y0[a][1];let r=K0.progs.get(s);if(!r){r=e.createProgram();for(const[t,h]of[[e.VERTEX_SHADER,Y0[a][0]],[e.FRAGMENT_SHADER,Y0[a][1]]]){const l=e.createShader(t);e.shaderSource(l,h),e.compileShader(l),e.attachShader(r,l),r["s"+t]=l}Ee.push([a,r,s])}N[a]=r}for(const[,a]of Ee)e.linkProgram(a);for(const[a,s,r]of Ee){if(!e.getProgramParameter(s,e.LINK_STATUS)){const h=e.getProgramInfoLog(s)+" "+e.getShaderInfoLog(s["s"+e.VERTEX_SHADER])+" "+e.getShaderInfoLog(s["s"+e.FRAGMENT_SHADER]);throw new Error("079 shader "+a+": "+h.slice(0,800))}s.u={},K0.progs.set(r,s);const t=e.getUniformBlockIndex(s,"Scene");t!==e.INVALID_INDEX&&t!==4294967295&&e.uniformBlockBinding(s,t,6)}const I=(a,s)=>s in a.u?a.u[s]:a.u[s]=e.getUniformLocation(a,s),Do=88+C*24,L=new Float32Array(Do),ze=e.createBuffer(),Fe=_===1||_===3?-1.6:-2.2;L.set(g,0),L.set(Re,16),L.set([f[0],f[1],f[2],T.exp],32),L.set(T.type===0?[T.dir[0],T.dir[1],T.dir[2],0]:[0,1,0,T.type],36),L.set([T.col[0],T.col[1],T.col[2],(T.type===0?1.2:1.6)/2048],40),L.set(T.type?[T.pos[0],T.pos[1],T.pos[2],Math.cos(.3)]:[0,0,0,0],44),L.set(T.type===2?[T.sdir[0],T.sdir[1],T.sdir[2],.035]:[0,-1,0,.05],48),L.set([T.up[0],T.up[1],T.up[2],0],52),L.set([T.dn[0],T.dn[1],T.dn[2],0],56);let te=9;for(const a of A){const s=f[2]-a.z,r=f[0]-a.x,t=Math.hypot(r,s)||1;te=Math.min(te,Math.hypot(r-r/t*a.b.R*.8,f[1]-a.b.Hc-.004,s-s/t*a.b.R*.8))}te>8&&(te=Math.hypot(f[0],f[1]-.03,f[2]-.04)),L.set([te,2.3,0,0],60);const he=[.22+q0()*.06,.3+q0()*.08],Io=.012+q0()*.005;L.set([he[0],he[1],Io,.011],64),L.set([q0()*he[0],q0()*he[1],T.half[0],T.half[1]],68),L.set([Fe,4.4,-.6,2.2],72);const qo=[[.13,.05,18,0],[.66,.024,6,0],[.13,.05,18,1],[.6,.02,22,0]][_];L.set(qo,76),L.set([.21,-.18,.34,0],80);const ue=[-.7,-1.2],Xe=1.4,ae=i>600?2048:1024;L.set([ue[0],ue[1],Xe,1/ae],84),e.bindBuffer(e.UNIFORM_BUFFER,ze),e.bufferData(e.UNIFORM_BUFFER,L,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null);const Me=e.createTexture();{const a=new Uint8Array(262144),s=R0(o.hash,31);for(let r=0;r<a.length;r++)a[r]=s()*256|0;e.bindTexture(e.TEXTURE_2D,Me),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.generateMipmap(e.TEXTURE_2D)}const de=(a,s,r,t)=>{const h=e.createTexture();return e.bindTexture(e.TEXTURE_2D,h),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,a,s,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,t||e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,t||e.CLAMP_TO_EDGE),h},He=e.createVertexArray(),Bo=e.createFramebuffer(),Ke=(a,s,r,t,h)=>{e.bindFramebuffer(e.FRAMEBUFFER,Bo),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.viewport(0,0,s,r),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.useProgram(t),e.bindVertexArray(He),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,Me),e.uniform1i(I(t,"uNoise"),0),h(t),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,a),e.generateMipmap(e.TEXTURE_2D)},Le=a=>{const s=parseInt(a.slice(1),16);return[(s>>16&255)/255,(s>>8&255)/255,(s&255)/255,1]},Ge=de(ae,ae,e.LINEAR_MIPMAP_LINEAR,e.REPEAT),We=e.getExtension("EXT_texture_filter_anisotropic");We&&e.texParameterf(e.TEXTURE_2D,We.TEXTURE_MAX_ANISOTROPY_EXT,8);const g0=R0(o.hash,444);Ke(Ge,ae,ae,N.bakeF,a=>{let s,r;_===0?(r=[["#8f6d4e","#735538","#45311f"],["#9c7a58","#80603f","#553c26"],["#7a5a3e","#5f452c","#3a2818"]][Math.floor(g0()*3)],s=[.12+g0()*.05,.03+g0()*.06,0,130]):_===1?(r=[["#4e555e","#3c424a","#6a5c4c"],["#53565b","#3f4246","#605446"],["#49525c","#373f48","#5c5044"]][Math.floor(g0()*3)],s=[.3+g0()*.12,0,.6+g0()*.4,0]):_===2?(r=["#5e3a24","#4a2c1a","#2a170c"],s=[.14,.05,0,140]):(r=["#b4a86c","#98894e","#1c1a1e"],s=[-.17+g0()*.06,-.62,0,0]),e.uniform4fv(I(a,"uK"),s),e.uniform4fv(I(a,"uC1"),Le(r[0])),e.uniform4fv(I(a,"uC2"),Le(r[1])),e.uniform4fv(I(a,"uC3"),Le(r[2])),e.uniform4fv(I(a,"uMap"),[ue[0],ue[1],Xe,0])});const Ae=i>600?1024:512,$e=Ae/2,Ye=de(Ae,$e,e.LINEAR_MIPMAP_LINEAR);Ke(Ye,Ae,$e,N.bakeR,a=>{e.uniform4fv(I(a,"uK"),[4.4,-.6,2.2,u?1:0]);const s=q===0?[-.95-g0()*.3,-.02+g0()*.05,-.2-g0()*.2,.42+g0()*.1]:q===1?[.55+g0()*.2,.3,0,0]:[0,0,0,0];e.uniform4fv(I(a,"uW"),s)});const pe=i>600?2048:1024,Pe=e.createTexture();e.bindTexture(e.TEXTURE_2D,Pe),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT16,pe,pe,0,e.DEPTH_COMPONENT,e.UNSIGNED_SHORT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_COMPARE_FUNC,e.LEQUAL),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const je=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,je),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Pe,0),e.drawBuffers([e.NONE]),e.readBuffer(e.NONE);const j0=_===2?i:Math.ceil(i/2),Qe=de(j0,j0,e.LINEAR),Je=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,Je),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT16,j0,j0);const Ze=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,Ze),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Qe,0),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,Je);const _e=de(i,i,e.LINEAR),Oo=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,Oo),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,_e,0),e.bindFramebuffer(e.FRAMEBUFFER,null);const eo={},ke=new Set(fe);for(const a of ke){const s=j[a],r=a===f0||a===h0?64:56,t=Fo(s.prof,s.hcm,r),h=e.createVertexArray();e.bindVertexArray(h);const l=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,t.v,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,32,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,32,12),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,2,e.FLOAT,!1,32,24);const z=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,z),e.bufferData(e.ELEMENT_ARRAY_BUFFER,t.idx,e.STATIC_DRAW),eo[a]={vao:h,n:t.idx.length}}const oo=a=>{const s=e.createVertexArray();e.bindVertexArray(s);const r=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),s},Vo=oo([-2.5,.65,2.5,.65,-2.5,Fe,2.5,Fe]),to=oo([-2.2,-.6,2.2,-.6,-2.2,1.6,2.2,1.6]);e.bindVertexArray(null);const ao={},ro=()=>{K0.owner=ao;for(const a in N)(a.startsWith("m_")||a==="sh")&&(e.useProgram(N[a]),e.uniform1i(I(N[a],"uNoise"),0),e.uniform1i(I(N[a],"uShadow"),1),e.uniform1i(I(N[a],"uFloorT"),2),e.uniform1i(I(N[a],"uRoomT"),3));e.useProgram(N.floor),e.uniform1i(I(N.floor,"uShadow"),1),e.uniform1i(I(N.floor,"uFloorT"),2),e.uniform1i(I(N.floor,"uRoomT"),3),e.uniform1i(I(N.floor,"uRefl"),4),e.uniform4fv(I(N.floor,"uRS"),[1/i,1/i,[.035,.04,.035,.05][_],0]),e.useProgram(N.room),e.uniform1i(I(N.room,"uRoomT"),3),e.useProgram(N.dof),e.uniform1i(I(N.dof,"uC"),0),e.uniform4fv(I(N.dof,"uD"),[1/i,1/i,i*.016,i>600?32:18]),e.uniform4fv(I(N.dof,"uG"),[.1,1.02,.0025,0])};ro();const Xo=1/40,re=[],B0=[],Ho=()=>{re.length=0;for(const s of ke)for(const r of A)r.kind===s&&re.push(r);for(const s of A)ke.has(s.kind)||re.push(s);B0.length=0;let a=Math.min(re.length,C);for(let s=0;s<a;s++){const r=re[s],t=88+s*24,h=r.b.s,l=r.qw,z=r.qx,R=r.qy,y=r.qz;L[t]=1-2*(R*R+y*y),L[t+1]=2*(z*R+l*y),L[t+2]=2*(z*y-l*R),L[t+3]=h,L[t+4]=2*(z*R-l*y),L[t+5]=1-2*(z*z+y*y),L[t+6]=2*(R*y+l*z),L[t+7]=Math.min(ee(r)*Xo,40),L[t+8]=2*(z*y+l*R),L[t+9]=2*(R*y-l*z),L[t+10]=1-2*(z*z+R*R),L[t+11]=r.look.design+r.look.seed*.999,L[t+12]=r.x,L[t+13]=r.y,L[t+14]=r.z,L[t+15]=T0(r.fade,0,1),L[t+16]=r.look.cols[0],L[t+17]=r.look.cols[1],L[t+18]=r.look.cols[2],L[t+19]=r.kind,L[t+20]=r.cx,L[t+21]=Math.max(0,r.y-r.b.hcm*Math.abs(r.ay)*.5),L[t+22]=r.cz,L[t+23]=r.b.R,!B0.length||B0[B0.length-1].k!==r.kind?B0.push({k:r.kind,base:s,n:1}):B0[B0.length-1].n++}L[63]=a,e.bindBuffer(e.UNIFORM_BUFFER,ze),e.bufferData(e.UNIFORM_BUFFER,L,e.DYNAMIC_DRAW)},Ue=(a,s)=>{for(const r of B0){const t=s?N.sh:N["m_"+j[r.k].mat],h=eo[r.k];!t||!h||(e.useProgram(t),e.uniform1i(I(t,"uBase"),r.base),e.uniform1f(I(t,"uMir"),a),e.bindVertexArray(h.vao),e.drawElementsInstanced(e.TRIANGLES,h.n,e.UNSIGNED_SHORT,0,r.n))}},no=()=>{K0.owner!==ao&&ro(),Ho(),e.bindBufferBase(e.UNIFORM_BUFFER,6,ze),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),e.depthMask(!0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,Me),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Ge),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Ye),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,je),e.viewport(0,0,pe,pe),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.DEPTH_BUFFER_BIT),e.enable(e.POLYGON_OFFSET_FILL),e.polygonOffset(1.5,3),e.disable(e.CULL_FACE),Ue(2,!0),e.disable(e.POLYGON_OFFSET_FILL),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Pe),e.bindFramebuffer(e.FRAMEBUFFER,Ze),e.viewport(0,0,j0,j0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),Ue(-1,!1),e.useProgram(N.room),e.uniform1f(I(N.room,"uMir"),-1),e.bindVertexArray(to),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,i,i),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),Ue(1,!1),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,Qe),e.useProgram(N.floor),e.bindVertexArray(Vo),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.useProgram(N.room),e.uniform1f(I(N.room,"uMir"),1),e.bindVertexArray(to),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,_e),e.copyTexSubImage2D(e.TEXTURE_2D,0,0,0,0,0,i,i),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,i,i),e.disable(e.DEPTH_TEST),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,_e),e.useProgram(N.dof),e.bindVertexArray(He),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)},Ko=(a,s)=>{s=T0(s||1/30,0,.1),P+=s,Po(),_o(),No(s),So(s),no()};return o.debug&&(o.debug.st={tops:A,T:n,project:p,floorAt:E,get clock(){return P},KIND:j,spinOf:ee}),no(),Ko}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
