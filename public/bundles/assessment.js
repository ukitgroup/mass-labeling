/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"assessment": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./public/js/assessment.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/css/assessment.css":
/*!***********************************!*\
  !*** ./public/css/assessment.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./public/css/assessment.css?");

/***/ }),

/***/ "./public/js/assessment.js":
/*!*********************************!*\
  !*** ./public/js/assessment.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ \"./public/js/request.js\");\n/* harmony import */ var _css_assessment_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/assessment.css */ \"./public/css/assessment.css\");\n/* harmony import */ var _css_assessment_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_assessment_css__WEBPACK_IMPORTED_MODULE_2__);\n/* eslint-disable no-alert */\n\n\n // todo: load bootstrap from NPM package\n\nwindow.$ = jquery__WEBPACK_IMPORTED_MODULE_0___default.a;\nwindow.jQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default.a; // Texts from back-end\n\nconst {\n  signs\n} = window;\njquery__WEBPACK_IMPORTED_MODULE_0___default()('#logout').click(event => {\n  event.preventDefault();\n  _request__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/api/auth/logout').then(() => {\n    window.location = '/';\n  });\n});\n\nclass Design {\n  constructor(markupCount, markupLimit) {\n    this.markupCount = markupCount;\n    this.markupLimit = markupLimit === Infinity ? 0 : markupLimit;\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('keyup', event => {\n      let {\n        keyCode\n      } = event;\n      const xKeyCode = 'X'.charCodeAt(0); // numpad\n\n      if (keyCode >= 96 && keyCode <= 105) {\n        keyCode -= 96 - 48;\n      }\n\n      if (keyCode >= 48 && keyCode <= 57 || keyCode === xKeyCode) {\n        event.preventDefault();\n\n        if (keyCode === xKeyCode) {\n          if (this.task.siteStatus === 'approved') {\n            alert(signs.site_approved);\n            return;\n          }\n\n          this.answer = 0;\n        } else if (keyCode === 48) {\n          this.answer = 10;\n        } else {\n          this.answer = keyCode - 48;\n        }\n\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#answer').text(this.answer || 'X');\n        const $mark = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`<div class=\"mark\">${this.answer || 'X'}</div>`);\n        $mark.appendTo('body');\n        $mark.animate({\n          width: 0,\n          height: 0,\n          margin: 0,\n          opacity: 0,\n          fontSize: 0,\n          lineHeight: 0\n        }, 1000, () => $mark.remove());\n      }\n    });\n    this.next();\n  }\n\n  show() {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#answer').text('-');\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#markup-count').text(this.markupCount);\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#image').attr('src', `/api/site/${this.task.siteId}/screenshot`);\n    this.answer = null;\n  } // Получение новой задачи\n\n\n  next() {\n    if (this.markupLimit && this.markupCount >= this.markupLimit) {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('keyup');\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#root').hide();\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#overdose').show();\n    }\n\n    _request__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/api/assessment/create').then(task => {\n      // User has no more tasks\n      if (task.limitReached) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('keyup');\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#root').hide();\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#overdose').show();\n      } else {\n        this.task = task;\n        this.show();\n      }\n    }).catch(() => {\n      alert(signs.get_new_task_error);\n    });\n  } // Сохранение выбора пользователя\n\n\n  save() {\n    _request__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/api/assessment/answer', {\n      data: {\n        siteId: this.task.siteId,\n        answer: this.answer\n      }\n    }).then(taskId => {\n      this.markupCount++;\n      this.task.id = taskId;\n      this.prev = this.task;\n      this.next();\n    });\n  } // Возврат к предыдущей задаче\n\n\n  undo() {\n    if (!this.prev) {\n      return;\n    }\n\n    _request__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(`/api/assessment/${this.prev.id}/undo`).then(() => {\n      this.markupCount--;\n      this.task = this.prev;\n      this.prev = null;\n      this.show();\n    });\n  } // Инициализация горячих клавиш\n\n\n  hotkeys(keys = {}) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('keyup', event => {\n      // Сохранить\n      if (event.keyCode === keys.save) {\n        event.preventDefault();\n\n        if (this.answer != null) {\n          this.save();\n        } else {\n          alert(signs.no_mark_specified);\n        }\n      } // Возврат к предыдущей задаче\n\n\n      if (event.keyCode === keys.undo) {\n        event.preventDefault();\n        this.undo();\n      }\n    });\n  }\n\n}\n\nconst design = new Design(window.markupCount, window.markupLimit);\ndesign.hotkeys({\n  save: 13,\n  undo: 8\n});\n\n//# sourceURL=webpack:///./public/js/assessment.js?");

/***/ })

/******/ });