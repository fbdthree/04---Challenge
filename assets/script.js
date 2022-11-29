// Assign elements to variables.
var intro = document.getElementById("intro")
var questionContainer = document.getElementById("quiz")
var summary = document.getElementById("summary")
var startBtn = document.getElementById("startbtn")
var question = document.getElementById("question")
var buttonDiv = document.getElementById("buttonDiv")
var timerDiv = document.getElementById("timerDiv")
var scoreContainer = document.getElementById("scoreContainer")

//////////////////////Try putting text in dynamically/////////////////////

// Create intoductory statement for the quiz.
// Assign to `intro` variable.
// var introParagraph = "Press start to play game.  Timer starts at 15 seconds.  Correct answers count as one point.  Incorrect answers subtract 2 seconds from timer.  Good luck!"
// Assign the text in `introParagraph` to the intro element.
// intro.textContent = introParagraph.
//var introParagraph = "1) Press `Start` to start the timer.\n2) You have 15 seconds to answer all of the questions.\n3) Each correct answer scores one point.\n4) Each incorrect answer subtracts 2 seconds from timer\n5) Save your score at the end."  
//intro.textContent = introParagraph

// Hide the question container.
questionContainer.style.display = "none"
// Hide the summary section.
summary.style.display = "none"

// Declare current question being displays as 0, which will be used as the questionsDB's index.
var currentQuestion = 0

// Create object holding the database of questions.  
// Answers to the questions are in an array.
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
        question: "What does AJAX stand for?",
        answers: [
            { answer: "Another Jusified Atomic X-ray", correct: false },
            { answer: "All Jars Are Xenophobic", correct: false },
            { answer: "After Jail Armpit Xylophone", correct: false },
            { answer: "Asynchronous JavaScript And XML", correct: true }
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

// Event listener for the start button.
// Clicking the start button will:
startBtn.addEventListener("click", function (event) {
    event.preventDefault()
    // Display the question container (that has a question in it).
    questionContainer.style.display = "block"
    // Hide the start button.
    startBtn.style.display = "none"
    // Display a question.
    displayQuestion()
    // Start countdown timer.
    countdown()
    scoreContainer.style.display = "none"
    intro.style.display = "none"
})

//////////TODO: fix error after last question is reached - must hide after last question///////////////////

// Display a multiple choice question and display the answers as buttons
function displayQuestion() {
    if(currentQuestion >= questionsDB.length) {
        return gameOver()
    }
    // Create array variable and asign the answers array from the current question to it.
    var answersArray = questionsDB[currentQuestion].answers
    // Remove any children that may be appended to the buttonDiv
    // Will clear question and answers from the screen
    while (buttonDiv.firstChild) {
        buttonDiv.removeChild(buttonDiv.firstChild);
    };
    // Get question from questions database and assign text to question element.
    question.textContent = questionsDB[currentQuestion].question
    // Create buttons below the question that have the asnswers no them.
    for (var i = 0; i < answersArray.length; i++) {
        // Create a button element and assign to button variable.
        var button = document.createElement("button")
        // Create data-attribute `data-correct` which will assign true or false value to this answer's button. 
        button.setAttribute("data-correct", answersArray[i].correct)
        // Assign answer text to button.
        button.textContent = answersArray[i].answer
        // Add Bootstrap style to button
        button.classList.add("btn", "btn-primary")
        // Append button to `buttonDiv`
        buttonDiv.appendChild(button)
        // Repeat until all answer buttons are built.
    }
    // Increment `currentQuestion` by one, so that the next question and set of answers in the 
    // questions database will display once the correct (true) answer button is clicked.
    currentQuestion++
}

// Initialize `secondsLeft` variable outside `coutdown()` so that it can be accessed by other functions.
var secondsLeft = 15
var timerInterval
// Create countdown function to handle quiz timer.
function countdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timerInterval = setInterval(function () {
        // As long as the `secondsLeft` is greater than 1
        if (secondsLeft > 1) {
            // Set the `textContent` of `timerDiv` to show the remaining seconds
            timerDiv.textContent = secondsLeft + ' seconds remaining'
            // Decrement `secondsLeft` by 1
            secondsLeft--;
        } else if (secondsLeft === 1) {
            // When `secondsLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerDiv.textContent = secondsLeft + ' second remaining'
            secondsLeft--;
        } else {
            // Hide the question container
            gameOver()
        }
    }, 1000)
}

function gameOver() {
    questionContainer.style.display = "none"
    summary.style.display = "block"
    // Once `secondsLeft` gets to 0, set `timerDiv` to an empty string
    timerDiv.textContent = ''
    // Use `clearInterval()` to stop the timer
    clearInterval(timerInterval)
    // Call the `displayMessage()` function - display feedback
    var pointsDisplay = document.getElementById("score")
    pointsDisplay.textContent = points
    scoreContainer.style.display = "block"
}

// Initialize ccumulator variable `points` to zero.
var points = 0
// Add event listener to the `buttonDiv` that holds the answer buttons.
// If correct answer is clicked, question and answers will move to next question and answer
// in the question database.
buttonDiv.addEventListener("click", function (event) {
    event.preventDefault()
    // Assign strings to variables.
    var correctAnswer = "Correct!"
    var incorrectAnswer = "Wrong!"
    // Assign feedback element to variable.
    var feedback = document.getElementById("feedback")
    // Test that event is being picked up.
    console.log("TEST", event.target)
    // Assign `data-correct` boolean value to `dataAttribute` variable.
    var dataAttribute = event.target.getAttribute("data-correct")
    // Test to see if `dataAttribute` is a boolean, or a string (it is a string).
    console.log(typeof dataAttribute)
    // Test `dataAttibute`. 
    // if true, display `correctAnswer` string, and display next question. 
    if (dataAttribute === "true") {
        points++
        feedback.textContent = correctAnswer
        displayQuestion()
    }
    // if false, display `incorrectAnswer` string.
    else {
        feedback.textContent = incorrectAnswer
        // Subtract two seconds from timer.
        secondsLeft = secondsLeft - 2
        // Display next question.
        displayQuestion()
    } 
    console.log("points: ", points)
})




// write code for timer and score system
// add more questions
// iterate current question variable and call display question functions
// at end have an initial submission and a high score tracker (local storage)