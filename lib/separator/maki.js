'use strict';
const path = require('path');
const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

const clearAttrs = require('../util/clear-attrs');

module.exports = (source, target/* , options */) => {
  // location: ${source}/!SVG/*.svg
  console.log(target);
  vfs.src('*.svg', {
    cwd: path.resolve(source, './icons/'),
    cwdbase: true,
    dot: true
  })
    .pipe(mapStream(clearAttrs))
    .pipe(vfs.dest(target));
};
