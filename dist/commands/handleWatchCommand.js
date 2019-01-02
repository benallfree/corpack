"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleWatchCommand = handleWatchCommand;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _webpack = _interopRequireDefault(require("webpack"));

var _util = require("../util");

var _plugins = require("../plugins");

function handleWatchCommand() {
  return _handleWatchCommand.apply(this, arguments);
}

function _handleWatchCommand() {
  _handleWatchCommand = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var config, compiler;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _util.makeConfig)({
              plugins: [new _plugins.RunCordovaPrepare()]
            });

          case 2:
            config = _context.sent;
            compiler = (0, _webpack.default)(config);
            console.log('Watching for changes');
            compiler.watch({}, _util.wpcb);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handleWatchCommand.apply(this, arguments);
}