// Conkers: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/255.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(to){to&&to.add({num:255,name:"Conkers",fam:"Worlds",recipe:"Two conkers on knotted strings over fallen leaves, swinging like real pendulums, and each knock bruises the shell and opens a split until one finally breaks into pale chunks. The conkers, the ground and the other player change every mint. Drag to pull yours (the left one) back and let go to swing it, or tap for a quick swing. The other player always swings back.",interactive:"Drag anywhere to pull your conker (the left one) back, and let go to swing it; tap for a quick swing. The other player takes a turn after yours.",music:!0,gl:!0,fps:30,seed:0,make(M){const r=M.gl,wt=M.size,eo=11,Oo=59,jo=91,oo=179,ne=195,Ct=200,ao=220;let et=-2128831035;for(let t=2;t<M.hash.length;t++)et=Math.imul(et^M.hash.charCodeAt(t),16777619);const w=()=>{et=et+1831565813|0;let t=Math.imul(et^et>>>15,1|et);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let yt=et^1540483477|0;const ze=()=>{yt=yt+1831565813|0;let t=Math.imul(yt^yt>>>15,1|yt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},pt=t=>{let e=0;for(const a of t)e+=a[1];let o=w()*e;for(const a of t)if(o-=a[1],o<=0)return a[0];return t[0][0]},q=()=>(w()+w()+w()-1.5)*1.15;let ot=pt([["Low sun",45],["Golden hour",28],["Misty morning",19],["Last light",8]]),se=pt([["Cotton string",45],["Garden twine",27],["Bootlace",20],["Red wool",8]]),re=pt([["Round",40],["Flat-sided",30],["Big scar",21],["Seasoned",9]]),Dt=pt([["Round",38],["Lopsided",32],["Pale",21],["Cheesecutter",9]]),Gt=pt([["Chestnut leaves",44],["Husks and conkers",34],["After rain",14],["Frost",8]]),Me=pt([["Fresh pair",55],["Veteran",35],["Grudge match",10]]),Ce=pt([["Gentle",50],["Steady",36],["Wild",14]]),F=pt([["Macro",52],["Close",31],["Long",17]]);M.home&&(ot="Low sun",se="Cotton string",re="Round",Dt="Lopsided",Gt="Husks and conkers",Me="Veteran",Ce="Gentle",F="Macro");let At=1540483477;for(let t=2;t<M.hash.length;t++)At=Math.imul(At^M.hash.charCodeAt(t),16777619)^At>>>13;const Io=()=>{At=At+1831565813|0;let t=Math.imul(At^At>>>15,1|At);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let zt=(()=>{const t=[["",50],["at the strike",34],["drawn back",16]];let e=Io()*100;for(const o of t)if(e-=o[1],e<=0)return o[0];return t[0][0]})();zt==="drawn back"&&F==="Macro"&&(zt="at the strike"),M.home&&(zt="");let Rt=795580947;for(let t=2;t<M.hash.length;t++)Rt=Math.imul(Rt^M.hash.charCodeAt(t),16777619)^Rt>>>11;const co=()=>{Rt=Rt+1831565813|0;let t=Math.imul(Rt^Rt>>>15,1|Rt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let O=(()=>{const t=[["Three-quarter",46],["Down the line",24],["Low",18],["From above",12]];let e=co()*100;for(const o of t)if(e-=o[1],e<=0)return o[0];return t[0][0]})();M.home&&(O="Three-quarter");const Ko=F,no=O,Wo=Gt;let St=1359893119;for(let t=2;t<M.hash.length;t++)St=Math.imul(St^M.hash.charCodeAt(t),16777619)^St>>>10;const I=()=>{St=St+1831565813|0;let t=Math.imul(St^St>>>15,1|St);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};{const t=I()*100,e=I()*100,o=I()*100;M.home||(t<14?F="Portrait":t<24&&(F="Stand back"),e<12&&F!=="Stand back"&&F!=="Portrait"&&ot!=="Misty morning"&&(O="Under the crown"),F==="Stand back"&&O==="From above"&&(O="Three-quarter"),e>=16&&e<25&&F!=="Stand back"&&F!=="Portrait"&&ot!=="Misty morning"&&O!=="Under the crown"?O="Under the crown":e>=25&&e<44&&F==="Macro"&&O==="Three-quarter"&&(O=e<34.5?"Low":"Down the line"),o<12&&O!=="Under the crown"&&(Gt="Playground"))}let Tt=-1006437196;for(let t=2;t<M.hash.length;t++)Tt=Math.imul(Tt^M.hash.charCodeAt(t),16777619)^Tt>>>14;const mt=()=>{Tt=Tt+1831565813|0;let t=Math.imul(Tt^Tt>>>15,1|Tt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},De=(t,e,o)=>{const a=mt(),c=mt(),s=mt(),l=mt();let i=o>=0?o:a<1/3?0:a<2/3?1:2;t==="Seasoned"?i=2:t==="Pale"&&i===2&&(i=1);const p=i===0?t==="Pale"?-.7:-.12+c*.12:i===2?(t==="Seasoned"?.75:.45)+c*(t==="Seasoned"?.25:.35):null;return{sz:e,age:i,dark:p,red:i===0&&t!=="Pale"?.55+c*.45:0,gloss:i===0?1.1:i===2?.6-c*.2:null,scar:t==="Big scar"?.38+s*.09:.48+s*.22,fresh:i===0&&t!=="Pale"&&l<.24}},_t=M.home?null:(()=>{const t=mt(),e=mt(),o=mt(),a=mt(),c=mt(),s=mt(),l=t<.55?a<.5?[1.68+e*.27,1.15+o*.25]:[1.15+o*.25,1.68+e*.27]:[-(1.15+e*.8)/1.51,-(1.15+e*.8)/1.51],i=c<.5?re==="Seasoned"||Dt==="Pale"||Dt!=="Seasoned"&&s<.5?[2,0]:[0,2]:[-1,-1];return[De(re,l[0],i[0]),De(Dt,l[1],i[1])]})(),so=(t,e)=>{if(!e)return;const o=e.sz<0&&Math.abs(e.sz+1)<.012?-1:e.sz;e.sz=o,t.R=e.sz>0?e.sz:t.R*-e.sz,Math.abs(e.scar-t.scar)>.01&&(t.scar=e.scar),t.im=e.sz>0?Math.pow(1.5/e.sz,3):Math.pow(-e.sz,-3),e.dark!==null&&(t.dark=e.dark,t.gloss=e.gloss),t.red=e.red,t.eyeW=e.age===1&&ot!=="Misty morning"?0:1,t.husk=e.fresh?1:0,e.age===2&&t.kn!=="Seasoned"&&(t.bump*=1.7)};F==="Portrait"&&(zt="");const Xo={"":5.2,"at the strike":2.72,"drawn back":3.05}[zt];M.trait("Light",ot),M.trait("String",se),M.trait("Your conker",[re,_t&&_t[0].fresh?"fresh from the husk":"",zt].filter(Boolean).join(", ")),M.trait("Their conker",_t&&_t[1].fresh?Dt+", fresh from the husk":Dt),M.trait("Ground",Gt),M.trait("Battle scars",Me),M.trait("Opponent",Ce),M.trait("Lens",F),M.trait("Angle",O);let lt=1013904242;for(let t=2;t<M.hash.length;t++)lt=Math.imul(lt^M.hash.charCodeAt(t),16777619)^lt>>>9;const Ht=()=>{lt=lt+1831565813|0;let t=Math.imul(lt^lt>>>15,1|lt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},V=t=>{const e=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/e,t[1]/e,t[2]/e]},Lt=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],bt=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],A={"Low sun":{L:[-.86,.34,.2],sun:[3.1,2.3,1.45],sky:[.16,.17,.2],bnc:[.11,.055,.022],haze:[.62,.44,.27],hz:520,dap:.55,exp:1.05,cool:[.215,.21,.215,1],glare:[.75,.38,.6,6]},"Golden hour":{L:[-.9,.22,.1],sun:[3.4,1.85,.78],sky:[.13,.12,.14],bnc:[.11,.045,.015],haze:[.7,.38,.16],hz:430,dap:.5,exp:1.08,cool:[.2,.17,.16,.9],glare:[.7,.38,.62,6]},"Misty morning":{L:[-.84,.38,-.08],sun:[.85,.8,.7],sky:[.2,.204,.21],bnc:[.07,.05,.033],haze:[.75,.73,.68],hz:230,dap:.85,exp:1.12,cool:[.62,.62,.61,1],glare:[.8,.38,.7,3.5]},"Last light":{L:[-.93,.13,.05],sun:[3.3,1.15,.4],sky:[.075,.065,.09],bnc:[.08,.03,.012],haze:[.55,.2,.08],hz:380,dap:.4,exp:1.18,cool:[.07,.066,.11,.85],glare:[.4,.4,.7,3]}}[ot],ie=V(A.L);Gt==="Frost"&&(A.haze=[A.haze[0]*.55+.2,A.haze[1]*.55+.24,A.haze[2]*.55+.3],A.sky=[A.sky[0]*.8,A.sky[1]*.9,A.sky[2]*1.2]);const Vo={Macro:[22,26,38,14,.068,.25,.55],Close:[16.5,26,42,13,.08,.75,.65],Long:[42,13.5,33,14,.1,.2,.45],Portrait:[15,17,30,9,.1,3,-1.9],"Stand back":[56,26,34,5,.036,.3,8]},Jo={"Three-quarter":[0,0,0,0,0],"Down the line":[32,-4,-1.5,-1.3,-5],Low:[-4,-24,-.6,-1,3],"From above":[6,30,-.4,-1.4,4],"Under the crown":[-10,0,0,0,2]},Ge=no==="Three-quarter"?0:co()-.5,Yo=40+I()*15,$o=(O==="Low"?1.5:4)+I()*2;let L,Ot,Et,rt,_e,ke,k,T,C,D,le,J,ft;const fe=()=>{if(Et=L[0],rt=Math.tan(L[1]*Math.PI/360),_e=L[2]*Math.PI/180,ke=L[3]*Math.PI/180,k=[L[5]+Et*Math.sin(_e)*Math.cos(ke),L[6]+Et*Math.sin(ke),L[7]+Et*Math.cos(_e)*Math.cos(ke)],T=V([L[5]-k[0],L[6]-k[1],L[7]-k[2]]),C=V(Lt(T,[0,1,0])),D=Lt(C,T),Ot[4]){const t=(Ot[4]+Ge*3)*Math.PI/180,e=Math.cos(t),o=Math.sin(t),a=[C[0]*e+D[0]*o,C[1]*e+D[1]*o,C[2]*e+D[2]*o];D=[D[0]*e-C[0]*o,D[1]*e-C[1]*o,D[2]*e-C[2]*o],C=a}le=Math.atan2(k[2],k[0])},ro=(t,e,o)=>{F=t,O=e,Gt=o,Ot=Jo[e],L=Vo[t].concat([0]),L[2]+=Ot[0]+Ge*8,L[3]+=Ot[1],L[5]+=Ot[2]+Ge*.6,L[6]+=Ot[3],t==="Stand back"&&(L[3]=$o),e==="Under the crown"&&(L[3]=-Yo,L[4]*=.75),ft={"Chestnut leaves":0,"Husks and conkers":1,"After rain":2,Frost:3,Playground:4}[o],J=t==="Long"?-11:-10,fe(),e==="Under the crown"&&(J=Math.min(J,k[1]-40))};let xt=0,gt=0,at=1;const it=(t,e,o)=>{const a=t-k[0],c=e-k[1],s=o-k[2];at=a*T[0]+c*T[1]+s*T[2];const l=1/(Math.max(at,.01)*rt);xt=(a*C[0]+c*C[1]+s*C[2])*l*.5+.5,gt=(a*D[0]+c*D[1]+s*D[2])*l*.5+.5},ht=(t,e)=>V([T[0]+((t*2-1)*C[0]+(e*2-1)*D[0])*rt,T[1]+((t*2-1)*C[1]+(e*2-1)*D[1])*rt,T[2]+((t*2-1)*C[2]+(e*2-1)*D[2])*rt]),Zo=t=>L[4]*Math.abs(1-Et/Math.max(t,1));let Mt=0,Ue=0,Zt,he,Q,de,pe;const io=()=>{{const t=ze(),e=ht(.5,.7+t*.09),o=(J-k[1])/e[1];Mt=e[1]<-.03?o*Math.hypot(e[0],e[2]):50+t*30;const a=ht(.5,1),c=Math.hypot(T[0],T[2]),s=Mt/Math.max(.05,(a[0]*T[0]+a[2]*T[2])/c),l=k[1]+a[1]*s-J,i=ze();if(Ue=Math.max(4,l*(.5+i*.55)*(O==="Low"?1.5:1)),F==="Stand back"){const p=Math.hypot(T[0],T[2]);Mt=Et*p+60+t*70;const u=ht(.5,.6+i*.1),n=Mt/Math.max(.05,(u[0]*T[0]+u[2]*T[2])/p);Ue=k[1]+u[1]*n-J}O==="Under the crown"&&(Mt=0)}Zt=[];{const t=ft===1?7:3;let e=0;for(;Zt.length<t&&e++<80;){const o=.06+w()*.88,a=.04+w()*.62,c=ht(o,a);if(c[1]>-.02)continue;const s=(J-k[1])/c[1];if(s<Et+6||s>160)continue;const l=k[0]+c[0]*s,i=k[2]+c[2]*s;let p=pt(ft===1?[[0,3],[1,3],[2,1],[3,3]]:[[0,3],[1,1],[3,2]]);Zt.length===0&&ft===1&&(p=1);const u=p===3?1.35+w()*.25:2+w()*.6;let n=!0;for(const f of Zt)Math.hypot(f[0]-l,f[2]-i)<f[3]+u+.5&&(n=!1);if(!n)continue;const h=V([q()*.5,1,q()*.5]);Zt.push([l,J+u*(p===3?.78:.72),i,u,h[0],h[1],h[2],p])}}he=[];for(let t=0;t<3;t++){let e=(t-1)*.55+q()*.18,o=260+w()*320,a=14+w()*22;F==="Stand back"&&(e*=.3,a*=.6);const c=V([T[0]*Math.cos(e)-T[2]*Math.sin(e)*0+C[0]*Math.sin(e),0,T[2]*Math.cos(e)+C[2]*Math.sin(e)]);he.push([k[0]+c[0]*o,k[2]+c[2]*o,O==="Under the crown"?0:a])}Q=[],de=0;{const t=ft===2?9:ot==="Misty morning"?6:3+Math.floor(w()*3);for(let e=0;e<t;e++){const o=w(),a=.5+w()*.5,c=ht(o,a),l=(c[1]<-.002?Math.min((J-k[1])/c[1],900):900)*bt(c,T),i=Zo(l)*(.55+w()*.45);if(i<.02)continue;const p=(ft===2?.45:.24)*(.25+w()*w()*1.4)*(ot==="Misty morning"?.6:1);Q.push([o,a,i,p])}}{const t=2+Math.floor(ze()*2)+(ft===2?3:0);Q.length=Math.min(Q.length,t);for(const e of Q)e[3]*=.6;de=Q.length}if(ot!=="Misty morning")for(let t=0,e=6+Math.floor(Ht()*3);t<40&&Q.length<15;t++){const o=Ht(),a=Ht(),c=.02+Math.pow(o,1.4)*.5,s=.98-Math.pow(a,1.3)*.46;if(ht(c,s)[1]<-.07)continue;const i=1-Math.min(1,Math.hypot(c,1-s)/.7);if(Q.push([c,s,.016+.03*i*(.5+.5*Ht()),-(.35+.9*i)*(.6+.4*Ht())]),Q.length-de>=e)break}pe=Q.splice(de),ft!==2?(Q.length=0,de=0):Q=Q.flatMap((t,e)=>[[t[0],t[1],t[2]*.22,t[3]*.55],[t[0]+t[2]*(.1+.05*(e%3)),t[1]-t[2]*.07,t[2]*.13,t[3]*.4]]).slice(0,8)},Qo=F,ta=O,ea=Gt,He=[et,yt,lt];ro(Ko,no,Wo),io();const Oe=[et,yt,lt],jt=981,R=1/480,oa={Round:{taper:.07,rad:[1.02,.91,.96],bump:.03,flat:0,scar:.62,dark:0,gloss:1,hard:1},"Flat-sided":{taper:.1,rad:[1.03,.9,.96],bump:.03,flat:.72,scar:.6,dark:.1,gloss:1,hard:1.05},"Big scar":{taper:.08,rad:[1.01,.93,.97],bump:.028,flat:0,scar:.42,dark:0,gloss:1,hard:.9},Seasoned:{taper:.1,rad:[.98,.9,.95],bump:.04,flat:.8,scar:.66,dark:1,gloss:.45,hard:1.75},Lopsided:{taper:.13,rad:[1.07,.9,.94],bump:.036,flat:.78,scar:.68,dark:.15,gloss:1,hard:1},Pale:{taper:.08,rad:[1,.92,.98],bump:.02,flat:0,scar:.5,dark:-.7,gloss:.85,hard:.85},Cheesecutter:{taper:.04,rad:[1.1,.68,1.04],bump:.016,flat:0,scar:.64,dark:.3,gloss:1.1,hard:1.4}},lo=(t,e)=>{const o=oa[t],a=w()*6.2832,c=V([Math.cos(a),-.15+w()*.35,Math.sin(a)]),s=a+2.2+w()*1.9,l=o.flat?[Math.cos(s),(w()-.5)*.3,Math.sin(s),o.flat]:[0,0,1,6],i=[[q()*.04,q()*.04,q()*.04]],p=w()*6.28;for(let m=0;m<6;m++){const b=1-2*(m+.5)/6,g=Math.sqrt(1-b*b),d=m*2.39996+p,v=V([g*Math.cos(d)+q()*.3,b+q()*.3,g*Math.sin(d)+q()*.3]),z=.98+w()*.2;i.push([v[0]*z,v[1]*z,v[2]*z])}{const m=i.slice();i.length=0;const b=Math.atan2(m[1][2],m[1][0]),g=(d,v)=>m[2+d%5][v]*.5;i.push([Math.cos(b)*.24,m[0][1],Math.sin(b)*.24]);for(let d=0;d<3;d++){const v=b+Math.PI+(d-1)*(1.05+g(d,0)*.4)+g(d,2)*.35,z=.74+g(d,1)*.12;i.push([Math.cos(v)*z,g(d+3,1)*.45,Math.sin(v)*z])}}let u=1,n=1;const h=i[0];for(let m=1;m<4;m++){const b=i[m],g=V([b[0]-h[0],b[1]-h[1],b[2]-h[2]]),d=[(h[0]+b[0])/2,(h[1]+b[1])/2,(h[2]+b[2])/2];g[1]>.05&&(u=Math.min(u,bt(d,g)/g[1])),g[1]<-.05&&(n=Math.min(n,bt(d,g)/-g[1]))}const f=e===void 0?w()*6.28:e-Math.atan2(c[2],c[0])+q()*.35;return{kn:t,rad:o.rad,bump:o.bump*(.7+w()*.6),flat:l,hd:c,scar:o.scar+(w()-.5)*.08,dark:o.dark+(w()-.5)*.2,grain:9+w()*6,taper:o.taper*(.5+.7*Math.abs(Math.sin(a*3.7))),gloss:o.gloss,hard:o.hard*(.85+w()*.3),ph:[w()*6.28,w()*6.28,w()*6.28],seeds:i,coreTop:Math.max(.18,u),coreBot:Math.max(.18,n),R:1.42+w()*.18,phi:f}},fo={"Cotton string":{col:[.44,.37,.27],r:.064,fuzz:1.1,ply:6.2},"Garden twine":{col:[.36,.27,.13],r:.07,fuzz:1,ply:3},Bootlace:{col:[.035,.03,.028],r:.085,fuzz:.15,ply:5.5},"Red wool":{col:[.42,.025,.02],r:.078,fuzz:1.2,ply:2.4}},kt=fo[se],me=se==="Cotton string"?{col:[.41,.36,.28],r:.06,fuzz:.9,ply:6.8}:{...fo["Cotton string"]};if(ot==="Misty morning")for(const t of[kt,me])t.col=t.col.map(e=>e*.55);const It=26,ho=t=>{const o=lo(t?Dt:re,t?le+1.05:le-1.4);so(o,_t&&_t[t]);const a=[t?2.75+w()*.5:-2.9,It+(t?M.home?-.5:-1.6+w()*1.9:0),0],c=o.rad[1]*o.R,s=[a[0],a[1]-It-c,a[2]],l={k:t,cn:o,str:t?me:kt,pivB:a.slice(),piv:a.slice(),lift:0,im:o.im||1,c:s.slice(),cp:s.slice(),ax:[0,1,0],tl:[0,0],tv:[0,0],phi:0,w:0,dmg:0,imps:[],burst:!1,held:!1,hold:[0,0,0],hv:[0,0,0],steady:0,rot:[1,0,0,0,1,0,0,0,1],top:o.rad[1],bot:o.rad[1],ch:new Float32Array(17*3),chp:new Float32Array(17*3),tail:new Float32Array(5*3),tailp:new Float32Array(5*3)};for(let i=0;i<17;i++){const p=i/16;l.ch[i*3]=l.chp[i*3]=a[0],l.ch[i*3+1]=l.chp[i*3+1]=a[1]-It*p,l.ch[i*3+2]=l.chp[i*3+2]=a[2]}for(let i=0;i<5;i++)l.tail[i*3]=l.tailp[i*3]=s[0],l.tail[i*3+1]=l.tailp[i*3+1]=s[1]-c-.3-i*.45,l.tail[i*3+2]=l.tailp[i*3+2]=s[2];return l.tw=[w()*6.28,w()*6.28,w()*6.28,w()*6.28],l.curl=[q()*.5,q()*.5],l.phi=0,l.w=(w()-.5)*.25,zt||(l.w*=4.5,l.phi=l.curl[1]*.5,l.cp[0]=l.c[0]-l.curl[0]*7*R,l.cp[2]=l.c[2]-(l.curl[1]*5+(t?-3:3))*R),l},Qt=(()=>{const t=et,e=[0,1].map(ho);return et=t,e.map(o=>[o.c[0],o.c[1],o.c[2],o.cn.R*Math.max(o.cn.rad[0],o.cn.rad[1],o.cn.rad[2])])})();ro(Qo,ta,ea);const po=(t,e,o)=>{for(let a=0;a<4;a++){it(t[0],t[1],t[2]);const c=2*rt*at;for(let s=0;s<3;s++)L[5+s]+=(C[s]*(xt-e)+D[s]*(gt-o))*c;fe()}};if(F==="Portrait"){const t=Qt[1];L[0]=t[3]*2/(.6+I()*.07)/(2*rt),fe(),po(t,.5,.46)}F==="Stand back"&&po([(Qt[0][0]+Qt[1][0])/2,(Qt[0][1]+Qt[1][1])/2,0],.5,.17);const mo=t=>{let e=0,o=0,a=0,c=0;return Qt.forEach((s,l)=>{const i=t[l];it(s[0],s[1],s[2]);const p=s[3]/(Math.max(at,.01)*rt*2);e=Math.max(e,i-xt+p),o=Math.max(o,xt+p-1+i),a=Math.max(a,i-gt+p),c=Math.max(c,gt+p-1+i)}),[e,o,a,c]};if(F!=="Portrait"&&!M.home&&Math.max(...mo([.03,.03]))>0)for(let t=0;t<40;t++){const[e,o,a,c]=mo([.04,.22]);if(Math.max(e,o,a,c)<=0)break;if(e>0&&o>0||a>0&&c>0){L[0]*=1.04,fe();continue}const s=Math.max(o,0)-Math.max(e,0),l=Math.max(c,0)-Math.max(a,0),i=2*rt*Et;for(let p=0;p<3;p++)L[5+p]+=(C[p]*s+D[p]*l)*i;fe()}O==="Under the crown"&&(J=Math.min(J,k[1]-40)),et=He[0],yt=He[1],lt=He[2],io(),et=Oe[0],yt=Oe[1],lt=Oe[2],it(3,-1.5,0);const bo=at;it(-2.9,-1.5,0);const be=Math.min(bo,at)-.7,aa=Math.max(bo,at),Be=1.05/be,uo=.0085/Math.max(.02,1-be/aa-Be),vo=t=>uo*Math.max(0,Math.abs(1-be/Math.max(t,1))-Be),E=[0,1].map(ho);{const t=[0,1].map(()=>(Ht()*2-1)*Math.PI);if(Math.abs(t[0])>1.7&&Math.abs(t[1])>1.7&&(t[0]=Math.sign(t[0])*1.15),F==="Portrait"&&(t[1]=(I()<.5?-1:1)*(.95+I()*.3),E[1].cn.grain*=1.8),M.home){t[0]=-1.4,t[1]=1.05;const o=E[1].cn,a=o.hd,c=Math.asin(a[1])+.17,s=Math.atan2(a[2],a[0]);o.hd=[Math.cos(c)*Math.cos(s),Math.sin(c),Math.cos(c)*Math.sin(s)],o.scar-=.02}E.forEach((o,a)=>{o.cn.phi+=t[a]-(a?1.05:-1.4)});const e=Ht()*6.2832;for(const o of E){const a=o.cn;a.kn==="Cheesecutter"&&(a.flat=[Math.cos(e),.1,Math.sin(e),.42]),a.kn==="Flat-sided"&&(a.flat[3]=.5),a.kn==="Seasoned"&&(a.bump*=1.7),ot==="Misty morning"&&(a.dark+=.2)}}const je=(t,e,o)=>{for(let a=0;a<e;a++){const c=V([q(),q()*.5,q()]);Ie(t,[c[0]*.98,c[1]*.9,c[2]*.98],o*(.7+w()*.6))}};function Ie(t,e,o){t.dmg+=o;const a=Math.min(2.6,.22+2.3*o);let c=-1,s=1e9;for(let l=0;l<t.imps.length;l++){const i=t.imps[l],p=Math.hypot(i[0]-e[0],i[1]-e[1],i[2]-e[2]);p<s&&(s=p,c=l)}if(c>=0&&(s<.35||t.imps.length>=4)){const l=t.imps[c];l[3]=Math.min(2.6,Math.max(l[3],a)+.5*Math.min(a,l[3])*.5),s>=.35&&(l[0]=(l[0]+e[0])*.5,l[1]=(l[1]+e[1])*.5,l[2]=(l[2]+e[2])*.5)}else t.imps.push([e[0],e[1],e[2],a])}Me==="Veteran"&&je(E[0],2,.26),Me==="Grudge match"&&(je(E[0],3,.25),je(E[1],3,.24));const ca=t=>{const e=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp int;
layout(std140) uniform F{vec4 U[236];};
#define NB int(U[GD].x)
#define N9 int(U[GD].y)
#define N12 int(U[GD].z)
#define N30 int(U[GD].w)
#define NOB int(U[6].w)
#define NST int(U[7].w)
#define N7 int(U[8].w)
#define CK 59
#define OBJ 11
#define STRB 91
#define CRB 179
#define SPB 195
#define GD 200
#define BKB 220
`,o=`#version 300 es
out vec2 v;void main(){vec2 p=vec2(float((gl_VertexID&1)<<2),float((gl_VertexID&2)<<1));v=p*.5;gl_Position=vec4(p-1.,0.,1.);}`,a=!!r.getExtension("EXT_color_buffer_float"),c=a?"":`#define ENC 1
`,s=[],l=x=>{const U=r.createProgram(),H=r.createShader(r.VERTEX_SHADER),N=r.createShader(r.FRAGMENT_SHADER);return r.shaderSource(H,o),r.shaderSource(N,x),r.compileShader(H),r.compileShader(N),r.attachShader(U,H),r.attachShader(U,N),r.linkProgram(U),U.a=H,U.b=N,s.push(U),U},i=`
float h1(float x){return fract(sin(x*127.1)*43758.5453);}
vec3 rayFor(vec2 q){return normalize(U[3].xyz+((q.x*2.-1.)*U[1].xyz+(q.y*2.-1.)*U[2].xyz)*U[0].w);}
`,p=x=>e+c+x+`in vec2 v;out vec4 o;uniform sampler2D uN,uS;${i}
vec4 sm(vec2 p){return texture(uS,p*(1./256.));}
// the open husk's three-lobed rim, cos(3*angle+h) without atan
float rim3(vec3 n,vec3 b1,vec3 b2,float h){float x=dot(n,b2),y=dot(n,b1);float r=max(length(vec2(x,y)),1e-20);float c=x/r,s=y/r;return .22+.16*((c*(4.*c*c-3.))*cos(h)-(s*(3.-4.*s*s))*sin(h));}
vec3 pal(float h){
 vec3 a=vec3(.33,.31,.05),b=vec3(.56,.36,.035),c=vec3(.55,.17,.025),d=vec3(.27,.075,.02),e=vec3(.12,.055,.025);
 return h<.2?mix(a,b,h*5.):h<.5?mix(b,c,(h-.2)/.3):h<.78?mix(c,d,(h-.5)/.28):mix(d,e,(h-.78)/.22);}
