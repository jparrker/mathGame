$(document).ready(function () {
  let currentQuestion;
  let timeRemaining = 10;
  let interval;
  let score = 0;
  let operator;
  const getRandomNumber = function (size) {
    return Math.ceil(Math.random() * size);
  };

  const updateScore = function (amount) {
    score += amount;
    $("#score").text(score);
  };

  const start = function () {
    if (!interval) {
      if (timeRemaining === 0) {
        updateTime(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTime(-1);
        if (timeRemaining === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  updateTime = function (amount) {
    timeRemaining += amount;
    $("#timer").text(timeRemaining);
  };

  const questionGenerator = function () {
    let question = {};
    let num1 = getRandomNumber(10);
    let num2 = getRandomNumber(10);
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };

  const checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      getNewQuestion();
      $("#user-input").val("");
      updateTime(+1);
      updateScore(+1);
    }
  };

  const getNewQuestion = function () {
    currentQuestion = questionGenerator();
    $("#equation").text(currentQuestion.equation);
  };

  $("#user-input").on("keyup", function () {
    start();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  $("input:radio[name=operation]").change(function () {
    operator = $(this).val();
    console.log(operator);
    start();
  });

  getNewQuestion();
});
