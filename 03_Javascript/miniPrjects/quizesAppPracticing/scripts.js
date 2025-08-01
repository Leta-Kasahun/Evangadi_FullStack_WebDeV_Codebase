const questions = [
    {
        question: "What is a JavaScript object?",
        options: {
            a: "A collection of functions",
            b: "A collection of key-value pairs",
            c: "A type of array",
            d: "A loop structure"
        },
        answer: "b"
    },
    {
        question: "Which keyword refers to the current object in a method?",
        options: {
            a: "self",
            b: "object",
            c: "this",
            d: "current"
        },
        answer: "c"
    },
    {
        question: "How do you access a property in an object?",
        options: {
            a: "object-property",
            b: "object->property",
            c: "object.property",
            d: "object:property"
        },
        answer: "c"
    },
    {
        question: "Which method removes the last element of an array?",
        options: {
            a: "shift()",
            b: "unshift()",
            c: "pop()",
            d: "push()"
        },
        answer: "c"
    },
    {
        question: "What is destructuring in JS?",
        options: {
            a: "Destroying objects",
            b: "Looping through objects",
            c: "Extracting values from objects or arrays",
            d: "Converting to string"
        },
        answer: "c"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

function loadQuestion() {
    const questionData = questions[currentQuestion];
    document.getElementById("questionText").textContent = questionData.question;
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";
    document.getElementById("scoreDisplay").textContent = "";
    document.getElementById("timer").textContent = "Time left: 10s";
    timeLeft = 10;

    for (let key in questionData.options) {
        const btn = document.createElement("button");
        btn.textContent = `${key.toUpperCase()}: ${questionData.options[key]}`;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(key, btn);
        optionsContainer.appendChild(btn);
    }

    startTimer();
}

function checkAnswer(selectedKey, button) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestion].answer;
    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => btn.disabled = true);

    if (selectedKey === correctAnswer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        allButtons.forEach(btn => {
            if (btn.textContent.startsWith(correctAnswer.toUpperCase())) {
                btn.classList.add("correct");
            }
        });
    }

    document.getElementById("scoreDisplay").textContent = `Score: ${score}/${questions.length}`;
}

function nextQuestion() {
    clearInterval(timer);
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        document.getElementById("quiz").innerHTML = "<h2>🎉 Quiz Complete!</h2>";
        document.getElementById("scoreDisplay").textContent = `Final Score: ${score}/${questions.length}`;
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            autoFail();
        }
    }, 1000);
}

function autoFail() {
    const correctAnswer = questions[currentQuestion].answer;
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent.startsWith(correctAnswer.toUpperCase())) {
            btn.classList.add("correct");
        }
    });

    document.getElementById("scoreDisplay").textContent = `Score: ${score}/${questions.length} (Time's up!)`;
}

loadQuestion();