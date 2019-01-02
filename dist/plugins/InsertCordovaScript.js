"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InsertCordovaScript = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var InsertCordovaScript =
/*#__PURE__*/
function () {
  function InsertCordovaScript() {
    (0, _classCallCheck2.default)(this, InsertCordovaScript);
  }

  (0, _createClass2.default)(InsertCordovaScript, [{
    key: "apply",
    value: function apply(compiler) {
      compiler.hooks.compilation.tap('InsertCordovaScript', function (compilation) {
        compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('InsertCordovaScript', function (htmlPluginData, callback) {
          var addAsset = function addAsset(assetPath) {
            var promise;

            try {
              promise = htmlPluginData.plugin.addFileToAssets(assetPath, compilation);
              return promise;
            } catch (err) {
              return Promise.reject(err);
            }
          };

          addAsset('cordova.js');
          callback();
        });
      });
    }
  }]);
  return InsertCordovaScript;
}();

exports.InsertCordovaScript = InsertCordovaScript;