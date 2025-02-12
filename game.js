let score = 0;
let currentSegment = 0;
let segments = [];
let timer;
let timeRemaining = 30;

// Fetch segments from segments.json
fetch('segments.json')
    .then(response => response.json())
    .then(data => {
        segments = data;
        // Shuffle questions for each segment
        segments.forEach(segment => {
            segment.questions = shuffleArray(segment.questions);
        });
    })
    .catch(error => console.error('Error loading segments:', error));

function startGame() {
    showNewQuestionSegment();
}

function showNewQuestionSegment() {
    const segment = segments[currentSegment];
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('segment-title').innerText = segment.title;
    document.getElementById('segment-image').src = segment.image;
    document.getElementById('scene-introduction').innerText = segment.introduction;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
}

function showQuestion() {
    const segment = segments[currentSegment];
    const question = segment.questions[0]; // Get the first question after shuffling
    document.getElementById('question-text').innerText = question.text;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    // Shuffle answers
    const shuffledAnswers = shuffleArray(question.answers.map((answer, index) => ({
        text: answer,
        index: index
    })));

    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.onclick = () => selectAnswer(answer.index, question.correct);
        answersDiv.appendChild(button);
    });

    document.getElementById('question-container').style.display = 'block';
    startTimer();
}

function startTimer() {
    timeRemaining = 30;
    document.getElementById('timer').innerText = `Time: ${timeRemaining}s`;
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').innerText = `Time: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

function selectAnswer(selected, correct) {
    clearInterval(timer);
    if (selected === correct) {
        score += Math.round((50 * (timeRemaining / 30)));
    }
    document.getElementById('score-display').innerText = `Score: ${score}`;
    // Show correct answer and explanation
    document.getElementById('correct-answer').innerText = `Correct Answer: ${segments[currentSegment].questions[0].answers[correct]}`;
    document.getElementById('next-button').style.display = 'block';
}

function submitAnswer() {
    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    currentSegment++;
    if (currentSegment < segments.length) {
        showNewQuestionSegment();
    } else {
        showGameOver();
    }
}

function showGameOver() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('game-over-container').style.display = 'block';
    document.getElementById('final-score').innerText = `Your final score is: ${score}`;
}

function restartGame() {
    score = 0;
    currentSegment = 0;
    document.getElementById('game-over-container').style.display = 'none';
    startGame();
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
