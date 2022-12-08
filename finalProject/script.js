//making the grid
var rows = 3
var columns = 3
//labeling current Tile and the blank Tile the current Tile will switch to if clicked
var currenTile;
var blankTile; //one tile needs to be empty
const numbers [1,2,3,4,5,6,7,8,9];
var turns = 0;

var numbersOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns, c++) {
        //creating the <div> tag
            let tile = document.createElement("div");
            //finding aout the position of the numbers inside the grid so you can only switch tiles which are next to each other
            tile.id = r.toString()+ "-" + c.toString();
            tile.src = numbersOrder.shift();
            //adding the numbers inside a div insinde the game-Board div
            document.getElementsById("game-Board").append(tile);
        }
    }
}