"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ex = ex;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _child_process = require("child_process");

function ex(_x, _x2) {
  return _ex.apply(this, arguments);
}

function _ex() {
  _ex = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(cmd, cwd) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              console.log("Running ".concat(cmd));
              (0, _child_process.exec)(cmd, {
                cwd: cwd
              }, function (err, stdout, stderr) {
                if (err) {
                  reject(err);
                }

                resolve(stdout);
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _ex.apply(this, arguments);
}