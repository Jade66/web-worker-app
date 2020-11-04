import React from "react";
import pi from './pi';
import solrSource from './solr-source';

function calculate() {
  document.getElementById('display-div').textContent = 'Working in the main thread. Grab a sandwich...';
  setTimeout(() => {
    document.getElementById('display-div').textContent = '3.' + pi(30000).slice(1);
  },0);
  
}

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
  document.getElementById('display-div').textContent = data;
}

export default () => (
  <>
    <div>
      <button onClick={randomColor}>Click me!</button><input type='text' placeholder='Type something if you can'></input>
    </div>
    <br/><br/>
    <button id='calculateButton' onClick={calculate} >Calculate</button>
    <button id='calculateWithWorkerButton' onClick={calculateWithWorker}>Calculate with Worker</button>
    <textarea id='display-div' style={{width:'calc(90vw)',height:'calc(90vh - 200px)',border:'1px solid black'}}></textarea>
    <button id='fetchButton' onClick={fetchSolrData} >Fetch!</button>
  </>
);
