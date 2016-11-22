/* eslint-disable */
const lang = require('zero-lang');
const __e = require('../../common/escape');
module.exports = function(data) {
    data = data || {};

    var __t;
    var __p = '';

    return (function(id, viewBox, body) {
        __p += '<symbol id="' +
            ((__t = (id)) == null ? '' : __t) +
            '" viewBox="' +
            ((__t = (viewBox)) == null ? '' : __t) +
            '">' +
            ((__t = (body)) == null ? '' : __t) +
            '</symbol>\n';;
        return __p;
    })(data.id, data.viewBox, data.body);
};