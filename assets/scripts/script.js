import {questions} from '../../assets/data/questions.js';
var submitButton = document.getElementById("submit");

function addIdtoQuestions(){
    for(var i=0; i<questions.length; i++){
        questions[i].id = i;
    }
}

addIdtoQuestions();

function checkAnswer(event) {
    event.preventDefault();
    var options = document.getElementsByName("option");
    for(var i=0; i<options.length; i++){
        if(options[i].checked){
            var selectedAnswer = options[i]
        }
    }
    if(selectedAnswer){
        console.log(selectedAnswer)
    }
}


submitButton.addEventListener("click", checkAnswer);