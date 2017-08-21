var scrape = require('html-metadata');
var wordCount = require('html-word-count');
var request = require('request');

module.exports = (url, callback) => {
    scrape(url).then(metadata => {
        var urlObject = {url: url};
        urlObject.content_type = metadata.openGraph.type || "Website";
        urlObject.length = metadata.twitter.data1 ? parseInt(metadata.twitter.data1) : 0;
        urlObject.category = metadata.jsonLd["@type"] || "Web page";
        if (urlObject.length === 0 ) {
            getLength(url, function(length) {
                urlObject.length = length;
                console.log(urlObject);
            });
        }
        else {
            callback(urlObject);
        }

    });
};

function getLength(url, callback) {
    request(url, function (error, response, body) {
//        console.log('error:', error); // Print the error if one occurred
        const count = wordCount(body);
        // adults read about 200 wpm according to https://www.irisreading.com/the-average-reading-speed/
        const rate = 200;
        callback(parseInt(Math.ceil(count/rate)));
    });
};
