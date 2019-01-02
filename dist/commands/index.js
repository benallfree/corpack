"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addInitCommand = require("./addInitCommand");

Object.keys(_addInitCommand).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _addInitCommand[key];
    }
  });
});

var _addWatchCommand = require("./addWatchCommand");

Object.keys(_addWatchCommand).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _addWatchCommand[key];
    }
  });
});

var _addServeCommand = require("./addServeCommand");

Object.keys(_addServeCommand).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _addServeCommand[key];
    }
  });
});

var _addPackCommand = require("./addPackCommand");

Object.keys(_addPackCommand).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _addPackCommand[key];
    }
  });
});