import { exec } from 'child_process'

async function ex(cmd, cwd) {
  return new Promise((resolve, reject) => {
    console.log(`Running ${cmd}`)
    exec(cmd, { cwd }, function(err, stdout, stderr) {
      if (err) {
        reject(err)
      }
      resolve(stdout)
    })
  })
}
export { ex }
