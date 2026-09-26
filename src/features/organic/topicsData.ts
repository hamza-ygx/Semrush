export type Tile = { name: string; r: [number, number, number, number]; traffic: number; keywords: number; color?: string };
type TopicGroup = { name: string; traffic: number; volume: string; r: [number, number, number, number]; tiles: Tile[] };

const t = (name: string, r: [number, number, number, number], traffic = 0, keywords = 1, color?: string): Tile => ({ name, r, traffic, keywords, color });

export const treemapWidth = 1023;
export const treemapHeight = 570;

export const topicGroups: TopicGroup[] = [
  {
    name: "Accounting & Auditing",
    traffic: 51,
    volume: "3.75K",
    r: [0, 0, 485, 570],
    tiles: [
      t("redovisningsbyrå halmstad", [13, 45, 459, 436], 50, 8, "linear-gradient(75deg, #c5dafe 12%, #e6d2fe 100%)"),
      t("göra bokslut", [13, 484, 113, 73], 0, 11, "#c5d6f5"),
      t("revision halmstad", [129, 484, 111, 35], 1, 2, "#c5d6f5"),
      t("audit requirements", [243, 484, 111, 35], 0, 2, "#c5d6f5"),
      t("fastighetsredovisning", [358, 484, 114, 35], 0, 3, "#c5d6f5"),
      t("business audit", [129, 522, 111, 35], 0, 2, "#c5d6f5"),
      t("revisionerna", [243, 522, 111, 35], 0, 1, "#c5d6f5"),
      t("jhm revision", [358, 522, 114, 35], 0, 1, "#c5d6f5"),
    ],
  },
  {
    name: "Entrepreneurship & Business Development",
    traffic: 12,
    volume: "3.1K",
    r: [501, 0, 228, 316],
    tiles: [
      t("entrepreneur", [514, 46, 202, 188], 12, 1),
      t("starta holdingbolag", [514, 237, 99, 66], 0, 2),
      t("strategisk affärsutveckling", [616, 237, 100, 32], 0, 1),
      t("vad är en entreprenör", [616, 272, 100, 31], 0, 2),
    ],
  },
  {
    name: "Tax & Financial Planning",
    traffic: 0,
    volume: "2.9K",
    r: [746, 0, 162, 316],
    tiles: [
      t("fastställd förvärvsinkomst", [759, 46, 66, 91], 1, 4, "#d4d7fe"),
      t("f tax", [828, 46, 31, 91], 0, 1, "#d4d7fe"),
      t("bolagsskatt", [862, 46, 33, 91], 0, 2, "#d4d7fe"),
      t("förvärvsinkomst", [759, 141, 42, 67], 0, 2, "#d4d7fe"),
      t("förmånsvärde bil", [805, 141, 42, 67], 0, 3, "#d4d7fe"),
      t("utdelning", [851, 141, 44, 67], 0, 1, "#d4d7fe"),
      t("deklaration", [759, 212, 66, 44], 0, 2, "#d4d7fe"),
      t("direktavdrag", [759, 259, 66, 44], 0, 1, "#d4d7fe"),
      t("momsregistrering", [828, 212, 31, 91], 0, 1, "#d4d7fe"),
      t("gränsbelopp", [862, 212, 33, 91], 0, 1, "#d4d7fe"),
    ],
  },
  {
    name: "Business Administration",
    traffic: 0,
    volume: "1.4K",
    r: [924, 0, 99, 316],
    tiles: [
      t("ekonomitjänster", [937, 46, 35, 70], 0, 1, "#cfd8fe"),
      t("outsourcing ekonomi", [975, 46, 34, 70], 0, 1, "#cfd8fe"),
      t("löneadministration", [937, 120, 35, 71], 0, 1, "#cfd8fe"),
      t("bokföring", [975, 120, 34, 71], 0, 2, "#cfd8fe"),
      t("årsredovisning", [937, 195, 35, 70], 0, 3, "#cfd8fe"),
      t("affärsplan", [975, 195, 34, 70], 0, 1, "#cfd8fe"),
      t("företagsekonomi", [937, 269, 72, 34], 0, 1, "#cfd8fe"),
    ],
  },
  {
    name: "Miscellaneous Services",
    traffic: 0,
    volume: "980",
    r: [501, 332, 263, 122],
    tiles: [
      t("iso 18541", [514, 378, 65, 30]),
      t("lagerbolag", [580, 378, 67, 30]),
      t("köpa aktiebolag", [650, 378, 66, 30]),
      t("hot och utpressning", [514, 411, 65, 29]),
      t("vad är utpressning", [580, 411, 67, 29]),
      t("utpressning", [650, 411, 66, 29]),
      t("akridi halmstad", [719, 378, 32, 62]),
    ],
  },
  {
    name: "International & Legal Business",
    traffic: 0,
    volume: "420",
    r: [781, 332, 155, 113],
    tiles: [
      t("international business law", [794, 378, 63, 24], 0, 1, "#d4d6fe"),
      t("business law sweden", [860, 378, 63, 24], 0, 1, "#d4d6fe"),
      t("vat registration sweden", [794, 406, 63, 24], 0, 1, "#d4d6fe"),
      t("audit sweden", [860, 406, 63, 24], 0, 1, "#d4d6fe"),
    ],
  },
  {
    name: "Legal Compliance",
    traffic: 0,
    volume: "310",
    r: [953, 332, 70, 238],
    tiles: [
      t("aktiebolagslagen", [966, 380, 43, 41], 0, 1, "#d4d6fe"),
      t("bokföringslagen", [966, 426, 43, 40], 0, 1, "#d4d6fe"),
      t("revisionsplikt", [966, 470, 43, 40], 0, 1, "#d4d6fe"),
      t("årsredovisningslagen", [966, 515, 43, 42], 0, 1, "#d4d6fe"),
    ],
  },
  {
    name: "Personal Finance & Employee Benefits",
    traffic: 0,
    volume: "1.1K",
    r: [501, 471, 263, 99],
    tiles: [
      t("bilförmån", [514, 515, 35, 42]),
      t("beräkna bilförmån", [554, 515, 34, 42]),
      t("förmånsberäkning bil", [593, 515, 35, 42]),
      t("räkna ut förmånsvärde bil", [633, 515, 35, 42]),
      t("skatt på arbetsinkomst", [673, 515, 35, 42]),
      t("beskattningsbar förvärvsinkomst", [713, 515, 38, 42]),
    ],
  },
  {
    name: "Sustainability & Environment",
    traffic: 0,
    volume: "640",
    r: [781, 461, 155, 109],
    tiles: [
      t("begränsad miljöpåverkan", [794, 506, 63, 24], 0, 2, "#d8d5fe"),
      t("klimatpåverkan företag", [860, 506, 63, 24], 0, 1, "#d8d5fe"),
      t("hållbar utveckling", [794, 533, 63, 24], 0, 2, "#d8d5fe"),
      t("minska klimatpåverkan", [860, 533, 63, 24], 0, 1, "#d8d5fe"),
    ],
  },
];

