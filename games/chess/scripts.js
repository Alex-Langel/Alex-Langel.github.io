let boardState = null;
let selectedSquare = null;
let currentTurn = "White";
let validMoves = null;
let turnCounter = 1;
let curMenu = "mainMenu";

let whiteKingMoved = false;
let whiteA1RookMoved = false;
let whiteH1RookMoved = false;

let blackKingMoved = false;
let blackA8RookMoved = false;
let blackH8RookMoved = false;

let enPassantSquare = null;
let promoPause = false;

let leftLabel = false;

displayMainMenu();


function handleSquareClick(squareId) {
    if (promoPause) return;
    const clickedSquareData = boardState[squareId];

    // Step 1: If no square is currently selected, try to select one
    if (!selectedSquare) {
        if (clickedSquareData && clickedSquareData.color === currentTurn) {
            selectedSquare = squareId;
            highlightSquares(squareId);
            
            //Get valid moves for this piece
            validMoves = calculateValidMoves(squareId);
            highlightSquares(validMoves);
        }
        return;
    }

    // Step 2: If a square IS selected, check if this click is a valid move or a re-selection
    if (selectedSquare === squareId) {
        // Clicked the same square again -> deselect
        clearSelection();
    } else {
        // Attempt to move the piece from selectedSquare to squareId
        if (validMoves != null) {
            if (validMoves.includes(squareId)) {
                let moveNote = getMoveNotation(selectedSquare, squareId);
                
                executeMove(selectedSquare, squareId, boardState);
                let pieceObj = boardState[squareId];
                let rank = parseInt(squareId.charAt(1));
                let isPromoting = pieceObj && pieceObj.piece === "Pawn" && 
                                ((pieceObj.color === "White" && rank === 8) || (pieceObj.color === "Black" && rank === 1));

                if (isPromoting) {
                    // Rare exception: Pause and launch the modal
                    promoPause = true;
                    showPromotionModal(pieceObj.color, squareId, moveNote);
                    return; // Stop here; the modal's button click will finish the turn
                }
                moveNote = checkCheck(moveNote);
                addMoveToList(moveNote);
                clearSelection();
                swapTurns();

                //handlePromotion() ENDS TURN IN CASE OF WAIT FOR PROMO
            }
        }
    }
}

function checkCheck(moveNote) {
    if (currentTurn == "White") {
        if (isThisCheck("Black", boardState)) {
            if (isThisCheckmate("Black", boardState)) {
                moveNote = moveNote + "#"
                gameOver("White");
            } else {
                moveNote = moveNote + "+"
            }
        }
    } else {
        if (isThisCheck("White", boardState)) {
            if (isThisCheckmate("White", boardState)) {
                moveNote = moveNote + "#"
                gameOver("Black");
            } else {
                moveNote = moveNote + "+"
            }
        }
    }
    return moveNote;
}

function clearSelection() {
    unhighlightSquares(selectedSquare);
    selectedSquare = null;
    for (let i=0; i < validMoves.length; i++) {
        unhighlightSquares(validMoves);
    }
    validMoves = null;
}

function highlightSquares(squareIds) {
    if (Array.isArray(squareIds)) {
        for (let i=0; i < squareIds.length; i++) {
            let el = document.getElementById(squareIds[i]);
            el.style.boxShadow = "inset 0 0 0 4px green";
        }
    } else {
        let el = document.getElementById(squareIds);
        el.style.boxShadow = "inset 0 0 0 4px green";
    }
}

function unhighlightSquares(squareIds) {
    if (Array.isArray(squareIds)) {
        for (let i=0; i < squareIds.length; i++) {
            let el = document.getElementById(squareIds[i]);
            el.style.boxShadow = "";
        }
    } else {
        let el = document.getElementById(squareIds);
        el.style.boxShadow = "";
    }
}

