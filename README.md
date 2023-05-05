# NodeJS Multithreading 04

Worker Data

### Environment :
```
NodeJS minimal version: v12.x.x LTS (Erbium)
NodeJS recommended version: Latest LTS version
Dev Language: TypeScript (ES6)
Run Language: JavaScript
```
See [Latest NodeJS LTS version](https://nodejs.org/)

### How to run

#### First

Install packages

```
npm run i
```

#### Then

To run in Development
```
npm run start:dev
```

To run in Production
```
npm run start
```

## Explanations

workerData allow you to transmit a payload at the start of your worker.

### Main Thread Side

```ts
import { Worker } from 'worker_threads';

(() => {
  console.log(`[Main] Run in ${process.env.NODE_ENV} env`);

  // Instanciate worker
  const myWorker: Worker = new Worker(
    process.env.NODE_ENV === 'production' ? './myWorker.js' : './src/proxy.js',
    {
      workerData: { message: 'This message is sended though workerData'},
    }
  );

  // On worker online
  myWorker.on('online', () => {
    console.log(`[Main] Worker is online and executing code!`);
  });

  // On worker exit
  myWorker.on('exit', code => {
    console.log(`[Main] Worker execution is over with code: ${code}`);
  });

  // On worker error
  myWorker.on('error', error => {
    // Sometime stack is undefined, we can stringify error instead
    console.log(
      `[Main] Worker catch an error: ${error.stack || JSON.stringify(error)}`,
    );
  });
})();
```

On worker side, you must import workerData from library worker_threads.

workerData contain the keys/values you added on main thread.

### Worker Thread Side

```ts
import { workerData } from "worker_threads";

(() => {
  console.log(`[Worker A] Running`);

  console.log(`[Worker A] ${workerData.message}`);
})();
```

## Next Chapter

Multithreading 05 - Resource Limits
https://github.com/thomaspiquet/nodejs-multithreading-05