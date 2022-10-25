'use strict';
(function (app) {

    const pageItems = {};

    app.startPromisesDemo = function () {
        pageItems.loadData = document.getElementById('loadData');
        pageItems.waitIndicator = document.getElementById('wait-indicator')

        pageItems.loadData.addEventListener('click', loadAsyncData);
    }

    async function loadAsyncData(event) {
        pageItems.loadData.disabled = true;
        pageItems.waitIndicator.style.display = 'block';
        event.preventDefault();

        try {
            const result = await timingDemo('Promise #1');
            console.log(result)

            const result2 = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('Promise #2');
                }, 2000);
            });
            console.log(result2)
        }
        catch(error) {
            console.log(`There was an error in ${error}`)
        }

        pageItems.waitIndicator.style.display = 'none';
        pageItems.loadData.disabled = false;
    }

    function timingDemo(message) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(message);
            }, 2000);
        });
    }

    function loadSimplePromiseData(event) {
        event.preventDefault();

        pageItems.waitIndicator.style.display = 'block';

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Resolved the promise")
            }, 3000)
        });

        promise.then(result => {
            console.log(result);
        },
            reason => {
                console.error(reason);
            }
        )
            .finally(() => {
                pageItems.waitIndicator.style.display = 'none';
            });
    }

    function loadChainedPromiseData(event) {
        event.preventDefault();
        pageItems.waitIndicator.style.display = 'block';

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Promise #1');
            }, 3000);
        });

        promise
            .then(result => {
                console.log('Promise #1 succeeded');

                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('Promise #2');
                    }, 2000);
                });
            })
            .then(result => {
                console.log('Promise #2 succeeded');
            })
            .catch(reason => {
                console.log(`We had a failed promise at ${reason}`);
            })
            .then(result => {
                console.log('Promise after the catch succeeded. This is the reason why catch should be final in the chain');
            })
            .finally(() => {
                console.log('We have now completed all promises');
                pageItems.waitIndicator.style.display = 'none';
            });
    }

    function loadPromiseSetsData(event) {
        event.preventDefault();

        const promise1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Promise #1");
            }, 4000);
        });

        const promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("Promise #2");
            }, 1000);
        });

        const promise3 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Promise #3");
            }, 1500);
        });

        // Waits for all promises to finish
        // All or nothing call! If one fails, everything fails
        // if fails, returns the first reject() message
        /*Promise.all([promise1, promise2, promise3])
        .then(results => {
            console.log(results);
        })
        .catch(reason => {
            console.error(reason);
        });*/

        // Waits for all promises to finish
        // Returns { status: filled/rejected, value/reason }
        // It means response may contain failed and successfull responses
        /*Promise.allSettled([promise1, promise2, promise3])
        .then(result => {
            console.log(result);
        });*/

        // First one wins
        /*Promise.race([promise1, promise2, promise3])
        .then(result => {
            console.log(result);
        })
        .catch(reason => {
            console.log(reason)
        });*/

        // First fullfilled (success) or all errors
        Promise.any([promise1, promise2, promise3])
            .then(result => {
                console.log(result);
            })
            .catch(reason => {
                console.log(reason)
            });
    }

    app.start = function () {
        pageItems.newTaskInput = document.getElementById('new-task');
        pageItems.addNewTaskButton = document.getElementById('submit');
        pageItems.removeCompletedTasksButton = document.getElementById('remove-completed-tasks');
        pageItems.taskList = document.getElementById('task-list');
        pageItems.addNewTaskButton.addEventListener('click', addNewTask);
        pageItems.removeCompletedTasksButton.addEventListener('click', removeCheckedTasks)

        loadFromLocalStorage();
    }

    /*

        You could replace localStorage with sessionStorage
        sessionStorage does not persist from tab to another
        localStorage does persist from tab to tab, it is a somewhat permanent storage
    */

    function saveToLocalStorage() {
        const items = Array.from(pageItems.taskList.children);

        const itemsToSave = items.map(item => {
            return {
                task: item.innerText,
                isChecked: item.classList.contains('checked')
            }
        });

        localStorage.setItem('savedItems', JSON.stringify(itemsToSave));
    }

    function loadFromLocalStorage() {
        const itemsJson = localStorage.getItem('savedItems');
        if (itemsJson) {
            const items = JSON.parse(itemsJson);

            items.forEach(item => {
                const newItem = document.createElement('li');
                newItem.innerText = item.task;
                newItem.addEventListener('click', checkTask);

                if (item.isChecked) {
                    newItem.classList.add('checked');
                }

                pageItems.taskList.appendChild(newItem);
            });
        }
    }

    function addNewTask(event) {
        event.preventDefault();

        // Add new task item
        const newItem = document.createElement('li');
        newItem.innerText = pageItems.newTaskInput.value;
        newItem.addEventListener('click', checkTask);
        pageItems.taskList.appendChild(newItem);
        pageItems.newTaskInput.value = '';

        saveToLocalStorage();
    }

    function checkTask(event) {
        if (event.currentTarget.classList.contains('checked')) {
            event.currentTarget.classList.remove('checked')
        } else {
            event.currentTarget.classList.add('checked')
        }
        saveToLocalStorage();
    }

    function removeCheckedTasks(event) {
        event.preventDefault();
        const items = Array.from(pageItems.taskList.children);

        items.forEach(item => {
            if (item.classList.contains('checked')) {
                pageItems.taskList.removeChild(item);
            }
        });

        saveToLocalStorage();
    }

})(window.app = window.app || {});