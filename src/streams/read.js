import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * @type {string}
 */
const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
/**
 * @type {string}
 */
const FILEPATH = `${DIRNAME}/files/fileToRead.txt`;

/**
 * Reads the file asynchronously and logs the standard output.
 *
 * @async
 * @param {string} filePathArg      The file path
 * @throws                          If an error occurs during reading the file.
 * @returns {Promise<void>}         A Promise that resolves after the file was read
 */
const read = async (filePathArg) => {
  await new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePathArg);
    readStream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
    readStream.on('end', () => {
      process.stdout.write('\n');
      resolve();
    });
    readStream.on('error', (err) => {
      reject(err);
    });
  });
};

await read(FILEPATH);
