'use strict';

const fs = require('fs');
const path = require('path');

const _ = require('underscore');
const co = require('co');
const thunkify = require('thunkify');

const readFile = thunkify(fs.readFile);

module.exports = (source, target) => {
  // TODO source has to be a directory
  co(function *(){
    const svgContent = yield readFile(source, 'utf8');
    console.log(svgContent);
  });
};
