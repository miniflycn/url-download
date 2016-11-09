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
    // allow for customization of output file name
    if (opts && opts.outputName) {
      if (url.length !== 1) {
        throw new Error("'outputName' only supported for single file download");
      }
    }

    var emitter = new EventEmitter();
    eachAsync(url, function (url, i, done) {
      // allow for customization of output file name
      var baseName = path.basename(url);
      if (opts && opts.outputName) {
        baseName = opts.outputName;
      }
      var file = path.join(dest, baseName)
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
          emitter.emit('close', null, url, file);
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