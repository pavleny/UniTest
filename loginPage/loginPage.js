function toggleForm() {
    let container = document.querySelector('.container');
    container.classList.toggle('active');
}

//-----------------------Регистрация--------------------------------
//Warnings
let nameError1 = document.getElementById('nameError1');
let nameError2 = document.getElementById('nameError2');
let fullError1 = document.getElementById('fullError1');
let emailError1 = document.getElementById('emailError1');
let emailError2 = document.getElementById('emailError2');
let emailError3 = document.getElementById('emailError3');
let passError1 = document.getElementById('passError1');
let passError2 = document.getElementById('passError2');

let requestURL;
let requestURL2

let userName = document.getElementById('userName');
let fullName = document.getElementById('fullName');
let email = document.getElementById('email');
let pass1 = document.getElementById('pass1');
let pass2 = document.getElementById('pass2');
let submit = document.getElementById('submit');
//let image = document.getElementById('image');

let emailReg = /\S+@\S+\.\S+/;
let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/;

let errors = 0; 

let f1, f2, f3, f4, f5, f6;
let users = {};

submit.addEventListener('click', function() {
    f1 = checkPass(pass1, pass2);
    f7 = checkEmpty(email);
    f2 = checkEmail(email);
    f6 = checkSimilarEmail(email);
    f3 = checkNames(userName);
    f4 = checkSimilarName(userName);
    f5 = checkFullName(fullName);
});
submit.addEventListener('click', sendForm);

function checkPass(pass_1, pass_2) {
    if(!passReg.test(pass_1.value)) {
        pass_1.style = 'border: 2px solid red';
        pass_2.style = 'border: 2px solid red';
        passError1.style = 'display: none';
        passError2.style = 'display: block';
        return false;
    } else if(pass_1.value === pass_2.value) {
        pass_1.style = 'border: 2px solid green';
        pass_2.style = 'border: 2px solid green';
        passError1.style = 'display: none';
        passError2.style = 'display: none';
        return true;
    } 
    else {
        pass_1.style = 'border: 2px solid red';
        pass_2.style = 'border: 2px solid red';
        passError2.style = 'display: none';
        passError1.style = 'display: block';
        return false;
    }
}

function checkEmail(email) {
    if(emailReg.test(email.value)) {
        email.style = 'border: 2px solid green';
        emailError3.style = 'display: none';
        return true;
    } else {
        email.style = 'border: 2px solid red';
        emailError3.style = 'display: block';
        return false;
    }
}

function checkNames(userName) {
    if(userName.value === '') {
        userName.style = 'border: 2px solid red';
        nameError2.style = 'display: block';
        return false;
    }else {
        nameError2.style = 'display: none';
        userName.style = 'border: 2px solid green';
        return true;
    }
}

function checkEmpty(email) {
    if(email.value === '') {
        email.style = 'border: 2px solid red';
        emailError2.style = 'display: block';
        return false;
    }else {
        emailError2.style = 'display: none';
        email.style = 'border: 2px solid green';
        return true;
    }
}

function checkFullName(fullName) {
    if(fullName.value === '') {
        fullName.style = 'border: 2px solid red';
        fullError1.style = 'display: block'; 
        return false;
    } else {
        fullError1.style = 'display: none';
        fullName.style = 'border: 2px solid green';
        return true;
    }
}

function checkSimilarName(userName) {
    let count = 0;
    for(let i = 0; i < users.length; i++) {
        if(users[i]['nickname'] === userName.value) {
            nameError1.style = 'display: block';
            userName.style = 'border: 2px solid red';
            return false;
        } 
    }
    if(userName.value === '') {
        nameError1.style = 'display: none';
        userName.style = 'border: 2px solid red';
        return false;
    }else {
        userName.style = 'border: 2px solid green';
        return true;
    }
}

function checkSimilarEmail(email) {
    for(let i = 0; i < users.length; i++) {
        if(users[i]['email'] === email.value) {
            emailError1.style = 'display: block';
            email.style = 'border: 2px solid red';
            return false;
        }
    }
    if(email.value === '') {
        emailError1.style = 'display: none';
        email.style = 'border: 2px solid red';
        return false;
    }else {
        emailError1.style = 'display: none';
        return true;
    }
}

function sendForm() {
    if(f1 && f2 && f3 && f4 && f5 && f6 && f7) {
        sendRequest();
        document.location.href = '../mainPage/mainPage.html';
    } else {
        alert('Error!');
    }
}

window.onload = function() {
    requestURL = 'http://26.116.247.102:8080/account';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL, true);

    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var section = request.response;
        populateUsers(section);
    }

    function populateUsers(jsonObj) {
        users = JSON.parse(JSON.stringify(jsonObj));
    }
}

function sendRequest() {
    localStorage.clear();
    localStorage.setItem('nick', userName.value);
    localStorage.setItem('fullName', fullName.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', pass1.value);
    localStorage.setItem('bonuses', 0);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${requestURL}?`, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`nickname=${userName.value}&email=${email.value}&password=${pass1.value}&role=User&bonuses=0&fullName=${fullName.value}&image`);
}
//--------------------------------------------------------------------------



//-------------------Авторизация---------------------------------------------

let userName_in = document.getElementById('userName-in');
let pass_in = document.getElementById('pass-in');
let login = document.getElementById('log-in');
let text_in = document.getElementById('login-error');


function userLogIn() {
    requestURL2 = `http://26.116.247.102:8080/account/login?nickname=${userName_in.value}&password=${pass_in.value}`;
    let request2 = new XMLHttpRequest();
    request2.open('GET', requestURL2, true);

    request2.responseType = 'json';
    request2.send();
    request2.onload = function() {
        var section2 = request2.response;
        populateLogin(section2);
    }

    function populateLogin(jsonObj) {
        let user = JSON.parse(JSON.stringify(jsonObj));
        if(!user) {
            userName_in.style = 'border: 2px solid red';
            pass_in.style = 'border: 2px solid red';
            text_in.style = 'display: block';
        } else {
            localStorage.clear();
            localStorage.setItem('nick', user.nickname);
            localStorage.setItem('fullName', user.fullName);
            localStorage.setItem('email', user.email);
            localStorage.setItem('password', user.password);
            localStorage.setItem('bonuses', user.bonuses)

            userName_in.style = 'border: none';
            pass_in.style = 'border: none';
            text_in.style = 'display: none';

            document.location.href = '../mainPage/mainPage.html';
        }
    }
    /*for(let i = 0; i< users.length; i++) {
        if(userName_in.value === users[i]['nickname'] && pass_in.value === users[i]['password']) {
            localStorage.clear();
            localStorage.setItem('nick', userName_in.value);
            localStorage.setItem('fullName', users[i]['fullname']);
            localStorage.setItem('email', users[i]['email']);
            localStorage.setItem('password', pass_in.value);

            document.location.href = '../mainPage/mainPage.html';
        } else {
            userName_in.style = 'border: 2px solid red';
            pass_in.style = 'border: 2px solid red';
            text_in.style = 'display: block';
        }
    }*/
}