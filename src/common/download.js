'use strict';
/**
 * download module
 * @module download
 * @see module:index
 */
const pom = document.createElement('a');
const PLAIN_TEXT = 'text/plain';
export default (filename = 'download.txt', content = '', type = PLAIN_TEXT) => {
  const uri = (type === PLAIN_TEXT) ? `data:${type};charset=utf-8,${encodeURIComponent(content)}`
    : `data:${type}base64,${window.btoa(encodeURIComponent(content))}`;
  pom.href = uri;
  pom.download = filename;
  if (document.createEvent) {
    const event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
};
