
//labeling current Tile and the blank Tile the current Tile will switch to if clicked
let currenTile;
let blankTile; //one tile needs to be empty
let turns = 0;
let gridSize = 3
//starting position of the tile


window.onload = function() {
    console.log("working")
    for (let r=0; r < gridSize; r++) {
        for (let c=0; c < gridSize; c++) {
        //creating the <div> tag
            const tile = document.createElement("div");
            //adding the numbers inside a div insinde the game-Board div
            tile.classList.add("tile")
            tile.style.top = r * (600/gridSize) + "px"
            tile.style.left = c * (600/gridSize) +"px"
            tile.innerHTML = r*gridSize +c
            document.getElementById("gameBoard").append(tile);
        }
    }
}

