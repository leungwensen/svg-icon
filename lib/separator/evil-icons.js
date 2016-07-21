'use strict';
/*
 * simply sync and optimize icons from evil-icons project: https://github.com/outpunk/evil-icons
 */
const path = require('path');

const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

function rename(file, cb) { // removing prefix in filename
  const arr = file.path.split(path.sep);
  arr[arr.length - 1] = arr[arr.length - 1].replace(/^ei-/, '');
  file.path = arr.join(path.sep);
  console.log(`[copying...] ${file.path}`);
  cb(null, file);
}

function cleanAttrs(file, cb) {
  const contents = file.contents.toString('utf8')
    .replace(/\sfill="#\S+"/, '');

  file.contents = new Buffer(contents);
  cb(null, file);
}

module.exports = (source, target/* , options */) => {
  // location: ${source}/assets/icons/
  vfs.src('*.svg', {
    cwd: path.resolve(source, './assets/icons/'),
    cwdbase: true,
    dot: true
  })
    .pipe(mapStream(rename))
    .pipe(mapStream(cleanAttrs))
    .pipe(vfs.dest(target));
};
