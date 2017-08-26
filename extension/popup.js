// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
      var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
      console.assert(typeof url == 'string', 'tab.url should be a string');
      document.getElementById('url').value = url;
    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getImageUrl(searchTerm, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q=' + encodeURIComponent(searchTerm);
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response || !response.responseData || !response.responseData.results ||
        response.responseData.results.length === 0) {
      errorCallback('No response from Google Image search!');
      return;
    }
    var firstResult = response.responseData.results[0];
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    var imageUrl = firstResult.tbUrl;
    var width = parseInt(firstResult.tbWidth);
    var height = parseInt(firstResult.tbHeight);
    console.assert(
        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
        'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit").addEventListener("click", function() {
        console.log("submitting");
        var sessionId;
        chrome.cookies.get({url: "https://damp-stream-82977.herokuapp.com/", name: "sessionId"}, function(cookie) {
            sessionId = cookie.value;
            var data = {};
            data.url = document.getElementById("url").value;
            data.content_type = document.getElementById("content_type").value;
            data.length = document.getElementById("length").value;
            data.category = document.getElementById("category").value;
//            console.log("sessionId:", sessionId);
//            console.log("data", data);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                console.log("in readystatechange function");
                console.log(this);
                if (this.readyState == 4 && this.status == 403) {
                    document.getElementById("status").innerHTML = "There was an issue. Please try logging in again.";
                    console.log(this.responseText);
                }
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("status").innerHTML = "Saved it!";
                    console.log(this.responseText);
                }
            };
            xhttp.open("POST", "https://damp-stream-82977.herokuapp.com/api/urls/" + sessionId, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(data));

        });
    });

  getCurrentTabUrl(function(url) {
    // Put the image URL in Google search.

    getImageUrl(url, function(imageUrl, width, height) {

      var imageResult = document.getElementById('image-result');
      // Explicitly set the width/height to minimize the number of reflows. For
      // a single image, this does not matter, but if you're going to embed
      // multiple external images in your page, then the absence of width/height
      // attributes causes the popup to resize multiple times.
      imageResult.width = width;
      imageResult.height = height;
      imageResult.src = imageUrl;
      imageResult.hidden = false;

    }, function(errorMessage) {
    });
  });
});

// //import scrape from 'html-metadata';
// import wordCount from 'html-word-count';

// var scrape_data = function(tab, callback){
//     var html;

//     chrome.pageCapture.saveAsMHTML(tab.id, function (mhtmlData) {
//         console.log(mhtmlData); 
//     });

//     scrape(url).then(metadata => {
//         var urlObject = {url: url};
//         urlObject.content_type = metadata.openGraph.type || "Website";
//         urlObject.category = metadata.jsonLd["@type"] || "Web page";

//         getLength(url, function(length) {
//             urlObject.length = length;
//             console.log(urlObject);
//         });
//     });
// };

// function getLength(url, callback) {
//     request(url, function (error, response, body) {
//         //        console.log('error:', error); // Print the error if one occurred
//         const count = wordCount(body);
//         // adults read about 200 wpm according to https://www.irisreading.com/the-average-reading-speed/
//         const rate = 200;
//         callback(parseInt(Math.ceil(count/rate)));
//     });
// };

