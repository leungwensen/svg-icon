const fs = require('fs');
const path = require('path');
const lang = require('zero-lang');
const template2module = require('template2module');

const underscoreEngine = template2module.engines.underscore;
underscoreEngine.outerScopeVars = {
  JSON: true,
  _: true,
  __e: true,
  __p: true,
  __t: true,
  lang: true,
};
const REGEXP = {
  importTag: /<import\s+src="\S*"><\/import>/g,
  svgSpriteTag: /<svg-sprite\/>/,
  srcPath: /src="(\S*)"/,
  spacesBetweenTags: />[\s|\r|\n]*</g,
};
const svgSprite = '';
// fs.readFileSync(path.resolve(__dirname, '../dist/zfinder/svg-symbols.svg'), 'utf8');

function parseSvgSpriteTag(content) {
  return content.replace(REGEXP.svgSpriteTag, svgSprite);
}

function parseImportTag(content, resourcePath) {
  const match = content.match(REGEXP.importTag);
  if (match) {
    lang.each(match, (m) => {
      const sourcePath = m.match(REGEXP.srcPath)[1];
      const absoluteSourcePath = path.resolve(path.dirname(resourcePath), sourcePath);
      const sourceOriginContent = fs.readFileSync(absoluteSourcePath, 'utf8');
      const sourceDistContent = parseImportTag(sourceOriginContent, absoluteSourcePath);
      content = content.replace(m, sourceDistContent);
    });
  }
  return content;
}

const MODULE_HEADER =
`/* eslint-disable */
const lang = require('zero-lang');
const __e = require('../../common/escape');
`;

module.exports = (content, pathname) => {
  const templateContent = parseSvgSpriteTag(parseImportTag(content, pathname))
    .replace(REGEXP.spacesBetweenTags, '><');

  const moduleBody = underscoreEngine.render(templateContent, pathname, 'commonjs')
    .replace(', helper', '')
    .replace(/\s+helper =[^}]+};/, '')
    .replace(/\s+var __j[^;]+;/, '')
    .replace(/\s+var print[^{]+\{[^}]+};/, '')
    .replace(/\s+return \{[^}]+}/, '')
    .replace(/\s+return String[^{]+\{[^}]+}\);/, '')
    .replace(/\s+var __e[^{]+\{[^}]+};/, '');

  return `${MODULE_HEADER}${moduleBody}`;
};
