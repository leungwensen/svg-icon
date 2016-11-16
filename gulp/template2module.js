const gulp = require('gulp');
const lang = require('zero-lang');
const path = require('path');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const through = require('through2');
const util = require('gulp-util');
const template2module = require('../common/template2module');

const dirs = [
  'lib',
  'src',
];
function relative(pathname) {
  return path.resolve(__dirname, pathname);
}

function render() {
  return through.obj(function (file, enc, cb) {
    const me = this;
    if (file.isNull()) {
      me.push(file);
      return cb();
    }
    if (file.isStream()) {
      me.emit('error', new util.PluginError('template2module', 'Streaming not supported'));
    }

    try {
      util.log(file.path);
      file.contents = new Buffer(template2module(file.contents.toString('utf8'), file.path));
    } catch (e) {
      me.emit('error', new util.PluginError('template2module', e.toString()));
    }
    me.push(file);
    return cb();
  })
}

lang.each(dirs, (dir) => {
  gulp.task(
    `template2module-${dir}`,
    () => gulp.src(relative(`../${dir}/**/*.tpl`))
      .pipe(plumber())
      .pipe(render())
      .on('error', (err) => {
        util.log(util.colors.red(err.message));
      })
      .pipe(rename((pathname) => {
        pathname.extname = '.js';
      }))
      .pipe(gulp.dest(relative(`../${dir}/`)))
  );
});
gulp.task('template2module', lang.map(dirs, dir => `template2module-${dir}`));
