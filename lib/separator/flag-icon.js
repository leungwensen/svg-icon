'use strict';
/*
 * simply sync and optimize icons from flag-icon-css project: https://github.com/lipis/flag-icon-css
 */
const path = require('path');

const vfs = require('vinyl-fs');

module.exports = (source, target/* , options */) => {
  // location: ${source}/assets/icons/
  vfs.src('*.svg', {
    cwd: path.resolve(source, './flags/4x3/'),
    cwdbase: true,
    dot: true
  })
    .pipe(vfs.dest(target));
};
