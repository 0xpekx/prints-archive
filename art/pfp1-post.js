// after pfp1's pieces: their runtime is window.ProtoPFP (each piece knows it as def.rt), and Drop 01 gets window.Proto back
window.ProtoPFP = window.Proto;
for (const d of window.ProtoPFP.list) d.rt = window.ProtoPFP;
window.Proto = window.__protoMain;
delete window.__protoMain;
