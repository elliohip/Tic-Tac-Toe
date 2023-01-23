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

class BoardPiece {

    constructor(id) {
        this.root = document.createElement("div");

        this.root.id = id;

        this.root.style.border = "1px solid black";

        

    }

    setData(d) {
        this.root.innerHTML = d;
    }
}

class GameController {

    constructor(player, computer) {
        this.player = player;
        this.computer = computer;
        
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

        while (randPiece.root.innerHTML.length != 0) {
            random = Math.floor(Math.random() * 8);
            randPiece = board[random];

            if (randPiece.root.innerHTML == "") {
                randPiece.root.innerHTML = computer;
            }
        }
        

        //randPiece.innerHTML = computer;

        
    }

    


}

class GameBoard {
    
    constructor(mainPlayer) {

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
        

    }

    createGrid() {

        let piece;
        for (let i = 0; i < 9; i++) {

            piece = new BoardPiece("piece-" + i);
            this.items[this.items.length] = piece;
            this.parent.appendChild(piece.root);
        }

        this.canMakeGrid = false;
    }

    addListeners() {
        let p;
        for (let i = 0; i < this.items.length; i++) {
            p = this.items[i];

            console.log("item added");
            p.root.addEventListener('click', (e) => {this.pieceListener(e, this.player, this.computer)});
        }
    }

    pieceListener(e, player, computer) {

        e.target.innerHTML = player.playerChar;

        this.controller.move(this.items, computer.playerChar);
    }

}

class Runner {

    constructor() {

        this.player = player(undefined);
        
        document.getElementById("x-character").addEventListener('click', (e) => {
            this.player.setPlayer(e.target.innerHTML);
        });
        
        document.getElementById("o-character").addEventListener('click', (e) => {
            this.player.setPlayer(e.target.innerHTML);
        });

        document.getElementById("start-button").addEventListener('click', () => {this.run()});
    }

    run() {
        let game = new GameBoard(this.player);
    }
}

let runner = new Runner();