'use strict';
/**
 * demo-data module
 * @module demo-data
 * @see module:index
 */
const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('demo-data', shell.task([
  'node bin/generate-demo-data.js'
]));
