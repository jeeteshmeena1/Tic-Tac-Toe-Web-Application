// ======================================
// AI for Tic Tac Toe
// Easy | Medium | Hard
// ======================================

// Computer makes a move
function computerMove() {

    if (!gameRunning) return;

    let move;

    switch (difficulty.toLowerCase()) {

        case "easy":
            move = randomMove();
            break;

        case "medium":
            if (Math.random() < 0.7) {
                move = bestMove();
            } else {
                move = randomMove();
            }
            break;

        case "hard":
            move = bestMove();
            break;

        default:
            move = randomMove();
    }

    if (move !== -1) {

        board[move] = "O";

        cells[move].innerHTML = "O";

        cells[move].disabled = true;

        checkWinner();

    }

}

// ----------------------------
// Random Move (Easy)
// ----------------------------

function randomMove() {

    let empty = [];

    board.forEach((cell, index) => {

        if (cell === "") {

            empty.push(index);

        }

    });

    if (empty.length === 0) return -1;

    return empty[Math.floor(Math.random() * empty.length)];

}

// ----------------------------
// Best Move (Minimax)
// ----------------------------

function bestMove() {

    let bestScore = -Infinity;

    let move = -1;

    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            board[i] = "O";

            let score = minimax(board, 0, false);

            board[i] = "";

            if (score > bestScore) {

                bestScore = score;

                move = i;

            }

        }

    }

    return move;

}

// ----------------------------
// Minimax Algorithm
// ----------------------------

function minimax(boardState, depth, isMaximizing) {

    let result = evaluate(boardState);

    if (result !== null) {

        return result;

    }

    if (isMaximizing) {

        let best = -Infinity;

        for (let i = 0; i < 9; i++) {

            if (boardState[i] === "") {

                boardState[i] = "O";

                let score = minimax(boardState, depth + 1, false);

                boardState[i] = "";

                best = Math.max(best, score);

            }

        }

        return best;

    } else {

        let best = Infinity;

        for (let i = 0; i < 9; i++) {

            if (boardState[i] === "") {

                boardState[i] = "X";

                let score = minimax(boardState, depth + 1, true);

                boardState[i] = "";

                best = Math.min(best, score);

            }

        }

        return best;

    }

}

// ----------------------------
// Evaluate Board
// ----------------------------

function evaluate(b) {

    const wins = [

        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]

    ];

    for (let pattern of wins) {

        let [a,b1,c] = pattern;

        if (

            b[a] &&
            b[a] === b[b1] &&
            b[a] === b[c]

        ) {

            if (b[a] === "O") return 10;

            if (b[a] === "X") return -10;

        }

    }

    if (!b.includes("")) return 0;

    return null;

}
