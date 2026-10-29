// after drop04's pieces: their runtime is window.ProtoD04 (each piece knows it as def.rt), and Drop 01 gets window.Proto back
window.ProtoD04 = window.Proto;
for (const d of window.ProtoD04.list) d.rt = window.ProtoD04;
window.Proto = window.__protoMain;
delete window.__protoMain;
// and the pieces' roll blocks, registered with the runtime's ProtoRolls as they loaded: the page's copy of drop04's rolls (core.js rollsOf; it doesn't load rolls.js)
if (window.ProtoRolls) (window.PrintsRollsArt = window.PrintsRollsArt || {})['drop04'] = window.ProtoRolls;
