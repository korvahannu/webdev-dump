'use strict';
const displayMessage = document.getElementById('display-message');
const sendEmailAnchor = document.getElementById('send-email');
const recallEmailAnchor = document.getElementById('recall-email');
const statusMessage = document.getElementById('status-message');
let countdown = 10
let timeoutId = 0;

sendEmailAnchor.addEventListener('click', sendEmail);
recallEmailAnchor.addEventListener('click', cancelEmail);

function sendEmail(event) {
    event.preventDefault();
    timeoutId = setTimeout(countDownToSend);
}

function cancelEmail(event) {
    event.preventDefault();
    clearTimeout(timeoutId);
    cancelSendEmail();
}

function actuallySendEmail() {
    displayMessage.innerText = 'Email has been sent!!!';
}

function cancelSendEmail() {
    displayMessage.innerText = 'Email has been recalled!!!';
    statusMessage.innerText = '';
}

function countDownToSend() {
    if(countdown > 0) {
        statusMessage.innerHTML = `Email will send in ${countdown} seconds...`;
        countdown--;
        timeoutId = setTimeout(countDownToSend, 1000);
    } else {
        actuallySendEmail();
        statusMessage.innerText = '';
        countdown = 10;
    }
}