/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/slider.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/slider.js":
/*!*****************************!*\
  !*** ./public/js/slider.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst app = new window.Vue({\n  el: '#app',\n  data: {\n    items: window.items,\n    index: 0\n  },\n  computed: {\n    item() {\n      const item = this.items[this.index];\n\n      if (!item) {\n        return {};\n      }\n\n      return item;\n    },\n\n    screenshot() {\n      return `/api/site/${this.item.siteId}/screenshot`;\n    },\n\n    modelScore() {\n      return this.item.modelScore || 0;\n    },\n\n    assessorsScore() {\n      return this.item.assessorsScore || [];\n    },\n\n    meanAssessorsScore() {\n      if (!this.assessorsScore.length) {\n        return 0;\n      }\n\n      return this.assessorsScore.reduce((sum, answer) => sum + answer, 0) / this.assessorsScore.length;\n    },\n\n    error() {\n      if (this.modelScore === 0) {\n        return '-';\n      }\n\n      return Math.abs(this.modelScore - this.meanAssessorsScore);\n    },\n\n    modelScoreStr() {\n      if (this.modelScore === 0) {\n        return '-';\n      }\n\n      return this.modelScore.toFixed(4);\n    },\n\n    meanAssessorsScoreStr() {\n      return this.meanAssessorsScore.toFixed(4);\n    },\n\n    errorStr() {\n      if (this.modelScore === 0) {\n        return '-';\n      }\n\n      return this.error.toFixed(4);\n    },\n\n    assessorsScoreStr() {\n      return this.assessorsScore.join(', ');\n    }\n\n  },\n  methods: {\n    prev() {\n      this.index = (this.index - 1 + this.items.length) % this.items.length;\n    },\n\n    next() {\n      this.index = (this.index + 1) % this.items.length;\n    }\n\n  }\n});\n$(window).keydown(event => {\n  if (event.keyCode === 37) {\n    event.preventDefault();\n    app.prev();\n  }\n\n  if (event.keyCode === 39) {\n    event.preventDefault();\n    app.next();\n  }\n});\n\n//# sourceURL=webpack:///./public/js/slider.js?");

/***/ })

/******/ });