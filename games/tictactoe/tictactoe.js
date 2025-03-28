let container = document.getElementById("canvCont");
let canvasWidth = container.clientWidth;
let canvasHeight = container.clientHeight;
let cellSize = canvasWidth / 3;
let lineSize = canvasWidth / 50;


let turn = 0;
var gameOver = 0;
let board = [[0,0,0],[0,0,0],[0,0,0]];
let gameState = 0;
let humanGame = true;

function setup() {  
    // Create Canvas of given size  
    getStartingDims();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvCont");
    fill(25,0,50);
    console.log(canvasWidth);
    console.log(cellSize);
    rect(0,0,canvasWidth, canvasHeight);
    drawBoard();
    drawControls();
} 
function getStartingDims() {
    let windowWidth = container.clientWidth;
    let windowHeight = container.clientHeight;
    let newWidth = (windowWidth);
    let newHeight = (windowHeight);
    newHeight = Math.max(newHeight, 125);
    newWidth = Math.max(newWidth, 100);
    if (newWidth > newHeight * (8/10)) {
        newWidth = newHeight * (8/10);
    } else {
        newHeight = newWidth * (12/10);
    }
    canvasHeight = newHeight
    canvasWidth = newWidth
    console.log(newHeight);
    lineSize = canvasWidth / 50;
    cellSize = canvasWidth / 3;
}
function drawControls() {
    //fill(50,0,25);
    //rect(0,height*(8/10),width,height*(2/10));
    
    if (gameState == 0) {
        strokeWeight(lineSize);
        stroke(0,0,0);
        fill(0,50,0);
        rect(0,height*(8/10),width/2,height*(2/10));
        drawCenteredText("vs Human",0,height*(8/10),width/2,height*(2/10), 80);
        strokeWeight(lineSize);
        stroke(0,0,0);
        fill(0,100,0);
        rect(width/2,height*(8/10),width/2,height*(2/10));
        drawCenteredText(" vs CPU", width/2,height*(8/10),width/2,height*(2/10), 80);
    } else {
        strokeWeight(lineSize);
        stroke(0,0,0);
        fill(0,200,0);
        rect(0,height*(8/10),width,height*(2/10));
        drawCenteredText("Reset",0,height*(8/10),width,height*(2/10), 160);
    }
}
function drawEmptyBoard() {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            strokeWeight(lineSize);
            stroke(0,0,0);
            noFill();
            rect(i*cellSize, j*cellSize, cellSize, cellSize);
        }
    }
}
function drawBoard() {
    var fillCol = [240,240,240];
    if (turn == 9) {
        fillCol = [240,100,100];
    }

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            console.log(board[i][j]);
            switch (board[i][j]) {
                case 0:
                    strokeWeight(lineSize);
                    stroke(0,0,0);
                    fill(fillCol);
                    rect(j*cellSize, i*cellSize, cellSize, cellSize);
                break;
                case 1:
                    strokeWeight(lineSize);
                    stroke(0,0,0);
                    fill(fillCol);
                    rect(j*cellSize, i*cellSize, cellSize, cellSize);
                    drawO(j*cellSize, i*cellSize, cellSize, cellSize);
                break;
                case 2:
                    strokeWeight(lineSize);
                    stroke(0,0,0);
                    fill(fillCol);
                    rect(j*cellSize, i*cellSize, cellSize, cellSize);
                    drawX(j*cellSize, i*cellSize, cellSize, cellSize);
                break;
            }
        }
    }
    drawEmptyBoard();
}
function mouseClicked() {
    var gridHeight = canvasHeight * (8/10);
    console.log(mouseX, mouseY);
    console.log(canvasWidth, gridHeight);
    if (mouseY > 0 && mouseY < gridHeight * (1/3)) {
        if (mouseX > 0 && mouseX < canvasWidth * (1/3)) {
            clickCell(0,0);
        } else if (mouseX > canvasWidth * (1/3) && mouseX < canvasWidth * (2/3)) {
            clickCell(0,1);
        } else if (mouseX > canvasWidth * (2/3) && mouseX < canvasWidth) {
            clickCell(0,2);
        } else {
            console.log("mouse X Value O.O.B.")
        }
    } else if (mouseY > gridHeight * (1/3) && mouseY < gridHeight * (2/3)) {
        if (mouseX > 0 && mouseX < canvasWidth * (1/3)) {
            clickCell(1,0);
        } else if (mouseX > canvasWidth * (1/3) && mouseX < canvasWidth * (2/3)) {
            clickCell(1,1);
        } else if (mouseX > canvasWidth * (2/3) && mouseX < canvasWidth) {
            clickCell(1,2);
        } else {
            console.log("mouse X Value O.O.B.")
        }
    } else if (mouseY > gridHeight * (2/3) && mouseY < gridHeight) {
        if (mouseX > 0 && mouseX < canvasWidth * (1/3)) {
            clickCell(2,0);
        } else if (mouseX > canvasWidth * (1/3) && mouseX < canvasWidth * (2/3)) {
            clickCell(2,1);
        } else if (mouseX > canvasWidth * (2/3) && mouseX < canvasWidth) {
            clickCell(2,2);
        } else {
            console.log("mouse X Value O.O.B.")
        }
    } else if (mouseY > gridHeight && mouseY < canvasHeight) {
        if (gameState == 0) {
            if (mouseX > 0 && mouseX < canvasWidth / 2) {
                startGameHuman();
            } else if (mouseX > canvasWidth / 2 && mouseX < canvasWidth) {
                //startGameComputer();
            } else {
                console.log("mouse X Value O.O.B.")
            }
        } else {
            resetGame();
        }
    } else {
        console.log("mouse Y Value O.O.B.")
    }
}
function clickCell(row, col) {
    var plValue = 1;
    console.log(row, col);
    if (turn % 2 == 0) {
        plValue = 2;
    }
    if (gameState == 1) {
        if (humanGame == true) {
            if (board[row][col] == 0) {
                board[row][col] = plValue;
                drawBoard();
                checkForWin();
                turn++;
                if (gameState == 1 && turn == 9) {
                    drawBoard();
                }
            }
        } else {//CPU GAME

        }
    }

}
function startGameHuman() {
    console.log("HUMAN GAME");
    humanGame = true;
    gameState = 1;
    drawControls();
}
function startGameComputer() {
    console.log("CPU GAME");
    humanGame = false;
    gameState = 1;
    drawControls();
}
function resetGame() {
    console.log("RESET");
    gameState = 0;
    turn = 0;
    board = [[0,0,0],[0,0,0],[0,0,0]];
    drawControls();
    drawBoard();
}
function drawX(left, top, width, height) {
    stroke(0,0,255);
    strokeWeight(lineSize);
    line(left, top, left + width, top + height);
    line(left, top + height, left + width, top);
}
function drawO(left, top, width, height) {
    stroke(0,255,0);
    strokeWeight(lineSize);
    circle(left + width / 2, top + height / 2, width-(lineSize*2));
}
function checkForWin() {
    var gridHeight = canvasHeight * (8/10);
    if (threeInRow(board[0][0], board[0][1], board[0][2]) == true) {//top row
        stroke(255,0,0);
        strokeWeight(lineSize * 2);
        line(0,gridHeight*(1/6), canvasWidth, gridHeight*(1/6));
        gameState = 2;
        drawEmptyBoard();
        drawControls();
    }
    if (threeInRow(board[1][0], board[1][1], board[1][2]) == true) {//middle H row
        stroke(255,0,0);
        strokeWeight(lineSize * 2);
        line(0,gridHeight*(3/6), canvasWidth, gridHeight*(3/6));
        gameState = 2;
        drawEmptyBoard();
        drawControls();
    }
    if (threeInRow(board[2][0], board[2][1], board[2][2]) == true) {//bottom row
        stroke(255,0,0);
        strokeWeight(lineSize * 2);
        line(0,gridHeight*(5/6), canvasWidth, gridHeight*(5/6));
        gameState = 2;
        drawEmptyBoard();
        drawControls();
    }
    if (threeInRow(board[0][0],board[1][0],board[2][0]) == true) {//left col
        stroke(255,0,0);
        strokeWeight(lineSize * 2);
        line(canvasWidth * (1/6),0, canvasWidth * (1/6), gridHeight);
        gameState = 2;
        drawEmptyBoard();
        drawControls();
    }
    if (threeInRow(board[0][1],board[1][1],board[2][1]) == true) {//middle V col
        stroke(255,0,0);
        strokeWeight(lineSize * 2);
        line(canvasWidth * (3/6),0, canvasWidth * (3/6), gridHeight);
        gameState = 2;
        drawEmptyBoard();
        drawControls();
    }    
    if (threeInRow(board[0][2],board[1][2],board[2][2]) == true) {//right col
        stroke(255,0,0);
        strokeWeight(lineSize * 2);
        line(canvasWidth * (5/6),0, canvasWidth * (5/6), gridHeight);
        gameState = 2;
        drawEmptyBoard();
        drawControls();
    }    
    if (threeInRow(board[0][0],board[1][1],board[2][2]) == true) {//Top left to bottom right diag
        stroke(255,0,0);
        strokeWeight(lineSize * 2);
        line(0,0, canvasWidth, gridHeight);
        gameState = 2;
        drawEmptyBoard();
        drawControls();
    }    
    if (threeInRow(board[0][2],board[1][1],board[2][0]) == true) {//Bottom Left to Top right diag
        stroke(255,0,0);
        strokeWeight(lineSize * 2);
        line(0,gridHeight, canvasWidth, 0);
        gameState = 2;
        drawEmptyBoard();
        drawControls();
    }    
}
function threeInRow(fNum, sNum, tNum) {
    console.log(fNum, sNum, tNum);
    if (fNum == sNum && sNum == tNum && tNum == fNum && fNum != 0) {
        console.log(fNum, sNum, tNum);
        return true;
    }
    else {
        return false;
    }
}

