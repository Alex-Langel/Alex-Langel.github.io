import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, update, child, onDisconnect, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBpPZE4ZRSoJaV4exVkVXTFo24ur4Vom-g",
  authDomain: "tictactoe-e0d22.firebaseapp.com",
  projectId: "tictactoe-e0d22",
  storageBucket: "tictactoe-e0d22.firebasestorage.app",
  messagingSenderId: "1059476011262",
  appId: "1:1059476011262:web:9f4917587d3223c7834daf",
  measurementId: "G-YXJTVB4921"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
//const analytics = getAnalytics(app);
let joinCode = null;
let pid = null;
let stopWatchingRoom = null;

async function startGame() {
    //CREATE ROOM IN DB

    pid = 1;
    const dbRef = ref(db);
    let codeExists = true;
    let newCode = null;
    let stopWatchingRoom = null;

    // Keep generating a code until we find one that doesn't exist in Firebase
	//TODO: Add prevention for infinite looping
    while (codeExists) {
        newCode = Math.floor(1000 + Math.random() * 9000).toString();
        const snapshot = await get(child(dbRef, `games/${newCode}`));
        // If snapshot doesn't exist, the code is unique and safe to use!
        if (!snapshot.exists()) {
            codeExists = false;
        }
    }

	joinCode = newCode;
    output("Player 1");
	output2("Room Code: " + joinCode);
    navigator.clipboard.writeText(joinCode);
    try {
        // Save the game room to Firebase Realtime Database
        await set(ref(db, 'games/' + joinCode), {
            status: "Waiting for P2 to join.",
            playerCount: 1
        });
        const playerCountRef = ref(db, `games/${joinCode}/playerCount`);
        onDisconnect(playerCountRef).set(increment(-1));
        watchRoom(joinCode);
        console.log("Game created with code:", joinCode);

		//document.getElementById('createContainer').style.display = 'none';
        //document.getElementById('joinContainer').style.display = 'none';
		document.getElementById("CreateJoinCont").style.display = "none";
        document.getElementById("WaitForOpp").style.display = "";
        document.getElementById('disconnectBtn').disabled = false;
    } catch (error) {
        console.error("Error creating game: ", error);
    }
}

async function joinGame() {
    //JOIN A ROOM WITH SPECIFIED JOINCODE

    const codeInput = document.getElementById('joinTxt').value.trim();
    joinCode = codeInput.replace("Code: ", "");

    if (!joinCode || joinCode === "Enter Code" || joinCode === "") {
        errorOut("Invalid Game Code")
        document.getElementById('joinTxt').value ="";
        joinCode = null;
        return;
    }

    try {
        const snapshot = await get(ref(db, `games/${joinCode}`));

        if (!snapshot.exists()) {
            errorOut("Game Code Not Found");
            document.getElementById('joinTxt').value ="";
            joinCode = null;
            return;
        }

        const DBData = snapshot.val();
        const roomRef = ref(db, `games/${joinCode}`);
        if (DBData.playerCount < 1) {
            errorOut("Room is Full");
            document.getElementById('joinTxt').value ="";
            await remove(roomRef);
            joinCode = null;
            return;
        } else if (DBData.playerCount > 1) {
            errorOut("Room is Full");
            document.getElementById('joinTxt').value ="";
            joinCode = null;
            return;
        } else if (DBData.playerCount === 1) {
            if (DBData.status == "Waiting for P2 to join.") {
            await update(ref(db, "games/" + joinCode), {
                status: "Connection Established.",
                playerCount: increment(1)
            });
            pid = 2;
            const playerCountRef = ref(db, `games/${joinCode}/playerCount`);
            onDisconnect(playerCountRef).set(increment(-1));
            watchRoom(joinCode);
            output("Player 2");
            output2("Room Code: " + joinCode);
            document.getElementById("CreateJoinCont").style.display = "none";
            document.getElementById("RPSSelect").style.display="";
            document.getElementById('disconnectBtn').disabled = false;
            } else {
                errorOut("Room is not accepting new players.");
                document.getElementById('joinTxt').value ="";
                joinCode = null;
                return;
            }
        } else {
            errorOut("ERROR: UNDEFINED PLAYER COUNT");
            document.getElementById('joinTxt').value ="";
            joinCode = null;
            return;
        }
    } catch (error) {
        console.error("Error joining game: ", error);
    }
}
 
