'use strict';
/**
 * trim-svg module
 * @module trim-svg
 * @see module:index
 */
const fs = require('fs');
const path = require('path');
const SVGO = require('svgo');
const phantom = require('phantom');
const shelljs = require('shelljs');

const svgo = new SVGO({
  plugins: [
    {
      removeAttrs: {
        attrs: [
          'height',
          'viewBox',
          'width',
          //'baseProfile',
          //'class',
          //'data-name',
          //'fill',
          //'fill-rule',
          //'id',
        ]
      }
    },
    {
      removeEmptyContainers: true
    },
    {
      removeHiddenElems: true
    },
  ]
});

const svgoFinal = new SVGO({});

module.exports = (pathname, type, dryRun, callback) => {
  type = type || 'temp';
  const svgContent = fs.readFileSync(pathname, 'utf8');

  svgo.optimize(svgContent, result => {
    if (result.error) {
      console.log(pathname);
      console.log(result.error);
      callback();
    } else {
      const svgWrapped = result.data
        .replace(/(<svg[^>]+>)/, '$1<g>')
        .replace(/(<\/svg>)/, '</g>$1');

      const basename = path.basename(pathname);
      const dirname = path.dirname(pathname);

      const tempFilename = dryRun ? path.resolve(dirname, `../../trimmed-svg/${type}/${basename}`) : pathname;
      const tempDirname = path.dirname(tempFilename);
      shelljs.mkdir('-p', tempDirname);

      fs.writeFileSync(tempFilename, svgWrapped, 'utf8');

      let sitepage = null;
      let phInstance = null;

      phantom.create()
        .then(instance => {
          phInstance = instance;
          return instance.createPage();
        })
        .then(page => {
          sitepage = page;
          return page.open(`file://${tempFilename}`);
        })
        .then(status => {
          console.log(status);
          return sitepage.property('content');
        })
        .then((/* content */) => {
          sitepage.evaluateJavaScript('function() { return JSON.stringify(document.getElementsByTagName(\'g\')[0].getBoundingClientRect()); }')
            .then((str) => {
              const rect = JSON.parse(str);
              const viewBox = `0 0 ${rect.width} ${rect.height}`;
              const top = 0 - rect.top;
              const left = 0 - rect.left;
              const transform = `translate(${left}, ${top})`;
              const transformedSvgContent = svgWrapped
                .replace(/<svg([^>]+)><g>/, `<svg$1 viewBox="${viewBox}"><g transform="${transform}">`);

              svgoFinal.optimize(transformedSvgContent, finalResult => {
                if (finalResult.error) {
                  console.log(pathname, finalResult.error);
                  sitepage.close();
                } else {
                  fs.writeFileSync(tempFilename, finalResult.data, 'utf8');
                  callback();
                  sitepage.close();
                }
              });
            });
          phInstance.exit();
        })
        .catch(error => {
          console.log(pathname, error);
          callback();
          phInstance.exit();
        });
    }
  });
};
