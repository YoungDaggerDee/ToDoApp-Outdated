const fs = require('fs')
const log = fs.readFileSync('version_log.json')
const log_json = JSON.parse(log)
if (log_json.length == 0) {
    console.log('No updates were found!')
    return
}
for (s in log_json) {
    console.log(log_json[s])
    console.log()
}
console.log('-----------------------')