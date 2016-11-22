/*
 * correcting and removing invalid icon data
 */
const lang = require('zero-lang');

module.exports = (icons) => {
  const resultIcons = [];

  lang.each(icons, (icon) => {
    if (icon.name && icon.body) { // removing invalid ones
      delete icon.unicode;
      resultIcons.push(icon);
    }
  });
  return resultIcons;
};
