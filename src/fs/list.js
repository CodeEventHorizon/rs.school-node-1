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
const FOLDER = `${DIRNAME}/files`;

/**
 * Asynchronously pushes files names to an array and logs that array
 *
 * @async
 * @param {string} folderArg   The path of the folder
 * @throws                     Will throw an error if listing fails & if `folderArg` does not exist
 * @returns {Promise<void>}    A Promise that resolves when the directory is successfully listed
 */
const list = async (folderArg) => {
  try {
    const directoryContents = await fs.promises.readdir(folderArg);
    const fileList = [];

    directoryContents.forEach((filename) => fileList.push(filename));

    console.log(fileList);
  } catch (error) {
    throw new Error(FSFAILED);
  }
};

await list(FOLDER);
