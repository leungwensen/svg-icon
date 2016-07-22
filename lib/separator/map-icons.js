'use strict';
const lang = require('zero-lang');
const path = require('path');
const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

const clearAttrs = require('../util/clear-attrs');

module.exports = (source, target/* , options */) => {
  // location: ${source}/!SVG/*.svg
  const sources = [
    './src/icons/',
    './src/markers/',
  ];

  lang.each(sources, (s) => {
    vfs.src('*.svg', {
      cwd: path.resolve(source, s),
      cwdbase: true,
      dot: true
    })
      .pipe(mapStream(clearAttrs))
      .pipe(vfs.dest(target));
  });
};
