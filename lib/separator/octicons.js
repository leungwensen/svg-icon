'use strict';
/*
 * simply sync and optimize icons from octicons project: https://github.com/primer/octicons
 */
const path = require('path');
const parseString = require('xml2js').parseString;

const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

function replaceAttrs(file, cb) {
  const contents = file.contents.toString('utf8');

  parseString(contents, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      try {
        const width = result.svg.$.width;
        const height = result.svg.$.height;
        const resultStr = contents
          .replace(/\swidth="\d+(px)?"/, '')
          .replace(/height="\d+(px)?"/, `viewBox="0 0 ${width} ${height}"`);

        file.contents = new Buffer(resultStr);
      } catch (e) {
        console.error(e);
      }
    }
    console.log(`[copying...] ${file.path}`);
    cb(null, file);
  });
}

module.exports = (source, target/* , options */) => {
  // location: ${source}/svg/*.svg
  console.log(target);
  vfs.src('*.svg', {
    cwd: path.resolve(source, './svg/'),
    cwdbase: true,
    dot: true
  })
    .pipe(mapStream(replaceAttrs))
    .pipe(vfs.dest(target));
};
