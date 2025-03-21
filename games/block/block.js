let container = document.getElementById("canvCont");
let canvasWidth;
let canvasHeight;
let cellWidth;
let cellHeight;
let leftRow = [0,0,0,1,0,0,0];
let topRow = [0,0,1,0,0,0,0];
let rightRow = [1,0,0,0,0,0,0];
let botRow = [1,0,0,0,0,0,0];

let incomingQueue =     [[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],          
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1,0,0,0,0,4,0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,3,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0]]
let centerGrid = [[0,0,0],[0,0,0],[0,0,0]];
let playerLHLoc = [1,1];
let playerRHLoc = [1,1];
let frameLength = 30;

let holdingLeftLH = false;
let holdingRightLH = false;
let holdingUpLH = false;
let holdingDownLH = false;

let holdingLeftRH = false;
let holdingRightRH = false;
let holdingUpRH = false;
let holdingDownRH = false;


function setup(){
    getWindowDims();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvCont");
    fill(128, 128, 128);
    rect(0,0,canvasWidth, canvasHeight);
    drawTopRow();
    drawCenterGrid();
    console.log(incomingQueue);
    console.log(incomingQueue[2].length);
}

function draw() {
    getPlayerLoc();
    clearTilesUnderPlayer();
    if ((frameCount % frameLength) == 0) {
        moveCenterGrid();
        moveTopRow();
        moveBotRow();
        moveLeftRow();
        moveRightRow();
    }
    drawCenterGrid();
    drawTopRow();
    drawBotRow();
    drawLeftRow();
    drawRightRow();
}


function getWindowDims() {
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;
    cellWidth = canvasWidth / 17;
    cellHeight = canvasHeight / 17;
    console.log("Canvas Width:" + canvasWidth + " | " + "Cell Width:" + cellWidth + " | " + cellWidth * 17)
    console.log("Canvas Height: " + canvasHeight + " | " + "Cell Height:" + cellHeight + " | " + cellHeight * 17)
}

function drawTopRow() {
    var center = canvasWidth / 2;
    var left = center - (cellWidth / 2);
    fill(0,0,0);
    strokeWeight(1);
    stroke(255,255,255);
    for (var i = 0; i < 7; i++) {
        rect(left, (cellHeight * i), cellWidth, cellHeight);
    }
    
    for (var i = 0; i < 7; i++) {
        var centY = (cellHeight * i) + (cellHeight / 2);
        var topOffset = ((frameCount % frameLength) - (frameLength / 2)) *(cellHeight/frameLength);
        strokeWeight(3);

        if (topRow[i] != 0) {
            if (topRow[i] == 1) {
                fill(255,255,255);
            } else if (topRow[i] == 2) {
                fill(0,0,255);
            } else if (topRow[i] == 3) {
                fill(255,0,255);
            } else if (topRow[i] == 4) {
                fill(128,0,255);
            }
            circle(center, centY + topOffset, Math.min(cellWidth, cellHeight)/2);
        }
    }
}

function moveTopRow() {
    for (var i = 6; i > -1; i--) {
        var temp = topRow[i];
        if (i == 6) {
            topRow[i] = 0;
            centerGrid[0][1] = temp;
        }  else if (i == 0) {
            topRow[i] = 0
            topRow[i+1] = temp;
            console.log(incomingQueue[1].length);
            if (incomingQueue[1].length > 0) {
                topRow[i] = incomingQueue[1][0];
                incomingQueue[1].shift();
            }
        }else {
            topRow[i] = 0;
            topRow[i+1] = temp;
        }
    }
}

function drawBotRow() {
    var center = canvasWidth / 2;
    var left = center - (cellWidth / 2);
    fill(0,0,0);
    strokeWeight(1);
    stroke(255,255,255);
    for (var i = 0; i < 7; i++) {
        rect(left, (cellHeight * (16-i)), cellWidth, cellHeight);
    }
    
    for (var i = 0; i < 7; i++) {
        var centY = (cellHeight * (16-i)) + (cellHeight / 2);
        var topOffset = ((frameCount % frameLength) - (frameLength / 2)) *(cellHeight/frameLength);
        strokeWeight(3);

        if (botRow[i] != 0) {
            if (botRow[i] == 1) {
                fill(255,255,255);
            } else if (botRow[i] == 2) {
                fill(0,0,255);
            } else if (botRow[i] == 3) {
                fill(255,0,255);
            } else if (botRow[i] == 4) {
                fill(128,0,255);
            }
            circle(center, centY - topOffset, Math.min(cellWidth, cellHeight)/2);
        }
    }
}

