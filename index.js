#!/usr/bin/env node

const path = require('path');

const _ = require('underscore');
const commander = require('commander');

const pkg = require(path.resolve(__dirname, './package.json'));

commander
  .version(pkg.version)
  .command('separate [sources...]')
  .description('create a new zero project')
  .option('-f, --format <format>', 'specify the format of the source svg icon')
  .option('-o, --output <output>', 'specify the output path of the separated svg icons')
  .action((sources, options) => {
    options.format = options.format || 'font-awesome';
    options.ouput = options.output || `./svg-icons/${options.format}`;
    require('./lib/separate.js')(sources, options);
  });

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

commander.parse(process.argv);

if (process.argv.length === 2) {
  commander.outputHelp();
}

