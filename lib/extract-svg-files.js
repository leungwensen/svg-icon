/*
 * extract meta data from svg icons
 * input is a folder of svg icons (e.g. ../src/zero/)
 * output is an array of SVG icons info (trimmed svg icons)
 */
const fs = require('fs');
const path = require('path');
const lang = require('zero-lang');
const getIconData = require('./get-icon-data');
const trimSVG = require('./trim-svg');

module.exports = (dirname, options, callback) => {
  options = options || {};
  const filter = options.filter || (() => true);
  const icons = [];
  let svgFiles = [];

  function processNext() {
    if (svgFiles.length) {
      const svgFile = path.join(dirname, svgFiles.shift());
      fs.readFile(svgFile, 'utf8', (err, content) => {
        if (err) {
          console.error(err);
          processNext();
        } else {
          console.log(`icon extracting: ${svgFile}...`);
          trimSVG(content, (result) => {
            console.log(`icon extracted: ${svgFile}`);
            icons.push(getIconData(result, {
              name: path.basename(svgFile, '.svg'),
            }));
            processNext();
          }, options.svgoInit, options.svgoFinal);
        }
      });
    } else {
      callback(icons);
    }
  }

  fs.readdir(dirname, (err, files) => {
    // default filter
    files = lang.filter(files, (filename) => /\.svg$/.test(filename));
    // customized filter
    svgFiles = lang.filter(files, filter);
    processNext();
  });
};
