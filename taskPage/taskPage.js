let levelId = sessionStorage.getItem('levelId');
<<<<<<< Updated upstream
let taskArr = [];
=======
let warningMessage;

let requestURL = `http://26.116.247.102:8080/question/parse?id_level=${levelId}`;
let request = new XMLHttpRequest();
request.open('GET', requestURL, true);

request.responseType = 'json';
request.send();
request.onload = function() {
    var section = request.response;
    populateTasks(section);
}

function populateTasks(jsonObj) {
    for(let i = 0; i < jsonObj.length; i++) {
        let navElem = document.createElement('div');
        navElem.classList.add(`elem-${i}`);
        navElem.classList.add('nav-elem');
        navElem.innerHTML = `${i + 1}`;
        navElem.id = `${i}`;
        navElem.addEventListener('click', changeClass);
        document.querySelector('.question-nav').appendChild(navElem);

        let mainDiv = document.createElement('div');
        mainDiv.classList.add(`main-${i}`);
        mainDiv.classList.add('main-div');
        document.querySelector(`.question-container`).appendChild(mainDiv);

        let imgDiv = document.createElement('div');
        imgDiv.classList.add(`img-div-${i}`);
        imgDiv.classList.add('img-div');
        document.querySelector(`.main-${i}`).appendChild(imgDiv);

        let image = document.createElement('img');
        image.classList.add('images');
        if(jsonObj[i]['image'] === null) {
            image.src = `../img/mainImg/${Math.floor(Math.random() * 5)}.jpg`;
        } else {
            image.src = `http://26.116.247.102:8080/image/${jsonObj[i]['image']}`;
        }
        document.querySelector(`.img-div-${i}`).appendChild(image);

        let questionDiv = document.createElement('div');
        questionDiv.classList.add(`question-div-${i}`);
        questionDiv.classList.add('question-div');
        document.querySelector(`.main-${i}`).appendChild(questionDiv);

        let h3 = document.createElement('h3');
        h3.classList.add('question-text');
        h3.innerHTML = `${jsonObj[i]['name']}`;
        document.querySelector(`.question-div-${i}`).appendChild(h3);

        let answersDiv = document.createElement('div');
        answersDiv.classList.add(`answers-div-${i}`);
        answersDiv.classList.add('answers-div');
        document.querySelector(`.question-div-${i}`).appendChild(answersDiv);

        for(let j = 0; j < jsonObj[i]['answers'].length; j++) {
            advice = jsonObj[i]['answers'][j]['advice']

            let div2 = document.createElement('div');
            div2.classList.add(`variants-${j}-${i}`);
            div2.classList.add('variants-div');
            document.querySelector(`.answers-div-${i}`).appendChild(div2);

            let input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `${jsonObj[i]['answers'][j]['isCorrect']}`;
            input.classList.add(`s${j}`);
            input.name = `${jsonObj[i]['answers'][j]['advice']}`;
            input.classList.add(`inputs`);
            if(i === 0) {
                input.classList.add('active-check');
            }
            document.querySelector(`.variants-${j}-${i}`).appendChild(input);

            let span = document.createElement('span');
            span.innerHTML = `${jsonObj[i]['answers'][j]['text']}`;
            span.classList.add('span-text');
            document.querySelector(`.variants-${j}-${i}`).appendChild(span);
        }

        if(i !== 0) {
            mainDiv.classList.add('unvisible-questions');
        } else {
            navElem.classList.add('active-nav-elem');
        }
    }
}




function showSupport() {
    let advices = document.querySelector('.active-check');
    let bonuses = localStorage.getItem('bonuses');
    warningMessage = document.querySelector('.warning-text');
    if(bonuses < 1000) {
        alert(`У вас недостатьно бонусів! Ваші бонуси: ${bonuses}`);
    } else {
        alert(advices.name);
        let adk;
    }
}


