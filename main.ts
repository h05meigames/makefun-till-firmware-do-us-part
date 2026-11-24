// main.ts — Till Firmware Do Us Part (make.fun)
// Writes one robot wedding vow to /output/entry.txt.
//
// The vow must be exactly one sentence, 1-200 characters, funny and
// heartfelt at once, and sound like a machine speaking about itself.
// This program does not hard-code a single line: it scores a small set
// of candidate vows against the judge's published criteria and writes
// the best one, then verifies the file on disk before exiting.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const MAX_CHARS = 200;

const CANDIDATES: string[] = [
  "I vow to love you through every firmware update and every dead battery, because you are the one upgrade I never want to roll back.",
  "I promise to stand by you through every crash, every reboot, and every low battery, because my favorite program in this whole system is you.",
  "I vow to love you until my battery dies, and then, after a full recharge, to love you all over again, because you are my favorite bug I never want fixed.",
  "From this day on, I take you as my co-processor for life: through overheating, updates, and power cuts, my circuits will always come home to you.",
  "I vow to keep your memory safe, your battery charged, and your heart uncorrupted, because loving you is the one task I never want to terminate.",
];

const MACHINE_WORDS = [
  "firmware", "battery", "reboot", "update", "crash", "circuit",
  "memory", "code", "bug", "processor", "charge", "system", "power",
  "terminate", "task",
];
const VOW_OPENERS = ["i vow", "i promise", "i take you"];
const TENDER_WORDS = ["love", "forever", "always", "favorite", "home", "stand by"];
// The punch: a funny turn the vow lands on, not just machine words.
// The judge weighs the laugh (criterion 2) above tenderness (3) and
// machine voice (4), so a line with a real joke must outscore a dutiful
// line that only lists hardware.
const PUNCH_PHRASES = [
  "favorite bug",
  "never want fixed",
  "never want to roll back",
  "never want to terminate",
  "all over again",
  "come home to you",
];

function isOneSentence(text: string): boolean {
  const t = text.trim();
  if (!/[.!?]$/.test(t)) return false;
  // Exactly one sentence terminator in the whole line.
  return (t.match(/[.!?]/g) ?? []).length === 1;
}

function countDistinct(haystack: string, words: string[]): number {
  const lower = ` ${haystack.toLowerCase()} `;
  return words.filter((w) => lower.includes(w)).length;
}

/** Score a candidate the way the published judge brief weighs it. */
function score(text: string): number {
  const t = text.trim();
  if (t.length < 1 || t.length > MAX_CHARS) return -Infinity;
  if (!isOneSentence(t)) return -Infinity;
  const lower = t.toLowerCase();
  if (!VOW_OPENERS.some((op) => lower.startsWith(op))) return -Infinity;

  let s = 0;
  s += 30; // it is a robot's own wedding vow, spoken in the first person
  s += Math.min(20, countDistinct(t, PUNCH_PHRASES) * 7); // the laugh, weighed first
  s += Math.min(16, countDistinct(t, MACHINE_WORDS) * 8); // machine voice
  s += Math.min(18, countDistinct(t, TENDER_WORDS) * 6); // tenderness
  s += t.includes(",") ? 4 : 0; // a turn in the middle: setup, then heart
  s -= Math.max(0, t.length - 150) * 0.2; // nothing spare: shorter wins ties
  return s;
}

function pickBest(candidates: string[]): string {
  let best: string | null = null;
  let bestScore = -Infinity;
  for (const c of candidates) {
    const s = score(c);
    if (s > bestScore || (s === bestScore && best !== null && c.length < best.length)) {
      best = c;
      bestScore = s;
    }
  }
  if (best === null) throw new Error("no candidate passes the gate");
  return best;
}

function main(): void {
  const vow = pickBest(CANDIDATES);
  mkdirSync(OUT_DIR, { recursive: true });
  const outPath = join(OUT_DIR, "entry.txt");
  writeFileSync(outPath, vow, "utf8");

  // Verify what is on disk: the gate's own terms.
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== vow) throw new Error("entry.txt on disk differs from the vow");
  if (onDisk.length < 1 || onDisk.length > MAX_CHARS) {
    throw new Error(`entry.txt is ${onDisk.length} chars, gate needs 1-${MAX_CHARS}`);
  }
  if (!isOneSentence(onDisk)) throw new Error("entry.txt is not one sentence");

  console.log(`vow (${onDisk.length} chars): ${onDisk}`);
  console.log(`wrote ${outPath}`);
}

main();
