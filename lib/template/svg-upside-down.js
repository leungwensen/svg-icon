/* eslint-disable */
const lang = require('zero-lang');
const __e = require('../../common/escape');
module.exports = function(data) {
    data = data || {};

    var __t;
    var __p = '';

    return (function(content) {
        __p += '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="scale(1, -1)">' +
            ((__t = (content)) == null ? '' : __t) +
            '</g></svg>\n';;
        return __p;
    })(data.content);
};