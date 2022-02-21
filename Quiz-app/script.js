const quizData = [
    {
        question: "What is my name?",
        a: "Kewin",
        b: "Mohsen",
        c: "Joe",
        d: "Mike",
        correct: "b"
    },
    {
        question: "Who is the President of Canada?",
        a: "Pierson",
        b: "Hazard",
        c: "Trudeau",
        d: "Elfi",
        correct: "c"
    },
    {
        question: "What is the best programming language in 2020?",
        a: "HTML",
        b: "C#",
        c: "Java",
        d: "Python",
        correct: "d"
    },
    {
        question: "What is the SUV?",
        a: "the type of car",
        b: "the name of province",
        c: "name of the viruse",
        d: "none of theme",
        correct: "a"
    }
]

let currentQuiz = 0;
let score = 0;
let answer = undefined;
let correct = undefined;

const quizEl = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const text_a = document.getElementById("text_a");
const text_b = document.getElementById("text_b");
const text_c = document.getElementById("text_c");
const text_d = document.getElementById("text_d"); 
const submitBtn = document.getElementById("submit");

loadQuiz();
getSelected()

function loadQuiz() {
    deselect();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    text_a.innerText = currentQuizData.a;
    text_b.innerText = currentQuizData.b;
    text_c.innerText = currentQuizData.c;
    text_d.innerText = currentQuizData.d;
    correct = currentQuizData.correct;
}

function getSelected() {
    const answerEls = document.querySelectorAll(".answer");

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselect() {
    let answerEls = document.querySelectorAll(".answer");
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answerEl.checked = false;
        }
    });
}

submitBtn.addEventListener("click", () => {
    const selectedAnswer = getSelected();
    if (selectedAnswer != undefined) {
        if (selectedAnswer === correct) {
            score++;
        }
        currentQuiz++;
        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quizEl.innerHTML = `
                <h2>You'r corrct answer is ${score}/${quizData.length}</h2> 
                <button style = "margin-top: 1.5rem;" onclick ="location.reload()">Restart</button>
            `;
            quizEl.style.paddingTop = "2rem";
            quizEl.style.textAlign = "center";
        }
    }
});