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
/******/ 		"config": 0
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
/******/ 	deferredModules.push(["./public/js/config.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/css/config.css":
/*!*******************************!*\
  !*** ./public/css/config.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./public/css/config.css?");

/***/ }),

/***/ "./public/js/components/ConfigFieldSet.js":
/*!************************************************!*\
  !*** ./public/js/components/ConfigFieldSet.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Component of settings fieldset (/config)\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  template: `\n\t\t<div>\n\t\t  <h3>{{signs[fieldSet.name]}}</h3>\n\t\t\n\t\t  <div \n\t\t  \tclass=\"form-group form-check-label\" \n\t\t  \t:class=\"{'checkbox-block': property.element.type === 'checkbox'}\" \n\t\t  \tv-for=\"(property, pIndex) in fieldSet.properties\"\n\t\t  >\n\t\t\t<label :for=\"property.id\">\n\t\t\t  {{signs[property.name]}}\n\t\t\t</label>\n\t\t\n\t\t\t<input\n\t\t\t  min=\"0\"\n\t\t\t  type=\"number\"\n\t\t\t  class=\"form-control\"\n\t\t\t  v-model=\"property.value\"\n\t\t\t  v-if=\"property.element.type === 'number'\"\n\t\t\t  :id=\"property.id\"\n\t\t\t>\n\t\t\n\t\t\t<input\n\t\t\t  type=\"text\"\n\t\t\t  class=\"form-control\"\n\t\t\t  v-model=\"property.value\"\n\t\t\t  v-if=\"property.element.type === 'text'\"\n\t\t\t  :id=\"property.id\"\n\t\t\t>\n\t\t\t\n\t\t\t<input\n\t\t\t  type=\"checkbox\"\n\t\t\t  class=\"form-check-input\"\n\t\t\t  v-model=\"property.value\"\n\t\t\t  v-if=\"property.element.type === 'checkbox'\"\n\t\t\t  :id=\"property.id\"\n\t\t\t>\n\t\t\n\t\t\t<select\n\t\t\t  class=\"form-control\"\n\t\t\t  v-model=\"property.value\"\n\t\t\t  v-if=\"property.element.type === 'select'\"\n\t\t\t  :id=\"property.id\"\n\t\t\t>\n\t\t\t  <option v-for=\"(text, value) in property.element.options\" :value=\"value\">\n\t\t\t\t{{signs[text]}}\n\t\t\t  </option>\n\t\t\t</select>\t\n\t\t  </div>\n\t\t</div>\n\t`,\n\n  data() {\n    return {\n      signs: window.signs\n    };\n  },\n\n  props: ['fieldSet']\n});\n\n//# sourceURL=webpack:///./public/js/components/ConfigFieldSet.js?");

/***/ }),

