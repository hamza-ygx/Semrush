import { chromium } from "playwright";
const base = "http://localhost:3100";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const seeds = ["/", "/seo", "/analytics/overview?q=rkjh.se", "/analytics/keywordoverview?q=redovisningsbyr%C3%A5+halmstad&db=se", "/analytics/comparedomains?compareWith=jbekonomi.com", "/analytics/keywordgap?q=rkjh.se&compareWith=jbekonomi.com", "/analytics/overview/compare-periods?periodType=past_months_6", "/topic-research/6ab52896550d8001abe4c526?new=1"];
const seen = new Set(), queue = [...seeds], lost = [], errors = [], brand = [];
const pathOf = u => u.split("#")[0].split("?")[0];
const p = await b.newPage({ viewport: { width: 1528, height: 800 } });
let cur = "";
p.on("pageerror", e => errors.push(`${cur} PAGEERROR ${e.message.slice(0,160)}`));
p.on("console", m => { if (m.type() === "error") errors.push(`${cur} CONSOLE ${m.text().slice(0,160)}`); });
p.on("response", r => { if (r.status() >= 400 && !r.url().includes("/nope")) errors.push(`${cur} HTTP${r.status()} ${r.url().replace(base,"")}`); });
while (queue.length) {
  const url = queue.shift(); const key = pathOf(url); if (seen.has(key)) continue; seen.add(key); cur = url;
  await p.goto(base + url, { waitUntil: "load", timeout: 30000 }).catch(e => errors.push(`${url} GOTO ${e.message.slice(0,80)}`));
  await p.waitForTimeout(400);
  const info = await p.evaluate(() => ({ text: document.body.innerText, links: [...document.querySelectorAll("a[href]")].map(a => a.getAttribute("href")) })).catch(() => ({ text: "", links: [] }));
  if (info.text.includes("We got lost")) { lost.push(key); continue; }
  if (/semrush/i.test(info.text)) brand.push(key);
  for (const h of info.links) if (h.startsWith("/") && !h.startsWith("//") && !seen.has(pathOf(h))) queue.push(h);
}
console.log("visited", seen.size, "| lost pages:", lost.length, lost.join(" "));
console.log("ERRORS:", errors.length); console.log([...new Set(errors)].slice(0, 30).join("\n"));
console.log("BRAND LEAKS:", brand);
await b.close();
