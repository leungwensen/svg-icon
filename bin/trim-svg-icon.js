#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const lang = require('zero-lang');
const trimSvg = require('../lib/util/trim-svg');

const argv = process.argv;

if (argv.length === 3) {
  let basename = argv[2];
  if (!/\.svg$/.test(basename)) basename += '.svg';

  const type = basename.split('/')[0];

  trimSvg(path.join(path.resolve(__dirname, '../dist/svg'), basename), type, true, () => {});
}
