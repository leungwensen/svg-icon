const path = require('path');
const lang = require('underscore');
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const svgmin = require('gulp-svgmin');
const through = require('through2');
const config = require('./config');

function removingAttrs() {
  return through.obj(function remove(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('svgmin', 'Streaming not supported'));
    }

    try {
      gutil.log(file.path);
      const basename = path.basename(file.path, '.svg');
      if (!lang.contains(config.svgminRemovingAttrsIgnores, basename)) {
        const contents = file.contents.toString('utf8')
          .replace(/\sfill\-rule="\S+"/g, '')
          .replace(/\sclip\-rule="\S+"/g, '')
          .replace(/\sfill="#\S+"/g, '');
        file.contents = new Buffer(contents);
      }
    } catch (err) {
      this.emit('error', new gutil.PluginError('svgmin', err.toString()));
    }

    this.push(file);
    return cb();
  });
}

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
            {
              removeEditorsNSData: true
            },
            {
              removeEmptyAttrs: true
            },
            {
              removeEmptyContainers: true
            },
            {
              removeEmptyText: true
            },
            {
              removeHiddenElems: true
            },
            {
              removeStyleElement: true
            },
            {
              removeTitle: true
            },
            {
              removeUselessDefs: true
            },
            {
              sortAttrs: true
            },
          ]
        }))
        .pipe(removingAttrs())
        .pipe(gulp.dest(path.resolve(__dirname, `../dist/svg/${dir}/`)))
        .on('error', (err) => {
          gutil.log(gutil.colors.red(err.message));
        })
  );
});

gulp.task('svgmin', lang.map(config.svgminDirs, (dir) => `svgmin-${dir}`));
