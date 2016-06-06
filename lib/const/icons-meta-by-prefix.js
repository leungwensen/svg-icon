'use strict';
const _ = require('underscore');

const iconsMeta = require('./icons-meta');

const result = {};

_.each(iconsMeta, meta => {
  result[meta.prefix] = meta;
});

module.exports = result;
