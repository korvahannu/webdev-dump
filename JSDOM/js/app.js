(function(app) {

    const pageItems = {};

    app.start = function() {
        pageItems.taskInput = document.getElementById('taskInput');
        pageItems.taskSubmitButton = document.getElementById('taskSubmitButton');
        pageItems.taskList = document.getElementById('taskList');
        pageItems.taskSubmitButton.addEventListener('click', addNewTaskItem);
        pageItems.closeOverlayButton = document.getElementById('closeOverlay')
        pageItems.bin = document.getElementById('bin');
        pageItems.bin.addEventListener('click', showOverlay);
        pageItems.overlay = document.getElementById('overlay')
        pageItems.closeOverlayButton.addEventListener('click', closeOverlay);
        pageItems.removedTasks = document.getElementById('removedTasks');
    }

    function addNewTaskItem(event) {
        event.preventDefault();


        if(!taskInput.value) {
            taskInput.style.borderColor = '#c0392b';
            taskInput.style.borderStyle = 'dashed';
        } else {
            taskInput.style.borderColor = '#7f8c8d';
            taskInput.style.borderStyle = 'solid';
        }


        const listItem = document.createElement('li');
        listItem.innerText = taskInput.value;
        listItem.addEventListener('click', removeTaskItem, true);

        const listItemCheckmark = document.createElement('img');
        listItemCheckmark.src = 'images/check-mark.png';

        listItem.appendChild(listItemCheckmark);
        taskInput.value = '';
        taskList.appendChild(listItem);
    }

    function removeTaskItem(event) {
        const element = event.currentTarget;
        element.classList.add('checked-task');
        element.querySelector('img').remove();


        setTimeout(() => {
            updateBinCount();
            const removedElement = document.createElement('li');
            removedElement.innerText = element.innerText;
            pageItems.removedTasks.appendChild(removedElement);
            element.remove();
        }, 2000);
    }

    function updateBinCount() {
        document.getElementById('bin-count').innerText = parseInt(document.getElementById('bin-count').innerText) + 1;
    }

    function showOverlay() {
        pageItems.overlay.style.display = 'block';
    }

    function closeOverlay() {
        pageItems.overlay.style.display = 'none';
    }

})(window.app = window.app || { })