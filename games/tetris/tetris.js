//!!!!!IMPLEMENTING UI!!!!!
//WALLKICK NEEDS IMPLEMENTED
//NEEDS BETTER RANDOMIZTION
//BETTER SCORE CALCULATION
//PIVOT POINTS NEED FIXED 
//    SPECIFICALLY ORANGE PIECE
//
//
//
//====================================================================================GLOBAL VARIABLES=================================================================================================================
//GET CANVAS SIZE
let container = document.getElementById("canvCont");
let canvasWidth = container.clientWidth;
let canvasHeight = container.clientHeight;

//Grid Size
const gridWidth = (canvasWidth/2)-1;
const gridHeight = canvasHeight -1;

//UI POSITIONS
const UIstartX = gridWidth + 1;
const UIendX = canvasWidth-1;
    //TOP UI ELEMENT -- NEXT PIECE AND HOLD PIECE
    var nxtHldTop = 0;
    var nxtHldLeft = UIstartX;
    var nxtHldWid = UIendX-UIstartX + 1;
    var nxtHldHi = (canvasHeight) * (5/20);
        //NEXT PIECE LOCATION AND SIZE
        var nxtGrdL = nxtHldLeft + (nxtHldWid/10);
        var nxtGrdT = canvasHeight * (1/20);
        var nxtGrdW = nxtHldWid * (6/20);
        var nxtGrdH = nxtHldHi * (12/20);
        //HOLD PIECE LOCATION AND SIZE
        var hldGrdL = UIstartX + (nxtHldWid/2)+ ((nxtHldWid/2) * 2/5);
        var hldGrdT = nxtGrdT;
        var hldGrdW = nxtHldWid * (2/10);
        var hldGrdH = nxtHldHi * (2/5);
    //UI ELEMENT -- ADDITIONAL NEXT PIECES
        var adlNxtL = UIstartX;
        var adlNxtT = nxtHldHi;
        var adlNxtW = UIendX-UIstartX + 1;
        var adlNxtH = (canvasHeight) * (3/20);
    //UI ELEMENT -- CLEAR STRING
        var clrStrL = UIstartX;
        var clrStrT = adlNxtT + adlNxtH;
        var clrStrW = UIendX-UIstartX + 1;
        var clrStrH = (canvasHeight) * (3/20);
    //UI ELEMENT -- TIMER
        var tmrLocL = UIstartX;
        var tmrLocT = clrStrT + clrStrH;
        var tmrLocW = UIendX-UIstartX + 1;
        var tmrLocH = (canvasHeight) * (2/20);
    //UI ELEMENT -- COMBO & LINES
        //LINES
        var curLineL = UIstartX;
        var curLineT = (tmrLocT  + tmrLocH) + (canvasHeight) * (1/20);
        var curLineW = (UIendX-UIstartX + 1) /3;
        var curLineH = (canvasHeight) * (2/20);
        var lvlLineL = curLineL + curLineW
        var lvlLineT = curLineT;
        var lvlLineW = curLineW
        var lvlLineH = curLineH;

        //COMBO
        var comLineL = lvlLineL + lvlLineW;
        var comLineT = lvlLineT;
        var comLineW = lvlLineW;
        var comLineH = lvlLineH;

    //UI ELEMENT -- SCORE

    //BOTTOM UI ELEMENT -- LEVEL AND SPEED

//GRID SIZE
const gridRows = 20;
const gridCols = 10;

//GAME DATA
let frameLength = 20; //lower to speed up
let gameSpeed = frameLength;
let effSpeed = gameSpeed;
let grid = [];
let bgColor = [5,5,5];
let gridColor = [255,255,255];
let lightUIColor = [200,200,200];
let lilLightUIColor = [170,170,170];
let veryLightUIColor = [230,230,230];
let darkUIColor = [50,50,50];
let lilDarkUIColor = [80,80,80];
let veryDarkUIColor = [20,20,20];
let midUIColor = [125,125,125];

//GAME VARIABLES
const fullBag = [1,2,3,4,5,6,7];
let droppingPiece = false;
let curTetro = 0;
let curBag = [];
let nxtBag = [];
let nextTetro = 0;
let heldTetro = 0;
let droppingCells = [];
let gameRunning = true;
let holdLock = false;
let rowsToCheck = [];
let simulClears = 0;
let combo = 0;
let score = 0;
let clears = 0;
let clearsToLevel = 20;
let level = 1;

