const path = require('path');
const lang = require('underscore');
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const svgmin = require('gulp-svgmin');
const config = require('./config');

lang.each(config.svgminDirs, (dir) => {
  gulp.task(`svgmin-${dir}`, () =>
      gulp.src(path.resolve(__dirname, `../src/${dir}/*.svg`))
        .pipe(plumber())
        .pipe(svgmin({
          plugins: [
            {
              removeAttrs: {
                attrs: [
                  'class',
                  'data-name',
                  // 'fill',
                  // 'fill-rule',
                  'height',
                  'id',
                  'width',
                ]
              }
            },
            {removeEditorsNSData: true},
            {removeEmptyAttrs: true},
            {removeEmptyContainers: true},
            {removeEmptyText: true},
            {removeHiddenElems: true},
            {removeStyleElement: true},
            {removeTitle: true},
            {removeUselessDefs: true},
            {sortAttrs: true},
          ]
        }))
        .pipe(gulp.dest(path.resolve(__dirname, `../dist/svg/${dir}/`)))
        .on('error', (err) => {
          gutil.log(gutil.colors.red(err.message));
        })
  );
});

gulp.task('svgmin', lang.map(config.svgminDirs, (dir) => `svgmin-${dir}`));
