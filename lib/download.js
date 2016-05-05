!function () {
  'use strict';
  var path = require('path')
    , fs = require('fs')
    , EventEmitter = require('events').EventEmitter
    , valid = require('url-valid')
    , eachAsync = require('each-async');

  /** 
   * download
   * @param {String | Array} url
   * @param {String} dest
   * return {EventEmitter}
   */
  module.exports = function (url, dest, opts) {
    url = Array.isArray(url) ? url : [url];
    var emitter = new EventEmitter();
    eachAsync(url, function (url, i, done) {
      var file = path.join(dest, path.basename(url))
        , stream;
      valid(url).on('data', function (err, chunk) {
        if (err) emitter.emit('error', err);
        stream.write(chunk);
      }).on('check', function (err, valid) {
        if (err) return emitter.emit('error', err)
        if (!valid) {
            err = new Error(url + ' is invalid');
            err.url = url;
            return emitter.emit('invalid', err);
        }
        stream = fs.createWriteStream(file);
      }).on('end', function () {
        stream.on('close', function () {
          emitter.emit('close', null, url);
          done();
        });
        stream.end();
      }).on('error', function (err) {
          emitter.emit('error', err);
      });
    }, function () {
      emitter.emit('done');
    });
    return emitter;
  };
}();