export const wideTreemapWidth = 1124;

const g1 = "#e2d2fe";
const g3 = "#dfd3fe";
const g4 = "#d6d5fd";
const g5 = "#d3dafc";
const g6 = "#d6d6fe";
const g7 = "#d1d7ff";
const g8 = "#dad5ff";
const g9 = "#d5d6ff";

export const wideTopicGroups: TopicGroup[] = [
  {
    name: "Accounting & Auditing",
    traffic: 51,
    volume: "3.75K",
    r: [0, 0, 533, 570],
    tiles: [
      t("redovisningsbyrå halmstad", [12, 44, 433, 513], 50, 8),
      t("göra bokslut", [447, 44, 74, 105], 0, 11, g1),
      t("revision halmstad", [447, 151, 36, 103], 1, 2, g1),
      t("audit requirements", [485, 151, 36, 103], 0, 2, g1),
      t("fastighetsredovisning", [447, 256, 36, 104], 0, 3, g1),
      t("business audit", [485, 256, 36, 104], 0, 2, g1),
      t("revisionerna", [447, 362, 36, 104], 0, 1, g1),
      t("jhm revision", [485, 362, 36, 104], 0, 1, g1),
      t("bokslut aktiebolag", [447, 468, 36, 89], 0, 1, g1),
      t("revisor halmstad", [485, 468, 36, 89], 0, 1, g1),
    ],
  },
  {
    name: "Entrepreneurship & Business Development",
    traffic: 12,
    volume: "3.1K",
    r: [549, 0, 249, 270],
    tiles: [
      t("entrepreneur", [562, 44, 163, 212], 12, 1),
      t("starta holdingbolag", [727, 44, 58, 106], 0, 2),
      t("exempel på affärsplan", [727, 152, 58, 51], 0, 1),
      t("vad är en entreprenör", [727, 205, 58, 51], 0, 2),
    ],
  },
  {
    name: "Tax & Financial Planning",
    traffic: 0,
    volume: "2.9K",
    r: [549, 284, 249, 286],
    tiles: [
      t("fastställd förvärvsinkomst", [562, 330, 81, 67], 1, 4, g3),
      t("f tax", [562, 399, 81, 33], 0, 1, g3),
      t("förvärvsinkomst", [562, 434, 81, 30], 0, 2, g3),
      t("deklaration", [562, 466, 81, 30], 0, 2, g3),
      t("skatteverket deklaration", [562, 498, 81, 59], 0, 1, g3),
      t("bolagsskatt", [645, 330, 59, 44], 0, 2, g3),
      t("kommunalskatt", [645, 376, 59, 43], 0, 1, g3),
      t("bolagsform", [645, 421, 59, 73], 0, 1, g3),
      t("direktavdrag", [645, 496, 59, 61], 0, 1, g3),
      t("utdelning", [706, 330, 38, 67], 0, 1, g3),
      t("gränsbelopp", [746, 330, 39, 67], 0, 1, g3),
      t("momsregistrering", [706, 399, 79, 33], 0, 1, g3),
      t("preliminärskatt", [706, 434, 79, 30], 0, 1, g3),
      t("skattetabell", [706, 466, 38, 91], 0, 1, g3),
      t("skattesats", [746, 466, 39, 91], 0, 1, g3),
    ],
  },
  {
    name: "Business Development",
    traffic: 0,
    volume: "1.4K",
    r: [814, 0, 148, 200],
    tiles: [
      t("affärsutveckling", [827, 44, 39, 61], 0, 1, g4),
      t("affärsplan", [868, 44, 39, 61], 0, 1, g4),
      t("tillväxtstrategi", [909, 44, 40, 61], 0, 1, g4),
      t("strategisk affärsutveckling", [827, 106, 59, 40], 0, 1, g4),
      t("budgetering", [827, 148, 59, 39], 0, 1, g4),
      t("företagsekonomi", [888, 106, 29, 81], 0, 1, g4),
      t("likviditetsplanering", [919, 106, 30, 81], 0, 1, g4),
    ],
  },
  {
    name: "Miscellaneous Services",
    traffic: 0,
    volume: "980",
    r: [977, 0, 147, 200],
    tiles: [
      t("iso 18541", [990, 44, 39, 61], 0, 1, g5),
      t("lagerbolag", [1030, 44, 40, 61], 0, 1, g5),
      t("köpa aktiebolag", [1071, 44, 40, 61], 0, 1, g5),
      t("ocr nummer", [990, 106, 60, 40], 0, 1, g5),
      t("glasögon avdrag", [990, 148, 60, 39], 0, 1, g5),
      t("hot och utpressning", [1051, 106, 29, 81], 0, 1, g5),
      t("översättning", [1081, 106, 30, 81], 0, 1, g5),
    ],
  },
  {
    name: "Personal Finance & Employee Benefits",
    traffic: 0,
    volume: "1.1K",
    r: [813, 216, 167, 152],
    tiles: [
      t("bilförmån", [827, 261, 68, 30], 0, 1, g6),
      t("beräkna bilförmån", [827, 293, 68, 29], 0, 1, g6),
      t("förmånsberäkning bil", [897, 261, 34, 61], 0, 1, g6),
      t("räkna ut förmånsvärde bil", [933, 261, 34, 61], 0, 1, g6),
      t("skatt på arbetsinkomst", [827, 324, 68, 31], 0, 1, g6),
      t("beskattningsbar förvärvsinkomst", [897, 324, 70, 31], 0, 1, g6),
    ],
  },
  {
    name: "Sustainability & Environment",
    traffic: 0,
    volume: "640",
    r: [995, 216, 129, 128],
    tiles: [
      t("begränsad miljöpåverkan", [1008, 261, 51, 32], 0, 2, g7),
      t("klimatpåverkan företag", [1008, 295, 51, 32], 0, 1, g7),
      t("hållbar utveckling", [1060, 261, 25, 66], 0, 2, g7),
      t("minska klimatpåverkan", [1086, 261, 25, 66], 0, 1, g7),
    ],
  },
  {
    name: "International & Legal Business",
    traffic: 0,
    volume: "720",
    r: [814, 383, 166, 187],
    tiles: [
      t("utländsk filial", [827, 428, 33, 63], 0, 1, g8),
      t("export sverige", [862, 428, 33, 63], 0, 1, g8),
      t("internationell skatt", [897, 428, 34, 63], 0, 1, g8),
      t("dubbelbeskattning", [933, 428, 34, 63], 0, 1, g8),
      t("bolagsordning", [827, 493, 68, 64], 0, 1, g8),
      t("aktieägaravtal", [897, 493, 70, 64], 0, 1, g8),
    ],
  },
  {
    name: "Legal, Risk & Compliance",
    traffic: 0,
    volume: "510",
    r: [995, 355, 129, 215],
    tiles: [
      t("penningtvättslagen", [1008, 400, 51, 33], 0, 1, g9),
      t("gdpr företag", [1008, 435, 51, 50], 0, 1, g9),
      t("årsredovisningslagen", [1060, 400, 25, 85], 0, 1, g9),
      t("bokföringslagen", [1086, 400, 25, 85], 0, 1, g9),
      t("intern kontroll", [1008, 487, 103, 70], 0, 1, g9),
    ],
  },
];
