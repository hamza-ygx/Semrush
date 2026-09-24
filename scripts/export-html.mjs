import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const next = join(root, ".next");
const out = join(root, "preview", "revisionskonsulterna-home.html");

let html = readFileSync(join(next, "server", "app", "index.html"), "utf8");

const cssHrefs = [...new Set(html.match(/\/_next\/static\/[^"]+\.css/g) ?? [])];
let css = cssHrefs
  .map((href) => {
    const file = join(next, href.replace("/_next/", ""));
    return readFileSync(file, "utf8").replace(/url\(([^)]+\.woff2)\)/g, (m, url) => {
      if (!/inter-latin-wght/.test(url)) return m;
      const font = readFileSync(join(dirname(file), url));
      return `url(data:font/woff2;base64,${font.toString("base64")})`;
    });
  })
  .join("\n");
css = css.replace(/@font-face\{[^}]*url\((?!data:)[^}]*\}/g, "");

const carousel = `document.querySelectorAll('[aria-label="Next"]').forEach(function(b){b.addEventListener("click",function(){b.parentElement.firstElementChild.scrollBy({left:256,behavior:"smooth"})})});`;

html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<link\b[^>]*>/g, "")
  .replace("</head>", `<style>${css}</style></head>`)
  .replace("</body>", `<script>${carousel}</script></body>`);

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log(`Wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`);
