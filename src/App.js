 import React from "react";
 import {randomColor, displayDocs, clearOutput, fetchSolrData, showMessage, fetchAndProcess} from './utils';

async function fetch() {
  clearOutput();
  showMessage('Quick AJAX call');
  const data = await fetchSolrData();
  displayDocs(data.docs);
}

async function fetchAndProcessMain() {
  clearOutput();
  showMessage('Working in the main thread. Grab a sandwich...');
  const docs = await fetchAndProcess('Added in main thread');
  displayDocs(docs);
}

async function fetchAndProcessWithWorker() {
  clearOutput();
  showMessage('Working in a separate thread.  App still available...');
  const worker = new Worker('fetch-and-process-worker.js');
  worker.onmessage = (e) => {
    displayDocs(e.data);
    worker.terminate();
  };
  worker.postMessage('Spiffy Message');
}

export default () => (
  <>
    <h2>Web Worker Demo</h2>
    <div id='message-div' style={{width:'500px',height:'50px' }}></div>
    <div>
      <button onClick={randomColor}>Click me!</button>&nbsp;<input type='text' placeholder='Type something if you can'></input>
    </div>
    <br/><br/>
    <br/>
    <div id='buttonContainer' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '500px'}}>
      <button id='fetchButton' onClick={fetch} >Fetch</button>
      <button id='fetchButton' onClick={fetchAndProcessMain} >Fetch and process</button>
      <button id='fetchButton' onClick={fetchAndProcessWithWorker} >Fetch and process with worker</button>
    </div>
    <br/>
    <table id='docs-table' border='1' cellSpacing='0'>
      <thead>
        <tr>
          <th style={{ width:'100px' }}>ID</th>
          <th style={{ width:'150px' }}>Master License</th>
          <th style={{ width:'100px' }}>License</th>
          <th style={{ width:'200px' }}>Enhanced Value</th>
        </tr>
      </thead>
      <tbody id='docs-body'></tbody>
    </table>
  </>
);
