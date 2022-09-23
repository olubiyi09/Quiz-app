const question = document.getElementById("question");
const resultBox = document.querySelector(".result-box");
const questionCon = document.querySelector(".question-container");
const timeCount = document.querySelector(".sec");
const myScore = document.querySelector(".score");
const totalPoint = document.querySelector(".total-point");

const choices = Array.from(document.getElementsByClassName("choice-text"));
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the Javascript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: "How dow you write 'Hello World' in an alert box",
    choice1: "msgBox('Hello World')",
    choice2: "alertBox('Hello World')",
    choice3: "msg('Hello World')",
    choice4: "alert('Hello World')",
    answer: 4,
  },
  {
    question:
      " Which of the following type of HTML tag is used to define an internal style sheet?",
    choice1: " <script>",
    choice2: "<link>",
    choice3: " <class>",
    choice4: "<style>",
    answer: 4,
  },
  {
    question:
      "How to write an IF statement for executing some code if i is NOT equal to 5?",
    choice1: "if (i <> 5)",
    choice2: "if i =! 5 then",
    choice3: "if i <> 5",
    choice4: "if (i != 5)",
    answer: 4,
  },
];

const correctBonus = 20;
const maxQuestions = 5;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestions();
};

function showResult() {
  questionCon.style.display = "none";
  resultBox.style.display = "block";
}

getNewQuestions = () => {
  if (availableQuestions.length == 0 || questionCounter >= maxQuestions) {
    showResult();
  }

  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply == "correct") {
      incrementScore(correctBonus);
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestions();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  totalPoint.innerHTML = `Total Score is <span>${score}</span>`;
};

// TIMER;
// TIMER;
let time = 1;
let timeMin = time * 60 * 60;
EndTime = timeMin / 60;

function myTimer() {
  let quiztime = setInterval(function () {
    if (EndTime <= 0) {
      clearInterval(quiztime);
      showResult();
    } else {
      EndTime--;
      let sec = Math.floor(EndTime % 60);
      timeCount.innerHTML = `${sec} sec`;
    }
  }, 1000);
}

myTimer();
startQuiz();
