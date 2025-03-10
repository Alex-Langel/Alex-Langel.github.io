//THERE IS SOME KIND OF ERROR WITH LINE CLEARING
//LINES ARE SOMETIMES CLEARED INCORRECTLY, ESPECIALLY WITH MULTIPLE AT ONCE
//ROTATION NEEDS IMPLEMENTED
//====================================================================================GLOBAL VARIABLES=================================================================================================================
//GET CANVAS SIZE
let container = document.getElementById("canvCont");
let canvasWidth = container.clientWidth;
let canvasHeight = container.clientHeight;

//GRID SIZE
const gridRows = 20;
const gridCols = 10;

//COORDINATE DATA  
const gridWidth = (canvasWidth/2)-1;
const gridHeight = canvasHeight -1;
const UIstartX = gridWidth + 1;
const UIendX = canvasWidth-1;
let grid = [];

//GAME DATA
let frameLength = 20; //lower to speed up

//GAME VARIABLES
let droppingPiece = false;
let curTetro = 0;
let nextTetro = 0;
let droppingCells = [];
let gameRunning = true;
let rowsToCheck = [];
let simulClears = 0;
let score = 0;
let clears = 0;

function setup(){
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvCont");
    grid = initGrid(grid);
    drawScore();
}
function draw(){
    //background(0);
    if (gameRunning == true) {
        if (frameCount % frameLength == 0) {
            if (droppingPiece == true) {
                debugOut(onGround());
                if (onGround() ==  true) {
                    rowsToCheck = getRows();
                    console.log("Checking rows" + rowsToCheck);
                    droppingPiece = false
                    droppingCells = [];
                    clearRows();
                    addScore();
                    drawScore();
                    if  (topRowEmpty() == false)
                    {
                        gameRunning = false;
                    }

                } else {
                    moveDown();
                }
            } else  if (gameRunning == true) {
                if (nextTetro == 0) {
                    nextTetro = getRandBetween(1,7);
                }
                curTetro = nextTetro;
                nextTetro = getRandBetween(1,7);
                //curTetro = 1;
                drawNextTetro(nextTetro);
                spawnTetro(curTetro);
                droppingPiece = true;
            }
            drawGrid();
        }
    }
}
function initGrid() {
    var rows = gridRows;
    var cols = gridCols;
    var tempGridItem = [];
    var tempGridRow = [];
    var tempGrid = [];
    for (var j = 1; j < gridRows+1; j++){
        for (var i = 1; i < gridCols+1; i++){
        
                tempGridItem = [];
                var cellWidth = (gridWidth + 1) / gridCols;
                var cellHeight = (gridHeight + 1) / gridRows;
                var rightCoord = (cellWidth * i) - 1;
                var bottomCoord = (cellHeight * j) - 1;
                var leftCoord = rightCoord - cellWidth + 1;
                var topCoord = bottomCoord - cellHeight + 1;


                tempGridItem = [[leftCoord, topCoord], [rightCoord, bottomCoord], ["white"]];  //fix color
                tempGridRow.push(tempGridItem);
        }
        tempGrid.push(tempGridRow);
        tempGridRow = [];
    }
    return tempGrid;
}
function resetFunc() {
    grid = [];

    //GAME DATA
    frameLength = 20; //lower to speed up
    
    //GAME VARIABLES
    droppingPiece = false;
    curTetro = 0;
    nextTetro = 0;
    droppingCells = [];
    gameRunning = true;
    rowsToCheck = [];
    simulClears = 0;
    score = 0;
    grid = initGrid(grid);
    drawScore();
}
function spawnTetro(letter) {
//|1 = I|2 = O|3 = T|4 = J|5 = L|6 = S|7 = Z|
    switch (letter) {
    case 1: 
        if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[2][5][2] == "white"  && grid[3][5][2] == "white" ) { //if there is room for tetronimo
            grid[0][5][2] = "aqua";
            grid[1][5][2] = "aqua";
            grid[2][5][2] = "aqua";
            grid[3][5][2] = "aqua";
            droppingCells = [[0,5],[1,5],[2,5],[3,5]];
        } else {
            if (grid[0][5][2] == "white"){
                grid[0][5][2] = "aqua";
            }
            if (grid[1][5][2] == "white"){
                grid[1][5][2] = "aqua";
            }
            if (grid[2][5][2] == "white"){
                grid[2][5][2] = "aqua";
            }
            gameRunning = false;
            droppingPiece = false;
            droppingCells = [];
        }
        break;
    case 2:
        if (grid[0][4][2] == "white" && grid[0][5][2] == "white" && grid[1][4][2] == "white" && grid[1][5][2] == "white") { //if there is room for tetronimo
            grid[0][4][2] = "yellow";
            grid[0][5][2] = "yellow";
            grid[1][4][2] = "yellow";
            grid[1][5][2] = "yellow";
            droppingCells = [[0,4],[0,5],[1,4],[1,5]];
        } else {
            if (grid[0][4][2] == "white" && grid[0][5][2] == "white") {
                grid[0][4][2] = "yellow";
                grid[0][5][2] = "yellow";
            } 
            gameRunning = false;
            droppingPiece = false;
            droppingCells = [];
        }
        break;
    case 3:
        if (grid[0][4][2] == "white" && grid[0][5][2] == "white" && grid[0][6][2] == "white"  && grid[1][5][2] == "white" ) { //if there is room for tetronimo
            grid[0][4][2] = "magenta";
            grid[0][5][2] = "magenta";
            grid[0][6][2] = "magenta";
            grid[1][5][2] = "magenta";
            droppingCells = [[0,4],[0,6],[0,5],[1,5]];
            } else {
                if (grid[0][5][2] == "white") {
                    grid[0][5][2] = "magenta";
                }
            gameRunning = false;
            droppingPiece = false;
            droppingCells = [];
        }
        break;
    case 4:
        if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[2][5][2] == "white"  && grid[2][4][2] == "white" ) { //if there is room for tetronimo
            grid[0][5][2] = "blue";
            grid[1][5][2] = "blue";
            grid[2][5][2] = "blue";
            grid[2][4][2] = "blue";
            droppingCells = [[0,5],[1,5],[2,5],[2,4]];
        } else {
            if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[1][4][2] == "white") {
                grid[0][5][2] = "blue"
                grid[1][5][2] = "blue"
                grid[1][4][2] = "blue"
            } else if (grid[0][5][2] == "white" && grid[0][4][2] == "white") {
                grid[0][5][2] = "blue"
                grid[0][4][2] = "blue"
            }
            gameRunning = false;
            droppingPiece = false;
            droppingCells = [];
        }
        break;
    case 5:
        if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[2][5][2] == "white"  && grid[2][6][2] == "white" ) { //if there is room for tetronimo
            grid[0][5][2] = "orange";
            grid[1][5][2] = "orange";
            grid[2][5][2] = "orange";
            grid[2][6][2] = "orange";
            droppingCells = [[0,5],[1,5],[2,5],[2,6]];
        } else {
            if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[1][6][2] == "white") {
                grid[0][5][2] = "orange";
                grid[1][5][2] = "orange";
                grid[1][6][2] = "orange";
            } else if (grid[0][5][2] == "white" && grid[0][6][2] == "white") {
                grid[0][5][2] = "orange";
                grid[0][6][2] = "orange";
            }
            gameRunning = false;
            droppingPiece = false;
            droppingCells = [];
        }
        break;
    case 6:
        if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[0][6][2] == "white"  && grid[1][4][2] == "white" ) { //if there is room for tetronimo
            grid[0][5][2] = "green";
            grid[1][5][2] = "green";
            grid[0][6][2] = "green";
            grid[1][4][2] = "green";
            droppingCells = [[0,5],[0,6],[1,5],[1,4]];
        } else {
            if (grid[0][5][2] == "white" && grid[0][4][2] == "white"){
                grid[0][5][2] = "green"
                grid[0][4][2] = "green"
            }
            gameRunning = false;
            droppingPiece = false;
            droppingCells = [];
        }
        break;
    case 7:
        if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[1][6][2] == "white"  && grid[0][4][2] == "white" ) { //if there is room for tetronimo
            grid[0][5][2] = "red";
            grid[1][5][2] = "red";
            grid[1][6][2] = "red";
            grid[0][4][2] = "red";
            droppingCells = [[0,5],[1,6],[1,5],[0,4]];
        } else {
            if (grid[0][5][2] == "white" && grid[0][6][2] == "white"){
                grid[0][5][2] == "red"
                grid[0][6][2] == "red"
            }
            gameRunning = false;
            droppingPiece = false;
            droppingCells = [];
        }
        break;
    default:
        console.error("INVALID TETRONIMO ATTEMPTED TO SPAWN");
        break;
    }
    console.log(droppingCells)
}
function topRowEmpty() {
    var activeTet = false;
    for (var i = 0; i < gridCols; i++) {
        if (grid[0][i][2] != "white") {
            for (let j = 0; j < 4; j++) {
                if (droppingCells.length > 0) {
                    if (droppingCells[j][0] == 0 && droppingCells[j][1] == i) {
                        activeTet = true;
                        break;
                    }
                }
            }
            if (!activeTet) {
                return false;
            }
        }
    }
    return true;
}
function rowIsFull(rowNum) {
    var noWhite = true;
    for (var i = 0; i < gridCols; i++) {
        if (grid[rowNum][i][2] == "white") {
            noWhite = false;
        }
    }
    return noWhite;
}
function getRows() {
    let uniqueY = new Set();
    for (let i = 0; i < droppingCells.length; i++) {
        uniqueY.add(droppingCells[i][0]); // Store only unique Y-values
    }
    return Array.from(uniqueY).sort((a, b) => a - b); // Convert Set to an array
}
function clearRows() {
    console.log("Checking rows" + rowsToCheck);
    for (var i = 0; i < rowsToCheck.length; i++) {
        if (rowIsFull(rowsToCheck[i]) == true) {
            deleteAndPushRow(rowsToCheck[i]);
            simulClears++;
            clears++;
        }
    }
    console.log("ROWS CLEARED AT ONCE:" + simulClears);
    rowsToCheck = [];
}
function deleteAndPushRow(rowNum) {
    for (var i = rowNum; i > 0; i--) {
        for (var j = 0; j < gridCols; j++) {
            grid[i][j][2] = grid[i-1][j][2];
        }
    }
    for (var j = 0; j < gridCols; j++) {
        grid[0][j][2] = "white";
    }
}
function addScore() {
    if (simulClears == 1) {
        score = score + 100;
    } else if (simulClears == 2) {
        score = score + 300;
    } else if (simulClears == 3) {
        score = score + 500;
    } else if (simulClears == 4) {
        score = score + 800;
    }
    simulClears = 0;
}
//-----------------------------------------------------------------------------MOVEMENT---------------------------------------------------------------------------------------------
function onGround() {
    for (let i = 0; i < 4; i++) {
        let row = droppingCells[i][0];
        let col = droppingCells[i][1];

        //console.log(`Checking cell [${row}, ${col}]`); // Debugging

        // If any part is at the bottom of the entire grid (including hidden rows)
        if (row >= gridRows - 1) {
            //console.log("Tetromino reached bottom of grid.");
            return true;
        }

        // Check if the next row is occupied
        let nextCellColor = grid[row + 1][col][2];
        //console.log("Next cell color: " + nextCellColor);

        if (nextCellColor != "white") {
            //console.log("Non-Empty Cell Detected: " + row + ", " + col + "|" + nextCellColor);
            let isPartOfTetromino = false;

            // Make sure it's not falsely detecting its own cells
            for (let j = 0; j < 4; j++) {
                if (droppingCells[j][0] === row + 1 && droppingCells[j][1] === col) {
                    isPartOfTetromino = true;
                    break;
                }
            }
            //console.log("Detected own Tetromino: " + isPartOfTetromino);
            if (!isPartOfTetromino) {
                //console.log("Tetromino is resting on another block.");
                return true;
            }
        }
    }
    //console.log("Tetromino can still fall.");
    return false;
}
function moveDown() {
    var shapeColor = grid[droppingCells[0][0]][droppingCells[0][1]][2];
    // Clear current positions from grid
    for (let i = 0; i < 4; i++) {
        let row = droppingCells[i][0];
        let col = droppingCells[i][1];
        grid[row][col][2] = "white"; // Reset old position
    }
    // Move each cell left
    for (let i = 0; i < 4; i++) {
        droppingCells[i][0] += 1; // Move left
    }
    // Update grid with new positions
    for (let i = 0; i < 4; i++) {
        let row = droppingCells[i][0];
        let col = droppingCells[i][1];
        grid[row][col][2] = shapeColor; // Mark new position (adjust as needed)
    }
    console.log(droppingCells)
}
function bonkLeft() {
    for (let i = 0; i < 4; i++) {
        let row = droppingCells[i][0];
        let col = droppingCells[i][1];

        // If any part is at the left of the entire grid (including hidden rows)
        if (col <= 0) {
            console.log("Tetromino reached left of grid.");
            return true;
        }

        // Check if the prev col is occupied
        let nextCellColor = grid[row ][col-1][2];

        if (nextCellColor != "white") {
            let isPartOfTetromino = false;

            // Make sure it's not falsely detecting its own cells
            for (let j = 0; j < 4; j++) {
                if (droppingCells[j][0] === row && droppingCells[j][1] === col - 1) {
                    isPartOfTetromino = true;
                    break;
                }
            }
            if (!isPartOfTetromino) {
                console.log("Tetromino hit another block.");
                return true;
            }
        }
    }
    console.log("Tetromino can move left.");
    return false;
}
function moveLeft() {
    console.log("Moving Left!");
    var shapeColor = grid[droppingCells[0][0]][droppingCells[0][1]][2];
    // Clear current positions from grid
    for (let i = 0; i < 4; i++) {
        let row = droppingCells[i][0];
        let col = droppingCells[i][1];
        grid[row][col][2] = "white"; // Reset old position
    }
    // Move each cell left
    for (let i = 0; i < 4; i++) {
        droppingCells[i][1] -= 1; // Move left
    }
    // Update grid with new positions
    for (let i = 0; i < 4; i++) {
        let row = droppingCells[i][0];
        let col = droppingCells[i][1];
        grid[row][col][2] = shapeColor; // Mark new position (adjust as needed)
    }
}
function bonkRight() {
    for (let i = 0; i < 4; i++) {
        let row = droppingCells[i][0];
        let col = droppingCells[i][1];

        // If any part is at the left of the entire grid (including hidden rows)
        if (col >= gridCols - 1 ){
            console.log("Tetromino reached right of grid.");
            return true;
        }

        // Check if the next col is occupied
        let nextCellColor = grid[row][col+1][2];

        if (nextCellColor != "white") {
            let isPartOfTetromino = false;

            // Make sure it's not falsely detecting its own cells
            for (let j = 0; j < 4; j++) {
                if (droppingCells[j][0] === row && droppingCells[j][1] === col + 1) {
                    isPartOfTetromino = true;
                    break;
                }
            }
            if (!isPartOfTetromino) {
                console.log("Tetromino hit another block.");
                return true;
            }
        }
    }
    console.log("Tetromino can move right.");
    return false;
}
function moveRight() {
    console.log("Moving Right!");
    var shapeColor = grid[droppingCells[0][0]][droppingCells[0][1]][2];
    // Clear current positions from grid
    for (let i = 0; i < 4; i++) {
        let row = droppingCells[i][0];
        let col = droppingCells[i][1];
        grid[row][col][2] = "white"; // Reset old position
    }
    // Move each cell left
    for (let i = 0; i < 4; i++) {
        droppingCells[i][1] += 1; // Move left
    }
    // Update grid with new positions
    for (let i = 0; i < 4; i++) {
        let row = droppingCells[i][0];
        let col = droppingCells[i][1];
        grid[row][col][2] = shapeColor; // Mark new position (adjust as needed)
    }
}
function rotateLeft() {
    const pivot = droppingCells[2]; // Use the 3rd cell as pivot
    let newPositions = [];
    if (curTetro == 2) {
        return;
    }
    // Remove current piece from grid to prevent self-intersection issues
    let shapeColor = grid[droppingCells[0][0]][droppingCells[0][1]][2];
    droppingCells.forEach(([r, c]) => grid[r][c][2] = "white");

    for (let i = 0; i < 4; i++) {
        let x = droppingCells[i][0] - pivot[0];
        let y = droppingCells[i][1] - pivot[1];

        // Apply 90-degree counterclockwise rotation
        let newX = pivot[0] + y;
        let newY = pivot[1] - x;

        // Check boundaries and collisions
        if (
            newX < 0 || newX >= grid.length ||
            newY < 0 || newY >= grid[0].length ||
            (grid[newX][newY][2] != "white") // Ensure new cell is empty
        ) {
            // Restore original positions if rotation is invalid
            droppingCells.forEach(([r, c]) => grid[r][c][2] = shapeColor);
            return; // Cancel rotation
        }
        
        newPositions.push([newX, newY]);
    }

    // Apply new positions if all checks passed
    for (let i = 0; i < 4; i++) {
        droppingCells[i] = newPositions[i];
        let [r, c] = droppingCells[i];
        grid[r][c][2] = shapeColor; // Restore color
    }

}
function rotateRight() {
    const pivot = droppingCells[2]; // Use the 3rd cell as pivot
    let newPositions = [];
    if (curTetro == 2) {
        return;
    }
    // Remove current piece from grid to prevent self-intersection issues
    let shapeColor = grid[droppingCells[0][0]][droppingCells[0][1]][2];
    droppingCells.forEach(([r, c]) => grid[r][c][2] = "white");

    for (let i = 0; i < 4; i++) {
        let x = droppingCells[i][0] - pivot[0];
        let y = droppingCells[i][1] - pivot[1];

        // Apply 90-degree counterclockwise rotation
        let newX = pivot[0] - y;
        let newY = pivot[1] + x;

        // Check boundaries and collisions
        if (
            newX < 0 || newX >= grid.length ||
            newY < 0 || newY >= grid[0].length ||
            (grid[newX][newY][2] != "white") // Ensure new cell is empty
        ) {
            // Restore original positions if rotation is invalid
            droppingCells.forEach(([r, c]) => grid[r][c][2] = shapeColor);
            return; // Cancel rotation
        }
        
        newPositions.push([newX, newY]);
    }

    // Apply new positions if all checks passed
    for (let i = 0; i < 4; i++) {
        droppingCells[i] = newPositions[i];
        let [r, c] = droppingCells[i];
        grid[r][c][2] = shapeColor; // Restore color
    }   
}
//------------------------------------------------------------------------------DRAWING---------------------------------------------------------------------------------------------
function drawGrid(){
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            stroke(0,0,0);
            strokeWeight(1);
            fill(grid[i][j][2]);
            //fill("white");
            rect(grid[i][j][0][0], grid[i][j][0][1], grid[i][j][1][0]-grid[i][j][0][0], grid[i][j][1][1]-grid[i][j][0][1]);
        }
    }
}
function drawNextTetro() {

    var c = "white";
    nxtGrid = [[[[700,100],[724,124],[c]],[[725,100],[749,124],[c]],[[750,100],[774,124],[c]],[[775,100],[799,124],[c]]],
               [[[700,125],[724,149],[c]],[[725,125],[749,149],[c]],[[750,125],[774,149],[c]],[[775,125],[799,149],[c]]],
               [[[700,150],[724,174],[c]],[[725,150],[749,174],[c]],[[750,150],[774,174],[c]],[[775,150],[799,174],[c]]],
               [[[700,175],[724,199],[c]],[[725,175],[749,199],[c]],[[750,175],[774,199],[c]],[[775,175],[799,199],[c]]]]

//|1 = I|2 = O|3 = T|4 = J|5 = L|6 = S|7 = Z|
switch (nextTetro) {
    case 1:
       nxtGrid[0][2][2] = "aqua";
       nxtGrid[1][2][2] = "aqua";
       nxtGrid[2][2][2] = "aqua";
       nxtGrid[3][2][2] = "aqua";
        break;
    case 2:
       nxtGrid[1][1][2] = "yellow";
       nxtGrid[1][2][2] = "yellow";
       nxtGrid[2][1][2] = "yellow";
       nxtGrid[2][2][2] = "yellow";
        break;
    case 3:
       nxtGrid[1][1][2] = "magenta";
       nxtGrid[1][2][2] = "magenta";
       nxtGrid[1][3][2] = "magenta";
       nxtGrid[2][2][2] = "magenta";
        break;
    case 4:
       nxtGrid[0][2][2] = "blue";
       nxtGrid[1][2][2] = "blue";
       nxtGrid[2][2][2] = "blue";
       nxtGrid[2][1][2] = "blue";
        break;
    case 5:
       nxtGrid[0][1][2] = "orange";
       nxtGrid[1][1][2] = "orange";
       nxtGrid[2][1][2] = "orange";
       nxtGrid[2][2][2] = "orange";
        break;
    case 6:
       nxtGrid[1][3][2] = "green";
       nxtGrid[1][2][2] = "green";
       nxtGrid[2][2][2] = "green";
       nxtGrid[2][1][2] = "green";
        break;
    case 7:
       nxtGrid[1][1][2] = "red";
       nxtGrid[1][2][2] = "red";
       nxtGrid[2][2][2] = "red";
       nxtGrid[2][3][2] = "red";
        break;
    default:
        console.error("INVALID TETRONIMO ATTEMPTED TO SPAWN");
        break;
    }

    strokeWeight(0);
    fill(255,255,255);
    rect(699,99,102,102);
    for (var i = 0; i < nxtGrid.length; i++) {
        for (var j = 0; j < nxtGrid[0].length; j++) {
            if (nxtGrid[i][j][2] != "white") {
                fill(nxtGrid[i][j][2]);
                stroke(0,0,0);
                strokeWeight(1);
                fill(nxtGrid[i][j][2]);
                rect(nxtGrid[i][j][0][0], nxtGrid[i][j][0][1], nxtGrid[i][j][1][0]-nxtGrid[i][j][0][0], nxtGrid[i][j][1][1]-nxtGrid[i][j][0][1]);
            }
        }
    }
}
function drawScore() {
    fill(255,255,255);
    strokeWeight(0);
    rect(700,300,200,100);
    rect(700,400,200,100);
    fill(0,0,0);
    textSize(18);
    text("Score:  " + score, 700, 300, 200, 100);
    text("Clears: " + clears, 700, 400, 200, 100);
}
//------------------------------------------------------------------------------KEYPRESS--------------------------------------------------------------------------------------------
function keyPressed() {
    if (key === 'A' || key === 'a') { 
        if (droppingPiece) {
            if (!bonkLeft()) {
                moveLeft();
                drawGrid();
            }
        }
        console.log("A key was pressed!" + key);
    } else if (key === 'D' || key === 'd') { 
        if (droppingPiece) {
            if (!bonkRight()) {
                moveRight();
                drawGrid();
            }
        }
        console.log("A key was pressed!" + key);
    } else if (key === 'S' || key === 's') { 
        if (droppingPiece) {
            console.log(onGround())
            frameLength = frameLength / 2;
            console.log("A key was pressed!" + key);
        }
    } else if (key === 'W' || key === 'w') { 
        if (droppingPiece) {
            if (!onGround()) {
                while (!onGround()) {
                    moveDown();
                }
                    rowsToCheck = getRows();
                    droppingPiece = false
                    droppingCells = [];
                    clearRows();
                    addScore();
                    drawScore();
                    drawGrid();
            }
        }
        console.log("A key was pressed!" + key);
    } else if (key === 'Q' || key === 'q') { 
        rotateLeft();
        drawGrid();
        console.log("A key was pressed!" + key);
    } else if (key === 'E' || key === 'e') { 
        rotateRight();
        drawGrid();
        console.log("A key was pressed!" + key);
    }
}
function keyReleased() {
    if (key === 'S' || key === 's') {
        frameLength = frameLength * 2
    }
}
//-----------------------------------------------------------------------------MATH/UTILS-------------------------------------------------------------------------------------------
function getRandBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//-------------------------------------------------------------------------------DEBUG----------------------------------------------------------------------------------------------
function debugOut(outputVal){
    if (outputVal) {
        document.getElementById("debugOut").innerText= outputVal;
    }
}
