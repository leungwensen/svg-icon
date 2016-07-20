'use strict';
/**
 * demo-data module
 * @module demo-data
 * @see module:index
 */
const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('sync-icons', shell.task([
  'node bin/sync-icons.js'
]));
