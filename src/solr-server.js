/**
 * A simple http server for development.  This server runs in two modes.  Normally, it responds to all requests
 * with a grouped Solr response.  This response is consistent with what Solr would return given the configuration
 * we have in the reference application.  This is the mode it runs in when you use "npm run solr-server-static".
 *
 * If you include the argument "-integration" on the command line, it instead passes the request on to the actual Solr
 * endpoint specified in the solrEndpoint variable. This is the mode it runs in when you use "npm run solr-server-integration".
 *
 * The sample solr configuration in the app directory points at localhost:3000 for its solr endpoint, which will
 * hit this server if it is running.
 */
// const axios = require('axios');
const http = require('http');
const axios = require('axios');
const port = 3000;

const solrEndpoint = 'http://search-internal-dev.mathworks.com/solr/license_entitlement/select?indent=on&q=*:*&wt=json';

const server = http.createServer(requestHandler);

async function requestHandler (request, response) {
    // Always set the same headers, whether in integration mode or not
    const requestOrigin = request.headers.origin || 'NoneDefined';
    response.setHeader('Access-Control-Allow-Origin', requestOrigin);
    response.setHeader('Access-Control-Allow-Headers', 'content-type');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    response.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle pre-flight requests the same whether in integration mode or not
    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }

    const result = await passthru(request, response);
    response.writeHead(200);
    response.end(result);
}

async function passthru (request, response) {
    if (request.method === 'GET') {
        try {
            const url = solrEndpoint + '&ROWS=100&START=0';
            console.log(url);
            const solrResponse = await axios.get(url);
            return JSON.stringify(solrResponse.data.response);
        } catch (err) {
            console.error(err);
            return 'Error encountered: ' + err.message;
        }
    }
    return 'Unsupported http method ' + request.method;
}

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});


