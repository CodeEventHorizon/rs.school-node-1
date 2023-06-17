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
const INPUTPATH = `${DIRNAME}/files/fileToCompress.txt`;
/**
 * @type {string}
 */
const OUTPUTPATH = `${DIRNAME}/files/archive.gz`;

/**
 * Compresses a file to .gz
 * @async
 * @param {string} inputPathArg      File path to compress
 * @param {string} outputPathArg     File path where to save compressed file
 * @returns {Promise<void>}          A Promise that resolves after the file is compressed and rejects if there's an error.
 * @throws                           Throws an error if an error occurs during compression.
 */
const compress = async (inputPathArg, outputPathArg) => {
  await new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(inputPathArg);
    const writeStream = fs.createWriteStream(outputPathArg);
    const gzipStream = zlib.createGzip();

    pipeline(readStream, gzipStream, writeStream, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`${inputPathArg} was compressed to ${outputPathArg}`);
        resolve();
      }
    });
  });
};

await compress(INPUTPATH, OUTPUTPATH);
