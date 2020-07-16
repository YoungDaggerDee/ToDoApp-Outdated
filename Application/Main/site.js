const timerStart = Date.now()
const settings_path = '../../JSON/settings.json'
let dev_mode = direction = false
const tasks = []
let local_version
let marin
let priority = 0
const body = document.querySelector('body')
const elements = {
    ul: document.querySelector('.list-group'),
    input: document.querySelector('#input')
}
// LOAD VERSION && CHECK IF ITS UP TO DATE
$.getJSON('../../package.json', local_data => {
    local_version = local_data.version
})
$.getJSON('https://raw.githubusercontent.com/YoungDaggerDee/ToDoApp/master/package.json',
    data => {
        let tmp_local = versionInt(local_version)
        let tmp_server = versionInt(data.version)
        console.log(tmp_server, tmp_local)
        if (tmp_server - tmp_local != 0) {
            $('#updates-count').html(tmp_server - tmp_local)
            $('#updates-count').removeClass('d-none')
        } else {
            $('#updates-count').addClass('d-none')
        }
    })
// MAKE INT FROM VERSION
const versionInt = e => {
    return parseInt(e[0] + e[2] + e[4])
}
// LOAD SETTINGS
$.getJSON(settings_path, data => {
    fillList(data.from)
    mode(!data.dark_mode)
})
// DEVELOPMENT MODE
$.getJSON('../../package.json', data => {

    if (data.mode.toLowerCase() == 'development') {
        margin = 3
        $('#app-header').html(`${data.version} - DEV`)
        $('#devtoggle').removeClass('d-none')
        $("#loadtime").removeClass('d-none')
        $('#copyright').addClass('d-none')
        $('#github').removeClass('d-none')
    }
    if (data.mode.toLowerCase() == 'production') {
        margin = 4
        $('#footer-text').css('display', 'none')
        $('#devtoggle').addClass('d-none')
        $('#github').addClass('d-none')
        $("#loadtime").addClass('d-none')
        updateSize ``
    }
})
// TASK CLASS
class Task {
    constructor(text, priority) {
        this.text = text
        this.priority = priority
        this.favorite = false
        this.done = false
    }
}
// MARK OR UNMARK: AS DONE
function setActive(e) {
    if (e.classList.contains('t')) {
        e.innerHTML = `<del class="text-muted">${tasks[e.id].text}</del>`
        tasks[e.id].done = true
        e.classList.remove('t')
    } else {
        e.classList.add('t')
        tasks[e.id].done = false
        e.innerHTML = tasks[e.id].text
    }
}
// SET PRIORITY
const setPriority = e => {
    priority = e
}
// ADD TASK
function Add() {
    if (tasks.includes(input.value) || input.value.length <= 0) {
        alert('Invalid Task!')
        return
    } else {
        if (input.value.includes('#1')) {
            let tmp = input.value.replace('#1', '')
            tasks.push(new Task(tmp.trim(), 0))
        } else if (input.value.includes('#2')) {
            let tmp = input.value.replace('#2', '')
            tasks.push(new Task(tmp.trim(), 1))
        } else if (input.value.includes('#3')) {
            let tmp = input.value.replace('#3', '')
            tasks.push(new Task(tmp.trim(), 2))
        } else if (priority != 0) {
            tasks.push(new Task(input.value, priority))
        } else {
            tasks.push(new Task(input.value, 0))
        }
        fillList('none', 'none')
        updateSize ``
        input.value = ''
    }
}
// REMOVE TASK
const removeTask = e => {
    console.log('double click')
    let id = e.id
    console.log(id)
    tasks.splice(id, 1)
    fillList('none', 'none')
    updateSize ``
}

