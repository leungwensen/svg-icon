var svgIcon =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _zeroLang = __webpack_require__(2);

	var _zeroLang2 = _interopRequireDefault(_zeroLang);

	var _fileSaver = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(12);

	var icons = __webpack_require__(16);

	var $body = (0, _jquery2.default)('body');
	var $types = (0, _jquery2.default)('#types');
	var $icons = (0, _jquery2.default)('#icons');
	var $loading = (0, _jquery2.default)('#loading');

	function renderIconsByType(type) {
	  var meta = icons[type];
	  if (!meta.rendered) {
	    $loading[0].setAttribute('style', 'display: block;');
	    _jquery2.default.get('./dist/sprite/symbol/' + type + '.svg', function (res) {
	      $body.prepend(new XMLSerializer().serializeToString(res));
	      setTimeout(function () {
	        var $type = (0, _jquery2.default)('#' + type);
	        _zeroLang2.default.each(icons[type].icons, function (icon) {
	          icon.id = 'si-' + icon.type + '-' + icon.name;
	          $type.append('<figure class="si-figure" data-type="' + type + '" data-id="' + icon.id + '">\n          <div id="figure-' + icon.id + '"></div>\n          <figcaption>' + icon.type + '-' + icon.name + '</figcaption>\n        </figure>');
	          (0, _jquery2.default)('#figure-' + icon.id).append('<div class="si-wrapper ' + icon.id + '">\n          <svg class="si"><use xlink:href="#' + icon.id + '"></use></svg>\n        </div>');
	        });
	        meta.rendered = true;
	        $loading.hide();
	      }, 10);
	    });
	  }
	}

	_zeroLang2.default.forIn(icons, function (meta, type) {
	  $types.append('<li role="presentation">\n    <a href="#' + type + '" aria-controls="home" role="tab" data-toggle="tab" data-type="' + type + '">\n    ' + meta.name + ' <span class="badge selected-count" data-type="' + type + '"></span>\n    </a>\n  </li>');
	  $icons.append('<div role="tabpanel" class="tab-pane" id="' + type + '">\n    <p class="center"><input type="checkbox" class="select-all" data-type="' + type + '"/> Select All</p>\n  </div>');
	});
	renderIconsByType('anticon');

	(0, _jquery2.default)('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  renderIconsByType((0, _jquery2.default)(e.target).data('type'));
	});

	function syncSelectedCount(type) {
	  var count = (0, _jquery2.default)('#' + type).find('.si-figure.selected').length;
	  if (count) {
	    (0, _jquery2.default)('.selected-count[data-type=' + type + ']').html(count);
	  } else {
	    (0, _jquery2.default)('.selected-count[data-type=' + type + ']').html('');
	  }
	}

	(0, _jquery2.default)('.select-all').on('change', function () {
	  var $checkbox = (0, _jquery2.default)(this);
	  var checked = $checkbox[0].checked;
	  var type = $checkbox.data('type');
	  if (checked) {
	    (0, _jquery2.default)('#' + type).find('.si-figure').addClass('selected');
	  } else {
	    (0, _jquery2.default)('#' + type).find('.si-figure').removeClass('selected');
	  }
	  syncSelectedCount(type);
	});

	(0, _jquery2.default)(document).on('click', '.si-figure', function () {
	  var selected = (0, _jquery2.default)(this).hasClass('selected');
	  console.log(selected);
	  if (selected) {
	    (0, _jquery2.default)(this).removeClass('selected');
	  } else {
	    (0, _jquery2.default)(this).addClass('selected');
	  }
	  syncSelectedCount((0, _jquery2.default)(this).data('type'));
	});

	(0, _jquery2.default)('#download').on('click', function () {
	  var ids = _zeroLang2.default.map((0, _jquery2.default)('.selected.si-figure'), function (item) {
	    return (0, _jquery2.default)(item).data('id');
	  });
	  if (!ids.length) {
	    alert('Please select at lease one icon');
	  } else {
	    var symbols = _zeroLang2.default.map(ids, function (id) {
	      if ((0, _jquery2.default)('#' + id)[0]) {
	        return (0, _jquery2.default)('#' + id)[0].outerHTML;
	      }
	      return '';
	    });
	    var svgSprite = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;">' + symbols.join('') + '</svg>';
	    var blob = new Blob([svgSprite], {
	      type: 'text/plain;charset=utf-8'
	    });
	    (0, _fileSaver.saveAs)(blob, 'si-sprite.svg');
	  }
	});

	$types.children().first().addClass('active');
	$icons.children().first().addClass('active');

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objectUtils = __webpack_require__(3);

	module.exports = objectUtils.extend({
	  global: __webpack_require__(7)
	}, objectUtils, __webpack_require__(5), __webpack_require__(6), __webpack_require__(8), __webpack_require__(4));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var checkType = __webpack_require__(4);
	var getType = checkType.getType;
	var isFunction = checkType.isFunction;
	var isObject = checkType.isObject;
	var isPlainObject = checkType.isPlainObject;

	var arrayUtils = __webpack_require__(5);
	var contains = arrayUtils.contains;
	var each = arrayUtils.each;
	var isArrayLike = arrayUtils.isArrayLike;
	var toArray = arrayUtils.toArray;

	function toPlainObject(obj) {
	  return isPlainObject(obj) ? obj : {};
	}
	function forIn(obj, callback, thisObj) {
	  var plainObj = toPlainObject(obj);
	  for (var key in plainObj) {
	    if ({}.hasOwnProperty.call(plainObj, key)) {
	      callback.call(thisObj, plainObj[key], key, obj);
	    }
	  }
	}

	var keys = Object.keys ? function (obj) {
	  return Object.keys(obj);
	} : function (obj) {
	  var result = [];
	  forIn(obj, function (value, key) {
	    if (!(isFunction(obj) && key === 'prototype')) {
	      result.push(key);
	    }
	  });
	  return result;
	};

	function values(obj) {
	  var result = [];
	  forIn(obj, function (value) {
	    result.push(value);
	  });
	  return result;
	}

	function extend(dest) {
	  dest = dest || {};
	  each(toArray(arguments).slice(1), function (source) {
	    if (source) {
	      forIn(source, function (value, key) {
	        dest[key] = source[key];
	      });
	    }
	  });
	  return dest;
	}

	function merge(dest) {
	  dest = dest || {};
	  each(toArray(arguments).slice(1), function (source) {
	    forIn(source, function (value, prop) {
	      if (getType(source[prop]) !== getType(dest[prop])) {
	        if (isPlainObject(source[prop])) {
	          dest[prop] = {};
	          merge(dest[prop], source[prop]);
	        } else {
	          dest[prop] = source[prop];
	        }
	      } else {
	        if (isPlainObject(source[prop])) {
	          merge(dest[prop], source[prop]);
	        } else {
	          dest[prop] = source[prop];
	        }
	      }
	    });
	  });
	  return dest;
	}

	var objectUtils = {
	  extend: extend,
	  forIn: forIn,
	  isObject: isObject,
	  isPlainObject: isPlainObject,
	  keys: keys,
	  merge: merge,
	  values: values,
	  assign: extend,
	  hasKey: function hasKey(obj, key) {
	    return obj.hasOwnProperty(key);
	  },
	  hasValue: function hasValue(obj, value) {
	    return contains(values(obj), value);
	  },
	  invert: function invert(obj) {
	    var result = {};
	    forIn(obj, function (value, key) {
	      result[value] = key;
	    });
	    return result;
	  },
	  clone: function clone(obj) {
	    if (isArrayLike(obj)) {
	      return toArray(obj);
	    }
	    if (isPlainObject(obj)) {
	      return merge({}, obj);
	    }
	    return obj;
	  },
	  destroy: function destroy(obj) {
	    forIn(obj, function (value, key) {
	      delete obj[key];
	    });
	    obj.prototype = null;
	    obj = null;
	  }
	};

	module.exports = objectUtils;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var toString = {}.toString;
	var isType = function isType(obj, type) {
	  return toString.call(obj) === '[object ' + type + ']';
	};

	var checkType = {
	  isType: isType,
	  isArguments: function isArguments(obj) {
	    return isType(obj, 'Arguments');
	  },
	  isArray: Array.isArray ? Array.isArray : function (obj) {
	    return isType(obj, 'Array');
	  },
	  isArrayLike: function isArrayLike(obj) {
	    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && isFinite(obj.length);
	  },
	  isBoolean: function isBoolean(obj) {
	    return isType(obj, 'Boolean');
	  },
	  isDate: function isDate(obj) {
	    return isType(obj, 'Date');
	  },
	  isError: function isError(obj) {
	    return isType(obj, 'Error');
	  },
	  isFunction: function isFunction(obj) {
	    return isType(obj, 'Function');
	  },
	  isNull: function isNull(obj) {
	    return obj === null;
	  },
	  isNumber: function isNumber(obj) {
	    return isType(obj, 'Number');
	  },
	  isPlainObject: function isPlainObject(obj) {
	    return isType(obj, 'Object');
	  },
	  isRegExp: function isRegExp(obj) {
	    return isType(obj, 'RegExp');
	  },
	  isString: function isString(obj) {
	    return isType(obj, 'String');
	  },
	  isUndefined: function isUndefined(obj) {
	    return obj === undefined;
	  },
	  getType: function getType(obj) {
	    var typeStr = toString.call(obj);
	    return typeStr.replace(/^\[object /, '').replace(/\]$/, '');
	  },
	  isObject: function isObject(obj) {
	    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	    return type === 'function' || type === 'object' && !!obj;
	  }
	};

	checkType.isNil = function (obj) {
	  return checkType.isNull(obj) || checkType.isUndefined(obj);
	};

	module.exports = checkType;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var checkType = __webpack_require__(4);
	var numberUtils = __webpack_require__(6);

	var isArray = checkType.isArray;
	var AP = Array.prototype;
	var slice = AP.slice;

	function isArrayLike(arr) {
	  return (typeof arr === 'undefined' ? 'undefined' : _typeof(arr)) === 'object' && numberUtils.isFinite(arr.length);
	}
	function toArray(arr) {
	  return isArrayLike(arr) ? slice.call(arr) : [];
	}

	function arrayFromSecondElement(arr) {
	  return slice.call(arr, 1);
	}
	function applyNativeFunction(nativeFunction, target, args) {
	  return nativeFunction.apply(target, arrayFromSecondElement(args));
	}

	// index
	var index = function index(up) {
	  return function (arr, searchElement, fromIndex) {
	    var i = void 0;
	    var len = arr.length >>> 0;
	    if (len === 0) {
	      return -1;
	    }
	    if (!fromIndex) {
	      fromIndex = up ? 0 : arr.length;
	    } else if (fromIndex < 0) {
	      fromIndex = Math.max(0, arr.length + fromIndex);
	    }
	    if (up) {
	      for (i = fromIndex; i < arr.length; i++) {
	        if (arr[i] === searchElement) {
	          return i;
	        }
	      }
	    } else {
	      for (i = fromIndex; i >= 0; i--) {
	        if (arr[i] === searchElement) {
	          return i;
	        }
	      }
	    }
	    return -1;
	  };
	};
	var indexOf = AP.indexOf ? function indexOf(arr) {
	  return applyNativeFunction(AP.indexOf, arr, arguments);
	} : index(true);
	var lastIndexOf = AP.lastIndexOf ? function lastIndexOf(arr) {
	  return applyNativeFunction(AP.lastIndexOf, arr, arguments);
	} : index();

	// each
	var each = AP.forEach ? function each(arr /* , callback, thisObj */) {
	  applyNativeFunction(AP.forEach, arr, arguments);
	} : function each(arr, callback, thisObj) {
	  var a = toArray(arr);
	  for (var i = 0; i < a.length; i++) {
	    callback.call(thisObj, a[i], i, arr);
	  }
	};

	// every
	var every = AP.every ? function every(arr) {
	  return applyNativeFunction(AP.every, arr, arguments);
	} : function (arr, callback, thisObj) {
	  var a = toArray(arr);
	  for (var i = 0; i < a.length; i++) {
	    if (!callback.call(thisObj, a[i], i, arr)) {
	      return false;
	    }
	  }
	  return true;
	};

	// filter
	var filter = AP.filter ? function filter(arr) {
	  return applyNativeFunction(AP.filter, arr, arguments);
	} : function (arr, callback, thisObj) {
	  var res = [];
	  each(arr, function (element, key) {
	    if (callback.call(thisObj, element, key, arr)) {
	      res.push(element);
	    }
	  });
	  return res;
	};

	// map
	var map = AP.map ? function map(arr) {
	  return applyNativeFunction(AP.map, arr, arguments);
	} : function (arr, callback, thisObj) {
	  var res = [];
	  each(arr, function (element, key) {
	    res.push(callback.call(thisObj, element, key, arr));
	  });
	  return res;
	};

	// some
	var some = AP.some ? function some(arr) {
	  return applyNativeFunction(AP.some, arr, arguments);
	} : function (arr, callback, thisObj) {
	  var i = void 0;
	  for (i = 0; i < arr.length; i++) {
	    if (callback.call(thisObj, arr[i], i, arr)) {
	      return true;
	    }
	  }
	  return false;
	};

	// reduce
	var reduce = AP.reduce ? function reduce(arr) {
	  return applyNativeFunction(AP.reduce, arr, arguments);
	} : function (arr, callback, thisObj) {
	  var value = void 0;
	  if (thisObj) {
	    value = thisObj;
	  }
	  for (var i = 0; i < arr.length; i++) {
	    if (value) {
	      value = callback(value, arr[i], i, arr);
	    } else {
	      value = arr[i];
	    }
	  }
	  return value;
	};

	// reduceRight
	var reduceRight = AP.reduceRight ? function reduceRight(arr) {
	  return applyNativeFunction(AP.reduceRight, arr, arguments);
	} : function (arr, callback, thisObj) {
	  var value = void 0;
	  if (thisObj) {
	    value = thisObj;
	  }
	  for (var i = arr.length - 1; i >= 0; i--) {
	    if (value) {
	      value = callback(value, arr[i], i, arr);
	    } else {
	      value = arr[i];
	    }
	  }
	  return value;
	};

	// contains
	function contains(arr, value) {
	  return indexOf(toArray(arr), value) > -1;
	}

	// uniq
	function uniq(arr) {
	  var resultArr = [];
	  each(arr, function (element) {
	    if (!contains(resultArr, element)) {
	      resultArr.push(element);
	    }
	  });
	  return resultArr;
	}

	// flatten
	function flatten(arr) {
	  var a = toArray(arr);
	  var r = [];
	  for (var i = 0, l = a.length; i < l; ++i) {
	    if (isArrayLike(a[i])) {
	      r = r.concat(a[i]);
	    } else {
	      r[r.length] = a[i];
	    }
	  }
	  return r;
	}

	var arrayUtils = {
	  contains: contains,
	  each: each,
	  every: every,
	  filter: filter,
	  flatten: flatten,
	  index: index,
	  indexOf: indexOf,
	  isArray: isArray,
	  isArrayLike: isArrayLike,
	  lastIndexOf: lastIndexOf,
	  map: map,
	  reduce: reduce,
	  reduceRight: reduceRight,
	  some: some,
	  toArray: toArray,
	  uniq: uniq,
	  forEach: each,
	  difference: function difference(arr) {
	    var rest = flatten(arrayFromSecondElement(arguments));
	    return filter(arr, function (value) {
	      return !contains(rest, value);
	    });
	  },
	  eachReverse: function eachReverse(arr, callback, thisObj) {
	    var a = toArray(arr);
	    var i = a.length - 1;
	    for (; i > -1; i -= 1) {
	      callback.call(thisObj, a[i], i, arr);
	    }
	  },
	  intersect: function intersect(a, b) {
	    var result = [];
	    each(a, function (value) {
	      if (contains(b, value)) {
	        result.push(value);
	      }
	    });
	    return result;
	  },
	  range: function range(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    if (!step) {
	      step = stop < start ? -1 : 1;
	    }
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = new Array(length);
	    for (var i = 0; i < length; i++, start += step) {
	      range[i] = start;
	    }
	    return range;
	  },
	  remove: function remove(arr, fromIndex, toIndex) {
	    var len = arr.length;
	    if (!numberUtils.isNumber(fromIndex)) {
	      return arr;
	    }
	    var rest = arr.slice((toIndex || fromIndex) + 1 || len);
	    arr.length = fromIndex < 0 ? len + fromIndex : fromIndex;
	    return arr.push.apply(arr, rest);
	  },
	  union: function union() {
	    var resultArr = [];
	    var sourceArrs = toArray(arguments);
	    each(sourceArrs, function (arr) {
	      resultArr = resultArr.concat(arr);
	    });
	    return uniq(resultArr);
	  }
	};

	module.exports = arrayUtils;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var checkType = __webpack_require__(4);
	var isNumber = checkType.isNumber;
	var nativeMin = Math.min;
	var nativeMax = Math.max;

	var numberUtils = {
	  isFinite: isFinite,
	  isNaN: isNaN,
	  isNumber: isNumber,
	  isDecimal: function isDecimal(num) {
	    return isNumber(num) && num % 1 !== 0;
	  },
	  isEven: function isEven(num) {
	    return isNumber(num) && num % 2 === 0;
	  },
	  isInteger: Number.isInteger ? Number.isInteger : function (num) {
	    return isNumber(num) && num % 1 === 0;
	  },
	  isNegative: function isNegative(num) {
	    return isNumber(num) && num < 0;
	  },
	  isOdd: function isOdd(num) {
	    return isNumber(num) && num % 2 !== 0;
	  },
	  isPositive: function isPositive(num) {
	    return isNumber(num) && num > 0;
	  },
	  toFloat: function toFloat(str) {
	    return parseFloat(str);
	  },
	  toInteger: function toInteger(str, radix) {
	    return parseInt(str, radix || 10);
	  },
	  isInRange: function isInRange(value, start, end) {
	    start = +start || 0;
	    if (end === undefined) {
	      end = start;
	      start = 0;
	    } else {
	      end = +end || 0;
	    }
	    return value >= nativeMin(start, end) && value < nativeMax(start, end);
	  }
	};

	numberUtils.isInFinite = function (num) {
	  return !numberUtils.isFinite(num);
	};

	module.exports = numberUtils;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var undefStr = 'undefined';

	var result = {};

	if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefStr) {
	  result = window;
	} else if ((typeof global === 'undefined' ? 'undefined' : _typeof(global)) !== undefStr) {
	  result = global;
	} else if ((typeof self === 'undefined' ? 'undefined' : _typeof(self)) !== undefStr) {
	  result = self;
	}

	module.exports = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var checkType = __webpack_require__(4);

	var isString = checkType.isString;
	var stringPrototype = String.prototype;

	function toString(a) {
	  return a.toString();
	}

	var stringUtils = {
	  isString: isString,
	  trim: function trim(str) {
	    str = toString(str);
	    return stringPrototype.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	  },
	  trimLeft: function trimLeft(str) {
	    str = toString(str);
	    return stringPrototype.trimLeft ? str.trimLeft() : str.replace(/^\s+/g, '');
	  },
	  trimRight: function trimRight(str) {
	    str = toString(str);
	    return stringPrototype.trimRight ? str.trimRight() : str.replace(/^\s+/g, '');
	  },
	  lc: function lc(str) {
	    return toString(str).toLowerCase();
	  },
	  uc: function uc(str) {
	    return toString(str).toUpperCase();
	  },
	  hasSubString: function hasSubString(str, subStr) {
	    return toString(str).indexOf(toString(subStr)) > -1;
	  }
	};

	module.exports = stringUtils;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	/* FileSaver.js
	 * A saveAs() FileSaver implementation.
	 * 1.3.2
	 * 2016-06-16 18:25:19
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: MIT
	 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
	 */

	/*global self */
	/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

	/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

	var saveAs = saveAs || function (view) {
		"use strict";
		// IE <10 is explicitly unsupported

		if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
			return;
		}
		var doc = view.document
		// only get URL when necessary in case Blob.js hasn't overridden it yet
		,
		    get_URL = function get_URL() {
			return view.URL || view.webkitURL || view;
		},
		    save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
		    can_use_save_link = "download" in save_link,
		    click = function click(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		},
		    is_safari = /constructor/i.test(view.HTMLElement),
		    is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
		    throw_outside = function throw_outside(ex) {
			(view.setImmediate || view.setTimeout)(function () {
				throw ex;
			}, 0);
		},
		    force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		,
		    arbitrary_revoke_timeout = 1000 * 40 // in ms
		,
		    revoke = function revoke(file) {
			var revoker = function revoker() {
				if (typeof file === "string") {
					// file is an object URL
					get_URL().revokeObjectURL(file);
				} else {
					// file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		},
		    dispatch = function dispatch(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		},
		    auto_bom = function auto_bom(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
			}
			return blob;
		},
		    FileSaver = function FileSaver(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var filesaver = this,
			    type = blob.type,
			    force = type === force_saveable_type,
			    object_url,
			    dispatch_all = function dispatch_all() {
				dispatch(filesaver, "writestart progress write writeend".split(" "));
			}
			// on any filesys errors revert to saving with object URLs
			,
			    fs_error = function fs_error() {
				if ((is_chrome_ios || force && is_safari) && view.FileReader) {
					// Safari doesn't allow downloading of blob urls
					var reader = new FileReader();
					reader.onloadend = function () {
						var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
						var popup = view.open(url, '_blank');
						if (!popup) view.location.href = url;
						url = undefined; // release reference before dispatching
						filesaver.readyState = filesaver.DONE;
						dispatch_all();
					};
					reader.readAsDataURL(blob);
					filesaver.readyState = filesaver.INIT;
					return;
				}
				// don't create more object URLs than needed
				if (!object_url) {
					object_url = get_URL().createObjectURL(blob);
				}
				if (force) {
					view.location.href = object_url;
				} else {
					var opened = view.open(object_url, "_blank");
					if (!opened) {
						// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
						view.location.href = object_url;
					}
				}
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				revoke(object_url);
			};
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function () {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		},
		    FS_proto = FileSaver.prototype,
		    saveAs = function saveAs(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		};
		// IE 10+ (native saveAs)
		if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
			return function (blob, name, no_auto_bom) {
				name = name || blob.name || "download";

				if (!no_auto_bom) {
					blob = auto_bom(blob);
				}
				return navigator.msSaveOrOpenBlob(blob, name);
			};
		}

		FS_proto.abort = function () {};
		FS_proto.readyState = FS_proto.INIT = 0;
		FS_proto.WRITING = 1;
		FS_proto.DONE = 2;

		FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;

		return saveAs;
	}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || undefined.content);
	// `self` is undefined in Firefox for Android content script context
	// while `this` is nsIContentFrameMessageManager
	// with an attribute `content` that corresponds to the window

	if (typeof module !== "undefined" && module.exports) {
		module.exports.saveAs = saveAs;
	} else if ("function" !== "undefined" && __webpack_require__(10) !== null && __webpack_require__(11) !== null) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return saveAs;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 11 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 12 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports) {

	module.exports = {
		"anticon": {
			"name": "ant-design",
			"prefix": "anticon-",
			"repo": "https://github.com/ant-design/ant-design.git",
			"icons": [
				{
					"type": "anticon",
					"name": "aliwangwang-o"
				},
				{
					"type": "anticon",
					"name": "aliwangwang"
				},
				{
					"type": "anticon",
					"name": "android"
				},
				{
					"type": "anticon",
					"name": "apple"
				},
				{
					"type": "anticon",
					"name": "appstore-o"
				},
				{
					"type": "anticon",
					"name": "appstore"
				},
				{
					"type": "anticon",
					"name": "area-chart"
				},
				{
					"type": "anticon",
					"name": "arrow-down"
				},
				{
					"type": "anticon",
					"name": "arrow-left"
				},
				{
					"type": "anticon",
					"name": "arrow-right"
				},
				{
					"type": "anticon",
					"name": "arrow-salt"
				},
				{
					"type": "anticon",
					"name": "arrow-up"
				},
				{
					"type": "anticon",
					"name": "backward"
				},
				{
					"type": "anticon",
					"name": "bar-chart"
				},
				{
					"type": "anticon",
					"name": "bars"
				},
				{
					"type": "anticon",
					"name": "book"
				},
				{
					"type": "anticon",
					"name": "calculator"
				},
				{
					"type": "anticon",
					"name": "calendar"
				},
				{
					"type": "anticon",
					"name": "camera-o"
				},
				{
					"type": "anticon",
					"name": "camera"
				},
				{
					"type": "anticon",
					"name": "caret-circle-down"
				},
				{
					"type": "anticon",
					"name": "caret-circle-left"
				},
				{
					"type": "anticon",
					"name": "caret-circle-o-down"
				},
				{
					"type": "anticon",
					"name": "caret-circle-o-left"
				},
				{
					"type": "anticon",
					"name": "caret-circle-o-right"
				},
				{
					"type": "anticon",
					"name": "caret-circle-o-up"
				},
				{
					"type": "anticon",
					"name": "caret-circle-right"
				},
				{
					"type": "anticon",
					"name": "caret-circle-up"
				},
				{
					"type": "anticon",
					"name": "caret-down"
				},
				{
					"type": "anticon",
					"name": "caret-left"
				},
				{
					"type": "anticon",
					"name": "caret-right"
				},
				{
					"type": "anticon",
					"name": "caret-up"
				},
				{
					"type": "anticon",
					"name": "check-circle-o"
				},
				{
					"type": "anticon",
					"name": "check-circle"
				},
				{
					"type": "anticon",
					"name": "check"
				},
				{
					"type": "anticon",
					"name": "chrome"
				},
				{
					"type": "anticon",
					"name": "circle-down"
				},
				{
					"type": "anticon",
					"name": "circle-left"
				},
				{
					"type": "anticon",
					"name": "circle-o-down"
				},
				{
					"type": "anticon",
					"name": "circle-o-left"
				},
				{
					"type": "anticon",
					"name": "circle-o-right"
				},
				{
					"type": "anticon",
					"name": "circle-o-up"
				},
				{
					"type": "anticon",
					"name": "circle-right"
				},
				{
					"type": "anticon",
					"name": "circle-up"
				},
				{
					"type": "anticon",
					"name": "clock-circle-o"
				},
				{
					"type": "anticon",
					"name": "clock-circle"
				},
				{
					"type": "anticon",
					"name": "cloud-download-o"
				},
				{
					"type": "anticon",
					"name": "cloud-download"
				},
				{
					"type": "anticon",
					"name": "cloud-o"
				},
				{
					"type": "anticon",
					"name": "cloud-upload-o"
				},
				{
					"type": "anticon",
					"name": "cloud-upload"
				},
				{
					"type": "anticon",
					"name": "cloud"
				},
				{
					"type": "anticon",
					"name": "code"
				},
				{
					"type": "anticon",
					"name": "copy"
				},
				{
					"type": "anticon",
					"name": "credit-card"
				},
				{
					"type": "anticon",
					"name": "cross-circle-o"
				},
				{
					"type": "anticon",
					"name": "cross-circle"
				},
				{
					"type": "anticon",
					"name": "cross"
				},
				{
					"type": "anticon",
					"name": "customerservice"
				},
				{
					"type": "anticon",
					"name": "delete"
				},
				{
					"type": "anticon",
					"name": "desktop"
				},
				{
					"type": "anticon",
					"name": "dislike"
				},
				{
					"type": "anticon",
					"name": "double-left"
				},
				{
					"type": "anticon",
					"name": "double-right"
				},
				{
					"type": "anticon",
					"name": "down"
				},
				{
					"type": "anticon",
					"name": "download"
				},
				{
					"type": "anticon",
					"name": "edit"
				},
				{
					"type": "anticon",
					"name": "ellipsis"
				},
				{
					"type": "anticon",
					"name": "enter"
				},
				{
					"type": "anticon",
					"name": "environment-o"
				},
				{
					"type": "anticon",
					"name": "environment"
				},
				{
					"type": "anticon",
					"name": "exception"
				},
				{
					"type": "anticon",
					"name": "exclamation-circle-o"
				},
				{
					"type": "anticon",
					"name": "exclamation-circle"
				},
				{
					"type": "anticon",
					"name": "exclamation"
				},
				{
					"type": "anticon",
					"name": "export"
				},
				{
					"type": "anticon",
					"name": "eye-o"
				},
				{
					"type": "anticon",
					"name": "eye"
				},
				{
					"type": "anticon",
					"name": "fast-backward"
				},
				{
					"type": "anticon",
					"name": "fast-forward"
				},
				{
					"type": "anticon",
					"name": "file-excel"
				},
				{
					"type": "anticon",
					"name": "file-jpg"
				},
				{
					"type": "anticon",
					"name": "file-pdf"
				},
				{
					"type": "anticon",
					"name": "file-ppt"
				},
				{
					"type": "anticon",
					"name": "file-text"
				},
				{
					"type": "anticon",
					"name": "file-unknown"
				},
				{
					"type": "anticon",
					"name": "file"
				},
				{
					"type": "anticon",
					"name": "filter"
				},
				{
					"type": "anticon",
					"name": "folder-open"
				},
				{
					"type": "anticon",
					"name": "folder"
				},
				{
					"type": "anticon",
					"name": "forward"
				},
				{
					"type": "anticon",
					"name": "frown-circle"
				},
				{
					"type": "anticon",
					"name": "frown"
				},
				{
					"type": "anticon",
					"name": "github"
				},
				{
					"type": "anticon",
					"name": "hdd"
				},
				{
					"type": "anticon",
					"name": "heart-o"
				},
				{
					"type": "anticon",
					"name": "heart"
				},
				{
					"type": "anticon",
					"name": "home"
				},
				{
					"type": "anticon",
					"name": "ie"
				},
				{
					"type": "anticon",
					"name": "inbox"
				},
				{
					"type": "anticon",
					"name": "info-circle-o"
				},
				{
					"type": "anticon",
					"name": "info-circle"
				},
				{
					"type": "anticon",
					"name": "info"
				},
				{
					"type": "anticon",
					"name": "laptop"
				},
				{
					"type": "anticon",
					"name": "left"
				},
				{
					"type": "anticon",
					"name": "like"
				},
				{
					"type": "anticon",
					"name": "line-chart"
				},
				{
					"type": "anticon",
					"name": "link"
				},
				{
					"type": "anticon",
					"name": "lock"
				},
				{
					"type": "anticon",
					"name": "logout"
				},
				{
					"type": "anticon",
					"name": "mail"
				},
				{
					"type": "anticon",
					"name": "meh-circle"
				},
				{
					"type": "anticon",
					"name": "meh"
				},
				{
					"type": "anticon",
					"name": "menu-fold"
				},
				{
					"type": "anticon",
					"name": "menu-unfold"
				},
				{
					"type": "anticon",
					"name": "message"
				},
				{
					"type": "anticon",
					"name": "minus-circle-o"
				},
				{
					"type": "anticon",
					"name": "minus-circle"
				},
				{
					"type": "anticon",
					"name": "minus-square"
				},
				{
					"type": "anticon",
					"name": "minus"
				},
				{
					"type": "anticon",
					"name": "mobile"
				},
				{
					"type": "anticon",
					"name": "notification"
				},
				{
					"type": "anticon",
					"name": "paper-clip"
				},
				{
					"type": "anticon",
					"name": "pause-circle-o"
				},
				{
					"type": "anticon",
					"name": "pause-circle"
				},
				{
					"type": "anticon",
					"name": "pause"
				},
				{
					"type": "anticon",
					"name": "pay-circle-o"
				},
				{
					"type": "anticon",
					"name": "pay-circle"
				},
				{
					"type": "anticon",
					"name": "phone"
				},
				{
					"type": "anticon",
					"name": "picture"
				},
				{
					"type": "anticon",
					"name": "pie-chart"
				},
				{
					"type": "anticon",
					"name": "play-circle-o"
				},
				{
					"type": "anticon",
					"name": "play-circle"
				},
				{
					"type": "anticon",
					"name": "plus-circle-o"
				},
				{
					"type": "anticon",
					"name": "plus-circle"
				},
				{
					"type": "anticon",
					"name": "plus-square"
				},
				{
					"type": "anticon",
					"name": "plus"
				},
				{
					"type": "anticon",
					"name": "poweroff"
				},
				{
					"type": "anticon",
					"name": "pushpin-o"
				},
				{
					"type": "anticon",
					"name": "pushpin"
				},
				{
					"type": "anticon",
					"name": "qrcode"
				},
				{
					"type": "anticon",
					"name": "question-circle-o"
				},
				{
					"type": "anticon",
					"name": "question-circle"
				},
				{
					"type": "anticon",
					"name": "question"
				},
				{
					"type": "anticon",
					"name": "reload"
				},
				{
					"type": "anticon",
					"name": "retweet"
				},
				{
					"type": "anticon",
					"name": "right"
				},
				{
					"type": "anticon",
					"name": "rollback"
				},
				{
					"type": "anticon",
					"name": "save"
				},
				{
					"type": "anticon",
					"name": "scan"
				},
				{
					"type": "anticon",
					"name": "search"
				},
				{
					"type": "anticon",
					"name": "setting"
				},
				{
					"type": "anticon",
					"name": "share-alt"
				},
				{
					"type": "anticon",
					"name": "shopping-cart"
				},
				{
					"type": "anticon",
					"name": "shrink"
				},
				{
					"type": "anticon",
					"name": "smile-circle"
				},
				{
					"type": "anticon",
					"name": "smile"
				},
				{
					"type": "anticon",
					"name": "solution"
				},
				{
					"type": "anticon",
					"name": "star-o"
				},
				{
					"type": "anticon",
					"name": "star"
				},
				{
					"type": "anticon",
					"name": "step-backward"
				},
				{
					"type": "anticon",
					"name": "step-forward"
				},
				{
					"type": "anticon",
					"name": "swap-left"
				},
				{
					"type": "anticon",
					"name": "swap-right"
				},
				{
					"type": "anticon",
					"name": "swap"
				},
				{
					"type": "anticon",
					"name": "tablet"
				},
				{
					"type": "anticon",
					"name": "tag-o"
				},
				{
					"type": "anticon",
					"name": "tag"
				},
				{
					"type": "anticon",
					"name": "tags-o"
				},
				{
					"type": "anticon",
					"name": "tags"
				},
				{
					"type": "anticon",
					"name": "team"
				},
				{
					"type": "anticon",
					"name": "to-top"
				},
				{
					"type": "anticon",
					"name": "unlock"
				},
				{
					"type": "anticon",
					"name": "up"
				},
				{
					"type": "anticon",
					"name": "upload"
				},
				{
					"type": "anticon",
					"name": "user"
				},
				{
					"type": "anticon",
					"name": "verticle-left"
				},
				{
					"type": "anticon",
					"name": "verticle-right"
				},
				{
					"type": "anticon",
					"name": "video-camera"
				},
				{
					"type": "anticon",
					"name": "windows"
				}
			]
		},
		"glyphicon": {
			"name": "bootstrap",
			"prefix": "glyphicon-",
			"repo": "https://github.com/twbs/bootstrap.git",
			"icons": [
				{
					"type": "glyphicon",
					"name": "adjust"
				},
				{
					"type": "glyphicon",
					"name": "alert"
				},
				{
					"type": "glyphicon",
					"name": "align-center"
				},
				{
					"type": "glyphicon",
					"name": "align-justify"
				},
				{
					"type": "glyphicon",
					"name": "align-left"
				},
				{
					"type": "glyphicon",
					"name": "align-right"
				},
				{
					"type": "glyphicon",
					"name": "apple"
				},
				{
					"type": "glyphicon",
					"name": "arrow-down"
				},
				{
					"type": "glyphicon",
					"name": "arrow-left"
				},
				{
					"type": "glyphicon",
					"name": "arrow-right"
				},
				{
					"type": "glyphicon",
					"name": "arrow-up"
				},
				{
					"type": "glyphicon",
					"name": "asterisk"
				},
				{
					"type": "glyphicon",
					"name": "baby-formula"
				},
				{
					"type": "glyphicon",
					"name": "backward"
				},
				{
					"type": "glyphicon",
					"name": "ban-circle"
				},
				{
					"type": "glyphicon",
					"name": "barcode"
				},
				{
					"type": "glyphicon",
					"name": "bed"
				},
				{
					"type": "glyphicon",
					"name": "bell"
				},
				{
					"type": "glyphicon",
					"name": "bishop"
				},
				{
					"type": "glyphicon",
					"name": "bitcoin"
				},
				{
					"type": "glyphicon",
					"name": "blackboard"
				},
				{
					"type": "glyphicon",
					"name": "bold"
				},
				{
					"type": "glyphicon",
					"name": "book"
				},
				{
					"type": "glyphicon",
					"name": "bookmark"
				},
				{
					"type": "glyphicon",
					"name": "briefcase"
				},
				{
					"type": "glyphicon",
					"name": "bullhorn"
				},
				{
					"type": "glyphicon",
					"name": "calendar"
				},
				{
					"type": "glyphicon",
					"name": "camera"
				},
				{
					"type": "glyphicon",
					"name": "cd"
				},
				{
					"type": "glyphicon",
					"name": "certificate"
				},
				{
					"type": "glyphicon",
					"name": "check"
				},
				{
					"type": "glyphicon",
					"name": "chevron-down"
				},
				{
					"type": "glyphicon",
					"name": "chevron-left"
				},
				{
					"type": "glyphicon",
					"name": "chevron-right"
				},
				{
					"type": "glyphicon",
					"name": "chevron-up"
				},
				{
					"type": "glyphicon",
					"name": "circle-arrow-down"
				},
				{
					"type": "glyphicon",
					"name": "circle-arrow-left"
				},
				{
					"type": "glyphicon",
					"name": "circle-arrow-right"
				},
				{
					"type": "glyphicon",
					"name": "circle-arrow-up"
				},
				{
					"type": "glyphicon",
					"name": "cloud-download"
				},
				{
					"type": "glyphicon",
					"name": "cloud-upload"
				},
				{
					"type": "glyphicon",
					"name": "cloud"
				},
				{
					"type": "glyphicon",
					"name": "cog"
				},
				{
					"type": "glyphicon",
					"name": "collapse-down"
				},
				{
					"type": "glyphicon",
					"name": "collapse-up"
				},
				{
					"type": "glyphicon",
					"name": "comment"
				},
				{
					"type": "glyphicon",
					"name": "compressed"
				},
				{
					"type": "glyphicon",
					"name": "console"
				},
				{
					"type": "glyphicon",
					"name": "copy"
				},
				{
					"type": "glyphicon",
					"name": "copyright-mark"
				},
				{
					"type": "glyphicon",
					"name": "credit-card"
				},
				{
					"type": "glyphicon",
					"name": "cutlery"
				},
				{
					"type": "glyphicon",
					"name": "dashboard"
				},
				{
					"type": "glyphicon",
					"name": "door"
				},
				{
					"type": "glyphicon",
					"name": "download-alt"
				},
				{
					"type": "glyphicon",
					"name": "download"
				},
				{
					"type": "glyphicon",
					"name": "duplicate"
				},
				{
					"type": "glyphicon",
					"name": "earphone"
				},
				{
					"type": "glyphicon",
					"name": "edit"
				},
				{
					"type": "glyphicon",
					"name": "education"
				},
				{
					"type": "glyphicon",
					"name": "eject"
				},
				{
					"type": "glyphicon",
					"name": "envelope"
				},
				{
					"type": "glyphicon",
					"name": "equalizer"
				},
				{
					"type": "glyphicon",
					"name": "erase"
				},
				{
					"type": "glyphicon",
					"name": "eur"
				},
				{
					"type": "glyphicon",
					"name": "exclamation-sign"
				},
				{
					"type": "glyphicon",
					"name": "expand"
				},
				{
					"type": "glyphicon",
					"name": "export"
				},
				{
					"type": "glyphicon",
					"name": "eye-close"
				},
				{
					"type": "glyphicon",
					"name": "eye-open"
				},
				{
					"type": "glyphicon",
					"name": "facetime-video"
				},
				{
					"type": "glyphicon",
					"name": "fast-backward"
				},
				{
					"type": "glyphicon",
					"name": "fast-forward"
				},
				{
					"type": "glyphicon",
					"name": "file"
				},
				{
					"type": "glyphicon",
					"name": "film"
				},
				{
					"type": "glyphicon",
					"name": "filter"
				},
				{
					"type": "glyphicon",
					"name": "fire"
				},
				{
					"type": "glyphicon",
					"name": "flag"
				},
				{
					"type": "glyphicon",
					"name": "flash"
				},
				{
					"type": "glyphicon",
					"name": "floppy-disk"
				},
				{
					"type": "glyphicon",
					"name": "floppy-open"
				},
				{
					"type": "glyphicon",
					"name": "floppy-remove"
				},
				{
					"type": "glyphicon",
					"name": "floppy-save"
				},
				{
					"type": "glyphicon",
					"name": "floppy-saved"
				},
				{
					"type": "glyphicon",
					"name": "folder-close"
				},
				{
					"type": "glyphicon",
					"name": "folder-open"
				},
				{
					"type": "glyphicon",
					"name": "font"
				},
				{
					"type": "glyphicon",
					"name": "forward"
				},
				{
					"type": "glyphicon",
					"name": "fullscreen"
				},
				{
					"type": "glyphicon",
					"name": "gbp"
				},
				{
					"type": "glyphicon",
					"name": "gift"
				},
				{
					"type": "glyphicon",
					"name": "glass"
				},
				{
					"type": "glyphicon",
					"name": "globe"
				},
				{
					"type": "glyphicon",
					"name": "grain"
				},
				{
					"type": "glyphicon",
					"name": "hand-down"
				},
				{
					"type": "glyphicon",
					"name": "hand-left"
				},
				{
					"type": "glyphicon",
					"name": "hand-right"
				},
				{
					"type": "glyphicon",
					"name": "hand-up"
				},
				{
					"type": "glyphicon",
					"name": "hd-video"
				},
				{
					"type": "glyphicon",
					"name": "hdd"
				},
				{
					"type": "glyphicon",
					"name": "header"
				},
				{
					"type": "glyphicon",
					"name": "headphones"
				},
				{
					"type": "glyphicon",
					"name": "heart-empty"
				},
				{
					"type": "glyphicon",
					"name": "heart"
				},
				{
					"type": "glyphicon",
					"name": "home"
				},
				{
					"type": "glyphicon",
					"name": "hourglass"
				},
				{
					"type": "glyphicon",
					"name": "ice-lolly-tasted"
				},
				{
					"type": "glyphicon",
					"name": "ice-lolly"
				},
				{
					"type": "glyphicon",
					"name": "import"
				},
				{
					"type": "glyphicon",
					"name": "inbox"
				},
				{
					"type": "glyphicon",
					"name": "indent-left"
				},
				{
					"type": "glyphicon",
					"name": "indent-right"
				},
				{
					"type": "glyphicon",
					"name": "info-sign"
				},
				{
					"type": "glyphicon",
					"name": "italic"
				},
				{
					"type": "glyphicon",
					"name": "key"
				},
				{
					"type": "glyphicon",
					"name": "king"
				},
				{
					"type": "glyphicon",
					"name": "knight"
				},
				{
					"type": "glyphicon",
					"name": "lamp"
				},
				{
					"type": "glyphicon",
					"name": "leaf"
				},
				{
					"type": "glyphicon",
					"name": "level-up"
				},
				{
					"type": "glyphicon",
					"name": "link"
				},
				{
					"type": "glyphicon",
					"name": "list-alt"
				},
				{
					"type": "glyphicon",
					"name": "list"
				},
				{
					"type": "glyphicon",
					"name": "lock"
				},
				{
					"type": "glyphicon",
					"name": "log-in"
				},
				{
					"type": "glyphicon",
					"name": "log-out"
				},
				{
					"type": "glyphicon",
					"name": "magnet"
				},
				{
					"type": "glyphicon",
					"name": "map-marker"
				},
				{
					"type": "glyphicon",
					"name": "menu-down"
				},
				{
					"type": "glyphicon",
					"name": "menu-hamburger"
				},
				{
					"type": "glyphicon",
					"name": "menu-left"
				},
				{
					"type": "glyphicon",
					"name": "menu-right"
				},
				{
					"type": "glyphicon",
					"name": "menu-up"
				},
				{
					"type": "glyphicon",
					"name": "minus-sign"
				},
				{
					"type": "glyphicon",
					"name": "minus"
				},
				{
					"type": "glyphicon",
					"name": "modal-window"
				},
				{
					"type": "glyphicon",
					"name": "move"
				},
				{
					"type": "glyphicon",
					"name": "music"
				},
				{
					"type": "glyphicon",
					"name": "new-window"
				},
				{
					"type": "glyphicon",
					"name": "object-align-bottom"
				},
				{
					"type": "glyphicon",
					"name": "object-align-horizontal"
				},
				{
					"type": "glyphicon",
					"name": "object-align-left"
				},
				{
					"type": "glyphicon",
					"name": "object-align-right"
				},
				{
					"type": "glyphicon",
					"name": "object-align-top"
				},
				{
					"type": "glyphicon",
					"name": "object-align-vertical"
				},
				{
					"type": "glyphicon",
					"name": "off"
				},
				{
					"type": "glyphicon",
					"name": "oil"
				},
				{
					"type": "glyphicon",
					"name": "ok-circle"
				},
				{
					"type": "glyphicon",
					"name": "ok-sign"
				},
				{
					"type": "glyphicon",
					"name": "ok"
				},
				{
					"type": "glyphicon",
					"name": "open-file"
				},
				{
					"type": "glyphicon",
					"name": "open"
				},
				{
					"type": "glyphicon",
					"name": "option-horizontal"
				},
				{
					"type": "glyphicon",
					"name": "option-vertical"
				},
				{
					"type": "glyphicon",
					"name": "paperclip"
				},
				{
					"type": "glyphicon",
					"name": "paste"
				},
				{
					"type": "glyphicon",
					"name": "pause"
				},
				{
					"type": "glyphicon",
					"name": "pawn"
				},
				{
					"type": "glyphicon",
					"name": "pencil"
				},
				{
					"type": "glyphicon",
					"name": "phone-alt"
				},
				{
					"type": "glyphicon",
					"name": "phone"
				},
				{
					"type": "glyphicon",
					"name": "picture"
				},
				{
					"type": "glyphicon",
					"name": "piggy-bank"
				},
				{
					"type": "glyphicon",
					"name": "plane"
				},
				{
					"type": "glyphicon",
					"name": "play-circle"
				},
				{
					"type": "glyphicon",
					"name": "play"
				},
				{
					"type": "glyphicon",
					"name": "plus-sign"
				},
				{
					"type": "glyphicon",
					"name": "plus"
				},
				{
					"type": "glyphicon",
					"name": "print"
				},
				{
					"type": "glyphicon",
					"name": "pushpin"
				},
				{
					"type": "glyphicon",
					"name": "qrcode"
				},
				{
					"type": "glyphicon",
					"name": "queen"
				},
				{
					"type": "glyphicon",
					"name": "question-sign"
				},
				{
					"type": "glyphicon",
					"name": "random"
				},
				{
					"type": "glyphicon",
					"name": "record"
				},
				{
					"type": "glyphicon",
					"name": "refresh"
				},
				{
					"type": "glyphicon",
					"name": "registration-mark"
				},
				{
					"type": "glyphicon",
					"name": "remove-circle"
				},
				{
					"type": "glyphicon",
					"name": "remove-sign"
				},
				{
					"type": "glyphicon",
					"name": "remove"
				},
				{
					"type": "glyphicon",
					"name": "repeat"
				},
				{
					"type": "glyphicon",
					"name": "resize-full"
				},
				{
					"type": "glyphicon",
					"name": "resize-horizontal"
				},
				{
					"type": "glyphicon",
					"name": "resize-small"
				},
				{
					"type": "glyphicon",
					"name": "resize-vertical"
				},
				{
					"type": "glyphicon",
					"name": "retweet"
				},
				{
					"type": "glyphicon",
					"name": "road"
				},
				{
					"type": "glyphicon",
					"name": "ruble"
				},
				{
					"type": "glyphicon",
					"name": "save-file"
				},
				{
					"type": "glyphicon",
					"name": "save"
				},
				{
					"type": "glyphicon",
					"name": "saved"
				},
				{
					"type": "glyphicon",
					"name": "scale"
				},
				{
					"type": "glyphicon",
					"name": "scissors"
				},
				{
					"type": "glyphicon",
					"name": "screenshot"
				},
				{
					"type": "glyphicon",
					"name": "sd-video"
				},
				{
					"type": "glyphicon",
					"name": "search"
				},
				{
					"type": "glyphicon",
					"name": "send"
				},
				{
					"type": "glyphicon",
					"name": "share-alt"
				},
				{
					"type": "glyphicon",
					"name": "share"
				},
				{
					"type": "glyphicon",
					"name": "shopping-cart"
				},
				{
					"type": "glyphicon",
					"name": "signal"
				},
				{
					"type": "glyphicon",
					"name": "sort-by-alphabet-alt"
				},
				{
					"type": "glyphicon",
					"name": "sort-by-alphabet"
				},
				{
					"type": "glyphicon",
					"name": "sort-by-attributes-alt"
				},
				{
					"type": "glyphicon",
					"name": "sort-by-attributes"
				},
				{
					"type": "glyphicon",
					"name": "sort-by-order-alt"
				},
				{
					"type": "glyphicon",
					"name": "sort-by-order"
				},
				{
					"type": "glyphicon",
					"name": "sort"
				},
				{
					"type": "glyphicon",
					"name": "sound-5-1"
				},
				{
					"type": "glyphicon",
					"name": "sound-6-1"
				},
				{
					"type": "glyphicon",
					"name": "sound-7-1"
				},
				{
					"type": "glyphicon",
					"name": "sound-dolby"
				},
				{
					"type": "glyphicon",
					"name": "sound-stereo"
				},
				{
					"type": "glyphicon",
					"name": "star-empty"
				},
				{
					"type": "glyphicon",
					"name": "star"
				},
				{
					"type": "glyphicon",
					"name": "stats"
				},
				{
					"type": "glyphicon",
					"name": "step-backward"
				},
				{
					"type": "glyphicon",
					"name": "step-forward"
				},
				{
					"type": "glyphicon",
					"name": "stop"
				},
				{
					"type": "glyphicon",
					"name": "subscript"
				},
				{
					"type": "glyphicon",
					"name": "subtitles"
				},
				{
					"type": "glyphicon",
					"name": "sunglasses"
				},
				{
					"type": "glyphicon",
					"name": "superscript"
				},
				{
					"type": "glyphicon",
					"name": "tag"
				},
				{
					"type": "glyphicon",
					"name": "tags"
				},
				{
					"type": "glyphicon",
					"name": "tasks"
				},
				{
					"type": "glyphicon",
					"name": "tent"
				},
				{
					"type": "glyphicon",
					"name": "text-background"
				},
				{
					"type": "glyphicon",
					"name": "text-color"
				},
				{
					"type": "glyphicon",
					"name": "text-height"
				},
				{
					"type": "glyphicon",
					"name": "text-size"
				},
				{
					"type": "glyphicon",
					"name": "text-width"
				},
				{
					"type": "glyphicon",
					"name": "th-large"
				},
				{
					"type": "glyphicon",
					"name": "th-list"
				},
				{
					"type": "glyphicon",
					"name": "th"
				},
				{
					"type": "glyphicon",
					"name": "thumbs-down"
				},
				{
					"type": "glyphicon",
					"name": "thumbs-up"
				},
				{
					"type": "glyphicon",
					"name": "time"
				},
				{
					"type": "glyphicon",
					"name": "tint"
				},
				{
					"type": "glyphicon",
					"name": "tower"
				},
				{
					"type": "glyphicon",
					"name": "transfer"
				},
				{
					"type": "glyphicon",
					"name": "trash"
				},
				{
					"type": "glyphicon",
					"name": "tree-conifer"
				},
				{
					"type": "glyphicon",
					"name": "tree-deciduous"
				},
				{
					"type": "glyphicon",
					"name": "triangle-bottom"
				},
				{
					"type": "glyphicon",
					"name": "triangle-left"
				},
				{
					"type": "glyphicon",
					"name": "triangle-right"
				},
				{
					"type": "glyphicon",
					"name": "triangle-top"
				},
				{
					"type": "glyphicon",
					"name": "unchecked"
				},
				{
					"type": "glyphicon",
					"name": "upload"
				},
				{
					"type": "glyphicon",
					"name": "usd"
				},
				{
					"type": "glyphicon",
					"name": "user"
				},
				{
					"type": "glyphicon",
					"name": "volume-down"
				},
				{
					"type": "glyphicon",
					"name": "volume-off"
				},
				{
					"type": "glyphicon",
					"name": "volume-up"
				},
				{
					"type": "glyphicon",
					"name": "warning-sign"
				},
				{
					"type": "glyphicon",
					"name": "wrench"
				},
				{
					"type": "glyphicon",
					"name": "yen"
				},
				{
					"type": "glyphicon",
					"name": "zoom-in"
				},
				{
					"type": "glyphicon",
					"name": "zoom-out"
				}
			]
		},
		"ei": {
			"name": "evil-icons",
			"prefix": "ei-",
			"repo": "https://github.com/outpunk/evil-icons.git",
			"icons": [
				{
					"type": "ei",
					"name": "archive"
				},
				{
					"type": "ei",
					"name": "arrow-down"
				},
				{
					"type": "ei",
					"name": "arrow-left"
				},
				{
					"type": "ei",
					"name": "arrow-right"
				},
				{
					"type": "ei",
					"name": "arrow-up"
				},
				{
					"type": "ei",
					"name": "bell"
				},
				{
					"type": "ei",
					"name": "calendar"
				},
				{
					"type": "ei",
					"name": "camera"
				},
				{
					"type": "ei",
					"name": "cart"
				},
				{
					"type": "ei",
					"name": "chart"
				},
				{
					"type": "ei",
					"name": "check"
				},
				{
					"type": "ei",
					"name": "chevron-down"
				},
				{
					"type": "ei",
					"name": "chevron-left"
				},
				{
					"type": "ei",
					"name": "chevron-right"
				},
				{
					"type": "ei",
					"name": "chevron-up"
				},
				{
					"type": "ei",
					"name": "clock"
				},
				{
					"type": "ei",
					"name": "close-o"
				},
				{
					"type": "ei",
					"name": "close"
				},
				{
					"type": "ei",
					"name": "comment"
				},
				{
					"type": "ei",
					"name": "credit-card"
				},
				{
					"type": "ei",
					"name": "envelope"
				},
				{
					"type": "ei",
					"name": "exclamation"
				},
				{
					"type": "ei",
					"name": "external-link"
				},
				{
					"type": "ei",
					"name": "eye"
				},
				{
					"type": "ei",
					"name": "gear"
				},
				{
					"type": "ei",
					"name": "heart"
				},
				{
					"type": "ei",
					"name": "image"
				},
				{
					"type": "ei",
					"name": "like"
				},
				{
					"type": "ei",
					"name": "link"
				},
				{
					"type": "ei",
					"name": "location"
				},
				{
					"type": "ei",
					"name": "lock"
				},
				{
					"type": "ei",
					"name": "minus"
				},
				{
					"type": "ei",
					"name": "navicon"
				},
				{
					"type": "ei",
					"name": "paperclip"
				},
				{
					"type": "ei",
					"name": "pencil"
				},
				{
					"type": "ei",
					"name": "play"
				},
				{
					"type": "ei",
					"name": "plus"
				},
				{
					"type": "ei",
					"name": "pointer"
				},
				{
					"type": "ei",
					"name": "question"
				},
				{
					"type": "ei",
					"name": "redo"
				},
				{
					"type": "ei",
					"name": "refresh"
				},
				{
					"type": "ei",
					"name": "retweet"
				},
				{
					"type": "ei",
					"name": "sc-facebook"
				},
				{
					"type": "ei",
					"name": "sc-github"
				},
				{
					"type": "ei",
					"name": "sc-google-plus"
				},
				{
					"type": "ei",
					"name": "sc-instagram"
				},
				{
					"type": "ei",
					"name": "sc-linkedin"
				},
				{
					"type": "ei",
					"name": "sc-odnoklassniki"
				},
				{
					"type": "ei",
					"name": "sc-pinterest"
				},
				{
					"type": "ei",
					"name": "sc-skype"
				},
				{
					"type": "ei",
					"name": "sc-soundcloud"
				},
				{
					"type": "ei",
					"name": "sc-telegram"
				},
				{
					"type": "ei",
					"name": "sc-tumblr"
				},
				{
					"type": "ei",
					"name": "sc-twitter"
				},
				{
					"type": "ei",
					"name": "sc-vimeo"
				},
				{
					"type": "ei",
					"name": "sc-vk"
				},
				{
					"type": "ei",
					"name": "sc-youtube"
				},
				{
					"type": "ei",
					"name": "search"
				},
				{
					"type": "ei",
					"name": "share-apple"
				},
				{
					"type": "ei",
					"name": "share-google"
				},
				{
					"type": "ei",
					"name": "spinner-2"
				},
				{
					"type": "ei",
					"name": "spinner-3"
				},
				{
					"type": "ei",
					"name": "spinner"
				},
				{
					"type": "ei",
					"name": "star"
				},
				{
					"type": "ei",
					"name": "tag"
				},
				{
					"type": "ei",
					"name": "trash"
				},
				{
					"type": "ei",
					"name": "trophy"
				},
				{
					"type": "ei",
					"name": "undo"
				},
				{
					"type": "ei",
					"name": "unlock"
				},
				{
					"type": "ei",
					"name": "user"
				}
			]
		},
		"fi": {
			"name": "flag-icon",
			"prefix": "fi-",
			"repo": "https://github.com/lipis/flag-icon-css.git",
			"icons": [
				{
					"type": "fi",
					"name": "ad"
				},
				{
					"type": "fi",
					"name": "ae"
				},
				{
					"type": "fi",
					"name": "af"
				},
				{
					"type": "fi",
					"name": "ag"
				},
				{
					"type": "fi",
					"name": "ai"
				},
				{
					"type": "fi",
					"name": "al"
				},
				{
					"type": "fi",
					"name": "am"
				},
				{
					"type": "fi",
					"name": "ao"
				},
				{
					"type": "fi",
					"name": "aq"
				},
				{
					"type": "fi",
					"name": "ar"
				},
				{
					"type": "fi",
					"name": "as"
				},
				{
					"type": "fi",
					"name": "at"
				},
				{
					"type": "fi",
					"name": "au"
				},
				{
					"type": "fi",
					"name": "aw"
				},
				{
					"type": "fi",
					"name": "ax"
				},
				{
					"type": "fi",
					"name": "az"
				},
				{
					"type": "fi",
					"name": "ba"
				},
				{
					"type": "fi",
					"name": "bb"
				},
				{
					"type": "fi",
					"name": "bd"
				},
				{
					"type": "fi",
					"name": "be"
				},
				{
					"type": "fi",
					"name": "bf"
				},
				{
					"type": "fi",
					"name": "bg"
				},
				{
					"type": "fi",
					"name": "bh"
				},
				{
					"type": "fi",
					"name": "bi"
				},
				{
					"type": "fi",
					"name": "bj"
				},
				{
					"type": "fi",
					"name": "bl"
				},
				{
					"type": "fi",
					"name": "bm"
				},
				{
					"type": "fi",
					"name": "bn"
				},
				{
					"type": "fi",
					"name": "bo"
				},
				{
					"type": "fi",
					"name": "bq"
				},
				{
					"type": "fi",
					"name": "br"
				},
				{
					"type": "fi",
					"name": "bs"
				},
				{
					"type": "fi",
					"name": "bt"
				},
				{
					"type": "fi",
					"name": "bv"
				},
				{
					"type": "fi",
					"name": "bw"
				},
				{
					"type": "fi",
					"name": "by"
				},
				{
					"type": "fi",
					"name": "bz"
				},
				{
					"type": "fi",
					"name": "ca"
				},
				{
					"type": "fi",
					"name": "cc"
				},
				{
					"type": "fi",
					"name": "cd"
				},
				{
					"type": "fi",
					"name": "cf"
				},
				{
					"type": "fi",
					"name": "cg"
				},
				{
					"type": "fi",
					"name": "ch"
				},
				{
					"type": "fi",
					"name": "ci"
				},
				{
					"type": "fi",
					"name": "ck"
				},
				{
					"type": "fi",
					"name": "cl"
				},
				{
					"type": "fi",
					"name": "cm"
				},
				{
					"type": "fi",
					"name": "cn"
				},
				{
					"type": "fi",
					"name": "co"
				},
				{
					"type": "fi",
					"name": "cr"
				},
				{
					"type": "fi",
					"name": "cu"
				},
				{
					"type": "fi",
					"name": "cv"
				},
				{
					"type": "fi",
					"name": "cw"
				},
				{
					"type": "fi",
					"name": "cx"
				},
				{
					"type": "fi",
					"name": "cy"
				},
				{
					"type": "fi",
					"name": "cz"
				},
				{
					"type": "fi",
					"name": "de"
				},
				{
					"type": "fi",
					"name": "dj"
				},
				{
					"type": "fi",
					"name": "dk"
				},
				{
					"type": "fi",
					"name": "dm"
				},
				{
					"type": "fi",
					"name": "do"
				},
				{
					"type": "fi",
					"name": "dz"
				},
				{
					"type": "fi",
					"name": "ec"
				},
				{
					"type": "fi",
					"name": "ee"
				},
				{
					"type": "fi",
					"name": "eg"
				},
				{
					"type": "fi",
					"name": "eh"
				},
				{
					"type": "fi",
					"name": "er"
				},
				{
					"type": "fi",
					"name": "es"
				},
				{
					"type": "fi",
					"name": "et"
				},
				{
					"type": "fi",
					"name": "eu"
				},
				{
					"type": "fi",
					"name": "fi"
				},
				{
					"type": "fi",
					"name": "fj"
				},
				{
					"type": "fi",
					"name": "fk"
				},
				{
					"type": "fi",
					"name": "fm"
				},
				{
					"type": "fi",
					"name": "fo"
				},
				{
					"type": "fi",
					"name": "fr"
				},
				{
					"type": "fi",
					"name": "ga"
				},
				{
					"type": "fi",
					"name": "gb-eng"
				},
				{
					"type": "fi",
					"name": "gb-nir"
				},
				{
					"type": "fi",
					"name": "gb-sct"
				},
				{
					"type": "fi",
					"name": "gb-wls"
				},
				{
					"type": "fi",
					"name": "gb"
				},
				{
					"type": "fi",
					"name": "gd"
				},
				{
					"type": "fi",
					"name": "ge"
				},
				{
					"type": "fi",
					"name": "gf"
				},
				{
					"type": "fi",
					"name": "gg"
				},
				{
					"type": "fi",
					"name": "gh"
				},
				{
					"type": "fi",
					"name": "gi"
				},
				{
					"type": "fi",
					"name": "gl"
				},
				{
					"type": "fi",
					"name": "gm"
				},
				{
					"type": "fi",
					"name": "gn"
				},
				{
					"type": "fi",
					"name": "gp"
				},
				{
					"type": "fi",
					"name": "gq"
				},
				{
					"type": "fi",
					"name": "gr"
				},
				{
					"type": "fi",
					"name": "gs"
				},
				{
					"type": "fi",
					"name": "gt"
				},
				{
					"type": "fi",
					"name": "gu"
				},
				{
					"type": "fi",
					"name": "gw"
				},
				{
					"type": "fi",
					"name": "gy"
				},
				{
					"type": "fi",
					"name": "hk"
				},
				{
					"type": "fi",
					"name": "hm"
				},
				{
					"type": "fi",
					"name": "hn"
				},
				{
					"type": "fi",
					"name": "hr"
				},
				{
					"type": "fi",
					"name": "ht"
				},
				{
					"type": "fi",
					"name": "hu"
				},
				{
					"type": "fi",
					"name": "id"
				},
				{
					"type": "fi",
					"name": "ie"
				},
				{
					"type": "fi",
					"name": "il"
				},
				{
					"type": "fi",
					"name": "im"
				},
				{
					"type": "fi",
					"name": "in"
				},
				{
					"type": "fi",
					"name": "io"
				},
				{
					"type": "fi",
					"name": "iq"
				},
				{
					"type": "fi",
					"name": "ir"
				},
				{
					"type": "fi",
					"name": "is"
				},
				{
					"type": "fi",
					"name": "it"
				},
				{
					"type": "fi",
					"name": "je"
				},
				{
					"type": "fi",
					"name": "jm"
				},
				{
					"type": "fi",
					"name": "jo"
				},
				{
					"type": "fi",
					"name": "jp"
				},
				{
					"type": "fi",
					"name": "ke"
				},
				{
					"type": "fi",
					"name": "kg"
				},
				{
					"type": "fi",
					"name": "kh"
				},
				{
					"type": "fi",
					"name": "ki"
				},
				{
					"type": "fi",
					"name": "km"
				},
				{
					"type": "fi",
					"name": "kn"
				},
				{
					"type": "fi",
					"name": "kp"
				},
				{
					"type": "fi",
					"name": "kr"
				},
				{
					"type": "fi",
					"name": "kw"
				},
				{
					"type": "fi",
					"name": "ky"
				},
				{
					"type": "fi",
					"name": "kz"
				},
				{
					"type": "fi",
					"name": "la"
				},
				{
					"type": "fi",
					"name": "lb"
				},
				{
					"type": "fi",
					"name": "lc"
				},
				{
					"type": "fi",
					"name": "li"
				},
				{
					"type": "fi",
					"name": "lk"
				},
				{
					"type": "fi",
					"name": "lr"
				},
				{
					"type": "fi",
					"name": "ls"
				},
				{
					"type": "fi",
					"name": "lt"
				},
				{
					"type": "fi",
					"name": "lu"
				},
				{
					"type": "fi",
					"name": "lv"
				},
				{
					"type": "fi",
					"name": "ly"
				},
				{
					"type": "fi",
					"name": "ma"
				},
				{
					"type": "fi",
					"name": "mc"
				},
				{
					"type": "fi",
					"name": "md"
				},
				{
					"type": "fi",
					"name": "me"
				},
				{
					"type": "fi",
					"name": "mf"
				},
				{
					"type": "fi",
					"name": "mg"
				},
				{
					"type": "fi",
					"name": "mh"
				},
				{
					"type": "fi",
					"name": "mk"
				},
				{
					"type": "fi",
					"name": "ml"
				},
				{
					"type": "fi",
					"name": "mm"
				},
				{
					"type": "fi",
					"name": "mn"
				},
				{
					"type": "fi",
					"name": "mo"
				},
				{
					"type": "fi",
					"name": "mp"
				},
				{
					"type": "fi",
					"name": "mq"
				},
				{
					"type": "fi",
					"name": "mr"
				},
				{
					"type": "fi",
					"name": "ms"
				},
				{
					"type": "fi",
					"name": "mt"
				},
				{
					"type": "fi",
					"name": "mu"
				},
				{
					"type": "fi",
					"name": "mv"
				},
				{
					"type": "fi",
					"name": "mw"
				},
				{
					"type": "fi",
					"name": "mx"
				},
				{
					"type": "fi",
					"name": "my"
				},
				{
					"type": "fi",
					"name": "mz"
				},
				{
					"type": "fi",
					"name": "na"
				},
				{
					"type": "fi",
					"name": "nc"
				},
				{
					"type": "fi",
					"name": "ne"
				},
				{
					"type": "fi",
					"name": "nf"
				},
				{
					"type": "fi",
					"name": "ng"
				},
				{
					"type": "fi",
					"name": "ni"
				},
				{
					"type": "fi",
					"name": "nl"
				},
				{
					"type": "fi",
					"name": "no"
				},
				{
					"type": "fi",
					"name": "np"
				},
				{
					"type": "fi",
					"name": "nr"
				},
				{
					"type": "fi",
					"name": "nu"
				},
				{
					"type": "fi",
					"name": "nz"
				},
				{
					"type": "fi",
					"name": "om"
				},
				{
					"type": "fi",
					"name": "pa"
				},
				{
					"type": "fi",
					"name": "pe"
				},
				{
					"type": "fi",
					"name": "pf"
				},
				{
					"type": "fi",
					"name": "pg"
				},
				{
					"type": "fi",
					"name": "ph"
				},
				{
					"type": "fi",
					"name": "pk"
				},
				{
					"type": "fi",
					"name": "pl"
				},
				{
					"type": "fi",
					"name": "pm"
				},
				{
					"type": "fi",
					"name": "pn"
				},
				{
					"type": "fi",
					"name": "pr"
				},
				{
					"type": "fi",
					"name": "ps"
				},
				{
					"type": "fi",
					"name": "pt"
				},
				{
					"type": "fi",
					"name": "pw"
				},
				{
					"type": "fi",
					"name": "py"
				},
				{
					"type": "fi",
					"name": "qa"
				},
				{
					"type": "fi",
					"name": "re"
				},
				{
					"type": "fi",
					"name": "ro"
				},
				{
					"type": "fi",
					"name": "rs"
				},
				{
					"type": "fi",
					"name": "ru"
				},
				{
					"type": "fi",
					"name": "rw"
				},
				{
					"type": "fi",
					"name": "sa"
				},
				{
					"type": "fi",
					"name": "sb"
				},
				{
					"type": "fi",
					"name": "sc"
				},
				{
					"type": "fi",
					"name": "sd"
				},
				{
					"type": "fi",
					"name": "se"
				},
				{
					"type": "fi",
					"name": "sg"
				},
				{
					"type": "fi",
					"name": "sh"
				},
				{
					"type": "fi",
					"name": "si"
				},
				{
					"type": "fi",
					"name": "sj"
				},
				{
					"type": "fi",
					"name": "sk"
				},
				{
					"type": "fi",
					"name": "sl"
				},
				{
					"type": "fi",
					"name": "sm"
				},
				{
					"type": "fi",
					"name": "sn"
				},
				{
					"type": "fi",
					"name": "so"
				},
				{
					"type": "fi",
					"name": "sr"
				},
				{
					"type": "fi",
					"name": "ss"
				},
				{
					"type": "fi",
					"name": "st"
				},
				{
					"type": "fi",
					"name": "sv"
				},
				{
					"type": "fi",
					"name": "sx"
				},
				{
					"type": "fi",
					"name": "sy"
				},
				{
					"type": "fi",
					"name": "sz"
				},
				{
					"type": "fi",
					"name": "tc"
				},
				{
					"type": "fi",
					"name": "td"
				},
				{
					"type": "fi",
					"name": "tf"
				},
				{
					"type": "fi",
					"name": "tg"
				},
				{
					"type": "fi",
					"name": "th"
				},
				{
					"type": "fi",
					"name": "tj"
				},
				{
					"type": "fi",
					"name": "tk"
				},
				{
					"type": "fi",
					"name": "tl"
				},
				{
					"type": "fi",
					"name": "tm"
				},
				{
					"type": "fi",
					"name": "tn"
				},
				{
					"type": "fi",
					"name": "to"
				},
				{
					"type": "fi",
					"name": "tr"
				},
				{
					"type": "fi",
					"name": "tt"
				},
				{
					"type": "fi",
					"name": "tv"
				},
				{
					"type": "fi",
					"name": "tw"
				},
				{
					"type": "fi",
					"name": "tz"
				},
				{
					"type": "fi",
					"name": "ua"
				},
				{
					"type": "fi",
					"name": "ug"
				},
				{
					"type": "fi",
					"name": "um"
				},
				{
					"type": "fi",
					"name": "un"
				},
				{
					"type": "fi",
					"name": "us"
				},
				{
					"type": "fi",
					"name": "uy"
				},
				{
					"type": "fi",
					"name": "uz"
				},
				{
					"type": "fi",
					"name": "va"
				},
				{
					"type": "fi",
					"name": "vc"
				},
				{
					"type": "fi",
					"name": "ve"
				},
				{
					"type": "fi",
					"name": "vg"
				},
				{
					"type": "fi",
					"name": "vi"
				},
				{
					"type": "fi",
					"name": "vn"
				},
				{
					"type": "fi",
					"name": "vu"
				},
				{
					"type": "fi",
					"name": "wf"
				},
				{
					"type": "fi",
					"name": "ws"
				},
				{
					"type": "fi",
					"name": "ye"
				},
				{
					"type": "fi",
					"name": "yt"
				},
				{
					"type": "fi",
					"name": "za"
				},
				{
					"type": "fi",
					"name": "zm"
				},
				{
					"type": "fi",
					"name": "zw"
				},
				{
					"type": "fi",
					"name": "zz"
				}
			]
		},
		"fa": {
			"name": "font-awesome",
			"prefix": "fa-",
			"repo": "https://github.com/FortAwesome/Font-Awesome.git",
			"icons": [
				{
					"type": "fa",
					"name": "500px"
				},
				{
					"type": "fa",
					"name": "adjust"
				},
				{
					"type": "fa",
					"name": "adn"
				},
				{
					"type": "fa",
					"name": "align-center"
				},
				{
					"type": "fa",
					"name": "align-justify"
				},
				{
					"type": "fa",
					"name": "align-left"
				},
				{
					"type": "fa",
					"name": "align-right"
				},
				{
					"type": "fa",
					"name": "amazon"
				},
				{
					"type": "fa",
					"name": "ambulance"
				},
				{
					"type": "fa",
					"name": "american-sign-language-interpreting"
				},
				{
					"type": "fa",
					"name": "anchor"
				},
				{
					"type": "fa",
					"name": "android"
				},
				{
					"type": "fa",
					"name": "angellist"
				},
				{
					"type": "fa",
					"name": "angle-double-down"
				},
				{
					"type": "fa",
					"name": "angle-double-left"
				},
				{
					"type": "fa",
					"name": "angle-double-right"
				},
				{
					"type": "fa",
					"name": "angle-double-up"
				},
				{
					"type": "fa",
					"name": "angle-down"
				},
				{
					"type": "fa",
					"name": "angle-left"
				},
				{
					"type": "fa",
					"name": "angle-right"
				},
				{
					"type": "fa",
					"name": "angle-up"
				},
				{
					"type": "fa",
					"name": "apple"
				},
				{
					"type": "fa",
					"name": "archive"
				},
				{
					"type": "fa",
					"name": "area-chart"
				},
				{
					"type": "fa",
					"name": "arrow-circle-down"
				},
				{
					"type": "fa",
					"name": "arrow-circle-left"
				},
				{
					"type": "fa",
					"name": "arrow-circle-o-down"
				},
				{
					"type": "fa",
					"name": "arrow-circle-o-left"
				},
				{
					"type": "fa",
					"name": "arrow-circle-o-right"
				},
				{
					"type": "fa",
					"name": "arrow-circle-o-up"
				},
				{
					"type": "fa",
					"name": "arrow-circle-right"
				},
				{
					"type": "fa",
					"name": "arrow-circle-up"
				},
				{
					"type": "fa",
					"name": "arrow-down"
				},
				{
					"type": "fa",
					"name": "arrow-left"
				},
				{
					"type": "fa",
					"name": "arrow-right"
				},
				{
					"type": "fa",
					"name": "arrow-up"
				},
				{
					"type": "fa",
					"name": "arrows-alt"
				},
				{
					"type": "fa",
					"name": "arrows-h"
				},
				{
					"type": "fa",
					"name": "arrows-v"
				},
				{
					"type": "fa",
					"name": "arrows"
				},
				{
					"type": "fa",
					"name": "asl-interpreting"
				},
				{
					"type": "fa",
					"name": "assistive-listening-systems"
				},
				{
					"type": "fa",
					"name": "asterisk"
				},
				{
					"type": "fa",
					"name": "at"
				},
				{
					"type": "fa",
					"name": "audio-description"
				},
				{
					"type": "fa",
					"name": "automobile"
				},
				{
					"type": "fa",
					"name": "backward"
				},
				{
					"type": "fa",
					"name": "balance-scale"
				},
				{
					"type": "fa",
					"name": "ban"
				},
				{
					"type": "fa",
					"name": "bank"
				},
				{
					"type": "fa",
					"name": "bar-chart"
				},
				{
					"type": "fa",
					"name": "barcode"
				},
				{
					"type": "fa",
					"name": "bars"
				},
				{
					"type": "fa",
					"name": "battery-0"
				},
				{
					"type": "fa",
					"name": "battery-1"
				},
				{
					"type": "fa",
					"name": "battery-2"
				},
				{
					"type": "fa",
					"name": "battery-3"
				},
				{
					"type": "fa",
					"name": "battery-4"
				},
				{
					"type": "fa",
					"name": "battery-full"
				},
				{
					"type": "fa",
					"name": "battery-quarter"
				},
				{
					"type": "fa",
					"name": "bed"
				},
				{
					"type": "fa",
					"name": "beer"
				},
				{
					"type": "fa",
					"name": "behance-square"
				},
				{
					"type": "fa",
					"name": "behance"
				},
				{
					"type": "fa",
					"name": "bell-o"
				},
				{
					"type": "fa",
					"name": "bell-slash-o"
				},
				{
					"type": "fa",
					"name": "bell-slash"
				},
				{
					"type": "fa",
					"name": "bell"
				},
				{
					"type": "fa",
					"name": "bicycle"
				},
				{
					"type": "fa",
					"name": "binoculars"
				},
				{
					"type": "fa",
					"name": "birthday-cake"
				},
				{
					"type": "fa",
					"name": "bitbucket-square"
				},
				{
					"type": "fa",
					"name": "bitbucket"
				},
				{
					"type": "fa",
					"name": "bitcoin"
				},
				{
					"type": "fa",
					"name": "black-tie"
				},
				{
					"type": "fa",
					"name": "blind"
				},
				{
					"type": "fa",
					"name": "bluetooth-b"
				},
				{
					"type": "fa",
					"name": "bluetooth"
				},
				{
					"type": "fa",
					"name": "bold"
				},
				{
					"type": "fa",
					"name": "bolt"
				},
				{
					"type": "fa",
					"name": "bomb"
				},
				{
					"type": "fa",
					"name": "book"
				},
				{
					"type": "fa",
					"name": "bookmark-o"
				},
				{
					"type": "fa",
					"name": "bookmark"
				},
				{
					"type": "fa",
					"name": "braille"
				},
				{
					"type": "fa",
					"name": "briefcase"
				},
				{
					"type": "fa",
					"name": "btc"
				},
				{
					"type": "fa",
					"name": "bug"
				},
				{
					"type": "fa",
					"name": "building-o"
				},
				{
					"type": "fa",
					"name": "building"
				},
				{
					"type": "fa",
					"name": "bullhorn"
				},
				{
					"type": "fa",
					"name": "bullseye"
				},
				{
					"type": "fa",
					"name": "bus"
				},
				{
					"type": "fa",
					"name": "buysellads"
				},
				{
					"type": "fa",
					"name": "cab"
				},
				{
					"type": "fa",
					"name": "calculator"
				},
				{
					"type": "fa",
					"name": "calendar-check-o"
				},
				{
					"type": "fa",
					"name": "calendar-minus-o"
				},
				{
					"type": "fa",
					"name": "calendar-o"
				},
				{
					"type": "fa",
					"name": "calendar-plus-o"
				},
				{
					"type": "fa",
					"name": "calendar-times-o"
				},
				{
					"type": "fa",
					"name": "calendar"
				},
				{
					"type": "fa",
					"name": "camera-retro"
				},
				{
					"type": "fa",
					"name": "camera"
				},
				{
					"type": "fa",
					"name": "car"
				},
				{
					"type": "fa",
					"name": "caret-down"
				},
				{
					"type": "fa",
					"name": "caret-left"
				},
				{
					"type": "fa",
					"name": "caret-right"
				},
				{
					"type": "fa",
					"name": "caret-square-o-down"
				},
				{
					"type": "fa",
					"name": "caret-square-o-left"
				},
				{
					"type": "fa",
					"name": "caret-square-o-right"
				},
				{
					"type": "fa",
					"name": "caret-square-o-up"
				},
				{
					"type": "fa",
					"name": "caret-up"
				},
				{
					"type": "fa",
					"name": "cart-arrow-down"
				},
				{
					"type": "fa",
					"name": "cart-plus"
				},
				{
					"type": "fa",
					"name": "cc-amex"
				},
				{
					"type": "fa",
					"name": "cc-diners-club"
				},
				{
					"type": "fa",
					"name": "cc-discover"
				},
				{
					"type": "fa",
					"name": "cc-jcb"
				},
				{
					"type": "fa",
					"name": "cc-mastercard"
				},
				{
					"type": "fa",
					"name": "cc-paypal"
				},
				{
					"type": "fa",
					"name": "cc-stripe"
				},
				{
					"type": "fa",
					"name": "cc-visa"
				},
				{
					"type": "fa",
					"name": "cc"
				},
				{
					"type": "fa",
					"name": "certificate"
				},
				{
					"type": "fa",
					"name": "chain-broken"
				},
				{
					"type": "fa",
					"name": "chain"
				},
				{
					"type": "fa",
					"name": "check-circle-o"
				},
				{
					"type": "fa",
					"name": "check-circle"
				},
				{
					"type": "fa",
					"name": "check-square-o"
				},
				{
					"type": "fa",
					"name": "check-square"
				},
				{
					"type": "fa",
					"name": "check"
				},
				{
					"type": "fa",
					"name": "chevron-circle-down"
				},
				{
					"type": "fa",
					"name": "chevron-circle-left"
				},
				{
					"type": "fa",
					"name": "chevron-circle-right"
				},
				{
					"type": "fa",
					"name": "chevron-circle-up"
				},
				{
					"type": "fa",
					"name": "chevron-down"
				},
				{
					"type": "fa",
					"name": "chevron-left"
				},
				{
					"type": "fa",
					"name": "chevron-right"
				},
				{
					"type": "fa",
					"name": "chevron-up"
				},
				{
					"type": "fa",
					"name": "child"
				},
				{
					"type": "fa",
					"name": "chrome"
				},
				{
					"type": "fa",
					"name": "circle-o-notch"
				},
				{
					"type": "fa",
					"name": "circle-o"
				},
				{
					"type": "fa",
					"name": "circle-thin"
				},
				{
					"type": "fa",
					"name": "circle"
				},
				{
					"type": "fa",
					"name": "clipboard"
				},
				{
					"type": "fa",
					"name": "clock-o"
				},
				{
					"type": "fa",
					"name": "clone"
				},
				{
					"type": "fa",
					"name": "close"
				},
				{
					"type": "fa",
					"name": "cloud-download"
				},
				{
					"type": "fa",
					"name": "cloud-upload"
				},
				{
					"type": "fa",
					"name": "cloud"
				},
				{
					"type": "fa",
					"name": "cny"
				},
				{
					"type": "fa",
					"name": "code-fork"
				},
				{
					"type": "fa",
					"name": "code"
				},
				{
					"type": "fa",
					"name": "codepen"
				},
				{
					"type": "fa",
					"name": "codiepie"
				},
				{
					"type": "fa",
					"name": "coffee"
				},
				{
					"type": "fa",
					"name": "cog"
				},
				{
					"type": "fa",
					"name": "cogs"
				},
				{
					"type": "fa",
					"name": "columns"
				},
				{
					"type": "fa",
					"name": "comment-o"
				},
				{
					"type": "fa",
					"name": "comment"
				},
				{
					"type": "fa",
					"name": "commenting-o"
				},
				{
					"type": "fa",
					"name": "commenting"
				},
				{
					"type": "fa",
					"name": "comments-o"
				},
				{
					"type": "fa",
					"name": "comments"
				},
				{
					"type": "fa",
					"name": "compass"
				},
				{
					"type": "fa",
					"name": "compress"
				},
				{
					"type": "fa",
					"name": "connectdevelop"
				},
				{
					"type": "fa",
					"name": "contao"
				},
				{
					"type": "fa",
					"name": "copy"
				},
				{
					"type": "fa",
					"name": "copyright"
				},
				{
					"type": "fa",
					"name": "creative-commons"
				},
				{
					"type": "fa",
					"name": "credit-card-alt"
				},
				{
					"type": "fa",
					"name": "credit-card"
				},
				{
					"type": "fa",
					"name": "crop"
				},
				{
					"type": "fa",
					"name": "crosshairs"
				},
				{
					"type": "fa",
					"name": "css3"
				},
				{
					"type": "fa",
					"name": "cube"
				},
				{
					"type": "fa",
					"name": "cubes"
				},
				{
					"type": "fa",
					"name": "cut"
				},
				{
					"type": "fa",
					"name": "cutlery"
				},
				{
					"type": "fa",
					"name": "dashboard"
				},
				{
					"type": "fa",
					"name": "dashcube"
				},
				{
					"type": "fa",
					"name": "database"
				},
				{
					"type": "fa",
					"name": "deaf"
				},
				{
					"type": "fa",
					"name": "deafness"
				},
				{
					"type": "fa",
					"name": "dedent"
				},
				{
					"type": "fa",
					"name": "delicious"
				},
				{
					"type": "fa",
					"name": "desktop"
				},
				{
					"type": "fa",
					"name": "deviantart"
				},
				{
					"type": "fa",
					"name": "diamond"
				},
				{
					"type": "fa",
					"name": "digg"
				},
				{
					"type": "fa",
					"name": "dollar"
				},
				{
					"type": "fa",
					"name": "dot-circle-o"
				},
				{
					"type": "fa",
					"name": "download"
				},
				{
					"type": "fa",
					"name": "dribbble"
				},
				{
					"type": "fa",
					"name": "dropbox"
				},
				{
					"type": "fa",
					"name": "drupal"
				},
				{
					"type": "fa",
					"name": "edge"
				},
				{
					"type": "fa",
					"name": "edit"
				},
				{
					"type": "fa",
					"name": "eject"
				},
				{
					"type": "fa",
					"name": "ellipsis-h"
				},
				{
					"type": "fa",
					"name": "ellipsis-v"
				},
				{
					"type": "fa",
					"name": "empire"
				},
				{
					"type": "fa",
					"name": "envelope-o"
				},
				{
					"type": "fa",
					"name": "envelope-square"
				},
				{
					"type": "fa",
					"name": "envelope"
				},
				{
					"type": "fa",
					"name": "envira"
				},
				{
					"type": "fa",
					"name": "eraser"
				},
				{
					"type": "fa",
					"name": "eur"
				},
				{
					"type": "fa",
					"name": "exchange"
				},
				{
					"type": "fa",
					"name": "exclamation-circle"
				},
				{
					"type": "fa",
					"name": "exclamation-triangle"
				},
				{
					"type": "fa",
					"name": "exclamation"
				},
				{
					"type": "fa",
					"name": "expand"
				},
				{
					"type": "fa",
					"name": "expeditedssl"
				},
				{
					"type": "fa",
					"name": "external-link-square"
				},
				{
					"type": "fa",
					"name": "external-link"
				},
				{
					"type": "fa",
					"name": "eye-slash"
				},
				{
					"type": "fa",
					"name": "eye"
				},
				{
					"type": "fa",
					"name": "eyedropper"
				},
				{
					"type": "fa",
					"name": "fa"
				},
				{
					"type": "fa",
					"name": "facebook-official"
				},
				{
					"type": "fa",
					"name": "facebook-square"
				},
				{
					"type": "fa",
					"name": "facebook"
				},
				{
					"type": "fa",
					"name": "fast-backward"
				},
				{
					"type": "fa",
					"name": "fast-forward"
				},
				{
					"type": "fa",
					"name": "fax"
				},
				{
					"type": "fa",
					"name": "feed"
				},
				{
					"type": "fa",
					"name": "female"
				},
				{
					"type": "fa",
					"name": "fighter-jet"
				},
				{
					"type": "fa",
					"name": "file-archive-o"
				},
				{
					"type": "fa",
					"name": "file-audio-o"
				},
				{
					"type": "fa",
					"name": "file-code-o"
				},
				{
					"type": "fa",
					"name": "file-excel-o"
				},
				{
					"type": "fa",
					"name": "file-image-o"
				},
				{
					"type": "fa",
					"name": "file-movie-o"
				},
				{
					"type": "fa",
					"name": "file-o"
				},
				{
					"type": "fa",
					"name": "file-pdf-o"
				},
				{
					"type": "fa",
					"name": "file-picture-o"
				},
				{
					"type": "fa",
					"name": "file-powerpoint-o"
				},
				{
					"type": "fa",
					"name": "file-sound-o"
				},
				{
					"type": "fa",
					"name": "file-text-o"
				},
				{
					"type": "fa",
					"name": "file-text"
				},
				{
					"type": "fa",
					"name": "file-word-o"
				},
				{
					"type": "fa",
					"name": "file"
				},
				{
					"type": "fa",
					"name": "files-o"
				},
				{
					"type": "fa",
					"name": "film"
				},
				{
					"type": "fa",
					"name": "filter"
				},
				{
					"type": "fa",
					"name": "fire-extinguisher"
				},
				{
					"type": "fa",
					"name": "fire"
				},
				{
					"type": "fa",
					"name": "firefox"
				},
				{
					"type": "fa",
					"name": "first-order"
				},
				{
					"type": "fa",
					"name": "flag-checkered"
				},
				{
					"type": "fa",
					"name": "flag-o"
				},
				{
					"type": "fa",
					"name": "flag"
				},
				{
					"type": "fa",
					"name": "flash"
				},
				{
					"type": "fa",
					"name": "flask"
				},
				{
					"type": "fa",
					"name": "flickr"
				},
				{
					"type": "fa",
					"name": "floppy-o"
				},
				{
					"type": "fa",
					"name": "folder-o"
				},
				{
					"type": "fa",
					"name": "folder-open-o"
				},
				{
					"type": "fa",
					"name": "folder-open"
				},
				{
					"type": "fa",
					"name": "folder"
				},
				{
					"type": "fa",
					"name": "font"
				},
				{
					"type": "fa",
					"name": "fonticons"
				},
				{
					"type": "fa",
					"name": "fort-awesome"
				},
				{
					"type": "fa",
					"name": "forumbee"
				},
				{
					"type": "fa",
					"name": "forward"
				},
				{
					"type": "fa",
					"name": "foursquare"
				},
				{
					"type": "fa",
					"name": "frown-o"
				},
				{
					"type": "fa",
					"name": "futbol-o"
				},
				{
					"type": "fa",
					"name": "gamepad"
				},
				{
					"type": "fa",
					"name": "gavel"
				},
				{
					"type": "fa",
					"name": "gbp"
				},
				{
					"type": "fa",
					"name": "ge"
				},
				{
					"type": "fa",
					"name": "gears"
				},
				{
					"type": "fa",
					"name": "genderless"
				},
				{
					"type": "fa",
					"name": "get-pocket"
				},
				{
					"type": "fa",
					"name": "gg-circle"
				},
				{
					"type": "fa",
					"name": "gg"
				},
				{
					"type": "fa",
					"name": "gift"
				},
				{
					"type": "fa",
					"name": "git-square"
				},
				{
					"type": "fa",
					"name": "git"
				},
				{
					"type": "fa",
					"name": "github-alt"
				},
				{
					"type": "fa",
					"name": "github-square"
				},
				{
					"type": "fa",
					"name": "github"
				},
				{
					"type": "fa",
					"name": "gitlab"
				},
				{
					"type": "fa",
					"name": "gittip"
				},
				{
					"type": "fa",
					"name": "glass"
				},
				{
					"type": "fa",
					"name": "glide-g"
				},
				{
					"type": "fa",
					"name": "glide"
				},
				{
					"type": "fa",
					"name": "globe"
				},
				{
					"type": "fa",
					"name": "google-plus-circle"
				},
				{
					"type": "fa",
					"name": "google-plus-official"
				},
				{
					"type": "fa",
					"name": "google-plus-square"
				},
				{
					"type": "fa",
					"name": "google-plus"
				},
				{
					"type": "fa",
					"name": "google-wallet"
				},
				{
					"type": "fa",
					"name": "google"
				},
				{
					"type": "fa",
					"name": "graduation-cap"
				},
				{
					"type": "fa",
					"name": "gratipay"
				},
				{
					"type": "fa",
					"name": "group"
				},
				{
					"type": "fa",
					"name": "h-square"
				},
				{
					"type": "fa",
					"name": "hacker-news"
				},
				{
					"type": "fa",
					"name": "hand-grab-o"
				},
				{
					"type": "fa",
					"name": "hand-lizard-o"
				},
				{
					"type": "fa",
					"name": "hand-o-down"
				},
				{
					"type": "fa",
					"name": "hand-o-left"
				},
				{
					"type": "fa",
					"name": "hand-o-right"
				},
				{
					"type": "fa",
					"name": "hand-o-up"
				},
				{
					"type": "fa",
					"name": "hand-paper-o"
				},
				{
					"type": "fa",
					"name": "hand-peace-o"
				},
				{
					"type": "fa",
					"name": "hand-pointer-o"
				},
				{
					"type": "fa",
					"name": "hand-scissors-o"
				},
				{
					"type": "fa",
					"name": "hand-spock-o"
				},
				{
					"type": "fa",
					"name": "hand-stop-o"
				},
				{
					"type": "fa",
					"name": "hashtag"
				},
				{
					"type": "fa",
					"name": "hdd-o"
				},
				{
					"type": "fa",
					"name": "header"
				},
				{
					"type": "fa",
					"name": "headphones"
				},
				{
					"type": "fa",
					"name": "heart-o"
				},
				{
					"type": "fa",
					"name": "heart"
				},
				{
					"type": "fa",
					"name": "heartbeat"
				},
				{
					"type": "fa",
					"name": "history"
				},
				{
					"type": "fa",
					"name": "home"
				},
				{
					"type": "fa",
					"name": "hospital-o"
				},
				{
					"type": "fa",
					"name": "hotel"
				},
				{
					"type": "fa",
					"name": "hourglass-1"
				},
				{
					"type": "fa",
					"name": "hourglass-2"
				},
				{
					"type": "fa",
					"name": "hourglass-3"
				},
				{
					"type": "fa",
					"name": "hourglass-half"
				},
				{
					"type": "fa",
					"name": "hourglass-o"
				},
				{
					"type": "fa",
					"name": "hourglass-start"
				},
				{
					"type": "fa",
					"name": "hourglass"
				},
				{
					"type": "fa",
					"name": "houzz"
				},
				{
					"type": "fa",
					"name": "html5"
				},
				{
					"type": "fa",
					"name": "i-cursor"
				},
				{
					"type": "fa",
					"name": "ils"
				},
				{
					"type": "fa",
					"name": "image"
				},
				{
					"type": "fa",
					"name": "inbox"
				},
				{
					"type": "fa",
					"name": "indent"
				},
				{
					"type": "fa",
					"name": "industry"
				},
				{
					"type": "fa",
					"name": "info-circle"
				},
				{
					"type": "fa",
					"name": "info"
				},
				{
					"type": "fa",
					"name": "inr"
				},
				{
					"type": "fa",
					"name": "instagram"
				},
				{
					"type": "fa",
					"name": "internet-explorer"
				},
				{
					"type": "fa",
					"name": "intersex"
				},
				{
					"type": "fa",
					"name": "ioxhost"
				},
				{
					"type": "fa",
					"name": "italic"
				},
				{
					"type": "fa",
					"name": "joomla"
				},
				{
					"type": "fa",
					"name": "jsfiddle"
				},
				{
					"type": "fa",
					"name": "key"
				},
				{
					"type": "fa",
					"name": "keyboard-o"
				},
				{
					"type": "fa",
					"name": "krw"
				},
				{
					"type": "fa",
					"name": "language"
				},
				{
					"type": "fa",
					"name": "laptop"
				},
				{
					"type": "fa",
					"name": "lastfm-square"
				},
				{
					"type": "fa",
					"name": "lastfm"
				},
				{
					"type": "fa",
					"name": "leaf"
				},
				{
					"type": "fa",
					"name": "leanpub"
				},
				{
					"type": "fa",
					"name": "legal"
				},
				{
					"type": "fa",
					"name": "lemon-o"
				},
				{
					"type": "fa",
					"name": "level-down"
				},
				{
					"type": "fa",
					"name": "level-up"
				},
				{
					"type": "fa",
					"name": "life-bouy"
				},
				{
					"type": "fa",
					"name": "life-ring"
				},
				{
					"type": "fa",
					"name": "lightbulb-o"
				},
				{
					"type": "fa",
					"name": "line-chart"
				},
				{
					"type": "fa",
					"name": "link"
				},
				{
					"type": "fa",
					"name": "linkedin-square"
				},
				{
					"type": "fa",
					"name": "linkedin"
				},
				{
					"type": "fa",
					"name": "linux"
				},
				{
					"type": "fa",
					"name": "list-alt"
				},
				{
					"type": "fa",
					"name": "list-ol"
				},
				{
					"type": "fa",
					"name": "list-ul"
				},
				{
					"type": "fa",
					"name": "list"
				},
				{
					"type": "fa",
					"name": "location-arrow"
				},
				{
					"type": "fa",
					"name": "lock"
				},
				{
					"type": "fa",
					"name": "long-arrow-down"
				},
				{
					"type": "fa",
					"name": "long-arrow-left"
				},
				{
					"type": "fa",
					"name": "long-arrow-right"
				},
				{
					"type": "fa",
					"name": "long-arrow-up"
				},
				{
					"type": "fa",
					"name": "low-vision"
				},
				{
					"type": "fa",
					"name": "magic"
				},
				{
					"type": "fa",
					"name": "magnet"
				},
				{
					"type": "fa",
					"name": "mail-forward"
				},
				{
					"type": "fa",
					"name": "mail-reply-all"
				},
				{
					"type": "fa",
					"name": "mail-reply"
				},
				{
					"type": "fa",
					"name": "male"
				},
				{
					"type": "fa",
					"name": "map-marker"
				},
				{
					"type": "fa",
					"name": "map-o"
				},
				{
					"type": "fa",
					"name": "map-pin"
				},
				{
					"type": "fa",
					"name": "map-signs"
				},
				{
					"type": "fa",
					"name": "map"
				},
				{
					"type": "fa",
					"name": "mars-double"
				},
				{
					"type": "fa",
					"name": "mars-stroke-h"
				},
				{
					"type": "fa",
					"name": "mars-stroke-v"
				},
				{
					"type": "fa",
					"name": "mars-stroke"
				},
				{
					"type": "fa",
					"name": "mars"
				},
				{
					"type": "fa",
					"name": "maxcdn"
				},
				{
					"type": "fa",
					"name": "meanpath"
				},
				{
					"type": "fa",
					"name": "medium"
				},
				{
					"type": "fa",
					"name": "medkit"
				},
				{
					"type": "fa",
					"name": "meh-o"
				},
				{
					"type": "fa",
					"name": "mercury"
				},
				{
					"type": "fa",
					"name": "microphone-slash"
				},
				{
					"type": "fa",
					"name": "microphone"
				},
				{
					"type": "fa",
					"name": "minus-circle"
				},
				{
					"type": "fa",
					"name": "minus-square-o"
				},
				{
					"type": "fa",
					"name": "minus-square"
				},
				{
					"type": "fa",
					"name": "minus"
				},
				{
					"type": "fa",
					"name": "mixcloud"
				},
				{
					"type": "fa",
					"name": "mobile"
				},
				{
					"type": "fa",
					"name": "modx"
				},
				{
					"type": "fa",
					"name": "money"
				},
				{
					"type": "fa",
					"name": "moon-o"
				},
				{
					"type": "fa",
					"name": "motorcycle"
				},
				{
					"type": "fa",
					"name": "mouse-pointer"
				},
				{
					"type": "fa",
					"name": "music"
				},
				{
					"type": "fa",
					"name": "neuter"
				},
				{
					"type": "fa",
					"name": "newspaper-o"
				},
				{
					"type": "fa",
					"name": "object-group"
				},
				{
					"type": "fa",
					"name": "object-ungroup"
				},
				{
					"type": "fa",
					"name": "odnoklassniki-square"
				},
				{
					"type": "fa",
					"name": "odnoklassniki"
				},
				{
					"type": "fa",
					"name": "opencart"
				},
				{
					"type": "fa",
					"name": "openid"
				},
				{
					"type": "fa",
					"name": "opera"
				},
				{
					"type": "fa",
					"name": "optin-monster"
				},
				{
					"type": "fa",
					"name": "outdent"
				},
				{
					"type": "fa",
					"name": "pagelines"
				},
				{
					"type": "fa",
					"name": "paint-brush"
				},
				{
					"type": "fa",
					"name": "paper-plane-o"
				},
				{
					"type": "fa",
					"name": "paper-plane"
				},
				{
					"type": "fa",
					"name": "paperclip"
				},
				{
					"type": "fa",
					"name": "paragraph"
				},
				{
					"type": "fa",
					"name": "pause-circle-o"
				},
				{
					"type": "fa",
					"name": "pause-circle"
				},
				{
					"type": "fa",
					"name": "pause"
				},
				{
					"type": "fa",
					"name": "paw"
				},
				{
					"type": "fa",
					"name": "paypal"
				},
				{
					"type": "fa",
					"name": "pencil-square"
				},
				{
					"type": "fa",
					"name": "pencil"
				},
				{
					"type": "fa",
					"name": "percent"
				},
				{
					"type": "fa",
					"name": "phone-square"
				},
				{
					"type": "fa",
					"name": "phone"
				},
				{
					"type": "fa",
					"name": "picture-o"
				},
				{
					"type": "fa",
					"name": "pie-chart"
				},
				{
					"type": "fa",
					"name": "pied-piper-alt"
				},
				{
					"type": "fa",
					"name": "pied-piper-pp"
				},
				{
					"type": "fa",
					"name": "pied-piper"
				},
				{
					"type": "fa",
					"name": "pinterest-p"
				},
				{
					"type": "fa",
					"name": "pinterest-square"
				},
				{
					"type": "fa",
					"name": "pinterest"
				},
				{
					"type": "fa",
					"name": "plane"
				},
				{
					"type": "fa",
					"name": "play-circle-o"
				},
				{
					"type": "fa",
					"name": "play-circle"
				},
				{
					"type": "fa",
					"name": "play"
				},
				{
					"type": "fa",
					"name": "plug"
				},
				{
					"type": "fa",
					"name": "plus-circle"
				},
				{
					"type": "fa",
					"name": "plus-square-o"
				},
				{
					"type": "fa",
					"name": "plus-square"
				},
				{
					"type": "fa",
					"name": "plus"
				},
				{
					"type": "fa",
					"name": "power-off"
				},
				{
					"type": "fa",
					"name": "print"
				},
				{
					"type": "fa",
					"name": "product-hunt"
				},
				{
					"type": "fa",
					"name": "puzzle-piece"
				},
				{
					"type": "fa",
					"name": "qq"
				},
				{
					"type": "fa",
					"name": "qrcode"
				},
				{
					"type": "fa",
					"name": "question-circle-o"
				},
				{
					"type": "fa",
					"name": "question-circle"
				},
				{
					"type": "fa",
					"name": "question"
				},
				{
					"type": "fa",
					"name": "quote-left"
				},
				{
					"type": "fa",
					"name": "quote-right"
				},
				{
					"type": "fa",
					"name": "ra"
				},
				{
					"type": "fa",
					"name": "random"
				},
				{
					"type": "fa",
					"name": "rebel"
				},
				{
					"type": "fa",
					"name": "recycle"
				},
				{
					"type": "fa",
					"name": "reddit-alien"
				},
				{
					"type": "fa",
					"name": "reddit-square"
				},
				{
					"type": "fa",
					"name": "reddit"
				},
				{
					"type": "fa",
					"name": "refresh"
				},
				{
					"type": "fa",
					"name": "registered"
				},
				{
					"type": "fa",
					"name": "renren"
				},
				{
					"type": "fa",
					"name": "repeat"
				},
				{
					"type": "fa",
					"name": "reply-all"
				},
				{
					"type": "fa",
					"name": "retweet"
				},
				{
					"type": "fa",
					"name": "road"
				},
				{
					"type": "fa",
					"name": "rocket"
				},
				{
					"type": "fa",
					"name": "rotate-left"
				},
				{
					"type": "fa",
					"name": "rouble"
				},
				{
					"type": "fa",
					"name": "rss-square"
				},
				{
					"type": "fa",
					"name": "ruble"
				},
				{
					"type": "fa",
					"name": "safari"
				},
				{
					"type": "fa",
					"name": "scissors"
				},
				{
					"type": "fa",
					"name": "scribd"
				},
				{
					"type": "fa",
					"name": "search-minus"
				},
				{
					"type": "fa",
					"name": "search-plus"
				},
				{
					"type": "fa",
					"name": "search"
				},
				{
					"type": "fa",
					"name": "sellsy"
				},
				{
					"type": "fa",
					"name": "send"
				},
				{
					"type": "fa",
					"name": "server"
				},
				{
					"type": "fa",
					"name": "share-alt-square"
				},
				{
					"type": "fa",
					"name": "share-alt"
				},
				{
					"type": "fa",
					"name": "share-square-o"
				},
				{
					"type": "fa",
					"name": "share-square"
				},
				{
					"type": "fa",
					"name": "shekel"
				},
				{
					"type": "fa",
					"name": "shield"
				},
				{
					"type": "fa",
					"name": "ship"
				},
				{
					"type": "fa",
					"name": "shirtsinbulk"
				},
				{
					"type": "fa",
					"name": "shopping-bag"
				},
				{
					"type": "fa",
					"name": "shopping-basket"
				},
				{
					"type": "fa",
					"name": "shopping-cart"
				},
				{
					"type": "fa",
					"name": "sign-in"
				},
				{
					"type": "fa",
					"name": "sign-language"
				},
				{
					"type": "fa",
					"name": "sign-out"
				},
				{
					"type": "fa",
					"name": "signal"
				},
				{
					"type": "fa",
					"name": "signing"
				},
				{
					"type": "fa",
					"name": "simplybuilt"
				},
				{
					"type": "fa",
					"name": "sitemap"
				},
				{
					"type": "fa",
					"name": "skyatlas"
				},
				{
					"type": "fa",
					"name": "skype"
				},
				{
					"type": "fa",
					"name": "slack"
				},
				{
					"type": "fa",
					"name": "sliders"
				},
				{
					"type": "fa",
					"name": "slideshare"
				},
				{
					"type": "fa",
					"name": "smile-o"
				},
				{
					"type": "fa",
					"name": "snapchat-ghost"
				},
				{
					"type": "fa",
					"name": "snapchat-square"
				},
				{
					"type": "fa",
					"name": "snapchat"
				},
				{
					"type": "fa",
					"name": "soccer-ball-o"
				},
				{
					"type": "fa",
					"name": "sort-alpha-asc"
				},
				{
					"type": "fa",
					"name": "sort-alpha-desc"
				},
				{
					"type": "fa",
					"name": "sort-amount-asc"
				},
				{
					"type": "fa",
					"name": "sort-amount-desc"
				},
				{
					"type": "fa",
					"name": "sort-asc"
				},
				{
					"type": "fa",
					"name": "sort-desc"
				},
				{
					"type": "fa",
					"name": "sort-down"
				},
				{
					"type": "fa",
					"name": "sort-numeric-asc"
				},
				{
					"type": "fa",
					"name": "sort-numeric-desc"
				},
				{
					"type": "fa",
					"name": "sort"
				},
				{
					"type": "fa",
					"name": "soundcloud"
				},
				{
					"type": "fa",
					"name": "space-shuttle"
				},
				{
					"type": "fa",
					"name": "spinner"
				},
				{
					"type": "fa",
					"name": "spoon"
				},
				{
					"type": "fa",
					"name": "spotify"
				},
				{
					"type": "fa",
					"name": "square-o"
				},
				{
					"type": "fa",
					"name": "square"
				},
				{
					"type": "fa",
					"name": "stack-exchange"
				},
				{
					"type": "fa",
					"name": "stack-overflow"
				},
				{
					"type": "fa",
					"name": "star-half-empty"
				},
				{
					"type": "fa",
					"name": "star-half-full"
				},
				{
					"type": "fa",
					"name": "star-half"
				},
				{
					"type": "fa",
					"name": "star-o"
				},
				{
					"type": "fa",
					"name": "star"
				},
				{
					"type": "fa",
					"name": "steam-square"
				},
				{
					"type": "fa",
					"name": "steam"
				},
				{
					"type": "fa",
					"name": "step-backward"
				},
				{
					"type": "fa",
					"name": "step-forward"
				},
				{
					"type": "fa",
					"name": "stethoscope"
				},
				{
					"type": "fa",
					"name": "sticky-note-o"
				},
				{
					"type": "fa",
					"name": "sticky-note"
				},
				{
					"type": "fa",
					"name": "stop-circle-o"
				},
				{
					"type": "fa",
					"name": "stop-circle"
				},
				{
					"type": "fa",
					"name": "stop"
				},
				{
					"type": "fa",
					"name": "street-view"
				},
				{
					"type": "fa",
					"name": "strikethrough"
				},
				{
					"type": "fa",
					"name": "stumbleupon-circle"
				},
				{
					"type": "fa",
					"name": "stumbleupon"
				},
				{
					"type": "fa",
					"name": "subscript"
				},
				{
					"type": "fa",
					"name": "subway"
				},
				{
					"type": "fa",
					"name": "suitcase"
				},
				{
					"type": "fa",
					"name": "sun-o"
				},
				{
					"type": "fa",
					"name": "superscript"
				},
				{
					"type": "fa",
					"name": "support"
				},
				{
					"type": "fa",
					"name": "table"
				},
				{
					"type": "fa",
					"name": "tablet"
				},
				{
					"type": "fa",
					"name": "tag"
				},
				{
					"type": "fa",
					"name": "tags"
				},
				{
					"type": "fa",
					"name": "tasks"
				},
				{
					"type": "fa",
					"name": "television"
				},
				{
					"type": "fa",
					"name": "tencent-weibo"
				},
				{
					"type": "fa",
					"name": "terminal"
				},
				{
					"type": "fa",
					"name": "text-height"
				},
				{
					"type": "fa",
					"name": "text-width"
				},
				{
					"type": "fa",
					"name": "th-large"
				},
				{
					"type": "fa",
					"name": "th-list"
				},
				{
					"type": "fa",
					"name": "th"
				},
				{
					"type": "fa",
					"name": "themeisle"
				},
				{
					"type": "fa",
					"name": "thumb-tack"
				},
				{
					"type": "fa",
					"name": "thumbs-down"
				},
				{
					"type": "fa",
					"name": "thumbs-o-down"
				},
				{
					"type": "fa",
					"name": "thumbs-o-up"
				},
				{
					"type": "fa",
					"name": "thumbs-up"
				},
				{
					"type": "fa",
					"name": "ticket"
				},
				{
					"type": "fa",
					"name": "times-circle-o"
				},
				{
					"type": "fa",
					"name": "times-circle"
				},
				{
					"type": "fa",
					"name": "tint"
				},
				{
					"type": "fa",
					"name": "toggle-left"
				},
				{
					"type": "fa",
					"name": "toggle-off"
				},
				{
					"type": "fa",
					"name": "toggle-on"
				},
				{
					"type": "fa",
					"name": "toggle-up"
				},
				{
					"type": "fa",
					"name": "trademark"
				},
				{
					"type": "fa",
					"name": "train"
				},
				{
					"type": "fa",
					"name": "transgender-alt"
				},
				{
					"type": "fa",
					"name": "trash-o"
				},
				{
					"type": "fa",
					"name": "trash"
				},
				{
					"type": "fa",
					"name": "tree"
				},
				{
					"type": "fa",
					"name": "trello"
				},
				{
					"type": "fa",
					"name": "tripadvisor"
				},
				{
					"type": "fa",
					"name": "trophy"
				},
				{
					"type": "fa",
					"name": "truck"
				},
				{
					"type": "fa",
					"name": "try"
				},
				{
					"type": "fa",
					"name": "tty"
				},
				{
					"type": "fa",
					"name": "tumblr-square"
				},
				{
					"type": "fa",
					"name": "tumblr"
				},
				{
					"type": "fa",
					"name": "turkish-lira"
				},
				{
					"type": "fa",
					"name": "twitch"
				},
				{
					"type": "fa",
					"name": "twitter-square"
				},
				{
					"type": "fa",
					"name": "twitter"
				},
				{
					"type": "fa",
					"name": "umbrella"
				},
				{
					"type": "fa",
					"name": "underline"
				},
				{
					"type": "fa",
					"name": "universal-access"
				},
				{
					"type": "fa",
					"name": "unlink"
				},
				{
					"type": "fa",
					"name": "unlock-alt"
				},
				{
					"type": "fa",
					"name": "unlock"
				},
				{
					"type": "fa",
					"name": "upload"
				},
				{
					"type": "fa",
					"name": "usb"
				},
				{
					"type": "fa",
					"name": "usd"
				},
				{
					"type": "fa",
					"name": "user-md"
				},
				{
					"type": "fa",
					"name": "user-plus"
				},
				{
					"type": "fa",
					"name": "user-secret"
				},
				{
					"type": "fa",
					"name": "user-times"
				},
				{
					"type": "fa",
					"name": "user"
				},
				{
					"type": "fa",
					"name": "users"
				},
				{
					"type": "fa",
					"name": "venus-double"
				},
				{
					"type": "fa",
					"name": "venus-mars"
				},
				{
					"type": "fa",
					"name": "venus"
				},
				{
					"type": "fa",
					"name": "viacoin"
				},
				{
					"type": "fa",
					"name": "viadeo-square"
				},
				{
					"type": "fa",
					"name": "viadeo"
				},
				{
					"type": "fa",
					"name": "video-camera"
				},
				{
					"type": "fa",
					"name": "vimeo-square"
				},
				{
					"type": "fa",
					"name": "vimeo"
				},
				{
					"type": "fa",
					"name": "vine"
				},
				{
					"type": "fa",
					"name": "vk"
				},
				{
					"type": "fa",
					"name": "volume-control-phone"
				},
				{
					"type": "fa",
					"name": "volume-down"
				},
				{
					"type": "fa",
					"name": "volume-off"
				},
				{
					"type": "fa",
					"name": "volume-up"
				},
				{
					"type": "fa",
					"name": "warning"
				},
				{
					"type": "fa",
					"name": "wechat"
				},
				{
					"type": "fa",
					"name": "weibo"
				},
				{
					"type": "fa",
					"name": "whatsapp"
				},
				{
					"type": "fa",
					"name": "wheelchair-alt"
				},
				{
					"type": "fa",
					"name": "wheelchair"
				},
				{
					"type": "fa",
					"name": "wifi"
				},
				{
					"type": "fa",
					"name": "wikipedia-w"
				},
				{
					"type": "fa",
					"name": "windows"
				},
				{
					"type": "fa",
					"name": "won"
				},
				{
					"type": "fa",
					"name": "wordpress"
				},
				{
					"type": "fa",
					"name": "wpbeginner"
				},
				{
					"type": "fa",
					"name": "wpforms"
				},
				{
					"type": "fa",
					"name": "wrench"
				},
				{
					"type": "fa",
					"name": "xing-square"
				},
				{
					"type": "fa",
					"name": "xing"
				},
				{
					"type": "fa",
					"name": "y-combinator-square"
				},
				{
					"type": "fa",
					"name": "y-combinator"
				},
				{
					"type": "fa",
					"name": "yahoo"
				},
				{
					"type": "fa",
					"name": "yc"
				},
				{
					"type": "fa",
					"name": "yelp"
				},
				{
					"type": "fa",
					"name": "yoast"
				},
				{
					"type": "fa",
					"name": "youtube-play"
				},
				{
					"type": "fa",
					"name": "youtube-square"
				},
				{
					"type": "fa",
					"name": "youtube"
				}
			]
		},
		"ion": {
			"name": "ionicons",
			"prefix": "ion-",
			"repo": "https://github.com/driftyco/ionicons.git",
			"icons": [
				{
					"type": "ion",
					"name": "alert-circled"
				},
				{
					"type": "ion",
					"name": "alert"
				},
				{
					"type": "ion",
					"name": "android-add-circle"
				},
				{
					"type": "ion",
					"name": "android-add"
				},
				{
					"type": "ion",
					"name": "android-alarm-clock"
				},
				{
					"type": "ion",
					"name": "android-alert"
				},
				{
					"type": "ion",
					"name": "android-apps"
				},
				{
					"type": "ion",
					"name": "android-archive"
				},
				{
					"type": "ion",
					"name": "android-arrow-back"
				},
				{
					"type": "ion",
					"name": "android-arrow-down"
				},
				{
					"type": "ion",
					"name": "android-arrow-dropdown-circle"
				},
				{
					"type": "ion",
					"name": "android-arrow-dropdown"
				},
				{
					"type": "ion",
					"name": "android-arrow-dropleft-circle"
				},
				{
					"type": "ion",
					"name": "android-arrow-dropleft"
				},
				{
					"type": "ion",
					"name": "android-arrow-dropright-circle"
				},
				{
					"type": "ion",
					"name": "android-arrow-dropright"
				},
				{
					"type": "ion",
					"name": "android-arrow-dropup-circle"
				},
				{
					"type": "ion",
					"name": "android-arrow-dropup"
				},
				{
					"type": "ion",
					"name": "android-arrow-forward"
				},
				{
					"type": "ion",
					"name": "android-arrow-up"
				},
				{
					"type": "ion",
					"name": "android-attach"
				},
				{
					"type": "ion",
					"name": "android-bar"
				},
				{
					"type": "ion",
					"name": "android-bicycle"
				},
				{
					"type": "ion",
					"name": "android-boat"
				},
				{
					"type": "ion",
					"name": "android-bookmark"
				},
				{
					"type": "ion",
					"name": "android-bulb"
				},
				{
					"type": "ion",
					"name": "android-bus"
				},
				{
					"type": "ion",
					"name": "android-calendar"
				},
				{
					"type": "ion",
					"name": "android-call"
				},
				{
					"type": "ion",
					"name": "android-camera"
				},
				{
					"type": "ion",
					"name": "android-cancel"
				},
				{
					"type": "ion",
					"name": "android-car"
				},
				{
					"type": "ion",
					"name": "android-cart"
				},
				{
					"type": "ion",
					"name": "android-chat"
				},
				{
					"type": "ion",
					"name": "android-checkbox-blank"
				},
				{
					"type": "ion",
					"name": "android-checkbox-outline-blank"
				},
				{
					"type": "ion",
					"name": "android-checkbox-outline"
				},
				{
					"type": "ion",
					"name": "android-checkbox"
				},
				{
					"type": "ion",
					"name": "android-checkmark-circle"
				},
				{
					"type": "ion",
					"name": "android-clipboard"
				},
				{
					"type": "ion",
					"name": "android-close"
				},
				{
					"type": "ion",
					"name": "android-cloud-circle"
				},
				{
					"type": "ion",
					"name": "android-cloud-done"
				},
				{
					"type": "ion",
					"name": "android-cloud-outline"
				},
				{
					"type": "ion",
					"name": "android-cloud"
				},
				{
					"type": "ion",
					"name": "android-color-palette"
				},
				{
					"type": "ion",
					"name": "android-compass"
				},
				{
					"type": "ion",
					"name": "android-contact"
				},
				{
					"type": "ion",
					"name": "android-contacts"
				},
				{
					"type": "ion",
					"name": "android-contract"
				},
				{
					"type": "ion",
					"name": "android-create"
				},
				{
					"type": "ion",
					"name": "android-delete"
				},
				{
					"type": "ion",
					"name": "android-desktop"
				},
				{
					"type": "ion",
					"name": "android-document"
				},
				{
					"type": "ion",
					"name": "android-done-all"
				},
				{
					"type": "ion",
					"name": "android-done"
				},
				{
					"type": "ion",
					"name": "android-download"
				},
				{
					"type": "ion",
					"name": "android-drafts"
				},
				{
					"type": "ion",
					"name": "android-exit"
				},
				{
					"type": "ion",
					"name": "android-expand"
				},
				{
					"type": "ion",
					"name": "android-favorite-outline"
				},
				{
					"type": "ion",
					"name": "android-favorite"
				},
				{
					"type": "ion",
					"name": "android-film"
				},
				{
					"type": "ion",
					"name": "android-folder-open"
				},
				{
					"type": "ion",
					"name": "android-folder"
				},
				{
					"type": "ion",
					"name": "android-funnel"
				},
				{
					"type": "ion",
					"name": "android-globe"
				},
				{
					"type": "ion",
					"name": "android-hand"
				},
				{
					"type": "ion",
					"name": "android-hangout"
				},
				{
					"type": "ion",
					"name": "android-happy"
				},
				{
					"type": "ion",
					"name": "android-home"
				},
				{
					"type": "ion",
					"name": "android-image"
				},
				{
					"type": "ion",
					"name": "android-laptop"
				},
				{
					"type": "ion",
					"name": "android-list"
				},
				{
					"type": "ion",
					"name": "android-locate"
				},
				{
					"type": "ion",
					"name": "android-lock"
				},
				{
					"type": "ion",
					"name": "android-mail"
				},
				{
					"type": "ion",
					"name": "android-map"
				},
				{
					"type": "ion",
					"name": "android-menu"
				},
				{
					"type": "ion",
					"name": "android-microphone-off"
				},
				{
					"type": "ion",
					"name": "android-microphone"
				},
				{
					"type": "ion",
					"name": "android-more-horizontal"
				},
				{
					"type": "ion",
					"name": "android-more-vertical"
				},
				{
					"type": "ion",
					"name": "android-navigate"
				},
				{
					"type": "ion",
					"name": "android-notifications-none"
				},
				{
					"type": "ion",
					"name": "android-notifications-off"
				},
				{
					"type": "ion",
					"name": "android-notifications"
				},
				{
					"type": "ion",
					"name": "android-open"
				},
				{
					"type": "ion",
					"name": "android-options"
				},
				{
					"type": "ion",
					"name": "android-people"
				},
				{
					"type": "ion",
					"name": "android-person-add"
				},
				{
					"type": "ion",
					"name": "android-person"
				},
				{
					"type": "ion",
					"name": "android-phone-landscape"
				},
				{
					"type": "ion",
					"name": "android-phone-portrait"
				},
				{
					"type": "ion",
					"name": "android-pin"
				},
				{
					"type": "ion",
					"name": "android-plane"
				},
				{
					"type": "ion",
					"name": "android-playstore"
				},
				{
					"type": "ion",
					"name": "android-print"
				},
				{
					"type": "ion",
					"name": "android-radio-button-off"
				},
				{
					"type": "ion",
					"name": "android-radio-button-on"
				},
				{
					"type": "ion",
					"name": "android-refresh"
				},
				{
					"type": "ion",
					"name": "android-remove-circle"
				},
				{
					"type": "ion",
					"name": "android-remove"
				},
				{
					"type": "ion",
					"name": "android-restaurant"
				},
				{
					"type": "ion",
					"name": "android-sad"
				},
				{
					"type": "ion",
					"name": "android-search"
				},
				{
					"type": "ion",
					"name": "android-send"
				},
				{
					"type": "ion",
					"name": "android-settings"
				},
				{
					"type": "ion",
					"name": "android-share-alt"
				},
				{
					"type": "ion",
					"name": "android-share"
				},
				{
					"type": "ion",
					"name": "android-star-half"
				},
				{
					"type": "ion",
					"name": "android-star-outline"
				},
				{
					"type": "ion",
					"name": "android-star"
				},
				{
					"type": "ion",
					"name": "android-stopwatch"
				},
				{
					"type": "ion",
					"name": "android-subway"
				},
				{
					"type": "ion",
					"name": "android-sunny"
				},
				{
					"type": "ion",
					"name": "android-sync"
				},
				{
					"type": "ion",
					"name": "android-textsms"
				},
				{
					"type": "ion",
					"name": "android-time"
				},
				{
					"type": "ion",
					"name": "android-train"
				},
				{
					"type": "ion",
					"name": "android-unlock"
				},
				{
					"type": "ion",
					"name": "android-upload"
				},
				{
					"type": "ion",
					"name": "android-volume-down"
				},
				{
					"type": "ion",
					"name": "android-volume-mute"
				},
				{
					"type": "ion",
					"name": "android-volume-off"
				},
				{
					"type": "ion",
					"name": "android-volume-up"
				},
				{
					"type": "ion",
					"name": "android-walk"
				},
				{
					"type": "ion",
					"name": "android-warning"
				},
				{
					"type": "ion",
					"name": "android-watch"
				},
				{
					"type": "ion",
					"name": "android-wifi"
				},
				{
					"type": "ion",
					"name": "aperture"
				},
				{
					"type": "ion",
					"name": "archive"
				},
				{
					"type": "ion",
					"name": "arrow-down-a"
				},
				{
					"type": "ion",
					"name": "arrow-down-b"
				},
				{
					"type": "ion",
					"name": "arrow-down-c"
				},
				{
					"type": "ion",
					"name": "arrow-expand"
				},
				{
					"type": "ion",
					"name": "arrow-graph-down-left"
				},
				{
					"type": "ion",
					"name": "arrow-graph-down-right"
				},
				{
					"type": "ion",
					"name": "arrow-graph-up-left"
				},
				{
					"type": "ion",
					"name": "arrow-graph-up-right"
				},
				{
					"type": "ion",
					"name": "arrow-left-a"
				},
				{
					"type": "ion",
					"name": "arrow-left-b"
				},
				{
					"type": "ion",
					"name": "arrow-left-c"
				},
				{
					"type": "ion",
					"name": "arrow-move"
				},
				{
					"type": "ion",
					"name": "arrow-resize"
				},
				{
					"type": "ion",
					"name": "arrow-return-left"
				},
				{
					"type": "ion",
					"name": "arrow-return-right"
				},
				{
					"type": "ion",
					"name": "arrow-right-a"
				},
				{
					"type": "ion",
					"name": "arrow-right-b"
				},
				{
					"type": "ion",
					"name": "arrow-right-c"
				},
				{
					"type": "ion",
					"name": "arrow-shrink"
				},
				{
					"type": "ion",
					"name": "arrow-swap"
				},
				{
					"type": "ion",
					"name": "arrow-up-a"
				},
				{
					"type": "ion",
					"name": "arrow-up-b"
				},
				{
					"type": "ion",
					"name": "arrow-up-c"
				},
				{
					"type": "ion",
					"name": "asterisk"
				},
				{
					"type": "ion",
					"name": "at"
				},
				{
					"type": "ion",
					"name": "backspace-outline"
				},
				{
					"type": "ion",
					"name": "backspace"
				},
				{
					"type": "ion",
					"name": "bag"
				},
				{
					"type": "ion",
					"name": "battery-charging"
				},
				{
					"type": "ion",
					"name": "battery-empty"
				},
				{
					"type": "ion",
					"name": "battery-full"
				},
				{
					"type": "ion",
					"name": "battery-half"
				},
				{
					"type": "ion",
					"name": "battery-low"
				},
				{
					"type": "ion",
					"name": "beaker"
				},
				{
					"type": "ion",
					"name": "beer"
				},
				{
					"type": "ion",
					"name": "bluetooth"
				},
				{
					"type": "ion",
					"name": "bonfire"
				},
				{
					"type": "ion",
					"name": "bookmark"
				},
				{
					"type": "ion",
					"name": "bowtie"
				},
				{
					"type": "ion",
					"name": "briefcase"
				},
				{
					"type": "ion",
					"name": "bug"
				},
				{
					"type": "ion",
					"name": "calculator"
				},
				{
					"type": "ion",
					"name": "calendar"
				},
				{
					"type": "ion",
					"name": "camera"
				},
				{
					"type": "ion",
					"name": "card"
				},
				{
					"type": "ion",
					"name": "cash"
				},
				{
					"type": "ion",
					"name": "chatbox-working"
				},
				{
					"type": "ion",
					"name": "chatbox"
				},
				{
					"type": "ion",
					"name": "chatboxes"
				},
				{
					"type": "ion",
					"name": "chatbubble-working"
				},
				{
					"type": "ion",
					"name": "chatbubble"
				},
				{
					"type": "ion",
					"name": "chatbubbles"
				},
				{
					"type": "ion",
					"name": "checkmark-circled"
				},
				{
					"type": "ion",
					"name": "checkmark-round"
				},
				{
					"type": "ion",
					"name": "checkmark"
				},
				{
					"type": "ion",
					"name": "chevron-down"
				},
				{
					"type": "ion",
					"name": "chevron-left"
				},
				{
					"type": "ion",
					"name": "chevron-right"
				},
				{
					"type": "ion",
					"name": "chevron-up"
				},
				{
					"type": "ion",
					"name": "clipboard"
				},
				{
					"type": "ion",
					"name": "clock"
				},
				{
					"type": "ion",
					"name": "close-circled"
				},
				{
					"type": "ion",
					"name": "close-round"
				},
				{
					"type": "ion",
					"name": "close"
				},
				{
					"type": "ion",
					"name": "closed-captioning"
				},
				{
					"type": "ion",
					"name": "cloud"
				},
				{
					"type": "ion",
					"name": "code-download"
				},
				{
					"type": "ion",
					"name": "code-working"
				},
				{
					"type": "ion",
					"name": "code"
				},
				{
					"type": "ion",
					"name": "coffee"
				},
				{
					"type": "ion",
					"name": "compass"
				},
				{
					"type": "ion",
					"name": "compose"
				},
				{
					"type": "ion",
					"name": "connection-bars"
				},
				{
					"type": "ion",
					"name": "contrast"
				},
				{
					"type": "ion",
					"name": "crop"
				},
				{
					"type": "ion",
					"name": "cube"
				},
				{
					"type": "ion",
					"name": "disc"
				},
				{
					"type": "ion",
					"name": "document-text"
				},
				{
					"type": "ion",
					"name": "document"
				},
				{
					"type": "ion",
					"name": "drag"
				},
				{
					"type": "ion",
					"name": "earth"
				},
				{
					"type": "ion",
					"name": "easel"
				},
				{
					"type": "ion",
					"name": "edit"
				},
				{
					"type": "ion",
					"name": "egg"
				},
				{
					"type": "ion",
					"name": "eject"
				},
				{
					"type": "ion",
					"name": "email-unread"
				},
				{
					"type": "ion",
					"name": "email"
				},
				{
					"type": "ion",
					"name": "erlenmeyer-flask-bubbles"
				},
				{
					"type": "ion",
					"name": "erlenmeyer-flask"
				},
				{
					"type": "ion",
					"name": "eye-disabled"
				},
				{
					"type": "ion",
					"name": "eye"
				},
				{
					"type": "ion",
					"name": "female"
				},
				{
					"type": "ion",
					"name": "filing"
				},
				{
					"type": "ion",
					"name": "film-marker"
				},
				{
					"type": "ion",
					"name": "fireball"
				},
				{
					"type": "ion",
					"name": "flag"
				},
				{
					"type": "ion",
					"name": "flame"
				},
				{
					"type": "ion",
					"name": "flash-off"
				},
				{
					"type": "ion",
					"name": "flash"
				},
				{
					"type": "ion",
					"name": "folder"
				},
				{
					"type": "ion",
					"name": "fork-repo"
				},
				{
					"type": "ion",
					"name": "fork"
				},
				{
					"type": "ion",
					"name": "forward"
				},
				{
					"type": "ion",
					"name": "funnel"
				},
				{
					"type": "ion",
					"name": "gear-a"
				},
				{
					"type": "ion",
					"name": "gear-b"
				},
				{
					"type": "ion",
					"name": "grid"
				},
				{
					"type": "ion",
					"name": "hammer"
				},
				{
					"type": "ion",
					"name": "happy-outline"
				},
				{
					"type": "ion",
					"name": "happy"
				},
				{
					"type": "ion",
					"name": "headphone"
				},
				{
					"type": "ion",
					"name": "heart-broken"
				},
				{
					"type": "ion",
					"name": "heart"
				},
				{
					"type": "ion",
					"name": "help-buoy"
				},
				{
					"type": "ion",
					"name": "help-circled"
				},
				{
					"type": "ion",
					"name": "help"
				},
				{
					"type": "ion",
					"name": "home"
				},
				{
					"type": "ion",
					"name": "icecream"
				},
				{
					"type": "ion",
					"name": "image"
				},
				{
					"type": "ion",
					"name": "images"
				},
				{
					"type": "ion",
					"name": "information-circled"
				},
				{
					"type": "ion",
					"name": "information"
				},
				{
					"type": "ion",
					"name": "ionic"
				},
				{
					"type": "ion",
					"name": "ios-alarm-outline"
				},
				{
					"type": "ion",
					"name": "ios-alarm"
				},
				{
					"type": "ion",
					"name": "ios-albums-outline"
				},
				{
					"type": "ion",
					"name": "ios-albums"
				},
				{
					"type": "ion",
					"name": "ios-americanfootball-outline"
				},
				{
					"type": "ion",
					"name": "ios-americanfootball"
				},
				{
					"type": "ion",
					"name": "ios-analytics-outline"
				},
				{
					"type": "ion",
					"name": "ios-analytics"
				},
				{
					"type": "ion",
					"name": "ios-arrow-back"
				},
				{
					"type": "ion",
					"name": "ios-arrow-down"
				},
				{
					"type": "ion",
					"name": "ios-arrow-forward"
				},
				{
					"type": "ion",
					"name": "ios-arrow-left"
				},
				{
					"type": "ion",
					"name": "ios-arrow-right"
				},
				{
					"type": "ion",
					"name": "ios-arrow-thin-down"
				},
				{
					"type": "ion",
					"name": "ios-arrow-thin-left"
				},
				{
					"type": "ion",
					"name": "ios-arrow-thin-right"
				},
				{
					"type": "ion",
					"name": "ios-arrow-thin-up"
				},
				{
					"type": "ion",
					"name": "ios-arrow-up"
				},
				{
					"type": "ion",
					"name": "ios-at-outline"
				},
				{
					"type": "ion",
					"name": "ios-at"
				},
				{
					"type": "ion",
					"name": "ios-barcode-outline"
				},
				{
					"type": "ion",
					"name": "ios-barcode"
				},
				{
					"type": "ion",
					"name": "ios-baseball-outline"
				},
				{
					"type": "ion",
					"name": "ios-baseball"
				},
				{
					"type": "ion",
					"name": "ios-basketball-outline"
				},
				{
					"type": "ion",
					"name": "ios-basketball"
				},
				{
					"type": "ion",
					"name": "ios-bell-outline"
				},
				{
					"type": "ion",
					"name": "ios-bell"
				},
				{
					"type": "ion",
					"name": "ios-body-outline"
				},
				{
					"type": "ion",
					"name": "ios-body"
				},
				{
					"type": "ion",
					"name": "ios-bolt-outline"
				},
				{
					"type": "ion",
					"name": "ios-bolt"
				},
				{
					"type": "ion",
					"name": "ios-book-outline"
				},
				{
					"type": "ion",
					"name": "ios-book"
				},
				{
					"type": "ion",
					"name": "ios-bookmarks-outline"
				},
				{
					"type": "ion",
					"name": "ios-bookmarks"
				},
				{
					"type": "ion",
					"name": "ios-box-outline"
				},
				{
					"type": "ion",
					"name": "ios-box"
				},
				{
					"type": "ion",
					"name": "ios-briefcase-outline"
				},
				{
					"type": "ion",
					"name": "ios-briefcase"
				},
				{
					"type": "ion",
					"name": "ios-browsers-outline"
				},
				{
					"type": "ion",
					"name": "ios-browsers"
				},
				{
					"type": "ion",
					"name": "ios-calculator-outline"
				},
				{
					"type": "ion",
					"name": "ios-calculator"
				},
				{
					"type": "ion",
					"name": "ios-calendar-outline"
				},
				{
					"type": "ion",
					"name": "ios-calendar"
				},
				{
					"type": "ion",
					"name": "ios-camera-outline"
				},
				{
					"type": "ion",
					"name": "ios-camera"
				},
				{
					"type": "ion",
					"name": "ios-cart-outline"
				},
				{
					"type": "ion",
					"name": "ios-cart"
				},
				{
					"type": "ion",
					"name": "ios-chatboxes-outline"
				},
				{
					"type": "ion",
					"name": "ios-chatboxes"
				},
				{
					"type": "ion",
					"name": "ios-chatbubble-outline"
				},
				{
					"type": "ion",
					"name": "ios-chatbubble"
				},
				{
					"type": "ion",
					"name": "ios-checkmark-empty"
				},
				{
					"type": "ion",
					"name": "ios-checkmark-outline"
				},
				{
					"type": "ion",
					"name": "ios-checkmark"
				},
				{
					"type": "ion",
					"name": "ios-circle-filled"
				},
				{
					"type": "ion",
					"name": "ios-circle-outline"
				},
				{
					"type": "ion",
					"name": "ios-clock-outline"
				},
				{
					"type": "ion",
					"name": "ios-clock"
				},
				{
					"type": "ion",
					"name": "ios-close-empty"
				},
				{
					"type": "ion",
					"name": "ios-close-outline"
				},
				{
					"type": "ion",
					"name": "ios-close"
				},
				{
					"type": "ion",
					"name": "ios-cloud-download-outline"
				},
				{
					"type": "ion",
					"name": "ios-cloud-download"
				},
				{
					"type": "ion",
					"name": "ios-cloud-outline"
				},
				{
					"type": "ion",
					"name": "ios-cloud-upload-outline"
				},
				{
					"type": "ion",
					"name": "ios-cloud-upload"
				},
				{
					"type": "ion",
					"name": "ios-cloud"
				},
				{
					"type": "ion",
					"name": "ios-cloudy-night-outline"
				},
				{
					"type": "ion",
					"name": "ios-cloudy-night"
				},
				{
					"type": "ion",
					"name": "ios-cloudy-outline"
				},
				{
					"type": "ion",
					"name": "ios-cloudy"
				},
				{
					"type": "ion",
					"name": "ios-cog-outline"
				},
				{
					"type": "ion",
					"name": "ios-cog"
				},
				{
					"type": "ion",
					"name": "ios-color-filter-outline"
				},
				{
					"type": "ion",
					"name": "ios-color-filter"
				},
				{
					"type": "ion",
					"name": "ios-color-wand-outline"
				},
				{
					"type": "ion",
					"name": "ios-color-wand"
				},
				{
					"type": "ion",
					"name": "ios-compose-outline"
				},
				{
					"type": "ion",
					"name": "ios-compose"
				},
				{
					"type": "ion",
					"name": "ios-contact-outline"
				},
				{
					"type": "ion",
					"name": "ios-contact"
				},
				{
					"type": "ion",
					"name": "ios-copy-outline"
				},
				{
					"type": "ion",
					"name": "ios-copy"
				},
				{
					"type": "ion",
					"name": "ios-crop-strong"
				},
				{
					"type": "ion",
					"name": "ios-crop"
				},
				{
					"type": "ion",
					"name": "ios-download-outline"
				},
				{
					"type": "ion",
					"name": "ios-download"
				},
				{
					"type": "ion",
					"name": "ios-drag"
				},
				{
					"type": "ion",
					"name": "ios-email-outline"
				},
				{
					"type": "ion",
					"name": "ios-email"
				},
				{
					"type": "ion",
					"name": "ios-eye-outline"
				},
				{
					"type": "ion",
					"name": "ios-eye"
				},
				{
					"type": "ion",
					"name": "ios-fastforward-outline"
				},
				{
					"type": "ion",
					"name": "ios-fastforward"
				},
				{
					"type": "ion",
					"name": "ios-filing-outline"
				},
				{
					"type": "ion",
					"name": "ios-filing"
				},
				{
					"type": "ion",
					"name": "ios-film-outline"
				},
				{
					"type": "ion",
					"name": "ios-film"
				},
				{
					"type": "ion",
					"name": "ios-flag-outline"
				},
				{
					"type": "ion",
					"name": "ios-flag"
				},
				{
					"type": "ion",
					"name": "ios-flame-outline"
				},
				{
					"type": "ion",
					"name": "ios-flame"
				},
				{
					"type": "ion",
					"name": "ios-flask-outline"
				},
				{
					"type": "ion",
					"name": "ios-flask"
				},
				{
					"type": "ion",
					"name": "ios-flower-outline"
				},
				{
					"type": "ion",
					"name": "ios-flower"
				},
				{
					"type": "ion",
					"name": "ios-folder-outline"
				},
				{
					"type": "ion",
					"name": "ios-folder"
				},
				{
					"type": "ion",
					"name": "ios-football-outline"
				},
				{
					"type": "ion",
					"name": "ios-football"
				},
				{
					"type": "ion",
					"name": "ios-game-controller-a-outline"
				},
				{
					"type": "ion",
					"name": "ios-game-controller-a"
				},
				{
					"type": "ion",
					"name": "ios-game-controller-b-outline"
				},
				{
					"type": "ion",
					"name": "ios-game-controller-b"
				},
				{
					"type": "ion",
					"name": "ios-gear-outline"
				},
				{
					"type": "ion",
					"name": "ios-gear"
				},
				{
					"type": "ion",
					"name": "ios-glasses-outline"
				},
				{
					"type": "ion",
					"name": "ios-glasses"
				},
				{
					"type": "ion",
					"name": "ios-grid-view-outline"
				},
				{
					"type": "ion",
					"name": "ios-grid-view"
				},
				{
					"type": "ion",
					"name": "ios-heart-outline"
				},
				{
					"type": "ion",
					"name": "ios-heart"
				},
				{
					"type": "ion",
					"name": "ios-help-empty"
				},
				{
					"type": "ion",
					"name": "ios-help-outline"
				},
				{
					"type": "ion",
					"name": "ios-help"
				},
				{
					"type": "ion",
					"name": "ios-home-outline"
				},
				{
					"type": "ion",
					"name": "ios-home"
				},
				{
					"type": "ion",
					"name": "ios-infinite-outline"
				},
				{
					"type": "ion",
					"name": "ios-infinite"
				},
				{
					"type": "ion",
					"name": "ios-information-empty"
				},
				{
					"type": "ion",
					"name": "ios-information-outline"
				},
				{
					"type": "ion",
					"name": "ios-information"
				},
				{
					"type": "ion",
					"name": "ios-ionic-outline"
				},
				{
					"type": "ion",
					"name": "ios-keypad-outline"
				},
				{
					"type": "ion",
					"name": "ios-keypad"
				},
				{
					"type": "ion",
					"name": "ios-lightbulb-outline"
				},
				{
					"type": "ion",
					"name": "ios-lightbulb"
				},
				{
					"type": "ion",
					"name": "ios-list-outline"
				},
				{
					"type": "ion",
					"name": "ios-list"
				},
				{
					"type": "ion",
					"name": "ios-location-outline"
				},
				{
					"type": "ion",
					"name": "ios-location"
				},
				{
					"type": "ion",
					"name": "ios-locked-outline"
				},
				{
					"type": "ion",
					"name": "ios-locked"
				},
				{
					"type": "ion",
					"name": "ios-loop-strong"
				},
				{
					"type": "ion",
					"name": "ios-loop"
				},
				{
					"type": "ion",
					"name": "ios-medical-outline"
				},
				{
					"type": "ion",
					"name": "ios-medical"
				},
				{
					"type": "ion",
					"name": "ios-medkit-outline"
				},
				{
					"type": "ion",
					"name": "ios-medkit"
				},
				{
					"type": "ion",
					"name": "ios-mic-off"
				},
				{
					"type": "ion",
					"name": "ios-mic-outline"
				},
				{
					"type": "ion",
					"name": "ios-mic"
				},
				{
					"type": "ion",
					"name": "ios-minus-empty"
				},
				{
					"type": "ion",
					"name": "ios-minus-outline"
				},
				{
					"type": "ion",
					"name": "ios-minus"
				},
				{
					"type": "ion",
					"name": "ios-monitor-outline"
				},
				{
					"type": "ion",
					"name": "ios-monitor"
				},
				{
					"type": "ion",
					"name": "ios-moon-outline"
				},
				{
					"type": "ion",
					"name": "ios-moon"
				},
				{
					"type": "ion",
					"name": "ios-more-outline"
				},
				{
					"type": "ion",
					"name": "ios-more"
				},
				{
					"type": "ion",
					"name": "ios-musical-note"
				},
				{
					"type": "ion",
					"name": "ios-musical-notes"
				},
				{
					"type": "ion",
					"name": "ios-navigate-outline"
				},
				{
					"type": "ion",
					"name": "ios-navigate"
				},
				{
					"type": "ion",
					"name": "ios-nutrition-outline"
				},
				{
					"type": "ion",
					"name": "ios-nutrition"
				},
				{
					"type": "ion",
					"name": "ios-paper-outline"
				},
				{
					"type": "ion",
					"name": "ios-paper"
				},
				{
					"type": "ion",
					"name": "ios-paperplane-outline"
				},
				{
					"type": "ion",
					"name": "ios-paperplane"
				},
				{
					"type": "ion",
					"name": "ios-partlysunny-outline"
				},
				{
					"type": "ion",
					"name": "ios-partlysunny"
				},
				{
					"type": "ion",
					"name": "ios-pause-outline"
				},
				{
					"type": "ion",
					"name": "ios-pause"
				},
				{
					"type": "ion",
					"name": "ios-paw-outline"
				},
				{
					"type": "ion",
					"name": "ios-paw"
				},
				{
					"type": "ion",
					"name": "ios-people-outline"
				},
				{
					"type": "ion",
					"name": "ios-people"
				},
				{
					"type": "ion",
					"name": "ios-person-outline"
				},
				{
					"type": "ion",
					"name": "ios-person"
				},
				{
					"type": "ion",
					"name": "ios-personadd-outline"
				},
				{
					"type": "ion",
					"name": "ios-personadd"
				},
				{
					"type": "ion",
					"name": "ios-photos-outline"
				},
				{
					"type": "ion",
					"name": "ios-photos"
				},
				{
					"type": "ion",
					"name": "ios-pie-outline"
				},
				{
					"type": "ion",
					"name": "ios-pie"
				},
				{
					"type": "ion",
					"name": "ios-pint-outline"
				},
				{
					"type": "ion",
					"name": "ios-pint"
				},
				{
					"type": "ion",
					"name": "ios-play-outline"
				},
				{
					"type": "ion",
					"name": "ios-play"
				},
				{
					"type": "ion",
					"name": "ios-plus-empty"
				},
				{
					"type": "ion",
					"name": "ios-plus-outline"
				},
				{
					"type": "ion",
					"name": "ios-plus"
				},
				{
					"type": "ion",
					"name": "ios-pricetag-outline"
				},
				{
					"type": "ion",
					"name": "ios-pricetag"
				},
				{
					"type": "ion",
					"name": "ios-pricetags-outline"
				},
				{
					"type": "ion",
					"name": "ios-pricetags"
				},
				{
					"type": "ion",
					"name": "ios-printer-outline"
				},
				{
					"type": "ion",
					"name": "ios-printer"
				},
				{
					"type": "ion",
					"name": "ios-pulse-strong"
				},
				{
					"type": "ion",
					"name": "ios-pulse"
				},
				{
					"type": "ion",
					"name": "ios-rainy-outline"
				},
				{
					"type": "ion",
					"name": "ios-rainy"
				},
				{
					"type": "ion",
					"name": "ios-recording-outline"
				},
				{
					"type": "ion",
					"name": "ios-recording"
				},
				{
					"type": "ion",
					"name": "ios-redo-outline"
				},
				{
					"type": "ion",
					"name": "ios-redo"
				},
				{
					"type": "ion",
					"name": "ios-refresh-empty"
				},
				{
					"type": "ion",
					"name": "ios-refresh-outline"
				},
				{
					"type": "ion",
					"name": "ios-refresh"
				},
				{
					"type": "ion",
					"name": "ios-reload"
				},
				{
					"type": "ion",
					"name": "ios-reverse-camera-outline"
				},
				{
					"type": "ion",
					"name": "ios-reverse-camera"
				},
				{
					"type": "ion",
					"name": "ios-rewind-outline"
				},
				{
					"type": "ion",
					"name": "ios-rewind"
				},
				{
					"type": "ion",
					"name": "ios-rose-outline"
				},
				{
					"type": "ion",
					"name": "ios-rose"
				},
				{
					"type": "ion",
					"name": "ios-search-strong"
				},
				{
					"type": "ion",
					"name": "ios-search"
				},
				{
					"type": "ion",
					"name": "ios-settings-strong"
				},
				{
					"type": "ion",
					"name": "ios-settings"
				},
				{
					"type": "ion",
					"name": "ios-shuffle-strong"
				},
				{
					"type": "ion",
					"name": "ios-shuffle"
				},
				{
					"type": "ion",
					"name": "ios-skipbackward-outline"
				},
				{
					"type": "ion",
					"name": "ios-skipbackward"
				},
				{
					"type": "ion",
					"name": "ios-skipforward-outline"
				},
				{
					"type": "ion",
					"name": "ios-skipforward"
				},
				{
					"type": "ion",
					"name": "ios-snowy"
				},
				{
					"type": "ion",
					"name": "ios-speedometer-outline"
				},
				{
					"type": "ion",
					"name": "ios-speedometer"
				},
				{
					"type": "ion",
					"name": "ios-star-half"
				},
				{
					"type": "ion",
					"name": "ios-star-outline"
				},
				{
					"type": "ion",
					"name": "ios-star"
				},
				{
					"type": "ion",
					"name": "ios-stopwatch-outline"
				},
				{
					"type": "ion",
					"name": "ios-stopwatch"
				},
				{
					"type": "ion",
					"name": "ios-sunny-outline"
				},
				{
					"type": "ion",
					"name": "ios-sunny"
				},
				{
					"type": "ion",
					"name": "ios-telephone-outline"
				},
				{
					"type": "ion",
					"name": "ios-telephone"
				},
				{
					"type": "ion",
					"name": "ios-tennisball-outline"
				},
				{
					"type": "ion",
					"name": "ios-tennisball"
				},
				{
					"type": "ion",
					"name": "ios-thunderstorm-outline"
				},
				{
					"type": "ion",
					"name": "ios-thunderstorm"
				},
				{
					"type": "ion",
					"name": "ios-time-outline"
				},
				{
					"type": "ion",
					"name": "ios-time"
				},
				{
					"type": "ion",
					"name": "ios-timer-outline"
				},
				{
					"type": "ion",
					"name": "ios-timer"
				},
				{
					"type": "ion",
					"name": "ios-toggle-outline"
				},
				{
					"type": "ion",
					"name": "ios-toggle"
				},
				{
					"type": "ion",
					"name": "ios-trash-outline"
				},
				{
					"type": "ion",
					"name": "ios-trash"
				},
				{
					"type": "ion",
					"name": "ios-undo-outline"
				},
				{
					"type": "ion",
					"name": "ios-undo"
				},
				{
					"type": "ion",
					"name": "ios-unlocked-outline"
				},
				{
					"type": "ion",
					"name": "ios-unlocked"
				},
				{
					"type": "ion",
					"name": "ios-upload-outline"
				},
				{
					"type": "ion",
					"name": "ios-upload"
				},
				{
					"type": "ion",
					"name": "ios-videocam-outline"
				},
				{
					"type": "ion",
					"name": "ios-videocam"
				},
				{
					"type": "ion",
					"name": "ios-volume-high"
				},
				{
					"type": "ion",
					"name": "ios-volume-low"
				},
				{
					"type": "ion",
					"name": "ios-wineglass-outline"
				},
				{
					"type": "ion",
					"name": "ios-wineglass"
				},
				{
					"type": "ion",
					"name": "ios-world-outline"
				},
				{
					"type": "ion",
					"name": "ios-world"
				},
				{
					"type": "ion",
					"name": "ipad"
				},
				{
					"type": "ion",
					"name": "iphone"
				},
				{
					"type": "ion",
					"name": "ipod"
				},
				{
					"type": "ion",
					"name": "jet"
				},
				{
					"type": "ion",
					"name": "key"
				},
				{
					"type": "ion",
					"name": "knife"
				},
				{
					"type": "ion",
					"name": "laptop"
				},
				{
					"type": "ion",
					"name": "leaf"
				},
				{
					"type": "ion",
					"name": "levels"
				},
				{
					"type": "ion",
					"name": "lightbulb"
				},
				{
					"type": "ion",
					"name": "link"
				},
				{
					"type": "ion",
					"name": "load-a"
				},
				{
					"type": "ion",
					"name": "load-b"
				},
				{
					"type": "ion",
					"name": "load-c"
				},
				{
					"type": "ion",
					"name": "load-d"
				},
				{
					"type": "ion",
					"name": "location"
				},
				{
					"type": "ion",
					"name": "lock-combination"
				},
				{
					"type": "ion",
					"name": "locked"
				},
				{
					"type": "ion",
					"name": "log-in"
				},
				{
					"type": "ion",
					"name": "log-out"
				},
				{
					"type": "ion",
					"name": "loop"
				},
				{
					"type": "ion",
					"name": "magnet"
				},
				{
					"type": "ion",
					"name": "male"
				},
				{
					"type": "ion",
					"name": "man"
				},
				{
					"type": "ion",
					"name": "map"
				},
				{
					"type": "ion",
					"name": "medkit"
				},
				{
					"type": "ion",
					"name": "merge"
				},
				{
					"type": "ion",
					"name": "mic-a"
				},
				{
					"type": "ion",
					"name": "mic-b"
				},
				{
					"type": "ion",
					"name": "mic-c"
				},
				{
					"type": "ion",
					"name": "minus-circled"
				},
				{
					"type": "ion",
					"name": "minus-round"
				},
				{
					"type": "ion",
					"name": "minus"
				},
				{
					"type": "ion",
					"name": "model-s"
				},
				{
					"type": "ion",
					"name": "monitor"
				},
				{
					"type": "ion",
					"name": "more"
				},
				{
					"type": "ion",
					"name": "mouse"
				},
				{
					"type": "ion",
					"name": "music-note"
				},
				{
					"type": "ion",
					"name": "navicon-round"
				},
				{
					"type": "ion",
					"name": "navicon"
				},
				{
					"type": "ion",
					"name": "navigate"
				},
				{
					"type": "ion",
					"name": "network"
				},
				{
					"type": "ion",
					"name": "no-smoking"
				},
				{
					"type": "ion",
					"name": "nuclear"
				},
				{
					"type": "ion",
					"name": "outlet"
				},
				{
					"type": "ion",
					"name": "paintbrush"
				},
				{
					"type": "ion",
					"name": "paintbucket"
				},
				{
					"type": "ion",
					"name": "paper-airplane"
				},
				{
					"type": "ion",
					"name": "paperclip"
				},
				{
					"type": "ion",
					"name": "pause"
				},
				{
					"type": "ion",
					"name": "person-add"
				},
				{
					"type": "ion",
					"name": "person-stalker"
				},
				{
					"type": "ion",
					"name": "person"
				},
				{
					"type": "ion",
					"name": "pie-graph"
				},
				{
					"type": "ion",
					"name": "pin"
				},
				{
					"type": "ion",
					"name": "pinpoint"
				},
				{
					"type": "ion",
					"name": "pizza"
				},
				{
					"type": "ion",
					"name": "plane"
				},
				{
					"type": "ion",
					"name": "planet"
				},
				{
					"type": "ion",
					"name": "play"
				},
				{
					"type": "ion",
					"name": "playstation"
				},
				{
					"type": "ion",
					"name": "plus-circled"
				},
				{
					"type": "ion",
					"name": "plus-round"
				},
				{
					"type": "ion",
					"name": "plus"
				},
				{
					"type": "ion",
					"name": "podium"
				},
				{
					"type": "ion",
					"name": "pound"
				},
				{
					"type": "ion",
					"name": "power"
				},
				{
					"type": "ion",
					"name": "pricetag"
				},
				{
					"type": "ion",
					"name": "pricetags"
				},
				{
					"type": "ion",
					"name": "printer"
				},
				{
					"type": "ion",
					"name": "pull-request"
				},
				{
					"type": "ion",
					"name": "qr-scanner"
				},
				{
					"type": "ion",
					"name": "quote"
				},
				{
					"type": "ion",
					"name": "radio-waves"
				},
				{
					"type": "ion",
					"name": "record"
				},
				{
					"type": "ion",
					"name": "refresh"
				},
				{
					"type": "ion",
					"name": "reply-all"
				},
				{
					"type": "ion",
					"name": "reply"
				},
				{
					"type": "ion",
					"name": "ribbon-a"
				},
				{
					"type": "ion",
					"name": "ribbon-b"
				},
				{
					"type": "ion",
					"name": "sad-outline"
				},
				{
					"type": "ion",
					"name": "sad"
				},
				{
					"type": "ion",
					"name": "scissors"
				},
				{
					"type": "ion",
					"name": "search"
				},
				{
					"type": "ion",
					"name": "settings"
				},
				{
					"type": "ion",
					"name": "share"
				},
				{
					"type": "ion",
					"name": "shuffle"
				},
				{
					"type": "ion",
					"name": "skip-backward"
				},
				{
					"type": "ion",
					"name": "skip-forward"
				},
				{
					"type": "ion",
					"name": "social-android-outline"
				},
				{
					"type": "ion",
					"name": "social-android"
				},
				{
					"type": "ion",
					"name": "social-angular-outline"
				},
				{
					"type": "ion",
					"name": "social-angular"
				},
				{
					"type": "ion",
					"name": "social-apple-outline"
				},
				{
					"type": "ion",
					"name": "social-apple"
				},
				{
					"type": "ion",
					"name": "social-bitcoin-outline"
				},
				{
					"type": "ion",
					"name": "social-bitcoin"
				},
				{
					"type": "ion",
					"name": "social-buffer-outline"
				},
				{
					"type": "ion",
					"name": "social-buffer"
				},
				{
					"type": "ion",
					"name": "social-chrome-outline"
				},
				{
					"type": "ion",
					"name": "social-chrome"
				},
				{
					"type": "ion",
					"name": "social-codepen-outline"
				},
				{
					"type": "ion",
					"name": "social-codepen"
				},
				{
					"type": "ion",
					"name": "social-css3-outline"
				},
				{
					"type": "ion",
					"name": "social-css3"
				},
				{
					"type": "ion",
					"name": "social-designernews-outline"
				},
				{
					"type": "ion",
					"name": "social-designernews"
				},
				{
					"type": "ion",
					"name": "social-dribbble-outline"
				},
				{
					"type": "ion",
					"name": "social-dribbble"
				},
				{
					"type": "ion",
					"name": "social-dropbox-outline"
				},
				{
					"type": "ion",
					"name": "social-dropbox"
				},
				{
					"type": "ion",
					"name": "social-euro-outline"
				},
				{
					"type": "ion",
					"name": "social-euro"
				},
				{
					"type": "ion",
					"name": "social-facebook-outline"
				},
				{
					"type": "ion",
					"name": "social-facebook"
				},
				{
					"type": "ion",
					"name": "social-foursquare-outline"
				},
				{
					"type": "ion",
					"name": "social-foursquare"
				},
				{
					"type": "ion",
					"name": "social-freebsd-devil"
				},
				{
					"type": "ion",
					"name": "social-github-outline"
				},
				{
					"type": "ion",
					"name": "social-github"
				},
				{
					"type": "ion",
					"name": "social-google-outline"
				},
				{
					"type": "ion",
					"name": "social-google"
				},
				{
					"type": "ion",
					"name": "social-googleplus-outline"
				},
				{
					"type": "ion",
					"name": "social-googleplus"
				},
				{
					"type": "ion",
					"name": "social-hackernews-outline"
				},
				{
					"type": "ion",
					"name": "social-hackernews"
				},
				{
					"type": "ion",
					"name": "social-html5-outline"
				},
				{
					"type": "ion",
					"name": "social-html5"
				},
				{
					"type": "ion",
					"name": "social-instagram-outline"
				},
				{
					"type": "ion",
					"name": "social-instagram"
				},
				{
					"type": "ion",
					"name": "social-javascript-outline"
				},
				{
					"type": "ion",
					"name": "social-javascript"
				},
				{
					"type": "ion",
					"name": "social-linkedin-outline"
				},
				{
					"type": "ion",
					"name": "social-linkedin"
				},
				{
					"type": "ion",
					"name": "social-markdown"
				},
				{
					"type": "ion",
					"name": "social-nodejs"
				},
				{
					"type": "ion",
					"name": "social-octocat"
				},
				{
					"type": "ion",
					"name": "social-pinterest-outline"
				},
				{
					"type": "ion",
					"name": "social-pinterest"
				},
				{
					"type": "ion",
					"name": "social-python"
				},
				{
					"type": "ion",
					"name": "social-reddit-outline"
				},
				{
					"type": "ion",
					"name": "social-reddit"
				},
				{
					"type": "ion",
					"name": "social-rss-outline"
				},
				{
					"type": "ion",
					"name": "social-rss"
				},
				{
					"type": "ion",
					"name": "social-sass"
				},
				{
					"type": "ion",
					"name": "social-skype-outline"
				},
				{
					"type": "ion",
					"name": "social-skype"
				},
				{
					"type": "ion",
					"name": "social-snapchat-outline"
				},
				{
					"type": "ion",
					"name": "social-snapchat"
				},
				{
					"type": "ion",
					"name": "social-tumblr-outline"
				},
				{
					"type": "ion",
					"name": "social-tumblr"
				},
				{
					"type": "ion",
					"name": "social-tux"
				},
				{
					"type": "ion",
					"name": "social-twitch-outline"
				},
				{
					"type": "ion",
					"name": "social-twitch"
				},
				{
					"type": "ion",
					"name": "social-twitter-outline"
				},
				{
					"type": "ion",
					"name": "social-twitter"
				},
				{
					"type": "ion",
					"name": "social-usd-outline"
				},
				{
					"type": "ion",
					"name": "social-usd"
				},
				{
					"type": "ion",
					"name": "social-vimeo-outline"
				},
				{
					"type": "ion",
					"name": "social-vimeo"
				},
				{
					"type": "ion",
					"name": "social-whatsapp-outline"
				},
				{
					"type": "ion",
					"name": "social-whatsapp"
				},
				{
					"type": "ion",
					"name": "social-windows-outline"
				},
				{
					"type": "ion",
					"name": "social-windows"
				},
				{
					"type": "ion",
					"name": "social-wordpress-outline"
				},
				{
					"type": "ion",
					"name": "social-wordpress"
				},
				{
					"type": "ion",
					"name": "social-yahoo-outline"
				},
				{
					"type": "ion",
					"name": "social-yahoo"
				},
				{
					"type": "ion",
					"name": "social-yen-outline"
				},
				{
					"type": "ion",
					"name": "social-yen"
				},
				{
					"type": "ion",
					"name": "social-youtube-outline"
				},
				{
					"type": "ion",
					"name": "social-youtube"
				},
				{
					"type": "ion",
					"name": "soup-can-outline"
				},
				{
					"type": "ion",
					"name": "soup-can"
				},
				{
					"type": "ion",
					"name": "speakerphone"
				},
				{
					"type": "ion",
					"name": "speedometer"
				},
				{
					"type": "ion",
					"name": "spoon"
				},
				{
					"type": "ion",
					"name": "star"
				},
				{
					"type": "ion",
					"name": "stats-bars"
				},
				{
					"type": "ion",
					"name": "steam"
				},
				{
					"type": "ion",
					"name": "stop"
				},
				{
					"type": "ion",
					"name": "thermometer"
				},
				{
					"type": "ion",
					"name": "thumbsdown"
				},
				{
					"type": "ion",
					"name": "thumbsup"
				},
				{
					"type": "ion",
					"name": "toggle-filled"
				},
				{
					"type": "ion",
					"name": "toggle"
				},
				{
					"type": "ion",
					"name": "transgender"
				},
				{
					"type": "ion",
					"name": "trash-a"
				},
				{
					"type": "ion",
					"name": "trash-b"
				},
				{
					"type": "ion",
					"name": "trophy"
				},
				{
					"type": "ion",
					"name": "tshirt-outline"
				},
				{
					"type": "ion",
					"name": "tshirt"
				},
				{
					"type": "ion",
					"name": "umbrella"
				},
				{
					"type": "ion",
					"name": "university"
				},
				{
					"type": "ion",
					"name": "unlocked"
				},
				{
					"type": "ion",
					"name": "upload"
				},
				{
					"type": "ion",
					"name": "usb"
				},
				{
					"type": "ion",
					"name": "videocamera"
				},
				{
					"type": "ion",
					"name": "volume-high"
				},
				{
					"type": "ion",
					"name": "volume-low"
				},
				{
					"type": "ion",
					"name": "volume-medium"
				},
				{
					"type": "ion",
					"name": "volume-mute"
				},
				{
					"type": "ion",
					"name": "wand"
				},
				{
					"type": "ion",
					"name": "waterdrop"
				},
				{
					"type": "ion",
					"name": "wifi"
				},
				{
					"type": "ion",
					"name": "wineglass"
				},
				{
					"type": "ion",
					"name": "woman"
				},
				{
					"type": "ion",
					"name": "wrench"
				},
				{
					"type": "ion",
					"name": "xbox"
				}
			]
		},
		"md": {
			"name": "material-design",
			"prefix": "md-",
			"repo": "https://github.com/google/material-design-icons.git",
			"icons": [
				{
					"type": "md",
					"name": "3d-rotation"
				},
				{
					"type": "md",
					"name": "ac-unit"
				},
				{
					"type": "md",
					"name": "access-alarm"
				},
				{
					"type": "md",
					"name": "access-alarms"
				},
				{
					"type": "md",
					"name": "access-time"
				},
				{
					"type": "md",
					"name": "accessibility"
				},
				{
					"type": "md",
					"name": "accessible"
				},
				{
					"type": "md",
					"name": "account-balance-wallet"
				},
				{
					"type": "md",
					"name": "account-balance"
				},
				{
					"type": "md",
					"name": "account-box"
				},
				{
					"type": "md",
					"name": "account-circle"
				},
				{
					"type": "md",
					"name": "adb"
				},
				{
					"type": "md",
					"name": "add-a-photo"
				},
				{
					"type": "md",
					"name": "add-alarm"
				},
				{
					"type": "md",
					"name": "add-alert"
				},
				{
					"type": "md",
					"name": "add-box"
				},
				{
					"type": "md",
					"name": "add-circle-outline"
				},
				{
					"type": "md",
					"name": "add-circle"
				},
				{
					"type": "md",
					"name": "add-location"
				},
				{
					"type": "md",
					"name": "add-shopping-cart"
				},
				{
					"type": "md",
					"name": "add-to-photos"
				},
				{
					"type": "md",
					"name": "add-to-queue"
				},
				{
					"type": "md",
					"name": "add"
				},
				{
					"type": "md",
					"name": "adjust"
				},
				{
					"type": "md",
					"name": "airline-seat-flat-angled"
				},
				{
					"type": "md",
					"name": "airline-seat-flat"
				},
				{
					"type": "md",
					"name": "airline-seat-individual-suite"
				},
				{
					"type": "md",
					"name": "airline-seat-legroom-extra"
				},
				{
					"type": "md",
					"name": "airline-seat-legroom-normal"
				},
				{
					"type": "md",
					"name": "airline-seat-legroom-reduced"
				},
				{
					"type": "md",
					"name": "airline-seat-recline-extra"
				},
				{
					"type": "md",
					"name": "airline-seat-recline-normal"
				},
				{
					"type": "md",
					"name": "airplanemode-active"
				},
				{
					"type": "md",
					"name": "airplanemode-inactive"
				},
				{
					"type": "md",
					"name": "airplay"
				},
				{
					"type": "md",
					"name": "airport-shuttle"
				},
				{
					"type": "md",
					"name": "alarm-add"
				},
				{
					"type": "md",
					"name": "alarm-off"
				},
				{
					"type": "md",
					"name": "alarm-on"
				},
				{
					"type": "md",
					"name": "alarm"
				},
				{
					"type": "md",
					"name": "album"
				},
				{
					"type": "md",
					"name": "all-inclusive"
				},
				{
					"type": "md",
					"name": "all-out"
				},
				{
					"type": "md",
					"name": "android"
				},
				{
					"type": "md",
					"name": "announcement"
				},
				{
					"type": "md",
					"name": "apps"
				},
				{
					"type": "md",
					"name": "archive"
				},
				{
					"type": "md",
					"name": "arrow-back"
				},
				{
					"type": "md",
					"name": "arrow-downward"
				},
				{
					"type": "md",
					"name": "arrow-drop-down-circle"
				},
				{
					"type": "md",
					"name": "arrow-drop-down"
				},
				{
					"type": "md",
					"name": "arrow-drop-up"
				},
				{
					"type": "md",
					"name": "arrow-forward"
				},
				{
					"type": "md",
					"name": "arrow-upward"
				},
				{
					"type": "md",
					"name": "art-track"
				},
				{
					"type": "md",
					"name": "aspect-ratio"
				},
				{
					"type": "md",
					"name": "assessment"
				},
				{
					"type": "md",
					"name": "assignment-ind"
				},
				{
					"type": "md",
					"name": "assignment-late"
				},
				{
					"type": "md",
					"name": "assignment-return"
				},
				{
					"type": "md",
					"name": "assignment-returned"
				},
				{
					"type": "md",
					"name": "assignment-turned-in"
				},
				{
					"type": "md",
					"name": "assignment"
				},
				{
					"type": "md",
					"name": "assistant-photo"
				},
				{
					"type": "md",
					"name": "assistant"
				},
				{
					"type": "md",
					"name": "attach-file"
				},
				{
					"type": "md",
					"name": "attach-money"
				},
				{
					"type": "md",
					"name": "attachment"
				},
				{
					"type": "md",
					"name": "audiotrack"
				},
				{
					"type": "md",
					"name": "autorenew"
				},
				{
					"type": "md",
					"name": "av-timer"
				},
				{
					"type": "md",
					"name": "backspace"
				},
				{
					"type": "md",
					"name": "backup"
				},
				{
					"type": "md",
					"name": "battery-20"
				},
				{
					"type": "md",
					"name": "battery-30"
				},
				{
					"type": "md",
					"name": "battery-50"
				},
				{
					"type": "md",
					"name": "battery-60"
				},
				{
					"type": "md",
					"name": "battery-80"
				},
				{
					"type": "md",
					"name": "battery-90"
				},
				{
					"type": "md",
					"name": "battery-alert"
				},
				{
					"type": "md",
					"name": "battery-charging-20"
				},
				{
					"type": "md",
					"name": "battery-charging-30"
				},
				{
					"type": "md",
					"name": "battery-charging-50"
				},
				{
					"type": "md",
					"name": "battery-charging-60"
				},
				{
					"type": "md",
					"name": "battery-charging-80"
				},
				{
					"type": "md",
					"name": "battery-charging-90"
				},
				{
					"type": "md",
					"name": "battery-charging-full"
				},
				{
					"type": "md",
					"name": "battery-full"
				},
				{
					"type": "md",
					"name": "battery-std"
				},
				{
					"type": "md",
					"name": "battery-unknown"
				},
				{
					"type": "md",
					"name": "beach-access"
				},
				{
					"type": "md",
					"name": "beenhere"
				},
				{
					"type": "md",
					"name": "block"
				},
				{
					"type": "md",
					"name": "bluetooth-audio"
				},
				{
					"type": "md",
					"name": "bluetooth-connected"
				},
				{
					"type": "md",
					"name": "bluetooth-disabled"
				},
				{
					"type": "md",
					"name": "bluetooth-searching"
				},
				{
					"type": "md",
					"name": "bluetooth"
				},
				{
					"type": "md",
					"name": "blur-circular"
				},
				{
					"type": "md",
					"name": "blur-linear"
				},
				{
					"type": "md",
					"name": "blur-off"
				},
				{
					"type": "md",
					"name": "blur-on"
				},
				{
					"type": "md",
					"name": "book"
				},
				{
					"type": "md",
					"name": "bookmark-border"
				},
				{
					"type": "md",
					"name": "bookmark"
				},
				{
					"type": "md",
					"name": "border-all"
				},
				{
					"type": "md",
					"name": "border-bottom"
				},
				{
					"type": "md",
					"name": "border-clear"
				},
				{
					"type": "md",
					"name": "border-color"
				},
				{
					"type": "md",
					"name": "border-horizontal"
				},
				{
					"type": "md",
					"name": "border-inner"
				},
				{
					"type": "md",
					"name": "border-left"
				},
				{
					"type": "md",
					"name": "border-outer"
				},
				{
					"type": "md",
					"name": "border-right"
				},
				{
					"type": "md",
					"name": "border-style"
				},
				{
					"type": "md",
					"name": "border-top"
				},
				{
					"type": "md",
					"name": "border-vertical"
				},
				{
					"type": "md",
					"name": "branding-watermark"
				},
				{
					"type": "md",
					"name": "brightness-1"
				},
				{
					"type": "md",
					"name": "brightness-2"
				},
				{
					"type": "md",
					"name": "brightness-3"
				},
				{
					"type": "md",
					"name": "brightness-4"
				},
				{
					"type": "md",
					"name": "brightness-5"
				},
				{
					"type": "md",
					"name": "brightness-6"
				},
				{
					"type": "md",
					"name": "brightness-7"
				},
				{
					"type": "md",
					"name": "brightness-auto"
				},
				{
					"type": "md",
					"name": "brightness-high"
				},
				{
					"type": "md",
					"name": "brightness-low"
				},
				{
					"type": "md",
					"name": "brightness-medium"
				},
				{
					"type": "md",
					"name": "broken-image"
				},
				{
					"type": "md",
					"name": "brush"
				},
				{
					"type": "md",
					"name": "bubble-chart"
				},
				{
					"type": "md",
					"name": "bug-report"
				},
				{
					"type": "md",
					"name": "build"
				},
				{
					"type": "md",
					"name": "burst-mode"
				},
				{
					"type": "md",
					"name": "business-center"
				},
				{
					"type": "md",
					"name": "business"
				},
				{
					"type": "md",
					"name": "cached"
				},
				{
					"type": "md",
					"name": "cake"
				},
				{
					"type": "md",
					"name": "call-end"
				},
				{
					"type": "md",
					"name": "call-made"
				},
				{
					"type": "md",
					"name": "call-merge"
				},
				{
					"type": "md",
					"name": "call-missed-outgoing"
				},
				{
					"type": "md",
					"name": "call-missed"
				},
				{
					"type": "md",
					"name": "call-received"
				},
				{
					"type": "md",
					"name": "call-split"
				},
				{
					"type": "md",
					"name": "call-to-action"
				},
				{
					"type": "md",
					"name": "call"
				},
				{
					"type": "md",
					"name": "camera-alt"
				},
				{
					"type": "md",
					"name": "camera-front"
				},
				{
					"type": "md",
					"name": "camera-rear"
				},
				{
					"type": "md",
					"name": "camera-roll"
				},
				{
					"type": "md",
					"name": "camera"
				},
				{
					"type": "md",
					"name": "cancel"
				},
				{
					"type": "md",
					"name": "card-giftcard"
				},
				{
					"type": "md",
					"name": "card-membership"
				},
				{
					"type": "md",
					"name": "card-travel"
				},
				{
					"type": "md",
					"name": "casino"
				},
				{
					"type": "md",
					"name": "cast-connected"
				},
				{
					"type": "md",
					"name": "cast"
				},
				{
					"type": "md",
					"name": "center-focus-strong"
				},
				{
					"type": "md",
					"name": "center-focus-weak"
				},
				{
					"type": "md",
					"name": "change-history"
				},
				{
					"type": "md",
					"name": "chat-bubble-outline"
				},
				{
					"type": "md",
					"name": "chat-bubble"
				},
				{
					"type": "md",
					"name": "chat"
				},
				{
					"type": "md",
					"name": "check-box-outline-blank"
				},
				{
					"type": "md",
					"name": "check-box"
				},
				{
					"type": "md",
					"name": "check-circle"
				},
				{
					"type": "md",
					"name": "check"
				},
				{
					"type": "md",
					"name": "chevron-left"
				},
				{
					"type": "md",
					"name": "chevron-right"
				},
				{
					"type": "md",
					"name": "child-care"
				},
				{
					"type": "md",
					"name": "child-friendly"
				},
				{
					"type": "md",
					"name": "chrome-reader-mode"
				},
				{
					"type": "md",
					"name": "class"
				},
				{
					"type": "md",
					"name": "clear-all"
				},
				{
					"type": "md",
					"name": "clear"
				},
				{
					"type": "md",
					"name": "close"
				},
				{
					"type": "md",
					"name": "closed-caption"
				},
				{
					"type": "md",
					"name": "cloud-circle"
				},
				{
					"type": "md",
					"name": "cloud-done"
				},
				{
					"type": "md",
					"name": "cloud-download"
				},
				{
					"type": "md",
					"name": "cloud-off"
				},
				{
					"type": "md",
					"name": "cloud-queue"
				},
				{
					"type": "md",
					"name": "cloud-upload"
				},
				{
					"type": "md",
					"name": "cloud"
				},
				{
					"type": "md",
					"name": "code"
				},
				{
					"type": "md",
					"name": "collections"
				},
				{
					"type": "md",
					"name": "color-lens"
				},
				{
					"type": "md",
					"name": "colorize"
				},
				{
					"type": "md",
					"name": "comment"
				},
				{
					"type": "md",
					"name": "compare-arrows"
				},
				{
					"type": "md",
					"name": "compare"
				},
				{
					"type": "md",
					"name": "computer"
				},
				{
					"type": "md",
					"name": "confirmation-number"
				},
				{
					"type": "md",
					"name": "contact-mail"
				},
				{
					"type": "md",
					"name": "contact-phone"
				},
				{
					"type": "md",
					"name": "contacts"
				},
				{
					"type": "md",
					"name": "content-copy"
				},
				{
					"type": "md",
					"name": "content-cut"
				},
				{
					"type": "md",
					"name": "content-paste"
				},
				{
					"type": "md",
					"name": "control-point-duplicate"
				},
				{
					"type": "md",
					"name": "control-point"
				},
				{
					"type": "md",
					"name": "copyright"
				},
				{
					"type": "md",
					"name": "create-new-folder"
				},
				{
					"type": "md",
					"name": "create"
				},
				{
					"type": "md",
					"name": "credit-card"
				},
				{
					"type": "md",
					"name": "crop-16-9"
				},
				{
					"type": "md",
					"name": "crop-3-2"
				},
				{
					"type": "md",
					"name": "crop-5-4"
				},
				{
					"type": "md",
					"name": "crop-7-5"
				},
				{
					"type": "md",
					"name": "crop-din"
				},
				{
					"type": "md",
					"name": "crop-free"
				},
				{
					"type": "md",
					"name": "crop-landscape"
				},
				{
					"type": "md",
					"name": "crop-original"
				},
				{
					"type": "md",
					"name": "crop-portrait"
				},
				{
					"type": "md",
					"name": "crop-rotate"
				},
				{
					"type": "md",
					"name": "crop-square"
				},
				{
					"type": "md",
					"name": "crop"
				},
				{
					"type": "md",
					"name": "dashboard"
				},
				{
					"type": "md",
					"name": "data-usage"
				},
				{
					"type": "md",
					"name": "date-range"
				},
				{
					"type": "md",
					"name": "dehaze"
				},
				{
					"type": "md",
					"name": "delete-forever"
				},
				{
					"type": "md",
					"name": "delete-sweep"
				},
				{
					"type": "md",
					"name": "delete"
				},
				{
					"type": "md",
					"name": "description"
				},
				{
					"type": "md",
					"name": "desktop-mac"
				},
				{
					"type": "md",
					"name": "desktop-windows"
				},
				{
					"type": "md",
					"name": "details"
				},
				{
					"type": "md",
					"name": "developer-board"
				},
				{
					"type": "md",
					"name": "developer-mode"
				},
				{
					"type": "md",
					"name": "devices-other"
				},
				{
					"type": "md",
					"name": "devices"
				},
				{
					"type": "md",
					"name": "dialer-sip"
				},
				{
					"type": "md",
					"name": "dialpad"
				},
				{
					"type": "md",
					"name": "directions-bike"
				},
				{
					"type": "md",
					"name": "directions-boat"
				},
				{
					"type": "md",
					"name": "directions-bus"
				},
				{
					"type": "md",
					"name": "directions-car"
				},
				{
					"type": "md",
					"name": "directions-railway"
				},
				{
					"type": "md",
					"name": "directions-run"
				},
				{
					"type": "md",
					"name": "directions-subway"
				},
				{
					"type": "md",
					"name": "directions-transit"
				},
				{
					"type": "md",
					"name": "directions-walk"
				},
				{
					"type": "md",
					"name": "directions"
				},
				{
					"type": "md",
					"name": "disc-full"
				},
				{
					"type": "md",
					"name": "dns"
				},
				{
					"type": "md",
					"name": "do-not-disturb-alt"
				},
				{
					"type": "md",
					"name": "do-not-disturb-off"
				},
				{
					"type": "md",
					"name": "do-not-disturb-on"
				},
				{
					"type": "md",
					"name": "do-not-disturb"
				},
				{
					"type": "md",
					"name": "dock"
				},
				{
					"type": "md",
					"name": "domain"
				},
				{
					"type": "md",
					"name": "done-all"
				},
				{
					"type": "md",
					"name": "done"
				},
				{
					"type": "md",
					"name": "donut-large"
				},
				{
					"type": "md",
					"name": "donut-small"
				},
				{
					"type": "md",
					"name": "drafts"
				},
				{
					"type": "md",
					"name": "drag-handle"
				},
				{
					"type": "md",
					"name": "drive-eta"
				},
				{
					"type": "md",
					"name": "dvr"
				},
				{
					"type": "md",
					"name": "edit-location"
				},
				{
					"type": "md",
					"name": "edit"
				},
				{
					"type": "md",
					"name": "email"
				},
				{
					"type": "md",
					"name": "enhanced-encryption"
				},
				{
					"type": "md",
					"name": "equalizer"
				},
				{
					"type": "md",
					"name": "error-outline"
				},
				{
					"type": "md",
					"name": "error"
				},
				{
					"type": "md",
					"name": "euro-symbol"
				},
				{
					"type": "md",
					"name": "ev-station"
				},
				{
					"type": "md",
					"name": "event-available"
				},
				{
					"type": "md",
					"name": "event-busy"
				},
				{
					"type": "md",
					"name": "event-note"
				},
				{
					"type": "md",
					"name": "event-seat"
				},
				{
					"type": "md",
					"name": "event"
				},
				{
					"type": "md",
					"name": "exit-to-app"
				},
				{
					"type": "md",
					"name": "expand-less"
				},
				{
					"type": "md",
					"name": "expand-more"
				},
				{
					"type": "md",
					"name": "explicit"
				},
				{
					"type": "md",
					"name": "explore"
				},
				{
					"type": "md",
					"name": "exposure-neg-1"
				},
				{
					"type": "md",
					"name": "exposure-neg-2"
				},
				{
					"type": "md",
					"name": "exposure-plus-1"
				},
				{
					"type": "md",
					"name": "exposure-plus-2"
				},
				{
					"type": "md",
					"name": "exposure-zero"
				},
				{
					"type": "md",
					"name": "exposure"
				},
				{
					"type": "md",
					"name": "extension"
				},
				{
					"type": "md",
					"name": "face"
				},
				{
					"type": "md",
					"name": "fast-forward"
				},
				{
					"type": "md",
					"name": "fast-rewind"
				},
				{
					"type": "md",
					"name": "favorite-border"
				},
				{
					"type": "md",
					"name": "favorite"
				},
				{
					"type": "md",
					"name": "featured-play-list"
				},
				{
					"type": "md",
					"name": "featured-video"
				},
				{
					"type": "md",
					"name": "feedback"
				},
				{
					"type": "md",
					"name": "fiber-dvr"
				},
				{
					"type": "md",
					"name": "fiber-manual-record"
				},
				{
					"type": "md",
					"name": "fiber-new"
				},
				{
					"type": "md",
					"name": "fiber-pin"
				},
				{
					"type": "md",
					"name": "fiber-smart-record"
				},
				{
					"type": "md",
					"name": "file-download"
				},
				{
					"type": "md",
					"name": "file-upload"
				},
				{
					"type": "md",
					"name": "filter-1"
				},
				{
					"type": "md",
					"name": "filter-2"
				},
				{
					"type": "md",
					"name": "filter-3"
				},
				{
					"type": "md",
					"name": "filter-4"
				},
				{
					"type": "md",
					"name": "filter-5"
				},
				{
					"type": "md",
					"name": "filter-6"
				},
				{
					"type": "md",
					"name": "filter-7"
				},
				{
					"type": "md",
					"name": "filter-8"
				},
				{
					"type": "md",
					"name": "filter-9-plus"
				},
				{
					"type": "md",
					"name": "filter-9"
				},
				{
					"type": "md",
					"name": "filter-b-and-w"
				},
				{
					"type": "md",
					"name": "filter-center-focus"
				},
				{
					"type": "md",
					"name": "filter-drama"
				},
				{
					"type": "md",
					"name": "filter-frames"
				},
				{
					"type": "md",
					"name": "filter-hdr"
				},
				{
					"type": "md",
					"name": "filter-list"
				},
				{
					"type": "md",
					"name": "filter-none"
				},
				{
					"type": "md",
					"name": "filter-tilt-shift"
				},
				{
					"type": "md",
					"name": "filter-vintage"
				},
				{
					"type": "md",
					"name": "filter"
				},
				{
					"type": "md",
					"name": "find-in-page"
				},
				{
					"type": "md",
					"name": "find-replace"
				},
				{
					"type": "md",
					"name": "fingerprint"
				},
				{
					"type": "md",
					"name": "first-page"
				},
				{
					"type": "md",
					"name": "fitness-center"
				},
				{
					"type": "md",
					"name": "flag"
				},
				{
					"type": "md",
					"name": "flare"
				},
				{
					"type": "md",
					"name": "flash-auto"
				},
				{
					"type": "md",
					"name": "flash-off"
				},
				{
					"type": "md",
					"name": "flash-on"
				},
				{
					"type": "md",
					"name": "flight-land"
				},
				{
					"type": "md",
					"name": "flight-takeoff"
				},
				{
					"type": "md",
					"name": "flight"
				},
				{
					"type": "md",
					"name": "flip-to-back"
				},
				{
					"type": "md",
					"name": "flip-to-front"
				},
				{
					"type": "md",
					"name": "flip"
				},
				{
					"type": "md",
					"name": "folder-open"
				},
				{
					"type": "md",
					"name": "folder-shared"
				},
				{
					"type": "md",
					"name": "folder-special"
				},
				{
					"type": "md",
					"name": "folder"
				},
				{
					"type": "md",
					"name": "format-align-center"
				},
				{
					"type": "md",
					"name": "format-align-justify"
				},
				{
					"type": "md",
					"name": "format-align-left"
				},
				{
					"type": "md",
					"name": "format-align-right"
				},
				{
					"type": "md",
					"name": "format-bold"
				},
				{
					"type": "md",
					"name": "format-clear"
				},
				{
					"type": "md",
					"name": "format-color-fill"
				},
				{
					"type": "md",
					"name": "format-color-reset"
				},
				{
					"type": "md",
					"name": "format-color-text"
				},
				{
					"type": "md",
					"name": "format-indent-decrease"
				},
				{
					"type": "md",
					"name": "format-indent-increase"
				},
				{
					"type": "md",
					"name": "format-italic"
				},
				{
					"type": "md",
					"name": "format-line-spacing"
				},
				{
					"type": "md",
					"name": "format-list-bulleted"
				},
				{
					"type": "md",
					"name": "format-list-numbered"
				},
				{
					"type": "md",
					"name": "format-paint"
				},
				{
					"type": "md",
					"name": "format-quote"
				},
				{
					"type": "md",
					"name": "format-shapes"
				},
				{
					"type": "md",
					"name": "format-size"
				},
				{
					"type": "md",
					"name": "format-strikethrough"
				},
				{
					"type": "md",
					"name": "format-textdirection-l-to-r"
				},
				{
					"type": "md",
					"name": "format-textdirection-r-to-l"
				},
				{
					"type": "md",
					"name": "format-underlined"
				},
				{
					"type": "md",
					"name": "forum"
				},
				{
					"type": "md",
					"name": "forward-10"
				},
				{
					"type": "md",
					"name": "forward-30"
				},
				{
					"type": "md",
					"name": "forward-5"
				},
				{
					"type": "md",
					"name": "forward"
				},
				{
					"type": "md",
					"name": "free-breakfast"
				},
				{
					"type": "md",
					"name": "fullscreen-exit"
				},
				{
					"type": "md",
					"name": "fullscreen"
				},
				{
					"type": "md",
					"name": "functions"
				},
				{
					"type": "md",
					"name": "g-translate"
				},
				{
					"type": "md",
					"name": "gamepad"
				},
				{
					"type": "md",
					"name": "games"
				},
				{
					"type": "md",
					"name": "gavel"
				},
				{
					"type": "md",
					"name": "gesture"
				},
				{
					"type": "md",
					"name": "get-app"
				},
				{
					"type": "md",
					"name": "golf-course"
				},
				{
					"type": "md",
					"name": "gps-fixed"
				},
				{
					"type": "md",
					"name": "gps-not-fixed"
				},
				{
					"type": "md",
					"name": "gps-off"
				},
				{
					"type": "md",
					"name": "grade"
				},
				{
					"type": "md",
					"name": "gradient"
				},
				{
					"type": "md",
					"name": "grain"
				},
				{
					"type": "md",
					"name": "graphic-eq"
				},
				{
					"type": "md",
					"name": "grid-off"
				},
				{
					"type": "md",
					"name": "grid-on"
				},
				{
					"type": "md",
					"name": "group-add"
				},
				{
					"type": "md",
					"name": "group-work"
				},
				{
					"type": "md",
					"name": "group"
				},
				{
					"type": "md",
					"name": "hdr-off"
				},
				{
					"type": "md",
					"name": "hdr-on"
				},
				{
					"type": "md",
					"name": "hdr-strong"
				},
				{
					"type": "md",
					"name": "hdr-weak"
				},
				{
					"type": "md",
					"name": "headset-mic"
				},
				{
					"type": "md",
					"name": "headset"
				},
				{
					"type": "md",
					"name": "healing"
				},
				{
					"type": "md",
					"name": "hearing"
				},
				{
					"type": "md",
					"name": "help"
				},
				{
					"type": "md",
					"name": "high-quality"
				},
				{
					"type": "md",
					"name": "highlight-off"
				},
				{
					"type": "md",
					"name": "highlight"
				},
				{
					"type": "md",
					"name": "history"
				},
				{
					"type": "md",
					"name": "home"
				},
				{
					"type": "md",
					"name": "hot-tub"
				},
				{
					"type": "md",
					"name": "hotel"
				},
				{
					"type": "md",
					"name": "hourglass-empty"
				},
				{
					"type": "md",
					"name": "hourglass-full"
				},
				{
					"type": "md",
					"name": "http"
				},
				{
					"type": "md",
					"name": "https"
				},
				{
					"type": "md",
					"name": "image-aspect-ratio"
				},
				{
					"type": "md",
					"name": "image"
				},
				{
					"type": "md",
					"name": "import-contacts"
				},
				{
					"type": "md",
					"name": "import-export"
				},
				{
					"type": "md",
					"name": "important-devices"
				},
				{
					"type": "md",
					"name": "inbox"
				},
				{
					"type": "md",
					"name": "info-outline"
				},
				{
					"type": "md",
					"name": "info"
				},
				{
					"type": "md",
					"name": "input"
				},
				{
					"type": "md",
					"name": "insert-chart"
				},
				{
					"type": "md",
					"name": "insert-comment"
				},
				{
					"type": "md",
					"name": "insert-drive-file"
				},
				{
					"type": "md",
					"name": "insert-emoticon"
				},
				{
					"type": "md",
					"name": "insert-invitation"
				},
				{
					"type": "md",
					"name": "insert-link"
				},
				{
					"type": "md",
					"name": "insert-photo"
				},
				{
					"type": "md",
					"name": "invert-colors-off"
				},
				{
					"type": "md",
					"name": "invert-colors"
				},
				{
					"type": "md",
					"name": "iso"
				},
				{
					"type": "md",
					"name": "keyboard-arrow-down"
				},
				{
					"type": "md",
					"name": "keyboard-arrow-left"
				},
				{
					"type": "md",
					"name": "keyboard-arrow-right"
				},
				{
					"type": "md",
					"name": "keyboard-arrow-up"
				},
				{
					"type": "md",
					"name": "keyboard-backspace"
				},
				{
					"type": "md",
					"name": "keyboard-capslock"
				},
				{
					"type": "md",
					"name": "keyboard-hide"
				},
				{
					"type": "md",
					"name": "keyboard-return"
				},
				{
					"type": "md",
					"name": "keyboard-tab"
				},
				{
					"type": "md",
					"name": "keyboard-voice"
				},
				{
					"type": "md",
					"name": "keyboard"
				},
				{
					"type": "md",
					"name": "kitchen"
				},
				{
					"type": "md",
					"name": "label-outline"
				},
				{
					"type": "md",
					"name": "label"
				},
				{
					"type": "md",
					"name": "landscape"
				},
				{
					"type": "md",
					"name": "language"
				},
				{
					"type": "md",
					"name": "laptop-chromebook"
				},
				{
					"type": "md",
					"name": "laptop-mac"
				},
				{
					"type": "md",
					"name": "laptop-windows"
				},
				{
					"type": "md",
					"name": "laptop"
				},
				{
					"type": "md",
					"name": "last-page"
				},
				{
					"type": "md",
					"name": "launch"
				},
				{
					"type": "md",
					"name": "layers-clear"
				},
				{
					"type": "md",
					"name": "layers"
				},
				{
					"type": "md",
					"name": "leak-add"
				},
				{
					"type": "md",
					"name": "leak-remove"
				},
				{
					"type": "md",
					"name": "lens"
				},
				{
					"type": "md",
					"name": "library-add"
				},
				{
					"type": "md",
					"name": "library-books"
				},
				{
					"type": "md",
					"name": "library-music"
				},
				{
					"type": "md",
					"name": "lightbulb-outline"
				},
				{
					"type": "md",
					"name": "line-style"
				},
				{
					"type": "md",
					"name": "line-weight"
				},
				{
					"type": "md",
					"name": "linear-scale"
				},
				{
					"type": "md",
					"name": "link"
				},
				{
					"type": "md",
					"name": "linked-camera"
				},
				{
					"type": "md",
					"name": "list"
				},
				{
					"type": "md",
					"name": "live-help"
				},
				{
					"type": "md",
					"name": "live-tv"
				},
				{
					"type": "md",
					"name": "local-activity"
				},
				{
					"type": "md",
					"name": "local-airport"
				},
				{
					"type": "md",
					"name": "local-atm"
				},
				{
					"type": "md",
					"name": "local-bar"
				},
				{
					"type": "md",
					"name": "local-cafe"
				},
				{
					"type": "md",
					"name": "local-car-wash"
				},
				{
					"type": "md",
					"name": "local-convenience-store"
				},
				{
					"type": "md",
					"name": "local-dining"
				},
				{
					"type": "md",
					"name": "local-drink"
				},
				{
					"type": "md",
					"name": "local-florist"
				},
				{
					"type": "md",
					"name": "local-gas-station"
				},
				{
					"type": "md",
					"name": "local-grocery-store"
				},
				{
					"type": "md",
					"name": "local-hospital"
				},
				{
					"type": "md",
					"name": "local-hotel"
				},
				{
					"type": "md",
					"name": "local-laundry-service"
				},
				{
					"type": "md",
					"name": "local-library"
				},
				{
					"type": "md",
					"name": "local-mall"
				},
				{
					"type": "md",
					"name": "local-movies"
				},
				{
					"type": "md",
					"name": "local-offer"
				},
				{
					"type": "md",
					"name": "local-parking"
				},
				{
					"type": "md",
					"name": "local-pharmacy"
				},
				{
					"type": "md",
					"name": "local-phone"
				},
				{
					"type": "md",
					"name": "local-pizza"
				},
				{
					"type": "md",
					"name": "local-play"
				},
				{
					"type": "md",
					"name": "local-post-office"
				},
				{
					"type": "md",
					"name": "local-printshop"
				},
				{
					"type": "md",
					"name": "local-see"
				},
				{
					"type": "md",
					"name": "local-shipping"
				},
				{
					"type": "md",
					"name": "local-taxi"
				},
				{
					"type": "md",
					"name": "location-city"
				},
				{
					"type": "md",
					"name": "location-disabled"
				},
				{
					"type": "md",
					"name": "location-off"
				},
				{
					"type": "md",
					"name": "location-on"
				},
				{
					"type": "md",
					"name": "location-searching"
				},
				{
					"type": "md",
					"name": "lock-open"
				},
				{
					"type": "md",
					"name": "lock-outline"
				},
				{
					"type": "md",
					"name": "lock"
				},
				{
					"type": "md",
					"name": "looks-3"
				},
				{
					"type": "md",
					"name": "looks-4"
				},
				{
					"type": "md",
					"name": "looks-5"
				},
				{
					"type": "md",
					"name": "looks-6"
				},
				{
					"type": "md",
					"name": "looks-one"
				},
				{
					"type": "md",
					"name": "looks-two"
				},
				{
					"type": "md",
					"name": "looks"
				},
				{
					"type": "md",
					"name": "loop"
				},
				{
					"type": "md",
					"name": "loupe"
				},
				{
					"type": "md",
					"name": "low-priority"
				},
				{
					"type": "md",
					"name": "loyalty"
				},
				{
					"type": "md",
					"name": "mail-outline"
				},
				{
					"type": "md",
					"name": "mail"
				},
				{
					"type": "md",
					"name": "map"
				},
				{
					"type": "md",
					"name": "markunread-mailbox"
				},
				{
					"type": "md",
					"name": "markunread"
				},
				{
					"type": "md",
					"name": "memory"
				},
				{
					"type": "md",
					"name": "menu"
				},
				{
					"type": "md",
					"name": "merge-type"
				},
				{
					"type": "md",
					"name": "message"
				},
				{
					"type": "md",
					"name": "mic-none"
				},
				{
					"type": "md",
					"name": "mic-off"
				},
				{
					"type": "md",
					"name": "mic"
				},
				{
					"type": "md",
					"name": "mms"
				},
				{
					"type": "md",
					"name": "mode-comment"
				},
				{
					"type": "md",
					"name": "mode-edit"
				},
				{
					"type": "md",
					"name": "monetization-on"
				},
				{
					"type": "md",
					"name": "monochrome-photos"
				},
				{
					"type": "md",
					"name": "mood-bad"
				},
				{
					"type": "md",
					"name": "mood"
				},
				{
					"type": "md",
					"name": "more-horiz"
				},
				{
					"type": "md",
					"name": "more-vert"
				},
				{
					"type": "md",
					"name": "more"
				},
				{
					"type": "md",
					"name": "motorcycle"
				},
				{
					"type": "md",
					"name": "mouse"
				},
				{
					"type": "md",
					"name": "move-to-inbox"
				},
				{
					"type": "md",
					"name": "movie-creation"
				},
				{
					"type": "md",
					"name": "movie-filter"
				},
				{
					"type": "md",
					"name": "movie"
				},
				{
					"type": "md",
					"name": "multiline-chart"
				},
				{
					"type": "md",
					"name": "music-note"
				},
				{
					"type": "md",
					"name": "music-video"
				},
				{
					"type": "md",
					"name": "my-location"
				},
				{
					"type": "md",
					"name": "nature-people"
				},
				{
					"type": "md",
					"name": "nature"
				},
				{
					"type": "md",
					"name": "navigate-before"
				},
				{
					"type": "md",
					"name": "navigate-next"
				},
				{
					"type": "md",
					"name": "navigation"
				},
				{
					"type": "md",
					"name": "near-me"
				},
				{
					"type": "md",
					"name": "network-cell"
				},
				{
					"type": "md",
					"name": "network-check"
				},
				{
					"type": "md",
					"name": "network-locked"
				},
				{
					"type": "md",
					"name": "network-wifi"
				},
				{
					"type": "md",
					"name": "new-releases"
				},
				{
					"type": "md",
					"name": "next-week"
				},
				{
					"type": "md",
					"name": "nfc"
				},
				{
					"type": "md",
					"name": "no-encryption"
				},
				{
					"type": "md",
					"name": "no-sim"
				},
				{
					"type": "md",
					"name": "not-interested"
				},
				{
					"type": "md",
					"name": "note-add"
				},
				{
					"type": "md",
					"name": "note"
				},
				{
					"type": "md",
					"name": "notifications-active"
				},
				{
					"type": "md",
					"name": "notifications-none"
				},
				{
					"type": "md",
					"name": "notifications-off"
				},
				{
					"type": "md",
					"name": "notifications-paused"
				},
				{
					"type": "md",
					"name": "notifications"
				},
				{
					"type": "md",
					"name": "ondemand-video"
				},
				{
					"type": "md",
					"name": "opacity"
				},
				{
					"type": "md",
					"name": "open-in-browser"
				},
				{
					"type": "md",
					"name": "open-in-new"
				},
				{
					"type": "md",
					"name": "open-with"
				},
				{
					"type": "md",
					"name": "pages"
				},
				{
					"type": "md",
					"name": "pageview"
				},
				{
					"type": "md",
					"name": "palette"
				},
				{
					"type": "md",
					"name": "pan-tool"
				},
				{
					"type": "md",
					"name": "panorama-fish-eye"
				},
				{
					"type": "md",
					"name": "panorama-horizontal"
				},
				{
					"type": "md",
					"name": "panorama-vertical"
				},
				{
					"type": "md",
					"name": "panorama-wide-angle"
				},
				{
					"type": "md",
					"name": "panorama"
				},
				{
					"type": "md",
					"name": "party-mode"
				},
				{
					"type": "md",
					"name": "pause-circle-filled"
				},
				{
					"type": "md",
					"name": "pause-circle-outline"
				},
				{
					"type": "md",
					"name": "pause"
				},
				{
					"type": "md",
					"name": "payment"
				},
				{
					"type": "md",
					"name": "people-outline"
				},
				{
					"type": "md",
					"name": "people"
				},
				{
					"type": "md",
					"name": "perm-camera-mic"
				},
				{
					"type": "md",
					"name": "perm-contact-calendar"
				},
				{
					"type": "md",
					"name": "perm-data-setting"
				},
				{
					"type": "md",
					"name": "perm-device-information"
				},
				{
					"type": "md",
					"name": "perm-identity"
				},
				{
					"type": "md",
					"name": "perm-media"
				},
				{
					"type": "md",
					"name": "perm-phone-msg"
				},
				{
					"type": "md",
					"name": "perm-scan-wifi"
				},
				{
					"type": "md",
					"name": "person-add"
				},
				{
					"type": "md",
					"name": "person-outline"
				},
				{
					"type": "md",
					"name": "person-pin-circle"
				},
				{
					"type": "md",
					"name": "person-pin"
				},
				{
					"type": "md",
					"name": "person"
				},
				{
					"type": "md",
					"name": "personal-video"
				},
				{
					"type": "md",
					"name": "pets"
				},
				{
					"type": "md",
					"name": "phone-android"
				},
				{
					"type": "md",
					"name": "phone-bluetooth-speaker"
				},
				{
					"type": "md",
					"name": "phone-forwarded"
				},
				{
					"type": "md",
					"name": "phone-in-talk"
				},
				{
					"type": "md",
					"name": "phone-iphone"
				},
				{
					"type": "md",
					"name": "phone-locked"
				},
				{
					"type": "md",
					"name": "phone-missed"
				},
				{
					"type": "md",
					"name": "phone-paused"
				},
				{
					"type": "md",
					"name": "phone"
				},
				{
					"type": "md",
					"name": "phonelink-off"
				},
				{
					"type": "md",
					"name": "phonelink"
				},
				{
					"type": "md",
					"name": "photo-album"
				},
				{
					"type": "md",
					"name": "photo-camera"
				},
				{
					"type": "md",
					"name": "photo-filter"
				},
				{
					"type": "md",
					"name": "photo-library"
				},
				{
					"type": "md",
					"name": "photo"
				},
				{
					"type": "md",
					"name": "picture-as-pdf"
				},
				{
					"type": "md",
					"name": "picture-in-picture-alt"
				},
				{
					"type": "md",
					"name": "picture-in-picture"
				},
				{
					"type": "md",
					"name": "pie-chart-outlined"
				},
				{
					"type": "md",
					"name": "pie-chart"
				},
				{
					"type": "md",
					"name": "pin-drop"
				},
				{
					"type": "md",
					"name": "place"
				},
				{
					"type": "md",
					"name": "play-arrow"
				},
				{
					"type": "md",
					"name": "play-circle-filled-white"
				},
				{
					"type": "md",
					"name": "play-circle-filled"
				},
				{
					"type": "md",
					"name": "play-circle-outline"
				},
				{
					"type": "md",
					"name": "play-for-work"
				},
				{
					"type": "md",
					"name": "playlist-add-check"
				},
				{
					"type": "md",
					"name": "playlist-add"
				},
				{
					"type": "md",
					"name": "playlist-play"
				},
				{
					"type": "md",
					"name": "plus-one"
				},
				{
					"type": "md",
					"name": "poll"
				},
				{
					"type": "md",
					"name": "polymer"
				},
				{
					"type": "md",
					"name": "pool"
				},
				{
					"type": "md",
					"name": "portable-wifi-off"
				},
				{
					"type": "md",
					"name": "portrait"
				},
				{
					"type": "md",
					"name": "power-input"
				},
				{
					"type": "md",
					"name": "power-settings-new"
				},
				{
					"type": "md",
					"name": "power"
				},
				{
					"type": "md",
					"name": "pregnant-woman"
				},
				{
					"type": "md",
					"name": "present-to-all"
				},
				{
					"type": "md",
					"name": "print"
				},
				{
					"type": "md",
					"name": "priority-high"
				},
				{
					"type": "md",
					"name": "public"
				},
				{
					"type": "md",
					"name": "publish"
				},
				{
					"type": "md",
					"name": "query-builder"
				},
				{
					"type": "md",
					"name": "question-answer"
				},
				{
					"type": "md",
					"name": "queue-music"
				},
				{
					"type": "md",
					"name": "queue-play-next"
				},
				{
					"type": "md",
					"name": "queue"
				},
				{
					"type": "md",
					"name": "radio-button-checked"
				},
				{
					"type": "md",
					"name": "radio-button-unchecked"
				},
				{
					"type": "md",
					"name": "radio"
				},
				{
					"type": "md",
					"name": "rate-review"
				},
				{
					"type": "md",
					"name": "receipt"
				},
				{
					"type": "md",
					"name": "recent-actors"
				},
				{
					"type": "md",
					"name": "record-voice-over"
				},
				{
					"type": "md",
					"name": "redeem"
				},
				{
					"type": "md",
					"name": "redo"
				},
				{
					"type": "md",
					"name": "refresh"
				},
				{
					"type": "md",
					"name": "remove-circle-outline"
				},
				{
					"type": "md",
					"name": "remove-circle"
				},
				{
					"type": "md",
					"name": "remove-from-queue"
				},
				{
					"type": "md",
					"name": "remove-red-eye"
				},
				{
					"type": "md",
					"name": "remove-shopping-cart"
				},
				{
					"type": "md",
					"name": "remove"
				},
				{
					"type": "md",
					"name": "repeat-one"
				},
				{
					"type": "md",
					"name": "repeat"
				},
				{
					"type": "md",
					"name": "replay-10"
				},
				{
					"type": "md",
					"name": "replay-30"
				},
				{
					"type": "md",
					"name": "replay-5"
				},
				{
					"type": "md",
					"name": "replay"
				},
				{
					"type": "md",
					"name": "reply-all"
				},
				{
					"type": "md",
					"name": "reply"
				},
				{
					"type": "md",
					"name": "report-problem"
				},
				{
					"type": "md",
					"name": "report"
				},
				{
					"type": "md",
					"name": "restaurant-menu"
				},
				{
					"type": "md",
					"name": "restaurant"
				},
				{
					"type": "md",
					"name": "restore-page"
				},
				{
					"type": "md",
					"name": "restore"
				},
				{
					"type": "md",
					"name": "ring-volume"
				},
				{
					"type": "md",
					"name": "room-service"
				},
				{
					"type": "md",
					"name": "room"
				},
				{
					"type": "md",
					"name": "rotate-90-degrees-ccw"
				},
				{
					"type": "md",
					"name": "rotate-left"
				},
				{
					"type": "md",
					"name": "rotate-right"
				},
				{
					"type": "md",
					"name": "rounded-corner"
				},
				{
					"type": "md",
					"name": "router"
				},
				{
					"type": "md",
					"name": "rowing"
				},
				{
					"type": "md",
					"name": "rss-feed"
				},
				{
					"type": "md",
					"name": "rv-hookup"
				},
				{
					"type": "md",
					"name": "satellite"
				},
				{
					"type": "md",
					"name": "save"
				},
				{
					"type": "md",
					"name": "scanner"
				},
				{
					"type": "md",
					"name": "schedule"
				},
				{
					"type": "md",
					"name": "school"
				},
				{
					"type": "md",
					"name": "screen-lock-landscape"
				},
				{
					"type": "md",
					"name": "screen-lock-portrait"
				},
				{
					"type": "md",
					"name": "screen-lock-rotation"
				},
				{
					"type": "md",
					"name": "screen-rotation"
				},
				{
					"type": "md",
					"name": "screen-share"
				},
				{
					"type": "md",
					"name": "sd-card"
				},
				{
					"type": "md",
					"name": "sd-storage"
				},
				{
					"type": "md",
					"name": "search"
				},
				{
					"type": "md",
					"name": "security"
				},
				{
					"type": "md",
					"name": "select-all"
				},
				{
					"type": "md",
					"name": "send"
				},
				{
					"type": "md",
					"name": "sentiment-dissatisfied"
				},
				{
					"type": "md",
					"name": "sentiment-neutral"
				},
				{
					"type": "md",
					"name": "sentiment-satisfied"
				},
				{
					"type": "md",
					"name": "sentiment-very-dissatisfied"
				},
				{
					"type": "md",
					"name": "sentiment-very-satisfied"
				},
				{
					"type": "md",
					"name": "settings-applications"
				},
				{
					"type": "md",
					"name": "settings-backup-restore"
				},
				{
					"type": "md",
					"name": "settings-bluetooth"
				},
				{
					"type": "md",
					"name": "settings-brightness"
				},
				{
					"type": "md",
					"name": "settings-cell"
				},
				{
					"type": "md",
					"name": "settings-ethernet"
				},
				{
					"type": "md",
					"name": "settings-input-antenna"
				},
				{
					"type": "md",
					"name": "settings-input-component"
				},
				{
					"type": "md",
					"name": "settings-input-composite"
				},
				{
					"type": "md",
					"name": "settings-input-hdmi"
				},
				{
					"type": "md",
					"name": "settings-input-svideo"
				},
				{
					"type": "md",
					"name": "settings-overscan"
				},
				{
					"type": "md",
					"name": "settings-phone"
				},
				{
					"type": "md",
					"name": "settings-power"
				},
				{
					"type": "md",
					"name": "settings-remote"
				},
				{
					"type": "md",
					"name": "settings-system-daydream"
				},
				{
					"type": "md",
					"name": "settings-voice"
				},
				{
					"type": "md",
					"name": "settings"
				},
				{
					"type": "md",
					"name": "share"
				},
				{
					"type": "md",
					"name": "shop-two"
				},
				{
					"type": "md",
					"name": "shop"
				},
				{
					"type": "md",
					"name": "shopping-basket"
				},
				{
					"type": "md",
					"name": "shopping-cart"
				},
				{
					"type": "md",
					"name": "short-text"
				},
				{
					"type": "md",
					"name": "show-chart"
				},
				{
					"type": "md",
					"name": "shuffle"
				},
				{
					"type": "md",
					"name": "signal-cellular-0-bar"
				},
				{
					"type": "md",
					"name": "signal-cellular-1-bar"
				},
				{
					"type": "md",
					"name": "signal-cellular-2-bar"
				},
				{
					"type": "md",
					"name": "signal-cellular-3-bar"
				},
				{
					"type": "md",
					"name": "signal-cellular-4-bar"
				},
				{
					"type": "md",
					"name": "signal-cellular-connected-no-internet-0-bar"
				},
				{
					"type": "md",
					"name": "signal-cellular-connected-no-internet-1-bar"
				},
				{
					"type": "md",
					"name": "signal-cellular-connected-no-internet-2-bar"
				},
				{
					"type": "md",
					"name": "signal-cellular-connected-no-internet-3-bar"
				},
				{
					"type": "md",
					"name": "signal-cellular-connected-no-internet-4-bar"
				},
				{
					"type": "md",
					"name": "signal-cellular-no-sim"
				},
				{
					"type": "md",
					"name": "signal-cellular-null"
				},
				{
					"type": "md",
					"name": "signal-cellular-off"
				},
				{
					"type": "md",
					"name": "signal-wifi-0-bar"
				},
				{
					"type": "md",
					"name": "signal-wifi-1-bar-lock"
				},
				{
					"type": "md",
					"name": "signal-wifi-1-bar"
				},
				{
					"type": "md",
					"name": "signal-wifi-2-bar-lock"
				},
				{
					"type": "md",
					"name": "signal-wifi-2-bar"
				},
				{
					"type": "md",
					"name": "signal-wifi-3-bar-lock"
				},
				{
					"type": "md",
					"name": "signal-wifi-3-bar"
				},
				{
					"type": "md",
					"name": "signal-wifi-4-bar-lock"
				},
				{
					"type": "md",
					"name": "signal-wifi-4-bar"
				},
				{
					"type": "md",
					"name": "signal-wifi-off"
				},
				{
					"type": "md",
					"name": "sim-card-alert"
				},
				{
					"type": "md",
					"name": "sim-card"
				},
				{
					"type": "md",
					"name": "skip-next"
				},
				{
					"type": "md",
					"name": "skip-previous"
				},
				{
					"type": "md",
					"name": "slideshow"
				},
				{
					"type": "md",
					"name": "slow-motion-video"
				},
				{
					"type": "md",
					"name": "smartphone"
				},
				{
					"type": "md",
					"name": "smoke-free"
				},
				{
					"type": "md",
					"name": "smoking-rooms"
				},
				{
					"type": "md",
					"name": "sms-failed"
				},
				{
					"type": "md",
					"name": "sms"
				},
				{
					"type": "md",
					"name": "snooze"
				},
				{
					"type": "md",
					"name": "sort"
				},
				{
					"type": "md",
					"name": "spa"
				},
				{
					"type": "md",
					"name": "space-bar"
				},
				{
					"type": "md",
					"name": "speaker-group"
				},
				{
					"type": "md",
					"name": "speaker-notes-off"
				},
				{
					"type": "md",
					"name": "speaker-notes"
				},
				{
					"type": "md",
					"name": "speaker-phone"
				},
				{
					"type": "md",
					"name": "speaker"
				},
				{
					"type": "md",
					"name": "spellcheck"
				},
				{
					"type": "md",
					"name": "star-half"
				},
				{
					"type": "md",
					"name": "stars"
				},
				{
					"type": "md",
					"name": "stay-current-landscape"
				},
				{
					"type": "md",
					"name": "stay-current-portrait"
				},
				{
					"type": "md",
					"name": "stay-primary-landscape"
				},
				{
					"type": "md",
					"name": "stay-primary-portrait"
				},
				{
					"type": "md",
					"name": "stop-screen-share"
				},
				{
					"type": "md",
					"name": "stop"
				},
				{
					"type": "md",
					"name": "storage"
				},
				{
					"type": "md",
					"name": "store-mall-directory"
				},
				{
					"type": "md",
					"name": "store"
				},
				{
					"type": "md",
					"name": "straighten"
				},
				{
					"type": "md",
					"name": "streetview"
				},
				{
					"type": "md",
					"name": "strikethrough-s"
				},
				{
					"type": "md",
					"name": "style"
				},
				{
					"type": "md",
					"name": "subdirectory-arrow-left"
				},
				{
					"type": "md",
					"name": "subdirectory-arrow-right"
				},
				{
					"type": "md",
					"name": "subject"
				},
				{
					"type": "md",
					"name": "subscriptions"
				},
				{
					"type": "md",
					"name": "subtitles"
				},
				{
					"type": "md",
					"name": "subway"
				},
				{
					"type": "md",
					"name": "supervisor-account"
				},
				{
					"type": "md",
					"name": "surround-sound"
				},
				{
					"type": "md",
					"name": "swap-calls"
				},
				{
					"type": "md",
					"name": "swap-horiz"
				},
				{
					"type": "md",
					"name": "swap-vert"
				},
				{
					"type": "md",
					"name": "swap-vertical-circle"
				},
				{
					"type": "md",
					"name": "switch-camera"
				},
				{
					"type": "md",
					"name": "switch-video"
				},
				{
					"type": "md",
					"name": "sync-disabled"
				},
				{
					"type": "md",
					"name": "sync-problem"
				},
				{
					"type": "md",
					"name": "sync"
				},
				{
					"type": "md",
					"name": "system-update-alt"
				},
				{
					"type": "md",
					"name": "system-update"
				},
				{
					"type": "md",
					"name": "tab-unselected"
				},
				{
					"type": "md",
					"name": "tab"
				},
				{
					"type": "md",
					"name": "tablet-android"
				},
				{
					"type": "md",
					"name": "tablet-mac"
				},
				{
					"type": "md",
					"name": "tablet"
				},
				{
					"type": "md",
					"name": "tag-faces"
				},
				{
					"type": "md",
					"name": "tap-and-play"
				},
				{
					"type": "md",
					"name": "terrain"
				},
				{
					"type": "md",
					"name": "text-fields"
				},
				{
					"type": "md",
					"name": "text-format"
				},
				{
					"type": "md",
					"name": "textsms"
				},
				{
					"type": "md",
					"name": "texture"
				},
				{
					"type": "md",
					"name": "theaters"
				},
				{
					"type": "md",
					"name": "thumb-down"
				},
				{
					"type": "md",
					"name": "thumb-up"
				},
				{
					"type": "md",
					"name": "thumbs-up-down"
				},
				{
					"type": "md",
					"name": "time-to-leave"
				},
				{
					"type": "md",
					"name": "timelapse"
				},
				{
					"type": "md",
					"name": "timeline"
				},
				{
					"type": "md",
					"name": "timer-10"
				},
				{
					"type": "md",
					"name": "timer-3"
				},
				{
					"type": "md",
					"name": "timer-off"
				},
				{
					"type": "md",
					"name": "timer"
				},
				{
					"type": "md",
					"name": "title"
				},
				{
					"type": "md",
					"name": "toc"
				},
				{
					"type": "md",
					"name": "today"
				},
				{
					"type": "md",
					"name": "toll"
				},
				{
					"type": "md",
					"name": "tonality"
				},
				{
					"type": "md",
					"name": "touch-app"
				},
				{
					"type": "md",
					"name": "toys"
				},
				{
					"type": "md",
					"name": "track-changes"
				},
				{
					"type": "md",
					"name": "traffic"
				},
				{
					"type": "md",
					"name": "train"
				},
				{
					"type": "md",
					"name": "tram"
				},
				{
					"type": "md",
					"name": "transfer-within-a-station"
				},
				{
					"type": "md",
					"name": "transform"
				},
				{
					"type": "md",
					"name": "translate"
				},
				{
					"type": "md",
					"name": "trending-down"
				},
				{
					"type": "md",
					"name": "trending-flat"
				},
				{
					"type": "md",
					"name": "trending-up"
				},
				{
					"type": "md",
					"name": "tune"
				},
				{
					"type": "md",
					"name": "turned-in-not"
				},
				{
					"type": "md",
					"name": "turned-in"
				},
				{
					"type": "md",
					"name": "tv"
				},
				{
					"type": "md",
					"name": "unarchive"
				},
				{
					"type": "md",
					"name": "undo"
				},
				{
					"type": "md",
					"name": "unfold-less"
				},
				{
					"type": "md",
					"name": "unfold-more"
				},
				{
					"type": "md",
					"name": "update"
				},
				{
					"type": "md",
					"name": "usb"
				},
				{
					"type": "md",
					"name": "verified-user"
				},
				{
					"type": "md",
					"name": "vertical-align-bottom"
				},
				{
					"type": "md",
					"name": "vertical-align-center"
				},
				{
					"type": "md",
					"name": "vertical-align-top"
				},
				{
					"type": "md",
					"name": "vibration"
				},
				{
					"type": "md",
					"name": "video-call"
				},
				{
					"type": "md",
					"name": "video-label"
				},
				{
					"type": "md",
					"name": "video-library"
				},
				{
					"type": "md",
					"name": "videocam-off"
				},
				{
					"type": "md",
					"name": "videocam"
				},
				{
					"type": "md",
					"name": "videogame-asset"
				},
				{
					"type": "md",
					"name": "view-agenda"
				},
				{
					"type": "md",
					"name": "view-array"
				},
				{
					"type": "md",
					"name": "view-carousel"
				},
				{
					"type": "md",
					"name": "view-column"
				},
				{
					"type": "md",
					"name": "view-comfy"
				},
				{
					"type": "md",
					"name": "view-compact"
				},
				{
					"type": "md",
					"name": "view-day"
				},
				{
					"type": "md",
					"name": "view-headline"
				},
				{
					"type": "md",
					"name": "view-list"
				},
				{
					"type": "md",
					"name": "view-module"
				},
				{
					"type": "md",
					"name": "view-quilt"
				},
				{
					"type": "md",
					"name": "view-stream"
				},
				{
					"type": "md",
					"name": "view-week"
				},
				{
					"type": "md",
					"name": "visibility-off"
				},
				{
					"type": "md",
					"name": "visibility"
				},
				{
					"type": "md",
					"name": "voice-chat"
				},
				{
					"type": "md",
					"name": "voicemail"
				},
				{
					"type": "md",
					"name": "volume-down"
				},
				{
					"type": "md",
					"name": "volume-mute"
				},
				{
					"type": "md",
					"name": "volume-off"
				},
				{
					"type": "md",
					"name": "volume-up"
				},
				{
					"type": "md",
					"name": "vpn-key"
				},
				{
					"type": "md",
					"name": "vpn-lock"
				},
				{
					"type": "md",
					"name": "wallpaper"
				},
				{
					"type": "md",
					"name": "warning"
				},
				{
					"type": "md",
					"name": "watch-later"
				},
				{
					"type": "md",
					"name": "watch"
				},
				{
					"type": "md",
					"name": "wb-auto"
				},
				{
					"type": "md",
					"name": "wb-cloudy"
				},
				{
					"type": "md",
					"name": "wb-incandescent"
				},
				{
					"type": "md",
					"name": "wb-iridescent"
				},
				{
					"type": "md",
					"name": "wb-sunny"
				},
				{
					"type": "md",
					"name": "wc"
				},
				{
					"type": "md",
					"name": "web-asset"
				},
				{
					"type": "md",
					"name": "web"
				},
				{
					"type": "md",
					"name": "weekend"
				},
				{
					"type": "md",
					"name": "whatshot"
				},
				{
					"type": "md",
					"name": "widgets"
				},
				{
					"type": "md",
					"name": "wifi-lock"
				},
				{
					"type": "md",
					"name": "wifi-tethering"
				},
				{
					"type": "md",
					"name": "wifi"
				},
				{
					"type": "md",
					"name": "work"
				},
				{
					"type": "md",
					"name": "wrap-text"
				},
				{
					"type": "md",
					"name": "youtube-searched-for"
				},
				{
					"type": "md",
					"name": "zoom-out-map"
				}
			]
		},
		"oi": {
			"name": "octicons",
			"prefix": "oi-",
			"repo": "https://github.com/primer/octicons.git",
			"icons": [
				{
					"type": "oi",
					"name": "alert"
				},
				{
					"type": "oi",
					"name": "arrow-down"
				},
				{
					"type": "oi",
					"name": "arrow-left"
				},
				{
					"type": "oi",
					"name": "arrow-right"
				},
				{
					"type": "oi",
					"name": "arrow-small-down"
				},
				{
					"type": "oi",
					"name": "arrow-small-left"
				},
				{
					"type": "oi",
					"name": "arrow-small-right"
				},
				{
					"type": "oi",
					"name": "arrow-small-up"
				},
				{
					"type": "oi",
					"name": "arrow-up"
				},
				{
					"type": "oi",
					"name": "beaker"
				},
				{
					"type": "oi",
					"name": "bell"
				},
				{
					"type": "oi",
					"name": "bold"
				},
				{
					"type": "oi",
					"name": "book"
				},
				{
					"type": "oi",
					"name": "bookmark"
				},
				{
					"type": "oi",
					"name": "briefcase"
				},
				{
					"type": "oi",
					"name": "broadcast"
				},
				{
					"type": "oi",
					"name": "browser"
				},
				{
					"type": "oi",
					"name": "bug"
				},
				{
					"type": "oi",
					"name": "calendar"
				},
				{
					"type": "oi",
					"name": "check"
				},
				{
					"type": "oi",
					"name": "checklist"
				},
				{
					"type": "oi",
					"name": "chevron-down"
				},
				{
					"type": "oi",
					"name": "chevron-left"
				},
				{
					"type": "oi",
					"name": "chevron-right"
				},
				{
					"type": "oi",
					"name": "chevron-up"
				},
				{
					"type": "oi",
					"name": "circle-slash"
				},
				{
					"type": "oi",
					"name": "circuit-board"
				},
				{
					"type": "oi",
					"name": "clippy"
				},
				{
					"type": "oi",
					"name": "clock"
				},
				{
					"type": "oi",
					"name": "cloud-download"
				},
				{
					"type": "oi",
					"name": "cloud-upload"
				},
				{
					"type": "oi",
					"name": "code"
				},
				{
					"type": "oi",
					"name": "comment-discussion"
				},
				{
					"type": "oi",
					"name": "comment"
				},
				{
					"type": "oi",
					"name": "credit-card"
				},
				{
					"type": "oi",
					"name": "dash"
				},
				{
					"type": "oi",
					"name": "dashboard"
				},
				{
					"type": "oi",
					"name": "database"
				},
				{
					"type": "oi",
					"name": "desktop-download"
				},
				{
					"type": "oi",
					"name": "device-camera-video"
				},
				{
					"type": "oi",
					"name": "device-camera"
				},
				{
					"type": "oi",
					"name": "device-desktop"
				},
				{
					"type": "oi",
					"name": "device-mobile"
				},
				{
					"type": "oi",
					"name": "diff-added"
				},
				{
					"type": "oi",
					"name": "diff-ignored"
				},
				{
					"type": "oi",
					"name": "diff-modified"
				},
				{
					"type": "oi",
					"name": "diff-removed"
				},
				{
					"type": "oi",
					"name": "diff-renamed"
				},
				{
					"type": "oi",
					"name": "diff"
				},
				{
					"type": "oi",
					"name": "ellipses"
				},
				{
					"type": "oi",
					"name": "ellipsis"
				},
				{
					"type": "oi",
					"name": "eye"
				},
				{
					"type": "oi",
					"name": "file-binary"
				},
				{
					"type": "oi",
					"name": "file-code"
				},
				{
					"type": "oi",
					"name": "file-directory"
				},
				{
					"type": "oi",
					"name": "file-media"
				},
				{
					"type": "oi",
					"name": "file-pdf"
				},
				{
					"type": "oi",
					"name": "file-submodule"
				},
				{
					"type": "oi",
					"name": "file-symlink-directory"
				},
				{
					"type": "oi",
					"name": "file-symlink-file"
				},
				{
					"type": "oi",
					"name": "file-text"
				},
				{
					"type": "oi",
					"name": "file-zip"
				},
				{
					"type": "oi",
					"name": "file"
				},
				{
					"type": "oi",
					"name": "flame"
				},
				{
					"type": "oi",
					"name": "fold"
				},
				{
					"type": "oi",
					"name": "gear"
				},
				{
					"type": "oi",
					"name": "gift"
				},
				{
					"type": "oi",
					"name": "gist-secret"
				},
				{
					"type": "oi",
					"name": "gist"
				},
				{
					"type": "oi",
					"name": "git-branch"
				},
				{
					"type": "oi",
					"name": "git-commit"
				},
				{
					"type": "oi",
					"name": "git-compare"
				},
				{
					"type": "oi",
					"name": "git-merge"
				},
				{
					"type": "oi",
					"name": "git-pull-request"
				},
				{
					"type": "oi",
					"name": "globe"
				},
				{
					"type": "oi",
					"name": "grabber"
				},
				{
					"type": "oi",
					"name": "graph"
				},
				{
					"type": "oi",
					"name": "heart"
				},
				{
					"type": "oi",
					"name": "history"
				},
				{
					"type": "oi",
					"name": "home"
				},
				{
					"type": "oi",
					"name": "horizontal-rule"
				},
				{
					"type": "oi",
					"name": "hubot"
				},
				{
					"type": "oi",
					"name": "inbox"
				},
				{
					"type": "oi",
					"name": "info"
				},
				{
					"type": "oi",
					"name": "issue-closed"
				},
				{
					"type": "oi",
					"name": "issue-opened"
				},
				{
					"type": "oi",
					"name": "issue-reopened"
				},
				{
					"type": "oi",
					"name": "italic"
				},
				{
					"type": "oi",
					"name": "jersey"
				},
				{
					"type": "oi",
					"name": "key"
				},
				{
					"type": "oi",
					"name": "keyboard"
				},
				{
					"type": "oi",
					"name": "law"
				},
				{
					"type": "oi",
					"name": "light-bulb"
				},
				{
					"type": "oi",
					"name": "link-external"
				},
				{
					"type": "oi",
					"name": "link"
				},
				{
					"type": "oi",
					"name": "list-ordered"
				},
				{
					"type": "oi",
					"name": "list-unordered"
				},
				{
					"type": "oi",
					"name": "location"
				},
				{
					"type": "oi",
					"name": "lock"
				},
				{
					"type": "oi",
					"name": "logo-gist"
				},
				{
					"type": "oi",
					"name": "logo-github"
				},
				{
					"type": "oi",
					"name": "mail-read"
				},
				{
					"type": "oi",
					"name": "mail-reply"
				},
				{
					"type": "oi",
					"name": "mail"
				},
				{
					"type": "oi",
					"name": "mark-github"
				},
				{
					"type": "oi",
					"name": "markdown"
				},
				{
					"type": "oi",
					"name": "megaphone"
				},
				{
					"type": "oi",
					"name": "mention"
				},
				{
					"type": "oi",
					"name": "milestone"
				},
				{
					"type": "oi",
					"name": "mirror"
				},
				{
					"type": "oi",
					"name": "mortar-board"
				},
				{
					"type": "oi",
					"name": "mute"
				},
				{
					"type": "oi",
					"name": "no-newline"
				},
				{
					"type": "oi",
					"name": "octoface"
				},
				{
					"type": "oi",
					"name": "organization"
				},
				{
					"type": "oi",
					"name": "package"
				},
				{
					"type": "oi",
					"name": "paintcan"
				},
				{
					"type": "oi",
					"name": "pencil"
				},
				{
					"type": "oi",
					"name": "person"
				},
				{
					"type": "oi",
					"name": "pin"
				},
				{
					"type": "oi",
					"name": "plug"
				},
				{
					"type": "oi",
					"name": "plus-small"
				},
				{
					"type": "oi",
					"name": "plus"
				},
				{
					"type": "oi",
					"name": "primitive-dot"
				},
				{
					"type": "oi",
					"name": "primitive-square"
				},
				{
					"type": "oi",
					"name": "pulse"
				},
				{
					"type": "oi",
					"name": "question"
				},
				{
					"type": "oi",
					"name": "quote"
				},
				{
					"type": "oi",
					"name": "radio-tower"
				},
				{
					"type": "oi",
					"name": "reply"
				},
				{
					"type": "oi",
					"name": "repo-clone"
				},
				{
					"type": "oi",
					"name": "repo-force-push"
				},
				{
					"type": "oi",
					"name": "repo-forked"
				},
				{
					"type": "oi",
					"name": "repo-pull"
				},
				{
					"type": "oi",
					"name": "repo-push"
				},
				{
					"type": "oi",
					"name": "repo"
				},
				{
					"type": "oi",
					"name": "rocket"
				},
				{
					"type": "oi",
					"name": "rss"
				},
				{
					"type": "oi",
					"name": "ruby"
				},
				{
					"type": "oi",
					"name": "search"
				},
				{
					"type": "oi",
					"name": "server"
				},
				{
					"type": "oi",
					"name": "settings"
				},
				{
					"type": "oi",
					"name": "shield"
				},
				{
					"type": "oi",
					"name": "sign-in"
				},
				{
					"type": "oi",
					"name": "sign-out"
				},
				{
					"type": "oi",
					"name": "smiley"
				},
				{
					"type": "oi",
					"name": "squirrel"
				},
				{
					"type": "oi",
					"name": "star"
				},
				{
					"type": "oi",
					"name": "stop"
				},
				{
					"type": "oi",
					"name": "sync"
				},
				{
					"type": "oi",
					"name": "tag"
				},
				{
					"type": "oi",
					"name": "tasklist"
				},
				{
					"type": "oi",
					"name": "telescope"
				},
				{
					"type": "oi",
					"name": "terminal"
				},
				{
					"type": "oi",
					"name": "text-size"
				},
				{
					"type": "oi",
					"name": "three-bars"
				},
				{
					"type": "oi",
					"name": "thumbsdown"
				},
				{
					"type": "oi",
					"name": "thumbsup"
				},
				{
					"type": "oi",
					"name": "tools"
				},
				{
					"type": "oi",
					"name": "trashcan"
				},
				{
					"type": "oi",
					"name": "triangle-down"
				},
				{
					"type": "oi",
					"name": "triangle-left"
				},
				{
					"type": "oi",
					"name": "triangle-right"
				},
				{
					"type": "oi",
					"name": "triangle-up"
				},
				{
					"type": "oi",
					"name": "unfold"
				},
				{
					"type": "oi",
					"name": "unmute"
				},
				{
					"type": "oi",
					"name": "unverified"
				},
				{
					"type": "oi",
					"name": "verified"
				},
				{
					"type": "oi",
					"name": "versions"
				},
				{
					"type": "oi",
					"name": "watch"
				},
				{
					"type": "oi",
					"name": "x"
				},
				{
					"type": "oi",
					"name": "zap"
				}
			]
		},
		"zero": {
			"name": "zero",
			"prefix": "zero-",
			"icons": [
				{
					"type": "zero",
					"name": "3-list"
				},
				{
					"type": "zero",
					"name": "add-folder"
				},
				{
					"type": "zero",
					"name": "agent"
				},
				{
					"type": "zero",
					"name": "align-2-bottom"
				},
				{
					"type": "zero",
					"name": "align-2-center"
				},
				{
					"type": "zero",
					"name": "align-2-left"
				},
				{
					"type": "zero",
					"name": "align-2-middle"
				},
				{
					"type": "zero",
					"name": "align-2-right"
				},
				{
					"type": "zero",
					"name": "align-2-top"
				},
				{
					"type": "zero",
					"name": "align-center"
				},
				{
					"type": "zero",
					"name": "align-left"
				},
				{
					"type": "zero",
					"name": "align-right"
				},
				{
					"type": "zero",
					"name": "analysis"
				},
				{
					"type": "zero",
					"name": "anchor"
				},
				{
					"type": "zero",
					"name": "app-dashboard"
				},
				{
					"type": "zero",
					"name": "app-pai"
				},
				{
					"type": "zero",
					"name": "app-worksheet"
				},
				{
					"type": "zero",
					"name": "area-chart"
				},
				{
					"type": "zero",
					"name": "arrow-bottom-dot"
				},
				{
					"type": "zero",
					"name": "arrow-bottom-l"
				},
				{
					"type": "zero",
					"name": "arrow-down-l"
				},
				{
					"type": "zero",
					"name": "arrow-down"
				},
				{
					"type": "zero",
					"name": "arrow-left-d-l"
				},
				{
					"type": "zero",
					"name": "arrow-left-l"
				},
				{
					"type": "zero",
					"name": "arrow-left"
				},
				{
					"type": "zero",
					"name": "arrow-minus"
				},
				{
					"type": "zero",
					"name": "arrow-reduce"
				},
				{
					"type": "zero",
					"name": "arrow-right-d-l"
				},
				{
					"type": "zero",
					"name": "arrow-right-l"
				},
				{
					"type": "zero",
					"name": "arrow-right-o"
				},
				{
					"type": "zero",
					"name": "arrow-right"
				},
				{
					"type": "zero",
					"name": "arrow-rise"
				},
				{
					"type": "zero",
					"name": "arrow-top-dot"
				},
				{
					"type": "zero",
					"name": "arrow-top-l"
				},
				{
					"type": "zero",
					"name": "arrow-top"
				},
				{
					"type": "zero",
					"name": "arrow-up-l"
				},
				{
					"type": "zero",
					"name": "arrow-up"
				},
				{
					"type": "zero",
					"name": "asterisk"
				},
				{
					"type": "zero",
					"name": "attachment"
				},
				{
					"type": "zero",
					"name": "auto-align-24"
				},
				{
					"type": "zero",
					"name": "auto-merge-cell"
				},
				{
					"type": "zero",
					"name": "backward-cycly-o"
				},
				{
					"type": "zero",
					"name": "bring-to-bottom"
				},
				{
					"type": "zero",
					"name": "bring-to-downer"
				},
				{
					"type": "zero",
					"name": "bring-to-top"
				},
				{
					"type": "zero",
					"name": "bring-to-upper"
				},
				{
					"type": "zero",
					"name": "bucket-a"
				},
				{
					"type": "zero",
					"name": "bucket"
				},
				{
					"type": "zero",
					"name": "c"
				},
				{
					"type": "zero",
					"name": "calendar"
				},
				{
					"type": "zero",
					"name": "center-justified"
				},
				{
					"type": "zero",
					"name": "chart-bar"
				},
				{
					"type": "zero",
					"name": "chart-from-to"
				},
				{
					"type": "zero",
					"name": "chart-funnel-plot"
				},
				{
					"type": "zero",
					"name": "chart-funnel"
				},
				{
					"type": "zero",
					"name": "chart-index"
				},
				{
					"type": "zero",
					"name": "chart-new"
				},
				{
					"type": "zero",
					"name": "chart-scatter"
				},
				{
					"type": "zero",
					"name": "chart-word-cloud"
				},
				{
					"type": "zero",
					"name": "chart"
				},
				{
					"type": "zero",
					"name": "check-triangle"
				},
				{
					"type": "zero",
					"name": "clear"
				},
				{
					"type": "zero",
					"name": "click"
				},
				{
					"type": "zero",
					"name": "close-c"
				},
				{
					"type": "zero",
					"name": "close-l"
				},
				{
					"type": "zero",
					"name": "close-o"
				},
				{
					"type": "zero",
					"name": "closedhand-24"
				},
				{
					"type": "zero",
					"name": "collapse"
				},
				{
					"type": "zero",
					"name": "color"
				},
				{
					"type": "zero",
					"name": "comment-full-l"
				},
				{
					"type": "zero",
					"name": "comment-l"
				},
				{
					"type": "zero",
					"name": "component-24"
				},
				{
					"type": "zero",
					"name": "component"
				},
				{
					"type": "zero",
					"name": "concentric-pie-chart"
				},
				{
					"type": "zero",
					"name": "console-24"
				},
				{
					"type": "zero",
					"name": "copy-l"
				},
				{
					"type": "zero",
					"name": "copy-node"
				},
				{
					"type": "zero",
					"name": "cry"
				},
				{
					"type": "zero",
					"name": "custom-text"
				},
				{
					"type": "zero",
					"name": "cut"
				},
				{
					"type": "zero",
					"name": "cycle-24"
				},
				{
					"type": "zero",
					"name": "dashboard-24"
				},
				{
					"type": "zero",
					"name": "data-agent-legend-dimension"
				},
				{
					"type": "zero",
					"name": "data-agent-legend-measure"
				},
				{
					"type": "zero",
					"name": "data-source-24"
				},
				{
					"type": "zero",
					"name": "data"
				},
				{
					"type": "zero",
					"name": "default-24"
				},
				{
					"type": "zero",
					"name": "default-justified"
				},
				{
					"type": "zero",
					"name": "delete-column"
				},
				{
					"type": "zero",
					"name": "delete-row"
				},
				{
					"type": "zero",
					"name": "delete"
				},
				{
					"type": "zero",
					"name": "desktop-24"
				},
				{
					"type": "zero",
					"name": "desktop"
				},
				{
					"type": "zero",
					"name": "dials"
				},
				{
					"type": "zero",
					"name": "diamond-24"
				},
				{
					"type": "zero",
					"name": "diamond-ok-l"
				},
				{
					"type": "zero",
					"name": "diamond"
				},
				{
					"type": "zero",
					"name": "dimensions"
				},
				{
					"type": "zero",
					"name": "direction-horizontal"
				},
				{
					"type": "zero",
					"name": "direction-vertical"
				},
				{
					"type": "zero",
					"name": "dislike-24"
				},
				{
					"type": "zero",
					"name": "dislike-fill"
				},
				{
					"type": "zero",
					"name": "dislike-l-24"
				},
				{
					"type": "zero",
					"name": "dislike"
				},
				{
					"type": "zero",
					"name": "doc-csv"
				},
				{
					"type": "zero",
					"name": "doc-pdf"
				},
				{
					"type": "zero",
					"name": "doc-txt"
				},
				{
					"type": "zero",
					"name": "doc-xls"
				},
				{
					"type": "zero",
					"name": "document-full"
				},
				{
					"type": "zero",
					"name": "document"
				},
				{
					"type": "zero",
					"name": "dot"
				},
				{
					"type": "zero",
					"name": "download"
				},
				{
					"type": "zero",
					"name": "drag"
				},
				{
					"type": "zero",
					"name": "edit"
				},
				{
					"type": "zero",
					"name": "empty-box"
				},
				{
					"type": "zero",
					"name": "enterprise"
				},
				{
					"type": "zero",
					"name": "exchange-xy"
				},
				{
					"type": "zero",
					"name": "exit-fullscreen"
				},
				{
					"type": "zero",
					"name": "expand"
				},
				{
					"type": "zero",
					"name": "export-excel"
				},
				{
					"type": "zero",
					"name": "export"
				},
				{
					"type": "zero",
					"name": "file"
				},
				{
					"type": "zero",
					"name": "filter"
				},
				{
					"type": "zero",
					"name": "fire"
				},
				{
					"type": "zero",
					"name": "fitscreen-24"
				},
				{
					"type": "zero",
					"name": "fliter"
				},
				{
					"type": "zero",
					"name": "folder-open"
				},
				{
					"type": "zero",
					"name": "folder"
				},
				{
					"type": "zero",
					"name": "font-Italics"
				},
				{
					"type": "zero",
					"name": "font-bold"
				},
				{
					"type": "zero",
					"name": "font-color-merge-a"
				},
				{
					"type": "zero",
					"name": "font-color-merge"
				},
				{
					"type": "zero",
					"name": "font-color"
				},
				{
					"type": "zero",
					"name": "font-size"
				},
				{
					"type": "zero",
					"name": "font-strikethrough"
				},
				{
					"type": "zero",
					"name": "font-underline"
				},
				{
					"type": "zero",
					"name": "forward-o"
				},
				{
					"type": "zero",
					"name": "freeze-cell"
				},
				{
					"type": "zero",
					"name": "freeze-column"
				},
				{
					"type": "zero",
					"name": "freeze-row"
				},
				{
					"type": "zero",
					"name": "freeze"
				},
				{
					"type": "zero",
					"name": "fullscreen"
				},
				{
					"type": "zero",
					"name": "function"
				},
				{
					"type": "zero",
					"name": "globe-o-24"
				},
				{
					"type": "zero",
					"name": "group-24"
				},
				{
					"type": "zero",
					"name": "guide-add"
				},
				{
					"type": "zero",
					"name": "guide-delete"
				},
				{
					"type": "zero",
					"name": "help-o-24"
				},
				{
					"type": "zero",
					"name": "help-o"
				},
				{
					"type": "zero",
					"name": "help-s"
				},
				{
					"type": "zero",
					"name": "hexagon"
				},
				{
					"type": "zero",
					"name": "hidden-cloumn"
				},
				{
					"type": "zero",
					"name": "hidden-row"
				},
				{
					"type": "zero",
					"name": "hierarchy"
				},
				{
					"type": "zero",
					"name": "host"
				},
				{
					"type": "zero",
					"name": "if"
				},
				{
					"type": "zero",
					"name": "iframe"
				},
				{
					"type": "zero",
					"name": "import"
				},
				{
					"type": "zero",
					"name": "indent"
				},
				{
					"type": "zero",
					"name": "info-o"
				},
				{
					"type": "zero",
					"name": "info"
				},
				{
					"type": "zero",
					"name": "initial"
				},
				{
					"type": "zero",
					"name": "inner-join"
				},
				{
					"type": "zero",
					"name": "insert-column"
				},
				{
					"type": "zero",
					"name": "insert-row"
				},
				{
					"type": "zero",
					"name": "invisible"
				},
				{
					"type": "zero",
					"name": "ipad-24"
				},
				{
					"type": "zero",
					"name": "ipad"
				},
				{
					"type": "zero",
					"name": "lab-shut-down"
				},
				{
					"type": "zero",
					"name": "label-04-01"
				},
				{
					"type": "zero",
					"name": "label1"
				},
				{
					"type": "zero",
					"name": "label2"
				},
				{
					"type": "zero",
					"name": "label3"
				},
				{
					"type": "zero",
					"name": "label4"
				},
				{
					"type": "zero",
					"name": "lbs-location"
				},
				{
					"type": "zero",
					"name": "left-join"
				},
				{
					"type": "zero",
					"name": "left-justified"
				},
				{
					"type": "zero",
					"name": "legend-1"
				},
				{
					"type": "zero",
					"name": "lib-24"
				},
				{
					"type": "zero",
					"name": "lib"
				},
				{
					"type": "zero",
					"name": "lighting"
				},
				{
					"type": "zero",
					"name": "like-24"
				},
				{
					"type": "zero",
					"name": "like-fill"
				},
				{
					"type": "zero",
					"name": "like-l-24"
				},
				{
					"type": "zero",
					"name": "like"
				},
				{
					"type": "zero",
					"name": "line-chart"
				},
				{
					"type": "zero",
					"name": "link"
				},
				{
					"type": "zero",
					"name": "list-alt"
				},
				{
					"type": "zero",
					"name": "list-ol"
				},
				{
					"type": "zero",
					"name": "list"
				},
				{
					"type": "zero",
					"name": "loading-spinner"
				},
				{
					"type": "zero",
					"name": "loading"
				},
				{
					"type": "zero",
					"name": "locate-o"
				},
				{
					"type": "zero",
					"name": "location-"
				},
				{
					"type": "zero",
					"name": "location-delete"
				},
				{
					"type": "zero",
					"name": "location"
				},
				{
					"type": "zero",
					"name": "lock-row"
				},
				{
					"type": "zero",
					"name": "lock"
				},
				{
					"type": "zero",
					"name": "logo-bg"
				},
				{
					"type": "zero",
					"name": "mail"
				},
				{
					"type": "zero",
					"name": "map-bubble-hover"
				},
				{
					"type": "zero",
					"name": "map-bubble"
				},
				{
					"type": "zero",
					"name": "map-color-hover"
				},
				{
					"type": "zero",
					"name": "map-color"
				},
				{
					"type": "zero",
					"name": "map-sankey"
				},
				{
					"type": "zero",
					"name": "merge-cell"
				},
				{
					"type": "zero",
					"name": "minus-cycle-o"
				},
				{
					"type": "zero",
					"name": "more"
				},
				{
					"type": "zero",
					"name": "movable"
				},
				{
					"type": "zero",
					"name": "moveto"
				},
				{
					"type": "zero",
					"name": "multi-line-text"
				},
				{
					"type": "zero",
					"name": "multidimensional-24"
				},
				{
					"type": "zero",
					"name": "new-document-24"
				},
				{
					"type": "zero",
					"name": "new-document-dashboard"
				},
				{
					"type": "zero",
					"name": "new-document-worksheet"
				},
				{
					"type": "zero",
					"name": "new-document"
				},
				{
					"type": "zero",
					"name": "node-collapse"
				},
				{
					"type": "zero",
					"name": "node-expand"
				},
				{
					"type": "zero",
					"name": "num"
				},
				{
					"type": "zero",
					"name": "o-c"
				},
				{
					"type": "zero",
					"name": "oil-table-chart"
				},
				{
					"type": "zero",
					"name": "ok-c"
				},
				{
					"type": "zero",
					"name": "ok-l"
				},
				{
					"type": "zero",
					"name": "ok-o"
				},
				{
					"type": "zero",
					"name": "ok-s"
				},
				{
					"type": "zero",
					"name": "ok"
				},
				{
					"type": "zero",
					"name": "open-l"
				},
				{
					"type": "zero",
					"name": "open"
				},
				{
					"type": "zero",
					"name": "operation"
				},
				{
					"type": "zero",
					"name": "optimization"
				},
				{
					"type": "zero",
					"name": "page-1"
				},
				{
					"type": "zero",
					"name": "paragraph"
				},
				{
					"type": "zero",
					"name": "paste-l"
				},
				{
					"type": "zero",
					"name": "pause-o"
				},
				{
					"type": "zero",
					"name": "pause"
				},
				{
					"type": "zero",
					"name": "pencil-l"
				},
				{
					"type": "zero",
					"name": "percent"
				},
				{
					"type": "zero",
					"name": "permission"
				},
				{
					"type": "zero",
					"name": "phone-24"
				},
				{
					"type": "zero",
					"name": "phone"
				},
				{
					"type": "zero",
					"name": "picture"
				},
				{
					"type": "zero",
					"name": "pie-3d-chart"
				},
				{
					"type": "zero",
					"name": "pie-chart"
				},
				{
					"type": "zero",
					"name": "pin"
				},
				{
					"type": "zero",
					"name": "plus-24"
				},
				{
					"type": "zero",
					"name": "plus-dot-o"
				},
				{
					"type": "zero",
					"name": "plus-l-thin"
				},
				{
					"type": "zero",
					"name": "plus-l"
				},
				{
					"type": "zero",
					"name": "plus-o-24"
				},
				{
					"type": "zero",
					"name": "plus-o"
				},
				{
					"type": "zero",
					"name": "plus"
				},
				{
					"type": "zero",
					"name": "pointer"
				},
				{
					"type": "zero",
					"name": "polar-chart"
				},
				{
					"type": "zero",
					"name": "position-bottom"
				},
				{
					"type": "zero",
					"name": "position-left"
				},
				{
					"type": "zero",
					"name": "position-right"
				},
				{
					"type": "zero",
					"name": "position-top"
				},
				{
					"type": "zero",
					"name": "preview-24"
				},
				{
					"type": "zero",
					"name": "project-24"
				},
				{
					"type": "zero",
					"name": "publish-fail-24"
				},
				{
					"type": "zero",
					"name": "publish-l-24"
				},
				{
					"type": "zero",
					"name": "publish-run-24"
				},
				{
					"type": "zero",
					"name": "publish-stop-24"
				},
				{
					"type": "zero",
					"name": "publish-success-24"
				},
				{
					"type": "zero",
					"name": "publish-wait-24"
				},
				{
					"type": "zero",
					"name": "publish"
				},
				{
					"type": "zero",
					"name": "query"
				},
				{
					"type": "zero",
					"name": "radar-chart"
				},
				{
					"type": "zero",
					"name": "radius"
				},
				{
					"type": "zero",
					"name": "real-size-24"
				},
				{
					"type": "zero",
					"name": "redo-1"
				},
				{
					"type": "zero",
					"name": "redo"
				},
				{
					"type": "zero",
					"name": "refresh"
				},
				{
					"type": "zero",
					"name": "rename"
				},
				{
					"type": "zero",
					"name": "report-24"
				},
				{
					"type": "zero",
					"name": "report"
				},
				{
					"type": "zero",
					"name": "rerun-24"
				},
				{
					"type": "zero",
					"name": "rerun"
				},
				{
					"type": "zero",
					"name": "right-justified"
				},
				{
					"type": "zero",
					"name": "rmb"
				},
				{
					"type": "zero",
					"name": "rocket"
				},
				{
					"type": "zero",
					"name": "run-from"
				},
				{
					"type": "zero",
					"name": "run-node"
				},
				{
					"type": "zero",
					"name": "run-o-24"
				},
				{
					"type": "zero",
					"name": "run-stop"
				},
				{
					"type": "zero",
					"name": "run"
				},
				{
					"type": "zero",
					"name": "s"
				},
				{
					"type": "zero",
					"name": "save-24"
				},
				{
					"type": "zero",
					"name": "save-as-24"
				},
				{
					"type": "zero",
					"name": "save-as"
				},
				{
					"type": "zero",
					"name": "save"
				},
				{
					"type": "zero",
					"name": "schema"
				},
				{
					"type": "zero",
					"name": "script"
				},
				{
					"type": "zero",
					"name": "search-24"
				},
				{
					"type": "zero",
					"name": "search"
				},
				{
					"type": "zero",
					"name": "selected"
				},
				{
					"type": "zero",
					"name": "separate-cell"
				},
				{
					"type": "zero",
					"name": "separators"
				},
				{
					"type": "zero",
					"name": "sequence-h-a-z"
				},
				{
					"type": "zero",
					"name": "sequence-h-z-a"
				},
				{
					"type": "zero",
					"name": "sequence-h"
				},
				{
					"type": "zero",
					"name": "sequence-v-a-z"
				},
				{
					"type": "zero",
					"name": "sequence-v-z-a"
				},
				{
					"type": "zero",
					"name": "sequence-v"
				},
				{
					"type": "zero",
					"name": "setting-24"
				},
				{
					"type": "zero",
					"name": "setting"
				},
				{
					"type": "zero",
					"name": "shape"
				},
				{
					"type": "zero",
					"name": "share-from"
				},
				{
					"type": "zero",
					"name": "share"
				},
				{
					"type": "zero",
					"name": "sheet-1"
				},
				{
					"type": "zero",
					"name": "sheet-4"
				},
				{
					"type": "zero",
					"name": "slash"
				},
				{
					"type": "zero",
					"name": "slider-play"
				},
				{
					"type": "zero",
					"name": "slider"
				},
				{
					"type": "zero",
					"name": "sort-a-z"
				},
				{
					"type": "zero",
					"name": "sort"
				},
				{
					"type": "zero",
					"name": "sql"
				},
				{
					"type": "zero",
					"name": "stack"
				},
				{
					"type": "zero",
					"name": "star-l"
				},
				{
					"type": "zero",
					"name": "star-remove-l"
				},
				{
					"type": "zero",
					"name": "star"
				},
				{
					"type": "zero",
					"name": "stop-o-24"
				},
				{
					"type": "zero",
					"name": "stop-o"
				},
				{
					"type": "zero",
					"name": "string"
				},
				{
					"type": "zero",
					"name": "stroke-bottom"
				},
				{
					"type": "zero",
					"name": "stroke-left"
				},
				{
					"type": "zero",
					"name": "stroke-right"
				},
				{
					"type": "zero",
					"name": "stroke-top"
				},
				{
					"type": "zero",
					"name": "stroke"
				},
				{
					"type": "zero",
					"name": "subscribe-24"
				},
				{
					"type": "zero",
					"name": "subtotals"
				},
				{
					"type": "zero",
					"name": "sum"
				},
				{
					"type": "zero",
					"name": "suspend-cycle-o"
				},
				{
					"type": "zero",
					"name": "suspend"
				},
				{
					"type": "zero",
					"name": "sync-o"
				},
				{
					"type": "zero",
					"name": "sync"
				},
				{
					"type": "zero",
					"name": "tab"
				},
				{
					"type": "zero",
					"name": "table"
				},
				{
					"type": "zero",
					"name": "target"
				},
				{
					"type": "zero",
					"name": "text"
				},
				{
					"type": "zero",
					"name": "thumnail"
				},
				{
					"type": "zero",
					"name": "time-o"
				},
				{
					"type": "zero",
					"name": "transfer"
				},
				{
					"type": "zero",
					"name": "transform-1"
				},
				{
					"type": "zero",
					"name": "transform-2"
				},
				{
					"type": "zero",
					"name": "triangle-24"
				},
				{
					"type": "zero",
					"name": "undo-1"
				},
				{
					"type": "zero",
					"name": "undo"
				},
				{
					"type": "zero",
					"name": "ungroup-24"
				},
				{
					"type": "zero",
					"name": "unindent"
				},
				{
					"type": "zero",
					"name": "unlink"
				},
				{
					"type": "zero",
					"name": "unstack"
				},
				{
					"type": "zero",
					"name": "unstroke"
				},
				{
					"type": "zero",
					"name": "upload-l-24"
				},
				{
					"type": "zero",
					"name": "upload-l"
				},
				{
					"type": "zero",
					"name": "upload"
				},
				{
					"type": "zero",
					"name": "user-o-24"
				},
				{
					"type": "zero",
					"name": "user-o"
				},
				{
					"type": "zero",
					"name": "user"
				},
				{
					"type": "zero",
					"name": "visible-l"
				},
				{
					"type": "zero",
					"name": "visible"
				},
				{
					"type": "zero",
					"name": "warning-o"
				},
				{
					"type": "zero",
					"name": "warning"
				},
				{
					"type": "zero",
					"name": "y-axis"
				},
				{
					"type": "zero",
					"name": "yy-axis"
				},
				{
					"type": "zero",
					"name": "zoom-in-24"
				},
				{
					"type": "zero",
					"name": "zoom-in"
				},
				{
					"type": "zero",
					"name": "zoom-out-24"
				},
				{
					"type": "zero",
					"name": "zoom-out"
				},
				{
					"type": "zero",
					"name": "zoom-part"
				}
			]
		}
	};

/***/ }
/******/ ]);