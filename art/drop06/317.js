// Slow Lightning: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/317.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Re){Re&&Re.add({num:317,name:"Slow Lightning",fam:"Worlds",recipe:"A lightning strike in slow motion. A branching leader steps down out of the cloud, sparks climb off a mast or a tree to meet it, and when one touches, a bright stroke lights up the cloud and the ground. What's standing in the field and how far away it is change every mint. Tap to send a new strike down there, drag sideways to scrub through it, or hold to freeze it.",interactive:"Tap to fire a new strike above that point (near a mast that starts its own flash, it climbs from the mast), drag sideways to scrub time, hold to freeze the frame",music:!0,gl:!0,fps:30,seed:0,make(m){const t=m.gl,Oe=2e3,je=m.hash.slice(2),xt=(e,a,r,s)=>{let n=e|0,l=a|0,c=r|0,u=s|0;const g=()=>{n|=0,l|=0,c|=0,u|=0;const v=(n+l|0)+u|0;return u=u+1|0,n=l^l>>>9,l=c+(c<<3)|0,c=c<<21|c>>>11,c=c+v|0,(v>>>0)/4294967296};for(let v=0;v<12;v++)g();return g},w=e=>parseInt(je.slice(e*8,e*8+8),16)>>>0,A=xt(w(0),w(1),w(2),w(3)),mt=(e,a)=>{let r=A(),s=a[0];for(const n of a){if(r<n[1]){s=n;break}r-=n[1]}return s[0]};let ut=mt("Receptors",[["Mast and Oak",.42],["Lone Oak",.2],["Two Masts",.14],["Poplar Row",.14],["Wind Turbine",.1]]),Mt=mt("Distance",[["Middle",.45],["Near",.3],["Far",.25]]),Yt=mt("Polarity",[["Negative",.86],["Positive",.14]]),Qt=mt("Strokes",[["Double",.35],["Single",.28],["Triple",.25],["Five",.12]]),oe=mt("Rain",[["Steady",.45],["Light",.3],["Downpour",.25]]),ae=mt("Cloud Base",[["Ragged Scud",.4],["Flat Base",.35],["Rain Shafts",.25]]),bt=mt("Horizon",[["Farm Lights",.45],["Dark Fields",.3],["Town Glow",.25]]),Dt=mt("Ground",[["Flooded Field",.4],["Wet Stubble",.4],["Marsh Pools",.2]]);m.home&&(ut="Mast and Oak",Mt="Middle",Yt="Negative",Qt="Double",oe="Steady",ae="Ragged Scud",bt="Farm Lights",Dt="Flooded Field"),Yt==="Positive"&&(Qt="Single"),m.trait("Receptors",ut),m.trait("Distance",Mt),m.trait("Polarity",Yt),m.trait("Strokes",Qt);const $t=xt(w(5)^3242513,w(6),w(7),w(0)^40503);let ne="Low Horizon",Te=0;{const e=$t(),a=$t(),r=$t();Te=$t(),!m.home&&r<.12&&(Dt="Lake"),m.home||(ne=e<.5?"Low Horizon":e<.74||Dt==="Wet Stubble"?"Big Sky":"Wide Field",bt==="Town Glow"&&a<.45&&(bt="City Skyline"))}const We=bt==="City Skyline",se=(xt(w(2)^202690,w(7)+753,w(4)^20903,w(1)+107)()-.5)*.5,Ae=!m.home&&Te<.1,le=xt(w(6)^202514,w(3)+1489,w(1)^32331,w(5)+713),Zt=!m.home&&le()<.23&&bt!=="Dark Fields",Ke=.1+.045*le(),Xe=bt;Zt&&(bt="Last Light");const re=ut==="Two Masts"?1:ut==="Mast and Oak"||ut==="Wind Turbine"?0:-1,Ee=!m.home&&le()<.09&&re>=0?"Upward":"Downward";m.trait("Rain",oe),m.trait("Cloud Base",ae),m.trait("Horizon",bt),m.trait("Ground",Dt),m.trait("Framing",ne),m.trait("Flash",Ee);const zt={"Low Horizon":.792,"Big Sky":.885,"Wide Field":.655}[ne],ft=zt+.008,b={Near:430,Middle:620,Far:900}[Mt],pt=Yt==="Positive",Le={Single:1,Double:2,Triple:3,Five:5}[Qt],Bt={Light:0,Steady:1,Downpour:2}[oe],ie={"Flat Base":0,"Ragged Scud":1,"Rain Shafts":2}[ae],_t={"Dark Fields":0,"Farm Lights":1,"Town Glow":2,"City Skyline":2}[Xe],Ve={"Flooded Field":0,"Wet Stubble":1,"Marsh Pools":2,Lake:3}[Dt],Nt=(ie===0?.165:.19)+{Near:-.03,Middle:0,Far:.12}[Mt],Pe=A()*7,Ye=A()*7,tt=[],W=e=>(A()-.5)*e;if(ut==="Mast and Oak"){const e=m.home||A()<.5?1:-1;tt.push({t:1,x:b*(.5+e*(.19+W(.06))),h:72+W(16),p:A()}),tt.push({t:2,x:b*(.5-e*(.02+W(.06))),h:21+W(5),p:A()})}else if(ut==="Lone Oak")tt.push({t:2,x:b*(.6+W(.2)),h:25+W(5),p:A()});else if(ut==="Two Masts")tt.push({t:1,x:b*(.28+W(.08)),h:58+W(10),p:A()}),tt.push({t:1,x:b*(.72+W(.08)),h:88+W(12),p:A()});else if(ut==="Poplar Row"){const e=b*(.42+W(.16)),a=5+(A()*3|0);for(let g=0;g<a;g++)W(3),W(7),A();const r=xt(w(7)^37009,w(2)+51,w(0)^497,w(4)+119),s=7+(r()*5|0),n=25+5*r(),l=r()<.45?1+(r()*(s-2)|0):-1,c=r()<.5;let u=e;for(let g=0;g<s;g++){const v=n*(1+(r()-.5)*.12);if(g===l&&c){u+=4.2+1*r();continue}tt.push({t:3,x:u,h:g===l?v*.66:v,p:se}),u+=4.2+1*r()}}else{const e=Math.PI/2+W(.5);tt.push({t:4,x:b*(.6+W(.12)),h:82,p:e}),tt.push({t:2,x:b*(.3+W(.1)),h:18+W(4),p:A()})}for(let e=0;e<3;e++)tt.push({t:5,x:b*(.08+.84*A()),h:3+A()*3,p:A()});const Me=tt.map(e=>{if(e.t===4){const a=.56*e.h;return{x:e.x+a*Math.cos(e.p),h:e.h+a*Math.sin(e.p)}}return{x:e.x,h:e.t===2?e.h*1.02:e.t===3?e.h:e.t===1?e.h*1.06:e.h}}),Ct=[],Qe=[2,6,10][_t],ke=.12+.76*A();if(_t===1){const e=2+(A()*2.2|0);for(let a=0;a<e;a++){const r=.05+.9*A(),s=zt-.001+A()*.005,n=1+(A()*2.6|0);for(let l=0;l<n&&Ct.length<10;l++){const c=l===0?1:A()<.55?.8:.02;Ct.push([r+(l?(A()-.5)*.03:0),s+(l?(A()-.3)*.0025:0),l===0?.6+.4*A():.12+.3*A(),c])}}}else for(let e=0;e<Qe;e++){const a=_t===2?ke+(A()-.5)*.3:.04+.92*A();Ct.push([a,zt-.0015+A()*.009,(.35+.65*A())*(_t===2?.8:1),A()<.75?1:.3])}const $e=function*(e,a){const n=new Float64Array(1600),l=new Float64Array(1600),c=new Float64Array(1600),u=new Float64Array(1600),g=new Int32Array(1600),v=new Int8Array(1600),K=new Int8Array(1600);let z=0;const h=a.a*a.a,k=a.Z0,C=a.W,H=new Int32Array(16),B=(y,d)=>{let R=d/k;for(let T=0;T<z;T++){const S=y-n[T],it=S*S,j=d+l[T],J=d-l[T];R+=c[T]*(1/Math.sqrt(it+J*J+h)-1/Math.sqrt(it+j*j))}return R},q=[];let P=0,O=0;const D=(y,d,R,T,S,it)=>{d=Math.max(d,.6);const j=B(y,d),J=(it-j)/(1/a.a-1/(2*d));n[z]=y,l[z]=d,c[z]=J,u[z]=P,g[z]=R,v[z]=T,K[z]=S;for(const Q of q){const I=Q.c;for(let p=0;p<9;p++){const L=I[p*4]-y,_=L*L,$=I[p*4+1]+d,N=I[p*4+1]-d;I[p*4+2]+=J*(1/Math.sqrt(_+N*N+h)-1/Math.sqrt(_+$*$))}}return z++},dt=(y,d)=>{const R=g[y];let T=d===0?-Math.PI/2:Math.PI/2;R>=0&&v[R]===v[y]&&(T=Math.atan2(l[y]-l[R],n[y]-n[R]));const S=new Float64Array(9*4),it=d===0?a.spread:.62*Math.PI;for(let j=0;j<9;j++){const J=T-it+(j+e())/9*2*it,Q=a.L*(.55+.9*e()*e()+.25*e()),I=n[y]+Q*Math.cos(J),p=Math.max(.6,l[y]+Q*Math.sin(J));S[j*4]=I,S[j*4+1]=p,S[j*4+2]=I<.02*C||I>.98*C||p>a.zTop+40?d===0?9:-9:B(I,p),S[j*4+3]=Q}q.push({n:y,b:O,k:d,c:S})},Y=a.up>=0;if(!Y){const y=D(a.x0,a.zTop+30,-1,0,-1,1);dt(D(a.x0+(e()-.5)*10,a.zTop,y,0,-1,1),0)}const ot=[],gt=[];for(let y=0;y<a.objs.length;y++){const d=a.objs[y],R=4;let T=-1;for(let S=1;S<=R;S++)T=D(d.x,d.h*S/R,T,2,y,0);ot.push(T),gt.push(Y)}let Z=null,at=-1,Kt=0;Y&&(K[ot[a.up]]=a.up,dt(ot[a.up],1));const nt=[],rt=new Float64Array(9);for(;!Z&&O<(Y?900:1100)&&z<1592&&!(at>=0&&O>Kt);){(O&7)===7&&(yield O);let y=0;nt.length=0;for(let p=0;p<q.length;p++){const L=q[p],_=L.c,$=L.k===0,N=$?a.Eth:a.EthS;let o=-1;for(let M=0;M<9;M++){if($&&!Y&&_[M*4+1]>l[L.n])continue;const U=$?(1-_[M*4+2])/_[M*4+3]:_[M*4+2]/_[M*4+3];U>o&&(o=U)}const i=o-N;if(i<=0||!$&&H[K[L.n]]>a.sMax){if(O-L.b>30){q.splice(p--,1);continue}nt.push(0);continue}const x=($?1:a.sRate)*Math.pow(i/N,a.etaR);nt.push(x),y+=x}if(!(y>0))break;let d=e()*y,R=0;for(;R<nt.length-1&&(d-=nt[R],!(d<=0));R++);const T=q[R],S=T.k===0,it=S?a.Eth:a.EthS;q.splice(R,1),P+=-Math.log(1-e()*.999)/y,O++;let j=0;for(let p=0;p<9;p++){const _=(S?(1-T.c[p*4+2])/T.c[p*4+3]:T.c[p*4+2]/T.c[p*4+3])-it;rt[p]=_>0&&!(S&&!Y&&T.c[p*4+1]>l[T.n])?Math.pow(_,a.eta):0,j+=rt[p]}if(!(j>0))continue;let J=e()*j,Q=0;for(;Q<8&&(J-=rt[Q],!(J<=0));Q++);let I=-1;if(e()<(S?a.pb:a.pbS)){let p=0;for(let L=0;L<9;L++)Math.min(Math.abs(L-Q),9-Math.abs(L-Q))<2&&(rt[L]=0),p+=rt[L];if(p>0){let L=e()*p;for(I=0;I<8&&(L-=rt[I],!(L<=0&&rt[I]>0));I++);rt[I]>0||(I=-1)}}for(const p of I>=0?[Q,I]:[Q]){const L=T.c[p*4],_=T.c[p*4+1],$=D(L,_,T.n,S?0:1,K[T.n],S?1:0);if(S||H[K[T.n]]++,dt($,T.k),Y&&at<0&&_>a.zTop&&(at=$,Kt=O+a.upMore),S){_<a.jump*.55&&(Z={lead:$,low:-1,gx:L+(e()-.5)*4});for(let N=0;N<z&&!Z;N++)if(v[N]===1||v[N]===2&&ot.includes(N)){const o=n[N]-L,i=l[N]-_;o*o+i*i<a.jump*a.jump&&(Z={lead:$,low:N})}}else for(let N=0;N<z&&!Z;N++)if(v[N]===0){const o=n[N]-L,i=l[N]-_;o*o+i*i<a.jump*a.jump&&(Z={lead:N,low:$})}if(Z)break}for(let p=0;p<ot.length;p++)if(!gt[p]){const L=ot[p],_=4;B(n[L],l[L]+_)/_>a.Elaunch*a.objs[p].k&&(gt[p]=!0,K[L]=p,dt(L,1))}}if(Y){if(at<0){at=ot[a.up];for(let d=0;d<z;d++)v[d]===1&&l[d]>l[at]&&(at=d)}for(let d=0;d<z;d++)v[d]===1&&(v[d]=0);const y=ot[a.up];v[y]=0,g[y]=-1,Z={lead:at,low:-1,gx:n[y],up:!0}}return{N:z,nx:n,nz:l,nq:c,nt:u,par:g,kind:v,nob:K,conn:Z,T:P,ev:O,launched:gt,up:Y}},Se=Mt==="Far"?(ft-Nt+.08)*b:ft*b+.02*b,ce=1.4*Se,fe=720/ce,Fe={W:b,zTop:Se,Z0:ce,a:1.5,L:pt?10:13,Eth:(pt?.0095:.008)*fe,EthS:.007*fe,eta:pt?6:4,etaR:.6,pb:pt?.035:.12,pbS:.05,spread:pt?1.45:1.6,jump:24,Elaunch:.026*fe,sRate:.7,sMax:pt?28:40,objs:Me.map((e,a)=>({x:e.x,h:e.h,k:[1,1,.6,.6,1,.8][tt[a].t]})),up:-1},Ze=Object.assign({},Fe,{Z0:ce/4,pbS:.15,sMax:2e3,up:re,upMore:60}),Je=e=>xt(w(4)^Math.imul(e+1,2654435761),w(5)+e*7919,w(6),w(7)^e),to=(e,a,r)=>{const s=2.6+e()*.8,n=[];let l=s;for(let h=0;h<Le;h++)h>0&&(l+=(Le===5?.6:.8)+e()*.45),n.push([l,h===0?pt?1.25:1:.5+e()*.35,h===0?pt?.9:.32:.15+e()*.15,.2+e()*.06]);r&&n.forEach((h,k)=>{h[1]*=k===0?.42:.6,h[2]=k===0?.95:.45});const c=l+(pt?4.4:3.2),u=e()<.22?3+e()*4:.4+e()*1.4,g=[],v=n[n.length-1][0],K=h=>g.push({t:h,u:.08+.84*e(),y:.05+(zt-.3)*e(),a:.3+.2*e(),w:.13+.12*e(),n:1+(e()*3|0)});e()<(a&&Ae?1:.6)&&K(.35*s+e()*(.65*s-.5));for(let h=v+.6+.5*e();h<c+u-.2;h+=.45+.9*e())K(h);const z=a?n[0][0]+.24-4:0;return{A:s,st:n,tEnd:c,s0:z,gap:u,fl:g}},eo=(e,a,r)=>{const{N:s,nx:n,nz:l,par:c,kind:u,nt:g,conn:v}=e,K=a.A,z=Math.max(e.T,1e-9),h=[0],k=[0];if(v){const o=[];let i=v.lead;for(;i>=0;)o.push(i),i=c[i];o.reverse();const x=l[o[0]],M=Math.max(1,l[o[o.length-1]]),U=e.up?-1:1;let vt=0,yt=0;for(const ct of o){const Et=g[ct]/z,Ft=Math.min(1,Math.max(yt,U*(x-l[ct])/Math.max(1,U*(x-M))));Et>vt+1e-9&&(h.push(Et),k.push(Ft),vt=Et,yt=Ft)}}h.push(1.0001),k.push(1);const C=o=>{let i=1;for(;i<h.length-1&&h[i]<o;)i++;const x=Math.min(1,Math.max(0,(o-h[i-1])/Math.max(1e-9,h[i]-h[i-1])));return k[i-1]+(k[i]-k[i-1])*x},H=o=>K*Math.pow(Math.min(1,C(g[o]/z)),.85),B=new Uint8Array(s),q=new Float32Array(s),P=new Int32Array(s).fill(-1),O=[];if(v){let o=v.lead;const i=[];for(;o>=0;)i.push(o),o=c[o];if(e.up||i.reverse(),O.push(...i),v.low>=0){for(o=v.low;o>=0&&u[o]===1;)O.push(o),o=c[o];o>=0&&O.push(o)}}const D=O.map(o=>[n[o],l[o]]);v&&v.low<0&&!e.up&&D.push([v.gx,0]);let dt=0;const Y=[0];for(let o=1;o<D.length;o++)dt+=Math.hypot(D[o][0]-D[o-1][0],D[o][1]-D[o-1][1]),Y.push(dt);O.forEach((o,i)=>{B[o]=1,q[o]=Y[i]/Math.max(dt,1)});const ot=new Float32Array(s),gt=new Float32Array(s).fill(1e4);for(let o=s-1;o>=0;o--){const i=c[o];i>=0&&u[o]!==2&&(ot[i]+=ot[o]+1,gt[i]=Math.min(gt[i],H(o)))}for(let o=0;o<s;o++){if(B[o]){P[o]=o;continue}const i=c[o];u[o]===0&&i>=0&&(P[o]=P[i])}const Z=new Float32Array(s),at=new Int32Array(s);for(let o=s-1;o>=0;o--){const i=c[o];i>=0&&u[o]!==2&&(Z[i]=Math.max(Z[i],Z[o]+1))}for(let o=0;o<s;o++){const i=c[o];at[o]=i<0||B[i]||u[i]!==u[o]?o:at[i]}const Kt=o=>B[o]?1:Z[o]/(Z[at[o]]+1),nt=[],rt=(o,i,x,M,U,vt,yt,ct,Et,Ft,Xt,ye)=>nt.push([o/b,ft-i/b,x/b,ft-M/b,U,vt,yt,ct,Et,Ft,Xt,ye]),y=o=>{const i=c[o];if(i<0)return null;const x=n[o]-n[i],M=l[o]-l[i],U=Math.hypot(x,M);return U>1e-6&&u[i]===u[o]?[x/U,-M/U]:null};for(let o=0;o<s;o++){const i=c[o];if(i<0||u[o]===2||u[o]===0&&u[i]!==0)continue;let x,M;B[o]&&B[i]?(x=0,M=q[o]):u[o]===0?(x=1,M=P[o]>=0?q[P[o]]:0):(x=2,M=1);const U=e.up?Math.min(1,Math.max(.3,Math.sqrt(ot[o]+1)/3)):Math.min(1,Math.max(.12,Math.sqrt(ot[o]+1)/5)),vt=B[o]&&B[i],yt=vt||B[i]||u[i]!==u[o]?1:Kt(i),ct=vt?1:Kt(o);rt(n[i],l[i],n[o],l[o],H(o),gt[o],M,x,B[o]?1:U,u[o]===1?null:y(i),yt,ct)}if(v&&!e.up){const o=v.lead,i=v.low;rt(n[o],l[o],i>=0?n[i]:v.gx,i>=0?l[i]:0,K*.995,1e4,i>=0?q[i]:1,0,1,y(o),1,1)}const d=4,R=new Float32Array(nt.length*d*12),T=new Float32Array(nt.length*12),S=r()*6.28,it=r()*6.28,j=D.length?ft-D[0][1]/b:-1,J=o=>(1+.33*(.55*Math.sin(o*23+S)+.45*Math.sin(o*61+it)))*Math.min(1,Math.max(.04,(o-j)/.04));nt.forEach((o,i)=>{const x=o[2]-o[0],M=o[3]-o[1],U=Math.hypot(x,M)||1e-6,vt=-M/U,yt=x/U,ct=o[9],Et=ct?o[0]+ct[0]*U*.12:o[0]+x*.5,Ft=ct?o[1]+ct[1]*U*.12:o[1]+M*.5,Xt=(r()-.5)*(r()<1/6?.7:.4)*U,ye=Xt*.5+(r()-.5)*.22*U,bo=Xt*.5+(r()-.5)*.22*U,qe=[0,ye,Xt,bo,0],Lt=[];for(let X=0;X<=d;X++){const G=X/d,Vt=(1-G)*(1-G),Pt=2*G*(1-G),He=G*G;Lt.push([Vt*o[0]+Pt*Et+He*o[2]+vt*qe[X],Vt*o[1]+Pt*Ft+He*o[3]+yt*qe[X]])}const wo=r(),Ge=o[7]===0;for(let X=0;X<d;X++){const G=(i*d+X)*12,Vt=o[10]+(o[11]-o[10])*X/d,Pt=o[10]+(o[11]-o[10])*(X+1)/d;R[G]=Lt[X][0],R[G+1]=Lt[X][1],R[G+2]=Lt[X+1][0],R[G+3]=Lt[X+1][1],R[G+4]=o[4],R[G+5]=o[5],R[G+6]=o[6],R[G+7]=o[7],R[G+8]=o[8]*Math.pow(.5*(Vt+Pt),.3),R[G+9]=.6*wo+.4*r(),R[G+10]=Ge?J(Lt[X][1]):Vt,R[G+11]=Ge?J(Lt[X+1][1]):Pt}T.set([o[0],o[1],o[2],o[3],o[4],o[5],o[6],o[7],o[8]*Math.pow(.5*(o[10]+o[11]),.3),r(),1,1],i*12)});const Q=[],I=o=>{if(!D.length)return[.5,.5];const i=o*dt;let x=1;for(;x<D.length-1&&Y[x]<i;)x++;const M=(i-Y[x-1])/Math.max(1e-6,Y[x]-Y[x-1]);return[(D[x-1][0]+(D[x][0]-D[x-1][0])*M)/b,ft-(D[x-1][1]+(D[x][1]-D[x-1][1])*M)/b]};for(let o=0;o<9;o++){const i=o/8,x=I(i);Q.push([x[0],x[1],i])}const p=[];for(let o=0;o<s;o++)u[o]!==2&&c[o]>=0&&p.push([H(o),n[o]/b,B[o]?1:u[o]===1?.6:.35]);p.sort((o,i)=>o[0]-i[0]);const L=D.length?D[D.length-1]:[b/2,0],_=(o,i)=>{const x=Nt+o*(ft-Nt);for(const M of O)if(u[M]===0&&ft-l[M]/b>=x)return Math.min(K-.05,H(M));return i},$=_(.88,null),N=e.up?.2:_(.06,K*.3);return{sub3:R,st1:T,nSub:nt.length*d,nStep:nt.length,lp:Q,steps:p,bx:L[0]/b,conn:v,tl:a,sLead:$,sEm:N}},ht=(e,a)=>{const r=t.createProgram(),s=t.createShader(t.VERTEX_SHADER);t.shaderSource(s,e),t.compileShader(s);const n=t.createShader(t.FRAGMENT_SHADER);return t.shaderSource(n,a),t.compileShader(n),t.attachShader(r,s),t.attachShader(r,n),t.linkProgram(r),{p:r,a:s,b:n,u:{}}},he=e=>{if(!t.getProgramParameter(e.p,t.LINK_STATUS))throw new Error("317 link: "+t.getProgramInfoLog(e.p)+" "+t.getShaderInfoLog(e.b)+" "+t.getShaderInfoLog(e.a));t.useProgram(e.p);const a=t.getUniformBlockIndex(e.p,"U");a!==4294967295&&t.uniformBlockBinding(e.p,a,0);const r=t.getProgramParameter(e.p,t.ACTIVE_UNIFORMS);for(let s=0;s<r;s++){const n=t.getActiveUniform(e.p,s),l=t.getUniformLocation(e.p,n.name);l&&(e.u[n.name.replace("[0]","")]=l)}},kt=(e,a,r,s,n,l,c,u)=>{const g=t.createTexture();return t.bindTexture(t.TEXTURE_2D,g),t.texImage2D(t.TEXTURE_2D,0,r,e,a,0,s,n,u||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,l===t.NEAREST?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,c),g},It=e=>{const a=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),a},Rt="layout(std140) uniform U{vec4 uA,uB,uC,uD;vec4 uSt[5];vec4 uL[9];vec4 uE;};",Tt=`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}`,De=`#version 300 es
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
`,ze=ue+`void main(){
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
}`;let f=t.__c317;if(!f){f=t.__c317={},f.vao=t.createVertexArray(),f.floatRT=!!t.getExtension("EXT_color_buffer_float"),f.halfRT=f.floatRT||!!t.getExtension("EXT_color_buffer_half_float"),f.pSky=ht(Tt,ze),f.pGnd=ht(Tt,Be),f.pObj=ht(Tt,no),f.pCore=ht(De,oo),f.pGlow=ht(De,ao),f.pComp=ht(Tt,so),f.pRain=ht(lo,ro),f.pFin=ht(Tt,io),t.flush(),f.ubo=t.createBuffer(),t.bindBuffer(t.UNIFORM_BUFFER,f.ubo),t.bufferData(t.UNIFORM_BUFFER,16*19,t.DYNAMIC_DRAW);const e=256,a=new Uint8Array(e*e*4);let r=625341585;const s=()=>{r=r+1831565813|0;let h=Math.imul(r^r>>>15,1|r);return h=h+Math.imul(h^h>>>7,61|h)^h,(h^h>>>14)>>>0&255},n=32,l=new Float32Array(n*n),c=new Float32Array(n*n);for(let h=0;h<n*n;h++)l[h]=s()/255,c[h]=s()/255;const u=(h,k,C,H,B)=>k+.5*B*(C-h+B*(2*h-5*k+4*C-H+B*(3*(k-C)+H-h))),g=h=>{const k=new Float64Array(n*e);for(let C=0;C<n;C++)for(let H=0;H<e;H++){const B=H>>3,q=(H&7)/8,P=O=>h[C*n+(B+O+n)%n];k[C*e+H]=u(P(-1),P(0),P(1),P(2),q)}return k},v=g(l),K=g(c),z=(h,k,C)=>{const H=C>>3,B=(C&7)/8,q=P=>h[(H+P+n)%n*e+k];return u(q(-1),q(0),q(1),q(2),B)};for(let h=0;h<e;h++)for(let k=0;k<e;k++){const C=(h*e+k)*4;a[C]=s(),a[C+3]=s(),a[C+1]=Math.max(0,Math.min(255,Math.round(z(v,k,h)*255))),a[C+2]=Math.max(0,Math.min(255,Math.round(z(K,k,h)*255)))}f.noise=kt(e,e,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR_MIPMAP_LINEAR,t.REPEAT,a),t.generateMipmap(t.TEXTURE_2D)}let Ut=0,E=null,Jt=null,qt=null,Ro=null;const Gt=(e,a)=>{const r=Je(e),s=a??b*(.22+.56*r()),n=Ee==="Upward"&&(a==null||Math.abs(a-Me[re].x)<.12*b),l=Object.assign({},n?Ze:Fe,{x0:s});return{it:$e(r,l),r}},te=e=>{let a;do a=e.it.next();while(!a.done);return a.value},_e=(e,a)=>{let r=te(e);for(let s=0;s<4&&!r.conn;s++)e.r=(e=Gt(Ut++,a)).r,r=te(e);return{g:r,r:e.r}};let Ht=null;{let e=-1;for(let a=0;a<(m.home?6:3);a++){const r=Gt(a,m.home?b*(.52+.04*a):null),s=te(r),n=s.conn&&s.conn.low>=0,l=s.conn?(s.conn.low>=0?s.nx[s.conn.low]:s.conn.gx)/b:.5,c=(s.conn?1:0)+(n?2:0)+(l>.3&&l<.8?1:0);if(c>e&&(Ht={g:s,r:r.r,k:a},e=c),c>=4)break}Ut=Ht.k+1}if(!f.ok){for(const e of["pSky","pGnd","pObj","pCore","pGlow","pComp","pRain","pFin"])he(f[e]);f.ok=!0}if(Zt&&!f.pSkyL){const e=a=>a.replace(`#version 300 es
`,`#version 300 es
#define LAST 1
`);f.pSkyL=ht(Tt,e(ze)),f.pGndL=ht(Tt,e(Be)),t.flush(),he(f.pSkyL),he(f.pGndL)}const pe=[-9,-9,-9,se],Ne=[0,0,0,Ke];if(ie===2){const e=xt(w(3)^23287,w(6)+17,w(2)^963,w(7)+149),a=Ht.g,r=a.conn?(a.conn.low>=0?a.nx[a.conn.low]:a.conn.gx)/b:.5,s=2+(e()<.4?1:0),n=e()<.5;for(let l=0;l<s;l++){let c=.5;for(let u=0;u<12&&(c=l===0&&n?r+(e()-.5)*.08:.08+.84*e(),!(!(!(l===0&&n)&&Math.abs(c-r)<.16)&&pe.slice(0,l).every(g=>Math.abs(g-c)>.3)));u++);pe[l]=c,Ne[l]=.065+.1*e()}}const st=m.size>400?1024:512,F={};{F.bufSub=t.createBuffer(),F.bufStep=t.createBuffer();const e=a=>{const r=t.createVertexArray();t.bindVertexArray(r),t.bindBuffer(t.ARRAY_BUFFER,a);for(let s=0;s<3;s++)t.enableVertexAttribArray(s),t.vertexAttribPointer(s,4,t.FLOAT,!1,48,s*16),t.vertexAttribDivisor(s,1);return t.bindVertexArray(null),r};F.vaoSub=e(F.bufSub),F.vaoStep=e(F.bufStep),F.b0=kt(st,st,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE),F.f0=It(F.b0),F.b1=kt(st,st,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE),F.f1=It(F.b1)}let Ot;{const e=f.halfRT?t.RGBA16F:t.SRGB8_ALPHA8,a=f.halfRT?t.HALF_FLOAT:t.UNSIGNED_BYTE,r=kt(m.size,m.size,e,t.RGBA,a,t.LINEAR,t.CLAMP_TO_EDGE),s=kt(256,256,e,t.RGBA,a,t.LINEAR,t.CLAMP_TO_EDGE);Ot={sc:r,fs:It(r),gw:s,fg:It(s)}}const co=f.halfRT?1:.25,jt=(e,a,r,s)=>{t.bindFramebuffer(t.FRAMEBUFFER,a),t.viewport(0,0,r,s),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.colorMask(!0,!0,!0,!0),t.depthMask(!1),t.useProgram(e.p),t.bindVertexArray(f.vao)},et=(e,a,r,s)=>{t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,s),e.u[a]&&t.uniform1i(e.u[a],r)};{const e={t:kt(st,st,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE)};e.f=It(e.t);const a=new Float32Array(64),r=new Float32Array(40);tt.slice(0,16).forEach((n,l)=>a.set([n.t,n.x/b,n.h/b,n.p],l*4)),Ct.forEach((n,l)=>r.set(n,l*4));const s=(n,l)=>{et(n,"tN",0,f.noise),t.uniform4f(n.u.uK,Nt,zt,ft,l),t.uniform4f(n.u.uT,ie,Ve,[.05,.8,1.6][_t]*(Zt?.5:1),Bt),n.u.uR&&t.uniform4fv(n.u.uR,pe),n.u.uR2&&t.uniform4fv(n.u.uR2,Ne),t.uniform4f(n.u.uS,Pe,Ye,b,1/st),t.uniform4f(n.u.uQ,Math.min(16,tt.length),Ct.length,[1700,1150,750][Bt],We?ke:0)};for(let n=1;n>=0;n--){for(let c=1;c<4;c++)t.activeTexture(t.TEXTURE0+c),t.bindTexture(t.TEXTURE_2D,null);for(const c of Zt?[f.pSkyL,f.pGndL]:[f.pSky,f.pGnd])jt(c,e.f,st,st),s(c,n),t.drawArrays(t.TRIANGLES,0,3);const l=f.pObj;jt(l,n?F.f1:F.f0,st,st),s(l,n),et(l,"tBase",1,e.t),et(l,"tR",2,n?e.t:F.b1),t.uniform4fv(l.u.uO,a),t.uniform4fv(l.u.uH,r),t.drawArrays(t.TRIANGLES,0,3)}t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null),t.deleteFramebuffer(e.f),t.deleteTexture(e.t)}const de=(e,a,r)=>{const s=to(a,r,e.up),n=eo(e,s,a);t.bindBuffer(t.ARRAY_BUFFER,F.bufSub),t.bufferData(t.ARRAY_BUFFER,n.sub3,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,F.bufStep),t.bufferData(t.ARRAY_BUFFER,n.st1,t.STATIC_DRAW),E=n};de(Ht.g,Ht.r,!0);let V=Ae&&!(E.conn&&E.conn.up)&&E.sLead!=null?E.sLead-4:E.tl.s0,Ce=3.7;const ve=()=>{qt=Gt(Ut++,null),Jt=null};ve();const xe=new Float32Array(8e3*2.6);{let e=0,a=0;const r=xt(w(1)^20973,w(2),w(3),w(4)),s=[0,.18+r()*.2,.5+r()*.4,1.1+r()*.5];for(let n=0;n<xe.length;n++){const l=n/8e3;e=e*.985+(r()-.5)*.3,a=a*.9+e*.1;let c=0;for(const u of s)l>u&&(c+=Math.exp(-(l-u)*2.8)*(1-Math.exp(-(l-u)*40)));xe[n]=Math.max(-1,Math.min(1,a*c*2.4))*(1-l/2.6)}}const lt=new Float32Array(76),fo=(e,a,r)=>{if(e<=0)return 0;let s=Math.min(1,e/a);return s=s*s*(3-2*s),s*(.75*Math.exp(-e/.2)+r*Math.exp(-e/1.6))},ho=(e,a,r)=>{const s=E.tl;let n=0;e<s.A&&(n=e>s.A*a?.12:0);for(const l of s.st)n+=l[1]*fo(e-(l[0]+(1-a)*.2),r,l[2]);return n*Math.min(1,Math.max(0,(s.tEnd-e)/1.6))},uo=[.7,.75,.5][Bt],me=[.3,.6,1][Bt],be={Near:1.2,Middle:1,Far:.62}[Mt],po=(.032+.02*me)*(.4+.6*be),vo=()=>{const e=E.tl;let a=0;for(let r=0;r<9;r++){const s=E.lp[r],n=Math.min(1.1,ho(V,s[2],.2)),l=s[1]<Nt+.02;lt.set([s[0],s[1],n*(l?1.4:1),l?.12:.07],36+r*4),a+=n}{let r=null,s=0;for(const n of e.fl){const l=V-n.t;if(l<-.1||l>.9)continue;let c=l>0?.45*Math.exp(-l/.25):0;for(let u=0;u<n.n;u++){const g=(l-u*.085)/.03;c+=Math.exp(-g*g)}c*n.a>s&&(s=c*n.a,r=n)}r&&s>lt[38]&&lt.set([r.u,r.y,s,r.w],36)}lt.set([V,e.A,.2,e.tEnd],0),lt.set([1/m.size,Ce,a/9,e.st.length],4),lt.set([ft,.05,.15,co],8),lt.set([1,uo,me,po],12);for(let r=0;r<5;r++){const s=e.st[r]||[99,0,0,.2];lt.set(s,16+r*4)}lt[72]=se,lt[73]=E.conn&&E.conn.up?1:0,t.bindBuffer(t.UNIFORM_BUFFER,f.ubo),t.bufferSubData(t.UNIFORM_BUFFER,0,lt),t.bindBufferBase(t.UNIFORM_BUFFER,0,f.ubo)},xo=Math.round([700,1300,2300][Bt]*(m.size<400?.5:1)),Ie=()=>{vo(),jt(f.pGlow,Ot.fg,256,256),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ONE),t.bindVertexArray(F.vaoStep),et(f.pGlow,"tB0",0,F.b0),t.uniform4f(f.pGlow.u.uM,2,1,0,0),t.drawArraysInstanced(t.TRIANGLES,0,6,E.nStep),t.flush(),jt(f.pComp,Ot.fs,m.size,m.size),et(f.pComp,"tB0",0,F.b0),et(f.pComp,"tB1",1,F.b1),et(f.pComp,"tG",2,Ot.gw),et(f.pComp,"tN",3,f.noise),t.drawArrays(t.TRIANGLES,0,3),t.enable(t.BLEND),t.blendEquation(t.MAX),t.useProgram(f.pCore.p),t.bindVertexArray(F.vaoSub),et(f.pCore,"tB0",0,F.b0),et(f.pCore,"tB1",1,F.b1),et(f.pCore,"tN",2,f.noise),t.uniform4f(f.pCore.u.uM,0,(1-.15*me)*be,0,0),t.drawArraysInstanced(t.TRIANGLES,0,6,E.nSub),t.uniform4f(f.pCore.u.uM,1,1.6*be,0,0),t.drawArraysInstanced(t.TRIANGLES,0,6,E.nSub),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ONE),t.useProgram(f.pRain.p),t.bindVertexArray(f.vao),t.drawArraysInstanced(t.TRIANGLES,0,6,xo),t.disable(t.BLEND),t.flush(),jt(f.pFin,null,m.size,m.size),et(f.pFin,"tS",0,Ot.sc),et(f.pFin,"tN",1,f.noise),t.drawArrays(t.TRIANGLES,0,3)};Ie();let St=null,Wt=!1,we=0,ge=0,Ue=!1,At=0,wt=0;const ee=()=>{for(At=0;At<E.steps.length&&E.steps[At][0]<=V;)At++;for(wt=0;wt<E.tl.st.length&&E.tl.st[wt][0]<=V;)wt++};ee();const mo=e=>{const a=_e(Gt(Ut++,e*b),e*b);de(a.g,a.r,!1),V=E.sEm-.02,ee(),ve(),m.sound.hit("click",.25,{pan:e*2-1})};return(e,a)=>{a=Math.min(.1,Math.max(0,a||0));const r=m.input;for(const l of r.taps())St={x:l.x,y:l.y},Wt=!1,we=l.x,ge=0;let s=a;r.down&&St?(ge+=a,!Wt&&Math.abs(r.x-St.x)>.02&&(Wt=!0),s=Wt?(r.x-we)*9:0,we=r.x):Ue&&St&&(!Wt&&ge<.45&&mo(St.x),St=null,s=a),Ue=r.down;const n=V;if(V=s<0?Math.max(-.5,V+s):V+s,V>E.tl.tEnd+E.tl.gap){let l=Jt||te(qt),c=qt.r;if(!l.conn){const u=_e(Gt(Ut++,null),null);l=u.g,c=u.r}de(l,c,!1),V=E.sEm-.4,ve(),ee()}if(Ce+=s,!Jt&&qt)for(let l=0;l<2;l++){const c=qt.it.next();if(c.done){Jt=c.value;break}}if(V>n&&m.sound.on){let l=0;for(;At<E.steps.length&&E.steps[At][0]<=V;){const c=E.steps[At++];l++<2&&c[2]>.3&&m.sound.hit("click",.05+.1*c[2],{pan:c[1]*2-1})}for(;wt<E.tl.st.length&&E.tl.st[wt][0]<=V;){const c=E.tl.st[wt++];m.sound.hit("kick",.5+.4*c[1],{pan:E.bx*2-1}),m.sound.hit("noise",.35*c[1],{cutoff:380,dur:1.4,pan:E.bx*2-1}),wt===1&&m.sound.pcm(xe,8e3,{vel:.7,pan:E.bx*2-1})}}else V<n&&ee();Ie()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
