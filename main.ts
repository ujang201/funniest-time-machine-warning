// funniest-time-machine-warning — writes one warning label to entry.txt.
//
// The label is a single fixed string assembled from three parts so the
// joke's structure stays visible: a formal header, the hazard, and the
// punchline that lands on the last words. Nothing is random; every run
// produces the exact same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HEADER = "WARNING:";
const HAZARD =
  "Never meet your past self. If you do, do not shake hands — one of you will vanish,";
const PUNCHLINE = "and HR cannot say which.";

const label = [HEADER, HAZARD, PUNCHLINE].join(" ");

// The gate only accepts 1–120 characters, so refuse to write anything
// that would be rejected outright instead of silently shipping it.
if (label.length < 1 || label.length > 120) {
  throw new Error(`label is ${label.length} characters, must be 1–120`);
}

function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), label + "\n", "utf8");
}

main();
