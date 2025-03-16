
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

//Menu Positioning
var mainMenuDims =  [canvasWidth * (1/10), 
                    canvasHeight * (1/10), 
                    canvasWidth * (8/10), 
                    canvasHeight * (8/10)];
var controlMenuDims =   [mainMenuDims[0] + mainMenuDims[2] * (1/10), 
                        mainMenuDims[1] - mainMenuDims[3] * (1/10), 
                        mainMenuDims[2] * (8/10),
                        mainMenuDims[3] * (12/10)];

var soundMenuDims = [mainMenuDims[0] - mainMenuDims[2] * (1/10), 
                    mainMenuDims[1] + mainMenuDims[3] * (1/10), 
                    mainMenuDims[2] * (12/10),
                    mainMenuDims[3] * (8/10)];

var mMenuLeft = canvasWidth * (1/10);
var mMenuTop = canvasHeight * (1/10);
var mMenuWidth = canvasWidth * (8/10);
var mMenuHeight = canvasHeight * (8/10);

var mMenuLMarg = mMenuWidth * (1/20);
var mMenuWBase = mMenuWidth - mMenuLMarg * 2;
var titleTop = mMenuTop + mMenuHeight * (1/20)
var titleHeight = mMenuHeight * (2/10);

var mMenuTitleSpacing = mMenuHeight * (1/10);
var mMenuButtonTopTop = titleTop + titleHeight + mMenuTitleSpacing
var mMenuButtonHeight = mMenuHeight * (1/10);
var mMenuButtonSpacing = mMenuHeight * (1/20);
//Controls
let playControls = [["A","D"],["S","W"],["E","Q"],["SHIFT","R"],["ARROWLEFT","ARROWRIGHT"],["ARROWUP","ARROWDOWN"],["ENTER","ESCAPE"]];
var labContArr = [["Move Left", "Move Right"],["Soft Drop", "Hard Drop"], ["Rotate CCW", "Rotate CW"], ["Hold", "Restart"],["Menu Left","Menu Right"],["Menu Up", "Menu Down"], ["Next", "Back"]]
let changingKey = "";
//Menus
let curMenuPosition = [0,0,0];
let mainMenuOptions = [[["Play Game"], ["Settings", "Controls"], ["Display", "Sound"]],
                       [[[0,0,0,0]],   [[0,0,0,0],[0,0,0,0]],    [[0,0,0,0],[0,0,0,0]]],
                       [["clButton"], ["clButton", "clButton"], ["clButton", "clButton"]]];

let controlMenuOptions = [[[playControls[0][0], playControls[0][1]],[playControls[1][0], playControls[1][1]], [playControls[2][0], playControls[2][1]], [playControls[3][0], playControls[3][1]], [playControls[4][0],playControls[4][1]],[playControls[5][0],playControls[5][1]],[playControls[6][0], playControls[6][1]]],
                          [[[0,0,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,0]]],
                          [["clButton", "clButton"], ["clButton", "clButton"], ["clButton", "clButton"], ["clButton", "clButton"], ["clButton", "clButton"], ["clButton", "clButton"], ["clButton", "clButton"]]];

let soundMenuOptions = [[["Mute MUSIC", "Mute SFX"],["Music Volume"],["SFX Volume"],["Sound Pack"]],
                        [[[0,0,0,0],[0,0,0,0]],[[0,0,0,0]],[[0,0,0,0]],[[0,0,0,0]]],
                        [["clButton", "clButton"],["volSlide"],["volSlide"],["arButton"]]]

//COLORS
let bgColor = [5,5,5];//remove
let gridColor = [5,5,5];
let ghostColor = [255,255,255];
let lightUIColor = [200,200,200];
let lilLightUIColor = [170,170,170];
let veryLightUIColor = [230,230,230];
let darkUIColor = [50,50,50];
let lilDarkUIColor = [80,80,80];
let veryDarkUIColor = [20,20,20];
let midUIColor = [125,125,125];
//AUDIO
let audioLevels = [50,50,0];
let audioPacks = ["Classic", "Crash"]
let selAudioPack = 0;
let musicMute = false;
let SFXMute = false;
let menuMusic;
let level12Music;
let level34Music;
let level56Music;
let level78Music;
let level9PMusic;
let singleClearSound;
let doubleClearSound;
let tripleClearSound;
let fourClearSound;
let allClearSound;

//GAME TIMING STUFF
let frameLength = 20;                   //Starting Speed  -  Lower to speed up
const DAS_DELAY = 16;                   //Initial delay before moving     
const DAS_REPEAT_RATE = 5;              //Speed of continuous movement
const areDelay = 30;                    //Delay before piece spawning
let areCount = areDelay;                //Delay before piece spawning
let dasCounter = 0;                     //Delayed-auto shifting
//GAME VARIABLES                        //I SHOULD PROBABLY REDUCE THESE, THERE ARE A SHIT TON (I THINK ONLY ONE OF THEM ISN'T NECESSARY BELOW THIS POINT ACTUALLY LMAO)
let gameState = 0;                      //0 = not started (in main menus) | 1 = Game Running | 2 = Game Over Screen
let grid = [];                          //The grid of cells. Contain their colorString. "white" is empty.
                                        //----Player button data
let lastKeyHeld = null;                 //last key player was holding for overlapping L and R presses
let holdingLeft = false;                //if holding left  -  for overlapping L and R presses
let holdingRight = false;               //if holding right  -  for overlapping L and R presses
let preJackedLeftRoto = false;          //for rotating piece if rotation pressed during are
let preJackedRightRoto = false;         //for rotating piece if rotation pressed during are
let gameSpeed = frameLength;            //Current speed
let effSpeed = gameSpeed;               //effective current speed  -  for soft dropping
                                        //----Flags for stuff that happens in game
let pieceGend = false;                  //if piece has been generated (but not dropped)
let droppingPiece = false;              //if a piece is being dropped
let holdLock = false;                   //if player is prevented from holding a piece currently
                                        //----Information about the pieces
let curTetro = 0;                       //The tetrimino currently falling.
let curTetroColor;                      //Color of the current piece
let curTetroRotationState = 0;          //How the tetrimino is oriented.  -  Needed for wallkicks.
let nextTetro = 0;                      //The next tetrimino incoming
let heldTetro = 0;                      //The current tetrimino being held
                                        //-----"Bags" of Tetriminos for drought protection
const fullBag = [1,2,3,4,5,6,7];        //Standard bag of 7
let curBag = [];                        //current bag to pull from
let nxtBag = [];                        //reserve bag  -  for when current doesn't have enough for all displays
                                        //-----Location of tetrominos on grid that are not currently tracked in grid
let droppingCells = [];                 //The currently falling tetromino location as 2D array coordinated
let ghostCells = [];                    //The ghost location as array coordinates
                                        //-----Current Run Data
