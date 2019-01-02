import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import _ from 'lodash'
import findUp from 'find-up'
import ExtraWatchWebpackPlugin from 'extra-watch-webpack-plugin'
import { findRoot } from '.'

async function makeConfig(cfg = {}) {
  const projectRoot = await findRoot()
  const corpackRoot = path.dirname(
    await findUp('package.json', { cwd: __dirname }),
  )

  const config = _.mergeWith(
    {
      target: 'web',
      output: {
        path: path.resolve(projectRoot, 'www'),
        filename: 'app.js',
        publicPath: 'tester/',
      },
      resolve: {
        modules: [path.resolve(corpackRoot, 'node_modules')],
      },
      resolveLoader: {
        modules: [path.resolve(corpackRoot, 'node_modules')],
      },
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              'style-loader', // creates style nodes from JS strings
              'css-loader', // translates CSS into CommonJS
              'sass-loader', // compiles Sass to CSS, using Node Sass by default
            ],
          },
          {
            test: /\.(png|jpg|gif|mp3)$/,
            use: [
              {
                loader: 'file-loader',
                options: {},
              },
            ],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  require('@babel/preset-env'),
                  require('@babel/preset-react'),
                ],
                plugins: [
                  require('@babel/plugin-transform-runtime'),
                  require('@babel/plugin-proposal-export-namespace-from'),
                  require('@babel/plugin-proposal-export-default-from'),
                  require('@babel/plugin-transform-react-jsx'),
                  [
                    require('@babel/plugin-proposal-decorators'),
                    {
                      decoratorsBeforeExport: false,
                    },
                  ],
                  [
                    require('@babel/plugin-proposal-class-properties'),
                    {
                      loose: true,
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(projectRoot, 'src/index.html'),
        }),
        new ExtraWatchWebpackPlugin({
          dirs: [path.resolve(projectRoot, 'src')],
        }),
      ],
    },
    cfg,
    (objValue, srcValue) => {
      if (_.isArray(objValue)) {
        return objValue.concat(srcValue)
      }
    },
  )
  config.plugins.push(
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(config.mode || 'production'),
    }),
  )
  return config
}

export { makeConfig }
