'use strict';
const fs = require('fs');
const lang = require('zero-lang');
const path = require('path');
const shelljs = require('shelljs');
const SVGO = require('svgo');
const svgo = new SVGO();

function getPadding(size, addPadding, PIXEL) {
  let padding = 0;

  if (addPadding && size) {
    const pad = parseInt(size / 14) * 14;
    padding = ((size - pad) / 2) * (PIXEL / 2);
  }

  return padding;
}

function getSvgStr(params, size, PIXEL, callback) {
  const padding = getPadding(size, params.addPadding);

  params = lang.extend({}, params, {
    shiftX: -(-(14 * PIXEL - params.advWidth) / 2 - padding),
    shiftY: -(-2 * PIXEL - padding),
    width: Math.round(14 * PIXEL + 2 * padding),
    height: Math.round(14 * PIXEL + 2 * padding)
  });

  const svgStr = `<svg viewBox="0 0 ${params.width} ${params.height}" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(${params.shiftX} ${params.shiftY})">
    <g transform="scale(1 -1) translate(0 -${10 * PIXEL})">
    <path d="${params.d}"/>
    </g></g>
    </svg>`
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><');
  svgo.optimize(svgStr, function (result) {
    callback(result.data);
  });
}

module.exports = (fonts, target, WIDTH) => {
  // generate separated svg icons
  shelljs.mkdir('-p', target);
  // cannot yield inside a callback function, so use for... instead of forEach
  lang.each(fonts, (icon) => {
    const svgFilePath = path.resolve(target, `./${icon.id}.svg`);
    const advWidth = icon['horiz-adv-x'] || WIDTH;
    const pixelWidth = advWidth > WIDTH ? advWidth / 12 : WIDTH / 12;
    console.log(`[writing...] ${svgFilePath}`);
    getSvgStr(lang.extend({
      advWidth
    }, icon), null, pixelWidth, (result) => {
      fs.writeFile(svgFilePath, result, 'utf8', (err) => {
        if (err) {
          console.log(`[ERROR]: ${err}`);
        }
      });
    });
  });
};

