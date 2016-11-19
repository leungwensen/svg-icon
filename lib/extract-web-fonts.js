/*
 * a WebFonts(SVGFonts) parser
 * input is content of a typical WebFonts file (check out ../spec/fixtures/web-fonts)
 * output is a js object of SVG icons info
 */
const XMLLite = require('xml-lite');
const lang = require('zero-lang');
// const trimSVG = require('./trim-svg');

module.exports = (webFonts, callback) => {
  // const metaJSON = {};
  // dom
  const webFontsDom = XMLLite.parse(webFonts);
  const fontObj = XMLLite.dom2js(XMLLite.findNode(webFontsDom, {
    tagName: 'font',
  }));
  let fontFaceObj, defaultGlyphObj;
  const glyphObjs = [];
  const svgIconByName = {};

  lang.each(fontObj.children, (child) => {
    if (child.tag === 'font-face') {
      defaultGlyphObj = child;
    } else if (child.tag === 'missing-glyph') {
      defaultGlyphObj = child;
    } else if (child.tag === 'glyph') {
      glyphObjs.push(child);
    }
  });
  callback();
};
