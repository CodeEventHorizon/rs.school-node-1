import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = `${dirname}/files/fileToDecompress.gz`;
const outputPath = `${dirname}/files/fileToCompress.txt`;

const decompress = async (inputPathArg, outputPathArg) => {
  const readStream = fs.createReadStream(inputPathArg);
  const writeStream = fs.createWriteStream(outputPathArg);
  const gunzipStream = zlib.createGunzip();

  await pipeline(readStream, gunzipStream, () => writeStream);

  console.log(`${inputPathArg} was decompressed to ${outputPathArg}`);
};

await decompress(inputPath, outputPath);
