// var questions = fetch('./assets/data/questions.json').then((response) => response.json()).then((json));
import {questions} from '../../assets/data/questions.js';
console.log(questions);
var submitButton = document.getElementById("submit");


function checkAnswer(event) {
    event.preventDefault();
    var options = document.getElementsByName("option");
    for(i=0; i<options.length; i++){
        if(options[i].checked){
            var selectedAnswer = options[i]
        }
    }
    if(selectedAnswer){
        console.log(selectedAnswer)
    }
}

submitButton.addEventListener("click", checkAnswer);