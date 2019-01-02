import webpack from 'webpack'
import { makeConfig, wpcb } from '../util'
import { RunCordovaPrepare } from '../plugins'

function addWatchCommand(program) {
  program.command('watch').action(async cmd => {
    const config = await makeConfig({
      plugins: [new RunCordovaPrepare()],
    })
    const compiler = webpack(config)
    console.log('Watching for changes')
    compiler.watch({}, wpcb)
  })
}

export { addWatchCommand }
