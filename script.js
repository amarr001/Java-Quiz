const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const resButton = document.getElementById("restart-btn");
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const initialPage = document.getElementById("initialPage");
const timer = document.getElementById("timer");
const finalmessage = document.getElementById("finalMessage");
const scorecounterEl = document.getElementById("scoreCounter");
var count;



let shuffledQuestions, currentQuestionIndex
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
resButton.addEventListener("click", initialGame)

function startGame() {

  initialPage.classList.add('hide')
  timer.classList.remove("hide")
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  scorecounterEl.classList.add("hide")
  resButton.classList.add("hide")
  finalmessage.classList.add("hide")
  setNextQuestion()
  startTime();
 
  
}

function initialGame(){

initialPage.classList.remove("hide")
startButton.classList.remove("hide")
scorecounterEl.classList.add("hide")
timer.classList.add("hide")
scorecounterEl.classList.add("hide")
resButton.classList.add("hide")
finalmessage.classList.add("hide")

}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
   
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    count = 0
  }
  if(correct){
    count = count;
  }else{
    count = count -5;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Which country won the World Cup in 1994?',
    answers: [
      { text: 'Brazil', correct: true },
      { text: 'Germany', correct: false },
      { text: 'Mexico', correct: false },
      { text: 'Argentina', correct: false }
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
  }
]

// Set the date we're counting down to
function startTime(){ 
count = 20;
var interval = setInterval(function(){
  document.getElementById('timer').innerHTML= count;
  count--;


  if (count <= 0) {
    clearInterval(interval);
    timer.innerHTML = "0"
    finalmessage.classList.remove("hide")
    questionContainerElement.classList.add("hide");
    resButton.classList.remove("hide")
    scorecounterEl.classList.remove("hide")  
  }
}, 1000);
}