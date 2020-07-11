const timerStart = Date.now();
let dev_mode = false
const tasks = []
const done = []
let direction = false
let priority = 0
const elements = {
    ul: document.querySelector('.list-group'),
    input: document.querySelector('#input')
}
const body = document.querySelector('body')
class Task {
    constructor(text, priority) {
        this.text = text
        this.priority = priority
        this.favorite = false
    }
}

function setActive(e) {
    if (e.classList.contains('t')) {
        e.innerHTML = `<del class="text-muted">${tasks[e.id].text}</del>`
        e.classList.remove('t')
    } else {
        e.classList.add('t')
        e.innerHTML = tasks[e.id].text
    }
}

function setRemoved(e) {

}
const setPriority = e => {
    priority = e
}

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
        input.value = ''
    }
}
const removeTask = e => {
    console.log('double click')
    let id = e.id
    console.log(id)
    tasks.splice(id, 1)
    fillList('none', 'none')
}


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
                elements.ul.innerHTML += `<li class="list-group-item bg-dark well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${i}'>${tasks[i].text}</li>`
            } else {
                elements.ul.innerHTML += `<li class="list-group-item bg-white well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${i}'>${tasks[i].text}</li>`
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
                elements.ul.innerHTML += `<li class="list-group-item bg-dark well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${tmpInt}'>${tasks[tmpInt].text}</li>`
            } else {
                elements.ul.innerHTML += `<li class="list-group-item bg-white well margin t ${color}" onclick='setActive(this)' ondblclick="removeTask(this)" id='${tmpInt}'>${tasks[tmpInt].text}</li>`
            }
        }
    }
}


const startUp = () => {
    elements.ul.innerHTML = ''
    for (let i = 0; i < 10; i++) {

    }
}

const clearList = () => {
    console.log('Clear list')
    tasks.length = 0
    fillList('none', 'none')
}

const backgroundControl = () => {
    console.log("hey")
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
$.getJSON("../version_log.json", function (json) {
    $('#version_log').html('')
    if (json == '[]') {
        console.log('ERROR WITH LOADING VERSION_LOG! VERSION LOG IS EMPTY')
        $('#version_log').html('Version log is empty, please check console')
    }
    for (s of json) {
        $('#version_log').append(`<h3>${s.version}</h3><p>${s.text}</p><p class='text-right text-secondary '>${s.datetime}</p>`)
    }
});


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
        $('#list').addClass('margin3')
        push = !push
    } else {
        $('#list').removeClass('margin3')
        push = !push
    }
}
// DEVELOPMENT MODE
$.getJSON('../package.json', data => {
    $("#footer-text").html(`Latest Update: ${data.version}`)

    if (data.mode.toLowerCase() == 'development') {
        $('#devtoggle').removeClass('d-none')
        $("#loadtime").removeClass('d-none')
        $('#copyright').addClass('d-none')
        $('#github').removeClass('d-none')
    }
    if (data.mode.toLowerCase() == 'production') {
        $('#devtoggle').addClass('d-none')
        $('#github').addClass('d-none')
        $("#loadtime").addClass('d-none')
        $('#footer-text').html('© 2020 Copyright: <a href="#"> Daniel Seiner</a>')
    }
})
$(document).ready(function () {
    const loadSpeed = Date.now() - timerStart
    $('#loadtime').html("Load time: " + loadSpeed + "ms")
    $("#github").html('<a href="#"> Github </a>')
})