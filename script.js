class AI {

    constructor() {

    }
}

class Move {

    constructor() {
        this.index;
        this.piece;
        this.score;
    }

}

class Piece {

    constructor(element) {
        this.root = element;
    }

}

class Board {
    constructor() {

        this.player;

        this.computer;

        let choices = Array.from(document.getElementById("difficulty").children);

        let difficulty;

        this.DIFFICULTY;

        choices.forEach((curr) => {
            curr.addEventListener("click", (e) => {
                
                this.DIFFICULTY = e.target.innerHTML.toLowerCase();
                console.log("difficulty: " + this.DIFFICULTY);

            });
        })
        
        

        this.START_BUTTON = document.getElementById("start-button");
        this.X_BUTTON = document.getElementById("x-character");
        this.O_BUTTON = document.getElementById("o-character");

        

        

        this.X_BUTTON.addEventListener("click", () => {
            this.player = 'x';
            this.computer = "o";
        });

        this.O_BUTTON.addEventListener("click", () => {
            this.player = 'o';
            this.computer = "x";
        });

        this.START_BUTTON.addEventListener("click", () => {
            this.createItems();
        });


        this.root = document.getElementById("game");

        this.items = [];
        
        this.spots;


        
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

            p.addEventListener('click', (e) => {
                
                this.move(e);
            });

            this.root.appendChild(p);
        }

        
    }

    move(e) {

        
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
        }

        let w = this.checkWin(this.items);

        if (w == 1) {
            this.root.innerHTML = "Winner"
        }
        else if (w == -1) {
            this.root.innerHTML = "Loser"
        }
    }

    minimax() {

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

        for (let i = 0; i < items.length; i++) {
        
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

let BOARD = new Board();