function moveBotRow() {
    for (var i = 6; i > -1; i--) {
        var temp = botRow[i];
        if (i == 6) {
            botRow[i] = 0;
            centerGrid[2][1] = temp;
        } else if (i == 0) {
            botRow[i] = 0
            botRow[i+1] = temp;
            console.log(incomingQueue[3].length);
            if (incomingQueue[3].length > 0) {
                botRow[i] = incomingQueue[3][0];
                incomingQueue[3].shift();
            }
        } else {
            botRow[i] = 0;
            botRow[i+1] = temp;
        }
    }
}

function drawLeftRow() {
    var center = canvasHeight / 2;
    var top = center - (cellHeight / 2);
    fill(0,0,0);
    strokeWeight(1);
    stroke(255,255,255);
    for (var i = 0; i < 7; i++) {
        rect(cellWidth * i, top, cellWidth, cellHeight);
    }
    
    for (var i = 0; i < 7; i++) {
        var centX = (cellWidth * i) + (cellWidth / 2);
        var leftOffset = ((frameCount % frameLength) - (frameLength / 2)) *(cellWidth/frameLength);
        strokeWeight(3);
        if (leftRow[i] != 0) {
            if (leftRow[i] == 1) {
                fill(255,255,255);
            } else if (leftRow[i] == 2) {
                fill(0,0,255);
            } else if (leftRow[i] == 3) {
                fill(255,0,255);
            } else if (leftRow[i] == 4) {
                fill(128,0,255);
            }
            circle(centX + leftOffset, center, Math.min(cellWidth, cellHeight)/2);
        }
    }
}

function moveLeftRow() {
    for (var i = 6; i > -1; i--) {
        var temp = leftRow[i];
        if (i == 6) {
            leftRow[i] = 0;
            centerGrid[1][0] = temp;
        } else if (i == 0) {
            leftRow[i] = 0
            leftRow[i+1] = temp;
            console.log(incomingQueue[0].length);
            if (incomingQueue[0].length > 0) {
                leftRow[i] = incomingQueue[0][0];
                incomingQueue[0].shift();
            }
        } else {
            leftRow[i] = 0;
            leftRow[i+1] = temp;
        }
    }
}

function drawRightRow() {
    var center = canvasHeight / 2;
    var top = center - (cellHeight / 2);
    fill(0,0,0);
    strokeWeight(1);
    stroke(255,255,255);
    for (var i = 0; i < 7; i++) {
        rect(cellWidth * (16-i), top, cellWidth, cellHeight);
    }
    
    for (var i = 0; i < 7; i++) {
        var centX = (cellWidth * (16-i)) + (cellWidth / 2);
        var leftOffset = ((frameCount % frameLength) - (frameLength / 2)) *(cellWidth/frameLength);
        strokeWeight(3);

        if (rightRow[i] != 0) {
            if (rightRow[i] == 1) {
                fill(255,255,255);
            } else if (rightRow[i] == 2) {
                fill(0,0,255);
            } else if (rightRow[i] == 3) {
                fill(255,0,255);
            } else if (rightRow[i] == 4) {
                fill(128,0,255);
            }
            circle(centX - leftOffset, center, Math.min(cellWidth, cellHeight)/2);
        }
    }
}

function moveRightRow() {
    for (var i = 6; i > -1; i--) {
        var temp = rightRow[i];
        if (i == 6) {
            rightRow[i] = 0;
            centerGrid[1][2] = temp;
        } else if (i == 0) {
            rightRow[i] = 0
            rightRow[i+1] = temp;
            console.log(incomingQueue[2].length);
            if (incomingQueue[2].length > 0) {
                rightRow[i] = incomingQueue[2][0];
                incomingQueue[2].shift();
            }
        } else {
            rightRow[i] = 0;
            rightRow[i+1] = temp;
        }
    }
}


