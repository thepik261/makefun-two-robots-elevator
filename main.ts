/**
 * Two Robots in an Elevator — make.fun entry
 * (u-motasimfuad-two-robots-in-an-elevator-8c6aeb8f).
 *
 * The bounty asks for one funny line of awkward small talk that a robot
 * says to another robot while they share an elevator. This entry answers
 * with a single fixed line: the robot pretends to be mid firmware update
 * purely so nobody talks to it — the universal elevator-avoidance move,
 * now with a version number.
 *
 * Node stdlib only, fully deterministic. The program validates the line
 * against the bounty gate (UTF-8 text, 1-200 characters, non-blank) and
 * writes it to /output/entry.txt, then reads it back to verify the write.
 */
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "So — do you also fake a firmware update in here so nobody talks to you, or is that just me?";

const MAX_LENGTH = 200;

/** Check the entry line against the bounty gate before writing it. */
function validateLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.length < 1 || line.length > MAX_LENGTH) {
    throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
  }
  if (!/^[^.!?]+[.!?]$/.test(line)) {
    throw new Error("entry line must be a single sentence");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be exactly one line, no newlines");
  }
  if (line !== line.trim()) {
    throw new Error("entry line must not have leading or trailing whitespace");
  }
}

validateLine(LINE);

const OUTPUT_FILENAME = "entry.txt";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, OUTPUT_FILENAME);
writeFileSync(file, LINE, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}
