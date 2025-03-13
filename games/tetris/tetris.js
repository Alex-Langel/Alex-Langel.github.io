//NEEDS BETTER RANDOMIZTION
//BETTER SCORE CALCULATION
//SRS NEEDS LOTS OF WORK
//WORK ON MODIFYIG CURRENT PIECE LOGIC TO NOT BE IN MAIN GRID UNTIL STOPPED -> EASIER TURNING LOGIC
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
let dasCounter = 0; //delayed-auto shifting
let lastKeyHeld = null;
let holdingLeft = false;
let holdingRight = false;
const DAS_DELAY = 16; // Initial delay before moving
const DAS_REPEAT_RATE = 5; // Speed of continuous movement
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
let gameState = 0;

let droppingPiece = false;
let gameRunning = true;
let holdLock = false;

let curTetro = 0;
let curTetroColor = "lime"
let curTetroRotationState = 0;
let nextTetro = 0;
let heldTetro = 0;

const fullBag = [1,2,3,4,5,6,7];
let curBag = [];
let nxtBag = [];

let droppingCells = [];
let ghostCells = [];
let rowsToCheck = [];

let simulClears = 0;
let totTetris = 0;
let totTriple = 0;
let totDouble = 0;
let totBtoB = 0;
let prevTetris = false;
let combo = 0;
let score = 0;
let clears = 0;
let clearsToLevel = 20;
let level = 1;

//TIME
let startTimer;
let elapsedTime;

