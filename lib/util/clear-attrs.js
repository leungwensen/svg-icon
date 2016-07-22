'use strict';
/**
 * clear-attrs module
 * @module clear-attrs
 * @see module:index
 */
const svgo = require('./svgo');
const lang = require('zero-lang');
const DOMParser = require('xmldom').DOMParser;

const domParser = new DOMParser();

module.exports = (file, cb) => {
  const contents = lang.trim(String(file.contents));
  const doc = domParser.parseFromString(contents);
  if (doc && !(doc.childNodes.length === 1 && lang.isFunction(doc.firstChild.substringData))) {
    svgo.optimize(contents, result => {
      if (result.error) {
        console.log(doc);
        console.log(file.path, result.error);
      } else {
        file.contents = new Buffer(result.data);
        cb(null, file);
      }
      console.log(file.path);
    });
  } else {
    cb();
    console.log(`[ERROR FOUND]: ${file.path}`);
  }
};
