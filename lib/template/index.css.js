/* eslint-disable */
const lang = require('zero-lang');
const __e = require('../../common/escape');
module.exports = function(data) {
    data = data || {};

    var __t;
    var __p = '';

    return (function() {
        __p += 'html {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%\n}\n\nbody {\n  margin: 0\n}\n\narticle, aside, details, figcaption, figure, footer, header, main, menu, nav, section, summary {\n  display: block\n}\n\naudio, canvas, progress, video {\n  display: inline-block\n}\n\n.si-figure {\n  padding: 5px 0;\n  position: relative;\n  display: inline-block;\n  margin: 0;\n  background-color: #f9f9f9;\n  outline: 1px solid #fff;\n  height: 100px;\n  color: #999;\n  vertical-align: top;\n  text-align: center;\n  font-size: 14px;\n  cursor: pointer\n}\n\n.si-figure svg {\n  width: 50px;\n  height: 50px;\n  fill: gray\n}\n\n.si-figure:hover {\n  background-color: #dfd;\n  color: #337ab7\n}\n\n.si-figure:hover svg {\n  fill: #337ab7\n}\n\n.si-figure.selected {\n  background-color: #337ab7;\n  color: #fff;\n  opacity: .9\n}\n\n.si-figure.selected svg {\n  fill: #fff\n}\n\n@media only screen and (min-width: 768px) {\n  .si-figure {\n    width: 12%\n  }\n}\n\n@media only screen and (max-width: 768px) {\n  .si-figure {\n    width: 24%\n  }\n}\n\n@media only screen and (max-width: 480px) {\n  .si-figure {\n    width: 48%\n  }\n}\n\n.si.inline {\n  height: 1.2em;\n  width: 1.2em;\n  vertical-align: sub\n}\n\n.si.white {\n  fill: #fff\n}\n';;
        return __p;
    })();
};