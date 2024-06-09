const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons');
let quizElement = document.getElementById("quiz");
const percentage = document.querySelector(".percentage");

let shuffledQuestions, currentQuestionIndex

//startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++ ;
  setNextQuestion() ;
})

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = randomSorting(questions);
  
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove('hide');
  //clear score
  resetElement(quizElement);
  setNextQuestion();
}

function resetElement(element) {
  element.innerHTML = "";
}

//show score
function showScores() {
  let percentage = Math.round((score / questions.length) *100);
  let classPercentage = percentage > 50 ?  "good" : "bad"; 
  
  let quizEndHTML =
      `
  <h1>Quiz Completed</h1>
  <h2 id='score'> Your score: ${score} of ${questions.length}</h2>
  <h2 class=${classPercentage}> ${percentage}%</h2>
  `;
  quizElement.innerHTML = quizEndHTML;
};

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function randomSorting(question) {
  return question.sort(() => Math.random() - .5);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  //sort answers in different orders
  sortAnswers = randomSorting(question.answers);
  
  sortAnswers.forEach(answer => {
  //question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
    
  })
  showProgress();
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  //if correct increase score
  if(correct){
    score++;
  }
  //console.log(correct);
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
    button.disabled = true;
  })
  
  if (shuffledQuestions.length > currentQuestionIndex +1) {
    nextButton.classList.remove('hide');
  } else {
    showScores();
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function showProgress() {
  
  let index = currentQuestionIndex +1;
  let ProgressElement = document.getElementById("progress");
  ProgressElement.innerHTML = 
  `Question ${index} of ${shuffledQuestions.length}`;
};


function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'What is the result of 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false },
      { text: '2+2', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  },
  {
    question: 'Who participated in the enigma code cryptanalysis?',
    answers: [
      { text: 'Nikola Tesla', correct: false },
      { text: 'Benjamin Franklin', correct: false },
      { text: 'Alan Turing', correct: true }
    ]
  },
  {
    question: 'Which is a programming language?',
    answers: [
      { text: 'Javascript', correct: true },
      { text: 'SQL', correct: true },
      { text: 'React', correct: false },
      { text: 'Unix', correct: false }
    ]
  }

]