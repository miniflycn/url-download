var download = require('../')

describe('download', function () {
  it('should throw a error when url is invalid', function (done) {
    var url = 'http://invalidurl.com/noexist.zip';
      download(url, './')
        .on('invalid', function (e) {
          e.url.should.equal(url);
          done();
        });
  }); 
});