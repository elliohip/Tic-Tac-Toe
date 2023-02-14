let player = (data) => {
    return {
    playerChar: data,
    setPlayer(d) {
        this.playerChar = d
    },

    
    move(e) {
        e.target.innerHTML = this.playerChar;

        
    },

    
    computerMove(board) {

        let rows = board.rows();
        let columns = board.columns();
    }
    }
}

/**
 * move that stores a number that will be evaluated modularly to find optimal 
 * moves in minimax algorithm.  Will be stored as a tree and recursively traversed to find
 * optimal move
 */
class Move {

    constructor(idex ,e) {
        this.move = idex;

        this.element = e;

        this.index;

        this.score = undefined;
    };

    setMove(m) {
        this.move = m;
    }
}

class BoardPiece {

    constructor(id) {
        this.root = document.createElement("div");

        this.root.className = "piece";

        this.root.id = id;

        this.changed = false;
        

        

    }

    setData(d) {
        this.root.innerHTML = d;

        
    }

    
}

class GameController {


    /**
     * 
     * @param {function} player player factory function
     * @param {function} computer computer factory function
     */
    constructor(player, computer) {
        this.player = player;
        this.computer = computer;
        
    }

    /**
     * 
     * @param {GameBoard} board 
     * @returns int for the best spot to move on the board for the computer
     */
    bestSpot(board) {

        return minimax(board, this.computer);
    }

    /**
     * 
     *
     * @param {GameBoard} board board array of items
     * @param {String} computer char for computer piece
     */
    move(board, computer) {
        // this.player.move(e.target);

        let random = Math.floor(Math.random() * 8);
        let randPiece = board[random];

        let availSpace = 0;

        let empty = [];

        for (let i = 0; i < board.length; i++) {
            if (board[i].root.innerHTML == "") {
                availSpace++;

                empty.push(i);

            }
        }
        

        if (availSpace > 1) {
            while (randPiece.root.innerHTML != "") {

                random = Math.floor(Math.random() * 8);
                randPiece = board[random];

                if (randPiece.root.innerHTML == "") {
                    randPiece.root.innerHTML = computer;
                    break;
                }

            }
        }



        minimax(board,computer, this);

        if (randPiece.root.innerHTML == "") {
            randPiece.root.innerHTML = computer;
        }

        this.checkWin(board);

        if (this.checkWin(board) == 1) {
            

            let box = new TextBox("You Win");
            document.getElementById("game").innerHTML = "";
            box.appendRoot("game");
        }
        else if (this.checkWin(board) == -1) {
            let box = new TextBox("You Lose");
            document.getElementById("game").innerHTML = "";
            box.appendRoot("game");
        }
        
        

        //randPiece.innerHTML = computer;

        
    }

    checkWin(board) {
        this.checkColumn(board);
        this.checkRow(board);
        this.checkDiagonal(board);

        if (this.checkColumn(board) == "You Win") {
            return 1;
        }
        if (this.checkRow(board) == "You Win") {
            return 1;
        }
        if (this.checkDiagonal(board) == "You Win") {
            return 1;
        }
        if (this.checkColumn(board) == "You Lose") {
            return -1;
        }
        if (this.checkRow(board) == "You Lose") {
            return -1;
        }
        if (this.checkDiagonal(board) == "You Lose") {
            return -1;
        }

        return 0;
    }

    checkRow(board) {

        let count = 0;
        let piece = board[0];

        let rows = [[],[],[]];

        let r = 0;
        for(let i = 0; i < board.length; i++) {

            
            
            if (i < 3) {
                rows[0][r] = board[i];

                r++;
                
            }
            else if (i < 6) {
                rows[1][r] = board[i];

                r++;

                
            }
            else if (i < 9) {
                rows[2][r] = board[i];

                r++;

                
            }
            if (r == 3) {
                r = 0;
            }


        }

        let playerCount = 0;
        let computerCount = 0;

        let p;
        for (let i = 0; i < rows.length; i++) {
            for(let j = 0; j < rows[i].length; j++) {

                if (playerCount != 3 && computerCount != 3) {
                    p = rows[i][j]
                    if (p.root.innerHTML == this.player.playerChar) {
                        playerCount++;
                    }
                    if (p.root.innerHTML == this.computer.playerChar) {
                        computerCount++;
                    }
                }
            }
            if (computerCount == 3) {
            console.log("you lose");
            return "You Lose";
            }
            else if (playerCount == 3) {
                console.log("you win");
                return "You Win";
            }

            playerCount = 0;
            computerCount = 0;
        }

        
    }
    
