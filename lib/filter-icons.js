/*
 * correcting and removing invalid icon data
 */
const lang = require('zero-lang');

module.exports = (icons) => {
  const resultIcons = [];

  lang.each(icons, (icon) => {
    if (icon.name && icon.pathData) { // removing invalid ones
      resultIcons.push(icon);
    }
  });
  return resultIcons;
};
