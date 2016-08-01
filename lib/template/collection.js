/* eslint-disable */ module.exports = function(data, helper) {
    data = data || {};
    helper = helper || {};
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };
    return (function(svgSprite, ids) {
        __p += '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="Content-Type" name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">\n  <title>svg collection</title>\n  <style>\n    html {\n      font-family: sans-serif;\n      line-height: 1.15;\n      -ms-text-size-adjust: 100%;\n      -webkit-text-size-adjust: 100%\n    }\n\n    body {\n      margin: 0\n    }\n\n    article, aside, details, figcaption, figure, footer, header, main, menu, nav, section, summary {\n      display: block\n    }\n\n    audio, canvas, progress, video {\n      display: inline-block\n    }\n\n    .si-figure {\n      padding: 5px 0;\n      position: relative;\n      display: inline-block;\n      margin: 0;\n      background-color: #f9f9f9;\n      outline: 1px solid #fff;\n      height: 100px;\n      color: #999;\n      vertical-align: top;\n      text-align: center;\n      font-size: 14px;\n      cursor: pointer\n    }\n\n    .si-figure svg {\n      width: 50px;\n      height: 50px;\n      fill: gray\n    }\n\n    .si-figure:hover {\n      background-color: #dfd;\n      color: #337ab7\n    }\n\n    .si-figure:hover svg {\n      fill: #337ab7\n    }\n\n    .si-figure.selected {\n      background-color: #337ab7;\n      color: #fff;\n      opacity: .9\n    }\n\n    .si-figure.selected svg {\n      fill: #fff\n    }\n\n    @media only screen and (min-width: 768px) {\n      .si-figure {\n        width: 12%\n      }\n    }\n\n    @media only screen and (max-width: 768px) {\n      .si-figure {\n        width: 24%\n      }\n    }\n\n    @media only screen and (max-width: 480px) {\n      .si-figure {\n        width: 48%\n      }\n    }\n\n    .si.inline {\n      height: 1.2em;\n      width: 1.2em;\n      vertical-align: sub\n    }\n\n    .si.white {\n      fill: #fff\n    }\n  </style>\n</head>\n<body>\n' +
            ((__t = (svgSprite)) == null ? '' : __t) +
            '\n<article>';
        ids.forEach(function(id) {
            __p += '\n  <figure class="si-figure">\n    <div id="figure-' +
                ((__t = (id)) == null ? '' : __t) +
                '">\n      <div class="si-wrapper ' +
                ((__t = (id)) == null ? '' : __t) +
                '">\n        <svg class="si">\n          <use xlink:href="#' +
                ((__t = (id)) == null ? '' : __t) +
                '"></use>\n        </svg>\n      </div>\n    </div>\n    <figcaption>' +
                ((__t = (id)) == null ? '' : __t) +
                '</figcaption>\n  </figure>';
        });
        __p += '\n</article>\n</body>\n</html>\n';;
        return __p;
    })(data.svgSprite, data.ids);
};