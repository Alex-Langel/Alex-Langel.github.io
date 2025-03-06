const canvName1 = "canv1";
const canvName2 = "canv2";

//===========================================================================RADAR ANIMATION========================================================================================
var radarAnim = function(p) {
    p.setup = function() {
        var canvas = document.getElementById(canvName1);
        var cW = canvas.width;
        var cH = canvas.height;
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
        var cW = canvas.width;
        var cH = canvas.height;
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
        var canvas = document.getElementById(canvName1)
        var cW = canvas.width;
        var cH = canvas.height;
        var originX = (cW/2);
        var originY = (cH/2);
        var unitCircleX = Math.cos(degToRad(p.frameCount));
        var unitCircleY = Math.sin(degToRad(p.frameCount));
        var xVal = originX + (unitCircleX * originX);
        var yVal = originY + (unitCircleY * originY);
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
    
    
            //for first 20 frames of blipTime
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
            //debugOut(xVal, yVal, alphaVal);
        }
    };
    p.drawTrail = function() {
        var canvas = document.getElementById(canvName1)
        var cW = canvas.width;
        var cH = canvas.height;
        var originX = (cW/2);
        var originY = (cH/2);
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
        var canvas = document.getElementById(canvName1);
        var cW = canvas.width;
        var cH = canvas.height;
        var originX = (cW/2);
        var originY = (cH/2);
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
        var canvas = document.getElementById(canvName1);
        var cW = canvas.width;
        var cH = canvas.height;
        p.stroke(0,0,0);
        p.noFill();
        p.strokeWeight(7);
        p.circle(cW/2, cH/2, cW);
    };

};


//===========================================================================NEXT ANIMATION========================================================================================
var lineAnim = function(p) {
    var tlX = 0;
    var tlY = 0;
    var brX = 0;
    var brY = 0;
    

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
        p.stroke('red');
        p.strokeWeight(5);
        p.line(tlX,tlY,brX, brY);
        if (frameLoop <=90) {  //grow from top left to bottom right
            brX = brX+3.34;
            brY = brY+3.34;
            if (brX > 300) {brX = 300;}
            if (brY > 300) {brY = 300;}
        } else if (frameLoop <=180) {//shrink from top left to bottom right
            tlX = tlX+3.34;
            tlY = tlY+3.34;
            if (tlX > 300) {tlX = 300;}
            if (tlY > 300) {tlY = 300;}
        } else if (frameLoop <=270) {//grow from bottom right to top left
            tlX = tlX-3.34;
            tlY = tlY-3.34;
            if (brX < 0)   {brX = 0;}
            if (brY < 0)   {brY = 0;}
        } else if (frameLoop <=360) {//shrink from bottom right to top left
            brX = brX-3.34;
            brY = brY-3.34;
            if (brX < 0)   {brX = 0;}
            if (brY < 0)   {brY = 0;}
        }
        debugOut(Math.round(brX) + " | " + Math.round(brY));
    };
};
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||RUN ANIMATIONS|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
var myp5 = new p5(radarAnim, canvName1);
var myp5 = new p5(lineAnim, canvName2);

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