const gulp = require('gulp');

gulp.task('data', ['demo-data']);
gulp.task('default', ['dev']);
gulp.task('lint', ['eslint']);
