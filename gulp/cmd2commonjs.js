const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const through = require('through2');
const ranma = require('ranma');

function cjsify() {
  return through.obj(function render(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('cmd2commonjs', 'Streaming not supported'));
    }

    try {
      gutil.log(file.path);
      const content = ranma.cjsify(file.contents.toString('utf8'));
      file.contents = new Buffer(content);
    } catch (err) {
      this.emit('error', new gutil.PluginError('cmd2commonjs', err.toString()));
    }

    this.push(file);
    return cb();
  });
}

// 这个脚本不能多次执行，因此在临时文件夹内进行
gulp.task(
  'cmd2commonjs',
  () => gulp.src(path.resolve(__dirname, '../temp/cmd/**/*.js'))
    .pipe(plumber())
    .pipe(cjsify())
    .on('error', (err) => {
      gutil.log(gutil.colors.red(err.message));
    })
    .pipe(gulp.dest(path.resolve(__dirname, '../temp/commonjs/')))
);
