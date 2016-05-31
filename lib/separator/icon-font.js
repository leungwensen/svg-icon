'use strict';
const fs = require('fs');
const path = require('path');

const _ = require('underscore');
const co = require('co');
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
      // get font data from `fonts/fontawesome-webfont.svg`
      const svgContent = yield readFile(source, 'utf8');
      const parsedSvg = yield parseXml(svgContent);
      const glyphs = parsedSvg.svg.defs[0].font[0].glyph;
      const fonts = _.map(glyphs, glyph => {
        return _.extend({
          id: glyph.$['glyph-name']
        }, glyph.$);
      });

      generateSvg(fonts, target, 1024);
    }
  );
};
