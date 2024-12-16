import { useState, createContext, useContext } from "react";
import { 
    createNewPlayerTurn, createNewGameTurn,
    createNewGame, createNewSubGames, 
    updateGame, updatePlayerTurn 
} from "./helpers";

const StateContext = createContext();

const StateProvider = ({children}) => {
    const [playerTurn, setPlayerTurn] = useState( createNewPlayerTurn() );
    const [gameTurn, setGameTurn] = useState( createNewGameTurn() );
    const [superGame, setSuperGame] = useState( createNewGame() );
    const [subGames, ] = useState( createNewSubGames() );

    const getSubGame = (gameID) => subGames[gameID];

    const incSuperGame = () => {
        setPlayerTurn( updatePlayerTurn(playerTurn) );
        setSuperGame( updateGame(superGame, playerTurn, 0) );
    }

    return <>
        <StateContext.Provider value={{ superGame, incSuperGame, getSubGame }}>
            {children}
        </StateContext.Provider>
    </>;
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;
export { StateProvider };