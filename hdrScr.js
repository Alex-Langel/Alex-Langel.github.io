var outStr = "Welcome to my website thing. Hope you like it :)";
var pntStr = "";
var curStr = "";
var frmCnt = 0;
var id = null;
var frameLength = 100;
var blinkLen = 3;
var numStartBlinks = 5;

fullAnim();

function fullAnim() {
    clearInterval(id);
    id = setInterval(getAnim, frameLength);
}

function getAnim() {
var initBlinkDur = (blinkLen * numStartBlinks * 2);
    if (frmCnt < initBlinkDur) {
        blink();
    }
    else if (outStr.length > 0){
        addFirstLetter();
        pntStr = curStr + "_";
    } else {
        blink();
    }
    document.querySelector('.myHdr').innerText = pntStr;
    frmCnt++;
    return;
}

function blink() {
    frameLength = 100;
    if ([0, 1, 2].includes(frmCnt % 6)) {
        pntStr = curStr + "_";
    } else {
        pntStr = curStr + " "; 
    }
    return;
}

function addFirstLetter() {
    curStr = curStr + outStr[0];
    outStr = outStr.substring(1);
    return;
}






