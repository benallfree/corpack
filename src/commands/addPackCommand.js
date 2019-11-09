import webpack from 'webpack'
import { makeConfig, wpcb } from '../util'

function addPackCommand(program) {
  program
    .command('pack')

    .action(async cmd => {
      console.log('Packing...')
      const config = await makeConfig()
      webpack(config, wpcb)
    })
}

export { addPackCommand }