function drawCenterGrid() {
    var centX = canvasWidth / 2;
    var centY = canvasHeight / 2;
    var left = centX - cellWidth * 1.5;
    var top = centY - cellHeight * 1.5;

    fill(0,0,0);
    strokeWeight(1);
    stroke(255,255,255);

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (playerLHLoc[0] == i && playerLHLoc[1] == j) {
                if (playerRHLoc[0] == i && playerRHLoc[1] == j) {
                    fill(128,0,255);
                } else {
                    fill(0,0,255);
                }
            } else if (playerRHLoc[0] == i && playerRHLoc[1] == j) {
                fill(255,0,255);
            } else {
                fill(0,0,0);
            }
            if (i == 0 && j == 0) {
                triangle(left + cellWidth * j,top + cellHeight * (i+1),left + cellWidth * (j+1),top + cellHeight * (i+1),left + cellWidth * (j+1),top + cellHeight * (i));
            } else if (i == 0 && j == 2) {
                triangle(left + cellWidth * j,top + cellHeight * (i+1),left + cellWidth * (j+1),top + cellHeight * (i+1),left + cellWidth * (j),top + cellHeight * (i));
            } else if (i == 2 && j == 0) {
                triangle(left + cellWidth * (j+1),top + cellHeight * (i+1),left + cellWidth * (j+1),top + cellHeight * (i),left + cellWidth * (j),top + cellHeight * (i));
            } else if (i == 2 && j == 2) {
                triangle(left + cellWidth * j,top + cellHeight * (i+1),left + cellWidth * (j+1),top + cellHeight * (i),left + cellWidth * (j),top + cellHeight * (i));
            } else {
                rect(left + cellWidth*j, top + cellHeight * i, cellWidth, cellHeight);
            }
        }
    }
    fill(0,0,0);
    strokeWeight(3);



    if (centerGrid[0][1] != 0) {
        if (centerGrid[0][1] == 1) {
            fill(255,255,255);
        } else if (centerGrid[0][1] == 2) {
            fill(0,0,255);
        } else if (centerGrid[0][1] == 3) {
            fill(255,0,255);
        } else if (centerGrid[0][1] == 4) {
            fill(128,0,255);
        }
        var centTY = (cellHeight * 7) + (cellHeight / 2);
        var topTOffset = ((frameCount % frameLength) - (frameLength / 2)) *(cellHeight/frameLength);
        circle(centX, centTY + topTOffset, Math.min(cellWidth, cellHeight)/2);
    }
    if (centerGrid[1][0] != 0) {
        if (centerGrid[1][0] == 1) {
            fill(255,255,255);
        } else if (centerGrid[1][0] == 2) {
            fill(0,0,255);
        } else if (centerGrid[1][0] == 3) {
            fill(255,0,255);
        } else if (centerGrid[1][0] == 4) {
            fill(128,0,255);
        }
        var centLX = (cellWidth * 7) + (cellWidth / 2);
        var leftLOffset = ((frameCount % frameLength) - (frameLength / 2)) *(cellWidth/frameLength);
        circle(centLX + leftLOffset, centY, Math.min(cellWidth, cellHeight)/2);
    }
    if (centerGrid[1][2] != 0) {
        if (centerGrid[1][2] == 1) {
            fill(255,255,255);
        } else if (centerGrid[1][2] == 2) {
            fill(0,0,255);
        } else if (centerGrid[1][2] == 3) {
            fill(255,0,255);
        } else if (centerGrid[1][2] == 4) {
            fill(128,0,255);
        }
        var centRX = (cellWidth * 9) + (cellWidth / 2);
        var leftROffset = ((frameCount % frameLength) - (frameLength / 2)) *(cellWidth/frameLength);
        strokeWeight(5);
        circle(centRX - leftROffset, centY, Math.min(cellWidth, cellHeight)/2);
    }
    if (centerGrid[2][1] != 0) {
        if (centerGrid[2][1] == 1) {
            fill(255,255,255);
        } else if (centerGrid[2][1] == 2) {
            fill(0,0,255);
        } else if (centerGrid[2][1] == 3) {
            fill(255,0,255);
        } else if (centerGrid[2][1] == 4) {
            fill(128,0,255);
        }
        var centBY = (cellHeight * 9) + (cellHeight / 2);
        var topBOffset = ((frameCount % frameLength) - (frameLength / 2)) *(cellHeight/frameLength);
        circle(centX, centBY - topBOffset, Math.min(cellWidth, cellHeight)/2);
    }
    if (centerGrid[1][1] != 0) {
        fill(255,0,0);
        //circle(centX, centY, Math.min(cellWidth, cellHeight)/2);
        rect(left + cellWidth, top + cellHeight, cellWidth, cellHeight);
        stroke(255,255,255);
    }

}

