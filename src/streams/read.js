import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = `${dirname}/files/fileToRead.txt`;

const read = async (filePathArg) => {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePathArg);
    readStream.pipe(process.stdout);
    readStream.on('end', () => {
      // New line
      process.stdout.write('\n');
      resolve();
    });
    readStream.on('error', (err) => {
      reject(err);
    });
  });
};

await read(filePath);
