let container = document.getElementById("canvCont");
let canvasWidth, canvasHeight, canvasLeft;
let playWidth, UIWidth, UIScale, wallWidth;
let ballX, ballY, ballAngle, ballSpeed, ballVelX, ballVelY;
let paddleLeft, paddleTop, paddleWidth, paddleHeight, paddleSpeed;
let blockWidth, blockHeight
let holdingLeft, holdingRight;
let ballSpawned, ballInPlay, doorOpen;
let puLongPaddle;
let gamePaused;
let tMarg, tSec;
let gameState = 0;
let playerLives = 9;

let blockGrid =     [[0,0,0,0,0,0,0,0,0,0],
                    [0,1,1,1,1,1,1,1,1,0],
                    [0,1,2,1,1,10,1,1,1,0],
                    [0,1,1,1,1,1,1,1,1,0],
                    [0,1,1,1,1,1,1,1,1,0]];

let fallingPowerups = [];



function setup() {  
    // Create Canvas of given size  
    getStartingDims();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvCont");
    strokeWeight(1);
    fill(25,0,50);
    rect(0,0,playWidth, canvasHeight);
    fill(50,0,100);
    rect(playWidth, 0, UIWidth, canvasHeight);


    paddleLeft = playWidth * (4/10);
    paddleTop = canvasHeight * (9/10);
    paddleWidth = wallWidth * 4;
    paddleSpeed = 10;
    doorOpen = false;

    spawnBall();
    drawUI();
    drawPlayArea();

} 
function draw() {
    if (gamePaused != true) {
        if (ballInPlay == true) {
            drawPlayArea();
            updateTimers();
            updateFallingPowerups();
            updateBall();
        }
        if (holdingLeft == true && holdingRight != true) {
            movePaddleLeft();
        } else if (holdingRight == true && holdingLeft != true) {
            movePaddleRight();
        }
    }
}
function windowResized() {
    getStartingDims();
    resizeCanvas(canvasWidth, canvasHeight);
    fill(25,0,50);
    rect(0,0,canvasWidth, canvasHeight);
    drawUI();
    drawBorder();
    drawPaddle();
}
function getStartingDims() {
    let windowWidth = container.clientWidth;
    let windowHeight = container.clientHeight;
    let newWidth = (windowWidth);
    let newHeight = (windowHeight);
    newHeight = Math.max(newHeight, 400);
    newWidth = Math.max(newWidth, 400);
    if (newWidth > newHeight) {
        newWidth = newHeight;
    } else {
        newHeight = newWidth;
    }
    canvasHeight = newHeight
    canvasWidth = newWidth
    playWidth = canvasWidth * (7.5/10);
    UIWidth = canvasWidth * (2.5/10);
    tMarg = canvasHeight * (1/10);
    wallWidth = playWidth * (1/20);
    canvasLeft = (container.clientWidth - canvasWidth) / 2;
    canvas.style.position = 'absolute';
    canvas.style.left = `${canvasLeft}px`;
    UIScale = canvasHeight / 25;
    blockWidth = (playWidth - wallWidth - wallWidth)/10;
    blockHeight = (canvasHeight - (wallWidth*3))/25;
}
function drawPauseMenu () {
    fill(30,0,45);
    rect(playWidth * (3/10), canvasHeight * (4/10), playWidth * (4/10), canvasHeight * (2/10));
    drawCenteredText("[GAME PAUSED]", playWidth * (3/10), canvasHeight * (4/10), playWidth * (4/10), canvasHeight * (2/10), UIScale)
}
function drawPlayArea() {
    strokeWeight(0);
    fill(25,0,50);
    rect(0,0,playWidth, canvasHeight);
    drawBorder();
    drawPaddle();
    drawBlocks();
    drawFallingPowerups();
    drawBall();
}
function drawUI() {
    drawLives();
}
function drawLives() {
    fill(0,0,0);
    rect(playWidth, 0, UIWidth,  canvasHeight * (1/10));
    fill(255,255,255);
    
    if (playerLives == 0) {
        fill(100,0,0);
        rect(playWidth, 0, UIWidth,  canvasHeight * (1/10));
    } else if (playerLives > 4) {
        fill(0,0,0);
        rect(playWidth, 0, UIWidth,  canvasHeight * (1/10));
        fill(255,255,255);
        circle(playWidth + canvasHeight * ((2)/20), canvasHeight * (1/20), UIScale);
        //circle(playWidth + canvasHeight * ((3)/20), canvasHeight * (1/20), 40);
        stroke(255,255,255);
        strokeWeight(UIScale / 3 );
        line(playWidth + canvasHeight * (11/80), canvasHeight * (3/80), playWidth + canvasHeight * (13/80), canvasHeight * (5/80));
        line(playWidth + canvasHeight * (11/80), canvasHeight * (5/80), playWidth + canvasHeight * (13/80), canvasHeight * (3/80));
        //fill(0,0,255);
        //rect(playWidth + canvasHeight * (7/40), 0, canvasHeight * (2/40), canvasHeight * (2/20))

        drawCenteredText(playerLives, playWidth + canvasHeight * (7/40), 0, canvasHeight * (2/40), canvasHeight * (2/20), UIScale * 2);

    } else {
        fill(0,0,0);
        rect(playWidth, 0, UIWidth,  canvasHeight * (1/10));
        fill(255,255,255);
        for (var i = 0; i < playerLives; i++) {
            circle(playWidth + canvasHeight * ((4-i)/20), canvasHeight * (1/20), 40);
        }
    }
    
    circle(playWidth, tMarg, 10);
}
function drawBorder() {
    strokeWeight(0);
    stroke(155,155,155);
    fill(100,100,100);

    rect(0,0,wallWidth, canvasHeight);
    rect(playWidth - wallWidth, 0, wallWidth, canvasHeight);

    rect(0,0,(playWidth - wallWidth * 4) / 2, wallWidth);
    rect((playWidth + wallWidth *4) / 2,0,(playWidth - wallWidth*4 ) / 2, wallWidth);
    

    rect(0,canvasHeight - wallWidth, (playWidth - wallWidth * 4) / 2, wallWidth);
    rect((playWidth + wallWidth *4) / 2,canvasHeight - wallWidth,(playWidth - wallWidth*4 ) / 2, wallWidth);

    strokeWeight(2);
    if (doorOpen != true) {
        stroke(0,0,0);
        fill(80,40,0);
        rect((playWidth - wallWidth * 4)/2, 0, wallWidth * 4, wallWidth);
    }



    stroke(255,0,0);
    line(wallWidth+1, canvasHeight - wallWidth - wallWidth*0.5, playWidth-wallWidth-1, canvasHeight - wallWidth - wallWidth * 0.5)





}
function drawPaddle() {
    stroke(255,255,255);
    fill(200,200,200);
    rect(paddleLeft, paddleTop, paddleWidth, wallWidth);
}
function drawBlocks() {
    for (var i = 0; i < blockGrid.length; i++) {
        for (var j = 0; j < blockGrid[i].length; j++) {
            if (blockGrid[i][j] != 0) {
                if (blockGrid[i][j] == 1) {
                    fill(75,200,225);
                } else if (blockGrid[i][j] == 2) {
                    fill(125,0,250);
                } else if (blockGrid[i][j] == 10) {
                    fill(80,40,0);
                }
                rect(wallWidth + blockWidth*j, wallWidth + blockHeight*i, blockWidth, blockHeight);
            }
        }
    }
}
function drawFallingPowerups() {
    if (!fallingPowerups) {
        return;
    }
    if (fallingPowerups.length == 0) {
        return;
    }
    for (var i = 0; i < fallingPowerups.length; i++){
        fill(0,255,0);
        rectMode(CENTER);
        rect(fallingPowerups[i][0], fallingPowerups[i][1], UIScale, UIScale);
        rectMode(CORNER);
    }
}
function movePaddleLeft() {
    paddleLeft -= paddleSpeed;
    if (paddleLeft < wallWidth) {
        paddleLeft = wallWidth;
    }
    drawPlayArea();
}
function movePaddleRight() {
    paddleLeft += paddleSpeed;
    if (paddleLeft > playWidth - wallWidth - paddleWidth) {
        paddleLeft = playWidth - wallWidth - paddleWidth;
    }
    drawPlayArea();
}
function drawBall() {
    stroke(0,0,0);
    strokeWeight(2);
    fill(255,255,255);
    circle(ballX, ballY, UIScale - 2);
}
function spawnBall() {
    var angleInRadians
    ballX = playWidth / 2;
    ballY = canvasHeight * (8/10);
    ballAngle = getRandBetween(45,135);
    ballSpeed = 10 ;
    angleInRadians = ballAngle * Math.PI / 180;

    ballVelX = ballSpeed * Math.cos(angleInRadians);
    ballVelY = ballSpeed * Math.sin(angleInRadians);
    ballSpawned = true;
    ballInPlay = false;
}
function sendBall() {
    ballInPlay = true;
    console.log("Ball sent");
}
function winMessage() {
    console.log("win");
    fill(30,0,45);
    rect(playWidth * (3/10), canvasHeight * (4/10), playWidth * (4/10), canvasHeight * (2/10));
    drawCenteredText("[YOU WIN]", playWidth * (3/10), canvasHeight * (4/10), playWidth * (4/10), canvasHeight * (2/10), UIScale)
}
function updateBall() {
    ballX += ballVelX;//X movement
    ballY += ballVelY;//Y movement

    if (ballX  < wallWidth + (UIScale / 2)) {
        ballVelX = -ballVelX;
    }
    if (ballX > playWidth - wallWidth - (UIScale / 2)) {
        ballVelX = -ballVelX;
    }
    if (doorOpen == true) {
        if (ballX > (playWidth - wallWidth * 4) / 2 && ballX < (playWidth + wallWidth *4)/2){
        } else {
            if (ballY < wallWidth + (UIScale / 2)) {
            ballVelY = -ballVelY;
            }
        }
        if (ballY < 0 - UIScale / 2) {
            ballInPlay = false;
            winMessage();
        }
    } else {
        if (ballY < wallWidth + (UIScale / 2)) {
            ballVelY = -ballVelY;
        }
    }


    if (ballY > canvasHeight - wallWidth - (UIScale / 2)) {
        destroyBall();
        fallingPowerups = [];
        drawUI();
    }

    if (ballY > paddleTop - (UIScale / 2) && ballX > paddleLeft - (UIScale / 2) && ballX < paddleLeft + paddleWidth + (UIScale / 2)) {
        if (ballVelY > 0) { // Check if the ball is moving downward
            // Calculate the hit position relative to the paddle center
            let hitPosition = (ballX - (paddleLeft + paddleWidth / 2)) / (paddleWidth / 2); // Values will range from -1 (left) to +1 (right)
    
            // Reverse the Y velocity (bounce), and adjust X velocity based on hit position
            ballVelY = -ballVelY;
    
            // Adjust the X velocity based on the hit position
            // Make the ball deflect more based on how far from the center it hits
            let angleFactor = hitPosition * Math.PI / 4; // Adjust this value to control how much the angle changes
    
            // Apply the new angle to the velocity vector
            ballVelX += Math.sin(angleFactor) * Math.abs(ballVelY); // Increase/decrease horizontal velocity based on hit position
            //ballVelX = Math.max(Math.min(ballVelX, maxBallSpeedX), -maxBallSpeedX); // Optional: limit maximum speed to prevent too much deflection
        }
    }

 // Block collision check
 for (let i = 0; i < blockGrid.length; i++) {
    for (let j = 0; j < blockGrid[i].length; j++) {
        if (blockGrid[i][j] != 0) { // Check if there is a block
            let blockX = wallWidth + blockWidth * j;
            let blockY = wallWidth + blockHeight * i;

            // Check if the ball is within the block's bounds
            if (ballX + (UIScale / 2) > blockX && ballX - (UIScale / 2) < blockX + blockWidth &&
                ballY + (UIScale / 2) > blockY && ballY - (UIScale / 2) < blockY + blockHeight) {

                // Ball has collided with the block, now check which side of the block it collided with

                // Calculate the distances between the ball center and block edges
                let distX = Math.abs(ballX - (blockX + blockWidth / 2));
                let distY = Math.abs(ballY - (blockY + blockHeight / 2));

                // If the ball is closer to the top/bottom of the block, reverse Y velocity
                if (distX < distY) {
                    ballVelY = -ballVelY; // Reverse Y velocity

                }
                // If the ball is closer to the left/right of the block, reverse X velocity
                else {
                    ballVelX = -ballVelX; // Reverse X velocity

                }

                // Destroy the block (set to 0 in the grid)
                var numBBlocks = 0
                if (blockGrid[i][j] == 10) {
                    for (var h = 0; h < blockGrid.length;h++) {
                        for (var k = 0; k < blockGrid[h].length;k++) {
                            if (blockGrid[h][k] == 10) {
                                numBBlocks += 1;
                            }
                        }
                    }
                    if (numBBlocks == 1) {
                        doorOpen = true;
                    }
                } else if (blockGrid[i][j] == 2) {
                    fallingPowerups.push([wallWidth + (blockWidth*j)+blockWidth/2, wallWidth + (blockHeight*i)+blockHeight/2]);
                }
                blockGrid[i][j] = 0;

                // Break after a collision to avoid checking the same ball collision twice
                break;
            }
        }
    }
}



}
function destroyBall() {
    if (playerLives == 0) {
        //gameOver
    } else {
        playerLives -=1;
        ballSpawned == true;
        ballInPlay == false;
        spawnBall();
    }
}
function updateFallingPowerups() {
    if (!fallingPowerups) {
        return;
    }
    if (fallingPowerups.length == 0) {
        return;
    }
    for (var i = 0; i < fallingPowerups.length; i++){
        fallingPowerups[i][1] +=1;
        if (fallingPowerups[i][1] > canvasHeight - wallWidth - (UIScale / 2)) {
            fallingPowerups.splice(i,1);
        } else if (fallingPowerups[i][1] > paddleTop - (UIScale / 2) && fallingPowerups[i][0] > paddleLeft - (UIScale / 2) && fallingPowerups[i][0] < paddleLeft + paddleWidth + (UIScale / 2)) {//if hitting paddle
            puLongPaddle = 300;
        }
    }
}
function updateTimers() {
    if (puLongPaddle > 0) {
        paddleWidth = wallWidth * 6;
        movePaddleLeft();
        movePaddleRight();
        puLongPaddle--;
    } else {
        paddleWidth = wallWidth * 4;
    }
}
function keyPressed() {
    if (key.toUpperCase() == "A") {
        holdingLeft = true;
    }
    if (key.toUpperCase() == "D") {
        holdingRight = true;
    }
    if (key.toUpperCase() == " ") {
        if (ballSpawned == true && ballInPlay == false) {
            sendBall();
        }
    }
    if (key.toUpperCase() == "ESCAPE") {
        if (gamePaused == true) {
            gamePaused = false;
        } else {
            gamePaused = true;
            drawPauseMenu();
        }
    }
}
function keyReleased() {
    if (key.toUpperCase() == "A") {
        holdingLeft = false;
    }
    if (key.toUpperCase() == "D") {
        holdingRight = false;
    }
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
    text(displayText, left + width / 2, top + height / 1.9);
}
function getRandBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}