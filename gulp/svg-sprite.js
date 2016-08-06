const gulp = require('gulp');
const gutil = require('gulp-util');
const lang = require('zero-lang');
const path = require('path');
const plumber = require('gulp-plumber');
const svgSprite = require('gulp-svg-sprite');
const through = require('through2');
const xmldom = require('xmldom');
const config = require('./config');

const domParser = new xmldom.DOMParser();

function reduceAttrs() {
  return through.obj(function render(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('svg-sprite', 'Streaming not supported'));
    }

    try {
      gutil.log(file.path);
      const doc = domParser.parseFromString(file.contents.toString('utf8'));
      const svgElement = doc.getElementsByTagName('svg')[0];
      svgElement.setAttribute('style', 'width:0;height:0;position:absolute;overflow:hidden;');
      svgElement.setAttribute('version', '1.1');
      const svgContent = doc.toString();
      file.contents = new Buffer(
        svgContent
          .replace(/(<svg[^>]*>)/, '$1<defs>')
          .replace(/(<\/svg>)$/, '</defs>$1')
      );
    } catch (err) {
      this.emit('error', new gutil.PluginError('svg-sprite', err.toString()));
    }

    this.push(file);
    return cb();
  });
}

lang.each(config.svgSpriteDirs, (dir) => {
  gulp.task(`svg-sprite-${dir}`, () =>
      gulp.src(path.resolve(__dirname, `../dist/trimmed-svg/${dir}/*.svg`))
        .pipe(plumber())
        .pipe(svgSprite({
          mode: {
            symbol: {
              dest: 'symbol',
              sprite: `${dir}.svg`,
            }
          },
          shape: {
            id: {
              generator(name) {
                name = name
                  .replace(/\.svg$/, '')
                  .replace(/\s/g, '');
                return `si-${dir}-${name}`;
              }
            },
            meta: path.resolve(__dirname, `../dist/meta/${dir}.yml`),
          },
          svg: {
            xmlDeclaration: true,
            doctypeDeclaration: true,
          }
        }))
        .pipe(reduceAttrs())
        .pipe(gulp.dest(path.resolve(__dirname, '../dist/sprite/')))
        .on('error', (err) => {
          gutil.log(gutil.colors.red(err.message));
        })
  );
});

gulp.task('svg-sprite', lang.map(config.svgSpriteDirs, (dir) => `svg-sprite-${dir}`));
