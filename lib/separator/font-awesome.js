'use strict';
const fs = require('fs');
const path = require('path');

const _ = require('underscore');
const co = require('co');
const shelljs = require('shelljs');
const thunkify = require('thunkify');
const xml2js = require('xml2js');

const parseXml = thunkify(xml2js.parseString);
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);

module.exports = (source, target/* , options */) => {
  co(function *() {
      // get font data from `fonts/fontawesome-webfont.svg`
      const fontPath = path.resolve(source, './fonts/fontawesome-webfont.svg');
      const svgContent = yield readFile(fontPath, 'utf8');
      const parsedSvg = yield parseXml(svgContent);
      const glyphs = parsedSvg.svg.defs[0].font[0].glyph;
      const fontData = {};
      _.each(glyphs, glyph => {
        fontData[glyph.$.unicode.charCodeAt(0)] = glyph.$;
      });
      //console.log(fontData);

      // get font list from `./less/variables.less`
      const lessPath = path.resolve(source, './less/variables.less');
      const lessContent = yield readFile(lessPath, 'utf8');
      const iconList = [];
      const LESS_VAR_REGEXP = /@fa-var-([\w-]+):\s*"\\([0-9a-f]+)";/g;
      _.each(lessContent.split(/\n/), line => {
        if (!line) {
          return;
        }
        const match = LESS_VAR_REGEXP.exec(line);
        if (match) {
          const unicodeHex = match[2];
          const unicodeDec = parseInt(unicodeHex, 16);
          iconList.push(_.extend({
              id: match[1],
              unicodeDec,
              unicodeHex,
            }, fontData[unicodeDec])
          );
        }
      });

      // generate separated svg icons
      shelljs.mkdir('-p', target);
      const WIDTH = 64;
      const HEIGHT = 64;
      // cannot yield inside a callback function, so use for... instead of forEach
      for (let i = 0; i < iconList.length; i++) {
        const icon = iconList[i];
        const svgFilePath = path.resolve(target, `./${icon.id}.svg`);
        console.log(`[writing...] ${svgFilePath}`);
        yield writeFile(
          svgFilePath,
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}"><path d="${icon.d}"/></svg>`,
          'utf8'
        );
      }
      console.log('[done separating font-awesome icons]');
    }
  );
};
