'use strict';
const lang = require('zero-lang');
const iconsMeta = require('./icons-meta');

const result = {};

lang.each(iconsMeta, meta => {
  result[meta.name] = meta;
});

module.exports = result;
