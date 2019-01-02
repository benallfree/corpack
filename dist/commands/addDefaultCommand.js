"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDefaultCommand = addDefaultCommand;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _handleWatchCommand = require("./handleWatchCommand");

var _handlePackCommand = require("./handlePackCommand");

var _handleServeCommand = require("./handleServeCommand");

function addDefaultCommand(program) {
  program.option('-h, --host <host>', 'Host [0.0.0.0]', null).option('-p, --port <port>', 'Port [4000]', '4000').option('-w, --watch ', 'Watch for changes and build').option('-s, --serve ', 'Start development server and watch for changes').option('--src <src>', 'Source folder to watch (relative path) [./src]', './src').option('-o, --out <out>', 'Output path (relative) [./www]', './www').option('--release', 'Production release').option('--ios', 'Use iOS platform for dev server [true]', true).option('--android [android]', 'Use Android platform for dev server [false]', false).action(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(cmd) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('default', cmd.watch, cmd.serve);

              if (!(!cmd.watch && !cmd.serve)) {
                _context.next = 5;
                break;
              }

              console.log('packing');
              _context.next = 5;
              return (0, _handlePackCommand.handlePackCommand)(cmd);

            case 5:
              if (!cmd.watch) {
                _context.next = 8;
                break;
              }

              _context.next = 8;
              return (0, _handleWatchCommand.handleWatchCommand)(cmd);

            case 8:
              if (!cmd.serve) {
                _context.next = 11;
                break;
              }

              _context.next = 11;
              return (0, _handleServeCommand.handleServeCommand)(cmd);

            case 11:
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