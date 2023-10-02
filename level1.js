var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
var winOrder = [...imgOrder].sort();

window.onload = function () {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");

            tile.id = "tile-" + r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";
            tile.className = "tile";
            tile.draggable = true;

            //touch
            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving another image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles


            document.getElementById("board").append(tile);
        }
    }
}

function dragStart(e) {
    currTile = this; //this refers to the img tile being dragged
    e.dataTransfer.setData("text/plain", this.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}




function dragDrop(e) {
    otherTile = this; //this refers to the img tile being dropped on
    const currTileId = e.dataTransfer.getData("text/plain");
    const currTileElement = document.getElementById(currTileId);
    const otherTileId = this.id;
    const otherTileElement = this;

    /*  if (!otherTileElement.src.includes("3.jpg")) {
          return;
      }
  */
    // Swap the tiles
    let currImg = currTileElement.src;
    let otherImg = otherTileElement.src;

    currTileElement.src = otherImg;
    otherTileElement.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
    checkWin();
}
function dragEnd() {

}









function touchStart(e) {

    currTile = this;
    e.preventDefault();
}

function touchMove(e) {
    e.preventDefault();

}

function touchEnd(e) {
    otherTile = this;
    const currTileId = currTile.id;
    const currTileElement = currTile;
    const otherTileId = otherTile.id;
    const otherTileElement = otherTile;

    // Swap the tiles (similar to dragDrop)
    let currImg = currTileElement.src;
    let otherImg = otherTileElement.src;

    currTileElement.src = otherImg;
    otherTileElement.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
    checkWin();
}

function checkWin() {
    var currentOrder = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tileId = "tile-" + r.toString() + "-" + c.toString();
            let tileElement = document.getElementById(tileId);
            let imgIndex = parseInt(tileElement.src.charAt(tileElement.src.length - 5));

            currentOrder.push(imgIndex.toString());
        }
    }

    if (currentOrder.join("") === winOrder.join("")) {
        // Display a win message or perform any other win-related actions
        showAlertWin();
    }
}

function showAlertWin() {
    winAudio.play();
    Swal.fire({
        title: 'الصفة الأولى: رَحْمَةً لِلْعَالَمِينَ',
        text: '{وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِلْعَالَمِينَ}',
        icon: 'success',
        confirmButtonText: 'المرحلة الثانية'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirect to another web page when the button is clicked
            window.location.href = './level2.html'; // Replace with your desired destination page URL
        }
    });
}





function showAlert() {
    Swal.fire({
        title: 'المرحلة الأولى',
        text: ' عزيزتي عليك ِ بتركيب الصورة التي تدل على إحدى صفات الرسول الأكرم"ص" المذكورة في القرآن االكريم. ملاحظة :تبديل قطع الصورة يكون من خلال استخدام الاصبعين ',

        confirmButtonText: 'تم'
    });
}
