let rows = 3;
let columns = 3;
//let gridSize = 3
let currentTile; //the clicked tile
let blankTile; //the blank tile
let turns = 0;

let shuffleButton = document.getElementById("shuffle");

let imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

//let imgOrder = ["3", "6", "2", "7", "5", "8", "4", "1", "9"]

window.onload = function() {
    drawGameBoard();

    shuffleButton.addEventListener('click', shuffle);
}

function shuffle() {
    //https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way
    imgOrder.sort(() => 0.5 - Math.random());

    deleteGameBoard();
    drawGameBoard();
}

function deleteGameBoard() {
    document.getElementById("gameBoard").innerHTML = "";
}

function drawGameBoard() {
    let index = 0;
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {
            //that creates image id's for all the tiles(imagesnippets) 
            //so i can later use them to find out if to tiles are next to each other
            let tile = document.createElement("img");
            tile.id = r.toString () +  "-" + c.toString();
            tile.src = "assets/" + imgOrder[index++] + ".jpg";

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
    if(!blankTile.src.includes("9.jpg")) {
        return;
    }
    //finds the coordinates of the clicked tile
    let currentCoordinates = currentTile.id.split("-"); //split() seperates the coordinates by the "-" -->now its an array of two 0s 
    let r = parseInt(currentCoordinates[0]); //parseInt takes the first part of the array and makes it into a integer
    let c = parseInt(currentCoordinates[1]); //and here the same with the second part of the array
    
    //finds the coordinates of the blank tile
    let blankCoordinates = blankTile.id.split("-");
    let r2 = parseInt(blankCoordinates[0]);
    let c2 = parseInt(blankCoordinates[1]);

    //setting the positions from witch we can swap with the blank tile
    //the tiles have to be next to the blank tile(to the right/left/over or under the blank tile)
    let toTheLeft = r == r2 && c2 == c-1;
    let toTheRight = r == r2 && c2 == c+1;
    let over = c == c2 && r2 == r-1;
    let under = c == c2 && r2 == r+1;

    let isNextTo = toTheLeft || toTheRight || over || under;

    if(isNextTo) {
    let currentImg = currentTile.src;
    let blankImg = blankTile.src;

    currentTile.src = blankImg;
    blankTile.src = currentImg;
    
    turns +=1;

    if(turns == 1) {
        startTimer();
    }

    document.getElementById("turns").innerText = turns;
    }
}

let timerInterval;
function startTimer() {
  let time = 0;
    timerInterval = setInterval(function () {
        time++;
        
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        if(seconds < 10) {
            seconds = "0" + seconds;
        }
        document.getElementById("timer").innerText = minutes + ":" + seconds;
    }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}
