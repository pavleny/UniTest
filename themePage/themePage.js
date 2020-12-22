let theme = sessionStorage.getItem('theme');
alert(theme);
let name;
let requestURL = 'http://26.116.247.102:8080/theme';
let request = new XMLHttpRequest();
request.open('GET', requestURL, true);

request.responseType = 'json';
request.send();
request.onload = function() {
    var section = request.response;
    populateThemes(section);
}

function populateThemes(jsonObj) {
    for(let i = 0; i < jsonObj.length; i++) {
        if(theme == jsonObj[i]['id_theme']) {
            let img = document.createElement('img');
            img.src = `http://26.116.247.102:8080/image/${jsonObj[i]['image']}`;
            document.querySelector('.image').appendChild(img);

            let div = document.createElement('div');
            div.classList.add('description');
            document.querySelector('.theme-description').appendChild(div);

            let h1 = document.createElement('h1');
            h1.innerHTML = jsonObj[i]['name']
            document.querySelector('.description').appendChild(h1);
            name = h1.innerHTML;

            let p = document.createElement('p');
            p.innerHTML = jsonObj[i]['description']
            document.querySelector('.description').appendChild(p);
        }
    }
}

let button = document.getElementById('btn');
button.addEventListener('click', goToTask);

function goToTask() {
    document.location.href = '../levelPage/levelPage.html';
    sessionStorage.setItem('task', theme);
    sessionStorage.setItem('name', name);
}