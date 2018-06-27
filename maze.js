// DOM elements to intereact with
const mazeDiv = document.getElementById("mazeDiv");
const avatarDiv = document.getElementById("avatar");
const youWonDiv = document.getElementById("youWonDiv")

// Size of the squares in the grid, in pixels.
const delta = 33;

// Coordinates of the player's avatar.
let avatarRow;
let avatarCol;

// Separate array for keeping track of the moving crates.
const crateRow = []
/*CrateRow = [0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, "div.crate", 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, "div.crate", 0, 0],
[0, "div.crate", 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, "div.crate", 0, 0, 0],
[0, 0, 0, "div.crate", 0, 0, "div.crate", 0],
[0, 0, 0, 0, "div.crate", 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0]
*/
const crates = [];

// START HERE -----------------------------------------------------------------/
// While the maze project only kept track of (W)alls, the player's
// (S)tarting position, and the (F)inishing position, in sokoban, we
// have to keep track of (O)pen storage locations, (B)oxes, and
// e(X)actly where to move those boxes to. 
//
// Write a conditional that adds Xs to the "crateRow" variable but uses
// an "O" class for the cell. "B"

for (var row = 0; row < map.length; row++) {
    const rowVar = map[row];
    const rowDiv = document.createElement("div");
    var crateMapR = [];
    var crateMapR2 = [];

    rowDiv.className = "row " + row;

    for (var i = 0; i < rowVar.length; i++) {
        let cellvar = rowVar[i];
        const cellDiv = document.createElement("div");
        var crateMapC = 0
        var crateMapC2 = 0

        cellDiv.className = "cell " + cellvar;

        if (cellvar === "S") {
            avatarRow = row;
            avatarCol = i;
        }
        if (cellvar === "B") {
            crateMapC = crate(row, i)
        }
        if (cellvar === "X") {
            cellDiv.className = "cell O"
            crateMapC = crate(row, i)
            crateMapC2 = "F"
        }
        if (cellvar === "O") {
            crateMapC2 = "F"
        }
        rowDiv.appendChild(cellDiv);
        moar = crateMapR.push(crateMapC);
        evenMoar = crateMapR2.push(crateMapC2);
    }
    mazeDiv.appendChild(rowDiv);
    moar2 = crates.push(crateMapR);
    evenMoar2 = crateRow.push(crateMapR2)
    console.log("crates Row " + row+ " contains " + crateMapR);
}

var finishConditions = 0;

for(var j = 0; j < crateRow.length; j++){
    var fCCheck = crateRow[j];
    for(var k = 0; k < fCCheck.length; k++){
        if(crateRow[j][k] === 0){
            finishConditions = finishConditions + 1;
        }
    }
}

// Your task is to write a for loop that draws the map, taking the above cell
// types into consideration. Keep in mind that the player and boxes will be
// absolutely positioned (so that they can be moved) and that you'll need to
// draw a box for both B's _and_ X's. 
//
// Similarly, you'll want to draw a a storage location for both O's and X's. In
// other words, X is a tile that has both a box and something indicating it as
// storage at the same time.
//
// Continue to STEP 2


// Helper function for creating a div representing a box/crate,
// and positioning it at a specified row/column in the grid.
function crate(row, col) {
    const newCrate = document.createElement("div");

    newCrate.className = "crate";
    newCrate.style.left = col * delta + "px";
    newCrate.style.top = row * delta + "px";
    mazeDiv.appendChild(newCrate);

    return newCrate;
}


// Update the coordinates of the player's avatar.
function redrawAvatar() {
    avatarDiv.classList.remove("hidden");
    avatarDiv.style.top = avatarRow * delta + "px";
    avatarDiv.style.left = avatarCol * delta + "px";
}

// Move the player's avatar in the specified direction
// dRow is the desired change in row (-1, 0, or +1)
// dCol is the desired change in column (-1, 0, or +1)
function move(dRow, dCol) {
    // Calculate the coordinates the player wants to move to.
    const destRow = avatarRow + dRow;
    const destCol = avatarCol + dCol;
    const destCell = map[destRow][destCol];
    console.log(destCell)

    // Check if there is a crate there.
    const crateCheck = crates[destRow][destCol];
    // console.log(crates)
    // console.log(crateCheck)
    console.log(map[destRow][destCell])

    // STEP 2 -----------------------------------------------------------------/
    // For the maze, it was enough to check that the place the player wanted to
    // move was empty. Here, we want to check if the place that the player wants
    // to move has a crate in it, and if so, if the space next to that crate is
    // empty. If so, we can move that crate.
    //
    // Write a conditional that checks whether or not a box can be pushed and
    // pushes it in the correct direction. A box can not be moved if:
    // - a wall exists where it is being pushed
    // - another box exists where it is being pushed
    //
    // You will then need to move the player if the destination cell is empty.
    // Continue to STEP 3

    if (crateCheck !== 0) {
        const crateDestRow = destRow + dRow;
        const crateDestCol = destCol + dCol;
        if(map[crateDestRow][crateDestCol] !== "W" && crates[crateDestRow][crateDestCol] === 0){
            //crates[destRow][destCol] = 0
            //crates[crateDestRow][crateDestCol] = "box"
            crates[crateDestRow][crateDestCol] = crates[destRow][destCol]
            crates[destRow][destCol] = 0
            // crate(crateDestRow,crateDestCol)

            // newCrate.className = "crate";
            crates[crateDestRow][crateDestCol].style.left = crateDestCol * delta + "px";
            crates[crateDestRow][crateDestCol].style.top = crateDestRow * delta + "px";

            console.log(map[destRow][destCol])
        }
        //mazeDiv.removeChild()

        //crates[crateDestRow][crateDestCol] = crate;
        //crate.style.top = crateDestRow * delta + "px";
        //crate.style.left = crateDestCol * delta + "px";
    }

    if (destCell && destCell !== "W" && crates[destRow][destCol] === 0) {
        avatarCol += dCol
        avatarRow += dRow
        redrawAvatar()
    }
    checkForWin();
}

function checkForWin() {
    // STEP 3 -----------------------------------------------------------------/
    // Write a function that checks if the player won. A player wins when all
    // boxes are moved over all storage spaces.
    AoZ = 0
    for(var c = 0; c<crateRow.length; c++){
        gameCheck = crateRow[c]
        for(var cc = 0; cc< gameCheck.length; cc++){
        if(crateRow[c][cc] === crates[c][cc]){
            AoZ = AoZ + 1
        }
    }
    if(AoZ === finishConditions){
        youWonDiv.classList.remove("hidden");
    }
    }
    console.log("Aoz = " + AoZ)
    console.log("FC = " + finishConditions)
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowDown":
            move(1, 0);
            break;
        case "ArrowUp":
            move(-1, 0);
            break;
        case "ArrowLeft":
            move(0, -1);
            break;
        case "ArrowRight":
            move(0, 1);
            break;
        default:
            console.log('keydown event\n\nkey: ' + event.key);
    }
});

youWonDiv.addEventListener("click", () => location.reload());
