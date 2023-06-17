/**
 * Parses the command line args & logs the value for each
 *
 * @name parseArgs
 * @returns {void}
 */
const parseArgs = () => {
  // command line arguments, starting from index 2
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i += 2) {
    // remove `--`
    const propName = args[i].replace('--', '');
    const value = args[i + 1];
    console.log(`${propName} is ${value}`);
  }
};

// Call the parseArgs function
parseArgs();