/***/ "./public/js/components/TaskSetsController.js":
/*!****************************************************!*\
  !*** ./public/js/components/TaskSetsController.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../request */ \"./public/js/request.js\");\n/* eslint-disable no-underscore-dangle */\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  template: `\n\t\t<div>\n\t\t  <div v-if=\"!selectedTaskSet\">\n\t\t\t<div class=\"form-group\">\n\t\t\t  <button @click.prevent=\"addTaskSet()\" type=\"button\" class=\"btn btn-primary\">\n\t\t\t\t{{signs.add_taskset}}\n\t\t\t  </button>\n\t\t\t</div>\n\t\t\n\t\t\t<div class=\"row\">\n\t\t\t  <table class=\"table table-striped\">\n\t\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t  <th>№</th>\n\t\t\t\t  <th>{{signs.assessment_limit_short}}</th>\n\t\t\t\t  <th>{{signs.random_selection}}</th>\n\t\t\t\t  <th>{{signs['config_props.cliExport_datasets']}}</th>\n\t\t\t\t  <th>{{signs.active_taskset}}</th>\n\t\t\t\t  <th>{{signs.description}}</th>\n\t\t\t\t  <th>{{signs.actions}}</th>\n\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t<tr v-for=\"(taskSet, index) in taskSets\">\n\t\t\t\t  <td>{{index + 1}}</td>\n\t\t\t\t  <td>{{taskSet.assessmentLimit}}</td>\n\t\t\t\t  <td>{{booleanToReadableString(taskSet.randomSelection)}}</td>\n\t\t\t\t  <td>{{'dataset1, dataset2, dataset3'}}</td>\n\t\t\t\t  <td>{{booleanToReadableString(taskSet.isActive)}}</td>\n\t\t\t\t  <td>{{taskSet.description || '-'}}</td>\n\t\t\t\t  <td>\n\t\t\t\t\t<button @click.prevent=\"editTaskSet(taskSet)\" type=\"button\" class=\"btn btn-success btn-xs\">\n\t\t\t\t\t  {{signs.edit}}\n\t\t\t\t\t</button>\n\t\t\n\t\t\t\t\t<button @click.prevent=\"1\" type=\"button\" class=\"btn btn-primary btn-xs\">\n\t\t\t\t\t  {{signs.activate}}\n\t\t\t\t\t</button>\n\t\t\t\t  </td>\n\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t  </table>\n\t\t\t</div>\n\t\t  </div>\n\t\t\n\t\t\t{{selectedTaskSet && selectedTaskSet.dataSets}}\n\t\t\n\t\t  <div class=\"users-form-wrapper\" v-if=\"selectedTaskSet\">\n\t\t\t<h1 v-if=\"selectedTaskSet._id\">{{signs.edit_taskset}}</h1>\n\t\t\t<h1 v-else>{{signs.add_taskset}}</h1>\n\t\t\n\t\t\t<button class=\"btn btn-success\" @click.prevent=\"closeForm()\">{{signs.cancel}}</button>\n\t\t\t<button class=\"btn btn-primary\" @click.prevent=\"submitForm()\">{{signs.submit}}</button>\n\t\t\n\t\t\t<div class=\"row tasksets-form\">\n\t\t\t  <div class=\"col-xs-6\">\n\t\t\t\t<div autocomplete=\"off\">\n\t\t\n\t\t\t\t  <div class=\"form-group property\">\n\t\t\t\t\t<label for=\"limit\">{{signs['config_props.assessment_limit']}}</label>\n\t\t\t\t\t<input :disabled=\"!selectedTaskSet.randomSelection\" type=\"number\" id=\"limit\" class=\"form-control\" v-model=\"selectedTaskSet.assessmentLimit\">\n\t\t\t\t  </div>\n\t\t\n\t\t\t\t  <div class=\"form-check-label property\">\n\t\t\t\t\t<input\n\t\t\t\t\t  id=\"randomSelection\"\n\t\t\t\t\t  class=\"form-check-input\"\n\t\t\t\t\t  type=\"checkbox\"\n\t\t\t\t\t  v-model=\"selectedTaskSet.randomSelection\"\n\t\t\t\t\t>\n\t\t\n\t\t\t\t\t<label for=\"randomSelection\">{{signs['config_props.show_randomly']}}</label>\n\t\t\t\t  </div>\n\t\t\t\t  \n\t\t\t\t  <div class=\"form-check-label property\">\n\t\t\t\t\t<label for=\"task-set-description\">{{signs.description}}</label>\n\t\t\t\t\t\n\t\t\t\t\t<textarea\n\t\t\t\t\t  id=\"task-set-description\"\n\t\t\t\t\t  class=\"form-check-input\"\n\t\t\t\t\t  type=\"checkbox\"\n\t\t\t\t\t  v-model=\"selectedTaskSet.description\"\n\t\t\t\t\t></textarea>\n\t\t\t\t  </div>\n\t\t\n\t\t\t\t  <h5>\n\t\t\t\t  \t{{this.signs.datasets_for_task}}\n\t\t\t\t  \t\n\t\t\t\t    <i @click=\"setDataSetsStatus(true)\" :title=\"signs.check_all\" class=\"fa fa-check-square-o datasets-control\" aria-hidden=\"true\"></i>\n\t\t\t\t\t<i @click=\"setDataSetsStatus(false)\" :title=\"signs.uncheck_all\" class=\"fa fa-square-o datasets-control\" aria-hidden=\"true\"></i>\n\t\t\t\t  </h5>\n\t\t\t\t  \n\t\t\t\t  <div v-if=\"dataSetsList.length\" class=\"datasets-container property\">\n\t\t\t\t\t<div class=\"form-check-label dataset-item\" v-for=\"(dataset, index) in selectedTaskSet.dataSets\">\n\t\t\t\t\t  <input\n\t\t\t\t\t\t:id=\"index\"\n\t\t\t\t\t\tclass=\"form-check-input\"\n\t\t\t\t\t\ttype=\"checkbox\"\n\t\t\t\t\t\tv-model=\"dataset.isInTaskSet\"\n\t\t\t\t\t  >\n\t\t\n\t\t\t\t\t  <label :for=\"index\">{{dataset._id}}</label>\n\t\t\t\t\t</div>\n\t\t\t\t  </div>\n\t\t\n\t\t\t\t  <div v-else>\n\t\t\t\t\t{{window.signs.no_datasets}}\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t  </div>\n\t\t\t</div>\n\t\t  </div>\n\t\t</div>\n\t`,\n  props: ['taskSets', 'dataSets'],\n\n  data() {\n    return {\n      signs: window.signs,\n      selectedTaskSet: null,\n      dataSetsList: []\n    };\n  },\n\n  computed: {\n    selectedDataSets() {\n      return this.dataSetsList.filter(dataSet => dataSet.isInTaskSet);\n    }\n\n  },\n  methods: {\n    addTaskSet() {\n      const blankTaskSet = {\n        assessmentLimit: 0,\n        randomSelection: true,\n        description: '',\n        activeDataSets: []\n      }; // this.dataSetsList.forEach((dataSet) => {\n      // \tdataSet.isInTaskSet = false;\n      // });\n      // this.dataSetsList.forEach((dataSet) => {\n      // \t// dataSet.isInTaskSet = blankTaskSet.activeDataSets.indexOf(dataSet.dataset) >= 0;\n      // });\n\n      this.selectedTaskSet = blankTaskSet;\n    },\n\n    editTaskSet(taskSet) {\n      // this.dataSetsList.forEach((dataSet) => {\n      // \t// dataSet.isInTaskSet = taskSet.activeDataSets.indexOf(dataSet.dataset) >= 0;\n      // });\n      this.selectedTaskSet = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, taskSet);\n    },\n\n    closeForm() {\n      this.selectedTaskSet = null;\n    },\n\n    submitForm() {\n      const taskSet = this.selectedTaskSet;\n      const taskSetId = taskSet._id; // Edit user request\n\n      if (taskSetId) {\n        _request__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(`/api/config/${taskSetId}/edit-taskset`, {\n          data: {\n            taskSet\n          }\n        }).then(() => window.location.reload()).catch(() => alert(this.signs.edit_user_error)); // Add user request\n      } else {\n        _request__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/api/config/add-taskset', {\n          data: {\n            taskSet\n          }\n        }).then(() => window.location.reload()).catch(() => alert(this.signs.add_user_error));\n      }\n    },\n\n    booleanToReadableString(boolean) {\n      return boolean ? this.signs.yes : this.signs.no;\n    }\n\n  },\n\n  created() {\n    // this.taskSets = this.taskSets.push(this.taskSets[0]);\n    this.dataSetsList = [...this.dataSets]; // this.dataSetsList.forEach((dataSet) => {\n    // \tdataSet.isInTaskSet = false;\n    // });\n  }\n\n});\n\n//# sourceURL=webpack:///./public/js/components/TaskSetsController.js?");

