let rows = 3;
let columns = 3;
let currentTile; //the clicked tile
let blankTile; //the blank tile
let turns = 0; //the turns
let shuffled = false;

let initialOrder = []; // Array to store the initial order of the images
let currentOrder = []; // Array to store the current order of the images


let gridSizeButton = document.getElementById("gridSize")

const slices = [];
const uploadedImage = document.getElementById('test');

let shuffleButton = document.getElementById("shuffle");

let winningScreen = document.getElementById("winningScreen");

window.onload = function() {
    sliceImage(uploadedImage);
    drawGameBoard();
    saveInitialOrder();

    //grid Size Button
    gridSizeButton.addEventListener('change', function() {
        let buttonValue = this.value;
        rows = buttonValue;
        columns = buttonValue;
        deleteGameBoard();
        sliceImage(uploadedImage);
        drawGameBoard();
    });

    //shuffle Button
    shuffleButton.addEventListener('click', shuffle);
    //shuffle Button activates the shuffled into true
    shuffleButton.addEventListener('click', function() {
        shuffled = true;
    });
}

function saveInitialOrder() {
    let images = document.querySelectorAll("#gameBoard img");
    for (let i = 0;i < images.length; i++) {
        initialOrder.push(images[i].src);
    }
}
//compares the order of the pieces before they have been shuffled with the order of the pieces after very move
function compareToInitialOrder() {
    currentOrder= [];
    let images = document.querySelectorAll("#gameBoard img");
    for (let i = 0;i < images.length; i++) {
        currentOrder.push(images[i].src);
    }

    if (initialOrder.join() === currentOrder.join()) {
        console.log("Everything is in the right place");
        winningScreen.classList.add("winningScreenEnabled");
    } else {
        console.log("still not all pieces in the right place")
    }
}

//shuffles the array of numbers
function shuffle() {
    //https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way
    slices.sort(() => 0.5 - Math.random());
    deleteGameBoard();
    drawGameBoard();
}

//deletes the gameBoard so the new shuffled gameBoard can appear correctly
function deleteGameBoard() {
    document.getElementById("gameBoard").innerHTML = "";
}

//drawing the gameboard an setting the heights and widths for the tiles
function drawGameBoard() {
    let index = 0;
    
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {
            //creates img ids so i can later use them to find out if to tiles are next to each other
            let tile = document.createElement("img");
            tile.width = (600/rows)-4;
            tile.height = (600/columns)-4;
            tile.id = r.toString () +  "-" + c.toString(); //getting the id of the slices (0-0)
            tile.src = slices[index].data; //(could also be index++, then i wouldn't need)
            //tile.src = slice.src;
            //finds out where the last puzzle piece is and replaces it with the blank tile
            if(slices[index].name == columns * rows + ".jpg") {
                tile.src = "assets/blankTile.jpg"
            }
            //console.log(slices[index].name);

            //all events for the drag and drop action
            tile.addEventListener("dragstart", dragStart); //beginn to drag a tile
            tile.addEventListener("dragover", dragOver); //dragging a tile over another tile(hovering with clicked tile over another)
            tile.addEventListener("dragenter", dragEnter); //entering the space of the tile you want to swap with
            tile.addEventListener("dragleave", dragLeave); //leaving the space of the tile you want to swap with
            tile.addEventListener("drop", dragDrop); //letting go of the mouse while being over the tile you want to swap with
            tile.addEventListener("dragend", dragEnd); //clicked tile swaps with the blank tile
            
            document.getElementById("gameBoard").append(tile);

            index += 1;
        }
    }
}

//all the steps while the dag and drop action 
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
    if(!blankTile.src.includes("blankTile.jpg")) {
        return;
    }
    //finds the coordinates of the clicked tile
    let currentCoordinates = currentTile.id.split("-"); //split() seperates the coordinates by the "-" -->now its an array of two 0s 
    let r = parseInt(currentCoordinates[0]); //parseInt takes the first part of the array and makes it into a integer
    let c = parseInt(currentCoordinates[1]); //and here the same with the second part of the array
    
    //finds the coordinates of the blank tile
    let blankCoordinates = blankTile.id.split("-");
    let r2 = parseInt(blankCoordinates[0]);//takes the first number of the array
    let c2 = parseInt(blankCoordinates[1]);//takes the second number of the array

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
    compareToInitialOrder();
    //only starts the game when the gameboard was shuffled
    if (shuffled) {
        turns +=1;
    }
    
    //starts the timer when the first turn was made
    if (turns === 1) {
        startTimer();
    }

    document.getElementById("turns").innerText = turns; //counting the turns
    }
}
//timer function that starts with the first turn
let timerInterval;
function startTimer() {
  let time = 0;
    timerInterval = setInterval(function () {
        time++;
        //making the Timer in seconds and minutes
        let minutes = Math.floor(time/60); //minutes
        let seconds = time % 60; //seconds
        if(minutes < 10) {
            minutes = "0" + minutes; //sets the zero until the minutes are 10
        }
        if(seconds < 10) {
            seconds = "0" + seconds; //sets the zero until the seconds are over 10
        }
        document.getElementById("timer").innerText = minutes + ":" + seconds;
    }, 1000);
}

//not used now
// function stopTimer() {
//   clearInterval(timerInterval);
// }

function sliceImage(image) {
    // reset values of array
    slices.length = 0;

    let count = 1;
    sliceSizeHeight = image.height / rows; //setting the number of slices
    sliceSizeWidth = image.width / columns;
    //sizing the slices and setting the positions from which the function slicesthe different pieces of the puzzle
    for (let y = 0; y < image.height; y += sliceSizeHeight) {
        for (let x = 0; x < image.width; x += sliceSizeWidth) {
        const canvas = document.createElement('canvas');
        canvas.width = sliceSizeWidth; //setting the height and width of the slizes
        canvas.height = sliceSizeHeight; //setting the height and width of the slizes
        const context = canvas.getContext('2d');

        context.drawImage(image, x, y, sliceSizeWidth, sliceSizeHeight, 0, 0, sliceSizeWidth, sliceSizeHeight);
        //naming the slices from 1.jpg to 9.jpg
        //stores the name and data in the object "slice"
        const slice = {
          name: count + '.jpg', //the new images are stored in the variable "name" (e.g. 1.jpg)
          data: canvas.toDataURL(),
        };
        slices.push(slice); //pushing the slices in the slice array
        count++;
        }
    }
}