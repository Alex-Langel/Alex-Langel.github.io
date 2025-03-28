//NEEDS BETTER RANDOMIZTION
//BETTER SCORE CALCULATION
//MOUSE FOR BUTTONS
//HOLD BUTTONS DOWN
//WORK ON SETTIGNS MENU
//
//====================================================================================GLOBAL VARIABLES=================================================================================================================
//GET CANVAS SIZE
let container = document.getElementById("canvCont");
let canvasWidth = container.clientWidth;
let canvasHeight = container.clientHeight;

//Grid Size
var gridWidth = (canvasWidth/2) - 1;
var gridHeight = canvasHeight;


//UI POSITIONS
let UIstartX = gridWidth + 1;
let UIWidth = canvasWidth-UIstartX;
//let UIendX = canvasWidth-1;

//GRID SIZE
const gridRows = 20;
const gridCols = 10;
var cellWid = gridWidth / gridCols;
var cellHi = gridHeight / gridRows;

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


//Controls
let playControls = [["A","D"],["S","W"],["E","Q"],["SHIFT","R"],["ARROWLEFT","ARROWRIGHT"],["ARROWUP","ARROWDOWN"],["ENTER","ESCAPE"]];
var labContArr = [["Move Left", "Move Right"],["Soft Drop", "Hard Drop"], ["Rotate CCW", "Rotate CW"], ["Hold", "Restart"],["Menu Left","Menu Right"],["Menu Up", "Menu Down"], ["Next", "Back"]]
let changingKey = "";
let changingColor = [0,0,0];
let chColVal = 0;
let menuHeldTime = 0;
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

let displayMenuOptions =    [[["Width"],["Height"],["I", "O", "T", "L"],["J", "S", "Z","\'Ghost\'"],["Background Color", "Primary Color", "Secondary Color", "Tertiary Color"],[ "Accent Color", "Text Color"]],
                            [[[0,0,0,0]],[[0,0,0,0]],[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,0]]],
                            [["arButton"],["arButton"], ["clButton", "clButton", "clButton", "clButton"],["clButton", "clButton", "clButton", "clButton"],["clButton", "clButton", "clButton", "clButton"],["clButton", "clButton"]]];

let colorChangeMenuOptions =    [[["Red"],["Green"],["Blue"],["Back"]],
                                [[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]],
                                [["arButton"],["arButton"],["arButton"], ["clButton"]]];
//COLORS
let gridColor = [5,5,5];
let ghostColor = [255,255,255];
let primUIColor = [114, 44, 171];
let secUIColor = [0,0,0];
let tertUIColor = [60,25,100];
let accentColor = [171,131,235];
let textColor = [255,255,255];
let tetroColors = [[0,255,255],[255,255,0],[255,0,255],[0,0,255],[255,165,0],[0,128,0],[255,0,0]];



let bgColor = [5,5,5];//remove

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
let soundLoading = true;
let menuMusic;
let level12Music;
let level34Music;
let level56Music;
let level78Music;
let level910Music;
let level1112Music;
let level1314Music;
let level1516Music;
let level1718Music;
let level19PMusic;
let singleClearSound;
let doubleClearSound;
let tripleClearSound;
let fourClearSound;
let allClearSound;
let BtoBTetrisSound;
let tspinSound;
let tspinMiniSound;
let deathSound;

//GAME TIMING STUFF
let frameLength = 20;                   //Starting Speed  -  Lower to speed up
const DAS_DELAY = 16;                   //Initial delay before moving     
const DAS_REPEAT_RATE = 5;              //Speed of continuous movement
const areDelay = 30;                    //Delay before piece spawning
let areCount = areDelay;                //Delay before piece spawning
let dasCounter = 0;                     //Delayed-auto shifting
let lockTimer = 0;                      //Counts how long until next reset over
let lockDelay = 30;                     // 30 frames = ~0.5 seconds at 60fps
let lockResetLimit = 10;                //Maximum number of times can be refreshed
let lockResets = 0;                     //Counter for number of times reset
//GAME VARIABLES                        //I SHOULD PROBABLY REDUCE THESE, THERE ARE A SHIT TON (I THINK ONLY ONE OF THEM ISN'T NECESSARY BELOW THIS POINT ACTUALLY LMAO)
let gameState = 0;                      //0 = not started (in main menus) | 1 = Game Running | 2 = Game Over Screen
let grid = [];                          //The grid of cells. Contain their colorString. "white" is empty.
                                        //----Player button data
let lastKeyHeld = null;                 //last key player was holding for overlapping L and R presses
let holdingLeft = false;                //if holding left  -  for overlapping L and R presses
let holdingRight = false;               //if holding right  -  for overlapping L and R presses
let holdingDown = false;                //if holding down - for soft dropping
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
let contSDrop = 0;                      //Number of cells soft dropped continuously
let contHDrop = 0;                      //Number of cells hard dropped continuously
                                        //-----Current Run Data
let simulClears = 0;                    //Number of lines cleared at the same time
let totTetris = 0;                      //Tracker for total number of Tetris's
let totTriple = 0;                      //Tracker for total number of triple line clears
let totDouble = 0;                      //Tracker for total number of double line clears
let totSingle = 0;                      //Tracker for total number of single line clears
let totBtoB = 0;                        //Tracker for total number of Back To Back Tetris's
let totTspin = 0;                       //Tracker for total number of T-Spins
let totTSpinM = 0;                      //Tracker for total number of T-Spin mini's
let totAllClears = 0;                   //Tracker for total number of all clears
let allClear = false;                   //Boolean for if clear was allClear 
let wasTSpin = -1;                      //If player hit tspin, 0 for none, 1 for normal T spin, 2 for mini
let prevTetris = false;                 //Whether the last line clear was a tetris for b2b tracking
let combo = 0;                          //Combo counter
let maxCombo = 0;                       //Highest Combo
let score = 0;                          //Score counter
let clears = 0;                         //Tracker for total number of clears
let clearsToLevel = 10;                 //Counter for number of clears needed to level up
let level = 1;                          //Counter for current level
                                        //-----Time tracking
let startTimer;                         //Start of Time Tracking
let elapsedTime = 0;                        //Time since Time Tracking began

//LOCAL STORAGE
function saveColors() {
    // Create an object with all the color variables
    const colors = {
        gridColor: gridColor,
        ghostColor: ghostColor,
        primUIColor: primUIColor,
        secUIColor: secUIColor,
        tertUIColor: tertUIColor,
        accentColor: accentColor,
        textColor: textColor,
        tetroColors: tetroColors
    };

    // Save the colors object as a JSON string in localStorage
    localStorage.setItem('userColors', JSON.stringify(colors));
}
function loadColors() {
    // Retrieve the saved colors from localStorage
    const savedColors = localStorage.getItem('userColors');

    // If there are saved colors, parse the JSON and apply them
    if (savedColors) {
        const colors = JSON.parse(savedColors);
        
        // Assign the stored colors back to your color variables
        gridColor = colors.gridColor || gridColor;
        ghostColor = colors.ghostColor || ghostColor;
        primUIColor = colors.primUIColor || primUIColor;
        secUIColor = colors.secUIColor || secUIColor;
        tertUIColor = colors.tertUIColor || tertUIColor;
        accentColor = colors.accentColor || accentColor;
        textColor = colors.textColor || textColor;
        tetroColors = colors.tetroColors || tetroColors;
    }
}
function saveAudio() {
    // Save the playControls array as a JSON string in localStorage
    localStorage.setItem('userAudio', JSON.stringify(audioLevels));
}
function loadAudio() {
    // Retrieve the saved Audio from localStorage
    const savedAudio = localStorage.getItem('userAudio');
    
    // If there are saved Audio, parse and apply them
    if (savedAudio) {
        audioLevels = JSON.parse(savedAudio);
    }
}
function saveControls() {
    // Save the playControls array as a JSON string in localStorage
    localStorage.setItem('userControls', JSON.stringify(playControls));
}
function loadControls() {
    // Retrieve the saved controls from localStorage
    const savedControls = localStorage.getItem('userControls');
    
    // If there are saved controls, parse and apply them
    if (savedControls) {
        playControls = JSON.parse(savedControls);
        controlMenuOptions[0] = [...playControls];
    }
}

