const inputs = document.querySelector(".inputs"),
    hintTag = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess-left span"),
    wrongLetter = document.querySelector(".wrong-letter span"),
    resetBtn = document.querySelector(".reset-btn"),
    typingInput = document.querySelector(".typing-input");
styledbutton = document.querySelector(".styled-button");


let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if (key.match(/^[A-Za-z\u0600-\u06FF]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if (correctLetters.length === word.length) {
            const gamem = document.getElementById("game4");
            gamem.play();

            Swal.fire({
                icon: 'success',
                title: 'الصفة الرابعة :الشاهد/البشير/النذير/الداعي الى الله/السراج المنير',
                text: '{يا أَيُّهَا النَّبِيُّ إِنَّآ أَرْسَلْنَاكَ شَاهِداً وَمُبَشِّراً وَنَذِيراً* وَدَاعِياً إِلَى اللَّهِ بِإِذْنِهِ وَسِرَاجاً مُّنِير}',
                confirmButtonText: 'المرحلة الخامسة',

            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to another webpage when the button is clicked
                    window.location.href = './level5.html';
                }
            });
        } else if (maxGuesses < 1) {
            Swal.fire({
                icon: 'error',
                title: 'حاول مرّة أخرى',
                confirmButtonText: 'تم'
            }).then(() => {
                for (let i = 0; i < word.length; i++) {
                    inputs.querySelectorAll("input")[i].value = word[i];
                }
                randomWord();
            });
        }
    }, 100);
}
function showAlert() {
    //hideStartButton();
    Swal.fire({
        title: 'المرحلة الرابعة ',
        text: 'عزيزتي عليك أن تقرأي التلميح و وتخمّني الكلمة التي سوف ترشدك لأحدى الصفات التي ذكرها القرآن في آية واحدة واصفا النبي محمد(ص)',
        confirmButtonText: 'تم'
    });
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());

styledButton.addEventListener("click", showAlert);
styledButton.addEventListener("touchstart", showAlert);
resetBtn.addEventListener("click", showAlert);
resetBtn.addEventListener("touchstart", showAlert);
resetBtn.addEventListener("click", randomWord);
resetBtn.addEventListener("touchstart", randomWord);

typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());