    checkColumn(board) {

        let count = 0;
        

        let columns = [[],[],[]];

        let c1 = 0;
        let c2 = 0;
        let c3 = 0;
        for(let i = 0; i < board.length; i++) {
            
            if ((i % 3) == 0) {
                columns[0][c1] = board[i];

                c1++;
                if (c1 == 3) {
                    c1 = 0;
                }
            }
            else if ((i % 3) == 1) {
                columns[1][c2] = board[i];

                c2++;

                if (c2 == 3) {
                    c2 = 0;
                }
            }
            else if ((i % 3) == 2) {
                columns[2][c3] = board[i];

                c3++;

                if (c3 == 3) {
                    c3 = 0;
                    break;
                }
            }


        }


        let playerCount = 0;
        let computerCount = 0;

        let p;
        
        for (let i = 0; i < columns.length; i++) {
            
            
            for(let j = 0; j < columns[i].length; j++) {

                if (playerCount != 3 && computerCount != 3) {
                    p = columns[i][j]
                    if (p.root.innerHTML == this.player.playerChar) {
                        playerCount++;
                    }
                    if (p.root.innerHTML == this.computer.playerChar) {
                        computerCount++;
                    }
                }
            }
            
            if (computerCount == 3) {

                document.getElementById("game-score").innerHTML = "lose";
            return "You Lose";
            }
            else if (playerCount == 3) {
                document.getElementById("game-score").innerHTML = "win"
                return "You Win";
            }
            
            computerCount = 0;
            playerCount = 0;
            
            
        }


        

        
    }

    /**
     * 
     * 
     * @param {Array} board array of board objects
     */
    checkDiagonal(board) {
        let countLeftPlayer = 0;
        let countRightPlayer = 0;

        let countLeftComputer = 0;
        let countRightComputer = 0;

        for (let i = 0; i < board.length; i++) {

            if (countRightComputer != 3 && countRightPlayer != 3) {
                if (i % 4 == 0) {

                    if (board[i].root.innerHTML == this.player.playerChar) {
                        countRightPlayer++;
                    }
                    else if (board[i].root.innerHTML == this.computer.playerChar) {
                        countRightComputer++;
                    }
                    
                }
                
            }
            else {
                break;
            }
            
            if (countLeftComputer != 3 && countLeftPlayer != 3) {

                if (i % 2 == 0 && i != 0 && i != 8) {
                    if (board[i].root.innerHTML == this.player.playerChar) {
                        countLeftPlayer++;
                    } else if (board[i].root.innerHTML == this.computer.playerChar) {
                        countLeftComputer++;
                    }
                }
                

            }
            else {
                break;
            }

        }

        

        if (countLeftPlayer == 3) {
            console.log('you win');
            return "You Win";
        } else if (countRightPlayer == 3) {
            console.log('you win');
            return "You Win";
        } else if (countLeftComputer == 3) {
            console.log('you lose');
            return "You Lose";
        } else if (countLeftComputer == 3) {
            console.log('you lose');
            return "You Lose";
        }
    }

    


}

class GameBoard {
    
    constructor(mainPlayer) {

        // this.WIN_BOARD = document.getElementById("game-score");

        this.parent = document.getElementById("game");

        this.items = [];

        this.canMakeGrid = true;


        this.player = mainPlayer;
        this.computer = player(undefined);

        if (this.player.playerChar == 'x') {
            this.computer.setPlayer('o');
        }
        else {
            this.computer.setPlayer('x');
        }

        this.controller = new GameController(this.player, this.computer);

        this.createGrid();
        this.addListeners();
        
        this.moveFunction = (e) => {this.pieceListener(e, this.player, this.computer)}

    }

    getEmptySquares() {

        let empty = [];

        for (let i = 0; i < this.items; i++) {
            if (this.items[i].root.innerHTML == "") {
                empty.push(i);
            }
        }

        return empty;
    }