function calculateValidMoves(squareId) {
    let validMoves = [];
    let movingPiece = boardState[squareId].piece;
    let movingColor = boardState[squareId].color;
    let movingFile = squareId.charAt(0); // e.g., "b" or "B"
    let movingRank = parseInt(squareId.charAt(1)); // e.g., 2

    switch(movingPiece) {
        case "Pawn":
                let diagLeftSquare = null;
                let aheadSquare = null;
                let twoAheadSquare = null;
                let diagRightSquare = null;
                let rankforTwoMoves = null;
            if (movingColor == "White") {
                diagLeftSquare = (String.fromCharCode(squareId.charAt(0).charCodeAt(0) - 1)) + (movingRank+1)+"Square";
                aheadSquare = (movingFile)+(movingRank+1)+"Square";
                twoAheadSquare = (movingFile)+(movingRank+2)+"Square";
                diagRightSquare = (String.fromCharCode(squareId.charAt(0).charCodeAt(0) + 1)) + (movingRank+1)+"Square";
                rankforTwoMoves = 2;
            } else { //Black move
                diagLeftSquare = (String.fromCharCode(squareId.charAt(0).charCodeAt(0) - 1)) + (movingRank-1)+"Square";
                aheadSquare = (movingFile)+(movingRank-1)+"Square";
                twoAheadSquare = (movingFile)+(movingRank-2)+"Square";
                diagRightSquare = (String.fromCharCode(squareId.charAt(0).charCodeAt(0) + 1)) + (movingRank-1)+"Square";
                rankforTwoMoves = 7;
            }
            //check diag left
            if (isValidPawnMove(squareId, diagLeftSquare,"take")){
                let checksMyself =  selfCheck(squareId, diagLeftSquare);
                if (checksMyself == false){
                    validMoves.push(diagLeftSquare);
                }
            } else if (diagLeftSquare === enPassantSquare) {
                // En Passant Left check
                let checksMyself = selfCheck(squareId, diagLeftSquare);
                if (checksMyself == false) {
                    validMoves.push(diagLeftSquare);
                }
            }
            //check ahead
            if (isValidPawnMove(squareId, aheadSquare,"move")){
                let checksMyself =  selfCheck(squareId, aheadSquare);
                    if (checksMyself == false){
                        validMoves.push(aheadSquare);
                    }
                if (movingRank == rankforTwoMoves) {
                    if (isValidPawnMove(squareId, twoAheadSquare,"move")){
                        let checksMyselfTwo =  selfCheck(squareId, twoAheadSquare);
                        if (checksMyselfTwo == false){
                            validMoves.push(twoAheadSquare);
                        }
                    }
                }
            }
            //check diag right
            if (isValidPawnMove(squareId, diagRightSquare,"take")){
                let checksMyself =  selfCheck(squareId, diagRightSquare);
                if (checksMyself == false){
                    validMoves.push(diagRightSquare);
                }
            } else if (diagRightSquare === enPassantSquare) {
                // En Passant Right check
                let checksMyself = selfCheck(squareId, diagRightSquare);
                if (checksMyself == false) {
                    validMoves.push(diagRightSquare);
                }
            }
            break;
        case "Rook":
            for (let i = 0; i < 4; i++) {
                let nextSquare = squareId;
                let nextFile = nextSquare.charAt(0); // e.g., "b" or "B"
                let nextRank = parseInt(nextSquare.charAt(1)); // e.g., 2
                let invalidFound = false;
                while (invalidFound == false){
                    //i = 0; look up
                    if (i == 0) {
                        nextSquare = (nextFile)+(nextRank+1)+"Square";
                    //i = 1; look down
                    } else if (i == 1) {
                        nextSquare = (nextFile)+(nextRank-1)+"Square";
                    //i = 2; look right
                    } else if (i == 2) {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1)) + (nextRank) + "Square";
                    //i = 3; look left
                    } else {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1)) + (nextRank) + "Square";
                    } 
                    nextFile = nextSquare.charAt(0); // e.g., "b" or "B"
                    nextRank = parseInt(nextSquare.charAt(1)); // e.g., 2
                    //off of board
                    if (nextRank == 9 || nextRank == 0 || nextFile == "`" || nextFile == "i") {
                        invalidFound = true;
                        break;
                    }

                    let canPieceMove = canBigPieceMove(squareId, nextSquare);
                    if (canPieceMove[0] == true) {
                        let checksMyself =  selfCheck(squareId, nextSquare);
                        if (checksMyself == false){
                            validMoves.push(nextSquare);
                        }
                        if (canPieceMove[1] == "take") {
                            invalidFound = true;
                        }
                    } else {
                        invalidFound = true;
                    }
                }
            }
            break;
        case "Bishop":
            for (let i = 0; i < 4; i++) {
                let nextSquare = squareId;
                let nextFile = nextSquare.charAt(0); // e.g., "b" or "B"
                let nextRank = parseInt(nextSquare.charAt(1)); // e.g., 2
                let invalidFound = false;
                while (invalidFound == false){
                    //i = 0; look up right
                    if (i == 0) {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1))+(nextRank+1)+"Square";
                    //i = 1; look up left
                    } else if (i == 1) {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1))+(nextRank+1)+"Square";
                    //i = 2; look down right
                    } else if (i == 2) {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1))+(nextRank-1)+"Square";
                    //i = 3; look down left
                    } else {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1))+(nextRank-1)+"Square";
                    } 
                    nextFile = nextSquare.charAt(0); // e.g., "b" or "B"
                    nextRank = parseInt(nextSquare.charAt(1)); // e.g., 2
                    //off of board
                    if (nextRank == 9 || nextRank == 0 || nextFile == "`" || nextFile == "i") {
                        invalidFound = true;
                        break;
                    }

                    let canPieceMove = canBigPieceMove(squareId, nextSquare);
                    if (canPieceMove[0] == true) {
                        let checksMyself =  selfCheck(squareId, nextSquare);
                        if (checksMyself == false){
                            validMoves.push(nextSquare);
                        }
                        if (canPieceMove[1] == "take") {
                            invalidFound = true;
                        }
                    } else {
                        invalidFound = true;
                    }
                }
            }
        break;
        case "Knight":
            let file = selectedSquare.charCodeAt(0);
            let rank = parseInt(selectedSquare.charAt(1));
            let moves = [
                [1, 2], [1, -2],
                [-1, 2], [-1, -2],
                [2, 1], [2, -1],
                [-2, 1], [-2, -1]
            ];
            let onBoardMoves = [];
            for (let [fileChange, rankChange] of moves) {
                let newFile = file + fileChange;
                let newRank = rank + rankChange;

                if (
                    newFile >= 97 && newFile <= 104 &&
                    newRank >= 1 && newRank <= 8
                ) {
                    onBoardMoves.push(
                        String.fromCharCode(newFile) + newRank + "Square"
                    );
                }
            }
            for (let move of onBoardMoves) {
                let canPieceMove = canBigPieceMove(squareId, move);
                if (canPieceMove[0] == true) {
                    let checksMyself =  selfCheck(squareId, move);
                    if (checksMyself == false){
                        validMoves.push(move);
                    }
                }
            }

        break;
        case "Queen":
            for (let i = 0; i < 8; i++) {
                let nextSquare = squareId;
                let nextFile = nextSquare.charAt(0); // e.g., "b" or "B"
                let nextRank = parseInt(nextSquare.charAt(1)); // e.g., 2
                let invalidFound = false;
                while (invalidFound == false){
                    //i = 0; look up
                    if (i == 0) {
                        nextSquare = (nextFile)+(nextRank+1)+"Square";
                    //i = 1; look down
                    } else if (i == 1) {
                        nextSquare = (nextFile)+(nextRank-1)+"Square";
                    //i = 2; look right
                    } else if (i == 2) {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1)) + (nextRank) + "Square";
                    //i = 3; look left
                    } else if (i == 3) {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1)) + (nextRank) + "Square";
                    //i = 4; look up right  
                    } else if (i == 4) {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1))+(nextRank+1)+"Square";
                    //i = 5; look up left
                    } else if (i == 5) {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1))+(nextRank+1)+"Square";
                    //i = 6; look down right
                    } else if (i == 6) {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1))+(nextRank-1)+"Square";
                    //i = 7; look down left
                    } else {
                        nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1))+(nextRank-1)+"Square";
                    }


                    nextFile = nextSquare.charAt(0); // e.g., "b" or "B"
                    nextRank = parseInt(nextSquare.charAt(1)); // e.g., 2
                    //off of board
                    if (nextRank == 9 || nextRank == 0 || nextFile == "`" || nextFile == "i") {
                        invalidFound = true;
                        break;
                    }

                    let canPieceMove = canBigPieceMove(squareId, nextSquare);
                    if (canPieceMove[0] == true) {
                        let checksMyself =  selfCheck(squareId, nextSquare);
                        if (checksMyself == false){
                            validMoves.push(nextSquare);
                        }
                        
                        if (canPieceMove[1] == "take") {
                            invalidFound = true;
                        }
                    } else {
                        invalidFound = true;
                    }
                }
            }
        break;
        case "King":
            for (let i = 0; i < 8; i++) {
                let nextSquare = squareId;
                let nextFile = nextSquare.charAt(0); // e.g., "b" or "B"
                let nextRank = parseInt(nextSquare.charAt(1)); // e.g., 2
                //i = 0; look up
                if (i == 0) {
                    nextSquare = (nextFile)+(nextRank+1)+"Square";
                //i = 1; look down
                } else if (i == 1) {
                    nextSquare = (nextFile)+(nextRank-1)+"Square";
                //i = 2; look right
                } else if (i == 2) {
                    nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1)) + (nextRank) + "Square";
                //i = 3; look left
                } else if (i == 3) {
                    nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1)) + (nextRank) + "Square";
                //i = 4; look up right  
                } else if (i == 4) {
                    nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1))+(nextRank+1)+"Square";
                //i = 5; look up left
                } else if (i == 5) {
                    nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1))+(nextRank+1)+"Square";
                //i = 6; look down right
                } else if (i == 6) {
                    nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1))+(nextRank-1)+"Square";
                //i = 7; look down left
                } else {
                    nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1))+(nextRank-1)+"Square";
                }
                nextFile = nextSquare.charAt(0); // e.g., "b" or "B"
                nextRank = parseInt(nextSquare.charAt(1)); // e.g., 2
                //off of board
                if (nextRank == 9 || nextRank == 0 || nextFile == "`" || nextFile == "i") {

                } else {
                    let canPieceMove = canBigPieceMove(squareId, nextSquare);
                    if (canPieceMove[0] == true) {
                        let checksMyself =  selfCheck(squareId, nextSquare);
                        if (checksMyself == false){
                            validMoves.push(nextSquare);
                        }
                    }
                }
            }

            // --- CASTLING LOGIC FOR KING ---
        let color = boardState[squareId].color;
        if (color === "White" && !whiteKingMoved && squareId === "e1Square") {
            // Kingside Castle (g1)
            if (!whiteH1RookMoved && boardState["h1Square"]?.piece === "Rook" && 
                !boardState["f1Square"] && !boardState["g1Square"] &&
                !isThisCheck("White", boardState) && !selfCheck("e1Square", "f1Square") && !selfCheck("e1Square", "g1Square")) {
                validMoves.push("g1Square");
            }
            // Queenside Castle (c1)
            if (!whiteA1RookMoved && boardState["a1Square"]?.piece === "Rook" && 
                !boardState["b1Square"] && !boardState["c1Square"] && !boardState["d1Square"] &&
                !isThisCheck("White", boardState) && !selfCheck("e1Square", "d1Square") && !selfCheck("e1Square", "c1Square")) {
                validMoves.push("c1Square");
            }
        } else if (color === "Black" && !blackKingMoved && squareId === "e8Square") {
            // Kingside Castle (g8)
            if (!blackH8RookMoved && boardState["h8Square"]?.piece === "Rook" && 
                !boardState["f8Square"] && !boardState["g8Square"] &&
                !isThisCheck("Black", boardState) && !selfCheck("e8Square", "f8Square") && !selfCheck("e8Square", "g8Square")) {
                validMoves.push("g8Square");
            }
            // Queenside Castle (c8)
            if (!blackA8RookMoved && boardState["a8Square"]?.piece === "Rook" && 
                !boardState["b8Square"] && !boardState["c8Square"] && !boardState["d8Square"] &&
                !isThisCheck("Black", boardState) && !selfCheck("e8Square", "d8Square") && !selfCheck("e8Square", "c8Square")) {
                validMoves.push("c8Square");
            }
        }


        break;
        default:
            //Should never happen
        break;
    }
    return validMoves;
}

