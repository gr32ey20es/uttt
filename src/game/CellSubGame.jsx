import './CellSubGame.css';
import useStateContext from "./StateContext";
import XODrawer from '../components/XODrawer';
import { useEffect } from 'react';

const CellSubGame = ({ gameID, index }) => {
    const { state, isAlternate, moveUpdate, isClickable, undoUpdate } = useStateContext();
    let clickable = isClickable(gameID, index);
    let alternate = isAlternate(gameID, index);

    useEffect(() => {
        if(alternate) setTimeout(() => undoUpdate(), 700); 
    }, [state]);

    return <>
    <div className={clickable ? "CellSubGame hover" : "CellSubGame"} 
        onClick={clickable ? () => moveUpdate(gameID, index) : () => {}}
    > 
        <XODrawer width={55} height={55} value={state.miniGames[gameID][index]} alternate={alternate}/>
    </div>
    </>
}

export default CellSubGame;