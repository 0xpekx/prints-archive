// after drop03's pieces: their runtime is window.ProtoD03 (each piece knows it as def.rt), and Drop 01 gets window.Proto back
window.ProtoD03 = window.Proto;
for (const d of window.ProtoD03.list) d.rt = window.ProtoD03;
window.Proto = window.__protoMain;
delete window.__protoMain;
