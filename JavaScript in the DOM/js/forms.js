'use strict';

const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const guestsValue = document.getElementById('guests');
const totalGuestsSection = document.getElementById('totalGuests');
const list = document.getElementById('items');
const fullName = document.getElementById('fullName');
let totalGuestCount = 0;

submitButton.addEventListener('click', submitAction);
resetButton.addEventListener('click', resetAction);

function submitAction(e) {
    e.preventDefault();
    const li = document.createElement('li');
    li.innerText = fullName.value;
    list.appendChild(li);
    fullName.value = '';

    totalGuestCount += guestsValue.valueAsNumber;
    totalGuestsSection.innerText = totalGuestCount;
    guestsValue.value = '';
}

function resetAction(e) {
    e.preventDefault();
    fullName.value = '';
    list.innerHTML = '';
}