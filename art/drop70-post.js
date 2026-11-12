// after Maquettes' piece (art/drop70/702.js, its file byte for byte): its runtime is window.ProtoMaq (the piece knows it
// as def.rt), and Drop 01 gets window.Proto back
window.ProtoMaq = window.Proto;
for (const d of window.ProtoMaq.list) d.rt = window.ProtoMaq;
window.Proto = window.__protoMain;
delete window.__protoMain;
