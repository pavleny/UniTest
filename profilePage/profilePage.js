const updateURL = 'http://26.116.247.102:8080/account/update/?';

let userName = localStorage.getItem('nick');
let status = localStorage.getItem('role');
let email = localStorage.getItem('email');
let fullName = localStorage.getItem('fullName');
let bonuses = localStorage.getItem('bonuses');
let password = localStorage.getItem('password');
let id = localStorage.getItem('idUser');

let userName_area = document.getElementById('nickName');
let status_area = document.getElementById('userStatus');
let email_area = document.getElementById('userEmail');
let fullName_area = document.getElementById('userFullName');
let bonuses_area = document.getElementById('userBonuses');
let password_area = document.getElementById('userPassword');

userName_area.innerHTML = userName;
status_area.innerHTML = status;
email_area.innerHTML = email;
fullName_area.innerHTML = fullName;
bonuses_area.innerHTML = bonuses;
password_area.innerHTML = password;

let newEmail = document.getElementById('newEmail');
let newFullName = document.getElementById('newFullName');
let newPassword = document.getElementById('newPassword');

newEmail.value = email;
newFullName.value = fullName;
newPassword.value = password;

let textArr = document.querySelectorAll('.change');
let inputsArr = document.querySelectorAll('.change-via');

let editButton = document.getElementById('editButton');
editButton.addEventListener('click', changeInputs);

function changeInputs() {
    textArr.forEach(item => item.style.display = 'none');
    inputsArr.forEach(item => item.style.display = 'block');
    this.style.display = 'none';
    submitButton.style.display = 'block';
}

let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', sendData);
submitButton.addEventListener('click', changeText);

function changeText() {
    textArr.forEach(item => item.style.display = 'block');
    inputsArr.forEach(item => item.style.display = 'none');
    this.style.display = 'none';
    editButton.style.display = 'block';
}
function sendData() {
    let newURL = `${updateURL}id_account=${id}&email=${newEmail.value.trim()}&fullName=${newFullName.value.trim()}&password=${newPassword.value.trim()}&nickname=${userName_area.innerHTML.trim()}&role=${status_area.innerHTML.trim()}`;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", newURL, true);
    xhr.onreadystatechange = function() {
        email_area.innerHTML = newEmail.value;
        fullName_area.innerHTML = newFullName.value;
        password_area.innerHTML = newPassword.value;

        localStorage.setItem('email', email_area.innerHTML);
        localStorage.setItem('fullName', fullName_area.innerHTML);
        localStorage.setItem('password', password_area.innerHTML);
    }
    xhr.send();
}