#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const pkg = require('../package.json');
const webFontsExtractor = require('../lib/extract-web-fonts');

commander
  .version(pkg.version)
  .arguments('<file>')
  .action((file) => {
    if (file) {
      webFontsExtractor(fs.readFileSync(file, 'utf8'), (result) => {
        console.log(result);
      });
    }
  });

commander.parse(process.argv);

if (process.argv.length === 2) {
  commander.outputHelp();
}
