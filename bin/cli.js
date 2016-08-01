#!/usr/bin/env node
'use strict';
const path = require('path');
const lang = require('zero-lang');
const commander = require('commander');

const pkg = require(path.resolve(__dirname, '../package.json'));

function list(val) {
  return lang.map(val.split(','), (item) => lang.trim(item));
}

// version
commander.version(pkg.version);

// help
commander.on('--help', () => {
  console.log('  Examples:');
  console.log('');
  console.log('    $ svg-icon separate --format font-awesome --output ~/temp/font-awesome input.svg');
  console.log('    $ svg-icon separate --f font-awesome --o ~/temp/font-awesome input.svg');
  console.log('    $ svg-icon --help');
  console.log('    $ svg-icon -h');
  console.log('    $ svg-icon --version');
  console.log('    $ svg-icon -V');
  console.log('');
});

// svg-icon separate
commander.command('separate [sources...]')
  .description('separate icons into individual SVG files')
  .option('-s, --separator <separator>', 'specify a separator for the source svg icons')
  .option('-o, --output <output>', 'specify the output path of the separated svg icons')
  .action((sources, options) => {
    options.separator = options.separator || 'font-awesome';
    options.ouput = options.output || `./dist/svg/${options.separator}`;
    require('../lib/separate.js')(sources, options);
  });

// svg-icon separate
commander.command('iconize [sources...]')
  .description('fill icon placeholders with real SVG icon construct')
  .option('-e, --exts <exts>', 'specify the extension of file to be iconized', list)
  .action((sources, options) => {
    options.exts = options.exts || [
        '.html'
      ];
    require('../lib/iconize.js')(sources, options);
  });

// svg-icon build
commander.command('build')
  .description('build a svg icons collection from a json file and output into a target path')
  .option('-s, --source <source>', 'specify the source file to be built')
  .option('-t, --target <target>', 'specify the target path for built icons')
  .option('-n, --name <name>', 'specify the collection name')
  .action((options) => {
    options.target = options.target || process.cwd();
    options.name = options.name || 'si-collection';
    require('../lib/build.js')(options);
  });

// parsing argv
commander.parse(process.argv);
if (process.argv.length === 2) {
  commander.outputHelp();
}
