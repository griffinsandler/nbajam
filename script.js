const startButton_pelicans = document.getElementById('start-btn-pels')
const startButton = document.getElementById('start-btn')
const startButton_grizzlies = document.getElementById('start-btn-grizzlies')
const intro = document.getElementById('intro')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', restartGame)
startButton_pelicans.addEventListener('click', startGame_pelicans)
startButton_grizzlies.addEventListener('click', startGame_grizzlies)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function restartGame() {
    resetState()
    questionContainerElement.classList.add('hide')
    startButton_pelicans.classList.remove('hide')
    startButton_grizzlies.classList.remove('hide')
    intro.classList.remove('hide')
    startButton.classList.add('hide') 
}

function startGame_pelicans() {
  startButton_pelicans.classList.add('hide')
  startButton_grizzlies.classList.add('hide')
  intro.classList.add('hide')
  shuffledQuestions = pelicans_questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function startGame_grizzlies() {
    startButton_pelicans.classList.add('hide')
    startButton_grizzlies.classList.add('hide')
    intro.classList.add('hide')
    shuffledQuestions = grizzlies_questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
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
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
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

const pelicans_questions = [
  {
    question: 'Zion Williamson had 4 points in the first quarter, 6 points in the second, 12 in the third, and 7 in the fourth against the San Anontio Spurs. How many total points did he have in the game?',
    answers: [
      { text: '29', correct: true },
      { text: '22', correct: false },
      { text: '32', correct: false },
      { text: '30', correct: false }
    ]
  },
  {
    question: 'Trey Murphy shot over 45% from three against the LA Lakers. If he made 4 total threes, how many shots did he attempt?',
    answers: [
      { text: '8', correct: true },
      { text: '9', correct: false },
      { text: '10', correct: false },
      { text: '11', correct: false }
    ]
  },
  {
    question: 'Brandon Ingram made 8 constested midrange shots when gaurded by Jae Crowder. How many total points did he score of of these shots.',
    answers: [
      { text: '14', correct: false },
      { text: '15', correct: false },
      { text: '16', correct: true },
      { text: '18', correct: false }
    ]
  }
]

const grizzlies_questions = [
    {
      question: 'Ja Morant had 4 points in the first quarter, 6 points in the second, 12 in the third, and 7 in the fourth against the San Anontio Spurs. How many total points did he have in the game?',
      answers: [
        { text: '29', correct: true },
        { text: '22', correct: false },
        { text: '32', correct: false },
        { text: '30', correct: false }
      ]
    },
    {
      question: 'Desmond Bane shot over 45% from three against the LA Lakers. If he made 4 total threes, how many shots did he attempt?',
      answers: [
        { text: '8', correct: true },
        { text: '9', correct: false },
        { text: '10', correct: false },
        { text: '11', correct: false }
      ]
    },
    {
      question: 'Jaren Jackson Jr. made 8 constested midrange shots when guarded by Jared Vanderbelt. How many total points did he score of of these shots.',
      answers: [
        { text: '14', correct: false },
        { text: '15', correct: false },
        { text: '16', correct: true },
        { text: '18', correct: false }
      ]
    }
  ]