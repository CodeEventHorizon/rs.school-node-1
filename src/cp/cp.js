import { spawn } from 'child_process';

/**
 * Creates a child process from file `script.js`,
 * passing the given arguments to it and creating an IPC-channel
 * between parent and child processes.
 * @param {Array} args - Array of command-line arguments to be passed to child process.
 */
const spawnChildProcess = async (args) => {
  // Spawn new child process with script.js as command
  const childProcess = spawn('node', ['./src/cp/files/script.js', ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  // Listen for data event on child process stdout stream, and log the received data to the console
  childProcess.stdout.on('data', (data) => {
    console.log(`Received from child process: ${data.toString()}`);
  });

  // Listen for input event on parent process stdin stream, and write the input to child process stdin stream
  process.stdin.on('data', (input) => {
    childProcess.stdin.write(input);
  });

  // Listen for exit event on child process, and log the exit code to the console
  childProcess.on('exit', (code, signal) => {
    console.log(`Child process exited with code ${code}, signal ${signal}`);
  });
};

// Call 'spawnChildProcess' with some test arguments
spawnChildProcess(['arg1', 'arg2', 'arg3']);
