let container = document.getElementById("canvCont");
let canvasWidth = container.clientWidth;
let canvasHeight = container.clientHeight;
let cellSize = canvasWidth / 3;
let lineSize = canvasWidth / 50;


let turn = 0;
var gameOver = 0;
let board = [[0,0,0],[0,0,0],[0,0,0]];
let posMoves = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
let gameState = 0;
let humanGame = true;

function setup() {  
    // Create Canvas of given size  
    getStartingDims();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvCont");
    fill(25,0,50);
    rect(0,0,canvasWidth, canvasHeight);
    drawBoard();
    drawControls();
} 
function windowResized() {
    let windowWidth = container.clientWidth;
    let windowHeight = container.clientHeight;
    let newWidth = (windowWidth);
    let newHeight = (windowHeight);
    newHeight = Math.max(newHeight, 120);
    newWidth = Math.max(newWidth, 100);
    if (newWidth > newHeight * (8/10)) {
        newWidth = newHeight * (8/10);
    } else {
        newHeight = newWidth * (10/8);
    }
    canvasHeight = newHeight
    canvasWidth = newWidth
    lineSize = canvasWidth / 50;
    cellSize = canvasWidth / 3;
    resizeCanvas(canvasWidth, canvasHeight);
    drawBoard();
    drawControls();
  }
