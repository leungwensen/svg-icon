#!/usr/bin/env node
const SVGO = require('svgo');
const commander = require('commander');
const fs = require('fs');
const lang = require('zero-lang');
const path = require('path');
const request = require('request');
const pkg = require('../../package.json');
const extractSvgFiles = require('../../lib/extract-svg-files');
const filterIcons = require('../../lib/filter-icons');
const syncGitRepo = require('../sync-git-repo');
const svgoOptionRemoveAllFill = require('../svgo-option/remove-all-fill');

const URL_GIT_REPO = 'git@github.com:evil-icons/evil-icons.git';
const ICON_PATH = './assets/icons/';
const DEFAULT_OUTPUT = path.resolve(__dirname, '../../dist/data/evil-icons.json');
const DEFAULT_REPO_DIR = path.resolve(__dirname, '../../temp/git-repo/evil-icons');

function extractIcons(options) {
  // less file for icon fonts
  syncGitRepo(URL_GIT_REPO, options.dir, () => {
    extractSvgFiles(path.join(options.dir, ICON_PATH), {
      svgoInit: new SVGO(svgoOptionRemoveAllFill),
    }, (result) => {
      lang.each(result, (icon) => {
        icon.name = lang.trim(icon.name).replace(/^ei-/, '');
      });
      fs.writeFile(options.output, JSON.stringify(filterIcons(result), null, '\t'), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${commander.output} written!`);
        }
      });
    });
  });
}

commander
  .version(pkg.version)
  .option('-d, --dir [dir]', 'repo dir', DEFAULT_REPO_DIR)
  .option('-o, --output [output]', 'output filename', DEFAULT_OUTPUT)
  .parse(process.argv);

extractIcons(commander);
