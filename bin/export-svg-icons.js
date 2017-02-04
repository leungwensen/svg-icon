#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const path = require('path');
const unzip = require('unzip2');
const shelljs = require('shelljs');
const fstream = require('fstream');
const exportSvgIcons = require('../lib/export-svg-icons');
const pkg = require('../package.json');

const DEFAULT_OUTPUT = path.resolve(__dirname, '../temp/zero.zip');
const DEFAULT_INPUT = path.resolve(__dirname, '../dist/data/zero.json');
const DEFAULT_PREFIX = 'svg-icon-';

commander
  .version(pkg.version)
  .option('-i, --input [input]', 'input icons filename', DEFAULT_INPUT)
  .option('-o, --output [output]', 'output filename', DEFAULT_OUTPUT)
  .option('-p, --prefix [prefix]', 'prefix', DEFAULT_PREFIX)
  .option('--unzip', 'unzip icon pack')
  .parse(process.argv);

const output = commander.output;
const input = commander.input;

fs.readFile(input, 'utf8', (err, content) => {
  if (err) {
    console.error(err);
  } else {
    const icons = JSON.parse(content);
    exportSvgIcons(icons, {
      prefix: commander.prefix,
    }, (zip) => {
      // make sure we can write into the output file
      shelljs.mkdir('-p', path.dirname(output));
      zip
        .generateNodeStream({type: 'nodebuffer', streamFiles: true})
        .pipe(fs.createWriteStream(output))
        .on('finish', () => {
          console.log(`${output} written.`)
          if (commander.unzip) {
            const unzipOuput = output.replace(/\.zip\s*$/, '');
            // make sure the extracting path exist and empty
            shelljs.rm('-rf', unzipOuput);
            shelljs.mkdir('-p', unzipOuput);
            const readStream = fs.createReadStream(output);
            const writeStream = fstream.Writer(unzipOuput);
            readStream
              .pipe(unzip.Parse())
              .pipe(writeStream);
          }
        });
    });
  }
});
