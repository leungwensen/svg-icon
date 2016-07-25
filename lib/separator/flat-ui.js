'use strict';
const co = require('co');
const fs = require('fs');
const lang = require('zero-lang');
const mapStream = require('map-stream');
const path = require('path');
const shelljs = require('shelljs');
const thunkify = require('thunkify');
const vfs = require('vinyl-fs');
const xml2js = require('xml2js');

const generateSvg = require('../util/generate-svg');

const parseXml = thunkify(xml2js.parseString);
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);


function log(file, cb) { // logging
  console.log(`[copying...] ${file.path}`);
  cb(null, file);
}

module.exports = (source, target/* , options */) => {
  // location: ${source}/assets/icons/
  vfs.src('*.svg', {
    cwd: path.resolve(source, './img/icons/svg/'),
    cwdbase: true,
    dot: true
  })
    .pipe(mapStream(log))
    .pipe(vfs.dest(target));

  co(function *() {
      // get font data from `dist/fonts/glyphicons/flat-ui-icons-regular.svg`
      const fontPath = path.resolve(source, './dist/fonts/glyphicons/flat-ui-icons-regular.svg');
      const svgContent = yield readFile(fontPath, 'utf8');
      const parsedSvg = yield parseXml(svgContent);
      const glyphs = parsedSvg.svg.defs[0].font[0].glyph;
      const fontData = {};
      lang.each(glyphs, glyph => {
        fontData[glyph.$.unicode.charCodeAt(0)] = glyph.$;
      });
      //console.log(fontData);

      // get font list from `./less/variables.less`
      const lessPath = path.resolve(source, './dist/css/flat-ui.css');
      const lessContent = yield readFile(lessPath, 'utf8');
      const iconList = [];
      const matchedHexes = [];
      const matched = lessContent.match(/\.fui-([^:]+):before[^"]+"\\([0-9a-f]+)"/g);
      lang.each(matched, line => {
        if (!line) return;

        const match = /\.fui-([^:]+):before[^"]+"\\([0-9a-f]+)"/.exec(line);
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
          console.log(line);
        }
      });
      //console.log(iconList);

      generateSvg(iconList, target, 1024);
    }
  );
};
