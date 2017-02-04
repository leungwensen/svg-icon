#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const extractSvgFiles = require('../../lib/extract-svg-files');
const filterIcons = require('../../lib/filter-icons');

const DEFAULT_OUTPUT = path.resolve(__dirname, '../../dist/data/zero.json');
const DIRNAME = path.resolve(__dirname, '../src/zero');

commander
  .version(pkg.version)
  .option('-o, --output [output]', 'output filename', DEFAULT_OUTPUT)
  .parse(process.argv);

extractSvgFiles(DIRNAME, {}, (result) => {
  fs.writeFile(commander.output, JSON.stringify(filterIcons(result), null, '\t'), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${commander.output} written!`);
    }
  });
});

