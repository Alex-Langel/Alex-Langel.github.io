var canvas = document.getElementById('cubeCanv');
var cW = canvas.width;
var cH = canvas.height;

/*
let cube = [[["yellow","yellow","yellow"],
             ["yellow","yellow","yellow"],
             ["yellow","yellow","yellow"]],
            [["blue","blue","blue"],
             ["blue","blue","blue"],
             ["blue","blue","blue"]],
            [["white","white","white"],
             ["white","white","white"],
             ["white","white","white"]],
            [["green","green","green"],
             ["green","green","green"],
             ["green","green","green"]],
            [["red","red","red"],
             ["red","red","red"],
             ["red","red","red"]],
            [["orange","orange","orange"],
             ["orange","orange","orange"],
             ["orange","orange","orange"]]];
*/

let cube = [[["yellow","yellow","yellow"],
             ["yellow","yellow","yellow"],
             ["yellow","yellow","yellow"]],
            [["blue","blue","blue"],
             ["blue","blue","blue"],
             ["blue","blue","blue"]],
            [["white","white","white"],
             ["white","white","white"],
             ["white","white","white"]],
            [["green","green","green"],
             ["green","green","green"],
             ["green","green","green"]],
            [["red","red","red"],
             ["red","red","red"],
             ["red","red","red"]],
            [["orange","orange","orange"],
             ["orange","orange","orange"],
             ["orange","orange","orange"]]];         

//far edge borders and absolute middle
const margL = Math.round(cW * (10/100));
const margR = Math.round(cW * (90/100));
const margT = Math.round(cH * (10/100));
const margB = Math.round(cH * (90/100));

/////////////////////////////////////////////
//               OUTER POINTS              //
/////////////////////////////////////////////
const lefTop = [margL, Math.round(cH * (1/4))];
const lefBot = [margL, Math.round(cH * (3/4))];
const rigTop = [margR, Math.round(cH * (1/4))];
const rigBot = [margR, Math.round(cH * (3/4))];
const midTop = [Math.round(cW * (1/2)), margT]
const midBot = [Math.round(cW * (1/2)), margB];
const midMid = [Math.round(cW * (1/2)), Math.round(cH * (4/10))];
/////////////////////////////////////////////
//              SHARED POINTS              //
/////////////////////////////////////////////
const shTLLef = getFirstThird(lefTop, midMid);
const shTLRig = getLastThird(lefTop, midMid);
const shTRLef = getFirstThird(midMid, rigTop);
const shTRRig = getLastThird(midMid, rigTop);
const shMDTop = getFirstThird(midMid, midBot);
const shMDBot = getLastThird(midMid, midBot);
/////////////////////////////////////////////
//         Lower Left Outer                //
/////////////////////////////////////////////
const lloLefUp = getFirstThird(lefTop, lefBot);
const lloLefDn = getLastThird(lefTop, lefBot);
const lloDnLef = getFirstThird(lefBot, midBot);
const lloDnRig = getLastThird(lefBot, midBot);
/////////////////////////////////////////////
//         Lower Right Outer               //
/////////////////////////////////////////////
const lroRigUp = getFirstThird(rigTop, rigBot);
const lroRigDn = getLastThird(rigTop, rigBot);
const lroDnLef = getFirstThird(midBot, rigBot);
const lroDnRig = getLastThird(midBot, rigBot);
/////////////////////////////////////////////
//         Upper Mid Outer                 //
/////////////////////////////////////////////
const umoLefUp = getFirstThird(midTop, lefTop);
const umoLefDn = getLastThird(midTop, lefTop);
const umoRigUp = getFirstThird(midTop, rigTop);
const umoRigDn = getLastThird(midTop, rigTop);
/////////////////////////////////////////////
//         Lower Left Inner                //
/////////////////////////////////////////////
const lliTL = getFirstThird(lloLefUp, shMDTop);
const lliTR = getLastThird(lloLefUp, shMDTop);
const lliLR = getLastThird(lloLefDn, shMDBot);
const lliLL = getFirstThird(lloLefDn, shMDBot);
/////////////////////////////////////////////
//         Lower Right Inner               //
/////////////////////////////////////////////

const lriTL = getLastThird(lroRigUp, shMDTop);
const lriTR = getFirstThird(lroRigUp, shMDTop);
const lriLL = getLastThird(lroRigDn, shMDBot);
const lriLR = getFirstThird(lroRigDn, shMDBot);
/////////////////////////////////////////////
//         Upper Mid Inner                 //
/////////////////////////////////////////////
const umiUp = getFirstThird(umoRigUp, shTLLef);
const umiLf = getLastThird(umoRigUp, shTLLef);
const umiRt = getFirstThird(umoRigDn, shTLRig);
const umiDn = getLastThird(umoRigDn, shTLRig);


