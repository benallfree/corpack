import webpack from 'webpack'
import { makeConfig, wpcb } from '../util'
import { RunCordovaPrepare } from '../plugins'

function addPackCommand(program) {
  program
    .command('pack')

    .action(async cmd => {
      console.log('Packing...')
      const config = await makeConfig({
        plugins: [new RunCordovaPrepare()],
      })
      webpack(config, wpcb)
    })
}

export { addPackCommand }
