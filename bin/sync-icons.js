#!/usr/bin/env node

const _ = require('underscore');
const shelljs = require('shelljs');

const iconsMetaByName = require('../lib/const/icons-meta-by-name');

const workingDir = './temp';
const dist = './svg-icons';

if (!shelljs.test('-d', workingDir)) {
  shelljs.mkdir(workingDir);
}

function syncIcons(meta) {
  const name = meta.name;
  const cwd = `${workingDir}/${name}`;
  console.log(`[syncing...] ${name}`);
  if (!shelljs.test('-d', cwd)) {
    console.log(`[cloning...] ${name}`);
    shelljs.exec(`git clone ${meta.repo} ${cwd}`);
  } else {
    console.log(`[pulling...] ${name}`);
    shelljs.exec(`cd ${cwd} && git pull && cd ../../`)
  }
  console.log(`[separating...] ${name}`);
  shelljs.exec(`./bin/cli.js separate -s ${name} -o ${dist}/${name} ${cwd}`);
}

const argv = process.argv;

if (argv.length === 3) {
  const name = argv[2];
  if (iconsMetaByName[name]) {
    syncIcons(iconsMetaByName[name]);
  } else {
    console.error(`"${name}" icons is not supported!`);
  }
} else {
  _.each(iconsMetaByName, syncIcons);
}

