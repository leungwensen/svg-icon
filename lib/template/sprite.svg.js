/* eslint-disable */
const lang = require('zero-lang');
const __e = require('../../common/escape');
module.exports = function(data) {
    data = data || {};
    var __t;
    var __p = '';
    return (function(symbols) {
        __p += '<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="width:0;height:0;position:absolute;overflow:hidden;"><defs>' +
            ((__t = (symbols.join('\n'))) == null ? '' : __t) +
            '</defs></svg>\n';;
        return __p;
    })(data.symbols);
};