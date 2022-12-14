
let blankTile; //one tile needs to be empty
let turns = 0;
let gridSize = 3
//starting position of the tile
let tileX = 0
let tileY = 0

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
            tile.innerHTML = r * gridSize + c
            //creating the function that sorts out the blank file 
            if(r== gridSize-1 && c== gridSize-1) {
                tile.classList.add("blankTile")
                blankTile = tile;
            } 
            else {
                tile.classList.add("tile")
                tile.addEventListener("click", function() {
                    //shows me which tile is clicked
                    //console.log(tile.column + ' ' + tile.row);
                    //shows me where the blank tile is
                    //console.log(blankTile.column + ' ' + blankTile.row);
                    //turns.classList.add("turns")
                    //turns.addEventListener ("click", function() {
                       // counter++
                       // console.log(counter)
                       // document.createElementbyId("turns").innerHTML="";
                   // })
                })
            }
            document.getElementById("gameBoard").append(tile);
            
        }
    }
}