bool leafAt(vec2 g,int L,out vec4 P){
 bool big=L<4;float cs=big?7.5:3.4;vec2 ci=floor(g/cs);bool hit=false;P=vec4(0.);
 for(int j=0;j<N9;j++){vec2 cell=ci+vec2(float(j%3-1),float(j/3-1));
  vec4 r=texelFetch(uN,ivec2(mod(cell+vec2(float(L)*37.+U[10].w,float(L)*71.),256.)),0);
  vec2 ct=(cell+.1+.8*r.xy)*cs;float a=r.z*6.2832;vec2 dr=vec2(cos(a),sin(a));
  float len=big?mix(7.,11.,r.w):mix(2.6,4.3,r.w);
  vec2 d=g-ct;float u=dot(d,dr)/len+.5;float w=dot(d,vec2(-dr.y,dr.x))/len;
  float uc=clamp(u,0.,1.);
  float hw=big?.62*pow(uc,.8)*pow(1.-uc,.42):.34*sin(3.1416*pow(uc,.75));
  hw*=1.+(big?.07:.04)*sin(u*(big?75.:38.)+r.x*30.);
  bool keep=big||r.y<.8;
  if(keep&&u>0.&&u<1.&&abs(w)<hw){hit=true;P=vec4(u,w/max(hw,1e-3),a,r.w*13.+float(L)*1.7+cell.x*.131+cell.y*.293);}
  // a stalk
  if(big&&u<0.&&u>-.12&&abs(w)<.012){hit=true;P=vec4(u,0.,a,r.w*13.+float(L)*1.7+cell.x*.131+cell.y*.293);}
 }
 return hit;}