//FIRST TIME SETUP
function preload() {
    menuMusic = loadSound('aud/classic/menuMusic.wav');
    level12Music = loadSound('aud/classic/level12Music.wav');
    level34Music = loadSound('aud/classic/level34Music.wav');
    level56Music = loadSound('aud/classic/level56Music.wav');
    level78Music = loadSound('aud/classic/level78Music.wav');
    level910Music = loadSound('aud/classic/level910Music.wav');
    level1112Music = loadSound('aud/classic/level1112Music.wav');
    level1314Music = loadSound('aud/classic/level1314Music.wav');
    level1516Music = loadSound('aud/classic/level1516Music.wav');
    level1718Music = loadSound('aud/classic/level1718Music.wav');
    level19PMusic = loadSound('aud/classic/level19PMusic.wav');
    singleClearSound = loadSound('aud/classic/singleClearSound.wav');
    doubleClearSound = loadSound('aud/classic/doubleClearSound.wav');
    tripleClearSound = loadSound('aud/classic/tripleClearSound.wav');
    fourClearSound = loadSound('aud/classic/fourClearSound.wav');
    BtoBTetrisSound = loadSound('aud/classic/BtoBTetrisSound.wav');
    allClearSound = loadSound('aud/classic/allClearSound.wav');
    tspinSound = loadSound('aud/classic/tspinSound.wav');
    tspinMiniSound = loadSound('aud/classic/tspinMiniSound.wav');
    deathSound = loadSound('aud/classic/deathSound.wav');
    soundLoading = false;
}
function onSoundLoaded() {
    // Now that the sound is loaded, you can safely play it
    if (!menuMusic.isPlaying()) {
        menuMusic.loop();
    }
}
function setup(){
    getStartingDims();
    resetDims();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvCont");
    grid = initGrid();
    loadColors();
    loadAudio();
    loadControls();
    initBags();
    drawGrid();
    drawUI();
    drawMainMenu();
    initVolume();
}
//SETUP COMPLETE
//MAIN GAME LOOP
function draw(){
    if (gameState == 0) {
        if (curMenuPosition[0] == 4) {
            if (holdingRight == true) {
                if (curMenuPosition[1] == 1) {
                    if (menuHeldTime > 10) {
                        if (audioLevels[0] < 100) {
                            audioLevels[0] ++;
                            setMusicVolume(audioLevels[0]);
                            highlightMenuOption(curMenuPosition);
                        }
                    }
                } else if (curMenuPosition[1] == 2) {
                    if (menuHeldTime > 10) {
                        if (audioLevels[1] < 100) {
                            audioLevels[1] ++;
                            setMusicVolume(audioLevels[1]);
                            highlightMenuOption(curMenuPosition);
                        }
                    }
                }
            }
            if (holdingLeft == true) {
                if (curMenuPosition[1] == 1) {
                    if (menuHeldTime > 10) {
                        if (audioLevels[0] > 0) {
                            audioLevels[0] --;
                            setMusicVolume(audioLevels[0]);
                            highlightMenuOption(curMenuPosition);
                        }
                    }
                } else if (curMenuPosition[1] == 2) {
                    if (menuHeldTime > 10) {
                        if (audioLevels[1] > 0) {
                            audioLevels[1] --;
                            setMusicVolume(audioLevels[1]);
                            highlightMenuOption(curMenuPosition);
                        }
                    }
                }
            }
        } else if (curMenuPosition[0] == 30) {
            if (holdingRight == true) {
                if (menuHeldTime > 10) {
                    increaseColorVal();
                }
            }
            if (holdingLeft == true) {
                if (menuHeldTime > 10) {
                    decreaseColorVal();
                }
            }
        }
    if (holdingLeft || holdingRight) {
        menuHeldTime++;
    }
    } else if (gameState == 1) {//game running
        elapsedTime = millis() - startTimer;
        drawTimer();
        updateDAS();
        if (droppingPiece == true) {//if a piece is dropping
            if (frameCount % effSpeed == 0) {//once in effSpeed frames
                if (onGround(droppingCells) ==  true) {//check for ground
                    if (lockTimer === 0) {
                        lockTimer = frameCount; // Start lock delay timer
                        
                    }
                    
                    if (frameCount - lockTimer >= lockDelay) {
                        // Lock the piece after lockDelay frames
                        if (wasTSpin == 0) {
                            getTspinVal();
                        }
                        addCellsToGrid(droppingCells);
                        areCount = frameCount + areDelay;
                        clearRows();
                        addScore();
                        droppingPiece = false;
                        lockTimer = 0;
                        lockResets = 0; // Reset lock counter
                    }
                } else {
                    moveDown();
                    
                    if (holdingDown == true) {
                        contSDrop++;
                    }
                }
                drawGrid();
            }
        } else {
            genNewTetro();
        }
    } else if (gameState == 2) {
        //game ended

    }

    //background(0);

}
//END MAIN LOOP
//INITIALIZATION
function initGrid() {
    var tempGridRow = [];
    var tempGrid = [];
    for (var j = 1; j < gridRows+1; j++){
        for (var i = 1; i < gridCols+1; i++){
                tempGridRow.push("");
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
function getStartingDims() {
    let windowWidth = container.clientWidth;
    let windowHeight = container.clientHeight;
    let newWidth = (windowWidth);
    let newHeight = (windowHeight);
    //let newWidth = largestMultipleOf100(windowWidth);
    //let newHeight = largestMultipleOf100(windowHeight);
    newHeight = Math.min(newHeight, newWidth);
    newWidth = Math.min(newHeight, newWidth);
    console.log(newHeight);
    canvasHeight = Math.max(newHeight, 200);
    canvasWidth = Math.max(newWidth, 200);
}
function resetDims() {
    resizeCanvas(canvasWidth, canvasHeight);
    gridWidth = (canvasWidth/2) - 1;
    gridHeight = canvasHeight;
    UIstartX = gridWidth + 1;
    UIWidth = canvasWidth-UIstartX;
    cellWid = gridWidth / gridCols;
    cellHi = gridHeight / gridRows;
    resizeCanvas(canvasWidth, canvasHeight);
    drawGrid();
    drawUI();

    mainMenuDims =  [canvasWidth * (1/10), 
        canvasHeight * (1/10), 
        canvasWidth * (8/10), 
        canvasHeight * (8/10)];
    controlMenuDims =   [mainMenuDims[0] + mainMenuDims[2] * (1/10), 
            mainMenuDims[1] - mainMenuDims[3] * (1/10), 
            mainMenuDims[2] * (8/10),
            mainMenuDims[3] * (12/10)];

    soundMenuDims = [mainMenuDims[0] - mainMenuDims[2] * (1/10), 
        mainMenuDims[1] + mainMenuDims[3] * (1/10), 
        mainMenuDims[2] * (12/10),
        mainMenuDims[3] * (8/10)];


    if (gameState == 0) {
        if (curMenuPosition[0] == 0) {
            drawMainMenu();
        } else if (curMenuPosition[0] == 3) {
            drawMainMenu();
            drawDisplayMenu();
        }
    }

}
//BASIC GAME LOGIC
function beginGame() {
    if (deathSound.isPlaying()) {
        deathSound.stop();
    }
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
        //curTetro = 3;
        drawNextPiece();
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
    curTetroColor = tetroColors[0];
        if (grid[0][5] == "" && grid[1][5] == "" && grid[2][5] == ""  && grid[3][5] == "" ) { //if there is room for tetronimo
            droppingCells = [[0,5],[1,5],[2,5],[3,5]];
            droppingPiece = true;
            curTetroRotationState = 1;
        } else {
            if (grid[0][5] == ""){
                grid[0][5] = curTetroColor;
            }
            if (grid[1][5] == ""){
                grid[1][5] = curTetroColor;
            }
            if (grid[2][5] == ""){
                grid[2][5] = curTetroColor;
            }
            spawnFail = true;
        }
        break;
    case 2:
        curTetroColor = tetroColors[1];
        if (grid[0][4] == "" && grid[0][5] == "" && grid[1][4] == "" && grid[1][5] == "") { //if there is room for tetronimo
            droppingCells = [[0,4],[0,5],[1,4],[1,5]];
            droppingPiece = true;
            curTetroRotationState = 0;
        } else {
            if (grid[0][4] == "" && grid[0][5][2] == "") {
                grid[0][4][2] = curTetroColor;
                grid[0][5][2] = curTetroColor;
            } 
            spawnFail = true;
        }
        break;
    case 3:
        curTetroColor = tetroColors[2];
        if (grid[0][4] == "" && grid[0][5] == "" && grid[0][6] == ""  && grid[1][5] == "" ) { //if there is room for tetronimo
            droppingCells = [[0,4],[0,6],[0,5],[1,5]];
            droppingPiece = true;
            curTetroRotationState = 2;
            } else {
                if (grid[0][5] == "") {
                    grid[0][5] = curTetroColor;
                }
            spawnFail = true;
        }
        break;
    case 4:
        curTetroColor = tetroColors[3];
        if (grid[0][5] == "" && grid[1][5] == "" && grid[2][5] == ""  && grid[2][4] == "" ) { //if there is room for tetronimo
            droppingCells = [[0,5],[2,5],[1,5],[2,4]];
            droppingPiece = true;
            curTetroRotationState = 3;
        } else {
            if (grid[0][5] == "" && grid[1][5] == "" && grid[1][4] == "") {
                grid[0][5] = curTetroColor;
                grid[1][5] = curTetroColor;
                grid[1][4] = curTetroColor;
            } else if (grid[0][5] == "" && grid[0][4] == "") {
                grid[0][5] = curTetroColor;
                grid[0][4] = curTetroColor;
            }
            spawnFail = true;
        }
        break;
    case 5:
        curTetroColor = tetroColors[4];
        if (grid[0][5] == "" && grid[1][5] == "" && grid[2][5] == ""  && grid[2][6] == "" ) { //if there is room for tetronimo
            droppingCells = [[0,5],[2,5],[1,5],[2,6]];
            droppingPiece = true;
            curTetroRotationState = 1;
        } else {
            if (grid[0][5] == "" && grid[1][5] == "" && grid[1][6] == "") {
                grid[0][5] = curTetroColor
                grid[1][5] = curTetroColor;
                grid[1][6] = curTetroColor;
            } else if (grid[0][5] == "" && grid[0][6] == "") {
                grid[0][5] = curTetroColor;
                grid[0][6] = curTetroColor;
            }
            spawnFail = true;
        }
        break;
    case 6:
        curTetroColor = tetroColors[5];
        if (grid[0][5] == "" && grid[1][5] == "" && grid[0][6] == ""  && grid[1][4] == "" ) { //if there is room for tetronimo
            droppingCells = [[0,5],[0,6],[1,5],[1,4]];
            droppingPiece = true;
            curTetroRotationState = 0;
        } else {
            if (grid[0][5] == "" && grid[0][4] == ""){
                grid[0][5] = curTetroColor;
                grid[0][4] = curTetroColor;
            }
            spawnFail = true;
        }
        break;
    case 7:
        curTetroColor = tetroColors[6];
        if (grid[0][5] == "" && grid[1][5] == "" && grid[1][6] == ""  && grid[0][4] == "" ) { //if there is room for tetronimo
            droppingCells = [[0,5],[1,6],[1,5],[0,4]];
            droppingPiece = true;
            curTetroRotationState = 0;
        } else {
            if (grid[0][5] == "" && grid[0][6] == ""){
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
    //();
    if (spawnFail == true) {
        endGame();
    }
}
function rowIsFull(rowNum) {
    var noWhite = true;
    for (var i = 0; i < gridCols; i++) {
        if (grid[rowNum][i] == "") {
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
    console.log(rowsToCheck);
    for (var i = 0; i < rowsToCheck.length; i++) {
        if (rowIsFull(rowsToCheck[i]) == true) {
            deleteAndPushRow(rowsToCheck[i]);
            simulClears++;
            clears++;
            if (clearsToLevel == 1) {
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
        grid[row][col] = curTetroColor;
    }

}
function addScore() {
    var prevScore = score;
    //if not a tetris, clear previous tetris flag
    if (simulClears != 4) {
        prevTetris = false;
    }
    if (contHDrop > 0) { //points for hard drops
        score = score + (contHDrop * 2);
    } else {
        if (holdingDown == true) { //points for soft drops
            score = score + contSDrop;
        }
    }
    contHDrop = 0;
    contSDrop = 0;

    //single clear
    if (simulClears == 1) {
        if (wasTSpin == 1) {
            if (!tspinSound.isPlaying()) {
                tspinSound.play();
            }
        } else if (wasTSpin == 2) {
            if (!tspinMiniSound.isPlaying()) {
                tspinMiniSound.play();
            }
        } else {
            totSingle++;
            score = score + 100;
        }
    //double clear
    } else if (simulClears == 2) {
        if (wasTSpin == 1) {
            if (!tspinSound.isPlaying()) {
                tspinSound.play();
            }
        } else if (wasTSpin == 2) {
            if (!tspinMiniSound.isPlaying()) {
                tspinMiniSound.play();
            }
        } else {
            score = score + 300;
            totDouble++;
        }
    //triple clear
    } else if (simulClears == 3) {
        if (!tspinSound.isPlaying()) {
            tspinSound.play();
        }
        if (wasTSpin == 1) {
            
        } else {
            score = score + 500;
            totTriple++;
        }
    //tetris
    } else if (simulClears == 4) {
        if (prevTetris == true) {
            totBtoB ++;
            if (!BtoBTetrisSound.isPlaying()) {
                BtoBTetrisSound.play();
            }
        }
        prevTetris = true;
        totTetris++;
        score = score + 800;
    } else if (simulClears == 0) {
        if (wasTSpin == 1) {
            if (!tspinSound.isPlaying()) {
                tspinSound.play();
            }
        } else if (wasTSpin == 2) {
            if (!tspinMiniSound.isPlaying()) {
                tspinMiniSound.play();
            }
        }
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
    if (!deathSound.isPlaying()) {
        deathSound.play();
    }
}
//--------------------------------------------------------------------------AUDIO---------------------------------------------------------------------------------------------------
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
    if (level910Music.isPlaying()) {
        level910Music.stop(); // Stop the music
    }
    if (level1112Music.isPlaying()) {
        level1112Music.stop(); // Stop the music
    }
    if (level1314Music.isPlaying()) {
        level1314Music.stop(); // Stop the music
    }
    if (level1516Music.isPlaying()) {
        level1516Music.stop(); // Stop the music
    }
    if (level1718Music.isPlaying()) {
        level1718Music.stop(); // Stop the music
    }
    if (level19PMusic.isPlaying()) {
        level19PMusicMusic.stop(); // Stop the music
    }
}
function initVolume() {
    setMusicVolume(audioLevels[0]);
    setSFXVolume(audioLevels[1]);
}
function setMusicVolume(newVol) {
    menuMusic.setVolume(newVol/100);
    level12Music.setVolume(newVol/100);
    level34Music.setVolume(newVol/100);
    level56Music.setVolume(newVol/100);
    level78Music.setVolume(newVol/100);
    level910Music.setVolume(newVol/100);
    level1112Music.setVolume(newVol/100);
    level1314Music.setVolume(newVol/100);
    level1516Music.setVolume(newVol/100);
    level1718Music.setVolume(newVol/100);
    level19PMusic.setVolume(newVol/100);
    saveAudio();
}
function setSFXVolume(newVol) {
    singleClearSound.setVolume(newVol/100);
    doubleClearSound.setVolume(newVol/100);
    tripleClearSound.setVolume(newVol/100);
    fourClearSound.setVolume(newVol/100);
    allClearSound.setVolume(newVol/100);
    saveAudio();
}
function incSoundPack() {
    stopMusic();
     if (audioLevels[2] == audioPacks.length - 1) {
        audioLevels[2] = 0;
     } else {
        audioLevels[2]++;
     }
}
function decSoundPack() {
    stopMusic();
    if (audioLevels[2] == 0) {
       audioLevels[2] = audioPacks.length - 1;
    } else {
       audioLevels[2]--;
    }
}
function playNewSoundPack() {
    switch(audioLevels[2]) {
    case 0:
        stopMusic();
        menuMusic = loadSound('aud/classic/menuMusic.wav', onSoundLoaded);
        level12Music = loadSound('aud/classic/level12Music.wav');
        level34Music = loadSound('aud/classic/level34Music.wav');
        level56Music = loadSound('aud/classic/level56Music.wav');
        level78Music = loadSound('aud/classic/level78Music.wav');
        level910Music = loadSound('aud/classic/level910Music.wav');
        level1112Music = loadSound('aud/classic/level1112Music.wav');
        level1314Music = loadSound('aud/classic/level1314Music.wav');
        level1516Music = loadSound('aud/classic/level1516Music.wav');
        level1718Music = loadSound('aud/classic/level1718Music.wav');
        level19PMusic = loadSound('aud/classic/level19PMusic.wav');
        singleClearSound = loadSound('aud/classic/singleClearSound.wav');
        doubleClearSound = loadSound('aud/classic/doubleClearSound.wav');
        tripleClearSound = loadSound('aud/classic/tripleClearSound.wav');
        fourClearSound = loadSound('aud/classic/fourClearSound.wav');
        BtoBTetrisSound = loadSound('aud/classic/BtoBTetrisSound.wav');
        allClearSound = loadSound('aud/classic/allClearSound.wav');
        tspinSound = loadSound('aud/classic/tspinSound.wav');
        tspinMiniSound = loadSound('aud/classic/tspinMiniSound.wav');
        deathSound = loadSound('aud/classic/deathSound.wav');
    break;
    case 1:
        stopMusic();
        menuMusic = loadSound('aud/crash/menuMusic.wav', onSoundLoaded);
        level12Music = loadSound('aud/crash/level12Music.wav');
        level34Music = loadSound('aud/crash/level34Music.wav');
        level56Music = loadSound('aud/crash/level56Music.wav');
        level78Music = loadSound('aud/crash/level78Music.wav');
        level910Music = loadSound('aud/crash/level910Music.wav');
        level1112Music = loadSound('aud/crash/level1112Music.wav');
        level1314Music = loadSound('aud/crash/level1314Music.wav');
        level1516Music = loadSound('aud/crash/level1516Music.wav');
        level1718Music = loadSound('aud/crash/level1718Music.wav');
        level19PMusic = loadSound('aud/crash/level19PMusic.wav');
        singleClearSound = loadSound('aud/crash/singleClearSound.wav');
        doubleClearSound = loadSound('aud/crash/doubleClearSound.wav');
        tripleClearSound = loadSound('aud/crash/tripleClearSound.wav');
        fourClearSound = loadSound('aud/crash/fourClearSound.wav');
        BtoBTetrisSound = loadSound('aud/crash/BtoBTetrisSound.wav');
        allClearSound = loadSound('aud/crash/allClearSound.wav');
        tspinSound = loadSound('aud/crash/tspinSound.wav');
        tspinMiniSound = loadSound('aud/crash/tspinMiniSound.wav');
        deathSound = loadSound('aud/crash/deathSound.wav');
    break;
    default:
        stopMusic();
        menuMusic = loadSound('aud/classic/menuMusic.wav', onSoundLoaded);
        level12Music = loadSound('aud/classic/level12Music.wav');
        level34Music = loadSound('aud/classic/level34Music.wav');
        level56Music = loadSound('aud/classic/level56Music.wav');
        level78Music = loadSound('aud/classic/level78Music.wav');
        level910Music = loadSound('aud/classic/level910Music.wav');
        level1112Music = loadSound('aud/classic/level1112Music.wav');
        level1314Music = loadSound('aud/classic/level1314Music.wav');
        level1516Music = loadSound('aud/classic/level1516Music.wav');
        level1718Music = loadSound('aud/classic/level1718Music.wav');
        level19PMusic = loadSound('aud/classic/level19PMusic.wav');
        singleClearSound = loadSound('aud/classic/singleClearSound.wav');
        doubleClearSound = loadSound('aud/classic/doubleClearSound.wav');
        tripleClearSound = loadSound('aud/classic/tripleClearSound.wav');
        fourClearSound = loadSound('aud/classic/fourClearSound.wav');
        BtoBTetrisSound = loadSound('aud/classic/BtoBTetrisSound.wav');
        allClearSound = loadSound('aud/classic/allClearSound.wav');
        tspinSound = loadSound('aud/classic/tspinSound.wav');
        tspinMiniSound = loadSound('aud/classic/tspinMiniSound.wav');
        deathSound = loadSound('aud/classic/deathSound.wav');
    break;
    }
    initVolume();
    saveAudio();
}
function increaseColorVal() {
    if (curMenuPosition[1] != 3) {
        if (changingColor[curMenuPosition[1]] < 255) {
            changingColor[curMenuPosition[1]]++;
            drawColorChangeMenu(changingColor);
        }
    }
}
function decreaseColorVal() {
    if (curMenuPosition[1] != 3) {
        if (changingColor[curMenuPosition[1]] > 0) {
            changingColor[curMenuPosition[1]]--;
            drawColorChangeMenu(changingColor);
        }
    }
}
function updateColors() {
    if (chColVal != 0) {
        switch (chColVal) {
            case 1:
                curTetro[0] = changingColor;
            break;
            case 2:
                curTetro[1] = changingColor;
            break;
            case 3:
                curTetro[2] = changingColor;
            break;
            case 4:
                curTetro[3] = changingColor;
            break;
            case 5:
                curTetro[4] = changingColor;
            break;
            case 6:
                curTetro[5] = changingColor;
            break;
            case 7:
                curTetro[6] = changingColor;
            break;
            case 8:
                ghostColor = changingColor;
            break;
            case 9:
                gridColor = changingColor;
            break;
            case 10:
                primUIColor = changingColor;
            break;
            case 11:
                secUIColor = changingColor;
            break;
            case 12:
                tertUIColor = changingColor;
            break;
            case 13:
                accentColor = changingColor;
            break;
            case 14:
                textColor = changingColor;
            break;
        }
        chColVal = 0;
    }
    saveColors();
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
function getTspinVal() {
        var cornerCount = 0;

        if (grid[droppingCells[2][0]+1][droppingCells[2][1]+1] != "" || droppingCells[2][0]+1 == gridRows || droppingCells[2][1]+1 == gridCols) {
            cornerCount++;
        }
        if (grid[droppingCells[2][0]-1][droppingCells[2][1]+1] != "" || droppingCells[2][0]-1 == 0 || droppingCells[2][1]+1 == gridCols) {
            cornerCount++;
        }
        if (grid[droppingCells[2][0]+1][droppingCells[2][1]-1] != "" || droppingCells[2][0]+1 == gridRows || droppingCells[2][1]-1 == 0) {
            cornerCount++;
        }
        if (grid[droppingCells[2][0]-1][droppingCells[2][1]-1] != "" || droppingCells[2][0]-1 == 0 || droppingCells[2][1]-1 == 0) {
            cornerCount++;
        }
        if (cornerCount > 2) {
            cornerCount = 0;
            wasTSpin = 1;
            switch(curTetroRotationState) {
                case 0:
                    if (grid[droppingCells[2][0]-1][droppingCells[2][1]+1] != "" || droppingCells[2][0]+1 == gridRows || droppingCells[2][1]+1 == gridCols) {
                        cornerCount++;
                    }
                    if (grid[droppingCells[2][0]-1][droppingCells[2][1]-1] != "" || droppingCells[2][0]-1 == 0 || droppingCells[2][1]-1 == 0) {
                        cornerCount++;
                    }
                break;
                case 1:
                    if (grid[droppingCells[2][0]+1][droppingCells[2][1]+1] != "" || droppingCells[2][0]+1 == gridRows || droppingCells[2][1]+1 == gridCols) {
                        cornerCount++;
                    }
                    if (grid[droppingCells[2][0]-1][droppingCells[2][1]+1] != "" || droppingCells[2][0]-1 == 0 || droppingCells[2][1]+1 == gridCols) {
                        cornerCount++;
                    }
                break;
                case 2:
                    if (grid[droppingCells[2][0]+1][droppingCells[2][1]+1] != "" || droppingCells[2][0]+1 == gridRows || droppingCells[2][1]+1 == gridCols) {
                        cornerCount++;
                    }
                    if (grid[droppingCells[2][0]+1][droppingCells[2][1]-1] != "" || droppingCells[2][0]+1 == gridRows || droppingCells[2][1]-1 == 0) {
                        cornerCount++;
                    }
                break;
                case 3:
                    if (grid[droppingCells[2][0]+1][droppingCells[2][1]-1] != "" || droppingCells[2][0]+1 == gridRows || droppingCells[2][1]-1 == 0) {
                        cornerCount++;
                    }
                    if (grid[droppingCells[2][0]-1][droppingCells[2][1]-1] != "" || droppingCells[2][0]-1 == 0 || droppingCells[2][1]-1 == 0) {
                        cornerCount++;
                    }
                break;
            }
            if (cornerCount != 2) {
                wasTSpin = 2;
            }
        }
        else {
            wasTSpin = -1;
        }
}
function wasAllClear() {
    for (let i = 0; i < grid.length; i++) {  // Outer loop for each row
        for (let j = 0; j < grid[i].length; j++) {  // Inner loop for each element in the row
            if (grid[i][j] != "") {
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
    if (musicMute == false) {
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
            if (!level910Music.isPlaying()) {
                level910Music.loop(); // Start and loop the music
            }
        }
        if (level == 11) {
            if (level910Music.isPlaying()) {
                level910Music.stop(); // Stop the music
            }
            if (!level1112Music.isPlaying()) {
                level1112Music.loop(); // Start and loop the music
            }
        }
        if (level == 13) {
            if (level1112Music.isPlaying()) {
                level1112Music.stop(); // Stop the music
            }
            if (!level1314Music.isPlaying()) {
                level1314Music.loop(); // Start and loop the music
            }
        }
        if (level == 15) {
            if (level1314Music.isPlaying()) {
                level1314Music.stop(); // Stop the music
            }
            if (!level1516Music.isPlaying()) {
                level1516Music.loop(); // Start and loop the music
            }
        }
        if (level == 17) {
            if (level1516Music.isPlaying()) {
                level1516Music.stop(); // Stop the music
            }
            if (!level1718Music.isPlaying()) {
                level1718Music.loop(); // Start and loop the music
            }
        }
        if (level == 19) {
            if (level1718Music.isPlaying()) {
                level1718Music.stop(); // Stop the music
            }
            if (!level19PMusic.isPlaying()) {
                level19PMusic.loop(); // Start and loop the music
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
            grid[i][j] = grid[i-1][j];
        }
    }
    for (var j = 0; j < gridCols; j++) {
        grid[0][j] = "";
    }
}

//-----------------------------------------------------------------------------MOVEMENT---------------------------------------------------------------------------------------------
function onGround(cells) {
    for (let i = 0; i < 4; i++) {
        let col = cells[i][1];
        let row = cells[i][0];
        // If any part is at the bottom of the entire grid
        if (row >= gridRows - 1) {
            return true;
        }
        // Check if the next row is occupied
        if (grid[row + 1][col] != "") {
            return true;
        }
    }
    return false;
}
function moveDown() {
    wasTSpin = -1;
    for (let i = 0; i < 4; i++) {
        droppingCells[i][0] += 1; // Move left
    }

}
function moveLeft() {
    if (droppingPiece && gameState == 1) {
        if (tryMovement(droppingCells, 0, -1) == true) {
            console.log("Moving Left!");
            wasTSpin = -1;
            resetLockDelay();
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
            wasTSpin = -1;
            resetLockDelay();
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
    let successfulRotation = false;
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
            (grid[newX][newY] != "") // Ensure new cell is empty
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
        if (curTetro == 3) {
            wasTSpin = 0
        }
        successfulRotation = true;
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
                        if (curTetro == 3) {
                            wasTSpin = 0
                        }
                        successfulRotation = true;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, -1, -1)) { // Move one left and up
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += -1
                                newPositions[i][1] += -1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 1;
                            if (curTetro == 3) {
                                wasTSpin = 0
                            }
                            successfulRotation = true;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 2, 0)) { // Move down two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 1;
                                if (curTetro == 3) {
                                    wasTSpin = 0
                                }
                                successfulRotation = true;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, -1)) { // Move down two left one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += -1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 1;
                                    if (curTetro == 3) {
                                        wasTSpin = 0
                                    }
                                    successfulRotation = true;
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
                        if (curTetro == 3) {
                            wasTSpin = 0
                        }
                        successfulRotation = true;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 1, 1)) { // Move one right and down
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += 1
                                newPositions[i][1] += 1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 2;
                            if (curTetro == 3) {
                                wasTSpin = 0
                            }
                            successfulRotation = true;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -2, 0)) { // Move up two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] -= 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 2;
                                if (curTetro == 3) {
                                    wasTSpin = 0
                                }
                                successfulRotation = true;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, -2, 1)) { // Move up two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += -2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 2;
                                    if (curTetro == 3) {
                                        wasTSpin = 0
                                    }
                                    successfulRotation = true;
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
                        if (curTetro == 3) {
                            wasTSpin = 0
                        }
                        successfulRotation = true;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, -1, 1)) { // Move one right and up
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += -1
                                newPositions[i][1] += 1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 3;
                            if (curTetro == 3) {
                                wasTSpin = 0
                            }
                            successfulRotation = true;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 2, 0)) { // Move down two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 3;
                                if (curTetro == 3) {
                                    wasTSpin = 0
                                }
                                successfulRotation = true;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, 1)) { // Move down two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 3;
                                    if (curTetro == 3) {
                                        wasTSpin = 0
                                    }
                                    successfulRotation = true;
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
                        if (curTetro == 3) {
                            wasTSpin = 0
                        }
                        successfulRotation = true;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 1, -1)) { // Move one left and down
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += 1
                                newPositions[i][1] += -1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 0;
                            if (curTetro == 3) {
                                wasTSpin = 0
                            }
                            successfulRotation = true;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -2, 0)) { // Move up two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] -= 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 0;
                                if (curTetro == 3) {
                                    wasTSpin = 0
                                }
                                successfulRotation = true;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, 1)) { // Move down two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 0;
                                    if (curTetro == 3) {
                                        wasTSpin = 0
                                    }
                                    successfulRotation = true;
                                }
                            }
                        }
                    }
                break;
            }
        }
    }
    if (successfulRotation == true) {
        resetLockDelay();
    }
}
function rotateLeft() {
    let pivot = droppingCells[2]; // Use the 3rd cell as pivot
    let newPositions = [];
    let collDet = false;
    let successfulRotation = false;
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
            (grid[newX][newY] != "") // Ensure new cell is empty
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
        wasTSpin = 0;
        successfulRotation = true;
    } else {
        if (curTetro == 1) {
            console.log("KILL MYSELF, WHAT");
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
                        if (curTetro == 3) {
                            wasTSpin = 0
                        }
                        successfulRotation = true;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, -1, 1)) { // Move one right and up
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += -1
                                newPositions[i][1] += 1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 3;
                            if (curTetro == 3) {
                                wasTSpin = 0
                            }
                            successfulRotation = true;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 2, 0)) { // Move down two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 3;
                                if (curTetro == 3) {
                                    wasTSpin = 0
                                }
                                successfulRotation = true;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, 1)) { // Move down two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 3;
                                    if (curTetro == 3) {
                                        wasTSpin = 0
                                    }
                                    successfulRotation = true;
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
                        if (curTetro == 3) {
                            wasTSpin = 0
                        }
                        successfulRotation = true;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 1, 1)) { // Move one right and down
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += 1
                                newPositions[i][1] += 1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 0;
                            if (curTetro == 3) {
                                wasTSpin = 0
                            }
                            successfulRotation = true;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -2, 0)) { // Move up two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] -= 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 0;
                                if (curTetro == 3) {
                                    wasTSpin = 0
                                }
                                successfulRotation = true;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, -2, 1)) { // Move up two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += -2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 0;
                                    if (curTetro == 3) {
                                        wasTSpin = 0
                                    }
                                    successfulRotation = true;
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
                        if (curTetro == 3) {
                            wasTSpin = 0
                        }
                        successfulRotation = true;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, -1, -1)) { // Move one left and up
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += -1
                                newPositions[i][1] += -1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 1;
                            if (curTetro == 3) {
                                wasTSpin = 0
                            }
                            successfulRotation = true;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, 2, 0)) { // Move down two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] += 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 1;
                                if (curTetro == 3) {
                                    wasTSpin = 0
                                }
                                successfulRotation = true;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, -1)) { // Move down two left one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += -1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 1;
                                    if (curTetro == 3) {
                                        wasTSpin = 0
                                    }
                                    successfulRotation = true;
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
                        if (curTetro == 3) {
                            wasTSpin = 0
                        }
                        successfulRotation = true;
                    } else {
                        //=================TEST 2================
                        if (tryMovement(newPositions, 1, -1)) { // Move one left and down
                            for (var i = 0; i < 4; i++) { // Apply position change
                                newPositions[i][0] += 1
                                newPositions[i][1] += -1
                            }
                            updateCurrentPosition(newPositions);
                            curTetroRotationState = 2;
                            if (curTetro == 3) {
                                wasTSpin = 0
                            }
                            successfulRotation = true;
                        } else {
                            //=================TEST 3================
                            if (tryMovement(newPositions, -2, 0)) { // Move up two
                                for (var i = 0; i < 4; i++) { // Apply position change
                                    newPositions[i][0] -= 2
                                }
                                updateCurrentPosition(newPositions);
                                curTetroRotationState = 2;
                                if (curTetro == 3) {
                                    wasTSpin = 0
                                }
                                successfulRotation = true;
                            } else {
                                //=================TEST 4================
                                if (tryMovement(newPositions, 2, 1)) { // Move down two right one
                                    for (var i = 0; i < 4; i++) { // Apply position change
                                        newPositions[i][0] += 2
                                        newPositions[i][1] += 1
                                    }
                                    updateCurrentPosition(newPositions);
                                    curTetroRotationState = 2;
                                    if (curTetro == 3) {
                                        wasTSpin = 0
                                    }
                                    successfulRotation = true;
                                }
                            }
                        }
                    }
                break;
            }
        }
    }
    if (successfulRotation == true) {
        resetLockDelay();
    }
}
function holdPiece() {
    var newPiece;
    if (heldTetro == 0) {       //if no piece held already
        heldTetro = curTetro;       //set hold to current tetro
        curTetro = getFromBag();    //get current tetro from bag
        drawNextPiece();
        drawAdtlNext();
    } else {                    //if piece held
        newPiece = heldTetro;       //put held piece in temp
        heldTetro = curTetro;       //set the hold to the current tetro
        curTetro = newPiece;        //set the current to the new piece
    }
    //clear current piece from screen
    droppingCells.forEach(([r, c]) => grid[r][c] = "");
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
            (grid[x][y] != "") // Ensure new cell is empty
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
function resetLockDelay() {
    if (onGround(droppingCells) && lockResets < lockResetLimit) {
        lockTimer = frameCount; // Reset lock timer
        lockResets++;
        console.log("LOCK RESETS: " + lockResets);
    }
}
//------------------------------------------------------------------------------DRAWING---------------------------------------------------------------------------------------------
    //play area
function drawGrid(){
    stroke(accentColor);
    strokeWeight(1);
    fill(gridColor);
    rect(0,0,gridWidth,gridHeight);
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            stroke(0,0,0);
            strokeWeight(1);

            if (!grid[i][j]) {
                strokeWeight(0);
                fill(gridColor);
            } else {
                strokeWeight(1);
                fill(grid[i][j]);
            }
            rect(j*cellWid,  i*cellHi, cellWid, cellHi); 
            strokeWeight(1);
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
        var col = ghostCells[i][0];
        var row = ghostCells[i][1];
        fill(ghostColor);
        rect(row*cellWid,col*cellHi,cellWid, cellHi);
    }
}
function drawFallingPiece() {
    for (var i = 0; i < droppingCells.length; i++) {
        var col = droppingCells[i][0];
        var row = droppingCells[i][1];
        fill(curTetroColor);
        rect(row*cellWid,col*cellHi,cellWid, cellHi);
    }
}
    //IN GAME UI