let simulClears = 0;                    //Number of lines cleared at the same time
let totTetris = 0;                      //Tracker for total number of Tetris's
let totTriple = 0;                      //Tracker for total number of triple line clears
let totDouble = 0;                      //Tracker for total number of double line clears
let totSingle = 0;                      //Tracker for total number of singgle line clears
let totBtoB = 0;                        //Tracker for total number of Back To Back Tetris's
let totAllClears = 0;                   //Tracker for total number of all clears
let prevTetris = false;                 //Whether the last line clear was a tetris for b2b tracking
let combo = 0;                          //Combo counter
let maxCombo = 0;                       //Highest Combo
let score = 0;                          //Score counter
let clears = 0;                         //Tracker for total number of clears
let clearsToLevel = 10;                 //Counter for number of clears needed to level up
let level = 1;                          //Counter for current level
                                        //-----Time tracking
let startTimer;                         //Start of Time Tracking
let elapsedTime;                        //Time since Time Tracking began

//FIRST TIME SETUP
function setup(){
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvCont");
    grid = initGrid();
    initBags();
    drawGrid();
    drawUI();
    drawMainMenu();
    initVolume();
}//SETUP COMPLETE
//MAIN GAME LOOP
function draw(){
    if (gameState == 0) {

    } else if (gameState == 1) {//game running
        elapsedTime = millis() - startTimer;
        drawTimer();
        updateDAS();
        if (droppingPiece == true) {//if a piece is dropping
            if (frameCount % effSpeed == 0) {//once in effSpeed frames
                if (onGround(droppingCells) ==  true) {//check for ground
                    addCellsToGrid(droppingCells);
                    areCount = frameCount + areDelay;
                    clearRows();
                    addScore();
                } else {
                    moveDown();
                }
                drawGrid();
            }
        } else {
            genNewTetro();
        }
    } else if (gameState == 2) {//game ended

    }

    //background(0);

}//END MAIN LOOP
//INITIALIZATION
function preload() {
    menuMusic = loadSound('aud/menuMusic.wav');
    level12Music = loadSound('aud/level12Music.wav');
    level34Music = loadSound('aud/level34Music.wav');
    level56Music = loadSound('aud/level56Music.wav');
    level78Music = loadSound('aud/level78Music.wav');
    level9PMusic = loadSound('aud/level9PMusic.wav');
    singleClearSound = loadSound('aud/singleClearSound.wav');
    doubleClearSound = loadSound('aud/doubleClearSound.wav');
    tripleClearSound = loadSound('aud/tripleClearSound.wav');
    fourClearSound = loadSound('aud/fourClearSound.wav');
    allClearSound = loadSound('aud/allClearSound.wav');

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
function initBags() {
    curBag = [...fullBag];
    shuffleArray(curBag);
    nxtBag = [...fullBag];
    shuffleArray(nxtBag);
}
function resetGameVars() {
    gameState = 0;

    pieceGend = false;
    droppingPiece = false;
    holdLock = false;

    curTetro = 0;
    curTetroColor = "lime"
    curTetroRotationState = 0;
    nextTetro = 0;
    heldTetro = 0;

    curBag = [];
    nxtBag = [];

    droppingCells = [];
    ghostCells = [];
    rowsToCheck = [];

    simulClears = 0;
    allClear = false;
    totTetris = 0;
    totTriple = 0;
    totDouble = 0;
    totSingle = 0;
    totBtoB = 0;
    totAllClears = 0;
    prevTetris = false;
    combo = 0;
    maxCombo = 0;
    score = 0;
    clears = 0;
    clearsToLevel =10;
    level = 1;
    gameSpeed = 20;

    startTimer = 0;
    elapsedTime = 0;

}
//BASIC GAME LOGIC
function beginGame() {
    resetGameVars();
    grid = initGrid();
    initBags();
    drawGrid();
    drawUI();
    startTimer = millis();
    gameState = 1;
    stopMusic();
    if (musicMute == false) {
    level12Music.loop(); // Start and loop the music
    }
}
function genNewTetro() { 
    var preSpawnRot = 0;
    if (pieceGend == false) {
        curTetro = getFromBag();
        //curTetro = 1;
        drawNextPiece(curBag[0]);
        drawAdtlNext();
        pieceGend = true;
    } else {
        if (frameCount >= areCount) { //wait for are
            if (preJackedLeftRoto) {    //if key was pressed during are
                preJackedLeftRoto = false; //rotate on spawn
                preSpawnRot = -1;
            }
            if (preJackedRightRoto) { //wait for are
                preJackedRightRoto = false; //if key was pressed during are
                preSpawnRot = 1; //rotate on spawn
            }
            spawnTetro(curTetro, preSpawnRot); //spawn piece
            preSpawnRot = 0;    //reset spawn rotation
            holdLock = false;   //unlock hold piece
            pieceGend = false;  //reset piece generation flag
        }
    }
}
function spawnTetro(letter, rotDir) {
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
            curTetroRotationState = 2;
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
    if (rotDir != 0) {
        if (rotDir > 0) {
            rotateRight();
        } else {
            rotateLeft();
        }
    }
    drawGrid();
    if (spawnFail == true) {
        endGame();
    }
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
    var rowsToCheck = getRows();
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
    droppingPiece = false;
    droppingCells = [];
    rowsToCheck = [];
}
function addCellsToGrid(cellsToAdd) {
    for (var i = 0; i < cellsToAdd.length; i++) {
        row = cellsToAdd[i][0];
        col = cellsToAdd[i][1];
        grid[row][col][2] = curTetroColor;
    }

}
function addScore() {
    var prevScore = score;
    //if not a tetris, clear previous tetris flag
    if (simulClears != 4) {
        prevTetris = false;
    }
    //single clear
    if (simulClears == 1) {
        totSingle++;
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
        if (maxCombo < combo) {
            maxCombo = combo;
        }
        if (wasAllClear() == true) {
            totAllClears ++;
            allClear = true;
        }
        //tell user what clear they had
        drawClearText(getClearString());
        //draw the combo
        drawClearsCombos();
        //get all clears
        if (wasAllClear() == true) {
            totAllClears ++;
        }
    } else { //reset combo if no clear
        combo = 0;
    }
    if (combo > 1) { //add score for combos >1
        score = score + (combo * 50);
    }   //reset line clear variable
    simulClears = 0;
    allClear = false;
    if (score != prevScore) {
        drawScore();
    }
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
    droppingPiece = false;
    droppingCells = [];
    drawScoreboard();
    stopMusic();
    
}
function stopMusic() {
    if (menuMusic.isPlaying()) {
        menuMusic.stop(); // Stop the music
    }
    if (level12Music.isPlaying()) {
        level12Music.stop(); // Stop the music
    }
    if (level34Music.isPlaying()) {
        level34Music.stop(); // Stop the music
    }
    if (level56Music.isPlaying()) {
        level56Music.stop(); // Stop the music
    }
    if (level78Music.isPlaying()) {
        level78Music.stop(); // Stop the music
    }
    if (level9PMusic.isPlaying()) {
        level9PMusic.stop(); // Stop the music
    }
}
function initVolume() {
    menuMusic.setVolume(0.5);
    level12Music.setVolume(0.5);
    level34Music.setVolume(0.5);
    level56Music.setVolume(0.5);
    level78Music.setVolume(0.5);
    level9PMusic.setVolume(0.5);
    singleClearSound.setVolume(0.5);
    doubleClearSound.setVolume(0.5);
    tripleClearSound.setVolume(0.5);
    fourClearSound.setVolume(0.5);
    allClearSound.setVolume(0.5);
}
function setMusicVolume(newVol) {
    menuMusic.setVolume(newVol/100);
    level12Music.setVolume(newVol/100);
    level34Music.setVolume(newVol/100);
    level56Music.setVolume(newVol/100);
    level78Music.setVolume(newVol/100);
    level9PMusic.setVolume(newVol/100);
}
function setSFXVolume(newVol) {
    singleClearSound.setVolume(newVol/100);
    doubleClearSound.setVolume(newVol/100);
    tripleClearSound.setVolume(newVol/100);
    fourClearSound.setVolume(newVol/100);
    allClearSound.setVolume(newVol/100);
}
function incSoundPack() {
     if (selAudioPack == audioPacks.length - 1) {
        console.log("?????????");
        selAudioPack = 0;
     } else {
        console.log("!!!!!!");
        selAudioPack++;
     }
}
function decSoundPack() {
    if (selAudioPack == 0) {
       selAudioPack = audioPacks.length - 1;
    } else {
       selAudioPack--;
    }
}
//-----------------------------------------------------------------------------OTHER  ---------------------------------------------------------------------------------------------
function getClearString() {
    var outString
    if (simulClears > 0) {
        if (simulClears == 1) {
            if (allClear == true) {
                outString = "All Clear!";
            } else {
                if (SFXMute == false) {
                    singleClearSound.play();
                }
                if (combo > 1) {
                outString = combo + "x Combo!";
                } else {
                outString = "Single Clear";
                }
            }
        } else if (simulClears == 2) {
            outString = "Double Clear!";
            if (SFXMute == false) {
                doubleClearSound.play();
            }
        } else if (simulClears == 3) {
            outString = "Triple Clear!";
            if (SFXMute == false) {
                tripleClearSound.play();
            }
        } else if (simulClears == 4) {
            if (SFXMute == false) {
                fourClearSound.play();
            }
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
function wasAllClear() {
    for (let i = 0; i < grid.length; i++) {  // Outer loop for each row
        for (let j = 0; j < grid[i].length; j++) {  // Inner loop for each element in the row
            if (grid[i][j][2] != "white") {
                return false;
            }
        }
    }
    if (SFXMute == false) {
        allClearSound.play();
    }
    return true;
}
function levelUp() {
    clearsToLevel = 10;
    level++;
    if (musicMute ==false) {
        if (level == 3) {
            if (level12Music.isPlaying()) {
                level12Music.stop(); // Stop the music
            }
            if (!level34Music.isPlaying()) {
                level34Music.loop(); // Start and loop the music
            }
        }
        if (level == 5) {
            if (level34Music.isPlaying()) {
                level34Music.stop(); // Stop the music
            }
            if (!level56Music.isPlaying()) {
                level56Music.loop(); // Start and loop the music
            }
        }
        if (level == 7) {
            if (level56Music.isPlaying()) {
                level56Music.stop(); // Stop the music
            }
            if (!level78Music.isPlaying()) {
                level78Music.loop(); // Start and loop the music
            }
        }
        if (level == 9) {
            if (level78Music.isPlaying()) {
                level78Music.stop(); // Stop the music
            }
            if (!level9PMusic.isPlaying()) {
                level9PMusic.loop(); // Start and loop the music
            }
        }
    }
    if (gameSpeed > 1) {
        gameSpeed--;
        effSpeed = gameSpeed;
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
    if (droppingPiece && gameState == 1) {
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
    if (droppingPiece && gameState == 1) {
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
            console.log(curTetroRotationState);
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
                    console.log(curTetroRotationState);
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

    spawnTetro(curTetro, 0);
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
                fill(gridColor);
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
        fill(ghostColor);
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

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("Single Clears: " + totSingle, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("Double Clears: " + totDouble, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("Triple Clears: " + totTriple, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("Tetris: " + totTetris, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("B2B Tetris: " + totBtoB, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("All Clears: " + totAllClears, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("Highest Combo: " + maxCombo, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);
}
    //Menu Movement============================================
function moveMenuCursorUp(menuOptions) {
        var prevCursorPosition = [...curMenuPosition];
            if (menuOptions[0].length > 1) {//if multiple rows
                if (curMenuPosition[1] == 0){ //on top row
                    curMenuPosition[1] = menuOptions[0].length - 1;
                } else {
                    curMenuPosition[1]--;
                        if (menuOptions[0][curMenuPosition[1]].length < 2) {
                            curMenuPosition[2] = 0;
                    }
                }
            unhighlightMenuOption(prevCursorPosition);
            highlightMenuOption(curMenuPosition);
            //drawMainMenuButtons(prevCursorPosition);
        }
}
function moveMenuCursorDown(menuOptions) {
        var prevCursorPosition = [...curMenuPosition];
            if (menuOptions[0].length > 1) {//if multiple rows
                if (curMenuPosition[1] == menuOptions[0].length - 1){ //on bot row
                    curMenuPosition[1] = 0;
                    if (menuOptions[0][curMenuPosition[1]].length == 1) {//if top row has only one
                        curMenuPosition[2] = 0;
                    }
                } else {
                    curMenuPosition[1]++;
                    if (menuOptions[0][curMenuPosition[1]].length < 2) {
                        curMenuPosition[2] = 0;
                    }
                }
            }
            unhighlightMenuOption(prevCursorPosition);
            highlightMenuOption(curMenuPosition);
            //drawMainMenuButtons(prevCursorPosition);
}
function moveMenuCursorLeft(menuOptions) {
    var prevCursorPosition = [...curMenuPosition];
        if (menuOptions[0][curMenuPosition[1]].length > 1) {//if two cols
            if (curMenuPosition[2] == 0){ //on first col
                curMenuPosition[2] = (menuOptions[0][curMenuPosition[1]].length - 1);
            } else {
                curMenuPosition[2]--;
            }
            unhighlightMenuOption(prevCursorPosition);
            highlightMenuOption(curMenuPosition);
            //drawMainMenuButtons(prevCursorPosition);
        }  
}
function moveMenuCursorRight(menuOptions) {
        var prevCursorPosition = [...curMenuPosition];
            if (menuOptions[0][curMenuPosition[1]].length > 1) {//if two cols
                if (curMenuPosition[2] == (menuOptions[0][curMenuPosition[1]].length - 1)){ //on final col
                    curMenuPosition[2]= 0;
                } else {
                    curMenuPosition[2]++;
                }
                unhighlightMenuOption(prevCursorPosition);
                highlightMenuOption(curMenuPosition);
                //drawMainMenuButtons(prevCursorPosition);
        }
}
function highlightMenuOption(posAry) {
    var btnCol = veryDarkUIColor;
    var bolCol = lightUIColor;
    var txCol = "white"

    var aMen = posAry[0]
    var aRow = posAry[1];
    var aCol = posAry[2];

    console.log(curMenuPosition);
    if (curMenuPosition[0] == 0) {
        var left = mainMenuOptions[1][aRow][aCol][0];
        var top = mainMenuOptions[1][aRow][aCol][1];
        var width = mainMenuOptions[1][aRow][aCol][2];
        var height = mainMenuOptions[1][aRow][aCol][3];
        drawUIBoxWithText(mainMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 4, 40, left, top, width, height);
    } else if (curMenuPosition[0] == 1) {
        // var left = mainMenuOptions[1][aRow][aCol][0];
        // var top = mainMenuOptions[1][aRow][aCol][1];
        // var width = mainMenuOptions[1][aRow][aCol][2];
        // var height = mainMenuOptions[1][aRow][aCol][3];
        // drawUIBoxWithText(mainMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 4, 40, left, top, width, height);
    } else if (curMenuPosition[0] == 2) {
        var left = controlMenuOptions[1][aRow][aCol][0];
        var top = controlMenuOptions[1][aRow][aCol][1];
        var width = controlMenuOptions[1][aRow][aCol][2];
        var height = controlMenuOptions[1][aRow][aCol][3];
        drawUIBoxWithText(controlMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 4, 40, left, top, width, height);
    } else if (curMenuPosition[0] == 3) {

    } else if (curMenuPosition[0] == 4) {
        var left = soundMenuOptions[1][aRow][aCol][0];
        var top = soundMenuOptions[1][aRow][aCol][1];
        var width = soundMenuOptions[1][aRow][aCol][2];
        var height = soundMenuOptions[1][aRow][aCol][3];
        var ctrlType = soundMenuOptions[2][aRow][aCol];
        var volNum;
        if (soundMenuOptions[0][aRow][aCol] == "Music Volume") {
            volNum = audioLevels[0]
        } else if (soundMenuOptions[0][aRow][aCol] == "SFX Volume") {
            volNum = audioLevels[1]
        } else if (soundMenuOptions[0][aRow][aCol] == "Sound Pack") {
            volNum = audioLevels[2]
        }
        if (ctrlType == "clButton") {
            drawUIBoxWithText(soundMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 4, 20, left, top, width, height);
        } else if (ctrlType == "volSlide") {
            drawVolumeSlider(soundMenuOptions[0][aRow][aCol], btnCol, "white", volNum, left, top, width, height);
        } else if (ctrlType == "arButton") {
            console.log(audioPacks);
            console.log(selAudioPack);
            drawArrowButton(soundMenuOptions[0][aRow][aCol], audioPacks[selAudioPack], btnCol, "white", left, top, width, height)
        }
    }
}
function unhighlightMenuOption(posAry) {
    var btnCol = lilDarkUIColor;
    var bolCol = midUIColor;
    var txCol = "white"

    var aMen = posAry[0]
    var aRow = posAry[1];
    var aCol = posAry[2];


    if (curMenuPosition[0] == 0) {
        var left = mainMenuOptions[1][aRow][aCol][0];
        var top = mainMenuOptions[1][aRow][aCol][1];
        var width = mainMenuOptions[1][aRow][aCol][2];
        var height = mainMenuOptions[1][aRow][aCol][3];
        drawUIBoxWithText(mainMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 2, 40, left, top, width, height);
    } else  if (curMenuPosition[0] == 1) {
        // var left = mainMenuOptions[1][aRow][aCol][0];
        // var top = mainMenuOptions[1][aRow][aCol][1];
        // var width = mainMenuOptions[1][aRow][aCol][2];
        // var height = mainMenuOptions[1][aRow][aCol][3];
        // drawUIBoxWithText(mainMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 4, 40, left, top, width, height);
    } else if (curMenuPosition[0] == 2) {
        var left = controlMenuOptions[1][aRow][aCol][0];
        var top = controlMenuOptions[1][aRow][aCol][1];
        var width = controlMenuOptions[1][aRow][aCol][2];
        var height = controlMenuOptions[1][aRow][aCol][3];
        drawUIBoxWithText(controlMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 2, 20, left, top, width, height);
    } else if (curMenuPosition[0] == 3) {

    } else if (curMenuPosition[0] == 4) {
        var left = soundMenuOptions[1][aRow][aCol][0];
        var top = soundMenuOptions[1][aRow][aCol][1];
        var width = soundMenuOptions[1][aRow][aCol][2];
        var height = soundMenuOptions[1][aRow][aCol][3];
        var ctrlType = soundMenuOptions[2][aRow][aCol];
        drawUIBoxWithText(soundMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 2, 20, left, top, width, height);
    }
}
function drawUIBoxWithText(dispText, bgCol, olCol, txtCol, olSize, txtSize, left, top, width, height) {
    let maxWidth = width * 0.9; // 90% of the box width
    let maxHeight = height * 0.9; // 90% of the box height
    var ttxtSize = txtSize;
    textSize(ttxtSize);
    let textWidthValue = textWidth(dispText);
    let textHeightValue = ttxtSize;
    

    //draw rectangle
    strokeWeight(olSize);
    stroke(olCol);
    fill(bgCol);
    rect(left, top, width, height);
    strokeWeight(1);
    //shrink text if larger than rectangle
    while (textWidthValue > maxWidth || textHeightValue > maxHeight) {
        ttxtSize -= 1; // Decrease font size
        textSize(ttxtSize);
        textWidthValue = textWidth(dispText);
        textHeightValue = ttxtSize;
        console.log(txtSize + " | " + ttxtSize)
    }
    //draw text
    fill(txtCol);
    stroke(txtCol);
    textAlign(CENTER, CENTER);
    text(dispText, left + width / 2, top + height / 2);
}
function drawVolumeSlider(dispText, bgCol, txtCol, volumeLevel, left, top, width, height) {
    //let maxWidth = width * 0.9; // 90% of the box width
    //let maxHeight = height * 0.9; // 90% of the box height
    var ttxtSize = 40;
    textSize(ttxtSize);
    let textWidthValue = textWidth(dispText);
    let textHeightValue = ttxtSize;
    let labelTop = top;
    let labelHi = height * (2.5/10);
    let mainContTop = top + labelHi;
    let mainContHi = height * (5/10);
    let botTop = mainContTop + mainContHi;
    let txtMaxHi = labelHi * (9/10)
    let txtMaxWi = width * (9/10)

    while (textWidthValue > txtMaxWi || textHeightValue > txtMaxHi) {
        ttxtSize -= 1; // Decrease font size
        textSize(ttxtSize);
        textWidthValue = textWidth(dispText);
        textHeightValue = ttxtSize;
    }

    fill(bgCol);
    rect(left, labelTop, width, labelHi);
    fill(txtCol);
    stroke(txtCol);
    textAlign(CENTER, CENTER);
    text(dispText, left + width / 2, labelTop + labelHi / 2);
    txtMaxHi = mainContHi * (9/10)
    ttxtSize = 80;
    textSize(ttxtSize);
    textWidthValue = textWidth(dispText);
    textHeightValue = ttxtSize;
    
    //shrink text if larger than rectangle
    while (textWidthValue > txtMaxWi || textHeightValue > txtMaxHi) {
        ttxtSize -= 1; // Decrease font size
        textSize(ttxtSize);
        textWidthValue = textWidth(dispText);
        textHeightValue = ttxtSize;
    }

    fill(bgCol);
    rect(left, mainContTop, width, mainContHi);

    fill(txtCol);
    stroke(txtCol);
    textAlign(CENTER, CENTER);
    dispText = "<[";
    var lineNum = Math.floor(volumeLevel/5);
    for (var i = 0; i < 20; i++) {
        if (i < lineNum) {
            dispText += "|"
        } else {
            dispText += " "
        }
    }
    dispText += "]>";

    text(dispText, left + width / 2, mainContTop + mainContHi / 2);

    txtMaxHi = labelHi * (9/10)
    ttxtSize = 40;
    textSize(ttxtSize);
    textWidthValue = textWidth(dispText);
    textHeightValue = ttxtSize;
    while (textWidthValue > txtMaxWi || textHeightValue > txtMaxHi) {
        ttxtSize -= 1; // Decrease font size
        textSize(ttxtSize);
        textWidthValue = textWidth(dispText);
        textHeightValue = ttxtSize;
    }
    //draw text
    fill(bgCol);
    rect(left, botTop, width, labelHi);
    fill(txtCol);
    stroke(txtCol);
    textAlign(CENTER, CENTER);
    text(volumeLevel, left + width / 2, botTop + labelHi / 2);
}
function drawArrowButton(labelText, contText, bgCol, txtCol, left, top, width, height) { 
    let txtMaxWi = width * 0.9; // 90% of the box width
    let txtMaxHi = height * 0.9; // 90% of the box height
    var ttxtSize = 40;
    textSize(ttxtSize);
    let textWidthValue;
    let textHeightValue = ttxtSize;

    var arrTxt = "<"
    var arrowTop = top;
    var arrowHi = height;
    var arrowWid = arrowHi;
    var arrowLLeft = left;
    var labTop = top;
    var labLeft = arrowLLeft + arrowWid;
    var labWid = width - (arrowWid * 2);
    var labHi = height * (2/10);
    var contTop = labTop + labHi;
    var contLeft = labLeft;
    var contWid = labWid;
    var contHi = height * (8/10);  
    var arrowRLeft = contLeft+contWid;

    console.log(width);
    console.log(height);
    console.log(arrowWid);
    console.log(arrowHi);
    console.log(labWid);
    fill(bgCol);
    rect(left, top, width, height);

    //drawLeftArrow
    txtMaxHi = arrowHi * (9/10);
    txtMaxWi = arrowWid * (9/10);
    ttxtSize = 80;
    textSize(ttxtSize);
    textWidthValue = textWidth(arrTxt);
    textHeightValue = ttxtSize;
    while (textWidthValue > txtMaxWi || textHeightValue > txtMaxHi) {
        ttxtSize -= 1; // Decrease font size
        textSize(ttxtSize);
        textWidthValue = textWidth(arrTxt);
        textHeightValue = ttxtSize;
    }
    fill(bgCol);
    rect(arrowLLeft, arrowTop, arrowTop, arrowHi);

    fill(txtCol);
    stroke(txtCol);
    textAlign(CENTER, CENTER);
    text(arrTxt, arrowLLeft + arrowWid / 2, arrowTop + arrowHi / 2);


    //drawLabel
    txtMaxHi = labHi * (9/10);
    txtMaxWi = labWid * (9/10);
    ttxtSize = 80;
    textSize(ttxtSize);
    textWidthValue = textWidth(labelText);
    textHeightValue = ttxtSize;
    while (textWidthValue > txtMaxWi || textHeightValue > txtMaxHi) {
        ttxtSize -= 1; // Decrease font size
        textSize(ttxtSize);
        textWidthValue = textWidth(labelText);
        textHeightValue = ttxtSize;
    }
    fill(bgCol);
    rect(labLeft, labTop, labWid, labHi);

    fill(txtCol);
    stroke(txtCol);
    textAlign(CENTER, CENTER);
    text(labelText, labLeft+ labWid / 2, labTop + labHi / 2);


    //drawContent
    txtMaxHi = contHi * (9/10);
    txtMaxWi = contWid * (9/10);
    ttxtSize = 80;
    textSize(ttxtSize);
    textWidthValue = textWidth(contText);
    textHeightValue = ttxtSize;
    while (textWidthValue > txtMaxWi || textHeightValue > txtMaxHi) {
        ttxtSize -= 1; // Decrease font size
        textSize(ttxtSize);
        textWidthValue = textWidth(contText);
        textHeightValue = ttxtSize;
    }
    fill(bgCol);
    rect(contLeft, contTop, contWid, contHi);

    fill(txtCol);
    stroke(txtCol);
    textAlign(CENTER, CENTER);
    text(contText, contLeft+ contWid / 2, contTop + contHi / 2);

    
    //drawRightArrow
    arrTxt = ">";
    txtMaxHi = contHi * (9/10);
    txtMaxWi = contWid * (9/10);
    ttxtSize = 80;
    textSize(ttxtSize);
    textWidthValue = textWidth(arrTxt);
    textHeightValue = ttxtSize;
    while (textWidthValue > txtMaxWi || textHeightValue > txtMaxHi) {
        ttxtSize -= 1; // Decrease font size
        textSize(ttxtSize);
        textWidthValue = textWidth(arrTxt);
        textHeightValue = ttxtSize;
    }
    fill(bgCol);
    rect(arrowRLeft, arrowTop, arrowWid, arrowHi);

    fill(txtCol);
    stroke(txtCol);
    textAlign(CENTER, CENTER);
    text(arrTxt, arrowRLeft + arrowWid / 2, arrowTop + arrowHi / 2);

}
    //MENUS
function drawMainMenu() {
    //Menu Bounding Box
    strokeWeight(8);
    stroke(midUIColor);
    fill(veryDarkUIColor);
    rect(mainMenuDims[0], mainMenuDims[1], mainMenuDims[2], mainMenuDims[3]);
    strokeWeight(1);
    //Margins and buffer between 
    var lMarg = mainMenuDims[2] * (1/20);
    var tMarg = mainMenuDims[3] * (1/20);
    var lSecBuff = mainMenuDims[2] * (1/10);
    var tSecBuff = mainMenuDims[3] * (2/10);
    var titleWidth = mainMenuDims[2] - (lMarg * 2);
    var titleHeight = mainMenuDims[3] * (2/10);

    drawUIBoxWithText("* * * TETRIS * * *", lilDarkUIColor, midUIColor, "white", 5, 40, mainMenuDims[0]+lMarg, mainMenuDims[1]+tMarg, titleWidth, titleHeight);
    var btnLeft = mainMenuDims[0] + lMarg;
    var btnTop = mainMenuDims[1] + tMarg + titleHeight + tSecBuff;
    var btnWidth = titleWidth
    var btnHeight = mainMenuDims[3] * (1/10);

    for (var i = 0; i < mainMenuOptions[0].length; i++) {
        btnWidth = (mainMenuDims[2] - (lMarg * 2) - (lSecBuff*(mainMenuOptions[0][i].length - 1))) / mainMenuOptions[0][i].length;
        for (var j = 0; j < mainMenuOptions[0][i].length; j++) {
            drawUIBoxWithText(mainMenuOptions[0][i][j], lilDarkUIColor, midUIColor, "white", 2, 40, btnLeft, btnTop, btnWidth, btnHeight);
            mainMenuOptions[1][i][j] = [btnLeft, btnTop, btnWidth, btnHeight];
            btnLeft = btnLeft + btnWidth + lSecBuff;
        }
        btnLeft = mainMenuDims[0] + lMarg;
        btnTop = btnTop + btnHeight + tMarg;
    }
    highlightMenuOption([0,0,0]);
}
function drawSettingsMenu() {
    var ctrTop = mMenuTop + mMenuHeight * (1/10);
    var ctrLeft = mMenuLeft - mMenuWidth * (1/10);
    var ctrHeight = mMenuHeight * (8/10);
    var ctrWidth = mMenuWidth * (12/10);
    drawUIBoxWithText("SETTINGS COMING SOON", darkUIColor, lightUIColor, "white", 1, 20, ctrTop, ctrLeft, ctrHeight, ctrWidth);
}
function drawControlsMenu() {
    //Menu Bounding Box
    strokeWeight(8);
    stroke(midUIColor);
    fill(veryDarkUIColor);
    rect(controlMenuDims[0], controlMenuDims[1], controlMenuDims[2], controlMenuDims[3]);
    strokeWeight(1);
    //Margins and buffer between 
    var lMarg = controlMenuDims[2] * (1/20);
    var tMarg = controlMenuDims[3] * (1/40);
    var lSecBuff = controlMenuDims[2] * (1/10);
    var tSecBuff = controlMenuDims[3] * (3/20);
    var titleWidth = controlMenuDims[2] - (lMarg * 2);
    var titleHeight = controlMenuDims[3] * (1/20);

    drawUIBoxWithText("In Game Controls", veryDarkUIColor, veryDarkUIColor, "white", 5, 40, controlMenuDims[0]+lMarg, controlMenuDims[1]+tMarg, titleWidth, titleHeight);
    var btnLeft = controlMenuDims[0] + lMarg;
    var btnTop = controlMenuDims[1] + tMarg + titleHeight + tMarg;
    var btnWidth = titleWidth
    var btnHeight = controlMenuDims[3] * (1/20);

    for (var i = 0; i < 4; i++) {
        btnWidth = (controlMenuDims[2] - (lMarg * 4) - (lSecBuff*(controlMenuOptions[0][i].length - 1))) / (controlMenuOptions[0][i].length * 2);
        for (var j = 0; j < controlMenuOptions[0][i].length; j++) {

            drawUIBoxWithText(labContArr[i][j], midUIColor, midUIColor, "white", 2, 40, btnLeft, btnTop, btnWidth, btnHeight);
            btnLeft = btnLeft + btnWidth + lMarg;

            drawUIBoxWithText(controlMenuOptions[0][i][j], lilDarkUIColor, midUIColor, "white", 2, 20, btnLeft, btnTop, btnWidth, btnHeight);
            controlMenuOptions[1][i][j] = [btnLeft, btnTop, btnWidth, btnHeight];
            btnLeft = btnLeft + btnWidth + lSecBuff;
        }
        btnLeft = controlMenuDims[0] + lMarg;
        btnTop = btnTop + btnHeight + tMarg;
    }

    drawUIBoxWithText("Menu Controls", lilDarkUIColor, midUIColor, "white", 5, 40, controlMenuDims[0]+lMarg, btnTop+tSecBuff, titleWidth, titleHeight);
    btnTop = btnTop+tSecBuff + titleHeight + tMarg;
    for (var i = 4; i < controlMenuOptions[0].length; i++) {
        btnWidth = (controlMenuDims[2] - (lMarg * 4) - (lSecBuff*(controlMenuOptions[0][i].length - 1))) / (controlMenuOptions[0][i].length * 2);
        for (var j = 0; j < controlMenuOptions[0][i].length; j++) {
            console.log(btnWidth);
            drawUIBoxWithText(labContArr[i][j], midUIColor, midUIColor, "white", 2, 40, btnLeft, btnTop, btnWidth, btnHeight);
            btnLeft = btnLeft + btnWidth + lMarg;

            drawUIBoxWithText(controlMenuOptions[0][i][j], lilDarkUIColor, midUIColor, "white", 2, 20, btnLeft, btnTop, btnWidth, btnHeight);
            controlMenuOptions[1][i][j] = [btnLeft, btnTop, btnWidth, btnHeight];
            btnLeft = btnLeft + btnWidth + lSecBuff;
        }
        btnLeft = controlMenuDims[0] + lMarg;
        btnTop = btnTop + btnHeight + tMarg;
    }

    highlightMenuOption(curMenuPosition);
}
function drawDisplayMenu() {
    var ctrTop = mMenuTop + mMenuHeight * (1/10);
    var ctrLeft = mMenuLeft - mMenuWidth * (1/10);
    var ctrHeight = mMenuHeight * (8/10);
    var ctrWidth = mMenuWidth * (12/10);
    drawUIBoxWithText("DISPLAY SETTINGS COMING SOON", darkUIColor, lightUIColor, "white", 1, 20, ctrTop, ctrLeft, ctrHeight, ctrWidth);
}
function drawSoundMenu() {
//     var ctrTop = mMenuTop + mMenuHeight * (1/10);
//     var ctrLeft = mMenuLeft - mMenuWidth * (1/10);
//     var ctrHeight = mMenuHeight * (8/10);
//     var ctrWidth = mMenuWidth * (12/10);
//     drawUIBoxWithText("DISPLAY OPTIONS COMING SOON", darkUIColor, lightUIColor, "white", 1, 20, ctrTop, ctrLeft, ctrHeight, ctrWidth);
    //Menu Bounding Box
    strokeWeight(8);
    stroke(midUIColor);
    fill(veryDarkUIColor);
    rect(soundMenuDims[0], soundMenuDims[1], soundMenuDims[2], soundMenuDims[3]);
    strokeWeight(1);
    //Margins and buffer between 
    var lMarg = soundMenuDims[2] * (1/20);
    var tMarg = soundMenuDims[3] * (1/20);
    var lSecBuff = soundMenuDims[2] * (1/10);
    var tSecBuff = soundMenuDims[3] * (3/20);
    var titleWidth = soundMenuDims[2] - (lMarg * 2);
    var titleHeight = soundMenuDims[3] * (1/10);

    drawUIBoxWithText("Sound Settings", veryDarkUIColor, veryDarkUIColor, "white", 5, 40, soundMenuDims[0]+lMarg, soundMenuDims[1]+tMarg, titleWidth, titleHeight);
    var btnLeft = soundMenuDims[0] + lMarg;
    var btnTop = soundMenuDims[1] + tMarg + titleHeight + tMarg;
    var btnWidth = titleWidth
    var btnHeight = soundMenuDims[3] * (1/10);


        btnWidth = (soundMenuDims[2] - (lMarg * 2) - (lSecBuff*(soundMenuOptions[0][0].length - 1))) / (soundMenuOptions[0][0].length);
        for (var j = 0; j < soundMenuOptions[0][0].length; j++) {

            //drawUIBoxWithText(labContArr[i][j], midUIColor, midUIColor, "white", 2, 40, btnLeft, btnTop, btnWidth, btnHeight);
            //btnLeft = btnLeft + btnWidth + lMarg;

            drawUIBoxWithText(soundMenuOptions[0][0][j], lilDarkUIColor, midUIColor, "white", 2, 30, btnLeft, btnTop, btnWidth, btnHeight);
            soundMenuOptions[1][0][j] = [btnLeft, btnTop, btnWidth, btnHeight];
            btnLeft = btnLeft + btnWidth + lSecBuff;

        }
        btnLeft = soundMenuDims[0] + lMarg;
        btnTop = btnTop + btnHeight + tMarg;

    //drawUIBoxWithText("Menu sounds", lilDarkUIColor, midUIColor, "white", 5, 40, soundMenuDims[0]+lMarg, btnTop+tSecBuff, titleWidth, titleHeight);
    console.log(btnTop);
    btnWidth = soundMenuDims[2] - (lMarg * 2);
    btnHeight = soundMenuDims[3] * (3/20);
    console.log(btnTop);
    console.log(btnWidth);
    for (var i = 1; i < soundMenuOptions[0].length; i++) {
            console.log(btnWidth);
        //if (i == 3) {
            //drawArrowButton(soundMenuOptions[0][i][0], audioPacks[selAudioPack], lilDarkUIColor, "white", btnLeft, btnTop, btnWidth, btnHeight);
        //} else {
            drawUIBoxWithText(soundMenuOptions[0][i][0], lilDarkUIColor, midUIColor, "white", 2, 30, btnLeft, btnTop, btnWidth, btnHeight);
            //drawVolumeSlider(soundMenuOptions[0][i][0], "white", audioLevels[i-1], btnLeft, btnTop, btnWidth, btnHeight);
            
        //}
        soundMenuOptions[1][i][0] = [btnLeft, btnTop, btnWidth, btnHeight];
        btnTop = btnTop + btnHeight + tMarg;
    }

    console.log(soundMenuOptions);
    highlightMenuOption(curMenuPosition);

    //drawUIBoxWithText("SOUND SETTINGS COMING SOON", darkUIColor, lightUIColor, "white", 1, 20, ctrTop, ctrLeft, ctrHeight, ctrWidth);
}
function drawControlEditWindow(letter) {
    console.log(letter);
    var mRow = curMenuPosition[1];
    var mCol = curMenuPosition[2];
    var menWid = controlMenuDims[2] * (3/4);
    var menHi = menWid;
    var menLeft = (canvasWidth - menWid)/ 2;
    var menTop = (canvasHeight - menHi)/ 2;


    drawUIBoxWithText("", veryDarkUIColor, midUIColor, lightUIColor, 5, 0, menLeft, menTop, menWid, menHi);

    drawUIBoxWithText("Changing key for [ " + labContArr[mRow][mCol] + " ]", midUIColor, midUIColor, "black", 0, 60, menLeft, menTop, menWid, menHi * (2/10));

    drawUIBoxWithText(letter, darkUIColor, midUIColor, "white", 5, 60, menLeft, menTop+menHi * (2/10), menWid, menHi * (6/10));

    drawUIBoxWithText("Press 'Next' to Confirm, or 'Back' to Cancel.", midUIColor, midUIColor, "black", 0, 60, menLeft, menTop+menHi * (8/10), menWid, menHi * (2/10));


}
//------------------------------------------------------------------------------KEYPRESS--------------------------------------------------------------------------------------------
function keyPressed() {
    //if no music is play, start menu music!
    if (gameState == 0) {//if in pre-game menus
        if (curMenuPosition[0] == 0) {//in MAIN MENU
            if (key.toUpperCase() === playControls[4][0]) {//LEFT MENU BUTTON
                moveMenuCursorLeft(mainMenuOptions);
            } else if (key.toUpperCase() === playControls[4][1]){//RIGHT MENU BUTTON
                moveMenuCursorRight(mainMenuOptions);
            } else if (key.toUpperCase() === playControls[5][0]){//UP MENU BUTTON
                moveMenuCursorUp(mainMenuOptions);
            } else if (key.toUpperCase() === playControls[5][1]){//DOWN MENU BUTTON
                moveMenuCursorDown(mainMenuOptions);
            } else if (key.toUpperCase() === playControls[6][0]){//NEXT/ENTER BUTTON
                if (curMenuPosition[1] == 0 && curMenuPosition[2] == 0) { //IF 'PLAY BUTTON' SELECTED
                    beginGame();
                } else if (curMenuPosition[1] == 1) {//second row of buttons
                    if (curMenuPosition[2] == 0) {//left button - Game Settings
                        curMenuPosition = [1,0,0];//put cursor at home position
                        drawSettingsMenu();//draw controls menu
                    } else if ((curMenuPosition[2] == 1)) {//right button - Controls
                        curMenuPosition = [2,0,0];//put cursor at home position
                        drawControlsMenu();//draw controls menu
                    }
                } else if (curMenuPosition[1] == 2) {//third row of buttons 
                    if (curMenuPosition[2] == 0) {//left button - Display
                        curMenuPosition = [3,0,0];//put cursor at home position
                        drawDisplayMenu();//draw controls menu
                        
                    } else if ((curMenuPosition[2] == 1)) {//right button - Sound
                        curMenuPosition = [4,0,0];
                        drawSoundMenu();
                        
                    }
                }
            }
        } else if (curMenuPosition[0] == 1) {//setting menu
            if (key === "Enter") {
                //
            } else if ( key === "Escape") {
                curMenuPosition = [0,0,0];//reset position to home of main menu
                drawMainMenu();//return to main menu
            }
        } else if (curMenuPosition[0] == 2) {//controls menu
            if (key.toUpperCase() === playControls[4][0]) {
                moveMenuCursorLeft(controlMenuOptions);
            } else if (key.toUpperCase() === playControls[4][1]){
                moveMenuCursorRight(controlMenuOptions);
            } else if (key.toUpperCase() === playControls[5][0]){
                moveMenuCursorUp(controlMenuOptions);
            } else if (key.toUpperCase() === playControls[5][1]){
                moveMenuCursorDown(controlMenuOptions);
            } else if (key.toUpperCase() === playControls[6][0]) {
                curMenuPosition[0] = 20;
                drawControlEditWindow(controlMenuOptions[0][curMenuPosition[1]][curMenuPosition[2]]);
            } else if (key.toUpperCase() === playControls[6][1]) {
                curMenuPosition = [0,0,0];//reset position to home of main menu
                drawMainMenu();//return to main menu
            }
        } else if (curMenuPosition[0] == 3) {//display menu
            if (key.toUpperCase() === playControls[6][0]) {
                //
            } else if (key.toUpperCase() === playControls[6][1]) {
                curMenuPosition = [0,0,0];//reset position to home of main menu
                drawMainMenu();//return to main menu
            }
        } else if (curMenuPosition[0] == 4) {//sound menu
            if (key.toUpperCase() === playControls[4][0]) {
                if (curMenuPosition[1] == 0) {
                    moveMenuCursorLeft(soundMenuOptions);
                } else if (curMenuPosition[1] == 1) {
                    if (audioLevels[0] > 0) {
                        audioLevels[0] --;
                        setMusicVolume(audioLevels[0]);
                        highlightMenuOption(curMenuPosition);
                    }
                } else if (curMenuPosition[1] == 2) {
                    if (audioLevels[1] > 0) {
                        audioLevels[1] --;
                        setMusicVolume(audioLevels[1]);
                        highlightMenuOption(curMenuPosition);
                    }
                } else if (curMenuPosition[1] == 3) {
                    decSoundPack();
                    highlightMenuOption(curMenuPosition);
                }
            } else if (key.toUpperCase() === playControls[4][1]){
                if (curMenuPosition[1] == 0) {
                    moveMenuCursorRight(soundMenuOptions);
                } else if (curMenuPosition[1] == 1) {
                    if (audioLevels[0] < 100) {
                        audioLevels[0] ++;
                        setMusicVolume(audioLevels[0]);
                        highlightMenuOption(curMenuPosition);
                    }
                } else if (curMenuPosition[1] == 2) {
                    if (audioLevels[1] > 0) {
                        audioLevels[1] ++;
                        setMusicVolume(audioLevels[1]);
                        highlightMenuOption(curMenuPosition);
                    }
                } else if (curMenuPosition[1] == 3) {
                    incSoundPack();
                    highlightMenuOption(curMenuPosition);
                }
            } else if (key.toUpperCase() === playControls[5][0]){
                moveMenuCursorUp(soundMenuOptions);
            } else if (key.toUpperCase() === playControls[5][1]){
                moveMenuCursorDown(soundMenuOptions);
                console.log("WHATS GOING ON");
            } else if ((key.toUpperCase() === playControls[6][0])) {
                //console.log(soundMenuOptions[0][1][0]);
                if (curMenuPosition[1] == 0) {//top row
                    if (curMenuPosition[2] == 0) {//left button - muteMusic
                        if (musicMute == false) {
                            musicMute = true;
                            soundMenuOptions[0][0][0] = "Unmute Music Volume"
                            highlightMenuOption(curMenuPosition);
                            stopMusic();
                        } else {
                            musicMute = false;
                            soundMenuOptions[0][0][0] = "Mute Music Volume"
                            highlightMenuOption(curMenuPosition);
                        }
                        //highlightMenuOption(curMenuPosition);
                    }  else if (curMenuPosition[2] == 1) {//right button - muteSFX
                        if (SFXMute == false) {
                            SFXMute = true;
                            soundMenuOptions[0][0][1] = "Unmute SFX Volume"
                            console.log(soundMenuOptions[0][0][1]);
                            highlightMenuOption(curMenuPosition);
                        } else {
                            SFXMute = false;
                            soundMenuOptions[0][0][1] = "Mute SFX Volume"
                            highlightMenuOption(curMenuPosition);
                        }
                    }   
                }
            } else if ((key.toUpperCase() === playControls[6][1])) {
                curMenuPosition = [0,0,0];//reset position to home of main menu
                drawMainMenu();//return to main menu
            }
        } else if (curMenuPosition[0] == 20) {//Controls Submenu - Control Edit Screen
            if (key.toUpperCase() === playControls[6][0]) {
                curMenuPosition[0] = 2;
                if (changingKey != "") {
                    playControls[curMenuPosition[1]][curMenuPosition[2]] = changingKey;
                    controlMenuOptions[0][curMenuPosition[1]][curMenuPosition[2]] = changingKey;
                }
                drawControlsMenu();
            } else if (key.toUpperCase() === playControls[6][1]) {
                curMenuPosition[0] = 2;
                drawControlsMenu();
            } else {
                drawControlEditWindow(key.toUpperCase());
                changingKey = key.toUpperCase();
            }
        }
    } else {
        if (!droppingCells) {
            console.log("Stop mashing fucker");
            console.log(!droppingCells);
            return; 
        }
        if (key.toUpperCase() === playControls[0][0]) { //MOVE LEFT KEY
            lastKeyHeld = 'left';
            holdingLeft = true;
            moveLeft(); // Initial move
            dasCounter = 0;
            console.log("A key was pressed!" + key);
        } else if (key.toUpperCase() === playControls[0][1]) { //MOVE RIGHT KEY
            lastKeyHeld = 'right';
            holdingRight = true;
            moveRight(); // Initial move
            dasCounter = 0;
            console.log("A key was pressed!" + key);
        } else if (key.toUpperCase() === playControls[1][0]) { //SOFT DROP KEY
            if (droppingPiece) {
                console.log(onGround(droppingCells));
                    effSpeed = gameSpeed/2;
                console.log("A key was pressed!" + key);
            }
        } else if (key.toUpperCase() === playControls[1][1]) { //HARD DROP KEY
            if (droppingPiece) {
                if (!onGround(droppingCells)) {
                    while (!onGround(droppingCells)) {
                        moveDown();
                    }
                    addCellsToGrid(droppingCells);//put cells that just hit ground onto grid
                    areCount = frameCount + areDelay;//start areDelay for next piece
                    clearRows();//clear rows if necessary
                    addScore();//add score
                }
                drawGrid();
            }
            console.log("A key was pressed!" + key);
        } else if (key.toUpperCase() === playControls[2][0]) { //ROTATE CCW KEY
            if (gameState == 1) {
                if (droppingPiece == true) {
                    rotateLeft();
                    drawGrid();
                } else if (pieceGend == true) {
                    preJackedLeftRoto = true;
                }
            }
        console.log("A key was pressed!" + key);
        } else if (key.toUpperCase() === playControls[2][1]) { //ROTATE CW KEY
            if (gameState == 1) {
                if (droppingPiece == true) {
                    rotateRight();
                    drawGrid();
                } else if (pieceGend == true) {
                    preJackedRightRoto = true;
                }
            }
            console.log("A key was pressed!" + key);
        } else if (key.toUpperCase() === playControls[3][0]) { //HOLD PIECE KEY
                console.log("Shift key was pressed!");
                if (holdLock !== true && droppingPiece == true) {
                    holdLock = true;
                    holdPiece();
                }
        } else if (key.toUpperCase() === playControls[3][1]) { //RESTART KEY 
        } else if (key.toUpperCase() === playControls[6][0]) { //NEXT KEY
            //beginGame();
        } else if (key.toUpperCase() === playControls[6][1]) { //BACK KEY
            curMenuPosition = [0,0,0];//reset position to home of main menu
            resetGameVars();
            gameState = 0;
            drawMainMenu();//return to main menu
            stopMusic();
            if (musicMute == false) {
                menuMusic.loop(); // Start and loop the music
            }
        }
    }
}
function keyReleased() {
    if (key.toUpperCase() === playControls[1][0]) {
        effSpeed = gameSpeed;
    }
    if (key.toUpperCase() === playControls[0][0]) {
        holdingLeft = false;
        if (holdingRight) lastKeyHeld = 'right'; // Switch to right if still held
    } 
    if (key.toUpperCase() === playControls[0][1]) {
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
