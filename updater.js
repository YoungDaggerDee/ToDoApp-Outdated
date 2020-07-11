const fs = require('fs')
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let config = fs.readFileSync('package.json')
let log = fs.readFileSync('version_log.json')
let log_json = JSON.parse(log)
let json = JSON.parse(config)
console.log('Old version ->' + json.version)
const version = json.version.split('.')

// CHECK FOR NEW GEN
if (version[2] == '9' || version[1] == '9') {
    if (version[2] == '9') {
        let tmpIndex = parseInt(version[1]) + 1
        version[2] = '0'
        version[1] = tmpIndex + ''
    }
    if (version[1] == '9') {
        let tmpIndex = parseInt(version[0]) + 1
        version[1] = '0'
        version[0] = tmpIndex + ''
    }
} else {
    let tmp = parseInt(version[2]) + 1
    version[2] = tmp
}
const tmp = parseInt(version[2]) + 1
const new_version = version[0] + '.' + version[1] + '.' + version[2]
json.version = new_version

console.log("New version -> " + new_version)
fs.writeFileSync("package.json", JSON.stringify(json, null, 4))

// USER INPUT
let global_update
const date = new Date()
const datetime = date.getHours() + ":" + date.getMinutes() + " | " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
rl.question("news:  ", function (text) {
    let update = {}
    update['version'] = new_version
    update['text'] = text
    update['datetime'] = datetime
    console.log(update['datetime'])
    log_json.push(update)
    global_update = update
    fs.writeFileSync("version_log.json", JSON.stringify(log_json))
    rl.close()
})

rl.on("close", function () {
    console.log("New version -> " + new_version)
    console.log(global_update)
    process.exit(0)
})