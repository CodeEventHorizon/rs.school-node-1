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
const FILEPATH = `${DIRNAME}/files/fileToRead.txt`;

/**
 * Asynchronously read file and log the content
 *
 * @async
 * @param {string} readFile        The path of the file
 * @throws                         Will throw an error if reading the file fails & if file does not exist
 * @returns {Promise<void>}        A Promise that resolves when the file is successfully read and logged to the console
 */
const read = async (readFile) => {
  try {
    const fileContents = await fs.promises.readFile(readFile, 'utf-8');
    console.log(fileContents);
  } catch (error) {
    throw new Error(FSFAILED);
  }
};

// Call the read function
await read(FILEPATH);
