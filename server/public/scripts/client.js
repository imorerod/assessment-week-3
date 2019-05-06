$(document).ready(onReady);

function onReady() {
    getTasks();
    $('.js-btn-submit-task').on('click', postTask);
    $('.container').on('click', '.js-btn-complete', putTask);
    $('.container').on('click', '.js-btn-delete', deleteTask);
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function(response){
        render(response);
    });
}

function postTask() {
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: { task : $('#newTask').val() }
    }).then(function(response){
        console.log(response);
        $('#newTask').val('');
        getTasks();
    });
}

function putTask() {
    const taskId = $(this).parent().data('id');

    $.ajax({
        type: 'PUT',
        url: '/todo/' + taskId
    }).then(function(response){
        getTasks();
    });
}

function deleteTask() {
    const taskId = $(this).parent().data('id');

    $.ajax({
        type: 'DELETE',
        url: '/todo/' + taskId
    }).then(function(response){
        getTasks();
    });
}

function render(taskArray) {
    $('.container').empty();

    for (let task of taskArray) {
        $('.container').append(`
            <div data-id="${task.id}" class="task">
                <div>
                    <p>${task.task}</p>
                </div>
                <div>
                    <p>${task.completed}</p>
                </div>
                <button class="js-btn-complete">Complete</button>
                <button class="js-btn-delete">Delete</button>
            </div>
        `);

        if (task.completed) {
            const element = $('.container').children().last();
            element.addClass('completed');
        }
    }
}