//initial setup
function setup() {  
    // Create Canvas of given size  
    createCanvas(cW, cH, cubeCanv);

    background(150,150,150);




    drawCube();


    
} 


//---------------------------------------------------------------------------DEBUG FUNCTIONS----------------------------------------------------------------------------------------
function debugOut() {
    document.getElementById("output1").innerText = cube[0];
    document.getElementById("output2").innerText = cube[1];
    document.getElementById("output3").innerText = cube[2];
    document.getElementById("output4").innerText = cube[3];
    document.getElementById("output5").innerText = cube[4];
    document.getElementById("output6").innerText = cube[5];
    document.getElementById("output7").innerText = cube[4][0][0];
}
//-----------------------------------------------------------------------------MATH/UTILS-------------------------------------------------------------------------------------------
function getFirstThird(point1, point2){
    var rtVal = [0,0];
rtVal[0] = ((point1[0] * (2/3)) + (point2[0] * (1/3)));
rtVal[1] = ((point1[1] * (2/3)) + (point2[1] * (1/3)));
    return rtVal;
}
function getLastThird(point1, point2){
    var rtVal = [0,0];
rtVal[0] = ((point1[0] * (1/3)) + (point2[0] * (2/3)));
rtVal[1] = ((point1[1] * (1/3)) + (point2[1] * (2/3)));
    return rtVal;
}
function invertArray(array){
    var retAry = [];
    for (var i = array.length-1; i > -1; i--) {
        retAry.push(array[i]);
    }
    return retAry;
}
function getArrayByVal(array) {
    var tAry = [];
    for (var i = 0; i < array.length; i++)
    {
        tAry.push(array[i]);
    }
    return tAry;
}
function get2DArrayByVal(array) {
    var tAr = [];
    var tAry = [[]];
    for (var i = 0; i < array.length; i++)
        {
            for (var j = 0; j < array[0].length; i++)
            {
                tAr.push(array[i]);
            }
            tAry.push(tAr);
        }
        return tAry;
}
function deepCopy(arr) {
    if (!Array.isArray(arr)) {
      return arr; // Return if not an array (base case for recursion)
    }
  
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(deepCopy(arr[i])); // Recursive call for nested arrays
    }
    return newArr;
  }
//--------------------------------------------------------------------------TURNING THE CUBE---------------------------------------------------------------------------------------

function leftTurn(){
    var tempVals = [cube[0][0][0],cube[0][1][0],cube[0][2][0]];
    rotateFace(cube[3]);

    cube[0][0][0] = cube[4][0][2];
    cube[0][1][0] = cube[4][0][1];
    cube[0][2][0] = cube[4][0][0];

    cube[4][0][2] = cube[2][2][2];
    cube[4][0][1] = cube[2][1][2];
    cube[4][0][0] = cube[2][0][2];

    cube[2][2][2] = cube[5][0][2];
    cube[2][1][2] = cube[5][0][1];
    cube[2][0][2] = cube[5][0][0];

    cube[5][0][2] = tempVals[0];
    cube[5][0][1] = tempVals[1];
    cube[5][0][0] = tempVals[2];

    drawCube();
}

function leftPTurn(){
    var tempVals = [cube[0][0][0],cube[0][1][0],cube[0][2][0]];
    rotatePFace(cube[3]);

    cube[0][0][0] = cube[5][0][2];
    cube[0][1][0] = cube[5][0][1];
    cube[0][2][0] = cube[5][0][0];

    cube[5][0][2] = cube[2][2][2];
    cube[5][0][1] = cube[2][1][2];
    cube[5][0][0] = cube[2][0][2];

    cube[2][2][2] = cube[4][0][2];
    cube[2][1][2] = cube[4][0][1];
    cube[2][0][2] = cube[4][0][0];

    cube[4][0][2] = tempVals[0];
    cube[4][0][1] = tempVals[1];
    cube[4][0][0] = tempVals[2];
    drawCube();
}

function leftDTurn(){
    leftTurn();
    middleTurn();
}



