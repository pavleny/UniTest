menu.onclick = function burger() {
    let x = document.getElementById('myTopnav');
    if(x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav';
    }
}
let theme2 = sessionStorage.getItem('theme')
let name = sessionStorage.getItem('name');

let heading = document.getElementById('heading');
heading.innerHTML = name;

let levelId;

let requestURL = 'http://26.116.247.102:8080/level';
let request = new XMLHttpRequest();
request.open('GET', requestURL, true);

request.responseType = 'json';
request.send();
request.onload = function() {
    var section = request.response;
    populateLevels(section);
    //checkList();
}

function populateLevels(jsonObj) {
    for(let i = 0; i < jsonObj.length; i++) {
        if(theme2 == jsonObj[i]['id_theme']) {
            let a = document.createElement('a');
            a.innerHTML = `${jsonObj[i]['name']}`;
            a.classList.add(`link-${i}`);
            a.id = jsonObj[i]['id_level']
            a.href = '../taskPage/taskPage.html';
            a.addEventListener('click', goToQuestion);
            document.querySelector('.level-desc').appendChild(a);
        }
    }
}

function goToQuestion() {
    levelId = this.id;
    sessionStorage.setItem('levelId', levelId);
}