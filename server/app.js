
const express = require('express');
const path = require("path");
const axios = require('axios')

const baseUrl = 'https://test-api.byte.city';
const url = baseUrl+'/nftdata/show'

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/:type/:chain/:id', function(req, res, next) {
  const contentType = req.headers['content-type'];
  if (/json/.test(contentType)) {
    axios
    .post(url, {
      TokenId: parseInt(req.params.id),
      Market: req.params.chain,
      Series: req.params.type
    })
    .then((response) => { res.send(response.data.data); })
    .catch(() => { res.send({
      success: false,
      error: "Metadata not found"
    }) })
  } else {
    next();
  }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

module.exports = app;
