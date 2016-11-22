/* eslint-disable */
const lang = require('zero-lang');
const __e = require('../../common/escape');
module.exports = function(data) {
    data = data || {};

    var __t;
    var __p = '';

    return (function(viewBox, body) {
        __p += '<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="' +
            ((__t = (viewBox)) == null ? '' : __t) +
            '">' +
            ((__t = (body)) == null ? '' : __t) +
            '</svg>\n';;
        return __p;
    })(data.viewBox, data.body);
};