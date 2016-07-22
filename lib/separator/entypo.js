'use strict';
const path = require('path');
const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

module.exports = (source, target/* , options */) => {
  // location: ${source}/!SVG/*.svg
  console.log(target);
  vfs.src('*.svg', {
    cwd: path.resolve(source, './src/svg/'),
    cwdbase: true,
    dot: true
  })
    .pipe(vfs.dest(target));
};
