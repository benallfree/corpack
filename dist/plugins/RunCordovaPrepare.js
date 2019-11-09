"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RunCordovaPrepare = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _util = require("../util");

var RunCordovaPrepare =
/*#__PURE__*/
function () {
  function RunCordovaPrepare() {
    (0, _classCallCheck2.default)(this, RunCordovaPrepare);
  }

  (0, _createClass2.default)(RunCordovaPrepare, [{
    key: "apply",
    value: function apply(compiler) {
      compiler.hooks.afterEmit.tap('RunCordovaPrepare',
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(compilation) {
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  setTimeout(function () {
                    return (0, _util.ex)('cordova prepare');
                  }, 1000);

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return RunCordovaPrepare;
}();

exports.RunCordovaPrepare = RunCordovaPrepare;