function drawUI() {
    //Bounding Rectangle
    stroke("black");
    fill("black");
    strokeWeight(1);
    rect(UIstartX, 0, UIWidth, canvasHeight);
    //ALL UI ELEMENTS
    drawNextHold();
    drawClearText();
    drawTimer();
    drawClearsCombos();
    drawScore();
    drawLevel();
}
function drawNextHold() {
    //BORDER
    fill(tertUIColor);
    strokeWeight(1);
    stroke(accentColor);
    rect(UIstartX, 0, UIWidth, canvasHeight * (8/20));
    strokeWeight(1);
    //NEXT textbox
    var nxtTxtL = UIstartX + (UIWidth / 10);
    var nxtTxtT = 0;
    var nxtTxtW = UIWidth * (6/20);
    var nxtTxtH = canvasHeight / 20;
    drawCenteredText("NEXT", nxtTxtL, nxtTxtT, nxtTxtW, nxtTxtH);
    drawNextPiece(); 
    //HOLD textbox
    var hldTxtL = (UIstartX + UIWidth/2) + (UIWidth / 2) * (8/20)
    var hldTxtT = 0;
    var hldTxtW = UIWidth * (4/20);
    var hldTxtH = canvasHeight / 20;
    drawCenteredText("HOLD", hldTxtL, hldTxtT, hldTxtW, hldTxtH);
    drawHoldPiece();
    drawAdtlNext();
}
function drawNextPiece() {
    var left = UIstartX;
    var width = (UIWidth / 2);
    var height = canvasHeight * (5/20);
    var nxtGrdL = left + (width/5);
    var nxtGrdT = canvasHeight * (1/20);
    var nxtGrdW = width * (12/20);
    var nxtGrdH = height * (12/20);    
    drawMiniGrid(curBag[0], nxtGrdL, nxtGrdT, nxtGrdW, nxtGrdH);
}
function drawHoldPiece() {
    var left = UIstartX + UIWidth/2 ;
    var width = (UIWidth / 2);
    var height = canvasHeight * (5/20);
    var hldGrdL = left + width * (8/20);
    var hldGrdT = canvasHeight * (1/20);
    var hldGrdW = width * (8/20);
    var hldGrdH = height * (8/20);
    drawMiniGrid(heldTetro, hldGrdL, hldGrdT, hldGrdW, hldGrdH);
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

    //grid locations
    var gridT = (canvasHeight) * (5/20) + (canvasHeight * (3/80));
    var gridL = UIstartX + (UIWidth * (1/40));
    var gridW = UIWidth * (3/20);
    var gridH = gridW;

    for (var i = 0; i < 5; i++) {
        drawMiniGrid(nextTets[i], gridL, gridT, gridW, gridH);
        gridL = gridL + gridW + (UIWidth * (1/20))
    }
}
function drawMiniGrid(tetNum, left, top, width, height) { //needs work
    let nxtGrid = [];
    var cellWidth = ((width) / 4) - 1;
    var cellHeight = ((height) / 4) - 1;
    var cellX = left;
    var cellY = top;
    var tCell = [];
    var tRow = [];

    //drawEmptyTetroBox();
    stroke (accentColor);
    strokeWeight(2);
    fill(secUIColor);
    rect(left,top, width, height);

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
       nxtGrid[0][2][2] = tetroColors[0];
       nxtGrid[1][2][2] = tetroColors[0];
       nxtGrid[2][2][2] = tetroColors[0];
       nxtGrid[3][2][2] = tetroColors[0];
        break;
    case 2:
       nxtGrid[1][1][2] = tetroColors[1];
       nxtGrid[1][2][2] = tetroColors[1];
       nxtGrid[2][1][2] = tetroColors[1];
       nxtGrid[2][2][2] = tetroColors[1];
        break;
    case 3:
       nxtGrid[1][1][2] = tetroColors[2];
       nxtGrid[1][2][2] = tetroColors[2];
       nxtGrid[1][3][2] = tetroColors[2];
       nxtGrid[2][2][2] = tetroColors[2];
        break;
    case 4:
       nxtGrid[0][2][2] = tetroColors[3];
       nxtGrid[1][2][2] = tetroColors[3];
       nxtGrid[2][2][2] = tetroColors[3];
       nxtGrid[2][1][2] = tetroColors[3];
        break;
    case 5:
       nxtGrid[0][1][2] = tetroColors[4];
       nxtGrid[1][1][2] = tetroColors[4];
       nxtGrid[2][1][2] = tetroColors[4];
       nxtGrid[2][2][2] = tetroColors[4];
        break;
    case 6:
       nxtGrid[1][3][2] = tetroColors[5];
       nxtGrid[1][2][2] = tetroColors[5];
       nxtGrid[2][2][2] = tetroColors[5];
       nxtGrid[2][1][2] = tetroColors[5];
        break;
    case 7:
       nxtGrid[1][1][2] = tetroColors[6];
       nxtGrid[1][2][2] = tetroColors[6];
       nxtGrid[2][2][2] = tetroColors[6];
       nxtGrid[2][3][2] = tetroColors[6];
        break;
    default:
        break;
    }

    for (var i = 0; i < nxtGrid.length; i++) {
        for (var j = 0; j < nxtGrid[0].length; j++) {
            if (nxtGrid[i][j][2] != "white") {
                if (nxtGrid[i][j][2] != tetroColors[3] && nxtGrid[i][j][2] != tetroColors[4] && nxtGrid[i][j][2] != tetroColors[1]) {
                    nxtGrid[i][j][0][0] = nxtGrid[i][j][0][0] - (cellWidth / 2);
                    nxtGrid[i][j][1][0] = nxtGrid[i][j][1][0] - (cellWidth / 2);
                }
                if ( nxtGrid[i][j][2] == tetroColors[3] || nxtGrid[i][j][2] == tetroColors[4]) {
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
function drawClearText(clearString) {
    var top = canvasHeight*(8/20);
    var height = (canvasHeight) * (3/20);
    fill(primUIColor);
    strokeWeight(1);
    stroke(accentColor);
    rect(UIstartX, top, UIWidth, height);
    if (clearString != "" ) {
        drawCenteredText(clearString, UIstartX, top, UIWidth, height, 24);
    }
}
function drawTimer() {
    var top = (canvasHeight) * (11/20);
    var height = (canvasHeight) * (2/20);
     stroke(accentColor);
     strokeWeight(1);
     fill(tertUIColor);
     rect(UIstartX, top, UIWidth, height);
     drawCenteredText(msToMinuteSecondTime(elapsedTime), UIstartX, top, UIWidth, height, 24);
}
function drawClearsCombos() {
    var clrT = (canvasHeight) * (13/20);
    var clrL = UIstartX;
    var clrW = UIWidth /3;
    var clrH = (canvasHeight) * (3/20);
    var disTxt = ["Lines Cleared", "Lines to Level", "Combo"];
    //header text
    for (var i = 0; i < 3; i++) {
        fill(secUIColor);
        stroke(accentColor);
        strokeWeight(1);
        rect(clrL + (clrW*i), clrT, clrW, clrH);
        drawCenteredText(disTxt[i], clrL + (clrW*i), clrT, clrW, clrH/4, 80);
    }
    drawClears();
    drawCombos();
}
function drawClears() {
    var clrT = ((canvasHeight) * (13/20)) + ((canvasHeight) * (3/20)/4);
    var clrL = UIstartX;
    var clrW = UIWidth /3;
    var clrH = (canvasHeight) * (9/80);
    //draw bounding rectangle
     drawCenteredText(clears, clrL, clrT, clrW, clrH, 60);
     clrL += clrW;
     drawCenteredText(clearsToLevel, clrL, clrT, clrW, clrH, 60);
}
function drawCombos() {
    var clrT = ((canvasHeight) * (13/20)) + ((canvasHeight) * (3/20)/4);
    var clrL = UIstartX + (UIWidth * (2/3));
    var clrW = UIWidth /3;
    var clrH = (canvasHeight) * (9/80);

     drawCenteredText(combo, clrL, clrT, clrW, clrH, 60);
}
function drawScore() {
    let top = ((gridHeight+1) * (8/10));
    let height = gridHeight * (3/20);
    stroke(accentColor);
    strokeWeight(1);
    fill(primUIColor);
    rect(UIstartX, top, UIWidth, height);
    height = gridHeight * (1/20);
    drawCenteredText("SCORE", UIstartX, top, UIWidth, height, 24);
    top += height;
    height = height * 2;
    drawCenteredText(score, UIstartX, top, UIWidth, height, 40);
}
function drawLevel() {
    let top = gridHeight * (19/20);
    let height = gridHeight * (1/20);
    stroke(accentColor);
    strokeWeight(1);
    fill(tertUIColor);
    rect(UIstartX, top, UIWidth, height);
    drawCenteredText("Level " + level, UIstartX, top, UIWidth, height);
}
function drawScoreboard() { //needs work
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

    text("T-Spins: " + totTspin, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("T-Spin Minis: " + totTSpinM, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);

    SBTXTop = SBTXTop + (SBHeight * (1/20));
    SBTXHeight = SBHeight * (1/10);

    text("Highest Combo: " + maxCombo, SBTXLeft + (SBTXWidth) / 2, SBTXTop + (SBTXHeight) / 2);
}
    //MENUS
function drawMainMenu() {
    //Menu Bounding Box
    strokeWeight(8);
    stroke(accentColor);
    fill(secUIColor);
    rect(mainMenuDims[0], mainMenuDims[1], mainMenuDims[2], mainMenuDims[3]);
    strokeWeight(1);
    //Margins and buffer between 
    var lMarg = mainMenuDims[2] * (1/20);
    var tMarg = mainMenuDims[3] * (1/20);
    var lSecBuff = mainMenuDims[2] * (1/10);
    var tSecBuff = mainMenuDims[3] * (2/10);
    var titleWidth = mainMenuDims[2] - (lMarg * 2);
    var titleHeight = mainMenuDims[3] * (2/10);

    drawUIBoxWithText("* * * TETRIS * * *", tertUIColor, primUIColor, textColor, 5, 40, mainMenuDims[0]+lMarg, mainMenuDims[1]+tMarg, titleWidth, titleHeight);
    var btnLeft = mainMenuDims[0] + lMarg;
    var btnTop = mainMenuDims[1] + tMarg + titleHeight + tSecBuff;
    var btnWidth = titleWidth
    var btnHeight = mainMenuDims[3] * (1/10);

    for (var i = 0; i < mainMenuOptions[0].length; i++) {
        btnWidth = (mainMenuDims[2] - (lMarg * 2) - (lSecBuff*(mainMenuOptions[0][i].length - 1))) / mainMenuOptions[0][i].length;
        for (var j = 0; j < mainMenuOptions[0][i].length; j++) {
            drawUIBoxWithText(mainMenuOptions[0][i][j], secUIColor, accentColor, textColor, 2, 40, btnLeft, btnTop, btnWidth, btnHeight);
            mainMenuOptions[1][i][j] = [btnLeft, btnTop, btnWidth, btnHeight];
            btnLeft = btnLeft + btnWidth + lSecBuff;
        }
        btnLeft = mainMenuDims[0] + lMarg;
        btnTop = btnTop + btnHeight + tMarg;
    }
    highlightMenuOption([0,0,0]);
}
function drawSettingsMenu() {
    var ctrTop = mainMenuDims[0] * (1/10);
    var ctrLeft = mainMenuDims[1] * (1/10);
    var ctrHeight = mainMenuDims[2] * (8/10);
    var ctrWidth = mainMenuDims[3] * (12/10);
    drawUIBoxWithText("SETTINGS COMING SOON", darkUIColor, lightUIColor, "white", 1, 20, ctrTop, ctrLeft, ctrHeight, ctrWidth);
}
function drawControlsMenu() {
    //Menu Bounding Box
    strokeWeight(8);
    stroke(accentColor);
    fill(secUIColor);
    rect(controlMenuDims[0], controlMenuDims[1], controlMenuDims[2], controlMenuDims[3]);
    strokeWeight(1);
    //Margins and buffer between 
    var lMarg = controlMenuDims[2] * (1/20);
    var tMarg = controlMenuDims[3] * (1/40);
    var lSecBuff = controlMenuDims[2] * (1/10);
    var tSecBuff = controlMenuDims[3] * (3/20);
    var titleWidth = controlMenuDims[2] - (lMarg * 2);
    var titleHeight = controlMenuDims[3] * (1/20);

    drawUIBoxWithText("In Game Controls", secUIColor, accentColor, textColor, 0, 40, controlMenuDims[0]+lMarg, controlMenuDims[1]+tMarg, titleWidth, titleHeight);
    var btnLeft = controlMenuDims[0] + lMarg;
    var btnTop = controlMenuDims[1] + tMarg + titleHeight + tMarg;
    var btnWidth = titleWidth
    var btnHeight = controlMenuDims[3] * (1/20);

    for (var i = 0; i < 4; i++) {
        btnWidth = (controlMenuDims[2] - (lMarg * 4) - (lSecBuff*(controlMenuOptions[0][i].length - 1))) / (controlMenuOptions[0][i].length * 2);
        for (var j = 0; j < controlMenuOptions[0][i].length; j++) {

            drawUIBoxWithText(labContArr[i][j], accentColor, accentColor, textColor, 2, 40, btnLeft, btnTop, btnWidth, btnHeight);
            btnLeft = btnLeft + btnWidth + lMarg;

            drawUIBoxWithText(controlMenuOptions[0][i][j], secUIColor, accentColor, textColor, 2, 20, btnLeft, btnTop, btnWidth, btnHeight);
            controlMenuOptions[1][i][j] = [btnLeft, btnTop, btnWidth, btnHeight];
            btnLeft = btnLeft + btnWidth + lSecBuff;
        }
        btnLeft = controlMenuDims[0] + lMarg;
        btnTop = btnTop + btnHeight + tMarg;
    }

    drawUIBoxWithText("Menu Controls", secUIColor, accentColor, textColor, 5, 40, controlMenuDims[0]+lMarg, btnTop+tSecBuff, titleWidth, titleHeight);
    btnTop = btnTop+tSecBuff + titleHeight + tMarg;
    for (var i = 4; i < controlMenuOptions[0].length; i++) {
        btnWidth = (controlMenuDims[2] - (lMarg * 4) - (lSecBuff*(controlMenuOptions[0][i].length - 1))) / (controlMenuOptions[0][i].length * 2);
        for (var j = 0; j < controlMenuOptions[0][i].length; j++) {
            drawUIBoxWithText(labContArr[i][j], accentColor, accentColor, textColor, 2, 40, btnLeft, btnTop, btnWidth, btnHeight);
            btnLeft = btnLeft + btnWidth + lMarg;

            drawUIBoxWithText(controlMenuOptions[0][i][j], secUIColor, accentColor, textColor, 2, 20, btnLeft, btnTop, btnWidth, btnHeight);
            controlMenuOptions[1][i][j] = [btnLeft, btnTop, btnWidth, btnHeight];
            btnLeft = btnLeft + btnWidth + lSecBuff;
        }
        btnLeft = controlMenuDims[0] + lMarg;
        btnTop = btnTop + btnHeight + tMarg;
    }

    highlightMenuOption(curMenuPosition);
}
function drawDisplayMenu() {
    var left = canvasWidth * (1/20);
    var top = canvasHeight * (1/20);
    var width = canvasWidth * (9/10);
    var height = canvasHeight * (9/10);
    var tMarg = height * (1/40);
    var lMarg = height * (1/20);
    var sectionSep = height * (1/20);
    var curLeft = left + lMarg;
    var curTop = top + tMarg;
    var curWidth = width - lMarg * 2;
    var curHeight = height * (1/20);
    //Bounding Box
    stroke(accentColor);
    strokeWeight(5);
    fill(secUIColor);
    rect(left, top, width, height);
    strokeWeight(1);

    //Menu Label
    drawCenteredText("Dimensions", curLeft, curTop, curWidth, curHeight);
    //Width and height buttons
    curTop = curTop + curHeight + tMarg;
    curHeight = height * (1/10);
    drawUIBoxWithText(displayMenuOptions[0][0][0], secUIColor, accentColor, textColor, 2, 30, curLeft, curTop, curWidth, curHeight);

    displayMenuOptions[1][0][0] = [curLeft, curTop, curWidth, curHeight];
    curTop = curTop + curHeight + tMarg;
    drawUIBoxWithText(displayMenuOptions[0][1][0], secUIColor, accentColor, textColor, 2, 30, curLeft, curTop, curWidth, curHeight);
    displayMenuOptions[1][1][0] = [curLeft, curTop, curWidth, curHeight];
    //Tetro Color Label
    curTop = curTop + curHeight + sectionSep;
    curHeight = height * (1/20);
    drawCenteredText("Tetrimino Colors", curLeft, curTop, curWidth, curHeight);
    
    curTop = curTop + curHeight + tMarg;
    curHeight = height * (1/20);
    curWidth = ((width - lMarg) / 4) - lMarg;
    curLeft = left + lMarg;
    for (var i = 2; i < 4; i++) {
        for (var j = 0; j < displayMenuOptions[0][i].length; j++) {
            stroke(accentColor);
            fill(primUIColor);
            drawUIBoxWithText(displayMenuOptions[0][i][j], secUIColor, accentColor, textColor, 2, 30, curLeft, curTop, curWidth, curHeight);
            displayMenuOptions[1][i][j] = [curLeft, curTop, curWidth, curHeight];
            //rect(curLeft, curTop, curWidth, curHeight);
            curLeft = curLeft + curWidth + lMarg;
        }
        curLeft = left + lMarg;
        curTop = curTop + curHeight + tMarg;
    }
    curTop = curTop + tMarg;
    curLeft = left + lMarg;
    curWidth = width - lMarg * 2;
    drawCenteredText("UI Colors", curLeft, curTop, curWidth, curHeight);
    curWidth = ((width - lMarg) / 4) - lMarg;
    curTop = curTop + curHeight+ tMarg;
    for (var i = 4; i < 6; i++) {
        for (var j = 0; j < displayMenuOptions[0][i].length; j++) {
            stroke(accentColor);
            fill(primUIColor);
            drawUIBoxWithText(displayMenuOptions[0][i][j], secUIColor, accentColor, textColor, 2, 30, curLeft, curTop, curWidth, curHeight);
            displayMenuOptions[1][i][j] = [curLeft, curTop, curWidth, curHeight];
            //rect(curLeft, curTop, curWidth, curHeight);
            curLeft = curLeft + curWidth + lMarg;
        }
        curLeft = left + lMarg;
        curTop = curTop + curHeight + tMarg;
    }
    highlightMenuOption(curMenuPosition);
}
function drawSoundMenu() {
    //Menu Bounding Box
    strokeWeight(8);
    stroke(accentColor);
    fill(secUIColor);
    rect(soundMenuDims[0], soundMenuDims[1], soundMenuDims[2], soundMenuDims[3]);
    strokeWeight(1);
    //Margins and buffer between 
    var lMarg = soundMenuDims[2] * (1/20);
    var tMarg = soundMenuDims[3] * (1/20);
    var lSecBuff = soundMenuDims[2] * (1/10);
    var tSecBuff = soundMenuDims[3] * (3/20);
    var titleWidth = soundMenuDims[2] - (lMarg * 2);
    var titleHeight = soundMenuDims[3] * (1/10);
    drawUIBoxWithText("Sound Settings", secUIColor, accentColor, textColor, 0, 40, soundMenuDims[0]+lMarg, soundMenuDims[1]+tMarg, titleWidth, titleHeight);
    var btnLeft = soundMenuDims[0] + lMarg;
    var btnTop = soundMenuDims[1] + tMarg + titleHeight + tMarg;
    var btnWidth = titleWidth
    var btnHeight = soundMenuDims[3] * (1/10);
        btnWidth = (soundMenuDims[2] - (lMarg * 2) - (lSecBuff*(soundMenuOptions[0][0].length - 1))) / (soundMenuOptions[0][0].length);
        for (var j = 0; j < soundMenuOptions[0][0].length; j++) {
            drawUIBoxWithText(soundMenuOptions[0][0][j], secUIColor, accentColor, textColor, 2, 30, btnLeft, btnTop, btnWidth, btnHeight);
            soundMenuOptions[1][0][j] = [btnLeft, btnTop, btnWidth, btnHeight];
            btnLeft = btnLeft + btnWidth + lSecBuff;

        }
        btnLeft = soundMenuDims[0] + lMarg;
        btnTop = btnTop + btnHeight + tMarg;
        btnWidth = soundMenuDims[2] - (lMarg * 2);
        btnHeight = soundMenuDims[3] * (3/20);
    for (var i = 1; i < soundMenuOptions[0].length; i++) {
        drawUIBoxWithText(soundMenuOptions[0][i][0], secUIColor, accentColor, textColor, 2, 30, btnLeft, btnTop, btnWidth, btnHeight);
        soundMenuOptions[1][i][0] = [btnLeft, btnTop, btnWidth, btnHeight];
        btnTop = btnTop + btnHeight + tMarg;
    }
    highlightMenuOption(curMenuPosition);
}
function drawControlEditWindow(letter) {
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
function drawColorChangeMenu(color) {









    var left = canvasWidth / 4;
    var top = canvasHeight / 3;
    var width = canvasWidth / 2;
    var height = canvasHeight / 1.5;
    //var color = [255,0,0];

    var btnHi = height / 8;
    var btnTop = top+(height/10)+(height/3)

    stroke(accentColor);
    strokeWeight(1);
    fill(secUIColor);
    rect(left, top, width, height);

    fill(color);
    rect(left + (width/8), top+(height/20), width * (3/4), height/3);
    drawUIBoxWithText("Red", secUIColor, accentColor, textColor, 2, 18, left + (width/8), btnTop, width * (3/4), btnHi);
    colorChangeMenuOptions[1][0] = [left + (width/8), btnTop, width * (3/4), btnHi];
    btnTop = btnTop + btnHi + height/40;
    drawUIBoxWithText("Green", secUIColor, accentColor, textColor, 2, 18, left + (width/8), btnTop, width * (3/4), btnHi);
    colorChangeMenuOptions[1][1] = [left + (width/8), btnTop, width * (3/4), btnHi];
    btnTop = btnTop + btnHi + height/40;
    drawUIBoxWithText("Blue", secUIColor, accentColor, textColor, 2, 18, left + (width/8), btnTop, width * (3/4), btnHi);
    colorChangeMenuOptions[1][2] = [left + (width/8), btnTop, width * (3/4), btnHi];
    btnTop = btnTop + btnHi + height/40;
    btnHi = height / 12;
    
    drawUIBoxWithText("Back", secUIColor, accentColor, textColor, 2, 18, left + (width * (5/16)), btnTop, width * (3/8), btnHi);
    colorChangeMenuOptions[1][3] = [left + (width * (5/16)), btnTop, width * (3/8), btnHi];

    
    highlightMenuOption(curMenuPosition);

}
    //Buttons / Util
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
    strokeWeight(5);
    stroke(tertUIColor);
    fill(primUIColor);
    rect(left, top, width, height);
    strokeWeight(1);

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

    stroke(tertUIColor);
    strokeWeight(1);
    fill(bgCol);
    rect(left, labelTop, width, labelHi);


    while (textWidthValue > txtMaxWi || textHeightValue > txtMaxHi) {
        ttxtSize -= 1; // Decrease font size
        textSize(ttxtSize);
        textWidthValue = textWidth(dispText);
        textHeightValue = ttxtSize;
    }

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
    stroke(tertUIColor);
    fill(bgCol);
    rect(left, mainContTop, width, mainContHi);

    fill(tertUIColor);
    stroke(tertUIColor);
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
    stroke(tertUIColor);
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
    var labHi = height * (3/10);
    var contTop = labTop + labHi;
    var contLeft = labLeft;
    var contWid = labWid;
    var contHi = height * (7/10);  
    var arrowRLeft = contLeft+contWid;

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
    rect(arrowLLeft, arrowTop, arrowWid, arrowHi);

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
    strokeWeight(0);
    textAlign(CENTER, CENTER);
    text(labelText, labLeft+ labWid / 2, labTop + labHi / 2);
    strokeWeight(1);

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
function drawCenteredText(displayText, left, top, width, height, txtSize) {
    let txtMaxHi = height * (9/10);
    let txtMaxWi = width * (9/10);
    if (!txtSize) {
    txtSize = 100;
    }
    textSize(txtSize);
    let textWidthValue = textWidth(displayText);
    let textHeightValue = txtSize;
    while ((textWidthValue > txtMaxWi || textHeightValue > txtMaxHi) && txtSize > 1) {
        txtSize -= 1; // Decrease font size
        textSize(txtSize);
        textWidthValue = textWidth(displayText);
        textHeightValue = txtSize;
    }

    if (txtSize < 30) {
        strokeWeight(0);
    } else {
        strokeWeight(1);
    }
    fill(textColor);
    stroke(textColor);
    textAlign(CENTER, CENTER);
    text(displayText, left + width / 2, top + height / 2);
}
//------------------------------------------------------------------------------MENU MOVEMENT--------------------------------------------------------------------------------------------
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
                if (!menuOptions[0][curMenuPosition[1]][curMenuPosition[2]] && curMenuPosition[2] != 0) {
                    while (!menuOptions[0][curMenuPosition[1]][curMenuPosition[2]] && curMenuPosition[2] != 0) {
                        curMenuPosition[2]--;
                    }
                }
            }
        }
        unhighlightMenuOption(prevCursorPosition);
        highlightMenuOption(curMenuPosition);
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
    }  
}
function moveMenuCursorRight(menuOptions) {
    console.log("RIGHT")
    var prevCursorPosition = [...curMenuPosition];
        if (menuOptions[0][curMenuPosition[1]].length > 1) {//if two cols
            if (curMenuPosition[2] == (menuOptions[0][curMenuPosition[1]].length - 1)){ //on final col
                curMenuPosition[2]= 0;
            } else {
                curMenuPosition[2]++;
            }
            unhighlightMenuOption(prevCursorPosition);
            highlightMenuOption(curMenuPosition);
    }
}
function highlightMenuOption(posAry) {
var btnCol = primUIColor;
var bolCol = tertUIColor;
var txCol = textColor

var aMen = posAry[0]
var aRow = posAry[1];
var aCol = posAry[2];

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
    var left = displayMenuOptions[1][aRow][aCol][0];
    var top = displayMenuOptions[1][aRow][aCol][1];
    var width = displayMenuOptions[1][aRow][aCol][2];
    var height = displayMenuOptions[1][aRow][aCol][3];
    var ctrlType = displayMenuOptions[2][aRow][aCol];

    if (ctrlType == "clButton") {
        drawUIBoxWithText(displayMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 4, 20, left, top, width, height);
    } else if (ctrlType == "arButton") {
        if (curMenuPosition[1] == 0 && curMenuPosition[2] == 0) {
            drawArrowButton(displayMenuOptions[0][aRow][aCol], canvasWidth, btnCol, txCol, left, top, width, height)
        } else if (curMenuPosition[1] == 1 && curMenuPosition[2] == 0) {
            drawArrowButton(displayMenuOptions[0][aRow][aCol], canvasHeight, btnCol, txCol, left, top, width, height)
        }
    }

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
        drawArrowButton(soundMenuOptions[0][aRow][aCol], audioPacks[audioLevels[2]], btnCol, "white", left, top, width, height)
    }
} else if (curMenuPosition[0] == 30) {

    var left = colorChangeMenuOptions[1][aRow][0];
    var top = colorChangeMenuOptions[1][aRow][1];
    var width = colorChangeMenuOptions[1][aRow][2];
    var height = colorChangeMenuOptions[1][aRow][3];
    var ctrlType = colorChangeMenuOptions[2][aRow];
        if (ctrlType == "clButton") {
            drawUIBoxWithText(colorChangeMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 4, 20, left, top, width, height);
        } else if (ctrlType == "arButton") {
            drawArrowButton(colorChangeMenuOptions[0][aRow], changingColor[aRow], btnCol, txCol, left, top, width, height)
        }
    }
}
function unhighlightMenuOption(posAry) {
var btnCol = secUIColor;
var bolCol = accentColor;
var txCol = textColor;

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
    var left = displayMenuOptions[1][aRow][aCol][0];
    var top = displayMenuOptions[1][aRow][aCol][1];
    var width = displayMenuOptions[1][aRow][aCol][2];
    var height = displayMenuOptions[1][aRow][aCol][3];
    drawUIBoxWithText(displayMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 2, 20, left, top, width, height);
} else if (curMenuPosition[0] == 4) {
    var left = soundMenuOptions[1][aRow][aCol][0];
    var top = soundMenuOptions[1][aRow][aCol][1];
    var width = soundMenuOptions[1][aRow][aCol][2];
    var height = soundMenuOptions[1][aRow][aCol][3];
    drawUIBoxWithText(soundMenuOptions[0][aRow][aCol], btnCol, bolCol, txCol, 2, 20, left, top, width, height);
} else if (curMenuPosition[0] == 30) {
    var left = colorChangeMenuOptions[1][aRow][0];
    var top = colorChangeMenuOptions[1][aRow][1];
    var width = colorChangeMenuOptions[1][aRow][2];
    var height = colorChangeMenuOptions[1][aRow][3];
    drawUIBoxWithText(colorChangeMenuOptions[0][aRow], btnCol, bolCol, txCol, 2, 40, left, top, width, height);
}
}

