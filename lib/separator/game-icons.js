'use strict';
const path = require('path');
const mapStream = require('map-stream');
const vfs = require('vinyl-fs');

module.exports = (source, target/* , options */) => {
  // location: ${source}/*/svg/design/*.svg
  console.log(target);
  vfs.src('./*/*/svg/*.svg', {
    cwd: source,
    cwdbase: true,
    dot: true
  })
    .pipe(vfs.dest(target, {
      base(file){
        const arr = file.path.split(path.sep);
        const len = arr.length;
        file.path = path.resolve(source, `./${arr[len - 3]}-${arr[len - 1]}`);
        return target;
      },
      cwd: './'
    }));
};
