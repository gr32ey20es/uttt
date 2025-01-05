import { Helpers } from "./helpers.js";

class Node {
    constructor () {
        this.childNodes = [];
        this.numVisits = 0;
        this.numWinsX = 0;
        this.numWinsO = 0;
    }

    expand() {
        if (!(childNodes.length == 0)) 
            return; // notLeaf
    }
}
class MCTS 
{
    constructor(
        turn,
        board,      // 1*81
        numSimulations,
        explorationStrength
    ) {
        this.turn = turn;
        this.board = board;
        this.numSimulations = numSimulations;
        this.explorationStrength = explorationStrength;

        // temporary
        this.tempBoard = new Array(90).fill(null);  // 9mini + 1super
        this.legalActions = [];
    }

    simulation () {
        this.tempBoard = [...this.board];        
        let playerTurn = this.turn;
        let prevAction = null;
        
        while(Helpers.whoIsWinnerSuper(this.tempBoard, prevAction) === null) {
            Helpers.getLegalActions(this.tempBoard, this.legalActions, prevAction);

            prevAction = this.legalActions[Math.floor(Math.random() * this.legalActions.length)];
            this.tempBoard[prevAction] = playerTurn;

            playerTurn = playerTurn === 'X' ? 'O' : 'X';
            this.legalActions = [];
        }

        data[Helpers.whoIsWinnerSuper(this.tempBoard, prevAction)] ++;
    }
}

const array = [
    'O',  null, 'O',  'O',  null, 'X',  'X',  null, 'X',  null,
    null, 'X',  'X',  'X',  null, 'X',  null, null, null, 'O',
    'O',  null, 'X',  null, 'X',  'X',  'X',  'X',  'X',  'O',
    'O',  'O',  'O',  'X',  'X',  null, null, null, 'O',  'O',
    'O',  'O',  'X',  'O',  'X',  null, 'O',  null, 'X',  null,
    null, 'X',  'X',  'X',  'O',  'O',  'X',  'X',  'X',  'O',
    'O',  'O',  'O',  'X',  'O',  null, 'X',  'X',  'O',  'X',
    'O',  null, null, 'O',  'O',  'O',  'X',  'O',  null, 'O',
    'X',  null, 'X',  'X',  'O',  'O',  'X',  'O',  'X',  null
]

const mcts = new MCTS('X', new Array(90).fill(null), 0, 0);
// const mcts = new MCTS('X', array, 0, 0);

var data = {'X': 0, 'N': 0, 'O': 0};

let now = Date.now();
for (let i = 0; i < 100000; ++ i) 
{
    mcts.simulation();
}
console.log(data);
console.log(Date.now() - now);