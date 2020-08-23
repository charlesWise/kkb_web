const os = require('os')
const mem = os.freemem() / os.totalmem()
console.log(`内存占用率${mem}`)