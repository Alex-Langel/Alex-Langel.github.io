var board = [];
var turn = 0;
var gameOver = 0;

function setup() {  
    // Create Canvas of given size
    createCanvas(700, 700, myCanvas);
    makeBtns();
    varReset();
    drawBoard();
} 

function varReset(){
    turn = 0;  
    gameOver = 0;
    document.getElementById("output").innerText = "Player 1's Turn";
    document.getElementById("output").style.color = "yellow";
    board = [];
    for (var i = 0; i < 6; i++) {
        board.push([0,0,0,0,0,0,0]);
    }
    return;
}

function makeBtns() {
    for (var i = 0; i < 7; i++) {
        var cntn = document.querySelector(".canvas-container");
        var x = document.createElement("BUTTON");
        var t = document.createTextNode("");
        x.id = "tBtn";
        x.setAttribute("onclick", "btnClick(this)");
        x.setAttribute("onmouseover", "btnHover(this)");
        x.setAttribute("onmouseout", "btnUnhover(this)");
        x.appendChild(t);
        cntn.appendChild(x);
    }
    return;
}

function drawBoard() {
    //Blank out anything already drawn
    strokeWeight(1);
    stroke('white');
    fill('white');
    rect(0,0,700,700)
    //blue board
    stroke('blue');
    fill('blue');
    rect(0,100,700,700)
    //white 'holes'
    stroke('white');
    fill('white');
    for (var i = 0; i < 7; i++) {
        for(var j = 1; j < 7; j++) {
            var x = (i * 100) + 50;
            var y = (j * 100) + 50;
            ellipse(x, y, 80, 80);
        }
    }
    return;
}

function btnClick(button) {
const buttn = button;
const rect = buttn.getBoundingClientRect();
const top = rect.top - 9; // Distance from the top of the viewport
const left = rect.left - 9; // Distance from the left edge of the viewport
const right = left + 100; // Distance from the right edge of the viewport
const bottom = top + 100; // Distance from the bottom of the viewport
var tCol = Math.round(left/100);
var tRow;

if (gameOver != 0) {//if game is over
    return;         //do nothing
}

    tRow = getRow(tCol);
    if (tRow == -1) {
        return;
    }
    if (turn % 2 == 0) {//even turn
        stroke('yellow');
        fill('yellow');
        strokeWeight(1);
        ellipse((left+50),(tRow*100)+150,80,80)
    
        stroke(237, 235, 83);
        fill(237, 235, 83);
        strokeWeight(1);
        ellipse((left+50),(tRow*100)+150,60,60)
        document.getElementById("output").innerText = "Player 2's Turn";
        document.getElementById("output").style.color = "red";
    } else {//odd turn
        stroke('red');
        fill('red');
        strokeWeight(1);
        ellipse((left+50),(tRow*100)+150,80,80)
    
        stroke(245, 66, 56);
        fill(245, 66, 56);
        strokeWeight(1);
        ellipse((left+50),(tRow*100)+150,60,60)
        document.getElementById("output").innerText = "Player 1's Turn";
        document.getElementById("output").style.color = "yellow";
    }
    stroke('white');
    fill('white');
    strokeWeight(5);
    ellipse((left+50),50,80,80)
    strokeWeight(1);
    updateBoard(tRow, tCol);
    chkWin(tRow, tCol);
    turn++;
    if (turn > 41) {
        endGame(3);
    }
}

function btnHover(button) {
    const buttn = button;
    const rect = buttn.getBoundingClientRect();
    const top = rect.top - 9; // Distance from the top of the viewport
    const left = rect.left - 9; // Distance from the left edge of the viewport
    const right = left + 100; // Distance from the right edge of the viewport
    const bottom = top + 100; // Distance from the bottom of the viewport
    var tCol = left/100;

    if (gameOver != 0) {//if game is over
        return;         //do nothing
    }

    if (turn % 2 == 0) {//even turn
        stroke('yellow');
        fill('yellow');
        strokeWeight(1);
        ellipse((left+50),50,80,80)
    
        stroke(237, 235, 83);
        fill(237, 235, 83);
        strokeWeight(1);
        ellipse((left+50),50,60,60)
    } else {//odd turn
        stroke('red');
        fill('red');
        strokeWeight(1);
        ellipse((left+50),50,80,80)
    
        stroke(245, 66, 56);
        fill(245, 66, 56);
        strokeWeight(1);
        ellipse((left+50),50,60,60)
    }

    stroke('white');
    fill('white');
    strokeWeight(1);
}

function btnUnhover(button) {
    const buttn = button;
    const rect = buttn.getBoundingClientRect();
    const top = rect.top - 9; // Distance from the top of the viewport
    const left = rect.left - 9; // Distance from the left edge of the viewport
    const right = left + 100; // Distance from the right edge of the viewport
    const bottom = top + 100; // Distance from the bottom of the viewport
    var tCol = left/100;

    if (gameOver != 0) {//if game is over
        return;         //do nothing
    }

    stroke('white');
    fill('white');
    strokeWeight(5);
    ellipse((left+50),50,80,80)
    strokeWeight(1);
}

function updateBoard(row, col) {
    if (turn % 2 == 0) {
        board[row][col] = 1;
    } else {
        board[row][col] = 2;
    } 
    return;
}

function getRow(col) {
    for (var i = 5; i > -1; i--) {
        if (board[i][col] == 0) {
            return i;
        }
    }
    return -1;
}

