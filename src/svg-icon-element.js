'use strict';
/**
 * svg-icon-element module
 * @module svg-icon-element
 * @see module:index
 */
import './style/svg-icon-element.less';
const svgIcon = Object.create(HTMLElement.prototype);

function generateSvgIcon(url, id) {
  return `<svg class="si"><use xlink:href="${url}#${id}"></use></svg>`;
}

svgIcon._setContent = function () {
  const url = this.getAttribute('url') || '';
  const type = this.getAttribute('type');
  this.innerHTML = generateSvgIcon(url, type);
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