//workaround
//let shiftTimeout = 0;

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
    drawMainMenu();
    //drawUI();
    //drawScore();
    //drawEmptyTetroBox();
}
function draw(){
    if (gameState == 0) {

    } else if (gameState == 1) {//game running
        if (gameRunning == true) {
            elapsedTime = millis() - startTimer;
            drawTimer();
            updateDAS();
            if (frameCount % effSpeed == 0) {
                if (droppingPiece == true) {
                    if (onGround(droppingCells) ==  true) {
                        addCellsToGrid(droppingCells);
                        rowsToCheck = getRows();
                        droppingPiece = false
                        droppingCells = [];
                        clearRows();
                        addScore();
                        drawScore();
                    } else {
                        moveDown();
                    }
                    drawGrid();
                } else {
                    curTetro = getFromBag();
                    //curTetro = 5;
                    drawNextPiece(curBag[0]);
                    drawAdtlNext();
                    //drawUI();
                    spawnTetro(curTetro);
                    holdLock = false;
                }
            }
            //drawGrid();
        }
    } else if (gameState == 2) {//game ended

    }











    //background(0);

}
function initGrid() {
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
    gameState = 1;
}
function spawnTetro(letter) {
//|1 = I|2 = O|3 = T|4 = J|5 = L|6 = S|7 = Z|
    var spawnFail = false;
    droppingCells = [];
    
    switch (letter) {
    case 1: 
    curTetroColor = "aqua";
        if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[2][5][2] == "white"  && grid[3][5][2] == "white" ) { //if there is room for tetronimo
            droppingCells = [[0,5],[1,5],[2,5],[3,5]];
            droppingPiece = true;
            curTetroRotationState = 1;
        } else {
            if (grid[0][5][2] == "white"){
                grid[0][5][2] = curTetroColor;
            }
            if (grid[1][5][2] == "white"){
                grid[1][5][2] = curTetroColor;
            }
            if (grid[2][5][2] == "white"){
                grid[2][5][2] = curTetroColor;
            }
            spawnFail = true;
        }
        break;
    case 2:
        curTetroColor = "yellow";
        if (grid[0][4][2] == "white" && grid[0][5][2] == "white" && grid[1][4][2] == "white" && grid[1][5][2] == "white") { //if there is room for tetronimo
            droppingCells = [[0,4],[0,5],[1,4],[1,5]];
            droppingPiece = true;
            curTetroRotationState = 0;
        } else {
            if (grid[0][4][2] == "white" && grid[0][5][2] == "white") {
                grid[0][4][2] = curTetroColor;
                grid[0][5][2] = curTetroColor;
            } 
            spawnFail = true;
        }
        break;
    case 3:
        curTetroColor = "magenta";
        if (grid[0][4][2] == "white" && grid[0][5][2] == "white" && grid[0][6][2] == "white"  && grid[1][5][2] == "white" ) { //if there is room for tetronimo
            droppingCells = [[0,4],[0,6],[0,5],[1,5]];
            droppingPiece = true;
            curTetroRotationState = 0;
            } else {
                if (grid[0][5][2] == "white") {
                    grid[0][5][2] = curTetroColor;
                }
            spawnFail = true;
        }
        break;
    case 4:
        curTetroColor = "blue";
        if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[2][5][2] == "white"  && grid[2][4][2] == "white" ) { //if there is room for tetronimo
            droppingCells = [[0,5],[2,5],[1,5],[2,4]];
            droppingPiece = true;
            curTetroRotationState = 3;
        } else {
            if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[1][4][2] == "white") {
                grid[0][5][2] = curTetroColor;
                grid[1][5][2] = curTetroColor;
                grid[1][4][2] = curTetroColor;
            } else if (grid[0][5][2] == "white" && grid[0][4][2] == "white") {
                grid[0][5][2] = curTetroColor;
                grid[0][4][2] = curTetroColor;
            }
            spawnFail = true;
        }
        break;
    case 5:
        curTetroColor = "orange";
        if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[2][5][2] == "white"  && grid[2][6][2] == "white" ) { //if there is room for tetronimo
            droppingCells = [[0,5],[2,5],[1,5],[2,6]];
            droppingPiece = true;
            curTetroRotationState = 1;
        } else {
            if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[1][6][2] == "white") {
                grid[0][5][2] = curTetroColor
                grid[1][5][2] = curTetroColor;
                grid[1][6][2] = curTetroColor;
            } else if (grid[0][5][2] == "white" && grid[0][6][2] == "white") {
                grid[0][5][2] = curTetroColor;
                grid[0][6][2] = curTetroColor;
            }
            spawnFail = true;
        }
        break;
    case 6:
        curTetroColor = "green";
        if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[0][6][2] == "white"  && grid[1][4][2] == "white" ) { //if there is room for tetronimo
            droppingCells = [[0,5],[0,6],[1,5],[1,4]];
            droppingPiece = true;
            curTetroRotationState = 0;
        } else {
            if (grid[0][5][2] == "white" && grid[0][4][2] == "white"){
                grid[0][5][2] = curTetroColor;
                grid[0][4][2] = curTetroColor;
            }
            spawnFail = true;
        }
        break;
    case 7:
        curTetroColor = "red";
        if (grid[0][5][2] == "white" && grid[1][5][2] == "white" && grid[1][6][2] == "white"  && grid[0][4][2] == "white" ) { //if there is room for tetronimo
            droppingCells = [[0,5],[1,6],[1,5],[0,4]];
            droppingPiece = true;
            curTetroRotationState = 0;
        } else {
            if (grid[0][5][2] == "white" && grid[0][6][2] == "white"){
                grid[0][5][2] == curTetroColor;
                grid[0][6][2] == curTetroColor;
            }
            spawnFail = true;
        }
        break;
    default:
        console.error("INVALID TETRONIMO ATTEMPTED TO SPAWN");
        break;
    }
    drawGrid();
    if (spawnFail == true) {
        endGame();
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
function addCellsToGrid(cellsToAdd) {
    for (var i = 0; i < cellsToAdd.length; i++) {
        row = cellsToAdd[i][0];
        col = cellsToAdd[i][1];
        grid[row][col][2] = curTetroColor;
    }
}
function addScore() {
    //if not a tetris, clear previous tetris flag
    if (simulClears != 4) {
        prevTetris = false;
    }
    //single clear
    if (simulClears == 1) {
        score = score + 100;
    //double clear
    } else if (simulClears == 2) {
        score = score + 300;
    //triple clear
    } else if (simulClears == 3) {
        score = score + 500;
        totTriple++;
    //tetris
    } else if (simulClears == 4) {
        if (prevTetris == true) {
            totBtoB ++;
        }
        prevTetris = true;
        totTetris++;
        score = score + 800;
    }
    //if any lines cleared
    if (simulClears > 0) {
        //increment combo
        combo = combo + 1;
        //tell user what clear they had
        drawClearText(getClearString());
        //draw the combo
        drawClearsCombos();
    } else { //reset combo if no clear
        combo = 0;
    }
    if (combo > 1) { //add score for combos >1
        score = score + (combo * 50);
    }   //reset line clear variable
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
function getGhostPosition(activePiece) {
    // Copy the active piece's positions
    let ghostPiece = activePiece.map(cell => [...cell]);
    // Keep lowering the ghost until it collides with the floor or another block
    if (onGround(ghostPiece) == false) {
        while (onGround(ghostPiece) == false) {
            for (var i = 0; i < ghostPiece.length; i++) {
                ghostPiece[i][0] = ghostPiece[i][0] + 1;
            }
        }
    }
    return ghostPiece;

}
function endGame(){
    console.log("GAME OVER");
    gameState = 2;
    gameRunning = false;
    droppingPiece = false;
    droppingCells = [];
    drawScoreboard();
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
            if (prevTetris == true) {
                outString = "Back to back TETRIS";
            } else {
                outString = "TETRIS!!";
            }
        }
    } else {
        outString = "";
    }
    return outString;
}

