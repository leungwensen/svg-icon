#!/usr/bin/env node
'use strict';
const fs = require('fs');
const lang = require('zero-lang');
const shelljs = require('shelljs');
const iconsMetaByName = require('../lib/const/icons-meta-by-name');

const workingDir = './temp';
const dist = './dist/svg';

if (!shelljs.test('-d', workingDir)) {
  shelljs.mkdir(workingDir);
}

function syncIcons(meta) {
  const name = meta.name;
  const prefix = meta.prefix.replace(/\-$/, '');
  const cwd = `${workingDir}/${name}`;
  console.log(`[syncing...] ${name}`);
  if (meta.download) {
    // console.log(`[downloading...] ${name}`);
    // const urlParts = meta.download.split('/');
    // const filename = urlParts[urlParts.length - 1];
    // shelljs.exec(`curl -o ${workingDir}/${filename} ${meta.download} `);
  } else if (!shelljs.test('-d', cwd)) {
    console.log(`[cloning...] ${name}`);
    shelljs.exec(`git clone ${meta.repo} ${cwd}`);
  } else {
    console.log(`[pulling...] ${name}`);
    shelljs.exec(`cd ${cwd} && git pull && cd ../../`)
  }
  console.log(`[separating...] ${name}`);
  shelljs.exec(`./bin/cli.js separate -s ${name} -o ${dist}/${prefix} ${cwd}`);
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
  lang.forIn(iconsMetaByName, syncIcons);
}

