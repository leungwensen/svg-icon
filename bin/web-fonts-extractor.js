#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const pkg = require('../package.json');
const webFontsExtractor = require('../lib/extractor/web-fonts');

commander
  .version(pkg.version)
  .arguments('<file>')
  .action((file) => {
    if (file) {
      console.log(webFontsExtractor(fs.readFileSync(file, 'utf8')));
    }
  });

commander.parse(process.argv);

if (process.argv.length === 2) {
  commander.outputHelp();
}
