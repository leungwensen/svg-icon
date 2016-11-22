#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const pkg = require('../package.json');
const extractSvgFonts = require('../lib/extract-svg-fonts');

commander
  .version(pkg.version)
  .arguments('<file>')
  .action((file) => {
    if (file) {
      extractSvgFonts(fs.readFileSync(file, 'utf8'), (result) => {
        console.log(result);
      });
    }
  }).parse(process.argv);

if (process.argv.length === 2) {
  commander.outputHelp();
}
