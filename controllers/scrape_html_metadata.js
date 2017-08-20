var scrape = require('html-metadata');

module.exports = (url, callback) => {
    scrape(url).then(metadata => {
        var urlObject = {url: url};
        urlObject.content_type = metadata.openGraph.type || "Website";
        urlObject.length = metadata.twitter.data1 ? parseInt(metadata.twitter.data1) : 0;
        urlObject.category = metadata.jsonLd["@type"] || "Web page";
        callback(urlObject);
    });
};
