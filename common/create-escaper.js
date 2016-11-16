// @references: http://underscorejs.org/docs/underscore.html
const lang = require('zero-lang');

const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
const UNESCAPE_MAP = {};
lang.forIn(ESCAPE_MAP, (value, key) => {
  UNESCAPE_MAP[value] = key;
});

module.exports = (invert) => {
  let escapeMap = ESCAPE_MAP;
  if (invert) {
    escapeMap = UNESCAPE_MAP;
  }
  const escaping = match => escapeMap[match];
  const source = '(?:' + lang.keys(map).join('|') + ')';
  const testRegexp = RegExp(source);
  const replaceRegexp = RegExp(source, 'g');
  return function(str) {
    str = str == null ? '' : '' + str;
    return testRegexp.test(str) ? str.replace(replaceRegexp, escaping) : str;
  };
};
