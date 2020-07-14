let settings
$.getJSON('../Settings.json', data => {
    settings = data
})



const setMode = e => {
    settings["dark_mode"] = e.checked
    saveSettings ``
}

const setFirst = e => {
    settings['from'] = e.checked
    saveSettings ``

}