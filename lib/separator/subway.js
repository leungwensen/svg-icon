'use strict';
const path = require('path');
const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

const clearAttrs = require('../util/clear-attrs');
const fixId = require('../util/fix-id');

module.exports = (source, target/* , options */) => {
  // location: ${source}/!SVG/*.svg
  console.log(target);
  vfs.src('*.svg', {
    cwd: path.resolve(source, './SVG/'),
    cwdbase: true,
    dot: true
  })
    .pipe(mapStream(clearAttrs))
    .pipe(mapStream(fixId))
    .pipe(vfs.dest(target));
};
