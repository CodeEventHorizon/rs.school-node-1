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
const DELETEFILE = `${DIRNAME}/files/fileToRemove.txt`;

/**
 * Asynchronously deletes a file `deleteFilename`
 *
 * @async
 * @function remove
 * @param {string} deleteFilename   file path that will be deleted
 * @throws                          Will throw an error if file deletion fails & if file does not exist
 * @returns {Promise<void>}         A Promise that resolves when the file is successfully deleted
 */
const remove = async (deleteFilename) => {
  try {
    await fs.promises.unlink(deleteFilename);
    console.log(`File ${deleteFilename} has been deleted`);
  } catch (error) {
    throw new Error(FSFAILED);
  }
};

// Call the remove function
await remove(DELETEFILE);
