class AI {

    constructor() {

    }
}

class Move {

    constructor(i, p, s) {
        this.index = i;
        this.piece = p;
        this.score = s;
    }

}

class Piece {

    constructor(element) {
        this.root = element;
    }

}

class Board {


    constructor(p, c, isTest, diff) {

        if (p == null || c == null || p == undefined || c == undefined) {
            console.log("no player chosen");
        }



        this.player = p;

        this.computer = c;

        let choices = Array.from(document.getElementById("difficulty").children);

        let difficulty;

        this.DIFFICULTY = diff;

        
        

        
        

        
        
        
        

        


        this.root = document.getElementById("game");

        this.items = [];
        
        this.spots;

        this.createItems();

        /*
        Runs a test
        */
        if (isTest == true) {

            this.player = "x";
            this.computer = "o";

            let moveCount = 0;
            for (let i = 0; i < 10; i++) {
                let AI_move = this.minimax(this.items, 0, false);
                this.items[AI_move.index].innerHTML = "x";
                let AI_move_2 = this.bestMove();
                if (moveCount != 4) {
                    this.items[AI_move_2.index].innerHTML = "o";
                }
                moveCount++;

                if (this.checkWin(this.items) != 0) {
                    console.log("win or loss");
                    this.clearBoard(this.items);
                    moveCount = 0;
                }
                if (this.availableSpots().length == 0) {
                    this.clearBoard(this.items);
                    moveCount = 0;
                    console.log("tie");
                }
            }
        }


        
    }

    


