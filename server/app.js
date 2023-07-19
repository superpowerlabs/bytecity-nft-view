
const express = require('express');
const path = require("path");
const axios = require('axios')

const baseUrl = 'https://test-api.byte.city';
const url = baseUrl+'/nftdata/show'

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/:type/:chain/:id', function(req, res) {
  if (['GET'].includes(req.method) && !req.is('application/json')) {
    axios
    .post(url, {
      TokenId: parseInt(req.params.id), 
      Market: req.params.chain, 
      Series: req.params.type
    })
    .then((response) => { console.log(response.data); res.send(response.data); })  
    .catch((err) => { console.log(err) })
  } else {
    next();
  }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

module.exports = app;