function isValidPawnMove(fromSquareId, toSquareId, moveType) {
    let piece = null;
    let color = null;
    if (boardState[toSquareId]) {
        piece = boardState[toSquareId].piece;
        color = boardState[toSquareId].color;
    }
    let movingColor = boardState[fromSquareId].color;
    let file = toSquareId.charAt(0); // e.g., "b" or "B"
    let rank = parseInt(toSquareId.charAt(1)); // e.g., 2

    if (rank == 9 || rank == 0 || file == "`" || file == "i") {
        return false;
    }
    if (moveType == "move") {
        if (piece) {
            return false;
        } else {
            return true;
        }
    } else {
        if (piece) {
            if (color == movingColor) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}

function canBigPieceMove(fromSquareId, ToSquareId) {
    let piece = null;
    let color = null;
    let curFile = ToSquareId.charAt(0); // e.g., "b" or "B"
    let curRank = parseInt(ToSquareId.charAt(1)); // e.g., 2
    if (boardState[ToSquareId]) {
        piece = boardState[ToSquareId].piece;
        color = boardState[ToSquareId].color;
    }
    let movingColor = boardState[fromSquareId].color;

    if (curRank == 9 || curRank == 0 || curFile == "`" || curFile == "i") {
        return [false, "no"];
    }

    if (piece) {
        if (color == movingColor) {
            return [false, "no"];
        } else {
            return [true, "take"];
        }
    } else {
        return [true, "move"];
    }
}

function executeMove(movingFromSquare, movingToSquare, board, updateHTML = true) {
    let pieceText = getPieceText(movingFromSquare);
    let movingPiece = board[movingFromSquare].piece;

    let newEnPassantSquare = null;








    if (movingPiece === "Pawn") {
        let fromRank = parseInt(movingFromSquare.charAt(1));
        let toRank = parseInt(movingToSquare.charAt(1));
        
        // If pawn moves 2 squares, set the en passant target square
        if (Math.abs(fromRank - toRank) === 2) {
            let file = movingFromSquare.charAt(0);
            let middleRank = (fromRank + toRank) / 2;
            newEnPassantSquare = file + middleRank + "Square";
        }

        // Check if this move is an En Passant capture
        if (movingToSquare === enPassantSquare && !board[movingToSquare]) {
            let capturedPawnSquare = movingToSquare.charAt(0) + movingFromSquare.charAt(1) + "Square";
            delete board[capturedPawnSquare];
            if (updateHTML) {
                document.getElementById(capturedPawnSquare).textContent = "";
            }
        }
    }




    
    if (updateHTML == true) {
        // Track if King or Rooks move (for castling rights)
        // But only if actually moving



        if (movingFromSquare === "e1Square") whiteKingMoved = true;
        if (movingFromSquare === "e8Square") blackKingMoved = true;
        if (movingFromSquare === "a1Square") whiteA1RookMoved = true;
        if (movingFromSquare === "h1Square") whiteH1RookMoved = true;
        if (movingFromSquare === "a8Square") blackA8RookMoved = true;
        if (movingFromSquare === "h8Square") blackH8RookMoved = true;
    }
    
    // Check for Castling (King moves 2 squares)
    if (movingPiece == "King" && Math.abs(movingFromSquare.charCodeAt(0) - movingToSquare.charCodeAt(0)) === 2) {
        let rookFrom, rookTo;
        if (movingToSquare === "g1Square") { // White Kingside
            rookFrom = "h1Square"; rookTo = "f1Square";
        } else if (movingToSquare === "c1Square") { // White Queenside
            rookFrom = "a1Square"; rookTo = "d1Square";
        } else if (movingToSquare === "g8Square") { // Black Kingside
            rookFrom = "h8Square"; rookTo = "f8Square";
        } else if (movingToSquare === "c8Square") { // Black Queenside
            rookFrom = "a8Square"; rookTo = "d8Square";
        }

        // Move the Rook as well
        if (rookFrom && board[rookFrom]) {
            board[rookTo] = board[rookFrom];
            delete board[rookFrom];
            if (updateHTML) {
                document.getElementById(rookTo).textContent = getPieceText(rookTo);
                document.getElementById(rookFrom).textContent = "";
            }
        }
    }







    board[movingToSquare] = board[movingFromSquare];
    delete board[movingFromSquare];
    //boardState[movingFromSquare] = {piece: "", color: ""};
    
    if (updateHTML == true) {
        document.getElementById(movingToSquare).textContent=pieceText;
        document.getElementById(movingFromSquare).textContent="";
        enPassantSquare = newEnPassantSquare;
    }
}

function resetGameVars() {
    boardState = null;
    selectedSquare = null;
    currentTurn = "White";
    validMoves = null;
    turnCounter = 1;
}

function resetBoard() {
    boardState = {
        'a1Square': { piece: 'Rook',   color: 'White' },
        'b1Square': { piece: 'Knight', color: 'White' },
        'c1Square': { piece: 'Bishop', color: 'White' },
        'd1Square': { piece: 'Queen',  color: 'White' },
        'e1Square': { piece: 'King',   color: 'White' },
        'f1Square': { piece: 'Bishop', color: 'White' },
        'g1Square': { piece: 'Knight', color: 'White' },
        'h1Square': { piece: 'Rook',   color: 'White' },

        'a2Square': { piece: 'Pawn', color: 'White' },
        'b2Square': { piece: 'Pawn', color: 'White' },
        'c2Square': { piece: 'Pawn', color: 'White' },
        'd2Square': { piece: 'Pawn', color: 'White' },
        'e2Square': { piece: 'Pawn', color: 'White' },
        'f2Square': { piece: 'Pawn', color: 'White' },
        'g2Square': { piece: 'Pawn', color: 'White' },
        'h2Square': { piece: 'Pawn', color: 'White' },

        'a7Square': { piece: 'Pawn', color: 'Black' },
        'b7Square': { piece: 'Pawn', color: 'Black' },
        'c7Square': { piece: 'Pawn', color: 'Black' },
        'd7Square': { piece: 'Pawn', color: 'Black' },
        'e7Square': { piece: 'Pawn', color: 'Black' },
        'f7Square': { piece: 'Pawn', color: 'Black' },
        'g7Square': { piece: 'Pawn', color: 'Black' },
        'h7Square': { piece: 'Pawn', color: 'Black' },

        'a8Square': { piece: 'Rook',   color: 'Black' },
        'b8Square': { piece: 'Knight', color: 'Black' },
        'c8Square': { piece: 'Bishop', color: 'Black' },
        'd8Square': { piece: 'Queen',  color: 'Black' },
        'e8Square': { piece: 'King',   color: 'Black' },
        'f8Square': { piece: 'Bishop', color: 'Black' },
        'g8Square': { piece: 'Knight', color: 'Black' },
        'h8Square': { piece: 'Rook',   color: 'Black' },
    };
}

function drawBoard() {
    for (let i=0; i < 8; i++) {
        for (let j=0; j < 8; j++) {
            let squareCode = (String.fromCharCode(j + 97)) + (i+1) +"Square";
            let el = document.getElementById(squareCode);
            let piece = ""
            let pieceText = getPieceText(squareCode);
            el.textContent = pieceText;
        }
    }
}

function getPieceText(squareId) {
    let color = "";
    let piece = "";
    if (!boardState[squareId]) {
        color
    } else {
        color=boardState[squareId].color;
        piece=boardState[squareId].piece;
    }
    let pieceText = "";
    if (color == "Black") {
        switch (piece) {
            case "Pawn":
                pieceText = "♟"; 
            break;
            case "Rook":
                pieceText = "♜";
            break;
            case "Knight":
                pieceText = "♞";
            break;
            case "Bishop":
                pieceText = "♝";
            break;
            case "Queen":
                pieceText = "♛";
            break;
            case "King":
                pieceText = "♚";
            break;
            default:
            //should never happen
            break;
        }
    } else if (color == "White") {
        switch (piece) {
            case "Pawn":
                pieceText = "♙"; 
            break;
            case "Rook":
                pieceText = "♖"; 
            break;
            case "Knight":
                pieceText = "♘"; 
            break;
            case "Bishop":
                pieceText = "♗"; 
            break;
            case "Queen":
                pieceText = "♕";
            break; 
            case "King":
                pieceText = "♔"; 
            break;
            default:
            //should never happen
            break;
        }
    } else {
        pieceText = "";
    }
    return pieceText;
}

function writeOut(writeText, writeIndex) {
    if (writeIndex < 1 || writeIndex > 6) {
        return;
    }
    let elementId = "outputLab" + writeIndex;
    let el = document.getElementById(elementId);
    el.textContent = writeText;
}

function initOutputs() {

    if (!leftLabel) {
        createLeftLabel();
    }

    writeOut("Chess :)", 1);
    writeOut(currentTurn + " to move", 2);
    writeOut("Turn " + turnCounter, 3)
}

function createLeftLabel() {
    const lgBlock = document.querySelector('.headerBlockLg');
    const smBlock = document.createElement('div');
    smBlock.className = 'headerBlockSm';

    for (let i = 1; i <= 3; i++) {
        const label = document.createElement('div');
        label.className = i % 2 !== 0 ? 'label labelOdd' : 'label labelEven';
        label.id = "outputLab" + i;
        smBlock.appendChild(label);
    }

    lgBlock.parentNode.insertBefore(smBlock, lgBlock);
    leftLabel = true;
}

function swapTurns() {
    if (currentTurn == "White") {
        currentTurn = "Black";
    } else {
        currentTurn = "White";
        turnCounter++;
    }
    writeOut(currentTurn + " to move", 2);
    writeOut("Turn " + turnCounter, 3);
}

function getMoveNotation(fromSquareId, toSquareId) {
    let movingPiece = boardState[fromSquareId].piece;
    let takenPiece = null;
    if (boardState[toSquareId]) {
        takenPiece = boardState[toSquareId].piece;
    }
    let isEnPassant = (movingPiece === "Pawn" && !boardState[toSquareId] && toSquareId === enPassantSquare);
    let takenNotation = "";
    if (takenPiece == null && !isEnPassant) {
        if (movingPiece == "Pawn") {
            takenNotation = toSquareId.slice(0,2);
        } else if (movingPiece == "Knight") {
            takenNotation = "N" + toSquareId.slice(0,2);
        } else if (movingPiece == "King") {
            if ((fromSquareId == "e1Square" && toSquareId == "c1Square") || ((fromSquareId == "e8Square" && toSquareId == "c8Square"))) {
                takenNotation = "o-o-o";
            } else if ((fromSquareId == "e1Square" && toSquareId == "g1Square") || ((fromSquareId == "e8Square" && toSquareId == "g8Square"))){
                takenNotation = "o-o";
            } else {
                takenNotation = movingPiece.slice(0,1) + toSquareId.slice(0,2);
            }
        } else {
            takenNotation = movingPiece.slice(0,1) + toSquareId.slice(0,2);
        }
    } else {
        if (movingPiece == "Pawn") {
            takenNotation = (fromSquareId.slice(0,1)) + "x" + toSquareId.slice(0,2);
        } else if (movingPiece == "Knight") {
            takenNotation = "N" + "x" +toSquareId.slice(0,2);
        } else {
            takenNotation = movingPiece.slice(0,1) + "x" +toSquareId.slice(0,2);
        }
    }
    return takenNotation;
}

function addMoveToList(move) {
    const moveBar = document.getElementById("moveBar");
    if (currentTurn == "White") {
        const entry = document.createElement("div");
        let oddOrEven = null
        if (turnCounter % 2 == 0) {
            oddOrEven = "Even"
        } else {
            oddOrEven = "Odd"
        }
        entry.className = "moveBarEntry moveBarEntry"+oddOrEven;
        entry.id = "moveBarEntry"+turnCounter;

        const number = document.createElement("div");
        number.className = "moveBarTurnNo";
        number.textContent = turnCounter;

        const whiteMove = document.createElement("div");
        whiteMove.className = "moveBarTurnWhite";
        whiteMove.textContent = move;

        const blackMove = document.createElement("div");
        blackMove.className = "moveBarTurnBlack";

        entry.append(number, whiteMove, blackMove);
        moveBar.appendChild(entry);
    } else {
        const entry = document.getElementById("moveBarEntry"+turnCounter);

        if (entry) {
            entry.querySelector(".moveBarTurnBlack").textContent = move;
        }
    }
}

function isThisCheck(color, board) {
    let kingSquare = Object.keys(board).find(
        square => board[square]?.piece == "King" &&
              board[square]?.color == color
    );

    //check for Pawns - adjaced Diag
    if (checkByPawn(color, kingSquare, board)) {
        return true;
    }
    if (checkByKnight(color, kingSquare, board)) {
        return true;
    }
    if (checkByKing(kingSquare, board)) {
        return true;
    }
    if (checkByRBQ(color, kingSquare, board)) {
        return true;
    }
    return false;
}

function isThisCheckmate(color, board) {
    for (let piece of Object.keys(board)) {
        if (!board[piece]) continue;

        if (board[piece].color == color) {
            let moves = calculateValidMoves(piece);
            if (moves && moves.length > 0) {
                return false;
            }
        }
    }
    return true;
}

function checkByPawn(color, kingSquare, board) {
    let offset = 0;
    if (color == "White") {
        offset = 1;
    } else {
        offset = -1;
    }
    let diagLeft = (String.fromCharCode(kingSquare.charAt(0).charCodeAt(0) - 1)) + (parseInt(kingSquare.charAt(1))+offset)+"Square";
    let diagRight = (String.fromCharCode(kingSquare.charAt(0).charCodeAt(0) + 1)) + (parseInt(kingSquare.charAt(1))+offset)+"Square";

    if (board[diagLeft]) {
        if (board[diagLeft].color != color) {
            if (board[diagLeft].piece != "Knight") {
                return true;
            }
        }
    }
    if (board[diagRight]) {
        if (board[diagRight].color != color) {
            if (board[diagRight].piece != "Knight") {
                return true;
            }
        }
    }
    return false;
}

function checkByKnight(color, kingSquare, board) {
    let file = kingSquare.charCodeAt(0);
    let rank = parseInt(kingSquare.charAt(1));
    let moves = [
        [1, 2], [1, -2],
        [-1, 2], [-1, -2],
        [2, 1], [2, -1],
        [-2, 1], [-2, -1]
    ];
    let onBoardMoves = [];
    for (let [fileChange, rankChange] of moves) {
        let newFile = file + fileChange;
        let newRank = rank + rankChange;

        if (
            newFile >= 97 && newFile <= 104 &&
            newRank >= 1 && newRank <= 8
        ) {
            onBoardMoves.push(
                String.fromCharCode(newFile) + newRank + "Square"
            );
        }
    }
    for (let move of onBoardMoves) {
        if ( board[move] && board[move].color != color && board[move].piece == "Knight") {
            return true;
        }
    }
    return false;
}

function checkByKing(kingSquare, board) {
    for (let i = 0; i < 8; i++) {
        let nextSquare = kingSquare;
        let nextFile = kingSquare.charAt(0); // e.g., "b" or "B"
        let nextRank = parseInt(kingSquare.charAt(1)); // e.g., 2
            //i = 0; look up
            if (i == 0) {
                nextSquare = (nextFile)+(nextRank+1)+"Square";
            //i = 1; look down
            } else if (i == 1) {
                nextSquare = (nextFile)+(nextRank-1)+"Square";
            //i = 2; look right
            } else if (i == 2) {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1)) + (nextRank) + "Square";
            //i = 3; look left
            } else if (i == 3) {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1)) + (nextRank) + "Square";
            //i = 4; look up right  
            } else if (i == 4) {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1))+(nextRank+1)+"Square";
            //i = 5; look up left
            } else if (i == 5) {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1))+(nextRank+1)+"Square";
            //i = 6; look down right
            } else if (i == 6) {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1))+(nextRank-1)+"Square";
            //i = 7; look down left
            } else {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1))+(nextRank-1)+"Square";
            }
            nextFile = nextSquare.charAt(0); // e.g., "b" or "B"
            nextRank = parseInt(nextSquare.charAt(1)); // e.g., 2
            if (board[nextSquare]) {
                if (board[nextSquare].piece == "King") {
                    return true;
                }
            }          
    }
}

