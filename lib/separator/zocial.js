'use strict';
const co = require('co');
const fs = require('fs');
const lang = require('zero-lang');
const path = require('path');
const shelljs = require('shelljs');
const thunkify = require('thunkify');
const xml2js = require('xml2js');

const generateSvg = require('../util/generate-svg');

const parseXml = thunkify(xml2js.parseString);
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);

module.exports = (source, target/* , options */) => {
  // source here is the root directory of Font-Awesome project
  co(function *() {
      // get font data from `fonts/fontawesome-webfont.svg`
      const fontPath = path.resolve(source, './css/zocial.svg');
      const svgContent = yield readFile(fontPath, 'utf8');
      const parsedSvg = yield parseXml(svgContent);
      const glyphs = parsedSvg.svg.defs[0].font[0].glyph;
      const fontData = {};
      lang.each(glyphs, glyph => {
        if (glyph.$.unicode) {
          fontData[glyph.$.unicode.charCodeAt(0)] = glyph.$;
        }
      });
      //console.log(fontData);

      // get font list from `./less/variables.less`
      const lessPath = path.resolve(source, './css/zocial.css');
      const lessContent = yield readFile(lessPath, 'utf8');
      const iconList = [];
      const matchedHexes = [];
      lang.each(lessContent.split(/\n/), line => {
        if (!line) return;

        const match = /\.zocial\.([^:]+):[^"]+"\\([0-9a-f]+)";/.exec(line);
        if (match) {
          const unicodeHex = match[2];
          const unicodeDec = parseInt(unicodeHex, 16);
          if (!lang.contains(matchedHexes, unicodeHex)) {
            matchedHexes.push(unicodeHex);
            iconList.push(lang.extend({
                id: match[1],
                unicodeDec,
                unicodeHex,
              }, fontData[unicodeDec])
            );
          }
        } else {
          //console.log(line);
        }
      });
      //console.log(iconList);

      generateSvg(iconList, target, 512);
    }
  );
};
