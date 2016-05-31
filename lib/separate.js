'use strict';

const path = require('path');

const _ = require('underscore');

module.exports = (sources, options) => {
  const separator = require(`./separator/${options.format}`);
  const cwd = process.cwd();
  const target = path.resolve(cwd, options.ouput);
  _.each(sources, (source) => {
    separator(path.resolve(cwd, source), target, options);
  });
};

