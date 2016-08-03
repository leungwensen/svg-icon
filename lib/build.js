'use strict';
/**
 * build module
 * @module build
 * @see module:index
 */
const lang = require('zero-lang');
const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
const template = require('./template/collection');

function svg2symbol(svg, id) {
  try {
    svg = svg.replace(/\n/g, '').replace(/\r/g, '').replace(/>\s+</g, '><');
    const matched = /<svg([^>]+)>(.*)<\/svg>/.exec(svg);
    const attrs = lang.trim(matched[1].replace(/xmlns="[^"]+" /g, ''));
    const content = lang.trim(matched[2]);
    return `<symbol id="${id}" ${attrs}>${content}</symbol>`;
  } catch (err) {
    console.error(err);
    return '';
  }
}

module.exports = (options) => {
  const iconMap = require(path.resolve(process.cwd(), options.source));
  const symbols = [];
  const ids = [];
  const targetPath = path.join(options.target, options.name);
  shelljs.mkdir(targetPath);

  lang.forIn(iconMap, (partPathname, key) => {
    const svgPathname = path.join(__dirname, `../dist/trimmed-svg/${partPathname}.svg`);
    const svgContent = fs.readFileSync(svgPathname, 'utf8');
    const id = `si-${options.name}-${key}`;
    ids.push(id);
    symbols.push(svg2symbol(svgContent, id));
  });

  const svgSprite = `<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;">${symbols.join('')}</svg>`;

  fs.writeFileSync(path.join(targetPath, 'svg-symbols.svg'), svgSprite, 'utf8');
  fs.writeFileSync(path.join(targetPath, 'index.html'), template({
    svgSprite,
    ids,
  }), 'utf8');
};
