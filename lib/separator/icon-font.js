'use strict';
const co = require('co');
const fs = require('fs');
const lang = require('zero-lang');
const path = require('path');
const thunkify = require('thunkify');
const xml2js = require('xml2js');

const generateSvg = require('../util/generate-svg');

const parseXml = thunkify(xml2js.parseString);
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);

module.exports = (source, target/* , options */) => {
  // source here is an svg file
  co(
    function *() {
      // get font data from `${source}`
      const svgContent = yield readFile(source, 'utf8');
      const parsedSvg = yield parseXml(svgContent);
      const glyphs = parsedSvg.svg.defs[0].font[0].glyph;
      const fonts = lang.map(glyphs, glyph => {
        return lang.extend({
          id: glyph.$['glyph-name']
        }, glyph.$);
      });

      generateSvg(fonts, target, 1024);
    }
  );
};
