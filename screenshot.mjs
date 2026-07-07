import puppeteer from "puppeteer-core";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "";
const fullPage = process.argv[4] !== "viewport";
const width = Number(process.argv[5]) || 1440;
const height = Number(process.argv[6]) || 900;

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];
const executablePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error("No Chrome/Edge executable found.");
  process.exit(1);
}

const outDir = path.join(__dirname, "temporary_screenshots");
fs.mkdirSync(outDir, { recursive: true });

let n = 1;
while (fs.existsSync(path.join(outDir, `screenshot-${n}${label ? "-" + label : ""}.png`))) n++;
const outFile = path.join(outDir, `screenshot-${n}${label ? "-" + label : ""}.png`);

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
await page.setViewport({ width, height });
await page.goto(url, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
await new Promise((r) => setTimeout(r, 400));

// Scroll through the page in steps so scroll-triggered (IntersectionObserver)
// animations fire before the full-page screenshot is captured.
const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
const step = Math.max(height, 400);
for (let y = 0; y <= scrollHeight; y += step) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 250));
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 400));

await page.screenshot({ path: outFile, fullPage });
await browser.close();

console.log(`Saved: ${outFile}`);
