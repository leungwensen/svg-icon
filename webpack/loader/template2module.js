const lang = require('zero-lang');
const loaderUtils = require('loader-utils');
const template2module = require('../../common/template2module');

module.exports = function (source) {
  const loaderContext = this;
  if (loaderContext.cacheable) {
    loaderContext.cacheable();
  }
  return template2module(source, loaderContext.resourcePath);
};
