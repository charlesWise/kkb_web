const fs = require('fs')
const data = fs.readFileSync('../note.md')
console.log(data.toString())