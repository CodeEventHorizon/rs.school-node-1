import { createHash } from 'node:crypto';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = `${dirname}/files/fileToCalculateHashFor.txt`;

const calculateHash = async (filePathArg) => {
  const fileContent = await readFile(filePath);
  const hash = createHash('sha256');
  hash.update(fileContent);
  console.log(hash.digest('hex'));
};

await calculateHash(filePath);
