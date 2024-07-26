const hiraganaToRomaji = {
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "wo", "ん": "n",
    "カ": "ka", "キ": "ki", "ク": "ku", "ケ": "ke", "コ": "ko",
    "サ": "sa", "シ": "shi", "ス": "su", "セ": "se", "ソ": "so",
    "タ": "ta", "チ": "chi", "ツ": "tsu", "テ": "te", "ト": "to",
    "ナ": "na", "ニ": "ni", "ヌ": "nu", "ネ": "ne", "ノ": "no",
    "ハ": "ha", "ヒ": "hi", "フ": "fu", "ヘ": "he", "ホ": "ho",
    "マ": "ma", "ミ": "mi", "ム": "mu", "メ": "me", "モ": "mo",
    "ヤ": "ya", "ユ": "yu", "ヨ": "yo",
    "ラ": "ra", "リ": "ri", "ル": "ru", "レ": "re", "ロ": "ro",
    "ワ": "wa", "ヲ": "wo", "ン": "n"
};

const kanaBase = Object.keys(hiraganaToRomaji);

let correctAnswer = '';
let timer;
let timeLeft = 30;
let intervalId;
const wrongSound = document.getElementById('wrong-sound');

// Function to get a random Kana string
function getRandomKanaString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * kanaBase.length);
        result += kanaBase[randomIndex];
    }
    return result;
}

function displayQuestion() {
    const kanaString = getRandomKanaString(4);
    correctAnswer = kanaString.split('').map(char => hiraganaToRomaji[char] || hiraganaToRomaji[char]).join('');
    document.getElementById('kana').textContent = kanaString;
    document.getElementById('answer').value = '';  // Clear previous answer
    document.getElementById('result').textContent = '';  // Clear previous result
    document.getElementById('result').className = '';  // Reset result class

    timeLeft = 30;  // Reset timer
    updateTimer();  // Update timer display
    clearInterval(intervalId);  // Clear previous interval if any
    intervalId = setInterval(updateTimer, 1000);  // Start new interval for timer
}

// Function to handle visibility change
function handleVisibilityChange() {
    if (document.hidden) {
        // If page is hidden, stop the timer and show an alert
        clearInterval(intervalId);
        alert("Kata valdo kamu tidak boleh meninggalkan halaman ini ya..!!");
    } else {
        // If page is visible, display a new question
        displayQuestion();
    }
}

function submitAnswer() {
    const answer = document.getElementById('answer').value.trim().toLowerCase();
    const result = document.getElementById('result');

    if (answer === correctAnswer) {
        result.innerText = 'Jawaban Anda benar!';
        result.className = 'correct';
    } else {
        result.innerText = `Jawaban Anda salah. Jawaban yang benar adalah: ${correctAnswer}`;
        result.className = 'incorrect';
        wrongSound.play();  // Play wrong answer sound
    }

    // Display a new question after a short delay
    setTimeout(displayQuestion, 2000);
}

function updateTimer() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `Waktu tersisa: ${timeLeft} detik`;
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        displayQuestion();  // Change question when timer reaches 0
    }
}

// Initialize the quiz when the page loads
window.onload = function() {
    displayQuestion();
    document.addEventListener('visibilitychange', handleVisibilityChange);
};