function rightTurn(){
    var tempVals = [cube[0][0][2],cube[0][1][2],cube[0][2][2]];
    rotateFace(cube[1]);

    cube[0][0][2] = cube[5][2][2];
    cube[0][1][2] = cube[5][2][1];
    cube[0][2][2] = cube[5][2][0];

    cube[5][2][2] = cube[2][2][0];
    cube[5][2][1] = cube[2][1][0];
    cube[5][2][0] = cube[2][0][0];

    cube[2][2][0] = cube[4][2][2];
    cube[2][1][0] = cube[4][2][1];
    cube[2][0][0] = cube[4][2][0];

    cube[4][2][2] = tempVals[0];
    cube[4][2][1] = tempVals[1];
    cube[4][2][0] = tempVals[2];

    drawCube();
}

function rightPTurn(){    
    var tempVals = [cube[0][0][2],cube[0][1][2],cube[0][2][2]]
    rotatePFace(cube[1]);

    cube[0][0][2] = cube[4][2][2];
    cube[0][1][2] = cube[4][2][1];
    cube[0][2][2] = cube[4][2][0];

    cube[4][2][2] = cube[2][2][0];
    cube[4][2][1] = cube[2][1][0];
    cube[4][2][0] = cube[2][0][0];

    cube[2][2][0] = cube[5][2][2];
    cube[2][1][0] = cube[5][2][1];
    cube[2][0][0] = cube[5][2][0];

    cube[5][2][2] = tempVals[0];
    cube[5][2][1] = tempVals[1];
    cube[5][2][0] = tempVals[2];

    
    drawCube();

}

function rightDTurn(){
    rightTurn();
    middlePTurn();
}

function upTurn() {
    var tempRow = cube[0][0];
    rotateFace(cube[4]);
    cube[0][0] = cube[1][0];
    cube[1][0] = cube[2][0];
    cube[2][0] = cube[3][0];
    cube[3][0] = tempRow;
    drawCube();
}

function upPTurn() {
    var tempRow = cube[3][0];
    rotatePFace(cube[4]);
    cube[3][0] = cube[2][0];
    cube[2][0] = cube[1][0];
    cube[1][0] = cube[0][0];
    cube[0][0] = tempRow;
    drawCube();
}

function upDTurn(){
    upTurn();
    equatorPTurn();
}

function downTurn(){
    var tempRow = cube[3][2];
    rotateFace(cube[5]);
    cube[3][2] = cube[2][2];
    cube[2][2] = cube[1][2];
    cube[1][2] = cube[0][2];
    cube[0][2] = tempRow;
    drawCube();
}

function downPTurn(){
    var tempRow = cube[0][2];
    rotateFace(cube[5]);
    cube[0][2] = cube[1][2];
    cube[1][2] = cube[2][2];
    cube[2][2] = cube[3][2];
    cube[3][2] = tempRow;
    drawCube();
}

function downDTurn(){
    downTurn();
    equatorTurn();
}

function frontTurn() {
//rotate face 0
var tempVals = [cube[4][0][0],cube[4][1][0],cube[4][2][0]];
rotateFace(cube[0]);
//set top to left
cube[4][0][0] = cube[3][2][2];
cube[4][1][0] = cube[3][1][2];
cube[4][2][0] = cube[3][0][2];
//set left to bottom
cube[3][2][2] = cube[5][2][2];
cube[3][1][2] = cube[5][1][2];
cube[3][0][2] = cube[5][0][2];
//set bottom to right
cube[5][2][2] = cube[1][0][0];
cube[5][1][2] = cube[1][1][0];
cube[5][0][2] = cube[1][2][0];
//set right to temp
cube[1][0][0] = tempVals[0];
cube[1][1][0] = tempVals[1];
cube[1][2][0] = tempVals[2];
drawCube();
}

function frontPTurn() {
    var tempVals = [cube[4][0][0],cube[4][1][0],cube[4][2][0]];
    rotatePFace(cube[0]);
    //set top to right
    cube[4][0][0] = cube[1][0][0];
    cube[4][1][0] = cube[1][1][0];
    cube[4][2][0] = cube[1][2][0];
    //set right to bottom
    cube[1][0][0] = cube[5][2][2];
    cube[1][1][0] = cube[5][1][2];
    cube[1][2][0] = cube[5][0][2];
    //set bottom to left
    cube[5][2][2] = cube[3][2][2];
    cube[5][1][2] = cube[3][1][2];
    cube[5][0][2] = cube[3][0][2];
    //set left to temp
    cube[3][2][2] = tempVals[0]
    cube[3][1][2] = tempVals[1]
    cube[3][0][2] = tempVals[2]
    drawCube();
}

function frontDTurn(){
    frontTurn();
    standingTurn();
}