function checkByRBQ(color, kingSquare, board) {
    for (let i = 0; i < 8; i++) {
        let nextSquare = kingSquare;
        let nextFile = kingSquare.charAt(0); // e.g., "b" or "B"
        let nextRank = parseInt(kingSquare.charAt(1)); // e.g., 2
        let invalidFound = false;
        while (invalidFound == false){
            //i = 0; look up
            if (i == 0) {
                nextSquare = (nextFile)+(nextRank+1)+"Square";
            //i = 1; look down
            } else if (i == 1) {
                nextSquare = (nextFile)+(nextRank-1)+"Square";
            //i = 2; look right
            } else if (i == 2) {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1)) + (nextRank) + "Square";
            //i = 3; look left
            } else if (i == 3) {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1)) + (nextRank) + "Square";
            //i = 4; look up right  
            } else if (i == 4) {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1))+(nextRank+1)+"Square";
            //i = 5; look up left
            } else if (i == 5) {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1))+(nextRank+1)+"Square";
            //i = 6; look down right
            } else if (i == 6) {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) + 1))+(nextRank-1)+"Square";
            //i = 7; look down left
            } else {
                nextSquare = (String.fromCharCode(nextFile.charAt(0).charCodeAt(0) - 1))+(nextRank-1)+"Square";
            }
            nextFile = nextSquare.charAt(0); // e.g., "b" or "B"
            nextRank = parseInt(nextSquare.charAt(1)); // e.g., 2
            //off of board
            if (nextRank == 9 || nextRank == 0 || nextFile == "`" || nextFile == "i") {
                invalidFound = true;
                break;
            }
            if (board[nextSquare]) {
                if (board[nextSquare].color == color) {
                    invalidFound = true;
                } else {
                    if (board[nextSquare].piece == "Queen") {
                        return true;
                    } else if (board[nextSquare].piece == "Rook") {
                        if (i < 4) {
                            return true;
                        }
                    } else if (board[nextSquare].piece == "Bishop") {
                        if (i > 3) {
                            return true;
                        }
                    }
                    invalidFound = true;
                }
            }          
        }
    }
    return false;
}

