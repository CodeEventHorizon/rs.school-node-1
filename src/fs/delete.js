import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const deleteFile = `${dirname}/files/fileToRemove.txt`;

const remove = async (deleteFilename) => {
  try {
    await fs.promises.unlink(deleteFilename);
    console.log(`File ${deleteFilename} has been deleted`);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await remove(deleteFile);
