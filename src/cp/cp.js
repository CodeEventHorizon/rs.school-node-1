import { spawn } from 'child_process';

/**
 * Creates a child process from file `script.js`,
 * passing the given arguments to it and creating an IPC-channel
 * between parent and child processes.
 * @param {Array} args - Array of command-line arguments to be passed to child process.
 */
const spawnChildProcess = async (args) => {
  await new Promise((resolve, reject) => {
    // Spawn new child process with script.js
    const childProcess = spawn('node', ['./src/cp/files/script.js', ...args], {
      stdio: ['pipe', 'pipe', 'inherit'],
    });

    // Listen for data event on child process stdout stream
    childProcess.stdout.on('data', (data) => {
      console.log(`Received from child process: ${data.toString()}`);
      resolve();
    });

    // Listen for input event on parent process stdin stream
    process.stdin.on('data', (input) => {
      childProcess.stdin.write(input);
    });

    // Listen for exit event on child process
    childProcess.on('exit', (code, signal) => {
      console.log(`Child process exited with code ${code}, signal ${signal}`);
      if (code !== 0)
        reject(new Error(`Child process stopped with exit code ${code}`));
    });

    // Listen for errors in the child process
    childProcess.on('error', (err) => {
      reject(err);
    });
  });
};

// Call 'spawnChildProcess' with some test arguments
//! Requirement asked to not change it, but as the function is async
//! The function should be called using `await` keyword (P.S. due to requirements I won't change it)
spawnChildProcess(['M', 'U', 'L', 'A', 'H', 'E', 'M']);
