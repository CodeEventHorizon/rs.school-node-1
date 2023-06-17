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
const FILEPATH = `${DIRNAME}/files/fileToWrite.txt`;

/**
 * Writes 'Hello World!' to a file
 *
 * @async
 * @function write
 * @param {string} filePathArg        The file path
 * @returns {Promise<string>}         A Promise that resolves after data is written to the file. 
 * @throws                            If there was an error writing into the file
 */
const write = async (filePathArg) => {
  await new Promise((resolve, reject) => {
    const writableStream = fs.createWriteStream(filePathArg);

    writableStream.write('Hello World!\n', 'utf-8');

    writableStream.on('finish', () => {
      console.log('Success!');
    });

    writableStream.on('error', (err) => {
      reject(err);
    });

    writableStream.end();
  });
};

await write(FILEPATH);
