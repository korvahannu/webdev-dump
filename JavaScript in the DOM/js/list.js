'use strict';

const addToList = document.getElementById('add-to-list');
const addToListText = document.getElementById('add-to-list-text');
const list = document.getElementById('key-items');
const errorElement = document.getElementById('error-text');
errorElement.style.display = 'none';


const listEventListener = (event) => {
    event.preventDefault();

    const txt = addToListText.value;

    if (txt) {
        const element = document.createElement('li');
        element.innerText = txt;
        element.classList.add('new-item');
        list.appendChild(element);
        addToListText.value = '';
        errorElement.style.display = 'none';

        if (list.children.length > 5) {
            addToList.removeEventListener('click', listEventListener);
        }

        setTimeout(removeNewItemClass, 2000, element);

    } else {
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 2500);
    }

}

function removeNewItemClass(item) {
    item.classList.remove('new-item');
}

addToList.addEventListener('click', listEventListener);