//-----------------------------------------------------------------------------MOVEMENT---------------------------------------------------------------------------------------------
function onGround(cells) {
    for (let i = 0; i < 4; i++) {
        let row = cells[i][0];
        let col = cells[i][1];
        // If any part is at the bottom of the entire grid
        if (row >= gridRows - 1) {
            return true;
        }
        // Check if the next row is occupied
        let nextCellColor = grid[row + 1][col][2];
        if (nextCellColor != "white") {
            let isPartOfTetromino = false;
            // Make sure it's not falsely detecting its own cells
            //for (let j = 0; j < 4; j++) {
                //if (droppingCells[j][0] === row + 1 && droppingCells[j][1] === col) {
                    //isPartOfTetromino = true;
                    //break;
                //}
            //}
            if (!isPartOfTetromino) {
                return true;
            }
        }
    }
    return false;
}
function moveDown() {
    for (let i = 0; i < 4; i++) {
        droppingCells[i][0] += 1; // Move left
    }

}
function moveLeft() {
    if (droppingPiece && gameRunning) {
        if (tryMovement(droppingCells, 0, -1) == true) {
            console.log("Moving Left!");
            for (let i = 0; i < 4; i++) {
                droppingCells[i][1] += -1; // Move left
            }
            drawGrid();
        }
    }
}
function moveRight() {
    if (droppingPiece && gameRunning) {
        if (tryMovement(droppingCells, 0, 1) == true) {
            console.log("Moving Right!");
            for (let i = 0; i < 4; i++) {
                droppingCells[i][1] += 1; // Move left
            }
            drawGrid();
        }
    }
}
function rotateRight() {
    const pivot = droppingCells[2]; // Use the 3rd cell as pivot
    let newPositions = [];
    let collDet = false;
    if (curTetro == 2) {
        return; //o does not rotate
    }
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
            collDet = true;//collision detected
        }
        newPositions.push([newX, newY]);
    }
    if (collDet == false) {//basic rotation is valid
        //set rotation
        if (curTetroRotationState == 3) {
            curTetroRotationState = 0;
        } else {
            curTetroRotationState++;
        }
        if (curTetro == 1) {//swap pivot on line piece because it is whack
            let Tpos = []
            Tpos[0] = newPositions[1][0];
            Tpos[1] = newPositions[1][1];
            newPositions[1][0] = newPositions[2][0];
            newPositions[1][1] = newPositions[2][1];
            newPositions[2][0] = Tpos[0];
            newPositions[2][1] = Tpos[1];
        }
        // Apply new positions
        updateCurrentPosition(newPositions);
    } else {
        if (curTetro == 1) {
            //do weird shit for line piece
            switch (curTetroRotationState) {
                case 0:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, -2)) { // Move left two
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += -2
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 1;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 0, 1)) { // Move right one
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][1] += 1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 1;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 1, -2)) { // Move left two down one
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 1
                                    newPositions[i][1] += -2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 1;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, -2, 1)) { // Move up two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += -2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 1;
                                }
                            }
                        }
                    }
                break;
                case 1:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, -1)) { // Move left one
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += -1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 2;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 0, 2)) { // Move right two
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][1] += 2
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 2;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -1, 2)) { // Move left one up two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += -1
                                    newPositions[i][1] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 2;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 1, -2)) { // Move right two down one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 1
                                        newPositions[i][1] += -2
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 2;
                                }
                            }
                        }
                    }
                break;
                case 2:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, 2)) { // Move right two
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += 2
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 3;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 0, -1)) { // Move left one
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][1] += -1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 3;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -1, 2)) { // Move right two up one
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += -1
                                    newPositions[i][1] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 3;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, -2, -1)) { // Move left one down two
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += -2
                                        newPositions[i][1] += -1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 3;
                                }
                            }
                        }
                    }
                break;
                case 3:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, -1)) { // Move left one
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += -1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 0;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 0, 2)) { // Move right two
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][1] += 2
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 0;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 2, 1)) { // Move right one down two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 2
                                    newPositions[i][1] += 1
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 0;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, -1, -2)) { // Move left two down one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += -1
                                        newPositions[i][1] += -2
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 0;
                                }
                            }
                        }
                    }
                break;
            }
        } else {
            //normal wallkicks
            switch (curTetroRotationState) {
                case 0:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, -1)) { // Move one left
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += -1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 1;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, -1, -1)) { // Move one left and up
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += -1
                                newPositions[i][1] += -1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 1;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 2, 0)) { // Move down two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 1;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, -1)) { // Move down two left one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += -1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 1;
                                }
                            }
                        }
                    }
                break;
                case 1:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, 1)) { // Move one right
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += 1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 2;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 1, 1)) { // Move one right and down
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += 1
                                newPositions[i][1] += 1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 2;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -2, 0)) { // Move up two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] -= 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 2;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, -2, 1)) { // Move up two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += -2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 2;
                                }
                            }
                        }
                    }
                break;
                case 2:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, 1)) { // Move one right
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += 1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 3;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, -1, 1)) { // Move one right and up
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += -1
                                newPositions[i][1] += 1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 3;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 2, 0)) { // Move down two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 3;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, 1)) { // Move down two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 3;
                                }
                            }
                        }
                    }
                break;
                case 3:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, -1)) { // Move one left
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += -1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 0;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 1, -1)) { // Move one left and down
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += 1
                                newPositions[i][1] += -1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 0;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -2, 0)) { // Move up two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] -= 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 0;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, 1)) { // Move down two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 0;
                                }
                            }
                        }
                    }
                break;
            }
        }
    }
}
function rotateLeft() {
    let pivot = droppingCells[2]; // Use the 3rd cell as pivot
    let newPositions = [];
    let collDet = false;
    if (curTetro == 2) {
        return;
    }
    if (curTetro == 1) {
        pivot = droppingCells[1];
    }
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
            collDet = true;//collision detected
        }
        newPositions.push([newX, newY]);
    }
    if (collDet == false) {//basic rotation is valid
        //set rotation
        if (curTetroRotationState == 0) {
            curTetroRotationState = 3;
        } else {
            curTetroRotationState--;
        }
        if (curTetro == 1) {//swap pivot on line piece because it is whack
            let Tpos = []
            Tpos[0] = newPositions[1][0];
            Tpos[1] = newPositions[1][1];
            newPositions[1][0] = newPositions[2][0];
            newPositions[1][1] = newPositions[2][1];
            newPositions[2][0] = Tpos[0];
            newPositions[2][1] = Tpos[1];
        }
        // Apply new positions
        updateCurrentPosition(newPositions);
    } else {
        if (curTetro == 1) {
            //do weird shit for line piece
            switch (curTetroRotationState) {
                case 0:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, -1)) { // Move left one
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += -1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 3;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 0, 2)) { // Move right two
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][1] += 2
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 3;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -1, 2)) { // Move left one up two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += -1
                                    newPositions[i][1] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 3;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 1, -2)) { // Move right two down one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 1
                                        newPositions[i][1] += -2
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 3;
                                }
                            }
                        }
                    }
                break;
                case 1:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, 2)) { // Move right two
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += 2
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 0;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 0, -1)) { // Move left one
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][1] += -1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 0;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -1, 2)) { // Move right two up one
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += -1
                                    newPositions[i][1] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 0;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, -2, -1)) { // Move left one down two
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += -2
                                        newPositions[i][1] += -1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 0;
                                }
                            }
                        }
                    }
                break;
                case 2://
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, -1)) { // Move left one
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += -1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 1;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 0, 2)) { // Move right two
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][1] += 2
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 1;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 2, 1)) { // Move right one down two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 2
                                    newPositions[i][1] += 1
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 1;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, -1, -2)) { // Move left two down one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += -1
                                        newPositions[i][1] += -2
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 1;
                                }
                            }
                        }
                    }
                break;
                case 3:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, -2)) { // Move left two
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += -2
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 2;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 0, 1)) { // Move right one
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][1] += 1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 2;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 1, -2)) { // Move left two down one
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 1
                                    newPositions[i][1] += -2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 2;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, -2, 1)) { // Move up two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += -2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 2;
                                }
                            }
                        }
                    }
                break;
            }
        } else {
            //normal wallkicks
            switch (curTetroRotationState) {
                case 0:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, 1)) { // Move one right
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += 1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 3;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, -1, 1)) { // Move one right and up
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += -1
                                newPositions[i][1] += 1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 3;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 2, 0)) { // Move down two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 3;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, 1)) { // Move down two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 3;
                                }
                            }
                        }
                    }
                break;
                case 1:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, 1)) { // Move one right
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += 1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 0;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 1, 1)) { // Move one right and down
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += 1
                                newPositions[i][1] += 1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 0;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -2, 0)) { // Move up two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] -= 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 0;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, -2, 1)) { // Move up two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += -2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 0;
                                }
                            }
                        }
                    }
                break;
                case 2:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, -1)) { // Move one left
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += -1;
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 1;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, -1, -1)) { // Move one left and up
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += -1
                                newPositions[i][1] += -1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 1;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 2, 0)) { // Move down two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 1;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, -1)) { // Move down two left one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += -1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 1;
                                }
                            }
                        }
                    }
                break;
                case 3:
                    //=================TEST 1================
                    if (tryMovement(newPositions, 0, -1)) { // Move one left
                        for (var i = 0; i < 4; i++) { // Apply position change
                            newPositions[i][1] += -1
                        }
                        updateCurrentPosition(newPositions);
                        curTetroRotationState = 2;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 1, -1)) { // Move one left and down
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += 1
                                newPositions[i][1] += -1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 2;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -2, 0)) { // Move up two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] -= 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 2;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, 1)) { // Move down two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 2;
                                }
                            }
                        }
                    }
                break;
            }
        }
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
    }
    //clear current piece from screen
    droppingCells.forEach(([r, c]) => grid[r][c][2] = "white");
    droppingCells = [];

    spawnTetro(curTetro);
    drawGrid();
    drawHoldPiece(heldTetro);
}
//-----------------------------------------------------------------------------MOVEMENT UTIL---------------------------------------------------------------------------------------------
function tryMovement(cellArray, offsetX, offsetY) {
    let tempPositions = cellArray.map(cell => [...cell]);
    // Apply offset to all positions
    for (let i = 0; i < 4; i++) {
        tempPositions[i][0] += offsetX;
        tempPositions[i][1] += offsetY;
    }
    return positionIsValid(tempPositions);
}
function updateCurrentPosition(newPosition) {
    for (let i = 0; i < 4; i++) {
        droppingCells[i][0] = newPosition[i][0];
        droppingCells[i][1] = newPosition[i][1];
    }
}
function positionIsValid(TestAry) {
    for (let i = 0; i < 4; i++) {
        let x = TestAry[i][0]
        let y = TestAry[i][1]

        // Check boundaries and collisions
        if (
            x < 0 || x >= grid.length ||
            y < 0 || y >= grid[0].length ||
            (grid[x][y][2] != "white") // Ensure new cell is empty
        ) {
            return false;
        }
    }
    return true;
}
function updateDAS() {
    if (lastKeyHeld) {
      dasCounter++;
      if (dasCounter >= DAS_DELAY) {
        if ((dasCounter - DAS_DELAY) % DAS_REPEAT_RATE === 0) {
          if (lastKeyHeld === 'left') {
            moveLeft();
          } else if (lastKeyHeld === 'right') {
            moveRight();
          }
        }
      }
    }
  }
