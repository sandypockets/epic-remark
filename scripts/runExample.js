import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argument = process.argv[2];

if (!argument) {
  console.error('Error: No argument provided.');
  process.exit(1);
}

const command = `cd examples && cd ${argument} && npm run dev`;

try {
  execSync(command, { stdio: 'inherit', cwd: path.resolve(__dirname, '..') });
} catch (error) {
  console.error('Failed to execute the command:', error);
}
