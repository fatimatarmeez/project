const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),


    start: document.querySelector('button'),

}


const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)

        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }

    const emojis = ['التواضع', 'الصدق', 'الصبر', 'الحياء', 'الكرم', 'الشجاعة', 'العدل', 'الزهد']
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2)
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `

    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.timer.innerText = ` ${state.totalTime} :الوقت`
    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            /*selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `*/
            clearInterval(state.loop);


            // Display a SweetAlert pop-up
            const gameAudio = document.getElementById("gameAudio");
            gameAudio.play();


            Swal.fire({
                title: 'الصفة الثالثة :الخُلق العظيم ',
                text: '{  وإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ }',
                icon: 'success',
                confirmButtonText: ' المرحلة الرابعة',
            }).then((result) => {
                // If the player clicks "Play again," go to another HTML page
                if (result.isConfirmed) {
                    // Replace 'path-to-another-page.html' with the actual URL of the page you want to navigate to
                    // window.location.href = './level4.html';
                }
            });
        }, 1000);

    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}
const attachEventListeners1 = () => {
    const hammer = new Hammer(document.body);

    hammer.on('tap', event => {
        const target = event.target;

        if (target.className.includes('card') && !target.parentElement.className.includes('flipped')) {
            flipCard(target.parentElement);
        } else if (target.nodeName === 'BUTTON' && !target.className.includes('disabled')) {
            startGame();
        }
    });

    if ('ontouchstart' in window) {
        // If the device supports touch events, hide the button initially
        hideStartButton();
    }
};

generateGame()
attachEventListeners()
function showAlert() {
    hideStartButton();
    Swal.fire({
        title: 'المرحلة الثالثة',
        text: 'خلف هذه البطاقات كلمات تصف بعض من أخلاق النبي محمد(ص) عزيزتي عليك  أن تطابقي الأوصاف المتكررة مع بعضها ',
        confirmButtonText: 'تم'
    });
}
const hideStartButton = () => {
    selectors.start.style.display = 'none';
};

const showStartButton = () => {
    selectors.start.style.display = 'block';
};
