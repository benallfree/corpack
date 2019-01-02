import webpack from 'webpack'
import path from 'path'
import { ex, makeConfig, wpcb } from '../util'
import { RunCordovaPrepare } from '../plugins'

function addInitCommand(program) {
  program.command('init').action(async cmd => {
    const assetRoot = path.join(__dirname, '../../assets')

    await ex('rm -rf ./www/*')
    await ex('mkdir -p ./src')
    await ex('rm -rf ./src/*')
    await ex(`cp -r ${assetRoot}/* ./src`)
    const config = await makeConfig({
      plugins: [new RunCordovaPrepare()],
    })
    webpack(config, wpcb)
  })
}

export { addInitCommand }
