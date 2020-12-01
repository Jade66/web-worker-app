// const SEARCH_URL = 'http://search-internal-dev.mathworks.com/solr/license_entitlement/select?indent=on&q=*:*&wt=json';
const SEARCH_URL = 'http://ah-jade.dhcp.mathworks.com:3000/solr/license_entitlement/select?indent=on&q=*:*&wt=json';
const PAGE_SIZE = 100;

async function getPage(pageOffset) {
    const offset = pageOffset * PAGE_SIZE;
    const fullUrl = `${SEARCH_URL}&ROWS=${PAGE_SIZE}&START=${offset}`;
    return await fetch(fullUrl).then(result => result.json());
}

export default {
    getPage
};