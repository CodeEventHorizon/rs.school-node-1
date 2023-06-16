// Node modules
import { parentPort, workerData } from 'worker_threads';

/**
 * @desc             - Calculates the nth Fibonacci number.
 *                     n should be received from main thread.
 *
 * @param {number} n - The index of the Fibonacci sequence. Must be a positive integer.
 * @returns {number} - The value of the nth Fibonacci number.
 */
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

/**
 * @desc             - Sends the result of the nth Fibonacci calculation
 *                     to the main thread using worker threads.
 *                     If there is an error during the computation,
 *                     it will send back an error message instead of a result.
 *
 * @returns {void}
 */
const sendResult = () => {
  try {
    // n received from main thread using workerData
    const n = workerData;
    // console.log('sendResult ~ n:', n);

    const result = nthFibonacci(n);
    // console.log('sendResult ~ result:', result);

    // Sends the result as a message to the main thread.
    parentPort.postMessage({ status: 'resolved', data: result });
  } catch (error) {
    // If there's an error, send back to the main thread
    parentPort.postMessage({ status: 'error', data: null });
  }
};

sendResult();
