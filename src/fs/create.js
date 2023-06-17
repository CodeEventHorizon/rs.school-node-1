import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * File contents
 * @type {string}
 */
const FILECONTENT = 'I am fresh and young';
/**
 * Error text
 * @type {string}
 */
const FSFAILED = 'FS operation failed';
/**
 * Directory name
 * @type {string}
 */
const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
/**
 * File path
 * @type {string}
 */
const FILEPATH = `${DIRNAME}/files/fresh.txt`;

/**
 * @desc                       - Creates a new file at the given `filePath` with the given `fileContent`.
 *                               If the file already exists, throws an `FSFAILED` error with the message `"FS operation failed"`.
 * @param {string} filePath    - The path of the file that will be created
 * @param {string} fileContent - text of the file
 * @throws                     - Will throw an error if the file operation fails
 *                               and if file already exists
 * @returns {Promise<void>}    - A Promise that resolves when the file is successfully renamed
 */
const create = async (filePath, fileContent) => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    throw new Error(FSFAILED);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.promises.writeFile(filePath, fileContent, {
        encoding: 'utf8',
      });
      console.log(`File ${filePath} created successfully`);
    } else {
      throw error;
    }
  }
};

// Call the create function
await create(FILEPATH, FILECONTENT);
