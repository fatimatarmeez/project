document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const tileSize = 25;

    canvas.height = tileSize * 22;
    canvas.width = tileSize * 20;

    const player = {
        x: canvas.width - tileSize,
        y: canvas.height - (tileSize * 5),
        radius: tileSize / 4,
        prevPos: {}
    };

    let animation;

    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;

    // Initialize Hammer.js for touch gestures on the canvas element
    const hammer = new Hammer(canvas);

    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    hammer.on("swipeleft", function () {
        // Handle left swipe
        leftPressed = true;
        rightPressed = false;
    });

    hammer.on("swiperight", function () {
        // Handle right swipe
        rightPressed = true;
        leftPressed = false;
    });

    hammer.on("swipeup", function () {
        // Handle up swipe
        upPressed = true;
        downPressed = false;
    });

    hammer.on("swipedown", function () {
        // Handle down swipe
        downPressed = true;
        upPressed = false;
    });

    // Add touch event listeners for touch controls
    canvas.addEventListener("touchstart", handleTouchStart, false);
    canvas.addEventListener("touchmove", handleTouchMove, false);
    canvas.addEventListener("touchend", handleTouchEnd, false);

    let touchStartX = null;
    let touchStartY = null;

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
        if (touchStartX === null || touchStartY === null) {
            return;
        }

        const touchEndX = event.touches[0].clientX;
        const touchEndY = event.touches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Determine the primary direction of the swipe
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                // Swipe right
                rightPressed = true;
                leftPressed = false;
            } else {
                // Swipe left
                leftPressed = true;
                rightPressed = false;
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                // Swipe down
                downPressed = true;
                upPressed = false;
            } else {
                // Swipe up
                upPressed = true;
                downPressed = false;
            }
        }

        touchStartX = null;
        touchStartY = null;
    }

    function handleTouchEnd() {
        // Reset the touch controls when the touch ends
        touchStartX = null;
        touchStartY = null;
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
    }

    const map = [
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    ];

    var tiles = [];
    for (var i = 0; i < map.length; i++) {
        tiles[i] = [];
        for (var j = 0; j < map[i].length; j++) {
            tiles[i][j] = { x: 0, y: 0, type: "" };
        }
    };


    function drawBoard() {
        ctx.fillStyle = "#03011f";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawMaze() {
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                let tileX = j * tileSize;
                let tileY = i * tileSize;
                tiles[i][j].x = tileX;
                tiles[i][j].y = tileY;
                if (map[i][j] === 1) {
                    tiles[i][j].type = "wall";
                    drawWall(tileX, tileY);
                } else {
                    drawEmpty(tileX, tileY);
                }
            }
        }
    }

    function drawWall(x, y) {
        ctx.fillStyle = "#F2C2F2";
        ctx.fillRect(x, y, tileSize, tileSize);
    }

    function drawEmpty(x, y) {
        ctx.fillStyle = "#038C7F";
        ctx.fillRect(x, y, tileSize, tileSize);
    }

    function drawPlayer() {
        ctx.beginPath();
        ctx.arc(player.x + tileSize / 2, player.y + tileSize / 2, player.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    function updatePosition() {
        player.prevPos = { x: player.x, y: player.y };
        if (rightPressed) {
            player.x += 2;
        }
        if (leftPressed) {
            player.x -= 2;
        }
        if (upPressed) {
            player.y -= 2;
        }
        if (downPressed) {
            player.y += 2;
        }

    }

    function checkCollision() {
        if (player.x + tileSize > canvas.width) {
            console.log("That is where you started");
            player.x = player.prevPos.x;
        }
        if (player.y + player.radius < 0) {
            console.log("You won!");
            player.y = player.prevPos.y;
            cancelAnimationFrame(animation);
            gameOver();


        }
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                var b = tiles[i][j];
                if (player.x + player.radius * 3 > b.x && player.x < b.x + tileSize - player.radius && player.y + tileSize > b.y + player.radius && player.y < b.y + tileSize - player.radius && b.type === "wall") {

                    player.x = player.prevPos.x;
                    player.y = player.prevPos.y;

                }
            }
        }


    }
    function initializeGame() {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        const tileSize = 25;

        // Set the CSS width and height properties to make it appear smaller
        canvas.style.width = (tileSize * 12) + "px"; // Adjust the width as needed
        canvas.style.height = (tileSize * 16) + "px"; // Adjust the height as needed

        // Maintain the actual canvas dimensions
        canvas.width = tileSize * 20;
        canvas.height = tileSize * 22;

        drawBoard();
        drawMaze();
        drawPlayer();

        // Start the game loop
        animation = requestAnimationFrame(update);
    }

    function gameOver() {
        drawBoard();
        canvas.style.visibility = "hidden";
        //var win = document.querySelector(".win");
        //win.style.visibility = "visible";
        const startButton = document.querySelector(".styled-button");
        startButton.style.display = "none";
        showAlertWin();

    }

    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 37) {
            leftPressed = true;
        } else if (e.keyCode === 39) {
            rightPressed = true;
        } else if (e.keyCode === 38) {
            upPressed = true;
        } else if (e.keyCode === 40) {
            downPressed = true;
        }
    })



    document.addEventListener("keyup", function (e) {
        if (e.keyCode === 37) {
            leftPressed = false;
        } else if (e.keyCode === 39) {
            rightPressed = false;
        } else if (e.keyCode === 38) {
            upPressed = false;
        } else if (e.keyCode === 40) {
            downPressed = false;
        }
    })



    drawBoard();
    drawMaze();
    drawPlayer();

    function update() {
        updatePosition();
        drawBoard();
        drawMaze();

        drawPlayer();
        checkCollision();
        animation = requestAnimationFrame(update);
    }

    animation = requestAnimationFrame(update);
    initializeGame();
});

function showAlert() {
    Swal.fire({
        title: 'المرحلة الثانية',
        text: '   عزيزتي عليك ِ أن تجدي الطريق الصحيح للخروج من هذه المتاهة عند اكتشافك للطريق  سوف تتعرفين على الصفة الثانية للنبي محمد (ص) تلميح طريق الخروج من المتاهة من الجهةالعليا حيث ان نهاية الطريق بشكل عامودي',

        confirmButtonText: 'تم'
    });
}
function showAlertWin() {
    const gameOverAudio = document.getElementById("gameOverAudio");
    gameOverAudio.play();

    Swal.fire({
        title: 'الصفة الثانية: الهادي إلى صراطٍ مستقيم ',
        text: '(وَإِنَّكَ لَتَهْدِي إِلَى صِرَاطٍ مُسْتَقِيمٍ)',
        icon: 'success',
        confirmButtonText: 'المرحلة الثالثة'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirect to another webpage when the button is clicked
            window.location.href = './level3.html';
        }
    });
}
