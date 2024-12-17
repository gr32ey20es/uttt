import { useState, createContext, useContext } from "react";
import { 
    createNewPlayerTurn, createNewGameTurn,
    createNewGame, createNewSubGames, 
    createNewPrevMoves, 
} from "./helpers";

const StateContext = createContext();

const StateProvider = ({children}) => {
    const [playerTurn, setPlayerTurn] = useState( createNewPlayerTurn() );
    const [gameTurn, setGameTurn] = useState( createNewGameTurn() );
    const [superGame, setSuperGame] = useState( createNewGame() );
    const [subGames, setSubGames] = useState( createNewSubGames() );
    const [isUndo, setIsUndo] = useState(false);
    const [prevMoves, setPrevMoves] = useState(createNewPrevMoves());

    const updateGame = (gameID, index) => {
        let newSubGames = [...subGames];
        let newPrevMoves = [...prevMoves, [gameID, index]]
        newSubGames[gameID][index] = playerTurn;
        
        setPlayerTurn(playerTurn === "X" ? 'O' : 'X');
        setGameTurn((gameTurn + 1) % 9);
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
        setGameTurn((gameTurn + 8) % 9);
        setSubGames(newSubGames);
        setIsUndo(newPrevMoves.length ? false : null);
        setPrevMoves(newPrevMoves);
    }

    return <>
        <StateContext.Provider value={{ isUndo, setIsUndo, isPrevMove, gameTurn, superGame, subGames, updateGame, undo}}>
            {children}
        </StateContext.Provider>
    </>;
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;
export { StateProvider };