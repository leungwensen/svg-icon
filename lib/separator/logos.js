'use strict';
const path = require('path');
const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

const fixId = require('../util/fix-id');

function log(file, cb) { // logging
  console.log(`[copying...] ${file.path}`);
  cb(null, file);
}

module.exports = (source, target/* , options */) => {
  // location: ${source}/assets/icons/
  vfs.src('*.svg', {
    cwd: path.resolve(source, './logos/'),
    cwdbase: true,
    dot: true
  })
    .pipe(mapStream(fixId))
    .pipe(mapStream(log))
    .pipe(vfs.dest(target));
};
