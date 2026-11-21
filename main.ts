// The poem about permission — v1, fresh-authored in-session.
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

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Never rmSync the output dir itself: the grader mounts it (Pelajaran 37).
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), POEM, 'utf8');
