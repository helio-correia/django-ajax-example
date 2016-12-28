function getCookie (name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');


function changeState (event, el){
    $.get(el.attr('href')).done(function(response){
        if (response.taskCompleted) {
            el.addClass('completed')
        }
        else {
            el.removeClass('completed')
        }
    })
    event.preventDefault();
}

function createTask (event, el) {
    $.post(el.attr('action'), el.serializeArray()).done(function (task) {
        $('ul.list-group').append(
            $('<li></li>', {class: 'list-group-item'}).append(
                $('<a></a>', {
                    href: Urls['tasks:change_state'](task.id),
                    class: 'task',
                    onclick: 'changeState(event, $(this))',
                    text: task.name
                }),
                $('<a></a>', {href: Urls['tasks:delete'](task.id), text: ' x'})
            )
        )
    })
    el.find('#id_name').val('')
    event.preventDefault()
}

function deleteTask (event, el) {
    $.get(el.attr('href')).done(function () {
       el.closest('li').remove()
    })
    event.preventDefault()
}
