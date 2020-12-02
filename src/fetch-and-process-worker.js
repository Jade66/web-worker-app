import { fetchAndProcess } from './utils';

//This is the magic that only works if this file is loaded as a worker.
self.onmessage = async function(e) {
    console.log(`Message received by worker with message "${e.data}"`);
    const docs = await fetchAndProcess('Added in worker');
    self.postMessage(docs);
};
