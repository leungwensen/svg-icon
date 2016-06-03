'use strict';
//FIXME
//TODO
// use xmldom to parse and serialize svg data

//const xmldom = require('xmldom');
//const domParser = new xmldom.DOMParser();
//const xmlSerializer = new xmldom.XMLSerializer();

module.exports = (id, svgStr) => {
  //const doc = domParser.parseFromString(svgStr);
  return svgStr
    .replace(/^<svg/, '<symbol')
    .replace(/\/svg>/, '/symbol>')
    .replace(/xmlns="[^"]*"/, `id="${id}"`);
};
