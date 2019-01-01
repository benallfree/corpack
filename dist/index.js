#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _commander = _interopRequireDefault(require("commander"));

var _findUp = _interopRequireDefault(require("find-up"));

var _path = _interopRequireDefault(require("path"));

var _child_process = require("child_process");

var _fs = _interopRequireDefault(require("fs"));

var _os = _interopRequireDefault(require("os"));

var _webpack = _interopRequireDefault(require("webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee2() {
  var rootConfig, ROOT, RunCordovaPrepare, makeConfig, externalIp, ifaces, dev, iface;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          makeConfig = function _ref4(cfg) {
            var mode = cfg.mode,
                dst = cfg.dst;
            return {
              target: 'web',
              entry: './src/index.js',
              output: {
                path: dst,
                filename: 'app.js'
              },
              mode: mode,
              module: {
                rules: [{
                  test: /\.scss$/,
                  use: ['style-loader', // creates style nodes from JS strings
                  'css-loader', // translates CSS into CommonJS
                  'sass-loader']
                }, {
                  test: /\.(png|jpg|gif|mp3)$/,
                  use: [{
                    loader: 'file-loader',
                    options: {}
                  }]
                }, {
                  test: /\.(js|jsx)$/,
                  exclude: /node_modules/,
                  use: {
                    loader: 'babel-loader'
                  }
                }]
              },
              plugins: [new _htmlWebpackPlugin.default({
                template: _path.default.join(__dirname, '../assets/index.html'),
                templateParameters: {
                  host: cfg.devServerHost || ''
                }
              }), new _webpack.default.DefinePlugin({
                NODE_ENV: JSON.stringify(mode)
              })]
            };
          };

          _context2.next = 3;
          return (0, _findUp.default)('config.xml');

        case 3:
          rootConfig = _context2.sent;

          if (rootConfig) {
            _context2.next = 6;
            break;
          }

          throw new Error('corpack must be run from inside a Cordova application root.');

        case 6:
          ROOT = _path.default.dirname(rootConfig);
          console.log("Cordova root is ".concat(ROOT));

          RunCordovaPrepare =
          /*#__PURE__*/
          function () {
            function RunCordovaPrepare() {
              (0, _classCallCheck2.default)(this, RunCordovaPrepare);
            }

            (0, _createClass2.default)(RunCordovaPrepare, [{
              key: "apply",
              value: function apply(compiler) {
                compiler.hooks.afterEmit.tapAsync('RunCordovaPrepare', function (compilation, callback) {
                  console.log("Running 'cordova prepare'");
                  (0, _child_process.exec)('cordova prepare', {
                    cwd: ROOT
                  }, function (err, stdout, stderr) {
                    if (err) {
                      console.log(err);
                    }

                    console.log(stdout);
                    callback();
                  });
                });
              }
            }]);
            return RunCordovaPrepare;
          }();

          externalIp = null;
          ifaces = _os.default.networkInterfaces();

          for (dev in ifaces) {
            iface = ifaces[dev].filter(function (details) {
              return details.family === 'IPv4' && details.internal === false;
            });
            if (iface.length > 0) externalIp = iface[0].address;
          }

          console.log("External IP looks like: ".concat(externalIp));

          _commander.default.option('-h, --host [host]', 'Host [0.0.0.0]', null).option('-p, --port [port]', 'Port [4000]', '4000').option('-w, --watch [watch]', 'Watch for changes and build').option('-s, --serve [serve]', 'Start development server and watch for changes').option('--src [src]', 'Source folder to watch (relative path) [./src]', './src').option('-o, --out [out]', 'Output path (relative) [./www]', './www').option('--release', 'Production release').option('--ios [ios]', 'Use iOS platform for dev server [true]', true).option('--android [android]', 'Use Android platform for dev server [false]', false).action(
          /*#__PURE__*/
          function () {
            var _ref2 = (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee(cmd) {
              var host, port, src, dst, mode, platform, wpcb, config, _config, _compiler, ip, _ifaces, _dev, _iface, devServer, _config2, compiler, server;

              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      wpcb = function _ref3(err, stats) {
                        if (err || stats.hasErrors()) {
                          if (err) {
                            console.log(err);
                          } else {
                            for (var i = 0; i < stats.compilation.errors.length; i++) {
                              var error = stats.compilation.errors[i];
                              console.log(error);
                            }
                          }
                        } else {
                          console.log('Finished building');
                        }
                      };

                      host = cmd.host || '0.0.0.0';
                      port = cmd.port;
                      src = _path.default.join(ROOT, cmd.src);
                      dst = _path.default.join(ROOT, cmd.out);
                      mode = cmd.release ? 'production' : 'development';
                      platform = cmd.platform;

                      if (!cmd.watch && !cmd.serve) {
                        config = makeConfig({
                          mode: mode,
                          dst: dst
                        });
                        config.plugins.push(new RunCordovaPrepare());
                        (0, _webpack.default)(config, wpcb);
                      }

                      if (cmd.watch) {
                        _config = makeConfig({
                          mode: mode,
                          dst: dst
                        });

                        _config.plugins.push(new RunCordovaPrepare());

                        _compiler = (0, _webpack.default)(_config);
                        console.log('Watching for changes');

                        _compiler.watch({}, wpcb);
                      }

                      if (cmd.serve) {
                        ip = null;
                        _ifaces = _os.default.networkInterfaces();

                        for (_dev in _ifaces) {
                          _iface = _ifaces[_dev].filter(function (details) {
                            return details.family === 'IPv4' && details.internal === false;
                          });
                          if (_iface.length > 0) ip = _iface[0].address;
                        }

                        devServer = {
                          contentBase: [_path.default.join(__dirname, 'www'), _path.default.join(__dirname, "platforms/".concat(cmd.ios ? 'ios' : 'android', "/www"))],
                          host: ip,
                          port: 8080,
                          hot: true
                        };
                        _config2 = makeConfig({
                          mode: mode,
                          dst: dst,
                          devServerHost: "http://".concat(devServer.host, ":").concat(devServer.port, "/")
                        });
                        _config2.devServer = devServer;

                        _config2.plugins.push(new _webpack.default.HotModuleReplacementPlugin());

                        compiler = (0, _webpack.default)(_config2);
                        server = new _webpackDevServer.default(compiler, devServer);
                        server.listen(devServer.port, devServer.host, function () {});
                      }

                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }());

          _commander.default.parse(process.argv);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}))();
