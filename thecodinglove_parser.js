'use strict';

var http = require('follow-redirects').http,
    cheerio = require('cheerio');
    //pictureTube = require('picture-tube'),
    //request = require('request');

const options = {
  host: 'thecodinglove.com',
  port: 80,
  path: '/random'
};

function getRandomEntry (cb) {
  http.get(options, function(res) {
    //console.log("Response-Code: " + res.statusCode);

    let body = String;
    const title = String;
    const imageUrl = String;

    res.on("data", function(chunk) {
      body += String(chunk);
    });

    res.on('end', function() {
      const title = getTitleFromBody(body);
      const imageUrl = getImageFromBody(body);
      const pageUrl = getUrlFromBody(body);

      const entry  = {
        title: title,
        imageUrl: imageUrl,
        pageUrl: pageUrl
      };

      cb(null, entry);
      //cont imageUrl = "http://patrickcoombe.com/wp-content/uploads/2015/09/new-google-logo-2015.png";
      //request(imageUrl).pipe(pictureTube()).pipe(process.stdout);
    });

  }).on('error', function(error) {
    cb(error, null);
  })
};

function getTitleFromBody(body) {
  return cheerio.load(body)('h3').text();
};

function getImageFromBody(body) {
  return cheerio.load(body)('img')[3].attribs.src;
};

function getUrlFromBody(body) {
  return cheerio.load(body)('meta')[17].attribs.content;
};

function getRandomEntryAsJson(cb) {
  return getRandomEntry(cb);
}

function getRandomEntryAsHtml(cb) {
  getRandomEntry(function(error, entry) {

    const imageUrl = entry.imageUrl;
    const title = entry.title;
    const pageUrl = entry.pageUrl;

    entry = "<!doctype html><head><meta charset=\"utf-8\"><meta http-equiv=\"Refresh\" content=\"10\"><title>TheCodingLove - Random</title><style>* { font-family: arial; font-size: 12px; }</style></head><body>";
    entry += "<b style=\"font-size: 18px\">TheCodingLove Random Viewer</b><br><br><a href=\"" + pageUrl + "\" target=\"_blank\"><img src=\"" + imageUrl + "\" border=\"0\"></a><br><br><b style=\"font-size: 14px\">"+title+"</b><br><br><a href=\"" + pageUrl + "\" target=\"_blank\">"+pageUrl+"</a>";
    entry += "</body></html> ";

    cb(error, entry);
  })

}

module.exports.getRandomEntryAsJson = getRandomEntryAsJson;
module.exports.getRandomEntryAsHtml = getRandomEntryAsHtml;
