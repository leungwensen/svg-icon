/*
 * a WebFonts(SVGFonts) parser
 * input is content of a typical WebFonts file
 * output is a js object of SVG icons info
 * @see: https://github.com/FortAwesome/Font-Awesome/blob/master/fonts/fontawesome-webfont.svg?short_path=855c845
 */
const XMLLite = require('xml-lite');

module.exports = (webFonts) => {
  // const metaJSON = {};
  // dom
  const webFontsDom = XMLLite.parse(webFonts);
  const fontElement = XMLLite.findNode(webFontsDom, {
    tagName: 'font'
  });
  return XMLLite.dom2js(fontElement);
};
