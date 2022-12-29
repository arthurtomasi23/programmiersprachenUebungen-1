let rows = 3;
let columns = 3;
//let gridSize = 3
let currentTile; //the clicked tile
let blankTile; //the blank tile
let turns = 0;

let imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
//let imgOrder = ["2", "6", "3", "9", "5", "8", "4", "1", "7"]

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);
            
            document.getElementById("gameBoard").append(tile);
        }
    }
}

function dragStart() {
    currentTile = this; //while Tile is being dragged
}

function dragOver(e) {
    e.preventDefault(); //while hoverig over another tile
}

function dragEnter(e) {
    e.preventDefault(); //while enterig the tile you want to swap with
}

function dragLeave() {
                        //taking a tile and leave the original position
}

function dragDrop() {
    blankTile = this; //when the dragged image is beeing dopped on the blank Image/blankTile
}

function dragEnd() {
    let currentImg = currentTile.src;
    let blankImg = blankTile.src;

    currentTile.src = blankImg;
    blankTile.src = currentImg;
}