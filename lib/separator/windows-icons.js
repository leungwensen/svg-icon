'use strict';
const lang = require('zero-lang');
const path = require('path');
const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

const fixId = require('../util/fix-id');
const clearAttrs = require('../util/clear-attrs');

function rename(file, cb) {
  const pathname = file.path;
  const extname = path.extname(pathname);
  const basename = path.basename(pathname, extname);
  const dirname = path.dirname(pathname);
  let targetName = basename.replace(/^appbar\-/, '');
  file.path = `${dirname}/${targetName}${extname}`;
  cb(null, file);
}

module.exports = (source, target/* , options */) => {
  // location: ${source}/*/svg/design/*.svg
  const sources = [
    './icons/svg/',
    './WindowsPhone/svg/',
  ];

  lang.each(sources, (s) => {
    vfs.src('*.svg', {
      cwd: path.resolve(source, s),
      cwdbase: true,
      dot: true
    })
      .pipe(mapStream(fixId))
      .pipe(mapStream(rename))
      .pipe(mapStream(clearAttrs))
      .pipe(vfs.dest(target));
  });
};
