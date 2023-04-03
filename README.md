# Tic-Tac-Toe
Simple tic tac toe game

There are three difficulties one can select, easy, medium, and hard.

Easy : almost no use

Medium : Random move

Hard : unbeatable tic tac toe


# unbeatable AI

Array implementation of minimax algorithm.  


Link to the GITHUB io link on pages: 
https://elliohip.github.io/Tic-Tac-Toe/



Inspiration for this implementation came from : 

Geeks For Geeks. “Minimax Algorithm in Game Theory: Set 4 (Alpha-Beta Pruning).” GeeksforGeeks, GeeksforGeeks, 16 Jan. 2023, https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/. 


Pseudocode for the algorithm: 

1. In find best move function:

- make an array(list) to store all the moves that have been attempted in the initial move
- establish the first attempted move (after player moves) for the AI to evaluate
- try all moves that follow that initial move
- All subsequent moves will be evaluated till the end states

2. In minimax function (line 272): 

- check for and evaluate end states
    - if game is over: 
        - if win for AI, return positive score
        - if loss for AI, return negative score
        - if tie, return 0
    - if game not over: 
        - check wether the player that moved last is the maximixzing player (AI player trying to win)
            - if is maximizing: 
                - make a move as the AI, calling the minimax function and changing the is maximizing player to be false
            - if not maximixzing: 
                - make a move as the player, calling the minimax function and changing the is maximizing player to be true

Eventually the function will return a move when end states are reached, and when checking end states, returns a move that follows back up the chain of function calls to the move that was initially made, with a score associated with that move.  This happens for all moves that are stored in the array, until the one with the highest score is chosen to be used.  
