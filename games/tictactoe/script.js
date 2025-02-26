var turn = 0;
var gameOver = 0;
let board = [[0,0,0],[0,0,0],[0,0,0]]

function setup() {  
    // Create Canvas of given size  
    createCanvas(300, 300, myCanvas);
    secSetup();
} 

function secSetup(){
    board = [[0,0,0],[0,0,0],[0,0,0]]
    turn = 0;  
    gameOver = 0;
    document.getElementById("output").innerText = "Player 1's Turn";
    for (var i = 0; i < 9; i++) {
        var cntn = document.querySelector(".canvas-container");
        var x = document.createElement("BUTTON");
        var t = document.createTextNode("");
        x.id = "tBtn";
        x.setAttribute("onclick", "btnFun (this)");
        x.appendChild(t);
        cntn.appendChild(x);
    }
    drawBoard();
}

function drawBoard() {
    //Blank out anything already drawn
    stroke('white');
    rect(0,0,300,300)
    // Draw blank ttt Grid
    stroke('black');
    line(0, 100, 300, 100);
    line(0, 200, 300, 200);
    line(100, 0, 100, 300);
    line(200, 0, 200, 300); 
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