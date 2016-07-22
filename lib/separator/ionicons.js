'use strict';
const path = require('path');
const mapStream = require('map-stream');
const SVGO = require('svgo');
const vfs = require('vinyl-fs');

const svgo = new SVGO({
  plugins: [
    {
      removeAttrs: {
        attrs: [
          'class',
          'data-name',
          'fill',
          'fill-rule',
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
});

function cleanAttrs(file, cb) {
  svgo.optimize(String(file.contents), result => {
    if (result.error) {
      return cb(new Error(result.error));
    }
    file.contents = new Buffer(result.data);
    cb(null, file);
  });
}

module.exports = (source, target/* , options */) => {
  // location: ${source}/src/*.svg
  console.log(target);
  vfs.src('*.svg', {
    cwd: path.resolve(source, './src/'),
    cwdbase: true,
    dot: true
  })
    .pipe(mapStream(cleanAttrs))
    .pipe(vfs.dest(target));
};
