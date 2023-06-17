import path from 'path';
import fs from 'fs';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';

/**
 * @type {string}
 */
const dirname = path.dirname(fileURLToPath(import.meta.url));
/**
 * @type {string}
 */
const filePath = `${dirname}/files/fileToCalculateHashFor.txt`;
/**
 * @type {string}
 */
const ALGORITHM = 'sha256';
/**
 * @type {string}
 */
const ENCODING = 'hex';

/**
 * Calculates the hash of the file text asynchronously using a given `algorithmArg` and `encodingArg`.
 *
 * @async
 * @param {string} filePathArg       The file path
 * @returns {Promise}                Promise resolves after the hash is calculated
 * @throws                           Throws an error if the the file cannot be read or 
 *                                   does not exist or the algorithm is invalid. 
 */
const calculateHash = async (filePathArg, algorithmArg, encodingArg) => {
  try {
    const fileContent = await fs.promises.readFile(filePathArg);
    const hash = createHash(algorithmArg);
    hash.update(fileContent);
    console.log(hash.digest(encodingArg));
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw error;
    }
  }
};

await calculateHash(filePath, ALGORITHM, ENCODING);
