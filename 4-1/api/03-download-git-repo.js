const download = require('download-git-repo')
const ora = require('ora')
const process = ora(`🔥🔥🔥...`)
process.start()
download('github:su37josephxia/vue-template', './test', err => {
  if (err) {
    process.fail()
  } else {
    process.succeed()
  }
})