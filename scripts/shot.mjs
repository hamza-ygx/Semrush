// Screenshot a route of the running dev server.
// usage: node scripts/shot.mjs <route> <out.png> [width=1528] [height=778] [--full] [--scale=1] [--eval="js"] [--click="css selector"]...
import { chromium } from "playwright";
const [route, out, w = "1528", h = "778"] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const flags = process.argv.slice(2).filter((a) => a.startsWith("--"));
const opt = (k) => flags.filter((f) => f.startsWith(`--${k}=`)).map((f) => f.slice(k.length + 3));
const port = process.env.PORT || 3000;
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", ignoreDefaultArgs: ["--hide-scrollbars"] });
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +(opt("scale")[0] || 1) });
await p.goto(`http://localhost:${port}${route}`, { waitUntil: "networkidle", timeout: 120000 });
for (const sel of opt("click")) { await p.click(sel); await p.waitForTimeout(250); }
for (const sel of opt("hover")) { await p.hover(sel); await p.waitForTimeout(250); }
for (const js of opt("eval")) { await p.evaluate(js); await p.waitForTimeout(250); }
const sy = opt("scroll")[0]; if (sy) { await p.evaluate((y) => window.scrollTo(0, +y), sy); await p.waitForTimeout(200); }
await p.waitForTimeout(300);
await p.screenshot({ path: out, fullPage: flags.includes("--full") });
await b.close();