    /**
     * 
     * clears the board (used during the test only)
     */
    clearBoard(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].innerHTML = "";
        }
    }

    

    

    
    
    availableSpots() {

        let avail = [];
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].innerHTML == "") {
                avail.push(i);
            }
        }
        return avail;
    }

    createItems() {

        let p;

        for (let i = 0; i < 9; i++) {

            p = document.createElement("div");

            p.style.backgroundColor = "tan";
            p.style.border = "solid black 1px";
            this.items[i] = p;

            p.classList.add("piece");

            var clickFunction = (e) => {
                
                if (e.target.innerHTML == "") {
                    this.move(e);
                }
                
   

            }

            p.addEventListener('click', clickFunction);

            

            this.root.appendChild(p);
        }

        
    }

    

    move(e) {

        let mooo;

        
        e.target.innerHTML = this.player;
        this.spots = this.availableSpots();
        if (this.DIFFICULTY == "easy") {
            // next move
            this.items[this.spots[0]].innerHTML = this.computer;
        }
        else if (this.DIFFICULTY == "medium") {
            let random = Math.floor(Math.random() * this.availableSpots().length);

            this.items[this.availableSpots()[random]].innerHTML = this.computer;
            // random move
        }
        else if (this.DIFFICULTY == "hard") {
            // unbeatable move
            let AI_move = this.bestMove();
            mooo = AI_move;
            this.items[mooo.index].innerHTML = this.computer;
        }
        else {
            let AI_move = this.bestMove();
            mooo = AI_move;
            this.items[mooo.index].innerHTML = this.computer;
        }

        let w = this.checkWin(this.items);

        if (w == 1) {
            this.root.innerHTML = "Winner"
        }
        else if (w == -1) {
            this.root.innerHTML = "Loser"
        }
    }

    bestMove() {

        let index;

        let bestIndex;

        let available = this.availableSpots();

        let bestScore = -Infinity;

        let moves = [];

        let move = new Move();

        

        
        for (let i = 0; i < available.length; i++) {
            index = available[i];
            this.items[index].innerHTML = this.computer;

            let score = this.minimax(this.items, 0, false);
            score.index = index;
            moves.push(score);
            this.items[index].innerHTML = "";

            if (bestScore < score.score) {
                bestScore = score.score;
                move = score;
                bestIndex = index;
            }
            
        }

        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                move = moves[i];
            }
        }



        return move;

    }

    /**
     * 
     * returns a move with a score, based on the given board state
     * This algorithm checks every possible move that could be made, and 
     * decides based on the end states of the board what score the move would have
     * 
     * @param {Array} board board object that stores the current state of the game
     * @param {Number} depth how many moves into / how many function calls have been made using this function
     * @param {boolean} isMaximizing is the player that is using this turn the "maximizing player", or the AI player
     * @returns Move
     */
    minimax(board, depth, isMaximizing) {

        let av = this.availableSpots();

        let move;

        /**
         * checks terminal / end states
         */
        if (this.checkWin(board) == 1) {

            move = new Move();
            move.score = -10;
            return move;
        }
        else if (this.checkWin(board) == -1) {
            move = new Move();
            move.score = 10;
            return move;

        }
        else if (av.length == 0) {
            move = new Move();
            move.score = 0;
            return move;
        }

        // if maximixing, loop through all possible moves
        if (isMaximizing) {
            let bestScore = -Infinity;

            let choices = [];
            
            for (let i = 0; i < board.length; i++) {

                move = new Move();

                if (board[i].innerHTML == "") {

                    
                    board[i].innerHTML = this.computer;
                    

                    let refMove = this.minimax(board, depth+1, false);

                    if (Math.max(bestScore, refMove.score) === refMove.score) {
                        move = refMove;
                        bestScore = refMove.score;
                        move.score = bestScore;
                    };

                    choices.push(move);
                    
                    
                    

                    

                    //refMove.score = move.score;
                    // move.index = i;
                    board[i].innerHTML = "";
                }
            }

            move = choices[0];
            for (let i = 0; i < choices.length; i++) {
                if (choices[i].score > move.score) {
                    move = choices[i];
                }
            }

            if (move.score == undefined) {
                console.log("undefined score")
            }

            return move;
        } // else, the player's hypothetical move is returned, where it tries to maximze the best move for the player
        else {
            let bestScore = Infinity;

            let choices = [];
            

            for (let i = 0; i < board.length; i++) {

                if (board[i].innerHTML == "") {

                    

                    

                    board[i].innerHTML = this.player;
                    

                    let refMove = this.minimax(board, depth+1, true);
                    if (Math.min(bestScore, refMove.score) === refMove.score) {
                        move = refMove;
                        move.index = i;
                        bestScore = refMove.score;
                        move.score = bestScore;
                    };

                    choices.push(move);

                    

                    //move.index = i;
                    board[i].innerHTML = "";

                    
                    
                }
            }

            move = choices[0];
            for (let i = 0; i < choices.length; i++) {
                if (choices[i].score < move.score) {
                    move = choices[i];
                }
            }
            if (move.score == undefined) {
                console.log("undefined score")
            }
            return move;
        }




    }


    


    checkWin(items) {
        let winCombosDownDiagonal = [0, 4, 8];
        let winCombosUpDiagonal = [6, 4, 2];

        let countWin = 0;
        let countLose = 0;

        // check diagonals

        for (let i = 0; i < winCombosDownDiagonal.length; i++) {
            if (items[winCombosDownDiagonal[i]].innerHTML == this.player) {
                countWin++;
            }
            else if (items[winCombosDownDiagonal[i]].innerHTML == this.computer) {
                countLose++;
            }

            if (countWin == 3) {
                return 1;
            }
            else if (countLose == 3) {
                return -1
            }
        }

        countWin = 0;
        countLose = 0;

        for (let i = 0; i < winCombosUpDiagonal.length; i++) {
            if (items[winCombosUpDiagonal[i]].innerHTML == this.player) {
                countWin++;
            }
            else if (items[winCombosUpDiagonal[i]].innerHTML == this.computer) {
                countLose++;
            }

            if (countWin == 3) {
                return 1;
            }
            else if (countLose == 3) {
                return -1
            }
        }

        countWin = 0;
        countLose = 0;


        // check rows

        for (let i = 0; i < items.length; i++) {
            if (items[i].innerHTML == this.player) {
                countWin++;
            }
            else if (items[i].innerHTML == this.computer) {
                countLose++
            }

            if (countWin == 3) {
                return 1;
            }
            else if (countLose == 3) {
                return -1;
            }

            if (i == 2 || i == 5 || i == 8) {
                countWin = 0;
                countLose = 0;
            }
        }

        // check columns

        for (let i = 0; i < 3; i++) {
        
            if (items[0 + i].innerHTML == this.player && 
                items[3 + i].innerHTML == this.player &&
                items[6 + i].innerHTML == this.player) {

                    return 1;

            } else if (items[0 + i].innerHTML == this.computer &&
                items[3 + i].innerHTML == this.computer &&
                items[6 + i].innerHTML == this.computer) {
                    return -1;
            }
        }

        return 0;


    }
}

var Brd;

var player;
var computer;


START_BUTTON = document.getElementById("start-button");
X_BUTTON = document.getElementById("x-character");
O_BUTTON = document.getElementById("o-character");

let difficulty = null;

function difficulty_listener(e) {
    difficulty = e.target.innerHTML.toLowerCase();
}

document.getElementById("easy").addEventListener("click", difficulty_listener);
document.getElementById("medium").addEventListener("click", difficulty_listener);
document.getElementById("hard").addEventListener("click", difficulty_listener);
document.getElementById("test").addEventListener("click", difficulty_listener);





X_BUTTON.addEventListener("click", () => {
    player = 'x';
    computer = "o";
});

O_BUTTON.addEventListener("click", () => {
    player = 'o';
    computer = "x";
});

document.getElementById("test").addEventListener("click", () => {

    Brd = new Board("x", "o", true, difficulty);
});

START_BUTTON.addEventListener("click", () => {
    Brd = new Board(player, computer, false, difficulty);
});



document.getElementById("restart").addEventListener('click', () => {
    Brd.root.innerHTML = "";
    Brd =  null;
    

});