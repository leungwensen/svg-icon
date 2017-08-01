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
const collectionTemplate = require('./template/collection');
const svgSpriteTemplate = require('./template/svg-sprite');

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
  const targetSvgPath = path.join(targetPath, './svg');
  shelljs.mkdir('-p', targetSvgPath);

  lang.forIn(iconMap, (partPathname, key) => {
    const svgPathname = /^\./.test(partPathname) ? path.join(process.cwd(), path.dirname(options.source), `${partPathname}.svg`) : path.join(__dirname, `../dist/trimmed-svg/${partPathname}.svg`);
    shelljs.cp(svgPathname, targetSvgPath);
    const svgContent = fs.readFileSync(svgPathname, 'utf8');
    const id = `${options.name}-${key}`;
    ids.push(id);
    symbols.push(svg2symbol(svgContent, id));
  });

  const svgSprite = svgSpriteTemplate({
    symbols,
  });

  fs.writeFileSync(path.join(targetPath, 'svg-symbols.svg'), svgSprite, 'utf8');
  fs.writeFileSync(path.join(targetPath, 'index.html'), collectionTemplate({
    svgSprite,
    ids,
  }), 'utf8');
};
