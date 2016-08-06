/* eslint-disable */ module.exports = function(data, helper) {
    data = data || {};
    helper = helper || {};
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };
    return (function(symbols) {
        __p += '<?xml version="1.0" encoding="utf-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="width:0;height:0;position:absolute;overflow:hidden;">\n  <defs>\n' +
            ((__t = (symbols.join('\n'))) == null ? '' : __t) +
            '\n  </defs>\n</svg>\n';;
        return __p;
    })(data.symbols);
};