#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const pkg = require('../package.json');
const extractSvgFiles = require('../lib/extract-svg-files');

commander
  .version(pkg.version)
  .arguments('<dirname>')
  .action((dirname) => {
    if (dirname) {
      extractSvgFiles(dirname, {}, (result) => {
        console.log(result);
      });
    }
  }).parse(process.argv);

if (process.argv.length === 2) {
  commander.outputHelp();
}
