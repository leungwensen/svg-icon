/*
 * a WebFonts(SVGFonts) parser
 * input is content of a typical WebFonts file (e.g. https://github.com/FortAwesome/Font-Awesome/blob/master/fonts/fontawesome-webfont.svg)
 * output is an array of SVG icons info (trimmed svg icons)
 */
const path = require('path');
const XMLLite = require('xml-lite');
const lang = require('zero-lang');
const trimSVG = require('./trim-svg');
const getIconData = require('./get-icon-data');
// template
const tplSvgUpsideDown = require('./template/svg-upside-down');

module.exports = (svgFonts, options, callback) => {
  const icons = [];
  const svgFontsDom = XMLLite.parse(svgFonts);
  const fontObj = XMLLite.dom2js(XMLLite.findNode(svgFontsDom, {
    tagName: 'font',
  }));
  const glyphObjs = [];

  function processNext() {
    // FIXME assume that these glyphs are simple, which contains only paths
    if (glyphObjs.length) {
      const glyphObj = glyphObjs.shift();
      const attrs = glyphObj.attributes;
      const svg = tplSvgUpsideDown({
        content: `<path d="${attrs.d}"/>`
      });
      const extraInfo = {};
      if (attrs.unicode) {
        extraInfo.unicode = attrs.unicode;
      }
      if (attrs['glyph-name']) {
        extraInfo.name = attrs['glyph-name'];
      }
      if (glyphObj.tag === 'missing-glyph') {
        extraInfo.missing = true;
      }

      console.log(`icon extracting: ${JSON.stringify(extraInfo)}...`);
      trimSVG(svg, (trimmedSvg) => {
        icons.push(getIconData(trimmedSvg, extraInfo));
        console.log(`icon extracted: ${JSON.stringify(extraInfo)}`);
        processNext();
      }, options.svgoInit, options.svgoFinal);
    } else {
      callback(icons);
    }
  }

  lang.each(fontObj.children, (child) => {
    const attrs = child.attributes;
    if (attrs && attrs.d) {
      glyphObjs.push(child);
    }
  });
  processNext();
};