    createGrid() {

        let piece;
        for (let i = 0; i < 9; i++) {

            piece = new BoardPiece("piece-" + i);
            this.items[this.items.length] = piece;
             
            if (i == 4) {
                piece.root.style.border = "1px solid black";
            }
            else if (i == 0) {
                piece.root.style.borderBottom = "1px solid black";
                
                piece.root.style.borderRight = "1px solid black";
            }
            else if (i == 2) {
                piece.root.style.borderBottom = "1px solid black";
                piece.root.style.borderLeft = "1px solid black";
                
            }
            else if (i == 1) {
                piece.root.style.borderBottom = "1px solid black";
                piece.root.style.borderLeft = "1px solid black";
                piece.root.style.borderRight = "1px solid black";
            }
            else if (i == 3) {
                piece.root.style.borderBottom = "1px solid black";
                
                piece.root.style.borderRight = "1px solid black";
            }
            else if (i == 5) {
                piece.root.style.borderBottom = "1px solid black";
                piece.root.style.borderLeft = "1px solid black";
                
            }
            else if (i == 6) {
                piece.root.style.borderTop = "1px solid black";
                
                piece.root.style.borderRight = "1px solid black";
            }
            else if (i == 8) {
                piece.root.style.borderTop = "1px solid black";
                piece.root.style.borderLeft = "1px solid black";
                
            }
            else if (i == 7) {
                piece.root.style.borderTop = "1px solid black";
                piece.root.style.borderLeft = "1px solid black";
                piece.root.style.borderRight = "1px solid black";
            }
            
            

            this.parent.appendChild(piece.root);
        }

        this.canMakeGrid = false;
    }

    addListeners() {
        let p;
        for (let i = 0; i < this.items.length; i++) {
            p = this.items[i];

            let moveFunction = (e) => {this.pieceListener(e, this.player, this.computer)
                
                };

            console.log("item added");
            if (p.root.innerHTML == "") {
                p.root.addEventListener('click', moveFunction)
            }

            
        }
    }

    

    

    

    pieceListener(e, player, computer) {

        e.target.innerHTML = player.playerChar;

        this.controller.move(this.items, computer.playerChar);

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].root.innerHTML != "") {

                let old = this.items[i].root;
                let newNode = old.cloneNode(true)
                old.parentNode.replaceChild(newNode, old)

            }
        }
        
    }

}

class TextBox {
    constructor(text) {
        this.root = document.createElement("h1");
        this.root.innerHTML = text;
    }

    appendRoot(id) {
        let doc = document.getElementById(id);

        doc.appendChild(this.root)
    }


}

class Runner {

    constructor() {

        this.game;

        this.player = player(undefined);
        
        document.getElementById("x-character").addEventListener('click', (e) => {
            this.player.setPlayer(e.target.innerHTML);
        });
        
        document.getElementById("o-character").addEventListener('click', (e) => {
            this.player.setPlayer(e.target.innerHTML);
        });

        document.getElementById("start-button").addEventListener('click', () => {this.run()});

        document.getElementById("restart").addEventListener('click', () => {this.restart()});
    }

    run() {

        document.getElementById("game").style.backgroundColor = "tan";
        this.game = new GameBoard(this.player);
    }

    restart() {
        document.getElementById("game").innerHTML = "";

        this.run();
    }
}



let runner = new Runner();
document.getElementById("restart-button");


/*

Minimax function

*/


/**
 * 
 * @param {GameBoard} board 
 * @param {player} computerPlayer 
 */
function minimax(board, computerPlayer, controller) {

    let availableSpots = emptySpots(board);

    if (controller.checkWin(board) == 1) {
        return {score:-10}
    }
    else if (controller.checkWin(board) == -1) {
        return {score: 10}
    }
    else if (availableSpots.length == 0) {
        return {score:0}
    }

    let moves = [];

    for (let i = 0; i < availableSpots.length; i++) {
        let move = new Move(availableSpots[i]);

        move.index = board[availableSpots[i]];
        board[availableSpots[i]].innerHTML = computerPlayer;

        if (computerPlayer == controller.computer.playerChar) {
            var result = minimax(board, board.player, controller)
            move.score = result.score;
        }
        else if (computerPlayer == controller.player.playerChar) {
            var result = minimax(board, board.computer, controller)
            move.score = result.score;
        }

        board[availableSpots[i]] = move.index;
        moves.push(move);
    }
    let bestMove;

    if (computerPlayer === board.computer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    console.log(moves[bestMove]);
    return moves[bestMove];
}



function emptySpots(items) {


    let empty = [];

    for (let i = 0; i < items.length; i++) {
        if (items[i].root.innerHTML == "") {
            empty.push(i)
        }
    }

    return empty;
}