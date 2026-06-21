// ====================================
// Tic Tac Toe Game Logic
// ====================================

const cells = document.querySelectorAll(".cell");

const turnText = document.getElementById("turn");
const message = document.getElementById("message");

const restartBtn = document.getElementById("restartBtn");
const newGameBtn = document.getElementById("newGameBtn");
const homeBtn = document.getElementById("homeBtn");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const drawScore = document.getElementById("drawScore");

const playerDisplay = document.getElementById("playerDisplay");

// -----------------------------

let board = ["","","","","","","","",""];

let currentPlayer = "X";

let gameRunning = true;

// Read Settings

const playerName =
localStorage.getItem("playerName") || "Player";

const gameMode =
localStorage.getItem("gameMode") || "pvp";

const difficulty =
localStorage.getItem("difficulty") || "Easy";

playerDisplay.innerHTML =
`Welcome <b>${playerName}</b>`;

// -----------------------------

scoreX.innerHTML =
localStorage.getItem("scoreX") || 0;

scoreO.innerHTML =
localStorage.getItem("scoreO") || 0;

drawScore.innerHTML =
localStorage.getItem("draw") || 0;

// Winning Positions

const winPatterns = [

[0,1,2],
[3,4,5],
[6,7,8],

[0,3,6],
[1,4,7],
[2,5,8],

[0,4,8],
[2,4,6]

];









// ====================================
// Cell Click
// ====================================

cells.forEach(cell=>{

cell.addEventListener("click",handleClick);

});

function handleClick(){

const index =
this.dataset.index;

if(board[index]!=="" || !gameRunning)
return;

board[index]=currentPlayer;

this.innerHTML=currentPlayer;

this.disabled=true;

checkWinner();

if (
    gameMode === "ai" &&
    currentPlayer === "O" &&
    gameRunning
) {

    setTimeout(() => {

        computerMove();

    }, 500);

}

}






// ====================================
// Winner
// ====================================

function checkWinner(){

let won=false;

for(let pattern of winPatterns){

const a=pattern[0];
const b=pattern[1];
const c=pattern[2];

if(
board[a] &&
board[a]===board[b] &&
board[a]===board[c]
){

won=true;

cells[a].classList.add("win");
cells[b].classList.add("win");
cells[c].classList.add("win");

break;

}

}

if(won){

gameRunning=false;

message.innerHTML=
currentPlayer+" Wins!";

updateScore();

return;

}

if(!board.includes("")){

gameRunning=false;

message.innerHTML="Draw";

let draw=
parseInt(localStorage.getItem("draw"));

draw++;

localStorage.setItem("draw",draw);

drawScore.innerHTML=draw;

return;

}

switchPlayer();


}




// ====================================
// Switch Turn
// ====================================

function switchPlayer(){

currentPlayer=
currentPlayer==="X" ? "O":"X";

turnText.innerHTML=
"Turn : "+currentPlayer;

}





// ====================================
// Update Score
// ====================================

function updateScore(){

if(currentPlayer==="X"){

let x=
parseInt(localStorage.getItem("scoreX"));

x++;

localStorage.setItem("scoreX",x);

scoreX.innerHTML=x;

}

else{

let o=
parseInt(localStorage.getItem("scoreO"));

o++;

localStorage.setItem("scoreO",o);

scoreO.innerHTML=o;

}

}










// ====================================
// Restart
// ====================================

restartBtn.onclick=()=>{

board=["","","","","","","","",""];

currentPlayer="X";

gameRunning=true;

turnText.innerHTML="Turn : X";

message.innerHTML="";

cells.forEach(cell=>{

cell.innerHTML="";

cell.disabled=false;

cell.classList.remove("win");


});

};







// ====================================
// New Game
// ====================================

newGameBtn.onclick=()=>{

localStorage.setItem("scoreX",0);
localStorage.setItem("scoreO",0);
localStorage.setItem("draw",0);

location.reload();

};





// ====================================
// Home
// ====================================

homeBtn.onclick=()=>{

window.location.href="index.html";

};