function checkAnswers() {
	let currentNavElem = document.querySelector('.active-nav-elem');
    let checkedArr = document.getElementsByClassName('active-check');

    let correct = [];
    for(let i = 0; i < checkedArr.length; i++) {
        if(checkedArr[i].id === 'true' && checkedArr[i].checked ||
            checkedArr[i].id === 'false' && !checkedArr[i].checked) {
            correct.push(true);
        } else {
            correct.push(false);
        }
    }
    for(let i = 0; i < correct.length; i++) {
        if(correct[i] === false) {
            currentNavElem.style = 'background: red; color: #fff';
            break;
        }
        currentNavElem.style = 'background: green; color: #fff';
    }
}



function changeClass() {
    let checkArr = document.getElementsByClassName('active-check');
    while(checkArr.length !== 0) {
        let i = 0;
        checkArr[i].classList.remove('active-check');
    }

    
    let questionArr = document.getElementsByClassName('main-div');
    let navArr = document.getElementsByClassName('nav-elem');
    for(let i = 0; i < navArr.length; i++) {
        if(navArr[i].classList.contains('active-nav-elem')) {
            questionArr[i].classList.add('unvisible-questions');
            navArr[i].classList.remove('active-nav-elem');
            break;
        }
    }
    questionArr[this.id].classList.remove('unvisible-questions');
    this.classList.add('active-nav-elem');

    let a = questionArr[this.id].className.slice(0, 6);
    let inputsArr = document.querySelectorAll(`.${a} .question-div .answers-div .variants-div input`);
    for(let i = 0; i < inputsArr.length; i++) {
        inputsArr[i].classList.add('active-check');
    }
}


/*let taskArr = [];
>>>>>>> Stashed changes

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

function populateTasks(jsonObj) {
    for(let i = 0; i < jsonObj.length; i++) {
        if(jsonObj[i]['id_level'] == levelId) {
            let div = document.createElement('div');
            div.classList.add(`questions${i}`);
            div.classList.add('row');
            div.id = jsonObj[i]['id_question']
            document.querySelector('.question-container').appendChild(div);

            let img = document.createElement('img');
            img.classList.add('question-image');
            if(jsonObj[i]['image'] == '') {
                img.src = '../img/fon.png';
            } else {
                img.src = `http://26.116.247.102:8080/image/${jsonObj[i]['image']}`;
            }
            document.querySelector(`.questions${i}`).appendChild(img);

            let p = document.createElement('p');
            p.innerHTML = `${jsonObj[i]['text']}`;
            p.classList.add(`${i}`);
            document.querySelector(`.questions${i}`).appendChild(p);

            for(let j = 0; j < jsonObj[i]['answers'].length; j++) {
                
                let div2 = document.createElement('div');
                div2.classList.add(`variants-${j}-${i}`);
                document.querySelector(`.questions${i}`).appendChild(div2);

                let input = document.createElement('input');
                input.type = 'checkbox';
                input.id = `${jsonObj[i]['answers'][j]['isCorrect']}`;
                input.classList.add(`s${j}`);
                input.classList.add(`inputs`);
                document.querySelector(`.variants-${j}-${i}`).appendChild(input);

                let span = document.createElement('span');
                span.innerHTML = `${jsonObj[i]['answers'][j]['text']}`;
                document.querySelector(`.variants-${j}-${i}`).appendChild(span);
            }

           
        }
    }
}

function checkAnswers() {
    let answers = document.getElementsByClassName('row');
    for(let i = 0; i < answers.length; i++) {
        let children = answers[i].childNodes;
        let isTrue;
        for(let j = 2; j < children.length; j++) {
            if((children[j].tagName == 'DIV' && children[j].firstChild.id == 'true' && children[j].firstChild.checked) ||
                (children[j].tagName == 'DIV' && children[j].firstChild.id == 'false')) {
                isTrue = true;
                //children[j].previousElementSibling.style = 'color: green';
            } else {
                isTrue = false;
                children[1].style = 'color: red';
                break;
            }
        }
        if(isTrue) {
            children[1].style = 'color: green';
        }

        //if(answers[i].id == 'true') {
        //  answers[i].parentNode.previousElementSibling.style = 'color: green';
        //}
    }
}

window.onload = function() {
    let button = document.createElement('button');
    button.classList.add('btn-check');
    button.addEventListener('click', checkAnswers);
    button.innerHTML = 'Перевірити';
    document.querySelector(`.question-container`).appendChild(button);
}