// FILL 
function fillList(switcher, e) {
    elements.ul.innerHTML = ''
    if (switcher == 'none') {} else if (switcher == false) {
        direction = false
    } else if (switcher) {
        direction = true
    }
    for (let i = 0; i < tasks.length; i++) {
        if (direction) {
            switch (tasks[i].priority) {
                case 0:
                    color = "text-dark"
                    break
                case 1:
                    color = "text-primary"
                    break
                case 2:
                    color = "text-danger"
                    break
            }
            if (body.style.backgroundColor == 'black') {
                if (color == 'text-dark') {
                    color = 'text-light'
                }
                if (tasks[i].done) {
                    elements.ul.innerHTML += `<li class="list-group-item bg-dark well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${i}'><del class="text-muted">${tasks[i].text}</del></li>`
                } else {
                    elements.ul.innerHTML += `<li class="list-group-item bg-dark well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${i}'>${tasks[i].text}</li>`
                }
            } else {
                if (tasks[i].done) {
                    elements.ul.innerHTML += `<li class="list-group-item bg-white well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${i}'><del class="text-muted">${tasks[i].text}</del></li>`
                } else {
                    elements.ul.innerHTML += `<li class="list-group-item bg-white well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${i}'>${tasks[i].text}</li>`
                }
            }
        } else {
            let tmpInt = tasks.length - i - 1
            switch (tasks[tmpInt].priority) {
                case 0:
                    color = "text-dark"
                    break
                case 1:
                    color = "text-primary"
                    break
                case 2:
                    color = "text-danger"
                    break
            }
            if (body.style.backgroundColor == 'black') {
                if (color == 'text-dark') {
                    color = 'text-light'
                }
                if (tasks[tmpInt].done) {
                    elements.ul.innerHTML += `<li class="list-group-item bg-dark well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${tmpInt}'><del class="text-muted">${tasks[tmpInt].text}</del></li>`
                } else {
                    elements.ul.innerHTML += `<li class="list-group-item bg-dark well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${tmpInt}'>${tasks[tmpInt].text}</li>`
                }
            } else {
                if (tasks[tmpInt].done) {
                    elements.ul.innerHTML += `<li class="list-group-item bg-white well margin t ${color}" onclick='setActive(this)' ondblclick="removeTask(this)" id='${tmpInt}'><del class="text-muted">${tasks[tmpInt].text}</del></li>`
                } else {
                    elements.ul.innerHTML += `<li class="list-group-item bg-white well margin t ${color}" onclick='setActive(this)' ondblclick="removeTask(this)" id='${tmpInt}'>${tasks[tmpInt].text}</li>`
                }
            }
        }
    }
}



const clearList = () => {
    tasks.length = 0
    fillList('none', 'none')
}

const backgroundControl = () => {
    if ($('body').css("background-color") == "transparent") {
        $('body').css('background-color', 'white')
    } else {
        $('body').css('background-color', 'transparent')
    }
}

// ADD ON ENTER
elements.input.onkeyup = e => {
    if (e.keyCode == 13)
        Add()
}

// VERSION STUFF
$.getJSON("../../JSON/version_log.json", json => {
    $('#version_log').html('')
    if (json == '[]') {
        console.error('ERROR WITH LOADING VERSION_LOG! VERSION LOG IS EMPTY')
        $('#version_log').html('Version log is empty, please check console')
    }
    for (s of json) {
        $('#version_log').append((s.text == json[json.length - 1].text) ? `<h3>${s.version}   <span class ="badge badge-secondary"> New </span></h3><p>${s.text}</p><p class='text-right text-secondary '>${s.datetime}</p>` : `<h3>${s.version}</h3><p>${s.text}</p><p class='text-right text-secondary '>${s.datetime}</p>`)
    }
})


const mode = e => {
    $(elements.ul).fadeOut('fast')
    $('body').css('background-color', (e) ? 'white' : 'black')
    fillList('none', (e) ? 'white' : 'black')
    $(elements.ul).fadeIn('slow')
}
// SEARCH 
$(document).ready(function () {
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase()
        $("#list li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    })
})
// SEARCH CONTROL
const removeSearch = () => $('#search').val('')


$('#search').on("keydown", e => {
    if (e.keyCode == 27) {
        removeSearch()
    }
})
// $('#search').focus(() => {
// $('#list').addClass('margin3')
// })
$('#search').focusout(() => {
    $('#seach').val("")
})
let push = false
const contentPush = () => {
    if (!push) {
        $('#list').addClass((margin == 3) ? 'margin3' : 'margin4')
        push = !push
    } else {
        $('#list').removeClass((margin == 3) ? 'margin3' : 'margin4')
        push = !push
    }
}

$(document).ready(function () {
    const loadSpeed = Date.now() - timerStart
    $('#loadtime').html("Load time: " + loadSpeed + "ms")
    $("#github").html('<a href="https://github.com/YoungDaggerDee/ToDoApp" target="popup"> Github </a>')
})

const showSize = () => {
    if ($('#footer-text').css('display') == 'block') {
        $('#footer-text').fadeOut('slow')
    } else {
        $('#footer-text').fadeIn('slow')
    }
}

const updateSize = () => $('#footer-text').html(tasks.length)