import React from "react";
import pi from './pi';
import solrSource from './solr-source';

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
      currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function calculate() {
  document.getElementById('display-div').textContent = 'Working in the main thread. Grab a sandwich...';
  setTimeout(() => {
    document.getElementById('display-div').textContent = '3.' + pi(30000).slice(1);
  },0);
  
}

// import * as Comlink from 'comlink';
// async function calculateWithWorker() {
//   document.getElementById('display-div').textContent = 'Working in a separate thread.  App still available...';
//   const comlinkPi = Comlink.wrap(new Worker('comlink-pi-worker.js'));
//   const answer = await comlinkPi(30000);
//   document.getElementById('display-div').textContent = '3.' + answer.slice(1);
// }

function calculateWithWorker() {
  document.getElementById('display-div').textContent = 'Working in a separate thread.  App still available...';
  const worker = new Worker('pi-worker.js');
  worker.postMessage(30000);
  worker.onmessage = (e) => {
    document.getElementById('display-div').textContent = '3.' + e.data.slice(1);
  };
}

function randomColor(e) {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const colorString = `rgb(${red},${green},${blue})`;
  e.target.style.backgroundColor = colorString;
}

async function fetchSolrData() {
  const data = await solrSource.getPage(0);
  return data;
}

async function fetch() {
  const data = await fetchSolrData();
  document.getElementById('display-div').textContent = JSON.stringify(data);
}

async function fetchAndProcess() {
  const data = await fetchSolrData();
  data.docs.forEach((doc, docIndex) => {
    //Do some work that takes a while for each row
    sleep(500);
  });
  document.getElementById('display-div').textContent = localStorage.getItem('Done processing in main thread');
}

async function fetchAndProcessWithWorker() {
  const worker = new Worker('fetch-and-process-worker.js');
  worker.postMessage('placeholder');
  worker.onmessage = (e) => {
    document.getElementById('display-div').textContent = e.data;
  };
}


export default () => (
  <>
    <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Approve_icon.svg' className='rotate'></img>
    <div>
      <button onClick={randomColor}>Click me!</button><input type='text' placeholder='Type something if you can'></input>
    </div>
    <br/><br/>
    <button id='calculateButton' onClick={calculate} >Calculate</button>
    <button id='calculateWithWorkerButton' onClick={calculateWithWorker}>Calculate with Worker</button>
    <textarea id='display-div' style={{width:'calc(90vw)',height:'calc(90vh - 200px)',border:'1px solid black'}}></textarea>
    <br/>
    <div id='buttonContainer' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
      <button id='fetchButton' onClick={fetch} >Fetch</button>
      <button id='fetchButton' onClick={fetchAndProcess} >Fetch and process</button>
      <button id='fetchButton' onClick={fetchAndProcessWithWorker} >Fetch and process with worker</button>
    </div>
  </>
);
