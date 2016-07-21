require('./index.less');

import $ from 'jquery';
import lang from 'zero-lang';
import downloadAsFile from './common/download';

const icons = require('json!./data/icons.json');

const $body = $('body');
const $types = $('#types');
const $icons = $('#icons');
const $loading = $('#loading');

function renderIconsByType(type) {
  const meta = icons[type];
  if (!meta.rendered) {
    $loading[0].setAttribute('style', 'display: block;');
    $.get(`./dist/sprite/symbol/${type}.svg`, (res) => {
      $body.prepend(new XMLSerializer().serializeToString(res));
      setTimeout(() => {
        const $type = $(`#${type}`);
        lang.each(icons[type].icons, (icon) => {
          icon.id = `si-${icon.type}-${icon.name}`;
          $type.append(`<figure class="si-figure" data-type="${type}" data-id="${icon.id}">
          <div id="figure-${icon.id}"></div>
          <figcaption>${icon.type}-${icon.name}</figcaption>
        </figure>`);
          $(`#figure-${icon.id}`).append(`<div class="si-wrapper ${icon.id}">
          <svg class="si"><use xlink:href="#${icon.id}"></use></svg>
        </div>`);
        });
        meta.rendered = true;
        $loading.hide();
      }, 10);
    });
  }
}

lang.forIn(icons, (meta, type) => {
  $types.append(`<li role="presentation">
    <a href="#${type}" aria-controls="home" role="tab" data-toggle="tab" data-type="${type}">
    ${meta.name} <span class="badge selected-count" data-type="${type}"></span>
    </a>
  </li>`);
  $icons.append(`<div role="tabpanel" class="tab-pane" id="${type}">
    <p class="center"><input type="checkbox" class="select-all" data-type="${type}"/> Select All</p>
  </div>`);
});
renderIconsByType('anticon');

$('a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
  renderIconsByType($(e.target).data('type'));
});

function syncSelectedCount(type) {
  const count = $(`#${type}`).find('.si-figure.selected').length;
  if (count) {
    $(`.selected-count[data-type=${type}]`).html(count);
  } else {
    $(`.selected-count[data-type=${type}]`).html('');
  }
}

$('.select-all').on('change', function () {
  const $checkbox = $(this);
  const checked = $checkbox[0].checked;
  const type = $checkbox.data('type');
  if (checked) {
    $(`#${type}`).find('.si-figure').addClass('selected');
  } else {
    $(`#${type}`).find('.si-figure').removeClass('selected');
  }
  syncSelectedCount(type);
});

$(document).on('click', '.si-figure', function () {
  const selected = $(this).hasClass('selected');
  console.log(selected);
  if (selected) {
    $(this).removeClass('selected');
  } else {
    $(this).addClass('selected');
  }
  syncSelectedCount($(this).data('type'));
});

$('#download').on('click', () => {
  const ids = lang.map($('.selected.si-figure'), (item) => $(item).data('id'));
  if (!ids.length) {
    alert('Please select at lease one icon');
  } else {
    const symbols = lang.map(ids, (id) => {
      if ($(`#${id}`)[0]) {
        return $(`#${id}`)[0].outerHTML;
      }
      return '';
    });
    const svgSprite =
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;">
  ${symbols.join('')}
</svg>`;
    downloadAsFile('si-sprite.svg', svgSprite);
  }
});

$types.children().first().addClass('active');
$icons.children().first().addClass('active');
