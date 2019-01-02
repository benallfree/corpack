#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _commander = _interopRequireDefault(require("commander"));

var _commands = require("./commands");

(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _commands.addInitCommand)(_commander.default);
          (0, _commands.addPackCommand)(_commander.default);
          (0, _commands.addWatchCommand)(_commander.default);
          (0, _commands.addServeCommand)(_commander.default);

          _commander.default.parse(process.argv);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}))();