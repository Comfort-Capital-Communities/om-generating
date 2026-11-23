// Comfort Capital — HTML -> PDF renderer (Chrome headless, high fidelity)
// Usage:  node render.mjs <input.html> [output.pdf]
//         node render.mjs            (renders the default set)
import { execFile } from 'node:child_process';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname, basename, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..'); // decks/scripts -> project root

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const CHROME = CHROME_CANDIDATES.find(existsSync);
if (!CHROME) { console.error('No Chrome/Edge found.'); process.exit(1); }

function render(input, output) {
  return new Promise((res, rej) => {
    const inAbs = resolve(input);
    if (!existsSync(inAbs)) return rej(new Error('missing input: ' + inAbs));
    const outAbs = resolve(output);
    mkdirSync(dirname(outAbs), { recursive: true });
    const url = pathToFileURL(inAbs).href;
    const args = [
      '--headless=new', '--disable-gpu', '--no-sandbox',
      '--no-pdf-header-footer', '--print-to-pdf-no-header',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=20000', '--force-color-profile=srgb',
      `--print-to-pdf=${outAbs}`, url,
    ];
    console.log(`  rendering ${basename(inAbs)} -> ${basename(outAbs)}`);
    execFile(CHROME, args, { windowsHide: true }, (err) => {
      if (err && !existsSync(outAbs)) return rej(err);
      res(outAbs);
    });
  });
}

const DEFAULTS = [
  ['Design File/styleguide.html', 'output/Comfort Capital - Brand Styleguide.pdf'],
  ['decks/overviews/2026/overview.html', 'output/Comfort Capital Overview Deck (2026).pdf'],
];

const argv = process.argv.slice(2);
const jobs = argv.length
  ? [[argv[0], argv[1] || join('output', basename(argv[0]).replace(/\.html?$/i, '.pdf'))]]
  : DEFAULTS.map(([i, o]) => [join(ROOT, i), join(ROOT, o)]);

console.log(`Using: ${CHROME}`);
for (const [i, o] of jobs) {
  try { await render(i, o); console.log('  done'); }
  catch (e) { console.error('  ERROR ' + e.message); }
}
