'use strict';
const lang = require('zero-lang');
const iconsMeta = require('./icons-meta');

const result = {};

lang.each(iconsMeta, meta => {
  result[meta.prefix] = meta;
});

module.exports = result;