/***/ }),

/***/ "./public/js/components/UserInstructionsController.js":
/*!************************************************************!*\
  !*** ./public/js/components/UserInstructionsController.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_codemirror_lib_codemirror__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/codemirror/lib/codemirror */ \"./node_modules/codemirror/lib/codemirror.js\");\n/* harmony import */ var _node_modules_codemirror_lib_codemirror__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_codemirror_lib_codemirror__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/codemirror/mode/xml/xml */ \"./node_modules/codemirror/mode/xml/xml.js\");\n/* harmony import */ var _node_modules_codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_codemirror_addon_display_autorefresh__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/codemirror/addon/display/autorefresh */ \"./node_modules/codemirror/addon/display/autorefresh.js\");\n/* harmony import */ var _node_modules_codemirror_addon_display_autorefresh__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_codemirror_addon_display_autorefresh__WEBPACK_IMPORTED_MODULE_2__);\n/* eslint-disable no-alert */\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  template: `\n\t\t<div class=\"edit-instructions\">\n          <button @click.prevent=\"openCodeMirror\" v-show=\"!editorShown\" class=\"btn btn-success\">\n            {{signs.edit_instruction_page_html}}\n          </button>\n\n          <button @click.prevent=\"closeCodeMirror\" v-show=\"editorShown\" class=\"btn btn-success\">\n            {{signs.close_editor}}\n          </button>\n\n          <div v-show=\"editorShown\">\n            <textarea id=\"instructions\" v-model=\"instructions\"></textarea>\n          </div>\n        </div>\n\t`,\n  props: ['instructions'],\n\n  data() {\n    return {\n      editorShown: false,\n      cmInstance: null,\n      signs: window.signs\n    };\n  },\n\n  methods: {\n    openCodeMirror() {\n      this.editorShown = true;\n    },\n\n    closeCodeMirror() {\n      this.editorShown = false;\n    }\n\n  },\n\n  mounted() {\n    const instructionsTextArea = this.$el.querySelector('#instructions');\n    this.cmInstance = _node_modules_codemirror_lib_codemirror__WEBPACK_IMPORTED_MODULE_0___default.a.fromTextArea(instructionsTextArea, {\n      lineNumbers: true,\n      mode: 'xml',\n      theme: 'mdn-like',\n      lineWrapping: true,\n      autoRefresh: true\n    });\n    this.cmInstance.on('change', () => {\n      this.$parent.$emit('instructionsUpdate', this.cmInstance.getValue());\n    });\n  }\n\n});\n\n//# sourceURL=webpack:///./public/js/components/UserInstructionsController.js?");

