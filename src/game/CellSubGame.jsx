import './CellSubGame.css';
import useStateContext from "./StateContext";
import XODrawer from '../components/XODrawer';
import { useEffect } from 'react';

const CellSubGame = ({ gameID, index }) => {
    const { isUndo, isPrevMove, gameTurn, subGames, updateGame, undo } = useStateContext();
    let value = subGames[gameID][index];

    let clickable = isUndo !== true && (gameTurn === null || gameTurn === gameID) && value === null;
    let alternate = isUndo && isPrevMove(gameID, index);

    useEffect(() => { // Animation time
        if(alternate) setTimeout(() => undo(), 700); 
    }, [alternate, undo]);

    return <>
    <div className={clickable ? "CellSubGame hover" : "CellSubGame"} 
        onClick={clickable ? () => updateGame(gameID, index) : () => {}}
    > 
        <XODrawer width={55} height={55} value={value} alternate={alternate}/>
    </div>
    </>
}

export default CellSubGame;