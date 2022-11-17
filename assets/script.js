var qcontainer = document.getElementById("quiz")
var summary = document.getElementById("summary")
var startBtn = document.getElementById("startbtn")
var question = document.getElementById("question")
var buttonDiv = document.getElementById("buttonDiv")
var timerDiv = document.getElementById("timerDiv")

qcontainer.style.display = "none"
summary.style.display = "none"
var currentQuestion = 0

var questionsDB = [
    {
        question: "What does HTML stand for?",
        answers: [
            { answer: "Hot Tomato Milk Lunch", correct: false },
            { answer: "Happy Tall Mailing Line", correct: false },
            { answer: "HyperText Markup Language", correct: true },
            { answer: "Hallway Tree Marsh Larry", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { answer: "Crater Station Shelter", correct: false },
            { answer: "Cliff Shuttle Sender", correct: false },
            { answer: "Clumsy ", correct: false },
            { answer: "Hallway Tree Marsh Larry", correct: true }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { answer: "Crater Station Shelter", correct: false },
            { answer: "Cliff Shuttle Sender", correct: false },
            { answer: "Clumsy ", correct: false },
            { answer: "Cascading Style Sheets", correct: true }
        ]
    },
    {
        question: "What is Bootsrap?",
        answers: [
            { answer: "CSS Framework", correct: true },
            { answer: "Part of a Boot", correct: false },
            { answer: "Canadian Metal Band", correct: false },
            { answer: "Jamaican Spiced Rum", correct: false }
        ]
    },
    {
        question: "What does 'fetch' do?",
        answers: [
            { answer: "Sends a Dog After a Ball", correct: false },
            { answer: "Retrieves an object in HTTP from a third-party API", correct: true },
            { answer: "Sends someone out to pick up food for you", correct: false },
            { answer: "Sends an ostrich after boomerang", correct: false }
        ]
    },
    {
        question: "What language is a README file written in?",
        answers: [
            { answer: "Shakedown", correct: false },
            { answer: "Lowdown", correct: false },
            { answer: "A Hustle", correct: false },
            { answer: "Markdown", correct: true }
        ]
    },
    {
        question: "What does API stand for?",
        answers: [
            { answer: "Apple Potato Index", correct: false },
            { answer: "Application Programming Interface", correct: true },
            { answer: "Antwerp Pancake Interlude", correct: false },
            { answer: "Altering Pertaining Instincs", correct: false }
        ]
    }
]

startBtn.addEventListener("click", function (event) {
    event.preventDefault()
    qcontainer.style.display = "block"
    startBtn.style.display = "none"
    displayQuestion()
    // When the start button is pressed, the timer starts
    countdown()
})

function displayQuestion() {
    var answersArray = questionsDB[currentQuestion].answers
    while (buttonDiv.firstChild) {
        buttonDiv.removeChild(buttonDiv.firstChild);
    };
    question.textContent = questionsDB[currentQuestion].question
    for (var i = 0; i < answersArray.length; i++) {
        var button = document.createElement("button")
        button.setAttribute("data-correct", answersArray[i].correct)
        button.textContent = answersArray[i].answer
        button.classList.add("btn", "btn-primary")
        buttonDiv.appendChild(button)
    }
}

function countdown() {
    var secondsLeft = 5;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timerInterval = setInterval(function () {
        // As long as the `secondsLeft` is greater than 1
        if (secondsLeft > 1) {
            // Set the `textContent` of `timerDiv` to show the remaining seconds
            timerDiv.textContent = secondsLeft + ' seconds remaining';
            // Decrement `secondsLeft` by 1
            secondsLeft--;
        } else if (secondsLeft === 1) {
            // When `secondsLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerDiv.textContent = secondsLeft + ' second remaining';
            secondsLeft--;
        } else {
            // Once `secondsLeft` gets to 0, set `timerDiv` to an empty string
            timerDiv.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timerInterval);
            // Call the `displayMessage()` function - display feedback
        }
    }, 1000);
}

buttonDiv.addEventListener("click", function (event) {

    let correctAnswer = "You are correct!"
    let incorrectAnswer = "Wrong!"
    let feedback = document.getElementById("feedback")
    event.preventDefault()
    console.log("TEST", event.target)
    let dataAttribute = event.target.getAttribute("data-correct")
    console.log(typeof dataAttribute)
    if (dataAttribute === "true") {
        feedback.textContent = correctAnswer + dataAttribute
    }
    else {
        feedback.textContent = incorrectAnswer + dataAttribute
    }
})

// Timer
// The timer starts at 10 seconds.
// If user selects wrong answer, timer skips two seconds


// write code for timer and score system
// add more questions
// iterate current question variable and call display question functions
// at end have an initial submission and a high score tracker (local storage)