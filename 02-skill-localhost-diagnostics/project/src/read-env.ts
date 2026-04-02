/**
 * Minimal demo app: read every KEY=value from ../.env and print them.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseDotEnv(content: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of content.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const envPath = join(__dirname, "..", ".env");
const raw = readFileSync(envPath, "utf8");
const vars = parseDotEnv(raw);

console.log(`Variables from ${envPath}:\n`);
for (const [k, v] of Object.entries(vars).sort(([a], [b]) => a.localeCompare(b))) {
  console.log(`${k}=${v}`);
}
