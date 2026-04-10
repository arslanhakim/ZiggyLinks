// One-shot image optimizer.
// Walks public/images, converts every PNG/JPG to a resized WebP next to it,
// then deletes the original. Run with: node scripts/optimize-images.mjs

import { readdir, stat, unlink } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

// Reasonable ceiling for hero/lookbook photos. Most product cards display
// well under 800px wide on retina; 1600px gives 2x headroom for the largest hero.
const MAX_WIDTH = 1600;
const QUALITY = 78;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const fmt = (n) => (n / 1024).toFixed(0).padStart(5) + ' KB';

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

  const before = (await stat(file)).size;
  const out = file.slice(0, -ext.length) + '.webp';

  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);

  const after = (await stat(out)).size;
  totalBefore += before;
  totalAfter += after;
  count++;

  console.log(`${basename(file).padEnd(28)} ${fmt(before)} → ${fmt(after)}  (-${Math.round((1 - after / before) * 100)}%)`);

  // Remove original only after successful WebP write
  await unlink(file);
}

console.log('─'.repeat(60));
console.log(`${count} files: ${fmt(totalBefore)} → ${fmt(totalAfter)}  (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
