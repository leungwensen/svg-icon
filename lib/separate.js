'use strict';

const lang = require('zero-lang');
const path = require('path');

module.exports = (sources, options) => {
  const separator = require(`./separator/${options.separator}`);
  const cwd = process.cwd();
  const target = path.resolve(cwd, options.ouput);
  lang.each(sources, (source) => {
    separator(path.resolve(cwd, source), target, options);
  });
};

