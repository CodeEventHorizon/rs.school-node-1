import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filesDirectory = `${dirname}/files/fileToRead.txt`;

const read = async (readFile) => {
  try {
    const fileContents = await fs.promises.readFile(readFile, 'utf-8');
    console.log(fileContents);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await read(filesDirectory);
