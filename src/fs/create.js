import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * In real world scenarios I think it's a great idea to separate
 * constants like strings to a different directory where they would be exported.
 * It gives a great look of the whole application
 */
const fileContent = 'I am fresh and young';
const errorText = 'FS operation failed';
const ENOENT = 'ENOENT';
const encoding = 'utf8';

/*
 * Using path & url libraries is sort of an overkill, but
 * in most cases this is how it will be used in actual projects
 * I could just write create('./src/fs/files/fresh.txt')
 */
const dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = `${dirname}/files/fresh.txt`;

const create = async (filePath) => {
  try {
    await fs.promises.access(filePath);
    throw new Error(errorText);
  } catch (error) {
    if (error.code === ENOENT) {
      await fs.promises.writeFile(filePath, fileContent, {
        encoding,
      });
      console.log(`File ${filePath} created successfully`);
    } else {
      throw error;
    }
  }
};

await create(filePath);
