'use strict';

const parser = require('./thecodinglove_parser.js');

parser.getRandomEntryAsJson(function(error, entry) {

  if (!!error) {
    console.error(error);
  } else {
    console.log(entry);
  }
});

parser.getRandomEntryAsHtml(function(error, entry) {

  if (!!error) {
    console.error(error);
  } else {
    console.log(entry);
  }
});
