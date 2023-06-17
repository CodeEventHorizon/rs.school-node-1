import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Error text
 * @type {string}
 */
const FSFAILED = 'FS operation failed';
/**
 * @type {string}
 */
const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
/**
 * @type {string}
 */
const OLDFILENAME = `${DIRNAME}/files/wrongFilename.txt`;
/**
 * @type {string}
 */
const NEWFILENAME = `${DIRNAME}/files/properFilename.md`;

/**
 * Asynchronously renames a file from `oldFileNameArg` to `newFileNameArg`
 *
 * @async
 * @param {string} oldFileNameArg  The current name of the file
 * @param {string} newFileNameArg  The new name of the file
 * @throws                         Will throw an error if file accessing or renaming fails
 * @returns {Promise<void>}        A Promise that resolves when the file is successfully renamed
 */
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
    throw new Error(FSFAILED);
  }
};

// Call the rename function
await rename(OLDFILENAME, NEWFILENAME);
