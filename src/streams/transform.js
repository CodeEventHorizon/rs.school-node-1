import { Transform } from 'stream';

const reverse = new Transform({
  transform(chunk, _, callback) {
    const reversedChunk = chunk.toString().split('').reverse().join('');
    this.push(`Reversed word: ${reversedChunk}\nWrite Again:\n`);
    callback();
  },
});

const transform = async () => {
  process.stdout.write('Input a word to see its reverse: \n');
  return new Promise((resolve) => {
    process.stdin.pipe(reverse).pipe(process.stdout).on('finish', resolve);
  });
};

await transform();
