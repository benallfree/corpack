import webpack from 'webpack'
import path from 'path'
import WebpackDevServer from 'webpack-dev-server'
import findUp from 'find-up'

import { makeConfig, getExternalIp, wpcb, findRoot } from '../util'
import { RunCordovaPrepare } from '../plugins'

function addServeCommand(program) {
  program.command('serve').action(async cmd => {
    const ip = getExternalIp()
    console.log(`External IP looks like: ${ip}`)
    const publicPath = `http://${ip}:${8080}/`
    const packConfig = await makeConfig({
      output: {
        publicPath,
      },
      mode: 'development',
      plugins: [new RunCordovaPrepare()],
    })
    webpack(packConfig, wpcb)

    const projectRoot = await findRoot()
    await findUp('package.json', { cwd: __dirname })

    const devServer = {
      contentBase: [
        path.resolve(projectRoot, 'www'),
        path.resolve(projectRoot, `platforms/ios/www`),
      ],
      publicPath,
      host: ip,
      port: 8080,
      hot: true,
    }

    const liveConfig = await makeConfig({
      output: {
        publicPath,
      },
      mode: 'development',
      devServer,
      plugins: [new webpack.HotModuleReplacementPlugin()],
    })
    var compiler = webpack(liveConfig)
    var server = new WebpackDevServer(compiler, devServer)
    server.listen(8080, ip, () => {})
  })
}

export { addServeCommand }
