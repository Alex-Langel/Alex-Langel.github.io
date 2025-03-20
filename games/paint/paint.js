let container = document.getElementById("canvCont");
let canvasWidth;
let canvasHeight;
let toolbarHeight = 96;
let toolbarPrimColor = [150,150,150];
let penSize = 25;
let penColor = [0,0,0];
let isDrawing = false;
let isMovingSizeBar = false;
let moveStartY = 0;
let canvasTop = 100;
let canvasBottom = canvasHeight - 1;
let canvasRight = canvasWidth - 1;

let debounceTimeout; // Store the timeout reference

function setup(){
    getWindowDims();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvCont");
    strokeWeight(0);
    fill("white");
    rect(0,0,canvasWidth, canvasHeight);
    drawHeader();
}

function draw() {
    if (isDrawing) {
        drawWithPen();
    } else if (isMovingSizeBar) {
        moveSizeBar();
    }
    drawHeader();
}

function drawWithPen() {
    fill(penColor);
    strokeWeight(0);
    circle(mouseX, mouseY, penSize);
}


function getWindowDims() {
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;
}

function drawHeader() {
    fill(toolbarPrimColor);
    stroke("black");
    strokeWeight(1);
    rect(0,0,canvasWidth,toolbarHeight);
    line(0,96,canvasWidth,96);
    line(0,97,canvasWidth,97);
    line(0,98,canvasWidth,98);
    line(0,99,canvasWidth,99);
    drawTBPenSize();
    drawTBSelectedColor();
    drawTBColorOptions();



}

function drawTBPenSize() {
    fill("white");
    stroke("black");
    strokeWeight(1);
    rect(16, 16, 64, 64);

    fill("black");
    strokeWeight(0);
    circle(48, 48, penSize);

    fill("white");
    stroke("black");
    strokeWeight(1);
    rect(80, 16, 16, 64);

    stroke("red");
    line(81, penSize+16, 95, penSize+16);


}

function drawTBSelectedColor() {
    fill(penColor);
    stroke("black");
    strokeWeight(1);
    rect(112, 16, 64, 64);
}

function drawTBColorOptions() {
    fill([0,0,0]);
    stroke("black");
    strokeWeight(1);
    rect(184, 16, 28, 28);

    fill([255,255,255]);
    stroke("black");
    strokeWeight(1);
    rect(184, 52, 28, 28);

    fill([255,0,0]);
    stroke("black");
    strokeWeight(1);
    rect(220, 16, 28, 28);

    fill([0,255,0]);
    stroke("black");
    strokeWeight(1);
    rect(220, 52, 28, 28);

    fill([0,0,255]);
    stroke("black");
    strokeWeight(1);
    rect(256, 16, 28, 28);

    fill([255,255,0]);
    stroke("black");
    strokeWeight(1);
    rect(256, 52, 28, 28);

    fill([255,0,255]);
    stroke("black");
    strokeWeight(1);
    rect(292, 16, 28, 28);

    fill([0,255,255]);
    stroke("black");
    strokeWeight(1);
    rect(292, 52, 28, 28);
}

function moveSizeBar() {
    moveY = moveStartY - mouseY;
    console.log(moveY);
    minHeight = 17;
    maxHeight = 79;
    newHeight = Math.min(penSize - moveY + 16, maxHeight);
    newHeight = Math.max(newHeight, minHeight);
    penSize = newHeight - 16;
    moveStartY = newHeight;
    drawTBPenSize();
}
function changePenColor(color) {
    penColor = color;
    drawTBSelectedColor();
}

function mousePressed() {
    if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < 96) {//in toolbox
        if (mouseX > 80 && mouseX < 96 && mouseY > 0 && mouseY < 96) {
            isMovingSizeBar = true;
            moveStartY = mouseY;
        } else if (mouseX > 184 && mouseX < 212 && mouseY > 16 && mouseY < 44) {
            changePenColor([0,0,0]);
        } else if (mouseX > 184 && mouseX < 212 && mouseY > 52 && mouseY < 80) {
            changePenColor([255,255,255]);
        } else if (mouseX > 220 && mouseX < 248 && mouseY > 16 && mouseY < 44) {
            changePenColor([255,0,0]);
        } else if (mouseX > 220 && mouseX < 248 && mouseY > 52 && mouseY < 80) {
            changePenColor([0,255,0]);
        } else if (mouseX > 256 && mouseX < 284 && mouseY > 16 && mouseY < 44) {
            changePenColor([0,0,255]);
        } else if (mouseX > 256 && mouseX < 284 && mouseY > 52 && mouseY < 80) {
            changePenColor([255,255,0]);
        } else if (mouseX > 292 && mouseX < 320 && mouseY > 16 && mouseY < 44) {
            changePenColor([255,0,255]);
        } else if (mouseX > 292 && mouseX < 320 && mouseY > 52 && mouseY < 80) {
            changePenColor([0,255,255]);
        }
        
    } else if (mouseX > 0 && mouseX < canvasWidth && mouseY > 99 && mouseY < canvasHeight) {//on canvas
        isDrawing = true;
    }
    console.log("Mouse clicked at: (" + mouseX + ", " + mouseY + ")");
    // Implement what you want to do when the mouse is clicked
}

document.addEventListener('mouseup', function(event) {
    if (isMovingSizeBar == true) {
        isMovingSizeBar = false;
        console.log("NO BAR");
    }
    if(isDrawing = true) {
        isDrawing = false;
    }
});
