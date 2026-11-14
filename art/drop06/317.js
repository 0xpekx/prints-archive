// Slow Lightning: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/317.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Re){Re&&Re.add({num:317,name:"Slow Lightning",fam:"Worlds",recipe:"A lightning strike in slow motion. A branching leader steps down out of the cloud, sparks climb off a mast or a tree to meet it, and when one touches, a bright stroke lights up the cloud and the ground. What's standing in the field and how far away it is change every mint. Tap to send a new strike down there, drag sideways to scrub through it, or hold to freeze it.",interactive:"Tap to fire a new strike above that point (near a mast that starts its own flash, it climbs from the mast), drag sideways to scrub time, hold to freeze the frame",music:!0,gl:!0,fps:30,seed:0,make(v){const t=v.gl,Oe=2e3,je=v.hash.slice(2),xt=(e,a,r,l)=>{let n=e|0,s=a|0,f=r|0,u=l|0;const g=()=>{n|=0,s|=0,f|=0,u|=0;const x=(n+s|0)+u|0;return u=u+1|0,n=s^s>>>9,s=f+(f<<3)|0,f=f<<21|f>>>11,f=f+x|0,(x>>>0)/4294967296};for(let x=0;x<12;x++)g();return g},w=e=>parseInt(je.slice(e*8,e*8+8),16)>>>0,A=xt(w(0),w(1),w(2),w(3)),mt=(e,a)=>{let r=A(),l=a[0];for(const n of a){if(r<n[1]){l=n;break}r-=n[1]}return l[0]};let ut=mt("Receptors",[["Mast and Oak",.42],["Lone Oak",.2],["Two Masts",.14],["Poplar Row",.14],["Wind Turbine",.1]]),Mt=mt("Distance",[["Middle",.45],["Near",.3],["Far",.25]]),Pt=mt("Polarity",[["Negative",.86],["Positive",.14]]),Yt=mt("Strokes",[["Double",.35],["Single",.28],["Triple",.25],["Five",.12]]),oe=mt("Rain",[["Steady",.45],["Light",.3],["Downpour",.25]]),ae=mt("Cloud Base",[["Ragged Scud",.4],["Flat Base",.35],["Rain Shafts",.25]]),bt=mt("Horizon",[["Farm Lights",.45],["Dark Fields",.3],["Town Glow",.25]]),zt=mt("Ground",[["Flooded Field",.4],["Wet Stubble",.4],["Marsh Pools",.2]]);v.home&&(ut="Mast and Oak",Mt="Middle",Pt="Negative",Yt="Double",oe="Steady",ae="Ragged Scud",bt="Farm Lights",zt="Flooded Field"),Pt==="Positive"&&(Yt="Single"),v.trait("Receptors",ut),v.trait("Distance",Mt),v.trait("Polarity",Pt),v.trait("Strokes",Yt);const Qt=xt(w(5)^3242513,w(6),w(7),w(0)^40503);let ne="Low Horizon",Te=0;{const e=Qt(),a=Qt(),r=Qt();Te=Qt(),!v.home&&r<.12&&(zt="Lake"),v.home||(ne=e<.5?"Low Horizon":e<.74||zt==="Wet Stubble"?"Big Sky":"Wide Field",bt==="Town Glow"&&a<.45&&(bt="City Skyline"))}const We=bt==="City Skyline",se=(xt(w(2)^202690,w(7)+753,w(4)^20903,w(1)+107)()-.5)*.5,Ae=!v.home&&Te<.1,le=xt(w(6)^202514,w(3)+1489,w(1)^32331,w(5)+713),$t=!v.home&&le()<.23&&bt!=="Dark Fields",Ke=.1+.045*le(),Xe=bt;$t&&(bt="Last Light");const re=ut==="Two Masts"?1:ut==="Mast and Oak"||ut==="Wind Turbine"?0:-1,Ee=!v.home&&le()<.09&&re>=0?"Upward":"Downward";v.trait("Rain",oe),v.trait("Cloud Base",ae),v.trait("Horizon",bt),v.trait("Ground",zt),v.trait("Framing",ne),v.trait("Flash",Ee);const Dt={"Low Horizon":.792,"Big Sky":.885,"Wide Field":.655}[ne],ft=Dt+.008,b={Near:430,Middle:620,Far:900}[Mt],pt=Pt==="Positive",Le={Single:1,Double:2,Triple:3,Five:5}[Yt],Bt={Light:0,Steady:1,Downpour:2}[oe],ie={"Flat Base":0,"Ragged Scud":1,"Rain Shafts":2}[ae],_t={"Dark Fields":0,"Farm Lights":1,"Town Glow":2,"City Skyline":2}[Xe],Ve={"Flooded Field":0,"Wet Stubble":1,"Marsh Pools":2,Lake:3}[zt],Nt=(ie===0?.165:.19)+{Near:-.03,Middle:0,Far:.12}[Mt],Pe=A()*7,Ye=A()*7,et=[],W=e=>(A()-.5)*e;if(ut==="Mast and Oak"){const e=v.home||A()<.5?1:-1;et.push({t:1,x:b*(.5+e*(.19+W(.06))),h:72+W(16),p:A()}),et.push({t:2,x:b*(.5-e*(.02+W(.06))),h:21+W(5),p:A()})}else if(ut==="Lone Oak")et.push({t:2,x:b*(.6+W(.2)),h:25+W(5),p:A()});else if(ut==="Two Masts")et.push({t:1,x:b*(.28+W(.08)),h:58+W(10),p:A()}),et.push({t:1,x:b*(.72+W(.08)),h:88+W(12),p:A()});else if(ut==="Poplar Row"){const e=b*(.42+W(.16)),a=5+(A()*3|0);for(let g=0;g<a;g++)W(3),W(7),A();const r=xt(w(7)^37009,w(2)+51,w(0)^497,w(4)+119),l=7+(r()*5|0),n=25+5*r(),s=r()<.45?1+(r()*(l-2)|0):-1,f=r()<.5;let u=e;for(let g=0;g<l;g++){const x=n*(1+(r()-.5)*.12);if(g===s&&f){u+=4.2+1*r();continue}et.push({t:3,x:u,h:g===s?x*.66:x,p:se}),u+=4.2+1*r()}}else{const e=Math.PI/2+W(.5);et.push({t:4,x:b*(.6+W(.12)),h:82,p:e}),et.push({t:2,x:b*(.3+W(.1)),h:18+W(4),p:A()})}for(let e=0;e<3;e++)et.push({t:5,x:b*(.08+.84*A()),h:3+A()*3,p:A()});const Me=et.map(e=>{if(e.t===4){const a=.56*e.h;return{x:e.x+a*Math.cos(e.p),h:e.h+a*Math.sin(e.p)}}return{x:e.x,h:e.t===2?e.h*1.02:e.t===3?e.h:e.t===1?e.h*1.06:e.h}}),Ct=[],Qe=[2,6,10][_t],ke=.12+.76*A();if(_t===1){const e=2+(A()*2.2|0);for(let a=0;a<e;a++){const r=.05+.9*A(),l=Dt-.001+A()*.005,n=1+(A()*2.6|0);for(let s=0;s<n&&Ct.length<10;s++){const f=s===0?1:A()<.55?.8:.02;Ct.push([r+(s?(A()-.5)*.03:0),l+(s?(A()-.3)*.0025:0),s===0?.6+.4*A():.12+.3*A(),f])}}}else for(let e=0;e<Qe;e++){const a=_t===2?ke+(A()-.5)*.3:.04+.92*A();Ct.push([a,Dt-.0015+A()*.009,(.35+.65*A())*(_t===2?.8:1),A()<.75?1:.3])}const $e=function*(e,a){const n=new Float64Array(1600),s=new Float64Array(1600),f=new Float64Array(1600),u=new Float64Array(1600),g=new Int32Array(1600),x=new Int8Array(1600),K=new Int8Array(1600);let D=0;const h=a.a*a.a,F=a.Z0,C=a.W,H=new Int32Array(16),B=(y,d)=>{let R=d/F;for(let T=0;T<D;T++){const S=y-n[T],it=S*S,j=d+s[T],tt=d-s[T];R+=f[T]*(1/Math.sqrt(it+tt*tt+h)-1/Math.sqrt(it+j*j))}return R},q=[];let Y=0,O=0;const z=(y,d,R,T,S,it)=>{d=Math.max(d,.6);const j=B(y,d),tt=(it-j)/(1/a.a-1/(2*d));n[D]=y,s[D]=d,f[D]=tt,u[D]=Y,g[D]=R,x[D]=T,K[D]=S;for(const $ of q){const I=$.c;for(let p=0;p<9;p++){const L=I[p*4]-y,_=L*L,Z=I[p*4+1]+d,N=I[p*4+1]-d;I[p*4+2]+=tt*(1/Math.sqrt(_+N*N+h)-1/Math.sqrt(_+Z*Z))}}return D++},dt=(y,d)=>{const R=g[y];let T=d===0?-Math.PI/2:Math.PI/2;R>=0&&x[R]===x[y]&&(T=Math.atan2(s[y]-s[R],n[y]-n[R]));const S=new Float64Array(9*4),it=d===0?a.spread:.62*Math.PI;for(let j=0;j<9;j++){const tt=T-it+(j+e())/9*2*it,$=a.L*(.55+.9*e()*e()+.25*e()),I=n[y]+$*Math.cos(tt),p=Math.max(.6,s[y]+$*Math.sin(tt));S[j*4]=I,S[j*4+1]=p,S[j*4+2]=I<.02*C||I>.98*C||p>a.zTop+40?d===0?9:-9:B(I,p),S[j*4+3]=$}q.push({n:y,b:O,k:d,c:S})},Q=a.up>=0;if(!Q){const y=z(a.x0,a.zTop+30,-1,0,-1,1);dt(z(a.x0+(e()-.5)*10,a.zTop,y,0,-1,1),0)}const at=[],gt=[];for(let y=0;y<a.objs.length;y++){const d=a.objs[y],R=4;let T=-1;for(let S=1;S<=R;S++)T=z(d.x,d.h*S/R,T,2,y,0);at.push(T),gt.push(Q)}let J=null,nt=-1,Wt=0;Q&&(K[at[a.up]]=a.up,dt(at[a.up],1));const st=[],rt=new Float64Array(9);for(;!J&&O<(Q?900:1100)&&D<1592&&!(nt>=0&&O>Wt);){(O&7)===7&&(yield O);let y=0;st.length=0;for(let p=0;p<q.length;p++){const L=q[p],_=L.c,Z=L.k===0,N=Z?a.Eth:a.EthS;let o=-1;for(let M=0;M<9;M++){if(Z&&!Q&&_[M*4+1]>s[L.n])continue;const U=Z?(1-_[M*4+2])/_[M*4+3]:_[M*4+2]/_[M*4+3];U>o&&(o=U)}const i=o-N;if(i<=0||!Z&&H[K[L.n]]>a.sMax){if(O-L.b>30){q.splice(p--,1);continue}st.push(0);continue}const m=(Z?1:a.sRate)*Math.pow(i/N,a.etaR);st.push(m),y+=m}if(!(y>0))break;let d=e()*y,R=0;for(;R<st.length-1&&(d-=st[R],!(d<=0));R++);const T=q[R],S=T.k===0,it=S?a.Eth:a.EthS;q.splice(R,1),Y+=-Math.log(1-e()*.999)/y,O++;let j=0;for(let p=0;p<9;p++){const _=(S?(1-T.c[p*4+2])/T.c[p*4+3]:T.c[p*4+2]/T.c[p*4+3])-it;rt[p]=_>0&&!(S&&!Q&&T.c[p*4+1]>s[T.n])?Math.pow(_,a.eta):0,j+=rt[p]}if(!(j>0))continue;let tt=e()*j,$=0;for(;$<8&&(tt-=rt[$],!(tt<=0));$++);let I=-1;if(e()<(S?a.pb:a.pbS)){let p=0;for(let L=0;L<9;L++)Math.min(Math.abs(L-$),9-Math.abs(L-$))<2&&(rt[L]=0),p+=rt[L];if(p>0){let L=e()*p;for(I=0;I<8&&(L-=rt[I],!(L<=0&&rt[I]>0));I++);rt[I]>0||(I=-1)}}for(const p of I>=0?[$,I]:[$]){const L=T.c[p*4],_=T.c[p*4+1],Z=z(L,_,T.n,S?0:1,K[T.n],S?1:0);if(S||H[K[T.n]]++,dt(Z,T.k),Q&&nt<0&&_>a.zTop&&(nt=Z,Wt=O+a.upMore),S){_<a.jump*.55&&(J={lead:Z,low:-1,gx:L+(e()-.5)*4});for(let N=0;N<D&&!J;N++)if(x[N]===1||x[N]===2&&at.includes(N)){const o=n[N]-L,i=s[N]-_;o*o+i*i<a.jump*a.jump&&(J={lead:Z,low:N})}}else for(let N=0;N<D&&!J;N++)if(x[N]===0){const o=n[N]-L,i=s[N]-_;o*o+i*i<a.jump*a.jump&&(J={lead:N,low:Z})}if(J)break}for(let p=0;p<at.length;p++)if(!gt[p]){const L=at[p],_=4;B(n[L],s[L]+_)/_>a.Elaunch*a.objs[p].k&&(gt[p]=!0,K[L]=p,dt(L,1))}}if(Q){if(nt<0){nt=at[a.up];for(let d=0;d<D;d++)x[d]===1&&s[d]>s[nt]&&(nt=d)}for(let d=0;d<D;d++)x[d]===1&&(x[d]=0);const y=at[a.up];x[y]=0,g[y]=-1,J={lead:nt,low:-1,gx:n[y],up:!0}}return{N:D,nx:n,nz:s,nq:f,nt:u,par:g,kind:x,nob:K,conn:J,T:Y,ev:O,launched:gt,up:Q}},Fe=Mt==="Far"?(ft-Nt+.08)*b:ft*b+.02*b,ce=1.4*Fe,fe=720/ce,Se={W:b,zTop:Fe,Z0:ce,a:1.5,L:pt?10:13,Eth:(pt?.0095:.008)*fe,EthS:.007*fe,eta:pt?6:4,etaR:.6,pb:pt?.035:.12,pbS:.05,spread:pt?1.45:1.6,jump:24,Elaunch:.026*fe,sRate:.7,sMax:pt?28:40,objs:Me.map((e,a)=>({x:e.x,h:e.h,k:[1,1,.6,.6,1,.8][et[a].t]})),up:-1},Ze=Object.assign({},Se,{Z0:ce/4,pbS:.15,sMax:2e3,up:re,upMore:60}),Je=e=>xt(w(4)^Math.imul(e+1,2654435761),w(5)+e*7919,w(6),w(7)^e),to=(e,a,r)=>{const l=2.6+e()*.8,n=[];let s=l;for(let h=0;h<Le;h++)h>0&&(s+=(Le===5?.6:.8)+e()*.45),n.push([s,h===0?pt?1.25:1:.5+e()*.35,h===0?pt?.9:.32:.15+e()*.15,.2+e()*.06]);r&&n.forEach((h,F)=>{h[1]*=F===0?.42:.6,h[2]=F===0?.95:.45});const f=s+(pt?4.4:3.2),u=e()<.22?3+e()*4:.4+e()*1.4,g=[],x=n[n.length-1][0],K=h=>g.push({t:h,u:.08+.84*e(),y:.05+(Dt-.3)*e(),a:.3+.2*e(),w:.13+.12*e(),n:1+(e()*3|0)});e()<(a&&Ae?1:.6)&&K(.35*l+e()*(.65*l-.5));for(let h=x+.6+.5*e();h<f+u-.2;h+=.45+.9*e())K(h);const D=a?n[0][0]+.24-4:0;return{A:l,st:n,tEnd:f,s0:D,gap:u,fl:g}},eo=(e,a,r)=>{const{N:l,nx:n,nz:s,par:f,kind:u,nt:g,conn:x}=e,K=a.A,D=Math.max(e.T,1e-9),h=[0],F=[0];if(x){const o=[];let i=x.lead;for(;i>=0;)o.push(i),i=f[i];o.reverse();const m=s[o[0]],M=Math.max(1,s[o[o.length-1]]),U=e.up?-1:1;let vt=0,yt=0;for(const ct of o){const Et=g[ct]/D,St=Math.min(1,Math.max(yt,U*(m-s[ct])/Math.max(1,U*(m-M))));Et>vt+1e-9&&(h.push(Et),F.push(St),vt=Et,yt=St)}}h.push(1.0001),F.push(1);const C=o=>{let i=1;for(;i<h.length-1&&h[i]<o;)i++;const m=Math.min(1,Math.max(0,(o-h[i-1])/Math.max(1e-9,h[i]-h[i-1])));return F[i-1]+(F[i]-F[i-1])*m},H=o=>K*Math.pow(Math.min(1,C(g[o]/D)),.85),B=new Uint8Array(l),q=new Float32Array(l),Y=new Int32Array(l).fill(-1),O=[];if(x){let o=x.lead;const i=[];for(;o>=0;)i.push(o),o=f[o];if(e.up||i.reverse(),O.push(...i),x.low>=0){for(o=x.low;o>=0&&u[o]===1;)O.push(o),o=f[o];o>=0&&O.push(o)}}const z=O.map(o=>[n[o],s[o]]);x&&x.low<0&&!e.up&&z.push([x.gx,0]);let dt=0;const Q=[0];for(let o=1;o<z.length;o++)dt+=Math.hypot(z[o][0]-z[o-1][0],z[o][1]-z[o-1][1]),Q.push(dt);O.forEach((o,i)=>{B[o]=1,q[o]=Q[i]/Math.max(dt,1)});const at=new Float32Array(l),gt=new Float32Array(l).fill(1e4);for(let o=l-1;o>=0;o--){const i=f[o];i>=0&&u[o]!==2&&(at[i]+=at[o]+1,gt[i]=Math.min(gt[i],H(o)))}for(let o=0;o<l;o++){if(B[o]){Y[o]=o;continue}const i=f[o];u[o]===0&&i>=0&&(Y[o]=Y[i])}const J=new Float32Array(l),nt=new Int32Array(l);for(let o=l-1;o>=0;o--){const i=f[o];i>=0&&u[o]!==2&&(J[i]=Math.max(J[i],J[o]+1))}for(let o=0;o<l;o++){const i=f[o];nt[o]=i<0||B[i]||u[i]!==u[o]?o:nt[i]}const Wt=o=>B[o]?1:J[o]/(J[nt[o]]+1),st=[],rt=(o,i,m,M,U,vt,yt,ct,Et,St,Kt,ye)=>st.push([o/b,ft-i/b,m/b,ft-M/b,U,vt,yt,ct,Et,St,Kt,ye]),y=o=>{const i=f[o];if(i<0)return null;const m=n[o]-n[i],M=s[o]-s[i],U=Math.hypot(m,M);return U>1e-6&&u[i]===u[o]?[m/U,-M/U]:null};for(let o=0;o<l;o++){const i=f[o];if(i<0||u[o]===2||u[o]===0&&u[i]!==0)continue;let m,M;B[o]&&B[i]?(m=0,M=q[o]):u[o]===0?(m=1,M=Y[o]>=0?q[Y[o]]:0):(m=2,M=1);const U=e.up?Math.min(1,Math.max(.3,Math.sqrt(at[o]+1)/3)):Math.min(1,Math.max(.12,Math.sqrt(at[o]+1)/5)),vt=B[o]&&B[i],yt=vt||B[i]||u[i]!==u[o]?1:Wt(i),ct=vt?1:Wt(o);rt(n[i],s[i],n[o],s[o],H(o),gt[o],M,m,B[o]?1:U,u[o]===1?null:y(i),yt,ct)}if(x&&!e.up){const o=x.lead,i=x.low;rt(n[o],s[o],i>=0?n[i]:x.gx,i>=0?s[i]:0,K*.995,1e4,i>=0?q[i]:1,0,1,y(o),1,1)}const d=4,R=new Float32Array(st.length*d*12),T=new Float32Array(st.length*12),S=r()*6.28,it=r()*6.28,j=z.length?ft-z[0][1]/b:-1,tt=o=>(1+.33*(.55*Math.sin(o*23+S)+.45*Math.sin(o*61+it)))*Math.min(1,Math.max(.04,(o-j)/.04));st.forEach((o,i)=>{const m=o[2]-o[0],M=o[3]-o[1],U=Math.hypot(m,M)||1e-6,vt=-M/U,yt=m/U,ct=o[9],Et=ct?o[0]+ct[0]*U*.12:o[0]+m*.5,St=ct?o[1]+ct[1]*U*.12:o[1]+M*.5,Kt=(r()-.5)*(r()<1/6?.7:.4)*U,ye=Kt*.5+(r()-.5)*.22*U,bo=Kt*.5+(r()-.5)*.22*U,qe=[0,ye,Kt,bo,0],Lt=[];for(let X=0;X<=d;X++){const G=X/d,Xt=(1-G)*(1-G),Vt=2*G*(1-G),He=G*G;Lt.push([Xt*o[0]+Vt*Et+He*o[2]+vt*qe[X],Xt*o[1]+Vt*St+He*o[3]+yt*qe[X]])}const wo=r(),Ge=o[7]===0;for(let X=0;X<d;X++){const G=(i*d+X)*12,Xt=o[10]+(o[11]-o[10])*X/d,Vt=o[10]+(o[11]-o[10])*(X+1)/d;R[G]=Lt[X][0],R[G+1]=Lt[X][1],R[G+2]=Lt[X+1][0],R[G+3]=Lt[X+1][1],R[G+4]=o[4],R[G+5]=o[5],R[G+6]=o[6],R[G+7]=o[7],R[G+8]=o[8]*Math.pow(.5*(Xt+Vt),.3),R[G+9]=.6*wo+.4*r(),R[G+10]=Ge?tt(Lt[X][1]):Xt,R[G+11]=Ge?tt(Lt[X+1][1]):Vt}T.set([o[0],o[1],o[2],o[3],o[4],o[5],o[6],o[7],o[8]*Math.pow(.5*(o[10]+o[11]),.3),r(),1,1],i*12)});const $=[],I=o=>{if(!z.length)return[.5,.5];const i=o*dt;let m=1;for(;m<z.length-1&&Q[m]<i;)m++;const M=(i-Q[m-1])/Math.max(1e-6,Q[m]-Q[m-1]);return[(z[m-1][0]+(z[m][0]-z[m-1][0])*M)/b,ft-(z[m-1][1]+(z[m][1]-z[m-1][1])*M)/b]};for(let o=0;o<9;o++){const i=o/8,m=I(i);$.push([m[0],m[1],i])}const p=[];for(let o=0;o<l;o++)u[o]!==2&&f[o]>=0&&p.push([H(o),n[o]/b,B[o]?1:u[o]===1?.6:.35]);p.sort((o,i)=>o[0]-i[0]);const L=z.length?z[z.length-1]:[b/2,0],_=(o,i)=>{const m=Nt+o*(ft-Nt);for(const M of O)if(u[M]===0&&ft-s[M]/b>=m)return Math.min(K-.05,H(M));return i},Z=_(.88,null),N=e.up?.2:_(.06,K*.3);return{sub3:R,st1:T,nSub:st.length*d,nStep:st.length,lp:$,steps:p,bx:L[0]/b,conn:x,tl:a,sLead:Z,sEm:N}},ht=(e,a)=>{const r=t.createProgram(),l=t.createShader(t.VERTEX_SHADER);t.shaderSource(l,e),t.compileShader(l);const n=t.createShader(t.FRAGMENT_SHADER);return t.shaderSource(n,a),t.compileShader(n),t.attachShader(r,l),t.attachShader(r,n),t.linkProgram(r),{p:r,a:l,b:n,u:{}}},he=e=>{if(!t.getProgramParameter(e.p,t.LINK_STATUS))throw new Error("317 link: "+t.getProgramInfoLog(e.p)+" "+t.getShaderInfoLog(e.b)+" "+t.getShaderInfoLog(e.a));t.useProgram(e.p);const a=t.getUniformBlockIndex(e.p,"U");a!==4294967295&&t.uniformBlockBinding(e.p,a,0);const r=t.getProgramParameter(e.p,t.ACTIVE_UNIFORMS);for(let l=0;l<r;l++){const n=t.getActiveUniform(e.p,l),s=t.getUniformLocation(e.p,n.name);s&&(e.u[n.name.replace("[0]","")]=s)}},kt=(e,a,r,l,n,s,f,u)=>{const g=t.createTexture();return t.bindTexture(t.TEXTURE_2D,g),t.texImage2D(t.TEXTURE_2D,0,r,e,a,0,l,n,u||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,s===t.NEAREST?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,f),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,f),g},It=e=>{const a=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),a},Rt="layout(std140) uniform U{vec4 uA,uB,uC,uD;vec4 uSt[5];vec4 uL[9];vec4 uE;};",Tt=`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}`,ze=`#version 300 es
precision highp float;
layout(location=0) in vec4 aP;layout(location=1) in vec4 aT;layout(location=2) in vec4 aW;
${Rt}
uniform vec4 uM; // mode: 0 core, 1 mirrored core, 2 glow; width scale
out vec2 vD;out float vB;out vec2 vUV;out vec3 vK;flat out float vL;flat out vec3 vF;

