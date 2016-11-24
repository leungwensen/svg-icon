/*
 * correcting and removing invalid icon data
 */
const lang = require('zero-lang');

const mapping = {
  'zoom-out': /zoom-$/,
  'zoom-in': /zoom\+/g,
  'cpp': /c\+\+/g,
  'at': /@/g,
  'plus': /\+/g,
  '-': /\./g,
};

function fixName(name) {
  lang.forIn(mapping, (value, key) => {
    name = name.replace(value, key);
  });
  name = name.replace(/[^\w\-]/g, '-');
  return name;
}

module.exports = (icons) => {
  const resultIcons = [];

  lang.each(icons, (icon) => {
    if (icon.name && icon.body) { // removing invalid ones
      delete icon.unicode;
      icon.name = fixName(icon.name); // fixing invalid names
      resultIcons.push(icon);
    }
  });
  return resultIcons;
};
