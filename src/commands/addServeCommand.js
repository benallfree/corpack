import webpack from 'webpack'
import path from 'path'
import { makeConfig, getExternalIp } from '../util'
import WebpackDevServer from 'webpack-dev-server'

function addServeCommand(program) {
  program
    .command('serve')
    .option('--ios', 'Use iOS platform for dev server [true]', true)
    .option('--android', 'Use Android platform for dev server [false]', false)
    .action(async cmd => {
      const ip = getExternalIp()
      console.log(`External IP looks like: ${ip}`)

      const config = await makeConfig({
        output: {
          publicPath: `http://${ip}:${8080}/`,
        },
        mode: 'development',
        devServer: {
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
        },
        plugins: [new webpack.HotModuleReplacementPlugin()],
      })

      var compiler = webpack(config)
      var server = new WebpackDevServer(compiler)
      server.listen(8080, ip, () => {})
    })
}

export { addServeCommand }
