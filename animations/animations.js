const canvName1 = "canv1";
const canvName2 = "canv2";

//===========================================================================RADAR ANIMATION========================================================================================
var radarAnim = function(p) {
    var cW = 300;
    var cH = 300;
    var originX = (cW/2);
    var originY = (cH/2);
    p.setup = function() {
        var canvas = document.getElementById(canvName1);
        p.createCanvas(300,300,canvas)
        p.drawBlank();
    };
    p.draw = function() {
        p.drawBlank();
        p.blip();
        p.drawTrail();
        p.drawMainLine();
        p.drawOutline();
    };
    p.drawBlank = function() {
        var canvas = document.getElementById(canvName1)
        //main circle
        p.stroke(0,0,0);
        p.fill(45,100,75);
        p.strokeWeight(7);
        p.circle(cW/2, cH/2, cW);
        //first inner circle
        p.stroke(15,150,30);
        p.fill(45,100,75);
        p.strokeWeight(3);
        p.circle(cW/2, cH/2, cW*(3/4));
        //second inner circle
        p.stroke(15,150,30);
        p.fill(45,100,75);
        p.strokeWeight(3);
        p.circle(cW/2, cH/2, cW*(1/2));
        //third inner circle
        p.stroke(15,150,30);
        p.fill(45,100,75);
        p.strokeWeight(3);
        p.circle(cW/2, cH/2, cW*(1/4));
        //grid lines
        p.line(cW/2, cH/2, 0, cH/2);
        p.line(cW/2, cH/2, cW, cH/2);
        p.line(cW/2, cH/2, cW/2, cH);
        p.line(cW/2, cH/2, cW/2, 0);
        //black outline
        p.drawOutline();
    };
    p.blip = function() {
        var alphaVal;
        var c = p.color(255, 255, 255);
        var frameLoop = p.frameCount;
        var blipX = originX;
        var blipY = (originY/2)+originY;
    
        if (frameLoop > 360) {
            while (frameLoop > 360) {
                frameLoop = frameLoop - 360;
            }
        }
        if (frameLoop > 90) {
            //for first 120 frames of blipTime
            if (frameLoop < 120) {
                var aMod = frameLoop - 90;
                alphaVal = aMod*9;
                if (alphaVal > 255) {
                    alphaVal = 255;
                }
            }
            //next 50 frames
            else if (frameLoop < 170){
                alphaVal = 255;
            }
            else {
                var bMod = frameLoop - 170;
                alphaVal = 255 - (bMod*2);
                if (alphaVal < 0) {
                    alphaVal = 0;
                }
            }
            //set visibility
            c.setAlpha(alphaVal);
            p.strokeWeight(1);
            p.stroke(c);
            p.fill(c);
            //draw circle
            p.circle(blipX, blipY, 10);
        }
    };
    p.drawTrail = function() {
        var unitCircleX;
        var unitCircleY;
        var xVal;
        var yVal;
        var alphaVal = 255;
        let c = p.color(255, 0, 0);
    
        if (p.frameCount < 45) {
            alphaVal = 255;
            for (var i = 1; i < p.frameCount; i++) {
                unitCircleX = Math.cos(degToRad(p.frameCount-(i)));
                unitCircleY = Math.sin(degToRad(p.frameCount-(i)));
                xVal = originX + (unitCircleX * originX);
                yVal = originY + (unitCircleY * originY);
                alphaVal = alphaVal - (i/4);
                c.setAlpha(alphaVal);
                p.strokeWeight(1);
                p.stroke(c);
                p.line(originX, originY, xVal, yVal);
            }
        } else {
            alphaVal = 255;
            for (var i = 1; i < 46; i++) {
                unitCircleX = Math.cos(degToRad(p.frameCount-(i)));
                unitCircleY = Math.sin(degToRad(p.frameCount-(i)));
                xVal = originX + (unitCircleX * originX);
                yVal = originY + (unitCircleY * originY);
                alphaVal = alphaVal - (i/4);
                c.setAlpha(alphaVal);
                p.strokeWeight(1);
                p.stroke(c);
                p.line(originX, originY, xVal, yVal);
            }
        }
    };
    p.drawMainLine = function() {
        var unitCircleX = Math.cos(degToRad(p.frameCount));
        var unitCircleY = Math.sin(degToRad(p.frameCount));
        var xVal = originX + (unitCircleX * originX);
        var yVal = originY + (unitCircleY * originY);
        // Style the line.
        p.strokeWeight(2);
        p.stroke(255, 0, 0);
        p.line(originX, originY, xVal, yVal);
    };
    p.drawOutline = function() {
        p.stroke(0,0,0);
        p.noFill();
        p.strokeWeight(7);
        p.circle(cW/2, cH/2, cW);
    };
};
//===========================================================================NEXT ANIMATION========================================================================================
var lineAnim = function(p) {
    //line position coords
    //tl=TopLeft | br = BottomRight | tr = TopRight | bl = BottomLeft
    var tlX = 0;
    var tlY = 0;
    var brX = 0;
    var brY = 0;
    var trX = 300;
    var trY = 0;
    var blX = 300;
    var blY = 0;
    
    p.setup = function() {
        var canvas = document.getElementById(canvName2);
        p.createCanvas(300,300,canvas)
    };
    p.draw = function() {
        var frameLoop = p.frameCount;
        p.background(255,255,255);
        if (frameLoop > 360) {
            while (frameLoop > 360) {
                frameLoop = frameLoop - 360;
            }
        }
        //draw outer line
        p.stroke('purple');
        p.strokeWeight(15);
        if (Math.round(tlX) != Math.round(brX) || Math.round(tlY) != Math.round(brY)) {
            p.line(tlX,tlY,brX, brY);
        }
        if (Math.round(trX) != Math.round(blX) && Math.round(trY) != Math.round(blY)) {
            p.line(trX,trY,blX, blY);
        }

        //draw inner line
        p.stroke('black');
        p.strokeWeight(8);
        if (Math.round(tlX) != Math.round(brX) || Math.round(tlY) != Math.round(brY)) {
            p.line(tlX,tlY,brX, brY);
        }
        if (Math.round(trX) != Math.round(blX) || Math.round(trY) != Math.round(blY)) {
            p.line(trX,trY,blX, blY);
        }

        debugOut(Math.round(blX) + "|" + Math.round(blY), Math.round(trX) + "|" + Math.round(trY));
        //calculate line position
        if (frameLoop <=45) {  //grow from top left to bottom right
            brX = brX+6.67;
            brY = brY+6.67;
            if (brX > 300) {brX = 300;}
            if (brY > 300) {brY = 300;}
        } else if (frameLoop <=90) {//grow from top right to bottom left
            tlX = tlX+6.67;
            tlY = tlY+6.67;
            if (tlX > 300) {tlX = 300;}
            if (tlY > 300) {tlY = 300;}
        } else if (frameLoop <=135) {//shrink from top left to bottom right
            blX = blX-6.67;
            blY = blY+6.67;
            if (tlX < 0) {tlX = 0;}
            if (tlY > 300) {tlY = 300;}
        } else if (frameLoop <=180) {//shrink from top right to bottom left
            trX = trX-6.67;
            trY = trY+6.67;
            if (trX < 0) {trX = 0;}
            if (trY > 300) {trY = 300;}
        } else if (frameLoop <=225) {//grow from bottom right to top left rightscscscsc
            brX = brX-6.67;
            brY = brY-6.67;
            if (brX < 0)   {brX = 0;}
            if (brY < 0)   {brY = 0;}
        } else if (frameLoop <=270) {//grow from bottom left to top right
            tlX = tlX-6.67;
            tlY = tlY-6.67;
            if (tlX < 0)   {tlX = 0;}
            if (tlY < 0)   {tlY = 0;}
        } else if (frameLoop <=315) {//shrink from top left to bottom right
            trX = trX+6.67;
            trY = trY-6.67;
            if (trX > 300) {trX = 300;}
            if (trY < 0) {trY = 0;}
        } else if (frameLoop <=360) {//shrink from bottom left to top right
            blX = blX+6.67;
            blY = blY-6.67;
            if (blX > 300) {blX = 300;}
            if (blY < 0) {blY = 0;}
        }
    };
};
//=========================================================================BOUNCE ANIMATION=========================================================================================
var bounceAnim = function(p) {
    var cW = 300;
    var cH = 240;
    var bH = 300;
    var circRad = 20;
    var circDia = circRad*2;
    var posX = 80;
    var posY = 20;
    //var posX = Math.floor(Math.random() * (cW-circRad)) + circRad;
    //var posY = Math.floor(Math.random() * (cH-circRad)) + circRad;

    var vertMov = "down";
    var horiMov = "right";
    var vMovChange = false;
    var hMovChange = false;
    var circAry = [255, 255, 255];
    var bgAry = [255, 255, 255];


    p.setup = function() {
        var canvas = document.getElementById(canvName3);
        p.createCanvas(300,300,canvas);
        //get random start points
    };
    p.draw = function() {
        //set list of remaining options
        if (horiMov == "right") {
            posX++;
            if (posX >= cW - circRad) { //if on right edge
                horiMov = "left";
                hMovChange = true;
            }
        } else if (horiMov == "left") {
            posX--;
            if(posX <= circRad) {       //if on left edge
                horiMov = "right";
                hMovChange = true;
            }
        }
        if (vertMov == "down") {
            posY++;
            if (posY >= cH - circRad) { //if on bottom edge
                vertMov = "up";
                vMovChange = true;
            }
        } else if (vertMov == "up") {
            posY--;
            if(posY <= circRad) {       //if on top edge
                vertMov = "down";
                vMovChange = true;
            }
        }
        if(vMovChange == true || hMovChange == true) {
            //change the color
            circAry = p.incColor(circAry);
        }
        if (vMovChange == true && hMovChange == true) {
            bgAry = p.incColor(bgAry);
            var bc = p.color(bgAry[0],bgAry[1],bgAry[2]);
            p.fill(bc); 
            p.stroke(bc);
            p.strokeWeight(0);
            p.rect(0,cH,cW,bH-cH);
        }
        vMovChange = false;
        hMovChange = false;
        var c = p.color(circAry[0],circAry[1],circAry[2]);
        p.fill(0,0,0);
        p.strokeWeight(1);
        p.stroke(c);
        p.circle(posX, posY, circDia);
    };
    p.incColor = function(oldColor) {
        var oR = oldColor[0];
        var oG = oldColor[1];
        var oB = oldColor[2];
        var newColor;

        if(oR == 255 && oG == 255 && oB == 255) {
            newColor = [255,0,0];
        } else if (oR == 255 && oG == 0 && oB == 0) {
            newColor = [0,255,0];
        } else if (oR == 0 && oG == 255 && oB == 0) {
            newColor = [0,0,255];
        } else if (oR == 0 && oG == 0 && oB == 255) {
            newColor = [255,255,0];
        } else if (oR == 255 && oG == 255 && oB == 0) {
            newColor = [0,255,255];
        } else if (oR == 0 && oG == 255 && oB == 255) {
            newColor = [255,0,255];
        } else if (oR == 255 && oG == 0 && oB == 255) {
            newColor = [255,255,255];
        }
        return newColor;
        //custom functions
    };
    p.Func2 = function() {
        //custom functions
    }
};
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||RUN ANIMATIONS|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
var myp5 = new p5(radarAnim, canvName1);
var myp5 = new p5(lineAnim, canvName2);
var myp5 = new p5(bounceAnim, canvName3);

//-----------------------------------------------------------------------------MATH/UTILS-------------------------------------------------------------------------------------------
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }
function distFromBounds(lowerBound, upperBound, input){
    var count = 0;
    var inpUp = input;
    var inpDn = input;
    if (input == lowerBound || input == upperBound) {
        return 0;
    }

    if (input > lowerBound && input < upperBound) {
        while(inpUp != upperBound && inpDn != lowerBound) {
            inpUp++;
            inpDn--;
            count++;
        }
        return count;
    } else {
        return -1;
    }
}
//-----------------------------------------------------------------------------Debug-------------------------------------------------------------------------------------------
function debugOut(outputVal1, outputVal2){
    if (outputVal1) {
        document.getElementById("output1").innerText = outputVal1;
    }
    if (outputVal2) {
        document.getElementById("output2").innerText = outputVal2;
    }
}
