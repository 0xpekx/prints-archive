// Mirror Trick: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/450.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(nt){nt&&nt.add({num:450,name:"Mirror Trick",fam:"Worlds",recipe:"A printed object on a little turntable in front of a mirror, shaped so it looks like one thing straight on and something else in the glass. It can be a ring, a diamond, a pointed arch or a hexagon. Drag to turn it (half a turn swaps the shapes, and a flick keeps it spinning), hold to lift the camera and see the real wavy rim, or tap to set down another one.",interactive:"Drag to turn the turntable (half a turn swaps the shapes; flick it and it runs on and slows), hold to lift the camera and see the true wavy rim, tap to set down another ambiguous object",music:!0,gl:!0,fps:30,seed:0,make(_){const e=_.gl,S=_.size,ne=_.hash.slice(2);let Ce=parseInt(ne.slice(0,8),16)>>>0,pe=parseInt(ne.slice(8,16),16)>>>0,W=parseInt(ne.slice(16,24),16)>>>0,Fe=parseInt(ne.slice(24,32),16)>>>0;const ue=()=>{Ce>>>=0,pe>>>=0,W>>>=0,Fe>>>=0;const t=(Ce+pe|0)+Fe|0;return Fe=Fe+1|0,Ce=pe^pe>>>9,pe=W+(W<<3)|0,W=W<<21|W>>>11,W=W+t|0,(t>>>0)/4294967296};for(let t=0;t<12;t++)ue();const K=(t,a,o)=>{let l=0;for(const s of a)l+=s[1];let r=ue()*l,n=a[a.length-1][0];for(const s of a){if(r<s[1]){n=s[0];break}r-=s[1]}return _.home&&(n=o),_.trait(t,n)},qe=K("Object",[["Ring",50],["Diamond",30],["Pointed arch",20]],"Ring"),Ot=K("Material",[["White PLA",40],["Paper card",22],["Orange PLA",16],["Grey resin",14],["Two-tone",8]],"White PLA"),Ct=K("Mat",[["Green cutting mat",45],["Grey cutting mat",22],["Birch bench",22],["Black slate",11]],"Green cutting mat"),qt=K("Mirror",[["Clean",50],["Dusty",32],["Antique",18]],"Clean"),Bt=K("Light",[["North window",45],["Desk lamp",25],["Overcast",18],["Low sun",12]],"North window"),ct=K("Wall",[["Low",28],["Standard",50],["Tall",22]],"Standard"),Ae=K("Camera",[["Standard",50],["Steep",25],["Low",25]],"Standard"),Gt=K("Turntable",[["Birch ply",55],["Cork",30],["Black anodised",15]],"Birch ply");let ve=parseInt(ne.slice(40,48),16)^1759714724|0;const X=()=>{ve=ve+1831565813|0;let t=Math.imul(ve^ve>>>15,1|ve);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Be=X(),ft=X(),lt=X(),Ht=X();let Y=1158425105;for(let t=0;t<ne.length;t+=8)Y=Math.imul(Y^parseInt(ne.slice(t,t+8),16),668265263)^Y>>>15;const Q=()=>{Y=Y+1831565813|0;let t=Math.imul(Y^Y>>>15,1|Y);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ut=Q(),ht=Q();let _e=qe;qe==="Ring"&&!_.home&&(_e=ut<.24?"Hexagon":ut<.48?"Star ring":"Ring"),_e!==qe&&_.trait("Object",_e);const O=_.home?0:ht<.2?-1:ht<.3?1:0,dt=Ae+(Ge(Be)?Ge(Be)>0?", from the right":", from the left":"")+(O<0?", close":O>0?", far":"");function Ge(t){return _.home||t<.6?0:t<.82?1:-1}const He=Ge(Be);dt!==Ae&&_.trait("Camera",dt);const mt=_.trait("Turn",_.home||ft<.6?"Facing":ft<.88?He?"Facing":"Half turn":"Mid-turn"),ze=He>0?.36+lt*.1:He<0?-(.42+lt*.16):0,Vt=mt==="Half turn"?Math.PI:mt==="Mid-turn"?Math.PI*(.38+Ht*.22):0;let ce=["Ring","Diamond","Pointed arch","Hexagon","Star ring"].indexOf(_e);const xe=["White PLA","Paper card","Orange PLA","Grey resin","Two-tone"].indexOf(Ot),C=["Green cutting mat","Grey cutting mat","Birch bench","Black slate"].indexOf(Ct),Z=["Clean","Dusty","Antique"].indexOf(qt),Te=["North window","Desk lamp","Overcast","Low sun"].indexOf(Bt),Ve=ct==="Low"?.72:ct==="Standard"?1.05:1.55,Le=(Ae==="Standard"?30:Ae==="Steep"?39:23)*Math.PI/180,pt=["Birch ply","Cork","Black anodised"].indexOf(Gt),jt=[1,.72,.8,.9,.86],L=.14,Wt=1.55,Kt=2.3,vt=.1,xt=Kt-vt,Tt=xt+vt/1.52,Yt=2.15,Qt=-9,Zt=5.6,je=xe===1?.014:xe===3?.05:.04,We=O<0?13.2:O>0?22.5:17,Jt=O<0?.8:O>0?1.3:1,Ke=[0,0,L+.5],bt=(t,a,o)=>[Ke[0]+o*Math.sin(a)*Math.cos(t),Ke[1]-o*Math.cos(a)*Math.cos(t),Ke[2]+o*Math.sin(t)],be=bt(Le,ze,We),Et=[be[0],2*Tt-be[1],be[2]];function $t(t){const a=i=>Math.sqrt(Math.max(0,1-i*i)),o=(i,c)=>{const f=Math.abs(i);return f<=1-c?1:1-c+Math.sqrt(Math.max(0,c*c-(f-(1-c))**2))},l=(i,c)=>{const f=1-c*(Math.SQRT2-1),h=Math.abs(i)*f;let E;return h<c/Math.SQRT2?E=1-c*Math.SQRT2+Math.sqrt(Math.max(0,c*c-h*h)):h>1-c/Math.SQRT2?E=Math.sqrt(Math.max(0,c*c-(h-(1-c*Math.SQRT2))**2)):E=1-h,E/f};if(t===0)return[a,i=>-a(i),i=>o(i,.07),i=>-o(i,.07)];if(t===1)return[i=>l(i,.14),i=>-l(i,.14),i=>o(i,.1),i=>-o(i,.1)];const r=i=>{const c=Math.abs(i),f=.866,h=1.732*(1-c),E=.05,A=Math.max(E-Math.abs(f-h),0)/E;return Math.min(f,h)-A*A*E*.25};if(t===3)return[r,i=>-r(i),a,i=>-a(i)];const n=i=>{const c=Math.min(1,Math.sqrt(i*i+4e-4));return Math.pow(Math.max(0,1-Math.pow(c,.8)),1.25)};if(t===4)return[a,i=>-a(i),n,i=>-n(i)];const s=1.85,u=(s*s+1)/2,b=(s-1)/2,v=i=>{const c=Math.sqrt(i*i+9e-4)-.03;return Math.sqrt(Math.max(0,u*u-(Math.min(1,c)+u-1)**2))};return[i=>v(i)-b,i=>-a(i)-b,i=>a(i)+b,i=>b-v(i)]}function Rt(t,a,o,l){const r=[a[0]-t[0],a[1]-t[1],a[2]-t[2]],n=[l[0]-o[0],l[1]-o[1],l[2]-o[2]],s=[t[0]-o[0],t[1]-o[1],t[2]-o[2]],u=(T,M)=>T[0]*M[0]+T[1]*M[1]+T[2]*M[2],b=u(r,r),v=u(r,n),i=u(n,n),c=u(r,s),f=u(n,s),h=b*i-v*v,E=(v*f-i*c)/h,A=(b*f-v*c)/h;return[.5*(t[0]+E*r[0]+o[0]+A*n[0]),.5*(t[1]+E*r[1]+o[1]+A*n[1]),.5*(t[2]+E*r[2]+o[2]+A*n[2])]}function e0(t){const[a,o,l,r]=$t(t),n=120,s=L+Ve*jt[t],u=[],b=f=>{const h=u[u.length-1];(!h||Math.hypot(f[0]-h[0],f[1]-h[1],f[2]-h[2])>1e-5)&&u.push(f)};for(let f=0;f<=n;f++){const h=-Math.cos(Math.PI*f/n);b(Rt(be,[h,a(h),s],Et,[h,l(h),s]))}for(let f=n;f>=0;f--){const h=-Math.cos(Math.PI*f/n);b(Rt(be,[h,o(h),s],Et,[h,r(h),s]))}const v=u[0],i=u[u.length-1];Math.hypot(v[0]-i[0],v[1]-i[1],v[2]-i[2])<1e-5&&u.pop();let c=0;for(let f=0;f<u.length;f++){const h=u[f],E=u[(f+1)%u.length];c+=h[0]*E[1]-E[0]*h[1]}return c<0&&u.reverse(),u}function t0(t){const a=e0(t),o=a.length,l=[],r=[],n=[],s=[];for(let m=0;m<o;m++){const y=a[m],p=a[(m+1)%o];let x=p[0]-y[0],R=p[1]-y[1];const g=Math.hypot(x,R)||1;x/=g,R/=g,n.push([x,R]),s.push([R,-x])}const u=[],b=[],v=[];for(let m=0;m<o;m++){const y=s[(m-1+o)%o],p=s[m];let x=y[0]+p[0],R=y[1]+p[1];const g=Math.hypot(x,R)||1;x/=g,R/=g;const I=Math.max(.35,x*p[0]+R*p[1]);u.push([x/I,R/I]);const N=y[0]*p[0]+y[1]*p[1]>.9;b.push(N?[x,R]:p),v.push(N?[x,R]:y)}const i=[0];for(let m=1;m<=o;m++){const y=a[m-1],p=a[m%o];i.push(i[m-1]+Math.hypot(p[0]-y[0],p[1]-y[1],p[2]-y[2]))}let c=9,f=0,h=0;for(const m of a)c=Math.min(c,m[2]),f=Math.max(f,m[2]),h=Math.max(h,Math.hypot(m[0],m[1]));let E=0,A=-9;for(let m=0;m<o;m++)Math.abs(a[m][0])<.05&&a[m][1]>A&&(A=a[m][1],E=i[m]);const T=je/2,M=(m,y,p,x,R,g,I,N,oe,re)=>(l.push(m,y,p,x,R,g,I,N,oe,re),l.length/10-1),me=(m,y,p,x)=>r.push(m,y,p,m,p,x);for(let m=0;m<o;m++){const y=(m+1)%o,p=a[m],x=a[y],R=u[m],g=u[y],I=b[m],N=v[y],oe=i[m],re=i[m+1];let Me=M(p[0]+R[0]*T,p[1]+R[1]*T,L,I[0],I[1],0,oe,0,0,p[2]),ye=M(p[0]+R[0]*T,p[1]+R[1]*T,p[2],I[0],I[1],0,oe,1,0,p[2]),we=M(x[0]+g[0]*T,x[1]+g[1]*T,x[2],N[0],N[1],0,re,1,0,x[2]),ge=M(x[0]+g[0]*T,x[1]+g[1]*T,L,N[0],N[1],0,re,0,0,x[2]);me(Me,ye,we,ge),Me=M(p[0]-R[0]*T,p[1]-R[1]*T,L,-I[0],-I[1],0,oe,0,1,p[2]),ye=M(p[0]-R[0]*T,p[1]-R[1]*T,p[2],-I[0],-I[1],0,oe,1,1,p[2]),we=M(x[0]-g[0]*T,x[1]-g[1]*T,x[2],-N[0],-N[1],0,re,1,1,x[2]),ge=M(x[0]-g[0]*T,x[1]-g[1]*T,L,-N[0],-N[1],0,re,0,1,x[2]),me(Me,ye,we,ge);const It=x[0]-p[0],Nt=x[1]-p[1],kt=x[2]-p[2],St=s[m][0],Xt=s[m][1];let ie=Xt*kt-0*Nt,se=0*It-St*kt,j=St*Nt-Xt*It;j<0&&(ie=-ie,se=-se,j=-j);const st=Math.hypot(ie,se,j)||1;ie/=st,se/=st,j/=st,Me=M(p[0]+R[0]*T,p[1]+R[1]*T,p[2],ie,se,j,oe,0,2,p[2]),ye=M(p[0]-R[0]*T,p[1]-R[1]*T,p[2],ie,se,j,oe,1,2,p[2]),we=M(x[0]-g[0]*T,x[1]-g[1]*T,x[2],ie,se,j,re,1,2,x[2]),ge=M(x[0]+g[0]*T,x[1]+g[1]*T,x[2],ie,se,j,re,0,2,x[2]),me(Me,ye,we,ge)}const Oe=new Float32Array(256*4);for(let m=0;m<Math.min(o,256);m++){const y=a[Math.floor(m*o/Math.min(o,256))];Oe[m*4]=y[0],Oe[m*4+1]=y[1],Oe[m*4+2]=y[2]}return{V:new Float32Array(l),I:new Uint16Array(r),poly:Oe,np:Math.min(o,256),seam:E,zmin:c,zmax:f,rmax:h,arcLen:i[o]}}const d=e.__c450||(e.__c450=a0(e));d.variant(Z,C);function a0(t){const a={meshes:new Map,targets:new Map,maps:new Map};t.getExtension("KHR_parallel_shader_compile");const o=`#version 300 es
void main(){ vec2 p = vec2(float((gl_VertexID<<1)&2), float(gl_VertexID&2)); gl_Position = vec4(p*2.-1., 0., 1.); }`,l=(i,c)=>{const f=t.createShader(i);return t.shaderSource(f,c),t.compileShader(f),f},r=v0(),n=(i,c,f)=>i.replace("__MK__",String(c)).replace("__MT__",String(f||0)),s=l(t.VERTEX_SHADER,o),u=l(t.VERTEX_SHADER,n(r.vso,0));a.compile=i=>{const c={};for(const f in i){const h=t.createProgram(),E=l(t.FRAGMENT_SHADER,i[f][1]);t.attachShader(h,i[f][0]),t.attachShader(h,E),c[f]={p:h,f:E,v:i[f][0]}}for(const f in c)t.linkProgram(c[f].p);t.flush();for(const f in c){const h=c[f].p;if(!t.getProgramParameter(h,t.LINK_STATUS))throw new Error("450 "+f+": "+t.getShaderInfoLog(c[f].v)+t.getShaderInfoLog(c[f].f)+t.getProgramInfoLog(h));const E=t.getUniformBlockIndex(h,"UB");E!==t.INVALID_INDEX&&t.uniformBlockBinding(h,E,0),t.useProgram(h);for(const[A,T]of[["uN",0],["uSM",1],["uSDF",2],["uImg",3],["uPoly",4],["uMT",5],["uTTx",6],["uLt",7],["uSMc",8]]){const M=t.getUniformLocation(h,A);M&&t.uniform1i(M,T)}a[f]=h,a[f+"Mode"]=t.getUniformLocation(h,"uMode"),a[f+"NP"]=t.getUniformLocation(h,"uNP"),a[f+"K"]=t.getUniformLocation(h,"uK")}},a.variant=(i,c,f)=>{const h=Object.assign({},f||{});a["bg"+i+c]||(h["bg"+i+c]=[s,n(r.bg,i,c)]),a["obj"+i]||(h["obj"+i]=[u,n(r.obj,i)]),Object.keys(h).length&&a.compile(h)},a.variant(Z,C,{bgl:[s,n(r.bgl,0)],tmat:[s,r.tmat],ttt:[s,r.ttt],shd:[u,n(r.shd,0)],bake:[s,n(r.bake,0)],comp:[s,n(r.comp,0)]}),a.vao=t.createVertexArray(),a.ubo=t.createBuffer(),t.bindBuffer(t.UNIFORM_BUFFER,a.ubo),t.bufferData(t.UNIFORM_BUFFER,140*4,t.DYNAMIC_DRAW);const b=new Uint8Array(256*256*4);let v=2654435769;for(let i=0;i<b.length;i++)v^=v<<13,v^=v>>>17,v^=v<<5,b[i]=v>>>0&255;a.noise=t.createTexture(),t.bindTexture(t.TEXTURE_2D,a.noise),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,b),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),a.smaps=new Map,a.smap=i=>{let c=a.smaps.get(i);if(c)return c;c={w:i,h:i/2,tex:t.createTexture(),fb:t.createFramebuffer()},t.bindTexture(t.TEXTURE_2D,c.tex),t.texImage2D(t.TEXTURE_2D,0,t.DEPTH_COMPONENT16,c.w,c.h,0,t.DEPTH_COMPONENT,t.UNSIGNED_SHORT,null);for(const[f,h]of[[t.TEXTURE_MIN_FILTER,t.NEAREST],[t.TEXTURE_MAG_FILTER,t.NEAREST],[t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE],[t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE]])t.texParameteri(t.TEXTURE_2D,f,h);return t.bindFramebuffer(t.FRAMEBUFFER,c.fb),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,c.tex,0),t.drawBuffers([t.NONE]),t.readBuffer(t.NONE),t.bindFramebuffer(t.FRAMEBUFFER,null),a.smaps.set(i,c),c},a.smCmp=t.createSampler();for(const[i,c]of[[t.TEXTURE_MIN_FILTER,t.LINEAR],[t.TEXTURE_MAG_FILTER,t.LINEAR],[t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE],[t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE],[t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE],[t.TEXTURE_COMPARE_FUNC,t.LEQUAL]])t.samplerParameteri(a.smCmp,i,c);return a.polyTex=t.createTexture(),t.bindTexture(t.TEXTURE_2D,a.polyTex),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,256,1,0,t.RGBA,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),a.bakeFb=t.createFramebuffer(),a.samples=Math.min(4,t.getParameter(t.MAX_SAMPLES)||0),t.bindFramebuffer(t.FRAMEBUFFER,null),a}function o0(t){let a=d.targets.get(t);if(a)return a;a={};const o=t>600?Math.min(2,d.samples):d.samples;a.rbC=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.rbC),o>1?e.renderbufferStorageMultisample(e.RENDERBUFFER,o,e.RGBA8,t,t):e.renderbufferStorage(e.RENDERBUFFER,e.RGBA8,t,t),a.rbD=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.rbD),o>1?e.renderbufferStorageMultisample(e.RENDERBUFFER,o,e.DEPTH_COMPONENT16,t,t):e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT16,t,t),a.fbMS=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,a.fbMS),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,a.rbC),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,a.rbD),a.tex=e.createTexture(),e.bindTexture(e.TEXTURE_2D,a.tex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,t,0,e.RGBA,e.UNSIGNED_BYTE,null);for(const[l,r]of[[e.TEXTURE_MIN_FILTER,e.LINEAR],[e.TEXTURE_MAG_FILTER,e.LINEAR],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,l,r);return a.fbR=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,a.fbR),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a.tex,0),a.lt=e.createTexture(),e.bindTexture(e.TEXTURE_2D,a.lt),e.texStorage2D(e.TEXTURE_2D,1,e.RG32UI,t,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),a.fbL=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,a.fbL),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a.lt,0),e.bindFramebuffer(e.FRAMEBUFFER,null),d.targets.set(t,a),a}function Ye(t){const a=t+"|"+Ve+"|"+Le+"|"+ze+"|"+je+"|"+We,o=d.tick=(d.tick||0)+1;let l=d.meshes.get(a);if(l)return l.use=o,l;const r=t0(t);l={seam:r.seam,zmin:r.zmin,zmax:r.zmax,rmax:r.rmax,count:r.I.length},l.vao=e.createVertexArray(),e.bindVertexArray(l.vao),l.vb=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,l.vb),e.bufferData(e.ARRAY_BUFFER,r.V,e.STATIC_DRAW),l.ib=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,l.ib),e.bufferData(e.ELEMENT_ARRAY_BUFFER,r.I,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,40,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,40,12),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,4,e.FLOAT,!1,40,24),e.bindVertexArray(null),l.sdf=e.createTexture(),e.bindTexture(e.TEXTURE_2D,l.sdf),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,192,192,0,e.RGBA,e.UNSIGNED_BYTE,null);for(const[n,s]of[[e.TEXTURE_MIN_FILTER,e.LINEAR],[e.TEXTURE_MAG_FILTER,e.LINEAR],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,n,s);if(e.bindTexture(e.TEXTURE_2D,d.polyTex),e.texSubImage2D(e.TEXTURE_2D,0,0,0,256,1,e.RGBA,e.FLOAT,r.poly),e.bindFramebuffer(e.FRAMEBUFFER,d.bakeFb),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,l.sdf,0),e.viewport(0,0,192,192),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.useProgram(d.bake),e.uniform1i(d.bakeNP,r.np),e.bindBufferBase(e.UNIFORM_BUFFER,0,d.ubo),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,d.polyTex),e.bindVertexArray(d.vao),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),l.use=o,l.gone=!1,d.meshes.set(a,l),d.meshes.size>8){const n=s=>{const u=d.meshes.get(s);e.deleteVertexArray(u.vao),e.deleteBuffer(u.vb),e.deleteBuffer(u.ib),e.deleteTexture(u.sdf),u.gone=!0,d.meshes.delete(s)};for(const[s,u]of d.meshes)d.meshes.size>8&&s!==a&&o-u.use>64&&n(s);for(;d.meshes.size>32;){let s=null,u=1/0;for(const[b,v]of d.meshes)b!==a&&v.use<u&&(u=v.use,s=b);n(s)}}return l}function Mt(t,a,o,l,r){const n=t+r;let s=d.maps.get(n);if(s)return s;s=e.createTexture(),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,s),e.texStorage2D(e.TEXTURE_2D,Math.log2(o)+1,l,o,o);const u=t==="m"?e.MIRRORED_REPEAT:e.CLAMP_TO_EDGE;for(const[b,v]of[[e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR],[e.TEXTURE_MAG_FILTER,e.LINEAR],[e.TEXTURE_WRAP_S,u],[e.TEXTURE_WRAP_T,u]])e.texParameteri(e.TEXTURE_2D,b,v);return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,d.bakeFb),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),e.viewport(0,0,o,o),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.useProgram(d[a]),e.uniform1f(d[a+"K"],r),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d.noise),e.bindVertexArray(d.vao),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,s),e.generateMipmap(e.TEXTURE_2D),d.maps.set(n,s),s}const J=o0(S),$=d.smap(_.tile?1024:2048),r0=Mt("m","tmat",1024,e.RG8,C),i0=Mt("t","ttt",512,e.RGBA8,pt);let P=Ye(ce);const U=[{az:212,el:30,col:[.93,.98,1.06],I:3.1,soft:.08,amb:[.06,.05,.041],ex:1.05,win:14},{az:302,el:50,col:[1.14,.84,.56],I:4.4,soft:.05,amb:[.016,.013,.011],ex:1,win:14},{az:225,el:64,col:[.95,.98,1.03],I:1.35,soft:.6,amb:[.3,.305,.315],ex:1,win:14},{az:222,el:17,col:[1.22,.88,.58],I:3.9,soft:.012,amb:[.062,.078,.118],ex:.95,win:-37}][Te],yt=U.az*Math.PI/180+(ue()-.5)*.12,Qe=U.el*Math.PI/180,fe=[Math.cos(yt)*Math.cos(Qe),Math.sin(yt)*Math.cos(Qe),Math.sin(Qe)],Pe=[[.84,.82,.77],[.87,.8,.65],[.86,.3,.06],[.3,.31,.32],[.82,.81,.78]][xe],Ze=xe===4?[.62,.06,.05]:Pe,wt=(ue()-.5)*.09,s0=.55+ue()*.25,n0=Z,c0=ue()*50,gt=wt+(C===3?.4:0),Ue=[Math.cos(gt),Math.sin(gt),C<2?-1.3:0,C<2?-.4:0];let k=Vt,D=0,Ee=0,q="rest",ee=0,De=0,Ie=0,Ft=1,At=0,z=0,Je=0,Ne=0,B=0,G=0,H=0,le=0,he=0,te=1,$e=1,et=1,V=-1,_t=1,tt=5+9*Q(),w=null,at=0,de=0,ke=0,Se=0,Xe=0,ot=1,rt=6.5+3*X();const ae=new Float32Array(140);function zt(t,a,o){let l=a[0]-t[0],r=a[1]-t[1],n=a[2]-t[2],s=Math.hypot(l,r,n);l/=s,r/=s,n/=s;let u=r*o[2]-n*o[1],b=n*o[0]-l*o[2],v=l*o[1]-r*o[0];s=Math.hypot(u,b,v),u/=s,b/=s,v/=s;const i=b*n-v*r,c=v*l-u*n,f=u*r-b*l;return{f:[l,r,n],r:[u,b,v],u:[i,c,f]}}function f0(t,a,o,l,r,n){const s=1/l,u=1/(r-n),b=-(o.r[0]*a[0]+o.r[1]*a[1]+o.r[2]*a[2]),v=-(o.u[0]*a[0]+o.u[1]*a[1]+o.u[2]*a[2]),i=o.f[0]*a[0]+o.f[1]*a[1]+o.f[2]*a[2],c=[o.r[0],o.u[0],-o.f[0],0,o.r[1],o.u[1],-o.f[1],0,o.r[2],o.u[2],-o.f[2],0,b,v,i,1],f=[s,0,0,0,0,s,0,0,0,0,(n+r)*u,-1,0,0,2*n*r*u,0];Lt(ae,t,f,c)}function l0(t,a,o,l,r,n){const s=-(o.r[0]*a[0]+o.r[1]*a[1]+o.r[2]*a[2]),u=-(o.u[0]*a[0]+o.u[1]*a[1]+o.u[2]*a[2]),b=o.f[0]*a[0]+o.f[1]*a[1]+o.f[2]*a[2],v=[o.r[0],o.u[0],-o.f[0],0,o.r[1],o.u[1],-o.f[1],0,o.r[2],o.u[2],-o.f[2],0,s,u,b,1],i=[1/l,0,0,0,0,1/l,0,0,0,0,-2/(n-r),0,0,0,-(n+r)/(n-r),1];Lt(ae,t,i,v)}function Lt(t,a,o,l){for(let r=0;r<4;r++)for(let n=0;n<4;n++){let s=0;for(let u=0;u<4;u++)s+=o[u*4+n]*l[r*4+u];t[a+r*4+n]=s}}const F=(t,a,o,l,r)=>{ae[t]=a,ae[t+1]=o,ae[t+2]=l,ae[t+3]=r};function u0(t){const a=Le+z*(1.05-Le),o=ze+z*.42,l=We*(1-.12*z),r=bt(a,o,l),n=[(.38+1.2*Math.sin(ze))*(1-z)+.1*z,1.5+.2*z+(O>0?.5:O<0?-.25:0)*(1-z),L+.6+.25*z+(O>0?.55:0)*(1-z)],s=zt(r,n,[0,0,1]),u=Math.hypot(n[0]-r[0],n[1]-r[1],n[2]-r[2]),b=(2.8*Jt+.6*z)/u;f0(0,r,s,b,2,60);const v=[0,0,L+.7+H];for(let T=0;T<2;T++){const M=T===0?fe:[fe[0],-fe[1],fe[2]],me=[v[0]+M[0]*9,v[1]+M[1]*9,v[2]+M[2]*9];l0(16+T*16,me,zt(me,v,Math.abs(M[2])>.95?[0,1,0]:[0,0,1]),2.3,1,17)}const i=k-Ee,c=Math.cos(i),f=Math.sin(i),h=Math.cos(le),E=Math.sin(le),A=[c,f*h,f*E,0,-f,c*h,c*E,0,0,-E,h,0,0,0,0,1];A[12]=-(A[8]*L)+0,A[13]=-(A[9]*L),A[14]=L-A[10]*L+H;for(let T=0;T<16;T++)ae[48+T]=A[T];F(64,r[0],r[1],r[2],b),F(68,s.r[0],s.r[1],s.r[2],0),F(72,s.u[0],s.u[1],s.u[2],0),F(76,s.f[0],s.f[1],s.f[2],Math.hypot(r[0],r[1]+.1,r[2]-L-.6)),F(80,fe[0],fe[1],fe[2],U.soft*(1+2.2*(1-te))),F(84,U.col[0]*U.I*te,U.col[1]*U.I*te,U.col[2]*U.I*te,Z===2?.72:.86),F(88,U.amb[0],U.amb[1],U.amb[2],U.ex),F(92,Tt,xt,Yt,Zt),F(96,Qt,.2,.1,n0),F(100,k,L,Wt,pt),F(104,Pe[0],Pe[1],Pe[2],xe),F(108,Ze[0],Ze[1],Ze[2],je),F(112,H,i,P.seam,z),F(116,C,wt,t,s0),F(120,S,1/S,c0+(_.input.inside,0),Ve),F(124,2,2,8,16),F(128,P.zmin,P.zmax,ce,P.rmax+.06),F(132,Ue[0],Ue[1],Ue[2],Ue[3]),F(136,-5,C<2?-3.6:-99,Te,U.win)}const Pt={};function Ut(t){P.gone?P=Ye(ce):P.use=d.tick=d.tick+1,u0(t);const a=te.toFixed(4)+","+k.toFixed(5)+","+Ee.toFixed(5)+","+H.toFixed(4)+","+le.toFixed(5)+","+z.toFixed(5)+","+ce,o=d.owner===Pt&&J.key===a;d.owner=Pt,J.key=a,e.bindBuffer(e.UNIFORM_BUFFER,d.ubo),e.bufferSubData(e.UNIFORM_BUFFER,0,ae),e.bindBufferBase(e.UNIFORM_BUFFER,0,d.ubo),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d.noise),o||h0(),d0()}function h0(){e.bindFramebuffer(e.FRAMEBUFFER,$.fb),e.viewport(0,0,$.w,$.h),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.useProgram(d.shd),e.bindVertexArray(P.vao);for(let t=0;t<2;t++)e.viewport(t*$.h,0,$.h,$.h),e.uniform1i(d.shdMode,3+t),e.drawElements(e.TRIANGLES,P.count,e.UNSIGNED_SHORT,0);e.flush(),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,$.tex),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,$.tex),e.bindSampler(8,d.smCmp),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,P.sdf),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,r0),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,i0),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,null),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.bindFramebuffer(e.FRAMEBUFFER,J.fbL),e.viewport(0,0,S,S),e.useProgram(d.bgl),e.bindVertexArray(d.vao),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,J.lt),e.bindFramebuffer(e.FRAMEBUFFER,J.fbMS),e.useProgram(d["bg"+Z+C]),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(d["obj"+Z]),e.bindVertexArray(P.vao),e.enable(e.DEPTH_TEST),e.depthMask(!0),e.clear(e.DEPTH_BUFFER_BIT),e.uniform1i(d["obj"+Z+"Mode"],1),e.drawElements(e.TRIANGLES,P.count,e.UNSIGNED_SHORT,0),e.clear(e.DEPTH_BUFFER_BIT),e.uniform1i(d["obj"+Z+"Mode"],0),e.drawElements(e.TRIANGLES,P.count,e.UNSIGNED_SHORT,0),e.bindVertexArray(null),e.bindFramebuffer(e.READ_FRAMEBUFFER,J.fbMS),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,J.fbR),e.blitFramebuffer(0,0,S,S,0,0,S,S,e.COLOR_BUFFER_BIT,e.NEAREST),e.bindSampler(8,null),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.flush()}function d0(){e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,S,S),e.disable(e.DEPTH_TEST),e.depthMask(!0),e.disable(e.BLEND),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,J.tex),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d.noise),e.useProgram(d.comp),e.bindVertexArray(d.vao),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}const Re=_.sound,Dt=new Float32Array(400);function m0(t,a){if(Se+=(Math.min(1,Math.abs(a)*.9)-Se)*Math.min(1,t*6),!Re.on||Se<.02)return;const o=Math.min(400,Math.round(t*8e3));for(let l=0;l<o;l++){Xe+=2*Math.PI*(52+30*Math.abs(a))/8e3,ot=ot*1103515245+12345&2147483647;const r=ot/2147483647-.5;Dt[l]=Se*(.22*Math.sin(Xe)+.08*Math.sin(Xe*3.01)+.12*r*(.6+.4*Math.sin(Xe*.25)))}Re.pcm(Dt.subarray(0,o),8e3,{vel:.35})}function p0(t){ke+=t;const a=_.input;if(a.taps(),a.down&&a.inside){if(w||(w={t:ke,x:a.x,y:a.y,moved:!1,held:!1},at=a.x,de=0),!w.moved&&Math.hypot(a.x-w.x,a.y-w.y)>.025&&(w.moved=!0),!w.moved&&ke-w.t>.3&&(w.held=!0),w.moved&&!w.held){const r=(a.x-at)*Math.PI*1.6;at=a.x;const n=r/Math.max(t,.001);de+=(n-de)*Math.min(1,t*14),k+=r,D=de,q="hand",ee=0}Ne=w.held?1:0}else w&&(!w.moved&&!w.held&&ke-w.t<.32&&B===0&&(B=1,G=0,Re.hit("noise",.25,{cutoff:900,dur:.12})),w.moved&&!w.held&&(q="coast",ee=0,D=Math.max(-16,Math.min(16,de))),w=null,Ne=0);if(ee+=t,q==="coast"){const r=.5+.75*Math.abs(D),n=Math.sign(D);D-=n*r*t,Math.sign(D)!==n&&(D=0),k+=D*t,D===0&&(q="rest",ee=0)}else if(q==="rest"){if(D=0,ee>rt){const r=X(),n=(k-Ee)/Math.PI,s=Math.abs(n-Math.round(n))<.02;De=k,At=r>.9?Math.ceil(n-.001)-1:Math.floor(n+.001)+(r>.55&&r<.7?2:1),Ie=Ee+At*Math.PI,rt=2.5+9*X()*X(),r>=.7&&r<=.9&&s&&(Ie=k+Math.PI*(.34+.24*X()),rt=1.4+2*X()),Ft=1.2+(2.1+2.4*X())*Math.abs(Ie-De)/Math.PI,q="motor",ee=0}}else if(q==="motor"){const r=Math.min(1,ee/Ft),n=r*r*r*(r*(r*6-15)+10),s=k;k=De+(Ie-De)*n,D=(k-s)/Math.max(t,.001),r>=1&&(q="rest",ee=0,D=0)}if(m0(t,q==="hand"?de:D),Te!==1)if(V<0)tt-=t,tt<=0&&($e=te,et=te<.97?1:(Te===2?.8:Te===3?.42:.6)+.18*Q(),_t=2.2+4.5*Q(),V=0);else{V=Math.min(1,V+t/_t);const r=V*V*(3-2*V);te=$e+(et-$e)*r,V>=1&&(V=-1,tt=et<1?2.5+7*Q():6+16*Q()*Q())}Ne=w&&w.held?1:0;const o=7,l=(Ne-z)*o*o-2*o*Je;if(Je+=l*t,z+=Je*t,z=Math.max(-.05,Math.min(1.05,z)),B)if(G+=t,B===1){const r=Math.min(1,G/.45);H=3.5*Math.pow(r,2.2),r>=1&&(ce=(ce+1)%5,P=Ye(ce),Ee=k,B=2,G=0)}else if(B===2){const r=Math.min(1,G/.55);H=.33+3.17*(1-r)*(1-r)*(1-r),G>.62&&(B=3,G=0)}else B===3&&(H=Math.max(0,.33-163*G*G),H<=0&&(H=0,B=0,he=.8,Re.hit("click",.7),Re.hit("kick",.25)));he+=(-le*900-he*30)*t,le+=he*t,Math.abs(le)<1e-5&&Math.abs(he)<1e-4&&(le=0,he=0)}Ut(0);let it=0;return(t,a)=>{for(a=Math.min(.1,Math.max(0,a||0)),it+=a;it>1/120;)p0(1/120),it-=1/120;Ut(t)};function v0(){const t=`#version 300 es
#define MIRK __MK__
#define MATK __MT__
precision highp float;
precision highp sampler2D;
precision highp int;
layout(std140) uniform UB {
  mat4 uVP; mat4 uLVP; mat4 uLVP2; mat4 uModel;
  vec4 uCam; vec4 uRight; vec4 uUp; vec4 uFwd;
  vec4 uL; vec4 uLc; vec4 uAmb; vec4 uMir; vec4 uMir2; vec4 uTT;
  vec4 uObj; vec4 uObj2; vec4 uObjP; vec4 uMat; vec4 uRes; vec4 uFoot; vec4 uMisc; vec4 uX; vec4 uY;
};
`,a=`
Hit trace(vec3 ro, vec3 rd){
  Hit h; h.t = 1e4; h.id = 0; h.n = vec3(0., -1., 0.); h.e = 1.;
  // the wall behind the glass; for rays coming back off the silver, the dark room behind the lens
  if (rd.y > 0.) { float t = (uMir.x + 9. - ro.y)/rd.y; if (t > 0.) { h.t = t; h.id = 7; } }
  else {
    // the room behind the lens: its floor 75 cm down (h.e = 0) and the far wall 2.2 m off
    h.t = (-75. - ro.y)/min(rd.y, -1e-4); h.id = 9; h.n = vec3(0., 0., -1.);
    if (rd.z < 0.) { float tf = (-25. - ro.z)/rd.z; if (tf < h.t) { h.t = tf; h.e = 0.; h.n = vec3(0., 0., 1.); } }
  }
  if (rd.z < 0.) {
    float t = -ro.z/rd.z; vec3 p = ro + rd*t;
    if (p.y < uMir.x + 9. && p.y > uY.x) {
      vec2 q = matQ(p.xy);
      if (uMat.x > 1.5 || (q.x > -9.5 && q.x < 9. && q.y > uY.y && q.y < 14.)) { if (t < h.t) { h.t = t; h.id = 1; h.n = vec3(0., 0., 1.); } }
      else { t = (-0.1 - ro.z)/rd.z; if (t < h.t) { h.t = t; h.id = 2; h.n = vec3(0., 0., 1.); } }
    }
    float tt = (uTT.y - ro.z)/rd.z; vec3 pt = ro + rd*tt;
    if (tt > 0. && dot(pt.xy, pt.xy) < uTT.z*uTT.z && tt < h.t) { h.t = tt; h.id = 3; h.n = vec3(0., 0., 1.); }
  }
  // the turntable's edge and the motor housing under it
  for (int k = 0; k < 2; k++) {
    float R = k == 0 ? uTT.z : uTT.z*0.62, z0 = k == 0 ? 0.05 : 0., z1 = k == 0 ? uTT.y : 0.05;
    float a = dot(rd.xy, rd.xy), b = dot(ro.xy, rd.xy), cc = dot(ro.xy, ro.xy) - R*R, disc = b*b - a*cc;
    if (disc > 0.) {
      float t = (-b - sqrt(disc))/a; vec3 p = ro + rd*t;
      if (t > 0. && p.z > z0 && p.z < z1 && t < h.t) { h.t = t; h.id = 4 + k; h.n = vec3(normalize(p.xy), 0.); }
    }
  }
  // the mirror's frame: bottom rail, the stile at its end, and the foot the stile stands on
  vec3 inv = 1./(rd + vec3(1e-7));
  for (int k = 0; k < 3; k++) {
    vec3 lo = k == 0 ? vec3(uMir2.x, uMir.y - 0.13, 0.) : k == 1 ? vec3(uMir.z - 0.08, uMir.y - 0.13, 0.) : vec3(uMir.z - 0.14, uMir.y - 1.25, 0.035);
    vec3 hi = k == 0 ? vec3(uMir.z, uMir.y + 0.3, 0.21) : k == 1 ? vec3(uMir.z + 0.25, uMir.y + 0.3, uMir.w + 0.3) : vec3(uMir.z + 0.31, uMir.y + 1.3, 0.15);
    vec3 t0 = (lo - ro)*inv, t1 = (hi - ro)*inv;
    vec3 tn = min(t0, t1), tf = max(t0, t1);
    float a = max(max(tn.x, tn.y), tn.z), b = min(min(tf.x, tf.y), tf.z);
    vec3 pa = ro + rd*a;
    if (k == 2) { vec2 fc = vec2(uMir.z + 0.085, clamp(pa.y, uMir.y - 1.025, uMir.y + 1.075)); if (length(pa.xy - fc) > 0.222) a = 1e9; }
    if (a < b && a > 0. && a < h.t) {
      vec3 n = tn.x >= a ? vec3(rd.x > 0. ? -1. : 1., 0., 0.) : tn.y >= a ? vec3(0., rd.y > 0. ? -1. : 1., 0.) : vec3(0., 0., rd.z > 0. ? -1. : 1.);
      vec3 p = ro + rd*a, d = min(p - lo, hi - p) + abs(n)*9.;
      h.t = a; h.id = 6; h.n = n; h.e = min(d.x, min(d.y, d.z));
    }
  }
  return h;
}
`,o=`
uniform sampler2D uN;
uniform sampler2D uSM;
uniform sampler2D uSDF;
uniform highp sampler2DShadow uSMc;
const float PI = 3.14159265;
const vec2 PD[16] = vec2[16](vec2(-0.613,0.617),vec2(0.170,-0.040),vec2(-0.299,0.791),vec2(0.645,0.493),vec2(-0.651,0.718),
  vec2(0.421,0.027),vec2(-0.817,-0.271),vec2(-0.705,-0.668),vec2(0.977,-0.108),vec2(0.063,-0.991),vec2(0.198,0.734),
  vec2(-0.168,-0.505),vec2(0.528,-0.659),vec2(-0.434,-0.085),vec2(0.858,0.420),vec2(-0.073,0.247));
