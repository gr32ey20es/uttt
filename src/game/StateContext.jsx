import { useState, createContext, useContext } from "react";
import { 
    createNewPlayerTurn, createNewGameTurn,
    createNewGame, createNewSubGames, 
    updatePlayerTurn 
} from "./helpers";

const StateContext = createContext();

const StateProvider = ({children}) => {
    const [playerTurn, setPlayerTurn] = useState( createNewPlayerTurn() );
    const [gameTurn, setGameTurn] = useState( createNewGameTurn() );
    const [superGame, setSuperGame] = useState( createNewGame() );
    const [subGames, setSubGames] = useState( createNewSubGames() );

    const getSubGame = (gameID) => subGames[gameID];

    const updateGame = (gameID, index) => {
        let newSubGames = [...subGames];
        newSubGames[gameID][index] = playerTurn;
        
        setPlayerTurn(updatePlayerTurn(playerTurn));
        setSubGames(newSubGames);
        setGameTurn((gameTurn + 1) % 9);
        console.log(subGames)
    }

    return <>
        <StateContext.Provider value={{ gameTurn, superGame, subGames, updateGame }}>
            {children}
        </StateContext.Provider>
    </>;
};

const useStateContext = () => useContext(StateContext);

export default useStateContext;
export { StateProvider };