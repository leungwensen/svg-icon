#!/usr/bin/env node
const SVGO = require('svgo');
const commander = require('commander');
const fs = require('fs');
const pkg = require('../package.json');
const trimSVG = require('../lib/trim-svg');

commander
  .version(pkg.version)
  .arguments('<file>')
  .action((file) => {
    if (file) {
      trimSVG(
        fs.readFileSync(file, 'utf8'),
        (result) => {
          console.log(result);
        }
        // , new SVGO({
        //   plugins: [
        //     {
        //       removeAttrs: {
        //         attrs: [
        //           'baseProfile',
        //           'class',
        //           'data-name',
        //           'svg:height',
        //           'svg:id',
        //           'svg:viewBox',
        //           'svg:width',
        //           'g:fill',
        //           'g:fill-rule',
        //           'svg:fill',
        //           'svgg:fill-rule',
        //           // 'fill',
        //           // 'fill-rule',
        //         ]
        //       }
        //     },
        //   ]
        // })
        // , new SVGO({
        //   plugins: [
        //     {
        //       removeXMLNS: true,
        //     },
        //     {
        //       removeEditorsNSData: true
        //     },
        //     {
        //       removeEmptyAttrs: true
        //     },
        //     {
        //       removeEmptyContainers: true
        //     },
        //     {
        //       removeEmptyText: true
        //     },
        //     {
        //       removeHiddenElems: true
        //     },
        //     {
        //       removeStyleElement: true
        //     },
        //     {
        //       removeTitle: true
        //     },
        //     {
        //       removeUselessDefs: true
        //     },
        //     {
        //       sortAttrs: true
        //     },
        //   ]
        // })
      );
    }
  }).parse(process.argv);

if (process.argv.length === 2) {
  commander.outputHelp();
}
