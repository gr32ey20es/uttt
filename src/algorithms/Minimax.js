import { Helpers } from "./helpers.js";

class Minimax {
    constructor(maxDepth) {
        this.maxDepth = maxDepth;
    }

    evaluateBoard(board, player) {
        const winner = Helpers.whoIsWinnerSuper(board, null);
        if (winner === player) return 10;
        if (winner !== null) return -10;
        return 0; // Hòa.
    }

    getBestMove(board, player, depth = 0, isMaximizing = true, alpha = -Infinity, beta = Infinity) {
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
            const result = this.getBestMove(tempBoard, player, depth + 1, !isMaximizing, alpha, beta);

            if (isMaximizing) {
                if (result.score > bestMove.score) {
                    bestMove = { score: result.score, action };
                }
                alpha = Math.max(alpha, result.score);
            } else {
                if (result.score < bestMove.score) {
                    bestMove = { score: result.score, action };
                }
                beta = Math.min(beta, result.score);
            }

            if (beta <= alpha) break;
        }

        return depth === 0 ? { action: bestMove.action, score: bestMove.score } : bestMove;
    }
}

