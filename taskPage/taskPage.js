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

<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
