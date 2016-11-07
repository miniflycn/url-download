# url-download

[![Build Status](https://travis-ci.org/miniflycn/url-download.svg?branch=master)](https://travis-ci.org/miniflycn/url-download)

## Usage
``` javascript
  /** 
   * download
   * @param {String | Array} url
   * @param {String} dest
   * @param {Object} options
   * return {EventEmitter}
   */

  // for one file
  download('https://raw.githubusercontent.com/miniflycn/url-download/master/index.js', './')
    .on('close', function () {
      console.log('One file has been downloaded.');
    });

  // for some files
  download([
    'https://raw.githubusercontent.com/miniflycn/url-download/master/index.js',
    'https://raw.githubusercontent.com/miniflycn/url-download/master/README.md'
  ], './').on('close', function (err, url, file) {
    console.log(url + ' has been downloaded.', 'And saved as ' + file);
  }).on('done', function () {
    console.log('All files have been downloaded.');
  });
  
  // invalid file
  download('http://invalidurl.com/noexist.zip', './')
    .on('invalid', function (e) {
      console.log(e.url + ' is invalid');
    })

  // change destination file name
  download('http://url.com/some?long=query&with=parameters', './', {outputName:'my_file.jpg'})
    .on('done', function () {
    console.log('File saved as my_file.jpg');
  });
```

## License
(The MIT License)

Copyright (c) 2013 Daniel Yang <miniflycn@justany.net>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.