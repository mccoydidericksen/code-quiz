import {questions} from '../../assets/data/questions.js';
var submitButton = document.getElementById("submit");
var questionEl = document.getElementById("question");
var optionA = document.getElementById("optionA");
var optionB = document.getElementById("optionB");
var optionC = document.getElementById("optionC");
var optionD = document.getElementById("optionD");
var questionIndex = 0;

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

function nextQuestion() {
    questionEl.textContent = questionIndex + 1 + ". " + questions[questionIndex].question;
    optionA.textContent = questions[questionIndex].answers.a;
    optionB.textContent = questions[questionIndex].answers.b;
    optionC.textContent = questions[questionIndex].answers.c;
    optionD.textContent = questions[questionIndex].answers.d;   
}
nextQuestion();

submitButton.addEventListener("click", checkAnswer);