//------------------------------------------------------------------------------INPUT--------------------------------------------------------------------------------------------
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
            if (key.toUpperCase() === playControls[4][0]) {
                if (curMenuPosition[1] == 0) {
                    if (canvasWidth > 299) {
                        if (canvasWidth % 100 != 0) {
                            canvasWidth = largestMultipleOf100(canvasWidth);
                            resetDims();
                            highlightMenuOption(curMenuPosition);
                        } else {
                            canvasWidth -= 100;
                            resetDims();
                            highlightMenuOption(curMenuPosition);
                        }
                    }
                } else if (curMenuPosition[1] == 1) {
                    if (canvasHeight > 299) {
                        if (canvasHeight % 100 != 0) {
                            canvasHeight = largestMultipleOf100(canvasHeight);
                            resetDims();
                            highlightMenuOption(curMenuPosition);
                        } else {
                            canvasHeight -= 100;
                            resetDims();
                            highlightMenuOption(curMenuPosition);
                        }
                    }
                } else {
                    moveMenuCursorLeft(displayMenuOptions);
                }
            } else if (key.toUpperCase() === playControls[4][1]){
                console.log(curMenuPosition);
                if (curMenuPosition[1] == 0) {
                    if (canvasWidth < 1901) {
                        if (canvasWidth % 100 != 0) {
                            canvasWidth = largestMultipleOf100(canvasWidth) + 100;
                            resetDims();
                            highlightMenuOption(curMenuPosition);
                        } else {
                            canvasWidth += 100;
                            resetDims();
                            highlightMenuOption(curMenuPosition);
                        }
                    }
                } else if (curMenuPosition[1] == 1) {
                    if (canvasHeight < 1901) {
                        if (canvasHeight % 100 != 0) {
                            canvasHeight = largestMultipleOf100(canvasHeight) + 100;
                            resetDims();
                            highlightMenuOption(curMenuPosition);
                        } else {
                            canvasHeight += 100;
                            resetDims();
                            highlightMenuOption(curMenuPosition);
                        }
                    }
                } else {
                    moveMenuCursorRight(displayMenuOptions);
                }
            } else if (key.toUpperCase() === playControls[5][0]){
                moveMenuCursorUp(displayMenuOptions);
            } else if (key.toUpperCase() === playControls[5][1]){
                moveMenuCursorDown(displayMenuOptions);
            } else if (key.toUpperCase() === playControls[6][0]) {
                if (curMenuPosition[1] > 1 && curMenuPosition[1] < 6) {
                    
                    if (curMenuPosition[1] == 2 && curMenuPosition[2] == 0) {
                        changingColor = tetroColors[0];
                        chColVal = 1;
                    }
                    if (curMenuPosition[1] == 2 && curMenuPosition[2] == 1) {
                        changingColor = tetroColors[1];
                        chColVal = 2;
                    }
                    if (curMenuPosition[1] == 2 && curMenuPosition[2] == 2) {
                        changingColor = tetroColors[2];
                        chColVal = 3;
                    }
                    if (curMenuPosition[1] == 2 && curMenuPosition[2] == 3) {
                        changingColor = tetroColors[3];
                        chColVal = 4;
                    }
                    if (curMenuPosition[1] == 3 && curMenuPosition[2] == 0) {
                        changingColor = tetroColors[4];
                        chColVal = 5;
                    }
                    if (curMenuPosition[1] == 3 && curMenuPosition[2] == 1) {
                        changingColor = tetroColors[5];
                        chColVal = 6;
                    }
                    if (curMenuPosition[1] == 3 && curMenuPosition[2] == 2) {
                        changingColor = tetroColors[6];
                        chColVal = 7;
                    }
                    if (curMenuPosition[1] == 3 && curMenuPosition[2] == 3) {
                        changingColor = ghostColor;
                        chColVal = 8;
                    }
                    if (curMenuPosition[1] == 4 && curMenuPosition[2] == 0) {
                        changingColor = gridColor;
                        chColVal = 9;
                    }
                    if (curMenuPosition[1] == 4 && curMenuPosition[2] == 1) {
                        changingColor = primUIColor;
                        chColVal = 10;
                    }
                    if (curMenuPosition[1] == 4 && curMenuPosition[2] == 2) {
                        changingColor = secUIColor;
                        chColVal = 11;
                    }
                    if (curMenuPosition[1] == 4 && curMenuPosition[2] == 3) {
                        changingColor = tertUIColor;
                        chColVal = 12;
                    }
                    if (curMenuPosition[1] == 5 && curMenuPosition[2] == 0) {
                        changingColor = accentColor;
                        chColVal = 13;
                    }
                    if (curMenuPosition[1] == 5 && curMenuPosition[2] == 1) {
                        changingColor = textColor;
                        chColVal = 14;
                    }
                    curMenuPosition = [30,0,0];
                    drawColorChangeMenu(changingColor);
                }
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
                        holdingLeft = true;
                        menuHeldTime = 0;
                        setMusicVolume(audioLevels[0]);
                        highlightMenuOption(curMenuPosition);
                    }
                } else if (curMenuPosition[1] == 2) {
                    if (audioLevels[1] > 0) {
                        audioLevels[1] --;
                        holdingLeft = true;
                        menuHeldTime = 0;
                        setMusicVolume(audioLevels[1]);
                        highlightMenuOption(curMenuPosition);
                    }
                } else if (curMenuPosition[1] == 3) {
                    decSoundPack();
                    playNewSoundPack();
                    highlightMenuOption(curMenuPosition);
                }
            } else if (key.toUpperCase() === playControls[4][1]){
                if (curMenuPosition[1] == 0) {
                    moveMenuCursorRight(soundMenuOptions);
                } else if (curMenuPosition[1] == 1) {
                    if (audioLevels[0] < 100) {
                        audioLevels[0] ++;
                        holdingRight = true;
                        menuHeldTime = 0;
                        setMusicVolume(audioLevels[0]);
                        highlightMenuOption(curMenuPosition);
                    }
                } else if (curMenuPosition[1] == 2) {
                    if (audioLevels[1] < 100) {
                        audioLevels[1] ++;
                        holdingRight = true;
                        menuHeldTime = 0;
                        setMusicVolume(audioLevels[1]);
                        highlightMenuOption(curMenuPosition);
                    }
                } else if (curMenuPosition[1] == 3) {
                    incSoundPack();
                    playNewSoundPack();
                    highlightMenuOption(curMenuPosition);
                }
            } else if (key.toUpperCase() === playControls[5][0]){
                moveMenuCursorUp(soundMenuOptions);
            } else if (key.toUpperCase() === playControls[5][1]){
                moveMenuCursorDown(soundMenuOptions);
            } else if ((key.toUpperCase() === playControls[6][0])) {
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
                    saveControls();
                }
                drawControlsMenu();
            } else if (key.toUpperCase() === playControls[6][1]) {
                curMenuPosition[0] = 2;
                drawControlsMenu();
            } else {
                drawControlEditWindow(key.toUpperCase());
                changingKey = key.toUpperCase();
            }
        } else if (curMenuPosition[0] == 30) {
            if (key.toUpperCase() === playControls[4][0]) {
                menuHeldTime = 0;
                holdingLeft = true;
                decreaseColorVal();
            } else if (key.toUpperCase() === playControls[4][1]){
                menuHeldTime = 0;
                holdingRight = true;
                increaseColorVal();
            } else if (key.toUpperCase() === playControls[5][0]){
                moveMenuCursorUp(colorChangeMenuOptions);
            } else if (key.toUpperCase() === playControls[5][1]){
                moveMenuCursorDown(colorChangeMenuOptions);
            } else if (key.toUpperCase() === playControls[6][0]) {
                if (curMenuPosition[1] == 3) {
                    if (chColVal != 0){
                        updateColors();
                    }
                    curMenuPosition = [3,0,0];
                    drawDisplayMenu();
                }
            } else if (key.toUpperCase() === playControls[6][1]) {
                if (chColVal != 0){
                    updateColors();
                }
                curMenuPosition = [3,0,0];
                drawDisplayMenu();
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
                holdingDown = true;
                console.log(onGround(droppingCells));
                    effSpeed = gameSpeed/2;
                console.log("A key was pressed!" + key);
            }
        } else if (key.toUpperCase() === playControls[1][1]) { //HARD DROP KEY
            if (droppingPiece) {
                if (!onGround(droppingCells)) {
                    while (!onGround(droppingCells)) {
                        moveDown();
                        contHDrop++;
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
        holdingDown = false;
        contSDrop = 0;
    }
    if (key.toUpperCase() === playControls[0][0]) {
        holdingLeft = false;
        if (holdingRight) lastKeyHeld = 'right'; // Switch to right if still held
    } 
    if (key.toUpperCase() === playControls[0][1]) {
        holdingRight = false;
        if (holdingLeft) lastKeyHeld = 'left'; // Switch to left if still held
    }
    if (key.toUpperCase() === playControls[4][0]) {
        holdingLeft = false;
    } 
    if (key.toUpperCase() === playControls[4][1]) {
        holdingRight = false;
    }

      // If neither key is held, reset DAS state
    if (!holdingLeft && !holdingRight) {
        lastKeyHeld = null;
        dasCounter = 0;
    }
}
function windowResized() {
    getStartingDims();
    resetDims();
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
function largestMultipleOf100(inputNumber) {
    return Math.floor(inputNumber / 100) * 100;
}
//-------------------------------------------------------------------------------DEBUG----------------------------------------------------------------------------------------------