function backTurn() {
    var tempVals = [cube[4][0][2],cube[4][1][2],cube[4][2][2]];
    rotateFace(cube[2]);
    //set top to right
    cube[4][0][2] = cube[1][0][2];
    cube[4][1][2] = cube[1][1][2];
    cube[4][2][2] = cube[1][2][2];
    //set right to bottom
    cube[1][0][2] = cube[5][2][0];
    cube[1][1][2] = cube[5][1][0];
    cube[1][2][2] = cube[5][0][0];
    //set bottom to left
    cube[5][2][0] = cube[3][2][0];
    cube[5][1][0] = cube[3][1][0];
    cube[5][0][0] = cube[3][0][0];
    //set left to temp
    cube[3][2][0] = tempVals[0]
    cube[3][1][0] = tempVals[1]
    cube[3][0][0] = tempVals[2]
    drawCube();
}

function backPTurn() {
    var tempVals = [cube[4][0][2],cube[4][1][2],cube[4][2][2]];
    rotatePFace(cube[2]);
    //set top to left
    cube[4][0][2] = cube[3][2][0];
    cube[4][1][2] = cube[3][1][0];
    cube[4][2][2] = cube[3][0][0];
    //set left to bottom
    cube[3][2][0] = cube[5][2][0];
    cube[3][1][0] = cube[5][1][0];
    cube[3][0][0] = cube[5][0][0];
    //set bottom to right
    cube[5][2][0] = cube[1][0][2];
    cube[5][1][0] = cube[1][1][2];
    cube[5][0][0] = cube[1][2][2];
    //set right to temp
    cube[1][0][2] = tempVals[0];
    cube[1][1][2] = tempVals[1];
    cube[1][2][2] = tempVals[2];
    drawCube();
}

function backDTurn(){
    backTurn();
    standingPTurn();
}

function middleTurn(){
    var tempVals = [cube[0][0][1],cube[0][1][1],cube[0][2][1]];
    cube[0][0][1] = cube[4][1][2];
    cube[0][1][1] = cube[4][1][1];
    cube[0][2][1] = cube[4][1][0];

    cube[4][1][2] = cube[2][2][1];
    cube[4][1][1] = cube[2][1][1];
    cube[4][1][0] = cube[2][0][1];

    cube[2][2][1] = cube[5][1][2];
    cube[2][1][1] = cube[5][1][1];
    cube[2][0][1] = cube[5][1][0];

    cube[5][1][2] = tempVals[0];
    cube[5][1][1] = tempVals[1];
    cube[5][1][0] = tempVals[2];

    drawCube();
}

function middlePTurn(){
    var tempVals = [cube[0][0][1],cube[0][1][1],cube[0][2][1]];
    cube[0][0][1] = cube[5][1][2];
    cube[0][1][1] = cube[5][1][1];
    cube[0][2][1] = cube[5][1][0];

    cube[5][1][2] = cube[2][2][1];
    cube[5][1][1] = cube[2][1][1];
    cube[5][1][0] = cube[2][0][1];

    cube[2][2][1] = cube[4][1][2];
    cube[2][1][1] = cube[4][1][1];
    cube[2][0][1] = cube[4][1][0];

    cube[4][1][2] = tempVals[0];
    cube[4][1][1] = tempVals[1];
    cube[4][1][0] = tempVals[2];
    drawCube();
}

function equatorTurn() {
    var tempRow = cube[3][1];
    cube[3][1] = cube[2][1];
    cube[2][1] = cube[1][1];
    cube[1][1] = cube[0][1];
    cube[0][1] = tempRow;
    drawCube();
}

function equatorPTurn() {
    var tempRow = cube[0][1];
    cube[0][1] = cube[1][1];
    cube[1][1] = cube[2][1];
    cube[2][1] = cube[3][1];
    cube[3][1] = tempRow;
    drawCube();
}

function standingTurn() {
    var tempVals = [cube[4][0][1],cube[4][1][1],cube[4][2][1]];
    //set top to left
    cube[4][0][1] = cube[3][2][1];
    cube[4][1][1] = cube[3][1][1];
    cube[4][2][1] = cube[3][0][1];
    //set left to bottom
    cube[3][2][1] = cube[5][2][1];
    cube[3][1][1] = cube[5][1][1];
    cube[3][0][1] = cube[5][0][1];
    //set bottom to right
    cube[5][2][1] = cube[1][0][1];
    cube[5][1][1] = cube[1][1][1];
    cube[5][0][1] = cube[1][2][1];
    //set right to temp
    cube[1][0][1] = tempVals[0];
    cube[1][1][1] = tempVals[1];
    cube[1][2][1] = tempVals[2];
    drawCube();
}