function endGame(pNum) {
    if (pNum == 1 ) {
        document.getElementById("output").style.color = "yellow";
        document.getElementById("output").innerText = "Player 1 Wins!";
    } else if (pNum == 2) {
        document.getElementById("output").style.color = "red";
        document.getElementById("output").innerText = "Player 2 Wins";
    } else {
        document.getElementById("output").style.color = "green";
        document.getElementById("output").innerText = "Draw! - Out of Moves";
    }

    gameOver = 1;
    return;
}

function chkWin(row, col) {
    var rRow = row;
    var rCol = col;
    var pNum;               //which player to search for
    var run = 0;
    if (turn % 2 == 0) {    //if p1s turn
        pNum = 1;           //check if p1 won
    } else {                //if p2s turn
        pNum = 2;           //check if p2 won
    }
    //Check if win below
    if (row < 3) { //if enough space below
        for (var i = row; i < 6 ; i++) { //turn into a while loop l8r
            if (board[i][col] == pNum && run < 4) {
                run++;
            }else {
                i = 6;
            }
        }
        if (run > 3) { //run of 4 found (straight down from start)
            if (pNum == 1) {//p1 win
                stroke('yellow');
                strokeWeight(10);
                line(((col*100)+50), ((row*100)+150), ((col*100)+50), ((row*100)+450));
                endGame(1);
            } else {//p2 win
                stroke('red');
                strokeWeight(10);
                line(((col*100)+50), ((row*100)+150), ((col*100)+50), ((row*100)+450));
                endGame(2);
            }
        }
    }//check UL diag
    run = 0;
    var c = col;
    var r = row;
    while (r > -1 && c > -1 && run < 4) {//until OOB top/left or 4 long
        if (board[r][c] == pNum) {//players piece?
            run++; r--; c--;
        } else { //stop looping when run broken.
            c = -1; r = -1;
        }
    }
    if (run > 3) { //run of 4 found (upLeft from start)
        if (pNum == 1) {//p1 win
            stroke('yellow');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), (((col-3)*100)+50), (((row-3)*100)+150));
            endGame(1);
        } else {//p2 win
            stroke('red');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), ((col*100)+50), ((row*100)+450));
            endGame(2);
        }
    }// --Check DR diag
    c = col + 1;
    r = row + 1;
    while (r < 6 && c < 7 && run < 4) {//until OOB bottom/right or 4 long
        if (board[r][c] == pNum) {//players piece?
            row = r; col = c;
            r++; c++; run++;
        } else { //stop looping when run broken.
            r = 6; c = 7;
        }
    }
    if (run > 3) { //run of 4 found (dnRite from start)
        if (pNum == 1) {//p1 win
            stroke('yellow');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), (((col-3)*100)+50), (((row-3)*100)+150));
            endGame(1);
        } else {//p2 win
            stroke('red');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), (((col-3)*100)+50), (((row-3)*100)+150));
            endGame(2);
        }
        gameOver = 1;
        return;
    } //reset vars
    run = 0;
    col = rCol;
    row = rRow;
    c = col;
    r = row;
    //check UR diag
    while (r > -1 && c < 7 && run < 4) {//until OOB top/right or 4 long
        if (board[r][c] == pNum) {//players piece?
            run++; r--; c++;
        } else { //stop looping when run broken.
            c = 7; r = -1;
        }
    }
    if (run > 3) { //run of 4 found (upRite from start)
        if (pNum == 1) {//p1 win
            stroke('yellow');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), (((col+3)*100)+50), (((row-3)*100)+150));
            endGame(1);
        } else {//p2 win
            stroke('red');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), ((col*100)+50), ((row*100)+450));
            endGame(2);
        }
    }// --Check DL diag
    c = col - 1;
    r = row + 1;
    while (r < 6 && c > -1 && run < 4) {//until OOB down/left or 4 long
        if (board[r][c] == pNum) {//players piece?
            row = r; col = c;
            r++; c--; run++;

        } else { //stop looping when run broken.
            r = 6; c = -1;
        }
    }
    if (run > 3) { //run of 4 found (dnLeft from start)
        if (pNum == 1) {//p1 win
            stroke('yellow');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), (((col+3)*100)+50), (((row-3)*100)+150));
            endGame(1);
        } else {//p2 win
            stroke('red');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), (((col-3)*100)+50), (((row-3)*100)+150));
            endGame(2);
        }
    } //reset vars
    run = 0;
    col = rCol;
    row = rRow;
    c = col;
    //check left
    while (c > -1 && run < 4) {
        if (board[row][c] == pNum) {//players piece?
            run++;//run
            c--;
        } else { //stop looping when run broken.
            c = -1;
        }
    }
    if (run > 3) { //run of 4 found (Left from start)
        if (pNum == 1) {//p1 win
            stroke('yellow');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), (((col-3)*100)+50), (((row)*100)+150));
            endGame(1);
        } else {//p2 win
            stroke('red');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), (((col-3)*100)+50), (((row)*100)+150));
            endGame(2);
        }
    } 
    //check right
    c = col + 1;
    while ( c < 7 && run < 4) {//until OOB down/left or 4 long
        if (board[row][c] == pNum) {//players piece?
            col = c;
            c++; run++;

        } else { //stop looping when run broken.
            c = 7;
        }
    }
    if (run > 3) { //run of 4 found (Right from start)
        if (pNum == 1) {//p1 win
            stroke('yellow');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), (((col-3)*100)+50), (((row)*100)+150));
            endGame(1);
        } else {//p2 win
            stroke('red');
            strokeWeight(10);
            line(((col*100)+50), ((row*100)+150), (((col-3)*100)+50), (((row)*100)+150));
            endGame(2);
        }
    } 
    return;
}

function resetFunc() {
    varReset();
    drawBoard();
}
