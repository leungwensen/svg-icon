'use strict';
const fs = require('fs');
const path = require('path');

const _ = require('underscore');
const co = require('co');
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
      // get font data from `fonts/fontawesome-webfont.svg`
      const svgContent = yield readFile(source, 'utf8');
      const parsedSvg = yield parseXml(svgContent);
      const glyphs = parsedSvg.svg.defs[0].font[0].glyph;
      const fonts = _.map(glyphs, glyph => glyph.$);

      // generate separated svg icons
      shelljs.mkdir('-p', target);
      const WIDTH = 1024;
      // cannot yield inside a callback function, so use for... instead of forEach
      for (let i = 0; i < fonts.length; i++) {
        const icon = fonts[i];
        const svgFilePath = path.resolve(target, `./${icon['glyph-name']}.svg`);
        const advWidth = icon['horiz-adv-x'] || WIDTH;
        const pixelWidth = advWidth > WIDTH ? advWidth / 12 : WIDTH / 12;
        console.log(`[writing...] ${svgFilePath}`);
        yield writeFile(
          svgFilePath,
          generateSvg(_.extend({
            advWidth
          }, icon), null, pixelWidth),
          'utf8'
        );
      }
      console.log('[done separating icon-font icons]');
    }
  );
};
