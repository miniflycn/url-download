var download = require('../')
  , fs = require('fs')

describe('download', function () {
  it('should throw a error when url is invalid', function (done) {
    var url = 'http://invalidurl.com/noexist.zip';
      download(url, './')
        .on('invalid', function (e) {
          e.url.should.equal(url);
          done();
        });
  });

  it('should able to name the output file', function (done) {
    var url = 'https://www.baidu.com/';
      download(url, './', { outputName: 'baidu.html' })
        .on('done', function () {
          if (fs.existsSync('./baidu.html')) {
            done();
          }
        })
  });
});