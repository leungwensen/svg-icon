'use strict';
/**
 * clear-attrs module
 * @module clear-attrs
 * @see module:index
 */
const svgo = require('./svgo');

module.exports = (file, cb) => {
  svgo.optimize(String(file.contents), result => {
    if (result.error) {
      return cb(new Error(result.error));
    }
    file.contents = new Buffer(result.data);
    cb(null, file);
  });
};
