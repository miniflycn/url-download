!function () {
	'use strict';
  var path = require('path')
    , fs = require('fs')
    , EventEmitter = require('events').EventEmitter
    , valid = require('url-valid')
    , eachAsync = require('each-async');

  module.exports = function (url, dest, opts) {
    url = Array.isArray(url) ? url : [url];
    var emitter = new EventEmitter();
    eachAsync(url, function (url, i, done) {
      var file = path.join(dest, path.basename(url))
        , stream = fs.createWriteStream(file);
      valid(url).on('data', function (err, chunk) {
        stream.write(chunk);
      }).on('end', function () {
        stream.on('end', function () {
          emitter.emit('close');
          done();
        });
        stream.end();
      });
    }, function () {
      emitter.emit('done');
    });
    return emitter;
  };
}()