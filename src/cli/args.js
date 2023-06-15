const parseArgs = () => {
  // get the command line arguments, starting from index 2
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i += 2) {
    // extract the property name from the argument
    const propName = args[i].replace('--', '');
    // get the value for the property
    const value = args[i + 1];
    console.log(`${propName} is ${value}`);
  }
};

parseArgs();
