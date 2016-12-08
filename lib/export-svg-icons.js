/*
 * export svg icons as a zip file
 * input is svg icons data (e.g. ../dist/data/ant-design.json)
 * output is a zip file
 * ---pack.zip
 *    ├── README.md
 *    ├── data
 *    │   └── pack.json
 *    ├── index.css
 *    ├── index.html
 *    ├── sprite.svg
 *    └── svg-files
 *        ├── xxx.svg
 *        ├── yyy.svg
 *        └── zzz.svg
 */
const lang = require('zero-lang');
const JSZip = require('jszip');
// templates
const tplIndexCss = require('./template/index.css.js');
const tplIndexHtml = require('./template/index.html.js');
const tplREADME = require('./template/README.md.js');
const tplSpriteSvg = require('./template/sprite.svg.js');
const tplSvgFile = require('./template/svg-file.svg.js');
const tplSvgSymbol = require('./template/svg-symbol');

module.exports = (icons, options, callback) => {
  const zip = new JSZip();
  const symbols = [];
  const ids = [];
  const idPrefix = options.prefix || '';
  zip.file('README.md', tplREADME(options));
  zip.file('index.css', tplIndexCss(options));
  lang.each(icons, (icon) => {
    if (icon.name && icon.body) {
      zip.file(`svg-files/${icon.name}.svg`, tplSvgFile(icon));
      const id = `${idPrefix}${icon.name}`;
      ids.push(id);
      symbols.push(tplSvgSymbol(lang.extend({
        id,
      }, icon)));
    }
  });
  const svgSprite = tplSpriteSvg({
    symbols,
  });
  zip.file('sprite.svg', svgSprite);
  zip.file('index.html', tplIndexHtml({
    ids,
    svgSprite,
  }));
  callback(zip);
};
