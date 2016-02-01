'use strict';

const express = require('express');
const app = express();
const parser = require('./thecodinglove_parser.js');

app.set('port', (process.env.PORT || 3000));

app.get('/randomJson', function(req, res) {

  parser.getRandomEntryAsJson(function(error, entry) {

    if (!!error) {
      console.error(error);
      res.status(500).send({ error: 'error receiving data from thecodinglove' });
    } else {
      res.send(entry);
    }
  });
});

app.get('/randomHtml', function(req, res) {

  parser.getRandomEntryAsHtml(function(error, entry) {

    if (!!error) {
      console.error(error);
      res.status(500).send({ error: 'error receiving data from thecodinglove' });
    } else {
      res.send(entry);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('thecodinglove API Wrapper listening on port', app.get('port'));
});
