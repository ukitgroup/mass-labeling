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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/config.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/config.js":
/*!*****************************!*\
  !*** ./public/js/config.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* eslint-disable no-alert,prefer-destructuring */\n\n\nconst {\n  UsersController,\n  UserInstructionsController,\n  ConfigFieldSet,\n  TaskSetsController\n} = window;\nconst tabs = {\n  USERS: 'users',\n  ASSESSMENTS: 'assessment',\n  TECH: 'tech'\n};\nnew window.Vue({\n  el: '.js-container',\n  components: {\n    'users-controller': UsersController,\n    'user-instructions-controller': UserInstructionsController,\n    'config-fieldset': ConfigFieldSet,\n    'tasksets-controller': TaskSetsController\n  },\n\n  data() {\n    return {\n      config: window.config,\n      availableDataSets: window.availableDataSets,\n      loading: false,\n      signs: window.signs,\n      activeTab: tabs.USERS,\n      instructions: window.instructions,\n      taskSets: window.taskSets\n    };\n  },\n\n  computed: {\n    techSettings() {\n      return this.config.filter(fieldSet => fieldSet.tab === tabs.TECH);\n    }\n\n  },\n  methods: {\n    updateConfig() {\n      window.Request.post('/api/config/update', {\n        data: {\n          config: this.config,\n          availableDataSets: this.availableDataSets,\n          instructions: this.instructions\n        }\n      }).then(() => alert(this.signs.config_updated)).catch(error => alert(error));\n    },\n\n    switchTab(tab) {\n      this.activeTab = tab;\n      window.location.hash = `#tab=${tab}`;\n    },\n\n    getTabClass(tab) {\n      return this.activeTab === tab ? 'btn-primary' : 'btn-default';\n    }\n\n  },\n\n  created() {\n    const {\n      hash\n    } = window.location;\n\n    if (hash) {\n      this.activeTab = window.location.hash.split('=')[1];\n    } else {\n      this.activeTab = tabs.USERS;\n    } // this.$on('datasetsActiveState', state => this.setDataSetsStatus(state));\n    // this.$on('datasetsExportState', state => this.setDataSetsExportStatus(state));\n\n\n    this.$on('instructionsUpdate', value => {\n      this.instructions = value;\n    });\n  },\n\n  mounted() {\n    this.loading = false;\n  }\n\n});\n\n//# sourceURL=webpack:///./public/js/config.js?");

/***/ })

/******/ });