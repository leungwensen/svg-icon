#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const lang = require('zero-lang');
const iconsMetaByPrefix = require('../lib/const/icons-meta-by-prefix');
const trimSvg = require('../lib/util/trim-svg');

const argv = process.argv;

function trimming(pathnames, prefixName, index, finalCall) {
  if (pathnames[index]) {
    console.log(pathnames[index]);
    trimSvg(pathnames[index], prefixName, true, () => {
      index++;
      trimming(pathnames, prefixName, index)
    });
  } else {
    finalCall();
  }
}

function trimSvgIcons(meta, callback) {
  const prefixName = meta.prefix.replace(/-$/, '');
  const svgRoot = path.resolve(__dirname, `../dist/svg/${prefixName}/`);
  console.log(`trimming ${prefixName}`);
  fs.readdir(svgRoot, (err, files) => {
    //trimSvg(path.join(svgRoot, files[0]), prefixName, true, () => {});
    files = lang.map(files, (file) => path.join(svgRoot, file));
    console.log(prefixName);
    trimming(files, prefixName, 0, callback);
  });
}

function trimFlow(metas, index) {
  if (metas[index]) {
    trimSvgIcons(metas[index], () => {
      index++;
      trimFlow(metas, index);
    });
  }
}

if (argv.length === 3) {
  const prefix = `${argv[2]}-`;
  if (iconsMetaByPrefix[prefix]) {
    trimSvgIcons(iconsMetaByPrefix[prefix]);
  } else if (prefix === 'zero-') {
    trimSvgIcons({
      prefix: 'zero-'
    });
  } else {
    console.error(`"${prefix}" icons is not supported!`);
  }
} else {
  const metas = lang.values(iconsMetaByPrefix);
  trimFlow(metas, 0);
  //lang.each(metas, trimSvgIcons);
}
