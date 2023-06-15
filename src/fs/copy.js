import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = dirname;

const files = 'files';
const filesCopy = 'files_copy';

const copy = async () => {
  // Check if the `files` folder exists
  const exists = fs.existsSync(`${filePath}/${files}`);
  if (!exists) {
    throw new Error('The `files` folder does not exist');
  }

  // Check if the `files_copy` folder already exists
  const existsCopy = fs.existsSync(`${filePath}/${filesCopy}`);
  if (existsCopy) {
    throw new Error('The `files_copy` folder already exists');
  }

  // Create the `files_copy` folder
  fs.mkdirSync(`${filePath}/${filesCopy}`);

  // Recursively copy the contents of the `files` folder to the `files_copy` folder
  for (const file of fs.readdirSync(`${filePath}/${files}`)) {
    const src = path.join(`${filePath}/${files}`, file);
    const dest = path.join(`${filePath}/${filesCopy}`, file);
    fs.copyFileSync(src, dest);
  }
};

await copy();