function selfCheck(fromSquareId, toSquareId) {
    let checkBoard = structuredClone(boardState);
    let movingColor = checkBoard[fromSquareId].color;
    executeMove(fromSquareId, toSquareId, checkBoard, false);
    if (isThisCheck(movingColor, checkBoard)) {
        return true;
    }
    return false;
}

function gameOver(color) {
    const board = document.getElementById("gameSpace"); // Or document.getElementById("board")

    // 2. Create the main popup overlay div
    const popupOverlay = document.createElement("div");
    popupOverlay.style.position = "absolute";
    popupOverlay.style.inset = "0"; // Stretches across the board
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // Semi-transparent dark background
    popupOverlay.style.display = "flex";
    popupOverlay.style.justifyContent = "center";
    popupOverlay.style.alignItems = "center";
    popupOverlay.style.zIndex = "100"; // Sits on top of everything

    // 3. Create and style the inner content container
    const popupContent = document.createElement("div");
    popupContent.style.backgroundColor = "White";
    popupContent.style.padding = "20px";
    popupContent.style.borderRadius = "8px";
    popupContent.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
    popupContent.style.textAlign = "center";
    
    popupContent.innerHTML = `
        <h2>Game Over!</h2>
        <p>${color} won the game!</p>
        <button id="close-btn" style="padding: 8px 16px; cursor: pointer;">Close</button>
    `;

    // 4. Assemble the popup by putting content inside the overlay
    popupOverlay.appendChild(popupContent);
    board.appendChild(popupOverlay);

    // 5. Append the overlay directly into your board div
    const closeBtn = popupContent.querySelector("#close-btn");
    closeBtn.addEventListener("click", () => {
        popupOverlay.remove();
    });
}

