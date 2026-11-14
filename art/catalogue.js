// The collections: made by server/tools/import-catalogue.mjs from the synaesthesia prototype gallery
// (2026-10-13 20:01 UTC). Don't edit by hand; change the gallery or catalogue.json and run it again.
// series: one per live piece. supply: the founder's collection size. species: [old number, name, brief];
// a print's hash picks one. drop 0 is the daily auction piece. rarity: a limited series' pull chance goes
// with supply^(1 + rarity), so the small runs are far rarer than their size alone would make them.
window.PrintsCatalogue = {
 "made": "2026-10-13T20:01:09.500Z",
 "rarity": 0,
 "drops": [
  {
   "id": 1,
   "num": "01",
   "title": "Prototypes",
   "kind": "limited",
   "isNew": false
  },
  {
   "id": 2,
   "num": "02",
   "title": "PFP.1",
   "kind": "limited",
   "isNew": false
  },
  {
   "id": 3,
   "num": "03",
   "title": "Amusements",
   "price": 150,
   "noSetPick": true,
   "kind": "limited",
   "isNew": false,
   "noBonus": [
    "Iso Dioramas",
    "Sky Isles",
    "Shopfronts",
    "Big Top"
   ]
  },
  {
   "id": 4,
   "num": "04",
   "title": "Loot I",
   "price": 200,
   "noSetPick": true,
   "ownTraits": true,
   "kind": "limited",
   "isNew": false,
   "noBonus": [
    "Plinth",
    "Foil Card"
   ],
   "launch": {
    "at": "2026-10-29T16:00:00Z",
    "windowHours": 8,
    "cap": 100,
    "discount": 0.2,
    "premiumAfter": 3,
    "premium": 0,
    "randomSerials": true
   }
  },
  {
   "id": 5,
   "num": "05",
   "title": "Daily issue",
   "kind": "house",
   "isNew": false,
   "mark": "Daily issue",
   "noBonus": [
    "Daily issue"
   ]
  },
  {
   "id": 6,
   "num": "05",
   "title": "Worlds",
   "price": 200,
   "noSetPick": true,
   "kind": "limited",
   "isNew": true,
   "noBonus": [
    "Sleeper Train",
    "Candle",
    "Billiards",
    "Ball Cradle",
    "Gold Crystals",
    "Jar Aurora",
    "Night Vision",
    "Tintype Sea",
    "Mars Sunset",
    "Methane Sea",
    "Cloud Balloon",
    "Slow Lightning",
    "Heat Lightning",
    "Aurora Lake",
    "Light Pillars",
    "Desert Arch",
    "Sand Circle",
    "Koi Pond",
    "Sea Cave",
    "Sunset Surf",
    "Salt Pans"
   ],
   "launch": {
    "at": "2026-11-16T16:00:00Z",
    "windowHours": 8,
    "cap": 30,
    "discount": 0.2,
    "premiumAfter": 3,
    "premium": 0,
    "randomSerials": true
   }
  }
 ],
 "daily": "1009",
 "series": [
  {
   "key": "2",
   "name": "Continued Fraction",
   "fam": "Residue",
   "set": "Systems",
   "drop": 1,
   "supply": 256,
   "brief": "Every direction from an origin is a ratio, and its continued fraction picks the colour. Fans within fans.",
   "species": [
    [
     2,
     "Continued Fraction",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "9",
   "name": "Pascal Loom",
   "fam": "Residue",
   "set": "Systems",
   "drop": 1,
   "supply": 256,
   "brief": "Pascal’s triangle, modulo a small prime, woven as cloth.",
   "species": [
    [
     9,
     "Pascal Loom",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "10",
   "name": "Hilbert Flow",
   "fam": "Residue",
   "set": "Systems",
   "drop": 1,
   "supply": 64,
   "brief": "One unbroken line that visits every corner of the square, with colour pumped along its length.",
   "species": [
    [
     10,
     "Hilbert Flow",
     ""
    ]
   ]
  },
  {
   "key": "15",
   "name": "Wireworld",
   "fam": "Automata",
   "set": "Systems",
   "drop": 1,
   "supply": 256,
   "brief": "Wires carry electrons: a head, then a tail, then wire again. Where wires meet, signals split, collide and cancel.",
   "species": [
    [
     15,
     "Wireworld",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "18",
   "name": "Sediment",
   "fam": "Automata",
   "set": "Systems",
   "drop": 1,
   "supply": 96,
   "brief": "Grains fall from swinging spouts and pile up in bands of colour that slowly sink.",
   "species": [
    [
     18,
     "Sediment",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "20",
   "name": "Sorting",
   "fam": "Automata",
   "set": "Systems",
   "drop": 1,
   "supply": 256,
   "brief": "Every row a scrambled spectrum, put back in order one swap at a time. Disorder sweeps down, order follows.",
   "species": [
    [
     20,
     "Sorting",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1009",
   "name": "Waves",
   "fam": "Waves",
   "set": "Systems",
   "drop": 0,
   "supply": null,
   "brief": "Waves meeting waves. Crests in one colour, troughs in another.",
   "species": [
    [
     24,
     "Ripple Tank",
     "A few stones tapping a pond at slightly different rates. Some tanks have a wall with slits, a row of posts or an island for the waves to bend around."
    ],
    [
     25,
     "Chladni",
     "A square plate humming. The lines are where it stands still, and they redraw as the pitch slides."
    ],
    [
     26,
     "Cassini",
     "A few points in orbit, and the field between them banded by distance. Some push instead of pull, so saddles open up."
    ],
    [
     30,
     "Quasicrystal",
     "Five to twelve sets of straight waves crossing at even angles. An order that never quite repeats."
    ]
   ],
   "touch": 1
  },
  {
   "key": "39",
   "name": "Traces",
   "fam": "Growth",
   "set": "Systems",
   "drop": 1,
   "supply": 32,
   "brief": "Routes on a circuit board in buses, turning only at 45° and never crossing, each ending in a pad.",
   "species": [
    [
     39,
     "Traces",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "45",
   "name": "Murmuration",
   "fam": "Strands",
   "set": "Systems",
   "drop": 1,
   "supply": 64,
   "brief": "A flock where every bird only watches its nearest neighbours. Somehow that is enough.",
   "species": [
    [
     45,
     "Murmuration",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1008",
   "name": "Fluids",
   "fam": "Strands",
   "set": "Systems",
   "drop": 1,
   "supply": 128,
   "brief": "Bold stripes of dye, stirred by real fluid rules.",
   "species": [
    [
     47,
     "Vortices",
     "Stripes of dye wound up by a handful of whirlpools that also push each other around."
    ],
    [
     471,
     "Convection",
     "Heated from below, cooled from above. The fluid turns over in slow rolls, like a pan of soup or the surface of the sun."
    ],
    [
     472,
     "Shear Layer",
     "Two streams sliding past each other. The edge between them curls up like breaking waves, and the curls pair off and merge."
    ],
    [
     476,
     "Sine Flow",
     "The simplest chaotic stir: a sideways sine, then an up-and-down one, over and over. Blocks of dye become marble in seconds."
    ],
    [
     477,
     "Karman Street",
     "Flow past a post sheds a whirl from one side, then the other. The stripes wind into a chain of curls."
    ]
   ],
   "touch": 1
  },
  {
   "key": "64",
   "name": "Gear Train",
   "fam": "Drafting",
   "set": "Systems",
   "drop": 1,
   "supply": 96,
   "brief": "Meshed gears that actually run. Each wheel turns its neighbour the other way, by the ratio of their teeth.",
   "species": [
    [
     64,
     "Gear Train",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "71",
   "name": "Pursuit",
   "fam": "Tilings",
   "set": "Systems",
   "drop": 1,
   "supply": 32,
   "brief": "A polygon inside a polygon, each turned a little from the last. Neighbouring tiles turn the other way, so the spirals join up.",
   "species": [
    [
     71,
     "Pursuit",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "73",
   "name": "Glyphs",
   "fam": "Signal",
   "set": "Systems",
   "drop": 1,
   "supply": 48,
   "brief": "An alphabet of invented signs. Each new sign is bred from the two beside it, so families spread across the page.",
   "species": [
    [
     73,
     "Glyphs",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1033",
   "name": "Readouts",
   "fam": "Signal",
   "set": "Systems",
   "drop": 1,
   "supply": 32,
   "brief": "Screens that keep themselves busy.",
   "species": [
    [
     75,
     "Odometer",
     "Rows of counters in different bases. The right-hand wheels spin; the left-hand ones wait patiently for the carry."
    ],
    [
     201,
     "Departures",
     "A split-flap board where every destination is a word from the collection. Every minute a row departs and the flaps riffle."
    ],
    [
     205,
     "Terminal",
     "A text-mode screen in one phosphor: panels, a scrolling log of made-up processes, meters and a blinking cursor."
    ]
   ],
   "touch": 1
  },
  {
   "key": "76",
   "name": "Asemic",
   "fam": "Signal",
   "set": "Systems",
   "drop": 1,
   "supply": 128,
   "brief": "A letter written in a script that doesn’t exist, line by line, and then begun again.",
   "species": [
    [
     76,
     "Asemic",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "78",
   "name": "Spectrogram",
   "fam": "Signal",
   "set": "Systems",
   "drop": 1,
   "supply": 64,
   "brief": "The picture a sound makes, and the sound itself. Time runs across, pitch runs up.",
   "species": [
    [
     78,
     "Spectrogram",
     ""
    ]
   ],
   "touch": 1,
   "music": 1
  },
  {
   "key": "1031",
   "name": "Pattern Type",
   "fam": "Signal",
   "set": "Systems",
   "drop": 1,
   "supply": 64,
   "brief": "Pages of words in text mode, coloured three different ways.",
   "species": [
    [
     80,
     "Grapheme",
     "For some of us, every letter has a colour. A has always been red to me. A word from the collection, each letter in its own hue."
    ],
    [
     403,
     "Word Plasma",
     "A page of the collection’s words, lit by a slow plasma. Letters go dark in the lows and flood with colour at the peaks."
    ],
    [
     406,
     "Xor Type",
     "Two walls of repeated words sliding past each other. Where only one has ink, it shows, so the texts interfere into lattices."
    ]
   ],
   "touch": 1
  },
  {
   "key": "83",
   "name": "Voxel Residue",
   "fam": "Projections",
   "set": "Systems",
   "drop": 1,
   "supply": 256,
   "brief": "A flight down a corridor cut through a lattice of cubes, where a cube only exists if its coordinates leave a small remainder.",
   "species": [
    [
     83,
     "Voxel Residue",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "95",
   "name": "Slit Scan",
   "fam": "Fields",
   "set": "Systems",
   "drop": 1,
   "supply": 512,
   "brief": "Turning prisms filmed one line at a time, each line a moment later than the last, so the spin is recorded as a twist.",
   "species": [
    [
     95,
     "Slit Scan",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "96",
   "name": "Bayer",
   "fam": "Fields",
   "set": "Systems",
   "drop": 1,
   "supply": 512,
   "brief": "Soft gradients forced into a handful of flat inks, the way early screens faked their greys.",
   "species": [
    [
     96,
     "Bayer",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1053",
   "name": "Sprite Walls",
   "fam": "Sprites",
   "set": "Pixel",
   "drop": 1,
   "supply": 512,
   "brief": "A wall of portraits. Nobody here exists.",
   "species": [
    [
     104,
     "Sitters",
     "Twenty-pixel portraits of people who don’t exist. They look around, they blink, and now and then someone new sits down."
    ]
   ]
  },
  {
   "key": "1020",
   "name": "Dungeons",
   "fam": "Sprites",
   "set": "Pixel",
   "drop": 1,
   "supply": 32,
   "brief": "Dungeons mapped one room at a time, by torchlight.",
   "species": [
    [
     106,
     "Crawl",
     "A fresh dungeon every time, in stone, ice, moss or sandstone. The map is only drawn as far as the torch has reached."
    ],
    [
     307,
     "Fog of War",
     "A dungeon minimap that starts black. The explorer always heads for the nearest unknown edge until the level is clear."
    ]
   ],
   "touch": 1
  },
  {
   "key": "107",
   "name": "Runner",
   "fam": "Sprites",
   "set": "Pixel",
   "drop": 1,
   "supply": 16,
   "brief": "A world that never ends, sliding past in layers, and a small runner who jumps whatever gets in the way.",
   "species": [
    [
     107,
     "Runner",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1054",
   "name": "Arcade",
   "fam": "Sprites",
   "set": "Pixel",
   "drop": 1,
   "supply": 128,
   "brief": "Arcade games that play themselves, unless you want a turn.",
   "species": [
    [
     108,
     "Chase",
     "A hungry round thing, a mirrored maze, four power pills and some ghosts with a plan."
    ],
    [
     109,
     "Serpent",
     "A snake that plans ahead: it finds a path to the fruit and checks it can still reach its tail before it commits."
    ],
    [
     110,
     "Stack",
     "Falling blocks played by a patient machine that tries every turn and column and keeps the stack tidy."
    ]
   ],
   "touch": 1
  },
  {
   "key": "1023",
   "name": "Hills",
   "fam": "Terrain",
   "set": "Pixel",
   "drop": 1,
   "supply": 256,
   "brief": "Hills behind hills, fading into the distance.",
   "species": [
    [
     111,
     "Parallax",
     "Ranges of mountains, each paler with distance and sliding at its own pace, over a still lake that holds their reflection."
    ],
    [
     213,
     "Fog Bank",
     "Ridge after ridge, with fog drifting through the valleys in a few flat tones."
    ]
   ]
  },
  {
   "key": "113",
   "name": "Grotto",
   "fam": "Terrain",
   "set": "Pixel",
   "drop": 1,
   "supply": 32,
   "brief": "A cave grown from smoothed noise, lit by pulsing crystals, with water dripping into a still pool.",
   "species": [
    [
     113,
     "Grotto",
     ""
    ]
   ]
  },
  {
   "key": "116",
   "name": "Voxel Flight",
   "fam": "Terrain",
   "set": "Pixel",
   "drop": 1,
   "supply": 512,
   "brief": "Low flight over generated land, drawn one column at a time the way early flight games did it.",
   "species": [
    [
     116,
     "Voxel Flight",
     ""
    ]
   ]
  },
  {
   "key": "118",
   "name": "Mode Seven",
   "fam": "Terrain",
   "set": "Pixel",
   "drop": 1,
   "supply": 128,
   "brief": "A flat world tilted into perspective, one row at a time, as old consoles did it. The ground is the collection’s own field.",
   "species": [
    [
     118,
     "Mode Seven",
     ""
    ]
   ]
  },
  {
   "key": "1045",
   "name": "Planets",
   "fam": "Terrain",
   "set": "Pixel",
   "drop": 1,
   "supply": 256,
   "brief": "Whole worlds, turning.",
   "species": [
    [
     119,
     "Planetoid",
     "A small world turning in space. Earth-like with city lights, desert, ocean, ice, lava, gas giant, jungle or a cratered moon."
    ],
    [
     268,
     "Ringed World",
     "A banded giant inside its rings. The rings pass behind and in front, and the planet throws its shadow across them."
    ]
   ],
   "touch": 1
  },
  {
   "key": "122",
   "name": "Tunnel",
   "fam": "Demoscene",
   "set": "Pixel",
   "drop": 1,
   "supply": 256,
   "brief": "Flying down a tube. Every pixel looks up its angle and distance and reads the wall there.",
   "species": [
    [
     122,
     "Tunnel",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "127",
   "name": "Vector Balls",
   "fam": "Demoscene",
   "set": "Pixel",
   "drop": 1,
   "supply": 64,
   "brief": "Shaded balls in three dimensions, flowing from one formation to the next: cube, sphere, ring, helix, star.",
   "species": [
    [
     127,
     "Vector Balls",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "130",
   "name": "Emboss",
   "fam": "Demoscene",
   "set": "Pixel",
   "drop": 1,
   "supply": 64,
   "brief": "A word in relief, lit by a moving lamp, rising out of a plate of gold, steel, ice, jade, copper or amethyst.",
   "species": [
    [
     130,
     "Emboss",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "143",
   "name": "Low Poly",
   "fam": "Raster",
   "set": "Pixel",
   "drop": 1,
   "supply": 512,
   "brief": "A mesh of triangles with drifting corners, each filled flat with the landscape behind it. A sunset, the way early 3D hardware would have drawn it.",
   "species": [
    [
     143,
     "Low Poly",
     ""
    ]
   ]
  },
  {
   "key": "144",
   "name": "Raycaster",
   "fam": "Raster",
   "set": "Pixel",
   "drop": 1,
   "supply": 512,
   "brief": "A walk through a maze drawn the way the first such games did: one ray per column, each wall slice as tall as the ray was short.",
   "species": [
    [
     144,
     "Raycaster",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "146",
   "name": "Road",
   "fam": "Raster",
   "set": "Pixel",
   "drop": 1,
   "supply": 96,
   "brief": "An endless road drawn one strip at a time, the way arcade racers faked depth.",
   "species": [
    [
     146,
     "Road",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "147",
   "name": "Shadowcast",
   "fam": "Raster",
   "set": "Pixel",
   "drop": 1,
   "supply": 512,
   "brief": "Coloured lamps wandering among blocks. Every block throws a hard shadow, and the colours mix where both lamps reach.",
   "species": [
    [
     147,
     "Shadowcast",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "148",
   "name": "Mystify",
   "fam": "Raster",
   "set": "Pixel",
   "drop": 1,
   "supply": 512,
   "brief": "Shapes whose corners bounce off the edges of the screen, trailing their last outlines. After the old screen saver.",
   "species": [
    [
     148,
     "Mystify",
     ""
    ]
   ]
  },
  {
   "key": "150",
   "name": "Flat Shade",
   "fam": "Raster",
   "set": "Pixel",
   "drop": 1,
   "supply": 32,
   "brief": "Solids made of a few dozen triangles, each filled with one flat tone, the way the first polygon games were drawn.",
   "species": [
    [
     150,
     "Flat Shade",
     ""
    ]
   ]
  },
  {
   "key": "153",
   "name": "Crosshatch",
   "fam": "Dither",
   "set": "Pixel",
   "drop": 1,
   "supply": 512,
   "brief": "Hills shaded by hand: one layer of hatching for light shadow, more across it for the deep valleys.",
   "species": [
    [
     153,
     "Crosshatch",
     ""
    ]
   ]
  },
  {
   "key": "1036",
   "name": "Close-up CRT",
   "fam": "Dither",
   "set": "Pixel",
   "drop": 1,
   "supply": 256,
   "brief": "An old TV picture, up close enough to see the phosphor.",
   "species": [
    [
     158,
     "Phosphor",
     "A picture the way an old colour tube shows it: stripes of red, green and blue phosphor, bright parts blooming into their neighbours."
    ],
    [
     277,
     "Subpixels",
     "A tiny screen under a magnifier. Every pixel is three stripes of light, and a few of them are stuck."
    ]
   ]
  },
  {
   "key": "159",
   "name": "Cloud Sea",
   "fam": "Dither",
   "set": "Pixel",
   "drop": 1,
   "supply": 32,
   "brief": "The view from above the weather. A deck of cloud rolling past below, in three flat tones.",
   "species": [
    [
     159,
     "Cloud Sea",
     ""
    ]
   ]
  },
  {
   "key": "160",
   "name": "Riso",
   "fam": "Dither",
   "set": "Pixel",
   "drop": 1,
   "supply": 512,
   "brief": "A two-ink print with the grain of a stencil duplicator, never quite in register, on speckled paper.",
   "species": [
    [
     160,
     "Riso",
     ""
    ]
   ]
  },
  {
   "key": "162",
   "name": "Ball Pit",
   "fam": "Physics",
   "set": "Pixel",
   "drop": 1,
   "supply": 128,
   "brief": "Balls of every size poured into a box. When it is full it tips them out and starts again.",
   "species": [
    [
     162,
     "Ball Pit",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1067",
   "name": "Rain on Glass",
   "fam": "Physics",
   "set": "Pixel",
   "drop": 1,
   "supply": 128,
   "brief": "Rain on a window at night, the city soft behind it.",
   "species": [
    [
     164,
     "Window",
     "Small drops cling, big ones give way and run, leaving a clear trail through the fog."
    ],
    [
     211,
     "Rain on Glass",
     "Drops gather, swell and run down in crooked paths, each one clearing a streak of sharper light."
    ]
   ],
   "touch": 1
  },
  {
   "key": "168",
   "name": "Formicary",
   "fam": "Physics",
   "set": "Pixel",
   "drop": 1,
   "supply": 128,
   "brief": "Ants leave the nest at random. The ones that find food lay a trail home, and the others follow it.",
   "species": [
    [
     168,
     "Formicary",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "170",
   "name": "Jelly",
   "fam": "Physics",
   "set": "Pixel",
   "drop": 1,
   "supply": 64,
   "brief": "Soft bodies dropped onto shelves. They squash, wobble, slide off and fall again.",
   "species": [
    [
     170,
     "Jelly",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "177",
   "name": "Day & Night",
   "fam": "Life",
   "set": "Pixel",
   "drop": 1,
   "supply": 256,
   "brief": "A rule that treats live and dead cells exactly alike, so islands of each grow, shrink and swap places.",
   "species": [
    [
     177,
     "Day & Night",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "179",
   "name": "Replicator",
   "fam": "Life",
   "set": "Pixel",
   "drop": 1,
   "supply": 64,
   "brief": "A cell is on when an odd number of its neighbours were. Whatever you start with comes back as copies of itself.",
   "species": [
    [
     179,
     "Replicator",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1019",
   "name": "Logistics",
   "fam": "Machines",
   "set": "Pixel",
   "drop": 1,
   "supply": 256,
   "brief": "Small busy systems seen from above. Everything gets where it is going, eventually.",
   "species": [
    [
     182,
     "Factory",
     "A conveyor loop from above. Parts get painted, stamped, dipped, boxed and dropped in a crate."
    ],
    [
     187,
     "Railyard",
     "A model railway: two loops, a set of points, and trains that change loops when the points flip."
    ],
    [
     188,
     "Elevators",
     "A tower in cross-section. People want other floors; the lifts try their best."
    ],
    [
     189,
     "Warehouse",
     "A robot warehouse. Little robots slide under shelves, carry them to packing, wait their turn and take them home."
    ]
   ],
   "touch": 1
  },
  {
   "key": "183",
   "name": "Learning",
   "fam": "Machines",
   "set": "Pixel",
   "drop": 1,
   "supply": 512,
   "brief": "A tiny neural network, like the ones in Axons, learning a picture live. Its guess sharpens out of fog.",
   "species": [
    [
     183,
     "Learning",
     ""
    ]
   ]
  },
  {
   "key": "184",
   "name": "Core War",
   "fam": "Machines",
   "set": "Pixel",
   "drop": 1,
   "supply": 512,
   "brief": "Small programs fighting inside one memory, bombing each other’s code, until one is left.",
   "species": [
    [
     184,
     "Core War",
     ""
    ]
   ]
  },
  {
   "key": "190",
   "name": "Logic Analyser",
   "fam": "Machines",
   "set": "Pixel",
   "drop": 1,
   "supply": 8,
   "brief": "The probe screen of a small digital circuit: a clock, a counter, a shift register full of noise, all scrolling past.",
   "species": [
    [
     190,
     "Logic Analyser",
     ""
    ]
   ]
  },
  {
   "key": "1032",
   "name": "Letter Grids",
   "fam": "Glyphs",
   "set": "Pixel II",
   "drop": 1,
   "supply": 8,
   "brief": "Word puzzles on paper that solve themselves.",
   "species": [
    [
     202,
     "Word Search",
     "A word search with the collection’s words hidden in it. Found one by one, each ringed in its own colour."
    ],
    [
     209,
     "Crossword",
     "A crossword that fills itself in, letter by letter, with the collection’s words. Then a fresh grid."
    ]
   ]
  },
  {
   "key": "204",
   "name": "Letter Stacks",
   "fam": "Glyphs",
   "set": "Pixel II",
   "drop": 1,
   "supply": 512,
   "brief": "Big letters drift down eight chutes and stack. Fill a row and it melts away.",
   "species": [
    [
     204,
     "Letter Stacks",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "214",
   "name": "Monsoon",
   "fam": "Weather",
   "set": "Pixel II",
   "drop": 1,
   "supply": 8,
   "brief": "Heavy slanting rain over a dark pond. Every drop opens a ring, and the rings cross without minding each other.",
   "species": [
    [
     214,
     "Monsoon",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "215",
   "name": "Mirage",
   "fam": "Weather",
   "set": "Pixel II",
   "drop": 1,
   "supply": 8,
   "brief": "A desert road running to the horizon. The far distance shimmers, and the sky pools on the asphalt as a lake that isn’t there.",
   "species": [
    [
     215,
     "Mirage",
     ""
    ]
   ]
  },
  {
   "key": "216",
   "name": "Tide Table",
   "fam": "Weather",
   "set": "Pixel II",
   "drop": 1,
   "supply": 32,
   "brief": "A month of tides as a bar chart, with the moon’s phase drawn above each day.",
   "species": [
    [
     216,
     "Tide Table",
     ""
    ]
   ]
  },
  {
   "key": "1039",
   "name": "Radar",
   "fam": "Weather",
   "set": "Pixel II",
   "drop": 1,
   "supply": 16,
   "brief": "A sweep goes round. Whatever it touches glows, then fades.",
   "species": [
    [
     217,
     "Storm Radar",
     "A weather radar over a coastline. Rain cells drift and grow, painted fresh in green, yellow and red every sweep."
    ],
    [
     251,
     "Radar",
     "A sweep over a coastline, an archipelago or open sea. Every cell it passes lights up and slowly fades, so the screen is always half-remembered."
    ]
   ],
   "touch": 1
  },
  {
   "key": "222",
   "name": "Boomtown",
   "fam": "Architecture",
   "set": "Pixel II",
   "drop": 1,
   "supply": 32,
   "brief": "A city block by block. Lots fill with buildings that rise floor by floor, and old ones come down to be built again, higher.",
   "species": [
    [
     222,
     "Boomtown",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "230",
   "name": "Colonnade",
   "fam": "Architecture",
   "set": "Pixel II",
   "drop": 1,
   "supply": 64,
   "brief": "A one-point view down an endless arcade. The walk forward never ends.",
   "species": [
    [
     230,
     "Colonnade",
     ""
    ]
   ]
  },
  {
   "key": "232",
   "name": "Reef",
   "fam": "Ecosystems",
   "set": "Pixel II",
   "drop": 1,
   "supply": 64,
   "brief": "Corals growing up from the sea floor, each colony in its own colour, with a slow light swaying through the water.",
   "species": [
    [
     232,
     "Reef",
     ""
    ]
   ]
  },
  {
   "key": "234",
   "name": "Migration",
   "fam": "Ecosystems",
   "set": "Pixel II",
   "drop": 1,
   "supply": 8,
   "brief": "Skeins of birds crossing an evening sky over still water, wings beating in turn down each line.",
   "species": [
    [
     234,
     "Migration",
     ""
    ]
   ]
  },
  {
   "key": "236",
   "name": "Algal Bloom",
   "fam": "Ecosystems",
   "set": "Pixel II",
   "drop": 1,
   "supply": 512,
   "brief": "A plankton bloom in a slow current, stretched into filaments by the swirling water.",
   "species": [
    [
     236,
     "Algal Bloom",
     ""
    ]
   ]
  },
  {
   "key": "242",
   "name": "Glass Ball",
   "fam": "Optics",
   "set": "Pixel II",
   "drop": 1,
   "supply": 16,
   "brief": "Glass balls rolling over a patterned floor, knocking into each other, each one flipping and magnifying what is underneath.",
   "species": [
    [
     242,
     "Glass Ball",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "252",
   "name": "Seismograph",
   "fam": "Instruments",
   "set": "Pixel II",
   "drop": 1,
   "supply": 100,
   "brief": "A drum of graph paper under a few pens. Mostly they tremble. Now and then a quake rolls through.",
   "species": [
    [
     252,
     "Seismograph",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1062",
   "name": "Sequencers",
   "fam": "Instruments",
   "set": "Pixel II",
   "drop": 1,
   "supply": 1000,
   "brief": "Music machines with lights, and sound when you unmute.",
   "species": [
    [
     254,
     "Piano Roll",
     "A seeded song in one scale scrolls into a keyboard. Each key lights as its note arrives."
    ],
    [
     256,
     "Step Sequencer",
     "Eight voices of glowing pads, four drums and four notes. The playhead walks across and one voice is rewritten every bar."
    ],
    [
     260,
     "Patch Bay",
     "A modular synth wired with sagging cables. Beads of light travel the cables and play a note when they arrive."
    ]
   ],
   "touch": 1,
   "music": 1
  },
  {
   "key": "1044",
   "name": "Cosmos",
   "fam": "Cosmos",
   "set": "Pixel II",
   "drop": 1,
   "supply": 256,
   "brief": "The night sky, mostly dark, sometimes on fire.",
   "species": [
    [
     261,
     "Spiral Galaxy",
     "Thousands of stars on two to four spiral arms. The middle turns faster than the rim, so the arms wind ever so slowly."
    ],
    [
     262,
     "Orrery",
     "A clockwork solar system on a tilt. Inner planets fast, outer ones slow, as Kepler said."
    ],
    [
     263,
     "Eclipse",
     "The moon slides across the sun. The sky dims, the corona flares, the stars come out, a diamond ring flashes, and the day comes back."
    ],
    [
     265,
     "Comet",
     "A comet swings round the sun and grows two tails: a straight blue one blown away from the sun, a curved gold one lagging behind."
    ],
    [
     266,
     "Star Trails",
     "A long exposure. Every star scratches its arc into the plate behind a dark treeline."
    ],
    [
     267,
     "Constellations",
     "Drifting across an invented sky. A pen joins the brightest stars, names the figure, and lets it go."
    ],
    [
     269,
     "Accretion",
     "A black hole’s shadow in a thin ring of light. The far side of the disc is bent up over the top."
    ]
   ]
  },
  {
   "key": "264",
   "name": "Nebula",
   "fam": "Cosmos",
   "set": "Pixel II",
   "drop": 1,
   "supply": 512,
   "brief": "Three clouds of gas, one per colour, drifting past each other behind dark pillars of dust.",
   "species": [
    [
     264,
     "Nebula",
     ""
    ]
   ]
  },
  {
   "key": "270",
   "name": "Moon Phases",
   "fam": "Cosmos",
   "set": "Pixel II",
   "drop": 1,
   "supply": 8,
   "brief": "A calendar of moons, one per night, as the sun swings round month by month.",
   "species": [
    [
     270,
     "Moon Phases",
     ""
    ]
   ]
  },
  {
   "key": "1038",
   "name": "Bad Tape",
   "fam": "Glitch",
   "set": "Pixel II",
   "drop": 1,
   "supply": 512,
   "brief": "One sunset, broken five different ways on its way to the screen.",
   "species": [
    [
     273,
     "Blocks",
     "The picture stored in 8 by 8 cosine blocks, like a JPEG. A slow wave of bad quality rolls across it."
    ],
    [
     274,
     "Horizontal Hold",
     "An old set losing its hold. The picture leans, wraps round, and snaps upright for a moment before slipping again."
    ],
    [
     275,
     "Tracking",
     "A worn tape on play. Colour bleeds, a band of tracking noise crawls up the screen, the counter keeps time."
    ],
    [
     279,
     "Misregistration",
     "The red, green and blue plates each drift on their own loop and only line up now and then."
    ],
    [
     280,
     "Bit Rot",
     "The picture held in failing memory. Bad bits creep along the rows until a clean copy is written back."
    ]
   ]
  },
  {
   "key": "1058",
   "name": "Board Games",
   "fam": "Tabletop",
   "set": "Pixel II",
   "drop": 1,
   "supply": 512,
   "brief": "Board games played out move by move. Take a seat if you like.",
   "species": [
    [
     281,
     "Chess",
     "Two greedy players who take whatever is worth most and otherwise wander. The boards and armies change every game."
    ],
    [
     282,
     "Go",
     "Stones go down one at a time, mostly near the fighting. Groups with no liberties left are lifted off."
    ],
    [
     451,
     "Othello",
     "Othello played to the end by two players who love corners. Whole regions change hands in a ripple."
    ],
    [
     452,
     "Connect Four",
     "Connect Four. Take the win when you see it, block when you must, otherwise play the middle."
    ],
    [
     453,
     "Checkers",
     "Draughts by the book. Captures are compulsory, jumps chain, and a man that reaches the far row is crowned."
    ],
    [
     457,
     "Mill",
     "Nine men’s morris, and its six and twelve men cousins. Three in a row makes a mill."
    ],
    [
     459,
     "Ultimate",
     "Ultimate tic-tac-toe: where you play decides which board your opponent plays next."
    ],
    [
     460,
     "Halma",
     "Four armies of Halma pieces race to the opposite corners, hopping over whoever is in the way."
    ],
    [
     456,
     "Peg Solitaire",
     "Peg solitaire on the English cross, the French board or a triangle. Jump, lift, repeat, until there is nothing left to jump."
    ],
    [
     458,
     "Battleship",
     "A hidden fleet hunted on a ten by ten grid. Misses ripple, hits burn."
    ],
    [
     500,
     "Sudoku",
     "A sudoku that solves itself by backtracking. Wrong guesses flash red and come back off."
    ]
   ],
   "touch": 1
  },
  {
   "key": "284",
   "name": "Solitaire",
   "fam": "Tabletop",
   "set": "Pixel II",
   "drop": 1,
   "supply": 8,
   "brief": "A real game of Klondike, dealt, played and won, and then the old victory cascade. Every deal is solved before it is played.",
   "species": [
    [
     284,
     "Solitaire",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "285",
   "name": "Dice",
   "fam": "Tabletop",
   "set": "Pixel II",
   "drop": 1,
   "supply": 64,
   "brief": "A handful of dice thrown into a felt tray. They tumble, settle, show their total, and get scooped up again.",
   "species": [
    [
     285,
     "Dice",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1069",
   "name": "Picture Puzzles",
   "fam": "Tabletop",
   "set": "Pixel II",
   "drop": 1,
   "supply": 512,
   "brief": "A picture taken apart and put back together.",
   "species": [
    [
     289,
     "Jigsaw",
     "A pixel picture cut into jigsaw pieces that fly back in one by one."
    ],
    [
     290,
     "Sliding Puzzle",
     "A fifteen puzzle that scrambles itself with a long random walk, then plays the walk backwards."
    ]
   ],
   "touch": 1
  },
  {
   "key": "354",
   "name": "Marble Run",
   "fam": "Toys",
   "set": "Pixel III",
   "drop": 1,
   "supply": 16,
   "brief": "Glass marbles roll down zig-zag rails and ride a little lift back to the top.",
   "species": [
    [
     354,
     "Marble Run",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1061",
   "name": "Sport",
   "fam": "Sport",
   "set": "Pixel III",
   "drop": 1,
   "supply": 32,
   "brief": "Sport from the best seat in the house.",
   "species": [
    [
     361,
     "Rally",
     "A tennis rally from behind the baseline that actually plays: shots go in, go long or hit the net, and the score keeps up."
    ],
    [
     362,
     "Ten Pin",
     "Down the lane from behind the bowler. Pins scatter, the sweep clears, the scoreboard keeps all ten frames."
    ],
    [
     363,
     "Break",
     "A pool table from above. Shot after shot lined up and played, balls rattling into the pockets."
    ],
    [
     364,
     "Curling",
     "The house end of a curling sheet. Stones glide and curl in while the sweepers scrub ahead of them."
    ],
    [
     365,
     "Lanes",
     "A pool from above with sunlight netting the water. Swimmers tumble-turn at the wall."
    ],
    [
     366,
     "Slalom",
     "Looking down on a skier carving through the gates. Every turn leaves its tracks in the snow."
    ],
    [
     367,
     "Peloton",
     "A road race from the helicopter. The bunch flows round the bends, a breakaway dangles up the road."
    ],
    [
     368,
     "Free Throws",
     "Shot after shot from the free throw line. Swish, rattle in, or clang."
    ],
    [
     369,
     "Eights",
     "Rowing eights racing up a river, every catch leaving a pair of puddles behind."
    ],
    [
     370,
     "Playbook",
     "A coach draws a play on the board, the marks run their routes, and the eraser wipes it clean."
    ]
   ],
   "touch": 1
  },
  {
   "key": "377",
   "name": "Mother Lode",
   "fam": "Mineral",
   "set": "Pixel III",
   "drop": 1,
   "supply": 8,
   "brief": "A cut-away hillside. Miners sink a shaft, follow the veins, and the carts trundle the ore home.",
   "species": [
    [
     377,
     "Mother Lode",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "1055",
   "name": "Desktop",
   "fam": "Desktop",
   "set": "Pixel III",
   "drop": 1,
   "supply": 1000,
   "brief": "An old desktop that still works. Go ahead, click things.",
   "species": [
    [
     381,
     "Windows",
     "A whole desktop that runs. Windows open, stack, slide and close, and the taskbar keeps up."
    ],
    [
     383,
     "Setup",
     "An installer, page by page: licence, folder, components, a long copy with file names flickering, then a restart."
    ],
    [
     384,
     "Explorer",
     "A file manager browsing itself. The folders are named after the collection."
    ],
    [
     385,
     "Lasso",
     "Just the pointer and the icons. It lassos a few and moves them somewhere new, or into the bin."
    ],
    [
     387,
     "Chat",
     "An old messenger. Friends sign on and off with a creak of the door, and the chat scrolls."
    ],
    [
     388,
     "Hung Window",
     "The machine has hung. The error box is dragged around and every position it passes through stays behind."
    ],
    [
     389,
     "Sweeper",
     "Minesweeper that plays itself: opens clearings, reads the numbers, flags what it is sure of and only guesses when it must."
    ],
    [
     382,
     "Paint",
     "A paint program painting by itself, tool by tool: sky, sun, hills, a house, sprayed grass, a scribbled signature."
    ],
    [
     390,
     "Icon Editor",
     "An icon editor at work. A pencil fills a fat-bit grid, often in mirror mode, and finished icons line up below."
    ]
   ],
   "touch": 1
  },
  {
   "key": "386",
   "name": "Corner",
   "fam": "Desktop",
   "set": "Pixel III",
   "drop": 1,
   "supply": 64,
   "brief": "A logo bounces round a dark screen, changing colour at every wall. Every so often it lands exactly in the corner.",
   "species": [
    [
     386,
     "Corner",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "417",
   "name": "Glow Wall",
   "fam": "Lasers",
   "set": "Pixel IV",
   "drop": 1,
   "supply": 64,
   "brief": "A laser writes the collection’s words on a glow-in-the-dark wall, and the wall remembers every line.",
   "species": [
    [
     417,
     "Glow Wall",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "418",
   "name": "Liquid Sky",
   "fam": "Lasers",
   "set": "Pixel IV",
   "drop": 1,
   "supply": 512,
   "brief": "Two laser sheets fanned through drifting haze, seen from below. Slow waves of smoke roll across the ceiling.",
   "species": [
    [
     418,
     "Liquid Sky",
     ""
    ]
   ]
  },
  {
   "key": "436",
   "name": "Maxwell’s Demon",
   "fam": "Particle Life",
   "set": "Pixel IV",
   "drop": 1,
   "supply": 8,
   "brief": "A box of gas and a demon at a tiny gate who only lets the fast ones right and the slow ones left. Every forty seconds it changes its mind.",
   "species": [
    [
     436,
     "Maxwell’s Demon",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "440",
   "name": "Ferrofluid",
   "fam": "Particle Life",
   "set": "Pixel IV",
   "drop": 1,
   "supply": 64,
   "brief": "Magnetic beads in a turning field. They string themselves into chains, break when the field fades, and knit back together.",
   "species": [
    [
     440,
     "Ferrofluid",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "499",
   "name": "Onion",
   "fam": "Algorithms",
   "set": "Pixel IV",
   "drop": 1,
   "supply": 96,
   "brief": "A cloud of points peeled like an onion, one hull at a time, until only the core is left.",
   "species": [
    [
     499,
     "Onion",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "pfp1-001",
   "name": "Sheet Spirits",
   "fam": "Pixel Portraits",
   "set": "Set A",
   "drop": 2,
   "supply": 4000,
   "brief": "Little ghosts in two colours, and the things that haunt with them. Some are so faint only the face is left.",
   "species": [
    [
     1,
     "Sheet Spirits",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 476
  },
  {
   "key": "pfp1-002",
   "name": "Pond Pocket",
   "fam": "Pixel Portraits",
   "set": "Set A",
   "drop": 2,
   "supply": 4000,
   "brief": "A frog on an old pocket screen. Bring it a fly.",
   "species": [
    [
     2,
     "Pond Pocket",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 429
  },
  {
   "key": "pfp1-003",
   "name": "Sea Rogues",
   "fam": "Pixel Portraits",
   "set": "Set A",
   "drop": 2,
   "supply": 4000,
   "brief": "A pirate crew, one portrait at a time. Every so often something comes up from the deep.",
   "species": [
    [
     3,
     "Sea Rogues",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 455
  },
  {
   "key": "pfp1-004",
   "name": "Hedge Wizards",
   "fam": "Pixel Portraits",
   "set": "Set A",
   "drop": 2,
   "supply": 4000,
   "brief": "Village wizards, lit by whatever is on the end of the staff. Tap to cast.",
   "species": [
    [
     4,
     "Hedge Wizards",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 333
  },
  {
   "key": "pfp1-005",
   "name": "Cubelings",
   "fam": "Pixel Portraits",
   "set": "Set B",
   "drop": 2,
   "supply": 4000,
   "brief": "Small cube creatures. Very soft. Hold one down, then let go.",
   "species": [
    [
     5,
     "Cubelings",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 455
  },
  {
   "key": "pfp1-007",
   "name": "Hood Cats",
   "fam": "Pixel Portraits",
   "set": "Set B",
   "drop": 2,
   "supply": 4000,
   "brief": "Cats in hoods. Some hoods are other animals. Some are fruit.",
   "species": [
    [
     7,
     "Hood Cats",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 500
  },
  {
   "key": "pfp1-008",
   "name": "Signal Aliens",
   "fam": "Pixel Portraits",
   "set": "Set B",
   "drop": 2,
   "supply": 4000,
   "brief": "Someone out there is calling. Tap to answer.",
   "species": [
    [
     8,
     "Signal Aliens",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 500
  },
  {
   "key": "pfp1-009",
   "name": "Spore Kin",
   "fam": "Pixel Portraits",
   "set": "Set B",
   "drop": 2,
   "supply": 4000,
   "brief": "Tiny mushroom folk on a very chunky grid. Tap the cap for spores.",
   "species": [
    [
     9,
     "Spore Kin",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 500
  },
  {
   "key": "pfp1-036",
   "name": "Gremlin Works",
   "fam": "Creatures & Monsters",
   "set": "Set C",
   "drop": 2,
   "supply": 4000,
   "brief": "Gremlins with whatever they took apart today. Don't get too close.",
   "species": [
    [
     36,
     "Gremlin Works",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 420
  },
  {
   "key": "pfp1-041",
   "name": "One Line",
   "fam": "Faces & People",
   "set": "Set C",
   "drop": 2,
   "supply": 4000,
   "brief": "A new person in one line, every time. Drop some watercolour on them.",
   "species": [
    [
     41,
     "One Line",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 435
  },
  {
   "key": "pfp1-044",
   "name": "Two Sides",
   "fam": "Faces & People",
   "set": "Set C",
   "drop": 2,
   "supply": 4000,
   "brief": "Every sitter from the front and the side at once.",
   "species": [
    [
     44,
     "Two Sides",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 333
  },
  {
   "key": "pfp1-047",
   "name": "Wobble Folk",
   "fam": "Faces & People",
   "set": "Set C",
   "drop": 2,
   "supply": 4000,
   "brief": "Doodles from the margins of notebooks and napkins, still a little alive.",
   "species": [
    [
     47,
     "Wobble Folk",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 417
  },
  {
   "key": "pfp1-051",
   "name": "Primer",
   "fam": "Minimal & Geometric",
   "set": "Set D",
   "drop": 2,
   "supply": 4000,
   "brief": "Faces made from the first shapes you learn, in primary inks.",
   "species": [
    [
     51,
     "Primer",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 385
  },
  {
   "key": "pfp1-056",
   "name": "One Mark",
   "fam": "Minimal & Geometric",
   "set": "Set D",
   "drop": 2,
   "supply": 4000,
   "brief": "A silhouette, and one mark where the eyes should be. It's watching.",
   "species": [
    [
     56,
     "One Mark",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 400
  },
  {
   "key": "pfp1-057",
   "name": "Glyphs",
   "fam": "Minimal & Geometric",
   "set": "Set D",
   "drop": 2,
   "supply": 4000,
   "brief": "Faces set in type. Every tap is a new expression.",
   "species": [
    [
     57,
     "Glyphs",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 400
  },
  {
   "key": "pfp1-058",
   "name": "Buzz Heads",
   "fam": "Minimal & Geometric",
   "set": "Set D",
   "drop": 2,
   "supply": 4000,
   "brief": "Loud little figures. The buzz around them says how they feel.",
   "species": [
    [
     58,
     "Buzz Heads",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 450
  },
  {
   "key": "pfp1-061",
   "name": "Clay Folk",
   "fam": "Rendered 3D",
   "set": "Set E",
   "drop": 2,
   "supply": 4000,
   "brief": "Plasticine people on a stop-motion set. Swap the mouth and see who they become.",
   "species": [
    [
     61,
     "Clay Folk",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 400
  },
  {
   "key": "pfp1-069",
   "name": "Peg Folk",
   "fam": "Rendered 3D",
   "set": "Set E",
   "drop": 2,
   "supply": 4000,
   "brief": "Wooden peg dolls, turned and painted by hand. The old ones are worn back to the wood.",
   "species": [
    [
     69,
     "Peg Folk",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 400
  },
  {
   "key": "pfp1-082",
   "name": "Skipping Stones",
   "fam": "Things with Faces",
   "set": "Set E",
   "drop": 2,
   "supply": 4000,
   "brief": "Beach pebbles with faces, printed in two inks. Skip one across the page.",
   "species": [
    [
     82,
     "Skipping Stones",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 500
  },
  {
   "key": "pfp1-083",
   "name": "Sill Folk",
   "fam": "Things with Faces",
   "set": "Set E",
   "drop": 2,
   "supply": 4000,
   "brief": "Houseplants with faces on a sunny shelf. Water them and see what happens.",
   "species": [
    [
     83,
     "Sill Folk",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 367
  },
  {
   "key": "pfp1-085",
   "name": "Little Steamers",
   "fam": "Things with Faces",
   "set": "Set F",
   "drop": 2,
   "supply": 4000,
   "brief": "Dumplings in watercolour, fresh from the steamer. Poke one.",
   "species": [
    [
     85,
     "Little Steamers",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 500
  },
  {
   "key": "pfp1-101",
   "name": "Rattle Crew",
   "fam": "Pixel Portraits II",
   "set": "Set F",
   "drop": 2,
   "supply": 4000,
   "brief": "Skeletons in four colours, the way the old screens had them.",
   "species": [
    [
     101,
     "Rattle Crew",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 455
  },
  {
   "key": "pfp1-102",
   "name": "Night Panel",
   "fam": "Pixel Portraits II",
   "set": "Set F",
   "drop": 2,
   "supply": 4000,
   "brief": "A lemur on an old backlit screen, close enough to see the colours split apart. Bring a torch.",
   "species": [
    [
     102,
     "Night Panel",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 455
  },
  {
   "key": "pfp1-103",
   "name": "Rooftop Clan",
   "fam": "Pixel Portraits II",
   "set": "Set F",
   "drop": 2,
   "supply": 4000,
   "brief": "Ninjas, drawn inside the limits of an old home console. Blink and it's a log.",
   "species": [
    [
     103,
     "Rooftop Clan",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 455
  },
  {
   "key": "pfp1-105",
   "name": "Item Shop",
   "fam": "Pixel Portraits II",
   "set": "Set G",
   "drop": 2,
   "supply": 4000,
   "brief": "The shopkeeper from every RPG you ever played. Go ahead, buy something.",
   "species": [
    [
     105,
     "Item Shop",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 455
  },
  {
   "key": "pfp1-107",
   "name": "Ice Bits",
   "fam": "Pixel Portraits II",
   "set": "Set G",
   "drop": 2,
   "supply": 4000,
   "brief": "A snowman in 64 dots, every one placed by hand. Throw a snowball.",
   "species": [
    [
     107,
     "Ice Bits",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 455
  },
  {
   "key": "pfp1-110",
   "name": "Page Parrots",
   "fam": "Pixel Portraits II",
   "set": "Set G",
   "drop": 2,
   "supply": 4000,
   "brief": "Parrots built from teletext. Tap a tune and they'll sing it back.",
   "species": [
    [
     110,
     "Page Parrots",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 455
  },
  {
   "key": "pfp1-201",
   "name": "Clash Beetles",
   "fam": "Pixel Portraits III",
   "set": "Set G",
   "drop": 2,
   "supply": 4000,
   "brief": "Beetles on an old home computer, where the colours fight over every square.",
   "species": [
    [
     201,
     "Clash Beetles",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 370
  },
  {
   "key": "pfp1-204",
   "name": "Flood Fill",
   "fam": "Pixel Portraits III",
   "set": "Set H",
   "drop": 2,
   "supply": 4000,
   "brief": "A duck drawn with a mouse in an old paint program. You have the mouse now.",
   "species": [
    [
     204,
     "Flood Fill",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 370
  },
  {
   "key": "pfp1-205",
   "name": "Soft Steps",
   "fam": "Pixel Portraits III",
   "set": "Set H",
   "drop": 2,
   "supply": 4000,
   "brief": "Narwhals in careful, hand-smoothed pixels. The tusk rings like glass.",
   "species": [
    [
     205,
     "Soft Steps",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 385
  },
  {
   "key": "pfp1-206",
   "name": "Stomp Frames",
   "fam": "Pixel Portraits III",
   "set": "Set H",
   "drop": 2,
   "supply": 4000,
   "brief": "A yeti with exactly two frames of animation. It makes them count.",
   "species": [
    [
     206,
     "Stomp Frames",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 370
  },
  {
   "key": "pfp1-208",
   "name": "Pattern Plates",
   "fam": "Pixel Portraits III",
   "set": "Set H",
   "drop": 2,
   "supply": 4000,
   "brief": "Armadillos in black and white dots, from the first little desktops.",
   "species": [
    [
     208,
     "Pattern Plates",
     ""
    ]
   ],
   "rt": "pfp1",
   "touch": 1,
   "music": 1,
   "lg": 385
  },
  {
   "key": "drop03-001",
   "name": "Roundabout",
   "fam": "Fairground",
   "set": "Fairground",
   "drop": 3,
   "supply": 256,
   "brief": "A carousel going round to an organ waltz. Push it faster if you like.",
   "species": [
    [
     1,
     "Roundabout",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-002",
   "name": "Dusk Wheel",
   "fam": "Fairground",
   "set": "Fairground",
   "drop": 3,
   "supply": 128,
   "brief": "A big wheel at dusk. The bulbs come on as the sun goes down.",
   "species": [
    [
     2,
     "Dusk Wheel",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-003",
   "name": "Flying Chairs",
   "fam": "Fairground",
   "set": "Fairground",
   "drop": 3,
   "supply": 256,
   "brief": "Chairs on chains, swinging out wide. Someone always lets go of a balloon.",
   "species": [
    [
     3,
     "Flying Chairs",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-004",
   "name": "Out and Back",
   "fam": "Fairground",
   "set": "Fairground",
   "drop": 3,
   "supply": 256,
   "brief": "A whole roller coaster from the side. Some trains don't quite make the hill.",
   "species": [
    [
     4,
     "Out and Back",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-005",
   "name": "Dodgems",
   "fam": "Fairground",
   "set": "Fairground",
   "drop": 3,
   "supply": 256,
   "brief": "Dodgem cars bumping each other about. Take the one with the star.",
   "species": [
    [
     5,
     "Dodgems",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-006",
   "name": "Helter Skelter",
   "fam": "Fairground",
   "set": "Fairground",
   "drop": 3,
   "supply": 256,
   "brief": "A helter-skelter and a gang of kids who never get tired of it.",
   "species": [
    [
     6,
     "Helter Skelter",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-007",
   "name": "Ring the Bell",
   "fam": "Fairground",
   "set": "Fairground",
   "drop": 3,
   "supply": 128,
   "brief": "The queue for the high striker at the fair. Not everyone rings the bell.",
   "species": [
    [
     7,
     "Ring the Bell",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-008",
   "name": "Tin Ducks",
   "fam": "Fairground",
   "set": "Fairground",
   "drop": 3,
   "supply": 256,
   "brief": "A shooting gallery of tin ducks on chains. Ten hits rings the bell.",
   "species": [
    [
     8,
     "Tin Ducks",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-010",
   "name": "Teacups",
   "fam": "Fairground",
   "set": "Fairground",
   "drop": 3,
   "supply": 256,
   "brief": "The teacup ride from above. Spin hard enough and the hats come off.",
   "species": [
    [
     10,
     "Teacups",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-020",
   "name": "Roll to Win",
   "fam": "Coin-Op",
   "set": "Coin-Op",
   "drop": 3,
   "supply": 256,
   "brief": "A roll-a-ball race at the arcade. Roll well and your racer gets ahead.",
   "species": [
    [
     20,
     "Roll to Win",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-1001",
   "name": "Coin-Op",
   "fam": "Coin-Op",
   "set": "Coin-Op",
   "drop": 3,
   "supply": 2560,
   "brief": "Coin machines from the arcade and the corner shop. Every one of them plays.",
   "species": [
    [
     11,
     "Soft Catch",
     "A claw machine full of soft toys. Sometimes it even holds on.",
     512
    ],
    [
     12,
     "Overhang",
     "A seaside coin pusher, and the little prizes sweating at the edge.",
     512
    ],
    [
     13,
     "Coil Row",
     "A snack machine glowing on its own at night. Whatever you drop, a visitor eats.",
     512
    ],
    [
     14,
     "Bubble Arch",
     "A jukebox with bubbles in its arch, and a small crowd that will dance to anything.",
     256
    ],
    [
     15,
     "Capsule Crank",
     "A capsule toy machine. Turn the handle and someone new hops out.",
     512
    ],
    [
     16,
     "Four Flashes",
     "A photo booth with the curtain drawn. Only the shoes give anyone away.",
     256
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-021",
   "name": "Drawing Out",
   "fam": "Workshops",
   "set": "Workshops",
   "drop": 3,
   "supply": 512,
   "brief": "A small smith at the anvil. Every blow rings a note, and the cat watches the sparks.",
   "species": [
    [
     21,
     "Drawing Out",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-023",
   "name": "Under the Loupe",
   "fam": "Workshops",
   "set": "Workshops",
   "drop": 3,
   "supply": 256,
   "brief": "An open watch on the clockmaker's bench. Hold the loupe over it and listen.",
   "species": [
    [
     23,
     "Under the Loupe",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-026",
   "name": "Alembic",
   "fam": "Workshops",
   "set": "Workshops",
   "drop": 3,
   "supply": 512,
   "brief": "An alchemist's still at night, one drop at a time. A small familiar keeps it company.",
   "species": [
    [
     26,
     "Alembic",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-035",
   "name": "Chestnut Corner",
   "fam": "Street Food",
   "set": "Street Food",
   "drop": 3,
   "supply": 512,
   "brief": "Chestnuts roasting on a winter street corner. The sparrows get the ones that jump.",
   "species": [
    [
     35,
     "Chestnut Corner",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-037",
   "name": "Syrup Snow",
   "fam": "Street Food",
   "set": "Street Food",
   "drop": 3,
   "supply": 256,
   "brief": "Shaved ice with the syrup soaking through. Mostly for children.",
   "species": [
    [
     37,
     "Syrup Snow",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-038",
   "name": "Kettle Pop",
   "fam": "Street Food",
   "set": "Street Food",
   "drop": 3,
   "supply": 256,
   "brief": "A popcorn cart and its queue. The dog gets one now and then.",
   "species": [
    [
     38,
     "Kettle Pop",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-041",
   "name": "Showroom",
   "fam": "Sprite Stacks",
   "set": "Sprite Stacks",
   "drop": 3,
   "supply": 256,
   "brief": "A vintage car turning on a showroom floor. Go on, honk the horn.",
   "species": [
    [
     41,
     "Showroom",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-042",
   "name": "Basin Tow",
   "fam": "Sprite Stacks",
   "set": "Sprite Stacks",
   "drop": 3,
   "supply": 256,
   "brief": "A little tug towing things round the harbour. The ducks want your bread, and so do the gulls.",
   "species": [
    [
     42,
     "Basin Tow",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-043",
   "name": "Mill Mound",
   "fam": "Sprite Stacks",
   "set": "Sprite Stacks",
   "drop": 3,
   "supply": 512,
   "brief": "A windmill you can walk all the way round. Give the sails a spin.",
   "species": [
    [
     43,
     "Mill Mound",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-044",
   "name": "Cut Cake",
   "fam": "Sprite Stacks",
   "set": "Sprite Stacks",
   "drop": 3,
   "supply": 256,
   "brief": "A tall cake on a stand with a slice already gone. It wobbles when you cut it.",
   "species": [
    [
     44,
     "Cut Cake",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-046",
   "name": "Glass Lake",
   "fam": "Sprite Stacks",
   "set": "Sprite Stacks",
   "drop": 3,
   "supply": 128,
   "brief": "A canoe on a lake so still it is there twice.",
   "species": [
    [
     46,
     "Glass Lake",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-047",
   "name": "Ringing Stones",
   "fam": "Sprite Stacks",
   "set": "Sprite Stacks",
   "drop": 3,
   "supply": 128,
   "brief": "A circle of standing stones. Each one rings when you touch it.",
   "species": [
    [
     47,
     "Ringing Stones",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-048",
   "name": "Strongbox",
   "fam": "Sprite Stacks",
   "set": "Sprite Stacks",
   "drop": 3,
   "supply": 128,
   "brief": "A treasure chest. Open it and everything comes flying out.",
   "species": [
    [
     48,
     "Strongbox",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-050",
   "name": "Furrow Ride",
   "fam": "Sprite Stacks",
   "set": "Sprite Stacks",
   "drop": 3,
   "supply": 512,
   "brief": "A tractor working a field lane by lane, leaving stripes behind it.",
   "species": [
    [
     50,
     "Furrow Ride",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-051",
   "name": "Studded Door",
   "fam": "Lit Relief",
   "set": "Lit Relief",
   "drop": 3,
   "supply": 128,
   "brief": "An old door at night, lit only by your lantern. Someone inside comes to the grille.",
   "species": [
    [
     51,
     "Studded Door",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-052",
   "name": "Lantern Walk",
   "fam": "Lit Relief",
   "set": "Lit Relief",
   "drop": 3,
   "supply": 256,
   "brief": "A kid in a raincoat walking a lantern home through the alleys.",
   "species": [
    [
     52,
     "Lantern Walk",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-055",
   "name": "Gauge Room",
   "fam": "Lit Relief",
   "set": "Lit Relief",
   "drop": 3,
   "supply": 256,
   "brief": "The gauges of a dark engine room, found by torch. The cat sleeps on the warm pipe.",
   "species": [
    [
     55,
     "Gauge Room",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-057",
   "name": "Torchlit Herd",
   "fam": "Lit Relief",
   "set": "Lit Relief",
   "drop": 3,
   "supply": 256,
   "brief": "A cave wall of painted animals. Where the torch falls, they walk.",
   "species": [
    [
     57,
     "Torchlit Herd",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-1002",
   "name": "Lamplight",
   "fam": "Lit Relief",
   "set": "Lit Relief",
   "drop": 3,
   "supply": 1536,
   "brief": "Things close enough to touch, lit by one lamp you move yourself.",
   "species": [
    [
     53,
     "Coin Cabinet",
     "A tray of small coins with animals on them. Something always comes to play with them.",
     512
    ],
    [
     54,
     "Tooled Binding",
     "Old leather bindings under a low lamp. A bookworm lives in this one.",
     512
    ],
    [
     58,
     "Deep Buttoning",
     "Buttoned stools and dog beds under a lamp. The pup gets the springiest one.",
     256
    ],
    [
     60,
     "Tin Ceiling",
     "A pressed-tin ceiling under a swinging lamp. The geckos are here for the midges.",
     256
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-083",
   "name": "Pocket Game",
   "fam": "Pixel Media",
   "set": "Pixel Media",
   "drop": 3,
   "supply": 512,
   "brief": "A cheap pocket game with one game in it. Catch things.",
   "species": [
    [
     83,
     "Pocket Game",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-089",
   "name": "Tile Bank",
   "fam": "Pixel Media",
   "set": "Pixel Media",
   "drop": 3,
   "supply": 256,
   "brief": "A village from an old handheld game, built out of about twenty tiles.",
   "species": [
    [
     89,
     "Tile Bank",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-091",
   "name": "Liftoff",
   "fam": "Outposts",
   "set": "Outposts",
   "drop": 3,
   "supply": 512,
   "brief": "A rocket on the pad, counting down. Then it's gone.",
   "species": [
    [
     91,
     "Liftoff",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-094",
   "name": "Far Rover",
   "fam": "Outposts",
   "set": "Outposts",
   "drop": 3,
   "supply": 256,
   "brief": "A rover alone on another world. The locals come to see what it found.",
   "species": [
    [
     94,
     "Far Rover",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-095",
   "name": "Sonde Night",
   "fam": "Outposts",
   "set": "Outposts",
   "drop": 3,
   "supply": 256,
   "brief": "A weather station in the snow, letting a balloon go.",
   "species": [
    [
     95,
     "Sonde Night",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-096",
   "name": "Deep Station",
   "fam": "Outposts",
   "set": "Outposts",
   "drop": 3,
   "supply": 512,
   "brief": "A station on the seabed and the little sub that visits it.",
   "species": [
    [
     96,
     "Deep Station",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-097",
   "name": "Listening Array",
   "fam": "Outposts",
   "set": "Outposts",
   "drop": 3,
   "supply": 512,
   "brief": "A valley of dishes, all turning to listen to one spot in the sky.",
   "species": [
    [
     97,
     "Listening Array",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-098",
   "name": "Moon Garden",
   "fam": "Outposts",
   "set": "Outposts",
   "drop": 3,
   "supply": 512,
   "brief": "A greenhouse on the moon. Things fall slowly here, the fruit included.",
   "species": [
    [
     98,
     "Moon Garden",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-100",
   "name": "Core Camp",
   "fam": "Outposts",
   "set": "Outposts",
   "drop": 3,
   "supply": 256,
   "brief": "A drilling camp on the ice, and all the years of snow under it.",
   "species": [
    [
     100,
     "Core Camp",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-101",
   "name": "Toy Theatre",
   "fam": "Backstage",
   "set": "Backstage",
   "drop": 3,
   "supply": 256,
   "brief": "A paper theatre on a table, by lamplight. The actors ride on little tin slides.",
   "species": [
    [
     101,
     "Toy Theatre",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-102",
   "name": "String Bridge",
   "fam": "Backstage",
   "set": "Backstage",
   "drop": 3,
   "supply": 128,
   "brief": "Marionettes on their strings, and the puppeteers working them from the bridge above.",
   "species": [
    [
     102,
     "String Bridge",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-103",
   "name": "Shadow Play",
   "fam": "Backstage",
   "set": "Backstage",
   "drop": 3,
   "supply": 256,
   "brief": "A shadow play lit from behind. A little cut-out chases the lamp.",
   "species": [
    [
     103,
     "Shadow Play",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-104",
   "name": "Storm Machine",
   "fam": "Backstage",
   "set": "Backstage",
   "drop": 3,
   "supply": 128,
   "brief": "A stage storm at sea, made of rollers, a cut-out ship and a sheet of thunder.",
   "species": [
    [
     104,
     "Storm Machine",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-105",
   "name": "Scene Change",
   "fam": "Backstage",
   "set": "Backstage",
   "drop": 3,
   "supply": 1000,
   "brief": "A revolving stage. Spin it too hard and the hats fly off.",
   "species": [
    [
     105,
     "Scene Change",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-106",
   "name": "Curtain Call",
   "fam": "Backstage",
   "set": "Backstage",
   "drop": 3,
   "supply": 512,
   "brief": "The curtain call. Throw a bouquet.",
   "species": [
    [
     106,
     "Curtain Call",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-109",
   "name": "From the Gods",
   "fam": "Backstage",
   "set": "Backstage",
   "drop": 3,
   "supply": 256,
   "brief": "The opera, from the cheapest seats. Paper planes optional.",
   "species": [
    [
     109,
     "From the Gods",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-122",
   "name": "Long Reach",
   "fam": "Walkers",
   "set": "Walkers",
   "drop": 3,
   "supply": 512,
   "brief": "A harvester on long spider legs, stalking through a field.",
   "species": [
    [
     122,
     "Long Reach",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-126",
   "name": "Marsh Strider",
   "fam": "Walkers",
   "set": "Walkers",
   "drop": 3,
   "supply": 512,
   "brief": "A little cabin on long stilts, wading through a marsh like a heron.",
   "species": [
    [
     126,
     "Marsh Strider",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-131",
   "name": "Henhouse",
   "fam": "Farmstead",
   "set": "Farmstead",
   "drop": 3,
   "supply": 512,
   "brief": "A hen house at sunrise. The rooster thinks he is in charge.",
   "species": [
    [
     131,
     "Henhouse",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-134",
   "name": "Combine Rounds",
   "fam": "Farmstead",
   "set": "Farmstead",
   "drop": 3,
   "supply": 512,
   "brief": "Harvest day. The combine goes round and the tractor comes to collect.",
   "species": [
    [
     134,
     "Combine Rounds",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-135",
   "name": "Paddy Steps",
   "fam": "Farmstead",
   "set": "Farmstead",
   "drop": 3,
   "supply": 256,
   "brief": "Rice terraces full of sky, and the planters working their way across.",
   "species": [
    [
     135,
     "Paddy Steps",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-136",
   "name": "Windfalls",
   "fam": "Farmstead",
   "set": "Farmstead",
   "drop": 3,
   "supply": 256,
   "brief": "An apple tree at picking time. Shake it and catch what falls.",
   "species": [
    [
     136,
     "Windfalls",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-138",
   "name": "Scarecrow",
   "fam": "Farmstead",
   "set": "Farmstead",
   "drop": 3,
   "supply": 512,
   "brief": "A scarecrow, and the crows who are not fooled at all.",
   "species": [
    [
     138,
     "Scarecrow",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-141",
   "name": "Pigeonholes",
   "fam": "Post Office",
   "set": "Post Office",
   "drop": 3,
   "supply": 512,
   "brief": "A post office sorting frame. Every hole plays a note.",
   "species": [
    [
     141,
     "Pigeonholes",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-142",
   "name": "Capsule Post",
   "fam": "Post Office",
   "set": "Post Office",
   "drop": 3,
   "supply": 256,
   "brief": "Brass tubes delivering the post, and the cat who watches every one arrive.",
   "species": [
    [
     142,
     "Capsule Post",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-146",
   "name": "Perforator",
   "fam": "Post Office",
   "set": "Post Office",
   "drop": 3,
   "supply": 512,
   "brief": "A sheet of new stamps being perforated. The little creatures on them shut their eyes.",
   "species": [
    [
     146,
     "Perforator",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-147",
   "name": "Morning Round",
   "fam": "Post Office",
   "set": "Post Office",
   "drop": 3,
   "supply": 512,
   "brief": "A postie on a bike doing the morning round. Every letterbox wakes someone up.",
   "species": [
    [
     147,
     "Morning Round",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-148",
   "name": "Dead Letters",
   "fam": "Post Office",
   "set": "Post Office",
   "drop": 3,
   "supply": 256,
   "brief": "The office for letters nobody could deliver. The tortoise checks every one.",
   "species": [
    [
     148,
     "Dead Letters",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-151",
   "name": "Potion Counter",
   "fam": "Quest Hall",
   "set": "Quest Hall",
   "drop": 3,
   "supply": 256,
   "brief": "A potion seller's counter. Some of the bottles look back at you.",
   "species": [
    [
     151,
     "Potion Counter",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-156",
   "name": "Storm Tower",
   "fam": "Quest Hall",
   "set": "Quest Hall",
   "drop": 3,
   "supply": 256,
   "brief": "A wizard on a tower in a storm, hoping to get struck.",
   "species": [
    [
     156,
     "Storm Tower",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-157",
   "name": "Slime Pit",
   "fam": "Quest Hall",
   "set": "Quest Hall",
   "drop": 3,
   "supply": 512,
   "brief": "Slime volleyball. First to seven.",
   "species": [
    [
     157,
     "Slime Pit",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-159",
   "name": "Inn Yard",
   "fam": "Quest Hall",
   "set": "Quest Hall",
   "drop": 3,
   "supply": 512,
   "brief": "The yard of an adventurers' inn on a quiet day.",
   "species": [
    [
     159,
     "Inn Yard",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-161",
   "name": "Top Deck",
   "fam": "In Transit",
   "set": "In Transit",
   "drop": 3,
   "supply": 256,
   "brief": "Upstairs at the front of the night bus.",
   "species": [
    [
     161,
     "Top Deck",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-163",
   "name": "Lower Berth",
   "fam": "In Transit",
   "set": "In Transit",
   "drop": 3,
   "supply": 256,
   "brief": "A sleeper compartment on a night train. The country goes by in the dark.",
   "species": [
    [
     163,
     "Lower Berth",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-164",
   "name": "Gull Escort",
   "fam": "In Transit",
   "set": "In Transit",
   "drop": 3,
   "supply": 512,
   "brief": "Gulls hanging alongside a ferry. They know about the chips.",
   "species": [
    [
     164,
     "Gull Escort",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-165",
   "name": "Reclaim",
   "fam": "In Transit",
   "set": "In Transit",
   "drop": 3,
   "supply": 256,
   "brief": "Baggage reclaim. Everyone is waiting for theirs.",
   "species": [
    [
     165,
     "Reclaim",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-168",
   "name": "Under the Clock",
   "fam": "In Transit",
   "set": "In Transit",
   "drop": 3,
   "supply": 64,
   "brief": "A station concourse under a great clock. The pigeons keep the hours too.",
   "species": [
    [
     168,
     "Under the Clock",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-169",
   "name": "Gateline",
   "fam": "In Transit",
   "set": "In Transit",
   "drop": 3,
   "supply": 128,
   "brief": "Ticket gates from above. Everyone picks the shortest queue.",
   "species": [
    [
     169,
     "Gateline",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-174",
   "name": "Sky Pool",
   "fam": "Rooftops",
   "set": "Rooftops",
   "drop": 3,
   "supply": 256,
   "brief": "A swimming pool slung between two towers, with the city under the glass.",
   "species": [
    [
     174,
     "Sky Pool",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-175",
   "name": "Second Feature",
   "fam": "Rooftops",
   "set": "Rooftops",
   "drop": 3,
   "supply": 256,
   "brief": "A rooftop cinema at dusk, from the back row.",
   "species": [
    [
     175,
     "Second Feature",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-176",
   "name": "Wet Tiles",
   "fam": "Rooftops",
   "set": "Rooftops",
   "drop": 3,
   "supply": 512,
   "brief": "Roofs in the rain, and a cat picking its way along the ridge.",
   "species": [
    [
     176,
     "Wet Tiles",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-177",
   "name": "Panel Wash",
   "fam": "Rooftops",
   "set": "Rooftops",
   "drop": 3,
   "supply": 128,
   "brief": "Someone cleaning solar panels on a roof. Every clean one turns into a mirror.",
   "species": [
    [
     177,
     "Panel Wash",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-178",
   "name": "Tin Garden",
   "fam": "Rooftops",
   "set": "Rooftops",
   "drop": 3,
   "supply": 1000,
   "brief": "A rooftop garden grown in tins, buckets and a bathtub.",
   "species": [
    [
     178,
     "Tin Garden",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-179",
   "name": "Paste Up",
   "fam": "Rooftops",
   "set": "Rooftops",
   "drop": 3,
   "supply": 256,
   "brief": "A new poster going up over the old one, high above the street.",
   "species": [
    [
     179,
     "Paste Up",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-180",
   "name": "Skids Down",
   "fam": "Rooftops",
   "set": "Rooftops",
   "drop": 3,
   "supply": 256,
   "brief": "A helicopter coming in to land on a rooftop pad.",
   "species": [
    [
     180,
     "Skids Down",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-191",
   "name": "Geyser Basin",
   "fam": "Wild Places",
   "set": "Wild Places",
   "drop": 3,
   "supply": 512,
   "brief": "A geyser on its own clock, and bison who don't seem to mind.",
   "species": [
    [
     191,
     "Geyser Basin",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-196",
   "name": "Lava Lake",
   "fam": "Wild Places",
   "set": "Wild Places",
   "drop": 3,
   "supply": 1000,
   "brief": "A lake of lava, and the little ember creatures who ride it.",
   "species": [
    [
     196,
     "Lava Lake",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-197",
   "name": "Stone Forest",
   "fam": "Wild Places",
   "set": "Wild Places",
   "drop": 3,
   "supply": 512,
   "brief": "A forest of stone blades, and the sifakas leaping between them.",
   "species": [
    [
     197,
     "Stone Forest",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-199",
   "name": "Caribou Crossing",
   "fam": "Wild Places",
   "set": "Wild Places",
   "drop": 3,
   "supply": 512,
   "brief": "Caribou swimming a tundra river, calves and all.",
   "species": [
    [
     199,
     "Caribou Crossing",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-207",
   "name": "Water Mile",
   "fam": "Wonders",
   "set": "Wonders",
   "drop": 3,
   "supply": 1000,
   "brief": "An aqueduct a mile long, walking off toward the horizon.",
   "species": [
    [
     207,
     "Water Mile",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-208",
   "name": "Spyglass Valley",
   "fam": "Wonders",
   "set": "Wonders",
   "drop": 3,
   "supply": 512,
   "brief": "A lost city in the jungle. Have a look through the spyglass.",
   "species": [
    [
     208,
     "Spyglass Valley",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-209",
   "name": "Spiral Stepwell",
   "fam": "Wonders",
   "set": "Wonders",
   "drop": 3,
   "supply": 512,
   "brief": "A stepwell going down and down. Toss a marigold and see where it lands.",
   "species": [
    [
     209,
     "Spiral Stepwell",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-210",
   "name": "Beacon Line",
   "fam": "Wonders",
   "set": "Wonders",
   "drop": 3,
   "supply": 256,
   "brief": "A chain of lighthouses passing a fire from one to the next.",
   "species": [
    [
     210,
     "Beacon Line",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-213",
   "name": "High Water",
   "fam": "Rivers & Bridges",
   "set": "Rivers & Bridges",
   "drop": 3,
   "supply": 512,
   "brief": "Stepping stones in a river in flood. The ducklings try anyway.",
   "species": [
    [
     213,
     "High Water",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-214",
   "name": "Covered Way",
   "fam": "Rivers & Bridges",
   "set": "Rivers & Bridges",
   "drop": 3,
   "supply": 512,
   "brief": "A covered bridge in the snow, and a kid with a lot of snowballs.",
   "species": [
    [
     214,
     "Covered Way",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-215",
   "name": "Swing Span",
   "fam": "Rivers & Bridges",
   "set": "Rivers & Bridges",
   "drop": 3,
   "supply": 256,
   "brief": "A bridge that swings out of the way when a boat comes.",
   "species": [
    [
     215,
     "Swing Span",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-218",
   "name": "Boat Bridge",
   "fam": "Rivers & Bridges",
   "set": "Rivers & Bridges",
   "drop": 3,
   "supply": 512,
   "brief": "A bridge made of boats. Everyone on it bounces.",
   "species": [
    [
     218,
     "Boat Bridge",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-220",
   "name": "Marsh Boards",
   "fam": "Rivers & Bridges",
   "set": "Rivers & Bridges",
   "drop": 3,
   "supply": 512,
   "brief": "A boardwalk across a reed marsh. Walk too close and the birds go up.",
   "species": [
    [
     220,
     "Marsh Boards",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-221",
   "name": "Hour Parade",
   "fam": "Automata",
   "set": "Automata",
   "drop": 3,
   "supply": 512,
   "brief": "A town clock where little figures come out on the hour.",
   "species": [
    [
     221,
     "Hour Parade",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-224",
   "name": "Picture Clock",
   "fam": "Automata",
   "set": "Automata",
   "drop": 3,
   "supply": 512,
   "brief": "A painting of a harbour where everything moves. The works are round the back.",
   "species": [
    [
     224,
     "Picture Clock",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-225",
   "name": "Cam Band",
   "fam": "Automata",
   "set": "Automata",
   "drop": 3,
   "supply": 256,
   "brief": "A clockwork band on a little stage. Crank it too hard and the hats come off.",
   "species": [
    [
     225,
     "Cam Band",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-227",
   "name": "The Draughtsman",
   "fam": "Automata",
   "set": "Automata",
   "drop": 3,
   "supply": 512,
   "brief": "A brass automaton drawing a picture, one dot at a time.",
   "species": [
    [
     227,
     "The Draughtsman",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-229",
   "name": "Turning Year",
   "fam": "Automata",
   "set": "Automata",
   "drop": 3,
   "supply": 512,
   "brief": "A turntable with four seasons on it, turning a quarter at a time.",
   "species": [
    [
     229,
     "Turning Year",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-242",
   "name": "Oasis",
   "fam": "Caravans",
   "set": "Caravans",
   "drop": 3,
   "supply": 512,
   "brief": "A desert spring, and the camels who come in to drink.",
   "species": [
    [
     242,
     "Oasis",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-244",
   "name": "Ledge Road",
   "fam": "Caravans",
   "set": "Caravans",
   "drop": 3,
   "supply": 256,
   "brief": "Pack mules climbing a road cut into a cliff. One loose stone and they all jump.",
   "species": [
    [
     244,
     "Ledge Road",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-245",
   "name": "Downriver",
   "fam": "Caravans",
   "set": "Caravans",
   "drop": 3,
   "supply": 256,
   "brief": "Barges drifting down a slow river. People live on them.",
   "species": [
    [
     245,
     "Downriver",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-246",
   "name": "Saddle Snow",
   "fam": "Caravans",
   "set": "Caravans",
   "drop": 3,
   "supply": 128,
   "brief": "Shaggy yaks crossing the high snow.",
   "species": [
    [
     246,
     "Saddle Snow",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-248",
   "name": "Spice Gate",
   "fam": "Caravans",
   "set": "Caravans",
   "drop": 3,
   "supply": 256,
   "brief": "Sacks of spice going out through a city gate onto the camels. Anyone in the dust sneezes.",
   "species": [
    [
     248,
     "Spice Gate",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-249",
   "name": "Well Sweep",
   "fam": "Caravans",
   "set": "Caravans",
   "drop": 3,
   "supply": 512,
   "brief": "A well with a long counterweighted beam, and a herd that is thirsty.",
   "species": [
    [
     249,
     "Well Sweep",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-250",
   "name": "Market Arrival",
   "fam": "Caravans",
   "set": "Caravans",
   "drop": 3,
   "supply": 512,
   "brief": "A market square filling up as the caravans come in.",
   "species": [
    [
     250,
     "Market Arrival",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-251",
   "name": "Open Rink",
   "fam": "Winter",
   "set": "Winter",
   "drop": 3,
   "supply": 512,
   "brief": "An outdoor rink. Some skate, some sit down hard.",
   "species": [
    [
     251,
     "Open Rink",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-252",
   "name": "Ice Carver",
   "fam": "Winter",
   "set": "Winter",
   "drop": 3,
   "supply": 512,
   "brief": "Someone carving a figure out of a block of ice.",
   "species": [
    [
     252,
     "Ice Carver",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-253",
   "name": "Through the Ice",
   "fam": "Winter",
   "set": "Winter",
   "drop": 3,
   "supply": 512,
   "brief": "Ice fishing, with the lake cut open underneath.",
   "species": [
    [
     253,
     "Through the Ice",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-254",
   "name": "Sledging Hill",
   "fam": "Winter",
   "set": "Winter",
   "drop": 3,
   "supply": 256,
   "brief": "A sledging hill on a snow day. Build a bump.",
   "species": [
    [
     254,
     "Sledging Hill",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-255",
   "name": "Checkpoint",
   "fam": "Winter",
   "set": "Winter",
   "drop": 3,
   "supply": 256,
   "brief": "Sled dogs resting at a checkpoint. They would like a belly rub.",
   "species": [
    [
     255,
     "Checkpoint",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-256",
   "name": "Ice Line",
   "fam": "Winter",
   "set": "Winter",
   "drop": 3,
   "supply": 256,
   "brief": "A climber going up a frozen waterfall.",
   "species": [
    [
     256,
     "Ice Line",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-257",
   "name": "Snow Forts",
   "fam": "Winter",
   "set": "Winter",
   "drop": 3,
   "supply": 512,
   "brief": "Two snow forts and a snowball fight. First to five hits.",
   "species": [
    [
     257,
     "Snow Forts",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-262",
   "name": "Tilt Table",
   "fam": "Puzzle Boxes",
   "set": "Puzzle Boxes",
   "drop": 3,
   "supply": 512,
   "brief": "A wooden maze with a ball in it. The holes have tenants.",
   "species": [
    [
     262,
     "Tilt Table",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-266",
   "name": "Level Beam",
   "fam": "Puzzle Boxes",
   "set": "Puzzle Boxes",
   "drop": 3,
   "supply": 256,
   "brief": "A balance beam and a row of plump birds. Perch them so it sits level.",
   "species": [
    [
     266,
     "Level Beam",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-267",
   "name": "Ring Vault",
   "fam": "Puzzle Boxes",
   "set": "Puzzle Boxes",
   "drop": 3,
   "supply": 256,
   "brief": "A round vault door. The keeper lives inside.",
   "species": [
    [
     267,
     "Ring Vault",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-269",
   "name": "Bosun's Tangle",
   "fam": "Puzzle Boxes",
   "set": "Puzzle Boxes",
   "drop": 3,
   "supply": 512,
   "brief": "A crew of sea creatures tangled in their own ropes. Walk them apart.",
   "species": [
    [
     269,
     "Bosun's Tangle",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-271",
   "name": "Little Blizzard",
   "fam": "Under Glass",
   "set": "Under Glass",
   "drop": 3,
   "supply": 512,
   "brief": "A snow globe. Give it a shake.",
   "species": [
    [
     271,
     "Little Blizzard",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-274",
   "name": "Wing Dome",
   "fam": "Under Glass",
   "set": "Under Glass",
   "drop": 3,
   "supply": 256,
   "brief": "Butterflies living under a glass bell. Lift it and they get out.",
   "species": [
    [
     274,
     "Wing Dome",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-275",
   "name": "Paperweight",
   "fam": "Under Glass",
   "set": "Under Glass",
   "drop": 3,
   "supply": 512,
   "brief": "A glass paperweight on a page, and a small visitor wandering past.",
   "species": [
    [
     275,
     "Paperweight",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-281",
   "name": "Bone Hall",
   "fam": "Museum Halls",
   "set": "Museum Halls",
   "drop": 3,
   "supply": 512,
   "brief": "Skeletons of creatures that never lived, in a museum hall. Sometimes they get put back wrong.",
   "species": [
    [
     281,
     "Bone Hall",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-285",
   "name": "Meridian",
   "fam": "Museum Halls",
   "set": "Museum Halls",
   "drop": 3,
   "supply": 512,
   "brief": "A globe of a world that doesn't exist. The cat keeps it turning.",
   "species": [
    [
     285,
     "Meridian",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-288",
   "name": "Night Round",
   "fam": "Museum Halls",
   "set": "Museum Halls",
   "drop": 3,
   "supply": 512,
   "brief": "A museum at night. The statues move when the guard isn't looking.",
   "species": [
    [
     288,
     "Night Round",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-289",
   "name": "Pendulum Well",
   "fam": "Museum Halls",
   "set": "Museum Halls",
   "drop": 3,
   "supply": 512,
   "brief": "A long pendulum in a stairwell, knocking over a ring of little dolls.",
   "species": [
    [
     289,
     "Pendulum Well",
     ""
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-1003",
   "name": "Floating Blocks",
   "fam": "Iso Dioramas",
   "set": "Iso Dioramas",
   "drop": 3,
   "supply": 3072,
   "brief": "Little worlds on lumps of floating land, cut away to show the rock underneath.",
   "species": [
    [
     61,
     "Cable Ferry",
     "A chain ferry crossing a river that falls off the edge of the world.",
     512
    ],
    [
     63,
     "High Watch",
     "A fire lookout over a pine forest. Light a tree and see what the ranger does.",
     512
    ],
    [
     64,
     "Steam Baths",
     "Hot pools in the snow. Some days they belong to capybaras.",
     512
    ],
    [
     65,
     "Lock Flight",
     "A canal lock and the narrowboats waiting their turn, each with a pet on the roof.",
     256
    ],
    [
     66,
     "Night Diner",
     "A roadside diner in the desert, open all night. Cars come out of the dark and go back into it.",
     512
    ],
    [
     68,
     "Hut Row",
     "A row of beach huts by the sea. The dog will fetch the ball.",
     256
    ],
    [
     69,
     "Felt Camp",
     "Round felt tents on the steppe, on an ordinary day or a race day.",
     512
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-1004",
   "name": "Sky Isles",
   "fam": "Sky Isles",
   "set": "Sky Isles",
   "drop": 3,
   "supply": 1792,
   "brief": "Life on islands above the clouds. Nobody seems worried about the drop.",
   "species": [
    [
     72,
     "Mooring Mast",
     "Airships coming in to a mast on a floating crag, one at a time.",
     256
    ],
    [
     73,
     "Target Race",
     "Balloons racing to a cross on the ground. Every layer of sky blows a different way.",
     256
    ],
    [
     74,
     "Cloud Angler",
     "Fishing the cloud sea from the edge of an island. The fish are round.",
     512
    ],
    [
     76,
     "Plank Song",
     "A rope bridge between two islands. Every plank plays a note.",
     512
    ],
    [
     77,
     "Windheld",
     "An island that stays up as long as the wind does.",
     256
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-1005",
   "name": "Shopfronts",
   "fam": "Shopfronts",
   "set": "Shopfronts",
   "drop": 3,
   "supply": 2176,
   "brief": "A street of small shops and the people who keep them.",
   "species": [
    [
     111,
     "First Batch",
     "The bakery window before the street wakes up. The sparrows are already waiting.",
     256
    ],
    [
     112,
     "Cut Stems",
     "A florist's front in the noon sun. Pick seven stems and someone comes for the bouquet.",
     512
    ],
    [
     113,
     "Milliner",
     "A hat shop window. On windy days the hats out on the street are the show.",
     256
    ],
    [
     114,
     "Quarter Pound",
     "A sweet shop window and a child with one coin.",
     256
    ],
    [
     115,
     "On Ice",
     "The fishmonger's slab in the early morning. The gulls are patient.",
     256
    ],
    [
     118,
     "Ironmonger",
     "An ironmonger's front, everything hung on hooks. Knock one and they all ring.",
     512
    ],
    [
     120,
     "After Hours",
     "A toy shop after closing. The toys freeze when your torch finds them.",
     128
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop03-1006",
   "name": "Big Top",
   "fam": "Big Top",
   "set": "Big Top",
   "drop": 3,
   "supply": 2560,
   "brief": "One little circus, ten acts. Everyone is round.",
   "species": [
    [
     231,
     "Siteswap",
     "A juggler in the ring, and a dog ready to fetch whatever drops.",
     256
    ],
    [
     232,
     "High Wire",
     "The high wire, seen from the platform. They wobble a lot.",
     256
    ],
    [
     233,
     "Hup",
     "Acrobats building a human pyramid. Lean on it and see.",
     256
    ],
    [
     234,
     "Ring Tracks",
     "A unicycle troupe seen from the rig, drawing in the sawdust as they go.",
     256
    ],
    [
     235,
     "Follow Spot",
     "The circus in the dark. Whatever the spotlight finds comes to life.",
     256
    ],
    [
     236,
     "Shot Across",
     "The human cannonball. Aim for the balloons.",
     256
    ],
    [
     237,
     "Plate Spinner",
     "Plates spinning on tall rods, and one person running between them.",
     256
    ],
    [
     238,
     "Silhouette",
     "A target wheel, but with soft paint balls. The partner still giggles.",
     512
    ],
    [
     239,
     "Rosinback",
     "A rider standing on a cantering horse, going through the hoop.",
     128
    ],
    [
     240,
     "Stilt Parade",
     "Stilt walkers in costume, parading round the ring.",
     128
    ]
   ],
   "rt": "drop03",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-103",
   "name": "Three Bells",
   "fam": "Penny Arcade",
   "set": "Penny Arcade",
   "drop": 4,
   "supply": 2048,
   "brief": "A penny machine at the end of the pier. Some nights it plays itself. Ring all three bells.",
   "species": [
    [
     103,
     "Three Bells",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-101",
   "name": "Snip",
   "fam": "Penny Arcade",
   "set": "Penny Arcade",
   "drop": 4,
   "supply": 2048,
   "brief": "A cut-the-string prize machine. Wait for the glint. Something on the ring is not for sale.",
   "species": [
    [
     101,
     "Snip",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-102",
   "name": "Top Row",
   "fam": "Penny Arcade",
   "set": "Penny Arcade",
   "drop": 4,
   "supply": 2048,
   "brief": "A stacking-lights prize tower. Take the radio, or play on for the telly. Tap to stop each row.",
   "species": [
    [
     102,
     "Top Row",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-105",
   "name": "Roll a Penny",
   "fam": "Penny Arcade",
   "set": "Penny Arcade",
   "drop": 4,
   "supply": 2048,
   "brief": "A roll-a-penny stall at the fair. Roll it clear of the lines. Mind the gulls.",
   "species": [
    [
     105,
     "Roll a Penny",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-062",
   "name": "Hoopla",
   "fam": "Hook a Prize",
   "set": "Hook a Prize",
   "drop": 4,
   "supply": 2048,
   "brief": "A hoopla stall. Your hand wobbles; throw when it settles. Sometimes the hen gets out.",
   "species": [
    [
     62,
     "Hoopla",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-061",
   "name": "Lucky Spin",
   "fam": "Hook a Prize",
   "set": "Hook a Prize",
   "drop": 4,
   "supply": 2048,
   "brief": "A fair prize wheel. Call your wedge, then spin. Some keepers cheat.",
   "species": [
    [
     61,
     "Lucky Spin",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-067",
   "name": "Lucky Pond",
   "fam": "Hook a Prize",
   "set": "Hook a Prize",
   "drop": 4,
   "supply": 2048,
   "brief": "A hook-a-duck pond at the seaside. Hold the rod steady and drop. One of them is not a toy.",
   "species": [
    [
     67,
     "Lucky Pond",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-068",
   "name": "Scratch Haul",
   "fam": "Hook a Prize",
   "set": "Hook a Prize",
   "drop": 4,
   "supply": 2048,
   "brief": "A scratch card on the counter. Most of them lose. Collect the whole key and see what turns up.",
   "species": [
    [
     68,
     "Scratch Haul",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-301",
   "name": "Duck Derby",
   "fam": "Race Day",
   "set": "Race Day",
   "drop": 4,
   "supply": 1024,
   "brief": "A rubber-duck race down a village river, prizes on the trestle. Splash yours home first. Some years a much bigger duck enters.",
   "species": [
    [
     301,
     "Duck Derby",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-308",
   "name": "Snail Ring",
   "fam": "Race Day",
   "set": "Race Day",
   "drop": 4,
   "supply": 1024,
   "brief": "A snail race on a damp cloth, garden prizes round the ring. Draw a line of water and one will follow it. Now and then a tortoise turns up.",
   "species": [
    [
     308,
     "Snail Ring",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-304",
   "name": "Beetle Box",
   "fam": "Race Day",
   "set": "Race Day",
   "drop": 4,
   "supply": 1024,
   "brief": "Beetles rolling beads down their lanes to the burrow. Drop sugar ahead of yours. Some nights the lights are out and one of them glows.",
   "species": [
    [
     304,
     "Beetle Box",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-309",
   "name": "Soapbox Hill",
   "fam": "Race Day",
   "set": "Race Day",
   "drop": 4,
   "supply": 1024,
   "brief": "Soapbox carts down a village hill, prizes pegged on a washing line at the bottom. Three pushes a run, so choose them. Someone once entered a piano.",
   "species": [
    [
     309,
     "Soapbox Hill",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-154",
   "name": "Showdown",
   "fam": "Card Table",
   "set": "Card Table",
   "drop": 4,
   "supply": 1024,
   "brief": "A card table under a lamp, the regulars and a pot of odd stakes. Five-card draw. Watch their sleeves.",
   "species": [
    [
     154,
     "Showdown",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-117",
   "name": "Same Again",
   "fam": "Card Table",
   "set": "Card Table",
   "drop": 4,
   "supply": 1024,
   "brief": "Snap with a made-up deck under the lamp. First to seven takes the game, and the house gets quicker. Mind the joker.",
   "species": [
    [
     117,
     "Same Again",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-158",
   "name": "Milk Caps",
   "fam": "Card Table",
   "set": "Card Table",
   "drop": 4,
   "supply": 1024,
   "brief": "A stack of milk caps in a chalk ring. Wind up and slam it; the face-up ones are yours. Keep an eye on the magpie.",
   "species": [
    [
     158,
     "Milk Caps",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-118",
   "name": "Chatterbox",
   "fam": "Card Table",
   "set": "Card Table",
   "drop": 4,
   "supply": 1024,
   "brief": "A paper fortune-teller on a desk. Pick a colour, pick a number, lift the flap. Some of them bite.",
   "species": [
    [
     118,
     "Chatterbox",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-240",
   "name": "Spin Cycle",
   "fam": "Around the House",
   "set": "Around the House",
   "drop": 4,
   "supply": 1024,
   "brief": "A washing machine mid-wash, with whatever was left in the pockets; now and then something lives in the filter. Open the door and fish them out.",
   "species": [
    [
     240,
     "Spin Cycle",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1
  },
  {
   "key": "drop04-482",
   "name": "Doormat",
   "fam": "Around the House",
   "set": "Around the House",
   "drop": 4,
   "supply": 1024,
   "brief": "The morning's post on the doormat, and sometimes the dog gets there first. Pick a piece up and open it; rattle the letterbox for more.",
   "species": [
    [
     482,
     "Doormat",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-087",
   "name": "Fridge Door",
   "fam": "Around the House",
   "set": "Around the House",
   "drop": 4,
   "supply": 1024,
   "brief": "A fridge door, and everything the family stuck to it. Pull a magnet; sometimes the letters move on their own.",
   "species": [
    [
     87,
     "Fridge Door",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-319",
   "name": "Clear Canister",
   "fam": "Around the House",
   "set": "Around the House",
   "drop": 4,
   "supply": 1024,
   "brief": "A vacuum over a deep old rug; the clear canister shows what it picked up. Mind the sock.",
   "species": [
    [
     319,
     "Clear Canister",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-175",
   "name": "White Water",
   "fam": "Expedition",
   "set": "Expedition",
   "drop": 4,
   "supply": 256,
   "brief": "A raft down a river; grab what floats by. Run it again and the water's faster.",
   "species": [
    [
     175,
     "White Water",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-179",
   "name": "Noon Beam",
   "fam": "Expedition",
   "set": "Expedition",
   "drop": 4,
   "supply": 256,
   "brief": "A buried sun temple. Turn the mirrors to put the beam on the disc, then lift what the altar gives up.",
   "species": [
    [
     179,
     "Noon Beam",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-172",
   "name": "Weightstones",
   "fam": "Expedition",
   "set": "Expedition",
   "drop": 4,
   "supply": 512,
   "brief": "A stone floor in a ruined star college. Push the stones onto the plates, in as few pushes as you can, and the finds fly out onto your cloth.",
   "species": [
    [
     172,
     "Weightstones",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-177",
   "name": "On the Rope",
   "fam": "Expedition",
   "set": "Expedition",
   "drop": 4,
   "supply": 512,
   "brief": "A climber on a rope down the ice. Swing over and bring up what was lost down there.",
   "species": [
    [
     177,
     "On the Rope",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-180",
   "name": "Thin Ice",
   "fam": "Expedition",
   "set": "Expedition",
   "drop": 4,
   "supply": 512,
   "brief": "Frozen water with things lost on it. Skate out and back; mind the thin ice, and fish out what goes through.",
   "species": [
    [
     180,
     "Thin Ice",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-173",
   "name": "Lungful",
   "fam": "Expedition",
   "set": "Expedition",
   "drop": 4,
   "supply": 512,
   "brief": "A free dive in a lagoon. Tap a find and bring it up before your breath runs out; the bubbles help.",
   "species": [
    [
     173,
     "Lungful",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-141",
   "name": "Canal Magnet",
   "fam": "Dredged Up",
   "set": "Dredged Up",
   "drop": 4,
   "supply": 256,
   "brief": "A canal cut open, and a magnet on a rope. Iron sticks; nothing else does. Now and then something down there is still at home. Drop it in.",
   "species": [
    [
     141,
     "Canal Magnet",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-386",
   "name": "Claw",
   "fam": "Dredged Up",
   "set": "Dredged Up",
   "drop": 4,
   "supply": 256,
   "brief": "A small submersible on the sea floor, three thousand metres down. Fly it, send the arm, ping the dark and see what pings back.",
   "species": [
    [
     386,
     "Claw",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-387",
   "name": "Low Water",
   "fam": "Dredged Up",
   "set": "Dredged Up",
   "drop": 4,
   "supply": 512,
   "brief": "A reservoir in a drought, the drowned village showing again. Bring the rain back, or skim a stone. Some villages remember being lived in.",
   "species": [
    [
     387,
     "Low Water",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-264",
   "name": "Mill Race",
   "fam": "Dredged Up",
   "set": "Dredged Up",
   "drop": 4,
   "supply": 512,
   "brief": "A mill wheel, a net of things the pond kept, and a landing stage. Drop the net and let the water do the work. Mind the ducks.",
   "species": [
    [
     264,
     "Mill Race",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-143",
   "name": "Colour",
   "fam": "Dredged Up",
   "set": "Dredged Up",
   "drop": 4,
   "supply": 512,
   "brief": "A pan of creek gravel and two cold hands. Tip it, wash the light stuff out and pick the gold. Then another scoop.",
   "species": [
    [
     143,
     "Colour",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-156",
   "name": "Wish You Were Here",
   "fam": "First Post",
   "set": "First Post",
   "drop": 4,
   "supply": 256,
   "brief": "A box of postcards from towns that aren't on any map. Turn one over, post the ones never sent. One of them hasn't been written yet.",
   "species": [
    [
     156,
     "Wish You Were Here",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-222",
   "name": "Bottle Post",
   "fam": "First Post",
   "set": "First Post",
   "drop": 4,
   "supply": 256,
   "brief": "A bottle washed up with a letter in it. Pull the cork, shake out what the sender put in, read the wish. Sometimes somebody writes back.",
   "species": [
    [
     222,
     "Bottle Post",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-489",
   "name": "Bush Mail",
   "fam": "First Post",
   "set": "First Post",
   "drop": 4,
   "supply": 256,
   "brief": "A floatplane at a jetty with the week's bush mail. Load the handcart and she flies off, and back. Some nights the sky does something.",
   "species": [
    [
     489,
     "Bush Mail",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-484",
   "name": "Wish Letters",
   "fam": "First Post",
   "set": "First Post",
   "drop": 4,
   "supply": 512,
   "brief": "Letters to Father Christmas, the wishes drawn in crayon. Read one and stamp it granted; the present turns up. Not all of them are from children.",
   "species": [
    [
     484,
     "Wish Letters",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-133",
   "name": "Enclosed",
   "fam": "First Post",
   "set": "First Post",
   "drop": 4,
   "supply": 512,
   "brief": "A sealed letter on a desk. Crack the wax, turn over what was folded in, and earn the P.S. Some letters have more to say.",
   "species": [
    [
     133,
     "Enclosed",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-075",
   "name": "Ledger Page",
   "fam": "First Post",
   "set": "First Post",
   "drop": 4,
   "supply": 512,
   "brief": "A merchant's ledger page. Settle the lines. Not every line is honest.",
   "species": [
    [
     75,
     "Ledger Page",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-001",
   "name": "Satchel",
   "fam": "Adventurer's Pack",
   "set": "Adventurer's Pack",
   "drop": 4,
   "supply": 256,
   "brief": "A traveller's things laid out by the satchel. Something small sometimes lives in it. Throw them back in.",
   "species": [
    [
     1,
     "Satchel",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-031",
   "name": "Arms Rack",
   "fam": "Adventurer's Pack",
   "set": "Adventurer's Pack",
   "drop": 4,
   "supply": 256,
   "brief": "A second-hand weapon stall. Haggle every price down, but watch the keeper's face. Some days there's something under the counter.",
   "species": [
    [
     31,
     "Arms Rack",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-066",
   "name": "Roll Table",
   "fam": "Adventurer's Pack",
   "set": "Adventurer's Pack",
   "drop": 4,
   "supply": 256,
   "brief": "A loot table, and dice to read it. Most rows are nothing much. Tick off the whole sheet in as few rolls as you can.",
   "species": [
    [
     66,
     "Roll Table",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-080",
   "name": "Item Spread",
   "fam": "Adventurer's Pack",
   "set": "Adventurer's Pack",
   "drop": 4,
   "supply": 512,
   "brief": "A fortune told with item cards by lamplight. The reader leaves the last card for you.",
   "species": [
    [
     80,
     "Item Spread",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-056",
   "name": "Font",
   "fam": "Adventurer's Pack",
   "set": "Adventurer's Pack",
   "drop": 4,
   "supply": 512,
   "brief": "Something at the bottom of a font. Drops might bless it; a coin landed on it surely will.",
   "species": [
    [
     56,
     "Font",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-033",
   "name": "Pedlar's Tray",
   "fam": "Adventurer's Pack",
   "set": "Adventurer's Pack",
   "drop": 4,
   "supply": 512,
   "brief": "A pedlar's tray. Sell the lot and see what's under the bottom. Mind the magpies.",
   "species": [
    [
     33,
     "Pedlar's Tray",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-165",
   "name": "Attic Tower",
   "fam": "Piled High",
   "set": "Piled High",
   "drop": 4,
   "supply": 256,
   "brief": "A tower of trunks and boxes in an attic. Pull one out, then stack them back up to the chalk line. Some trunks rattle.",
   "species": [
    [
     165,
     "Attic Tower",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-162",
   "name": "Leaf Heap",
   "fam": "Piled High",
   "set": "Piled High",
   "drop": 4,
   "supply": 256,
   "brief": "A heap of autumn leaves with the summer's lost things in it. Kick through it; something in there is still ticking.",
   "species": [
    [
     162,
     "Leaf Heap",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-167",
   "name": "Tumbler",
   "fam": "Piled High",
   "set": "Piled High",
   "drop": 4,
   "supply": 512,
   "brief": "A rock tumbler on a bench. Turn it by hand to polish the stones bright; once in a while one of them is older than anything.",
   "species": [
    [
     167,
     "Tumbler",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-168",
   "name": "Fair Weight",
   "fam": "Piled High",
   "set": "Piled High",
   "drop": 4,
   "supply": 512,
   "brief": "Valuables on a balance. Add weights until the bell rings; it can tell when someone's cheating.",
   "species": [
    [
     168,
     "Fair Weight",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-166",
   "name": "Tangle",
   "fam": "Piled High",
   "set": "Piled High",
   "drop": 4,
   "supply": 512,
   "brief": "A dish of tangled necklaces. Pull slowly to drag the others, quickly to slip free; open the lockets and see what they keep.",
   "species": [
    [
     166,
     "Tangle",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-341",
   "name": "Live Magnet",
   "fam": "Scrap and Springs",
   "set": "Scrap and Springs",
   "drop": 4,
   "supply": 256,
   "brief": "A scrapyard magnet with today's iron stuck to it. Something in there is still ticking. Tap to cut the power.",
   "species": [
    [
     341,
     "Live Magnet",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-343",
   "name": "Crusher",
   "fam": "Scrap and Springs",
   "set": "Scrap and Springs",
   "drop": 4,
   "supply": 256,
   "brief": "A car in the crusher with somebody's odds and ends still in it. Save what you can, and check nobody's aboard. Tap the press.",
   "species": [
    [
     343,
     "Crusher",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-348",
   "name": "Scavenger",
   "fam": "Scrap and Springs",
   "set": "Scrap and Springs",
   "drop": 4,
   "supply": 512,
   "brief": "A small robot picking through a scrap heap. Sometimes it brings the little one. Tap a glint to send it.",
   "species": [
    [
     348,
     "Scavenger",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-263",
   "name": "Snap Traps",
   "fam": "Scrap and Springs",
   "set": "Scrap and Springs",
   "drop": 4,
   "supply": 512,
   "brief": "A tray of set spring traps, each holding a ball. Three balls a round. Sometimes there's an audience.",
   "species": [
    [
     263,
     "Snap Traps",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-265",
   "name": "Long Throw",
   "fam": "Scrap and Springs",
   "set": "Scrap and Springs",
   "drop": 4,
   "supply": 512,
   "brief": "A toy trebuchet throwing a castle's odds and ends into a hay cart. Mind the wind. Some of it would rather fly.",
   "species": [
    [
     265,
     "Long Throw",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-299",
   "name": "Drone Show",
   "fam": "Night Sky",
   "set": "Night Sky",
   "drop": 4,
   "supply": 128,
   "brief": "A drone show over a town by the water, one figure after another. Something else is watching too. Tap the sky for the next one.",
   "species": [
    [
     299,
     "Drone Show",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-291",
   "name": "Planisphere",
   "fam": "Night Sky",
   "set": "Night Sky",
   "drop": 4,
   "supply": 128,
   "brief": "A star wheel. Every figure on it is a thing: a kettle, a ladder, a boot. Turn it to find them all. There may be one more.",
   "species": [
    [
     291,
     "Planisphere",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-292",
   "name": "Cloud Spotting",
   "fam": "Night Sky",
   "set": "Night Sky",
   "drop": 4,
   "supply": 128,
   "brief": "Lying out at night, watching clouds that are plainly things. A teapot. A boot. Sometimes us. Tap one to call it out.",
   "species": [
    [
     292,
     "Cloud Spotting",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-295",
   "name": "Lights Out",
   "fam": "Night Sky",
   "set": "Night Sky",
   "drop": 4,
   "supply": 256,
   "brief": "A small town at night and the sky its lights hide. Switch them off and the stars come through. Sometimes something else does too.",
   "species": [
    [
     295,
     "Lights Out",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-336",
   "name": "Tractor Beam",
   "fam": "Night Sky",
   "set": "Night Sky",
   "drop": 4,
   "supply": 256,
   "brief": "A saucer over a farm at night, taking things up one at a time. Somebody up there is enjoying it. Hold to beam.",
   "species": [
    [
     336,
     "Tractor Beam",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-314",
   "name": "Glow Stones",
   "fam": "Night Sky",
   "set": "Night Sky",
   "drop": 4,
   "supply": 256,
   "brief": "An old stone wall at night and a UV lamp. Some stones are hiding a glow. Something in the grass has its own. Move the lamp to look.",
   "species": [
    [
     314,
     "Glow Stones",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-091",
   "name": "Relic",
   "fam": "On a Plinth",
   "set": "On a Plinth",
   "drop": 4,
   "supply": 128,
   "brief": "One old thing, alone in the dark with a lantern. Something small lives with some of them. Carry the lantern.",
   "species": [
    [
     91,
     "Relic",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-099",
   "name": "Last Coin",
   "fam": "On a Plinth",
   "set": "On a Plinth",
   "drop": 4,
   "supply": 128,
   "brief": "The last coin, spun on the table. Call it, then slap it down. Some nights a magpie is watching.",
   "species": [
    [
     99,
     "Last Coin",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-100",
   "name": "Ninety-Nine",
   "fam": "On a Plinth",
   "set": "On a Plinth",
   "drop": 4,
   "supply": 128,
   "brief": "One kind of thing, stacked, and how many. One lamp. Build it up to the line.",
   "species": [
    [
     100,
     "Ninety-Nine",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-095",
   "name": "Hidden Tune",
   "fam": "On a Plinth",
   "set": "On a Plinth",
   "drop": 4,
   "supply": 256,
   "brief": "A shadow on a lit blind. Guess what it is, then play it. Sometimes something small sings along.",
   "species": [
    [
     95,
     "Hidden Tune",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-098",
   "name": "Speck",
   "fam": "On a Plinth",
   "set": "On a Plinth",
   "drop": 4,
   "supply": 256,
   "brief": "Something small, lost on a very big field. Have a look round. Now and then a robin is looking too.",
   "species": [
    [
     98,
     "Speck",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-151",
   "name": "Booster",
   "fam": "Spilled Loot",
   "set": "Spilled Loot",
   "drop": 4,
   "supply": 128,
   "brief": "A Pyxlings booster, ripped open on the table. Some of them don't stay on their cards. Rip another.",
   "species": [
    [
     151,
     "Booster",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-092",
   "name": "Plus One",
   "fam": "Spilled Loot",
   "set": "Spilled Loot",
   "drop": 4,
   "supply": 128,
   "brief": "A +1 to something, with nothing attached. Some are shy. Tap it.",
   "species": [
    [
     92,
     "Plus One",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-096",
   "name": "Name Card",
   "fam": "Spilled Loot",
   "set": "Spilled Loot",
   "drop": 4,
   "supply": 128,
   "brief": "A calling card for something you never see. Some are written in lemon. Bring the lamp closer.",
   "species": [
    [
     96,
     "Name Card",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-019",
   "name": "Fortune",
   "fam": "Spilled Loot",
   "set": "Spilled Loot",
   "drop": 4,
   "supply": 256,
   "brief": "A fortune teller's booth, the pouch tipped out across the velvet. Sometimes something climbs out. Turn the cards.",
   "species": [
    [
     19,
     "Fortune",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-243",
   "name": "Bopped",
   "fam": "Spilled Loot",
   "set": "Spilled Loot",
   "drop": 4,
   "supply": 256,
   "brief": "A glade bully, bopped, with everything it swallowed lying round it. Bag the lot.",
   "species": [
    [
     243,
     "Bopped",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-094",
   "name": "Plinth",
   "fam": "Plinth",
   "set": "Plinth",
   "drop": 4,
   "supply": 64,
   "brief": "A treasure on a plinth, turning slowly under one lamp. Something lives behind the skirting. Give it a spin.",
   "species": [
    [
     94,
     "Plinth",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-071",
   "name": "Foil Card",
   "fam": "Foil Card",
   "set": "Foil Card",
   "drop": 4,
   "supply": 64,
   "brief": "One trading card, on show in its own room. Now and then the picture moves. Look closer.",
   "species": [
    [
     71,
     "Foil Card",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-191",
   "name": "Loupe",
   "fam": "Curiosities",
   "set": "Curiosities",
   "drop": 4,
   "supply": 128,
   "brief": "A small old piece of jewellery under the jeweller's loupe. Now and then a magpie wants it back. Hold the glass still.",
   "species": [
    [
     191,
     "Loupe",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-189",
   "name": "Beetle Case",
   "fam": "Curiosities",
   "set": "Curiosities",
   "drop": 4,
   "supply": 128,
   "brief": "Pinned beetles in a collector's case, a slip under each. One is only sleeping, and some cases still glow. Tap the glass.",
   "species": [
    [
     189,
     "Beetle Case",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-186",
   "name": "Last Camp",
   "fam": "Curiosities",
   "set": "Curiosities",
   "drop": 4,
   "supply": 128,
   "brief": "What came back from an expedition, under museum glass. Sometimes there is still a light on in the tent. Knock on the glass.",
   "species": [
    [
     186,
     "Last Camp",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-197",
   "name": "Ring Box",
   "fam": "Curiosities",
   "set": "Curiosities",
   "drop": 4,
   "supply": 256,
   "brief": "One ring in an open box on a table. A few of them only ever want to go home. Spin it.",
   "species": [
    [
     197,
     "Ring Box",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-192",
   "name": "Pendant",
   "fam": "Curiosities",
   "set": "Curiosities",
   "drop": 4,
   "supply": 256,
   "brief": "A small token on a thread, turning. Some stones have a hole you can see somewhere else through. Swing it over the top.",
   "species": [
    [
     192,
     "Pendant",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop04-052",
   "name": "Settings",
   "fam": "Curiosities",
   "set": "Curiosities",
   "drop": 4,
   "supply": 256,
   "brief": "A socketed piece on the jeweller's bench and the stones to set in it. One socket is sometimes hungry. Set them true.",
   "species": [
    [
     52,
     "Settings",
     ""
    ]
   ],
   "rt": "drop04",
   "touch": 1,
   "music": 1
  },
  {
   "key": "game:pyx",
   "game": "pyx",
   "species": []
  },
  {
   "key": "game:pyxlings",
   "game": "pyxlings",
   "species": []
  },
  {
   "key": "h5-342",
   "name": "Sky Lanterns",
   "fam": "Lamps",
   "set": "Daily issue",
   "brief": "Paper lanterns lift off a dark shore one after another and drift up into a banded night sky, swaying, shrinking with distance to single glowing cells, and doubled in the water below. Click to let one go.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     342,
     "Sky Lanterns",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "h5-339",
   "name": "Sunflowers",
   "fam": "Garden",
   "set": "Daily issue",
   "brief": "A row of sunflowers over one day, big heads of petals round a seed-spiral centre, broad leaves on tall stems, a field of smaller ones behind. The heads follow the sun across the sky, foreshortening as they turn. Move the pointer and you are the sun.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     339,
     "Sunflowers",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "h5-312",
   "name": "Morning Coffee",
   "fam": "Still Life",
   "set": "Daily issue",
   "brief": "A cup of coffee seen from the side or from above, drawn big in flat tones: mugs, tea cups, espresso cups and glasses of latte, patterned or plain, with spoon, sugar and a biscuit. Steam curls up in pixels, and a click stirs it.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     312,
     "Morning Coffee",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "h5-355",
   "name": "Puzzle Cube",
   "fam": "Toys",
   "set": "Daily issue",
   "brief": "A six-colour cube turns its layers, one quarter turn at a time, until it is thoroughly scrambled, then plays every move backwards until it is whole again, while it slowly revolves.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     355,
     "Puzzle Cube",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "h5-227",
   "name": "Suspension",
   "fam": "Architecture",
   "set": "Daily issue",
   "brief": "A suspension bridge strung across a bay at dusk: the main cable sags between two towers, hangers drop to the deck, and the whole span shivers in the water beneath.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     227,
     "Suspension",
     ""
    ]
   ]
  },
  {
   "key": "h5-102",
   "name": "Fleet",
   "fam": "Sprites",
   "set": "Daily issue",
   "brief": "Ships drawn by the dice: tapered hulls, swept wings, fins and canopies, each shaded from one palette and lit from above, crossing three depths of stars. A convoy, a patrol turning at the edges, or two squadrons trading fire.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     102,
     "Fleet",
     ""
    ]
   ]
  },
  {
   "key": "h5-120",
   "name": "Aurora",
   "fam": "Terrain",
   "set": "Daily issue",
   "brief": "Curtains of light over snowy peaks: each column of sky glows by a slowly folding noise, from the hem to a different crown, with the stars showing through and the curtains mirrored in a lake or falling on a frozen plain.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     120,
     "Aurora",
     ""
    ]
   ]
  },
  {
   "key": "h5-258",
   "name": "Tape Deck",
   "fam": "Instruments",
   "set": "Daily issue",
   "brief": "A cassette seen through its window: the tape winds from one hub to the other, the reels changing size and speed as it goes, and auto-reverses at the end of the side.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     258,
     "Tape Deck",
     ""
    ]
   ]
  },
  {
   "key": "h5-302",
   "name": "Treasure Map",
   "fam": "Cartography",
   "set": "Daily issue",
   "brief": "A treasure map in chunky pixels: one to three islands in flat sand and jungle with mountains, palms and a skull rock, inked coastlines and wave marks on a scorched parchment border, a compass rose and a sea serpent or a ship. A dotted red route walks from the boat to the X. Click the island to move the X.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     302,
     "Treasure Map",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "h5-145",
   "name": "Synthwave",
   "fam": "Raster",
   "set": "Daily issue",
   "brief": "A striped sun setting behind wireframe mountains, and a glowing grid floor rushing toward you, every line of it laid down cell by cell.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     145,
     "Synthwave",
     ""
    ]
   ]
  },
  {
   "key": "h5-243",
   "name": "Prism",
   "fam": "Optics",
   "set": "Daily issue",
   "brief": "A thin white beam enters a slowly turning glass prism and leaves it fanned out into a spectrum, the fan sweeping across the wall as the prism turns. Prism size, the wall, the number of bands and a second prism that folds the colours back to white change with every variation; move the pointer to aim the beam.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     243,
     "Prism",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "h5-169",
   "name": "Fireworks",
   "fam": "Physics",
   "set": "Daily issue",
   "brief": "Rockets climb from behind the rooftops and burst into sparks that fall under gravity and drag: rings, peonies, willows and double shells, each a colour of its own.",
   "drop": 5,
   "supply": null,
   "species": [
    [
     169,
     "Fireworks",
     ""
    ]
   ],
   "touch": 1
  },
  {
   "key": "cs-702",
   "name": "Maquettes",
   "fam": "Maquettes",
   "set": "Maquettes",
   "drop": 0,
   "supply": null,
   "brief": "Unit cubes in the corner of a room, seen down its diagonal: each Maquette builds a thing of its own kind, a cube at a time, lit and moving. Tap to knock cubes out; hold to open a spring.",
   "species": [
    [
     702,
     "Corner Stack",
     ""
    ]
   ],
   "rt": "drop70",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-027",
   "name": "Snowy Street",
   "fam": "After Dark",
   "set": "After Dark",
   "drop": 6,
   "supply": 256,
   "brief": "A small town street at night during the first snow of the year, and the snow builds up on roofs, rails, branches, bikes and parked cars. The road goes from wet to slushy to white. The town and how deep it's got change every mint. Drag to blow the snow around, hold to make it snow harder, or tap a branch, gutter, rail or the lamp to knock its snow off.",
   "species": [
    [
     27,
     "Snowy Street",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-084",
   "name": "Northern Ferry",
   "fam": "After Dark",
   "set": "After Dark",
   "drop": 6,
   "supply": 512,
   "brief": "The stern of a small ferry crossing northern water, with a real V-shaped wake. The water (a fjord, a strait, a lake or open sea) and the sky (the Milky Way, moonrise, snow or fog) change every mint. Drag across the sea to raise the swell and roll the ferry, tap to blow the horn and hear it echo, or hold to bring in snow or thick fog.",
   "species": [
    [
     84,
     "Northern Ferry",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-186",
   "name": "Night Platform",
   "fam": "After Dark",
   "set": "After Dark",
   "drop": 6,
   "supply": 512,
   "brief": "An empty station platform late at night, shot low along the edge, sometimes underground and sometimes out in snowy woods. The air moves first, the rails sing, then a train roars in, opens onto an empty carriage and leaves, though some run straight through. The region and the station change every mint. Tap to call the train, drag to lean along the edge, or hold to slow time.",
   "species": [
    [
     186,
     "Night Platform",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-189",
   "name": "Traffic Lights",
   "fam": "After Dark",
   "set": "After Dark",
   "drop": 6,
   "supply": 512,
   "brief": "A city where the traffic actually works: cars queue at the lights, windows light up one by one and a train crosses. Every mint is a different city plan, like a grid, a river with bridges or a cluster of towers. Tap a junction to flip its lights or tap a road to stall a car and watch the jam back up, or hold to run the night through to dawn.",
   "species": [
    [
     189,
     "Traffic Lights",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-209",
   "name": "Night Pool",
   "fam": "After Dark",
   "set": "After Dark",
   "drop": 6,
   "supply": 2048,
   "brief": "A little walled pool at night shot with a long lens, where real waves bend the light from the underwater lamps into a moving net on the walls. The lamps, the basin, the tree and the wind change every mint. Tap to drop a stone and watch the net break up, or drag to stir the water.",
   "species": [
    [
     209,
     "Night Pool",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-221",
   "name": "Car Wash",
   "fam": "After Dark",
   "set": "After Dark",
   "drop": 6,
   "supply": 2048,
   "brief": "The view from the driver's seat at night as an automatic car wash passes over the windscreen, from thick foam to the brushes, the rinse and the dryers. The foam colour, the bay lights, the car, the brushes and which part of the wash you start on change every mint. Drag to swing the wipers through the foam and leave a pile where you stop, then let go and they park.",
   "species": [
    [
     221,
     "Car Wash",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-572",
   "name": "Gondolas",
   "fam": "After Dark",
   "set": "After Dark",
   "drop": 6,
   "supply": 1024,
   "brief": "The stone waterfront in Venice, mostly at a foggy winter dawn, with gondolas rocking between striped poles and a church across the water as a pale shape in the fog. The hour and weather, the fog and the gondolas change every mint. Press a gondola to rock it and knock its neighbour, tap the water for a ring, drag to drift the fog, or hold to let the light come and the fog thin out.",
   "species": [
    [
     572,
     "Gondolas",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-616",
   "name": "Container Port",
   "fam": "After Dark",
   "set": "After Dark",
   "drop": 6,
   "supply": 1024,
   "brief": "The wet concrete of a container terminal at night, with stacks of faded boxes disappearing into lamp-lit fog under a line of ship cranes, and the black wall of a docked ship on one side. Where you stand, the fog, the lamps, the stacks, the rain, the ship, the cranes and how wet the ground is change every mint. No controls, just look.",
   "species": [
    [
     616,
     "Container Port",
     ""
    ]
   ],
   "rt": "drop06"
  },
  {
   "key": "drop06-618",
   "name": "Oil Rig",
   "fam": "After Dark",
   "set": "After Dark",
   "drop": 6,
   "supply": 512,
   "brief": "Low on a boat in a long swell beside an oil platform in the rain, with hundreds of work lights shining in broken columns on the black water and the flare lighting up the cloud overhead. The rain, the flare, the swell and where the boat sits change every mint, and a few are at last light with the rig black against the sky. No controls, just look.",
   "species": [
    [
     618,
     "Oil Rig",
     ""
    ]
   ],
   "rt": "drop06"
  },
  {
   "key": "drop06-029",
   "name": "Model Railway",
   "fam": "Lamplit Rooms",
   "set": "Lamplit Rooms",
   "drop": 6,
   "supply": 256,
   "brief": "A model railway on a board in a dim room, running a real track plan with points, signals and a station. When the room lights go down, the street lamps, windows and headlights come on. The era and the track plan change every mint. Tap the points or a signal to switch them, tap a train for its whistle, drag to set the speed, or hold to work the room lights.",
   "species": [
    [
     29,
     "Model Railway",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-037",
   "name": "Shadow Lantern",
   "fam": "Lamplit Rooms",
   "set": "Lamplit Rooms",
   "drop": 6,
   "supply": 512,
   "brief": "A kid's bedroom at night where a shadow lantern turns round a flame and throws its cut-out shapes on the walls, stretching and blurring the way real shadows do. Where the lantern sits and the drums change every mint. Drag to spin the drum faster, slower or backwards, tap the lantern to swap the drum, hold to dim the flame, or tap a shadow on the wall to catch it.",
   "species": [
    [
     37,
     "Shadow Lantern",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-056",
   "name": "Kettle",
   "fam": "Lamplit Rooms",
   "set": "Lamplit Rooms",
   "drop": 6,
   "supply": 512,
   "brief": "An old stove by a frosty window in winter, with a kettle on the hob and a cup on the counter. The kettle sings and rolls. The time changes every mint. Drag the dial up or hold on the flame for heat, tap the lid to let steam out, drag kettle to cup to pour, tap the cup to drink it, or rub the window to wipe it.",
   "species": [
    [
     56,
     "Kettle",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-085",
   "name": "Blob Lamp",
   "fam": "Lamplit Rooms",
   "set": "Lamplit Rooms",
   "drop": 6,
   "supply": 512,
   "brief": "A lava lamp on a bedside table at night where the wax heats at the bottom, rises in blobs that stretch and pinch off, cools at the top and sinks again. The colours and the size of the blobs change every mint. Tap to flip the switch and watch it warm up from a cold lump, drag sideways to tip it so the blobs slosh, or hold to turn up the heat.",
   "species": [
    [
     85,
     "Blob Lamp",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-254",
   "name": "Attic Beam",
   "fam": "Lamplit Rooms",
   "set": "Lamplit Rooms",
   "drop": 6,
   "supply": 256,
   "brief": "A dark attic with a shaft of light through a gap in the roof, and thousands of dust specks drifting on real air currents that only show where they cross it. The gap, the light and what's stored up there change every mint. Drag to shake out a cloth full of dust, harder for a storm, or tap for a puff.",
   "species": [
    [
     254,
     "Attic Beam",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-072",
   "name": "Tea Bowl",
   "fam": "Window Light",
   "set": "Window Light",
   "drop": 6,
   "supply": 256,
   "brief": "A handmade bowl of a hot drink on a tray by a window. The surface turns over in slow cells you can see in the window's reflection, and as it cools the swirling slows. The drink and the glaze change every mint. Drag across to blow on it, tap to drop in a leaf, flower or tea stem, or hold to pour more hot water.",
   "species": [
    [
     72,
     "Tea Bowl",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-079",
   "name": "Spinning Tops",
   "fam": "Window Light",
   "set": "Window Light",
   "drop": 6,
   "supply": 512,
   "brief": "Real spinning tops on polished boards in window light, each one circling, nodding, standing still upright, wobbling out and rattling to rest like the real thing. The tops (wood, brass, ceramic, glass or tippe tops), the surface, the light, how many and the view change every mint. Flick a quick curl to spin a new one (faster flick, faster spin), tap one to nudge it, or hold to blow on them gently.",
   "species": [
    [
     79,
     "Spinning Tops",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-080",
   "name": "Frost Window",
   "fam": "Window Light",
   "set": "Window Light",
   "drop": 6,
   "supply": 256,
   "brief": "A close look through an old window on a freezing morning, with frost ferns growing across the glass. Needles reach out from the frame and branch off at ice's own angles. The frost changes every mint. Hold to breathe on the glass and clear a patch, drag a finger to melt a line or a shape, or tap to plant a speck that new frost grows from.",
   "species": [
    [
     80,
     "Frost Window",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-140",
   "name": "Water Bottle",
   "fam": "Window Light",
   "set": "Window Light",
   "drop": 6,
   "supply": 1024,
   "brief": "A thin plastic bottle of water, capped and full to the neck, under one lamp. Squeeze it and the wall dents and snaps into creases that stay, the water climbs the neck and bubbles float up. How worn and wet it is changes every mint. Hold to squeeze (a long hold crushes it), tap for a quick squeeze, or drag up or down to set exactly how hard.",
   "species": [
    [
     140,
     "Water Bottle",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-276",
   "name": "Foggy Mirror",
   "fam": "Window Light",
   "set": "Window Light",
   "drop": 6,
   "supply": 512,
   "brief": "A close look at a bathroom mirror while a hot shower runs. The fog is made of real tiny droplets that grow and merge until big ones run down leaving clear trails, and the room behind you shows in every clear patch and upside down in every drop. The tiles, the light and the old wipe change every mint. Drag to wipe it, tap to dab, or hold to warm a clear spot.",
   "species": [
    [
     276,
     "Foggy Mirror",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-386",
   "name": "Coffee Ring",
   "fam": "Window Light",
   "set": "Window Light",
   "drop": 6,
   "supply": 256,
   "brief": "A spilled drop of coffee drying on a glazed saucer. As it thins, the grounds get carried out to the edge and pack into a dark ring, sometimes with inner rings where the edge slipped, and any cracks in the glaze drink it up. The brew, the spill, the cracks and old stains change every mint. Tap to spill another drop, or hold to blow across it and dry it faster.",
   "species": [
    [
     386,
     "Coffee Ring",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-405",
   "name": "Sunbeam Dust",
   "fam": "Window Light",
   "set": "Window Light",
   "drop": 6,
   "supply": 512,
   "brief": "A sharp beam of sun through a window across a dim room with a seat in it, and dust that rides the room's real air currents, shining brightest where you look toward the light. The window, the hour, the dust and the draught change every mint. Drag to wave the air and the dust swirls through the beam, or tap to clap and the motes scatter.",
   "species": [
    [
     405,
     "Sunbeam Dust",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-446",
   "name": "Sweating Glass",
   "fam": "Window Light",
   "set": "Window Light",
   "drop": 6,
   "supply": 512,
   "brief": "A glass of iced water on a table by the window, going from fog to beads to drops that run down and make a wet ring. The glass, the ice, the light and how long it's been sitting change every mint. Drag to wipe a stripe and watch it fog up again, hold to clear a patch with a warm fingertip, or tap to flick the glass and knock the big drops loose.",
   "species": [
    [
     446,
     "Sweating Glass",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-070",
   "name": "Domino Run",
   "fam": "Playthings",
   "set": "Playthings",
   "drop": 6,
   "supply": 512,
   "brief": "A long domino run on a sunlit floor with spirals, branches and a book staircase, ending at a bell, a marble on a ruler, a little flag or a paper pinwheel. The layout, the spacing and the ending change every mint. Tap a domino to knock it over, tap a gap to fill it, drag along the floor to lay your own line, or hold to stand them all back up.",
   "species": [
    [
     70,
     "Domino Run",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-083",
   "name": "Peg Drop",
   "fam": "Playthings",
   "set": "Playthings",
   "drop": 6,
   "supply": 512,
   "brief": "An antique bean machine where hundreds of balls bounce through brass pins into bins and pile up into a bell curve. The balls and how many rows change every mint. Drag up or down to flip it like an hourglass, drag sideways to tilt it, tap a pin to pull it out or put it back, tap the case to knock it, or hold to slow time right down.",
   "species": [
    [
     83,
     "Peg Drop",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-092",
   "name": "Kite",
   "fam": "Playthings",
   "set": "Playthings",
   "drop": 6,
   "supply": 512,
   "brief": "Lying on a windy hilltop looking up at a kite against a summer sky, and the kite really flies, so gusts lift it and lulls drop it. The kite (a diamond, a delta, a box, a sled and more) and the wind change every mint. Drag down to pull in the line, up to let it out, sideways to steer, tap for a small tug or hold for a strong gust.",
   "species": [
    [
     92,
     "Kite",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-147",
   "name": "Marbles",
   "fam": "Playthings",
   "set": "Playthings",
   "drop": 6,
   "supply": 512,
   "brief": "Old handmade glass marbles in a ring in the dirt, seen from marble height, with real spin and tracks that stay in the ground. The shooter and the set change every mint. Drag back from the shooter and let go to flick it (start high for topspin, low for backspin), tap to scratch a mark and move the camera, or hold to slow time and watch the swirls turn.",
   "species": [
    [
     147,
     "Marbles",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-197",
   "name": "Paper Plane",
   "fam": "Playthings",
   "set": "Playthings",
   "drop": 6,
   "supply": 2048,
   "brief": "A paper plane in free flight, where the fold and how its flaps are bent decide whether it floats, stalls or loops. Most mints fly down a sunny hall, some down a corridor. Drag back and let go to throw it (further is harder, pull back to the right to throw it at the far wall), or tap the top or bottom half to bend the flaps up or down, even mid-flight.",
   "species": [
    [
     197,
     "Paper Plane",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-211",
   "name": "Pick Sticks",
   "fam": "Playthings",
   "set": "Playthings",
   "drop": 6,
   "supply": 1024,
   "brief": "A heap of thin painted sticks that really lean and slide on each other, with a gentle computer player taking turns with steel tweezers. The stick set and how the other player plays change every mint. Drag a stick up and out without moving the others and let go once it's clear to keep it, ease back if one creeps, tap the table to knock it, or hold it to drop a new heap.",
   "species": [
    [
     211,
     "Pick Sticks",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-233",
   "name": "Striker Board",
   "fam": "Playthings",
   "set": "Playthings",
   "drop": 6,
   "supply": 256,
   "brief": "A worn carrom board under a single hanging bulb, where the flat wooden coins and the heavy striker really slide, spin, crash and drop into the pockets. A patient opponent takes turns with you. The wood, the coins and the state of the game change every mint. Press where you want to hit, drag back and let go to flick the striker, or tap the board to slide it along your line.",
   "species": [
    [
     233,
     "Striker Board",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-255",
   "name": "Conkers",
   "fam": "Playthings",
   "set": "Playthings",
   "drop": 6,
   "supply": 2048,
   "brief": "Two conkers on knotted strings over fallen leaves, swinging like real pendulums, and each knock bruises the shell and opens a split until one finally breaks into pale chunks. The conkers, the ground and the other player change every mint. Drag to pull yours (the left one) back and let go to swing it, or tap for a quick swing. The other player always swings back.",
   "species": [
    [
     255,
     "Conkers",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-266",
   "name": "Seed Board",
   "fam": "Playthings",
   "set": "Playthings",
   "drop": 6,
   "supply": 1024,
   "brief": "A game of oware played by the real rules, mostly on a hand-carved board in the sun, sometimes in cups scooped in earth. Every seed actually drops, clacks and settles. The seeds, the board and the opponent change every mint. Tap one of the six cups on your near row to sow it and the board plays back, or leave it alone and it plays both sides.",
   "species": [
    [
     266,
     "Seed Board",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-091",
   "name": "Wind Tunnel",
   "fam": "Lab Bench",
   "set": "Lab Bench",
   "drop": 6,
   "supply": 256,
   "brief": "A small smoke tunnel on a lab bench, with lines of smoke flowing round a model and rolling up into real swirls behind it as the fan speeds up. The model changes every mint. Drag up or down to set the fan, tap the model to swap it, drag it to move it or near its tip to tilt it, or hold for a thick puff of smoke.",
   "species": [
    [
     91,
     "Wind Tunnel",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-121",
   "name": "Shaking Dish",
   "fam": "Lab Bench",
   "set": "Lab Bench",
   "drop": 6,
   "supply": 512,
   "brief": "A shallow dish of liquid on a speaker cone, shaking up and down. Past a point the surface breaks into glittering standing waves in stripes, squares and hexagons, then chaos. The liquid changes every mint, and rare ones have droplets that walk around on their own waves. Drag up or down to turn the shaking up or down, drag sideways to change the pitch, or tap to drop a droplet.",
   "species": [
    [
     121,
     "Shaking Dish",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-212",
   "name": "Light Rings",
   "fam": "Lab Bench",
   "set": "Lab Bench",
   "drop": 6,
   "supply": 2048,
   "brief": "A test glass on a flat under a lamp, where the rings are real light interference in the air gap. Some mints have a lens and its rings, some a flat on a thin wedge with straight bands. Hold to press and the rings run to your finger and swell (on a flat the bands open out or turn), or drag to slide the glass and the rings sink as it lifts and pour back as it lands.",
   "species": [
    [
     212,
     "Light Rings",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-215",
   "name": "Mirror Flask",
   "fam": "Lab Bench",
   "set": "Lab Bench",
   "drop": 6,
   "supply": 512,
   "brief": "A flask of silvering solution in a warm water bath. The metal grows on the glass wherever the liquid has touched, until the flask reflects the lab around it. The metal and the flask shape change every mint. Drag to swirl the liquid higher up the glass, hold to warm the bath, or tap a finished flask to pour in acid that eats the coat away in clear windows, and it starts again.",
   "species": [
    [
     215,
     "Mirror Flask",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-218",
   "name": "Floating Puck",
   "fam": "Lab Bench",
   "set": "Lab Bench",
   "drop": 6,
   "supply": 512,
   "brief": "A black superconductor puck locked in nitrogen fog above a magnet rail, staying at whatever height and tilt it was left, until the cold runs out and it sinks. The puck, the rail and its pose change every mint. Tap to pour nitrogen, drag the puck to move it (grab the rim to tilt it), or flick it to send it gliding along the rail.",
   "species": [
    [
     218,
     "Floating Puck",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-225",
   "name": "Twisting Spring",
   "fam": "Lab Bench",
   "set": "Lab Bench",
   "drop": 6,
   "supply": 256,
   "brief": "A brass bob on a long spring in an old cabinet, where the bounce really drains into a twist and back. The bob, the weights and the light change every mint. Drag up or down to pull it or sideways to twist it, tap beside a weight to move it and tune it until the bounce dies completely, or tap the wall to open a long exposure.",
   "species": [
    [
     225,
     "Twisting Spring",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-280",
   "name": "Bulb Filament",
   "fam": "Lab Bench",
   "set": "Lab Bench",
   "drop": 6,
   "supply": 512,
   "brief": "A clear light bulb in extreme close-up, with a coiled filament that glows from dull red to white as the voltage goes up, and past its limit a hot spot thins, arcs and burns out. The coil, the glass and the light change every mint. Drag up or down to turn the voltage up or down, hold to push it until it burns out, or tap for a new bulb.",
   "species": [
    [
     280,
     "Bulb Filament",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-296",
   "name": "Hundred Compasses",
   "fam": "Lab Bench",
   "set": "Lab Bench",
   "drop": 6,
   "supply": 1024,
   "brief": "A hundred brass pocket compasses on a bench with a bar magnet hanging over them, and every needle really gets pulled by the earth, the magnet and its neighbours. The spacing, the layout, the light and the magnet change every mint. Drag to carry the magnet across, tap to flip it, or let go and it lifts away while the needles settle back to north or lock into patterns with each other.",
   "species": [
    [
     296,
     "Hundred Compasses",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-357",
   "name": "Gas Burner",
   "fam": "Lab Bench",
   "set": "Lab Bench",
   "drop": 6,
   "supply": 1024,
   "brief": "A worn brass gas burner on an old lab bench, where the air collar sets how much air gets pulled in, from a sooty yellow flame to a sharp roaring blue cone. Push it and it lifts off the rim or strikes back down the tube with a pop. The bench changes every mint. Drag sideways to turn the air collar and up or down for the gas, or tap to shut it off and tap again to light it.",
   "species": [
    [
     357,
     "Gas Burner",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-450",
   "name": "Mirror Trick",
   "fam": "Lab Bench",
   "set": "Lab Bench",
   "drop": 6,
   "supply": 1024,
   "brief": "A printed object on a little turntable in front of a mirror, shaped so it looks like one thing straight on and something else in the glass. It can be a ring, a diamond, a pointed arch or a hexagon. Drag to turn it (half a turn swaps the shapes, and a flick keeps it spinning), hold to lift the camera and see the real wavy rim, or tap to set down another one.",
   "species": [
    [
     450,
     "Mirror Trick",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-010",
   "name": "Under the Scope",
   "fam": "Up Close",
   "set": "Up Close",
   "drop": 6,
   "supply": 1024,
   "brief": "Made-up glowing creatures under a microscope that swim, pulse, eat, merge and bud. Each kind has its own body, and no two are at the same point in their lives. The species, the zoom, how they start out and what else is on the slide change every mint. Drag to stir them, tap to drop a spore, or hold to shine a light they swim toward or away from.",
   "species": [
    [
     10,
     "Under the Scope",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-050",
   "name": "Soap Film",
   "fam": "Up Close",
   "set": "Up Close",
   "drop": 6,
   "supply": 256,
   "brief": "One soap film stretched across a wire up close. The colours come from how thick the film is in each spot, so they drain down, go black at the top and swirl around. The wire and the light change every mint. Drag to blow on it, tap to poke it with a wet finger (sometimes it pops), or hold to blow a bubble that floats away and a new film sweeps up.",
   "species": [
    [
     50,
     "Soap Film",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-126",
   "name": "Milk Swirl",
   "fam": "Up Close",
   "set": "Up Close",
   "drop": 6,
   "supply": 256,
   "brief": "A low, close look across a plate of milk with drops of food colouring floating on it. Touch it with a bit of dish soap and the colours tear outward in swirls that slow down as the soap spreads. The colours change every mint. Tap to touch it with soap, drag to draw a soap line and push the colour in a wave, or hold to drip in more colour.",
   "species": [
    [
     126,
     "Milk Swirl",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-171",
   "name": "Lotus Leaf",
   "fam": "Up Close",
   "set": "Up Close",
   "drop": 6,
   "supply": 256,
   "brief": "A close look at a lotus leaf at dawn, where water beads into round drops that hold the flower upside down and roll off almost without friction, picking up the pollen as they go. The leaf and how many drops there are change every mint. Tap to drop a bead of water, drag to tilt the leaf and send everything rolling, or hold for a light rain.",
   "species": [
    [
     171,
     "Lotus Leaf",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-173",
   "name": "Puffball",
   "fam": "Up Close",
   "set": "Up Close",
   "drop": 6,
   "supply": 256,
   "brief": "A ripe puffball on the forest floor, and pressing it puffs out spore smoke that rolls into rings. The species and how ripe it is (some haven't opened yet) change every mint, and a rare one is a fairy ring seen from above. Tap it to puff, hold for a long slow squeeze (long enough splits an unopened one), or drag through the air to stir the cloud.",
   "species": [
    [
     173,
     "Puffball",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-205",
   "name": "Pond Water",
   "fam": "Up Close",
   "set": "Up Close",
   "drop": 6,
   "supply": 256,
   "brief": "A drop of pond water under a microscope, full of rolling green Volvox, paramecia that back away from what they bump, and rotifers feeding on their stalks. What's living in the water changes every mint, and so do the lens and the light. Tap to jolt the slide and they flinch, or drag to move around the drop.",
   "species": [
    [
     205,
     "Pond Water",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-213",
   "name": "Honey Spoon",
   "fam": "Up Close",
   "set": "Up Close",
   "drop": 6,
   "supply": 256,
   "brief": "Honey falling off a spoon as a real thick thread that thins as it drops and coils by itself on the pile, with the height setting how. The honey, how warm it is and what it lands on change every mint. Some mints draw with it, in loops, a drizzle or coils. Drag up and down to raise or lower the spoon, or sideways to lay the rope across the dish.",
   "species": [
    [
     213,
     "Honey Spoon",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-214",
   "name": "Falling Spring",
   "fam": "Up Close",
   "set": "Up Close",
   "drop": 6,
   "supply": 1024,
   "brief": "High speed film of a long coil spring hanging on a cord in the pool of one small lamp. Let go and the turns pack solid and rush down while the bottom stays dead still until they get there. The wire, the length and the moment change every mint, and some open already falling. Tap to let go, drag to lift it back up, or pull the hanging coil to send waves along it.",
   "species": [
    [
     214,
     "Falling Spring",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-387",
   "name": "Zipper",
   "fam": "Up Close",
   "set": "Up Close",
   "drop": 6,
   "supply": 1024,
   "brief": "A brass jeans zip seen from a few centimetres, with the slider cut open so you can watch its Y-shaped channel push two rows of teeth together. The metal, the cloth and the tooth size change every mint. Drag along it to zip it up or down tooth by tooth, and if you pull too fast the cloth catches and jams, so tap to back it off.",
   "species": [
    [
     387,
     "Zipper",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-480",
   "name": "Bubble Bounce",
   "fam": "Up Close",
   "set": "Up Close",
   "drop": 6,
   "supply": 1024,
   "brief": "A bubble from a wand above lands on felt and squashes, wobbles and bounces, its rainbow film draining and swirling and its thin ring of shadow on the felt. The light, the bubble size and the draught change every mint. Tap beside it to puff it along, hold or drag to blow a stream of air, or tap the bubble to pop it and the wand blows another.",
   "species": [
    [
     480,
     "Bubble Bounce",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-009",
   "name": "Pop-Up Book",
   "fam": "Pictures",
   "set": "Pictures",
   "drop": 6,
   "supply": 1024,
   "brief": "A pop-up book open under a lamp, with a little paper world standing up off the page and tabs that actually work. The world on the page (a harbour town, a lighthouse, a viaduct), the paper, the season, the hidden room and how the lamp sits change every mint. Pull the top tab to turn day into night, pull the side tab, spin the season wheel or drag the little wall open.",
   "species": [
    [
     9,
     "Pop-Up Book",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-046",
   "name": "Watercolours",
   "fam": "Pictures",
   "set": "Pictures",
   "drop": 6,
   "supply": 512,
   "brief": "A drawing board on a desk at night with watercolour paper, a glass of rinse water, a tin of paints and a jar of brushes. The paint spreads and dries with a dark rim, while an unseen hand paints a landscape. The paints and the painting change every mint. Tap a pan to load the brush and drag to paint, hold still to drop clean water, or tap the glass to rinse.",
   "species": [
    [
     46,
     "Watercolours",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-093",
   "name": "Typewriter",
   "fam": "Pictures",
   "set": "Pictures",
   "drop": 6,
   "supply": 2048,
   "brief": "An old manual typewriter on a desk with little marks on the keys instead of letters. Each strike swings a bar up through the ribbon and stamps its mark, and the bell rings near the margin. The marks change every mint. Tap a key to strike it, tap or hold the space bar, drag the carriage lever right to start a new line, or tap a jammed bar to free it.",
   "species": [
    [
     93,
     "Typewriter",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-151",
   "name": "Harmonograph",
   "fam": "Pictures",
   "set": "Pictures",
   "drop": 6,
   "supply": 512,
   "brief": "A Victorian harmonograph: one pendulum rocks the paper, another swings the pen, and as both die down the pen lays down a looping figure. The ratio of the swings changes every mint. Drag a pendulum back and let go to set its swing, hold to slide a weight up or down its rod and change the figure live, or tap to lift the pen and tap again for a fresh sheet.",
   "species": [
    [
     151,
     "Harmonograph",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-153",
   "name": "Drawing Gears",
   "fam": "Pictures",
   "set": "Pictures",
   "drop": 6,
   "supply": 512,
   "brief": "The old drawing toy: a toothed wheel rolling round inside a toothed ring with a gel pen in one of its holes, so the pattern comes from the real tooth counts. The gears and the inks change every mint. Drag round the ring to draw (drag back to retrace), tap the wheel for the next pen hole or the paper for the next colour, or hold to swap to a different wheel.",
   "species": [
    [
     153,
     "Drawing Gears",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-267",
   "name": "Silver Photo",
   "fam": "Pictures",
   "set": "Pictures",
   "drop": 6,
   "supply": 512,
   "brief": "A small 1840s photo on a silver plate in an open leather case, which only looks like a picture while it reflects the dark room. The subject (a waterfall, ships at a quay, the pyramids, the moon or rarely an eclipse) and the tarnish change every mint. Drag to tilt it until the window catches it and it flips to a negative, tap to breathe on the glass, or hold to bring a candle close.",
   "species": [
    [
     267,
     "Silver Photo",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-320",
   "name": "Instant Film",
   "fam": "Pictures",
   "set": "Pictures",
   "drop": 6,
   "supply": 512,
   "brief": "A photo on long-expired instant film developing on a table, half lost to the old chemicals, with bare brown patches, roller streaks, bubbles and frosty patterns creeping in from a corner. The scene (a seaside dusk, a beach at noon, a wheat field, snow, harbour lights) and how it failed change every mint. Drag to throw it aside and take another, tap to shake it (it does nothing), or hold to warm it in your hand so the colours come up.",
   "species": [
    [
     320,
     "Instant Film",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-349",
   "name": "Dust Plume",
   "fam": "Space",
   "set": "Space",
   "drop": 6,
   "supply": 512,
   "brief": "A satellite pass over a dust storm pouring off a desert coast out over a dark ocean, carried by real wind so it curls round, eddies and leaves clear wakes behind any islands. The storm, where the coast is and the clouds change every mint. Drag to follow the plume, tap for the next day's pass, or hold to see a map of how thick the dust is.",
   "species": [
    [
     349,
     "Dust Plume",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-358",
   "name": "Hurricane Eye",
   "fam": "Space",
   "set": "Space",
   "drop": 6,
   "supply": 256,
   "brief": "A satellite looking straight down into the eye of a hurricane, with the stadium of cloud around the eye and the spiral bands all lit and shadowed by the sun. How strong it is and the kind of eye change every mint. Drag to pan across the storm, tap to run it on to the next pass, or hold to bring the sun down so the shadows stretch.",
   "species": [
    [
     358,
     "Hurricane Eye",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-515",
   "name": "Moon Crater",
   "fam": "Space",
   "set": "Space",
   "drop": 6,
   "supply": 512,
   "brief": "The edge of a crater on the Moon in hard sunlight, black sky and black shadows, with the small blue Earth low over the hills. The spot, how high the sun is and the Earth's phase change every mint, and rare ones get old rover tracks. Tap the ground to kick up dust that flies in clean arcs with no air to slow it, drag to swing the sun so the shadows and the Earth's phase turn, or hold to walk and leave your own boot prints.",
   "species": [
    [
     515,
     "Moon Crater",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-008",
   "name": "Windy Meadow",
   "fam": "Weather",
   "set": "Weather",
   "drop": 6,
   "supply": 1024,
   "brief": "A meadow on rolling hills, and you're the wind. The air really flows, so the grass, seeds, birds, flags and chimes all react to it. The season, sky, land, flowers and birds change every mint. Drag to blow a gust, hold in the sky to build a big one and let go, or tap to toss a handful of seeds.",
   "species": [
    [
     8,
     "Windy Meadow",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-413",
   "name": "First Rain",
   "fam": "Weather",
   "set": "Weather",
   "drop": 6,
   "supply": 512,
   "brief": "Big first drops of a storm landing on dry ground: each one makes a little dent, throws out wet crumbs and a puff of dust, then soaks into a ragged dark spot. The ground, the light, the wind and the view change every mint. Tap to drop one big raindrop (tap the same spot again for a puddle), hold for a shower that eases when you let go, or drag to scuff a groove in the dust or smear the mud.",
   "species": [
    [
     413,
     "First Rain",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-503",
   "name": "Prairie Storm",
   "fam": "Weather",
   "set": "Weather",
   "drop": 6,
   "supply": 2048,
   "brief": "Flat prairie at dusk under a big spinning storm: the striped updraft turns, the anvil spreads out, a rain and hail curtain hangs to one side and the grass streams in toward it. The storm's shape, how far off it is and where the sun is change every mint. Tap the storm and its next bolt comes there, drag to push a gust through the grass, or hold to let the storm come closer, with the wind rising and the lightning coming faster.",
   "species": [
    [
     503,
     "Prairie Storm",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-519",
   "name": "Waterspout",
   "fam": "Weather",
   "set": "Weather",
   "drop": 6,
   "supply": 256,
   "brief": "A flat grey sea, usually in the late afternoon, under a dark line of cloud, with a pale waterspout bending down to a ring of spray and rain falling nearby. How many spouts there are, the light and the rain change every mint. Tap the cloud base or the sea under it and a funnel tends to form near there a bit later, drag to shift the wind so the spouts lean and break up, or hold to bring the squall closer with its rain hissing over the water.",
   "species": [
    [
     519,
     "Waterspout",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-531",
   "name": "Fire Cloud",
   "fam": "Weather",
   "set": "Weather",
   "drop": 6,
   "supply": 256,
   "brief": "Watching from a grassy hill as a wildfire burns along a forested ridge a few kilometres away, drawing its smoke into one tall column that blooms into a big white cap. The size of the fire, the hour and the wind change every mint. The fire flares up on its own, and you can tap the ridge for a gust that thickens the smoke, drag sideways to swing the wind and lean the plume, or hold to let dusk fall.",
   "species": [
    [
     531,
     "Fire Cloud",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-553",
   "name": "Savanna Storm",
   "fam": "Weather",
   "set": "Weather",
   "drop": 6,
   "supply": 1024,
   "brief": "An open savanna in the last hour before sunset as the rains start, with a towering storm lit gold by the low sun, acacias and a baobab across the grass and dust glowing in the air. The storm's shape and stage, how far off it is and the trees change every mint. Tap under the storm and its next lightning strikes near there, drag to send a gust through the grass, or hold to bring the rain over you until the sun breaks through.",
   "species": [
    [
     553,
     "Savanna Storm",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-167",
   "name": "Bats at Dusk",
   "fam": "Sky Lights",
   "set": "Sky Lights",
   "drop": 6,
   "supply": 256,
   "brief": "A cave mouth at dusk, with bats pouring out in a spiral and streaming off over the land in a ribbon. The cave, the hour and the path the ribbon takes change every mint. Tap to send a falcon diving in and a kink runs down the ribbon, drag to push it with wind, or hold to bring the night on faster.",
   "species": [
    [
     167,
     "Bats at Dusk",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-256",
   "name": "Night Clouds",
   "fam": "Sky Lights",
   "set": "Sky Lights",
   "drop": 6,
   "supply": 256,
   "brief": "A long exposure at a summer midnight looking north over still water, with silver-blue clouds so high they still catch the sun, drifting in waves and swirls. The clouds, the foreground and the twilight change every mint, and rare ones get an aurora or a big wave marching through. Drag to pan along the horizon, tap to step the time-lapse forward, or hold to play it fast and watch the waves march.",
   "species": [
    [
     256,
     "Night Clouds",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-394",
   "name": "Moon Rings",
   "fam": "Sky Lights",
   "set": "Sky Lights",
   "drop": 6,
   "supply": 256,
   "brief": "A night photo of the moon behind a thin veil of cloud, with soft rings of colour around it that come from the real size of the cloud droplets. The cloud, the droplets and what's below (a roofline, a tall skyline or open water) change every mint. Drag to pan the sky, tap for a gust that brings in cloud with different droplets so the rings grow or shrink, or hold to let the veil thicken until the rings wash out.",
   "species": [
    [
     394,
     "Moon Rings",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-414",
   "name": "Hose Rainbow",
   "fam": "Sky Lights",
   "set": "Sky Lights",
   "drop": 6,
   "supply": 256,
   "brief": "A hose nozzle on a garden stake, or sometimes a soaker hose, sprays across a shaded wall with the low sun at your back, and the rainbow sits where a real one would, with a faint second bow outside it. The spray, the wall and the breeze change every mint. Drag to swing the nozzle (or roll the soaker hose) and the bow holds its place, or tap to twist the nozzle from shower to mist to fog to jet, or turn the soaker's tap up.",
   "species": [
    [
     414,
     "Hose Rainbow",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-529",
   "name": "Hole-Punch Cloud",
   "fam": "Sky Lights",
   "set": "Sky Lights",
   "drop": 6,
   "supply": 512,
   "brief": "Standing on wet sand under a flat layer of cloud with a hole in it, where ice falls out in a glowing curtain, all mirrored in the wet beach. The hole, the light and the tide change every mint. Tap the cloud or its reflection to seed a bit of ice that slowly opens a small hole of its own, drag to blow a gust that bends the falling ice, or hold to let the ice fall and the holes grow.",
   "species": [
    [
     529,
     "Hole-Punch Cloud",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-633",
   "name": "Fog Bow",
   "fam": "Sky Lights",
   "set": "Sky Lights",
   "drop": 6,
   "supply": 256,
   "brief": "A shingle spit on the Svalbard coast as the sea fog thins, with a huge white fogbow on the fog bank, grey water lapping the stones and broken icebergs half lost in the white. How high the sun is, the fog, the bow, the spit, what's standing in the fog, where you stand and the sea change every mint. Nothing to press, just watch the water creep up the stones.",
   "species": [
    [
     633,
     "Fog Bow",
     ""
    ]
   ],
   "rt": "drop06"
  },
  {
   "key": "drop06-166",
   "name": "Bait Ball",
   "fam": "Underwater",
   "set": "Underwater",
   "drop": 6,
   "supply": 512,
   "brief": "Tens of thousands of silver fish herded up against the surface, each flashing when it catches the sun, so a startle sweeps across the school as a sheet of light. The school's shape changes every mint, and rarely it's torn in two or down to the last few. Drag through it to hunt (fast drags split it), tap for a strike, or hold to push the ball up against the surface.",
   "species": [
    [
     166,
     "Bait Ball",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-532",
   "name": "Under the Ice",
   "fam": "Underwater",
   "set": "Underwater",
   "drop": 6,
   "supply": 256,
   "brief": "Under two metres of sea ice in spring, where the light comes through green-blue, cracks show as lines of light and a seal's hole sends rays fanning down. The snow on top, the algae, the cracks and where you float change every mint. Tap to breathe out bubbles that pool under the ice like wobbly silver mirrors, drag to stir a slow current, or hold to let the sun come out.",
   "species": [
    [
     532,
     "Under the Ice",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-541",
   "name": "Under the Surf",
   "fam": "Underwater",
   "set": "Underwater",
   "drop": 6,
   "supply": 1024,
   "brief": "A few metres down in the surf on a bright morning, looking up at the underside of the waves with a bright circle of sky and broken sun in the middle. Each wave breaks right over you, driving foam and bubbles down that rise again in curtains. The moment, where you sit and the swell change every mint. Tap overhead to pick where the next wave breaks, drag to slosh the surge back and forth, or hold to bring in a bigger set.",
   "species": [
    [
     541,
     "Under the Surf",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-544",
   "name": "Open Ocean",
   "fam": "Underwater",
   "set": "Underwater",
   "drop": 6,
   "supply": 1024,
   "brief": "Hanging in the open ocean with nothing around but light and water, sunbeams fanning down from a glittering surface into the deep. The weather, the sea and the depth change every mint, and now and then a whale sings somewhere far off. Tap to breathe out bubbles that grow, wobble and flash as they rise through the beams, drag to roll a swell over, or hold to bring a cloud over the sun and watch the beams go out.",
   "species": [
    [
     544,
     "Open Ocean",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-580",
   "name": "Night Dive",
   "fam": "Underwater",
   "set": "Underwater",
   "drop": 6,
   "supply": 256,
   "brief": "Hovering over seagrass or a little seaweed forest at night, where your torch finds ribbon leaves swaying in the surge, a starfish on the sand and plankton glittering in the beam. Where you hover, what grows on the bottom and the moon change every mint. Drag to sweep the torch and the stirred water flares with green sparks, tap a spot to point the torch there, or hold to switch it off and let your eyes slowly get used to the sparks and the moonlit water.",
   "species": [
    [
     580,
     "Night Dive",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-582",
   "name": "Shipwreck",
   "fam": "Underwater",
   "set": "Underwater",
   "drop": 6,
   "supply": 1024,
   "brief": "An old cargo ship lying on the sand in the clear Red Sea, mostly around midday, grown over with soft corals, with sunbeams through the rigging and batfish far off in the haze. Where you hover, the ship, how far it leans and the fish change every mint. Tap to breathe out bubbles that slide up the hull and part the school, drag to send a current along the wreck, or hold to let a cloud drift over the sun until the light slowly comes back.",
   "species": [
    [
     582,
     "Shipwreck",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-583",
   "name": "Overwater Hut",
   "fam": "Underwater",
   "set": "Underwater",
   "drop": 6,
   "supply": 256,
   "brief": "The deck of an overwater hut in a Pacific lagoon at night, with the light making a turquoise pool in the dark water and the sand clear underneath, while the rest of the lagoon mirrors the sky and the neighbours' lamps. The night, the visitors and the floor change every mint. Tap the water and whatever's close darts off, drag to send a breeze across, or hold to switch the light off and watch sparks flash wherever a fish moves.",
   "species": [
    [
     583,
     "Overwater Hut",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-628",
   "name": "Clear Rift",
   "fam": "Underwater",
   "set": "Underwater",
   "drop": 6,
   "supply": 512,
   "brief": "Floating in the Silfra fissure in glacier water, between black lava walls with moss and algae on the ledges and fallen boulders on the floor, the surface a silver mirror overhead. The light, how clear it is, the moss and the shape of the crack change every mint, and some float half in and half out of the water. Nothing to do but look while the light moves.",
   "species": [
    [
     628,
     "Clear Rift",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1
  },
  {
   "key": "drop06-629",
   "name": "Brine Pool",
   "fam": "Underwater",
   "set": "Underwater",
   "drop": 6,
   "supply": 512,
   "brief": "The floor of the Gulf of Mexico seen from your own little sub, with a pool of brine so heavy it sits there like a lake, ringed by brown mussels, marine snow drifting through your lamps and another sub's lights across the water. The lamp colours, the size of the pool, the shore, the snow, where you are and the state of the brine change every mint. No controls, just look.",
   "species": [
    [
     629,
     "Brine Pool",
     ""
    ]
   ],
   "rt": "drop06"
  },
  {
   "key": "drop06-039",
   "name": "Skipping Stones",
   "fam": "Shorelines",
   "set": "Shorelines",
   "drop": 6,
   "supply": 512,
   "brief": "A pebble beach on a still lake at dusk where the stones skip by real physics, and every throw gets laid out in pebbles on a stone on the shore. The water, the light and the shore change every mint. Drag back and let go to throw (about 20 degrees of tilt skips best, and a fast flick spins it), tap to pick another stone, or hold to wait for dark.",
   "species": [
    [
     39,
     "Skipping Stones",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-042",
   "name": "Low Tide",
   "fam": "Shorelines",
   "set": "Shorelines",
   "drop": 6,
   "supply": 256,
   "brief": "A patch of tidal sand in low sun, where the water floods the ripples, drains back through channels it cuts and wipes out the tracks birds and crabs left behind. What lives there and the tide change every mint. Drag down to push the tide in or up to let it go out, tap to drop a shell or pebble, or hold to bring the sun down through gold to pink.",
   "species": [
    [
     42,
     "Low Tide",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-052",
   "name": "Paper Boats",
   "fam": "Shorelines",
   "set": "Shorelines",
   "drop": 6,
   "supply": 512,
   "brief": "Kerb height in a stone gutter after a summer rain, where the water flows round the stones to the drain. Paper boats float on it, spin, run aground and sink, and pile up on the drain until a surge floats them over. Tap to set a boat on the water, drag slowly to build a leaf dam, drag fast to send a wave, or hold for rain.",
   "species": [
    [
     52,
     "Paper Boats",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-350",
   "name": "Pond Skaters",
   "fam": "Shorelines",
   "set": "Shorelines",
   "drop": 6,
   "supply": 1024,
   "brief": "Pond skaters on a clear stream seen from above, keeping to the edge of the shade from the bank. Every foot dents the water and throws a dark round shadow with a ring of light onto the bed. The depth, the light and how many there are change every mint, and rarely there's a mating pair. Tap to drop a struggling fly they race to, or drag a twig through the water to scatter them.",
   "species": [
    [
     350,
     "Pond Skaters",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-356",
   "name": "Dry Ring",
   "fam": "Shorelines",
   "set": "Shorelines",
   "drop": 6,
   "supply": 1024,
   "brief": "Wet beach sand in low sun, with a flat stone pressed into it. Push and the sand around it sucks the water down and goes pale in a growing ring, then glazes back over when you let up. The sand, the sun and the surface change every mint. Hold to press the stone in (it hops to your finger), drag to plough it along, let go to watch the ring glaze over, or tap to drop a pebble.",
   "species": [
    [
     356,
     "Dry Ring",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-442",
   "name": "Stream Table",
   "fam": "Shorelines",
   "set": "Shorelines",
   "drop": 6,
   "supply": 256,
   "brief": "A lab tray of wet sand in a dim room with a tiny river that actually carves bends, drops sand on the inside of turns and undercuts banks until they slump. The sand, the tilt, the flow and where you're looking from change every mint. Tap to drop a pebble in, drag to draw a groove with your finger, or hold still to open the tap and flood the table.",
   "species": [
    [
     442,
     "Stream Table",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-501",
   "name": "Salt Mirror",
   "fam": "Shorelines",
   "set": "Shorelines",
   "drop": 6,
   "supply": 512,
   "brief": "A flooded salt flat around dusk where the sky is mirrored all around, clouds above and below, and far islands and peaks float on their reflections. The time, the clouds and the wind change every mint, and about one in twenty has flamingos feeding in the shallows. Tap the water to toss a lump of salt and watch its rings run out across the mirror.",
   "species": [
    [
     501,
     "Salt Mirror",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-571",
   "name": "Incoming Tide",
   "fam": "Shorelines",
   "set": "Shorelines",
   "drop": 6,
   "supply": 1024,
   "brief": "Huge sand flats at dusk with a spring tide sliding in silently, filling the creeks first, then joining the pools until it's all one mirror around a rocky island with an abbey on top. The light, how far the tide has come and where you stand change every mint. Tap the water to drop a pebble or the sand to leave a footprint that fills up, drag to set the wind and break the mirror, or hold to bring the flood all the way in.",
   "species": [
    [
     571,
     "Incoming Tide",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-587",
   "name": "Lava Shore",
   "fam": "Shorelines",
   "set": "Shorelines",
   "drop": 6,
   "supply": 512,
   "brief": "A volcanic coast, usually at night, where glowing lava crosses a low shelf and spills into the surf, and the waves blow up into steam that rolls off on the wind. The hour, the swell and where you stand change every mint. Tap the sea to raise a bigger wave that bursts the plume, drag across the shelf to spread a new flow of lava that skins over as it cools, or hold to let the plume die down so the moon and stars clear.",
   "species": [
    [
     587,
     "Lava Shore",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-273",
   "name": "Pancake Ice",
   "fam": "Ice & Snow",
   "set": "Ice & Snow",
   "drop": 6,
   "supply": 512,
   "brief": "A polar sea freezing in a long swell, where rimmed discs of young ice bump around on real waves in a slushy soup. The size of the pans, how packed they are and the swell change every mint. Drag to send a swell through (faster for longer waves), hold to chill so the pans grow and climb onto each other, or tap a pan so it dips and takes the sea over its rim.",
   "species": [
    [
     273,
     "Pancake Ice",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-502",
   "name": "Iceberg Lagoon",
   "fam": "Ice & Snow",
   "set": "Ice & Snow",
   "drop": 6,
   "supply": 512,
   "brief": "Sitting in a little boat on a glacier lagoon in the long northern dusk, with blue and white bergs drifting under the glacier front and seals popping up. The light, the shape of the big berg and the mist change every mint. Tap a berg to rock it (one near its balance may roll over), tap the glacier to make the next calving come sooner, or tap the water for ripples. Drag to send a breeze across, or hold to drift slowly forward.",
   "species": [
    [
     502,
     "Iceberg Lagoon",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-555",
   "name": "Arctic Harbour",
   "fam": "Ice & Snow",
   "set": "Ice & Snow",
   "drop": 6,
   "supply": 512,
   "brief": "The snowy quay of a small fishing harbour in the polar twilight, with red cabins on stilts, racks of drying cod and boats on water so still it mirrors the peaks. The peaks, the cabins and the boats change every mint, and rare ones get a night of aurora. Tap the water to drop a pebble, drag to send a breath of wind across so the reflection breaks up, or hold to let the short day run out into stars and a thin green aurora.",
   "species": [
    [
     555,
     "Arctic Harbour",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-561",
   "name": "Hot Spring",
   "fam": "Ice & Snow",
   "set": "Ice & Snow",
   "drop": 6,
   "supply": 2048,
   "brief": "The rocky edge of an outdoor hot spring in winter, with lanterns glowing in the steam, snow on the bamboo fence and the cedars, and an inn lit across the valley. The hour, how deep the snow is and how thick the steam is change every mint. Tap the water to toss a pebble, drag to blow the steam aside, or hold and the sky slowly turns: the snow stops and the moon comes out, or on clear nights and sunny days it clouds over and snows again.",
   "species": [
    [
     561,
     "Hot Spring",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-566",
   "name": "Narwhals",
   "fam": "Ice & Snow",
   "set": "Ice & Snow",
   "drop": 6,
   "supply": 1024,
   "brief": "Standing at the edge of the sea ice in June, looking over a strip of still black water between the floes with a pod of narwhals milling in it, tusks lying along the water and calves beside their mums. The sun, the weather and what the pod is doing change every mint, and rare ones get males sparring with their tusks. Tap the water to drop a lump of snow in, drag to send a gust across the mirror, or hold to let the midnight sun dip and climb again without setting.",
   "species": [
    [
     566,
     "Narwhals",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-596",
   "name": "Drift Ice",
   "fam": "Ice & Snow",
   "set": "Ice & Snow",
   "drop": 6,
   "supply": 512,
   "brief": "A shore of dark rock and crusted snow looking out over sea ice that goes all the way to the horizon, from round pancakes to broken plates piled into ridges. Where you stand, the light and weather, how tight the ice is and the sea smoke change every mint. There's nothing to press, just watch the ice ride the swell.",
   "species": [
    [
     596,
     "Drift Ice",
     ""
    ]
   ],
   "rt": "drop06",
   "music": 1
  },
  {
   "key": "drop06-607",
   "name": "Frozen Bubbles",
   "fam": "Ice & Snow",
   "set": "Ice & Snow",
   "drop": 6,
   "supply": 256,
   "brief": "Standing on wind-swept lake ice on a clear January evening, looking down through it at towers of frozen methane bubbles and white cracks running deep, with thin snow snaking past. The hour, the bubbles, the snow cover, the cracks, the ice colour, the far mountains and the wind change every mint. No controls, just look.",
   "species": [
    [
     607,
     "Frozen Bubbles",
     ""
    ]
   ],
   "rt": "drop06",
   "music": 1
  },
  {
   "key": "drop06-617",
   "name": "Wall in Snow",
   "fam": "Ice & Snow",
   "set": "Ice & Snow",
   "drop": 6,
   "supply": 1024,
   "brief": "The walkway of the Great Wall after a snowy night, mostly at first light in thin fog, with battlements and square towers running along the ridges until they fade out. Where you stand, the sky, the snow and the wind change every mint. No controls, just look.",
   "species": [
    [
     617,
     "Wall in Snow",
     ""
    ]
   ],
   "rt": "drop06"
  },
  {
   "key": "drop06-624",
   "name": "Glacier Ice",
   "fam": "Ice & Snow",
   "set": "Ice & Snow",
   "drop": 6,
   "supply": 1024,
   "brief": "Wind-polished old ice deep in Antarctica, scalloped into shallow cups and cracked with white veins, with thin snow streamers and black peaks far off. The hour, the wind, the ice colour, the cracks, the snow, the sky (rarely a flat white overcast) and where you stand (from crouched by a crack to looking straight down into the ice) change every mint. No controls, just look.",
   "species": [
    [
     624,
     "Glacier Ice",
     ""
    ]
   ],
   "rt": "drop06"
  },
  {
   "key": "drop06-511",
   "name": "Peat Bog",
   "fam": "Golden Hour",
   "set": "Golden Hour",
   "drop": 6,
   "supply": 1024,
   "brief": "A wide flat bog at dawn, with mist over the moss, dew everywhere and a bird calling somewhere far off. The light, the mist, the pools and the season change every mint, and rare ones get a red sun in haze or a frost with ice on the pools. Tap a pool to drop a little puff of wind on it, drag to send a breeze across the bog, or hold to let the sun climb and burn the mist off.",
   "species": [
    [
     511,
     "Peat Bog",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-556",
   "name": "Steppe Night",
   "fam": "Golden Hour",
   "set": "Golden Hour",
   "drop": 6,
   "supply": 512,
   "brief": "Out in the feather grass of the steppe on a June evening, with a white ger, its door open on the firelight, stove smoke drifting and horses grazing in the afterglow. The stars come out brightest first and the Milky Way climbs out of the east. The sky, the moon and the herd change every mint. Tap the grass to part it or tap the ger to feed the stove, drag to send a gust through the grass, or hold to run the night on.",
   "species": [
    [
     556,
     "Steppe Night",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-564",
   "name": "Red Dune",
   "fam": "Golden Hour",
   "set": "Golden Hour",
   "drop": 6,
   "supply": 256,
   "brief": "A cracked white clay pan with camelthorn trees that died centuries ago, in front of a red dune whose top burns orange while the rest sits in blue shadow. The dune, the trees and the hour change every mint, and rare ones get a single tree or a gale smoking off the crests. Tap a crest to blow a glowing plume of sand off it, drag left or right to move the sun so the shadow slides down the dune, or hold for full morning, when the pan glares white and the trees turn bleached grey.",
   "species": [
    [
     564,
     "Red Dune",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-569",
   "name": "Roaring Stag",
   "fam": "Golden Hour",
   "set": "Golden Hour",
   "drop": 6,
   "supply": 512,
   "brief": "A heather slope above a glen at dawn, where the valley floor is a sea of mist with the loch glinting through, and a stag in the rut roars below you with his breath steaming. The light, the mist and his antlers change every mint, and rare ones get a hard frost or no hinds at all. He roars when he likes and a rival sometimes answers. Drag left or right to pour the mist along the glen, or hold to let the sun climb and lift the mist off the loch.",
   "species": [
    [
     569,
     "Roaring Stag",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-570",
   "name": "Lavender Field",
   "fam": "Golden Hour",
   "set": "Golden Hour",
   "drop": 6,
   "supply": 1024,
   "brief": "A furrow in a lavender field, mostly on a July sunset, with violet rows running away toward a lone tree, an old stone farmhouse far off and blue hills on the rim. The weather and the hour, where you stand and how far along the lavender is change every mint. Drag to send a breeze rolling across the rows, or hold to let the sun go down (at dawn it comes up instead, and at night the moon rises).",
   "species": [
    [
     570,
     "Lavender Field",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-575",
   "name": "Temple Pond",
   "fam": "Golden Hour",
   "set": "Golden Hour",
   "drop": 6,
   "supply": 512,
   "brief": "The edge of a lotus pond before a great stone temple, with five bud-shaped towers dark against the sky and doubled in the water among the lotus leaves and flowers. The hour and weather, the lotus and the mist change every mint. Tap the pond or the temple's reflection to send rings across the mirror, drag to send a breath of wind over it, or hold to bring the sun slowly up (on the night ones, the first light).",
   "species": [
    [
     575,
     "Temple Pond",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-585",
   "name": "Evening Sails",
   "fam": "Golden Hour",
   "set": "Golden Hour",
   "drop": 6,
   "supply": 512,
   "brief": "A granite boulder at the edge of the Nile at Aswan late in the day, with white feluccas crossing a mirror-flat river below golden dunes and a cliff cut with old tomb doors. Where you stand, what the nearest boat is doing and the breeze change every mint. Tap a boat to make it go about or tap the water for a ripple, drag to send a breeze down the river so the sails fill, or hold to bring the sun down into a pink and grey dusk with lanterns coming on.",
   "species": [
    [
     585,
     "Evening Sails",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-588",
   "name": "Midsummer Fire",
   "fam": "Golden Hour",
   "set": "Golden Hour",
   "drop": 6,
   "supply": 1024,
   "brief": "The granite shore of a lake on Midsummer Eve, with a pile of logs burning on a little rock island under a sky that never gets dark, and a red sauna with a lit window up the slope. The hour, the sky and the neighbours' fires change every mint. Tap to stir the fire so a log slumps in and sparks climb, drag to send a breeze across the lake, or hold to let the night run on as the fire burns down and the sun comes back up.",
   "species": [
    [
     588,
     "Midsummer Fire",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-595",
   "name": "Golden Larches",
   "fam": "Golden Hour",
   "set": "Golden Hour",
   "drop": 6,
   "supply": 512,
   "brief": "The rocky edge of a high mountain lake in the Engadine in autumn, with larch slopes gone gold above their blue shadows. The hour and weather, where you stand, how far the larches have turned and the snow line change every mint. Drag to send a breath of air across the water, or hold and the hour moves on, with the light climbing off the mountain or cloud shadows going by.",
   "species": [
    [
     595,
     "Golden Larches",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-169",
   "name": "Glowworm Cave",
   "fam": "Far Places",
   "set": "Far Places",
   "drop": 6,
   "supply": 512,
   "brief": "A limestone cave over still black water, seen from a drifting boat. Thousands of glowworms hang from the ceiling, and a noise or a light makes them fade in a slow wave. How crowded the ceiling is and the glow colour change every mint. Drag to paddle, tap the water to drop a pebble, or hold for a dim torch that shows the rock while the glow nearby goes out.",
   "species": [
    [
     169,
     "Glowworm Cave",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-550",
   "name": "Limestone River",
   "fam": "Far Places",
   "set": "Far Places",
   "drop": 6,
   "supply": 1024,
   "brief": "A wide green river winding between steep limestone peaks, each one fainter and bluer in the mist, mostly at dawn and sometimes in rain, at dusk or under the moon. The light, the mist and the rafts change every mint. Tap the water to send a ring through the reflections, drag to pole across the river so the towers slide past each other, or hold to bring the sun up and lift the mist.",
   "species": [
    [
     550,
     "Limestone River",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-551",
   "name": "Prayer Flags",
   "fam": "Far Places",
   "set": "Far Places",
   "drop": 6,
   "supply": 1024,
   "brief": "A high pass with strings of five-colour flags running from a stone cairn, flapping like real cloth, with snowy peaks behind. How the strings are hung, the wind and how old the flags are change every mint, and sometimes there's a sea of cloud below. Tap a string to send a gust down it, drag sideways to turn the wind, or hold to bring a cloud bank boiling up through the pass.",
   "species": [
    [
     551,
     "Prayer Flags",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-552",
   "name": "Night Canoe",
   "fam": "Far Places",
   "set": "Far Places",
   "drop": 6,
   "supply": 256,
   "brief": "The front of a dugout canoe on a rainforest river at night, mostly with no moon, with fireflies along the banks and the stars mirrored in the water. Where you drift and look, the lamp and how the fireflies flash change every mint. Drag to sweep your headtorch over the banks and catch the caiman eyes, tap the water to dip the paddle, or hold to switch the torch off so your eyes adjust and the stars blaze.",
   "species": [
    [
     552,
     "Night Canoe",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-560",
   "name": "Redwood Grove",
   "fam": "Far Places",
   "set": "Far Places",
   "drop": 6,
   "supply": 1024,
   "brief": "A coast redwood grove, mostly on a summer morning as the sea fog burns off, with trunks metres across, sword ferns, a mossy fallen giant and a creek. The light, the fog and the grove change every mint. Tap a sunbeam to swirl fog through it, drag to drift the fog so the beams sweep across the trunks, or hold to let the sun burn through (let go and the fog rolls back).",
   "species": [
    [
     560,
     "Redwood Grove",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-577",
   "name": "Cave Jungle",
   "fam": "Far Places",
   "set": "Far Places",
   "drop": 6,
   "supply": 256,
   "brief": "Deep in a huge cave, with sunlight falling from a collapsed hole in the roof onto a little jungle on the floor, headlamps crossing the boulders and swifts flicking through the beam. The light, the shape of the hole, where you stand and the cave cloud change every mint. Drag to push the cloud across the hole so the beam breaks up and comes back, or hold to move the hour on slowly.",
   "species": [
    [
     577,
     "Cave Jungle",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-584",
   "name": "Stone Heads",
   "fam": "Far Places",
   "set": "Far Places",
   "drop": 6,
   "supply": 256,
   "brief": "The south coast of Rapa Nui on a night that's usually moonless, with up to fifteen moai on a stone platform, backs to the sea, under the real southern sky for that date and hour. The setting, where you stand, the hour and the cloud change every mint. Drag to send wind through the grass and spray off the surf, or hold to run the night on toward dawn.",
   "species": [
    [
     584,
     "Stone Heads",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-623",
   "name": "Chalk Desert",
   "fam": "Far Places",
   "set": "Far Places",
   "drop": 6,
   "supply": 256,
   "brief": "The White Desert of Farafra on a full moon night, standing among chalk mushrooms, sugarloaf cones and humps on cream sand scattered with black stones, with low mist on the plain and hills far off. Where you stand, how high the moon is and the haze change every mint. Nothing to touch, just watch the dust drift, the mist breathe, the shadows creep and now and then a meteor go over.",
   "species": [
    [
     623,
     "Chalk Desert",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1
  },
  {
   "key": "drop06-038",
   "name": "Stone Church",
   "fam": "Great Halls",
   "set": "Great Halls",
   "drop": 6,
   "supply": 1024,
   "brief": "An empty stone church where the coloured light from the windows lands exactly where it would on the floor, pillars, pews and walls. The church, the glass, the season and where you're standing change every mint. Drag to move the sun, hold for a cloud to pass over, or tap a window to make it glow and ring.",
   "species": [
    [
     38,
     "Stone Church",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-066",
   "name": "Drip Cave",
   "fam": "Great Halls",
   "set": "Great Halls",
   "drop": 6,
   "supply": 512,
   "brief": "A still limestone cave lit by one lamp on a ledge. Drops fall from the stalactites into a clear pool, each one ringing the water with a note, so the cave plays slow music. Tap a stalactite to shake a drop loose, drag to carry the lamp, tap the lamp to put it out or light it, or hold to run time so the formations grow and meet.",
   "species": [
    [
     66,
     "Drip Cave",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-601",
   "name": "Sand Rooms",
   "fam": "Great Halls",
   "set": "Great Halls",
   "drop": 6,
   "supply": 512,
   "brief": "Inside an abandoned house in an old diamond mining town, mostly late in the afternoon, with pale sand drifted through the doorways in sharp ridges and each room beyond lit its own way. Some mints come at white noon, by moonlight or in a sandstorm, and some are a long passage of doorways. No controls, just look.",
   "species": [
    [
     601,
     "Sand Rooms",
     ""
    ]
   ],
   "rt": "drop06"
  },
  {
   "key": "drop06-606",
   "name": "Flooded Cistern",
   "fam": "Great Halls",
   "set": "Great Halls",
   "drop": 6,
   "supply": 256,
   "brief": "A low walkway in a vast old underground cistern, with hundreds of mismatched marble columns standing in still water under brick arches, each with a hooded lamp at its foot, and drips breaking the mirror now and then. Where you stand, the lamps and the water level change every mint, and rare ones have a shaft of daylight. No controls, just look.",
   "species": [
    [
     606,
     "Flooded Cistern",
     ""
    ]
   ],
   "rt": "drop06"
  },
  {
   "key": "drop06-627",
   "name": "Old Baths",
   "fam": "Great Halls",
   "set": "Great Halls",
   "drop": 6,
   "supply": 2048,
   "brief": "Inside a closed-down public baths in winter, with a pool of still pale-green water, cracked cream and green tiles and flaking cubicle doors, some swung open or hanging off. The hour, how much water is left, the light and how much of the roof is left change every mint. No controls, just look.",
   "species": [
    [
     627,
     "Old Baths",
     ""
    ]
   ],
   "rt": "drop06"
  },
  {
   "key": "drop06-632",
   "name": "Reading Room",
   "fam": "Great Halls",
   "set": "Great Halls",
   "drop": 6,
   "supply": 256,
   "brief": "A great domed reading room through a winter afternoon and evening, with curved rows of desks, shaded lamps, books up to the galleries and a ring of tall windows. The lamps and how many are lit, the hour, where you sit or stand and what readers left behind change every mint. It's a quiet room with nothing to press: dust hangs in the lamplight, a lamp sometimes falters and the windows slowly darken.",
   "species": [
    [
     632,
     "Reading Room",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1
  },
  {
   "key": "drop06-639",
   "name": "Striped Arches",
   "fam": "Great Halls",
   "set": "Great Halls",
   "drop": 6,
   "supply": 512,
   "brief": "A great hall of slender mismatched columns carrying two tiers of striped horseshoe arches, rank behind rank into the dark, over a pale polished floor. The lamp colour, the stone, the doors (one open, a row open on a sunny courtyard, or all shut), where you stand and how the bays are built change every mint. No controls, just look.",
   "species": [
    [
     639,
     "Striped Arches",
     ""
    ]
   ],
   "rt": "drop06"
  },
  {
   "key": "drop06-025",
   "name": "Sleeper Train",
   "fam": "Sleeper Train",
   "set": "Sleeper Train",
   "drop": 6,
   "supply": 128,
   "brief": "A window seat on a sleeper train at night, with the country rolling past. At each junction you can send it to the coast, mountains, a river or a sleeping town. The season and the country change every mint. Tap at a junction to pick the line, drag to pull the blind, hold to stop at a little station, or tap the lamp to switch it off.",
   "species": [
    [
     25,
     "Sleeper Train",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-036",
   "name": "Candle",
   "fam": "Candle",
   "set": "Candle",
   "drop": 6,
   "supply": 128,
   "brief": "One candle burning in a dark room lit by nothing else. The wax melts into a pool that spills over the low side and runs down in drips that set into layers. The candle and the draught change every mint. Drag toward the flame to blow on it (blow hard and it goes out), tap to relight it, hold near it to shield it, or tap the pool to spill a drip.",
   "species": [
    [
     36,
     "Candle",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-196",
   "name": "Billiards",
   "fam": "Billiards",
   "set": "Billiards",
   "drop": 6,
   "supply": 128,
   "brief": "A billiards table under one low lamp, with real spin. The cloth, the balls and where the camera stands change every mint. Drag out from the cue ball to aim and let go to shoot (further is harder, back to the ball cancels), press on the ball up close to set the spin, tap to move the camera, or hold while they roll to slow time.",
   "species": [
    [
     196,
     "Billiards",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-124",
   "name": "Ball Cradle",
   "fam": "Ball Cradle",
   "set": "Ball Cradle",
   "drop": 6,
   "supply": 128,
   "brief": "Polished balls hanging on threads in a row. They really pass the knock along, one out and one out, until the clicks fade into the whole group swaying. How many there are changes every mint. Drag a ball out to lift it (slide along the row first to grab more), tap to catch and steady one, or hold to slow time and watch the knock pass through.",
   "species": [
    [
     124,
     "Ball Cradle",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-204",
   "name": "Gold Crystals",
   "fam": "Gold Crystals",
   "set": "Gold Crystals",
   "drop": 6,
   "supply": 128,
   "brief": "A flask of hot clear solution in a dark lab. As it cools, thin gold plates form and drift down, dark until they catch the lamp and flash, settling into a glittering bed. The flask, the lamp, the crystal size and the colour of the gold change every mint. Hold to light the burner and melt them away (let go and they form again), or drag to swirl the flask.",
   "species": [
    [
     204,
     "Gold Crystals",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-465",
   "name": "Jar Aurora",
   "fam": "Jar Aurora",
   "set": "Jar Aurora",
   "drop": 6,
   "supply": 128,
   "brief": "A magnetised ball in a glass vacuum jar gathers a glow into two rings round its poles, and sometimes into a belt round its middle like a planet's rings. Which way the magnet points and the gas and its colour (violet air, blue argon, orange neon) change every mint. Drag to turn the ball, tap to pulse the voltage so the rings flare and ripple, or hold to let gas in so the glow spreads into a haze.",
   "species": [
    [
     465,
     "Jar Aurora",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-237",
   "name": "Night Vision",
   "fam": "Night Vision",
   "set": "Night Vision",
   "drop": 6,
   "supply": 128,
   "brief": "The night sky through a night vision tube, a round grainy field full of stars, the Milky Way, satellites and meteors over a dark wood. The tube colour and the sky change every mint. Drag to aim the tube, tap to switch the infrared lamp on or off, or hold to swing onto the bright planet or the Moon and watch the glare pull the field down (let go and it swings back).",
   "species": [
    [
     237,
     "Night Vision",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-322",
   "name": "Tintype Sea",
   "fam": "Tintype Sea",
   "set": "Tintype Sea",
   "drop": 6,
   "supply": 64,
   "brief": "A wet-plate photo of a rocky coast on a small black iron plate, with the swirly blur of an old brass lens. The spot (rocks in the surf, a cove, an island in the mist, tide flats, a breakwater) and the flaws change every mint. Tap to pour the developer and watch the picture rise, drag to set up a new plate on another bit of coast, or hold to tilt it into the window light so it flips to a negative.",
   "species": [
    [
     322,
     "Tintype Sea",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-334",
   "name": "Mars Sunset",
   "fam": "Mars Sunset",
   "set": "Mars Sunset",
   "drop": 6,
   "supply": 128,
   "brief": "A rover's camera on Mars as the sun sets, with a small white sun in a cold blue glow, a dull butterscotch sky and rocks in silhouette. The spot and the odd thing in the sky (Earth, a moon crossing the sun, an icy cloud) change every mint. Drag to pan the camera, tap to take the next shot a few minutes later, or hold to let a dust storm thicken until it goes dark.",
   "species": [
    [
     334,
     "Mars Sunset",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-522",
   "name": "Methane Sea",
   "fam": "Methane Sea",
   "set": "Methane Sea",
   "drop": 6,
   "supply": 64,
   "brief": "The shore of a methane sea on Titan, with orange haze for a sky and slow heavy swells rolling onto a beach of round ice cobbles. The weather, the beach and the sea change every mint. Tap to throw one of the cobbles, which tumbles up slowly and splashes down in a tall slow crown or skids to a stop on the stones, drag across the sea for a gust and big slow waves, or hold to bring a rain shaft drifting in over you.",
   "species": [
    [
     522,
     "Methane Sea",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-524",
   "name": "Cloud Balloon",
   "fam": "Cloud Balloon",
   "set": "Cloud Balloon",
   "drop": 6,
   "supply": 64,
   "brief": "A balloon drifting over an endless sea of yellow cloud on Venus, with long rolls streaming past in the wind, rifts glowing dull orange from the heat far below and a small white sun in a cream sky. The time of day, the kind of clouds and how high you float change every mint. Tap the cloud tops to make a bump of cloud swell up and slump back, drag to slide the clouds under the balloon, or hold to sink into the yellow fog (let go and you rise again).",
   "species": [
    [
     524,
     "Cloud Balloon",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-317",
   "name": "Slow Lightning",
   "fam": "Slow Lightning",
   "set": "Slow Lightning",
   "drop": 6,
   "supply": 64,
   "brief": "A lightning strike in slow motion. A branching leader steps down out of the cloud, sparks climb off a mast or a tree to meet it, and when one touches, a bright stroke lights up the cloud and the ground. What's standing in the field and how far away it is change every mint. Tap to send a new strike down there, drag sideways to scrub through it, or hold to freeze it.",
   "species": [
    [
     317,
     "Slow Lightning",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-533",
   "name": "Heat Lightning",
   "fam": "Heat Lightning",
   "set": "Heat Lightning",
   "drop": 6,
   "supply": 128,
   "brief": "A calm lake at night with a storm way across the water lighting up from inside, mirrored in the lake under the stars. What the storm looks like, how far off it is and the flash colour change every mint. Tap the cloud or its reflection and the next flashes come from there, drag across the lake to ruffle the reflection, or hold to build the storm until it flashes fast and crawls along the top.",
   "species": [
    [
     533,
     "Heat Lightning",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-035",
   "name": "Aurora Lake",
   "fam": "Aurora Lake",
   "set": "Aurora Lake",
   "drop": 6,
   "supply": 128,
   "brief": "A frozen lake in the far north at night under an aurora that hangs and folds like the real thing. The black ice mirrors the sky. The storm's colour and shape change every mint. Drag across the sky to send a surge along the curtains, hold to break them into a crown overhead, tap the sky for fast rays or tap the ice to make it sing.",
   "species": [
    [
     35,
     "Aurora Lake",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-262",
   "name": "Light Pillars",
   "fam": "Light Pillars",
   "set": "Light Pillars",
   "drop": 6,
   "supply": 64,
   "brief": "A long exposure on a freezing night toward a snowy town, where ice crystals in the air throw a pillar of light above every lamp, tall for near lamps and short for far ones. The town and the lamps change every mint, and rare ones get an aurora. Drag to pan, tap to send a breath of wind through so the pillars smear and settle, or hold to let the ice cloud thicken.",
   "species": [
    [
     262,
     "Light Pillars",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-539",
   "name": "Desert Arch",
   "fam": "Desert Arch",
   "set": "Desert Arch",
   "drop": 6,
   "supply": 128,
   "brief": "A sandstone arch framing the middle of the Milky Way over far mesas, with little pools in the rock reflecting the stars. The arch, where you stand, the moon and the hour change every mint. Drag to sweep a warm torch beam over the rock, tap a pool to break up its stars or tap the rock to blink the torch, or hold to run the night forward so the Milky Way swings up toward dawn.",
   "species": [
    [
     539,
     "Desert Arch",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-162",
   "name": "Sand Circle",
   "fam": "Sand Circle",
   "set": "Sand Circle",
   "drop": 6,
   "supply": 64,
   "brief": "A tiny male pufferfish digs a round nest into the seabed while the current wears it down. How far along it is and the shells he decorates with change every mint, with a rare visiting female. Drag to cut a groove and he comes and repairs it, tap to drop a bit of shell and he sets it on a ridge, or hold for a current that smooths it out.",
   "species": [
    [
     162,
     "Sand Circle",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-183",
   "name": "Koi Pond",
   "fam": "Koi Pond",
   "set": "Koi Pond",
   "drop": 6,
   "supply": 128,
   "brief": "A garden koi pond seen through the water from above, where the real waves bend the fish, mirror the trees and throw moving light on the stones. The koi and how many there are, the season, the water, the light, the bottom and the weather change every mint. Tap to drop pellets, drag a finger through the water and the fish shy away, or hold for rain and the koi sink.",
   "species": [
    [
     183,
     "Koi Pond",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-513",
   "name": "Sea Cave",
   "fam": "Sea Cave",
   "set": "Sea Cave",
   "drop": 6,
   "supply": 128,
   "brief": "Inside a sea cave where sunlight gets in under a low arch and lights the pool from below, throwing rippling light onto the rock roof. The cave, the swell, the water and the day outside change every mint. Tap the water to drop a pebble that sinks glowing silver, drag to push a swell in through the arch, or hold to let the tide rise so the arch narrows and the blue gets deeper.",
   "species": [
    [
     513,
     "Sea Cave",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-559",
   "name": "Sunset Surf",
   "fam": "Sunset Surf",
   "set": "Sunset Surf",
   "drop": 6,
   "supply": 128,
   "brief": "A tropical beach around sunset, where waves stand up with the light shining through them, break white and slide up the sand as thin lace, with palms dark behind you. The sky, the tide and where the sun sets change every mint. Drag to send in a set of bigger waves, or hold to set the sun and turn the sky red.",
   "species": [
    [
     559,
     "Sunset Surf",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  },
  {
   "key": "drop06-568",
   "name": "Salt Pans",
   "fam": "Salt Pans",
   "set": "Salt Pans",
   "drop": 6,
   "supply": 128,
   "brief": "A patchwork of shallow salt pans at sunset, each tinted from grey-blue to deep rose by how salty it is, with a stone windmill, salt heaps, flamingos far out and the sea beyond. Where you stand, the hour and the colours change every mint. Tap a pan to drop a pebble, drag sideways to turn the wind and spin the sails, or hold to let the sun go down (hold again to bring it back).",
   "species": [
    [
     568,
     "Salt Pans",
     ""
    ]
   ],
   "rt": "drop06",
   "touch": 1,
   "music": 1
  }
 ],
 "runtimes": {
  "drop03": "ProtoD03",
  "drop04": "ProtoD04",
  "drop70": "ProtoMaq",
  "drop06": "ProtoD06"
 },
 "grids": {
  "pfp1": {
   "1": 24,
   "2": 32,
   "3": 32,
   "4": 44,
   "5": 40,
   "7": 28,
   "8": 28,
   "9": 20,
   "36": 64,
   "41": 64,
   "44": 64,
   "47": 64,
   "51": 48,
   "56": 48,
   "57": 64,
   "58": 48,
   "61": 0,
   "69": 0,
   "82": 0,
   "83": 64,
   "85": 0,
   "101": 32,
   "102": 32,
   "103": 32,
   "105": 40,
   "107": 12,
   "110": 48,
   "201": 58,
   "204": 64,
   "205": 48,
   "206": 32,
   "208": 64
  },
  "drop03": {
   "1": 160,
   "2": 160,
   "3": 160,
   "4": 160,
   "5": 100,
   "6": 128,
   "7": 128,
   "8": 128,
   "10": 160,
   "11": 128,
   "12": 128,
   "13": 128,
   "14": 128,
   "15": 128,
   "16": 128,
   "20": 144,
   "21": 108,
   "23": 128,
   "26": 120,
   "35": 112,
   "37": 96,
   "38": 144,
   "41": 128,
   "42": 144,
   "43": 160,
   "44": 150,
   "46": 160,
   "47": 160,
   "48": 150,
   "50": 150,
   "51": 128,
   "52": 160,
   "53": 128,
   "54": 128,
   "55": 144,
   "57": 160,
   "58": 128,
   "60": 128,
   "61": 200,
   "63": 200,
   "64": 200,
   "65": 200,
   "66": 200,
   "68": 200,
   "69": 200,
   "72": 128,
   "73": 128,
   "74": 128,
   "76": 128,
   "77": 128,
   "83": 160,
   "89": 176,
   "91": 100,
   "94": 128,
   "95": 160,
   "96": 128,
   "97": 160,
   "98": 128,
   "100": 128,
   "101": 120,
   "102": 128,
   "103": 176,
   "104": 160,
   "105": 128,
   "106": 144,
   "109": 160,
   "111": 128,
   "112": 128,
   "113": 128,
   "114": 128,
   "115": 128,
   "118": 128,
   "120": 128,
   "122": 104,
   "126": 128,
   "131": 96,
   "134": 128,
   "135": 128,
   "136": 96,
   "138": 96,
   "141": 144,
   "142": 112,
   "146": 160,
   "147": 128,
   "148": 128,
   "151": 96,
   "156": 120,
   "157": 128,
   "159": 120,
   "161": 128,
   "163": 128,
   "164": 128,
   "165": 144,
   "168": 144,
   "169": 100,
   "174": 128,
   "175": 120,
   "176": 176,
   "177": 128,
   "178": 120,
   "179": 112,
   "180": 128,
   "191": 96,
   "196": 96,
   "197": 112,
   "199": 128,
   "207": 160,
   "208": 128,
   "209": 128,
   "210": 160,
   "213": 120,
   "214": 128,
   "215": 128,
   "218": 100,
   "220": 112,
   "221": 160,
   "224": 216,
   "225": 216,
   "227": 216,
   "229": 160,
   "231": 128,
   "232": 128,
   "233": 128,
   "234": 128,
   "235": 128,
   "236": 128,
   "237": 120,
   "238": 128,
   "239": 128,
   "240": 128,
   "242": 128,
   "244": 160,
   "245": 160,
   "246": 160,
   "248": 144,
   "249": 104,
   "250": 96,
   "251": 128,
   "252": 100,
   "253": 120,
   "254": 100,
   "255": 96,
   "256": 100,
   "257": 96,
   "262": 144,
   "266": 128,
   "267": 160,
   "269": 144,
   "271": 96,
   "274": 144,
   "275": 128,
   "281": 144,
   "285": 112,
   "288": 160,
   "289": 160
  },
  "drop04": {
   "1": 200,
   "19": 125,
   "31": 125,
   "33": 125,
   "52": 160,
   "56": 125,
   "61": 200,
   "62": 200,
   "66": 200,
   "67": 200,
   "68": 200,
   "71": 200,
   "75": 200,
   "80": 160,
   "87": 125,
   "91": 100,
   "92": 100,
   "94": 125,
   "95": 125,
   "96": 125,
   "98": 125,
   "99": 125,
   "100": 125,
   "101": 125,
   "102": 125,
   "103": 160,
   "105": 160,
   "117": 160,
   "118": 160,
   "133": 200,
   "141": 125,
   "143": 120,
   "151": 240,
   "154": 200,
   "156": 160,
   "158": 200,
   "162": 128,
   "165": 96,
   "166": 160,
   "167": 100,
   "168": 125,
   "172": 112,
   "173": 125,
   "175": 125,
   "177": 125,
   "179": 125,
   "180": 125,
   "186": 200,
   "189": 160,
   "191": 120,
   "192": 125,
   "197": 128,
   "222": 160,
   "240": 125,
   "243": 100,
   "263": 120,
   "264": 125,
   "265": 136,
   "291": 160,
   "292": 160,
   "295": 120,
   "299": 112,
   "301": 200,
   "304": 160,
   "308": 200,
   "309": 200,
   "314": 100,
   "319": 100,
   "336": 100,
   "341": 160,
   "343": 128,
   "348": 80,
   "386": 125,
   "387": 125,
   "482": 125,
   "484": 125,
   "489": 125
  },
  "drop06": {
   "8": 0,
   "9": 0,
   "10": 0,
   "25": 0,
   "27": 0,
   "29": 0,
   "35": 0,
   "36": 0,
   "37": 0,
   "38": 0,
   "39": 0,
   "42": 0,
   "46": 0,
   "50": 0,
   "52": 0,
   "56": 0,
   "66": 0,
   "70": 0,
   "72": 0,
   "79": 0,
   "80": 0,
   "83": 0,
   "84": 0,
   "85": 0,
   "91": 0,
   "92": 0,
   "93": 0,
   "121": 0,
   "124": 0,
   "126": 0,
   "140": 0,
   "147": 0,
   "151": 0,
   "153": 0,
   "162": 0,
   "166": 0,
   "167": 0,
   "169": 0,
   "171": 0,
   "173": 0,
   "183": 0,
   "186": 0,
   "189": 0,
   "196": 0,
   "197": 0,
   "204": 0,
   "205": 0,
   "209": 0,
   "211": 0,
   "212": 0,
   "213": 0,
   "214": 0,
   "215": 0,
   "218": 0,
   "221": 0,
   "225": 0,
   "233": 0,
   "237": 0,
   "254": 0,
   "255": 0,
   "256": 0,
   "262": 0,
   "266": 0,
   "267": 0,
   "273": 0,
   "276": 0,
   "280": 0,
   "296": 0,
   "317": 0,
   "320": 0,
   "322": 0,
   "334": 0,
   "349": 0,
   "350": 0,
   "356": 0,
   "357": 0,
   "358": 0,
   "386": 0,
   "387": 0,
   "394": 0,
   "405": 0,
   "413": 0,
   "414": 0,
   "442": 0,
   "446": 0,
   "450": 0,
   "465": 0,
   "480": 0,
   "501": 0,
   "502": 0,
   "503": 0,
   "511": 0,
   "513": 0,
   "515": 0,
   "519": 0,
   "522": 0,
   "524": 0,
   "529": 0,
   "531": 0,
   "532": 0,
   "533": 0,
   "539": 0,
   "541": 0,
   "544": 0,
   "550": 0,
   "551": 0,
   "552": 0,
   "553": 0,
   "555": 0,
   "556": 0,
   "559": 0,
   "560": 0,
   "561": 0,
   "564": 0,
   "566": 0,
   "568": 0,
   "569": 0,
   "570": 0,
   "571": 0,
   "572": 0,
   "575": 0,
   "577": 0,
   "580": 0,
   "582": 0,
   "583": 0,
   "584": 0,
   "585": 0,
   "587": 0,
   "588": 0,
   "595": 0,
   "596": 0,
   "601": 0,
   "606": 0,
   "607": 0,
   "616": 0,
   "617": 0,
   "618": 0,
   "623": 0,
   "624": 0,
   "627": 0,
   "628": 0,
   "629": 0,
   "632": 0,
   "633": 0,
   "639": 0
  }
 },
 "art": {
  "drop06": {
   "gl": true,
   "stillAt": 4,
   "big": 1000,
   "tile": true,
   "split": true
  }
 }
};
