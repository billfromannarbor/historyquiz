let score = 0;
let currentSegment = 0;
let segments = [];
let timer;
let timeRemaining = 30;
let userLevel = 2;

// Fetch segments from segments.json
fetch('segments.json')
    .then(response => response.json())
    .then(data => {
        segments = shuffleArray(data);
    })
    .catch(error => console.error('Error loading segments:', error));

function startGame() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    segments = shuffleArray(segments);
    currentSegment = 0;
    showNewQuestionSegment();
}

function showNewQuestionSegment() {
    var segment = segments[currentSegment];
    
    document.getElementById('segment-title').innerText = segment.title;
    document.getElementById('segment-image').src = segment.image;
    document.getElementById('scene-introduction').innerText = segment.introduction;
    document.getElementById('question-container').style.display = 'none';
}

function showQuestion() {
    const segment = segments[currentSegment];
    const question = segment.questions[userLevel]; //Todo get a question based on their level
    document.getElementById('question-text').innerText = question.text;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    const shuffledAnswers = shuffleArray(question.answers.map((answer, index) => ({
        text: answer,
        index: index
    })));

    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.onclick = () => selectAnswer(answer.index);
        answersDiv.appendChild(button);
    });

    document.getElementById('question-container').style.display = 'block';
    startTimer();
}

function selectAnswer(selected) {
    // Highlight the selected button
    const buttons = document.querySelectorAll('#answers button');
    buttons.forEach((button, index) => {
        if (index === selected) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
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

function submitAnswer() {
    clearInterval(timer);

    if (selected === correct) {
        score += Math.round((50 * (timeRemaining / 30)));
    }
    document.getElementById('score-display').innerText = `Score: ${score}`;
    document.getElementById('score-display').style.display = 'block';
    document.getElementById('correct-answer').innerText = `Correct Answer: ${segments[currentSegment].questions[0].answers[correct]}`;
    document.getElementById('correct-answer').style.display = 'block';
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

function shuffleArray(array) {
    console.log('Original array:', array);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log('Shuffled array:', array);
    return array;
}

module.exports = { shuffleArray };