void main(){
 vec3 ro=U[0].xyz,rd=rayFor(v),Ls=U[4].xyz,sc=U[5].rgb,sky=U[6].rgb,hz=U[8].rgb;
 float Gy=U[9].z;int gk=int(U[10].z+.5);
 float tG=rd.y<-1e-4?(Gy-ro.y)/rd.y:1e5;
 float tH=tG;int hk=-1;int ht=0;
 // husks, open husks and fallen conkers
 for(int i=0;i<NOB;i++){vec4 HP=U[GD+1+i],HA=U[GD+9+i];
  if(HP.w>0.){vec3 oc=ro-HP.xyz;float b=dot(oc,rd),cc=dot(oc,oc)-HP.w*HP.w,h=b*b-cc;
   if(h>0.){h=sqrt(h);float t0=-b-h,t1=-b+h;int kind=int(HA.w+.5);int typ=0;float th=t0;
    if(kind==1||kind==2){vec3 n0=(ro+rd*t0-HP.xyz)/HP.w;vec3 ax=HA.xyz;vec3 b1=normalize(cross(ax,vec3(0,0,1))),b2=cross(ax,b1);
     float c0=rim3(n0,b1,b2,HP.x);
     if(dot(n0,ax)>c0){th=1e9;
      if(kind==1){vec3 cc2=HP.xyz+ax*HP.w*.22;vec3 oc2=ro-cc2;float rr=HP.w*.62;float b3=dot(oc2,rd),c3=dot(oc2,oc2)-rr*rr,h3=b3*b3-c3;if(h3>0.){th=-b3-sqrt(h3);typ=2;}}
      if(th>1e8){vec3 n1=(ro+rd*t1-HP.xyz)/HP.w;float c1=rim3(n1,b1,b2,HP.x);if(dot(n1,ax)<c1){th=t1;typ=1;}}}}
    if(kind==3)typ=3;
    if(th>0.&&th<tH){tH=th;hk=i;ht=typ;}}}}
 // tree trunks far off
 int tk=-1;vec3 tn=vec3(0);
 for(int i=0;i<3;i++){vec4 T=U[GD+17+i];vec2 d2=rd.xz;
#ifdef BACK
  // seen whole from further off, a trunk is not a bar: it swells and narrows, and leans a little
  {float fi=float(i);vec2 o0=ro.xz-T.xy;float y0=ro.y+rd.y*max(-dot(o0,d2)/dot(d2,d2),0.)-Gy;
   T.xy+=vec2(-U[3].z,U[3].x)*(h1(fi+.5)-.5)*.1*y0;T.z*=.72+.5*sm(vec2(y0*.3+fi*41.,fi*17.)).a+.16*sm(vec2(y0*1.4,fi*29.+7.)).g;}
#endif
  vec2 oc=ro.xz-T.xy;float a=dot(d2,d2),b=dot(oc,d2),cc=dot(oc,oc)-T.z*T.z,h=b*b-a*cc;
  if(h>0.){float t=(-b-sqrt(h))/a;if(t>0.&&t<tH){tH=t;tk=i;hk=-1;vec2 pp=ro.xz+d2*t-T.xy;tn=normalize(vec3(pp.x,0.,pp.y));}}}
 // a low bank of autumn shrubs a metre or two behind
 int hb=0;vec2 bq=vec2(0);
 {float Dh=U[GD+17].w;vec3 fh=normalize(vec3(U[3].x,0.,U[3].z));float rf=dot(rd,fh);
  if(Dh>0.&&rf>.05){float th=Dh/rf;if(th<tH){vec3 ph=ro+rd*th;bq=vec2(dot(ph.xz,vec2(-fh.z,fh.x)),ph.y-Gy);
   float top=U[GD+18].w*(.45+.75*sm(vec2(bq.x*.7+U[GD+19].w,7.)).a+.35*sm(vec2(bq.x*2.6,19.)).b);
   if(bq.y<top){tH=th;hk=-1;tk=-1;hb=1;}}}}
#ifdef CROWN
 // the horse-chestnut overhead, seen from under the conkers: the bank's own layered leaves on a ceiling instead of a wall
 float tc=(U[47].x-ro.y)/max(rd.y,1e-4);if(rd.y>0.){tH=tc;hk=-1;tk=-1;hb=1;bq=(ro.xz+rd.xz*tc)*U[47].y;}
#endif
 vec3 p=ro+rd*tH;vec3 col;
 // light reaching a ground-level point: canopy holes, trunk shadows, husk shadows
 float canopy=mix(.3,1.,smoothstep(.36,.6,sm(p.xz*.16+vec2(40.,13.)).b));
 float vis=canopy;
 for(int i=0;i<3;i++){vec4 T=U[GD+17+i];vec2 sd=normalize(Ls.xz);vec2 w=T.xy-p.xz;float al=dot(w,sd);if(al>0.){float pr=length(w-sd*al);vis*=mix(.22,1.,smoothstep(T.z*.85,T.z*1.1+al*.012,pr));}}
 for(int i=0;i<8;i++){vec4 HP=U[GD+1+i];if(HP.w>0.&&(hk!=i)){vec3 oc=HP.xyz-p;float tb=dot(oc,Ls);if(tb>0.){float dc=length(oc-Ls*tb);vis*=mix(.2,1.,smoothstep(HP.w*.8,HP.w*1.05+tb*.012,dc));}}}
 float wet=gk==2?1.:0.,frost=gk==3?1.:0.;
 bool gnd=hb==0&&tk<0&&hk<0&&tG<1e4; // the open ground: drawn by the second ground program
#if GP==1
 if(gnd||hb==1)discard;
#elif GP==2
 if(!gnd)discard;
#else
 if(hb!=1)discard;
#endif
 col=vec3(0);
 if(hb==1){
#if GP==3
  // overlapping leaves on a vertical bank: some lit through from behind by the low sun, dark hollows between
  vec2 g=bq*vec2(1.05,1.15)+vec2(U[GD+19].w*3.,0.);vec4 P=vec4(0);int top=-1;
#ifdef CROWN
  float thin=rd.y>0.?sm(g*.45+U[47].zw).a:0.; // the crown's open patches
#define THIN(L) thin<.7-.05*float(L)&&
#else
#define THIN(L)
#endif
  for(int L=0;L<3;L++){vec4 q;if(top<0&&THIN(L)leafAt(g+vec2(float(L)*13.7,float(L)*5.3),L,q)){top=L;P=q;}}
  float hol=sm(g*.9+vec2(31.,7.)).a;
  if(top>=0){float hh=h1(P.w),h2=h1(P.w+3.1),h3=h1(P.w+5.3);vec3 lc=pal(hh*.8+.12);
   float vein=smoothstep(.04,.0,abs(P.y))*.4;lc*=(.75+.45*sm(g*5.+P.w).g)*(1.+vein);
   float thru=smoothstep(.35,.9,h2)*canopy;
   col=lc*(sky*(.35+.3*h3)+sc*.1*canopy*h3)+lc*lc*sc*thru*1.9;
   col*=(1.-.32*float(top))*(.55+.6*smoothstep(.25,.7,hol));
  }else col=vec3(.022,.016,.01)*(1.+sky*3.);
#ifdef CROWN
  // overhead: gone yellow and rust with green left along the midribs and brown at the edges, lit through from above;
  // the sky in the gaps (white on the sun's side, pale blue away); three or four limbs a little below, bending, one fork each
  if(rd.y>0.){float sl2=max(dot(rd,Ls),0.);vec3 skc=mix(vec3(.5,.6,.74),vec3(1.,.95,.84),smoothstep(.25,.95,sl2))*U[48].x;
   if(top>=0){float hh=h1(P.w),h2=h1(P.w+3.1),h3=h1(P.w+5.3);
    vec3 lc=mix(vec3(.3,.34,.05),vec3(.42,.2,.04),smoothstep(.6,.98,hh));lc=mix(lc,vec3(.16,.27,.04),smoothstep(.28,.0,hh)*.8);
    lc=mix(lc,vec3(.13,.26,.04),(1.-smoothstep(.03,.15,abs(P.y)))*.6);
    lc=mix(lc,vec3(.17,.08,.025),smoothstep(.72,1.,abs(P.y)+(h3-.5)*.3)*.75);
    float thru=(.45+.55*h2)*(.5+.25*float(top))*(.7+.6*hol);
    col=lc*(sky*(.8+.5*h3)+sc*.55*thru)+lc*skc*.12;
   }else col=skc;
   vec2 gl2=ro.xz+rd.xz*(tc-30./rd.y);
   for(int i=0;i<4;i++){vec4 B=U[43+i];float bw=U[50][i];if(bw>0.){vec2 dr=B.zw,pr=vec2(-dr.y,dr.x);vec2 d=gl2-B.xy;float al=dot(d,dr);
    float ac=dot(d,pr)+14.*sin(al*.011+bw*5.)+5.*sin(al*.037+bw*9.);float w=bw*(1.-.55*clamp(al/700.,0.,1.));
    vec2 d3=d-dr*(220.+bw*8.);vec2 dr3=vec2(dr.x*.825-dr.y*.565,dr.x*.565+dr.y*.825);float a3=dot(d3,dr3),c3=dot(d3,vec2(-dr3.y,dr3.x))+8.*sin(a3*.02+bw);
    if((al>0.&&al<900.&&abs(ac)<w)||(a3>0.&&a3<500.&&abs(c3)<bw*.6*(1.-.6*clamp(a3/500.,0.,1.)))){col=vec3(.045,.036,.028)*(sky*2.2+sc*.04);tH=tc-30./rd.y;}}}}
#endif
 #endif
 }else if(tk>=0){
#if GP==1
  vec3 bark=vec3(.045,.038,.03)*(.6+.8*sm(vec2(p.y*.4,atan(tn.z,tn.x)*30.)).g);
  col=bark*(sc*max(dot(tn,Ls),0.)*canopy+sky*.6);
 #endif
 }else if(hk>=0){
#if GP==1
  vec4 HP=U[GD+1+hk],HA=U[GD+9+hk];vec3 n=normalize(p-HP.xyz);float id=float(hk)*3.7+HP.x;
  vec3 alb;float gl=0.,ex=40.;
  if(ht==3||ht==2){ // a conker on the ground
   vec3 cc2=ht==2?HP.xyz+HA.xyz*HP.w*.22:HP.xyz;n=normalize(p-cc2);
   vec3 sd=normalize(vec3(cos(id*2.1),.3,sin(id*2.1)));float scr=smoothstep(.55,.62,dot(n,sd)+(sm(n.xz*40.+id).r-.5)*.15);
   alb=mix(vec3(.2,.058,.022)*(.7+.6*sm(n.xy*50.+id).b),vec3(.4,.32,.22),scr);gl=(1.-scr)*1.;ex=40.; // a fallen conker's sun point, thrown this far out of focus, is a broad sheen, not a white disc
  }else if(ht==1){ // the white lining of an open husk
   n=-n;alb=vec3(.5,.4,.25)*(.8+.3*sm(p.xz*30.).g);alb=mix(alb,vec3(.3,.18,.08),smoothstep(.5,.75,sm(p.xz*7.+id).b)*.7);
  }else{ // the spiky husk
   vec3 hb=mix(vec3(.2,.22,.045),vec3(.24,.14,.04),h1(id));hb=mix(hb,vec3(.09,.05,.025),smoothstep(.5,.72,sm(n.xy*24.+n.zx*13.+id).b)*.85);
   float sp=0.;vec3 sdir=n;
   for(int j=0;j<N30;j++){float fj=float(j)+.5;float zz=1.-2.*fj/30.;float rr=sqrt(1.-zz*zz);float ph=fj*2.39996+id;vec3 dj=vec3(rr*cos(ph),zz,rr*sin(ph));float dd=dot(n,dj);if(dd>sp){sp=dd;sdir=dj;}}
   float sk=smoothstep(.985,.9985,sp);
   n=normalize(n+normalize(n-sdir*sp+1e-4)*sk*2.2);
   alb=mix(hb,vec3(.07,.045,.02),smoothstep(.996,.9993,sp));alb*=.8+.4*sm(n.yz*60.).r;
   float rim=1.-smoothstep(.0,.5,dot(n,-rd));alb+=vec3(.05,.04,.01)*rim;
  }
  float ndl=max(dot(n,Ls),0.);
  col=alb*(sc*ndl*vis+sky*(.5+.5*n.y)+U[7].rgb*.4);
  vec3 hv=normalize(Ls-rd);col+=sc*vis*gl*pow(max(dot(n,hv),0.),ex)*(ex>100.?14.:.3)*step(0.,dot(n,Ls));
  col+=sky*gl*.25*pow(1.-max(dot(n,-rd),0.),3.);
 #endif
 }else if(tG<1e4){
#if GP==2
  vec2 g=p.xz;vec4 s1=sm(g*2.1),s2=sm(g*9.);
  vec3 base=mix(vec3(.03,.019,.011),vec3(.04,.05,.014),smoothstep(.45,.7,s1.r))*(.6+.8*s2.b);
  vec3 n=normalize(vec3(s2.r-.5,1.2,s2.g-.5));
  int top=-1;vec4 P=vec4(0);float shd=1.;
  vec2 sxz=Ls.xz/max(Ls.y,.1)*.28;
  for(int i=0;i<N12;i++){int L=i%6;bool shp=i>=6;bool doit=!shp||L>top;
   if(doit){vec2 gp=shp?g+sxz*float(L-top):g;vec4 q;bool hit=leafAt(gp,L,q);if(hit){if(!shp){top=L;P=q;}else shd*=.42;}}}
#ifdef PLAY
  // a playground: old tarmac with its aggregate, a worn painted line at a slant, and leaves only where the wind left them
  // (scattered, and in a drift along the bank's foot)
  {vec2 fh2=normalize(U[3].xz);float dB=U[GD+17].w-dot(p.xz-ro.xz,fh2);
   float kl=sm(g*.2+vec2(17.,3.)).a*.75+sm(g*.7+vec2(3.,8.)).b*.25+.35*smoothstep(14.,3.,dB)*smoothstep(-25.,0.,dB);
   if(kl<U[49].y){top=-1;shd=1.;}
   float agg=sm(g*1.3).r*.45+sm(g*5.).g*.3+texelFetch(uN,ivec2(mod(g*7.,256.)),0).r*.25;
   base=vec3(.046,.072,.13)*(.72+.55*agg); // blue-grey, so in the warm low sun it reads a cool neutral
   vec4 LP=U[49];float lw=abs(dot(g-LP.xz,vec2(-sin(LP.w),cos(LP.w))))+(sm(g*.9).b-.5)*.9;
   float paint=(1.-smoothstep(2.6,3.3,lw))*smoothstep(.3,.42,sm(g*2.3+5.).r*.75+.4*agg);
   base=mix(base,vec3(.4,.39,.34),paint*.85);
   n=normalize(vec3(s2.r-.5,4.,s2.g-.5));}
#endif
  float ao=.5+.5*float(top+1)/6.;
  float gl=.04;
  if(top>=0){
   float id=P.w,u=P.x,wn=P.y;float hh=h1(id),h2=h1(id+3.1),h3=h1(id+7.7);bool big=top<4;
   vec3 lc=pal(gk==3?hh*.7+.3:hh);
   vec2 dr=vec2(cos(P.z),sin(P.z)),pr=vec2(-dr.y,dr.x);
   float mid=1.-smoothstep(.025,.07,abs(wn));
   float lv=fract(u*(big?15.:9.)-abs(wn)*(big?1.9:1.2)+h2);float vein=smoothstep(.86,.97,abs(lv-.5)*2.)*(1.-mid);
   lc=mix(lc,lc*1.35+vec3(.04,.03,0.),(mid*.7+vein*.4)*(hh<.6?1.:-.5));
   float bl=smoothstep(.57,.66,sm(g*1.7+id*17.).b);
   lc=mix(lc,vec3(.1,.045,.018),bl*.85);
   float eb=smoothstep(.72,1.,abs(wn)+(sm(g*7.+id).r-.5)*.5);
   lc=mix(lc,vec3(.13,.06,.025),eb*.6);
   if(u<0.)lc=vec3(.2,.12,.05);
   float cur=(h2-.25)*1.5;
   n=normalize(vec3(0,1,0)-vec3(pr.x,0.,pr.y)*wn*cur*.9+vec3(dr.x,0.,dr.y)*(u-.5)*.5*(h3-.5)+vec3(s2.r-.5,0.,s2.g-.5)*.3);
   base=lc;gl=big?.08:.05;
   if(gk==3){float rime=smoothstep(.55,.9,abs(wn))+vein*.6+mid*.5+smoothstep(.55,.75,s2.b)*.5;base=mix(base*.75,vec3(.52,.56,.62),clamp(rime*.8+.3,0.,1.)*.8);}
  }else if(gk==3)base=mix(base,vec3(.45,.48,.55),.4+.4*smoothstep(.4,.7,s2.b));
  if(gk==2){base*=vec3(.55,.5,.45);gl=.9;}
  float ndl=max(dot(n,Ls),0.);float trn=top>=0?max(-dot(n,Ls),0.)*.5:0.;
  vis*=shd;
  col=base*(sc*ndl*vis+sky*.65*ao)+base*base*sc*trn*vis*3.;
  vec3 hv=normalize(Ls-rd);float ex=gk==2?160.:28.;
  float glint=pow(max(dot(n,hv),0.),ex);
  col+=sc*vis*glint*gl*(gk==2?(.5+6.*smoothstep(.62,.8,sm(g*4.).a)):1.);
 #endif
 }else{col=hz*1.2;}
 // aerial haze, brighter toward the sun
 float fd=1.-exp(-tH/U[9].w);
 float sl=max(dot(rd,Ls),0.);vec3 hc=hz*(.7+2.4*pow(sl,5.));
 // the sky's two sides: white-gold glare toward the low sun, a cool pale grey away from it
 float gS=smoothstep(U[42].y,U[42].z,sl);vec3 s2=mix(U[41].rgb,U[5].rgb*U[42].x,gS)+U[5].rgb*U[42].w*pow(sl,6.);
 float wS=U[41].w*max(smoothstep(-.085,-.03,rd.y)*smoothstep(.1,.5,fd),gS*smoothstep(.3,.9,fd));
 #ifdef CROWN
 if(rd.y>0.){fd*=.22;wS=0.;}
#endif
#ifdef BACK
 if(tk>=0){fd*=U[48].y;wS*=U[48].y*.5;} // the trunks stand dark through the bright air
#endif
 col=mix(col,mix(hc,s2,wS),max(fd,wS));
 float z=min(tH,4000.)*dot(rd,U[3].xyz);
#ifdef ENC
 o=vec4(col/(1.+col),z/(z+50.));
#else
 o=vec4(col,z);
#endif
}`,u={},n=u[t]=[1,2,3].map(x=>l(p("#define GP "+x+`
`+t))),h=x=>l(e+c+`in vec2 v;out vec4 o;uniform sampler2D uT;
float coc(float z){return U[9].x*abs(1.-U[9].y/max(z,1.));}
vec4 rd4(vec2 p){vec4 s=textureLod(uT,p,0.);
#ifdef ENC
s.rgb=s.rgb/max(1.-s.rgb,.003);s.a=50.*s.a/max(1.-s.a,.001);
#endif
return s;}
void main(){vec4 c0=rd4(v);float r=coc(c0.a);float tx=U[3].w;
 vec3 acc=vec3(0);float wa=0.;
 for(int i=-NB;i<=NB;i++){float f=float(i)/float(NB);vec2 sp=v+${x?"vec2(0.,f*r)":"vec2(f*r,0.)"};vec4 s=rd4(sp);float rs=coc(s.a);
  float w=exp(-f*f*2.3)*clamp((rs-abs(f*r))/(r*.2+tx)+1.,0.,1.);
  acc+=min(s.rgb,vec3(2.2))*w;wa+=w;}
 vec3 c=acc/max(wa,1e-5);
${x?` for(int i=0;i<N30/2;i++){vec4 B=U[BKB+i];if(B.z>0.){float d=length(v-B.xy)/B.z;c+=(B.w>0.?U[8].rgb:U[5].rgb*-.12)*B.w*exp(-d*d*2.3);}}
 o=vec4(c/(1.+c),1.);`:`
#ifdef ENC
 o=vec4(c/(1.+c),c0.a/(c0.a+50.));
#else
 o=vec4(c,c0.a);
#endif
`}}`),f=h(!1),m=h(!0),b=`float smx(float a,float b,float k){float h=clamp(.5+.5*(a-b)/k,0.,1.);return mix(b,a,h)+k*h*(1.-h);}
float sdC(vec3 q,int k){int b=CK+k*16;vec4 r=U[b];q.xz/=1.-U[b+15].w*q.y;float k0=length(q/r.xyz),k1=length(q/(r.xyz*r.xyz));float d=k0*(k0-1.)/max(k1,1e-4);
 vec4 f=U[b+1];d=smx(d,dot(q,f.xyz)-f.w,.3);vec4 hl=U[b+2];d=smx(d,dot(q,hl.xyz)-hl.w-.1,.18);d-=.016*smoothstep(hl.w-.03,hl.w+.06,dot(q,hl.xyz)/max(length(q),1e-3));vec4 ph=U[b+15];
 return d+r.w*(sin(q.x*2.3+ph.x)*sin(q.y*2.9+ph.y)*sin(q.z*2.6+ph.z)+.45*sin(q.x*5.1+ph.y)*sin(q.y*4.3+ph.z)*sin(q.z*5.7+ph.x));}
