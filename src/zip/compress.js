import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = `${dirname}/files/fileToCompress.txt`;
const outputPath = `${dirname}/files/fileToDecompress.gz`;

const compress = async (inputPathArg, outputPathArg) => {
  const readStream = fs.createReadStream(inputPathArg);
  const writeStream = fs.createWriteStream(outputPathArg);
  const gzipStream = zlib.createGzip();

  await pipeline(readStream, gzipStream, () => writeStream);

  console.log(`${inputPathArg} was compressed to ${outputPathArg}`);
};

await compress(inputPath, outputPath);
