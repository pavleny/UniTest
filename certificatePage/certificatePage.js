let idUser = localStorage.getItem('idUser');
let responsesURL = `http://26.116.247.102:8080/certificate/parse?id_account=${idUser}`;
let themesURL = 'http://26.116.247.102:8080/theme';
let themesArr = [];
let themesDescArr = [];
let responsesArr = [];
populateCertificates();
async function populateCertificates() {
    let response = await fetch(responsesURL);
    responsesArr = await response.json();
    responsesArr.forEach(item => {
        themesArr.push(item.id_theme);
    });
    //console.log(themesArr);
}
getThemes();
async function getThemes() {
    let response = await fetch(themesURL);
    let descArr = await response.json();
    //console.log(descArr); 
    for(let i = 0; i < descArr.length; i++) {
        for(let j = 0; j < themesArr.length; j++) {
            if(themesArr[j] === descArr[i]['id_theme']) {
                themesDescArr.push(descArr[i]['name']);
            }
        }
    }
    //console.log(themesDescArr);
    populateContainers();
}
function populateContainers() {
    for(let i = 0; i < themesArr.length; i++) {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add(`main-${i}`);
        mainDiv.classList.add(`main`);
        mainDiv.style.background = `url(../img/mainImg/${Math.floor(Math.random() * 5)}.jpg)`;
        document.querySelector('.container').appendChild(mainDiv);

        let textDiv = document.createElement('div');
        textDiv.classList.add(`text-${i}`);
        textDiv.classList.add(`text-div`);
        document.querySelector(`.main-${i}`).appendChild(textDiv);

        let h1 = document.createElement('h1');
        h1.classList.add('heading-cert');
        h1.innerHTML = themesDescArr[i];
        document.querySelector(`.text-${i}`).appendChild(h1);

        let h3 = document.createElement('h3');
        h3.classList.add('descr');
        if(responsesArr[i]['dateOfReceiving'] == null) {
            h3.innerHTML = `${localStorage.getItem('fullName')} розпочав курс але ще не закінчив його`;
        } else {
            h3.innerHTML = `Цей сертифікат засвідчує, що ${localStorage.getItem('fullName')} отримав сертифікат ${responsesArr[i]['dateOfReceiving']}`;
        }
        document.querySelector(`.text-${i}`).appendChild(h3);
    }
}