async function watchRoom(code) {
    
    if (stopWatchingRoom) {
        stopWatchingRoom();
    }
    
    const roomRef = ref(db, `games/${code}`);
    //const playersRef = ref(db, `games/${code}/playerCount`);
    //const statusRef = ref(db, `games/${code}/status`);


    stopWatchingRoom = onValue(roomRef, (snapshot) => {

        if (!snapshot.exists()) {
            console.log("Room no longer exists");
            return;
        }
        const room = snapshot.val();

        //SWAP STATUS TO GAMING WHEN 2 PLAYERS IN ROOM
        if (room.status == "Connection Established.") {
            if (room.playerCount == 2) {
                document.getElementById('WaitForOpp').style.display = "none";
                document.getElementById('RPSSelect').style.display="";
                set(ref(db, `games/${code}/status`), "Gaming!");
            } else {
                errorOut("PLAYER COUNT IS " + room.playerCount);
            }
        }
        //AFTER PLAYERS HAVE CONNECTED
        if (room.status !== "Waiting for P2 to join." && room.status !=="Connection Established." && room.status !=="Game Over.") {
            //IF LESS THAN 2 PLAYERS
            if (room.playerCount < 2) {
                //SHOW OPPONENT HAS DISCONNECTED
                document.getElementById('CreateJoinCont').style.display = "none";
                document.getElementById('WaitForOpp').style.display = "none";
                document.getElementById('RPSSelect').style.display="none";
                document.getElementById('OpponentLeft').style.display = "";
                set(ref(db, `games/${code}/status`), "Game Over.");
            } else { //BOTH PLAYERS CURRENTLY CONNECTED
                const myMove = room[`p${pid}`];
                const opponentPid = pid === 1 ? 2 : 1;
                const opponentMove = room[`p${opponentPid}`];

                const moveButtons = document.getElementById("selMove");
                const myLabel = document.getElementById("moveWaiting");
                const oppMoveLabel = document.getElementById("oppMove");
                const scoreBoard = document.getElementById("scoreBoard");

                // Neither player has chosen
                if (!myMove && !opponentMove) {
                    //Everything should already be good
                }

                // I chose, opponent hasn't
                else if (myMove && !opponentMove) {
                    moveButtons.style.display = "none";
                    myLabel.style.display = "block";
                    oppMoveLabel.textContent = "Waiting for opponent...";
                    scoreBoard.textContent = "You chose: " + myMove;
                }

                // Opponent chose, I haven't
                else if (!myMove && opponentMove) {
                    moveButtons.style.display = "";
                    oppMoveLabel.textContent = "Opponent has chosen!";
                    scoreBoard.textContent = "Choose your move!";
                }

                // Both players chose
                else {
                    moveButtons.style.display = "none";

                    oppMoveLabel.textContent = `You chose ${myMove} | Opponent chose ${opponentMove}`;

                    let result;

                    if (myMove === opponentMove) {
                        result = "It's a tie!";
                    } else if ((myMove === "Rock" && opponentMove === "Scissors") || (myMove === "Paper" && opponentMove === "Rock") || (myMove === "Scissors" && opponentMove === "Paper")) {
                        result = "You win!";
                    } else {
                        result = "You lose!";
                    }
                }
            }
        }

        if (room.playerCount < 2) {
            console.log("Only 1 person in room. Setting room to delete on disconnect.");
            onDisconnect(roomRef).remove();
            //set(ref(db, `games/${code}/status`), "Ending");
        } else if (room.Playercount >= 2) {
            console.log("Multiple people in room. Canceling delete-on-disconnect.");
            onDisconnect(roomRef).cancel();
            onDisconnect(playersRef).set(increment(-1));
        }
    });    
}

