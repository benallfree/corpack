#!/usr/bin/env node
import program from 'commander'
import findUp from 'find-up'
import path from 'path'
import { exec } from 'child_process'
import os from 'os'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackDevServer from 'webpack-dev-server'
;(async function() {
  const rootConfig = await findUp('config.xml')
  if (!rootConfig) {
    throw new Error(
      'corpack must be run from inside a Cordova application root.',
    )
  }
  const ROOT = path.dirname(rootConfig)
  console.log(`Cordova root is ${ROOT}`)

  async function ex(cmd) {
    return new Promise((resolve, reject) => {
      console.log(`Running ${cmd}`)
      exec(cmd, { cwd: ROOT }, function(err, stdout, stderr) {
        if (err) {
          reject(err)
        }
        resolve(stdout)
      })
    })
  }

  class RunCordovaPrepare {
    apply(compiler) {
      compiler.hooks.afterEmit.tapAsync(
        'RunCordovaPrepare',
        async (compilation, callback) => {
          await ex('cordova prepare')
          callback()
        },
      )
    }
  }

  console.log(path.resolve(__dirname, '../node_modules'))

  function makeConfig(cfg) {
    const { mode, dst } = cfg
    return {
      target: 'web',
      entry: './src/index.js',
      output: {
        path: dst,
        filename: 'app.js',
      },
      mode,
      resolve: {
        modules: [path.resolve(__dirname, '../node_modules')],
      },
      resolveLoader: {
        modules: [path.resolve(__dirname, '../node_modules')],
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
          template: './src/index.html',
          templateParameters: {
            host: cfg.devServerHost || '',
          },
        }),
        new webpack.DefinePlugin({
          NODE_ENV: JSON.stringify(mode),
        }),
      ],
    }
  }

  let externalIp = null
  let ifaces = os.networkInterfaces()
  for (let dev in ifaces) {
    const iface = ifaces[dev].filter(function(details) {
      return details.family === 'IPv4' && details.internal === false
    })
    if (iface.length > 0) externalIp = iface[0].address
  }
  console.log(`External IP looks like: ${externalIp}`)

  const assetRoot = path.join(__dirname, '../assets')

  function wpcb(err, stats) {
    if (err || stats.hasErrors()) {
      if (err) {
        console.log(err)
      } else {
        for (let i = 0; i < stats.compilation.errors.length; i++) {
          const error = stats.compilation.errors[i]
          console.log(error)
        }
      }
    } else {
      console.log('Finished building')
    }
  }

  program.command('init').action(async cmd => {
    await ex('rm -rf ./www/*')
    await ex('mkdir -p ./src')
    await ex('rm -rf ./src/*')
    await ex(`cp -r ${assetRoot}/* ./src`)
    // await ex(`cordova platform add ios`)
    const dst = path.join(ROOT, 'www')
    const mode = 'development'
    const config = makeConfig({ mode, dst })
    config.plugins.push(new RunCordovaPrepare())
    webpack(config, wpcb)
  })

  program
    .option('-h, --host [host]', 'Host [0.0.0.0]', null)
    .option('-p, --port [port]', 'Port [4000]', '4000')
    .option('-w, --watch [watch]', 'Watch for changes and build')
    .option(
      '-s, --serve [serve]',
      'Start development server and watch for changes',
    )
    .option(
      '--src [src]',
      'Source folder to watch (relative path) [./src]',
      './src',
    )
    .option('-o, --out [out]', 'Output path (relative) [./www]', './www')
    .option('--release', 'Production release')
    .option('--ios [ios]', 'Use iOS platform for dev server [true]', true)
    .option(
      '--android [android]',
      'Use Android platform for dev server [false]',
      false,
    )
    .action(async cmd => {
      const host = cmd.host || '0.0.0.0'
      const port = cmd.port
      const src = path.join(ROOT, cmd.src)
      const dst = path.join(ROOT, cmd.out)
      const mode = cmd.release ? 'production' : 'development'
      const platform = cmd.platform

      if (!cmd.watch && !cmd.serve) {
        const config = makeConfig({ mode, dst })
        config.plugins.push(new RunCordovaPrepare())
        webpack(config, wpcb)
      }
      if (cmd.watch) {
        const config = makeConfig({ mode, dst })
        config.plugins.push(new RunCordovaPrepare())
        const compiler = webpack(config)
        console.log('Watching for changes')
        compiler.watch({}, wpcb)
      }
      if (cmd.serve) {
        let ip = null
        let ifaces = os.networkInterfaces()
        for (let dev in ifaces) {
          const iface = ifaces[dev].filter(function(details) {
            return details.family === 'IPv4' && details.internal === false
          })
          if (iface.length > 0) ip = iface[0].address
        }

        const devServer = {
          contentBase: [
            path.join(__dirname, 'www'),
            path.join(
              __dirname,
              `platforms/${cmd.ios ? 'ios' : 'android'}/www`,
            ),
          ],
          host: ip,
          port: 8080,
          hot: true,
        }

        const config = makeConfig({
          mode,
          dst,
          devServerHost: `http://${devServer.host}:${devServer.port}/`,
        })
        config.devServer = devServer

        config.plugins.push(new webpack.HotModuleReplacementPlugin())

        var compiler = webpack(config)
        var server = new WebpackDevServer(compiler, devServer)
        server.listen(devServer.port, devServer.host, () => {})
      }
    })
  program.parse(process.argv)
})()
