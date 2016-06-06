'use strict';
/*
 * iconize
 * <svg-icon type="ant-design" name="aliwangwang" class="self-define"></svg-icon>
 */
const iconsMetaByName = require('./const/icons-meta-by-name');
const generateSvgIcon = require('./util/generate-svg-icon');
const generateSvgSprite = require('./util/generate-svg-sprite');

const regexps = {
  icon: /<svg-icon\s+([-=\w\d'"\s]+)\s*\/?>(<\/svg-icon>)?/gi,
  attrs: /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/gi
};

function buildParamsFromString(string) {
  let match;
  let attr;
  let value;
  const params = {};

  while (match = regexps.attrs.exec(string)) {
    attr = match[1];
    value = match[2].replace(/'|"/, '');
    params[attr] = value;
  }
  params.type = params.type || 'font-awesome';
  params.prefix = params.prefix || iconsMetaByName[params.type].prefix;
  return params;
}

module.exports = (str, options, callback) => {
  const icons = [];
  let html = str.toString();
  let match;
  let tag;
  let params;

  options = options || {};

  while (match = regexps.icon.exec(html)) {
    tag = match[0];
    params = buildParamsFromString(match[1]);
    icons.push(params);
    html = html.replace(tag, generateSvgIcon(params));
  }

  if (options.sprite) {
    generateSvgSprite(icons, (sprite) => {
      html = html.replace(/<body.*?>/, (match) => match + sprite);
      callback(html);
    })
  } else {
    callback(html);
  }
};
