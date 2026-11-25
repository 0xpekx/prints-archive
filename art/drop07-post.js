// after drop07's pieces: their runtime is window.ProtoHum (each piece knows it as def.rt), and Drop 01 gets window.Proto back
window.ProtoHum = window.Proto;
for (const d of window.ProtoHum.list) d.rt = window.ProtoHum;
window.Proto = window.__protoMain;
delete window.__protoMain;
