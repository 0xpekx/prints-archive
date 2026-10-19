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
   "isNew": true,
   "noBonus": [
    "Iso Dioramas",
    "Sky Isles",
    "Shopfronts",
    "Big Top"
   ]
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
  }
 ],
 "runtimes": {
  "drop03": "ProtoD03"
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
  }
 }
};
