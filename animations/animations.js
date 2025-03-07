const canvName1 = "canv1";
const canvName2 = "canv2";
const canvName3 = "canv3";
const canvName4 = "canv4";
const canvName5 = "canv5";
const canvName6 = "canv6";
const canvName7 = "canv7";
const canvName8 = "canv8";
const canvName9 = "canv9";
const canvName10 = "canv10";
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
//===========================================================================LINE ANIMATION========================================================================================
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
    
    var posY = Math.floor(Math.random() * ((cH-circRad)/20-circRad/20+1)) * 20 + circRad;
    var posX = Math.floor(Math.random() * ((cW-circRad)/20-circRad/20+1)) * 20 + circRad;
    var randVert = Math.floor(Math.random() * 2);
    var randHori = Math.floor(Math.random() * 2);

    var vertMov;
    var horiMov;
    if (randVert == 1) {
        vertMov = "down";
    } else {
        vertMov = "up";
    }
    if (randHori == 1) {
        horiMov = "left";
    } else {
        horiMov = "right";
    }
    
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
//=========================================================================INSERTION SORT ANIMATION=====================================================================================
var insertSortAnim = function(p) {
    var offset = 22;
    let grayArray = [];
    for (let k = 0; k <= 255; k++) {
        grayArray.push(k);
    }
    var arySize = grayArray.length;
    grayArray = shuffleArray(grayArray);

    let itr = 1, jtr;
    let sorting = true;
    let key;

    p.setup = function() {
        var canvas = document.getElementById(canvName6);
        p.createCanvas(300,300,canvas);
        //setup 
    };
    p.draw = function() {


        if (sorting === true) {
            p.insertBG();
            p.printInsertAry();
            p.insertionSortStep();
        } else {
            grayArray = shuffleArray(grayArray);
            itr = 0;
            sorting = true;
            p.insertBG
            p.printInsertAry();
            itr = 0;
        }

    };
    p.printInsertAry = function() {

        for (let i = 0; i <= arySize; i++) {
            p.stroke(grayArray[i],grayArray[i],grayArray[i]);
            p.line(i+offset,offset,i+offset,offset+256);
        }
        //
        //line at itr, line at jtr
        p.stroke(0,255,0);
        p.line(itr+offset, 0, itr+offset, offset);
        p.line(itr+offset, offset+256, itr+offset, offset+offset+256);
        p.stroke(0,0,255);
        p.line(jtr+offset, 0, jtr+offset, offset);
        p.line(jtr+offset, offset+256, jtr+offset, offset+offset+256);
    };
    p.insertBG = function() {
        p.background(0,0,0);
        p.stroke(255,255,255);
        p.line(5,5,10,5);
        p.line(5,15,10,15);
        p.line(7.5, 5, 7.5, 15);
    };
    p.insertionSortStep = function(){
        if (itr < grayArray.length && sorting) {
            if (jtr === undefined) {
                jtr = itr - 1;
                key = grayArray[itr];
            }
      
            if (jtr >= 0 && grayArray[jtr] > key) {
                grayArray[jtr + 1] = grayArray[jtr];
                jtr--;
            } else {
                grayArray[jtr + 1] = key;
                itr++;
                jtr = undefined; // Reset for next iteration
            }
        } else {
            sorting = false; // Sorting is complete
        }
    };
};
//=========================================================================BUBBLE SORT ANIMATION=====================================================================================
var bubbleSortAnim = function(p) {
    var offset = 22;
    let grayArray = [];
    for (let k = 0; k <= 255; k++) {
        grayArray.push(k);
    }
    var arySize = grayArray.length;
    grayArray = shuffleArray(grayArray);

    let itr = 0, jtr = 0;
    let sorting = true;

    p.setup = function() {
        var canvas = document.getElementById(canvName7);
        p.createCanvas(300,300,canvas);
        //setup 
    };
    p.draw = function() {

        if (sorting === true) {
            p.bubbleBG();
            p.printBubbleAry();
            p.bubbleSortStep();
        } else {
            grayArray = shuffleArray(grayArray);
            itr = 0;
            sorting = true;
            p.insertBG
            p.printBubbleAry();
            itr = 0;
        }

    };
    p.printBubbleAry = function() {

        for (let i = 0; i <= arySize; i++) {
            p.stroke(grayArray[i],grayArray[i],grayArray[i]);
            p.line(i+offset,offset,i+offset,offset+256);
        }
        //
        //line at itr, line at jtr
        p.stroke(0,255,0);
        p.line(itr+offset, 0, itr+offset, offset);
        p.line(itr+offset, offset+256, itr+offset, offset+offset+256);
        p.stroke(0,0,255);
        p.line(jtr+offset, 0, jtr+offset, offset);
        p.line(jtr+offset, offset+256, jtr+offset, offset+offset+256);
    };
    p.bubbleBG = function() {
        p.background(0,0,0);
        p.stroke(255,255,255);

        p.noFill();
        p.line(5,5,5,15);
        p.line(5,5,10,5);
        p.line(5,10,10,10);
        p.line(5,15,10,15);
        p.arc(10,7.5,2.5,2.5,Math.PI*3/2,Math.PI/2);
        p.arc(10,12.5,2.5,2.5,Math.PI*3/2,Math.PI/2);
    };
    p.bubbleSortStep = function() {
        if (itr < grayArray.length - 1 && sorting) {
            if (jtr < grayArray.length - 1 - itr) {
              if (grayArray[jtr] > grayArray[jtr + 1]) {
                // Swap grayArray[j] and grayArray[j + 1]
                let temp = grayArray[jtr];
                grayArray[jtr] = grayArray[jtr + 1];
                grayArray[jtr + 1] = temp;
              }
              jtr++; // Move to the next index
            } else {
              jtr = 0; // Reset j after one full pass
              itr++; // Move to the next pass
            }
          } else {
            sorting = false; // Sorting is complete
          }
    };
};
//=========================================================================MERGE SORT ANIMATION=====================================================================================
var mergeSortAnim = function(p) {
    var offset = 22;
    let grayArray = [];
    for (let k = 0; k <= 255; k++) {
        grayArray.push(k);
    }
    var arySize = grayArray.length;
    grayArray = shuffleArray(grayArray);

    let mergeQueue = [];
    let merging = null;
    let temp = [];
    let l = -1, r = -1, endI = -1, endJ = -1;
    let mergingActive = false;

    let sorting = true;
    let started = false;

    p.setup = function() {
        var canvas = document.getElementById(canvName8);
        p.createCanvas(300,300,canvas);
        //setup 
    };
    p.draw = function() {
        if (started === false) {
            started = true;
            sorting = true;
            p.initMerge();
        }
        if (mergeQueue.length > 1 || mergingActive) {
            p.mergeBG();
            p.printMergeAry();
            p.stepMerge();
            
        } else {
            grayArray = shuffleArray(grayArray);
            itr = 0;
            sorting = true;
            p.insertBG
            p.printMergeAry();
            itr = 0;
            started = false;
            mergingActive = false;
        }
    };
    p.printMergeAry = function() {

        for (let i = 0; i <= arySize; i++) {
            p.stroke(grayArray[i],grayArray[i],grayArray[i]);
            p.line(i+offset,offset,i+offset,offset+256);
        }
        //
        //line at itr, line at jtr
        if (merging !=  null) {
            //rectangle represnting current section being compared
            p.fill(55,55,55);
            p.strokeWeight(0);
            p.rect(offset+merging[0], 0, merging[1]-merging[0], offset);
            p.rect(offset+merging[0], offset+256, merging[1]-merging[0], offset+offset+256);
            p.strokeWeight(1);
            //left index being compared
            p.stroke(0,255,0);
            p.line(l+offset, 0, l+offset, offset);
            p.line(l+offset, offset+256, l+offset, offset+offset+256);
            //right index being compared
            p.stroke(0,0,255);
            p.line(r+offset, 0, r+offset, offset);
            p.line(r+offset, offset+256, r+offset, offset+offset+256);
        }
    };
    p.mergeBG = function() {
        p.background(0,0,0);
        p.stroke(255,255,255);
        p.line(5,5,5,15);
        p.line(15,5,15,15);
        p.line(5,5,10,15);
        p.line(15,5,10,15);
    };
    p.stepMerge = function() {
        if (!mergingActive) {
            if (mergeQueue.length > 1) {
                let left = mergeQueue.shift();
                let right = mergeQueue.shift();
                p.startMerge(left, right);
            } else {
                mergingActive = false;
                merging = [];
            }
        } else {
            p.continueMerge();
        }
    };
    p.startMerge = function(left, right) {
        temp = [];
        l = left[0];
        r = right[0];
        endI = left[1];
        endJ = right[1];
        merging = [l, endJ];
        mergingActive = true;
    };
    p.continueMerge = function() {
        if (l <= endI && r <= endJ) {
            if (grayArray[l] < grayArray[r]) {
              temp.push(grayArray[l++]);
            } else {
              temp.push(grayArray[r++]);
            }
          } else if (l <= endI) {
            temp.push(grayArray[l++]);
          } else if (r <= endJ) {
            temp.push(grayArray[r++]);
          }
          
          if (l > endI && r > endJ) {
            for (let k = 0; k < temp.length; k++) {
              grayArray[merging[0] + k] = temp[k];
            }
            mergingActive = false;
            mergeQueue.push([merging[0], merging[1]]);
          }
    };
    p.initMerge = function() {
        mergeQueue = [];
        for (let i = 0; i < grayArray.length; i++) {
          mergeQueue.push([i, i]); // Each index as its own segment
        }
    };
};
//=========================================================================SELECTION SORT ANIMATION=====================================================================================
var selectSortAnim = function(p) {
    var offset = 22;
    let grayArray = [];
    for (let k = 0; k <= 255; k++) {
        grayArray.push(k);
    }
    var arySize = grayArray.length;
    grayArray = shuffleArray(grayArray);

    let currentIndex = 0;
    let minIndex = 0;
    let checkingIndex = 1;
    let sortingActive = true;

    p.setup = function() {
        var canvas = document.getElementById(canvName9);
        p.createCanvas(300,300,canvas);
        //setup 
    };
    p.draw = function() {
        if (sortingActive == true) {
            p.selectBG();
            p.printSelectAry();
            p.selectSortStep();
        } else {
            currentIndex = 0;
            minIndex = 0;
            checkingIndex = 1;
            grayArray = shuffleArray(grayArray);
            sortingActive = true;
        }
    };
    p.printSelectAry = function() {
        for (let i = 0; i <= arySize; i++) {
            p.stroke(grayArray[i],grayArray[i],grayArray[i]);
            p.line(i+offset,offset,i+offset,offset+256);
        }
        //index being checked for minimum number
        p.stroke(0,0,255);
        p.line(checkingIndex+offset, 0, checkingIndex+offset, offset);
        p.line(checkingIndex+offset, offset+256, checkingIndex+offset, offset+offset+256);
        //index to insert value
        p.stroke(0,255,0);
        p.line(currentIndex+offset, 0, currentIndex+offset, offset);
        p.line(currentIndex+offset, offset+256, currentIndex+offset, offset+offset+256);
        //index of current minimum
        p.stroke(255,0,0);
        p.line(minIndex+offset, 0, minIndex+offset, offset);
        p.line(minIndex+offset, offset+256, minIndex+offset, offset+offset+256);
    };
    p.selectBG = function() {
        p.background(0,0,0);
        p.stroke(255,255,255);

        p.noFill();
        p.arc(10,7.5,5,5,Math.PI*3/4,Math.PI*7/4);
        p.arc(10,12.5,5,5,Math.PI*7/4,Math.PI*3/4);
        p.line(9,9,11,11);

    };
    p.selectSortStep = function() {
        if (currentIndex >= grayArray.length - 1) {
            sortingActive = false; // Sorting complete
            return;
        }
        
          // Compare and find the minimum element
          if (grayArray[checkingIndex] < grayArray[minIndex]) {
            minIndex = checkingIndex;
        }
        checkingIndex++;
        // If we've checked the whole array, swap and move to next index
        if (checkingIndex >= grayArray.length) {
        // Swap only if needed
            if (minIndex !== currentIndex) {
                [grayArray[currentIndex], grayArray[minIndex]] = [grayArray[minIndex], grayArray[currentIndex]];
            }
            // Move to the next index
            currentIndex++;
            minIndex = currentIndex;
            checkingIndex = currentIndex + 1;
        }
    };
};
//=========================================================================QUICK SORT ANIMATION=====================================================================================
var quickSortAnim = function(p) {
    var offset = 22;
    let grayArray = [];
    for (let k = 0; k <= 255; k++) {
        grayArray.push(k);
    }
    var arySize = grayArray.length;
    grayArray = shuffleArray(grayArray);

    let stack = [];
    stack.push([0, grayArray.length - 1]);
    let pivotIndex = -1;
    let leftIndex = -1;
    let rightIndex = -1;
    let pivotValue = null;
    let partitionLow = -1;
    let partitionHigh = -1;
    let partitionIndex = -1;
    let sortingActive = true;
    let j = -1; // Tracks position in partition loop
    let partitioning = false;

    p.setup = function() {
        var canvas = document.getElementById(canvName10);
        p.createCanvas(300,300,canvas);
        //setup 
    };
    p.draw = function() {
        if (sortingActive == true) {
            p.quickBG();
            p.printQuickAry();
            p.quickSortStep();
        } else {
            stack = [];
            pivotIndex = -1;
            leftIndex = -1;
            rightIndex = -1;
            pivotValue = null;
            partitionLow = -1;
            partitionHigh = -1;
            partitionIndex = -1;
            j = -1;
            partitioning = false;
            sortingActive = true;
            grayArray = shuffleArray(grayArray);
            stack.push([0, grayArray.length - 1]);
        }
    };
    p.printQuickAry = function() {
        for (let i = 0; i <= arySize; i++) {
            p.stroke(grayArray[i],grayArray[i],grayArray[i]);
            p.line(i+offset,offset,i+offset,offset+256);
        }


        //rectangle represnting current section being compared
        p.fill(55,55,55);
        p.strokeWeight(0);
        p.rect(offset+partitionLow, 0, partitionHigh-partitionLow, offset);
        p.rect(offset+partitionLow, offset+256, partitionHigh-partitionLow, offset+offset+256);
        p.strokeWeight(1);

        p.stroke(255,0,0);
        p.line(pivotValue+offset, 0, pivotValue+offset, offset);
        p.line(pivotValue+offset, offset+256, pivotValue+offset, offset+offset+256);

        p.stroke(0,255,0);
        p.line(j+offset, 0, j+offset, offset);
        p.line(j+offset, offset+256, j+offset, offset+offset+256);  

        p.stroke(0,0,255);
        p.line(partitionIndex+offset, 0, partitionIndex+offset, offset);
        p.line(partitionIndex+offset, offset+256, partitionIndex+offset, offset+offset+256);
    };
    p.quickBG = function() {
        p.background(0,0,0);
        p.stroke(255,255,255);

        p.noFill();
        p.circle(10,10,10);
        p.line(10,10,16,16);
    };
    p.quickSortStep = function() {
        if (partitioning) {
            p.continuePartition();
            return;
        }
        if (stack.length === 0) {
            sortingActive = false; // Sorting complete
        return;
        }
        // Start partitioning process
        let [low, high] = stack.pop();
        if (low < high) {
            p.startPartition(low, high);
        }
    };
    p.startPartition = function(low, high) {
        pivotValue = grayArray[high]; // Pivot is always the last element
        partitionIndex = low;
        partitionLow = low;
        partitionHigh = high;
        j = low; // Start loop
        pivotIndex = high;
        partitioning = true;
    };
    p.continuePartition = function() {
        if (j < partitionHigh) {
            if (grayArray[j] < pivotValue) {
              [grayArray[partitionIndex], grayArray[j]] = [grayArray[j], grayArray[partitionIndex]];
              partitionIndex++;
            }
            j++; // Move to next element
        } else {
            // Swap pivot into correct position
            [grayArray[partitionIndex], grayArray[partitionHigh]] = [grayArray[partitionHigh], grayArray[partitionIndex]];
            pivotIndex = partitionIndex;
            // Push new partitions onto the stack
            stack.push([partitionLow, pivotIndex - 1]); // Left side
            stack.push([pivotIndex + 1, partitionHigh]); // Right side
            partitioning = false; // Partitioning complete
        }
    };
};
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||RUN ANIMATIONS|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
var myp5 = new p5(radarAnim, canvName1);
var myp5 = new p5(lineAnim, canvName2);
var myp5 = new p5(bounceAnim, canvName3);

var myp5 = new p5(insertSortAnim, canvName6);
var myp5 = new p5(bubbleSortAnim, canvName7);
var myp5 = new p5(mergeSortAnim, canvName8);
var myp5 = new p5(selectSortAnim, canvName9);
var myp5 = new p5(quickSortAnim, canvName10);


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
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
