const versions = {}
const url = {
    local: {
        package: '../../package.json'
    },
    server: {
        package: 'https://raw.githubusercontent.com/YoungDaggerDee/ToDoApp/master/package.json',
        version_log: 'https://raw.githubusercontent.com/YoungDaggerDee/ToDoApp/master/JSON/version_log.json',
    }
}
// LOAD BOTH VERSIONS
$.getJSON(url.local.package, data => {
    versions['local'] = versionToInt(data.version)
})
$.getJSON(url.server.package, data => {
    versions['server'] = versionToInt(data.version)
})
const versionToInt = e => parseInt(e[0] + e[2] + e[4])
const intToVersion = e => e[0] + '.' + e[1] + '.' + e[2]

if (versions['local'] - versions['server'] != 0) {
    versions['new'] = []
    $.getJSON(url.server.version_log, data => {
        for (index of data) {
            if (versions['local'] < versionToInt(index.version)) {
                versions['new'].push(index)
            }
        }
    })
} else {
    console.log('version up to date')
}
setTimeout(() => {
    if (versions['new'].length == 0) {
        $('#list').append('<h1 class="text-center mt-5"> Current version is up to date</h1>')
    }
    for (let index = 0; index < versions['new'].length; index++) {
        let i = versions['new'].length - index - 1
        $('#list').append((i == versions['new'].length - 1) ? `<li class="list-group-item"><h3>${versions['new'][i].version} <span class="badge badge-secondary">New</span></h3><p>${versions['new'][i].text}</p><p>${versions['new'][i].datetime}</p></li>` : `<li class="list-group-item"><h3>${versions['new'][i].version}</h3><p>${versions['new'][i].text}</p><p class=' text-grey>${versions['new'][i].datetime}</p></li>`)
    }

    $("#spinner").fadeOut('slow')
    $('#list').removeClass('d-none')
    $('#list').fadeIn('slow')
}, 2000)