vec4 tri(vec3 p,vec3 w){return texture(uS,p.yz*(1./256.))*w.x+texture(uS,p.zx*(1./256.))*w.y+texture(uS,p.xy*(1./256.))*w.z;}
float sdO(vec3 q,int k,int pc,out float fm){
 float d=sdC(q,k);fm=-1.;
 if(pc>=0){int b=CK+k*16+8;vec3 si=U[b+pc].xyz;float pm=-1e3;
  for(int j=0;j<N7;j++){vec3 sj=U[b+j].xyz;vec3 dd=sj-si;float l=max(length(dd),1e-4);if(j!=pc)pm=smx(pm,dot(q-(si+sj)*.5,dd/l),.04);}
  float fp=float(pc);pm+=.007*sin(dot(q,vec3(9.1,4.3,-6.2))+fp)*sin(dot(q,vec3(-3.7,8.8,5.1))+1.3*fp)+.004*sin(dot(q,vec3(17.3,-11.2,7.9))+2.1)*sin(dot(q,vec3(5.5,13.1,-15.7))+fp);
  fm=pm-d;d=max(d,pm);}
 return d;}
`,g=l(e+c+`in vec2 v;out vec4 o;uniform sampler2D uS;${i}${b}
void main(){
 vec3 ro=U[0].xyz,rd=rayFor(v);float pxA=U[1].w;
 float tB=1e9,aB=0.;int oB=-1;bool hB=false;float fB=0.;
 for(int i=0;i<NOB;i++){int b=OBJ+i*6;vec4 C2=U[b+3];
  if(C2.w>.5){vec4 BS=U[b+4];vec3 oc=ro-BS.xyz;float bb=dot(oc,rd),cc=dot(oc,oc)-BS.w*BS.w,hh=bb*bb-cc;
   if(hh>0.){hh=sqrt(hh);float t0=max(-bb-hh,0.),t1=-bb+hh;
    if(t0<tB){vec4 A=U[b],C0=U[b+1],C1=U[b+2];mat3 M=mat3(C0.xyz,C1.xyz,C2.xyz);float Rr=A.w;int k=int(C0.w+.5);int pc=int(floor(C1.w+.5));
     vec3 qo=((ro-A.xyz)*M)/Rr,qd=rd*M;float tq=t0/Rr,te=t1/Rr,mn=1e9,tmn=tq;bool hit=false;float fm;float ts=tq;
     for(int s=0;s<NST;s++){vec3 q=qo+qd*tq;float d=sdO(q,k,pc,fm);float dp=d/(tq*pxA);if(dp<mn){mn=dp;tmn=tq;}
      if(d<tq*pxA*.2){hit=true;break;}
      tq+=max(d*.9,tq*pxA*.35);if(tq>te)break;}
     float al=hit?1.:clamp(1.-mn/1.2,0.,1.);float tt=(hit?tq:tmn)*Rr;
     if(al>0.&&tt<tB){tB=tt;aB=al;oB=i;hB=hit;fB=clamp(((hit?tq:tmn)-ts)/max(te-ts,1e-20),0.,1.);}}}}}
 uint u=0u;
 if(oB>=0){u=uint(oB+1);
  if(hB)u|=8u|(uint(fB*268435455.+.5)<<4);
  else u|=(uint(aB*4095.+.5)<<4)|(aB>.03?65536u:0u)|(uint(fB*32767.+.5)<<17);}
 o=vec4(uvec4(u,u>>8,u>>16,u>>24)&255u)/255.;
}`),d=l(e+c+`in vec2 v;out vec4 o;uniform sampler2D uB,uN,uS,uG;${i}
vec3 bgAt(vec2 p){vec3 e=texture(uB,p).rgb;return e/max(1.-e,.004);}
${b}vec3 env(vec3 r){
 float up=r.y;vec3 w=r*r;w*=w;w/=w.x+w.y+w.z;
 vec4 n=tri(r*14.+vec3(5.,9.,2.),w);
 float holes=smoothstep(.5,.78,n.a*.75+n.b*.25);
 vec3 sky=mix(U[41].rgb*.62,U[8].rgb*.35,.45)*(.32+smoothstep(-.2,.42,up)*(1.-smoothstep(.3,.8,up)*(.85-.8*holes)));
 vec3 c=mix(U[7].rgb*(.8+.7*n.r),sky,smoothstep(-.22,.16,up));
 c+=U[5].rgb*.8*pow(max(dot(r,U[4].xyz),0.),16.);
 return c;}
float shadowAt(vec3 p,int self){float s=1.;vec3 L=U[4].xyz;
 for(int i=0;i<NOB;i++){if(i!=self&&U[OBJ+i*6+3].w>.5){vec4 BS=U[OBJ+i*6+4];vec3 oc=BS.xyz-p;float tb=dot(oc,L);
  if(tb>0.){float dc=length(oc-L*tb);float r=BS.w*U[OBJ+i*6+5].x;s*=smoothstep(r*.8,r*1.05+tb*.02,dc);}}}
 return s;}
float dap(vec3 p){vec3 L=U[4].xyz;vec3 a=normalize(cross(L,vec3(0,1,0))),b=cross(a,L);vec2 q=vec2(dot(p,a),dot(p,b));
 float tt=U[SPB+4].z;float n=texture(uS,q*(2.6/256.)+vec2(.31,.17)+vec2(sin(tt*.31)+.6*sin(tt*.83+1.),sin(tt*.27+2.)+.5*sin(tt*.71))*.006).b;return mix(U[10].x,1.,smoothstep(.36,.52,n));}