function displayMainMenu() {

    let localMenu = document.getElementById("localMenu");
    if (localMenu) {
        localMenu.remove();
    }
    let mainMenu = document.getElementById("startMenu");
    if (!mainMenu) {
        generateMainMenu();
    }

    let curMenu = "mainMenu"
}

function displayLocalMenu() {
    generateLocalMenu();
    let mainMenu = document.getElementById("startMenu");
    if (mainMenu) {
        mainMenu.remove();
    }
    let elLocalMenu = document.getElementById("localMenu");
    elLocalMenu.style.display = "";
    curMenu = "localMenu";
}

function displayLocalGame() {
    let elBoard = document.getElementById("gameSpace");
    if (!elBoard) {
        generateGameSpace();
    }

    let elLocalMenu = document.getElementById("localMenu");
    elLocalMenu.style.display = "none";
    curMenu = "Game";
    resetGameVars();
    resetBoard();
    drawBoard();
    initOutputs();
    writeOut("Local Game", 1);
}

function showPromotionModal(color, squareId, moveNote) {
    const board = document.getElementById('boardSpace');
    board.style.position = 'relative';

    const overlay = document.createElement('div');
    overlay.id = 'promoOverlay';
    overlay.style.cssText = 'position:absolute; inset:0; background:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:200;';

    const content = document.createElement('div');
    content.style.cssText = 'background:#fff; padding:20px; border-radius:8px; text-align:center; color:#000;';
    content.innerHTML = '<h3 style="margin:0 0 10px 0;">Promote Pawn</h3>';

    const options = [
        { piece: 'Queen',  icon: color === 'White' ? '♕' : '♛' },
        { piece: 'Rook',   icon: color === 'White' ? '♖' : '♜' },
        { piece: 'Bishop', icon: color === 'White' ? '♗' : '♝' },
        { piece: 'Knight', icon: color === 'White' ? '♘' : '♞' }
    ];

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt.icon;
        btn.style.cssText = 'font-size:2.5rem; margin:5px; padding:5px 12px; cursor:pointer;';

        btn.onclick = function() {
            // 1. Clean up modal
            document.getElementById('promoOverlay')?.remove();

            // 2. Update board state & UI
            boardState[squareId].piece = opt.piece;
            document.getElementById(squareId).textContent = getPieceText(squareId);

            // 3. Build promotion notation (e.g. "=Q")
            let symbol = (opt.piece === "Knight") ? "N" : opt.piece.charAt(0);
            moveNote += "=" + symbol;

            // 4. Run the exact same end-of-turn steps inline
            moveNote = checkCheck(moveNote);
            addMoveToList(moveNote);
            clearSelection();
            swapTurns();

            // 5. Unpause board clicks
            promoPause = false;
        };

        content.appendChild(btn);
    });

    overlay.appendChild(content);
    board.appendChild(overlay);
}