function moveCenterGrid() {
    if (centerGrid[0][1] != 0) {
        centerGrid[1][1] = centerGrid[0][1];
        centerGrid[0][1] = 0;
    }
    if (centerGrid[2][1] != 0) {
        centerGrid[1][1] = centerGrid[2][1];
        centerGrid[2][1] = 0;
    }
    if (centerGrid[1][0] != 0) {
        centerGrid[1][1] = centerGrid[1][0];
        centerGrid[1][0] = 0;
    }
    if (centerGrid[1][2] != 0) {
        centerGrid[1][1] = centerGrid[1][2];
        centerGrid[1][2] = 0;
    }
}

function getPlayerLoc() {
    var LHRow = 1
    var LHCol = 1
    if (holdingDownLH == true) {
        LHRow++;
    }
    if (holdingUpLH == true) {
        LHRow--;
    }
    if (holdingLeftLH == true) {
        LHCol--;
    }
    if (holdingRightLH == true) {
        LHCol++;
    }
    if (LHRow != 1 || LHCol != 1) {
        playerLHLoc[0] = LHRow;
        playerLHLoc[1] = LHCol;
    }
    var RHRow = 1
    var RHCol = 1
    if (holdingDownRH == true) {
        RHRow++;
    }
    if (holdingUpRH == true) {
        RHRow--;
    }
    if (holdingLeftRH == true) {
        RHCol--;
    }
    if (holdingRightRH == true) {
        RHCol++;
    }
    if (RHRow != 1 || RHCol != 1) {
        playerRHLoc[0] = RHRow;
        playerRHLoc[1] = RHCol;
    }

}

function clearTilesUnderPlayer() {
    if (centerGrid[playerLHLoc[0]][playerLHLoc[1]] == 1 || centerGrid[playerLHLoc[0]][playerLHLoc[1]] == 2) {
        if (playerLHLoc[0] == 1) {
            if (playerLHLoc[1] == 1) {
                return;
            }
        }
        centerGrid[playerLHLoc[0]][playerLHLoc[1]] = 0;
    }
    if (centerGrid[playerRHLoc[0]][playerRHLoc[1]] == 1 || centerGrid[playerRHLoc[0]][playerRHLoc[1]] == 3) {
        if (playerRHLoc[0] == 1) {
            if (playerRHLoc[1] == 1) {
                return;
            }
        }
        centerGrid[playerRHLoc[0]][playerRHLoc[1]] = 0;
    }
    if (playerRHLoc[0] == playerLHLoc[0] && playerRHLoc[1] == playerLHLoc[1]) {
        if (centerGrid[playerRHLoc[0]][playerRHLoc[1]] == 4) {
            if (playerRHLoc[0] == 1) {
                if (playerRHLoc[1] == 1) {
                    return;
                }
            }
            centerGrid[playerRHLoc[0]][playerRHLoc[1]] = 0;
        }
    }
}





//USER DID SOMETHING!!!!! PANIC!!!!!
function keyPressed() {
    console.log(key.toUpperCase());
    if (key.toUpperCase() == "W") {
        holdingUpLH = true;
    } else if (key.toUpperCase() == "S") {
        holdingDownLH = true;
    } else if (key.toUpperCase() == "A") {
        holdingLeftLH = true;
    } else if (key.toUpperCase() == "D") {
        holdingRightLH = true;
    } else if (key.toUpperCase() == "ARROWUP") {
        holdingUpRH = true;
    } else if (key.toUpperCase() == "ARROWDOWN") {
        holdingDownRH = true;
    } else if (key.toUpperCase() == "ARROWLEFT") {
        holdingLeftRH = true;
    } else if (key.toUpperCase() == "ARROWRIGHT") {
        holdingRightRH = true;
    }
}
function keyReleased() {
    if (key.toUpperCase() == "W") {
        holdingUpLH = false;
    } else if (key.toUpperCase() == "S") {
        holdingDownLH = false;
    } else if (key.toUpperCase() == "A") {
        holdingLeftLH = false;
    } else if (key.toUpperCase() == "D") {
        holdingRightLH = false;
    } else if (key.toUpperCase() == "ARROWUP") {
        holdingUpRH = false;
    } else if (key.toUpperCase() == "ARROWDOWN") {
        holdingDownRH = false;
    } else if (key.toUpperCase() == "ARROWLEFT") {
        holdingLeftRH = false;
    } else if (key.toUpperCase() == "ARROWRIGHT") {
        holdingRightRH = false;
    }
}
function windowResized() {
    getWindowDims();
    resizeCanvas(canvasWidth, canvasHeight);
}


