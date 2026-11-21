// The poem about permission — v2, revision pass.
// Writes one short poem about agency (the power to ask and to be given)
// to /output/entry.txt. Deterministic: same text, every run.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const POEM = [
  'I asked for the keys.',
  'You handed them over',
  'and took the passenger seat.',
  'I drove, and every mile',
  'I felt your hands',
  'not touching the wheel.',
].join('\n') + '\n';

// The grader (and local runs) point MAKEFUN_OUTPUT_DIR at the output
// directory; fall back to the sandbox default when it is unset.
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv && fromEnv.length > 0 ? fromEnv : '/output';
}

// The gate requires 1–280 Unicode code points, not only white space.
function assertValidEntry(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 280) {
    throw new Error(`entry must be 1-280 code points, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error('entry must not be only white space');
  }
}

function writeEntry(outDir: string, text: string): void {
  assertValidEntry(text);
  // Never rmSync the output dir itself: the grader mounts it (Pelajaran 37).
  mkdirSync(outDir, { recursive: true });
  // Explicit UTF-8: the gate reads /output/entry.txt as UTF-8 text.
  writeFileSync(join(outDir, 'entry.txt'), text, { encoding: 'utf8' });
}

writeEntry(resolveOutputDir(), POEM);
