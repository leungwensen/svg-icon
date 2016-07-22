'use strict';
const path = require('path');
const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

const clearAttrs = require('../util/clear-attrs');

function rename(file, cb) { // removing prefix in filename
  const arr = file.path.split(path.sep);
  arr[arr.length - 1] = arr[arr.length - 1].replace(/^\d+-/, '');
  file.path = arr.join(path.sep);
  console.log(`[copying...] ${file.path}`);
  cb(null, file);
}

module.exports = (source, target/* , options */) => {
  // location: ${source}/assets/icons/
  vfs.src('*.svg', {
    cwd: path.resolve(source, './SVG/'),
    cwdbase: true,
    dot: true
  })
    .pipe(mapStream(rename))
    .pipe(mapStream(clearAttrs))
    .pipe(vfs.dest(target));
};
