#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const lang = require('zero-lang');
const path = require('path');
const request = require('request');
const pkg = require('../../package.json');
const extractSvgFiles = require('../../lib/extract-svg-files');
const filterIcons = require('../../lib/filter-icons');
const syncGitRepo = require('../sync-git-repo');

const URL_GIT_REPO = 'git@github.com:primer/octicons.git';
const ICON_PATH = './lib/svg';
const DEFAULT_OUTPUT = path.resolve(__dirname, '../../dist/data/octicons.json');
const DEFAULT_REPO_DIR = path.resolve(__dirname, '../../temp/.git-repo/octicons');

function extractIcons(options) {
  // less file for icon fonts
  syncGitRepo(URL_GIT_REPO, options.dir, () => {
    extractSvgFiles(path.join(options.dir, ICON_PATH), {}, (result) => {
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
