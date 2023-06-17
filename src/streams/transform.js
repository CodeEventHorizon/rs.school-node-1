import { Transform } from 'stream';

/**
 * Creates a Transform stream that writes the reversed version of each input.
 *
 * @type {Transform}
 */
const reverse = new Transform({
  transform(chunk, _, callback) {
    const reversedChunk = chunk.toString().split('').reverse().join('');
    this.push(`Reversed word: ${reversedChunk}\nWrite Again:\n`);
    callback();
  },
});

/**
 * Asks the user to input a word and prints the reverse of each input entered.
 *
 * @async
 * @returns {Promise<void>}     A Promise that resolves after data was piped through the stream
 */
const transform = async () => {
  process.stdout.write('Input a word to see its reverse: \n');
  await new Promise((resolve) => {
    process.stdin.pipe(reverse).pipe(process.stdout).on('finish', resolve);
  });
};

await transform();