// async function watchRoom(code) {
//     const roomRef = ref(db, `games/${code}`);
//     const playersRef = ref(db, `games/${code}/playerCount`);
//     const statusRef = ref(db, `games/${code}/status`);


//     onValue(playersRef, async (snapshot) => {
//         if (!snapshot.exists()) return;
//         const count = snapshot.val();
//         const status = (await get(statusRef)).val();
//         //const status = statusSnap.val();

//         if (count > 1 && status == "Waiting for P2 to join.") {
//             document.getElementById('WaitForOpp').style.display = 'none';
//             document.getElementById('RPSSelect').style.display='';
//             set(ref(db, `games/${code}/status`), "Gaming!");
//         }
//         if (count < 2) {
//             console.log("Only 1 person in room. Setting room to delete on disconnect.");
//             onDisconnect(roomRef).remove();
//             set(ref(db, `games/${code}/status`), "Waiting");
//         } else if (count >= 2) {
//             console.log("Multiple people in room. Canceling delete-on-disconnect.");
//             onDisconnect(roomRef).cancel();
//             onDisconnect(playersRef).set(increment(-1));
//         }
//     });
// }

async function pickMove(move) {
    //UPLOAD CHOSEN MOVE FROM CHOOSING PLAYER TO DB

    await update(ref(db, `games/${joinCode}`), {
        [`p${pid}`]: move
    });
    //hide move choosing element.
}

async function output(txt) {
    //WRITE TO OUTPUT LABEL

	const out = document.getElementById('OutputLab');
	out.textContent=txt;
}

async function output2(txt) {
    //WRITE TO OUTPUT2 LABEL

	const out = document.getElementById('OutputLab2');
	out.textContent=txt;
}

async function errorOut(txt) {
    //WRITE TO ERROR LABEL

	const out = document.getElementById('ErrorLab');
	out.textContent=txt;
}

async function pasteJoin() {
    //PASTE JOIN CODE INTO JOIN CODE TEXT BOX

    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('joinTxt').value = text;
    } catch (err) {
        console.error('Failed to read clipboard:', err);
    }
}

async function disconnect() {
    //MANUALLY DISCONNECT FROM ROOM

    //Set database variables
    const gamesRef = ref(db, 'games');
    const roomRef = ref(db, `games/${joinCode}`);
    const playersRef = ref(db, `games/${joinCode}/playerCount`);
    const pidRef = ref(db, `games/${joinCode}/p${pid}`);
    const statusRef = ref(db, `games/${joinCode}/status`);
    const playerCount = (await get(playersRef)).val();
    //Check if last player
    if (playerCount < 2) {                     
        await remove(roomRef);                 
    } else {                                    
        //Reset game variables       
        await set(playersRef, increment(-1));   
        await remove(pidRef);
    }
    //Reset player variables
    joinCode = null;
    pid = null;
    //Reset html
    document.getElementById('CreateJoinCont').style.display = "";
    document.getElementById('WaitForOpp').style.display = "none";
    document.getElementById('OpponentLeft').style.display = "none";
    document.getElementById('RPSSelect').style.display="none";
    document.getElementById('disconnectBtn').disabled = true;
    document.getElementById('joinTxt').value = "";
    output("Ouput");
    output2("Ouput2");
}

//Button clicks
document.getElementById('createBtn').addEventListener('click', startGame);
document.getElementById('joinBtn').addEventListener('click', joinGame);
document.getElementById('pasteJoinCodeBtn').addEventListener('click', pasteJoin);
document.getElementById('disconnectBtn').addEventListener('click', disconnect);
document.getElementById('rockButton').addEventListener('click', () => pickMove("Rock"));
document.getElementById('paperButton').addEventListener('click', () => pickMove("Paper"));
document.getElementById('scissorsButton').addEventListener('click', () => pickMove("Scissors"));

//Keypresses
//
(document.getElementById("joinTxt")).addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        joinGame();
    }
});