vec3 tm(vec3 c){c*=U[5].w;c=(c*(2.51*c+.03))/(c*(2.43*c+.59)+.14);return pow(clamp(c,0.,1.),vec3(1./2.2));}
void main(){
 vec3 ro=U[0].xyz,rd=rayFor(v),FW3=U[3].xyz,Ls=U[4].xyz;float pxA=U[1].w;
 vec3 col=bgAt(v);
 // ---- the nearest body this pixel sees, from the geometry pass ----
 uvec4 g4=uvec4(texelFetch(uG,ivec2(gl_FragCoord.xy),0)*255.+.5);uint u=g4.x|(g4.y<<8)|(g4.z<<16)|(g4.w<<24);
 float tB=1e9,aB=0.;int oB=int(u&7u)-1;vec3 qB=vec3(0);bool zOn=false;
 if(oB>=0){int b=OBJ+oB*6;vec4 A=U[b],C0=U[b+1],C1=U[b+2],C2=U[b+3];mat3 M=mat3(C0.xyz,C1.xyz,C2.xyz);float Rr=A.w;
  vec4 BS=U[b+4];vec3 oc=ro-BS.xyz;float bb=dot(oc,rd),cc=dot(oc,oc)-BS.w*BS.w,hh=sqrt(max(bb*bb-cc,0.));float t0=max(-bb-hh,0.),t1=-bb+hh;
  vec3 qo=((ro-A.xyz)*M)/Rr,qd=rd*M;float ts=t0/Rr,te=t1/Rr;bool hit=(u&8u)!=0u;
  float f=hit?float(u>>4)/268435455.:float(u>>17)/32767.;float tq=ts+f*(te-ts);
  aB=hit?1.:float((u>>4)&4095u)/4095.;zOn=hit||(u&65536u)!=0u;tB=tq*Rr;qB=qo+qd*tq;}
 vec3 cC=vec3(0);float zC=1e9;
 if(oB>=0){int b=OBJ+oB*6;vec4 A=U[b],C0=U[b+1],C1=U[b+2],C2=U[b+3];mat3 M=mat3(C0.xyz,C1.xyz,C2.xyz);float Rr=A.w;int k=int(C0.w+.5);int pc=int(floor(C1.w+.5));
  vec3 P=ro+rd*tB;zC=tB*dot(rd,FW3);float pxO=tB*pxA/Rr;
  vec3 nq=vec3(0);float fmS=0.;float ep=max(.002,pxO*.6);
  for(int j=0;j<4;j++){vec3 e=vec3(float(((j+3)>>1)&1),float((j>>1)&1),float(j&1))*2.-1.;float fm;float d=sdO(qB+e*ep,k,pc,fm);nq+=e*d;fmS+=fm;}
  nq=normalize(nq);fmS*=.25;bool flesh=pc>=0&&fmS>0.;
  int cb=CK+k*16;vec4 cm=U[cb+3],hil=U[cb+2];
  vec3 qn=normalize(qB);vec3 w3=pow(abs(nq),vec3(4.));w3/=w3.x+w3.y+w3.z;
  vec4 n1=tri(qB*24.+U[cb+15].xyz*9.,w3),n2=tri(qB*75.,w3),n3=tri(qB*250.,w3);
  vec3 alb;float cc;vec3 nb=nq;float sat=0.;
  if(!flesh){
   float ca=dot(qn,hil.xyz);
   float en=(n1.r-.5)*.3+(n2.g-.5)*.1;
   float sc=smoothstep(hil.w-.06,hil.w+.08,ca+en);
   float dk=clamp(cm.x,0.,1.),lt=clamp(-cm.x,0.,1.);
   // the figure: a few broad swirling bands of lighter chestnut, faint, like burr walnut
   float ang=acos(clamp(ca,-1.,1.));
   float f=ang*cm.y*3.+(n1.g-.5)*12.+(n1.a-.5)*6.;
   float bands=smoothstep(.3,.95,sin(f)*.5+.5)*smoothstep(.25,.7,n1.b);
   vec3 skin=mix(mix(vec3(.145,.043,.019),vec3(.045,.015,.009),dk),vec3(.36,.16,.07),lt);
   skin=mix(skin,vec3(.24,.062,.026),U[cb+8].w);
   skin*=.86+.28*smoothstep(.3,.8,n1.a);
   skin*=mix(vec3(.9,.88,.88),vec3(1.26,1.15,1.06),bands*(1.-dk*.6));
   // fresh from the husk: soft cream blotches on the side away from the eye, where it lay against the husk
   float hk=U[cb+10].w*smoothstep(-.15,-.6,ca+en*1.5+(n1.r-.5)*.8)*smoothstep(.32,.56,n2.b*.45+n1.a*.55);skin=mix(skin,vec3(.5,.37,.22)*(.86+.24*n2.g),hk*.7);
   float bnd=smoothstep(hil.w-.09,hil.w-.015,ca+en)*(1.-sc);
   skin=mix(skin,skin*vec3(.3,.26,.24),bnd*.85);
   sat=(.55+.9*bands)*smoothstep(.35,.8,cm.z); // an old dull coat: the broad sheen only
   // the hilum: part of the skin, cream to grey-tan, dull, faint lines radiating from its middle
   vec3 hb1=normalize(cross(hil.xyz,vec3(.31,.83,.47)));vec3 hb2=cross(hil.xyz,hb1);
   vec2 hq=vec2(dot(qB,hb1),dot(qB,hb2));float hr=max(length(hq),1e-3);vec2 hu=hq/hr;
   float rad=texture(uS,hu*(11./256.)+U[cb+15].xy*.1).r*.6+texture(uS,hu*(29./256.)+.3).g*.4;
   vec3 scar=mix(vec3(.19,.16,.125),vec3(.29,.26,.21),smoothstep(.3,.8,n2.a))*(.9+.2*rad)*(.88+.24*n3.r);
   scar=mix(scar,vec3(.15,.1,.06),smoothstep(.5,.85,n3.g)*.18);
   scar=mix(scar,vec3(.17,.1,.055),(1.-smoothstep(hil.w,hil.w+.14,ca+en))*.6);
   scar*=mix(vec3(1),vec3(1.14,1.,.78),U[cb+9].w); // buff, never slate, in its shadow
   alb=mix(skin,scar,sc);cc=(1.-sc)*cm.z;
   nb+=((n2.rgb-.5)*.03+(n1.rgb-.5)*.08)*(1.-sc)+((hb1*hu.y-hb2*hu.x)*(rad-.5)*.15+(n3.rgb-.5)*.12)*sc;
   float dust=smoothstep(.8,.92,n3.a)*smoothstep(.45,.7,n1.a);
   alb=mix(alb,vec3(.3,.25,.2),dust*.4);cc*=1.-dust*.6;
   // the string's hole: a torn rim with a fleck of pale flesh
   float hr2=length(qn.xz);float hole=1.-smoothstep(.045,.068,hr2);float rim=smoothstep(.045,.065,hr2)*(1.-smoothstep(.075,.1+.04*n3.g,hr2));
   alb=mix(alb,vec3(.55,.46,.31),rim*.65);alb*=1.-hole*.88;cc*=1.-max(hole,rim);
   if(pc<0){
    vec3 qw=qB+(n1.rgb-.5)*.24+(n2.rgb-.5)*.07;
    float d1=1e9,d2=1e9;vec3 s1=vec3(0),s2=vec3(1);int i1=0,i2=0;
    for(int j=0;j<N7;j++){vec3 sj=U[cb+8+j].xyz;vec3 dq=qw-sj;float dd=dot(dq,dq);if(dd<d1){d2=d1;s2=s1;i2=i1;d1=dd;s1=sj;i1=j;}else if(dd<d2){d2=dd;s2=sj;i2=j;}}
    float e=(d2-d1)/(2.*max(length(s2-s1),1e-3));
    float reach=-9.,bru=0.;
    for(int m=0;m<4;m++){vec4 im=U[cb+4+m];float dm=length(qw-im.xyz);reach=max(reach,im.w-dm);bru=max(bru,(1.-smoothstep(0.,.07+.06*im.w,dm))*step(.01,im.w));}
    float D=cm.w;
    // the first split runs from the string hole down the side; a second branches off it later; blows near it widen it
    float first=(i1==1||i2==1)?1.:smoothstep(.55,.85,D);
    float run=clamp((qn.y-(1.05-2.6*D))*5.,0.,1.);
    float on=max(run,clamp(reach*2.5,0.,1.)*step(.3,D))*first*step(.12,D);
    float wc=(.002+.03*D*D)*on*(.6+.8*n2.b);
    float crk=wc>0.?1.-smoothstep(wc,wc+pxO,e):0.;
    float lip=smoothstep(wc+.04,wc,e)*(1.-crk)*on;
    nb+=normalize(s2-s1)*lip*.4*min(D*1.5,1.);
    // bruises: dull, darker dents where blows landed
    alb=mix(alb,alb*vec3(.62,.55,.5),bru*.8);cc*=1.-bru*.85;nb+=(n2.rgb-.5)*.45*bru;
    float wide=smoothstep(.014,.035,wc);
    vec3 gap=mix(vec3(.03,.014,.008),vec3(.6,.52,.37),wide*smoothstep(wc*.5,0.,e)*.85);
    float edge=smoothstep(wc+pxO*1.5+.006+wc*.5,wc,e)*(1.-crk)*on;
    alb=mix(alb,vec3(.3,.18,.09)*(.8+.4*n3.r),edge*.6);cc*=1.-edge*.6;
    alb=mix(alb,gap,crk);cc*=1.-crk*.85;
   }else{
    // a broken piece's skin: torn and lifting at the break, its paler underside showing
    float tr=smoothstep(-.06-.04*n3.g,0.,fmS);
    alb=mix(alb,vec3(.33,.2,.1),tr*.6);cc*=1.-tr*.7;
   }
  }else{
   // solid kernel: dense, matt, cream; a thin brown skin with a ragged torn edge
   float dep=fmS;
   float sk=.05+.03*(n2.r-.5)+.025*(n3.b-.5);
   vec3 fl=vec3(.8,.73,.54)*(.86+.2*n2.g)*(.88+.22*n3.r);
   fl=mix(fl,vec3(.72,.58,.35),smoothstep(sk+.06,sk,dep)*.45);
   alb=mix(fl,vec3(.12,.045,.02),smoothstep(sk,sk-.012,dep));
   cc=.03;nb+=(n2.rgb-.5)*.2+(n3.rgb-.5)*.14;
  }
  vec3 nW=normalize(M*normalize(nb));vec3 Vv=-rd;float ndl=dot(nW,Ls);
  float sh=shadowAt(P,oB)*dap(P);
  vec3 dif=alb*(U[5].rgb*max(ndl,0.)*sh+U[6].rgb*(.65+.35*nW.y)+U[7].rgb*(.55-.45*nW.y));
  if(flesh)dif+=alb*alb*U[5].rgb*max(-ndl,0.)*.25*sh+alb*U[8].rgb*.3;
  else dif+=alb*U[5].rgb*sh*vec3(.9,.22,.06)*smoothstep(-.2,.02,ndl)*(1.-smoothstep(.02,.22,ndl))*.12;
  vec3 Hh=normalize(Ls+Vv);float nh=max(dot(nW,Hh),0.),nv=max(dot(nW,Vv),0.);
  float fr=.058+.38*pow(1.-nv,5.);
  // a polished coat: a broad sheen, a tight highlight and a hard core of sun
  vec3 spc=U[5].rgb*sh*step(0.,ndl)*(pow(nh,60.)*3.+pow(nh,400.)*30.*sat+pow(nh,2500.)*120.*sat)*fr*cc;
  vec3 rf=env(reflect(rd,nW))*fr*cc*(1.25+.7*sat)*mix(vec3(1.),vec3(1.,.8,.62),.5*smoothstep(.3,.5,U[6].b));
  cC=dif*(1.-fr*cc)+spc+rf;
 }
 col=mix(col,cC,aB);float zA=zOn?zC:1e4;
#ifdef ENC
 o=vec4(col/(1.+col),zA/(zA+50.));
#else
 o=vec4(col,zA);
#endif
}`),v=l(e+c+`in vec2 v;out vec4 o;uniform sampler2D uA,uN,uS;${i}
float shadowAt(vec3 p,int self){float s=1.;vec3 L=U[4].xyz;
 for(int i=0;i<NOB;i++){if(i!=self&&U[OBJ+i*6+3].w>.5){vec4 BS=U[OBJ+i*6+4];vec3 oc=BS.xyz-p;float tb=dot(oc,L);
  if(tb>0.){float dc=length(oc-L*tb);float r=BS.w*U[OBJ+i*6+5].x;s*=smoothstep(r*.8,r*1.05+tb*.02,dc);}}}
 return s;}
float dap(vec3 p){vec3 L=U[4].xyz;vec3 a=normalize(cross(L,vec3(0,1,0))),b=cross(a,L);vec2 q=vec2(dot(p,a),dot(p,b));
 float tt=U[SPB+4].z;float n=texture(uS,q*(2.6/256.)+vec2(.31,.17)+vec2(sin(tt*.31)+.6*sin(tt*.83+1.),sin(tt*.27+2.)+.5*sin(tt*.71))*.006).b;return mix(U[10].x,1.,smoothstep(.36,.52,n));}