float envS(float t,float r,float cc){if(t<=0.)return 0.;float x=clamp(t/r,0.,1.);x=x*x*(3.-2.*x);return x*(.75*exp(-t/.2)+cc*mix(.33,1.,uE.y)*exp(-t/1.6));}
// a segment's light, split by what makes it: the live tip's flash, the leader's old channel, the return stroke, the knots
// that outlive it. The total drives the glow; the parts colour the core.
float segB(vec4 a1,float w,float rise,float kn,out vec4 part){
float s=uA.x,A=uA.y,tc=a1.x,tch=a1.y,arc=a1.z,ty=a1.w;
part=vec4(0.);
if(s<tc)return 0.;
float age=s-tc;
float fade=s<A?1.:exp(-(s-A)/.22);
float tip=(1.1*exp(-age/.045)+(s<tch?.16*exp(-age/.35):0.))*fade;
float old=(.06+.09*w)*(.45+.55*exp(-age/1.6))*fade;
if(ty>1.5){tip*=.7;old*=.9;}
float str=0.,bead=0.;
if(s>=A){
 if(ty<.5){
  for(int k=0;k<5;k++){if(float(k)>=uB.w)break;vec4 st=uSt[k];
   str+=st.y*envS(s-(st.x+(1.-arc)*uA.z),rise,st.z);
   if(k>0){float td=s-(st.x-st.w*(1.-arc));if(td>0.&&s<st.x+(1.-arc)*uA.z)tip+=.45*st.y*exp(-td/.04);}
  }
  // as the channel cools the thick kinks hold their heat longest: a row of knots
  float tb=s-uSt[0].x-.12;
  if(tb>0.)bead=uSt[0].y*pow(kn,5.)*.55*exp(-tb/.55)*(1.-exp(-tb/.08));
  str*=.9+.2*kn;
 }else if(ty<1.5){
  float t=s-(uSt[0].x+(1.-arc)*uA.z);
  // (uE.y: an upward flash, where the whole tree glows with its trunk, and longer)
  if(t>0.){float x=clamp(t/rise,0.,1.);str+=uSt[0].y*(.25+.75*w)*(1.+uE.y)*x*x*(3.-2.*x)*(exp(-t/.3)+(.3+.9*uE.y)*exp(-t/1.1));}
 }
}
float e=smoothstep(uA.w,uA.w-1.6,s);
if(ty<.5)old*=.8+.25*sin(arc*29.+1.3)*sin(arc*11.+.4);
old*=.62+.76*kn;
part=vec4(tip,old,str,bead)*e;
return (tip+old+str+bead)*e;}

