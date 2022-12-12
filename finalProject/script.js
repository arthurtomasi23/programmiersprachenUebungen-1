//making the grid
const rows = 3
const columns = 3
//labeling current Tile and the blank Tile the current Tile will switch to if clicked
let currenTile;
let blankTile; //one tile needs to be empty
const numbers = [1,2,3,4,5,6,7,8,9];
let turns = 0;

const numbersOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

window.onload = function() {
    console.log("working")
    for (let r=0; r < numbers.length; r++) {
        for (let c=0; c < columns; c++) {
        //creating the <div> tag
            const tile = document.createElement("div");
            //finding aout the position of the numbers inside the grid so you can only switch tiles which are next to each other
            // tile.id = r.toString()+ "-" + c.toString();
            // tile.src = numbersOrder.shift();
            //adding the numbers inside a div insinde the game-Board div
            tile.classList.add("tile")
            tile.style.top = "0px"
            tile.style.left = "0px"
            tile.innerHTML = r
            document.getElementById("game-Board").append(tile);
        }
    }
}