/***/ }),

/***/ "./public/js/components/UsersController.js":
/*!*************************************************!*\
  !*** ./public/js/components/UsersController.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../request */ \"./public/js/request.js\");\n/* eslint-disable no-underscore-dangle,no-alert */\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  template: `\n\t\t<div>\n\t\t\t<div v-if=\"!selectedUser\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t  <button @click.prevent=\"addUser()\" type=\"button\" class=\"btn btn-primary\">\n\t\t\t\t  \t{{signs.user_add}}\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\n\t\t\t\t<div class=\"row\">\n\t\t\t\t  <table class=\"table table-striped\">\n\t\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t  <th>E-mail</th>\n\t\t\t\t\t  <th>{{signs.status}}</th>\n\t\t\t\t\t  <th>{{signs.role}}</th>\n\t\t\t\t\t  <th>{{signs.actions}}</th>\n\t\t\t\t\t</tr>\n\t\t\t\t\t</thead>\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t<tr v-for=\"user in users\" :class=\"{\n\t\t\t\t\t\t\t'text-muted': user.status === 'disabled',\n\t\t\t\t\t\t\t'text-bold': user.role === 'admin',\n\t\t\t\t\t\t}\">\n\t\t\t\t\t\t  <td>{{user.email}}</td>\n\t\t\t\t\t\t  <td>{{signs['user_statuses.' + user.status]}}</td>\n\t\t\t\t\t\t  <td>{{signs['user_roles.' + user.role]}}</td>\n\t\t\t\t\t\t  <td>\n\t\t\t\t\t\t\t<button @click.prevent=\"editUser(user)\" type=\"button\" class=\"btn btn-warning btn-xs\">\n\t\t\t\t\t\t\t  {{signs.edit}}\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<button \n\t\t\t\t\t\t\t\t@click.prevent=\"createSlider(user)\" \n\t\t\t\t\t\t\t\ttype=\"button\" \n\t\t\t\t\t\t\t\tclass=\"btn btn-primary btn-xs create-slider\"\n\t\t\t\t\t\t\t\t:disabled=\"!user.hasAnswers\"\n\t\t\t\t\t\t\t\t:title=\"user.hasAnswers ? '' : signs.slider_creation_error\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t  {{signs.gen_slider}}\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<button \n\t\t\t\t\t\t\t\t@click.prevent=\"openSlider(user)\" \n\t\t\t\t\t\t\t\ttype=\"button\" \n\t\t\t\t\t\t\t\tclass=\"btn btn-success btn-xs\"\n\t\t\t\t\t\t\t\t:disabled=\"!user.hasSlider\"\n\t\t\t\t\t\t\t\t:title=\"user.hasSlider ? '' : signs.slider_opening_error\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t  {{signs.open_slider}}\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t  </td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</tbody>\n\t\t\t\t  </table>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t\t\n\t\t\t<div class=\"users-form-wrapper\" v-if=\"selectedUser\">\n\t\t\t\t<h1 v-if=\"selectedUser._id\">{{signs.user_edit}}</h1>\n\t\t\t\t<h1 v-else>{{signs.user_add}}</h1>\n\t\t\t\t\n\t\t\t\t<button class=\"btn btn-success\" @click.prevent=\"closeForm()\">{{signs.cancel}}</button>\n\t\t\t\t<button class=\"btn btn-primary\" @click.prevent=\"submitForm()\">{{signs.submit}}</button>\n\n\t\t\t\t<div class=\"row users-form\">\n\t\t\t\t  <div class=\"col-xs-6\">\n\t\t\t\t\t<form autocomplete=\"off\">\n\t\t\t\t\t  <div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"email\">E-mail</label>\n\t\t\t\t\t\t<input type=\"email\" id=\"email\" class=\"form-control\" v-model=\"selectedUser.email\">\n\t\t\t\t\t  </div>\n\t\t\t\t\t  \n\t\t\t\t\t  <div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"pass\">{{signs.password}}</label>\n\t\t\t\t\t\t<input type=\"password\" id=\"pass\" class=\"form-control\" v-model=\"selectedUser.password\">\n\t\t\t\t\t  </div>\n\t\t\t\t\t  \n\t\t\t\t\t  <div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"status\">{{signs.status}}</label>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<select id=\"status\" class=\"form-control\" v-model=\"selectedUser.status\">\n\t\t\t\t\t\t  <option v-for=\"(value, key) in statuses\" :value=\"key\">\n\t\t\t\t\t\t  \t{{signs['user_statuses.' + key]}}\n\t\t\t\t\t\t  </option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t  </div>\n\t\t\t\t\t  \n\t\t\t\t\t  <div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"role\">{{signs.role}}</label>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<select id=\"role\" class=\"form-control\" v-model=\"selectedUser.role\">\n\t\t\t\t\t\t\t<option v-for=\"(value, key) in roles\" :value=\"key\">\n\t\t\t\t\t\t\t\t{{signs['user_roles.' + key]}}\n\t\t\t\t\t\t\t</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t  </div>\n\t\t\t\t\t</form>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t`,\n\n  data() {\n    return {\n      users: window.users,\n      roles: window.roles,\n      statuses: window.statuses,\n      signs: window.signs,\n      selectedUser: null\n    };\n  },\n\n  methods: {\n    addUser() {\n      this.selectedUser = {\n        email: '',\n        password: '',\n        role: 'admin',\n        status: 'active'\n      };\n    },\n\n    editUser(user) {\n      this.selectedUser = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, {}, user);\n    },\n\n    openSlider(user) {\n      if (!user.hasSlider) {\n        return;\n      }\n\n      window.location.href = `/slider/${user.email}`;\n    },\n\n    closeForm() {\n      this.selectedUser = null;\n    },\n\n    submitForm() {\n      const user = this.selectedUser;\n      const userId = user._id; // Edit user request\n\n      if (userId) {\n        _request__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(`/api/config/${userId}/update-user`, {\n          data: {\n            user\n          }\n        }).then(() => window.location.reload()).catch(() => alert(this.signs.edit_user_error)); // Add user request\n      } else {\n        _request__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/api/config/add-user', {\n          data: {\n            user\n          }\n        }).then(() => window.location.reload()).catch(() => alert(this.signs.add_user_error));\n      }\n    },\n\n    createSlider(user) {\n      if (!user.hasAnswers) {\n        return;\n      }\n\n      _request__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(`/api/config/${user._id}/create-slider`).then(() => {\n        const updatedUser = this.users.filter(storedUser => user._id === storedUser._id)[0];\n\n        if (updatedUser) {\n          updatedUser.hasSlider = true;\n        }\n\n        alert(this.signs.slider_created);\n      }).catch(err => alert(err.message));\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./public/js/components/UsersController.js?");

