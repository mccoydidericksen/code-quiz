import {questions} from '../../assets/data/questions.js';
var submitButton = document.getElementById("submit");
var questionEl = document.getElementById("question");
var optionA = document.getElementById("optionA");
var optionB = document.getElementById("optionB");
var optionC = document.getElementById("optionC");
var optionD = document.getElementById("optionD");
var timerEl = document.getElementById("timer");
var options = document.getElementsByName("option");
var initialsButton = document.getElementById("submit-initials");
var showScoresButton = document.getElementById("show-scores");
var scoreListEl = document.getElementById("score-list");
var scoreList = JSON.parse(localStorage.getItem("scoreList"));
var questionIndex = 0;
var correctCount = 0;
var secondsLeft = 3;

function clearAnswer() {
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
    document.getElementById("quiz-form").style.display = "none";
    submitButton.style.display = "none";
    document.getElementById("score").textContent = "Your score is " + correctCount + " out of " + questions.length + "!";
    showScores();
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

function showScores() {
    document.getElementById("results").style.display = "block";
    if(scoreList){
        // sort scoreList
        for(var i=0; i<scoreList.length; i++){
            for(var j=i+1; j<scoreList.length; j++){
                if(scoreList[i].score < scoreList[j].score){
                    var temp = scoreList[i];
                    scoreList[i] = scoreList[j];
                    scoreList[j] = temp;
                }
            }
        }
        //clear all scoreEl if exists
        while(scoreListEl.firstChild){
            scoreListEl.removeChild(scoreListEl.firstChild);
        }
        // display scoreList
        for(var i=0; i<scoreList.length; i++){
            var scoreEl = document.createElement("li");
            scoreEl.textContent = scoreList[i].initials + " - " + scoreList[i].score;
            scoreListEl.appendChild(scoreEl);
        }
    }
}

function addScore(event) {
    event.preventDefault();
    var initials = document.getElementById("initials").value;
    var score = {
        initials: initials,
        score: correctCount
    } 
    if(initials === ""){
        alert("Please enter your initials");
        return;
    } else {
    if(scoreList){
        scoreList.push(score);
    }
    else{
        scoreList = [score];
    }
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    showScores();
}
}

showScoresButton.addEventListener("click", showScores);
submitButton.addEventListener("click", checkAnswer);
initialsButton.addEventListener("click", addScore);