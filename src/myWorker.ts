import { workerData } from "worker_threads";

(() => {
  console.log(`[Worker A] Running`);

  console.log(`[Worker A] ${workerData.message}`);
})();
