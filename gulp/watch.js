const gulp = require('gulp');
const lang = require('zero-lang');
const path = require('path');
const config = require('./config');

gulp.task('watch', () => {
  lang.each(config.templateDirs, (dir) => {
    gulp.watch(path.resolve(__dirname, `../${dir}/**/*.html`), [`template2module-${dir}`]);
  });
});
