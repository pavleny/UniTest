menu.onclick = function burger() {
    let x = document.getElementById('myTopnav');
    if(x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav';
    }
}

let idSection;
let isOpened = false;
let arrSession = [];

let requestURL2 = 'http://26.116.247.102:8080/section';
let request2 = new XMLHttpRequest();
request2.open('GET', requestURL2, true);