"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addInitCommand = addInitCommand;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _webpack = _interopRequireDefault(require("webpack"));

var _path = _interopRequireDefault(require("path"));

var _util = require("../util");

var _plugins = require("../plugins");

function addInitCommand(program) {
  program.command('init').action(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(cmd) {
      var assetRoot, config;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              assetRoot = _path.default.join(__dirname, '../../assets');
              _context.next = 3;
              return (0, _util.ex)('rm -rf ./www/*');

            case 3:
              _context.next = 5;
              return (0, _util.ex)('mkdir -p ./src');

            case 5:
              _context.next = 7;
              return (0, _util.ex)('rm -rf ./src/*');

            case 7:
              _context.next = 9;
              return (0, _util.ex)("cp -r ".concat(assetRoot, "/* ./src"));

            case 9:
              _context.next = 11;
              return (0, _util.makeConfig)({
                plugins: [new _plugins.RunCordovaPrepare()]
              });

            case 11:
              config = _context.sent;
              (0, _webpack.default)(config, _util.wpcb);

            case 13:
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