//------------------------------------------------------------------------------DRAWING---------------------------------------------------------------------------------------------
    //play area
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
    if (droppingPiece == true) {
        if (onGround(droppingCells) == false) {
        ghostCells = getGhostPosition(droppingCells);
        drawGhost();
        }
    drawFallingPiece();
    }
}
function drawGhost() {
    for (var i = 0; i < ghostCells.length; i++) {
        var row = ghostCells[i][0];
        var col = ghostCells[i][1];
        fill(veryLightUIColor);
        rect(grid[row][col][0][0],grid[row][col][0][1],grid[row][col][1][0]-grid[row][col][0][0],grid[row][col][1][1]-grid[row][col][0][1]);
    }
}
function drawFallingPiece() {
    for (var i = 0; i < droppingCells.length; i++) {
        var row = droppingCells[i][0];
        var col = droppingCells[i][1];
        fill(curTetroColor);
        rect(grid[row][col][0][0],grid[row][col][0][1],grid[row][col][1][0]-grid[row][col][0][0],grid[row][col][1][1]-grid[row][col][0][1]);
    }
}
    //Right side UI
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
                if (nxtGrid[i][j][2] != "blue" && nxtGrid[i][j][2] != "orange" && nxtGrid[i][j][2] != "yellow") {
                    nxtGrid[i][j][0][0] = nxtGrid[i][j][0][0] - (cellWidth / 2);
                    nxtGrid[i][j][1][0] = nxtGrid[i][j][1][0] - (cellWidth / 2);
                }
                if ( nxtGrid[i][j][2] == "orange" || nxtGrid[i][j][2] == "blue") {
                    nxtGrid[i][j][0][1] = nxtGrid[i][j][0][1] + (cellHeight / 2);
                    nxtGrid[i][j][1][1] = nxtGrid[i][j][1][1] + (cellHeight / 2);
                }
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
function drawScoreboard() {
    var SBLeft = gridWidth * (1/10);
    var SBTop = gridHeight * (1/10);
    var SBWidth = gridWidth * (8/10);
    var SBHeight = gridHeight * (8/10);

    fill(255);
    rect(SBLeft, SBTop, SBWidth, SBHeight);

    var SBTXLeft = SBLeft + (SBWidth * (1/10));
    var SBTXTop = SBTop + (SBHeight * (1/20));
    var SBTXWidth = SBWidth * (8/10);
    var SBTXHeight = SBHeight * (2/10);

    stroke(0,0,0);
    fill(0,0,0);
    textSize(24);
    textAlign(CENTER, CENTER);
    //rect(SBTXLeft, SBTXTop, SBTXWidth, SBTXHeight);
    text("GAME OVER", SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);

    SBTXTop = SBTXTop + (SBHeight * (3/20));
    SBTXHeight = SBHeight * (1/10);

    text("Score: " + score, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);
    console.log(score);

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("Clears: " + clears, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);
    console.log(clears);

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("Time: " + msToMinuteSecondTime(elapsedTime), SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);
    console.log(msToMinuteSecondTime(elapsedTime));
}
    //Main menu
