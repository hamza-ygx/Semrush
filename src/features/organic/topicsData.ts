export type Tile = { name: string; r: [number, number, number, number]; traffic: number; keywords: number; color?: string };
export type TopicGroup = { name: string; traffic: number; volume: string; r: [number, number, number, number]; tiles: Tile[] };

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
      t("redovisningsbyrå halmstad", [13, 45, 459, 436], 50, 8),
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
      t("fastighetsskatt", [759, 46, 66, 91], 0, 3, "#d4d7fe"),
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
