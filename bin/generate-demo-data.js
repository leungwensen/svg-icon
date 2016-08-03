#!/usr/bin/env node
'use strict';
const fs = require('fs');
const lang = require('zero-lang');
const mapStream = require('map-stream');
const path = require('path');
const vfs = require('vinyl-fs');
const iconsMeta = require('../lib/const/icons-meta');

const icons = {};

lang.each(iconsMeta, meta => {
  icons[meta.prefix.replace(/\-$/, '')] = meta;
});

icons.zero = {
  name: 'zero',
  prefix: 'zero-'
};

function reduceIcons(file, cb) { // removing prefix in filename
  const arr = file.path.split(path.sep);
  const len = arr.length;
  const type = arr[len - 2];
  const name = arr[len - 1].replace(/\.svg$/, '');
  icons[type] = icons[type] || {};
  icons[type].icons = icons[type].icons || [];
  icons[type].icons.push(name);
  cb(null, file);
}

vfs.src(path.resolve(process.cwd(), './dist/trimmed-svg/**/*.svg'))
  .pipe(mapStream(reduceIcons))
  .on('end', () => {
    const iconsFilePath = path.resolve(process.cwd(), './src/data/icons.json');
    console.log(`[writting...] ${iconsFilePath}`);
    fs.writeFile(iconsFilePath, JSON.stringify(icons), 'utf8', (err) => {
      if (err) throw err;
      console.log(`[written] ${iconsFilePath}`);
    });
  });
