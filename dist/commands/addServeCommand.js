"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addServeCommand = addServeCommand;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _webpack = _interopRequireDefault(require("webpack"));

var _path = _interopRequireDefault(require("path"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _findUp = _interopRequireDefault(require("find-up"));

var _util = require("../util");

var _plugins = require("../plugins");

function addServeCommand(program) {
  program.command('serve').action(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(cmd) {
      var ip, publicPath, packConfig, projectRoot, devServer, liveConfig, compiler, server;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ip = (0, _util.getExternalIp)();
              console.log("External IP looks like: ".concat(ip));
              publicPath = "http://".concat(ip, ":", 8080, "/");
              _context.next = 5;
              return (0, _util.makeConfig)({
                output: {
                  publicPath: publicPath
                },
                mode: 'development',
                plugins: [new _plugins.RunCordovaPrepare()]
              });

            case 5:
              packConfig = _context.sent;
              (0, _webpack.default)(packConfig, _util.wpcb);
              _context.next = 9;
              return (0, _util.findRoot)();

            case 9:
              projectRoot = _context.sent;
              _context.next = 12;
              return (0, _findUp.default)('package.json', {
                cwd: __dirname
              });

            case 12:
              devServer = {
                contentBase: [_path.default.resolve(projectRoot, 'www'), _path.default.resolve(projectRoot, "platforms/ios/www")],
                publicPath: publicPath,
                host: ip,
                port: 8080,
                hot: true
              };
              _context.next = 15;
              return (0, _util.makeConfig)({
                output: {
                  publicPath: publicPath
                },
                mode: 'development',
                devServer: devServer,
                plugins: [new _webpack.default.HotModuleReplacementPlugin()]
              });

            case 15:
              liveConfig = _context.sent;
              compiler = (0, _webpack.default)(liveConfig);
              server = new _webpackDevServer.default(compiler, devServer);
              server.listen(8080, ip, function () {});

            case 19:
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