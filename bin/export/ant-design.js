#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const path = require('path');
const exportSvgIcons = require('../../lib/export-svg-icons');
const icons = require('../../dist/data/ant-design.json');
const pkg = require('../../package.json');

const DEFAULT_OUTPUT = path.resolve(__dirname, '../../temp/ant-design.zip');

commander
  .version(pkg.version)
  .option('-o, --output [output]', 'output filename', DEFAULT_OUTPUT)
  .parse(process.argv);

const output = commander.output;
exportSvgIcons(icons, {
  prefix: 'antd-'
}, (zip) => {
  zip
    .generateNodeStream({type: 'nodebuffer', streamFiles: true})
    .pipe(fs.createWriteStream(output))
    .on('finish', () => {
      console.log(`${output} written.`)
    });
});