float ign(){ return fract(52.9829189*fract(dot(gl_FragCoord.xy, vec2(0.06711056,0.00583715)))); }
// value noise from the texture: uv in texels, fp = texels per pixel
float nz(vec2 uv, float fp){ return textureLod(uN, uv/256., log2(max(fp,1.))).r; }
float nz2(vec2 uv, float fp){ return textureLod(uN, uv/256., log2(max(fp,1.))).g; }
float lineCov(float d, float w, float f){ f = max(f, 1e-4); return smoothstep(0.5*(w+f), 0.5*(w-f), d)*min(1., w/f); }
mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
vec3 tonemap(vec3 x){ x *= uAmb.w; x = x*(2.51*x+0.03)/(x*(2.43*x+0.59)+0.14); return pow(clamp(x,0.,1.), vec3(1./2.2)); }
vec3 lightDir(int li){ return li==0 ? uL.xyz : vec3(uL.x, -uL.y, uL.z); }
float shadowAt(vec3 p, vec3 n, int li){
  vec3 L = lightDir(li);
  vec3 q = p + n + L*0.006;
  vec4 lp = (li==0 ? uLVP : uLVP2)*vec4(q,1.);
  vec3 s = lp.xyz*0.5+0.5;
  float res = 1.;
  float zt = uMisc.y + uObjP.x + 0.05;
  float tm = max(zt - p.z, 0.)/max(L.z, 0.05);
  vec2 pa = p.xy, ld = L.xy*tm;
  float hh = clamp(-dot(pa, ld)/max(dot(ld, ld), 1e-6), 0., 1.);
  bool near = length(pa + ld*hh) < uMisc.w;
  if (near && s.x > 0.002 && s.x < 0.998 && s.y > 0.002 && s.y < 0.998 && s.z < 1.) {
    float ox = float(li)*0.5;
    // blocker search on a fixed pattern, so the penumbra's width changes smoothly from pixel to pixel
    float bs = 0., bn = 0.;
    for (int i = 0; i < int(uFoot.z); i++) {
      vec2 u = clamp(s.xy+PD[i]*0.03, 0.001, 0.999);
      float d = textureLod(uSM, vec2(ox + u.x*0.5, u.y), 0.).r;
      if (d < s.z - 0.0007) { bs += d; bn += 1.; }
    }
    if (bn > 0.5) {
      float dz = (s.z - bs/bn)*16.;
      float r = clamp(dz*uL.w/4.6, 0.0011, 0.045);
      // filtered taps (hardware compare, bilinear) on a pattern turned per pixel: a fine even ramp, not a dot screen
      mat2 R = rot(ign()*6.2832);
      float lit = 0.;
      for (int i = 0; i < int(uFoot.w); i++) {
        vec2 u = clamp(s.xy+R*PD[i]*r, 0.001, 0.999);
        lit += textureLod(uSMc, vec3(ox + u.x*0.5, u.y, s.z - 0.0006), 0.);
      }
      res = lit/uFoot.w;
    }
  }
  return res;
}
// light from the window's image in the glass: reaches points in front of the mirror through its rectangle
float mirrorVis(vec3 p, vec3 Lm){
  if (p.y > uMir.y - 0.002 || Lm.y <= 0.) return 0.;
  float t = (uMir.x - p.y)/Lm.y; vec3 h = p + Lm*t;
  float w = 0.03 + t*uL.w*0.5;
  return smoothstep(uMir2.x, uMir2.x + w, h.x)*(1. - smoothstep(uMir.z - w, uMir.z + w, h.x))
       *smoothstep(-w*0.3, w*0.6, h.z)*(1. - smoothstep(uMir.w - w, uMir.w + w, h.z));
}
// the glass shades what stands behind it
float directVis(vec3 p, vec3 L){
  if (p.y < uMir.y || L.y >= 0.) return 1.;
  float t = (uMir.y - p.y)/L.y; vec3 h = p + L*t;
  float w = 0.02 + t*uL.w*0.5;
  float inR = smoothstep(uMir2.x - w, uMir2.x + w, h.x)*(1. - smoothstep(uMir.z - w, uMir.z + w, h.x))*(1. - smoothstep(uMir.w - w, uMir.w + w, h.z));
  return 1. - inR*0.9;
}
// the turntable's own shadow on the mat
float ttShadow(vec3 p, vec3 L){
  if (p.z > 0.02) return 1.;
  vec2 a = p.xy + L.xy*(uTT.y/L.z), b = p.xy + L.xy*(0.5*uTT.y/L.z);
  float d = min(length(a), length(b)) - uTT.z;
  float w = 0.01 + uTT.y/L.z*uL.w*0.5;
  return smoothstep(-w, w, d);
}
// the ring's occlusion of the floor (mat or turntable top), from the baked distance field
float objAO(vec3 p, float floorZ){
  vec2 q = rot(-uObjP.y)*p.xy;
  vec2 uv = q/4.8 + 0.5;
  float ao = 1.;
  if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) {
    vec4 s = textureLod(uSDF, uv, 0.);
    float e = (s.r - 0.5)*2.; float sd = sign(e)*e*e*2.4;
    float h = max(s.g*3. + (0.14 - floorZ), 0.05);
    float d = abs(sd);
    float lifted = 1. - smoothstep(0., 0.8, uObjP.x);
    if (sd > 0.) {
      float df = max(1.9 - d, 0.05);
      float rr = d*df;
      ao = mix(1., rr/(rr + h*h*0.85), lifted);
    } else {
      ao = 1. - lifted*0.42*(1. - d/sqrt(d*d + h*h));
    }
    ao *= 1. - lifted*0.45*exp(-d/0.03);
  }
  return ao;
}
// dust, smudges and old silver on the glass at point g (on the front face)
vec3 glassAdd(vec3 g, float fp){
  vec2 u = g.xz;
  float lum = dot(uLc.rgb, vec3(0.33));
#if MIRK == 0
  // clean glass: a rare speck, a breath of film
  return vec3(0.9, 0.92, 0.95)*lum*(smoothstep(0.993, 1., nz(u*120. + 37., fp*120.))*(1. - smoothstep(1.2, 3., fp*120.))*0.16 + 0.0015);
#else
  float k = float(MIRK);
  // dust lies thickest along the bottom rail and in the lower corners; a cloth's arc wiped it clean, with a smear
  // where the stroke ended
  float bot = u.y - 0.21, gather = 0.3 + 1.3*exp(-bot/0.45) + 0.9*exp(-(uMir.z - 0.08 - u.x)/0.5)*exp(-bot/1.1);
  float wipe = smoothstep(0.42, 0.3, abs(length(u - vec2(-1.5, 6.5)) - 4.3));
  float dust = k == 1. ? gather*(1. - 0.88*wipe) : 0.25*gather;
  float sp = smoothstep(1. - 0.03*dust, 1., nz(u*120. + 37., fp*120.))*(1. - smoothstep(1.2, 3., fp*120.));
  vec2 e = u - vec2(1.6, 3.85);
  float haze = (k == 1. ? 0.006*dust + 0.02*exp(-dot(e, e)/0.02) : 0.0015);
  return vec3(0.9, 0.92, 0.95)*lum*(sp*0.16 + haze);
#endif
}
float silverAt(vec3 g, float fp){
  float r = 1.;
#if MIRK == 2
  {
    vec2 u = g.xz;
    float edge = max(max(exp(-(uMir.z - 0.08 - g.x)/0.4), exp(-(g.z - 0.21)/0.22)), exp(-(uMir.w - g.z)/0.4));
    float f = nz(u*28. + 71., fp*28.), t = nz(u*vec2(9., 4.) + 11., fp*9.);
    float m = smoothstep(0.93 - 0.28*edge, 0.97 - 0.28*edge, f*0.75 + t*0.25 + 0.1*edge);
    r = 1. - 0.85*m;
  }
#endif
  return r;
}
vec3 silverTint(){ return MIRK == 2 ? vec3(0.98, 0.9, 0.76) : vec3(0.92, 0.96, 0.93); }
// the window is near: its light falls off across the table; the lamp throws a pool that falls to dark in the frame
float winFall(vec3 p){
  if (uY.z == 1.) { vec3 lp = uL.xyz*14. - p; float c = dot(normalize(lp), uL.xyz); return smoothstep(0.92, 0.996, c)*196./dot(lp, lp)*1.3; }
  return clamp(1. + 0.17*dot(p.xy, normalize(uL.xy)), 0.4, 1.7);
}
// the window wall out of frame on the left (x = -45, 1.35 m off): tall small-paned windows (panes 3 x 4 units in bars
// 0.25 wide) from 15 cm above the room's floor (z -20); the wall ends at y = uY.w (for the low sun its edge crosses
// the table). Light reaching p from direction L passes through it here, or is stopped by a bar.
float winMask(vec3 p, vec3 L){
  if (uY.z == 1.) return 1.;
  float s = (-45. - p.x)/min(L.x, -0.05);
  vec2 w = p.yz + L.yz*s;
  float b = 0.06 + s*uL.w*0.18;
  float rect = smoothstep(-20. - b, -20. + b, w.y)*(1. - smoothstep(uY.w - b, uY.w + b, w.x));
  vec2 c = abs(fract(w/vec2(3., 4.) + 0.5) - 0.5)*vec2(3., 4.);
  float bars = smoothstep(0.125 - b, 0.125 + b, c.x)*smoothstep(0.125 - b, 0.125 + b, c.y);
  return rect*mix(bars, 0.86, smoothstep(0.4, 1.6, b));
}
// the lens blur reaches only what is well off the focus: the object, its reflection and the frame stay sharp
float cocOf(float d){ return clamp((abs(1. - uFwd.w/d) - 0.24)*uMat.w*2.2, 0., 1.); }
`,l=t+`
layout(location=0) in vec3 aP; layout(location=1) in vec3 aN; layout(location=2) in vec4 aA;
uniform int uMode;
out vec3 vP; out vec3 vN; out vec4 vA; out vec3 vL;
void main(){
  vec4 w = uModel*vec4(aP, 1.);
  vP = w.xyz; vN = mat3(uModel)*aN; vA = aA; vL = aP;
  vec3 q = w.xyz;
  if (uMode == 1) q.y = 2.*uMir.x - q.y;
  if (uMode >= 3) gl_Position = (uMode == 3 ? uLVP : uLVP2)*w;
  else gl_Position = uVP*vec4(q, 1.);
}`,r=t+`
out vec4 o;
void main(){ o = vec4(1.); }`,n=t+`
uniform highp sampler2D uPoly; uniform int uNP;
out vec4 o;
void main(){
  vec2 q = (gl_FragCoord.xy/192. - 0.5)*4.8;
  float dmin = 1e9, zt = 0.; bool inside = false;
  for (int i = 0; i < 256; i++) {
    if (i >= uNP) break;
    vec4 a = texelFetch(uPoly, ivec2(i, 0), 0), b = texelFetch(uPoly, ivec2((i + 1) % uNP, 0), 0);
    vec2 pa = q - a.xy, ba = b.xy - a.xy;
    float h = clamp(dot(pa, ba)/max(dot(ba, ba), 1e-9), 0., 1.);
    float d = length(pa - ba*h);
    if (d < dmin) { dmin = d; zt = mix(a.z, b.z, h); }
    if ((a.y > q.y) != (b.y > q.y)) { float x = a.x + (q.y - a.y)*(b.x - a.x)/(b.y - a.y); if (q.x < x) inside = !inside; }
  }
  float sd = inside ? dmin : -dmin;
  o = vec4(0.5 + 0.5*sign(sd)*sqrt(min(abs(sd), 2.4)/2.4), clamp((zt - 0.14)/3., 0., 1.), 0., 1.);
}`,s=t+o+`
uniform sampler2D uMT;
uniform sampler2D uTTx;
uniform highp usampler2D uLt;
out vec4 o;
struct Hit { float t; int id; vec3 n; float e; };
vec2 matQ(vec2 p){ vec2 d = p - uX.zw; return vec2(uX.x*d.x - uX.y*d.y, uX.y*d.x + uX.x*d.y); }
${a}vec3 shade(Hit h, vec3 ro, vec3 rd, float pathT, float pixA){
  vec3 p = ro + rd*h.t, n = h.n, V = -rd;
  float fp = pathT*pixA/max(abs(dot(rd, n)), 0.2);
  vec3 alb = vec3(0.5); float rough = 0.7, spa = 0.03, ao = 1.;
  float r = length(p.xy);
  float aoq = h.id < 4 ? objAO(p, h.id == 3 ? uTT.y : 0.) : 1.;
  vec2 qt = rot(-uTT.x)*p.xy;
  if (h.id == 1 || h.id == 2) {
    if (h.id == 1) {
      float k = uMat.x;
      vec2 qm = matQ(p.xy);
      vec4 mt = textureLod(uMT, qm/9. + 0.5, log2(max(fp*113.8, 1.)));
      float R = mt.r*2., G = mt.g*0.25;
#if MATK < 2
      {
        vec2 q = qm*3.33; float f = fp*3.33;
        vec2 d1 = abs(fract(q + 0.5) - 0.5), d5 = abs(fract(q/5. + 0.5) - 0.5)*5.;
        float ln = max(lineCov(min(d1.x, d1.y), 0.028, f), lineCov(min(d5.x, d5.y), 0.075, f));
        float wear = smoothstep(0.2, 0.75, nz(q*3. + 13., f*3.));
        vec3 base = k < 0.5 ? vec3(0.034, 0.078, 0.058) : vec3(0.075, 0.078, 0.082);
        vec3 lc = k < 0.5 ? vec3(0.30, 0.36, 0.24) : vec3(0.45, 0.45, 0.43);
        alb = mix(base, lc, ln*(0.62 - 0.32*wear))*R + G;
        rough = 0.58;
      }
#elif MATK == 2
      alb = vec3(0.58, 0.45, 0.31)*R; rough = 0.5; spa = 0.05;
#else
      alb = vec3(0.042, 0.046, 0.052)*R + G; rough = 0.45; spa = 0.06;
#endif
    } else alb = vec3(0.33, 0.22, 0.13)*(0.75 + 0.5*nz(vec2(p.x*3., p.y*50.), fp*50.));
    float er = max(r - uTT.z, 0.);
    ao = aoq*(1. - 0.55*exp(-er/0.06) - 0.25*exp(-er/0.5));
    // where the frame and its foot stand on the mat
    float df = max(uMir.y - 0.13 - p.y, 0.) + max(p.x - uMir.z - 0.25, 0.);
    ao *= 1. - 0.5*exp(-df/0.05) - 0.15*exp(-df/0.4);
    float dk = max(length(p.xy - vec2(uMir.z + 0.085, clamp(p.y, uMir.y - 1.025, uMir.y + 1.075))) - 0.225, 0.);
    ao *= 1. - 0.5*exp(-dk/0.05);
  } else if (h.id == 3) {
    vec4 tt = textureLod(uTTx, qt/3.2 + 0.5, log2(max(fp*160., 1.)));
    alb = tt.rgb*tt.rgb;
    float k = uTT.w;
    if (k > 1.5) { rough = 0.32; spa = 0.07; } else if (k > 0.5) { rough = 0.85; spa = 0.02; }
    ao = aoq;
  } else if (h.id == 4) {
    float k = uTT.w;
    float ply = (p.z - 0.05)/(uTT.y - 0.05)*5.;
    float st = nz(vec2((qt.x + 0.7*qt.y)*70., floor(ply)*7.3), fp*70.);
    if (k < 0.5) {
      // birch ply: face veneers light, cross plies showing darker end grain, a glue line between each
      alb = mix(vec3(0.62, 0.48, 0.32), vec3(0.33, 0.22, 0.13), mod(floor(ply), 2.))*(0.8 + 0.35*st);
      alb *= 1. - 0.5*lineCov(abs(fract(ply + 0.5) - 0.5)*0.018, 0.004, fp);
    } else if (k < 1.5) alb = vec3(0.40, 0.26, 0.15)*(0.7 + 0.5*st);
    else { alb = vec3(0.03); rough = 0.3; spa = 0.08; }
    ao = 0.6 + 0.4*smoothstep(0.05, uTT.y, p.z);
  } else if (h.id == 5) {
    alb = vec3(0.04, 0.04, 0.045); ao = 0.2; rough = 0.35; spa = 0.1;
  } else if (h.id == 6) {
    // frame: black lacquered wood, or (antique) gesso and gold leaf in two tones worn through to red clay on the
    // high edges, chipped white at a corner; a mitre where stile meets rail, a screw head on the foot
    float st = nz(vec2(p.x*5. + p.y*40., p.z*3. + p.y*7.), fp*40.), ant = MIRK == 2 ? 1. : 0.;
    float rub = smoothstep(0.03, 0., h.e)*(0.25 + 0.45*st);
    alb = mix(mix(vec3(0.041, 0.030, 0.022)*(0.8 + 0.4*st), mix(vec3(0.36, 0.25, 0.09), vec3(0.56, 0.42, 0.17), smoothstep(0.35, 0.65, st)), ant),
              mix(vec3(0.26, 0.25, 0.24), vec3(0.34, 0.12, 0.06), ant), rub*(0.8 + 0.6*ant));
    alb = mix(alb, vec3(0.72, 0.68, 0.58), ant*smoothstep(0.1, 0.085, length((p.xz - vec2(uMir.z + 0.25, 0.36))*vec2(1., 1.4))));
    rough = 0.38 - 0.02*ant; spa = 0.07 + 0.13*ant;
    alb += n.z*(MIRK == 1 ? 0.05 : 0.012)*(0.5 + st);
    float sr = length(p.xy - vec2(uMir.z + 0.085, uMir.y - 0.75));
    alb *= 1. - 0.75*step(0.5, -n.y)*step(uMir.z - 0.1, p.x)*step(p.z, 0.23)*lineCov(abs(dot(p.xz - vec2(uMir.z - 0.08, 0.21), vec2(0.537, 0.844))), 0.006, fp);
    alb = mix(alb, vec3(0.30, 0.29, 0.27)*(1. - 0.85*lineCov(abs(p.x - uMir.z - 0.085), 0.012, fp)) + 0.1*smoothstep(0.045, 0., sr), step(0.5, n.z)*step(p.z, 0.2)*smoothstep(0.052, 0.045, sr));
    ao = 0.55 + 0.45*smoothstep(0., 0.3, p.z);
  } else if (h.id == 7) {
    alb = vec3(0.36, 0.355, 0.34)*(0.92 + 0.08*nz(p.xz*6., fp*6.) + 0.05*nz(p.xz*40., fp*40.));
    ao = 0.85;
  } else if (h.id == 9) {
    // the room behind the lens, far out of focus: dark boards, and on them the window's light, barred by its panes
    // (the light this table is lit by, seen in the glass); a dark warm wall beyond
    alb = h.e < 0.5 ? vec3(0.44, 0.32, 0.2)*(0.9 + 0.12*sin(p.x*0.9 + 2.*sin(p.y*0.13))) : vec3(0.36, 0.23, 0.13);
    ao = 1.6 - 0.7*h.e;
  }
  // the window and its image in the glass: weight sums from the light pass
  uvec4 lw = texelFetch(uLt, ivec2(gl_FragCoord.xy), 0);
  vec3 col = uLc.rgb*(alb*(uintBitsToFloat(lw.x)/PI) + uintBitsToFloat(lw.y));
  // the room light: the window side is brighter
  float side = 0.75 + 0.25*dot(normalize(vec3(uL.xy, 0.6)), n);
  col += alb*uAmb.rgb*ao*side*(0.62 + 0.38*n.z);
  // wall falloff away from the window
  if (h.id == 7) col *= 0.75 + 0.5*smoothstep(4., -2., p.x) - 0.25*smoothstep(1.5, 4.5, p.z);
  return col;
}
void main(){
  vec2 ndc = gl_FragCoord.xy*uRes.y*2. - 1.;
  vec3 ro = uCam.xyz;
  vec3 rd = normalize(uFwd.xyz + uCam.w*(ndc.x*uRight.xyz + ndc.y*uUp.xyz));
  float pixA = 2.*uCam.w*uRes.y;
  // the glass: front face at uMir.y, silver at uMir.x (refraction folded into its depth), held in the frame
  float tg = rd.y > 0. ? (uMir.y - ro.y)/rd.y : 1e9;
  vec3 g = ro + rd*tg;
  bool inRect = g.x > uMir2.x && g.x < uMir.z - 0.08 && g.z > 0.21 && g.z < uMir.w;
  vec3 r2 = vec3(rd.x, -rd.y, rd.z);
  float ts = (uMir.x - ro.y)/max(rd.y, 1e-4);
  float Ff = 0.04 + 0.96*pow(1. - abs(rd.y), 5.);
  float fpg = tg*pixA;
  float sil = inRect ? silverAt(g, fpg) : 1.;
  vec3 acc = vec3(0.); float dist = 0.; bool glass = false;
  // one trace and one shade site: the camera ray, then (on the glass) the ray off the silver
  for (int r = 0; r < int(uFoot.x); r++) {
    vec3 o2 = ro, d2 = rd; float base = 0.;
    if (r == 1) { o2 = ro + rd*ts; d2 = r2; base = ts; }
    Hit hh = trace(o2 + d2*0.001, d2);
    if (r == 0) glass = inRect && tg < hh.t;
    if (r == 1 || !glass) {
      vec3 cc = shade(hh, o2, d2, base + hh.t, pixA);
      // silver through the glass twice, plus the front face's own faint reflection of the same scene
      acc = r == 0 ? cc : cc*(uLc.w*sil*silverTint()*(1. - Ff)*(1. - Ff) + Ff);
      dist = base + hh.t;
    }
    if (!glass) break;
  }
  if (glass) {
    // desilvered patches show the dark backing
    acc += (1. - sil)*vec3(0.012, 0.009, 0.006)*dot(uLc.rgb, vec3(0.3));
    acc += glassAdd(g, fpg);
    // the frame's lip shades the glass beside it
    float eb = min(min(uMir.z - 0.08 - g.x, g.z - 0.21), 1.);
    acc *= 1. - 0.45*exp(-eb/0.035);
    acc = mix(acc, acc*vec3(0.42, 0.68, 0.58), exp(-eb/0.012));
  }
  o = vec4(tonemap(acc), cocOf(dist));
}`,u=t+o+`
layout(location=0) out uvec4 o;
struct Hit { float t; int id; vec3 n; float e; };
vec2 matQ(vec2 p){ vec2 d = p - uX.zw; return vec2(uX.x*d.x - uX.y*d.y, uX.y*d.x + uX.x*d.y); }
${a}void main(){
  vec2 ndc = gl_FragCoord.xy*uRes.y*2. - 1.;
  vec3 ro = uCam.xyz;
  vec3 rd = normalize(uFwd.xyz + uCam.w*(ndc.x*uRight.xyz + ndc.y*uUp.xyz));
  float pixA = 2.*uCam.w*uRes.y;
  // the glass: front face at uMir.y, silver at uMir.x (refraction folded into its depth), held in the frame
  float tg = rd.y > 0. ? (uMir.y - ro.y)/rd.y : 1e9;
  vec3 g = ro + rd*tg;
  bool inRect = g.x > uMir2.x && g.x < uMir.z - 0.08 && g.z > 0.21 && g.z < uMir.w;
  vec3 r2 = vec3(rd.x, -rd.y, rd.z);
  float ts = (uMir.x - ro.y)/max(rd.y, 1e-4);
  Hit hh; vec3 o2 = ro, d2 = rd; bool glass = false;
  for (int r = 0; r < int(uFoot.x); r++) {
    o2 = ro; d2 = rd;
    if (r == 1) { o2 = ro + rd*ts; d2 = r2; }
    hh = trace(o2 + d2*0.001, d2);
    if (r == 0) glass = inRect && tg < hh.t;
    if (!glass) break;
  }
  vec3 p = o2 + d2*hh.t, n = hh.n, V = -d2;
  float rough = 0.7, spa = 0.03;
  if (hh.id == 1) { float k = uMat.x; if (k < 1.5) rough = 0.58; else if (k < 2.5) { rough = 0.5; spa = 0.05; } else { rough = 0.45; spa = 0.06; } }
  else if (hh.id == 3) { float k = uTT.w; if (k > 1.5) { rough = 0.32; spa = 0.07; } else if (k > 0.5) { rough = 0.85; spa = 0.02; } }
  else if (hh.id == 4) { if (uTT.w >= 1.5) { rough = 0.3; spa = 0.08; } }
  else if (hh.id == 5) { rough = 0.35; spa = 0.1; }
  else if (hh.id == 6) { if (uMir2.w == 2.) { rough = 0.36; spa = 0.2; } else { rough = 0.38; spa = 0.07; } }
  float sD = 0., sS = 0.;
  for (int li = 0; li < int(uFoot.y); li++) {
    vec3 L = lightDir(li);
    vec3 pm = li == 0 ? p : vec3(p.x, 2.*uMir.x - p.y, p.z);
    float vis = (li == 0 ? directVis(p, L) : mirrorVis(p, L)*uLc.w*0.45)*winFall(pm)*winMask(pm, uL.xyz);
    float ndl = dot(n, L);
    if (vis > 0.001 && ndl > 0.) {
      float s = shadowAt(p, n*0.012, li)*ttShadow(p, L);
      vec3 H = normalize(L + V); float nh = max(dot(n, H), 0.);
      float a2 = rough*rough*rough*rough, dd = nh*nh*(a2 - 1.) + 1.;
      float D = a2/(PI*dd*dd);
      float F = spa + (1. - spa)*pow(1. - max(dot(H, V), 0.), 5.)*0.25;
      float w = vis*s*ndl; sD += w; sS += w*F*D*0.25;
    }
  }
  o = uvec4(floatBitsToUint(sD), floatBitsToUint(sS), 0u, 0u);
}`,b=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp int;
uniform sampler2D uN; uniform float uK;
out vec4 o;
float nz(vec2 uv, float fp){ return textureLod(uN, uv/256., log2(max(fp,1.))).r; }
float lineCov(float d, float w, float f){ f = max(f, 1e-4); return smoothstep(0.5*(w+f), 0.5*(w-f), d)*min(1., w/f); }
float woodS(vec2 p, float fp, float scale){
  float g = nz(vec2(p.x*2.*scale, p.y*60.*scale), fp*60.*scale);
  float g2 = nz(vec2(p.x*0.6*scale + 40., p.y*9.*scale), fp*9.*scale);
  float rings = sin(p.y*38.*scale + g2*9. + nz(vec2(p.x*0.3, p.y*2.)*scale + 7., fp*2.)*14.);
  return 0.84 + 0.12*g + 0.1*rings*(1. - smoothstep(0.3, 1.2, fp*38.*scale));
}
`,v=b+`
void main(){
  vec2 P = (gl_FragCoord.xy/1024. - 0.5)*9.; float fu = 9./1024.;
  float R = 1., G = 0.;
  if (uK < 1.5) {
    vec2 q = P*3.33; float f = fu*3.33;
    R = 0.88 + 0.16*nz(q*6., f*6.) + 0.06*nz(q*40., f*40.);
    // knife scores, mostly along the grid
    float row = floor(q.y*3.), jit = nz(vec2(row*7.3, 3.), 1.) - 0.5;
    float dy = abs(fract(q.y*3.) - 0.5 - jit*0.6)/3.;
    float seg = smoothstep(0.62, 0.7, nz(vec2(q.x*0.4, row*13.1), f*0.4));
    float col2 = floor(q.x*2.), jx = nz(vec2(col2*5.1, 9.), 1.) - 0.5;
    float dx = abs(fract(q.x*2.) - 0.5 - jx*0.6)/2.;
    float seg2 = smoothstep(0.7, 0.76, nz(vec2(col2*11.7, q.y*0.4), f*0.4));
    // a mat in use: the scores gather where the ruler usually lies and where small parts are cut, a few curved
    vec2 g1 = (P - vec2(-1.2, 2.6))/vec2(3.5, 0.8), g2 = (P - vec2(2.8, -1.6))/1.4;
    float gat = 0.35 + 1.3*exp(-dot(g1, g1)) + 1.1*exp(-dot(g2, g2));
    float arc = lineCov(abs(length(P - vec2(3.6, 3.1)) - 1.9), 0.008, fu)*smoothstep(0.55, 0.7, nz(vec2((P.x - 0.7*P.y)*1.6, 5.), 1.));
    float sc = min(1., max(lineCov(dy, 0.01, f)*seg, lineCov(dx, 0.01, f)*seg2)*gat + arc*1.2);
    float dust = smoothstep(0.9, 0.98, nz(q*45., f*45.));
    // worn paler in the middle, where most of the cutting is done
    R *= (1. + 0.72*sc)*(1. + 0.09*exp(-dot(P, P)/7.)); G = sc*0.014 + dust*0.07;
  } else if (uK < 2.5) {
    float scr = smoothstep(0.8, 0.86, nz(vec2(P.x*30., P.y*0.8) + 5., fu*30.));
    R = (1. - 0.15*scr)*woodS(P, fu, 1.);
    // a ring where a mug stood
    R *= 1. - 0.13*lineCov(abs(length(P - vec2(-2.9, 3.3)) - 0.62), 0.05, fu)*(0.5 + 0.5*nz(P*9., fu*9.));
  } else {
    // slate: fine and even, its cleavage steps thin level ridges, a few chalky scuffs
    R = 0.92 + 0.07*nz(P*22., fu*22.) + 0.06*nz(P*85. + 9., fu*85.);
    float sy = P.y*0.85 + 0.5*nz(vec2(P.x*0.35, 3.), fu*0.35);
    float ridge = lineCov(abs(fract(sy) - 0.5), 0.012, fu*0.85)*smoothstep(0.35, 0.6, nz(vec2(P.x*0.6, floor(sy)*5.3 + 0.5), fu*0.6));
    float chalk = smoothstep(0.8, 0.97, nz(P*1.5 + 31., fu*1.5))*smoothstep(0.62, 0.8, nz(vec2(P.x*40., P.y*6.) + 3., fu*40.))*0.025;
    R *= 1. + 0.5*ridge; G = chalk + ridge*0.03;
  }
  o = vec4(R*0.5, G*4., 0., 1.);
}`,i=b+`
void main(){
  vec2 q = (gl_FragCoord.xy/512. - 0.5)*3.2; float f = 3.2/512.;
  float r = length(q);
  vec2 aq = abs(q);
  float a = atan(min(aq.x, aq.y)/max(max(aq.x, aq.y), 1e-5))*57.29578;
  float d10 = abs(fract(a/10. + 0.5) - 0.5)*0.174533*r, d30 = abs(fract(a/30. + 0.5) - 0.5)*0.523599*r;
  float tick = max(lineCov(d10, 0.011, f)*smoothstep(1.385, 1.4, r), lineCov(d30, 0.017, f)*smoothstep(1.275, 1.29, r));
  tick = max(tick, lineCov(aq.y, 0.022, f)*step(0., q.x)*smoothstep(1.1, 1.115, r))*(1. - smoothstep(1.475, 1.49, r));
  tick = max(tick, max(lineCov(abs(r - 0.085), 0.011, f), lineCov(min(aq.x, aq.y), 0.011, f)*(1. - smoothstep(0.15, 0.16, r))));
  vec3 alb;
  if (uK < 0.5) alb = mix(vec3(0.70, 0.56, 0.40)*woodS(q, f, 1.3), vec3(0.10, 0.065, 0.04), tick*0.8);
  else if (uK < 1.5) {
    // cork: pressed granules, darker flecks of bark
    alb = vec3(0.47, 0.30, 0.17)*(0.6 + 0.45*nz(q*45., f*45.) + 0.25*nz(q*120. + 3., f*120.));
    alb *= 1. - 0.55*smoothstep(0.7, 0.8, nz(q*70. + 9., f*70.));
    alb = mix(alb, vec3(0.10, 0.06, 0.035), tick*0.7);
  } else alb = mix(vec3(0.022, 0.023, 0.026)*(0.9 + 0.2*nz(vec2(r*300., 1.), f*300.)), vec3(0.36, 0.37, 0.38), tick*0.85);
  alb *= 0.9 + 0.1*smoothstep(1.55, 1.49, r);
  o = vec4(sqrt(alb), 1.);
}`,c=t+o+`
in vec3 vP; in vec3 vN; in vec4 vA; in vec3 vL;
uniform int uMode;
out vec4 o;
void main(){
  float plane = uMir.x;
  vec3 eye = uCam.xyz;
  vec3 Ce = eye; if (uMode > 0) Ce.y = 2.*plane - Ce.y;
  vec3 V = normalize(Ce - vP);
  vec3 pv = vP; if (uMode > 0) pv.y = 2.*plane - pv.y;
  float dist = length(pv - eye);
  float pixA = 2.*uCam.w*uRes.y;
  vec3 g = vec3(0.); float sil = 1.; float Ff = 0.05;
  if (uMode > 0) {
    vec3 rd = (pv - eye)/dist;
    float tg = (uMir.y - eye.y)/rd.y; g = eye + rd*tg;
    if (g.x > uMir.z - 0.08 || g.x < uMir2.x || g.z < 0.21 || g.z > uMir.w) discard;
    sil = silverAt(g, tg*pixA);
    Ff = 0.04 + 0.96*pow(1. - abs(rd.y), 5.);
  }
  vec3 N = normalize(vN), Ng = N;
  float flz = fwidth(vL.z)/0.0155;
  int sid = int(vA.z + 0.5);
  float hz = vL.z - 0.14, s = vA.x, fp = dist*pixA;
  float mk = uObj.w;
  vec3 up = vec3(0., 0., 1.);
  vec3 alb = sid == 1 ? uObj2.rgb : uObj.rgb;
  float rough = 0.34, spa = 0.045, trans = 0.12;
  vec3 tcol = alb;
  float bead = 0., lp = 0., amp = 0.;
  // across-the-wall direction (horizontal), for the rim
  if (mk == 1.) { rough = 0.85; spa = 0.03; trans = 0.3; }
  else if (mk == 3.) { rough = 0.3; spa = 0.05; trans = 0.02; }
  else if (mk == 2.) { trans = 0.35; tcol = vec3(1., 0.42, 0.08); }
  if (sid < 2) {
    if (mk == 1.) {
      float fib = nz(vec2(s*400., hz*400.), fp*400.)*0.6 + nz(vec2(s*90., hz*90.) + 7., fp*90.)*0.4;
      alb *= 0.95 + 0.08*fib;
      // the glued tab on the far side: a 6 mm overlap
      float ds = s - uObjP.z;
      if (sid == 0) {
        float edge = lineCov(abs(ds - 0.2), 0.008, fp);
        alb *= 1. - 0.45*edge;
        alb *= 1. - 0.04*step(0., ds)*step(ds, 0.2);
      }
    } else if (mk == 3.) {
      float scr = nz(vec2(s*6., hz*300.), fp*300.);
      N = normalize(N + up*(scr - 0.5)*0.04);
    } else {
      // fused filament: 0.45 mm beads (a draft nozzle) and a slow z wobble, faded where a pixel covers several layers
      lp = hz/0.0155;
      amp = 1. - smoothstep(0.26, 0.5, flz);
      // each layer a little different: random per layer, so it filters to fine streaks without moire
      float per = (nz(vec2(9.3, lp), flz) - 0.5)*(1. - smoothstep(0.45, 0.9, flz));        // whole layers, strictly level
      float wob = 0.6*(nz(vec2(hz*24., 2.5), fp*24.) - 0.5) + 0.4*(nz(vec2(hz*90., 7.), fp*90.) - 0.5);
      float cl = cos(lp*6.2832), first = 1. - smoothstep(0.9, 1.15, lp);
      // a bead bulges: its lower half looks down, its upper half up; the first layer is squashed wide on the plate
      N = normalize(N + up*(-sin(lp*6.2832)*0.3*amp + wob*0.06 + per*0.07 - first*0.3));
      float groove = pow(0.5 + 0.5*cl, 5.)*amp;
      alb *= (0.985 + 0.03*wob + 0.02*per)*(1. - 0.2*groove)*(1. - 0.4*exp(-(lp - 1.05)*(lp - 1.05)/0.035));
      bead = 0.55 + 0.9*per;
      // the seam where each layer starts: a ridge on the outside, a fainter one inside
      // the seam: where each layer starts, a small blob or dimple, one a layer, wandering a hair's breadth
      float lr = nz(vec2(floor(lp) + 0.5, 41.5), 1.), lf = fract(lp);
      float ds = s - uObjP.z - (lr - 0.5)*0.009;
      float sm = exp(-ds*ds/(0.0055*0.0055))*pow(sin(3.1416*lf), 2.)*(0.45 + 0.8*lr)*amp*(sid == 0 ? 1. : 0.55)*(lr > 0.2 ? 1. : -0.6);
      N = normalize(N + cross(up, N)*sm*0.7*sign(ds) + up*sm*0.25*cos(3.1416*lf));
      alb *= 1. - 0.06*abs(sm);
      // the first layer squashed on the bed: a little wider, glossier
      rough = mix(rough, 0.2, first); alb *= 1. + 0.04*first;
    }
  } else {
    // the top of the wall: last layer ribs along the path, edges rounded off
    float v = vA.y;
    rough *= 0.8;
    alb *= 1.02;
  }
  // occlusion
  float ao = 1.;
  float lifted = 1. - smoothstep(0., 0.8, uObjP.x);
  if (sid == 0) ao = 1. - 0.42*exp(-hz/0.09)*lifted - 0.12*exp(-hz/0.5)*lifted;
  else if (sid == 1) {
    float dd = max(vA.w - vL.z, 0.);
    float W = 1.6;
    ao = mix(0.16, 1., 1. - dd/sqrt(dd*dd + W*W));
    ao *= 1. - 0.35*exp(-hz/0.08)*lifted;
  }
  vec3 col = vec3(0.);
  for (int li = 0; li < int(uFoot.y); li++) {
    vec3 L = lightDir(li);
    vec3 pm = li == 0 ? vP : vec3(vP.x, 2.*uMir.x - vP.y, vP.z);
    float vis = (li == 0 ? directVis(vP, L) : mirrorVis(vP, L)*uLc.w*0.45)*winFall(pm)*winMask(pm, uL.xyz);
    float ndl = dot(N, L);
    if (vis > 0.001) {
      float ndg = dot(Ng, L);
      float sd = shadowAt(vP, (ndl >= 0. ? Ng : -Ng)*(0.012 + 0.03*(1. - abs(ndg))), li);
      vec3 H = normalize(L + V); float nh = max(dot(N, H), 0.);
      float a2 = rough*rough*rough*rough, dd = nh*nh*(a2 - 1.) + 1.;
      float D = a2/(PI*dd*dd);
      float F = spa + (1. - spa)*pow(1. - max(dot(H, V), 0.), 5.);
      float wrap = max(ndl, 0.);
      // the beads' rounded backs catch the light wherever the wall faces it sideways: a soft upright band, a glint a layer
      float nhh = max(dot(Ng.xy, H.xy)/max(length(H.xy), 1e-4), 0.);
      float sheen = bead*pow(nhh, 14.)*smoothstep(0., 0.2, ndg)*(0.5 + 0.5*amp*cos((lp - 0.3)*6.2832));
      col += uLc.rgb*vis*sd*(alb/PI*wrap*(1. - trans*0.5) + F*D*smoothstep(0., 0.2, ndl)*0.25 + tcol*alb*trans*max(-ndl, 0.)*0.6 + vec3(0.2)*sheen);
    }
  }
  // room light, the mat's bounce on the lower walls, light passed between the walls inside
  float side = 0.62 + 0.38*dot(normalize(vec3(uL.xy, 0.6)), N);
  vec3 bounce = (uMat.x < 0.5 ? vec3(0.045, 0.075, 0.06) : uMat.x < 1.5 ? vec3(0.1) : uMat.x < 2.5 ? vec3(0.3, 0.22, 0.14) : vec3(0.05))*dot(uLc.rgb, vec3(0.2));
  col += alb*ao*(uAmb.rgb*side*(0.6 + 0.4*N.z) + bounce*(0.55 - 0.45*N.z));
  if (sid == 1) col += alb*alb*ao*dot(uLc.rgb, vec3(0.02));
  vec3 R = reflect(-V, N);
  col += mix(bounce*0.6, uAmb.rgb*1.3, smoothstep(-0.2, 0.5, R.z))*(spa + (1. - spa)*pow(1. - max(dot(N, V), 0.), 5.)*0.5)*ao;
  if (uMode == 1) col = col*(uLc.w*sil*silverTint()*(1. - Ff)*(1. - Ff) + Ff) + glassAdd(g, length(g - eye)*pixA);
  o = vec4(tonemap(col), cocOf(dist));
}`,f=t+`
uniform sampler2D uImg; uniform sampler2D uN;
out vec4 o;
const vec2 PD[16] = vec2[16](vec2(-0.613,0.617),vec2(0.170,-0.040),vec2(-0.299,0.791),vec2(0.645,0.493),vec2(-0.651,0.718),
  vec2(0.421,0.027),vec2(-0.817,-0.271),vec2(-0.705,-0.668),vec2(0.977,-0.108),vec2(0.063,-0.991),vec2(0.198,0.734),
  vec2(-0.168,-0.505),vec2(0.528,-0.659),vec2(-0.434,-0.085),vec2(0.858,0.420),vec2(-0.073,0.247));
void main(){
  vec2 uv = gl_FragCoord.xy*uRes.y;
  vec4 c0 = texture(uImg, uv);
  float sc = uRes.x/1000.;
  float Rm = 13.*sc;
  float R = c0.a*Rm;
  vec3 col = c0.rgb;
  if (R > 0.6) {
    float a = fract(52.9829189*fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))))*6.2832;
    mat2 rr = mat2(cos(a), sin(a), -sin(a), cos(a));
    vec3 acc = col; float ws = 1.;
    for (int i = 0; i < 16; i++) {
      vec2 off = rr*PD[i]*R;
      vec4 s = textureLod(uImg, uv + off*uRes.y, 0.);
      float w = clamp(min(s.a*Rm, R) - length(off) + 1., 0., 1.);
      acc += s.rgb*w; ws += w;
    }
    col = acc/ws;
  }
  col += (fract(52.9829189*fract(dot(gl_FragCoord.xy + 0.5, vec2(0.06711056, 0.00583715)))) - 0.5)/255.;
  o = vec4(col, 1.);
}`;return{vso:l,shd:r,bake:n,bg:s,bgl:u,obj:c,comp:f,tmat:v,ttt:i}}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
