import { useState, createContext, useContext } from "react";
import { whoIsWinner } from "./helpers";

const StateContext = createContext();
const useStateContext = () => useContext(StateContext);

const StateProvider = ({children}) => {
    const [mutex, setMutex] = useState(false) // For Animation
    const [state, setState] = useState(null)

    const newGame = (isAI = false) => setState({
        winner: null,
        playerTurn: 'X',
        gameIDTurn: null,
        superGame : new Array(9).fill(null),
        miniGames : Array(9).fill().map(() => Array(9).fill(null)),
        prevMoves : [],
        hasUndone : null,
        isAI,
    })

    const setHasUndone = () => setState({...state, hasUndone: true})
    
    const isClickable = (gameID, index) => {
        return !mutex
        && state.hasUndone !== true 
        && (state.gameIDTurn === null || state.gameIDTurn === gameID) 
        && state.superGame[gameID] === null
        && state.miniGames[gameID][index] === null;
    }

    const isAlternateCellMG = (gameID, index) => {
        let prevMove = state.prevMoves[state.prevMoves.length - 1];

        return state.hasUndone
        && (prevMove[0] === gameID && prevMove[1] === index);
    }
    const isAlternateMG = (gameID) => {
        if (state.superGame[gameID] === null) return null;

        let prevMove = state.prevMoves[state.prevMoves.length - 1];
        return state.hasUndone && prevMove[0] === gameID
    }
    
    const moveUpdate = (gameID, index) => {
        let newState = {...state};

        newState.prevMoves  = [...newState.prevMoves, [gameID, index, newState.gameIDTurn]];
        newState.miniGames[gameID][index] = newState.playerTurn;
        newState.superGame[gameID] = whoIsWinner(newState.miniGames[gameID]);
        newState.gameIDTurn = (newState.superGame[index] === null ? index : null);
        newState.playerTurn = (newState.playerTurn === 'X' ? 'O' : 'X');
        newState.winner = whoIsWinner(newState.superGame)
        newState.hasUndone = false;

        setState(newState);

        if (newState.isAI && newState.playerTurn === 'X') {
            findBestMove(newState.gameIDTurn);
        }
    }

    const undoUpdate = () => {
        let newState = {...state};

        let prevMove = newState.prevMoves.pop();
        newState.miniGames[prevMove[0]][prevMove[1]] = null;
        newState.superGame[prevMove[0]] = whoIsWinner(newState.miniGames[prevMove[0]]);
        newState.gameIDTurn = prevMove[2];
        newState.playerTurn = (newState.playerTurn === 'X' ? 'O' : 'X');
        newState.hasUndone = newState.prevMoves.length ? false : null;

        setState(newState);
    }

    const minimax = (board, depth, isMaximizingPlayer, gameID) => {
        // Ensure board is not null or undefined
        if (!board || !Array.isArray(board)) {
            console.error("Invalid board passed to minimax:", board);
            return { score: 0 }; // Default to neutral score
        }
    
        const winner = whoIsWinner(board);
        if (winner === 'X') return { score: 10 - depth };
        if (winner === 'O') return { score: depth - 10 };
        if (!board.some(row => row && row.includes(null))) return { score: 0 }; // Tie
    
        let bestMove;
        if (isMaximizingPlayer) {
            let bestScore = -Infinity;
            board.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell === null) {
                        board[i][j] = 'X'; // Simulate AI move
                        const { score } = minimax(board, depth + 1, false, gameID);
                        board[i][j] = null; // Undo move
                        if (score > bestScore) {
                            bestScore = score;
                            bestMove = { i, j };
                        }
                    }
                });
            });
            return { score: bestScore, move: bestMove };
        } else {
            let bestScore = Infinity;
            board.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell === null) {
                        board[i][j] = 'O'; // Simulate opponent move
                        const { score } = minimax(board, depth + 1, true, gameID);
                        board[i][j] = null; // Undo move
                        if (score < bestScore) {
                            bestScore = score;
                            bestMove = { i, j };
                        }
                    }
                });
            });
            return { score: bestScore, move: bestMove };
        }
    };

    const findBestMove = (gameID) => {
        const currentBoard = state.miniGames[gameID];
    
        if (!currentBoard || !Array.isArray(currentBoard)) {
            console.error("Invalid board state for gameID:", gameID);
            return;
        }
    
        const { move } = minimax(currentBoard, 0, true, gameID);
        if (move) {
            moveUpdate(gameID, move.i * 3 + move.j);
        }
    };
    
    
    
    
    

    return <StateContext.Provider 
    value = {{ newGame,
        mutex, setMutex, state, setState, setHasUndone, 
        isAlternateCellMG, isAlternateMG, isClickable, 
        moveUpdate, undoUpdate 
    }}
    > {children} </StateContext.Provider>;
};

export default useStateContext;
export { StateProvider };