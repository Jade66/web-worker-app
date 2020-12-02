import { fetchAndProcess } from './utils';

//This is the magic that only works if this file is loaded as a worker.
self.onmessage = (e) => {
    const docs = fetchAndProcess('Added in worker');
    self.postMessage(docs);
};
