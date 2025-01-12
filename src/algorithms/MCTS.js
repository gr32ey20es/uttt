import { Helpers } from "./helpers.js";

class Node 
{
    constructor (prevAction) {
        this.prevAction = prevAction;
        this.childNodes = [];
        this.numVisits = 0;
        this.numWinsX = 0;
        this.numWinsO = 0;
    }
}
class MCTS 
{
    constructor(
        turn,
        board,      // 1*81
        numSimulations,
        explorationStrength,
        prevAction,
    ) {
        this.turn = turn;
        this.board = board;
        this.numSimulations = numSimulations;
        this.explorationStrength = explorationStrength;
        this.prevAction = prevAction;
        this.root = new Node(prevAction);

        // temporary
        this.tempBoard = new Array(81 + 9 + 1).fill(null);  // 9mini + 1super + result
        this.legalActions = [];
        this.selectedPath = [];
        this.topScoreIndices = [];
    }

    UCT(node, parentNumVisits, turn) {
        if (node.numVisits == 0) return 1e9;

        let exploitationScore = turn === 'X' ? 
            (node.numWinsX - node.numWinsO) / node.numVisits: 
            (node.numWinsO - node.numWinsX) / node.numVisits;

        let explorationScore = this.explorationStrength *
            Math.sqrt(Math.log((parentNumVisits)) / node.numVisits);
        return exploitationScore + explorationScore;
    }
    
    selection (playerTurn) {
        let node = this.root;
        this.selectedPath = [];

        let score, topScore;

        while (node.numVisits > 0) {
            if (node.numVisits == 1)
                this.expansion(node);  
            
            this.selectedPath.push(node);
            topScore = -1e9;

            for (let i = 0; i < node.childNodes.length; ++i) {
                score = this.UCT(node.childNodes[i], node.numVisits, playerTurn);
                if (score > topScore) {
                    this.topScoreIndices = [i];
                    topScore = score;
                } else if (score == topScore)
                    this.topScoreIndices.push(i);
            }

            node = node.childNodes[
                this.topScoreIndices[
                    Math.floor(Math.random() * this.topScoreIndices.length)
                ]
            ];

            playerTurn = playerTurn === 'X' ? 'O' : 'X';
        }
        this.selectedPath.push(node);

        return playerTurn;
    }

    expansion (node) {
        if (node.childNodes.length > 0) {
            console.log("Something Wrong!!!");
            return;
        }        
        this.legalActions = [];
        Helpers.getLegalActions(this.tempBoard, this.legalActions, node.prevAction);

        for (let i = 0; i < this.legalActions.length; ++i)
            node.childNodes.push(new Node(this.legalActions[i]));
    }

    simulation (playerTurn) {
        let prevAction = this.selectedPath[this.selectedPath.length-1].prevAction;
        
        while(Helpers.whoIsWinnerSuper(this.tempBoard, prevAction) === null) {
            Helpers.getLegalActions(this.tempBoard, this.legalActions, prevAction);

            prevAction = this.legalActions[Math.floor(Math.random() * this.legalActions.length)];
            this.tempBoard[prevAction] = playerTurn;

            playerTurn = playerTurn === 'X' ? 'O' : 'X';
            this.legalActions = [];
        }

        // backpropagation
        let result = Helpers.whoIsWinnerSuper(this.tempBoard, prevAction);
        for (let i = 0; i < this.selectedPath.length; ++i) {
            this.selectedPath[i].numVisits ++;
            if (result === 'X') this.selectedPath[i].numWinsX ++;
            else if (result === 'O') this.selectedPath[i].numWinsO ++;
        }
    }

    selectAction() {
        let node = this.root;
        let score, topScore;

        topScore = -1e9;

        for (let i = 0; i < node.childNodes.length; ++i) {
            let childNode = node.childNodes[i];

            score = this.turn === 'X' ? 
                (childNode.numWinsX - childNode.numWinsO) * Math.log(Math.log(childNode.numVisits)):
                (childNode.numWinsO - childNode.numWinsX) * Math.log(Math.log(childNode.numVisits));
            
            console.log('%d, %d, %d, %d, %d', node.childNodes[i].prevAction, 
                score, node.childNodes[i].numWinsX, node.childNodes[i].numWinsO, node.childNodes[i].numVisits);

            if (score > topScore) {
                this.topScoreIndices = [i];
                topScore = score;
            } else if (score == topScore)
                this.topScoreIndices.push(i);
        }

        node = node.childNodes[
            this.topScoreIndices[
                Math.floor(Math.random() * this.topScoreIndices.length)
            ]
        ];

        return node.prevAction;
    }

    run () {
        let now = Date.now();
        for (let i = 0; i < this.numSimulations; ++ i) 
        {
            this.tempBoard = [...this.board];
            let playerTurn = this.selection(this.turn);
            this.simulation(playerTurn);
        }

        console.log(this.selectAction());

        // console.log(this.root.childNodes);
        console.log(Date.now() - now);
    }
}

const arr = [
    null, 'O',  'O', null, 'O',  'X',  null, 'O',  'O',  'O',
    null, 'X',  'O', 'O',  null, null, 'O',  'O',  'X',  'X',
    'O',  null, 'X', null, 'X',  'X',  'O',  'O',  null, 'O',
    'X',  'O',  'O', 'O',  'X',  'X',  'X',  'X',  null, 'X',
    null, 'X',  'X', 'O',  null, 'X',  'X',  'O',  null, 'O',
    'O',  'X',  'O', 'O',  null, null, 'X',  'O',  'O',  'X',
    'O',  'X',  'O', 'X',  'X',  null, 'X',  'O',  'X',  'X',
    'O',  'X',  'X', 'X',  null, 'X',  'X',  'X',  null, 'O',
    'O',  'O',  'O', 'X',  'O',  'X',  'O',  null, 'X',  'X',
    null
];
// const mcts = new MCTS('X', arr, 1000, Math.sqrt(2), 59);
const mcts = new MCTS('X', new Array(91).fill(null), 100000, Math.sqrt(2), null);
mcts.run();

export default MCTS;