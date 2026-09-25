export type Site = { d: string; v: string; ds: string; dv: string; ms: string; mv: string; mom: number; yoy: number; ch: string; fav: { bg: string; fg: string; t: string } };

const f = (bg: string, fg: string, t: string) => ({ bg, fg, t });

export const sites: Site[] = [
  { d: "google.com", v: "105.72B", ds: "31.22%", dv: "33B", ms: "68.78%", mv: "72.72B", mom: -0.12, yoy: 0.71, ch: "Direct", fav: f("#fff", "#4285f4", "G") },
  { d: "youtube.com", v: "54.93B", ds: "34.71%", dv: "19.07B", ms: "65.29%", mv: "35.86B", mom: -3.72, yoy: 7.59, ch: "Direct", fav: f("#ff0000", "#fff", "▶") },
  { d: "facebook.com", v: "10.66B", ds: "55.7%", dv: "5.94B", ms: "44.3%", mv: "4.72B", mom: 3.35, yoy: -6.01, ch: "Direct", fav: f("#1877f2", "#fff", "f") },
  { d: "chatgpt.com", v: "6.58B", ds: "79.9%", dv: "5.26B", ms: "20.1%", mv: "1.32B", mom: 7.5, yoy: 36.42, ch: "Direct", fav: f("#fff", "#6a6c6a", "✺") },
  { d: "instagram.com", v: "6.55B", ds: "48.53%", dv: "3.18B", ms: "51.47%", mv: "3.37B", mom: -2.28, yoy: 4.67, ch: "Direct", fav: f("#e1306c", "#fff", "◎") },
  { d: "reddit.com", v: "5.25B", ds: "39.72%", dv: "2.09B", ms: "60.28%", mv: "3.17B", mom: -3.92, yoy: 13.84, ch: "Search", fav: f("#ff4500", "#fff", "●") },
  { d: "wikipedia.org", v: "4.06B", ds: "27.59%", dv: "1.12B", ms: "72.41%", mv: "2.94B", mom: -7.57, yoy: -15.11, ch: "Search", fav: f("#fff", "#1b1e1a", "W") },
  { d: "x.com", v: "4.06B", ds: "46.06%", dv: "1.87B", ms: "53.94%", mv: "2.19B", mom: -4.48, yoy: 3.9, ch: "Direct", fav: f("#111", "#fff", "𝕏") },
  { d: "pornhub.com", v: "3.65B", ds: "10.41%", dv: "380.42M", ms: "89.59%", mv: "3.27B", mom: -4.78, yoy: -14.42, ch: "Direct", fav: f("#ff9000", "#111", "PH") },
  { d: "whatsapp.com", v: "3.33B", ds: "88.03%", dv: "2.93B", ms: "11.97%", mv: "397.97M", mom: 6.51, yoy: -3.31, ch: "Direct", fav: f("#fff", "#25d366", "✆") },
  { d: "tiktok.com", v: "2.6B", ds: "42.71%", dv: "1.11B", ms: "57.29%", mv: "1.49B", mom: -2.93, yoy: 10.3, ch: "Direct", fav: f("#111", "#fff", "♪") },
  { d: "xvideos.com", v: "2.34B", ds: "11.06%", dv: "259.25M", ms: "88.94%", mv: "2.08B", mom: -2.44, yoy: -13.87, ch: "Direct", fav: f("#fff", "#de2600", "X") },
  { d: "amazon.com", v: "2.33B", ds: "45.09%", dv: "1.05B", ms: "54.91%", mv: "1.28B", mom: -3.68, yoy: -16.45, ch: "Direct", fav: f("#ff9900", "#fff", "a") },
  { d: "yahoo.com", v: "2.22B", ds: "50.39%", dv: "1.12B", ms: "49.61%", mv: "1.1B", mom: -7.91, yoy: -18.23, ch: "Direct", fav: f("#6001d2", "#fff", "!") },
  { d: "duckduckgo.com", v: "2.14B", ds: "11.85%", dv: "253.28M", ms: "88.15%", mv: "1.88B", mom: -0.39, yoy: -9.39, ch: "Direct", fav: f("#de5833", "#fff", "D") },
  { d: "bing.com", v: "1.98B", ds: "63.12%", dv: "1.25B", ms: "36.88%", mv: "730.22M", mom: 1.24, yoy: 5.61, ch: "Direct", fav: f("#fff", "#008373", "b") },
  { d: "baidu.com", v: "1.87B", ds: "58.4%", dv: "1.09B", ms: "41.6%", mv: "777.9M", mom: -1.83, yoy: -4.2, ch: "Direct", fav: f("#2932e1", "#fff", "du") },
  { d: "yandex.ru", v: "1.72B", ds: "47.95%", dv: "824.7M", ms: "52.05%", mv: "895.3M", mom: -0.94, yoy: -2.18, ch: "Direct", fav: f("#fc3f1d", "#fff", "Y") },
  { d: "linkedin.com", v: "1.61B", ds: "71.3%", dv: "1.15B", ms: "28.7%", mv: "462.1M", mom: 2.06, yoy: 8.33, ch: "Direct", fav: f("#0a66c2", "#fff", "in") },
  { d: "netflix.com", v: "1.54B", ds: "61.02%", dv: "939.7M", ms: "38.98%", mv: "600.3M", mom: -1.12, yoy: 1.47, ch: "Direct", fav: f("#111", "#e50914", "N") },
  { d: "live.com", v: "1.49B", ds: "83.6%", dv: "1.25B", ms: "16.4%", mv: "244.4M", mom: 0.58, yoy: -3.05, ch: "Direct", fav: f("#0078d4", "#fff", "O") },
  { d: "weather.com", v: "1.31B", ds: "18.9%", dv: "247.6M", ms: "81.1%", mv: "1.06B", mom: 4.72, yoy: 6.9, ch: "Search", fav: f("#003087", "#fff", "tw") },
  { d: "naver.com", v: "1.28B", ds: "39.44%", dv: "504.8M", ms: "60.56%", mv: "775.2M", mom: -2.61, yoy: -5.72, ch: "Direct", fav: f("#03c75a", "#fff", "N") },
  { d: "temu.com", v: "1.19B", ds: "21.77%", dv: "259.1M", ms: "78.23%", mv: "930.9M", mom: -6.12, yoy: -22.4, ch: "Direct", fav: f("#fb7701", "#fff", "T") },
  { d: "microsoftonline.com", v: "1.16B", ds: "90.14%", dv: "1.05B", ms: "9.86%", mv: "114.4M", mom: 1.73, yoy: 4.88, ch: "Referral", fav: f("#fff", "#737373", "▦") },
  { d: "twitch.tv", v: "1.08B", ds: "68.9%", dv: "744.1M", ms: "31.1%", mv: "335.9M", mom: -3.31, yoy: -1.94, ch: "Direct", fav: f("#9146ff", "#fff", "t") },
  { d: "pinterest.com", v: "1.02B", ds: "36.25%", dv: "369.8M", ms: "63.75%", mv: "650.2M", mom: -1.46, yoy: -7.18, ch: "Search", fav: f("#e60023", "#fff", "P") },
  { d: "office.com", v: "967.4M", ds: "92.31%", dv: "893M", ms: "7.69%", mv: "74.4M", mom: 0.84, yoy: -10.52, ch: "Direct", fav: f("#d83b01", "#fff", "O") },
  { d: "microsoft.com", v: "931.8M", ds: "81.55%", dv: "759.9M", ms: "18.45%", mv: "171.9M", mom: 2.37, yoy: 3.12, ch: "Search", fav: f("#fff", "#737373", "▦") },
  { d: "vk.com", v: "905.2M", ds: "44.18%", dv: "399.9M", ms: "55.82%", mv: "505.3M", mom: -0.52, yoy: -6.47, ch: "Direct", fav: f("#0077ff", "#fff", "vk") },
  { d: "samsung.com", v: "856.6M", ds: "34.9%", dv: "299M", ms: "65.1%", mv: "557.6M", mom: 5.83, yoy: 12.06, ch: "Direct", fav: f("#1428a0", "#fff", "S") },
  { d: "canva.com", v: "812.3M", ds: "76.42%", dv: "620.8M", ms: "23.58%", mv: "191.5M", mom: 3.95, yoy: 9.24, ch: "Direct", fav: f("#00c4cc", "#fff", "C") },
  { d: "ebay.com", v: "789.5M", ds: "46.37%", dv: "366.1M", ms: "53.63%", mv: "423.4M", mom: -2.08, yoy: -8.71, ch: "Direct", fav: f("#fff", "#e53238", "e") },
  { d: "spotify.com", v: "764.1M", ds: "58.66%", dv: "448.2M", ms: "41.34%", mv: "315.9M", mom: 1.19, yoy: 2.35, ch: "Direct", fav: f("#1db954", "#fff", "≋") },
  { d: "github.com", v: "731.9M", ds: "88.52%", dv: "647.9M", ms: "11.48%", mv: "84M", mom: 0.66, yoy: 7.93, ch: "Direct", fav: f("#111", "#fff", "gh") },
  { d: "roblox.com", v: "702.6M", ds: "52.08%", dv: "365.9M", ms: "47.92%", mv: "336.7M", mom: 8.14, yoy: 15.27, ch: "Direct", fav: f("#111", "#fff", "R") },
  { d: "zoom.us", v: "674.3M", ds: "84.03%", dv: "566.6M", ms: "15.97%", mv: "107.7M", mom: -1.57, yoy: -9.02, ch: "Direct", fav: f("#0b5cff", "#fff", "z") },
  { d: "bilibili.com", v: "651.8M", ds: "63.8%", dv: "415.8M", ms: "36.2%", mv: "235.9M", mom: -0.73, yoy: 1.85, ch: "Direct", fav: f("#00a1d6", "#fff", "b") },
  { d: "globo.com", v: "628.4M", ds: "29.46%", dv: "185.1M", ms: "70.54%", mv: "443.3M", mom: -4.05, yoy: -3.66, ch: "Direct", fav: f("#fb3a2f", "#fff", "g") },
  { d: "quora.com", v: "603.7M", ds: "33.21%", dv: "200.5M", ms: "66.79%", mv: "403.2M", mom: -5.47, yoy: -19.3, ch: "Search", fav: f("#b92b27", "#fff", "Q") },
];

export const industries = ["All Industries", "Arts & Entertainment", "Business & Consumer Services", "Computers Electronics & Technology", "E-commerce & Shopping", "Finance", "Games", "Health", "News & Media", "Travel & Tourism"];
export const regions = ["World", "United States", "United Kingdom", "Germany", "France", "Spain", "Sweden", "India", "Brazil", "Japan"];
