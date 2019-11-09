"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeConfig = makeConfig;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _lodash = _interopRequireDefault(require("lodash"));

var _findUp = _interopRequireDefault(require("find-up"));

var _extraWatchWebpackPlugin = _interopRequireDefault(require("extra-watch-webpack-plugin"));

var _plugins = require("../plugins");

var _2 = require(".");

function makeConfig() {
  return _makeConfig.apply(this, arguments);
}

function _makeConfig() {
  _makeConfig = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var cfg,
        projectRoot,
        corpackRoot,
        config,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cfg = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            _context.next = 3;
            return (0, _2.findRoot)();

          case 3:
            projectRoot = _context.sent;
            _context.t0 = _path.default;
            _context.next = 7;
            return (0, _findUp.default)('package.json', {
              cwd: __dirname
            });

          case 7:
            _context.t1 = _context.sent;
            corpackRoot = _context.t0.dirname.call(_context.t0, _context.t1);
            config = _lodash.default.mergeWith({
              target: 'web',
              output: {
                path: _path.default.resolve(projectRoot, 'www'),
                filename: 'app.js'
              },
              resolve: {
                modules: [_path.default.resolve(projectRoot, 'node_modules')]
              },
              resolveLoader: {
                modules: [_path.default.resolve(corpackRoot, 'node_modules')]
              },
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
                    loader: 'babel-loader',
                    options: {
                      presets: [require('@babel/preset-env'), require('@babel/preset-react')],
                      plugins: [require('@babel/plugin-transform-runtime'), require('@babel/plugin-proposal-export-namespace-from'), require('@babel/plugin-proposal-export-default-from'), require('@babel/plugin-transform-react-jsx'), [require('@babel/plugin-proposal-decorators'), {
                        decoratorsBeforeExport: false
                      }], [require('@babel/plugin-proposal-class-properties'), {
                        loose: true
                      }]]
                    }
                  }
                }]
              },
              plugins: [new _htmlWebpackPlugin.default({
                template: _path.default.resolve(projectRoot, 'src/index.html')
              }), new _extraWatchWebpackPlugin.default({
                dirs: [_path.default.resolve(projectRoot, 'src')]
              }), new _plugins.RunCordovaPrepare()]
            }, cfg, function (objValue, srcValue) {
              if (_lodash.default.isArray(objValue)) {
                return objValue.concat(srcValue);
              }
            });
            config.plugins.push(new _webpack.default.DefinePlugin({
              NODE_ENV: JSON.stringify(config.mode || 'production')
            }));
            return _context.abrupt("return", config);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _makeConfig.apply(this, arguments);
}