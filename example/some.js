var download = require('../');

download([
    'https://raw.githubusercontent.com/miniflycn/url-download/master/index.js',
    'https://raw.githubusercontent.com/miniflycn/url-download/master/README.md'
  ], './').on('close', function (err, url) {
    console.log(url + ' has been downloaded.');
  }).on('done', function () {
    console.log('All files have been downloaded.');
  });