function generateGameSpace() {
    const mainContent = document.getElementById("mainContent");

    const gameSpace = document.createElement("div");
    gameSpace.className = "gameSpace";
    gameSpace.id = "gameSpace";

    const boardSpace = document.createElement("div");
    boardSpace.className = "boardSpace";
    boardSpace.id = "boardSpace";

    const boardBar = document.createElement("div");
    boardBar.className = "boardBar";

    const evalBar = document.createElement("div");
    evalBar.className = "evalBar";

    const evalTop = document.createElement("div");
    evalTop.className = "evalTop";

    const evalBot = document.createElement("div");
    evalBot.className = "evalBot";

    evalBar.append(evalTop, evalBot);

    const board = document.createElement("div");
    board.className = "Board";

    const files = "abcdefgh";
    const whitePieces = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];
    const blackPieces = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];

    for (let rank = 8; rank >= 1; rank--) {
        const boardRow = document.createElement("div");
        boardRow.className = "boardRow";

        for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
            const file = files[fileIndex];

            const square = document.createElement("div");
            square.id = `${file}${rank}Square`;
            square.className = `boardSquare ${
                (rank + fileIndex) % 2 === 0 ? "lightSquare" : "darkSquare"
            }`;

            if (rank === 8) {
                square.textContent = blackPieces[fileIndex];
            } else if (rank === 7) {
                square.textContent = "♟";
            } else if (rank === 2) {
                square.textContent = "♙";
            } else if (rank === 1) {
                square.textContent = whitePieces[fileIndex];
            }

            boardRow.appendChild(square);
        }

        board.appendChild(boardRow);
    }

    boardBar.append(evalBar, board);
    boardSpace.appendChild(boardBar);

    const moveBarContainer = document.createElement("div");
    moveBarContainer.className = "moveBarContainer";

    const moveBarHeader = document.createElement("div");
    moveBarHeader.className = "moveBarHeader";
    moveBarHeader.textContent = "TURNS";

    const moveBar = document.createElement("div");
    moveBar.className = "moveBar";
    moveBar.id = "moveBar";

    moveBarContainer.append(moveBarHeader, moveBar);
    
    gameSpace.append(boardSpace, moveBarContainer);
    mainContent.appendChild(gameSpace);

    const squares = document.querySelectorAll(".boardSquare");
    squares.forEach(square => {
        square.addEventListener("click", () => {
            const squareId = square.id;
            handleSquareClick(squareId);
        });
    });

}

