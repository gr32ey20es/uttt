import { useState, createContext, useContext } from "react";
import { whoIsWinner } from "./helpers";

const StateContext = createContext();
const useStateContext = () => useContext(StateContext);

const StateProvider = ({children}) => {
    const [state, setState] = useState
    ({
        _mutex: false,   // For animation
        winner: null,
        playerTurn: 'X',
        gameIDTurn: null,
        superGame : new Array(9).fill(null),
        miniGames : Array(9).fill().map(() => Array(9).fill(null)),
        prevMoves : [],
        hasUndone : null,
    })

    const setHasUndone = () => setState({...state, _mutex: true, hasUndone: true})
    
    const isClickable = (gameID, index) => {
        return state.hasUndone !== true 
        && (state.gameIDTurn === null || state.gameIDTurn === gameID) 
        && state.superGame[gameID] === null
        && state.miniGames[gameID][index] === null;
    }

    const isAlternate = (gameID, index) => {
        let prevMove = state.prevMoves[state.prevMoves.length - 1];

        return state.hasUndone
        && (prevMove[0] === gameID && prevMove[1] === index);
    }
    
    const moveUpdate = (gameID, index) => {
        let newState = {...state};

        newState.prevMoves  = [...newState.prevMoves, [gameID, index, newState.gameIDTurn]];
        newState.miniGames[gameID][index] = newState.playerTurn;
        newState.superGame[gameID] = whoIsWinner(newState.miniGames[gameID]);
        newState.gameIDTurn = (newState.superGame[index] === null ? index : null);
        newState.playerTurn = (newState.playerTurn === 'X' ? 'O' : 'X');
        newState.winner = whoIsWinner(newState.superGame);
        newState.hasUndone = false;

        console.log(newState);

        setState(newState);
    }

    const undoUpdate = () => {
        let newState = {...state};

        newState._mutex = false;
        let prevMove = newState.prevMoves.pop();
        newState.miniGames[prevMove[0]][prevMove[1]] = null;
        newState.superGame[prevMove[0]] = whoIsWinner(newState.miniGames[prevMove[0]]);
        newState.gameIDTurn = prevMove[2];
        newState.playerTurn = (newState.playerTurn === 'X' ? 'O' : 'X');
        newState.winner = whoIsWinner(newState.superGame);
        newState.hasUndone = newState.prevMoves.length ? false : null;

        setState(newState);
    }

    return <StateContext.Provider 
    value = {{  
        state, setHasUndone, isAlternate, isClickable, 
        moveUpdate, undoUpdate 
    }}
    > {children} </StateContext.Provider>;
};

export default useStateContext;
export { StateProvider };