function drawMainMenu() {
    var mMenuLeft = canvasWidth * (1/10);
    var mMenuTop = canvasHeight * (1/10);
    var mMenuWidth = canvasWidth * (8/10);
    var mMenuHeight = canvasHeight * (8/10);
    console.log(mMenuWidth);
    console.log(mMenuLeft);
    fill(midUIColor);
    rect(mMenuLeft,mMenuTop, mMenuWidth, mMenuHeight);
    //Game name
    drawMenuSection("* * * TETRIS  * * *", lilDarkUIColor, lilDarkUIColor, "white", mMenuLeft + (mMenuWidth * (1/20)), mMenuTop + (mMenuHeight * (1/20)), (mMenuWidth * (18/20)), (mMenuHeight * (2/10)));

    //game info
    drawMenuSection("[Press ENTER to start game]", midUIColor, "black", veryDarkUIColor, mMenuLeft + (mMenuWidth * (1/20)), mMenuTop + (mMenuHeight * (18/20)), (mMenuWidth * (18/20)), (mMenuHeight * (1/20)));
}
function drawMenuSection(txt, bgcolor, outlinecolor, txtcolor, left, top, width, height) {
    stroke (outlinecolor);
    fill(bgcolor);
    rect(left, top, width, height);
    console.log(width);
    console.log(left);

    fill(txtcolor);
    stroke(txtcolor)
    textSize(24);
    textAlign(CENTER, CENTER);
    text(txt, left + width / 2, top + height / 2);

}