function btnFun(button) {
const buttn = button;
const rect = buttn.getBoundingClientRect();
const top = rect.top - 9; // Distance from the top of the viewport
const left = rect.left - 9; // Distance from the left edge of the viewport
const right = left + 100; // Distance from the right edge of the viewport
const bottom = top + 100; // Distance from the bottom of the viewport
var tRow, tCol;
if (gameOver != 0) {
    return;
}
else {
    if (turn % 2 == 0) {//even turn
        line(left,top,right,bottom);//X
        line(left,bottom,right,top);//X
        document.getElementById("output").innerText = "Player 2's Turn";
    } else {//odd turn
        ellipse(left+50,top+50,100,100);//O
        document.getElementById("output").innerText = "Player 1's Turn";
    }
    button.style.visibility = "hidden";//hide button pressed

    switch (top) { //col
        case 0:
            tCol = 0;
            break;
        case 100:
            tCol = 1;
            break;
        case 200:
            tCol = 2;
            break;
    }
    switch(left) {//row
        case 0:
            tRow = 0;
            break;
        case 100:
            tRow = 1;
            break;
        case 200:
            tRow = 2;
            break;
    }
    updateBoard(tRow, tCol);
    chkWin();
    turn++;
    if (turn > 8 && gameOver == 0) {
        endGame("Tie Game");
    }
}
}

