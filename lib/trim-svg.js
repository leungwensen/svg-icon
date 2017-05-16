/*
 * removes all the padding around SVG graph
 * input is the content of an SVG file (check out ../spec/fixtures/svg-icons)
 * output is the content of trimmed SVG file (check out ../spec/fixtures/trimmed-svg-icons)
 */
const SVGO = require('svgo');
const Nightmare = require('nightmare');

const DEFAULT_SVGO_INIT = new SVGO({
  plugins: [
    {
      removeAttrs: {
        attrs: [
          'baseProfile',
          'class',
          'data-name',
          'svg:height',
          'svg:id',
          'svg:viewBox',
          'svg:width',
          'g:fill',
          'g:fill-rule',
          'svg:fill',
          'svgg:fill-rule',
          // 'fill',
          // 'fill-rule',
        ]
      }
    },
  ]
});
const DEFAULT_SVGO_FINAL = new SVGO({
  plugins: [
    {
      removeEditorsNSData: true
    },
    {
      removeEmptyAttrs: true
    },
    {
      removeEmptyContainers: true
    },
    {
      removeEmptyText: true
    },
    {
      removeHiddenElems: true
    },
    {
      removeStyleElement: true
    },
    {
      removeTitle: true
    },
    {
      removeUselessDefs: true
    },
    {
      sortAttrs: true
    },
  ]
});

module.exports = (svgStr, callback, _svgoInit, _svgoFinal) => {
  // NOTE init an Nightmare instance every session, for it will be destroy after .end()
  const nightmare = new Nightmare({
    show: false,
  });
  const svgoInit = _svgoInit ? _svgoInit : DEFAULT_SVGO_INIT;
  const svgoFinal = _svgoFinal ? _svgoFinal : DEFAULT_SVGO_FINAL;

  // first optimize the svg content
  svgoInit.optimize(svgStr, (result) => {
    if (result.error) {
      console.error(result.error);
      callback(svgStr);
    } else {
      const svgWrapped = result.data
        .replace(/(<svg[^>]+>)/i, '$1<g>')
        .replace(/(<\/svg>)/i, '</g>$1');

      // open svg as data uri
      nightmare
        .goto(`data:image/svg+xml;utf8,${svgWrapped}`)
        .wait('g')
        .evaluate(() => {
          const bbox = document.getElementsByTagName('g')[0].getBoundingClientRect();
          // NOTE cannot return bbox directory, for this is a DOMRect instance that only contains "virtual" properties
          return {
            height: bbox.height,
            left: bbox.left,
            top: bbox.top,
            width: bbox.width,
          };
        })
        .end()
        .then(bbox => {
          const viewBox = `0 0 ${bbox.width} ${bbox.height}`;
          const top = -bbox.top;
          const left = -bbox.left;
          const width = bbox.width;
          const height = bbox.height;
          const transform = `translate(${left}, ${top})`;
          const transformedSvgContent = svgWrapped.replace(/<svg([^>]+)><g>/i, `<svg$1 viewBox="${viewBox}"><g transform="${transform}">`);

          svgoFinal.optimize(transformedSvgContent, finalResult => {
            if (finalResult.error) {
              console.error(finalResult.error)
              callback(svgStr);
            } else {
              callback(finalResult.data);
            }
          });
        })
        .catch(err => {
          console.error(err);
          callback(svgStr);
        });
    }
  });
};
