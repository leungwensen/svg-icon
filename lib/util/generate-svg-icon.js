'use strict';

const generateId = require('./generate-id');

module.exports = (meta) => {
  const id = generateId(meta);
  const icon = `<svg class="svg-icon"><use xlink:href="#${id}" /></svg>`;
  meta.class = meta.class || '';
  const classes = `svg-icon-wrapper ${id} ${meta.class}`.trim();
  return `<div class="${classes}">${icon}</div>`;
};