function standingPTurn() {
    var tempVals = [cube[4][0][1],cube[4][1][1],cube[4][2][1]];
    rotateFace(cube[2]);
    //set top to right
    cube[4][0][1] = cube[1][0][1];
    cube[4][1][1] = cube[1][1][1];
    cube[4][2][1] = cube[1][2][1];
    //set right to bottom
    cube[1][0][1] = cube[5][2][1];
    cube[1][1][1] = cube[5][1][1];
    cube[1][2][1] = cube[5][0][1];
    //set bottom to left
    cube[5][2][1] = cube[3][2][1];
    cube[5][1][1] = cube[3][1][1];
    cube[5][0][1] = cube[3][0][1];
    //set left to temp
    cube[3][2][1] = tempVals[0]
    cube[3][1][1] = tempVals[1]
    cube[3][0][1] = tempVals[2]
    drawCube();
}

function xTurn() {
rotatePFace(cube[1]);
rotateFace(cube[3]);
var tFace = deepCopy(cube[0]);

// 4->0 fill front from top
cube[0][0][0] = cube[4][0][2]; cube[0][0][1] = cube[4][1][2]; cube[0][0][2] = cube[4][2][2];
cube[0][1][0] = cube[4][0][1]; cube[0][1][1] = cube[4][1][1]; cube[0][1][2] = cube[4][2][1];
cube[0][2][0] = cube[4][0][0]; cube[0][2][1] = cube[4][1][0]; cube[0][2][2] = cube[4][2][0];
// 2->4 fill top from back
cube[4][0][2] = cube[2][2][2]; cube[4][1][2] = cube[2][2][1]; cube[4][2][2] = cube[2][2][0];
cube[4][0][1] = cube[2][1][2]; cube[4][1][1] = cube[2][1][1]; cube[4][2][1] = cube[2][1][0];
cube[4][0][0] = cube[2][0][2]; cube[4][1][0] = cube[2][0][1]; cube[4][2][0] = cube[2][0][0];
// 5->2 fill back from bottom
cube[2][2][2] = cube[5][0][2]; cube[2][2][1] = cube[5][1][2]; cube[2][2][0] = cube[5][2][2];
cube[2][1][2] = cube[5][0][1]; cube[2][1][1] = cube[5][1][1]; cube[2][1][0] = cube[5][2][1];
cube[2][0][2] = cube[5][0][0]; cube[2][0][1] = cube[5][1][0]; cube[2][0][0] = cube[5][2][0];
//0->5 fill bottom from temp
cube[5][0][2] = tFace[0][0]; cube[5][1][2] = tFace[0][1]; cube[5][2][2] = tFace[0][2];
cube[5][0][1] = tFace[1][0]; cube[5][1][1] = tFace[1][1]; cube[5][2][1] = tFace[1][2];
cube[5][0][0] = tFace[2][0]; cube[5][1][0] = tFace[2][1]; cube[5][2][0] = tFace[2][2];
drawCube();
}

function xPTurn() {
    rotateFace(cube[1]);
    rotatePFace(cube[3]);
    var tFace = deepCopy(cube[0]);
// 5->0 fill front from bottom
cube[0][0][0] = cube[5][0][2]; cube[0][0][1] = cube[5][1][2]; cube[0][0][2] = cube[5][2][2];
cube[0][1][0] = cube[5][0][1]; cube[0][1][1] = cube[5][1][1]; cube[0][1][2] = cube[5][2][1];
cube[0][2][0] = cube[5][0][0]; cube[0][2][1] = cube[5][1][0]; cube[0][2][2] = cube[5][2][0];
// 2->5 fill bottom from back
cube[5][0][2] = cube[2][2][2]; cube[5][1][2] = cube[2][2][1]; cube[5][2][2] = cube[2][2][0];
cube[5][0][1] = cube[2][1][2]; cube[5][1][1] = cube[2][1][1]; cube[5][2][1] = cube[2][1][0];
cube[5][0][0] = cube[2][0][2]; cube[5][1][0] = cube[2][0][1]; cube[5][2][0] = cube[2][0][0];
// 4->2 fill back from top
cube[2][2][2] = cube[4][0][2]; cube[2][2][1] = cube[4][1][2]; cube[2][2][0] = cube[4][2][2];
cube[2][1][2] = cube[4][0][1]; cube[2][1][1] = cube[4][1][1]; cube[2][1][0] = cube[4][2][1];
cube[2][0][2] = cube[4][0][0]; cube[2][0][1] = cube[4][1][0]; cube[2][0][0] = cube[4][2][0];
// 0->4 fill bottom from temp
cube[4][0][2] = tFace[0][0]; cube[4][1][2] = tFace[0][1]; cube[4][2][2] = tFace[0][2];
cube[4][0][1] = tFace[1][0]; cube[4][1][1] = tFace[1][1]; cube[4][2][1] = tFace[1][2];
cube[4][0][0] = tFace[2][0]; cube[4][1][0] = tFace[2][1]; cube[4][2][0] = tFace[2][2];
drawCube();
}

