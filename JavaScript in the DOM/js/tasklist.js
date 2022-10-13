'use strict';

(function (app) {

    const pageItems = {};

    app.todoStartup = function () {
        const frm = document.getElementById('taskForm');
        pageItems.taskList = document.getElementById('taskList');
        pageItems.taskInput = frm.querySelector('#taskInput');
        pageItems.submit = frm.querySelector('#submit');
        pageItems.removeButton = frm.querySelector('#remove');

        pageItems.submit.addEventListener('click', addTask);
        pageItems.taskList.addEventListener('click', completeTask);
        pageItems.removeButton.addEventListener('click', removeCompletedTasks);
    }

    function addTask(event) {
        event.preventDefault();
        pageItems.taskInput.focus();
        const li = document.createElement('li');
        li.innerText = pageItems.taskInput.value;
        pageItems.taskInput.value = '';
        pageItems.taskList.appendChild(li);
    }

    function completeTask(event) {
        event.stopPropagation();
        event.preventDefault();

        if (event.target.classList.contains('completed-task')) {
            event.target.classList.remove('completed-task');
        } else {
            event.target.classList.add('completed-task');
        }
    }

    function removeCompletedTasks(event) {
        event.preventDefault();
        const items = Array.from(pageItems.taskList.children);
        
        items.forEach(item => {
            if(item.classList.contains('completed-task')) {
                pageItems.taskList.removeChild(item);
            }
        });
    }

})(window.app = window.app || {});

