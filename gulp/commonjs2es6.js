const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const through = require('through2');
const Transformer = require('lebab').Transformer;
const transformer = new Transformer({
  // 'class': true,
  // 'arg-spread': true,
  arrow: true,
  commonjs: true,
  let: true,
  template: true,
  'default-param': true,
  'no-strict': true,
  'obj-method': true,
  'obj-shorthand': true
});

function toES6() {
  return through.obj(function render(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('commonjs2es6', 'Streaming not supported'));
    }

    try {
      gutil.log(file.path);
      const content = transformer.run(file.contents.toString('utf8'));
      file.contents = new Buffer(content);
    } catch (err) {
      this.emit('error', new gutil.PluginError('commonjs2es6', err.toString()));
    }

    this.push(file);
    return cb();
  });
}

// 这个脚本不能多次执行，因此在临时文件夹内进行
gulp.task(
  'commonjs2es6',
  () => gulp.src(path.resolve(__dirname, '../temp/commonjs/**/*.js'))
    .pipe(plumber())
    .pipe(toES6())
    .on('error', (err) => {
      gutil.log(gutil.colors.red(err.message));
    })
    .pipe(gulp.dest(path.resolve(__dirname, '../temp/es6/')))
);
