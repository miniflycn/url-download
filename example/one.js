var download = require('../');

download('https://raw.githubusercontent.com/miniflycn/url-download/master/index.js', './')
  .on('close', function () {
    console.log('One file has been downloaded.');
  });