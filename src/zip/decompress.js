import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';

/**
 * @type {string}
 */
const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
/**
 * @type {string}
 */
const INPUTPATH = `${DIRNAME}/files/archive.gz`;
/**
 * @type {string}
 */
const OUTPUTPATH = `${DIRNAME}/files/fileToCompress.txt`;

/**
 * Decompresses a file
 *
 * @async
 * @function
 * @param {string} inputPathArg     File path to decompress
 * @param {string} outputPathArg    File path where to save decompressed file
 * @returns {Promise<void>}         A Promise that resolves after the file is decompressed and rejects if there's an error.
 * @throws                          Throws an error if an error occurs during decompression.
 */
const decompress = async (inputPathArg, outputPathArg) => {
  await new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(inputPathArg);
    const writeStream = fs.createWriteStream(outputPathArg);
    const gunzipStream = zlib.createGunzip();

    pipeline(readStream, gunzipStream, writeStream, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`${inputPathArg} was decompressed to ${outputPathArg}`);
        resolve();
      }
    });
  });
};

await decompress(INPUTPATH, OUTPUTPATH);
