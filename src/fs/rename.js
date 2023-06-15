import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const oldFileName = `${dirname}/files/wrongFilename.txt`;
const newFileName = `${dirname}/files/properFilename.md`;

const rename = async (oldFileNameArg, newFileNameArg) => {
  try {
    await Promise.all([
      fs.promises.access(oldFileNameArg, fs.constants.F_OK),
      fs.promises.access(newFileNameArg, fs.constants.F_OK).catch((err) => {
        if (err.code !== 'ENOENT') {
          throw err;
        }
      }),
    ]);
    await fs.promises.rename(oldFileNameArg, newFileNameArg);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await rename(oldFileName, newFileName);
