#!/usr/bin/env node
const SVGO = require('svgo');
const commander = require('commander');
const lang = require('zero-lang');
const fs = require('fs');
const path = require('path');
const pkg = require('../../package.json');
const extractSvgFiles = require('../../lib/extract-svg-files');
const filterIcons = require('../../lib/filter-icons');
const svgoOptionRemoveAllFill = require('../svgo-option/remove-all-fill');
const svgoOptionCommon = require('../svgo-option/common');

const DEFAULT_OUTPUT = path.resolve(__dirname, '../../dist/data/zero.json');
const DIRNAME = path.resolve(__dirname, '../../src/zero');
const COMMON_ICONS = [
  'color',
  'font-color',
  'inner-join',
  'left-join',
  'map-bubble-hover',
  'map-bubble',
  'map-color-hover',
  'map-color',
];

const svgoCommon = new SVGO(svgoOptionCommon);
const svgoRemoveAllFill = new SVGO(svgoOptionRemoveAllFill);
const options = {
  svgoInit: svgoRemoveAllFill,
  svgoMap: {},
};

lang.each(COMMON_ICONS, (iconName) => {
  options.svgoMap[iconName] = {
    init: svgoCommon
  };
});

commander
  .version(pkg.version)
  .option('-o, --output [output]', 'output filename', DEFAULT_OUTPUT)
  .parse(process.argv);

extractSvgFiles(DIRNAME, options, (result) => {
  fs.writeFile(commander.output, JSON.stringify(filterIcons(result), null, '\t'), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${commander.output} written!`);
    }
  });
});

