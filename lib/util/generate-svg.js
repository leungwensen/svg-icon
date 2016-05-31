'use strict';

const _ = require('underscore');

function getPadding(size, addPadding, PIXEL) {
  let padding = 0;

  if (addPadding && size) {
    const pad = parseInt(size / 14) * 14;
    padding = ((size - pad) / 2) * (PIXEL / 2);
  }

  return padding;
}

module.exports = (params, size, PIXEL) => {
  const padding = getPadding(size, params.addPadding);

  params = _.extend({}, params, {
    shiftX: -(-(14 * PIXEL - params.advWidth) / 2 - padding),
    shiftY: -(-2 * PIXEL - padding),
    width: 14 * PIXEL + 2 * padding,
    height: 14 * PIXEL + 2 * padding
  });

  return `<svg viewBox="0 0 ${params.width} ${params.height}"
    xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(${params.shiftX} ${params.shiftY})">
    <g transform="scale(1 -1) translate(0 -${10 * PIXEL})">
    <path d="${params.d}"/>
    </g></g>
    </svg>`
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><');
};