function yTurn() {
    var tempRow = deepCopy(cube[0]);
    rotateFace(cube[4]);
    rotatePFace(cube[5]);
    cube[0] = cube[1];
    cube[1] = cube[2];
    cube[2] = cube[3];
    cube[3] = tempRow;
    drawCube();
}

function yPTurn() {
    var tempRow = deepCopy(cube[0]);
    rotatePFace(cube[4]);
    rotateFace(cube[5]);
    cube[0] = cube[3];
    cube[3] = cube[2];
    cube[2] = cube[1];
    cube[1] = tempRow;
    drawCube();
}

function zTurn() {
    rotateFace(cube[0]);
    rotatePFace(cube[2]);
    var tFace = deepCopy(cube[1]);
    
    // 4->1 fill right from bottom
    cube[1][0][0] = cube[5][0][0]; cube[1][0][1] = cube[5][0][1]; cube[1][0][2] = cube[5][0][2];
    cube[1][1][0] = cube[5][1][0]; cube[1][1][1] = cube[5][1][1]; cube[1][1][2] = cube[5][1][2];
    cube[1][2][0] = cube[5][2][0]; cube[1][2][1] = cube[5][2][1]; cube[1][2][2] = cube[5][2][2];
    // 2->4 fill bottom from left
    cube[5][0][0] = cube[3][2][2]; cube[5][0][1] = cube[3][2][1]; cube[5][0][2] = cube[3][2][0];
    cube[5][1][0] = cube[3][1][2]; cube[5][1][1] = cube[3][1][1]; cube[5][1][2] = cube[3][1][0];
    cube[5][2][0] = cube[3][0][2]; cube[5][2][1] = cube[3][0][1]; cube[5][2][2] = cube[3][0][0];
    // 5->2 fill left from top
    cube[3][2][2] = cube[4][0][2]; cube[3][1][2] = cube[4][1][2]; cube[3][0][2] = cube[4][2][2];
    cube[3][2][1] = cube[4][0][1]; cube[3][1][1] = cube[4][1][1]; cube[3][0][1] = cube[4][2][1];
    cube[3][2][0] = cube[4][0][0]; cube[3][1][0] = cube[4][1][0]; cube[3][0][0] = cube[4][2][0];
    //0->5 fill top from temp
    cube[4][0][2] = tFace[0][0]; cube[4][1][2] = tFace[1][0]; cube[4][2][2] = tFace[2][0];
    cube[4][0][1] = tFace[0][1]; cube[4][1][1] = tFace[1][1]; cube[4][2][1] = tFace[2][1];
    cube[4][0][0] = tFace[0][2]; cube[4][1][0] = tFace[1][2]; cube[4][2][0] = tFace[2][2];
    drawCube();
}

function zPTurn() {
    rotateFace(cube[0]);
    rotatePFace(cube[2]);
    var tFace = deepCopy(cube[1]);
    
    // 4->1 fill right from top
    cube[1][0][0] = cube[4][0][0]; cube[1][0][1] = cube[4][0][1]; cube[1][0][2] = cube[4][0][2];
    cube[1][1][0] = cube[4][1][0]; cube[1][1][1] = cube[4][1][1]; cube[1][1][2] = cube[4][1][2];
    cube[1][2][0] = cube[4][2][0]; cube[1][2][1] = cube[4][2][1]; cube[1][2][2] = cube[4][2][2];
    // 2->4 fill top from left
    cube[4][0][0] = cube[3][2][2]; cube[4][0][1] = cube[3][2][1]; cube[4][0][2] = cube[3][2][0];
    cube[4][1][0] = cube[3][1][2]; cube[4][1][1] = cube[3][1][1]; cube[4][1][2] = cube[3][1][0];
    cube[4][2][0] = cube[3][0][2]; cube[4][2][1] = cube[3][0][1]; cube[4][2][2] = cube[3][0][0];
    // 5->2 fill left from bottom
    cube[3][2][2] = cube[5][0][2]; cube[3][1][2] = cube[5][1][2]; cube[3][0][2] = cube[5][2][2];
    cube[3][2][1] = cube[5][0][1]; cube[3][1][1] = cube[5][1][1]; cube[3][0][1] = cube[5][2][1];
    cube[3][2][0] = cube[5][0][0]; cube[3][1][0] = cube[5][1][0]; cube[3][0][0] = cube[5][2][0];
    //0->5 fill bottom from temp
    cube[5][0][2] = tFace[0][0]; cube[5][1][2] = tFace[1][0]; cube[5][2][2] = tFace[2][0];
    cube[5][0][1] = tFace[0][1]; cube[5][1][1] = tFace[1][1]; cube[5][2][1] = tFace[2][1];
    cube[5][0][0] = tFace[0][2]; cube[5][1][0] = tFace[1][2]; cube[5][2][0] = tFace[2][2];
    drawCube();
}