vec3 tm(vec3 c){c*=U[5].w;c=(c*(2.51*c+.03))/(c*(2.43*c+.59)+.14);return pow(clamp(c,0.,1.),vec3(1./2.2));}
void main(){
 vec3 ro=U[0].xyz,rd=rayFor(v),FW3=U[3].xyz,Ls=U[4].xyz;
 vec4 A=texelFetch(uA,ivec2(gl_FragCoord.xy),0);
#ifdef ENC
 A.rgb=A.rgb/max(1.-A.rgb,.004);A.a=50.*A.a/max(1.-A.a,.001);
#endif
 vec3 col=A.rgb;float zA=A.a;
 // ---- strings, knots and tails: screen-space tubes ----
 vec3 cS=vec3(0);float aS=0.,zS=1e9;float ipx=U[SPB+4].x;
 for(int s=0;s<2;s++){vec4 bx=U[SPB+2+s];
  if(v.x>bx.x&&v.x<bx.z&&v.y>bx.y&&v.y<bx.w){
   float bd=1e9,bac=0.,bl=0.,bz=0.,bk=0.,br=0.;vec2 bdir=vec2(1,0);
   for(int i=0;i<NST/2-7;i++){int pb=STRB+s*44+i*2;vec4 a=U[pb],ae=U[pb+1],b2=U[pb+2],be=U[pb+3];
    if(ae.w<.5){vec2 pa=v-a.xy,ba=b2.xy-a.xy;float hq=clamp(dot(pa,ba)/max(dot(ba,ba),1e-10),0.,1.);vec2 dv=pa-ba*hq;float dist=length(dv);float r=mix(a.w,b2.w,hq);
     if(ae.y>.5&&be.y<.5)r=mix(a.w,b2.w,smoothstep(0.,.5,hq));
     float sd=dist-r;if(sd<bd){bd=sd;br=r;bac=clamp(dist/r,0.,1.)*sign(ba.x*pa.y-ba.y*pa.x);bl=mix(ae.x,be.x,hq);bz=mix(a.z,b2.z,hq);bk=max(ae.y,be.y)*(1.-abs(hq*2.-1.))+ae.y*be.y;bdir=normalize(ba+1e-9);}}}
   float fz=U[SPB+4].y*(s==0?1.:.6);
   float cov=clamp(-bd/ipx+.5,0.,1.);
   // stray fibres leaning along the string, and a faint fuzz round it
   float hair=0.,fzz=0.;
   if(bd<br*1.15+ipx){float u=bd/max(br,1e-5);
    float hn=texture(uS,vec2(bl*9.-u*1.6,u*.9+float(s)*.4)*(1./16.)).g,hn2=texture(uS,vec2(bl*17.+u*2.3,u*1.4+.7)*(1./16.)).r;
    hair=fz*(.5*smoothstep(.62,.8,hn)+.4*smoothstep(.66,.82,hn2))*smoothstep(br*1.15+ipx,br*.1,bd);
    fzz=fz*.3*smoothstep(br*.75+ipx,0.,bd);}
   float a=max(cov,max(hair,fzz));
   if(a>0.&&bz<zS){
    vec3 pw=normalize(-bdir.y*U[1].xyz+bdir.x*U[2].xyz),axd=normalize(bdir.x*U[1].xyz+bdir.y*U[2].xyz);
    float ac=cov>0.?bac:sign(bac)*.98;
    vec4 scol=U[SPB+s];
    float ply=U[SPB+4].w*(s==0?1.:1.15);
    // the twist: rounded plies leaning across the string; in the knot, strands crossing the other way
    float ph=bl*ply+asin(ac)*.32,pk=bl*ply*.6-asin(ac)*.5;
    float c1=sin(fract(ph)*3.1416),ck=sin(fract(pk)*3.1416);
    float crest=mix(c1,max(c1*.75,ck),bk);
    vec3 n=normalize(pw*ac+(-rd)*sqrt(max(1.-ac*ac,0.))+axd*cos(fract(ph)*3.1416)*.4*(1.-bk*.5));
    float fib=texture(uS,vec2(ph*6.,ac*4.+float(s)*.3)*(1./16.)).r;
    vec3 al=scol.rgb*(.45+.55*sqrt(max(crest,0.)))*(.8+.4*fib)*(.88+.24*texture(uS,vec2(bl*.7,float(s))*(1./8.)).b)*(1.-bk*.15);
    vec3 P=ro+rd*(bz/max(dot(rd,FW3),.01));
    float sh=dap(P)*shadowAt(P,-1);
    float ndl=dot(n,Ls),back=max(dot(rd,Ls),0.);
    vec3 c2=al*(U[5].rgb*max(ndl*.6+.4,0.)*sh+U[6].rgb*(.75+.25*n.y)+U[7].rgb*.5);
    c2+=al*U[5].rgb*sh*back*back*.3;
    c2+=U[5].rgb*sh*pow(max(dot(n,normalize(Ls-rd)),0.),12.)*.07*scol.w;
    if(cov<=0.)c2=al*(U[5].rgb*sh*(.3+1.3*back*back)+U[6].rgb*1.2);
    cS=c2;aS=a;zS=bz;}}}
 // ---- crumbs of shell and flesh ----
 vec3 cK=vec3(0);float aK=0.,zK=1e9;
 for(int i=0;i<N30/2+1;i++){vec4 cr=U[CRB+i];
  if(cr.w!=0.){vec2 d=v-cr.xy;float r=abs(cr.w);float fi=float(i);
   float a=fi*2.1;vec2 e=mat2(cos(a),sin(a),-sin(a),cos(a))*d;e.y*=1.5+.5*sin(fi*1.3);
   float rr=r*(.8+.35*texture(uS,e/r*(5./256.)+fi*.13).r);float cv=clamp((rr-length(e))/ipx+.5,0.,1.);
   if(cv>0.&&cr.z<zK){aK=cv;zK=cr.z;vec3 al=cr.w>0.?vec3(.13,.045,.02):vec3(.78,.7,.52);float l=.55+.45*dot(normalize(e+1e-6),vec2(-.6,.8));
    cK=al*(U[5].rgb*.7*l+U[6].rgb)+(cr.w>0.?U[5].rgb*.12*pow(max(l,0.),8.):vec3(0));}}}
 // ---- composite: a string or crumb behind a conker is hidden by it ----
 vec4 L1=vec4(cS,aS),L2=vec4(cK,aK);float z1=zS,z2=zK;
 if(z1<z2){vec4 tv=L1;L1=L2;L2=tv;float tz=z1;z1=z2;z2=tz;}
 if(z1<zA)col=mix(col,L1.rgb,L1.a);
 if(z2<zA)col=mix(col,L2.rgb,L2.a);
 float zf=zA<1e3?zA:1e9;if(aS>.03)zf=min(zf,zS);if(aK>.03)zf=min(zf,zK);
 o=vec4(tm(col),zf<1e8?clamp(.5*U[9].y/zf,0.,1.):0.);
}`),z=l(e+`in vec2 v;out vec4 o;uniform sampler2D uM,uN;
float cf(float a){return U[10].y*max(abs(1.-2.*a)-U[2].w,0.);}
void main(){vec4 c0=textureLod(uM,v,0.);vec3 a=c0.rgb;float Rs=U[4].w,ipx=U[SPB+4].x;
 if(Rs>ipx*1.5){float r0=cf(c0.a);vec3 acc=a;float wa=1.;
  float rot=texelFetch(uN,ivec2(gl_FragCoord.xy)&255,0).b*6.2832;
  for(int i=1;i<=N30+2;i++){float fi=float(i);float rr=Rs*sqrt(fi/float(N30+2));float an=fi*2.39996+rot;
   vec4 s=textureLod(uM,v+vec2(cos(an),sin(an))*rr,0.);float rs=cf(s.a);
   float r=min(s.a<=c0.a?min(rs,r0):rs,Rs);float w=clamp((r-rr)/ipx+1.,0.,1.);
   acc+=s.rgb*w;wa+=w;}
  a=acc/wa;}
 vec2 cv=v-.5;a*=1.-.1*smoothstep(.15,.85,dot(cv,cv)*1.8);
 ivec2 ip=ivec2(gl_FragCoord.xy);
 float g=texelFetch(uN,ip&255,0).r+texelFetch(uN,(ip/2+ivec2(77,31))&255,0).g-1.;
 a+=g*.012*(1.-.6*a);o=vec4(a,1.);}`);r.flush();const B=(x,U,H,N,Bt,qe,tt,qt)=>{const Nt=r.createTexture();return r.bindTexture(r.TEXTURE_2D,Nt),r.texImage2D(r.TEXTURE_2D,0,H,x,U,0,N,Bt,qt||null),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,qe),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,qe===r.NEAREST?r.NEAREST:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,tt),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,tt),Nt},P=new Uint8Array(256*256*4);{let x=49734321;for(let U=0;U<P.length;U++)x^=x<<13,x^=x>>>17,x^=x<<5,P[U]=x&255}const ut=B(256,256,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.NEAREST,r.REPEAT,P),Y=new Uint8Array(256*256*4);{const x=new Float32Array(4096);let U=461845907;const H=()=>(U^=U<<13,U^=U>>>17,U^=U<<5,(U>>>0)/4294967296),N=new Float32Array(256*256),Bt=(tt,qt)=>{for(let j=0;j<tt*tt;j++)x[j]=H();const Nt=256/tt,K=new Int32Array(256),Ne=new Int32Array(256),Ze=new Float32Array(256);for(let j=0;j<256;j++){const we=j/Nt,ce=Math.floor(we),ye=we-ce;K[j]=ce%tt,Ne[j]=(ce+1)%tt,Ze[j]=ye*ye*(3-2*ye)}const Qe=new Float32Array(256),Do=new Float32Array(256);for(let j=0;j<256;j++){const we=K[j]*tt,ce=Ne[j]*tt,ye=Ze[j];if(j===0||K[j]!==K[j-1])for(let Z=0;Z<256;Z++){const Go=Ze[Z],_o=x[we+K[Z]],Ho=x[ce+K[Z]];Qe[Z]=_o+(x[we+Ne[Z]]-_o)*Go,Do[Z]=Ho+(x[ce+Ne[Z]]-Ho)*Go}const ua=j*256;for(let Z=0;Z<256;Z++)N[ua+Z]+=qt*(Qe[Z]+(Do[Z]-Qe[Z])*ye)}},qe=[[[16,1]],[[32,1]],[[16,.5],[32,.3],[64,.2]],[[8,.7],[16,.3]]];for(let tt=0;tt<4;tt++){N.fill(0);for(const K of qe[tt])Bt(K[0],K[1]);let qt=1e9,Nt=-1e9;for(let K=0;K<N.length;K++)qt=Math.min(qt,N[K]),Nt=Math.max(Nt,N[K]);for(let K=0;K<N.length;K++)Y[K*4+tt]=Math.round((N[K]-qt)/(Nt-qt)*255)}}const X=B(256,256,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR_MIPMAP_LINEAR,r.REPEAT,Y);r.generateMipmap(r.TEXTURE_2D);const _=x=>{r.getProgramParameter(x,r.LINK_STATUS)||console.error("255 link",r.getProgramInfoLog(x),r.getShaderInfoLog(x.a),r.getShaderInfoLog(x.b)),r.deleteShader(x.a),r.deleteShader(x.b)};for(const x of s)_(x);const vt=(x,U)=>r.getUniformLocation(x,U),st=(x,U)=>{r.useProgram(x);for(const N in U)r.uniform1i(vt(x,N),U[N]);const H=r.getUniformBlockIndex(x,"F");H!==r.INVALID_INDEX&&r.uniformBlockBinding(x,H,0)};for(const x of n)st(x,{uN:0,uS:1});st(f,{uT:2}),st(m,{uT:2}),st(d,{uB:2,uN:0,uS:1,uG:5}),st(g,{uS:1}),st(v,{uA:4,uN:0,uS:1}),st(z,{uM:3,uN:0});const $=a?r.RGBA16F:r.RGBA8,Ft=a?r.HALF_FLOAT:r.UNSIGNED_BYTE,ae={},xe=x=>{if(ae[x])return ae[x];const U=B(x,x,$,r.RGBA,Ft,r.LINEAR,r.CLAMP_TO_EDGE),H=B(x,x,$,r.RGBA,Ft,r.LINEAR,r.CLAMP_TO_EDGE),N=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,N),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,U,0);const Bt=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,Bt),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,H,0),ae[x]={a:U,b:H,fa:N,fb:Bt}},S={},ge=x=>{if(S[x])return S[x];const U=B(x,x,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR,r.CLAMP_TO_EDGE),H=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,H),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,U,0);const N=B(x,x,$,r.RGBA,Ft,r.NEAREST,r.CLAMP_TO_EDGE),Bt=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,Bt),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,N,0),S[x]={t:U,f:H,ct:N,cf:Bt}},ba=r.createVertexArray(),Co=r.createBuffer();return r.bindBuffer(r.UNIFORM_BUFFER,Co),r.bufferData(r.UNIFORM_BUFFER,236*16,r.DYNAMIC_DRAW),r.bindFramebuffer(r.FRAMEBUFFER,null),{pH:f,pV:m,pAg:g,pA:d,pM:v,pP:z,tN:ut,tS:X,sd:Y,bakeTargets:xe,sceneTarget:ge,vao:ba,ubo:Co,tex:B,gVar:x=>{if(!u[x]){const U=[1,2,3].map(H=>l(p("#define GP "+H+`