function updateBoard(row, col) {
    if (turn % 2 == 0) {
        board[row][col] = 1;
    } else {
        board[row][col] = 2;
    } 
    return;
}

function chkWin() {
    for (var i = 0; i < 3; i++) {
        if (board[i][0] == 1 && board[i][1] == 1 && board[i][2] == 1) { //any col X
        stroke('red');
        strokeWeight(5);
        line((i*100)+50, 0, (i*100)+50, 300);
        endGame("Player 1 Wins");
        } else if (board[i][0] == 2 && board[i][1] == 2 && board[i][2] == 2) { //any col O
        stroke('red');
        strokeWeight(5);
        line((i*100)+50, 0, (i*100)+50, 300);
        endGame("Player 2 Wins");
        } else if (board[0][i] == 1 && board[1][i] == 1 && board[2][i] == 1) { //any row X
        stroke('red');
        strokeWeight(5);
        line(0, (i*100)+50, 300, (i*100)+50);
        endGame("Player 1 Wins");
        } else if (board[0][i] == 2 && board[1][i] == 2 && board[2][i] == 2) { //any row O
        stroke('red');
        strokeWeight(5);
        line(0, (i*100)+50, 300, (i*100)+50);
        endGame("Player 2 Wins");
        } 
    } 
    if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1) { //first diag X
        stroke('red');
        strokeWeight(5);
        line(0, 0, 300, 300);
        endGame("Player 1 Wins");
    } else if (board[0][2] == 1 && board[1][1] == 1 && board[2][0] == 1) { //other diag X
        stroke('red');
        strokeWeight(5);
        line(0, 300, 300, 0);
        endGame("Player 1 Wins");
    } else if (board[0][0] == 2 && board[1][1] == 2 && board[2][2] == 2) { //first diag O
        stroke('red');
        strokeWeight(5);
        line(0, 0, 300, 300);
        endGame("Player 2 Wins");
    } else if (board[0][2] == 2 && board[1][1] == 2 && board[2][0] == 2) { //other diag O
        stroke('red');
        strokeWeight(5);
        line(0, 300, 300, 0);
        endGame("Player 2 Wins");
    } 
    stroke('black');
    strokeWeight(1);
    return;
}
function delBtns() {
    var myDiv = document.querySelector(".canvas-container");
    while (myDiv.lastChild != myCanvas) {
        myDiv.removeChild(myDiv.lastChild);
    }
    return;
}
function resetFunc() {
    delBtns();
    secSetup();
}
function endGame(strOut) {
    gameOver = 1;
    document.getElementById("output").innerText = strOut;
}

function drawCenteredText(displayText, left, top, width, height, txtSize) {
    let txtMaxHi = height * (9/10);
    let txtMaxWi = width * (9/10);
    let textColor = [255,255,255];
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
