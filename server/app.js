
const express = require('express');
const path = require("path");
const axios = require('axios');
// const compression = require('compression');

const baseUrl = 'https://test-api.byte.city';
const url = baseUrl+'/nftdata/show'

const app = express();
// app.use(compression());
// Have Node serve the files for our built React app

app.use("/UnityBuild/:anything", function (req, res, next) {
  let v = req.params.anything;
  if (/\.gz$/.test(v)) {
    res.header("Content-Encoding", "gzip")
    if (/\.js\./.test(v)) {
      res.header("Content-Type", "application/javascript")
    } else if (/\.wasm\./.test(v)) {
      res.header("Content-Type", "application/wasm")
    } else if (/\.(data|symbols\.json)\./.test(v)) {
      res.header("Content-Type", "application/octet-stream")
    }
  }
  next()
});

app.use("/StreamingAssets/Bundles/:anything", function (req, res, next) {
  let v = req.params.anything;
  if (/\.gz$/.test(v)) {
    res.header("Content-Encoding", "gzip")
    if (/\.js\./.test(v)) {
      res.header("Content-Type", "application/javascript")
    } else if (/\.wasm\./.test(v)) {
      res.header("Content-Type", "application/wasm")
    } else if (/\.(data|symbols\.json)\./.test(v)) {
      res.header("Content-Type", "application/octet-stream")
    }
  }
  next()
});

// Handle GET requests to /api route
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
      });
    });
  }
  else {
    next();
  }
});

app.use("/:anything", function (req, res, next) {
  // console.log("serve static:", req.params)
  let v = req.params.anything;
  if (!/\.module.aswm$/.test(v)) {
    switch (v) {
      case "favicon.ico":
      case "manifest.json":
      case "logo192.png":
      case "static":
      case "UntiyBuild":
	    case "StreamingAssets":
      case "js":
      case "img":
        break;
      default:
        // console.log("isHome = true");
        res.locals.isHome = true;
    }
  }
  next();
});

app.use(express.static(path.resolve(__dirname, '../build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res, next) => {
  // console.log("serve index.html:", req.params);
  if (res.locals.isHome) {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  } else {
    next();
  }
});

module.exports = app;
