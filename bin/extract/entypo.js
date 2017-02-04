#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const lang = require('zero-lang');
const path = require('path');
const request = require('request');
const pkg = require('../../package.json');
const extractSvgFonts = require('../../lib/extract-svg-fonts');
const filterIcons = require('../../lib/filter-icons');

const URL_ICON_CSS = 'https://raw.githubusercontent.com/danielbruce/entypo/master/font/entypo.css';
const URL_SVG_FONTS = 'https://raw.githubusercontent.com/danielbruce/entypo/master/font/entypo.svg';
const DEFAULT_OUTPUT = path.resolve(__dirname, '../../dist/data/entypo.json');

function extractIcons(options) {
  // less file for icon fonts
  request(URL_ICON_CSS, (iconLessErr, iconLessRes, iconLessBody) => {
    if (!iconLessErr && iconLessRes.statusCode === 200) {
      // icon list
      const iconNameByDec = {};
      lang.each(iconLessBody.split(/\n/), (line) => {
        line = lang.trim(line);
        if (!line) {
          return;
        }
        // icon font pattern
        // .icon-note:before { content: "\266a"; } /* '\266a' */
        const match = /\.icon-([^\s:]+)\s*:before\s*\{\s*content\s*:\s*"\\([0-9a-f]+)"\s*;/.exec(line);
        if (match) {
          const name = match[1];
          const unicodeHex = match[2];
          const unicodeDec = parseInt(unicodeHex, 16);
          iconNameByDec[unicodeDec] = name;
        }
      });

      // svg fonts file
      request(URL_SVG_FONTS, (svgFontsErr, svgFontsRes, svgFontsBody) => {
        if (!svgFontsErr && svgFontsRes.statusCode === 200) {
          extractSvgFonts(svgFontsBody, {}, (icons) => {
            lang.each(icons, (icon) => {
              if (icon.unicode) {
                const dec = icon.unicode.charCodeAt(0);
                icon.name = iconNameByDec[dec] || '';
              }
            });
            fs.writeFile(
              options.output,
              JSON.stringify(filterIcons(icons), null, '\t'),
              'utf8',
              (err) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          });
        } else {
          console.error(svgFontsErr, svgFontsRes);
        }
      });
    } else {
      console.error(iconLessErr, iconLessRes);
    }
  })
}

commander
  .version(pkg.version)
  .option('-o, --output [output]', 'output filename', DEFAULT_OUTPUT)
  .parse(process.argv);

extractIcons(commander);
