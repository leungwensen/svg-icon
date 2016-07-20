'use strict';
const fs = require('fs');
const path = require('path');
const lang = require('zero-lang');
const Minimize = require('minimize');
const minimize = new Minimize({cdata: true});

const iconsMetaByName = require('../const/icons-meta-by-name');
const svg2symbol = require('./svg2symbol');
const generateId = require('./generate-id');

module.exports = (metas, callback) => {
  const resultSymbols = [];
  lang.each(metas, meta => {
    /*
     * meta: {
     *   type: 'ant-design',
     *   name: 'appstore',
     *   prefix: 'anticon-',
     * }
     */
    const type = meta.type;
    const name = meta.name;
    const svgContent = fs.readFileSync(path.resolve(__dirname, `../../svg-icons/${type}/${name}.svg`), {
      encoding: 'utf8'
    });
    const id = generateId(meta);
    resultSymbols.push(svg2symbol(id, svgContent));
  });

  const svgStr = [
    '<svg xmlns="http://www.w3.org/2000/svg" id="svg-icon-sprite" style="display:none">',
    resultSymbols.join(''),
    '</svg>'
  ].join('');

  minimize.parse(svgStr, (error, data) => {
    callback(data);
  });
};
