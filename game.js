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
        // Optionally, start the game or initialize UI here
    })
    .catch(error => console.error('Error loading segments:', error));

function startGame() {
    window.location.href = 'game.html';
}

function showQuestion() {
    const segment = segments[currentSegment];
    document.getElementById('segment-title').innerText = segment.title;
    document.getElementById('segment-image').src = segment.image;
    document.getElementById('scene-introduction').innerText = segment.introduction;
    document.getElementById('question-container').style.display = 'block';

    // Randomize question order
    const question = segment.questions[Math.floor(Math.random() * segment.questions.length)];
    document.getElementById('question-text').innerText = question.text;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    // Randomize answer order
    const shuffledAnswers = question.answers.map((a, i) => ({ text: a, index: i }))
        .sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.onclick = () => selectAnswer(answer.index, question.correct);
        answersDiv.appendChild(button);
    });

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
    // Logic to submit answer and move to next question
    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    currentSegment++;
    if (currentSegment < segments.length) {
        showQuestion();
    } else {
        // End of game logic
        alert('Game Over! Your final score is: ' + score);
    }
}
