const x_character = document.getElementById("x-character");
const o_character = document.getElementById("o-character");



class BoardPiece {

    constructor(id, p) {
        this.player = p;
        this.root = document.createElement("div");
        this.root.id = id;


        /*
        set the state of the root object
         */
        
        this.root.style.borderWidth = "1pt";
        this.root.style.borderStyle = "solid";
        this.root.style.borderColor = "black";

        this.root.style.fontSize = "";

        document.getElementById("game").appendChild(this.root);
    }

    #updateUI() {
        this.root.innerHTML = this.player;
    }

    /**
     * 
     * @param {String} p string for the player
     */
    setPlayer(p) {
        this.player = p;
        this.#updateUI();
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

    constructor(player) {

        if (player == undefined) {
            alert("no player chosen")
            return;
        }

        this.rows = [];
        this.columns = [];

        let piece;
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                this.columns[j] = new BoardPiece("r-" + i + "-c-" + j, player);
                this.rows[i] = this.columns;
                this.columns[j];
            }   
            this.columns = [];
        }
    }
}

let startGame = () => {
    this.game = new GameBoard(document.getElementById("game").player);
}



function choosePlayer(e) {
    document.getElementById("game").player = e.target.innerHTML;
    let game = new GameBoard(document.getElementById("game").player);
}

x_character.addEventListener("click", choosePlayer);
o_character.addEventListener("click", choosePlayer);