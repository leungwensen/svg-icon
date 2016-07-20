require('./index.less');
import $ from 'jquery';
import lang from 'zero-lang';

const icons = require('json!./data/icons.json');
const iconTypes = lang.keys(icons);

const $body = $('body');
const $types = $('#types');
const $icons = $('#icons');
const $loading = $('#loading');

lang.each(iconTypes, (type) => {
  const sprite = require(`raw!../dist/sprite/symbol/${type}.svg`);
  $body.prepend(sprite);
});

const baseIconsClass = 'tab-content';

function renderIconsByType(type) {
  const meta = icons[type];
  if (!meta.rendered) {
    $loading[0].setAttribute('style', 'display: block;');
    setTimeout(() => {
      const $type = $(`#${type}`);
      lang.each(icons[type].icons, (icon) => {
        $type.append(`<figure class="si-figure">
          <div id="figure-${icon.id}"></div>
          <figcaption>${icon.type}-${icon.name}</figcaption>
        </figure>`);
        const iconType = `${icon.type}-${icon.name}`;
        $(`#figure-${icon.id}`).append(
          `<div class="si-wrapper ${icon.id}">
            <svg class="si"><use xlink:href="#${icon.id}"></use></svg>
          </div>`
        );
      });
      meta.rendered = true;
      $loading.hide();
    }, 10);
  }
}

lang.forIn(icons, (meta, type) => {
  $types.append(`
      <li role="presentation">
        <a href="#${type}" aria-controls="home" role="tab" data-toggle="tab" data-type="${type}">
        ${meta.name} <span class="badge">${meta.icons.length}</span>
        </a>
      </li>
    `);
  $icons.append(`<div role="tabpanel" class="tab-pane" id="${type}"></div>`);
});
renderIconsByType('anticon');

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  renderIconsByType($(e.target).data('type'));
});

$types.children().first().addClass('active');
$icons.children().first().addClass('active');
