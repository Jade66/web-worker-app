import solrSource from './solr-source';

function showMessage(message) {
    const messageDiv = document.getElementById('message-div');
    messageDiv.innerText = message;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
      currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function randomColor(e) {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const colorString = `rgb(${red},${green},${blue})`;
  e.target.style.backgroundColor = colorString;
}

function buildCell(value) {
  const cell = document.createElement('td');
  if(!value) {
      value = '';
  }
  cell.innerText = value;
  return cell;
}

function displayDocs(docs) {
  const body = document.getElementById('docs-body');
  docs.forEach(doc => {
    const row = document.createElement('tr');
    row.appendChild(buildCell(doc.id));
    row.appendChild(buildCell(doc.masterLicenseId));
    row.appendChild(buildCell(doc.licenseId));
    row.appendChild(buildCell(doc.enhancedValue));
    body.appendChild(row);
  });
}

function clearOutput() {
  const body = document.getElementById('docs-body');
  body.innerHTML = '';
  showMessage('');
}

async function fetchSolrData() {
  const data = await solrSource.getPage(0);
  return data;
}

async function fetchAndProcess(enhancedValue) {
    const data = await fetchSolrData();
    data.docs.forEach((doc) => {
        doc.enhancedValue = enhancedValue;
        sleep(500);
    });
    return data.docs;
}

export {sleep, randomColor, displayDocs, clearOutput, fetchSolrData, showMessage, fetchAndProcess};
