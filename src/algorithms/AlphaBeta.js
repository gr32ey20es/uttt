import { Helpers } from "./helpers.js";

class AlphaBeta {
    constructor(maxDepth) {
        this.maxDepth = maxDepth;
    }

    evaluateBoard(board, player) {
        const winner = Helpers.whoIsWinnerSuper(board, null);
        if (winner === player) return 100; 
        if (winner !== null) return -100; 
        return 0;
    }

    getBestMove(board, player, depth = 0, alpha = -Infinity, beta = Infinity, isMaximizing = true) {
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

            // Gọi đệ quy để tính nước đi tiếp theo
            const result = this.getBestMove(
                tempBoard,
                player,
                depth + 1,
                alpha,
                beta,
                !isMaximizing
            );

            // Cập nhật alpha-beta và nước đi tốt nhất
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

            // Cắt tỉa
            if (beta <= alpha) break;
        }

        return bestMove;
    }
}

export { AlphaBeta };
