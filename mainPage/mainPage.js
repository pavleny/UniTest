menu.onclick = function burger() {
    let x = document.getElementById('myTopnav');
    if(x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav';
    }
}
//-------------------------------

let cources = [];
let recommended = [];

requestURL = 'http://26.116.247.102:8080/section';
let request = new XMLHttpRequest();
request.open('GET', requestURL, true);

request.responseType = 'json';
request.send();
request.onload = function() {
    var section = request.response;
    populateSections(section);
}

function populateSections(jsonObj) {
    cources = JSON.parse(JSON.stringify(jsonObj));
    for(let i = 0; i < cources.length; i++) {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add(`sub-container${i}`);
        mainDiv.classList.add(`sub`);
        document.querySelector('.container').appendChild(mainDiv);

        let leftDiv = document.createElement('div');
        leftDiv.classList.add(`sub-container-left${i}`);
        leftDiv.classList.add(`sub-left`);
        leftDiv.style = 'width: 50%';
        document.querySelector(`.sub-container${i}`).appendChild(leftDiv);

        let rightDiv = document.createElement('div');
        rightDiv.classList.add(`sub-container-right${i}`);
        rightDiv.classList.add(`sub-right`);
        document.querySelector(`.sub-container${i}`).appendChild(rightDiv);

        if(i%2 !== 0) {
            rightDiv.style = 'order: -1';
        }

        let h1 = document.createElement('h1');
        h1.classList.add('sub-heading');
        h1.innerHTML = `${cources[i]['name']}`;
        document.querySelector(`.sub-container-left${i}`).appendChild(h1);

        let ul = document.createElement('ul');
        ul.classList.add(`sub-list${i}`);
        ul.classList.add(`list`);
        ul.id = `${i}s`;
        document.querySelector(`.sub-container-left${i}`).appendChild(ul);

        for(let j = 0; j < cources[i]['themes'].length; j++) {

            let li = document.createElement('li');
            li.classList.add(`li-${j}-${i}`);
            document.querySelector(`.sub-list${i}`).appendChild(li);

            let a = document.createElement('a');
            a.innerHTML = `${cources[i]['themes'][j]['name']}`;
            a.href = '../themePage/themePage.html';
            a.classList.add('ref');
            a.id = `${cources[i]['themes'][j]['id_theme']}`;
            a.addEventListener('click', goToTheme)
            document.querySelector(`.li-${j}-${i}`).appendChild(a);
        }

        let img = document.createElement('img');
        img.src = `../img/mainImg/${Math.floor(Math.random() * 5)}.jpg`;
        img.style = 'width: 100%; height: 100%;';
        img.classList.add('images');
        document.querySelector(`.sub-container-right${i}`).appendChild(img);
    }
    let sections = document.getElementsByClassName('list');
      for(let i = 0; i < sections.length; i++) {
          if(sections[i].children.length < 1) {
              let h3 = document.createElement('h3');
              h3.innerHTML = 'Urokov Poke NEt';
              document.getElementById(`${i}s`).appendChild(h3);       
            } 
        } 
}

requestURL2 = 'http://26.116.247.102:8080/theme/top';
let request2 = new XMLHttpRequest();
request2.open('GET', requestURL2, true);

request2.responseType = 'json';
request2.send();
request2.onload = function() {
    var section = request2.response;
    populateRecommended(section);
}

function populateRecommended(jsonObj) {
    recommended = JSON.parse(JSON.stringify(jsonObj));

    for(let i = 0; i < recommended.length; i++) {
        let sub_popular = document.createElement('div');
        sub_popular.classList.add(`sub_popular${i}`);
        sub_popular.classList.add(`sub_popular_each`);
        document.querySelector(`.popular`).appendChild(sub_popular);

        let imgDiv = document.createElement('div');
        imgDiv.classList.add(`img-div-${i}`);
        imgDiv.classList.add('img-div-each');
        document.querySelector(`.sub_popular${i}`).appendChild(imgDiv);

        let image = document.createElement('img');
        image.src = `http://26.116.247.102:8080/image/${recommended[i]['image']}`;
        image.classList.add('popular-img');
        document.querySelector(`.img-div-${i}`).appendChild(image);

        let h2 = document.createElement('h2');
        h2.classList.add('popular-heading');
        h2.innerHTML = `${recommended[i]['name']}`;
        document.querySelector(`.sub_popular${i}`).appendChild(h2);

        let p = document.createElement('p');
        p.classList.add('popular-description');
        p.innerHTML = `${recommended[i]['description']}`;
        document.querySelector(`.sub_popular${i}`).appendChild(p);

        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add(`button-div-${i}`);
        buttonDiv.classList.add('button-div-each');
        document.querySelector(`.sub_popular${i}`).appendChild(buttonDiv);
        let button = document.createElement('button');
        button.innerHTML = 'Перейти';
        button.classList.add('buttons-popular');
        document.querySelector(`.button-div-${i}`).appendChild(button);
    }
}

window.onload = function () {
    //alert(localStorage.getItem('nick'));
    //alert(localStorage.getItem('fullName'));
    //alert(localStorage.getItem('email'));
    //alert(localStorage.getItem('role'));
    //alert(localStorage.getItem('bonuses'));
}

function goToTheme() {
    document.location.href = '../themePage/themePage.html';
    sessionStorage.setItem('theme', this.id);
}