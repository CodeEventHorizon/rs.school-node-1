import { Worker } from 'worker_threads';
import os from 'os';

/**
 * @desc             - Function that creates a number of worker threads,
 *                     sends an incremental number to each worker,
 *                     and waits for all promises to resolve.
 * @async
 */
const performCalculations = async () => {
  // create number of worker threads (equal to the number of host machine logical CPU cores)
  const numCores = os.cpus().length;
  const promises = [];
  for (let i = 0; i < numCores; i++) {
    const workerPromise = new Promise((resolve, reject) => {
      /**
       * Send incremental number starting from 10 to each worker
       *
       * For example: on host machine with 4 cores you should create 4 workers
       * and send 10 to first worker, 11 to second worker, 12 to third worker,
       * 13 to fourth worker.
       */

      // Create a new worker thread with 10 + i as workerData argument
      const worker = new Worker('./src/wt/worker.js', { workerData: 10 + i });

      // Listen for messages from the worker thread
      worker.on('message', (result) => {
        // If message is received successfully, resolve the promise with the result
        resolve(result);
      });

      // Listen for errors from the worker thread
      worker.on('error', (error) => {
        // If there is an error in the worker thread, reject the promise with the error
        reject(error);
      });

      // Listen for exit event from the worker thread
      worker.on('exit', (code) => {
        // If the worker thread exits with a non-zero code, reject the promise with an error
        if (code !== 0) {
          reject(new Error(`Worker ${i + 1} stopped with exit code ${code}`));
        }
      });
    });
    // Push the worker promise to the promises array
    promises.push(workerPromise);
  }

  try {
    /*
     * After all workers will finish, function should log array of results into console.
     */

    // Wait for all promises to resolve and store the results in an array
    const results = await Promise.all(promises);
    /**
     * The results are array of objects with 2 props:
     * @returns {Object}
     * @prop {string}  status     - 'resolved' in case of successfully received value from worker
     *                            - 'error' in case of error in worker
     * @prop {number}  data       - value from worker in case of success
     *                            - null in case of error in worker
     */
    console.log(results);
  } catch (error) {
    // If there is an error while waiting for promises to resolve, throw an error
    throw new Error(`Thread error: ${error}`);
  }
};

// Call the performCalculations function
await performCalculations();
