'use strict';
const path = require('path');
const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

function log(file, cb) { // logging
  console.log(`[copying...] ${file.path}`);
  cb(null, file);
}

module.exports = (source, target/* , options */) => {
  // location: ${source}/assets/icons/
  vfs.src('*.svg', {
    cwd: path.resolve(source, './flags/4x3/'),
    cwdbase: true,
    dot: true
  })
    .pipe(mapStream(log))
    .pipe(vfs.dest(target));
};