function getStartingDims() {
    let windowWidth = container.clientWidth;
    let windowHeight = container.clientHeight;
    let newWidth = (windowWidth);
    let newHeight = (windowHeight);
    newHeight = Math.max(newHeight, 120);
    newWidth = Math.max(newWidth, 100);
    if (newWidth > newHeight * (8/10)) {
        newWidth = newHeight * (8/10);
    } else {
        newHeight = newWidth * (10/8);
    }
    canvasHeight = newHeight
    canvasWidth = newWidth
    lineSize = canvasWidth / 50;
    cellSize = canvasWidth / 3;
}
function drawControls() {
    //fill(50,0,25);
    //rect(0,height*(8/10),width,height*(2/10));
    
    if (gameState == 0) {
        strokeWeight(lineSize);
        stroke(0,0,0);
        fill(50,0,100);
        rect(0,canvasHeight*(8/10),canvasWidth/2,canvasHeight*(2/10));
        drawCenteredText("vs Human",0,canvasHeight*(8/10),canvasWidth/2,canvasHeight*(2/10), 80);
        strokeWeight(lineSize);
        stroke(0,0,0);
        fill(100,0,200);
        rect(canvasWidth/2,canvasHeight*(8/10),canvasWidth/2,canvasHeight*(2/10));
        drawCenteredText("vs CPU", canvasWidth/2,canvasHeight*(8/10),canvasWidth/2,canvasHeight*(2/10), 80);
    } else {
        strokeWeight(lineSize);
        stroke(0,0,0);
        fill(75,0,150);
        rect(0,canvasHeight*(8/10),canvasWidth,canvasHeight*(2/10));
        drawCenteredText("Reset",0,canvasHeight*(8/10),canvasWidth,canvasHeight*(2/10), 160);
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
                startGameComputer();
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
            if (turn % 2 == 0) {
                if (board[row][col] == 0) {
                    board[row][col] = plValue;
                    posMoves.splice(getArrayIndex(row,col),1);
                    console.log(posMoves);
                    drawBoard();
                    checkForWin();
                    turn++;
                    if (gameState == 1 && turn == 9) {
                        drawBoard();
                    } else if (gameState == 1) {
                        setTimeout(cpuTurn, 500);
                    }
                }
            }
        }
    }

}
function getArrayIndex(row, col) {
    for (var i = 0; i < posMoves.length; i++) {
        if (posMoves[i][0] == row && posMoves[i][1] == col) {
            console.log(i);
            return i;
        }
    }
}
function cpuTurn() {
    var cpuNextCoords = getCPUMove();
    console.log(cpuNextCoords);
    posMoves.splice(getArrayIndex(cpuNextCoords[0],cpuNextCoords[1]),1);
    board[cpuNextCoords[0]][cpuNextCoords[1]] = 1;
    console.log(posMoves);
    drawBoard();
    checkForWin();
    turn++;
    if (gameState == 1 && turn == 9) {
        drawBoard();
    }
}
function getCPUMove(){
    var cpuNextCoords = findWin();
    if (cpuNextCoords[0] != -1 && cpuNextCoords[1] != -1) {
        console.log("CPU Winning");
        return cpuNextCoords;
    } else {
        cpuNextCoords = findBlock();
        if (cpuNextCoords[0] != -1 && cpuNextCoords[1] != -1) {
            console.log("CPU Blocking");
            return cpuNextCoords;
        } else {
            if (board[1][1] == "0") {
                console.log("CPU Taking Center");
                return [1,1]
            } else {
                console.log("CPU Going Randomly");
                shuffleArray(posMoves);
                return [posMoves[0][0], posMoves[0][1]];
            }
        }
    }
}
function findWin() {
    var checkInt1;
    var checkInt2;
    var checkInt3;

    //Row checking
    for (var i = 0; i < 3; i++) {
        checkInt1 = board[i][0];
        checkInt2 = board[i][1];
        checkInt3 = board[i][2];

        if (checkInt1 == 1 && checkInt2 == 1 && checkInt3 == 0) {
            return [i,2];
        } else if (checkInt2 == 1 && checkInt3 == 1 && checkInt1 == 0) {
            return [i,0];
        } else if (checkInt3 == 1 && checkInt1 == 1 && checkInt2 == 0) {
            return [i,1];
        }
    }
    //Col checking
    for (var i = 0; i < 3; i++) {
        checkInt1 = board[0][i];
        checkInt2 = board[1][i];
        checkInt3 = board[2][i];
        if (checkInt1 == 1 && checkInt2 == 1 && checkInt3 == 0) {
            return [2,i];
        } else if (checkInt2 == 1 && checkInt3 == 1 && checkInt1 == 0) {
            return [0,i];
        } else if (checkInt3 == 1 && checkInt1 == 1 && checkInt2 == 0) {
            return [1,i];
        }
    }
    //Diag checking
    checkInt1 = board[0][0];
    checkInt2 = board[1][1];
    checkInt3 = board[2][2];
    if (checkInt1 == 1 && checkInt2 == 1 && checkInt3 == 0) {
        return [2,2];
    } else if (checkInt2 == 1 && checkInt3 == 1 && checkInt1 == 0) {
        return [0,0];
    } else if (checkInt3 == 1 && checkInt1 == 1 && checkInt2 == 0) {
        return [1,1];
    }
    checkInt1 = board[0][2];
    checkInt2 = board[1][1];
    checkInt3 = board[2][0];
    if (checkInt1 == 1 && checkInt2 == 1 && checkInt3 == 0) {
        return [2,0];
    } else if (checkInt2 == 1 && checkInt3 == 1 && checkInt1 == 0) {
        return [0,2];
    } else if (checkInt3 == 1 && checkInt1 == 1 && checkInt2 == 0) {
        return [1,1];
    }
    return [-1,-1];
}
function findBlock() {
    var checkInt1;
    var checkInt2;
    var checkInt3;

    //Row checking
    for (var i = 0; i < 3; i++) {
        checkInt1 = board[i][0];
        checkInt2 = board[i][1];
        checkInt3 = board[i][2];

        if (checkInt1 == 2 && checkInt2 == 2 && checkInt3 == 0) {
            return [i,2];
        } else if (checkInt2 == 2 && checkInt3 == 2 && checkInt1 == 0) {
            return [i,0];
        } else if (checkInt3 == 2 && checkInt1 == 2 && checkInt2 == 0) {
            return [i,1];
        }
    }
    //Col checking
    for (var i = 0; i < 3; i++) {
        checkInt1 = board[0][i];
        checkInt2 = board[1][i];
        checkInt3 = board[2][i];
        if (checkInt1 == 2 && checkInt2 == 2 && checkInt3 == 0) {
            return [2,i];
        } else if (checkInt2 == 2 && checkInt3 == 2 && checkInt1 == 0) {
            return [0,i];
        } else if (checkInt3 == 2 && checkInt1 == 2 && checkInt2 == 0) {
            return [1,i];
        }
    }
    //Diag checking
    checkInt1 = board[0][0];
    checkInt2 = board[1][1];
    checkInt3 = board[2][2];
    if (checkInt1 == 2 && checkInt2 == 2 && checkInt3 == 0) {
        return [2,2];
    } else if (checkInt2 == 2 && checkInt3 == 2 && checkInt1 == 0) {
        return [0,0];
    } else if (checkInt3 == 2 && checkInt1 == 2 && checkInt2 == 0) {
        return [1,1];
    }
    checkInt1 = board[0][0];
    checkInt2 = board[1][1];
    checkInt3 = board[2][2];
    if (checkInt1 == 2 && checkInt2 == 2 && checkInt3 == 0) {
        return [2,2];
    } else if (checkInt2 == 2 && checkInt3 == 2 && checkInt1 == 0) {
        return [0,0];
    } else if (checkInt3 == 2 && checkInt1 == 2 && checkInt2 == 0) {
        return [1,1];
    }
    checkInt1 = board[0][2];
    checkInt2 = board[1][1];
    checkInt3 = board[2][0];
    if (checkInt1 == 2 && checkInt2 == 2 && checkInt3 == 0) {
        return [2,0];
    } else if (checkInt2 == 2 && checkInt3 == 2 && checkInt1 == 0) {
        return [1,1];
    } else if (checkInt3 == 2 && checkInt1 == 2 && checkInt2 == 0) {
        return [0,2];
    }
    return [-1,-1];
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
    posMoves = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
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
    if (fNum == sNum && sNum == tNum && tNum == fNum && fNum != 0) {
        return true;
    }
    else {
        return false;
    }
}
//Util
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
