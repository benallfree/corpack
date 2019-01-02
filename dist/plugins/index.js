"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RunCordovaPrepare = require("./RunCordovaPrepare");

Object.keys(_RunCordovaPrepare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RunCordovaPrepare[key];
    }
  });
});

var _InsertCordovaScript = require("./InsertCordovaScript");

Object.keys(_InsertCordovaScript).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _InsertCordovaScript[key];
    }
  });
});