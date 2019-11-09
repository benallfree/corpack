import { ex } from '../util'

class RunCordovaPrepare {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('RunCordovaPrepare', async compilation => {
      setTimeout(() => ex('cordova prepare'), 1000)
    })
  }
}

export { RunCordovaPrepare }
