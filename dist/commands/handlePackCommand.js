"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePackCommand = handlePackCommand;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _webpack = _interopRequireDefault(require("webpack"));

var _util = require("../util");

var _plugins = require("../plugins");

function handlePackCommand(_x) {
  return _handlePackCommand.apply(this, arguments);
}

function _handlePackCommand() {
  _handlePackCommand = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(cmd) {
    var config;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Packing...');
            _context.next = 3;
            return (0, _util.makeConfig)({
              plugins: [new _plugins.RunCordovaPrepare()]
            });

          case 3:
            config = _context.sent;
            (0, _webpack.default)(config, _util.wpcb);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handlePackCommand.apply(this, arguments);
}