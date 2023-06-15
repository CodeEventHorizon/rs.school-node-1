import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filesDirectory = `${dirname}/files`;

const list = async (files) => {
  try {
    const directoryContents = await fs.promises.readdir(files);
    directoryContents.forEach((filename) => console.log(filename));
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await list(filesDirectory);
