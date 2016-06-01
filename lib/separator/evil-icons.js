'use strict';
/*
 * simply sync and optimize icons from evil-icons project: https://github.com/outpunk/evil-icons
 */
const path = require('path');

const vfs = require('vinyl-fs');

module.exports = (source, target/* , options */) => {
  // location: ${source}/assets/icons/
  vfs.src('*.svg', {
    cwd: path.resolve(source, './assets/icons/'),
    cwdbase: true,
    dot: true
  })
    .pipe(vfs.dest(target));
};