/***/ }),

/***/ "./public/js/config.js":
/*!*****************************!*\
  !*** ./public/js/config.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm.js\");\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ \"./public/js/request.js\");\n/* harmony import */ var _css_config_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/config.css */ \"./public/css/config.css\");\n/* harmony import */ var _css_config_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_config_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_UsersController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/UsersController */ \"./public/js/components/UsersController.js\");\n/* harmony import */ var _components_UserInstructionsController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/UserInstructionsController */ \"./public/js/components/UserInstructionsController.js\");\n/* harmony import */ var _components_ConfigFieldSet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/ConfigFieldSet */ \"./public/js/components/ConfigFieldSet.js\");\n/* harmony import */ var _components_TaskSetsController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/TaskSetsController */ \"./public/js/components/TaskSetsController.js\");\n/* eslint-disable no-alert,prefer-destructuring */\n\n\n\n\n\n\n\nconst tabs = {\n  USERS: 'users',\n  ASSESSMENTS: 'assessment',\n  TECH: 'tech'\n};\nnew vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  el: '.js-container',\n  components: {\n    'users-controller': _components_UsersController__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    'user-instructions-controller': _components_UserInstructionsController__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n    'config-fieldset': _components_ConfigFieldSet__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n    'tasksets-controller': _components_TaskSetsController__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n  },\n\n  data() {\n    return {\n      config: window.config,\n      availableDataSets: window.availableDataSets,\n      loading: false,\n      signs: window.signs,\n      activeTab: tabs.USERS,\n      instructions: window.instructions,\n      taskSets: window.taskSets\n    };\n  },\n\n  computed: {\n    techSettings() {\n      return this.config.filter(fieldSet => fieldSet.tab === tabs.TECH);\n    }\n\n  },\n  methods: {\n    updateConfig() {\n      _request__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/api/config/update', {\n        data: {\n          config: this.config,\n          availableDataSets: this.availableDataSets,\n          instructions: this.instructions\n        }\n      }).then(() => alert(this.signs.config_updated)).catch(error => alert(error));\n    },\n\n    switchTab(tab) {\n      this.activeTab = tab;\n      window.location.hash = `#tab=${tab}`;\n    },\n\n    getTabClass(tab) {\n      return this.activeTab === tab ? 'btn-primary' : 'btn-default';\n    }\n\n  },\n\n  created() {\n    const {\n      hash\n    } = window.location;\n\n    if (hash) {\n      this.activeTab = window.location.hash.split('=')[1];\n    } else {\n      this.activeTab = tabs.USERS;\n    } // this.$on('datasetsActiveState', state => this.setDataSetsStatus(state));\n    // this.$on('datasetsExportState', state => this.setDataSetsExportStatus(state));\n\n\n    this.$on('instructionsUpdate', value => {\n      this.instructions = value;\n    });\n  },\n\n  mounted() {\n    this.loading = false;\n  }\n\n});\n\n//# sourceURL=webpack:///./public/js/config.js?");

/***/ })

/******/ });