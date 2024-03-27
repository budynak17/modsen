
const questions = [
    {
        question: "How many planets are in the solar system?",
        answers: ["8", "9", "10"],
        correctAnswer: "8"
    },
    {
        question: "What is the freezing point of water?",
        answers: ["0", "-5", "-6"],
        correctAnswer: "0"
    },
    {
        question: "What is the longest river in the world?",
        answers: ["Nile", "Amazon", "Yangtze"],
        correctAnswer: "Nile"
    },
    {
        question: "How many chromosomes are in the human genome?",
        answers: ["42", "44", "46"],
        correctAnswer: "46"
    },
    {
        question: "Which of these characters are friends with Harry Potter?",
        answers: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"],
        correctAnswer: ["Ron Weasley", "Hermione Granger"]
    },
    {
        question: "What is the capital of Canada?",
        answers: ["Toronto", "Ottawa", "Vancouver"],
        correctAnswer: "Ottawa"
    },
    {
        question: "What is the Jewish New Year called?",
        answers: ["Hanukkah", "Yom Kippur", "Rosh Hashanah"],
        correctAnswer: "Rosh Hashanah"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result");
const counterText = document.getElementById("counter");
const multipleInfo = document.getElementById("multiple-info");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    nextButton.disabled = true;
    resultContainer.style.display = "none";
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;

    if (Array.isArray(question.correctAnswer)) {
        multipleInfo.style.display = "block";
    } else {
        multipleInfo.style.display = "none";
    }

    answerButtonsElement.innerHTML = "";
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("button");
        button.addEventListener("click", () => selectAnswer(answer, question.correctAnswer));
        answerButtonsElement.appendChild(button);
    });
    counterText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function selectAnswer(selectedAnswer, correctAnswer) {
    if (Array.isArray(correctAnswer)) {
        if (selectedAnswers.length === 0) {
            selectedAnswers.push(selectedAnswer);
            Array.from(answerButtonsElement.children).forEach(button => {
                if (button.innerText === selectedAnswer) {
                    if (correctAnswer.includes(selectedAnswer)) {
                        button.style.backgroundColor = "lightgreen";
                    } else {
                        button.style.backgroundColor = "salmon";
                    }
                }
            });
        } else if (selectedAnswers.length === 1) {
            selectedAnswers.push(selectedAnswer);
            let isCorrect = true;
            selectedAnswers.forEach(answer => {
                if (!correctAnswer.includes(answer)) {
                    isCorrect = false;
                }
            });

            if (isCorrect) {
                score++;
                document.getElementById("counter").style.color = "green";
            } else {
                document.getElementById("counter").style.color = "red";
            }

            Array.from(answerButtonsElement.children).forEach(button => {
                button.disabled = true;
                if (correctAnswer.includes(button.innerText)) {
                    button.style.backgroundColor = "lightgreen";
                } else {
                    button.style.backgroundColor = "salmon";
                }
            });
            nextButton.disabled = false;
        }
    } else {
        let isCorrect = selectedAnswer === correctAnswer;

        if (isCorrect) {
            score++;
            document.getElementById("counter").style.color = "green";
        } else {
            document.getElementById("counter").style.color = "red";
        }

        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
            if (button.innerText === correctAnswer) {
                button.style.backgroundColor = "lightgreen";
            } else {
                button.style.backgroundColor = "salmon";
            }
        });
        nextButton.disabled = false;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.disabled = true;
        document.getElementById("counter").style.color = "#000";
    } else {
        showResult();
    }
}

function showResult() {
    resultText.innerText = `You got ${score} out of ${questions.length} questions correct!`;
    resultContainer.style.display = "block";
}

function restartQuiz() {
    startQuiz();
}

startQuiz();