`+x)));for(const H of U)_(H),st(H,{uN:0,uS:1});u[x]=U}return u[x]}}},xo=(O==="Under the crown"?`#define CROWN 1
`:"")+(F==="Stand back"?`#define BACK 1
`:"")+(ft===4?`#define PLAY 1
`:""),W=r.__c255||(r.__c255=ca(xo)),Ut=new Float32Array(236*4),y=(t,e,o,a,c)=>{Ut[t*4]=e,Ut[t*4+1]=o,Ut[t*4+2]=a,Ut[t*4+3]=c},Kt=wt>=500?768:384;if(y(0,k[0],k[1],k[2],rt),y(1,C[0],C[1],C[2],2*rt/wt),y(2,D[0],D[1],D[2],Be),y(3,T[0],T[1],T[2],1/Kt),y(4,ie[0],ie[1],ie[2],1),y(5,A.sun[0],A.sun[1],A.sun[2],A.exp),y(6,A.sky[0],A.sky[1],A.sky[2],5),y(7,A.bnc[0],A.bnc[1],A.bnc[2],56),y(8,A.haze[0],A.haze[1],A.haze[2],4),y(Ct,28,9,12,30),y(41,A.cool[0],A.cool[1],A.cool[2],A.cool[3]),y(42,A.glare[0],A.glare[1],A.glare[2],A.glare[3]),y(9,L[4],be,J,A.hz*(F==="Stand back"?2.2:ot==="Misty morning"&&O==="Low"?1.8:1)),y(10,A.dap,uo,ft,Math.floor(w()*200)),ft===4){const t=ht(.3+I()*.4,.15+I()*.25),e=t[1]<-.01?(J-k[1])/t[1]:60,o=Math.atan2(T[2],T[0])+(I()<.5?-1:1)*(.45+I()*.6);y(49,k[0]+t[0]*e,.64,k[2]+t[2]*e,o)}if(O==="Under the crown"){const t=300+I()*150;y(47,t,.35,I()*200,I()*200);for(let e=0;e<4;e++){const o=I()*6.2832,a=.5+(I()-.5)*.5,c=.5+(I()-.5)*.5,s=5+I()*7;if(e===3&&s>8.5){y(43+e,0,0,1,0),Ut[50*4+e]=0;continue}const l=(n,h)=>{const f=ht(n,h),m=(t-30-k[1])/Math.max(f[1],.05);return[k[0]+f[0]*m,k[2]+f[2]*m]},i=l(.5+Math.cos(o)*.8,.5+Math.sin(o)*.8),p=l(a,c),u=Math.hypot(p[0]-i[0],p[1]-i[1])||1;y(43+e,i[0],i[1],(p[0]-i[0])/u,(p[1]-i[1])/u),Ut[50*4+e]=s}}for(let t=0;t<8;t++){const e=Zt[t];e?(y(Ct+1+t,e[0],e[1],e[2],e[3]),y(Ct+9+t,e[4],e[5],e[6],e[7])):(y(Ct+1+t,0,0,0,0),y(Ct+9+t,0,1,0,0))}for(let t=0;t<3;t++)y(Ct+17+t,he[t][0],he[t][1],he[t][2],[Mt,Ue,ze()*50][t]);if(y(48,ot==="Misty morning"?.9:1,ot==="Misty morning"?.75:.3,0,0),pe.length&&Mt>0&&F!=="Portrait"){const t=W.sd,e=Ut[(Ct+19)*4+3],o=(h,f,m)=>{h-=.5,f-=.5;const b=Math.floor(h),g=Math.floor(f),d=h-b,v=f-g,z=(B,P)=>t[((g+P&255)*256+(b+B&255))*4+m];return((z(0,0)*(1-d)+z(1,0)*d)*(1-v)+(z(0,1)*(1-d)+z(1,1)*d)*v)/255},a=V([T[0],0,T[2]]),c=(h,f)=>{const m=ht(h,f),b=m[0]*a[0]+m[2]*a[2];if(b<=.05)return!1;const g=Mt/b,d=k[0]+m[0]*g,v=k[2]+m[2]*g,z=-d*a[2]+v*a[0];return k[1]+m[1]*g-J<Ue*(.45+.75*o(z*.7+e,7,3)+.35*o(z*2.6,19,2))},s=h=>{for(let f=1.04;f>.45;f-=.004)if(c(h,f))return f;return-1},l=Mt/Math.max(.2,Math.hypot(T[0],T[2])),i=Math.min(.09,Math.max(.025,L[4]*Math.abs(1-be/l))),p=bt(ht(.15,.8),ie)>=bt(ht(.85,.8),ie),u=Math.min(6,Math.max(3,pe.length-2)),n=i*.95;for(let h=0;h<u&&h<pe.length;h++){const f=pe[h],m=(f[0]-.02)/.5,b=(f[1]-.52)/.46,g=.02+i*.35+h*n+(m-.5)*n*.3;if(g>.36)break;const d=p?g:1-g,v=s(d);v<0||Q.push([d,Math.min(v,1)-i*(.45*b-.05),i,-(.2+.45*(1-h/Math.max(1,u-1)))*(.75+.25*b)])}}for(let t=0;t<16;t++){const e=Q[t];e?y(ao+t,e[0],e[1],e[2],e[3]):y(ao+t,0,0,0,0)}y(ne,kt.col[0],kt.col[1],kt.col[2],se==="Bootlace"?4:1),y(ne+1,me.col[0],me.col[1],me.col[2],1);const go=()=>{r.disable(r.DEPTH_TEST),r.disable(r.CULL_FACE),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.colorMask(!0,!0,!0,!0),r.depthMask(!1)},wo=()=>{r.bindBuffer(r.UNIFORM_BUFFER,W.ubo),r.bufferSubData(r.UNIFORM_BUFFER,0,Ut),r.bindBufferBase(r.UNIFORM_BUFFER,0,W.ubo)},ct=(t,e)=>{r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D,e)},Wt=(t,e,o)=>{r.bindFramebuffer(r.FRAMEBUFFER,e),r.viewport(0,0,o,o),r.useProgram(t),r.bindVertexArray(W.vao),r.drawArrays(r.TRIANGLES,0,3)},yo=W.tex(Kt,Kt,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR,r.CLAMP_TO_EDGE),zo=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,zo),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,yo,0);{const t=W.bakeTargets(Kt);go(),wo(),ct(0,W.tN),ct(1,W.tS);const e=W.gVar(xo);for(const o of e)Wt(o,t.fa,Kt);ct(2,t.a),Wt(W.pH,t.fb,Kt),ct(2,t.b),Wt(W.pV,zo,Kt),r.bindFramebuffer(r.FRAMEBUFFER,null)}const te=W.sceneTarget(wt);function Ke(t){const e=V([t.ax[0]+t.tl[0],t.ax[1],t.ax[2]+t.tl[1]]);let o=Lt(e,[0,0,1]);o=V(o);const a=Lt(o,e),c=t.phi+t.cn.phi,s=Math.cos(c),l=Math.sin(c),i=[o[0]*s+a[0]*l,o[1]*s+a[1]*l,o[2]*s+a[2]*l],p=Lt(i,e);t.rot[0]=i[0],t.rot[1]=i[1],t.rot[2]=i[2],t.rot[3]=e[0],t.rot[4]=e[1],t.rot[5]=e[2],t.rot[6]=p[0],t.rot[7]=p[1],t.rot[8]=p[2]}const Mo=(t,e)=>{const o=t.rot,a=[(e[0]-t.c[0])/t.cn.R,(e[1]-t.c[1])/t.cn.R,(e[2]-t.c[2])/t.cn.R];return[a[0]*o[0]+a[1]*o[1]+a[2]*o[2],a[0]*o[3]+a[1]*o[4]+a[2]*o[5],a[0]*o[6]+a[1]*o[7]+a[2]*o[8]]},Pt=(t,e)=>{const o=t.rot,a=t.cn.R;return[t.c[0]+(e[0]*o[0]+e[1]*o[3]+e[2]*o[6])*a,t.c[1]+(e[0]*o[1]+e[1]*o[4]+e[2]*o[7])*a,t.c[2]+(e[0]*o[2]+e[1]*o[5]+e[2]*o[8])*a]},na=t=>{const e=E[t],o=e.cn,a=Oo+t*16;y(a,o.rad[0],o.rad[1],o.rad[2],o.bump),y(a+1,o.flat[0],o.flat[1],o.flat[2],o.flat[3]),y(a+2,o.hd[0],o.hd[1],o.hd[2],o.scar),y(a+3,o.dark,o.grain,o.gloss,Math.min(1,e.dmg));for(let c=0;c<4;c++){const s=e.imps[c];s?y(a+4+c,s[0],s[1],s[2],s[3]):y(a+4+c,9,9,9,0)}for(let c=0;c<7;c++){const s=o.seeds[c]||[9,9,9];y(a+8+c,s[0],s[1],s[2],c===0?o.red||0:c===1?o.eyeW||0:c===2&&o.husk||0)}y(a+15,o.ph[0],o.ph[1],o.ph[2],o.taper)},ue=[],Xt=[],We=(t,e,o,a,c,s,l,i,p,u)=>{const n=eo+t*6;y(n,e[0],e[1],e[2],o),y(n+1,a[0],a[1],a[2],c),y(n+2,a[3],a[4],a[5],s),y(n+3,a[6],a[7],a[8],l),y(n+4,i[0],i[1],i[2],p),y(n+5,u,0,0,0)},xa=new Float32Array(22*8),sa=t=>{const e=E[t],o=e.str,a=jo+t*44;let c=1,s=1,l=0,i=0,p=0,u=0,n=0,h=0;const f=(d,v,z,B,P,ut,Y)=>{d>0&&(p+=Math.hypot(v-u,z-n,B-h)),u=v,n=z,h=B,it(v,z,B);const X=P/(Math.max(at,.01)*rt*2);y(a+d*2,xt,gt,at,X),y(a+d*2+1,p,ut,0,Y);const _=X*1.6+.004;at>.5&&(c=Math.min(c,xt-_),l=Math.max(l,xt+_),s=Math.min(s,gt-_),i=Math.max(i,gt+_))};for(let d=0;d<17;d++)f(d,e.ch[d*3],e.ch[d*3+1],e.ch[d*3+2],o.r,0,d===16?1:0);const m=Pt(e,[0,-e.bot-.03,0]),b=Pt(e,[.07,-e.bot-.1,.04]),g=Pt(e,[-.035,-e.bot-.165,-.02]);p+=2.2,f(17,m[0],m[1],m[2],o.r*1.9,1,0),f(18,b[0],b[1],b[2],o.r*2.5,1,0),f(19,g[0],g[1],g[2],o.r*2.2,1,0);for(let d=2;d<4;d++)f(18+d,e.tail[d*3],e.tail[d*3+1],e.tail[d*3+2],o.r*(1-d*.07),0,0);y(ne+2+t,Math.max(0,c),Math.max(0,s),Math.min(1,l),Math.min(1,i))};y(ne+4,1/wt,kt.fuzz,0,kt.ply);const ra=t=>{y(2,D[0],D[1],D[2],Be);for(let o=0;o<2;o++){const a=E[o];na(o),Ke(a);const c=a.cn.R;if(!a.burst)We(o,a.c,c,a.rot,o,-1,1,a.c,c*1.16,.86);else{const s=a.cn.seeds[0],l=Pt(a,s);We(o,a.c,c,a.rot,o,0,1,l,c*.95,.6)}sa(o)}for(let o=0;o<3;o++){const a=ue[o];if(a&&a.on){const c=a.rot,s=a.off,l=E[a.k].cn.R,i=[a.cm[0]-(c[0]*s[0]+c[3]*s[1]+c[6]*s[2])*l,a.cm[1]-(c[1]*s[0]+c[4]*s[1]+c[7]*s[2])*l,a.cm[2]-(c[2]*s[0]+c[5]*s[1]+c[8]*s[2])*l];We(2+o,i,l,c,a.k,a.pc,1,a.cm,l*.98,.6)}else y(eo+(2+o)*6+3,0,0,1,0)}for(let o=0;o<16;o++){const a=Xt[o];a&&a.on?(it(a.p[0],a.p[1],a.p[2]),y(oo+o,xt,gt,at,a.r/(Math.max(at,.01)*rt*2)*(a.fl?-1:1))):y(oo+o,0,0,0,0)}y(ne+4,1/wt,kt.fuzz,t,kt.ply);let e=0;for(const o of E)it(o.c[0],o.c[1],o.c[2]),e=Math.max(e,vo(at));for(const o of ue)o&&o.on&&(it(o.cm[0],o.cm[1],o.cm[2]),e=Math.max(e,vo(at)));Ut[4*4+3]=Math.min(e,.022)},ko=t=>{ra(t),go(),wo(),ct(0,W.tN),ct(1,W.tS),ct(2,yo),ct(3,null),ct(4,null),ct(5,null),r.disable(r.DITHER),Wt(W.pAg,te.f,wt),r.enable(r.DITHER),ct(5,te.t),Wt(W.pA,te.cf,wt),ct(5,null),ct(4,te.ct),Wt(W.pM,te.f,wt),r.flush(),ct(3,te.t),Wt(W.pP,null,wt)};let Vt=1779033703;const Ae=()=>(Vt^=Vt<<13,Vt^=Vt>>>17,Vt^=Vt<<5,(Vt>>>0)/2147483648-1),ia=(t,e,o,a)=>{if(!M.sound.on)return;const c=24e3,s=2600,l=new Float32Array(s),i=[[1650,.021,1],[2780,.013,.55],[4150,.008,.35],[6300,.0045,.2]];for(const h of i){const f=h[0]*(1.5/o)*(1-.32*e)*(.94+.12*Math.abs(Ae())),m=2*Math.PI*f/c,b=2*Math.cos(m),g=Math.exp(-1/(c*h[1]*(1-.6*e)));let d=Math.sin(m)*h[2],v=0,z=1;for(let B=0;B<s;B++){const P=b*d-v;v=d,d=P,l[B]+=v*z,z*=g}}const p=.0012+.007*e;let u=1;const n=Math.exp(-1/(c*p));for(let h=0;h<s;h++)l[h]=l[h]*.32+Ae()*u*(.35+1.1*e),u*=n;M.sound.pcm(l,c,{vel:Math.min(1,.15+t/170),pan:a})},la=t=>{if(!M.sound.on)return;const e=24e3,o=7e3,a=new Float32Array(o);let c=0;for(let s=0;s<o;s++){const l=s/e,i=Math.exp(-l/.06)+.5*Math.exp(-l/.015),p=Ae()*(Math.abs(Ae())>.85?1.6:.5);c+=(p-c)*.45,a[s]=c*i*.9}M.sound.pcm(a,e,{vel:.9,pan:t}),M.sound.hit("kick",.25)},Jt=t=>[(t.c[0]-t.cp[0])/R,(t.c[1]-t.cp[1])/R,(t.c[2]-t.cp[2])/R],Re=(t,e)=>{t.cp[0]=t.c[0]-e[0]*R,t.cp[1]=t.c[1]-e[1]*R,t.cp[2]=t.c[2]-e[2]*R},ve=t=>It+(2*t.cn.rad[1]-t.bot)*t.cn.R;let Uo=-9,Yt=-1,Xe=-9;const Bo=(t,e,o,a,c)=>{for(let s=0;s<e;s++){let l=Xt.findIndex(p=>!p.on);if(l<0)if(Xt.length<16)l=Xt.length,Xt.push({on:!1});else continue;const i=V([q(),q()+.4,q()]);Xt[l]={on:!0,p:t.slice(),v:[o[0]+i[0]*c*(.4+w()),o[1]+i[1]*c*(.4+w()),o[2]+i[2]*c*(.4+w())],r:.05+w()*(a?.14:.09),fl:a&&w()<.4}}},Ao=(t,e,o)=>{t.burst=!0,Yt=t.k,Xe=o;const a=Jt(t),c=t.cn;for(let s=1;s<4;s++){const l=c.seeds[s],i=[l[0]*.86,l[1]*.86,l[2]*.86],p=Pt(t,i),u=V([p[0]-t.c[0],p[1]-t.c[1],p[2]-t.c[2]]),n=22+w()*40;ue[s-1]={on:!0,k:t.k,pc:s,off:i,cm:p,rot:t.rot.slice(),v:[a[0]*.35+u[0]*n+e[0]*22,a[1]*.35+u[1]*n+40+e[1]*22,a[2]*.35+u[2]*n+e[2]*22],w:[q()*22,q()*22,q()*22]}}Bo(t.c,10,a.map(s=>s*.5),!0,90),it(t.c[0],t.c[1],t.c[2]),la((xt-.5)*1.6)},fa=t=>{const e=E[0],o=E[1],a=e.cn.R*(e.burst?.55:.97*(e.cn.rad[0]+e.cn.rad[2])*.5),c=o.cn.R*(o.burst?.55:.97*(o.cn.rad[0]+o.cn.rad[2])*.5),s=[o.c[0]-e.c[0],o.c[1]-e.c[1],o.c[2]-e.c[2]],l=Math.hypot(s[0],s[1],s[2]);if(l>=a+c||l<1e-6)return;const i=[s[0]/l,s[1]/l,s[2]/l],p=e.held?0:e.im,u=o.held?0:o.im;if(p+u===0)return;const n=a+c-l;for(let S=0;S<3;S++)e.c[S]-=i[S]*n*p/(p+u),e.cp[S]-=i[S]*n*p/(p+u),o.c[S]+=i[S]*n*u/(p+u),o.cp[S]+=i[S]*n*u/(p+u);const h=e.held?e.hv:Jt(e),f=o.held?o.hv:Jt(o),m=[h[0]-f[0],h[1]-f[1],h[2]-f[2]],b=bt(m,i);if(b<=0)return;const g=.5,d=(1+g)*b/(p+u),v=[m[0]-i[0]*b,m[1]-i[1]*b,m[2]-i[2]*b],z=Math.hypot(v[0],v[1],v[2]),B=z>1e-6?Math.min(.35*d,z/(p+u)*.5)/z:0;for(let S=0;S<3;S++)h[S]-=(d*i[S]+B*v[S])*p,f[S]+=(d*i[S]+B*v[S])*u;e.held||Re(e,h),o.held||Re(o,f);const P=[B*v[0],B*v[1],B*v[2]],ut=Lt([i[0]*a,i[1]*a,i[2]*a],[-P[0],-P[1],-P[2]]),Y=Lt([-i[0]*c,-i[1]*c,-i[2]*c],P);if(e.w+=2.5*bt(ut,e.ax)/(a*a)*p,o.w+=2.5*bt(Y,o.ax)/(c*c)*u,e.tv[0]-=i[0]*d*.05*p,e.tv[1]-=i[2]*d*.05*p,o.tv[0]+=i[0]*d*.05*u,o.tv[1]+=i[2]*d*.05*u,b<6||t-Uo<.08)return;Uo=t;const X=b/175*(b/175),_=[e.c[0]+i[0]*a,e.c[1]+i[1]*a,e.c[2]+i[2]*a],vt=[o.c[0]-i[0]*c,o.c[1]-i[1]*c,o.c[2]-i[2]*c];let st=0,$=0;if(!e.burst){const S=Mo(e,_),ge=bt(V(S),e.cn.hd)>e.cn.scar-.1?1.6:1;st=Math.min(.62,X*(.45+w()*.9)*ge/e.cn.hard),Ie(e,S,st)}if(!o.burst){const S=Mo(o,vt),ge=bt(V(S),o.cn.hd)>o.cn.scar-.1?1.6:1;$=Math.min(.62,X*(.45+w()*.9)*ge/o.cn.hard),Ie(o,S,$)}const Ft=[(_[0]+vt[0])/2,(_[1]+vt[1])/2,(_[2]+vt[2])/2];it(Ft[0],Ft[1],Ft[2]),ia(b,Math.min(1,(e.dmg+o.dmg)*.5),(e.cn.R+o.cn.R)*.5,(xt-.5)*1.6),X>.08&&Bo(Ft,Math.min(5,1+Math.floor(X*6)),[0,0,0],!1,40+b*.3);const ae=!e.burst&&e.dmg>=1,xe=!o.burst&&o.dmg>=1;ae&&(!xe||e.dmg>=o.dmg)?(Ao(e,i.map(S=>-S),t),xe&&(o.dmg=.97)):xe&&(Ao(o,i,t),ae&&(e.dmg=.97))},ha=t=>{for(const e of E){const o=e.tw;if(e.piv[0]=e.pivB[0]+.09*Math.sin(t*.61+o[0])+.05*Math.sin(t*1.73+o[1]),e.piv[1]=e.pivB[1]+e.lift,e.piv[2]=e.pivB[2]+.08*Math.sin(t*.47+o[2])+.04*Math.sin(t*1.31+o[3]),e.held){e.cp[0]=e.c[0],e.cp[1]=e.c[1],e.cp[2]=e.c[2];for(let f=0;f<3;f++)e.c[f]=e.hold[f],e.cp[f]=e.c[f]-e.hv[f]*R}else{const f=Jt(e);let m=1-.12*R;e.steady>0&&(m=1-7*R);let b=0,g=-jt,d=0;if(e.grab){const $=e.grab;b+=($[0]-e.c[0])*520-f[0]*38,g+=($[1]-e.c[1])*520-f[1]*38+jt*.9,d+=($[2]-e.c[2])*520-f[2]*38}const v=e.c[0]+f[0]*m*R+b*R*R,z=e.c[1]+f[1]*m*R+g*R*R,B=e.c[2]+f[2]*m*R+d*R*R;e.cp[0]=e.c[0],e.cp[1]=e.c[1],e.cp[2]=e.c[2],e.c[0]=v,e.c[1]=z,e.c[2]=B;const P=ve(e),ut=e.c[0]-e.piv[0],Y=e.c[1]-e.piv[1],X=e.c[2]-e.piv[2],_=Math.hypot(ut,Y,X);if(_>P){const $=P/_;e.c[0]=e.piv[0]+ut*$,e.c[1]=e.piv[1]+Y*$,e.c[2]=e.piv[2]+X*$}const vt=Jt(e),st=Math.hypot(vt[0],vt[1],vt[2]);st>520&&Re(e,vt.map($=>$*520/st))}const a=e.piv[0]-e.c[0],c=e.piv[1]-e.c[1],s=e.piv[2]-e.c[2],l=Math.hypot(a,c,s),p=l>ve(e)-.05?1:.02;e.ax[0]+=(a/l-e.ax[0])*p,e.ax[1]+=(c/l-e.ax[1])*p,e.ax[2]+=(s/l-e.ax[2])*p;const u=Math.hypot(e.ax[0],e.ax[1],e.ax[2]);e.ax[0]/=u,e.ax[1]/=u,e.ax[2]/=u;const n=17,h=e.steady>0?9:1.4;for(let f=0;f<2;f++)e.tv[f]+=(-n*n*e.tl[f]-h*e.tv[f])*R,e.tl[f]+=e.tv[f]*R;e.w+=(-1.9*1.9*e.phi-(e.steady>0?2.5:.12)*e.w)*R,e.phi+=e.w*R,e.steady>0&&(e.steady-=R)}fa(t)},Ro=(t,e)=>{const o=Pt(t,[0,t.top,0]),a=t.ch,c=t.chp,s=17,l=t.piv[0],i=t.piv[1],p=t.piv[2],u=Math.hypot(o[0]-l,o[1]-i,o[2]-p),n=It/16;if(u>It*.997){for(let m=0;m<s;m++){const b=m/16,g=l+(o[0]-l)*b,d=i+(o[1]-i)*b,v=p+(o[2]-p)*b;c[m*3]=a[m*3],c[m*3+1]=a[m*3+1],c[m*3+2]=a[m*3+2],a[m*3]=g,a[m*3+1]=d,a[m*3+2]=v}return}const h=3,f=e/h;for(let m=0;m<h;m++){for(let b=1;b<s-1;b++){const g=b*3;for(let d=0;d<3;d++){const v=a[g+d],z=(v-c[g+d])*.985;c[g+d]=v,a[g+d]=v+z+(d===1?-jt*f*f:0)}}a[0]=l,a[1]=i,a[2]=p,a[(s-1)*3]=o[0],a[(s-1)*3+1]=o[1],a[(s-1)*3+2]=o[2];for(let b=0;b<14;b++)for(let g=0;g<s-1;g++){const d=g*3,v=d+3,z=a[v]-a[d],B=a[v+1]-a[d+1],P=a[v+2]-a[d+2],ut=Math.hypot(z,B,P)||1e-6,Y=g===0?0:1,X=g===s-2?0:1;if(Y+X===0)continue;const _=(ut-n)/ut/(Y+X);a[d]+=z*_*Y,a[d+1]+=B*_*Y,a[d+2]+=P*_*Y,a[v]-=z*_*X,a[v+1]-=B*_*X,a[v+2]-=P*_*X}}},So=(t,e)=>{const o=Pt(t,[.03,-t.bot-.11,.02]),a=t.tail,c=t.tailp,s=2,l=e/s,i=.26;for(let p=0;p<s;p++){a[0]=o[0],a[1]=o[1],a[2]=o[2];for(let u=1;u<5;u++){const n=u*3;for(let h=0;h<3;h++){const f=a[n+h],m=(f-c[n+h])*.95;c[n+h]=f,a[n+h]=f+m+(h===1?-jt*l*l*.6:(h===0?t.curl[0]:t.curl[1])*u*jt*l*l*.5)}}for(let u=0;u<6;u++)for(let n=0;n<4;n++){const h=n*3,f=h+3,m=a[f]-a[h],b=a[f+1]-a[h+1],g=a[f+2]-a[h+2],d=Math.hypot(m,b,g)||1e-6,v=n===0?0:1,z=(d-i)/d/(v+1);a[h]+=m*z*v,a[h+1]+=b*z*v,a[h+2]+=g*z*v,a[f]-=m*z,a[f+1]-=b*z,a[f+2]-=g*z}for(let u=1;u<5;u++){const n=u*3,h=[a[n]-t.c[0],a[n+1]-t.c[1],a[n+2]-t.c[2]],f=Math.hypot(h[0],h[1],h[2]),m=t.cn.R*(t.burst?.45:1.02);if(f<m)for(let b=0;b<3;b++)a[n+b]=t.c[b]+h[b]/f*m}}},da=()=>{for(const t of E){Ke(t);for(let o=0;o<40;o++)Ro(t,1/30);const e=Pt(t,[.03,-t.bot-.11,.02]);for(let o=0;o<5;o++)t.tail[o*3]=t.tailp[o*3]=e[0]+.02*o,t.tail[o*3+1]=t.tailp[o*3+1]=e[1]-o*.26,t.tail[o*3+2]=t.tailp[o*3+2]=e[2];for(let o=0;o<60;o++)So(t,1/30)}},$t={Gentle:[55,95,.5,.19,.25],Steady:[85,135,.35,.21,.27],Wild:[130,210,1.4,.23,.3]}[Ce];let G="wait",To=0,Lo=.7,Se=Xo,Ve=!1,dt=null,ee=-9,Eo=!!zt;const Te=(t,e,o)=>{const a=E[t],c=(o?-1:1)*((o?.18:$t[3])+w()*(o?.07:$t[4]-$t[3])),s=o?80+w()*60:$t[0]+w()*($t[1]-$t[0]),l=(o?q()*.35:q()*$t[2])*(Eo?.25:1);Eo=!1,dt={k:t,t0:e,th:c,dur:.9,hold:.3,push:s,z:l,from:a.c.slice()},a.held=!0,a.hv=[0,0,0],a.hold=a.c.slice(),G=o?"pull":"them"},pa=t=>{const e=dt,o=E[e.k],a=ve(o),c=Math.min(1,(t-e.t0)/e.dur),s=c*c*(3-2*c),l=e.th*s,i=[o.piv[0]+Math.sin(l)*a,o.piv[1]-Math.cos(l)*a,o.pivB[2]+e.z*s];return[e.from[0]+(i[0]-e.from[0])*s,e.from[1]+(i[1]-e.from[1])*s,e.from[2]+(i[2]-e.from[2])*s]},ma=t=>{const e=dt,o=E[e.k],a=e.th,c=a>0?[-Math.cos(a),-Math.sin(a),0]:[Math.cos(a),Math.sin(a),0];o.held=!1,Re(o,[c[0]*e.push,c[1]*e.push,0]),dt=null,ee=t,it(o.c[0],o.c[1],o.c[2]),M.sound.hit("noise",.05+e.push/2500,{cutoff:700+e.push*6}),G=e.k?"theirs":"yours"},Po=t=>{const e=Jt(t);return Math.hypot(e[0],e[1],e[2])},nt=M.input;let Le=!1,Fo=0,Je=0,Ye=0,Ee=!1,Pe=null,$e=null;const qo=(t,e)=>{const o=ht(t,1-e),c=(E[0].pivB[2]-k[2])/(Math.abs(o[2])>1e-4?o[2]:-1e-4);return[k[0]+o[0]*c,k[1]+o[1]*c,k[2]+o[2]*c]};let oe=0,Fe=0,No=0;return da(),ko(0),(t,e)=>{e=Math.min(Math.max(e||0,0),.1);let o=1;if(Yt>=0){const n=oe-Xe;if(n<.3)o=.15;else if(n<.8){const h=(n-.3)/.5;o=.15+.85*h*h*(3-2*h)}}const a=e*o;No+=e-a;const c=t-No,s=E[0],l=E[1];(nt.inside||nt.down)&&(Ve=!0);const i=nt.taps(),p=G==="wait"||G==="yours"||G==="theirs";if(nt.down&&!Le&&(Fo=c,Je=nt.x,Ye=nt.y,Ee=!1),nt.down&&(Math.hypot(nt.x-Je,nt.y-Ye)>.02&&(Ee=!0),Ee&&!s.grab&&p&&!s.burst&&($e=qo(Je,Ye),Pe=s.c.slice(),s.grab=Pe.slice(),s.steady=0,G="grab"),s.grab)){const n=qo(nt.x,nt.y);let h=[Pe[0]+(n[0]-$e[0])*1.5,Pe[1]+(n[1]-$e[1])*1.5,s.pivB[2]];const f=ve(s),m=[h[0]-s.piv[0],h[1]-s.piv[1],h[2]-s.piv[2]],b=Math.hypot(m[0],m[1],m[2]);b>f&&(h=[s.piv[0]+m[0]*f/b,s.piv[1]+m[1]*f/b,s.piv[2]+m[2]*f/b]),s.grab=h}if(!nt.down&&Le)if(s.grab){s.grab=null,ee=c,G="yours";const n=Jt(s);M.sound.hit("noise",Math.min(.3,Math.hypot(n[0],n[1])/900),{cutoff:600+Math.hypot(n[0],n[1])*4})}else!Ee&&c-Fo<.4&&G==="wait"&&!s.burst&&Te(0,c,!0);else!nt.down&&!Le&&i.length&&G==="wait"&&!s.burst&&Te(0,c,!0);if(Le=nt.down,G==="wait"&&((zt||c>Se-.5)&&(l.steady=.2),c>=Se&&!s.burst&&Te(0,c,!0)),(G==="pull"||G==="them")&&dt){const n=dt;n.k===1&&(s.steady=.2),c-n.t0>n.dur+n.hold&&ma(c)}if((G==="yours"||G==="theirs")&&Yt<0){const n=Po(s)<7&&Po(l)<7;G==="yours"&&c-ee>1.5&&(n||c-ee>3.2)?(s.steady=.9,G="steady",To=c,Lo=.5+w()*w()*2.2):G==="theirs"&&c-ee>1.6&&(n||c-ee>3.2)&&(G="wait",Se=c+(Ve?7:1.6)+w()*2.6)}if(G==="steady"&&(s.steady=.2,c-To>Lo&&Te(1,c,!1)),Yt>=0){const n=E[Yt],h=oe-Xe;if(dt&&dt.k===Yt&&(n.held=!1,dt=null),G!=="refill"&&(G="refill",s.grab&&(s.grab=null)),h>1.8&&h<3){const f=(h-1.8)/1.2;n.lift=42*f*f*(3-2*f)}else if(h>=3&&n.burst){n.cn=lo(pt([["Round",4],["Lopsided",3],["Flat-sided",3],["Big scar",1]]),n.k?le+1.05:le-1.4),_t&&(so(n.cn,De(n.cn.kn,1.15+mt()*.8)),n.im=n.cn.im),n.burst=!1,n.dmg=0,n.imps=[],n.top=n.cn.rad[1],n.bot=n.cn.rad[1],n.phi=0,n.w=0,n.tl=[0,0],n.tv=[0,0],n.lift=42,n.c=[n.pivB[0],n.pivB[1]+42-ve(n),n.pivB[2]],n.cp=n.c.slice(),n.ax=[0,1,0];for(const f of ue)f&&f.k===n.k&&(f.on=!1);for(let f=0;f<17;f++)n.ch[f*3]=n.chp[f*3]=n.pivB[0],n.ch[f*3+1]=n.chp[f*3+1]=n.pivB[1]+42-It*f/16,n.ch[f*3+2]=n.chp[f*3+2]=n.pivB[2];for(let f=0;f<5;f++)n.tail[f*3]=n.tailp[f*3]=n.c[0],n.tail[f*3+1]=n.tailp[f*3+1]=n.c[1]-n.cn.R-.3-f*.42,n.tail[f*3+2]=n.tailp[f*3+2]=n.c[2]}if(h>=3&&h<4.8){const f=Math.min(1,(h-3)/1.6);n.lift=42*(1-f*f*(3-2*f)),n.steady=.2}h>=5.2&&(n.lift=0,Yt=-1,G="wait",Se=c+(Ve?6:1.4)+w()*2)}Fe+=a;let u=0;for(;Fe>=R&&u<64;){if(oe+=R,dt){const n=E[dt.k],h=pa(oe);n.hv=[(h[0]-n.hold[0])/R,(h[1]-n.hold[1])/R,(h[2]-n.hold[2])/R],oe-dt.t0<R*1.5&&(n.hv=[0,0,0]),n.hold=h}ha(oe),Fe-=R,u++}u>=64&&(Fe=0);for(const n of E)Ke(n),Ro(n,Math.max(a,1/60)),So(n,Math.max(a,1/60));for(const n of ue){if(!n||!n.on)continue;n.v[1]-=jt*a;for(let f=0;f<3;f++)n.v[f]*=1-.3*a,n.cm[f]+=n.v[f]*a;const h=Math.hypot(n.w[0],n.w[1],n.w[2]);if(h>1e-5){const f=h*a,m=[n.w[0]/h,n.w[1]/h,n.w[2]/h],b=Math.cos(f),g=Math.sin(f),d=n.rot;for(let v=0;v<3;v++){const z=[d[v*3],d[v*3+1],d[v*3+2]],B=bt(m,z),P=Lt(m,z);d[v*3]=z[0]*b+P[0]*g+m[0]*B*(1-b),d[v*3+1]=z[1]*b+P[1]*g+m[1]*B*(1-b),d[v*3+2]=z[2]*b+P[2]*g+m[2]*B*(1-b)}}it(n.cm[0],n.cm[1],n.cm[2]),(gt<-.3||n.cm[1]<J-5)&&(n.on=!1)}for(const n of Xt)if(n.on){n.v[1]-=jt*a;for(let h=0;h<3;h++)n.p[h]+=n.v[h]*a;it(n.p[0],n.p[1],n.p[2]),(gt<-.1||n.p[1]<J)&&(n.on=!1)}ko(t)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
