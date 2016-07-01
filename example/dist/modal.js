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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by ASUS on 2016/6/30.
	 */

	__webpack_require__(1);
	__webpack_require__(4);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by ASUS on 2016/6/30.
	 */
	var Modal = __webpack_require__(2);

	module.exports = Modal;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by ASUS on 2016/6/30.
	 */
	var $ = __webpack_require__(3);

	var Modal = function (element, options) {

		this.$body = $(document.body);
		this.$element = $(element);
		this.isShown = false;
		this.$backdrop = null;
		this.originBodyPaddingRight = null;
	};

	Modal.prototype.show = function (_relatedTarget) {

		if (this.isShown) return;
		this.isShown = true;

		this._addBackdrop();
		this._hideScrollbar();

		this.$backdrop.addClass('in');

		setTimeout(function () {
			this.$element.show(0).addClass('in');
		}.bind(this), 100);
	};

	Modal.prototype._addBackdrop = function () {

		this.$backdrop = $(document.createElement("div")).addClass("cow_modal_backdrop fade").appendTo(this.$body);

		this.$element.on("click.dismiss.cow.modal", function (e) {
			if ($(e.target).is(this.$element[0])) this.hide();
		}.bind(this));

		// 兼容 IE8 浏览器
		// 在 IE8 模式下。 modal 弹出时，背景聚焦在 backdrop 中，而非 modal 中。
		this.$backdrop.on("click.dismiss.cow.modal", function (e) {
			this.hide();
		}.bind(this));
	};

	Modal.prototype._hideScrollbar = function () {

		this.$body.addClass("cow_modal_open");
		var scrollbarWidth = window.outerHeight > window.innerHeight ? 0 : this._measureScrollbar();

		this.originBodyPaddingRight = parseInt(this.$body.css('padding-right') || 0, 10);
		this.$body.css('padding-right', this.originBodyPaddingRight + scrollbarWidth);
	};

	Modal.prototype._measureScrollbar = function () {

		var scrollDiv = document.createElement('div');
		scrollDiv.className = 'cow_modal_measure_scrollbar';
		this.$body.append(scrollDiv);
		var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		this.$body[0].removeChild(scrollDiv);

		return scrollbarWidth;
	};

	Modal.prototype.hide = function (_relateTarget) {

		this.$element.removeClass("in").off(".dismiss.cow.modal");

		this.$backdrop.removeClass("in").off('.dismiss.cow.modal');

		this.isShown = false;
		this.$element.hide();
		this.$body.removeClass('bt-modal-open');
		this._resetScrollbar();
		this._removeBackdrop();
	};

	Modal.prototype._resetScrollbar = function () {
		this.$body.css("padding-left", this.originBodyPaddingRight);
	};

	Modal.prototype._removeBackdrop = function () {
		this.$backdrop && this.$backdrop.remove();
		this.$backdrop = null;
	};

	Modal.prototype.toggle = function (_relateTarget) {
		this.isShown ? this.hide(_relateTarget) : this.show(_relateTarget);
	};

	Modal.Plugin = function (elements, options, _relatedTarget) {

		return elements.each(function () {
			var $this = $(this);
			var data = $this.data("cow.modal");
			if (!data) $this.data("cow.modal", data = new Modal(this, options));

			if (typeof options == 'string') data[options](_relatedTarget);else if (options.show) data.show(_relatedTarget);
		});
	};

	$(document.body).on('click.auto-init.cow.modal', '[data-toggle="modal"]', function (e) {

		var $this = $(this),
		    $target = $($this.data('target'));

		var options = $target.data('cow.modal') ? 'toggle' : { show: true };

		if ($this.is('a')) e.preventDefault();

		Modal.Plugin($target, options, this);
	});

	module.exports = Modal;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Created by ASUS on 2016/7/1.
	 */

	if (!Function.prototype.bind) {
		Function.prototype.bind = function (oThis) {
			if (typeof this !== "function") {
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}
			var aArgs = Array.prototype.slice.call(arguments, 1),
			    fToBind = this,
			    fNOP = function () {},
			    fBound = function () {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
			};
			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();
			return fBound;
		};
	}

/***/ }
/******/ ]);