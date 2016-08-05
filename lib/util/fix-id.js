'use strict';
/**
 * clear-attrs module
 * @module clear-attrs
 * @see module:index
 */
const lang = require('zero-lang');
const path = require('path');

const mapping = {
  'zoom-out': /zoom-$/,
  'zoom-in': /zoom\+/g,
  'cpp': /c\+\+/g,
  'at': /@/g,
  'plus': /\+/g,
  '-': /\./g,
};

module.exports = (file, cb) => {
  const pathname = file.path;
  const extname = path.extname(pathname);
  const basename = path.basename(pathname, extname);
  const dirname = path.dirname(pathname);
  let targetName = basename;

  lang.forIn(mapping, (value, key) => {
    targetName = targetName.replace(value, key);
  });
  targetName = targetName.replace(/[^\w\-_]/g, '-');
  file.path = `${dirname}/${targetName}${extname}`;
  cb(null, file);
};
