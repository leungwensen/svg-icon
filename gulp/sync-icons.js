'use strict';
/**
 * demo-data module
 * @module demo-data
 * @see module:index
 */
const gulp = require('gulp');
const lang = require('zero-lang');
const shell = require('gulp-shell');
const config = require('./config');

const iconNames = config.iconNames;

lang.each(iconNames, (name) => {
  gulp.task(`sync-icons-${name}`, shell.task([
    `node bin/sync-icons.js ${name}`
  ]));
});

gulp.task('sync-icons-zero', ['svgmin']);

iconNames.push('zero');

gulp.task('sync-icons', lang.map(iconNames, (name) => `sync-icons-${name}`));
