'use strict';
const fs = require('fs');
const gulp = require('gulp');
const lang = require('zero-lang');
const path = require('path');
const yaml = require('js-yaml');
const config = require('./config');

lang.each(config.svgSpriteDirs, (dir) => {
  gulp.task(`meta-data-${dir}`, () => {
    const targetFile = path.resolve(__dirname, `../dist/meta/${dir}.yml`);
    fs.readdir(path.resolve(__dirname, `../dist/trimmed-svg/${dir}`), (err, files) => {
      if (err) throw err;
      const meta = {};
      lang.each(files, (file) => {
        if (file.match(/.svg$/)) {
          const basename = path.basename(file, '.svg');
          let title = `icon ${basename}`;
          switch (true) {
            case dir === 'flag':
              title = `flag of ${basename}`;
              break;
            case dir === 'logos' || dir === 'simple' || dir === 'payment' || dir === 'payment-web':
              title = `logo of ${basename}`;
              break;
            case 'weather':
              title = `weather ${basename}`;
              break;
            default:
              break;
          }
          meta[`si-${dir}-${basename}`] = {
            title,
          };
        }
      });
      fs.writeFileSync(targetFile, yaml.dump(meta), 'utf8');
    });
  });
});

gulp.task('meta-data', lang.map(config.svgSpriteDirs, (dir) => `meta-data-${dir}`));
