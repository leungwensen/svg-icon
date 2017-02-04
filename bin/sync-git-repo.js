// helper function
const path = require('path');
const shelljs = require('shelljs');
const lang = require('zero-lang');

module.exports = (repoUrl, dir, callback) => {
  if (!shelljs.test('-d', path.join(dir, './.git'))) {
    shelljs.rm('-rf', dir);
    shelljs.mkdir('-p', dir);
    console.log(`cloning ${repoUrl} into ${dir}`);
    shelljs.exec(`git clone ${repoUrl} ${dir}`, (code) => {
      if (code === 0 && lang.isFunction(callback)) {
        callback();
      }
    });
  } else {
    console.log(`fetching updates: ${dir}`);
    shelljs.exec(`cd ${dir} && git pull`, (code) => {
      if (code === 0 && lang.isFunction(callback)) {
        callback();
      }
    });
  }
};