function rotateFace(face) {
    var tempVals = [face[0][0],face[0][1],face[0][2]];
//set top row to left col
face[0][2] = face[0][0];
face[0][1] = face[1][0];
face[0][0] = face[2][0];
//set left col to bot row
face[0][0] = face[2][0];
face[1][0] = face[2][1];
face[2][0] = face[2][2];
//set bot row to right col
face[2][0] = face[2][2];
face[2][1] = face[1][2];
face[2][2] = face[0][2];


//set right col to temp
face[2][2] = tempVals[2];
face[1][2] = tempVals[1];
face[0][2] = tempVals[0];
}

function rotatePFace(face) {
    var tempVals = [face[0][0],face[0][1],face[0][2]];

    //set top row to right col
    face[0][0] = face[0][2];
    face[0][1] = face[1][2];
    face[0][2] = face[2][2];
    
    //set right col to bot row
    face[0][2] = face[2][2];
    face[1][2] = face[2][1];
    face[2][2] = face[2][0];
    
    //set bottom row to left col
    face[2][2] = face[2][0];
    face[2][1] = face[1][0];
    face[2][0] = face[0][0];
    
    //set left col to temp
    face[2][0] = tempVals[0]
    face[1][0] = tempVals[1]
    face[0][0] = tempVals[2];
    
    drawCube();
}
//--------------------------------------------------------------------------DRAWING THE CUBE---------------------------------------------------------------------------------------

function drawCube() {
    drawAllFaces();
    drawOutlines();
    drawGridlines();
    //debugOut();
}

function drawAllFaces() {
drawFaceColor(cube[0], 1);
drawFaceColor(cube[1], 2);
drawFaceColor(cube[4], 3);
}

function drawOutlines() {
    stroke('black');
    strokeWeight(1);

    line(lefTop[0], lefTop[1], lefBot[0], lefBot[1]);
    line(midMid[0], midMid[1], midBot[0], midBot[1]);
    line(rigTop[0], rigTop[1], rigBot[0], rigBot[1]);

    line(lefTop[0], lefTop[1], midMid[0], midMid[1]);
    line(lefBot[0], lefBot[1], midBot[0], midBot[1]);

    line(midMid[0], midMid[1], rigTop[0], rigTop[1]);
    line(midBot[0], midBot[1], rigBot[0], rigBot[1]);

    line(lefTop[0], lefTop[1], midTop[0], midTop[1]);
    line(midTop[0], midTop[1], rigTop[0], rigTop[1]);
}

function drawGridlines() {
    stroke('black');
    strokeWeight(1);
    line(lloLefUp[0], lloLefUp[1], shMDTop[0], shMDTop[1]);
    line(lloLefDn[0], lloLefDn[1], shMDBot[0], shMDBot[1]);
    line(shTLLef[0], shTLLef[1], lloDnLef[0], lloDnLef[1]);
    line(shTLRig[0], shTLRig[1], lloDnRig[0], lloDnRig[1]);

    line(shMDTop[0], shMDTop[1], lroRigUp[0], lroRigUp[1]);
    line(shMDBot[0], shMDBot[1], lroRigDn[0], lroRigDn[1]);
    line(shTRLef[0], shTRLef[1], lroDnLef[0], lroDnLef[1]);
    line(shTRRig[0], shTRRig[1], lroDnRig[0], lroDnRig[1]);

    line(umoLefUp[0], umoLefUp[1], shTRRig[0], shTRRig[1]);
    line(umoLefDn[0], umoLefDn[1], shTRLef[0], shTRLef[1]);
    line(umoRigUp[0], umoRigUp[1], shTLLef[0], shTLLef[1]);
    line(umoRigDn[0], umoRigDn[1], shTLRig[0], shTLRig[1]);


    line(shMDBot[0], shMDBot[1], lroRigDn[0], lroRigDn[1]);
    line(shTRLef[0], shTRLef[1], lroDnLef[0], lroDnLef[1]);
    line(shTRRig[0], shTRRig[1], lroDnRig[0], lroDnRig[1]);

}

