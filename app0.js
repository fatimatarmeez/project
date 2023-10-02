const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const section = document.querySelector("section");
const image_container = document.querySelector(".imgContainer");
const opacity = document.querySelectorAll(".opacity");
const border = document.querySelector(".border");

let header_height = header.offsetHeight;
let section_height = section.offsetHeight;

window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();

    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + section_height);
    })

    big_title.style.opacity = - scroll / (header_height / 2) + 1;
    shadow.style.height = `${scroll * 0.5 + 300}px`;

    content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
    image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

    border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
})
function playButtonClickSound() {
    const buttonSoundw = document.getElementById("buttonSound");
    buttonSoundw.play();
}

document.getElementById("goToGame2Button").addEventListener("click", function () {
    // Play the button click sound
    playButtonClickSound();

    // Delay the navigation to the second game after the sound has finished playing
    setTimeout(function () {
        window.location.href = "level1.html";
    }, 1000); // Adjust the delay time (in milliseconds) as needed
});

document.getElementById("goToGame2Button").addEventListener("touchstart", function (e) {
    e.preventDefault(); // Prevent default touchstart behavior (e.g., scrolling)

    // Play the button click sound
    playButtonClickSound();

    // Delay the navigation to the second game after the sound has finished playing
    setTimeout(function () {
        window.location.href = "level1.html";
    }, 1000); // Adjust the delay time (in milliseconds) as needed
});
