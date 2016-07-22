'use strict';
const co = require('co');
const fs = require('fs');
const lang = require('zero-lang');
const path = require('path');
const request = require('co-request');
const shelljs = require('shelljs');
const thunkify = require('thunkify');
const xml2js = require('xml2js');

const generateSvg = require('../util/generate-svg');

const parseXml = thunkify(xml2js.parseString);
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);

module.exports = (source, target/* , options */) => {
  // source here is an svg file
  co(function *() {
      // get font data
      const themeLessPath = path.resolve(source, './components/style/themes/default.less');
      const themeLessContent = yield readFile(themeLessPath, 'utf8');
      const iconUrl = themeLessContent.match(/@icon\-url\s*:\s*"(\S+)"/)[1];
      const svgResponse = yield request(`${iconUrl}.svg`);
      const svgContent = svgResponse.body;
      const parsedSvg = yield parseXml(svgContent);
      const glyphs = parsedSvg.svg.defs[0].font[0].glyph;
      const fontData = {};
      lang.each(glyphs, glyph => {
        if (glyph.$.unicode) {
          fontData[glyph.$.unicode.charCodeAt(0)] = glyph.$;
        }
      });
      //console.log(fontData);

      // get font list from `./components/style/core/iconfont.less`
      const lessPath = path.resolve(source, './components/style/core/iconfont.less');
      const lessContent = yield readFile(lessPath, 'utf8');
      const iconList = [];
      lang.each(lessContent.split(/\n/), line => {
        if (!line) return;

        const match = /.@\{iconfont-css-prefix\}-([^:]+):before\s*\{content:"\\([0-9a-f]+)";\}/.exec(line);
        if (match) {
          const unicodeHex = match[2];
          const unicodeDec = parseInt(unicodeHex, 16);
          iconList.push(lang.extend({
              id: match[1],
              unicodeDec,
              unicodeHex,
            }, fontData[unicodeDec])
          );
        } else {
          console.log(line);
        }
      });
      //console.log(iconList);

      generateSvg(iconList, target, 1024);
    }
  );
};
