import { Worker } from 'worker_threads';
import os from 'os';

/**
 * Function that creates a number of worker threads,
 * sends an incremental number to each worker,
 * and waits for all promises to resolve.
 *
 * @async
 * @throws {Error}             throws an error if there is any issue with the thread.
 * @returns {Promise<void>}    A Promise will resolve when all the workers complete their tasks.
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

      worker.on('message', (result) => {
        resolve(result);
      });

      worker.on('error', (error) => {
        reject(error);
      });

      worker.on('exit', (code) => {
        // If the worker thread exits with a non-zero code...
        if (code !== 0) {
          reject(new Error(`Worker ${i + 1} stopped with exit code ${code}`));
        }
      });
    });
    promises.push(workerPromise);
  }

  try {
    // After all workers will finish, function should log array of results into console.
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
    throw new Error(`Thread Error: ${error}`);
  }
};

// Call the performCalculations function
await performCalculations();