//TIME
let startTimer;
let elapsedTime

function setup(){
    startTimer = millis();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvCont");
    grid = initGrid(grid);
    curBag = [...fullBag];
    shuffleArray(curBag);
    nxtBag = [...fullBag];
    shuffleArray(nxtBag);
    //curTetro = getFromBag();
    drawUI();
    //drawScore();
    //drawEmptyTetroBox();
}
function draw(){
    console.log(elapsedTime);
    drawTimer();
    //background(0);
    if (gameRunning == true) {
        elapsedTime = millis() - startTimer;
        if (frameCount % effSpeed == 0) {
            if (droppingPiece == true) {
                if (onGround() ==  true) {
                    rowsToCheck = getRows();
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
                curTetro = getFromBag();
                //curTetro = 1;
                drawNextPiece(curBag[0]);
                drawAdtlNext();
                //drawUI();
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
    heldTetro = 0;
    grid = initGrid(grid);
    drawGrid();
    drawUI();
    clears = 0;
    clearsToLevel = 20;
    level = 1;
    startTimer = millis();
}
function spawnTetro(letter) {
//|1 = I|2 = O|3 = T|4 = J|5 = L|6 = S|7 = Z|
    droppingCells = [];
    holdLock = false;
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
            droppingCells = [[0,5],[2,5],[1,5],[2,4]];
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
            droppingCells = [[0,5],[2,5],[1,5],[2,6]];
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
    for (var i = 0; i < rowsToCheck.length; i++) {
        if (rowIsFull(rowsToCheck[i]) == true) {
            deleteAndPushRow(rowsToCheck[i]);
            simulClears++;
            clears++;
            if (clearsToLevel == 0) {
                levelUp();
            } else {
                clearsToLevel--;
            }
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
    if (simulClears > 0) {
        combo = combo + 1;
        drawClearText(getClearString());
        drawClearsCombos();
    } else {
        combo = 0;
    }
    if (combo > 1) {
        score = score + (combo * 50);
    }
    simulClears = 0;
}
function levelUp() {
    clearsToLevel = 20;
    level++;
    if (gameSpeed > 2) {
        gameSpeed--;
    }
    drawLevel();
    drawSpeed();
}
function getFromBag() {
    var retVal = 0;
    if (curBag.length == 1) {
        retVal = curBag.shift();
        curBag = [...nxtBag];
        nxtBag = [...fullBag];
        shuffleArray(nxtBag);
    } else {
        retVal = curBag.shift();
    }
    return retVal;
}
//-----------------------------------------------------------------------------OTHER  ---------------------------------------------------------------------------------------------
function getClearString() {
    var outString
    if (simulClears > 0) {
        if (simulClears == 1) {
            if (combo > 1) {
                outString = combo + "x Combo!";
            } else {
                outString = "Single Clear";
            }
        } else if (simulClears == 2) {
            outString = "Double Clear!";
        } else if (simulClears == 3) {
            outString = "Triple Clear!";
        } else if (simulClears == 4) {
            outString = "!!TETRIS!!";
        }
    } else {
        outString = "";
    }
    return outString;
}
//-----------------------------------------------------------------------------MOVEMENT---------------------------------------------------------------------------------------------
function onGround() {
    for (let i = 0; i < 4; i++) {
        let row = droppingCells[i][0];
        let col = droppingCells[i][1];

        // If any part is at the bottom of the entire grid (including hidden rows)
        if (row >= gridRows - 1) {
            return true;
        }

        // Check if the next row is occupied
        let nextCellColor = grid[row + 1][col][2];

        if (nextCellColor != "white") {
            let isPartOfTetromino = false;

            // Make sure it's not falsely detecting its own cells
            for (let j = 0; j < 4; j++) {
                if (droppingCells[j][0] === row + 1 && droppingCells[j][1] === col) {
                    isPartOfTetromino = true;
                    break;
                }
            }
            if (!isPartOfTetromino) {
                return true;
            }
        }
    }
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
function holdPiece() {
    var newPiece;
    if (heldTetro == 0) {       //if no piece held already
        heldTetro = curTetro;       //set hold to current tetro
        curTetro = getFromBag();    //get current tetro from bag
        drawNextPiece(curBag[0]);
        drawAdtlNext();
    } else {                    //if piece held
        newPiece = heldTetro;       //put held piece in temp
        heldTetro = curTetro;       //set the hold to the current tetro
        curTetro = newPiece;        //set the current to the new piece
        console.log(heldTetro);
        console.log(curTetro);
    }
    //clear current piece from screen
    console.log(curBag);
    droppingCells.forEach(([r, c]) => grid[r][c][2] = "white");
    droppingCells = [];

    spawnTetro(curTetro);
    drawGrid();
    drawHoldPiece(heldTetro);

}
//------------------------------------------------------------------------------DRAWING---------------------------------------------------------------------------------------------
function drawGrid(){
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            stroke(0,0,0);
            strokeWeight(1);
            if (grid[i][j][2] == "white") {
                fill(veryDarkUIColor);
            } else {
                fill(grid[i][j][2]);
            }
            //fill("white");
            rect(grid[i][j][0][0], grid[i][j][0][1], grid[i][j][1][0]-grid[i][j][0][0], grid[i][j][1][1]-grid[i][j][0][1]);
        }
    }
}
function drawUI() {

    drawNextHold(nxtHldTop, nxtHldLeft, nxtHldWid, nxtHldHi);
    drawAdtlNext();
    drawClearText();
    drawTimer();
    drawClearsCombos();
    drawScore();
    drawLevel();
    drawSpeed();


    //drawClears();
    //drawCombo();
    
    //stroke(0,0,0);
    //rect(spdL, infoSecS, UIendX-spdL, infoSecE - infoSecS);


}
function drawNextHold(top, left, width, height) {
    //NEXT textbox
    var nxtTxtL = nxtGrdL;
    var nxtTxtT = top;
    var nxtTxtW = nxtGrdW;
    var nxtTxtH = height / 4;

    fill(bgColor);
    strokeWeight(0);
    rect(left, top, width, height);
    strokeWeight(1);

    fill(255);
    stroke(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("NEXT", nxtTxtL + nxtTxtW * (1/2), nxtTxtT + nxtTxtH / 2);
    //NEXT grid
    drawNextPiece(nextTetro); 

    //HOLD textbox
    var hldTxtL = hldGrdL
    var hldTxtT = top;
    var hldTxtW = hldGrdW;
    var hldTxtH = height / 4;
    fill(255);
    stroke(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("HOLD", hldTxtL + hldTxtW * (1/2), hldTxtT + hldTxtH / 2);
    //HOLD grid
    drawHoldPiece(heldTetro);
}
function drawNextPiece(tetNum) {
    drawMiniGrid(tetNum, nxtGrdL, nxtGrdT, nxtGrdW, nxtGrdH);
}
function drawHoldPiece(tetNum) {
    drawMiniGrid(tetNum, hldGrdL, hldGrdT, hldGrdW, hldGrdH);
}
function drawAdtlNext() {
    //get 6 next tetriminos
    var nextTets = [];
    var numRem;
    if (curBag.length > 5) {
        for (var i = 1; i < 6; i++) {
            nextTets.push(curBag[i]);
        }
    } else {
        numRem = 5;
        for (var i = 1; i < curBag.length; i++)
        {
            nextTets.push(curBag[i]);
            numRem--;
        }
        for (var i = 0; i < numRem; i++)
        {
            nextTets.push(nxtBag[i]);
        }
    }
    //bounding rectangle
    fill(bgColor);
    strokeWeight(0);
    rect(adlNxtL, adlNxtT, adlNxtW, adlNxtH)
    strokeWeight(1);


    //grid locations
    var gridT = nxtHldHi + (canvasHeight * (3/80));
    var gridL = adlNxtL + (adlNxtW * (1/40));
    var gridW = (UIendX-UIstartX + 1) * (3/20);
    var gridH = gridW;
    drawMiniGrid(nextTets[0], gridL, gridT, gridW, gridH);

    //gridLoc2
    gridL = gridL + gridW + (adlNxtW * (1/20))
    drawMiniGrid(nextTets[1], gridL, gridT, gridW, gridH);
    //gridLoc3
    gridL = gridL + gridW + (adlNxtW * (1/20))
    drawMiniGrid(nextTets[2], gridL, gridT, gridW, gridH);
    //gridLoc4
    gridL = gridL + gridW + (adlNxtW * (1/20))
    drawMiniGrid(nextTets[3], gridL, gridT, gridW, gridH);
    //gridLoc5
    gridL = gridL + gridW + (adlNxtW * (1/20))
    drawMiniGrid(nextTets[4], gridL, gridT, gridW, gridH);
}
function drawMiniGrid(tetNum, left, top, width, height) {
    let nxtGrid = [];
    var cellWidth = ((width) / 4) - 1;
    var cellHeight = ((height) / 4) - 1;
    var cellX = left;
    var cellY = top;
    var tCell = [];
    var tRow = [];

    //drawEmptyTetroBox();
    drawEmptyMiniGrid(left, top, width, height);

    var c = "white";
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            tCell = [[cellX, cellY],[cellX+cellWidth, cellY+cellWidth],[c]];
            cellX = cellX + cellWidth + 1;
            tRow.push(tCell);
        }
        cellX = left;
        cellY = cellY + cellHeight + 1;
        nxtGrid.push(tRow);
        tRow = [];
    }
    //|1 = I|2 = O|3 = T|4 = J|5 = L|6 = S|7 = Z|
    switch (tetNum) {
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
        break;
    }

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
function drawEmptyMiniGrid(left, top, width, height) {

    stroke (veryDarkUIColor);
    strokeWeight(1);
    fill(veryDarkUIColor);
    rect(left,top, width, height);
}
function drawClearText(clearString) {
    fill(lightUIColor[0], lightUIColor[1], lightUIColor[2]);
    rect(clrStrL, clrStrT, clrStrW, clrStrH);
    if (clearString != "" ) {
        fill(0);
        stroke(0);
        textSize(24);
        textAlign(CENTER, CENTER);
        text(clearString, clrStrL + clrStrW / 2, clrStrT + clrStrH / 2);
    }
}
function drawTimer() {
    stroke(5);
    fill(darkUIColor);
    rect(tmrLocL, tmrLocT, tmrLocW, tmrLocH);


    fill(255);
    stroke(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(msToMinuteSecondTime(elapsedTime), tmrLocL + tmrLocW / 2, tmrLocT + tmrLocH / 2);


}
function drawClearsCombos() {
    var txtcclrT = (tmrLocT  + tmrLocH);
    var txtcclrL = UIstartX;
    var txtcclrW = (UIendX-UIstartX + 1) /3;
    var txtcclrH = (canvasHeight) * (1/20);

    //header text
    fill(lightUIColor[0], lightUIColor[1], lightUIColor[2]);
    stroke(0);
    rect(txtcclrL, txtcclrT, txtcclrW, txtcclrH);

    fill(0);
    stroke(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Lines Cleared:", txtcclrL + txtcclrW * (1/2), txtcclrT + txtcclrH / 2);
    txtcclrL = txtcclrL + txtcclrW;

    fill(lilLightUIColor[0], lilLightUIColor[1], lilLightUIColor[2]);
    stroke(0);
    rect(txtcclrL, txtcclrT, txtcclrW, txtcclrH);

    fill(0);
    stroke(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Lines to Level:", txtcclrL + txtcclrW * (1/2), txtcclrT + txtcclrH / 2);
    txtcclrL = txtcclrL + txtcclrW;
    
    fill(lightUIColor[0], lightUIColor[1], lightUIColor[2]);
    stroke(0);
    rect(txtcclrL, txtcclrT, txtcclrW, txtcclrH);

    fill(0);
    stroke(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Combo:", txtcclrL + txtcclrW * (1/2), txtcclrT + txtcclrH / 2);

    drawClears();
    drawCombos();
}
function drawClears() {
    //draw bounding rectangle
    fill(midUIColor);
    stroke(0);
    rect(curLineL, curLineT, curLineW, curLineH);
    //text
    fill(0);
    stroke(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(clears, curLineL + curLineW * (1/2), curLineT + curLineH / 2);
    //draw bounding rectangle
    fill(lilDarkUIColor);
    stroke(0);
    rect(lvlLineL, lvlLineT, lvlLineW, lvlLineH);
    //text
    fill(0);
    stroke(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(clearsToLevel, lvlLineL + lvlLineW * (1/2), lvlLineT + lvlLineH / 2);



}
function drawCombos() {
    fill(midUIColor);
    rect(comLineL, comLineT, comLineW, comLineH);

        //draw bounding rectangle
        fill(midUIColor);
        stroke(0);
        rect(comLineL, comLineT, comLineW, comLineH);
        //text
        fill(0);
        stroke(0);
        textSize(24);
        textAlign(CENTER, CENTER);
        text(combo, comLineL + comLineW * (1/2), comLineT + comLineH / 2);
}
function drawScore() {
    //score Text (label)
    let scTextT = ((gridHeight+1) * (8/10));
    let scTextB = ((gridHeight+1) * (17/20)) - 1;
    //border rectangle
    fill(150,150,150);
    stroke(0);
    rect(UIstartX, scTextT, UIendX-UIstartX, scTextB-scTextT);
    //Text
    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("SCORE", UIstartX + (UIendX-UIstartX) / 2, scTextT + (scTextB-scTextT) / 2);


    //score box (actual score)
    let scBoxT = scTextB + 1;
    let scBoxB = ((gridHeight+1) * (19/20)) - 1;
    //border rectangle
    fill(midUIColor);
    rect(UIstartX, scBoxT, UIendX-UIstartX, scBoxB-scBoxT);
    //Text
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(score, UIstartX + (UIendX-UIstartX) / 2, scBoxT + (scBoxB-scBoxT) / 2);

}
function drawLevel() {
    let infoSecS = (gridHeight+1) * (19/20);
    let infoSecE = gridHeight;
    let lvlR = (UIendX+UIstartX-1)/2;

    strokeWeight(1);
    stroke(0,0,0);
    fill(veryDarkUIColor);
    rect(UIstartX, infoSecS, lvlR-UIstartX, infoSecE - infoSecS); //draw box
    stroke(255,255,255);
    fill(255,255,255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Level " + level, UIstartX + (lvlR-UIstartX) / 2, infoSecS + (infoSecE - infoSecS) / 2);
}
function drawSpeed() {
    let infoSecS = (gridHeight) * (19/20);
    let infoSecE = gridHeight;
    let spdL = (UIendX+UIstartX+1)/2;
    
    strokeWeight(1);
    stroke(0,0,0);
    fill(veryLightUIColor);
    rect(spdL, infoSecS, UIendX-spdL, infoSecE - infoSecS); //draw box
    fill(0,0,0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Speed: " + (21 - gameSpeed), spdL + (UIendX-spdL) / 2, infoSecS + (infoSecE - infoSecS) / 2);
}
//------------------------------------------------------------------------------KEYPRESS--------------------------------------------------------------------------------------------
function keyPressed() {
    if (!droppingCells) {
        return; 
    }
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
            console.log(onGround());
            if (effSpeed == gameSpeed) {
                effSpeed = gameSpeed/2;
            }
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
    } else if (keyCode === SHIFT) {
        console.log("Shift key was pressed!");
        if (holdLock != true) {
            holdPiece();
            holdLock = true;
        }
        console.log("Shift key was pressed!");
    }
}
function keyReleased() {
    if (key === 'S' || key === 's') {
        effSpeed = gameSpeed;
    }
}
//-----------------------------------------------------------------------------MATH/UTILS-------------------------------------------------------------------------------------------
function getRandBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffleArray(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}
function msToMinuteSecondTime(millisecondsIn) {
    var outString;
    var sString;
    var mString;
    var msString;
    var seconds = 0;
    var minutes = 0;
    var milliseconds = floor(millisecondsIn); 

    seconds = Math.floor(milliseconds/1000);
    milliseconds = milliseconds % 1000;
    minutes = Math.floor(seconds/60);
    seconds = seconds % 60;

    if (minutes == 0) {
        mString = "00"
    }else if (minutes < 9) {
        mString = "0" + minutes;
    }
    else {
        mString = minutes
    }
    if (seconds == 0) {
        sString = "00"
    }else if (seconds < 9) {
        sString = "0" + seconds;
    } else {
        sString = seconds;
    }
    
    if (milliseconds == 0) {
        msString = "000"
    }else if (milliseconds < 9) {
        msString = "00" + milliseconds;
    }else if (milliseconds < 90) {
        msString = "0" + milliseconds;
    } else {
        msString = milliseconds;
    }

    outString = mString + ":" + sString + ":" +msString;
    return outString;

}
//-------------------------------------------------------------------------------DEBUG----------------------------------------------------------------------------------------------