function generateMainMenu() {
    const mainContent = document.getElementById("mainContent");
    const mainMenu = document.createElement("div");
    mainMenu.className = "UIContainer mainMenu";
    mainMenu.id = "startMenu";

    const menuLabel = document.createElement("div");
    menuLabel.className = "menuLabel";
    menuLabel.textContent = "CHESS";

    const localButton = document.createElement("button");
    localButton.className = "menuButton localButton";
    localButton.type = "button";
    localButton.id = "localButton";
    localButton.textContent = "Local Game";

    const createRoomButton = document.createElement("button");
    createRoomButton.className = "menuButton createRoomButton";
    createRoomButton.type = "button";
    createRoomButton.textContent = "Create Room";

    const joinRoomButton = document.createElement("button");
    joinRoomButton.className = "menuButton joinRoomButton";
    joinRoomButton.type = "button";
    joinRoomButton.id = "localBackButton";
    joinRoomButton.textContent = "Join Room";

    localButton.addEventListener("click", displayLocalMenu);
    
    mainMenu.append(menuLabel, localButton, createRoomButton, joinRoomButton);

    mainContent.appendChild(mainMenu);
}

function generateLocalMenu() {
    const mainContent = document.getElementById("mainContent");
    const localMenu = document.createElement("div");
    localMenu.className = "UIContainer localMenu";
    localMenu.id = "localMenu";

    const vsHumanButton = document.createElement("button");
    vsHumanButton.className = "menuButton vsHumanButton";
    vsHumanButton.type = "button";
    vsHumanButton.id = "vsHumanButton";
    vsHumanButton.textContent = "VS Human";

    const vsComputerButton = document.createElement("button");
    vsComputerButton.className = "menuButton vsComputerButton";
    vsComputerButton.type = "button";
    vsComputerButton.textContent = "VS Computer";

    const backButton = document.createElement("button");
    backButton.className = "menuButton backButton";
    backButton.type = "button";
    backButton.id = "localBackButton";
    backButton.textContent = "Go Back";

    vsHumanButton.addEventListener("click", displayLocalGame);
    backButton.addEventListener("click", displayMainMenu);
    
    localMenu.append(vsHumanButton, vsComputerButton, backButton);

    mainContent.appendChild(localMenu);
}

/*
FULLY FUNCTIONAL CHESS ACHIEVED!!!!!
GOALS:
 WORKING CHESS                      [X]
 RESET GAME                         [O]
 OFFER DRAW BUTTON                  [O]
 MAKE EVAL BAR DO SOMETHING         [O]
 TURN TIMERS                        [O]
 FULLY ACCURATE NOTATION            [O]
 OPTIONS                            [O]
 ONLINE                             [O]
*/
