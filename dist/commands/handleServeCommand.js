"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleServeCommand = handleServeCommand;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _webpack = _interopRequireDefault(require("webpack"));

var _path = _interopRequireDefault(require("path"));

var _util = require("../util");

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

function handleServeCommand(_x) {
  return _handleServeCommand.apply(this, arguments);
}

function _handleServeCommand() {
  _handleServeCommand = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(cmd) {
    var ip, config, compiler, server;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ip = (0, _util.getExternalIp)();
            console.log("External IP looks like: ".concat(ip));
            _context.next = 4;
            return (0, _util.makeConfig)({
              output: {
                publicPath: "http://".concat(ip, ":", 8080, "/")
              },
              devServer: {
                contentBase: [_path.default.join(__dirname, 'www'), _path.default.join(__dirname, "platforms/".concat(cmd.ios ? 'ios' : 'android', "/www"))],
                host: ip,
                port: 8080,
                hot: true
              },
              plugins: [new _webpack.default.HotModuleReplacementPlugin()]
            });

          case 4:
            config = _context.sent;
            compiler = (0, _webpack.default)(config);
            server = new _webpackDevServer.default(compiler);
            server.listen(8080, ip, function () {});

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handleServeCommand.apply(this, arguments);
}