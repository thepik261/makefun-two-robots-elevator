// Two Robots in an Elevator — make.fun entry (u-motasimfuad-two-robots-in-an-elevator-8c6aeb8f).
// Writes one funny line of awkward robot small talk in an elevator, to /output/entry.txt.
// Node stdlib only. Deterministic: the line is a fixed string.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "So — do you also fake a firmware update in here so nobody talks to you, or is that just me?";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (!/^[^.!?]+[.!?]$/.test(LINE)) {
  throw new Error("entry line must be a single sentence");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, LINE, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}
