var download = require('../')
  , fs = require('fs')

describe('download', function () {
  it('should throw a error when url is invalid', function (done) {
    var url = 'http://www.23123.com/';
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
            fs.unlinkSync('./baidu.html')
          }
        })
  });

  it('should able to get the url and the file path', function (done) {
    var url = 'https://www.baidu.com';
      download(url, './', { outputName: 'test.html' })
        .on('close', function (e, url, file) {
          url.should.equal(url);
          file.should.equal('test.html');
          fs.unlinkSync('./test.html');
          done();
        })
  })
});