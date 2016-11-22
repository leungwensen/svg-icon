/*
 * SVG to data
 */
const XMLLite = require('xml-lite');
const lang = require('zero-lang');

module.exports = (svg, extraInfo) => {
  const meta = {};
  lang.extend(meta, extraInfo);
  if (svg) {
    const doc = XMLLite.parse(svg).documentElement;
    meta.viewBox = doc.getAttribute('viewBox');
    meta.body = XMLLite.getInnerXML(doc);
  }
  return meta;
};
