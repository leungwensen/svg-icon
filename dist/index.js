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

	var _download = __webpack_require__(9);

	var _download2 = _interopRequireDefault(_download);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(10);

	var icons = __webpack_require__(14);

	var $body = (0, _jquery2.default)('body');
	var $types = (0, _jquery2.default)('#types');
	var $icons = (0, _jquery2.default)('#icons');
	var $loading = (0, _jquery2.default)('#loading');

	function renderIconsByType(type) {
	  var meta = icons[type];
	  if (!meta.rendered) {
	    $loading[0].setAttribute('style', 'display: block;');
	    _jquery2.default.get('../dist/sprite/symbol/' + type + '.svg', function (res) {
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
	    var svgSprite = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;">\n  ' + symbols.join('') + '\n</svg>';
	    (0, _download2.default)('si-sprite.svg', svgSprite);
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
/***/ function(module, exports) {

	'use strict';
	/**
	 * download module
	 * @module download
	 * @see module:index
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pom = document.createElement('a');
	var PLAIN_TEXT = 'text/plain';

	exports.default = function () {
	  var filename = arguments.length <= 0 || arguments[0] === undefined ? 'download.txt' : arguments[0];
	  var content = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	  var type = arguments.length <= 2 || arguments[2] === undefined ? PLAIN_TEXT : arguments[2];

	  var uri = type === PLAIN_TEXT ? 'data:' + type + ';charset=utf-8,' + encodeURIComponent(content) : 'data:' + type + 'base64,' + window.btoa(encodeURIComponent(content));
	  pom.href = uri;
	  pom.download = filename;
	  if (document.createEvent) {
	    var event = document.createEvent('MouseEvents');
	    event.initEvent('click', true, true);
	    pom.dispatchEvent(event);
	  } else {
	    pom.click();
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports) {

	module.exports = {
		"anticon": {
			"name": "ant-design",
			"prefix": "anticon-",
			"repo": "https://github.com/ant-design/ant-design.git",
			"icons": [
				{
					"type": "anticon",
					"name": "aliwangwang"
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
					"name": "arrow-right"
				},
				{
					"type": "anticon",
					"name": "arrow-salt"
				},
				{
					"type": "anticon",
					"name": "bars"
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
					"name": "camera"
				},
				{
					"type": "anticon",
					"name": "caret-circle-down"
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
					"name": "caret-circle-o-up"
				},
				{
					"type": "anticon",
					"name": "caret-circle-right"
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
					"name": "check-circle"
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
					"name": "circle-o-right"
				},
				{
					"type": "anticon",
					"name": "clock-circle-o"
				},
				{
					"type": "anticon",
					"name": "cloud-download-o"
				},
				{
					"type": "anticon",
					"name": "cloud-o"
				},
				{
					"type": "anticon",
					"name": "cloud"
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
					"name": "cross-circle"
				},
				{
					"type": "anticon",
					"name": "cross"
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
					"name": "ellipsis"
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
					"name": "eye"
				},
				{
					"type": "anticon",
					"name": "fast-backward"
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
					"name": "forward"
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
					"name": "heart"
				},
				{
					"type": "anticon",
					"name": "ie"
				},
				{
					"type": "anticon",
					"name": "info-circle-o"
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
					"name": "line-chart"
				},
				{
					"type": "anticon",
					"name": "logout"
				},
				{
					"type": "anticon",
					"name": "meh"
				},
				{
					"type": "anticon",
					"name": "menu-unfold"
				},
				{
					"type": "anticon",
					"name": "minus-circle-o"
				},
				{
					"type": "anticon",
					"name": "mobile"
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
					"name": "pay-circle-o"
				},
				{
					"type": "anticon",
					"name": "picture"
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
					"name": "pushpin-o"
				},
				{
					"type": "anticon",
					"name": "question"
				},
				{
					"type": "anticon",
					"name": "retweet"
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
					"name": "smile-circle"
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
					"name": "step-backward"
				},
				{
					"type": "anticon",
					"name": "swap-left"
				},
				{
					"type": "anticon",
					"name": "tag"
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
					"name": "unlock"
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
					"name": "adn"
				},
				{
					"type": "fa",
					"name": "align-justify"
				},
				{
					"type": "fa",
					"name": "align-right"
				},
				{
					"type": "fa",
					"name": "ambulance"
				},
				{
					"type": "fa",
					"name": "anchor"
				},
				{
					"type": "fa",
					"name": "angellist"
				},
				{
					"type": "fa",
					"name": "angle-double-left"
				},
				{
					"type": "fa",
					"name": "angle-double-up"
				},
				{
					"type": "fa",
					"name": "angle-left"
				},
				{
					"type": "fa",
					"name": "angle-up"
				},
				{
					"type": "fa",
					"name": "archive"
				},
				{
					"type": "fa",
					"name": "arrow-circle-down"
				},
				{
					"type": "fa",
					"name": "arrow-circle-o-down"
				},
				{
					"type": "fa",
					"name": "arrow-circle-o-right"
				},
				{
					"type": "fa",
					"name": "arrow-circle-right"
				},
				{
					"type": "fa",
					"name": "arrow-down"
				},
				{
					"type": "fa",
					"name": "arrow-right"
				},
				{
					"type": "fa",
					"name": "arrows-h"
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
					"name": "asterisk"
				},
				{
					"type": "fa",
					"name": "audio-description"
				},
				{
					"type": "fa",
					"name": "backward"
				},
				{
					"type": "fa",
					"name": "ban"
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
					"name": "battery-0"
				},
				{
					"type": "fa",
					"name": "battery-2"
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
					"name": "behance"
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
					"name": "birthday-cake"
				},
				{
					"type": "fa",
					"name": "bitbucket-square"
				},
				{
					"type": "fa",
					"name": "black-tie"
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
					"name": "bomb"
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
					"name": "btc"
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
					"name": "bus"
				},
				{
					"type": "fa",
					"name": "cab"
				},
				{
					"type": "fa",
					"name": "calendar-minus-o"
				},
				{
					"type": "fa",
					"name": "calendar-plus-o"
				},
				{
					"type": "fa",
					"name": "calendar"
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
					"name": "caret-left"
				},
				{
					"type": "fa",
					"name": "caret-square-o-down"
				},
				{
					"type": "fa",
					"name": "caret-square-o-right"
				},
				{
					"type": "fa",
					"name": "caret-up"
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
					"name": "cc-discover"
				},
				{
					"type": "fa",
					"name": "cc-mastercard"
				},
				{
					"type": "fa",
					"name": "cc-stripe"
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
					"name": "check-circle"
				},
				{
					"type": "fa",
					"name": "check-square"
				},
				{
					"type": "fa",
					"name": "chevron-circle-down"
				},
				{
					"type": "fa",
					"name": "chevron-circle-right"
				},
				{
					"type": "fa",
					"name": "chevron-down"
				},
				{
					"type": "fa",
					"name": "chevron-right"
				},
				{
					"type": "fa",
					"name": "child"
				},
				{
					"type": "fa",
					"name": "circle-o-notch"
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
					"name": "clone"
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
					"name": "code"
				},
				{
					"type": "fa",
					"name": "codepen"
				},
				{
					"type": "fa",
					"name": "coffee"
				},
				{
					"type": "fa",
					"name": "cogs"
				},
				{
					"type": "fa",
					"name": "comment"
				},
				{
					"type": "fa",
					"name": "commenting"
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
					"name": "connectdevelop"
				},
				{
					"type": "fa",
					"name": "copy"
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
					"name": "crosshairs"
				},
				{
					"type": "fa",
					"name": "cube"
				},
				{
					"type": "fa",
					"name": "cut"
				},
				{
					"type": "fa",
					"name": "dashboard"
				},
				{
					"type": "fa",
					"name": "database"
				},
				{
					"type": "fa",
					"name": "deafness"
				},
				{
					"type": "fa",
					"name": "delicious"
				},
				{
					"type": "fa",
					"name": "deviantart"
				},
				{
					"type": "fa",
					"name": "digg"
				},
				{
					"type": "fa",
					"name": "dot-circle-o"
				},
				{
					"type": "fa",
					"name": "dribbble"
				},
				{
					"type": "fa",
					"name": "drupal"
				},
				{
					"type": "fa",
					"name": "edit"
				},
				{
					"type": "fa",
					"name": "ellipsis-h"
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
					"name": "envira"
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
					"name": "expand"
				},
				{
					"type": "fa",
					"name": "external-link"
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
					"name": "facebook-official"
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
					"name": "fax"
				},
				{
					"type": "fa",
					"name": "female"
				},
				{
					"type": "fa",
					"name": "file-audio-o"
				},
				{
					"type": "fa",
					"name": "file-excel-o"
				},
				{
					"type": "fa",
					"name": "file-movie-o"
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
					"name": "file-sound-o"
				},
				{
					"type": "fa",
					"name": "file-text-o"
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
					"name": "filter"
				},
				{
					"type": "fa",
					"name": "fire-extinguisher"
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
					"name": "flash"
				},
				{
					"type": "fa",
					"name": "flickr"
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
					"name": "forumbee"
				},
				{
					"type": "fa",
					"name": "foursquare"
				},
				{
					"type": "fa",
					"name": "futbol-o"
				},
				{
					"type": "fa",
					"name": "gavel"
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
					"name": "get-pocket"
				},
				{
					"type": "fa",
					"name": "gg-circle"
				},
				{
					"type": "fa",
					"name": "git"
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
					"name": "gittip"
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
					"name": "google-plus-official"
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
					"name": "gratipay"
				},
				{
					"type": "fa",
					"name": "h-square"
				},
				{
					"type": "fa",
					"name": "hand-grab-o"
				},
				{
					"type": "fa",
					"name": "hand-o-down"
				},
				{
					"type": "fa",
					"name": "hand-o-right"
				},
				{
					"type": "fa",
					"name": "hand-paper-o"
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
					"name": "hand-stop-o"
				},
				{
					"type": "fa",
					"name": "hashtag"
				},
				{
					"type": "fa",
					"name": "header"
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
					"name": "home"
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
					"name": "hourglass-3"
				},
				{
					"type": "fa",
					"name": "hourglass-half"
				},
				{
					"type": "fa",
					"name": "hourglass-start"
				},
				{
					"type": "fa",
					"name": "html5"
				},
				{
					"type": "fa",
					"name": "ils"
				},
				{
					"type": "fa",
					"name": "inbox"
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
					"name": "instagram"
				},
				{
					"type": "fa",
					"name": "internet-explorer"
				},
				{
					"type": "fa",
					"name": "ioxhost"
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
					"name": "keyboard-o"
				},
				{
					"type": "fa",
					"name": "language"
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
					"name": "legal"
				},
				{
					"type": "fa",
					"name": "level-down"
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
					"name": "link"
				},
				{
					"type": "fa",
					"name": "linkedin-square"
				},
				{
					"type": "fa",
					"name": "list-ol"
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
					"name": "long-arrow-down"
				},
				{
					"type": "fa",
					"name": "long-arrow-right"
				},
				{
					"type": "fa",
					"name": "low-vision"
				},
				{
					"type": "fa",
					"name": "magnet"
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
					"name": "map-pin"
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
					"name": "meanpath"
				},
				{
					"type": "fa",
					"name": "medkit"
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
					"name": "minus-circle"
				},
				{
					"type": "fa",
					"name": "minus-square-o"
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
					"name": "moon-o"
				},
				{
					"type": "fa",
					"name": "motorcycle"
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
					"name": "object-group"
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
					"name": "opera"
				},
				{
					"type": "fa",
					"name": "outdent"
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
					"name": "paragraph"
				},
				{
					"type": "fa",
					"name": "pause-circle-o"
				},
				{
					"type": "fa",
					"name": "pause"
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
					"name": "percent"
				},
				{
					"type": "fa",
					"name": "phone-square"
				},
				{
					"type": "fa",
					"name": "picture-o"
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
					"name": "plane"
				},
				{
					"type": "fa",
					"name": "play-circle"
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
					"name": "print"
				},
				{
					"type": "fa",
					"name": "puzzle-piece"
				},
				{
					"type": "fa",
					"name": "qrcode"
				},
				{
					"type": "fa",
					"name": "question-circle"
				},
				{
					"type": "fa",
					"name": "quote-left"
				},
				{
					"type": "fa",
					"name": "ra"
				},
				{
					"type": "fa",
					"name": "rebel"
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
					"name": "search-plus"
				},
				{
					"type": "fa",
					"name": "search"
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
					"name": "share-alt"
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
					"name": "shirtsinbulk"
				},
				{
					"type": "fa",
					"name": "shopping-basket"
				},
				{
					"type": "fa",
					"name": "sign-in"
				},
				{
					"type": "fa",
					"name": "sign-out"
				},
				{
					"type": "fa",
					"name": "signing"
				},
				{
					"type": "fa",
					"name": "sitemap"
				},
				{
					"type": "fa",
					"name": "skype"
				},
				{
					"type": "fa",
					"name": "sliders"
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
					"name": "soccer-ball-o"
				},
				{
					"type": "fa",
					"name": "sort-alpha-asc"
				},
				{
					"type": "fa",
					"name": "sort-amount-asc"
				},
				{
					"type": "fa",
					"name": "sort-asc"
				},
				{
					"type": "fa",
					"name": "sort-down"
				},
				{
					"type": "fa",
					"name": "sort-numeric-desc"
				},
				{
					"type": "fa",
					"name": "soundcloud"
				},
				{
					"type": "fa",
					"name": "spinner"
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
					"name": "stack-overflow"
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
					"name": "steam-square"
				},
				{
					"type": "fa",
					"name": "step-forward"
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
					"name": "stop"
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
					"name": "subway"
				},
				{
					"type": "fa",
					"name": "sun-o"
				},
				{
					"type": "fa",
					"name": "support"
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
					"name": "tasks"
				},
				{
					"type": "fa",
					"name": "television"
				},
				{
					"type": "fa",
					"name": "terminal"
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
					"name": "themeisle"
				},
				{
					"type": "fa",
					"name": "thumbs-down"
				},
				{
					"type": "fa",
					"name": "thumbs-o-up"
				},
				{
					"type": "fa",
					"name": "ticket"
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
					"name": "toggle-on"
				},
				{
					"type": "fa",
					"name": "toggle-up"
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
					"name": "trello"
				},
				{
					"type": "fa",
					"name": "trophy"
				},
				{
					"type": "fa",
					"name": "try"
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
					"name": "upload"
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
					"name": "user-secret"
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
					"name": "viacoin"
				},
				{
					"type": "fa",
					"name": "viadeo-square"
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
					"name": "volume-control-phone"
				},
				{
					"type": "fa",
					"name": "volume-off"
				},
				{
					"type": "fa",
					"name": "warning"
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
					"name": "wikipedia-w"
				},
				{
					"type": "fa",
					"name": "won"
				},
				{
					"type": "fa",
					"name": "wpbeginner"
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
					"name": "y-combinator-square"
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