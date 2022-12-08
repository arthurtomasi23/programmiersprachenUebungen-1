let x = 0
let y = 0


let map = [][]; // Create an array that takes a x and y index

function createMap() {
    for (let x = 0; x < columnCount; x++) {
        for (let y = 0; y < rowCount; y++) {
            addCell(x, y); 
        }
    }
}

function addCell(x, y) {
    map[x][y] = cell(); // create a new object on x and y
}