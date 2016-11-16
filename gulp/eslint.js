const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const lang = require('zero-lang');
const path = require('path');
const util = require('gulp-util');

const dirs = [
  'common',
  'gulp',
  'lib',
  'src',
  'webpack',
];
function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed;
}

lang.each(dirs, (dir) => {
  gulp.task(
    `eslint-${dir}`, () => {
      const srcPath = path.resolve(__dirname, `../${dir}/**/*.js`);
      gulp.src(srcPath)
        .pipe(eslint())
        .on('error', (err) => {
          util.log(util.colors.red(err.message));
        })
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest(path.resolve(__dirname, `../${dir}/**/*.js`))))
        .pipe(eslint.failAfterError());
    }
  );
});

gulp.task('eslint', lang.map(dirs, dir => `eslint-${dir}`));