//------------------------------------------------------------------------------KEYPRESS--------------------------------------------------------------------------------------------
function keyPressed() {
    if (!droppingCells) {
        console.log("Stop mashing fucker");
        console.log(!droppingCells);
        return; 
    }
    if (key === 'A' || key === 'a') { 
        lastKeyHeld = 'left';
        holdingLeft = true;
        moveLeft(); // Initial move
        dasCounter = 0;
        console.log("A key was pressed!" + key);
    } else if (key === 'D' || key === 'd') { 
        lastKeyHeld = 'right';
        holdingRight = true;
        moveRight(); // Initial move
        dasCounter = 0;
        console.log("A key was pressed!" + key);
    } else if (key === 'S' || key === 's') { 
        if (droppingPiece) {
            console.log(onGround(droppingCells));
            if (effSpeed == gameSpeed) {
                effSpeed = gameSpeed/2;
            }
            console.log("A key was pressed!" + key);
        }
    } else if (key === 'W' || key === 'w') { 
        if (droppingPiece) {
            if (!onGround(droppingCells)) {
                while (!onGround(droppingCells)) {
                    moveDown();
                }
                    addCellsToGrid(droppingCells);
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
        if (gameRunning == true && droppingPiece == true) {
            rotateLeft();
            drawGrid();
        }

        console.log("A key was pressed!" + key);
    } else if (key === 'E' || key === 'e') { 
        if (gameRunning == true && droppingPiece == true) {
            rotateRight();
            drawGrid();
        }
        console.log("A key was pressed!" + key);
    } else if (keyCode === SHIFT) {
            console.log("Shift key was pressed!");
            if (holdLock !== true && droppingPiece == true) {
                holdLock = true;
                holdPiece();
            }
    } else if (keyCode === ENTER) {
        resetFunc();
    }
}
function keyReleased() {
    if (key === 'S' || key === 's') {
        effSpeed = gameSpeed;
    }
    if (key === 'a' || key === 'A') {
        holdingLeft = false;
        if (holdingRight) lastKeyHeld = 'right'; // Switch to right if still held
      } 
      if (key === 'd' || key === 'D') {
        holdingRight = false;
        if (holdingLeft) lastKeyHeld = 'left'; // Switch to left if still held
      }
    
      // If neither key is held, reset DAS state
      if (!holdingLeft && !holdingRight) {
        lastKeyHeld = null;
        dasCounter = 0;
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
