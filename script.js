const x_character = document.getElementById("x-character");
const o_character = document.getElementById("o-character");

const start_button = document.getElementById("start-button");

let playerCharacter;
let computerCharacter;

function makePlayers(e) {
    playerCharacter = e.target.innerHTML;
    
    if (playerCharacter.toLowerCase() == 'x') {
        computerCharacter = 'o';
    }
    else {
        computerCharacter = 'x';
    }
}




class Player {
    constructor() {
        this.data = undefined;
    }
    constructor(d) {
        this.data = d;
    }

    static move(piece) {
        piece.setPlayer(this.data);
    }
}



class BoardPiece {

    /**
     * 
     * @param {*} id ID of the piece
     * @param {Player} p player object that can interact with this piece
     * @param {Player} c computer object that can interact with this boardpiece
     */
    constructor(id, p, c) {

        this.root = document.createElement("div");
        this.root.id = id;

        

        this.player = p;
        this.computer = c;

        this.control = undefined;
        

        this.root.addEventListener(() => {GameBoard.move(this, this.player, this.computer)});

        /*
        set the state of the root object
         */
        
        this.root.style.borderWidth = "1pt";
        this.root.style.borderStyle = "solid";
        this.root.style.borderColor = "black";

        this.root.style.fontSize = "30pt";
        this.root.style.alignContent = "center";
        this.root.style.justifyContent = "center";
        //this.root.addEventListener("click", () => {this.setPlayer(this.player)});

        document.getElementById("game").appendChild(this.root);
    }

    updateUI() {
        this.root.innerHTML = this.player;
    }

    /**
     * 
     * @param {String} p string for the player
     */
    setPlayer(p) {
        this.data = p;
    }

    /**
     * clear function
     */
    clear() {
        this.player = undefined;
        this.root.innerHTML = "";
    }

    
}


class GameBoard {

    constructor() {


        this.COMPUTER = new Player(playerCharacter);
        this.PLAYER = new Player(computerCharacter);
        
        
        // rows and columns represented as two arrays
        this.rows = [];
        this.columns = [];

        let piece;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                
                piece = new BoardPiece("r-" + (i + 1) + "-c-" + (j + 1), 
                PLAYER, COMPUTER);
                this.columns[j] = piece;
                

                
                
                this.columns[j];
            }   
            this.rows[i] = this.columns;
            this.columns = [];
        }
        this.computer = new ComputerPlayer();
    }

    /**
     * 
     * @param {BoardPiece} piece 
     * @param {String} char 
     * @param {EventTarget}
     */
    static move(BoardPiece, player, computer) {
        // trys to move both player and computer

        let randRow = Math.random() * 3;
        let randCol = Math.random() * 3;

        let piece = this.rows[randRow][randCol];
        
        player.move(BoardPiece);
        computer.move(piece);
    }


    checkWinner() {
        for (let i = 0; i < this.rows.length; i++) {
            this.#checkSide(i);
        }
    }

    
    #checkSide(j) {
        let countPlayer = 0;
        let countComputer = 0;
        
        for (let p in this.rows[j]) {
            if (p.player == this.player) {
                countPlayer++;
            }
            else if (p.player == this.computer.token) {
                 countComputer++;
            }
            else {
                break;
            }
            
        }
    }
    #checkCol() {
        let countPlayer = 0;
        let countComputer = 0;
        for (let c in rows[j]) {
            for (let p in c) {
                if (p.player == this.player) {
                    countPlayer++;
                }
               if (false) {

                }
            }
        }
    }
    #checkDiagonal(i, j) {

    }

    
}

class Runner {
    constructor() {

    }

    main() {
        
    }
}