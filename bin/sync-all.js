#!/usr/bin/env node
const path = require('path');
const shelljs = require('shelljs');

shelljs.ls(path.resolve(__dirname, './extract/*.js')).forEach((file) => {
  const iconSet = path.basename(file, '.js');
  console.log(`sync icon set: ${iconSet}`);
  shelljs.exec(`./bin/extract/${iconSet}.js && ./bin/export/${iconSet}.sh`);
});
