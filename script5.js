const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word");
styledButton = document.querySelector(".styled-button");
let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        //alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        showTimeOffAlert();
        initGame();
    }, 1000);
}
function showTimeOffAlert() {
    Swal.fire({
        icon: 'error',
        title: 'انتهى الوقت!',
        text: `${correctWord.toUpperCase()} كانت الكلمة الصحيحة`,
        confirmButtonText: 'تم'
    });
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();
const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) {
        Swal.fire({
            icon: 'error',
            title: 'لم تدخل الكلمة!',
            confirmButtonText: 'تم'
        });
    } else if (userWord !== correctWord) {
        Swal.fire({
            icon: 'error',
            title: 'الكلمة غير صحيحة ! حاول مرة أخرى',
            confirmButtonText: 'تم'
        });
    } else {
        const gamen = document.getElementById("game5");
        gamen.play();
        Swal.fire({
            icon: 'success',
            title: 'الصفة الخامسة: محمد رسول الله',
            text: ' ( مُحَمَّدٌ رَسُولُ اللَّهِ وَالَّذِينَ مَعَهُ أَشِدَّاءُ عَلَى الْكُفَّارِ رُحَمَاءُ بَيْنَهُمْ )',
            confirmButtonText: 'المرحلة الأخيرة',

        }).then((result) => {
            if (result.isConfirmed) {
                // Redirect to another webpage when the button is clicked
                window.location.href = './last.html';
            }
        });
    }
    initGame();
}


styledButton.addEventListener("click", showAlert);
refreshBtn.addEventListener("click", initGame);
refreshBtn.addEventListener("touchstart", initGame);

checkBtn.addEventListener("click", checkWord);
checkBtn.addEventListener("touchstart", checkWord);

styledButton.addEventListener("click", showAlert);
styledButton.addEventListener("touchstart", showAlert);

function showAlert() {
    //hideStartButton();
    Swal.fire({
        title: 'المرحلة الخامسة ',
        text: 'عزيزتي عليك أن تقرأي التلميح و ترتّبي الأحرف المبعثرة لتتعرفي على أسماء النبي  (ص) الواردة في القرآن الكريم لا تقلقي ان لم تعرفي الاجابة الصحيحة عند انتهاء الوقت سوف تظهر الاجابة الصحيحة و يمكنك في اي وقت الضغط على اعادة المحاولة ليظهر لك تلميح جديد',
        confirmButtonText: 'تم'
    });
}