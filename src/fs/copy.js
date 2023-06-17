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
const COPYPATH = `${DIRNAME}/files`;
/**
 * @type {string}
 */
const PASTEPATH = `${DIRNAME}/files_copy`;

/**
 * Checks if the file exists.
 *
 * @async
 * @param {string} path The path to the file.
 * @returns {Promise<void>}
 */
const fileExists = async (path) =>
  !!(await fs.promises.stat(path).catch((e) => false));

/**
 * @desc                              Copies a directory and its contents to a new location.
 *
 * @param {string} copyPathArg        copy location
 * @param {string} pastePathArg       paste location
 * @throws                            If the `copyPathArg` folder does not exist or if the `pastePathArg` folder already exists.
 * @returns {Promise<void>}           A Promise that resolves when the file is successfully renamed
 */
const copy = async (copyPathArg, pastePathArg) => {
  try {
    // Check if the `copyPathArg` folder exists
    const copyExists = await fileExists(copyPathArg);
    if (!copyExists) {
      throw new Error(FSFAILED);
    }

    // Check if the `pastePathArg` folder already exists
    const pasteExists = await fileExists(pastePathArg);
    if (pasteExists) {
      throw new Error(FSFAILED);
    }

    // Create the `pastePathArg` folder
    await fs.promises.mkdir(pastePathArg);

    // Recursively copy the contents of the `copyPathArg` folder to the `pastePathArg` folder
    const files = await fs.promises.readdir(copyPathArg);
    for (const file of files) {
      const src = path.join(copyPathArg, file);
      const dest = path.join(pastePathArg, file);
      await fs.promises.copyFile(src, dest);
    }
    // Log
    console.log(`${pastePathArg} created successfully!`);
  } catch (error) {
    throw error;
  }
};

// Call the copy function
await copy(COPYPATH, PASTEPATH);
