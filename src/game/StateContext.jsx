import { useState, createContext, useContext } from "react";
import { whoIsWinner } from "./helpers";

const StateContext = createContext();
const useStateContext = () => useContext(StateContext);

const StateProvider = ({children}) => {
    const [mutex, setMutex] = useState(false) // For Animation
    const [state, setState] = useState(null)

    const newGame = () => setState({
        winner: null,
        playerTurn: 'X',
        gameIDTurn: null,
        superGame : new Array(9).fill(null),
        miniGames : Array(9).fill().map(() => Array(9).fill(null)),
        prevMoves : [],
        hasUndone : null,
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