import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = `${dirname}/files/fileToWrite.txt`;

const write = async (filePathArg) => {
  const writableStream = createWriteStream(filePathArg);

  writableStream.write('Hello World!\n', 'utf-8');

  writableStream.on('finish', () => {
    console.log('wrote all data to file');
  });

  writableStream.end();
};

await write(filePath);
