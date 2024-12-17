import { useState, createContext, useContext } from "react";
import { 
    createNewPlayerTurn, createNewGameTurn,
    createNewGame, createNewSubGames,
    createNewPrevMoves, checkIfWin
} from "./helpers";

const StateContext = createContext();

const StateProvider = ({children}) => {
    const [playerTurn, setPlayerTurn] = useState( createNewPlayerTurn() );
    const [gameTurn, setGameTurn] = useState( createNewGameTurn() );
    const [superGame, setSuperGame] = useState( createNewGame() );
    const [subGames, setSubGames] = useState( createNewSubGames() );
    const [isUndo, setIsUndo] = useState(null);
    const [prevMoves, setPrevMoves] = useState( createNewPrevMoves() );

    const updateGame = (gameID, index) => {
        let newSuperGame = [...superGame];
        let newSubGames = [...subGames];
        let newPrevMoves = [...prevMoves, [gameID, index, gameTurn]]    // prevMove's structure

        newSubGames[gameID][index] = playerTurn;        

        let winner = checkIfWin(newSubGames[gameID]);
        if(winner) {
            newSuperGame[gameID] = winner;
            setSuperGame(newSuperGame);
        }

        setPlayerTurn(playerTurn === "X" ? 'O' : 'X');
        setGameTurn(newSuperGame[index] === null ? index : null);
        setSubGames(newSubGames);
        setIsUndo(false);
        setPrevMoves(newPrevMoves);
    }

    const isPrevMove = (gameID, index) => {
        let prevMove = prevMoves[prevMoves.length - 1];
        return prevMove[0] === gameID && prevMove[1] === index;
    }

    const undo = () => {
        let newSubGames = [...subGames];
        let newPrevMoves = [...prevMoves]
        let prevMove = newPrevMoves.pop();

        newSubGames[prevMove[0]][prevMove[1]] = null;

        setPlayerTurn(playerTurn === "X" ? 'O' : 'X');
        setGameTurn(prevMove[2]);
        setSubGames(newSubGames);
        setIsUndo(newPrevMoves.length ? false : null);
        setPrevMoves(newPrevMoves);
    }

    return <>
        <StateContext.Provider value={{ 
            playerTurn, setPlayerTurn, gameTurn, setGameTurn, superGame, setSuperGame,
            subGames, setSubGames, isUndo, setIsUndo, prevMoves, setPrevMoves,
            updateGame, isPrevMove, undo
        }}>
            {children}
        </StateContext.Provider>
    </>;
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;
export { StateProvider };