function drawFaceColor(faceAry, faceNum) {
    var row1col1, row1col2, row1col3, row1col4;
    var row2col1, row2col2, row2col3, row2col4;
    var row3col1, row3col2, row3col3, row3col4;
    var row4col1, row4col2, row4col3, row4col4;
switch (faceNum) {


    case 1: //front left face
    row1col1 = lefTop;
    row1col2 = shTLLef;
    row1col3 = shTLRig;
    row1col4 = midMid;

    row2col1 = lloLefUp;
    row2col2 = lliTL;
    row2col3 = lliTR;
    row2col4 = shMDTop;

    row3col1 = lloLefDn;
    row3col2 = lliLL;
    row3col3 = lliLR;
    row3col4 = shMDBot;

    row4col1 = lefBot;
    row4col2 = lloDnLef;
    row4col3 = lloDnRig;
    row4col4 = midBot;
    break;
    case 2: //front right face
    row1col1 = midMid;
    row1col2 = shTRLef;
    row1col3 = shTRRig;
    row1col4 = rigTop;

    row2col1 = shMDTop;
    row2col2 = lriTL;
    row2col3 = lriTR;
    row2col4 = lroRigUp;

    row3col1 = shMDBot;
    row3col2 = lriLL;
    row3col3 = lriLR;
    row3col4 = lroRigDn;

    row4col1 = midBot;
    row4col2 = lroDnLef;
    row4col3 = lroDnRig;
    row4col4 = rigBot;
    break;
    case 3: //top face
    row1col1 = lefTop;
    row1col2 = umoLefDn;
    row1col3 = umoLefUp;
    row1col4 = midTop;

    row2col1 = shTLLef;
    row2col2 = umiLf;
    row2col3 = umiUp;
    row2col4 = umoRigUp;

    row3col1 = shTLRig;
    row3col2 = umiDn;
    row3col3 = umiRt;
    row3col4 = umoRigDn;

    row4col1 = midMid;
    row4col2 = shTRLef;
    row4col3 = shTRRig;
    row4col4 = rigTop;
    break;
}
noStroke();
    for (i = 0; i < faceAry.length; i++) {
        for (j = 0; j < faceAry[i].length; j++) {
        if (faceAry[i][j] == "red") {
            fill('red');
        } else if (faceAry[i][j] == "blue") {
            fill('blue');
        } else if (faceAry[i][j] == "yellow") {
            fill('yellow');
        } else if (faceAry[i][j] == "orange") {
            fill(240,120,0);
            //fill('orange');
        } else if (faceAry[i][j] == "green") {
            fill('green');
        } else if (faceAry[i][j] == "white") {
            fill('white');
        } else {
            fill('black');
        }
    
        switch (i) {
            case 0:
            switch (j) {
            case 0:
                quad(row1col1[0], row1col1[1], row1col2[0], row1col2[1], row2col2[0], row2col2[1], row2col1[0], row2col1[1]);
            break;
            case 1:
                quad(row1col2[0], row1col2[1], row1col3[0], row1col3[1], row2col3[0], row2col3[1], row2col2[0], row2col2[1]);
            break;
            case 2:
                quad(row1col3[0], row1col3[1], row1col4[0], row1col4[1], row2col4[0], row2col4[1], row2col3[0], row2col3[1]);
            break;
        }
        case 1:
            switch (j) {
                case 0:
                    quad(row2col1[0], row2col1[1], row2col2[0], row2col2[1], row3col2[0], row3col2[1], row3col1[0], row3col1[1]);
                break;
                case 1:
                    quad(row2col2[0], row2col2[1], row2col3[0], row2col3[1], row3col3[0], row3col3[1], row3col2[0], row3col2[1]);
                break;
                case 2:
                    quad(row2col3[0], row2col3[1], row2col4[0], row2col4[1], row3col4[0], row3col4[1], row3col3[0], row3col3[1]);
                break;
            }
        break;
        case 2:
            switch (j) {
                case 0:
                    quad(row3col1[0], row3col1[1], row3col2[0], row3col2[1], row4col2[0], row4col2[1], row4col1[0], row4col1[1]);
                break;
                case 1:
                    quad(row3col2[0], row3col2[1], row3col3[0], row3col3[1], row4col3[0], row4col3[1], row4col2[0], row4col2[1]);
                break;
                case 2:
                    quad(row3col3[0], row3col3[1], row3col4[0], row3col4[1], row4col4[0], row4col4[1], row4col3[0], row4col3[1]);
                break;
            }
        }
    }
}
}






