'use strict';
/**
 * svg-icon web element module
 * @module svg-icon web element
 * @see module:index
 */
require('./webcomponent.less');

function generateSvgIcon(url, id, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g>
    <title>${title}</title>  
    <use xlink:href="${url}#${id}"></use>
  </g>
</svg>`;
}

const svgIcon = Object.create(HTMLElement.prototype);
svgIcon._setContent = function () {
  const me = this;
  const url = me.getAttribute('url') || '';
  const type = me.getAttribute('type');
  const title = me.getAttribute('title') || type;
  if (!type) {
    throw new SyntaxError('missing attribute: type.');
  }
  me.innerHTML = generateSvgIcon(url, type, title);
};
svgIcon.createdCallback = function () {
  this._setContent();
};
svgIcon.attributeChangedCallback = function () {
  this._setContent();
};

document.registerElement('svg-icon', {
  prototype: svgIcon
});
