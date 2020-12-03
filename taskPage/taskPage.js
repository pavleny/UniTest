let levelId = sessionStorage.getItem('levelId');
let taskArr = [];

let requestURL = 'http://26.116.247.102:8080/question';
let request = new XMLHttpRequest();
request.open('GET', requestURL, true);

request.responseType = 'json';
request.send();
request.onload = function() {
    var section = request.response;
    populateTasks(section);
    //checkList();
}

