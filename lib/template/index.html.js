/* eslint-disable */
const lang = require('zero-lang');
const __e = require('../../common/escape');
module.exports = function(data) {
    data = data || {};
    var __t;
    var __p = '';
    return (function(svgSprite, ids) {
        __p += '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>SVG icons</title><link rel="stylesheet" href="./index.css"/></head><body>' +
            ((__t = (svgSprite)) == null ? '' : __t) +
            '<article>';
        ids.forEach(function(id) {
            __p += '<figure class="si-figure"><div id="figure-' +
                ((__t = (id)) == null ? '' : __t) +
                '"><div class="si-wrapper ' +
                ((__t = (id)) == null ? '' : __t) +
                '"><svg class="si"><use xlink:href="#' +
                ((__t = (id)) == null ? '' : __t) +
                '"></use></svg></div></div><figcaption>' +
                ((__t = (id)) == null ? '' : __t) +
                '</figcaption></figure>';
        });
        __p += '</article></body></html>\n';;
        return __p;
    })(data.svgSprite, data.ids);
};