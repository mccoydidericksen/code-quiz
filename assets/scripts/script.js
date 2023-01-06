import {questions} from '../../assets/data/questions.js';
var submitButton = document.getElementById("submit");
var questionEl = document.getElementById("question");
var optionA = document.getElementById("optionA");
var optionB = document.getElementById("optionB");
var optionC = document.getElementById("optionC");
var optionD = document.getElementById("optionD");
var seconds = document.getElementById("seconds");
var timerEl = document.getElementById("timer");
var questionIndex = 0;
var correctCount = 0;
var secondsLeft = 20;

function clearAnswer() {
    var options = document.getElementsByName("option");
    for(var i=0; i<options.length; i++){
        options[i].checked = false;
        document.getElementById("option" + options[i].id.toUpperCase()).style.backgroundColor = "white";
    }
}

function checkAnswer(event) {
    event.preventDefault();
    if (submitButton.textContent === "Start Quiz") {
        toggleTimer(1);
        clearAnswer();
        nextQuestion();
        submitButton.textContent = "Submit Answer";
    }
    else {
        var options = document.getElementsByName("option");
        for(var i=0; i<options.length; i++){
            if(options[i].checked){
                var selectedAnswer = options[i]
            }
        }
        if(selectedAnswer){
            if(selectedAnswer.id === questions[questionIndex -1].correctAnswer){
                document.getElementById("option" + selectedAnswer.id.toUpperCase()).style.backgroundColor = "green";
                correctCount++;
                secondsLeft += 5;
            }
            else{
                document.getElementById("option" + selectedAnswer.id.toUpperCase()).style.backgroundColor = "red";
                secondsLeft -= 5;
            }
        }
        setTimeout(clearAnswer, 1000);
        setTimeout(nextQuestion, 1000);
    }
}

function endQuiz() {
    questionEl.textContent = "Quiz Complete!";
    optionA.textContent = "Correct Answers: " + correctCount;
    optionB.textContent = "Incorrect Answers: " + (questions.length - correctCount);
    optionC.textContent = "Score: " + correctCount;
    optionD.style.display = "none";
    submitButton.style.display = "none";
}

function nextQuestion() {
        questionEl.textContent = questionIndex + 1 + ". " + questions[questionIndex].question;
        optionA.textContent = questions[questionIndex].answers.a;
        optionB.textContent = questions[questionIndex].answers.b;
        optionC.textContent = questions[questionIndex].answers.c;
        optionD.textContent = questions[questionIndex].answers.d;
        questionIndex++;
}

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = "Time Remaining: " + secondsLeft;
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      } else if(questionIndex === questions.length){
        secondsLeft = 0;
        clearInterval(timerInterval);
        endQuiz();
        }
    }, 1000);
  }

function toggleTimer(toggle) {
    if(toggle){
        setTime();
    }
}

submitButton.addEventListener("click", checkAnswer);