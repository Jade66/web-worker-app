import solrSource from './solr-source';

async function fetchSolrData() {
    const data = await solrSource.getPage(0);
    return data;
  }
  
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

async function fetchAndProcess() {
    const data = await fetchSolrData();
    data.docs.forEach((doc, docIndex) => {
        console.log('doc ' + docIndex);
        sleep(500);
    });
    self.postMessage('Done processing with worker');
}


//This is the magic that only works if this file is loaded as a worker.
self.onmessage = (e) => {
    fetchAndProcess();
};
