prints archive
==============

This folder is a complete public copy of prints: the art code that draws every print (art/*.js, art/pfp1/, art/drop03/,
gems.js) and the public record (record/). With the art code and a print's seed anyone can redraw
that print exactly, even if the prints site is gone.

manifest.json lists every file with its size, SHA-256 and IPFS CID, so you can check a copy is exact.

How to mirror it
----------------
1. Serve this whole folder, unchanged, as static files at any public HTTPS address, for example
   https://example.org/prints-archive/ (so that .../prints-archive/manifest.json opens).
   Any static host works: a web server, object storage, GitHub Pages and the like.
   Or seed prints-archive.torrent (it also downloads from the main copy over HTTP).
2. Register the address on prints (the Public record page). prints checks a few random files now and then.
   While your mirror keeps serving the exact files you keep the Keeper badge and earn a little ink.
3. Keep it up to date (the record grows every day): run sync.mjs from this folder once a day,
   with Node 18 or later. It downloads only what changed and checks every file against the
   manifest first:
       node sync.mjs https://prints.wtf/archive/ .
   Don't edit or recompress files: a changed byte fails the check.

Only one mirror per person and per network counts for rewards.

Main copy: https://prints.wtf/archive/
