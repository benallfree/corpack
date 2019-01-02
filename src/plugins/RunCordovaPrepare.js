import { ex } from '../util'

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

export { RunCordovaPrepare }
