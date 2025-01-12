import { AlphaBeta } from "./AlphaBeta.js";
import { MCTS } from "./MCTS.js";
import { Helpers } from "./helpers.js";

function autoPlay(algorithm1, algorithm2, minMatches = 30, maxDurationMs = 5000) {
    const stats = {
        [algorithm1.name]: { wins: 0, losses: 0, draws: 0 },
        [algorithm2.name]: { wins: 0, losses: 0, draws: 0 },
    };

    const algoInstances = {
        AlphaBeta: new AlphaBeta(3),
        MCTS: { numSimulations: 100, explorationStrength: Math.sqrt(2) },
    };

    const startTime = performance.now();
    let matchesPlayed = 0;

    while (matchesPlayed < minMatches || (performance.now() - startTime) < maxDurationMs) {
        let winner = null;
        const board = new Array(91).fill(null); // Bàn chơi Ultimate Tic-Tac-Toe
        let turn = "X";
        let prevAction = null;

        while (!winner) {
            let action;

            // Chọn thuật toán theo lượt đi
            const currentAlgo = turn === "X" ? algorithm1 : algorithm2;
            if (currentAlgo.name === "MCTS") {
                const mcts = new MCTS(
                    turn,
                    board,
                    algoInstances.MCTS.numSimulations,
                    algoInstances.MCTS.explorationStrength,
                    prevAction
                );
                mcts.run();
                const bestNode = mcts.root.childNodes.reduce((best, node) =>
                    node.numVisits > (best.numVisits || 0) ? node : best, {}
                );
                action = bestNode.prevAction;
            } else {
                action = algoInstances[currentAlgo.name].getBestMove(board, turn).action;
            }

            // Cập nhật trạng thái trò chơi
            board[action] = turn;
            prevAction = action;
            winner = Helpers.whoIsWinnerSuper(board, action);

            // Chuyển lượt
            turn = turn === "X" ? "O" : "X";
        }

        // Cập nhật thống kê trận đấu
        if (winner === "X") {
            stats[algorithm1.name].wins++;
            stats[algorithm2.name].losses++;
        } else if (winner === "O") {
            stats[algorithm2.name].wins++;
            stats[algorithm1.name].losses++;
        } else {
            stats[algorithm1.name].draws++;
            stats[algorithm2.name].draws++;
        }

        matchesPlayed++;
    }

    console.log(`Kết quả sau ${matchesPlayed} trận đấu:`);
    console.log(`${algorithm1.name} - Wins: ${stats[algorithm1.name].wins}, Losses: ${stats[algorithm1.name].losses}, Draws: ${stats[algorithm1.name].draws}`);
    console.log(`${algorithm2.name} - Wins: ${stats[algorithm2.name].wins}, Losses: ${stats[algorithm2.name].losses}, Draws: ${stats[algorithm2.name].draws}`);

    return stats;
}

// Chạy 2 AI tự chơi với nhau
autoPlay({ name: "AlphaBeta" }, { name: "MCTS" }, 30, 5000);
