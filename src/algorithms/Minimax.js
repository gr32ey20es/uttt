import { Helpers } from "./helpers.js";

class Minimax {
    constructor(maxDepth) {
        this.maxDepth = maxDepth;
    }

    evaluateBoard(board, player) {
        const winner = Helpers.whoIsWinnerSuper(board, null);
        if (winner === player) return 100;
        if (winner !== null) return -100;
        return 0;
    }

    getBestMove(board, player, depth = 0, isMaximizing = true) {
        const winner = Helpers.whoIsWinnerSuper(board, null);
        if (winner || depth === this.maxDepth) {
            return { score: this.evaluateBoard(board, player) };
        }

        const legalActions = [];
        Helpers.getLegalActions(board, legalActions, null);

        let bestMove = { score: isMaximizing ? -Infinity : Infinity, action: null };

        for (let action of legalActions) {
            const tempBoard = [...board];
            tempBoard[action] = isMaximizing ? player : (player === 'X' ? 'O' : 'X');
            const result = this.getBestMove(tempBoard, player, depth + 1, !isMaximizing);

            if (isMaximizing) {
                if (result.score > bestMove.score) {
                    bestMove = { score: result.score, action };
                }
            } else {
                if (result.score < bestMove.score) {
                    bestMove = { score: result.score, action };
                }
            }
        }

        return bestMove;
    }
}

export { Minimax };
