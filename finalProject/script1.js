
let blankTile; //one tile needs to be empty
let curTile; //tile that im clicking or later draggging and dropping
let turns = 0;
let gridSize = 3
//starting position of the tile
let tileX = 0
let tileY = 0
//let rightOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
let rightOrder = ["7", "2", "5", "4", "3", "6", "1", "8", "9"]
window.onload = function() {
    console.log("working")
    for (let r=0; r < gridSize; r++) {
        for (let c=0; c < gridSize; c++) {
        //creating the <div> tag
            const tile = document.createElement("div");
            //adding the tiles inside the gameBoard
            tile.style.top = r * (600/gridSize) + "px"
            tile.style.left = c * (600/gridSize) +"px"
            tile.row = r;
            tile.column = c;
            //sets the right Order (rightOrder) and saves it
            tile.id = r.toString() + ' ' + c.toString() + rightOrder.shift();
            //function that creates the numbers inside the tiles
            tile.innerHTML = 1 + (r * gridSize + c)
            //creating the function that sorts out the blank tile 
            if(r== gridSize-1 && c== gridSize-1) {
                tile.classList.add("blankTile")
                blankTile = tile;

            } 
            else {
                tile.classList.add("tile")
                tile.addEventListener("click", function() {
                    //shows me which tile is clicked
                    console.log(tile.column + ' ' + tile.row);
                    //gives tile an sorted id
                    
                    //shows me where the blank tile is
                    console.log(blankTile.column + ' ' + blankTile.row);
                })
            }
            document.getElementById("gameBoard").append(tile);
            
        }
    }
}