void main(){
 int c=gl_VertexID;vec2 q=vec2(c==1||c==2||c==4?1.:0.,c==2||c==4||c==5?1.:-1.);
 float glow=step(1.5,uM.x);
 vec4 pt;
 float b=segB(aT,aW.x,glow>.5?uC.z:uC.y,aW.y,pt);
 vec2 p0=aP.xy,p1=aP.zw;
 if(uM.x>.5&&uM.x<1.5){p0.y=2.*uC.x-p0.y;p1.y=2.*uC.x-p1.y;}
 vec2 d=p1-p0;float L=max(length(d),1e-6);vec2 t=d/L,n=vec2(-t.y,t.x);
 // the return stroke's channel carries the current: it alone is thick; branches and leader stay fine
 bool tr=aT.w<.5;
 float hw=(tr?.24+1.05*sqrt(min(pt.z,1.6))+.3*sqrt(min(pt.x,1.)):.32+.45*sqrt(min(pt.z+pt.x,1.))*(.4+.6*aW.x))*.001*uM.y;
 float hwU=max(hw,.6*uB.x);
 // n13: a thin burnt-out core in a soft fringe that falls as an inverse square, out to twelve core widths on the trunk
 float fm=max(aW.z,aW.w),Rr=tr?12.:6.;vF=vec3(aW.zw,Rr);
 float R=glow>.5?uD.w:Rr*hwU*fm;
 vec2 p=mix(p0,p1,q.x)+t*(q.x*2.-1.)*R+n*q.y*R;
 float sc=glow>.5?1.:hwU;
 vD=vec2(dot(p-p0,t),dot(p-p0,n))/sc;vL=L/sc;
 // the core's colour: the stroke white-hot on the trunk and blue-violet on the branches, the live tips blue-white,
 // the leader's old channel a dim red-violet, the cooling knots orange-white, the streamers blue
 vec3 K=aT.w>1.5?vec3(.62,.72,1.)*(pt.x*.9+pt.y*.5):vec3(.82,.86,1.)*pt.x*.9+vec3(.62,.36,.85)*pt.y*2.5;
 K+=tr?mix(vec3(5.),vec3(3.,3.4,5.4),uE.y)*pt.z:vec3(.58,.6,1.)*pt.z*(.5+.9*aW.x);
 K+=vec3(1.,.66,.42)*pt.w*1.4;
 vK=K*(hw/hwU);
 vB=glow>.5?pt.z*(tr?1.:.3*aW.x*(1.-.6*uE.y))+pt.w+.12*pt.x+.3*pt.y:b;
 vUV=p;
 gl_Position=b<1e-4?vec4(2.,2.,2.,1.):vec4(p.x*2.-1.,1.-p.y*2.,0.,1.);
}`,oo=`#version 300 es
precision highp float;
${Rt}
uniform sampler2D tB0,tB1,tN;uniform vec4 uM;
in vec2 vD;in float vB;in vec2 vUV;in vec3 vK;flat in float vL;flat in vec3 vF;out vec4 o;
void main(){
 vec2 e=vec2(max(0.,max(-vD.x,vD.x-vL)),vD.y);
 // the width here along the piece (the trunk swells and narrows, a branch thins to its tip); its light goes with it
 float f=max(mix(vF.x,vF.y,clamp(vD.x/max(vL,1e-4),0.,1.)),.03);
 float r2=dot(e,e)/(f*f);
 // a soft core and a fringe with no edge, a quarter of its light; drawn with MAX blending, so the pieces join without beads
 float cr=exp(-r2*.33),ha=.25*max(1./(1.+r2)-1./(1.+vF.z*vF.z),0.);
 vec2 tc=vec2(vUV.x,1.-vUV.y);
 vec4 b0=texture(tB0,tc);
 float vis=1.-b0.a;
 vec3 I=(vK*cr+vK.b*vec3(.62,.66,1.)*ha)*min(f,1.2)*vis;
 if(uM.x>.5){
  if(vUV.y<uC.x+.001)discard;
  vec4 b1=texture(tB1,tc);
  float rip=texture(tN,vec2(vUV.x*3.,vUV.y*9.+uB.y*.03)).g;
  I*=b1.g*.5*(.55+.9*rip)*(1.-texture(tB1,vec2(vUV.x,1.-(2.*uC.x-vUV.y))).b);
 }
 o=vec4(I*uC.w,1.);
}`,ao=`#version 300 es
precision highp float;
${Rt}
uniform sampler2D tB0;
in vec2 vD;in float vB;in vec2 vUV;in vec3 vK;flat in float vL;flat in vec3 vF;out vec4 o;
void main(){
 float d=length(vec2(max(0.,max(-vD.x,vD.x-vL)),vD.y)),R=uD.w;
 float s2=R*.32;
 float pr=(.25*exp(-d*d/(R*R*.02))+.75/(1.+d*d/(s2*s2)))*smoothstep(R,R*.5,d);
 float cl=texture(tB0,vec2(vUV.x,1.-vUV.y)).a;
 // the light the channel throws into the rain and the cloud: soft, and strongest where it enters the cloud
 o=vec4(vec3(.72,.76,1.)*vB/(1.+.3*vB*vB)*pr*.3*(.6+.75*cl)*uC.w,1.);
}`,ue=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
precision highp float;
uniform sampler2D tN;
uniform vec4 uK; // vC, vH, vG, mode
uniform vec4 uT; // cloud, ground, glow, rain
uniform vec4 uS; // seeds, metres across, pixel
uniform vec4 uQ; // objects, lights, visibility (m)
uniform vec4 uR,uR2; // rain shafts: their feet (u) and the rain's slant; their half-widths and the last light's slot
out vec4 o;
float nq(vec2 p,float fp){float l=max(log2(max(fp*256.,1e-4)),0.);return (.62*textureLod(tN,p,l).g+.38*textureLod(tN,p*2.03+.3,l+1.).g-.5)*1.5+.5;}
float fbm(vec2 p,float fp){float l=log2(max(fp*256.,1e-4));float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*textureLod(tN,p,max(l,0.)).g;p=p*2.03+vec2(.137,.371);l+=1.;a*=.5;}return (s-.484)*1.6+.5;}
vec3 airCol(float v,float glw){
 float h=smoothstep(.0,uK.y,v);
 vec3 c=mix(vec3(.0026,.0032,.0066),vec3(.0058,.0066,.0108),h);
 c+=vec3(.05,.025,.009)*glw*exp(-max(uK.y-v,0.)/(.022+.022*glw));
 // on dark fields a faint cold hem of sky over the horizon, the far side of the storm, so the pause is never blank
 c+=vec3(.017,.019,.025)*smoothstep(.2,.06,glw)*exp(-abs(uK.y-v)/.04);
 return c;}
// rain shafts: up to three columns from the base to the ground, leaning with the rain, wider and fainter at the
// foot, nearly hard on the windward side and soft on the lee
float shaftC(float u,float v,float k){
 float t=clamp((v-uK.x)/(uK.y-uK.x),0.,1.),c=0.,sg=uR.w<0.?-1.:1.;
 for(int i=0;i<3;i++){
  float w=uR2[i];if(w<=0.)continue;
  // each edge wanders on its own, slowly down the height
  float fi=float(i);
  vec2 wb=k*(vec2(textureLod(tN,vec2(v*.16+fi*.37+uS.x,.13+fi*.21),0.).b,textureLod(tN,vec2(v*.2+fi*.53+uS.y,.61+fi*.17),0.).b)-.5);
  float e=sg*(u-uR[i]+uR.w*(uK.y-v))/(w*(.5+.65*t*t));
  c=max(c,smoothstep(-1.-1.3*wb.x,-.82-1.3*wb.x,e)*smoothstep(1.1+1.6*wb.y,-.2+wb.y,e));
 }
 return c*smoothstep(uK.x-.03,uK.x+.07,v)*(1.-.35*t);}
#ifdef LAST
// the last light: the deck's far edge is a soft ragged cloud base (broad lumps and sagging lobes, smooth noise only,
// so no fine teeth) over a calm slot of clear dusk sky, deep orange on the line, then a dull rose, then a green-grey
// just under the cloud; the ramp goes by height, not by the edge, so no column of it is stretched
float slotE(float u,vec2 sd){
 float b=texture(tN,vec2(u*.11+sd.x,9.1)).g,l=texture(tN,vec2(u*.42+sd.y,4.3)).g,l2=texture(tN,vec2(u*.9+sd.x*.7,6.7)).g;
 return uR2.w*(1.+.6*(b-.5)-.24*smoothstep(.42,.82,l)-.07*smoothstep(.45,.85,l2));}
vec3 slotCol(float x){
 vec3 c=mix(vec3(.24,.078,.03),vec3(.125,.055,.06),smoothstep(0.,.34,x));
 c=mix(c,vec3(.0645,.0457,.0572),smoothstep(.28,.66,x));
 return mix(c,vec3(.033,.037,.038),smoothstep(.62,1.,x))*mix(1.,.72,uT.w*.5);}
// the slot's colour (rgb) and how much of it shows (a): the edge blurred over several pixels and torn a little,
// and a few wisps of scud hanging from it into the slot, leaning with the rain
vec4 lastL(float u,float vv,float px,vec2 sd){
 float eH=slotE(u,sd);
 float rg=texture(tN,vec2(u*2.2+sd.y,vv*4.+sd.x)).b-.5;
 float inS=smoothstep(eH+px*4.,eH-px*8.,vv+px*9.*rg);
 vec3 sl=slotCol(vv/uR2.w);
 float wu=u+uR.w*(eH-vv)*.9;
 float wm=smoothstep(.6,.76,texture(tN,vec2(wu*.5+sd.y*1.3,2.9)).b);
 float dep=eH*(.22+.38*texture(tN,vec2(wu*1.6+sd.x,7.3)).g);
 float tn=texture(tN,vec2(wu*3.4+sd.x,vv*2.6+sd.y)).g;
 float ws=wm*smoothstep(eH-dep,eH-dep*.35,vv+dep*.6*(tn-.5))*smoothstep(.3,.62,tn+.25*wm);
 sl=mix(sl,vec3(.011,.0085,.0095)+sl*.12,.62*ws);
 return vec4(sl,inS);}
#endif
float seg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h);}
#define PRE float px=uS.w;  vec2 uv=vec2(gl_FragCoord.x*px,1.-gl_FragCoord.y*px);  float u=uv.x,v=uv.y,vC=uK.x,vH=uK.y,vG=uK.z,glw=uT.z,Wm=uS.z,D=${Oe.toFixed(1)},vis=uQ.z;  vec2 sd=uS.xy;  vec3 air=airCol(v,glw);
#define OUT(col,hide,cloudR,refl,occ,resp) if(uK.w<.5)o=vec4(sqrt(clamp(col*.5,0.,1.)),hide);else o=vec4(clamp(cloudR,0.,1.),clamp(refl,0.,1.),occ,clamp(resp,0.,1.));
`,De=ue+`void main(){
 PRE
 if(v>=vH-.0004)discard;
 vec3 col=air;float hide=0.,cloudR=0.,refl=0.,occ=0.,resp=0.;
  // ---- the cloud deck seen from below, in perspective, fading into the rain toward the horizon
  float vv=vH-v;
  float dc=(vH-vC)*D/vv;
  float X=(u-.5)*Wm*dc/D;
  float fx=Wm*dc/D*px,fy=(vH-vC)*D/(vv*vv)*px;
  float flat_=uT.x<.5?.55:1.;
  // lumps hanging from the base: a warped field, only partly foreshortened
  // the noise's cells are 1/32 of a unit: lumps a few hundred metres across
  vec2 q=vec2(X/8000.,dc/10000.)+sd;
  float fq=max(fx/8000.,fy/10000.);
  vec2 wp=vec2(fbm(q*.7,fq*.7),fbm(q*.7+3.1,fq*.7))-.5;
  float lump=fbm(q+wp*.1,fq);
  // (n13: the detail octave with half the foreshortening, so its lumps hang about as deep as they are wide, not as smears)
  float sq=sqrt(dc/10000.);vec2 qd=vec2(X/8000.,.39*sq)+sd;
  float det=fbm(qd*2.7+wp*.08+1.7,max(fx/8000.,fy/10000.*.195/sq)*2.7);
  float hz=1.-exp(-max(dc-D*.88,0.)/vis);
  float dens=smoothstep(.15,.85,.5+flat_*(1.1*(lump-.5)+.35*(det-.5)));
  vec3 deck=vec3(.0042,.0049,.0088)*(.45+.9*dens)+vec3(.03,.016,.007)*glw*(.3+.9*dens)*exp(-max(vH-v,0.)/(.03+.03*glw));
  col=mix(deck,air,hz);
  cloudR=(1.-hz)*(.1+1.15*dens*dens+.3*(det-.5))+hz*.08;
  // low scud, nearer than the deck, so it sits lower and moves apart
  if(uT.x>.5&&uT.x<1.5){
   float dc2=.55*(vH-vC)*D/vv;
   float X2=(u-.5)*Wm*dc2/D;
   float sc=fbm(vec2(X2/5000.,dc2/9000.)+sd*2.1,max(Wm*dc2/D*px/5000.,.55*(vH-vC)*D/(vv*vv)*px/9000.));
   float s2q=sqrt(dc2/2500.);
   float sc2=fbm(vec2(X2/1400.,.58*s2q)+sd*.7,max(Wm*dc2/D*px/1400.,.55*(vH-vC)*D/(vv*vv)*px/2500.*.29/s2q));
   float sa=smoothstep(.6,.74,sc+.2*(sc2-.5))*smoothstep(500.,1100.,dc2)*exp(-max(dc2-D*.6,0.)/vis);
   col=mix(col,vec3(.0024,.0028,.0048)+vec3(.012,.007,.004)*glw*exp(-max(vH-v,0.)/.05),sa*.9);
   cloudR=mix(cloudR,.3+.3*sc2,sa*.8);
   hide=max(hide,sa*.6*step(dc2,D));
  }
  // the channel hides inside the cloud above its base
  hide=max(hide,smoothstep(vC+.01,vC-.035,v+.035*(lump-.5)+.015*(det-.5)));
  resp=(.25+.4*uT.w)*smoothstep(vC-.1,vC+.05,v)+.15*hz;
#ifdef LAST
  {vec4 L=lastL(u,vv,px,sd);float eH=slotE(u,sd);
   // the deck's underside over the slot, lit dull rose from below, in lumps, fading up over a few tens of pixels
   float ul=exp(-max(vv-eH,0.)/(px*24.))*(.45+.8*texture(tN,vec2(u*1.3+sd.x,vv*2.+sd.y)).g);
   col=mix(col,L.rgb,L.a)+vec3(.02,.008,.0065)*ul*(1.-L.a);
   cloudR*=1.-L.a;hide*=1.-L.a;resp*=1.-.7*L.a;}
#endif
  // ---- distant tree lines on the horizon
  float clump=smoothstep(.44,.6,fbm(vec2(u*.32+sd.x,3.3),px*.32));
  float hgt=fbm(vec2(u*1.3+sd.y,1.7),px*1.3);
  float crowns=fbm(vec2(u*7.+sd.y,5.1),px*7.);
  float far=smoothstep(.45,.6,fbm(vec2(u*.2+sd.y,7.7),px*.2));
  float ridge=vH-(6.5/Wm)*clump*(.35+.8*hgt)*(.86+.28*crowns)-.001*far*(.7+.3*crowns);
  if(uQ.w>0.){
   // a city on the horizon: blocks and towers, a few windows still lit
   float cw=smoothstep(.36,.1,abs(u-uQ.w));
   float b1=floor(u*140.+sd.x*37.),b2=floor(u*55.+sd.y*41.);
   float r1=texelFetch(tN,ivec2(int(mod(b1,256.)),int(mod(floor(b1/256.)*7.+11.,256.))),0).r;
   float r2=texelFetch(tN,ivec2(int(mod(b2,256.)),int(mod(floor(b2/256.)*5.+97.,256.))),0).r;
   float bh=(4./Wm)*cw*max(.35+.75*r1,step(.62,r2)*(.9+1.8*r2*r2));
   float top=vH-bh;
   if(v>top&&bh>.0004){
    col=mix(vec3(.002,.0022,.003)+air*.3,air,.18);
    vec2 wc=vec2(u*720.,(vH-v)*1500.);vec2 wi=floor(wc);
    float on=step(.8,texelFetch(tN,ivec2(int(mod(wi.x,256.)),int(mod(wi.y*3.+wi.x*.13,256.))),0).a);
    vec2 wf=fract(wc)-.5;float pane=smoothstep(.42,.2,max(abs(wf.x),abs(wf.y)));
    float lit=mix(on*pane,.08,smoothstep(.6,1.4,px*720.));
    col+=vec3(1.,.66,.32)*.05*lit*smoothstep(top+.0015,top+.003,v)+vec3(.012,.007,.004)*glw*smoothstep(top+.004,top,v);
    resp=.04;hide=0.;cloudR=0.;
   }
  }
  if(v>ridge){col=mix(vec3(.0016,.0018,.0026)+air*.25,air,.25)+vec3(.010,.006,.003)*glw*smoothstep(ridge+.006,ridge,v)*.4;resp=.04;hide=0.;cloudR=0.;}
  // rain shafts: grey columns in front of what is behind them; a flash inside or behind one lights it like a lampshade,
  // and veils the channel in it
  if(uT.x>1.5){
   float sh=shaftC(u,v,1.)*(.72+.56*textureLod(tN,vec2((u+uR.w*(vH-v))*7.+sd.y,v*.3),0.).b);
   // (on dark fields nothing is behind them: a faint grey of their own, from the far flashes, so they still show)
   col=mix(col,vec3(.0046,.0052,.0076)*(1.35+.9*smoothstep(.2,.06,glw)*(1.-.5*smoothstep(vH-.15,vH,v)))+vec3(.006,.0034,.0014)*glw*.8,clamp(sh*.95,0.,1.));
   resp=max(resp,1.5*sh);hide=max(hide,.34*sh);
  }
 OUT(col,hide,cloudR,refl,occ,resp)
}`,Be=ue+`void main(){
 PRE
 if(v<vH-.0004)discard;
 vec3 col=air;float hide=0.,cloudR=0.,refl=0.,occ=0.,resp=0.;
  // ---- the field: wet ground under the strike, from the horizon to our feet
  float d=(vG-vH)*D/max(v-vH,1e-5);
  float x=(u-.5)*Wm*d/D;
  float fx=Wm*d/D*px,fy=(vG-vH)*D/((v-vH)*(v-vH))*px;
  vec2 g=vec2(x,d);
  float ph=(x+d*.11)/2.2+.5*fbm(g*vec2(.02,.006)+sd.yx*2.,max(fx*.02,fy*.006));
  float fw=(fx+fy*.11)/2.2;
  float fur=.5+.5*cos(6.2832*ph);
  float aa=clamp(1.2-fw*1.6,0.,1.);
  float furA=mix(.45,smoothstep(.55,.95,fur),aa);
  float pn=fbm(g*vec2(.012,.0045)+sd,max(fx*.012,fy*.0045));
  float pn2=fbm(g*vec2(.035,.013)+sd.yx,max(fx*.035,fy*.013));
  float pn3=fbm(g*vec2(.08,.03),max(fx*.08,fy*.03));
  float wet;
  if(uT.y<1.5){
   // water lies in the hollows, then in the furrow bottoms, then in the tramlines' wheel ruts, all running away
   // from us; a field's sheet water shows where the ground dips under the level. Furrows too fine for the pixel
   // count as the share of each row under water.
   float h=(pn-.5)+.12*(pn2-.5),lvl=uT.y<.5?-.02:-.22;
   float k=clamp(.42+(lvl-h)*2.2,0.,1.);
   float wf=mix(1.-acos(2.*k-1.)*.3183,smoothstep(k+.1,k-.1,fur),aa);
   float tq=abs(mod(x+d*.11+sd.x*40.,23.)-11.5),fxl=max(fx+fy*.11,.02);
   float rut=clamp(.32+.5*fxl-abs(tq-.9),0.,min(.64,fxl))/fxl;
   wet=max(max(smoothstep(lvl-.12,lvl-.24,h),wf*.85),rut*.35*smoothstep(lvl+.4,lvl+.15,h));
  }
  else if(uT.y<2.5){wet=max(smoothstep(.5,.46,pn+.08*(pn2-.5)),furA*.15);}else{wet=.9+.08*smoothstep(.3,.7,pn2);}
  float nr=smoothstep(vG,1.,v);
  refl=wet*mix(.85,.45,nr);
  vec3 soil=vec3(.0026,.0024,.0024)*(.75+.5*pn2)*(.8+.4*pn3)*(.7+.4*fur*aa);
  if(uT.y>.5&&uT.y<1.5){soil+=vec3(.0045,.0038,.0028)*(.4+.6*pn3)*(1.-wet)*mix(.5,fur,aa);}
  float vm=2.*vH-v;
  vec3 mir=airCol(vm,glw)*1.25+vec3(.0012,.0016,.0028);
#ifdef LAST
  {vec4 L=lastL(u,v-vH,px,sd);mir=mix(mir,L.rgb,L.a);}
#endif
  col=mix(soil,mir,refl);
  resp=(1.-wet)*(.25+.5*fur*aa)*(.6+.6*pn3)+wet*.06;
  hide=0.;cloudR=0.;
  if(uT.y>1.5&&uT.y<2.5){float rd=fbm(vec2(u*7.,.2),px*7.);float rh=smoothstep(.55,.75,rd)*smoothstep(.93-.08*fbm(vec2(u*1.2,.4),px*1.2),1.,v);occ=max(occ,rh*.85);}
 col=mix(col,vec3(.0026,.0026,.003)+air*.12,occ);
 OUT(col,hide,cloudR,refl,occ,resp)
}`,no=ue+`uniform vec4 uO[16];uniform vec4 uH[10];uniform sampler2D tBase,tR;
void main(){
 PRE
 ivec2 ip=ivec2(gl_FragCoord.xy);
 vec4 base=texelFetch(tBase,ip,0),rr=texelFetch(tR,ip,0);
 float refl=rr.g,occ=0.;
 // ---- the things standing in the field
 vec3 lightAdd=vec3(0.);
 for(int i=0;i<16;i++){
  if(float(i)>=uQ.x)break;
  vec4 ob=uO[i];float ty=ob.x,x=u-ob.y,h=ob.z,z=vG-v;
  float a=0.;
  float mpx=1./Wm;
  if(ty<1.5){
   float hw=mpx*(1.15-.6*z/h);
   float aw=clamp(2.*hw/px,.2,1.);
   if(z>0.&&z<h)a=aw*clamp((hw+px*.5-abs(x))/px,0.,1.)*(.8+.2*step(.5,fract(z/(mpx*4.)+abs(x)/(mpx*3.))));
   if(z>=h&&z<h*1.07)a=max(a,.35*clamp((px*.5-abs(x))/px+.5,0.,1.));
   for(int j=1;j<=3;j++){float f=float(j)/3.;vec2 top=vec2(0.,h*f*.96);
    float dl=min(seg(vec2(x,z),top,vec2(-h*.5*f-.004,0.)),seg(vec2(x,z),top,vec2(h*.45*f+.004,0.)));
    a=max(a,.22*clamp(1.-dl/(px*.7),0.,1.));}
   for(int j=0;j<2;j++){float bz=j==0?h*1.0:h*.52;vec2 bp=vec2(x,z-bz);float bl=exp(-dot(bp,bp)/(px*px*1.6));
    lightAdd+=vec3(1.,.07,.03)*bl*.9+vec3(.6,.05,.02)*exp(-length(bp)/(px*9.))*.04;
    vec2 rp=vec2(x,-z-bz);lightAdd+=vec3(.8,.05,.02)*refl*exp(-rp.x*rp.x/(px*px*2.))*exp(-abs(rp.y)/(px*30.))*.3;}
  }else if(ty<2.5){
   vec2 p=vec2(x,z-h*.6)/h;
   float n1=nq(p*.13+ob.w*3.,px/h*.13),n2=nq(p*.4+ob.w*5.,px/h*.4),n3=nq(p*1.3+ob.w,px/h*1.3);
   vec2 pe=p/vec2(.8,.37);pe.y*=pe.y>0.?1.:1.6;
   float f=1.-length(pe)+.42*(n1-.5)+.34*(n2-.5);
   float cr=smoothstep(0.,.06,f)*smoothstep(.22,.5,n3+f*1.3);
   float tw=.055*h*(1.+1.2*smoothstep(.1*h,0.,z));
   float tr=(z>0.&&z<h*.44)?clamp((tw+px*.5-abs(x+.012*h*sin(z/h*9.)))/px,0.,1.):0.;
   float bo=max(clamp(1.-seg(vec2(x,z),vec2(0.,h*.33),vec2(-.46*h,h*.52))/(.022*h+px*.5),0.,1.),clamp(1.-seg(vec2(x,z),vec2(0.,h*.38),vec2(.42*h,h*.58))/(.02*h+px*.5),0.,1.));
   a=max(cr,max(tr,bo));
  }else if(ty<3.5){
   // a Lombardy poplar: a column of upswept branches with no trunk, sides near parallel from low down to two thirds
   // up, then closing to a blunt, slightly split end whose top leans with the wind; ragged at the edge, no two alike
   if(abs(x)<.2*h&&z>-px&&z<h*1.1){
    float sp=fract(ob.y*91.7)*7.,t=z/h;
    float xx=(x-ob.w*.45*h*pow(smoothstep(.5,1.,t),2.))/h;
    float n1=nq(vec2(xx*.6,t*.3)+sp,px/h*.6),n2=nq(vec2(xx*2.,t*1.7)+sp*1.3,px/h*2.),n3=nq(vec2(xx,t)*6.+sp*.7,px/h*6.);
    float cl=clamp((t-.64)/.36,0.,1.);
    float hw=.104*mix(.62,1.,smoothstep(0.,.13,t))*(1.-.1*abs(t-.36)/.3)*sqrt(max(1.-cl*cl,0.))*(.92+.3*(n1-.5))+.03*(n2-.5)*(1.-.5*cl)+.012*(n3-.5);
    hw*=1.-step(.955,t)*smoothstep(.012,0.,abs(xx-.012*(n1-.5)));
    a=(t>0.&&t<1.)?clamp((hw*h+px*.5-abs(xx*h))/px,0.,1.)*mix(.86,1.,n3):0.;
   }
  }else if(ty<4.5){
   float hw=mpx*(2.2-1.1*z/h);
   if(z>0.&&z<h)a=clamp((hw+px*.5-abs(x))/px,0.,1.);
   vec2 hb=vec2(x,z-h);
   a=max(a,step(abs(hb.x+3.*mpx),6.*mpx)*step(abs(hb.y),1.8*mpx));
   for(int j=0;j<3;j++){float th=ob.w+float(j)*2.0944;vec2 dir=vec2(cos(th),sin(th));
    float t=clamp(dot(hb,dir)/(h*.56),0.,1.);float dd=length(hb-dir*t*h*.56);float bw=mpx*mix(1.8,.5,t);
    a=max(a,clamp(2.*bw/px,.45,1.)*clamp((max(bw,px*.5)+px*.5-dd)/px,0.,1.));}
   vec2 bp=vec2(x+3.*mpx,z-h-2.*mpx);lightAdd+=vec3(1.,.07,.03)*exp(-dot(bp,bp)/(px*px*1.6))*.8;
  }else{
   vec2 p=vec2(x,z-h*.45)/h;
   float f=1.-length(p/vec2(.9,.55))+.4*(nq(p*.25+ob.w*7.,px/h*.25)-.5);
   a=smoothstep(0.,.12,f);
  }
  occ=max(occ,a);
 }
 float occT=max(occ,rr.b);
 for(int i=0;i<10;i++){
  if(float(i)>=uQ.y)break;
  vec4 L=uH[i];vec2 d=uv-L.xy;
  vec3 lc=mix(vec3(.9,.95,1.),vec3(1.,.55,.2),L.w)*(uT.x>1.5?1.-.7*shaftC(L.x,L.y,0.):1.);
  float core=exp(-dot(d,d)/(px*px*1.2));
  lightAdd+=lc*L.z*(core*.8+exp(-length(d)/.005)*.03)*(1.-occT);
  vec2 r=vec2(d.x,uv.y-(2.*vH-L.y));
  lightAdd+=lc*L.z*refl*exp(-r.x*r.x/(px*px*3.))*exp(-abs(r.y)/.02)*.4;
 }
 if(uK.w<.5){vec3 col=base.rgb*base.rgb*2.;col=mix(col,vec3(.0026,.0026,.003)+air*.12,occ)+lightAdd;o=vec4(sqrt(clamp(col*.5,0.,1.)),base.a*(1.-occ));}
 else o=vec4(base.rg,max(base.b,occ),base.a);
}`,so=`#version 300 es
precision highp float;
${Rt}
uniform sampler2D tB0,tB1,tG,tN;
out vec4 o;
void main(){
 vec2 uv=gl_FragCoord.xy*uB.x;uv.y=1.-uv.y;
 vec2 tc=vec2(uv.x,1.-uv.y);
 vec4 b0=texture(tB0,tc),b1=texture(tB1,tc);
 vec3 col=b0.rgb*b0.rgb*2.;
 float above=step(uv.y,uC.x-.002);
 vec2 m=vec2(uv.x,2.*uC.x-uv.y);
 float Lc=0.,Lo=0.,La=0.,Lm=0.,Lcm=0.,Lmm=0.;vec2 ld=vec2(0.);
 for(int k=0;k<9;k++){vec4 L=uL[k];vec2 d=uv-L.xy,dm=m-L.xy;float r2=dot(d,d),rm=dot(dm,dm);
  float qq=1.+r2/(L.w*L.w),qm=1.+rm/(L.w*L.w);Lc+=L.z/(qq*sqrt(qq));Lcm+=L.z/(qm*sqrt(qm));
  Lo+=L.z/(1.+r2/.0005);La+=L.z/(1.+r2/.12);Lm+=L.z/(1.+r2/.012);Lmm+=L.z/(1.+rm/.012);ld+=d*(L.z/(qq*sqrt(qq)));}
 // n13: each lump of the base shows a lit face toward the light and a dark face away: the baked response's slope along
 // the line from the light, from two taps a few pixels either side
 vec2 lt=ld*inversesqrt(dot(ld,ld)+1e-12)*16.*uB.x;lt.y=-lt.y;
 float lsl=texture(tB1,tc+lt).r-texture(tB1,tc-lt).r;
 vec3 tint=vec3(.78,.80,1.),cool=vec3(.68,.76,1.);
 vec3 g=texture(tG,tc).rgb/uC.w;
 float sky=(1.-b1.b)*above;
 // the cloud lit from below and inside, the rain round the channel lit as a cool veil
 col+=tint*Lc*b1.r*.26*(1.-b1.b)*clamp(1.+2.6*lsl,.4,1.7);
 col+=g*b1.a*sky*(.4+.3*uD.z);
 col+=cool*(Lm*.03+La*.006)*b1.a*sky*(.6+.5*uD.z);
 // the things standing in the field: dark against the lit rain, a white edge on the side of the channel
 float side=uL[8].x>uv.x?1.:-1.;
 float rim=max(b1.b-texture(tB1,tc+vec2(side*2.5*uB.x,0.)).b,0.);
 col+=tint*(Lo*.02+La*.0035)*b1.b+cool*rim*min(La*.02+Lo*.12,.35);
 if(above<.5){
  float rip=texture(tN,vec2(uv.x*2.5,uv.y*7.+uB.y*.02)).g-.5;
  vec2 mt=vec2(m.x+rip*.004,1.-m.y);
  vec3 gm=texture(tG,mt).rgb/uC.w;
  vec4 bm=texture(tB1,mt);
  // the wet field: soil lit in a broad fan toward the strike's foot, water a mirror of the lit cloud and rain
  col+=tint*La*b1.a*.05*(1.-b1.b);
  col+=b1.g*(gm*.6*(1.-bm.b)+tint*(Lcm*bm.r*.3+La*.035)+cool*Lmm*.04*bm.a);
 }
 o=vec4(col*uC.w,1.);
}`,lo=`#version 300 es
precision highp float;
${Rt}
out vec2 vQ;out float vI;out float vZ;
float h1(float n){return fract(sin(n*12.9898)*43758.5453);}
void main(){
 int id=gl_InstanceID;float f=float(id);
 float z=h1(f*1.17+.3);z=z*z*z;
 float sp=mix(.008,.06,z);
 float u=h1(f*3.71+1.1),v0=h1(f*7.13+2.2);
 float v=fract(v0+uB.y*sp);
 u=fract(u+v*uE.x);
 float L=mix(.007,.075,z)*(.6+.8*h1(f*5.3+.7)),Wd=mix(.0005,.0026,z);
 Wd=max(Wd,.8*uB.x);L=max(L,5.*Wd);
 int c=gl_VertexID;vec2 q=vec2(c==1||c==2||c==4?1.:-1.,c==2||c==4||c==5?1.:-1.);
 vec2 ax=normalize(vec2(uE.x,1.));vec2 nx=vec2(ax.y,-ax.x);
 vec2 p=vec2(u,v)*1.08-.04+ax*q.y*L*.5+nx*q.x*Wd;
 vQ=q;vZ=z;
 float lit=0.;
 for(int k=0;k<9;k++){vec2 d=vec2(u,v)-uL[k].xy;lit+=uL[k].z/(1.+dot(d,d)/.005);}
 // unseen in the dark but for a faint sparkle low over the horizon lights; in a flash, bright beside the channel only
 vI=(.0012*smoothstep(uC.x-.3,uC.x-.02,v)*(v<uC.x?1.:.3)+min(lit,2.5)*.07)*mix(1.,.3,z)*uD.y*(.5+h1(f*9.1+.2));
 gl_Position=vec4(p.x*2.-1.,1.-p.y*2.,0.,1.);
}`,ro=`#version 300 es
precision highp float;
${Rt}
in vec2 vQ;in float vI;in float vZ;out vec4 o;
void main(){
 float a=smoothstep(1.,mix(.15,-.8,vZ),abs(vQ.x))*smoothstep(1.,.45,abs(vQ.y));
 o=vec4(vec3(.82,.86,1.)*vI*a*uC.w,1.);
}`,io=`#version 300 es
precision highp float;
${Rt}
uniform sampler2D tS,tN;
out vec4 o;
void main(){
 vec2 uv=gl_FragCoord.xy*uB.x;
 vec3 c=texture(tS,uv).rgb/uC.w*uD.x;
 c=c*(2.51*c+.03)/(c*(2.43*c+.59)+.14);
 vec2 vp=uv-.5;c*=1.-.06*dot(vp,vp)*1.6;
 // (n13: no grain re-drawn each frame; a still dither of under a level after the gamma, against banding)
 c=pow(clamp(c,0.,1.),vec3(1./2.2))+(texture(tN,gl_FragCoord.xy/256.).r-.5)/255.;
 o=vec4(c,1.);
}`;let c=t.__c317;if(!c){c=t.__c317={sets:[],next:0,tgt:{}},c.vao=t.createVertexArray(),c.floatRT=!!t.getExtension("EXT_color_buffer_float"),c.halfRT=c.floatRT||!!t.getExtension("EXT_color_buffer_half_float"),c.pSky=ht(Tt,De),c.pGnd=ht(Tt,Be),c.pObj=ht(Tt,no),c.pCore=ht(ze,oo),c.pGlow=ht(ze,ao),c.pComp=ht(Tt,so),c.pRain=ht(lo,ro),c.pFin=ht(Tt,io),t.flush(),c.ubo=t.createBuffer(),t.bindBuffer(t.UNIFORM_BUFFER,c.ubo),t.bufferData(t.UNIFORM_BUFFER,16*19,t.DYNAMIC_DRAW);const e=256,a=new Uint8Array(e*e*4);let r=625341585;const l=()=>{r=r+1831565813|0;let h=Math.imul(r^r>>>15,1|r);return h=h+Math.imul(h^h>>>7,61|h)^h,(h^h>>>14)>>>0&255},n=32,s=new Float32Array(n*n),f=new Float32Array(n*n);for(let h=0;h<n*n;h++)s[h]=l()/255,f[h]=l()/255;const u=(h,F,C,H,B)=>F+.5*B*(C-h+B*(2*h-5*F+4*C-H+B*(3*(F-C)+H-h))),g=h=>{const F=new Float64Array(n*e);for(let C=0;C<n;C++)for(let H=0;H<e;H++){const B=H>>3,q=(H&7)/8,Y=O=>h[C*n+(B+O+n)%n];F[C*e+H]=u(Y(-1),Y(0),Y(1),Y(2),q)}return F},x=g(s),K=g(f),D=(h,F,C)=>{const H=C>>3,B=(C&7)/8,q=Y=>h[(H+Y+n)%n*e+F];return u(q(-1),q(0),q(1),q(2),B)};for(let h=0;h<e;h++)for(let F=0;F<e;F++){const C=(h*e+F)*4;a[C]=l(),a[C+3]=l(),a[C+1]=Math.max(0,Math.min(255,Math.round(D(x,F,h)*255))),a[C+2]=Math.max(0,Math.min(255,Math.round(D(K,F,h)*255)))}c.noise=kt(e,e,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR_MIPMAP_LINEAR,t.REPEAT,a),t.generateMipmap(t.TEXTURE_2D),c.scr={}}let Ut=0,E=null,Zt=null,qt=null,Ro=null;const Gt=(e,a)=>{const r=Je(e),l=a??b*(.22+.56*r()),n=Ee==="Upward"&&(a==null||Math.abs(a-Me[re].x)<.12*b),s=Object.assign({},n?Ze:Se,{x0:l});return{it:$e(r,s),r}},Jt=e=>{let a;do a=e.it.next();while(!a.done);return a.value},_e=(e,a)=>{let r=Jt(e);for(let l=0;l<4&&!r.conn;l++)e.r=(e=Gt(Ut++,a)).r,r=Jt(e);return{g:r,r:e.r}};let Ht=null;{let e=-1;for(let a=0;a<(v.home?6:3);a++){const r=Gt(a,v.home?b*(.52+.04*a):null),l=Jt(r),n=l.conn&&l.conn.low>=0,s=l.conn?(l.conn.low>=0?l.nx[l.conn.low]:l.conn.gx)/b:.5,f=(l.conn?1:0)+(n?2:0)+(s>.3&&s<.8?1:0);if(f>e&&(Ht={g:l,r:r.r,k:a},e=f),f>=4)break}Ut=Ht.k+1}if(!c.ok){for(const e of["pSky","pGnd","pObj","pCore","pGlow","pComp","pRain","pFin"])he(c[e]);c.ok=!0}if($t&&!c.pSkyL){const e=a=>a.replace(`#version 300 es
`,`#version 300 es
#define LAST 1
`);c.pSkyL=ht(Tt,e(De)),c.pGndL=ht(Tt,e(Be)),t.flush(),he(c.pSkyL),he(c.pGndL)}const pe=[-9,-9,-9,se],Ne=[0,0,0,Ke];if(ie===2){const e=xt(w(3)^23287,w(6)+17,w(2)^963,w(7)+149),a=Ht.g,r=a.conn?(a.conn.low>=0?a.nx[a.conn.low]:a.conn.gx)/b:.5,l=2+(e()<.4?1:0),n=e()<.5;for(let s=0;s<l;s++){let f=.5;for(let u=0;u<12&&(f=s===0&&n?r+(e()-.5)*.08:.08+.84*e(),!(!(!(s===0&&n)&&Math.abs(f-r)<.16)&&pe.slice(0,s).every(g=>Math.abs(g-f)>.3)));u++);pe[s]=f,Ne[s]=.065+.1*e()}}const V=v.size>400?1024:512;if(c.sets.length<10){const e={res:0};e.bufSub=t.createBuffer(),e.bufStep=t.createBuffer();const a=r=>{const l=t.createVertexArray();t.bindVertexArray(l),t.bindBuffer(t.ARRAY_BUFFER,r);for(let n=0;n<3;n++)t.enableVertexAttribArray(n),t.vertexAttribPointer(n,4,t.FLOAT,!1,48,n*16),t.vertexAttribDivisor(n,1);return t.bindVertexArray(null),l};e.vaoSub=a(e.bufSub),e.vaoStep=a(e.bufStep),c.sets.push(e)}const k=c.sets[c.next%c.sets.length];if(c.next=(c.next+1)%10,k.res!==V&&(k.b0&&(t.deleteTexture(k.b0),t.deleteTexture(k.b1),t.deleteFramebuffer(k.f0),t.deleteFramebuffer(k.f1)),k.b0=kt(V,V,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE),k.f0=It(k.b0),k.b1=kt(V,V,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE),k.f1=It(k.b1),k.res=V),!c.tgt[v.size]){const e=c.halfRT?t.RGBA16F:t.SRGB8_ALPHA8,a=c.halfRT?t.HALF_FLOAT:t.UNSIGNED_BYTE,r=kt(v.size,v.size,e,t.RGBA,a,t.LINEAR,t.CLAMP_TO_EDGE),l=kt(256,256,e,t.RGBA,a,t.LINEAR,t.CLAMP_TO_EDGE);c.tgt[v.size]={sc:r,fs:It(r),gw:l,fg:It(l)}}const te=c.tgt[v.size],co=c.halfRT?1:.25,Ot=(e,a,r,l)=>{t.bindFramebuffer(t.FRAMEBUFFER,a),t.viewport(0,0,r,l),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.colorMask(!0,!0,!0,!0),t.depthMask(!1),t.useProgram(e.p),t.bindVertexArray(c.vao)},ot=(e,a,r,l)=>{t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,l),e.u[a]&&t.uniform1i(e.u[a],r)};{if(!c.scr[V]){const n=kt(V,V,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE);c.scr[V]={t:n,f:It(n)}}const e=c.scr[V],a=new Float32Array(64),r=new Float32Array(40);et.slice(0,16).forEach((n,s)=>a.set([n.t,n.x/b,n.h/b,n.p],s*4)),Ct.forEach((n,s)=>r.set(n,s*4));const l=(n,s)=>{ot(n,"tN",0,c.noise),t.uniform4f(n.u.uK,Nt,Dt,ft,s),t.uniform4f(n.u.uT,ie,Ve,[.05,.8,1.6][_t]*($t?.5:1),Bt),n.u.uR&&t.uniform4fv(n.u.uR,pe),n.u.uR2&&t.uniform4fv(n.u.uR2,Ne),t.uniform4f(n.u.uS,Pe,Ye,b,1/V),t.uniform4f(n.u.uQ,Math.min(16,et.length),Ct.length,[1700,1150,750][Bt],We?ke:0)};for(let n=1;n>=0;n--){for(let f=1;f<4;f++)t.activeTexture(t.TEXTURE0+f),t.bindTexture(t.TEXTURE_2D,null);for(const f of $t?[c.pSkyL,c.pGndL]:[c.pSky,c.pGnd])Ot(f,e.f,V,V),l(f,n),t.drawArrays(t.TRIANGLES,0,3);const s=c.pObj;Ot(s,n?k.f1:k.f0,V,V),l(s,n),ot(s,"tBase",1,e.t),ot(s,"tR",2,n?e.t:k.b1),t.uniform4fv(s.u.uO,a),t.uniform4fv(s.u.uH,r),t.drawArrays(t.TRIANGLES,0,3)}t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null)}const de=(e,a,r)=>{const l=to(a,r,e.up),n=eo(e,l,a);t.bindBuffer(t.ARRAY_BUFFER,k.bufSub),t.bufferData(t.ARRAY_BUFFER,n.sub3,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,k.bufStep),t.bufferData(t.ARRAY_BUFFER,n.st1,t.STATIC_DRAW),E=n};de(Ht.g,Ht.r,!0);let P=Ae&&!(E.conn&&E.conn.up)&&E.sLead!=null?E.sLead-4:E.tl.s0,Ce=3.7;const ve=()=>{qt=Gt(Ut++,null),Zt=null};ve();const xe=new Float32Array(8e3*2.6);{let e=0,a=0;const r=xt(w(1)^20973,w(2),w(3),w(4)),l=[0,.18+r()*.2,.5+r()*.4,1.1+r()*.5];for(let n=0;n<xe.length;n++){const s=n/8e3;e=e*.985+(r()-.5)*.3,a=a*.9+e*.1;let f=0;for(const u of l)s>u&&(f+=Math.exp(-(s-u)*2.8)*(1-Math.exp(-(s-u)*40)));xe[n]=Math.max(-1,Math.min(1,a*f*2.4))*(1-s/2.6)}}const lt=new Float32Array(76),fo=(e,a,r)=>{if(e<=0)return 0;let l=Math.min(1,e/a);return l=l*l*(3-2*l),l*(.75*Math.exp(-e/.2)+r*Math.exp(-e/1.6))},ho=(e,a,r)=>{const l=E.tl;let n=0;e<l.A&&(n=e>l.A*a?.12:0);for(const s of l.st)n+=s[1]*fo(e-(s[0]+(1-a)*.2),r,s[2]);return n*Math.min(1,Math.max(0,(l.tEnd-e)/1.6))},uo=[.7,.75,.5][Bt],me=[.3,.6,1][Bt],be={Near:1.2,Middle:1,Far:.62}[Mt],po=(.032+.02*me)*(.4+.6*be),vo=()=>{const e=E.tl;let a=0;for(let r=0;r<9;r++){const l=E.lp[r],n=Math.min(1.1,ho(P,l[2],.2)),s=l[1]<Nt+.02;lt.set([l[0],l[1],n*(s?1.4:1),s?.12:.07],36+r*4),a+=n}{let r=null,l=0;for(const n of e.fl){const s=P-n.t;if(s<-.1||s>.9)continue;let f=s>0?.45*Math.exp(-s/.25):0;for(let u=0;u<n.n;u++){const g=(s-u*.085)/.03;f+=Math.exp(-g*g)}f*n.a>l&&(l=f*n.a,r=n)}r&&l>lt[38]&&lt.set([r.u,r.y,l,r.w],36)}lt.set([P,e.A,.2,e.tEnd],0),lt.set([1/v.size,Ce,a/9,e.st.length],4),lt.set([ft,.05,.15,co],8),lt.set([1,uo,me,po],12);for(let r=0;r<5;r++){const l=e.st[r]||[99,0,0,.2];lt.set(l,16+r*4)}lt[72]=se,lt[73]=E.conn&&E.conn.up?1:0,t.bindBuffer(t.UNIFORM_BUFFER,c.ubo),t.bufferSubData(t.UNIFORM_BUFFER,0,lt),t.bindBufferBase(t.UNIFORM_BUFFER,0,c.ubo)},xo=Math.round([700,1300,2300][Bt]*(v.size<400?.5:1)),Ie=()=>{vo(),Ot(c.pGlow,te.fg,256,256),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ONE),t.bindVertexArray(k.vaoStep),ot(c.pGlow,"tB0",0,k.b0),t.uniform4f(c.pGlow.u.uM,2,1,0,0),t.drawArraysInstanced(t.TRIANGLES,0,6,E.nStep),t.flush(),Ot(c.pComp,te.fs,v.size,v.size),ot(c.pComp,"tB0",0,k.b0),ot(c.pComp,"tB1",1,k.b1),ot(c.pComp,"tG",2,te.gw),ot(c.pComp,"tN",3,c.noise),t.drawArrays(t.TRIANGLES,0,3),t.enable(t.BLEND),t.blendEquation(t.MAX),t.useProgram(c.pCore.p),t.bindVertexArray(k.vaoSub),ot(c.pCore,"tB0",0,k.b0),ot(c.pCore,"tB1",1,k.b1),ot(c.pCore,"tN",2,c.noise),t.uniform4f(c.pCore.u.uM,0,(1-.15*me)*be,0,0),t.drawArraysInstanced(t.TRIANGLES,0,6,E.nSub),t.uniform4f(c.pCore.u.uM,1,1.6*be,0,0),t.drawArraysInstanced(t.TRIANGLES,0,6,E.nSub),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ONE),t.useProgram(c.pRain.p),t.bindVertexArray(c.vao),t.drawArraysInstanced(t.TRIANGLES,0,6,xo),t.disable(t.BLEND),t.flush(),Ot(c.pFin,null,v.size,v.size),ot(c.pFin,"tS",0,te.sc),ot(c.pFin,"tN",1,c.noise),t.drawArrays(t.TRIANGLES,0,3)};Ie();let Ft=null,jt=!1,we=0,ge=0,Ue=!1,At=0,wt=0;const ee=()=>{for(At=0;At<E.steps.length&&E.steps[At][0]<=P;)At++;for(wt=0;wt<E.tl.st.length&&E.tl.st[wt][0]<=P;)wt++};ee();const mo=e=>{const a=_e(Gt(Ut++,e*b),e*b);de(a.g,a.r,!1),P=E.sEm-.02,ee(),ve(),v.sound.hit("click",.25,{pan:e*2-1})};return(e,a)=>{a=Math.min(.1,Math.max(0,a||0));const r=v.input;for(const s of r.taps())Ft={x:s.x,y:s.y},jt=!1,we=s.x,ge=0;let l=a;r.down&&Ft?(ge+=a,!jt&&Math.abs(r.x-Ft.x)>.02&&(jt=!0),l=jt?(r.x-we)*9:0,we=r.x):Ue&&Ft&&(!jt&&ge<.45&&mo(Ft.x),Ft=null,l=a),Ue=r.down;const n=P;if(P=l<0?Math.max(-.5,P+l):P+l,P>E.tl.tEnd+E.tl.gap){let s=Zt||Jt(qt),f=qt.r;if(!s.conn){const u=_e(Gt(Ut++,null),null);s=u.g,f=u.r}de(s,f,!1),P=E.sEm-.4,ve(),ee()}if(Ce+=l,!Zt&&qt)for(let s=0;s<2;s++){const f=qt.it.next();if(f.done){Zt=f.value;break}}if(P>n&&v.sound.on){let s=0;for(;At<E.steps.length&&E.steps[At][0]<=P;){const f=E.steps[At++];s++<2&&f[2]>.3&&v.sound.hit("click",.05+.1*f[2],{pan:f[1]*2-1})}for(;wt<E.tl.st.length&&E.tl.st[wt][0]<=P;){const f=E.tl.st[wt++];v.sound.hit("kick",.5+.4*f[1],{pan:E.bx*2-1}),v.sound.hit("noise",.35*f[1],{cutoff:380,dur:1.4,pan:E.bx*2-1}),wt===1&&v.sound.pcm(xe,8e3,{vel:.7,pan:E.bx*2-1})}}else P<n&&ee();Ie()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
